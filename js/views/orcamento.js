/* ════════════════════════════════════════════
   views/orcamento.js — Orçamento de Exames
   ════════════════════════════════════════════ */

function renderOrcamento() {
  var now = new Date();
  var dateStr = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  var doctors  = DB.getDoctors();
  var examList = DB.getExamList();

  var docOpts = '<option value="">-- Selecione o doutor --</option>';
  doctors.forEach(function(dr) {
    docOpts += '<option value="' + dr.id + '"' +
      (orcDoc === dr.id ? ' selected' : '') + '>' +
      dr.name + ' - ' + dr.spec + '</option>';
  });

  var drName = "Dr(a): ___________________";
  if (orcDoc) {
    var d = doctors.find(function(x) { return x.id === orcDoc; });
    if (d) drName = d.name;
  }

  var catHtml = "";
  examList.forEach(function(cat) {
    var examItems = "";
    cat.exams.forEach(function(ex) {
      var isSel = !!orcSel[ex.id];
      var priceLabel = ex.price > 0
        ? fmtPrice(ex.price)
        : '<span style="font-size:9.5px;color:#bbb">a configurar</span>';
      examItems += '<div class="lexam' + (isSel ? " sel" : "") +
        '" id="lex-' + ex.id + '" onclick="toggleExam(\'' + ex.id + '\')">' +
        '<div class="lcb" id="cb-' + ex.id + '">' + (isSel ? "&#10003;" : "") + '</div>' +
        '<span class="lexam-name" id="nm-' + ex.id + '">' + ex.name + '</span>' +
        '<span class="lexam-price">' + priceLabel + '</span>' +
        '</div>';
    });
    catHtml += '<div class="laudo-cat">' +
      '<div class="laudo-cat-hd ' + cat.cls + '"><i class="ti ti-clipboard-list"></i> ' + cat.cat + '</div>' +
      '<div class="laudo-exams">' + examItems + '</div>' +
      '</div>';
  });

  return '<div class="stitle">Orçamento Automático</div>' +
    '<div class="orc-controls">' +
      '<select class="orc-select" onchange="setOrcDoc(this.value)">' + docOpts + '</select>' +
      '<input class="orc-input" id="orc-patient" placeholder="Nome do paciente..." value="' +
        orcPatient + '" oninput="orcPatient=this.value">' +
    '</div>' +
    '<div class="orc-layout">' +
      '<div class="laudo">' +
        '<div class="laudo-top">' +
          '<div>' +
            '<div class="laudo-clinic">Amor Saúde</div>' +
            '<div class="laudo-clinic-sub">Solicitação de Exames</div>' +
          '</div>' +
          '<div class="laudo-stamp">' +
            '<div class="laudo-stamp-txt">Data</div>' +
            '<div class="laudo-stamp-date">' + dateStr + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="laudo-meta">' +
          '<div><div class="laudo-meta-field">Médico Solicitante</div><div class="laudo-meta-val">' + drName + '</div></div>' +
          '<div><div class="laudo-meta-field">Paciente</div>' +
            '<div class="laudo-meta-val" id="laudo-patient">' + (orcPatient || '___________________') + '</div></div>' +
        '</div>' +
        '<div class="laudo-cats">' + catHtml + '</div>' +
      '</div>' +
      '<div id="orc-sum-wrap">' + renderOrcSummary() + '</div>' +
    '</div>';
}

function renderOrcSummary() {
  var examList = DB.getExamList();
  var total = 0;
  var selected = [];

  examList.forEach(function(cat) {
    cat.exams.forEach(function(ex) {
      if (orcSel[ex.id]) { total += ex.price; selected.push(ex); }
    });
  });

  if (selected.length === 0) {
    return '<div class="orc-summary">' +
      '<div class="orc-sum-hd"><span class="orc-sum-title">Orçamento</span></div>' +
      '<div class="orc-sum-body"><div class="orc-sum-empty">' +
        '<i class="ti ti-clipboard" style="font-size:28px;display:block;margin-bottom:8px;opacity:.4"></i>' +
        'Nenhum exame selecionado</div></div>' +
      '<div class="orc-sum-foot"><div class="orc-total">' +
        '<span class="orc-total-lbl">Total</span>' +
        '<span class="orc-total-val">R$ 0,00</span>' +
      '</div></div></div>';
  }

  var items = "";
  selected.forEach(function(ex) {
    var priceStr = ex.price > 0 ? fmtPrice(ex.price) : '—';
    items += '<div class="orc-sum-item">' +
      '<span class="orc-sum-item-name">' + ex.name + '</span>' +
      '<span class="orc-sum-item-price">' + priceStr + '</span>' +
      '<button class="orc-sum-rm" onclick="toggleExam(\'' + ex.id + '\')" title="Remover">' +
        '<i class="ti ti-x"></i></button>' +
      '</div>';
  });

  var anyPending = selected.some(function(e) { return e.price === 0; });

  return '<div class="orc-summary">' +
    '<div class="orc-sum-hd">' +
      '<span class="orc-sum-title">Orçamento ' +
        '<span class="orc-count-badge">' + selected.length + '</span></span>' +
      '<button class="orc-clear" onclick="clearOrc()">Limpar</button>' +
    '</div>' +
    '<div class="orc-sum-body">' + items + '</div>' +
    '<div class="orc-sum-foot">' +
      '<div class="orc-total">' +
        '<span class="orc-total-lbl">Total</span>' +
        '<span class="orc-total-val">' + (total > 0 ? fmtPrice(total) : "—") + '</span>' +
      '</div>' +
      (anyPending ? '<div class="orc-pending">* Alguns preços ainda não configurados</div>' : '') +
    '</div></div>';
}

function toggleExam(id) {
  orcSel[id] = !orcSel[id];
  var cb  = document.getElementById("cb-" + id);
  var nm  = document.getElementById("nm-" + id);
  var lex = document.getElementById("lex-" + id);
  if (cb)  cb.innerHTML = orcSel[id] ? "&#10003;" : "";
  if (nm)  nm.className = "lexam-name" + (orcSel[id] ? " on" : "");
  if (lex) lex.className = "lexam" + (orcSel[id] ? " sel" : "");
  var sw = document.getElementById("orc-sum-wrap");
  if (sw) sw.innerHTML = renderOrcSummary();
  var lp = document.getElementById("laudo-patient");
  if (lp) lp.textContent = orcPatient || "___________________";
}

function setOrcDoc(val) {
  orcDoc = val;
  if (tab === "orcamento") document.getElementById("content").innerHTML = renderOrcamento();
}

function clearOrc() {
  orcSel = {};
  if (tab === "orcamento") document.getElementById("content").innerHTML = renderOrcamento();
}
