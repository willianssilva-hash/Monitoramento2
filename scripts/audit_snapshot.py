#!/usr/bin/env python3
"""Valida o snapshot gerado antes do deploy do GitHub Pages.

O objetivo é impedir que o painel seja publicado com dados parciais, por exemplo
quando o CSV padrão do Google Sheets traz apenas a primeira aba/visão resumida e
omite colunas da aba acompanhamento (NF, status, ONTIME, ocorrências etc.).
"""
from __future__ import annotations

import json
import re
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
SNAPSHOT = ROOT / "data" / "sheets.json"
SUMMARY = ROOT / "data" / "audit-summary.json"

ALIASES = {
    "data": ["Data Progr", "Data Prog De Embarque", "Data Programada", "Data Programação", "Data de carregamento", "Data Carregamento", "Dt Carregamento", "Data Carga", "Data NF", "Data da entrega", "Previsão de Entrega", "Chegada no Cliente"],
    "of": ["OF", "Ordem de Frete", "Carga", "Chave OF + Cont"],
    "nota": ["NF", "Nota Fiscal", "Nº NF", "NFe"],
    "cliente": ["Cliente", "Destinatário", "Razão Social"],
    "cidade": ["Cidade", "Município", "Cidade Destino"],
    "uf": ["UF", "Estado", "UF Destino"],
    "contratacao": ["TP Contratação", "Contratação", "Tipo Contratação"],
    "veiculo": ["TP Veículo", "Veículo", "Tipo Veículo"],
    "placa": ["Placa", "Cavalo"],
    "status": ["Status", "Situação", "Faturamento", "Status Aplicativo"],
    "ontime": ["ONTIME", "ON TIME", "On Time", "No Prazo"],
    "ocorrencia": ["Ocorrência", "Descrição da Ocorrência", "Tipo de Ocorrência"],
    "devolucao": ["Devolução", "Tipo de Devolução", "Motivo Devolução"],
}

REQUIRED_GROUPS = ["data", "of", "cliente", "cidade", "uf", "contratacao", "veiculo", "placa", "status"]
RICH_GROUPS = ["nota", "ontime", "ocorrencia", "devolucao"]
MIN_FIELD_COUNT = 20
MIN_USABLE_ROWS = 10


def norm(value: object) -> str:
    text = str(value or "")
    text = re.sub(r"([a-zà-ÿ])([A-ZÀ-Ý])", r"\1 \2", text)
    text = re.sub(r"([A-ZÀ-Ý]+)([A-ZÀ-Ý][a-zà-ÿ])", r"\1 \2", text)
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def missing_token(value: object) -> bool:
    raw = str(value or "").strip()
    if not raw:
        return True
    if re.match(r"^#\s*(N/A|NOME\?|NAME\?|REF!?|VALUE!?|VALOR!?|DIV/0!?|NULL!?|NUM!?|ERRO!?|ERROR!?)$", raw, re.I):
        return True
    return norm(raw) in {"n a", "na", "nd", "n d", "nao disponivel", "não disponivel", "erro", "error", "null", "nulo", "undefined", "indefinido"}


def valid_doc(value: object) -> bool:
    raw = str(value or "").strip()
    if missing_token(raw):
        return False
    normalized = norm(raw)
    if normalized in {"0", "00", "000", "nao", "não", "sem", "sem documento", "sem nf", "sem of"}:
        return False
    if re.fullmatch(r"-?0+(?:[.,]0+)?", raw):
        return False
    return bool(re.search(r"[a-z0-9]", normalized))


def field_lookup(fields: Iterable[str]) -> dict[str, str]:
    normalized = {norm(field): field for field in fields if not str(field).startswith("__")}
    found: dict[str, str] = {}
    for group, aliases in ALIASES.items():
        aliases_norm = [norm(alias) for alias in aliases]
        for alias in aliases_norm:
            exact = normalized.get(alias)
            if exact:
                found[group] = exact
                break
        if group in found:
            continue
        for key, original in normalized.items():
            if any(key.startswith(alias) or alias in key for alias in aliases_norm):
                found[group] = original
                break
    return found


def value(record: dict, fields: dict[str, str], group: str) -> str:
    field = fields.get(group, "")
    return str(record.get(field, "")).strip() if field else ""


def is_retira(record: dict, fields: dict[str, str]) -> bool:
    return "retira" in norm(value(record, fields, "contratacao"))


def usable(record: dict, fields: dict[str, str]) -> bool:
    return not is_retira(record, fields) and (valid_doc(value(record, fields, "of")) or valid_doc(value(record, fields, "nota")))


def audit() -> int:
    if not SNAPSHOT.exists():
        print(f"ERRO: snapshot não encontrado em {SNAPSHOT}", file=sys.stderr)
        return 1
    data = json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    sources = data.get("sources") or []
    if len(sources) < 2:
        print("ERRO: snapshot precisa conter Filial BA e Matriz SP.", file=sys.stderr)
        return 1

    errors: list[str] = []
    summary = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "snapshotGeneratedAt": data.get("generatedAt"),
        "targetSheet": data.get("targetSheet"),
        "sources": [],
    }

    for source in sources:
        short = source.get("short") or source.get("name") or "Fonte"
        fields = [field for field in source.get("fields") or [] if not str(field).startswith("__")]
        records = source.get("records") or []
        found = field_lookup(fields)
        usable_rows = [record for record in records if usable(record, found)]
        retira_rows = [record for record in records if is_retira(record, found)]
        missing_docs = [record for record in records if not (valid_doc(value(record, found, "of")) or valid_doc(value(record, found, "nota")))]
        missing_required = [group for group in REQUIRED_GROUPS if group not in found]
        present_rich = [group for group in RICH_GROUPS if group in found]

        item = {
            "short": short,
            "rowCount": len(records),
            "fieldCount": len(fields),
            "usableRows": len(usable_rows),
            "retiraRows": len(retira_rows),
            "missingDocumentRows": len(missing_docs),
            "matchedFields": found,
            "warnings": source.get("warnings") or [],
        }
        summary["sources"].append(item)
        print(f"{short}: {len(records)} linhas brutas, {len(fields)} campos, {len(usable_rows)} úteis, {len(retira_rows)} retira excluíveis, {len(missing_docs)} sem OF/NF válido")

        if len(records) < MIN_USABLE_ROWS:
            errors.append(f"{short}: menos de {MIN_USABLE_ROWS} linhas brutas no snapshot")
        if len(usable_rows) < MIN_USABLE_ROWS:
            errors.append(f"{short}: menos de {MIN_USABLE_ROWS} linhas úteis após regras globais")
        if len(fields) < MIN_FIELD_COUNT:
            errors.append(f"{short}: somente {len(fields)} campos; provável aba parcial, esperado >= {MIN_FIELD_COUNT}")
        if missing_required:
            errors.append(f"{short}: campos obrigatórios ausentes: {', '.join(missing_required)}")
        if len(present_rich) < 3:
            errors.append(f"{short}: dados ricos insuficientes ({', '.join(present_rich) or 'nenhum'}); verificar NF/ONTIME/ocorrências/devoluções")

    SUMMARY.write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Resumo de auditoria gravado em {SUMMARY}")
    if errors:
        print("ERROS DE AUDITORIA:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
            print(f"::error title=Auditoria do snapshot::{error}")
        return 1
    print("Auditoria OK: snapshot contém as duas fontes, campos esperados e registros úteis conforme regras globais.")
    return 0


if __name__ == "__main__":
    sys.exit(audit())
