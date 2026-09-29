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

    // ---- Submission field names ----
    // Webflow labels a field by data-name, else name, else "Field N".
    // Both bank radios carried value "Radio", so Yes and No were
    // indistinguishable in the email, and the three date inputs arrived
    // as "Field 12/13/14".
    function label(el, dataName, value) {
      if (!el) return;
      el.setAttribute('data-name', dataName);
      if (value) el.value = value;
    }
    label(bankYes, 'Australian bank account', 'Yes');
    label(bankNo,  'Australian bank account', 'No');
    var dateFields = [
      [null,      'Date of birth'],
      [arrival,   'Date of arrival in Australia'],
      [departure, 'Date of departure from Australia (expected)']
    ];
    var dobBlock = form.querySelector('input[type="date"]');
    if (dobBlock) label(dobBlock, dateFields[0][1]);
    for (var d = 1; d < dateFields.length; d++) {
      var di = dateFields[d][0] && dateFields[d][0].querySelector('input[type="date"]');
      label(di, dateFields[d][1]);
    }

    // ---- Validation ----
    // The multi-step library skips required fields that this script
    // toggles (bank details), so people could reach Submit with them
    // empty. Check the current step ourselves before allowing Next, and
    // the whole form before allowing Submit.
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-form="step"]'));

    function fieldLabel(el) {
      var wrap = el.closest('.dates, .form_field-wrapper, .form_step');
      var lb = wrap && wrap.querySelector('.form_label');
      var txt = lb ? lb.textContent : (el.getAttribute('data-name') || el.name || 'a required field');
      return txt.replace(/\(required\)/i, '').trim();
    }

    function firstMissing(scope) {
      var els = scope.querySelectorAll('input, select, textarea');
      var seenGroups = {};
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.disabled || !el.required) continue;
        if (el.type === 'radio') {
          if (seenGroups[el.name]) continue;
          seenGroups[el.name] = true;
          if (!form.querySelector('input[type="radio"][name="' + el.name + '"]:checked')) return el;
        } else if (el.type === 'checkbox') {
          if (!el.checked) return el;
        } else if (el.type === 'file') {
          // Webflow sets data-value only once the upload has finished, and
          // clears the input if it fails (bad type / over 10MB).
          if (!el.getAttribute('data-value')) return el;
        } else if (!String(el.value).trim()) {
          return el;
        }
      }
      return null;
    }

    function currentStep() {
      for (var i = 0; i < steps.length; i++) {
        if (getComputedStyle(steps[i]).display !== 'none') return steps[i];
      }
      return null;
    }

    function showError(el) {
      var uploading = el.type === 'file' && el.files && el.files.length;
      var msg = uploading
        ? 'Your file is still uploading or failed to upload (max 10MB). Please wait or choose it again: ' + fieldLabel(el)
        : 'Please complete: ' + fieldLabel(el);
      var box = document.getElementById('cidv-error');
      if (!box) {
        box = document.createElement('div');
        box.id = 'cidv-error';
        box.setAttribute('role', 'alert');
        box.style.cssText = 'margin:12px 0;padding:10px 14px;border-radius:8px;background:#fdecea;color:#8a1c1c;font-size:.95rem;';
        var nav = form.querySelector('[data-form="next-btn"]');
        (nav && nav.parentNode ? nav.parentNode : form).insertBefore(box, nav || null);
      }
      box.textContent = msg;
      box.style.display = '';
      if (el.type !== 'file' && el.type !== 'radio' && el.focus) { try { el.focus(); } catch (e) {} }
    }

    function clearError() {
      var box = document.getElementById('cidv-error');
      if (box) box.style.display = 'none';
    }

    function block(e) { e.preventDefault(); e.stopImmediatePropagation(); }

    // Capture phase so this runs before the library's own handlers.
    document.addEventListener('click', function (e) {
      var t = e.target && e.target.closest ? e.target.closest('[data-form="next-btn"], [data-form="submit-btn"], [data-form="back-btn"]') : null;
      if (!t || !form.contains(t)) return;
      applyAll();
      if (t.getAttribute('data-form') === 'back-btn') { clearError(); return; }
      var scope = t.getAttribute('data-form') === 'submit-btn' ? form : currentStep();
      var bad = scope && firstMissing(scope);
      if (bad) { block(e); showError(bad); } else { clearError(); }
    }, true);

    form.addEventListener('submit', function (e) {
      applyAll();
      var bad = firstMissing(form);
      if (bad) { block(e); showError(bad); }
    }, true);

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
