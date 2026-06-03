/* ═══════════════════════════════════════
   state.js — Estado global da aplicação
   ═══════════════════════════════════════ */

var tab       = "agenda"; // aba ativa
var selExam   = null;     // guia de exame selecionada
var openConv  = null;     // convênio aberto
var legOpen   = false;    // legenda visível
var docOpen   = null;     // card de doutor aberto
var infoOpen  = null;     // painel de info da agenda aberto
var slotDone  = {};       // slots encerrados: { "dow-idx": true }
var slots     = [];       // lista de slots do dia atual
var orcDoc    = "";       // id do doutor no orçamento
var orcPatient= "";       // nome do paciente no orçamento
var orcSel    = {};       // exames selecionados: { examId: true }
