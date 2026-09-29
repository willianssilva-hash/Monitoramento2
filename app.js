'use strict';

const CONFIG = {
  refreshIntervalMs: 10 * 60 * 1000,
  sheetAttempts: ['acompanhamento', 'Acompanhamento', ''], // tenta a aba solicitada e, como fallback, a primeira aba publicada
  sources: [
    { key: 'filial-ba', name: 'Monitoramento Filial BA', short: 'Filial BA', color: '#1398d6', pubId: '2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr/pubhtml' },
    { key: 'matriz-sp', name: 'Monitoramento Matriz SP', short: 'Matriz SP', color: '#2fbf71', pubId: '2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0/pubhtml' }
  ],
  aliases: {
    mes: ['Mês', 'Mes', 'Mês Referência', 'Mes Referencia'],
    dataProgramada: ['Data Progr', 'Data Prog Embarque', 'Data Prog. Embarque', 'Data Prog De Embarque', 'Data Prog de Embarque', 'Data Programada', 'Data Programacao', 'Data Programação', 'Programação', 'Dt Programada', 'Data de Programação'],
    of: ['OF', 'Ordem de Frete', 'Ordem Frete', 'Carga', 'Nº Carga', 'N Carga', 'Numero Carga', 'Número Carga', 'Remessa'],
    agenda: ['Agenda', 'Data Agenda', 'Agendamento', 'Data Agendamento', 'Agenda Cliente'],
    cliente: ['Cliente', 'Destinatário', 'Destinatario', 'Razão Social', 'Razao Social'],
    cidade: ['Cidade', 'Município', 'Municipio', 'Cidade Destino'],
    uf: ['UF', 'Estado', 'UF Destino'],
    tpCarga: ['TP Carga', 'Tipo Carga', 'Tipo de Carga'],
    tpContratacao: ['TP Contratação', 'TP Contratacao', 'Tipo Contratação', 'Tipo Contratacao', 'Contratação', 'Contratacao'],
    tpVeiculo: ['TP Veículo', 'TP Veiculo', 'Tipo Veículo', 'Tipo Veiculo', 'Veículo', 'Veiculo'],
    placa: ['Placa', 'Cavalo', 'Placa Cavalo', 'Veículo', 'Veiculo'],
    recebVeiculo: ['Receb Veículo', 'Receb Veiculo', 'Recebimento Veículo', 'Recebimento Veiculo', 'Data Receb Veiculo'],
    faturamento: ['Faturamento', 'Status Faturamento', 'Situação Faturamento', 'Situacao Faturamento'],
    emissao: ['Emissão', 'Emissao', 'Data Emissão', 'Data Emissao', 'Data NF', 'Data Nota Fiscal', 'Dt Emissão', 'Dt Emissao'],
    saida: ['Saída', 'Saida', 'Data Saída', 'Data Saida', 'Data Saída Real', 'Data Saida Real', 'Dt Saída', 'Dt Saida', 'Expedição', 'Expedicao'],
    notaFiscal: ['NF', 'Nota Fiscal', 'NOTA FISCAL', 'Nº NF', 'N NF', 'Nota', 'Notas', 'NFe', 'NFe/CTe'],
    motorista: ['Motorista', 'Nome Motorista', 'Condutor', 'Driver'],
    transportadora: ['Transportadora', 'Transportador', 'Transp', 'Parceiro', 'Operador'],
    status: ['Status', 'Situação', 'Situacao', 'Status Entrega', 'Status da Entrega', 'Acompanhamento', 'Ocorrência Status', 'Status Viagem'],
    previsaoEntrega: ['Previsão de Entrega', 'Previsao de Entrega', 'Previsão deEntrega', 'Previsao deEntrega', 'Prev Entrega', 'Prev. Entrega', 'Data Prevista Entrega', 'Previsão', 'Previsao'],
    chegadaCliente: ['Chegada no cliente', 'Chegada Cliente', 'Data Chegada Cliente', 'Chegada', 'Data Entrega', 'Entrega Realizada'],
    ontime: ['ONTIME', 'On Time', 'On-time', 'No Prazo', 'Dentro do Prazo', 'OTD'],
    ocorrencia: ['Ocorrência', 'Ocorrencia', 'Descrição da Ocorrência', 'Descricao da Ocorrencia', 'Descrição Ocorrência', 'Descricao Ocorrencia', 'Motivo Ocorrência', 'Motivo Ocorrencia'],
    setor: ['Setor Responsável', 'Setor Responsavel', 'SetorResponsável', 'SetorResponsavel', 'Setor', 'Responsável', 'Responsavel', 'Área Responsável', 'Area Responsavel'],
    devolucao: ['Devolução', 'Devolucao', 'Dev', 'Retorno', 'Logística Reversa', 'Logistica Reversa'],
    tipoDevolucao: ['Tipo Devolução', 'Tipo de Devolução', 'TipoDevolução', 'TipoDevolucao', 'Tipo Devolucao', 'Tipo de Devolucao', 'Parcial/Total', 'Devolução Parcial Total'],
    motivoDevolucao: ['Motivo Devolução', 'Motivo da Devolução', 'MotivoDevolução', 'MotivoDevolucao', 'Motivo Devolucao', 'Motivo da Devolucao', 'Motivo Dev', 'Descrição Motivo Devolução', 'Descricao Motivo Devolucao'],
    observacao: ['Observação', 'Observacoes', 'Observações', 'Observacao', 'OBSERVAÇÃO 1', 'Observação 1', 'Obs', 'OBS', 'Comentários', 'Comentarios'],
    valor: ['Valor', 'Valor NF', 'Valor Nf', 'Valor Total NF', 'Valor Nota', 'R$'],
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
  brazilGeoJson: null, brazilGeoLoading: false, brazilGeoError: '', mapZoom: 1, mapPanX: 0, mapPanY: 0, mapDragging: false, mapDragStart: null, tableSorts: {},
  filters: { from: '', to: '', month: 'all', source: 'Filial BA', uf: 'all', status: 'all', search: '' }
};
const DOM = {};
const pendingGviz = new Map();
let snapshotPromise = null;
let gvizInstalled = false;
let loadSequence = 0;
const STATUS_CLASS = { 'Fora do prazo': 'danger', Finalizado: 'success', 'Aguard. descarga': 'warn', 'Em trânsito': 'info', 'Em aberto': 'purple', Faturado: 'purple' };

window.addEventListener('DOMContentLoaded', () => {
  cacheDom(); initTheme(); initPalette(); bindEvents(); installGvizFallback(); populateSourceFilter();
  addAiMessage('Olá! Sou o Monitor IA. Vou acompanhar as planilhas da Filial BA e Matriz SP a cada 10 minutos. Você pode pedir totais, atrasos, ocorrências, devoluções, localização de informações ou um relatório consolidado dos filtros atuais.');
  loadData({ manual: false });
  loadBrazilGeoJson();
  window.setInterval(() => loadData({ manual: false }), CONFIG.refreshIntervalMs);
  window.setInterval(updateCountdown, 1000);
});

function cacheDom() {
  ['refreshBtn','themeToggle','colorPalette','lastUpdate','nextUpdate','loadDot','alertBanner','filterFrom','filterTo','filterMonth','filterSource','filterUf','filterStatus','filterSearch','filterCounter','clearFiltersBtn','exportCsvBtn','exportReportBtn','exportDynamicReportBtn','monitorMessages','monitorForm','monitorInput','detailModal','modalClose','modalTitle','modalBody','tooltip','mapRegionFilter','mapStatusFilter','applyMapRegionGlobal','aiFab','brazilMap','mapZoomIn','mapZoomOut','mapZoomReset','mapZoomLevel']
    .forEach((id) => { DOM[id] = document.getElementById(id); });
  DOM.navTabs = Array.from(document.querySelectorAll('.nav-tab'));
  DOM.sourceTabs = Array.from(document.querySelectorAll('.unit-tab'));
  DOM.panels = Array.from(document.querySelectorAll('[data-tab-panel]'));
}

function bindEvents() {
  DOM.navTabs.forEach((button) => button.addEventListener('click', () => activateTab(button.dataset.tab)));
  DOM.sourceTabs.forEach((button) => button.addEventListener('click', () => selectSourceTab(button.dataset.source)));
  DOM.refreshBtn.addEventListener('click', () => loadData({ manual: true }));
  if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
  if (DOM.colorPalette) DOM.colorPalette.addEventListener('change', () => setPalette(DOM.colorPalette.value));
  DOM.clearFiltersBtn.addEventListener('click', clearFilters);
  DOM.exportCsvBtn.addEventListener('click', exportCsv);
  DOM.exportReportBtn.addEventListener('click', () => { const report = buildQuickReport(); addAiMessage(report); exportQuickReportXlsx(); });
  document.querySelectorAll('.subtab-button').forEach((button) => button.addEventListener('click', () => activatePerformanceView(button.dataset.performanceView)));
  document.querySelectorAll('.report-option').forEach((input) => input.addEventListener('change', renderReportBuilder));
  if (DOM.exportDynamicReportBtn) DOM.exportDynamicReportBtn.addEventListener('click', exportDynamicReport);
  [DOM.filterFrom, DOM.filterTo, DOM.filterMonth, DOM.filterSource, DOM.filterUf, DOM.filterStatus].forEach((input) => input.addEventListener('change', onFilterChange));
  DOM.filterSearch.addEventListener('input', debounce(onFilterChange, 180));
  if (DOM.brazilMap) bindMapZoomEvents();
  if (DOM.mapZoomIn) DOM.mapZoomIn.addEventListener('click', () => adjustMapZoom(0.2));
  if (DOM.mapZoomOut) DOM.mapZoomOut.addEventListener('click', () => adjustMapZoom(-0.2));
  if (DOM.mapZoomReset) DOM.mapZoomReset.addEventListener('click', resetMapZoom);
  DOM.monitorForm.addEventListener('submit', (event) => { event.preventDefault(); const q = DOM.monitorInput.value.trim(); if (q) { DOM.monitorInput.value = ''; askMonitor(q); } });
  document.querySelectorAll('.monitor-chips button').forEach((button) => button.addEventListener('click', () => askMonitor(button.dataset.question || button.textContent)));
  if (DOM.aiFab) DOM.aiFab.addEventListener('click', () => document.body.classList.toggle('ai-floating-open'));
  document.body.addEventListener('mousemove', handleSummaryTooltipMove);
  document.body.addEventListener('mouseout', handleSummaryTooltipOut);
  document.body.addEventListener('click', (event) => {
    const sortButton = event.target.closest('[data-table-sort]'); if (sortButton) return handleTableSort(sortButton);
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
    const next = STATE.selectedRegion === 'all' ? 'all' : (firstUfForRegion(STATE.selectedRegion) || 'all');
    DOM.filterUf.value = DOM.filterUf.value === next ? 'all' : next;
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

function initTheme() {
  const saved = localStorage.getItem('torre-theme') || 'light';
  document.body.dataset.theme = saved;
  updateThemeButton(saved);
}
function toggleTheme() {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  localStorage.setItem('torre-theme', next);
  updateThemeButton(next);
}
function updateThemeButton(theme) {
  if (!DOM.themeToggle) return;
  DOM.themeToggle.textContent = theme === 'dark' ? '☀ Tema claro' : '☾ Tema escuro';
}
function initPalette() {
  const saved = localStorage.getItem('torre-palette') || 'serena';
  setPalette(saved, { silent: true });
}
function setPalette(palette, options = {}) {
  const allowed = ['serena', 'oceano', 'menta', 'safira'];
  const selected = allowed.includes(palette) ? palette : 'serena';
  document.body.dataset.palette = selected;
  if (DOM.colorPalette) DOM.colorPalette.value = selected;
  if (!options.silent) localStorage.setItem('torre-palette', selected);
}
function activatePerformanceView(view = 'unit') {
  document.querySelectorAll('.subtab-button').forEach((button) => button.classList.toggle('active', button.dataset.performanceView === view));
  document.querySelectorAll('[data-performance-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.performancePanel === view));
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
  STATE.records = records.map(normalizeRecord).filter((row) => row && !isRetiraContract(row));
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
    errors.push('publicação da planilha sem registros');
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
  row.monthNumber = monthNameToNumber(row.mes) || (row.referenceDate ? row.referenceDate.getMonth() + 1 : null);
  const normalizedStatus = normalizeText(row.status || row.faturamento || '');
  row.delivered = isDelivered(normalizedStatus); row.waitingUnload = isWaitingUnload(normalizedStatus); row.transit = isTransit(normalizedStatus, row); row.open = !row.delivered && !row.waitingUnload;
  row.occurrenceText = getOccurrenceText(row); row.hasOccurrence = isMeaningfulOccurrence(row.occurrenceText);
  row.returnReason = extractReturnReason(record, row);
  if (row.returnReason) row.motivoDevolucao = row.returnReason;
  row.returnText = getReturnText(row); row.hasReturn = isMeaningfulReturn(row.returnText);
  row.returnType = normalizeReturnType(row);
  row.ontimeStatus = computeOntimeStatus(row, normalizedStatus); row.performanceEligible = computePerformanceEligible(row, normalizedStatus); row.delayed = computeDelayed(row, normalizedStatus); row.statusBucket = computeStatusBucket(row, normalizedStatus); row.searchText = buildSearchText(row);
  return row;
}

function getAliasedValue(record, aliases) {
  const keys = Object.keys(record).filter((key) => !key.startsWith('__'));
  const normalizedKeys = keys.map((key) => ({ key, norm: normalizeText(key) }));
  const normalizedAliases = aliases.map((alias) => normalizeText(alias)).filter(Boolean);
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm === alias); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.startsWith(alias)); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.includes(alias)); if (match && isPresent(record[match.key])) return String(record[match.key]).trim(); }
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
function getReturnText(row) { return [row.devolucao, row.tipoDevolucao, row.returnReason].filter(Boolean).join(' • '); }
function extractReturnReason(record, row) {
  const candidateKeys = Object.keys(record || {}).filter((key) => {
    if (key.startsWith('__')) return false;
    const normalized = normalizeText(key);
    return normalized.includes('motivodevolucao') || (normalized.includes('motivo') && normalized.includes('devol'));
  });
  const candidates = [];
  CONFIG.aliases.motivoDevolucao.forEach((alias) => {
    const normalizedAlias = normalizeText(alias);
    const exactKey = candidateKeys.find((key) => normalizeText(key) === normalizedAlias);
    if (exactKey) candidates.push(record[exactKey]);
  });
  candidateKeys.forEach((key) => candidates.push(record[key]));
  if (row && row.motivoDevolucao) candidates.push(row.motivoDevolucao);
  const textual = candidates.map(cleanLabel).find(isTextualReturnReason);
  return textual || '';
}
function isTextualReturnReason(value) {
  const text = cleanLabel(value);
  if (!text) return false;
  const normalized = normalizeText(text);
  if (!normalized || /^(nao|não|sim|ok|n\/a|sem motivo|sem devolucao|sem devolução|0|-)$/.test(normalized)) return false;
  if (/^\d+[\d\s.,/%-]*$/.test(text)) return false;
  if (/^(total|parcial)$/i.test(text)) return false;
  return /[a-zA-ZÀ-ÿ]/.test(text);
}
function isRetiraContract(row) { return /\bretira\b/.test(normalizeText(row && row.tpContratacao)); }
function normalizeReturnType(row) {
  const text = normalizeText([row.tipoDevolucao, row.devolucao].filter(Boolean).join(' '));
  if (/\bparcial\b/.test(text)) return 'Parcial';
  if (/\btotal\b/.test(text)) return 'Total';
  return row.hasReturn ? 'Não informado' : '';
}
function isMeaningfulOccurrence(value) { const n = normalizeText(value); return Boolean(n && !/(^(nao|não)(\s+(nao|não))*$|sem ocorrencia|sem ocorrência|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function isMeaningfulReturn(value) { const n = normalizeText(value); return Boolean(n && !/(^(nao|não)(\s+(nao|não))*$|sem devolucao|sem devolução|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function buildSearchText(row) { const rawValues = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__')).map(([, value]) => value); return normalizeText([row.source,row.of,row.notaFiscal,row.cliente,row.cidade,row.uf,row.placa,row.motorista,row.status,row.ontime,row.occurrenceText,row.returnText,row.observacao,...rawValues].join(' ')); }

function populateSourceFilter() {
  DOM.filterSource.innerHTML = CONFIG.sources.map((source) => `<option value="${escapeHtml(source.short)}">${escapeHtml(source.short)}</option>`).join('');
  DOM.filterSource.value = STATE.filters.source || CONFIG.sources[0].short;
  DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === DOM.filterSource.value));
}
function populateDynamicFilters() { const currentUf = DOM.filterUf.value || 'all'; const ufs = [...new Set(STATE.records.map((row) => row.uf).filter(Boolean))].sort(); DOM.filterUf.innerHTML = '<option value="all">Todas</option>' + ufs.map((uf) => `<option value="${escapeHtml(uf)}">${escapeHtml(uf)}</option>`).join(''); DOM.filterUf.value = ufs.includes(currentUf) ? currentUf : 'all'; STATE.filters.uf = DOM.filterUf.value; }
function onFilterChange() {
  STATE.filters = { from: DOM.filterFrom.value, to: DOM.filterTo.value, month: DOM.filterMonth.value || 'all', source: DOM.filterSource.value || CONFIG.sources[0].short, uf: DOM.filterUf.value, status: DOM.filterStatus.value, search: DOM.filterSearch.value.trim() };
  DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === STATE.filters.source));
  applyFiltersAndRender();
}
function clearFilters() { DOM.filterFrom.value = ''; DOM.filterTo.value = ''; DOM.filterMonth.value = 'all'; DOM.filterSource.value = CONFIG.sources[0].short; DOM.filterUf.value = 'all'; DOM.filterStatus.value = 'all'; DOM.filterSearch.value = ''; DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === DOM.filterSource.value)); onFilterChange(); }
function applyFiltersAndRender() { STATE.filtered = STATE.records.filter((row) => matchesFilters(row, STATE.filters)); renderAll(); }
function matchesFilters(row, filters) {
  if (filters.source !== 'all' && row.source !== filters.source) return false; if (filters.uf !== 'all' && row.uf !== filters.uf) return false;
  if (filters.from) { const from = parseDate(filters.from); if (!row.referenceDate || startOfDay(row.referenceDate) < startOfDay(from)) return false; }
  if (filters.to) { const to = parseDate(filters.to); if (!row.referenceDate || startOfDay(row.referenceDate) > endOfDay(to)) return false; }
  if (filters.month && filters.month !== 'all' && Number(row.monthNumber) !== Number(filters.month)) return false;
  if (filters.status !== 'all') {
    if (filters.status === 'delayed' && !row.delayed) return false; if (filters.status === 'transit' && !row.transit) return false; if (filters.status === 'delivered' && !row.delivered) return false; if (filters.status === 'waiting' && !row.waitingUnload) return false; if (filters.status === 'occurrence' && !row.hasOccurrence) return false; if (filters.status === 'return' && !row.hasReturn) return false; if (filters.status === 'open' && !row.open) return false;
  }
  return !(filters.search && !row.searchText.includes(normalizeText(filters.search)));
}
function renderAll() { updateHeaderStatus(); renderGeneral(); renderPerformance(); renderOccurrences(); renderReturns(); renderExtras(); renderReportBuilder(); renderMap(); renderTicker(); }
function updateHeaderStatus() { const count = STATE.filtered.length; DOM.filterCounter.textContent = `${formatInteger(count)} registro${count === 1 ? '' : 's'} nos filtros`; if (STATE.lastUpdated) DOM.lastUpdate.textContent = `Atualizado às ${formatTime(STATE.lastUpdated)}`; }
function setLoadStatus(status, message) { DOM.loadDot.classList.remove('loading', 'error'); if (status === 'loading') DOM.loadDot.classList.add('loading'); if (status === 'error') DOM.loadDot.classList.add('error'); DOM.lastUpdate.textContent = status === 'ok' && STATE.lastUpdated ? `${message} às ${formatTime(STATE.lastUpdated)}` : message; updateCountdown(); }
function updateCountdown() { if (!STATE.nextRefreshAt) { DOM.nextUpdate.textContent = 'próxima: --:--'; return; } const remaining = Math.max(0, STATE.nextRefreshAt.getTime() - Date.now()); const minutes = Math.floor(remaining / 60000); const seconds = Math.floor((remaining % 60000) / 1000); DOM.nextUpdate.textContent = `próxima: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; }
function showBanner(message, type = 'warn') { if (!message) { DOM.alertBanner.classList.add('hidden'); DOM.alertBanner.textContent = ''; return; } DOM.alertBanner.classList.remove('hidden'); DOM.alertBanner.textContent = message; DOM.alertBanner.style.borderColor = type === 'error' ? 'rgba(230,46,45,.35)' : 'rgba(255,176,32,.26)'; DOM.alertBanner.style.background = type === 'error' ? 'rgba(230,46,45,.10)' : 'rgba(255,176,32,.10)'; DOM.alertBanner.style.color = type === 'error' ? '#ffd3d0' : '#ffe6b0'; }

function renderGeneral() {
  const metrics = computeMetrics(STATE.filtered);
  document.getElementById('generalKpis').innerHTML = [
    kpiCard('Total de notas', formatInteger(metrics.totalNotes), `${formatInteger(metrics.totalLoads)} cargas únicas`, '▦', '', 'all'),
    kpiCard('Cargas em atraso', formatInteger(metrics.delayed), `${percent(metrics.delayed, metrics.totalRecords)} da seleção`, '⚠', 'danger', 'delayed'),
    kpiCard('Cargas entregues', formatInteger(metrics.delivered), `${formatInteger(metrics.waitingUnload)} aguardando descarga`, '✓', 'success', 'delivered'),
    kpiCard('Motoristas em trânsito', formatInteger(metrics.driversInTransit), `${formatInteger(metrics.inTransit)} veículos/cargas em trânsito`, '🚚', 'info', 'transit'),
    kpiCard('Ocorrências', formatInteger(metrics.occurrences), `${formatInteger(metrics.occurrenceUfs)} UFs com registro`, '!', 'warn', 'occurrence'),
    kpiCard('Devoluções', formatInteger(metrics.returns), `${formatInteger(metrics.returnRegions)} regiões impactadas`, '↩', 'purple', 'return'),
    kpiCard('Performance ONTIME', `${metrics.ontimeRate}%`, `${formatInteger(metrics.performanceEligible)} notas contabilizadas`, '◉', metrics.ontimeRate >= 90 ? 'success' : metrics.ontimeRate >= 75 ? 'warn' : 'danger', null),
    kpiCard('Agendas D+2', formatInteger(metrics.d2Agendas), `${formatInteger(metrics.todayAgendas)} para hoje`, '📅', 'info', null)
  ].join('');
  renderScheduleCards();
  renderBarList('statusChart', countBy(STATE.filtered, (row) => row.statusBucket), { empty: 'Nenhum status encontrado para os filtros.', colorResolver: (label) => statusColorClass(label), actionResolver: (label) => ({ action: 'statusBucket', value: label }) });
  renderBarList('ufChart', topEntries(countBy(STATE.filtered, (row) => row.uf || 'Sem UF'), 12), { empty: 'Nenhuma UF encontrada para os filtros.', actionResolver: (label) => ({ action: 'uf', value: label }) });
  renderSourcePanels(); renderInsights('generalInsights', buildGeneralInsights(STATE.filtered)); renderRecordsTable('generalTable', STATE.filtered, { limit: 300 });
}

function renderScheduleCards() {
  const container = document.getElementById('scheduleCards');
  if (!container) return;
  const today = new Date();
  const end = addDays(today, 2);
  const scheduled = STATE.filtered
    .filter((row) => {
      const date = row.agendaDate || row.previsaoEntregaDate;
      return date && isBetweenDays(date, today, end) && !row.delivered;
    })
    .sort((a, b) => (a.agendaDate || a.previsaoEntregaDate) - (b.agendaDate || b.previsaoEntregaDate))
    .slice(0, 12);
  if (!scheduled.length) {
    container.innerHTML = emptyState('Nenhuma entrega agendada para hoje ou D+2 nos filtros atuais.');
    return;
  }
  container.innerHTML = scheduled.map((row) => {
    const date = row.agendaDate || row.previsaoEntregaDate;
    const days = Math.round((startOfDay(date) - startOfDay(today)) / 86400000);
    const urgency = days <= 0 ? 'critical' : days === 1 ? 'attention' : 'soon';
    const label = days <= 0 ? 'Hoje' : `D+${days}`;
    const summary = `<strong>${escapeHtml(label)} • ${escapeHtml(formatDate(date))}</strong><br>${escapeHtml(row.of || row.notaFiscal || 'Carga')} • ${escapeHtml(row.cliente || '-')}<br>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br>${escapeHtml(row.placa || row.motorista || '')}`;
    return `<article class="schedule-card ${urgency}" data-open-record="${escapeHtml(row.id)}" data-summary="${escapeHtml(summary)}">
      <span class="schedule-pill">${escapeHtml(label)}</span>
      <strong>${escapeHtml(row.of || row.notaFiscal || 'Carga')}</strong>
      <small>${escapeHtml(formatDate(date))} • ${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</small>
      <p>${escapeHtml(truncate(row.cliente || '-', 46))}</p>
    </article>`;
  }).join('');
}

function kpiCard(title, value, subtitle, icon, variant = '', filterStatus = null) {
  const action = filterStatus ? `data-action="filterStatus" data-value="${escapeHtml(filterStatus)}"` : '';
  const summary = `<strong>${escapeHtml(title)}</strong><br>${escapeHtml(String(value))}<br><small>${escapeHtml(subtitle)}</small>${filterStatus ? '<br><small>Clique para aplicar filtro.</small>' : ''}`;
  return `<article class="kpi-card ${escapeHtml(variant)} ${filterStatus ? 'kpi-clickable' : ''}" ${action} data-summary="${escapeHtml(summary)}"><div class="kpi-top"><span class="kpi-title">${escapeHtml(title)}</span><span class="kpi-icon">${escapeHtml(icon)}</span></div><div class="kpi-value">${escapeHtml(String(value))}</div><div class="kpi-subtitle">${escapeHtml(subtitle)}</div></article>`;
}
function renderSourcePanels() {
  const source = CONFIG.sources.find((item) => item.short === STATE.filters.source) || CONFIG.sources[0];
  const rows = STATE.filtered;
  const m = computeMetrics(rows);
  const html = `<div class="source-card selected-source" style="border-color:${source.color}44"><strong>${escapeHtml(source.short)}</strong><div class="source-metrics"><span><b>${formatInteger(rows.length)}</b> registros</span><span><b>${formatInteger(m.delayed)}</b> atrasos</span><span><b>${formatInteger(m.delivered)}</b> entregues</span><span><b>${m.ontimeRate}%</b> ONTIME unidade</span></div></div>`;
  document.getElementById('sourcePanels').innerHTML = rows.length ? html : emptyState('Nenhuma informação para a unidade selecionada nos filtros.');
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
  renderRecordsTable('lateTable', rows.filter((row) => row.delayed || (row.performanceEligible && row.ontimeStatus === false)), { limit: 300, empty: 'Nenhuma carga fora do prazo nos filtros.' });
  renderConsolidatedPerformance(consolidatedRows);
}
function renderConsolidatedPerformance(rows) {
  const eligible = rows.filter((row) => row.performanceEligible);
  const ontime = eligible.filter((row) => row.ontimeStatus === true).length;
  const late = eligible.filter((row) => row.ontimeStatus === false || row.delayed).length;
  const rate = eligible.length ? Math.round((ontime / eligible.length) * 100) : 0;
  const transit = rows.filter((row) => row.transit && !row.performanceEligible).length;
  const kpis = document.getElementById('performanceConsolidatedKpis');
  if (kpis) kpis.innerHTML = [
    kpiCard('Performance consolidada', `${rate}%`, `${formatInteger(eligible.length)} notas elegíveis BA + SP`, '◎', rate >= 90 ? 'success' : rate >= 75 ? 'warn' : 'danger'),
    kpiCard('Dentro do prazo', formatInteger(ontime), 'Base consolidada', '✓', 'success'),
    kpiCard('Fora do prazo', formatInteger(late), `${percent(late, eligible.length)} da base`, '⚠', 'danger'),
    kpiCard('Em trânsito não contado', formatInteger(transit), 'Sem fechamento de performance', '🚚', 'info')
  ].join('');
  const gauge = document.getElementById('consolidatedGauge');
  if (gauge) gauge.innerHTML = `<div class="gauge-ring" style="--pct:${rate}"><div class="gauge-content"><strong>${rate}%</strong><span>BA + SP</span></div></div>`;
  renderPerformanceBars('consolidatedBySource', groupBy(eligible, (row) => row.source || 'Sem origem'), 'origem');
  renderPerformanceBars('consolidatedByUf', groupBy(eligible, (row) => row.uf || 'Sem UF'), 'UF');
  renderRecordsTable('consolidatedLateTable', rows.filter((row) => row.delayed || (row.performanceEligible && row.ontimeStatus === false)), { limit: 300, empty: 'Nenhuma carga fora do prazo no consolidado.' });
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
  renderRecordsTable('occurrenceTable', rows, { limit: 300, empty: 'Nenhuma ocorrência registrada nos filtros.' });
}

function renderReturns() {
  const rows = STATE.filtered.filter((row) => row.hasReturn);
  const byType = countBy(rows.filter((row) => row.returnType === 'Total' || row.returnType === 'Parcial'), (row) => row.returnType);
  const byReason = countBy(rows, (row) => cleanLabel(row.returnReason) || 'Sem motivo informado');
  const byRegion = countBy(rows, (row) => row.region || 'Sem região'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa');
  document.getElementById('returnKpis').innerHTML = [
    kpiCard('Total de devoluções', formatInteger(rows.length), `${percent(rows.length, STATE.filtered.length)} da seleção`, '↩', 'purple', 'return'),
    kpiCard('Devolução parcial', formatInteger(rows.filter((row) => row.returnType === 'Parcial').length), 'Tipo fiel: Parcial', '½', 'info'),
    kpiCard('Devolução total', formatInteger(rows.filter((row) => row.returnType === 'Total').length), 'Tipo fiel: Total', '1', 'warn'),
    kpiCard('Com observações', formatInteger(rows.filter((row) => isPresent(row.observacao)).length), 'Notas com OBS para análise', '✎', 'success')
  ].join('');
  renderBarList('returnTypes', topEntries(byType, 2), { empty: 'Sem tipo Total/Parcial informado.', colorResolver: () => 'purple' });
  renderBarList('returnReasons', topEntries(byReason, 10), { empty: 'Sem motivos de devolução.', colorResolver: () => 'warn' });
  renderBarList('returnRegions', topEntries(byRegion, 10), { empty: 'Sem devoluções por região.', colorResolver: () => 'danger', actionResolver: (label) => ({ action: 'region', value: label }) });
  renderBarList('returnDrivers', topEntries(byDriver, 12), { empty: 'Sem motoristas/placas com devolução.', colorResolver: () => 'info' });
  renderInsights('returnInsights', buildReturnInsights(rows));
  renderRecordsTable('returnTable', rows, { limit: 300, empty: 'Nenhuma devolução registrada nos filtros.' });
}

function renderExtras() {
  const rows = STATE.filtered;
  const totalValue = rows.reduce((sum, row) => sum + parseBrazilNumber(row.valor), 0);
  const manifestClosed = rows.filter((row) => /fechado|sim|ok|finaliz/.test(normalizeText(getRawField(row, ['Manifesto'])))).length;
  const canhotoOk = rows.filter((row) => /sim|digitaliz|ok/.test(normalizeText(getRawField(row, ['Digitalização do Canhoto', 'Digitalizacao do Canhoto', 'Canhoto'])))).length;
  const cubic = rows.reduce((sum, row) => sum + parseBrazilNumber(getRawField(row, ['M³', 'M3', 'Cubagem'])), 0);
  const kpi = document.getElementById('extrasKpis');
  if (kpi) kpi.innerHTML = [
    kpiCard('Valor NF nos filtros', formatCurrency(totalValue), `${formatInteger(rows.length)} registros`, 'R$', 'info'),
    kpiCard('Cubagem total', cubic ? cubic.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : '0', 'm³ calculado da planilha', 'm³', 'success'),
    kpiCard('Manifestos fechados', formatInteger(manifestClosed), `${percent(manifestClosed, rows.length)} da seleção`, '▣', 'warn'),
    kpiCard('Canhotos digitalizados', formatInteger(canhotoOk), `${percent(canhotoOk, rows.length)} da seleção`, '✓', 'purple')
  ].join('');
  renderBarList('extrasTransporters', topEntries(countBy(rows, (row) => cleanLabel(row.transportadora) || 'Sem transportador'), 12), { empty: 'Sem transportadores.', colorResolver: () => 'info' });
  renderBarList('extrasCargoTypes', topEntries(countBy(rows, (row) => cleanLabel(row.tpCarga) || 'Sem tipo'), 10), { empty: 'Sem tipos de carga.', colorResolver: () => 'success' });
  renderBarList('extrasDocuments', topEntries(countBy(rows, (row) => {
    const manifesto = getRawField(row, ['Manifesto']) || 'Manifesto não informado';
    const canhoto = getRawField(row, ['Digitalização do Canhoto', 'Digitalizacao do Canhoto', 'Canhoto']) || 'Canhoto não informado';
    return `${manifesto} / ${canhoto}`;
  }), 8), { empty: 'Sem dados documentais.', colorResolver: () => 'purple' });
  renderBarList('extrasClients', topEntries(countBy(rows, (row) => cleanLabel(row.cliente) || 'Sem cliente'), 12), { empty: 'Sem clientes.', colorResolver: () => 'info' });
  renderInsights('extrasInsights', buildExtrasInsights(rows));
  renderRecordsTable('extrasTable', rows, { limit: 250, empty: 'Nenhum registro complementar nos filtros.' });
}

function buildExtrasInsights(rows) {
  const insights = [];
  const missingCanhoto = rows.filter((row) => !/sim|digitaliz|ok/.test(normalizeText(getRawField(row, ['Digitalização do Canhoto', 'Digitalizacao do Canhoto', 'Canhoto']))));
  const topTransporter = topLabel(countBy(rows, (row) => cleanLabel(row.transportadora) || 'Sem transportador'));
  insights.push({ type: 'info', icon: '🚛', text: `Transportador com maior volume: ${topTransporter || 'não identificado'}.` });
  if (missingCanhoto.length) insights.push({ type: 'warn', icon: '✎', text: `${formatInteger(missingCanhoto.length)} registro(s) sem canhoto digitalizado/confirmado.` });
  const noManifest = rows.filter((row) => !isPresent(getRawField(row, ['Manifesto']))).length;
  if (noManifest) insights.push({ type: 'warn', icon: '▣', text: `${formatInteger(noManifest)} registro(s) sem informação de manifesto.` });
  return insights;
}

function renderReportBuilder() {
  const container = document.getElementById('reportPreview');
  if (!container) return;
  const selected = Array.from(document.querySelectorAll('.report-option:checked')).map((input) => input.value);
  const rows = STATE.filtered;
  const metrics = computeMetrics(rows);
  const blocks = [];
  if (selected.includes('kpis')) blocks.push(`<div class="report-block"><h4>Indicadores gerais</h4><div class="mini-kpi-row"><span><b>${formatInteger(metrics.totalNotes)}</b> notas</span><span><b>${formatInteger(metrics.totalLoads)}</b> cargas</span><span><b>${formatInteger(metrics.delayed)}</b> atrasos</span><span><b>${formatInteger(metrics.inTransit)}</b> trânsito</span></div></div>`);
  if (selected.includes('performance')) blocks.push(`<div class="report-block"><h4>Performance</h4><div class="report-big-number">${metrics.ontimeRate}%</div><p>${formatInteger(metrics.performanceEligible)} notas elegíveis para ONTIME.</p></div>`);
  if (selected.includes('status')) blocks.push(reportBarBlock('Status operacional', topEntries(countBy(rows, (row) => row.statusBucket), 8)));
  if (selected.includes('uf')) blocks.push(reportBarBlock('Distribuição por UF', topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 10)));
  if (selected.includes('schedules')) blocks.push(reportScheduleBlock(rows));
  if (selected.includes('occurrences')) blocks.push(reportBarBlock('Ocorrências por UF', topEntries(countBy(rows.filter((row) => row.hasOccurrence), (row) => row.uf || 'Sem UF'), 8)));
  if (selected.includes('returns')) blocks.push(reportBarBlock('Motivos de devolução', topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), 8)));
  if (selected.includes('transporters')) blocks.push(reportBarBlock('Transportadores', topEntries(countBy(rows, (row) => cleanLabel(row.transportadora) || 'Sem transportador'), 8)));
  if (selected.includes('details')) blocks.push(`<div class="report-block full"><h4>Detalhes</h4><div class="report-mini-table">${rows.slice(0, 12).map((row) => `<div data-open-record="${escapeHtml(row.id)}"><b>${escapeHtml(row.of || row.notaFiscal || '-')}</b><span>${escapeHtml(truncate(row.cliente || '-', 34))}</span><small>${escapeHtml(row.statusBucket)} • ${escapeHtml(row.uf || '-')}</small></div>`).join('')}</div></div>`);
  container.innerHTML = blocks.join('') || emptyState('Selecione ao menos uma informação para montar o dashboard.');
}

function reportBarBlock(title, entries) {
  if (!entries.length) return `<div class="report-block"><h4>${escapeHtml(title)}</h4><p>Sem dados nos filtros.</p></div>`;
  const max = Math.max(...entries.map(([, value]) => value), 1);
  return `<div class="report-block"><h4>${escapeHtml(title)}</h4>${entries.map(([label, value]) => `<div class="report-bar" data-summary="${escapeHtml(`<strong>${label}</strong><br>${formatInteger(value)} registro(s)`)}"><span>${escapeHtml(label)}</span><i><em style="width:${Math.max(4, Math.round(value / max * 100))}%"></em></i><b>${formatInteger(value)}</b></div>`).join('')}</div>`;
}
function reportScheduleBlock(rows) {
  const today = new Date();
  const scheduled = rows.filter((row) => { const d = row.agendaDate || row.previsaoEntregaDate; return d && isBetweenDays(d, today, addDays(today, 2)); }).sort((a,b)=>(a.agendaDate||a.previsaoEntregaDate)-(b.agendaDate||b.previsaoEntregaDate)).slice(0,8);
  return `<div class="report-block"><h4>Agendas hoje e D+2</h4>${scheduled.length ? scheduled.map((row) => `<div class="report-schedule" data-open-record="${escapeHtml(row.id)}"><b>${escapeHtml(formatDate(row.agendaDate || row.previsaoEntregaDate))}</b><span>${escapeHtml(row.of || row.notaFiscal || '-')} • ${escapeHtml(row.uf || '-')}</span><small>${escapeHtml(truncate(row.cliente || '-', 38))}</small></div>`).join('') : '<p>Sem agendas próximas.</p>'}</div>`;
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

async function loadBrazilGeoJson() {
  if (STATE.brazilGeoJson || STATE.brazilGeoLoading) return;
  STATE.brazilGeoLoading = true;
  try {
    const response = await fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson', { cache: 'force-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    STATE.brazilGeoJson = await response.json();
    STATE.brazilGeoError = '';
    if (STATE.activeTab === 'map') renderMap();
  } catch (error) {
    STATE.brazilGeoError = error.message || 'Mapa externo indisponível';
  } finally {
    STATE.brazilGeoLoading = false;
  }
}

function renderHeatmapBrazil(rows, selected) {
  if (STATE.brazilGeoJson) {
    renderGeoBrazil(rows, selected);
    return;
  }
  renderSimplifiedBrazil(rows, selected);
}

function bindMapZoomEvents() {
  DOM.brazilMap.addEventListener('wheel', (event) => {
    event.preventDefault();
    adjustMapZoom(event.deltaY < 0 ? 0.14 : -0.14);
  }, { passive: false });
  DOM.brazilMap.addEventListener('pointerdown', (event) => {
    if (STATE.mapZoom <= 1) return;
    STATE.mapDragging = true;
    STATE.mapDragStart = { x: event.clientX, y: event.clientY, panX: STATE.mapPanX, panY: STATE.mapPanY };
    DOM.brazilMap.setPointerCapture?.(event.pointerId);
    DOM.brazilMap.classList.add('dragging');
  });
  DOM.brazilMap.addEventListener('pointermove', (event) => {
    if (!STATE.mapDragging || !STATE.mapDragStart) return;
    STATE.mapPanX = STATE.mapDragStart.panX + (event.clientX - STATE.mapDragStart.x);
    STATE.mapPanY = STATE.mapDragStart.panY + (event.clientY - STATE.mapDragStart.y);
    applyMapZoom();
  });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => DOM.brazilMap.addEventListener(eventName, () => {
    STATE.mapDragging = false;
    STATE.mapDragStart = null;
    DOM.brazilMap.classList.remove('dragging');
  }));
}
function adjustMapZoom(delta) {
  STATE.mapZoom = Math.min(2.8, Math.max(1, Number((STATE.mapZoom + delta).toFixed(2))));
  if (STATE.mapZoom === 1) { STATE.mapPanX = 0; STATE.mapPanY = 0; }
  applyMapZoom();
}
function resetMapZoom() {
  STATE.mapZoom = 1; STATE.mapPanX = 0; STATE.mapPanY = 0; applyMapZoom();
}
function applyMapZoom() {
  if (!DOM.brazilMap) return;
  DOM.brazilMap.style.transform = `translate(${STATE.mapPanX}px, ${STATE.mapPanY}px) scale(${STATE.mapZoom})`;
  DOM.brazilMap.style.cursor = STATE.mapZoom > 1 ? 'grab' : 'zoom-in';
  if (DOM.mapZoomLevel) DOM.mapZoomLevel.textContent = `${Math.round(STATE.mapZoom * 100)}%`;
}

function renderGeoBrazil(rows, selected) {
  const features = STATE.brazilGeoJson.features || [];
  const ufGroups = groupBy(rows.filter((row) => row.uf), (row) => row.uf);
  const maxUf = Math.max(1, ...Object.values(ufGroups).map((items) => items.length));
  const paths = [];
  const spots = [];
  const bounds = getGeoBounds(features);
  features.forEach((feature) => {
    const uf = getFeatureUf(feature);
    if (!uf) return;
    const region = CONFIG.regionByUf[uf] || 'Sem região';
    const items = ufGroups[uf] || [];
    const metric = computeRegionMetrics(items);
    const path = geometryToSvgPath(feature.geometry, bounds);
    const fill = stateColor(region, selected === region || STATE.filters.uf === uf, items.length, maxUf);
    paths.push(`<path class="br-state map-region ${selected === region || STATE.filters.uf === uf ? 'active' : ''}" data-uf="${uf}" data-region="${region}" d="${path}" fill="${fill}" data-summary="${escapeHtml(`<strong>${uf} • ${region}</strong><br>${formatInteger(items.length)} registros<br>${formatInteger(metric.delayed)} atrasos • ${formatInteger(metric.occurrences)} ocorrências<br>${formatInteger(metric.returns)} devoluções`)}"></path>`);
    if (items.length) {
      const center = featureCentroid(feature.geometry, bounds);
      const weight = items.length + metric.delayed * 1.6 + metric.occurrences * 1.25 + metric.returns * 1.25;
      const radius = Math.min(34, 8 + Math.sqrt(weight / maxUf) * 30);
      spots.push(`<g class="heat-spot geo-heat" data-uf="${uf}" transform="translate(${center.x} ${center.y})"><circle r="${radius}" fill="#00d68f" opacity="0.25"></circle><circle r="${radius * 0.62}" fill="#48ff9b" opacity="0.38"></circle><circle r="${radius * 0.34}" fill="#06141f" opacity="0.62"></circle><text y="4" class="heat-label" text-anchor="middle">${uf}</text></g>`);
    }
  });
  document.getElementById('brazilMap').innerHTML = `
    <svg viewBox="0 0 620 590" role="img" aria-label="Mapa fiel do Brasil por estados">
      <defs>
        <linearGradient id="geoSea" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d9edf4"/><stop offset="1" stop-color="#eef6f8"/></linearGradient>
        <filter id="geoShadow"><feDropShadow dx="0" dy="7" stdDeviation="5" flood-color="#03121c" flood-opacity=".18"/></filter>
      </defs>
      <rect x="0" y="0" width="620" height="590" fill="url(#geoSea)" rx="18"></rect>
      <g class="geo-grid" opacity=".32"><path d="M34 115 C130 76 211 94 289 138 C382 190 458 166 586 112"></path><path d="M24 366 C132 304 239 312 336 361 C437 412 505 377 603 328"></path><path d="M115 12 C142 148 140 300 111 578"></path><path d="M505 10 C468 146 474 312 517 579"></path></g>
      <g class="geo-brazil" filter="url(#geoShadow)">${paths.join('')}</g>
      <g class="geo-heat-layer">${spots.join('')}</g>
      <g class="geo-labels"><text x="424" y="355" class="capital-dot">● BRASÍLIA</text><text x="236" y="150">Manaus</text><text x="388" y="458">São Paulo</text><text x="494" y="318">Recife</text><text x="482" y="381">Salvador</text></g>
      <g class="heat-legend" transform="translate(414 528)"><rect width="186" height="42" rx="12" fill="rgba(255,255,255,.86)"></rect><circle cx="20" cy="21" r="10" fill="#00d68f" opacity=".45"></circle><circle cx="48" cy="21" r="10" fill="#48ff9b" opacity=".55"></circle><circle cx="76" cy="21" r="10" fill="#06141f" opacity=".7"></circle><text x="98" y="18">Mapa de calor</text><text x="98" y="32">volume e criticidade</text></g>
    </svg>`;
  const map = document.getElementById('brazilMap');
  map.querySelectorAll('.br-state').forEach((path) => {
    path.addEventListener('mousemove', (event) => {
      const uf = path.dataset.uf;
      showUfTooltip(event, uf, rows.filter((row) => row.uf === uf));
    });
    path.addEventListener('mouseleave', hideTooltip);
    path.addEventListener('click', () => { DOM.filterUf.value = DOM.filterUf.value === path.dataset.uf ? 'all' : path.dataset.uf; onFilterChange(); });
  });
  map.querySelectorAll('.heat-spot').forEach((spot) => {
    const uf = spot.dataset.uf;
    spot.addEventListener('mousemove', (event) => showUfTooltip(event, uf, rows.filter((row) => row.uf === uf)));
    spot.addEventListener('mouseleave', hideTooltip);
    spot.addEventListener('click', () => { DOM.filterUf.value = DOM.filterUf.value === uf ? 'all' : uf; onFilterChange(); });
  });
  applyMapZoom();
}

function renderSimplifiedBrazil(rows, selected) {

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
    path.addEventListener('click', () => {
      STATE.selectedRegion = STATE.selectedRegion === path.dataset.region ? 'all' : path.dataset.region;
      DOM.mapRegionFilter.value = STATE.selectedRegion;
      renderMap();
    });
  });
  map.querySelectorAll('.heat-spot').forEach((spot) => {
    const uf = spot.dataset.uf;
    const ufRows = rows.filter((row) => row.uf === uf);
    spot.addEventListener('mousemove', (event) => showUfTooltip(event, uf, ufRows));
    spot.addEventListener('mouseleave', hideTooltip);
    spot.addEventListener('click', () => { DOM.filterUf.value = DOM.filterUf.value === uf ? 'all' : uf; onFilterChange(); });
  });
  applyMapZoom();
}

function getFeatureUf(feature) {
  const props = feature.properties || {};
  const raw = props.sigla || props.SIGLA || props.uf || props.UF || props.id || props.name || props.nome || '';
  const uf = normalizeUf(raw);
  if (uf) return uf;
  const name = normalizeText(raw);
  const byName = { 'acre':'AC', 'alagoas':'AL', 'amapa':'AP', 'amazonas':'AM', 'bahia':'BA', 'ceara':'CE', 'distrito federal':'DF', 'espirito santo':'ES', 'goias':'GO', 'maranhao':'MA', 'mato grosso':'MT', 'mato grosso do sul':'MS', 'minas gerais':'MG', 'para':'PA', 'paraiba':'PB', 'parana':'PR', 'pernambuco':'PE', 'piaui':'PI', 'rio de janeiro':'RJ', 'rio grande do norte':'RN', 'rio grande do sul':'RS', 'rondonia':'RO', 'roraima':'RR', 'santa catarina':'SC', 'sao paulo':'SP', 'sergipe':'SE', 'tocantins':'TO' };
  return byName[name] || '';
}
function getGeoBounds(features) {
  let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
  features.forEach((feature) => eachCoordinate(feature.geometry, ([lon, lat]) => { minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon); minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat); }));
  return { minLon, maxLon, minLat, maxLat, width: 620, height: 590, pad: 28 };
}
function eachCoordinate(geometry, fn) {
  if (!geometry) return;
  const walk = (coords) => {
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') fn(coords);
    else coords.forEach(walk);
  };
  walk(geometry.coordinates || []);
}
function projectGeo([lon, lat], bounds) {
  const usableW = bounds.width - bounds.pad * 2;
  const usableH = bounds.height - bounds.pad * 2;
  const x = bounds.pad + ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * usableW;
  const y = bounds.pad + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * usableH;
  return { x, y };
}
function geometryToSvgPath(geometry, bounds) {
  const polygonToPath = (polygon) => polygon.map((ring) => ring.map((point, index) => { const p = projectGeo(point, bounds); return `${index ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`; }).join(' ') + ' Z').join(' ');
  if (!geometry) return '';
  if (geometry.type === 'Polygon') return polygonToPath(geometry.coordinates);
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.map(polygonToPath).join(' ');
  return '';
}
function featureCentroid(geometry, bounds) {
  let sx = 0, sy = 0, count = 0;
  eachCoordinate(geometry, (coord) => { const p = projectGeo(coord, bounds); sx += p.x; sy += p.y; count += 1; });
  return count ? { x: sx / count, y: sy / count } : { x: 310, y: 295 };
}
function stateColor(region, active, count, max) {
  const palette = { Norte: '#17d686', Nordeste: '#24a9dc', 'Centro-Oeste': '#0d7f73', Sudeste: '#1f4155', Sul: '#75e39b', 'Sem região': '#dfe8ee' };
  if (!count) return active ? '#78e9b0' : '#e9f0f4';
  const intensity = Math.min(1, count / Math.max(1, max));
  return active ? '#00d68f' : palette[region] || `rgba(17, 214, 134, ${0.35 + intensity * 0.5})`;
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
  DOM.tooltip.innerHTML = `<strong>${escapeHtml(uf)}</strong><br>${formatInteger(rows.length)} entregas/notas nos filtros<br>${formatInteger(metric.open)} em aberto • ${formatInteger(metric.transit)} em trânsito<br>${formatInteger(metric.delayed)} atrasos • ${formatInteger(metric.occurrences)} ocorrências • ${formatInteger(metric.returns)} devoluções`;
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
function handleSummaryTooltipMove(event) {
  const element = event.target.closest('[data-summary]');
  if (!element || element.closest('.map-region, .heat-spot')) return;
  DOM.tooltip.innerHTML = element.dataset.summary || '';
  DOM.tooltip.style.left = `${event.clientX}px`;
  DOM.tooltip.style.top = `${event.clientY}px`;
  DOM.tooltip.classList.add('visible', 'summary-tooltip');
}
function handleSummaryTooltipOut(event) {
  const element = event.target.closest('[data-summary]');
  if (!element) return;
  if (event.relatedTarget && element.contains(event.relatedTarget)) return;
  DOM.tooltip.classList.remove('visible', 'summary-tooltip');
}

function renderBarList(containerId, data, options = {}) {
  const container = document.getElementById(containerId); const entries = Array.isArray(data) ? data : Object.entries(data || {});
  if (!entries.length) { container.innerHTML = emptyState(options.empty || 'Sem dados para exibir.'); return; }
  const max = Math.max(...entries.map(([, value]) => typeof value === 'number' ? value : Number(value) || 0), 1);
  container.innerHTML = entries.map(([label, value]) => { const number = typeof value === 'number' ? value : Number(value) || 0; const width = Math.max(3, Math.round((number / max) * 100)); const cls = options.colorResolver ? options.colorResolver(label, number) : ''; const action = options.actionResolver ? options.actionResolver(label, number) : null; const attrs = action ? `data-action="${escapeHtml(action.action)}" data-value="${escapeHtml(action.value)}"` : ''; const summary = `<strong>${escapeHtml(label)}</strong><br>${formatInteger(number)} registro(s)<br><small>${width}% da maior categoria exibida</small>`; return `<div class="bar-row ${action ? 'clickable' : ''}" ${attrs} data-summary="${escapeHtml(summary)}"><div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div><div class="bar-track"><div class="bar-fill ${escapeHtml(cls)}" style="width:${width}%"></div></div><div class="bar-value">${formatInteger(number)}</div></div>`; }).join('');
}
function renderTagCloud(containerId, entries) { const container = document.getElementById(containerId); if (!entries.length) { container.innerHTML = emptyState('Sem descrições registradas.'); return; } container.innerHTML = entries.map(([label, value]) => `<span class="tag" title="${escapeHtml(label)}"><b>${formatInteger(value)}</b> ${escapeHtml(truncate(label, 54))}</span>`).join(''); }
function renderInsights(containerId, insights) { const container = document.getElementById(containerId); if (!insights.length) { container.innerHTML = emptyState('Sem alertas para o filtros atuais.'); return; } container.innerHTML = insights.map((item) => `<div class="insight ${escapeHtml(item.type || '')}"><span class="insight-icon">${escapeHtml(item.icon || '•')}</span><div>${escapeHtml(item.text)}</div></div>`).join(''); }

function renderRecordsTable(containerId, rows, options = {}) {
  const container = document.getElementById(containerId), limit = options.limit || 250;
  const sortedRows = sortTableRows(rows.slice(), STATE.tableSorts[containerId]);
  const visibleRows = sortedRows.slice(0, limit);
  if (!visibleRows.length) { container.innerHTML = emptyState(options.empty || 'Nenhum registro encontrado para os filtros atuais.'); return; }
  const headers = [
    ['source', 'Origem'], ['date', 'Data / Agenda'], ['cargo', 'Carga / NF'], ['cliente', 'Cliente'], ['destino', 'Destino'],
    ['veiculo', 'Veículo / Motorista'], ['status', 'Status'], ['ontime', 'ONTIME'], ['occurrence', 'Ocorrência'], ['return', 'Devolução']
  ];
  const activeSort = STATE.tableSorts[containerId] || {};
  const headerHtml = headers.map(([key, label]) => {
    const active = activeSort.key === key;
    const arrow = active ? (activeSort.dir === 'asc' ? '↑' : '↓') : '↕';
    return `<th><button type="button" class="table-sort ${active ? 'active' : ''}" data-table-sort="${key}" data-table-id="${escapeHtml(containerId)}">${escapeHtml(label)} <span>${arrow}</span></button></th>`;
  }).join('');
  container.innerHTML = `<table class="data-table table-clickable"><thead><tr>${headerHtml}</tr></thead><tbody>${visibleRows.map((row) => recordRowHtml(row)).join('')}</tbody></table>${rows.length > limit ? `<div class="empty-state">Exibindo ${formatInteger(limit)} de ${formatInteger(rows.length)} registros. Use filtros ou exporte o Excel para a base completa.</div>` : ''}`;
}
function handleTableSort(button) {
  const tableId = button.dataset.tableId;
  const key = button.dataset.tableSort;
  if (!tableId || !key) return;
  const current = STATE.tableSorts[tableId] || {};
  STATE.tableSorts[tableId] = current.key === key ? { key, dir: current.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' };
  renderAll();
}
function sortTableRows(rows, sort) {
  if (!sort || !sort.key) return rows;
  const dir = sort.dir === 'desc' ? -1 : 1;
  return rows.sort((a, b) => compareValues(tableSortValue(a, sort.key), tableSortValue(b, sort.key)) * dir);
}
function tableSortValue(row, key) {
  const map = {
    source: row.source,
    date: row.referenceDate || row.agendaDate || row.previsaoEntregaDate || row.dataProgramada,
    cargo: row.of || row.notaFiscal,
    cliente: row.cliente,
    destino: `${row.uf || ''} ${row.cidade || ''}`,
    veiculo: `${row.placa || ''} ${row.motorista || ''}`,
    status: row.statusBucket,
    ontime: row.ontimeStatus === true ? 1 : row.ontimeStatus === false ? -1 : 0,
    occurrence: row.hasOccurrence ? 1 : 0,
    return: row.hasReturn ? 1 : 0
  };
  return map[key];
}
function compareValues(a, b) {
  if (a instanceof Date && b instanceof Date) return a - b;
  if (a instanceof Date) return a.getTime() - (parseDate(b)?.getTime() || 0);
  if (b instanceof Date) return (parseDate(a)?.getTime() || 0) - b.getTime();
  const na = Number(String(a ?? '').replace(/\./g, '').replace(',', '.'));
  const nb = Number(String(b ?? '').replace(/\./g, '').replace(',', '.'));
  if (Number.isFinite(na) && Number.isFinite(nb) && String(a ?? '').trim() !== '' && String(b ?? '').trim() !== '') return na - nb;
  return String(a ?? '').localeCompare(String(b ?? ''), 'pt-BR', { numeric: true, sensitivity: 'base' });
}
function recordRowHtml(row) {
  const ontimeBadge = row.ontimeStatus === true ? '<span class="badge success">No prazo</span>' : row.ontimeStatus === false ? '<span class="badge danger">Fora prazo</span>' : '<span class="badge">Sem ONTIME</span>';
  const summary = `<strong>${escapeHtml(row.of || row.notaFiscal || 'Registro')}</strong><br>${escapeHtml(row.cliente || '-') }<br>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br>Status: ${escapeHtml(row.statusBucket)}${row.hasOccurrence ? '<br>Com ocorrência' : ''}${row.hasReturn ? '<br>Com devolução' : ''}`;
  return `<tr data-open-record="${escapeHtml(row.id)}" data-summary="${escapeHtml(summary)}"><td><span class="badge info">${escapeHtml(row.source || '-')}</span></td><td><strong>${escapeHtml(formatDate(row.referenceDate) || row.dataProgramada || '-')}</strong><br><small>Agenda: ${escapeHtml(formatDate(row.agendaDate) || row.agenda || '-')}</small></td><td><strong>${escapeHtml(row.of || '-')}</strong><br><small>NF: ${escapeHtml(row.notaFiscal || '-')}</small></td><td title="${escapeHtml(row.cliente || '')}">${escapeHtml(truncate(row.cliente || '-', 34))}</td><td>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br><small>${escapeHtml(row.region || '')}</small></td><td>${escapeHtml(row.placa || '-')}<br><small>${escapeHtml(row.motorista || '-')}</small></td><td><span class="badge ${statusColorClass(row.statusBucket)}">${escapeHtml(row.statusBucket)}</span><br><small>${escapeHtml(truncate(row.status || row.faturamento || '-', 28))}</small></td><td>${ontimeBadge}</td><td>${row.hasOccurrence ? `<span class="badge warn" title="${escapeHtml(row.occurrenceText)}">Sim</span>` : '<span class="badge">Não</span>'}</td><td>${row.hasReturn ? `<span class="badge purple" title="${escapeHtml(row.returnText)}">Sim</span>` : '<span class="badge">Não</span>'}</td></tr>`;
}
function openRecordDetail(recordId) {
  const row = STATE.records.find((item) => item.id === recordId); if (!row) return;
  DOM.modalTitle.textContent = `${row.of || 'Carga'}${row.notaFiscal ? ` • NF ${row.notaFiscal}` : ''}`;
  const rawFields = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__'));
  DOM.modalBody.innerHTML = `<div class="modal-summary"><div><span>Origem</span><strong>${escapeHtml(row.source || '-')}</strong></div><div><span>Cliente</span><strong title="${escapeHtml(row.cliente || '')}">${escapeHtml(row.cliente || '-')}</strong></div><div><span>Destino</span><strong>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</strong></div><div><span>Status</span><strong>${escapeHtml(row.statusBucket)}</strong></div><div><span>Previsão</span><strong>${escapeHtml(formatDate(row.previsaoEntregaDate) || row.previsaoEntrega || '-')}</strong></div><div><span>Chegada cliente</span><strong>${escapeHtml(formatDate(row.chegadaClienteDate) || row.chegadaCliente || '-')}</strong></div><div><span>Placa</span><strong>${escapeHtml(row.placa || '-')}</strong></div><div><span>Motorista</span><strong>${escapeHtml(row.motorista || '-')}</strong></div></div><div class="field-grid">${rawFields.map(([key, value]) => `<div class="field-item"><span>${escapeHtml(key)}</span><p>${escapeHtml(isPresent(value) ? String(value) : '-')}</p></div>`).join('')}</div>`;
  if (typeof DOM.detailModal.showModal === 'function') DOM.detailModal.showModal(); else DOM.detailModal.setAttribute('open', 'open');
}
function handleAction(action, value) {
  if (action === 'filterStatus') { const next = value || 'all'; DOM.filterStatus.value = DOM.filterStatus.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'statusBucket') { const statusMap = { 'Fora do prazo': 'delayed', Finalizado: 'delivered', 'Aguard. descarga': 'waiting', 'Em trânsito': 'transit', 'Em aberto': 'open', Faturado: 'open' }; const next = statusMap[value] || 'all'; DOM.filterStatus.value = DOM.filterStatus.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'uf') { const next = value || 'all'; DOM.filterUf.value = DOM.filterUf.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'region') { const next = value || 'all'; STATE.selectedRegion = STATE.selectedRegion === next ? 'all' : next; DOM.mapRegionFilter.value = STATE.selectedRegion; activateTab('map'); renderMap(); }
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
  insights.push(metrics.delayed ? { type: 'danger', icon: '⚠', text: `${formatInteger(metrics.delayed)} carga(s) estão fora do prazo. UF mais crítica: ${topLabel(byUfDelayed) || 'não identificada'}.` } : { type: 'success', icon: '✓', text: 'Não há cargas atrasadas nos filtros atuais.' });
  insights.push({ type: metrics.ontimeRate >= 90 ? 'success' : metrics.ontimeRate >= 75 ? 'warn' : 'danger', icon: '◉', text: `Performance ONTIME em ${metrics.ontimeRate}% considerando ${formatInteger(metrics.performanceEligible)} nota(s) elegíveis.` });
  if (metrics.todayAgendas || metrics.d2Agendas) insights.push({ type: 'warn', icon: '📅', text: `${formatInteger(metrics.todayAgendas)} agenda(s) para hoje e ${formatInteger(metrics.d2Agendas)} até D+2.` });
  if (metrics.occurrences) insights.push({ type: 'warn', icon: '!', text: `${formatInteger(metrics.occurrences)} ocorrência(s) registradas; priorize tratativa com setor responsável e motoristas recorrentes.` });
  if (metrics.returns) insights.push({ type: 'purple', icon: '↩', text: `${formatInteger(metrics.returns)} devolução(ões) nos filtros. Região com mais entregas em aberto: ${topLabel(byRegionOpen) || 'sem dados'}.` });
  return insights;
}
function buildOccurrenceInsights(rows) {
  if (!rows.length) return [{ type: 'success', icon: '✓', text: 'Nenhuma ocorrência nos filtros atuais.' }];
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF'), bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), delayed = rows.filter((row) => row.delayed).length;
  return [
    { type: 'warn', icon: '⚠', text: `UF com mais ocorrências: ${topLabel(byUf)} (${formatInteger(Math.max(...Object.values(byUf)))} registro(s)).` },
    { type: 'info', icon: '▤', text: `Setor mais acionado: ${topLabel(bySector)}. Verifique gargalos e tratativas abertas.` },
    { type: 'danger', icon: '🚚', text: `Maior recorrência por motorista/placa: ${topLabel(byDriver)}.` },
    { type: delayed ? 'danger' : 'success', icon: delayed ? '!' : '✓', text: `${formatInteger(delayed)} ocorrência(s) também estão em cargas fora do prazo.` }
  ];
}
function buildReturnInsights(rows) {
  if (!rows.length) return [{ type: 'success', icon: '✓', text: 'Nenhuma devolução registrada nos filtros atuais.' }];
  const byRegion = countBy(rows, (row) => row.region || 'Sem região'), byReason = countBy(rows, (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), byType = countBy(rows.filter((row) => row.returnType === 'Total' || row.returnType === 'Parcial'), (row) => row.returnType);
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
  const sourceLabel = STATE.filters.source && STATE.filters.source !== 'all' ? STATE.filters.source : 'Filial BA + Matriz SP';
  const todayAgendas = rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, today));
  const d2Agendas = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2)));
  const delayed = rows.filter((row) => row.delayed), occurrencesToday = rows.filter((row) => row.hasOccurrence && isSameDay(row.referenceDate, today)), returns = rows.filter((row) => row.hasReturn);
  const items = [`🕒 ${sourceLabel} • atualizado ${STATE.lastUpdated ? formatDateTime(STATE.lastUpdated) : '--'} • ${formatInteger(rows.length)} registros`, `📅 ${formatInteger(todayAgendas.length)} agenda(s) para hoje`, `⏭️ ${formatInteger(d2Agendas.length)} agenda(s) até D+2`, `🚨 ${formatInteger(delayed.length)} carga(s) fora do prazo`, `⚠️ ${formatInteger(occurrencesToday.length)} ocorrência(s) do dia`, `↩️ ${formatInteger(returns.length)} devolução(ões)`];
  const weather = buildWeatherHeadline(); if (weather) items.push(`🌦️ ${weather}`);
  const next = d2Agendas.slice(0, 3).map((row) => `${row.uf || 'UF'} ${row.of || row.notaFiscal || ''}`.trim()).filter(Boolean).join(', '); if (next) items.push(`🔎 Próximas agendas: ${next}`);
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
  if (/(atras|fora do prazo|prazo venc)/.test(q)) { const byUf = countBy(delayed, (row) => row.uf || 'Sem UF'); const sample = delayed.slice(0, 5).map((row) => `• ${row.of || row.notaFiscal || 'Carga'} - ${row.cliente || 'cliente não informado'} (${row.uf || '-'})`).join('\n'); return `${formatInteger(delayed.length)} carga(s) estão em atraso nos filtros atuais (${percent(delayed.length, rows.length)} do total). UF mais crítica: ${topLabel(byUf) || 'sem UF'}.\n${sample || 'Não há cargas atrasadas para listar.'}`; }
  if (/(ontime|on time|performance|dentro do prazo|sla)/.test(q)) { const eligible = rows.filter((row) => row.performanceEligible), ontime = eligible.filter((row) => row.ontimeStatus === true).length, late = eligible.filter((row) => row.ontimeStatus === false || row.delayed).length; return `Performance ONTIME da seleção: ${metrics.ontimeRate}%. Base contabilizada: ${formatInteger(eligible.length)} nota(s). Dentro do prazo: ${formatInteger(ontime)}. Fora do prazo: ${formatInteger(late)}. Em trânsito dentro do prazo ou sem fechamento não entra no denominador.`; }
  if (/(ocorr|problema|sinistro|avaria)/.test(q)) { const byUf = countBy(occurrences, (row) => row.uf || 'Sem UF'), bySector = countBy(occurrences, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(occurrences.length)} ocorrência(s). UF com maior volume: ${topLabel(byUf) || '-'}. Setor mais acionado: ${topLabel(bySector) || '-'}. Motorista/placa com mais registros: ${topLabel(byDriver) || '-'}. Consulte a aba Ocorrências para descrições e linhas detalhadas.`; }
  if (/(devol|retorno|reversa)/.test(q)) { const byReason = countBy(returns, (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), byRegion = countBy(returns, (row) => row.region || 'Sem região'), byDriver = countBy(returns, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(returns.length)} devolução(ões). Motivo principal: ${topLabel(byReason) || '-'}. Região mais impactada: ${topLabel(byRegion) || '-'}. Motorista/placa com maior volume: ${topLabel(byDriver) || '-'}. Abra a aba Devoluções para notas e observações.`; }
  if (/(agenda|hoje|amanha|amanhã|d\+2|proxim)/.test(q)) { const today = new Date(), d2 = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2))); const list = d2.slice(0, 8).map((row) => `• ${formatDate(row.agendaDate || row.previsaoEntregaDate)} - ${row.of || row.notaFiscal || 'Carga'} - ${row.uf || '-'} - ${truncate(row.cliente || '-', 42)}`).join('\n'); return `${formatInteger(d2.length)} agenda(s) encontradas até D+2.\n${list || 'Nenhuma agenda próxima nos filtros atuais.'}`; }
  if (/(motorista|placa|veiculo|veículo)/.test(q)) { const byTransit = countBy(rows.filter((row) => row.transit), (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), byOcc = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Motoristas/placas em trânsito: ${formatInteger(metrics.driversInTransit)}. Maior volume em trânsito: ${topLabel(byTransit) || '-'}. Maior recorrência em ocorrências: ${topLabel(byOcc) || '-'}.`; }
  if (/(total|quant|nota|carga|geral)/.test(q)) return `Nos filtros atuais existem ${formatInteger(metrics.totalNotes)} nota(s), ${formatInteger(metrics.totalLoads)} carga(s), ${formatInteger(metrics.delivered)} finalizada(s), ${formatInteger(metrics.inTransit)} em trânsito, ${formatInteger(metrics.delayed)} atrasada(s), ${formatInteger(metrics.occurrences)} ocorrência(s) e ${formatInteger(metrics.returns)} devolução(ões).`;
  return `Resumo da seleção: ${formatInteger(metrics.totalNotes)} notas, ${formatInteger(metrics.delayed)} atrasos, ${formatInteger(metrics.occurrences)} ocorrências, ${formatInteger(metrics.returns)} devoluções e ONTIME de ${metrics.ontimeRate}%. Pergunte, por exemplo: "quais cargas estão em atraso?", "gerar relatório" ou "onde encontro devoluções por motivo?"`;
}
function addAiMessage(text) { addMessage(text, 'ai'); }
function addUserMessage(text) { addMessage(text, 'user'); }
function addMessage(text, kind) { const div = document.createElement('div'); div.className = `chat-message ${kind}`; div.textContent = text; DOM.monitorMessages.appendChild(div); DOM.monitorMessages.scrollTop = DOM.monitorMessages.scrollHeight; }
function buildQuickReport() {
  const rows = STATE.filtered, m = computeMetrics(rows), byStatus = topEntries(countBy(rows, (row) => row.statusBucket), 6), byUf = topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 8), byOcc = topEntries(countBy(rows.filter((row) => row.hasOccurrence), (row) => row.uf || 'Sem UF'), 5), byReturn = topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => row.region || 'Sem região'), 5);
  return `Relatório rápido - Torre de Controle\nGerado em ${formatDateTime(new Date())}\n\nFiltros atuais: ${formatInteger(rows.length)} registro(s) | ${formatInteger(m.totalNotes)} nota(s) | ${formatInteger(m.totalLoads)} carga(s).\nEntregues/finalizadas: ${formatInteger(m.delivered)} | Aguardando descarga: ${formatInteger(m.waitingUnload)} | Em trânsito: ${formatInteger(m.inTransit)} | Fora do prazo: ${formatInteger(m.delayed)}.\nPerformance ONTIME: ${m.ontimeRate}% em ${formatInteger(m.performanceEligible)} nota(s) contabilizadas.\nOcorrências: ${formatInteger(m.occurrences)} | Devoluções: ${formatInteger(m.returns)} | Agendas até D+2: ${formatInteger(m.d2Agendas)}.\n\nStatus: ${formatEntryList(byStatus)}\nTop UFs: ${formatEntryList(byUf)}\nOcorrências por UF: ${formatEntryList(byOcc) || 'sem registros'}\nDevoluções por região: ${formatEntryList(byReturn) || 'sem registros'}\n\nRecomendações Monitor IA:\n1. Priorizar cargas fora do prazo nas UFs com maior concentração.\n2. Validar ocorrências com setor responsável antes das agendas do dia.\n3. Analisar devoluções por motivo e motorista para ações preventivas.`;
}

function exportCsv() {
  exportRowsXlsx();
}
function exportRowsXlsx() {
  const rows = STATE.filtered;
  if (!rows.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  downloadXlsx(`monitoramento-${dateForFile(new Date())}.xlsx`, [{ name: 'Base Monitoramento', rows: buildExportRows(rows) }]);
}
function exportQuickReportXlsx() {
  const rows = STATE.filtered;
  if (!rows.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  const m = computeMetrics(rows);
  const summaryRows = [
    ['Relatório rápido - Torre de Controle'],
    ['Gerado em', formatDateTime(new Date())],
    ['Unidade', STATE.filters.source || 'Todas'],
    [],
    ['Indicador', 'Valor'],
    ['Registros', rows.length],
    ['Notas', m.totalNotes],
    ['Cargas únicas', m.totalLoads],
    ['Entregues/finalizadas', m.delivered],
    ['Aguardando descarga', m.waitingUnload],
    ['Em trânsito', m.inTransit],
    ['Fora do prazo', m.delayed],
    ['Performance ONTIME', `${m.ontimeRate}%`],
    ['Ocorrências', m.occurrences],
    ['Devoluções', m.returns],
    ['Agendas até D+2', m.d2Agendas]
  ];
  const statusRows = [['Status', 'Registros'], ...topEntries(countBy(rows, (row) => row.statusBucket), 20)];
  const ufRows = [['UF', 'Registros'], ...topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 27)];
  downloadXlsx(`relatorio-monitoramento-${dateForFile(new Date())}.xlsx`, [
    { name: 'Resumo', rows: summaryRows },
    { name: 'Status', rows: statusRows },
    { name: 'UFs', rows: ufRows },
    { name: 'Base', rows: buildExportRows(rows) }
  ]);
}
function exportDynamicReport() {
  const rows = STATE.filtered;
  if (!rows.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  const selected = Array.from(document.querySelectorAll('.report-option:checked')).map((input) => input.value).join(', ') || 'Nenhum bloco selecionado';
  const previewLines = (document.getElementById('reportPreview')?.innerText || buildQuickReport()).split(/\n+/).map((line) => [line]).filter((line) => line[0].trim());
  downloadXlsx(`dashboard-rapido-${dateForFile(new Date())}.xlsx`, [
    { name: 'Dashboard rápido', rows: [['Dashboard rápido - Torre de Controle'], ['Gerado em', formatDateTime(new Date())], ['Blocos selecionados', selected], [], ...previewLines] },
    { name: 'Base', rows: buildExportRows(rows) }
  ]);
}
function buildExportRows(rows) {
  const rawKeys = [...new Set(rows.flatMap((row) => Object.keys(row.raw || {}).filter((key) => !key.startsWith('__'))))];
  const keys = ['Origem', 'Região', 'Status Painel', 'Atrasada', 'ONTIME Painel', 'Motivo Devolução Painel', ...rawKeys];
  return [keys, ...rows.map((row) => keys.map((key) => {
    if (key === 'Origem') return row.source;
    if (key === 'Região') return row.region;
    if (key === 'Status Painel') return row.statusBucket;
    if (key === 'Atrasada') return row.delayed ? 'Sim' : 'Não';
    if (key === 'ONTIME Painel') return row.ontimeStatus === true ? 'No prazo' : row.ontimeStatus === false ? 'Fora do prazo' : 'Sem ONTIME';
    if (key === 'Motivo Devolução Painel') return row.returnReason || '';
    return row.raw[key] || '';
  }))];
}
function downloadXlsx(filename, sheets) {
  const safeSheets = sheets.map((sheet, index) => ({ name: safeSheetName(sheet.name || `Planilha ${index + 1}`, index), rows: sheet.rows || [] }));
  const files = buildXlsxFiles(safeSheets);
  const blob = createZipBlob(files, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  downloadBlob(filename, blob);
}
function buildXlsxFiles(sheets) {
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`;
  const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`;
  const workbook = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>${sheets.map((sheet, i) => `<sheet name="${escapeXml(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join('')}</sheets></workbook>`;
  const workbookRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join('')}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="1"><fill><patternFill patternType="none"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>`;
  const files = {
    '[Content_Types].xml': contentTypes,
    '_rels/.rels': rootRels,
    'xl/workbook.xml': workbook,
    'xl/_rels/workbook.xml.rels': workbookRels,
    'xl/styles.xml': styles
  };
  sheets.forEach((sheet, index) => { files[`xl/worksheets/sheet${index + 1}.xml`] = worksheetXml(sheet.rows); });
  return files;
}
function worksheetXml(rows) {
  const body = rows.map((row, rowIndex) => `<row r="${rowIndex + 1}">${(row || []).map((value, colIndex) => cellXml(value, rowIndex + 1, colIndex + 1)).join('')}</row>`).join('');
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${body}</sheetData></worksheet>`;
}
function cellXml(value, row, col) {
  if (value == null || value === '') return '';
  return `<c r="${columnName(col)}${row}" t="inlineStr"><is><t>${escapeXml(String(value))}</t></is></c>`;
}
function columnName(index) {
  let name = '';
  while (index > 0) { const mod = (index - 1) % 26; name = String.fromCharCode(65 + mod) + name; index = Math.floor((index - mod) / 26); }
  return name;
}
function safeSheetName(name, index) {
  const clean = String(name || `Planilha ${index + 1}`).replace(/[\\/?*\[\]:]/g, ' ').trim().slice(0, 31);
  return clean || `Planilha ${index + 1}`;
}
function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function createZipBlob(files, type) {
  const encoder = new TextEncoder();
  const entries = Object.entries(files).map(([name, content]) => ({ name, nameBytes: encoder.encode(name), data: encoder.encode(content), crc: 0 }));
  const chunks = [];
  const central = [];
  let offset = 0;
  entries.forEach((entry) => {
    entry.crc = crc32(entry.data);
    entry.offset = offset;
    const local = zipLocalHeader(entry);
    chunks.push(local, entry.data);
    offset += local.length + entry.data.length;
  });
  let centralSize = 0;
  entries.forEach((entry) => { const header = zipCentralHeader(entry); central.push(header); centralSize += header.length; });
  const centralOffset = offset;
  chunks.push(...central, zipEndRecord(entries.length, centralSize, centralOffset));
  return new Blob(chunks, { type });
}
function zipLocalHeader(entry) {
  const header = new Uint8Array(30 + entry.nameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true); view.setUint16(4, 20, true); view.setUint16(6, 0, true); view.setUint16(8, 0, true); view.setUint16(10, 0, true); view.setUint16(12, 0, true);
  view.setUint32(14, entry.crc, true); view.setUint32(18, entry.data.length, true); view.setUint32(22, entry.data.length, true); view.setUint16(26, entry.nameBytes.length, true); view.setUint16(28, 0, true);
  header.set(entry.nameBytes, 30);
  return header;
}
function zipCentralHeader(entry) {
  const header = new Uint8Array(46 + entry.nameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true); view.setUint16(4, 20, true); view.setUint16(6, 20, true); view.setUint16(8, 0, true); view.setUint16(10, 0, true); view.setUint16(12, 0, true); view.setUint16(14, 0, true);
  view.setUint32(16, entry.crc, true); view.setUint32(20, entry.data.length, true); view.setUint32(24, entry.data.length, true); view.setUint16(28, entry.nameBytes.length, true); view.setUint16(30, 0, true); view.setUint16(32, 0, true);
  view.setUint16(34, 0, true); view.setUint16(36, 0, true); view.setUint32(38, 0, true); view.setUint32(42, entry.offset, true);
  header.set(entry.nameBytes, 46);
  return header;
}
function zipEndRecord(entryCount, centralSize, centralOffset) {
  const header = new Uint8Array(22);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x06054b50, true); view.setUint16(4, 0, true); view.setUint16(6, 0, true); view.setUint16(8, entryCount, true); view.setUint16(10, entryCount, true);
  view.setUint32(12, centralSize, true); view.setUint32(16, centralOffset, true); view.setUint16(20, 0, true);
  return header;
}
let CRC_TABLE = null;
function crc32(data) {
  if (!CRC_TABLE) CRC_TABLE = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i += 1) crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function downloadText(filename, text) { const blob = new Blob([text], { type: 'text/plain;charset=utf-8' }); downloadBlob(filename, blob); }

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

function getRawField(row, aliases) { return getAliasedValue(row.raw || {}, aliases); }
function parseBrazilNumber(value) {
  if (!isPresent(value)) return 0;
  const clean = String(value).replace(/R\$/g, '').replace(/\s/g, '').replace(/\./g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
  const number = Number(clean);
  return Number.isFinite(number) ? number : 0;
}
function formatCurrency(value) { return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }
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
function escapeXml(value) { return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char])); }
function csvEscape(value) { const str = String(value == null ? '' : value).replace(/"/g, '""'); return /[";\n\r]/.test(str) ? `"${str}"` : str; }
function isPresent(value) { return value != null && String(value).trim() !== ''; }
function normalizeText(value) {
  const separated = String(value || '')
    .replace(/([a-zà-ÿ])([A-ZÀ-Ý])/g, '$1 $2')
    .replace(/([A-ZÀ-Ý]+)([A-ZÀ-Ý][a-zà-ÿ])/g, '$1 $2');
  return separated.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
function normalizeUf(value) { const text = String(value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); const match = text.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/); return match ? match[1] : ''; }
function monthNameToNumber(value) {
  const n = normalizeText(value);
  const map = { janeiro:1, jan:1, fevereiro:2, fev:2, marco:3, mar:3, abril:4, abr:4, maio:5, mai:5, junho:6, jun:6, julho:7, jul:7, agosto:8, ago:8, setembro:9, set:9, outubro:10, out:10, novembro:11, nov:11, dezembro:12, dez:12 };
  if (map[n]) return map[n];
  const numeric = Number(n);
  return numeric >= 1 && numeric <= 12 ? numeric : null;
}
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
