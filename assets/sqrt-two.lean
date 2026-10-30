import Mathlib.NumberTheory.Real.Irrational

theorem sqrt_two_irrational :
    Irrational (Real.sqrt 2) := by
  apply irrational_sqrt_natCast_iff.mpr
  have hprime : Nat.Prime 2 := Nat.prime_two
  exact hprime.not_isSquare
