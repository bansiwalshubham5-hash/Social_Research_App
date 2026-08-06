"""
Numerically solves the thermodynamic Bethe Ansatz (TBA) hierarchy from
Kattel, Zhakenov & Andrei, "Breakdown of Monotonic Impurity Entropy Flow in
PT-Symmetric Multichannel Kondo Systems" (arXiv:2608.04083), eqs. (9)-(21).

Step 1: solve the universal (alpha-independent) eta_p(xi) hierarchy, eq (12),
for each channel number n = 1..6, by fixed-point iteration on a uniform xi
grid. The convolution G is over all of R, but eta_p(xi) is only tabulated on
a finite window [XI_MIN, XI_MAX] — the semi-infinite tails beyond that
window are handled analytically (the kernel K(x)=1/(2cosh(pi x)) has a
closed-form antiderivative), using the paper's own exact UV (eq 13) and IR
(eq 14) asymptotic values as the known plateau beyond the window edges.

Step 2: validate against the paper's own closed-form checks:
  - UV entropy S_imp(T -> infinity) = 2 ln 2, for ALL alpha (eq 13 at p=1).
  - IR entropy in the pure Kondo phase (0 < alpha < pi/2), T -> 0:
    S_imp = 2 ln[2 cos(pi/(n+2))]  (stated in the text, matches eq 14 p=1).

Step 3: export a compact JSON table of eta_p(xi) per n so the frontend can
compute Fimp/S_imp(alpha, T) live via a small numerical integral.
"""
import json
import numpy as np
from scipy.signal import fftconvolve

# ---- grid ----
XI_MIN, XI_MAX, N = -45.0, 45.0, 3001
xi = np.linspace(XI_MIN, XI_MAX, N)
dxi = xi[1] - xi[0]
P_MAX = 50

kx = np.arange(-(N - 1), N) * dxi
kernel = 1.0 / (2.0 * np.cosh(np.pi * kx))


def F_antideriv(x):
    """Antiderivative of K(x)=1/(2cosh(pi x)): F(x)=(1/(2*pi)) arctan(sinh(pi x))."""
    return np.arctan(np.sinh(np.pi * x)) / (2.0 * np.pi)


def K(x):
    return 1.0 / (2.0 * np.cosh(np.pi * x))


F_INF = 0.25  # F(+infinity)


def G(f, f_minus_inf, f_plus_inf):
    """
    Gf(xi) = integral over ALL of R of f(mu) * K(xi-mu) dmu.
    f is only known on [XI_MIN,XI_MAX]; the tails beyond are treated as the
    known constants f_minus_inf / f_plus_inf (exact plateaus, per eq 13/14).
    The discrete part uses the trapezoidal rule (half-weight at the two grid
    edges) so it partitions the real line cleanly against the analytic tails.
    """
    conv = fftconvolve(f, kernel, mode="valid") * dxi
    conv = conv - 0.5 * dxi * (f[0] * K(xi - XI_MIN) + f[-1] * K(xi - XI_MAX))
    tail_left = f_minus_inf * (F_INF - F_antideriv(xi - XI_MIN))
    tail_right = f_plus_inf * (F_antideriv(xi - XI_MAX) + F_INF)
    return conv + tail_left + tail_right


def stable_ln1p_exp(x):
    out = np.empty_like(x)
    big = x > 30
    small = ~big
    out[big] = x[big]
    out[small] = np.log1p(np.exp(x[small]))
    return out


def eta_asymptotic_uv(p):
    return (p + 1) ** 2 - 1


def eta_asymptotic_ir(p, n):
    if p < n:
        num = np.sin((p + 1) * np.pi / (n + 2)) ** 2
        den = np.sin(np.pi / (n + 2)) ** 2
        return num / den - 1
    else:
        return (p + 1 - n) ** 2 - 1


def solve_eta(n, p_max=P_MAX, iters=1500, tol=1e-12, mix=0.6, verbose=False):
    ln_eta = np.zeros((p_max + 2, N))
    for p in range(0, p_max + 2):
        uv = eta_asymptotic_uv(p) if p > 0 else 0.0
        ir = eta_asymptotic_ir(p, n) if p > 0 else 0.0
        # simple initial guess: linear blend in a sigmoid of xi between UV and IR plateaus
        t = 1.0 / (1.0 + np.exp(-xi))  # 0 at -inf, 1 at +inf
        val = (1 - t) * uv + t * ir
        val = np.maximum(val, 1e-12)
        ln_eta[p, :] = np.log(val)

    # known exact plateaus for the tail correction, per p
    uv_plateau = np.array([np.log(1.0 + eta_asymptotic_uv(p)) if p > 0 else 0.0 for p in range(p_max + 2)])
    ir_plateau = np.array([np.log(1.0 + eta_asymptotic_ir(p, n)) if p > 0 else 0.0 for p in range(p_max + 2)])

    ln1p_eta = np.zeros((p_max + 2, N))
    for p in range(0, p_max + 2):
        ln1p_eta[p, :] = stable_ln1p_exp(ln_eta[p, :])

    source = np.zeros((p_max + 2, N))
    source[n, :] = -2.0 * np.exp(xi)

    for it in range(iters):
        new_ln_eta = ln_eta.copy()
        max_rel_change = 0.0
        for p in range(1, p_max + 1):
            gval = G(ln1p_eta[p + 1], uv_plateau[p + 1], ir_plateau[p + 1]) + G(
                ln1p_eta[p - 1], uv_plateau[p - 1], ir_plateau[p - 1]
            )
            proposal = source[p] + gval
            updated = mix * proposal + (1 - mix) * ln_eta[p]
            change = np.max(np.abs(updated - ln_eta[p])) / (1.0 + np.max(np.abs(ln_eta[p])))
            max_rel_change = max(max_rel_change, change)
            new_ln_eta[p] = updated
        ln_eta = new_ln_eta
        for p in range(1, p_max + 1):
            ln1p_eta[p, :] = stable_ln1p_exp(ln_eta[p, :])
        if verbose and it % 50 == 0:
            print(f"  n={n} iter={it} max_rel_change={max_rel_change:.3e}")
        if max_rel_change < tol:
            if verbose:
                print(f"  n={n} converged at iter={it}, max_rel_change={max_rel_change:.3e}")
            break
    return ln_eta


results = {}
checks = []

for n in range(1, 7):
    print(f"Solving n={n} channel(s)...")
    ln_eta = solve_eta(n, verbose=True)
    eta1 = np.exp(ln_eta[1])

    uv_val = eta1[0]
    ir_val = eta1[-1]
    uv_expected = eta_asymptotic_uv(1)
    ir_expected = eta_asymptotic_ir(1, n)

    checks.append(
        {
            "n": n,
            "eta1_uv_numeric": float(uv_val),
            "eta1_uv_expected": float(uv_expected),
            "eta1_ir_numeric": float(ir_val),
            "eta1_ir_expected": float(ir_expected),
        }
    )
    print(
        f"  eta_1(xi_min)={uv_val:.6f} (expect {uv_expected}), "
        f"eta_1(xi_max)={ir_val:.6f} (expect {ir_expected:.6f})"
    )

    results[str(n)] = {
        f"eta_{p}": ln_eta[p].tolist() for p in range(0, min(P_MAX, n + 8) + 1)
    }

with open("/tmp/tba_checks.json", "w") as f:
    json.dump(checks, f, indent=2)
with open("/tmp/tba_grid.json", "w") as f:
    json.dump({"xi_min": XI_MIN, "xi_max": XI_MAX, "n_points": N}, f)
np.save("/tmp/tba_xi.npy", xi)
with open("/tmp/tba_results.json", "w") as f:
    json.dump(results, f)

print("Done. Checks written to /tmp/tba_checks.json")
