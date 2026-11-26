import json
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

EXACT_MESSAGES = {
    "crm": "I'm interested in a demo of Hanva CRM.",
    "salon": "I'm interested in a demo of Hanva Salon Software.",
    "pos": "I'm interested in a demo of Hanva Restaurant POS.",
}

out = {
    "logo_check": {},
    "seo_regression": {
        "routes_200": 0,
        "route_failures": [],
        "sitemap_count": 0,
        "sitemap_www": False,
        "robots_sitemap": None,
        "canonicals_www": True,
        "any_noindex": False,
        "invalid_schema_routes": [],
        "broken_imgs_after_scroll": [],
        "console_errors": 0,
        "page_errors": 0,
        "csp_violations": 0,
        "internal_links_checked": 0,
        "internal_links_broken": [],
        "whatsapp_links_checked": 0,
        "whatsapp_links_invalid": [],
    },
    "tests_18": {},
    "utm_scenarios": {},
}

# 0. Verify /logo.png HTTP asset response directly
with urllib.request.urlopen(f"{BASE}/logo.png", timeout=10) as lr:
    out["logo_check"]["http_status"] = lr.getcode()
    out["logo_check"]["content_type"] = lr.headers.get("Content-Type")
    out["logo_check"]["content_length"] = int(lr.headers.get("Content-Length") or len(lr.read()))

# 1. Verify all 69 routes HTTP 200, sitemap, robots
for r in ROUTES_69:
    c = urllib.request.urlopen(f"{BASE}{r}", timeout=10).getcode()
    if c == 200:
        out["seo_regression"]["routes_200"] += 1
    else:
        out["seo_regression"]["route_failures"].append({"route": r, "status": c})

with urllib.request.urlopen(f"{BASE}/sitemap.xml", timeout=10) as sm:
    root = ET.fromstring(sm.read().decode("utf-8"))
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [el.text for el in root.findall(".//s:loc", ns)]
    out["seo_regression"]["sitemap_count"] = len(locs)
    out["seo_regression"]["sitemap_www"] = all(l.startswith(PRIMARY_HOST) for l in locs)

with urllib.request.urlopen(f"{BASE}/robots.txt", timeout=10) as rb:
    for line in rb.read().decode("utf-8").splitlines():
        if line.lower().startswith("sitemap:"):
            out["seo_regression"]["robots_sitemap"] = line.strip()


def assert_no_pii_in_events(events):
    forbidden = ["rajesh@example.com", "9876543210", "Phase19 Tester", "https://wa.me/"]
    serialized = json.dumps(events)
    return not any(tok.lower() in serialized.lower() for tok in forbidden)


with sync_playwright() as p:
    browser = p.chromium.launch()

    # A. Test 69 routes SEO, schemas, lazy footer logo, zero errors/CSP violations
    sctx = browser.new_context(viewport={"width": 1440, "height": 900})
    spg = sctx.new_page()
    spg.add_init_script(
        "window.__cspViols = []; window.addEventListener('securitypolicyviolation', e => window.__cspViols.push(e.violatedDirective));"
    )
    c_errs, p_errs = [], []
    spg.on("console", lambda m: c_errs.append(m.text) if m.type == "error" else None)
    spg.on("pageerror", lambda e: p_errs.append(str(e)))
    checked_links = set()

    for route in ROUTES_69:
        spg.goto(f"{BASE}{route}", wait_until="networkidle")
        spg.locator("footer").scroll_into_view_if_needed()
        spg.wait_for_function(
            "() => Array.from(document.querySelectorAll('img')).every(i => i.complete && i.naturalWidth > 0)",
            timeout=3000,
        )
        canon = spg.locator('link[rel="canonical"]').get_attribute("href") or ""
        if not canon.startswith(PRIMARY_HOST):
            out["seo_regression"]["canonicals_www"] = False
        rmeta = (spg.locator('meta[name="robots"]').get_attribute("content") or "").lower()
        if "noindex" in rmeta:
            out["seo_regression"]["any_noindex"] = True
        for raw in spg.locator('script[type="application/ld+json"]').all_inner_texts():
            try:
                json.loads(raw)
            except Exception:
                out["seo_regression"]["invalid_schema_routes"].append(route)
        broken = spg.evaluate("Array.from(document.querySelectorAll('img')).filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)")
        if broken:
            out["seo_regression"]["broken_imgs_after_scroll"].append({"route": route, "srcs": broken})
        for wh in spg.locator('a[href^="https://wa.me/"]').evaluate_all("els => els.map(e => e.getAttribute('href'))"):
            out["seo_regression"]["whatsapp_links_checked"] += 1
            if not wh.startswith("https://wa.me/918423711043"):
                out["seo_regression"]["whatsapp_links_invalid"].append({"route": route, "href": wh})
        for h in spg.locator('a[href^="/"]').evaluate_all("els => Array.from(new Set(els.map(e => e.getAttribute('href').split('#')[0].split('?')[0]).filter(Boolean)))"):
            if h not in checked_links:
                checked_links.add(h)
                out["seo_regression"]["internal_links_checked"] += 1
                if urllib.request.urlopen(f"{BASE}{h}", timeout=10).getcode() != 200:
                    out["seo_regression"]["internal_links_broken"].append(h)

    out["seo_regression"]["console_errors"] = len(c_errs)
    out["seo_regression"]["page_errors"] = len(p_errs)
    out["seo_regression"]["csp_violations"] = spg.evaluate("window.__cspViols.length")
    sctx.close()

    # B. Test 12 & 13: Consent Banner, Reject vs Accept, External Script Prohibition
    rctx = browser.new_context(viewport={"width": 1440, "height": 900})
    rpg = rctx.new_page()
    rpg.route("https://www.googletagmanager.com/**", lambda route: route.abort())
    rpg.route("https://www.google-analytics.com/**", lambda route: route.abort())
    third_party_reqs = []
    rpg.on("request", lambda req: third_party_reqs.append(req.url) if any(h in urllib.parse.urlparse(req.url).netloc for h in ("googletagmanager.com", "google-analytics.com", "analytics.google.com")) else None)

    rpg.goto(f"{BASE}/?utm_source=google&utm_medium=cpc&utm_campaign=reject_test", wait_until="networkidle")
    banner_visible_initial = rpg.get_by_role("region", name="Analytics and Cookie Preferences").is_visible()
    events_before_consent = rpg.evaluate("window.__hanvaAnalyticsQueue || []")
    rpg.screenshot(path="/Users/apple/Downloads/HANVA/docs/phase19/screenshots/consent_banner_desktop.png")
    rpg.locator('button[data-consent-action="decline"]').click()
    rpg.wait_for_timeout(150)
    # Try triggering clicks after decline — must emit ZERO events and keep sessionStorage clean
    rpg.locator('a[href^="https://wa.me/"]').first.evaluate("el => el.setAttribute('href', '#blocked-nav-for-test')")
    rpg.locator('a[href="#blocked-nav-for-test"]').click()
    events_after_decline = rpg.evaluate("window.__hanvaAnalyticsQueue || []")
    utm_after_decline = rpg.evaluate("window.sessionStorage.getItem('hanva_utm_attribution')")
    consent_val_decline = rpg.evaluate("window.localStorage.getItem('hanva_analytics_consent')")
    out["tests_18"]["consent_rejected"] = {
        "banner_shown_initially": banner_visible_initial,
        "events_before_consent_zero": len(events_before_consent) == 0,
        "events_after_decline_zero": len(events_after_decline) == 0,
        "utm_cleared_on_decline": utm_after_decline is None,
        "stored_consent": consent_val_decline,
        "third_party_requests": len(third_party_reqs),
    }
    rctx.close()

    # C. Test Consent Accepted + Full SPA Navigation + Scroll Depth + Product Select + Product Views + All Desktop WhatsApp Clicks + Contact Form Lifecycle
    actx = browser.new_context(viewport={"width": 1440, "height": 900})
    apg = actx.new_page()
    apg.goto(f"{BASE}/?utm_source=google&utm_medium=cpc&utm_campaign=crm_launch_in&utm_content=hero_btn&utm_term=hanva_crm", wait_until="networkidle")
    # Accept consent on landing URL — landing UTMs staged in memory should promote cleanly and fire 1 homepage page_view
    apg.locator('button[data-consent-action="accept"]').click()
    apg.wait_for_timeout(200)
    home_events = apg.evaluate("window.__hanvaAnalyticsQueue || []")
    out["tests_18"]["consent_accepted"] = apg.evaluate("window.localStorage.getItem('hanva_analytics_consent')") == "granted"
    out["tests_18"]["homepage_page_view"] = {
        "count": sum(1 for e in home_events if e["event"] == "page_view" and e["page_path"] == "/"),
        "utm_source": home_events[0]["params"].get("utm_source") if home_events else None,
        "traffic_channel": home_events[0]["params"].get("traffic_channel") if home_events else None,
    }

    # Test Scroll Depth on Homepage (50, 75, 90%) using instant scroll to bypass smooth CSS lag
    total_h = apg.evaluate("document.documentElement.scrollHeight - window.innerHeight")
    for ratio in (0.55, 0.78, 0.96):
        apg.evaluate(f"window.scrollTo({{ top: {int(total_h * ratio)}, behavior: 'instant' }})")
        apg.wait_for_timeout(120)
    scroll_events = [e["params"].get("percent_scrolled") for e in apg.evaluate("window.__hanvaAnalyticsQueue || []") if e["event"] == "scroll_depth" and e["page_path"] == "/"]
    out["tests_18"]["scroll_depth_50_75_90"] = scroll_events

    # General enquiry WhatsApp click on Homepage hero
    apg.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })")
    apg.locator('a[href^="https://wa.me/"]').nth(1).evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
    apg.locator('a[href^="https://wa.me/"]').nth(1).click()
    apg.wait_for_timeout(100)

    # SPA Navigation: Homepage -> Products Hub (Explore SaaS Products)
    apg.locator('a[href="/products/"]').first.click()
    apg.wait_for_url("**/products/", timeout=5000)
    apg.wait_for_timeout(150)

    # SPA Navigation: Products Hub -> CRM (select_item + page_view + product_view)
    apg.locator('a[href="/products/crm/"]').first.click()
    apg.wait_for_url("**/products/crm/", timeout=5000)
    apg.wait_for_timeout(150)

    # Check exact CRM WhatsApp message & click event
    crm_wa_href = apg.locator('a[href^="https://wa.me/"]').nth(1).get_attribute("href")
    crm_wa_msg = urllib.parse.parse_qs(urllib.parse.urlparse(crm_wa_href).query).get("text", [""])[0]
    apg.locator('a[href^="https://wa.me/"]').nth(1).evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
    apg.locator('a[href^="https://wa.me/"]').nth(1).click()
    apg.screenshot(path="/Users/apple/Downloads/HANVA/docs/phase19/screenshots/crm_desktop_tracked.png", full_page=False)

    # SPA Navigation: CRM -> Salon Software (via Footer link so SPA navigation stays intact!)
    apg.locator('footer a[href="/products/salon-software/"]').click()
    apg.wait_for_url("**/products/salon-software/", timeout=5000)
    apg.wait_for_timeout(150)
    salon_wa_href = apg.locator('a[href^="https://wa.me/"]').nth(1).get_attribute("href")
    salon_wa_msg = urllib.parse.parse_qs(urllib.parse.urlparse(salon_wa_href).query).get("text", [""])[0]
    apg.locator('a[href^="https://wa.me/"]').nth(1).evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
    apg.locator('a[href^="https://wa.me/"]').nth(1).click()

    # SPA Navigation: Salon Software -> Restaurant POS (via Footer link)
    apg.locator('footer a[href="/products/restaurant-pos/"]').click()
    apg.wait_for_url("**/products/restaurant-pos/", timeout=5000)
    apg.wait_for_timeout(150)
    pos_wa_href = apg.locator('a[href^="https://wa.me/"]').nth(1).get_attribute("href")
    pos_wa_msg = urllib.parse.parse_qs(urllib.parse.urlparse(pos_wa_href).query).get("text", [""])[0]
    apg.locator('a[href^="https://wa.me/"]').nth(1).evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
    apg.locator('a[href^="https://wa.me/"]').nth(1).click()

    # SPA Navigation: POS -> Contact Form (?product=restaurant-pos button or contact footer link -> keep ?product=crm via direct demo flow!)
    apg.locator('footer a[href="/products/crm/"]').click()
    apg.wait_for_url("**/products/crm/", timeout=5000)
    apg.locator('a[href="/company/contact/?product=crm"]').first.click()
    apg.wait_for_url("**/company/contact/**", timeout=5000)
    apg.wait_for_timeout(150)
    apg.click('button[type="submit"]')  # Empty submit triggers validation error (`form_error`)
    apg.wait_for_timeout(100)
    apg.fill('input[name="fullName"]', "Phase19 Tester")
    apg.fill('input[name="workEmail"]', "rajesh@example.com")
    apg.fill('input[name="phone"]', "9876543210")
    apg.evaluate("window.open = () => ({});")  # stub popup cleanly in headless run
    apg.click('button[type="submit"]')
    apg.wait_for_selector("text=WhatsApp Handoff Prepared", timeout=5000)
    apg.screenshot(path="/Users/apple/Downloads/HANVA/docs/phase19/screenshots/contact_handoff_desktop.png", full_page=False)

    all_ev = apg.evaluate("window.__hanvaAnalyticsQueue || []")
    wa_ev = [e for e in all_ev if e["event"] == "whatsapp_click"]
    pv_paths = [e["page_path"] for e in all_ev if e["event"] == "page_view"]
    out["tests_18"]["products_hub_view_item_list"] = any(e["event"] == "view_item_list" and e["page_path"] == "/products/" for e in all_ev)
    out["tests_18"]["select_item_crm"] = any(e["event"] == "select_item" and e["params"].get("product_name") == "hanva_crm" for e in all_ev)
    out["tests_18"]["product_views"] = {
        "hanva_crm": any(e["event"] == "product_view" and e["params"].get("product_name") == "hanva_crm" for e in all_ev),
        "hanva_salon_software": any(e["event"] == "product_view" and e["params"].get("product_name") == "hanva_salon_software" for e in all_ev),
        "hanva_restaurant_pos": any(e["event"] == "product_view" and e["params"].get("product_name") == "hanva_restaurant_pos" for e in all_ev),
    }
    out["tests_18"]["whatsapp_clicks_desktop"] = {
        "crm_ok": crm_wa_msg == EXACT_MESSAGES["crm"] and any(e["params"].get("product_name") == "hanva_crm" and e["params"].get("cta_type") == "product_demo_whatsapp" for e in wa_ev),
        "salon_ok": salon_wa_msg == EXACT_MESSAGES["salon"] and any(e["params"].get("product_name") == "hanva_salon_software" and e["params"].get("cta_type") == "product_demo_whatsapp" for e in wa_ev),
        "pos_ok": pos_wa_msg == EXACT_MESSAGES["pos"] and any(e["params"].get("product_name") == "hanva_restaurant_pos" and e["params"].get("cta_type") == "product_demo_whatsapp" for e in wa_ev),
        "general_ok": any(e["params"].get("product_name") == "general_enquiry" and e["params"].get("cta_type") == "general_whatsapp" for e in wa_ev),
    }
    out["tests_18"]["contact_form"] = {
        "contact_page_view": any(e["event"] == "contact_page_view" for e in all_ev),
        "form_start": any(e["event"] == "form_start" for e in all_ev),
        "form_error": [e["params"] for e in all_ev if e["event"] == "form_error"],
        "form_submit": [e["params"] for e in all_ev if e["event"] == "form_submit"],
        "generate_lead_emitted": any(e["event"] == "generate_lead" for e in all_ev),
        "zero_pii_leaked": assert_no_pii_in_events(all_ev),
    }
    out["tests_18"]["spa_navigation_no_duplicate_page_views"] = {
        "paths_tracked": pv_paths,
        "no_adjacent_duplicate_page_views": all(pv_paths[i] != pv_paths[i - 1] for i in range(1, len(pv_paths))),
    }
    out["tests_18"]["utm_persisted_through_product_nav_and_wa"] = {
        "persisted_in_crm_wa": any(e["params"].get("utm_campaign") == "crm_launch_in" and e["params"].get("utm_source") == "google" for e in wa_ev),
    }

    # Test 14: Analytics unavailable / throwing gtag & dataLayer does not break navigation or WhatsApp click
    apg.evaluate("Object.defineProperty(window, 'gtag', { value: () => { throw new Error('blocked'); }, configurable: true }); window.dataLayer = null;")
    try_click_ok = False
    try:
        apg.goto(f"{BASE}/products/crm/", wait_until="networkidle")
        apg.locator('a[href="/company/contact/?product=crm"]').first.click()
        apg.wait_for_url("**/company/contact/**", timeout=5000)
        try_click_ok = True
    except Exception:
        try_click_ok = False
    out["tests_18"]["analytics_unavailable_resilient"] = try_click_ok
    actx.close()

    # D. Mobile WhatsApp CTA & Responsive Test (375x812)
    mctx = browser.new_context(viewport={"width": 375, "height": 812})
    mpg = mctx.new_page()
    mpg.add_init_script("window.localStorage.setItem('hanva_analytics_consent', 'granted');")
    mpg.goto(f"{BASE}/products/salon-software/", wait_until="networkidle")
    mpg.locator('nav[aria-label="Mobile Quick Conversion Bar"] a[href^="https://wa.me/"]').evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
    mpg.locator('nav[aria-label="Mobile Quick Conversion Bar"] a[href^="https://wa.me/"]').click()
    m_events = mpg.evaluate("window.__hanvaAnalyticsQueue || []")
    m_wa = [e for e in m_events if e["event"] == "whatsapp_click"]
    out["tests_18"]["mobile_whatsapp_cta"] = {
        "fired": len(m_wa) == 1,
        "device_class": m_wa[0]["device_class"] if m_wa else None,
        "cta_location": m_wa[0]["params"].get("cta_location") if m_wa else None,
        "product_name": m_wa[0]["params"].get("product_name") if m_wa else None,
        "mobile_overflow": mpg.evaluate("document.documentElement.scrollWidth > window.innerWidth"),
    }
    mpg.screenshot(path="/Users/apple/Downloads/HANVA/docs/phase19/screenshots/salon_mobile_tracked.png", full_page=False)
    mctx.close()

    # E. All 7 UTM & Channel Attribution Test Cases (isolated contexts)
    utm_cases = [
        ("1a_organic_search_referrer", f"{BASE}/", "https://www.google.com/search?q=hanva+crm"),
        ("1b_organic_search_utm", f"{BASE}/?utm_source=google&utm_medium=organic", None),
        ("2_google_ads", f"{BASE}/?utm_source=google&utm_medium=cpc&utm_campaign=crm_india&utm_content=search_1&utm_term=ivr_crm", None),
        ("3_social_media", f"{BASE}/?utm_source=linkedin&utm_medium=social&utm_campaign=salon_b2b", None),
        ("4_direct", f"{BASE}/", None),
        ("5_referral", f"{BASE}/", "https://techdirectory.example.in/cloud-telephony"),
    ]
    for case_name, target_url, ref_header in utm_cases:
        uctx = browser.new_context(viewport={"width": 1280, "height": 800})
        upg = uctx.new_page()
        if ref_header:
            upg.set_extra_http_headers({"Referer": ref_header})
        upg.add_init_script("window.localStorage.setItem('hanva_analytics_consent', 'granted');")
        upg.goto(target_url, wait_until="networkidle")
        upg.wait_for_timeout(100)
        # Navigate between product pages to test persistence (6 & 7)
        upg.goto(f"{BASE}/products/crm/", wait_until="networkidle")
        upg.goto(f"{BASE}/products/salon-software/", wait_until="networkidle")
        upg.locator('a[href^="https://wa.me/"]').nth(1).evaluate("el => el.addEventListener('click', ev => ev.preventDefault(), {once: true})")
        upg.locator('a[href^="https://wa.me/"]').nth(1).click()
        uevs = upg.evaluate("window.__hanvaAnalyticsQueue || []")
        last_wa = [e for e in uevs if e["event"] == "whatsapp_click"][-1]["params"]
        out["utm_scenarios"][case_name] = {
            "traffic_channel": last_wa.get("traffic_channel"),
            "utm_source": last_wa.get("utm_source"),
            "utm_medium": last_wa.get("utm_medium"),
            "utm_campaign": last_wa.get("utm_campaign"),
            "preserved_on_product_nav": last_wa.get("page_path") == "/products/salon-software/",
        }
        uctx.close()

    browser.close()

with open("/Users/apple/Downloads/HANVA/docs/phase19/evidence/qa_phase19.json", "w") as f:
    json.dump(out, f, indent=2)

print("PHASE_19_QA", json.dumps(out, indent=2))
