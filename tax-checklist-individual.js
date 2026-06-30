/* =============================================================================
   Y&S Accounting - Individual Tax Return Pre-Appointment Checklist
   taxbne.com.au  |  SGF AUSTRALIA PTY. LTD. (ABN 39 615 320 048)

   Tier 3 scripted form. Multi-step wizard, trilingual (EN / ES / PT).
   Collects which income/deduction items apply, plus the documents to bring,
   and emails a structured (English) summary to Sebastian via a hidden
   Webflow form (#wf-chk-form). No TFN or bank account numbers are collected.

   Mount point : <div id="psi-app"> (reused from the duplicated PSI page)
   Submit form : the duplicated PSI registered Webflow form #wf-psi-form
                 (guarantees the submission is recorded and emailed). Checklist
                 data is mapped into that form's existing fields below.

   GOLDEN RULES honoured: no <script> injection, no jsPDF, no em-dashes,
   single event binding per element, function declarations before use,
   global handlers attached once, every emailed value escaped.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- helpers ------------------------------------------------------------ */
  function L(en, es, pt) { return { en: en, es: es, pt: pt }; }

  var state = { step: 0, lang: 'en', answers: {}, touched: {}, submitted: false };

  function tr(obj) {
    if (!obj) return '';
    return obj[state.lang] || obj.en || '';
  }

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---- UI chrome strings (per language) ----------------------------------- */
  var T = {
    en: {
      brand: 'Y&S Accounting',
      title: 'Individual Tax Return Checklist',
      subtitle: 'For the 2025-26 financial year (1 July 2025 to 30 June 2026)',
      intro: 'Please complete this short checklist before your appointment so we can prepare your individual tax return efficiently. It takes about 5 minutes. Tick everything that applies to you, even if you are unsure, and we will confirm the details together.',
      langLabel: 'Choose your language',
      start: 'Start checklist',
      back: 'Back',
      next: 'Next',
      review: 'Review',
      submit: 'Submit checklist',
      stepOf: 'Step {a} of {b}',
      required: 'This field is required',
      errName: 'Please enter your full name',
      errEmail: 'Please enter a valid email address',
      errPhone: 'Please enter a valid phone number',
      yes: 'Yes', no: 'No', notsure: 'Not sure',
      reviewTitle: 'Review and submit',
      reviewIntro: 'Please check your answers below, then submit. We will receive your checklist and prepare for your appointment.',
      thanksTitle: 'Thank you',
      thanksText: 'Your checklist has been sent to Y&S Accounting. We will review it before your appointment. If anything changes, just let us know.',
      sending: 'Sending...',
      none: 'None selected',
      optional: 'optional'
    },
    es: {
      brand: 'Y&S Accounting',
      title: 'Lista de verificacion para tu declaracion de impuestos',
      subtitle: 'Para el ano fiscal 2025-26 (1 de julio de 2025 al 30 de junio de 2026)',
      intro: 'Completa esta breve lista antes de tu cita para que podamos preparar tu declaracion de impuestos de forma eficiente. Toma unos 5 minutos. Marca todo lo que se aplique a tu caso, aunque no estes seguro, y confirmaremos los detalles juntos.',
      langLabel: 'Elige tu idioma',
      start: 'Comenzar',
      back: 'Atras',
      next: 'Siguiente',
      review: 'Revisar',
      submit: 'Enviar lista',
      stepOf: 'Paso {a} de {b}',
      required: 'Este campo es obligatorio',
      errName: 'Por favor ingresa tu nombre completo',
      errEmail: 'Por favor ingresa un correo electronico valido',
      errPhone: 'Por favor ingresa un numero de telefono valido',
      yes: 'Si', no: 'No', notsure: 'No estoy seguro',
      reviewTitle: 'Revisar y enviar',
      reviewIntro: 'Revisa tus respuestas abajo y luego envia. Recibiremos tu lista y prepararemos tu cita.',
      thanksTitle: 'Gracias',
      thanksText: 'Tu lista fue enviada a Y&S Accounting. La revisaremos antes de tu cita. Si algo cambia, avisanos.',
      sending: 'Enviando...',
      none: 'Nada seleccionado',
      optional: 'opcional'
    },
    pt: {
      brand: 'Y&S Accounting',
      title: 'Lista de verificacao para sua declaracao de imposto',
      subtitle: 'Para o ano fiscal 2025-26 (1 de julho de 2025 a 30 de junho de 2026)',
      intro: 'Preencha esta breve lista antes da sua consulta para que possamos preparar sua declaracao de imposto com eficiencia. Leva cerca de 5 minutos. Marque tudo o que se aplica a voce, mesmo em caso de duvida, e confirmaremos os detalhes juntos.',
      langLabel: 'Escolha seu idioma',
      start: 'Comecar',
      back: 'Voltar',
      next: 'Proximo',
      review: 'Revisar',
      submit: 'Enviar lista',
      stepOf: 'Etapa {a} de {b}',
      required: 'Este campo e obrigatorio',
      errName: 'Por favor informe seu nome completo',
      errEmail: 'Por favor informe um e-mail valido',
      errPhone: 'Por favor informe um numero de telefone valido',
      yes: 'Sim', no: 'Nao', notsure: 'Nao tenho certeza',
      reviewTitle: 'Revisar e enviar',
      reviewIntro: 'Confira suas respostas abaixo e envie. Receberemos sua lista e prepararemos sua consulta.',
      thanksTitle: 'Obrigado',
      thanksText: 'Sua lista foi enviada para a Y&S Accounting. Vamos revisar antes da sua consulta. Se algo mudar, avise-nos.',
      sending: 'Enviando...',
      none: 'Nada selecionado',
      optional: 'opcional'
    }
  };
  function ui(k) { return (T[state.lang] && T[state.lang][k]) || T.en[k]; }

  /* ---- Step / field definitions ------------------------------------------- */
  /* field types: text, date, tel, email, select, textarea, checklist, yesno  */

  var STEPS = [
    {
      id: 'personal',
      title: L('Your details', 'Tus datos', 'Seus dados'),
      fields: [
        { id: 'pd_name', type: 'text',
          label: L('Full legal name', 'Nombre legal completo', 'Nome legal completo') },
        { id: 'pd_pref', type: 'text', opt: true,
          label: L('Preferred name', 'Nombre preferido', 'Nome preferido') },
        { id: 'pd_dob', type: 'date', opt: true,
          label: L('Date of birth', 'Fecha de nacimiento', 'Data de nascimento') },
        { id: 'pd_address', type: 'text', opt: true,
          label: L('Current residential address', 'Direccion residencial actual', 'Endereco residencial atual') },
        { id: 'pd_occupation', type: 'text', opt: true,
          label: L('Occupation', 'Ocupacion', 'Ocupacao') },
        { id: 'pd_newclient', type: 'yesno', opt: true,
          label: L('Are you a new client?', 'Eres cliente nuevo?', 'Voce e cliente novo?') },
        { id: 'pd_residency', type: 'select', opt: true,
          label: L('Tax residency status', 'Estado de residencia fiscal', 'Status de residencia fiscal'),
          options: [
            { id: 'resident', label: L('Australian resident', 'Residente australiano', 'Residente australiano') },
            { id: 'foreign', label: L('Foreign resident', 'Residente extranjero', 'Residente estrangeiro') },
            { id: 'whm', label: L('Working holiday maker', 'Working holiday maker', 'Working holiday maker') },
            { id: 'unsure', label: L('Not sure', 'No estoy seguro', 'Nao tenho certeza') }
          ] },
        { id: 'pd_marital', type: 'select', opt: true,
          label: L('Relationship status', 'Estado civil', 'Estado civil'),
          options: [
            { id: 'single', label: L('Single', 'Soltero', 'Solteiro') },
            { id: 'couple', label: L('Married or de facto', 'Casado o union de hecho', 'Casado ou uniao estavel') }
          ] },
        { id: 'pd_spouse', type: 'text', opt: true,
          label: L('Spouse name (if applicable)', 'Nombre del conyuge (si aplica)', 'Nome do conjuge (se aplicavel)') },
        { id: 'pd_spouse_income', type: 'text', opt: true,
          label: L('Spouse estimated taxable income', 'Ingreso gravable estimado del conyuge', 'Renda tributavel estimada do conjuge') },
        { id: 'pd_dependents', type: 'select', opt: true,
          label: L('Number of dependent children', 'Numero de hijos dependientes', 'Numero de filhos dependentes'),
          options: [
            { id: '0', label: L('0', '0', '0') },
            { id: '1', label: L('1', '1', '1') },
            { id: '2', label: L('2', '2', '2') },
            { id: '3', label: L('3', '3', '3') },
            { id: '4+', label: L('4 or more', '4 o mas', '4 ou mais') }
          ] }
      ]
    },

    {
      id: 'income',
      title: L('Income you received', 'Ingresos que recibiste', 'Rendimentos que voce recebeu'),
      intro: L('Tick every type of income you had during the financial year.',
               'Marca cada tipo de ingreso que tuviste durante el ano fiscal.',
               'Marque cada tipo de rendimento que voce teve durante o ano fiscal.'),
      fields: [
        { id: 'inc_items', type: 'checklist',
          label: L('Income types', 'Tipos de ingreso', 'Tipos de rendimento'),
          options: [
            { id: 'salary', label: L('Salary or wages (PAYG income statement)', 'Salario o sueldo (PAYG income statement)', 'Salario ou ordenado (PAYG income statement)') },
            { id: 'govt', label: L('Government payments (Centrelink, pension, JobSeeker, parental leave)', 'Pagos del gobierno (Centrelink, pension, JobSeeker, licencia parental)', 'Pagamentos do governo (Centrelink, pensao, JobSeeker, licenca parental)') },
            { id: 'interest', label: L('Bank interest', 'Intereses bancarios', 'Juros bancarios') },
            { id: 'dividends', label: L('Dividends from Australian shares', 'Dividendos de acciones australianas', 'Dividendos de acoes australianas') },
            { id: 'managed', label: L('Managed fund or ETF distributions', 'Distribuciones de fondos o ETF', 'Distribuicoes de fundos ou ETF') },
            { id: 'trust', label: L('Trust or partnership distributions', 'Distribuciones de fideicomiso o sociedad', 'Distribuicoes de trust ou sociedade') },
            { id: 'rental', label: L('Rental property income', 'Ingresos por alquiler de propiedad', 'Renda de imovel alugado') },
            { id: 'cgt', label: L('Capital gains (sold shares, property, crypto or other assets)', 'Ganancias de capital (venta de acciones, propiedad, cripto u otros bienes)', 'Ganhos de capital (venda de acoes, imovel, cripto ou outros bens)') },
            { id: 'crypto', label: L('Cryptocurrency activity', 'Actividad con criptomonedas', 'Atividade com criptomoedas') },
            { id: 'business', label: L('Business or sole trader income (ABN)', 'Ingresos de negocio o autonomo (ABN)', 'Renda de negocio ou autonomo (ABN)') },
            { id: 'contractor', label: L('Contractor or personal services income', 'Ingresos como contratista o servicios personales', 'Renda como prestador de servicos') },
            { id: 'foreign', label: L('Foreign income (overseas wages, pension or investments)', 'Ingresos del extranjero (sueldos, pension o inversiones)', 'Rendimentos do exterior (salarios, pensao ou investimentos)') }
          ] },
        { id: 'inc_notes', type: 'textarea', opt: true,
          label: L('Other income or notes', 'Otros ingresos o notas', 'Outros rendimentos ou observacoes') }
      ]
    },

    {
      id: 'deductions',
      title: L('Deductions you may claim', 'Deducciones que podrias reclamar', 'Deducoes que voce pode reivindicar'),
      intro: L('Tick every expense you think you can claim. You will need records or receipts for these.',
               'Marca cada gasto que crees que puedes reclamar. Necesitaras registros o recibos.',
               'Marque cada despesa que voce acha que pode reivindicar. Sera preciso ter comprovantes.'),
      fields: [
        { id: 'ded_items', type: 'checklist',
          label: L('Deduction types', 'Tipos de deduccion', 'Tipos de deducao'),
          options: [
            { id: 'wfh', label: L('Working from home', 'Trabajo desde casa', 'Trabalho em casa') },
            { id: 'car', label: L('Car or vehicle use for work', 'Uso de auto o vehiculo para el trabajo', 'Uso de carro ou veiculo para o trabalho') },
            { id: 'travel', label: L('Other work-related travel', 'Otros viajes relacionados con el trabajo', 'Outras viagens a trabalho') },
            { id: 'clothing', label: L('Uniforms, protective clothing and laundry', 'Uniformes, ropa protectora y lavanderia', 'Uniformes, roupas de protecao e lavanderia') },
            { id: 'tools', label: L('Tools, equipment and technology', 'Herramientas, equipo y tecnologia', 'Ferramentas, equipamentos e tecnologia') },
            { id: 'education', label: L('Self-education or professional development', 'Autoeducacion o desarrollo profesional', 'Autoeducacao ou desenvolvimento profissional') },
            { id: 'phone', label: L('Phone and internet', 'Telefono e internet', 'Telefone e internet') },
            { id: 'union', label: L('Union fees, memberships and subscriptions', 'Cuotas sindicales, membresias y suscripciones', 'Sindicato, associacoes e assinaturas') },
            { id: 'income_prot', label: L('Income protection insurance (outside super)', 'Seguro de proteccion de ingresos (fuera del super)', 'Seguro de protecao de renda (fora do super)') },
            { id: 'donations', label: L('Donations to registered charities', 'Donaciones a organizaciones beneficas registradas', 'Doacoes a instituicoes registradas') },
            { id: 'investment', label: L('Investment expenses (loan interest, fees)', 'Gastos de inversion (intereses de prestamo, comisiones)', 'Despesas de investimento (juros de emprestimo, taxas)') },
            { id: 'super', label: L('Personal super contributions (notice of intent to claim)', 'Aportes personales al super (aviso de intencion de reclamar)', 'Contribuicoes pessoais ao super (aviso de intencao)') }
          ] },
        { id: 'ded_notes', type: 'textarea', opt: true,
          label: L('Other deductions or notes', 'Otras deducciones o notas', 'Outras deducoes ou observacoes') }
      ]
    },

    {
      id: 'offsets',
      title: L('Offsets and other matters', 'Compensaciones y otros asuntos', 'Abatimentos e outros assuntos'),
      fields: [
        { id: 'off_health', type: 'select', opt: true,
          label: L('Private health insurance', 'Seguro de salud privado', 'Plano de saude privado'),
          options: [
            { id: 'yes', label: L('Yes, I have a statement', 'Si, tengo el comprobante', 'Sim, tenho o comprovante') },
            { id: 'no', label: L('No', 'No', 'Nao') },
            { id: 'unsure', label: L('Not sure', 'No estoy seguro', 'Nao tenho certeza') }
          ] },
        { id: 'off_hecs', type: 'yesno', opt: true,
          label: L('Do you have a HECS, HELP or student loan debt?', 'Tienes deuda HECS, HELP o de prestamo estudiantil?', 'Voce tem divida HECS, HELP ou de emprestimo estudantil?') },
        { id: 'off_medicare', type: 'yesno', opt: true,
          label: L('Do you have a Medicare levy exemption or reduction?', 'Tienes exencion o reduccion del Medicare levy?', 'Voce tem isencao ou reducao do Medicare levy?') },
        { id: 'off_overseas', type: 'yesno', opt: true,
          label: L('Did you spend time living or working overseas this year?', 'Pasaste tiempo viviendo o trabajando en el extranjero este ano?', 'Voce passou tempo morando ou trabalhando no exterior este ano?') },
        { id: 'off_notes', type: 'textarea', opt: true,
          label: L('Anything else about offsets or your situation', 'Algo mas sobre compensaciones o tu situacion', 'Algo mais sobre abatimentos ou sua situacao') }
      ]
    },

    {
      id: 'documents',
      title: L('Documents to bring', 'Documentos para traer', 'Documentos para trazer'),
      intro: L('Tick the documents you already have ready. Bring the rest to your appointment.',
               'Marca los documentos que ya tienes listos. Trae el resto a tu cita.',
               'Marque os documentos que voce ja tem prontos. Traga o restante a sua consulta.'),
      fields: [
        { id: 'doc_items', type: 'checklist',
          label: L('Documents ready', 'Documentos listos', 'Documentos prontos'),
          options: [
            { id: 'id', label: L('Photo ID (driver licence or passport)', 'Identificacion con foto (licencia o pasaporte)', 'Documento com foto (carteira ou passaporte)') },
            { id: 'tfn', label: L('Tax File Number (or confirm it is on file)', 'Tax File Number (o confirmar que esta en archivo)', 'Tax File Number (ou confirmar que esta no arquivo)') },
            { id: 'bank', label: L('Bank account details for your refund', 'Datos bancarios para tu reembolso', 'Dados bancarios para sua restituicao') },
            { id: 'lastreturn', label: L('Last year tax return (new clients)', 'Declaracion del ano pasado (clientes nuevos)', 'Declaracao do ano passado (clientes novos)') },
            { id: 'payg', label: L('PAYG income statements or payment summaries', 'PAYG income statements o payment summaries', 'PAYG income statements ou payment summaries') },
            { id: 'interest', label: L('Bank interest summary', 'Resumen de intereses bancarios', 'Resumo de juros bancarios') },
            { id: 'dividends', label: L('Dividend and distribution statements', 'Estados de dividendos y distribuciones', 'Extratos de dividendos e distribuicoes') },
            { id: 'health', label: L('Private health insurance statement', 'Comprobante de seguro de salud privado', 'Comprovante de plano de saude privado') },
            { id: 'receipts', label: L('Receipts for work-related expenses', 'Recibos de gastos relacionados con el trabajo', 'Recibos de despesas de trabalho') },
            { id: 'logbook', label: L('Car logbook or work-from-home records', 'Bitacora del auto o registros de trabajo desde casa', 'Diario do carro ou registros de trabalho em casa') },
            { id: 'rental', label: L('Rental property: agent summary, loan and expense records', 'Propiedad de alquiler: resumen del agente, prestamo y gastos', 'Imovel alugado: resumo do agente, emprestimo e despesas') },
            { id: 'cgt', label: L('Capital gains: buy and sell contracts, dates and amounts', 'Ganancias de capital: contratos de compra y venta, fechas e importes', 'Ganhos de capital: contratos de compra e venda, datas e valores') },
            { id: 'crypto', label: L('Cryptocurrency transaction report', 'Informe de transacciones de criptomonedas', 'Relatorio de transacoes de criptomoedas') }
          ] }
      ]
    },

    {
      id: 'contact',
      title: L('Your contact details', 'Tus datos de contacto', 'Seus dados de contato'),
      intro: L('So we can confirm your appointment and follow up if needed.',
               'Para confirmar tu cita y dar seguimiento si es necesario.',
               'Para confirmar sua consulta e dar retorno se necessario.'),
      fields: [
        { id: 'c_name', type: 'text',
          label: L('Full name', 'Nombre completo', 'Nome completo') },
        { id: 'c_email', type: 'email',
          label: L('Email address', 'Correo electronico', 'E-mail') },
        { id: 'c_phone', type: 'tel', opt: true,
          label: L('Phone number', 'Numero de telefono', 'Numero de telefone') },
        { id: 'c_appt', type: 'textarea', opt: true,
          label: L('Preferred appointment times or availability', 'Horarios o disponibilidad preferidos', 'Horarios ou disponibilidade preferidos') },
        { id: 'c_comments', type: 'textarea', opt: true,
          label: L('Anything else we should know', 'Algo mas que debamos saber', 'Algo mais que devemos saber') }
      ]
    }
  ];

  /* ---- validation --------------------------------------------------------- */
  var RE_NAME = /^[a-zA-ZÀ-ɏḀ-ỿ\s\-'.]+$/;
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var RE_PHONE = /^[\d\s\-()+]+$/;

  function fieldError(field, val) {
    val = (val || '').trim();
    if (field.id === 'c_name') {
      if (val.length < 2 || !RE_NAME.test(val)) return ui('errName');
      return '';
    }
    if (field.id === 'c_email') {
      if (!RE_EMAIL.test(val)) return ui('errEmail');
      return '';
    }
    if (field.id === 'c_phone') {
      if (val && !RE_PHONE.test(val)) return ui('errPhone');
      return '';
    }
    if (!field.opt && field.type !== 'checklist' && !val) return ui('required');
    return '';
  }

  function stepIsValid(stepIdx) {
    var step = STEPS[stepIdx];
    var ok = true;
    for (var i = 0; i < step.fields.length; i++) {
      var f = step.fields[i];
      if (f.type === 'checklist' || f.type === 'yesno') continue;
      if (fieldError(f, state.answers[f.id])) ok = false;
    }
    return ok;
  }

  /* ---- styles (injected once) -------------------------------------------- */
  function injectStyles() {
    if (window.__chkStyles) return;
    window.__chkStyles = true;
    var css = [
      '#chk-app{--navy:#0B2A4A;--gold:#C9A24B;--ink:#1c2733;--mut:#5b6b7a;--line:#e2e8ee;--bg:#f7f9fb;',
      'font-family:Inter,Arial,Helvetica,sans-serif;color:var(--ink);max-width:760px;margin:0 auto;}',
      '#chk-app *{box-sizing:border-box;}',
      '.chk-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:28px 28px 22px;box-shadow:0 6px 24px rgba(11,42,74,.06);}',
      '.chk-brand{font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:700;margin:0 0 6px;}',
      '.chk-h1{font-size:25px;line-height:1.2;margin:0 0 6px;color:var(--navy);font-weight:800;}',
      '.chk-sub{color:var(--mut);font-size:14px;margin:0 0 14px;}',
      '.chk-intro{font-size:15px;line-height:1.55;color:var(--ink);margin:0 0 18px;}',
      '.chk-prog{height:7px;background:var(--line);border-radius:99px;overflow:hidden;margin:0 0 6px;}',
      '.chk-prog>span{display:block;height:100%;background:var(--gold);transition:width .25s;}',
      '.chk-step-meta{font-size:12px;color:var(--mut);text-transform:uppercase;letter-spacing:.08em;margin:0 0 16px;}',
      '.chk-step-title{font-size:20px;color:var(--navy);font-weight:800;margin:0 0 4px;}',
      '.chk-step-intro{font-size:14px;color:var(--mut);margin:0 0 18px;}',
      '.chk-field{margin:0 0 16px;}',
      '.chk-label{display:block;font-size:14px;font-weight:600;color:var(--ink);margin:0 0 6px;}',
      '.chk-opt-tag{font-weight:400;color:var(--mut);font-size:12px;}',
      '.chk-input,.chk-select,.chk-textarea{width:100%;border:1px solid var(--line);border-radius:9px;padding:11px 12px;font-size:15px;font-family:inherit;color:var(--ink);background:#fff;}',
      '.chk-input:focus,.chk-select:focus,.chk-textarea:focus{outline:none;border-color:var(--navy);box-shadow:0 0 0 3px rgba(11,42,74,.08);}',
      '.chk-textarea{min-height:84px;resize:vertical;}',
      '.chk-invalid{border-color:#d64545 !important;}',
      '.chk-err{color:#d64545;font-size:12.5px;margin:5px 0 0;display:none;}',
      '.chk-check{display:flex;align-items:flex-start;gap:11px;padding:11px 13px;border:1px solid var(--line);border-radius:10px;margin:0 0 9px;cursor:pointer;transition:border-color .15s,background .15s;}',
      '.chk-check:hover{border-color:var(--gold);}',
      '.chk-check.on{border-color:var(--gold);background:#fcf8ef;}',
      '.chk-check input{margin-top:2px;width:18px;height:18px;accent-color:var(--gold);flex:0 0 auto;}',
      '.chk-check span{font-size:14.5px;line-height:1.4;}',
      '.chk-yn{display:flex;gap:10px;}',
      '.chk-yn button{flex:1;border:1px solid var(--line);background:#fff;border-radius:9px;padding:10px;font-size:14px;font-family:inherit;cursor:pointer;color:var(--ink);}',
      '.chk-yn button.on{border-color:var(--navy);background:var(--navy);color:#fff;font-weight:600;}',
      '.chk-nav{display:flex;justify-content:space-between;gap:12px;margin-top:22px;padding-top:18px;border-top:1px solid var(--line);}',
      '.chk-btn{border:none;border-radius:10px;padding:13px 22px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;}',
      '.chk-btn-primary{background:var(--navy);color:#fff;}',
      '.chk-btn-primary:hover{background:#0f3a63;}',
      '.chk-btn-ghost{background:#fff;color:var(--navy);border:1px solid var(--line);}',
      '.chk-btn-ghost:hover{border-color:var(--navy);}',
      '.chk-btn[disabled]{opacity:.5;cursor:not-allowed;}',
      '.chk-langs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:6px 0 4px;}',
      '.chk-lang{border:1px solid var(--line);border-radius:12px;padding:18px 10px;text-align:center;cursor:pointer;font-weight:600;color:var(--navy);background:#fff;}',
      '.chk-lang:hover{border-color:var(--gold);}',
      '.chk-lang.on{border-color:var(--gold);background:#fcf8ef;}',
      '.chk-lang small{display:block;color:var(--mut);font-weight:400;font-size:12px;margin-top:3px;}',
      '.chk-review h4{color:var(--navy);font-size:15px;margin:18px 0 6px;border-bottom:1px solid var(--line);padding-bottom:5px;}',
      '.chk-review-row{font-size:14px;padding:4px 0;display:flex;gap:8px;}',
      '.chk-review-row b{color:var(--mut);font-weight:600;min-width:38%;}',
      '.chk-thanks{text-align:center;padding:18px 6px;}',
      '.chk-thanks .ico{font-size:42px;color:var(--gold);}',
      '.chk-thanks h2{color:var(--navy);margin:8px 0;}',
      '.chk-priv{font-size:12px;color:var(--mut);margin:14px 0 0;line-height:1.5;}',
      '@media(max-width:560px){.chk-card{padding:20px 16px;}.chk-langs{grid-template-columns:1fr;}.chk-h1{font-size:21px;}}'
    ].join('');
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---- rendering ---------------------------------------------------------- */
  var root;

  function render() {
    if (state.step === -1) { renderLang(); return; }
    if (state.submitted) { renderThanks(); return; }
    if (state.step >= STEPS.length) { renderReview(); return; }
    renderStep(STEPS[state.step]);
  }

  function renderLang() {
    var langs = [
      { c: 'en', n: 'English', s: 'English' },
      { c: 'es', n: 'Espanol', s: 'Spanish' },
      { c: 'pt', n: 'Portugues', s: 'Portuguese' }
    ];
    var html = '<div class="chk-card">' +
      '<p class="chk-brand">' + esc(ui('brand')) + '</p>' +
      '<h1 class="chk-h1">' + esc(ui('title')) + '</h1>' +
      '<p class="chk-sub">' + esc(ui('subtitle')) + '</p>' +
      '<p class="chk-intro">' + esc(ui('intro')) + '</p>' +
      '<p class="chk-label">' + esc(ui('langLabel')) + '</p><div class="chk-langs">';
    langs.forEach(function (l) {
      html += '<div class="chk-lang' + (state.lang === l.c ? ' on' : '') + '" data-lang="' + l.c + '">' +
        esc(l.n) + '<small>' + esc(l.s) + '</small></div>';
    });
    html += '</div><div class="chk-nav" style="justify-content:flex-end;">' +
      '<button class="chk-btn chk-btn-primary" id="chk-start">' + esc(ui('start')) + '</button></div></div>';
    root.innerHTML = html;

    var cards = root.querySelectorAll('.chk-lang');
    for (var i = 0; i < cards.length; i++) {
      cards[i].onclick = function () { state.lang = this.getAttribute('data-lang'); renderLang(); };
    }
    root.querySelector('#chk-start').onclick = function () { state.step = 0; render(); };
  }

  function renderStep(step) {
    var pct = Math.round(((state.step + 1) / (STEPS.length + 1)) * 100);
    var html = '<div class="chk-card">' +
      '<div class="chk-prog"><span style="width:' + pct + '%"></span></div>' +
      '<p class="chk-step-meta">' + esc(ui('stepOf').replace('{a}', state.step + 1).replace('{b}', STEPS.length + 1)) + '</p>' +
      '<h2 class="chk-step-title">' + esc(tr(step.title)) + '</h2>';
    if (step.intro) html += '<p class="chk-step-intro">' + esc(tr(step.intro)) + '</p>';

    step.fields.forEach(function (f) { html += renderField(f); });

    html += '<div class="chk-nav">' +
      '<button class="chk-btn chk-btn-ghost" id="chk-back">' + esc(ui('back')) + '</button>' +
      '<button class="chk-btn chk-btn-primary" id="chk-next">' +
        esc(state.step === STEPS.length - 1 ? ui('review') : ui('next')) + '</button></div>';
    html += '</div>';
    root.innerHTML = html;
    wireStep(step);
  }

  function renderField(f) {
    var val = state.answers[f.id];
    var optTag = f.opt ? ' <span class="chk-opt-tag">(' + esc(ui('optional')) + ')</span>' : '';
    var h = '<div class="chk-field" data-fid="' + f.id + '">';

    if (f.type === 'checklist') {
      h += '<label class="chk-label">' + esc(tr(f.label)) + '</label>';
      var sel = val || {};
      f.options.forEach(function (o) {
        var on = !!sel[o.id];
        h += '<label class="chk-check' + (on ? ' on' : '') + '" data-opt="' + o.id + '">' +
          '<input type="checkbox"' + (on ? ' checked' : '') + '>' +
          '<span>' + esc(tr(o.label)) + '</span></label>';
      });
    } else if (f.type === 'yesno') {
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label><div class="chk-yn">' +
        '<button type="button" data-yn="yes" class="' + (val === 'yes' ? 'on' : '') + '">' + esc(ui('yes')) + '</button>' +
        '<button type="button" data-yn="no" class="' + (val === 'no' ? 'on' : '') + '">' + esc(ui('no')) + '</button>' +
        '</div>';
    } else if (f.type === 'select') {
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label>' +
        '<select class="chk-select" id="fi-' + f.id + '"><option value="">-</option>';
      f.options.forEach(function (o) {
        h += '<option value="' + o.id + '"' + (val === o.id ? ' selected' : '') + '>' + esc(tr(o.label)) + '</option>';
      });
      h += '</select>';
    } else if (f.type === 'textarea') {
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label>' +
        '<textarea class="chk-textarea" id="fi-' + f.id + '">' + esc(val || '') + '</textarea>';
    } else {
      var typeAttr = f.type === 'email' ? 'email' : (f.type === 'tel' ? 'tel' : (f.type === 'date' ? 'date' : 'text'));
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label>' +
        '<input class="chk-input" type="' + typeAttr + '" id="fi-' + f.id + '" value="' + esc(val || '') + '">';
    }
    h += '<p class="chk-err" id="er-' + f.id + '"></p></div>';
    return h;
  }

  function showErr(fid, msg) {
    var input = root.querySelector('#fi-' + fid);
    var er = root.querySelector('#er-' + fid);
    if (er) { er.textContent = msg || ''; er.style.display = msg ? 'block' : 'none'; }
    if (input) { if (msg) input.classList.add('chk-invalid'); else input.classList.remove('chk-invalid'); }
  }

  function wireStep(step) {
    step.fields.forEach(function (f) {
      if (f.type === 'checklist') {
        var checks = root.querySelectorAll('[data-fid="' + f.id + '"] .chk-check');
        for (var i = 0; i < checks.length; i++) {
          checks[i].onclick = function (e) {
            if (e.target.tagName === 'INPUT') { /* let native toggle proceed */ } else { e.preventDefault(); }
            var optId = this.getAttribute('data-opt');
            var box = this.querySelector('input');
            var nowOn;
            if (e.target.tagName === 'INPUT') { nowOn = box.checked; }
            else { nowOn = !box.checked; box.checked = nowOn; }
            if (!state.answers[f.id]) state.answers[f.id] = {};
            if (nowOn) state.answers[f.id][optId] = true; else delete state.answers[f.id][optId];
            if (nowOn) this.classList.add('on'); else this.classList.remove('on');
          };
        }
      } else if (f.type === 'yesno') {
        var btns = root.querySelectorAll('[data-fid="' + f.id + '"] [data-yn]');
        for (var j = 0; j < btns.length; j++) {
          btns[j].onclick = function () {
            state.answers[f.id] = this.getAttribute('data-yn');
            var sib = root.querySelectorAll('[data-fid="' + f.id + '"] [data-yn]');
            for (var k = 0; k < sib.length; k++) sib[k].classList.remove('on');
            this.classList.add('on');
          };
        }
      } else {
        var input = root.querySelector('#fi-' + f.id);
        if (!input) return;
        input.oninput = function () {
          if (f.type === 'tel') {
            var cleaned = this.value.replace(/[^\d\s\-()+]/g, '');
            if (cleaned !== this.value) this.value = cleaned;
          }
          state.answers[f.id] = this.value;
          if (state.touched[f.id] || state.submitted) showErr(f.id, fieldError(f, this.value));
        };
        input.onblur = function () {
          state.touched[f.id] = true;
          state.answers[f.id] = this.value;
          showErr(f.id, fieldError(f, this.value));
        };
        if (f.type === 'select' || f.type === 'date') {
          input.onchange = function () {
            state.answers[f.id] = this.value;
            state.touched[f.id] = true;
            showErr(f.id, fieldError(f, this.value));
          };
        }
      }
    });

    root.querySelector('#chk-back').onclick = function () {
      state.step = state.step === 0 ? -1 : state.step - 1;
      render(); scrollTop();
    };
    root.querySelector('#chk-next').onclick = function () {
      var ok = true;
      step.fields.forEach(function (f) {
        if (f.type === 'checklist' || f.type === 'yesno') return;
        state.touched[f.id] = true;
        var msg = fieldError(f, state.answers[f.id]);
        showErr(f.id, msg);
        if (msg) ok = false;
      });
      if (!ok) return;
      state.step += 1;
      render(); scrollTop();
    };
  }

  function scrollTop() {
    try { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
  }

  /* ---- review + submit ---------------------------------------------------- */
  function renderReview() {
    var html = '<div class="chk-card chk-review">' +
      '<p class="chk-brand">' + esc(ui('brand')) + '</p>' +
      '<h2 class="chk-step-title">' + esc(ui('reviewTitle')) + '</h2>' +
      '<p class="chk-step-intro">' + esc(ui('reviewIntro')) + '</p>';

    STEPS.forEach(function (step) {
      html += '<h4>' + esc(tr(step.title)) + '</h4>';
      step.fields.forEach(function (f) {
        var disp = displayValue(f);
        if (disp === '') return;
        html += '<div class="chk-review-row"><b>' + esc(tr(f.label)) + '</b><span>' + esc(disp) + '</span></div>';
      });
    });

    html += '<div class="chk-nav">' +
      '<button class="chk-btn chk-btn-ghost" id="chk-back">' + esc(ui('back')) + '</button>' +
      '<button class="chk-btn chk-btn-primary" id="chk-submit">' + esc(ui('submit')) + '</button></div></div>';
    root.innerHTML = html;

    root.querySelector('#chk-back').onclick = function () { state.step = STEPS.length - 1; render(); scrollTop(); };
    root.querySelector('#chk-submit').onclick = doSubmit;
  }

  function displayValue(f) {
    var val = state.answers[f.id];
    if (f.type === 'checklist') {
      if (!val) return '';
      var names = [];
      f.options.forEach(function (o) { if (val[o.id]) names.push(tr(o.label)); });
      return names.join(', ');
    }
    if (f.type === 'yesno') {
      if (!val) return '';
      return val === 'yes' ? ui('yes') : ui('no');
    }
    if (f.type === 'select') {
      if (!val) return '';
      var lab = '';
      f.options.forEach(function (o) { if (o.id === val) lab = tr(o.label); });
      return lab;
    }
    return (val || '').trim();
  }

  /* English value for the email to Sebastian (always English labels) */
  function reportValue(f) {
    var val = state.answers[f.id];
    if (f.type === 'checklist') {
      if (!val) return '';
      var names = [];
      f.options.forEach(function (o) { if (val[o.id]) names.push(o.label.en); });
      return names.join(', ');
    }
    if (f.type === 'yesno') {
      if (!val) return '';
      return val === 'yes' ? 'Yes' : 'No';
    }
    if (f.type === 'select') {
      if (!val) return '';
      var lab = '';
      f.options.forEach(function (o) { if (o.id === val) lab = o.label.en; });
      return lab;
    }
    return (val || '').trim();
  }

  function sectionReport(step) {
    var parts = [];
    step.fields.forEach(function (f) {
      var v = reportValue(f);
      if (v === '') return;
      parts.push(f.label.en + ': ' + v);
    });
    return parts.join(' | ');
  }

  function setHidden(id, value) {
    var el = document.getElementById(id);
    if (el) el.value = value == null ? '' : value;
  }

  function stepById(id) {
    for (var i = 0; i < STEPS.length; i++) { if (STEPS[i].id === id) return STEPS[i]; }
    return null;
  }
  function countChecked(fieldId) {
    var v = state.answers[fieldId]; if (!v) return 0;
    var n = 0; for (var k in v) { if (v[k]) n++; } return n;
  }
  function optCount(stepId, fieldId) {
    var s = stepById(stepId); if (!s) return 0;
    for (var i = 0; i < s.fields.length; i++) {
      if (s.fields[i].id === fieldId) return (s.fields[i].options || []).length;
    }
    return 0;
  }

  /* Maps checklist data into the duplicated PSI form's registered fields, then
     programmatically submits that form so Webflow records and emails it. */
  function doSubmit() {
    var langName = { en: 'English', es: 'Spanish', pt: 'Portuguese' }[state.lang] || 'English';

    var incCount = countChecked('inc_items');
    var dedCount = countChecked('ded_items');
    var docCount = countChecked('doc_items');
    var docTotal = optCount('documents', 'doc_items');

    setHidden('psi-full-name', state.answers.c_name || state.answers.pd_name || '');
    setHidden('psi-email', state.answers.c_email || '');
    setHidden('psi-phone', state.answers.c_phone || '');
    setHidden('psi-language', langName);
    setHidden('psi-verdict-title', 'Individual Tax Return Checklist');
    setHidden('psi-verdict-text',
      'Income: ' + incCount + ' types | Deductions: ' + dedCount +
      ' | Documents ready: ' + docCount + '/' + docTotal);

    setHidden('psi-findings',
      'PERSONAL --- ' + sectionReport(stepById('personal')) +
      ' --- INCOME --- ' + sectionReport(stepById('income')) +
      ' --- DEDUCTIONS --- ' + sectionReport(stepById('deductions')));

    var notes = [];
    if (state.answers.c_appt) notes.push('Preferred times: ' + state.answers.c_appt);
    if (state.answers.c_comments) notes.push('Notes: ' + state.answers.c_comments);
    setHidden('psi-answers',
      'OFFSETS --- ' + sectionReport(stepById('offsets')) +
      ' --- DOCUMENTS --- ' + sectionReport(stepById('documents')) +
      (notes.length ? ' --- CLIENT NOTES --- ' + notes.join(' | ') : ''));

    setHidden('psi-comments', state.answers.c_appt ? ('Preferred times: ' + state.answers.c_appt) : '');

    var btn = root.querySelector('#chk-submit');
    if (btn) { btn.textContent = ui('sending'); btn.disabled = true; }

    var submitBtn = document.getElementById('psi-submit-btn');
    if (submitBtn) {
      state.submitted = true;
      submitBtn.click();
      setTimeout(function () { render(); scrollTop(); }, 350);
    } else {
      if (btn) { btn.textContent = ui('submit'); btn.disabled = false; }
      alert('Submission form not found. Please contact us directly.');
    }
  }

  function renderThanks() {
    root.innerHTML = '<div class="chk-card"><div class="chk-thanks">' +
      '<div class="ico">&#10003;</div>' +
      '<h2>' + esc(ui('thanksTitle')) + '</h2>' +
      '<p class="chk-intro">' + esc(ui('thanksText')) + '</p></div>' +
      '<p class="chk-priv">Y&S Accounting - taxbne.com.au</p></div>';
  }

  /* ---- boot --------------------------------------------------------------- */
  function boot() {
    root = document.getElementById('psi-app');
    if (!root) return;
    injectStyles();
    state.step = -1; // language picker first
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
