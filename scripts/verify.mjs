import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const jsPath = path.join(root, 'dist/acropolis-world.js');
const cssPath = path.join(root, 'dist/acropolis.css');
const holoPath = path.join(root, 'dist/omega-acropolis.holo');
const om3dPath = path.join(root, 'dist/astral-cosmos.om3d');
const demoPath = path.join(root, 'demo.html');

const jsText = fs.readFileSync(jsPath, 'utf8');
const cssText = fs.readFileSync(cssPath, 'utf8');
const holoRaw = fs.readFileSync(holoPath, 'utf8');
const om3dBytes = fs.readFileSync(om3dPath);
const demoHtml = fs.readFileSync(demoPath, 'utf8');

/* 1. Node syntax check on acropolis-world.js */
execFileSync(process.execPath, ['--check', jsPath]);
console.log('[PASS] node --check dist/acropolis-world.js');

/* 2. Strict ASCII check */
function assertAscii(label, text) {
  const buf = Buffer.from(text, 'utf8');
  for (let i = 0; i < buf.length; i++) {
    const b = buf[i];
    const ok = b === 9 || b === 10 || b === 13 || (b >= 32 && b <= 126);
    if (!ok) {
      throw new Error(label + ': non-ASCII/control byte 0x' + b.toString(16) + ' at offset ' + i);
    }
  }
}
assertAscii('acropolis-world.js', jsText);
assertAscii('acropolis.css', cssText);
assertAscii('demo.html', demoHtml);
console.log('[PASS] 100% printable ASCII bytes in JS, CSS, and demo.html');

/* 3. Strict CSP, Privacy, Zero-WASM, and Policy Audit */
const BANNED_JS = [
  'innerHTML', 'outerHTML', 'insertAdjacentHTML', 'document.write',
  'document.cookie', 'localStorage', 'sessionStorage', 'indexedDB',
  'eval(', 'new Function', 'http://', 'https://',
  '/home/', '/users/', '/Users/', '/var/www', '/tmp/', '/root/', '~/',
  '.ts.net', 'localhost', '127.0.0.1', '100.64.', '192.168.', 'tail987627', 'spark-b87b',
  'file://', '&mdash;', '&ndash;', '&reg;', 'mailto:',
  'super intelligence', 'superintelligence', 'super-intelligence',
  '#allen', '#site-door', 'verdant-wasm.wasm'
];
for (const tok of BANNED_JS) {
  assert.equal(jsText.indexOf(tok), -1, 'acropolis-world.js contains forbidden token: ' + tok);
  assert.equal(cssText.indexOf(tok), -1, 'acropolis.css contains forbidden token: ' + tok);
}
assert.equal(/[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]/.test(jsText), false, 'acropolis-world.js contains email pattern');
assert.equal(/[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]/.test(cssText), false, 'acropolis.css contains email pattern');
console.log('[PASS] Zero forbidden DOM/storage/cookie/network/policy/WASM tokens');

/* 4. Exact interplane.io chkcss compliance on dist/acropolis.css */
assert.ok(cssText.startsWith(':root{'), 'acropolis.css must start at byte 0 with :root{');
const CSS_BANNED = ['@import', 'http:', 'javascript:', '-moz-binding', 'expression(', 'image-set(', '//', 'url(', 'rgb(', 'rgba(', 'hsl(', 'hsla(', '\\'];
for (const tok of CSS_BANNED) {
  assert.equal(cssText.indexOf(tok), -1, 'acropolis.css contains forbidden CSS token: ' + tok);
}
const firstCloseBrace = cssText.indexOf('}');
assert.ok(firstCloseBrace > 6, 'acropolis.css missing closing brace for :root');
assert.equal(cssText.indexOf('#', firstCloseBrace + 1), -1, 'acropolis.css contains # after :root block');
console.log('[PASS] Exact interplane.io chkcss compliance on dist/acropolis.css');

/* 5. Verify Pure-Omega OM3D Binary Header, Payload FIPS 180-4 SHA-256 & 10 Cosmic Groups */
assert.ok(om3dBytes.length >= 64);
assert.equal(om3dBytes.subarray(0, 4).toString('ascii'), 'OM3D');
assert.equal(om3dBytes.readUInt32LE(4), 2);
const vcount = om3dBytes.readUInt32LE(8);
const icount = om3dBytes.readUInt32LE(12);
const stride = om3dBytes.readUInt32LE(16);
assert.equal(stride, 16);
assert.ok(vcount > 3000 && icount > 15000);
const hdrSha = Buffer.from(om3dBytes.subarray(32, 64)).toString('hex');
const paySha = crypto.createHash('sha256').update(om3dBytes.subarray(64)).digest('hex');
assert.equal(hdrSha, paySha, 'OM3D header SHA-256 mismatch');
console.log('[PASS] Pure-Omega OM3D v2 verified: ' + vcount + ' verts, ' + (icount / 3) + ' tris, sha256=' + hdrSha.slice(0, 12));

/* 6. Validate omega-acropolis.holo schema, digest, and embedded JS syntax */
const holo = JSON.parse(holoRaw);
assert.equal(holo.schema, 'verdant-ui/holo/1');
assert.ok(/^sha256:[0-9a-f]{64}$/.test(holo.digest));
const expectedDigest = 'sha256:' + crypto.createHash('sha256').update(JSON.stringify(holo.app)).digest('hex');
assert.equal(holo.digest, expectedDigest, 'holo digest mismatch');
assert.equal(holo.grants.storage, false);
assert.equal(holo.grants.network, false);
new vm.Script(holo.app.js, { filename: 'omega-acropolis.holo#app.js' });
console.log('[PASS] Valid VerdantUI omega-acropolis.holo archive + verified SHA-256 + JS syntax');

/* 7. Live ephemeral HTTP serve check (zero wasm-unsafe-eval in CSP!) */
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.om3d': 'application/octet-stream', '.holo': 'application/json; charset=utf-8' };
const server = http.createServer((req, res) => {
  const reqPath = (req.url || '/').split('?')[0];
  const rel = reqPath === '/' ? '/demo.html' : reqPath;
  const full = path.resolve(root, '.' + rel);
  if (!full.startsWith(root) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  const ext = path.extname(full);
  res.writeHead(200, {
    'Content-Type': mime[ext] || 'application/octet-stream',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'"
  });
  fs.createReadStream(full).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const base = 'http://127.0.0.1:' + port;
try {
  for (const p of ['/demo.html', '/dist/acropolis-world.js', '/dist/acropolis.css', '/dist/astral-cosmos.om3d', '/dist/omega-acropolis.holo']) {
    const r = await fetch(base + p);
    assert.equal(r.status, 200, 'HTTP failed for ' + p);
    const ab = await r.arrayBuffer();
    assert.ok(ab.byteLength > 100, 'Empty body for ' + p);
  }
  console.log('[PASS] Live HTTP 200 verified across demo.html + all dist/* assets (strict zero-WASM CSP)');
} finally {
  server.close();
}

/* 8. Headless DOM + WebCrypto SHA-256 + Canvas2D + Ambient test */
function makeFakeEl(tag) {
  const attrs = new Map();
  const classes = new Set();
  const listeners = new Map();
  const el = {
    tagName: tag.toUpperCase(),
    children: [],
    style: {},
    hidden: false,
    textContent: '',
    width: 1280,
    height: 720,
    classList: {
      add: (...c) => c.forEach((x) => classes.add(x)),
      remove: (...c) => c.forEach((x) => classes.delete(x)),
      toggle: (x, f) => (f === undefined ? (classes.has(x) ? classes.delete(x) : classes.add(x)) : (f ? classes.add(x) : classes.delete(x))),
      contains: (x) => classes.has(x)
    },
    setAttribute: (k, v) => attrs.set(k, String(v)),
    getAttribute: (k) => (attrs.has(k) ? attrs.get(k) : null),
    append: (...nodes) => el.children.push(...nodes),
    replaceChildren: (...nodes) => { el.children = [...nodes]; },
    addEventListener: (ev, fn) => { if (!listeners.has(ev)) listeners.set(ev, []); listeners.get(ev).push(fn); },
    dispatchEvent: (ev) => {
      const arr = listeners.get(ev.type) || [];
      for (const fn of arr) fn(ev);
      return !ev.defaultPrevented;
    },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1280, height: 720 }),
    getContext: (kind) => {
      if (kind === '2d') {
        return {
          fillStyle: '#000', strokeStyle: '#000', lineWidth: 1,
          fillRect: () => {},
          beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, arc: () => {},
          fill: () => {}, stroke: () => {}
        };
      }
      return null;
    }
  };
  return el;
}

const rootEl = makeFakeEl('section');
rootEl.setAttribute('data-acropolis-world', 'true');
rootEl.setAttribute('data-site', 'aienos');
rootEl.setAttribute('data-theme', 'aegean');
rootEl.setAttribute('data-world-url', '/dist/astral-cosmos.om3d');

let rafCb = null;
const sandbox = {
  Math, Float32Array, Uint16Array, Uint32Array, Uint8Array, ArrayBuffer, DataView,
  Object, Array, String, Number, Boolean, Date, Promise, parseInt, atob, Buffer,
  crypto: crypto.webcrypto,
  console,
  CustomEvent: class CustomEvent { constructor(type, init) { this.type = type; this.detail = init?.detail; this.defaultPrevented = false; } preventDefault() { this.defaultPrevented = true; } },
  location: { origin: 'https://www.aienos.com', assign: () => {} },
  performance: { getEntriesByType: () => [{ name: 'https://www.aienos.com/js/acropolis-world.js' }, { name: 'https://www.aienos.com/assets/acropolis.css' }] },
  fetch: async () => ({
    ok: true,
    arrayBuffer: async () => om3dBytes.buffer.slice(om3dBytes.byteOffset, om3dBytes.byteOffset + om3dBytes.byteLength)
  }),
  requestAnimationFrame: (cb) => { rafCb = cb; return 1; },
  cancelAnimationFrame: () => {},
  document: {
    readyState: 'complete',
    hidden: false,
    createElement: (tag) => makeFakeEl(tag),
    createTextNode: (t) => ({ nodeType: 3, textContent: t }),
    getElementsByTagName: () => [],
    getElementById: () => null,
    querySelectorAll: () => [rootEl],
    addEventListener: () => {}
  },
  window: null
};
sandbox.window = sandbox;
sandbox.window.devicePixelRatio = 2;
sandbox.window.matchMedia = () => ({ matches: false });
sandbox.window.addEventListener = () => {};

vm.runInNewContext(jsText, sandbox, { filename: 'acropolis-world.js' });
assert.ok(sandbox.window.AcropolisWorld);
assert.equal(sandbox.window.AcropolisWorld.version, '2.0.0');
assert.equal(sandbox.window.AcropolisWorld.portals.length, 5);
const inst = rootEl.__acropolisInstance;
assert.ok(inst);

await new Promise((r) => setTimeout(r, 50));
if (rafCb) rafCb(1000);
if (rafCb) rafCb(1016.6);
inst.selectPortal('shame');
inst.setTheme('parian');
if (rafCb) rafCb(1033.3);
const st = inst.getStatus();
assert.equal(st.theme, 'parian');
assert.equal(st.activePortal, 'shame');
assert.equal(st.om3dVerified, true, 'Expected WebCrypto SHA-256 verification of OM3D payload!');
assert.ok(st.totalTriangles > 10000, 'Expected combined OM3D + Flying Helices > 10000 tris');
assert.equal(st.shield.thirdPartyResources, 0);
inst.destroy();
console.log('[PASS] Headless mount + WebCrypto OM3D SHA-256 + 5 portals verified:', JSON.stringify(st));

/* Ambient check */
const ambEl = makeFakeEl('div');
ambEl.setAttribute('data-acropolis-world', 'true');
ambEl.setAttribute('data-mode', 'ambient');
ambEl.setAttribute('aria-hidden', 'true');
const ambInst = sandbox.window.AcropolisWorld.mount(ambEl);
assert.equal(ambEl.classList.contains('acr-ambient'), true);
assert.equal(ambEl.children.length, 3, 'ambient mode must mount canvas + 2 trim lines');
assert.equal(ambEl.children[0].getAttribute('tabindex'), null);
ambInst.destroy();
console.log('[PASS] Ambient full-screen mode WCAG aria-hidden verified');

/* Write fresh SHA256SUMS.txt */
const files = ['dist/acropolis-world.js', 'dist/acropolis.css', 'dist/astral-cosmos.om3d', 'dist/astral-cosmos.om3d.sha256', 'dist/omega-acropolis.holo', 'demo.html'];
const sums = files.map((f) => {
  const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, f))).digest('hex');
  console.log(`${h}  ${f}`);
  return `${h}  ${f}`;
}).join('\n') + '\n';
fs.writeFileSync(path.join(root, 'dist/SHA256SUMS.txt'), sums, 'utf8');
console.log('[PASS] Updated dist/SHA256SUMS.txt');
