import json
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from playwright.sync_api import sync_playwright

LIVE_BASE = "https://www.hanva.in"
LOCAL_BASE = "http://localhost:3001"

# Fetch live 69 sitemap URLs directly
with urllib.request.urlopen(f"{LIVE_BASE}/sitemap.xml", timeout=15) as sm:
    root = ET.fromstring(sm.read().decode("utf-8"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = [el.text for el in root.findall(".//s:loc", ns)]

routes = [urllib.parse.urlparse(u).path for u in sitemap_urls]
route_set = set(routes)

pages = []
in_links_all = Counter()         # total incoming links (including header/footer)
in_links_body = Counter()        # incoming links from <main> body content only!
out_links_body = defaultdict(list)
broken_links = []
title_map = defaultdict(list)
desc_map = defaultdict(list)

# 1. Check live production HTTP status for ALL 69 sitemap URLs
live_statuses = {}
for r in routes:
    req = urllib.request.Request(f"{LIVE_BASE}{r}", headers={"User-Agent": "HanvaPhase20Audit/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            live_statuses[r] = resp.getcode()
    except urllib.error.HTTPError as e:
        live_statuses[r] = e.code
    except Exception as e:
        live_statuses[r] = f"ERR:{e}"

def safe_attr(pg, selector, attr):
    loc = pg.locator(selector)
    if loc.count() == 0:
        return ""
    return (loc.first.get_attribute(attr) or "").strip()

# 2. Crawl all 69 routes in Chromium against local production build (exact rendered HTML, same commit c5ec992)
with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()

    for r in routes:
        pg.goto(f"{LOCAL_BASE}{r}", wait_until="networkidle")
        title = (pg.title() or "").strip()
        desc = safe_attr(pg, 'meta[name="description"]', "content")
        canon = safe_attr(pg, 'link[rel="canonical"]', "href")
        canon_count = pg.locator('link[rel="canonical"]').count()
        robots_meta = safe_attr(pg, 'meta[name="robots"]', "content")
        og_title = safe_attr(pg, 'meta[property="og:title"]', "content")
        og_desc = safe_attr(pg, 'meta[property="og:description"]', "content")
        og_img = safe_attr(pg, 'meta[property="og:image"]', "content")
        tw_card = safe_attr(pg, 'meta[name="twitter:card"]', "content")
        h1_texts = [t.strip() for t in pg.locator("h1").all_inner_texts() if t.strip()]
        h2_count = pg.locator("h2").count()
        imgs = pg.evaluate("Array.from(document.querySelectorAll('img')).map(i => ({src: i.getAttribute('src'), alt: i.getAttribute('alt')}))")
        missing_alt = [im for im in imgs if im["alt"] is None or str(im["alt"]).strip() == ""]
        jraw = pg.locator('script[type="application/ld+json"]').all_inner_texts()
        schema_types = []
        schema_valid = True
        for raw in jraw:
            try:
                obj = json.loads(raw)
                if isinstance(obj, dict):
                    if "@graph" in obj and isinstance(obj["@graph"], list):
                        for g in obj["@graph"]:
                            if isinstance(g, dict) and "@type" in g:
                                schema_types.append(str(g["@type"]))
                    elif "@type" in obj:
                        schema_types.append(str(obj["@type"]))
            except Exception:
                schema_valid = False

        # All internal links on page vs strictly inside <main> body
        all_hrefs = pg.locator('a[href^="/"]').evaluate_all(
            "els => Array.from(new Set(els.map(e => e.getAttribute('href').split('#')[0].split('?')[0]).filter(Boolean)))"
        )
        body_hrefs = pg.locator('main a[href^="/"]').evaluate_all(
            "els => Array.from(new Set(els.map(e => e.getAttribute('href').split('#')[0].split('?')[0]).filter(Boolean)))"
        )
        for tgt in all_hrefs:
            norm = tgt if tgt == "/" or tgt.endswith("/") else tgt + "/"
            if norm != r:
                in_links_all[norm] += 1
            if norm not in route_set:
                broken_links.append({"from": r, "to": tgt})
        for tgt in body_hrefs:
            norm = tgt if tgt == "/" or tgt.endswith("/") else tgt + "/"
            if norm != r:
                in_links_body[norm] += 1
                out_links_body[r].append(norm)

        title_map[title].append(r)
        desc_map[desc].append(r)

        pages.append({
            "route": r,
            "live_status": live_statuses.get(r),
            "title": title,
            "title_len": len(title),
            "desc": desc,
            "desc_len": len(desc),
            "canonical": canon,
            "canonical_count": canon_count,
            "canonical_exact_match": canon == f"{LIVE_BASE}{r}",
            "noindex": "noindex" in robots_meta.lower(),
            "has_og": bool(og_title and og_desc and og_img),
            "has_twitter": bool(tw_card),
            "h1_count": len(h1_texts),
            "h1_text": h1_texts[0] if h1_texts else "",
            "h2_count": h2_count,
            "img_count": len(imgs),
            "missing_alt_count": len(missing_alt),
            "schema_types": schema_types,
            "schema_valid": schema_valid,
            "body_out_links_count": len(out_links_body[r]),
            "body_out_links": out_links_body[r],
        })

    ctx.close()
    browser.close()

for pinfo in pages:
    r = pinfo["route"]
    pinfo["all_in_links_count"] = in_links_all.get(r, 0)
    pinfo["body_in_links_count"] = in_links_body.get(r, 0)

dup_titles = {k: v for k, v in title_map.items() if len(v) > 1 or not k}
dup_descs = {k: v for k, v in desc_map.items() if len(v) > 1 or not k}
orphans_all = [p["route"] for p in pages if p["all_in_links_count"] == 0]
orphans_body = [p["route"] for p in pages if p["body_in_links_count"] == 0 and p["route"] != "/"]
long_titles = [{"route": p["route"], "len": p["title_len"], "title": p["title"]} for p in pages if p["title_len"] > 65]
short_titles = [{"route": p["route"], "len": p["title_len"], "title": p["title"]} for p in pages if p["title_len"] < 30]
long_descs = [{"route": p["route"], "len": p["desc_len"]} for p in pages if p["desc_len"] > 165]
short_descs = [{"route": p["route"], "len": p["desc_len"]} for p in pages if p["desc_len"] < 100]
no_og = [p["route"] for p in pages if not p["has_og"]]
bad_h1 = [{"route": p["route"], "h1_count": p["h1_count"]} for p in pages if p["h1_count"] != 1]

report = {
    "live_sitemap_count": len(sitemap_urls),
    "live_all_200": all(v == 200 for v in live_statuses.values()),
    "live_non_200": {k: v for k, v in live_statuses.items() if v != 200},
    "duplicate_titles": dup_titles,
    "duplicate_descriptions": dup_descs,
    "missing_alt_pages": [p["route"] for p in pages if p["missing_alt_count"] > 0],
    "broken_internal_links": broken_links,
    "orphans_zero_inlinks_anywhere": orphans_all,
    "orphans_zero_body_inlinks": orphans_body,
    "long_titles_gt65": long_titles,
    "short_titles_lt30": short_titles,
    "long_descs_gt165": long_descs,
    "short_descs_lt100": short_descs,
    "missing_og_pages": no_og,
    "bad_h1_pages": bad_h1,
    "non_exact_canonicals": [{"route": p["route"], "canonical": p["canonical"]} for p in pages if not p["canonical_exact_match"] or p["canonical_count"] != 1],
    "pages": pages,
}

with open("/Users/apple/Downloads/HANVA/docs/phase20/evidence/seo_crawl_69.json", "w") as f:
    json.dump(report, f, indent=2)

print("SUMMARY:", json.dumps({k: v for k, v in report.items() if k != "pages"}, indent=2))
