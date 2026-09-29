'use strict';

const CONFIG = {
  refreshIntervalMs: 10 * 60 * 1000,
  sheetAttempts: ['acompanhamento', 'Acompanhamento', ''], // tenta a aba solicitada e, como fallback, a primeira aba publicada
  sources: [
    { key: 'filial-ba', name: 'Monitoramento Filial BA', short: 'Filial BA', color: '#1398d6', pubId: '2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr/pubhtml' },
    { key: 'matriz-sp', name: 'Monitoramento Matriz SP', short: 'Matriz SP', color: '#e62e2d', pubId: '2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0/pubhtml' }
  ],
  aliases: {
    dataProgramada: ['Data Progr', 'Data Programada', 'Data Programacao', 'Data Programação', 'Programação', 'Dt Programada', 'Data de Programação'],
    of: ['OF', 'Ordem de Frete', 'Ordem Frete', 'Carga', 'Nº Carga', 'N Carga', 'Numero Carga', 'Número Carga', 'Remessa'],
    agenda: ['Agenda', 'Data Agenda', 'Agendamento', 'Data Agendamento', 'Agenda Cliente'],
    cliente: ['Cliente', 'Destinatário', 'Destinatario', 'Razão Social', 'Razao Social'],
    cidade: ['Cidade', 'Município', 'Municipio', 'Cidade Destino'],
    uf: ['UF', 'Estado', 'UF Destino'],
    tpCarga: ['TP Carga', 'Tipo Carga', 'Tipo de Carga'],
    tpContratacao: ['TP Contratação', 'TP Contratacao', 'Tipo Contratação', 'Tipo Contratacao'],
    tpVeiculo: ['TP Veículo', 'TP Veiculo', 'Tipo Veículo', 'Tipo Veiculo'],
    placa: ['Placa', 'Cavalo', 'Placa Cavalo', 'Veículo', 'Veiculo'],
    recebVeiculo: ['Receb Veículo', 'Receb Veiculo', 'Recebimento Veículo', 'Recebimento Veiculo', 'Data Receb Veiculo'],
    faturamento: ['Faturamento', 'Status Faturamento', 'Situação Faturamento', 'Situacao Faturamento'],
    emissao: ['Emissão', 'Emissao', 'Data Emissão', 'Data Emissao', 'Dt Emissão', 'Dt Emissao'],
    saida: ['Saída', 'Saida', 'Data Saída', 'Data Saida', 'Dt Saída', 'Dt Saida', 'Expedição', 'Expedicao'],
    notaFiscal: ['NF', 'Nota Fiscal', 'NOTA FISCAL', 'Nº NF', 'N NF', 'Nota', 'Notas', 'NFe', 'NFe/CTe'],
    motorista: ['Motorista', 'Nome Motorista', 'Condutor', 'Driver'],
    transportadora: ['Transportadora', 'Transportador', 'Transp', 'Parceiro', 'Operador'],
    status: ['Status', 'Situação', 'Situacao', 'Status Entrega', 'Status da Entrega', 'Acompanhamento', 'Ocorrência Status', 'Status Viagem'],
    previsaoEntrega: ['Previsão de Entrega', 'Previsao de Entrega', 'Prev Entrega', 'Prev. Entrega', 'Data Prevista Entrega', 'Previsão', 'Previsao'],
    chegadaCliente: ['Chegada no cliente', 'Chegada Cliente', 'Data Chegada Cliente', 'Chegada', 'Data Entrega', 'Entrega Realizada'],
    ontime: ['ONTIME', 'On Time', 'On-time', 'No Prazo', 'Dentro do Prazo', 'OTD'],
    ocorrencia: ['Ocorrência', 'Ocorrencia', 'Descrição da Ocorrência', 'Descricao da Ocorrencia', 'Descrição Ocorrência', 'Descricao Ocorrencia', 'Motivo Ocorrência', 'Motivo Ocorrencia'],
    setor: ['Setor Responsável', 'Setor Responsavel', 'Setor', 'Responsável', 'Responsavel', 'Área Responsável', 'Area Responsavel'],
    devolucao: ['Devolução', 'Devolucao', 'Dev', 'Retorno', 'Logística Reversa', 'Logistica Reversa'],
    tipoDevolucao: ['Tipo Devolução', 'Tipo de Devolução', 'Tipo Devolucao', 'Tipo de Devolucao', 'Parcial/Total', 'Devolução Parcial Total'],
    motivoDevolucao: ['Motivo Devolução', 'Motivo da Devolução', 'Motivo Devolucao', 'Motivo da Devolucao', 'Motivo Dev', 'Motivo'],
    observacao: ['Observação', 'Observacoes', 'Observações', 'Observacao', 'Obs', 'OBS', 'Comentários', 'Comentarios'],
    valor: ['Valor', 'Valor NF', 'Valor Nota', 'R$'],
    peso: ['Peso', 'Peso Bruto', 'Cubagem']
  },
  regionByUf: {
    AC: 'Norte', AP: 'Norte', AM: 'Norte', PA: 'Norte', RO: 'Norte', RR: 'Norte', TO: 'Norte',
    AL: 'Nordeste', BA: 'Nordeste', CE: 'Nordeste', MA: 'Nordeste', PB: 'Nordeste', PE: 'Nordeste', PI: 'Nordeste', RN: 'Nordeste', SE: 'Nordeste',
    DF: 'Centro-Oeste', GO: 'Centro-Oeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste',
    ES: 'Sudeste', MG: 'Sudeste', RJ: 'Sudeste', SP: 'Sudeste',
    PR: 'Sul', RS: 'Sul', SC: 'Sul'
  },
  regionCenters: {
    Norte: { lat: -3.12, lon: -60.02 }, Nordeste: { lat: -12.97, lon: -38.50 }, 'Centro-Oeste': { lat: -15.79, lon: -47.88 }, Sudeste: { lat: -23.55, lon: -46.63 }, Sul: { lat: -25.43, lon: -49.27 }
  }
};

const STATE = {
  rawRecords: [], records: [], filtered: [], errors: [], isDemo: false, isLoading: false,
  lastUpdated: null, nextRefreshAt: null, activeTab: 'general', selectedRegion: 'all', mapStatus: 'all', weather: {},
  filters: { from: '', to: '', source: 'Filial BA', uf: 'all', status: 'all', search: '' }
};
const DOM = {};
const pendingGviz = new Map();
let snapshotPromise = null;
let gvizInstalled = false;
let loadSequence = 0;
const STATUS_CLASS = { 'Fora do prazo': 'danger', Finalizado: 'success', 'Aguard. descarga': 'warn', 'Em trânsito': 'info', 'Em aberto': 'purple', Faturado: 'purple' };

window.addEventListener('DOMContentLoaded', () => {
  cacheDom(); bindEvents(); installGvizFallback(); populateSourceFilter();
  addAiMessage('Olá! Sou o Monitor IA. Vou acompanhar as planilhas da Filial BA e Matriz SP a cada 10 minutos. Você pode pedir totais, atrasos, ocorrências, devoluções, localização de informações ou um relatório consolidado do recorte filtrado.');
  loadData({ manual: false });
  window.setInterval(() => loadData({ manual: false }), CONFIG.refreshIntervalMs);
  window.setInterval(updateCountdown, 1000);
});

function cacheDom() {
  ['refreshBtn','lastUpdate','nextUpdate','loadDot','alertBanner','filterFrom','filterTo','filterSource','filterUf','filterStatus','filterSearch','filterCounter','clearFiltersBtn','exportCsvBtn','exportReportBtn','monitorMessages','monitorForm','monitorInput','detailModal','modalClose','modalTitle','modalBody','tooltip','mapRegionFilter','mapStatusFilter','applyMapRegionGlobal']
    .forEach((id) => { DOM[id] = document.getElementById(id); });
  DOM.navTabs = Array.from(document.querySelectorAll('.nav-tab'));
  DOM.sourceTabs = Array.from(document.querySelectorAll('.unit-tab'));
  DOM.panels = Array.from(document.querySelectorAll('[data-tab-panel]'));
}

function bindEvents() {
  DOM.navTabs.forEach((button) => button.addEventListener('click', () => activateTab(button.dataset.tab)));
  DOM.sourceTabs.forEach((button) => button.addEventListener('click', () => selectSourceTab(button.dataset.source)));
  DOM.refreshBtn.addEventListener('click', () => loadData({ manual: true }));
  DOM.clearFiltersBtn.addEventListener('click', clearFilters);
  DOM.exportCsvBtn.addEventListener('click', exportCsv);
  DOM.exportReportBtn.addEventListener('click', () => { const report = buildQuickReport(); addAiMessage(report); downloadText(`relatorio-monitoramento-${dateForFile(new Date())}.txt`, report); });
  [DOM.filterFrom, DOM.filterTo, DOM.filterSource, DOM.filterUf, DOM.filterStatus].forEach((input) => input.addEventListener('change', onFilterChange));
  DOM.filterSearch.addEventListener('input', debounce(onFilterChange, 180));
  DOM.monitorForm.addEventListener('submit', (event) => { event.preventDefault(); const q = DOM.monitorInput.value.trim(); if (q) { DOM.monitorInput.value = ''; askMonitor(q); } });
  document.querySelectorAll('.monitor-chips button').forEach((button) => button.addEventListener('click', () => askMonitor(button.dataset.question || button.textContent)));
  document.body.addEventListener('click', (event) => {
    const row = event.target.closest('[data-open-record]'); if (row) return openRecordDetail(row.dataset.openRecord);
    const action = event.target.closest('[data-action]'); if (action) handleAction(action.dataset.action, action.dataset.value);
  });
  DOM.modalClose.addEventListener('click', () => DOM.detailModal.close());
  DOM.detailModal.addEventListener('click', (event) => {
    const rect = DOM.detailModal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) DOM.detailModal.close();
  });
  DOM.mapRegionFilter.addEventListener('change', () => { STATE.selectedRegion = DOM.mapRegionFilter.value; renderMap(); });
  DOM.mapStatusFilter.addEventListener('change', () => { STATE.mapStatus = DOM.mapStatusFilter.value; renderMap(); });
  DOM.applyMapRegionGlobal.addEventListener('click', () => {
    DOM.filterUf.value = STATE.selectedRegion === 'all' ? 'all' : (firstUfForRegion(STATE.selectedRegion) || 'all');
    onFilterChange();
  });
}

function activateTab(tab) {
  STATE.activeTab = tab;
  DOM.navTabs.forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
  DOM.panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === tab));
}

function selectSourceTab(source) {
  const selected = source || CONFIG.sources[0].short;
  DOM.filterSource.value = selected;
  DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === selected));
  onFilterChange();
}

async function loadData({ manual = false } = {}) {
  const seq = ++loadSequence;
  STATE.isLoading = true;
  snapshotPromise = null;
  setLoadStatus('loading', manual ? 'Atualizando manualmente...' : 'Atualizando planilhas...');
  showBanner('', '');
  const sourceResults = await Promise.all(CONFIG.sources.map(async (source) => {
    try { return { source, records: await fetchSource(source) }; }
    catch (error) { return { source, records: [], error }; }
  }));
  if (seq !== loadSequence) return;
  let records = sourceResults.flatMap((item) => item.records);
  STATE.errors = sourceResults.filter((item) => item.error).map((item) => `${item.source.short}: ${item.error.message || item.error}`);
  STATE.isDemo = false;
  if (!records.length) {
    records = buildDemoRecords(); STATE.isDemo = true;
    STATE.errors = ['Não foi possível carregar as planilhas pelo navegador neste momento. Exibindo base demonstrativa para manter o painel navegável. Verifique se as publicações Google continuam públicas.'];
  }
  STATE.rawRecords = records;
  STATE.records = records.map(normalizeRecord).filter(Boolean);
  STATE.lastUpdated = new Date(); STATE.nextRefreshAt = new Date(Date.now() + CONFIG.refreshIntervalMs); STATE.isLoading = false;
  populateDynamicFilters(); applyFiltersAndRender(); fetchWeather();
  if (STATE.errors.length) { setLoadStatus(STATE.isDemo ? 'error' : 'ok', STATE.isDemo ? 'Modo demonstrativo' : 'Atualizado com alertas'); showBanner(STATE.errors.join(' • '), STATE.isDemo ? 'error' : 'warn'); }
  else setLoadStatus('ok', 'Dados atualizados');
  if (manual) addAiMessage(`Atualização concluída às ${formatTime(STATE.lastUpdated)}. ${formatInteger(STATE.records.length)} registros carregados${STATE.isDemo ? ' em modo demonstrativo' : ''}.`);
}

async function fetchSource(source) {
  const errors = [];

  try {
    const snapshotRecords = await fetchSnapshotSource(source);
    if (snapshotRecords.length) return snapshotRecords;
    errors.push('snapshot local sem registros');
  } catch (error) {
    errors.push(`snapshot: ${error.message || error}`);
  }

  try {
    const publishedRecords = await fetchPublishedData(source);
    if (publishedRecords.length) return publishedRecords;
    errors.push('publicação CSV/HTML sem registros');
  } catch (error) {
    errors.push(`publicação: ${error.message || error}`);
  }

  throw new Error(errors.filter(Boolean).join(' | ') || 'Não foi possível consultar a planilha publicada.');
}

async function loadSheetSnapshot() {
  if (!snapshotPromise) {
    snapshotPromise = fetch(`data/sheets.json?_=${Date.now()}`, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      });
  }
  return snapshotPromise;
}

async function fetchSnapshotSource(source) {
  const snapshot = await loadSheetSnapshot();
  if (!snapshot || !Array.isArray(snapshot.sources)) throw new Error('arquivo data/sheets.json inválido');
  const sourceData = snapshot.sources.find((item) => item.key === source.key || item.short === source.short || item.name === source.name);
  if (!sourceData || !Array.isArray(sourceData.records) || !sourceData.records.length) throw new Error(`${source.short} sem registros no snapshot`);
  return sourceData.records.map((record, index) => ({
    ...record,
    __source: source.short,
    __sourceName: source.name,
    __sourceKey: source.key,
    __sourceUrl: source.url,
    __rowIndex: record.__rowIndex || index + 2,
    __snapshotGeneratedAt: snapshot.generatedAt || ''
  }));
}

async function fetchPublishedData(source) {
  const base = `https://docs.google.com/spreadsheets/d/e/${source.pubId}`;
  const candidates = [
    { type: 'csv', url: `${base}/pub?output=csv` },
    { type: 'html', url: source.url }
  ];
  const errors = [];
  for (const candidate of candidates) {
    try {
      const text = await fetchTextSmart(candidate.url);
      const records = candidate.type === 'csv' ? parseCsvRecords(text, source) : parseHtmlRecords(text, source);
      if (records.length) return records;
      errors.push(`${candidate.type} sem linhas`);
    } catch (error) {
      errors.push(error.message || String(error));
    }
  }
  throw new Error(errors.filter(Boolean).slice(-3).join(' | ') || 'falha ao ler publicação');
}

async function fetchTextSmart(url) {
  const urls = [
    url,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];
  let lastError = null;
  for (const target of urls) {
    let timer = null;
    try {
      const controller = new AbortController();
      timer = window.setTimeout(() => controller.abort(), target === url ? 6000 : 9000);
      const response = await fetch(target, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (!text || text.length < 20) throw new Error('resposta vazia');
      if (/Sorry, the file you have requested does not exist/i.test(text)) throw new Error('arquivo não encontrado');
      return text;
    } catch (error) {
      lastError = error;
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }
  throw lastError || new Error('falha de rede');
}

function parseCsvRecords(csvText, source) {
  if (!csvText || /<html/i.test(csvText.slice(0, 200))) return [];
  const rows = parseCsv(csvText).filter((row) => row.some(isPresent));
  if (rows.length < 2) return [];
  let headerIndex = rows.findIndex((row) => row.reduce((score, cell) => score + (isKnownHeader(cell) ? 1 : 0), 0) >= 3);
  if (headerIndex < 0) headerIndex = 0;
  const labels = dedupeLabels(rows[headerIndex].map((cell, index) => String(cell || `Coluna ${index + 1}`).trim()));
  return rows.slice(headerIndex + 1).map((values, rowIndex) => rowToRecord(labels, values, source, rowIndex + headerIndex + 2)).filter((record) => Object.entries(record).some(([key, value]) => !key.startsWith('__') && isPresent(value)));
}

function parseHtmlRecords(htmlText, source) {
  if (!/<table/i.test(htmlText)) return [];
  const doc = new DOMParser().parseFromString(htmlText, 'text/html');
  let best = [];
  doc.querySelectorAll('table').forEach((table) => {
    const rows = Array.from(table.querySelectorAll('tr')).map((tr) => Array.from(tr.querySelectorAll('th,td')).map((cell) => cell.textContent.replace(/\s+/g, ' ').trim())).map(stripSheetRowHeader).filter((row) => row.some(isPresent));
    const headerIndex = rows.findIndex((row) => row.reduce((score, cell) => score + (isKnownHeader(cell) ? 1 : 0), 0) >= 3);
    if (headerIndex < 0) return;
    const labels = dedupeLabels(rows[headerIndex].map((cell, index) => String(cell || `Coluna ${index + 1}`).trim()));
    const records = rows.slice(headerIndex + 1).map((values, rowIndex) => rowToRecord(labels, values, source, rowIndex + headerIndex + 2)).filter((record) => Object.entries(record).some(([key, value]) => !key.startsWith('__') && isPresent(value)));
    if (records.length > best.length) best = records;
  });
  return best;
}

function stripSheetRowHeader(row) {
  if (!row.length) return row;
  const first = String(row[0] || '').trim();
  const second = String(row[1] || '').trim();
  if (/^\d+$/.test(first) && (isKnownHeader(second) || row.length > 4)) return row.slice(1);
  if (first === '' && row.length > 4) return row.slice(1);
  if (/^[A-Z]+$/.test(first) && row.slice(0, 5).every((cell) => /^[A-Z]+$/.test(String(cell || '')))) return [];
  return row;
}

function rowToRecord(labels, values, source, rowNumber) {
  const record = {};
  labels.forEach((label, index) => { record[label] = values[index] == null ? '' : values[index]; });
  Object.assign(record, { __source: source.short, __sourceName: source.name, __sourceKey: source.key, __sourceUrl: source.url, __rowIndex: rowNumber });
  return record;
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i], next = text[i + 1];
    if (char === '"') {
      if (inQuotes && next === '"') { cell += '"'; i += 1; }
      else inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(cell); cell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else {
      cell += char;
    }
  }
  row.push(cell); rows.push(row);
  return rows;
}

function installGvizFallback() {
  if (gvizInstalled) return; gvizInstalled = true;
  window.google = window.google || {}; window.google.visualization = window.google.visualization || {}; window.google.visualization.Query = window.google.visualization.Query || {};
  const original = window.google.visualization.Query.setResponse;
  window.google.visualization.Query.setResponse = function setResponse(response) {
    const reqId = response && response.reqId != null ? String(response.reqId) : '';
    if (reqId && pendingGviz.has(reqId)) { pendingGviz.get(reqId)(response); return; }
    if (typeof original === 'function') original(response);
  };
}

function requestGviz(source, sheetName) {
  return new Promise((resolve, reject) => {
    const reqId = `${source.key}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const callbackName = `__gviz_${reqId.replace(/[^a-zA-Z0-9_]/g, '_')}`;
    const script = document.createElement('script'); let settled = false;
    const cleanup = () => { pendingGviz.delete(reqId); try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; } if (script.parentNode) script.parentNode.removeChild(script); };
    const settle = (fn, value) => { if (settled) return; settled = true; window.clearTimeout(timer); cleanup(); fn(value); };
    window[callbackName] = (response) => settle(resolve, response); pendingGviz.set(reqId, (response) => settle(resolve, response));
    const params = new URLSearchParams(); params.set('tq', 'select *'); params.set('tqx', `reqId:${reqId};out:json;responseHandler:${callbackName}`); if (sheetName) params.set('sheet', sheetName); params.set('_', String(Date.now()));
    script.async = true; script.onerror = () => settle(reject, new Error(`Falha ao acessar ${source.short}${sheetName ? ` / ${sheetName}` : ''}`)); script.src = `https://docs.google.com/spreadsheets/d/e/${source.pubId}/gviz/tq?${params.toString()}`;
    const timer = window.setTimeout(() => settle(reject, new Error(`Tempo limite ao carregar ${source.short}${sheetName ? ` / ${sheetName}` : ''}`)), 12000);
    document.head.appendChild(script);
  });
}

function parseGvizTable(table, source) {
  if (!table || !Array.isArray(table.cols) || !Array.isArray(table.rows)) return [];
  let labels = table.cols.map((col, index) => String(col.label || col.id || `Coluna ${index + 1}`).trim() || `Coluna ${index + 1}`);
  const rawRows = table.rows.map((row) => (row.c || []).map((cell, index) => formatGvizCell(cell, table.cols[index])));
  if (shouldPromoteFirstRowToHeader(labels, rawRows[0])) labels = rawRows.shift().map((value, index) => String(value || `Coluna ${index + 1}`).trim() || `Coluna ${index + 1}`);
  labels = dedupeLabels(labels);
  return rawRows.map((values, rowIndex) => {
    const record = {}; labels.forEach((label, index) => { record[label] = values[index] == null ? '' : values[index]; });
    Object.assign(record, { __source: source.short, __sourceName: source.name, __sourceKey: source.key, __sourceUrl: source.url, __rowIndex: rowIndex + 2 }); return record;
  }).filter((record) => Object.entries(record).some(([key, value]) => !key.startsWith('__') && isPresent(value)));
}

function shouldPromoteFirstRowToHeader(labels, firstRow) {
  if (!firstRow || !firstRow.length) return false;
  const labelScore = labels.reduce((score, label) => score + (isKnownHeader(label) ? 1 : 0), 0);
  const rowScore = firstRow.reduce((score, value) => score + (isKnownHeader(value) ? 1 : 0), 0);
  return rowScore >= 3 && rowScore > labelScore;
}
function isKnownHeader(value) { const n = normalizeText(value); return n && Object.values(CONFIG.aliases).flat().some((alias) => normalizeText(alias) === n || n.includes(normalizeText(alias))); }
function dedupeLabels(labels) { const count = new Map(); return labels.map((label, index) => { const clean = String(label || `Coluna ${index + 1}`).trim() || `Coluna ${index + 1}`; const n = clean.toLowerCase(); const seen = count.get(n) || 0; count.set(n, seen + 1); return seen ? `${clean} ${seen + 1}` : clean; }); }
function formatGvizCell(cell, col) { if (!cell) return ''; if (cell.f != null && String(cell.f).trim() !== '') return String(cell.f).trim(); const value = cell.v; if (value == null) return ''; if (value instanceof Date) return formatDate(value); if (typeof value === 'number') return (col && (col.type === 'date' || col.type === 'datetime')) ? formatDate(excelSerialToDate(value)) : String(value); return String(value).trim(); }

function normalizeRecord(record, index) {
  const row = { id: `${record.__sourceKey || 'src'}-${record.__rowIndex || index}-${Math.random().toString(36).slice(2, 6)}`, source: record.__source || '', sourceKey: record.__sourceKey || '', sourceName: record.__sourceName || record.__source || '', sourceUrl: record.__sourceUrl || '', raw: record };
  Object.keys(CONFIG.aliases).forEach((field) => { row[field] = getAliasedValue(record, CONFIG.aliases[field]); });
  row.uf = normalizeUf(row.uf || extractUfFromText(`${row.cidade} ${row.cliente}`)); row.region = CONFIG.regionByUf[row.uf] || 'Sem região';
  row.dataProgramadaDate = parseDate(row.dataProgramada); row.agendaDate = parseDate(row.agenda); row.previsaoEntregaDate = parseDate(row.previsaoEntrega); row.chegadaClienteDate = parseDate(row.chegadaCliente); row.emissaoDate = parseDate(row.emissao); row.saidaDate = parseDate(row.saida); row.referenceDate = row.dataProgramadaDate || row.saidaDate || row.agendaDate || row.previsaoEntregaDate || row.chegadaClienteDate || row.emissaoDate;
  const normalizedStatus = normalizeText(row.status || row.faturamento || '');
  row.delivered = isDelivered(normalizedStatus); row.waitingUnload = isWaitingUnload(normalizedStatus); row.transit = isTransit(normalizedStatus, row); row.open = !row.delivered && !row.waitingUnload;
  row.occurrenceText = getOccurrenceText(row); row.hasOccurrence = isMeaningfulOccurrence(row.occurrenceText); row.returnText = getReturnText(row); row.hasReturn = isMeaningfulReturn(row.returnText);
  row.ontimeStatus = computeOntimeStatus(row, normalizedStatus); row.performanceEligible = computePerformanceEligible(row, normalizedStatus); row.delayed = computeDelayed(row, normalizedStatus); row.statusBucket = computeStatusBucket(row, normalizedStatus); row.searchText = buildSearchText(row);
  return row;
}

function getAliasedValue(record, aliases) {
  const keys = Object.keys(record).filter((key) => !key.startsWith('__'));
  const normalizedKeys = keys.map((key) => ({ key, norm: normalizeText(key) }));
  const normalizedAliases = aliases.map((alias) => normalizeText(alias)).filter(Boolean);
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm === alias); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.startsWith(alias) || alias.startsWith(item.norm)); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.includes(alias) || alias.includes(item.norm)); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
  return '';
}

function computeOntimeStatus(row, normalizedStatus) {
  const ontime = normalizeText(row.ontime);
  if (ontime) {
    if (/(fora|atras|vencid|late|nao|não|no prazo nao)/.test(ontime) && !/(dentro|sim|ok|on time|ontime|no prazo)/.test(ontime)) return false;
    if (/(dentro|sim|ok|on time|ontime|no prazo|prazo cumprido)/.test(ontime) || ontime === 's') return true;
    if (ontime === 'n') return false;
  }
  if (/(fora do prazo|em transito fora do prazo|atrasad)/.test(normalizedStatus)) return false;
  const due = row.previsaoEntregaDate || row.agendaDate; const arrival = row.chegadaClienteDate;
  if (due && arrival) return startOfDay(arrival) <= endOfDay(due);
  return null;
}
function computePerformanceEligible(row, normalizedStatus) { if (row.delivered || row.waitingUnload) return row.ontimeStatus !== null; if (/(fora do prazo|em transito fora do prazo|atrasad)/.test(normalizedStatus)) return true; return row.ontimeStatus === false; }
function computeDelayed(row, normalizedStatus) { if (row.ontimeStatus === false || /(fora do prazo|atrasad|vencid)/.test(normalizedStatus)) return true; const due = row.previsaoEntregaDate || row.agendaDate; return Boolean(due && !row.delivered && !row.waitingUnload && startOfDay(due) < startOfDay(new Date())); }
function computeStatusBucket(row, normalizedStatus) { if (row.delayed) return 'Fora do prazo'; if (row.waitingUnload) return 'Aguard. descarga'; if (row.delivered) return 'Finalizado'; if (row.transit) return 'Em trânsito'; if (/(faturamento|faturado|entrada concluida|entrada concluída)/.test(normalizedStatus)) return 'Faturado'; return 'Em aberto'; }
function isDelivered(normalizedStatus) { return /(finalizad|entregue|entrega realizada|baixad|concluid)/.test(normalizedStatus) && !/(faturamento|entrada)/.test(normalizedStatus); }
function isWaitingUnload(normalizedStatus) { return /(aguardando descarga|descarga no cliente|em descarga|aguard descarga)/.test(normalizedStatus); }
function isTransit(normalizedStatus, row) { return /(transito|trânsito|rota|viagem|a caminho|em entrega|fazendo entrega|em andamento|desloc|carregado|coleta)/.test(normalizedStatus) || (!row.delivered && !row.waitingUnload && (row.placa || row.motorista) && (row.previsaoEntregaDate || row.agendaDate)); }
function getOccurrenceText(row) { return [row.ocorrencia, row.setor && row.ocorrencia ? `Setor: ${row.setor}` : ''].filter(Boolean).join(' • '); }
function getReturnText(row) { return [row.devolucao, row.tipoDevolucao, row.motivoDevolucao].filter(Boolean).join(' • '); }
function isMeaningfulOccurrence(value) { const n = normalizeText(value); return Boolean(n && !/(^nao$|^não$|sem ocorrencia|sem ocorrência|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function isMeaningfulReturn(value) { const n = normalizeText(value); return Boolean(n && !/(^nao$|^não$|sem devolucao|sem devolução|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function buildSearchText(row) { const rawValues = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__')).map(([, value]) => value); return normalizeText([row.source,row.of,row.notaFiscal,row.cliente,row.cidade,row.uf,row.placa,row.motorista,row.status,row.ontime,row.occurrenceText,row.returnText,row.observacao,...rawValues].join(' ')); }

function populateSourceFilter() {
  DOM.filterSource.innerHTML = CONFIG.sources.map((source) => `<option value="${escapeHtml(source.short)}">${escapeHtml(source.short)}</option>`).join('');
  DOM.filterSource.value = STATE.filters.source || CONFIG.sources[0].short;
  DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === DOM.filterSource.value));
}
function populateDynamicFilters() { const currentUf = DOM.filterUf.value || 'all'; const ufs = [...new Set(STATE.records.map((row) => row.uf).filter(Boolean))].sort(); DOM.filterUf.innerHTML = '<option value="all">Todas</option>' + ufs.map((uf) => `<option value="${escapeHtml(uf)}">${escapeHtml(uf)}</option>`).join(''); DOM.filterUf.value = ufs.includes(currentUf) ? currentUf : 'all'; STATE.filters.uf = DOM.filterUf.value; }
function onFilterChange() {
  STATE.filters = { from: DOM.filterFrom.value, to: DOM.filterTo.value, source: DOM.filterSource.value || CONFIG.sources[0].short, uf: DOM.filterUf.value, status: DOM.filterStatus.value, search: DOM.filterSearch.value.trim() };
  DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === STATE.filters.source));
  applyFiltersAndRender();
}
function clearFilters() { DOM.filterFrom.value = ''; DOM.filterTo.value = ''; DOM.filterSource.value = CONFIG.sources[0].short; DOM.filterUf.value = 'all'; DOM.filterStatus.value = 'all'; DOM.filterSearch.value = ''; DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === DOM.filterSource.value)); onFilterChange(); }
function applyFiltersAndRender() { STATE.filtered = STATE.records.filter((row) => matchesFilters(row, STATE.filters)); renderAll(); }
function matchesFilters(row, filters) {
  if (filters.source !== 'all' && row.source !== filters.source) return false; if (filters.uf !== 'all' && row.uf !== filters.uf) return false;
  if (filters.from) { const from = parseDate(filters.from); if (!row.referenceDate || startOfDay(row.referenceDate) < startOfDay(from)) return false; }
  if (filters.to) { const to = parseDate(filters.to); if (!row.referenceDate || startOfDay(row.referenceDate) > endOfDay(to)) return false; }
  if (filters.status !== 'all') {
    if (filters.status === 'delayed' && !row.delayed) return false; if (filters.status === 'transit' && !row.transit) return false; if (filters.status === 'delivered' && !row.delivered) return false; if (filters.status === 'waiting' && !row.waitingUnload) return false; if (filters.status === 'occurrence' && !row.hasOccurrence) return false; if (filters.status === 'return' && !row.hasReturn) return false; if (filters.status === 'open' && !row.open) return false;
  }
  return !(filters.search && !row.searchText.includes(normalizeText(filters.search)));
}
function renderAll() { updateHeaderStatus(); renderGeneral(); renderPerformance(); renderOccurrences(); renderReturns(); renderMap(); renderTicker(); }
function updateHeaderStatus() { const count = STATE.filtered.length; DOM.filterCounter.textContent = `${formatInteger(count)} registro${count === 1 ? '' : 's'} no recorte`; if (STATE.lastUpdated) DOM.lastUpdate.textContent = `Atualizado às ${formatTime(STATE.lastUpdated)}`; }
function setLoadStatus(status, message) { DOM.loadDot.classList.remove('loading', 'error'); if (status === 'loading') DOM.loadDot.classList.add('loading'); if (status === 'error') DOM.loadDot.classList.add('error'); DOM.lastUpdate.textContent = status === 'ok' && STATE.lastUpdated ? `${message} às ${formatTime(STATE.lastUpdated)}` : message; updateCountdown(); }
function updateCountdown() { if (!STATE.nextRefreshAt) { DOM.nextUpdate.textContent = 'próxima: --:--'; return; } const remaining = Math.max(0, STATE.nextRefreshAt.getTime() - Date.now()); const minutes = Math.floor(remaining / 60000); const seconds = Math.floor((remaining % 60000) / 1000); DOM.nextUpdate.textContent = `próxima: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; }
function showBanner(message, type = 'warn') { if (!message) { DOM.alertBanner.classList.add('hidden'); DOM.alertBanner.textContent = ''; return; } DOM.alertBanner.classList.remove('hidden'); DOM.alertBanner.textContent = message; DOM.alertBanner.style.borderColor = type === 'error' ? 'rgba(230,46,45,.35)' : 'rgba(255,176,32,.26)'; DOM.alertBanner.style.background = type === 'error' ? 'rgba(230,46,45,.10)' : 'rgba(255,176,32,.10)'; DOM.alertBanner.style.color = type === 'error' ? '#ffd3d0' : '#ffe6b0'; }

function renderGeneral() {
  const metrics = computeMetrics(STATE.filtered);
  document.getElementById('generalKpis').innerHTML = [
    kpiCard('Total de notas', formatInteger(metrics.totalNotes), `${formatInteger(metrics.totalLoads)} cargas únicas`, '▦', '', 'all'),
    kpiCard('Cargas em atraso', formatInteger(metrics.delayed), `${percent(metrics.delayed, metrics.totalRecords)} do recorte`, '⚠', 'danger', 'delayed'),
    kpiCard('Cargas entregues', formatInteger(metrics.delivered), `${formatInteger(metrics.waitingUnload)} aguardando descarga`, '✓', 'success', 'delivered'),
    kpiCard('Motoristas em trânsito', formatInteger(metrics.driversInTransit), `${formatInteger(metrics.inTransit)} veículos/cargas em trânsito`, '🚚', 'info', 'transit'),
    kpiCard('Ocorrências', formatInteger(metrics.occurrences), `${formatInteger(metrics.occurrenceUfs)} UFs com registro`, '!', 'warn', 'occurrence'),
    kpiCard('Devoluções', formatInteger(metrics.returns), `${formatInteger(metrics.returnRegions)} regiões impactadas`, '↩', 'purple', 'return'),
    kpiCard('Performance ONTIME', `${metrics.ontimeRate}%`, `${formatInteger(metrics.performanceEligible)} notas contabilizadas`, '◉', metrics.ontimeRate >= 90 ? 'success' : metrics.ontimeRate >= 75 ? 'warn' : 'danger', null),
    kpiCard('Agendas D+2', formatInteger(metrics.d2Agendas), `${formatInteger(metrics.todayAgendas)} para hoje`, '📅', 'info', null)
  ].join('');
  renderBarList('statusChart', countBy(STATE.filtered, (row) => row.statusBucket), { empty: 'Nenhum status encontrado no recorte.', colorResolver: (label) => statusColorClass(label), actionResolver: (label) => ({ action: 'statusBucket', value: label }) });
  renderBarList('ufChart', topEntries(countBy(STATE.filtered, (row) => row.uf || 'Sem UF'), 12), { empty: 'Nenhuma UF encontrada no recorte.', actionResolver: (label) => ({ action: 'uf', value: label }) });
  renderSourcePanels(); renderInsights('generalInsights', buildGeneralInsights(STATE.filtered)); renderRecordsTable('generalTable', STATE.filtered, { limit: 300 });
}

function kpiCard(title, value, subtitle, icon, variant = '', filterStatus = null) {
  const action = filterStatus ? `data-action="filterStatus" data-value="${escapeHtml(filterStatus)}"` : '';
  return `<article class="kpi-card ${escapeHtml(variant)} ${filterStatus ? 'kpi-clickable' : ''}" ${action} title="${filterStatus ? 'Clique para filtrar' : 'Indicador do recorte atual'}"><div class="kpi-top"><span class="kpi-title">${escapeHtml(title)}</span><span class="kpi-icon">${escapeHtml(icon)}</span></div><div class="kpi-value">${escapeHtml(String(value))}</div><div class="kpi-subtitle">${escapeHtml(subtitle)}</div></article>`;
}
function renderSourcePanels() {
  const source = CONFIG.sources.find((item) => item.short === STATE.filters.source) || CONFIG.sources[0];
  const rows = STATE.filtered;
  const m = computeMetrics(rows);
  const html = `<div class="source-card selected-source" style="border-color:${source.color}44"><strong>${escapeHtml(source.short)}</strong><div class="source-metrics"><span><b>${formatInteger(rows.length)}</b> registros</span><span><b>${formatInteger(m.delayed)}</b> atrasos</span><span><b>${formatInteger(m.delivered)}</b> entregues</span><span><b>${m.ontimeRate}%</b> ONTIME unidade</span></div></div>`;
  document.getElementById('sourcePanels').innerHTML = rows.length ? html : emptyState('Nenhuma informação para a unidade selecionada no recorte.');
}

function renderPerformance() {
  const rows = STATE.filtered, eligible = rows.filter((row) => row.performanceEligible);
  const consolidatedRows = STATE.records.filter((row) => matchesFilters(row, { ...STATE.filters, source: 'all' }));
  const consolidatedEligible = consolidatedRows.filter((row) => row.performanceEligible);
  const consolidatedOntime = consolidatedEligible.filter((row) => row.ontimeStatus === true).length;
  const consolidatedRate = consolidatedEligible.length ? Math.round((consolidatedOntime / consolidatedEligible.length) * 100) : 0;
  const ontime = eligible.filter((row) => row.ontimeStatus === true).length;
  const late = eligible.filter((row) => row.ontimeStatus === false || row.delayed).length;
  const notCountedTransit = rows.filter((row) => row.transit && !row.performanceEligible && !row.delayed).length;
  const rate = eligible.length ? Math.round((ontime / eligible.length) * 100) : 0;
  document.getElementById('performanceKpis').innerHTML = [
    kpiCard('Percentual consolidado', `${consolidatedRate}%`, `BA + SP • ${formatInteger(consolidatedEligible.length)} notas elegíveis`, '◎', consolidatedRate >= 90 ? 'success' : consolidatedRate >= 75 ? 'warn' : 'danger'),
    kpiCard(`Notas ${STATE.filters.source}`, formatInteger(eligible.length), 'Finalizado, aguardando descarga ou fora do prazo', 'Σ'),
    kpiCard('Dentro do prazo', formatInteger(ontime), `${rate}% de aderência da unidade`, '✓', 'success'),
    kpiCard('Fora do prazo', formatInteger(late), `${percent(late, eligible.length)} da base ONTIME`, '⚠', 'danger', 'delayed'),
    kpiCard('Em trânsito não contado', formatInteger(notCountedTransit), 'Dentro do prazo ou sem fechamento', '🚚', 'info', 'transit')
  ].join('');
  document.getElementById('ontimeGauge').innerHTML = `<div class="gauge-ring" style="--pct:${rate}"><div class="gauge-content"><strong>${rate}%</strong><span>ONTIME</span></div></div>`;
  renderPerformanceBars('performanceSource', groupBy(eligible, (row) => row.source || 'Sem origem'), 'origem');
  renderPerformanceBars('performanceUf', groupBy(eligible, (row) => row.uf || 'Sem UF'), 'UF');
  renderRecordsTable('lateTable', rows.filter((row) => row.delayed || (row.performanceEligible && row.ontimeStatus === false)), { limit: 300, empty: 'Nenhuma carga fora do prazo no recorte.' });
}
function renderPerformanceBars(containerId, grouped, labelType) {
  const entries = Object.entries(grouped).map(([label, rows]) => {
    const ontime = rows.filter((row) => row.ontimeStatus === true).length; return [label, { rows: rows.length, rate: rows.length ? Math.round((ontime / rows.length) * 100) : 0 }];
  }).sort((a, b) => b[1].rows - a[1].rows).slice(0, 12);
  const container = document.getElementById(containerId);
  if (!entries.length) { container.innerHTML = emptyState(`Sem dados elegíveis para performance por ${labelType}.`); return; }
  container.innerHTML = entries.map(([label, item]) => {
    const cls = item.rate >= 90 ? 'success' : item.rate >= 75 ? 'warn' : 'danger';
    const action = labelType === 'UF' ? `data-action="uf" data-value="${escapeHtml(label)}"` : '';
    return `<div class="bar-row clickable" ${action}><div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div><div class="bar-track"><div class="bar-fill ${cls}" style="width:${item.rate}%"></div></div><div class="bar-value">${item.rate}% • ${formatInteger(item.rows)}</div></div>`;
  }).join('');
}

function renderOccurrences() {
  const rows = STATE.filtered.filter((row) => row.hasOccurrence);
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF'), bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), descriptions = countBy(rows, (row) => simplifyDescription(row.ocorrencia || row.occurrenceText));
  document.getElementById('occurrenceKpis').innerHTML = [
    kpiCard('Total de ocorrências', formatInteger(rows.length), `${formatInteger(Object.keys(byUf).length)} UFs impactadas`, '⚠', 'warn', 'occurrence'),
    kpiCard('Setores envolvidos', formatInteger(Object.keys(bySector).length), topLabel(bySector) ? `Principal: ${topLabel(bySector)}` : 'Sem setor informado', '▤', 'info'),
    kpiCard('Motoristas / placas', formatInteger(Object.keys(byDriver).length), topLabel(byDriver) ? `Maior recorrência: ${topLabel(byDriver)}` : 'Sem motorista informado', '🚚', 'purple'),
    kpiCard('Ocorrências em atraso', formatInteger(rows.filter((row) => row.delayed).length), 'Com status fora do prazo', '!', 'danger', 'delayed')
  ].join('');
  renderBarList('occurrenceUf', topEntries(byUf, 10), { empty: 'Sem ocorrências por UF.', colorResolver: () => 'warn', actionResolver: (label) => ({ action: 'uf', value: label }) });
  renderBarList('occurrenceSector', topEntries(bySector, 10), { empty: 'Sem setor responsável informado.', colorResolver: () => 'purple' });
  renderBarList('occurrenceDrivers', topEntries(byDriver, 10), { empty: 'Sem motoristas/placas com ocorrência.', colorResolver: () => 'danger' });
  renderTagCloud('occurrenceDescriptions', topEntries(descriptions, 18));
  renderInsights('occurrenceInsights', buildOccurrenceInsights(rows));
  renderRecordsTable('occurrenceTable', rows, { limit: 300, empty: 'Nenhuma ocorrência registrada no recorte.' });
}

function renderReturns() {
  const rows = STATE.filtered.filter((row) => row.hasReturn);
  const byType = countBy(rows, (row) => cleanLabel(row.tipoDevolucao || row.devolucao) || 'Sem tipo'), byReason = countBy(rows, (row) => cleanLabel(row.motivoDevolucao || row.devolucao) || 'Sem motivo'), byRegion = countBy(rows, (row) => row.region || 'Sem região'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa');
  document.getElementById('returnKpis').innerHTML = [
    kpiCard('Total de devoluções', formatInteger(rows.length), `${percent(rows.length, STATE.filtered.length)} do recorte`, '↩', 'purple', 'return'),
    kpiCard('Devolução parcial', formatInteger(rows.filter((row) => normalizeText(row.tipoDevolucao).includes('parcial')).length), 'Tipo identificado na planilha', '½', 'info'),
    kpiCard('Devolução total', formatInteger(rows.filter((row) => normalizeText(row.tipoDevolucao).includes('total')).length), 'Tipo identificado na planilha', '1', 'warn'),
    kpiCard('Com observações', formatInteger(rows.filter((row) => isPresent(row.observacao)).length), 'Notas com OBS para análise', '✎', 'success')
  ].join('');
  renderBarList('returnTypes', topEntries(byType, 10), { empty: 'Sem tipo de devolução informado.', colorResolver: () => 'purple' });
  renderBarList('returnReasons', topEntries(byReason, 10), { empty: 'Sem motivos de devolução.', colorResolver: () => 'warn' });
  renderBarList('returnRegions', topEntries(byRegion, 10), { empty: 'Sem devoluções por região.', colorResolver: () => 'danger', actionResolver: (label) => ({ action: 'region', value: label }) });
  renderBarList('returnDrivers', topEntries(byDriver, 12), { empty: 'Sem motoristas/placas com devolução.', colorResolver: () => 'info' });
  renderInsights('returnInsights', buildReturnInsights(rows));
  renderRecordsTable('returnTable', rows, { limit: 300, empty: 'Nenhuma devolução registrada no recorte.' });
}

function renderMap() {
  const mapRows = getMapRows();
  const selected = STATE.selectedRegion;
  const panelRows = selected === 'all' ? mapRows : mapRows.filter((row) => row.region === selected);
  const panelMetric = selected === 'all' ? computeRegionMetrics(mapRows) : computeRegionMetrics(panelRows);

  const completedRows = STATE.filtered.filter((row) => row.delivered || row.waitingUnload);
  const pendingRows = STATE.filtered.filter((row) => !row.delivered && !row.waitingUnload);
  const deliveredLate = completedRows.filter((row) => row.delayed || row.ontimeStatus === false).length;
  const deliveredOnTime = Math.max(0, completedRows.length - deliveredLate);
  const pendingLate = pendingRows.filter((row) => row.delayed).length;
  const pendingOnTime = Math.max(0, pendingRows.length - pendingLate);
  const deliveredRate = completedRows.length ? Math.round((deliveredOnTime / completedRows.length) * 100) : 0;
  const pendingRate = pendingRows.length ? Math.round((pendingOnTime / pendingRows.length) * 100) : 0;

  setText('mapCompletedTotal', formatInteger(completedRows.length));
  setText('mapPendingTotal', formatInteger(pendingRows.length));
  setText('mapDeliveredOnTime', formatInteger(deliveredOnTime));
  setText('mapDeliveredLate', formatInteger(deliveredLate));
  setText('mapPendingOnTime', formatInteger(pendingOnTime));
  setText('mapPendingLate', formatInteger(pendingLate));
  setHtml('mapPerformanceGauge', speedometerHtml(deliveredRate, deliveredRate >= 90 ? '#1789c9' : '#ee2f52'));
  setHtml('mapPendingGauge', speedometerHtml(pendingRate, pendingRate >= 90 ? '#1789c9' : '#e9b800'));
  setHtml('mapEvolutionChart', evolutionHtml(STATE.filtered));

  renderHeatmapBrazil(panelRows, selected);
  document.getElementById('regionPanelTitle').textContent = selected === 'all' ? 'Todas as regiões' : selected;
  document.getElementById('regionPanelSub').textContent = `${formatInteger(panelRows.length)} registros no mapa filtrado.`;
  renderRegionSummary(panelMetric);
  renderInsights('mapAiAlerts', buildMapAlerts(panelRows, selected));
  renderRecordsTable('mapTable', panelRows, { limit: 300, empty: 'Nenhum registro para a região/status selecionado.' });
}

function renderHeatmapBrazil(rows, selected) {
  const regions = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
  const regionMetrics = Object.fromEntries(regions.map((region) => [region, computeRegionMetrics(rows.filter((row) => row.region === region))]));
  const maxOpen = Math.max(1, ...Object.values(regionMetrics).map((metric) => metric.open + metric.delayed + metric.occurrences + metric.returns));
  const outline = 'M305 42 C282 44 266 56 245 59 C219 63 205 82 187 98 C166 117 139 110 122 131 C105 152 106 178 88 197 C69 217 47 229 51 258 C55 289 82 304 106 319 C132 335 138 360 130 389 C121 423 142 454 176 463 C204 471 222 491 243 509 C272 535 313 535 338 509 C356 491 379 478 407 484 C443 491 476 466 483 430 C488 405 503 388 524 372 C558 346 575 308 566 268 C558 232 530 212 513 182 C497 154 496 121 471 98 C446 74 411 73 380 63 C354 55 334 39 305 42 Z';
  const regionPaths = {
    Norte: 'M52 255 C57 222 82 207 99 188 C115 169 112 145 130 128 C148 111 169 119 190 99 C207 83 221 63 247 59 C269 56 284 44 306 42 C335 39 354 55 380 63 L382 153 L342 214 L294 252 L224 246 L157 308 L106 320 C82 305 56 286 52 255 Z',
    Nordeste: 'M382 66 C413 73 446 75 471 98 C496 121 497 154 513 182 C530 212 558 232 566 268 C575 308 558 346 524 372 L469 345 L438 288 L392 260 L343 215 L382 153 Z',
    'Centro-Oeste': 'M157 308 L224 246 L294 252 L343 215 L392 260 L394 334 L351 392 L286 421 L210 395 L130 389 C138 360 132 335 106 320 Z',
    Sudeste: 'M351 392 L394 334 L469 345 L524 372 C503 388 488 405 483 430 C476 466 443 491 407 484 C379 478 356 491 338 509 L286 421 Z',
    Sul: 'M210 395 L286 421 L338 509 C313 535 272 535 243 509 C222 491 204 471 176 463 C154 457 137 441 130 421 Z'
  };
  const labelPos = { Norte: [218, 165], Nordeste: [455, 214], 'Centro-Oeste': [285, 335], Sudeste: [419, 418], Sul: [245, 462] };
  const colors = { Norte: '#dfeef4', Nordeste: '#e6f0ec', 'Centro-Oeste': '#e6ebf4', Sudeste: '#edf0f7', Sul: '#e9f4ec' };
  const ufGroups = groupBy(rows.filter((row) => row.uf && UF_MAP_POINTS[row.uf]), (row) => row.uf);
  const maxUf = Math.max(1, ...Object.values(ufGroups).map((items) => items.length));
  const heatSpots = Object.entries(ufGroups).map(([uf, items]) => {
    const point = UF_MAP_POINTS[uf];
    const metric = computeRegionMetrics(items);
    const weight = items.length + metric.delayed * 1.6 + metric.occurrences * 1.25 + metric.returns * 1.25;
    const radius = Math.min(50, 15 + Math.sqrt(weight / maxUf) * 42);
    return `<g class="heat-spot" data-uf="${escapeHtml(uf)}" data-count="${items.length}" data-delayed="${metric.delayed}" transform="translate(${point.x} ${point.y})">
      <circle r="${radius}" fill="#11e680" opacity="0.28"></circle>
      <circle r="${radius * 0.68}" fill="#ffe100" opacity="0.42"></circle>
      <circle r="${radius * 0.42}" fill="#ff1e1e" opacity="0.74"></circle>
      <text y="4" text-anchor="middle" class="heat-label">${escapeHtml(uf)}</text>
    </g>`;
  }).join('');

  document.getElementById('brazilMap').innerHTML = `
    <svg viewBox="0 0 620 590" role="img" aria-label="Mapa de calor do Brasil por UF">
      <defs>
        <linearGradient id="seaBg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bfe5ef"/><stop offset="1" stop-color="#9ccfdc"/></linearGradient>
        <clipPath id="brasilClipHeat"><path d="${outline}"></path></clipPath>
        <filter id="heatBlur"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>
      <rect x="0" y="0" width="620" height="590" fill="url(#seaBg)"/>
      <g class="map-tile-lines" opacity="0.5">
        <path d="M14 123 C82 82 150 86 209 130 C277 181 353 160 420 120 C486 81 552 94 617 142"></path>
        <path d="M14 360 C83 304 174 310 249 352 C333 399 406 387 478 336 C529 300 573 295 617 306"></path>
        <path d="M82 0 C108 99 116 198 99 296 C83 393 97 489 139 590"></path>
        <path d="M486 0 C462 118 462 226 494 326 C525 420 518 506 482 590"></path>
      </g>
      <g clip-path="url(#brasilClipHeat)">
        ${regions.map((region) => {
          const metric = regionMetrics[region];
          const intensity = (metric.open + metric.delayed + metric.occurrences + metric.returns) / maxOpen;
          const opacity = 0.7 + intensity * 0.25;
          return `<path class="map-region ${selected === region ? 'active' : ''}" data-region="${region}" d="${regionPaths[region]}" fill="${colors[region]}" fill-opacity="${opacity.toFixed(2)}"></path>`;
        }).join('')}
        <g class="state-lines" opacity="0.62">
          <path d="M132 129 C155 172 190 192 223 246"></path><path d="M246 59 C260 110 285 163 294 252"></path><path d="M380 63 C370 117 365 174 343 215"></path><path d="M513 182 C475 196 430 213 392 260"></path><path d="M566 268 C513 279 467 302 394 334"></path><path d="M106 320 C159 329 214 350 286 421"></path><path d="M130 389 C196 392 252 401 351 392"></path><path d="M338 509 C357 463 382 431 469 345"></path><path d="M210 395 C219 431 227 470 243 509"></path>
        </g>
        <g filter="url(#heatBlur)">${heatSpots}</g>
      </g>
      <path class="brazil-outline" d="${outline}"></path>
      <g class="map-city-labels">
        <text x="235" y="164">Manaus</text><text x="397" y="352">Brasília</text><text x="386" y="466">São Paulo</text><text x="477" y="371">Salvador</text><text x="524" y="304">Recife</text>
      </g>
      ${regions.map((region) => `<text class="map-label region-heat-label" x="${labelPos[region][0]}" y="${labelPos[region][1]}">${region}</text>`).join('')}
      <g class="heat-legend" transform="translate(425 528)">
        <rect width="174" height="42" rx="7" fill="rgba(255,255,255,.82)"></rect>
        <circle cx="18" cy="21" r="10" fill="#11e680" opacity=".45"></circle><circle cx="44" cy="21" r="10" fill="#ffe100" opacity=".6"></circle><circle cx="70" cy="21" r="10" fill="#ff1e1e" opacity=".76"></circle>
        <text x="92" y="18">Mapa de calor</text><text x="92" y="32">volume e criticidade</text>
      </g>
    </svg>`;

  const map = document.getElementById('brazilMap');
  map.querySelectorAll('.map-region').forEach((path) => {
    path.addEventListener('mousemove', (event) => showMapTooltip(event, path.dataset.region, regionMetrics[path.dataset.region]));
    path.addEventListener('mouseleave', hideTooltip);
    path.addEventListener('click', () => { STATE.selectedRegion = path.dataset.region; DOM.mapRegionFilter.value = STATE.selectedRegion; renderMap(); });
  });
  map.querySelectorAll('.heat-spot').forEach((spot) => {
    const uf = spot.dataset.uf;
    const ufRows = rows.filter((row) => row.uf === uf);
    spot.addEventListener('mousemove', (event) => showUfTooltip(event, uf, ufRows));
    spot.addEventListener('mouseleave', hideTooltip);
    spot.addEventListener('click', () => { DOM.filterUf.value = uf; onFilterChange(); });
  });
}

function speedometerHtml(rate, color) {
  const safeRate = Math.max(0, Math.min(100, Number(rate) || 0));
  return `<svg viewBox="0 0 220 132" class="speedometer-svg" aria-label="${safeRate}%">
    <path d="M24 112 A86 86 0 0 1 196 112" pathLength="100" class="speed-bg"></path>
    <path d="M24 112 A86 86 0 0 1 196 112" pathLength="100" class="speed-value" stroke="${color}" stroke-dasharray="${safeRate} ${100 - safeRate}"></path>
    <line x1="110" y1="112" x2="${110 + Math.cos((180 + (safeRate / 100) * 180) * Math.PI / 180) * 76}" y2="${112 + Math.sin((180 + (safeRate / 100) * 180) * Math.PI / 180) * 76}" class="speed-needle"></line>
    <circle cx="110" cy="112" r="5" fill="#5f6877"></circle>
    <text x="110" y="106" text-anchor="middle" class="speed-text" fill="${color}">${safeRate.toFixed(1)}%</text>
  </svg>`;
}

function evolutionHtml(rows) {
  const datedRows = rows.filter((row) => row.referenceDate);
  const anchor = datedRows.length ? new Date(Math.max(...datedRows.map((row) => row.referenceDate.getTime()))) : new Date();
  const months = [];
  for (let i = 5; i >= 0; i -= 1) months.push(new Date(anchor.getFullYear(), anchor.getMonth() - i, 1));
  return months.map((month) => {
    const monthRows = rows.filter((row) => row.referenceDate && row.referenceDate.getFullYear() === month.getFullYear() && row.referenceDate.getMonth() === month.getMonth());
    const eligible = monthRows.filter((row) => row.performanceEligible || row.delivered || row.waitingUnload);
    const ontime = eligible.filter((row) => row.ontimeStatus === true || (!row.delayed && row.ontimeStatus !== false)).length;
    const rate = eligible.length ? Math.round((ontime / eligible.length) * 1000) / 10 : 0;
    const height = Math.max(8, Math.min(100, rate));
    return `<div class="map-evolution-item"><div class="map-evolution-value">${rate.toFixed(1)}%</div><div class="map-evolution-bar"><span style="height:${height}%"></span></div><div class="map-evolution-label">${String(month.getMonth() + 1).padStart(2, '0')}/${String(month.getFullYear()).slice(-2)}</div></div>`;
  }).join('');
}

function showUfTooltip(event, uf, rows) {
  const metric = computeRegionMetrics(rows);
  DOM.tooltip.innerHTML = `<strong>${escapeHtml(uf)}</strong><br>${formatInteger(rows.length)} entregas/notas no recorte<br>${formatInteger(metric.open)} em aberto • ${formatInteger(metric.transit)} em trânsito<br>${formatInteger(metric.delayed)} atrasos • ${formatInteger(metric.occurrences)} ocorrências • ${formatInteger(metric.returns)} devoluções`;
  DOM.tooltip.style.left = `${event.clientX}px`;
  DOM.tooltip.style.top = `${event.clientY}px`;
  DOM.tooltip.classList.add('visible');
}

const UF_MAP_POINTS = {
  AC: { x: 94, y: 265 }, AM: { x: 224, y: 168 }, RR: { x: 257, y: 78 }, AP: { x: 377, y: 111 }, PA: { x: 357, y: 184 }, RO: { x: 203, y: 270 }, TO: { x: 409, y: 270 },
  MA: { x: 468, y: 224 }, PI: { x: 493, y: 258 }, CE: { x: 532, y: 250 }, RN: { x: 559, y: 269 }, PB: { x: 549, y: 288 }, PE: { x: 536, y: 307 }, AL: { x: 523, y: 326 }, SE: { x: 514, y: 346 }, BA: { x: 474, y: 374 },
  MT: { x: 309, y: 316 }, MS: { x: 312, y: 394 }, GO: { x: 391, y: 351 }, DF: { x: 414, y: 350 },
  MG: { x: 430, y: 420 }, ES: { x: 487, y: 440 }, RJ: { x: 461, y: 468 }, SP: { x: 389, y: 466 },
  PR: { x: 365, y: 501 }, SC: { x: 383, y: 529 }, RS: { x: 370, y: 558 }
};

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function getMapRows() { return STATE.filtered.filter((row) => !(STATE.mapStatus === 'open' && !row.open) && !(STATE.mapStatus === 'transit' && !row.transit) && !(STATE.mapStatus === 'delayed' && !row.delayed) && !(STATE.mapStatus === 'occurrence' && !row.hasOccurrence) && !(STATE.mapStatus === 'return' && !row.hasReturn)); }
function computeRegionMetrics(rows) { return { total: rows.length, open: rows.filter((row) => row.open).length, transit: rows.filter((row) => row.transit).length, doingDelivery: rows.filter((row) => normalizeText(row.status).includes('entrega') || row.waitingUnload).length, delayed: rows.filter((row) => row.delayed).length, occurrences: rows.filter((row) => row.hasOccurrence).length, returns: rows.filter((row) => row.hasReturn).length, vehicles: uniqueCount(rows, (row) => row.placa || row.motorista || row.of), todayAgendas: rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, new Date())).length }; }
function renderRegionSummary(metric) { const items = [['Entregas em aberto', metric.open], ['Veículos em trânsito', metric.transit], ['Fazendo entrega', metric.doingDelivery], ['Cargas em atraso', metric.delayed], ['Ocorrências recentes', metric.occurrences], ['Devoluções', metric.returns], ['Veículos / motoristas', metric.vehicles], ['Agendas hoje', metric.todayAgendas]]; document.getElementById('regionSummary').innerHTML = items.map(([label, value]) => `<div class="region-metric"><span>${escapeHtml(label)}</span><strong>${formatInteger(value)}</strong></div>`).join(''); }
function showMapTooltip(event, region, metric) { DOM.tooltip.innerHTML = `<strong>${escapeHtml(region)}</strong><br>${formatInteger(metric.open)} entregas em aberto • ${formatInteger(metric.transit)} veículos em trânsito<br>${formatInteger(metric.delayed)} atrasos • ${formatInteger(metric.occurrences)} ocorrências • ${formatInteger(metric.returns)} devoluções`; DOM.tooltip.style.left = `${event.clientX}px`; DOM.tooltip.style.top = `${event.clientY}px`; DOM.tooltip.classList.add('visible'); }
function hideTooltip() { DOM.tooltip.classList.remove('visible'); }

function renderBarList(containerId, data, options = {}) {
  const container = document.getElementById(containerId); const entries = Array.isArray(data) ? data : Object.entries(data || {});
  if (!entries.length) { container.innerHTML = emptyState(options.empty || 'Sem dados para exibir.'); return; }
  const max = Math.max(...entries.map(([, value]) => typeof value === 'number' ? value : Number(value) || 0), 1);
  container.innerHTML = entries.map(([label, value]) => { const number = typeof value === 'number' ? value : Number(value) || 0; const width = Math.max(3, Math.round((number / max) * 100)); const cls = options.colorResolver ? options.colorResolver(label, number) : ''; const action = options.actionResolver ? options.actionResolver(label, number) : null; const attrs = action ? `data-action="${escapeHtml(action.action)}" data-value="${escapeHtml(action.value)}"` : ''; return `<div class="bar-row ${action ? 'clickable' : ''}" ${attrs}><div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div><div class="bar-track"><div class="bar-fill ${escapeHtml(cls)}" style="width:${width}%"></div></div><div class="bar-value">${formatInteger(number)}</div></div>`; }).join('');
}
function renderTagCloud(containerId, entries) { const container = document.getElementById(containerId); if (!entries.length) { container.innerHTML = emptyState('Sem descrições registradas.'); return; } container.innerHTML = entries.map(([label, value]) => `<span class="tag" title="${escapeHtml(label)}"><b>${formatInteger(value)}</b> ${escapeHtml(truncate(label, 54))}</span>`).join(''); }
function renderInsights(containerId, insights) { const container = document.getElementById(containerId); if (!insights.length) { container.innerHTML = emptyState('Sem alertas para o recorte atual.'); return; } container.innerHTML = insights.map((item) => `<div class="insight ${escapeHtml(item.type || '')}"><span class="insight-icon">${escapeHtml(item.icon || '•')}</span><div>${escapeHtml(item.text)}</div></div>`).join(''); }

function renderRecordsTable(containerId, rows, options = {}) {
  const container = document.getElementById(containerId), limit = options.limit || 250, visibleRows = rows.slice(0, limit);
  if (!visibleRows.length) { container.innerHTML = emptyState(options.empty || 'Nenhum registro encontrado no recorte.'); return; }
  container.innerHTML = `<table class="data-table table-clickable"><thead><tr><th>Origem</th><th>Data / Agenda</th><th>Carga / NF</th><th>Cliente</th><th>Destino</th><th>Veículo / Motorista</th><th>Status</th><th>ONTIME</th><th>Ocorrência</th><th>Devolução</th></tr></thead><tbody>${visibleRows.map((row) => recordRowHtml(row)).join('')}</tbody></table>${rows.length > limit ? `<div class="empty-state">Exibindo ${formatInteger(limit)} de ${formatInteger(rows.length)} registros. Use filtros ou exporte o CSV para a base completa.</div>` : ''}`;
}
function recordRowHtml(row) {
  const ontimeBadge = row.ontimeStatus === true ? '<span class="badge success">No prazo</span>' : row.ontimeStatus === false ? '<span class="badge danger">Fora prazo</span>' : '<span class="badge">Sem ONTIME</span>';
  return `<tr data-open-record="${escapeHtml(row.id)}"><td><span class="badge info">${escapeHtml(row.source || '-')}</span></td><td><strong>${escapeHtml(formatDate(row.referenceDate) || row.dataProgramada || '-')}</strong><br><small>Agenda: ${escapeHtml(formatDate(row.agendaDate) || row.agenda || '-')}</small></td><td><strong>${escapeHtml(row.of || '-')}</strong><br><small>NF: ${escapeHtml(row.notaFiscal || '-')}</small></td><td title="${escapeHtml(row.cliente || '')}">${escapeHtml(truncate(row.cliente || '-', 34))}</td><td>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br><small>${escapeHtml(row.region || '')}</small></td><td>${escapeHtml(row.placa || '-')}<br><small>${escapeHtml(row.motorista || '-')}</small></td><td><span class="badge ${statusColorClass(row.statusBucket)}">${escapeHtml(row.statusBucket)}</span><br><small>${escapeHtml(truncate(row.status || row.faturamento || '-', 28))}</small></td><td>${ontimeBadge}</td><td>${row.hasOccurrence ? `<span class="badge warn" title="${escapeHtml(row.occurrenceText)}">Sim</span>` : '<span class="badge">Não</span>'}</td><td>${row.hasReturn ? `<span class="badge purple" title="${escapeHtml(row.returnText)}">Sim</span>` : '<span class="badge">Não</span>'}</td></tr>`;
}
function openRecordDetail(recordId) {
  const row = STATE.records.find((item) => item.id === recordId); if (!row) return;
  DOM.modalTitle.textContent = `${row.of || 'Carga'}${row.notaFiscal ? ` • NF ${row.notaFiscal}` : ''}`;
  const rawFields = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__'));
  DOM.modalBody.innerHTML = `<div class="modal-summary"><div><span>Origem</span><strong>${escapeHtml(row.source || '-')}</strong></div><div><span>Cliente</span><strong title="${escapeHtml(row.cliente || '')}">${escapeHtml(row.cliente || '-')}</strong></div><div><span>Destino</span><strong>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</strong></div><div><span>Status</span><strong>${escapeHtml(row.statusBucket)}</strong></div><div><span>Previsão</span><strong>${escapeHtml(formatDate(row.previsaoEntregaDate) || row.previsaoEntrega || '-')}</strong></div><div><span>Chegada cliente</span><strong>${escapeHtml(formatDate(row.chegadaClienteDate) || row.chegadaCliente || '-')}</strong></div><div><span>Placa</span><strong>${escapeHtml(row.placa || '-')}</strong></div><div><span>Motorista</span><strong>${escapeHtml(row.motorista || '-')}</strong></div></div><div class="field-grid">${rawFields.map(([key, value]) => `<div class="field-item"><span>${escapeHtml(key)}</span><p>${escapeHtml(isPresent(value) ? String(value) : '-')}</p></div>`).join('')}</div>`;
  if (typeof DOM.detailModal.showModal === 'function') DOM.detailModal.showModal(); else DOM.detailModal.setAttribute('open', 'open');
}
function handleAction(action, value) {
  if (action === 'filterStatus') { DOM.filterStatus.value = value || 'all'; onFilterChange(); }
  if (action === 'statusBucket') { const statusMap = { 'Fora do prazo': 'delayed', Finalizado: 'delivered', 'Aguard. descarga': 'waiting', 'Em trânsito': 'transit', 'Em aberto': 'open', Faturado: 'open' }; DOM.filterStatus.value = statusMap[value] || 'all'; onFilterChange(); }
  if (action === 'uf') { DOM.filterUf.value = value || 'all'; onFilterChange(); }
  if (action === 'region') { STATE.selectedRegion = value || 'all'; DOM.mapRegionFilter.value = STATE.selectedRegion; activateTab('map'); renderMap(); }
}

function computeMetrics(rows) {
  const performanceEligible = rows.filter((row) => row.performanceEligible);
  const ontime = performanceEligible.filter((row) => row.ontimeStatus === true).length;
  const today = new Date();
  return {
    totalRecords: rows.length, totalNotes: uniqueCount(rows, (row) => row.notaFiscal || row.of || row.id), totalLoads: uniqueCount(rows, (row) => row.of || row.notaFiscal || row.id),
    delayed: rows.filter((row) => row.delayed).length, delivered: rows.filter((row) => row.delivered).length, waitingUnload: rows.filter((row) => row.waitingUnload).length, inTransit: rows.filter((row) => row.transit).length,
    driversInTransit: uniqueCount(rows.filter((row) => row.transit), (row) => row.motorista || row.placa || row.of),
    occurrences: rows.filter((row) => row.hasOccurrence).length, occurrenceUfs: uniqueCount(rows.filter((row) => row.hasOccurrence), (row) => row.uf),
    returns: rows.filter((row) => row.hasReturn).length, returnRegions: uniqueCount(rows.filter((row) => row.hasReturn), (row) => row.region),
    performanceEligible: performanceEligible.length, ontimeRate: performanceEligible.length ? Math.round((ontime / performanceEligible.length) * 100) : 0,
    todayAgendas: rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, today)).length,
    d2Agendas: rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2))).length
  };
}
function buildGeneralInsights(rows) {
  const metrics = computeMetrics(rows), byUfDelayed = countBy(rows.filter((row) => row.delayed), (row) => row.uf || 'Sem UF'), byRegionOpen = countBy(rows.filter((row) => row.open), (row) => row.region || 'Sem região');
  const insights = [];
  insights.push(metrics.delayed ? { type: 'danger', icon: '⚠', text: `${formatInteger(metrics.delayed)} carga(s) estão fora do prazo. UF mais crítica: ${topLabel(byUfDelayed) || 'não identificada'}.` } : { type: 'success', icon: '✓', text: 'Não há cargas atrasadas no recorte atual.' });
  insights.push({ type: metrics.ontimeRate >= 90 ? 'success' : metrics.ontimeRate >= 75 ? 'warn' : 'danger', icon: '◉', text: `Performance ONTIME em ${metrics.ontimeRate}% considerando ${formatInteger(metrics.performanceEligible)} nota(s) elegíveis.` });
  if (metrics.todayAgendas || metrics.d2Agendas) insights.push({ type: 'warn', icon: '📅', text: `${formatInteger(metrics.todayAgendas)} agenda(s) para hoje e ${formatInteger(metrics.d2Agendas)} até D+2.` });
  if (metrics.occurrences) insights.push({ type: 'warn', icon: '!', text: `${formatInteger(metrics.occurrences)} ocorrência(s) registradas; priorize tratativa com setor responsável e motoristas recorrentes.` });
  if (metrics.returns) insights.push({ type: 'purple', icon: '↩', text: `${formatInteger(metrics.returns)} devolução(ões) no recorte. Região com mais entregas em aberto: ${topLabel(byRegionOpen) || 'sem dados'}.` });
  return insights;
}
function buildOccurrenceInsights(rows) {
  if (!rows.length) return [{ type: 'success', icon: '✓', text: 'Nenhuma ocorrência no recorte atual.' }];
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF'), bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), delayed = rows.filter((row) => row.delayed).length;
  return [
    { type: 'warn', icon: '⚠', text: `UF com mais ocorrências: ${topLabel(byUf)} (${formatInteger(Math.max(...Object.values(byUf)))} registro(s)).` },
    { type: 'info', icon: '▤', text: `Setor mais acionado: ${topLabel(bySector)}. Verifique gargalos e tratativas abertas.` },
    { type: 'danger', icon: '🚚', text: `Maior recorrência por motorista/placa: ${topLabel(byDriver)}.` },
    { type: delayed ? 'danger' : 'success', icon: delayed ? '!' : '✓', text: `${formatInteger(delayed)} ocorrência(s) também estão em cargas fora do prazo.` }
  ];
}
function buildReturnInsights(rows) {
  if (!rows.length) return [{ type: 'success', icon: '✓', text: 'Nenhuma devolução registrada no recorte atual.' }];
  const byRegion = countBy(rows, (row) => row.region || 'Sem região'), byReason = countBy(rows, (row) => cleanLabel(row.motivoDevolucao || row.devolucao) || 'Sem motivo'), byType = countBy(rows, (row) => cleanLabel(row.tipoDevolucao || row.devolucao) || 'Sem tipo');
  return [{ type: 'purple', icon: '↩', text: `Região com mais devoluções: ${topLabel(byRegion)}.` }, { type: 'warn', icon: '?', text: `Motivo mais frequente: ${topLabel(byReason)}.` }, { type: 'info', icon: '▤', text: `Tipo predominante: ${topLabel(byType)}. Use a tabela para abrir observações e notas.` }];
}
function buildMapAlerts(rows, selectedRegion) {
  const regionLabel = selectedRegion === 'all' ? 'Brasil' : selectedRegion, todayRows = rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, new Date())), delayed = rows.filter((row) => row.delayed), occ = rows.filter((row) => row.hasOccurrence), ret = rows.filter((row) => row.hasReturn);
  const weatherText = selectedRegion !== 'all' && STATE.weather[selectedRegion] ? `Tempo em ${selectedRegion}: ${STATE.weather[selectedRegion]}.` : buildWeatherHeadline();
  const alerts = [{ type: todayRows.length ? 'warn' : 'success', icon: '📅', text: `${regionLabel}: ${formatInteger(todayRows.length)} entrega(s)/agenda(s) para hoje.` }, { type: delayed.length ? 'danger' : 'success', icon: delayed.length ? '⚠' : '✓', text: `${formatInteger(delayed.length)} carga(s) em atraso no filtro do mapa.` }, { type: occ.length ? 'warn' : 'success', icon: '!', text: `${formatInteger(occ.length)} ocorrência(s) e ${formatInteger(ret.length)} devolução(ões) no mapa.` }];
  if (weatherText) alerts.push({ type: 'info', icon: '☁', text: weatherText }); return alerts;
}

function renderTicker() {
  const track = document.getElementById('tickerTrack'), rows = STATE.filtered, today = new Date();
  const todayAgendas = rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, today));
  const d2Agendas = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2)));
  const delayed = rows.filter((row) => row.delayed), occurrencesToday = rows.filter((row) => row.hasOccurrence && isSameDay(row.referenceDate, today)), returns = rows.filter((row) => row.hasReturn);
  const items = [`Atualizado ${STATE.lastUpdated ? formatDateTime(STATE.lastUpdated) : '--'} • ${formatInteger(rows.length)} registros monitorados`, `${formatInteger(todayAgendas.length)} carga(s) com agenda para hoje`, `${formatInteger(d2Agendas.length)} agenda(s) até D+2`, `${formatInteger(delayed.length)} carga(s) fora do prazo`, `${formatInteger(occurrencesToday.length)} ocorrência(s) do dia`, `${formatInteger(returns.length)} devolução(ões) no recorte`];
  const weather = buildWeatherHeadline(); if (weather) items.push(weather);
  const next = d2Agendas.slice(0, 3).map((row) => `${row.uf || 'UF'} ${row.of || row.notaFiscal || ''}`.trim()).filter(Boolean).join(', '); if (next) items.push(`Próximas agendas: ${next}`);
  track.innerHTML = items.map((item) => `<span>${escapeHtml(item)}</span>`).join('');
}
async function fetchWeather() {
  const weather = {};
  await Promise.all(Object.entries(CONFIG.regionCenters).map(async ([region, center]) => {
    try { const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${center.lat}&longitude=${center.lon}&current=temperature_2m,weather_code&timezone=America%2FSao_Paulo`, { cache: 'no-store' }); if (!response.ok) throw new Error('weather'); const data = await response.json(); const current = data.current || {}; weather[region] = `${Math.round(current.temperature_2m)}°C, ${weatherCode(current.weather_code)}`; }
    catch (_) { weather[region] = ''; }
  }));
  STATE.weather = weather; renderTicker(); if (STATE.activeTab === 'map') renderMap();
}
function buildWeatherHeadline() { const entries = Object.entries(STATE.weather).filter(([, value]) => value); return entries.length ? `Tempo nas regiões: ${entries.map(([region, text]) => `${region} ${text}`).join(' • ')}` : 'Tempo: consulta indisponível no momento; acompanhe regiões críticas antes da saída.'; }
function weatherCode(code) { return ({ 0:'céu limpo', 1:'poucas nuvens', 2:'parcialmente nublado', 3:'nublado', 45:'neblina', 48:'neblina intensa', 51:'garoa leve', 53:'garoa', 55:'garoa forte', 61:'chuva fraca', 63:'chuva', 65:'chuva forte', 80:'pancadas leves', 81:'pancadas', 82:'pancadas fortes', 95:'trovoadas' })[Number(code)] || 'condição variável'; }

function askMonitor(question) { addUserMessage(question); const response = answerQuestion(question); window.setTimeout(() => addAiMessage(response), 180); }
function answerQuestion(question) {
  const q = normalizeText(question), rows = STATE.filtered, metrics = computeMetrics(rows), delayed = rows.filter((row) => row.delayed), occurrences = rows.filter((row) => row.hasOccurrence), returns = rows.filter((row) => row.hasReturn);
  if (/(relatorio|relatório|resumo|consolid)/.test(q)) return buildQuickReport();
  if (/(onde|localiz|achar|encontr|guia|aba)/.test(q)) return 'Guia rápido:\n• Acompanhamento Geral: totais, status, UFs, filiais e tabela completa de viagens/cargas/NFs.\n• Performance de Entregas: % ONTIME, dentro/fora do prazo e cargas atrasadas.\n• Ocorrências: descrições, setor responsável, UFs e motoristas recorrentes.\n• Devoluções: tipo, motivo, região, motorista e observações.\n• Mapa: resumo por região com alertas e filtros superiores.\nDica: clique em qualquer linha de tabela para abrir todos os campos da planilha.';
  if (/(atras|fora do prazo|prazo venc)/.test(q)) { const byUf = countBy(delayed, (row) => row.uf || 'Sem UF'); const sample = delayed.slice(0, 5).map((row) => `• ${row.of || row.notaFiscal || 'Carga'} - ${row.cliente || 'cliente não informado'} (${row.uf || '-'})`).join('\n'); return `${formatInteger(delayed.length)} carga(s) estão em atraso no recorte atual (${percent(delayed.length, rows.length)} do total). UF mais crítica: ${topLabel(byUf) || 'sem UF'}.\n${sample || 'Não há cargas atrasadas para listar.'}`; }
  if (/(ontime|on time|performance|dentro do prazo|sla)/.test(q)) { const eligible = rows.filter((row) => row.performanceEligible), ontime = eligible.filter((row) => row.ontimeStatus === true).length, late = eligible.filter((row) => row.ontimeStatus === false || row.delayed).length; return `Performance ONTIME do recorte: ${metrics.ontimeRate}%. Base contabilizada: ${formatInteger(eligible.length)} nota(s). Dentro do prazo: ${formatInteger(ontime)}. Fora do prazo: ${formatInteger(late)}. Em trânsito dentro do prazo ou sem fechamento não entra no denominador.`; }
  if (/(ocorr|problema|sinistro|avaria)/.test(q)) { const byUf = countBy(occurrences, (row) => row.uf || 'Sem UF'), bySector = countBy(occurrences, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(occurrences.length)} ocorrência(s). UF com maior volume: ${topLabel(byUf) || '-'}. Setor mais acionado: ${topLabel(bySector) || '-'}. Motorista/placa com mais registros: ${topLabel(byDriver) || '-'}. Consulte a aba Ocorrências para descrições e linhas detalhadas.`; }
  if (/(devol|retorno|reversa)/.test(q)) { const byReason = countBy(returns, (row) => cleanLabel(row.motivoDevolucao || row.devolucao) || 'Sem motivo'), byRegion = countBy(returns, (row) => row.region || 'Sem região'), byDriver = countBy(returns, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(returns.length)} devolução(ões). Motivo principal: ${topLabel(byReason) || '-'}. Região mais impactada: ${topLabel(byRegion) || '-'}. Motorista/placa com maior volume: ${topLabel(byDriver) || '-'}. Abra a aba Devoluções para notas e observações.`; }
  if (/(agenda|hoje|amanha|amanhã|d\+2|proxim)/.test(q)) { const today = new Date(), d2 = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2))); const list = d2.slice(0, 8).map((row) => `• ${formatDate(row.agendaDate || row.previsaoEntregaDate)} - ${row.of || row.notaFiscal || 'Carga'} - ${row.uf || '-'} - ${truncate(row.cliente || '-', 42)}`).join('\n'); return `${formatInteger(d2.length)} agenda(s) encontradas até D+2.\n${list || 'Nenhuma agenda próxima no recorte atual.'}`; }
  if (/(motorista|placa|veiculo|veículo)/.test(q)) { const byTransit = countBy(rows.filter((row) => row.transit), (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), byOcc = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Motoristas/placas em trânsito: ${formatInteger(metrics.driversInTransit)}. Maior volume em trânsito: ${topLabel(byTransit) || '-'}. Maior recorrência em ocorrências: ${topLabel(byOcc) || '-'}.`; }
  if (/(total|quant|nota|carga|geral)/.test(q)) return `No recorte atual existem ${formatInteger(metrics.totalNotes)} nota(s), ${formatInteger(metrics.totalLoads)} carga(s), ${formatInteger(metrics.delivered)} finalizada(s), ${formatInteger(metrics.inTransit)} em trânsito, ${formatInteger(metrics.delayed)} atrasada(s), ${formatInteger(metrics.occurrences)} ocorrência(s) e ${formatInteger(metrics.returns)} devolução(ões).`;
  return `Resumo do recorte: ${formatInteger(metrics.totalNotes)} notas, ${formatInteger(metrics.delayed)} atrasos, ${formatInteger(metrics.occurrences)} ocorrências, ${formatInteger(metrics.returns)} devoluções e ONTIME de ${metrics.ontimeRate}%. Pergunte, por exemplo: "quais cargas estão em atraso?", "gerar relatório" ou "onde encontro devoluções por motivo?"`;
}
function addAiMessage(text) { addMessage(text, 'ai'); }
function addUserMessage(text) { addMessage(text, 'user'); }
function addMessage(text, kind) { const div = document.createElement('div'); div.className = `chat-message ${kind}`; div.textContent = text; DOM.monitorMessages.appendChild(div); DOM.monitorMessages.scrollTop = DOM.monitorMessages.scrollHeight; }
function buildQuickReport() {
  const rows = STATE.filtered, m = computeMetrics(rows), byStatus = topEntries(countBy(rows, (row) => row.statusBucket), 6), byUf = topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 8), byOcc = topEntries(countBy(rows.filter((row) => row.hasOccurrence), (row) => row.uf || 'Sem UF'), 5), byReturn = topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => row.region || 'Sem região'), 5);
  return `Relatório rápido - Torre de Controle\nGerado em ${formatDateTime(new Date())}\n\nRecorte atual: ${formatInteger(rows.length)} registro(s) | ${formatInteger(m.totalNotes)} nota(s) | ${formatInteger(m.totalLoads)} carga(s).\nEntregues/finalizadas: ${formatInteger(m.delivered)} | Aguardando descarga: ${formatInteger(m.waitingUnload)} | Em trânsito: ${formatInteger(m.inTransit)} | Fora do prazo: ${formatInteger(m.delayed)}.\nPerformance ONTIME: ${m.ontimeRate}% em ${formatInteger(m.performanceEligible)} nota(s) contabilizadas.\nOcorrências: ${formatInteger(m.occurrences)} | Devoluções: ${formatInteger(m.returns)} | Agendas até D+2: ${formatInteger(m.d2Agendas)}.\n\nStatus: ${formatEntryList(byStatus)}\nTop UFs: ${formatEntryList(byUf)}\nOcorrências por UF: ${formatEntryList(byOcc) || 'sem registros'}\nDevoluções por região: ${formatEntryList(byReturn) || 'sem registros'}\n\nRecomendações Monitor IA:\n1. Priorizar cargas fora do prazo nas UFs com maior concentração.\n2. Validar ocorrências com setor responsável antes das agendas do dia.\n3. Analisar devoluções por motivo e motorista para ações preventivas.`;
}

function exportCsv() {
  const rows = STATE.filtered; if (!rows.length) { addAiMessage('Não há registros no recorte atual para exportar.'); return; }
  const rawKeys = [...new Set(rows.flatMap((row) => Object.keys(row.raw || {}).filter((key) => !key.startsWith('__'))))];
  const keys = ['Origem', 'Região', 'Status Painel', 'Atrasada', 'ONTIME Painel', ...rawKeys];
  const csvRows = [keys];
  rows.forEach((row) => csvRows.push(['Origem', 'Região', 'Status Painel', 'Atrasada', 'ONTIME Painel', ...rawKeys].map((key) => {
    if (key === 'Origem') return row.source; if (key === 'Região') return row.region; if (key === 'Status Painel') return row.statusBucket; if (key === 'Atrasada') return row.delayed ? 'Sim' : 'Não'; if (key === 'ONTIME Painel') return row.ontimeStatus === true ? 'No prazo' : row.ontimeStatus === false ? 'Fora do prazo' : 'Sem ONTIME'; return row.raw[key] || '';
  })));
  const csv = csvRows.map((line) => line.map(csvEscape).join(';')).join('\n');
  downloadText(`monitoramento-${dateForFile(new Date())}.csv`, `\uFEFF${csv}`);
}
function downloadText(filename, text) { const blob = new Blob([text], { type: filename.endsWith('.csv') ? 'text/csv;charset=utf-8' : 'text/plain;charset=utf-8' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

function buildDemoRecords() {
  const today = new Date();
  const sources = CONFIG.sources;
  const sample = [
    { source: sources[0], uf: 'BA', cidade: 'Camaçari', cliente: 'GRUPO CASAS BAHIA S.A.', status: 'Em trânsito fora do prazo', ontime: 'Fora do Prazo', occ: 'Atraso por restrição de agenda', setor: 'Transporte', dev: '', tipo: '', motivo: '', placa: 'FHT 7198', mot: 'Carlos Santos', days: -1 },
    { source: sources[0], uf: 'PE', cidade: 'Recife', cliente: 'MAGAZINE LUIZA', status: 'Finalizado', ontime: 'Dentro do Prazo', occ: '', setor: '', dev: '', tipo: '', motivo: '', placa: 'RCP 1E92', mot: 'João Lima', days: 0 },
    { source: sources[0], uf: 'CE', cidade: 'Fortaleza', cliente: 'CARREFOUR COMERCIO', status: 'Aguardando Descarga no cliente', ontime: 'Dentro do Prazo', occ: 'Fila para descarga', setor: 'Cliente', dev: '', tipo: '', motivo: '', placa: 'TLN 5G68', mot: 'Marcos Silva', days: 1 },
    { source: sources[1], uf: 'SP', cidade: 'Araçatuba', cliente: 'ABASTECIMENTO LINHA AGUA', status: 'Em trânsito', ontime: '', occ: '', setor: '', dev: '', tipo: '', motivo: '', placa: 'GGM 1I76', mot: 'Pedro Alves', days: 2 },
    { source: sources[1], uf: 'MG', cidade: 'Belo Horizonte', cliente: 'WM COMERCIO', status: 'Finalizado', ontime: 'Fora do Prazo', occ: 'Cliente ausente na primeira tentativa', setor: 'Comercial', dev: 'Sim', tipo: 'Parcial', motivo: 'Divergência no pedido', placa: 'HMT 5F42', mot: 'Rafael Costa', days: -2 },
    { source: sources[1], uf: 'PR', cidade: 'Curitiba', cliente: 'LOJAS SIMONETTI', status: 'Em aberto', ontime: '', occ: '', setor: '', dev: 'Sim', tipo: 'Total', motivo: 'Recusa no recebimento', placa: 'ANH 8809', mot: 'Sem cadastro', days: 2 }
  ];
  return sample.map((item, index) => {
    const date = addDays(today, item.days), forecast = addDays(today, item.days), arrival = item.status === 'Finalizado' ? addDays(forecast, item.ontime.includes('Fora') ? 1 : 0) : '';
    return { 'Data Progr': formatDate(date), OF: `61000${60769 + index}`, Agenda: formatDate(forecast), Cliente: item.cliente, Cidade: item.cidade, UF: item.uf, 'TP Carga': index % 2 ? 'DC' : 'FC', 'TP Contratação': index % 2 ? 'AGREGADO' : 'FROTA', 'TP Veículo': index % 2 ? 'CARRETA' : 'TRUCK', Placa: item.placa, Motorista: item.mot, Faturamento: 'Faturamento Concluído', Status: item.status, 'Previsão de Entrega': formatDate(forecast), 'Chegada no cliente': arrival ? formatDate(arrival) : '', ONTIME: item.ontime, 'Descrição da Ocorrência': item.occ, 'Setor Responsável': item.setor, Devolução: item.dev, 'Tipo Devolução': item.tipo, 'Motivo Devolução': item.motivo, Observações: item.dev ? 'Registro demonstrativo para validar painel de devoluções.' : '', __source: item.source.short, __sourceName: item.source.name, __sourceKey: item.source.key, __sourceUrl: item.source.url, __rowIndex: index + 2 };
  });
}

function countBy(rows, getter) { return rows.reduce((acc, row) => { const key = getter(row) || 'Não informado'; acc[key] = (acc[key] || 0) + 1; return acc; }, {}); }
function groupBy(rows, getter) { return rows.reduce((acc, row) => { const key = getter(row) || 'Não informado'; (acc[key] = acc[key] || []).push(row); return acc; }, {}); }
function topEntries(obj, limit = 10) { return Object.entries(obj || {}).sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))).slice(0, limit); }
function topLabel(obj) { const top = topEntries(obj, 1)[0]; return top ? top[0] : ''; }
function formatEntryList(entries) { return entries.map(([label, value]) => `${label}: ${formatInteger(value)}`).join(' | '); }
function uniqueCount(rows, getter) { const set = new Set(); rows.forEach((row) => { const value = getter(row); if (isPresent(value)) set.add(String(value).trim()); }); return set.size; }
function statusColorClass(label) { return STATUS_CLASS[label] || ''; }
function emptyState(text) { return `<div class="empty-state">${escapeHtml(text)}</div>`; }
function cleanLabel(value) { const text = String(value || '').trim(); return text && !/^[-–—.]$/.test(text) ? text : ''; }
function simplifyDescription(text) { const clean = cleanLabel(text) || 'Sem descrição'; return truncate(clean.replace(/\s+/g, ' '), 90); }
function firstUfForRegion(region) { return Object.keys(CONFIG.regionByUf).find((uf) => CONFIG.regionByUf[uf] === region); }
function percent(value, total) { return total ? `${Math.round((value / total) * 100)}%` : '0%'; }
function formatInteger(value) { return Number(value || 0).toLocaleString('pt-BR'); }
function formatTime(date) { return date ? new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date) : ''; }
function formatDateTime(date) { return date ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date) : ''; }
function dateForFile(date) { return [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0'), String(date.getHours()).padStart(2,'0'), String(date.getMinutes()).padStart(2,'0')].join('-'); }
function truncate(value, length) { const str = String(value || ''); return str.length > length ? `${str.slice(0, length - 1)}…` : str; }
function escapeHtml(value) { return String(value == null ? '' : value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); }
function csvEscape(value) { const str = String(value == null ? '' : value).replace(/"/g, '""'); return /[";\n\r]/.test(str) ? `"${str}"` : str; }
function isPresent(value) { return value != null && String(value).trim() !== ''; }
function normalizeText(value) { return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
function normalizeUf(value) { const text = String(value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); const match = text.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/); return match ? match[1] : ''; }
function extractUfFromText(text) { return normalizeUf(text); }
function debounce(fn, delay) { let timer; return (...args) => { window.clearTimeout(timer); timer = window.setTimeout(() => fn(...args), delay); }; }
function parseDate(value) {
  if (!isPresent(value)) return null; if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  const raw = String(value).trim(); const dateCtor = raw.match(/Date\((\d{4}),\s*(\d{1,2}),\s*(\d{1,2})/); if (dateCtor) return new Date(Number(dateCtor[1]), Number(dateCtor[2]), Number(dateCtor[3]));
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/); if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
  const br = raw.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/); if (br) { let year = Number(br[3]); if (year < 100) year += year < 50 ? 2000 : 1900; return new Date(year, Number(br[2]) - 1, Number(br[1])); }
  const parsed = new Date(raw); return Number.isNaN(parsed.getTime()) ? null : parsed;
}
function excelSerialToDate(serial) { return new Date(Math.round((serial - 25569) * 86400 * 1000)); }
function formatDate(date) { if (!date) return ''; const d = date instanceof Date ? date : parseDate(date); return d && !Number.isNaN(d.getTime()) ? new Intl.DateTimeFormat('pt-BR').format(d) : ''; }
function startOfDay(date) { const d = new Date(date); d.setHours(0, 0, 0, 0); return d; }
function endOfDay(date) { const d = new Date(date); d.setHours(23, 59, 59, 999); return d; }
function addDays(date, days) { const d = new Date(date); d.setDate(d.getDate() + days); return d; }
function isSameDay(a, b) { if (!a || !b) return false; return startOfDay(a).getTime() === startOfDay(b).getTime(); }
function isBetweenDays(date, start, end) { if (!date) return false; const d = startOfDay(date).getTime(); return d >= startOfDay(start).getTime() && d <= endOfDay(end).getTime(); }
