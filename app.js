'use strict';

const CONFIG = {
  refreshIntervalMs: 15 * 60 * 1000,
  sheetAttempts: ['acompanhamento', 'Acompanhamento', ''], // tenta a aba solicitada e, como fallback, a primeira aba publicada
  sources: [
    { key: 'filial-ba', name: 'Monitoramento Filial BA', short: 'Filial BA', color: '#1398d6', pubId: '2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSi7hRouHidVGdRosoQx4RqpQw-iLKCiYpjMyIeSGXm_o3QxFeiw_11i0d7OcTfTtdXDydOFwIhqnCr/pubhtml', liveGids: ['0'], fallbackGids: ['1866122843', '820345103', '771091198'], minLiveFields: 30, minLiveRows: 1000 },
    { key: 'matriz-sp', name: 'Monitoramento Matriz SP', short: 'Matriz SP', color: '#2fbf71', pubId: '2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0', url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZz2TV4MFUPBCfNS5MHbhDPSur0VTqxekjkmVCalp0V0hMLAaZvhCbrYqowUzfuftrpY7AlUGeWDR0/pubhtml', liveGids: ['1090815394'], fallbackGids: ['1400737164', '1118798860'], minLiveFields: 30, minLiveRows: 1000 }
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
    status: ['Status', 'Situação', 'Situacao', 'Status Entrega', 'Status da Entrega', 'Status Base', 'Status Atual', 'Acompanhamento', 'Ocorrência Status', 'Status Viagem', 'Status Aplicativo', 'PROCV STATUS TRANSPORTE+'],
    previsaoEntrega: ['Previsão de Entrega', 'Previsao de Entrega', 'Previsão deEntrega', 'Previsao deEntrega', 'Prev Entrega', 'Prev. Entrega', 'Data Prevista Entrega', 'Previsão', 'Previsao'],
    chegadaCliente: ['Chegada no cliente', 'Chegada Cliente', 'Data Chegada Cliente', 'Chegada', 'Data Entrega', 'Entrega Realizada'],
    ontime: ['ONTIME', 'On Time', 'On-time', 'No Prazo', 'Dentro do Prazo', 'OTD'],
    ocorrencia: ['Ocorrência', 'Ocorrencia', 'Descrição da Ocorrência', 'Descricao da Ocorrencia', 'Descrição Ocorrência', 'Descricao Ocorrencia', 'Motivo Ocorrência', 'Motivo Ocorrencia'],
    tipoOcorrencia: ['Tipo de Ocorrência', 'Tipo Ocorrência', 'TipoOcorrência', 'Tipo de Ocorrencia', 'Tipo Ocorrencia', 'TipoOcorrencia', 'Categoria Ocorrência', 'Categoria da Ocorrência', 'Classificação Ocorrência', 'Classificacao Ocorrencia', 'Ocorrência Transporte', 'Ocorrência de Transporte', 'Ocorrencia Transporte', 'Ocorrencia de Transporte', 'Motivo Ocorrência', 'Motivo Ocorrencia'],
    descricaoOcorrencia: ['Descrição da Ocorrência', 'Descricao da Ocorrencia', 'Descrição Ocorrência', 'Descricao Ocorrencia', 'Descrição da ocorrência', 'Descricao da ocorrencia', 'Observação Ocorrência', 'Observacao Ocorrencia', 'Detalhe Ocorrência', 'Detalhe Ocorrencia', 'Motivo Ocorrência', 'Motivo Ocorrencia'],
    setor: ['Setor Responsável', 'Setor Responsavel', 'SetorResponsável', 'SetorResponsavel', 'Setor', 'Responsável', 'Responsavel', 'Área Responsável', 'Area Responsavel'],
    devolucao: ['Devolução', 'Devolucao', 'Dev', 'Retorno', 'Logística Reversa', 'Logistica Reversa'],
    tipoDevolucao: ['Tipo Devolução', 'Tipo de Devolução', 'TipoDevolução', 'TipoDevolucao', 'Tipo Devolucao', 'Tipo de Devolucao', 'Parcial/Total', 'Devolução Parcial Total'],
    motivoDevolucao: ['Motivo Devolução', 'Motivo da Devolução', 'MotivoDevolução', 'MotivoDevolucao', 'Motivo Devolucao', 'Motivo da Devolucao', 'Motivo Dev', 'Motivo de Dev', 'Razão Devolução', 'Razao Devolucao', 'Causa Devolução', 'Causa Devolucao', 'Justificativa Devolução', 'Justificativa Devolucao', 'Descrição Motivo Devolução', 'Descricao Motivo Devolucao', 'Descrição Devolução', 'Descricao Devolucao', 'Observação Devolução', 'Observacao Devolucao'],
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
  lastUpdated: null, nextRefreshAt: null, activeTab: 'general', selectedRegion: 'all', selectedMapUf: '', selectedMapCity: '', selectedMapCityUf: '', mapStatus: 'all', weather: {},
  brazilGeoJson: null, brazilGeoLoading: false, brazilGeoError: '', mapZoom: 1, mapPanX: 0, mapPanY: 0, mapDragging: false, mapDragStart: null, mapTransitionTimer: null, mapClickTimer: null, tableSorts: {},
  monitorMemory: { totalRequests: 0, topics: {}, lastQuestions: [], insights: [] }, monitorLastSignature: '', occurrenceDetailRows: [], occurrenceDetailLabel: '',
  chartPreviewRows: [], chartPreviewLabel: '', chartPreviewContext: '', compactMode: false, returnFilter: null, dynamicMetricA: 'status', dynamicMetricB: 'uf', dynamicChartType: 'bars', dynamicFiltersA: new Set(), dynamicFiltersB: new Set(),
  filters: { from: '', to: '', month: 'all', source: 'Filial BA', uf: 'all', status: 'all', search: '' }
};
const DOM = {};
const pendingGviz = new Map();
let snapshotPromise = null;
let gvizInstalled = false;
let loadSequence = 0;
let autoRefreshTimer = null;
let countdownTimer = null;
let returnFilterTimer = null;
let tooltipFrame = null;
let tooltipTarget = null;
let tooltipEvent = null;
const STATUS_CLASS = { 'Fora do prazo': 'danger', Finalizado: 'success', 'Aguard. descarga': 'warn', 'Ag Descarga': 'warn', 'Em trânsito': 'info', 'Em transito no prazo': 'info', 'Em transito fora do prazo': 'danger', 'Em doca': 'purple', Descarregando: 'warn', Devolvido: 'purple', 'Aguardando liberação': 'warn', 'Em aberto': 'purple', Faturado: 'purple' };

window.addEventListener('DOMContentLoaded', () => {
  cacheDom(); initTheme(); initPalette(); initCompactMode(); loadMonitorMemory(); bindEvents(); installGvizFallback(); populateSourceFilter();
  addAiMessage('Olá! Sou o Monitor IA. Vou acompanhar as planilhas da Filial BA e Matriz SP a cada 15 minutos. Posso explicar como usar cada aba, sugerir ações para dúvidas operacionais e gerar relatórios XLSX com os campos que você pedir, por exemplo: OF, Nota Fiscal, Motorista, previsão de entrega e status.');
  loadData({ manual: false });
  loadBrazilGeoJson();
  if (countdownTimer) window.clearInterval(countdownTimer);
  countdownTimer = window.setInterval(updateCountdown, 1000);
});

function cacheDom() {
  ['refreshBtn','themeToggle','compactToggle','colorPalette','lastUpdate','nextUpdate','loadDot','updateStatus','refreshProgress','alertBanner','filterFrom','filterTo','filterMonth','filterSource','filterUf','filterStatus','filterSearch','filterCounter','clearFiltersBtn','exportCsvBtn','exportReportBtn','exportDynamicReportBtn','dynamicTypeGroupA','dynamicTypeGroupB','dynamicSuggestion','dynamicChartTypeGroup','dynamicFilterChips','dynamicInfoChart','dynamicInfoInsights','dynamicInfoControls','dynamicInfoPanel','exportReportDialog','exportReportClose','exportReportPdfBtn','exportReportXlsxBtn','chartPreviewModal','chartPreviewClose','chartPreviewExport','chartPreviewPrint','chartPreviewTitle','chartPreviewBody','occurrenceDetailModal','occurrenceDetailClose','occurrenceDetailExport','occurrenceDetailPrint','occurrenceDetailTitle','occurrenceDetailBody','monitorMessages','monitorForm','monitorInput','detailModal','modalClose','modalTitle','modalBody','tooltip','mapRegionFilter','mapStatusFilter','applyMapRegionGlobal','mapFocusTitle','mapFocusSub','mapScopeBadge','mapStateBreakdown','mapCityBreakdown','aiFab','brazilMap','mapZoomIn','mapZoomOut','mapZoomReset','mapZoomLevel']
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
  if (DOM.compactToggle) DOM.compactToggle.addEventListener('click', toggleCompactMode);
  if (DOM.colorPalette) DOM.colorPalette.addEventListener('change', () => setPalette(DOM.colorPalette.value));
  DOM.clearFiltersBtn.addEventListener('click', clearFilters);
  DOM.exportCsvBtn.addEventListener('click', exportCsv);
  DOM.exportReportBtn.addEventListener('click', () => { const report = buildQuickReport(); addAiMessage(report); exportQuickReportXlsx(); });
  document.querySelectorAll('.subtab-button').forEach((button) => button.addEventListener('click', () => activatePerformanceView(button.dataset.performanceView)));
  document.querySelectorAll('.report-option').forEach((input) => input.addEventListener('change', renderReportBuilder));
  renderDynamicTypeButtons();
  if (DOM.exportDynamicReportBtn) DOM.exportDynamicReportBtn.addEventListener('click', showReportExportDialog);
  if (DOM.exportReportClose) DOM.exportReportClose.addEventListener('click', () => DOM.exportReportDialog.close());
  if (DOM.exportReportPdfBtn) DOM.exportReportPdfBtn.addEventListener('click', () => { DOM.exportReportDialog.close(); exportDynamicReportPdf(); });
  if (DOM.exportReportXlsxBtn) DOM.exportReportXlsxBtn.addEventListener('click', () => { DOM.exportReportDialog.close(); exportDynamicReport(); });
  if (DOM.chartPreviewClose) DOM.chartPreviewClose.addEventListener('click', () => DOM.chartPreviewModal.close());
  if (DOM.chartPreviewExport) DOM.chartPreviewExport.addEventListener('click', exportChartPreviewXlsx);
  if (DOM.chartPreviewPrint) DOM.chartPreviewPrint.addEventListener('click', printChartPreview);
  if (DOM.occurrenceDetailClose) DOM.occurrenceDetailClose.addEventListener('click', () => DOM.occurrenceDetailModal.close());
  if (DOM.occurrenceDetailExport) DOM.occurrenceDetailExport.addEventListener('click', exportOccurrenceDetailXlsx);
  if (DOM.occurrenceDetailPrint) DOM.occurrenceDetailPrint.addEventListener('click', printOccurrenceDetail);
  [DOM.filterFrom, DOM.filterTo, DOM.filterMonth, DOM.filterSource, DOM.filterUf, DOM.filterStatus].forEach((input) => input.addEventListener('change', onFilterChange));
  DOM.filterSearch.addEventListener('input', debounce(onFilterChange, 180));
  if (DOM.brazilMap) bindMapZoomEvents();
  if (DOM.mapZoomIn) DOM.mapZoomIn.addEventListener('click', () => adjustMapZoom(0.2));
  if (DOM.mapZoomOut) DOM.mapZoomOut.addEventListener('click', () => adjustMapZoom(-0.2));
  if (DOM.mapZoomReset) DOM.mapZoomReset.addEventListener('click', resetMapView);
  DOM.monitorForm.addEventListener('submit', (event) => { event.preventDefault(); const q = DOM.monitorInput.value.trim(); if (q) { DOM.monitorInput.value = ''; askMonitor(q); } });
  document.querySelectorAll('.monitor-chips button').forEach((button) => button.addEventListener('click', () => askMonitor(button.dataset.question || button.textContent)));
  if (DOM.aiFab) DOM.aiFab.addEventListener('click', () => document.body.classList.toggle('ai-floating-open'));
  document.body.addEventListener('mousemove', handleSummaryTooltipMove);
  document.body.addEventListener('mouseout', handleSummaryTooltipOut);
  document.body.addEventListener('click', (event) => {
    const sortButton = event.target.closest('[data-table-sort]'); if (sortButton) return handleTableSort(sortButton);
    const row = event.target.closest('[data-open-record]'); if (row) return openRecordDetail(row.dataset.openRecord);
    const action = event.target.closest('[data-action]'); if (action) handleAction(action.dataset.action, action.dataset.value, action);
  });
  document.body.addEventListener('dblclick', (event) => {
    const dblAction = event.target.closest('[data-dbl-action]');
    if (dblAction) {
      event.preventDefault();
      cancelReturnFilterClick();
      if (dblAction.dataset.dblAction === 'chartPreview') return openChartPreview(dblAction.dataset.dblValue || dblAction.dataset.value || '');
    }
    const detail = event.target.closest('[data-map-detail]');
    if (!detail) return;
    event.preventDefault();
    cancelMapSingleClick();
    const [type = '', value = '', uf = ''] = String(detail.dataset.mapDetail || '').split('|||');
    openMapGroupDetail(type, value, uf);
  });
  DOM.modalClose.addEventListener('click', () => DOM.detailModal.close());
  DOM.detailModal.addEventListener('click', (event) => {
    const rect = DOM.detailModal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) DOM.detailModal.close();
  });
  DOM.mapRegionFilter.addEventListener('change', () => { STATE.selectedRegion = DOM.mapRegionFilter.value; STATE.selectedMapUf = ''; STATE.selectedMapCity = ''; STATE.selectedMapCityUf = ''; resetMapZoom(); renderMap(); });
  DOM.mapStatusFilter.addEventListener('change', () => { STATE.mapStatus = DOM.mapStatusFilter.value; renderMap(); });
  DOM.applyMapRegionGlobal.addEventListener('click', resetMapView);
}

function activateTab(tab) {
  STATE.activeTab = tab;
  DOM.navTabs.forEach((button) => button.classList.toggle('active', button.dataset.tab === tab));
  DOM.panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === tab));
  renderActiveTab();
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

function initCompactMode() {
  STATE.compactMode = localStorage.getItem('torre-compact-mode') === '1';
  document.body.classList.toggle('compact-mode', STATE.compactMode);
  updateCompactButton();
}
function toggleCompactMode() {
  STATE.compactMode = !STATE.compactMode;
  localStorage.setItem('torre-compact-mode', STATE.compactMode ? '1' : '0');
  document.body.classList.toggle('compact-mode', STATE.compactMode);
  updateCompactButton();
  renderActiveTab();
}
function updateCompactButton() {
  if (!DOM.compactToggle) return;
  DOM.compactToggle.textContent = STATE.compactMode ? 'Expandir Informações' : 'Compactar Informações';
  DOM.compactToggle.setAttribute('aria-pressed', STATE.compactMode ? 'true' : 'false');
}
function activatePerformanceView(view = 'unit') {
  document.querySelectorAll('.subtab-button').forEach((button) => button.classList.toggle('active', button.dataset.performanceView === view));
  document.querySelectorAll('[data-performance-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.performancePanel === view));
}

async function loadData({ manual = false } = {}) {
  if (STATE.isLoading) {
    if (manual) addAiMessage('Já existe uma atualização em andamento. Aguarde alguns segundos para evitar travamento do painel.');
    return;
  }
  const seq = ++loadSequence;
  STATE.isLoading = true;
  snapshotPromise = null;
  if (autoRefreshTimer) { window.clearTimeout(autoRefreshTimer); autoRefreshTimer = null; }
  setLoadStatus('loading', manual ? 'Consultando planilhas agora...' : 'Consultando planilhas ao vivo...');
  showBanner('', '');
  try {
    const sourceResults = await Promise.all(CONFIG.sources.map(async (source) => {
      try { return { source, records: await fetchSource(source, { preferLive: true }) }; }
      catch (error) { return { source, records: [], error }; }
    }));
    if (seq !== loadSequence) return;
    const refreshOrigins = sourceResults.map((item) => item.records && item.records.__liveOrigin ? `${item.source.short}: ${item.records.__liveOrigin}` : '').filter(Boolean);
    let records = sourceResults.flatMap((item) => item.records);
    STATE.errors = [
      ...sourceResults.filter((item) => item.error).map((item) => `${item.source.short}: ${item.error.message || item.error}`),
      ...sourceResults.map((item) => item.records && item.records.__refreshWarning).filter(Boolean)
    ];
    STATE.isDemo = false;
    if (!records.length) {
      records = buildDemoRecords(); STATE.isDemo = true;
      STATE.errors = ['Não foi possível carregar as planilhas pelo navegador neste momento. Exibindo base demonstrativa para manter o painel navegável. Verifique se as publicações Google continuam públicas.'];
    }
    STATE.rawRecords = records;
    STATE.records = records.map(normalizeRecord).filter((row) => row && !isRetiraContract(row) && hasDocumentNumber(row));
    STATE.lastUpdated = new Date(); STATE.isLoading = false;
    scheduleAutoRefresh();
    populateDynamicFilters(); applyFiltersAndRender(); fetchWeather();
    if (STATE.errors.length) { setLoadStatus(STATE.isDemo ? 'error' : 'ok', STATE.isDemo ? 'Modo demonstrativo' : 'Atualizado com alertas'); showBanner(STATE.errors.join(' • '), STATE.isDemo ? 'error' : 'warn'); }
    else setLoadStatus('ok', 'Dados atualizados');
    if (manual) addAiMessage(`Atualização concluída às ${formatTime(STATE.lastUpdated)}. ${formatInteger(STATE.records.length)} registros carregados${STATE.isDemo ? ' em modo demonstrativo' : ''}.${refreshOrigins.length ? ` Origem ao vivo: ${refreshOrigins.join(' | ')}.` : ''}`);
  } catch (error) {
    STATE.isLoading = false;
    STATE.errors = [error.message || String(error)];
    setLoadStatus('error', 'Falha ao atualizar');
    showBanner(STATE.errors.join(' • '), 'error');
    scheduleAutoRefresh();
  }
}

function scheduleAutoRefresh() {
  if (autoRefreshTimer) window.clearTimeout(autoRefreshTimer);
  STATE.nextRefreshAt = new Date(Date.now() + CONFIG.refreshIntervalMs);
  updateCountdown();
  autoRefreshTimer = window.setTimeout(() => loadData({ manual: false }), CONFIG.refreshIntervalMs);
}

async function fetchSource(source, { preferLive = true } = {}) {
  const errors = [];
  const tryPublished = async () => {
    const publishedRecords = await fetchPublishedData(source);
    if (publishedRecords.length) return publishedRecords;
    throw new Error('publicação da planilha sem registros');
  };
  const trySnapshot = async () => {
    const snapshotRecords = await fetchSnapshotSource(source);
    if (snapshotRecords.length) return snapshotRecords;
    throw new Error('snapshot local sem registros');
  };
  const attempts = preferLive
    ? [
      ['publicação', tryPublished],
      ['snapshot', trySnapshot]
    ]
    : [
      ['snapshot', trySnapshot],
      ['publicação', tryPublished]
    ];

  for (const [label, attempt] of attempts) {
    try {
      const records = await attempt();
      if (label === 'snapshot' && preferLive && errors.length) {
        const warning = `${source.short}: atualização ao vivo indisponível; usando último snapshot publicado. ${errors.slice(-1)[0] || ''}`;
        try { Object.defineProperty(records, '__refreshWarning', { value: warning, enumerable: false }); }
        catch (_) { records.__refreshWarning = warning; }
      }
      return records;
    }
    catch (error) { errors.push(`${label}: ${error.message || error}`); }
  }

  throw new Error(errors.filter(Boolean).join(' | ') || 'Não foi possível consultar a planilha publicada.');
}

async function loadSheetSnapshot() {
  if (!snapshotPromise) {
    snapshotPromise = fetchJsonWithTimeout(`data/sheets.json?_=${Date.now()}`, 9000);
  }
  return snapshotPromise;
}

async function fetchJsonWithTimeout(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    window.clearTimeout(timer);
  }
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
  const errors = [];

  try {
    const configuredRecords = await fetchConfiguredLiveCsv(source, base, errors);
    if (configuredRecords.length) return configuredRecords;
    errors.push('CSV ao vivo configurado sem linhas úteis');
  } catch (error) {
    errors.push(`CSV ao vivo configurado: ${error.message || String(error)}`);
  }

  try {
    const pubhtml = await fetchTextSmart(source.url, { directTimeoutMs: 12000, proxyTimeoutMs: 30000 });
    const records = await fetchBestPublishedSheet(source, base, pubhtml, errors);
    if (records.length) return records;
    errors.push('nenhum candidato publicado com linhas úteis');
  } catch (error) {
    errors.push(`pubhtml: ${error.message || String(error)}`);
  }

  const candidates = [
    { type: 'csv', url: `${base}/pub?output=csv` },
    { type: 'html', url: source.url }
  ];
  for (const candidate of candidates) {
    try {
      const text = await fetchTextSmart(candidate.url, { directTimeoutMs: 12000, proxyTimeoutMs: 30000 });
      const records = candidate.type === 'csv' ? parseCsvRecords(text, source) : parseHtmlRecords(text, source);
      if (isUsablePublishedRecords(records, source)) return records;
      if (records.length) errors.push(`${candidate.type} retornou ${records.length} linhas, mas não a base completa`);
      else errors.push(`${candidate.type} sem linhas`);
    } catch (error) {
      errors.push(`${candidate.type}: ${error.message || String(error)}`);
    }
  }
  throw new Error(errors.filter(Boolean).slice(-8).join(' | ') || 'falha ao ler publicação');
}

async function fetchConfiguredLiveCsv(source, base, errors = []) {
  const gids = [...new Set([...(source.liveGids || []), ...(source.fallbackGids || [])].filter(Boolean))];
  const candidates = [];
  for (const gid of gids) {
    const url = `${base}/pub?gid=${gid}&single=true&output=csv`;
    try {
      const text = await fetchTextSmart(url, { directTimeoutMs: 18000, proxyTimeoutMs: 60000 });
      const records = parseCsvRecords(text, source);
      if (isUsablePublishedRecords(records, source)) {
        markLiveRecords(records, `ao vivo gid ${gid}`);
        return records;
      }
      if (records.length) {
        candidates.push({ score: publishedCandidateScore(records), records, origin: `gid ${gid}` });
        errors.push(`gid ${gid} retornou ${records.length} linhas / ${publishedCandidateFieldCount(records)} campos, abaixo da base esperada`);
      } else errors.push(`gid ${gid} sem dados`);
    } catch (error) {
      errors.push(`gid ${gid}: ${error.message || String(error)}`);
    }
  }
  candidates.sort((a, b) => compareScores(b.score, a.score));
  const best = candidates[0];
  if (best && source.minLiveFields == null && source.minLiveRows == null) {
    markLiveRecords(best.records, `ao vivo ${best.origin}`);
    return best.records;
  }
  return [];
}

async function fetchBestPublishedSheet(source, base, pubhtml, errors = []) {
  const { ordered, targetGids } = discoverPublishedGids(pubhtml);
  const seen = new Set();
  const collectCsvCandidates = async (gids) => {
    const candidates = [];
    for (const gid of gids) {
      const url = `${base}/pub?gid=${gid}&single=true&output=csv`;
      if (seen.has(url)) continue;
      seen.add(url);
      try {
        const records = parseCsvRecords(await fetchTextSmart(url, { directTimeoutMs: 15000, proxyTimeoutMs: 45000 }), source);
        if (records.length) {
          const score = [(targetGids.has(gid)) ? 1 : 0, ...publishedCandidateScore(records)];
          candidates.push({ score, records, origin: `csv gid ${gid}` });
          if (!isUsablePublishedRecords(records, source)) errors.push(`csv gid ${gid} retornou ${records.length} linhas / ${publishedCandidateFieldCount(records)} campos, abaixo da base esperada`);
        } else errors.push(`csv gid ${gid} sem dados`);
      } catch (error) {
        errors.push(`csv gid ${gid}: ${error.message || String(error)}`);
      }
    }
    return candidates;
  };
  const selectBestCandidate = (candidates) => {
    candidates.sort((a, b) => compareScores(b.score, a.score));
    const selected = candidates.find((candidate) => isUsablePublishedRecords(candidate.records, source))
      || ((source.minLiveFields == null && source.minLiveRows == null) ? candidates[0] : null);
    if (selected) {
      markLiveRecords(selected.records, selected.origin);
      errors.push(`selecionado ${selected.origin}: ${selected.records.length} linhas`);
    }
    return selected ? selected.records : [];
  };

  const targetCandidates = targetGids.size ? await collectCsvCandidates(ordered.filter((gid) => targetGids.has(gid))) : [];
  if (targetCandidates.length) {
    const selectedTarget = selectBestCandidate(targetCandidates);
    if (selectedTarget.length) return selectedTarget;
  }

  const fallbackGids = targetGids.size ? ordered.filter((gid) => !targetGids.has(gid)).slice(0, 4) : ordered.slice(0, 4);
  if (!fallbackGids.includes('0')) fallbackGids.push('0');
  const candidates = await collectCsvCandidates(fallbackGids);
  const defaultCsvUrl = `${base}/pub?output=csv`;
  if (!seen.has(defaultCsvUrl)) {
    seen.add(defaultCsvUrl);
    try {
      const records = parseCsvRecords(await fetchTextSmart(defaultCsvUrl, { directTimeoutMs: 15000, proxyTimeoutMs: 45000 }), source);
      if (records.length) {
        candidates.push({ score: [0, ...publishedCandidateScore(records)], records, origin: 'csv padrão' });
        if (!isUsablePublishedRecords(records, source)) errors.push(`csv padrão retornou ${records.length} linhas / ${publishedCandidateFieldCount(records)} campos, abaixo da base esperada`);
      } else errors.push('csv padrão sem dados');
    } catch (error) {
      errors.push(`csv padrão: ${error.message || String(error)}`);
    }
  }

  try {
    const htmlRecords = parseHtmlRecords(pubhtml, source);
    if (htmlRecords.length) {
      candidates.push({ score: [0, ...publishedCandidateScore(htmlRecords)], records: htmlRecords, origin: 'html publicado' });
      if (!isUsablePublishedRecords(htmlRecords, source)) errors.push(`html publicado retornou ${htmlRecords.length} linhas / ${publishedCandidateFieldCount(htmlRecords)} campos, abaixo da base esperada`);
    } else errors.push('html publicado sem tabela útil');
  } catch (error) {
    errors.push(`html publicado: ${error.message || String(error)}`);
  }

  return selectBestCandidate(candidates);
}

function discoverPublishedGids(pubhtml) {
  const ordered = [];
  const targetGids = new Set();
  const text = String(pubhtml || '');
  const regex = /gid=(\d+)/g;
  let match;
  while ((match = regex.exec(text))) {
    const gid = match[1];
    const windowText = text.slice(Math.max(0, match.index - 700), match.index + 700);
    if (/acompanh/.test(normalizeText(windowText))) targetGids.add(gid);
    if (!ordered.includes(gid)) ordered.push(gid);
  }
  if (!ordered.includes('0')) ordered.push('0');
  return { ordered: ordered.filter((gid, index) => ordered.indexOf(gid) === index), targetGids };
}

function publishedCandidateScore(records) {
  const fields = records[0] ? Object.keys(records[0]).filter((key) => !key.startsWith('__')) : [];
  const known = fields.reduce((score, field) => score + (isKnownHeader(field) ? 1 : 0), 0);
  return [fields.length, known, Math.min(records.length, 20000), records.length];
}
function publishedCandidateFieldCount(records) { return records && records[0] ? Object.keys(records[0]).filter((key) => !key.startsWith('__')).length : 0; }
function isUsablePublishedRecords(records, source) {
  if (!Array.isArray(records) || !records.length) return false;
  const fieldCount = publishedCandidateFieldCount(records);
  const minFields = source.minLiveFields || 0;
  const minRows = source.minLiveRows || 0;
  if (fieldCount < minFields || records.length < minRows) return false;
  const fields = Object.keys(records[0] || {}).filter((key) => !key.startsWith('__')).map(normalizeText);
  const requiredGroups = [
    ['of', 'ordem de frete', 'carga'],
    ['nf', 'nota fiscal'],
    ['status', 'situacao'],
    ['cliente', 'destinatario'],
    ['uf', 'estado'],
    ['previsao de entrega', 'previsao deentrega']
  ];
  const matched = requiredGroups.filter((group) => fields.some((field) => group.some((needle) => field === normalizeText(needle) || field.includes(normalizeText(needle))))).length;
  return matched >= 5;
}
function markLiveRecords(records, origin) {
  if (!Array.isArray(records)) return records;
  try { Object.defineProperty(records, '__liveOrigin', { value: origin, enumerable: false }); }
  catch (_) { records.__liveOrigin = origin; }
  return records;
}

function compareScores(a, b) {
  const max = Math.max(a.length, b.length);
  for (let index = 0; index < max; index += 1) {
    const diff = (a[index] || 0) - (b[index] || 0);
    if (diff) return diff;
  }
  return 0;
}

async function fetchTextSmart(url, options = {}) {
  const freshUrl = appendCacheBuster(url);
  const targets = buildLiveFetchTargets(freshUrl);
  const directTimeoutMs = options.directTimeoutMs || 12000;
  const proxyTimeoutMs = options.proxyTimeoutMs || 30000;
  let lastError = null;
  for (const target of targets) {
    let timer = null;
    try {
      const controller = new AbortController();
      timer = window.setTimeout(() => controller.abort(), target.direct ? directTimeoutMs : proxyTimeoutMs);
      const response = await fetch(target.url, { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw new Error(`${target.label}: HTTP ${response.status}`);
      let text = await response.text();
      if (target.kind === 'allorigins-json') {
        const parsed = JSON.parse(text);
        text = parsed.contents || '';
      }
      if (!text || text.length < 20) throw new Error(`${target.label}: resposta vazia`);
      if (/Sorry, the file you have requested does not exist/i.test(text)) throw new Error(`${target.label}: arquivo não encontrado`);
      if (/Sorry, unable to open the file at this time/i.test(text)) throw new Error(`${target.label}: Google não abriu o arquivo`);
      return text;
    } catch (error) {
      lastError = error;
    } finally {
      if (timer) window.clearTimeout(timer);
    }
  }
  throw lastError || new Error('falha de rede');
}
function buildLiveFetchTargets(url) {
  const encoded = encodeURIComponent(url);
  return [
    { label: 'direto', url, direct: true },
    { label: 'allorigins raw', url: `https://api.allorigins.win/raw?url=${encoded}` },
    { label: 'allorigins json', url: `https://api.allorigins.win/get?url=${encoded}`, kind: 'allorigins-json' },
    { label: 'codetabs', url: `https://api.codetabs.com/v1/proxy?quest=${encoded}` },
    { label: 'corsproxy.io', url: `https://corsproxy.io/?${encoded}` },
    { label: 'isomorphic-git', url: `https://cors.isomorphic-git.org/${url}` },
    { label: 'thingproxy', url: `https://thingproxy.freeboard.io/fetch/${url}` }
  ];
}
function appendCacheBuster(url) {
  const separator = String(url || '').includes('?') ? '&' : '?';
  return `${url}${separator}_=${Date.now()}`;
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
  row.baseStatus = normalizeBaseStatusLabel(row.status || row.faturamento || getRawField(row, ['Status Aplicativo', 'PROCV STATUS TRANSPORTE+', 'Situação', 'Situacao']));
  row.delivered = isDelivered(normalizedStatus); row.waitingUnload = isWaitingUnload(normalizedStatus); row.transit = isTransit(normalizedStatus, row); row.open = !row.delivered && !row.waitingUnload;
  row.occurrenceType = extractOccurrenceType(record, row); row.occurrenceDescription = extractOccurrenceDescription(record, row);
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
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm === alias); if (match && hasUsableSpreadsheetValue(record[match.key])) return cleanSpreadsheetValue(record[match.key]); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.startsWith(alias)); if (match && hasUsableSpreadsheetValue(record[match.key])) return cleanSpreadsheetValue(record[match.key]); }
  for (const alias of normalizedAliases) { const match = normalizedKeys.find((item) => item.norm.includes(alias)); if (match && hasUsableSpreadsheetValue(record[match.key])) return cleanSpreadsheetValue(record[match.key]); }
  return '';
}

function normalizeBaseStatusLabel(value) {
  const raw = cleanLabel(value);
  const n = normalizeText(raw);
  if (!n) return 'Sem status';
  if (/em transito fora do prazo|em transito atrasad|transito fora|trânsito fora|fora do prazo/.test(n)) return 'Em transito fora do prazo';
  if (/em transito no prazo|transito no prazo|trânsito no prazo/.test(n)) return 'Em transito no prazo';
  if (/^ag descarga$|aguard descarga|aguardando descarga|descarga no cliente/.test(n)) return 'Ag Descarga';
  if (/descarreg/.test(n)) return 'Descarregando';
  if (/aguardando liberacao|ag liberacao|liberacao/.test(n)) return 'Aguardando liberação';
  if (/devolv/.test(n)) return 'Devolvido';
  if (/em doca|veic em doca|veiculo em doca|doca/.test(n)) return 'Em doca';
  if (/(finalizad|entregue|entrega realizada|baixad|concluid)/.test(n) && !/(faturamento|entrada)/.test(n)) return 'Finalizado';
  return raw;
}

function displayStatus(row) { return row?.baseStatus || normalizeBaseStatusLabel(row?.status || row?.faturamento || '') || row?.statusBucket || 'Sem status'; }

function computeOntimeStatus(row, normalizedStatus) {
  const due = row.previsaoEntregaDate || row.agendaDate;
  const arrival = row.chegadaClienteDate;
  if (isExplicitLateStatus(normalizedStatus)) return false;
  if (row.waitingUnload) {
    if (due && arrival) return startOfDay(arrival) <= endOfDay(due);
    if (due && !arrival && isDateBeforeToday(due)) return false;
    return null;
  }
  const ontime = normalizeText(row.ontime);
  if (ontime) {
    if (/(fora|atras|vencid|late|nao|não|no prazo nao)/.test(ontime) && !/(dentro|sim|ok|on time|ontime|no prazo)/.test(ontime)) return false;
    if (/(dentro|sim|ok|on time|ontime|no prazo|prazo cumprido)/.test(ontime) || ontime === 's') return true;
    if (ontime === 'n') return false;
  }
  if (due && arrival) return startOfDay(arrival) <= endOfDay(due);
  return null;
}
function computePerformanceEligible(row, normalizedStatus) { if (row.delivered || row.waitingUnload) return row.ontimeStatus !== null; if (isExplicitLateStatus(normalizedStatus)) return true; return row.ontimeStatus === false; }
function computeDelayed(row, normalizedStatus) { if (row.ontimeStatus === false || isExplicitLateStatus(normalizedStatus)) return true; const due = row.previsaoEntregaDate || row.agendaDate; return Boolean(due && !row.delivered && !row.waitingUnload && isDateBeforeToday(due)); }
function isExplicitLateStatus(normalizedStatus) { return /(em transito fora do prazo|fora do prazo|atrasad|vencid)/.test(normalizedStatus || ''); }
function isDateBeforeToday(date) { return Boolean(date && startOfDay(date) < startOfDay(new Date())); }
function computeStatusBucket(row, normalizedStatus) { if (row.delayed) return 'Fora do prazo'; if (row.waitingUnload) return 'Aguard. descarga'; if (row.delivered) return 'Finalizado'; if (row.transit) return 'Em trânsito'; if (/(faturamento|faturado|entrada concluida|entrada concluída)/.test(normalizedStatus)) return 'Faturado'; return 'Em aberto'; }
function isDelivered(normalizedStatus) { return /(finalizad|entregue|entrega realizada|baixad|concluid)/.test(normalizedStatus) && !/(faturamento|entrada)/.test(normalizedStatus); }
function isWaitingUnload(normalizedStatus) { return /(^ag descarga$|ag\.? descarga|aguardando descarga|descarga no cliente|em descarga|aguard descarga)/.test(normalizedStatus); }
function isTransit(normalizedStatus, row) { return /(transito|trânsito|rota|viagem|a caminho|em entrega|fazendo entrega|em andamento|desloc|carregado|coleta)/.test(normalizedStatus) || (!row.delivered && !row.waitingUnload && (row.placa || row.motorista) && (row.previsaoEntregaDate || row.agendaDate)); }
function getOccurrenceText(row) {
  const parts = [];
  if (isDetailedOccurrenceLabel(row.occurrenceType)) parts.push(cleanLabel(row.occurrenceType));
  if (isDetailedOccurrenceLabel(row.occurrenceDescription) && normalizeText(row.occurrenceDescription) !== normalizeText(row.occurrenceType)) parts.push(cleanLabel(row.occurrenceDescription));
  if (!parts.length && isMeaningfulOccurrence(row.ocorrencia)) parts.push(cleanLabel(row.ocorrencia));
  if (row.setor && parts.length) parts.push(`Setor: ${row.setor}`);
  return parts.filter(Boolean).join(' • ');
}
function extractOccurrenceType(record, row) {
  const candidates = occurrenceFieldValues(record, (normalized) => normalized.includes('ocorr') && (normalized.includes('tipo') || normalized.includes('categoria') || normalized.includes('classificacao') || normalized.includes('classific') || normalized.includes('motivo') || normalized === 'ocorrencia' || normalized === 'ocorrencias'));
  candidates.push(row && row.tipoOcorrencia, row && row.ocorrencia);
  const detailed = candidates.map(cleanLabel).find(isDetailedOccurrenceLabel);
  if (detailed) return detailed;
  return '';
}
function extractOccurrenceDescription(record, row) {
  const candidates = occurrenceFieldValues(record, (normalized) => normalized.includes('ocorr') && (normalized.includes('descr') || normalized.includes('detalhe') || normalized.includes('observ') || normalized.includes('motivo')));
  candidates.push(row && row.descricaoOcorrencia);
  const detailed = candidates.map(cleanLabel).find(isDetailedOccurrenceLabel);
  if (detailed) return detailed;
  return '';
}
function occurrenceFieldValues(record, predicate) {
  return Object.keys(record || {})
    .filter((key) => !key.startsWith('__') && predicate(normalizeText(key)))
    .map((key) => record[key])
    .filter(isPresent);
}
function isDetailedOccurrenceLabel(value) {
  const text = cleanLabel(value);
  if (!text) return false;
  const normalized = normalizeText(text);
  if (!normalized || /^(sim|s|nao|não|n|ok|n\/a|sem ocorrencia|sem ocorrência|sem registro|inexistente|normal|0|-)$/.test(normalized)) return false;
  if (/^\d+[\d\s.,/%-]*$/.test(text)) return false;
  return /[a-zA-ZÀ-ÿ]/.test(text);
}
function occurrenceTypeLabel(row) {
  const detailed = [row.occurrenceType, row.occurrenceDescription].map(cleanLabel).find(isDetailedOccurrenceLabel);
  return canonicalOccurrenceLabel(detailed || 'Ocorrência informada sem tipo detalhado');
}
function canonicalOccurrenceLabel(value) {
  const text = cleanLabel(value) || 'Ocorrência informada sem tipo detalhado';
  return simplifyDescription(formatCaseInsensitiveLabel(text));
}
function formatCaseInsensitiveLabel(value) {
  const clean = cleanLabel(value).replace(/\s+/g, ' ').trim();
  if (!clean) return '';
  const smallWords = new Set(['a', 'as', 'o', 'os', 'e', 'em', 'de', 'da', 'das', 'do', 'dos', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'ao', 'aos']);
  const acronyms = new Set(['cd', 'cte', 'ctrc', 'nf', 'nfe', 'sac']);
  let wordIndex = 0;
  return clean.toLocaleLowerCase('pt-BR').replace(/[a-zà-ÿ]+/g, (word) => {
    const normalized = normalizeText(word);
    const index = wordIndex;
    wordIndex += 1;
    if (acronyms.has(normalized)) return word.toLocaleUpperCase('pt-BR');
    if (index > 0 && smallWords.has(normalized)) return word;
    return word.charAt(0).toLocaleUpperCase('pt-BR') + word.slice(1);
  });
}
function getReturnText(row) { return [row.devolucao, row.tipoDevolucao, row.returnReason].filter(Boolean).join(' • '); }
function extractReturnReason(record, row) {
  const candidateKeys = Object.keys(record || {}).filter((key) => {
    if (key.startsWith('__')) return false;
    const normalized = normalizeText(key);
    return normalized.includes('motivodevolucao') || normalized.includes('motivodev') || (normalized.includes('devol') && /(motivo|razao|causa|justific|descr|observ|detalhe)/.test(normalized));
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
function hasDocumentNumber(row) {
  const of = cleanLabel(row && row.of);
  const nf = cleanLabel(row && row.notaFiscal);
  const valid = (value) => {
    const text = cleanLabel(value);
    if (!text) return false;
    const n = normalizeText(text);
    if (/^(0+|0+ 0+|nao|não|sem|sem documento|sem nf|sem of|n a|na|nd|n d|null|nulo|undefined|indefinido)$/.test(n)) return false;
    if (/^-?0+(?:[.,]0+)?$/.test(text.trim())) return false;
    return /[a-z0-9]/i.test(n);
  };
  return valid(of) || valid(nf);
}
function normalizeReturnType(row) {
  const text = normalizeText([row.tipoDevolucao, row.devolucao].filter(Boolean).join(' '));
  if (/\bparcial\b/.test(text)) return 'Parcial';
  if (/\btotal\b/.test(text)) return 'Total';
  return row.hasReturn ? 'Não informado' : '';
}
function isMeaningfulOccurrence(value) { const n = normalizeText(value); return Boolean(n && !/(^(nao|não)(\s+(nao|não))*$|sem ocorrencia|sem ocorrência|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function isMeaningfulReturn(value) { const n = normalizeText(value); return Boolean(n && !/(^(nao|não)(\s+(nao|não))*$|sem devolucao|sem devolução|nao possui|não possui|n\/a|^ok$|normal|sem registro|inexistente|^0$)/.test(n)); }
function buildSearchText(row) { const rawValues = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__')).map(([, value]) => value); return normalizeText([row.source,row.of,row.notaFiscal,row.cliente,row.cidade,row.uf,row.placa,row.motorista,row.status,row.ontime,row.occurrenceType,row.occurrenceDescription,row.occurrenceText,row.returnText,row.observacao,...rawValues].join(' ')); }

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
function clearFilters() { DOM.filterFrom.value = ''; DOM.filterTo.value = ''; DOM.filterMonth.value = 'all'; DOM.filterSource.value = CONFIG.sources[0].short; DOM.filterUf.value = 'all'; DOM.filterStatus.value = 'all'; DOM.filterSearch.value = ''; STATE.returnFilter = null; DOM.sourceTabs.forEach((button) => button.classList.toggle('active', button.dataset.source === DOM.filterSource.value)); onFilterChange(); }
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
function renderAll() { updateHeaderStatus(); renderActiveTab(); renderTicker(); updateMonitorRealtimeInsights(); }
function renderActiveTab() {
  const renderers = { general: renderGeneral, performance: renderPerformance, occurrences: renderOccurrences, returns: renderReturns, extras: renderExtras, report: renderReportBuilder, map: renderMap };
  const renderer = renderers[STATE.activeTab] || renderGeneral;
  renderer();
}
function updateHeaderStatus() { const count = STATE.filtered.length; DOM.filterCounter.textContent = `${formatInteger(count)} registro${count === 1 ? '' : 's'} nos filtros`; if (STATE.lastUpdated) DOM.lastUpdate.textContent = `Atualizado às ${formatTime(STATE.lastUpdated)}`; }
function setLoadStatus(status, message) {
  const isLoading = status === 'loading';
  if (DOM.loadDot) {
    DOM.loadDot.classList.remove('loading', 'error');
    if (isLoading) DOM.loadDot.classList.add('loading');
    if (status === 'error') DOM.loadDot.classList.add('error');
  }
  if (DOM.updateStatus) {
    DOM.updateStatus.classList.toggle('loading', isLoading);
    DOM.updateStatus.classList.toggle('error', status === 'error');
    DOM.updateStatus.setAttribute('aria-busy', isLoading ? 'true' : 'false');
  }
  if (DOM.refreshProgress) DOM.refreshProgress.setAttribute('aria-hidden', isLoading ? 'false' : 'true');
  DOM.lastUpdate.textContent = status === 'ok' && STATE.lastUpdated ? `${message} às ${formatTime(STATE.lastUpdated)}` : message;
  updateCountdown();
}
function updateCountdown() { if (!STATE.nextRefreshAt) { DOM.nextUpdate.textContent = 'próxima: --:--'; return; } const remaining = Math.max(0, STATE.nextRefreshAt.getTime() - Date.now()); const minutes = Math.floor(remaining / 60000); const seconds = Math.floor((remaining % 60000) / 1000); DOM.nextUpdate.textContent = `próxima: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; }
function showBanner(message, type = 'warn') { if (!message) { DOM.alertBanner.classList.add('hidden'); DOM.alertBanner.textContent = ''; return; } DOM.alertBanner.classList.remove('hidden'); DOM.alertBanner.textContent = message; DOM.alertBanner.style.borderColor = type === 'error' ? 'rgba(230,46,45,.35)' : 'rgba(255,176,32,.26)'; DOM.alertBanner.style.background = type === 'error' ? 'rgba(230,46,45,.10)' : 'rgba(255,176,32,.10)'; DOM.alertBanner.style.color = type === 'error' ? '#ffd3d0' : '#ffe6b0'; }

function renderGeneral() {
  const metrics = computeMetrics(STATE.filtered);
  document.getElementById('generalKpis').innerHTML = [
    kpiCard('Total de notas', formatInteger(metrics.totalNotes), `${formatInteger(metrics.totalLoads)} cargas únicas`, '📄', '', 'all'),
    kpiCard('Cargas em atraso', formatInteger(metrics.delayed), `${percent(metrics.delayed, metrics.totalRecords)} da seleção`, '⚠', 'danger', 'delayed'),
    kpiCard('Cargas entregues', formatInteger(metrics.delivered), `${formatInteger(metrics.waitingUnload)} aguardando descarga`, '✅', 'success', 'delivered'),
    kpiCard('Motoristas em trânsito', formatInteger(metrics.driversInTransit), `${formatInteger(metrics.inTransit)} veículos/cargas em trânsito`, '🚚', 'info', 'transit'),
    kpiCard('Ocorrências', formatInteger(metrics.occurrences), `${formatInteger(metrics.occurrenceUfs)} UFs com registro`, '🚨', 'warn', 'occurrence'),
    kpiCard('Devoluções', formatInteger(metrics.returns), `${formatInteger(metrics.returnRegions)} regiões impactadas`, '↩️', 'purple', 'return'),
    kpiCard('Performance ONTIME', `${metrics.ontimeRate}%`, `${formatInteger(metrics.performanceEligible)} notas contabilizadas`, '🎯', metrics.ontimeRate >= 90 ? 'success' : metrics.ontimeRate >= 75 ? 'warn' : 'danger', null),
    kpiCard('Agendas D+2', formatInteger(metrics.d2Agendas), `${formatInteger(metrics.todayAgendas)} para hoje`, '📅', 'info', null)
  ].join('');
  renderScheduleCards();
  renderBarList('statusChart', countBy(STATE.filtered, (row) => displayStatus(row)), { empty: 'Nenhum status encontrado para os filtros.', colorResolver: (label) => statusColorClass(label) });
  renderBarList('ufChart', topEntries(countBy(STATE.filtered, (row) => row.uf || 'Sem UF'), 12), { empty: 'Nenhuma UF encontrada para os filtros.', actionResolver: (label) => ({ action: 'uf', value: label }) });
  renderGeneralDashboardCharts(STATE.filtered, metrics);
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
      <div class="schedule-card-head"><strong>${escapeHtml(row.of || row.notaFiscal || 'Carga')}</strong><span class="schedule-pill">${escapeHtml(label)}</span></div>
      <small>${escapeHtml(formatDate(date))} • ${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</small>
      <p>${escapeHtml(truncate(row.cliente || '-', 46))}</p>
    </article>`;
  }).join('');
}

function renderGeneralDashboardCharts(rows, metrics) {
  renderDonutDashboard('generalStatusDonut', topEntries(countBy(rows, (row) => displayStatus(row)), 6).map(([label, value]) => ({
    label, value, cls: statusColorClass(label), action: { action: 'chartPreview', value: `statusChart|||${label}` }
  })), { centerValue: formatInteger(rows.length), centerLabel: 'registros', measureLabel: 'Status de entrega conforme a planilha base.' });

  renderMonthlyComboDashboard('generalTrendChart', buildMonthlyTrend(rows));

  renderDonutDashboard('deliveryMixChart', [
    { label: 'Finalizadas', value: metrics.delivered, cls: 'success', action: { action: 'filterStatus', value: 'delivered' } },
    { label: 'Em trânsito', value: metrics.inTransit, cls: 'info', action: { action: 'filterStatus', value: 'transit' } },
    { label: 'Fora do prazo', value: metrics.delayed, cls: 'danger', action: { action: 'filterStatus', value: 'delayed' } },
    { label: 'Em aberto', value: Math.max(0, metrics.totalRecords - metrics.delivered - metrics.inTransit - metrics.delayed), cls: 'purple', action: { action: 'filterStatus', value: 'open' } }
  ], { centerValue: `${metrics.ontimeRate}%`, centerLabel: 'ONTIME', measureLabel: 'Comparação entre cargas finalizadas, em trânsito, fora do prazo e em aberto nos filtros.' });

  renderOperationProfile(rows);
}

function renderDonutDashboard(containerId, items, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const total = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  if (!total) { container.innerHTML = emptyState('Sem dados suficientes para o gráfico.'); return; }
  let acc = 0;
  const gradient = items.map((item, index) => {
    const start = acc;
    const end = acc + ((Number(item.value) || 0) / total) * 100;
    acc = end;
    return `${chartColor(item.cls || item.label, index)} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
  }).join(', ');
  const measure = options.measureLabel || 'registros filtrados conforme a composição do gráfico.';
  const legend = items.map((item, index) => {
    const width = Math.round(((Number(item.value) || 0) / total) * 100);
    const action = item.action ? `data-action="${escapeHtml(item.action.action)}" data-value="${escapeHtml(item.action.value)}"` : '';
    const summary = `<strong>${escapeHtml(item.label)}</strong><br>${formatInteger(item.value)} registro(s)<br><small>${width}% do total do gráfico</small><br><small>Contabilização: ${escapeHtml(measure)}</small>`;
    return `<button type="button" class="donut-legend-item ${item.action ? 'clickable' : ''}" ${action} data-summary="${escapeHtml(summary)}"><i style="background:${chartColor(item.cls || item.label, index)}"></i><span>${escapeHtml(item.label)}</span><b>${formatInteger(item.value)}</b></button>`;
  }).join('');
  container.innerHTML = `<div class="donut-ring" style="--donut:${gradient}" data-summary="${escapeHtml(`<strong>${options.centerLabel || 'Total'}</strong><br>${options.centerValue || formatInteger(total)}<br><small>Contabilização: ${escapeHtml(measure)}</small>`) }"><div><strong>${escapeHtml(options.centerValue || formatInteger(total))}</strong><span>${escapeHtml(options.centerLabel || 'Total')}</span></div></div><div class="donut-legend">${legend}</div>`;
}

function renderMonthlyComboDashboard(containerId, trend) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!trend.length) { container.innerHTML = emptyState('Sem datas suficientes para evolução.'); return; }
  const width = 720, height = 300, padX = 46, padTop = 30, padBottom = 58;
  const chartHeight = height - padTop - padBottom;
  const slot = (width - padX * 2) / trend.length;
  const barWidth = Math.min(46, Math.max(22, slot * 0.50));
  const yRate = (rate) => padTop + chartHeight - ((Math.max(0, Math.min(100, rate)) / 100) * chartHeight);
  const hRate = (rate) => Math.max(rate ? 4 : 0, (Math.max(0, Math.min(100, rate)) / 100) * chartHeight);
  const columns = trend.map((item) => {
    const cx = padX + slot * item.index + slot / 2;
    const rateH = hRate(item.rate);
    const topY = padTop + chartHeight - rateH;
    const lateY = yRate(item.lateRate);
    const summary = `<strong>${escapeHtml(item.label)}</strong><br>ONTIME: ${item.rate}% (${formatInteger(item.ontime)} no prazo de ${formatInteger(item.eligible)} elegíveis)<br>Fora do prazo: ${formatInteger(item.delayed)} (${item.lateRate}%)<br>Total do mês: ${formatInteger(item.total)} registro(s)<br><small>Contabilização: percentual ONTIME por mês, usando notas elegíveis pela regra do painel.</small>`;
    return `<g class="monthly-column clickable" data-action="filterMonth" data-value="${escapeHtml(String(item.month))}" data-summary="${escapeHtml(summary)}">
      <rect class="month-bar rate-bg" x="${(cx - barWidth / 2).toFixed(1)}" y="${padTop.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${chartHeight.toFixed(1)}" rx="12"></rect>
      <rect class="month-bar ontime" x="${(cx - barWidth / 2 + 5).toFixed(1)}" y="${topY.toFixed(1)}" width="${(barWidth - 10).toFixed(1)}" height="${rateH.toFixed(1)}" rx="10"></rect>
      <circle class="month-rate-dot ${item.rate >= 90 ? 'success' : item.rate >= 75 ? 'warn' : 'danger'}" cx="${cx.toFixed(1)}" cy="${yRate(item.rate).toFixed(1)}" r="5"></circle>
      <circle class="month-late-dot" cx="${(cx + barWidth / 2 + 8).toFixed(1)}" cy="${lateY.toFixed(1)}" r="4"></circle>
      <text class="month-value" x="${cx.toFixed(1)}" y="${(topY - 8).toFixed(1)}" text-anchor="middle">${item.rate}%</text>
      <text class="month-subvalue" x="${cx.toFixed(1)}" y="${(topY - 22).toFixed(1)}" text-anchor="middle">${formatInteger(item.eligible)}</text>
      <text class="month-label" x="${cx.toFixed(1)}" y="${height - 18}" text-anchor="middle">${escapeHtml(item.label)}</text>
    </g>`;
  }).join('');
  const ratePoints = trend.map((item) => {
    const cx = padX + slot * item.index + slot / 2;
    const cy = yRate(item.rate);
    return `${cx.toFixed(1)},${cy.toFixed(1)}`;
  }).join(' ');
  container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolução mensal do percentual ONTIME">
    <g class="monthly-grid"><path d="M${padX} ${padTop} H${width - padX}"></path><path d="M${padX} ${padTop + chartHeight / 2} H${width - padX}"></path><path d="M${padX} ${padTop + chartHeight} H${width - padX}"></path></g>
    <text class="monthly-axis-label" x="${padX - 8}" y="${padTop + 4}" text-anchor="end">100%</text><text class="monthly-axis-label" x="${padX - 8}" y="${padTop + chartHeight / 2 + 4}" text-anchor="end">50%</text><text class="monthly-axis-label" x="${padX - 8}" y="${padTop + chartHeight + 4}" text-anchor="end">0%</text>
    <polyline class="month-rate-line" points="${ratePoints}"></polyline>
    ${columns}
  </svg>
  <div class="monthly-legend"><span><i class="rate"></i>% ONTIME</span><span><i class="total"></i>Notas elegíveis</span><span><i class="delayed"></i>% Fora do prazo</span><em>Clique no mês para filtrar/desfazer.</em></div>`;
}

function buildMonthlyTrend(rows) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const validRows = rows.filter((row) => {
    const ref = trendMonthReference(row, currentYear);
    if (!ref) return false;
    return ref.year < currentYear || (ref.year === currentYear && ref.month <= currentMonth);
  });
  const grouped = groupBy(validRows, (row) => {
    const ref = trendMonthReference(row, currentYear);
    return `${ref.year}-${String(ref.month).padStart(2, '0')}`;
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-12)
    .map(([key, list], index) => {
      const [year, month] = key.split('-').map(Number);
      const eligible = list.filter((row) => row.performanceEligible);
      const ontime = eligible.filter((row) => row.ontimeStatus === true).length;
      const delayed = list.filter((row) => row.delayed).length;
      return {
        key, month, year, index,
        label: `${monthShortName(month)}/${String(year).slice(-2)}`,
        total: list.length,
        delivered: list.filter((row) => row.delivered).length,
        delayed,
        inTransit: list.filter((row) => row.transit).length,
        occurrences: list.filter((row) => row.hasOccurrence).length,
        returns: list.filter((row) => row.hasReturn).length,
        eligible: eligible.length,
        ontime,
        rate: eligible.length ? Math.round((ontime / eligible.length) * 100) : 0,
        lateRate: eligible.length ? Math.round(((eligible.length - ontime) / eligible.length) * 100) : 0
      };
    });
}
function trendMonthReference(row, fallbackYear) {
  const explicitMonth = Number(row.monthNumber || 0);
  if (explicitMonth >= 1 && explicitMonth <= 12) {
    const sameMonthDates = [row.referenceDate, row.emissaoDate, row.saidaDate, row.previsaoEntregaDate, row.chegadaClienteDate]
      .filter(Boolean)
      .filter((date) => date.getMonth() + 1 === explicitMonth);
    const year = sameMonthDates[0]?.getFullYear() || fallbackYear;
    return { year, month: explicitMonth };
  }
  if (!row.referenceDate) return null;
  return { year: row.referenceDate.getFullYear(), month: row.referenceDate.getMonth() + 1 };
}

function renderOperationProfile(rows) {
  const container = document.getElementById('operationProfileChart');
  if (!container) return;
  const cargoRows = rows.filter((row) => normalizeCargoTypeForProfile(row.tpCarga));
  const vehicleRows = rows.filter((row) => normalizeVehicleTypeForProfile(row.tpVeiculo));
  const sections = [
    ['Tipo de carga', topEntries(countBy(cargoRows, (row) => normalizeCargoTypeForProfile(row.tpCarga)), 5), 'Campo Tipo de Carga da planilha, removendo DR conforme solicitado.'],
    ['Veículo', topEntries(countBy(vehicleRows, (row) => normalizeVehicleTypeForProfile(row.tpVeiculo)), 5), 'Campo Tipo de Veículo da planilha, removendo Postergado e Cancelado.'],
    ['Transportador', topEntries(countBy(rows, (row) => normalizeTransporterLabel(row.transportadora)), 5), 'Campo Transportador da planilha, unificando todo Rodocolor em RODOCOLOR.']
  ];
  container.innerHTML = sections.map(([title, entries, measure]) => miniProfileSection(title, entries, measure)).join('');
}
function normalizeCargoTypeForProfile(value) {
  const label = cleanLabel(value);
  if (!label) return '';
  return normalizeText(label) === 'dr' ? '' : label;
}
function normalizeVehicleTypeForProfile(value) {
  const normalized = normalizeText(value);
  if (/bitrem/.test(normalized)) return 'BITREM';
  if (/carreta/.test(normalized)) return 'CARRETA';
  if (/truck|truque/.test(normalized)) return 'TRUCK';
  return '';
}
function normalizeTransporterLabel(value) {
  const label = cleanLabel(value);
  if (!label) return 'Sem transportador';
  return normalizeText(label).includes('rodocolor') ? 'RODOCOLOR' : label;
}
function miniProfileSection(title, entries, measureLabel = 'Campo operacional da planilha filtrada.') {
  if (!entries.length) return `<section class="profile-section"><h4>${escapeHtml(title)}</h4>${emptyState('Sem dados.')}</section>`;
  const max = Math.max(...entries.map(([, value]) => value), 1);
  return `<section class="profile-section"><h4>${escapeHtml(title)}</h4>${entries.map(([label, value], index) => `<div class="profile-row" data-action="chartPreview" data-value="${escapeHtml(`profile:${title}|||${label}`)}" data-summary="${escapeHtml(`<strong>${label}</strong><br>${formatInteger(value)} registro(s)<br><small>Contabilização: ${measureLabel}</small><br><small>Clique para abrir a prévia resumida.</small>`)}"><span title="${escapeHtml(label)}">${escapeHtml(truncate(label, 26))}</span><i><em style="width:${Math.max(5, Math.round((value / max) * 100))}%; background:${chartColor(label, index)}"></em></i><b>${formatInteger(value)}</b></div>`).join('')}</section>`;
}
function chartColor(seed, index = 0) {
  const key = normalizeText(seed);
  if (/danger|fora|atras|devol|ocorr/.test(key)) return '#e05252';
  if (/success|final|entreg|prazo/.test(key)) return '#2fbf71';
  if (/warn|aguard/.test(key)) return '#f0a43a';
  const colors = ['#2a83c6', '#7bdcb5', '#7aa8e8', '#9adfe3', '#bca7f2', '#ffc7d9', '#95d5b2', '#f7c873'];
  return colors[Math.abs(hashText(key || String(index))) % colors.length];
}
function hashText(text) { return String(text).split('').reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0); }

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
    kpiCard('Percentual consolidado', `${consolidatedRate}%`, `BA + SP • ${formatInteger(consolidatedEligible.length)} notas elegíveis`, '🎯', consolidatedRate >= 90 ? 'success' : consolidatedRate >= 75 ? 'warn' : 'danger'),
    kpiCard(`Notas ${STATE.filters.source}`, formatInteger(eligible.length), 'Finalizado, aguardando descarga ou fora do prazo', '🧾'),
    kpiCard('Dentro do prazo', formatInteger(ontime), `${rate}% de aderência da unidade`, '✅', 'success'),
    kpiCard('Fora do prazo', formatInteger(late), `${percent(late, eligible.length)} da base ONTIME`, '⚠', 'danger', 'delayed'),
    kpiCard('Em trânsito não contado', formatInteger(notCountedTransit), 'Dentro do prazo ou sem fechamento', '🚚', 'info', 'transit')
  ].join('');
  document.getElementById('ontimeGauge').innerHTML = performanceGaugeHtml(rate, 'ONTIME', [
    ['Notas elegíveis', eligible.length, 'info'],
    ['Dentro do prazo', ontime, 'success'],
    ['Fora do prazo', late, 'danger'],
    ['Em trânsito não contado', notCountedTransit, 'warn']
  ]);
  renderPerformanceSourceInsights('performanceSource', eligible, rows);
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
    kpiCard('Performance consolidada', `${rate}%`, `${formatInteger(eligible.length)} notas elegíveis BA + SP`, '🎯', rate >= 90 ? 'success' : rate >= 75 ? 'warn' : 'danger'),
    kpiCard('Dentro do prazo', formatInteger(ontime), 'Base consolidada', '✅', 'success'),
    kpiCard('Fora do prazo', formatInteger(late), `${percent(late, eligible.length)} da base`, '⚠', 'danger'),
    kpiCard('Em trânsito não contado', formatInteger(transit), 'Sem fechamento de performance', '🚚', 'info')
  ].join('');
  const gauge = document.getElementById('consolidatedGauge');
  if (gauge) gauge.innerHTML = performanceGaugeHtml(rate, 'BA + SP', [
    ['Notas elegíveis', eligible.length, 'info'],
    ['Dentro do prazo', ontime, 'success'],
    ['Fora do prazo', late, 'danger'],
    ['Em trânsito não contado', transit, 'warn']
  ]);
  renderPerformanceBars('consolidatedBySource', groupBy(eligible, (row) => row.source || 'Sem origem'), 'origem');
  renderPerformanceBars('consolidatedByUf', groupBy(eligible, (row) => row.uf || 'Sem UF'), 'UF');
  renderRecordsTable('consolidatedLateTable', rows.filter((row) => row.delayed || (row.performanceEligible && row.ontimeStatus === false)), { limit: 300, empty: 'Nenhuma carga fora do prazo no consolidado.' });
}
function performanceGaugeHtml(rate, label, stats) {
  const statHtml = stats.map(([name, value, type]) => `<div class="gauge-stat ${escapeHtml(type || '')}" data-action="chartPreview" data-value="${escapeHtml(`performanceGauge:${label}|||${name}`)}" data-summary="${escapeHtml(`<strong>${name}</strong><br>${formatInteger(value)} registro(s)<br><small>Contabilização: base elegível ONTIME, status finalizado/aguardando descarga ou fora do prazo.</small><br><small>Clique para abrir a prévia resumida.</small>`)}"><span>${escapeHtml(name)}</span><strong>${formatInteger(value)}</strong></div>`).join('');
  return `<div class="performance-gauge-card" data-summary="${escapeHtml(`<strong>${label}</strong><br>${rate}% dentro do prazo<br><small>Contabilização: notas elegíveis pela regra ONTIME do painel.</small>`)}"><div class="gauge-ring" style="--pct:${rate}"><div class="gauge-content"><strong>${rate}%</strong><span>${escapeHtml(label)}</span></div></div><div class="gauge-stat-list">${statHtml}</div></div>`;
}
function renderPerformanceSourceInsights(containerId, eligibleRows, allRows) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const groupedEligible = groupBy(eligibleRows, (row) => row.source || 'Sem origem');
  const entries = Object.entries(groupedEligible).map(([label, rows]) => {
    const ontime = rows.filter((row) => row.ontimeStatus === true).length;
    const late = rows.filter((row) => row.ontimeStatus === false || row.delayed).length;
    return [label, { rows, count: rows.length, ontime, late, rate: rows.length ? Math.round((ontime / rows.length) * 100) : 0 }];
  }).sort((a, b) => b[1].count - a[1].count || String(a[0]).localeCompare(String(b[0])));
  if (!entries.length) { container.innerHTML = emptyState('Sem dados elegíveis para performance por origem.'); return; }
  const sourceCards = entries.map(([label, item]) => {
    const cls = item.rate >= 90 ? 'success' : item.rate >= 75 ? 'warn' : 'danger';
    const summary = `<strong>${escapeHtml(label)}</strong><br>${item.rate}% dentro do prazo<br>${formatInteger(item.ontime)} no prazo • ${formatInteger(item.late)} fora<br>${formatInteger(item.count)} nota(s) elegíveis<br><small>Contabilização: origem das notas elegíveis pela regra ONTIME.</small>`;
    return `<div class="origin-rate-card ${cls}" data-action="chartPreview" data-value="${escapeHtml(`performanceSource|||${label}`)}" data-summary="${escapeHtml(summary)}"><div><strong>${escapeHtml(label)}</strong><span>${formatInteger(item.count)} notas elegíveis</span></div><b>${item.rate}%</b><i><em style="width:${item.rate}%"></em></i></div>`;
  }).join('');
  const selectedSource = STATE.filters.source === 'all' ? null : STATE.filters.source;
  const focusRows = selectedSource ? allRows.filter((row) => row.source === selectedSource) : allRows;
  const focusEligible = selectedSource ? eligibleRows.filter((row) => row.source === selectedSource) : eligibleRows;
  const delayedRows = focusRows.filter((row) => row.delayed || (row.performanceEligible && row.ontimeStatus === false));
  const notCountedTransit = focusRows.filter((row) => row.transit && !row.performanceEligible && !row.delayed).length;
  const byUfLate = countBy(delayedRows, (row) => row.uf || 'Sem UF');
  const byVehicleLate = countBy(delayedRows, (row) => cleanLabel(row.tpVeiculo) || 'Sem veículo');
  const byStatus = countBy(focusRows, (row) => row.statusBucket || 'Sem status');
  const focusOntime = focusEligible.filter((row) => row.ontimeStatus === true).length;
  const focusRate = focusEligible.length ? Math.round((focusOntime / focusEligible.length) * 100) : 0;
  const insightItems = [
    { icon: '🎯', label: 'Leitura da origem', value: `${focusRate}% ONTIME`, text: `${formatInteger(focusEligible.length)} nota(s) entram na base de performance.` },
    { icon: delayedRows.length ? '⚠' : '✅', label: delayedRows.length ? 'Ponto crítico' : 'Operação estável', value: delayedRows.length ? `${formatInteger(delayedRows.length)} fora do prazo` : 'Sem atrasos', text: delayedRows.length ? `UF mais crítica: ${topLabel(byUfLate) || 'não identificada'}.` : 'Nenhuma carga fora do prazo nos filtros.' },
    { icon: '🚚', label: 'Trânsito monitorado', value: formatInteger(notCountedTransit), text: 'Em trânsito regular não entra no denominador até fechamento.' },
    { icon: '▣', label: 'Status dominante', value: topLabel(byStatus) || '-', text: topLabel(byVehicleLate) ? `Veículo mais ligado a atraso: ${topLabel(byVehicleLate)}.` : 'Sem concentração crítica por veículo.' }
  ];
  container.innerHTML = `<div class="performance-origin-panel"><div class="origin-card-list">${sourceCards}</div><div class="origin-insight-grid">${insightItems.map((item) => `<div class="origin-insight" data-summary="${escapeHtml(`<strong>${item.label}</strong><br>${item.text}`)}"><span>${escapeHtml(item.icon)}</span><div><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.value)}</strong><em>${escapeHtml(item.text)}</em></div></div>`).join('')}</div></div>`;
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
    const summary = `<strong>${escapeHtml(label)}</strong><br>${item.rate}% dentro do prazo • ${formatInteger(item.rows)} nota(s)<br><small>Contabilização: ${labelType} das notas elegíveis pela regra ONTIME.</small>`;
    return `<div class="bar-row clickable" ${action} data-summary="${escapeHtml(summary)}"><div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div><div class="bar-track"><div class="bar-fill ${cls}" style="width:${item.rate}%"></div></div><div class="bar-value">${item.rate}% • ${formatInteger(item.rows)}</div></div>`;
  }).join('');
}

function renderOccurrences() {
  const rows = STATE.filtered.filter((row) => row.hasOccurrence);
  const byType = countBy(rows, occurrenceTypeLabel);
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF'), bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), descriptions = countBy(rows, (row) => simplifyDescription(row.occurrenceDescription || row.occurrenceText));
  document.getElementById('occurrenceKpis').innerHTML = [
    kpiCard('Total de ocorrências', formatInteger(rows.length), `${formatInteger(Object.keys(byUf).length)} UFs impactadas`, '🚨', 'warn', 'occurrence'),
    kpiCard('Setores envolvidos', formatInteger(Object.keys(bySector).length), topLabel(bySector) ? `Principal: ${topLabel(bySector)}` : 'Sem setor informado', '▤', 'info'),
    kpiCard('Motoristas / placas', formatInteger(Object.keys(byDriver).length), topLabel(byDriver) ? `Maior recorrência: ${topLabel(byDriver)}` : 'Sem motorista informado', '🚚', 'purple'),
    kpiCard('Ocorrências em atraso', formatInteger(rows.filter((row) => row.delayed).length), 'Com status fora do prazo', '⏰', 'danger', 'delayed')
  ].join('');
  renderBarList('occurrenceTypes', topEntries(byType, 12), { empty: 'Sem tipos de ocorrência informados.', colorResolver: () => 'warn' });
  renderBarList('occurrenceUf', topEntries(byUf, 10), { empty: 'Sem ocorrências por UF.', colorResolver: () => 'warn', actionResolver: (label) => ({ action: 'uf', value: label }) });
  renderBarList('occurrenceSector', topEntries(bySector, 10), { empty: 'Sem setor responsável informado.', colorResolver: () => 'purple' });
  renderBarList('occurrenceDrivers', topEntries(byDriver, 10), { empty: 'Sem motoristas/placas com ocorrência.', colorResolver: () => 'danger' });
  renderTagCloud('occurrenceDescriptions', topEntries(descriptions, 18), { measureLabel: 'Descrição da ocorrência informada na planilha.', actionResolver: (label) => ({ action: 'occurrenceDescription', value: label }) });
  renderInsights('occurrenceInsights', buildOccurrenceInsights(rows));
  renderRecordsTable('occurrenceTable', rows, { limit: 300, empty: 'Nenhuma ocorrência registrada nos filtros.' });
}

function renderReturns() {
  const baseRows = STATE.filtered.filter((row) => row.hasReturn);
  const rows = filterReturnRows(baseRows);
  const byType = countBy(rows.filter((row) => row.returnType === 'Total' || row.returnType === 'Parcial'), (row) => row.returnType);
  const byReason = countBy(rows, (row) => returnChartValue(row, 'returnReasons'));
  const byRegion = countBy(rows, (row) => returnChartValue(row, 'returnRegions')), byDriver = countBy(rows, (row) => returnChartValue(row, 'returnDrivers'));
  renderReturnFilterChips(rows, baseRows);
  document.getElementById('returnKpis').innerHTML = [
    kpiCard('Total de devoluções', formatInteger(rows.length), `${percent(rows.length, STATE.filtered.length)} da seleção${STATE.returnFilter ? ` • filtro: ${returnFilterLabel(STATE.returnFilter)}` : ''}`, '↩️', 'purple', 'return'),
    kpiCard('Devolução parcial', formatInteger(rows.filter((row) => row.returnType === 'Parcial').length), 'Tipo fiel: Parcial', '½', 'info'),
    kpiCard('Devolução total', formatInteger(rows.filter((row) => row.returnType === 'Total').length), 'Tipo fiel: Total', '1', 'warn'),
    kpiCard('Com observações', formatInteger(rows.filter((row) => isPresent(row.observacao)).length), 'Notas com OBS para análise', '📝', 'success')
  ].join('');
  renderBarList('returnTypes', topEntries(byType, 2), returnBarOptions('returnTypes', 'Sem tipo Total/Parcial informado.', 'purple'));
  renderBarList('returnReasons', topEntries(byReason, 10), returnBarOptions('returnReasons', 'Sem motivos de devolução.', 'warn'));
  renderBarList('returnRegions', topEntries(byRegion, 10), returnBarOptions('returnRegions', 'Sem devoluções por região.', 'danger'));
  renderBarList('returnDrivers', topEntries(byDriver, 12), returnBarOptions('returnDrivers', 'Sem motoristas/placas com devolução.', 'info'));
  renderInsights('returnInsights', buildReturnInsights(rows));
  renderRecordsTable('returnTable', rows, { limit: 300, empty: 'Nenhuma devolução registrada nos filtros.' });
}

function returnChartValue(row, chartId) {
  if (chartId === 'returnTypes') return row.returnType || 'Sem tipo';
  if (chartId === 'returnReasons') return cleanLabel(row.returnReason) || 'Sem motivo informado';
  if (chartId === 'returnRegions') return row.region || 'Sem região';
  if (chartId === 'returnDrivers') return cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa';
  return '';
}
function returnChartTitle(chartId) {
  const titles = { returnTypes: 'Tipo de devolução', returnReasons: 'Motivo de devolução', returnRegions: 'Região', returnDrivers: 'Motorista/placa' };
  return titles[chartId] || 'Devoluções';
}
function returnFilterLabel(filter = STATE.returnFilter) { return filter ? `${returnChartTitle(filter.chart)}: ${filter.label}` : ''; }
function returnFilterMatches(row, filter = STATE.returnFilter) {
  if (!filter) return true;
  return row.hasReturn && normalizeText(returnChartValue(row, filter.chart)) === normalizeText(filter.label);
}
function filterReturnRows(rows) { return STATE.returnFilter ? rows.filter((row) => returnFilterMatches(row)) : rows; }
function returnBarOptions(chartId, empty, color) {
  return {
    empty,
    colorResolver: () => color,
    actionResolver: (label) => ({ action: 'returnFilter', value: `${chartId}|||${label}` }),
    detailResolver: (label) => ({ action: 'chartPreview', value: `${chartId}|||${label}` }),
    activeResolver: (label) => STATE.returnFilter && STATE.returnFilter.chart === chartId && normalizeText(STATE.returnFilter.label) === normalizeText(label),
    summaryResolver: (label, number, width, measure) => `<strong>${escapeHtml(label)}</strong><br>${formatInteger(number)} devolução(ões)<br><small>${width}% da maior categoria exibida</small><br><small>Contabilização: ${escapeHtml(measure)}</small><br><small>Clique 1 vez para filtrar a aba. Clique 2 vezes para abrir a base completa.</small>`
  };
}
function renderReturnFilterChips(rows, baseRows) {
  const container = document.getElementById('returnFilterChips');
  if (!container) return;
  if (!STATE.returnFilter) {
    container.innerHTML = '<span class="dynamic-filter-note">Clique uma vez nos gráficos para filtrar; clique duas vezes para abrir os detalhes completos.</span>';
    return;
  }
  const label = returnFilterLabel();
  container.innerHTML = `<button type="button" class="dynamic-filter-chip active" data-action="clearReturnFilter" data-summary="${escapeHtml(`<strong>Filtro ativo</strong><br>${label}<br>${formatInteger(rows.length)} de ${formatInteger(baseRows.length)} devolução(ões).<br><small>Clique para limpar o filtro.</small>`)}">${escapeHtml(label)} ×</button><span class="dynamic-filter-note">${formatInteger(rows.length)} de ${formatInteger(baseRows.length)} devolução(ões)</span>`;
}
function scheduleReturnFilter(value) {
  cancelReturnFilterClick();
  returnFilterTimer = window.setTimeout(() => {
    returnFilterTimer = null;
    toggleReturnFilter(value);
  }, 240);
}
function cancelReturnFilterClick() {
  if (returnFilterTimer) {
    window.clearTimeout(returnFilterTimer);
    returnFilterTimer = null;
  }
}
function toggleReturnFilter(value) {
  const [chart = '', label = ''] = String(value || '').split('|||');
  if (!chart) return;
  const current = STATE.returnFilter;
  STATE.returnFilter = current && current.chart === chart && normalizeText(current.label) === normalizeText(label) ? null : { chart, label };
  if (STATE.activeTab !== 'returns') activateTab('returns');
  else renderReturns();
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
    kpiCard('Canhotos digitalizados', formatInteger(canhotoOk), `${percent(canhotoOk, rows.length)} da seleção`, '✅', 'purple')
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
  const selected = getSelectedReportOptions();
  const showDynamic = selected.includes('dynamic');
  const rows = STATE.filtered;
  const metrics = computeMetrics(rows);
  if (DOM.dynamicInfoControls) DOM.dynamicInfoControls.classList.toggle('hidden', !showDynamic);
  if (DOM.dynamicInfoPanel) DOM.dynamicInfoPanel.classList.toggle('hidden', !showDynamic);
  const blocks = [];
  if (selected.includes('kpis')) blocks.push(`<div class="report-block"><h4>Indicadores gerais</h4><div class="mini-kpi-row"><span><b>${formatInteger(metrics.totalNotes)}</b> notas</span><span><b>${formatInteger(metrics.totalLoads)}</b> cargas</span><span><b>${formatInteger(metrics.delayed)}</b> atrasos</span><span><b>${formatInteger(metrics.inTransit)}</b> trânsito</span></div></div>`);
  if (selected.includes('performance')) blocks.push(`<div class="report-block"><h4>Performance</h4><div class="report-big-number">${metrics.ontimeRate}%</div><p>${formatInteger(metrics.performanceEligible)} notas elegíveis para ONTIME.</p></div>`);
  if (selected.includes('status')) blocks.push(reportBarBlock('Status de entrega', topEntries(countBy(rows, (row) => displayStatus(row)), 8)));
  if (selected.includes('uf')) blocks.push(reportBarBlock('Distribuição por UF', topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 10)));
  if (selected.includes('schedules')) blocks.push(reportScheduleBlock(rows));
  if (selected.includes('occurrences')) blocks.push(reportBarBlock('Ocorrências por tipo', topEntries(countBy(rows.filter((row) => row.hasOccurrence), occurrenceTypeLabel), 8)));
  if (selected.includes('returns')) blocks.push(reportBarBlock('Motivos de devolução', topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), 8)));
  if (selected.includes('transporters')) blocks.push(reportBarBlock('Transportadores', topEntries(countBy(rows, (row) => normalizeTransporterLabel(row.transportadora)), 8)));
  if (selected.includes('details')) blocks.push(`<div class="report-block full"><h4>Detalhes</h4><div class="report-mini-table">${rows.slice(0, 12).map((row) => `<div data-open-record="${escapeHtml(row.id)}"><b>${escapeHtml(row.of || row.notaFiscal || '-')}</b><span>${escapeHtml(truncate(row.cliente || '-', 34))}</span><small>${escapeHtml(displayStatus(row))} • ${escapeHtml(row.uf || '-')}</small></div>`).join('')}</div></div>`);
  container.innerHTML = blocks.join('') || emptyState('Selecione ao menos uma informação para montar o dashboard.');
  if (showDynamic) renderDynamicInfo(rows);
  else {
    if (DOM.dynamicInfoChart) DOM.dynamicInfoChart.innerHTML = '';
    if (DOM.dynamicFilterChips) DOM.dynamicFilterChips.innerHTML = '';
    if (DOM.dynamicInfoInsights) DOM.dynamicInfoInsights.innerHTML = '';
  }
}
function getSelectedReportOptions() {
  return Array.from(document.querySelectorAll('.report-option:checked')).map((input) => input.value);
}
function getDynamicDimensionDefinitions() {
  return {
    status: { label: 'Status de entrega', measure: 'Status de entrega conforme a planilha base.', getter: (row) => displayStatus(row) || 'Sem status' },
    uf: { label: 'UF', measure: 'UF de destino informada na planilha.', getter: (row) => row.uf || 'Sem UF' },
    performance: { label: 'Performance ONTIME', measure: 'Classificação ONTIME calculada pela regra do painel.', getter: (row) => row.performanceEligible ? (row.ontimeStatus === true ? 'No prazo' : 'Fora do prazo') : 'Não contabilizado' },
    occurrence: { label: 'Ocorrência', measure: 'Tipo/descrição de ocorrência informado na planilha.', getter: (row) => row.hasOccurrence ? occurrenceTypeLabel(row) : 'Sem ocorrência' },
    return: { label: 'Devolução', measure: 'Tipo/motivo de devolução informado na planilha.', getter: (row) => row.hasReturn ? (cleanLabel(row.returnReason) || row.returnType || 'Com devolução') : 'Sem devolução' },
    transporter: { label: 'Transportador', measure: 'Transportador informado na planilha, com Rodocolor unificado.', getter: (row) => normalizeTransporterLabel(row.transportadora) },
    vehicle: { label: 'Tipo de veículo', measure: 'Tipo de veículo informado na planilha, mantendo Truck, Carreta e Bitrem.', getter: (row) => normalizeVehicleTypeForProfile(row.tpVeiculo) || 'Outros/ignorado' },
    month: { label: 'Mês', measure: 'Mês da planilha ou data de referência do registro.', getter: (row) => row.monthNumber ? monthShortName(row.monthNumber) : 'Sem mês', sort: (a, b) => (monthNameToNumber(a) || 99) - (monthNameToNumber(b) || 99) }
  };
}
function dynamicRecommendation(firstKey) {
  const map = {
    status: 'uf', uf: 'status', performance: 'uf', occurrence: 'uf', return: 'return' === firstKey ? 'uf' : 'status', transporter: 'performance', vehicle: 'performance', month: 'performance'
  };
  return map[firstKey] || 'uf';
}
function dynamicChartTypes() {
  return [{ key: 'bars', label: 'Barras' }, { key: 'matrix', label: 'Matriz' }, { key: 'ranking', label: 'Ranking' }];
}
function renderDynamicTypeButtons() {
  const defs = getDynamicDimensionDefinitions();
  const options = Object.entries(defs);
  const render = (axis, container) => {
    if (!container) return;
    const active = axis === 'a' ? STATE.dynamicMetricA : STATE.dynamicMetricB;
    container.innerHTML = options.map(([key, def]) => `<button type="button" class="dynamic-type-btn ${active === key ? 'active' : ''}" data-action="dynamicAxis" data-axis="${axis}" data-value="${escapeHtml(key)}">${escapeHtml(def.label)}</button>`).join('');
  };
  render('a', DOM.dynamicTypeGroupA);
  render('b', DOM.dynamicTypeGroupB);
  if (DOM.dynamicChartTypeGroup) DOM.dynamicChartTypeGroup.innerHTML = dynamicChartTypes().map((item) => `<button type="button" class="dynamic-type-btn ${STATE.dynamicChartType === item.key ? 'active' : ''}" data-action="dynamicChartType" data-value="${item.key}">${escapeHtml(item.label)}</button>`).join('');
  if (DOM.dynamicSuggestion) {
    const rec = defs[dynamicRecommendation(STATE.dynamicMetricA)] || defs.uf;
    DOM.dynamicSuggestion.innerHTML = `Sugestão Monitor IA: combine <strong>${escapeHtml(defs[STATE.dynamicMetricA].label)}</strong> com <strong>${escapeHtml(rec.label)}</strong> para uma leitura mais útil.`;
  }
}

function renderDynamicInfo(rows) {
  if (!DOM.dynamicInfoChart || !DOM.dynamicInfoInsights) return;
  const defs = getDynamicDimensionDefinitions();
  const keyA = defs[STATE.dynamicMetricA] ? STATE.dynamicMetricA : 'status';
  let keyB = defs[STATE.dynamicMetricB] ? STATE.dynamicMetricB : 'uf';
  if (keyA === keyB) keyB = keyA === 'status' ? 'uf' : 'status';
  STATE.dynamicMetricA = keyA; STATE.dynamicMetricB = keyB;
  const dimA = { ...defs[keyA], key: keyA }, dimB = { ...defs[keyB], key: keyB };
  renderDynamicTypeButtons();
  const matrix = buildDynamicMatrix(rows, dimA, dimB);
  DOM.dynamicInfoChart.innerHTML = dynamicChartHtml(matrix, dimA, dimB);
  renderDynamicFilterChips(matrix, dimA, dimB);
  renderInsights('dynamicInfoInsights', buildDynamicInsights(matrix, dimA, dimB, rows));
}
function buildDynamicMatrix(rows, dimA, dimB) {
  const groups = {};
  rows.forEach((row) => {
    const a = simplifyDescription(dimA.getter(row)) || 'Sem informação';
    const b = simplifyDescription(dimB.getter(row)) || 'Sem informação';
    if (!groups[a]) groups[a] = { total: 0, values: {} };
    groups[a].total += 1;
    groups[a].values[b] = (groups[a].values[b] || 0) + 1;
  });
  const hiddenA = STATE.dynamicFiltersA || new Set();
  const hiddenB = STATE.dynamicFiltersB || new Set();
  const sortRows = (entries, dim) => entries.sort((a, b) => dim.sort ? dim.sort(a[0], b[0]) : (b[1].total || 0) - (a[1].total || 0));
  const sortColumns = (entries, dim) => entries.sort((a, b) => dim.sort ? dim.sort(a[0], b[0]) : (b[1] || 0) - (a[1] || 0));
  const allRows = sortRows(Object.entries(groups), dimA).map(([label, item]) => ({ label, total: item.total, values: item.values }));
  const bTotals = {};
  allRows.forEach((item) => Object.entries(item.values).forEach(([label, value]) => { bTotals[label] = (bTotals[label] || 0) + value; }));
  const allColumns = sortColumns(Object.entries(bTotals), dimB).map(([label]) => label);
  const visibleRows = allRows.filter((row) => !hiddenA.has(row.label));
  const visibleColumns = allColumns.filter((label) => !hiddenB.has(label));
  return { rows: visibleRows, columns: visibleColumns, allRows, allColumns };
}
function renderDynamicFilterChips(matrix, dimA, dimB) {
  if (!DOM.dynamicFilterChips) return;
  const chipGroup = (axis, title, labels, hidden) => `<div class="dynamic-chip-group"><strong>${escapeHtml(title)}</strong>${labels.map((label) => `<button type="button" class="dynamic-filter-chip ${hidden.has(label) ? '' : 'active'}" data-action="dynamicQuickFilter" data-axis="${axis}" data-value="${escapeHtml(label)}">${escapeHtml(truncate(label, 24))}</button>`).join('')}</div>`;
  DOM.dynamicFilterChips.innerHTML = chipGroup('a', dimA.label, matrix.allRows.map((row) => row.label), STATE.dynamicFiltersA) + chipGroup('b', dimB.label, matrix.allColumns, STATE.dynamicFiltersB);
}

function dynamicChartHtml(matrix, dimA, dimB) {
  if (STATE.dynamicChartType === 'matrix') return dynamicMatrixHtml(matrix, dimA, dimB);
  if (STATE.dynamicChartType === 'ranking') return dynamicRankingHtml(matrix, dimA, dimB);
  return dynamicBarsHtml(matrix, dimA, dimB);
}
function dynamicBarsHtml(matrix, dimA, dimB) {
  if (!matrix.rows.length || !matrix.columns.length) return emptyState('Sem dados para cruzar as informações selecionadas. Reative botões do filtro rápido.');
  const max = Math.max(1, ...matrix.rows.map((row) => row.total));
  return `<div class="dynamic-cross-bars" role="list" aria-label="Gráfico cruzado ${escapeHtml(dimA.label)} por ${escapeHtml(dimB.label)}">${matrix.rows.map((row, rowIndex) => {
    const rowWidth = Math.max(8, Math.round((row.total / max) * 100));
    const visibleValues = matrix.columns.map((column) => ({ column, value: row.values[column] || 0 })).filter((item) => item.value > 0);
    const summary = `<strong>${escapeHtml(row.label)}</strong><br>${formatInteger(row.total)} registro(s)<br>${visibleValues.map((item) => `${escapeHtml(item.column)}: ${formatInteger(item.value)}`).join('<br>')}<br><small>Contabilização: ${escapeHtml(dimA.measure)} cruzado com ${escapeHtml(dimB.measure)}</small>`;
    const segments = visibleValues.map((item, index) => {
      const pct = row.total ? Math.max(5, (item.value / row.total) * 100) : 0;
      const label = `${item.column}: ${formatInteger(item.value)}`;
      const detailSummary = `<strong>${escapeHtml(row.label)} x ${escapeHtml(item.column)}</strong><br>${formatInteger(item.value)} registro(s)<br><small>${Math.round((item.value / row.total) * 100)}% da linha ${escapeHtml(row.label)}</small><br><small>Contabilização: ${escapeHtml(dimA.measure)} cruzado com ${escapeHtml(dimB.measure)}</small>`;
      return `<button type="button" class="dynamic-cross-segment" style="width:${pct.toFixed(2)}%;background:${chartColor(item.column, index)}" data-action="chartPreview" data-value="${escapeHtml(`dynamic:${dimA.key}:${row.label}|||${dimB.key}:${item.column}`)}" data-summary="${escapeHtml(detailSummary)}" aria-label="${escapeHtml(row.label)} x ${escapeHtml(label)}"><b>${formatInteger(item.value)}</b></button>`;
    }).join('');
    const chips = visibleValues.map((item, index) => `<button type="button" class="dynamic-cross-chip" data-action="chartPreview" data-value="${escapeHtml(`dynamic:${dimA.key}:${row.label}|||${dimB.key}:${item.column}`)}" data-summary="${escapeHtml(`<strong>${row.label} x ${item.column}</strong><br>${formatInteger(item.value)} registro(s)<br><small>Clique para abrir a prévia resumida.</small>`)}"><i style="background:${chartColor(item.column, index)}"></i><span>${escapeHtml(truncate(item.column, 28))}</span><b>${formatInteger(item.value)}</b></button>`).join('');
    return `<article class="dynamic-cross-row" role="listitem" data-summary="${escapeHtml(summary)}"><div class="dynamic-cross-head"><strong>${escapeHtml(truncate(row.label, 36))}</strong><span>${formatInteger(row.total)} registro(s)</span></div><div class="dynamic-cross-track" style="--roww:${rowWidth}%">${segments}</div><div class="dynamic-cross-values">${chips}</div></article>`;
  }).join('')}</div><div class="dynamic-legend dynamic-cross-legend">${matrix.columns.map((column, index) => `<span><i style="background:${chartColor(column, index)}"></i>${escapeHtml(truncate(column, 24))}</span>`).join('')}</div>`;
}
function dynamicRankingHtml(matrix, dimA, dimB) {
  const pairs = [];
  matrix.rows.forEach((row) => matrix.columns.forEach((column) => {
    const value = row.values[column] || 0;
    if (value) pairs.push({ a: row.label, b: column, value });
  }));
  pairs.sort((a, b) => b.value - a.value || compareValues(a.a, b.a) || compareValues(a.b, b.b));
  if (!pairs.length) return emptyState('Sem combinações para o ranking atual.');
  const max = Math.max(1, ...pairs.map((item) => item.value));
  return `<div class="dynamic-ranking-chart dynamic-ranking-full">${pairs.map((item, index) => {
    const width = Math.max(5, Math.round((item.value / max) * 100));
    const summary = `<strong>${escapeHtml(item.a)} x ${escapeHtml(item.b)}</strong><br>${formatInteger(item.value)} registro(s)<br><small>Contabilização: ${escapeHtml(dimA.measure)} cruzado com ${escapeHtml(dimB.measure)}</small>`;
    return `<div class="dynamic-ranking-row" data-action="chartPreview" data-value="${escapeHtml(`dynamic:${dimA.key}:${item.a}|||${dimB.key}:${item.b}`)}" data-summary="${escapeHtml(summary)}"><span title="${escapeHtml(item.a)}">${escapeHtml(truncate(item.a, 24))}</span><small title="${escapeHtml(item.b)}">${escapeHtml(truncate(item.b, 24))}</small><i><em style="width:${width}%; background:${chartColor(item.b, index)}"></em><b>${formatInteger(item.value)}</b></i></div>`;
  }).join('')}</div>`;
}

function dynamicMatrixHtml(matrix, dimA, dimB) {
  if (!matrix.rows.length || !matrix.columns.length) return emptyState('Sem dados para cruzar as informações selecionadas. Reative botões do filtro rápido.');
  const max = Math.max(1, ...matrix.rows.map((row) => row.total));
  return `<div class="dynamic-matrix dynamic-matrix-full"><div class="dynamic-matrix-head"><span>${escapeHtml(dimA.label)}</span><span>${escapeHtml(dimB.label)}</span><b>Total</b></div>${matrix.rows.map((row) => {
    const segments = matrix.columns.map((column, index) => {
      const value = row.values[column] || 0;
      const pct = row.total ? Math.round((value / row.total) * 100) : 0;
      const summary = `<strong>${escapeHtml(row.label)} x ${escapeHtml(column)}</strong><br>${formatInteger(value)} registro(s)<br><small>${pct}% da linha ${escapeHtml(row.label)}</small><br><small>Contabilização: ${escapeHtml(dimA.measure)} Cruzado com: ${escapeHtml(dimB.measure)}</small><br><small>Clique para abrir a prévia resumida.</small>`;
      return `<span style="width:${Math.max(value ? 6 : 0, pct)}%; background:${chartColor(column, index)}" data-action="chartPreview" data-value="${escapeHtml(`dynamic:${dimA.key}:${row.label}|||${dimB.key}:${column}`)}" data-summary="${escapeHtml(summary)}">${value ? `<b>${formatInteger(value)}</b>` : ''}</span>`;
    }).join('');
    return `<div class="dynamic-matrix-row" data-action="chartPreview" data-value="${escapeHtml(`dynamic:${dimA.key}:${row.label}`)}" data-summary="${escapeHtml(`<strong>${row.label}</strong><br>${formatInteger(row.total)} registro(s)<br><small>Contabilização: ${dimA.measure}</small><br><small>Clique para abrir a prévia resumida.</small>`)}"><strong>${escapeHtml(truncate(row.label, 30))}</strong><div class="dynamic-stack" style="--w:${Math.max(6, Math.round((row.total / max) * 100))}%">${segments}</div><b>${formatInteger(row.total)}</b></div>`;
  }).join('')}<div class="dynamic-legend">${matrix.columns.map((column, index) => `<span><i style="background:${chartColor(column, index)}"></i>${escapeHtml(truncate(column, 24))}</span>`).join('')}</div></div>`;
}
function buildDynamicInsights(matrix, dimA, dimB, rows) {
  if (!matrix.rows.length) return [{ type: 'info', icon: '◇', text: 'Selecione duas informações para gerar o cruzamento dinâmico.' }];
  let topPair = null;
  matrix.rows.forEach((row) => Object.entries(row.values).forEach(([column, value]) => { if (matrix.columns.includes(column) && (!topPair || value > topPair.value)) topPair = { a: row.label, b: column, value }; }));
  const total = rows.length || 1;
  const leader = matrix.rows[0];
  return [
    { type: 'info', icon: '◇', text: `Cruzamento ativo: ${dimA.label} x ${dimB.label}, usando ${formatInteger(rows.length)} registro(s) filtrados.` },
    { type: 'warn', icon: '🔎', text: `Maior combinação visível: ${topPair ? `${topPair.a} + ${topPair.b} (${formatInteger(topPair.value)})` : 'sem dados'}.` },
    { type: 'success', icon: '↔', text: `${leader.label} concentra ${percent(leader.total, total)} da seleção para ${dimA.label}. Use os chips para ocultar/exibir categorias.` }
  ];
}

function reportBarBlock(title, entries) {
  if (!entries.length) return `<div class="report-block"><h4>${escapeHtml(title)}</h4><p>Sem dados nos filtros.</p></div>`;
  const max = Math.max(...entries.map(([, value]) => value), 1);
  return `<div class="report-block"><h4>${escapeHtml(title)}</h4>${entries.map(([label, value]) => `<div class="report-bar" data-action="chartPreview" data-value="${escapeHtml(`report:${title}|||${label}`)}" data-summary="${escapeHtml(`<strong>${label}</strong><br>${formatInteger(value)} registro(s)<br><small>Contabilização: dados agregados do bloco ${title}.</small><br><small>Clique para abrir a prévia resumida.</small>`)}"><span>${escapeHtml(label)}</span><i><em style="width:${Math.max(4, Math.round(value / max * 100))}%"></em></i><b>${formatInteger(value)}</b></div>`).join('')}</div>`;
}
function reportScheduleBlock(rows) {
  const today = new Date();
  const scheduled = rows.filter((row) => { const d = row.agendaDate || row.previsaoEntregaDate; return d && isBetweenDays(d, today, addDays(today, 2)); }).sort((a,b)=>(a.agendaDate||a.previsaoEntregaDate)-(b.agendaDate||b.previsaoEntregaDate)).slice(0,8);
  return `<div class="report-block"><h4>Agendas hoje e D+2</h4>${scheduled.length ? scheduled.map((row) => `<div class="report-schedule" data-open-record="${escapeHtml(row.id)}"><b>${escapeHtml(formatDate(row.agendaDate || row.previsaoEntregaDate))}</b><span>${escapeHtml(row.of || row.notaFiscal || '-')} • ${escapeHtml(row.uf || '-')}</span><small>${escapeHtml(truncate(row.cliente || '-', 38))}</small></div>`).join('') : '<p>Sem agendas próximas.</p>'}</div>`;
}
function renderMap() {
  const mapRows = getMapRows();
  const selected = STATE.selectedRegion;
  const selectedUf = STATE.selectedMapUf || '';
  const selectedCity = STATE.selectedMapCity || '';
  const selectedCityUf = STATE.selectedMapCityUf || selectedUf;
  const regionRows = selected === 'all' ? mapRows : mapRows.filter((row) => row.region === selected);
  let panelRows = selectedUf ? regionRows.filter((row) => row.uf === selectedUf) : regionRows;
  if (selectedCity) panelRows = panelRows.filter((row) => sameCity(row.cidade, selectedCity) && (!selectedCityUf || selectedCityUf === 'Sem UF' || row.uf === selectedCityUf));
  const panelMetric = computeRegionMetrics(panelRows);
  const scopeLabel = selectedCity ? `${selectedCity}${selectedCityUf ? ` / ${selectedCityUf}` : ''}` : selectedUf ? `${selectedUf} • ${selected || CONFIG.regionByUf[selectedUf] || 'Região'}` : selected === 'all' ? 'Brasil' : selected;
  const statusLabel = selectedMapStatusLabel();
  const cityCount = getCityMapEntries(panelRows).length;

  setText('mapFocusTitle', selectedCity ? `Cidade filtrada • ${selectedCity}` : selectedUf ? `Mapa da UF • ${selectedUf}` : selected === 'all' ? 'Mapa operacional do Brasil' : `Mapa regional • ${selected}`);
  setText('mapFocusSub', selectedCity
    ? `${formatInteger(panelRows.length)} registros para ${selectedCity}${selectedCityUf ? ` / ${selectedCityUf}` : ''}; dê dois cliques no card para abrir os detalhes completos.`
    : selectedUf
      ? `${formatInteger(panelRows.length)} registros em ${selectedUf}; cidades e observações aparecem por relevância.`
      : selected === 'all'
        ? `${formatInteger(panelRows.length)} registros no filtro ${statusLabel}. Clique em um estado para aproximar a região e abrir as cidades com dados.`
        : `${formatInteger(panelRows.length)} registros em ${selected}; clique em uma UF para aproximar novamente e abrir o mapa da UF.`);
  setText('mapScopeBadge', `${scopeLabel} • ${statusLabel}`);

  renderHeatmapBrazil(mapRows, selected, selectedUf);
  document.getElementById('regionPanelTitle').textContent = selectedCity ? `Informações de ${selectedCity}` : selectedUf ? `Informações da UF ${selectedUf}` : selected === 'all' ? 'Informações do Brasil' : `Informações de ${selected}`;
  document.getElementById('regionPanelSub').textContent = selectedCity
    ? `${formatInteger(panelRows.length)} registros da cidade no mapa (${statusLabel}). Passe o mouse nos cards para mini gráfico; dois cliques abrem detalhes.`
    : selectedUf
      ? `${formatInteger(panelRows.length)} registros na UF (${statusLabel}); cidades priorizadas por volume, atraso, ocorrência e observação.`
      : selected === 'all'
        ? `${formatInteger(panelRows.length)} registros no mapa filtrado (${statusLabel}).`
        : `${formatInteger(panelRows.length)} registros filtrados; detalhes abaixo acompanham cidades, estados e status do mapa.`;
  renderRegionSummary(panelMetric);
  renderMapStateBreakdown(panelRows, selected, selectedUf);
  renderMapCityBreakdown(panelRows, selected, selectedUf, selectedCity);
  renderInsights('mapAiAlerts', buildMapAlerts(panelRows, selectedUf || selected));
  renderRecordsTable('mapTable', panelRows, { limit: 300, empty: 'Nenhum registro para a região/UF/status selecionado.' });
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

function renderHeatmapBrazil(rows, selected, selectedUf = '') {
  const visibleRows = selected === 'all' ? rows : rows.filter((row) => row.region === selected);
  const ufRows = selectedUf ? visibleRows.filter((row) => row.uf === selectedUf) : visibleRows;
  if (STATE.brazilGeoJson) {
    if (selectedUf) renderGeoUf(ufRows, selectedUf, selected || CONFIG.regionByUf[selectedUf] || '');
    else if (selected !== 'all') renderGeoRegion(visibleRows, selected);
    else renderGeoBrazil(rows, selected);
    return;
  }
  renderSimplifiedBrazil(ufRows, selectedUf ? CONFIG.regionByUf[selectedUf] || selected : selected);
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
function resetMapView() {
  cancelMapSingleClick();
  STATE.selectedRegion = 'all';
  STATE.selectedMapUf = '';
  STATE.selectedMapCity = '';
  STATE.selectedMapCityUf = '';
  if (DOM.mapRegionFilter) DOM.mapRegionFilter.value = 'all';
  resetMapZoom();
  renderMap();
}
function applyMapZoom() {
  if (!DOM.brazilMap) return;
  DOM.brazilMap.style.transform = `translate(${STATE.mapPanX}px, ${STATE.mapPanY}px) scale(${STATE.mapZoom})`;
  DOM.brazilMap.style.cursor = STATE.mapZoom > 1 ? 'grab' : 'zoom-in';
  if (DOM.mapZoomLevel) DOM.mapZoomLevel.textContent = `${Math.round(STATE.mapZoom * 100)}%`;
}
function openRegionFromMap(region, uf = '') {
  if (!region || region === 'Sem região') return;
  hideTooltip();
  if (STATE.mapTransitionTimer) window.clearTimeout(STATE.mapTransitionTimer);
  const map = DOM.brazilMap;
  if (map) {
    map.dataset.openingUf = uf || '';
    map.classList.remove('map-region-opening');
    void map.offsetWidth;
    map.classList.add('map-region-opening');
  }
  STATE.mapTransitionTimer = window.setTimeout(() => {
    STATE.selectedRegion = region;
    STATE.selectedMapUf = '';
    STATE.selectedMapCity = '';
    STATE.selectedMapCityUf = '';
    DOM.mapRegionFilter.value = region;
    resetMapZoom();
    if (map) map.classList.remove('map-region-opening');
    renderMap();
  }, 320);
}
function openUfFromMap(uf) {
  if (!uf) return;
  const region = CONFIG.regionByUf[uf] || STATE.selectedRegion || 'all';
  hideTooltip();
  if (STATE.mapTransitionTimer) window.clearTimeout(STATE.mapTransitionTimer);
  const map = DOM.brazilMap;
  if (map) {
    map.dataset.openingUf = uf;
    map.classList.remove('map-region-opening', 'map-uf-opening');
    void map.offsetWidth;
    map.classList.add('map-uf-opening');
  }
  STATE.mapTransitionTimer = window.setTimeout(() => {
    STATE.selectedRegion = region;
    STATE.selectedMapUf = uf;
    STATE.selectedMapCity = '';
    STATE.selectedMapCityUf = '';
    if (DOM.mapRegionFilter) DOM.mapRegionFilter.value = region;
    resetMapZoom();
    if (map) map.classList.remove('map-uf-opening');
    renderMap();
  }, 340);
}
function stateLabelPoint(uf, geometry, bounds) {
  const coord = UF_GEO_LABELS[uf];
  if (coord) return projectGeo(coord, bounds);
  return featureCentroid(geometry, bounds);
}

function renderGeoBrazil(rows, selected) {
  const features = STATE.brazilGeoJson.features || [];
  const ufGroups = groupBy(rows.filter((row) => row.uf), (row) => row.uf);
  const maxUf = Math.max(1, ...Object.values(ufGroups).map((items) => items.length));
  const paths = [];
  const spots = [];
  const stateLabels = [];
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
    const center = stateLabelPoint(uf, feature.geometry, bounds);
    stateLabels.push(`<text class="geo-state-label ${STATE.filters.uf === uf ? 'active' : ''}" x="${center.x.toFixed(1)}" y="${center.y.toFixed(1)}" text-anchor="middle">${uf}</text>`);
    if (items.length) {
      const weight = items.length + metric.delayed * 1.6 + metric.occurrences * 1.25 + metric.returns * 1.25;
      const radius = Math.min(34, 8 + Math.sqrt(weight / maxUf) * 30);
      spots.push(`<g class="heat-spot geo-heat" data-uf="${uf}" data-region="${region}" transform="translate(${center.x.toFixed(1)} ${center.y.toFixed(1)})"><circle r="${radius}" fill="#00d68f" opacity="0.25"></circle><circle r="${radius * 0.62}" fill="#48ff9b" opacity="0.38"></circle><circle r="${radius * 0.34}" fill="#06141f" opacity="0.62"></circle><text y="4" class="heat-label" text-anchor="middle">${formatCompact(items.length)}</text></g>`);
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
      <g class="geo-state-labels">${stateLabels.join('')}</g>
      <g class="heat-legend" transform="translate(414 528)"><rect width="186" height="42" rx="12" fill="rgba(255,255,255,.86)"></rect><circle cx="20" cy="21" r="10" fill="#00d68f" opacity=".45"></circle><circle cx="48" cy="21" r="10" fill="#48ff9b" opacity=".55"></circle><circle cx="76" cy="21" r="10" fill="#06141f" opacity=".7"></circle><text x="98" y="18">Mapa de calor</text><text x="98" y="32">volume e criticidade</text></g>
    </svg>`;
  const map = document.getElementById('brazilMap');
  map.querySelectorAll('.br-state').forEach((path) => {
    path.addEventListener('mousemove', (event) => {
      const uf = path.dataset.uf;
      showUfTooltip(event, uf, rows.filter((row) => row.uf === uf));
    });
    path.addEventListener('mouseleave', hideTooltip);
    path.addEventListener('click', () => scheduleMapSingleClick(() => openRegionFromMap(path.dataset.region || CONFIG.regionByUf[path.dataset.uf] || 'all', path.dataset.uf)));
    path.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('state', path.dataset.uf || ''); });
  });
  map.querySelectorAll('.heat-spot').forEach((spot) => {
    const uf = spot.dataset.uf;
    spot.addEventListener('mousemove', (event) => showUfTooltip(event, uf, rows.filter((row) => row.uf === uf)));
    spot.addEventListener('mouseleave', hideTooltip);
    spot.addEventListener('click', () => scheduleMapSingleClick(() => openRegionFromMap(CONFIG.regionByUf[uf] || 'all', uf)));
    spot.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('state', uf); });
  });
  applyMapZoom();
}

function renderGeoRegion(rows, selected) {
  const allFeatures = STATE.brazilGeoJson.features || [];
  const features = allFeatures.filter((feature) => CONFIG.regionByUf[getFeatureUf(feature)] === selected);
  if (!features.length) { renderGeoBrazil(rows, selected); return; }
  const ufGroups = groupBy(rows.filter((row) => row.uf), (row) => row.uf);
  const maxUf = Math.max(1, ...Object.values(ufGroups).map((items) => items.length));
  const cityEntries = getCityMapEntries(rows).slice(0, 30);
  const maxCity = Math.max(1, ...cityEntries.map((entry) => entry.rows.length));
  const bounds = getGeoBounds(features);
  const paths = [];
  const labels = [];
  const stateCenters = {};
  features.forEach((feature) => {
    const uf = getFeatureUf(feature);
    if (!uf) return;
    const items = ufGroups[uf] || [];
    const metric = computeRegionMetrics(items);
    const path = geometryToSvgPath(feature.geometry, bounds);
    const active = STATE.filters.uf === uf;
    const fill = stateColor(selected, active, items.length, maxUf);
    const center = stateLabelPoint(uf, feature.geometry, bounds);
    stateCenters[uf] = center;
    paths.push(`<path class="br-state map-region ${active ? 'active' : ''}" data-uf="${uf}" data-region="${selected}" d="${path}" fill="${fill}" data-summary="${escapeHtml(`<strong>${uf} • ${selected}</strong><br>${formatInteger(items.length)} registros no estado<br>${formatInteger(metric.transit)} em trânsito • ${formatInteger(metric.delayed)} atrasos<br>${formatInteger(metric.occurrences)} ocorrências • ${formatInteger(metric.returns)} devoluções<br><small>Contabilização: UF do estado e filtros atuais do mapa.</small>`)}"></path>`);
    labels.push(`<text class="state-focus-label" x="${center.x.toFixed(1)}" y="${center.y.toFixed(1)}" text-anchor="middle">${uf}</text>`);
  });
  const citySpots = cityEntries.map((entry, index) => {
    const metric = computeRegionMetrics(entry.rows);
    const point = cityPointForRegion(entry, stateCenters, index);
    const weight = entry.rows.length + metric.delayed * 1.8 + metric.occurrences * 1.25 + metric.returns * 1.2;
    const radius = Math.min(30, 7 + Math.sqrt(weight / maxCity) * 20);
    const delayedClass = metric.delayed ? 'has-delay' : '';
    const label = truncate(entry.city, 14);
    const labelText = index < 12 ? `<text y="${(-radius - 6).toFixed(1)}" class="city-bubble-label" text-anchor="middle">${escapeHtml(label)}</text>` : '';
    return `<g class="map-city-spot ${delayedClass}" data-city="${escapeHtml(entry.city)}" data-uf="${escapeHtml(entry.uf)}" transform="translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})">
      <circle r="${(radius + 7).toFixed(1)}" class="city-pulse"></circle>
      <circle r="${radius.toFixed(1)}" class="city-volume"></circle>
      <circle r="${Math.max(4, radius * .42).toFixed(1)}" class="city-core"></circle>
      <text y="4" class="city-count" text-anchor="middle">${formatCompact(entry.rows.length)}</text>
      ${labelText}
    </g>`;
  }).join('');
  const cityCards = cityEntries.slice(0, 6).map((entry) => {
    const metric = computeRegionMetrics(entry.rows);
    return `<button type="button" class="city-svg-detail" data-city="${escapeHtml(entry.city)}" data-uf="${escapeHtml(entry.uf)}"><b>${escapeHtml(entry.city)}</b>${escapeHtml(entry.uf)} • ${formatInteger(entry.rows.length)} reg. • ${formatInteger(metric.delayed)} atraso(s)</button>`;
  }).join('');
  document.getElementById('brazilMap').innerHTML = `
    <svg viewBox="0 0 620 590" role="img" aria-label="Mapa ampliado da região ${escapeHtml(selected)} por cidades">
      <defs>
        <linearGradient id="regionSea" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e8f5f8"/><stop offset="1" stop-color="#f7fbfc"/></linearGradient>
        <filter id="regionShadow"><feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#03121c" flood-opacity=".20"/></filter>
      </defs>
      <rect x="0" y="0" width="620" height="590" fill="url(#regionSea)" rx="22"></rect>
      <g class="region-focus-bg"><path d="M38 118 C137 68 223 82 314 139 C411 200 495 175 592 112"></path><path d="M20 396 C130 330 244 336 350 395 C448 450 521 405 604 360"></path></g>
      <g class="region-focus-map" filter="url(#regionShadow)">${paths.join('')}</g>
      <g class="state-focus-labels">${labels.join('')}</g>
      <g class="city-heat-layer">${citySpots}</g>
      <g class="region-focus-title" transform="translate(24 28)"><rect width="304" height="62" rx="16" fill="rgba(255,255,255,.87)"></rect><text x="16" y="24">${escapeHtml(selected)}</text><text x="16" y="44">Mapa regional com cidades da seleção</text></g>
      <g class="city-legend" transform="translate(394 28)"><rect width="198" height="54" rx="16" fill="rgba(255,255,255,.87)"></rect><circle cx="20" cy="27" r="10" class="city-volume"></circle><circle cx="54" cy="27" r="10" class="city-volume delay"></circle><text x="74" y="23">Cidades</text><text x="74" y="38">volume e criticidade</text></g>
      <foreignObject x="310" y="496" width="292" height="78"><div xmlns="http://www.w3.org/1999/xhtml" class="region-svg-cards city-svg-cards">${cityCards || '<span><b>Sem cidades</b> ajuste filtros para visualizar.</span>'}</div></foreignObject>
    </svg>`;
  const map = document.getElementById('brazilMap');
  map.querySelectorAll('.br-state').forEach((node) => {
    const uf = node.dataset.uf;
    const ufRows = rows.filter((row) => row.uf === uf);
    node.addEventListener('mousemove', (event) => showUfTooltip(event, uf, ufRows));
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('click', () => scheduleMapSingleClick(() => openUfFromMap(uf)));
    node.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('state', uf); });
  });
  map.querySelectorAll('.map-city-spot').forEach((node) => {
    const city = node.dataset.city || '';
    const uf = node.dataset.uf || '';
    const cityRows = rows.filter((row) => sameCity(row.cidade, city) && (!uf || row.uf === uf));
    node.addEventListener('mousemove', (event) => showCityTooltip(event, city, uf, cityRows));
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('click', () => scheduleMapSingleClick(() => focusMapCity(city, uf)));
    node.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('city', city, uf); });
  });
  map.querySelectorAll('.city-svg-detail').forEach((button) => {
    button.addEventListener('click', () => scheduleMapSingleClick(() => focusMapCity(button.dataset.city || '', button.dataset.uf || '')));
    button.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('city', button.dataset.city || '', button.dataset.uf || ''); });
  });
  applyMapZoom();
}

function renderGeoUf(rows, uf, region) {
  const allFeatures = STATE.brazilGeoJson.features || [];
  const feature = allFeatures.find((item) => getFeatureUf(item) === uf);
  if (!feature) { renderGeoRegion(rows, region || CONFIG.regionByUf[uf] || ''); return; }
  const metric = computeRegionMetrics(rows);
  const cityEntries = getCityMapEntries(rows).slice(0, 36);
  const maxCity = Math.max(1, ...cityEntries.map((entry) => entry.rows.length));
  const bounds = getGeoBounds([feature]);
  const path = geometryToSvgPath(feature.geometry, bounds);
  const center = stateLabelPoint(uf, feature.geometry, bounds);
  const citySpots = cityEntries.map((entry, index) => {
    const entryMetric = computeRegionMetrics(entry.rows);
    const point = cityPointForUf(entry, center, index);
    const weight = cityRelevanceScore(entry.rows);
    const radius = Math.min(34, 8 + Math.sqrt(weight / Math.max(1, cityRelevanceScore(cityEntries[0]?.rows || []))) * 25);
    const delayedClass = entryMetric.delayed || entryMetric.occurrences || entryMetric.returns ? 'has-delay' : '';
    const label = index < 14 ? `<text y="${(-radius - 7).toFixed(1)}" class="city-bubble-label" text-anchor="middle">${escapeHtml(truncate(entry.city, 16))}</text>` : '';
    return `<g class="map-city-spot ${delayedClass}" data-city="${escapeHtml(entry.city)}" data-uf="${escapeHtml(entry.uf)}" transform="translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})">
      <circle r="${(radius + 8).toFixed(1)}" class="city-pulse"></circle>
      <circle r="${radius.toFixed(1)}" class="city-volume"></circle>
      <circle r="${Math.max(4, radius * .42).toFixed(1)}" class="city-core"></circle>
      <text y="4" class="city-count" text-anchor="middle">${formatCompact(entry.rows.length)}</text>
      ${label}
    </g>`;
  }).join('');
  const observationCards = cityEntries.slice(0, 6).map((entry, index) => {
    const entryMetric = computeRegionMetrics(entry.rows);
    const detail = `city|||${entry.city}|||${entry.uf}`;
    return `<button type="button" class="uf-observation-card" data-map-detail="${escapeHtml(detail)}" data-action="mapGroup" data-value="city|||${escapeHtml(entry.city)}|||${escapeHtml(entry.uf)}" data-summary="${escapeHtml(mapMiniChartHtml(`${entry.city} / ${entry.uf}`, entry.rows, cityRelevanceObservation(entry.rows)))}"><b>${index + 1}. ${escapeHtml(entry.city)}</b><span>${formatInteger(entry.rows.length)} reg. • ${formatInteger(entryMetric.delayed)} atraso(s) • ${formatInteger(entryMetric.occurrences)} ocorr.</span><small>${escapeHtml(cityRelevanceObservation(entry.rows))}</small></button>`;
  }).join('');
  document.getElementById('brazilMap').innerHTML = `
    <svg viewBox="0 0 620 590" role="img" aria-label="Mapa da UF ${escapeHtml(uf)} com cidades relevantes">
      <defs>
        <linearGradient id="ufSea" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e8f5f8"/><stop offset="1" stop-color="#f7fbfc"/></linearGradient>
        <filter id="ufShadow"><feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#03121c" flood-opacity=".20"/></filter>
      </defs>
      <rect x="0" y="0" width="620" height="590" fill="url(#ufSea)" rx="22"></rect>
      <g class="region-focus-bg"><path d="M34 128 C148 74 246 91 337 145 C427 199 508 175 596 120"></path><path d="M18 404 C132 331 255 340 366 397 C461 446 526 412 604 365"></path></g>
      <g class="uf-focus-map" filter="url(#ufShadow)"><path class="br-state map-region active" data-uf="${escapeHtml(uf)}" data-region="${escapeHtml(region || CONFIG.regionByUf[uf] || '')}" d="${path}" fill="${stateColor(region || CONFIG.regionByUf[uf] || '', true, rows.length, Math.max(1, rows.length))}"></path></g>
      <g class="state-focus-labels"><text class="state-focus-label active uf-focus-label" x="${center.x.toFixed(1)}" y="${center.y.toFixed(1)}" text-anchor="middle">${escapeHtml(uf)}</text></g>
      <g class="city-heat-layer">${citySpots}</g>
      <g class="region-focus-title" transform="translate(24 28)"><rect width="318" height="66" rx="16" fill="rgba(255,255,255,.88)"></rect><text x="16" y="24">UF ${escapeHtml(uf)}</text><text x="16" y="44">${formatInteger(rows.length)} registros • cidades por relevância</text></g>
      <g class="city-legend" transform="translate(390 28)"><rect width="206" height="58" rx="16" fill="rgba(255,255,255,.88)"></rect><circle cx="20" cy="29" r="10" class="city-volume"></circle><circle cx="54" cy="29" r="10" class="city-volume delay"></circle><text x="76" y="24">Cidades da UF</text><text x="76" y="40">volume + criticidade</text></g>
      <foreignObject x="318" y="390" width="284" height="184"><div xmlns="http://www.w3.org/1999/xhtml" class="uf-observation-list">${observationCards || '<span class="empty-state">Sem cidades com dados nesta UF.</span>'}</div></foreignObject>
    </svg>`;
  const map = document.getElementById('brazilMap');
  map.querySelectorAll('.map-city-spot').forEach((node) => {
    const city = node.dataset.city || '';
    const cityUf = node.dataset.uf || uf;
    const cityRows = rows.filter((row) => sameCity(row.cidade, city) && row.uf === cityUf);
    node.addEventListener('mousemove', (event) => showCityTooltip(event, city, cityUf, cityRows));
    node.addEventListener('mouseleave', hideTooltip);
    node.addEventListener('click', () => scheduleMapSingleClick(() => focusMapCity(city, cityUf)));
    node.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('city', city, cityUf); });
  });
  map.querySelectorAll('.uf-observation-card').forEach((button) => {
    const [, city = '', cityUf = ''] = String(button.dataset.mapDetail || '').split('|||');
    button.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('city', city, cityUf); });
  });
  applyMapZoom();
}

function cityPointForUf(entry, center, index) {
  const seed = hashString(`${entry.city}|${entry.uf}|uf`);
  const angle = ((seed % 360) * Math.PI) / 180;
  const ring = Math.floor(index / 6);
  const radius = 24 + (seed % 58) + ring * 22;
  const x = Math.min(585, Math.max(36, center.x + Math.cos(angle) * radius));
  const y = Math.min(552, Math.max(54, center.y + Math.sin(angle) * radius));
  return { x, y };
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
  const allUfLabels = Object.entries(UF_MAP_POINTS).map(([uf, point]) => `<text class="geo-state-label simplified-state-label" x="${point.x}" y="${point.y}" text-anchor="middle">${uf}</text>`).join('');
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
      <g class="geo-state-labels simplified-state-labels">${allUfLabels}</g>
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
    path.addEventListener('click', () => scheduleMapSingleClick(() => openRegionFromMap(path.dataset.region || 'all')));
    path.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('region', path.dataset.region || 'all'); });
  });
  map.querySelectorAll('.heat-spot').forEach((spot) => {
    const uf = spot.dataset.uf;
    const ufRows = rows.filter((row) => row.uf === uf);
    spot.addEventListener('mousemove', (event) => showUfTooltip(event, uf, ufRows));
    spot.addEventListener('mouseleave', hideTooltip);
    spot.addEventListener('click', () => scheduleMapSingleClick(() => openRegionFromMap(CONFIG.regionByUf[uf] || 'all', uf)));
    spot.addEventListener('dblclick', (event) => { event.preventDefault(); openMapGroupDetail('state', uf); });
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
  return `<svg viewBox="0 0 220 132" class="speedometer-svg" aria-label="${safeRate}%" data-summary="${escapeHtml(`<strong>${safeRate.toFixed(1)}%</strong><br><small>Contabilização: percentual calculado sobre entregas/pendências do mapa conforme status e ONTIME.</small>`)}">
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
    const label = `${String(month.getMonth() + 1).padStart(2, '0')}/${String(month.getFullYear()).slice(-2)}`;
    const summary = `<strong>${label}</strong><br>${rate.toFixed(1)}% performance<br>${formatInteger(eligible.length)} registro(s) elegíveis<br><small>Contabilização: data de referência mensal e regra ONTIME do mapa.</small>`;
    return `<div class="map-evolution-item" data-summary="${escapeHtml(summary)}"><div class="map-evolution-value">${rate.toFixed(1)}%</div><div class="map-evolution-bar"><span style="height:${height}%"></span></div><div class="map-evolution-label">${label}</div></div>`;
  }).join('');
}

function showUfTooltip(event, uf, rows) {
  DOM.tooltip.innerHTML = mapMiniChartHtml(`UF ${uf}`, rows, 'Um clique filtra/abre a UF no mapa; dois cliques abrem detalhes.');
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
const UF_GEO_LABELS = {
  AC: [-70.4, -9.2], AM: [-64.7, -4.8], RR: [-61.3, 1.7], AP: [-51.8, 1.2], PA: [-52.4, -4.1], RO: [-63.4, -10.9], TO: [-48.3, -10.2],
  MA: [-45.4, -5.1], PI: [-42.8, -7.4], CE: [-39.5, -5.3], RN: [-36.8, -5.8], PB: [-36.7, -7.1], PE: [-37.8, -8.4], AL: [-36.6, -9.6], SE: [-37.3, -10.6], BA: [-41.8, -12.7],
  MT: [-56.0, -12.7], MS: [-54.6, -20.4], GO: [-49.9, -16.1], DF: [-47.9, -15.8],
  MG: [-44.4, -18.7], ES: [-40.3, -19.7], RJ: [-42.9, -22.2], SP: [-48.4, -22.5],
  PR: [-51.6, -24.7], SC: [-50.0, -27.3], RS: [-53.2, -30.0]
};

function mapMiniChartHtml(label, rows, note = '') {
  const list = rows || [];
  const metric = computeRegionMetrics(list);
  const values = [
    ['Registros', list.length, '#1789c9'], ['Trânsito', metric.transit, '#1f8fca'], ['Atrasos', metric.delayed, '#d93d5b'],
    ['Ocorr.', metric.occurrences, '#e9a700'], ['Devol.', metric.returns, '#7c5cff']
  ];
  const max = Math.max(1, ...values.map(([, value]) => value));
  return `<div class="mini-map-chart"><strong>${escapeHtml(label)}</strong><div class="mini-map-chart-grid">${values.map(([name, value, color]) => `<span><em>${escapeHtml(name)}</em><b>${formatInteger(value)}</b><i style="--w:${Math.max(5, (value / max) * 100).toFixed(1)}%;--c:${color}"></i></span>`).join('')}</div>${note ? `<small>${escapeHtml(note)}</small>` : ''}</div>`;
}
function cityRelevanceScore(rows) {
  const metric = computeRegionMetrics(rows || []);
  const noted = (rows || []).filter((row) => isPresent(row.observacao) || isPresent(row.occurrenceText) || isPresent(row.occurrenceDescription) || isPresent(row.returnReason)).length;
  return rows.length + metric.delayed * 5 + metric.occurrences * 3 + metric.returns * 3 + metric.transit * 1.2 + noted * 2;
}
function cityRelevanceObservation(rows) {
  const metric = computeRegionMetrics(rows || []);
  const source = (rows || []).find((row) => row.delayed && (isPresent(row.occurrenceText) || isPresent(row.observacao) || isPresent(row.status)))
    || (rows || []).find((row) => row.hasOccurrence && (isPresent(row.occurrenceText) || isPresent(row.occurrenceDescription)))
    || (rows || []).find((row) => row.hasReturn && (isPresent(row.returnReason) || isPresent(row.returnText)))
    || (rows || []).find((row) => isPresent(row.observacao));
  const text = cleanLabel(source?.occurrenceText || source?.occurrenceDescription || source?.returnReason || source?.returnText || source?.observacao || source?.status || '');
  if (metric.delayed) return `${formatInteger(metric.delayed)} atraso(s)${text ? ` • ${truncate(text, 72)}` : ''}`;
  if (metric.occurrences) return `${formatInteger(metric.occurrences)} ocorrência(s)${text ? ` • ${truncate(text, 72)}` : ''}`;
  if (metric.returns) return `${formatInteger(metric.returns)} devolução(ões)${text ? ` • ${truncate(text, 72)}` : ''}`;
  return text ? truncate(text, 82) : `${formatInteger(rows.length)} registro(s) sem observação crítica.`;
}
function formatCompact(value) {
  const number = Number(value) || 0;
  if (number >= 1000) return `${(number / 1000).toFixed(number >= 10000 ? 0 : 1).replace('.', ',')}k`;
  return String(number);
}
function normalizeCityLabel(value) { return cleanLabel(value) || 'Sem cidade'; }
function sameCity(value, city) { return normalizeText(normalizeCityLabel(value)) === normalizeText(city || 'Sem cidade'); }
function getCityMapEntries(rows) {
  const grouped = groupBy(rows, (row) => `${normalizeCityLabel(row.cidade)}|||${row.uf || 'Sem UF'}`);
  return Object.entries(grouped).map(([key, list]) => {
    const [city, uf] = key.split('|||');
    return { key, city: city || 'Sem cidade', uf: uf || 'Sem UF', rows: list };
  }).sort((a, b) => cityRelevanceScore(b.rows) - cityRelevanceScore(a.rows) || b.rows.length - a.rows.length || a.city.localeCompare(b.city) || a.uf.localeCompare(b.uf));
}
function hashString(value) {
  return String(value || '').split('').reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0) >>> 0;
}
function cityPointForRegion(entry, stateCenters, index) {
  const centers = Object.values(stateCenters);
  const base = stateCenters[entry.uf] || centers[index % Math.max(1, centers.length)] || { x: 310, y: 295 };
  const seed = hashString(`${entry.city}|${entry.uf}`);
  const angle = ((seed % 360) * Math.PI) / 180;
  const ring = Math.floor(index / 7);
  const radius = 14 + (seed % 20) + ring * 11;
  const x = Math.min(592, Math.max(28, base.x + Math.cos(angle) * radius));
  const y = Math.min(560, Math.max(46, base.y + Math.sin(angle) * radius));
  return { x, y };
}
function focusMapCity(city, uf) {
  if (!city) return;
  const region = uf && uf !== 'Sem UF' ? CONFIG.regionByUf[uf] : STATE.selectedRegion;
  if (region && region !== 'all') STATE.selectedRegion = region;
  if (uf && uf !== 'Sem UF') STATE.selectedMapUf = uf;
  STATE.selectedMapCity = city;
  STATE.selectedMapCityUf = uf || '';
  if (DOM.mapRegionFilter && STATE.selectedRegion && STATE.selectedRegion !== 'all') DOM.mapRegionFilter.value = STATE.selectedRegion;
  resetMapZoom();
  renderMap();
}
function showCityTooltip(event, city, uf, rows) {
  const note = `${cityRelevanceObservation(rows)}. Um clique filtra; dois cliques abrem detalhes.`;
  DOM.tooltip.innerHTML = mapMiniChartHtml(`${city}${uf && uf !== 'Sem UF' ? ` / ${uf}` : ''}`, rows, note);
  DOM.tooltip.style.left = `${event.clientX}px`;
  DOM.tooltip.style.top = `${event.clientY}px`;
  DOM.tooltip.classList.add('visible');
}
function scheduleMapSingleClick(callback) {
  if (STATE.mapClickTimer) window.clearTimeout(STATE.mapClickTimer);
  STATE.mapClickTimer = window.setTimeout(() => { STATE.mapClickTimer = null; callback(); }, 230);
}
function cancelMapSingleClick() {
  if (STATE.mapClickTimer) window.clearTimeout(STATE.mapClickTimer);
  STATE.mapClickTimer = null;
}
function openMapGroupDetail(type, value, uf = '') {
  cancelMapSingleClick();
  const baseRows = getMapRows();
  let rows = [];
  let label = value || 'Seleção do mapa';
  let context = 'Mapa operacional';
  if (type === 'state') {
    rows = baseRows.filter((row) => row.uf === value);
    label = `Estado ${value}`;
    context = `UF ${value} no mapa operacional (${selectedMapStatusLabel()})`;
  } else if (type === 'city') {
    rows = baseRows.filter((row) => sameCity(row.cidade, value) && (!uf || uf === 'Sem UF' || row.uf === uf));
    label = `${value}${uf && uf !== 'Sem UF' ? ` / ${uf}` : ''}`;
    context = `Cidade selecionada no mapa (${selectedMapStatusLabel()})`;
  } else if (type === 'region') {
    rows = baseRows.filter((row) => row.region === value);
    label = `Região ${value}`;
    context = `Região selecionada no mapa (${selectedMapStatusLabel()})`;
  }
  if (!rows.length) { addAiMessage(`Não encontrei registros para ${label} nos filtros atuais do mapa.`); return; }
  STATE.chartPreviewRows = rows;
  STATE.chartPreviewLabel = label;
  STATE.chartPreviewContext = context;
  if (!DOM.chartPreviewModal) return;
  DOM.chartPreviewTitle.textContent = `Detalhes do mapa • ${label}`;
  DOM.chartPreviewBody.innerHTML = chartPreviewHtml(rows, label, context);
  if (typeof DOM.chartPreviewModal.showModal === 'function') {
    try { DOM.chartPreviewModal.showModal(); } catch (_) { DOM.chartPreviewModal.setAttribute('open', 'open'); }
  } else DOM.chartPreviewModal.setAttribute('open', 'open');
}

function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function setHtml(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }
function getMapRows() { return STATE.filtered.filter((row) => !(STATE.mapStatus === 'open' && !row.open) && !(STATE.mapStatus === 'transit' && !row.transit) && !(STATE.mapStatus === 'delayed' && !row.delayed) && !(STATE.mapStatus === 'occurrence' && !row.hasOccurrence) && !(STATE.mapStatus === 'return' && !row.hasReturn)); }
function selectedMapStatusLabel() {
  const labels = { all: 'Todos', open: 'Em aberto', transit: 'Em trânsito', delayed: 'Atrasos', occurrence: 'Ocorrências', return: 'Devoluções' };
  return labels[STATE.mapStatus] || 'Todos';
}
function computeRegionMetrics(rows) { return { total: rows.length, completed: rows.filter((row) => row.delivered || row.waitingUnload).length, open: rows.filter((row) => row.open).length, transit: rows.filter((row) => row.transit).length, doingDelivery: rows.filter((row) => normalizeText(row.status).includes('entrega') || row.waitingUnload).length, delayed: rows.filter((row) => row.delayed).length, occurrences: rows.filter((row) => row.hasOccurrence).length, returns: rows.filter((row) => row.hasReturn).length, vehicles: uniqueCount(rows, (row) => row.placa || row.motorista || row.of), todayAgendas: rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, new Date())).length }; }
function renderRegionSummary(metric) {
  const items = [['Registros no mapa', metric.total], ['Entregas realizadas', metric.completed], ['Entregas em aberto', metric.open], ['Veículos em trânsito', metric.transit], ['Cargas em atraso', metric.delayed], ['Ocorrências', metric.occurrences], ['Devoluções', metric.returns], ['Agendas hoje', metric.todayAgendas]];
  document.getElementById('regionSummary').innerHTML = items.map(([label, value]) => `<div class="region-metric"><span>${escapeHtml(label)}</span><strong>${formatInteger(value)}</strong></div>`).join('');
}
function renderMapStateBreakdown(rows, selected, selectedUf = '') {
  if (!DOM.mapStateBreakdown) return;
  const grouped = groupBy(rows.filter((row) => row.uf), (row) => row.uf);
  const entries = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
  if (!entries.length) {
    DOM.mapStateBreakdown.innerHTML = `<div class="empty-state">Sem estados com dados para ${escapeHtml(selected === 'all' ? 'a seleção atual' : selected)}.</div>`;
    return;
  }
  const title = selectedUf ? `UF ${escapeHtml(selectedUf)} em foco` : `Estados ${selected === 'all' ? 'com maior volume' : `da região ${escapeHtml(selected)}`}`;
  DOM.mapStateBreakdown.innerHTML = `<div class="state-breakdown-title">${title}</div>${entries.slice(0, selected === 'all' ? 8 : 12).map(([uf, list]) => {
    const metric = computeRegionMetrics(list);
    const active = selectedUf === uf || STATE.selectedMapUf === uf;
    const rate = list.length ? Math.round((metric.completed / list.length) * 100) : 0;
    const summary = mapMiniChartHtml(`UF ${uf}`, list, 'Um clique filtra/abre a UF no mapa; dois cliques abrem detalhes completos.');
    return `<button type="button" class="state-breakdown-card ${active ? 'active' : ''}" data-action="mapGroup" data-value="state|||${escapeHtml(uf)}" data-map-detail="state|||${escapeHtml(uf)}" data-summary="${escapeHtml(summary)}"><span><b>${escapeHtml(uf)}</b><em>${formatInteger(list.length)} reg.</em></span><i><strong>${formatInteger(metric.delayed)}</strong> atraso(s)</i><small>${formatInteger(metric.transit)} trânsito • ${formatInteger(metric.occurrences)} ocorr. • ${rate}% realizadas</small></button>`;
  }).join('')}`;
}
function renderMapCityBreakdown(rows, selected, selectedUf = '', selectedCity = '') {
  if (!DOM.mapCityBreakdown) return;
  const entries = getCityMapEntries(rows);
  if (!entries.length) {
    DOM.mapCityBreakdown.innerHTML = `<div class="empty-state">Sem cidades para ${escapeHtml(selectedUf || (selected === 'all' ? 'a seleção atual' : selected))}.</div>`;
    return;
  }
  const limit = selected === 'all' && !selectedUf ? 10 : selectedUf ? 24 : 18;
  const title = selectedCity ? `Cidade filtrada: ${escapeHtml(selectedCity)}` : selectedUf ? `Cidades da UF ${escapeHtml(selectedUf)} por relevância` : selected === 'all' ? 'Cidades com maior relevância no Brasil filtrado' : `Cidades da região ${escapeHtml(selected)} por relevância`;
  DOM.mapCityBreakdown.innerHTML = `<div class="city-breakdown-title">${title}</div>${entries.slice(0, limit).map((entry, index) => {
    const metric = computeRegionMetrics(entry.rows);
    const active = normalizeText(selectedCity || STATE.selectedMapCity || '') === normalizeText(entry.city) && (!STATE.selectedMapCityUf || STATE.selectedMapCityUf === entry.uf || entry.uf === 'Sem UF');
    const rate = entry.rows.length ? Math.round((metric.completed / entry.rows.length) * 100) : 0;
    const value = `${entry.city}|||${entry.uf}`;
    const observation = cityRelevanceObservation(entry.rows);
    const summary = mapMiniChartHtml(`${entry.city}${entry.uf !== 'Sem UF' ? ` / ${entry.uf}` : ''}`, entry.rows, `${observation}. Um clique filtra; dois cliques abrem detalhes.`);
    return `<button type="button" class="city-breakdown-card ${active ? 'active' : ''}" data-action="mapGroup" data-value="city|||${escapeHtml(value)}" data-map-detail="city|||${escapeHtml(value)}" data-summary="${escapeHtml(summary)}"><span><b>${index + 1}. ${escapeHtml(entry.city)}</b><em>${escapeHtml(entry.uf)}</em></span><strong>${formatInteger(entry.rows.length)} reg.</strong><small>${formatInteger(metric.delayed)} atraso(s) • ${formatInteger(metric.occurrences)} ocorr. • ${rate}% realizadas</small><small class="city-observation">${escapeHtml(observation)}</small></button>`;
  }).join('')}`;
}

function showMapTooltip(event, region, metric) { const fakeRows = Array.from({ length: metric.total || 0 }, (_, index) => ({ id: `metric-${index}`, transit: index < metric.transit, delayed: index < metric.delayed, hasOccurrence: index < metric.occurrences, hasReturn: index < metric.returns })); DOM.tooltip.innerHTML = mapMiniChartHtml(region, fakeRows, 'Região calculada pela UF. Um clique filtra; dois cliques abrem detalhes quando disponível.'); DOM.tooltip.style.left = `${event.clientX}px`; DOM.tooltip.style.top = `${event.clientY}px`; DOM.tooltip.classList.add('visible'); }
function hideTooltip() { DOM.tooltip.classList.remove('visible'); tooltipTarget = null; tooltipEvent = null; }
function handleSummaryTooltipMove(event) {
  const element = event.target.closest('[data-summary]');
  if (!element || element.closest('.map-region, .heat-spot')) return;
  tooltipTarget = element;
  tooltipEvent = event;
  if (tooltipFrame) return;
  tooltipFrame = window.requestAnimationFrame(() => {
    tooltipFrame = null;
    if (!tooltipTarget || !tooltipEvent) return;
    const html = tooltipTarget.dataset.summary || '';
    if (DOM.tooltip.innerHTML !== html) DOM.tooltip.innerHTML = html;
    DOM.tooltip.style.left = `${tooltipEvent.clientX}px`;
    DOM.tooltip.style.top = `${tooltipEvent.clientY}px`;
    DOM.tooltip.classList.add('visible', 'summary-tooltip');
  });
}
function handleSummaryTooltipOut(event) {
  const element = event.target.closest('[data-summary]');
  if (!element) return;
  if (event.relatedTarget && element.contains(event.relatedTarget)) return;
  if (tooltipFrame) { window.cancelAnimationFrame(tooltipFrame); tooltipFrame = null; }
  DOM.tooltip.classList.remove('visible', 'summary-tooltip');
  tooltipTarget = null; tooltipEvent = null;
}

function chartMeasureDescription(containerId, fallback = 'registros filtrados no painel') {
  const map = {
    statusChart: 'Status de entrega conforme a planilha base.',
    ufChart: 'UF de destino informada na planilha.',
    occurrenceTypes: 'Tipo/Descrição da ocorrência informada na planilha.',
    occurrenceUf: 'UF das linhas marcadas com ocorrência.',
    occurrenceSector: 'Setor Responsável das linhas com ocorrência.',
    occurrenceDrivers: 'Motorista ou placa das linhas com ocorrência.',
    returnTypes: 'TipoDevolução da planilha, somente Total ou Parcial.',
    returnReasons: 'MotivoDevolução textual informado na planilha.',
    returnRegions: 'Região calculada pela UF das devoluções.',
    returnDrivers: 'Motorista ou placa das linhas com devolução.',
    extrasTransporters: 'Transportador informado na planilha.',
    extrasCargoTypes: 'Tipo de Carga informado na planilha.',
    extrasDocuments: 'Campos Manifesto e Digitalização do Canhoto.',
    extrasClients: 'Cliente/destinatário informado na planilha.',
    performanceUf: 'UF das notas elegíveis à regra de performance ONTIME.',
    consolidatedBySource: 'Origem das notas elegíveis à performance consolidada.',
    consolidatedByUf: 'UF das notas elegíveis à performance consolidada.'
  };
  return map[containerId] || fallback;
}
function renderBarList(containerId, data, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const entries = Array.isArray(data) ? data : Object.entries(data || {});
  if (!entries.length) { container.innerHTML = emptyState(options.empty || 'Sem dados para exibir.'); return; }
  const max = Math.max(...entries.map(([, value]) => typeof value === 'number' ? value : Number(value) || 0), 1);
  const measure = options.measureLabel || chartMeasureDescription(containerId);
  container.innerHTML = entries.map(([label, value]) => {
    const number = typeof value === 'number' ? value : Number(value) || 0;
    const width = Math.max(3, Math.round((number / max) * 100));
    const cls = options.colorResolver ? options.colorResolver(label, number) : '';
    const action = options.actionResolver ? options.actionResolver(label, number) : { action: 'chartPreview', value: `${containerId}|||${label}` };
    const detail = options.detailResolver ? options.detailResolver(label, number) : null;
    const active = options.activeResolver ? options.activeResolver(label, number) : false;
    const attrs = action ? `data-action="${escapeHtml(action.action)}" data-value="${escapeHtml(action.value)}"` : '';
    const detailAttrs = detail ? `data-dbl-action="${escapeHtml(detail.action)}" data-dbl-value="${escapeHtml(detail.value)}"` : '';
    const summary = options.summaryResolver ? options.summaryResolver(label, number, width, measure) : `<strong>${escapeHtml(label)}</strong><br>${formatInteger(number)} registro(s)<br><small>${width}% da maior categoria exibida</small><br><small>Contabilização: ${escapeHtml(measure)}</small>`;
    return `<div class="bar-row ${action ? 'clickable' : ''} ${active ? 'active-filter' : ''}" ${attrs} ${detailAttrs} data-summary="${escapeHtml(summary)}"><div class="bar-label" title="${escapeHtml(label)}">${escapeHtml(label)}</div><div class="bar-track"><div class="bar-fill ${escapeHtml(cls)}" style="width:${width}%"></div></div><div class="bar-value">${formatInteger(number)}</div></div>`;
  }).join('');
}
function renderTagCloud(containerId, entries, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!entries.length) { container.innerHTML = emptyState('Sem descrições registradas.'); return; }
  const measure = options.measureLabel || chartMeasureDescription(containerId, 'descrição/tipo informada na planilha.');
  container.innerHTML = entries.map(([label, value]) => {
    const action = options.actionResolver ? options.actionResolver(label, value) : null;
    const attrs = action ? `data-action="${escapeHtml(action.action)}" data-value="${escapeHtml(action.value)}"` : '';
    const summary = `<strong>${escapeHtml(label)}</strong><br>${formatInteger(value)} registro(s)<br><small>Contabilização: ${escapeHtml(measure)}</small>${action ? '<br><small>Clique para abrir a tela filtrada.</small>' : ''}`;
    const content = `<b>${formatInteger(value)}</b> ${escapeHtml(truncate(label, 54))}`;
    return action ? `<button type="button" class="tag tag-action" ${attrs} data-summary="${escapeHtml(summary)}">${content}</button>` : `<span class="tag" title="${escapeHtml(label)}" data-summary="${escapeHtml(summary)}">${content}</span>`;
  }).join('');
}

function renderInsights(containerId, insights) { const container = document.getElementById(containerId); if (!insights.length) { container.innerHTML = emptyState('Sem alertas para os filtros atuais.'); return; } container.innerHTML = insights.map((item) => `<div class="insight ${escapeHtml(item.type || '')}"><span class="insight-icon">${escapeHtml(item.icon || '•')}</span><div>${escapeHtml(item.text)}</div></div>`).join(''); }

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
    status: displayStatus(row),
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
  const baseStatus = displayStatus(row);
  const performanceInfo = row.statusBucket && normalizeText(row.statusBucket) !== normalizeText(baseStatus) ? `Performance: ${row.statusBucket}` : 'Status da planilha';
  const summary = `<strong>${escapeHtml(row.of || row.notaFiscal || 'Registro')}</strong><br>${escapeHtml(row.cliente || '-') }<br>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br>Status planilha: ${escapeHtml(baseStatus)}<br>Status performance: ${escapeHtml(row.statusBucket || '-')}${row.hasOccurrence ? '<br>Com ocorrência' : ''}${row.hasReturn ? '<br>Com devolução' : ''}`;
  return `<tr data-open-record="${escapeHtml(row.id)}" data-summary="${escapeHtml(summary)}"><td><span class="badge info">${escapeHtml(row.source || '-')}</span></td><td><strong>${escapeHtml(formatDate(row.referenceDate) || row.dataProgramada || '-')}</strong><br><small>Agenda: ${escapeHtml(formatDate(row.agendaDate) || row.agenda || '-')}</small></td><td><strong>${escapeHtml(row.of || '-')}</strong><br><small>NF: ${escapeHtml(row.notaFiscal || '-')}</small></td><td title="${escapeHtml(row.cliente || '')}">${escapeHtml(truncate(row.cliente || '-', 34))}</td><td>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}<br><small>${escapeHtml(row.region || '')}</small></td><td>${escapeHtml(row.placa || '-')}<br><small>${escapeHtml(row.motorista || '-')}</small></td><td><span class="badge ${statusColorClass(baseStatus)}">${escapeHtml(baseStatus)}</span><br><small>${escapeHtml(truncate(performanceInfo, 32))}</small></td><td>${ontimeBadge}</td><td>${row.hasOccurrence ? `<span class="badge warn" title="${escapeHtml(row.occurrenceText)}">Sim</span>` : '<span class="badge">Não</span>'}</td><td>${row.hasReturn ? `<span class="badge purple" title="${escapeHtml(row.returnText)}">Sim</span>` : '<span class="badge">Não</span>'}</td></tr>`;
}
function openRecordDetail(recordId) {
  const row = STATE.records.find((item) => item.id === recordId); if (!row) return;
  DOM.modalTitle.textContent = `${row.of || 'Carga'}${row.notaFiscal ? ` • NF ${row.notaFiscal}` : ''}`;
  const rawFields = Object.entries(row.raw || {}).filter(([key]) => !key.startsWith('__'));
  DOM.modalBody.innerHTML = `<div class="modal-summary"><div><span>Origem</span><strong>${escapeHtml(row.source || '-')}</strong></div><div><span>Cliente</span><strong title="${escapeHtml(row.cliente || '')}">${escapeHtml(row.cliente || '-')}</strong></div><div><span>Destino</span><strong>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</strong></div><div><span>Status planilha</span><strong>${escapeHtml(displayStatus(row))}</strong></div><div><span>Status performance</span><strong>${escapeHtml(row.statusBucket || '-')}</strong></div><div><span>Previsão</span><strong>${escapeHtml(formatDate(row.previsaoEntregaDate) || row.previsaoEntrega || '-')}</strong></div><div><span>Chegada cliente</span><strong>${escapeHtml(formatDate(row.chegadaClienteDate) || row.chegadaCliente || '-')}</strong></div><div><span>Placa</span><strong>${escapeHtml(row.placa || '-')}</strong></div><div><span>Motorista</span><strong>${escapeHtml(row.motorista || '-')}</strong></div></div><div class="field-grid">${rawFields.map(([key, value]) => `<div class="field-item"><span>${escapeHtml(key)}</span><p>${escapeHtml(hasUsableSpreadsheetValue(value) ? String(value) : '-')}</p></div>`).join('')}</div>`;
  if (typeof DOM.detailModal.showModal === 'function') {
    try { DOM.detailModal.showModal(); } catch (_) { DOM.detailModal.setAttribute('open', 'open'); }
  } else DOM.detailModal.setAttribute('open', 'open');
}
function handleAction(action, value, element = null) {
  if (action === 'filterStatus') { const next = value || 'all'; DOM.filterStatus.value = DOM.filterStatus.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'statusBucket') { const statusMap = { 'Fora do prazo': 'delayed', Finalizado: 'delivered', 'Aguard. descarga': 'waiting', 'Em trânsito': 'transit', 'Em aberto': 'open', Faturado: 'open' }; const next = statusMap[value] || 'all'; DOM.filterStatus.value = DOM.filterStatus.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'uf') { const next = value || 'all'; DOM.filterUf.value = DOM.filterUf.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'filterMonth') { const next = value || 'all'; DOM.filterMonth.value = DOM.filterMonth.value === next ? 'all' : next; onFilterChange(); }
  if (action === 'dynamicAxis') return setDynamicAxis(element?.dataset.axis || 'a', value);
  if (action === 'dynamicChartType') return setDynamicChartType(value);
  if (action === 'dynamicQuickFilter') return toggleDynamicQuickFilter(element?.dataset.axis || 'a', value);
  if (action === 'returnFilter') return scheduleReturnFilter(value);
  if (action === 'clearReturnFilter') { cancelReturnFilterClick(); STATE.returnFilter = null; return renderReturns(); }
  if (action === 'chartPreview') return openChartPreview(value);
  if (action === 'occurrenceDescription') openOccurrenceDescriptionDetail(value);
  if (action === 'mapCity') { const [city = '', uf = ''] = String(value || '').split('|||'); scheduleMapSingleClick(() => focusMapCity(city, uf)); }
  if (action === 'mapGroup') { const [type = '', rawValue = '', rawUf = ''] = String(value || '').split('|||'); scheduleMapSingleClick(() => filterMapGroup(type, rawValue, rawUf)); }
  if (action === 'region') { const next = value || 'all'; STATE.selectedRegion = STATE.selectedRegion === next ? 'all' : next; STATE.selectedMapUf = ''; STATE.selectedMapCity = ''; STATE.selectedMapCityUf = ''; DOM.mapRegionFilter.value = STATE.selectedRegion; activateTab('map'); }
}
function filterMapGroup(type, value, uf = '') {
  if (type === 'state') return openUfFromMap(value);
  if (type === 'city') return focusMapCity(value, uf);
  if (type === 'region') return openRegionFromMap(value);
}
function setDynamicAxis(axis, value) {
  const defs = getDynamicDimensionDefinitions();
  if (!defs[value]) return;
  if (axis === 'b') STATE.dynamicMetricB = value;
  else {
    STATE.dynamicMetricA = value;
    STATE.dynamicMetricB = dynamicRecommendation(value);
  }
  if (STATE.dynamicMetricA === STATE.dynamicMetricB) STATE.dynamicMetricB = STATE.dynamicMetricA === 'status' ? 'uf' : 'status';
  STATE.dynamicFiltersA = new Set(); STATE.dynamicFiltersB = new Set();
  renderReportBuilder();
}
function setDynamicChartType(value) {
  if (!dynamicChartTypes().some((item) => item.key === value)) return;
  STATE.dynamicChartType = value;
  renderReportBuilder();
}
function toggleDynamicQuickFilter(axis, value) {
  const set = axis === 'b' ? STATE.dynamicFiltersB : STATE.dynamicFiltersA;
  if (set.has(value)) set.delete(value); else set.add(value);
  renderReportBuilder();
}


function openChartPreview(contextValue) {
  const { rows, label, context } = buildChartPreviewRows(contextValue);
  STATE.chartPreviewRows = rows;
  STATE.chartPreviewLabel = label;
  STATE.chartPreviewContext = context;
  if (!DOM.chartPreviewModal) return;
  DOM.chartPreviewTitle.textContent = label || 'Resumo do gráfico';
  DOM.chartPreviewBody.innerHTML = chartPreviewHtml(rows, label, context);
  if (typeof DOM.chartPreviewModal.showModal === 'function') {
    try { DOM.chartPreviewModal.showModal(); } catch (_) { DOM.chartPreviewModal.setAttribute('open', 'open'); }
  } else DOM.chartPreviewModal.setAttribute('open', 'open');
}
function buildChartPreviewRows(contextValue) {
  const [rawContext = '', rawLabel = ''] = String(contextValue || '').split('|||');
  const label = rawLabel || rawContext || 'Resumo';
  const normalizedLabel = normalizeText(label);
  const rows = chartPreviewBaseRows(rawContext);
  const defs = getDynamicDimensionDefinitions();
  let filtered = rows;
  if (rawContext.startsWith('dynamic:')) {
    const parts = rawContext.split(':');
    const dimA = defs[parts[1]];
    const valueA = parts.slice(2).join(':');
    const right = rawLabel || '';
    if (dimA) filtered = filtered.filter((row) => normalizeText(simplifyDescription(dimA.getter(row))) === normalizeText(valueA));
    if (right.includes(':')) {
      const [keyB, ...valueParts] = right.split(':');
      const dimB = defs[keyB];
      const valueB = valueParts.join(':');
      if (dimB) filtered = filtered.filter((row) => normalizeText(simplifyDescription(dimB.getter(row))) === normalizeText(valueB));
    }
    return { rows: filtered, label: `Informação dinâmica • ${valueA}${right ? ` x ${right.split(':').slice(1).join(':')}` : ''}`, context: 'Informação Dinâmica' };
  }
  if (rawContext.startsWith('report:')) {
    const title = rawContext.replace(/^report:/, '');
    filtered = filtered.filter((row) => {
      const nTitle = normalizeText(title);
      if (nTitle.includes('status')) return normalizeText(displayStatus(row)) === normalizedLabel;
      if (nTitle.includes('uf')) return row.uf === label;
      if (nTitle.includes('ocorr')) return row.hasOccurrence && normalizeText(occurrenceTypeLabel(row)) === normalizedLabel;
      if (nTitle.includes('devol')) return row.hasReturn && normalizeText(cleanLabel(row.returnReason) || 'Sem motivo informado') === normalizedLabel;
      if (nTitle.includes('transport')) return normalizeText(normalizeTransporterLabel(row.transportadora)) === normalizedLabel;
      return row.searchText && row.searchText.includes(normalizedLabel);
    });
    return { rows: filtered, label: `${title} • ${label}`, context: `Bloco do relatório: ${title}` };
  }
  if (rawContext.startsWith('profile:')) {
    const section = rawContext.replace(/^profile:/, '');
    filtered = filtered.filter((row) => {
      if (section === 'Tipo de carga') return normalizeText(normalizeCargoTypeForProfile(row.tpCarga)) === normalizedLabel;
      if (section === 'Veículo') return normalizeText(normalizeVehicleTypeForProfile(row.tpVeiculo)) === normalizedLabel;
      if (section === 'Transportador') return normalizeText(normalizeTransporterLabel(row.transportadora)) === normalizedLabel;
      return false;
    });
    return { rows: filtered, label: `${section} • ${label}`, context: section };
  }
  if (rawContext.startsWith('performanceGauge:')) {
    filtered = filterPerformanceGaugeRows(rows, label);
    return { rows: filtered, label: `Performance • ${label}`, context: 'Performance ONTIME' };
  }
  const filters = {
    statusChart: (row) => normalizeText(displayStatus(row)) === normalizedLabel,
    ufChart: (row) => row.uf === label,
    occurrenceTypes: (row) => row.hasOccurrence && normalizeText(occurrenceTypeLabel(row)) === normalizedLabel,
    occurrenceUf: (row) => row.hasOccurrence && row.uf === label,
    occurrenceSector: (row) => row.hasOccurrence && normalizeText(cleanLabel(row.setor) || 'Sem setor') === normalizedLabel,
    occurrenceDrivers: (row) => row.hasOccurrence && normalizeText(cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa') === normalizedLabel,
    returnTypes: (row) => row.hasReturn && normalizeText(row.returnType || 'Sem tipo') === normalizedLabel,
    returnReasons: (row) => row.hasReturn && normalizeText(cleanLabel(row.returnReason) || 'Sem motivo informado') === normalizedLabel,
    returnRegions: (row) => row.hasReturn && normalizeText(row.region || 'Sem região') === normalizedLabel,
    returnDrivers: (row) => row.hasReturn && normalizeText(cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa') === normalizedLabel,
    extrasTransporters: (row) => normalizeText(normalizeTransporterLabel(row.transportadora)) === normalizedLabel,
    extrasCargoTypes: (row) => normalizeText(cleanLabel(row.tpCarga) || 'Sem tipo') === normalizedLabel,
    extrasClients: (row) => normalizeText(cleanLabel(row.cliente) || 'Sem cliente') === normalizedLabel,
    extrasDocuments: (row) => normalizeText(`${getRawField(row, ['Manifesto']) || 'Manifesto não informado'} / ${getRawField(row, ['Digitalização do Canhoto', 'Digitalizacao do Canhoto', 'Canhoto']) || 'Canhoto não informado'}`) === normalizedLabel,
    performanceSource: (row) => row.performanceEligible && normalizeText(row.source || 'Sem origem') === normalizedLabel,
    performanceUf: (row) => row.performanceEligible && row.uf === label,
    consolidatedBySource: (row) => row.performanceEligible && normalizeText(row.source || 'Sem origem') === normalizedLabel,
    consolidatedByUf: (row) => row.performanceEligible && row.uf === label
  };
  if (filters[rawContext]) filtered = rows.filter(filters[rawContext]);
  else filtered = rows.filter((row) => row.searchText && row.searchText.includes(normalizedLabel));
  return { rows: filtered, label, context: chartMeasureDescription(rawContext, rawContext || 'Gráfico') };
}
function chartPreviewBaseRows(context) {
  if (/^consolidatedBy/.test(context) || String(context).startsWith('performanceGauge:BA + SP')) return STATE.records.filter((row) => matchesFilters(row, { ...STATE.filters, source: 'all' }));
  if (String(context).startsWith('dynamic:')) return STATE.filtered;
  return STATE.filtered;
}
function filterPerformanceGaugeRows(rows, label) {
  const n = normalizeText(label);
  if (/elegive/.test(n)) return rows.filter((row) => row.performanceEligible);
  if (/dentro/.test(n)) return rows.filter((row) => row.performanceEligible && row.ontimeStatus === true);
  if (/fora/.test(n)) return rows.filter((row) => row.performanceEligible && (row.ontimeStatus === false || row.delayed));
  if (/transito/.test(n)) return rows.filter((row) => row.transit && !row.performanceEligible && !row.delayed);
  return rows;
}
function chartPreviewHtml(rows, label, context) {
  if (!rows.length) return emptyState('Nenhum registro encontrado para este item do gráfico nos filtros atuais.');
  const m = computeMetrics(rows);
  const byStatus = countBy(rows, (row) => displayStatus(row) || 'Sem status');
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF');
  const body = rows.slice(0, 250).map((row) => recordRowHtml(row)).join('');
  return `<div class="occurrence-detail-summary chart-preview-summary"><div><span>Item</span><strong>${escapeHtml(label)}</strong></div><div><span>Registros</span><strong>${formatInteger(rows.length)}</strong></div><div><span>Status principal</span><strong>${escapeHtml(topLabel(byStatus) || '-')}</strong></div><div><span>UF principal</span><strong>${escapeHtml(topLabel(byUf) || '-')}</strong></div></div><div class="mini-kpi-row chart-preview-kpis"><span><b>${formatInteger(m.totalNotes)}</b> notas</span><span><b>${formatInteger(m.delayed)}</b> atrasos</span><span><b>${formatInteger(m.occurrences)}</b> ocorrências</span><span><b>${m.ontimeRate}%</b> ONTIME</span></div><p class="modal-note">Contabilização: ${escapeHtml(context)}. Clique em uma linha para abrir todos os campos. Use Exportar XLSX para a base completa ou Imprimir para a prévia.</p><div class="table-wrap occurrence-detail-table"><table class="data-table table-clickable"><thead><tr><th>Origem</th><th>Data / Agenda</th><th>Carga / NF</th><th>Cliente</th><th>Destino</th><th>Veículo / Motorista</th><th>Status</th><th>ONTIME</th><th>Ocorrência</th><th>Devolução</th></tr></thead><tbody>${body}</tbody></table></div>${rows.length > 250 ? `<div class="empty-state">Exibindo 250 de ${formatInteger(rows.length)} registros. Exporte o XLSX para a base completa.</div>` : ''}`;
}
function exportChartPreviewXlsx() {
  const rows = STATE.chartPreviewRows || [];
  if (!rows.length) { addAiMessage('Nenhum item de gráfico selecionado para exportar.'); return; }
  downloadXlsx(`previa-grafico-${dateForFile(new Date())}.xlsx`, [
    { name: 'Resumo', rows: [['Item', STATE.chartPreviewLabel], ['Contexto', STATE.chartPreviewContext], ['Registros', rows.length], ['Gerado em', formatDateTime(new Date())]] },
    { name: 'Base', rows: buildExportRows(rows) }
  ]);
}
function printChartPreview() {
  const rows = STATE.chartPreviewRows || [];
  if (!rows.length) return;
  const title = `Prévia do gráfico - ${STATE.chartPreviewLabel}`;
  const win = window.open('', '_blank', 'width=1100,height=800');
  if (!win) { addAiMessage('O navegador bloqueou a janela de impressão. Permita pop-ups e tente novamente.'); return; }
  win.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;margin:20px;color:#162636}h1{font-size:22px}.data-table{width:100%;border-collapse:collapse;font-size:11px}.data-table th,.data-table td{border:1px solid #d7e2ec;padding:6px;text-align:left}.occurrence-detail-summary,.mini-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.occurrence-detail-summary div,.mini-kpi-row span{border:1px solid #d7e2ec;border-radius:10px;padding:8px}@page{size:A4 landscape;margin:10mm}</style></head><body><h1>${escapeHtml(title)}</h1><p>Gerado em ${escapeHtml(formatDateTime(new Date()))} • ${formatInteger(rows.length)} registro(s)</p>${chartPreviewHtml(rows, STATE.chartPreviewLabel, STATE.chartPreviewContext)}</body></html>`);
  win.document.close(); win.focus(); window.setTimeout(() => { try { win.print(); } catch (_) {} }, 350);
}

function openOccurrenceDescriptionDetail(label) {
  const target = simplifyDescription(label);
  const rows = STATE.filtered.filter((row) => row.hasOccurrence && simplifyDescription(row.occurrenceDescription || row.occurrenceText) === target);
  STATE.occurrenceDetailRows = rows;
  STATE.occurrenceDetailLabel = target;
  if (!DOM.occurrenceDetailModal) return;
  DOM.occurrenceDetailTitle.textContent = target || 'Descrição da ocorrência';
  DOM.occurrenceDetailBody.innerHTML = occurrenceDetailHtml(rows, target);
  if (typeof DOM.occurrenceDetailModal.showModal === 'function') DOM.occurrenceDetailModal.showModal(); else DOM.occurrenceDetailModal.setAttribute('open', 'open');
}
function occurrenceDetailHtml(rows, label) {
  if (!rows.length) return emptyState('Nenhum registro encontrado para esta descrição nos filtros atuais.');
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF');
  const bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor');
  const headers = ['Origem', 'Data', 'Carga', 'NF', 'Cliente', 'Destino', 'Motorista/Placa', 'Status', 'Setor', 'ONTIME'];
  const body = rows.slice(0, 600).map((row) => `<tr data-open-record="${escapeHtml(row.id)}"><td>${escapeHtml(row.source || '-')}</td><td>${escapeHtml(formatDate(row.referenceDate) || '-')}</td><td>${escapeHtml(row.of || '-')}</td><td>${escapeHtml(row.notaFiscal || '-')}</td><td>${escapeHtml(truncate(row.cliente || '-', 42))}</td><td>${escapeHtml([row.cidade, row.uf].filter(Boolean).join(' / ') || '-')}</td><td>${escapeHtml(row.motorista || row.placa || '-')}</td><td>${escapeHtml(displayStatus(row) || '-')}</td><td>${escapeHtml(row.setor || '-')}</td><td>${escapeHtml(row.ontimeStatus === true ? 'No prazo' : row.ontimeStatus === false ? 'Fora prazo' : 'Sem ONTIME')}</td></tr>`).join('');
  return `<div class="occurrence-detail-summary"><div><span>Descrição</span><strong>${escapeHtml(label)}</strong></div><div><span>Registros</span><strong>${formatInteger(rows.length)}</strong></div><div><span>UF principal</span><strong>${escapeHtml(topLabel(byUf) || '-')}</strong></div><div><span>Setor principal</span><strong>${escapeHtml(topLabel(bySector) || '-')}</strong></div></div><p class="modal-note">Clique em uma linha para abrir todos os campos da planilha. A exportação XLSX desta tela contém as colunas completas.</p><div class="table-wrap occurrence-detail-table"><table class="data-table table-clickable"><thead><tr>${headers.map((head) => `<th>${escapeHtml(head)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>${rows.length > 600 ? `<div class="empty-state">Exibindo 600 de ${formatInteger(rows.length)} registros. Exporte o XLSX para a base completa.</div>` : ''}`;
}
function exportOccurrenceDetailXlsx() {
  const rows = STATE.occurrenceDetailRows || [];
  if (!rows.length) { addAiMessage('Nenhuma descrição de ocorrência selecionada para exportar.'); return; }
  downloadXlsx(`ocorrencias-${dateForFile(new Date())}.xlsx`, [
    { name: 'Resumo', rows: [['Descrição', STATE.occurrenceDetailLabel], ['Registros', rows.length], ['Gerado em', formatDateTime(new Date())]] },
    { name: 'Ocorrencias', rows: buildExportRows(rows) }
  ]);
}
function printOccurrenceDetail() {
  const rows = STATE.occurrenceDetailRows || [];
  if (!rows.length) return;
  const title = `Ocorrências - ${STATE.occurrenceDetailLabel}`;
  const win = window.open('', '_blank', 'width=1100,height=800');
  if (!win) { addAiMessage('O navegador bloqueou a janela de impressão. Permita pop-ups e tente novamente.'); return; }
  win.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>body{font-family:Arial,sans-serif;margin:20px;color:#162636}h1{font-size:22px}.data-table{width:100%;border-collapse:collapse;font-size:11px}.data-table th,.data-table td{border:1px solid #d7e2ec;padding:6px;text-align:left}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.summary div{border:1px solid #d7e2ec;border-radius:10px;padding:8px}@page{size:A4 landscape;margin:10mm}</style></head><body><h1>${escapeHtml(title)}</h1><p>Gerado em ${escapeHtml(formatDateTime(new Date()))} • ${formatInteger(rows.length)} registro(s)</p>${occurrenceDetailHtml(rows, STATE.occurrenceDetailLabel)}</body></html>`);
  win.document.close(); win.focus(); window.setTimeout(() => { try { win.print(); } catch (_) {} }, 350);
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
  const byUf = countBy(rows, (row) => row.uf || 'Sem UF'), bySector = countBy(rows, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(rows, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), byType = countBy(rows, occurrenceTypeLabel), delayed = rows.filter((row) => row.delayed).length;
  return [
    { type: 'warn', icon: '⚠', text: `Tipo mais recorrente: ${topLabel(byType) || 'não informado'} (${formatInteger(Math.max(...Object.values(byType)))} registro(s)).` },
    { type: 'warn', icon: '📍', text: `UF com mais ocorrências: ${topLabel(byUf)} (${formatInteger(Math.max(...Object.values(byUf)))} registro(s)).` },
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
  if (!track) return;
  const sourceLabel = STATE.filters.source && STATE.filters.source !== 'all' ? STATE.filters.source : 'Filial BA + Matriz SP';
  const todayAgendas = rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, today));
  const d2Agendas = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2)));
  const delayed = rows.filter((row) => row.delayed), occurrencesToday = rows.filter((row) => row.hasOccurrence && isSameDay(row.referenceDate, today)), returns = rows.filter((row) => row.hasReturn);
  const sectors = [
    { icon: '🕒', title: 'Operação', tone: 'info', html: `<strong>${escapeHtml(sourceLabel)}</strong><span>Atualizado ${escapeHtml(STATE.lastUpdated ? formatDateTime(STATE.lastUpdated) : '--')}</span><b>${formatInteger(rows.length)} registros</b>` },
    { icon: '📅', title: 'Agenda', tone: 'success', html: `<b>${formatInteger(todayAgendas.length)} hoje</b><b>${formatInteger(d2Agendas.length)} até D+2</b>` },
    { icon: '🚨', title: 'Riscos', tone: delayed.length ? 'danger' : 'success', html: `<b>${formatInteger(delayed.length)} fora do prazo</b><span>${formatInteger(occurrencesToday.length)} ocorrência(s) do dia</span><span>${formatInteger(returns.length)} devolução(ões)</span>` }
  ];
  const weather = buildWeatherTickerHtml();
  if (weather) sectors.push({ icon: '🌦️', title: 'Tempo', tone: 'weather', html: weather });
  const next = buildUnifiedAgendaTicker(d2Agendas, 4);
  if (next) sectors.push({ icon: '🔎', title: 'Próximas agendas', tone: 'agenda', html: next });
  track.innerHTML = sectors.map((item) => `<span class="ticker-sector ${escapeHtml(item.tone || '')}"><b class="ticker-sector-title">${escapeHtml(item.icon)} ${escapeHtml(item.title)}</b><span class="ticker-sector-body">${item.html}</span></span>`).join('');
}
function buildUnifiedAgendaTicker(rows, limit = 4) {
  const groups = new Map();
  rows
    .slice()
    .sort((a, b) => (a.agendaDate || a.previsaoEntregaDate || 0) - (b.agendaDate || b.previsaoEntregaDate || 0))
    .forEach((row) => {
      const date = formatDate(row.agendaDate || row.previsaoEntregaDate) || 'sem data';
      const plate = cleanLabel(row.placa) || 'placa não informada';
      const driver = cleanLabel(row.motorista) || 'motorista não informado';
      const key = `${date}|||${normalizeText(plate)}|||${normalizeText(driver)}`;
      if (!groups.has(key)) groups.set(key, { date, plate, driver, ufs: new Set(), nfs: new Set(), ofs: new Set() });
      const item = groups.get(key);
      if (row.uf) item.ufs.add(row.uf);
      if (row.notaFiscal) item.nfs.add(row.notaFiscal);
      if (row.of) item.ofs.add(row.of);
    });
  return Array.from(groups.values()).slice(0, limit).map((item) => {
    const nfs = Array.from(item.nfs).slice(0, 8).join(', ') || '-';
    const ofs = Array.from(item.ofs).slice(0, 5).join(', ') || '-';
    const extraNfs = item.nfs.size > 8 ? ` +${item.nfs.size - 8}` : '';
    const uf = Array.from(item.ufs).join('/') || 'UF';
    return `<span class="ticker-agenda-item"><strong>Agenda ${escapeHtml(item.date)}</strong><em>${escapeHtml(uf)}</em><strong>Placa ${escapeHtml(item.plate)}</strong><span>Motorista ${escapeHtml(item.driver)}</span><span>NFs ${escapeHtml(nfs)}${escapeHtml(extraNfs)}</span><span>OFs ${escapeHtml(ofs)}</span></span>`;
  }).join('<i class="ticker-separator">|</i>');
}
function buildWeatherTickerHtml() {
  const entries = Object.entries(STATE.weather || {}).filter(([, value]) => value);
  if (!entries.length) return '<span>Consulta indisponível no momento; acompanhe regiões críticas antes da saída.</span>';
  return entries.map(([region, text]) => `<span><strong>${escapeHtml(region)}</strong> ${escapeHtml(text)}</span>`).join('<i class="ticker-separator">|</i>');
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

function loadMonitorMemory() {
  try {
    const saved = JSON.parse(localStorage.getItem('torre-monitor-memory') || '{}');
    STATE.monitorMemory = { totalRequests: 0, topics: {}, lastQuestions: [], insights: [], ...saved };
  } catch (_) {
    STATE.monitorMemory = { totalRequests: 0, topics: {}, lastQuestions: [], insights: [] };
  }
}
function saveMonitorMemory() {
  try { localStorage.setItem('torre-monitor-memory', JSON.stringify(STATE.monitorMemory)); } catch (_) {}
}
function monitorTopic(question) {
  const q = normalizeText(question);
  if (/(atras|fora do prazo|prazo venc)/.test(q)) return 'atrasos';
  if (/(ocorr|problema|sinistro|avaria)/.test(q)) return 'ocorrências';
  if (/(devol|retorno|reversa)/.test(q)) return 'devoluções';
  if (/(ontime|performance|sla)/.test(q)) return 'performance';
  if (/(agenda|hoje|amanha|d 2|proxim)/.test(q)) return 'agendas';
  if (/(motorista|placa|veiculo|veículo|transport)/.test(q)) return 'transportes';
  if (/(relatorio|relatório|export|xlsx|pdf|excel|planilha)/.test(q)) return 'relatórios';
  if (/(ajuda|guia|manual|como usar|utilizar|duvida|dúvida|solucao|solução)/.test(q)) return 'ajuda';
  return 'geral';
}
function rememberMonitorInteraction(question) {
  const topic = monitorTopic(question);
  STATE.monitorMemory.totalRequests = (STATE.monitorMemory.totalRequests || 0) + 1;
  STATE.monitorMemory.topics[topic] = (STATE.monitorMemory.topics[topic] || 0) + 1;
  STATE.monitorMemory.lastQuestions = [{ question, topic, at: new Date().toISOString() }, ...(STATE.monitorMemory.lastQuestions || [])].slice(0, 12);
  saveMonitorMemory();
  return topic;
}
function monitorLearningNote(topic) {
  const count = STATE.monitorMemory.topics[topic] || 0;
  const top = topLabel(STATE.monitorMemory.topics || {});
  return `Aprendizado Monitor IA: esta é a ${formatInteger(count)}ª consulta sobre ${topic}; tema mais recorrente até agora: ${top || topic}.`;
}
function updateMonitorRealtimeInsights() {
  if (!DOM.monitorMessages || !STATE.records.length) return;
  const m = computeMetrics(STATE.filtered);
  const signature = [STATE.filters.source, STATE.filters.uf, STATE.filters.status, STATE.filters.month, m.totalRecords, m.delayed, m.occurrences, m.returns, m.ontimeRate].join('|');
  if (signature === STATE.monitorLastSignature) return;
  STATE.monitorLastSignature = signature;
  const risk = m.delayed ? `${formatInteger(m.delayed)} carga(s) fora do prazo` : 'sem atrasos críticos';
  const text = `Insight em tempo real: ${formatInteger(m.totalRecords)} registro(s) no filtro atual, ONTIME ${m.ontimeRate}%, ${risk}, ${formatInteger(m.occurrences)} ocorrência(s) e ${formatInteger(m.returns)} devolução(ões).`;
  STATE.monitorMemory.insights = [{ text, at: new Date().toISOString() }, ...(STATE.monitorMemory.insights || [])].slice(0, 8);
  saveMonitorMemory();
  if (STATE.monitorMemory.insights.length <= 1 || document.body.classList.contains('ai-floating-open')) addAiMessage(text);
}
function askMonitor(question) {
  const topic = rememberMonitorInteraction(question);
  addUserMessage(question);
  const typing = addTypingMessage();
  const generatedReport = maybeGenerateAiRequestedXlsx(question);
  const response = `${generatedReport ? generatedReport.message : answerQuestion(question)}\n\n${monitorLearningNote(topic)}`;
  const delay = Math.min(1700, 650 + Math.max(250, question.length * 8));
  window.setTimeout(() => { removeTypingMessage(typing); addAiMessage(response); }, delay);
}
function maybeGenerateAiRequestedXlsx(question) {
  const q = normalizeText(question);
  const guideOnly = /(como\s+(usar|utilizar|funciona|navegar|exportar|gerar)|onde|guia|manual|ajuda|duvida|duvidas|dúvida|dúvidas)/.test(q) && !/(preciso|quero|gerar\s+relatorio|gerar\s+relatório|xlsx\s+com|excel\s+com|planilha\s+com|relatorio\s+com|relatório\s+com|informacoes\s+de|informações\s+de|campos?\s+de|colunas?\s+de)/.test(q);
  const wantsReport = /(xlsx|excel|planilha|exportar|baixar|download|gerar\s+relatorio|gerar\s+relatório|preciso\s+de\s+(um\s+)?relatorio|preciso\s+de\s+(um\s+)?relatório|relatorio\s+com|relatório\s+com|informacoes\s+de|informações\s+de|campos?\s+de|colunas?\s+de)/.test(q);
  if (!wantsReport || guideOnly) return null;
  const columns = parseAiRequestedColumns(question);
  if (!columns.length && !/(xlsx|excel|planilha|exportar|baixar|download|gerar\s+relatorio|gerar\s+relatório)/.test(q)) return null;
  if (!columns.length) {
    if (!STATE.filtered.length) return { message: 'Não encontrei registros nos filtros atuais para gerar o XLSX. Ajuste os filtros ou peça a base completa.' };
    exportQuickReportXlsx();
    return { message: `Gerei um relatório XLSX consolidado com resumo, status, UFs e base dos ${formatInteger(STATE.filtered.length)} registro(s) filtrados. Se quiser colunas específicas, peça assim: “gerar XLSX com OF, Nota Fiscal, Motorista, Previsão de Entrega e Status”.` };
  }
  const rows = filterRowsForAiReport(question);
  if (!rows.length) return { message: 'Entendi os campos solicitados, mas não encontrei registros compatíveis nos filtros atuais. Tente limpar filtros ou pedir “base completa”.' };
  const table = buildAiRequestedReportRows(rows, columns);
  const filename = `monitor-ia-${columns.map((col) => col.key).slice(0, 4).join('-')}-${dateForFile(new Date())}.xlsx`;
  downloadXlsx(filename, [
    { name: 'Resumo', rows: buildAiReportSummaryRows(question, rows, columns) },
    { name: 'Relatorio IA', rows: table }
  ]);
  return { message: `Pronto! Busquei a base ${aiReportScopeText(question)} e gerei o XLSX com ${formatInteger(rows.length)} registro(s) e as colunas: ${columns.map((col) => col.label).join(', ')}.` };
}
function aiReportColumnDefinitions() {
  return [
    { key: 'origem', label: 'Origem', patterns: [/\borigem\b/, /unidade/, /filial|matriz/], getter: (row) => row.source || '' },
    { key: 'of', label: 'OF', patterns: [/\bof\b/, /ordem\s+de\s+frete/, /numero\s+da\s+carga/, /n\s*carga/], getter: (row) => row.of || '' },
    { key: 'nf', label: 'Nota Fiscal', patterns: [/nota\s+fiscal/, /\bnf\b/, /nfs|notas\s+fiscais/], getter: (row) => row.notaFiscal || '' },
    { key: 'motorista', label: 'Motorista', patterns: [/motorista/, /condutor/, /driver/], getter: (row) => row.motorista || '' },
    { key: 'placa', label: 'Placa', patterns: [/placa/, /cavalo/], getter: (row) => row.placa || '' },
    { key: 'previsao', label: 'Data de previsão de entrega', patterns: [/previs[aã]o\s+(de\s+)?entrega/, /data\s+prevista/, /prev\.?\s+entrega/], getter: (row) => formatDate(row.previsaoEntregaDate) || row.previsaoEntrega || '' },
    { key: 'agenda', label: 'Data da agenda', patterns: [/agenda|agendamento|data\s+agenda/], getter: (row) => formatDate(row.agendaDate) || row.agenda || '' },
    { key: 'status', label: 'Status de entrega', patterns: [/status\s+(de\s+)?entrega/, /status\s+operacional/, /situa[cç][aã]o/, /\bstatus\b/], getter: (row) => displayStatus(row) || row.status || '' },
    { key: 'ontime', label: 'ONTIME', patterns: [/ontime|on\s*time|prazo|sla/], getter: (row) => row.ontimeStatus === true ? 'No prazo' : row.ontimeStatus === false ? 'Fora do prazo' : 'Sem ONTIME' },
    { key: 'cliente', label: 'Cliente', patterns: [/cliente|destinatario|destinat[aá]rio/], getter: (row) => row.cliente || '' },
    { key: 'cidade', label: 'Cidade', patterns: [/cidade|municipio|munic[ií]pio/], getter: (row) => row.cidade || '' },
    { key: 'uf', label: 'UF', patterns: [/\buf\b|estado|destino/], getter: (row) => row.uf || '' },
    { key: 'data-nf', label: 'Data NF', patterns: [/data\s+(da\s+)?nf|data\s+(da\s+)?nota|emiss[aã]o/], getter: (row) => formatDate(row.emissaoDate) || row.emissao || getRawField(row, ['Data NF']) || '' },
    { key: 'saida', label: 'Data saída real', patterns: [/saida|sa[ií]da|expedi[cç][aã]o/], getter: (row) => formatDate(row.saidaDate) || row.saida || '' },
    { key: 'chegada', label: 'Chegada no cliente', patterns: [/chegada|entrega\s+realizada|data\s+da\s+entrega/], getter: (row) => formatDate(row.chegadaClienteDate) || row.chegadaCliente || getRawField(row, ['Data daEntrega', 'Data da Entrega']) || '' },
    { key: 'transportador', label: 'Transportador', patterns: [/transportador|transportadora|transp/], getter: (row) => normalizeTransporterLabel(row.transportadora) || '' },
    { key: 'veiculo', label: 'Tipo de veículo', patterns: [/tipo\s+de\s+veiculo|tipo\s+de\s+veículo|veiculo|veículo|truck|carreta|bitrem/], getter: (row) => normalizeVehicleTypeForProfile(row.tpVeiculo) || row.tpVeiculo || '' },
    { key: 'tipo-carga', label: 'Tipo de carga', patterns: [/tipo\s+de\s+carga|tp\s+carga/], getter: (row) => normalizeCargoTypeForProfile(row.tpCarga) || row.tpCarga || '' },
    { key: 'ocorrencia', label: 'Ocorrência', patterns: [/ocorr[eê]ncia|ocorrencia|problema|avaria/], getter: (row) => row.hasOccurrence ? occurrenceTypeLabel(row) : 'Não' },
    { key: 'descricao-ocorrencia', label: 'Descrição da ocorrência', patterns: [/descri[cç][aã]o\s+da\s+ocorr[eê]ncia|descricao\s+da\s+ocorrencia|motivo\s+ocorr/], getter: (row) => row.occurrenceDescription || row.occurrenceText || '' },
    { key: 'setor', label: 'Setor responsável', patterns: [/setor|respons[aá]vel|responsavel/], getter: (row) => row.setor || '' },
    { key: 'devolucao', label: 'Devolução', patterns: [/devolu[cç][aã]o|devolucao|retorno|reversa/], getter: (row) => row.hasReturn ? 'Sim' : 'Não' },
    { key: 'tipo-devolucao', label: 'Tipo de devolução', patterns: [/tipo\s+de\s+devolu[cç][aã]o|tipo\s+de\s+devolucao/], getter: (row) => row.returnType || '' },
    { key: 'motivo-devolucao', label: 'Motivo de devolução', patterns: [/motivo\s+de\s+devolu[cç][aã]o|motivo\s+de\s+devolucao|motivo\s+dev/], getter: (row) => row.returnReason || '' },
    { key: 'observacao', label: 'Observação', patterns: [/observa[cç][aã]o|observacao|obs\b|coment[aá]rio/], getter: (row) => row.observacao || getRawField(row, ['OBSERVAÇÃO 1', 'Observação', 'OBS']) || '' }
  ];
}
function parseAiRequestedColumns(question) {
  const q = normalizeText(question);
  const defs = aiReportColumnDefinitions();
  const columns = defs.filter((def) => def.patterns.some((pattern) => pattern.test(q)));
  const unique = [];
  columns.forEach((column) => { if (!unique.some((item) => item.key === column.key)) unique.push(column); });
  return unique;
}
function filterRowsForAiReport(question) {
  const q = normalizeText(question);
  let rows = /(base\s+completa|todos\s+os\s+registros|todas\s+as\s+unidades|filial\s+e\s+matriz|matriz\s+e\s+filial)/.test(q) ? STATE.records.slice() : STATE.filtered.slice();
  if (/\bmatriz\b|matriz\s+sp/.test(q) && !/filial\s+e\s+matriz|matriz\s+e\s+filial|todas\s+as\s+unidades/.test(q)) rows = rows.filter((row) => row.source === 'Matriz SP');
  if (/\bfilial\b|filial\s+ba/.test(q) && !/filial\s+e\s+matriz|matriz\s+e\s+filial|todas\s+as\s+unidades/.test(q)) rows = rows.filter((row) => row.source === 'Filial BA');
  if (/(atras|fora\s+do\s+prazo|vencid)/.test(q)) rows = rows.filter((row) => row.delayed || row.ontimeStatus === false);
  if (/\bno\s+prazo\b|dentro\s+do\s+prazo/.test(q) && !/fora\s+do\s+prazo/.test(q)) rows = rows.filter((row) => row.ontimeStatus === true);
  if (/ocorr[eê]ncia|ocorrencia|problema|avaria/.test(q)) rows = rows.filter((row) => row.hasOccurrence);
  if (/devolu[cç][aã]o|devolucao|retorno|reversa/.test(q)) rows = rows.filter((row) => row.hasReturn);
  if (/em\s+tr[aâ]nsito|em\s+transito/.test(q)) rows = rows.filter((row) => row.transit);
  if (/finalizad|entregue|entregas\s+realizadas/.test(q)) rows = rows.filter((row) => row.delivered || row.waitingUnload);
  if (/aguardando\s+descarga|descarga\s+no\s+cliente/.test(q)) rows = rows.filter((row) => row.waitingUnload);
  if (/agenda|agendamento|pr[oó]xim|proxim|d\+2|hoje|amanh[aã]/.test(q)) {
    const today = new Date();
    if (/hoje/.test(q) && !/d\+2|pr[oó]xim|proxim|amanh/.test(q)) rows = rows.filter((row) => isSameDay(row.agendaDate || row.previsaoEntregaDate, today));
    else rows = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2)));
  }
  return rows;
}
function buildAiRequestedReportRows(rows, columns) {
  return [columns.map((column) => column.label), ...rows.map((row) => columns.map((column) => column.getter(row)))];
}
function buildAiReportSummaryRows(question, rows, columns) {
  const m = computeMetrics(rows);
  return [
    ['Relatório Monitor IA'],
    ['Solicitação', question],
    ['Gerado em', formatDateTime(new Date())],
    ['Escopo', aiReportScopeText(question)],
    ['Registros', rows.length],
    ['Notas', m.totalNotes],
    ['Cargas únicas', m.totalLoads],
    ['Fora do prazo', m.delayed],
    ['Performance ONTIME', `${m.ontimeRate}%`],
    ['Colunas', columns.map((column) => column.label).join(', ')]
  ];
}
function aiReportScopeText(question) {
  return /(base\s+completa|todos\s+os\s+registros|todas\s+as\s+unidades|filial\s+e\s+matriz|matriz\s+e\s+filial)/.test(normalizeText(question)) ? 'base completa solicitada' : 'com os filtros atuais do painel';
}
function buildPanelUsageGuide() {
  return 'Guia rápido do painel:\n• Use as abas laterais para navegar por Acompanhamento Geral, Performance, Ocorrências, Devoluções, Mapa, Informações Extras e Montar Relatório.\n• No topo, selecione Filial BA ou Matriz SP e refine por data, mês, UF, status ou busca rápida.\n• Clique em cards, barras, pizzas e linhas da tabela para filtrar, abrir detalhes, imprimir ou exportar XLSX. Clicar novamente no mesmo filtro desfaz a seleção.\n• Em Montar Relatório, marque os blocos desejados, escolha duas informações no gráfico cruzado e alterne entre Barras, Matriz e Ranking.\n• Para exportar pelo Monitor IA, peça em linguagem natural: “gerar XLSX com OF, Nota Fiscal, Motorista, previsão de entrega e status”. Eu busco a base filtrada e baixo a planilha.\nSe a dúvida for operacional, diga o problema, por exemplo: “como resolver atrasos por UF?” ou “o que fazer com devoluções por motivo?”.';
}
function buildSolutionAdvice(question, metrics, delayed, occurrences, returns) {
  const q = normalizeText(question);
  if (/(devolu[cç][aã]o|devolucao|retorno|reversa)/.test(q)) {
    const byReason = countBy(returns, (row) => cleanLabel(row.returnReason) || 'Sem motivo informado');
    const byDriver = countBy(returns, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa');
    return `Plano de ação para devoluções: motivo principal ${topLabel(byReason) || '-'}; motorista/placa mais recorrente ${topLabel(byDriver) || '-'}. Ações sugeridas: validar motivo na planilha, separar notas reincidentes, acionar atendimento/expedição antes da próxima agenda e exportar XLSX da aba Devoluções para tratativa.`;
  }
  if (/(ocorr[eê]ncia|ocorrencia|problema|avaria)/.test(q)) {
    const bySector = countBy(occurrences, (row) => cleanLabel(row.setor) || 'Sem setor');
    const byUf = countBy(occurrences, (row) => row.uf || 'Sem UF');
    return `Plano de ação para ocorrências: setor mais acionado ${topLabel(bySector) || '-'}; UF com maior volume ${topLabel(byUf) || '-'}. Ações sugeridas: abrir a aba Ocorrências, clicar na descrição frequente para ver a base, exportar XLSX, priorizar registros também fora do prazo e registrar tratativa por setor responsável.`;
  }
  const byUfLate = countBy(delayed, (row) => row.uf || 'Sem UF');
  const byCarrierLate = countBy(delayed, (row) => normalizeTransporterLabel(row.transportadora) || 'Sem transportador');
  return `Plano de ação para atrasos/performance: há ${formatInteger(metrics.delayed)} carga(s) fora do prazo; UF crítica ${topLabel(byUfLate) || '-'}; transportador crítico ${topLabel(byCarrierLate) || '-'}. Ações sugeridas: filtrar “Atrasadas / fora do prazo”, abrir a prévia do gráfico por UF/status, exportar XLSX com OF/NF/motorista/previsão/status e acionar o transportador ou motorista antes da próxima agenda.`;
}
function answerQuestion(question) {
  const q = normalizeText(question), rows = STATE.filtered, metrics = computeMetrics(rows), delayed = rows.filter((row) => row.delayed), occurrences = rows.filter((row) => row.hasOccurrence), returns = rows.filter((row) => row.hasReturn);
  if (/(como\s+(usar|utilizar|funciona|navegar|exportar|gerar)|onde|localiz|achar|encontr|guia|manual|ajuda|duvida|dúvida|aba)/.test(q)) return buildPanelUsageGuide();
  if (/(solucao|solução|resolver|acao|ação|acoes|ações|o que fazer|recomend)/.test(q)) return buildSolutionAdvice(question, metrics, delayed, occurrences, returns);
  if (/(relatorio|relatório|resumo|consolid)/.test(q)) return buildQuickReport();
  if (/(atras|fora do prazo|prazo venc)/.test(q)) { const byUf = countBy(delayed, (row) => row.uf || 'Sem UF'); const sample = delayed.slice(0, 5).map((row) => `• ${row.of || row.notaFiscal || 'Carga'} - ${row.cliente || 'cliente não informado'} (${row.uf || '-'})`).join('\n'); return `${formatInteger(delayed.length)} carga(s) estão em atraso nos filtros atuais (${percent(delayed.length, rows.length)} do total). UF mais crítica: ${topLabel(byUf) || 'sem UF'}.\n${sample || 'Não há cargas atrasadas para listar.'}`; }
  if (/(ontime|on time|performance|dentro do prazo|sla)/.test(q)) { const eligible = rows.filter((row) => row.performanceEligible), ontime = eligible.filter((row) => row.ontimeStatus === true).length, late = eligible.filter((row) => row.ontimeStatus === false || row.delayed).length; return `Performance ONTIME da seleção: ${metrics.ontimeRate}%. Base contabilizada: ${formatInteger(eligible.length)} nota(s). Dentro do prazo: ${formatInteger(ontime)}. Fora do prazo: ${formatInteger(late)}. Em trânsito dentro do prazo ou sem fechamento não entra no denominador.`; }
  if (/(ocorr|problema|sinistro|avaria)/.test(q)) { const byUf = countBy(occurrences, (row) => row.uf || 'Sem UF'), bySector = countBy(occurrences, (row) => cleanLabel(row.setor) || 'Sem setor'), byDriver = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(occurrences.length)} ocorrência(s). UF com maior volume: ${topLabel(byUf) || '-'}. Setor mais acionado: ${topLabel(bySector) || '-'}. Motorista/placa com mais registros: ${topLabel(byDriver) || '-'}. Consulte a aba Ocorrências para descrições e linhas detalhadas.`; }
  if (/(devol|retorno|reversa)/.test(q)) { const byReason = countBy(returns, (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), byRegion = countBy(returns, (row) => row.region || 'Sem região'), byDriver = countBy(returns, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Há ${formatInteger(returns.length)} devolução(ões). Motivo principal: ${topLabel(byReason) || '-'}. Região mais impactada: ${topLabel(byRegion) || '-'}. Motorista/placa com maior volume: ${topLabel(byDriver) || '-'}. Abra a aba Devoluções para notas e observações.`; }
  if (/(agenda|hoje|amanha|amanhã|d\+2|proxim)/.test(q)) { const today = new Date(), d2 = rows.filter((row) => isBetweenDays(row.agendaDate || row.previsaoEntregaDate, today, addDays(today, 2))); const list = d2.slice(0, 8).map((row) => `• ${formatDate(row.agendaDate || row.previsaoEntregaDate)} - ${row.of || row.notaFiscal || 'Carga'} - ${row.uf || '-'} - ${truncate(row.cliente || '-', 42)}`).join('\n'); return `${formatInteger(d2.length)} agenda(s) encontradas até D+2.\n${list || 'Nenhuma agenda próxima nos filtros atuais.'}`; }
  if (/(motorista|placa|veiculo|veículo)/.test(q)) { const byTransit = countBy(rows.filter((row) => row.transit), (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'), byOcc = countBy(occurrences, (row) => cleanLabel(row.motorista || row.placa) || 'Sem motorista/placa'); return `Motoristas/placas em trânsito: ${formatInteger(metrics.driversInTransit)}. Maior volume em trânsito: ${topLabel(byTransit) || '-'}. Maior recorrência em ocorrências: ${topLabel(byOcc) || '-'}.`; }
  if (/(total|quant|nota|carga|geral)/.test(q)) return `Nos filtros atuais existem ${formatInteger(metrics.totalNotes)} nota(s), ${formatInteger(metrics.totalLoads)} carga(s), ${formatInteger(metrics.delivered)} finalizada(s), ${formatInteger(metrics.inTransit)} em trânsito, ${formatInteger(metrics.delayed)} atrasada(s), ${formatInteger(metrics.occurrences)} ocorrência(s) e ${formatInteger(metrics.returns)} devolução(ões).`;
  return `Resumo da seleção: ${formatInteger(metrics.totalNotes)} notas, ${formatInteger(metrics.delayed)} atrasos, ${formatInteger(metrics.occurrences)} ocorrências, ${formatInteger(metrics.returns)} devoluções e ONTIME de ${metrics.ontimeRate}%. Pergunte, por exemplo: "quais cargas estão em atraso?", "gerar relatório" ou "onde encontro devoluções por motivo?"`;
}
function addAiMessage(text) { return addMessage(text, 'ai'); }
function addUserMessage(text) { return addMessage(text, 'user'); }
function addTypingMessage() {
  if (!DOM.monitorMessages) return null;
  const div = document.createElement('div');
  div.className = 'chat-message ai typing-message';
  div.innerHTML = '<span>Monitor IA digitando</span><i></i><i></i><i></i>';
  DOM.monitorMessages.appendChild(div);
  DOM.monitorMessages.scrollTop = DOM.monitorMessages.scrollHeight;
  return div;
}
function removeTypingMessage(element) { if (element && element.parentNode) element.parentNode.removeChild(element); }
function addMessage(text, kind) { const div = document.createElement('div'); div.className = `chat-message ${kind}`; div.textContent = text; DOM.monitorMessages.appendChild(div); DOM.monitorMessages.scrollTop = DOM.monitorMessages.scrollHeight; return div; }
function buildQuickReport() {
  const rows = STATE.filtered, m = computeMetrics(rows), byStatus = topEntries(countBy(rows, (row) => displayStatus(row)), 6), byUf = topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 8), byOcc = topEntries(countBy(rows.filter((row) => row.hasOccurrence), (row) => row.uf || 'Sem UF'), 5), byReturn = topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => row.region || 'Sem região'), 5);
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
  const statusRows = [['Status planilha', 'Registros'], ...topEntries(countBy(rows, (row) => displayStatus(row)), 20)];
  const ufRows = [['UF', 'Registros'], ...topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 27)];
  downloadXlsx(`relatorio-monitoramento-${dateForFile(new Date())}.xlsx`, [
    { name: 'Resumo', rows: summaryRows },
    { name: 'Status', rows: statusRows },
    { name: 'UFs', rows: ufRows },
    { name: 'Base', rows: buildExportRows(rows) }
  ]);
}
function showReportExportDialog() {
  if (!STATE.filtered.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  if (DOM.exportReportDialog && typeof DOM.exportReportDialog.showModal === 'function') DOM.exportReportDialog.showModal();
  else exportDynamicReport();
}
function exportDynamicReport() {
  const rows = STATE.filtered;
  if (!rows.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  const selected = getSelectedReportOptions();
  downloadXlsx(`dashboard-rapido-${dateForFile(new Date())}.xlsx`, buildDynamicReportSheets(rows));
  addAiMessage(selected.includes('dynamic') ? 'Relatório dinâmico exportado em XLSX com as tabelas dos blocos selecionados e o cruzamento da Informação Dinâmica.' : 'Relatório exportado em XLSX somente com os blocos selecionados; o gráfico cruzado dinâmico ficou oculto conforme selecionado.');
}
function buildDynamicReportSheets(rows) {
  const selected = getSelectedReportOptions();
  const sheets = [
    { name: 'Resumo', rows: buildReportSummaryRows(rows, selected) }
  ];
  if (selected.includes('performance')) sheets.push({ name: 'Performance', rows: buildPerformanceExportRows(rows) });
  if (selected.includes('status')) sheets.push({ name: 'Status', rows: [['Status planilha', 'Registros'], ...topEntries(countBy(rows, (row) => displayStatus(row)), 50)] });
  if (selected.includes('uf')) sheets.push({ name: 'UF', rows: [['UF', 'Registros'], ...topEntries(countBy(rows, (row) => row.uf || 'Sem UF'), 50)] });
  if (selected.includes('schedules')) sheets.push({ name: 'Agendas D2', rows: buildScheduleExportRows(rows) });
  if (selected.includes('occurrences')) sheets.push({ name: 'Ocorrencias', rows: [['Tipo/descrição', 'Registros'], ...topEntries(countBy(rows.filter((row) => row.hasOccurrence), occurrenceTypeLabel), 100)] });
  if (selected.includes('returns')) sheets.push({ name: 'Devolucoes', rows: [['Motivo', 'Registros'], ...topEntries(countBy(rows.filter((row) => row.hasReturn), (row) => cleanLabel(row.returnReason) || 'Sem motivo informado'), 100)] });
  if (selected.includes('transporters')) sheets.push({ name: 'Transportadores', rows: [['Transportador', 'Registros'], ...topEntries(countBy(rows, (row) => normalizeTransporterLabel(row.transportadora)), 100)] });
  if (selected.includes('dynamic')) sheets.push({ name: 'Informacao Dinamica', rows: buildDynamicExportRows(rows) });
  if (selected.includes('details') || !selected.length) sheets.push({ name: 'Base', rows: buildExportRows(rows) });
  return sheets;
}
function buildReportSummaryRows(rows, selected) {
  const m = computeMetrics(rows);
  return [
    ['Dashboard rápido - Torre de Controle'],
    ['Gerado em', formatDateTime(new Date())],
    ['Blocos selecionados', selected.join(', ') || 'Nenhum bloco selecionado'],
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
}
function buildPerformanceExportRows(rows) {
  const eligible = rows.filter((row) => row.performanceEligible);
  const groupedUf = groupBy(eligible, (row) => row.uf || 'Sem UF');
  const groupedSource = groupBy(eligible, (row) => row.source || 'Sem origem');
  const lines = [['Dimensão', 'Valor', 'Notas elegíveis', 'Dentro do prazo', 'Fora do prazo', 'Performance']];
  Object.entries(groupedSource).forEach(([label, items]) => {
    const ontime = items.filter((row) => row.ontimeStatus === true).length;
    const late = items.filter((row) => row.ontimeStatus === false || row.delayed).length;
    lines.push(['Origem', label, items.length, ontime, late, items.length ? `${Math.round((ontime / items.length) * 100)}%` : '0%']);
  });
  Object.entries(groupedUf).forEach(([label, items]) => {
    const ontime = items.filter((row) => row.ontimeStatus === true).length;
    const late = items.filter((row) => row.ontimeStatus === false || row.delayed).length;
    lines.push(['UF', label, items.length, ontime, late, items.length ? `${Math.round((ontime / items.length) * 100)}%` : '0%']);
  });
  return lines;
}
function buildScheduleExportRows(rows) {
  const today = new Date();
  const scheduled = rows.filter((row) => { const d = row.agendaDate || row.previsaoEntregaDate; return d && isBetweenDays(d, today, addDays(today, 2)); });
  return [['Data', 'Carga/OF', 'NF', 'Cliente', 'UF', 'Cidade', 'Status planilha', 'Status performance'], ...scheduled.map((row) => [formatDate(row.agendaDate || row.previsaoEntregaDate), row.of || '', row.notaFiscal || '', row.cliente || '', row.uf || '', row.cidade || '', displayStatus(row), row.statusBucket || ''])];
}
function buildDynamicExportRows(rows) {
  const defs = getDynamicDimensionDefinitions();
  const keyA = defs[STATE.dynamicMetricA] ? STATE.dynamicMetricA : 'status';
  const keyB = defs[STATE.dynamicMetricB] ? STATE.dynamicMetricB : 'uf';
  const dimA = defs[keyA], dimB = defs[keyB];
  const grouped = {};
  rows.forEach((row) => {
    const a = simplifyDescription(dimA.getter(row));
    const b = simplifyDescription(dimB.getter(row));
    const key = `${a}|||${b}`;
    grouped[key] = (grouped[key] || 0) + 1;
  });
  return [[dimA.label, dimB.label, 'Registros', 'Contabilização'], ...Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([key, value]) => { const [a, b] = key.split('|||'); return [a, b, value, `${dimA.measure} / ${dimB.measure}`]; })];
}
function exportDynamicReportPdf() {
  const rows = STATE.filtered;
  if (!rows.length) { addAiMessage('Não há registros nos filtros atuais para exportar.'); return; }
  const html = buildReportPrintHtml();
  const win = window.open('', '_blank', 'width=1200,height=900');
  if (!win) { addAiMessage('O navegador bloqueou a janela de PDF. Permita pop-ups e tente novamente.'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
  window.setTimeout(() => { try { win.print(); } catch (_) {} }, 450);
  addAiMessage('PDF preparado. Na janela de impressão, escolha “Salvar como PDF” para gerar o arquivo com o painel de gráficos.');
}
function buildReportPrintHtml() {
  const preview = document.getElementById('reportPreview')?.innerHTML || '';
  const selected = getSelectedReportOptions();
  const showDynamic = selected.includes('dynamic');
  const dynamic = showDynamic ? (DOM.dynamicInfoChart?.innerHTML || '') : '';
  const filters = showDynamic ? (DOM.dynamicFilterChips?.innerHTML || '') : '';
  const insights = showDynamic ? (DOM.dynamicInfoInsights?.innerHTML || '') : '';
  const dynamicSection = showDynamic ? `<section class="dynamic-info-panel"><h2>Informação Dinâmica</h2>${dynamic}<div class="dynamic-filter-chips">${filters}</div><div class="insight-list">${insights}</div></section>` : '';
  const orientation = selected.includes('details') || selected.length > 5 ? 'landscape' : 'portrait';
  const pageWidth = orientation === 'landscape' ? '277mm' : '190mm';
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório Torre de Controle</title><link rel="stylesheet" href="styles.css"><style>
    @page{size:A4 ${orientation};margin:8mm}*{box-sizing:border-box}html,body{background:#fff!important;color:#102033!important}body{margin:0;font-family:Inter,Arial,Helvetica,sans-serif}.print-page{width:${pageWidth};max-width:${pageWidth};margin:0 auto;transform-origin:top left}.print-header{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin:0 0 10px;padding:10px 0;border-bottom:2px solid #dfe8f1}.print-header h1{margin:0;font-size:20px}.print-header p{margin:4px 0 0;color:#536474;font-size:11px}.report-preview,.dynamic-info-panel{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px!important}.report-block,.dynamic-info-panel,.insight,.report-bar,.dynamic-matrix-row,.dynamic-bar-item,.dynamic-ranking-row{break-inside:avoid;background:#fff!important;border:1px solid #dfe8f1!important;color:#102033!important;box-shadow:none!important}.report-block.full,.dynamic-info-panel{grid-column:1/-1}.report-block,.dynamic-info-panel{border-radius:14px!important;padding:10px!important}.mini-kpi-row{grid-template-columns:repeat(4,1fr)!important;gap:8px!important}.report-bar,.dynamic-matrix-row,.dynamic-ranking-row{display:grid!important;grid-template-columns:minmax(80px,1fr) minmax(140px,2fr) auto!important;gap:8px!important;align-items:center!important;padding:7px!important;border-radius:10px!important}.dynamic-bar-item{display:grid!important;grid-template-columns:minmax(90px,1fr) minmax(160px,2fr)!important;gap:8px!important;padding:7px!important;border-radius:10px!important}.report-bar i,.dynamic-stack,.dynamic-bar-item i,.dynamic-ranking-row i{height:10px!important;border-radius:999px!important;background:#e8eef6!important;overflow:hidden!important}.report-bar em,.dynamic-stack span,.dynamic-bar-item em,.dynamic-ranking-row em{display:block!important;height:100%!important;background:#2a83c6}.dynamic-filter-chips,.dynamic-legend,.insight-list{display:flex!important;gap:6px!important;flex-wrap:wrap!important}.dynamic-type-buttons,.export-hint,button,.modal-close{display:none!important}.data-table{width:100%;border-collapse:collapse;font-size:9px}.data-table th,.data-table td{border:1px solid #dbe5ef;padding:4px;text-align:left}.table-wrap{max-height:none!important;overflow:visible!important}@media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact}.print-page{page-break-after:auto}.report-preview,.dynamic-info-panel{gap:8px!important}.panel-header{padding:0!important;margin:0 0 6px!important}}
  </style></head><body><main class="print-page"><header class="print-header"><div><h1>Torre de Controle - Monitoramento</h1><p>Gerado em ${escapeHtml(formatDateTime(new Date()))} • ${escapeHtml(STATE.filters.source || 'Todas as unidades')} • ${formatInteger(STATE.filtered.length)} registros</p></div><strong>${orientation === 'landscape' ? 'A4 horizontal' : 'A4 vertical'}</strong></header><section class="report-preview">${preview}</section>${dynamicSection}</main></body></html>`;
}


function buildExportRows(rows) {
  const rawKeys = [...new Set(rows.flatMap((row) => Object.keys(row.raw || {}).filter((key) => !key.startsWith('__'))))];
  const keys = ['Origem', 'Região', 'Status Planilha', 'Status Painel', 'Atrasada', 'ONTIME Painel', 'Motivo Devolução Painel', ...rawKeys];
  return [keys, ...rows.map((row) => keys.map((key) => {
    if (key === 'Origem') return row.source;
    if (key === 'Região') return row.region;
    if (key === 'Status Planilha') return displayStatus(row);
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
function statusColorClass(label) { return STATUS_CLASS[label] || STATUS_CLASS[normalizeBaseStatusLabel(label)] || ''; }
function emptyState(text) { return `<div class="empty-state">${escapeHtml(text)}</div>`; }
function cleanLabel(value) { const text = cleanSpreadsheetValue(value); return text && !/^[-–—.]$/.test(text) ? text : ''; }
function cleanSpreadsheetValue(value) { const text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim(); return isSpreadsheetMissingToken(text) ? '' : text; }
function hasUsableSpreadsheetValue(value) { return isPresent(value) && !isSpreadsheetMissingToken(value); }
function isSpreadsheetMissingToken(value) {
  const raw = String(value == null ? '' : value).trim();
  if (!raw) return true;
  if (/^#\s*(N\/A|NOME\?|NAME\?|REF!?|VALUE!?|VALOR!?|DIV\/0!?|NULL!?|NUM!?|ERRO!?|ERROR!?)$/i.test(raw)) return true;
  const n = normalizeText(raw);
  return /^(n a|na|nd|n d|nao disponivel|não disponivel|nao disponível|não disponível|erro|error|null|nulo|undefined|indefinido)$/.test(n);
}
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
function monthShortName(month) { return ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][Math.max(1, Math.min(12, Number(month) || 1)) - 1]; }
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
