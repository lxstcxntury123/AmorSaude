/* ═══════════════════════════════════════════════════
   data.js — Dados estáticos da clínica
   Futuramente: substituídos por leitura do Google Sheets
   ═══════════════════════════════════════════════════ */

var DAYS   = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
var MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

/* ── AGENDA SEMANAL ──────────────────────────────────
   Chave = getDay() (1=Seg … 6=Sáb)
   Cada sala tem turno manhã (m) e tarde (t):
     d = nome do doutor/serviço
     i = hora início  |  f = hora fim
   ─────────────────────────────────────────────────── */
var SCHED = {
  1:{rooms:[
    {s:"Sala 1",  m:{d:"Dra. Cristiane",      i:"08:00",f:"12:00"}, t:{d:"Dr. Elton Sella",     i:"13:30",f:"16:30"}},
    {s:"Sala 2",  m:{d:"Dr. Jose Renato",     i:"07:00",f:""},      t:{d:"Dr. Jose Renato",     i:"",     f:"16:30"}},
    {s:"Sala 3",  m:null,                                           t:{d:"Dr. Luiz Escobar",    i:"13:00",f:"16:00"}},
    {s:"Sala 4",  m:{d:"Dra. Debora Alessi",  i:"09:00",f:""},      t:{d:"Dra. Debora Alessi",  i:"",     f:"18:00"}},
    {s:"Sala 5",  m:{d:"Urofluxometria",      i:"",     f:""},      t:{d:"Urofluxometria",      i:"",     f:""}},
    {s:"Sala 6",  m:{d:"Eletrocardiograma",   i:"",     f:""},      t:{d:"Dra. Katia Regina",   i:"15:00",f:"19:30"}},
    {s:"Sala 7",  m:null,                                           t:{d:"Dra. Amanda Brisola", i:"16:00",f:"19:00"}},
    {s:"Sala 8",  m:{d:"Dr. Cidney",          i:"07:00",f:"12:00"}, t:{d:"Dr. Rafael Califani", i:"13:00",f:"17:00"}},
    {s:"Sala 9",  m:null,                                           t:{d:"Dr. Luiz Lamota",     i:"15:30",f:"17:20"}},
    {s:"Triagem", m:null,                                           t:{d:"Dr. Luis Gustavo",    i:"14:00",f:"18:00"}},
  ]},
  2:{rooms:[
    {s:"Sala 1",  m:{d:"Exames Dr. Arthur",   i:"",     f:""},      t:{d:"Exames Dr. Arthur",   i:"",     f:""}},
    {s:"Sala 2",  m:{d:"Dr. Lucas Najar",     i:"08:00",f:"11:00"}, t:{d:"Dr. Enarco",          i:"13:30",f:"17:00"}},
    {s:"Sala 3",  m:{d:"Dra. Raquel",         i:"08:00",f:"11:30"}, t:null},
    {s:"Sala 4",  m:{d:"Dr. Rafael",          i:"10:00",f:""},      t:{d:"Dr. Rafael",          i:"",     f:"17:00"}},
    {s:"Sala 5",  m:{d:"Dra. Debora Alessi",  i:"09:00",f:""},      t:{d:"Dra. Debora Alessi",  i:"",     f:"18:00"}},
    {s:"Sala 6",  m:{d:"Eletrocardiograma",   i:"",     f:""},      t:{d:"Eletrocardiograma",   i:"",     f:""}},
    {s:"Sala 7",  m:{d:"Dr. Eduardo",         i:"09:00",f:"14:00"}, t:{d:"Dr. Jose Renato",     i:"14:30",f:"16:30"}},
    {s:"Sala 8",  m:{d:"Dra. Carol",          i:"08:00",f:"10:50"}, t:{d:"Dr. Antonio Lopes",   i:"14:00",f:"16:00"}},
    {s:"Sala 9",  m:{d:"Dr. Arthur",          i:"08:30",f:""},      t:{d:"Dr. Arthur",          i:"",     f:"16:30"}},
    {s:"Triagem", m:null,                                           t:{d:"Triagem Pediatrica",  i:"",     f:""}},
  ]},
  3:{rooms:[
    {s:"Sala 1",  m:{d:"Dra. Cristiane",      i:"08:00",f:"12:00"}, t:null},
    {s:"Sala 2",  m:{d:"Dra. Amanda Brisola", i:"08:00",f:"11:00"}, t:{d:"Dr. Jose Renato",     i:"14:30",f:"16:30"}},
    {s:"Sala 3",  m:null,                                           t:{d:"Dra. Raquel",         i:"13:00",f:"19:00"}},
    {s:"Sala 4",  m:{d:"Dr. Mauricio Piovezan",i:"08:00",f:""},     t:{d:"Dr. Mauricio Piovezan",i:"",    f:"18:00"}},
    {s:"Sala 5",  m:{d:"Dr. Marco Pacheco",   i:"07:00",f:"09:30"}, t:{d:"Urofluxometria",      i:"",     f:""}},
    {s:"Sala 6",  m:{d:"Exames Cardiologicos",i:"07:00",f:"11:30"}, t:{d:"Eletrocardiograma",   i:"",     f:""}},
    {s:"Sala 7",  m:{d:"Dr. Vitor Gabriel",   i:"07:00",f:"12:00"}, t:{d:"Dr. Luiz Lamota",     i:"15:30",f:"17:20"}},
    {s:"Sala 8",  m:{d:"Dr. Cidney",          i:"07:00",f:"12:00"}, t:{d:"Dr. Luiz Escobar",    i:"13:00",f:"16:00"}},
    {s:"Sala 9",  m:{d:"Exames Dr Vitor",     i:"",     f:""},      t:{d:"Exames Dr Vitor",     i:"",     f:""}},
    {s:"Triagem", m:null,                                           t:{d:"Dr. Gabriel",         i:"17:30",f:"19:00"}},
  ]},
  4:{rooms:[
    {s:"Sala 1",  m:{d:"Exames Dr. Arthur",   i:"",     f:""},      t:{d:"Exames Dr. Arthur",   i:"",     f:""}},
    {s:"Sala 3",  m:null,                                           t:{d:"Dra. Raquel",         i:"13:00",f:"17:00"}},
    {s:"Sala 4",  m:{d:"Dr. Renato Nakamura", i:"09:00",f:"12:00"}, t:{d:"Dra. Tayna",          i:"13:00",f:"15:30"}},
    {s:"Sala 5",  m:{d:"Dra. Debora Alessi",  i:"09:00",f:""},      t:{d:"Dra. Debora Alessi",  i:"",     f:"18:00"}},
    {s:"Sala 6",  m:{d:"Eletrocardiograma",   i:"",     f:""},      t:{d:"Eletrocardiograma",   i:"",     f:""}},
    {s:"Sala 7",  m:{d:"Dra. Kiyoko",         i:"07:00",f:"11:00"}, t:{d:"Dr. Luiz Escobar",    i:"13:00",f:"16:00"}},
    {s:"Sala 8",  m:{d:"Dr. Victor Hugo",     i:"08:00",f:"12:00"}, t:null},
    {s:"Sala 9",  m:{d:"Dr. Arthur",          i:"08:30",f:""},      t:{d:"Dr. Arthur",          i:"",     f:"16:30"}},
    {s:"Triagem", m:{d:"Triagem Pediatrica",  i:"",     f:""},      t:{d:"Dr. Gabriel",         i:"07:00",f:"11:00"}},
  ]},
  5:{rooms:[
    {s:"Sala 1",  m:{d:"Dr. Marcos Raiza",    i:"13:30",f:""},      t:{d:"Dr. Marcos Raiza",    i:"",     f:"16:30"}},
    {s:"Sala 2",  m:{d:"Dr. Marcos Raiza Exame",i:"",   f:""},      t:{d:"Dr. Marcos Raiza Exame",i:"",   f:""}},
    {s:"Sala 3",  m:null,                                           t:{d:"Dr. Gabriel",         i:"13:30",f:"16:00"}},
    {s:"Sala 4",  m:{d:"Dr. Jose Renato",     i:"09:30",f:"11:30"}, t:{d:"Dra. Amanda Brisola", i:"14:00",f:"17:00"}},
    {s:"Sala 5",  m:{d:"Dr. Marcelo Mai",     i:"07:00",f:"10:00"}, t:{d:"Urofluxometria",      i:"",     f:""}},
    {s:"Sala 6",  m:{d:"Eletrocardiograma",   i:"",     f:""},      t:{d:"Eletrocardiograma",   i:"",     f:""}},
    {s:"Sala 8",  m:{d:"Dra. Carolina",       i:"08:00",f:"13:00"}, t:null},
  ]},
  6:{rooms:[
    {s:"Sala 1",  m:{d:"Dra. Inae Sampaio",   i:"08:00",f:"12:00"}, t:null},
    {s:"Sala 2",  m:{d:"Dra. Mariane",        i:"07:30",f:"12:00"}, t:null},
    {s:"Sala 3",  m:{d:"Dra. Cristiane",      i:"08:00",f:"12:00"}, t:null},
    {s:"Sala 5",  m:{d:"Urofluxometria",      i:"",     f:""},      t:null},
    {s:"Sala 6",  m:{d:"Eletrocardiograma",   i:"",     f:""},      t:null},
    {s:"Sala 7",  m:{d:"Dra. Tayna",          i:"08:00",f:"12:00"}, t:null},
    {s:"Sala 8",  m:{d:"Dra. Katia Regina",   i:"07:30",f:"12:00"}, t:null},
    {s:"Sala 9",  m:{d:"Dra. Kiyoko",         i:"07:00",f:"11:00"}, t:null},
    {s:"Triagem", m:{d:"Triagem Pediatrica",  i:"",     f:""},      t:null},
  ]}
};

/* ── GUIAS DE EXAMES ─────────────────────────────────
   orient = tem orientação médica (ponto amarelo)
   obs    = observação exibida no painel
   steps  = passos do atendimento
   ─────────────────────────────────────────────────── */
var EXAMS = [
  {id:"papa",     name:"Papa / Biopsia",          icon:"ti-microscope",        orient:false, steps:[
    {l:"Etiqueta AMEI",     d:"Gerar e colar etiqueta no sistema AMEI",                              ic:"ti-tag",           c:"blue"}]},
  {id:"lab",      name:"Exames Laboratoriais",    icon:"ti-flask",             orient:true,  steps:[
    {l:"Etiqueta AMEI",     d:"Gerar etiqueta no sistema AMEI",                                      ic:"ti-tag",           c:"blue"},
    {l:"AI - Coleta",       d:"Chamar senha e encaminhar para Coleta no sistema Intelite",            ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE + Protocol",     d:"Entregar papel de encaminhamento e papelzinho com a data",            ic:"ti-files",         c:"amber"}]},
  {id:"ecg",      name:"ECG",                     icon:"ti-activity-heartbeat",orient:false, steps:[
    {l:"AI - Cardio",       d:"Chamar senha e encaminhar para Cardiologia no sistema Intelite",       ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE + Protocol",     d:"Entregar papel de encaminhamento e papelzinho com a data",            ic:"ti-files",         c:"amber"}]},
  {id:"mapa",     name:"MAPA / HOLTER",           icon:"ti-heart",             orient:true,  steps:[
    {l:"AI - Cardio",       d:"Chamar senha e encaminhar para Cardiologia no sistema Intelite",       ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE + Protocol",     d:"Entregar papel de encaminhamento e papelzinho com a data",            ic:"ti-files",         c:"amber"}]},
  {id:"urofluxo", name:"Urofluxometria",          icon:"ti-droplet",           orient:true,  steps:[
    {l:"AI - Cardio",       d:"Chamar senha e encaminhar para Cardiologia no sistema Intelite",       ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE + Protocol",     d:"Entregar papel de encaminhamento e papelzinho com a data",            ic:"ti-files",         c:"amber"}]},
  {id:"rx",       name:"Rx / Mamografia",         icon:"ti-radiation",         orient:false, obs:"Mamografia somente para pacientes com +40 anos.", steps:[
    {l:"AI - Raio-X",       d:"Chamar senha e encaminhar para Raio-X no sistema Intelite",           ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE + Formulario",   d:"Entregar papel de encaminhamento e o formulario especifico",          ic:"ti-files",         c:"amber"}]},
  {id:"us",       name:"Ultrassonografia (US)",   icon:"ti-wave-sine",         orient:true,  obs:"Dr. Victor Hugo NÃO faz mamas. Parede abdominal = Abdômen superior.", steps:[
    {l:"Check-in AMEI",     d:"Realizar check-in do paciente no sistema AMEI",                       ic:"ti-check",         c:"green"},
    {l:"Planilha",          d:"Registrar o exame na planilha",                                       ic:"ti-table",         c:"purple"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]},
  {id:"eco",      name:"Ecocardiograma",          icon:"ti-heart-rate-monitor",orient:false, steps:[
    {l:"Planilha",          d:"Registrar o exame na planilha",                                       ic:"ti-table",         c:"purple"},
    {l:"PE + Protocol",     d:"Entregar papel de encaminhamento e papelzinho com a data",            ic:"ti-files",         c:"amber"}]},
  {id:"ergo",     name:"Teste Ergometrico",       icon:"ti-run",               orient:false, steps:[
    {l:"Planilha",          d:"Registrar na planilha (se for agendar, incluir tambem)",              ic:"ti-table",         c:"purple"},
    {l:"AI - Cardio",       d:"Chamar senha e encaminhar para Cardiologia no sistema Intelite",       ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]},
  {id:"stelio",   name:"Dr. Stelio",              icon:"ti-user-scan",         orient:true,  obs:"Ficar com o PE e colocar em recibos conferencia.", steps:[
    {l:"Planilha (data/ok)",d:"Registrar a data e dar ok na planilha",                               ic:"ti-table",         c:"purple"},
    {l:"Guardar PE",        d:"Ficar com o PE e colocar em recibos conferencia",                     ic:"ti-file-text",     c:"amber"}]},
  {id:"arthur",   name:"Dr. Arthur",              icon:"ti-user-circle",       orient:false, obs:"Entregar PE para o Jean ou Joao.", steps:[
    {l:"AI",                d:"Chamar senha no sistema Intelite",                                     ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE - Jean / Joao",  d:"Entregar o papel de encaminhamento para o Jean ou Joao",              ic:"ti-file-text",     c:"amber"}]},
  {id:"elton",    name:"Dr. Elton",               icon:"ti-user-circle",       orient:false, obs:"Valor: R$ 240,00 por paciente.", steps:[
    {l:"Ok na Planilha",    d:"Dar ok na planilha",                                                  ic:"ti-table",         c:"purple"},
    {l:"AI",                d:"Chamar senha no sistema Intelite - R$ 240,00 cada",                   ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"}]},
  {id:"katia",    name:"Dra. Katia",              icon:"ti-user-circle",       orient:false, obs:"Valor: R$ 80,00 por paciente.", steps:[
    {l:"Check-in AMEI",     d:"Realizar check-in no sistema AMEI - R$ 80,00 cada",                   ic:"ti-check",         c:"green"},
    {l:"AI",                d:"Chamar senha no sistema Intelite",                                     ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"}]},
  {id:"oftalmo_r",name:"Oftalmo c/ Equipe Raiza", icon:"ti-eye",              orient:false, steps:[
    {l:"Maquininha Amarela",d:"Cobrar o paciente na maquininha amarela",                             ic:"ti-credit-card",   c:"pink"},
    {l:"Planilha",          d:"Registrar na planilha",                                               ic:"ti-table",         c:"purple"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]},
  {id:"oftalmo_s",name:"Oftalmo s/ Equipe Raiza", icon:"ti-eye-off",          orient:false, steps:[
    {l:"Cobrar Normalmente",d:"Realizar a cobranca pelo sistema padrao",                             ic:"ti-credit-card",   c:"pink"},
    {l:"Check-in AMEI",     d:"Realizar check-in do paciente no sistema AMEI",                       ic:"ti-check",         c:"green"},
    {l:"AI - Triagem",      d:"Chamar senha e encaminhar para Triagem no sistema Intelite",          ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]},
  {id:"derm_p",   name:"Dermato Paiva",           icon:"ti-stethoscope",       orient:false, steps:[
    {l:"Planilha",          d:"Registrar na planilha",                                               ic:"ti-table",         c:"purple"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]},
  {id:"derm_r",   name:"Dermato Rafael",          icon:"ti-stethoscope",       orient:false, steps:[
    {l:"Check-in AMEI",     d:"Realizar check-in do paciente no sistema AMEI",                       ic:"ti-check",         c:"green"},
    {l:"AI",                d:"Chamar senha no sistema Intelite",                                     ic:"ti-device-desktop",c:"teal",  link:"https://amorsaudesp2.intelite.com.br/panel-dev/attendance"},
    {l:"PE",                d:"Entregar papel de encaminhamento",                                    ic:"ti-file-text",     c:"amber"}]}
];

/* ── CONVÊNIOS ───────────────────────────────────── */
var CONV = {
  amhemed:{name:"AMHEMED",pill:"p-amhemed",nc:"c-blue",steps:[
    "Pesquisar beneficiários &rarr; Preencher &rarr; Tipo de guia <strong>SP/SADT</strong>",
    "Pedir o <strong>TOKEN</strong> &rarr; Digitalizar o pedido médico e anexar no convênio",
    "Imprimir e dar para o pac <strong>assinar</strong>",
    "No seu caixa: guardar as <strong>guias + recibo + pedido médico</strong>",
    "Ir no AMEI &rarr; Fazer a proposta &rarr; Dar <strong>recibo + encaminhamento</strong> para o paciente"]},
  amil:{name:"AMIL",pill:"p-amil",nc:"c-purple",steps:[
    "Inserir o <strong>CPF</strong> &rarr; Inserir o <strong>CRM e CBB</strong> do médico &rarr; Colocar os pedidos",
    "Solicitar o <strong>TOKEN</strong> e imprimir o resto",
    "Ir no AMEI &rarr; Fazer a proposta &rarr; Dar <strong>recibo + encaminhamento</strong> para o paciente"]}
};

/* ── AVISOS ──────────────────────────────────────── */
var NOTES = [
  {ic:"ti-clock",          t:"<strong>Curva lactose / Prolactina:</strong> orientar para vir as <strong>06:30 SEMPRE</strong>"},
  {ic:"ti-user-check",     t:"<strong>Mamografia:</strong> somente para pacientes com <strong>+40 anos</strong>"},
  {ic:"ti-calendar-clock", t:"<strong>Coleta:</strong> 06:30 - 10:00 (dias de semana) &nbsp;&middot;&nbsp; 06:30 - 09:00 (sábados)"},
  {ic:"ti-ban",            t:"<strong>Dr. Victor Hugo (US):</strong> NÃO faz mamas"},
  {ic:"ti-equal",          t:"<strong>Parede abdominal</strong> = Abdômen superior"},
];

/* ── LEGENDA ─────────────────────────────────────── */
var LEGEND = [
  {k:"AMEI",    l:"Etiqueta AMEI",           ic:"ti-tag"},
  {k:"PE",      l:"Papel de Encaminhamento", ic:"ti-file-text"},
  {k:"Check",   l:"Check-in AMEI",           ic:"ti-check"},
  {k:"Sheets",  l:"Planilha",                ic:"ti-table"},
  {k:"Protocol",l:"Papelzinho com Data",     ic:"ti-calendar"},
  {k:"!",       l:"Tem orientação médica",   ic:"ti-alert-circle"},
];

/* ── LINKS RÁPIDOS ───────────────────────────────── */
var LINKS_DB = [
  {
    title: "Controle Geral", icon: "ti-settings",
    items: [
      {n: "Tabelas de códigos, ramais, preços",  u: "https://docs.google.com/spreadsheets/d/15Ou1_Zjwxw1g0V5WPfCm2CF0PaPhqTI1obupeJfDp9I/edit?gid=0#gid=0"},
      {n: "Agendas e horários",                  u: "https://docs.google.com/spreadsheets/d/1mPg5Y8bWl00o-YF8nynTyJMHLjeVrRDriy88OyV2yfk/edit?gid=1439954183#gid=1439954183"},
      {n: "Crédito em conta",                    u: "https://script.google.com/macros/s/AKfycbwq0iM0aDXmkFVR_gVHIj7NEeychUrjgAlZnH0cFHqpIJbmFZTbIs40FdvLROmiDOJ5/exec"},
      {n: "Preço gerais dos exames",             u: "https://docs.google.com/spreadsheets/d/1P7x1s2bth3xM6BVlt2VrHt9ZCccryh_rzUFdXn_KWTM/edit?gid=0#gid=0"}
    ]
  },
  {
    title: "Retirada de Exames", icon: "ti-folder",
    items: [
      {n: "Mamografia",               u: "https://docs.google.com/spreadsheets/d/1W-ppIb3PVmej78fy_-cAfQVgvIRsxS2rjCTK4J_FnGM/edit?gid=0#gid=0"},
      {n: "Raio-X",                   u: "https://docs.google.com/spreadsheets/d/1TwkV4itZBrGspRviPFzCTFZ1Uz8Eo625Z0vL_i8tRWc/edit?gid=0#gid=0"},
      {n: "Urofluxometria",           u: "https://docs.google.com/spreadsheets/d/1lZjWB1coVLY6W5rZ5EpV-ORG9xL-u-Jk2HjfHYKfhOM/edit?gid=0#gid=0"},
      {n: "Ecocardiograma",           u: "https://docs.google.com/spreadsheets/d/1Vrjng84w1ppib8NzIw48MCPrxCxsnrF8_J6Q4Zvcomg/edit?gid=0#gid=0"},
      {n: "Teste Ergometrico",        u: "https://docs.google.com/spreadsheets/d/1WeUd-39Ac6fasznROUxR-SNewQlprMZUeAVv3-EWOFY/edit?gid=0#gid=0"},
      {n: "Eletrocardiograma (ECG)",  u: "https://docs.google.com/spreadsheets/d/1ZAKMBLTtn8j8FinImDdOB5wus1UcJyZM2OOE7l9jxwk/edit?gid=0#gid=0"},
      {n: "Mapa e Holter",            u: "https://docs.google.com/spreadsheets/d/1dmJU21VQqwUJgGUTel3XOeOn5b-jD-o75uLkPjIjpp4/edit?gid=0#gid=0"},
      {n: "Exames Stelio",            u: "https://docs.google.com/spreadsheets/d/1XUOOAI7-KX-ac6pUtuuHV2GI1w00_UE2rcOdDPWNWuc/edit?gid=0#gid=0"},
      {n: "Exames Arthur",            u: "https://docs.google.com/spreadsheets/d/1SAOtKf5xFNNcv-prf3DPPG8mUZoYh9i3KpwGa9AyJj4/edit?gid=0#gid=0"},
      {n: "Exames Vascular",          u: "https://docs.google.com/spreadsheets/d/1RWkeM8sHtEGnMaRKGfRc5flLblQMx_px7SrNpbULdPQ/edit?gid=0#gid=0"},
      {n: "Mapeamento de Retina",     u: "https://docs.google.com/spreadsheets/d/1KYe3zxNXhoTxjliRPldryaVyuNqHMlqvnurPHEWzH0M/edit?gid=0#gid=0"},
      {n: "Endoscopia e Colonoscopia",u: "https://docs.google.com/spreadsheets/d/1GLxtYUfDHzolzR9rqhByWxM14CYJmGeKIFslgmX51fg/edit?gid=0#gid=0"},
      {n: "Ultrassom",                u: "https://docs.google.com/spreadsheets/d/1qprak_CxvhTESUUABq3zKlCJppDFFAF4Yp-hwzgqVPI/edit?gid=0#gid=0"}
    ]
  },
  {
    title: "Controle Exames e Procedimentos", icon: "ti-stethoscope",
    groups: [
      {sub:"Ultrassom", items:[
        {n:"Cidney Knupp",      u:"https://docs.google.com/spreadsheets/d/1Vg5yR7DgtxczWk7oTuptQ_wbfbH5LoQPaf4Z7ZMJgZU/edit?gid=0#gid=0"},
        {n:"Carolina Guarnieri",u:"https://docs.google.com/spreadsheets/d/1sTbAljNXItrqmqU5gpQ5q_H7nzi2Jh_ig8Nq_WP1ewg/edit?gid=621510400#gid=621510400"},
        {n:"Victor Hugo",       u:"https://docs.google.com/spreadsheets/d/1oyVjKoZr0fc-dVmvJdsrZH5dnOi_PEqkmLSc-eYHHjY/edit?gid=341405889#gid=341405889"},
        {n:"Caroline Lopes",    u:"https://docs.google.com/spreadsheets/d/1YIvDLffBBESu3HUfNXvq0iaRo5QHj2ronsugICRKAiw/edit?gid=2119276751#gid=2119276751"}
      ]},
      {sub:"Dermatologistas", items:[
        {n:"Rafael",u:"https://docs.google.com/spreadsheets/d/1RO6Mm2PIhG3nc-3RWwLkWTmQ09OiylNZZmPBdxPdceQ/edit?gid=341405889#gid=341405889"},
        {n:"Paiva",u:"https://docs.google.com/spreadsheets/d/1iiMO_orZxUCP7Vkv0W0pfLnV8s0hlB7_Kd_qvP4WQWw/edit?gid=341405889#gid=341405889"}
      ]},
      {sub:"Oftalmo", items:[
        {n:"Debora Sant Anna",u:"https://docs.google.com/spreadsheets/d/1MX_wxC1WEahMvPMrzO0kmnt22vsMvvRR2vqPYKZaA5c/edit?gid=320211442#gid=320211442"},
        {n:"Marcos Raiza",    u:"https://docs.google.com/spreadsheets/d/1Ko5-g8a4kmey1iPomoLKMndPuZPXxXZ-vEOMZvYfVuM/edit?gid=733765550#gid=733765550"}
      ]},
      {sub:"Alergo", items:[
        {n:"Arthur",u:"https://docs.google.com/spreadsheets/d/1n1TSVs6IFTXHOLzpi_sW284FvULCbVBbPsj4bMvkrg8/edit?gid=341405889#gid=341405889"}
      ]},
      {sub:"Neuropsico", items:[
        {n:"Elton",u:"https://docs.google.com/spreadsheets/d/1DTv0r54i68t9nhYsWkCpThC5dfO2X4uCTnkmfdY9GI4/edit?gid=1287669305#gid=1287669305"}
      ]},
      {sub:"Neuro", items:[
        {n:"Stelio",u:"https://docs.google.com/spreadsheets/d/1rEplKmVlEY5MZwVTCFYKGEYjGKIW2TWTBzYrdNLqZcY/edit?gid=341405889#gid=341405889"}
      ]},
      {sub:"Vascular", items:[
        {n:"Vitor Gabriel",  u:"https://docs.google.com/spreadsheets/d/1YE4h3YShXX96ey3T0NjXpZrFUTF0JfrtuQL9J6m4D8Q/edit?gid=341405889#gid=341405889"},
        {n:"Rafael Califani",u:"https://docs.google.com/spreadsheets/d/1-08dG9zuLY36gbO_jYlbqasw1WQGoYlWGIZieThuRM4/edit?gid=1699541977#gid=1699541977"}
      ]},
      {sub:"Cardiologia", items:[
        {n:"Eco",              u:"https://docs.google.com/spreadsheets/d/1B5Nfyl_CZ2O-eE-1CjhpBIVfLHKcg4FcwAdQ8gh1J8Q/edit?gid=269251564#gid=269251564"},
        {n:"Teste Ergométrico",u:"https://docs.google.com/spreadsheets/d/1g3L9HfeVI1OyyUkCLDSjHs7BK8az0GyN1P8DpsLTNsU/edit?gid=341405889#gid=341405889"}
      ]}
    ]
  }
];

/* ── MÉDICOS ─────────────────────────────────────── */
var DOCTOR_DB = [
  {id:"dra_ulli",    name:"Dra. Ulli Aguiar",    fullName:"Ulli Aguiar Vasconcelos",              spec:"Oftalmologia",                reg:"CRM 255878",  days:"Seg · Sex",             rooms:"Sala 1",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_jose",     name:"Dr. Jose Renato",      fullName:"José Renato Junqueira Pádua Sesti",    spec:"Clínico Geral",               reg:"CRM 155509",  days:"Seg · Ter · Qua · Sex", rooms:"Sala 2 · Sala 4",           info:"Informações a preencher.",                                       alias:""},
  {id:"dra_crist",   name:"Dra. Cristiane",       fullName:"Cristiane Alessandra F. Nascimento",   spec:"Psicologia",                  reg:"CRP 200763",  days:"Seg · Qua · Sáb",       rooms:"Sala 3",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_elton",    name:"Dr. Elton Sella",      fullName:"Elton José Moraes Sella",              spec:"Neuropsicologia",             reg:"CRP 133856",  days:"Segunda-Feira",          rooms:"Sala 3",                    info:"R$ 240,00 por paciente. Ok na planilha + AI.",                   alias:""},
  {id:"dra_debora",  name:"Dra. Debora Alessi",   fullName:"Débora Batista de Moraes Alessi",      spec:"Ginecologia e Psiquiatria",   reg:"CRM 133705",  days:"Seg · Ter · Qui · Sáb", rooms:"Sala 4",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_emerson",  name:"Dr. Emerson",          fullName:"Emerson Antonio Marchetti",            spec:"Otorrinolaringologia",        reg:"CRM 84797",   days:"Segunda-Feira",          rooms:"Sala 5",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_luisg",    name:"Dr. Luis Gustavo",     fullName:"Luiz Gustavo Dos Santos Fogaça",       spec:"Nutricionista",               reg:"CRN 78279",   days:"Segunda-Feira",          rooms:"Sala 6",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_stelio",   name:"Dr. Stelio",           fullName:"Stelio Leal Pessanha",                 spec:"Neurologia",                  reg:"CRM 54407",   days:"Seg · Sex",              rooms:"Sala 7 · Sala 9 · Triagem", info:"Planilha (data/ok). Guardar PE em recibos conferência.",          alias:"Dr. Stelio Exames"},
  {id:"dr_escobar",  name:"Dr. Luiz Escobar",     fullName:"Luiz Augusto Escobar",                 spec:"Ortopedia",                   reg:"CRM 104715",  days:"Seg · Qua · Qui",       rooms:"Sala 8",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_raiza",    name:"Dr. Marcos Raiza",     fullName:"Marcos Raiza França Rangel",           spec:"Oftalmologia",                reg:"CRM 157346",  days:"Terça-Feira",            rooms:"Sala 1",                    info:"Equipe Raiza: maquininha amarela + planilha + PE.",               alias:""},
  {id:"dra_raquel",  name:"Dra. Raquel",          fullName:"Raquel Wartto Cyrineu",                spec:"Psicologia",                  reg:"CRP 47860",   days:"Ter · Qua · Qui",       rooms:"Sala 3",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_carol",   name:"Dra. Carol",           fullName:"Caroline De Medeiros Lopes",           spec:"Ultrassom",                   reg:"CRM 170810",  days:"Terça-Feira",            rooms:"Sala 8",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_leandro",  name:"Dr. Leandro",          fullName:"Leandro Barros Mendonça",              spec:"Gastroenterologia",           reg:"CRM 121945",  days:"Terça-Feira",            rooms:"Sala 8",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_antonio",  name:"Dr. Antonio Lopes",    fullName:"Antonio Carlos Ferreira Lopes",        spec:"Pediatria",                   reg:"CRM 60594",   days:"Terça-Feira",            rooms:"Sala 9",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_amanda",  name:"Dra. Amanda Brisola",  fullName:"Amanda Almeida Brisola",               spec:"Clínico Geral",               reg:"CRM 262316",  days:"Quarta-Feira",           rooms:"Sala 4",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_pacheco",  name:"Dr. Marco Pacheco",    fullName:"Marco Antonio Binotti Pacheco",        spec:"Cardiologia",                 reg:"CRM 119193",  days:"Quarta-Feira",           rooms:"Sala 5",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_cidney",   name:"Dr. Cidney",           fullName:"Cidney Knupp Neves Junior",            spec:"Ultrassom",                   reg:"CRM 229619",  days:"Quarta-Feira",           rooms:"Sala 8",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_rgatti",   name:"Dr. Renato Gatti",     fullName:"Renato Gatti de Oliveira",             spec:"Urologia e Gastroenterologia",reg:"CRM 86027",   days:"Quarta-Feira",           rooms:"Sala 9",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_gabriel",  name:"Dr. Gabriel",          fullName:"Gabriel Iago Montenegro Rodrigues",    spec:"Psicologia",                  reg:"CRP 141793",  days:"Qua · Qui · Sex",       rooms:"Triagem · Sala 3",          info:"Informações a preencher.",                                       alias:""},
  {id:"dr_arthur",   name:"Dr. Arthur",           fullName:"Arthur Rodrigues Pereira Neto",        spec:"Alergo / Pneumo / Reumato / Endócrino", reg:"CRM 50941", days:"Quinta-Feira", rooms:"Sala 1 · Sala 9",           info:"AI + PE para Jean ou João.",                                      alias:""},
  {id:"dra_tayna",   name:"Dra. Tayna",           fullName:"Tayna Gonçalves Luiz",                 spec:"Clínico Geral",               reg:"CRM 209027",  days:"Quinta-Feira",           rooms:"Sala 4",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_kiyoko",  name:"Dra. Kiyoko",          fullName:"Kiyoko Hayase Gomes Mota",             spec:"Pediatria",                   reg:"CRM 49593",   days:"Qui · Sáb",              rooms:"Sala 7 · Sala 9",           info:"Check-in AMEI + AI. R$ 80,00.",                                   alias:"Dr. Kiyoko"},
  {id:"dr_victor",   name:"Dr. Victor Hugo",      fullName:"Victor Hugo Valda Pedrazas",           spec:"Ultrassom",                   reg:"CRM 167300",  days:"Quinta-Feira",           rooms:"Sala 8",                    info:"NÃO faz mamas. Parede abdominal = Abdômen superior.",             alias:""},
  {id:"dr_enarco",   name:"Dr. Enarco",           fullName:"Enarco Grigolli",                      spec:"Gastroenterologia e Proctologia", reg:"CRM 54036", days:"Sexta-Feira",          rooms:"Sala 2",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_marcelo",  name:"Dr. Marcelo Mai",      fullName:"Marcelo Mai Jurado",                   spec:"Urologia",                    reg:"CRM 146014",  days:"Sexta-Feira",            rooms:"Sala 5",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_carolina",name:"Dra. Carolina",        fullName:"Carolina Ribeiro Guarnieri Marques",   spec:"Ultrassom",                   reg:"CRM 193473",  days:"Sexta-Feira",            rooms:"Sala 8",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_mariane", name:"Dra. Mariane",         fullName:"Mariane Thayna Norberto da Silva",     spec:"Psicologia",                  reg:"CRP 201484",  days:"Sábado",                 rooms:"Sala 2",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dra_katia",   name:"Dra. Katia Regina",    fullName:"Kátia Regina Soares Vieira",           spec:"Fonoaudiologia",              reg:"CRFA 24300",  days:"Sábado",                 rooms:"Sala 3",                    info:"Check-in AMEI + AI. R$ 80,00.",                                   alias:""},
  {id:"dr_luciano",  name:"Dr. Luciano",          fullName:"Luciano Polati Rechinelli",            spec:"Ortopedia",                   reg:"CRM 110195",  days:"Sábado",                 rooms:"Sala 7",                    info:"Informações a preencher.",                                       alias:""},
  {id:"dr_mpaiva",   name:"Dr. Marco Paiva",      fullName:"Marco Antonio Paiva Prado",            spec:"Dermatologia",                reg:"CRM 92116",   days:"Quarta-Feira",           rooms:"Sala 2",                    info:"Dermato Paiva: planilha + PE.",                                   alias:""},
  {id:"dr_rafael",   name:"Dr. Rafael",           fullName:"Rafael Vitor Gontijo Melo",            spec:"Dermatologia",                reg:"CRM 161734",  days:"A confirmar",            rooms:"A confirmar",               info:"Dermato Rafael: check-in AMEI + AI + PE.",                        alias:""},
];

/* ── LISTA DE EXAMES PARA ORÇAMENTO ─────────────── */
var EXAM_LIST = [
  {cat:"Laboratoriais", cls:"cat-lab", exams:[
    {id:"hemograma",       name:"Hemograma completo",           price:0},
    {id:"glicemia",        name:"Glicemia em jejum",            price:0},
    {id:"hba1c",           name:"HbA1c (Glicada)",              price:0},
    {id:"col_total",       name:"Colesterol total e frações",   price:0},
    {id:"triglicerideos",  name:"Triglicerídeos",               price:0},
    {id:"tsh",             name:"TSH",                          price:0},
    {id:"t4livre",         name:"T4 livre",                     price:0},
    {id:"ureia",           name:"Ureia",                        price:0},
    {id:"creatinina",      name:"Creatinina",                   price:0},
    {id:"tgo",             name:"TGO (AST)",                    price:0},
    {id:"tgp",             name:"TGP (ALT)",                    price:0},
    {id:"acido_urico",     name:"Ácido úrico",                  price:0},
    {id:"psa",             name:"PSA total",                    price:0},
    {id:"prolactina",      name:"Prolactina",                   price:0},
    {id:"curva_glic",      name:"Curva glicêmica",              price:0},
    {id:"curva_lact",      name:"Curva de lactose",             price:0},
    {id:"beta_hcg",        name:"Beta-HCG quantitativo",        price:0},
    {id:"vit_d",           name:"Vitamina D (25-OH)",           price:0},
    {id:"ferro",           name:"Ferro sérico",                 price:0},
    {id:"ferritina",       name:"Ferritina",                    price:0},
    {id:"vit_b12",         name:"Vitamina B12",                 price:0},
    {id:"pcr",             name:"Proteína C reativa (PCR)",     price:0},
    {id:"vhs",             name:"VHS",                          price:0},
    {id:"anti_tpo",        name:"Anticorpo anti-TPO",           price:0},
    {id:"tgo_tgp",         name:"TGO + TGP",                   price:0},
    {id:"gama_gt",         name:"Gama GT",                      price:0},
    {id:"fosfatase",       name:"Fosfatase alcalina",           price:0},
    {id:"bilirrubinas",    name:"Bilirrubinas totais",          price:0},
    {id:"albumina",        name:"Albumina sérica",              price:0},
    {id:"sodio",           name:"Sódio",                        price:0},
    {id:"potassio",        name:"Potássio",                     price:0},
    {id:"calcio",          name:"Cálcio total",                 price:0},
    {id:"magnesio",        name:"Magnésio",                     price:0},
    {id:"fosforo",         name:"Fósforo",                      price:0},
    {id:"amilase",         name:"Amilase",                      price:0},
    {id:"lipase",          name:"Lipase",                       price:0},
    {id:"inr",             name:"INR / TAP",                    price:0},
    {id:"ttpa",            name:"TTPA",                         price:0},
    {id:"urocultura",      name:"Urocultura + antibiograma",    price:0},
    {id:"eas",             name:"EAS (urina rotina)",           price:0},
    {id:"parasitologico",  name:"Parasitológico de fezes",      price:0},
    {id:"sangue_fezes",    name:"Sangue oculto nas fezes",      price:0},
    {id:"ige_total",       name:"IgE total",                    price:0},
    {id:"cortisol",        name:"Cortisol",                     price:0},
    {id:"insulina",        name:"Insulina",                     price:0},
    {id:"lh",              name:"LH",                           price:0},
    {id:"fsh",             name:"FSH",                          price:0},
    {id:"estradiol",       name:"Estradiol",                    price:0},
    {id:"testosterona",    name:"Testosterona total",           price:0},
    {id:"dhea",            name:"DHEA-S",                       price:0},
  ]},
  {cat:"Imagem / Radiodiagnóstico", cls:"cat-img", exams:[
    {id:"us_abd_total",    name:"US Abdômen total",             price:0},
    {id:"us_abd_sup",      name:"US Abdômen superior",          price:0},
    {id:"us_pelvico",      name:"US Pélvico",                   price:0},
    {id:"us_renal",        name:"US Renal",                     price:0},
    {id:"us_tireoide",     name:"US Tireoide",                  price:0},
    {id:"us_mamas",        name:"US Mamas",                     price:0},
    {id:"us_prostata",     name:"US Próstata",                  price:0},
    {id:"us_obstetrico",   name:"US Obstétrico",                price:0},
    {id:"us_morfologico",  name:"US Morfológico",               price:0},
    {id:"us_doppler",      name:"US Doppler venoso/arterial",   price:0},
    {id:"rx_torax",        name:"RX Tórax PA e Perfil",         price:0},
    {id:"rx_coluna",       name:"RX Coluna",                    price:0},
    {id:"rx_joelho",       name:"RX Joelho",                    price:0},
    {id:"mamografia",      name:"Mamografia bilateral (+40)",   price:0},
  ]},
  {cat:"Cardiologia", cls:"cat-cardio", exams:[
    {id:"ecg",             name:"ECG (Eletrocardiograma)",      price:0},
    {id:"ergometrico",     name:"Teste Ergométrico",            price:0},
    {id:"mapa_24",         name:"MAPA 24h",                     price:0},
    {id:"holter_24",       name:"HOLTER 24h",                   price:0},
    {id:"eco_card",        name:"Ecocardiograma",               price:0},
    {id:"eco_stress",      name:"Eco sob estresse",             price:0},
  ]},
  {cat:"Outros Exames", cls:"cat-outros", exams:[
    {id:"urofluxo_ex",     name:"Urofluxometria",               price:0},
    {id:"papa_ex",         name:"Papanicolau",                  price:0},
    {id:"biopsia_ex",      name:"Biópsia",                      price:0},
    {id:"espirometria",    name:"Espirometria",                 price:0},
    {id:"densitometria",   name:"Densitometria óssea",          price:0},
    {id:"endoscopia",      name:"Endoscopia digestiva",         price:0},
    {id:"colonoscopia",    name:"Colonoscopia",                 price:0},
    {id:"nasofibroscopia", name:"Nasofibroscopia",              price:0},
    {id:"audiometria",     name:"Audiometria",                  price:0},
    {id:"imitanciometria", name:"Imitanciometria",              price:0},
    {id:"eletroencefalog", name:"Eletroencefalograma (EEG)",    price:0},
  ]},
];

/* ── MAPA DE CORES DOS PASSOS ────────────────────── */
var CM = {blue:"c-blue",teal:"c-teal",amber:"c-amber",green:"c-green",purple:"c-purple",pink:"c-pink"};
