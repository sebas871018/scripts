/* ===================================================================
   Client ID Verification Form - residency conditional logic
   taxbne.com.au  /forms/client-id-verification-form
   -------------------------------------------------------------------
   Temporary resident         -> shows Date of arrival, Date of departure,
                                 and the visa upload (all required).
   Permanent resident /
   Australian citizen          -> hides + disables those three fields, and
                                 relabels the passport upload to accept a
                                 passport OR an Australian driver's licence /
                                 proof of age, and shows that guidance note.
   Loaded via a commit-pinned jsDelivr <script> tag in the page's
   Custom code (Before </body>).
   ==================================================================== */
(function () {
  function init() {
    var form = document.getElementById('wf-form-ID-Verification');
    if (!form) return;

    var radios = form.querySelectorAll('input[name="Residency-Status"]');
    if (!radios.length) return;

    var arrival   = document.getElementById('cidv-arrival-field');
    var departure = document.getElementById('cidv-departure-field');
    var visa      = document.getElementById('cidv-visa-field');
    var passport  = document.getElementById('cidv-passport-field');
    var passNote  = document.getElementById('cidv-passport-note');

    var conditional = [arrival, departure, visa];

    var passLabel = passport ? passport.querySelector('.form_label') : null;
    var PASS_TEMP = 'Upload a copy of your passport (required)';
    var PASS_PERM = "Upload your passport or Australian driver's licence / proof of age (required)";

    // Show or hide a whole field block, and enable/disable every control
    // inside it so it can never block validation or submission while hidden.
    function setActive(container, active) {
      if (!container) return;
      container.style.display = active ? '' : 'none';
      var els = container.querySelectorAll('input, select, textarea');
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // Remember each control's original "required" state once.
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

    function currentStatus() {
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
      }
      return '';
    }

    function apply() {
      var status = currentStatus();
      var isTemp = status === 'Temporary resident';
      var isPerm = status === 'Permanent resident or Australian citizen';

      for (var i = 0; i < conditional.length; i++) {
        setActive(conditional[i], isTemp);
      }

      if (passLabel) passLabel.textContent = isPerm ? PASS_PERM : PASS_TEMP;
      if (passNote)  passNote.style.display = isPerm ? '' : 'none';
    }

    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', apply);
    }

    // Re-assert our state after any step navigation, in case the multi-step
    // library re-renders the step and resets inline styles.
    form.querySelectorAll('[data-form="next-btn"], [data-form="back-btn"]').forEach(function (btn) {
      btn.addEventListener('click', function () { setTimeout(apply, 0); });
    });

    apply(); // initial state (nothing selected yet -> conditional fields hidden)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
