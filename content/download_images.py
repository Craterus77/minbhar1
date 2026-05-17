import re
import os
import urllib.request
import urllib.error

URLS = [
    "https://laurakincade.com/products/monte-carlo-dining-chair",
    "https://laurakincade.com/products/tuxedo-tall-cabinet",
    "https://www.freedom.com.au/product/13288682",
    "https://www.bodhiliving.com.au/products/panama-rattan-entertainment-unit",
    "https://www.bodhiliving.com.au/products/panama-4-door-rattan-buffet",
    "https://www.bodhiliving.com.au/products/panama-rattan-2-door-buffet",
    "https://cozymatic.com.au/collections/closet/products/alexis-modular-drawer",
    "https://cozymatic.com.au/collections/closet/products/noelle-wood-sideboard",
    "https://cozymatic.com.au/collections/dining-chairs/products/sunbury-beech-foldable-chair-set-of-2",
    "https://cozymatic.com.au/collections/dining-chairs/products/harlow-artistic-handcrafted-stool-set-of-2",
    "https://cozymatic.com.au/collections/dining-chairs/products/herner-tufted-side-chair",
    "https://cozymatic.com.au/collections/chest-of-drawers/products/hannah-5-drawer-chest",
    "https://cozymatic.com.au/collections/accent-chairs/products/decrescendo-tufted-armchair",
    "https://cozymatic.com.au/collections/accent-chairs/products/aquino-faux-leather-armchair",
    "https://cozymatic.com.au/collections/top-rated/products/bentwood-butterfly-accent-stool",
    "https://online.majuhome.com.my/collections/display-cabinet/products/marrion-display-cabinet",
    "https://online.majuhome.com.my/collections/side-tables/products/tropical-side-table",
    "https://online.majuhome.com.my/collections/dining-tables/products/willa-marble-dining-table-1",
    "https://online.majuhome.com.my/collections/dining-tables/products/arlene-dining-table",
    "https://www.ruma-home.com/scarlett-2-doors-display-cabinet",
    "https://www.ruma-home.com/reclaimed-wood-4-doors-sideboard",
    "https://www.ruma-home.com/merrington-walnut-sideboard",
    "https://www.fortytwo.sg/living-room/console-table/tal-multipurpose-console.html",
    "https://www.fortytwo.sg/dining/bar-stool/bogota-bar-stool-in-light-grey.html",
]

OUT_DIR = r"N:\minbhar\content\product-images"
os.makedirs(OUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

OG_PATTERNS = [
    re.compile(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', re.IGNORECASE),
    re.compile(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', re.IGNORECASE),
    re.compile(r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']', re.IGNORECASE),
    re.compile(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']twitter:image["\']', re.IGNORECASE),
]


def slug_from_url(url):
    # Take the last meaningful path segment(s)
    path = re.sub(r"https?://[^/]+/", "", url)
    path = re.sub(r"[^a-zA-Z0-9/_-]", "", path)
    slug = path.replace("/", "_").strip("_")
    return slug[-80:] if len(slug) > 80 else slug


def fetch_html(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode("utf-8", errors="replace")


def find_og_image(html):
    for pat in OG_PATTERNS:
        m = pat.search(html)
        if m:
            img = m.group(1).strip()
            if img.startswith("//"):
                img = "https:" + img
            return img
    return None


def ext_from_url(img_url):
    m = re.search(r"\.(png|webp|jpeg|jpg|gif)", img_url, re.IGNORECASE)
    return m.group(1).lower() if m else "jpg"


def download_image(img_url, out_path):
    req = urllib.request.Request(img_url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = resp.read()
    with open(out_path, "wb") as f:
        f.write(data)


results = []
for url in URLS:
    slug = slug_from_url(url)
    print(f"Fetching: {url}")
    try:
        html = fetch_html(url)
        img_url = find_og_image(html)
        if not img_url:
            print(f"  [WARN] No og:image found")
            results.append((slug, url, None, "no-og-image"))
            continue
        ext = ext_from_url(img_url)
        filename = f"{slug}.{ext}"
        out_path = os.path.join(OUT_DIR, filename)
        print(f"  -> {img_url}")
        download_image(img_url, out_path)
        size = os.path.getsize(out_path)
        print(f"  Saved: {filename} ({size:,} bytes)")
        results.append((slug, url, img_url, f"OK ({size:,} bytes)"))
    except Exception as e:
        print(f"  [ERROR] {e}")
        results.append((slug, url, None, f"ERROR: {e}"))

print("\n=== Summary ===")
for slug, url, img, status in results:
    mark = "✓" if status.startswith("OK") else "✗"
    print(f"  {mark} {slug[:50]:<50} {status}")
