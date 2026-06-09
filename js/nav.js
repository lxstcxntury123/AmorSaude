/* nav.js */
var PAGE_NAMES = {
  agenda:     "Agenda do Dia",
  exames:     "Exames & Legenda",
  orcamento:  "Orçamento",
  doutores:   "Doutores",
  convenios:  "Convênios",
  avisos:     "Avisos Importantes",
  links:      "Links Rápidos",
  antibo:     "Anti-BO · Contingência",
  mamografia: "Relatório de Mamografia"
};

function setTab(t) {
  tab = t;
  selExam  = null;
  openConv = null;
  infoOpen = null;
  docOpen  = null;

  var danger = { antibo: true, mamografia: true };

  ["agenda","exames","orcamento","doutores","convenios","avisos","links","antibo","mamografia"]
    .forEach(function(id) {
      var el = document.getElementById("nav-" + id);
      if (!el) return;
      var base = danger[id] ? "nb nb-danger" : "nb";
      el.className = (id === t) ? base + " on" : base;
    });

  document.getElementById("topbar-page").textContent = PAGE_NAMES[t] || "";

  var el = document.getElementById("content");
  el.className = "ct";
  void el.offsetWidth;
  el.className = "ct anim";

  renderContent();
}
