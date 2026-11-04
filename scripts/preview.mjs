#!/usr/bin/env node
// The DISCOTECH home page. Shows everything the round skills make at
// http://localhost:3000, and refreshes itself whenever a file changes.
// No packages needed. Only this computer can reach it.
//
//   node scripts/preview.mjs --ensure   start it if needed (opens the browser the first time)
//   node scripts/preview.mjs            run it in this window
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIRST_PORT = 3000;
const LAST_PORT = 3009;

const ROUNDS = [
  { n: 1, name: 'The problem', files: [['company/business.md', 'Business'], ['customers/personas/customer.md', 'Customer']] },
  { n: 2, name: 'The product', files: [['products/product/index.html', 'Product page'], ['departments/sales/offer.md', 'Offer'], ['products/product-plan.md', 'Build plan']] },
  { n: 3, name: 'Show me the money', files: [['departments/sales/offer.md', 'Offer with price']], needs: '## Price' },
  { n: 4, name: 'Name + brand', files: [['brand/brand.md', 'Brand and voice']] },
  { n: 5, name: 'Lead Magnet', files: [['products/website/index.html', 'Lead Magnet page'], ['departments/marketing/lead-magnet.md', 'The gift']] },
  { n: 6, name: 'The CRM', files: [['products/crm/index.html', 'CRM mockup'], ['departments/crm/crm.md', 'CRM and backend plan']] },
  { n: 7, name: 'Email onboarding', files: [['departments/emails/sequences/preview.html', 'Email previews'], ['departments/emails/sequences/sequence.md', 'The sequence']] },
];

// Only these can be served. Everything else, including .env, gets a 404.
const ALLOWED_FILES = new Set([
  'activity-guide.html',
  'brand/brand.css',
  'brand/brand.md',
  ...ROUNDS.flatMap((r) => r.files.map(([p]) => p)),
]);
const ALLOWED_FOLDERS = ['products/', 'departments/emails/sequences/'];

function isAllowed(rel) {
  if (!rel || rel.split('/').some((part) => part.startsWith('.') || part === '')) return false;
  if (rel.endsWith('CLAUDE.md')) return false;
  return ALLOWED_FILES.has(rel) || ALLOWED_FOLDERS.some((f) => rel.startsWith(f));
}

function latestChange() {
  let latest = 0;
  const check = (p) => { try { latest = Math.max(latest, statSync(p).mtimeMs); } catch { /* not made yet */ } };
  for (const f of ALLOWED_FILES) check(join(ROOT, f));
  const walk = (dir) => {
    let entries = [];
    try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (e.name.startsWith('.')) continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p); else check(p);
    }
  };
  ALLOWED_FOLDERS.forEach((f) => walk(join(ROOT, f)));
  return latest;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const RELOAD = `<script>(function(){var last=null;setInterval(function(){fetch('/__status').then(function(r){return r.json()}).then(function(d){if(last!==null&&d.stamp!==last)location.reload();last=d.stamp}).catch(function(){})},1500)})();</script>`;

function inline(text) {
  return esc(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function markdown(md) {
  const out = [];
  let list = null;
  let table = null;
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  const closeTable = () => { if (table) { out.push('</tbody></table>'); table = null; } };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    const heading = line.match(/^(#{1,4})\s+(.*)/);
    const bullet = line.match(/^\s*[-*]\s+(.*)/);
    const number = line.match(/^\s*\d+\.\s+(.*)/);
    if (line.startsWith('|')) {
      closeList();
      if (/^\|[\s:|-]+\|$/.test(line)) continue;
      const cells = line.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim()));
      if (!table) { out.push(`<table class="table"><thead><tr>${cells.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>`); table = true; } else out.push(`<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr>`);
      continue;
    }
    closeTable();
    if (heading) { closeList(); out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`); continue; }
    if (bullet || number) {
      const want = bullet ? 'ul' : 'ol';
      if (list !== want) { closeList(); out.push(`<${want}>`); list = want; }
      const body = (bullet || number)[1];
      const task = body.match(/^\[( |x|X)\]\s+(.*)/);
      out.push(task ? `<li>${task[1] === ' ' ? '⬜' : '✅'} ${inline(task[2])}</li>` : `<li>${inline(body)}</li>`);
      continue;
    }
    closeList();
    if (line.trim()) out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  closeTable();
  return out.join('\n');
}

function shell(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><link rel="stylesheet" href="/brand/brand.css"><link rel="stylesheet" href="/products/shared/base.css"></head><body>${body}${RELOAD}</body></html>`;
}

function brandName() {
  try {
    const m = readFileSync(join(ROOT, 'brand/brand.md'), 'utf8').match(/^#\s+(.+)/m);
    return m ? m[1].trim() : 'Your company';
  } catch { return 'Your company'; }
}

function roundDone(r) {
  const present = r.files.filter(([p]) => existsSync(join(ROOT, p)));
  if (!present.length) return false;
  if (r.needs) {
    try { return readFileSync(join(ROOT, r.files[0][0]), 'utf8').includes(r.needs); } catch { return false; }
  }
  return true;
}

function linkFor(p) { return p.endsWith('.md') ? `/view?file=${encodeURIComponent(p)}` : `/${p}`; }

function home() {
  const cards = ROUNDS.map((r) => {
    const done = roundDone(r);
    // A round that updates an earlier round's file hasn't started until its own change is there.
    const links = r.needs && !done ? '' : r.files.filter(([p]) => existsSync(join(ROOT, p))).map(([p, label]) => `<a class="pill" href="${linkFor(p)}">${esc(label)}</a>`).join('');
    return `<article class="card round ${done ? 'round--done' : 'round--waiting'}"><p class="eyebrow">Round ${r.n}</p><h2>${esc(r.name)}</h2>${done ? `<div class="pills">${links}</div>` : `<p class="muted">${links ? 'Building now…' : 'Waiting for this round'}</p>`}${done || !links ? '' : `<div class="pills">${links}</div>`}</article>`;
  }).join('');
  return shell(brandName(), `<main class="wrap"><header class="hero hero--small"><p class="eyebrow">Everything we've made</p><h1>${esc(brandName())}</h1><p class="lede">This page fills itself in as you finish each round. Leave it open.</p><p><a class="pill" href="/activity-guide.html">Activity guide</a></p></header><section class="grid">${cards}</section><footer class="footer">Only you can see this. It runs on your laptop.</footer></main>`);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.md': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };

function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const send = (code, type, body) => { res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(body); };
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(405, 'text/plain', 'Not allowed');
  if (url.pathname === '/__ping') return send(200, 'application/json', JSON.stringify({ app: 'discotech-preview', root: ROOT }));
  if (url.pathname === '/__status') return send(200, 'application/json', JSON.stringify({ stamp: latestChange() }));
  if (url.pathname === '/') return send(200, TYPES['.html'], home());
  if (url.pathname === '/view') {
    const rel = url.searchParams.get('file') || '';
    if (!rel.endsWith('.md') || !isAllowed(rel) || !existsSync(join(ROOT, rel))) return send(404, 'text/plain', 'Not found');
    const body = `<main class="wrap wrap--narrow"><p><a class="pill" href="/">← Home</a></p><p class="muted"><code>${esc(rel)}</code></p><article class="doc">${markdown(readFileSync(join(ROOT, rel), 'utf8'))}</article></main>`;
    return send(200, TYPES['.html'], shell(rel, body));
  }
  let rel;
  try { rel = normalize(decodeURIComponent(url.pathname)).replace(/\\/g, '/').replace(/^\/+/, ''); } catch { return send(400, 'text/plain', 'Bad path'); }
  if (rel.endsWith('/')) rel += 'index.html';
  if (!extname(rel) && isAllowed(`${rel}/index.html`)) { res.writeHead(302, { Location: `/${rel}/` }); return res.end(); }
  if (!isAllowed(rel)) return send(404, 'text/plain', 'Not found');
  const abs = join(ROOT, rel);
  if (!abs.startsWith(ROOT + sep) || !existsSync(abs) || !statSync(abs).isFile()) return send(404, 'text/plain', 'Not found');
  const ext = extname(abs).toLowerCase();
  if (ext === '.html' && rel !== 'activity-guide.html') {
    const html = readFileSync(abs, 'utf8');
    return send(200, TYPES['.html'], html.includes('</body>') ? html.replace('</body>', `${RELOAD}</body>`) : html + RELOAD);
  }
  return send(200, TYPES[ext] || 'application/octet-stream', readFileSync(abs));
}

function listen(port) {
  const server = createServer(handler);
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port < LAST_PORT) listen(port + 1);
    else { console.error(`PREVIEW_FAILED ${err.code}`); process.exit(1); }
  });
  server.listen(port, '127.0.0.1', () => console.log(`PREVIEW_URL=http://localhost:${port}`));
}

async function findRunning() {
  for (let port = FIRST_PORT; port <= LAST_PORT; port++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/__ping`, { signal: AbortSignal.timeout(400) });
      const d = await r.json();
      if (d.app === 'discotech-preview' && d.root === ROOT) return port;
    } catch { /* nothing of ours here */ }
  }
  return null;
}

function openBrowser(url) {
  const [cmd, args] = process.platform === 'darwin' ? ['open', [url]]
    : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]]
    : ['xdg-open', [url]];
  try { spawn(cmd, args, { stdio: 'ignore', detached: true }).unref(); } catch { /* the URL is still printed */ }
}

async function ensure() {
  const running = await findRunning();
  if (running) { console.log(`PREVIEW_URL=http://localhost:${running}`); return; }
  spawn(process.execPath, [fileURLToPath(import.meta.url)], { cwd: ROOT, detached: true, stdio: 'ignore', windowsHide: true }).unref();
  for (let i = 0; i < 25; i++) {
    await new Promise((r) => setTimeout(r, 200));
    const port = await findRunning();
    if (port) {
      const url = `http://localhost:${port}`;
      if (!process.env.DISCOTECH_NO_OPEN) openBrowser(url);
      console.log(`PREVIEW_URL=${url}`);
      return;
    }
  }
  console.log('PREVIEW_FAILED could not start. Open the page file directly instead.');
}

if (process.argv.includes('--ensure')) await ensure();
else listen(FIRST_PORT);
