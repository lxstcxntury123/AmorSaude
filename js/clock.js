/* ═══════════════════════════════════
   clock.js — Relógio e data do topo
   ═══════════════════════════════════ */

function tick() {
  var now = new Date();
  var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

  document.getElementById("clock").textContent =
    pad(h) + ":" + pad(m) + ":" + pad(s);

  var isManha = h < 13;
  var pill = document.getElementById("ppill");
  if (isManha) {
    pill.className = "ppill pm";
    pill.innerHTML = '<i class="ti ti-sun"></i>&nbsp;Manhã';
  } else {
    pill.className = "ppill pt";
    pill.innerHTML = '<i class="ti ti-moon"></i>&nbsp;Tarde';
  }

  var days   = DB.getDays();
  var months = DB.getMonths();
  document.getElementById("topbar-date").textContent =
    days[now.getDay()] + ", " + now.getDate() +
    " de " + months[now.getMonth()] + ". de " + now.getFullYear();
}

setInterval(tick, 1000);
tick();
