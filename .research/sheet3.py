from PIL import Image, ImageDraw
import glob, os
sel = sorted(glob.glob('public/assets/rovers/*'))
thumbs=[]
for f in sel:
    im=Image.open(f).convert('RGB'); im.thumbnail((520,360)); thumbs.append((f,im))
cols=2; cw,ch=540,400; rowsn=(len(thumbs)+cols-1)//cols
sheet=Image.new('RGB',(cols*cw,rowsn*ch),(20,26,24)); d=ImageDraw.Draw(sheet)
for i,(f,im) in enumerate(thumbs):
    x=(i%cols)*cw+10; y=(i//cols)*ch+8
    sheet.paste(im,(x,y)); d.text((x,y+368),os.path.basename(f)+"  "+str(Image.open(f).size),fill=(183,243,107))
sheet.save('.research/rovers-large.png'); print('ok')
