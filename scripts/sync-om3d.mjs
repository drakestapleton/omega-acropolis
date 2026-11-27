import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const om3dPath = path.join(root, 'dist/astral-cosmos.om3d');
const jsPath = path.join(root, 'dist/acropolis-world.js');

const om3d = fs.readFileSync(om3dPath);
const fileSha = crypto.createHash('sha256').update(om3d).digest('hex');
const paySha = crypto.createHash('sha256').update(om3d.subarray(64)).digest('hex');
const hdrSha = Buffer.from(om3d.subarray(32, 64)).toString('hex');
if (hdrSha !== paySha) {
  throw new Error(`OM3D embedded header SHA mismatch: header=${hdrSha} payload=${paySha}`);
}

const b64 = om3d.toString('base64');
let js = fs.readFileSync(jsPath, 'utf8');
const begin = '  /* OM3D_META_BEGIN */';
const end = '  /* OM3D_META_END */';
const i0 = js.indexOf(begin);
const i1 = js.indexOf(end);
if (i0 < 0 || i1 <= i0) throw new Error('Missing OM3D_META markers in dist/acropolis-world.js');

const block = `${begin}
  var OM3D_FILE_SHA256 = '${fileSha}';
  var OM3D_PAYLOAD_SHA256 = '${paySha}';
  var OM3D_B64 = '${b64}';
${end}`;

js = js.slice(0, i0) + block + js.slice(i1 + end.length);
fs.writeFileSync(jsPath, js, 'utf8');
console.log(`SYNC_OM3D_OK om3d=${om3d.length}B b64=${b64.length}B js=${js.length}B sha=${fileSha}`);
