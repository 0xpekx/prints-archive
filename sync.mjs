// Keeps a prints archive mirror up to date: downloads what changed from the main copy and checks
// every file against the manifest's SHA-256 before it replaces anything. Needs Node 18 or later.
//   node sync.mjs <main copy url> [folder]
// e.g. node sync.mjs https://prints.example/archive/ ./prints-archive   (run it daily, e.g. from cron)
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const [base, dir = '.'] = process.argv.slice(2);
if (!base) { console.error('usage: node sync.mjs <main copy url> [folder]'); process.exit(1); }
const root = base.endsWith('/') ? base : base + '/';
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const get = async rel => { const r = await fetch(new URL(rel, root)); if (!r.ok) throw new Error(`${rel}: HTTP ${r.status}`); return Buffer.from(await r.arrayBuffer()); };
// only plain relative paths inside the folder
const inside = rel => { const f = path.resolve(dir, rel); if (!f.startsWith(path.resolve(dir) + path.sep) || /(^|\/)\.\.?(\/|$)/.test(rel)) throw new Error(`refusing path ${rel}`); return f; };

const mbytes = await get('manifest.json'), manifest = JSON.parse(mbytes);
const old = await fs.readFile(inside('manifest.json'), 'utf8').then(JSON.parse, () => null);
let fetched = 0;
for (const f of manifest.files) {
  const dest = inside(f.path);
  const have = await fs.readFile(dest).catch(() => null);
  if (have && have.length === f.size && sha(have) === f.sha256) continue;
  const bytes = await get(f.path);
  if (bytes.length !== f.size || sha(bytes) !== f.sha256) throw new Error(`${f.path} doesn't match the manifest; nothing more was changed`);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, bytes);
  fetched++;
}
// files the old manifest listed and the new one doesn't (never anything else in the folder)
let removed = 0;
const keep = new Set(manifest.files.map(f => f.path));
for (const f of old?.files || []) if (!keep.has(f.path)) { await fs.unlink(inside(f.path)).catch(() => {}); removed++; }
// the torrent is a nice-to-have: a missing one doesn't stop the update
await get('prints-archive.torrent').then(t => fs.writeFile(inside('prints-archive.torrent'), t)).catch(e => console.warn('torrent:', e.message));
await fs.writeFile(inside('manifest.json'), mbytes);
console.log(`up to date: ${manifest.files.length} files, ${fetched} downloaded, ${removed} removed (built ${manifest.built})`);
