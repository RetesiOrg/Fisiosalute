"""Package review endpoints without OAuth secrets or cached Google data."""
from pathlib import Path
import shutil
import sys
import zipfile
root = Path(__file__).resolve().parents[1]
release = Path(sys.argv[1])
names = ['google-reviews.php', 'update-google-reviews.php', '_private/.htaccess',
         '_private/google-config.example.php', '_private/google-reviews-lib.php']
for name in names:
    target = release / 'api' / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(root / 'aruba/api' / name, target)
archive = root.parent / 'fisiosalute-google-recensioni-aruba.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for name in names:
        bundle.write(root / 'aruba/api' / name, 'api/' + name)
    bundle.write(root / 'docs/google-recensioni-aruba.md', 'INSTALLAZIONE.md')
print(f'Script recensioni senza credenziali: {archive}')
