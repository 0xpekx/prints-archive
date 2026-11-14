// Kettle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/056.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ro){Ro&&function(){"use strict";const qo=new WeakMap,N=(n,q,a)=>n<q?q:n>a?a:n,R0=(n,q,a)=>{const w=N((a-n)/(q-n),0,1);return w*w*(3-2*w)},Ta=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Pa=`#version 300 es
uniform vec4 uRect;
out vec2 vUv;
void main() { vec2 p = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)); vUv = mix(uRect.xy, uRect.zw, p); gl_Position = vec4(vUv * 2.0 - 1.0, 0.0, 1.0); }`,K0=`
precision highp float; precision highp int;
in vec2 vUv;
uniform sampler2D uN;
uniform vec4 uP[28];
uniform int uIt, uRm, uZ, uMode;
const float PI = 3.14159265;
// two-argument atan costs ~10-15 ms of compile per call site: one-argument atan instead
float at2(float y, float x) { float a = atan(y / x); return x == 0.0 ? sign(y) * 1.5707963 : (x < 0.0 ? a + (y >= 0.0 ? PI : -PI) : a); }
vec3 enc(vec3 c) { return sqrt(clamp(c * 0.25, 0.0, 1.0)); }
vec3 dec(vec3 c) { return c * c * 4.0; }
vec4 N4(vec2 p) { return textureLod(uN, p, 0.0); }
float fbm(vec2 p) { return N4(p).r * 0.5 + N4(p * 2.03 + 0.31).g * 0.3 + N4(p * 4.11 + 0.73).b * 0.2; }
vec3 yawP(vec3 q, vec2 cs) { return vec3(cs.x * q.x + cs.y * q.z, q.y, -cs.y * q.x + cs.x * q.z); }
vec3 kLoc(vec3 p) { return yawP(p - uP[3].xyz, uP[4].xy) / uP[4].z; }
vec3 camRay() { return normalize(uP[1].xyz + (vUv.x * 2.0 - 1.0) * uP[0].w * vec3(1.0, 0.0, 0.0) + (vUv.y * 2.0 - 1.0) * uP[0].w * uP[2].xyz); }
vec2 octE(vec3 n) { n /= abs(n.x) + abs(n.y) + abs(n.z); return n.z >= 0.0 ? n.xy : (1.0 - abs(n.yx)) * vec2(n.x >= 0.0 ? 1.0 : -1.0, n.y >= 0.0 ? 1.0 : -1.0); }
vec3 octD(vec2 e) { vec3 n = vec3(e, 1.0 - abs(e.x) - abs(e.y)); float t = max(-n.z, 0.0); n.x += n.x >= 0.0 ? -t : t; n.y += n.y >= 0.0 ? -t : t; return normalize(n); }
float paneE(vec2 g) {
  vec4 W = uP[11]; vec2 M = uP[25].xy;
  float dx = min(g.x - W.x, W.y - g.x), dy = min(g.y - W.z, W.w - g.y);
  return min(min(dx, dy) - 3.4, min(abs(g.x - M.x), abs(g.y - M.y)) - 1.1);
}
float paneMask(vec2 g) { return smoothstep(-0.3, 0.3, paneE(g)); }
uniform highp usampler2D uPB;
void planeAt(out float tp, out vec3 pn, out float pm) { uvec4 q = texelFetch(uPB, ivec2(gl_FragCoord.xy), 0); tp = q.w > 0u ? uintBitsToFloat(q.x) : 1e9; pn = octD(unpackHalf2x16(q.y)); pm = float(q.z); }
`,Ao=`
float sdEll(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.0) / max(k1, 1e-5); }
float sdCyl(vec3 p, float r, float y0, float y1) { vec2 d = vec2(length(p.xz) - r, abs(p.y - (y0 + y1) * 0.5) - (y1 - y0) * 0.5); return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)); }
float sdCylZ(vec3 p, float r, float z0, float z1) { vec2 d = vec2(length(p.xy) - r, abs(p.z - (z0 + z1) * 0.5) - (z1 - z0) * 0.5); return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)); }
float sdBox(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); }
float sdCone(vec3 p, float h, float r1, float r2) {
  vec2 q = vec2(length(p.xz), p.y), k1 = vec2(r2, h), k2 = vec2(r2 - r1, 2.0 * h);
  vec2 ca = vec2(q.x - min(q.x, q.y < 0.0 ? r1 : r2), abs(q.y) - h);
  vec2 cb = q - k1 + k2 * clamp(dot(k1 - q, k2) / dot(k2, k2), 0.0, 1.0);
  float s = (cb.x < 0.0 && ca.y < 0.0) ? -1.0 : 1.0;
  return s * sqrt(min(dot(ca, ca), dot(cb, cb)));
}
float sdRC(vec3 p, vec3 a, vec3 b, float r1, float r2) {
  vec3 ba = b - a; float l2 = dot(ba, ba), rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1.0 / l2;
  vec3 pa = p - a; float y = dot(pa, ba), z = y - l2;
  vec3 xv = pa * l2 - ba * y; float x2 = dot(xv, xv), y2 = y * y * l2, z2 = z * z * l2;
  float k = sign(rr) * rr * rr * x2;
  if (sign(z) * a2 * z2 > k) return sqrt(x2 + z2) * il2 - r2;
  if (sign(y) * a2 * y2 < k) return sqrt(x2 + y2) * il2 - r1;
  return (sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}
float smin(float a, float b, float k) { float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
vec2 U(vec2 a, vec2 b) { return a.x < b.x ? a : b; }
vec2 archQ(vec3 b, float cy, float R) { vec2 c = b.xy - vec2(0.0, cy); return vec2(c.y > 0.0 ? length(c) - R : length(vec2(abs(c.x) - R, c.y)), b.z); }
float arare(vec3 q) {
  float rw = floor((q.y - 5.4) / 1.18);
  if (rw < 0.0 || rw > 5.0) return 0.0;
  float cy = 5.4 + (rw + 0.5) * 1.18, e = (cy - 6.2) / 6.9, rr = 11.0 * sqrt(max(1.0 - e * e, 0.05));
  float n = floor(6.2832 * rr / 1.2), a = at2(q.z, q.x) / 6.2832 * n + mod(rw, 2.0) * 0.5;
  vec2 d = vec2((fract(a) - 0.5) * 6.2832 * rr / n, q.y - cy);
  float b = max(0.0, 1.0 - dot(d, d) / 0.2);
  return 0.3 * b * b;
}
// the objects are a list of primitives in a float texture: [type, op, material, k] [a] [b]
uniform highp sampler2D uPr;
uniform int uNP;
float prim(int ty, vec3 q, vec4 a, vec4 b) {
  if (ty == 0) return sdEll(q - a.xyz, b.xyz);
  if (ty == 1) return sdCyl(q - vec3(a.x, 0.0, a.z), b.x, a.y, b.y) - b.z;
  if (ty == 2) return sdCone(q - a.xyz, b.x, b.y, b.z) - b.w;
  if (ty == 3) return sdRC(q, a.xyz, b.xyz, a.w, b.w);
  if (ty == 4) return sdBox(q - a.xyz, b.xyz) - b.w;
  if (ty == 5) { vec2 aq = archQ(q, a.y, a.x); return a.w > 0.5 ? max(abs(aq.x), abs(aq.y)) - a.z : length(aq) - a.z; }
  if (ty == 6) { vec3 c = q - a.xyz; return length(vec2(length(c.xy) - b.x, c.z)) - b.y; }
  if (ty == 7) return sdCylZ(q - a.xyz, b.x, b.y, b.z) - b.w;
  if (ty == 8) return dot(q, a.xyz) - a.w;
  if (ty == 12) return length(q - a.xyz) - a.w;
  return 1e5;
}
vec2 map(vec3 p, int sel) {
  vec2 res = vec2(1e5, 0.0);
  float acc = 1e5, am = 0.0, asc = 1.0, sc = 1.0;
  vec3 o = vec3(0.0); vec2 cs = vec2(1.0, 0.0);
  int i = 0;
  for (int it = 0; it < uNP; it++) {
    if (i >= uNP) break;
    vec4 h = texelFetch(uPr, ivec2(0, i), 0), a = texelFetch(uPr, ivec2(1, i), 0), b = texelFetch(uPr, ivec2(2, i), 0);
    int ty = int(h.x + 0.5), op = int(h.y + 0.5);
    if (ty == 11) {
      res = U(res, vec2(acc * asc, am)); acc = 1e5;
      int nx = int(b.x + 0.5);
      if ((int(b.y + 0.5) & sel) == 0) { i = nx; continue; }
      float bs = length(p - a.xyz) - a.w;
      if (bs > 4.0) { if (bs < res.x) res = vec2(bs, 0.0); i = nx; continue; }
      i++; continue;
    }
    if (ty == 10) { o = a.xyz; cs = b.xy; sc = b.z; i++; continue; }
    vec3 q = yawP(p - o, cs) / sc;
    if (op == 5) { if (acc < 0.8 && q.y > 5.3 && q.y < 12.6) acc -= arare(q); i++; continue; }
    float d = prim(ty, q, a, b);
    if (op == 0) { res = U(res, vec2(acc * asc, am)); acc = d; am = h.z; asc = sc; }
    else if (op == 1) { if (d < acc) { acc = d; if (h.z >= 0.0) am = h.z; } }
    else if (op == 2) acc = smin(acc, d, h.w);
    else if (op == 3) { if (-d > acc) { acc = -d; if (h.z >= 0.0) am = h.z; } }
    else acc = max(acc, d);
    i++;
  }
  return U(res, vec2(acc * asc, am));
}
`,za=`
out uvec4 og;
vec3 nTap(int j) { return 0.5773 * (2.0 * vec3(float(((j + 3) >> 1) & 1), float((j >> 1) & 1), float(j & 1)) - 1.0); }
void main() {
  vec3 ro = uP[0].xyz, rd = camRay();
  float t0 = 0.0, t1 = 0.0; int sel = 4;
  og = uvec4(0u);
  if (uMode == 0) {
    float tp, pm; vec3 pn; planeAt(tp, pn, pm);
    vec3 bmin = vec3(-75.0, -25.0, uP[12].y - 2.0), bmax = vec3(85.0, 48.0, uP[12].w + 8.0);
    vec3 ia = (bmin - ro) / rd, ib = (bmax - ro) / rd, tlo = min(ia, ib), thi = max(ia, ib);
    t0 = max(max(max(tlo.x, tlo.y), tlo.z), 0.0); t1 = min(min(min(thi.x, thi.y), thi.z), tp);
  } else {
    vec3 c = uP[3].xyz + vec3(2.0, 10.0, 0.0); float R = 22.0 * uP[4].z;
    vec3 oc = ro - c; float b = dot(oc, rd), h = b * b - dot(oc, oc) + R * R;
    if (h < 0.0) return;
    t0 = max(-b - sqrt(h), 0.0); t1 = -b + sqrt(h); sel = uMode;
  }
  if (t0 >= t1) return;
  float pw = uP[2].w, t = t0, mr = 1e9, tb = t0, al = 0.0, mat = 0.0;
  int phase = 0, j = 0; vec3 P = ro, nacc = vec3(0.0);
  for (int it = 0; it < uRm + 5; it++) {
    vec3 q = phase == 0 ? ro + rd * t : P + nTap(j) * 0.012;
    vec2 dm = map(q, sel);
    if (phase == 0) {
      float rr = dm.x / (pw * t);
      if (rr < mr) { mr = rr; tb = t; }
      if (rr < 0.3) { tb = t; al = 1.0; phase = 1; }
      else { t += max(dm.x * 0.8, 0.01); j++; if (t > t1 || j >= uRm) { if (mr >= 1.0) return; al = clamp(1.0 - mr, 0.0, 1.0); phase = 1; } }
      if (phase == 1) { P = ro + rd * tb; j = 0; }
    } else {
      if (j == 0) mat = dm.y;
      nacc += nTap(j) * dm.x; j++;
      if (j == 4) break;
    }
  }
  if (phase == 0 || j < 4) return;
  og = uvec4(floatBitsToUint(tb), packHalf2x16(octE(normalize(nacc))), packHalf2x16(vec2(mat, al)), 1u);
}
`,ka=`
// the planes: hob and counter, the front faces, the back wall with the window in it, the sill
void planes(vec3 ro, vec3 rd, out float tp, out vec3 pn, out float pm) {
  vec4 W = uP[11]; float WZ = uP[12].x, GZ = uP[12].y, SX = uP[12].z, FZ = uP[12].w, st = uP[10].x;
  tp = 1e9; pm = 39.0; pn = vec3(0.0, 1.0, 0.0);
  if (rd.y < 0.0) { float tt = -ro.y / rd.y; vec3 q = ro + rd * tt; float fz = (st < 1.5 && q.x > SX) ? FZ + 1.5 : FZ; if (q.z < fz && q.z > WZ) { tp = tt; pm = (st < 1.5 && q.x < SX) ? 30.0 : 31.0; } }
  float tt = (FZ - ro.z) / rd.z; vec3 q = ro + rd * tt;
  if (tt > 0.0 && tt < tp && q.y < 0.0 && (st > 1.5 || q.x < SX)) { tp = tt; pn = vec3(0.0, 0.0, 1.0); pm = st > 1.5 ? (q.y > -5.0 ? 33.0 : 39.0) : 32.0; if (st > 1.5 && q.y <= -5.0) tp = 1e8; }
  tt = (FZ + 1.5 - ro.z) / rd.z; q = ro + rd * tt;
  if (st < 1.5 && tt > 0.0 && tt < tp && q.y < 0.0 && q.y > -4.0 && q.x > SX) { tp = tt; pn = vec3(0.0, 0.0, 1.0); pm = 31.0; }
  tt = (FZ - ro.z) / rd.z; q = ro + rd * tt;
  if (st < 1.5 && tt > 0.0 && tt < tp && q.y <= -4.0 && q.x > SX) { tp = tt; pn = vec3(0.0, 0.0, 1.0); pm = 33.0; }
  tt = (WZ - ro.z) / rd.z; q = ro + rd * tt;
  if (tt > 0.0 && tt < tp && q.y > 0.0) {
    if (q.x > W.x && q.x < W.y && q.y > W.z && q.y < W.w) {
      float tg = (GZ - ro.z) / rd.z;
      float tx = rd.x > 0.0 ? (W.y - ro.x) / rd.x : (W.x - ro.x) / rd.x;
      float ty = rd.y > 0.0 ? (W.w - ro.y) / rd.y : (W.z - ro.y) / rd.y;
      float te = min(tg, min(tx, ty)); tp = te;
      if (te == tg) { vec3 g = ro + rd * tg; pn = vec3(0.0, 0.0, 1.0); pm = paneMask(g.xy) > 0.5 ? 37.0 : 36.0; }
      else if (te == tx) { pn = vec3(rd.x > 0.0 ? -1.0 : 1.0, 0.0, 0.0); pm = 35.0; }
      else { pn = vec3(0.0, rd.y > 0.0 ? -1.0 : 1.0, 0.0); pm = rd.y > 0.0 ? 35.0 : 38.0; }
    } else { tp = tt; pn = vec3(0.0, 0.0, 1.0); pm = 34.0; }
  }
  // the inner sill board
  vec3 bc = vec3((W.x + W.y) * 0.5, W.z - 1.1, WZ + 1.6), bh = vec3((W.y - W.x) * 0.5 + 4.0, 1.1, 1.6);
  vec3 mm = 1.0 / rd, kk = abs(mm) * bh, qq = mm * (ro - bc), t1 = -qq - kk, t2 = -qq + kk;
  float tn = max(max(t1.x, t1.y), t1.z), tf = min(min(t2.x, t2.y), t2.z);
  if (tn < tf && tn > 0.0 && tn < tp) { tp = tn; pn = -sign(rd) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz); pm = 38.0; }
}
out uvec4 op;
void main() { float tp, pm; vec3 pn; planes(uP[0].xyz, camRay(), tp, pn, pm); op = uvec4(floatBitsToUint(tp), packHalf2x16(octE(pn)), uint(pm + 0.5), 1u); }
`,Ea=`
uniform highp usampler2D uG;
uniform int uCand, uLi;
out vec4 o;
bool candAt(out vec3 P, out vec3 Nn) {
  uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  vec3 ro = uP[0].xyz, rd = camRay();
  float alO = g.w > 0u ? unpackHalf2x16(g.z).y : 0.0;
  P = ro; Nn = vec3(0.0, 1.0, 0.0);
  if (uCand == 0) { if (alO <= 0.0) return false; P = ro + rd * uintBitsToFloat(g.x); Nn = octD(unpackHalf2x16(g.y)); return true; }
  if (uMode != 0 || alO > 0.999) return false;
  float tp, pm; planeAt(tp, Nn, pm);
  if (tp > 1e7 || (pm > 36.5 && pm < 37.5)) return false;
  P = ro + rd * tp; return true;
}
`,Ma=`
// the lights: 0 the window, 1 the sun, 2 the burner (a ring) or the hot plate, 3 the range's door
void lightDir(int li, vec3 p, out vec3 L, out float tmax, out float k) {
  vec4 W = uP[11];
  if (li == 0) { L = vec3(clamp(p.x, W.x + 4.0, W.y - 4.0), clamp(p.y, W.z + 4.0, W.w - 4.0), uP[12].y) - p; k = 5.0; }
  else if (li == 1) { L = uP[16].xyz * 90.0; k = 22.0; }
  else {
    vec3 hp = uP[14].xyz; float rr = uP[15].w;
    if (li == 3) { vec4 D = uP[24]; hp = vec3((D.x + D.y) * 0.5, (D.z + D.w) * 0.5, uP[12].w + 4.0); rr = 0.0; }
    vec2 dxz = p.xz - hp.xz; float dl = length(dxz);
    L = hp + vec3(dxz.x, 0.0, dxz.y) / max(dl, 1e-3) * min(dl, rr) - p; k = 4.0;
  }
  tmax = length(L); L /= tmax;
}
// uLi < 0: the ambient occlusion (5 taps along the normal) through the same distance-field call as the shadows
void main() {
  vec3 P, Nn; o = vec4(1.0);
  if (!candAt(P, Nn)) return;
  bool ao = uLi < 0;
  vec3 L = Nn; float tmax = 1.0, k = 1.0, res = 1.0, ts = 0.08, oc = 0.0, w = 1.0, tEnd = 1e9;
  if (!ao) { lightDir(uLi, P, L, tmax, k); tEnd = tmax - (uLi == 2 ? min(1.6, tmax * 0.5) : 0.0); }   // the flame wraps the burner head: no shadow from what it surrounds
  int nIt = ao ? 5 : uIt;
  for (int j = uZ; j < nIt; j++) {
    float h = 0.32 + 0.85 * float(j);
    vec2 dm = map(ao ? P + Nn * h : P + Nn * 0.04 + L * ts, 7);
    float hd = dm.y > 0.5 ? dm.x : 1e3;   // a bounding sphere is not a surface
    if (ao) { oc += w * max(h - hd, 0.0); w *= 0.6; }
    else {
      res = min(res, k * hd / ts); ts += uCand == 1 ? clamp(dm.x * 0.7, 0.06, dm.y > 0.5 ? 0.6 : 3.0) : clamp(dm.x, 0.06, dm.y > 0.5 ? 0.9 : 3.0);   // short steps on the planes: a coarse march rings round an occluder
      if (res < 0.004 || ts > tEnd) break;
    }
  }
  o = vec4(ao ? clamp(1.0 - oc * 0.34, 0.0, 1.0) : clamp(res, 0.0, 1.0));
}
`,No=`
uniform highp usampler2D uG;
out uvec4 om;
uint p4(vec4 v) { uvec4 u = uvec4(clamp(v, 0.0, 1.0) * 255.0 + 0.5); return u.x | (u.y << 8) | (u.z << 16) | (u.w << 24); }
void matp(float m, vec3 p, inout vec3 n, out vec3 alb, out float rough, out vec3 F0, out vec3 em) {
  alb = vec3(0.5); rough = 0.6; F0 = vec3(0.04); em = vec3(0.0);
  float ty = uP[3].w, st = uP[10].x, wl = uP[10].y;
  vec3 kp = uP[3].xyz;
#ifndef PLANES
  if (m < 1.5 || (m > 4.5 && m < 5.5)) {
    vec3 q = kLoc(p);
    if (ty < 0.5) {
      float nn = fbm(q.xy * 0.21 + q.z * 0.13);
      alb = vec3(0.030, 0.027, 0.025) * (0.7 + 0.6 * nn) + vec3(0.035, 0.014, 0.005) * smoothstep(0.6, 0.8, fbm(q.xz * 0.3 + q.y * 0.2));
      rough = 0.42 + 0.2 * nn; F0 = vec3(0.05);
      n = normalize(n + (N4(q.xy * 0.9 + q.z * 0.5).rgb - 0.5) * 0.16);
    } else if (ty < 1.5) {
      alb = uP[5].rgb; F0 = vec3(0.05);
      float rl = length(q.xz);
      vec4 n1 = N4(q.xy * 0.045 + q.zx * 0.031), n2 = N4(q.xy * 0.16 + q.zy * 0.11);
      // hand-dipped enamel is never flat or evenly wiped: the window's reflection wobbles across it
      rough = 0.05 + 0.11 * n1.g;
      n = normalize(n + (n1.rgb - 0.5) * 0.085 + (n2.rgb - 0.5) * 0.02);
      float rdy = uP[4].w, rR = uP[26].w; vec2 tipK = vec2(uP[18].w, uP[19].w);
      if ((m < 1.5 && q.y > 13.3 + rdy && rl < rR + 0.25) || (m > 4.5 && rl > rR - 0.3)) alb = vec3(0.02, 0.02, 0.024);
      alb *= 0.88 + 0.2 * n1.r;
      if (m < 1.5) {
        // years on the gas: soot and scorch licking up from the base, chips down to black iron with a rusty lip,
        // a crust of scale under the spout
        float soot = smoothstep(3.4 + 3.8 * n2.r, 0.9, q.y);
        alb = mix(alb, vec3(0.03, 0.023, 0.018), soot * 0.9); rough = mix(rough, 0.6, soot);
        // chips only where it has been knocked (the base rim, the lid's rim, the spout's lip, round the lugs), each
        // its own size: black iron, a step of dark ground coat where the glass broke, a brown rust halo
        float ez = max(max(smoothstep(2.2, 0.8, q.y), smoothstep(0.8, 0.2, abs(q.y - 14.1 - rdy)) * smoothstep(rR + 0.95, rR + 0.25, rl)), max(smoothstep(1.8, 0.7, length(q.xy - tipK)), smoothstep(1.3, 0.5, length(vec2(abs(q.x) - 7.3, q.y - 13.1 - min(rdy, 0.0) * 0.83)))));
        float cn = N4(vec2(at2(q.z, q.x) * 1.9, q.y * 0.23) + 0.21).g * 0.62 + N4(q.xy * 0.31 + q.zy * 0.23 + 0.5).b * 0.38;
        float ck = cn * (0.5 + 0.62 * ez);
        float chip = smoothstep(0.735, 0.75, ck), stp = smoothstep(0.712, 0.727, ck) * (1.0 - chip), lip = smoothstep(0.655, 0.712, ck) * (1.0 - chip - stp);
        alb = mix(alb, vec3(0.2, 0.08, 0.03), lip * 0.65);
        alb = mix(alb, vec3(0.09, 0.1, 0.12), stp);
        alb = mix(alb, vec3(0.028, 0.022, 0.02), chip); rough = mix(rough, 0.65, max(chip, max(stp * 0.6, lip * 0.5)));
        float sc = smoothstep(3.0, 1.0, length(q.xy - tipK)) * smoothstep(0.42, 0.7, n2.b);
        alb = mix(alb, vec3(0.6, 0.58, 0.52), sc * 0.65); rough = mix(rough, 0.7, sc);
      }
    } else if (ty < 2.5) {
      float nn = fbm(q.xy * 0.15 + q.z * 0.11);
      // old copper: opaque, tarnished warm brown-pink, hammered into small facets that each catch the light
      alb = vec3(0.05, 0.022, 0.012); F0 = vec3(0.8, 0.5, 0.36) * (0.8 + 0.25 * nn); rough = 0.24 + 0.14 * nn;
      float tar = smoothstep(0.38, 0.7, fbm(q.xz * 0.2 + q.y * 0.15 + 3.1));
      F0 = mix(F0, vec3(0.36, 0.2, 0.13), tar * 0.75); rough += tar * 0.2;
      vec2 hc = q.xy * 0.9 + q.zx * 0.6; vec2 hf = fract(hc) - 0.5 + (N4(floor(hc) * 0.173).rg - 0.5) * 0.5;
      n = normalize(n + vec3(hf.x, hf.y, -hf.x) * 0.16 * (1.0 - tar * 0.5) + (N4(q.xy * 0.5 + q.zx * 0.37).rgb - 0.5) * 0.03);
    } else { alb = vec3(0.0); F0 = vec3(0.63, 0.63, 0.645); rough = 0.08 + 0.05 * N4(q.xz * 0.2).r; }
  } else if (m < 2.5) {
    if (ty < 0.5) { alb = vec3(0.028); rough = 0.5; }
    else if (ty < 1.5) { alb = vec3(0.0); F0 = vec3(0.5, 0.5, 0.52) * (0.75 + 0.35 * N4(p.xy * 0.3).r); rough = 0.3 + 0.2 * N4(p.xy * 0.17 + p.z * 0.1).g; }   // the steel bail and washer
    else if (ty < 2.5) { alb = vec3(0.0); F0 = vec3(0.9, 0.7, 0.38); rough = 0.25; }
    else { alb = vec3(0.016); rough = 0.35; }
  } else if (m < 3.5) {
    if (ty > 1.5 && ty < 2.5) { vec3 q = kLoc(p); alb = vec3(0.30, 0.15, 0.065) * (0.7 + 0.5 * N4(vec2(q.x * 0.5, q.y * 3.0 + q.z * 3.0)).r); rough = 0.4; }
    else if (ty > 0.5 && ty < 1.5) { vec3 q = kLoc(p); alb = uP[26].rgb * (0.8 + 0.4 * N4(vec2(q.x * 0.6, q.y * 2.0 + q.z)).r); rough = 0.38; }   // the turned grip and the knob
    else { alb = vec3(ty < 0.5 ? 0.03 : 0.018); rough = 0.25; }
  } else if (m < 4.5) { alb = vec3(0.004); rough = 0.15; }
  else if (m < 6.5) { alb = vec3(0.016); rough = 0.35; }
  else if (m < 12.5) {
    float ct = uP[6].w; vec3 q = yawP(p - uP[6].xyz, vec2(cos(uP[7].w), sin(uP[7].w)));
    alb = uP[7].rgb; rough = 0.06; F0 = vec3(0.045);
    if (ct < 0.5) { if (m < 10.5 && q.y > 4.95 && q.y < 5.35) alb = vec3(0.08, 0.14, 0.42); if (m > 11.5 && length(q.xz) > 5.9 && length(q.xz) < 6.1) alb = vec3(0.08, 0.14, 0.42); }
    else if (ct < 1.5) { if (m < 10.5 && q.y < 6.6 + 0.6 * N4(vec2(at2(q.z, q.x) * 0.5, 0.2)).r) { alb = vec3(0.42, 0.2, 0.1) * (0.75 + 0.4 * fbm(q.xy * 0.5 + q.z)); rough = 0.75; } }
    else if (ct > 2.5) { alb *= 0.9 + 0.15 * smoothstep(0.45, 0.55, N4(q.xz * 0.3 + q.y * 0.4).g); }
  } else if (m < 13.5) { alb = vec3(0.01); rough = 0.03; }
  else if (m < 15.5) {
    float tt = uP[8].w; vec3 q = p - uP[8].xyz;
    vec4 tn = N4(q.xy * 0.06 + q.zx * 0.043);
    alb = uP[9].rgb * (0.72 + 0.56 * tn.r); rough = uP[9].w + 0.1 * tn.g; F0 = vec3(0.045);
    n = normalize(n + (tn.rgb - 0.5) * 0.07);
    if (q.y < 0.95) { alb = vec3(0.3, 0.2, 0.13); rough = 0.8; }   // the unglazed foot
    if (tt > 0.5 && tt < 1.5) { float b = abs(q.y - 6.0); if (b < 1.6) alb = mix(vec3(0.07, 0.12, 0.42), alb, smoothstep(0.8, 1.4, b + 0.4 * N4(vec2(at2(q.z, q.x) * 1.5, q.y * 0.3)).r)); if (abs(q.y - 3.0) < 0.25) alb = vec3(0.07, 0.12, 0.42); }
    if (tt > 1.5) { float sp = smoothstep(0.8, 0.9, N4(q.xy * 0.8 + q.z * 0.6).g); alb = mix(alb, vec3(0.08, 0.06, 0.05), sp); }
  } else if (m < 16.5) { alb = uP[9].rgb * 0.8; rough = 0.2; }
  else if (m < 20.5) { alb = vec3(0.028, 0.027, 0.026) * (0.8 + 0.4 * N4(p.xz * 0.3).r); rough = 0.65; }
  else if (m < 21.5) { alb = vec3(0.1, 0.095, 0.09); rough = 0.4; F0 = vec3(0.15); if (st > 1.5) { alb = vec3(0.0); F0 = vec3(0.55, 0.53, 0.5); rough = 0.3; } }
  else if (m < 22.5) { alb = vec3(0.016); rough = 0.18; if (st > 0.5) { alb = vec3(0.025); rough = 0.4; } }
  else if (m < 24.5) { alb = vec3(0.0); F0 = vec3(0.72, 0.71, 0.68); rough = 0.12; if (st > 1.5) { F0 = vec3(0.8, 0.62, 0.32); rough = 0.25; } }
  else if (m < 25.5) {
    alb = vec3(0.03); rough = 0.45; vec4 D = uP[24];
    if (n.z > 0.7 && p.x > D.x && p.x < D.y && p.y > D.z && p.y < D.w) { alb = vec3(0.07, 0.035, 0.015); rough = 0.12; em = vec3(1.0, 0.42, 0.1) * 0.6 * (0.6 + 0.6 * smoothstep(D.w, D.z, p.y)); }
    else if (n.z > 0.7) { float e = min(min(p.x - D.x, D.y - p.x), min(p.y - D.z, D.w - p.y)); if (e > -1.2 && e < 0.0) { alb = vec3(0.0); F0 = vec3(0.6, 0.58, 0.55); rough = 0.2; } }
  } else if (m < 27.5) {
    alb = uP[18].rgb * (0.85 + 0.25 * N4(p.xy * 0.2).r); rough = 0.45;
    float wear = smoothstep(0.62, 0.75, N4(p.xz * 0.4 + p.y * 0.7).g) * smoothstep(5.0, 7.0, p.y);
    alb = mix(alb, vec3(0.35, 0.33, 0.3), wear); rough = mix(rough, 0.3, wear);
  }
#else
  if (m < 30.5) {
    if (st < 0.5) {
      alb = uP[18].rgb * (0.93 + 0.1 * N4(p.xz * 0.05).r); rough = 0.13 + 0.2 * N4(p.xz * 0.11 + 0.4).g; F0 = vec3(0.05);
      float d1 = length(p.xz - kp.xz), d2 = length(p.xz - kp.xz + vec2(27.0, 13.0));
      if (min(d1, d2) < 8.0) { alb = vec3(0.022); rough = 0.42; }
      alb *= 1.0 - 0.25 * smoothstep(13.0, 8.0, min(d1, d2)) * N4(p.xz * 0.15).r;
    } else {
      alb = vec3(0.03, 0.029, 0.028) * (0.75 + 0.5 * fbm(p.xz * 0.08)); rough = 0.4;
      for (int i = uZ; i < 2; i++) {
        float d = length(p.xz - (i == 0 ? kp.xz : kp.xz + vec2(-26.0, -9.0)));
        float gr = min(abs(d - 6.3), abs(d - 10.2));
        alb *= mix(0.35, 1.0, smoothstep(0.0, 0.35, gr));
        if (i == 0) em += vec3(1.0, 0.32, 0.06) * smoothstep(0.35, 0.0, gr) * 0.5 * smoothstep(12.0, 5.0, d);
      }
      if (p.z > uP[12].w - 2.0) { alb = vec3(0.0); F0 = vec3(0.65, 0.63, 0.6); rough = 0.18; }
    }
  } else if (m < 31.5) {
    if (st > 1.5) {
      float pl = fract(p.z / 14.0 + 0.3), id = floor(p.z / 14.0 + 0.3);
      alb = vec3(0.30, 0.19, 0.10) * (0.7 + 0.5 * fbm(vec2(p.x * 0.012 + id * 0.37, p.z * 0.3))) * (0.85 + 0.3 * fract(sin(id * 91.7) * 437.5));
      alb *= smoothstep(0.0, 0.025, pl) * smoothstep(1.0, 0.975, pl) * 0.75 + 0.25;
      rough = 0.6;
    } else {
      float id = floor(p.z / 4.3);
      alb = vec3(0.44, 0.28, 0.15) * (0.7 + 0.5 * fbm(vec2(p.x * 0.015 + id * 0.41, p.z * 0.5))) * (0.85 + 0.3 * fract(sin(id * 73.1) * 437.5));
      rough = 0.45;
      if (abs(p.x - uP[12].z) < 0.35) alb *= 0.2;
    }
  } else if (m < 32.5) {
    if (st < 0.5) { alb = uP[18].rgb * 0.93; rough = 0.12; F0 = vec3(0.05); if (p.y > -1.6) { alb = vec3(0.0); F0 = vec3(0.7); rough = 0.1; } if (abs(p.y + 15.5) < 0.25) alb *= 0.3; }
    else if (st < 1.5) { alb = vec3(0.028) * (0.8 + 0.4 * fbm(p.xy * 0.07)); rough = 0.45; if (p.y > -1.2) { alb = vec3(0.0); F0 = vec3(0.62, 0.6, 0.58); rough = 0.2; } }
    else { alb = vec3(0.28, 0.17, 0.09) * (0.7 + 0.5 * fbm(vec2(p.x * 0.01, p.y * 0.4))); rough = 0.6; }
  } else if (m < 33.5) {
    if (st > 1.5) { alb = vec3(0.28, 0.17, 0.09) * (0.7 + 0.5 * fbm(vec2(p.x * 0.01, p.y * 0.4))); rough = 0.6; }
    else { alb = uP[19].rgb * vec3(0.7, 0.8, 0.75) * 0.8; rough = 0.35; if (p.y > -5.5) { alb = vec3(0.42, 0.27, 0.14); } }
  } else if (m < 35.5) {
    vec3 wc = uP[19].rgb;
    if (wl < 0.5) { alb = wc * (0.86 + 0.22 * fbm(p.xy * 0.018) + 0.06 * N4(p.xy * 0.4).r); rough = 0.9; n = normalize(n + vec3((N4(p.xy * 0.3).rg - 0.5) * 0.08, 0.0)); }
    else if (wl < 1.5 && m < 34.5) {
      vec2 tc = vec2(p.x / 15.0 + 0.5 * mod(floor(p.y / 7.5), 2.0), p.y / 7.5);
      vec2 f = fract(tc) - 0.5, e = (0.5 - abs(f)) * vec2(15.0, 7.5);
      float g = min(e.x, e.y);
      vec4 th = N4(floor(tc) * 0.37 + 0.11);
      float gz = smoothstep(0.09, 0.2, g);
      alb = mix(wc * vec3(0.74, 0.73, 0.7) * (0.82 + 0.36 * N4(p.xy * 0.7).r), wc * (0.9 + 0.14 * th.r) * mix(vec3(1.0, 0.985, 0.95), vec3(0.965, 0.985, 1.0), th.g), gz);
      rough = mix(0.85, 0.07 + 0.13 * N4(p.xy * 0.05).g, gz); F0 = vec3(0.05);
      vec2 bv = (e.x < e.y ? vec2(sign(f.x), 0.0) : vec2(0.0, sign(f.y))) * smoothstep(1.1, 0.15, g) * gz;
      n = normalize(n + vec3(bv, 0.0) * 0.3 + vec3(th.ba - 0.5, 0.0) * 0.08 + vec3(N4(p.xy * 0.06).rg - 0.5, 0.0) * 0.05);
    } else if (wl < 2.5 && m < 34.5) {
      float b = fract(p.x / 10.5); alb = wc * (0.9 + 0.12 * fbm(vec2(p.x * 0.05, p.y * 0.01)));
      alb *= mix(0.35, 1.0, smoothstep(0.0, 0.03, b) * smoothstep(1.0, 0.97, b)); rough = 0.55;
      n = normalize(n + vec3(smoothstep(0.06, 0.0, b) - smoothstep(0.94, 1.0, b), 0.0, 0.0) * 0.5);
    } else if (wl > 2.5 && m < 34.5) {
      float v = fract(p.y / 19.0), id = floor(p.y / 19.0);
      float lg = smoothstep(0.03, 0.12, v) * smoothstep(0.97, 0.88, v);
      alb = mix(vec3(0.2, 0.17, 0.13), vec3(0.3, 0.18, 0.095) * (0.65 + 0.6 * fbm(vec2(p.x * 0.012 + id * 0.37, v * 2.0 + id))), lg); rough = 0.8;
      n = normalize(n + vec3(0.0, (0.5 - v) * 2.4 * lg, 0.0));
    } else { alb = wl > 2.5 ? vec3(0.34, 0.22, 0.12) * (0.75 + 0.4 * fbm(p.zy * 0.05)) : wc * 1.03 * (0.9 + 0.15 * fbm(p.zy * 0.03)); rough = 0.85; }
  } else if (m < 36.5) { alb = st > 1.5 ? vec3(0.3, 0.19, 0.1) : vec3(0.8, 0.78, 0.72); rough = 0.4; }
  else if (m < 38.5) { alb = st > 1.5 ? vec3(0.33, 0.21, 0.11) * (0.75 + 0.4 * fbm(vec2(p.x * 0.02, p.z * 0.3))) : vec3(0.78, 0.76, 0.7); rough = 0.4; }
  else { alb = vec3(0.06, 0.04, 0.025); rough = 0.7; }
#endif
}
void main() {
  uvec4 g = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
  vec3 ro = uP[0].xyz, rd = camRay(), p, n; float m;
  om = uvec4(0u);
#ifdef PLANES
  float tp; planeAt(tp, n, m);
  if (tp > 1e7 || (g.w > 0u && unpackHalf2x16(g.z).y > 0.999)) return;
  p = ro + rd * tp;
#else
  if (g.w == 0u) return;
  p = ro + rd * uintBitsToFloat(g.x); n = octD(unpackHalf2x16(g.y)); m = unpackHalf2x16(g.z).x;
#endif
  vec3 alb, F0, em; float rough, oc = 1.0;
  matp(m, p, n, alb, rough, F0, em);
  if (m < 29.5 && p.y > -0.1 && p.y < 3.0 && n.y < 0.6) oc = mix(0.55, 1.0, clamp(p.y / 3.0, 0.0, 1.0));
  if (m > 29.5 && m < 31.5) oc = 0.55 + 0.45 * smoothstep(0.0, 9.0, p.z - uP[12].x);
  if (m > 33.5 && m < 34.5) oc = 0.6 + 0.4 * smoothstep(0.0, 9.0, p.y);
  om = uvec4(p4(vec4(sqrt(alb), rough)), p4(vec4(sqrt(F0), m / 255.0)), packHalf2x16(octE(n)), p4(vec4(sqrt(em * 0.5), oc)));
}
`,_o=`
uniform highp usampler2D uG, uM;
uniform sampler2D uE, uT, uA, uSO, uSP;
uniform int uCand;
out vec4 o;
ivec2 fcI;
vec4 u4(uint x) { return vec4(uvec4(x, x >> 8, x >> 16, x >> 24) & 255u) / 255.0; }
float edgeI(vec3 a, vec3 b, vec3 n) { float c = clamp(dot(a, b), -0.9999, 0.9999); vec3 x = cross(a, b); return acos(c) * dot(n, x / max(length(x), 1e-6)); }
float ffRect(vec3 p, vec3 n) {
  vec4 W = uP[11] + vec4(3.0, -3.0, 3.0, -3.0); float GZ = uP[12].y;
  vec3 v0 = normalize(vec3(W.x, W.z, GZ) - p), v1 = normalize(vec3(W.y, W.z, GZ) - p), v2 = normalize(vec3(W.y, W.w, GZ) - p), v3 = normalize(vec3(W.x, W.w, GZ) - p);
  float s = edgeI(v0, v1, n) + edgeI(v1, v2, n) + edgeI(v2, v3, n) + edgeI(v3, v0, n);
  return max(0.0, -s) / (2.0 * PI);
}
vec3 gR;
vec3 lightE(int li, vec3 p, vec3 n, out vec3 L) {
#ifdef HEAT
  vec3 hp = uP[14].xyz; float rr = uP[15].w;
  if (li == 1) { vec4 D = uP[24]; hp = vec3((D.x + D.y) * 0.5, (D.z + D.w) * 0.5, uP[12].w + 4.0); rr = 0.0; }
  vec2 dxz = p.xz - hp.xz; float dl = length(dxz);
  L = hp + vec3(dxz.x, 0.0, dxz.y) / max(dl, 1e-3) * min(dl, rr) - p; float d2 = dot(L, L); L *= inversesqrt(d2);
  return uP[15].rgb * uP[14].w * (li == 1 ? 0.5 : 1.0) * clamp((dot(n, L) + 0.3) / 1.3, 0.0, 1.0) / (d2 + 3.0);
#else
  vec4 W = uP[11]; float GZ = uP[12].y;
  if (li == 0) { vec3 q = p + gR * ((GZ - p.z) / min(gR.z, -0.03)); L = normalize(vec3(clamp(q.x, W.x + 4.0, W.y - 4.0), clamp(q.y, W.z + 4.0, W.w - 4.0), GZ) - p); return uP[13].rgb * ffRect(p, n); }
  L = uP[16].xyz;
  vec3 a = p + L * ((uP[12].x - p.z) / L.z), g = p + L * ((GZ - p.z) / L.z);
  float ap = smoothstep(W.x - 1.0, W.x + 1.0, a.x) * smoothstep(W.y + 1.0, W.y - 1.0, a.x) * smoothstep(W.z - 1.0, W.z + 1.0, a.y) * smoothstep(W.w + 1.0, W.w - 1.0, a.y) * paneMask(g.xy) * step(GZ + 0.5, p.z);
  return vec3(1.0, 0.8, 0.58) * uP[16].w * max(dot(n, L), 0.0) * ap;
#endif
}
#ifndef HEAT
// the garden as reflections see it: soft bands, no detail
vec3 skyC(vec3 rd) {
  float wt = uP[10].z, nt = uP[13].w; vec3 wr = uP[13].rgb;
  float ay = rd.y / max(-rd.z, 0.05) + 0.03;
  vec3 sky = wr * 0.95, far = wr * vec3(0.3, 0.33, 0.38), grd = wr * 0.85;
  if (wt > 1.5 && wt < 2.5) { far = wr * vec3(0.3, 0.33, 0.31); grd = wr * vec3(0.4, 0.43, 0.38); }
  if (wt > 2.5) { sky = vec3(2.6, 2.75, 3.1); far = vec3(0.9, 0.95, 1.1); grd = vec3(3.3, 3.0, 2.65); }
  if (nt > 0.5) { sky = vec3(0.035, 0.05, 0.1); far = vec3(0.01, 0.014, 0.026); grd = vec3(0.06, 0.08, 0.135); }
  vec3 c = mix(grd, sky, smoothstep(-0.02, 0.07, ay));
  c = mix(c, far, 0.75 * exp(-(ay - 0.045) * (ay - 0.045) / 0.0012));
  return c * 0.5;
}
// what a reflected ray sees, in one lookup: the window softened by roughness and distance, the wall round it,
// the counter, or the room behind the camera
vec3 envRad(vec3 p, vec3 rd, float rough) {
  vec4 W = uP[11]; float GZ = uP[12].y;
  vec3 amb = uP[23].rgb, wr = uP[13].rgb;
  if (rd.z < -0.02) {
    float t2 = (GZ - p.z) / rd.z;
    vec3 g = p + rd * t2;
    float hw = 0.6 + rough * t2 * 1.6, up = smoothstep(-hw, hw, g.y);
    if (t2 > 0.0 && up > 0.0) {
      vec2 M = uP[25].xy;
      float sw = 0.4 + rough * t2 * 0.45;
      float dx = min(g.x - W.x, W.y - g.x), dy = min(g.y - W.z, W.w - g.y), dm = min(dx, dy);
      float pmS = smoothstep(-sw, sw, min(dm - 3.4, min(abs(g.x - M.x), abs(g.y - M.y)) - 1.1));
      float fw = smoothstep(-sw, sw, dm);
      vec3 fr = uP[19].rgb * (amb * 3.5 + wr * 0.12);
      vec3 wall = uP[19].rgb * (amb * 2.2 + wr * 0.03 * smoothstep(60.0, 0.0, -dm));
      vec3 wc = mix(wall, mix(fr, skyC(rd), pmS), fw);
      if (rd.y < 0.0 && up < 1.0) { float tc = -p.y / rd.y; vec3 qc = p + rd * tc; wc = mix(uP[20].rgb * (amb * 2.0 + wr * 0.07 * smoothstep(20.0, -20.0, qc.z)), wc, up); }
      return wc;
    }
  }
  // the counter and the room meet softly too: the old hard edge at the horizon read as a liquid level in shiny kettles
  float wy = 0.03 + rough * 0.45, hy = smoothstep(-wy, wy, rd.y);
  float tc = rd.y < -1e-4 ? -p.y / rd.y : 1e4; vec3 qc = p + rd * tc;
  vec3 ctr = uP[20].rgb * (amb * 2.0 + wr * 0.07 * smoothstep(20.0, -20.0, qc.z)), rm = amb * 1.2;
  if (rd.z > 0.0) { float t = (260.0 - p.z) / rd.z; vec3 q = p + rd * t; float b = smoothstep(-240.0, -220.0, q.x) * smoothstep(-50.0, -70.0, q.x) * smoothstep(0.0, 20.0, q.y) * smoothstep(180.0, 160.0, q.y); rm = mix(amb * vec3(1.1, 0.95, 0.8) * 1.6, uP[17].rgb * 17.0, b); }
  return mix(ctr, rm, hy);
}
#endif
void main() {
  fcI = ivec2(gl_FragCoord.xy);
  uvec4 g = texelFetch(uG, fcI, 0), M = texelFetch(uM, fcI, 0);
  vec3 ro = uP[0].xyz, rd = camRay(), p;
  float alO = g.w > 0u ? unpackHalf2x16(g.z).y : 0.0;
  vec4 AO = texelFetch(uA, fcI, 0), SO = texelFetch(uSO, fcI, 0), SL = texelFetch(uSP, fcI, 0);
  float occ; vec2 shv;
  if (uCand == 1) {
    o = vec4(0.0);
    float tp, pm; vec3 pn; planeAt(tp, pn, pm);
    if (tp > 1e7 || alO > 0.999) return;
    p = ro + rd * tp; occ = AO.g;
#ifdef HEAT
    shv = SL.ba;
#else
    shv = SL.rg;
#endif
  } else {
    if (alO <= 0.0) { o = uMode == 0 ? texelFetch(uT, fcI, 0) : vec4(0.0); return; }
    p = ro + rd * uintBitsToFloat(g.x); occ = AO.r;
#ifdef HEAT
    shv = SO.ba;
#else
    shv = SO.rg;
#endif
  }
  vec4 m0 = u4(M.x), m1 = u4(M.y), m3 = u4(M.w);
  vec3 alb = m0.rgb * m0.rgb, F0 = m1.rgb * m1.rgb, n = octD(unpackHalf2x16(M.z)), em = m3.rgb * m3.rgb * 2.0;
  float rough = m0.a, m = floor(m1.a * 255.0 + 0.5);
  occ *= m3.a;
  vec3 col = vec3(0.0);
  bool gp = m > 36.5 && m < 37.5;
#ifndef HEAT
  if (gp) col = dec(texelFetch(uE, fcI, 0).rgb);
#endif
  if (!gp) {
    vec3 V = -rd; float ndv = max(dot(n, V), 0.0);
    vec3 F = F0 + (1.0 - F0) * pow(1.0 - ndv, 5.0) * (1.0 - rough * 0.8);
    vec3 dif = vec3(0.0), spc = vec3(0.0);
#ifdef HEAT
    int nl = uP[10].x > 0.5 && uP[10].x < 1.5 ? 2 : 1;
#else
    int nl = uP[16].w > 0.0 ? 2 : 1;
#endif
    gR = reflect(rd, n);
    for (int li = uZ; li < nl; li++) {
      vec3 L, E = lightE(li, p, n, L) * (li == 0 ? shv.x : shv.y);
      dif += E;
      float rr = rough, wk = 1.0;
#ifndef HEAT
      if (li == 0) { rr = max(rough, 0.3); wk = 0.55 * smoothstep(0.1, 0.3, rough); }
#endif
      { vec3 Hh = normalize(L + V); float nh = max(dot(n, Hh), 0.0), a2 = max(rr * rr, 0.003); a2 *= a2; float dd = nh * nh * (a2 - 1.0) + 1.0; spc += E * F * a2 / (PI * dd * dd) * 0.25 / max(ndv, 0.25) * wk * (li > 0 && m < 5.5 && abs(uP[3].w - 1.0) > 0.5 ? 0.3 : 1.0); }   // matte iron and old copper don't throw a hot rectangle of sun
    }
#ifdef HEAT
    col = alb * dif + spc + em;
#else
    dif += (uP[23].rgb * (0.65 + 0.35 * n.y) + uP[17].rgb * clamp(dot(n, normalize(vec3(-0.55, 0.45, 0.7))) * 0.75 + 0.25, 0.0, 1.0)) * occ;
    bool glass = m > 12.5 && m < 13.5;
    // one call site (each call compiles again on Windows): the glass looks through, everything else reflects
    vec3 env = envRad(glass ? p + rd * 0.5 : p + n * 0.05, glass ? normalize(rd + n * 0.12) : reflect(rd, n), glass ? 0.02 : rough);
    vec3 envG = env; if (glass) env = vec3(0.0);
    spc += F * env * mix(1.0, occ, 0.7);
    if (m > 33.5 && m < 34.5) {
      vec2 q = p.xy + gR.xy / max(gR.z, 0.05) * 290.0;
      float b = smoothstep(30.0, 85.0, q.x) * smoothstep(240.0, 170.0, q.x) * smoothstep(-25.0, 30.0, q.y) * smoothstep(215.0, 150.0, q.y);
      spc += F * uP[17].rgb * 10.0 * b * (1.0 - rough) * occ;
      dif += uP[20].rgb * uP[13].rgb * 0.11 * (1.0 - p.y / sqrt(p.y * p.y + 1600.0)) * occ;
    }
    col = alb * dif + spc;
    if (glass) col = envG * vec3(0.9, 0.94, 0.92) * (0.75 + 0.25 * ndv) + spc * 1.2;
#endif
  }
#ifdef HEAT
  float msk = (m > 10.5 && m < 11.5) || (m > 12.5 && m < 13.5) ? 1.0 : 0.0;
#else
  float msk = gp ? 1.0 : 0.0;
#endif
  if (uCand == 1) o = vec4(enc(col), msk);
  else if (uMode == 0) { vec4 bg = texelFetch(uT, fcI, 0); o = vec4(enc(mix(dec(bg.rgb), col, alO)), mix(bg.a, msk, alO)); }
  else o = vec4(enc(col), alO);
}
`,Fa=`
out vec4 o;
vec3 outside(vec3 g, vec3 rd) {
  float wt = uP[10].z, nt = uP[13].w, rare = uP[10].w;
  vec3 wr = uP[13].rgb; vec4 W = uP[11]; vec2 M = uP[25].xy;
  float ax = rd.x / max(-rd.z, 0.05), ay = rd.y / max(-rd.z, 0.05) + 0.03;
  float bl = 0.016;
  bool rain = wt > 1.5 && wt < 2.5;
  vec3 sky = wr * mix(0.95, 0.74, clamp(ay * 3.0, 0.0, 1.0));
  vec3 far = wr * vec3(0.22, 0.25, 0.31), near = wr * vec3(0.06, 0.064, 0.072), grd = wr * vec3(0.86, 0.9, 0.98);
  vec3 hedge = wr * vec3(0.045, 0.07, 0.055), fence = wr * vec3(0.12, 0.1, 0.085);
  if (rain) { far = wr * vec3(0.32, 0.36, 0.34); near = wr * vec3(0.07, 0.08, 0.07); grd = wr * vec3(0.3, 0.34, 0.26); hedge = wr * vec3(0.07, 0.1, 0.07); fence = wr * vec3(0.09, 0.08, 0.07); }
  if (wt > 2.5) { sky = mix(vec3(3.2, 3.0, 2.6), vec3(1.8, 2.2, 3.0), clamp(ay * 2.2 - 0.1, 0.0, 1.0)); far = vec3(0.5, 0.56, 0.78); near = vec3(0.09, 0.085, 0.1); grd = vec3(3.3, 3.0, 2.6); hedge = vec3(0.09, 0.14, 0.09); fence = vec3(0.3, 0.23, 0.17); }
  if (nt > 0.5) { sky = mix(vec3(0.045, 0.065, 0.13), vec3(0.012, 0.02, 0.045), clamp(ay * 3.0, 0.0, 1.0)); far = vec3(0.01, 0.014, 0.026); near = vec3(0.004, 0.005, 0.009); grd = vec3(0.06, 0.08, 0.135); hedge = near; fence = near * 1.6; }
  vec3 cap = rain ? fence : grd * 1.04;
  vec3 col = sky;
  // the far treeline, dusted with snow on top
  float t1 = 0.085 + 0.06 * N4(vec2(ax * 0.5, 0.13)).r + 0.03 * N4(vec2(ax * 1.9, 0.41)).g + 0.025 * (N4(vec2(ax * 7.0, 0.9)).r - 0.5);
  col = mix(col, far, smoothstep(t1 + bl, t1 - bl, ay));
  // a bare tree nearer by, out of focus
  float tx = ax - uP[27].w, tw = 0.022 + 0.01 * smoothstep(0.2, -0.05, ay);
  float br = pow(1.0 - abs(N4(vec2(ax * 3.2, ay * 2.3)).r * 2.0 - 1.0), 10.0) * smoothstep(0.42, 0.04, abs(tx)) * smoothstep(0.06, 0.2, ay);
  float trunk = smoothstep(tw + 0.012, tw - 0.012, abs(tx + 0.03 * ay));
  col = mix(col, near * 1.15, clamp(trunk + br * 0.65, 0.0, 1.0));
  // the garden fence: weathered boards with a cap of snow; round evergreen shrubs along its foot; the lawn under snow,
  // drifted, blue in the hollows and in the fence's shade, with dead stalks of last summer's flowers poking through
  float fy = 0.026 + 0.006 * N4(vec2(ax * 0.6, 0.55)).r, fb = fy - 0.05;
  float bd = abs(fract(ax * 34.0 + 0.3) - 0.5);
  vec3 fc = fence * (0.8 + 0.4 * N4(vec2(floor(ax * 34.0 + 0.3) * 0.37, 0.2)).r) * mix(0.35, 1.0, smoothstep(0.42, 0.36, bd));
  col = mix(col, fc, smoothstep(fy + 0.004, fy, ay) * smoothstep(fb - 0.004, fb, ay));
  col = mix(col, cap, smoothstep(0.0045, 0.0015, abs(ay - fy - 0.002)));
  float gs = N4(vec2(ax * 3.0, ay * 14.0)).g, gy = smoothstep(fb + 0.002, fb - 0.002, ay);
  vec3 snow = grd * (0.78 + 0.22 * gs) * mix(vec3(0.8, 0.87, 1.0), vec3(1.0), smoothstep(0.3, 0.7, gs)) * mix(0.72, 1.0, smoothstep(fb - 0.004, fb - 0.035, ay));
  col = mix(col, rain ? grd * (0.8 + 0.3 * gs) : snow, gy);
  float sx = ax * 55.0, si = floor(sx), h1 = fract(sin(si * 91.7) * 437.5), h2 = fract(h1 * 17.3), sb = fb - 0.006 - 0.03 * h2;
  float stalk = step(0.55, h1) * smoothstep(0.16, 0.06, abs(fract(sx) - 0.5 + (ay - sb) * 40.0 * (h1 - 0.77))) * step(sb, ay) * step(ay, sb + 0.008 + 0.014 * h1);
  col = mix(col, near * 1.6, stalk * gy * (rain ? 0.0 : 0.4));
  float cx = ax * 5.0 + 0.37, ci = floor(cx), cf = fract(cx) - 0.5, r1 = fract(sin(ci * 37.3) * 951.7), hw = 0.3 + 0.16 * r1;
  float shT = fb + 0.004 + (0.022 + 0.03 * r1) * sqrt(max(0.0, 1.0 - cf * cf / (hw * hw)));
  float shm = step(0.3, fract(r1 * 7.1)) * step(abs(cf), hw) * step(fb - 0.006, ay) * smoothstep(shT + 0.004, shT - 0.004, ay + 0.008 * (N4(vec2(ax * 18.0, ay * 20.0)).r - 0.5));
  col = mix(col, mix(hedge * (0.6 + 0.8 * N4(vec2(ax * 22.0, ay * 25.0)).r), cap, rain ? 0.0 : smoothstep(shT - 0.009, shT - 0.001, ay) * 0.85), shm);
  if (wt > 2.5) { vec2 sd = vec2(ax - 0.5, ay - 0.45); float r2 = dot(sd, sd); col += vec3(3.0, 2.3, 1.4) * (exp(-r2 / 0.025) * 1.6 + exp(-r2 / 0.18) * 0.22); }
  if (nt > 0.5) { vec2 wq = vec2(ax + 0.22, ay - 0.012); col += vec3(1.6, 0.9, 0.35) * 0.5 * smoothstep(0.012, 0.004, max(abs(wq.x), abs(wq.y) * 1.4)); }
  // snow on the outer ledge
  float ledge = W.z + 3.0 + 1.6 * N4(vec2(g.x * 0.05, 0.3)).r;
  if (!(wt > 1.5 && wt < 2.5)) col = mix(col, nt > 0.5 ? vec3(0.08, 0.1, 0.17) : (wt > 2.5 ? vec3(3.4, 3.15, 2.8) : wr * vec3(0.97, 1.0, 1.05)) * (0.85 + 0.15 * smoothstep(ledge - 3.0, ledge, g.y)), smoothstep(ledge, ledge - 0.7, g.y));
  if (wt < 0.5) {
    float dx = min(g.x - W.x, W.y - g.x), dy = min(g.y - W.z, W.w - g.y);
    float e = min(min(dx, dy), min(abs(g.x - M.x), abs(g.y - M.y))) - 3.0 + (g.y - W.z) * 0.06;
    float n1 = fbm(g.xy * 0.03);
    float m = smoothstep(11.0, 0.5, e + (n1 - 0.5) * 12.0);
    vec2 fq = g.xy * 0.085 + vec2(n1 * 1.3, n1 * 0.7);
    float f1 = pow(1.0 - abs(N4(fq).g * 2.0 - 1.0), 7.0), f2 = pow(1.0 - abs(N4(fq * 2.3 + 0.4).b * 2.0 - 1.0), 9.0), f3 = pow(1.0 - abs(N4(fq * 5.1 + 0.2).r * 2.0 - 1.0), 12.0);
    float fr = clamp(m * m * 0.3 + m * (0.8 * f1 + 0.6 * f2 + 0.5 * f3), 0.0, 1.0);
    col = mix(col, (nt > 0.5 ? vec3(0.07, 0.09, 0.15) : wr * vec3(0.95, 0.98, 1.04)) * (0.5 + 0.5 * f1 + 0.3 * f2 + 0.25 * f3) * mix(vec3(0.9, 0.95, 1.05), vec3(1.0), f1), fr * 0.94);
  }
  if (wt > 1.5 && wt < 2.5) {
    vec2 cg = g.xy * 0.5, id = floor(cg), f = fract(cg) - 0.5;
    float h = fract(sin(dot(id, vec2(127.1, 311.7))) * 43758.5453);
    if (h > 0.5) {
      vec2 oo = (vec2(h, fract(h * 17.3)) - 0.5) * 0.5; float rr = 0.1 + 0.2 * fract(h * 7.7), dd = length(f - oo) / rr;
      if (dd < 1.0) col = mix(col, col * 0.5 + wr * 0.3 * smoothstep(0.7, 0.1, length(f - oo - vec2(-0.3, 0.35) * rr) / rr), 0.85 * smoothstep(1.0, 0.75, dd));
    }
  }
  return col * (nt > 0.5 ? 1.0 : uP[1].w);
}
void main() {
  vec3 ro = uP[0].xyz, rd = camRay();
  vec4 W = uP[11]; float GZ = uP[12].y;
  vec3 g = ro + rd * ((GZ - ro.z) / rd.z);
  if (g.x < W.x || g.x > W.y || g.y < W.z || g.y > W.w) { o = vec4(0.0); return; }
  float pe = paneE(g.xy), pm = smoothstep(-0.3, 0.3, pe);
  vec3 fr = uP[19].rgb * (uP[23].rgb * 3.5 + uP[13].rgb * 0.12) * (0.3 + 1.0 * smoothstep(-0.85, -0.15, pe));
  o = vec4(enc(pm > 0.01 ? mix(fr, outside(g, rd), pm) : fr), 1.0);
}
`,Ra=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uRA, uRH, uKA, uKH, uLA, uLH, uFog, uSt, uN;
uniform vec4 uF[20];
uniform vec4 uD[16];
vec3 dec(vec3 c) { return c * c * 4.0; }
vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
// a turn about a horizontal axis as this camera sees it: the screen's y is foreshortened by the view's elevation
vec2 rotS(vec2 v, float a, float s) { return rot(v * vec2(1.0, 1.0 / s), a) * vec2(1.0, s); }
float h21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
void main() {
  vec2 uv = vUv;
  float A = uF[2].x, H = uF[2].y, T = uF[2].z;
  vec4 ra = texture(uRA, uv), rh = texture(uRH, uv);
  vec3 col = dec(ra.rgb) * A + dec(rh.rgb) * H;
  // the window: weather outside, fog on the glass, drops running down it
  if (ra.a > 0.004) {
    vec4 G = uF[3]; vec2 gu = (uv - G.xy) / (G.zw - G.xy);
    vec4 P = uF[16];
    if (P.x > 0.5 && P.x < 1.5) {
      for (int k = 0; k < 3; k++) {
        float fk = float(k), sc = 8.0 + fk * 9.0;
        vec2 p = uv * sc; p.x += p.y * 0.35;
        p += vec2(sin(T * 0.37 + fk * 2.0 + uv.y * 4.0) * 0.45 + T * 0.12, T * (0.9 - 0.2 * fk));
        vec2 id = floor(p), f = fract(p) - 0.5; float h = h21(id + fk * 7.13);
        vec2 off = (vec2(h, fract(h * 13.7)) - 0.5) * 0.6;
        vec2 e = f - off; if (k == 0) e.y *= 0.42;
        float sz = k == 0 ? 0.055 : (0.02 + 0.05 * fract(h * 7.1)), r = length(e);
        col += ra.a * exp(-r * r / (sz * sz)) * step(0.4, h) * uF[12].rgb * A * (k == 0 ? 0.16 : 0.42) * P.y;
      }
    } else if (P.x > 1.5) {
      vec2 p = uv * vec2(70.0, 5.0) + vec2(uv.y * 6.0, T * 9.0); vec2 id = floor(p); float h = h21(id);
      float s = smoothstep(0.08, 0.0, abs(fract(p.x) - 0.5) - 0.02) * step(0.82, h) * smoothstep(0.0, 0.3, fract(p.y)) * smoothstep(1.0, 0.6, fract(p.y));
      col += ra.a * s * uF[12].rgb * A * 0.12 * P.y;
    }
    float f = texture(uFog, gu).r;
    // condensation scatters: the fogged glass shows the garden widely blurred, a little milky
    vec3 bl = vec3(0.0);
    for (int k = 0; k < 8; k++) { float a = float(k) * 2.39996 + 0.5, r = 0.011 + 0.0045 * float(k); bl += dec(texture(uRA, uv + vec2(cos(a), sin(a)) * r).rgb); }
    bl *= A / 8.0;
    vec3 fogC = bl * 0.78 + uF[12].rgb * 0.05 * A + dec(rh.rgb) * H * 0.5;
    col = mix(col, fogC, clamp(f * 1.05, 0.0, 0.76) * ra.a);
    for (int i = 0; i < 16; i++) {
      vec4 d = uD[i];
      if (d.w <= 0.0) continue;
      vec2 e = (uv - d.xy) / vec2(d.z, d.z * 1.2); float q = dot(e, e);
      if (q < 1.0) {
        float hh = sqrt(1.0 - q);
        vec3 rc = dec(texture(uRA, uv - e * d.z * 3.0).rgb) * A;
        vec3 dc = rc * (0.55 + 0.45 * hh) + uF[12].rgb * A * 0.9 * pow(max(dot(normalize(vec3(e, hh)), normalize(vec3(-0.35, 0.55, 0.75))), 0.0), 24.0);
        col = mix(col, dc, d.w * smoothstep(1.0, 0.75, q) * ra.a);
      }
    }
  }
  // tea in the cup
  vec4 W = uF[8], W2 = uF[9];
  if (rh.a > 0.01 && W2.x > 0.001) {
    vec2 e = (uv - W.xy) / W.zw; bool inE = dot(e, e) < 1.0;
    if (W2.w > 0.5) inE = inE || (uv.y < W.y && abs(e.x) < 1.0);
    if (inE) {
      vec3 tint = mix(vec3(0.93, 0.95, 0.96), vec3(0.62, 0.3, 0.08), W2.y);
      vec3 wc = col * tint * (W2.w > 0.5 ? 1.0 : 0.85);
      if (dot(e, e) < 1.0) wc += uF[19].rgb * A * (0.04 + 0.14 * smoothstep(-0.2, 1.0, e.y)) * (W2.w > 0.5 ? 0.5 : 1.0) + uF[19].rgb * A * 0.14 * smoothstep(0.75, 1.0, length(e)) * step(0.0, e.y);
      col = mix(col, wc, rh.a);
    }
  }
  // the tide ring the tea left on the cup's far wall
  if (uF[14].y > 0.0 && rh.a > 0.01) {
    vec2 e = (uv - uF[18].yz) / vec2(uF[18].w, uF[19].w); float l = length(e);
    col *= 1.0 - 0.32 * smoothstep(0.07, 0.0, abs(l - 0.985)) * smoothstep(-0.2, 0.3, e.y) * rh.a;
  }
  // the gas flame: a crown of separate small flames, one per port, each a pale inner cone in a faint violet-blue
  // mantle; they lean out and lengthen as the dial goes up. The far ones go behind the kettle, the near ones in front.
  vec4 F = uF[4], F2 = uF[5];
  vec3 accN = vec3(0.0), accF = vec3(0.0);
  if (F2.x > 0.003 && abs(uv.x - F.x) < F.z * 2.4 && uv.y > F.y - F.w * 2.2 && uv.y < F.y + F.w * 2.0 + F2.y * 1.5) {
    float g = F2.x;
    float spread = 1.0 + (F2.z > 0.5 ? 0.25 : 0.45) * smoothstep(0.5, 1.0, g);
    for (int i = 0; i < 22; i++) {
      float a = (float(i) + 0.5) / 22.0 * 6.2832;
      float fl = 0.8 + 0.4 * texture(uN, vec2(float(i) * 0.137, T * (F2.z > 0.5 ? 3.1 : 1.3))).r;
      vec2 b = F.xy + vec2(cos(a) * F.z, sin(a) * F.w) * spread;
      float h = F2.y * fl * (0.3 + 0.7 * g);
      vec2 dir = normalize(vec2(cos(a) * (0.5 + 0.8 * g) * spread, 1.0));
      vec2 rel = uv - b;
      float al = dot(rel, dir) / h, ac = dot(rel, vec2(dir.y, -dir.x)) / (h * 0.12);
      if (al < -0.2 || al > 1.2 || abs(ac) > 2.5) continue;
      float w = sqrt(max(al, 0.0)) * (1.0 - al) * 1.4 + 0.05;
      float e = exp(-ac * ac / max(w * w, 1e-3)) * smoothstep(-0.1, 0.06, al) * (1.0 - smoothstep(0.5, 1.0, al));
      float core = exp(-ac * ac / max(w * w * 0.22, 1e-3)) * smoothstep(0.0, 0.06, al) * (1.0 - smoothstep(0.12, 0.42, al));
      vec3 c = e * vec3(0.07, 0.13, 0.75) + core * vec3(0.5, 0.75, 1.25) + e * smoothstep(0.7, 0.95, al) * vec3(0.4, 0.12, 0.45);
      if (sin(a) < 0.0) accN += c; else accF += c;
    }
    float k = (0.35 + 0.9 * g) * F2.w;
    accN *= k; accF *= k;
    col += accF + accN * (1.0 - uF[14].z);
  }
  // the fire behind the range door's mica window
  vec4 M = uF[13];
  if (uF[14].x > 0.0 && uv.x > M.x && uv.x < M.z && uv.y > M.y && uv.y < M.w) {
    vec2 r = (uv - M.xy) / (M.zw - M.xy);
    float n1 = texture(uN, vec2(r.x * 0.7, r.y * 0.45 - T * 0.4)).r, n2 = texture(uN, vec2(r.x * 1.4 + 0.3, r.y * 0.9 - T * 0.75)).g;
    float fl = (n1 * 0.7 + n2 * 0.6) * (1.25 - r.y) * uF[14].x * 1.2 + smoothstep(0.35, 0.0, r.y) * 0.7 * uF[14].x * (0.6 + 0.5 * n2);
    fl *= smoothstep(0.0, 0.06, r.x) * smoothstep(1.0, 0.94, r.x) * smoothstep(1.0, 0.9, r.y);
    col += (vec3(1.0, 0.3, 0.05) * fl + vec3(1.0, 0.75, 0.35) * fl * fl * fl * 0.8) * 1.6;
  }
  // the kettle (tipped about its foot) and its lid
  vec4 K0 = uF[0], K1 = uF[1];
  vec2 kq = K0.xy + rotS(uv - K0.xy, K0.z, K0.w);
  vec4 ka = texture(uKA, kq);
  if (ka.a > 0.003) {
    vec3 kc = dec(ka.rgb);
    if (abs(K0.z) > 0.01) {
      vec4 k2 = texture(uKA, K0.xy + rotS(uv - K0.xy, K0.z * 0.35, K0.w));
      float l1 = dot(kc, vec3(0.3, 0.55, 0.15)), l2 = dot(dec(k2.rgb), vec3(0.3, 0.55, 0.15));
      kc *= mix(1.0, clamp((l2 + 0.01) / (l1 + 0.01), 0.35, 2.5), smoothstep(0.9, 1.0, min(ka.a, k2.a)) * smoothstep(0.01, 0.15, abs(K0.z)));
    }
    col = mix(col, kc * A + dec(texture(uKH, kq).rgb) * H, ka.a);
  }
  vec2 lq = K1.xy + rotS(kq - K1.xy - vec2(0.0, K1.w), -K1.z, K0.w);
  vec4 la = texture(uLA, lq);
  if (la.a > 0.003) col = mix(col, dec(la.rgb) * A + dec(texture(uLH, lq).rgb) * H, la.a);
  col += accN * uF[14].z;
  // the knob's pointer
  vec4 KN = uF[10];
  vec2 kd = (uv - KN.xy) / vec2(KN.z, KN.z * uF[15].x);
  if (dot(kd, kd) < 1.0) { vec2 r = rot(kd, -KN.w); float ln = smoothstep(0.13, 0.05, abs(r.x)) * smoothstep(0.1, 0.2, r.y) * smoothstep(0.88, 0.78, r.y); col = mix(col, vec3(0.75, 0.72, 0.66) * (A * 0.35 + 0.05), ln * 0.85); }
  // the pour
  vec4 S0 = uF[6], S1 = uF[7];
  if (S1.w > 0.001) {
    vec2 a = S0.xy, b = S0.zw, c = S1.xy; float w = S1.z;
    vec2 lo = min(min(a, b), c) - w * 2.0, hi = max(max(a, b), c) + w * 2.0;
    if (uv.x > lo.x && uv.y > lo.y && uv.x < hi.x && uv.y < hi.y) {
      float best = 1e9, bt = 0.0; vec2 pv = a;
      for (int i = 1; i <= 10; i++) {
        float t = float(i) / 10.0; vec2 pt = mix(mix(a, b, t), mix(b, c, t), t);
        vec2 pa = uv - pv, ba = pt - pv; float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); float d = length(pa - ba * hh);
        if (d < best) { best = d; bt = (float(i) - 1.0 + hh) / 10.0; }
        pv = pt;
      }
      float ww = w * (1.0 - 0.4 * bt) * (0.85 + 0.3 * texture(uN, vec2(bt * 2.0 - T * 3.0, 0.37)).r);
      if (best < ww) {
        float x = best / ww;
        vec3 rc = dec(texture(uRA, uv + vec2(x * ww * 2.0, 0.0)).rgb) * A;
        vec3 wc = rc * 0.9 + uF[12].rgb * A * (0.015 + 0.09 * pow(x, 4.0)) + uF[12].rgb * A * 0.1 * smoothstep(0.3, 0.0, abs(x - 0.45)) * texture(uN, vec2(bt * 6.0 - T * 5.0, 0.7)).g;
        col = mix(col, wc, S1.w * smoothstep(1.0, 0.8, x));
      }
    }
  }
  // steam: a coarse density, warped and detailed by noise, lit by the window behind it
  vec2 su = uv + (texture(uN, uv * 1.7 + vec2(0.0, -T * 0.04)).gb - 0.5) * 0.035;
  float d = texture(uSt, su).r;
  if (d > 0.003) {
    float det = texture(uN, su * vec2(2.6, 1.9) + vec2(T * 0.013, -T * 0.06)).r * 0.65 + texture(uN, su * 6.1 + vec2(-T * 0.02, -T * 0.14)).b * 0.5;
    float dd = max(d * (0.55 + 0.7 * det) - 0.05 * (1.1 - det), 0.0) * smoothstep(0.0, 0.12, d);   // thin edges thin out softly, no crinkled islands
    // steam is clear while it is still hot: right at the kettle it has not condensed yet
    float a = (1.0 - exp(-dd * uF[17].z)) * 0.9 * (1.0 - 0.7 * max(ka.a, la.a));
    float sh = texture(uSt, su + uF[17].xy).r;
    // the room behind the steam, widely blurred (three near taps printed the sill's bright edge across the plume as a flat line)
    vec3 bg = vec3(0.0); for (int k = 0; k < 6; k++) { float ang = float(k) * 1.0472 + 0.4; bg += dec(texture(uRA, su + vec2(cos(ang), sin(ang)) * 0.075).rgb); } bg *= A / 6.0;
    vec3 sc = uF[11].rgb * (1.0 - 0.5 * min(sh * 2.0, 1.0)) + bg * 0.6 + uF[12].rgb * 0.13 * uF[2].x * (1.0 - 0.6 * min(sh * 2.0, 1.0));
    col = mix(col, max(sc, col * 0.94), a);   // over the bright glass the steam is hardly seen, never a grey smudge
  }
  col *= uF[2].w;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
  vec2 vq = uv - 0.5; col *= 1.0 - dot(vq, vq) * 0.16;
  col += (h21(uv * uF[18].x + fract(T * 7.0)) - 0.5) * 0.007;
  o = vec4(col, 1.0);
}`;function So(n,q,a){const w=(l0,Q)=>{const y=n.createShader(l0);return n.shaderSource(y,Q),n.compileShader(y),y},b=n.createProgram(),K=w(n.VERTEX_SHADER,q),i0=w(n.FRAGMENT_SHADER,a);return n.attachShader(b,K),n.attachShader(b,i0),n.linkProgram(b),{p:b,u:{},sh:[K,i0]}}const Ft=["plane","geo","sh","matO","matP","litD","litH","ext","comp"];function qa(n){let q=qo.get(n);if(q)return q;const a=`#version 300 es
`,w={plane:a+K0+ka,geo:a+K0+Ao+za,sh:a+K0+Ao+Ea+Ma,matO:a+K0+No,matP:a+`#define PLANES 1
`+K0+No,litD:a+K0+_o,litH:a+`#define HEAT 1
`+K0+_o,ext:a+K0+Fa};q={vao0:n.createVertexArray(),ok:!1};for(const y of Ft)q[y]=y==="comp"?So(n,Ta,Ra):So(n,Pa,w[y]);n.flush();const b=128,K=(y,u,k,A)=>{y=(y%k+k)%k,u=(u%k+k)%k;let I=y*374761393+u*668265263+A*2246822519|0;return I=Math.imul(I^I>>>13,1274126177),I^=I>>>16,(I>>>0)/4294967296},i0=(y,u,k,A)=>{const I=Math.floor(y),a0=Math.floor(u),m0=y-I,c0=u-a0,q0=m0*m0*(3-2*m0),b0=c0*c0*(3-2*c0),ie=K(I,a0,k,A),X0=K(I+1,a0,k,A),P0=K(I,a0+1,k,A),Y=K(I+1,a0+1,k,A);return ie+(X0-ie)*q0+(P0-ie)*b0+(ie-X0-P0+Y)*q0*b0},l0=(y,u,k,A,I)=>{let a0=0,m0=.5,c0=k,q0=0;for(let b0=0;b0<A;b0++)a0+=m0*i0(y*c0/b,u*c0/b,c0,I+b0),q0+=m0,m0*=.5,c0*=2;return a0/q0},Q=new Uint8Array(b*b*4);for(let y=0;y<b;y++)for(let u=0;u<b;u++){const k=(y*b+u)*4;Q[k]=l0(u,y,4,4,11)*255,Q[k+1]=l0(u,y,8,3,23)*255,Q[k+2]=(i0(u*32/b,y*32/b,32,41)*.7+i0(u*64/b,y*64/b,64,43)*.3)*255,Q[k+3]=l0(u,y,16,2,77)*255}for(let y=0;y<4;y++){let u=255,k=0;for(let A=y;A<Q.length;A+=4)u=Math.min(u,Q[A]),k=Math.max(k,Q[A]);for(let A=y;A<Q.length;A+=4)Q[A]=(Q[A]-u)*255/Math.max(1,k-u)}return q.noise=n.createTexture(),n.bindTexture(n.TEXTURE_2D,q.noise),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,b,b,0,n.RGBA,n.UNSIGNED_BYTE,Q),n.generateMipmap(n.TEXTURE_2D),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.REPEAT),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.REPEAT),qo.set(n,q),q}function Aa(n,q){if(q.ok)return;q.ok=!0;for(const b of Ft){const K=q[b];if(!n.getProgramParameter(K.p,n.LINK_STATUS))throw new Error("056 link "+b+": "+n.getProgramInfoLog(K.p)+" "+n.getShaderInfoLog(K.sh[0])+" "+n.getShaderInfoLog(K.sh[1]))}for(const b of Ft){const K=q[b],i0=n.getProgramParameter(K.p,n.ACTIVE_UNIFORMS);for(let l0=0;l0<i0;l0++){const Q=n.getActiveUniform(K.p,l0);K.u[Q.name.replace(/\[0\]$/,"")]=n.getUniformLocation(K.p,Q.name)}}const a={uN:0,uG:2,uA:3,uE:4,uM:5,uT:6,uPB:7,uSO:8,uSP:9},w={plane:{},geo:{uN:0,uPr:1,uPB:7},sh:{uN:0,uPr:1,uG:2,uPB:7},matO:{uN:0,uG:2,uPB:7},matP:{uN:0,uG:2,uPB:7},litD:a,litH:a,ext:{uN:0},comp:{uRA:0,uRH:1,uKA:2,uKH:3,uLA:4,uLH:5,uFog:6,uSt:7,uN:8}};for(const b in w){n.useProgram(q[b].p);for(const K in w[b])q[b].u[K]&&n.uniform1i(q[b].u[K],w[b][K])}}function x0(n,q,a,w){const b=n.createTexture();return n.bindTexture(n.TEXTURE_2D,b),w==="r8"?n.texImage2D(n.TEXTURE_2D,0,n.R8,q,a,0,n.RED,n.UNSIGNED_BYTE,null):w==="rg8"?n.texImage2D(n.TEXTURE_2D,0,n.RG8,q,a,0,n.RG,n.UNSIGNED_BYTE,null):n.texImage2D(n.TEXTURE_2D,0,n.RGBA8,q,a,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),b}const Na=[{piv:[8.2,1.2],tip:[13.6,9.6],dir:[5.4,4.8],lidTop:14.9,ro:4.4,top:13,H:20.5,yaw:.42,water:.9,km:.7,lidA:.5},{piv:[10.4,.6],tip:[15.6,12.8],dir:[3.2,4.4],lidTop:16.85,ro:5.6,top:14.6,H:22.1,yaw:.42,water:1.2,km:.25,lidA:.36},{piv:[8.6,1.4],tip:[16.6,13.6],dir:[3.2,4],lidTop:17.95,ro:5.4,top:14.4,H:22.1,yaw:.42,water:1.2,km:.12,lidA:.4},{piv:[11.4,.5],tip:[14.8,11.8],dir:[1.5,1.7],lidTop:14.9,ro:4.6,top:13,H:19.5,yaw:.42,water:1.3,km:.2,lidA:.32},{piv:[11.6,.6],tip:[16.4,11],dir:[3,3.6],lidTop:13.95,ro:5.6,top:11.7,H:19.3,yaw:.42,water:1.2,km:.25,lidA:.36},{piv:[9,.5],tip:[14,15],dir:[2.2,3.4],lidTop:20.5,ro:4.6,top:18.6,H:21.6,yaw:.42,water:1,km:.25,lidA:.4}];Ro.add({num:56,name:"Kettle",fam:"Worlds",recipe:"An old stove by a frosty window in winter, with a kettle on the hob and a cup on the counter. The kettle sings and rolls. The time changes every mint. Drag the dial up or hold on the flame for heat, tap the lid to let steam out, drag kettle to cup to pour, tap the cup to drink it, or rub the window to wipe it.",interactive:"Drag the stove dial up (or hold on the flame) to turn up the heat, and down to let the boil subside. Tap the lid to lift it and let the steam out. Drag from the kettle toward the cup to tip it and pour; tap the cup to drink it down. Pour the kettle dry and turn the gas off, and it is topped up with cold water. Tap or rub the window to wipe the fog.",music:!0,gl:!0,fps:30,seed:0,make(n){const q=performance.now(),a=n.gl,w=n.size,b=qa(a),K=performance.now(),i0=n.hash.slice(2),l0=e=>{let t=parseInt(i0.slice(e,e+8),16)>>>0,o=parseInt(i0.slice(e+8,e+16),16)>>>0,c=parseInt(i0.slice(e+16,e+24),16)>>>0,s=parseInt(i0.slice(e+24,e+32),16)>>>0;const r=()=>{t>>>=0,o>>>=0,c>>>=0,s>>>=0;let l=t+o|0;return t=o^o>>>9,o=c+(c<<3)|0,c=c<<21|c>>>11,s=s+1|0,l=l+s|0,c=c+l|0,(l>>>0)/4294967296};for(let l=0;l<15;l++)r();return r},Q=l0(0),y=l0(16),u=l0(32),k=(e,t)=>{t=t||Q;let o=0;for(const s of e)o+=s[1];let c=t()*o;for(const s of e)if(c-=s[1],c<=0)return s[0];return e[e.length-1][0]};let A=k([["Cast iron tetsubin",24],["Red enamel",16],["Cream enamel",14],["Blue enamel",14],["Copper",22],["Whistling kettle",10]]),I=k([["Gas hob",44],["Wood-burning range",34],["Camp stove in a cabin",22]]),a0=k([["Frost ferns",30],["Snow falling",28],["Rain",20],["Sunny winter morning",22]]),m0=k([["Porcelain teacup",32],["Clay mug",28],["Glass",22],["Bowl",18]]),c0=k([["Lime plaster",36],["White tiles",36],["Painted boards",28]]),q0=k([["Brown glaze",40],["Blue and white",32],["Speckled stoneware",28]]),b0=k([["Morning",82],["Blue hour before dawn",13],["Night by stove light",5]]);n.home&&(A="Red enamel",I="Gas hob",a0="Frost ferns",m0="Porcelain teacup",c0="White tiles",q0="Brown glaze",b0="Morning"),I==="Camp stove in a cabin"&&(c0="Log walls"),b0!=="Morning"&&a0==="Sunny winter morning"&&(a0="Snow falling"),n.trait("Kettle",A),n.trait("Stove",I),n.trait("Window",a0),n.trait("Cup",m0);const ie=l0(24);let X0=k([["Across the counter",40],["Close on the kettle",24],["Low, at hob height",14],["From above the hob",22]],ie);n.home&&(X0="Across the counter"),b0==="Night by stove light"&&I==="Camp stove in a cabin"&&X0==="From above the hob"&&(X0="Across the counter"),n.trait("Wall",c0),n.trait("Teapot",q0),n.trait("Hour",b0),n.trait("View",X0);const P0={"Across the counter":0,"Close on the kettle":1,"Low, at hob height":2,"From above the hob":3}[X0],Y={"Cast iron tetsubin":0,"Red enamel":1,"Cream enamel":1,"Blue enamel":1,Copper:2,"Whistling kettle":3}[A],d={"Gas hob":0,"Wood-burning range":1,"Camp stove in a cabin":2}[I],z0={"Frost ferns":0,"Snow falling":1,Rain:2,"Sunny winter morning":3}[a0],f0={"Porcelain teacup":0,"Clay mug":1,Glass:2,Bowl:3}[m0],Ve={"Lime plaster":0,"White tiles":1,"Painted boards":2,"Log walls":3}[c0],Lo={"Brown glaze":0,"Blue and white":1,"Speckled stoneware":2}[q0],le={Morning:0,"Blue hour before dawn":1,"Night by stove light":3}[b0],k0=A==="Cream enamel"?4:A==="Blue enamel"?5:Y,y0=le===3,Ye=le===1,z=Na[k0],Rt=Y===3;let E=-12,g0=2.6,j=-3,J=20,$e=-30,fe=-42,$=[-42,16,21,104];d===1&&(g0=0,J=21,$e=-31,fe=-43,$=[-44,14,22,104]),d===2&&(E=-10,g0=9.6,J=22,$e=-28,fe=-42,$=[-37,9,28,82]);const Me=z.yaw+(y()-.5)*.12,w0=.96+y()*.08,qt=Math.cos(Me),At=Math.sin(Me),A0=(e,t,o)=>[E+(qt*e-At*o)*w0,g0+t*w0,j+(At*e+qt*o)*w0],_a=(e=>{const t=z.tip[0]-z.piv[0],o=z.tip[1]-z.piv[1];return[z.piv[0]+t*Math.cos(e)+o*Math.sin(e),z.piv[1]-t*Math.sin(e)+o*Math.cos(e)]})(.62),Do=A0(_a[0]+2.2,0,0),Qe=[6.6,4.4,3.6,6.6][f0];let Nt=E+14.6,N0=Do[0],D0=Do[2];d<2&&N0-Qe<Nt+.6&&(N0=Nt+Qe+.6),d<2&&(D0=Math.min(D0,J-Qe-1));const _t=N0+19+y()*3,St=j-13-y()*3,Sa=($[0]+$[1])*.5+(y()-.5)*6,La=$[2]+($[3]-$[2])*.48,O0=[12,12,4,52][P0]*Math.PI/180,Fe=[.232,.15,.2,.25][P0],Uo=150,E0=[E+16+(y()-.5)*3,(d===0?17.5:d===1?15:24)+(y()-.5)*2,j-3];P0===0&&(E0[1]-=2),P0===1&&(E0[0]=E+9,E0[1]=g0+13),P0===2&&(E0[0]=E+12,E0[1]=g0+14),P0===3&&(E0[0]=E+15,E0[1]=g0+4,E0[2]=j-(d===2?7:3));const ue=[E0[0],E0[1]+Uo*Math.sin(O0),E0[2]+Uo*Math.cos(O0)],me=[0,-Math.sin(O0),-Math.cos(O0)],pe=[0,Math.cos(O0),-Math.sin(O0)],X=(e,t,o)=>{const c=e-ue[0],s=t-ue[1],r=o-ue[2],l=c*me[0]+s*me[1]+r*me[2];return[.5+.5*c/(l*Fe),.5+.5*(c*pe[0]+s*pe[1]+r*pe[2])/(l*Fe),.5/(l*Fe)]},Lt={"Red enamel":[.62,.032,.026],"Cream enamel":[.78,.7,.52],"Blue enamel":[.06,.16,.42]}[A]||[.5,.5,.5],Dt=A==="Cream enamel"?[.02,.02,.022]:A==="Blue enamel"?[.78,.74,.66]:[.022,.02,.02],Ut=[[.86,.85,.81],[.78,.72,.6],[.9,.9,.9],[.42,.58,.5]][f0],Je=[[.11,.045,.02,.07],[.86,.86,.84,.06],[.62,.57,.47,.3]][Lo],he=d===0?[.78,.72,.6]:d===1?[.03,.03,.03]:y()<.5?[.22,.05,.035]:[.15,.18,.09],U0=Ve===0?[.74,.69,.6]:Ve===1?[.82,.82,.78]:Ve===2?y()<.5?[.42,.5,.47]:[.42,.47,.55]:[.34,.22,.12],Wt=d===2?[.3,.19,.1]:[.44,.28,.15];let t0=[[3,3.15,3.4],[2.7,2.85,3.15],[1.45,1.58,1.72],[3.5,3.25,2.9]][z0];y0&&(t0=[.1,.14,.26]),Ye&&(t0=[.3,.42,.7]);const W0=y0?[.004,.005,.009]:!y0&&!Ye?[t0[0]*.017,t0[1]*.018,t0[2]*.02]:[t0[0]*.026,t0[1]*.026,t0[2]*.027],ve=y0?[.002,.002,.003]:Ye?[.08,.05,.023]:z0===2?[.045,.039,.032]:[.052,.038,.025],de=d===1?[1,.42,.12]:[.22,.42,1],Da=d===1?70:d===2?y0?80:45:y0?55:6,Ct=(()=>{const e=[.36,.62,-.7],t=Math.hypot(...e);return e.map(o=>o/t)})();y();const r0=[E-6,E+6,-15.8,-9],D=d===0?[E,-4.8,J,2.3]:d===1?[E,-5.4,J,2.1]:[E+1.4,7.6,j+1.6,1],Ua=.2,Wa=[1.12,1.16,1.7,.92][z0]*(y0?2.3:Ye?2.8:1.1);Aa(a,b);const r1=performance.now(),c1={},n1=null,Wo=a.createFramebuffer();let It,Bt,et;const Co=x0(a,w,w),Io=x0(a,w,w),Bo=x0(a,w,w),Re=new Float32Array(28*4),F=(e,t,o,c,s)=>{Re[e*4]=t,Re[e*4+1]=o,Re[e*4+2]=c,Re[e*4+3]=s};F(0,ue[0],ue[1],ue[2],Fe),F(1,me[0],me[1],me[2],Ua),F(2,pe[0],pe[1],pe[2],2*Fe/w),F(3,E,g0,j,Y),F(4,qt,At,w0,k0===4?-2.9:k0===5?4:0),F(5,Lt[0],Lt[1],Lt[2],.06),F(6,N0,0,D0,f0),F(7,Ut[0],Ut[1],Ut[2],-.75),F(8,_t,0,St,Lo),F(9,Je[0],Je[1],Je[2],Je[3]),F(10,d,Ve,z0,le),F(11,$[0],$[1],$[2],$[3]),F(12,$e,fe,Nt,J),F(13,t0[0],t0[1],t0[2],y0?1:0),F(14,E,d===0?1.2:d===1?-.5:9.4,j,Da),F(15,de[0],de[1],de[2],d===1?9.5:5.2),F(16,Ct[0],Ct[1],Ct[2],z0===3&&!y0?5.5:0),F(17,ve[0],ve[1],ve[2],0),F(18,he[0],he[1],he[2],0),F(19,U0[0],U0[1],U0[2],0),F(20,Wt[0],Wt[1],Wt[2],0),F(21,D[0],D[1],D[2],D[3]),F(22,$[0]+11,$[2],(fe+$e)*.5-1,.25),F(23,W0[0],W0[1],W0[2],0),F(24,r0[0],r0[1],r0[2],r0[3]),F(25,Sa,La,$[1]-13,$[2]+3.6),F(26,Dt[0],Dt[1],Dt[2],k0===5?4.9:6.05),F(18,he[0],he[1],he[2],z.tip[0]),F(19,U0[0],U0[1],U0[2],z.tip[1]),F(27,0,0,0,-.35+y()*.25);const xe=[],i=(e,t,o,c,s,r)=>xe.push([e,t,o,c,s[0]||0,s[1]||0,s[2]||0,s[3]||0,r&&r[0]||0,r&&r[1]||0,r&&r[2]||0,r&&r[3]||0]),M0=(e,t,o)=>i(10,0,-1,0,e,[Math.cos(t),Math.sin(t),o||1]),j0=(e,t,o)=>(i(11,0,-1,0,[e[0],e[1],e[2],t],[0,o]),xe.length-1),Z0=e=>{xe[e][8]=xe.length},x=0,W=1,O=2,n0=3,be=4,p0=(e,t)=>i(8,be,-1,0,t?[0,-1,0,-e]:[0,1,0,e]),Gt=e=>i(8,be,-1,0,[-1,0,0,-e]);{let e=j0(A0(2,10,0),21*w0,1);if(M0([E,g0,j],Me,w0),Y===0)i(0,x,1,0,[0,6.2,0],[11,6.9,11]),p0(.35,!0),i(1,W,1,0,[0,10.6,0],[5.3,13,0]),i(9,5,-1,0,[0]),i(1,n0,4,0,[0,11.9,0],[4.4,30,0]),i(3,O,-1,.6,[8.2,4.8,0,1.65],[13.6,9.6,0,.85]),M0([E,g0,j],Me+2.27,w0),i(5,x,2,0,[9,11,.48,1]),i(12,W,2,0,[8.6,10.8,0,.95]),i(12,W,2,0,[-8.6,10.8,0,.95]);else if(Y===1){k0===1?(i(2,x,1,0,[0,6.2,0],[4.6,9.6,7.6,1]),i(0,O,-1,1.5,[0,11.4,0],[8.6,3.8,8.6]),i(1,W,1,0,[0,13.4,0],[5.7,14.3,.35]),i(1,n0,4,0,[0,13.5,0],[5.55,30,0]),i(1,W,1,0,[0,.95,0],[10.15,1.45,.4]),i(3,O,-1,1.4,[7.6,3.4,0,2.7],[11,6.4,0,1.55]),i(3,O,-1,.35,[11,6.4,0,1.55],[13,9.6,0,1.15]),i(3,O,-1,.3,[13,9.6,0,1.15],[15.4,12.6,0,.98]),i(3,n0,4,0,[13.9,10.7,0,.5],[16.5,14,0,.62]),i(8,be,-1,0,[.419,.908,0,17.9])):k0===4?(i(2,x,1,0,[0,4.6,0],[3.4,11.2,9,1]),i(0,O,-1,1.5,[0,8.6,0],[9.8,3.4,9.8]),i(1,W,1,0,[0,10.5,0],[5.7,11.4,.35]),i(1,n0,4,0,[0,10.6,0],[5.55,30,0]),i(1,W,1,0,[0,.95,0],[11.75,1.45,.4]),i(3,O,-1,1.4,[8.6,2.8,0,2.6],[12,5.6,0,1.5]),i(3,O,-1,.35,[12,5.6,0,1.5],[14.2,8.6,0,1.1]),i(3,O,-1,.3,[14.2,8.6,0,1.1],[16.4,11,0,.95]),i(3,n0,4,0,[14.8,9.4,0,.5],[17.4,12.4,0,.6]),i(8,be,-1,0,[.419,.908,0,16.6])):(i(2,x,1,0,[0,9,0],[7.8,8.4,6,.8]),i(0,O,-1,1.2,[0,16.2,0],[6.6,2.4,6.6]),i(1,W,1,0,[0,17.5,0],[4.6,18.4,.3]),i(1,n0,4,0,[0,17.6,0],[4.45,30,0]),i(1,W,1,0,[0,.9,0],[9.1,1.4,.4]),i(3,O,-1,1.3,[7,4,0,2.3],[10.4,7.8,0,1.4]),i(3,O,-1,.35,[10.4,7.8,0,1.4],[12.2,11.6,0,1.1]),i(3,O,-1,.3,[12.2,11.6,0,1.1],[14,15,0,.9]),i(3,n0,4,0,[12.9,12.9,0,.45],[15.2,17,0,.55]),i(8,be,-1,0,[.6,.8,0,20.1]));const t=k0===4?11.2:13.6,o=t-.5;k0===5?(i(6,x,3,0,[-7.4,10.4,0],[4,.75]),i(8,be,-1,0,[1,0,0,-6.9]),i(4,W,1,0,[-7,14.2,0],[.9,.5,.6,.2]),i(4,W,1,0,[-6.9,6.6,0],[.9,.5,.6,.2])):(i(5,x,2,0,[7.3,t,.3,0]),i(3,W,3,0,[-3,t+7.15,0,.62],[3,t+7.15,0,.62]),i(4,W,1,0,[7.3,o,0],[.42,.75,.6,.15]),i(4,W,1,0,[-7.3,o,0],[.42,.75,.6,.15]),i(12,W,2,0,[7.78,o+.15,0,.2]),i(12,W,2,0,[-7.78,o+.15,0,.2]))}else Y===2?(i(0,x,1,0,[0,7.6,0],[11.4,7.8,11.4]),p0(.6,!0),i(1,O,-1,.8,[0,12,0],[6.2,14.4,0]),i(1,n0,4,0,[0,13.3,0],[5.4,30,0]),i(3,O,-1,.6,[9.4,4.8,0,1.9],[13.4,9.6,0,1.2]),i(3,O,-1,.4,[13.4,9.6,0,1.2],[16.6,13.6,0,.85]),i(5,x,2,0,[8,13,.55,0]),i(3,x,3,0,[-3.4,21,0,1.05],[3.4,21,0,1.05])):(i(2,x,1,0,[0,5,0],[3.6,10.8,8.4,1]),i(0,O,-1,1.2,[0,9.2,0],[9.4,3.8,9.4]),i(1,W,1,0,[0,12,0],[5.2,13,0]),i(1,n0,4,0,[0,11.9,0],[4.6,30,0]),i(3,O,-1,.6,[8.6,5,0,1.7],[13.6,10.4,0,1.05]),i(3,x,6,0,[13.3,10.1,0,1.35],[14.8,11.8,0,1.3]),i(5,x,2,0,[6.6,11.9,1,0]));if(Z0(e),e=j0(A0(0,z.lidTop-1,0),8*w0,2),M0([E,g0,j],Me,w0),Y===0)i(0,x,5,0,[0,12.9,0],[4.95,1.05,4.95]),p0(12.85,!0),i(0,x,3,0,[0,14.15,0],[1.05,.75,1.05]);else if(Y===1){const t=k0===4?-2.9:k0===5?4:0,o=k0===5?5:6.2;i(0,x,5,0,[0,14.4+t,0],[o,1.6+o*.03,o]),p0(14.4+t,!0),i(1,x,2,0,[0,15.75+t,0],[1.25,16.05+t,.08]),i(1,x,3,0,[0,15.9+t,0],[.4,16.7+t,0]),i(0,O,-1,.25,[0,16.85+t,0],[1,.45,1])}else Y===2?(i(0,x,5,0,[0,14.3,0],[5.8,1.9,5.8]),p0(14.3,!0),i(1,x,3,0,[0,15.9,0],[.35,17,0]),i(12,W,3,0,[0,17.1,0,.85])):(i(0,x,5,0,[0,12.9,0],[4.95,1.3,4.95]),p0(12.9,!0),i(1,x,3,0,[0,13.9,0],[1.15,14.7,.2]));if(Z0(e),e=j0([N0,4,D0],10,4),M0([N0,0,D0],-.75,1),f0===0?(i(1,x,12,0,[0,.05,0],[6.5,.5,.06]),i(0,n0,-1,0,[0,1.7,0],[5.4,1.3,5.4]),i(2,x,10,0,[0,3.15,0],[2.6,2.7,4.75,0]),i(2,n0,11,0,[0,3.55,0],[2.6,2.5,4.55,0]),p0(5.75,!1),i(6,x,10,0,[5,3.55,0],[1.35,.36]),Gt(4.3)):f0===1?(i(1,x,10,0,[0,.4,0],[3.6,8.6,.4]),i(1,n0,11,0,[0,.7,0],[3.5,9.6,0]),p0(9,!1),i(6,x,10,0,[4.3,4.6,0],[2.4,.62]),Gt(3.6)):f0===2?(i(2,x,13,0,[0,4.9,0],[4.9,3.1,3.6,0]),i(2,n0,13,0,[0,5.45,0],[4.9,2.93,3.43,0]),p0(9.8,!1)):(i(0,x,10,0,[0,5,0],[6.6,4.4,6.6]),p0(5,!1),i(1,W,10,0,[0,0,0],[3,.9,0]),i(0,n0,11,0,[0,5,0],[6.25,4.05,6.25]),p0(5,!1)),Z0(e),e=j0([_t-2,6,St],13.5,4),M0([_t,0,St],0,1),i(0,x,15,0,[0,6,0],[7.6,6,7.6]),p0(.5,!0),i(3,O,-1,1,[-6,3.8,0,1.7],[-11,9.4,0,.7]),i(1,O,-1,.5,[0,0,0],[3.6,.9,.12]),i(0,x,15,0,[0,11.3,0],[4.2,1.5,4.2]),p0(11,!0),i(12,x,16,0,[0,13.1,0,.95]),i(6,x,15,0,[7.2,6.6,0],[3,.62]),Gt(6.6),Z0(e),d===0){for(const t of[[E,j],[E-27,j-13]]){e=j0([t[0],1,t[1]],18,4),M0([t[0],0,t[1]],0,1),i(4,x,20,0,[0,.5,0],[11.85,.35,11.85,.15]),i(4,n0,-1,0,[0,0,0],[11.1,2,11.1,0]);for(const o of[[8.3,0,3.4,.42],[-8.3,0,3.4,.42],[0,8.3,.42,3.4],[0,-8.3,.42,3.4]])i(4,W,20,0,[o[0],1.3,o[1]],[o[2]-.16,1.14,o[3]-.16,.16]);i(1,x,21,0,[0,0,0],[3.3,1.25,.1]),i(1,W,21,0,[0,0,0],[4.1,.6,0]),Z0(e)}for(let t=-1;t<=1;t++)e=j0([D[0]+t*13,D[1],J+1],5,4),M0([D[0]+t*13,D[1],J],0,1),i(7,x,22,0,[0,0,0],[D[3],0,2.1,.15]),i(7,x,24,0,[0,0,0],[D[3]*1.25,0,.25,0]),Z0(e)}else if(d===1)e=j0([E,-8,J+2],34,4),M0([0,0,0],0,1),i(3,x,24,0,[E-30,-2.4,J+3,.75],[E+30,-2.4,J+3,.75]),i(4,W,24,0,[E-26,-2.4,J+1.5],[.5,.5,1.6,0]),i(4,W,24,0,[E+26,-2.4,J+1.5],[.5,.5,1.6,0]),i(4,x,25,0,[(r0[0]+r0[1])*.5,(r0[2]+r0[3])*.5-1.5,J+.35],[(r0[1]-r0[0])*.5+2.5,(r0[3]-r0[2])*.5+3.4,.35,.1]),i(7,x,22,0,[D[0],D[1],J+.7],[D[3],0,.55,.1]),i(7,x,24,0,[D[0],D[1],J+.7],[.45,0,1.4,0]),Z0(e);else{e=j0([E,5,j],11,4),M0([E,0,j],0,1),i(1,x,27,0,[0,.6,0],[4.6,6.4,.6]),i(1,x,24,0,[0,6.6,0],[1.4,8.5,0]),i(1,x,21,0,[0,8.4,0],[2.7,9.15,.05]);for(let t=0;t<3;t++)M0([E,0,j],t*2.0944+.5,1),i(4,x,20,0,[4.7,9.25,0],[2.3,.35,.28,0]);M0([D[0],D[1],D[2]],0,1),i(4,x,24,0,[.7,0,0],[.7,.3,.3,0]),i(4,W,24,0,[1.5,0,0],[.2,1,.35,.1]),Z0(e)}}const Ht=xe.length,Go=new Float32Array(Ht*12);xe.forEach((e,t)=>Go.set(e,t*12));const Kt=a.createTexture();a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,Kt),a.pixelStorei(a.UNPACK_ALIGNMENT,4),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,3,Ht,0,a.RGBA,a.FLOAT,Go),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.disable(a.BLEND),a.colorMask(!0,!0,!0,!0),a.depthMask(!1),a.bindVertexArray(b.vao0),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,b.noise),a.bindFramebuffer(a.FRAMEBUFFER,Wo),a.viewport(0,0,w,w);const Ho=e=>a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),Ko=e=>{let t=1,o=1,c=0,s=0;for(const r of e){const l=X(r[0],r[1],r[2]);t=Math.min(t,l[0]),c=Math.max(c,l[0]),o=Math.min(o,l[1]),s=Math.max(s,l[1])}return[N(t-.01,0,1),N(o-.01,0,1),N(c+.01,0,1),N(s+.01,0,1)]},Xo=[];for(const e of[-12.5,18])for(const t of[-.5,z.H+1])for(const o of[-12.5,12.5])Xo.push([E+e*w0,g0+t*w0,j+o*w0]);const qe=Ko(Xo),Oo=[];for(const e of[-7,7])for(const t of[z.top-1.5,z.lidTop+.5])for(const o of[-7,7])Oo.push(A0(e,t,o));const Ca=Ko(Oo);{const e=()=>{const T=a.createTexture();return a.bindTexture(a.TEXTURE_2D,T),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32UI,w,w,0,a.RGBA_INTEGER,a.UNSIGNED_INT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),T};a.activeTexture(a.TEXTURE10);const t=e(),o=e(),c=e(),s=x0(a,w,w,"rg8"),r=x0(a,w,w),l=x0(a,w,w),m=x0(a,w,w),g=x0(a,w,w),P=m,h=(T,V)=>{a.activeTexture(a.TEXTURE0+T),a.bindTexture(a.TEXTURE_2D,V)};[b.noise,Kt,o,s,m,c,m,t,r,l].forEach((T,V)=>h(V,T));const M=[0,0,1,1],C=[0,2].concat(z0===3&&!y0?[1]:[],d===1?[3]:[]),v=(T,V,d0,G0,Ze,Ja)=>{const H0=b[T].u;a.useProgram(b[T].p),a.uniform4fv(H0.uP,Re),a.uniform1i(H0.uMode,V),a.uniform1i(H0.uIt,Ze?66:44),a.uniform1i(H0.uRm,110),a.uniform1i(H0.uZ,0),a.uniform1i(H0.uNP,Ht),a.uniform1i(H0.uCand,Ze||0),a.uniform1i(H0.uLi,Ja||0),a.uniform4f(H0.uRect,d0[0],d0[1],d0[2],d0[3]),Ho(G0),a.drawArrays(a.TRIANGLE_STRIP,0,4)},R=T=>a.colorMask(T===0,T===1,T===2,T===3),H=(T,V,d0)=>{R(d0),v("sh",T,V,s,d0,-1);for(const G0 of C)R(G0),v("sh",T,V,d0?l:r,d0,G0);a.colorMask(!0,!0,!0,!0)};v("ext",0,M,m),v("plane",0,M,t),v("geo",0,M,o),H(0,M,0),H(0,M,1),v("matP",0,M,c),v("litD",0,M,g,1),h(4,null),h(6,null),v("litH",0,M,P,1),It=l,Bt=g,et=P,v("matO",0,M,c),h(6,g),h(9,null),v("litD",0,M,It),h(6,P),v("litH",0,M,Bt),h(6,null),Ho(et),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT);for(const[T,V,d0,G0]of[[1,qe,et,Co],[2,Ca,Io,Bo]])v("geo",T,V,o),H(T,V,0),v("matO",T,V,c),v("litD",T,V,d0),v("litH",T,V,G0);a.bindFramebuffer(a.FRAMEBUFFER,null);for(let T=2;T<10;T++)h(T,null);[t,o,c,s,r].forEach(T=>a.deleteTexture(T)),a.activeTexture(a.TEXTURE0)}a.deleteFramebuffer(Wo),a.deleteTexture(Kt),a.flush();const s1=performance.now(),ye=X(E,g0+8,j)[2],ee=X(...A0(z.piv[0],z.piv[1],0)),Xt=X(...A0(z.tip[0],z.tip[1],0)),tt=(()=>{const e=X(...A0(z.tip[0]+z.dir[0]*.3,z.tip[1]+z.dir[1]*.3,0)),t=e[0]-Xt[0],o=e[1]-Xt[1],c=Math.hypot(t,o);return[t/c,o/c]})(),Ae=X(...A0(-z.ro-.6,z.top+.2,0)),ot=X(...A0(0,z.lidTop,0)),jo=X(...A0(0,7,0)),C0=(()=>{const e=d===2?9.15:1.25,t=d===2?2.6:3.9,o=X(E,e,j),c=X(E+t,e,j),s=X(E,e,j+t);return[o[0],o[1],c[0]-o[0],Math.abs(o[1]-s[1]),(d===2?1.6:1.25)*o[2]]})(),ge=(()=>{const e=d===2?X(D[0]+1.5,D[1],D[2]):X(D[0],D[1],D[2]+(d===1?1:2.1));return[e[0],e[1],D[3]*e[2]*(d===2?1.4:1)]})(),at=(()=>{const e=X(r0[0],r0[2],J+.7),t=X(r0[1],r0[3],J+.7);return[e[0],e[1],t[0],t[1]]})(),S=(()=>{const e=X($[0]+3.4,$[2]+3.4,fe),t=X($[1]-3.4,$[3]-3.4,fe);return[e[0],e[1],t[0],Math.min(t[1],1.05)]})(),Zo=[4.9,8.4,9.2,4.6][f0],Vo=[1,.7,.55,.9][f0],T0=[.2,.32,.28,.34][f0],Ia=e=>f0===0?2.45+2.05*N((e-.9)/4.7,0,1):f0===1?3.45:f0===2?2.95+.48*e/9.8:6.2*Math.sqrt(Math.max(.02,1-((5-e)/4.05)**2)),Ne=e=>{const t=Vo+e*(Zo-Vo),o=Ia(t),c=X(N0,t,D0),s=X(N0+o,t,D0),r=X(N0,t,D0+o);return[c[0],c[1],s[0]-c[0],Math.max(.0015,Math.abs(c[1]-r[1]))]},_e=X(N0,Zo*.6,D0),Ba=Qe*_e[2]*1.3,Se=d===1?3.1:d===2?3.4:3,Yo=.006,Ot=14,$o=d===2?.8:.9,jt=u();let B,_,_0=0,S0=.15,rt=.15,G=0,Zt,h0=z.water,I0=0,V0=0,Vt=0;n.home?(B=99.6,_=.82,I0=1,G=.55):jt<.5?(B=99.5,_=.75+u()*.2,I0=1,G=.5,V0=u()*4):jt<.88?(B=55+u()*42,_=.85,I0=0):(B=70+u()*25,_=0,I0=3,V0=u()*10),_0=_,d===1&&(S0=Math.max(.15,_),rt=S0),Zt=B+10;let U=0,L0=20,te=0,Le=0;!n.home&&u()<.45&&(U=T0*(.5+u()*.4),L0=55+u()*30,te=.3+u()*.6),n.home&&(U=T0*.78,L0=84,te=.72);const Ga=f0!==2||u()<.6;let e0=0,we=0,Te=0,v0=0,s0=0,De=0,oe=0,ct=0,Yt=0,nt=0,Pe=!1,ze=!1,st=0;const u0=[],p=64,ae=p*p,Y0=new Float32Array(ae),$0=new Float32Array(ae),$t=new Float32Array(ae),Qt=new Float32Array(ae),it=new Uint8Array(ae),L=9,Ue=new Float32Array(L*L),We=new Float32Array(L*L),Ce=new Float32Array(L*L),lt=(e,t)=>{let o=e*374761393+t*668265263|0;return o=Math.imul(o^o>>>13,1274126177),o^=o>>>16,(o>>>0)/4294967296},Ie=(e,t)=>{const o=Math.floor(e),c=Math.floor(t),s=e-o,r=t-c,l=s*s*(3-2*s),m=r*r*(3-2*r),g=lt(o,c),P=lt(o+1,c),h=lt(o,c+1),M=lt(o+1,c+1);return g+(P-g)*l+(h-g)*m+(g-P-h+M)*l*m},ft=[];let Be=u()*100;const Ge=(e,t,o,c)=>{const s=Math.max(0,Math.floor((e-2*o)*p)),r=Math.min(p-1,Math.ceil((e+2*o)*p)),l=Math.max(0,Math.floor((t-2*o)*p)),m=Math.min(p-1,Math.ceil((t+2*o)*p)),g=1/(o*o);for(let P=l;P<=m;P++)for(let h=s;h<=r;h++){const M=(h+.5)/p-e,C=(P+.5)/p-t;Y0[P*p+h]+=c*Math.exp(-(M*M+C*C)*g)}},Ha=(e,t,o)=>{t=N(t,0,p-1.001),o=N(o,0,p-1.001);const c=t|0,s=o|0,r=t-c,l=o-s,m=s*p+c;return(e[m]*(1-r)+e[m+1]*r)*(1-l)+(e[m+p]*(1-r)+e[m+p+1]*r)*l},Qo=(e,t)=>{const o=e*e,c=o*e;t[0]=-.5*c+o-.5*e,t[1]=1.5*c-2.5*o+1,t[2]=-1.5*c+2*o+.5*e,t[3]=.5*c-.5*o},He=new Float32Array(4),Jo=new Float32Array(4),Ka=(e,t,o)=>{t=N(t,0,p-1.001),o=N(o,0,p-1.001);const c=t|0,s=o|0,r=s*p+c,l=e[r],m=e[r+1],g=e[r+p],P=e[r+p+1],h=Math.max(l,m,g,P);if(h<1e-4)return 0;const M=t-c,C=o-s,v=Math.min(l,m,g,P);if(c<1||s<1||c>p-3||s>p-3)return(l*(1-M)+m*M)*(1-C)+(g*(1-M)+P*M)*C;Qo(M,He),Qo(C,Jo);let R=0;for(let H=-1;H<=2;H++){const T=r+H*p;R+=Jo[H+1]*(e[T-1]*He[0]+e[T]*He[1]+e[T+1]*He[2]+e[T+2]*He[3])}return R<v?v:R>h?h:R};function ea(e){Be+=e;for(let r=0;r<L;r++)for(let l=0;l<L;l++)Ue[r*L+l]=Ie(l*.6+Be*.1,r*.6-Be*.28)+.5*Ie(l*1.3-Be*.17+9.1,r*1.3-Be*.45);const t=.085;for(let r=0;r<L;r++)for(let l=0;l<L;l++){const m=r*L+l,g=Math.min(L-1,r+1),P=Math.max(0,r-1),h=Math.min(L-1,l+1),M=Math.max(0,l-1);We[m]=(Ue[g*L+l]-Ue[P*L+l])*t,Ce[m]=-(Ue[r*L+h]-Ue[r*L+M])*t}const o=(L-1)/(p-1);for(let r=0;r<p;r++){const l=r*o,m=Math.min(L-2,l|0),g=l-m;for(let P=0;P<p;P++){const h=P*o,M=Math.min(L-2,h|0),C=h-M,v=m*L+M,R=r*p+P;$t[R]=(We[v]*(1-C)+We[v+1]*C)*(1-g)+(We[v+L]*(1-C)+We[v+L+1]*C)*g,Qt[R]=(Ce[v]*(1-C)+Ce[v+1]*C)*(1-g)+(Ce[v+L]*(1-C)+Ce[v+L+1]*C)*g+.055+.1*Math.min(1,Y0[R])}}for(const r of ft){const l=r.r,m=Math.max(0,Math.floor((r.x-2*l)*p)),g=Math.min(p-1,Math.ceil((r.x+2*l)*p)),P=Math.max(0,Math.floor((r.y-2*l)*p)),h=Math.min(p-1,Math.ceil((r.y+2*l)*p)),M=1/(l*l);for(let C=P;C<=h;C++)for(let v=m;v<=g;v++){const R=(v+.5)/p-r.x,H=(C+.5)/p-r.y,T=r.s*Math.exp(-(R*R+H*H)*M),V=C*p+v;$t[V]+=r.dx*T,Qt[V]+=r.dy*T}}const c=Math.exp(-e*.42),s=e*p;for(let r=0;r<p;r++)for(let l=0;l<p;l++){const m=r*p+l,g=l-$t[m]*s,P=r-Qt[m]*s;$0[m]=g<-.5||P<-.5||g>p-.5||P>p-.5?0:Ka(Y0,g,P)*c}Y0.set($0);for(let r=1;r<p-1;r++)for(let l=1,m=r*p+1;l<p-1;l++,m++)Y0[m]=$0[m]+.12*($0[m-1]+$0[m+1]+$0[m-p]+$0[m+p]-4*$0[m])}const Z=48,o0=40,F0=new Float32Array(Z*o0),Jt=new Uint8Array(Z*o0),ta=n.home?.3:.25+u()*.45;for(let e=0;e<o0;e++)for(let t=0;t<Z;t++){const o=e/o0,c=t/Z;F0[e*Z+t]=N(ta*(.75+.5*Ie(c*5+3,o*4))+.25*R0(.45,0,o)+.15*R0(.12,0,Math.min(c,1-c)),0,1)}const B0=[];let Ke=ta*.6;const oa=(e,t,o)=>{const c=(S[2]-S[0])/Math.max(.01,S[3]-S[1]);for(let s=0;s<o0;s++)for(let r=0;r<Z;r++){const l=((r+.5)/Z-e)*c,m=(s+.5)/o0-t,g=Math.hypot(l,m);g<o&&(F0[s*Z+r]*=R0(o*.55,o,g))}for(const s of B0)Math.hypot((s.x-e)*c,s.y-t)<o*.8&&(s.m=0)},eo=(e,t)=>{const o=N(Math.floor(e*Z),0,Z-1);return N(Math.floor(t*o0),0,o0-1)*Z+o};function aa(e){let t=0;for(let o=0;o<o0;o++)for(let c=0;c<Z;c++){const s=o*Z+c,r=S[0]+(c+.5)/Z*(S[2]-S[0]),l=S[1]+(o+.5)/o0*(S[3]-S[1]),m=Ha(Y0,r*p-.5,l*p-.5);let g=F0[s];g+=(m*.35+Ke*.02)*e*(1-g)*(1.2-.5*o/o0),g-=(z0===3?.012:.004)*e*g,F0[s]=g,t+=g}for(let o=0;o<2;o++)if(B0.length<14&&u()<e*1.4){const c=.03+u()*.94,s=.15+u()*.8;F0[eo(c,s)]>.62&&B0.push({x:c,y:s,m:.3+u()*.4,ph:u()*6.28})}for(let o=B0.length-1;o>=0;o--){const c=B0[o];let s=0;for(let r=-1;r<=1;r++)for(let l=-1;l<=1;l++){const m=eo(c.x+l/Z,c.y+r/o0);s+=F0[m],F0[m]*=1-e*(l===0&&r===0?.04:.007)}if(s/=9,c.m+=s*e*.12,s<.18&&(c.m-=e*.1),c.m>1){const r=.03+(c.m-1)*.12;c.y-=r*e,c.x+=Math.sin(c.y*40+c.ph)*e*.012,c.m-=e*.035;for(let l=-1;l<=1;l++){const m=eo(c.x+l/Z,c.y+.5/o0);F0[m]*=l===0?.32:.86}}(c.y<.015||c.m<=0)&&B0.splice(o,1)}for(let o=0;o<F0.length;o++)Jt[o]=N(F0[o],0,1)*255;return t/F0.length}const to=[x0(a,Z,o0,"r8"),x0(a,Z,o0,"r8")],oo=[x0(a,p,p,"r8"),x0(a,p,p,"r8")];let ra=0,ca=0,ao=to[0],ro=oo[0];const ut=(e,t,o,c)=>{a.bindTexture(a.TEXTURE_2D,e),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texSubImage2D(a.TEXTURE_2D,0,0,0,t,o,a.RED,a.UNSIGNED_BYTE,c)},re=Math.max(.8,Math.cos(O0)),mt=(e,t)=>{const o=e[0]-ee[0],c=e[1]-ee[1],s=Math.cos(t),r=Math.sin(t);return[ee[0]+s*o+r*c/re,ee[1]-r*re*o+s*c]},co=()=>{const e=mt(Xt,e0),t=Math.cos(e0),o=Math.sin(e0),c=t*tt[0]+o*tt[1]/re,s=-o*re*tt[0]+t*tt[1],r=Math.hypot(c,s);return[e[0],e[1],c/r,s/r]},no=()=>{const e=ot[0]-Ae[0],t=ot[1]-Ae[1],o=s0*z.lidA,c=Math.cos(o),s=Math.sin(o),r=[Ae[0]+c*e-s*t/re,Ae[1]+s*re*e+c*t+s0*.35*ye+oe*ye];return mt(r,e0)};function na(e){let t;d===1?(S0+=(Math.max(.12,_)-S0)*e/7,rt+=(S0-rt)*e/11,t=rt*Se,_0=S0):(_0+=(_-_0)*Math.min(1,e/(d===2?.3:.15)),t=_0*Se),t*=1-.6*R0(.05,.3,e0);const o=Yo*(B-Ot)*(s0>.3?1.7:1),c=h0+z.km,s=(t*$o-o)/c*e;let r=0;if(B+s>=100){const h=t*$o-Yo*(100-Ot);B=100,r=N(h/(Se*.7),0,1),h0=Math.max(.4,h0-Math.max(0,h)*e*5e-4)}else B+=s;B>=100&&r<=0&&(B=99.9),G+=(r-G)*e/(r>G?2.2:1.1);const l=B+24*t/Se,m=(l-Zt)*e/4.5;if(Zt+=m,so=Math.abs(m)/e*(B<85?1:.25),Vt=R0(40,70,B)*(1-R0(86,98,B))*Math.min(1,t/(Se*.3)),Rt&&(nt+=(R0(.06,.4,G)*(1-R0(.05,.3,s0))*(1-R0(.1,.3,e0))-nt)*e*3),De>0?(De-=e,s0+=(1-s0)*Math.min(1,e*9),De<=0&&u0.push("lidDown")):s0+=(0-s0)*Math.min(1,e*7),G>.42&&De<=0&&e0<.1&&(Yt+=G*e*(Rt?2.5:7)*(.6+.8*u()),Yt>1&&oe<=0)){Yt=0,ct=9+18*G,u0.push("rattle");const h=no();Ge(h[0]+(u()-.5)*.03,h[1]+.045,.01,.12*G)}ct-=260*e,oe+=ct*e,oe<0&&(oe=0,ct=0),Te+=((we-e0)*70-Te*14)*e;{const h=e0+Te*e;h<=0?(e0>0&&Te<-.25&&u0.push("set"),e0=0,Te=0):h>=.95?(e0=.95,Te=0):e0=h}const g=.2+.5*(1-h0/z.water)*(ma/.92),P=N((e0-g)*.45,0,.09)*(h0>.42?1:0);if(v0+=(P-v0)*Math.min(1,e*10),v0>.002){const h=v0*e;h0-=h,Pe=!1,U<T0*1.02&&(L0=(L0*U+B*h)/(U+h),U=Math.min(T0*1.02,U+h))}if(Pe&&(U=Math.max(0,U-T0*e*.8),U<=.002&&(U=0,te=0,Pe=!1)),te>.25&&U>.002&&(Le=Math.max(Le,U/T0)),h0<=.43&&e0<.03&&v0<.002&&_<.03?(st+=e,st>1.2&&!ze&&(ze=!0,u0.push("fill"))):st=0,ze){const h=Math.min(.22*e,z.water-h0);B=(B*(h0+z.km)+11*h)/(h0+z.km+h),h0+=h,h0>=z.water-.001&&(ze=!1,st=0)}U>.001&&(L0-=(L0-Ot)*e*.0016/(U+.05),Ga&&(te=Math.min(1,te+e*.035*L0/100)))}let so=0,sa=0;function ia(e){ft.length=0;const t=co(),o=Math.pow(N((B-80)/20,0,1),2)*.1*(1-G),c=(G*(Rt?1.2:1)+o)*(s0>.5?.35:1);if(c>.002){const s=.01+.022*G,r=t[0]+t[2]*s,l=t[1]+t[3]*s;Ge(r+(u()-.5)*.006,l,.0075+.007*G,c*e*20),ft.push({x:r+t[2]*.012,y:l+t[3]*.012,dx:t[2],dy:t[3]*.6+.4,r:.024,s:.05+.17*G})}if(s0>.2){const s=mt(ot,e0),r=R0(55,100,B)*(.4+G*1.4)*s0;Ge(s[0]+(u()-.5)*.02,s[1]+.012,.016,r*e*8),ft.push({x:s[0],y:s[1]+.02,dx:.02,dy:.3,r:.04,s:r*.9})}if(U>.005){const s=Ne(U/T0),r=N((L0-42)/50,0,1);r>0&&Ge(s[0]+(u()-.5)*s[2],s[1]+.006,.012,r*e*1.4)}if(v0>.003&&B>70){const s=co(),r=Ne(U/T0);Ge((s[0]+r[0])*.5,(s[1]+r[1])*.5,.015,v0*e*25)}sa=c+(s0>.2?.5*G:0),Ke=N(Ke+(sa*.06-Ke*.012)*e,0,1)}let pt=!1,Q0=0,ht=0,vt=0,io=0,lo=0,fo=0,J0=0,dt=1e3,uo=!1;const Xa=(e,t,o,c,s,r)=>{const l=(e-o)/s,m=(t-c)/r;return l*l+m*m<1},mo=(e,t)=>[(e-S[0])/(S[2]-S[0]),(t-S[1])/(S[3]-S[1])],la=(e,t)=>{const o=mo(e,t);return o[0]>0&&o[0]<1&&o[1]>0&&o[1]<1},fa=(e,t)=>{if(Math.hypot(e-ge[0],t-ge[1])<Math.max(ge[2]*2.2,.055))return 1;const o=no();return Math.hypot(e-o[0],t-o[1])<Math.max(.045,z.ro*1.5*ye)?5:Xa(e,t,C0[0],C0[1]-.005,C0[2]*2.4+.02,C0[3]*2.6+.022)&&t<ee[1]+.02?2:e>qe[0]&&e<qe[2]&&t>qe[1]&&t<qe[3]?3:Math.hypot(e-_e[0],t-_e[1])<Math.max(Ba,.05)?6:la(e,t)?4:0},ce=e=>{const t=_;_=N(e,0,1),t<.02&&_>=.02&&u0.push("ignite"),t>=.02&&_<.02&&u0.push("off")},ua=(e,t)=>{const o=fa(e,t);if(o===5||o===3&&t>ot[1]-.06)De=1.1,u0.push("lidUp");else if(o===1)ce(_>.05?0:.8);else if(o===2)ce(_+.15);else if(o===3)u0.push("tink");else if(o===6)U>.002&&!Pe&&(Pe=!0,u0.push("empty"));else if(o===4){const c=mo(e,t);oa(c[0],c[1],.12),u0.push("wipe")}},ma=P0===3?.55:.92,po=(()=>{const e=_e[0]-jo[0],t=_e[1]-jo[1],o=Math.hypot(e,t);return[e/o,t/o,o]})();function Oa(e){const t=n.input,o=t.taps(),c=t.x,s=1-t.y;if(dt+=e,t.down&&!pt&&(Q0=fa(c,s),ht=io=c,vt=lo=s,fo=0,J0=0,uo=!0),t.down){dt=0,fo+=e,J0=Math.max(J0,Math.hypot(c-ht,s-vt));const r=c-io,l=s-lo;if(Q0===1)J0>.008&&ce(_+(r+l)*2.4);else if(Q0===2)J0<.03?ce(_+e*.45):ce(_+(r+l)*2.4);else if(Q0===3||Q0===5){if(J0>.02){Q0=3;const m=(c-ht)*po[0]+(s-vt)*po[1];we=N(m/(po[2]*.75),0,1)*ma}}else if(Q0===4&&J0>.01&&la(c,s)){const m=mo(c,s);oa(m[0],m[1],.09),Math.hypot(r,l)>.004&&u()<.3&&u0.push("wipe")}io=c,lo=s}if(!t.down&&pt&&(J0<.02&&fo<.4&&ua(ht,vt),we=0,Q0=0),!t.down&&!pt)for(const r of o)ua(r.x,1-r.y),dt=0,uo=!0;pt=t.down}let xt=!0,bt=14+jt*22,ho=_<.05?0:.14,pa=Math.max(_,.7);function ja(e){V0+=e,I0===3?(we=0,ce(_>ho?Math.max(ho,_-e*.4):_),V0>bt&&(I0=0,V0=0,bt=16+u()*40,pa=.68+u()*.27)):(ce(Math.min(pa,_+e*.5)),G>.3&&V0>bt&&(I0=3,V0=0,bt=12+u()*28,ho=.08+u()*.2))}const f=new Float32Array(80),ke=new Float32Array(64),vo=[W0[0]*2.4+ve[0]*1.2,W0[1]*2.4+ve[1]*1.2,W0[2]*2.4+ve[2]*1.2];let ne=0,yt=0,xo=1;function Za(){const e=co(),t=no();f[0]=ee[0],f[1]=ee[1],f[2]=e0,f[3]=re;const o=mt(Ae,0);if(f[4]=o[0],f[5]=o[1],f[6]=s0*z.lidA+(oe>0?Math.sin(ne*47)*.04:0),f[7]=s0*.35*ye+oe*ye,f[8]=1+(z0===3?.05*Math.sin(ne*.23):.025*Math.sin(ne*.17)),f[9]=yt,f[10]=ne%7200,f[11]=Wa,f[12]=S[0],f[13]=S[1],f[14]=S[2],f[15]=S[3],f[16]=C0[0],f[17]=C0[1],f[18]=C0[2],f[19]=C0[3],f[20]=d===1?0:_0,f[21]=C0[4],f[22]=d===2?1:0,f[23]=1,v0>.002){const r=Ne(Math.min(1,U/T0)),l=980*ye,m=(.3+4*v0)*Math.max(0,e[2]),g=Math.max(.01,e[1]-r[1]),P=Math.sqrt(2*g/l),h=N(e[0]+m*P,r[0]-r[2]*.7,r[0]+r[2]*.7);f[24]=e[0],f[25]=e[1],f[26]=(e[0]+h)*.5,f[27]=e[1]+Math.max(0,e[3])*.01,f[28]=h,f[29]=r[1],f[30]=(.0025+Math.sqrt(v0)*.012)*(w>300?1:1.4),f[31]=N(v0*40,0,.95)}else f[31]=0;const c=Ne(Math.min(1,U/T0));f[32]=c[0],f[33]=c[1],f[34]=c[2],f[35]=c[3],f[36]=U>.002?1:0,f[37]=te,f[38]=L0,f[39]=f0===2?1:0,f[40]=ge[0],f[41]=ge[1],f[42]=ge[2],f[43]=-_*4.2;const s=yt*.05;if(f[44]=vo[0]+de[0]*s,f[45]=vo[1]+de[1]*s,f[46]=vo[2]+de[2]*s,f[47]=0,f[48]=t0[0],f[49]=t0[1],f[50]=t0[2],f[51]=z0,f[52]=at[0],f[53]=at[1],f[54]=at[2],f[55]=at[3],f[58]=P0===3?0:1,f[56]=d===1?S0*xo:0,f[57]=Le>0&&U/T0<Le-.04?1:0,f[57]){const r=Ne(Le);f[73]=r[0],f[74]=r[1],f[75]=r[2],f[79]=r[3]}f[59]=0,f[60]=d===2?1.4:Math.cos(O0)*.97,f[64]=z0===1?1:z0===2?2:0,f[65]=1,f[66]=y0?1:0,f[68]=-.01,f[69]=.035,f[70]=3.2,f[71]=0,f[72]=w*.731,f[76]=U0[0]*W0[0]*8+t0[0]*.1,f[77]=U0[1]*W0[1]*8+t0[1]*.1,f[78]=U0[2]*W0[2]*8+t0[2]*.1,ke.fill(0);for(let r=0;r<Math.min(16,B0.length);r++){const l=B0[r];ke[r*4]=S[0]+l.x*(S[2]-S[0]),ke[r*4+1]=S[1]+l.y*(S[3]-S[1]),ke[r*4+2]=(.0028+.0028*Math.sqrt(Math.max(0,l.m)))*(w>300?1:1.6),ke[r*4+3]=N(l.m*1.5,0,.95)}}function ha(){Za(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,w,w),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.colorMask(!0,!0,!0,!0),a.useProgram(b.comp.p),a.bindVertexArray(b.vao0);const e=[It,Bt,et,Co,Io,Bo,ao,ro,b.noise];for(let t=0;t<9;t++)a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,e[t]);a.uniform4fv(b.comp.u.uF,f),a.uniform4fv(b.comp.u.uD,ke),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null)}const Ee=16e3,bo=new Float32Array(2048),va=(u()-.5)*1.2;let gt=0,Xe=0,yo=0,wt=0,go=0,da=0,wo=0,xa=0,To=0,ba=0,ya=0,ga=300,Po=0,zo=0,Tt=0,Pt=0,Oe=0,ko=0,zt=0,je=0,Eo=.3+u(),wa=0,Mo=2+u()*5,se=parseInt(i0.slice(56,64),16)|0||625341585;const Va=()=>(se^=se<<13,se^=se>>>17,se^=se<<5,(se>>>0)/2147483648-1),Ya=Y===0?420:Y===2?640:560;function $a(e){const t=n.sound;if(!t.on){u0.length=0;return}for(const v of u0)if(v==="ignite")d===1?t.hit("noise",.12,{cutoff:500,dur:.5}):(t.hit("click",.35),t.hit("click",.3,{at:.12}),t.hit("noise",.25,{cutoff:900,dur:.35,at:.2}));else if(v==="off")t.hit("noise",.08,{cutoff:600,dur:.2});else if(v==="lidUp")t.hit("click",.25),t.note(Y===0?76:84,{dur:.6,wave:"sine",vel:.06});else if(v==="lidDown")t.hit("click",.38),t.note(Y===0?74:86,{dur:.9,wave:"sine",vel:.07}),t.hit("blip",.05,{freq:2600});else if(v==="rattle")t.hit("click",.1+.25*G,{pan:-.2}),u()<.5&&t.hit("blip",.04,{freq:2200+u()*900});else if(v==="tink"){const R=Y===0?67:Y===2?79:82;t.note(R,{dur:1.6,wave:"sine",vel:.12}),t.note(R+19,{dur:.9,wave:"sine",vel:.05})}else v==="empty"?t.hit("noise",.2,{cutoff:1100,dur:.6}):v==="set"?(t.hit("click",.3),t.note(Y===0?62:Y===2?72:74,{dur:.35,wave:"sine",vel:.08})):v==="fill"?t.hit("noise",.14,{cutoff:1500,dur:3.2}):v==="wipe"&&t.hit("noise",.06,{cutoff:3200,dur:.22});if(u0.length=0,so>.4&&u()<e*so*1.4&&t.hit("click",N(.04+.1*u(),0,.2),{pan:(u()-.5)*.4}),Eo-=e,Eo<=0&&(Eo+=1,wa++,wa%2?t.hit("click",.045,{pan:va}):t.hit("blip",.018,{freq:1700,pan:va})),Mo-=e,Mo<=0&&!y0){Mo=(le===2?3:6)+u()*9;const v=2+Math.floor(u()*(le===2?7:4)),R=86+Math.floor(u()*8);for(let H=0;H<v;H++)t.note(R+Math.floor(u()*7)-(le===2?H%3:0)*2,{dur:.05+u()*.06,wave:"sine",vel:.035,pan:.5,at:H*(.09+u()*.05)})}const o=Math.min(1,e*6);Tt+=((d===1?0:_0*(d===2?1.8:1))-Tt)*o,Pt+=(Vt-Pt)*o,Oe+=(G-Oe)*o,ko+=(Math.min(1,v0*25+(ze?.45:0))-ko)*Math.min(1,e*15),zt+=(nt-zt)*o,je+=((d===1?S0:0)-je)*o,gt+=e*Ee;let c=Math.floor(gt);if(gt-=c,c=Math.min(c,bo.length),c<32){gt+=c;return}const s=Ya+380*N((B-50)/40,0,1),r=.996,l=2*r*Math.cos(2*Math.PI*s/Ee),m=r*r,g=380+1500*N(U/T0,0,1),P=.99,h=2*P*Math.cos(2*Math.PI*g/Ee),M=P*P,C=1500+900*G;for(let v=0;v<c;v++){const R=Va();Xe+=(R-Xe)*.4,yo+=(R-yo)*.05,wt+=(R-wt)*.012;let H=(R-Xe)*Tt*.07+wt*Tt*(d===2?.9:.2);const T=u()<Pt*.02?(u()-.5)*6:0,V=R*.25+T+l*go-m*da;da=go,go=V,H+=V*Pt*.012,u()<Oe*.004&&(ga=140+u()*380,Po=1.5+u()*2);const d0=2*.985*Math.cos(2*Math.PI*ga/Ee),G0=Po*R*.2+d0*wo-.97*xa;xa=wo,wo=G0,Po*=.996,H+=yo*Oe*.9+G0*Oe*.05;const Ze=R*.3+h*To-M*ba;ba=To,To=Ze,H+=ko*(Ze*.03+(R-Xe)*.12),zt>.01&&(ya+=2*Math.PI*(C+12*Math.sin(v*.004))/Ee,H+=zt*(Math.sin(ya)*.25+(R-Xe)*.04)),je>.05&&(u()<je*.0015&&(zo=.6+u()*.8),zo*=.93,H+=zo*R*.5+wt*je*.35),bo[v]=H}t.pcm(bo.subarray(0,c),Ee,{vel:.55})}let kt=0,Et=0,Mt=0,Fo=!0;for(let e=0;e<90;e++)na(1/30),ia(1/30),e%2===1&&ea(2/30),e%3===0&&aa(.1);for(let e=0;e<ae;e++)it[e]=Math.min(255,Y0[e]*240);for(const e of oo)ut(e,p,p,it);for(const e of to)ut(e,Z,o0,Jt);yt=d===1?S0:_0,ha();const Qa=(e,t)=>{t=Math.min(Math.max(t,0),.12),ne+=t,Oa(t);const o=!uo||dt>45;o!==xt&&(xt=o,we=0,o&&(V0=0,I0=_<.05?3:G>.2?1:0)),xt&&ja(t),kt+=t;let c=0;for(;kt>=1/30&&c<4;)na(1/30),ia(1/30),kt-=1/30,c++;c>=4&&(kt=0),Et+=t;let s=0;for(;Et>=1/24&&s<3;)ea(1/24),Et-=1/24,s++;if(s>=3&&(Et=0),s){for(let r=0;r<ae;r++)it[r]=Math.min(255,Y0[r]*240);ca^=1,ro=oo[ca],ut(ro,p,p,it)}Mt+=t,Mt>=.1&&(aa(Math.min(Mt,.3)),Mt=0,Fo=!0),Fo&&(ra^=1,ao=to[ra],ut(ao,Z,o0,Jt),Fo=!1),xo=.85+.15*Ie(ne*3.1,.5)+(d===1?.2*(Ie(ne*7.3,2.5)-.5):0),yt=(d===1?S0*1.1:_0)*xo,ha(),$a(t)};return n.dbg&&(n.dbg.get=()=>({T:B,gas:_,flame:_0,boil:G,sing:Vt,water:h0,cupVol:U,Tc:L0,tilt:e0,pourF:v0,lidK:s0,apState:I0,drops:B0.length,hum:Ke,apRun:xt,tiltT:we,refillOn:ze,drain:Pe,whistle:nt})),Qa}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
