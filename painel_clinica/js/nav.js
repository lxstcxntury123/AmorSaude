/* ═══════════════════════════════════
   nav.js — Navegação entre abas
   ═══════════════════════════════════ */

var PAGE_NAMES = {
  agenda:    "Agenda do Dia",
  exames:    "Exames & Legenda",
  orcamento: "Orçamento",
  doutores:  "Doutores",
  convenios: "Convênios",
  avisos:    "Avisos Importantes",
  links:     "Links Rápidos"
};

function setTab(t) {
  tab = t;
  selExam  = null;
  openConv = null;
  infoOpen = null;
  docOpen  = null;

  ["agenda","exames","orcamento","doutores","convenios","avisos","links"]
    .forEach(function(id) {
      document.getElementById("nav-" + id).className =
        (id === tab) ? "nb on" : "nb";
    });

  document.getElementById("topbar-page").textContent = PAGE_NAMES[t] || "";

  var el = document.getElementById("content");
  el.className = "ct";
  void el.offsetWidth; // força reflow para reiniciar animação
  el.className = "ct anim";

  renderContent();
}
