"""Generate a local search index from the published page content."""
from html.parser import HTMLParser
from pathlib import Path
import json
import sys

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist')
class Content(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip = 0; self.heading = False; self.title = []; self.text = []
    def handle_starttag(self, tag, attrs):
        if tag in {'script', 'style', 'header', 'footer', 'dialog', 'noscript'}: self.skip += 1
        if tag == 'h1': self.heading = True
    def handle_endtag(self, tag):
        if tag in {'script', 'style', 'header', 'footer', 'dialog', 'noscript'}: self.skip -= 1
        if tag == 'h1': self.heading = False
    def handle_data(self, value):
        if not self.skip:
            self.text.append(value)
            if self.heading: self.title.append(value)

entries = []
for path in sorted(root.rglob('index.html')):
    page = Content(); page.feed(path.read_text())
    route = '/' + path.relative_to(root).as_posix().removesuffix('index.html')
    entries.append({'title': ' '.join(' '.join(page.title).split()), 'text': ' '.join(' '.join(page.text).split()), 'href': route})
(root / 'search-index.json').write_text(json.dumps(entries, ensure_ascii=False, separators=(',', ':')))
print(f'Search index: {len(entries)} pages')
