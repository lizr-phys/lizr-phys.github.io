(() => {
  const dialog = document.getElementById("textbook-access-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const form = document.getElementById("textbook-access-form");
  const answer = document.getElementById("textbook-answer");
  const error = document.getElementById("textbook-access-error");
  const acceptedAnswers = new Set([
    "dirac",
    "pauldirac",
    "pauladrienmauricedirac",
    "paulamdirac",
    "pamdirac",
    "\u72c4\u62c9\u514b",
    "\u4fdd\u7f57\u72c4\u62c9\u514b",
    "\u4fdd\u7f57\u963f\u5fb7\u91cc\u5b89\u83ab\u91cc\u65af\u72c4\u62c9\u514b",
    "\u4fdd\u7f85\u72c4\u62c9\u514b"
  ]);
  let destination;
  let trigger;

  const clearError = () => {
    error.textContent = "";
    answer.removeAttribute("aria-invalid");
  };

  document.querySelectorAll("[data-textbook-access]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (dialog.open) return;

      destination = link.href;
      trigger = link;
      form.reset();
      clearError();
      dialog.showModal();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const normalized = answer.value
      .normalize("NFKC")
      .toLowerCase()
      .replace(/[\s.,\u00b7\u2022\u30fb\u2010-\u2015-]+/g, "");

    if (!acceptedAnswers.has(normalized)) {
      error.textContent = normalized
        ? "Incorrect answer. Please try again."
        : "Please enter an answer.";
      answer.setAttribute("aria-invalid", "true");
      answer.focus();
      answer.select();
      return;
    }

    dialog.close();
    window.location.assign(destination);
  });

  answer.addEventListener("input", clearError);
  dialog.querySelector("[data-textbook-cancel]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    trigger?.focus({ preventScroll: true });
  });
})();
