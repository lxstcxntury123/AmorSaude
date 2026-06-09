/* ═══════════════════════════════════════════════════════
   views/mamografia.js — Relatório de Mamografia
   Completamente independente — não depende de antibo.js
   ═══════════════════════════════════════════════════════ */

var mamoLesoes = { esq: {}, dir: {} };
var _mamoAns   = {};

var MAMO_QS = [
  { id:'mamantes',  txt:'Realizou exame mam\xf3grafo antes?',                   extra:'trouxe'    },
  { id:'cirurgia',  txt:'Realizou cirurgia, pun\xe7\xe3o ou bi\xf3psia nas mamas?', nota:true     },
  { id:'nodulo',    txt:'Palpou n\xf3dulo ou observou altera\xe7\xf5es nas mamas?', nota:true     },
  { id:'dor',       txt:'Sente dor nas mamas?',                                 nota:true         },
  { id:'filhos',    txt:'Tem filhos?',                                          extra:'amamentou'  },
  { id:'reposicao', txt:'Faz reposi\xe7\xe3o hormonal?',                        nota:true         },
  { id:'protese',   txt:'Possui pr\xf3tese mam\xe1ria?',                        nota:true         },
  { id:'anticonc',  txt:'Usa anticoncepcional?',                                nota:true         },
  { id:'menopausa', txt:'Menopausa',                                            nota:true         },
  { id:'cancer',    txt:'HIST\xd3RICO DE C\xc2NCER DE MAMA NA FAM\xcdLIA?',     nota:true, bold:true },
];

/* ── Helper de campo — local, não depende de antibo.js ── */
function _mf(id, label, type, val, ph) {
  return '<div class="abo-field">' +
    '<label class="abo-lbl" for="' + id + '">' + label + '</label>' +
    '<input class="abo-input" id="' + id + '" type="' + type + '"' +
      ' value="' + _mEsc(val) + '" placeholder="' + _mEsc(ph) + '">' +
    '</div>';
}
function _mEsc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function _mToday() {
  var d = new Date();
  return d.getFullYear() + '-' + (d.getMonth()<9?'0':'') + (d.getMonth()+1) + '-' + (d.getDate()<10?'0':'') + d.getDate();
}
function _mFmt(s) {
  if (!s) return '___/___/______';
  var p = s.split('-'); return p[2]+'/'+p[1]+'/'+p[0];
}
function _mChk(val, opt) { return val === opt ? '(\u25cf)' : '( )'; }
function _mV(id) { var e=document.getElementById(id); return e?e.value.trim():''; }

/* ── Render principal ────────────────────────────────── */
function renderMamografia() {
  var hoje = _mToday();
  var qs   = MAMO_QS.map(function(q){ return _mQRow(q); }).join('');

  return (
    '<div class="abo-alert" style="border-color:#E84B4B;background:#FFF0F0;color:#9B1C1C">' +
      '<i class="ti ti-clipboard-heart" style="color:#E84B4B"></i>' +
      '<div><strong>Relat\xf3rio de Mamografia</strong> \u2014 Preencha com a paciente e gere o PDF para o t\xe9cnico.</div>' +
    '</div>' +

    '<div class="abo-card" style="margin-bottom:14px">' +
      '<div class="stitle"><i class="ti ti-user" style="font-size:13px"></i> Dados da Paciente</div>' +
      '<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px">' +
        _mf('mamo-nome','Paciente',          'text', '', 'Nome completo') +
        _mf('mamo-data','Data do Exame',     'date', hoje, '') +
        _mf('mamo-nasc','Data de Nascimento','date', '', '') +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px">' +
        _mf('mamo-cpf','CPF',      'text', '', '000.000.000-00') +
        _mf('mamo-tel','Telefone', 'text', '', '(15) 99999-9999') +
      '</div>' +
    '</div>' +

    '<div class="abo-card" style="margin-bottom:14px">' +
      '<div class="stitle"><i class="ti ti-stethoscope" style="font-size:13px"></i> Hist\xf3ria Cl\xednica</div>' +
      qs +
    '</div>' +

    '<div class="abo-card" style="margin-bottom:14px">' +
      '<div class="stitle"><i class="ti ti-circle-dot" style="font-size:13px"></i> Les\xf5es na Pele ou Cicatrizes</div>' +
      '<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px">Clique nos quadrantes para marcar les\xf5es ou cicatrizes.</p>' +
      '<div style="display:flex;gap:40px;justify-content:center;flex-wrap:wrap">' +
        _mDiagram('esq','MAMA ESQUERDA') +
        _mDiagram('dir','MAMA DIREITA')  +
      '</div>' +
    '</div>' +

    '<div class="abo-card">' +
      '<div class="stitle"><i class="ti ti-notes" style="font-size:13px"></i> Observa\xe7\xf5es</div>' +
      '<textarea class="abo-input" id="mamo-obs" rows="3" style="resize:vertical" placeholder="Observa\xe7\xf5es adicionais..."></textarea>' +
      '<div style="display:flex;gap:10px;margin-top:8px">' +
        '<button class="abo-btn-primary" onclick="gerarMamoPDF()">' +
          '<i class="ti ti-download"></i> Gerar Relat\xf3rio PDF' +
        '</button>' +
        '<button class="abo-btn-ghost" onclick="mamoLimpar()">' +
          '<i class="ti ti-refresh"></i> Limpar' +
        '</button>' +
      '</div>' +
    '</div>'
  );
}

/* ── Linha de pergunta ───────────────────────────────── */
function _mQRow(q) {
  var nao = _mamoAns[q.id] === 'nao';
  var sim = _mamoAns[q.id] === 'sim';

  var h =
    '<div class="mamo-row">' +
      '<span class="mamo-lbl' + (q.bold?' mamo-bold':'') + '">' + q.txt + '</span>' +
      '<div class="mamo-opts">' +
        '<button class="mamo-opt' + (nao?' m-nao':'') + '" id="mq-'+q.id+'-nao" onclick="mamoToggle(\''+q.id+'\',\'nao\')">' +
          (nao?'(\u25cf)':'( )') + ' N\xe3o' +
        '</button>' +
        '<button class="mamo-opt' + (sim?' m-sim':'') + '" id="mq-'+q.id+'-sim" onclick="mamoToggle(\''+q.id+'\',\'sim\')">' +
          (sim?'(\u25cf)':'( )') + ' Sim' +
        '</button>' +
      '</div>';

  if (q.extra === 'trouxe') {
    var ts=_mamoAns['trouxe']==='sim', tn=_mamoAns['trouxe']==='nao';
    h += '<div class="mamo-trouxe"><span>Trouxe:</span>' +
      '<button class="mamo-opt'+(ts?' m-sim':'')+'" id="mq-trouxe-sim" onclick="mamoToggle(\'trouxe\',\'sim\')">'+(ts?'(\u25cf)':'( )')+' Sim</button>' +
      '<button class="mamo-opt'+(tn?' m-nao':'')+'" id="mq-trouxe-nao" onclick="mamoToggle(\'trouxe\',\'nao\')">'+(tn?'(\u25cf)':'( )')+' N\xe3o</button>' +
    '</div>';
  } else if (q.extra === 'amamentou') {
    h += '<div class="mamo-nota-wrap"><span>Quanto tempo amamentou?</span>' +
      '<input class="abo-input mamo-input-sm" id="mq-amamentou" type="text" placeholder="Ex: 6 meses"></div>';
  } else if (q.nota) {
    h += '<input class="abo-input mamo-input-nota" id="mq-nota-'+q.id+'" type="text" placeholder="Detalhar...">';
  }

  return h + '</div>';
}

/* ── SVG interativo ──────────────────────────────────── */
function _mDiagram(side, label) {
  var cx=80, cy=85, r=60, ir=15;
  var ls = mamoLesoes[side] || {};
  var ql = side==='esq'
    ? {tl:'QSE',tr:'QSI',bl:'QIE',br:'QII'}
    : {tl:'QSI',tr:'QSE',bl:'QII',br:'QIE'};

  var rects = ['tl','tr','bl','br'].map(function(q){
    var rx = q.indexOf('r')>=0 ? cx : cx-r;
    var ry = q.indexOf('b')>=0 ? cy : cy-r;
    return '<rect id="mq-'+side+'-'+q+'" x="'+rx+'" y="'+ry+'" width="'+r+'" height="'+r+'"'+
           ' fill="'+(ls[q]?'rgba(50,184,196,0.38)':'transparent')+'"'+
           ' clip-path="url(#mc-'+side+')" style="cursor:pointer"'+
           ' onclick="mamoToggleQ(\''+side+'\',\''+q+'\')"/>';
  }).join('');

  return '<div style="text-align:center">' +
    '<div style="font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.5px;margin-bottom:8px">'+label+'</div>' +
    '<svg width="160" height="165" viewBox="0 0 160 165" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><clipPath id="mc-'+side+'"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'"/></clipPath></defs>' +
      rects +
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="#dde6e8" stroke-width="1.5"/>' +
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+ir+'" fill="none" stroke="#e8eeef" stroke-width="1"/>' +
      '<line x1="'+cx+'" y1="'+(cy-r)+'" x2="'+cx+'" y2="'+(cy+r)+'" stroke="#e8eeef" stroke-width="0.5"/>' +
      '<line x1="'+(cx-r)+'" y1="'+cy+'" x2="'+(cx+r)+'" y2="'+cy+'" stroke="#e8eeef" stroke-width="0.5"/>' +
      '<text x="'+(cx-r/2)+'" y="'+(cy-r/2)+'" text-anchor="middle" font-size="8" fill="#c0cdd0">'+ql.tl+'</text>' +
      '<text x="'+(cx+r/2)+'" y="'+(cy-r/2)+'" text-anchor="middle" font-size="8" fill="#c0cdd0">'+ql.tr+'</text>' +
      '<text x="'+(cx-r/2)+'" y="'+(cy+r/2+5)+'" text-anchor="middle" font-size="8" fill="#c0cdd0">'+ql.bl+'</text>' +
      '<text x="'+(cx+r/2)+'" y="'+(cy+r/2+5)+'" text-anchor="middle" font-size="8" fill="#c0cdd0">'+ql.br+'</text>' +
    '</svg>' +
  '</div>';
}

/* ── Toggles ─────────────────────────────────────────── */
function mamoToggle(qid, val) {
  _mamoAns[qid] = val;
  ['nao','sim'].forEach(function(v){
    var el = document.getElementById('mq-'+qid+'-'+v);
    if (!el) return;
    var sel = v === val;
    el.className  = 'mamo-opt' + (sel ? (v==='nao'?' m-nao':' m-sim') : '');
    el.textContent = (sel?'(\u25cf)':'( )') + ' ' + (v==='nao'?'N\xe3o':'Sim');
  });
}

function mamoToggleQ(side, q) {
  if (!mamoLesoes[side]) mamoLesoes[side] = {};
  mamoLesoes[side][q] = !mamoLesoes[side][q];
  var el = document.getElementById('mq-'+side+'-'+q);
  if (el) el.setAttribute('fill', mamoLesoes[side][q] ? 'rgba(50,184,196,0.38)' : 'transparent');
}

function mamoLimpar() {
  mamoLesoes = { esq:{}, dir:{} };
  _mamoAns   = {};
  if (tab === 'mamografia') document.getElementById('content').innerHTML = renderMamografia();
}

/* ══════════════════════════════════════════════════════
   GERAR PDF
   ══════════════════════════════════════════════════════ */
async function gerarMamoPDF() {
  var nome = _mV('mamo-nome');
  var data = _mV('mamo-data');
  var nasc = _mV('mamo-nasc');
  var cpf  = _mV('mamo-cpf');
  var tel  = _mV('mamo-tel');
  var obs  = _mV('mamo-obs');

  if (!nome) { alert('Informe o nome da paciente.'); return; }
  if (!window.jspdf) { alert('Biblioteca jsPDF n\xe3o carregada. Verifique a conex\xe3o.'); return; }

  var doc  = new window.jspdf.jsPDF({ unit:'mm', format:'a4' });
  var W    = doc.internal.pageSize.getWidth();
  var T    = [50,184,196];
  var logo = typeof _loadLogo==='function' ? await _loadLogo() : null;
  var y    = 14;

  /* ── Cabeçalho ── */
  if (logo) {
    doc.addImage(logo,'PNG',14,y-5,42,11);
  } else {
    doc.setFont('helvetica','bold'); doc.setFontSize(15); doc.setTextColor(T[0],T[1],T[2]);
    doc.text('amorsaude',14,y+2);
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(140,140,140);
    doc.text('MEDICINA, ODONTOLOGIA E EXAMES',14,y+7);
  }
  doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(20,20,20);
  doc.text('CL\xcdNICA AMOR SA\xdaDE', W-14, y, {align:'right'});
  doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(120,120,120);
  doc.text('CNPJ: 16.541.188/0001-15', W-14, y+5, {align:'right'});
  doc.text('RUA CORONEL AFONSO, 309 \u2013 CENTRO \u2013 ITAPETININGA/SP', W-14, y+9, {align:'right'});
  doc.text('TELEFONE: (15) 3271-1076 / (15) 3272-1194', W-14, y+13, {align:'right'});
  y += 18;
  doc.setDrawColor(T[0],T[1],T[2]); doc.setLineWidth(0.5); doc.line(14,y,W-14,y);
  y += 8;

  /* ── Título ── */
  doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(20,20,20);
  doc.text('RELAT\xd3RIO DE MAMOGRAFIA', W/2, y, {align:'center'});
  doc.setDrawColor(40,40,40); doc.setLineWidth(0.3);
  doc.line(W/2-42, y+1.5, W/2+42, y+1.5);
  y += 9;

  /* ── Dados ── */
  function pField(lbl, val, x, fy, lw) {
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(80,80,80);
    doc.text(lbl+':', x, fy);
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(20,20,20);
    if (val) doc.text(val, x + doc.getTextWidth(lbl+':  '), fy);
    doc.setDrawColor(180,180,180); doc.setLineWidth(0.2); doc.line(x, fy+1.5, x+(lw||70), fy+1.5);
  }
  pField('DATA',               _mFmt(data), 14,  y, 30);
  pField('DATA DE NASCIMENTO', _mFmt(nasc), 52,  y, 50);
  y+=7;
  pField('PACIENTE', nome, 14, y, W-28);
  y+=7;
  pField('CPF', cpf, 14, y, 58);
  pField('TEL', tel, 82, y, W-96);
  y+=10;

  doc.setDrawColor(T[0],T[1],T[2]); doc.setLineWidth(0.4); doc.line(14,y,W-14,y);
  y+=7;

  /* ── História Clínica ── */
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(20,20,20);
  doc.text('HIST\xd3RIA CL\xcdNICA', W/2, y, {align:'center'});
  doc.setDrawColor(40,40,40); doc.line(W/2-28, y+1.5, W/2+28, y+1.5);
  y+=9;

  MAMO_QS.forEach(function(q){
    var ans = _mamoAns[q.id];
    doc.setFont('helvetica', q.bold?'bold':'normal');
    doc.setFontSize(8.5); doc.setTextColor(20,20,20);
    var lines = doc.splitTextToSize(q.txt, 92);
    doc.text(lines, 14, y);

    var cx2 = 115;
    doc.setFont('helvetica','normal');
    doc.text(_mChk(ans,'nao')+' N\xe3o', cx2,    y);
    doc.text(_mChk(ans,'sim')+' Sim',   cx2+20, y);

    if (q.extra==='trouxe') {
      var ta=_mamoAns['trouxe'];
      doc.text('Trouxe: '+_mChk(ta,'sim')+' Sim  '+_mChk(ta,'nao')+' N\xe3o', cx2+42, y);
    } else if (q.extra==='amamentou') {
      var am=_mV('mq-amamentou');
      if (am) doc.text('Amamentou: '+am, cx2+42, y);
      else { doc.setDrawColor(180,180,180); doc.line(cx2+42,y+1.5,W-14,y+1.5); }
    } else if (q.nota) {
      var nota=_mV('mq-nota-'+q.id);
      if (nota) { doc.setFontSize(8); doc.setTextColor(60,60,60); doc.text(nota,cx2+42,y); }
      else { doc.setDrawColor(180,180,180); doc.line(cx2+42,y+1.5,W-14,y+1.5); }
    }
    y += lines.length > 1 ? lines.length*5.5 : 7;
  });

  y+=4;
  doc.setDrawColor(T[0],T[1],T[2]); doc.setLineWidth(0.4); doc.line(14,y,W-14,y);
  y+=7;

  /* ── Lesões ── */
  doc.setFont('helvetica','bold'); doc.setFontSize(10); doc.setTextColor(20,20,20);
  doc.text('LES\xd5ES NA PELE OU CICATRIZES', W/2, y, {align:'center'});
  doc.setDrawColor(40,40,40); doc.line(W/2-44, y+1.5, W/2+44, y+1.5);
  y+=9;

  var r2=24, yc=y+r2+4;
  var x1=W/2-r2-20, x2=W/2+r2+20;

  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(80,80,80);
  doc.text('MAMA ESQUERDA', x1, y, {align:'center'});
  doc.text('MAMA DIREITA',  x2, y, {align:'center'});
  y+=5; yc=y+r2;

  [{cx:x1,side:'esq'},{cx:x2,side:'dir'}].forEach(function(d){
    var ls2 = mamoLesoes[d.side]||{};
    var ql2 = d.side==='esq'
      ? {tl:'QSE',tr:'QSI',bl:'QIE',br:'QII'}
      : {tl:'QSI',tr:'QSE',bl:'QII',br:'QIE'};
    doc.setDrawColor(160,160,160); doc.setLineWidth(0.5); doc.circle(d.cx,yc,r2,'S');
    doc.setDrawColor(190,190,190); doc.setLineWidth(0.3); doc.circle(d.cx,yc,r2*0.22,'S');
    doc.setDrawColor(200,200,200); doc.setLineWidth(0.3);
    doc.line(d.cx,yc-r2,d.cx,yc+r2); doc.line(d.cx-r2,yc,d.cx+r2,yc);
    doc.setFont('helvetica','normal'); doc.setFontSize(5.5); doc.setTextColor(180,180,180);
    doc.text(ql2.tl,d.cx-r2/2,yc-r2/2,{align:'center'});
    doc.text(ql2.tr,d.cx+r2/2,yc-r2/2,{align:'center'});
    doc.text(ql2.bl,d.cx-r2/2,yc+r2/2+2,{align:'center'});
    doc.text(ql2.br,d.cx+r2/2,yc+r2/2+2,{align:'center'});
    doc.setFillColor(T[0],T[1],T[2]);
    if (ls2.tl) doc.circle(d.cx-r2*0.48,yc-r2*0.48,2.2,'F');
    if (ls2.tr) doc.circle(d.cx+r2*0.48,yc-r2*0.48,2.2,'F');
    if (ls2.bl) doc.circle(d.cx-r2*0.48,yc+r2*0.48,2.2,'F');
    if (ls2.br) doc.circle(d.cx+r2*0.48,yc+r2*0.48,2.2,'F');
  });

  y=yc+r2+12;
  doc.setDrawColor(T[0],T[1],T[2]); doc.setLineWidth(0.4); doc.line(14,y,W-14,y);
  y+=7;

  /* ── Observações ── */
  doc.setFont('helvetica','bold'); doc.setFontSize(8.5); doc.setTextColor(80,80,80);
  doc.text('OBSERVA\xc7\xd5ES:', 14, y);
  if (obs) {
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(20,20,20);
    doc.text(doc.splitTextToSize(obs, W-28), 14, y+6);
  } else {
    doc.setDrawColor(180,180,180); doc.setLineWidth(0.2);
    doc.line(14,y+5,W-14,y+5); doc.line(14,y+11,W-14,y+11);
  }

  doc.save('mamografia_'+nome.replace(/\s+/g,'_')+'.pdf');
}
