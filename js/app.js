/* ════════════════════════════════════════════════════════
   app.js — Ponto de entrada (versão async / Sheets)
   ════════════════════════════════════════════════════════ */

var _ASYNC_TABS = ['agenda']; /* abas que buscam dados remotos */

async function renderContent() {
  var el = document.getElementById('content');

  /* Mostrar loading só para abas com fetch remoto */
  if (_ASYNC_TABS.indexOf(tab) !== -1) {
    el.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;' +
      'padding:60px 0;gap:12px;color:var(--t3)">' +
      '<i class="ti ti-loader-2" style="font-size:22px;animation:spin 1s linear infinite"></i>' +
      '<span style="font-size:14px;font-weight:500">Buscando agenda...</span></div>';
  }

  if      (tab === 'agenda')    el.innerHTML = await renderAgenda();
  else if (tab === 'exames')    el.innerHTML = renderExames();
  else if (tab === 'orcamento') el.innerHTML = renderOrcamento();
  else if (tab === 'doutores')  el.innerHTML = renderDoutores();
  else if (tab === 'convenios') el.innerHTML = renderConvenios();
  else if (tab === 'avisos')    el.innerHTML = renderAvisos();
  else if (tab === 'links')     el.innerHTML = renderLinks();
}

/* Init — keyframe do spinner */
var _style = document.createElement('style');
_style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(_style);

renderContent();
