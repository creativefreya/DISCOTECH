#!/usr/bin/env node
// Laptop safety check for /security-check. It only looks: it never installs,
// updates or changes anything, and it doesn't read your personal files.
// It downloads two public lists: Node.js releases and the US government's list
// of security holes attackers are using right now (CISA KEV). Nothing about you is sent.
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';

const run = (cmd, args, ms = 8000) => new Promise((res) => {
  execFile(cmd, args, { timeout: ms, windowsHide: true, maxBuffer: 4 * 1024 * 1024 }, (err, stdout, stderr) => res({ ok: !err, out: `${stdout || ''}${stderr || ''}`.trim(), code: err && err.code, killed: err && err.killed }));
});
const getJson = async (url, ms = 8000) => { const r = await fetch(url, { signal: AbortSignal.timeout(ms) }); if (!r.ok) throw new Error(String(r.status)); return r.json(); };
const lines = [];
const report = (status, what, detail) => lines.push(`${status.padEnd(7)} ${what}: ${detail}`);
const newer = (a, b) => { for (let i = 0; i < 3; i++) { if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0); } return false; };
const parse = (v) => v.replace(/^v/, '').split('.').map(Number);

async function node() {
  const current = process.version;
  const [cMajor] = parse(current);
  try {
    const [index, schedule] = await Promise.all([
      getJson('https://nodejs.org/dist/index.json'),
      getJson('https://raw.githubusercontent.com/nodejs/Release/main/schedule.json').catch(() => null),
    ]);
    const sameLine = index.filter((r) => parse(r.version)[0] === cMajor);
    const missing = sameLine.filter((r) => newer(parse(r.version), parse(current)));
    const security = missing.filter((r) => r.security);
    const lts = index.find((r) => r.lts);
    const end = schedule && schedule[`v${cMajor}`] && schedule[`v${cMajor}`].end;
    if (end && new Date(end) < new Date()) report('UPDATE', 'Node.js', `${current} no longer gets security fixes. Install ${lts.version} from https://nodejs.org`);
    else if (security.length) report('UPDATE', 'Node.js', `${current} is missing a security fix. Install ${missing[0].version} or newer from https://nodejs.org`);
    else if (missing.length) report('OK', 'Node.js', `${current} has no security fixes waiting. ${missing[0].version} is available when you have a moment.`);
    else report('OK', 'Node.js', `${current} is up to date.`);
  } catch { report('UNKNOWN', 'Node.js', `you have ${current}, but I couldn't reach nodejs.org to compare.`); }
}

async function packages() {
  if (!existsSync('package-lock.json')) { report('OK', 'Project packages', 'none installed yet, so nothing to check.'); return; }
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const a = await run(npm, ['audit', '--json', '--omit=dev'], 20000);
  try {
    const v = JSON.parse(a.out).metadata.vulnerabilities;
    const bad = (v.critical || 0) + (v.high || 0);
    if (bad) report('UPDATE', 'Project packages', `${bad} serious problems. Ask Claude to explain them, then run npm audit fix.`);
    else report('OK', 'Project packages', `no serious problems (${v.total || 0} minor).`);
  } catch { report('UNKNOWN', 'Project packages', 'npm audit did not finish.'); }
}

async function claudeCode() {
  const local = await run('claude', ['--version'], 5000);
  const version = local.ok ? (local.out.match(/\d+\.\d+\.\d+/) || [])[0] : null;
  if (!version) { report('INFO', 'Claude', 'the desktop app updates itself. If it offers an update, take it.'); return; }
  try {
    const latest = (await getJson('https://registry.npmjs.org/@anthropic-ai/claude-code/latest')).version;
    if (newer(parse(latest), parse(version))) report('UPDATE', 'Claude Code', `${version} installed, ${latest} available. Run: claude update`);
    else report('OK', 'Claude Code', `${version} is up to date.`);
  } catch { report('INFO', 'Claude Code', `${version} installed.`); }
}

async function mac() {
  const version = (await run('sw_vers', ['-productVersion'])).out;
  const su = await run('softwareupdate', ['-l'], 30000);
  if (su.killed || (!su.ok && !su.out)) report('UNKNOWN', 'macOS', `you're on ${version}. To check: Apple menu > System Settings > General > Software Update.`);
  else if (/No new software available/i.test(su.out)) report('OK', 'macOS', `${version} has no updates waiting.`);
  else {
    const titles = [...su.out.matchAll(/Title:\s*([^,]+)/g)].map((m) => m[1].trim());
    report('UPDATE', 'macOS', `you're on ${version}, with updates waiting${titles.length ? `: ${titles.slice(0, 3).join('; ')}` : ''}. Install from Apple menu > System Settings > General > Software Update.`);
  }
  const fv = await run('fdesetup', ['status']);
  if (/FileVault is On/i.test(fv.out)) report('OK', 'Disk encryption', 'FileVault is on.');
  else if (/FileVault is Off/i.test(fv.out)) report('UPDATE', 'Disk encryption', 'FileVault is off, so a stolen laptop can be read. Turn it on in System Settings > Privacy & Security.');
  const fw = await run('/usr/libexec/ApplicationFirewall/socketfilterfw', ['--getglobalstate']);
  if (/enabled/i.test(fw.out)) report('OK', 'Firewall', 'on.');
  else if (/disabled/i.test(fw.out)) report('UPDATE', 'Firewall', 'off. Turn it on in System Settings > Network > Firewall.');
}

async function windows() {
  const h = await run('powershell', ['-NoProfile', '-Command', "(Get-HotFix | Sort-Object InstalledOn | Select-Object -Last 1).InstalledOn.ToString('yyyy-MM-dd')"], 15000);
  const date = h.ok ? h.out.trim() : '';
  const days = date ? (Date.now() - new Date(date)) / 86400000 : null;
  if (days === null || Number.isNaN(days)) report('UNKNOWN', 'Windows', 'to check: Settings > Windows Update.');
  else if (days > 45) report('UPDATE', 'Windows', `last update was ${date}. Check Settings > Windows Update.`);
  else report('OK', 'Windows', `updated recently (${date}). Check Settings > Windows Update to be sure.`);
}

async function alerts() {
  const platform = process.platform;
  const match = (v) => {
    const vendor = v.vendorProject.toLowerCase();
    const product = v.product.toLowerCase();
    if (vendor === 'google' && /chrom/.test(product)) return true;
    if (/node\.?js/.test(vendor + product) || /^git$/.test(product)) return true;
    if (platform === 'darwin') return vendor === 'apple';
    if (platform === 'win32') return vendor === 'microsoft' && /windows/.test(product);
    return /linux/.test(product);
  };
  try {
    const list = await getJson('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json', 10000);
    const cutoff = Date.now() - 30 * 86400000;
    const recent = list.vulnerabilities.filter((v) => new Date(v.dateAdded) >= cutoff && match(v))
      .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    if (!recent.length) { lines.push('ALERTS  None in the last 30 days for your laptop, Chrome, Node.js or Git.'); return; }
    lines.push(`ALERTS  ${recent.length} being actively used by attackers, added in the last 30 days (CISA list). Updating is the fix:`);
    recent.slice(0, 5).forEach((v) => lines.push(`        - ${v.dateAdded}: ${v.vendorProject} ${v.product} (${v.cveID})`));
  } catch { lines.push("ALERTS  Couldn't reach the CISA list. Try again later, or just install any updates waiting."); }
}

const os = process.platform === 'darwin' ? mac : process.platform === 'win32' ? windows : async () => report('INFO', 'System updates', 'install any updates your system offers.');
await Promise.all([node(), packages(), claudeCode(), os()]);
await alerts();
console.log(lines.join('\n'));
