from PIL import Image, ImageDraw
import glob, os
sel = sorted(glob.glob('public/assets/scenes/a*.png')+glob.glob('public/assets/scenes/imo.png')+glob.glob('public/assets/scenes/ok3.png')+glob.glob('public/assets/people/*.jpg')+glob.glob('public/assets/people/*.jpeg'))
thumbs=[]
for f in sel:
    try:
        im=Image.open(f).convert('RGB'); im.thumbnail((220,160))
        thumbs.append((f,im))
    except: pass
cols=4; cw,ch=240,200; rowsn=(len(thumbs)+cols-1)//cols
sheet=Image.new('RGB',(cols*cw,rowsn*ch),(20,26,24)); d=ImageDraw.Draw(sheet)
for i,(f,im) in enumerate(thumbs):
    x=(i%cols)*cw+10; y=(i//cols)*ch+8
    sheet.paste(im,(x,y)); d.text((x,y+165),os.path.basename(f)[:26],fill=(183,243,107))
sheet.save('.research/contact2.png'); print('wrote',len(thumbs))
