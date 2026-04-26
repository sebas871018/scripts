/*!
 * Y&S Accounting — Australian Individual Tax Calculator
 * Multilingual: EN / ES / PT
 * Pairs with tax-calculator.html (HTML + CSS embed pasted in Webflow).
 * Host this file on GitHub and load via jsDelivr — see HTML setup comment.
 */
(function () {
  'use strict';

  /* ============================ I18N ============================ */

  var T = {
    en: {
      title:       'Australian individual tax calculator',
      subtitle:    'Fast estimate for 2025–26, 2024–25 and 2023–24. Select your occupation from the searchable list — deduction categories for your role will appear below. Add your income, deductions and tax already paid for a live tax position.',
      sec_details: 'Your details',  sec_income: 'Income',  sec_deductions: 'Deductions',
      sec_other:   'Other factors', sec_paid:   'Tax already paid',
      sec_results: 'Your estimated position', sub_results: 'Updates live as you type.',
      f_year: 'Income year', f_residency: 'Residency for tax', f_occupation: 'Occupation',
      f_wages: 'Salary & wages', f_interest: 'Interest income',
      f_business: 'Net business income', f_rental: 'Net rental income',
      f_total_income: 'Total income', f_total_deds: 'Total deductions',
      f_paygw: 'PAYG tax withheld from wages', f_instalments: 'PAYG instalments paid',
      f_total_paid: 'Total tax already paid',
      f_name: 'Your name', f_email: 'Your email',
      chk_help: 'I have a HELP / HECS debt',
      chk_medex: 'Medicare levy exemption applies',
      chk_phi: 'Private hospital cover for full year',
      h_deductions: 'Enter amounts that apply. Tap each ? for ATO guidance. Extra items may apply — we review everything when we prepare your return.',
      h_paid: 'Amounts already paid to the ATO during the year reduce your final balance — and may result in a refund.',
      h_cta: 'Email me this estimate — we’ll follow up with a link to our tax services.',
      ph_search: 'Type to search (e.g. nurse, tradie, IT)…',
      ph_combo_empty: 'No matching occupations — try a different term',
      res_resident: 'Australian resident', res_nonResident: 'Foreign resident', res_whm: 'Working Holiday Maker',
      r_income: 'Total income', r_deds: 'Less: deductions', r_ti: 'Taxable income',
      r_tax: 'Income tax', r_lito: 'Low income tax offset (LITO)',
      r_ml: 'Medicare levy', r_mls: 'Medicare levy surcharge', r_help: 'HELP / HECS repayment',
      r_total: 'Total tax payable', r_paid: 'Less: PAYG withheld & instalments',
      r_refund: 'Estimated refund', r_owing: 'Estimated amount owing',
      r_net: 'Net take-home', r_eff: 'Effective tax rate',
      btn_primary: 'Send estimate & start a tax return →',
      btn_secondary: 'Just email me the estimate',
      msg_no_name: 'Please enter your name.',
      msg_no_email: 'Please enter a valid email address.',
      msg_sending: 'Sending…',
      msg_sent: 'Sent! Check your inbox — we’ll be in touch shortly with your estimate and a link to our tax services.',
      msg_fail: 'Couldn’t send right now. Please try again or email info@taxbne.com.au.',
      msg_no_form: 'Form not found — please contact info@taxbne.com.au.',
      tip_year: 'The Australian financial year runs 1 July – 30 June. Select the year you are estimating for.',
      tip_residency: 'Australian residents are taxed on worldwide income at resident rates. Foreign residents pay non-resident rates with no tax-free threshold. Working Holiday Makers (417/462 visa) have a special rate scale.',
      tip_occupation: 'Type to search ATO occupation categories. We surface deduction items commonly claimed in your role — eligibility always depends on your specific circumstances.',
      tip_wages: 'Gross salary and wages from employers before PAYG tax withheld. Found at the top of your Income Statement / PAYG Payment Summary.',
      tip_interest: 'Total interest received from Australian banks, credit unions and term deposits during the year.',
      tip_business: 'Net profit from a sole-trader or partnership business (gross income less business expenses). Use a positive number for profit, or enter 0 if you made a loss.',
      tip_rental: 'Rental receipts less deductible rental expenses (interest, rates, repairs, depreciation, agent fees). Enter 0 if negatively geared — tax losses require advice.',
      tip_paygw: 'Total tax withheld by your employer(s) across the year, shown on your PAYG Income Statement. Include any PAYG withheld from termination or lump-sum payments.',
      tip_instalments: 'Quarterly PAYG instalments paid to the ATO for business or investment income. Visible on your activity statements or in ATO Online under "Tax » Activity statements".',
      tip_help: 'Covers HELP, HECS, VSL, SFSS and AASL (formerly TSL) study loans. Compulsory repayments apply once your repayment income exceeds the ATO threshold.',
      tip_medex: 'Full exemption applies to specific categories: prescribed foreign residents, some veterans and certain visa holders. Most taxpayers are not exempt.',
      tip_phi: 'Holding complying private hospital cover (not just extras) for the whole year exempts you from the Medicare Levy Surcharge.',
      disclaimer: 'Estimate only. Assumes a single Australian taxpayer with no dependants based on the figures entered and ATO rates at publication. It is general information and not tax advice. It does not account for capital gains, franking credits, trust distributions, Division 293, super contribution caps, offsets beyond LITO, or the full Medicare levy reduction rules. For a precise calculation specific to your circumstances, contact Y&S Accounting.'
    },
    es: {
      title:       'Calculadora de impuestos para personas físicas en Australia',
      subtitle:    'Estimación rápida para 2025–26, 2024–25 y 2023–24. Elige tu ocupación de la lista — las deducciones más comunes de tu profesión aparecerán abajo. Añade tus ingresos, deducciones e impuestos ya pagados para ver tu posición fiscal en tiempo real.',
      sec_details: 'Tus datos',     sec_income: 'Ingresos', sec_deductions: 'Deducciones',
      sec_other:   'Otros factores', sec_paid:   'Impuestos ya pagados',
      sec_results: 'Tu posición estimada', sub_results: 'Se actualiza en tiempo real.',
      f_year: 'Año fiscal', f_residency: 'Residencia fiscal', f_occupation: 'Ocupación',
      f_wages: 'Salario y sueldos', f_interest: 'Intereses',
      f_business: 'Ingresos netos por actividad', f_rental: 'Ingresos netos por alquiler',
      f_total_income: 'Ingresos totales', f_total_deds: 'Deducciones totales',
      f_paygw: 'Impuesto PAYG retenido del salario', f_instalments: 'Cuotas PAYG pagadas',
      f_total_paid: 'Total impuestos ya pagados',
      f_name: 'Tu nombre', f_email: 'Tu correo electrónico',
      chk_help: 'Tengo deuda HELP / HECS',
      chk_medex: 'Aplica exención del tributo Medicare',
      chk_phi: 'Cobertura hospitalaria privada todo el año',
      h_deductions: 'Ingresa los importes que apliquen. Toca cada ? para ver la guía de la ATO. Pueden aplicar más conceptos — los revisamos al preparar tu declaración.',
      h_paid: 'Los importes pagados a la ATO durante el año reducen tu saldo final — y pueden generar un reembolso.',
      h_cta: 'Envíame esta estimación — te enviaremos un enlace a nuestros servicios fiscales.',
      ph_search: 'Escribe para buscar (p. ej. enfermera, oficio, TI)…',
      ph_combo_empty: 'No hay ocupaciones coincidentes — prueba otro término',
      res_resident: 'Residente fiscal australiano', res_nonResident: 'Residente extranjero', res_whm: 'Visa Working Holiday',
      r_income: 'Ingresos totales', r_deds: 'Menos: deducciones', r_ti: 'Renta gravable',
      r_tax: 'Impuesto sobre la renta', r_lito: 'Bonificación por bajos ingresos (LITO)',
      r_ml: 'Tributo Medicare', r_mls: 'Recargo Medicare (MLS)', r_help: 'Pago HELP / HECS',
      r_total: 'Total impuesto a pagar', r_paid: 'Menos: PAYG retenido y cuotas',
      r_refund: 'Reembolso estimado', r_owing: 'Saldo a pagar estimado',
      r_net: 'Ingresos netos', r_eff: 'Tasa efectiva de impuestos',
      btn_primary: 'Enviar estimación e iniciar declaración →',
      btn_secondary: 'Solo enviarme la estimación por correo',
      msg_no_name: 'Por favor, ingresa tu nombre.',
      msg_no_email: 'Por favor, ingresa un correo electrónico válido.',
      msg_sending: 'Enviando…',
      msg_sent: '¡Enviado! Revisa tu bandeja de entrada — te contactaremos pronto con tu estimación y un enlace a nuestros servicios fiscales.',
      msg_fail: 'No se pudo enviar ahora. Inténtalo de nuevo o escribe a info@taxbne.com.au.',
      msg_no_form: 'No se encontró el formulario — escríbenos a info@taxbne.com.au.',
      tip_year: 'El año fiscal australiano va del 1 de julio al 30 de junio. Selecciona el año que quieres estimar.',
      tip_residency: 'Los residentes fiscales australianos tributan sobre ingresos mundiales a tasas de residente. Los residentes extranjeros pagan tasas de no residente sin franja libre. Los titulares de visa Working Holiday (417/462) tienen una escala especial.',
      tip_occupation: 'Escribe para buscar entre las categorías de ocupación de la ATO. Mostramos los conceptos de deducción más comunes en tu rol — la elegibilidad siempre depende de tus circunstancias.',
      tip_wages: 'Salario bruto antes de la retención PAYG. Aparece al inicio de tu Income Statement / PAYG Payment Summary.',
      tip_interest: 'Total de intereses recibidos de bancos, cooperativas y depósitos a plazo en Australia durante el año.',
      tip_business: 'Beneficio neto como autónomo o sociedad (ingresos menos gastos del negocio). Usa un valor positivo si hay beneficio, o 0 si tuviste pérdidas.',
      tip_rental: 'Ingresos por alquiler menos gastos deducibles (intereses, impuestos municipales, reparaciones, depreciación, comisiones). Ingresa 0 si está negativamente apalancado — las pérdidas requieren asesoría.',
      tip_paygw: 'Total del impuesto retenido por tu(s) empleador(es) durante el año, indicado en tu PAYG Income Statement. Incluye PAYG retenido en pagos por terminación o sumas globales.',
      tip_instalments: 'Cuotas trimestrales PAYG pagadas a la ATO por ingresos de negocios o inversiones. Visibles en tus activity statements o en ATO Online en "Tax » Activity statements".',
      tip_help: 'Incluye préstamos HELP, HECS, VSL, SFSS y AASL (antes TSL). Los pagos obligatorios aplican cuando tus ingresos de pago superan el umbral de la ATO.',
      tip_medex: 'La exención total aplica a categorías específicas: ciertos residentes extranjeros prescritos, algunos veteranos y titulares de visados específicos. La mayoría de los contribuyentes no están exentos.',
      tip_phi: 'Tener cobertura hospitalaria privada que cumpla los requisitos (no solo extras) durante todo el año te exime del Medicare Levy Surcharge.',
      disclaimer: 'Solo estimación. Asume un contribuyente australiano soltero sin dependientes basado en las cifras ingresadas y las tasas vigentes de la ATO. Es información general y no constituye asesoría fiscal. No considera ganancias de capital, créditos de imputación (franking), distribuciones de fideicomisos, División 293, topes de aportes a superannuation, bonificaciones más allá de LITO, ni las reglas completas de reducción del tributo Medicare. Para un cálculo preciso según tus circunstancias, contacta a Y&S Accounting.'
    },
    pt: {
      title:       'Calculadora de imposto de renda para pessoas físicas na Austrália',
      subtitle:    'Estimativa rápida para 2025–26, 2024–25 e 2023–24. Selecione sua ocupação na lista — as deduções mais comuns da sua profissão aparecerão abaixo. Adicione sua renda, deduções e impostos já pagos para ver sua posição fiscal em tempo real.',
      sec_details: 'Seus dados', sec_income: 'Rendimentos', sec_deductions: 'Deduções',
      sec_other:   'Outros fatores', sec_paid: 'Imposto já pago',
      sec_results: 'Sua posição estimada', sub_results: 'Atualiza em tempo real.',
      f_year: 'Ano fiscal', f_residency: 'Residência fiscal', f_occupation: 'Ocupação',
      f_wages: 'Salário e ordenados', f_interest: 'Juros recebidos',
      f_business: 'Renda líquida de negócios', f_rental: 'Renda líquida de aluguel',
      f_total_income: 'Renda total', f_total_deds: 'Deduções totais',
      f_paygw: 'PAYG retido do salário', f_instalments: 'Parcelas PAYG pagas',
      f_total_paid: 'Total imposto já pago',
      f_name: 'Seu nome', f_email: 'Seu email',
      chk_help: 'Tenho dívida HELP / HECS',
      chk_medex: 'Aplica isenção da contribuição Medicare',
      chk_phi: 'Plano de saúde hospitalar privado o ano todo',
      h_deductions: 'Informe os valores que se aplicam. Toque em cada ? para ver as orientações da ATO. Outros itens podem se aplicar — analisamos tudo ao preparar sua declaração.',
      h_paid: 'Os valores pagos à ATO durante o ano reduzem seu saldo final — e podem gerar uma restituição.',
      h_cta: 'Envie-me esta estimativa — entraremos em contato com o link para nossos serviços fiscais.',
      ph_search: 'Digite para pesquisar (ex. enfermeira, técnico, TI)…',
      ph_combo_empty: 'Nenhuma ocupação encontrada — tente outro termo',
      res_resident: 'Residente fiscal australiano', res_nonResident: 'Residente estrangeiro', res_whm: 'Visto Working Holiday',
      r_income: 'Renda total', r_deds: 'Menos: deduções', r_ti: 'Renda tributável',
      r_tax: 'Imposto sobre a renda', r_lito: 'Crédito para baixa renda (LITO)',
      r_ml: 'Contribuição Medicare', r_mls: 'Sobretaxa Medicare (MLS)', r_help: 'Pagamento HELP / HECS',
      r_total: 'Total imposto a pagar', r_paid: 'Menos: PAYG retido e parcelas',
      r_refund: 'Restituição estimada', r_owing: 'Saldo a pagar estimado',
      r_net: 'Renda líquida', r_eff: 'Alíquota efetiva',
      btn_primary: 'Enviar estimativa e iniciar declaração →',
      btn_secondary: 'Só enviar a estimativa por email',
      msg_no_name: 'Por favor, digite seu nome.',
      msg_no_email: 'Por favor, digite um email válido.',
      msg_sending: 'Enviando…',
      msg_sent: 'Enviado! Verifique sua caixa de entrada — entraremos em contato em breve com sua estimativa e o link para nossos serviços fiscais.',
      msg_fail: 'Não foi possível enviar agora. Tente novamente ou escreva para info@taxbne.com.au.',
      msg_no_form: 'Formulário não encontrado — escreva para info@taxbne.com.au.',
      tip_year: 'O ano fiscal australiano vai de 1 de julho a 30 de junho. Selecione o ano que deseja estimar.',
      tip_residency: 'Residentes fiscais australianos são tributados sobre rendimentos mundiais nas alíquotas de residente. Residentes estrangeiros pagam alíquotas de não residente sem faixa isenta. Titulares de visto Working Holiday (417/462) seguem uma tabela especial.',
      tip_occupation: 'Digite para pesquisar nas categorias de ocupação da ATO. Apresentamos as deduções mais comuns na sua profissão — a elegibilidade sempre depende das suas circunstâncias.',
      tip_wages: 'Salário bruto de empregadores antes da retenção PAYG. Aparece no topo do seu Income Statement / PAYG Payment Summary.',
      tip_interest: 'Total de juros recebidos de bancos, cooperativas e aplicações a prazo na Austrália durante o ano.',
      tip_business: 'Lucro líquido como autônomo ou sociedade (receitas menos despesas do negócio). Use um valor positivo para lucro, ou 0 se teve prejuízo.',
      tip_rental: 'Receitas de aluguel menos despesas dedutíveis (juros, taxas, reparos, depreciação, comissão de imobiliária). Informe 0 se está negativamente alavancado — perdas tributárias exigem orientação.',
      tip_paygw: 'Total de imposto retido pelo(s) seu(s) empregador(es) durante o ano, mostrado no seu PAYG Income Statement. Inclua PAYG retido em pagamentos de rescisão ou montantes únicos.',
      tip_instalments: 'Parcelas trimestrais PAYG pagas à ATO sobre renda de negócios ou investimentos. Visíveis nos seus activity statements ou no ATO Online em "Tax » Activity statements".',
      tip_help: 'Cobre HELP, HECS, VSL, SFSS e AASL (antigo TSL). Pagamentos compulsórios aplicam-se quando sua renda de pagamento ultrapassa o limiar da ATO.',
      tip_medex: 'A isenção total aplica-se a categorias específicas: certos residentes estrangeiros prescritos, alguns veteranos e titulares de vistos específicos. A maioria dos contribuintes não é isenta.',
      tip_phi: 'Manter plano de saúde hospitalar privado em conformidade (não apenas extras) durante todo o ano isenta-o da Sobretaxa Medicare (MLS).',
      disclaimer: 'Apenas estimativa. Considera um contribuinte australiano solteiro sem dependentes com base nos valores informados e nas alíquotas vigentes da ATO. É informação geral e não constitui assessoria fiscal. Não considera ganhos de capital, créditos de franking, distribuições de trusts, Divisão 293, limites de superannuation, créditos além do LITO, nem as regras completas de redução da contribuição Medicare. Para um cálculo preciso conforme suas circunstâncias, contate a Y&S Accounting.'
    }
  };

  var lang = (function () {
    try {
      var saved = localStorage.getItem('ystc-lang');
      if (saved && T[saved]) return saved;
    } catch (e) {}
    var b = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return T[b] ? b : 'en';
  })();

  function t(key) { return (T[lang] && T[lang][key]) || T.en[key] || key; }

  /* ============================ TAX DATA ============================ */

  var TAX_DATA = {
    '2025-26': {
      brackets: {
        resident: [
          { lower: 0, rate: 0, base: 0 }, { lower: 18200, rate: 0.16, base: 0 },
          { lower: 45000, rate: 0.30, base: 4288 }, { lower: 135000, rate: 0.37, base: 31288 },
          { lower: 190000, rate: 0.45, base: 51638 }
        ],
        nonResident: [
          { lower: 0, rate: 0.30, base: 0 }, { lower: 135000, rate: 0.37, base: 40500 },
          { lower: 190000, rate: 0.45, base: 60850 }
        ],
        whm: [
          { lower: 0, rate: 0.15, base: 0 }, { lower: 45000, rate: 0.30, base: 6750 },
          { lower: 135000, rate: 0.37, base: 33750 }, { lower: 190000, rate: 0.45, base: 54100 }
        ]
      },
      medicareLevy: { lower: 27222, upper: 34027 },
      mls: [{ lower: 97001, rate: 0.01 }, { lower: 113001, rate: 0.0125 }, { lower: 151001, rate: 0.015 }],
      help: 'new'
    },
    '2024-25': {
      brackets: {
        resident: [
          { lower: 0, rate: 0, base: 0 }, { lower: 18200, rate: 0.16, base: 0 },
          { lower: 45000, rate: 0.30, base: 4288 }, { lower: 135000, rate: 0.37, base: 31288 },
          { lower: 190000, rate: 0.45, base: 51638 }
        ],
        nonResident: [
          { lower: 0, rate: 0.30, base: 0 }, { lower: 135000, rate: 0.37, base: 40500 },
          { lower: 190000, rate: 0.45, base: 60850 }
        ],
        whm: [
          { lower: 0, rate: 0.15, base: 0 }, { lower: 45000, rate: 0.30, base: 6750 },
          { lower: 135000, rate: 0.37, base: 33750 }, { lower: 190000, rate: 0.45, base: 54100 }
        ]
      },
      medicareLevy: { lower: 27222, upper: 34027 },
      mls: [{ lower: 97001, rate: 0.01 }, { lower: 113001, rate: 0.0125 }, { lower: 151001, rate: 0.015 }],
      help: '2024-25'
    },
    '2023-24': {
      brackets: {
        resident: [
          { lower: 0, rate: 0, base: 0 }, { lower: 18200, rate: 0.19, base: 0 },
          { lower: 45000, rate: 0.325, base: 5092 }, { lower: 120000, rate: 0.37, base: 29467 },
          { lower: 180000, rate: 0.45, base: 51667 }
        ],
        nonResident: [
          { lower: 0, rate: 0.325, base: 0 }, { lower: 120000, rate: 0.37, base: 39000 },
          { lower: 180000, rate: 0.45, base: 61200 }
        ],
        whm: [
          { lower: 0, rate: 0.15, base: 0 }, { lower: 45000, rate: 0.325, base: 6750 },
          { lower: 120000, rate: 0.37, base: 31125 }, { lower: 180000, rate: 0.45, base: 53325 }
        ]
      },
      medicareLevy: { lower: 26000, upper: 32500 },
      mls: [{ lower: 93001, rate: 0.01 }, { lower: 108001, rate: 0.0125 }, { lower: 144001, rate: 0.015 }],
      help: '2023-24'
    }
  };

  var HELP_TABLES = {
    '2023-24': [
      {lower:0,rate:0},{lower:51550,rate:0.01},{lower:59519,rate:0.02},{lower:63090,rate:0.025},
      {lower:66876,rate:0.03},{lower:70889,rate:0.035},{lower:75141,rate:0.04},{lower:79650,rate:0.045},
      {lower:84430,rate:0.05},{lower:89495,rate:0.055},{lower:94866,rate:0.06},{lower:100558,rate:0.065},
      {lower:106591,rate:0.07},{lower:112986,rate:0.075},{lower:119765,rate:0.08},{lower:126951,rate:0.085},
      {lower:134569,rate:0.09},{lower:142643,rate:0.095},{lower:151201,rate:0.10}
    ],
    '2024-25': [
      {lower:0,rate:0},{lower:54435,rate:0.01},{lower:62851,rate:0.02},{lower:66621,rate:0.025},
      {lower:70619,rate:0.03},{lower:74856,rate:0.035},{lower:79347,rate:0.04},{lower:84108,rate:0.045},
      {lower:89155,rate:0.05},{lower:94504,rate:0.055},{lower:100175,rate:0.06},{lower:106186,rate:0.065},
      {lower:112557,rate:0.07},{lower:119310,rate:0.075},{lower:126468,rate:0.08},{lower:134057,rate:0.085},
      {lower:142101,rate:0.09},{lower:150627,rate:0.095},{lower:159664,rate:0.10}
    ]
  };

  /* ============================ OCCUPATIONS ============================ */

  var OCCUPATIONS = [
    { key: 'accountant', extras: ['cpd','tpb','cpa_fees','journals'],
      label: { en: 'Accounting / finance professional', es: 'Contabilidad / finanzas', pt: 'Contabilidade / finanças' } },
    { key: 'adult_industry', extras: ['uniform','ppe','self_education'],
      label: { en: 'Adult industry worker', es: 'Trabajador/a de la industria adulta', pt: 'Trabalhador da indústria adulta' } },
    { key: 'agricultural', extras: ['ppe','sunscreen','tools','uniform'],
      label: { en: 'Agricultural / farm worker', es: 'Trabajador/a agrícola', pt: 'Trabalhador agrícola' } },
    { key: 'apprentice', extras: ['tools','ppe','self_education'],
      label: { en: 'Apprentice or trainee', es: 'Aprendiz o practicante', pt: 'Aprendiz ou estagiário' } },
    { key: 'adf', extras: ['uniform','fitness','prof_dev'],
      label: { en: 'Australian Defence Force member', es: 'Miembro de las Fuerzas de Defensa', pt: 'Membro das Forças de Defesa Australianas' } },
    { key: 'construction', extras: ['tools','ppe','uniform','sunscreen'],
      label: { en: 'Building / construction worker', es: 'Trabajador/a de construcción', pt: 'Trabalhador da construção civil' } },
    { key: 'bus', extras: ['license','uniform','sunscreen'],
      label: { en: 'Bus driver', es: 'Conductor/a de autobús', pt: 'Motorista de ônibus' } },
    { key: 'callcentre', extras: ['prof_dev','office_supplies'],
      label: { en: 'Call centre operator', es: 'Operador/a de call center', pt: 'Operador de call center' } },
    { key: 'cleaner', extras: ['ppe','uniform','sunscreen'],
      label: { en: 'Cleaner', es: 'Personal de limpieza', pt: 'Profissional de limpeza' } },
    { key: 'community', extras: ['uniform','ppe','self_education'],
      label: { en: 'Community / disability support worker', es: 'Trabajador/a de apoyo comunitario', pt: 'Trabalhador de apoio comunitário' } },
    { key: 'contractor', extras: ['insurance','software','tools','laptop'],
      label: { en: 'Contractor / sole trader', es: 'Contratista / autónomo', pt: 'Contratante / autônomo' } },
    { key: 'medical', extras: ['ahpra','cpd','indemnity_insurance','medical_journals','equipment'],
      label: { en: 'Doctor / medical specialist', es: 'Médico/a / especialista', pt: 'Médico/a / especialista' } },
    { key: 'engineer', extras: ['prof_dev','software','conferences','hardware'],
      label: { en: 'Engineer', es: 'Ingeniero/a', pt: 'Engenheiro/a' } },
    { key: 'factory', extras: ['ppe','uniform','tools'],
      label: { en: 'Factory / production worker', es: 'Trabajador/a de fábrica', pt: 'Trabalhador de fábrica' } },
    { key: 'firefighter', extras: ['uniform','fitness','prof_dev'],
      label: { en: 'Firefighter', es: 'Bombero/a', pt: 'Bombeiro/a' } },
    { key: 'fitness_ind', extras: ['uniform','prof_dev','equipment'],
      label: { en: 'Fitness / sporting industry employee', es: 'Industria del fitness / deportiva', pt: 'Indústria fitness / esportiva' } },
    { key: 'flight', extras: ['uniform','self_education','prof_dev'],
      label: { en: 'Flight attendant', es: 'Auxiliar de vuelo', pt: 'Comissário/a de bordo' } },
    { key: 'gaming', extras: ['uniform','rsa','training'],
      label: { en: 'Gaming attendant', es: 'Empleado/a de casino', pt: 'Atendente de cassino' } },
    { key: 'guards', extras: ['uniform','license','prof_dev'],
      label: { en: 'Guard / security officer', es: 'Guardia / agente de seguridad', pt: 'Vigilante / agente de segurança' } },
    { key: 'beauty', extras: ['tools','uniform','training'],
      label: { en: 'Hairdresser / beauty therapist', es: 'Peluquero/a / esteticista', pt: 'Cabeleireiro/a / esteticista' } },
    { key: 'hospitality', extras: ['uniform','rsa','training'],
      label: { en: 'Hospitality / food service worker', es: 'Hostelería / servicio de comida', pt: 'Hotelaria / serviço de alimentação' } },
    { key: 'it', extras: ['software','hardware','conferences','prof_dev'],
      label: { en: 'IT / technology professional', es: 'Profesional de TI / tecnología', pt: 'Profissional de TI / tecnologia' } },
    { key: 'lawyer', extras: ['cpd','practice_cert','legal_pubs'],
      label: { en: 'Lawyer / legal professional', es: 'Abogado/a / profesional jurídico', pt: 'Advogado/a / profissional jurídico' } },
    { key: 'meat', extras: ['ppe','uniform','tools'],
      label: { en: 'Meat / food processing worker', es: 'Trabajador/a procesamiento de carne / alimentos', pt: 'Trabalhador de processamento de carne / alimentos' } },
    { key: 'media', extras: ['prof_dev','equipment'],
      label: { en: 'Media / journalism professional', es: 'Profesional de medios / periodismo', pt: 'Profissional de mídia / jornalismo' } },
    { key: 'mining', extras: ['ppe','uniform','sunscreen','prof_dev'],
      label: { en: 'Mining site employee', es: 'Empleado/a de minería', pt: 'Trabalhador de mineração' } },
    { key: 'nurse', extras: ['uniform','ahpra','cpd','stethoscope','prof_dev'],
      label: { en: 'Nurse / midwife', es: 'Enfermero/a / matrona', pt: 'Enfermeiro/a / parteira' } },
    { key: 'general', extras: ['office_supplies','prof_dev'],
      label: { en: 'Office / administration worker', es: 'Oficina / administración', pt: 'Escritório / administração' } },
    { key: 'paramedic', extras: ['uniform','ahpra','cpd','equipment'],
      label: { en: 'Paramedic', es: 'Paramédico/a', pt: 'Paramédico/a' } },
    { key: 'performing', extras: ['prof_dev','tools','uniform'],
      label: { en: 'Performing artist', es: 'Artista escénico/a', pt: 'Artista cênico/a' } },
    { key: 'pilot', extras: ['uniform','license','prof_dev'],
      label: { en: 'Pilot', es: 'Piloto', pt: 'Piloto' } },
    { key: 'police', extras: ['uniform','fitness','prof_dev','equipment'],
      label: { en: 'Police officer', es: 'Agente de policía', pt: 'Policial' } },
    { key: 'sportsperson', extras: ['prof_dev','equipment','fitness'],
      label: { en: 'Professional sportsperson', es: 'Deportista profesional', pt: 'Atleta profissional' } },
    { key: 'realestate', extras: ['advertising','license','prof_dev'],
      label: { en: 'Real estate agent', es: 'Agente inmobiliario', pt: 'Corretor de imóveis' } },
    { key: 'recruitment', extras: ['prof_dev','client_meals'],
      label: { en: 'Recruitment consultant', es: 'Consultor/a de selección', pt: 'Consultor de recrutamento' } },
    { key: 'retail', extras: ['uniform','training'],
      label: { en: 'Retail worker', es: 'Empleado/a de comercio', pt: 'Trabalhador de varejo' } },
    { key: 'sales', extras: ['client_meals','laptop','prof_dev'],
      label: { en: 'Sales representative', es: 'Representante de ventas', pt: 'Representante de vendas' } },
    { key: 'teacher', extras: ['teaching_materials','excursions','first_aid','prof_dev'],
      label: { en: 'Teacher / educator', es: 'Profesor/a / educador/a', pt: 'Professor/a / educador/a' } },
    { key: 'tradie', extras: ['tools','ppe','uniform','sunscreen'],
      label: { en: 'Tradesperson', es: 'Oficio / trabajador especializado', pt: 'Profissional de ofício / técnico' } },
    { key: 'train', extras: ['uniform','license','prof_dev'],
      label: { en: 'Train driver', es: 'Maquinista de tren', pt: 'Maquinista de trem' } },
    { key: 'travel', extras: ['prof_dev','software'],
      label: { en: 'Travel agent', es: 'Agente de viajes', pt: 'Agente de viagens' } },
    { key: 'truckdriver', extras: ['overnight_meals','truck_supplies','sunscreen'],
      label: { en: 'Truck driver', es: 'Camionero/a', pt: 'Caminhoneiro/a' } },
    { key: 'other', extras: [],
      label: { en: 'Other occupation', es: 'Otra ocupación', pt: 'Outra ocupação' } }
  ];

  var CORE_DEDUCTIONS = ['wfh','vehicle','phone','union','self_education','donations','taxagent','income_protect'];

  var DEDUCTION_CATALOG = {
    wfh: {
      label: { en: 'Working from home', es: 'Trabajo desde casa', pt: 'Trabalho em casa' },
      hint:  { en: 'Electricity, internet, phone, consumables for work-use portion. Fixed rate 70c/hr (from 2024-25) or actual cost method — keep a 4-week diary.',
               es: 'Electricidad, internet, teléfono y consumibles para la parte de uso laboral. Tarifa fija de 70c/h (desde 2024-25) o método de coste real — lleva un registro de 4 semanas.',
               pt: 'Eletricidade, internet, telefone e consumíveis na proporção de uso para trabalho. Tarifa fixa de 70c/h (a partir de 2024-25) ou método de custo real — mantenha um diário de 4 semanas.' }
    },
    vehicle: {
      label: { en: 'Work-related car / travel', es: 'Coche / viajes laborales', pt: 'Carro / viagens de trabalho' },
      hint:  { en: 'Excludes home-to-work commuting. Cents-per-km method (up to 5,000km) or logbook method with fuel, rego, insurance, depreciation.',
               es: 'No incluye desplazamientos casa–trabajo. Método de céntimos por km (hasta 5.000 km) o método de bitácora con combustible, matrícula, seguro y depreciación.',
               pt: 'Não inclui deslocamento casa–trabalho. Método de centavos por km (até 5.000 km) ou método de logbook com combustível, licenciamento, seguro e depreciação.' }
    },
    phone: {
      label: { en: 'Phone & internet (work %)', es: 'Teléfono e internet (% laboral)', pt: 'Telefone e internet (% trabalho)' },
      hint:  { en: 'Work-use percentage of your mobile and home internet bills. Keep a 4-week record supporting the percentage claimed.',
               es: 'Porcentaje de uso laboral de tus facturas de móvil e internet. Lleva un registro de 4 semanas que respalde el porcentaje declarado.',
               pt: 'Percentual de uso para trabalho das suas contas de celular e internet. Mantenha um registro de 4 semanas que justifique o percentual declarado.' }
    },
    union: {
      label: { en: 'Union & professional fees', es: 'Cuotas sindicales y profesionales', pt: 'Sindicato e taxas profissionais' },
      hint:  { en: 'Union dues and industry body membership fees paid in your role.',
               es: 'Cuotas sindicales y de asociaciones profesionales pagadas por tu rol.',
               pt: 'Mensalidades sindicais e taxas de associações profissionais pagas pela sua função.' }
    },
    self_education: {
      label: { en: 'Self-education', es: 'Formación profesional', pt: 'Educação profissional' },
      hint:  { en: 'Course fees, textbooks, stationery, travel — must have a sufficient connection to your current income-earning activities.',
               es: 'Matrícula, libros, materiales y viajes — debe haber conexión suficiente con tu actividad generadora de ingresos actual.',
               pt: 'Matrícula, livros, materiais e viagens — deve ter conexão suficiente com sua atividade geradora de renda atual.' }
    },
    donations: {
      label: { en: 'Donations (DGR charities)', es: 'Donaciones (entidades DGR)', pt: 'Doações (entidades DGR)' },
      hint:  { en: 'Gifts of $2 or more to Deductible Gift Recipient charities. Keep receipts.',
               es: 'Donaciones de $2 o más a entidades benéficas con estatus DGR. Conserva los recibos.',
               pt: 'Doações de $2 ou mais a instituições com status DGR. Guarde os recibos.' }
    },
    taxagent: {
      label: { en: 'Tax agent fees', es: 'Honorarios del asesor fiscal', pt: 'Honorários do contador fiscal' },
      hint:  { en: 'Fees paid last year to a registered tax agent to prepare and lodge your return.',
               es: 'Honorarios pagados el año pasado a un asesor fiscal registrado para preparar y presentar tu declaración.',
               pt: 'Honorários pagos no ano passado a um contador fiscal registrado para preparar e apresentar sua declaração.' }
    },
    income_protect: {
      label: { en: 'Income protection insurance', es: 'Seguro de protección de ingresos', pt: 'Seguro de proteção de renda' },
      hint:  { en: 'Premiums for income protection held outside superannuation. Life/TPD inside super is not deductible here.',
               es: 'Primas de protección de ingresos contratadas fuera de superannuation. Vida/TPD dentro de super no son deducibles aquí.',
               pt: 'Prêmios de proteção de renda contratados fora do superannuation. Vida/TPD dentro do super não são dedutíveis aqui.' }
    },

    uniform: {
      label: { en: 'Uniform / protective clothing', es: 'Uniforme / ropa de protección', pt: 'Uniforme / roupa de proteção' },
      hint:  { en: 'Compulsory, registered or occupation-specific protective clothing (not conventional clothing). Laundry of eligible clothing deductible.',
               es: 'Ropa de protección obligatoria, registrada o específica de la ocupación (no ropa convencional). El lavado de ropa elegible es deducible.',
               pt: 'Roupa de proteção obrigatória, registrada ou específica da ocupação (não roupas comuns). A lavagem de roupas elegíveis é dedutível.' }
    },
    tools: {
      label: { en: 'Tools & equipment', es: 'Herramientas y equipo', pt: 'Ferramentas e equipamentos' },
      hint:  { en: 'Each item under $300 is immediately deductible; over $300 is depreciated over its effective life.',
               es: 'Los artículos de menos de $300 son deducibles de inmediato; los de más de $300 se deprecian durante su vida útil.',
               pt: 'Cada item abaixo de $300 é dedutível imediatamente; acima de $300 é depreciado pela sua vida útil.' }
    },
    ppe: {
      label: { en: 'PPE (boots, gloves, goggles)', es: 'EPI (botas, guantes, gafas)', pt: 'EPI (botas, luvas, óculos)' },
      hint:  { en: 'Protective personal equipment required for safe performance of your work.',
               es: 'Equipo de protección personal necesario para realizar tu trabajo con seguridad.',
               pt: 'Equipamento de proteção individual necessário para o desempenho seguro do seu trabalho.' }
    },
    sunscreen: {
      label: { en: 'Sun protection', es: 'Protección solar', pt: 'Proteção solar' },
      hint:  { en: 'Sunscreen, sunglasses, hats — for outdoor workers exposed to the sun.',
               es: 'Protector solar, gafas y sombreros — para trabajadores al aire libre expuestos al sol.',
               pt: 'Protetor solar, óculos e chapéus — para trabalhadores ao ar livre expostos ao sol.' }
    },
    teaching_materials: {
      label: { en: 'Teaching materials', es: 'Material didáctico', pt: 'Material didático' },
      hint:  { en: 'Books, stationery, supplies and resources purchased for your classes or students.',
               es: 'Libros, materiales y recursos adquiridos para tus clases o alumnos.',
               pt: 'Livros, materiais e recursos comprados para suas aulas ou alunos.' }
    },
    excursions: {
      label: { en: 'Excursions / camps', es: 'Excursiones / campamentos', pt: 'Excursões / acampamentos' },
      hint:  { en: 'Personal share of costs of school-authorised excursions and camps where you accompany students.',
               es: 'Parte personal de los costes de excursiones y campamentos autorizados por la escuela en los que acompañas a alumnos.',
               pt: 'Parcela pessoal dos custos de excursões e acampamentos autorizados pela escola em que você acompanha alunos.' }
    },
    first_aid: {
      label: { en: 'First aid training', es: 'Formación en primeros auxilios', pt: 'Treinamento em primeiros socorros' },
      hint:  { en: 'Deductible if first-aid qualifications are required by your employer.',
               es: 'Deducible si tu empleador exige cualificaciones de primeros auxilios.',
               pt: 'Dedutível se o seu empregador exige qualificação em primeiros socorros.' }
    },
    ahpra: {
      label: { en: 'AHPRA registration', es: 'Inscripción AHPRA', pt: 'Registro AHPRA' },
      hint:  { en: 'Annual Australian Health Practitioner Regulation Agency registration fee.',
               es: 'Tasa anual de inscripción de la Australian Health Practitioner Regulation Agency.',
               pt: 'Taxa anual de registro da Australian Health Practitioner Regulation Agency.' }
    },
    cpd: {
      label: { en: 'CPD / professional development', es: 'CPD / desarrollo profesional', pt: 'CPD / desenvolvimento profissional' },
      hint:  { en: 'Continuing professional development courses, workshops and registration fees required for your role.',
               es: 'Cursos de desarrollo profesional continuo, talleres y tasas de inscripción exigidos por tu rol.',
               pt: 'Cursos de desenvolvimento profissional contínuo, oficinas e taxas de inscrição exigidos pela sua função.' }
    },
    stethoscope: {
      label: { en: 'Medical / nursing equipment', es: 'Equipo médico / de enfermería', pt: 'Equipamento médico / de enfermagem' },
      hint:  { en: 'Stethoscope, fob watch, nursing scissors, penlight and other equipment used in your duties.',
               es: 'Estetoscopio, reloj de bolsillo, tijeras de enfermería, linterna y otro equipo usado en tu actividad.',
               pt: 'Estetoscópio, relógio de bolso, tesouras, lanterna e outros equipamentos usados nas suas funções.' }
    },
    software: {
      label: { en: 'Software / subscriptions', es: 'Software / suscripciones', pt: 'Software / assinaturas' },
      hint:  { en: 'Paid software, SaaS subscriptions and cloud services used for work.',
               es: 'Software de pago, suscripciones SaaS y servicios en la nube utilizados para el trabajo.',
               pt: 'Softwares pagos, assinaturas SaaS e serviços em nuvem utilizados para trabalho.' }
    },
    hardware: {
      label: { en: 'Computer equipment', es: 'Equipo informático', pt: 'Equipamento de informática' },
      hint:  { en: 'Work-use portion of computers, monitors and peripherals. Items over $300 are depreciated.',
               es: 'Parte de uso laboral de ordenadores, monitores y periféricos. Los artículos de más de $300 se deprecian.',
               pt: 'Parcela de uso para trabalho de computadores, monitores e periféricos. Itens acima de $300 são depreciados.' }
    },
    conferences: {
      label: { en: 'Conferences / events', es: 'Congresos / eventos', pt: 'Congressos / eventos' },
      hint:  { en: 'Registration, travel and accommodation for work-related events and conferences.',
               es: 'Inscripción, viaje y alojamiento para eventos y congresos relacionados con el trabajo.',
               pt: 'Inscrição, viagem e hospedagem para eventos e congressos relacionados ao trabalho.' }
    },
    prof_dev: {
      label: { en: 'Professional development', es: 'Desarrollo profesional', pt: 'Desenvolvimento profissional' },
      hint:  { en: 'Short courses, training and learning related to your current role.',
               es: 'Cursos cortos, formación y aprendizaje relacionado con tu rol actual.',
               pt: 'Cursos curtos, treinamentos e aprendizagem relacionados à sua função atual.' }
    },
    office_supplies: {
      label: { en: 'Office supplies / stationery', es: 'Material de oficina / papelería', pt: 'Material de escritório / papelaria' },
      hint:  { en: 'Pens, paper, printer ink, diaries and other stationery used for work.',
               es: 'Bolígrafos, papel, tinta, agendas y otra papelería utilizada para el trabajo.',
               pt: 'Canetas, papel, tinta, agendas e outros materiais usados para trabalho.' }
    },
    advertising: {
      label: { en: 'Advertising & marketing', es: 'Publicidad y marketing', pt: 'Publicidade e marketing' },
      hint:  { en: 'Self-promotion costs such as flyers, business cards and online ads (common for real estate agents and reps).',
               es: 'Gastos de autopromoción como folletos, tarjetas y anuncios online (comunes en agentes inmobiliarios y representantes).',
               pt: 'Custos de auto-promoção como panfletos, cartões e anúncios online (comuns em corretores e representantes).' }
    },
    license: {
      label: { en: 'Licence & registration fees', es: 'Licencias y tasas de inscripción', pt: 'Licenças e taxas de registro' },
      hint:  { en: 'Occupational licence renewal fees required to perform your role.',
               es: 'Tasas de renovación de licencias profesionales necesarias para ejercer tu rol.',
               pt: 'Taxas de renovação de licenças profissionais exigidas para exercer sua função.' }
    },
    overnight_meals: {
      label: { en: 'Overnight travel / meals', es: 'Viajes con pernocta / comidas', pt: 'Viagens com pernoite / refeições' },
      hint:  { en: 'Reasonable meal and incidental amounts for long-distance truck drivers per ATO TD (2024-25) rates — substantiation rules apply.',
               es: 'Importes razonables de comida e incidentales para camioneros de larga distancia según la TD (2024-25) de la ATO — aplican reglas de comprobación.',
               pt: 'Valores razoáveis de refeição e incidentais para caminhoneiros de longa distância conforme a TD (2024-25) da ATO — regras de comprovação aplicam-se.' }
    },
    truck_supplies: {
      label: { en: 'Truck cleaning & supplies', es: 'Limpieza y suministros del camión', pt: 'Limpeza e suprimentos do caminhão' },
      hint:  { en: 'Cleaning products, lubricants, CB radio and other truck-related consumables.',
               es: 'Productos de limpieza, lubricantes, radio CB y otros consumibles del camión.',
               pt: 'Produtos de limpeza, lubrificantes, rádio CB e outros consumíveis do caminhão.' }
    },
    rsa: {
      label: { en: 'RSA / industry certificates', es: 'RSA / certificados sectoriales', pt: 'RSA / certificados do setor' },
      hint:  { en: 'Responsible Service of Alcohol, RSG and other industry-required certificates.',
               es: 'Responsible Service of Alcohol, RSG y otros certificados exigidos por el sector.',
               pt: 'Responsible Service of Alcohol, RSG e outros certificados exigidos pelo setor.' }
    },
    training: {
      label: { en: 'Role-specific training', es: 'Formación específica del puesto', pt: 'Treinamento específico da função' },
      hint:  { en: 'Training required by your employer or industry to perform your role.',
               es: 'Formación exigida por tu empleador o sector para desempeñar tu rol.',
               pt: 'Treinamento exigido pelo seu empregador ou setor para desempenhar sua função.' }
    },
    insurance: {
      label: { en: 'Professional indemnity', es: 'Responsabilidad civil profesional', pt: 'Responsabilidade civil profissional' },
      hint:  { en: 'Professional indemnity / public liability insurance premiums for contractors and sole traders.',
               es: 'Primas de seguro de responsabilidad civil profesional / pública para contratistas y autónomos.',
               pt: 'Prêmios de seguro de responsabilidade civil profissional / pública para contratantes e autônomos.' }
    },
    practice_cert: {
      label: { en: 'Practising certificate', es: 'Certificado para ejercer', pt: 'Certificado de exercício profissional' },
      hint:  { en: 'Annual practising certificate and admission fees for legal practitioners.',
               es: 'Certificado anual y tasas de admisión para abogados.',
               pt: 'Certificado anual e taxas de admissão para advogados.' }
    },
    legal_pubs: {
      label: { en: 'Legal publications', es: 'Publicaciones jurídicas', pt: 'Publicações jurídicas' },
      hint:  { en: 'Subscriptions to law reports, journals and research services.',
               es: 'Suscripciones a repertorios jurídicos, revistas y servicios de investigación.',
               pt: 'Assinaturas de repertórios jurídicos, revistas e serviços de pesquisa.' }
    },
    tpb: {
      label: { en: 'TPB registration fees', es: 'Tasas de inscripción TPB', pt: 'Taxas de registro TPB' },
      hint:  { en: 'Tax Practitioners Board registration fees for tax agents and BAS agents.',
               es: 'Tasas de inscripción del Tax Practitioners Board para asesores fiscales y agentes BAS.',
               pt: 'Taxas de registro do Tax Practitioners Board para contadores fiscais e agentes BAS.' }
    },
    cpa_fees: {
      label: { en: 'CPA / CA / IPA fees', es: 'Cuotas CPA / CA / IPA', pt: 'Anuidades CPA / CA / IPA' },
      hint:  { en: 'Annual professional body membership fees (CPA Australia, CA ANZ, IPA).',
               es: 'Cuotas anuales de las entidades profesionales (CPA Australia, CA ANZ, IPA).',
               pt: 'Anuidades das entidades profissionais (CPA Australia, CA ANZ, IPA).' }
    },
    journals: {
      label: { en: 'Industry journals', es: 'Revistas del sector', pt: 'Revistas do setor' },
      hint:  { en: 'Subscriptions to journals and publications relevant to your role.',
               es: 'Suscripciones a revistas y publicaciones relevantes para tu rol.',
               pt: 'Assinaturas de revistas e publicações relevantes para sua função.' }
    },
    indemnity_insurance: {
      label: { en: 'Medical indemnity insurance', es: 'Seguro de responsabilidad médica', pt: 'Seguro de responsabilidade médica' },
      hint:  { en: 'Medical indemnity premiums (e.g. MDA, Avant). Deductible for medical practitioners.',
               es: 'Primas de responsabilidad médica (p. ej. MDA, Avant). Deducibles para profesionales médicos.',
               pt: 'Prêmios de responsabilidade médica (ex. MDA, Avant). Dedutível para profissionais da medicina.' }
    },
    medical_journals: {
      label: { en: 'Medical journals', es: 'Revistas médicas', pt: 'Revistas médicas' },
      hint:  { en: 'Subscriptions to medical journals, online libraries and clinical resources.',
               es: 'Suscripciones a revistas médicas, bibliotecas online y recursos clínicos.',
               pt: 'Assinaturas de revistas médicas, bibliotecas online e recursos clínicos.' }
    },
    equipment: {
      label: { en: 'Professional equipment', es: 'Equipo profesional', pt: 'Equipamento profissional' },
      hint:  { en: 'Equipment required for your practice (e.g. loupes, diagnostic tools, sports gear).',
               es: 'Equipo necesario para tu práctica (p. ej. lupas, instrumentos diagnósticos, material deportivo).',
               pt: 'Equipamento necessário para sua prática (ex. lupas, instrumentos diagnósticos, material esportivo).' }
    },
    laptop: {
      label: { en: 'Laptop / work device', es: 'Portátil / dispositivo laboral', pt: 'Laptop / dispositivo de trabalho' },
      hint:  { en: 'Work-use portion of laptop or tablet. Items over $300 are depreciated.',
               es: 'Parte de uso laboral del portátil o tableta. Los artículos de más de $300 se deprecian.',
               pt: 'Parcela de uso para trabalho do laptop ou tablet. Itens acima de $300 são depreciados.' }
    },
    client_meals: {
      label: { en: 'Client travel & meetings', es: 'Viajes y reuniones con clientes', pt: 'Viagens e reuniões com clientes' },
      hint:  { en: 'Work-related client travel. Meal entertainment rules are restrictive — keep records and seek advice.',
               es: 'Viajes laborales con clientes. Las reglas de comidas/entretenimiento son restrictivas — guarda registros y consulta.',
               pt: 'Viagens de trabalho com clientes. As regras para refeições/entretenimento são restritivas — guarde registros e consulte um profissional.' }
    },
    fitness: {
      label: { en: 'Fitness / conditioning', es: 'Acondicionamiento físico', pt: 'Condicionamento físico' },
      hint:  { en: 'Gym and fitness expenses where exceptional physical fitness is an essential, ongoing requirement of your role (ADF, police, firefighters, professional athletes). General fitness is not deductible.',
               es: 'Gastos de gimnasio y fitness cuando la condición física excepcional sea un requisito esencial y continuo del rol (Fuerzas de Defensa, policía, bomberos, atletas profesionales). El fitness general no es deducible.',
               pt: 'Despesas de academia e fitness quando o condicionamento físico excepcional é um requisito essencial e contínuo da função (Forças de Defesa, polícia, bombeiros, atletas profissionais). Fitness geral não é dedutível.' }
    }
  };

  /* ============================ CALC ============================ */

  function calcIncomeTax(income, brackets) {
    for (var i = brackets.length - 1; i >= 0; i--) {
      if (income > brackets[i].lower) return brackets[i].base + (income - brackets[i].lower) * brackets[i].rate;
    }
    return 0;
  }
  function calcLito(income, residency) {
    if (residency !== 'resident') return 0;
    if (income <= 37500) return 700;
    if (income <= 45000) return 700 - (income - 37500) * 0.05;
    if (income <= 66667) return 325 - (income - 45000) * 0.015;
    return 0;
  }
  function calcMedicareLevy(income, thresholds, exempt, residency) {
    if (exempt || residency !== 'resident') return 0;
    if (income <= thresholds.lower) return 0;
    if (income <= thresholds.upper) return (income - thresholds.lower) * 0.10;
    return income * 0.02;
  }
  function calcMls(income, mlsBrackets, hasPhi, exempt, residency) {
    if (hasPhi || exempt || residency !== 'resident') return 0;
    for (var i = mlsBrackets.length - 1; i >= 0; i--) {
      if (income >= mlsBrackets[i].lower) return income * mlsBrackets[i].rate;
    }
    return 0;
  }
  function calcHelp(income, helpKey, hasHelp) {
    if (!hasHelp) return 0;
    if (helpKey === 'new') {
      if (income <= 67000) return 0;
      if (income <= 125000) return (income - 67000) * 0.15;
      return 8700 + (income - 125000) * 0.17;
    }
    var table = HELP_TABLES[helpKey];
    for (var i = table.length - 1; i >= 0; i--) {
      if (income >= table[i].lower) return income * table[i].rate;
    }
    return 0;
  }

  var FMTS = {
    en: new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }),
    es: new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }),
    pt: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 })
  };
  function fmt(n) { return FMTS[lang].format(n); }
  function fmtPct(n) { return (n * 100).toFixed(1) + '%'; }

  var $ = function (id) { return document.getElementById(id); };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c];
    });
  }

  /* ============================ COMBOBOX ============================ */

  var combo = { selected: 'general', active: -1, filtered: [], query: '' };

  function sortedOccupations() {
    return OCCUPATIONS.slice().sort(function (a, b) {
      return a.label[lang].localeCompare(b.label[lang]);
    });
  }
  function comboLabel() {
    var o = OCCUPATIONS.find(function (x) { return x.key === combo.selected; });
    return o ? o.label[lang] : '';
  }
  function comboFilter(q) {
    q = (q || '').trim().toLowerCase();
    combo.query = q;
    var all = sortedOccupations();
    if (!q) return all;
    return all.filter(function (o) { return o.label[lang].toLowerCase().indexOf(q) !== -1; });
  }
  function highlight(label, q) {
    if (!q) return escapeHtml(label);
    var lower = label.toLowerCase();
    var idx = lower.indexOf(q);
    if (idx < 0) return escapeHtml(label);
    return escapeHtml(label.slice(0, idx)) +
           '<mark>' + escapeHtml(label.slice(idx, idx + q.length)) + '</mark>' +
           escapeHtml(label.slice(idx + q.length));
  }
  function comboRender() {
    var list = $('ystc-occ-list');
    if (!combo.filtered.length) {
      list.innerHTML = '<li class="ystc-combo-empty">' + escapeHtml(t('ph_combo_empty')) + '</li>';
      return;
    }
    list.innerHTML = combo.filtered.map(function (o, i) {
      var cls = 'ystc-combo-opt';
      if (o.key === combo.selected) cls += ' selected';
      if (i === combo.active)       cls += ' active';
      return '<li class="' + cls + '" role="option" data-key="' + o.key + '">' +
             highlight(o.label[lang], combo.query) + '</li>';
    }).join('');
  }
  function comboOpen() {
    $('ystc-combo').classList.add('open');
    $('ystc-occ-list').classList.add('open');
    $('ystc-occupation').setAttribute('aria-expanded', 'true');
    comboRender();
  }
  function comboClose() {
    $('ystc-combo').classList.remove('open');
    $('ystc-occ-list').classList.remove('open');
    $('ystc-occupation').setAttribute('aria-expanded', 'false');
    combo.active = -1;
  }
  function comboSelect(key) {
    var occ = OCCUPATIONS.find(function (o) { return o.key === key; });
    if (!occ) return;
    combo.selected = key;
    $('ystc-occupation').value = occ.label[lang];
    comboClose();
    renderDeductions();
    calculate();
  }
  function scrollActiveIntoView() {
    var list = $('ystc-occ-list');
    var active = list.querySelector('.ystc-combo-opt.active');
    if (!active) return;
    var lr = list.getBoundingClientRect(), ar = active.getBoundingClientRect();
    if (ar.bottom > lr.bottom)      list.scrollTop += ar.bottom - lr.bottom;
    else if (ar.top < lr.top)       list.scrollTop -= lr.top - ar.top;
  }
  function setupCombo() {
    var input = $('ystc-occupation');
    var list  = $('ystc-occ-list');
    input.value = comboLabel();

    input.addEventListener('focus', function () {
      combo.filtered = comboFilter('');
      combo.active = -1;
      comboOpen();
      this.select();
    });
    input.addEventListener('input', function () {
      combo.filtered = comboFilter(this.value);
      combo.active = combo.filtered.length ? 0 : -1;
      comboOpen();
    });
    input.addEventListener('keydown', function (e) {
      var n = combo.filtered.length;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        combo.active = combo.active < 0 ? 0 : Math.min(combo.active + 1, n - 1);
        comboRender(); scrollActiveIntoView();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        combo.active = Math.max(combo.active - 1, 0);
        comboRender(); scrollActiveIntoView();
      } else if (e.key === 'Enter') {
        if (combo.active >= 0 && combo.filtered[combo.active]) {
          e.preventDefault();
          comboSelect(combo.filtered[combo.active].key);
        }
      } else if (e.key === 'Escape') {
        input.value = comboLabel();
        comboClose();
        input.blur();
      }
    });
    list.addEventListener('mousedown', function (e) {
      var opt = e.target.closest('.ystc-combo-opt');
      if (!opt) return;
      e.preventDefault();
      comboSelect(opt.dataset.key);
    });
    input.addEventListener('blur', function () {
      setTimeout(function () { input.value = comboLabel(); comboClose(); }, 150);
    });
    document.addEventListener('mousedown', function (e) {
      if (e.target !== input && !list.contains(e.target)) comboClose();
    });
  }

  /* ============================ DEDUCTIONS UI ============================ */

  function buildDeductionHtml(key) {
    var d = DEDUCTION_CATALOG[key];
    if (!d) return '';
    return (
      '<div class="ystc-field ystc-field-money">' +
        '<label class="ystc-label">' +
          escapeHtml(d.label[lang]) +
          '<span class="ystc-tip"><span class="ystc-tip-icon" tabindex="0">?</span>' +
          '<span class="ystc-tip-text">' + escapeHtml(d.hint[lang]) + '</span></span>' +
        '</label>' +
        '<input type="number" class="ystc-input ystc-input-money ystc-ded-input" ' +
               'data-key="' + key + '" min="0" step="1" placeholder="0" inputmode="numeric">' +
      '</div>'
    );
  }

  function renderDeductions() {
    var occ = OCCUPATIONS.find(function (o) { return o.key === combo.selected; }) || {};
    var spec = occ.extras || [];
    var seen = {}, ordered = [];
    CORE_DEDUCTIONS.concat(spec).forEach(function (k) {
      if (!seen[k]) { seen[k] = true; ordered.push(k); }
    });

    var existing = {};
    document.querySelectorAll('.ystc-ded-input').forEach(function (inp) {
      existing[inp.dataset.key] = inp.value;
    });

    $('ystc-deductions').innerHTML = ordered.map(buildDeductionHtml).join('');

    document.querySelectorAll('.ystc-ded-input').forEach(function (inp) {
      if (existing[inp.dataset.key]) inp.value = existing[inp.dataset.key];
      inp.addEventListener('input', calculate);
    });
  }

  function sumDeductions() {
    var s = 0;
    document.querySelectorAll('.ystc-ded-input').forEach(function (inp) {
      s += parseFloat(inp.value) || 0;
    });
    return s;
  }

  function deductionsBreakdown() {
    var items = [];
    document.querySelectorAll('.ystc-ded-input').forEach(function (inp) {
      var v = parseFloat(inp.value) || 0;
      if (v > 0) {
        var key = inp.dataset.key;
        var d = DEDUCTION_CATALOG[key];
        items.push((d ? d.label[lang] : key) + ': ' + fmt(v));
      }
    });
    return items.length ? items.join(' | ') : '—';
  }

  /* ============================ MAIN CALC ============================ */

  function calculate() {
    var year      = $('ystc-year').value;
    var residency = $('ystc-residency').value;
    var hasHelp   = $('ystc-help').checked;
    var exempt    = $('ystc-medex').checked;
    var hasPhi    = $('ystc-phi').checked;

    var wages    = Math.max(0, parseFloat($('ystc-wages').value)    || 0);
    var interest = Math.max(0, parseFloat($('ystc-interest').value) || 0);
    var business = Math.max(0, parseFloat($('ystc-business').value) || 0);
    var rental   = Math.max(0, parseFloat($('ystc-rental').value)   || 0);
    var totalIncome = wages + interest + business + rental;

    var totalDeductions = sumDeductions();
    var taxableIncome = Math.max(0, totalIncome - totalDeductions);

    var paygw        = Math.max(0, parseFloat($('ystc-paygw').value)       || 0);
    var instalments  = Math.max(0, parseFloat($('ystc-instalments').value) || 0);
    var totalPrepaid = paygw + instalments;

    $('ystc-total-income').textContent     = fmt(totalIncome);
    $('ystc-total-deductions').textContent = fmt(totalDeductions);
    $('ystc-total-prepaid').textContent    = fmt(totalPrepaid);

    var d = TAX_DATA[year];
    var tax   = calcIncomeTax(taxableIncome, d.brackets[residency]);
    var lito  = calcLito(taxableIncome, residency);
    var ml    = calcMedicareLevy(taxableIncome, d.medicareLevy, exempt, residency);
    var mls   = calcMls(taxableIncome, d.mls, hasPhi, exempt, residency);
    var help  = calcHelp(taxableIncome, d.help, hasHelp);
    var total = Math.max(0, tax - lito) + ml + mls + help;
    var net   = taxableIncome - total;
    var eff   = taxableIncome > 0 ? total / taxableIncome : 0;
    var outcome = totalPrepaid - total;

    $('ystc-r-income').textContent = fmt(totalIncome);
    $('ystc-r-deds').textContent   = '-' + fmt(totalDeductions);
    $('ystc-r-ti').textContent     = fmt(taxableIncome);
    $('ystc-r-tax').textContent    = fmt(tax);
    $('ystc-r-lito').textContent   = lito > 0 ? '-' + fmt(lito) : fmt(0);
    $('ystc-r-ml').textContent     = fmt(ml);
    $('ystc-r-mls').textContent    = fmt(mls);
    $('ystc-r-help').textContent   = fmt(help);
    $('ystc-r-total').textContent  = fmt(total);
    $('ystc-r-paid').textContent   = totalPrepaid > 0 ? '-' + fmt(totalPrepaid) : fmt(0);
    $('ystc-r-net').textContent    = fmt(net);
    $('ystc-r-eff').textContent    = fmtPct(eff);

    var row = $('ystc-r-outcome-row');
    var lbl = $('ystc-r-outcome-label');
    var val = $('ystc-r-outcome');
    if (outcome >= 0) {
      row.classList.add('ystc-refund'); row.classList.remove('ystc-owing');
      lbl.textContent = t('r_refund');
      val.textContent = fmt(outcome);
    } else {
      row.classList.add('ystc-owing'); row.classList.remove('ystc-refund');
      lbl.textContent = t('r_owing');
      val.textContent = fmt(Math.abs(outcome));
    }

    return {
      year: year, residency: residency, occupation: combo.selected,
      wages: wages, interest: interest, business: business, rental: rental,
      totalIncome: totalIncome, totalDeductions: totalDeductions,
      taxableIncome: taxableIncome,
      tax: tax, lito: lito, ml: ml, mls: mls, help: help,
      total: total, net: net, eff: eff,
      paygw: paygw, instalments: instalments,
      totalPrepaid: totalPrepaid, outcome: outcome
    };
  }

  /* ============================ SUBMIT ============================ */

  function disableButtons(disabled) {
    $('ystc-btn-primary').disabled = disabled;
    $('ystc-btn-secondary').disabled = disabled;
  }
  function setMsg(text, type) {
    var m = $('ystc-msg');
    m.className = 'ystc-msg' + (type ? ' ' + type : '');
    m.textContent = text || '';
  }

  function populateHiddenForm(r) {
    var form = document.getElementById('tax-calc-form');
    if (!form) return null;

    var set = function (n, v) {
      var el = form.querySelector('[name="' + n + '"]');
      if (el) el.value = v;
    };

    var resKey = 'res_' + r.residency;
    var residencyLabel = t(resKey);
    var occLabel = (OCCUPATIONS.find(function (o) { return o.key === r.occupation; }) || {}).label;
    occLabel = occLabel ? occLabel[lang] : r.occupation;
    var langLabel = { en: 'English', es: 'Español', pt: 'Português' }[lang] || lang;

    set('client-name',          $('ystc-name').value.trim());
    set('client-email',         $('ystc-email').value.trim());
    set('language',             langLabel);
    set('tax-year',             r.year);
    set('residency',            residencyLabel);
    set('occupation',           occLabel);
    set('wages',                fmt(r.wages));
    set('interest',             fmt(r.interest));
    set('business-income',      fmt(r.business));
    set('rental-income',        fmt(r.rental));
    set('total-income',         fmt(r.totalIncome));
    set('deductions-breakdown', deductionsBreakdown());
    set('total-deductions',     fmt(r.totalDeductions));
    set('taxable-income',       fmt(r.taxableIncome));
    set('gross-tax',            fmt(r.tax));
    set('lito',                 fmt(r.lito));
    set('medicare-levy',        fmt(r.ml));
    set('mls',                  fmt(r.mls));
    set('help-repayment',       fmt(r.help));
    set('total-tax',            fmt(r.total));
    set('paygw',                fmt(r.paygw));
    set('payg-instalments',     fmt(r.instalments));
    set('total-prepaid',        fmt(r.totalPrepaid));
    set('outcome-type',         r.outcome >= 0 ? 'Refund' : 'Payable');
    set('estimated-outcome',    fmt(Math.abs(r.outcome)));
    set('net-income',           fmt(r.net));
    set('effective-rate',       fmtPct(r.eff));

    return form;
  }

  function waitForWebflowResult(form, onResult, timeoutMs) {
    timeoutMs = timeoutMs || 8000;
    var wrapper = form.closest('.w-form');
    if (!wrapper) { onResult('timeout'); return; }
    var done = wrapper.querySelector('.w-form-done');
    var fail = wrapper.querySelector('.w-form-fail');
    var start = Date.now();
    (function check() {
      if (done && done.style.display === 'block') { onResult('success'); return; }
      if (fail && fail.style.display === 'block') { onResult('fail'); return; }
      if (Date.now() - start > timeoutMs) { onResult('timeout'); return; }
      setTimeout(check, 180);
    })();
  }

  function handleSubmit(withRedirect) {
    var name  = $('ystc-name').value.trim();
    var email = $('ystc-email').value.trim();

    if (!name) { setMsg(t('msg_no_name'), 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg(t('msg_no_email'), 'error'); return;
    }

    var r = calculate();
    var form = populateHiddenForm(r);
    if (!form) { setMsg(t('msg_no_form'), 'error'); return; }

    disableButtons(true);
    setMsg(t('msg_sending'), 'success');

    var submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');
    if (submitBtn) submitBtn.click();
    else if (typeof form.requestSubmit === 'function') form.requestSubmit();
    else form.submit();

    waitForWebflowResult(form, function (result) {
      if (result === 'fail') {
        disableButtons(false);
        setMsg(t('msg_fail'), 'error');
        return;
      }
      if (withRedirect) {
        window.location.href = 'https://www.taxbne.com.au/services/tax-return';
      } else {
        setMsg(t('msg_sent'), 'success');
      }
    });
  }

  /* ============================ I18N APPLY ============================ */

  function applyLang() {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    document.querySelectorAll('.ystc-lang').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    var input = $('ystc-occupation');
    if (input) input.value = comboLabel();
    if ($('ystc-occ-list') && $('ystc-occ-list').classList.contains('open')) {
      combo.filtered = comboFilter(combo.query);
      comboRender();
    }

    renderDeductions();
    calculate();
  }

  function setLang(newLang) {
    if (!T[newLang] || newLang === lang) return;
    lang = newLang;
    try { localStorage.setItem('ystc-lang', newLang); } catch (e) {}
    applyLang();
  }

  /* ============================ INIT ============================ */

  function init() {
    if (!document.getElementById('ystc-root')) return; // markup not on page
    setupCombo();
    applyLang(); // also calls renderDeductions + calculate

    ['ystc-year', 'ystc-residency',
     'ystc-wages', 'ystc-interest', 'ystc-business', 'ystc-rental',
     'ystc-paygw', 'ystc-instalments',
     'ystc-help', 'ystc-medex', 'ystc-phi'
    ].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener('input',  calculate);
      el.addEventListener('change', calculate);
    });

    document.querySelectorAll('.ystc-lang').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });

    $('ystc-btn-primary').addEventListener('click',   function () { handleSubmit(true); });
    $('ystc-btn-secondary').addEventListener('click', function () { handleSubmit(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
