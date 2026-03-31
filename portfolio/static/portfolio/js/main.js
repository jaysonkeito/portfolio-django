(function () {
  'use strict';

  /* ── Line Numbers ── */
  function buildLineNumbers() {
    var editor   = document.getElementById('editorPane');
    var lnEl     = document.getElementById('lineNumbers');
    var content  = document.getElementById('codeContent');
    if (!editor || !lnEl || !content) return;

    var count = Math.max(Math.ceil(content.scrollHeight / 22), 30);
    var html  = '';
    for (var i = 1; i <= count; i++) html += '<span>' + i + '</span>';
    lnEl.innerHTML = html;
  }

  /* ── Minimap ── */
  function buildMinimap() {
    var mm = document.getElementById('minimapLines');
    if (!mm) return;
    var widths = ['short', 'medium', 'long', 'long', 'medium', 'short', 'long', 'medium'];
    var html = '';
    for (var i = 0; i < 90; i++) {
      var w = widths[i % widths.length];
      var a = (i % 11 === 0) ? ' accent' : '';
      html += '<div class="minimap-line ' + w + a + '"></div>';
    }
    mm.innerHTML = html;
  }

  /* ── Statusbar line counter ── */
  function bindScrollLn() {
    var editor = document.getElementById('editorPane');
    var sbLn   = document.getElementById('sbLn');
    if (!editor || !sbLn) return;
    editor.addEventListener('scroll', function () {
      sbLn.textContent = 'Ln ' + (Math.floor(editor.scrollTop / 22) + 1) + ', Col 1';
    });
  }

  /* ── Hamburger / Nav Drawer ── */
  function initHamburger() {
    var btn     = document.getElementById('hamburgerBtn');
    var drawer  = document.getElementById('navDrawer');
    var overlay = document.getElementById('navOverlay');
    var closeBtn = document.getElementById('drawerClose');
    if (!btn || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('open');
      overlay.style.display = 'block';
      btn.classList.add('open');
      // Trigger reflow for transition
      overlay.getBoundingClientRect();
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      overlay.classList.remove('show');
      document.body.style.overflow = '';
      // Hide overlay after transition
      setTimeout(function () {
        if (!overlay.classList.contains('show')) {
          overlay.style.display = 'none';
        }
      }, 300);
    }

    btn.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close drawer on nav link click (mobile navigation)
    var links = drawer.querySelectorAll('.nav-drawer-item');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        // Small delay so the page starts loading before drawer closes
        setTimeout(closeDrawer, 80);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  /* ── Init ── */
  buildLineNumbers();
  buildMinimap();
  bindScrollLn();
  initHamburger();

  // Rebuild line numbers after fonts load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(buildLineNumbers);
  }
})();
