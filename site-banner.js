/*!
  Y&S Accounting - site-wide deadline banner (Late Lodgement Registration)
  ------------------------------------------------------------------------
  Repo:   sebas871018/scripts
  File:   site-banner.js
  Loaded: on every page from Webflow > Site settings > Custom code (footer),
          commit-pinned through jsDelivr.

  What it does
    - Shows a fixed bar across the top of every page until 31 October 2026,
      23:59 Brisbane time, then renders nothing at all (no cleanup needed).
    - Two actions: register for late lodgement (extra time to 15 May 2027),
      or book a normal tax return.
    - Text follows the page locale (en / es / pt) from the html lang attribute.
    - Skips the registration page itself.
    - A close button hides it for the rest of the Brisbane day on that device.
    - Pushes the page and the Webflow navbar down by the bar's height so the
      navbar is never covered, on fixed, absolute and in-flow navbars alike.

  Change the copy in COPY below, the dates in DEADLINE_ISO / DEADLINE_UTC, and
  the destinations in LLR_PATH / BOOK_PATH. Push, then pin the new commit in the
  site footer code.
*/
(function () {
  'use strict';

  var DEADLINE_ISO = '2026-10-31T23:59:59+10:00'; // Brisbane, no daylight saving
  var DEADLINE_UTC = Date.UTC(2026, 9, 31);        // for the days-left count
  var LLR_PATH     = '/forms/late-lodgement-registration';
  var BOOK_PATH    = '/services/tax-return';
  var STORAGE_KEY  = 'ys-llr-banner-dismissed';
  var ID           = 'ys-llr-banner';

  var COPY = {
    en: {
      lead:  'Tax return not lodged yet?',
      body:  'Register by 31 October and, with earlier returns up to date, lodge as late as 15 May 2027.',
      cta1:  'Get extra time',
      cta2:  'Book a tax return',
      close: 'Close',
      days:  function (n) { return n <= 0 ? 'Last day' : n === 1 ? '1 day left' : n + ' days left'; }
    },
    es: {
      lead:  '¿Todavía no presentaste tu declaración de impuestos?',
      body:  'Regístrate con nosotros antes del 31 de octubre y, si tus declaraciones anteriores están al día, preséntala hasta el 15 de mayo de 2027.',
      cta1:  'Obtener más plazo',
      cta2:  'Reservar mi declaración',
      close: 'Cerrar',
      days:  function (n) { return n <= 0 ? 'Último día' : n === 1 ? 'Queda 1 día' : 'Quedan ' + n + ' días'; }
    },
    pt: {
      lead:  'Ainda não entregou sua declaração de imposto?',
      body:  'Cadastre-se conosco até 31 de outubro e, se suas declarações anteriores estiverem em dia, entregue até 15 de maio de 2027.',
      cta1:  'Ganhar mais prazo',
      cta2:  'Agendar minha declaração',
      close: 'Fechar',
      days:  function (n) { return n <= 0 ? 'Último dia' : n === 1 ? 'Falta 1 dia' : 'Faltam ' + n + ' dias'; }
    }
  };

  var CSS = [
    '#' + ID + '{position:fixed;top:0;left:0;right:0;z-index:1001;background:#0a1f44;color:#fff;font-family:Montserrat,"Space Grotesk",system-ui,sans-serif;box-shadow:0 2px 10px rgba(10,31,68,.25);}',
    '#' + ID + ' .ysb-inner{max-width:1200px;margin:0 auto;padding:8px 56px 8px 24px;display:flex;align-items:center;gap:10px 20px;}',
    '#' + ID + ' .ysb-text{flex:1 1 auto;min-width:0;font-size:14px;line-height:1.4;}',
    '#' + ID + ' .ysb-days{display:inline-block;vertical-align:middle;margin-right:10px;background:#fed741;color:#0a1f44;font-weight:700;font-size:12px;letter-spacing:.02em;padding:3px 10px;border-radius:999px;white-space:nowrap;}',
    '#' + ID + ' .ysb-lead{font-weight:700;margin-right:6px;}',
    '#' + ID + ' .ysb-body{color:rgba(255,255,255,.88);}',
    '#' + ID + ' .ysb-actions{flex:0 0 auto;display:flex;gap:8px;}',
    '#' + ID + ' .ysb-btn{display:inline-block;padding:8px 16px;border-radius:999px;font-size:13px;font-weight:700;line-height:1.2;text-decoration:none;white-space:nowrap;transition:transform .15s,background .15s,color .15s;}',
    '#' + ID + ' .ysb-btn:hover{transform:translateY(-1px);}',
    '#' + ID + ' .ysb-btn-primary{background:#fed741;color:#0a1f44;}',
    '#' + ID + ' .ysb-btn-primary:hover{background:#ffe066;}',
    '#' + ID + ' .ysb-btn-ghost{color:#fff;border:1.5px solid rgba(255,255,255,.7);}',
    '#' + ID + ' .ysb-btn-ghost:hover{background:rgba(255,255,255,.12);border-color:#fff;}',
    '#' + ID + ' .ysb-close{position:absolute;top:50%;right:12px;transform:translateY(-50%);width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#fff;font-size:22px;line-height:32px;text-align:center;cursor:pointer;opacity:.75;padding:0;}',
    '#' + ID + ' .ysb-close:hover{opacity:1;background:rgba(255,255,255,.12);}',
    '#' + ID + ' .ysb-close:focus-visible,#' + ID + ' .ysb-btn:focus-visible{outline:2px solid #fed741;outline-offset:2px;}',
    '@media (max-width:767px){',
    '#' + ID + ' .ysb-inner{flex-wrap:wrap;justify-content:center;padding:10px 44px 10px 14px;gap:8px 12px;}',
    '#' + ID + ' .ysb-text{flex:1 1 100%;font-size:13px;text-align:center;}',
    '#' + ID + ' .ysb-body{display:none;}',
    '#' + ID + ' .ysb-actions{flex:1 1 100%;}',
    '#' + ID + ' .ysb-btn{flex:1 1 0;text-align:center;padding:8px 10px;font-size:12.5px;}',
    '#' + ID + ' .ysb-close{right:6px;}',
    '}'
  ].join('\n');

  // ---- Guards ----------------------------------------------------------
  var now = new Date();
  if (now.getTime() > new Date(DEADLINE_ISO).getTime()) return;
  if (location.pathname.indexOf(LLR_PATH) !== -1) return;

  function brisbaneDay(d) {
    var s = new Date(d.getTime() + 10 * 60 * 60 * 1000);
    return { y: s.getUTCFullYear(), m: s.getUTCMonth(), d: s.getUTCDate() };
  }
  var bp       = brisbaneDay(now);
  var todayKey = bp.y + '-' + (bp.m + 1) + '-' + bp.d;
  var daysLeft = Math.round((DEADLINE_UTC - Date.UTC(bp.y, bp.m, bp.d)) / 86400000);

  try { if (window.localStorage.getItem(STORAGE_KEY) === todayKey) return; } catch (e) {}

  var lang   = (document.documentElement.lang || 'en').toLowerCase().slice(0, 2);
  var locale = COPY[lang] ? lang : 'en';
  var t      = COPY[locale];
  var prefix = locale === 'en' ? '' : '/' + locale;

  // ---- Build -----------------------------------------------------------
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function build() {
    if (document.getElementById(ID)) return;

    var style = el('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var bar = el('div');
    bar.id = ID;
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', t.lead);

    var inner = el('div', 'ysb-inner');
    var text  = el('div', 'ysb-text');
    text.appendChild(el('span', 'ysb-days', t.days(daysLeft)));
    text.appendChild(el('span', 'ysb-lead', t.lead));
    text.appendChild(el('span', 'ysb-body', t.body));

    var actions = el('div', 'ysb-actions');
    var a1 = el('a', 'ysb-btn ysb-btn-primary', t.cta1);
    a1.href = LLR_PATH;                 // the form is English only
    var a2 = el('a', 'ysb-btn ysb-btn-ghost', t.cta2);
    a2.href = prefix + BOOK_PATH;
    actions.appendChild(a1);
    actions.appendChild(a2);

    var close = el('button', 'ysb-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', t.close);

    inner.appendChild(text);
    inner.appendChild(actions);
    bar.appendChild(inner);
    bar.appendChild(close);
    document.body.insertBefore(bar, document.body.firstChild);

    // ---- Offsets: push the page and any top-anchored navbar down ----
    var basePad = parseFloat(getComputedStyle(document.body).paddingTop) || 0;
    var navs = [];
    var candidates = document.querySelectorAll('.w-nav, nav, header');
    for (var i = 0; i < candidates.length; i++) {
      var n = candidates[i];
      if (n === bar || bar.contains(n)) continue;
      var cs = getComputedStyle(n);
      var pos = cs.position;
      if ((pos === 'fixed' || pos === 'absolute' || pos === 'sticky') && (parseFloat(cs.top) || 0) === 0) {
        navs.push(n);
      }
    }

    function applyOffset() {
      var h = bar.offsetHeight;
      document.body.style.setProperty('padding-top', (basePad + h) + 'px', 'important');
      for (var j = 0; j < navs.length; j++) navs[j].style.setProperty('top', h + 'px', 'important');
    }
    function clearOffset() {
      document.body.style.removeProperty('padding-top');
      for (var j = 0; j < navs.length; j++) navs[j].style.removeProperty('top');
    }

    applyOffset();
    if (window.ResizeObserver) {
      new ResizeObserver(applyOffset).observe(bar);
    } else {
      window.addEventListener('resize', applyOffset);
    }

    close.addEventListener('click', function () {
      try { window.localStorage.setItem(STORAGE_KEY, todayKey); } catch (e) {}
      clearOffset();
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
