// Read-only release checks for the exported design and report. No dependencies.
import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),issues=[];
const json=p=>JSON.parse(readFileSync(resolve(root,p),'utf8'));
const data=json('img/web-mockups/inventory.json'),qa=json('img/web-mockups/qa.json');
const seen=new Set(data.screens.map(s=>s.id));
if(seen.size!==data.screens.length)issues.push('Duplicate IDs');
let pngs=0,links=0;
function png(path,width){
  const file=resolve(root,path);if(!existsSync(file)){issues.push('Missing '+path);return;}
  const b=readFileSync(file);
  if(b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||b.length<1000)issues.push('Invalid PNG '+path);
  if(width&&b.readUInt32BE(16)!==width)issues.push('Wrong width '+path);
  if(b.readUInt32BE(20)<100)issues.push('Unexpected height '+path);
  pngs++;
}
for(const s of data.screens){for(const folder of ['web-mockups','web-wireframes'])for(const [v,w] of [['desktop',1440],['mobile',390]])png(`img/${folder}/${s.id}-${v}.png`,w);}
for(const f of data.flows){png(`img/web-wireflows/${f.id}-wireflow.png`);png(`img/web-user-flows/${f.id}-user-flow.png`);for(const [name,ids,edges]of f.rows){if(ids.length!==edges.length+1)issues.push('Route edge count '+f.id+': '+name);for(const id of ids)if(!seen.has(id))issues.push('Unknown route ID '+id);}}
for(const n of [...Array.from({length:44},(_,i)=>i+1),48,49,50]){
  const us='US'+String(n).padStart(2,'0'),ids=data.storyScreens[us];
  if(!ids?.length||ids.some(id=>!seen.has(id)))issues.push('Missing story evidence '+us);
}
for(const s of json('img/mobile-wireframes/inventory.json').screens)if(!data.screens.some(w=>w.mobile===s.id))issues.push('Missing mobile correspondence '+s.id);
for(const f of ['README.md','docs/web-design.md','docs/web-screen-inventory.md','docs/chapter-4-handoff.md','design/web/index.html','design/web/flows.html','design/web/screen.html']){
  const content=readFileSync(resolve(root,f),'utf8');
  const refs=f.endsWith('.md')?[...content.matchAll(/!?\[[^\]]*\]\(([^\n)]+)\)/g)].map(m=>m[1]):[...content.matchAll(/(?:href|src)="([^"<>]+)"/g)].map(m=>m[1]);
  for(let ref of refs){if(/^(https?:|mailto:|data:|#)/.test(ref)||ref.includes('${'))continue;ref=ref.replace(/^<|>$/g,'').split(/[?#]/)[0];if(!ref)continue;links++;const p=resolve(dirname(resolve(root,f)),decodeURIComponent(ref));if(!existsSync(p))issues.push(`${f}: missing local link ${ref}`);}
}
if(qa.screens!==data.screens.length||qa.goals!==data.flows.length||qa.issues.length||qa.consoleErrors.length||qa.galleryOverflow)issues.push('Export QA failed or stale counts');
if(statSync(resolve(root,'img/web-mockups/overview.png')).size<1000)issues.push('Missing overview');
console.log(JSON.stringify({screens:data.screens.length,goals:data.flows.length,storyAssociations:Object.keys(data.storyScreens).length,pngs,localLinks:links,issues},null,2));
if(issues.length)process.exitCode=1;
