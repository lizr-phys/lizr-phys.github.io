(() => {
  const root = document.documentElement;
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "homepage-theme";
  let selectedTheme = null;
  let toggle;

  function applyTheme() {
    const isDark = selectedTheme === null ? systemTheme.matches : selectedTheme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  function restoreTheme() {
    try {
      const savedTheme = window.sessionStorage.getItem(storageKey);
      selectedTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
    } catch {
      // Keep the in-page choice if storage is unavailable.
    }
    applyTheme();
  }

  restoreTheme();
  systemTheme.addEventListener("change", applyTheme);

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) restoreTheme();
  });

  document.addEventListener("DOMContentLoaded", () => {
    toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      selectedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      try {
        window.sessionStorage.setItem(storageKey, selectedTheme);
      } catch {
        // The selection still applies to this page.
      }
      applyTheme();
    });

    applyTheme();
    toggle.hidden = false;
  });
})();
