(() => {
  "use strict";

  const root = document.getElementById("physlib-lean-demo");
  if (!root) return;

  const play = root.querySelector("[data-lean-play]");
  const next = root.querySelector("[data-lean-next]");
  const reset = root.querySelector("[data-lean-reset]");
  const count = root.querySelector("[data-lean-count]");
  const status = root.querySelector("[data-lean-status]");
  const goal = root.querySelector("[data-lean-goal]");
  const explanation = root.querySelector("[data-lean-explanation]");
  const state = root.querySelector(".lean-state");
  const source = root.querySelector(".lean-source");
  const sourceCode = source.querySelector("code");
  const panel = root.querySelector(".lean-workspace");
  const tabs = [...root.querySelectorAll("[data-lean-example]")];
  const picker = root.querySelector("[data-lean-select]");
  const library = root.querySelector("[data-lean-library]");
  const context = root.querySelector("[data-lean-context]");
  const download = root.querySelector("[data-lean-download]");
  const reference = root.querySelector("[data-lean-reference]");
  let lines = [...root.querySelectorAll("[data-lean-line]")];
  const preference = matchMedia("(prefers-reduced-motion: reduce)");

  // The source files are compiled with Lean 4.33.0 and Mathlib db584cd.
  // Cauchy-Schwarz uses explicitly disclosed abbreviations in the goal panel;
  // the downloadable source contains the complete two-dimensional proof.
  // This component never evaluates Lean or sends code to a remote service.
  const examples = {
    sqrt: {
      source: sourceCode.textContent.trimEnd(),
      focusLines: [4, 5, 6, 7],
      library: "Lean 4 / Mathlib",
      file: "sqrt-two.lean",
      reference: "https://leanprover-community.github.io/mathlib4_docs/Mathlib/NumberTheory/Real/Irrational.html#irrational_sqrt_natCast_iff",
      referenceLabel: "Mathlib theorem",
      context: "This Mathlib example illustrates the proof-checking approach that Physlib applies to physics. These examples reuse library results and are separate from my contributions listed below.",
      steps: [
        {
          goal: "⊢ Irrational √2",
          explanation: "The claim: the square root of 2 cannot be written as a ratio of integers."
        },
        {
          goal: "⊢ ¬IsSquare 2",
          explanation: "Apply a Mathlib equivalence: it is enough to prove that 2 is not a perfect square."
        },
        {
          goal: "hprime : Nat.Prime 2\n⊢ ¬IsSquare 2",
          explanation: "Name a checked fact: 2 is prime. It is now available in the local proof context as hprime."
        },
        {
          goal: "No goals remaining",
          explanation: "A prime is not a perfect square. Apply that fact to hprime to close the final goal."
        }
      ]
    },
    cauchy: {
      source: [
        "import Mathlib.Data.Real.Basic",
        "import Mathlib.Tactic.Ring",
        "",
        "theorem cauchy_schwarz_two_dim (a b c d : ℝ) :",
        "    (a * c + b * d) ^ 2 ≤",
        "      (a ^ 2 + b ^ 2) * (c ^ 2 + d ^ 2) := by",
        "  have hgap :",
        "      (a ^ 2 + b ^ 2) * (c ^ 2 + d ^ 2) -",
        "        (a * c + b * d) ^ 2 = (a * d - b * c) ^ 2 := by",
        "    ring",
        "  have hnonneg : 0 ≤ (a * d - b * c) ^ 2 := sq_nonneg _",
        "  exact sub_nonneg.mp (hgap.symm ▸ hnonneg)"
      ].join("\n"),
      focusLines: [6, 10, 11, 12],
      library: "Lean 4 / Mathlib",
      file: "cauchy-schwarz.lean",
      reference: "https://leanprover-community.github.io/mathlib4_docs/Mathlib/Tactic/Ring.html",
      referenceLabel: "Ring tactic",
      context: "This is a complete proof of the two-dimensional real Cauchy–Schwarz inequality. It proves Lagrange's identity with ring, uses the nonnegativity of a square, then rewrites that fact to obtain the inequality; it does not invoke a Cauchy–Schwarz theorem. The recorded summaries use u = (a, b), v = (c, d), and gap = ‖u‖²‖v‖² − (u·v)²; the source writes every coefficient explicitly. This mathematical example is separate from my physics contributions below.",
      steps: [
        {
          goal: "⊢ (u·v)² ≤ ‖u‖²‖v‖²",
          explanation: "For two real vectors, compare the squared dot product with the product of squared lengths."
        },
        {
          goal: "hgap : gap = (ad − bc)²\n⊢ (u·v)² ≤ ‖u‖²‖v‖²",
          explanation: "ring verifies the identity: the difference between the two sides is a square."
        },
        {
          goal: "hnonneg : 0 ≤ (ad − bc)²\n⊢ (u·v)² ≤ ‖u‖²‖v‖²",
          explanation: "sq_nonneg proves the square is nonnegative, so the difference cannot be negative."
        },
        {
          goal: "No goals remaining",
          explanation: "Rewrite the nonnegative square as the difference; sub_nonneg.mp yields the inequality."
        }
      ]
    }
  };

  const duration = 2600;
  let step = 0;
  let playing = false;
  let elapsed = 0;
  let lastTime = null;
  let frame = null;
  let visible = false;
  let goalAnimation = null;
  let example = "sqrt";

  function setSource(proof) {
    const fragment = document.createDocumentFragment();
    proof.source.split("\n").forEach((text, index) => {
      if (index) fragment.append("\n");
      const line = document.createElement("span");
      line.className = "lean-line";
      line.dataset.line = String(index + 1);
      const focus = proof.focusLines.indexOf(index + 1);
      if (focus !== -1) line.dataset.leanLine = String(focus);
      const keywords = /\b(import|open|theorem|fun|by|funext|have|exact|apply|intro)\b/g;
      let start = 0;
      for (const match of text.matchAll(keywords)) {
        line.append(text.slice(start, match.index));
        const keyword = document.createElement("span");
        keyword.className = "lean-keyword";
        keyword.textContent = match[0];
        line.append(keyword);
        start = match.index + match[0].length;
      }
      line.append(text.slice(start));
      fragment.append(line);
    });
    sourceCode.replaceChildren(fragment);
    lines = [...root.querySelectorAll("[data-lean-line]")];
    source.scrollTop = 0;
  }

  function keepLineVisible(animate) {
    const line = lines[step];
    if (!line) return;
    const box = source.getBoundingClientRect();
    const lineBox = line.getBoundingClientRect();
    let top = source.scrollTop;
    if (lineBox.bottom > box.bottom) top += lineBox.bottom - box.bottom;
    else if (lineBox.top < box.top) top -= box.top - lineBox.top;
    else return;
    source.scrollTo({ top, behavior: animate && !preference.matches ? "smooth" : "instant" });
  }

  function selectExample(name) {
    if (name === example || !Object.hasOwn(examples, name)) return;
    stop();
    example = name;
    step = 0;
    elapsed = 0;
    const proof = examples[name];
    root.dataset.example = name;
    picker.value = name;
    tabs.forEach(tab => {
      const selected = tab.dataset.leanExample === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", `lean-tab-${name}`);
    library.textContent = proof.library;
    context.textContent = proof.context;
    download.setAttribute("href", `assets/${proof.file}`);
    download.setAttribute("download", proof.file);
    reference.href = proof.reference;
    reference.textContent = proof.referenceLabel;
    setSource(proof);
    render(true);
  }

  tabs.forEach((tab, index) => {
    tab.disabled = false;
    tab.addEventListener("click", () => selectExample(tab.dataset.leanExample));
    tab.addEventListener("keydown", event => {
      let target;
      if (event.key === "ArrowRight") target = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") target = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") target = 0;
      else if (event.key === "End") target = tabs.length - 1;
      else return;
      event.preventDefault();
      selectExample(tabs[target].dataset.leanExample);
      tabs[target].focus();
    });
  });
  picker.disabled = false;
  picker.addEventListener("change", () => selectExample(picker.value));

  function updateControls() {
    play.textContent = playing ? "Pause" : step === 3 ? "Replay" : "Play";
    play.setAttribute("aria-pressed", String(playing));
    play.hidden = preference.matches;
    next.disabled = step === 3;
    reset.disabled = step === 0 && !playing && elapsed === 0;
    root.dataset.motion = playing ? "playing" : "static";
  }

  function stop() {
    playing = false;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    lastTime = null;
    updateControls();
  }

  function render(animate = false) {
    root.dataset.step = String(step);
    root.style.setProperty("--lean-progress", "0");
    lines.forEach((line, index) => {
      line.classList.toggle("is-current", index === step);
      line.classList.toggle("is-done", index < step);
    });
    status.textContent = step === 3 ? "Recorded result" : example === "sqrt" ? "Recorded goal" : "Recorded goal · shortened";
    goal.textContent = examples[example].steps[step].goal;
    explanation.textContent = examples[example].steps[step].explanation;
    goal.scrollTop = 0;
    state.scrollTop = 0;
    explanation.scrollTop = 0;
    count.textContent = `${step} / 3 steps`;
    keepLineVisible(animate);
    if (goalAnimation) goalAnimation.cancel();
    if (animate && !preference.matches && typeof state.animate === "function") {
      goalAnimation = state.animate(
        [{ opacity: 0.45, transform: "translateY(3px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 180, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    }
    updateControls();
  }

  function advance() {
    if (step === 3) return;
    step += 1;
    elapsed = 0;
    render(true);
    if (step === 3) stop();
  }

  function tick(time) {
    frame = null;
    if (!playing) return;
    if (document.hidden || !visible || preference.matches) {
      stop();
      return;
    }
    if (lastTime !== null) elapsed += time - lastTime;
    lastTime = time;
    root.style.setProperty("--lean-progress", String(Math.min(1, elapsed / duration)));
    if (elapsed >= duration) advance();
    if (playing) frame = requestAnimationFrame(tick);
  }

  play.addEventListener("click", () => {
    if (playing) {
      stop();
      return;
    }
    if (step === 3) {
      step = 0;
      elapsed = 0;
      render();
    }
    // Reduced motion keeps the same proof accessible without a timed sequence.
    if (preference.matches) {
      advance();
      return;
    }
    playing = true;
    lastTime = null;
    updateControls();
    frame = requestAnimationFrame(tick);
  });

  next.addEventListener("click", () => {
    stop();
    advance();
  });

  reset.addEventListener("click", () => {
    stop();
    step = 0;
    elapsed = 0;
    render();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) stop();
    }, { threshold: 0.15 });
    observer.observe(root);
  } else {
    visible = true;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
  });
  window.addEventListener("pagehide", stop);
  window.addEventListener("beforeprint", stop);
  preference.addEventListener("change", () => {
    stop();
    if (goalAnimation) goalAnimation.cancel();
    render();
  });

  play.disabled = false;
  render();
})();
