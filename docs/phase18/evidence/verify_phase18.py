import json
import os
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3001"
PRIMARY_HOST = "https://www.hanva.in"

ROUTES_69 = [
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
    "/resources/salon-management-software-guide/", "/resources/restaurant-pos-kot-inventory-guide/",
    "/resources/crm-with-ivr-vs-telecalling-crm/", "/resources/saas-vs-custom-crm-erp-guide/",
    "/company/about/", "/company/careers/", "/company/security-and-trust/",
    "/company/privacy-policy/", "/company/terms-of-service/",
]

KEY_SCREENSHOT_ROUTES = [
    "/",
    "/products/",
    "/products/crm/",
    "/products/salon-software/",
    "/products/restaurant-pos/",
    "/digital-marketing/",
    "/software-development/",
    "/company/contact/",
    "/company/about/",
    "/locations/bengaluru/",
    "/resources/salon-management-software-guide/",
]

RESPONSIVE_SAMPLE_ROUTES = [
    "/",
    "/products/",
    "/products/crm/",
    "/products/salon-software/",
    "/products/restaurant-pos/",
    "/products/cloud-telephony/",
    "/products/ivr-system/",
    "/digital-marketing/",
    "/software-development/",
    "/company/contact/",
    "/company/about/",
    "/pricing/",
    "/pricing/calculator/",
    "/locations/bengaluru/",
    "/locations/hyderabad/",
    "/locations/chennai/",
    "/locations/mumbai/",
    "/locations/delhi-ncr/",
    "/locations/pune/",
    "/resources/salon-management-software-guide/",
    "/resources/restaurant-pos-kot-inventory-guide/",
    "/resources/crm-with-ivr-vs-telecalling-crm/",
    "/resources/saas-vs-custom-crm-erp-guide/",
]

results = {
    "route_http_200": 0,
    "route_http_failures": [],
    "security_headers": {},
    "sitemap": {"status": None, "url_count": 0, "all_www": False, "missing": []},
    "robots": {"status": None, "sitemap_line": None},
    "redirects_checked": [],
    "pages_69": [],
    "internal_links": {"checked": 0, "broken": []},
    "whatsapp_links": {"checked": 0, "invalid": []},
    "responsive_checks": [],
    "interactive_tests": {},
}

# 1. HTTP status & headers check across all 69 routes
for i, route in enumerate(ROUTES_69):
    req = urllib.request.Request(f"{BASE}{route}")
    with urllib.request.urlopen(req, timeout=10) as resp:
        code = resp.getcode()
        if code == 200:
            results["route_http_200"] += 1
        else:
            results["route_http_failures"].append({"route": route, "status": code})
        if i == 0:
            hdrs = {k.lower(): v for k, v in resp.headers.items()}
            results["security_headers"] = {
                "strict-transport-security": hdrs.get("strict-transport-security"),
                "x-content-type-options": hdrs.get("x-content-type-options"),
                "x-frame-options": hdrs.get("x-frame-options"),
                "referrer-policy": hdrs.get("referrer-policy"),
                "permissions-policy": hdrs.get("permissions-policy"),
                "content-security-policy": hdrs.get("content-security-policy"),
                "x-dns-prefetch-control": hdrs.get("x-dns-prefetch-control"),
                "x-powered-by-present": "x-powered-by" in hdrs,
            }

# 2. Legacy redirect spot checks (no auto-follow)
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

opener = urllib.request.build_opener(NoRedirect)
for src, expected_dest in [("/contact/", "/company/contact/"), ("/services/", "/products/"), ("/about/", "/company/about/")]:
    try:
        opener.open(f"{BASE}{src}", timeout=10)
        results["redirects_checked"].append({"src": src, "status": 200, "ok": False})
    except urllib.error.HTTPError as e:
        loc = e.headers.get("Location", "")
        results["redirects_checked"].append({"src": src, "status": e.code, "location": loc, "ok": e.code in (301, 308) and loc.endswith(expected_dest)})

# 3. Sitemap & Robots check
with urllib.request.urlopen(f"{BASE}/sitemap.xml", timeout=10) as sm:
    results["sitemap"]["status"] = sm.getcode()
    root = ET.fromstring(sm.read().decode("utf-8"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [el.text for el in root.findall(".//s:loc", ns)]
    results["sitemap"]["url_count"] = len(locs)
    results["sitemap"]["all_www"] = all(l.startswith(PRIMARY_HOST) for l in locs)
    results["sitemap"]["missing"] = [f"{PRIMARY_HOST}{r}" for r in ROUTES_69 if f"{PRIMARY_HOST}{r}" not in locs]

with urllib.request.urlopen(f"{BASE}/robots.txt", timeout=10) as rb:
    results["robots"]["status"] = rb.getcode()
    for line in rb.read().decode("utf-8").splitlines():
        if line.lower().startswith("sitemap:"):
            results["robots"]["sitemap_line"] = line.strip()

checked_internal = set()

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    pg = ctx.new_page()
    pg.add_init_script("window.__cspViolations = []; window.addEventListener('securitypolicyviolation', e => window.__cspViolations.push({blockedURI: e.blockedURI, violatedDirective: e.violatedDirective}));")
    c_errs, p_errs = [], []
    pg.on("console", lambda m: c_errs.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: p_errs.append(str(e)))

    # 4. Verify all 69 routes in Chromium
    for route in ROUTES_69:
        c_errs.clear()
        p_errs.clear()
        pg.goto(f"{BASE}{route}", wait_until="networkidle")
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        pg.wait_for_timeout(150)
        pg.evaluate("window.scrollTo(0, 0)")
        title = pg.title()
        canonical = pg.locator('link[rel="canonical"]').get_attribute("href")
        desc = pg.locator('meta[name="description"]').get_attribute("content")
        robots_meta = pg.locator('meta[name="robots"]').get_attribute("content") or ""
        og_title = pg.locator('meta[property="og:title"]').get_attribute("content")
        h1_count = pg.locator("h1").count()
        overflow = pg.evaluate("document.documentElement.scrollWidth > window.innerWidth")
        broken_imgs = pg.evaluate("Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalWidth === 0).map(i => i.src)")
        csp_viols = pg.evaluate("window.__cspViolations || []")

        # Schema check
        jraw = pg.locator('script[type="application/ld+json"]').all_inner_texts()
        jvalid = True
        for raw in jraw:
            try:
                json.loads(raw)
            except Exception:
                jvalid = False

        # Internal link check
        hrefs = pg.locator('a[href^="/"]').evaluate_all(
            "els => Array.from(new Set(els.map(e => e.getAttribute('href').split('#')[0].split('?')[0]).filter(Boolean)))"
        )
        for h in hrefs:
            if h not in checked_internal:
                checked_internal.add(h)
                c = urllib.request.urlopen(f"{BASE}{h}", timeout=10).getcode()
                results["internal_links"]["checked"] += 1
                if c != 200:
                    results["internal_links"]["broken"].append({"href": h, "status": c})

        # WhatsApp links check
        wa_hrefs = pg.locator('a[href^="https://wa.me/"]').evaluate_all("els => els.map(e => e.getAttribute('href'))")
        for wh in wa_hrefs:
            results["whatsapp_links"]["checked"] += 1
            if not wh.startswith("https://wa.me/918423711043"):
                results["whatsapp_links"]["invalid"].append({"route": route, "href": wh})

        if route in KEY_SCREENSHOT_ROUTES:
            slug = "home" if route == "/" else route.strip("/").replace("/", "_")
            pg.screenshot(path=f"/Users/apple/Downloads/HANVA/docs/phase18/screenshots/{slug}_desktop_1440.png", full_page=True)

        results["pages_69"].append({
            "route": route,
            "title_len": len(title or ""),
            "has_desc": bool(desc),
            "has_og_title": bool(og_title),
            "noindex": "noindex" in robots_meta.lower(),
            "canonical_www": (canonical or "").startswith(PRIMARY_HOST),
            "h1_count": h1_count,
            "json_ld_valid": jvalid,
            "overflow_desktop": overflow,
            "broken_imgs": broken_imgs,
            "csp_violations": len(csp_viols),
            "console_errors": len(c_errs),
            "page_errors": len(p_errs),
        })

    # 5. Interactive tests on Contact Page (SearchParams hydration + Form Submit handoff)
    pg.goto(f"{BASE}/company/contact/?product=crm&plan=growth-pro", wait_until="networkidle")
    ctx_badge = pg.locator("text=Pre-selected context:").is_visible()
    pg.fill('input[name="fullName"]', "Phase 18 Verification User")
    pg.fill('input[name="workEmail"]', "qa@example.com")
    pg.fill('input[name="phone"]', "9876543210")
    pg.click('button[type="submit"]')
    pg.wait_for_selector("text=WhatsApp", timeout=5000)
    handoff_visible = pg.locator('a[href^="https://wa.me/918423711043?text="]').count() > 0
    results["interactive_tests"]["contact_form"] = {
        "context_badge_visible": ctx_badge,
        "handoff_whatsapp_generated": handoff_visible,
    }

    # 6. Interactive Pricing Calculator check
    pg.goto(f"{BASE}/pricing/calculator/", wait_until="networkidle")
    calc_has_h1 = pg.locator("h1").count() == 1
    results["interactive_tests"]["pricing_calculator_loaded"] = calc_has_h1

    ctx.close()

    # 7. Tablet & Mobile responsive tests + Mobile Drawer
    for vp_name, vp in [("tablet_768", {"width": 768, "height": 1024}), ("mobile_375", {"width": 375, "height": 812})]:
        vctx = browser.new_context(viewport=vp)
        vpg = vctx.new_page()
        for route in RESPONSIVE_SAMPLE_ROUTES:
            vpg.goto(f"{BASE}{route}", wait_until="networkidle")
            ov = vpg.evaluate("document.documentElement.scrollWidth > window.innerWidth")
            results["responsive_checks"].append({"viewport": vp_name, "route": route, "overflow": ov})
            if vp_name == "mobile_375" and route in ("/", "/company/contact/", "/products/crm/", "/locations/bengaluru/"):
                slug = "home" if route == "/" else route.strip("/").replace("/", "_")
                vpg.screenshot(path=f"/Users/apple/Downloads/HANVA/docs/phase18/screenshots/{slug}_mobile_375.png", full_page=True)
            if vp_name == "tablet_768" and route in ("/", "/products/"):
                slug = "home" if route == "/" else route.strip("/").replace("/", "_")
                vpg.screenshot(path=f"/Users/apple/Downloads/HANVA/docs/phase18/screenshots/{slug}_tablet_768.png", full_page=True)

        if vp_name == "mobile_375":
            vpg.goto(f"{BASE}/", wait_until="networkidle")
            drawer = vpg.get_by_role("dialog", name="Mobile Navigation Menu")
            init_closed = drawer.count() == 0
            vpg.get_by_role("button", name="Open Mobile Menu").click()
            drawer.wait_for(state="visible", timeout=5000)
            opened = drawer.is_visible()
            res_link = drawer.get_by_role("link", name="Resources & Knowledge Hub")
            res_vis = res_link.is_visible()
            res_link.click()
            vpg.wait_for_url("**/resources/", timeout=5000)
            closed_after = drawer.count() == 0
            results["interactive_tests"]["mobile_drawer"] = {
                "initially_closed": init_closed,
                "drawer_opened": opened,
                "resources_link_visible": res_vis,
                "closed_after_nav": closed_after,
            }
        vctx.close()

    browser.close()

with open("/Users/apple/Downloads/HANVA/docs/phase18/evidence/qa_phase18.json", "w") as f:
    json.dump(results, f, indent=2)

summary = {
    "route_http_200": results["route_http_200"],
    "route_http_failures": results["route_http_failures"],
    "sitemap_count": results["sitemap"]["url_count"],
    "sitemap_www": results["sitemap"]["all_www"],
    "sitemap_missing": results["sitemap"]["missing"],
    "robots_sitemap": results["robots"]["sitemap_line"],
    "redirects_ok": all(x["ok"] for x in results["redirects_checked"]),
    "security_headers": results["security_headers"],
    "pages_checked": len(results["pages_69"]),
    "all_canonicals_www": all(x["canonical_www"] for x in results["pages_69"]),
    "any_noindex": any(x["noindex"] for x in results["pages_69"]),
    "any_invalid_schema": any(not x["json_ld_valid"] for x in results["pages_69"]),
    "any_broken_imgs": [x["route"] for x in results["pages_69"] if x["broken_imgs"]],
    "any_csp_violations": sum(x["csp_violations"] for x in results["pages_69"]),
    "any_console_or_page_errors": sum(x["console_errors"] + x["page_errors"] for x in results["pages_69"]),
    "internal_links_checked": results["internal_links"]["checked"],
    "internal_links_broken": results["internal_links"]["broken"],
    "whatsapp_links_checked": results["whatsapp_links"]["checked"],
    "whatsapp_links_invalid": results["whatsapp_links"]["invalid"],
    "any_overflow": any(x["overflow"] for x in results["responsive_checks"]) or any(x["overflow_desktop"] for x in results["pages_69"]),
    "interactive_tests": results["interactive_tests"],
}
print("PHASE_18_QA", json.dumps(summary, indent=2))
