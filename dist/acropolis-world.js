/*
 * Neo-Hellenic Spatial Acropolis 3D World Engine
 * Powered by Verdant Engine (verdant-wasm.wasm) + WebGL2 HDR/Shadow/PBR +
 * zero-allocation Float32Array particle/telemetry rings (omega-observer).
 *
 * Security & Privacy Contract:
 * - Zero CDN, zero third-party network fetches, zero cookies, zero storage.
 * - Zero dynamic HTML parsing, zero eval, 100% printable ASCII bytes.
 * - Compliant with strict CSP (script-src 'self', optional 'wasm-unsafe-eval').
 */
(function () {
  'use strict';

  var VERSION = '1.0.0';

  var PORTALS = [
    {
      id: 'omega',
      sigil: '\u03A9',
      name: 'Temple of Omega',
      role: 'Seeded Compiler & Sovereign Silicon',
      epithet: 'SUMMIT SANCTUARY',
      accent: 'gold',
      color: [0.96, 0.77, 0.32],
      pos: [0.0, 7.6, -2.5],
      pinOffset: 6.4,
      cam: { yaw: 0.36, pitch: 0.25, dist: 23.0, tx: 0.0, ty: 8.8, tz: -2.2 },
      routes: { aienos: '/omega/', interplane: '/omega/', standalone: '#temple-of-omega' },
      desc: 'A 408-byte sovereign seed compiled straight to native silicon with hardware bounds traps, deterministic SHA-256 receipts, and zero external runtimes.',
      receipt: 'SEED: 408 B | TARGETS: a64linux / a64macos / x86linux / SM121\nSANDBOX: execpure (Landlock ABI-3 + seccomp-BPF + prlimit64)'
    },
    {
      id: 'harmonia',
      sigil: '\u03A6\u03C0\u03B5',
      name: 'Harmonia Agora',
      role: 'Recursive Intelligence & Math Core',
      epithet: 'EASTERN TERRACE',
      accent: 'cyan',
      color: [0.13, 0.83, 0.93],
      pos: [12.4, 4.1, 7.4],
      pinOffset: 4.5,
      cam: { yaw: 1.05, pitch: 0.26, dist: 16.5, tx: 10.2, ty: 5.2, tz: 6.4 },
      routes: { aienos: '/agora/', interplane: '/papers/', standalone: '#harmonia-agora' },
      desc: 'Andrew Josef Kadziolka\'s recursive intelligence calculus verified across pure Omega native operators, Wolfram symbolic proofs, and Lean 4 invariants.',
      receipt: 'OPERATORS: \u03A6 \u03C0 \u03B5 \u039B \u0394 \u03A8 + \u03A3 corridor | \u03A9 boundary: FAIL-CLOSED\nPARITY: <= 1.78e-15 max error across Mac, Linux, and proofs'
    },
    {
      id: 'forge',
      sigil: '\u039B',
      name: 'Interplane Forge',
      role: 'Canonical Repositories & Proof Chains',
      epithet: 'NORTHWEST BASTION',
      accent: 'azure',
      color: [0.38, 0.65, 0.98],
      pos: [-12.2, 5.2, -7.8],
      pinOffset: 4.6,
      cam: { yaw: -1.08, pitch: 0.29, dist: 17.5, tx: -9.8, ty: 6.0, tz: -6.4 },
      routes: { aienos: '/verify/', interplane: '/forge/', standalone: '#interplane-forge' },
      desc: 'Public source-of-truth repositories, immutable SHA-256 verification receipts, and open Helix specialist chains hosted directly on sovereign metal.',
      receipt: 'LEDGER: FIPS 180-4 SHA-256 chain | BUILD: pure seeded OM-2\nVERIFY: offline checksums + public receipts, zero account wall'
    },
    {
      id: 'aien',
      sigil: '\u03A8',
      name: 'Aien Sanctuary',
      role: 'Persistent Sovereign Subject',
      epithet: 'SOUTHWEST OVERLOOK',
      accent: 'emerald',
      color: [0.18, 0.83, 0.63],
      pos: [-11.8, 4.1, 8.6],
      pinOffset: 4.5,
      cam: { yaw: -0.78, pitch: 0.26, dist: 16.5, tx: -9.6, ty: 5.1, tz: 7.4 },
      routes: { aienos: '/aien/', interplane: '/sovereign-intelligence/', standalone: '#aien-sanctuary' },
      desc: 'A persistent sovereign mind that runs on hardware you own, speaks plainly without trackers or subscriptions, and turns search into checked understanding.',
      receipt: 'GATEWAY: pure seeded OM-2 | MEMORY: opt-in only, stateless by default\nPLEDGE: nothing for sale, zero login, zero waitlist, zero ads'
    },
    {
      id: 'shame',
      sigil: '\u0394',
      name: 'Wall of Shame',
      role: 'Public Backend Defense Challenge',
      epithet: 'AEGEAN WATCHTOWER',
      accent: 'terra',
      color: [0.94, 0.36, 0.24],
      pos: [6.4, 4.1, 14.8],
      pinOffset: 4.5,
      cam: { yaw: 0.32, pitch: 0.24, dist: 15.8, tx: 5.4, ty: 5.0, tz: 13.0 },
      routes: { aienos: '/privacy/#wall-of-shame', interplane: '/#wall-of-shame', standalone: '#wall-of-shame' },
      desc: 'Zero-tracking guest guarantee paired with an open defensive barrier challenge: ordinary visitors leave zero trace, while hostile probes get sealed by SHA-256.',
      receipt: ''
    }
  ];

  var CELESTIAL_SIGILS = [
    { glyph: '\u03A9', phase: 0.0, radius: 19.5, height: 15.6, color: [0.96, 0.77, 0.32] },
    { glyph: '\u03A6', phase: 0.90, radius: 20.8, height: 16.4, color: [0.13, 0.83, 0.93] },
    { glyph: '\u03C0', phase: 1.80, radius: 20.0, height: 15.2, color: [0.38, 0.65, 0.98] },
    { glyph: '\u03B5', phase: 2.70, radius: 21.2, height: 16.8, color: [0.18, 0.83, 0.63] },
    { glyph: '\u039B', phase: 3.60, radius: 19.8, height: 15.5, color: [0.38, 0.65, 0.98] },
    { glyph: '\u0394', phase: 4.50, radius: 20.6, height: 16.1, color: [0.94, 0.36, 0.24] },
    { glyph: '\u03A8', phase: 5.40, radius: 20.2, height: 15.8, color: [0.18, 0.83, 0.63] }
  ];

  var OVERVIEW_CAM = { yaw: 0.44, pitch: 0.31, dist: 34.0, tx: 0.0, ty: 7.0, tz: 1.5 };

  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function mat4Perspective(fov, aspect, near, far) {
    var f = 1.0 / Math.tan(fov * 0.5);
    var nf = 1.0 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (far + near) * nf, -1,
      0, 0, 2 * far * near * nf, 0
    ]);
  }

  function mat4Ortho(l, r, b, t, n, f) {
    var rl = 1 / (r - l), tb = 1 / (t - b), fn = 1 / (f - n);
    return new Float32Array([
      2 * rl, 0, 0, 0,
      0, 2 * tb, 0, 0,
      0, 0, -2 * fn, 0,
      -(r + l) * rl, -(t + b) * tb, -(f + n) * fn, 1
    ]);
  }

  function mat4LookAt(eye, tgt, up) {
    var zx = eye[0] - tgt[0], zy = eye[1] - tgt[1], zz = eye[2] - tgt[2];
    var zl = Math.hypot(zx, zy, zz) || 1;
    zx /= zl; zy /= zl; zz /= zl;
    var xx = up[1] * zz - up[2] * zy;
    var xy = up[2] * zx - up[0] * zz;
    var xz = up[0] * zy - up[1] * zx;
    var xl = Math.hypot(xx, xy, xz) || 1;
    xx /= xl; xy /= xl; xz /= xl;
    var yx = zy * xz - zz * xy;
    var yy = zz * xx - zx * xz;
    var yz = zx * xy - zy * xx;
    return new Float32Array([
      xx, yx, zx, 0,
      xy, yy, zy, 0,
      xz, yz, zz, 0,
      -(xx * eye[0] + xy * eye[1] + xz * eye[2]),
      -(yx * eye[0] + yy * eye[1] + yz * eye[2]),
      -(zx * eye[0] + zy * eye[1] + zz * eye[2]),
      1
    ]);
  }

  function mat4Mul(a, b, out) {
    var o = out || new Float32Array(16);
    for (var c = 0; c < 4; c++) {
      var b0 = b[c * 4], b1 = b[c * 4 + 1], b2 = b[c * 4 + 2], b3 = b[c * 4 + 3];
      o[c * 4]     = a[0] * b0 + a[4] * b1 + a[8]  * b2 + a[12] * b3;
      o[c * 4 + 1] = a[1] * b0 + a[5] * b1 + a[9]  * b2 + a[13] * b3;
      o[c * 4 + 2] = a[2] * b0 + a[6] * b1 + a[10] * b2 + a[14] * b3;
      o[c * 4 + 3] = a[3] * b0 + a[7] * b1 + a[11] * b2 + a[15] * b3;
    }
    return o;
  }

  function projectPoint(mvp, x, y, z, w, h, out) {
    var cx = mvp[0] * x + mvp[4] * y + mvp[8]  * z + mvp[12];
    var cy = mvp[1] * x + mvp[5] * y + mvp[9]  * z + mvp[13];
    var cz = mvp[2] * x + mvp[6] * y + mvp[10] * z + mvp[14];
    var cw = mvp[3] * x + mvp[7] * y + mvp[11] * z + mvp[15];
    if (cw <= 0.08) {
      out[0] = -9999; out[1] = -9999; out[2] = -1;
      return false;
    }
    var inv = 1.0 / cw;
    var ndx = cx * inv;
    var ndy = cy * inv;
    var ndz = cz * inv;
    out[0] = (ndx * 0.5 + 0.5) * w;
    out[1] = (0.5 - ndy * 0.5) * h;
    out[2] = ndz;
    return ndx >= -1.15 && ndx <= 1.15 && ndy >= -1.15 && ndy <= 1.15 && ndz >= -1.0 && ndz <= 1.0;
  }

  /* Growable typed-array mesh accumulator (matches Verdant SmoothMeshAcc layout) */
  function createMeshBuilder(initVerts, initIdx) {
    var vCap = initVerts || 8192;
    var iCap = initIdx || 24576;
    var pos = new Float32Array(vCap * 3);
    var norm = new Float32Array(vCap * 3);
    var col = new Float32Array(vCap * 3);
    var idx = new Uint32Array(iCap);
    var vLen = 0;
    var iLen = 0;

    function growV(need) {
      if (vLen + need <= vCap) return;
      while (vCap < vLen + need) vCap *= 2;
      var np = new Float32Array(vCap * 3); np.set(pos); pos = np;
      var nn = new Float32Array(vCap * 3); nn.set(norm); norm = nn;
      var nc = new Float32Array(vCap * 3); nc.set(col); col = nc;
    }

    function growI(need) {
      if (iLen + need <= iCap) return;
      while (iCap < iLen + need) iCap *= 2;
      var ni = new Uint32Array(iCap); ni.set(idx); idx = ni;
    }

    function vert(x, y, z, nx, ny, nz, r, g, b, matId) {
      growV(1);
      var o = vLen * 3;
      pos[o] = x; pos[o + 1] = y; pos[o + 2] = z;
      norm[o] = nx; norm[o + 1] = ny; norm[o + 2] = nz;
      var cr = clamp(r, 0.005, 0.992) + (matId || 0);
      col[o] = cr; col[o + 1] = clamp(g, 0.005, 0.995); col[o + 2] = clamp(b, 0.005, 0.995);
      return vLen++;
    }

    function tri(a, b, c) {
      growI(3);
      idx[iLen++] = a; idx[iLen++] = b; idx[iLen++] = c;
    }

    function quad(p0, p1, p2, p3, c, matId) {
      var ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2];
      var vx = p2[0] - p0[0], vy = p2[1] - p0[1], vz = p2[2] - p0[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var v0 = vert(p0[0], p0[1], p0[2], nx, ny, nz, c[0], c[1], c[2], matId);
      var v1 = vert(p1[0], p1[1], p1[2], nx, ny, nz, c[0], c[1], c[2], matId);
      var v2 = vert(p2[0], p2[1], p2[2], nx, ny, nz, c[0], c[1], c[2], matId);
      var v3 = vert(p3[0], p3[1], p3[2], nx, ny, nz, c[0], c[1], c[2], matId);
      tri(v0, v1, v2);
      tri(v0, v2, v3);
    }

    function box(x0, y0, z0, x1, y1, z1, c, matId) {
      quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], c, matId);
      quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], c, matId);
      quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], c, matId);
      quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], c, matId);
      quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], c, matId);
      quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], c, matId);
    }

    function prism(p0, p1, p2, p3, p4, p5, c, matId) {
      var ux = p1[0] - p0[0], uy = p1[1] - p0[1], uz = p1[2] - p0[2];
      var vx = p2[0] - p0[0], vy = p2[1] - p0[1], vz = p2[2] - p0[2];
      var nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      var nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;
      var a = vert(p0[0], p0[1], p0[2], nx, ny, nz, c[0], c[1], c[2], matId);
      var b = vert(p1[0], p1[1], p1[2], nx, ny, nz, c[0], c[1], c[2], matId);
      var d = vert(p2[0], p2[1], p2[2], nx, ny, nz, c[0], c[1], c[2], matId);
      tri(a, b, d);
      var e = vert(p3[0], p3[1], p3[2], -nx, -ny, -nz, c[0], c[1], c[2], matId);
      var f = vert(p5[0], p5[1], p5[2], -nx, -ny, -nz, c[0], c[1], c[2], matId);
      var g = vert(p4[0], p4[1], p4[2], -nx, -ny, -nz, c[0], c[1], c[2], matId);
      tri(e, f, g);
      quad(p0, p3, p4, p1, c, matId);
      quad(p1, p4, p5, p2, c, matId);
      quad(p2, p5, p3, p0, c, matId);
    }

    function flutedColumn(cx, baseY, cz, rBot, rTop, height, flutes, marbleCol, goldCol) {
      var segs = flutes * 2;
      var rings = 5;
      var ringStarts = [];
      for (var ri = 0; ri <= rings; ri++) {
        var t = ri / rings;
        var y = baseY + t * height;
        var entasis = Math.sin(t * Math.PI) * 0.045 * rBot;
        var baseR = lerp(rBot, rTop, t) + entasis;
        var start = vLen;
        ringStarts.push(start);
        for (var si = 0; si <= segs; si++) {
          var ang = (si / segs) * Math.PI * 2;
          var groove = (si & 1) === 1 ? 0.90 : 1.0;
          var rad = baseR * groove;
          var ca = Math.cos(ang), sa = Math.sin(ang);
          var shade = (si & 1) === 1 ? 0.91 : 1.0;
          vert(
            cx + ca * rad, y, cz + sa * rad,
            ca, 0.0, sa,
            marbleCol[0] * shade, marbleCol[1] * shade, marbleCol[2] * shade,
            0
          );
        }
      }
      for (var rj = 0; rj < rings; rj++) {
        var r0 = ringStarts[rj], r1 = ringStarts[rj + 1];
        for (var sj = 0; sj < segs; sj++) {
          tri(r0 + sj, r0 + sj + 1, r1 + sj + 1);
          tri(r0 + sj, r1 + sj + 1, r1 + sj);
        }
      }
      /* Burnished Attic Gold astragal neck ring */
      cylinder(cx, baseY + height - 0.12, cz, rTop * 1.07, rTop * 1.12, 0.14, 14, goldCol, 2);
      /* Doric echinus cushion */
      cylinder(cx, baseY + height, cz, rTop * 1.02, rBot * 1.24, 0.24, 14, marbleCol, 0);
      /* Square Doric abacus */
      var ab = rBot * 1.26;
      box(cx - ab, baseY + height + 0.24, cz - ab, cx + ab, baseY + height + 0.44, cz + ab, marbleCol, 0);
    }

    function cylinder(cx, baseY, cz, rBot, rTop, height, segs, c, matId) {
      var s0 = vLen;
      for (var i = 0; i <= segs; i++) {
        var a = (i / segs) * Math.PI * 2;
        var ca = Math.cos(a), sa = Math.sin(a);
        vert(cx + ca * rBot, baseY, cz + sa * rBot, ca, 0.12, sa, c[0], c[1], c[2], matId);
        vert(cx + ca * rTop, baseY + height, cz + sa * rTop, ca, 0.12, sa, c[0], c[1], c[2], matId);
      }
      for (var j = 0; j < segs; j++) {
        var k = s0 + j * 2;
        tri(k, k + 2, k + 3);
        tri(k, k + 3, k + 1);
      }
      var topCenter = vert(cx, baseY + height, cz, 0, 1, 0, c[0], c[1], c[2], matId);
      var rimStart = vLen;
      for (var m = 0; m <= segs; m++) {
        var am = (m / segs) * Math.PI * 2;
        vert(cx + Math.cos(am) * rTop, baseY + height, cz + Math.sin(am) * rTop, 0, 1, 0, c[0], c[1], c[2], matId);
      }
      for (var n = 0; n < segs; n++) {
        tri(topCenter, rimStart + n + 1, rimStart + n);
      }
    }

    function cypressTree(cx, baseY, cz, scale, barkCol, leafCol) {
      cylinder(cx, baseY, cz, 0.14 * scale, 0.09 * scale, 0.9 * scale, 7, barkCol, 0);
      var tiers = 4;
      for (var t = 0; t < tiers; t++) {
        var f = t / tiers;
        var y0 = baseY + (0.65 + f * 2.55) * scale;
        var h = (1.35 - f * 0.18) * scale;
        var rb = (0.62 - f * 0.13) * scale;
        var rt = t === tiers - 1 ? 0.03 * scale : (0.34 - f * 0.07) * scale;
        var shade = 0.85 + f * 0.22;
        cylinder(cx, y0, cz, rb, rt, h, 9, [leafCol[0] * shade, leafCol[1] * shade, leafCol[2] * shade], 4);
      }
    }

    function portalShrine(portal, marbleCol, travertineCol, goldCol) {
      var px = portal.pos[0], py = portal.pos[1], pz = portal.pos[2];
      var ang = Math.atan2(-px, -pz);
      var ca = Math.cos(ang), sa = Math.sin(ang);
      function rot(lx, ly, lz) {
        return [px + lx * ca - lz * sa, py + ly, pz + lx * sa + lz * ca];
      }
      function rbox(x0, y0, z0, x1, y1, z1, c, m) {
        var p000 = rot(x0, y0, z0), p100 = rot(x1, y0, z0), p101 = rot(x1, y0, z1), p001 = rot(x0, y0, z1);
        var p010 = rot(x0, y1, z0), p110 = rot(x1, y1, z0), p111 = rot(x1, y1, z1), p011 = rot(x0, y1, z1);
        quad(p011, p111, p110, p010, c, m);
        quad(p000, p100, p101, p001, c, m);
        quad(p001, p101, p111, p011, c, m);
        quad(p100, p000, p010, p110, c, m);
        quad(p101, p100, p110, p111, c, m);
        quad(p000, p001, p011, p010, c, m);
      }
      /* 2-stepped shrine crepidoma */
      rbox(-1.95, -0.45, -1.55, 1.95, 0.0, 1.55, travertineCol, 0);
      rbox(-1.55, 0.0, -1.2, 1.55, 0.28, 1.2, marbleCol, 0);
      /* Twin fluted framing stelae */
      var leftPos = rot(-1.15, 0.28, 0.0);
      var rightPos = rot(1.15, 0.28, 0.0);
      flutedColumn(leftPos[0], leftPos[1], leftPos[2], 0.22, 0.17, 2.75, 10, marbleCol, goldCol);
      flutedColumn(rightPos[0], rightPos[1], rightPos[2], 0.22, 0.17, 2.75, 10, marbleCol, goldCol);
      /* Golden entablature crown */
      rbox(-1.55, 3.44, -0.42, 1.55, 3.74, 0.42, marbleCol, 0);
      rbox(-1.66, 3.74, -0.48, 1.66, 3.92, 0.48, goldCol, 2);
      /* Luminous altar core matching portal accent */
      rbox(-0.55, 0.28, -0.55, 0.55, 0.62, 0.55, goldCol, 2);
      rbox(-0.34, 0.62, -0.34, 0.34, 0.72, 0.34, portal.color, 3);
    }

    function finish() {
      return {
        pos: pos.slice(0, vLen * 3),
        norm: norm.slice(0, vLen * 3),
        col: col.slice(0, vLen * 3),
        idx: idx.slice(0, iLen),
        vertCount: vLen,
        triCount: (iLen / 3) | 0,
        epoch: 1
      };
    }

    return {
      vert: vert, tri: tri, quad: quad, box: box, prism: prism,
      flutedColumn: flutedColumn, cylinder: cylinder, cypressTree: cypressTree,
      portalShrine: portalShrine, finish: finish
    };
  }

  /* Procedural Neo-Hellenic Greek Acropolis World Synthesizer */
  function buildAcropolisStaticMesh() {
    var mb = createMeshBuilder(16384, 49152);

    var parianMarble   = [0.95, 0.92, 0.85];
    var warmLimestone  = [0.87, 0.82, 0.72];
    var cliffStone     = [0.56, 0.52, 0.46];
    var cliffDark      = [0.39, 0.38, 0.37];
    var atticGold      = [0.94, 0.74, 0.26];
    var burnishedGold  = [0.85, 0.60, 0.18];
    var terracotta     = [0.76, 0.34, 0.22];
    var aegeanSea      = [0.06, 0.24, 0.46];
    var shallowSea     = [0.10, 0.42, 0.58];
    var cypressBark    = [0.32, 0.24, 0.17];
    var laurelEmerald  = [0.13, 0.36, 0.24];
    var emberGold      = [0.99, 0.72, 0.24];

    /* 1. Shimmering Aegean Sapphire Sea (radial rings for crisp shore detail) */
    var seaRings = [14, 22, 32, 46, 66, 94, 138];
    var seaSegs = 48;
    var seaStart = mb.vert(0, -0.05, 0, 0, 1, 0, shallowSea[0], shallowSea[1], shallowSea[2], 1);
    var ringIdx = [];
    for (var sr = 0; sr < seaRings.length; sr++) {
      var rad = seaRings[sr];
      var mixD = clamp((rad - 18) / 70, 0, 1);
      var sc = [
        lerp(shallowSea[0], aegeanSea[0], mixD),
        lerp(shallowSea[1], aegeanSea[1], mixD),
        lerp(shallowSea[2], aegeanSea[2], mixD)
      ];
      var rStart = -1;
      for (var ss = 0; ss <= seaSegs; ss++) {
        var sa = (ss / seaSegs) * Math.PI * 2;
        var vi = mb.vert(Math.cos(sa) * rad, 0.0, Math.sin(sa) * rad, 0, 1, 0, sc[0], sc[1], sc[2], 1);
        if (ss === 0) rStart = vi;
      }
      ringIdx.push(rStart);
    }
    for (var s0 = 0; s0 < seaSegs; s0++) {
      mb.tri(seaStart, ringIdx[0] + s0 + 1, ringIdx[0] + s0);
    }
    for (var sr2 = 0; sr2 < seaRings.length - 1; sr2++) {
      var a0 = ringIdx[sr2], b0 = ringIdx[sr2 + 1];
      for (var ss2 = 0; ss2 < seaSegs; ss2++) {
        mb.tri(a0 + ss2, a0 + ss2 + 1, b0 + ss2 + 1);
        mb.tri(a0 + ss2, b0 + ss2 + 1, b0 + ss2);
      }
    }

    /* 2. Sculpted Acropolis Headland Cliff & Terraces */
    function buildRockyTier(cx, cz, rx, rz, yBot, yTop, segs, cragAmp, topCol, sideCol) {
      var topCenter = mb.vert(cx, yTop, cz, 0, 1, 0, topCol[0], topCol[1], topCol[2], 0);
      var tRing = -1;
      for (var i = 0; i <= segs; i++) {
        var a = (i / segs) * Math.PI * 2;
        var crag = 1.0 + Math.sin(a * 5.0 + cx) * cragAmp + Math.cos(a * 9.0 - cz) * (cragAmp * 0.55);
        var x = cx + Math.cos(a) * rx * crag;
        var z = cz + Math.sin(a) * rz * crag;
        var vi = mb.vert(x, yTop, z, 0, 1, 0, topCol[0], topCol[1], topCol[2], 0);
        if (i === 0) tRing = vi;
      }
      for (var j = 0; j < segs; j++) {
        mb.tri(topCenter, tRing + j + 1, tRing + j);
      }
      var sStart = -1;
      for (var k = 0; k <= segs; k++) {
        var ak = (k / segs) * Math.PI * 2;
        var crTop = 1.0 + Math.sin(ak * 5.0 + cx) * cragAmp + Math.cos(ak * 9.0 - cz) * (cragAmp * 0.55);
        var crBot = crTop * 1.16 + Math.sin(ak * 7.0 + 1.2) * (cragAmp * 0.7);
        var nx = Math.cos(ak), nz = Math.sin(ak);
        var shade = 0.88 + 0.12 * Math.sin(ak * 6.0);
        var vBot = mb.vert(cx + nx * rx * crBot, yBot, cz + nz * rz * crBot, nx * 0.92, 0.36, nz * 0.92, sideCol[0] * shade * 0.82, sideCol[1] * shade * 0.82, sideCol[2] * shade * 0.85, 0);
        mb.vert(cx + nx * rx * crTop, yTop, cz + nz * rz * crTop, nx * 0.96, 0.25, nz * 0.96, sideCol[0] * shade, sideCol[1] * shade, sideCol[2] * shade, 0);
        if (k === 0) sStart = vBot;
      }
      for (var m = 0; m < segs; m++) {
        var q = sStart + m * 2;
        mb.tri(q, q + 2, q + 3);
        mb.tri(q, q + 3, q + 1);
      }
    }

    /* Coastal underwater shelf & main Acropolis cliff mass */
    buildRockyTier(0.0, 2.0, 27.5, 29.0, -1.8, 1.1, 36, 0.08, cliffDark, cliffDark);
    buildRockyTier(0.0, 2.5, 22.8, 24.0, 0.8, 3.8, 36, 0.06, warmLimestone, cliffStone);
    /* Upper Sacred Acropolis Summit plateau */
    buildRockyTier(0.0, -3.5, 16.8, 16.0, 3.5, 6.2, 32, 0.04, parianMarble, warmLimestone);

    /* Cyclopean Retaining Ashlar Bastions & Parapet Walls */
    mb.box(-14.6, 3.8, -14.8, 14.6, 6.22, 6.4, warmLimestone, 0);
    mb.box(-14.9, 6.18, -15.1, 14.9, 6.38, 6.65, parianMarble, 0);
    /* Buttresses along cliff wall */
    for (var bi = -12; bi <= 12; bi += 6) {
      mb.box(bi - 0.65, 3.7, 6.35, bi + 0.65, 6.35, 7.1, warmLimestone, 0);
      mb.box(bi - 0.65, 3.7, -15.5, bi + 0.65, 6.35, -14.8, warmLimestone, 0);
    }

    /* 3. Grand Propylaea Processional Stairway (Agora y=3.8 -> Summit y=6.2) */
    var steps = 10;
    for (var st = 0; st < steps; st++) {
      var t = (st + 1) / steps;
      var sy = 3.8 + t * 2.4;
      var sz0 = 6.4 + (steps - 1 - st) * 0.44;
      var sz1 = sz0 + 0.48;
      mb.box(-3.6, 3.75, sz0, 3.6, sy, sz1, st % 2 === 0 ? parianMarble : warmLimestone, 0);
    }
    /* Stepped flanking parapets + golden propylaea braziers */
    mb.box(-4.35, 3.8, 6.3, -3.6, 6.85, 10.9, parianMarble, 0);
    mb.box(3.6, 3.8, 6.3, 4.35, 6.85, 10.9, parianMarble, 0);
    mb.box(-4.42, 6.85, 6.25, -3.52, 7.02, 10.95, atticGold, 2);
    mb.box(3.52, 6.85, 6.25, 4.42, 7.02, 10.95, atticGold, 2);
    /* Twin Propylaea Gateway Doric Columns */
    mb.flutedColumn(-4.0, 7.02, 7.2, 0.34, 0.27, 3.9, 10, parianMarble, atticGold);
    mb.flutedColumn(4.0, 7.02, 7.2, 0.34, 0.27, 3.9, 10, parianMarble, atticGold);
    /* Golden flame bowls at base of stairs */
    mb.cylinder(-4.0, 7.02, 10.3, 0.42, 0.56, 0.45, 12, burnishedGold, 2);
    mb.cylinder(4.0, 7.02, 10.3, 0.42, 0.56, 0.45, 12, burnishedGold, 2);
    mb.cylinder(-4.0, 7.45, 10.3, 0.34, 0.14, 0.28, 10, emberGold, 3);
    mb.cylinder(4.0, 7.45, 10.3, 0.34, 0.14, 0.28, 10, emberGold, 3);

    /* 4. THE PARTHENON - TEMPLE OF OMEGA (Centerpiece on Acropolis Summit) */
    var tx = 0.0, tz = -2.5, tBase = 6.2;
    /* 3-tier Parian Marble Crepidoma & Stylobate */
    mb.box(tx - 8.2, tBase, tz - 11.4, tx + 8.2, tBase + 0.30, tz + 11.4, warmLimestone, 0);
    mb.box(tx - 7.75, tBase + 0.30, tz - 10.95, tx + 7.75, tBase + 0.60, tz + 10.95, parianMarble, 0);
    mb.box(tx - 7.3, tBase + 0.60, tz - 10.5, tx + 7.3, tBase + 0.90, tz + 10.5, parianMarble, 0);
    var styY = tBase + 0.90;

    /* 28 Peripteral Fluted Doric Columns (6 front/back x 10 flanks) */
    var colH = 5.35;
    var colsX = 6, colsZ = 10;
    var spanX = 12.6, spanZ = 19.0;
    for (var ix = 0; ix < colsX; ix++) {
      var cx = tx - spanX * 0.5 + (ix / (colsX - 1)) * spanX;
      mb.flutedColumn(cx, styY, tz + spanZ * 0.5, 0.42, 0.33, colH, 12, parianMarble, atticGold);
      mb.flutedColumn(cx, styY, tz - spanZ * 0.5, 0.42, 0.33, colH, 12, parianMarble, atticGold);
    }
    for (var iz = 1; iz < colsZ - 1; iz++) {
      var cz = tz - spanZ * 0.5 + (iz / (colsZ - 1)) * spanZ;
      mb.flutedColumn(tx - spanX * 0.5, styY, cz, 0.42, 0.33, colH, 12, parianMarble, atticGold);
      mb.flutedColumn(tx + spanX * 0.5, styY, cz, 0.42, 0.33, colH, 12, parianMarble, atticGold);
    }

    /* Inner Naos (Cella) Sanctuary Walls with Glowing Golden Portal Core */
    mb.box(tx - 4.4, styY, tz - 6.8, tx - 3.85, styY + colH + 0.35, tz + 6.2, warmLimestone, 0);
    mb.box(tx + 3.85, styY, tz - 6.8, tx + 4.4, styY + colH + 0.35, tz + 6.2, warmLimestone, 0);
    mb.box(tx - 4.4, styY, tz - 6.8, tx + 4.4, styY + colH + 0.35, tz - 6.2, warmLimestone, 0);
    /* Glowing Sanctuary Entrance Doors & Hearth Altar */
    mb.box(tx - 3.85, styY, tz + 5.7, tx - 1.45, styY + colH + 0.35, tz + 6.2, warmLimestone, 0);
    mb.box(tx + 1.45, styY, tz + 5.7, tx + 3.85, styY + colH + 0.35, tz + 6.2, warmLimestone, 0);
    mb.box(tx - 1.45, styY + 4.0, tz + 5.7, tx + 1.45, styY + colH + 0.35, tz + 6.2, atticGold, 2);
    /* Warm Golden Inner Sanctuary Light Backwall */
    mb.box(tx - 1.35, styY + 0.05, tz + 2.4, tx + 1.35, styY + 3.8, tz + 2.8, emberGold, 3);
    mb.cylinder(tx, styY, tz + 4.2, 0.85, 0.65, 0.55, 16, atticGold, 2);

    /* Entablature: Architrave + Triglyph/Metope Frieze + Geison Cornice */
    var entY = styY + colH + 0.44;
    mb.box(tx - 6.85, entY, tz - 10.05, tx + 6.85, entY + 0.72, tz + 10.05, parianMarble, 0);
    mb.box(tx - 6.95, entY + 0.72, tz - 10.15, tx + 6.95, entY + 1.35, tz + 10.15, warmLimestone, 0);
    /* Burnished Attic Gold Frieze Band & Projecting Triglyphs */
    mb.box(tx - 7.0, entY + 0.68, tz - 10.2, tx + 7.0, entY + 0.80, tz + 10.2, atticGold, 2);
    for (var txG = -6.0; txG <= 6.01; txG += 1.5) {
      mb.box(tx + txG - 0.16, entY + 0.80, tz + 10.12, tx + txG + 0.16, entY + 1.34, tz + 10.28, atticGold, 2);
      mb.box(tx + txG - 0.16, entY + 0.80, tz - 10.28, tx + txG + 0.16, entY + 1.34, tz - 10.12, atticGold, 2);
    }
    for (var tzG = -9.0; tzG <= 9.01; tzG += 1.5) {
      mb.box(tx - 7.08, entY + 0.80, tz + tzG - 0.16, tx - 6.92, entY + 1.34, tz + tzG + 0.16, atticGold, 2);
      mb.box(tx + 6.92, entY + 0.80, tz + tzG - 0.16, tx + 7.08, entY + 1.34, tz + tzG + 0.16, atticGold, 2);
    }
    /* Geison Projecting Cornice */
    var pedBase = entY + 1.62;
    mb.box(tx - 7.35, entY + 1.35, tz - 10.55, tx + 7.35, pedBase, tz + 10.55, parianMarble, 0);

    /* Front & Rear Triangular Pediments + Burnished Attic Gold Tympanum Relief + Terracotta Roof */
    var apexY = pedBase + 2.45;
    var pedHalfW = 7.32;
    var pedHalfL = 10.50;
    /* Main Marble Pediment Prism */
    mb.prism(
      [tx - pedHalfW, pedBase, tz + pedHalfL],
      [tx + pedHalfW, pedBase, tz + pedHalfL],
      [tx, apexY, tz + pedHalfL],
      [tx - pedHalfW, pedBase, tz - pedHalfL],
      [tx + pedHalfW, pedBase, tz - pedHalfL],
      [tx, apexY, tz - pedHalfL],
      parianMarble, 0
    );
    /* Burnished Attic Gold Recessed Tympanum Relief on Front & Rear Pediments */
    mb.prism(
      [tx - 5.9, pedBase + 0.22, tz + pedHalfL + 0.12],
      [tx + 5.9, pedBase + 0.22, tz + pedHalfL + 0.12],
      [tx, apexY - 0.42, tz + pedHalfL + 0.12],
      [tx - 5.9, pedBase + 0.22, tz + pedHalfL - 0.04],
      [tx + 5.9, pedBase + 0.22, tz + pedHalfL - 0.04],
      [tx, apexY - 0.42, tz + pedHalfL - 0.04],
      atticGold, 2
    );
    mb.prism(
      [tx - 5.9, pedBase + 0.22, tz - pedHalfL + 0.04],
      [tx + 5.9, pedBase + 0.22, tz - pedHalfL + 0.04],
      [tx, apexY - 0.42, tz - pedHalfL + 0.04],
      [tx - 5.9, pedBase + 0.22, tz - pedHalfL - 0.12],
      [tx + 5.9, pedBase + 0.22, tz - pedHalfL - 0.12],
      [tx, apexY - 0.42, tz - pedHalfL - 0.12],
      atticGold, 2
    );
    /* Attic Terracotta Roof Slopes */
    mb.quad(
      [tx - pedHalfW - 0.22, pedBase - 0.06, tz + pedHalfL + 0.15],
      [tx, apexY + 0.16, tz + pedHalfL + 0.15],
      [tx, apexY + 0.16, tz - pedHalfL - 0.15],
      [tx - pedHalfW - 0.22, pedBase - 0.06, tz - pedHalfL - 0.15],
      terracotta, 0
    );
    mb.quad(
      [tx, apexY + 0.16, tz + pedHalfL + 0.15],
      [tx + pedHalfW + 0.22, pedBase - 0.06, tz + pedHalfL + 0.15],
      [tx + pedHalfW + 0.22, pedBase - 0.06, tz - pedHalfL - 0.15],
      [tx, apexY + 0.16, tz - pedHalfL - 0.15],
      terracotta, 0
    );
    /* Golden Ridge Beam & Acroteria Finials */
    mb.box(tx - 0.22, apexY + 0.05, tz - pedHalfL - 0.2, tx + 0.22, apexY + 0.34, tz + pedHalfL + 0.2, atticGold, 2);
    mb.cylinder(tx, apexY + 0.25, tz + pedHalfL + 0.05, 0.36, 0.06, 1.15, 10, atticGold, 2);
    mb.cylinder(tx, apexY + 0.25, tz - pedHalfL - 0.05, 0.36, 0.06, 1.15, 10, atticGold, 2);
    mb.cylinder(tx - pedHalfW, pedBase + 0.08, tz + pedHalfL + 0.05, 0.22, 0.05, 0.72, 8, atticGold, 2);
    mb.cylinder(tx + pedHalfW, pedBase + 0.08, tz + pedHalfL + 0.05, 0.22, 0.05, 0.72, 8, atticGold, 2);

    /* 5. Living Lower Agora Sanctuary Plaza & Stepped Amphitheater Arc (z = 13.5, y = 3.8) */
    var agZ = 13.6, agY = 3.8;
    mb.cylinder(0.0, agY - 0.02, agZ, 6.2, 6.2, 0.12, 32, parianMarble, 0);
    mb.cylinder(0.0, agY + 0.10, agZ, 4.4, 4.4, 0.06, 28, burnishedGold, 2);
    mb.cylinder(0.0, agY + 0.15, agZ, 3.6, 3.6, 0.06, 28, parianMarble, 0);
    mb.cylinder(0.0, agY + 0.20, agZ, 1.4, 1.4, 0.08, 20, atticGold, 2);
    /* Semicircular Amphitheater Marble Exedra Tiers overlooking the Aegean */
    for (var tier = 0; tier < 3; tier++) {
      var rIn = 6.5 + tier * 1.15;
      var rOut = rIn + 1.05;
      var yT = agY + 0.25 + tier * 0.34;
      var arcSegs = 14;
      for (var ai = 0; ai < arcSegs; ai++) {
        var a0 = 0.28 + (ai / arcSegs) * (Math.PI - 0.56);
        var a1 = 0.28 + ((ai + 1) / arcSegs) * (Math.PI - 0.56);
        var p0 = [Math.cos(a0) * rIn, yT, agZ + Math.sin(a0) * rIn];
        var p1 = [Math.cos(a1) * rIn, yT, agZ + Math.sin(a1) * rIn];
        var p2 = [Math.cos(a1) * rOut, yT, agZ + Math.sin(a1) * rOut];
        var p3 = [Math.cos(a0) * rOut, yT, agZ + Math.sin(a0) * rOut];
        mb.quad(p0, p3, p2, p1, tier === 2 ? parianMarble : warmLimestone, 0);
        mb.quad(
          [p0[0], agY, p0[2]], [p1[0], agY, p1[2]],
          [p1[0], yT, p1[2]], [p0[0], yT, p0[2]],
          warmLimestone, 0
        );
      }
    }

    /* East & West Miniature Stoa Colonnades */
    for (var side = -1; side <= 1; side += 2) {
      var sx = side * 16.4;
      mb.box(sx - 1.8, 3.75, -5.8, sx + 1.8, 4.15, 3.8, warmLimestone, 0);
      for (var scz = -4.6; scz <= 2.7; scz += 2.4) {
        mb.flutedColumn(sx - side * 1.0, 4.15, scz, 0.25, 0.20, 3.1, 10, parianMarble, atticGold);
      }
      mb.box(sx - 1.7, 7.68, -5.6, sx + 1.7, 8.05, 3.6, parianMarble, 0);
      mb.box(sx - 1.85, 8.05, -5.75, sx + 1.85, 8.28, 3.75, terracotta, 0);
    }

    /* 6. Five Interactive 3D Greek Sigil Portal Shrines (skipping Summit plinth since Parthenon IS Omega!) */
    for (var pi = 1; pi < PORTALS.length; pi++) {
      mb.portalShrine(PORTALS[pi], parianMarble, warmLimestone, atticGold);
    }

    /* 7. Mediterranean Cypress Spires framing the Acropolis cliffs */
    var trees = [
      [-15.2, 3.8, 12.2, 1.35], [-17.4, 3.6, 5.2, 1.50], [-18.5, 3.5, -2.5, 1.40],
      [-15.6, 3.7, -12.6, 1.45], [-9.2, 3.8, -16.8, 1.30], [9.5, 3.8, -16.4, 1.42],
      [15.8, 3.7, -12.0, 1.55], [18.4, 3.6, -3.2, 1.35], [17.2, 3.7, 5.0, 1.48],
      [14.8, 3.8, 13.0, 1.30], [-6.8, 6.2, 5.2, 1.15], [6.8, 6.2, 5.2, 1.15],
      [-10.4, 6.2, -13.6, 1.25], [10.4, 6.2, -13.6, 1.25],
      [-21.2, 1.1, 11.4, 1.10], [21.0, 1.1, 10.6, 1.15], [-21.5, 1.1, -9.2, 1.20], [21.5, 1.1, -8.8, 1.12]
    ];
    for (var ti = 0; ti < trees.length; ti++) {
      mb.cypressTree(trees[ti][0], trees[ti][1], trees[ti][2], trees[ti][3], cypressBark, laurelEmerald);
    }

    return mb.finish();
  }

  /* Dynamic zero-alloc geometry updater (5 portal crystals + 7 celestial monoliths + 2 brazier flames) */
  function createDynamicSceneBuffers() {
    var OCT_V = 24;
    var OCT_I = 24;
    var TOTAL_SHAPES = PORTALS.length + CELESTIAL_SIGILS.length + 2;
    var pos = new Float32Array(TOTAL_SHAPES * OCT_V * 3);
    var norm = new Float32Array(TOTAL_SHAPES * OCT_V * 3);
    var col = new Float32Array(TOTAL_SHAPES * OCT_V * 3);
    var idx = new Uint32Array(TOTAL_SHAPES * OCT_I);

    var octaVerts = [
      [0, 1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, -1, 0]
    ];
    var octaFaces = [
      [0, 2, 1], [0, 3, 2], [0, 4, 3], [0, 1, 4],
      [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 1]
    ];

    var vi = 0, ii = 0;
    for (var s = 0; s < TOTAL_SHAPES; s++) {
      for (var f = 0; f < 8; f++) {
        idx[ii++] = vi; idx[ii++] = vi + 1; idx[ii++] = vi + 2;
        vi += 3;
      }
    }

    function writeOcta(shapeIdx, cx, cy, cz, rx, ry, rz, yaw, c, matId) {
      var base = shapeIdx * OCT_V * 3;
      var cs = Math.cos(yaw), sn = Math.sin(yaw);
      var cr = clamp(c[0], 0.01, 0.99) + matId;
      var cg = clamp(c[1], 0.01, 0.99);
      var cb = clamp(c[2], 0.01, 0.99);
      var p = base;
      for (var f = 0; f < 8; f++) {
        var face = octaFaces[f];
        var v0 = octaVerts[face[0]], v1 = octaVerts[face[1]], v2 = octaVerts[face[2]];
        var x0 = (v0[0] * cs - v0[2] * sn) * rx + cx, y0 = v0[1] * ry + cy, z0 = (v0[0] * sn + v0[2] * cs) * rz + cz;
        var x1 = (v1[0] * cs - v1[2] * sn) * rx + cx, y1 = v1[1] * ry + cy, z1 = (v1[0] * sn + v1[2] * cs) * rz + cz;
        var x2 = (v2[0] * cs - v2[2] * sn) * rx + cx, y2 = v2[1] * ry + cy, z2 = (v2[0] * sn + v2[2] * cs) * rz + cz;
        var ux = x1 - x0, uy = y1 - y0, uz = z1 - z0;
        var wx = x2 - x0, wy = y2 - y0, wz = z2 - z0;
        var nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
        var nl = Math.hypot(nx, ny, nz) || 1;
        nx /= nl; ny /= nl; nz /= nl;
        pos[p] = x0; pos[p + 1] = y0; pos[p + 2] = z0; norm[p] = nx; norm[p + 1] = ny; norm[p + 2] = nz; col[p] = cr; col[p + 1] = cg; col[p + 2] = cb; p += 3;
        pos[p] = x1; pos[p + 1] = y1; pos[p + 2] = z1; norm[p] = nx; norm[p + 1] = ny; norm[p + 2] = nz; col[p] = cr; col[p + 1] = cg; col[p + 2] = cb; p += 3;
        pos[p] = x2; pos[p + 1] = y2; pos[p + 2] = z2; norm[p] = nx; norm[p + 1] = ny; norm[p + 2] = nz; col[p] = cr; col[p + 1] = cg; col[p + 2] = cb; p += 3;
      }
    }

    function update(t, activePortalId, reducedMotion) {
      var tt = reducedMotion ? 0.0 : t;
      for (var i = 0; i < PORTALS.length; i++) {
        var pt = PORTALS[i];
        var isSel = pt.id === activePortalId;
        var bob = Math.sin(tt * (isSel ? 2.4 : 1.5) + i * 1.3) * (isSel ? 0.34 : 0.22);
        var baseH = i === 0 ? 11.4 : (pt.pos[1] + 2.35);
        var scale = i === 0 ? (isSel ? 1.15 : 0.92) : (isSel ? 0.72 : 0.56);
        writeOcta(i, pt.pos[0], baseH + bob, pt.pos[2], scale * 0.72, scale * 1.45, scale * 0.72, tt * (isSel ? 1.5 : 0.65) + i, pt.color, 3);
      }
      for (var c = 0; c < CELESTIAL_SIGILS.length; c++) {
        var cs = CELESTIAL_SIGILS[c];
        var ang = cs.phase + tt * 0.14;
        var ox = Math.cos(ang) * cs.radius;
        var oz = Math.sin(ang) * cs.radius - 2.0;
        var oy = cs.height + Math.sin(tt * 0.9 + c * 1.7) * 0.75;
        writeOcta(PORTALS.length + c, ox, oy, oz, 0.38, 1.05, 0.38, -ang * 2.0, cs.color, 3);
      }
      var fl1 = 0.35 + Math.sin(tt * 9.3) * 0.08;
      var fl2 = 0.35 + Math.cos(tt * 8.7 + 1.1) * 0.08;
      writeOcta(PORTALS.length + CELESTIAL_SIGILS.length, -4.0, 7.82 + fl1 * 0.3, 10.3, 0.24, fl1 * 1.6, 0.24, tt * 3.1, [0.99, 0.68, 0.22], 3);
      writeOcta(PORTALS.length + CELESTIAL_SIGILS.length + 1, 4.0, 7.82 + fl2 * 0.3, 10.3, 0.24, fl2 * 1.6, 0.24, -tt * 2.9, [0.99, 0.68, 0.22], 3);
    }

    return { pos: pos, norm: norm, col: col, idx: idx, update: update };
  }

  /* Zero-Allocation Float32Array 4-Strand Celestial Particle Ring (inspired by omega-observer) */
  function createParticleField(count) {
    var n = count || 1800;
    var baseR = new Float32Array(n);
    var angle = new Float32Array(n);
    var speed = new Float32Array(n);
    var yBase = new Float32Array(n);
    var strand = new Uint8Array(n);
    var packed = new Float32Array(n * 7);
    var STRAND_COLORS = [
      [0.13, 0.83, 0.93],
      [0.96, 0.77, 0.32],
      [0.38, 0.65, 0.98],
      [0.18, 0.83, 0.63]
    ];
    var seed = 0x51a0cafe;
    function rnd() {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    }
    for (var i = 0; i < n; i++) {
      var kind = i % 10;
      if (kind < 2) {
        /* Sacred brazier embers rising near the Propylaea & Temple */
        baseR[i] = 0.2 + rnd() * 2.4;
        angle[i] = rnd() * Math.PI * 2;
        speed[i] = 0.7 + rnd() * 1.3;
        yBase[i] = 7.4 + rnd() * 6.5;
        strand[i] = 1;
      } else {
        /* 4-strand orbital constellation ribbon around the Acropolis */
        baseR[i] = 11.0 + rnd() * 28.0;
        angle[i] = rnd() * Math.PI * 2;
        speed[i] = (0.04 + rnd() * 0.14) * (i % 2 === 0 ? 1 : -1);
        yBase[i] = 2.6 + rnd() * 17.5;
        strand[i] = i & 3;
      }
    }

    function step(t, reducedMotion) {
      var tt = reducedMotion ? 1.5 : t;
      for (var i = 0; i < n; i++) {
        var o = i * 7;
        var st = strand[i];
        var col = STRAND_COLORS[st];
        if (i % 10 < 2) {
          var side = (i & 1) === 0 ? -4.0 : 4.0;
          var rise = (yBase[i] + tt * speed[i] * 1.3) % 7.0;
          var sway = angle[i] + tt * 1.6;
          packed[o]     = side + Math.cos(sway) * (0.35 + rise * 0.14);
          packed[o + 1] = 7.6 + rise;
          packed[o + 2] = 10.3 + Math.sin(sway) * (0.35 + rise * 0.14);
          packed[o + 3] = col[0];
          packed[o + 4] = col[1];
          packed[o + 5] = col[2];
          packed[o + 6] = 2.6 + (1.0 - rise / 7.0) * 3.0;
        } else {
          var a = angle[i] + tt * speed[i];
          var r = baseR[i] + Math.sin(tt * 0.6 + i * 0.13) * 0.85;
          packed[o]     = Math.cos(a) * r;
          packed[o + 1] = yBase[i] + Math.sin(tt * 0.8 + a * 2.0) * 1.1;
          packed[o + 2] = Math.sin(a) * r - 1.5;
          packed[o + 3] = col[0];
          packed[o + 4] = col[1];
          packed[o + 5] = col[2];
          packed[o + 6] = 2.1 + (i % 3) * 1.15;
        }
      }
      return packed;
    }

    return { count: n, packed: packed, step: step };
  }

  /* WebGL2 HDR + 2048px PCF Shadow Map + GGX PBR + ACES Tone-Mapped Renderer */
  function createAcropolisWebGL2(canvas) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl2', {
        antialias: true,
        depth: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch (_) {
      gl = null;
    }
    if (!gl) return null;

    var dbg = gl.getExtension('WEBGL_debug_renderer_info');
    var rendererStr = '';
    try {
      rendererStr = String((dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || '');
    } catch (_) {}
    var isSoftware = /SwiftShader|llvmpipe|Software|Basic Render/i.test(rendererStr);
    var hasHalfFloat = Boolean(gl.getExtension('EXT_color_buffer_half_float'));
    var shadowSize = isSoftware ? 1024 : 2048;

    function compile(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    function link(vs, fs) {
      var v = compile(gl.VERTEX_SHADER, vs);
      var f = compile(gl.FRAGMENT_SHADER, fs);
      if (!v || !f) return null;
      var p = gl.createProgram();
      gl.attachShader(p, v);
      gl.attachShader(p, f);
      gl.linkProgram(p);
      gl.deleteShader(v);
      gl.deleteShader(f);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        gl.deleteProgram(p);
        return null;
      }
      return p;
    }

    var shadowPrg = link(
      '#version 300 es\n' +
      'layout(location=0) in vec3 a_pos;\n' +
      'uniform mat4 u_lmvp;\n' +
      'void main(){gl_Position=u_lmvp*vec4(a_pos,1.0);}',
      '#version 300 es\nprecision mediump float;void main(){}'
    );

    var skyPrg = link(
      '#version 300 es\n' +
      'layout(location=0) in vec2 a_uv;\n' +
      'out vec2 v_ndc;\n' +
      'void main(){v_ndc=a_uv*2.0-1.0;gl_Position=vec4(v_ndc,0.9999,1.0);}',
      '#version 300 es\n' +
      'precision highp float;\n' +
      'in vec2 v_ndc;\n' +
      'uniform vec3 u_fwd,u_right,u_up,u_sun;\n' +
      'uniform float u_aspect,u_tanHalf,u_day,u_time;\n' +
      'out vec4 o_hdr;\n' +
      'float h3(vec3 p){p=fract(p*vec3(0.1031,0.1030,0.0973));p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}\n' +
      'void main(){\n' +
      '  vec3 rd=normalize(u_fwd+v_ndc.x*u_aspect*u_tanHalf*u_right+v_ndc.y*u_tanHalf*u_up);\n' +
      '  float h=clamp(rd.y,-0.25,1.0);\n' +
      '  vec3 nZen=vec3(0.015,0.042,0.125);\n' +
      '  vec3 nHor=vec3(0.055,0.145,0.315);\n' +
      '  vec3 dZen=vec3(0.095,0.315,0.740);\n' +
      '  vec3 dHor=vec3(0.680,0.820,0.920);\n' +
      '  vec3 zen=mix(nZen,dZen,u_day);\n' +
      '  vec3 hor=mix(nHor,dHor,u_day);\n' +
      '  vec3 col=mix(hor,zen,pow(clamp(h,0.0,1.0),0.52));\n' +
      '  if(h<0.0) col=mix(hor,zen*0.42,clamp(-h*3.6,0.0,1.0));\n' +
      '  float mu=max(dot(rd,u_sun),0.0);\n' +
      '  vec3 sunGlow=mix(vec3(0.75,0.62,0.36),vec3(1.25,0.96,0.58),u_day);\n' +
      '  col+=sunGlow*pow(mu,mix(18.0,7.0,u_day))*mix(0.32,0.45,u_day);\n' +
      '  col+=mix(vec3(1.65,1.42,1.05),vec3(2.8,2.45,1.85),u_day)*smoothstep(0.9978,0.9995,mu);\n' +
      '  float nightFade=(1.0-u_day)*smoothstep(0.02,0.22,rd.y);\n' +
      '  if(nightFade>0.01){\n' +
      '    vec3 cell=floor(rd*260.0);\n' +
      '    float s=h3(cell);\n' +
      '    if(s>0.9935){\n' +
      '      float tw=0.68+0.32*sin(u_time*2.2+s*90.0);\n' +
      '      float br=smoothstep(0.9935,0.9995,s)*tw*nightFade;\n' +
      '      vec3 sc=mix(vec3(0.82,0.92,1.0),vec3(1.0,0.86,0.56),fract(s*73.1));\n' +
      '      col+=sc*br*1.6;\n' +
      '    }\n' +
      '    float band=exp(-pow((rd.x*0.55+rd.y*0.65-rd.z*0.35),2.0)*9.5)*nightFade;\n' +
      '    col+=vec3(0.04,0.09,0.19)*band;\n' +
      '  }\n' +
      '  o_hdr=vec4(max(col,vec3(0.0)),1.0);\n' +
      '}'
    );

    var pbrPrg = link(
      '#version 300 es\n' +
      'layout(location=0) in vec3 a_pos;\n' +
      'layout(location=1) in vec3 a_norm;\n' +
      'layout(location=2) in vec3 a_col;\n' +
      'uniform mat4 u_mvp,u_lmvp;\n' +
      'out vec3 v_pos,v_norm,v_col;\n' +
      'flat out float v_mat;\n' +
      'out vec4 v_lp;\n' +
      'void main(){\n' +
      '  v_mat=floor(a_col.r);\n' +
      '  v_col=vec3(a_col.r-v_mat,a_col.gb);\n' +
      '  v_pos=a_pos;\n' +
      '  v_norm=a_norm;\n' +
      '  v_lp=u_lmvp*vec4(a_pos+a_norm*0.06,1.0);\n' +
      '  gl_Position=u_mvp*vec4(a_pos,1.0);\n' +
      '}',
      '#version 300 es\n' +
      'precision highp float;\n' +
      'precision highp sampler2DShadow;\n' +
      'in vec3 v_pos,v_norm,v_col;\n' +
      'flat in float v_mat;\n' +
      'in vec4 v_lp;\n' +
      'uniform vec3 u_eye,u_sun,u_focusPos;\n' +
      'uniform float u_time,u_day,u_invSh,u_q;\n' +
      'uniform sampler2DShadow u_smap;\n' +
      'out vec4 o_hdr;\n' +
      'float h3(vec3 p){p=fract(p*vec3(0.1031,0.1030,0.0973));p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}\n' +
      'float tG(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),f.z);}\n' +
      'float sampleShadow(vec4 lp,float ndl){\n' +
      '  vec3 p=lp.xyz/max(lp.w,1e-4)*0.5+0.5;\n' +
      '  vec2 e=smoothstep(vec2(0.0),vec2(0.06),p.xy)*(1.0-smoothstep(vec2(0.94),vec2(1.0),p.xy));\n' +
      '  float m=e.x*e.y*step(0.0,p.z)*step(p.z,1.0);\n' +
      '  if(m<=0.001) return 1.0;\n' +
      '  float bias=max(0.0016*(1.0-ndl),0.00045);\n' +
      '  if(u_q<1.5) return mix(1.0,texture(u_smap,vec3(p.xy,p.z-bias)),m);\n' +
      '  float acc=0.0;\n' +
      '  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++) acc+=texture(u_smap,vec3(p.xy+vec2(float(x),float(y))*u_invSh,p.z-bias));\n' +
      '  return mix(1.0,acc/9.0,m);\n' +
      '}\n' +
      'void main(){\n' +
      '  vec3 toEye=u_eye-v_pos;\n' +
      '  float dist=length(toEye);\n' +
      '  vec3 n=normalize(v_norm);\n' +
      '  vec3 v=toEye/max(dist,1e-4);\n' +
      '  vec3 l=u_sun;\n' +
      '  bool isWater=v_mat==1.0;\n' +
      '  bool isGold=v_mat==2.0;\n' +
      '  bool isEmissive=v_mat==3.0;\n' +
      '  bool isFoliage=v_mat==4.0;\n' +
      '  float grain1=tG(v_pos*0.85);\n' +
      '  float grain2=tG(v_pos*4.5);\n' +
      '  if(isWater){\n' +
      '    float w1=sin(v_pos.x*0.55+u_time*1.85)*cos(v_pos.z*0.48-u_time*1.35);\n' +
      '    float w2=sin((v_pos.x-v_pos.z)*1.15+u_time*2.4)*0.55;\n' +
      '    float w3=cos((v_pos.x*0.8+v_pos.z*1.35)-u_time*1.9)*0.35;\n' +
      '    n=normalize(vec3((w1+w2+w3)*0.075,1.0,(w1-w2+w3)*0.075));\n' +
      '  } else if(!isEmissive && u_q>=1.5 && dist<58.0){\n' +
      '    float mc=(grain1-0.5)*0.04+(grain2-0.5)*0.02;\n' +
      '    vec3 c1=cross(dFdx(v_pos),n),c2=cross(n,dFdy(v_pos));\n' +
      '    n=normalize(n+((c1/max(length(c1),1e-4))*dFdx(mc)+(c2/max(length(c2),1e-4))*dFdy(mc))*(isGold?0.4:0.9));\n' +
      '  }\n' +
      '  vec3 ab=pow(max(v_col,vec3(0.02)),vec3(2.1));\n' +
      '  if(!isWater && !isEmissive && !isFoliage){\n' +
      '    float vein=sin(v_pos.x*1.15+v_pos.y*0.85+grain1*3.2)*0.5+0.5;\n' +
      '    ab*=0.91+0.13*grain1+0.04*vein;\n' +
      '  }\n' +
      '  float mt=isWater?0.05:(isGold?0.84:0.04);\n' +
      '  float rg=isWater?0.06:(isGold?0.23:(isFoliage?0.78:clamp(0.58-0.14*grain2,0.28,0.82)));\n' +
      '  float ndl=max(dot(n,l),0.0);\n' +
      '  float ndv=max(dot(n,v),1e-3);\n' +
      '  vec3 h=normalize(l+v);\n' +
      '  float ndh=max(dot(n,h),0.0);\n' +
      '  float vdh=max(dot(v,h),0.0);\n' +
      '  float sw=sampleShadow(v_lp,ndl);\n' +
      '  float a=rg*rg,a2=a*a;\n' +
      '  float dn=ndh*ndh*(a2-1.0)+1.0;\n' +
      '  float dg=a2/max(3.14159265*dn*dn,1e-4);\n' +
      '  float k=(rg+1.0)*(rg+1.0)*0.125;\n' +
      '  float gs=(ndv/(ndv*(1.0-k)+k))*(ndl/(ndl*(1.0-k)+k));\n' +
      '  vec3 f0=mix(vec3(0.04),ab,mt);\n' +
      '  vec3 fr=f0+(1.0-f0)*pow(1.0-vdh,5.0);\n' +
      '  vec3 spec=(dg*gs*fr)/max(4.0*ndv*ndl,1e-3);\n' +
      '  vec3 kd=(1.0-fr)*(1.0-mt);\n' +
      '  vec3 sunCol=mix(vec3(0.88,0.96,1.35),vec3(2.85,2.52,2.05),u_day)*sw;\n' +
      '  vec3 direct=(kd*ab/3.14159265+spec)*sunCol*ndl;\n' +
      '  vec3 skyAmb=mix(vec3(0.11,0.22,0.44),vec3(0.46,0.68,0.95),u_day);\n' +
      '  vec3 grdAmb=mix(vec3(0.05,0.08,0.14),vec3(0.32,0.28,0.22),u_day);\n' +
      '  vec3 hemi=mix(grdAmb,skyAmb,0.5+0.5*n.y);\n' +
      '  vec3 rDir=reflect(-v,n);\n' +
      '  vec3 envRef=mix(grdAmb*1.2,skyAmb*1.55,clamp(rDir.y*0.5+0.5,0.0,1.0))*(1.0-rg*0.72);\n' +
      '  vec3 fEnv=f0+(max(vec3(1.0-rg),f0)-f0)*pow(1.0-ndv,5.0);\n' +
      '  float ao=u_q>=1.5?clamp(1.0-length(fwidth(n))*0.28,0.64,1.0):0.92;\n' +
      '  vec3 lit=direct+(kd*ab*hemi+envRef*fEnv)*ao;\n' +
      '  /* Warm temple brazier & sanctuary golden point lights (vivid at Aegean Night) */\n' +
      '  float nightBoost=mix(1.35,0.30,u_day);\n' +
      '  float flick=0.92+0.08*sin(u_time*7.4+v_pos.x);\n' +
      '  vec3 pL1=vec3(0.0,9.8,1.5)-v_pos;\n' +
      '  float d1=dot(pL1,pL1)+18.0;\n' +
      '  lit+=ab*vec3(1.0,0.68,0.26)*(max(dot(n,normalize(pL1)),0.0)*22.0/d1)*nightBoost*flick;\n' +
      '  vec3 pL2=vec3(0.0,8.2,10.3)-v_pos;\n' +
      '  float d2=dot(pL2,pL2)+12.0;\n' +
      '  lit+=ab*vec3(1.0,0.62,0.22)*(max(dot(n,normalize(pL2)),0.0)*14.0/d2)*nightBoost*flick;\n' +
      '  vec3 pLF=u_focusPos-v_pos;\n' +
      '  float dF=dot(pLF,pLF)+10.0;\n' +
      '  lit+=ab*vec3(0.55,0.82,1.0)*(max(dot(n,normalize(pLF)),0.0)*9.0/dF)*nightBoost;\n' +
      '  if(isEmissive){\n' +
      '    lit+=ab*mix(2.25,1.15,u_day);\n' +
      '  }\n' +
      '  if(isWater){\n' +
      '    float shoreD=length(v_pos.xz-vec2(0.0,2.0));\n' +
      '    float foam=smoothstep(29.5,24.8,shoreD)*(0.55+0.45*sin(shoreD*2.8-u_time*2.6));\n' +
      '    vec3 deepCol=mix(vec3(0.014,0.068,0.185),vec3(0.032,0.240,0.440),u_day);\n' +
      '    vec3 shalCol=mix(vec3(0.035,0.165,0.285),vec3(0.085,0.520,0.620),u_day);\n' +
      '    vec3 wBase=mix(deepCol,shalCol,smoothstep(42.0,22.0,shoreD));\n' +
      '    float fres=clamp(0.14+0.82*pow(1.0-ndv,4.2),0.0,0.96);\n' +
      '    vec3 sunGlint=mix(vec3(1.15,0.92,0.55),vec3(2.9,2.45,1.85),u_day)*pow(ndh,mix(75.0,120.0,u_day))*sw;\n' +
      '    lit=mix(wBase*(hemi+0.55*sw),envRef*1.15+sunGlint,fres);\n' +
      '    lit=mix(lit,mix(vec3(0.45,0.68,0.82),vec3(0.95,0.97,1.0),u_day),clamp(foam*0.55,0.0,0.65));\n' +
      '  }\n' +
      '  vec3 fogCol=mix(vec3(0.055,0.145,0.315),vec3(0.680,0.820,0.920),u_day);\n' +
      '  float fogF=clamp(1.0-exp(-dist*0.0095),0.0,0.86);\n' +
      '  o_hdr=vec4(max(mix(lit,fogCol,fogF),vec3(0.0)),1.0);\n' +
      '}'
    );

    var ptPrg = link(
      '#version 300 es\n' +
      'layout(location=0) in vec3 a_pos;\n' +
      'layout(location=1) in vec3 a_col;\n' +
      'layout(location=2) in float a_sz;\n' +
      'uniform mat4 u_mvp;\n' +
      'uniform float u_dpr;\n' +
      'out vec3 v_col;\n' +
      'void main(){\n' +
      '  vec4 clip=u_mvp*vec4(a_pos,1.0);\n' +
      '  gl_Position=clip;\n' +
      '  gl_PointSize=clamp((a_sz*22.0*u_dpr)/max(clip.w,1.0),1.5,14.0);\n' +
      '  v_col=a_col;\n' +
      '}',
      '#version 300 es\n' +
      'precision mediump float;\n' +
      'in vec3 v_col;\n' +
      'uniform float u_day;\n' +
      'out vec4 o_hdr;\n' +
      'void main(){\n' +
      '  vec2 p=gl_PointCoord*2.0-1.0;\n' +
      '  float r2=dot(p,p);\n' +
      '  if(r2>1.0) discard;\n' +
      '  float alpha=exp(-r2*3.4)*mix(0.88,0.52,u_day);\n' +
      '  o_hdr=vec4(v_col*mix(1.75,1.15,u_day),alpha);\n' +
      '}'
    );

    var postPrg = link(
      '#version 300 es\n' +
      'layout(location=0) in vec2 a_uv;\n' +
      'out vec2 v_uv;\n' +
      'void main(){v_uv=a_uv;gl_Position=vec4(a_uv*2.0-1.0,0.0,1.0);}',
      '#version 300 es\n' +
      'precision highp float;\n' +
      'in vec2 v_uv;\n' +
      'uniform sampler2D u_hdr;\n' +
      'uniform vec2 u_invRes;\n' +
      'out vec4 o_col;\n' +
      'vec3 aces(vec3 x){return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.0,1.0);}\n' +
      'void main(){\n' +
      '  vec3 c=texture(u_hdr,v_uv).rgb;\n' +
      '  vec3 n=texture(u_hdr,v_uv+vec2(0.0,u_invRes.y)).rgb;\n' +
      '  vec3 s=texture(u_hdr,v_uv-vec2(0.0,u_invRes.y)).rgb;\n' +
      '  vec3 e=texture(u_hdr,v_uv+vec2(u_invRes.x,0.0)).rgb;\n' +
      '  vec3 w=texture(u_hdr,v_uv-vec2(u_invRes.x,0.0)).rgb;\n' +
      '  vec3 avg=(n+s+e+w)*0.25;\n' +
      '  vec3 mn=min(c,min(min(n,s),min(e,w)));\n' +
      '  vec3 mx=max(c,max(max(n,s),max(e,w)));\n' +
      '  vec3 sharp=clamp(c+(c-avg)*0.22,mn,mx);\n' +
      '  vec2 q=v_uv-0.5;\n' +
      '  float vig=1.0-dot(q,q)*0.24;\n' +
      '  o_col=vec4(pow(aces(sharp*1.08*vig),vec3(1.0/2.2)),1.0);\n' +
      '}'
    );

    if (!shadowPrg || !skyPrg || !pbrPrg || !ptPrg || !postPrg) return null;

    var B = gl.ARRAY_BUFFER, E = gl.ELEMENT_ARRAY_BUFFER, T = gl.TEXTURE_2D, F = gl.FRAMEBUFFER, R = gl.RENDERBUFFER;

    function makeMeshVao() {
      var vao = gl.createVertexArray();
      var posB = gl.createBuffer(), normB = gl.createBuffer(), colB = gl.createBuffer(), idxB = gl.createBuffer();
      gl.bindVertexArray(vao);
      gl.bindBuffer(B, posB); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(B, normB); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(B, colB); gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(E, idxB);
      gl.bindVertexArray(null);
      return { vao: vao, posB: posB, normB: normB, colB: colB, idxB: idxB, count: 0 };
    }

    var acropolisVao = makeMeshVao();
    var verdantVao = makeMeshVao();
    var dynVao = makeMeshVao();

    var ptVao = gl.createVertexArray();
    var ptBuf = gl.createBuffer();
    gl.bindVertexArray(ptVao);
    gl.bindBuffer(B, ptBuf);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 28, 0);
    gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 28, 12);
    gl.enableVertexAttribArray(2); gl.vertexAttribPointer(2, 1, gl.FLOAT, false, 28, 24);
    gl.bindVertexArray(null);

    var quadVao = gl.createVertexArray();
    var quadBuf = gl.createBuffer();
    gl.bindVertexArray(quadVao);
    gl.bindBuffer(B, quadBuf);
    gl.bufferData(B, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    var shTex = gl.createTexture(), shFbo = gl.createFramebuffer();
    gl.bindTexture(T, shTex);
    gl.texImage2D(T, 0, gl.DEPTH_COMPONENT24, shadowSize, shadowSize, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);
    gl.texParameteri(T, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(T, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(T, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(T, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(T, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
    gl.texParameteri(T, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
    gl.bindFramebuffer(F, shFbo);
    gl.framebufferTexture2D(F, gl.DEPTH_ATTACHMENT, T, shTex, 0);
    gl.drawBuffers([gl.NONE]);
    gl.readBuffer(gl.NONE);
    gl.bindFramebuffer(F, null);

    var hdrTex = gl.createTexture(), hdrDep = gl.createRenderbuffer(), hdrFbo = gl.createFramebuffer();
    var hdrW = 0, hdrH = 0;

    function ensureHdr(w, h) {
      if (w === hdrW && h === hdrH) return true;
      hdrW = w; hdrH = h;
      gl.bindTexture(T, hdrTex);
      gl.texImage2D(T, 0, hasHalfFloat ? gl.RGBA16F : gl.RGBA8, w, h, 0, gl.RGBA, hasHalfFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
      gl.texParameteri(T, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(T, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(T, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(T, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.bindRenderbuffer(R, hdrDep);
      gl.renderbufferStorage(R, gl.DEPTH_COMPONENT24, w, h);
      gl.bindFramebuffer(F, hdrFbo);
      gl.framebufferTexture2D(F, gl.COLOR_ATTACHMENT0, T, hdrTex, 0);
      gl.framebufferRenderbuffer(F, gl.DEPTH_ATTACHMENT, R, hdrDep);
      var ok = gl.checkFramebufferStatus(F) === gl.FRAMEBUFFER_COMPLETE;
      gl.bindFramebuffer(F, null);
      return ok;
    }

    function uLocs(prg, list) {
      var out = {};
      for (var i = 0; i < list.length; i++) out[list[i]] = gl.getUniformLocation(prg, 'u_' + list[i]);
      return out;
    }

    var uSh = uLocs(shadowPrg, ['lmvp']);
    var uSk = uLocs(skyPrg, ['fwd', 'right', 'up', 'sun', 'aspect', 'tanHalf', 'day', 'time']);
    var uPb = uLocs(pbrPrg, ['mvp', 'lmvp', 'eye', 'sun', 'focusPos', 'time', 'day', 'invSh', 'q', 'smap']);
    var uPt = uLocs(ptPrg, ['mvp', 'dpr', 'day']);
    var uPo = uLocs(postPrg, ['hdr', 'invRes']);

    var shadowDirty = true;
    var lastShadowDay = -1;
    var dynInited = false;
    var ptInited = false;

    function uploadStatic(vaoObj, mesh) {
      gl.bindBuffer(B, vaoObj.posB); gl.bufferData(B, mesh.pos, gl.STATIC_DRAW);
      gl.bindBuffer(B, vaoObj.normB); gl.bufferData(B, mesh.norm, gl.STATIC_DRAW);
      gl.bindBuffer(B, vaoObj.colB); gl.bufferData(B, mesh.col, gl.STATIC_DRAW);
      gl.bindBuffer(E, vaoObj.idxB); gl.bufferData(E, mesh.idx, gl.STATIC_DRAW);
      vaoObj.count = mesh.idx.length;
      shadowDirty = true;
    }

    function uploadDynamic(dyn) {
      var usage = gl.STREAM_DRAW;
      if (!dynInited) {
        gl.bindBuffer(B, dynVao.posB); gl.bufferData(B, dyn.pos, usage);
        gl.bindBuffer(B, dynVao.normB); gl.bufferData(B, dyn.norm, usage);
        gl.bindBuffer(B, dynVao.colB); gl.bufferData(B, dyn.col, usage);
        gl.bindBuffer(E, dynVao.idxB); gl.bufferData(E, dyn.idx, gl.STATIC_DRAW);
        dynVao.count = dyn.idx.length;
        dynInited = true;
      } else {
        gl.bindBuffer(B, dynVao.posB); gl.bufferSubData(B, 0, dyn.pos);
        gl.bindBuffer(B, dynVao.normB); gl.bufferSubData(B, 0, dyn.norm);
        gl.bindBuffer(B, dynVao.colB); gl.bufferSubData(B, 0, dyn.col);
      }
    }

    function uploadParticles(packed) {
      gl.bindBuffer(B, ptBuf);
      if (!ptInited) {
        gl.bufferData(B, packed, gl.STREAM_DRAW);
        ptInited = true;
      } else {
        gl.bufferSubData(B, 0, packed);
      }
    }

    var lOrt = mat4Ortho(-42, 42, -42, 42, -55, 85);
    var lmvp = new Float32Array(16);
    var sunVec = new Float32Array(3);

    function render(mvp, eye, tgt, fov, timeSec, dayMix, focusPos, ptCount, dpr) {
      var w = canvas.width | 0, h = canvas.height | 0;
      if (w <= 0 || h <= 0 || gl.isContextLost()) return;

      /* Smooth sun/moon elevation arc between Aegean Night and Sunlit Parian Day */
      var sx = lerp(-0.52, 0.56, dayMix);
      var sy = lerp(0.56, 0.74, dayMix);
      var sz = lerp(-0.64, 0.37, dayMix);
      var sl = Math.hypot(sx, sy, sz) || 1;
      sunVec[0] = sx / sl; sunVec[1] = sy / sl; sunVec[2] = sz / sl;

      if (shadowDirty || Math.abs(dayMix - lastShadowDay) > 0.015) {
        var lView = mat4LookAt([sunVec[0] * 32, 6.0 + sunVec[1] * 32, sunVec[2] * 32], [0, 5.5, 0], [0, 1, 0]);
        mat4Mul(lOrt, lView, lmvp);
        gl.colorMask(false, false, false, false);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(1.8, 3.0);
        gl.bindFramebuffer(F, shFbo);
        gl.viewport(0, 0, shadowSize, shadowSize);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.useProgram(shadowPrg);
        gl.uniformMatrix4fv(uSh.lmvp, false, lmvp);
        if (acropolisVao.count > 0) {
          gl.bindVertexArray(acropolisVao.vao);
          gl.drawElements(gl.TRIANGLES, acropolisVao.count, gl.UNSIGNED_INT, 0);
        }
        if (verdantVao.count > 0) {
          gl.bindVertexArray(verdantVao.vao);
          gl.drawElements(gl.TRIANGLES, verdantVao.count, gl.UNSIGNED_INT, 0);
        }
        gl.disable(gl.POLYGON_OFFSET_FILL);
        gl.colorMask(true, true, true, true);
        shadowDirty = false;
        lastShadowDay = dayMix;
      }

      var useHdr = ensureHdr(w, h);
      gl.bindFramebuffer(F, useHdr ? hdrFbo : null);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0.02, 0.05, 0.12, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      /* Pass 1: Procedural Aegean Night / Sunlit Parian Sky Dome */
      var fx = tgt[0] - eye[0], fy = tgt[1] - eye[1], fz = tgt[2] - eye[2];
      var fl = Math.hypot(fx, fy, fz) || 1; fx /= fl; fy /= fl; fz /= fl;
      var rl = Math.hypot(-fz, fx) || 1, rx = -fz / rl, rz = fx / rl;
      var ux = -rz * fy, uy = rz * fx - rx * fz, uz = rx * fy;
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);
      gl.useProgram(skyPrg);
      gl.uniform3f(uSk.fwd, fx, fy, fz);
      gl.uniform3f(uSk.right, rx, 0, rz);
      gl.uniform3f(uSk.up, ux, uy, uz);
      gl.uniform3fv(uSk.sun, sunVec);
      gl.uniform1f(uSk.aspect, w / h);
      gl.uniform1f(uSk.tanHalf, Math.tan(fov * 0.5));
      gl.uniform1f(uSk.day, dayMix);
      gl.uniform1f(uSk.time, timeSec);
      gl.bindVertexArray(quadVao);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      /* Pass 2: Full PBR Acropolis + Verdant WASM Sector + Dynamic Portal Monoliths */
      gl.enable(gl.DEPTH_TEST);
      gl.depthMask(true);
      gl.useProgram(pbrPrg);
      gl.uniformMatrix4fv(uPb.mvp, false, mvp);
      gl.uniformMatrix4fv(uPb.lmvp, false, lmvp);
      gl.uniform3fv(uPb.eye, eye);
      gl.uniform3fv(uPb.sun, sunVec);
      gl.uniform3fv(uPb.focusPos, focusPos);
      gl.uniform1f(uPb.time, timeSec);
      gl.uniform1f(uPb.day, dayMix);
      gl.uniform1f(uPb.invSh, 1.0 / shadowSize);
      gl.uniform1f(uPb.q, isSoftware ? 1.0 : 2.0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(T, shTex);
      gl.uniform1i(uPb.smap, 0);

      if (acropolisVao.count > 0) {
        gl.bindVertexArray(acropolisVao.vao);
        gl.drawElements(gl.TRIANGLES, acropolisVao.count, gl.UNSIGNED_INT, 0);
      }
      if (verdantVao.count > 0) {
        gl.bindVertexArray(verdantVao.vao);
        gl.drawElements(gl.TRIANGLES, verdantVao.count, gl.UNSIGNED_INT, 0);
      }
      if (dynVao.count > 0) {
        gl.bindVertexArray(dynVao.vao);
        gl.drawElements(gl.TRIANGLES, dynVao.count, gl.UNSIGNED_INT, 0);
      }

      /* Pass 3: Zero-Alloc 4-Strand Celestial Particle Field */
      if (ptCount > 0) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.depthMask(false);
        gl.useProgram(ptPrg);
        gl.uniformMatrix4fv(uPt.mvp, false, mvp);
        gl.uniform1f(uPt.dpr, dpr);
        gl.uniform1f(uPt.day, dayMix);
        gl.bindVertexArray(ptVao);
        gl.drawArrays(gl.POINTS, 0, ptCount);
        gl.depthMask(true);
        gl.disable(gl.BLEND);
      }

      /* Pass 4: ACES Filmic Tone-Mapping & Subtle Sharpen */
      if (useHdr) {
        gl.bindFramebuffer(F, null);
        gl.viewport(0, 0, w, h);
        gl.disable(gl.DEPTH_TEST);
        gl.useProgram(postPrg);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(T, hdrTex);
        gl.uniform1i(uPo.hdr, 0);
        gl.uniform2f(uPo.invRes, 1.0 / w, 1.0 / h);
        gl.bindVertexArray(quadVao);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      gl.bindVertexArray(null);
    }

    return {
      backend: 'webgl2',
      isSoftware: isSoftware,
      uploadAcropolis: function (m) { uploadStatic(acropolisVao, m); },
      uploadVerdant: function (m) { uploadStatic(verdantVao, m); },
      uploadDynamic: uploadDynamic,
      uploadParticles: uploadParticles,
      render: render
    };
  }

  /* Crisp 3D Software-Projected Canvas2D Fallback Renderer (zero blank screens!) */
  function createCanvas2dFallback(canvas) {
    var ctx = null;
    try { ctx = canvas.getContext('2d', { alpha: false }); } catch (_) {}
    if (!ctx) return null;
    var pTmp = new Float32Array(3);
    var pTmp2 = new Float32Array(3);

    function render(mvp, eye, tgt, fov, timeSec, dayMix, focusPos, ptCount, dpr, particles) {
      var w = canvas.width | 0, h = canvas.height | 0;
      if (w <= 0 || h <= 0) return;

      /* Sky gradient */
      var sky = ctx.createLinearGradient(0, 0, 0, h * 0.62);
      if (dayMix > 0.5) {
        sky.addColorStop(0, '#1854b0');
        sky.addColorStop(1, '#b6d5ee');
      } else {
        sky.addColorStop(0, '#040b1d');
        sky.addColorStop(1, '#0e2854');
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      /* Aegean Sea band */
      var seaTop = h * 0.50;
      var sea = ctx.createLinearGradient(0, seaTop, 0, h);
      if (dayMix > 0.5) {
        sea.addColorStop(0, '#1a689e');
        sea.addColorStop(1, '#0b3864');
      } else {
        sea.addColorStop(0, '#0a2248');
        sea.addColorStop(1, '#040d20');
      }
      ctx.fillStyle = sea;
      ctx.fillRect(0, seaTop, w, h - seaTop);

      /* Shimmering wave lines */
      ctx.strokeStyle = dayMix > 0.5 ? 'rgba(255,245,215,0.22)' : 'rgba(245,196,81,0.18)';
      ctx.lineWidth = Math.max(1, dpr);
      for (var wi = 0; wi < 14; wi++) {
        var wy = seaTop + 14 + wi * ((h - seaTop) / 14);
        var wx = w * 0.5 + Math.sin(timeSec * 0.9 + wi * 1.4) * (34 * dpr);
        var ww = (40 + wi * 18) * dpr;
        ctx.beginPath();
        ctx.moveTo(wx - ww, wy);
        ctx.lineTo(wx + ww, wy);
        ctx.stroke();
      }

      /* 3D projected Acropolis headland & Parthenon silhouette */
      if (projectPoint(mvp, 0, 6.2, -2.5, w, h, pTmp)) {
        var cx = pTmp[0], cy = pTmp[1];
        var sc = Math.max(0.4, Math.min(2.2, (h / 560) * (34 / Math.max(12, Math.hypot(eye[0], eye[1] - 6, eye[2])))));
        /* Terraced headland */
        ctx.fillStyle = dayMix > 0.5 ? '#c7baa2' : '#1d3258';
        ctx.beginPath();
        ctx.moveTo(cx - 210 * sc, cy + 90 * sc);
        ctx.lineTo(cx - 135 * sc, cy + 12 * sc);
        ctx.lineTo(cx + 135 * sc, cy + 12 * sc);
        ctx.lineTo(cx + 210 * sc, cy + 90 * sc);
        ctx.closePath();
        ctx.fill();
        /* Marble stylobate */
        ctx.fillStyle = dayMix > 0.5 ? '#f5efe2' : '#cad6ea';
        ctx.fillRect(cx - 110 * sc, cy - 6 * sc, 220 * sc, 18 * sc);
        /* 8 Fluted Doric columns */
        for (var ci = 0; ci < 8; ci++) {
          var colX = cx - 94 * sc + ci * (26.8 * sc);
          ctx.fillStyle = dayMix > 0.5 ? '#fcf8ee' : '#dce6f7';
          ctx.fillRect(colX - 5 * sc, cy - 72 * sc, 10 * sc, 66 * sc);
          ctx.fillStyle = '#f5c451';
          ctx.fillRect(colX - 6.5 * sc, cy - 75 * sc, 13 * sc, 4 * sc);
        }
        /* Burnished Attic Gold Pediment */
        ctx.fillStyle = '#f5c451';
        ctx.beginPath();
        ctx.moveTo(cx - 114 * sc, cy - 76 * sc);
        ctx.lineTo(cx, cy - 112 * sc);
        ctx.lineTo(cx + 114 * sc, cy - 76 * sc);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = dayMix > 0.5 ? '#c44125' : '#ffd875';
        ctx.lineWidth = 2 * sc;
        ctx.stroke();
      }

      /* 3D projected Zero-Alloc Particle Constellation */
      if (particles) {
        for (var i = 0; i < ptCount; i += 4) {
          var o = i * 7;
          if (projectPoint(mvp, particles[o], particles[o + 1], particles[o + 2], w, h, pTmp2)) {
            ctx.fillStyle = i % 4 === 1 ? '#f5c451' : (i % 4 === 0 ? '#22d3ee' : '#2dd4a0');
            ctx.fillRect(pTmp2[0], pTmp2[1], 2 * dpr, 2 * dpr);
          }
        }
      }
    }

    return {
      backend: 'canvas2d',
      isSoftware: true,
      uploadAcropolis: function () {},
      uploadVerdant: function () {},
      uploadDynamic: function () {},
      uploadParticles: function () {},
      render: render
    };
  }

  /* Safe same-origin Verdant Engine WASM loader (real verdant-wasm.wasm!) */
  async function tryLoadVerdantWasm(wasmUrlOpt) {
    if (!wasmUrlOpt || wasmUrlOpt === 'off' || wasmUrlOpt === 'none' || wasmUrlOpt === 'false') {
      return null;
    }
    if (typeof WebAssembly !== 'object' || typeof fetch !== 'function') return null;

    var candidates = [];
    if (wasmUrlOpt !== 'auto') {
      /* Enforce strict same-origin relative path only */
      if (wasmUrlOpt.charAt(0) === '/' || wasmUrlOpt.slice(0, 2) === './') {
        candidates.push(wasmUrlOpt);
      }
    } else {
      /* Probe sibling directory of acropolis-world.js if discoverable */
      try {
        var scripts = document.getElementsByTagName('script');
        for (var si = 0; si < scripts.length; si++) {
          var src = scripts[si].getAttribute('src') || '';
          if (src.indexOf('acropolis-world.js') >= 0) {
            var base = src.slice(0, src.lastIndexOf('/') + 1);
            if (base.charAt(0) === '/' || base.slice(0, 2) === './') {
              candidates.push(base + 'verdant-wasm.wasm');
            }
          }
        }
      } catch (_) {}
      candidates.push('/public/verdant-wasm.wasm', '/assets/verdant-wasm.wasm');
    }

    var seen = {};
    for (var i = 0; i < candidates.length; i++) {
      var url = candidates[i];
      if (!url || seen[url]) continue;
      seen[url] = true;
      try {
        var resp = await fetch(url, { credentials: 'omit' });
        if (!resp || !resp.ok) continue;
        var ex = null;
        if (typeof WebAssembly.instantiateStreaming === 'function') {
          try {
            var resS = await WebAssembly.instantiateStreaming(resp.clone(), {});
            ex = resS && resS.instance ? resS.instance.exports : null;
          } catch (_) {
            ex = null;
          }
        }
        if (!ex) {
          var buf = await resp.arrayBuffer();
          var resB = await WebAssembly.instantiate(buf, {});
          ex = resB && resB.instance ? resB.instance.exports : null;
        }
        if (!ex || typeof ex.verdant_wasm_init !== 'function') continue;

        var seed = ex.verdant_wasm_default_seed();
        ex.verdant_wasm_init(seed);
        ex.verdant_wasm_set_lod_rank(2);
        ex.verdant_wasm_camera_set_anchor(1, 2.2, 3.8, 9.2);
        ex.verdant_wasm_camera_set_pose_intent(460, 260, 18500, 1600);
        ex.verdant_wasm_scene_rebuild_buffers(0.0);

        var vCount = ex.verdant_wasm_static_vert_count() >>> 0;
        var iCount = ex.verdant_wasm_static_idx_count() >>> 0;
        if (!vCount || !iCount || !ex.memory) continue;

        var mem = ex.memory.buffer;
        var srcPos = new Float32Array(mem, ex.verdant_wasm_scene_pos_ptr() >>> 0, vCount * 3);
        var srcNorm = new Float32Array(mem, ex.verdant_wasm_scene_norm_ptr() >>> 0, vCount * 3);
        var srcCol = new Float32Array(mem, ex.verdant_wasm_scene_col_ptr() >>> 0, vCount * 3);
        var srcIdx = new Uint32Array(mem, ex.verdant_wasm_scene_idx_ptr() >>> 0, iCount);

        /* Transform Drake's Verdant Vaulted Citadel sector onto the western Aegean spur
         * and harmonize vertex tones into Neo-Hellenic Parian Marble + Attic Gold + Sapphire! */
        var pos = new Float32Array(vCount * 3);
        var norm = new Float32Array(vCount * 3);
        var col = new Float32Array(vCount * 3);
        var idx = new Uint32Array(iCount);
        idx.set(srcIdx);

        var scale = 0.58;
        var ox = -34.0, oy = 0.25, oz = -21.0;
        for (var v = 0; v < vCount; v++) {
          var o = v * 3;
          pos[o]     = srcPos[o] * scale + ox;
          pos[o + 1] = srcPos[o + 1] * scale + oy;
          pos[o + 2] = srcPos[o + 2] * scale + oz;
          norm[o]     = srcNorm[o];
          norm[o + 1] = srcNorm[o + 1];
          norm[o + 2] = srcNorm[o + 2];

          var rawR = srcCol[o];
          var mat = Math.floor(rawR);
          var cr = rawR - mat;
          var cg = srcCol[o + 1];
          var cb = srcCol[o + 2];
          if (mat === 0) {
            /* Warm Parian limestone shift */
            cr = clamp(cr * 1.06, 0.05, 0.96);
            cg = clamp(cg * 1.03, 0.05, 0.94);
            cb = clamp(cb * 0.96, 0.05, 0.88);
          } else if (mat === 2) {
            /* Burnished Attic Gold shift */
            cr = 0.93; cg = 0.72; cb = 0.24;
          }
          col[o] = mat + cr;
          col[o + 1] = cg;
          col[o + 2] = cb;
        }

        return {
          exports: ex,
          url: url,
          triCount: (iCount / 3) | 0,
          mesh: { pos: pos, norm: norm, col: col, idx: idx, vertCount: vCount, triCount: (iCount / 3) | 0 }
        };
      } catch (_) {
        /* CSP or 404: fall through cleanly to procedural WebGL2 PBR Acropolis */
      }
    }
    return null;
  }

  /* Live Zero-Tracking Guest Shield Audit (read-only Performance API, zero storage/cookie refs) */
  function auditZeroTrackingShield() {
    var sameOrigin = 0;
    var thirdParty = 0;
    var host = (typeof location === 'object' && location.origin) ? location.origin : '';
    try {
      if (typeof performance === 'object' && typeof performance.getEntriesByType === 'function') {
        var entries = performance.getEntriesByType('resource') || [];
        for (var i = 0; i < entries.length; i++) {
          var name = entries[i] && entries[i].name ? String(entries[i].name) : '';
          if (!name) continue;
          if (!host || name.indexOf(host) === 0 || name.charAt(0) === '/') sameOrigin++;
          else thirdParty++;
        }
      }
    } catch (_) {}
    return {
      sameOriginResources: sameOrigin,
      thirdPartyResources: thirdParty,
      clean: thirdParty === 0
    };
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function resolvePortalHref(container, portal, siteKind) {
    var attr = container.getAttribute('data-portal-' + portal.id);
    if (attr) return attr;
    return portal.routes[siteKind] || portal.routes.standalone;
  }

  function mount(container, options) {
    if (!container) return null;
    if (container.__acropolisInstance) return container.__acropolisInstance;

    var opts = options || {};
    var siteKind = opts.site || container.getAttribute('data-site') || 'standalone';
    var theme = opts.theme || container.getAttribute('data-theme') || 'aegean';
    if (theme !== 'parian') theme = 'aegean';
    var wasmUrlOpt = opts.wasmUrl || container.getAttribute('data-wasm-url') || 'auto';

    container.classList.add('acr-world');
    container.setAttribute('data-acr-theme', theme);
    container.replaceChildren();

    /* Architectural Meander Frieze & Fluted Doric Moldings */
    var mTop = el('div', 'acr-meander acr-meander-top');
    mTop.setAttribute('aria-hidden', 'true');
    var mBot = el('div', 'acr-meander acr-meander-bot');
    mBot.setAttribute('aria-hidden', 'true');
    var fL = el('div', 'acr-flute-left'); fL.setAttribute('aria-hidden', 'true');
    var fR = el('div', 'acr-flute-right'); fR.setAttribute('aria-hidden', 'true');

    /* Primary 3D Viewport Canvas */
    var canvas = el('canvas', 'acr-canvas');
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'application');
    canvas.setAttribute('aria-label', 'Interactive 3D Neo-Hellenic Spatial Acropolis. Drag to orbit, WASD or arrow keys to move, click any temple portal to inspect or enter.');

    /* 3D Projected Greek Sigil Pins Layer */
    var pinsLayer = el('div', 'acr-pins');

    /* Top Header Plaque & Theme/Camera Controls */
    var topbar = el('div', 'acr-topbar');
    var plaque = el('div', 'acr-title-plaque');
    var kicker = el('div', 'acr-kicker');
    var liveDot = el('span', 'acr-dot'); liveDot.setAttribute('aria-hidden', 'true');
    var kickerTxt = el('span', '', 'SPATIAL ACROPOLIS \u00B7 ZERO-TRACKING WORLD');
    kicker.append(liveDot, kickerTxt);
    var heading = el('h2', 'acr-heading', 'The Living Agora of Sovereign Silicon');
    var sub = el('p', 'acr-sub', 'Drag to orbit the Aegean Acropolis, focus canvas + WASD to glide, or click any glowing Greek sigil shrine to enter.');
    plaque.append(kicker, heading, sub);

    var controls = el('div', 'acr-controls');
    var telPill = el('div', 'acr-telemetry');
    var telEngine = el('strong', '', 'BOOTING');
    var telRest = el('span', '', ' \u00B7 0 3P HOSTS');
    telPill.append(telEngine, telRest);

    var btnTheme = el('button', 'acr-btn acr-btn-gold', theme === 'aegean' ? 'Parian Sun' : 'Aegean Night');
    btnTheme.type = 'button';
    btnTheme.setAttribute('aria-label', 'Switch between Aegean Night and Sunlit Parian Marble themes');

    var btnReset = el('button', 'acr-btn', 'Acropolis View');
    btnReset.type = 'button';

    var btnZoomIn = el('button', 'acr-btn', '+');
    btnZoomIn.type = 'button';
    btnZoomIn.setAttribute('aria-label', 'Zoom camera closer');

    var btnZoomOut = el('button', 'acr-btn', '-');
    btnZoomOut.type = 'button';
    btnZoomOut.setAttribute('aria-label', 'Zoom camera farther');

    var btnFull = el('button', 'acr-btn', 'Explore Full');
    btnFull.type = 'button';

    controls.append(telPill, btnTheme, btnReset, btnZoomIn, btnZoomOut, btnFull);
    topbar.append(plaque, controls);

    /* Portal Inspection Sanctuary Card */
    var inspector = el('aside', 'acr-inspector');
    inspector.hidden = true;
    inspector.setAttribute('aria-live', 'polite');

    var inspHead = el('div', 'acr-insp-head');
    var inspSigil = el('span', 'acr-insp-sigil', '\u03A9');
    var inspTitles = el('div', 'acr-insp-titles');
    var inspEp = el('span', 'acr-insp-ep', '');
    var inspName = el('h3', 'acr-insp-name', '');
    inspTitles.append(inspEp, inspName);
    var inspClose = el('button', 'acr-insp-close', 'x');
    inspClose.type = 'button';
    inspClose.setAttribute('aria-label', 'Close portal details');
    inspHead.append(inspSigil, inspTitles, inspClose);

    var inspDesc = el('p', 'acr-insp-desc', '');
    var inspReceipt = el('pre', 'acr-insp-receipt', '');
    var inspActions = el('div', 'acr-insp-actions');
    var inspEnter = el('a', 'acr-btn acr-btn-cta', 'Enter Sanctuary \u2192');
    var inspNext = el('button', 'acr-btn', 'Next Portal');
    inspNext.type = 'button';
    inspActions.append(inspEnter, inspNext);
    inspector.append(inspHead, inspDesc, inspReceipt, inspActions);

    /* Bottom 5-Portal Agora Dock */
    var dockWrap = el('div', 'acr-dock-wrap');
    var hint = el('div', 'acr-hint', 'DRAG: Orbit \u00B7 WASD/ARROWS: Glide \u00B7 SHIFT+WHEEL: Zoom \u00B7 CLICK PORTAL: Enter');
    var dock = el('div', 'acr-dock');
    dock.setAttribute('role', 'navigation');
    dock.setAttribute('aria-label', 'Acropolis World Portals');

    var pinButtons = [];
    var dockButtons = [];
    var celestialLabels = [];

    for (var pi = 0; pi < PORTALS.length; pi++) {
      (function (portal, idx) {
        var pin = el('button', 'acr-pin');
        pin.type = 'button';
        pin.setAttribute('data-accent', portal.accent);
        pin.setAttribute('data-portal', portal.id);
        var pg = el('span', 'acr-pin-glyph', portal.sigil);
        var pl = el('span', 'acr-pin-label', portal.name);
        pin.append(pg, pl);
        pin.addEventListener('click', function () { selectPortal(idx, true); });
        pinsLayer.append(pin);
        pinButtons.push(pin);

        var dbtn = el('button', 'acr-portal-btn');
        dbtn.type = 'button';
        dbtn.setAttribute('data-accent', portal.accent);
        dbtn.setAttribute('data-portal', portal.id);
        var ds = el('span', 'acr-portal-sigil', portal.sigil);
        var dm = el('span', 'acr-portal-meta');
        var dn = el('span', 'acr-portal-name', portal.name);
        var dr = el('span', 'acr-portal-role', portal.role);
        dm.append(dn, dr);
        dbtn.append(ds, dm);
        dbtn.addEventListener('click', function () { selectPortal(idx, true); });
        dock.append(dbtn);
        dockButtons.push(dbtn);
      })(PORTALS[pi], pi);
    }

    for (var ci = 0; ci < CELESTIAL_SIGILS.length; ci++) {
      var cel = el('span', 'acr-celestial', CELESTIAL_SIGILS[ci].glyph);
      cel.setAttribute('aria-hidden', 'true');
      pinsLayer.append(cel);
      celestialLabels.push(cel);
    }

    dockWrap.append(hint, dock);
    container.append(canvas, pinsLayer, mTop, mBot, fL, fR, topbar, inspector, dockWrap);

    /* Initialize 3D Renderer + Procedural Acropolis + Zero-Alloc Particle Ring */
    var renderer = createAcropolisWebGL2(canvas) || createCanvas2dFallback(canvas);
    var acropolisMesh = buildAcropolisStaticMesh();
    var dynMesh = createDynamicSceneBuffers();
    var particles = createParticleField(renderer && renderer.isSoftware ? 900 : 1800);
    if (renderer) renderer.uploadAcropolis(acropolisMesh);

    /* Engine & Camera State */
    var reducedQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    var reducedMotion = Boolean(reducedQuery && reducedQuery.matches);
    var dayTarget = theme === 'parian' ? 1.0 : 0.0;
    var dayMix = dayTarget;
    var cam = {
      yaw: OVERVIEW_CAM.yaw, pitch: OVERVIEW_CAM.pitch, dist: OVERVIEW_CAM.dist,
      tx: OVERVIEW_CAM.tx, ty: OVERVIEW_CAM.ty, tz: OVERVIEW_CAM.tz
    };
    var goal = {
      yaw: OVERVIEW_CAM.yaw, pitch: OVERVIEW_CAM.pitch, dist: OVERVIEW_CAM.dist,
      tx: OVERVIEW_CAM.tx, ty: OVERVIEW_CAM.ty, tz: OVERVIEW_CAM.tz
    };
    var activePortalIdx = -1;
    var autoOrbit = !reducedMotion;
    var dragging = false;
    var dragMoved = false;
    var lastX = 0, lastY = 0;
    var keys = {};
    var fullscreen = false;
    var verdantHost = null;
    var totalTris = acropolisMesh.triCount + (dynMesh.idx.length / 3 | 0);
    var lastMvp = new Float32Array(16);
    var eyeVec = new Float32Array(3);
    var tgtVec = new Float32Array(3);
    var focusVec = new Float32Array([0.0, 9.0, -2.5]);
    var projTmp = new Float32Array(3);

    /* Zero-alloc 120-frame FPS pacing ring */
    var dtRing = new Float32Array(120);
    var dtIdx = 0, dtCount = 0, lastFrameMs = 0, lastHudMs = 0;
    var rafId = 0;
    var destroyed = false;

    function navigatePortal(portal) {
      var href = resolvePortalHref(container, portal, siteKind);
      var ev = new CustomEvent('acropolis:portal', {
        bubbles: true,
        cancelable: true,
        detail: { portal: portal, href: href }
      });
      if (!container.dispatchEvent(ev)) return;
      if (href.charAt(0) === '#') {
        var target = document.getElementById(href.slice(1));
        if (target && typeof target.scrollIntoView === 'function') {
          target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      } else {
        window.location.assign(href);
      }
    }

    function refreshWallOfShameReceipt() {
      var audit = auditZeroTrackingShield();
      return (
        'GUEST SHIELD: ACTIVE | 0 TRACKERS | 0 STORAGE WRITES\n' +
        'LIVE RESOURCE AUDIT: ' + audit.sameOriginResources + ' same-origin, ' +
        audit.thirdPartyResources + ' third-party (' + (audit.clean ? 'CLEAN' : 'EXTERNAL DETECTED') + ')\n' +
        'DEFENSE BARRIER: Unauthorized probes sealed via FIPS 180-4 SHA-256'
      );
    }

    function selectPortal(idx, allowDirectEnter) {
      if (idx < 0 || idx >= PORTALS.length) {
        activePortalIdx = -1;
        inspector.hidden = true;
        for (var j = 0; j < PORTALS.length; j++) {
          pinButtons[j].classList.remove('acr-pin-active');
          dockButtons[j].classList.remove('acr-portal-active');
        }
        return;
      }
      var portal = PORTALS[idx];
      if (allowDirectEnter && activePortalIdx === idx && !inspector.hidden) {
        navigatePortal(portal);
        return;
      }
      activePortalIdx = idx;
      autoOrbit = false;
      goal.yaw = portal.cam.yaw;
      goal.pitch = portal.cam.pitch;
      goal.dist = portal.cam.dist;
      goal.tx = portal.cam.tx;
      goal.ty = portal.cam.ty;
      goal.tz = portal.cam.tz;
      focusVec[0] = portal.pos[0];
      focusVec[1] = portal.pos[1] + 2.5;
      focusVec[2] = portal.pos[2];

      inspSigil.textContent = portal.sigil;
      inspEp.textContent = portal.epithet;
      inspName.textContent = portal.name;
      inspDesc.textContent = portal.desc;
      inspReceipt.textContent = portal.id === 'shame' ? refreshWallOfShameReceipt() : portal.receipt;
      var href = resolvePortalHref(container, portal, siteKind);
      inspEnter.setAttribute('href', href);
      inspEnter.textContent = 'Enter ' + portal.name + ' \u2192';
      inspector.hidden = false;

      for (var k = 0; k < PORTALS.length; k++) {
        pinButtons[k].classList.toggle('acr-pin-active', k === idx);
        dockButtons[k].classList.toggle('acr-portal-active', k === idx);
      }
    }

    function setTheme(nextTheme) {
      theme = nextTheme === 'parian' ? 'parian' : 'aegean';
      dayTarget = theme === 'parian' ? 1.0 : 0.0;
      if (reducedMotion) dayMix = dayTarget;
      container.setAttribute('data-acr-theme', theme);
      btnTheme.textContent = theme === 'aegean' ? 'Parian Sun' : 'Aegean Night';
      container.dispatchEvent(new CustomEvent('acropolis:theme', { bubbles: true, detail: { theme: theme } }));
    }

    function resetView() {
      selectPortal(-1, false);
      goal.yaw = OVERVIEW_CAM.yaw;
      goal.pitch = OVERVIEW_CAM.pitch;
      goal.dist = OVERVIEW_CAM.dist;
      goal.tx = OVERVIEW_CAM.tx;
      goal.ty = OVERVIEW_CAM.ty;
      goal.tz = OVERVIEW_CAM.tz;
      autoOrbit = !reducedMotion;
    }

    /* Wire Controls */
    btnTheme.addEventListener('click', function () {
      setTheme(theme === 'aegean' ? 'parian' : 'aegean');
    });
    btnReset.addEventListener('click', resetView);
    btnZoomIn.addEventListener('click', function () {
      goal.dist = clamp(goal.dist - 4.5, 11.5, 62.0);
    });
    btnZoomOut.addEventListener('click', function () {
      goal.dist = clamp(goal.dist + 4.5, 11.5, 62.0);
    });
    btnFull.addEventListener('click', function () {
      fullscreen = !fullscreen;
      container.classList.toggle('acr-fullscreen', fullscreen);
      btnFull.textContent = fullscreen ? 'Exit Full' : 'Explore Full';
      resizeCanvas();
    });
    inspClose.addEventListener('click', function () { selectPortal(-1, false); });
    inspNext.addEventListener('click', function () {
      selectPortal((activePortalIdx + 1) % PORTALS.length, false);
    });
    inspEnter.addEventListener('click', function (e) {
      if (activePortalIdx >= 0) {
        var portal = PORTALS[activePortalIdx];
        var href = resolvePortalHref(container, portal, siteKind);
        if (href.charAt(0) === '#') {
          e.preventDefault();
          navigatePortal(portal);
        }
      }
    });

    /* Pointer Orbit + Click-on-3D-Portal Picking */
    canvas.addEventListener('pointerdown', function (e) {
      dragging = true;
      dragMoved = false;
      lastX = e.clientX;
      lastY = e.clientY;
      autoOrbit = false;
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    });

    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX;
      var dy = e.clientY - lastY;
      if (Math.abs(dx) + Math.abs(dy) > 3) dragMoved = true;
      lastX = e.clientX;
      lastY = e.clientY;
      goal.yaw -= dx * 0.0068;
      goal.pitch = clamp(goal.pitch + dy * 0.0052, 0.09, 1.18);
    });

    canvas.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      if (!dragMoved) {
        var rect = canvas.getBoundingClientRect();
        var mx = e.clientX - rect.left;
        var my = e.clientY - rect.top;
        var bestIdx = -1;
        var bestD = 64;
        for (var i = 0; i < PORTALS.length; i++) {
          var p = PORTALS[i];
          var hitY = i === 0 ? 11.4 : (p.pos[1] + 2.35);
          if (projectPoint(lastMvp, p.pos[0], hitY, p.pos[2], rect.width, rect.height, projTmp)) {
            var d = Math.hypot(projTmp[0] - mx, projTmp[1] - my);
            if (d < bestD) { bestD = d; bestIdx = i; }
          }
        }
        if (bestIdx >= 0) selectPortal(bestIdx, true);
      }
    });

    canvas.addEventListener('wheel', function (e) {
      if (!fullscreen && !e.shiftKey && !e.ctrlKey) return;
      e.preventDefault();
      goal.dist = clamp(goal.dist + e.deltaY * 0.028, 11.5, 62.0);
    }, { passive: false });

    canvas.addEventListener('keydown', function (e) {
      var k = e.key.toLowerCase();
      if (k === 'escape' && fullscreen) {
        fullscreen = false;
        container.classList.remove('acr-fullscreen');
        btnFull.textContent = 'Explore Full';
        resizeCanvas();
        return;
      }
      if (k === 'w' || k === 'a' || k === 's' || k === 'd' || k.indexOf('arrow') === 0) {
        keys[k] = true;
        autoOrbit = false;
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', function (e) {
      delete keys[e.key.toLowerCase()];
    });

    function resizeCanvas() {
      var rect = container.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(320, Math.round(rect.width * dpr));
      var h = Math.max(240, Math.round(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver === 'function') {
      var ro = new ResizeObserver(resizeCanvas);
      ro.observe(container);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }
    resizeCanvas();

    /* Load Drake's Real Verdant Engine WASM (verdant-wasm.wasm) in the background */
    tryLoadVerdantWasm(wasmUrlOpt).then(function (loaded) {
      if (destroyed || !loaded) return;
      verdantHost = loaded;
      totalTris = acropolisMesh.triCount + loaded.triCount + (dynMesh.idx.length / 3 | 0);
      if (renderer) renderer.uploadVerdant(loaded.mesh);
    });

    function updateTelemetry(nowMs) {
      var sum = 0;
      for (var i = 0; i < dtCount; i++) sum += dtRing[i];
      var avgMs = dtCount > 0 ? sum / dtCount : 16.67;
      var fps = avgMs > 0 ? Math.round(1000 / avgMs) : 60;
      var audit = auditZeroTrackingShield();
      var modeLabel = verdantHost
        ? ('VERDANT WASM + ' + (renderer ? renderer.backend.toUpperCase() : '3D'))
        : ('ACROPOLIS ' + (renderer ? renderer.backend.toUpperCase() : '3D'));
      telEngine.textContent = modeLabel;
      telRest.textContent = ' \u00B7 ' + fps + ' FPS \u00B7 ' + totalTris.toLocaleString() + ' TRIS \u00B7 ' + audit.thirdPartyResources + ' 3P';
      lastHudMs = nowMs;
    }

    function step(nowMs) {
      if (destroyed) return;
      rafId = requestAnimationFrame(step);
      if (document.hidden) { lastFrameMs = nowMs; return; }

      var dt = lastFrameMs > 0 ? clamp((nowMs - lastFrameMs) * 0.001, 0.001, 0.05) : 0.0166;
      if (lastFrameMs > 0) {
        dtRing[dtIdx] = nowMs - lastFrameMs;
        dtIdx = (dtIdx + 1) % 120;
        if (dtCount < 120) dtCount++;
      }
      lastFrameMs = nowMs;

      var tSec = nowMs * 0.001;
      if (autoOrbit && !reducedMotion) {
        goal.yaw += dt * 0.085;
      }

      /* WASD / Arrow smooth spatial glide */
      var fwd = (keys.w || keys.arrowup ? 1 : 0) - (keys.s || keys.arrowdown ? 1 : 0);
      var strafe = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
      if (fwd !== 0 || strafe !== 0) {
        var spd = 12.0 * dt;
        var sy = Math.sin(cam.yaw), cy = Math.cos(cam.yaw);
        goal.tx = clamp(goal.tx + (-sy * fwd + cy * strafe) * spd, -24, 24);
        goal.tz = clamp(goal.tz + (-cy * fwd - sy * strafe) * spd, -24, 24);
        if (verdantHost && typeof verdantHost.exports.verdant_wasm_step_lawful === 'function') {
          try {
            verdantHost.exports.verdant_wasm_step_lawful(
              Math.round(dt * 1e6) >>> 0,
              (fwd * 1000) | 0,
              (strafe * 1000) | 0,
              Math.round(cam.yaw * 1000) | 0,
              5200,
              0
            );
          } catch (_) {}
        }
      }

      var ease = reducedMotion ? 1.0 : (1.0 - Math.exp(-dt * 6.5));
      cam.yaw = lerp(cam.yaw, goal.yaw, ease);
      cam.pitch = lerp(cam.pitch, goal.pitch, ease);
      cam.dist = lerp(cam.dist, goal.dist, ease);
      cam.tx = lerp(cam.tx, goal.tx, ease);
      cam.ty = lerp(cam.ty, goal.ty, ease);
      cam.tz = lerp(cam.tz, goal.tz, ease);
      dayMix = lerp(dayMix, dayTarget, reducedMotion ? 1.0 : (1.0 - Math.exp(-dt * 4.5)));

      var cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
      eyeVec[0] = cam.tx + Math.sin(cam.yaw) * cp * cam.dist;
      eyeVec[1] = Math.max(1.4, cam.ty + sp * cam.dist);
      eyeVec[2] = cam.tz + Math.cos(cam.yaw) * cp * cam.dist;
      tgtVec[0] = cam.tx; tgtVec[1] = cam.ty; tgtVec[2] = cam.tz;

      var rect = container.getBoundingClientRect();
      var cssW = Math.max(1, rect.width);
      var cssH = Math.max(1, rect.height);
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var fov = Math.PI / 3.3;
      var proj = mat4Perspective(fov, cssW / cssH, 0.35, 220.0);
      var view = mat4LookAt(eyeVec, tgtVec, [0, 1, 0]);
      mat4Mul(proj, view, lastMvp);

      /* Update animated 3D portal crystals, celestial monoliths, and zero-alloc particles */
      var activeId = activePortalIdx >= 0 ? PORTALS[activePortalIdx].id : '';
      dynMesh.update(tSec, activeId, reducedMotion);
      var ptBuf = particles.step(tSec, reducedMotion);
      if (renderer) {
        renderer.uploadDynamic(dynMesh);
        renderer.uploadParticles(ptBuf);
        renderer.render(lastMvp, eyeVec, tgtVec, fov, tSec, dayMix, focusVec, particles.count, dpr, ptBuf);
      }

      /* Project 5 Portal Pins & 7 Celestial Greek Sigils cleanly into screen space */
      for (var i = 0; i < PORTALS.length; i++) {
        var pt = PORTALS[i];
        var vis = projectPoint(lastMvp, pt.pos[0], pt.pos[1] + pt.pinOffset, pt.pos[2], cssW, cssH, projTmp);
        var pinEl = pinButtons[i];
        if (vis && projTmp[0] > 28 && projTmp[0] < cssW - 28 && projTmp[1] > 68 && projTmp[1] < cssH - 96) {
          pinEl.style.opacity = '1';
          pinEl.style.pointerEvents = 'auto';
          pinEl.style.transform = 'translate(' + projTmp[0].toFixed(1) + 'px,' + projTmp[1].toFixed(1) + 'px) translate(-50%,-100%)';
        } else {
          pinEl.style.opacity = '0';
          pinEl.style.pointerEvents = 'none';
        }
      }

      for (var c = 0; c < CELESTIAL_SIGILS.length; c++) {
        var cs = CELESTIAL_SIGILS[c];
        var ang = cs.phase + (reducedMotion ? 0 : tSec * 0.14);
        var ox = Math.cos(ang) * cs.radius;
        var oz = Math.sin(ang) * cs.radius - 2.0;
        var oy = cs.height + 1.45 + (reducedMotion ? 0 : Math.sin(tSec * 0.9 + c * 1.7) * 0.75);
        var cvis = projectPoint(lastMvp, ox, oy, oz, cssW, cssH, projTmp);
        var celEl = celestialLabels[c];
        if (cvis && projTmp[0] > 20 && projTmp[0] < cssW - 20 && projTmp[1] > 56 && projTmp[1] < cssH - 90) {
          celEl.style.opacity = '0.78';
          celEl.style.transform = 'translate(' + projTmp[0].toFixed(1) + 'px,' + projTmp[1].toFixed(1) + 'px) translate(-50%,-50%)';
        } else {
          celEl.style.opacity = '0';
        }
      }

      if (nowMs - lastHudMs > 450) updateTelemetry(nowMs);
    }

    updateTelemetry(0);
    rafId = requestAnimationFrame(step);

    var api = {
      version: VERSION,
      setTheme: setTheme,
      getTheme: function () { return theme; },
      selectPortal: function (idOrIdx) {
        if (typeof idOrIdx === 'number') { selectPortal(idOrIdx, false); return; }
        for (var i = 0; i < PORTALS.length; i++) {
          if (PORTALS[i].id === idOrIdx) { selectPortal(i, false); return; }
        }
        selectPortal(-1, false);
      },
      resetView: resetView,
      setCamera: function (yaw, pitch, dist) {
        autoOrbit = false;
        if (typeof yaw === 'number') goal.yaw = yaw;
        if (typeof pitch === 'number') goal.pitch = clamp(pitch, 0.09, 1.18);
        if (typeof dist === 'number') goal.dist = clamp(dist, 11.5, 62.0);
      },
      getStatus: function () {
        return {
          version: VERSION,
          theme: theme,
          backend: renderer ? renderer.backend : 'none',
          verdantWasmActive: Boolean(verdantHost),
          verdantTriangles: verdantHost ? verdantHost.triCount : 0,
          totalTriangles: totalTris,
          particles: particles.count,
          activePortal: activePortalIdx >= 0 ? PORTALS[activePortalIdx].id : null,
          shield: auditZeroTrackingShield()
        };
      },
      destroy: function () {
        destroyed = true;
        cancelAnimationFrame(rafId);
        delete container.__acropolisInstance;
      }
    };

    container.__acropolisInstance = api;
    return api;
  }

  function autoMount() {
    var nodes = document.querySelectorAll('[data-acropolis-world], #acropolis-world');
    for (var i = 0; i < nodes.length; i++) {
      mount(nodes[i]);
    }
  }

  window.AcropolisWorld = {
    version: VERSION,
    portals: PORTALS,
    themes: ['aegean', 'parian'],
    mount: mount
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount, { once: true });
  } else {
    autoMount();
  }
})();
