"""Package only the generated static site. Run after build and audit-static.py.

This script does not upload or change the production website.
"""
from pathlib import Path
import hashlib
import re
import shutil
import subprocess
import sys
import zipfile
from xml.sax.saxutils import escape

project = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else project / "dist"
release = project / "dist-aruba"
assert (source / "index.html").is_file(), "Run npm run build first"
assert (source / "404.html").is_file(), "Missing 404 page"
secrets = []
for env_file in project.glob(".env*"):
    if "example" in env_file.name:
        continue
    for line in env_file.read_text().splitlines():
        key, sep, value = line.partition("=")
        if sep and any(word in key.upper() for word in ("SECRET", "TOKEN", "API_KEY")):
            value = value.strip().strip('"\'')
            if len(value) >= 12:
                secrets.append(value)

for path in source.rglob("*"):
    if not path.is_file():
        continue
    assert not path.name.startswith("."), f"Hidden file: {path}"
    assert path.suffix.lower() not in {".php", ".sql", ".gz", ".zip", ".env"}, path
    if path.suffix in {".html", ".js", ".css", ".json"}:
        content = path.read_text()
        assert not any(secret in content for secret in secrets), f"Credential in {path}"
        assert not re.search(r"AIza[\w-]{30,}|IGAA[\w-]{30,}", content), f"Possible credential in {path}"
        assert not re.search(r'(?:href|src)=["\']/new/', content), f"Preview link in {path}"
        if path.suffix == ".html" and path.name != "404.html":
            assert not re.search(r'<meta[^>]+content=["\'][^"\']*noindex', content, re.I), path

if release.exists():
    shutil.rmtree(release)
shutil.copytree(source, release)
(release / "robots.txt").write_text("User-agent: *\nAllow: /\nDisallow: /wp-admin/\nDisallow: /wp-includes/\nSitemap: https://www.fisiosalute.it/sitemap.xml\n")
urls = []
for page in sorted(source.rglob("*.html")):
    if page.name == "404.html":
        continue
    relative = page.relative_to(source).as_posix()
    route = relative.removesuffix("index.html")
    urls.append("https://www.fisiosalute.it/" + route)
(release / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(f"<url><loc>{escape(url)}</loc></url>" for url in urls) + "\n</urlset>\n")
(release / ".htaccess").write_text('''# Static FisioSalute release. Save the original WordPress .htaccess before replacing.
DirectoryIndex index.html
Options -Indexes
ErrorDocument 404 /404.html
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteOptions AllowNoSlash
# Canonical directory URLs must never downgrade to HTTP behind Aruba's proxy.
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_URI} !/$
RewriteRule ^ https://www.fisiosalute.it%{REQUEST_URI}/ [R=301,L,NE]
# Use the public address chosen for the new website.
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} !^www\\.fisiosalute\\.it$ [NC]
RewriteRule ^ https://www.fisiosalute.it%{REQUEST_URI} [R=301,L,NE]
# Executable PHP endpoints: public review cache and protected cron updaters.
RewriteRule ^api/(?:update-instagram|update-google-reviews|google-reviews)\\.php$ - [L]
# Existing WordPress pages that changed address.
RewriteRule ^chi-siamo/?$ https://www.fisiosalute.it/erika-voltan/ [R=301,L]
RewriteRule ^recensioni/?$ https://www.fisiosalute.it/#recensioni [R=301,L,NE]
# Retained WordPress files cannot execute while this release is active.
RewriteRule \\.php(?:/|$) - [F,L,NC]
# Archives, dumps and private development files must never be served.
RewriteRule (^|/)(?:\\.git|\\.env[^/]*|backups-private)(?:/|$) - [F,L,NC]
RewriteRule \\.(?:sql|gz|tgz|tar|bz2|xz|zip|bak)$ - [F,L,NC]
</IfModule>
<IfModule mod_headers.c>
Header always set Strict-Transport-Security "max-age=15552000"
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests"
</IfModule>
''')
subprocess.run([sys.executable, str(project / 'scripts/package-aruba-instagram.py'), str(release)], check=True)
subprocess.run([sys.executable, str(project / 'scripts/package-aruba-google-reviews.py'), str(release)], check=True)
archive = project.parent / "fisiosalute-produzione.zip"
with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
    for path in sorted(release.rglob("*")):
        if path.is_file():
            bundle.write(path, path.relative_to(release))
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
print(f"Pacchetto: {archive}")
print(f"SHA256: {hashlib.sha256(archive.read_bytes()).hexdigest()}")
print("Contiene il sito statico e lo script Instagram PHP, senza credenziali. Nessun upload eseguito.")
