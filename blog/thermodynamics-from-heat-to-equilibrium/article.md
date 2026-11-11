# Thermodynamics: From Heat to Equilibrium

*How constraints give thermodynamic change its direction*

An ideal gas fills one half of a rigid, insulated vessel. The other half is empty. Open the valve between them and the gas spreads through both halves. Once equilibrium returns, the thermometer reads as before. The energy balance would also permit the gas to gather again on its original side. What makes the expansion spontaneous?

## 1. What the Laws Say About Change

### A thermometer and a piston

A thermometer works because thermal equilibrium is transitive. If two bodies are each in thermal equilibrium with the same thermometer at the same reading, they are in thermal equilibrium with one another. That is the content of the zeroth law. Two states can share a temperature and have different pressures and volumes. For a fixed amount of ideal gas, specifying $T$ and $V$ also fixes $p$ through $pV=nRT$, where $n$ is the amount in moles and $R$ is the molar gas constant.

For a closed system at rest, take heat entering the system and work done on it as positive. The first law reads

$$
\mathrm dU=\delta Q+\delta W.
$$

Heating a gas and stirring it with a paddle can produce the same increase in internal energy. The change in $U$ depends on the endpoints. The shares supplied as heat and work depend on the process. For a reversible piston displacement, $\delta W=-p\,\mathrm dV$, so an expanding gas gives up energy as work. In the insulated vessel, expansion into the vacuum involves zero heat and zero work. Thus $\Delta U=0$. The endpoint temperatures are equal because an ideal gas's internal energy depends only on $T$ at fixed $n$.

An insulated cylinder with a movable piston makes a revealing variation. If the gas expands reversibly, the piston receives work and the gas cools. Take the constant-volume heat capacity $C_V$ of the ideal gas to be independent of temperature. The balance is then

$$
C_V\,\mathrm dT=-\frac{nRT}{V}\,\mathrm dV.
$$

Integrating gives $TV^{nR/C_V}=\text{constant}$. Both expansions are adiabatic. The piston changes the energy balance by giving the gas a way to do work.

### What a reversible cycle gives us

Carnot used two reversible isotherms joined by two reversible adiabats. The adiabats change the temperature without exchanging heat. Along the isotherms the engine absorbs $Q_{\mathrm h}>0$ from a hot reservoir at $T_{\mathrm h}$ and rejects a magnitude $Q_{\mathrm c}>0$ to a cold one at $T_{\mathrm c}$. The working substance comes back to its starting state. Its net work output is $Q_{\mathrm h}-Q_{\mathrm c}$.

Suppose a second engine were more efficient. Run the reversible engine backward, scaled to remove from the cold reservoir exactly the heat the second engine puts there. The pair would then deliver net work while drawing net heat from just the hot reservoir. The second law rules out that cycle. On the absolute temperature scale the reversible heat ratio is $Q_{\mathrm c}/Q_{\mathrm h}=T_{\mathrm c}/T_{\mathrm h}$, giving the Carnot bound

$$
\eta=1-\frac{Q_{\mathrm c}}{Q_{\mathrm h}}
\le 1-\frac{T_{\mathrm c}}{T_{\mathrm h}}.
$$

The reversible cycle balances heat weighted by reciprocal temperature. For a cycle exchanging signed heats $Q_i$ with reservoirs at $T_i$, the Clausius inequality gives $\sum_i Q_i/T_i\le 0$, with equality for a reversible cycle. Take one reversible path from $A$ to $B$ and retrace a second path in reverse. The weighted heat around the loop vanishes, so either path gives the same entropy difference.

$$
S_B-S_A=\int_A^B\frac{\delta Q_{\mathrm{rev}}}{T}.
$$

This lets us return to the valve. We can compare its endpoints along a reversible isotherm at their common temperature. On that path $\delta Q_{\mathrm{rev}}=p\,\mathrm dV$, so

$$
\Delta S=\int_{V_A}^{V_B}\frac{p}{T}\,\mathrm dV
=nR\ln\!\left(\frac{V_B}{V_A}\right).
$$

For two equal chambers the entropy gain is $nR\ln 2$. All of it is produced within the vessel during the actual expansion. More generally, appending a reversible return to an adiabatic process gives $\Delta S\ge 0$ for that process by the Clausius inequality. Stable equilibrium of an isolated system maximizes entropy among the states its constraints allow. Opening the valve enlarges that set while keeping the total energy and the volume of the vessel fixed.

Recreating the initial state by reversible isothermal compression would send $nR\ln 2$ of entropy into a bath. Once a bath is involved, its entropy belongs in the calculation too.

## 2. What We Can Learn About a Single Phase

### Including the surroundings

Consider a sample in contact with a heat bath at $T$ and subject to a constant external pressure $p$. Apply the entropy principle to the sample and its surroundings together. If the sample is closed and does only pressure–volume work, the heat it absorbs between equilibrium states at that pressure is $Q=\Delta U+p\Delta V$. The term $p\Delta V$ accounts for work against the surroundings. It is why heat supplied at constant pressure measures a change in enthalpy, $H=U+pV$.

The bath changes its entropy by $-Q/T$. For endpoints at the bath temperature,

$$
\begin{aligned}
T\Delta S_{\mathrm{tot}}
&=T\Delta S-Q \\
&=-\Delta(H-TS).
\end{aligned}
$$

The quantity in parentheses is the Gibbs free energy $G$. At fixed $T$ and $p$, stable equilibrium minimizes $G$ over the allowed states because the combined entropy is maximized. For a change that raises enthalpy, the bath loses entropy $\Delta H/T$. The change is favored if the sample gains more entropy than this. In a rigid vessel the volume work vanishes, giving the Helmholtz free energy $F=U-TS$ and its minimum at fixed $T$ and $V$.

The potentials also tell us how to describe equilibrium states. At fixed amount of substance the reversible heat and work expressions give $\mathrm dU=T\,\mathrm dS-p\,\mathrm dV$. Taking the differentials of the three potentials gives

$$
\begin{aligned}
\mathrm dH &= T\,\mathrm dS+V\,\mathrm dp, \\
\mathrm dF &= -S\,\mathrm dT-p\,\mathrm dV, \\
\mathrm dG &= -S\,\mathrm dT+V\,\mathrm dp.
\end{aligned}
$$

These Legendre transforms change the independent variables. The pressure that appears as a derivative of $U(S,V)$ can be used as a coordinate of $H(S,p)$. The temperature controlled by a bath is already a coordinate of $F(T,V)$ and $G(T,p)$.

### What a pressure measurement can reveal

Within a smooth single phase, the mixed derivatives of $F$ commute. Since its temperature derivative is $-S$ and its volume derivative is $-p$, we have

$$
\left(\frac{\partial S}{\partial V}\right)_{T,n}
=\left(\frac{\partial p}{\partial T}\right)_{V,n}.
$$

Measuring how pressure changes with temperature at fixed volume tells us how entropy responds to an isothermal change in volume. Put the Maxwell relation back into the differential of $U$ and it also gives

$$
\left(\frac{\partial U}{\partial V}\right)_{T,n}
=T\left(\frac{\partial p}{\partial T}\right)_{V,n}-p.
$$

For $p=nRT/V$, the right-hand side vanishes. The equation of state itself explains why the internal energy in the valve experiment was independent of volume. An interaction can change that conclusion. For a van der Waals gas, the term $-a/v^2$ in the pressure gives $(\partial u/\partial v)_T=a/v^2$, where $u$ and $v$ are molar internal energy and volume. At the same temperature, separating the attracting molecules raises the energy.

The same identity has a consequence for light in a large cavity. Equilibrium radiation has no conserved photon number, so the volume derivative is taken at fixed $T$. If $e(T)$ is the energy density, then $U=e(T)V$ and the pressure of isotropic radiation is $p=e/3$. Substitution gives

$$
e=\frac{T}{3}\frac{\mathrm de}{\mathrm dT}-\frac{e}{3},
\qquad e(T)\propto T^4.
$$

The pressure of light fixes the fourth power in the Stefan–Boltzmann law. The spectrum and the proportionality constant require further physical input.

### A different way to drop the pressure

Let gas flow steadily through an insulated porous plug. With zero shaft work and negligible changes in kinetic and gravitational potential energy, the molar enthalpy $h$ is the same upstream and downstream. The flow work that pushes gas into and out of the plug is included in $h=u+pv$. From $\mathrm dh=T\,\mathrm ds+v\,\mathrm dp$ and the Maxwell relation $(\partial s/\partial p)_T=-(\partial v/\partial T)_p$, the pressure derivative of $h$ at fixed temperature is $v-T(\partial v/\partial T)_p$. In a throttle, the temperature must change enough to keep $h$ constant. The Joule–Thomson coefficient gives the required rate.

$$
\mu_{\mathrm{JT}}
=\left(\frac{\partial T}{\partial p}\right)_h
=\frac{T(\partial v/\partial T)_p-v}{c_p},
$$

where $c_p=(\partial h/\partial T)_p$ is the molar heat capacity. A pressure drop cools a gas when this coefficient is positive. For an ideal gas $v=RT/p$ and the numerator vanishes. The isolated vessel held $U$ fixed, while steady flow through the plug holds $h$ fixed. For a real gas those balances can give different temperature changes.

## 3. How Two Phases Share a Substance

### The slopes at a melting point

Consider ice in contact with liquid water at a common $T$ and $p$. The total amount of water stays fixed, while each phase can gain or lose molecules. The Gibbs free energy of a phase now has a term $\mu\,\mathrm dn$ in its differential. For a pure phase, $G$ is proportional to its amount, so the chemical potential is the molar Gibbs free energy $\mu=G/n$. Transferring $\mathrm dn>0$ moles from solid to liquid changes the total Gibbs free energy by

$$
\mathrm dG=(\mu_\ell-\mu_{\mathrm s})\,\mathrm dn.
$$

If the liquid has lower $\mu$, melting lowers $G$. Coexistence requires $\mu_\ell=\mu_{\mathrm s}$. The two phases can agree in value and have different slopes. From the differential of $G$, each pure phase satisfies

$$
\mathrm d\mu=-s\,\mathrm dT+v\,\mathrm dp,
$$

with molar entropy $s$ and molar volume $v$. Warming favors the liquid because its higher entropy makes $\mu_\ell$ fall faster. Near the normal melting point, pressure also favors the liquid because it occupies less volume per mole than ice. To keep the two phases in balance as pressure rises, the temperature has to fall.

Along the melting curve the two chemical potentials remain equal. Equating their differentials gives the Clapeyron equation

$$
\frac{\mathrm dT_{\mathrm m}}{\mathrm dp}
=\frac{v_\ell-v_{\mathrm s}}{s_\ell-s_{\mathrm s}}
=\frac{T_{\mathrm m}(v_\ell-v_{\mathrm s})}{L},
$$

where $L=T_{\mathrm m}(s_\ell-s_{\mathrm s})$ is the molar latent heat of melting. The entropy difference appears in two experiments. It is the heat absorbed per mole divided by the melting temperature, and it sets the slope of the phase boundary together with the volume difference.

### Where coexistence ends

The same equality of chemical potentials selects the liquid–vapor pressure. In the loop of a subcritical van der Waals isotherm, two candidate molar volumes, $v_\ell$ and $v_{\mathrm g}$, share a pressure. In between lies a segment with $(\partial p/\partial v)_T>0$, which is mechanically unstable. To find coexistence we must compare the free energies at the two candidate volumes.

At fixed $T$, the molar Helmholtz free energy $F_{\mathrm m}=F/n$ satisfies $\mathrm dF_{\mathrm m}=-p\,\mathrm dv$. Since $\mu=F_{\mathrm m}+pv$, equal chemical potentials at the saturation pressure $p_{\mathrm{sat}}$ require

$$
\int_{v_\ell}^{v_{\mathrm g}}
\bigl[p(v,T)-p_{\mathrm{sat}}\bigr]\,\mathrm dv=0.
$$

This is Maxwell's equal-area construction. The positive and negative areas cancel precisely when the two candidate states have equal Gibbs free energy per mole. At the critical point the two volumes merge and the latent heat of vaporization vanishes. A path around that point connects liquid and gas continuously, while crossing the coexistence curve below it produces a discontinuous change.

## 4. Equilibrium When Composition Can Change

### Counting what can vary

In a mixture, adding one species changes $G$ by its *partial molar* Gibbs free energy. Each species $i$ has a chemical potential

$$
\mu_i=\left(\frac{\partial G}{\partial n_i}\right)_{T,p,n_{j\ne i}}.
$$

At common temperature and pressure, a component that can pass between phases has equal chemical potential in those phases at equilibrium. This gives a way to count the freedom left in a phase diagram. For $C$ components in $P$ phases of a nonreacting system, each phase has $C-1$ independent composition variables. Include one shared $T$ and one shared $p$, then impose $C(P-1)$ equalities of chemical potential. The Gibbs phase rule follows.

$$
\begin{aligned}
f &= 2+P(C-1)-C(P-1) \\
  &= C-P+2.
\end{aligned}
$$

For a pure substance, one phase occupies a region of the $T$–$p$ plane, two phases coexist on a curve, and three fix both $T$ and $p$ at a triple point. The count concerns intensive variables. Along a two-phase line, the amounts in the two phases can still change.

### The direction of a reaction

A reaction makes a different change available. The amounts of the elements stay fixed, while the species amounts change together according to stoichiometry. For a reaction extent $\xi$, write $\mathrm dn_i=\nu_i\,\mathrm d\xi$, with negative $\nu_i$ for reactants and positive $\nu_i$ for products. The slope of $G$ along this allowed direction is

$$
\left(\frac{\partial G}{\partial \xi}\right)_{T,p}
=\sum_i\nu_i\mu_i.
$$

A negative slope favors the forward reaction. At an interior equilibrium the sum vanishes. In an ideal gas mixture, each $\mu_i$ differs from its standard value $\mu_i^\circ(T)$ by $RT\ln(p_i/p^\circ)$, where $p_i$ is the partial pressure and $p^\circ$ the standard pressure. Inserting these terms gives the equilibrium constant

$$
K_p=\prod_i\left(\frac{p_{i,\mathrm{eq}}}{p^\circ}\right)^{\nu_i}
=\exp\!\left(-\frac{\Delta_{\mathrm r}G^\circ}{RT}\right),
$$

where $\Delta_{\mathrm r}G^\circ=\sum_i\nu_i\mu_i^\circ$. The pressure ratios keep the logarithms and the equilibrium constant dimensionless. For a given initial mixture at fixed $T$ and $p$, the partial pressures depend on the reaction extent. The condition on their product determines the equilibrium extent.

Start at equilibrium and compress the mixture isothermally. At the old composition, increasing the total pressure scales all the partial pressures by the same factor. If the forward reaction produces fewer moles of gas, the product of pressure ratios falls below $K_p$. The Gibbs slope becomes negative, favoring the forward reaction.

### Where the entropy scale begins

Predicting an equilibrium constant from thermal measurements requires the entropy term in $\Delta_{\mathrm r}G^\circ=\Delta_{\mathrm r}H^\circ-T\Delta_{\mathrm r}S^\circ$. The third law supplies the reference. For a pure, perfect crystal with a unique ground state, the entropy tends to zero as $T$ tends to zero. At fixed pressure and composition, heating through a single equilibrium phase gives

$$
S(T,p)=\int_0^T\frac{C_p(T',p)}{T'}\,\mathrm dT',
$$

where $C_p$ is the heat capacity of the sample and the integration starts from its zero-entropy crystal. If the path crosses a first-order transition, integrate in each phase and add the entropy jump $nL/T_{\mathrm{tr}}$ at the transition temperature. For melting, this is the very entropy difference that set the slope of the ice–water boundary. A melting curve and a calorimeter give two routes to the same quantity.

The expanding gas offers a microscopic version of that connection. At fixed energy, doubling the volume multiplies the available positional phase-space volume by $2^N$ for $N$ classical ideal-gas particles. Its logarithm, multiplied by Boltzmann's constant, is $nR\ln 2$. The reversible calculation and the microscopic count agree on what changed when the valve opened.

---

## Further Reading

1. D. V. Schroeder, *An Introduction to Thermal Physics*, especially the chapters on engines and free energy. [Oxford University Press](https://academic.oup.com/book/41238).
2. H. B. Callen, *Thermodynamics and an Introduction to Thermostatistics*, 2nd ed. [Wiley](https://www.wiley.com/en-us/Thermodynamics%2Band%2Ban%2BIntroduction%2Bto%2BThermostatistics%2C%2B2nd%2BEdition-p-9780471862567).
3. D. Tong, *Lectures on Statistical Physics*, §§4–5 on classical thermodynamics and phase transitions. [Lecture notes](https://davidtong.org/teaching/statistical-physics/).
