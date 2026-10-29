import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'docs');
mkdirSync(output, { recursive: true });

// Only remove the generated assets belonging to this site's docs folder.
for (const name of readdirSync(output)) {
  if (name === 'assets' || name === 'index.html' || name === 'favicon.svg' || name === '.nojekyll') {
    rmSync(path.join(output, name), { recursive: true, force: true });
  }
}

cpSync(path.join(root, 'dist'), output, { recursive: true });
writeFileSync(path.join(output, '.nojekyll'), '');

const docsIndex = path.join(output, 'index.html');
let content = readFileSync(docsIndex, 'utf8');
content = content.replace(/<!-- GITHUB_PAGES_ROOT_REDIRECT_START -->[\s\S]*?<!-- GITHUB_PAGES_ROOT_REDIRECT_END -->\s*/, '');
writeFileSync(docsIndex, content, 'utf8');

console.log('GitHub Pages files prepared in docs/.');
