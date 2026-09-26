import concurrent.futures
import json
import os
import urllib.request
from urllib.parse import urlsplit

pages=json.load(open('site-content.json'))
assets={}
for page in pages:
 for img in page['images']:
  url=img['src'].split('/v1/')[0]
  if '/media/' not in url:continue
  name=urlsplit(url).path.rsplit('/',1)[-1]
  assets[url]='/media/'+name
logo='https://static.wixstatic.com/media/5f9784_d390e58c0a8845fbb2d465a2cd79f49a~mv2.png'
assets[logo]='/media/'+logo.rsplit('/',1)[-1]
os.makedirs('public/media',exist_ok=True)
def download(item):
 url,target=item
 path='public'+target
 try:
  if not os.path.exists(path):
   req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
   with urllib.request.urlopen(req,timeout=40) as f,open(path,'wb') as out:out.write(f.read())
  return target,os.stat(path).st_size
 except Exception as e:return target,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
 for name,result in executor.map(download,assets.items()):print(name,result,flush=True)
with open('asset-map.json','w') as f:json.dump(assets,f,ensure_ascii=False,indent=2)
