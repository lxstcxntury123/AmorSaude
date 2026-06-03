/* ═══════════════════════════════════════════════════════════
   db.js — Camada de acesso a dados
   ═══════════════════════════════════════════════════════════

   HOJE  → retorna dados estáticos de data.js (síncrono)
   FUTURO → substituir cada método por chamadas ao Google Sheets API

   Como migrar para Sheets:
   ─────────────────────────────────────────────────────────
   1. Criar js/sheets-config.js com SPREADSHEET_ID e API_KEY
   2. Tornar os métodos async:
        getDoctors: async function() {
          const res = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}
             /values/Medicos?key=${API_KEY}`
          );
          const json = await res.json();
          return sheetsRowsToObjects(json.values); // helper de conversão
        }
   3. Atualizar os render* para usar async/await ou .then()
   4. Adicionar loading state durante a busca
   ═══════════════════════════════════════════════════════════ */

var DB = {
  /* Agenda semanal — chave = getDay() (1=Seg…6=Sáb) */
  getSchedule:   function() { return SCHED;      },

  /* Lista de médicos da clínica */
  getDoctors:    function() { return DOCTOR_DB;  },

  /* Guias de atendimento por tipo de exame */
  getExamGuides: function() { return EXAMS;      },

  /* Catálogo de exames para orçamento (com preços) */
  getExamList:   function() { return EXAM_LIST;  },

  /* Procedimentos por convênio */
  getConvenios:  function() { return CONV;       },

  /* Avisos fixos do painel */
  getNotes:      function() { return NOTES;      },

  /* Legenda de siglas */
  getLegend:     function() { return LEGEND;     },

  /* Links rápidos e planilhas */
  getLinks:      function() { return LINKS_DB;   },

  /* Auxiliares de data/hora */
  getDays:       function() { return DAYS;       },
  getMonths:     function() { return MONTHS;     },

  /* Mapa de cores dos passos */
  getColorMap:   function() { return CM;         },
};
