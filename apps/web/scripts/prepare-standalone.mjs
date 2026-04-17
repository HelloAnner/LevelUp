import fs from 'node:fs/promises';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const nextRoot = path.join(root, '.next');
const standaloneRoot = path.join(nextRoot, 'standalone', 'apps', 'web');
const standaloneNextRoot = path.join(standaloneRoot, '.next');

async function copyDir(from, to) {
  await fs.rm(to, { recursive: true, force: true });
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.cp(from, to, { recursive: true });
}

await fs.mkdir(standaloneNextRoot, { recursive: true });
await copyDir(path.join(nextRoot, 'static'), path.join(standaloneNextRoot, 'static'));
