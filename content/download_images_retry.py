"""Retry script for the 6 URLs that failed the first pass."""
import re
import os
import json
import urllib.request
import urllib.error
import ssl

OUT_DIR = r"N:\minbhar\content\product-images"
os.makedirs(OUT_DIR, exist_ok=True)

# Ignore SSL errors for stubborn sites
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS_CHROME = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cache-Control": "max-age=0",
}

OG_PATTERNS = [
    re.compile(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', re.IGNORECASE),
    re.compile(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', re.IGNORECASE),
    re.compile(r'"og:image"[^"]*"([^"]+)"', re.IGNORECASE),
    re.compile(r'<meta[^>]+name=["\']twitter:image["\'][^>]+content=["\']([^"\']+)["\']', re.IGNORECASE),
    re.compile(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']twitter:image["\']', re.IGNORECASE),
]


def fetch_html(url, extra_headers=None, referer=None):
    h = dict(HEADERS_CHROME)
    if extra_headers:
        h.update(extra_headers)
    if referer:
        h["Referer"] = referer
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=25, context=ctx) as resp:
        raw = resp.read()
    # Handle gzip transparently (urllib does this automatically for most cases)
    try:
        return raw.decode("utf-8", errors="replace")
    except Exception:
        return raw.decode("latin-1", errors="replace")


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


def download_image(img_url, out_path, referer=None):
    h = dict(HEADERS_CHROME)
    h["Accept"] = "image/webp,image/apng,image/*,*/*;q=0.8"
    if referer:
        h["Referer"] = referer
    req = urllib.request.Request(img_url, headers=h)
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        data = resp.read()
    with open(out_path, "wb") as f:
        f.write(data)
    return len(data)


def save(slug, img_url, referer=None):
    ext = ext_from_url(img_url)
    filename = f"{slug}.{ext}"
    out_path = os.path.join(OUT_DIR, filename)
    if os.path.exists(out_path):
        filename = f"{slug}_2.{ext}"
        out_path = os.path.join(OUT_DIR, filename)
    size = download_image(img_url, out_path, referer=referer)
    print(f"  Saved: {filename} ({size:,} bytes)")
    return filename


# ── freedom.com.au ──────────────────────────────────────────────────────────
print("\n--- freedom.com.au ---")
try:
    url = "https://www.freedom.com.au/product/13288682"
    html = fetch_html(url)
    # Freedom uses JSON-LD or window.__NEXT_DATA__ / window.universal_variable
    # Try extracting from a JSON blob
    json_match = re.search(r'"images"\s*:\s*\[([^\]]+)\]', html)
    img_url = None
    # Try og:image with different quoting
    img_url = find_og_image(html)
    if not img_url:
        # Try window.__NEXT_DATA__ style
        m = re.search(r'"primaryImage"\s*:\s*\{[^}]*"src"\s*:\s*"([^"]+)"', html)
        if m:
            img_url = m.group(1)
    if not img_url:
        # Try first large image src in html
        m = re.search(r'src="(https://[^"]+freedom[^"]+\.(jpg|png|webp))"', html)
        if m:
            img_url = m.group(1)
    if not img_url:
        # Dump a snippet to debug
        idx = html.find("image")
        print(f"  Snippet around 'image': {html[max(0,idx-50):idx+200]!r}")
    if img_url:
        print(f"  Found: {img_url}")
        save("freedom_product_13288682", img_url, referer=url)
    else:
        print("  Could not find image URL")
except Exception as e:
    print(f"  ERROR: {e}")

# ── ruma-home.com ─────────────────────────────────────────────────────────
RUMA_URLS = [
    ("https://www.ruma-home.com/scarlett-2-doors-display-cabinet", "ruma_scarlett-2-doors-display-cabinet"),
    ("https://www.ruma-home.com/reclaimed-wood-4-doors-sideboard", "ruma_reclaimed-wood-4-doors-sideboard"),
    ("https://www.ruma-home.com/merrington-walnut-sideboard", "ruma_merrington-walnut-sideboard"),
]

for url, slug in RUMA_URLS:
    print(f"\n--- {url} ---")
    try:
        html = fetch_html(url, extra_headers={"Referer": "https://www.ruma-home.com/"})
        img_url = find_og_image(html)
        if not img_url:
            # Squarespace stores images in JSON blobs
            m = re.search(r'"mainImageUrl"\s*:\s*"([^"]+)"', html)
            if m:
                img_url = m.group(1)
        if not img_url:
            m = re.search(r'"thumbnailUrl"\s*:\s*"([^"]+)"', html)
            if m:
                img_url = m.group(1)
        if not img_url:
            m = re.search(r'"url"\s*:\s*"(https://[^"]+\.(jpg|png|webp)[^"]*)"', html)
            if m:
                img_url = m.group(1)
        if img_url:
            if img_url.startswith("//"):
                img_url = "https:" + img_url
            print(f"  Found: {img_url}")
            save(slug, img_url, referer=url)
        else:
            # Debug snippet
            idx = html.find("image")
            print(f"  No image found. Snippet: {html[max(0,idx-30):idx+150]!r}")
    except Exception as e:
        print(f"  ERROR: {e}")

# ── fortytwo.sg ────────────────────────────────────────────────────────────
FORTYTWO_URLS = [
    ("https://www.fortytwo.sg/living-room/console-table/tal-multipurpose-console.html", "fortytwo_tal-multipurpose-console"),
    ("https://www.fortytwo.sg/dining/bar-stool/bogota-bar-stool-in-light-grey.html", "fortytwo_bogota-bar-stool-light-grey"),
]

for url, slug in FORTYTWO_URLS:
    print(f"\n--- {url} ---")
    try:
        html = fetch_html(url, extra_headers={"Referer": "https://www.fortytwo.sg/"})
        img_url = find_og_image(html)
        if not img_url:
            # Magento: try gallery JSON
            m = re.search(r'"full"\s*:\s*"(https?://[^"]+\.(jpg|png|webp)[^"]*)"', html)
            if m:
                img_url = m.group(1).replace("\\/", "/")
        if not img_url:
            m = re.search(r'"src"\s*:\s*"(https?://[^"]+fortytwo[^"]+\.(jpg|png|webp)[^"]*)"', html)
            if m:
                img_url = m.group(1).replace("\\/", "/")
        if not img_url:
            # Try first product image
            m = re.search(r'<img[^>]+class="[^"]*product[^"]*"[^>]+src="([^"]+)"', html, re.IGNORECASE)
            if m:
                img_url = m.group(1)
        if img_url:
            if img_url.startswith("//"):
                img_url = "https:" + img_url
            print(f"  Found: {img_url}")
            save(slug, img_url, referer=url)
        else:
            idx = html.find("image")
            print(f"  No image found. Snippet: {html[max(0,idx-30):idx+200]!r}")
    except Exception as e:
        print(f"  ERROR: {e}")

print("\nDone.")
