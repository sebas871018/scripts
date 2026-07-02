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
      intro: 'Thank you for booking your appointment. Please complete this checklist so we can prepare your individual tax return before we meet. It takes about 5 minutes. Tick everything that applies to you, even if you are unsure, and we will confirm the details together.',
      idReminder: 'This is step 2. If you have not completed step 1 (the ID verification form), please [LINK]complete it here[/LINK] first.',
      bookEmailLabel: 'Email used to book your appointment',
      bookEmailHelp: 'Enter the same email you used when booking, so we can match this checklist to your appointment.',
      occSearch: 'Start typing to search (e.g. nurse, builder, IT)',
      occEmpty: 'No matching occupations',
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
      intro: 'Gracias por reservar tu cita. Completa esta lista para que podamos preparar tu declaracion de impuestos antes de reunirnos. Toma unos 5 minutos. Marca todo lo que se aplique a tu caso, aunque no estes seguro, y confirmaremos los detalles juntos.',
      idReminder: 'Este es el paso 2. Si aun no completaste el paso 1 (el formulario de verificacion de identidad), por favor [LINK]completalo aqui[/LINK] primero.',
      bookEmailLabel: 'Correo que usaste para reservar tu cita',
      bookEmailHelp: 'Ingresa el mismo correo que usaste al reservar, para vincular esta lista con tu cita.',
      occSearch: 'Escribe para buscar (p. ej. enfermera, constructor, TI)',
      occEmpty: 'No hay ocupaciones coincidentes',
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
      intro: 'Obrigado por agendar sua consulta. Preencha esta lista para que possamos preparar sua declaracao de imposto antes de nos reunirmos. Leva cerca de 5 minutos. Marque tudo o que se aplica a voce, mesmo em caso de duvida, e confirmaremos os detalhes juntos.',
      idReminder: 'Esta e a etapa 2. Se voce ainda nao concluiu a etapa 1 (o formulario de verificacao de identidade), por favor [LINK]conclua aqui[/LINK] primeiro.',
      bookEmailLabel: 'E-mail usado para agendar sua consulta',
      bookEmailHelp: 'Informe o mesmo e-mail que voce usou ao agendar, para vincularmos esta lista a sua consulta.',
      occSearch: 'Comece a digitar para buscar (ex. enfermeiro, pedreiro, TI)',
      occEmpty: 'Nenhuma ocupacao encontrada',
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

  /* Builds the Step 1 (ID verification) reminder with a real link from the
     [LINK]...[/LINK] placeholder in the translated string. */
  function idReminderHtml() {
    var s = ui('idReminder') || '';
    var a = s.split('[LINK]');
    var b = (a[1] || '').split('[/LINK]');
    return esc(a[0] || '') +
      '<a class="chk-link" href="https://www.taxbne.com.au/forms/client-id-verification-form" target="_blank" rel="noopener">' +
      esc(b[0] || '') + '</a>' + esc(b[1] || '');
  }

  /* ---- Step / field definitions ------------------------------------------- */
  /* field types: text, date, tel, email, select, textarea, checklist, yesno  */

  var STEPS = [
    {
      id: 'booking',
      title: L('Confirm your appointment', 'Confirma tu cita', 'Confirme sua consulta'),
      idReminder: true,
      fields: [
        { id: 'book_name', type: 'text',
          label: L('Full legal name', 'Nombre legal completo', 'Nome legal completo') },
        { id: 'book_email', type: 'email',
          label: L('Email used to book your appointment', 'Correo que usaste para reservar tu cita', 'E-mail usado para agendar sua consulta'),
          help: L('Use the same email you booked with so we can match this checklist to your appointment.',
                  'Usa el mismo correo con el que reservaste para vincular esta lista con tu cita.',
                  'Use o mesmo e-mail com que agendou para vincularmos esta lista a sua consulta.') }
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
      id: 'personal',
      title: L('Your details', 'Tus datos', 'Seus dados'),
      fields: [
        { id: 'pd_occupation', type: 'occupation', opt: true,
          label: L('Occupation', 'Ocupacion', 'Ocupacao'),
          help: L('Start typing to search. We will show deductions commonly claimed in your role.',
                  'Empieza a escribir para buscar. Mostraremos las deducciones comunes de tu profesion.',
                  'Comece a digitar para buscar. Mostraremos as deducoes comuns da sua profissao.') },
        { id: 'pd_newclient', type: 'yesno', opt: true,
          label: L('Are you a new client?', 'Eres cliente nuevo?', 'Voce e cliente novo?') },
        { id: 'pd_status', type: 'select', opt: true,
          label: L('Residency status', 'Estado de residencia', 'Status de residencia'),
          options: [
            { id: 'citizen', label: L('Australian citizen', 'Ciudadano australiano', 'Cidadao australiano') },
            { id: 'pr', label: L('Permanent resident', 'Residente permanente', 'Residente permanente') },
            { id: 'visa', label: L('On a visa', 'Con una visa', 'Com um visto') }
          ] },
        { id: 'pd_visa_type', type: 'text', opt: true, showIf: { field: 'pd_status', value: 'visa' },
          label: L('Which visa do you hold?', 'Que visa tienes?', 'Qual visto voce possui?'),
          help: L('For example: student, working holiday, skilled, partner, bridging.',
                  'Por ejemplo: estudiante, working holiday, calificada, pareja, puente (bridging).',
                  'Por exemplo: estudante, working holiday, qualificado, parceiro, ponte (bridging).') },
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
      id: 'deductions',
      title: L('Deductions you may claim', 'Deducciones que podrias reclamar', 'Deducoes que voce pode reivindicar'),
      intro: L('Based on your occupation, here are deductions you may be able to claim. Tick the ones that apply - you will need records or receipts.',
               'Segun tu ocupacion, estas son las deducciones que podrias reclamar. Marca las que apliquen - necesitaras registros o recibos.',
               'Com base na sua ocupacao, estas sao as deducoes que voce pode reivindicar. Marque as que se aplicam - sera preciso ter comprovantes.'),
      fields: [
        { id: 'ded_items', type: 'checklist', dynamic: 'occ_deductions',
          label: L('Deductions that may apply to you', 'Deducciones que podrian aplicarte', 'Deducoes que podem se aplicar a voce') },
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
      title: L('Anything else', 'Algo mas', 'Mais alguma coisa'),
      intro: L('Add anything that would help us prepare. This is optional.',
               'Agrega cualquier cosa que nos ayude a prepararnos. Esto es opcional.',
               'Adicione qualquer coisa que nos ajude a preparar. Isto e opcional.'),
      fields: [
        { id: 'c_comments', type: 'textarea', opt: true,
          label: L('Anything else we should know', 'Algo mas que debamos saber', 'Algo mais que devemos saber') }
      ]
    }
  ];

  /* ---- Occupation list + occupation-aware deductions (ported from tax-calculator.js) ---- */
  var BASE_DEDUCTIONS = ['wfh','vehicle','phone','union','self_education','donations','taxagent','income_protect','investment','super'];

  var DED_LABELS = {
    wfh: L('Working from home','Trabajo desde casa','Trabalho em casa'),
    vehicle: L('Work-related car or travel','Coche o viajes laborales','Carro ou viagens de trabalho'),
    phone: L('Phone & internet (work portion)','Telefono e internet (parte laboral)','Telefone e internet (parte de trabalho)'),
    union: L('Union & professional fees','Cuotas sindicales y profesionales','Sindicato e taxas profissionais'),
    self_education: L('Self-education','Formacion profesional','Educacao profissional'),
    donations: L('Donations (DGR charities)','Donaciones (entidades DGR)','Doacoes (entidades DGR)'),
    taxagent: L('Tax agent fees','Honorarios del asesor fiscal','Honorarios do contador fiscal'),
    income_protect: L('Income protection insurance','Seguro de proteccion de ingresos','Seguro de protecao de renda'),
    investment: L('Investment expenses (loan interest, fees)','Gastos de inversion (intereses, comisiones)','Despesas de investimento (juros, taxas)'),
    super: L('Personal super contributions','Aportes personales al super','Contribuicoes pessoais ao super'),
    uniform: L('Uniform / protective clothing','Uniforme / ropa de proteccion','Uniforme / roupa de protecao'),
    tools: L('Tools & equipment','Herramientas y equipo','Ferramentas e equipamentos'),
    ppe: L('PPE (boots, gloves, goggles)','EPI (botas, guantes, gafas)','EPI (botas, luvas, oculos)'),
    sunscreen: L('Sun protection','Proteccion solar','Protecao solar'),
    teaching_materials: L('Teaching materials','Material didactico','Material didatico'),
    excursions: L('Excursions / camps','Excursiones / campamentos','Excursoes / acampamentos'),
    first_aid: L('First aid training','Formacion en primeros auxilios','Treinamento em primeiros socorros'),
    ahpra: L('AHPRA registration','Inscripcion AHPRA','Registro AHPRA'),
    cpd: L('CPD / professional development','CPD / desarrollo profesional','CPD / desenvolvimento profissional'),
    stethoscope: L('Medical / nursing equipment','Equipo medico / de enfermeria','Equipamento medico / de enfermagem'),
    software: L('Software / subscriptions','Software / suscripciones','Software / assinaturas'),
    hardware: L('Computer equipment','Equipo informatico','Equipamento de informatica'),
    conferences: L('Conferences / events','Congresos / eventos','Congressos / eventos'),
    prof_dev: L('Professional development','Desarrollo profesional','Desenvolvimento profissional'),
    office_supplies: L('Office supplies / stationery','Material de oficina / papeleria','Material de escritorio / papelaria'),
    advertising: L('Advertising & marketing','Publicidad y marketing','Publicidade e marketing'),
    license: L('Licence & registration fees','Licencias y tasas de inscripcion','Licencas e taxas de registro'),
    overnight_meals: L('Overnight travel / meals','Viajes con pernocta / comidas','Viagens com pernoite / refeicoes'),
    truck_supplies: L('Truck cleaning & supplies','Limpieza y suministros del camion','Limpeza e suprimentos do caminhao'),
    rsa: L('RSA / industry certificates','RSA / certificados sectoriales','RSA / certificados do setor'),
    training: L('Role-specific training','Formacion especifica del puesto','Treinamento especifico da funcao'),
    insurance: L('Professional indemnity','Responsabilidad civil profesional','Responsabilidade civil profissional'),
    practice_cert: L('Practising certificate','Certificado para ejercer','Certificado de exercicio profissional'),
    legal_pubs: L('Legal publications','Publicaciones juridicas','Publicacoes juridicas'),
    tpb: L('TPB registration fees','Tasas de inscripcion TPB','Taxas de registro TPB'),
    cpa_fees: L('CPA / CA / IPA fees','Cuotas CPA / CA / IPA','Anuidades CPA / CA / IPA'),
    journals: L('Industry journals','Revistas del sector','Revistas do setor'),
    indemnity_insurance: L('Medical indemnity insurance','Seguro de responsabilidad medica','Seguro de responsabilidade medica'),
    medical_journals: L('Medical journals','Revistas medicas','Revistas medicas'),
    equipment: L('Professional equipment','Equipo profesional','Equipamento profissional'),
    laptop: L('Laptop / work device','Portatil / dispositivo laboral','Laptop / dispositivo de trabalho'),
    client_meals: L('Client travel & meetings','Viajes y reuniones con clientes','Viagens e reunioes com clientes'),
    fitness: L('Fitness / conditioning','Acondicionamiento fisico','Condicionamento fisico')
  };

  var OCCUPATIONS = [
    { key:'accountant', extras:['cpd','tpb','cpa_fees','journals'], label:L('Accounting / finance professional','Contabilidad / finanzas','Contabilidade / financas') },
    { key:'adult_industry', extras:['uniform','ppe','self_education'], label:L('Adult industry worker','Trabajador de la industria adulta','Trabalhador da industria adulta') },
    { key:'agricultural', extras:['ppe','sunscreen','tools','uniform'], label:L('Agricultural / farm worker','Trabajador agricola','Trabalhador agricola') },
    { key:'apprentice', extras:['tools','ppe','self_education'], label:L('Apprentice or trainee','Aprendiz o practicante','Aprendiz ou estagiario') },
    { key:'adf', extras:['uniform','fitness','prof_dev'], label:L('Australian Defence Force member','Miembro de las Fuerzas de Defensa','Membro das Forcas de Defesa') },
    { key:'construction', extras:['tools','ppe','uniform','sunscreen'], label:L('Building / construction worker','Trabajador de construccion','Trabalhador da construcao civil') },
    { key:'bus', extras:['license','uniform','sunscreen'], label:L('Bus driver','Conductor de autobus','Motorista de onibus') },
    { key:'callcentre', extras:['prof_dev','office_supplies'], label:L('Call centre operator','Operador de call center','Operador de call center') },
    { key:'cleaner', extras:['ppe','uniform','sunscreen'], label:L('Cleaner','Personal de limpieza','Profissional de limpeza') },
    { key:'community', extras:['uniform','ppe','self_education'], label:L('Community / disability support worker','Trabajador de apoyo comunitario','Trabalhador de apoio comunitario') },
    { key:'contractor', extras:['insurance','software','tools','laptop'], label:L('Contractor / sole trader','Contratista / autonomo','Contratante / autonomo') },
    { key:'medical', extras:['ahpra','cpd','indemnity_insurance','medical_journals','equipment'], label:L('Doctor / medical specialist','Medico / especialista','Medico / especialista') },
    { key:'engineer', extras:['prof_dev','software','conferences','hardware'], label:L('Engineer','Ingeniero','Engenheiro') },
    { key:'factory', extras:['ppe','uniform','tools'], label:L('Factory / production worker','Trabajador de fabrica','Trabalhador de fabrica') },
    { key:'firefighter', extras:['uniform','fitness','prof_dev'], label:L('Firefighter','Bombero','Bombeiro') },
    { key:'fitness_ind', extras:['uniform','prof_dev','equipment'], label:L('Fitness / sporting industry employee','Industria del fitness / deportiva','Industria fitness / esportiva') },
    { key:'flight', extras:['uniform','self_education','prof_dev'], label:L('Flight attendant','Auxiliar de vuelo','Comissario de bordo') },
    { key:'gaming', extras:['uniform','rsa','training'], label:L('Gaming attendant','Empleado de casino','Atendente de cassino') },
    { key:'guards', extras:['uniform','license','prof_dev'], label:L('Guard / security officer','Guardia / agente de seguridad','Vigilante / agente de seguranca') },
    { key:'beauty', extras:['tools','uniform','training'], label:L('Hairdresser / beauty therapist','Peluquero / esteticista','Cabeleireiro / esteticista') },
    { key:'hospitality', extras:['uniform','rsa','training'], label:L('Hospitality / food service worker','Hosteleria / servicio de comida','Hotelaria / servico de alimentacao') },
    { key:'it', extras:['software','hardware','conferences','prof_dev'], label:L('IT / technology professional','Profesional de TI / tecnologia','Profissional de TI / tecnologia') },
    { key:'lawyer', extras:['cpd','practice_cert','legal_pubs'], label:L('Lawyer / legal professional','Abogado / profesional juridico','Advogado / profissional juridico') },
    { key:'meat', extras:['ppe','uniform','tools'], label:L('Meat / food processing worker','Trabajador procesamiento de carne / alimentos','Trabalhador de processamento de carne / alimentos') },
    { key:'media', extras:['prof_dev','equipment'], label:L('Media / journalism professional','Profesional de medios / periodismo','Profissional de midia / jornalismo') },
    { key:'mining', extras:['ppe','uniform','sunscreen','prof_dev'], label:L('Mining site employee','Empleado de mineria','Trabalhador de mineracao') },
    { key:'nurse', extras:['uniform','ahpra','cpd','stethoscope','prof_dev'], label:L('Nurse / midwife','Enfermero / matrona','Enfermeiro / parteira') },
    { key:'general', extras:['office_supplies','prof_dev'], label:L('Office / administration worker','Oficina / administracion','Escritorio / administracao') },
    { key:'paramedic', extras:['uniform','ahpra','cpd','equipment'], label:L('Paramedic','Paramedico','Paramedico') },
    { key:'performing', extras:['prof_dev','tools','uniform'], label:L('Performing artist','Artista escenico','Artista cenico') },
    { key:'pilot', extras:['uniform','license','prof_dev'], label:L('Pilot','Piloto','Piloto') },
    { key:'police', extras:['uniform','fitness','prof_dev','equipment'], label:L('Police officer','Agente de policia','Policial') },
    { key:'sportsperson', extras:['prof_dev','equipment','fitness'], label:L('Professional sportsperson','Deportista profesional','Atleta profissional') },
    { key:'realestate', extras:['advertising','license','prof_dev'], label:L('Real estate agent','Agente inmobiliario','Corretor de imoveis') },
    { key:'recruitment', extras:['prof_dev','client_meals'], label:L('Recruitment consultant','Consultor de seleccion','Consultor de recrutamento') },
    { key:'retail', extras:['uniform','training'], label:L('Retail worker','Empleado de comercio','Trabalhador de varejo') },
    { key:'sales', extras:['client_meals','laptop','prof_dev'], label:L('Sales representative','Representante de ventas','Representante de vendas') },
    { key:'teacher', extras:['teaching_materials','excursions','first_aid','prof_dev'], label:L('Teacher / educator','Profesor / educador','Professor / educador') },
    { key:'tradie', extras:['tools','ppe','uniform','sunscreen'], label:L('Tradesperson','Oficio / trabajador especializado','Profissional de oficio / tecnico') },
    { key:'train', extras:['uniform','license','prof_dev'], label:L('Train driver','Maquinista de tren','Maquinista de trem') },
    { key:'travel', extras:['prof_dev','software'], label:L('Travel agent','Agente de viajes','Agente de viagens') },
    { key:'truckdriver', extras:['overnight_meals','truck_supplies','sunscreen'], label:L('Truck driver','Camionero','Caminhoneiro') },
    { key:'other', extras:[], label:L('Other occupation','Otra ocupacion','Outra ocupacao') }
  ];

  function occByKey(k){ for (var i=0;i<OCCUPATIONS.length;i++){ if (OCCUPATIONS[i].key===k) return OCCUPATIONS[i]; } return null; }
  function occLabel(k){ var o=occByKey(k); return o ? tr(o.label) : ''; }
  function occSorted(){ return OCCUPATIONS.slice().sort(function(a,b){ return tr(a.label).localeCompare(tr(b.label)); }); }
  function dedOptionsForOccupation(){
    var occ = occByKey(state.answers.pd_occupation);
    var keys = BASE_DEDUCTIONS.concat(occ ? occ.extras : []);
    var seen = {}, out = [];
    keys.forEach(function(k){ if (!seen[k] && DED_LABELS[k]) { seen[k] = true; out.push({ id:k, label:DED_LABELS[k] }); } });
    return out;
  }
  function fieldOptions(f){ return f.dynamic === 'occ_deductions' ? dedOptionsForOccupation() : (f.options || []); }

  /* ---- validation --------------------------------------------------------- */
  var RE_NAME = /^[a-zA-ZÀ-ɏḀ-ỿ\s\-'.]+$/;
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var RE_PHONE = /^[\d\s\-()+]+$/;

  function fieldError(field, val) {
    val = (val || '').trim();
    if (field.type === 'email') {
      if (!val) return field.opt ? '' : ui('errEmail');
      if (!RE_EMAIL.test(val)) return ui('errEmail');
      return '';
    }
    if (field.type === 'tel') {
      if (val && !RE_PHONE.test(val)) return ui('errPhone');
      if (!val && !field.opt) return ui('required');
      return '';
    }
    if (field.id === 'book_name' || field.id === 'c_name') {
      if (val.length < 2 || !RE_NAME.test(val)) return ui('errName');
      return '';
    }
    if (!field.opt && field.type !== 'checklist' && field.type !== 'yesno' && !val) return ui('required');
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
      '#psi-app{--navy:#0B2A4A;--navy2:#15406b;--gold:#C9A24B;--gold2:#b8923f;--ink:#1c2733;--mut:#5b6b7a;--line:#e4e9f0;--cream:#fbf7ee;',
      'font-family:inherit;color:var(--ink);max-width:760px;margin:0 auto;-webkit-font-smoothing:antialiased;text-align:left;}',
      '#psi-app *{box-sizing:border-box;}',
      '@keyframes chkFade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}',
      '#psi-app .chk-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:16px;padding:32px 32px 26px;box-shadow:0 10px 40px rgba(11,42,74,.08);overflow:hidden;animation:chkFade .35s ease;}',
      '#psi-app .chk-card:before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--gold),#e3c376);}',
      '#psi-app .chk-brand{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold2);font-weight:700;margin:6px 0 8px;}',
      '#psi-app .chk-h1{font-size:27px;line-height:1.15;margin:0 0 8px;color:var(--navy);font-weight:800;letter-spacing:-.01em;}',
      '#psi-app .chk-sub{color:var(--mut);font-size:14px;margin:0 0 16px;}',
      '#psi-app .chk-intro{font-size:15px;line-height:1.6;color:#3a4654;margin:0 0 22px;}',
      '#psi-app .chk-prog{height:8px;background:var(--line);border-radius:99px;overflow:hidden;margin:0 0 14px;}',
      '#psi-app .chk-prog>span{display:block;height:100%;background:linear-gradient(90deg,var(--gold),#e0bd6e);border-radius:99px;transition:width .3s ease;}',
      '#psi-app .chk-step-meta{font-size:11px;color:var(--gold2);text-transform:uppercase;letter-spacing:.12em;font-weight:700;margin:0 0 14px;}',
      '#psi-app .chk-step-title{font-size:21px;color:var(--navy);font-weight:800;margin:0 0 6px;letter-spacing:-.01em;}',
      '#psi-app .chk-step-intro{font-size:14px;color:var(--mut);margin:0 0 22px;line-height:1.5;}',
      '#psi-app .chk-note{font-size:13px;line-height:1.5;color:#3a4654;background:var(--cream);border:1px solid #efe4c9;border-radius:10px;padding:11px 14px;margin:0 0 20px;}',
      '#psi-app .chk-link{color:var(--gold2);font-weight:700;text-decoration:underline;}',
      '#psi-app .chk-help{font-size:12.5px;color:var(--mut);margin:0 0 8px;line-height:1.45;}',
      '#psi-app .chk-combo{position:relative;}',
      '#psi-app .chk-combo-list{display:none;position:absolute;left:0;right:0;top:calc(100% - 1px);z-index:60;list-style:none;margin:0;padding:5px;background:#fff;border:1.5px solid var(--navy);border-radius:0 0 10px 10px;max-height:280px;overflow-y:auto;box-shadow:0 12px 28px rgba(11,42,74,.16);}',
      '#psi-app .chk-combo-opt{padding:10px 12px;border-radius:7px;cursor:pointer;font-size:14.5px;color:var(--ink);}',
      '#psi-app .chk-combo-opt:hover,#psi-app .chk-combo-opt.active{background:var(--cream);}',
      '#psi-app .chk-combo-opt.sel{font-weight:700;color:var(--navy);}',
      '#psi-app .chk-combo-opt mark{background:#f5e6bf;color:inherit;border-radius:2px;padding:0 1px;}',
      '#psi-app .chk-combo-empty{padding:10px 12px;color:var(--mut);font-size:14px;}',
      '#psi-app .chk-field{margin:0 0 18px;}',
      '#psi-app .chk-label{display:block;font-size:14px;font-weight:600;color:var(--navy);margin:0 0 8px;}',
      '#psi-app .chk-opt-tag{font-weight:400;color:var(--mut);font-size:12px;}',
      '#psi-app .chk-input,#psi-app .chk-select,#psi-app .chk-textarea{width:100%;border:1.5px solid var(--line);border-radius:10px;padding:12px 14px;font-size:15px;font-family:inherit;color:var(--ink);background:#fff;transition:border-color .15s,box-shadow .15s;}',
      '#psi-app .chk-input::placeholder,#psi-app .chk-textarea::placeholder{color:#9aa7b4;}',
      '#psi-app .chk-input:focus,#psi-app .chk-select:focus,#psi-app .chk-textarea:focus{outline:none;border-color:var(--navy);box-shadow:0 0 0 3px rgba(11,42,74,.1);}',
      '#psi-app .chk-textarea{min-height:90px;resize:vertical;line-height:1.5;}',
      '#psi-app .chk-invalid{border-color:#d64545 !important;}',
      '#psi-app .chk-err{color:#d64545;font-size:12.5px;margin:6px 0 0;display:none;}',
      '#psi-app .chk-check{display:flex;align-items:flex-start;gap:12px;padding:13px 15px;border:1.5px solid var(--line);border-radius:11px;margin:0 0 10px;cursor:pointer;transition:all .15s;}',
      '#psi-app .chk-check:hover{border-color:var(--gold);background:#fdfbf6;}',
      '#psi-app .chk-check.on{border-color:var(--gold);background:var(--cream);box-shadow:0 1px 6px rgba(201,162,75,.15);}',
      '#psi-app .chk-check input{margin-top:1px;width:19px;height:19px;accent-color:var(--gold2);flex:0 0 auto;cursor:pointer;}',
      '#psi-app .chk-check span{font-size:14.5px;line-height:1.45;color:var(--ink);}',
      '#psi-app .chk-check.on span{font-weight:600;color:var(--navy);}',
      '#psi-app .chk-yn{display:flex;gap:12px;}',
      '#psi-app .chk-yn button{flex:1;border:1.5px solid var(--line);background:#fff;border-radius:10px;padding:12px;font-size:14.5px;font-family:inherit;cursor:pointer;color:var(--ink);font-weight:600;transition:all .15s;}',
      '#psi-app .chk-yn button:hover{border-color:var(--navy);}',
      '#psi-app .chk-yn button.on{border-color:var(--navy);background:var(--navy);color:#fff;}',
      '#psi-app .chk-nav{display:flex;justify-content:space-between;gap:12px;margin-top:26px;padding-top:20px;border-top:1px solid var(--line);}',
      '#psi-app .chk-btn{border:none;border-radius:11px;padding:14px 26px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:all .15s;}',
      '#psi-app .chk-btn-primary{background:var(--navy);color:#fff;box-shadow:0 4px 14px rgba(11,42,74,.22);}',
      '#psi-app .chk-btn-primary:hover{background:var(--navy2);transform:translateY(-1px);box-shadow:0 6px 18px rgba(11,42,74,.28);}',
      '#psi-app .chk-btn-ghost{background:#fff;color:var(--navy);border:1.5px solid var(--line);}',
      '#psi-app .chk-btn-ghost:hover{border-color:var(--navy);background:#f7f9fb;}',
      '#psi-app .chk-btn[disabled]{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none;}',
      '#psi-app .chk-langs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:8px 0 4px;}',
      '#psi-app .chk-lang{position:relative;border:1.5px solid var(--line);border-radius:14px;padding:22px 12px;text-align:center;cursor:pointer;font-weight:700;font-size:16px;color:var(--navy);background:#fff;transition:all .15s;}',
      '#psi-app .chk-lang:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 6px 16px rgba(11,42,74,.1);}',
      '#psi-app .chk-lang.on{border-color:var(--gold);border-width:2px;background:var(--cream);}',
      '#psi-app .chk-lang.on:after{content:"\\2713";position:absolute;top:8px;right:10px;color:var(--gold2);font-weight:700;font-size:14px;}',
      '#psi-app .chk-lang small{display:block;color:var(--mut);font-weight:400;font-size:12px;margin-top:4px;}',
      '#psi-app .chk-review h4{color:var(--navy);font-size:14px;font-weight:700;margin:20px 0 8px;padding-bottom:6px;border-bottom:2px solid var(--cream);}',
      '#psi-app .chk-review h4:first-of-type{margin-top:0;}',
      '#psi-app .chk-review-row{font-size:14px;padding:6px 0;display:flex;gap:10px;border-bottom:1px solid #f1f4f8;}',
      '#psi-app .chk-review-row b{color:var(--mut);font-weight:600;min-width:40%;}',
      '#psi-app .chk-review-row span{color:var(--ink);}',
      '#psi-app .chk-thanks{text-align:center;padding:24px 6px;}',
      '#psi-app .chk-thanks .ico{width:66px;height:66px;margin:0 auto 6px;border-radius:50%;background:var(--cream);color:var(--gold2);font-size:34px;display:flex;align-items:center;justify-content:center;}',
      '#psi-app .chk-thanks h2{color:var(--navy);margin:10px 0;font-size:23px;}',
      '#psi-app .chk-priv{font-size:12px;color:var(--mut);margin:16px 0 0;line-height:1.5;text-align:center;}',
      '@media(max-width:560px){#psi-app .chk-card{padding:22px 18px;}#psi-app .chk-langs{grid-template-columns:1fr;}#psi-app .chk-h1{font-size:22px;}#psi-app .chk-step-title{font-size:19px;}}'
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

  /* Conditional fields: a field with showIf only renders when the referenced
     answer matches (e.g. visa type shows only when status is "On a visa"). */
  function fieldVisible(f) {
    if (!f.showIf) return true;
    return state.answers[f.showIf.field] === f.showIf.value;
  }
  function stepHasDependent(step, fieldId) {
    for (var i = 0; i < step.fields.length; i++) {
      if (step.fields[i].showIf && step.fields[i].showIf.field === fieldId) return true;
    }
    return false;
  }

  function renderStep(step) {
    var pct = Math.round(((state.step + 1) / (STEPS.length + 1)) * 100);
    var html = '<div class="chk-card">' +
      '<div class="chk-prog"><span style="width:' + pct + '%"></span></div>' +
      '<p class="chk-step-meta">' + esc(ui('stepOf').replace('{a}', state.step + 1).replace('{b}', STEPS.length + 1)) + '</p>' +
      '<h2 class="chk-step-title">' + esc(tr(step.title)) + '</h2>';
    if (step.intro) html += '<p class="chk-step-intro">' + esc(tr(step.intro)) + '</p>';
    if (step.idReminder) html += '<p class="chk-note">' + idReminderHtml() + '</p>';

    step.fields.forEach(function (f) { if (fieldVisible(f)) html += renderField(f); });

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
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label>';
      if (f.help) h += '<p class="chk-help">' + esc(tr(f.help)) + '</p>';
      var sel = val || {};
      fieldOptions(f).forEach(function (o) {
        var on = !!sel[o.id];
        h += '<label class="chk-check' + (on ? ' on' : '') + '" data-opt="' + o.id + '">' +
          '<input type="checkbox"' + (on ? ' checked' : '') + '>' +
          '<span>' + esc(tr(o.label)) + '</span></label>';
      });
    } else if (f.type === 'occupation') {
      var selLabel = val ? occLabel(val) : '';
      h += '<label class="chk-label">' + esc(tr(f.label)) + optTag + '</label>' +
        (f.help ? '<p class="chk-help">' + esc(tr(f.help)) + '</p>' : '') +
        '<div class="chk-combo" data-fid="' + f.id + '">' +
          '<input class="chk-input chk-combo-input" id="fi-' + f.id + '" autocomplete="off" placeholder="' + esc(ui('occSearch')) + '" value="' + esc(selLabel) + '">' +
          '<ul class="chk-combo-list" id="cl-' + f.id + '"></ul>' +
        '</div>';
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
        (f.help ? '<p class="chk-help">' + esc(tr(f.help)) + '</p>' : '') +
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

  /* Searchable occupation combobox: filters OCCUPATIONS as you type, stores the
     selected occupation KEY in state.answers[f.id] (not the typed text). */
  function wireCombo(f) {
    var input = root.querySelector('#fi-' + f.id);
    var list = root.querySelector('#cl-' + f.id);
    if (!input || !list) return;
    var active = -1, filtered = [];
    function hl(label, q) {
      if (!q) return esc(label);
      var lo = label.toLowerCase(), i = lo.indexOf(q);
      if (i < 0) return esc(label);
      return esc(label.slice(0, i)) + '<mark>' + esc(label.slice(i, i + q.length)) + '</mark>' + esc(label.slice(i + q.length));
    }
    function renderList(qraw) {
      var q = (qraw || '').trim().toLowerCase();
      filtered = occSorted();
      if (q) filtered = filtered.filter(function (o) { return tr(o.label).toLowerCase().indexOf(q) !== -1; });
      if (!filtered.length) { list.innerHTML = '<li class="chk-combo-empty">' + esc(ui('occEmpty')) + '</li>'; return; }
      list.innerHTML = filtered.map(function (o, i) {
        var cls = 'chk-combo-opt' + (o.key === state.answers[f.id] ? ' sel' : '') + (i === active ? ' active' : '');
        return '<li class="' + cls + '" data-key="' + o.key + '">' + hl(tr(o.label), q) + '</li>';
      }).join('');
    }
    function open() { list.style.display = 'block'; }
    function close() { list.style.display = 'none'; }
    function restore() { input.value = state.answers[f.id] ? occLabel(state.answers[f.id]) : ''; }
    function pick(key) {
      if (!occByKey(key)) return;
      state.answers[f.id] = key;
      restore();
      close();
    }
    input.onfocus = function () { active = -1; renderList(''); open(); this.select(); };
    input.oninput = function () { active = 0; renderList(this.value); open(); };
    input.onkeydown = function (e) {
      var n = filtered.length;
      if (e.key === 'ArrowDown') { e.preventDefault(); active = active < 0 ? 0 : Math.min(active + 1, n - 1); renderList(input.value); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); renderList(input.value); }
      else if (e.key === 'Enter') { if (active >= 0 && filtered[active]) { e.preventDefault(); pick(filtered[active].key); } }
      else if (e.key === 'Escape') { restore(); close(); input.blur(); }
    };
    list.onmousedown = function (e) {
      var li = e.target && e.target.closest ? e.target.closest('li[data-key]') : null;
      if (!li) return;
      e.preventDefault();
      pick(li.getAttribute('data-key'));
    };
    input.onblur = function () { setTimeout(function () { restore(); close(); }, 150); };
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
      } else if (f.type === 'occupation') {
        wireCombo(f);
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
            if (stepHasDependent(step, f.id)) renderStep(step);
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
        if (f.type === 'checklist' || f.type === 'yesno' || !fieldVisible(f)) return;
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
        if (!fieldVisible(f)) return;
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
    if (f.type === 'occupation') { return val ? occLabel(val) : ''; }
    if (f.type === 'checklist') {
      if (!val) return '';
      var names = [];
      fieldOptions(f).forEach(function (o) { if (val[o.id]) names.push(tr(o.label)); });
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
    if (f.type === 'occupation') {
      var oo = occByKey(val);
      return oo ? oo.label.en : '';
    }
    if (f.type === 'checklist') {
      if (!val) return '';
      var names = [];
      fieldOptions(f).forEach(function (o) { if (val[o.id]) names.push(o.label.en); });
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
      if (!fieldVisible(f)) return;
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

  /* English lines for one field, used to build the structured email report.
     Checklists become a heading plus bulleted items; everything else is one
     "Label: value" line. Hidden (showIf) fields are skipped. */
  function fieldReportLines(f) {
    if (!fieldVisible(f)) return [];
    if (f.type === 'checklist') {
      var sel = state.answers[f.id]; if (!sel) return [];
      var items = [];
      fieldOptions(f).forEach(function (o) { if (sel[o.id]) items.push('  - ' + o.label.en); });
      return items.length ? [f.label.en + ':'].concat(items) : [];
    }
    var rv = reportValue(f);
    return rv ? [f.label.en + ': ' + rv] : [];
  }

  /* Builds a newline-structured, sectioned report (Webflow textarea fields keep
     line breaks, so this renders as a readable table-like block in the email). */
  var EMAIL_SECTIONS = {
    booking: 'Client details', income: 'Income received', personal: 'Personal details',
    deductions: 'Deductions to claim', offsets: 'Offsets and other',
    documents: 'Documents ready', contact: 'Additional notes'
  };
  function buildEmailReport(stepIds) {
    var out = [];
    stepIds.forEach(function (id) {
      var step = stepById(id); if (!step) return;
      var body = [];
      step.fields.forEach(function (f) { body = body.concat(fieldReportLines(f)); });
      if (!body.length) return;
      out.push('=== ' + (EMAIL_SECTIONS[id] || step.title.en).toUpperCase() + ' ===');
      out = out.concat(body);
      out.push('');
    });
    return out.join('\n').replace(/\n+$/, '');
  }

  /* Maps checklist data into the duplicated PSI form's registered fields, then
     programmatically submits that form so Webflow records and emails it. */
  function doSubmit() {
    var langName = { en: 'English', es: 'Spanish', pt: 'Portuguese' }[state.lang] || 'English';

    var incCount = countChecked('inc_items');
    var dedCount = countChecked('ded_items');
    var docCount = countChecked('doc_items');
    var docTotal = optCount('documents', 'doc_items');

    var occ = occByKey(state.answers.pd_occupation);
    setHidden('psi-full-name', state.answers.book_name || '');
    setHidden('psi-email', state.answers.book_email || '');
    setHidden('psi-phone', '');
    setHidden('psi-language', langName);
    setHidden('psi-verdict-title', 'Individual Tax Return Checklist');
    setHidden('psi-verdict-text',
      (occ ? 'Occupation: ' + occ.label.en + '  |  ' : '') +
      'Income: ' + incCount + '  |  Deductions: ' + dedCount +
      '  |  Documents ready: ' + docCount + '/' + docTotal);

    setHidden('psi-findings', buildEmailReport(['booking', 'income', 'personal', 'deductions', 'offsets', 'documents', 'contact']));
    setHidden('psi-answers', '');
    setHidden('psi-comments', '');

    /* Set the form's display name so the notification email subject reads
       "Checklist - <client name>" instead of the inherited "PSI Assessment". */
    var subjForm = document.getElementById('wf-psi-form');
    if (subjForm) {
      var clientName = (state.answers.book_name || '').trim() || 'Client';
      subjForm.setAttribute('name', 'Checklist - ' + clientName);
      subjForm.setAttribute('data-name', 'Checklist - ' + clientName);
    }

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
