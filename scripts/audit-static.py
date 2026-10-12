"""Check every generated page and its local links, images and assets."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import json
import sys
root=Path(sys.argv[1] if len(sys.argv) > 1 else 'dist'); problems=[]
class Page(HTMLParser):
 def __init__(self,path):
  super().__init__();self.path=path;self.refs=[];self.ids=set();self.h1=0;self.images=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='img':
   self.images+=1
   if 'alt' not in a:problems.append(f'{self.path}: missing alt')
  for attr in ['href','src']:
   if a.get(attr):self.refs.append(a[attr])
  if a.get('srcset'):self.refs.extend(x.strip().split()[0] for x in a['srcset'].split(','))
pages={}
for p in root.rglob('*.html'):
 page=Page(p);page.feed(p.read_text());pages[p]=page
 if page.h1!=1:problems.append(f'{p}: {page.h1} h1 elements')
count=0
for path,page in pages.items():
 for ref in page.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=root/unquote(u.path.lstrip('/')) if u.path.startswith('/') else path.parent/unquote(u.path) if u.path else path
  if target.is_dir():target=target/'index.html'
  if not target.exists() and not target.suffix:target=target/'index.html'
  count+=1
  if not target.exists():problems.append(f'{path}: broken {ref}')
  elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:problems.append(f'{path}: missing anchor {ref}')
print(json.dumps({'pages':len(pages),'references':count,'problems':problems},ensure_ascii=False,indent=2))
raise SystemExit(bool(problems))
