"""Add the server updater to an already prepared static Aruba release.
Never package real configuration, state, locks or credentials.
"""
from pathlib import Path
import json
import shutil
import sys
import zipfile
root = Path(__file__).resolve().parents[1]
release = Path(sys.argv[1])
api = release / 'api'
api.mkdir(exist_ok=True)
for name in ['.htaccess', 'update-instagram.php', '_private/.htaccess', '_private/config.example.php', '_private/instagram-lib.php']:
    target = api / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / 'aruba/api' / name, target)
shutil.copyfile(root / 'public/api/instagram.json', api / 'instagram.json')
archive = root.parent / 'fisiosalute-instagram-aruba.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for path in sorted(release.rglob('*')):
        if path.is_file():
            assert path.name not in {'config.php','state.json','update.lock','google-config.php','google-reviews.json','google-update.lock'}
            bundle.write(path, path.relative_to(release))
print(archive)
