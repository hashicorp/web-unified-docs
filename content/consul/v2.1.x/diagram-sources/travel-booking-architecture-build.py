#!/usr/bin/env python3
"""Build the light and dark Mermaid sources from one body. Only colors differ.

Edit travel-booking-architecture.mmd, then run this script to regenerate
travel-booking-architecture_light.mmd and travel-booking-architecture_dark.mmd.
Render each variant with the Mermaid CLI, for example:

  mmdc -i travel-booking-architecture_light.mmd -o travel-booking-architecture_light.png -s 2 -b "#ffffff"
  mmdc -i travel-booking-architecture_dark.mmd -o travel-booking-architecture_dark.png -s 2 -b "#0d0e12"

Run the same commands with an .svg output to refresh the SVG sources, then copy
the PNGs to ../img/architecture/.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = "travel-booking-architecture"

PALETTES = {
    "light": dict(bg="#ffffff", node="#ffffff", node_border="#c2c5cb", text="#0c0c0e",
                  cluster="#f4f5f7", cluster_border="#c2c5cb", arf="#fdf2f6",
                  arf_border="#e5a3bd", line="#8c9099", model="#3b3d45",
                  accent_border="#ca2171"),
    "dark": dict(bg="#0d0e12", node="#1d1e23", node_border="#4a4c55", text="#efeff1",
                 cluster="#16171c", cluster_border="#4a4c55", arf="#24131b",
                 arf_border="#7a2e50", line="#9b9ea6", model="#d0d2d8",
                 accent_border="#e8578f"),
}

body = open(os.path.join(HERE, "travel-booking-architecture.mmd")).read()

for name, p in PALETTES.items():
    init = (
        '%%{init: {"theme":"base","fontFamily":"Helvetica, Arial, sans-serif","flowchart":{"curve":"step","nodeSpacing":60,'
        '"rankSpacing":75,"htmlLabels":true},"themeVariables":{'
        '"fontFamily":"Helvetica, Arial, sans-serif",'
        f'"fontSize":"16px","background":"{p["bg"]}","primaryColor":"{p["node"]}",'
        f'"primaryBorderColor":"{p["node_border"]}","primaryTextColor":"{p["text"]}",'
        f'"lineColor":"{p["line"]}","clusterBkg":"{p["cluster"]}",'
        f'"clusterBorder":"{p["cluster_border"]}","titleColor":"{p["text"]}"}}}}}}%%\n'
    )
    styles = f"""
  classDef default fill:{p['node']},stroke:{p['node_border']},stroke-width:1.5px,color:{p['text']}
  classDef arfc fill:{p['node']},stroke:{p['accent_border']},stroke-width:2px,color:{p['text']}
  class igw,tgw,cp,analytics,otel arfc
  style arf fill:{p['arf']},stroke:{p['arf_border']},stroke-width:1.5px,color:{p['text']}
  style app fill:{p['cluster']},stroke:{p['cluster_border']},stroke-width:1px,color:{p['text']}
  style obs fill:{p['cluster']},stroke:{p['cluster_border']},stroke-width:1px,color:{p['text']}
  linkStyle 0,1,2,3,4,5,6,7,8,9,10 stroke:{p['line']},stroke-width:1.5px
  linkStyle 11,12,13,14 stroke:{p['model']},stroke-width:3px
  linkStyle 15,16,17 stroke:{p['line']},stroke-width:1.5px,stroke-dasharray:8 5
  linkStyle 18 stroke:{p['line']},stroke-width:1.5px,stroke-dasharray:14 4 2 4
  linkStyle 19,20,21,22,23,24,25 stroke:{p['line']},stroke-width:1.5px,stroke-dasharray:2 4
"""
    out = os.path.join(HERE, f"{BASE}_{name}.mmd")
    with open(out, "w") as f:
        f.write(init + body + styles)
    print(out)
