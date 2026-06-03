/* ════════════════════════════════════════════
   app.js — Ponto de entrada da aplicação
   ════════════════════════════════════════════ */

function renderContent() {
  var el = document.getElementById("content");
  if      (tab === "agenda")    el.innerHTML = renderAgenda();
  else if (tab === "exames")    el.innerHTML = renderExames();
  else if (tab === "orcamento") el.innerHTML = renderOrcamento();
  else if (tab === "doutores")  el.innerHTML = renderDoutores();
  else if (tab === "convenios") el.innerHTML = renderConvenios();
  else if (tab === "avisos")    el.innerHTML = renderAvisos();
  else if (tab === "links")     el.innerHTML = renderLinks();
}

/* Init */
renderContent();
