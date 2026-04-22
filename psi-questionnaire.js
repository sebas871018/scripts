/* (c) 2025-2026 SGF AUSTRALIA PTY. LTD. (ABN 39 615 320 048) | All Rights Reserved | taxbne.com.au */
window.__PSI_T = {
  en: {
    headerTitle: 'Personal Services Income Assessment',
    headerSubtitle: 'PSI rules & corporate restructure compliance check',
    disclaimer: '<strong>Disclaimer:</strong> This tool provides a preliminary self-assessment based on Part 2-42 of the ITAA 1997 and ATO guidance. It does not constitute tax advice. PSB determinations, Part IVA risk, and restructure decisions should be confirmed with a qualified tax adviser. Y&S Accounting Brisbane.',
    back: '← Back',
    next: 'Next →',
    seeResult: 'See Assessment →',
    contactSection: 'Step 7 of 7 — Your Details',
    contactQ: 'Discuss your assessment with us',
    contactHelp: 'Enter your details below and our team at Y&S Accounting will reach out to review your PSI assessment results, answer your questions, and discuss recommended next steps.',
    phoneLabel: 'Phone number',
    phonePh: '+61 400 000 000',
    fullNameLabel: 'Full name',
    fullNamePh: 'Jane Smith',
    emailLabel: 'Email address',
    emailPh: 'jane@example.com',
    contactError: 'Please enter a valid name, email and phone number.',
    errNameEmpty: 'Please enter your full name',
    errNameInvalid: 'Name can only contain letters, spaces, hyphens and apostrophes',
    errEmailEmpty: 'Please enter your email address',
    errEmailInvalid: 'Please enter a valid email address (e.g. jane@example.com)',
    errPhoneEmpty: 'Please enter your phone number',
    errPhoneInvalid: 'Phone number can only contain digits',
    errPhoneTooShort: 'Phone number is too short',
    assessmentFor: 'Assessment for',
    submittedMsg: '✓ Your details have been submitted. Y&S Accounting Brisbane will be in touch to discuss your results.',
    submittingMsg: 'Submitting your details...',
    findingsHeader: 'Findings',
    nextStepsHeader: 'Recommended Next Steps',
    referencesHeader: 'Key References',
    downloadPdfBtn: '📄 Download PDF Report',
    consultBtn: '📞 Book a Consultation',
    newAssessmentBtn: '↻ New Assessment',
    pdfTitle: 'Personal Services Income Assessment',
    pdfPreparedFor: 'Prepared for',
    pdfDate: 'Date',
    pdfPhone: 'Phone',
    pdfQA: 'Your Answers',
    pdfDisclaimer: 'This assessment is a preliminary guide only and does not constitute tax advice. PSB determinations, Part IVA risk, and restructure decisions should be confirmed with a qualified tax adviser. Y&S Accounting Brisbane.',
    questions: [
      {
        id: 'income_type',
        section: 'Step 1 of 7 — Income Character',
        q: 'Is more than 50% of the income from a contract paid for the individual\'s personal skills, knowledge, expertise or efforts?',
        help: 'PSI is income mainly a reward for an individual\'s personal labour. If income is mainly from selling goods, using income-producing assets (e.g. a truck, plant), or from a business structure (employees doing the work), it is NOT PSI. PAYG salary/wages is excluded.',
        options: [
          { v: 'yes', t: 'Yes — predominantly personal skills/effort' },
          { v: 'no_goods', t: 'No — mainly from sale of goods' },
          { v: 'no_assets', t: 'No — mainly from use of income-producing assets' },
          { v: 'no_structure', t: 'No — mainly from a business structure (staff, systems)' },
          { v: 'employee', t: 'Income is PAYG salary/wages (employee)' }
        ]
      },
      {
        id: 'results_test',
        section: 'Step 2 of 7 — Results Test',
        q: 'For at least 75% of the PSI, do ALL THREE of these apply?',
        help: '(1) Paid to produce a specific result, (2) required to supply own tools/equipment to do the work, AND (3) liable to rectify defects at own cost. Passing the results test alone makes the individual/entity a Personal Services Business (PSB) — PSI rules do NOT apply.',
        options: [
          { v: 'yes', t: 'Yes — all three are met for ≥75% of PSI' },
          { v: 'partial', t: 'Only one or two are met' },
          { v: 'no', t: 'No — none are clearly met' }
        ]
      },
      {
        id: 'eighty_percent',
        section: 'Step 3 of 7 — 80% Rule',
        q: 'Does 80% or more of the PSI in the year come from ONE client (and that client\'s associates)?',
        help: 'If yes, the individual/entity CANNOT self-assess as a PSB. They would need to apply to the ATO for a Personal Services Business Determination (PSBD), or the PSI rules will apply.',
        options: [
          { v: 'yes', t: 'Yes — 80% or more from one client' },
          { v: 'no', t: 'No — spread across multiple unrelated clients' },
          { v: 'unsure', t: 'Unsure / first year' }
        ]
      },
      {
        id: 'unrelated_clients',
        section: 'Step 4 of 7 — Unrelated Clients Test',
        q: 'Does the individual provide services to TWO OR MORE unrelated clients, won as a result of offers to the public (advertising, website, tenders, word-of-mouth)?',
        help: 'Listing on a single labour-hire firm or agency does NOT count as making offers to the public.',
        options: [
          { v: 'yes', t: 'Yes — two or more unrelated clients won via public offers' },
          { v: 'no', t: 'No' }
        ]
      },
      {
        id: 'employment_test',
        section: 'Step 5 of 7 — Employment & Premises',
        q: 'Does the entity engage others (employees/contractors) to perform at least 20% (by market value) of the PRINCIPAL work, OR have an apprentice for at least half the year? AND/OR maintain separate business premises used exclusively and >50% for the PSI activity, physically separate from home and clients?',
        help: 'Either the Employment Test OR the Business Premises Test is sufficient (in combination with the 80% rule being failed).',
        options: [
          { v: 'employment', t: 'Yes — meets the Employment Test' },
          { v: 'premises', t: 'Yes — meets the Business Premises Test' },
          { v: 'both', t: 'Yes — both tests are met' },
          { v: 'no', t: 'No — neither test is met' }
        ]
      },
      {
        id: 'restructure',
        section: 'Step 6 of 7 — Restructure Intent',
        q: 'Is the primary purpose of operating through a company/trust to retain profits at the corporate rate, split income with associates (spouse/family), or otherwise reduce tax compared to receiving the income personally?',
        help: 'Even where the PSI rules do NOT apply (i.e. the entity is a PSB), Part IVA (general anti-avoidance) and the ATO\'s position in PCG 2021/4 / TR 2022/3 / IT 2503 may still treat income-splitting or profit retention as a scheme. Salary paid to the individual must be commensurate with the services they perform.',
        options: [
          { v: 'commercial', t: 'No — genuine commercial reasons (liability, clients require entity, growth)' },
          { v: 'mixed', t: 'Partly — commercial reasons but tax efficiency is a factor' },
          { v: 'tax', t: 'Yes — primarily tax-driven (retention or splitting)' }
        ]
      }
    ],
    findings: {
      employee: 'Income is PAYG salary/wages — PSI rules do not apply to employees.',
      notPsi: 'Income is NOT PSI — it is mainly from goods, assets, or a business structure.',
      isPsi: 'Income IS PSI — more than 50% is a reward for personal skills/effort.',
      passResults: 'PASSES the Results Test — qualifies as a Personal Services Business (PSB). PSI rules do NOT apply.',
      failResults: 'Does not pass the Results Test.',
      unsure80: 'You indicated uncertainty about the 80% rule. If 80% or more of your PSI comes from one client, you cannot self-assess as a PSB and must apply for a PSB Determination from the ATO. Verify this threshold before relying on this assessment.',
      fail80: '80% or more of PSI from one client — cannot self-assess as a PSB. A PSB Determination from the ATO is required, otherwise PSI rules apply.',
      passUnrelated: 'PASSES the Unrelated Clients Test.',
      passEmployment: 'PASSES the Employment Test.',
      passPremises: 'PASSES the Business Premises Test.',
      passOther: 'Qualifies as a PSB (less-than-80% rule + at least one other test). PSI rules do NOT apply.',
      failAll: 'Does not satisfy any of the alternative PSB tests. PSI rules APPLY.',
      restructureBlocked: 'Restructuring to a company will NOT defeat the PSI attribution rules. Net PSI is attributed to the individual regardless of entity.',
      restructureTax: 'Even as a PSB, a tax-driven restructure attracts Part IVA risk and ATO attention under PCG 2021/4 / IT 2503. Income splitting with associates not commensurate with their contribution will likely be challenged.',
      restructureMixed: 'Mixed-purpose restructure: defensible but should be documented. Salary to the individual must reflect the value of services performed; retained profits and distributions should have a commercial rationale.',
      restructureCommercial: 'Genuine commercial restructure with PSB status — generally compliant. Maintain documentation of commercial drivers and ensure arm\'s-length remuneration.',
      notPsiNote: 'Income is not PSI — normal business/structuring rules apply (subject to general Part IVA principles).'
    },
    verdicts: {
      compliantGreen: { title: '✓ Compliant', text: 'PSI rules do not apply (or income is not PSI). A corporate structure is defensible.' },
      compliantAmber: { title: '⚠ Compliant with caveats', text: 'PSB status achieved, but restructure must be documented and remuneration commercial.' },
      partIvaRed: { title: '✗ Part IVA Risk', text: 'PSB status alone does not justify a tax-driven restructure. Anti-avoidance risk is elevated.' },
      determinationAmber: { title: '⚠ PSB Determination Required', text: 'Cannot self-assess. Apply to the ATO for a PSB Determination, or PSI attribution rules will apply.' },
      psiAppliesRed: { title: '✗ PSI Rules Apply', text: 'Net PSI is attributed to the individual. Restructuring to a company offers no tax benefit and will not bypass the rules.' }
    },
    nextSteps: {
      notPsi1: 'Confirm income classification with supporting contracts and invoicing evidence.',
      notPsi2: 'Standard structuring considerations apply — review against general Part IVA principles.',
      psb1: 'Document evidence supporting PSB status (contracts showing results basis, list of unrelated clients, employment records, premises lease).',
      psb2: 'Review director/shareholder remuneration to ensure it reflects the value of personal services performed.',
      psb3: 'Reassess income-splitting arrangements against PCG 2021/4 risk gateways and traffic-light system.',
      psb4: 'Consider obtaining a private binding ruling before implementing the restructure.',
      psb5: 'Reassess PSB status annually — it is tested year-by-year.',
      determination1: 'Lodge a PSB Determination application with the ATO before relying on PSB status.',
      determination2: 'In the meantime, apply PSI attribution rules to net income.',
      apply1: 'Apply PSI attribution: net PSI flows to the individual regardless of entity.',
      apply2: 'Limited deductions only — review allowable deductions under s 85-10 to s 85-40.',
      apply3: 'Restructure for tax minimisation will not work — focus on legitimate business expansion to potentially meet PSB tests in future years.'
    },
    references: [
      'ITAA 1997 Part 2-42 (Divisions 84–87) — PSI rules',
      'TR 2022/3 — PSI & PSB',
      'IT 2503 — Incorporation of professional practices',
      'PCG 2021/4 — Allocation of professional firm profits',
      'ITAA 1936 Part IVA — General anti-avoidance'
    ]
  },

  es: {
    headerTitle: 'Evaluación de Ingresos por Servicios Personales',
    headerSubtitle: 'Reglas PSI y verificación de cumplimiento de reestructuración corporativa',
    disclaimer: '<strong>Aviso legal:</strong> Esta herramienta proporciona una autoevaluación preliminar basada en la Parte 2-42 de la ITAA 1997 y las directrices del ATO. No constituye asesoramiento fiscal. Las determinaciones de PSB, el riesgo de la Parte IVA y las decisiones de reestructuración deben ser confirmadas con un asesor fiscal calificado. Y&S Accounting Brisbane.',
    back: '← Atrás',
    next: 'Siguiente →',
    seeResult: 'Ver Evaluación →',
    contactSection: 'Paso 7 de 7 — Sus Datos',
    contactQ: 'Hablemos sobre su evaluación',
    contactHelp: 'Ingrese sus datos a continuación y nuestro equipo de Y&S Accounting se comunicará con usted para revisar los resultados de su evaluación PSI, responder sus preguntas y analizar los próximos pasos recomendados.',
    phoneLabel: 'Número de teléfono',
    phonePh: '+61 400 000 000',
    fullNameLabel: 'Nombre completo',
    fullNamePh: 'Juan Pérez',
    emailLabel: 'Correo electrónico',
    emailPh: 'juan@ejemplo.com',
    contactError: 'Por favor ingrese un nombre, correo electrónico y teléfono válidos.',
    errNameEmpty: 'Por favor ingrese su nombre completo',
    errNameInvalid: 'El nombre solo puede contener letras, espacios, guiones y apóstrofes',
    errEmailEmpty: 'Por favor ingrese su correo electrónico',
    errEmailInvalid: 'Por favor ingrese un correo electrónico válido (ej. juan@ejemplo.com)',
    errPhoneEmpty: 'Por favor ingrese su número de teléfono',
    errPhoneInvalid: 'El teléfono solo puede contener dígitos',
    errPhoneTooShort: 'El número de teléfono es demasiado corto',
    assessmentFor: 'Evaluación para',
    submittedMsg: '✓ Sus datos han sido enviados. Y&S Accounting Brisbane se comunicará con usted para analizar sus resultados.',
    submittingMsg: 'Enviando sus datos...',
    findingsHeader: 'Hallazgos',
    nextStepsHeader: 'Próximos Pasos Recomendados',
    referencesHeader: 'Referencias Clave',
    downloadPdfBtn: '📄 Descargar Informe PDF',
    consultBtn: '📞 Agendar una Consulta',
    newAssessmentBtn: '↻ Nueva Evaluación',
    pdfTitle: 'Evaluación de Ingresos por Servicios Personales',
    pdfPreparedFor: 'Preparado para',
    pdfDate: 'Fecha',
    pdfPhone: 'Teléfono',
    pdfQA: 'Sus Respuestas',
    pdfDisclaimer: 'Esta evaluación es solo una guía preliminar y no constituye asesoramiento fiscal. Las determinaciones de PSB, el riesgo de la Parte IVA y las decisiones de reestructuración deben ser confirmadas con un asesor fiscal calificado. Y&S Accounting Brisbane.',
    questions: [
      {
        id: 'income_type',
        section: 'Paso 1 de 7 — Carácter del Ingreso',
        q: '¿Más del 50% del ingreso proviene de un contrato pagado por las habilidades, conocimientos, experiencia o esfuerzos personales del individuo?',
        help: 'El PSI es ingreso principalmente como recompensa por el trabajo personal de un individuo. Si el ingreso proviene principalmente de la venta de bienes, del uso de activos generadores de ingresos (ej. un camión, maquinaria), o de una estructura empresarial (empleados realizando el trabajo), NO es PSI. El salario PAYG está excluido.',
        options: [
          { v: 'yes', t: 'Sí — predominantemente habilidades/esfuerzo personal' },
          { v: 'no_goods', t: 'No — principalmente de la venta de bienes' },
          { v: 'no_assets', t: 'No — principalmente del uso de activos generadores de ingresos' },
          { v: 'no_structure', t: 'No — principalmente de una estructura empresarial (personal, sistemas)' },
          { v: 'employee', t: 'El ingreso es salario PAYG (empleado)' }
        ]
      },
      {
        id: 'results_test',
        section: 'Paso 2 de 7 — Prueba de Resultados',
        q: 'Para al menos el 75% del PSI, ¿se cumplen LAS TRES condiciones?',
        help: '(1) Pagado para producir un resultado específico, (2) requerido a proporcionar sus propias herramientas/equipos para hacer el trabajo, Y (3) responsable de rectificar defectos a su propio costo. Pasar la prueba de resultados por sí sola convierte al individuo/entidad en un Negocio de Servicios Personales (PSB) — las reglas PSI NO aplican.',
        options: [
          { v: 'yes', t: 'Sí — las tres se cumplen para ≥75% del PSI' },
          { v: 'partial', t: 'Solo una o dos se cumplen' },
          { v: 'no', t: 'No — ninguna se cumple claramente' }
        ]
      },
      {
        id: 'eighty_percent',
        section: 'Paso 3 de 7 — Regla del 80%',
        q: '¿El 80% o más del PSI en el año proviene de UN solo cliente (y los asociados de ese cliente)?',
        help: 'Si es así, el individuo/entidad NO PUEDE auto-evaluarse como PSB. Tendría que solicitar al ATO una Determinación de Negocio de Servicios Personales (PSBD), o las reglas PSI aplicarán.',
        options: [
          { v: 'yes', t: 'Sí — 80% o más de un solo cliente' },
          { v: 'no', t: 'No — distribuido entre múltiples clientes no relacionados' },
          { v: 'unsure', t: 'Inseguro / primer año' }
        ]
      },
      {
        id: 'unrelated_clients',
        section: 'Paso 4 de 7 — Prueba de Clientes No Relacionados',
        q: '¿El individuo presta servicios a DOS O MÁS clientes no relacionados, obtenidos como resultado de ofertas al público (publicidad, sitio web, licitaciones, boca a boca)?',
        help: 'Estar listado en una sola agencia de contratación o intermediario laboral NO cuenta como hacer ofertas al público.',
        options: [
          { v: 'yes', t: 'Sí — dos o más clientes no relacionados obtenidos a través de ofertas públicas' },
          { v: 'no', t: 'No' }
        ]
      },
      {
        id: 'employment_test',
        section: 'Paso 5 de 7 — Empleo y Locales',
        q: '¿La entidad contrata a otros (empleados/contratistas) para realizar al menos el 20% (por valor de mercado) del trabajo PRINCIPAL, O tiene un aprendiz por al menos medio año? Y/O mantiene locales comerciales separados utilizados exclusivamente y >50% para la actividad PSI, físicamente separados del hogar y los clientes?',
        help: 'La Prueba de Empleo O la Prueba de Locales Comerciales es suficiente (en combinación con no cumplir la regla del 80%).',
        options: [
          { v: 'employment', t: 'Sí — cumple la Prueba de Empleo' },
          { v: 'premises', t: 'Sí — cumple la Prueba de Locales Comerciales' },
          { v: 'both', t: 'Sí — ambas pruebas se cumplen' },
          { v: 'no', t: 'No — ninguna prueba se cumple' }
        ]
      },
      {
        id: 'restructure',
        section: 'Paso 6 de 7 — Intención de Reestructuración',
        q: '¿El propósito principal de operar a través de una empresa/fideicomiso es retener ganancias a la tasa corporativa, dividir ingresos con asociados (cónyuge/familia), o de otra manera reducir impuestos en comparación con recibir el ingreso personalmente?',
        help: 'Incluso cuando las reglas PSI NO apliquen (es decir, la entidad es un PSB), la Parte IVA (anti-elusión general) y la posición del ATO en PCG 2021/4 / TR 2022/3 / IT 2503 aún pueden tratar la división de ingresos o retención de ganancias como un esquema. El salario pagado al individuo debe ser proporcional a los servicios que realiza.',
        options: [
          { v: 'commercial', t: 'No — razones comerciales genuinas (responsabilidad, clientes requieren entidad, crecimiento)' },
          { v: 'mixed', t: 'Parcialmente — razones comerciales pero la eficiencia fiscal es un factor' },
          { v: 'tax', t: 'Sí — principalmente impulsado por impuestos (retención o división)' }
        ]
      }
    ],
    findings: {
      employee: 'El ingreso es salario PAYG — las reglas PSI no aplican a empleados.',
      notPsi: 'El ingreso NO es PSI — proviene principalmente de bienes, activos o una estructura empresarial.',
      isPsi: 'El ingreso SÍ es PSI — más del 50% es recompensa por habilidades/esfuerzo personal.',
      passResults: 'PASA la Prueba de Resultados — califica como Negocio de Servicios Personales (PSB). Las reglas PSI NO aplican.',
      failResults: 'No pasa la Prueba de Resultados.',
      unsure80: 'Usted indicó incertidumbre sobre la regla del 80%. Si el 80% o más de su PSI proviene de un solo cliente, no puede auto-evaluarse como PSB y debe solicitar una Determinación de PSB al ATO. Verifique este umbral antes de confiar en esta evaluación.',
      fail80: '80% o más del PSI proviene de un solo cliente — no puede auto-evaluarse como PSB. Se requiere una Determinación de PSB del ATO, de lo contrario las reglas PSI aplican.',
      passUnrelated: 'PASA la Prueba de Clientes No Relacionados.',
      passEmployment: 'PASA la Prueba de Empleo.',
      passPremises: 'PASA la Prueba de Locales Comerciales.',
      passOther: 'Califica como PSB (regla de menos del 80% + al menos una otra prueba). Las reglas PSI NO aplican.',
      failAll: 'No satisface ninguna de las pruebas alternativas de PSB. Las reglas PSI APLICAN.',
      restructureBlocked: 'Reestructurarse a una empresa NO evitará las reglas de atribución de PSI. El PSI neto se atribuye al individuo independientemente de la entidad.',
      restructureTax: 'Incluso como PSB, una reestructuración impulsada por impuestos atrae el riesgo de la Parte IVA y atención del ATO bajo PCG 2021/4 / IT 2503. La división de ingresos con asociados no proporcional a su contribución probablemente será cuestionada.',
      restructureMixed: 'Reestructuración de propósito mixto: defendible pero debe documentarse. El salario al individuo debe reflejar el valor de los servicios prestados; las ganancias retenidas y distribuciones deben tener una justificación comercial.',
      restructureCommercial: 'Reestructuración comercial genuina con estado de PSB — generalmente cumple. Mantenga documentación de los impulsores comerciales y asegure remuneración a precio de mercado.',
      notPsiNote: 'El ingreso no es PSI — aplican las reglas normales de estructuración empresarial (sujeto a los principios generales de la Parte IVA).'
    },
    verdicts: {
      compliantGreen: { title: '✓ Cumple', text: 'Las reglas PSI no aplican (o el ingreso no es PSI). Una estructura corporativa es defendible.' },
      compliantAmber: { title: '⚠ Cumple con salvedades', text: 'Estado de PSB obtenido, pero la reestructuración debe documentarse y la remuneración debe ser comercial.' },
      partIvaRed: { title: '✗ Riesgo de Parte IVA', text: 'El estado de PSB por sí solo no justifica una reestructuración impulsada por impuestos. El riesgo anti-elusión es elevado.' },
      determinationAmber: { title: '⚠ Se Requiere Determinación de PSB', text: 'No puede auto-evaluarse. Solicite al ATO una Determinación de PSB, o las reglas de atribución de PSI aplicarán.' },
      psiAppliesRed: { title: '✗ Las Reglas PSI Aplican', text: 'El PSI neto se atribuye al individuo. Reestructurar a una empresa no ofrece beneficio fiscal y no evitará las reglas.' }
    },
    nextSteps: {
      notPsi1: 'Confirme la clasificación del ingreso con contratos de respaldo y evidencia de facturación.',
      notPsi2: 'Consideraciones estándar de estructuración aplican — revise contra los principios generales de la Parte IVA.',
      psb1: 'Documente evidencia que respalde el estado de PSB (contratos que muestren base de resultados, lista de clientes no relacionados, registros de empleo, contrato de arrendamiento de locales).',
      psb2: 'Revise la remuneración del director/accionista para asegurar que refleje el valor de los servicios personales prestados.',
      psb3: 'Reevalúe los acuerdos de división de ingresos contra los umbrales de riesgo de PCG 2021/4 y el sistema de semáforo.',
      psb4: 'Considere obtener una resolución vinculante privada antes de implementar la reestructuración.',
      psb5: 'Reevalúe el estado de PSB anualmente — se prueba año tras año.',
      determination1: 'Presente una solicitud de Determinación de PSB ante el ATO antes de depender del estado de PSB.',
      determination2: 'Mientras tanto, aplique las reglas de atribución de PSI al ingreso neto.',
      apply1: 'Aplique la atribución de PSI: el PSI neto fluye al individuo independientemente de la entidad.',
      apply2: 'Solo deducciones limitadas — revise las deducciones permitidas bajo s 85-10 a s 85-40.',
      apply3: 'La reestructuración para minimizar impuestos no funcionará — enfóquese en expansión empresarial legítima para potencialmente cumplir las pruebas de PSB en años futuros.'
    },
    references: [
      'ITAA 1997 Parte 2-42 (Divisiones 84–87) — Reglas PSI',
      'TR 2022/3 — PSI y PSB',
      'IT 2503 — Incorporación de prácticas profesionales',
      'PCG 2021/4 — Asignación de ganancias de firmas profesionales',
      'ITAA 1936 Parte IVA — Anti-elusión general'
    ]
  },

  pt: {
    headerTitle: 'Avaliação de Rendimentos de Serviços Pessoais',
    headerSubtitle: 'Regras PSI e verificação de conformidade de reestruturação corporativa',
    disclaimer: '<strong>Aviso legal:</strong> Esta ferramenta fornece uma autoavaliação preliminar baseada na Parte 2-42 do ITAA 1997 e nas diretrizes do ATO. Não constitui aconselhamento fiscal. Determinações de PSB, risco da Parte IVA e decisões de reestruturação devem ser confirmadas com um consultor fiscal qualificado. Y&S Accounting Brisbane.',
    back: '← Voltar',
    next: 'Próximo →',
    seeResult: 'Ver Avaliação →',
    contactSection: 'Etapa 7 de 7 — Seus Dados',
    contactQ: 'Vamos conversar sobre sua avaliação',
    contactHelp: 'Insira seus dados abaixo e nossa equipe da Y&S Accounting entrará em contato para revisar os resultados da sua avaliação PSI, responder suas perguntas e discutir os próximos passos recomendados.',
    phoneLabel: 'Número de telefone',
    phonePh: '+61 400 000 000',
    fullNameLabel: 'Nome completo',
    fullNamePh: 'João Silva',
    emailLabel: 'Endereço de e-mail',
    emailPh: 'joao@exemplo.com',
    contactError: 'Por favor insira um nome, e-mail e telefone válidos.',
    errNameEmpty: 'Por favor insira seu nome completo',
    errNameInvalid: 'O nome só pode conter letras, espaços, hifens e apóstrofes',
    errEmailEmpty: 'Por favor insira seu e-mail',
    errEmailInvalid: 'Por favor insira um e-mail válido (ex. joao@exemplo.com)',
    errPhoneEmpty: 'Por favor insira seu número de telefone',
    errPhoneInvalid: 'O telefone só pode conter dígitos',
    errPhoneTooShort: 'O número de telefone é muito curto',
    assessmentFor: 'Avaliação para',
    submittedMsg: '✓ Seus dados foram enviados. Y&S Accounting Brisbane entrará em contato para discutir seus resultados.',
    submittingMsg: 'Enviando seus dados...',
    findingsHeader: 'Conclusões',
    nextStepsHeader: 'Próximos Passos Recomendados',
    referencesHeader: 'Referências Principais',
    downloadPdfBtn: '📄 Baixar Relatório PDF',
    consultBtn: '📞 Agendar uma Consulta',
    newAssessmentBtn: '↻ Nova Avaliação',
    pdfTitle: 'Avaliação de Rendimentos de Serviços Pessoais',
    pdfPreparedFor: 'Preparado para',
    pdfDate: 'Data',
    pdfPhone: 'Telefone',
    pdfQA: 'Suas Respostas',
    pdfDisclaimer: 'Esta avaliação é apenas um guia preliminar e não constitui aconselhamento fiscal. Determinações de PSB, risco da Parte IVA e decisões de reestruturação devem ser confirmadas com um consultor fiscal qualificado. Y&S Accounting Brisbane.',
    questions: [
      {
        id: 'income_type',
        section: 'Etapa 1 de 7 — Caráter do Rendimento',
        q: 'Mais de 50% do rendimento provém de um contrato pago pelas habilidades pessoais, conhecimento, experiência ou esforços do indivíduo?',
        help: 'PSI é rendimento principalmente como recompensa pelo trabalho pessoal de um indivíduo. Se o rendimento provém principalmente da venda de bens, do uso de ativos geradores de rendimento (ex. um caminhão, equipamento), ou de uma estrutura empresarial (funcionários fazendo o trabalho), NÃO é PSI. Salário PAYG está excluído.',
        options: [
          { v: 'yes', t: 'Sim — predominantemente habilidades/esforço pessoal' },
          { v: 'no_goods', t: 'Não — principalmente da venda de bens' },
          { v: 'no_assets', t: 'Não — principalmente do uso de ativos geradores de rendimento' },
          { v: 'no_structure', t: 'Não — principalmente de uma estrutura empresarial (equipe, sistemas)' },
          { v: 'employee', t: 'Rendimento é salário PAYG (funcionário)' }
        ]
      },
      {
        id: 'results_test',
        section: 'Etapa 2 de 7 — Teste de Resultados',
        q: 'Para pelo menos 75% do PSI, AS TRÊS condições se aplicam?',
        help: '(1) Pago para produzir um resultado específico, (2) obrigado a fornecer suas próprias ferramentas/equipamentos para fazer o trabalho, E (3) responsável por retificar defeitos por sua própria conta. Passar no teste de resultados por si só torna o indivíduo/entidade um Negócio de Serviços Pessoais (PSB) — as regras PSI NÃO se aplicam.',
        options: [
          { v: 'yes', t: 'Sim — todas as três são atendidas para ≥75% do PSI' },
          { v: 'partial', t: 'Apenas uma ou duas são atendidas' },
          { v: 'no', t: 'Não — nenhuma é claramente atendida' }
        ]
      },
      {
        id: 'eighty_percent',
        section: 'Etapa 3 de 7 — Regra dos 80%',
        q: '80% ou mais do PSI no ano vem de UM cliente (e os associados desse cliente)?',
        help: 'Em caso afirmativo, o indivíduo/entidade NÃO PODE se autoavaliar como PSB. Eles precisariam solicitar ao ATO uma Determinação de Negócio de Serviços Pessoais (PSBD), ou as regras PSI se aplicarão.',
        options: [
          { v: 'yes', t: 'Sim — 80% ou mais de um cliente' },
          { v: 'no', t: 'Não — distribuído entre múltiplos clientes não relacionados' },
          { v: 'unsure', t: 'Incerto / primeiro ano' }
        ]
      },
      {
        id: 'unrelated_clients',
        section: 'Etapa 4 de 7 — Teste de Clientes Não Relacionados',
        q: 'O indivíduo presta serviços a DOIS OU MAIS clientes não relacionados, obtidos como resultado de ofertas ao público (publicidade, site, licitações, boca a boca)?',
        help: 'Estar listado em uma única agência de contratação ou intermediário trabalhista NÃO conta como fazer ofertas ao público.',
        options: [
          { v: 'yes', t: 'Sim — dois ou mais clientes não relacionados obtidos via ofertas públicas' },
          { v: 'no', t: 'Não' }
        ]
      },
      {
        id: 'employment_test',
        section: 'Etapa 5 de 7 — Emprego e Instalações',
        q: 'A entidade contrata outros (funcionários/contratados) para realizar pelo menos 20% (por valor de mercado) do trabalho PRINCIPAL, OU tem um aprendiz por pelo menos meio ano? E/OU mantém instalações comerciais separadas usadas exclusivamente e >50% para a atividade PSI, fisicamente separadas de casa e clientes?',
        help: 'O Teste de Emprego OU o Teste de Instalações Comerciais é suficiente (em combinação com não cumprir a regra dos 80%).',
        options: [
          { v: 'employment', t: 'Sim — atende ao Teste de Emprego' },
          { v: 'premises', t: 'Sim — atende ao Teste de Instalações Comerciais' },
          { v: 'both', t: 'Sim — ambos os testes são atendidos' },
          { v: 'no', t: 'Não — nenhum teste é atendido' }
        ]
      },
      {
        id: 'restructure',
        section: 'Etapa 6 de 7 — Intenção de Reestruturação',
        q: 'O propósito principal de operar através de uma empresa/trust é reter lucros à taxa corporativa, dividir rendimentos com associados (cônjuge/família), ou de outra forma reduzir impostos em comparação com receber o rendimento pessoalmente?',
        help: 'Mesmo quando as regras PSI NÃO se aplicam (ou seja, a entidade é um PSB), a Parte IVA (antielisão geral) e a posição do ATO em PCG 2021/4 / TR 2022/3 / IT 2503 ainda podem tratar a divisão de rendimentos ou retenção de lucros como um esquema. O salário pago ao indivíduo deve ser proporcional aos serviços que ele presta.',
        options: [
          { v: 'commercial', t: 'Não — razões comerciais genuínas (responsabilidade, clientes exigem entidade, crescimento)' },
          { v: 'mixed', t: 'Parcialmente — razões comerciais mas eficiência fiscal é um fator' },
          { v: 'tax', t: 'Sim — principalmente motivado por impostos (retenção ou divisão)' }
        ]
      }
    ],
    findings: {
      employee: 'O rendimento é salário PAYG — as regras PSI não se aplicam a funcionários.',
      notPsi: 'O rendimento NÃO é PSI — provém principalmente de bens, ativos ou uma estrutura empresarial.',
      isPsi: 'O rendimento É PSI — mais de 50% é recompensa por habilidades/esforço pessoal.',
      passResults: 'PASSA no Teste de Resultados — qualifica-se como Negócio de Serviços Pessoais (PSB). As regras PSI NÃO se aplicam.',
      failResults: 'Não passa no Teste de Resultados.',
      unsure80: 'Você indicou incerteza sobre a regra dos 80%. Se 80% ou mais do seu PSI vem de um cliente, você não pode se autoavaliar como PSB e deve solicitar uma Determinação de PSB ao ATO. Verifique este limite antes de confiar nesta avaliação.',
      fail80: '80% ou mais do PSI vem de um cliente — não pode se autoavaliar como PSB. É necessária uma Determinação de PSB do ATO, caso contrário as regras PSI se aplicam.',
      passUnrelated: 'PASSA no Teste de Clientes Não Relacionados.',
      passEmployment: 'PASSA no Teste de Emprego.',
      passPremises: 'PASSA no Teste de Instalações Comerciais.',
      passOther: 'Qualifica-se como PSB (regra de menos de 80% + pelo menos um outro teste). As regras PSI NÃO se aplicam.',
      failAll: 'Não satisfaz nenhum dos testes alternativos de PSB. As regras PSI SE APLICAM.',
      restructureBlocked: 'Reestruturar para uma empresa NÃO evitará as regras de atribuição de PSI. O PSI líquido é atribuído ao indivíduo independentemente da entidade.',
      restructureTax: 'Mesmo como PSB, uma reestruturação motivada por impostos atrai risco da Parte IVA e atenção do ATO sob PCG 2021/4 / IT 2503. A divisão de rendimentos com associados não proporcional à sua contribuição provavelmente será contestada.',
      restructureMixed: 'Reestruturação de propósito misto: defensável mas deve ser documentada. O salário ao indivíduo deve refletir o valor dos serviços prestados; lucros retidos e distribuições devem ter justificativa comercial.',
      restructureCommercial: 'Reestruturação comercial genuína com status de PSB — geralmente em conformidade. Mantenha documentação dos motivadores comerciais e garanta remuneração a preço de mercado.',
      notPsiNote: 'O rendimento não é PSI — aplicam-se as regras normais de estruturação empresarial (sujeito aos princípios gerais da Parte IVA).'
    },
    verdicts: {
      compliantGreen: { title: '✓ Em Conformidade', text: 'As regras PSI não se aplicam (ou o rendimento não é PSI). Uma estrutura corporativa é defensável.' },
      compliantAmber: { title: '⚠ Em Conformidade com ressalvas', text: 'Status de PSB alcançado, mas a reestruturação deve ser documentada e a remuneração comercial.' },
      partIvaRed: { title: '✗ Risco da Parte IVA', text: 'O status de PSB por si só não justifica uma reestruturação motivada por impostos. O risco antielisão é elevado.' },
      determinationAmber: { title: '⚠ Determinação de PSB Necessária', text: 'Não pode se autoavaliar. Solicite ao ATO uma Determinação de PSB, ou as regras de atribuição de PSI se aplicarão.' },
      psiAppliesRed: { title: '✗ As Regras PSI Se Aplicam', text: 'O PSI líquido é atribuído ao indivíduo. Reestruturar para uma empresa não oferece benefício fiscal e não evitará as regras.' }
    },
    nextSteps: {
      notPsi1: 'Confirme a classificação do rendimento com contratos de apoio e evidência de faturamento.',
      notPsi2: 'Considerações padrão de estruturação se aplicam — revise contra os princípios gerais da Parte IVA.',
      psb1: 'Documente evidências que apoiem o status de PSB (contratos mostrando base de resultados, lista de clientes não relacionados, registros de emprego, contrato de aluguel das instalações).',
      psb2: 'Revise a remuneração do diretor/acionista para garantir que reflita o valor dos serviços pessoais prestados.',
      psb3: 'Reavalie os acordos de divisão de rendimentos contra os limites de risco de PCG 2021/4 e o sistema de semáforo.',
      psb4: 'Considere obter uma resolução vinculante privada antes de implementar a reestruturação.',
      psb5: 'Reavalie o status de PSB anualmente — é testado ano a ano.',
      determination1: 'Apresente um pedido de Determinação de PSB ao ATO antes de depender do status de PSB.',
      determination2: 'Enquanto isso, aplique as regras de atribuição de PSI ao rendimento líquido.',
      apply1: 'Aplique a atribuição de PSI: o PSI líquido flui para o indivíduo independentemente da entidade.',
      apply2: 'Apenas deduções limitadas — revise as deduções permitidas sob s 85-10 a s 85-40.',
      apply3: 'A reestruturação para minimização de impostos não funcionará — concentre-se em expansão empresarial legítima para potencialmente atender aos testes de PSB em anos futuros.'
    },
    references: [
      'ITAA 1997 Parte 2-42 (Divisões 84–87) — Regras PSI',
      'TR 2022/3 — PSI e PSB',
      'IT 2503 — Incorporação de práticas profissionais',
      'PCG 2021/4 — Alocação de lucros de firmas profissionais',
      'ITAA 1936 Parte IVA — Antielisão geral'
    ]
  }
};
;
(function(){
var ROOT='psi-app';
var _css=`
#psi-app *{box-sizing:border-box;}
#psi-app{color:#1a2540;line-height:1.55;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;}
#psi-app .ph{text-align:center;margin-bottom:24px;}
#psi-app .ph h1{color:#0a1f44;font-size:26px;margin:0 0 6px;letter-spacing:-0.3px;font-family:inherit;}
#psi-app .ph p{color:#5a6680;margin:0;font-size:14px;}
#psi-app .pcard{background:#fff;border:1px solid #e3e7ef;border-radius:12px;padding:28px;box-shadow:0 2px 12px rgba(10,31,68,0.04);}
#psi-app .pprog{height:6px;background:#e3e7ef;border-radius:4px;margin-bottom:24px;overflow:hidden;}
#psi-app .pprog-bar{height:100%;background:#c9a961;width:0%;transition:width 0.3s ease;}
#psi-app .pstep-label{font-size:12px;color:#5a6680;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-weight:600;}
#psi-app .pquestion{font-size:19px;font-weight:600;color:#0a1f44;margin:0 0 8px;}
#psi-app .phelp{font-size:14px;color:#5a6680;margin-bottom:20px;background:#f0f3f9;padding:12px 14px;border-left:3px solid #c9a961;border-radius:4px;}
#psi-app .popts{display:flex;flex-direction:column;gap:10px;}
#psi-app .popt{padding:14px 16px;border:2px solid #e3e7ef;border-radius:8px;cursor:pointer;background:#fff;text-align:left;font-size:15px;color:#1a2540;transition:all 0.15s;font-family:inherit;width:100%;}
#psi-app .popt:hover{border-color:#c9a961;background:#fffaf0;}
#psi-app .popt.selected{border-color:#0a1f44;background:#f0f3f9;}
#psi-app .pinput-group{margin-top:12px;}
#psi-app .pinput-group label{display:block;font-size:13px;color:#5a6680;margin-bottom:6px;}
#psi-app .pinput-group input{width:100%;padding:10px 12px;border:2px solid #e3e7ef;border-radius:6px;font-size:15px;font-family:inherit;}
#psi-app .pnav{display:flex;justify-content:space-between;margin-top:28px;gap:12px;}
#psi-app .pbtn{padding:12px 24px;border-radius:8px;border:none;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.15s;}
#psi-app .pbtn-primary{background:#0a1f44;color:#fff;}
#psi-app .pbtn-primary:hover:not(:disabled){background:#1a3563;}
#psi-app .pbtn-primary:disabled{opacity:0.4;cursor:not-allowed;}
#psi-app .pbtn-secondary{background:#fff;color:#0a1f44;border:2px solid #e3e7ef;}
#psi-app .pbtn-secondary:hover{border-color:#0a1f44;}
#psi-app .plang-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:8px;}
#psi-app .plang-btn{padding:24px 12px;border:2px solid #e3e7ef;border-radius:10px;background:#fff;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:8px;transition:all 0.15s;}
#psi-app .plang-btn:hover{border-color:#c9a961;background:#fffaf0;transform:translateY(-2px);}
#psi-app .plang-flag{font-size:32px;}
#psi-app .plang-name{font-weight:600;color:#0a1f44;font-size:15px;}
@media(max-width:480px){#psi-app .plang-grid{grid-template-columns:1fr;}}
#psi-app .pverdict{padding:18px 20px;border-radius:10px;margin-bottom:20px;font-weight:600;}
#psi-app .pverdict.green{background:#e8f5ec;color:#2e7d4f;border-left:4px solid #2e7d4f;}
#psi-app .pverdict.amber{background:#fdf3e7;color:#c97a1a;border-left:4px solid #c97a1a;}
#psi-app .pverdict.red{background:#fbeaea;color:#b3261e;border-left:4px solid #b3261e;}
#psi-app .pverdict h3{margin:0 0 6px;font-size:17px;}
#psi-app .pverdict p{margin:0;font-size:14px;font-weight:500;}
#psi-app .psect{margin-bottom:22px;}
#psi-app .psect h4{color:#0a1f44;font-size:14px;text-transform:uppercase;letter-spacing:0.8px;margin:0 0 10px;padding-bottom:6px;border-bottom:1px solid #e3e7ef;}
#psi-app .pfind{display:flex;gap:10px;padding:8px 0;font-size:14px;}
#psi-app .pfind-icon{flex-shrink:0;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;color:#fff;}
#psi-app .picon-pass{background:#2e7d4f;}
#psi-app .picon-fail{background:#b3261e;}
#psi-app .picon-warn{background:#c97a1a;}
#psi-app .picon-info{background:#5a6680;}
#psi-app .pdisclaimer{margin-top:24px;padding:14px;background:#f0f3f9;border-radius:8px;font-size:12px;color:#5a6680;line-height:1.5;}
`;
var _s=document.createElement('style');_s.textContent=_css;document.head.appendChild(_s);

var _phoneCss=document.createElement('style');
_phoneCss.textContent='#psi-app .pinput-group{position:relative;}#psi-app .pphone-wrap{display:flex;border:2px solid #e3e7ef;border-radius:6px;overflow:visible;position:relative;}#psi-app .pphone-cc{display:flex;align-items:center;gap:4px;padding:8px 10px;border:none;background:#f0f3f9;cursor:pointer;font-size:14px;font-family:inherit;border-radius:4px 0 0 4px;white-space:nowrap;}#psi-app .pphone-cc:hover{background:#e3e7ef;}#psi-app .pphone-arrow{font-size:10px;color:#5a6680;}#psi-app .pphone-input{flex:1;border:none;padding:10px 12px;font-size:15px;font-family:inherit;outline:none;min-width:0;}#psi-app .pcc-dropdown{position:absolute;left:0;right:0;background:#fff;border:2px solid #e3e7ef;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:9999;overflow:hidden;}#psi-app .pcc-search{width:100%;padding:10px 12px;border:none;border-bottom:1px solid #e3e7ef;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;}#psi-app .pcc-list{max-height:200px;overflow-y:auto;-webkit-overflow-scrolling:touch;}#psi-app .pcc-item{padding:10px 12px;cursor:pointer;font-size:14px;display:flex;align-items:center;gap:6px;}#psi-app .pcc-item:hover{background:#f0f3f9;}#psi-app .pcc-dial{color:#5a6680;margin-left:auto;}#psi-app .pcc-sep{height:1px;background:#e3e7ef;margin:4px 0;}#psi-app .pfield-err{display:none;color:#b3261e;font-size:12px;margin-top:6px;line-height:1.3;}#psi-app .pinput-invalid{border-color:#b3261e !important;}#psi-app .pphone-wrap:has(.pinput-invalid){border-color:#b3261e !important;}';
document.head.appendChild(_phoneCss);
var T = window.__PSI_T;


var CONTACT_STEP=99;
function getNextStep(cur){
  var a=answers,ql=T[lang].questions.length;
  if(cur===-1)return 0;
  if(cur===0){
    if(a.income_type!=='yes')return CONTACT_STEP;
    return 1;
  }
  if(cur===1){
    if(a.results_test==='yes')return 5;
    return 2;
  }
  if(cur===2){
    if(a.eighty_percent==='yes')return CONTACT_STEP;
    return 3;
  }
  if(cur===3)return 4;
  if(cur===4){
    var passQ4=a.unrelated_clients==='yes';
    var passQ5=a.employment_test&&a.employment_test!=='no';
    if(passQ4||passQ5)return 5;
    return CONTACT_STEP;
  }
  if(cur===5)return CONTACT_STEP;
  return CONTACT_STEP;
}
function getPrevStep(cur){
  if(cur===CONTACT_STEP){
    var a=answers;
    if(a.income_type!=='yes')return 0;
    if(a.results_test==='yes')return 5;
    if(a.eighty_percent==='yes')return 2;
    var passQ4=a.unrelated_clients==='yes';
    var passQ5=a.employment_test&&a.employment_test!=='no';
    if(passQ4||passQ5)return 5;
    return 4;
  }
  if(cur===5){
    var a=answers;
    if(a.results_test==='yes')return 1;
    var passQ4=a.unrelated_clients==='yes';
    var passQ5=a.employment_test&&a.employment_test!=='no';
    if(passQ4||passQ5)return 4;
    return 4;
  }
  if(cur===4)return 3;
  if(cur===3)return 2;
  if(cur===2)return 1;
  if(cur===1)return 0;
  return -1;
}
function getFlowPosition(){
  var a=answers,pos=0,s=step;
  var flow=[0];
  if(a.income_type==='yes'){
    flow.push(1);
    if(a.results_test==='yes'){flow.push(5);}
    else if(a.results_test){
      flow.push(2);
      if(a.eighty_percent!=='yes'){
        flow.push(3);flow.push(4);
        var p4=a.unrelated_clients==='yes';
        var p5=a.employment_test&&a.employment_test!=='no';
        if(p4||p5)flow.push(5);
      }
    }
  }
  flow.push(CONTACT_STEP);
  for(var i=0;i<flow.length;i++){if(flow[i]===s){return {pos:i+1,total:flow.length};}}
  return {pos:flow.length,total:flow.length};
}
function clearDownstreamAnswers(fromQIndex){
  var t=T[lang];
  for(var i=fromQIndex+1;i<t.questions.length;i++){delete answers[t.questions[i].id];}
}

var lang=null,answers={},step=-1;
var mount=document.getElementById(ROOT);
if(!mount){return;}
mount.innerHTML='<div class="ph"><h1 id="hTitle">Personal Services Income Assessment</h1><p id="hSub">PSI rules &amp; corporate restructure compliance check</p></div><div class="pcard"><div class="pprog"><div class="pprog-bar" id="pBar"></div></div><div id="pContent"></div><div class="pnav" id="pNav" style="display:none;"><button class="pbtn pbtn-secondary" id="bBack">&larr; Back</button><button class="pbtn pbtn-primary" id="bNext" disabled>Next &rarr;</button></div></div><div class="pdisclaimer" id="hDisc"></div>';
var content=document.getElementById('pContent');
var nav=document.getElementById('pNav');
var backBtn=document.getElementById('bBack');
var nextBtn=document.getElementById('bNext');
var progressBar=document.getElementById('pBar');
var headerTitle=document.getElementById('hTitle');
var headerSubtitle=document.getElementById('hSub');
var disclaimer=document.getElementById('hDisc');

function applyChromeForLang(){
  var t=T[lang];
  document.documentElement.lang=lang;
  headerTitle.textContent=t.headerTitle;
  headerSubtitle.textContent=t.headerSubtitle;
  disclaimer.innerHTML=t.disclaimer;
  backBtn.textContent=t.back;
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});
}

function render(){
  if(step===-1){
    nav.style.display='none';
    progressBar.style.width='0%';
    content.innerHTML='<h2 class="pquestion" style="text-align:center;margin-bottom:6px;">\u{1F310} Language / Idioma</h2><p style="text-align:center;color:#5a6680;font-size:14px;margin:0 0 24px;">Select your language &middot; Seleccione su idioma &middot; Selecione o seu idioma</p><div class="plang-grid"><button class="plang-btn" data-lang="en"><div class="plang-flag">\u{1F1EC}\u{1F1E7}</div><div class="plang-name">English</div></button><button class="plang-btn" data-lang="es"><div class="plang-flag">\u{1F1EA}\u{1F1F8}</div><div class="plang-name">Espa\u00F1ol</div></button><button class="plang-btn" data-lang="pt"><div class="plang-flag">\u{1F1E7}\u{1F1F7}</div><div class="plang-name">Portugu\u00EAs</div></button></div>';
    var btns=content.querySelectorAll('.plang-btn');
    for(var i=0;i<btns.length;i++){
      btns[i].addEventListener('click',function(){
        lang=this.getAttribute('data-lang');
        applyChromeForLang();
        step=0;
        nextBtn.onclick=defaultNextHandler;
        render();
      });
    }
    return;
  }
  var t=T[lang];
  nav.style.display='flex';
  if(step<t.questions.length){
    var q=t.questions[step];
    var fp=getFlowPosition();
    progressBar.style.width=(fp.pos/fp.total*100)+'%';
    var topic=q.section.replace(/^.*\u2014\s*/,'');
    var stepWord=lang==='en'?'Step':lang==='es'?'Paso':'Etapa';
    var ofWord=lang==='en'?' of ':lang==='es'?' de ':' de ';
    var dynSection=stepWord+' '+fp.pos+ofWord+fp.total+' \u2014 '+topic;
    var html='<div class="pstep-label">'+dynSection+'</div><h2 class="pquestion">'+q.q+'</h2><div class="phelp">'+q.help+'</div><div class="popts">';
    for(var j=0;j<q.options.length;j++){
      var o=q.options[j];
      html+='<button class="popt '+(answers[q.id]===o.v?'selected':'')+'" data-v="'+o.v+'">'+o.t+'</button>';
    }
    html+='</div>';
    content.innerHTML=html;
    var opts=content.querySelectorAll('.popt');
    for(var k=0;k<opts.length;k++){
      opts[k].addEventListener('click',function(){
        var newVal=this.getAttribute('data-v');
        if(answers[q.id]!==newVal){clearDownstreamAnswers(step);}
        answers[q.id]=newVal;
        render();
      });
    }
    backBtn.style.visibility='visible';
    nextBtn.disabled=!answers[q.id];
    nextBtn.textContent=t.next;
    return;
  }
  if(step===CONTACT_STEP){
    var fp2=getFlowPosition();
    progressBar.style.width=(fp2.pos/fp2.total*100)+'%';
    var dynContact=t.contactSection.replace(/\d+\s*(of|de)\s*\d+/,fp2.pos+' $1 '+fp2.total);
    content.innerHTML='<div class="pstep-label">'+dynContact+'</div><h2 class="pquestion">'+t.contactQ+'</h2><div class="phelp">'+t.contactHelp+'</div><div class="pinput-group"><label for="cFullName">'+t.fullNameLabel+'</label><input type="text" id="cFullName" placeholder="'+t.fullNamePh+'" value="'+(answers.fullName||'')+'" autocomplete="name"><div class="pfield-err" id="cNameErr"></div></div><div class="pinput-group"><label for="cEmail">'+t.emailLabel+'</label><input type="email" id="cEmail" placeholder="'+t.emailPh+'" value="'+(answers.email||'')+'" autocomplete="email"><div class="pfield-err" id="cEmailErr"></div></div><div class="pinput-group"><label for="cPhone">'+t.phoneLabel+'</label><div class="pphone-wrap"><button type="button" class="pphone-cc" id="ccBtn"><span id="ccFlag"></span><span id="ccCode"></span><span class="pphone-arrow">&#9662;</span></button><input type="tel" id="cPhone" class="pphone-input" placeholder="412 345 678" autocomplete="tel" inputmode="tel"></div><div class="pcc-dropdown" id="ccDropdown" style="display:none;"><input type="text" class="pcc-search" id="ccSearch" placeholder="Search..."><div class="pcc-list" id="ccList"></div></div><div class="pfield-err" id="cPhoneErr"></div></div><div id="cErr" style="color:#b3261e;font-size:13px;margin-top:10px;min-height:18px;"></div>';
    var nameInput=document.getElementById('cFullName');
    var emailInput=document.getElementById('cEmail');
    var phoneEl=document.getElementById('cPhone');
    var ccBtn=document.getElementById('ccBtn');
    var ccFlag=document.getElementById('ccFlag');
    var ccCode=document.getElementById('ccCode');
    var ccDropdown=document.getElementById('ccDropdown');
    var ccSearch=document.getElementById('ccSearch');
    var ccList=document.getElementById('ccList');
    var countries=[
      {c:'AU',n:'Australia',d:'+61',f:'\ud83c\udde6\ud83c\uddfa'},
      {c:'CO',n:'Colombia',d:'+57',f:'\ud83c\udde8\ud83c\uddf4'},
      {c:'BR',n:'Brazil',d:'+55',f:'\ud83c\udde7\ud83c\uddf7'},
      {c:'US',n:'United States',d:'+1',f:'\ud83c\uddfa\ud83c\uddf8'},
      {c:'GB',n:'United Kingdom',d:'+44',f:'\ud83c\uddec\ud83c\udde7'},
      {c:'NZ',n:'New Zealand',d:'+64',f:'\ud83c\uddf3\ud83c\uddff'},
      {c:'--',n:'',d:'',f:''},
      {c:'AF',n:'Afghanistan',d:'+93',f:'\ud83c\udde6\ud83c\uddeb'},
      {c:'AL',n:'Albania',d:'+355',f:'\ud83c\udde6\ud83c\uddf1'},
      {c:'DZ',n:'Algeria',d:'+213',f:'\ud83c\udde9\ud83c\uddff'},
      {c:'AR',n:'Argentina',d:'+54',f:'\ud83c\udde6\ud83c\uddf7'},
      {c:'AT',n:'Austria',d:'+43',f:'\ud83c\udde6\ud83c\uddf9'},
      {c:'BD',n:'Bangladesh',d:'+880',f:'\ud83c\udde7\ud83c\udde9'},
      {c:'BE',n:'Belgium',d:'+32',f:'\ud83c\udde7\ud83c\uddea'},
      {c:'CA',n:'Canada',d:'+1',f:'\ud83c\udde8\ud83c\udde6'},
      {c:'CL',n:'Chile',d:'+56',f:'\ud83c\udde8\ud83c\uddf1'},
      {c:'CN',n:'China',d:'+86',f:'\ud83c\udde8\ud83c\uddf3'},
      {c:'EC',n:'Ecuador',d:'+593',f:'\ud83c\uddea\ud83c\udde8'},
      {c:'EG',n:'Egypt',d:'+20',f:'\ud83c\uddea\ud83c\uddec'},
      {c:'FJ',n:'Fiji',d:'+679',f:'\ud83c\uddeb\ud83c\uddef'},
      {c:'FR',n:'France',d:'+33',f:'\ud83c\uddeb\ud83c\uddf7'},
      {c:'DE',n:'Germany',d:'+49',f:'\ud83c\udde9\ud83c\uddea'},
      {c:'GR',n:'Greece',d:'+30',f:'\ud83c\uddec\ud83c\uddf7'},
      {c:'HK',n:'Hong Kong',d:'+852',f:'\ud83c\udded\ud83c\uddf0'},
      {c:'IN',n:'India',d:'+91',f:'\ud83c\uddee\ud83c\uddf3'},
      {c:'ID',n:'Indonesia',d:'+62',f:'\ud83c\uddee\ud83c\udde9'},
      {c:'IE',n:'Ireland',d:'+353',f:'\ud83c\uddee\ud83c\uddea'},
      {c:'IL',n:'Israel',d:'+972',f:'\ud83c\uddee\ud83c\uddf1'},
      {c:'IT',n:'Italy',d:'+39',f:'\ud83c\uddee\ud83c\uddf9'},
      {c:'JP',n:'Japan',d:'+81',f:'\ud83c\uddef\ud83c\uddf5'},
      {c:'KR',n:'South Korea',d:'+82',f:'\ud83c\uddf0\ud83c\uddf7'},
      {c:'MY',n:'Malaysia',d:'+60',f:'\ud83c\uddf2\ud83c\uddfe'},
      {c:'MX',n:'Mexico',d:'+52',f:'\ud83c\uddf2\ud83c\uddfd'},
      {c:'NL',n:'Netherlands',d:'+31',f:'\ud83c\uddf3\ud83c\uddf1'},
      {c:'PK',n:'Pakistan',d:'+92',f:'\ud83c\uddf5\ud83c\uddf0'},
      {c:'PE',n:'Peru',d:'+51',f:'\ud83c\uddf5\ud83c\uddea'},
      {c:'PH',n:'Philippines',d:'+63',f:'\ud83c\uddf5\ud83c\udded'},
      {c:'PG',n:'Papua New Guinea',d:'+675',f:'\ud83c\uddf5\ud83c\uddec'},
      {c:'PT',n:'Portugal',d:'+351',f:'\ud83c\uddf5\ud83c\uddf9'},
      {c:'SG',n:'Singapore',d:'+65',f:'\ud83c\uddf8\ud83c\uddec'},
      {c:'ZA',n:'South Africa',d:'+27',f:'\ud83c\uddff\ud83c\udde6'},
      {c:'ES',n:'Spain',d:'+34',f:'\ud83c\uddea\ud83c\uddf8'},
      {c:'LK',n:'Sri Lanka',d:'+94',f:'\ud83c\uddf1\ud83c\uddf0'},
      {c:'TH',n:'Thailand',d:'+66',f:'\ud83c\uddf9\ud83c\udded'},
      {c:'VE',n:'Venezuela',d:'+58',f:'\ud83c\uddfb\ud83c\uddea'},
      {c:'VN',n:'Vietnam',d:'+84',f:'\ud83c\uddfb\ud83c\uddf3'}
    ];
    var selCC=countries[0];
    function setCC(cc){selCC=cc;ccFlag.textContent=cc.f;ccCode.textContent=cc.d;if(typeof validate==='function')validate();}
    function renderList(filter){
      var h='';
      for(var i=0;i<countries.length;i++){
        var c=countries[i];
        if(c.c==='--'){h+='<div class="pcc-sep"></div>';continue;}
        if(filter&&c.n.toLowerCase().indexOf(filter)<0&&c.d.indexOf(filter)<0&&c.c.toLowerCase().indexOf(filter)<0)continue;
        h+='<div class="pcc-item" data-i="'+i+'">'+c.f+' '+c.n+' <span class="pcc-dial">'+c.d+'</span></div>';
      }
      ccList.innerHTML=h;
      var items=ccList.querySelectorAll('.pcc-item');
      for(var j=0;j<items.length;j++){
        items[j].addEventListener('click',function(){
          setCC(countries[parseInt(this.getAttribute('data-i'))]);
          ccDropdown.style.display='none';
          phoneEl.focus();
        });
      }
    }
    renderList('');
    setCC(countries[0]);
    ccBtn.addEventListener('mousedown',function(e){
      e.preventDefault();
      e.stopPropagation();
      var show=ccDropdown.style.display==='none';
      if(show){
        window.__psiDDOpen=true;
        ccDropdown.style.display='block';
        ccSearch.value='';renderList('');
        setTimeout(function(){ccSearch.focus();window.__psiDDOpen=false;},100);
        var wrap=ccBtn.closest('.pinput-group');
        var rect=wrap.getBoundingClientRect();
        var spaceBelow=window.innerHeight-rect.bottom-10;
        if(spaceBelow<200){ccDropdown.style.bottom='100%';ccDropdown.style.top='auto';ccDropdown.style.maxHeight=Math.min(260,rect.top-10)+'px';}
        else{ccDropdown.style.top='100%';ccDropdown.style.bottom='auto';ccDropdown.style.maxHeight=Math.min(260,spaceBelow)+'px';}
      }else{
        ccDropdown.style.display='none';
      }
    });
    ccSearch.addEventListener('input',function(){renderList(this.value.toLowerCase());});
    ccSearch.addEventListener('mousedown',function(e){e.stopPropagation();});
    ccDropdown.addEventListener('mousedown',function(e){e.stopPropagation();});
    if(!window.__psiDocHandler){
      window.__psiDocHandler=true;
      document.addEventListener('mousedown',function(){
        if(window.__psiDDOpen)return;
        var dd=document.getElementById('ccDropdown');
        if(dd)dd.style.display='none';
      });
    }
    if(answers.phone){phoneEl.value=answers.phone.replace(/^\+\d+\s*/,'');}
    var nameErrEl=document.getElementById('cNameErr');
    var emailErrEl=document.getElementById('cEmailErr');
    var phoneErrEl=document.getElementById('cPhoneErr');
    var touched={name:!!answers.fullName,email:!!answers.email,phone:!!answers.phone};
    function validateName(v){
      v=v.trim();
      if(v.length===0)return t.errNameEmpty;
      if(v.length<2)return t.errNameEmpty;
      if(!/^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s\-'.]+$/.test(v))return t.errNameInvalid;
      return '';
    }
    function validateEmail(v){
      v=v.trim();
      if(v.length===0)return t.errEmailEmpty;
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))return t.errEmailInvalid;
      return '';
    }
    function validatePhone(v){
      v=v.trim();
      if(v.length===0)return t.errPhoneEmpty;
      if(!/^[\d\s\-()]+$/.test(v))return t.errPhoneInvalid;
      var digits=v.replace(/[\s\-()]/g,'');
      if(digits.length<6)return t.errPhoneTooShort;
      return '';
    }
    function showFieldError(input,errEl,msg){
      if(msg){errEl.textContent=msg;errEl.style.display='block';input.classList.add('pinput-invalid');}
      else{errEl.textContent='';errEl.style.display='none';input.classList.remove('pinput-invalid');}
    }
    var validate=function(){
      var nameMsg=validateName(nameInput.value);
      var emailMsg=validateEmail(emailInput.value);
      var phoneMsg=validatePhone(phoneEl.value);
      if(touched.name)showFieldError(nameInput,nameErrEl,nameMsg);
      if(touched.email)showFieldError(emailInput,emailErrEl,emailMsg);
      if(touched.phone)showFieldError(phoneEl,phoneErrEl,phoneMsg);
      nextBtn.disabled=!(!nameMsg&&!emailMsg&&!phoneMsg);
      return !nameMsg&&!emailMsg&&!phoneMsg;
    };
    nameInput.addEventListener('input',function(){validate();});
    emailInput.addEventListener('input',function(){validate();});
    phoneEl.addEventListener('input',function(){
      var cleaned=this.value.replace(/[^\d\s\-()+]/g,'');
      if(cleaned!==this.value){this.value=cleaned;}
      validate();
    });
    nameInput.addEventListener('blur',function(){touched.name=true;validate();});
    emailInput.addEventListener('blur',function(){touched.email=true;validate();});
    phoneEl.addEventListener('blur',function(){touched.phone=true;validate();});
    validate();
    backBtn.style.visibility='visible';
    nextBtn.textContent=t.seeResult;
    nextBtn.onclick=function(){
      touched.name=touched.email=touched.phone=true;
      if(!validate()){
        document.getElementById('cErr').textContent=t.contactError;
        var firstInvalid=nameErrEl.textContent?nameInput:emailErrEl.textContent?emailInput:phoneEl;
        firstInvalid.focus();
        return;
      }
      document.getElementById('cErr').textContent='';
      answers.fullName=nameInput.value.trim();
      answers.email=emailInput.value.trim();
      answers.phone=selCC.d+' '+phoneEl.value.trim();
      step=CONTACT_STEP+1;
      nextBtn.onclick=defaultNextHandler;
      render();
    };
    return;
  }
  showResult();
}

function showResult(){
  var t=T[lang];
  var f=t.findings;
  progressBar.style.width='100%';
  backBtn.style.visibility='visible';
  nextBtn.style.display='none';
  var a=answers;
  var psiApplies=null,psbStatus=null,restructureRisk=null;
  var findings=[];
  if(a.income_type==='employee'){psiApplies=false;findings.push({type:'info',text:f.employee});}
  else if(a.income_type!=='yes'){psiApplies=false;findings.push({type:'pass',text:f.notPsi});}
  else{
    psiApplies=true;
    findings.push({type:'warn',text:f.isPsi});
    if(a.results_test==='yes'){psbStatus='pass_results';findings.push({type:'pass',text:f.passResults});}
    else{
      findings.push({type:'fail',text:f.failResults});
      if(a.eighty_percent==='yes'){psbStatus='needs_determination';findings.push({type:'fail',text:f.fail80});}
      else{
        if(a.eighty_percent==='unsure'){findings.push({type:'warn',text:f.unsure80});}
        var passesUnrelated=a.unrelated_clients==='yes';
        var passesEmpOrPrem=a.employment_test!=='no';
        if(passesUnrelated||passesEmpOrPrem){
          psbStatus='pass_other';
          if(passesUnrelated)findings.push({type:'pass',text:f.passUnrelated});
          if(a.employment_test==='employment'||a.employment_test==='both')findings.push({type:'pass',text:f.passEmployment});
          if(a.employment_test==='premises'||a.employment_test==='both')findings.push({type:'pass',text:f.passPremises});
          findings.push({type:'pass',text:f.passOther});
        }else{psbStatus='fail';findings.push({type:'fail',text:f.failAll});}
      }
    }
  }
  if(psiApplies&&psbStatus!=='pass_results'&&psbStatus!=='pass_other'){restructureRisk='high';findings.push({type:'fail',text:f.restructureBlocked});}
  else if(psiApplies&&(psbStatus==='pass_results'||psbStatus==='pass_other')){
    if(a.restructure==='tax'){restructureRisk='high';findings.push({type:'fail',text:f.restructureTax});}
    else if(a.restructure==='mixed'){restructureRisk='medium';findings.push({type:'warn',text:f.restructureMixed});}
    else{restructureRisk='low';findings.push({type:'pass',text:f.restructureCommercial});}
  }else if(!psiApplies){restructureRisk='low';findings.push({type:'pass',text:f.notPsiNote});}
  var verdictClass,verdict;
  if(!psiApplies||psbStatus==='pass_results'||psbStatus==='pass_other'){
    if(restructureRisk==='low'){verdictClass='green';verdict=t.verdicts.compliantGreen;}
    else if(restructureRisk==='medium'){verdictClass='amber';verdict=t.verdicts.compliantAmber;}
    else{verdictClass='red';verdict=t.verdicts.partIvaRed;}
  }else if(psbStatus==='needs_determination'){verdictClass='amber';verdict=t.verdicts.determinationAmber;}
  else{verdictClass='red';verdict=t.verdicts.psiAppliesRed;}
  var html='<div class="pstep-label">'+t.assessmentFor+' '+escapeHtml(answers.fullName)+'</div><div class="pverdict '+verdictClass+'"><h3>'+verdict.title+'</h3><p>'+verdict.text+'</p></div><div id="submitStatus" style="font-size:13px;color:#5a6680;margin-bottom:18px;padding:10px 14px;background:#f0f3f9;border-radius:6px;">'+t.submittingMsg+'</div><div class="psect"><h4>'+t.findingsHeader+'</h4>';
  for(var i=0;i<findings.length;i++){
    var fi=findings[i];
    var ic=fi.type==='pass'?'pass':fi.type==='fail'?'fail':fi.type==='warn'?'warn':'info';
    var ch=fi.type==='pass'?'\u2713':fi.type==='fail'?'\u2717':fi.type==='warn'?'!':'i';
    html+='<div class="pfind"><div class="pfind-icon picon-'+ic+'">'+ch+'</div><div>'+fi.text+'</div></div>';
  }
  html+='</div><div class="psect"><h4>'+t.nextStepsHeader+'</h4>';
  var ns=getNextSteps(psiApplies,psbStatus,restructureRisk);
  for(var n=0;n<ns.length;n++){
    html+='<div class="pfind"><div class="pfind-icon picon-info">\u2192</div><div>'+ns[n]+'</div></div>';
  }
  html+='</div><div class="psect"><h4>'+t.referencesHeader+'</h4>';
  for(var r=0;r<t.references.length;r++){
    html+='<div class="pfind"><div class="pfind-icon picon-info">\u00A7</div><div>'+t.references[r]+'</div></div>';
  }
  html+='</div><div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:10px;"><button class="pbtn pbtn-primary" id="pdfDownloadBtn">'+t.downloadPdfBtn+'</button><a href="https://www.taxbne.com.au/services/tax-planning" class="pbtn pbtn-secondary" style="text-decoration:none;text-align:center;">'+t.consultBtn+'</a><button class="pbtn pbtn-secondary" onclick="location.reload()">'+t.newAssessmentBtn+'</button></div>';
  content.innerHTML=html;
  sendAssessment(verdict.title,verdict.text,findings,ns,t);
  var pdfBtn=document.getElementById('pdfDownloadBtn');
  if(pdfBtn){pdfBtn.addEventListener('click',function(){
    try{
      openPrintableReport(verdict,verdictClass,findings,ns,t);
    }catch(err){
      console.error('PDF report error:',err);
      alert('Could not open PDF report: '+(err.message||err));
    }
  });}
}

function getNextSteps(psiApplies,psbStatus,risk){
  var ns=T[lang].nextSteps;
  var steps=[];
  if(!psiApplies){steps.push(ns.notPsi1);steps.push(ns.notPsi2);return steps;}
  if(psbStatus==='pass_results'||psbStatus==='pass_other'){
    steps.push(ns.psb1);steps.push(ns.psb2);
    if(risk==='high'||risk==='medium'){steps.push(ns.psb3);steps.push(ns.psb4);}
    steps.push(ns.psb5);
  }else if(psbStatus==='needs_determination'){steps.push(ns.determination1);steps.push(ns.determination2);}
  else{steps.push(ns.apply1);steps.push(ns.apply2);steps.push(ns.apply3);}
  return steps;
}

backBtn.addEventListener('click',function(){
  if(step>CONTACT_STEP){step=CONTACT_STEP;nextBtn.onclick=defaultNextHandler;nextBtn.style.display='';render();}
  else if(step===CONTACT_STEP){step=getPrevStep(CONTACT_STEP);nextBtn.onclick=defaultNextHandler;nextBtn.style.display='';render();}
  else if(step>0){step=getPrevStep(step);nextBtn.onclick=defaultNextHandler;nextBtn.style.display='';render();}
  else if(step===0){step=-1;answers={};nextBtn.style.display='';render();}
});
function defaultNextHandler(){step=getNextStep(step);render();}
nextBtn.onclick=defaultNextHandler;

function buildAnswerSummary(){
  var t=T[lang];
  var lines=[];
  for(var i=0;i<t.questions.length;i++){
    var q=t.questions[i];
    var av=answers[q.id];
    var label=q.section.replace(/^(Step|Paso|Etapa)\s+\d+\s+(of|de)\s+\d+\s+.+?\s/,'');
    var chosen='—';
    if(av){for(var j=0;j<q.options.length;j++){if(q.options[j].v===av){chosen=q.options[j].t;break;}}}
    lines.push(label+': '+chosen);
  }
  return lines;
}

function sendAssessment(verdictTitle,verdictText,findings,nextSteps,t){
  try{
    var f=document.getElementById('wf-psi-form');
    if(!f){return;}
    var setField=function(id,val){var el=document.getElementById(id);if(el)el.value=val||'';};
    setField('psi-full-name',answers.fullName);
    setField('psi-email',answers.email);
    setField('psi-phone',answers.phone);
    setField('psi-language',lang);
    setField('psi-verdict-title',verdictTitle);
    setField('psi-verdict-text',verdictText);
    var sep=' --- ';
    var report='';
    report+='PHONE: '+(answers.phone||'N/A');
    report+=sep;
    report+='VERDICT: '+verdictTitle+' | '+verdictText;
    report+=sep;
    report+='ANSWERS: ';
    var qa=buildAnswerSummary();
    for(var i=0;i<qa.length;i++){report+=(i+1)+'. '+qa[i]+' | ';}
    report+=sep;
    report+='FINDINGS: ';
    for(var j=0;j<findings.length;j++){
      var icon=findings[j].type==='pass'?'[PASS]':findings[j].type==='fail'?'[FAIL]':findings[j].type==='warn'?'[WARN]':'[INFO]';
      report+=icon+' '+findings[j].text+' | ';
    }
    report+=sep;
    report+='NEXT STEPS: ';
    for(var k=0;k<nextSteps.length;k++){report+='> '+nextSteps[k]+' | ';}
    report+=sep;
    report+='REFERENCES: ';
    for(var r=0;r<t.references.length;r++){report+=t.references[r]+' | ';}
    setField('psi-findings',report);
    setField('psi-answers',JSON.stringify(answers));
    var sb=document.getElementById('psi-submit-btn');
    if(sb){sb.click();}
    var el=document.getElementById('submitStatus');
    if(el){
      setTimeout(function(){
        el.innerHTML=t.submittedMsg;
        el.style.color='#2e7d4f';
        el.style.background='#e8f5ec';
      },800);
    }
  }catch(e){
    var el2=document.getElementById('submitStatus');
    if(el2){el2.innerHTML='Submission recorded. Your results are shown below.';el2.style.color='#5a6680';}
  }
}

function openPrintableReport(verdict,verdictClass,findings,nextSteps,t){
  function esc(s){
    if(s==null)return '';
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }
  var safeName=esc(answers.fullName||'Client');
  var safeEmail=esc(answers.email||'');
  var safePhone=esc(answers.phone||'N/A');
  var dateStr=new Date().toLocaleDateString('en-AU',{year:'numeric',month:'long',day:'numeric'});
  var vClassColor=verdictClass==='green'?'#2e7d4f':verdictClass==='amber'?'#c97a1a':'#b3261e';
  var vTitleText=String(verdict.title||'').replace(/^[\u2713\u2717\u26A0\u2714\u2716\u2718\u2705\u274C\u26A0\uFE0F\u2699\uFE0F]\s*/,'');
  var qa=buildAnswerSummary();
  var qaHtml='';
  for(var i=0;i<qa.length;i++){
    var parts=String(qa[i]||'').split(': ');
    var qLabel=esc(parts[0]||'');
    var aLabel=esc(parts.slice(1).join(': ')||'-');
    qaHtml+='<div class="qa-item"><div class="qa-q">'+(i+1)+'. '+qLabel+'</div><div class="qa-a">'+aLabel+'</div></div>';
  }
  var findHtml='';
  for(var fi=0;fi<findings.length;fi++){
    var fType=findings[fi].type;
    var fColor=fType==='pass'?'#2e7d4f':fType==='fail'?'#b3261e':'#c97a1a';
    var fIcon=fType==='pass'?'&#10003;':fType==='fail'?'&#10007;':'!';
    findHtml+='<div class="finding"><span class="find-icon" style="color:'+fColor+'">'+fIcon+'</span><span class="find-text">'+esc(findings[fi].text||'')+'</span></div>';
  }
  var nsHtml='';
  for(var ni=0;ni<nextSteps.length;ni++){
    nsHtml+='<li>'+esc(nextSteps[ni]||'')+'</li>';
  }
  var refHtml='';
  for(var ri=0;ri<t.references.length;ri++){
    refHtml+='<li>'+esc(t.references[ri]||'')+'</li>';
  }
  var html=''
    +'<!DOCTYPE html>'
    +'<html lang="'+esc(lang||'en')+'">'
    +'<head>'
    +'<meta charset="UTF-8">'
    +'<title>PSI Assessment - '+safeName+'</title>'
    +'<style>'
    +'@page{size:A4;margin:15mm 15mm 20mm 15mm;}'
    +'*{box-sizing:border-box;margin:0;padding:0;}'
    +'body{font-family:Arial,Helvetica,sans-serif;font-size:10pt;line-height:1.4;color:#1a2540;background:#fff;}'
    +'.page{max-width:180mm;margin:0 auto;padding:0;}'
    +'.header{background:#0a1f44;color:#fff;padding:16px 24px;border-bottom:3px solid #c9a961;margin-bottom:16px;}'
    +'.header h1{font-size:18pt;margin-bottom:4px;}'
    +'.header p{font-size:10pt;opacity:0.9;}'
    +'.client-box{background:#f0f3f9;border-radius:6px;padding:12px 16px;margin-bottom:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;}'
    +'.client-box .name{font-weight:bold;color:#0a1f44;font-size:11pt;width:100%;margin-bottom:4px;}'
    +'.client-box .info{color:#5a6680;font-size:9pt;}'
    +'.verdict{background:'+vClassColor+';color:#fff;border-radius:6px;padding:12px 16px;margin-bottom:16px;}'
    +'.verdict h2{font-size:13pt;margin-bottom:4px;}'
    +'.verdict p{font-size:10pt;line-height:1.4;}'
    +'.section{margin-bottom:14px;page-break-inside:avoid;}'
    +'.section h3{color:#0a1f44;font-size:12pt;padding-bottom:4px;border-bottom:1px solid #c9a961;margin-bottom:8px;}'
    +'.qa-item{margin-bottom:8px;}'
    +'.qa-q{font-weight:bold;color:#0a1f44;font-size:10pt;}'
    +'.qa-a{color:#5a6680;font-size:9pt;padding-left:12px;margin-top:2px;}'
    +'.finding{display:flex;gap:8px;margin-bottom:6px;font-size:10pt;align-items:flex-start;}'
    +'.find-icon{font-weight:bold;min-width:14px;}'
    +'.find-text{flex:1;}'
    +'ul{list-style:none;padding-left:0;}'
    +'ul li{padding:4px 0 4px 16px;position:relative;font-size:10pt;}'
    +'ul li:before{content:"\u2192";position:absolute;left:0;color:#c9a961;font-weight:bold;}'
    +'.refs li:before{content:"\u2022";}'
    +'.refs li{font-size:9pt;color:#5a6680;}'
    +'.disclaimer{background:#f0f3f9;border-radius:4px;padding:12px 16px;margin-top:16px;font-size:8pt;color:#5a6680;line-height:1.4;page-break-inside:avoid;}'
    +'.footer{margin-top:16px;padding:8px 16px;background:#0a1f44;color:#fff;text-align:center;font-size:8pt;border-radius:4px;}'
    +'.btn-print{position:fixed;top:12px;right:12px;background:#0a1f44;color:#fff;border:none;padding:10px 20px;border-radius:6px;cursor:pointer;font-size:11pt;font-family:inherit;box-shadow:0 2px 8px rgba(0,0,0,0.2);}'
    +'.btn-print:hover{background:#142a5a;}'
    +'@media print{.btn-print{display:none !important;}body{background:#fff;}.page{max-width:100%;padding:0;}}'
    +'</style>'
    +'</head>'
    +'<body>'
    +'<button class="btn-print" onclick="window.print()">'+esc(t.downloadPdfBtn||'Download PDF')+'</button>'
    +'<div class="page">'
    +'<div class="header"><h1>Y&amp;S Accounting Brisbane</h1><p>'+esc(t.pdfTitle||'')+'</p></div>'
    +'<div class="client-box"><div class="name">'+esc(t.pdfPreparedFor||'')+': '+safeName+'</div>'
    +'<div class="info"><strong>Email:</strong> '+safeEmail+'</div>'
    +'<div class="info"><strong>'+esc(t.pdfPhone||'Phone')+':</strong> '+safePhone+'</div>'
    +'<div class="info"><strong>'+esc(t.pdfDate||'Date')+':</strong> '+esc(dateStr)+'</div>'
    +'</div>'
    +'<div class="verdict"><h2>'+esc(vTitleText)+'</h2><p>'+esc(verdict.text||'')+'</p></div>'
    +'<div class="section"><h3>'+esc(t.pdfQA||'')+'</h3>'+qaHtml+'</div>'
    +'<div class="section"><h3>'+esc(t.findingsHeader||'')+'</h3>'+findHtml+'</div>'
    +'<div class="section"><h3>'+esc(t.nextStepsHeader||'')+'</h3><ul>'+nsHtml+'</ul></div>'
    +'<div class="section refs"><h3>'+esc(t.referencesHeader||'')+'</h3><ul class="refs">'+refHtml+'</ul></div>'
    +'<div class="disclaimer">'+esc(t.pdfDisclaimer||'')+'</div>'
    +'<div class="footer">Y&amp;S Accounting Brisbane | Level 38, 71 Eagle Street, Brisbane QLD 4000 | 1300 189 682 | taxbne.com.au</div>'
    +'</div>'
    +'<script>'
    +'window.addEventListener("load",function(){setTimeout(function(){try{window.print();}catch(e){}},400);});'
    +'<\/script>'
    +'</body></html>';
  var w=window.open('','_blank','width=900,height=800');
  if(!w){alert('Please allow popups for this site to download your PDF report, then click the button again.');return;}
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
}

render();

})();
