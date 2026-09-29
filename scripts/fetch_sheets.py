#!/usr/bin/env python3
"""Gera data/sheets.json a partir das planilhas públicas publicadas no Google Sheets.

A rotina é executada no GitHub Actions antes do deploy do Pages para entregar ao
painel um snapshot local, sem depender de CORS do navegador. Ela preserva todas
as colunas encontradas na aba publicada/acompanhamento.
"""
from __future__ import annotations

import csv
import html
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "sheets.json"

SOURCES = [
    {
        "key": "filial-ba",
        "name": "Monitoramento Filial BA",
        "short": "Filial BA",
        "pubId": "2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr",
        "url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr/pubhtml",
    },
    {
        "key": "matriz-sp",
        "name": "Monitoramento Matriz SP",
        "short": "Matriz SP",
        "pubId": "2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0",
        "url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0/pubhtml",
    },
]

KNOWN_HEADERS = [
    "data progr", "data programada", "of", "agenda", "cliente", "cidade", "uf", "tp carga",
    "tp contratacao", "tp contratação", "tp veiculo", "tp veículo", "placa", "receb veiculo",
    "receb veículo", "faturamento", "nf", "nota fiscal", "emissao", "emissão", "saida", "saída",
    "remetente", "destinatario", "destinatário", "tomador", "transportador", "transportadora",
    "cidade destino", "status", "situacao", "situação", "previsao de entrega", "previsão de entrega",
    "chegada no cliente", "ontime", "ocorrencia", "ocorrência", "setor responsavel", "setor responsável",
    "devolucao", "devolução", "tipo devolucao", "tipo devolução", "motivo devolucao", "motivo devolução",
    "observacao", "observação", "obs", "motorista", "valor", "peso",
]


def norm(value: object) -> str:
    text = str(value or "")
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def is_known_header(value: object) -> bool:
    n = norm(value)
    if not n:
        return False
    return any(n == h or h in n or n in h for h in KNOWN_HEADERS)


def header_score(row: Iterable[str]) -> int:
    return sum(1 for cell in row if is_known_header(cell))


def fetch_text(url: str, attempts: int = 3) -> str:
    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (compatible; TorreControle/1.0)",
                    "Accept": "text/html,text/csv,text/plain,*/*",
                },
            )
            with urllib.request.urlopen(req, timeout=45) as response:
                raw = response.read()
                charset = response.headers.get_content_charset() or "utf-8"
                text = raw.decode(charset, errors="replace")
                if "Sorry, the file you have requested does not exist" in text:
                    raise RuntimeError("arquivo não encontrado pelo Google")
                return text
        except Exception as exc:  # noqa: BLE001 - log detalhado no resultado JSON
            last_error = exc
            time.sleep(attempt * 1.5)
    raise RuntimeError(str(last_error) if last_error else "falha desconhecida")


def sniff_dialect(text: str) -> csv.Dialect:
    sample = text[:8192]
    try:
        return csv.Sniffer().sniff(sample, delimiters=",;\t")
    except csv.Error:
        return csv.excel


def parse_csv_rows(text: str) -> list[list[str]]:
    if "<html" in text[:500].lower() or "<!doctype" in text[:500].lower():
        return []
    dialect = sniff_dialect(text)
    return [[cell.strip() for cell in row] for row in csv.reader(text.splitlines(), dialect)]


class GoogleTableParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tables: list[list[list[str]]] = []
        self._table_depth = 0
        self._current_table: list[list[str]] | None = None
        self._current_row: list[str] | None = None
        self._current_cell: list[str] | None = None

    def handle_starttag(self, tag: str, attrs):  # type: ignore[override]
        tag = tag.lower()
        if tag == "table":
            self._table_depth += 1
            if self._table_depth == 1:
                self._current_table = []
        elif tag == "tr" and self._table_depth and self._current_table is not None:
            self._current_row = []
        elif tag in {"td", "th"} and self._current_row is not None:
            self._current_cell = []
        elif tag == "br" and self._current_cell is not None:
            self._current_cell.append(" ")

    def handle_endtag(self, tag: str):  # type: ignore[override]
        tag = tag.lower()
        if tag in {"td", "th"} and self._current_cell is not None and self._current_row is not None:
            value = html.unescape("".join(self._current_cell))
            value = re.sub(r"\s+", " ", value).strip()
            self._current_row.append(value)
            self._current_cell = None
        elif tag == "tr" and self._current_row is not None and self._current_table is not None:
            self._current_table.append(self._current_row)
            self._current_row = None
        elif tag == "table" and self._table_depth:
            self._table_depth -= 1
            if self._table_depth == 0 and self._current_table is not None:
                self.tables.append(self._current_table)
                self._current_table = None

    def handle_data(self, data: str):  # type: ignore[override]
        if self._current_cell is not None:
            self._current_cell.append(data)


def parse_html_tables(text: str) -> list[list[list[str]]]:
    parser = GoogleTableParser()
    parser.feed(text)
    return parser.tables


def strip_sheet_row_header(row: list[str]) -> list[str]:
    if not row:
        return row
    first = str(row[0] or "").strip()
    second = str(row[1] or "").strip() if len(row) > 1 else ""
    if re.fullmatch(r"[A-Z]+", first) and all(re.fullmatch(r"[A-Z]+", str(cell or "")) for cell in row[: min(8, len(row))]):
        return []
    if first == "" and len(row) > 4:
        return row[1:]
    if re.fullmatch(r"\d+", first) and (is_known_header(second) or len(row) > 4):
        return row[1:]
    return row


def dedupe_labels(labels: list[str]) -> list[str]:
    counts: dict[str, int] = {}
    output: list[str] = []
    for i, label in enumerate(labels):
        clean = re.sub(r"\s+", " ", str(label or "")).strip() or f"Coluna {i + 1}"
        key = clean.lower()
        counts[key] = counts.get(key, 0) + 1
        output.append(clean if counts[key] == 1 else f"{clean} {counts[key]}")
    return output


def rows_to_records(rows: list[list[str]], source: dict) -> list[dict]:
    cleaned = [strip_sheet_row_header(row) for row in rows]
    cleaned = [row for row in cleaned if row and any(str(cell).strip() for cell in row)]
    if len(cleaned) < 2:
        return []

    scored = [(idx, header_score(row)) for idx, row in enumerate(cleaned)]
    header_idx, score = max(scored, key=lambda item: item[1])
    if score < 3:
        header_idx = 0

    labels = dedupe_labels(cleaned[header_idx])
    records: list[dict] = []
    for offset, row in enumerate(cleaned[header_idx + 1 :], start=header_idx + 2):
        if len(row) > len(labels):
            labels = dedupe_labels(labels + [f"Coluna {i + 1}" for i in range(len(labels), len(row))])
        record = {labels[i]: (row[i] if i < len(row) else "") for i in range(len(labels))}
        if not any(str(value).strip() for value in record.values()):
            continue
        record["__rowIndex"] = offset
        records.append(record)
    return records


def discover_gids(pubhtml: str, base_pub: str) -> list[str]:
    gids: list[str] = []
    for match in re.finditer(r"gid=(\d+)", pubhtml):
        gid = match.group(1)
        window = pubhtml[max(0, match.start() - 500) : match.end() + 500]
        if "acompanh" in norm(window) and gid not in gids:
            gids.insert(0, gid)
        elif gid not in gids:
            gids.append(gid)
    if "0" not in gids:
        gids.append("0")
    return gids


def candidate_score(records: list[dict], fields: list[str]) -> tuple[int, int, int, int]:
    visible_fields = [field for field in fields if not str(field).startswith("__")]
    known = header_score(visible_fields)
    # Priorização: maior quantidade de colunas publicadas, aderência aos cabeçalhos
    # esperados e, por fim, volume de linhas. Assim evitamos parar na primeira aba
    # quando a publicação contém outras abas/gids com a base completa.
    return (len(visible_fields), known, min(len(records), 20000), len(records))


def fetch_source(source: dict) -> tuple[list[dict], list[str], list[str]]:
    errors: list[str] = []
    candidates_found: list[tuple[tuple[int, int, int, int], str, list[dict], list[str]]] = []
    base = f"https://docs.google.com/spreadsheets/d/e/{source['pubId']}"
    pubhtml_text = ""

    try:
        pubhtml_text = fetch_text(source["url"])
    except Exception as exc:  # noqa: BLE001
        errors.append(f"pubhtml: {exc}")

    gids = discover_gids(pubhtml_text, base) if pubhtml_text else ["0"]
    csv_urls = [f"{base}/pub?gid={gid}&single=true&output=csv" for gid in gids]
    csv_urls.append(f"{base}/pub?output=csv")

    seen_urls: set[str] = set()
    for url in csv_urls:
        if url in seen_urls:
            continue
        seen_urls.add(url)
        try:
            rows = parse_csv_rows(fetch_text(url))
            records = rows_to_records(rows, source)
            if records:
                fields = list(records[0].keys())
                score = candidate_score(records, fields)
                candidates_found.append((score, f"csv:{url}", records, fields))
                errors.append(f"candidato {url}: {len(records)} linhas / {len(fields)} campos / score {score}")
            else:
                errors.append(f"csv sem dados: {url}")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"csv {url}: {exc}")

    if pubhtml_text:
        try:
            for index, table in enumerate(parse_html_tables(pubhtml_text), start=1):
                records = rows_to_records(table, source)
                if records:
                    fields = list(records[0].keys())
                    score = candidate_score(records, fields)
                    candidates_found.append((score, f"html:table-{index}", records, fields))
                    errors.append(f"candidato html table-{index}: {len(records)} linhas / {len(fields)} campos / score {score}")
            if not any(origin.startswith("html:") for _, origin, _, _ in candidates_found):
                errors.append("html sem tabela útil")
        except Exception as exc:  # noqa: BLE001
            errors.append(f"html parse: {exc}")

    if candidates_found:
        candidates_found.sort(key=lambda item: item[0], reverse=True)
        score, origin, records, fields = candidates_found[0]
        errors.append(f"selecionado {origin}: {len(records)} linhas / {len(fields)} campos / score {score}")
        return records, fields, errors

    return [], [], errors

def main() -> int:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    result = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "targetSheet": "acompanhamento",
        "sources": [],
        "errors": [],
    }
    for source in SOURCES:
        print(f"::group::Coletando {source['short']}")
        records, fields, errors = fetch_source(source)
        print(f"{source['short']}: {len(records)} registros, {len(fields)} campos")
        for error in errors[-8:]:
            print(f"aviso: {error}")
        print("::endgroup::")
        source_result = {
            "key": source["key"],
            "name": source["name"],
            "short": source["short"],
            "url": source["url"],
            "rowCount": len(records),
            "fieldCount": len(fields),
            "fields": fields,
            "records": records,
            "warnings": errors[-20:],
        }
        result["sources"].append(source_result)
        if not records:
            result["errors"].append(f"{source['short']}: nenhuma linha coletada")

    OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Snapshot gravado em {OUT} ({OUT.stat().st_size} bytes)")
    # Não falha o deploy: o painel possui fallback via publicação/proxy e modo demonstrativo.
    return 0


if __name__ == "__main__":
    sys.exit(main())
