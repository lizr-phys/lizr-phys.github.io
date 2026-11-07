# Quantum Mechanics: From Wavefunctions to Symmetries

*A journey from introductory to advanced quantum mechanics*

## 1. Introduction

Quantum mechanics is often introduced through a collection of strange phenomena: wave–particle duality, tunneling, uncertainty, and the probabilistic nature of measurement. These phenomena are fascinating, but I think the real beauty of quantum mechanics lies in the remarkably compact mathematical structure that connects them.

At its heart, quantum mechanics describes physical states using vectors in a complex Hilbert space, observables using operators, and time evolution through the Hamiltonian. Once these ideas are established, much of what we encounter in more advanced quantum mechanics—spin, symmetry, entanglement, scattering, and relativistic wave equations—can be understood as developments of the same framework.

In this article, I'd like to trace that connection, beginning with the familiar wavefunction and gradually moving toward the more abstract language of modern quantum mechanics.

## 2. Quantum States and Observables

In classical mechanics, the state of a particle can be specified by its position and momentum, $(x,p)$. Its subsequent motion is determined by Hamilton's equations.

Quantum mechanics takes a different starting point. A pure state is represented by a normalized vector $|\psi\rangle$ in a complex Hilbert space $\mathcal H$:

$$
\langle\psi|\psi\rangle=1.
$$

Strictly speaking, vectors differing only by a global phase represent the same physical pure state.

The familiar position-space wavefunction is simply one representation of this abstract state:

$$
\psi(x)=\langle x|\psi\rangle.
$$

According to the Born rule, the probability of finding a particle in the interval $[a,b]$ is

$$
P(a\leq x\leq b)=\int_a^b|\psi(x)|^2\,dx.
$$

The wavefunction itself is a probability amplitude, not a probability distribution. Its complex phase can affect interference, even though only its squared magnitude enters the position probability density.

Physical observables are represented by self-adjoint operators. For an observable $\hat A$ with a discrete spectrum, we may write its spectral decomposition as

$$
\hat A=\sum_n a_nP_n,
$$

where $P_n$ projects onto the eigenspace associated with the eigenvalue $a_n$. The probability of obtaining $a_n$ in a measurement is

$$
p(a_n)=\langle\psi|P_n|\psi\rangle.
$$

The expectation value is therefore

$$
\langle A\rangle=\langle\psi|\hat A|\psi\rangle.
$$

Unlike classical observables, quantum operators need not commute. For position and momentum,

$$
[\hat x,\hat p]=i\hbar.
$$

More generally, the Robertson uncertainty relation states that

$$
\Delta A\,\Delta B\geq
\frac12\left|\langle[\hat A,\hat B]\rangle\right|,
$$

which gives

$$
\Delta x\,\Delta p\geq\frac{\hbar}{2}.
$$

The uncertainty principle is not merely a statement about imperfect measuring instruments. It expresses a constraint on the statistical distributions associated with quantum states, arising directly from the operator structure of the theory.

## 3. Dynamics: How Quantum States Evolve

The Schrödinger equation determines how a quantum state evolves with time:

$$
i\hbar\frac{d}{dt}|\psi(t)\rangle
=\hat H|\psi(t)\rangle.
$$

For a time-independent Hamiltonian,

$$
|\psi(t)\rangle=e^{-i\hat Ht/\hbar}|\psi(0)\rangle.
$$

The evolution operator is unitary, ensuring that the norm of the state—and therefore total probability—is preserved.

For a nonrelativistic, spinless particle in a scalar potential $V(\mathbf r,t)$, the position-space equation becomes

$$
i\hbar\frac{\partial\psi(\mathbf r,t)}{\partial t}
=
\left[
-\frac{\hbar^2}{2m}\nabla^2+V(\mathbf r,t)
\right]\psi(\mathbf r,t).
$$

For a time-independent Hamiltonian with energy eigenstates $|n\rangle$,

$$
\hat H|n\rangle=E_n|n\rangle,
$$

a superposition of these states evolves as

$$
|\psi(t)\rangle
=\sum_n c_ne^{-iE_nt/\hbar}|n\rangle.
$$

Different energy components acquire different phases, and these *relative phases* are essential to quantum interference.

To see this explicitly, consider a two-level system with

$$
\hat H=\hbar\omega|1\rangle\langle1|,
$$

initially prepared in

$$
|\psi(0)\rangle=\frac{|0\rangle+|1\rangle}{\sqrt2}.
$$

Its evolution is

$$
|\psi(t)\rangle
=\frac{|0\rangle+e^{-i\omega t}|1\rangle}{\sqrt2}.
$$

Although the probabilities of obtaining $|0\rangle$ or $|1\rangle$ remain unchanged, the expectation value of $\sigma_x$ oscillates:

$$
\langle\sigma_x\rangle=\cos(\omega t).
$$

The relative phase, invisible when measuring in the $\{|0\rangle,|1\rangle\}$ basis, becomes observable in another basis. Quantum states contain more information than ordinary probability distributions over a fixed set of outcomes.

### Three pictures of quantum dynamics

In the two-level example, we followed the changing state while keeping the measured operator fixed. But we could just as well have described the same oscillation through a time-dependent operator. This leads to three equivalent pictures of quantum dynamics.

So far, we have been working in the *Schrödinger picture*, where states evolve with time while operators representing observables remain fixed unless they have explicit time dependence.

Since physical predictions are obtained from expectation values, we can redistribute the time dependence between states and operators without changing the physics.

In the *Heisenberg picture*, states are fixed and operators evolve instead. With the time-evolution operator $U(t,t_0)$, we define

$$
|\psi_H\rangle=|\psi_S(t_0)\rangle,
$$

$$
\hat A_H(t)
=U^\dagger(t,t_0)\hat A_S U(t,t_0).
$$

For an operator with no explicit time dependence, its evolution satisfies

$$
\frac{d\hat A_H}{dt}
=\frac{i}{\hbar}[\hat H_H,\hat A_H].
$$

This equation resembles Hamilton's equations in classical mechanics, with commutators taking a role analogous to Poisson brackets. The connection gives us another way to think about how classical and quantum dynamics are related.

The two pictures necessarily agree on observable predictions:

$$
\langle\psi_S(t)|\hat A_S|\psi_S(t)\rangle
=
\langle\psi_H|\hat A_H(t)|\psi_H\rangle.
$$

A third description, the *interaction picture*, becomes particularly useful when the Hamiltonian can be separated into a solvable part and an interaction,

$$
\hat H(t)=\hat H_0+\hat V(t),
$$

with $\hat H_0$ independent of time. Defining

$$
U_0(t,t_0)
=e^{-i\hat H_0(t-t_0)/\hbar},
$$

the interaction-picture state and operator are

$$
|\psi_I(t)\rangle
=U_0^\dagger(t,t_0)|\psi_S(t)\rangle,
$$

$$
\hat A_I(t)
=U_0^\dagger(t,t_0)\hat A_S U_0(t,t_0).
$$

The state then evolves according to

$$
i\hbar\frac{d}{dt}|\psi_I(t)\rangle
=\hat V_I(t)|\psi_I(t)\rangle,
$$

where

$$
\hat V_I(t)
=U_0^\dagger(t,t_0)\hat V(t)U_0(t,t_0).
$$

The free evolution is absorbed into the operators, leaving the interaction to govern the state evolution. This is the natural starting point for time-dependent perturbation theory and the Dyson series.

The three pictures describe the same physics, but each makes different aspects of the dynamics easier to handle.

### A useful example: the harmonic oscillator

The harmonic oscillator is one of the most important exactly solvable systems in quantum mechanics:

$$
\hat H=\frac{\hat p^2}{2m}+\frac12m\omega^2\hat x^2.
$$

Introducing the annihilation and creation operators,

$$
\hat a=
\sqrt{\frac{m\omega}{2\hbar}}\hat x
+\frac{i\hat p}{\sqrt{2m\hbar\omega}},
$$

$$
\hat a^\dagger=
\sqrt{\frac{m\omega}{2\hbar}}\hat x
-\frac{i\hat p}{\sqrt{2m\hbar\omega}},
$$

we obtain

$$
[\hat a,\hat a^\dagger]=1,
\qquad
\hat H=\hbar\omega
\left(\hat a^\dagger\hat a+\frac12\right).
$$

From these relations and the existence of a lowest-energy state, the energy spectrum follows:

$$
E_n=\hbar\omega\left(n+\frac12\right),
\qquad n=0,1,2,\ldots
$$

We have obtained the spectrum without explicitly solving the Schrödinger differential equation. The commutation relations, together with the structure of the state space, already determine the allowed energies.

This algebraic perspective becomes increasingly useful in advanced quantum mechanics.

## 4. Symmetry, Rotations, and Angular Momentum

Symmetry provides a powerful way to understand the structure of quantum mechanics, particularly its connection to conservation laws.

In quantum mechanics, continuous symmetries are represented by unitary transformations. A one-parameter transformation generated by a self-adjoint operator $\hat G$ can be written as

$$
U(\theta)=e^{-i\theta\hat G/\hbar}.
$$

If the Hamiltonian is invariant under this transformation, then

$$
[\hat H,\hat G]=0.
$$

For a generator with no explicit time dependence, the Heisenberg equation gives

$$
\frac{d}{dt}\langle G\rangle
=\frac{i}{\hbar}\langle[\hat H,\hat G]\rangle=0.
$$

Thus, $\hat G$ represents a conserved quantity.

### From angular momentum to the rotation group

Rotations in three-dimensional space form the group $SO(3)$. In quantum mechanics, rotations act on state vectors through unitary operators, and their infinitesimal generators are the components of angular momentum.

For a rotation by an angle $\theta$ about an axis $\mathbf n$, we write

$$
U(R)=\exp\left(
-\frac{i\theta}{\hbar}\mathbf n\cdot\hat{\mathbf J}
\right).
$$

The angular momentum operators satisfy

$$
[\hat J_i,\hat J_j]
=i\hbar\epsilon_{ijk}\hat J_k.
$$

These relations encode the local structure of the rotation group. In particular, rotations about different axes generally do not commute.

Defining the ladder operators

$$
\hat J_\pm=\hat J_x\pm i\hat J_y,
$$

we find

$$
[\hat J_z,\hat J_\pm]=\pm\hbar\hat J_\pm,
$$

and

$$
\hat J_\pm|j,m\rangle
=
\hbar\sqrt{(j\mp m)(j\pm m+1)}
\,|j,m\pm1\rangle.
$$

Together with

$$
\hat J^2|j,m\rangle
=\hbar^2j(j+1)|j,m\rangle,
$$

$$
\hat J_z|j,m\rangle=\hbar m|j,m\rangle,
$$

these relations determine the allowed angular momentum quantum numbers:

$$
j=0,\frac12,1,\frac32,\ldots,
\qquad
m=-j,-j+1,\ldots,j.
$$

There is a subtlety here. Although ordinary spatial rotations form $SO(3)$, quantum spinors are naturally described by representations of $SU(2)$, the double cover of $SO(3)$. The two groups have the same Lie algebra, but different global structures. Half-integer spin representations are ordinary representations of $SU(2)$, while corresponding to projective representations of $SO(3)$.

For a spin-$\frac12$ particle,

$$
\hat{\mathbf S}=\frac{\hbar}{2}\boldsymbol{\sigma},
$$

and a rotation about the $z$-axis is represented by

$$
U_z(\theta)=e^{-i\theta\sigma_z/2}.
$$

Consequently,

$$
U_z(2\pi)=-I,
\qquad
U_z(4\pi)=I.
$$

A spinor changes sign under a full $2\pi$ rotation, even though the corresponding spatial rotation is the identity. The sign alone does not change the physical state ray, but the distinction can matter in interference experiments.

Unlike orbital angular momentum, spin cannot be understood simply as a particle physically rotating about its own axis. Yet both orbital and spin angular momentum obey the same algebra, and their combination gives the total angular momentum,

$$
\hat{\mathbf J}
=\hat{\mathbf L}+\hat{\mathbf S}.
$$

Representation theory allows us to study these structures without beginning with a particular differential equation or coordinate system. Instead, we ask how quantum states transform under symmetry operations and what those transformations permit.

## 5. Composite Systems, Entanglement, and Identical Particles

When two quantum systems are combined, their joint state space is not a direct sum, but a tensor product:

$$
\mathcal H_{AB}=\mathcal H_A\otimes\mathcal H_B.
$$

Some states can be written as products,

$$
|\psi\rangle_{AB}
=|\psi\rangle_A\otimes|\phi\rangle_B,
$$

but not every state admits such a decomposition.

A familiar example is the Bell state

$$
|\Psi^+\rangle
=\frac{|01\rangle+|10\rangle}{\sqrt2}.
$$

This state is entangled. Although the total system is in a pure state, the reduced state of either subsystem is mixed:

$$
\rho_A
=\operatorname{Tr}_B
\left(|\Psi^+\rangle\langle\Psi^+|\right)
=\frac{I}{2}.
$$

This motivates the density operator formalism, in which a general quantum state is represented by

$$
\rho=\sum_i p_i|\psi_i\rangle\langle\psi_i|,
\qquad
\langle A\rangle=\operatorname{Tr}(\rho\hat A).
$$

The same language is essential for quantum information, statistical ensembles, and open quantum systems.

Another important development concerns identical particles. For the familiar cases of bosons and fermions in three spatial dimensions, the total multiparticle wavefunction obeys

$$
\Psi(1,2)=
\begin{cases}
+\Psi(2,1),&\text{bosons},\\
-\Psi(2,1),&\text{fermions}.
\end{cases}
$$

Here, the exchange includes all relevant single-particle degrees of freedom, including spin. For fermions, antisymmetry implies the Pauli exclusion principle: two identical fermions cannot occupy the same single-particle state.

These ideas connect quantum mechanics to atomic structure, condensed matter physics, and eventually quantum field theory.

## 6. Beyond Exact Solutions

Most interesting quantum systems cannot be solved exactly. Advanced quantum mechanics therefore develops systematic approximation methods.

### Perturbation theory

Suppose

$$
\hat H(\lambda)=\hat H_0+\lambda\hat V,
$$

where $\lambda$ is a small parameter and the spectrum of $\hat H_0$ is known.

For a nondegenerate energy level, the first-order energy correction is

$$
E_n(\lambda)
=
E_n^{(0)}
+\lambda\langle n^{(0)}|\hat V|n^{(0)}\rangle
+O(\lambda^2).
$$

The first-order shift is determined by the expectation value of the perturbation in the unperturbed state.

For degenerate levels, however, we must first diagonalize the perturbation within the degenerate subspace. The original unperturbed basis is not necessarily the one that correctly describes how the degeneracy is lifted.

Perturbation theory provides a practical bridge between simple exactly solvable models and realistic physical systems.

### Scattering theory

Another central topic is scattering, where we want to determine how particles interact and emerge from a collision.

For a sufficiently short-range potential, the asymptotic wavefunction of a nonrelativistic particle may be written as

$$
\psi(\mathbf r)\sim
e^{ikz}+f(\theta,\phi)\frac{e^{ikr}}{r}.
$$

Here, $f(\theta,\phi)$ is the scattering amplitude. For elastic scattering, with the usual normalization,

$$
\frac{d\sigma}{d\Omega}=|f(\theta,\phi)|^2.
$$

In the first Born approximation,

$$
f_{\mathrm B}(\mathbf q)
=-\frac{m}{2\pi\hbar^2}
\int d^3r\,
e^{-i\mathbf q\cdot\mathbf r}V(\mathbf r),
$$

where $\mathbf q=\mathbf k_f-\mathbf k_i$ is the change in wavevector.

The scattering amplitude is therefore related to the Fourier transform of the interaction potential. Under the conditions where the Born approximation is valid, measured angular distributions can provide information about the spatial structure of the interaction.

This relationship is one reason scattering experiments have become such powerful tools for investigating matter.

## 7. Where Does Quantum Mechanics Lead?

The development from introductory to advanced quantum mechanics is not simply a progression toward harder calculations.

It is a shift in perspective.

At first, we learn to solve the Schrödinger equation for particles in potentials. Later, we recognize that wavefunctions are representations of abstract states, angular momentum reflects the structure of rotational symmetry, and entanglement follows from the tensor-product structure of composite systems.

The same foundations also lead us toward relativistic quantum mechanics. For example, the free-particle Dirac equation can be written in Hamiltonian form as

$$
i\hbar\frac{\partial\psi(\mathbf r,t)}{\partial t}
=
\left(
c\boldsymbol{\alpha}\cdot\hat{\mathbf p}
+\beta mc^2
\right)\psi(\mathbf r,t),
\qquad
\hat{\mathbf p}=-i\hbar\nabla.
$$

Here, $\psi$ is a four-component spinor, and the matrices $\alpha_i$ and $\beta$ satisfy the anticommutation relations required to reproduce the relativistic energy–momentum relation

$$
E^2=p^2c^2+m^2c^4.
$$

A fully relativistic description of processes involving particle creation and annihilation, however, requires us to go further, toward quantum field theory.

Looking back, much of the theory grows out of a small number of structural principles. The mathematical language becomes richer, the problems more complicated, and the physical settings increasingly unfamiliar. Yet states, operators, probabilities, symmetries, and unitary evolution remain at the center of the discussion.

For me, the deeper understanding comes not simply from solving more difficult equations, but from gradually recognizing why the same structures keep appearing in different parts of physics.

---

## Further Reading

For readers interested in exploring these ideas in greater depth:

1. D. J. Griffiths and D. F. Schroeter, *Introduction to Quantum Mechanics*, 3rd ed., Cambridge University Press (2018).
2. R. Shankar, *Principles of Quantum Mechanics*, 2nd ed., Springer (1994).
3. J. J. Sakurai and J. Napolitano, *Modern Quantum Mechanics*, 3rd ed., Cambridge University Press (2020).
4. MIT OpenCourseWare, *8.05 Quantum Physics II*, *8.06 Quantum Physics III*, and *8.321 Quantum Theory I*.