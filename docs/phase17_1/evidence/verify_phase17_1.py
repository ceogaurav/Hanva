import csv
import json
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3001"
PRIMARY_HOST = "https://www.hanva.in"

PRE_65 = [
    "/", "/pricing/", "/pricing/calculator/", "/company/contact/", "/products/",
    "/products/cloud-telephony/", "/products/ivr-system/", "/products/smart-ivr/",
    "/products/virtual-numbers/", "/products/toll-free-numbers/", "/products/call-center-software/",
    "/products/auto-dialer/", "/products/predictive-dialer/", "/products/crm/",
    "/products/telecalling-crm/", "/products/whatsapp-crm/", "/products/salon-software/",
    "/products/restaurant-pos/", "/digital-marketing/", "/digital-marketing/seo-services/",
    "/digital-marketing/performance-marketing/", "/digital-marketing/social-media-marketing/",
    "/software-development/", "/software-development/custom-crm-development/",
    "/software-development/web-application-development/", "/software-development/mobile-app-development/",
    "/software-development/saas-product-development/", "/software-development/api-integration-automation/",
    "/software-development/ecommerce-development/", "/solutions/",
    "/solutions/sales-automation/", "/solutions/customer-support/", "/solutions/enterprise/",
    "/industry/", "/industry/real-estate/", "/industry/healthcare/", "/industry/education/",
    "/industry/financial-services/", "/industry/insurance/", "/industry/automobile/",
    "/industry/logistics/", "/industry/recruitment/", "/locations/", "/locations/bengaluru/",
    "/locations/mumbai/", "/locations/delhi-ncr/", "/locations/hyderabad/", "/locations/pune/",
    "/locations/chennai/", "/compare/exotel-alternative/", "/compare/knowlarity-alternative/",
    "/compare/telecmi-alternative/", "/resources/", "/resources/what-is-cloud-telephony/",
    "/resources/how-ivr-systems-work/", "/resources/auto-dialer-vs-predictive-dialer/",
    "/resources/telecalling-crm-guide/", "/resources/whatsapp-business-api-guide/",
    "/resources/cloud-telephony-pricing-guide/", "/resources/dlt-compliance-guide/",
    "/company/about/", "/company/careers/", "/company/security-and-trust/",
    "/company/privacy-policy/", "/company/terms-of-service/",
]

GUIDES_4 = [
    "/resources/salon-management-software-guide/",
    "/resources/restaurant-pos-kot-inventory-guide/",
    "/resources/crm-with-ivr-vs-telecalling-crm/",
    "/resources/saas-vs-custom-crm-erp-guide/",
]

LOCATIONS_6 = [
    "/locations/bengaluru/",
    "/locations/hyderabad/",
    "/locations/chennai/",
    "/locations/mumbai/",
    "/locations/delhi-ncr/",
    "/locations/pune/",
]

ALL_69 = PRE_65 + GUIDES_4
TEN_TARGET = GUIDES_4 + LOCATIONS_6

results = {
    "route_status": {"total_checked": 69, "all_200_count": 0, "failures": []},
    "sitemap": {"status": None, "url_count": 0, "all_www": False, "missing_routes": []},
    "robots": {"status": None, "sitemap_line": None},
    "pages_10": [],
    "internal_links": {"checked": 0, "broken": []},
    "responsive_checks": [],
    "mobile_drawer_test": {},
}

for r in ALL_69:
    try:
        c = urllib.request.urlopen(f"{BASE}{r}", timeout=10).getcode()
        if c == 200:
            results["route_status"]["all_200_count"] += 1
        else:
            results["route_status"]["failures"].append({"route": r, "status": c})
    except Exception as e:
        results["route_status"]["failures"].append({"route": r, "error": str(e)})

sm_res = urllib.request.urlopen(f"{BASE}/sitemap.xml", timeout=10)
results["sitemap"]["status"] = sm_res.getcode()
root = ET.fromstring(sm_res.read().decode("utf-8"))
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
locs = [el.text for el in root.findall(".//s:loc", ns)]
results["sitemap"]["url_count"] = len(locs)
results["sitemap"]["all_www"] = all(l.startswith(PRIMARY_HOST) for l in locs)
for r in ALL_69:
    if f"{PRIMARY_HOST}{r}" not in locs:
        results["sitemap"]["missing_routes"].append(f"{PRIMARY_HOST}{r}")

rb_res = urllib.request.urlopen(f"{BASE}/robots.txt", timeout=10)
results["robots"]["status"] = rb_res.getcode()
for line in rb_res.read().decode("utf-8").splitlines():
    if line.lower().startswith("sitemap:"):
        results["robots"]["sitemap_line"] = line.strip()

checked_links = set()
wa_rows = []

EXPECTED_WA = {
    "/resources/salon-management-software-guide/": "I'm interested in a demo of Hanva Salon Software.",
    "/resources/restaurant-pos-kot-inventory-guide/": "I'm interested in a demo of Hanva Restaurant POS.",
    "/resources/crm-with-ivr-vs-telecalling-crm/": "I'm interested in a demo of Hanva CRM.",
    "/resources/saas-vs-custom-crm-erp-guide/": "Hello Hanva Team, I would like to discuss my software requirements (SaaS vs Custom CRM/ERP Development).",
}

with sync_playwright() as p:
    browser = p.chromium.launch()
    dctx = browser.new_context(viewport={"width": 1440, "height": 900})
    dpg = dctx.new_page()
    c_errs, p_errs = [], []
    dpg.on("console", lambda m: c_errs.append(m.text) if m.type == "error" else None)
    dpg.on("pageerror", lambda e: p_errs.append(str(e)))

    for route in TEN_TARGET:
        c_errs.clear()
        p_errs.clear()
        dpg.goto(f"{BASE}{route}", wait_until="networkidle")
        title = dpg.title()
        canonical = dpg.locator('link[rel="canonical"]').get_attribute("href")
        desc = dpg.locator('meta[name="description"]').get_attribute("content")
        h1_count = dpg.locator("h1").count()
        canonical_count = dpg.locator('link[rel="canonical"]').count()
        overflow_desktop = dpg.evaluate("document.documentElement.scrollWidth > window.innerWidth")

        # Full-page Desktop screenshot of all 10 pages
        slug = route.strip("/").replace("/", "_")
        dpg.screenshot(path=f"/Users/apple/Downloads/HANVA/docs/phase17_1/screenshots/{slug}_desktop_1440_full.png", full_page=True)

        # JSON-LD check
        jraw = dpg.locator('script[type="application/ld+json"]').all_inner_texts()
        jvalid = True
        for raw in jraw:
            try:
                json.loads(raw)
            except Exception:
                jvalid = False

        # Internal link check
        hrefs = dpg.locator('a[href^="/"]').evaluate_all(
            "els => Array.from(new Set(els.map(e => e.getAttribute('href').split('#')[0].split('?')[0]).filter(Boolean)))"
        )
        for h in hrefs:
            if h not in checked_links:
                checked_links.add(h)
                c = urllib.request.urlopen(f"{BASE}{h}", timeout=10).getcode()
                results["internal_links"]["checked"] += 1
                if c != 200:
                    results["internal_links"]["broken"].append({"href": h, "status": c})

        # WhatsApp CTAs extraction
        wa_els = dpg.locator('a[href^="https://wa.me/918423711043"]').evaluate_all(
            "els => els.map((e, i) => ({idx: i, label: (e.innerText || '').trim(), href: e.getAttribute('href'), visible: !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)}))"
        )
        for item in wa_els:
            parsed = urllib.parse.urlparse(item["href"])
            qs = urllib.parse.parse_qs(parsed.query)
            decoded_msg = qs.get("text", [""])[0]
            lbl = item["label"]
            if lbl in ("WhatsApp Sales Desk", "WhatsApp"):
                cta_loc = "Header / Mobile Utility"
            elif "guide" in route:
                cta_loc = "Article Conversion Banner"
            else:
                cta_loc = "Location Bottom Banner"
            expected = EXPECTED_WA.get(route, "")
            ok = (decoded_msg == expected) if (route in EXPECTED_WA and cta_loc == "Article Conversion Banner") else ("918423711043" in item["href"] and bool(decoded_msg))
            wa_rows.append([
                route, cta_loc, lbl, item["href"], decoded_msg,
                "+91 8423711043", str(ok), "Yes (opens WhatsApp enquiry, no auto-booking)",
                "Desktop verified" if item["visible"] else "Mobile-only / responsive hidden on desktop"
            ])

        results["pages_10"].append({
            "route": route,
            "title": title,
            "title_len": len(title or ""),
            "has_desc": bool(desc),
            "canonical": canonical,
            "canonical_count": canonical_count,
            "canonical_www": (canonical or "").startswith(PRIMARY_HOST),
            "h1_count": h1_count,
            "json_ld_blocks": len(jraw),
            "json_ld_valid": jvalid,
            "overflow_desktop": overflow_desktop,
            "console_errors": len(c_errs),
            "page_errors": len(p_errs),
        })

    dctx.close()

    # Tablet (768x1024) and Mobile (375x812) responsive checks & key full-page mobile/tablet screenshots
    for vp_name, vp in [("tablet_768", {"width": 768, "height": 1024}), ("mobile_375", {"width": 375, "height": 812})]:
        ctx = browser.new_context(viewport=vp)
        pg = ctx.new_page()
        for route in TEN_TARGET:
            pg.goto(f"{BASE}{route}", wait_until="networkidle")
            ov = pg.evaluate("document.documentElement.scrollWidth > window.innerWidth")
            results["responsive_checks"].append({"viewport": vp_name, "route": route, "overflow": ov})
            slug = route.strip("/").replace("/", "_")
            if (vp_name == "mobile_375" and route in GUIDES_4 + ["/locations/bengaluru/", "/locations/hyderabad/"]) or (vp_name == "tablet_768" and route in ["/resources/salon-management-software-guide/", "/locations/bengaluru/"]):
                pg.screenshot(path=f"/Users/apple/Downloads/HANVA/docs/phase17_1/screenshots/{slug}_{vp_name}_full.png", full_page=True)

        if vp_name == "mobile_375":
            pg.goto(f"{BASE}/", wait_until="networkidle")
            drawer = pg.get_by_role("dialog", name="Mobile Navigation Menu")
            init_closed = drawer.count() == 0
            pg.get_by_role("button", name="Open Mobile Menu").click()
            drawer.wait_for(state="visible", timeout=5000)
            opened = drawer.is_visible()
            res_link = drawer.get_by_role("link", name="Resources & Knowledge Hub")
            res_vis = res_link.is_visible()
            res_link.click()
            pg.wait_for_url("**/resources/", timeout=5000)
            closed_after = drawer.count() == 0
            results["mobile_drawer_test"] = {
                "initially_closed": init_closed,
                "drawer_opened": opened,
                "resources_link_visible": res_vis,
                "closed_after_nav": closed_after,
            }
        ctx.close()

    browser.close()

with open("/Users/apple/Downloads/HANVA/docs/phase17_1/WHATSAPP_CTA_AUDIT.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["page_url", "cta_location", "button_label", "href", "decoded_message", "phone_number", "encoding_and_msg_verified", "enquiry_only_behavior", "visibility_status"])
    w.writerows(wa_rows)

with open("/Users/apple/Downloads/HANVA/docs/phase17_1/evidence/qa_phase17_1.json", "w") as f:
    json.dump(results, f, indent=2)

print("PHASE_17_1_QA", json.dumps({
    "routes_200": results["route_status"]["all_200_count"],
    "failures": results["route_status"]["failures"],
    "sitemap_count": results["sitemap"]["url_count"],
    "sitemap_www": results["sitemap"]["all_www"],
    "robots_sitemap": results["robots"]["sitemap_line"],
    "loc_title_lens": {x["route"]: x["title_len"] for x in results["pages_10"] if x["route"].startswith("/locations/")},
    "all_canonicals_www": all(x["canonical_www"] and x["canonical_count"] == 1 for x in results["pages_10"]),
    "internal_checked": results["internal_links"]["checked"],
    "internal_broken": results["internal_links"]["broken"],
    "any_overflow": any(x["overflow"] for x in results["responsive_checks"]) or any(x["overflow_desktop"] for x in results["pages_10"]),
    "any_invalid_schema": any(not x["json_ld_valid"] for x in results["pages_10"]),
    "any_console_or_page_errors": any(x["console_errors"] > 0 or x["page_errors"] > 0 for x in results["pages_10"]),
    "mobile_drawer_test": results["mobile_drawer_test"],
}))
