#!/usr/bin/env python3
"""Gera data/sheets.json a partir das planilhas públicas publicadas no Google Sheets.

A rotina é executada no GitHub Actions antes do deploy do Pages para entregar ao
painel um snapshot local, sem depender de CORS do navegador. Ela preserva todas
as colunas encontradas na aba publicada/acompanhamento.
"""
from __future__ import annotations

import csv
import html
import io
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
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
    text = re.sub(r"([a-zà-ÿ])([A-ZÀ-Ý])", r"\1 \2", text)
    text = re.sub(r"([A-ZÀ-Ý]+)([A-ZÀ-Ý][a-zà-ÿ])", r"\1 \2", text)
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
    raw, charset = fetch_bytes(url, attempts=attempts, timeout=60, accept="text/html,text/csv,text/plain,*/*")
    text = raw.decode(charset or "utf-8", errors="replace")
    if "Sorry, the file you have requested does not exist" in text:
        raise RuntimeError("arquivo não encontrado pelo Google")
    return text


def fetch_bytes(url: str, attempts: int = 3, timeout: int = 60, accept: str = "*/*") -> tuple[bytes, str | None]:
    last_error: Exception | None = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": "Mozilla/5.0 (compatible; TorreControle/1.0)",
                    "Accept": accept,
                },
            )
            with urllib.request.urlopen(req, timeout=timeout) as response:
                raw = response.read()
                if not raw:
                    raise RuntimeError("resposta vazia")
                return raw, response.headers.get_content_charset()
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


def col_ref_to_index(ref: str) -> int:
    letters = re.sub(r"[^A-Z]", "", ref.upper())
    index = 0
    for char in letters:
        index = index * 26 + (ord(char) - ord("A") + 1)
    return max(0, index - 1)


def xml_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def relationship_map(zf: zipfile.ZipFile) -> dict[str, str]:
    try:
        root = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    except KeyError:
        return {}
    output: dict[str, str] = {}
    for rel in root:
        if xml_name(rel.tag) != "Relationship":
            continue
        rel_id = rel.attrib.get("Id", "")
        target = rel.attrib.get("Target", "")
        if rel_id and target:
            if target.startswith("/"):
                output[rel_id] = target.lstrip("/")
            else:
                output[rel_id] = "xl/" + target.lstrip("/")
    return output


def shared_strings(zf: zipfile.ZipFile) -> list[str]:
    try:
        root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    except KeyError:
        return []
    values: list[str] = []
    for si in root:
        if xml_name(si.tag) != "si":
            continue
        parts: list[str] = []
        for node in si.iter():
            if xml_name(node.tag) == "t" and node.text:
                parts.append(node.text)
        values.append("".join(parts))
    return values


def date_style_indexes(zf: zipfile.ZipFile) -> set[int]:
    builtin_date_ids = set(range(14, 23)) | {27, 30, 36, 45, 46, 47, 50, 57}
    try:
        root = ET.fromstring(zf.read("xl/styles.xml"))
    except KeyError:
        return set()
    custom_date_formats: set[int] = set()
    for node in root.iter():
        if xml_name(node.tag) != "numFmt":
            continue
        fmt_id = node.attrib.get("numFmtId")
        code = norm(node.attrib.get("formatCode", ""))
        if not fmt_id:
            continue
        if any(token in code for token in ("d", "dd", "dia", "yy", "yyyy", "h mm", "m yy")) and not any(token in code for token in ("red", "green", "blue", "r ")):
            try:
                custom_date_formats.add(int(fmt_id))
            except ValueError:
                pass
    date_styles: set[int] = set()
    cell_xfs = next((node for node in root.iter() if xml_name(node.tag) == "cellXfs"), None)
    if cell_xfs is None:
        return date_styles
    for index, xf in enumerate([child for child in cell_xfs if xml_name(child.tag) == "xf"]):
        try:
            num_fmt_id = int(xf.attrib.get("numFmtId", "0"))
        except ValueError:
            num_fmt_id = 0
        if num_fmt_id in builtin_date_ids or num_fmt_id in custom_date_formats:
            date_styles.add(index)
    return date_styles


def excel_serial_to_date_text(value: float) -> str:
    # Excel/Sheets usa 1899-12-30 como base prática para serials de data.
    dt = datetime(1899, 12, 30) + timedelta(days=value)
    return dt.strftime("%d/%m/%Y")


def format_xlsx_number(value: str, as_date: bool) -> str:
    raw = str(value or "").strip()
    if raw == "":
        return ""
    try:
        number = float(raw)
    except ValueError:
        return raw
    if as_date:
        return excel_serial_to_date_text(number)
    if number.is_integer():
        return str(int(number))
    return ("%f" % number).rstrip("0").rstrip(".")


def parse_xlsx_cell(cell: ET.Element, strings: list[str], date_styles: set[int]) -> str:
    cell_type = cell.attrib.get("t", "")
    try:
        style_index = int(cell.attrib.get("s", "-1"))
    except ValueError:
        style_index = -1
    value_node = next((child for child in cell if xml_name(child.tag) == "v"), None)
    if cell_type == "inlineStr":
        parts = [node.text or "" for node in cell.iter() if xml_name(node.tag) == "t"]
        return "".join(parts).strip()
    if value_node is None or value_node.text is None:
        return ""
    value = value_node.text.strip()
    if cell_type == "s":
        try:
            return strings[int(value)].strip()
        except (ValueError, IndexError):
            return value
    if cell_type == "b":
        return "VERDADEIRO" if value == "1" else "FALSO"
    return format_xlsx_number(value, style_index in date_styles)


def parse_xlsx_sheet_rows(zf: zipfile.ZipFile, sheet_path: str, strings: list[str], date_styles: set[int]) -> list[list[str]]:
    root = ET.fromstring(zf.read(sheet_path))
    sheet_data = next((node for node in root.iter() if xml_name(node.tag) == "sheetData"), None)
    if sheet_data is None:
        return []
    rows: list[list[str]] = []
    for row_node in [node for node in sheet_data if xml_name(node.tag) == "row"]:
        values: list[str] = []
        for cell in [node for node in row_node if xml_name(node.tag) == "c"]:
            ref = cell.attrib.get("r", "")
            col_index = col_ref_to_index(ref) if ref else len(values)
            while len(values) < col_index:
                values.append("")
            values.append(parse_xlsx_cell(cell, strings, date_styles))
        rows.append(values)
    return rows


def parse_xlsx_workbook(blob: bytes, source: dict) -> list[tuple[str, list[dict], list[str]]]:
    output: list[tuple[str, list[dict], list[str]]] = []
    with zipfile.ZipFile(io.BytesIO(blob)) as zf:
        workbook = ET.fromstring(zf.read("xl/workbook.xml"))
        rels = relationship_map(zf)
        strings = shared_strings(zf)
        date_styles = date_style_indexes(zf)
        for sheet in workbook.iter():
            if xml_name(sheet.tag) != "sheet":
                continue
            name = sheet.attrib.get("name", "Planilha")
            rel_id = sheet.attrib.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id") or sheet.attrib.get("r:id", "")
            path = rels.get(rel_id, "")
            if not path or path not in zf.namelist():
                continue
            rows = parse_xlsx_sheet_rows(zf, path, strings, date_styles)
            records = rows_to_records(rows, source)
            if records:
                output.append((name, records, list(records[0].keys())))
    return output


def discover_gids(pubhtml: str, base_pub: str) -> tuple[list[str], set[str]]:
    gids: list[str] = []
    target_gids: set[str] = set()
    for match in re.finditer(r"gid=(\d+)", pubhtml):
        gid = match.group(1)
        window = pubhtml[max(0, match.start() - 700) : match.end() + 700]
        is_target = "acompanh" in norm(window)
        if is_target:
            target_gids.add(gid)
        if gid not in gids:
            gids.append(gid)
    ordered = [gid for gid in gids if gid in target_gids] + [gid for gid in gids if gid not in target_gids]
    if "0" not in ordered:
        ordered.append("0")
    return ordered, target_gids


def candidate_score(records: list[dict], fields: list[str]) -> tuple[int, int, int, int]:
    visible_fields = [field for field in fields if not str(field).startswith("__")]
    known = header_score(visible_fields)
    # Priorização: maior quantidade de colunas publicadas, aderência aos cabeçalhos
    # esperados e, por fim, volume de linhas. Assim evitamos parar na primeira aba
    # quando a publicação contém outras abas/gids com a base completa.
    return (len(visible_fields), known, min(len(records), 20000), len(records))


def fetch_source(source: dict) -> tuple[list[dict], list[str], list[str]]:
    errors: list[str] = []
    candidates_found: list[tuple[tuple[int, int, int, int, int], str, list[dict], list[str]]] = []
    base = f"https://docs.google.com/spreadsheets/d/e/{source['pubId']}"
    pubhtml_text = ""

    # Primeiro tenta o XLSX completo publicado. Ele traz os nomes das abas e evita
    # cair no CSV padrão da primeira aba (ex.: Prog Emb), que omite NF, status,
    # ONTIME, ocorrências e devoluções da aba acompanhamento.
    try:
        blob, _ = fetch_bytes(f"{base}/pub?output=xlsx", attempts=3, timeout=120, accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,*/*")
        workbook_candidates = parse_xlsx_workbook(blob, source)
        if workbook_candidates:
            sheet_names = ", ".join(name for name, _, _ in workbook_candidates[:12])
            errors.append(f"xlsx abas úteis: {sheet_names}")
        for sheet_name, records, fields in workbook_candidates:
            sheet_norm = norm(sheet_name)
            target_priority = 2 if sheet_norm == "acompanhamento" else 1 if "acompanh" in sheet_norm else 0
            if target_priority <= 0:
                continue
            base_score = candidate_score(records, fields)
            score = (target_priority, *base_score)
            candidates_found.append((score, f"xlsx:{sheet_name}", records, fields))
            errors.append(f"candidato xlsx {sheet_name}: {len(records)} linhas / {len(fields)} campos / score {score}")
        if not any(origin.startswith("xlsx:") for _, origin, _, _ in candidates_found):
            errors.append("xlsx sem aba acompanhamento útil")
    except Exception as exc:  # noqa: BLE001
        errors.append(f"xlsx: {exc}")

    try:
        pubhtml_text = fetch_text(source["url"])
    except Exception as exc:  # noqa: BLE001
        errors.append(f"pubhtml: {exc}")

    gids, target_gids = discover_gids(pubhtml_text, base) if pubhtml_text else (["0"], set())
    if target_gids:
        # Para desempenho, quando a publicação informa a aba acompanhamento,
        # tentamos somente seus gids e o CSV padrão. Isso evita varrer abas de
        # apoio enormes e mantém o deploy dentro de poucos minutos.
        gids_to_try = [gid for gid in gids if gid in target_gids]
        errors.append(f"gids candidatos da aba acompanhamento: {','.join(sorted(target_gids))}")
    else:
        gids_to_try = gids[:4]
    if "0" not in gids_to_try:
        gids_to_try.append("0")
    csv_candidates = [(f"{base}/pub?gid={gid}&single=true&output=csv", gid) for gid in gids_to_try]
    csv_candidates.append((f"{base}/pub?output=csv", ""))

    seen_urls: set[str] = set()
    for url, gid in csv_candidates:
        if url in seen_urls:
            continue
        seen_urls.add(url)
        try:
            rows = parse_csv_rows(fetch_text(url))
            records = rows_to_records(rows, source)
            if records:
                fields = list(records[0].keys())
                base_score = candidate_score(records, fields)
                target_priority = 1 if gid in target_gids else 0
                score = (target_priority, *base_score)
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
                    base_score = candidate_score(records, fields)
                    score = (0, *base_score)
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
