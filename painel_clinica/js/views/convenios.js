/* ════════════════════════════════════════════
   views/convenios.js — Procedimentos por Convênio
   ════════════════════════════════════════════ */

function renderConvenios() {
  var conv = DB.getConvenios();
  var cards = "";

  Object.keys(conv).forEach(function(key) {
    var cv = conv[key];
    var isOpen = openConv === key;
    var steps = "";
    if (isOpen) {
      cv.steps.forEach(function(s, i) {
        steps += '<div class="cstep">' +
          '<div class="cnum ' + cv.nc + '">' + (i + 1) + '</div>' +
          '<div class="ctxt">' + s + '</div>' +
          '</div>';
      });
    }
    cards += '<div class="ccard">' +
      '<div class="chd" onclick="toggleConv(\'' + key + '\')">' +
        '<div class="chl">' +
          '<i class="ti ti-id-badge-2" style="font-size:20px;color:var(--g500)"></i>' +
          '<div class="chn">' + cv.name + '</div>' +
          '<span class="cpill ' + cv.pill + '">' + cv.name + '</span>' +
        '</div>' +
        '<i class="ti ti-chevron-' + (isOpen ? "up" : "down") + '" style="color:var(--t3)"></i>' +
      '</div>' +
      (isOpen ? '<div class="cbod">' + steps + '</div>' : '') +
      '</div>';
  });

  return '<div class="stitle">Procedimentos por Convênio</div>' + cards;
}

function toggleConv(k) {
  openConv = (openConv === k) ? null : k;
  document.getElementById("content").innerHTML = renderConvenios();
}
