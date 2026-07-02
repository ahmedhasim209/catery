/**
 * Partial loader — finds <div data-include="path/to/partial.html">
 * fetches the HTML and injects it, then marks the active nav link.
 */
(async function () {
  const slots = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(slots).map(async (el) => {
      const src = el.getAttribute("data-include");
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(res.status);
        el.outerHTML = await res.text();
      } catch (e) {
        console.warn(`[includes] failed to load ${src}:`, e);
      }
    })
  );

  // Mark active nav link based on current path
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav-link]").forEach((a) => {
    const href = a.getAttribute("href").replace(/\/$/, "") || "/";
    if (path === href || (href !== "/" && path.startsWith(href))) {
      a.classList.add("active");
    }
  });

  // Mobile menu toggle — runs after partials are injected
  const toggle = document.getElementById("nav-toggle");
  const close  = document.getElementById("nav-close");
  const menu   = document.getElementById("mobile-menu");

  if (toggle && menu) {
    function openMenu() {
      menu.classList.add("open");
      document.body.classList.add("nav-open");
    }
    function closeMenu() {
      menu.classList.remove("open");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", openMenu);
    if (close) close.addEventListener("click", closeMenu);

    // Close on backdrop tap
    menu.addEventListener("click", function (e) {
      if (e.target === menu) closeMenu();
    });
  }
})();
