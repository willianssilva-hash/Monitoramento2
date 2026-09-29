# Torre de Controle - Monitoramento

Painel web estático para monitoramento das planilhas públicas:

- **Monitoramento Filial BA**
- **Monitoramento Matriz SP**

A aplicação lê a aba **acompanhamento**/primeira aba publicada das planilhas, consolida os dados e atualiza automaticamente a cada **10 minutos**. Também há botão **Atualizar agora** para atualização manual.

## Funcionalidades

- Cabeçalho com logo Colormaq e título **Torre de Controle - Monitoramento**.
- Abas laterais:
  - **Acompanhamento Geral**: KPIs, status, UF, filiais, insights e tabela detalhada.
  - **Performance de Entregas**: cálculo de ONTIME com base em previsão/chegada/status.
  - **Ocorrências**: total, descrição, setor responsável, UF e motoristas/placas recorrentes.
  - **Devoluções**: tipo, motivos, regiões, motoristas/placas e observações.
  - **Mapa**: mapa interativo por regiões do Brasil, tooltip no hover, painel no clique e alertas do Monitor IA.
- **Monitor IA** local: responde perguntas sobre o recorte carregado, gera relatórios rápidos e orienta onde encontrar informações.
- **News Tracker** no rodapé com agendas D+2, ocorrências, atrasos, devoluções e clima por região.
- Filtros por período, origem, UF, status e busca livre.
- Exportação CSV e relatório TXT.
- Compatível com GitHub Pages; não requer build nem backend.

## Como executar localmente

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Acesse `http://localhost:8080`.

## Publicação no GitHub Pages

O repositório contém workflow em `.github/workflows/pages.yml` para publicar o painel estático no GitHub Pages. Ao habilitar Pages/Actions no GitHub, o deploy usa os arquivos da raiz do projeto.

## Observações técnicas

- As planilhas são consultadas por URL pública publicada (`/pub?output=csv` e `/pubhtml`), com fallback por proxy CORS quando o navegador bloquear leitura direta.
- Se todas as fontes externas ficarem indisponíveis, o painel entra em modo demonstrativo para continuar navegável e exibe alerta no topo.
- O agente **Monitor IA** é uma camada analítica local, baseada nos dados carregados no painel; não envia dados a serviços de IA externos.
