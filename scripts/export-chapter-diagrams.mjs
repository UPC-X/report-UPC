// Legacy flow/class renderer. C4/database: node scripts/render-architecture.mjs.
// Usage: node scripts/export-chapter-diagrams.mjs /path/to/mmdc [/path/to/puppeteer.json]
// Read existing sources rather than brittle numbered Mermaid blocks in README.
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const names=['information-architecture','access-flow','discovery-flow','publication-flow','transaction-flow','mobile-user-flow','web-user-flow','class-diagram'];
mkdirSync(resolve(root,'img/diagrams'),{recursive:true});
for(const name of names){
 const input=resolve(root,`docs/diagram-sources/chapter4-${name}.mmd`);
 const output=resolve(root,`img/diagrams/chapter4-${name}.svg`);
 if(!existsSync(input)||!readFileSync(input,'utf8').trim())throw new Error(`Missing diagram source: ${input}`);
 if(process.argv[2]){
  const args=['-i',input,'-o',output,'-b','white','-t','neutral','-w','2200'];
  if(process.argv[3])args.push('-p',process.argv[3]);
  execFileSync(process.argv[2],args,{stdio:'inherit'});
 }
}
console.log(`${names.length} legacy sources checked${process.argv[2]?' and rendered':''}; canonical C4/database sources preserved.`);
