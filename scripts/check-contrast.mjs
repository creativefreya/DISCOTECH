#!/usr/bin/env node
// Checks brand/brand.css is readable. Each pair needs at least 4.5:1.
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../brand/brand.css', import.meta.url), 'utf8');
const get = (name) => (css.match(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{3,8})`)) || [])[1];
const channels = (hex) => {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};
const lum = (hex) => {
  const [r, g, b] = channels(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
let bad = 0;
for (const [fg, bg] of [['text', 'bg'], ['text', 'surface'], ['muted', 'bg'], ['muted', 'surface'], ['accent-text', 'accent']]) {
  const a = get(fg);
  const b = get(bg);
  if (!a || !b) { console.log(`FAIL ${fg} on ${bg}: needs plain hex colours`); bad++; continue; }
  const r = ratio(a, b);
  const pass = r >= 4.5;
  if (!pass) bad++;
  console.log(`${pass ? 'OK  ' : 'FAIL'} ${fg} on ${bg}: ${r.toFixed(1)}:1`);
}
console.log(bad ? `${bad} pair(s) too hard to read.` : 'All readable.');
