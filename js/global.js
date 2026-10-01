/* ==========================================================================
   BINKOD Tech Web — global.js
   Shared site behavior: mobile navigation and pending public link config.
   No libraries, no tracking, no external requests.
   ========================================================================== */
(function () {
  'use strict';

   /* -----------------------------------------------------------------------
      Site configuration — single source of truth for the public Play Store
      listing URL. All [data-play-link] buttons receive this URL, open in a
      new tab (target="_blank"), and use rel="noopener noreferrer".
      ----------------------------------------------------------------------- */
  var SITE_CONFIG = {
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.binkod.familypath'
  };

  function setupPlayLinks() {
    var links = document.querySelectorAll('[data-play-link]');
    for (var i = 0; i < links.length; i++) {
      (function (link) {
        if (SITE_CONFIG.googlePlayUrl) {
          link.setAttribute('href', SITE_CONFIG.googlePlayUrl);
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        } else {
          link.setAttribute('aria-disabled', 'true');
          link.addEventListener('click', function (event) {
            event.preventDefault();
          });
        }
      })(links[i]);
    }
  }

  function setupNavigation() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-navigation');
    if (!toggle || !nav) {
      return;
    }

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (
        nav.classList.contains('is-open') &&
        !event.target.closest('.site-header')
      ) {
        setOpen(false);
      }
    });
  }

  /* Closes the root page "Applications" <details> menu on Escape or an
     outside click. The menu still works without JavaScript — this only
     adds expected dropdown polish. */
  function setupAppMenus() {
    var menus = document.querySelectorAll('details.nav-apps');
    if (!menus.length) {
      return;
    }

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') {
        return;
      }
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].open) {
          menus[i].removeAttribute('open');
          var summary = menus[i].querySelector('summary');
          if (summary) {
            summary.focus();
          }
        }
      }
    });

    document.addEventListener('click', function (event) {
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].open && !event.target.closest('details.nav-apps')) {
          menus[i].removeAttribute('open');
        }
      }
    });
  }

  setupPlayLinks();
  setupNavigation();
  setupAppMenus();
})();
