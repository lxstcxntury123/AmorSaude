/* ═══════════════════════════════
   utils.js — Funções utilitárias
   ═══════════════════════════════ */

function pad(n) {
  return String(n).padStart(2, "0");
}

function fmtPrice(p) {
  return "R$ " + p.toFixed(2).replace(".", ",");
}
