import concurrent.futures
import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from lxml import html

BASE = 'https://www.bekiragaoglusigorta.com.tr'
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; SiteMigrationAudit/1.0)'}

def get(url):
    parts = urllib.parse.urlsplit(url)
    url = urllib.parse.urlunsplit((parts.scheme, parts.netloc, urllib.parse.quote(parts.path, safe='/'), parts.query, parts.fragment))
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=35) as response:
        return response.read().decode('utf-8', 'replace')

def clean(s):
    return re.sub(r'\s+', ' ', s or '').strip()

def page(url):
    try:
        source = get(url)
        doc = html.fromstring(source)
        for node in doc.xpath('//script|//style|//noscript|//template|//svg'):
            node.drop_tree()
        main = doc.xpath('//main')
        root = main[0] if main else doc
        chunks = []
        for element in root.xpath('.//h1|.//h2|.//h3|.//h4|.//p|.//li'):
            value = clean(element.text_content())
            if value and (not chunks or chunks[-1]['text'] != value):
                chunks.append({'tag': element.tag, 'text': value})
        images = []
        seen = set()
        for element in root.xpath('.//img'):
            src = element.get('src') or element.get('data-src') or ''
            if not src or src.startswith('data:') or src in seen: continue
            seen.add(src)
            images.append({'src': src, 'alt': element.get('alt') or '', 'width': element.get('width'), 'height': element.get('height')})
        videos = []
        for element in root.xpath('.//video|.//source|.//iframe'):
            videos.append({'tag': element.tag, 'src': element.get('src'), 'poster': element.get('poster')})
        metas = {e.get('name') or e.get('property'): e.get('content') for e in doc.xpath('//meta[@content]') if e.get('name') or e.get('property')}
        title = clean(' '.join(doc.xpath('//title/text()')))
        return {'url': url, 'path': urllib.parse.urlsplit(url).path or '/', 'title': title, 'metadata': metas, 'chunks': chunks, 'images': images, 'videos': videos, 'error': None}
    except Exception as error:
        return {'url': url, 'error': str(error)}

if __name__ == '__main__':
    sitemap = ET.fromstring(get(BASE + '/pages-sitemap.xml'))
    urls = [element.text for element in sitemap.iter() if element.tag.endswith('loc')]
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        pages = list(pool.map(page, urls))
    with open('site-content.json', 'w') as out:
        json.dump(pages, out, ensure_ascii=False, indent=2)
    for p in pages:
        print(p['path'] if 'path' in p else p['url'],p.get('title'),len(p.get('chunks',[])),len(p.get('images',[])),p.get('error'))
