// Export README Mermaid sources and optional SVGs with an installed mmdc binary.
// Usage: node scripts/export-chapter-diagrams.mjs /path/to/mmdc /path/to/puppeteer.json
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=readFileSync(resolve(root,'README.md'),'utf8');
const blocks=[...source.matchAll(/```mermaid\n([\s\S]*?)```/g)].map(m=>m[1]);
const names=['information-architecture','access-flow','discovery-flow','publication-flow','transaction-flow','mobile-user-flow','web-user-flow','context-diagram','container-diagram','components-diagram','class-diagram','database-diagram'];
if(blocks.length!==names.length)throw new Error(`Expected ${names.length} blocks, received ${blocks.length}; update the diagram mapping.`);
mkdirSync(resolve(root,'docs/diagram-sources'),{recursive:true});
for(let i=0;i<names.length;i++){
 const input=resolve(root,`docs/diagram-sources/chapter4-${names[i]}.mmd`);
 const output=resolve(root,`img/diagrams/chapter4-${names[i]}.svg`);
 writeFileSync(input,blocks[i]);
 if(process.argv[2]){
  const args=['-i',input,'-o',output,'-b','white','-t','neutral','-w','2200'];
  if(process.argv[3])args.push('-p',process.argv[3]);
  execFileSync(process.argv[2],args,{stdio:'inherit'});
 }
}
console.log(`${names.length} diagram sources exported${process.argv[2]?' and rendered':''}.`);
