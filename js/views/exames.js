/* ════════════════════════════════════════════
   views/exames.js — Guias de Exames & Legenda
   ════════════════════════════════════════════ */

function renderExames() {
  var exams  = DB.getExamGuides();
  var legend = DB.getLegend();
  var colorMap = DB.getColorMap();

  var tiles = "";
  exams.forEach(function(ex) {
    var isSel = selExam && selExam.id === ex.id;
    tiles += '<button class="etile' + (isSel ? " sel" : "") +
      '" onclick="selectExam(\'' + ex.id + '\')">' +
      (ex.orient ? '<div class="odot"></div>' : '') +
      '<div class="eicon"><i class="ti ' + ex.icon + '"></i></div>' +
      '<div class="ename">' + ex.name + '</div>' +
      '<div class="ecount">' + ex.steps.length + ' ' +
        (ex.steps.length === 1 ? "passo" : "passos") + '</div>' +
      '</button>';
  });

  var panel = "";
  if (selExam) {
    var ex = selExam;
    var steps = "";
    ex.steps.forEach(function(st, i) {
      var cls = colorMap[st.c] || "c-blue";
      var link = st.link
        ? '<a href="' + st.link + '" target="_blank" class="sbtn">' +
          '<i class="ti ti-device-desktop"></i> Abrir sistema ' +
          '<i class="ti ti-external-link"></i></a>'
        : "";
      steps += '<div class="si">' +
        '<div class="snum ' + cls + '">' + (i + 1) + '</div>' +
        '<div class="sbod">' +
          '<div class="slbl"><i class="ti ' + st.ic + '"></i>' + st.l + '</div>' +
          '<div class="sdesc">' + st.d + '</div>' +
          link +
        '</div></div>';
    });
    panel = '<div class="spanel">' +
      '<div class="sph">' +
        '<div class="spt"><i class="ti ' + ex.icon + '"></i>' + ex.name + '</div>' +
        '<button class="spc" onclick="selectExam(\'' + ex.id + '\')"><i class="ti ti-x"></i></button>' +
      '</div>' +
      (ex.orient
        ? '<div class="sp-orient"><i class="ti ti-alert-circle"></i> Tem orientacao medica</div>'
        : '') +
      (ex.obs
        ? '<div class="sp-obs"><i class="ti ti-alert-triangle" style="flex-shrink:0;margin-top:2px"></i>' + ex.obs + '</div>'
        : '') +
      '<div class="sbody">' + steps + '</div>' +
      '</div>';
  }

  var legBody = "";
  if (legOpen) {
    var tiles2 = "";
    legend.forEach(function(l) {
      tiles2 += '<div class="ltile">' +
        '<i class="ti ' + l.ic + '"></i>' +
        '<div class="lkey">' + l.k + '</div>' +
        '<div class="lval">' + l.l + '</div>' +
        '</div>';
    });
    legBody = '<div class="lgrid">' + tiles2 + '</div>';
  }

  return '<div class="stitle">Selecione o exame</div>' +
    '<div style="font-size:11.5px;color:var(--t3);margin-bottom:12px;display:flex;align-items:center;gap:5px">' +
      '<i class="ti ti-circle-dot" style="font-size:9px;color:var(--amb)"></i> Ponto amarelo = tem orientacao medica' +
    '</div>' +
    '<div class="egrid">' + tiles + '</div>' +
    panel +
    '<button class="leg-toggle" onclick="toggleLeg()">' +
      '<i class="ti ti-' + (legOpen ? "chevron-up" : "chevron-down") + '"></i>' +
      (legOpen ? "Ocultar Legenda" : "Ver Legenda & Siglas") +
    '</button>' +
    (legOpen ? legBody : '');
}

function selectExam(id) {
  var exams = DB.getExamGuides();
  selExam = (selExam && selExam.id === id)
    ? null
    : (exams.find(function(e) { return e.id === id; }) || null);
  document.getElementById("content").innerHTML = renderExames();
}

function toggleLeg() {
  legOpen = !legOpen;
  document.getElementById("content").innerHTML = renderExames();
}
