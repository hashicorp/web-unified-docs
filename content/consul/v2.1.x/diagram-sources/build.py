#!/usr/bin/env python3
"""Build light and dark Mermaid sources for each diagram. Only colors differ.

Each diagram has one editable body, <name>.mmd, in this directory. A body
refers to theme colors with tokens such as $line and $node in its style lines.
This script writes <name>_light.mmd and <name>_dark.mmd for every body.

Render each variant with the Mermaid CLI, for example:

  mmdc -i <name>_light.mmd -o <name>_light.png -s 2 -b "#ffffff"
  mmdc -i <name>_dark.mmd -o <name>_dark.png -s 2 -b "#0d0e12"

Run the same commands with an .svg output to refresh the SVG sources, then copy
the PNGs to ../img/architecture/.

Usage: python3 build.py [name ...]   (default: every body in this directory)
"""
import glob
import os
import sys
from string import Template

HERE = os.path.dirname(os.path.abspath(__file__))

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


def init_line(p):
    return (
        '%%{init: {"theme":"base","fontFamily":"Helvetica, Arial, sans-serif",'
        '"flowchart":{"curve":"step","nodeSpacing":60,'
        '"rankSpacing":75,"htmlLabels":true},"themeVariables":{'
        '"fontFamily":"Helvetica, Arial, sans-serif",'
        f'"fontSize":"16px","background":"{p["bg"]}","primaryColor":"{p["node"]}",'
        f'"primaryBorderColor":"{p["node_border"]}","primaryTextColor":"{p["text"]}",'
        f'"lineColor":"{p["line"]}","clusterBkg":"{p["cluster"]}",'
        f'"clusterBorder":"{p["cluster_border"]}","titleColor":"{p["text"]}",'
        f'"edgeLabelBackground":"{p["bg"]}"}}}}}}%%\n'
    )


def bodies(names):
    if names:
        return [os.path.join(HERE, f"{n}.mmd") for n in names]
    return sorted(
        f for f in glob.glob(os.path.join(HERE, "*.mmd"))
        if not f.endswith(("_light.mmd", "_dark.mmd"))
    )


for path in bodies(sys.argv[1:]):
    base = os.path.splitext(os.path.basename(path))[0]
    body = Template(open(path).read())
    for name, p in PALETTES.items():
        out = os.path.join(HERE, f"{base}_{name}.mmd")
        with open(out, "w") as f:
            f.write(init_line(p) + body.substitute(p))
        print(out)
