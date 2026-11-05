import re, sys, html, glob, os
for f in sorted(glob.glob('.research/*.html')):
    s = open(f, encoding='utf-8', errors='ignore').read()
    # remove script/style
    s = re.sub(r'<script[^>]*>.*?</script>', ' ', s, flags=re.S|re.I)
    s = re.sub(r'<style[^>]*>.*?</style>', ' ', s, flags=re.S|re.I)
    s = re.sub(r'<!--.*?-->', ' ', s, flags=re.S)
    s = re.sub(r'<[^>]+>', '\n', s)
    s = html.unescape(s)
    lines = [ln.strip() for ln in s.splitlines()]
    lines = [ln for ln in lines if ln and len(ln) > 1]
    # dedupe consecutive
    out=[]
    for ln in lines:
        if not out or out[-1]!=ln: out.append(ln)
    txt='\n'.join(out)
    open(f.replace('.html','.txt'),'w',encoding='utf-8').write(txt)
    print(f, '->', len(txt), 'chars,', len(out), 'lines')
