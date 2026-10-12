"""Run after: npm run build -- --base /new/ --outDir ./dist-prova.

Adapt only the generated preview, leaving production source URLs unchanged.
"""
from pathlib import Path
import re
import sys
import zipfile
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

root = Path(__file__).resolve().parents[1]
output = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "dist-prova"
prefix = "/new"
assert (output / "index.html").is_file()

for path in output.rglob("*"):
    if path.suffix not in {".html", ".css", ".js"}:
        continue
    text = path.read_text()
    # Includes HTML attributes, inline JSON search URLs and JS string literals.
    text = re.sub(r'''(["'`])/(?!/|new(?:/|["'`]))(?=[A-Za-z_#]|["'`])''',
                  lambda m: m[1] + prefix + "/", text)
    text = re.sub(r"url\(/(?!/|new/)", "url(" + prefix + "/", text)
    # srcset has several URLs in one attribute; later entries follow commas.
    text = re.sub(
        r'''(srcset=["'])(.*?)(["'])''',
        lambda match: match[1] + re.sub(
            r"(^|,\s*)/(?!/|new/)",
            lambda url: url[1] + prefix + "/", match[2]
        ) + match[3],
        text,
    )
    if path.suffix == ".html" and 'name="robots"' not in text:
        text = text.replace("<head>", '<head><meta name="robots" content="noindex, nofollow, noarchive">', 1)
    path.write_text(text)

(output / ".htaccess").write_text('''# Applies only to this preview directory.
DirectoryIndex index.html
Options -Indexes
<IfModule mod_rewrite.c>
RewriteEngine Off
</IfModule>
<IfModule mod_headers.c>
Header set X-Robots-Tag "noindex, nofollow, noarchive"
</IfModule>
ErrorDocument 404 "Preview: pagina non trovata"
''')

errors = []
class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if not value or key not in {"href", "src", "srcset", "poster"}:
                continue
            for url in ([part.strip().split()[0] for part in value.split(",")] if key == "srcset" else [value]):
                if not url.startswith("/") or url.startswith("//"):
                    continue
                if not url.startswith(prefix + "/"):
                    errors.append(f"{self.file}: outside preview: {url}")
                    continue
                target = output / unquote(urlsplit(url).path[len(prefix)+1:])
                if not target.is_file() and not (target / "index.html").is_file():
                    errors.append(f"{self.file}: missing: {url}")

pages = list(output.rglob("*.html"))
for page in pages:
    parser = Links()
    parser.file = page.relative_to(output)
    parser.feed(page.read_text())
assert not errors, "\n".join(errors)

archive = root.parent / "fisiosalute-new.zip"
with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as zipf:
    for path in sorted(output.rglob("*")):
        if path.is_file():
            assert path.suffix not in {".php", ".env"}
            zipf.write(path, Path("new") / path.relative_to(output))
print(f"Verified {len(pages)} pages and local asset links. Archive: {archive}")
