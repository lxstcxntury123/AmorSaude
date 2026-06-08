/**
 * ════════════════════════════════════════════════════════
 *  SCRIPT DA PLANILHA DE CÓDIGOS (Convênios / Exames)
 *  Cole em: Extensões → Apps Script → salve → Implantar
 * ════════════════════════════════════════════════════════
 *
 *  A planilha tem várias seções lado a lado:
 *    [CÓDIGO | NOME]  [CÓDIGO | NOME]  [CÓDIGO | NOME] ...
 *    Raio-X           Laboratoriais    Ginecologia ...
 *
 *  O script detecta os cabeçalhos coloridos automaticamente
 *  (células com fundo não-branco na primeira linha de cada bloco)
 *  e monta um JSON plano:
 *
 *  {
 *    "categorias": {
 *      "EXAMES RAIO-X": [
 *        { "codigo": "0100101", "nome": "RX Torax PA" },
 *        ...
 *      ],
 *      "EXAMES LABORATORIAIS": [...],
 *      ...
 *    }
 *  }
 *
 *  Parâmetro opcional:
 *    GET ?cat=EXAMES LABORATORIAIS  → retorna só essa categoria
 */

function doGet(e) {
  try {
    var sheet  = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var values = sheet.getDataRange().getValues();
    var bgData = sheet.getDataRange().getBackgrounds();
    var numRows = values.length;
    var numCols = values[0].length;

    var categorias = {};

    // Percorrer coluna por coluna em pares (código, nome)
    for (var col = 0; col < numCols - 1; col += 2) {
      var catAtual = null;

      for (var row = 0; row < numRows; row++) {
        var cellVal = String(values[row][col] || '').trim();
        var bg      = bgData[row][col].toLowerCase();

        if (!cellVal) continue;

        // Detectar cabeçalho: célula com fundo colorido (não branco, não vazio)
        var isHeader = bg !== '#ffffff' && bg !== 'white' && bg !== '' && isNaN(Number(cellVal));

        if (isHeader) {
          catAtual = cellVal.toUpperCase();
          if (!categorias[catAtual]) categorias[catAtual] = [];
          continue;
        }

        if (!catAtual) continue;

        var codigo = String(values[row][col]     || '').trim();
        var nome   = String(values[row][col + 1] || '').trim();

        if (codigo && nome) {
          categorias[catAtual].push({ codigo: codigo, nome: nome });
        }
      }
    }

    // Filtrar por categoria se solicitado
    var catParam = e && e.parameter && e.parameter.cat;
    var resultado;
    if (catParam) {
      var key = catParam.toUpperCase();
      resultado = { categoria: key, itens: categorias[key] || [] };
    } else {
      resultado = { categorias: categorias };
    }

    return ContentService
      .createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ erro: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testar() {
  var fakeEvent = { parameter: {} };
  Logger.log(doGet(fakeEvent).getContent().substring(0, 500));
}
