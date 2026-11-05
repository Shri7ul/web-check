import os, glob
from PIL import Image
rows=[]
for f in sorted(glob.glob('public/assets/**/*', recursive=True)):
    if not os.path.isfile(f): continue
    ext=os.path.splitext(f)[1].lower()
    size=os.path.getsize(f)
    try:
        with Image.open(f) as im:
            im.verify()
        with Image.open(f) as im:
            wh=im.size; fmt=im.format; mode=im.mode
        status="OK"
    except Exception as e:
        wh=fmt=mode="-"; status=f"BAD: {e}"
    rows.append((f,size,fmt,wh,status))
    print(f"{f:52} {size:>9} {str(fmt):6} {str(wh):14} {status}")
print("\n=== contact sheet ===")
# build a labeled contact sheet of rovers + brand + scenes
sel = sorted(glob.glob('public/assets/rovers/*')) + sorted(glob.glob('public/assets/brand/*')) + sorted(glob.glob('public/assets/scenes/ho*.jpg'))
thumbs=[]
from PIL import ImageDraw, ImageFont
for f in sel:
    try:
        im=Image.open(f).convert('RGB')
        im.thumbnail((240,170))
        thumbs.append((f,im))
    except Exception as e:
        pass
cols=3; cw,ch=260,210
rowsn=(len(thumbs)+cols-1)//cols
sheet=Image.new('RGB',(cols*cw, rowsn*ch),(20,26,24))
d=ImageDraw.Draw(sheet)
for i,(f,im) in enumerate(thumbs):
    x=(i%cols)*cw+10; y=(i//cols)*ch+10
    sheet.paste(im,(x,y))
    label=os.path.basename(f)
    d.text((x,y+175),label,fill=(183,243,107))
sheet.save('.research/contact.png')
print('contact.png written with',len(thumbs),'images')
