/* ════════════════════════════════════════════
   views/links.js — Links Rápidos & Planilhas
   ════════════════════════════════════════════ */

function renderLinks() {
  var linksDb = DB.getLinks();
  var html = '<div class="stitle">Central de Links e Planilhas</div><div class="lk-grid">';

  linksDb.forEach(function(card) {
    var itemsHtml = '';

    // Links diretos
    if (card.items) {
      card.items.forEach(function(it) {
        itemsHtml += '<a href="' + it.u + '" target="_blank" class="lk-item">' +
          '<i class="ti ti-external-link"></i> ' + it.n + '</a>';
      });
    }

    // Links agrupados por especialidade
    if (card.groups) {
      card.groups.forEach(function(grp) {
        itemsHtml += '<div class="lk-sub">' + grp.sub + '</div>';
        grp.items.forEach(function(it) {
          itemsHtml += '<a href="' + it.u + '" target="_blank" class="lk-item">' +
            '<i class="ti ti-external-link"></i> ' + it.n + '</a>';
        });
      });
    }

    html += '<div class="lk-card">' +
      '<div class="lk-hd"><i class="ti ' + card.icon + '"></i> ' + card.title + '</div>' +
      '<div class="lk-body">' + itemsHtml + '</div>' +
      '</div>';
  });

  html += '</div>';
  return html;
}
