/* ════════════════════════════════════════════
   views/doutores.js — Cadastro de Médicos
   ════════════════════════════════════════════ */

function renderDoutores() {
  var doctors = DB.getDoctors();
  var badge = document.getElementById("badge-doc");
  if (badge) badge.textContent = doctors.length;

  var search = '<input class="doc-search" id="doc-search" ' +
    'placeholder="Buscar doutor ou especialidade..." oninput="filterDoctors()">';

  var cards = "";
  doctors.forEach(function(dr) {
    var isOpen = docOpen === dr.id;
    var body = "";
    if (isOpen) {
      body = '<div class="dcard-body">' +
        '<div class="dcard-row"><i class="ti ti-user-circle"></i>' +
          '<span><span class="lbl">Nome completo:</span>' + dr.fullName + '</span></div>' +
        '<div class="dcard-row"><i class="ti ti-stethoscope"></i>' +
          '<span><span class="lbl">Especialidade:</span>' + dr.spec + '</span></div>' +
        '<div class="dcard-row"><i class="ti ti-id-badge-2"></i>' +
          '<span><span class="lbl">Registro:</span><strong>' + dr.reg + '</strong></span></div>' +
        '<div class="dcard-row"><i class="ti ti-door"></i>' +
          '<span><span class="lbl">Salas:</span>' + dr.rooms + '</span></div>' +
        '<div class="dcard-row"><i class="ti ti-info-circle"></i>' +
          '<span><span class="lbl">Atendimento:</span>' + dr.info + '</span></div>' +
        '</div>';
    }
    cards += '<div class="dcard" id="dcard-' + dr.id + '">' +
      '<div class="dcard-hd" onclick="toggleDoc(\'' + dr.id + '\')">' +
        '<div class="dcard-av"><i class="ti ti-user"></i></div>' +
        '<div>' +
          '<div class="dcard-name">' + dr.name + '</div>' +
          '<div class="dcard-spec">' + dr.spec + '</div>' +
          '<div class="dcard-days"><i class="ti ti-calendar" style="font-size:10px"></i> ' + dr.days + '</div>' +
        '</div>' +
        '<i class="ti ti-chevron-down dcard-chevron' + (isOpen ? " open" : "") + '"></i>' +
      '</div>' +
      body +
      '</div>';
  });

  return '<div class="stitle">Médicos da Clínica</div>' +
    search +
    '<div class="dgrid" id="dgrid">' + cards + '</div>';
}

function toggleDoc(id) {
  docOpen = (docOpen === id) ? null : id;
  document.getElementById("content").innerHTML = renderDoutores();
  var s = document.getElementById("doc-search");
  if (s) s.focus();
}

function filterDoctors() {
  var q = document.getElementById("doc-search").value.toLowerCase();
  var doctors = DB.getDoctors();
  document.querySelectorAll(".dcard").forEach(function(c) {
    var id = c.id.replace("dcard-", "");
    var dr = doctors.find(function(d) { return d.id === id; });
    if (!dr) return;
    var match = dr.name.toLowerCase().includes(q) ||
                dr.spec.toLowerCase().includes(q) ||
                dr.reg.toLowerCase().includes(q)  ||
                dr.fullName.toLowerCase().includes(q);
    c.style.display = match ? "" : "none";
  });
}
