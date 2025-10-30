//Menu toggle
const toggleBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

(function () {
  const btn = document.getElementById("backToTop");
  const SHOW_AFTER = 300;

  // Throttle ligero con requestAnimationFrame
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > SHOW_AFTER;
          btn.classList.toggle("show", shouldShow);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Acción principal: volver arriba
  function scrollToTop() {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }

  btn.addEventListener("click", scrollToTop);

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  });
})();
