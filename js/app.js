/* app.js */
var _ASYNC_TABS = ['agenda'];

async function renderContent() {
  var el = document.getElementById('content');

  if (_ASYNC_TABS.indexOf(tab) !== -1) {
    el.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;padding:60px 0;gap:12px;color:var(--t3)">' +
      '<i class="ti ti-loader-2" style="font-size:22px;animation:spin 1s linear infinite"></i>' +
      '<span style="font-size:14px;font-weight:500">Buscando dados...</span></div>';
  }

  try {
    if      (tab === 'agenda')     el.innerHTML = await renderAgenda();
    else if (tab === 'exames')     el.innerHTML = renderExames();
    else if (tab === 'orcamento')  el.innerHTML = renderOrcamento();
    else if (tab === 'doutores')   el.innerHTML = renderDoutores();
    else if (tab === 'convenios')  el.innerHTML = renderConvenios();
    else if (tab === 'avisos')     el.innerHTML = renderAvisos();
    else if (tab === 'links')      el.innerHTML = renderLinks();
    else if (tab === 'antibo')     el.innerHTML = renderAntibo();
    else if (tab === 'mamografia') el.innerHTML = renderMamografia();
  } catch(e) {
    el.innerHTML =
      '<div style="padding:40px;color:#E84B4B;font-size:13px">' +
      '<strong>Erro ao carregar:</strong> ' + e.message + '</div>';
    console.error('renderContent error:', e);
  }
}

var _ss = document.createElement('style');
_ss.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(_ss);

renderContent();
