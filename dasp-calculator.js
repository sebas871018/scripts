/*!
 * Y&S Accounting - DASP Refund Calculator
 * Lead-gated multilingual calculator for taxbne.com.au/services/departing-australia-superannuation-claim
 * (c) SGF AUSTRALIA PTY. LTD. (ABN 39 615 320 048). All Rights Reserved.
 */
(function () {
  'use strict';

  var APP_ID = 'dasp-app';
  var FORM_ID = 'wf-dasp-form';
  var LANG_STORE_KEY = 'dasp-lang-v1';

  var RATE_WHM = 0.65;
  var RATE_OTHER = 0.35;

  var LANGS = ['en', 'es', 'pt', 'fr', 'de', 'it', 'ko', 'ja', 'zh'];
  var LANG_LABELS = {
    en: 'English', es: 'Español', pt: 'Português', fr: 'Français',
    de: 'Deutsch', it: 'Italiano', ko: '한국어', ja: '日本語', zh: '中文'
  };

  var T = {
    en: {
      title: 'DASP Refund Calculator',
      subtitle: 'Estimate your Departing Australia Superannuation Payment in 60 seconds.',
      langLabel: 'Language',
      stepCalc: 'Step 1 of 2 - Your super details',
      stepContact: 'Step 2 of 2 - Your contact details',
      balanceLabel: 'Total super balance (AUD)',
      balanceHelp: 'Check your myGov or super fund statement for the current balance.',
      visaLabel: 'Visa type',
      visaWhm: 'Working Holiday (subclass 417 / 462)',
      visaOther: 'Other temporary visa (482, 500, 485, etc.)',
      visaHelp: 'Working Holiday visas are taxed at a higher DASP rate.',
      taxFreeLabel: 'Tax-free component (optional)',
      taxFreeHelp: 'Shown on your fund statement. Leave blank if unsure.',
      next: 'Continue',
      back: 'Back',
      fullNameLabel: 'Full name',
      fullNamePh: 'e.g. Jane Smith',
      emailLabel: 'Email address',
      emailPh: 'you@example.com',
      phoneLabel: 'Phone (with country code)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Comments (optional)',
      commentsPh: 'Expected departure date, fund name, any questions',
      consent: 'I agree to Y&S Accounting contacting me about my DASP claim.',
      calculate: 'Calculate my refund',
      calculating: 'Calculating...',
      rTitle: 'Your estimated DASP refund',
      rGross: 'Gross super balance',
      rTaxable: 'Taxable component',
      rRate: 'DASP tax rate',
      rTax: 'Tax withheld',
      rNet: 'Estimated net refund',
      noteWhm: 'Working Holiday Maker rate of 65% applied to the taxed element of the taxable component.',
      noteOther: 'Standard DASP rate of 35% applied to the taxed element of the taxable component.',
      cta: 'Have Y&S Accounting lodge my DASP claim',
      ctaSub: 'We handle eligibility, ATO lodgement and tax calculation end to end.',
      restart: 'Start again',
      disclaimer: 'This estimate uses current ATO DASP withholding rates. Actual tax depends on your fund component breakdown (taxed vs untaxed element) and any prior visa periods. Y&S Accounting will confirm the exact amount before lodging your claim.',
      errRequired: 'This field is required.',
      errBalance: 'Please enter a valid super balance greater than zero.',
      errTaxFree: 'Tax-free component cannot exceed total balance.',
      errName: 'Please enter your full name (letters only).',
      errEmail: 'Please enter a valid email address.',
      errPhone: 'Please enter a valid phone number.',
      errConsent: 'Please tick the box to continue.',
      submitting: 'Submitting...',
      thanks: 'Thanks, your details have been sent to our team.',
      thanksSub: 'A CPA-qualified accountant will contact you within one business day.'
    },
    es: {
      title: 'Calculadora de Reembolso DASP',
      subtitle: 'Estima tu pago DASP (Departing Australia Superannuation Payment) en 60 segundos.',
      langLabel: 'Idioma',
      stepCalc: 'Paso 1 de 2 - Datos de tu super',
      stepContact: 'Paso 2 de 2 - Tus datos de contacto',
      balanceLabel: 'Saldo total de superannuation (AUD)',
      balanceHelp: 'Consulta myGov o el extracto de tu fondo para el saldo actual.',
      visaLabel: 'Tipo de visa',
      visaWhm: 'Working Holiday (subclase 417 / 462)',
      visaOther: 'Otra visa temporal (482, 500, 485, etc.)',
      visaHelp: 'Las visas Working Holiday tienen una tasa DASP más alta.',
      taxFreeLabel: 'Componente libre de impuestos (opcional)',
      taxFreeHelp: 'Figura en el extracto del fondo. Déjalo en blanco si no estás seguro.',
      next: 'Continuar',
      back: 'Atrás',
      fullNameLabel: 'Nombre completo',
      fullNamePh: 'p. ej. Juan Pérez',
      emailLabel: 'Correo electrónico',
      emailPh: 'tucorreo@ejemplo.com',
      phoneLabel: 'Teléfono (con código de país)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Comentarios (opcional)',
      commentsPh: 'Fecha prevista de salida, nombre del fondo, preguntas',
      consent: 'Acepto que Y&S Accounting me contacte sobre mi reclamo DASP.',
      calculate: 'Calcular mi reembolso',
      calculating: 'Calculando...',
      rTitle: 'Tu reembolso DASP estimado',
      rGross: 'Saldo bruto de super',
      rTaxable: 'Componente gravable',
      rRate: 'Tasa DASP',
      rTax: 'Impuesto retenido',
      rNet: 'Reembolso neto estimado',
      noteWhm: 'Se aplica la tasa Working Holiday Maker del 65% al elemento gravado del componente gravable.',
      noteOther: 'Se aplica la tasa estándar DASP del 35% al elemento gravado del componente gravable.',
      cta: 'Que Y&S Accounting tramite mi reclamo DASP',
      ctaSub: 'Gestionamos elegibilidad, presentación ante la ATO y cálculo fiscal de principio a fin.',
      restart: 'Empezar de nuevo',
      disclaimer: 'Esta estimación usa las tasas de retención DASP vigentes de la ATO. El impuesto real depende del desglose del fondo (elemento gravado vs. no gravado) y visas anteriores. Y&S Accounting confirmará el monto exacto antes de tramitar tu reclamo.',
      errRequired: 'Este campo es obligatorio.',
      errBalance: 'Ingresa un saldo de super válido mayor que cero.',
      errTaxFree: 'El componente libre de impuestos no puede superar el saldo total.',
      errName: 'Ingresa tu nombre completo (solo letras).',
      errEmail: 'Ingresa un correo electrónico válido.',
      errPhone: 'Ingresa un número de teléfono válido.',
      errConsent: 'Marca la casilla para continuar.',
      submitting: 'Enviando...',
      thanks: 'Gracias, hemos recibido tus datos.',
      thanksSub: 'Un contador CPA te contactará dentro de un día hábil.'
    },
    pt: {
      title: 'Calculadora de Reembolso DASP',
      subtitle: 'Estime o seu pagamento DASP (Departing Australia Superannuation Payment) em 60 segundos.',
      langLabel: 'Idioma',
      stepCalc: 'Passo 1 de 2 - Dados do seu super',
      stepContact: 'Passo 2 de 2 - Seus dados de contato',
      balanceLabel: 'Saldo total de superannuation (AUD)',
      balanceHelp: 'Verifique o myGov ou o extrato do seu fundo para o saldo atual.',
      visaLabel: 'Tipo de visto',
      visaWhm: 'Working Holiday (subclasse 417 / 462)',
      visaOther: 'Outro visto temporário (482, 500, 485, etc.)',
      visaHelp: 'Vistos Working Holiday têm uma taxa DASP mais alta.',
      taxFreeLabel: 'Componente isento (opcional)',
      taxFreeHelp: 'Mostrado no extrato do fundo. Deixe em branco se não souber.',
      next: 'Continuar',
      back: 'Voltar',
      fullNameLabel: 'Nome completo',
      fullNamePh: 'ex.: João Silva',
      emailLabel: 'E-mail',
      emailPh: 'voce@exemplo.com',
      phoneLabel: 'Telefone (com código do país)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Comentários (opcional)',
      commentsPh: 'Data prevista de saída, nome do fundo, dúvidas',
      consent: 'Concordo que a Y&S Accounting entre em contato sobre o meu DASP.',
      calculate: 'Calcular meu reembolso',
      calculating: 'Calculando...',
      rTitle: 'Seu reembolso DASP estimado',
      rGross: 'Saldo bruto de super',
      rTaxable: 'Componente tributável',
      rRate: 'Taxa DASP',
      rTax: 'Imposto retido',
      rNet: 'Reembolso líquido estimado',
      noteWhm: 'Taxa Working Holiday Maker de 65% aplicada ao elemento tributado do componente tributável.',
      noteOther: 'Taxa padrão DASP de 35% aplicada ao elemento tributado do componente tributável.',
      cta: 'Quero que a Y&S Accounting protocole meu DASP',
      ctaSub: 'Cuidamos de elegibilidade, protocolo ATO e cálculo de imposto do início ao fim.',
      restart: 'Recomeçar',
      disclaimer: 'Esta estimativa usa as taxas atuais de retenção DASP da ATO. O imposto real depende da composição do fundo (elemento tributado vs. não tributado) e vistos anteriores. A Y&S Accounting confirmará o valor exato antes de protocolar o pedido.',
      errRequired: 'Este campo é obrigatório.',
      errBalance: 'Informe um saldo de super válido maior que zero.',
      errTaxFree: 'O componente isento não pode exceder o saldo total.',
      errName: 'Informe seu nome completo (apenas letras).',
      errEmail: 'Informe um e-mail válido.',
      errPhone: 'Informe um telefone válido.',
      errConsent: 'Marque a caixa para continuar.',
      submitting: 'Enviando...',
      thanks: 'Obrigado, recebemos seus dados.',
      thanksSub: 'Um contador CPA entrará em contato em até um dia útil.'
    },
    fr: {
      title: 'Calculateur de Remboursement DASP',
      subtitle: 'Estimez votre paiement DASP (Departing Australia Superannuation Payment) en 60 secondes.',
      langLabel: 'Langue',
      stepCalc: 'Étape 1 sur 2 - Détails de votre super',
      stepContact: 'Étape 2 sur 2 - Vos coordonnées',
      balanceLabel: 'Solde total superannuation (AUD)',
      balanceHelp: 'Consultez myGov ou le relevé de votre fonds pour le solde actuel.',
      visaLabel: 'Type de visa',
      visaWhm: 'Working Holiday (sous-classe 417 / 462)',
      visaOther: 'Autre visa temporaire (482, 500, 485, etc.)',
      visaHelp: 'Les visas Working Holiday sont imposés à un taux DASP plus élevé.',
      taxFreeLabel: 'Composante non imposable (facultatif)',
      taxFreeHelp: 'Indiquée sur le relevé du fonds. Laissez vide si vous ne savez pas.',
      next: 'Continuer',
      back: 'Retour',
      fullNameLabel: 'Nom complet',
      fullNamePh: 'p. ex. Jean Dupont',
      emailLabel: 'Adresse e-mail',
      emailPh: 'vous@exemple.com',
      phoneLabel: 'Téléphone (avec indicatif)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Commentaires (facultatif)',
      commentsPh: 'Date de départ prévue, nom du fonds, questions',
      consent: 'J\'accepte que Y&S Accounting me contacte au sujet de ma demande DASP.',
      calculate: 'Calculer mon remboursement',
      calculating: 'Calcul en cours...',
      rTitle: 'Votre remboursement DASP estimé',
      rGross: 'Solde brut de super',
      rTaxable: 'Composante imposable',
      rRate: 'Taux DASP',
      rTax: 'Impôt retenu',
      rNet: 'Remboursement net estimé',
      noteWhm: 'Taux Working Holiday Maker de 65% appliqué à l\'élément imposé de la composante imposable.',
      noteOther: 'Taux DASP standard de 35% appliqué à l\'élément imposé de la composante imposable.',
      cta: 'Confier ma demande DASP à Y&S Accounting',
      ctaSub: 'Nous gérons éligibilité, dépôt ATO et calcul fiscal de A à Z.',
      restart: 'Recommencer',
      disclaimer: 'Cette estimation utilise les taux de retenue DASP en vigueur de l\'ATO. L\'impôt réel dépend de la composition de votre fonds et des visas antérieurs. Y&S Accounting confirmera le montant exact avant dépôt.',
      errRequired: 'Ce champ est obligatoire.',
      errBalance: 'Saisissez un solde valide supérieur à zéro.',
      errTaxFree: 'La composante non imposable ne peut pas dépasser le solde total.',
      errName: 'Saisissez votre nom complet (lettres uniquement).',
      errEmail: 'Saisissez une adresse e-mail valide.',
      errPhone: 'Saisissez un numéro de téléphone valide.',
      errConsent: 'Cochez la case pour continuer.',
      submitting: 'Envoi...',
      thanks: 'Merci, vos informations ont bien été envoyées.',
      thanksSub: 'Un comptable CPA vous contactera sous un jour ouvré.'
    },
    de: {
      title: 'DASP-Rückerstattungsrechner',
      subtitle: 'Schätzen Sie Ihre DASP-Auszahlung (Departing Australia Superannuation Payment) in 60 Sekunden.',
      langLabel: 'Sprache',
      stepCalc: 'Schritt 1 von 2 - Ihre Super-Angaben',
      stepContact: 'Schritt 2 von 2 - Ihre Kontaktdaten',
      balanceLabel: 'Super-Gesamtguthaben (AUD)',
      balanceHelp: 'Aktuellen Stand auf myGov oder Fonds-Auszug prüfen.',
      visaLabel: 'Visumtyp',
      visaWhm: 'Working Holiday (Unterklasse 417 / 462)',
      visaOther: 'Anderes temporäres Visum (482, 500, 485, usw.)',
      visaHelp: 'Working Holiday Visa werden mit einem höheren DASP-Satz besteuert.',
      taxFreeLabel: 'Steuerfreier Anteil (optional)',
      taxFreeHelp: 'Auf dem Fonds-Auszug angegeben. Leer lassen, falls unbekannt.',
      next: 'Weiter',
      back: 'Zurück',
      fullNameLabel: 'Vollständiger Name',
      fullNamePh: 'z. B. Anna Müller',
      emailLabel: 'E-Mail-Adresse',
      emailPh: 'sie@beispiel.com',
      phoneLabel: 'Telefon (mit Ländervorwahl)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Anmerkungen (optional)',
      commentsPh: 'Geplantes Ausreisedatum, Fondsname, Fragen',
      consent: 'Ich stimme zu, dass Y&S Accounting mich bezüglich meines DASP-Antrags kontaktiert.',
      calculate: 'Rückerstattung berechnen',
      calculating: 'Berechne...',
      rTitle: 'Ihre geschätzte DASP-Rückerstattung',
      rGross: 'Brutto-Super-Guthaben',
      rTaxable: 'Steuerpflichtiger Anteil',
      rRate: 'DASP-Satz',
      rTax: 'Einbehaltene Steuer',
      rNet: 'Geschätzte Netto-Rückerstattung',
      noteWhm: 'Working-Holiday-Maker-Satz von 65% auf den besteuerten Teil des steuerpflichtigen Anteils.',
      noteOther: 'Standard-DASP-Satz von 35% auf den besteuerten Teil des steuerpflichtigen Anteils.',
      cta: 'Y&S Accounting soll meinen DASP-Antrag einreichen',
      ctaSub: 'Wir übernehmen Anspruchsprüfung, ATO-Einreichung und Steuerberechnung von A bis Z.',
      restart: 'Neu starten',
      disclaimer: 'Diese Schätzung verwendet aktuelle ATO-DASP-Sätze. Die tatsächliche Steuer hängt von der Fonds-Aufteilung und früheren Visa ab. Y&S Accounting bestätigt den genauen Betrag vor der Einreichung.',
      errRequired: 'Pflichtfeld.',
      errBalance: 'Gültiges Guthaben grösser als null eingeben.',
      errTaxFree: 'Steuerfreier Anteil darf das Gesamtguthaben nicht übersteigen.',
      errName: 'Vollständigen Namen eingeben (nur Buchstaben).',
      errEmail: 'Gültige E-Mail-Adresse eingeben.',
      errPhone: 'Gültige Telefonnummer eingeben.',
      errConsent: 'Kästchen zum Fortfahren ankreuzen.',
      submitting: 'Wird gesendet...',
      thanks: 'Danke, Ihre Angaben wurden gesendet.',
      thanksSub: 'Ein CPA-qualifizierter Buchhalter meldet sich innerhalb eines Werktags.'
    },
    it: {
      title: 'Calcolatore Rimborso DASP',
      subtitle: 'Stima il tuo pagamento DASP (Departing Australia Superannuation Payment) in 60 secondi.',
      langLabel: 'Lingua',
      stepCalc: 'Passo 1 di 2 - Dati del tuo super',
      stepContact: 'Passo 2 di 2 - Dati di contatto',
      balanceLabel: 'Saldo totale superannuation (AUD)',
      balanceHelp: 'Controlla myGov o l\'estratto del fondo per il saldo attuale.',
      visaLabel: 'Tipo di visto',
      visaWhm: 'Working Holiday (sottoclasse 417 / 462)',
      visaOther: 'Altro visto temporaneo (482, 500, 485, ecc.)',
      visaHelp: 'I visti Working Holiday hanno un\'aliquota DASP più alta.',
      taxFreeLabel: 'Componente esente (opzionale)',
      taxFreeHelp: 'Riportata nell\'estratto del fondo. Lascia vuoto se non sai.',
      next: 'Continua',
      back: 'Indietro',
      fullNameLabel: 'Nome completo',
      fullNamePh: 'es. Marco Rossi',
      emailLabel: 'E-mail',
      emailPh: 'tu@esempio.com',
      phoneLabel: 'Telefono (con prefisso)',
      phonePh: '+61 400 000 000',
      commentsLabel: 'Commenti (opzionale)',
      commentsPh: 'Data di partenza prevista, nome del fondo, domande',
      consent: 'Accetto di essere contattato da Y&S Accounting riguardo al mio DASP.',
      calculate: 'Calcola il mio rimborso',
      calculating: 'Calcolo...',
      rTitle: 'Il tuo rimborso DASP stimato',
      rGross: 'Saldo lordo super',
      rTaxable: 'Componente tassabile',
      rRate: 'Aliquota DASP',
      rTax: 'Imposta trattenuta',
      rNet: 'Rimborso netto stimato',
      noteWhm: 'Aliquota Working Holiday Maker del 65% applicata all\'elemento tassato della componente tassabile.',
      noteOther: 'Aliquota DASP standard del 35% applicata all\'elemento tassato della componente tassabile.',
      cta: 'Affida la richiesta DASP a Y&S Accounting',
      ctaSub: 'Gestiamo ammissibilità, presentazione ATO e calcolo fiscale dall\'inizio alla fine.',
      restart: 'Ricomincia',
      disclaimer: 'Questa stima usa le aliquote DASP correnti dell\'ATO. L\'imposta effettiva dipende dalla composizione del fondo e dai visti precedenti. Y&S Accounting confermerà l\'importo esatto prima di presentare.',
      errRequired: 'Campo obbligatorio.',
      errBalance: 'Inserisci un saldo valido maggiore di zero.',
      errTaxFree: 'La componente esente non può superare il saldo totale.',
      errName: 'Inserisci il nome completo (solo lettere).',
      errEmail: 'Inserisci un\'e-mail valida.',
      errPhone: 'Inserisci un numero valido.',
      errConsent: 'Spunta la casella per continuare.',
      submitting: 'Invio...',
      thanks: 'Grazie, i tuoi dati sono stati inviati.',
      thanksSub: 'Un contabile CPA ti contatterà entro un giorno lavorativo.'
    },
    ko: {
      title: 'DASP 환급 계산기',
      subtitle: '호주 출국 시 슈퍼 환급액(DASP)을 60초 안에 계산해 보세요.',
      langLabel: '언어',
      stepCalc: '1단계 / 2단계 - 슈퍼 정보',
      stepContact: '2단계 / 2단계 - 연락처 정보',
      balanceLabel: '슈퍼 총 잔액 (AUD)',
      balanceHelp: 'myGov 또는 슈퍼펀드 명세서에서 현재 잔액을 확인하세요.',
      visaLabel: '비자 종류',
      visaWhm: '워킹홀리데이 (417 / 462)',
      visaOther: '기타 임시 비자 (482, 500, 485 등)',
      visaHelp: '워킹홀리데이 비자는 더 높은 DASP 세율이 적용됩니다.',
      taxFreeLabel: '비과세 구성요소 (선택)',
      taxFreeHelp: '펀드 명세서에 기재됨. 모르면 비워두세요.',
      next: '다음',
      back: '뒤로',
      fullNameLabel: '성명',
      fullNamePh: '예: 홍길동',
      emailLabel: '이메일 주소',
      emailPh: 'you@example.com',
      phoneLabel: '전화번호 (국가번호 포함)',
      phonePh: '+61 400 000 000',
      commentsLabel: '추가 의견 (선택)',
      commentsPh: '출국 예정일, 펀드명, 질문 등',
      consent: 'Y&S Accounting이 DASP 관련해 연락하는 것에 동의합니다.',
      calculate: '환급액 계산',
      calculating: '계산 중...',
      rTitle: '예상 DASP 환급액',
      rGross: '슈퍼 총 잔액',
      rTaxable: '과세 대상 구성요소',
      rRate: 'DASP 세율',
      rTax: '원천징수 세금',
      rNet: '예상 순 환급액',
      noteWhm: '과세 대상의 과세 부분에 워킹홀리데이 메이커 세율 65%가 적용됩니다.',
      noteOther: '과세 대상의 과세 부분에 표준 DASP 세율 35%가 적용됩니다.',
      cta: 'Y&S Accounting에 DASP 신청 의뢰',
      ctaSub: '자격 확인부터 ATO 신청, 세금 계산까지 전 과정을 대행합니다.',
      restart: '다시 시작',
      disclaimer: '이 추정치는 현재 ATO DASP 원천징수율을 기준으로 합니다. 실제 세금은 펀드 구성과 이전 비자 이력에 따라 다릅니다. Y&S Accounting이 제출 전 정확한 금액을 확인합니다.',
      errRequired: '필수 항목입니다.',
      errBalance: '0보다 큰 유효한 잔액을 입력하세요.',
      errTaxFree: '비과세 구성요소는 총 잔액을 초과할 수 없습니다.',
      errName: '성명을 입력하세요 (문자만).',
      errEmail: '유효한 이메일을 입력하세요.',
      errPhone: '유효한 전화번호를 입력하세요.',
      errConsent: '계속하려면 체크박스를 선택하세요.',
      submitting: '전송 중...',
      thanks: '감사합니다. 정보가 전송되었습니다.',
      thanksSub: 'CPA 회계사가 영업일 기준 1일 이내에 연락드립니다.'
    },
    ja: {
      title: 'DASP 還付金計算ツール',
      subtitle: 'オーストラリア出国時のスーパー還付額（DASP）を60秒で試算。',
      langLabel: '言語',
      stepCalc: 'ステップ 1 / 2 - スーパーの情報',
      stepContact: 'ステップ 2 / 2 - 連絡先',
      balanceLabel: 'スーパー残高合計 (AUD)',
      balanceHelp: 'myGov または年金基金の明細書で現在の残高を確認してください。',
      visaLabel: 'ビザの種類',
      visaWhm: 'ワーキングホリデー (417 / 462)',
      visaOther: 'その他の一時ビザ (482, 500, 485 など)',
      visaHelp: 'ワーホリビザは DASP 税率が高くなります。',
      taxFreeLabel: '非課税分（任意）',
      taxFreeHelp: '基金の明細書に記載。不明な場合は空欄で。',
      next: '次へ',
      back: '戻る',
      fullNameLabel: '氏名',
      fullNamePh: '例：山田 太郎',
      emailLabel: 'メールアドレス',
      emailPh: 'you@example.com',
      phoneLabel: '電話番号（国番号付き）',
      phonePh: '+61 400 000 000',
      commentsLabel: 'ご要望（任意）',
      commentsPh: '出国予定日、基金名、ご質問など',
      consent: 'Y&S Accounting からの DASP に関する連絡に同意します。',
      calculate: '還付額を計算',
      calculating: '計算中...',
      rTitle: '試算した DASP 還付額',
      rGross: 'スーパー残高（総額）',
      rTaxable: '課税対象分',
      rRate: 'DASP 税率',
      rTax: '源泉徴収税額',
      rNet: '試算の手取り還付額',
      noteWhm: '課税対象分の課税済み部分に、ワーキングホリデーメーカー税率 65% が適用されます。',
      noteOther: '課税対象分の課税済み部分に、標準 DASP 税率 35% が適用されます。',
      cta: 'Y&S Accounting に DASP 申請を依頼する',
      ctaSub: '適格性確認から ATO 申請、税額計算まで一貫してお手伝いします。',
      restart: '最初からやり直す',
      disclaimer: 'この試算は ATO の現行 DASP 源泉徴収率に基づきます。実際の税額は基金の構成と過去のビザにより異なります。Y&S Accounting が提出前に正確な金額を確認します。',
      errRequired: '必須項目です。',
      errBalance: '0 より大きい有効な残高を入力してください。',
      errTaxFree: '非課税分は総残高を超えられません。',
      errName: '氏名を入力してください（文字のみ）。',
      errEmail: '有効なメールアドレスを入力してください。',
      errPhone: '有効な電話番号を入力してください。',
      errConsent: 'チェックボックスをオンにしてください。',
      submitting: '送信中...',
      thanks: 'ご入力ありがとうございます。情報を受け付けました。',
      thanksSub: 'CPA 会計士が1営業日以内にご連絡します。'
    },
    zh: {
      title: 'DASP 退款计算器',
      subtitle: '60 秒内估算您离开澳大利亚时的养老金退款（DASP）。',
      langLabel: '语言',
      stepCalc: '第 1 步 / 共 2 步 - 养老金信息',
      stepContact: '第 2 步 / 共 2 步 - 联系方式',
      balanceLabel: '养老金总余额（澳元）',
      balanceHelp: '请在 myGov 或养老金基金对账单中查看当前余额。',
      visaLabel: '签证类型',
      visaWhm: '打工度假签证 (417 / 462)',
      visaOther: '其他临时签证 (482, 500, 485 等)',
      visaHelp: '打工度假签证适用更高的 DASP 税率。',
      taxFreeLabel: '免税部分（可选）',
      taxFreeHelp: '基金对账单中列示。如不确定可留空。',
      next: '继续',
      back: '返回',
      fullNameLabel: '全名',
      fullNamePh: '例如：张伟',
      emailLabel: '电子邮箱',
      emailPh: 'you@example.com',
      phoneLabel: '电话（含国家代码）',
      phonePh: '+61 400 000 000',
      commentsLabel: '备注（可选）',
      commentsPh: '预计离境日期、基金名称、其他问题',
      consent: '我同意 Y&S Accounting 就 DASP 申请与我联系。',
      calculate: '计算我的退款',
      calculating: '正在计算...',
      rTitle: '您的预计 DASP 退款',
      rGross: '养老金总额',
      rTaxable: '应税部分',
      rRate: 'DASP 税率',
      rTax: '预扣税款',
      rNet: '预计净退款',
      noteWhm: '对应税部分中的已纳税元素适用 65% 的打工度假者税率。',
      noteOther: '对应税部分中的已纳税元素适用 35% 的标准 DASP 税率。',
      cta: '委托 Y&S Accounting 办理我的 DASP 申请',
      ctaSub: '我们包办资格审核、ATO 申请与税务计算全流程。',
      restart: '重新开始',
      disclaimer: '本估算使用 ATO 现行 DASP 预扣税率。实际税款取决于基金成分构成以及以往签证情况。Y&S Accounting 会在申请前确认准确金额。',
      errRequired: '此项必填。',
      errBalance: '请输入大于零的有效余额。',
      errTaxFree: '免税部分不能超过总余额。',
      errName: '请输入您的全名（仅限字母/汉字）。',
      errEmail: '请输入有效的电子邮箱。',
      errPhone: '请输入有效的电话号码。',
      errConsent: '请勾选以继续。',
      submitting: '正在提交...',
      thanks: '感谢您，资料已发送。',
      thanksSub: 'CPA 会计师将在一个工作日内与您联系。'
    }
  };

  var RE_NAME = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\u3040-\u30FF\u3400-\u4DBF\uAC00-\uD7AF\s\-'.]+$/;
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var RE_PHONE = /^[\d\s\-()+]+$/;

  var state = {
    lang: 'en',
    step: 'calc',
    answers: {
      balance: '',
      taxFree: '',
      visa: 'whm',
      fullName: '',
      email: '',
      phone: '',
      comments: '',
      consent: false
    },
    touched: {},
    submitting: false
  };

  function detectLang() {
    try {
      var stored = localStorage.getItem(LANG_STORE_KEY);
      if (stored && T[stored]) return stored;
    } catch (e) {}
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return T[nav] ? nav : 'en';
  }

  function fmt(n) {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency', currency: 'AUD', maximumFractionDigits: 0
    }).format(Math.max(0, Math.round(n)));
  }

  function esc(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function t() { return T[state.lang] || T.en; }

  function calcResults() {
    var balance = parseFloat(state.answers.balance) || 0;
    var taxFree = parseFloat(state.answers.taxFree) || 0;
    taxFree = Math.min(taxFree, balance);
    var taxable = Math.max(0, balance - taxFree);
    var rate = state.answers.visa === 'whm' ? RATE_WHM : RATE_OTHER;
    var tax = taxable * rate;
    var net = balance - tax;
    return { balance: balance, taxFree: taxFree, taxable: taxable, rate: rate, tax: tax, net: net };
  }

  function validateCalcStep() {
    var errs = {};
    var L = t();
    var balance = parseFloat(state.answers.balance);
    if (!balance || balance <= 0 || isNaN(balance)) errs.balance = L.errBalance;
    var taxFree = parseFloat(state.answers.taxFree);
    if (!isNaN(taxFree) && balance && taxFree > balance) errs.taxFree = L.errTaxFree;
    return errs;
  }

  function validateContactStep() {
    var errs = {};
    var L = t();
    var name = (state.answers.fullName || '').trim();
    if (name.length < 2 || !RE_NAME.test(name)) errs.fullName = L.errName;
    var email = (state.answers.email || '').trim();
    if (!RE_EMAIL.test(email)) errs.email = L.errEmail;
    var phone = (state.answers.phone || '').trim();
    if (phone.length < 6 || !RE_PHONE.test(phone)) errs.phone = L.errPhone;
    if (!state.answers.consent) errs.consent = L.errConsent;
    return errs;
  }

  function submitToWebflow(results) {
    var form = document.getElementById(FORM_ID);
    if (!form) {
      console.error('[DASP] Hidden form not found');
      return false;
    }
    var a = state.answers;
    var set = function (id, val) {
      var el = form.querySelector('#' + id);
      if (el) el.value = val == null ? '' : String(val);
    };
    set('dasp-full-name', a.fullName);
    set('dasp-email', a.email);
    set('dasp-phone', a.phone);
    set('dasp-language', LANG_LABELS[state.lang] + ' (' + state.lang + ')');
    set('dasp-visa-type', a.visa === 'whm' ? 'Working Holiday (417/462)' : 'Other temporary visa');
    set('dasp-super-balance', fmt(results.balance));
    set('dasp-tax-free-component', fmt(results.taxFree));
    set('dasp-taxable-component', fmt(results.taxable));
    set('dasp-tax-rate', (results.rate * 100).toFixed(0) + '%');
    set('dasp-tax-withheld', fmt(results.tax));
    set('dasp-net-refund', fmt(results.net));
    set('dasp-comments', a.comments || '');
    var summary = [
      'Gross: ' + fmt(results.balance),
      'Tax-free: ' + fmt(results.taxFree),
      'Taxable: ' + fmt(results.taxable),
      'Rate: ' + (results.rate * 100).toFixed(0) + '%',
      'Tax withheld: ' + fmt(results.tax),
      'Net refund: ' + fmt(results.net),
      'Visa: ' + (a.visa === 'whm' ? 'WHM' : 'Other'),
      'Language: ' + LANG_LABELS[state.lang]
    ].join(' | ');
    set('dasp-summary', summary);

    var submitBtn = form.querySelector('#dasp-submit-btn');
    if (submitBtn) {
      submitBtn.click();
      return true;
    }
    return false;
  }

  function render() {
    var app = document.getElementById(APP_ID);
    if (!app) return;
    var L = t();

    var langOpts = LANGS.map(function (code) {
      return '<option value="' + code + '"' + (code === state.lang ? ' selected' : '') + '>' +
        esc(LANG_LABELS[code]) + '</option>';
    }).join('');

    var html = '';
    html += '<div class="dasp-card">';
    html += '  <div class="dasp-header">';
    html += '    <div>';
    html += '      <h2 class="dasp-h2">' + esc(L.title) + '</h2>';
    html += '      <p class="dasp-sub">' + esc(L.subtitle) + '</p>';
    html += '    </div>';
    html += '    <label class="dasp-lang-wrap">';
    html += '      <span class="dasp-lang-label">' + esc(L.langLabel) + '</span>';
    html += '      <select id="dasp-lang-sel" class="dasp-lang-sel">' + langOpts + '</select>';
    html += '    </label>';
    html += '  </div>';
    html += '  <div class="dasp-body">';

    if (state.step === 'calc') html += renderCalcStep(L);
    else if (state.step === 'contact') html += renderContactStep(L);
    else if (state.step === 'result') html += renderResultStep(L);

    html += '  </div>';
    html += '  <p class="dasp-disclaimer">' + esc(L.disclaimer) + '</p>';
    html += '</div>';

    app.innerHTML = html;
    wireEvents();
  }

  function renderCalcStep(L) {
    var errs = state.showErrors ? validateCalcStep() : {};
    var h = '';
    h += '<p class="dasp-step">' + esc(L.stepCalc) + '</p>';

    h += '<div class="dasp-field">';
    h += '  <label for="dasp-balance">' + esc(L.balanceLabel) + '</label>';
    h += '  <div class="dasp-prefix"><span>$</span>';
    h += '  <input id="dasp-balance" type="number" inputmode="decimal" min="0" step="100" ' +
         'value="' + esc(state.answers.balance) + '" placeholder="8500" />';
    h += '  </div>';
    h += '  <small class="dasp-help">' + esc(L.balanceHelp) + '</small>';
    if (errs.balance) h += '<div class="dasp-err">' + esc(errs.balance) + '</div>';
    h += '</div>';

    h += '<div class="dasp-row">';
    h += '  <div class="dasp-field">';
    h += '    <label for="dasp-visa">' + esc(L.visaLabel) + '</label>';
    h += '    <select id="dasp-visa">';
    h += '      <option value="whm"' + (state.answers.visa === 'whm' ? ' selected' : '') + '>' + esc(L.visaWhm) + '</option>';
    h += '      <option value="other"' + (state.answers.visa === 'other' ? ' selected' : '') + '>' + esc(L.visaOther) + '</option>';
    h += '    </select>';
    h += '    <small class="dasp-help">' + esc(L.visaHelp) + '</small>';
    h += '  </div>';
    h += '  <div class="dasp-field">';
    h += '    <label for="dasp-taxfree">' + esc(L.taxFreeLabel) + '</label>';
    h += '    <div class="dasp-prefix"><span>$</span>';
    h += '    <input id="dasp-taxfree" type="number" inputmode="decimal" min="0" step="100" ' +
         'value="' + esc(state.answers.taxFree) + '" placeholder="0" />';
    h += '    </div>';
    h += '    <small class="dasp-help">' + esc(L.taxFreeHelp) + '</small>';
    if (errs.taxFree) h += '<div class="dasp-err">' + esc(errs.taxFree) + '</div>';
    h += '  </div>';
    h += '</div>';

    h += '<button type="button" id="dasp-next" class="dasp-btn dasp-btn-primary">' + esc(L.next) + '</button>';
    return h;
  }

  function renderContactStep(L) {
    var errs = state.showErrors ? validateContactStep() : {};
    var h = '';
    h += '<p class="dasp-step">' + esc(L.stepContact) + '</p>';

    h += '<div class="dasp-field">';
    h += '  <label for="dasp-name">' + esc(L.fullNameLabel) + '</label>';
    h += '  <input id="dasp-name" type="text" autocomplete="name" ' +
         'value="' + esc(state.answers.fullName) + '" placeholder="' + esc(L.fullNamePh) + '" />';
    if (errs.fullName) h += '<div class="dasp-err">' + esc(errs.fullName) + '</div>';
    h += '</div>';

    h += '<div class="dasp-row">';
    h += '  <div class="dasp-field">';
    h += '    <label for="dasp-email">' + esc(L.emailLabel) + '</label>';
    h += '    <input id="dasp-email" type="email" autocomplete="email" ' +
         'value="' + esc(state.answers.email) + '" placeholder="' + esc(L.emailPh) + '" />';
    if (errs.email) h += '<div class="dasp-err">' + esc(errs.email) + '</div>';
    h += '  </div>';
    h += '  <div class="dasp-field">';
    h += '    <label for="dasp-phone">' + esc(L.phoneLabel) + '</label>';
    h += '    <input id="dasp-phone" type="tel" autocomplete="tel" ' +
         'value="' + esc(state.answers.phone) + '" placeholder="' + esc(L.phonePh) + '" />';
    if (errs.phone) h += '<div class="dasp-err">' + esc(errs.phone) + '</div>';
    h += '  </div>';
    h += '</div>';

    h += '<div class="dasp-field">';
    h += '  <label for="dasp-comments">' + esc(L.commentsLabel) + '</label>';
    h += '  <textarea id="dasp-comments" rows="3" placeholder="' + esc(L.commentsPh) + '">' +
         esc(state.answers.comments) + '</textarea>';
    h += '</div>';

    h += '<label class="dasp-consent">';
    h += '  <input id="dasp-consent" type="checkbox"' + (state.answers.consent ? ' checked' : '') + ' />';
    h += '  <span>' + esc(L.consent) + '</span>';
    h += '</label>';
    if (errs.consent) h += '<div class="dasp-err">' + esc(errs.consent) + '</div>';

    h += '<div class="dasp-actions">';
    h += '  <button type="button" id="dasp-back" class="dasp-btn dasp-btn-ghost">' + esc(L.back) + '</button>';
    h += '  <button type="button" id="dasp-submit" class="dasp-btn dasp-btn-primary"' +
         (state.submitting ? ' disabled' : '') + '>' +
         esc(state.submitting ? L.submitting : L.calculate) + '</button>';
    h += '</div>';
    return h;
  }

  function renderResultStep(L) {
    var r = calcResults();
    var h = '';
    h += '<div class="dasp-thanks">';
    h += '  <p class="dasp-thanks-title">' + esc(L.thanks) + '</p>';
    h += '  <p class="dasp-thanks-sub">' + esc(L.thanksSub) + '</p>';
    h += '</div>';

    h += '<h3 class="dasp-r-title">' + esc(L.rTitle) + '</h3>';
    h += '<div class="dasp-result-grid">';
    h += '  <div class="dasp-r-row"><span>' + esc(L.rGross) + '</span><strong>' + esc(fmt(r.balance)) + '</strong></div>';
    h += '  <div class="dasp-r-row"><span>' + esc(L.rTaxable) + '</span><strong>' + esc(fmt(r.taxable)) + '</strong></div>';
    h += '  <div class="dasp-r-row"><span>' + esc(L.rRate) + '</span><strong>' + (r.rate * 100).toFixed(0) + '%</strong></div>';
    h += '  <div class="dasp-r-row"><span>' + esc(L.rTax) + '</span><strong class="dasp-neg">-' + esc(fmt(r.tax)) + '</strong></div>';
    h += '</div>';

    h += '<div class="dasp-net">';
    h += '  <span class="dasp-net-label">' + esc(L.rNet) + '</span>';
    h += '  <span class="dasp-net-amount">' + esc(fmt(r.net)) + '</span>';
    h += '</div>';

    h += '<div class="dasp-note">' + esc(state.answers.visa === 'whm' ? L.noteWhm : L.noteOther) + '</div>';

    h += '<a href="https://calendly.com/ysaccounting-brisbane/leaving-australia" ' +
         'target="_blank" rel="noopener" class="dasp-btn dasp-btn-cta">';
    h += '  <span>' + esc(L.cta) + '</span>';
    h += '</a>';
    h += '<p class="dasp-cta-sub">' + esc(L.ctaSub) + '</p>';

    h += '<button type="button" id="dasp-restart" class="dasp-btn dasp-btn-ghost dasp-restart">' +
         esc(L.restart) + '</button>';
    return h;
  }

  function wireEvents() {
    var langSel = document.getElementById('dasp-lang-sel');
    if (langSel) {
      langSel.onchange = function () {
        state.lang = this.value;
        try { localStorage.setItem(LANG_STORE_KEY, state.lang); } catch (e) {}
        render();
      };
    }

    if (state.step === 'calc') {
      var balEl = document.getElementById('dasp-balance');
      var tfEl = document.getElementById('dasp-taxfree');
      var visaEl = document.getElementById('dasp-visa');
      var nextBtn = document.getElementById('dasp-next');
      if (balEl) balEl.oninput = function () { state.answers.balance = this.value; };
      if (tfEl) tfEl.oninput = function () { state.answers.taxFree = this.value; };
      if (visaEl) visaEl.onchange = function () { state.answers.visa = this.value; };
      if (nextBtn) nextBtn.onclick = function () {
        var errs = validateCalcStep();
        if (Object.keys(errs).length) { state.showErrors = true; render(); return; }
        state.showErrors = false;
        state.step = 'contact';
        render();
      };
    }

    if (state.step === 'contact') {
      var nameEl = document.getElementById('dasp-name');
      var emailEl = document.getElementById('dasp-email');
      var phoneEl = document.getElementById('dasp-phone');
      var comEl = document.getElementById('dasp-comments');
      var consEl = document.getElementById('dasp-consent');
      var backBtn = document.getElementById('dasp-back');
      var subBtn = document.getElementById('dasp-submit');

      if (nameEl) nameEl.oninput = function () { state.answers.fullName = this.value; };
      if (emailEl) emailEl.oninput = function () { state.answers.email = this.value; };
      if (phoneEl) {
        phoneEl.oninput = function () {
          var cleaned = this.value.replace(/[^\d\s\-()+]/g, '');
          if (cleaned !== this.value) this.value = cleaned;
          state.answers.phone = cleaned;
        };
      }
      if (comEl) comEl.oninput = function () { state.answers.comments = this.value; };
      if (consEl) consEl.onchange = function () { state.answers.consent = this.checked; };
      if (backBtn) backBtn.onclick = function () {
        state.showErrors = false;
        state.step = 'calc';
        render();
      };
      if (subBtn) subBtn.onclick = function () {
        var errs = validateContactStep();
        if (Object.keys(errs).length) { state.showErrors = true; render(); return; }
        state.showErrors = false;
        state.submitting = true;
        render();
        var r = calcResults();
        var ok = submitToWebflow(r);
        setTimeout(function () {
          state.submitting = false;
          state.step = 'result';
          render();
          var app = document.getElementById(APP_ID);
          if (app && app.scrollIntoView) app.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, ok ? 900 : 200);
      };
    }

    if (state.step === 'result') {
      var restartBtn = document.getElementById('dasp-restart');
      if (restartBtn) restartBtn.onclick = function () {
        state.step = 'calc';
        state.showErrors = false;
        state.answers.fullName = '';
        state.answers.email = '';
        state.answers.phone = '';
        state.answers.comments = '';
        state.answers.consent = false;
        render();
      };
    }
  }

  function injectStyles() {
    if (document.getElementById('dasp-styles')) return;
    var css = [
      '#dasp-app{max-width:760px;margin:0 auto;font-family:inherit;color:#0b2545;line-height:1.5}',
      '#dasp-app *,#dasp-app *::before,#dasp-app *::after{box-sizing:border-box}',
      '.dasp-card{background:#fff;border:1px solid #e1e6ef;border-radius:10px;box-shadow:0 6px 24px rgba(11,37,69,0.08);overflow:hidden}',
      '.dasp-header{background:linear-gradient(135deg,#0b2545,#1d4e89);color:#fff;padding:24px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;align-items:flex-start}',
      '.dasp-h2{margin:0 0 4px;font-size:22px;font-weight:600;color:#fff}',
      '.dasp-sub{margin:0;font-size:14px;opacity:0.9;color:#fff}',
      '.dasp-lang-wrap{display:flex;flex-direction:column;gap:4px;font-size:12px;color:rgba(255,255,255,0.85)}',
      '.dasp-lang-label{font-size:11px;text-transform:uppercase;letter-spacing:0.05em}',
      '.dasp-lang-sel{background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.25);border-radius:6px;padding:7px 10px;font-size:14px;cursor:pointer;min-width:140px}',
      '.dasp-lang-sel option{color:#000}',
      '.dasp-body{padding:24px}',
      '.dasp-step{margin:0 0 16px;font-size:12px;font-weight:600;color:#5a6473;text-transform:uppercase;letter-spacing:0.06em}',
      '.dasp-field{margin-bottom:16px}',
      '.dasp-field label{display:block;font-size:14px;font-weight:600;margin-bottom:6px;color:#0b2545}',
      '.dasp-help{display:block;font-size:12px;color:#5a6473;margin-top:4px}',
      '.dasp-field input,.dasp-field select,.dasp-field textarea{width:100%;padding:11px 12px;border:1px solid #e1e6ef;border-radius:8px;font-size:15px;background:#fff;color:#0b2545;font-family:inherit}',
      '.dasp-field textarea{resize:vertical;min-height:72px}',
      '.dasp-field input:focus,.dasp-field select:focus,.dasp-field textarea:focus{outline:none;border-color:#1d4e89;box-shadow:0 0 0 3px rgba(29,78,137,0.12)}',
      '.dasp-prefix{position:relative}',
      '.dasp-prefix span{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#5a6473;font-size:15px;pointer-events:none}',
      '.dasp-prefix input{padding-left:28px}',
      '.dasp-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}',
      '.dasp-err{color:#b54708;font-size:13px;margin-top:6px}',
      '.dasp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:13px 18px;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;font-family:inherit;transition:background 0.15s}',
      '.dasp-btn-primary{background:#1d4e89;color:#fff}',
      '.dasp-btn-primary:hover{background:#0b2545}',
      '.dasp-btn-primary:disabled{opacity:0.6;cursor:wait}',
      '.dasp-btn-ghost{background:#fff;color:#1d4e89;border:1px solid #e1e6ef}',
      '.dasp-btn-ghost:hover{background:#f5f7fb}',
      '.dasp-btn-cta{background:#c9a227;color:#0b2545;margin-top:18px}',
      '.dasp-btn-cta:hover{background:#b18d1f}',
      '.dasp-actions{display:grid;grid-template-columns:1fr 2fr;gap:12px;margin-top:8px}',
      '.dasp-consent{display:flex;gap:10px;align-items:flex-start;font-size:14px;padding:12px;background:#f5f7fb;border-radius:8px;margin:4px 0 16px;cursor:pointer}',
      '.dasp-consent input{width:18px;height:18px;margin-top:2px;flex-shrink:0}',
      '.dasp-thanks{background:#eaf6ef;border:1px solid #16794c;border-radius:8px;padding:14px;margin-bottom:18px}',
      '.dasp-thanks-title{margin:0 0 4px;font-weight:600;color:#16794c}',
      '.dasp-thanks-sub{margin:0;font-size:14px;color:#0b2545}',
      '.dasp-r-title{margin:0 0 12px;font-size:18px;font-weight:600}',
      '.dasp-result-grid{border:1px solid #e1e6ef;border-radius:8px;overflow:hidden}',
      '.dasp-r-row{display:flex;justify-content:space-between;align-items:baseline;padding:12px 14px;font-size:14px;border-bottom:1px solid #e1e6ef}',
      '.dasp-r-row:last-child{border-bottom:none}',
      '.dasp-r-row span{color:#5a6473}',
      '.dasp-r-row strong{color:#0b2545;font-weight:600}',
      '.dasp-neg{color:#b54708 !important}',
      '.dasp-net{margin-top:14px;padding:18px;background:#fff;border:2px solid #16794c;border-radius:8px;text-align:center}',
      '.dasp-net-label{display:block;font-size:13px;color:#5a6473;margin-bottom:4px}',
      '.dasp-net-amount{display:block;font-size:30px;font-weight:700;color:#16794c}',
      '.dasp-note{margin-top:12px;padding:10px 12px;background:#fff8e6;border-left:3px solid #c9a227;font-size:13px;border-radius:4px}',
      '.dasp-cta-sub{margin:8px 0 0;font-size:13px;color:#5a6473;text-align:center}',
      '.dasp-restart{margin-top:14px}',
      '.dasp-disclaimer{margin:0;padding:14px 24px 20px;font-size:12px;color:#5a6473;background:#fafbfd;line-height:1.5}',
      '@media screen and (max-width:767px){.dasp-row{grid-template-columns:1fr}.dasp-header{padding:20px}.dasp-body{padding:20px}.dasp-actions{grid-template-columns:1fr}}',
      '@media screen and (max-width:479px){.dasp-h2{font-size:20px}.dasp-net-amount{font-size:26px}}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = 'dasp-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  function init() {
    var app = document.getElementById(APP_ID);
    if (!app) return;
    state.lang = detectLang();
    injectStyles();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
