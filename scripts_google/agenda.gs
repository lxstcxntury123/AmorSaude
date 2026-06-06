/**
 * ════════════════════════════════════════════════════════
 *  SCRIPT DA PLANILHA DE AGENDA
 *  Cole em: Extensões → Apps Script → salve → Implantar
 * ════════════════════════════════════════════════════════
 *
 *  Uso:
 *    GET  ?data=2026-06-22    → agenda do dia 22/06
 *    GET  (sem parâmetro)     → agenda de HOJE
 *
 *  Resposta JSON:
 *  {
 *    "data": "22/06/2026",
 *    "diaSemana": "segunda-feira",
 *    "medicos": [
 *      { "DATA": "22/06/2026", "SALAS": "Sala 4",
 *        "APELIDO": "Dra. Debora Alessi",
 *        "ESPECIALIDADE": "Ginecologia e Psiquiatria",
 *        "PERÍODO": "Integral",
 *        "INICIO AGENDA": "09:00", "FINAL AGENDA": "18:00",
 *        "CONCLUÍDA?": "Não", ... }
 *    ]
 *  }
 */

var TIMEZONE = 'America/Sao_Paulo';

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var targetDate = resolveTargetDate(e);
    var targetStr  = Utilities.formatDate(targetDate, TIMEZONE, 'dd/MM/yyyy');

    var values  = sheet.getDataRange().getValues();
    var headers = values[0].map(function(h) { return String(h).trim(); });
    var medicos = [];
    var diaSemana = '';

    for (var i = 1; i < values.length; i++) {
      var row = values[i];

      // Pular linhas sem data
      if (!row[0]) continue;

      // Comparar data da linha com o alvo
      var dateStr = formatCell(row[0]);
      if (dateStr !== targetStr) continue;

      // Pular linhas sem médico (coluna APELIDO = índice 3)
      var apelido = String(row[3] || '').trim();
      if (!apelido) continue;

      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        if (!headers[j]) continue;
        obj[headers[j]] = formatCell(row[j]);
      }
      medicos.push(obj);
      if (!diaSemana && obj['DIA']) diaSemana = obj['DIA'];
    }

    var payload = JSON.stringify({
      data:      targetStr,
      diaSemana: diaSemana,
      medicos:   medicos
    });

    return ContentService
      .createTextOutput(payload)
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ erro: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ── Helpers ─────────────────────────────────────────── */

function resolveTargetDate(e) {
  if (e && e.parameter && e.parameter.data) {
    // formato esperado: YYYY-MM-DD
    var parts = e.parameter.data.split('-');
    return new Date(
      parseInt(parts[0]),
      parseInt(parts[1]) - 1,
      parseInt(parts[2])
    );
  }
  var hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return hoje;
}

function formatCell(val) {
  if (val === '' || val === null || val === undefined) return '';
  if (!(val instanceof Date)) return String(val);

  // Horários vêm como Date com ano 1899 ou 1900 (fração do dia)
  var year = val.getFullYear();
  if (year <= 1900) {
    return Utilities.formatDate(val, TIMEZONE, 'HH:mm');
  }
  return Utilities.formatDate(val, TIMEZONE, 'dd/MM/yyyy');
}

/* ── Teste local (rodar pelo script editor) ─────────── */
function testar() {
  var fakeEvent = { parameter: { data: '2026-06-22' } };
  Logger.log(doGet(fakeEvent).getContent());
}
