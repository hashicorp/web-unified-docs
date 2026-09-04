"""Content type census.

Walks every *-nav-data.json in the newest version directory of each product,
resolves each nav entry to a file, and classifies it by structural signals.

Prints a summary. Writes nothing unless asked:

    python3 docs/content-guide/products/census.py
    python3 docs/content-guide/products/census.py --csv /tmp/census.csv
    python3 docs/content-guide/products/census.py --matrix /tmp/census.md
    python3 docs/content-guide/products/census.py --csv out.csv --matrix out.md

--csv     every page with every feature used in its classification, for
          re-judging a disputed row without re-running anything.
--matrix  the same data as a reviewable document: per-product sections,
          collapsible per-nav-file tables, and the disagreement breakdown.

Refer to census.md for scope, method, accuracy, and known failure modes. Read
that before quoting any number this produces. The matrix links to it rather
than restating it, so there is one copy of that prose.

Update PRODUCTS below when a product ships a new version directory.
"""

import argparse, json, os, re, sys, csv
from collections import Counter, defaultdict

# Repo-relative. Run from anywhere: paths resolve from this file's location.
REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))
ROOT = os.path.join(REPO, "content")
_ap = argparse.ArgumentParser(description="Content type census.")
_ap.add_argument("--csv", metavar="PATH", help="write the per-page CSV here")
_ap.add_argument("--matrix", metavar="PATH", help="write the reviewable markdown matrix here")
ARGS = _ap.parse_args()

PRODUCTS = {
    "boundary":  ("boundary/v1.0.x",  "content"),
    "consul":    ("consul/v2.0.x",    "content"),
    "nomad":     ("nomad/v2.0.x",     "content"),
    "packer":    ("packer/v1.16.x",   "content"),
    "vault":     ("vault/v2.x",       "content"),
    "terraform": ("terraform/v1.15.x", "docs"),
    "terraform-enterprise":  ("terraform-enterprise/v202507-1", "docs"),
    "well-architected-framework": ("well-architected-framework", "docs"),
    # Analyzed for coverage data; no product page written yet.
    "terraform-docs-common": ("terraform-docs-common", "docs"),
    "vagrant":   ("vagrant/v2.4.9",   "content"),
    "sentinel":  ("sentinel/v0.40.x", "content/sentinel"),
}

IMPERATIVE = r"(Add|Adjust|Apply|Assign|Attach|Authorize|Back up|Build|Change|Check|Choose|Clean|Configure|Connect|Convert|Copy|Create|Customize|Define|Delete|Deploy|Destroy|Disable|Download|Enable|Encrypt|Enforce|Establish|Execute|Export|Generate|Grant|Import|Initialize|Inspect|Install|Integrate|Join|Launch|Link|List|Load|Log in|Log out|Manage|Migrate|Modify|Monitor|Mount|Move|Open|Perform|Prepare|Provision|Publish|Pull|Push|Query|Read|Rebuild|Recover|Register|Reload|Remove|Rename|Renew|Replace|Request|Reset|Restart|Restore|Retrieve|Revoke|Roll|Rotate|Run|Save|Scale|Seal|Secure|Select|Send|Set|Share|Sign|Specify|Start|Stop|Store|Submit|Switch|Sync|Tag|Test|Troubleshoot|Tune|Unseal|Update|Upgrade|Upload|Use|Validate|Verify|View|Write)"
BOILER = re.compile(r"^(requirements?|prerequisites?|before you start|before you begin|next steps?|more information|related|related (topics|links|resources)|additional resources|background|introduction|overview|examples?|guidance|notes?|summary|limitations?|constraints?|assumptions?|see also|references?|resources|tutorials?|feedback|community|support|glossary)\b", re.I)

def walk_nav(nodes, section, crumbs, out):
    for n in nodes:
        if not isinstance(n, dict):
            continue
        title = n.get("title") or n.get("name") or ""
        if "routes" in n:
            walk_nav(n["routes"], section, crumbs + [title], out)
        elif "path" in n:
            out.append({"section": section, "nav_title": title,
                        "crumbs": " › ".join([c for c in crumbs if c]),
                        "path": n["path"]})
        # href-only nodes are external; skip

def resolve(base, section, path):
    path = path.lstrip("/")
    stem = os.path.join(base, section, path) if path else os.path.join(base, section)
    for cand in (stem + ".mdx", os.path.join(stem, "index.mdx"),
                 stem + ".md",  os.path.join(stem, "index.md")):
        if os.path.isfile(cand):
            return cand
    return None

def strip_code(text):
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = re.sub(r"`[^`\n]*`", "", text)
    return text

def analyze(fp):
    raw = open(fp, encoding="utf-8", errors="replace").read()
    fm = {}
    body = raw
    m = re.match(r"^---\n(.*?)\n---\n", raw, re.S)
    if m:
        for line in m.group(1).splitlines():
            km = re.match(r"^(\w+):\s*(.*)$", line)
            if km:
                fm[km.group(1)] = km.group(2).strip().strip('"\'')
        body = raw[m.end():]

    h1 = (re.search(r"^# (.+)$", body, re.M) or [None, ""])[1] if re.search(r"^# (.+)$", body, re.M) else ""
    h2s = re.findall(r"^## +(.+?)\s*$", body, re.M)
    h3s = re.findall(r"^### +(.+?)\s*$", body, re.M)
    nocode = strip_code(body)

    body_h2 = [h for h in h2s if not BOILER.match(re.sub(r"[`*_]", "", h).strip())]
    imper = sum(1 for h in body_h2 if re.match(r"^(?:Step\s*\d+\s*[:.\-]|" + IMPERATIVE + r"\b)", re.sub(r"[`*_]", "", h).strip()))

    steps = len(re.findall(r"^\s{0,3}(?:1|[2-9]|\d\d)\.\s+\S", body, re.M))
    tabs = len(re.findall(r"<Tab\b", body))
    tab_groups = set(re.findall(r'group="([^"]+)"', body))
    fences = re.findall(r"^```(\w[\w-]*)", body, re.M)
    table_rows = len(re.findall(r"^\s*\|.+\|\s*$", body, re.M))
    links = len(re.findall(r"\]\((?!#)", nocode))
    words = len(re.findall(r"\b\w+\b", nocode))
    # parameter definition list entries: "- `name`" or "- `name` ((#..))"
    params = len(re.findall(r"^\s*[-*] +[`(\[]*`?[a-zA-Z_][\w.\-\[\]/]*`", body, re.M))
    includes = len(re.findall(r"@include ", body))
    has_req = bool(re.search(r"^## +(Requirements|Prerequisites|Before you start|Before you begin)", body, re.M))
    tip_assump = bool(re.search(r'<(Tip|Note)[^>]*title="Assumptions"', body))

    return dict(fm=fm, h1=h1, h2s=h2s, h3s=h3s, body_h2=body_h2, imper=imper,
                steps=steps, tabs=tabs, tab_groups=tab_groups, fences=fences,
                table_rows=table_rows, links=links, words=words, params=params,
                includes=includes, has_req=has_req, tip_assump=tip_assump,
                is_index=os.path.basename(fp).startswith("index."))

CFG_H2 = re.compile(r"\b(parameters?|configuration reference|argument reference|arguments|attributes?|block parameters?|configuration options?|schema|fields?|required|optional|settings)\b", re.I)

def classify(product, path, a, fileref=""):
    p = (fileref or path).lower()
    sig = []
    n_h2 = len(a["body_h2"])
    words = max(a["words"], 1)
    h2_clean = [re.sub(r"[`*_]", "", h).strip() for h in a["h2s"]]
    title = (a["h1"] or a["fm"].get("page_title", "")).strip()

    # --- hard routes by location -------------------------------------------
    if re.search(r"(^|/)api-docs(/|$)", p):
        return "api-reference", []
    if re.search(r"(^|/)(commands|cli)(/|$)", p) or re.search(r"reference/cli", p) or re.search(r"/docs/cli/", p):
        return "cli-reference", []
    if re.search(r"(release-notes|changelog|change-tracker|deprecat|important-changes|(^|/)releases?(/|$)|(^|/)upgrade(-guide)?(/|$)|(^|/)updates(/|$))", p):
        return "release-notes", []
    if re.search(r"(^|/)functions?/", p) or re.match(r"^`?\\w+`? +function", title, re.I):
        return "function-reference", []
    if re.match(r"^what is\\b", title, re.I) or p.endswith("what-is"):
        return "what-is", []

    # --- structural signals -------------------------------------------------
    workflow = (a["steps"] >= 3 and (a["fences"] or a["imper"] >= 1)) or \
               (n_h2 and a["imper"] * 2 >= n_h2 and a["imper"] >= 2)
    h1_imper = bool(re.match(r"^(?:How to +)?" + IMPERATIVE + r"\b", re.sub(r"[`*_]", "", title).strip()))
    feature  = (not workflow) and n_h2 >= 2 and (a["has_req"] or h1_imper)
    cfg_head = any(CFG_H2.search(h) for h in h2_clean)
    cfgref   = (cfg_head and (a["params"] >= 4 or a["fences"])) or \
               (a["params"] >= 8 and bool(set(a["fences"]) & {"hcl","json","yaml","yml","tf","hcl2"}))
    tabular  = a["table_rows"] >= 12 and a["table_rows"] * 25 >= words and not cfgref
    linky    = a["links"] * 220 >= words and a["links"] >= 8
    cookbook = (a["tabs"] >= 2 and n_h2 <= 1 and a["steps"] < 3
                and not a["has_req"] and (a["tip_assump"] or "cookbook" in p))
    corepat  = re.search(r"(troubleshoot|error|faq|benchmark|best-practice|limits|compatib|glossar|known-issue)", p)

    for name, on in (("how-to", workflow), ("usage", feature),
                     ("structured-config-ref", cfgref), ("tabular-ref", tabular),
                     ("overview", linky)):
        if on:
            sig.append(name)

    # --- primary type -------------------------------------------------------
    if cookbook:
        primary = "cookbook"
    elif a["is_index"] and linky and not cfgref:
        primary = "overview"
    elif a["is_index"] and words < 400 and not workflow and not cfgref:
        primary = "overview"
    elif cfgref and not workflow:
        primary = "structured-config-ref"
    elif workflow:
        primary = "how-to"
    elif feature:
        primary = "usage"
    elif cfgref:
        primary = "structured-config-ref"
    elif tabular:
        primary = "tabular-ref"
    elif corepat:
        primary = "core-reference"
    elif linky and words < 700:
        primary = "overview"
    else:
        primary = "concept"

    mixed = [s for s in sig if s != primary]
    return primary, mixed

# ---------------------------------------------------------------------------
# Documented conventions.
#
# These are NOT inferred. Each entry is a page type established by the
# per-product audit and recorded on a page in docs/content-guide/products/.
# A page is assigned a documented_type when it matches that convention's
# signature -- its folder, its headings, or both.
#
# This is kept separate from classify() on purpose. classify() infers type from
# shape and knows nothing about these conventions; documented_type applies what
# the audit established. Where the two disagree, that disagreement is the
# measurement -- it is the extent of the classifier's blind spot, and folding
# these rules into classify() would erase it.
# ---------------------------------------------------------------------------
DOCUMENTED = [
    # (product, path fragment or None, required headings (any-of), all-of, label)
    ("boundary",  "/docs/domain-model/",        ("Referenced by","Service API docs","Attributes"), (), "domain-model"),
    ("vault",     "/docs/configuration/",       (),  (), "structured-config-ref", r"^## `[^`]+` parameters"),
    ("vault",     "/cookbook/",                 (),  (), "cookbook"),
    ("vault",     None,                         (),  ("Setup","Usage","API"), "secrets-plugin"),
    ("vault",     "/docs/auth/",                (),  ("Authentication","API"), "auth-method"),
    ("nomad",     "/docs/deploy/task-driver/",  ("Capabilities","Resource Isolation"), (), "task-driver"),
    ("nomad",     "/autoscaling/plugins/",      ("Policy Configuration Options",), (), "autoscaler-plugin"),
    ("terraform", "/language/backend/",         ("Configuration Variables","Data Source Configuration"), (), "backend-reference"),
    ("terraform", "/language/meta-arguments/",  ("Supported constructs","Supported constucts"), (), "meta-argument"),
    ("terraform-enterprise", "/enterprise/releases/", (), (), "release-notes"),
]

def documented_type(product, fileref, headings, body):
    path = "/" + fileref
    for entry in DOCUMENTED:
        prod, frag, anyof, allof, label = entry[:5]
        regex = entry[5] if len(entry) > 5 else None
        if prod != product: continue
        if frag and frag not in path: continue
        if anyof and not any(h in headings for h in anyof): continue
        if allof and not all(h in headings for h in allof): continue
        if regex and not re.search(regex, body, re.M): continue
        return label
    return ""

rows = []
for product, (verdir, base_sub) in PRODUCTS.items():
    base = os.path.join(ROOT, verdir, base_sub)
    datadir = os.path.join(ROOT, verdir, "data")
    navs = sorted(f for f in os.listdir(datadir) if f.endswith("-nav-data.json"))
    seen = set()
    for nav in navs:
        section = nav[:-len("-nav-data.json")]
        try:
            data = json.load(open(os.path.join(datadir, nav)))
        except Exception as e:
            print(f"!! {product} {nav}: {e}", file=sys.stderr); continue
        entries = []
        walk_nav(data if isinstance(data, list) else [data], section, [], entries)
        for e in entries:
            fp = resolve(base, section, e["path"])
            key = fp or (section + "|" + e["path"])
            if key in seen:
                continue
            seen.add(key)
            if not fp:
                rows.append(dict(product=product, section=section, nav=e["crumbs"],
                                 title=e["nav_title"], path=e["path"], file="MISSING",
                                 type="unresolved", documented_type="", mixed="", h2s=0, steps=0, tabs=0,
                                 words=0, tables=0, params=0))
                continue
            a = analyze(fp)
            rel = os.path.relpath(fp, ROOT)
            t, mixed = classify(product, e["path"] or "index", a, rel)
            _hs = {re.sub(r"[`*_]", "", h).strip() for h in a["h2s"] + a["h3s"]}
            _raw = open(fp, encoding="utf-8", errors="replace").read()
            dt = documented_type(product, rel, _hs, _raw)
            rows.append(dict(product=product, section=section, nav=e["crumbs"],
                             title=e["nav_title"] or a["h1"], path=e["path"],
                             file=rel, type=t, documented_type=dt,
                             mixed="+".join(mixed), h2s=len(a["body_h2"]),
                             steps=a["steps"], tabs=a["tabs"], words=a["words"],
                             tables=a["table_rows"], params=a["params"]))

LABEL = {"terraform-enterprise": "Terraform Enterprise", "terraform-docs-common": "HCP Terraform",
         "well-architected-framework": "Well-Architected Framework", "boundary": "Boundary",
         "consul": "Consul", "nomad": "Nomad", "packer": "Packer", "terraform": "Terraform",
         "vault": "Vault", "vagrant": "Vagrant", "sentinel": "Sentinel"}
TYPE_LABEL = {"cli-reference": "CLI reference", "concept": "Concept", "how-to": "How-to",
              "api-reference": "API reference", "overview": "Overview", "usage": "Usage",
              "structured-config-ref": "Structured configuration reference",
              "function-reference": "Function reference", "release-notes": "Release notes and updates",
              "core-reference": "Core reference", "tabular-ref": "Tabular reference",
              "cookbook": "Cookbook", "unresolved": "Unresolved"}


def version_label(product):
    """Version directory for a product, or "unversioned" when it has none."""
    d = PRODUCTS[product][0]
    return f"`{d.split('/', 1)[1]}`" if "/" in d else "unversioned"


def render_matrix(rows):
    """The census as a reviewable document.

    Generated tables only. Method, accuracy, and known failure modes live in
    census.md and are linked rather than restated, so there is one copy.
    """
    L, w = [], lambda x="": L.append(x)
    prods = list(PRODUCTS)
    tot = len(rows)
    w("# Content type census\n")
    w("Generated by `census.py`. Analysis artifact — not part of the content guide.\n")
    w("**Read [census.md](census.md) before quoting any figure here.** It carries the")
    w("scope, the classification rules, the accuracy check, and the known failure")
    w("modes, including why an individual row is a hypothesis rather than a verdict.\n")

    w("## Coverage\n")
    w("| Product | Version analyzed | Pages |")
    w("| --- | --- | --- |")
    for p in prods:
        w(f"| {LABEL.get(p, p)} | {version_label(p)} | {sum(1 for r in rows if r['product'] == p)} |")
    w(f"| **Total** | | **{tot:,}** |\n")
    w("Pages not reachable from a nav file are out of scope. The census measures the")
    w("published information architecture, not the filesystem.\n")

    w("## Distribution\n")
    types = Counter(r["type"] for r in rows)
    w("| Content type | " + " | ".join(LABEL.get(p, p) for p in prods) + " | Total | % |")
    w("| --- |" + " --- |" * (len(prods) + 2))
    for t, n in types.most_common():
        cells = [str(sum(1 for r in rows if r["product"] == p and r["type"] == t)) for p in prods]
        w(f"| {TYPE_LABEL.get(t, t)} | " + " | ".join(cells) + f" | {n} | {100 * n / tot:.1f}% |")
    w("| **Total** | " + " | ".join(str(sum(1 for r in rows if r["product"] == p)) for p in prods) + f" | **{tot:,}** | |\n")
    mixed = sum(1 for r in rows if r["mixed"])
    w(f"{mixed} pages, {100 * mixed / tot:.1f}%, carry a second strong structural signal.\n")

    w("## Where shape-inference disagrees with the documented conventions\n")
    dtr = [r for r in rows if r["documented_type"]]
    dis = [r for r in dtr if r["documented_type"] != r["type"]]
    w("The page types established by the per-product audit are recorded on the pages in")
    w("this directory. They are applied here as a second column, **computed")
    w("independently of the classifier**, which knows nothing about them. Where the two")
    w("disagree, that disagreement measures how much a shape-based census misses.\n")
    w(f"**{len(dtr)} pages match a documented convention. The classifier disagreed on")
    w(f"{len(dis)} of them — {100 * len(dis) / max(len(dtr), 1):.0f}%.**\n")
    w("| Product | Documented type | Pages misclassified by shape |")
    w("| --- | --- | --- |")
    for (p, d), n in Counter((r["product"], r["documented_type"]) for r in dis).most_common():
        w(f"| {LABEL.get(p, p)} | {d} | {n} |")
    w("")
    w("These rules were deliberately **not** folded into the classifier. Doing so would")
    w("make the census confirm what it was told and erase the evidence that shape")
    w("inference could not find these types on its own.\n")
    w("---\n")

    w("## Per-page classification\n")
    w("A **bold** documented type contradicts the inferred type beside it.\n")
    for p in prods:
        pr = [r for r in rows if r["product"] == p]
        w(f"### {LABEL.get(p, p)} ({version_label(p)}) — {len(pr)} pages\n")
        w("Distribution: " + ", ".join(f"{TYPE_LABEL.get(t, t)} {n}"
                                       for t, n in Counter(r["type"] for r in pr).most_common()) + "\n")
        for sec in sorted({r["section"] for r in pr}):
            sr = [r for r in pr if r["section"] == sec]
            w(f"<details>\n<summary><strong>{sec}</strong> — {len(sr)} pages</summary>\n")
            w("| Nav location | Page | Inferred type | Documented type | Mixed with | H2 | Steps | Tabs |")
            w("| --- | --- | --- | --- | --- | --- | --- | --- |")
            for r in sorted(sr, key=lambda x: x["path"]):
                nav = (r["nav"] or "—").replace("|", "\\|")
                title = (r["title"] or r["path"] or "index").replace("|", "\\|")
                dt = r["documented_type"]
                dtc = f"**{dt}**" if dt and dt != r["type"] else (dt or "—")
                w(f"| {nav} | `{r['path'] or '(index)'}`<br/>{title} | {r['type']} | {dtc} | "
                  f"{r['mixed'] or '—'} | {r['h2s']} | {r['steps']} | {r['tabs']} |")
            w("\n</details>\n")
    return "\n".join(L)


if ARGS.csv:
    os.makedirs(os.path.dirname(os.path.abspath(ARGS.csv)), exist_ok=True)
    with open(ARGS.csv, "w", newline="") as f:
        wr = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        wr.writeheader(); wr.writerows(rows)
    print(f"wrote {ARGS.csv}")

if ARGS.matrix:
    os.makedirs(os.path.dirname(os.path.abspath(ARGS.matrix)), exist_ok=True)
    open(ARGS.matrix, "w").write(render_matrix(rows))
    print(f"wrote {ARGS.matrix}")

dt_rows = [r for r in rows if r["documented_type"]]
disagree = [r for r in dt_rows if r["documented_type"] != r["type"]]
print(f"total nav-reachable pages: {len(rows)}")
print(f"pages matching a documented convention: {len(dt_rows)}")
print(f"  of which the shape classifier disagreed: {len(disagree)} "
      f"({100*len(disagree)/max(len(dt_rows),1):.0f}%)\n")
by = Counter((r["product"], r["documented_type"]) for r in disagree)
for (p, d), n in by.most_common():
    print(f"    {p:<22} {d:<24} {n:>3} pages misclassified by shape")
print()
for product in PRODUCTS:
    pr = [r for r in rows if r["product"] == product]
    c = Counter(r["type"] for r in pr)
    mx = sum(1 for r in pr if r["mixed"])
    print(f"== {product}  ({len(pr)} pages, {mx} mixed) ==")
    for t, n in c.most_common():
        print(f"   {t:24s} {n:4d}  {100*n/len(pr):4.1f}%")
    print()
