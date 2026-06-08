/* ════════════════════════════════════════════
   views/avisos.js — Avisos Importantes
   ════════════════════════════════════════════ */

function renderAvisos() {
  var notes = DB.getNotes();
  var items = "";
  notes.forEach(function(n) {
    items += '<div class="ncard">' +
      '<i class="ti ' + n.ic + ' nic"></i>' +
      '<div class="ntxt">' + n.t + '</div>' +
      '</div>';
  });
  return '<div class="stitle">Avisos Importantes</div>' + items;
}
