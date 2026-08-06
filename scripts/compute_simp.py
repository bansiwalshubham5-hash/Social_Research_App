"""
Computes the impurity free energy / entropy S_imp(T/TK; alpha, n) from the
solved eta_p(xi) tables, per eqs. (15)-(21) of arXiv:2608.04083, and
validates against the paper's closed-form checks before trusting it:
  - S_imp(T -> infinity) = 2 ln 2  for ANY alpha, ANY phase (eq 13 @ p=1)
  - Kondo phase (0<alpha<pi/2), S_imp(T -> 0) = 2 ln[2 cos(pi/(n+2))]
  - Local-moment phase: BOTH T->0 and T->infinity give S_imp = 2 ln 2 = ln 4
"""
import json
import numpy as np

xi = np.load("/tmp/tba_xi.npy")
with open("/tmp/tba_results.json") as f:
    raw = json.load(f)

TK_LN = 0.0  # we work directly in units of T/TK, so ln(T/TK) = ln(Tratio)

eta_ln = {int(n): {int(p.split("_")[1]): np.array(v) for p, v in d.items()} for n, d in raw.items()}


def ln1p_exp(x):
    out = np.empty_like(x)
    big = x > 30
    out[big] = x[big]
    out[~big] = np.log1p(np.exp(x[~big]))
    return out


def get_ln1p_eta(n, p):
    return ln1p_exp(eta_ln[n][p])


def kondo_Fimp(Tratio, alpha, n):
    """eq 15: single-tower Kondo phase, 0 < alpha < pi/2."""
    shift = np.log(Tratio)
    ln1p_eta1 = get_ln1p_eta(n, 1)
    c = np.cosh(xi + shift)
    integrand = (np.cos(alpha) * c * ln1p_eta1) / (c ** 2 - np.sin(alpha) ** 2)
    integral = np.trapezoid(integrand, xi)
    return -(Tratio / np.pi) * integral  # in units where TK=1, so T=Tratio


def tower_integral(Tratio, phase_shift, p):
    """(T/2pi) * integral dxi ln(1+eta_p(xi)) / cosh(xi + ln(Tratio) - i*phase_shift)"""
    shift = np.log(Tratio)
    ln1p = get_ln1p_eta_safe(p)
    denom = np.cosh(xi + shift - 1j * phase_shift)
    integrand = ln1p / denom
    integral = np.trapezoid(integrand, xi)
    return (Tratio / (2 * np.pi)) * integral


CURRENT_N = None


def get_ln1p_eta_safe(p):
    return get_ln1p_eta(CURRENT_N, p)


def zero_mode_1_Fimp(Tratio, alpha, n):
    """eq 17-20: two-tower zero-mode-I phase, pi/2 < alpha < pi."""
    global CURRENT_N
    CURRENT_N = n
    F_T1_1 = -tower_integral(Tratio, alpha, 1)
    F_T2_1 = F_T1_1 - tower_integral(Tratio, alpha - np.pi / 2, 2)
    Z1 = np.exp(-F_T1_1 / Tratio) + np.exp(-F_T2_1 / Tratio)
    Z2 = np.conj(Z1)
    Zimp = Z1 * Z2
    Fimp = -Tratio * np.log(Zimp)
    return Fimp.real


def three_tower_Fimp(Tratio, alpha, n, m):
    """eq 21a-c + 19-20 generalized to 3 towers: zero-mode-II and local-moment."""
    global CURRENT_N
    CURRENT_N = n
    a = alpha - m * np.pi / 2
    b = (m + 1) * np.pi / 2 - alpha
    F_T1 = -tower_integral(Tratio, a, m + 1) + tower_integral(Tratio, b, m)
    F_T2 = tower_integral(Tratio, a, m - 1) - tower_integral(Tratio, b, m - 2)
    F_T3 = tower_integral(Tratio, b, m) + tower_integral(Tratio, a, m - 1)
    Z1 = np.exp(-F_T1 / Tratio) + np.exp(-F_T2 / Tratio) + np.exp(-F_T3 / Tratio)
    Z2 = np.conj(Z1)
    Zimp = Z1 * Z2
    Fimp = -Tratio * np.log(Zimp)
    return Fimp.real


def entropy(Fimp_func, Tratio, *args, dlogT=0.01):
    """S = -dF/dT via central finite difference in log T."""
    T1 = Tratio * np.exp(-dlogT)
    T2 = Tratio * np.exp(dlogT)
    F1 = Fimp_func(T1, *args)
    F2 = Fimp_func(T2, *args)
    return -(F2 - F1) / (T2 - T1)


print("=== Kondo phase (single tower) ===")
for n in range(1, 7):
    s_uv = entropy(kondo_Fimp, 1e6, np.pi / 6, n)
    s_ir = entropy(kondo_Fimp, 1e-6, np.pi / 6, n)
    ir_expected = 2 * np.log(2 * np.cos(np.pi / (n + 2)))
    print(
        f"n={n}: S(T>>TK)={s_uv:.5f} (expect {2*np.log(2):.5f}), "
        f"S(T<<TK)={s_ir:.5f} (expect {ir_expected:.5f})"
    )

print("\n=== Zero-mode-I phase (two tower) UV check ===")
for n in [2, 3, 4]:
    alpha = np.pi / 2 + 0.3
    s_uv = entropy(zero_mode_1_Fimp, 1e6, alpha, n)
    print(f"n={n}, alpha={alpha:.3f}: S(T>>TK)={s_uv:.5f} (expect {2*np.log(2):.5f})")

print("\n=== Zero-mode-II / local-moment (three tower) checks ===")
for n in [3, 4, 5]:
    alpha_zm2 = np.pi + 0.3  # zero-mode-II region for n>=3
    m_zm2 = int(np.floor(2 * alpha_zm2 / np.pi))
    s_uv = entropy(three_tower_Fimp, 1e6, alpha_zm2, n, m_zm2)
    print(f"[zero-mode-II] n={n}, alpha={alpha_zm2:.3f}, m={m_zm2}: S(T>>TK)={s_uv:.5f} (expect {2*np.log(2):.5f})")

    alpha_lm = (n / 2 + 1) * np.pi + 0.3
    m_lm = int(np.floor(2 * alpha_lm / np.pi))
    s_uv_lm = entropy(three_tower_Fimp, 1e6, alpha_lm, n, m_lm)
    s_ir_lm = entropy(three_tower_Fimp, 1e-6, alpha_lm, n, m_lm)
    print(
        f"[local-moment] n={n}, alpha={alpha_lm:.3f}, m={m_lm}: "
        f"S(T>>TK)={s_uv_lm:.5f}, S(T<<TK)={s_ir_lm:.5f} (both expect {2*np.log(2):.5f})"
    )
