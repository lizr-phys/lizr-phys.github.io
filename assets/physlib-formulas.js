(() => {
  "use strict";

  const groups = [...document.querySelectorAll("[data-lean-formulas]")];
  if (!groups.length) return;
  const base = "https://github.com/leanprover-community/physlib/blob/";
  // Complete theorem excerpts from the linked, merged revisions. No prover runs here.
  const examples = {
    clifford: {
      pr: 1627,
      label: "Clifford anticommutator",
      path: "405848179db6375f814021e804a37dc0dda66d91/Physlib/Relativity/Fermions/Dirac/GammaMatrices.lean#L173-L180",
      code: "theorem gamma_anticomm (μ ν : Fin 1 ⊕ Fin 3) :\n    gamma μ * gamma ν + gamma ν * gamma μ =\n      (2 * (minkowskiMatrix μ ν : ℂ)) • (1 : Module.End ℂ Dirac) := by\n  simp only [gamma, smul_mul_assoc, mul_smul_comm, smul_smul]\n  rw [mul_comm (minkowskiMatrix ν ν), ← smul_add, gammaMatrix_anticomm]\n  rw [smul_smul, ← Complex.coe_smul]\n  fin_cases μ <;> fin_cases ν <;>\n    norm_num [minkowskiMatrix.off_diag_zero] <;> simp [minkowskiMatrix.off_diag_zero]"
    },
    domain: {
      pr: 1673,
      label: "Dense angular momentum domain",
      path: "5ad56e24de155462acd8478458292347393d5908/Physlib/QuantumMechanics/Operators/AngularMomentum.lean#L183-L184",
      code: "lemma angularMomentumOperator_hasDenseDomain :\n    (angularMomentumOperator i j).HasDenseDomain := SchwartzSubmodule.dense d _"
    },
    raising: {
      pr: 1679,
      label: "Angular momentum raising commutator",
      path: "d9a67555d722e4ff82438d9b67a635873145d9ac/Physlib/QuantumMechanics/Operators/AngularMomentum/DimThree.lean#L251-L255",
      code: "lemma angularMomentumZ_commutation_raising : ⁅𝐋₃ 2, 𝐋⁺⁆ = (ℏ : ℂ) • 𝐋⁺ := by\n  rw [angularMomentumRaisingCLM, lie_add, lie_smul, angularMomentumDimThree_commutation_zx,\n    ← lie_skew (𝐋₃ 2) (𝐋₃ 1), angularMomentumDimThree_commutation_yz]\n  simp only [smul_neg, smul_smul, ← mul_assoc, I_mul_I, neg_one_mul]\n  module"
    },
    casimir: {
      pr: 1679,
      label: "Angular momentum squared and raising commutator",
      path: "d9a67555d722e4ff82438d9b67a635873145d9ac/Physlib/QuantumMechanics/Operators/AngularMomentum/DimThree.lean#L265-L266",
      code: "lemma angularMomentumSqr_commutation_raising : ⁅𝐋²[3], 𝐋⁺⁆ = 0 := by\n  simp [angularMomentumRaisingCLM, lie_add, lie_smul, angularMomentumSqr_commutation_dimThree]"
    }
  };

  let active = null;
  let closeTimer;
  let placementFrame = null;
  let returningFocus = false;

  function place() {
    placementFrame = null;
    if (!active) return;
    const { group, panel } = active;
    panel.classList.remove("is-above");
    if (getComputedStyle(panel).position === "static") return;
    const bounds = group.getBoundingClientRect();
    const height = panel.getBoundingClientRect().height;
    if (bounds.bottom + height > innerHeight - 16 && bounds.top - height > 80) panel.classList.add("is-above");
  }

  function close(returnFocus = false) {
    clearTimeout(closeTimer);
    if (!active) return;
    const { trigger, panel } = active;
    active = null;
    trigger.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    if (returnFocus) {
      returningFocus = true;
      trigger.focus({ preventScroll: true });
      returningFocus = false;
    }
  }

  function show(group, trigger) {
    clearTimeout(closeTimer);
    if (active?.trigger === trigger) return;
    close();
    const example = examples[trigger.dataset.leanExample];
    const panel = group.querySelector(".physlib-code-popover");
    const source = panel.querySelector("[data-lean-source]");
    panel.querySelector("[data-lean-code]").textContent = example.code;
    panel.querySelector("pre").setAttribute("aria-label", `Lean code: ${example.label}`);
    source.href = base + example.path;
    source.textContent = `#${example.pr} · Source`;
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    active = { group, trigger, panel, pinned: false };
    place();
  }

  function scheduleClose(group, leavingFocus = false) {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      if (active?.group !== group) return;
      const focused = group.contains(document.activeElement);
      if (!group.matches(":hover") && !focused && (leavingFocus || !active.pinned)) close();
    }, 160);
  }

  groups.forEach((group) => {
    const triggers = [...group.querySelectorAll("[data-lean-example]")];
    const panel = group.querySelector(".physlib-code-popover");
    triggers.forEach((trigger) => {
      trigger.disabled = false;
      trigger.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "touch") show(group, trigger);
      });
      trigger.addEventListener("focus", () => { if (!returningFocus) show(group, trigger); });
      trigger.addEventListener("click", () => {
        if (active?.trigger === trigger && active.pinned) close();
        else { show(group, trigger); active.pinned = true; }
      });
    });
    group.addEventListener("pointerenter", () => clearTimeout(closeTimer));
    group.addEventListener("pointerleave", () => scheduleClose(group));
    group.addEventListener("focusin", () => clearTimeout(closeTimer));
    group.addEventListener("focusout", () => scheduleClose(group, true));
    panel.querySelector("[data-lean-close]").addEventListener("click", () => close(true));
    group.dataset.ready = "true";
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && active) { event.preventDefault(); close(true); }
  });
  document.addEventListener("pointerdown", (event) => {
    if (active && !active.group.contains(event.target)) close();
  });
  document.addEventListener("visibilitychange", () => { if (document.hidden) close(); });
  const requestPlacement = () => {
    if (active && placementFrame === null) placementFrame = requestAnimationFrame(place);
  };
  window.addEventListener("resize", requestPlacement);
  window.addEventListener("scroll", requestPlacement, { passive: true });
})();
