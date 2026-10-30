import Mathlib.Data.Real.Basic
import Mathlib.Tactic.Ring

theorem cauchy_schwarz_two_dim (a b c d : ℝ) :
    (a * c + b * d) ^ 2 ≤
      (a ^ 2 + b ^ 2) * (c ^ 2 + d ^ 2) := by
  have hgap :
      (a ^ 2 + b ^ 2) * (c ^ 2 + d ^ 2) -
        (a * c + b * d) ^ 2 = (a * d - b * c) ^ 2 := by
    ring
  have hnonneg : 0 ≤ (a * d - b * c) ^ 2 := sq_nonneg _
  exact sub_nonneg.mp (hgap.symm ▸ hnonneg)
