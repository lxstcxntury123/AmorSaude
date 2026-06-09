/* ═══════════════════════════════════════════════════════
   views/antibo.js — Anti-BO · Modo Contingência
   Gera Recibo e Encaminhamento em PDF via jsPDF
   ═══════════════════════════════════════════════════════ */

var aboProcs = [{ proc: '', medico: '' }];

/* ── Render principal ────────────────────────────────── */
function renderAntibo() {
  var hoje = _aboToday();

  return (
    '<div class="abo-alert">' +
      '<i class="ti ti-alert-triangle"></i>' +
      '<div><strong>Modo Contingência</strong> — Use quando o sistema principal estiver fora do ar. ' +
      'Preencha os dados e gere os documentos em PDF para entregar ao paciente.</div>' +
    '</div>' +

    '<div class="abo-grid">' +

      /* ════ COLUNA ESQUERDA ════ */
      '<div class="abo-col">' +

        '<div class="abo-card">' +
          '<div class="stitle"><i class="ti ti-user" style="font-size:13px"></i> Dados do Paciente</div>' +
          _aboField('abo-nome',     'Nome completo',  'text', '', 'Ex: Maria da Silva') +
          _aboField('abo-cpf',      'CPF',            'text', '', '000.000.000-00') +
          '<div class="abo-row">' +
            _aboField('abo-telefone', 'Telefone', 'text', '', '(15) 99999-9999') +
            _aboField('abo-idade',    'Idade',    'text', '', 'Ex: 42') +
          '</div>' +
        '</div>' +

        '<div class="abo-card">' +
          '<div class="stitle"><i class="ti ti-file-description" style="font-size:13px"></i> Dados do Documento</div>' +
          _aboField('abo-agente', 'Gerado por (seu nome)', 'text', '', 'Ex: João') +
          _aboField('abo-data',   'Data',                  'date', hoje, '') +
          '<div class="abo-row">' +
            '<div class="abo-field">' +
              '<label class="abo-lbl">Forma de Pagamento</label>' +
              '<select class="abo-input" id="abo-forma">' +
                '<option>PIX</option>' +
                '<option>Dinheiro</option>' +
                '<option>Cartão de Débito</option>' +
                '<option>Cartão de Crédito</option>' +
                '<option>Cartão de TODOS</option>' +
                '<option>Convênio</option>' +
              '</select>' +
            '</div>' +
            '<div class="abo-field">' +
              '<label class="abo-lbl">Parceria</label>' +
              '<select class="abo-input" id="abo-parceria">' +
                '<option>Particular</option>' +
                '<option>Cartão de TODOS</option>' +
                '<option>Convênio</option>' +
              '</select>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="abo-card">' +
          '<div class="stitle"><i class="ti ti-receipt" style="font-size:13px"></i> Recibo de Pagamento</div>' +
          '<div class="abo-row">' +
            _aboField('abo-nrecibo', 'Nº do Recibo', 'text', '', 'Ex: 001234') +
            _aboField('abo-valor',   'Valor (R$)',   'text', '', 'Ex: 150,00') +
          '</div>' +
          '<button class="abo-btn-primary" onclick="gerarRecibo()">' +
            '<i class="ti ti-download"></i> Gerar Recibo PDF' +
          '</button>' +
        '</div>' +

      '</div>' +

      /* ════ COLUNA DIREITA ════ */
      '<div class="abo-col">' +
        '<div class="abo-card">' +
          '<div class="stitle"><i class="ti ti-clipboard-text" style="font-size:13px"></i> Encaminhamento</div>' +

          '<div class="abo-row">' +
            _aboField('abo-nproposta',  'Nº Proposta',          'text', '', 'Ex: 42') +
            _aboField('abo-valor-forn', 'Valor no fornecedor',  'text', '0,00', 'R$ 0,00') +
          '</div>' +
          '<div class="abo-row">' +
            _aboField('abo-medico', 'Médico Solicitante', 'text', '', 'Dr. Nome') +
            _aboField('abo-crm',    'CRM',                'text', '', 'Ex: 123456') +
          '</div>' +

          '<label class="abo-lbl" style="display:block;margin-bottom:4px">Procedimentos</label>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 28px;gap:4px 8px;' +
               'font-size:11px;color:var(--t3);margin-bottom:4px;padding:0 2px">' +
            '<span>Procedimento</span><span>Médico executante</span><span></span>' +
          '</div>' +
          '<div id="abo-procs">' + _buildProcsHtml() + '</div>' +
          '<button class="abo-btn-ghost" style="margin-top:6px" onclick="aboAddProc()">' +
            '<i class="ti ti-plus"></i> Adicionar procedimento' +
          '</button>' +

          '<button class="abo-btn-secondary" style="margin-top:16px" onclick="gerarEncaminhamento()">' +
            '<i class="ti ti-download"></i> Gerar Encaminhamento PDF' +
          '</button>' +

        '</div>' +
      '</div>' +

    '</div>'
  );
}

/* ── Helpers de formulário ───────────────────────────── */
function _aboField(id, label, type, val, placeholder) {
  return '<div class="abo-field">' +
    '<label class="abo-lbl" for="' + id + '">' + label + '</label>' +
    '<input class="abo-input" id="' + id + '" type="' + type + '" ' +
      'value="' + _escHtml(val) + '" placeholder="' + _escHtml(placeholder) + '">' +
    '</div>';
}

function _buildProcsHtml() {
  return aboProcs.map(function(p, i) {
    return '<div class="abo-proc-row">' +
      '<input data-field="proc"   class="abo-input" placeholder="Procedimento"      value="' + _escHtml(p.proc)   + '">' +
      '<input data-field="medico" class="abo-input" placeholder="Médico executante"  value="' + _escHtml(p.medico) + '">' +
      '<button class="abo-rm-btn" onclick="aboRemoveProc(' + i + ')" title="Remover">' +
        '<i class="ti ti-x"></i>' +
      '</button>' +
    '</div>';
  }).join('');
}

/* ── Gestão da lista de procedimentos ────────────────── */
function aboAddProc() {
  _aboSaveProcs();
  aboProcs.push({ proc: '', medico: '' });
  _aboRenderProcs();
}

function aboRemoveProc(i) {
  _aboSaveProcs();
  if (aboProcs.length > 1) aboProcs.splice(i, 1);
  _aboRenderProcs();
}

function _aboSaveProcs() {
  document.querySelectorAll('.abo-proc-row').forEach(function(row, i) {
    if (!aboProcs[i]) return;
    var pi = row.querySelector('[data-field="proc"]');
    var mi = row.querySelector('[data-field="medico"]');
    if (pi) aboProcs[i].proc   = pi.value;
    if (mi) aboProcs[i].medico = mi.value;
  });
}

function _aboRenderProcs() {
  var c = document.getElementById('abo-procs');
  if (c) c.innerHTML = _buildProcsHtml();
}

/* ── Utilitários ─────────────────────────────────────── */
function _v(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function _aboToday() {
  var d = new Date();
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

function _fmtDate(s) {
  if (!s) return _fmtDate(_aboToday());
  var p = s.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}

function _escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function _aboJsPDF() {
  if (!window.jspdf) {
    alert('Biblioteca jsPDF não carregada. Verifique a conexão com a internet.');
    return null;
  }
  return new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
}

/* ── Cabeçalho padrão dos PDFs ───────────────────────── */
function _aboHeader(doc, fullInfo) {
  var W = doc.internal.pageSize.getWidth();
  var G = [22, 163, 112];
  var y = 15;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(G[0], G[1], G[2]);
  doc.text('amorsaude', 14, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('MEDICINA, ODONTOLOGIA E EXAMES', 14, y + 5);

  if (fullInfo) {
    var lines = [
      { t: 'AmorSaude Itapetininga',                                          bold: true,  cor: [30,30,30]   },
      { t: 'CNPJ: 16.541.188/0001-15',                                        bold: false, cor: [100,100,100] },
      { t: 'Rua Coronel Afonso, 309 - Centro - 18200-175 Itapetininga - SP',  bold: false, cor: [100,100,100] },
      { t: 'Atendimento: (15) 3271-1076',                                     bold: false, cor: [100,100,100] },
      { t: 'itapetininga.sp@amorsaude.com',                                   bold: false, cor: [100,100,100] },
    ];
    lines.forEach(function(l, i) {
      doc.setFont('helvetica', l.bold ? 'bold' : 'normal');
      doc.setFontSize(7);
      doc.setTextColor(l.cor[0], l.cor[1], l.cor[2]);
      doc.text(l.t, W - 14, y + i * 4, { align: 'right' });
    });
    y += 21;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 30, 30);
    doc.text('CLINICA SAUDE & VIDA LTDA', W - 14, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text('Rua Coronel Afonso, 309 - Centro - 18200-175 Itapetininga, SP', W - 14, y + 5, { align: 'right' });
    y += 12;
  }

  doc.setDrawColor(G[0], G[1], G[2]);
  doc.setLineWidth(0.6);
  doc.line(14, y, W - 14, y);

  return y + 8;
}

/* ══════════════════════════════════════════════════════
   GERAR RECIBO PDF
   ══════════════════════════════════════════════════════ */
function gerarRecibo() {
  var nome    = _v('abo-nome');
  var cpf     = _v('abo-cpf');
  var agente  = _v('abo-agente');
  var forma   = _v('abo-forma');
  var valor   = _v('abo-valor');
  var nRecibo = _v('abo-nrecibo');
  var data    = _v('abo-data');

  if (!nome)  { alert('Informe o nome do paciente.'); return; }
  if (!valor) { alert('Informe o valor do recibo.');  return; }

  var doc = _aboJsPDF();
  if (!doc) return;

  var W       = doc.internal.pageSize.getWidth();
  var G       = [22, 163, 112];
  var dataFmt = _fmtDate(data);
  var now     = new Date();
  var hora    = pad(now.getHours()) + ':' + pad(now.getMinutes());
  var y       = _aboHeader(doc, false);

  /* Título */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text('Recibo de Pagamento n\xba ' + (nRecibo || '\u2014'), W / 2, y, { align: 'center' });
  y += 5;
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(14, y, W - 14, y);
  y += 8;

  /* Tabela de pagamento */
  doc.autoTable({
    startY: y,
    head: [['Parcelas', 'Data', 'Forma de Pagamento', 'Valor']],
    body: [['1', dataFmt, forma, 'R$ ' + valor]],
    styles:       { fontSize: 9, cellPadding: 3.5 },
    headStyles:   { fillColor: G, textColor: [255, 255, 255], fontStyle: 'bold' },
    columnStyles: { 0: { halign: 'center', cellWidth: 22 }, 1: { cellWidth: 28 }, 3: { halign: 'right' } },
    margin: { left: 14, right: 14 },
    theme: 'grid',
  });
  y = doc.lastAutoTable.finalY + 8;

  /* Totais */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(20, 20, 20);
  doc.text('Valor total R$:', 120, y);
  doc.text('R$ ' + valor, W - 14, y, { align: 'right' });
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(130, 130, 130);
  doc.text('Desconto aplicado de R$:', 120, y);
  doc.text('0,00', W - 14, y, { align: 'right' });
  y += 7;

  doc.setDrawColor(210, 210, 210);
  doc.line(14, y, W - 14, y);
  y += 8;

  /* Dados do paciente */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(G[0], G[1], G[2]);
  doc.text('Dados do paciente', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('CPF: ' + (cpf || 'n\xe3o informado'), 14, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(20, 20, 20);
  doc.text(nome, 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(130, 130, 130);
  doc.text('Rua Cel Afonso, 309 - Centro \u2013 18200-175 Itapetininga, SP', 14, y);
  y += 9;

  doc.setDrawColor(210, 210, 210);
  doc.line(14, y, W - 14, y);
  y += 6;

  /* Rodapé */
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Recibo gerado por: ' + (agente || '\u2014'), W - 14, y, { align: 'right' });
  y += 5;
  doc.text('Emitido em: ' + dataFmt + '  ' + hora, W - 14, y, { align: 'right' });

  doc.save('recibo_' + nome.replace(/\s+/g, '_') + (nRecibo ? '_' + nRecibo : '') + '.pdf');
}

/* ══════════════════════════════════════════════════════
   GERAR ENCAMINHAMENTO PDF
   ══════════════════════════════════════════════════════ */
function gerarEncaminhamento() {
  _aboSaveProcs();

  var nome      = _v('abo-nome');
  var cpf       = _v('abo-cpf');
  var telefone  = _v('abo-telefone');
  var idade     = _v('abo-idade');
  var agente    = _v('abo-agente');
  var forma     = _v('abo-forma');
  var parceria  = _v('abo-parceria');
  var data      = _v('abo-data');
  var nProposta = _v('abo-nproposta');
  var medico    = _v('abo-medico');
  var crm       = _v('abo-crm');
  var valorForn = _v('abo-valor-forn') || '0,00';

  if (!nome) { alert('Informe o nome do paciente.'); return; }

  var doc = _aboJsPDF();
  if (!doc) return;

  var W         = doc.internal.pageSize.getWidth();
  var G         = [22, 163, 112];
  var dataFmt   = _fmtDate(data);
  var medicoStr = medico + (crm ? ' \u2013 CRM: ' + crm : '');
  var y         = _aboHeader(doc, true);

  /* Linha título + data */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text('Encaminhamento', 14, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 110);
  doc.text(dataFmt, W - 14, y, { align: 'right' });
  y += 5;

  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(14, y, W - 14, y);
  y += 7;

  /* Nome + CPF */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(20, 20, 20);
  doc.text(nome, 14, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('CPF: ' + (cpf || 'n\xe3o informado'), W - 14, y, { align: 'right' });
  y += 8;

  /* Grid de informações */
  doc.autoTable({
    startY: y,
    body: [
      ['Idade: ' + (idade || '\u2014'),       'Telefone: ' + (telefone || '\u2014')],
      ['N\xba Proposta: ' + (nProposta || '\u2014'), 'Proposta gerada por: ' + (agente || '\u2014')],
      ['Solicitante \u2013 CRM: ' + (medicoStr || '\u2014'), 'Parceria: ' + parceria],
    ],
    styles:       { fontSize: 8.5, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold' } },
    margin: { left: 14, right: 14 },
    theme: 'plain',
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.25,
  });
  y = doc.lastAutoTable.finalY + 9;

  /* Procedimentos */
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(G[0], G[1], G[2]);
  doc.text('Procedimentos', 14, y);
  y += 4;

  var procRows = aboProcs
    .filter(function(p) { return p.proc || p.medico; })
    .map(function(p)    { return [p.proc || '\u2014', p.medico || '\u2014']; });
  if (procRows.length === 0) procRows = [['\u2014', '\u2014']];

  doc.autoTable({
    startY:      y,
    head:        [['Procedimento', 'Executante']],
    body:        procRows,
    styles:      { fontSize: 9, cellPadding: 3.5 },
    headStyles:  { fillColor: G, textColor: [255, 255, 255], fontStyle: 'bold' },
    margin:      { left: 14, right: 14 },
    theme:       'grid',
  });
  y = doc.lastAutoTable.finalY + 9;

  /* Assinatura */
  if (medico) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(20, 20, 20);
    doc.text(medicoStr, W / 2, y, { align: 'center' });
    y += 9;
  }

  /* Rodapé de pagamento */
  doc.setDrawColor(210, 210, 210);
  doc.line(14, y, W - 14, y);
  y += 6;

  doc.autoTable({
    startY: y,
    body: [
      ['Data(s) de Pagamento: ' + dataFmt,  'Forma(s) de Pagamento: ' + forma],
      ['Status Cl\xednica: Pago',            'Valor a pagar no fornecedor: R$ ' + valorForn],
    ],
    styles:       { fontSize: 8.5, cellPadding: 3 },
    columnStyles: { 0: { fontStyle: 'bold' } },
    margin:       { left: 14, right: 14 },
    theme:        'plain',
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.25,
  });

  doc.save('encaminhamento_' + nome.replace(/\s+/g, '_') + '.pdf');
}
