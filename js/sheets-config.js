/* ════════════════════════════════════════════════════════
   sheets-config.js — URLs dos Apps Scripts implantados
   ════════════════════════════════════════════════════════
   Após implantar cada script no Google Sheets,
   cole a URL gerada abaixo.

   Como obter a URL:
     1. Extensões → Apps Script
     2. Implantar → Nova implantação
     3. Tipo: App da Web
     4. Executar como: Eu
     5. Quem pode acessar: Qualquer pessoa
     6. Copiar a URL
   ════════════════════════════════════════════════════════ */

var SHEETS_CONFIG = {
  /* Planilha de agendas e horários */
  AGENDA_URL: "https://script.google.com/macros/s/AKfycbwo10yLP-VDa2CYvzuLSTxC2I5lMAUFuL9xCkzPMsvOZqxBP38kfv02fbQ1IKUxw8DHUw/exec",

  /* Planilha de códigos de convênios / exames */
  CODIGOS_URL: "https://script.google.com/macros/s/AKfycbxK1CEBlTrs1r-Rq4NMyc4RqdJ9INx4-7CHE0kHXDVzoQl5nGexfYEOB2WDnFjVzhBVnA/exec",

  /* Timeout de cache em ms (5 minutos) — evita bater na API toda navegação */
  CACHE_TTL: 5 * 60 * 1000,
};
