/* ==========================================================================
   Family Path Locator — family-path.js
   Family Path-specific client-side behavior.

   Scroll-reveal enhancement for the homepage: elements marked with
   data-reveal (block) or data-reveal-group (staggered children) fade in
   as they enter the viewport. All content exists in the HTML and remains
   fully readable without JavaScript. No analytics, no trackers, no
   backend calls.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var targets = document.querySelectorAll('[data-reveal], [data-reveal-group]');

  function revealAll() {
    for (var i = 0; i < targets.length; i++) {
      targets[i].classList.add('is-revealed');
    }
    root.classList.add('is-reveal-ready');
  }

  if (!targets.length) {
    root.classList.add('is-reveal-ready');
    return;
  }

  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealAll();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -8% 0px' }
  );

  for (var j = 0; j < targets.length; j++) {
    observer.observe(targets[j]);
  }

  root.classList.add('is-reveal-ready');
})();
