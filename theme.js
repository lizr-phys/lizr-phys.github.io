(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let toggle;

  function applyTheme(isDark) {
    root.dataset.theme = isDark ? "dark" : "light";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  function applySystemTheme() {
    applyTheme(systemTheme.matches);
  }

  applySystemTheme();
  systemTheme.addEventListener("change", applySystemTheme);

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    applySystemTheme();
    systemTheme.addEventListener("change", applySystemTheme);
  });

  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      systemTheme.removeEventListener("change", applySystemTheme);
      applyTheme(root.dataset.theme !== "dark");
    });

    applySystemTheme();
    toggle.hidden = false;
  });
})();
