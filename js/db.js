/* ═══════════════════════════════════════════════════════════
   db.js — Camada de acesso a dados (com Google Sheets)
   ═══════════════════════════════════════════════════════════

   Métodos que já buscam do Sheets → async (retornam Promise)
   Métodos ainda estáticos       → sync (retornam valor direto)
   ═══════════════════════════════════════════════════════════ */

/* Cache em memória para não bater na API a cada clique */
var _cache = {};

function _cached(key, ttl, fetcher) {
  var now = Date.now();
  if (_cache[key] && (now - _cache[key].ts) < ttl) {
    return Promise.resolve(_cache[key].data);
  }
  return fetcher().then(function(data) {
    _cache[key] = { data: data, ts: now };
    return data;
  });
}

/* ── Transformação: array plano → formato {rooms:[...]} ──
   Converte os dados da planilha para o formato que
   renderAgenda() já espera, sem mudar a view.
   ──────────────────────────────────────────────────────── */
function _medicosParaRooms(medicos) {
  var salasMap = {};

  medicos.forEach(function(m) {
    var sala    = String(m['SALAS']          || '').trim();
    var apelido = String(m['APELIDO']        || '').trim();
    var periodo = String(m['PERÍODO']        || m['PERIODO'] || '').trim();
    var inicio  = String(m['INICIO AGENDA']  || '').trim();
    var fim     = String(m['FINAL AGENDA']   || '').trim();

    if (!sala || !apelido) return;

    if (!salasMap[sala]) salasMap[sala] = { s: sala, m: null, t: null };

    var entry = { d: apelido, i: inicio, f: fim };

    if      (periodo === 'Manhã')    salasMap[sala].m = entry;
    else if (periodo === 'Tarde')    salasMap[sala].t = entry;
    else if (periodo === 'Integral') {
      /* Integral: aparece nos dois turnos */
      salasMap[sala].m = entry;
      salasMap[sala].t = entry;
    }
  });

  return { rooms: Object.values(salasMap) };
}

/* ── DB ────────────────────────────────────────────────── */
var DB = {

  /* AGENDA — busca do Sheets, filtra pelo dia de hoje
     Retorna: { rooms: [{s, m, t}, ...] }  (mesmo formato anterior) */
  getSchedule: function() {
    var url = SHEETS_CONFIG.AGENDA_URL;

    /* Fallback para dados estáticos se URL não configurada */
    if (!url || url.indexOf('COLE_AQUI') !== -1) {
      console.warn('AGENDA_URL não configurada — usando dados estáticos');
      var dow = new Date().getDay();
      var today = SCHED[dow];
      return Promise.resolve(today || { rooms: [] });
    }

    return _cached('agenda_hoje', SHEETS_CONFIG.CACHE_TTL, function() {
      return fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(json) {
          if (json.erro) throw new Error(json.erro);
          return _medicosParaRooms(json.medicos || []);
        })
        .catch(function(err) {
          console.error('Erro ao buscar agenda:', err);
          /* Fallback: dados estáticos */
          var dow = new Date().getDay();
          return SCHED[dow] || { rooms: [] };
        });
    });
  },

  /* CÓDIGOS DE EXAMES — busca do Sheets
     Retorna: { "EXAMES RAIO-X": [{codigo, nome}], ... } */
  getCodigos: function() {
    var url = SHEETS_CONFIG.CODIGOS_URL;

    if (!url || url.indexOf('COLE_AQUI') !== -1) {
      console.warn('CODIGOS_URL não configurada');
      return Promise.resolve({});
    }

    return _cached('codigos', SHEETS_CONFIG.CACHE_TTL * 12, function() {
      return fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(json) { return json.categorias || {}; })
        .catch(function(err) {
          console.error('Erro ao buscar códigos:', err);
          return {};
        });
    });
  },

  /* Limpar cache manualmente (útil para forçar refresh) */
  limparCache: function() {
    _cache = {};
    console.log('Cache limpo');
  },

  /* ── Dados ainda estáticos (migrar futuramente) ──── */
  getDoctors:    function() { return DOCTOR_DB;  },
  getExamGuides: function() { return EXAMS;      },
  getExamList:   function() { return EXAM_LIST;  },
  getConvenios:  function() { return CONV;       },
  getNotes:      function() { return NOTES;      },
  getLegend:     function() { return LEGEND;     },
  getLinks:      function() { return LINKS_DB;   },
  getDays:       function() { return DAYS;       },
  getMonths:     function() { return MONTHS;     },
  getColorMap:   function() { return CM;         },
};
