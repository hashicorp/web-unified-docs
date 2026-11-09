#!/usr/bin/env python3
"""Build light and dark Mermaid sources for each diagram. Only colors differ.

Each diagram has one editable body, <name>.mmd, in this directory. A body
refers to theme colors with tokens such as $line and $node in its style lines.
This script writes <name>_light.mmd and <name>_dark.mmd for every body, both
here and in ../img/agentic-mesh/mermaid-markup/ so the renderable markup sits
next to the published images.

Render each variant with the Mermaid CLI. Render the SVG first, then render the
PNG at the SVG's natural width (the max-width value in the SVG). Without -w,
mmdc squeezes wide diagrams into an 800px viewport and shrinks the text.

  mmdc -i <name>_light.mmd -o <name>_light.svg -b "#ffffff"
  mmdc -i <name>_light.mmd -o ../img/agentic-mesh/<name>_light.png -s 2 -w <width> -b "#ffffff"

Repeat for the dark variant with -b "#0d0e12".

Design diagrams to fit the docs content column, about 730px wide, so text
renders near full size on the page.

Usage: python3 build.py [name ...]   (default: every body in this directory)
"""
import glob
import os
import sys
from string import Template

HERE = os.path.dirname(os.path.abspath(__file__))
MARKUP = os.path.join(HERE, "..", "img", "agentic-mesh", "mermaid-markup")

PALETTES = {
    "light": dict(bg="#ffffff", node="#ffffff", node_border="#80848d", text="#0c0c0e",
                  cluster="#f4f5f7", cluster_border="#80848d", arf="#fdf2f6",
                  arf_border="#c1527f", line="#656a73", model="#3b3d45",
                  accent_border="#ca2171"),
    "dark": dict(bg="#0d0e12", node="#1d1e23", node_border="#7d808a", text="#efeff1",
                 cluster="#16171c", cluster_border="#7d808a", arf="#24131b",
                 arf_border="#b5527f", line="#9b9ea6", model="#d0d2d8",
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
        f'"edgeLabelBackground":"{p["bg"]}",'
        f'"actorBkg":"{p["node"]}","actorBorder":"{p["accent_border"]}",'
        f'"actorTextColor":"{p["text"]}","actorLineColor":"{p["node_border"]}",'
        f'"signalColor":"{p["line"]}","signalTextColor":"{p["text"]}",'
        f'"noteBkgColor":"{p["cluster"]}","noteBorderColor":"{p["cluster_border"]}",'
        f'"noteTextColor":"{p["text"]}","activationBkgColor":"{p["arf"]}",'
        f'"activationBorderColor":"{p["arf_border"]}","sequenceNumberColor":"{p["bg"]}"}},'
        '"sequence":{"mirrorActors":false,"width":130,"actorMargin":20,"messageMargin":45,'
        '"boxMargin":10,"noteMargin":12,"wrap":true,"actorFontSize":15,'
        '"messageFontSize":15}}}%%\n'
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
    os.makedirs(MARKUP, exist_ok=True)
    for name, p in PALETTES.items():
        text = init_line(p) + body.substitute(p)
        for d in (HERE, MARKUP):
            out = os.path.join(d, f"{base}_{name}.mmd")
            with open(out, "w") as f:
                f.write(text)
            print(os.path.normpath(out))
