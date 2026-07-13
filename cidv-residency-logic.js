/* ===================================================================
   Client ID Verification Form - conditional logic + styling
   taxbne.com.au  /forms/client-id-verification-form
   -------------------------------------------------------------------
   Runs the form's conditional logic directly (the previous data-answer /
   data-go-to "logic" library became unreliable and left the bank
   question, its branches and the identification step hidden).

   1. Styles the "Select Your Visa Status" first step as tax-return
      calculator-style selectable cards.
   2. Visa status:
        Temporary resident        -> shows Date of arrival, Date of
                                     departure and the visa upload (required).
        Permanent resident /
        Australian citizen          -> hides + disables those three, relabels
                                     the passport upload to accept a passport
                                     OR an Australian driver's licence /
                                     proof of age, and shows that note.
   3. Australian bank account?
        Yes -> shows the account name / BSB / account number fields (required).
        No  -> shows the overseas trust-account fee note instead.

   Loaded via a commit-pinned jsDelivr <script> tag in the page's
   Custom code (Before </body>).
   ==================================================================== */
(function () {
  var CSS = [
    '#cidv-visa-step .form_label.tittle{text-align:center;display:block;margin-bottom:1rem;}',
    '#cidv-vs-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:8px;}',
    '@media (max-width:600px){#cidv-vs-grid{grid-template-columns:1fr;}}',
    '#cidv-vs-grid .f-radio-butn-field-1{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px;padding:1.5rem 1.25rem;min-height:160px;border:2px solid rgba(0,0,0,0.16);border-radius:12px;background:#fff;cursor:pointer;transition:.2s;margin:0;}',
    '#cidv-vs-grid .f-radio-butn-field-1:hover{border-color:rgba(10,31,68,0.5);}',
    '#cidv-vs-grid .w-radio-input{position:absolute !important;opacity:0 !important;width:1px;height:1px;margin:0;padding:0;pointer-events:none;}',
    '#cidv-vs-grid .w-form-label{display:block;font-family:"Space Grotesk",sans-serif;font-weight:700;font-size:1.125rem;line-height:1.4;color:#060606;margin:0;padding:0;max-width:100%;}',
    '#cidv-vs-grid .f-radio-butn-field-1::before{font-size:2rem;line-height:1;}',
    '#cidv-vs-grid .f-radio-butn-field-1:has(#residency-temp)::before{content:"\\2708\\FE0F";}',
    '#cidv-vs-grid .f-radio-butn-field-1:has(#residency-perm)::before{content:"\\1F3E0";}',
    '#cidv-vs-grid .f-radio-butn-field-1:has(input:checked){background:#0a1f44;border-color:#0a1f44;box-shadow:0 8px 20px rgba(10,31,68,0.18);}',
    '#cidv-vs-grid .f-radio-butn-field-1:has(input:checked) .w-form-label{color:#f6f8ff;}'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById('cidv-vs-style')) return;
    var st = document.createElement('style');
    st.id = 'cidv-vs-style';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }
  injectStyles();

  // Show or hide a whole field block, and enable/disable every control
  // inside it so it can never block validation or submission while hidden.
  function setActive(container, active) {
    if (!container) return;
    container.style.display = active ? '' : 'none';
    var els = container.querySelectorAll('input, select, textarea');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el.hasAttribute('data-cidv-req')) {
        el.setAttribute('data-cidv-req', el.required ? '1' : '0');
      }
      if (active) {
        el.disabled = false;
        el.required = el.getAttribute('data-cidv-req') === '1';
      } else {
        el.required = false;
        el.disabled = true;
      }
    }
  }

  function init() {
    var form = document.getElementById('wf-form-ID-Verification');
    if (!form) return;

    // ---- Visa status ----
    var radios    = form.querySelectorAll('input[name="Residency-Status"]');
    var arrival   = document.getElementById('cidv-arrival-field');
    var departure = document.getElementById('cidv-departure-field');
    var visa      = document.getElementById('cidv-visa-field');
    var passport  = document.getElementById('cidv-passport-field');
    var passNote  = document.getElementById('cidv-passport-note');
    var conditional = [arrival, departure, visa];
    var passLabel = passport ? passport.querySelector('.form_label') : null;
    var PASS_TEMP = 'Upload a copy of your passport (required)';
    var PASS_PERM = "Upload your passport or Australian driver's licence / proof of age (required)";

    function currentStatus() {
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
      }
      return '';
    }

    function applyVisa() {
      var status = currentStatus();
      var isTemp = status === 'Temporary resident';
      var isPerm = status === 'Permanent resident or Australian citizen';
      for (var i = 0; i < conditional.length; i++) setActive(conditional[i], isTemp);
      if (passLabel) passLabel.textContent = isPerm ? PASS_PERM : PASS_TEMP;
      if (passNote)  passNote.style.display = isPerm ? '' : 'none';
    }

    // ---- Australian bank account branch ----
    var bankYes       = document.getElementById('bank-yes');
    var bankNo        = document.getElementById('bank-no');
    var bankYesFields = document.getElementById('cidv-bank-yes-fields');
    var bankNoNote    = document.getElementById('cidv-bank-no-note');

    function applyBank() {
      setActive(bankYesFields, !!(bankYes && bankYes.checked));
      setActive(bankNoNote,    !!(bankNo  && bankNo.checked));
    }

    function applyAll() { applyVisa(); applyBank(); }

    for (var i = 0; i < radios.length; i++) radios[i].addEventListener('change', applyVisa);
    if (bankYes) bankYes.addEventListener('change', applyBank);
    if (bankNo)  bankNo.addEventListener('change', applyBank);

    // Re-assert after any step navigation.
    form.querySelectorAll('[data-form="next-btn"], [data-form="back-btn"]').forEach(function (btn) {
      btn.addEventListener('click', function () { setTimeout(applyAll, 0); });
    });

    applyAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
