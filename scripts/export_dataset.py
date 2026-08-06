"""
Downsamples the solved eta_p(xi;n) tables and exports a compact JSON dataset
for the frontend to compute Fimp/S_imp(alpha, T) live (client-side), per
eqs. (15)-(21) of arXiv:2608.04083.
"""
import json
import numpy as np

xi = np.load("/tmp/tba_xi.npy")
with open("/tmp/tba_results.json") as f:
    raw = json.load(f)

STEP = 5  # 3001 -> ~601 points, still smooth
xi_ds = xi[::STEP]

out = {"xi": [round(float(x), 5) for x in xi_ds], "channels": {}}

for n_str, d in raw.items():
    channel_data = {}
    for p_key, arr in d.items():
        p = int(p_key.split("_")[1])
        vals = np.array(arr)[::STEP]
        channel_data[str(p)] = [round(float(v), 6) for v in vals]
    out["channels"][n_str] = channel_data

with open("/home/user/Social_Research_App/apps/web/public/data/tba-eta.json", "w") as f:
    json.dump(out, f, separators=(",", ":"))

import os

size_kb = os.path.getsize("/home/user/Social_Research_App/apps/web/public/data/tba-eta.json") / 1024
print(f"Exported {len(xi_ds)} xi points x {sum(len(v) for v in out['channels']['1'].values())//len(out['channels']['1'])} p-levels (n=1) ... size={size_kb:.1f} KB")
