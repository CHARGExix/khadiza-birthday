import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.join(root,'docs');
mkdirSync(output,{recursive:true});
// Only remove the generated assets belonging to this site's docs folder.
for(const name of readdirSync(output)) {
  if(name==='assets'||name==='index.html'||name==='favicon.svg'||name==='.nojekyll') rmSync(path.join(output,name),{recursive:true,force:true});
}
cpSync(path.join(root,'dist'),output,{recursive:true});
writeFileSync(path.join(output,'.nojekyll'),'');
console.log('GitHub Pages files prepared in docs/.');
