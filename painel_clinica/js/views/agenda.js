/* ════════════════════════════════════════════
   views/agenda.js — Agenda do Dia
   ════════════════════════════════════════════ */

function findDoctor(name) {
  if (!name) return null;
  var doctors = DB.getDoctors();
  for (var i = 0; i < doctors.length; i++) {
    var dr = doctors[i];
    if (dr.name.toLowerCase() === name.toLowerCase()) return dr;
    if (dr.alias && dr.alias.toLowerCase() === name.toLowerCase()) return dr;
  }
  return null;
}

function renderAgenda() {
  var now = new Date();
  var dow = now.getDay();
  var isManha = now.getHours() < 13;
  var schedule = DB.getSchedule();
  var today = schedule[dow];
  slots = [];

  if (!today || dow === 0) {
    return '<div style="text-align:center;padding:60px 0;color:var(--t3)">' +
      '<i class="ti ti-moon" style="font-size:40px;display:block;margin-bottom:12px"></i>' +
      '<div style="font-size:15px;font-weight:600">Sem agenda para hoje</div></div>';
  }

  today.rooms.forEach(function(r) {
    if (r.m) slots.push({sala: r.s, period: "m", doc: r.m.d});
    if (r.t) slots.push({sala: r.s, period: "t", doc: r.t.d});
  });

  var activeCount = today.rooms.filter(function(r) { return r.m || r.t; }).length;
  var badge = document.getElementById("badge-agenda");
  if (badge) badge.textContent = activeCount;

  function slotIdx(sala, period) {
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].sala === sala && slots[i].period === period) return i;
    }
    return -1;
  }

  function isDone(idx) { return !!slotDone[dow + "-" + idx]; }

  function buildCell(r, period, isLit) {
    var entry = r[period];
    if (!entry) return '<div class="emp">—</div>';
    var idx = slotIdx(r.s, period);
    var done = isDone(idx);
    var lc = isLit ? " lit" : "";
    var dc = done ? " done-txt" : "";
    var timeStr = (entry.i || entry.f)
      ? (entry.i + (entry.i && entry.f ? " - " : "") + entry.f)
      : "";
    return '<div class="dc' + lc + '">' +
      '<div class="dc-info">' +
        '<div class="dn' + lc + dc + '">' + entry.d + '</div>' +
        (timeStr ? '<div class="dt' + lc + '">' + timeStr + '</div>' : '') +
      '</div>' +
      '<div class="dc-acts">' +
        '<button class="act act-done' + (done ? " is-done" : "") +
          '" onclick="toggleDone(' + idx + ')" title="' + (done ? "Reativar" : "Encerrar") + '">' +
          '<i class="ti ' + (done ? "ti-rotate-clockwise" : "ti-check") + '"></i></button>' +
        '<button class="act act-info' + (infoOpen === idx ? " is-open" : "") +
          '" onclick="toggleSlotInfo(' + idx + ')" title="Info do doutor">' +
          '<i class="ti ti-zoom-in"></i></button>' +
      '</div></div>';
  }

  function buildInfoPanel(idx) {
    var sl = slots[idx];
    if (!sl) return '';
    var dr    = findDoctor(sl.doc);
    var spec  = dr ? dr.spec     : "—";
    var reg   = dr ? dr.reg      : "—";
    var info  = dr ? dr.info     : "Informações não cadastradas.";
    var rooms = dr ? dr.rooms    : sl.sala;
    var full  = dr ? dr.fullName : sl.doc;
    return '<div class="ipanel">' +
      '<span class="ipanel-tag"><i class="ti ti-zoom-in"></i> Info do Doutor</span>' +
      '<div class="ipanel-name">' + sl.doc + '</div>' +
      '<div style="font-size:11px;color:var(--t3);">' + full + '</div>' +
      (spec && spec !== "—" ? '<div class="ipanel-spec">' + spec + '</div>' : '') +
      '<div class="ipanel-reg">' + reg + ' &nbsp;·&nbsp; Salas: ' + rooms + '</div>' +
      '<div class="ipanel-body">' + info + '</div>' +
      '</div>';
  }

  var rows = "";
  today.rooms.forEach(function(r) {
    if (!r.m && !r.t) return;
    var mIdx = r.m ? slotIdx(r.s, "m") : -1;
    var tIdx = r.t ? slotIdx(r.s, "t") : -1;
    var activeNow = (isManha && r.m) || (!isManha && r.t);
    var mDone = mIdx >= 0 && isDone(mIdx);
    var tDone = tIdx >= 0 && isDone(tIdx);
    var allDone = (!r.m || mDone) && (!r.t || tDone);
    var showInfo = infoOpen !== null && (infoOpen === mIdx || infoOpen === tIdx);
    rows += '<div class="rw' + (activeNow ? " ar" : "") + (allDone ? " done-row" : "") + '">' +
      '<div class="srow">' +
        '<div class="sala">' + r.s + '</div>' +
        buildCell(r, "m", isManha) +
        buildCell(r, "t", !isManha) +
      '</div>' +
      (showInfo ? buildInfoPanel(infoOpen) : '') +
      '</div>';
  });

  return '<div class="hint"><span class="hdot"></span> Destaque = turno atual (' +
    (isManha ? "Manhã" : "Tarde") +
    ') &nbsp;·&nbsp; <i class="ti ti-check" style="font-size:12px;color:var(--g500)"></i> Encerrar' +
    ' &nbsp;·&nbsp; <i class="ti ti-zoom-in" style="font-size:12px;color:#6366F1"></i> Ver info</div>' +
    '<div class="sw">' +
      '<div class="sh"><div>Sala</div><div>Manhã</div><div>Tarde</div></div>' +
      rows +
    '</div>';
}

function toggleDone(idx) {
  var dow = new Date().getDay();
  var key = dow + "-" + idx;
  slotDone[key] = !slotDone[key];
  if (tab === "agenda") document.getElementById("content").innerHTML = renderAgenda();
}

function toggleSlotInfo(idx) {
  infoOpen = (infoOpen === idx) ? null : idx;
  if (tab === "agenda") document.getElementById("content").innerHTML = renderAgenda();
}
