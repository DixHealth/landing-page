/* eslint-disable @typescript-eslint/no-unused-vars */
// OMNIX (a IA da DIX) — modelo 3D "Cruz da saúde", o mesmo dos vídeos e do provador (artefato OMNIX 3D).
// Mantido o mais próximo possível do original; mudanças para o site estão marcadas com [site].
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const MINT = 0x1fe1a7, TEAL = 0x0b2e38, MID = 0x2e6e73, LIGHT = 0xa5dcd6, DEEP = 0x17b585;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const eq = t => 1 - (1 - t) ** 4, ec = t => 1 - (1 - t) ** 3, eio = t => 0.5 - 0.5 * Math.cos(Math.PI * t);
const lerp = (a, b, t) => a + (b - a) * t;
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const rngOf = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

const E = (x, y, len, ang, w, p = 1, c = 1) => ({ x, y, len, ang, w, p, c, bt: 0, bl: 0 });
export const EX = {
  neutral: [E(-0.27, -0.06, 0.23, 90, 0.22), E(0.27, -0.06, 0.23, 90, 0.22)],
  surprised: [E(-0.33, 0.04, 0.04, 88, 0.44), E(0.33, 0.04, 0.05, 95, 0.44)],
  excited: [E(-0.2, 0.21, 0.15, 78, 0.41), E(0.46, 0.2, 0.2, 102, 0.37)],
  happy: [E(-0.22, -0.09, 0.1, 13, 0.18, 0), E(0.37, -0.09, 0.08, 167, 0.18, 0)],
  laughing: [E(-0.22, -0.24, 0.2, 14, 0.14, 0), E(0.4, -0.25, 0.17, 163, 0.15, 0)],
  angry: [E(-0.28, -0.17, 0.17, 30, 0.17), E(0.31, -0.16, 0.16, 152, 0.17)],
  sad: [E(-0.21, 0.22, 0.18, 63, 0.23), E(0.34, 0.22, 0.19, 117, 0.22)],
  scared: [E(-0.31, 0.29, 0.18, 83, 0.4), E(0.4, 0.27, 0.19, 94, 0.4)],
  suspicious: [E(-0.03, -0.02, 0.17, 85, 0.23), E(0.5, -0.07, 0.04, 179, 0.15, 0, 0)],
  confused: [E(-0.5, -0.1, 0.25, 83, 0.2), E(0.05, -0.03, 0.11, 22, 0.19)],
  curious: [E(0.03, 0.2, 0.21, 71, 0.26), E(0.57, 0.07, 0.19, 75, 0.19)],
  proud: [E(-0.19, -0.3, 0.14, 11, 0.16, 0), E(0.39, -0.3, 0.12, 170, 0.16, 0)],
  shy: [E(-0.61, 0.3, 0.16, 74, 0.15), E(-0.18, 0.23, 0.12, 74, 0.19)],
  unimpressed: [E(-0.58, -0.04, 0.12, 2, 0.13, 0, 0), E(-0.06, -0.03, 0.18, 2, 0.13, 0, 0)],
  sleepy: [E(-0.25, 0.13, 0.04, 27, 0.21, 0, -1), E(0.31, 0.1, 0.03, 25, 0.21, 0, -1)]
};
// sobrancelhas (detalhe opcional): por olho [inclinação em graus (+ = ponta de dentro para baixo), elevação]
const BROW = { neutral: [0, 0], surprised: [-8, 0.07], excited: [-10, 0.05], happy: [-6, 0.03], laughing: [-6, 0.02], angry: [24, -0.03], sad: [-22, 0.02], scared: [-18, 0.07],
  suspicious: [[14, -0.03], [0, 0]], confused: [[-15, 0.05], [12, -0.02]], curious: [[-10, 0.06], [0, 0.01]], proud: [-4, 0.02], shy: [-14, 0.03], unimpressed: [6, -0.02], sleepy: [0, -0.01] };
for (const k in BROW) { const b = BROW[k], pr = Array.isArray(b[0]) ? b : [b, b]; EX[k].forEach((e, i) => { e.bt = pr[i][0]; e.bl = pr[i][1]; }); }
const MSG_EYES = [E(0.0, -0.06, 0.22, 60, 0.19), E(0.42, -0.16, 0.28, 60, 0.13)];
const near = (a, b) => { let d = ((b - a) % 180 + 180) % 180; if (d > 90) d -= 180; return a + d; };
const A0 = { s: 1, ey: 1, dots: 0, float: 0, ring: 0, badge: 0, check: 0, think: 0, bars: 0, pulse: 0, alert: 0, hop: 0, party: 0, bell: 0, plane: 0, cal: 0, zzz: 0, lens: 0 };
export const ACT = {
  none: [{}], digitando: [{ s: 0.22, ey: 0, dots: 1 }], carregando: [{ s: 0.16, ey: 0, float: 1 }], chamada: [{ ring: 1 }],
  mensagem: [{ badge: 1 }, MSG_EYES], sucesso: [{ check: 1, hop: 1 }], pensando: [{ think: 1 }], ouvindo: [{ bars: 1 }],
  batimento: [{ pulse: 1 }], alerta: [{ alert: 1 }], comemorando: [{ party: 1, hop: 1 }], lembrete: [{ bell: 1 }],
  enviando: [{ plane: 1 }], agendado: [{ cal: 1 }], dormindo: [{ zzz: 1 }, EX.sleepy], procurando: [{ lens: 1 }],
  // extras do vídeo (não existem no artefato): flutuar sem encolher, pular sem confete
  flutuando: [{ float: 0.35 }], pulinho: [{ hop: 1 }]
};

function roundedPoly(pts, r) { const s = new THREE.Shape(); const n = pts.length; const P = i => pts[(i + n) % n];
  const cut = (a, b, d) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy); return [a[0] + dx / l * Math.min(d, l / 2.05), a[1] + dy / l * Math.min(d, l / 2.05)]; };
  for (let i = 0; i < n; i++) { const a = cut(P(i), P(i - 1), r), b = cut(P(i), P(i + 1), r); if (i === 0) s.moveTo(a[0], a[1]); else s.lineTo(a[0], a[1]); s.quadraticCurveTo(P(i)[0], P(i)[1], b[0], b[1]); }
  s.closePath(); return s; }
function extrude(shape, depth, bev, size, seg = 12, center = true) { const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: bev, bevelSize: size, bevelSegments: seg, curveSegments: 32 }); if (center) g.center(); g.computeVertexNormals(); return g; }
const sq = s => [[-s, -s], [s, -s], [s, s], [-s, s]];

// estilos de olho para escolha: sc = cor do olho, emi = brilho próprio, pup = tamanho da pupila, oval = pupila com o formato do olho,
// iris = íris menta-teal, hl = nº de brilhos, hlEye = brilhos no próprio olho (olho de tinta), glow = pupila luminosa
export const EYE_STYLES = {
  original: { sc: 0xffffff, emi: 0.18 },
  pupila: { sc: 0xffffff, emi: 0.18, pup: 0.74, hl: 1 },
  pequena: { sc: 0xffffff, emi: 0.18, pup: 0.5, hl: 2 },
  oval: { sc: 0xffffff, emi: 0.18, pup: 0.66, oval: true, hl: 2 },
  iris: { sc: 0xffffff, emi: 0.18, iris: 0.84, pup: 0.4, hl: 2 },
  tinta: { sc: 0x0e2a33, emi: 0, hl: 2, hlEye: true },
  digital: { sc: 0x0b2e38, emi: 0, pup: 0.5, pupC: 0xc8fff0, glow: true },
  grande: { sc: 0xffffff, emi: 0.18, pup: 0.7, hl: 2, es: 1.0 },
  anime: { sc: 0xffffff, emi: 0.18, iris: 0.92, pup: 0.46, hl: 2, es: 1.0, irisC: 0x13a89e },
  tinta_g: { sc: 0x0e2a33, emi: 0, hl: 2, hlEye: true, es: 1.0 },
  botao: { sc: 0xffffff, emi: 0, noSc: true, pup: 1.0, hl: 2, es: 1.0 }
};
// [site] lista de acessórios (as chaves de SKINS, definido dentro de createOmnix)
export const SKIN_KEYS = ['none', 'headset', 'estetoscopio', 'oculos', 'cracha', 'prancheta', 'touca', 'telefone', 'espelho', 'bone', 'gravata', 'antena'];
export async function createOmnix({ canvas, px = 1000, seed = 7, events = [], ctrl = () => ({}), eye = 'pupila', extras = [], blinks = true, font = 'Figtree' }) {
  // [site] a fonte vem do next/font (nome com hash), por isso é parâmetro
  await document.fonts.load(`800 150px ${font}`).catch(() => {});
  const G = {};
  { const a = 0.36, l = 0.82; G.cross = extrude(roundedPoly([[-a, l], [a, l], [a, a], [l, a], [l, -a], [a, -a], [a, -l], [-a, -l], [-a, -a], [-l, -a], [-l, a], [-a, a]], 0.16), 0.5, 0.28, 0.2); }
  G.eye = new THREE.CapsuleGeometry(0.5, 1, 8, 24);
  const M = {
    body: () => new THREE.MeshPhysicalMaterial({ color: MINT, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.12, sheen: 0.4, sheenColor: new THREE.Color(0xbffff0) }),
    teal: () => new THREE.MeshPhysicalMaterial({ color: TEAL, roughness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.2 }),
    mid: () => new THREE.MeshPhysicalMaterial({ color: MID, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.15 }),
    deep: () => new THREE.MeshPhysicalMaterial({ color: DEEP, roughness: 0.35, clearcoat: 0.8 }),
    white: () => new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.4, clearcoat: 0.6 }),
    metal: () => new THREE.MeshPhysicalMaterial({ color: 0xd7e6e2, metalness: 1, roughness: 0.22 }),
    glass: () => new THREE.MeshPhysicalMaterial({ color: 0xe8fff8, roughness: 0.05, transparent: true, opacity: 0.28, clearcoat: 1 }),
    eye: new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.18, clearcoat: 1, emissive: 0xffffff, emissiveIntensity: 0.18 })
  };
  const mesh = (g, m, sh = true) => { const o = new THREE.Mesh(g, m); o.castShadow = sh; o.receiveShadow = sh; return o; };
  const tube = (pts, r, m, closed = false) => mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, closed), Math.max(40, pts.length * 12), r, 12, closed), m);
  function tex(draw) { const c = document.createElement('canvas'); c.width = c.height = 256; draw(c.getContext('2d')); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
  const TX = {
    one: tex(x => { x.fillStyle = '#0b2e38'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 14; x.strokeStyle = '#fff'; x.stroke(); x.fillStyle = '#1fe1a7'; x.font = '800 150px ' + font; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1', 128, 138); }),
    check: tex(x => { x.fillStyle = '#0b2e38'; x.beginPath(); x.arc(128, 128, 120, 0, 7); x.fill(); x.lineWidth = 14; x.strokeStyle = '#fff'; x.stroke(); x.strokeStyle = '#1fe1a7'; x.lineWidth = 26; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(78, 132); x.lineTo(114, 168); x.lineTo(182, 92); x.stroke(); }),
    cal: tex(x => { x.fillStyle = '#fff'; x.fillRect(0, 0, 256, 256); x.fillStyle = '#0b2e38'; x.fillRect(0, 0, 256, 70); x.fillStyle = '#1fe1a7'; [70, 186].forEach(px => { x.fillRect(px - 10, 0, 20, 40); }); x.strokeStyle = '#1fe1a7'; x.lineWidth = 24; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(80, 160); x.lineTo(115, 195); x.lineTo(180, 120); x.stroke(); }),
    z: tex(x => { x.fillStyle = '#2e6e73'; x.font = '800 200px ' + font; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('z', 128, 120); }),
    card: tex(x => { x.fillStyle = '#fff'; x.fillRect(0, 0, 256, 256); x.fillStyle = '#0b2e38'; x.fillRect(0, 0, 256, 64); x.fillStyle = '#1fe1a7'; x.font = '800 40px ' + font; x.textAlign = 'center'; x.fillText('OMNIX', 128, 46); x.fillStyle = '#1fe1a7'; x.beginPath(); x.arc(128, 140, 40, 0, 7); x.fill(); x.fillStyle = '#d7e6e2'; x.fillRect(48, 200, 160, 14); x.fillRect(72, 224, 112, 12); })
  };
  const v = { geo: 'cross', eyeS: 0.8 };

  const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: false });
  R.setPixelRatio(1); R.setSize(px, px, false); R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.NeutralToneMapping;
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap; R.setClearColor(0x000000, 0);
  const ENV = new THREE.PMREMGenerator(R).fromScene(new RoomEnvironment(), 0.04).texture;
  const ray = new THREE.Raycaster(), UP = V3(0, 0, 1), tmpN = V3(0, 0, 0), O = V3(0, 0, 0), DN = V3(0, 0, -1), LX = V3(-1, 0, 0);

  const sc = new THREE.Scene(); sc.environment = ENV; sc.environmentIntensity = 0.55;
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50); cam.position.set(0, 0.4, 8.2); cam.lookAt(0, 0, 0);
  sc.add(new THREE.HemisphereLight(0xffffff, 0xbfe9dc, 0.9));
  const dl = new THREE.DirectionalLight(0xffffff, 1.7); dl.position.set(2.5, 4.5, 3.5); dl.castShadow = true; dl.shadow.mapSize.set(1024, 1024); dl.shadow.radius = 6; Object.assign(dl.shadow.camera, { left: -2.8, right: 2.8, top: 2.8, bottom: -2.8, near: 1, far: 15 }); sc.add(dl);
  const rim = new THREE.DirectionalLight(0xbfffea, 0.7); rim.position.set(-3, 1.5, -2.5); sc.add(rim);
  const orbit = new THREE.Group(); sc.add(orbit); const root = new THREE.Group(); orbit.add(root); const body = new THREE.Group(); root.add(body);
  const mat = M.body();
  const copy = () => { const g = new THREE.Group(); g.add(mesh(G.cross, mat)); return g; };
  body.add(copy());
  const probe = new THREE.Mesh(G.cross);
  const bb = new THREE.Box3().setFromBufferAttribute(G.cross.attributes.position); const frame = { hw: Math.max(0.55, bb.max.x), top: bb.max.y, yc: 0.06 };
  const front = (x, y) => { O.set(x, y, 10); ray.set(O, DN); const h = ray.intersectObject(probe, false)[0]; return h ? h.point.z : null; };
  const side = y => { O.set(10, y, 0); ray.set(O, LX); const h = ray.intersectObject(probe, false)[0]; return h ? h.point.x : null; };
  const b = { frame, front, side, v };
  const onFace = (x, y, d) => V3(x, y, (front(x, y) ?? 0.5) + d);
  const neckU = (yEnd, d) => { const L = [V3(-0.6, 0.66, -0.22), V3(-0.64, 0.62, 0.3), onFace(-0.64, 0.38, d), onFace(-0.66, 0.05, d), onFace(-0.6, -0.3, d), onFace(-0.34, yEnd + 0.03, d), onFace(0, yEnd, d)];
    return [...L, ...L.slice(0, -1).reverse().map(p => V3(-p.x, p.y, p.z))]; };
  const SKINS = {
    none: () => null,
    headset: b => { const g = new THREE.Group(), { hw, yc, top } = b.frame, m = M.teal(), cx = hw + 0.06;
      // arco elíptico: encosta no topo da cruz e desce até as conchas nas pontas dos braços
      const band = mesh(new THREE.TorusGeometry(cx, 0.055, 16, 96, Math.PI), m); band.position.y = yc; band.scale.set(1, (top - yc + 0.05) / cx, 1); g.add(band);
      [-1, 1].forEach(s => { const c = mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.16, 32), m); c.rotation.z = Math.PI / 2; c.position.set(s * cx, yc, 0); g.add(c); const p = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 32), M.deep()); p.rotation.z = Math.PI / 2; p.position.set(s * (cx - 0.09), yc, 0); g.add(p); });
      g.add(tube([V3(cx, yc - 0.1, 0.12), V3(hw * 0.92, -0.3, 0.42), onFace(0.5, -0.42, 0.06), onFace(0.3, -0.5, 0.07)], 0.032, m)); const tip = mesh(new THREE.SphereGeometry(0.075, 20, 14), m); tip.position.copy(onFace(0.28, -0.5, 0.08)); g.add(tip); return g; },
    estetoscopio: b => { const g = new THREE.Group(), m = M.teal();
      g.add(tube(neckU(-0.5, 0.05), 0.038, m));
      const cz = (front(0.12, -0.72) ?? 0.5); g.add(tube([onFace(0, -0.5, 0.05), onFace(0.04, -0.6, 0.06), onFace(0.1, -0.7, 0.08)], 0.036, m));
      const h = new THREE.Group(); const d = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.07, 40), M.metal()); d.rotation.x = Math.PI / 2; h.add(d, mesh(new THREE.TorusGeometry(0.15, 0.028, 12, 40), m));
      h.position.set(0.12, -0.76, cz + 0.08); h.rotation.set(-0.12, 0.08, 0); g.add(h); return g; },
    oculos: b => { const g = new THREE.Group(), es = b.v.eyeS || 1, m = M.teal(), y = 0.06 * es, r = 0.21 * Math.max(0.6, es), hw = b.frame.hw; let zs = [];
      [-1, 1].forEach(s => { const x = s * 0.27 * es, z = (b.front(x, y) ?? 0.8) + 0.12; zs.push(z); const ring = mesh(new THREE.TorusGeometry(r, 0.035, 12, 48), m); ring.position.set(x, y, z); g.add(ring); const gl = mesh(new THREE.CircleGeometry(r, 40), M.glass(), false); gl.position.set(x, y, z - 0.005); g.add(gl);
        // haste: encosta na face, corre até a ponta do braço lateral e dobra para trás
        const x0 = x + s * r; g.add(tube([V3(x0, y, z), V3(x0 + s * 0.06, y + 0.01, z - 0.07), V3(x0 + s * 0.09, y + 0.01, (b.front(x0 + s * 0.09, y) ?? 0.5) - 0.06)], 0.026, m)); });
      g.add(tube([V3(-0.27 * es + r, y, zs[0]), V3(0, y + 0.05, Math.max(...zs) + 0.03), V3(0.27 * es - r, y, zs[1])], 0.03, m)); g.userData.track = true; return g; },
    cracha: b => { const g = new THREE.Group();
      g.add(tube(neckU(-0.47, 0.04), 0.03, M.deep()));
      const cy = -0.7, cz = (front(0, cy) ?? 0.5) + 0.035; const card = mesh(new THREE.BoxGeometry(0.36, 0.44, 0.035), M.white()); card.position.set(0, cy, cz); card.rotation.x = -0.04; g.add(card);
      const clip = mesh(new THREE.BoxGeometry(0.1, 0.06, 0.05), M.metal()); clip.position.set(0, cy + 0.24, cz + 0.01); g.add(clip);
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.42), new THREE.MeshBasicMaterial({ map: TX.card, toneMapped: false })); face.position.set(0, cy, cz + 0.019); face.rotation.x = -0.04; g.add(face); return g; },
    prancheta: b => { const g = new THREE.Group(); const board = mesh(extrude(roundedPoly(sq(0.3), 0.05), 0.04, 0.015, 0.01, 3), M.teal()); board.scale.set(0.9, 1.2, 1); g.add(board);
      const paper = mesh(new THREE.BoxGeometry(0.46, 0.6, 0.01), M.white()); paper.position.set(0, -0.04, 0.04); g.add(paper);
      [0.08, -0.04, -0.16].forEach(yy => { const l = mesh(new THREE.BoxGeometry(0.32, 0.03, 0.01), M.mid(), false); l.position.set(0, yy, 0.05); g.add(l); });
      const clip = mesh(new THREE.BoxGeometry(0.2, 0.08, 0.06), M.metal()); clip.position.set(0, 0.34, 0.04); g.add(clip);
      // apoiada na frente do braço esquerdo, como se ela a segurasse
      const x = -0.8, y = -0.24; g.scale.setScalar(0.82); g.position.set(x, y, (front(x, y) ?? 0.5) + 0.07); g.rotation.set(-0.08, 0.22, 0.16); g.userData.bob = true; return g; },
    touca: b => { const g = new THREE.Group(), { top } = b.frame; const c = mesh(extrude(roundedPoly([[-0.46, -0.17], [0.46, -0.17], [0.4, 0.19], [-0.4, 0.19]], 0.12), 0.36, 0.06, 0.04, 6), M.white()); g.add(c);
      const m = M.teal(), h = mesh(new THREE.BoxGeometry(0.2, 0.06, 0.03), m), v = mesh(new THREE.BoxGeometry(0.06, 0.2, 0.03), m); h.position.z = v.position.z = 0.25; g.add(h, v); g.position.set(0, top - 0.06, 0.02); g.rotation.set(-0.22, 0, -0.08); return g; },
    telefone: b => { const g = new THREE.Group(), m = M.teal(); const grip = mesh(new THREE.CapsuleGeometry(0.08, 0.6, 8, 16), m); g.add(grip);
      [-1, 1].forEach(s => { const e = mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.12, 32), m); e.position.set(0.1, s * 0.38, 0); e.rotation.z = Math.PI / 2; g.add(e); });
      // apoiado na frente do braço direito
      const x = 0.74, y = -0.22; g.scale.setScalar(1.15); g.position.set(x, y, (front(x, y) ?? 0.5) + 0.16); g.rotation.set(0.15, -0.2, 0.55); g.userData.bob = true; return g; },
    espelho: b => { const g = new THREE.Group(), y = 0.4, rx = (b.side(y) ?? 0.85) + 0.05, rz = (b.front(0, y) ?? 0.85) + 0.05, m = M.teal();
      const band = mesh(new THREE.TorusGeometry(1, 0.045, 12, 96), m); band.rotation.x = Math.PI / 2; band.scale.set(rx, rz, 1); band.position.y = y; g.add(band);
      const mr = new THREE.Group(); const disc = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 48), M.metal()); disc.rotation.x = Math.PI / 2; const rim = mesh(new THREE.TorusGeometry(0.22, 0.035, 12, 48), m); const hole = mesh(new THREE.CircleGeometry(0.045, 24), M.teal(), false); hole.position.z = 0.025; mr.add(disc, rim, hole); mr.position.set(0.12, y + 0.2, rz + 0.06); mr.rotation.x = -0.35; g.add(mr); return g; },
    bone: b => { const g = new THREE.Group(), { top } = b.frame, y = top - 0.46, rx = 0.82, rz = (b.front(0, y + 0.1) ?? 0.53) + 0.16, m = M.teal();
      // copa envolve o braço de cima; aba para a frente, acima dos olhos
      const dome = mesh(new THREE.SphereGeometry(1, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), m); dome.scale.set(rx, 0.72, rz); dome.position.y = y; g.add(dome);
      const brim = mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.05, 48, 1, false, -Math.PI / 2, Math.PI), m); brim.scale.set(1.05, 1, 0.75); brim.position.set(0, y + 0.02, rz - 0.14); brim.rotation.x = 0.12; g.add(brim);
      const bt = mesh(new THREE.SphereGeometry(0.07, 16, 12), M.deep()); bt.position.y = y + 0.72; g.add(bt); g.rotation.z = -0.05; return g; },
    gravata: b => { const g = new THREE.Group(), y = -0.58, z = (b.front(0, y) ?? 0.8) + 0.08, m = M.teal();
      [-1, 1].forEach(s => { const w = mesh(new THREE.ConeGeometry(0.16, 0.3, 32, 1), m); w.rotation.z = s * Math.PI / 2; w.scale.set(1, 1, 0.5); w.position.set(s * 0.16, 0, 0); g.add(w); });
      const knot = mesh(new THREE.SphereGeometry(0.075, 20, 14), M.deep()); knot.scale.set(1, 1.1, 0.8); g.add(knot); g.position.set(0, y, z); return g; },
    antena: b => { const g = new THREE.Group(), { top } = b.frame; g.position.set(0, top - 0.05, 0); const st = mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.42, 12), M.teal()); st.position.y = 0.2; g.add(st);
      const star = mesh(new THREE.OctahedronGeometry(0.15, 0), new THREE.MeshPhysicalMaterial({ color: MINT, emissive: MINT, emissiveIntensity: 0.6, roughness: 0.2, clearcoat: 1 })); star.position.y = 0.5; star.scale.set(0.8, 1.25, 0.8); g.add(star); g.userData.star = star; return g; }
  };

  // efeitos
  const fx = {};
  fx.dots = [-1, 1].map(() => { const c = copy(); c.visible = false; root.add(c); return c; });
  fx.rings = [0, 1, 2].map(() => { const m = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 12, 96), new THREE.MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0 })); root.add(m); return m; });
  const bd = t => { const g = new THREE.Group(); const disc = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.09, 48), M.teal()); disc.rotation.x = Math.PI / 2; const face = new THREE.Mesh(new THREE.CircleGeometry(0.22, 48), new THREE.MeshBasicMaterial({ map: t, transparent: true, toneMapped: false })); face.position.z = 0.047; g.add(disc, face); g.position.set(0.74, 0.74, 0.42); root.add(g); return g; };
  fx.badge = bd(TX.one); fx.check = bd(TX.check);
  fx.cal = new THREE.Group(); { const box = mesh(extrude(roundedPoly(sq(0.2), 0.06), 0.06, 0.03, 0.02, 4), M.teal()); const f = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), new THREE.MeshBasicMaterial({ map: TX.cal, toneMapped: false })); f.position.z = 0.07; fx.cal.add(box, f); fx.cal.position.set(0.76, 0.76, 0.4); root.add(fx.cal); }
  fx.think = [[0.78, 0.95, 0.07], [1.05, 1.28, 0.11], [1.42, 1.68, 0.2]].map(([x, y, s]) => { const m = mesh(new THREE.SphereGeometry(1, 32, 24), M.white()); m.position.set(x, y, 0.3); m.userData.s = s; root.add(m); return m; });
  fx.bars = []; [-1, 1].forEach(s => { for (let k = 0; k < 3; k++) { const m = mesh(new THREE.CapsuleGeometry(0.06, 0.5, 6, 12), M.mid()); m.position.x = s * (1.32 + k * 0.22); m.userData = { k, s }; root.add(m); fx.bars.push(m); } });
  fx.alert = new THREE.Group(); { const m = M.teal(); const st = mesh(new THREE.CapsuleGeometry(0.11, 0.42, 8, 16), m); st.position.y = 0.2; const dt = mesh(new THREE.SphereGeometry(0.12, 24, 16), m); dt.position.y = -0.3; fx.alert.add(st, dt); fx.alert.position.set(1.35, 0.25, 0.2); root.add(fx.alert); }
  const crand = rngOf(seed * 31 + 5);
  fx.conf = []; const cols = [M.teal(), M.white(), M.deep(), M.mid(), new THREE.MeshPhysicalMaterial({ color: LIGHT, roughness: 0.4 })];
  for (let i = 0; i < 30; i++) { const m = mesh(new THREE.BoxGeometry(0.07, 0.13, 0.012), cols[i % 5], false); m.userData = { vx: (crand() * 2 - 1) * 1.3, vy: 1.6 + crand() * 1.2, vz: (crand() * 2 - 1) * 0.7, rx: crand() * 12, ry: crand() * 12, off: crand() * 0.25 }; root.add(m); fx.conf.push(m); }
  fx.plane = new THREE.Group(); { const g = new THREE.BufferGeometry(); const vv = [0.32, 0, 0, -0.26, 0, 0.24, -0.18, 0, 0, 0.32, 0, 0, -0.18, 0, 0, -0.26, 0, -0.24, 0.32, 0, 0, -0.18, 0, 0, -0.26, -0.1, 0]; g.setAttribute('position', new THREE.Float32BufferAttribute(vv, 3)); g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.5, side: THREE.DoubleSide })); m.castShadow = true; fx.plane.add(m); root.add(fx.plane); }
  fx.lens = new THREE.Group(); { const m = M.teal(); fx.lens.add(mesh(new THREE.TorusGeometry(0.3, 0.055, 16, 48), m)); const gl = mesh(new THREE.CircleGeometry(0.3, 40), M.glass(), false); fx.lens.add(gl); const h = mesh(new THREE.CapsuleGeometry(0.06, 0.38, 6, 12), m); h.position.set(0.36, -0.36, 0); h.rotation.z = Math.PI / 4; fx.lens.add(h); root.add(fx.lens); }
  const PUP = new THREE.SphereGeometry(0.5, 40, 24), DOT = new THREE.SphereGeometry(0.5, 20, 12);
  const ARC = new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(V3(-0.5, -0.25, 0), V3(0, 0.55, 0), V3(0.5, -0.25, 0)), 32, 0.15, 12, false);
  const ARCM = new THREE.MeshPhysicalMaterial({ color: 0x0e2a33, roughness: 0.3, clearcoat: 1 });
  const HLM = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const CKM = new THREE.MeshPhysicalMaterial({ color: 0xff7d92, roughness: 0.6, transparent: true, opacity: 0.85, depthWrite: false });
  const eyes = [0, 1].map(() => { const g = new THREE.Group(), pv = new THREE.Group(), mm = M.eye.clone(), m = new THREE.Mesh(G.eye, mm); pv.add(m);
    const pm = new THREE.MeshPhysicalMaterial({ color: 0x0a1418, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.05 });
    const pu = new THREE.Mesh(PUP, pm), po = new THREE.Mesh(G.eye, pm);
    const ir = new THREE.Mesh(PUP, new THREE.MeshPhysicalMaterial({ color: 0x168f8c, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 }));
    const h1 = new THREE.Mesh(DOT, HLM), h2 = new THREE.Mesh(DOT, HLM);
    const arc = new THREE.Mesh(ARC, ARCM); pv.add(ir, pu, po, h1, h2, arc);
    const ol = new THREE.Mesh(G.eye, ARCM), br = new THREE.Mesh(G.eye, ARCM), ck = new THREE.Mesh(PUP, CKM), ls = [0, 1, 2].map(() => new THREE.Mesh(G.eye, ARCM));
    pv.add(ol, ...ls); g.add(pv, br, ck); body.add(g); return { g, pv, m, mm, pm, pu, po, ir, h1, h2, arc, ol, br, ck, ls }; });
  const XT = new Set(extras);
  let ES = EYE_STYLES.pupila;
  function setEyeStyle(k) { ES = EYE_STYLES[k] || EYE_STYLES.pupila; v.eyeS = ES.es ?? 0.8; eyes.forEach(o => {
    o.mm.color.set(ES.sc); o.mm.emissive.set(ES.sc); o.mm.emissiveIntensity = ES.emi; o.mm.roughness = ES.emi ? 0.18 : 0.12;
    o.pm.color.set(ES.pupC ?? 0x0a1418); o.pm.emissive.set(ES.pupC ?? 0x000000); o.pm.emissiveIntensity = ES.glow ? 0.85 : 0; o.ir.material.color.set(ES.irisC ?? 0x168f8c); }); }
  setEyeStyle(eye);

  // ---------- estado simulado ----------
  const EV = [...events].sort((a, c) => a.t - c.t);
  let S;
  function reset() {
    S = { T: 0, rnd: rngOf(seed), skinKey: 'none', skin: null, act: 'none', key: 'neutral', geom: EX.neutral, morph: null, blinkAt: 600,
      wv: { from: { x: 0, y: 0 }, to: { x: 0, y: 0 }, t0: 0, dur: 1, hold: 0 }, P: { ...A0 }, tw: { from: { ...A0 }, to: { ...A0 }, t0: -1e4, dur: 300 },
      eyT: { from: 1, to: 1, t0: 0, dur: 1 }, yaw: 0, pitch: 0.06, ei: 0 };
    S.blinkAt = 600 + S.rnd() * 2500;
    setSkin('none');
  }
  function setSkin(k) { if (S.skin) body.remove(S.skin); S.skin = SKINS[k](b); S.skinKey = k; if (S.skin) { S.skin.traverse(o => { if (o.isMesh) o.castShadow = true; }); body.add(S.skin); } }
  const cur = () => { if (!S.morph) return S.geom; const p = clamp((S.T - S.morph.t0) / S.morph.dur, 0, 1), e = ec(p); return S.morph.from.map((f, i) => { const t = S.morph.to[i], o = {}; for (const q in f) o[q] = lerp(f[q], t[q], e); return o; }); };
  const eyV = () => { const e = S.eyT, p = clamp((S.T - e.t0) / (e.dur || 1), 0, 1); return lerp(e.from, e.to, eq(p)); };
  function goEyes(target, dur = 220) { const from = cur(); const to = target.map((e, i) => ({ ...e, ang: near(from[i].ang, e.ang) })); S.morph = { t0: S.T, from, to, dur }; S.geom = to; }
  function setP(to) { const from = { ...S.P }; S.tw = { from, to, t0: S.T, dur: 300 }; const c = eyV(); S.eyT = { from: c, to: to.ey, t0: to.ey > c ? S.T + 160 : S.T, dur: to.ey > c ? 330 : 100 }; }
  // expr e act combináveis: act define efeitos, expr define olhos (o original troca um pelo outro)
  function apply(e) {
    if (e.eye !== undefined) setEyeStyle(e.eye);
    if (e.extras !== undefined) { XT.clear(); e.extras.forEach(x => XT.add(x)); }
    if (e.skin !== undefined) setSkin(e.skin);
    if (e.act !== undefined) { S.act = e.act; setP({ ...A0, ...ACT[e.act][0] }); if (ACT[e.act][1] && e.expr === undefined) { goEyes(ACT[e.act][1]); S.key = e.act; } }
    if (e.expr !== undefined) { S.key = e.expr; goEyes(EX[e.expr], e.morph || 220); }
    if (e.blink) S.blinkAt = S.T;
  }
  const blink = () => { if (!blinks || S.act === 'dormindo') return 0; const d = S.T - S.blinkAt; if (d < 0 || d > 200) return 0; return d < 100 ? d / 100 : 1 - (d - 100) / 100; };
  const wander = () => { const w = S.wv, p = clamp((S.T - w.t0) / w.dur, 0, 1), e = eio(p); return { x: lerp(w.from.x, w.to.x, e), y: lerp(w.from.y, w.to.y, e) }; };
  function tick(dt) {
    S.T += dt;
    while (S.ei < EV.length && EV[S.ei].t * 1000 <= S.T) apply(EV[S.ei++]);
    if (S.T > S.blinkAt + 200) S.blinkAt = S.T + (S.rnd() < 0.12 ? 150 : 2000 + S.rnd() * 2200);
    if (S.morph && S.T - S.morph.t0 > S.morph.dur) S.morph = null;
    const w = S.wv; if (S.T > w.t0 + w.dur + w.hold) { const c = wander(); const amp = S.act === 'none' ? 1 : 0.6; S.wv = { from: c, to: S.rnd() < 0.3 ? { x: 0, y: 0 } : { x: (S.rnd() * 2 - 1) * 0.07 * amp, y: (S.rnd() * 2 - 1) * 0.06 * amp }, t0: S.T, dur: 1200 + S.rnd() * 1000, hold: 500 + S.rnd() * 1000 }; }
    const p = clamp((S.T - S.tw.t0) / S.tw.dur, 0, 1), e = eq(p); for (const k in S.P) S.P[k] = lerp(S.tw.from[k], S.tw.to[k], e);
    const s = dt / 1000, tgt = 0.2 * Math.sin(S.T / 1000 * 0.6); S.yaw += (tgt - S.yaw) * (1 - Math.exp(-s * 1.6)); S.pitch += (0.06 + 0.05 * Math.sin(S.T / 1000 * 0.45) - S.pitch) * (1 - Math.exp(-s * 1.6));
  }
  const DT = 1000 / 120;
  function advanceTo(tSec) { const target = Math.round(tSec * 1000 / DT) * DT; if (!S || target < S.T - 1e-6) reset(); while (S.T + DT <= target + 1e-6) tick(DT); }

  function pose(tSec) {
    const c = ctrl(tSec) || {}; const t = S.T / 1000, P = S.P;
    root.rotation.set(S.pitch + (c.pitch || 0), S.yaw + (c.yaw || 0), c.lean || 0, 'YXZ'); orbit.rotation.x = c.orbitX || 0;
    let s = P.s * (1 + 0.006 * Math.sin(t * Math.PI * 2 / 3.2) + P.zzz * 0.025 * Math.sin(t * Math.PI * 2 / 3.6));
    const pp = t % 1.1, bt = x => { const d = (pp - x) / 0.14; return d < 0 || d > 1 ? 0 : Math.sin(Math.PI * d); }; s *= 1 + P.pulse * 0.07 * (bt(0) + 0.6 * bt(0.2));
    const sq = c.squash || 0; body.scale.set(s * (1 + sq * 0.5), s * (1 - sq), s * (1 + sq * 0.5));
    const hopP = (t / 1.1) % 1, hop = hopP < 0.72 ? 4 * (hopP / 0.72) * (1 - hopP / 0.72) : 0, burst = Math.max(0, Math.sin(t * Math.PI * 2 * 0.9)) ** 6;
    const wave = i => Math.max(0, Math.sin(t * Math.PI * 2 / 1.1 - i * 0.9));
    body.position.set(0, P.float * 0.32 * Math.sin(t * Math.PI * 2 / 0.63) + P.hop * 0.18 * hop + P.dots * 0.12 * wave(1), 0);
    body.rotation.set(0, 0, P.ring * burst * Math.sin(t * 70) * 0.12 + P.alert * 0.06 * Math.sin(t * 2.1) + (c.wiggle || 0) * 0.22 * Math.sin(t * 14));
    if (S.skin) { S.skin.visible = P.s > 0.6; if (S.skin.userData.star) S.skin.userData.star.rotation.y = t * 1.5; if (S.skin.userData.bob) S.skin.position.y = 0.04 * Math.sin(t * 2); }
    fx.dots.forEach((d, i) => { d.visible = P.dots > 0.01; const k = Math.max(0.001, P.dots * 0.22); d.scale.setScalar(k); d.position.set((i ? 1 : -1) * frame.hw * 0.55 * P.dots, 0.12 * wave(i ? 2 : 0) * P.dots, 0); });
    fx.rings.forEach((m, k) => { const ph = ((t * 0.9) + k / 3) % 1; m.visible = P.ring > 0.01; m.scale.setScalar(1.08 + ph * 0.55); m.material.opacity = P.ring * (1 - ph) * 0.85; });
    const show = (o, a) => { o.visible = a > 0.01; o.scale.setScalar(Math.max(0.001, a)); };
    show(fx.badge, P.badge); show(fx.check, P.check); show(fx.cal, P.cal); fx.cal.rotation.y = P.cal * 0.25 * Math.sin(t * 2);
    const tc = t % 2.2; fx.think.forEach((m, i) => { const a = clamp((tc - i * 0.3) / 0.25, 0, 1) * (tc > 1.8 ? 1 - clamp((tc - 1.8) / 0.2, 0, 1) : 1); const k = m.userData.s * eq(a) * P.think; m.visible = k > 0.001; m.scale.setScalar(Math.max(0.001, k)); m.position.y = [0.95, 1.28, 1.68][i] + 0.03 * Math.sin(t * 2 + i); });
    fx.bars.forEach(m => { const { k, s: sd } = m.userData; m.visible = P.bars > 0.01; const h = (0.4 + 0.9 * Math.abs(Math.sin(t * Math.PI * 2 * (0.9 + k * 0.37) + k * 1.7 + sd))) * (1 - k * 0.2); m.scale.set(P.bars, Math.max(0.001, P.bars * h), P.bars); });
    show(fx.alert, P.alert); fx.alert.position.y = 0.25 + 0.08 * Math.sin(t * 2.4); fx.alert.rotation.z = -0.18 + 0.1 * Math.sin(t * 1.7);
    fx.conf.forEach(m => { const u = m.userData, tt = ((t + u.off) % 1.8); m.visible = P.party > 0.01; m.position.set(u.vx * tt, 0.9 + u.vy * tt - 2.4 * tt * tt, 0.2 + u.vz * tt); m.rotation.set(u.rx * tt, u.ry * tt, 0); m.scale.setScalar(Math.max(0.001, P.party)); });
    { const u = (t % 1.7) / 1.7, p0 = V3(0.55, 0.0, 0.9), p1 = V3(1.5, 1.0, 0.6), p2 = V3(2.4, 1.9, -0.6); const a = p0.clone().lerp(p1, u), bb2 = p1.clone().lerp(p2, u), pos = a.clone().lerp(bb2, u), dir = bb2.clone().sub(a).normalize();
      fx.plane.position.copy(pos); fx.plane.quaternion.setFromUnitVectors(V3(1, 0, 0), dir); const k = P.plane * (u < 0.12 ? u / 0.12 : u > 0.8 ? 1 - (u - 0.8) / 0.2 : 1); fx.plane.visible = k > 0.01; fx.plane.scale.setScalar(Math.max(0.001, k)); }
    show(fx.lens, P.lens); fx.lens.position.set(0.6 * Math.sin(t * 1.6), 0.08 + 0.08 * Math.cos(t * 3.2), 1.25); fx.lens.rotation.z = 0.15 * Math.sin(t * 1.6);
    const bl = blink(), wd = wander(), es = v.eyeS, ev = eyV(), lens = P.lens * 0.12 * Math.sin(t * 1.6), lx = c.lookX || 0, ly = c.lookY || 0;
    cur().forEach((e, i) => { const o = eyes[i]; const x = (e.x + wd.x + lens + lx) * es, y = -((e.y + wd.y + ly) * es);
      O.set(x, y, 10); ray.set(O, DN); const h = ray.intersectObject(probe, false)[0];
      if (h) { o.g.position.copy(h.point); tmpN.copy(h.face.normal).normalize(); o.g.quaternion.setFromUnitVectors(UP, tmpN); }
      o.g.visible = ev > 0.02; o.pv.scale.set(ev, Math.max(0.12, 1 - bl) * ev, ev); o.m.rotation.z = (-e.ang - 90) * Math.PI / 180;
      const W = e.w * es, Lg = e.len * es + W; o.m.scale.set(W, Lg / 2, W * 0.42); o.m.position.z = W * 0.17;
      // estilos de olho (EYE_STYLES): esclera, pupila redonda/oval, íris, brilhos; olho fechado (p=0) vira arco
      const op = clamp(e.p ?? 1, 0, 1); o.m.scale.multiplyScalar(Math.max(0.001, op)); o.m.visible = op > 0.02 && !ES.noSc;
      const aw = Math.max(Lg, W) * 1.25, cc = e.c ?? 1, ah = aw * 0.42 * (Math.abs(cc) < 0.25 ? 0.25 * (cc < 0 ? -1 : 1) : cc);
      o.arc.visible = op < 0.98; o.arc.scale.set(aw * (1 - op), ah * (1 - op) || 0.001, aw * (1 - op)); o.arc.position.set(0, 0, W * 0.22);
      const rz = o.m.rotation.z, cz = Math.cos(rz), sz = Math.sin(rz), md = Math.min(W, Lg); const ey = Math.abs(cz) * Lg + Math.abs(sz) * W;
      // mantém um ponto (x,y) dentro da cápsula, com folga r
      const inside = (x, y, rx, ry = rx) => { let u = x * cz + y * sz, w = -x * sz + y * cz; const hx = Math.max(0, W / 2 - rx) * 0.88, hy = Math.max(0, Lg / 2 - ry) * 0.88; u = clamp(u, -hx, hx); w = clamp(w, -hy, hy); return [u * cz - w * sz, u * sz + w * cz]; };
      const tx = (lx * 1.4 + wd.x * 1.5) * W * 2.2, ty = (-ly * 1.4 - wd.y * 1.5) * W * 2.2, zf = W * 0.32;
      const hide = m => { m.visible = false; }; [o.pu, o.po, o.ir, o.h1, o.h2].forEach(hide);
      const hl = (cx, cy, z, s1, s2, d1, d2) => { if (!ES.hl || op < 0.3) return; o.h1.visible = true; o.h1.scale.set(s1, s1, s1 * 0.4); o.h1.position.set(cx + d1[0], cy + d1[1], z);
        if (ES.hl > 1) { o.h2.visible = true; o.h2.scale.set(s2, s2, s2 * 0.4); o.h2.position.set(cx + d2[0], cy + d2[1], z); } };
      if (ES.hlEye) { // olho de tinta: brilhos na própria superfície do olho
        const [cx, cy] = inside(tx * 0.3, ty * 0.3, md * 0.4), s1 = md * 0.36 * op, s2 = md * 0.15 * op;
        const [ax, ay] = inside(cx + md * 0.2, cy + Math.max(md, Lg * 0.6) * 0.3, s1 / 2), [bx, by] = inside(cx - md * 0.16, cy - Math.max(md, Lg * 0.6) * 0.26, s2 / 2);
        hl(0, 0, W * 0.42, s1, s2, [ax, ay], [bx, by]);
      } else if (ES.iris) {
        const id = op * md * ES.iris; if (id > 0.004) { const [cx, cy] = inside(tx, ty, id / 2);
          o.ir.visible = true; o.ir.scale.set(id, id, id * 0.3); o.ir.position.set(cx, cy, zf);
          const pd = id * ES.pup / ES.iris; o.pu.visible = true; o.pu.scale.set(pd, pd, pd * 0.3); o.pu.position.set(cx, cy, zf + id * 0.05);
          hl(cx, cy, zf + id * 0.18, id * 0.24, id * 0.1, [id * 0.2, id * 0.22], [-id * 0.2, -id * 0.18]); }
      } else if (ES.pup && ES.oval) {
        const k = op * ES.pup; if (k > 0.01) { const [cx, cy] = inside(tx, ty, W * k / 2, Lg * k / 2);
          o.po.visible = true; o.po.rotation.z = rz; o.po.scale.set(W * k, Lg / 2 * k, W * 0.15); o.po.position.set(cx, cy, W * 0.355);
          const s1 = md * k * 0.38; hl(cx, cy, W * 0.46, s1, s1 * 0.42, inside(md * k * 0.18, Lg * k * 0.24, s1 / 2), inside(-md * k * 0.16, -Lg * k * 0.22, s1 * 0.2)); }
      } else if (ES.pup) {
        const pd = op * md * ES.pup; if (pd > 0.004) { const [cx, cy] = inside(tx, ty - pd * 0.05, pd / 2);
          o.pu.visible = true; o.pu.scale.set(pd, pd, pd * 0.3); o.pu.position.set(cx, cy, zf);
          hl(cx, cy, zf + pd * 0.16, pd * 0.3, pd * 0.13, [pd * 0.2, pd * 0.22], [-pd * 0.2, -pd * 0.2]); }
      }
      // detalhes combináveis: contorno, sobrancelhas, bochechas, cílios
      const ot = 0.045 * es; o.ol.visible = XT.has('contorno') && op > 0.02 && !ES.noSc; o.ol.rotation.z = rz; o.ol.scale.set((W + ot) * op, (Lg + ot) / 2 * op, W * 0.42 * op); o.ol.position.z = W * 0.17 - 0.012 * es;
      o.br.visible = XT.has('sobrancelha'); if (o.br.visible) { const th = 0.05 * es, bln = 0.2 * es; o.br.rotation.z = Math.PI / 2 + (i === 0 ? -1 : 1) * (e.bt || 0) * Math.PI / 180;
        o.br.scale.set(th, bln / 2, th * 0.6); o.br.position.set(0, ey / 2 + 0.06 * es + (e.bl || 0) * es, 0.02 * es); }
      o.ck.visible = XT.has('bochecha'); if (o.ck.visible) { o.ck.scale.set(0.19 * es, 0.1 * es, 0.02); o.ck.position.set((i === 0 ? -1 : 1) * 0.03 * es, -(ey / 2 + 0.07 * es), 0.012); }
      { let ax = -Math.sin(rz), ay = Math.cos(rz); if (ay < 0) { ax = -ax; ay = -ay; } const nx = ay, ny = -ax, sd = i === 0 ? -1 : 1, tc = Lg / 2 - W / 2, ll = 0.065 * es;
        o.ls.forEach((l, k) => { l.visible = XT.has('cilios') && op > 0.5; if (!l.visible) return; const f = (25 + k * 25) * Math.PI / 180, dx = Math.cos(f) * ax + Math.sin(f) * nx * sd, dy = Math.cos(f) * ay + Math.sin(f) * ny * sd;
          l.scale.set(0.02 * es, ll / 2, 0.02 * es); l.rotation.z = Math.atan2(dy, dx) - Math.PI / 2; l.position.set(ax * tc + dx * (W / 2 + ll * 0.4), ay * tc + dy * (W / 2 + ll * 0.4), W * 0.17); }); }
      if (i === 1 && S.skin && S.skin.userData.track) { const ax = (eyes[0].g.position.x + o.g.position.x) / 2, ay = (eyes[0].g.position.y + o.g.position.y) / 2; S.skin.position.set(ax - 0, ay - 0.06 * es, 0); } });
  }
  function render(tSec) { advanceTo(tSec); pose(tSec); R.render(sc, cam); }
  reset();
  // [site] dispose para liberar o contexto WebGL ao desmontar
  return { render, set: e => { if (!S) reset(); apply(e); }, renderer: R, dispose: () => { ENV.dispose(); R.dispose(); R.forceContextLoss(); } };
}
