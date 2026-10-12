from PIL import Image
from pathlib import Path
import json
root=Path('public'); out=root/'images/responsive';out.mkdir(exist_ok=True)
manifest={}
for p in list((root/'images').rglob('*.webp'))+list((root/'images').glob('*.png')):
 if 'responsive' in p.parts:continue
 im=Image.open(p);w,h=im.size;src='/'+str(p.relative_to(root));variants=[]
 for size in [480,800]:
  if w<=size:continue
  dest=out/(p.stem+f'-{size}.webp')
  copy=im.copy();copy.resize((size,round(h*size/w)),Image.Resampling.LANCZOS).save(dest,'WEBP',quality=83,method=6)
  if dest.stat().st_size<p.stat().st_size: variants.append('/'+str(dest.relative_to(root))+f' {size}w')
  else:dest.unlink()
 manifest[src]={'width':w,'height':h,'srcset':', '.join(variants+[src+f' {w}w']) if variants else None}
Path('src/data/image-metadata.json').write_text(json.dumps(manifest,indent=2)+'\n')
