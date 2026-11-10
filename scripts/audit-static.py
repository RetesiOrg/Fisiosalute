"""Audit generated metadata, HTML landmarks, headings, labels and local links.

This verifies the site's HTML contract, not the entire HTML specification or
eligibility for Google's rich results. Run after the Astro build.
"""
import argparse
from collections import Counter
from dataclasses import dataclass, field
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
HEADINGS = {f'h{i}' for i in range(1, 7)}
SITE = 'https://www.fisiosalute.it'

@dataclass
class Element:
    tag: str
    attrs: dict
    parent: object = None
    children: list = field(default_factory=list)

    def text(self):
        if self.tag in {'script', 'style'}:
            return ''
        return ' '.join(child.text() if isinstance(child, Element) else child for child in self.children).strip()

    def within(self, tag):
        parent = self.parent
        while parent:
            if parent.tag == tag:
                return True
            parent = parent.parent
        return False

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.root = Element('document', {})
        self.stack = [self.root]
        self.elements = []
        self.markup_issues = []
        self.doctype = None

    def handle_decl(self, decl):
        self.doctype = decl.lower()

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if len(attributes) != len(attrs):
            self.markup_issues.append(f'duplicate attribute on <{tag}>')
        element = Element(tag, attributes, self.stack[-1])
        self.stack[-1].children.append(element)
        self.elements.append(element)
        if tag not in VOID:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        if self.stack[-1].tag == tag:
            self.stack.pop()
        else:
            self.markup_issues.append(f'unexpected closing </{tag}>')

    def handle_data(self, value):
        self.stack[-1].children.append(value)

    def all(self, tag):
        return [element for element in self.elements if element.tag == tag]


def route_for(path, root):
    route = '/' + path.relative_to(root).as_posix()
    return route.removesuffix('index.html') if route.endswith('index.html') else route


def audit_page(page, route):
    issues = list(page.markup_issues)
    def require(valid, message):
        if not valid:
            issues.append(message)

    require(len(page.stack) == 1, 'unclosed HTML elements')
    require(page.doctype == 'doctype html', 'missing HTML5 doctype')
    for tag in ['html', 'head', 'body', 'main', 'h1']:
        require(len(page.all(tag)) == 1, f'expected one <{tag}>, found {len(page.all(tag))}')
    require(any(e.attrs.get('lang') == 'it' for e in page.all('html')), 'missing Italian document language')
    require(any(e.attrs.get('charset', '').lower() == 'utf-8' for e in page.all('meta')), 'missing UTF-8 charset')
    h1s = page.all('h1')
    require(bool(h1s) and bool(h1s[0].text()) and h1s[0].within('main'), 'missing main page heading')
    require(any(e.attrs.get('id') == 'main-content' for e in page.all('main')), 'missing main-content landmark')
    require(any(e.attrs.get('href') == '#main-content' for e in page.all('a')), 'missing skip link')
    footers = page.all('footer')
    require(len(footers) == 1 and not footers[0].within('main'), 'site footer must be outside <main>')
    require(any('site-header' in e.attrs.get('class', '').split() and not e.within('main') for e in page.all('header')), 'missing site header outside main')
    headings = [e for e in page.elements if e.tag in HEADINGS and e.within('main')]
    previous = 0
    for heading in headings:
        level = int(heading.tag[1])
        require(level <= previous + 1, f'heading level skipped before {heading.tag}: {heading.text()}')
        require(bool(heading.text()), f'empty <{heading.tag}>')
        previous = level
    ids = Counter(e.attrs['id'] for e in page.elements if e.attrs.get('id'))
    for identifier, count in ids.items():
        require(count == 1, f'duplicate id: {identifier}')
    labels = {e.attrs['for'] for e in page.all('label') if e.attrs.get('for')}
    for element in page.elements:
        a = element.attrs
        for attribute in ['aria-labelledby', 'aria-describedby', 'aria-controls']:
            for identifier in a.get(attribute, '').split():
                require(identifier in ids, f'missing {attribute} target: {identifier}')
        if element.tag in {'input', 'select', 'textarea'} and a.get('type') != 'hidden':
            require(bool(a.get('aria-label') or a.get('aria-labelledby') or a.get('id') in labels or element.within('label')), f'unlabelled <{element.tag}>: {a.get("id", "")}')
        if element.tag == 'button':
            require(a.get('type') in {'button', 'submit', 'reset'}, 'button missing explicit type')
            require(bool(a.get('aria-label') or a.get('aria-labelledby') or element.text()), 'button missing accessible name')
        if element.tag == 'nav':
            require(bool(a.get('aria-label') or a.get('aria-labelledby')), 'navigation missing accessible label')
        if element.tag == 'img':
            require('alt' in a, 'image missing alt')
            if a.get('src'):
                require(all(str(a.get(key, '')).isdigit() and int(a[key]) > 0 for key in ['width', 'height']), f'image missing intrinsic dimensions: {a["src"]}')
            else:
                require(element.within('dialog'), 'image missing src outside dialog')
        if element.tag == 'time':
            require(bool(a.get('datetime')), 'time missing datetime')
        if element.tag in {'a', 'form', 'label'}:
            require(not element.within(element.tag), f'nested <{element.tag}>')
        if element.tag in {'div', 'section', 'article', 'ul', 'ol', 'p'} | HEADINGS:
            require(not element.within('p'), f'block <{element.tag}> inside paragraph')
    metas = {}
    for element in page.all('meta'):
        key = element.attrs.get('name') or element.attrs.get('property')
        if key:
            metas.setdefault(key, []).append(element.attrs.get('content', ''))
    required_meta = ['viewport', 'description', 'robots', 'og:type', 'og:locale', 'og:site_name', 'og:url', 'og:title', 'og:description', 'og:image', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']
    for key in required_meta:
        require(len(metas.get(key, [])) == 1 and bool(metas[key][0].strip()), f'missing, empty or repeated metadata: {key}')
    def meta(key):
        return (metas.get(key) or [''])[0]
    require('width=device-width' in meta('viewport') and 'initial-scale=1' in meta('viewport'), 'incomplete viewport')
    titles = page.all('title')
    title = titles[0].text() if titles else ''
    require(len(titles) == 1 and bool(title), 'missing, empty or repeated title')
    for key in ['og:title', 'twitter:title']:
        require(meta(key) == title, f'{key} differs from title')
    for key in ['og:description', 'twitter:description']:
        require(meta(key) == meta('description'), f'{key} differs from description')
    canonicals = [e.attrs.get('href', '') for e in page.all('link') if e.attrs.get('rel') == 'canonical']
    canonical = canonicals[0] if canonicals else ''
    require(len(canonicals) == 1 and canonical == SITE + route, 'missing, repeated or incorrect canonical')
    require(meta('og:url') == canonical, 'og:url differs from canonical')
    for key in ['og:image', 'twitter:image']:
        require(meta(key).startswith(SITE + '/'), f'{key} must be an absolute site URL')
    require(meta('twitter:image') == meta('og:image'), 'social images differ')
    noindex = route == '/404.html'
    require(('noindex' in meta('robots')) == noindex, 'incorrect robots indexing directive')
    graphs = [e for e in page.all('script') if e.attrs.get('type') == 'application/ld+json']
    types = []
    require(len(graphs) == (0 if noindex else 1), 'incorrect number of JSON-LD graphs')
    if graphs:
        try:
            raw = ''.join(child for child in graphs[0].children if isinstance(child, str))
            data = json.loads(raw)
            require(data.get('@context') == 'https://schema.org', 'incorrect JSON-LD context')
            nodes = data['@graph']
            types = [node['@type'] for node in nodes]
            graph_ids = [node.get('@id') for node in nodes]
            require(len(graph_ids) == len(set(graph_ids)), 'duplicate JSON-LD entity ids')
            for kind in ['MedicalClinic', 'WebSite', 'WebPage']:
                require(types.count(kind) == 1, f'missing or repeated {kind} structured data')
            for node in nodes:
                if node['@type'] == 'WebPage':
                    require(node.get('url') == canonical and node.get('name') == title and node.get('description') == meta('description'), 'WebPage structured data differs from page metadata')
                if node['@type'] == 'BreadcrumbList':
                    items = node['itemListElement']
                    require(len(items) >= 2, 'breadcrumb needs at least two entries')
                    require([item['position'] for item in items] == list(range(1, len(items) + 1)), 'incorrect breadcrumb positions')
                    require(items[-1]['item'] == canonical, 'breadcrumb does not end at current page')
                    for item in items:
                        require(bool(item.get('name')) and item.get('item', '').startswith(SITE + '/'), 'invalid breadcrumb entry')
                if node['@type'] == 'Service':
                    require(bool(h1s) and node.get('name') == h1s[0].text(), 'service name differs from page heading')
                    require(node.get('provider', {}).get('@id') in graph_ids, 'service provider not defined in graph')
            if route.startswith('/servizi/') and route != '/servizi/':
                require('BreadcrumbList' in types, 'service/area missing breadcrumb structured data')
                if not route.startswith('/servizi/area/'):
                    require('Service' in types, 'service page missing Service structured data')
        except (ValueError, TypeError, KeyError, IndexError) as error:
            issues.append(f'invalid JSON-LD: {error}')
    return {'path': route, 'title': title, 'canonical': canonical, 'description': meta('description'), 'headings': [{'tag': e.tag, 'text': e.text()} for e in headings], 'structuredData': types, 'issues': issues}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', nargs='?', default='dist')
    parser.add_argument('--report', type=Path, help='Write a detailed JSON report')
    args = parser.parse_args()
    root = Path(args.directory).resolve()
    pages, results, problems = {}, [], []
    for path in sorted(root.rglob('*.html')):
        page = Page(path)
        page.feed(path.read_text())
        pages[path] = page
        result = audit_page(page, route_for(path, root))
        results.append(result)
        problems.extend(f'{result["path"]}: {issue}' for issue in result['issues'])
    if not pages:
        problems.append('No generated HTML found; run npm run build first')
    for key in ['title', 'description']:
        values = Counter(page[key] for page in results)
        for value, count in values.items():
            if value and count > 1:
                problems.append(f'duplicate {key} on {count} pages: {value}')
    references = 0
    for path, page in pages.items():
        for element in page.elements:
            refs = [element.attrs[key] for key in ['href', 'src'] if element.attrs.get(key)]
            if element.attrs.get('srcset'):
                refs.extend(item.strip().split()[0] for item in element.attrs['srcset'].split(','))
            for ref in refs:
                url = urlsplit(ref)
                if url.scheme or url.netloc:
                    continue
                target = root / unquote(url.path.lstrip('/')) if url.path.startswith('/') else path.parent / unquote(url.path) if url.path else path
                if target.is_dir():
                    target /= 'index.html'
                if not target.exists() and not target.suffix:
                    target /= 'index.html'
                target = target.resolve()
                references += 1
                if not target.exists():
                    problems.append(f'{route_for(path, root)}: broken {ref}')
                elif url.fragment and target in pages:
                    identifiers = {e.attrs.get('id') for e in pages[target].elements}
                    if unquote(url.fragment) not in identifiers:
                        problems.append(f'{route_for(path, root)}: missing anchor {ref}')
    summary = {'pages': len(pages), 'references': references, 'problems': problems}
    if args.report:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        args.report.write_text(json.dumps({**summary, 'details': results}, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    return bool(problems)

if __name__ == '__main__':
    raise SystemExit(main())
