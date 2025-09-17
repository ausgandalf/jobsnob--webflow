import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time

visited = set()

def crawl(url, target_name, base_domain, depth=0, max_depth=5):
    # print(f"Checking on {url} at depth {depth}")
    if url in visited or depth > max_depth:
        return
    visited.add(url)

    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return

    soup = BeautifulSoup(res.text, 'html.parser')

    # Check for the target element by name
    if soup.find(attrs={"name": target_name}):
        print(f"✅ Found element with name='{target_name}' at {url}")
        return

    # Get all internal links
    for link in soup.find_all('a', href=True):
        href = link['href']
        full_url = urljoin(url, href)
        parsed = urlparse(full_url)

        if parsed.netloc == base_domain:
            crawl(full_url, target_name, base_domain, depth + 1, max_depth)

if __name__ == "__main__":
    START_URL = "https://www.jobsnob.com/jobs"  # ← your Webflow site URL
    TARGET_NAME = "Email-3"                # ← name of the form input you're looking for
    # TARGET_NAME = "wf-form-Form"                # ← name of the form input you're looking for

    parsed_url = urlparse(START_URL)
    domain = parsed_url.netloc

    crawl(START_URL, TARGET_NAME, domain)
