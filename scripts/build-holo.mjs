import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const css = fs.readFileSync(path.join(root, 'dist/acropolis.css'), 'utf8');
const engineJs = fs.readFileSync(path.join(root, 'dist/acropolis-world.js'), 'utf8');

const holoHtml = `<div class="acr-holo-shell">
  <section id="acropolis-world" data-acropolis-world="true" data-site="standalone" data-theme="aegean" data-world-url="off" aria-label="Omega Astral Cosmos 3D World"></section>
  <pre id="acr-holo-log" class="acr-insp-receipt">Booting Omega Astral Cosmos Prism (Pure OM-2 Compiled)...</pre>
</div>`;

const holoCss = css + `\n.acr-holo-shell{display:grid;gap:10px;max-width:1180px;margin:0 auto}\n`;

const observerBridgeJs = `\n;(function () {
  'use strict';
  var V = (typeof window !== 'undefined' && window.verdant) ? window.verdant : null;
  var host = document.getElementById('acropolis-world');
  var log = document.getElementById('acr-holo-log');
  if (!host || !window.AcropolisWorld) return;
  var inst = window.AcropolisWorld.mount(host, { site: 'standalone', theme: 'aegean', worldUrl: 'off' });

  function updateLog(reason) {
    var st = inst.getStatus();
    if (log) {
      log.textContent =
        'ACROPOLIS PRISM (' + reason + ') | backend=' + st.backend +
        ' | theme=' + st.theme +
        ' | tris=' + st.totalTriangles +
        ' | particles=' + st.particles +
        ' | portal=' + (st.activePortal || 'overview') +
        ' | 3p_hosts=' + st.shield.thirdPartyResources;
    }
    if (V && typeof V.emit === 'function') {
      V.emit('acropolis.telemetry', { reason: reason, status: st }, {
        'acropolis.theme': st.theme,
        'acropolis.backend': st.backend,
        'acropolis.triangles': st.totalTriangles,
        'acropolis.third_party': st.shield.thirdPartyResources
      });
    }
    if (V && V.sense && typeof V.sense.emitVisualFrame === 'function') {
      V.sense.emitVisualFrame({
        width: host.clientWidth || 960,
        height: host.clientHeight || 560,
        coherent: true,
        theme: st.theme,
        triangles: st.totalTriangles,
        particles: st.particles
      });
    }
    return st;
  }

  host.addEventListener('acropolis:portal', function (ev) {
    ev.preventDefault();
    var p = ev.detail && ev.detail.portal ? ev.detail.portal : null;
    if (p && V && typeof V.emit === 'function') {
      V.emit('acropolis.portal', { id: p.id, name: p.name, sigil: p.sigil, href: ev.detail.href }, { 'acropolis.portal': p.id });
    }
    updateLog('portal:' + (p ? p.id : 'none'));
  });

  host.addEventListener('acropolis:theme', function (ev) {
    var th = ev.detail && ev.detail.theme ? ev.detail.theme : inst.getTheme();
    if (V && typeof V.emit === 'function') {
      V.emit('acropolis.theme', { theme: th }, { 'acropolis.theme': th });
    }
    updateLog('theme:' + th);
  });

  if (V && typeof V.onInput === 'function') {
    V.onInput(async function (payload) {
      var cmd = typeof payload === 'string' ? { action: payload.trim().toLowerCase() } : (payload || {});
      var action = String(cmd.action || 'status').toLowerCase();
      if (action === 'theme') {
        inst.setTheme(cmd.theme === 'parian' ? 'parian' : 'aegean');
        return { ok: true, status: updateLog('cmd-theme') };
      }
      if (action === 'portal') {
        inst.selectPortal(cmd.portal || 'omega');
        return { ok: true, status: updateLog('cmd-portal') };
      }
      if (action === 'camera') {
        inst.setCamera(cmd.yaw, cmd.pitch, cmd.dist);
        return { ok: true, status: updateLog('cmd-camera') };
      }
      if (action === 'reset') {
        inst.resetView();
        return { ok: true, status: updateLog('cmd-reset') };
      }
      if (action === 'shield' || action === 'inspect') {
        var st = updateLog('cmd-' + action);
        if (V && typeof V.emit === 'function') {
          V.emit('acropolis.shield', st.shield, { 'acropolis.third_party': st.shield.thirdPartyResources });
        }
        return { ok: true, shield: st.shield, status: st };
      }
      return { ok: true, status: updateLog('cmd-status') };
    });
  }

  setTimeout(function () {
    if (V && typeof V.emit === 'function') {
      V.emit('prism.ready', { name: 'omega-acropolis', version: inst.version });
    }
    updateLog('boot-ready');
  }, 400);
})();
`;

const holoJs = engineJs + observerBridgeJs;

const appObj = {
  html: holoHtml,
  css: holoCss,
  js: holoJs
};

const payloadHash = crypto
  .createHash('sha256')
  .update(JSON.stringify(appObj))
  .digest('hex');

const holo = {
  schema: 'verdant-ui/holo/1',
  digest: 'sha256:' + payloadHash,
  name: 'Omega Astral Cosmos v2.0 - Pure OM-2 Universe',
  summary: 'Interactive Omega Astral Cosmos 3D World powered by pure seeded OM-2 compiled OM3D geometry verified live via SHA-256, WebGPU compute warp stars, 24 flying 4-strand DNA helices, zero-upload WebGL2 HDR bloom, and CBF 4K frame pacing (zero WASM, zero tracking).',
  streams: {
    inputs: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          enum: ['status', 'theme', 'portal', 'camera', 'reset', 'inspect', 'shield'],
          description: 'Command to dispatch to the live Spatial Acropolis 3D World Prism.'
        },
        theme: {
          type: 'string',
          enum: ['aegean', 'parian'],
          description: 'Theme selection for action=theme (Aegean Night or Sunlit Parian Marble).'
        },
        portal: {
          type: 'string',
          enum: ['omega', 'harmonia', 'forge', 'aien', 'shame'],
          description: 'Portal target for action=portal.'
        },
        yaw: { type: 'number', description: 'Camera orbit yaw in radians for action=camera.' },
        pitch: { type: 'number', description: 'Camera pitch in radians (0.09..1.18) for action=camera.' },
        dist: { type: 'number', description: 'Camera orbit radius (11.5..62.0) for action=camera.' }
      },
      required: ['action']
    },
    outputs: [
      'prism.ready',
      'acropolis.telemetry',
      'acropolis.portal',
      'acropolis.theme',
      'acropolis.shield',
      'sensory'
    ]
  },
  grants: {
    observer: true,
    storage: false,
    browser: true,
    network: false
  },
  app: appObj
};

const outPath = path.join(root, 'dist/omega-acropolis.holo');
fs.writeFileSync(outPath, JSON.stringify(holo, null, 2) + '\n', 'utf8');
console.log('Wrote', outPath, 'bytes=' + fs.statSync(outPath).size, 'digest=' + holo.digest);
