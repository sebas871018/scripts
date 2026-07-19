/*
 * bq-qualifier.js - Blog lead qualifier for taxbne.com.au
 * (c) SGF AUSTRALIA PTY. LTD. (ABN 39 615 320 048). All rights reserved.
 *
 * 4-step qualifier rendered into #bq-app on the Blog Posts Template.
 * Round-trips every submission through the hidden Webflow form #wf-bq-form,
 * then redirects qualified leads (tier A/B bookers) to the category Calendly
 * event read from #bq-calendly-src. Tier C gets a nurture thank-you.
 * Pushes dataLayer events for GTM: bq_step, bq_answer, bq_submit, bq_redirect.
 */
(function () {
  'use strict';

  var mount = document.getElementById('bq-app');
  if (!mount) return;

  var FALLBACK_CALENDLY = 'https://calendly.com/sebastiangarcia/business-advisory-strategy-session-aud-250';

  /* ---------- context from the page ---------- */
  function readCalendly() {
    var el = document.getElementById('bq-calendly-src');
    var v = el ? (el.textContent || '').trim() : '';
    return v.indexOf('http') === 0 ? v : FALLBACK_CALENDLY;
  }
  function readCategory() {
    var el = document.querySelector('.blog-sidebar-post-category');
    var v = el ? (el.textContent || '').trim() : '';
    return v || 'Unknown';
  }
  var CALENDLY = readCalendly();
  var CATEGORY = readCategory();
  var POST = (location.pathname.split('/').pop() || '').trim();

  /* ---------- analytics ---------- */
  function dl(event, data) {
    window.dataLayer = window.dataLayer || [];
    var p = { event: event, bq_category: CATEGORY, bq_post: POST };
    if (data) { for (var k in data) { if (Object.prototype.hasOwnProperty.call(data, k)) p[k] = data[k]; } }
    window.dataLayer.push(p);
  }

  /* ---------- state ---------- */
  var answers = { situation: '', complexity: '', commitment: '', name: '', email: '', phone: '' };
  var step = 0; /* 0..3 questions/details, 4 done */
  var touched = { name: false, email: false };
  var submitted = false;

  var RE_NAME = /^[a-zA-ZÀ-ɏḀ-ỿ\s\-'.]+$/;
  var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- content ---------- */
  var STEPS = [
    {
      key: 'situation',
      q: 'Which best describes you?',
      opts: [
        { v: 'individual', label: 'Employee or individual taxpayer' },
        { v: 'property', label: 'Property investor' },
        { v: 'business', label: 'Running or starting a business' },
        { v: 'international', label: 'Moving to or from Australia, or international income' },
        { v: 'researching', label: 'Just researching for now' }
      ]
    },
    {
      key: 'complexity',
      q: 'How complex is your situation?',
      opts: [
        { v: 'simple', label: 'Straightforward - one or two income sources' },
        { v: 'moderate', label: 'A few moving parts - investments, deductions or a side business' },
        { v: 'complex', label: 'Complex - multiple entities, CGT events, restructures or overseas issues' }
      ]
    },
    {
      key: 'commitment',
      q: 'Our advisory sessions are AUD $250 for 60 minutes, credited to your services if you engage. How would you like to proceed?',
      opts: [
        { v: 'book', label: 'I am ready to book a session' },
        { v: 'question', label: 'I have a question first' },
        { v: 'notyet', label: 'Not at this stage - send me useful guides instead' }
      ]
    }
  ];

  function tierFor(a) {
    if (a.commitment === 'book') {
      return (a.complexity === 'complex' || a.situation === 'international') ? 'A' : 'B';
    }
    return 'C';
  }

  /* ---------- styles ---------- */
  var css = '' +
    '#bq-app{font-family:inherit}' +
    '.bq-steps{display:flex;gap:6px;margin-bottom:18px}' +
    '.bq-steps span{flex:1;height:5px;border-radius:3px;background:#3a4c78}' +
    '.bq-steps span.on{background:#e04b3a}' +
    '.bq-q{font-size:17px;font-weight:700;color:#fff;margin-bottom:14px;line-height:1.45}' +
    '.bq-opt{display:block;width:100%;text-align:left;background:#24365e;border:1px solid #3a4c78;color:#e8ecf5;border-radius:8px;padding:13px 16px;font-size:14.5px;margin-bottom:9px;cursor:pointer;transition:border-color .15s,background .15s}' +
    '.bq-opt:hover{border-color:#8fa3cf;background:#2b4070}' +
    '.bq-back{background:none;border:none;color:#9aa7c4;font-size:13px;cursor:pointer;text-decoration:underline;padding:0;margin-top:6px}' +
    '.bq-field{width:100%;box-sizing:border-box;border:1px solid #3a4c78;background:#24365e;color:#fff;border-radius:8px;padding:12px 14px;font-size:14.5px;margin-bottom:4px}' +
    '.bq-field::placeholder{color:#8fa3cf}' +
    '.bq-field.bq-invalid{border-color:#e04b3a}' +
    '.bq-err{color:#ffb4a8;font-size:12.5px;margin:2px 0 8px;display:none}' +
    '.bq-label{color:#c4cbdb;font-size:13px;margin:10px 0 6px;display:block}' +
    '.bq-go{width:100%;background:#e04b3a;color:#fff;border:none;border-radius:8px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;margin-top:12px}' +
    '.bq-go:disabled{opacity:.55;cursor:default}' +
    '.bq-done{color:#fff}' +
    '.bq-done h3{font-size:20px;font-weight:800;margin:0 0 8px;color:#fff}' +
    '.bq-done p{color:#c4cbdb;font-size:14.5px;line-height:1.6;margin:0 0 14px}' +
    '.bq-done a{color:#fff;text-decoration:underline}' +
    '.bq-micro{color:#9aa7c4;font-size:12px;margin-top:12px}';
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ---------- helpers ---------- */
  function esc(s) {
    if (s == null) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function progress(n) {
    var h = '<div class="bq-steps">';
    for (var i = 0; i < 4; i++) h += '<span class="' + (i <= n ? 'on' : '') + '"></span>';
    return h + '</div>';
  }
  function validateName(v) {
    v = v.trim();
    if (v.length < 2) return 'Please enter your name';
    if (!RE_NAME.test(v)) return 'Please use letters only';
    return '';
  }
  function validateEmail(v) {
    if (!RE_EMAIL.test(v.trim())) return 'Please enter a valid email address';
    return '';
  }

  /* ---------- hidden form round-trip ---------- */
  function setHidden(id, val) {
    var el = document.getElementById(id);
    if (el) el.value = val;
  }
  function submitHidden(tier, onDone) {
    if (submitted) { onDone(); return; }
    submitted = true;
    setHidden('bq-situation', answers.situation);
    setHidden('bq-complexity', answers.complexity);
    setHidden('bq-commitment', answers.commitment);
    setHidden('bq-tier', tier);
    setHidden('bq-category', CATEGORY);
    setHidden('bq-post', POST);
    setHidden('bq-full-name', answers.name);
    setHidden('bq-email', answers.email);
    setHidden('bq-phone', answers.phone);
    setHidden('bq-answers',
      'situation: ' + answers.situation + ' | complexity: ' + answers.complexity +
      ' | commitment: ' + answers.commitment + ' | tier: ' + tier +
      ' | category: ' + CATEGORY + ' | post: ' + POST);
    var btn = document.getElementById('bq-submit-btn');
    if (btn) btn.click();
    /* give Webflow a moment to send, then continue regardless */
    setTimeout(onDone, 1800);
  }

  /* ---------- render ---------- */
  function render() {
    if (step < 3) return renderQuestion(step);
    if (step === 3) return renderDetails();
  }

  function renderQuestion(n) {
    var s = STEPS[n];
    dl('bq_step', { bq_step: n + 1 });
    var h = progress(n) + '<div class="bq-q">' + esc(s.q) + '</div>';
    for (var i = 0; i < s.opts.length; i++) {
      h += '<button type="button" class="bq-opt" data-v="' + esc(s.opts[i].v) + '">' + esc(s.opts[i].label) + '</button>';
    }
    if (n > 0) h += '<button type="button" class="bq-back">Back</button>';
    mount.innerHTML = h;

    var opts = mount.querySelectorAll('.bq-opt');
    for (var j = 0; j < opts.length; j++) {
      opts[j].onclick = function () {
        answers[s.key] = this.getAttribute('data-v');
        dl('bq_answer', { bq_question: s.key, bq_value: answers[s.key] });
        step = n + 1;
        render();
      };
    }
    var back = mount.querySelector('.bq-back');
    if (back) back.onclick = function () { step = n - 1; render(); };
  }

  function renderDetails() {
    dl('bq_step', { bq_step: 4 });
    var tier = tierFor(answers);
    var lead = tier === 'C'
      ? 'Leave your details and we will email you our most useful guides for your situation.'
      : 'Leave your details and we will take you straight to the booking calendar.';
    var h = progress(3) +
      '<div class="bq-q">Nearly done</div>' +
      '<p class="bq-label" style="margin-top:0">' + esc(lead) + '</p>' +
      '<label class="bq-label" for="bqf-name">Full name</label>' +
      '<input class="bq-field" id="bqf-name" type="text" placeholder="e.g. Jane Smith" value="' + esc(answers.name) + '">' +
      '<div class="bq-err" id="bqe-name"></div>' +
      '<label class="bq-label" for="bqf-email">Email</label>' +
      '<input class="bq-field" id="bqf-email" type="email" placeholder="you@example.com" value="' + esc(answers.email) + '">' +
      '<div class="bq-err" id="bqe-email"></div>' +
      '<label class="bq-label" for="bqf-phone">Phone (optional)</label>' +
      '<input class="bq-field" id="bqf-phone" type="tel" placeholder="04xx xxx xxx" value="' + esc(answers.phone) + '">' +
      '<button type="button" class="bq-go" id="bq-go">' + (tier === 'C' ? 'Send me the guides' : 'Continue to booking') + '</button>' +
      '<button type="button" class="bq-back">Back</button>' +
      '<div class="bq-micro">Your details stay with Y&amp;S Accounting. No spam, unsubscribe any time.</div>';
    mount.innerHTML = h;

    var nameEl = document.getElementById('bqf-name');
    var emailEl = document.getElementById('bqf-email');
    var phoneEl = document.getElementById('bqf-phone');
    var goBtn = document.getElementById('bq-go');

    function show(el, errId, msg) {
      var errEl = document.getElementById(errId);
      if (msg) { errEl.textContent = msg; errEl.style.display = 'block'; el.classList.add('bq-invalid'); }
      else { errEl.textContent = ''; errEl.style.display = 'none'; el.classList.remove('bq-invalid'); }
    }
    function validate(force) {
      var ne = validateName(nameEl.value);
      var ee = validateEmail(emailEl.value);
      show(nameEl, 'bqe-name', (touched.name || force) ? ne : '');
      show(emailEl, 'bqe-email', (touched.email || force) ? ee : '');
      return !ne && !ee;
    }
    nameEl.onblur = function () { touched.name = true; validate(false); };
    emailEl.onblur = function () { touched.email = true; validate(false); };
    nameEl.oninput = function () { answers.name = this.value; validate(false); };
    emailEl.oninput = function () { answers.email = this.value; validate(false); };
    phoneEl.oninput = function () {
      var cleaned = this.value.replace(/[^\d\s\-()+]/g, '');
      if (cleaned !== this.value) this.value = cleaned;
      answers.phone = this.value;
    };
    mount.querySelector('.bq-back').onclick = function () { step = 2; render(); };

    goBtn.onclick = function () {
      if (!validate(true)) return;
      answers.name = nameEl.value.trim();
      answers.email = emailEl.value.trim();
      answers.phone = phoneEl.value.trim();
      goBtn.disabled = true;
      goBtn.textContent = 'One moment...';
      var tierNow = tierFor(answers);
      dl('bq_submit', { bq_tier: tierNow });
      submitHidden(tierNow, function () { finish(tierNow); });
    };
  }

  function finish(tier) {
    if (tier === 'A' || tier === 'B') {
      dl('bq_redirect', { bq_tier: tier, bq_target: CALENDLY });
      mount.innerHTML = '<div class="bq-done"><h3>Taking you to the calendar</h3>' +
        '<p>Opening the booking page for a 60-minute session (AUD $250, credited to your services if you engage). ' +
        'If nothing happens, <a href="' + esc(CALENDLY) + '">open the booking calendar here</a>.</p></div>';
      setTimeout(function () { window.location.href = CALENDLY; }, 900);
      return;
    }
    if (answers.commitment === 'question') {
      mount.innerHTML = '<div class="bq-done"><h3>Thanks - we will be in touch</h3>' +
        '<p>We have your question details and will reply by email within one business day. ' +
        'Prefer not to wait? <a href="/contact-us">Contact us directly</a>.</p></div>';
      return;
    }
    mount.innerHTML = '<div class="bq-done"><h3>Guides on the way</h3>' +
      '<p>We will email you our most useful guides for your situation. ' +
      'When you are ready, our services are one click away: <a href="/services/tax-planning">tax planning</a>, ' +
      '<a href="/services/tax-return">tax returns</a> and <a href="/services/business-advice">business advice</a>.</p></div>';
  }

  render();
})();
