// Drip Cave: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/066.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ce){Ce&&function(){"use strict";const Ie=new WeakMap,W=Math.PI*2,Ss=14,J=(n,o,d)=>n<o?o:n>d?d:n,Y=(n,o,d)=>n+(o-n)*d,h0=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler3D;
#define FAR 14.0
uniform vec4 uV[24];
float at2(float y, float x) { float a = atan(y / x); return x < 0.0 ? a + (y < 0.0 ? -3.141592654 : 3.141592654) : a; }
`,We=`#version 300 es
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Mt=`
float poolP(vec2 q) {
  vec2 d = (q - uV[5].xy) / uV[5].zw;
  float a = at2(d.y, d.x + 1e-6);
  float r = 1.0 + uV[6].x * sin(2.0 * a + uV[6].y) + uV[6].z * sin(3.0 * a + uV[6].w) + 0.03 * sin(7.0 * a + uV[6].y * 3.0) + 0.016 * sin(12.0 * a + uV[6].w * 5.0) + 0.009 * sin(19.0 * a + uV[6].y * 7.0) + 0.005 * sin(31.0 * a + uV[6].w * 11.0);
  // crenellated rim: small lobes bulging outward with sharp cusps between them
  float cu = fract(a * 14.32394 + 0.4 * sin(a * 3.0 + uV[6].y)) * 2.0 - 1.0;
  r += 0.016 * (1.0 - cu * cu) * (0.55 + 0.45 * sin(a * 5.0 + uV[6].w));
  return (length(d) - r) * min(uV[5].z, uV[5].w);
}
float floorH(vec2 q) {
  float P = poolP(q), W0 = uV[10].x;
  vec2 dd = normalize(q - uV[5].xy + vec2(1e-5));
  float front = smoothstep(-0.3, -0.75, dd.y);
  float crest = uV[3].w + 0.004 * front;
  if (P < 0.0) {
    float deep = W0 - 0.02 - uV[8].w * smoothstep(0.0, 0.9, -P) * (0.8 + 0.2 * sin(q.x * 2.3 + q.y * 1.7 + uV[10].w));
    return mix(deep, crest - 0.006 * (1.0 - front), smoothstep(-0.08 - 0.25 * (1.0 - front), 0.0, P));
  }
  float bank = crest + uV[10].y * smoothstep(0.0, 0.8, P) + 0.05 * smoothstep(0.3, 1.2, P) * sin(q.x * 3.1 + q.y * 2.3);
  float dam = crest - 0.12 * smoothstep(0.022, 0.05, P);
  float v = max(P - 0.08, 0.0) / 0.19, k = floor(v), f = fract(v);
  float terr = W0 - 0.115 - k * 0.07 - 0.07 * smoothstep(0.86, 1.0, f) + 0.014 * smoothstep(0.4, 0.78, f) * (1.0 - smoothstep(0.8, 0.9, f));
  return mix(bank, P < 0.08 ? dam : terr, front);
}
`,ne=`
uniform sampler3D uN3;
vec4 tx3(vec3 p) { return texture(uN3, p); }
float fbm(vec3 p) { return dot(texture(uN3, p).rg, vec2(0.62, 0.38)); }
float fbs(vec3 p) { return dot(texture(uN3, p).rg, vec2(0.62, 0.38)); }
float fbl(vec3 p) { return dot(texture(uN3, p).rg, vec2(0.62, 0.38)); }
float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float ceilY(vec2 q) { return uV[7].x + uV[7].y * (q.y - 2.0) + uV[7].z * sin(q.x * 1.7 + uV[7].w) * sin(q.y * 1.2 + uV[7].w * 1.7); }
float sdf(vec3 p) {
  vec3 C = uV[3].xyz, R = uV[4].xyz;
  float d = (1.0 - length((p - C) / R)) * 1.4;
  d = smin(d, (ceilY(p.xz) - p.y) * 0.85, 0.2);
  if (uV[9].w > 0.0) {
    vec3 td = normalize(vec3(-0.55 * uV[4].w, 0.03, 1.0)), tp = p - uV[9].xyz;
    float s = max(dot(tp, td), 0.0);
    d = max(d, uV[9].w * (1.0 + 0.2 * sin(s * 2.3)) - length(tp - td * s));
  }
  d = min(d, (p.y - floorH(p.xz)) * 0.7);
  float ly = uV[8].x;
  float sY = sqrt(max(1.0 - pow((ly - C.y) / R.y, 2.0), 0.05));
  vec2 lq = (p.xz - C.xz) / (R.xz * sY);
  float a = at2(lq.y, lq.x * uV[4].w);
  float onL = smoothstep(-0.25, 0.15, min(a - uV[8].y, uV[8].z - a));
  float n1 = fbl(p * vec3(0.9, 0.4, 0.9) + 0.83);
  float wall = smoothstep(uV[10].x + 0.04, uV[10].x + 0.4, p.y) * mix(1.0, mix(0.45, 1.0, smoothstep(0.04, 0.24, abs(p.y - ly - 0.1 + 0.25 * (n1 - 0.5)))), onL);
  float nz = 0.0;
  for (int i = 0; i < int(uV[23].w); i++) nz += (i == 0 ? 0.36 : 0.14) * (fbs(i == 0 ? p * 0.3 : p * vec3(0.8, 0.3, 0.8) + 0.37) - 0.5);
  d += mix(0.07, 1.0, wall) * nz;
  float w = (1.0 - length(lq)) * 0.5 * (R.x + R.z) * sY;
  // a broken natural shelf: wavy, bumpy top, ragged front, rounded lip, merged into the wall
  float lya = ly + 0.06 * sin(a * 1.7 + uV[10].w) + 0.03 * sin(a * 4.3 + uV[10].w * 1.7) + 0.09 * (n1 - 0.5);
  float edge = (0.3 + 0.22 * (fbl(p * vec3(2.0, 0.9, 2.0) + 0.61) - 0.5)) * smoothstep(0.0, 0.45, min(a - uV[8].y, uV[8].z - a));
  float sl = smax(smax(w - edge, p.y - lya, 0.035), (lya - 0.05 - (edge - w) * 1.2) - p.y, 0.05);
  return smin(d, sl, 0.06);
}
`,Vt=`
float dec16(vec2 v) { v = floor(v * 255.0 + 0.5); return (v.x * 256.0 + v.y) / 65535.0; }
vec3 rayDir(vec2 fc) { vec2 n = fc / uV[2].w * 2.0 - 1.0; return normalize(uV[1].xyz + (vec3(n.x, 0.0, 0.0) + n.y * uV[2].xyz) * uV[0].w); }
vec3 gPos(vec4 g, vec3 rd, out float uw, out float t) {
  t = dec16(g.rg) * 12.0; uw = dec16(g.ba) * 4.0;
  vec3 P = uV[0].xyz + rd * t;
  if (uw > 0.0) P += refract(rd, vec3(0.0, 1.0, 0.0), 0.7502) * uw;
  return P;
}
`,ko=h0+Mt+ne+Vt+`
uniform sampler2D uGt;
uniform sampler2D uNt;
out vec4 o;
vec2 enc16(float x) { x = floor(clamp(x, 0.0, 1.0) * 65535.0 + 0.5); float hi = floor(x / 256.0); return vec2(hi, x - hi * 256.0) / 255.0; }
void main() {
  bool shd = uV[18].w > 0.5;
  vec2 fc = shd ? min((floor(gl_FragCoord.xy) + 0.5) * uV[19].x, vec2(uV[2].w - 0.5)) : gl_FragCoord.xy;
  vec3 E = uV[0].xyz, rd = rayDir(fc), ro = E;
  float W = uV[3].w, t = 0.03, base = 0.0, tw = 1e9, tmax = 11.5, sh = 1.0, pd = 1e9;
  bool under = false, hit = false;
  if (shd) {
    float uw0, t0; vec3 P = gPos(texelFetch(uGt, ivec2(fc), 0), rd, uw0, t0);
    if (t0 > 11.9) { o = vec4(1.0); return; }
    vec3 Nn = texelFetch(uNt, ivec2(fc), 0).xyz * 2.0 - 1.0;
    ro = P + Nn * 0.008; vec3 dl = uV[18].xyz - ro; tmax = length(dl) - 0.06; rd = dl / (tmax + 0.06); t = 0.004; under = true;
  } else if (uV[1].w > 0.5) {
    if (rd.y < 0.003) { o = vec4(1.0, 1.0, 0.0, 0.0); return; }
    t = (W - E.y) / rd.y + 0.003;
  } else if (rd.y < -1e-4) tw = (W - E.y) / rd.y;
  int N = int(uV[10].z);
  bool run = true;
  for (int i = 0; i < N; i++) if (run) {
    if (!under && t >= tw) {
      vec3 pw = ro + rd * tw;
      if (poolP(pw.xz) < 0.0) { under = true; base = tw; ro = pw; rd = refract(rd, vec3(0.0, 1.0, 0.0), 0.7502); t = 0.001; }
      tw = 1e9;
    }
    float d = sdf(ro + rd * t);
    // the penumbra from a running minimum that uses the previous step's distance (no rings where the light grazes)
    if (shd) { float y = d * d / (2.0 * pd), e = sqrt(max(d * d - y * y, 0.0)); sh = min(sh, uV[19].y * e / max(t - y, 1e-4)); pd = d; }
    if (shd ? (sh < 0.01) : (d < 0.0007 * (t + base) + 0.0003)) { hit = true; run = false; }
    else { t += shd ? clamp(d * 0.9, 0.003, t > tmax - 1.0 ? 0.06 : 0.25) : d * 0.8; if (t + base > tmax) run = false; }
  }
  if (shd) { sh = clamp(sh, 0.0, 1.0); o = vec4(sh * sh * (3.0 - 2.0 * sh), 0.0, 0.0, 1.0); return; }
  if (!hit && t + base < 11.5) hit = true;
  if (!hit) { o = vec4(1.0, 1.0, 0.0, 0.0); return; }
  o = under ? vec4(enc16(base / 12.0), enc16(max(t, 0.0006) / 4.0)) : vec4(enc16(t / 12.0), 0.0, 0.0);
}`,qe=`
vec4 tcub(vec3 p) {
  vec3 c = p * 32.0 - 0.5, i = floor(c), f = c - i, f2 = f * f, f3 = f2 * f;
  vec3 w0 = (-f3 + 3.0 * f2 - 3.0 * f + 1.0) / 6.0, w1 = (3.0 * f3 - 6.0 * f2 + 4.0) / 6.0, w2 = (-3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0) / 6.0, w3 = f3 / 6.0;
  vec3 g0 = w0 + w1, g1 = w2 + w3;
  vec3 h0 = (i - 0.5 + w1 / g0) / 32.0, h1 = (i + 1.5 + w3 / g1) / 32.0;
  vec4 a = mix(texture(uN3, vec3(h1.x, h0.y, h0.z)), texture(uN3, vec3(h0.x, h0.y, h0.z)), g0.x);
  vec4 b = mix(texture(uN3, vec3(h1.x, h1.y, h0.z)), texture(uN3, vec3(h0.x, h1.y, h0.z)), g0.x);
  vec4 cc = mix(texture(uN3, vec3(h1.x, h0.y, h1.z)), texture(uN3, vec3(h0.x, h0.y, h1.z)), g0.x);
  vec4 d = mix(texture(uN3, vec3(h1.x, h1.y, h1.z)), texture(uN3, vec3(h0.x, h1.y, h1.z)), g0.x);
  return mix(mix(b, a, g0.y), mix(d, cc, g0.y), g1.z);
}
`,Do=`
const mat3 RT = mat3(0.80, 0.36, -0.48, -0.60, 0.48, -0.64, 0.0, 0.80, 0.60);
vec4 gJa = vec4(9.0, 0.0, 0.0, 0.0), gJb = vec4(0.02, 0.0, 0.0, 0.0); vec2 gJp = vec2(0.0);
void joints(vec3 p) {
  gJp = p.xz; float best = 9.0;
  for (int i = 0; i < int(uV[23].x); i++) {
    vec4 k = uV[19 + i];
    float fi = float(i), hl = length(k.zw); vec2 t = k.zw / hl, nn = vec2(-t.y, t.x), d = p.xz - k.xy;
    float u = dot(d, t), sn = sin(u * 4.3 + fi * 5.0);
    float v = dot(d, nn) + 0.06 * sin(u * 1.7 + fi * 1.9) + 0.03 * sin(u * 4.1 + fi * 4.1) + 0.015 * sin(u * 9.3 + fi * 2.3) + 0.006 * sin(u * 23.0 + fi);
    float dw = 0.102 * cos(u * 1.7 + fi * 1.9) + 0.123 * cos(u * 4.1 + fi * 4.1) + 0.1395 * cos(u * 9.3 + fi * 2.3) + 0.138 * cos(u * 23.0 + fi);
    float end = smoothstep(hl + 0.2, hl - 0.3, abs(u)) * (0.45 + 0.55 * sn * sn);
    float st = (fract(fi * 0.618 + 0.3) - 0.5) * 0.03 * end, sv = st * smoothstep(-0.015, 0.015, v);
    gJb.z += sv;
    if (abs(v) < best && end > 0.01) { best = abs(v); gJa = vec4(v, nn + t * dw, end); gJb.xyw = vec3(0.022 + 0.01 * sin(u * 13.0 + fi), st, sv); }
  }
  gJb.z -= gJb.w;
}
vec3 jointAt(vec3 p) {
  float v = gJa.x + dot(p.xz - gJp, gJa.yz);
  return vec3((1.0 - smoothstep(0.003, gJb.x, abs(v))) * gJa.w, gJb.z + gJb.y * smoothstep(-0.015, 0.015, v), smoothstep(0.4, 0.02, abs(v)) * gJa.w);
}
`,Xe=`
vec3 hash3(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}
`,So=h0+Mt+ne.replace("float fbs(vec3 p) { return dot(texture(uN3, p).rg, vec2(0.62, 0.38)); }","float fbs(vec3 p) { return dot(tcub(p).rg, vec2(0.62, 0.38)); }").replace("vec4 tx3(vec3 p)",qe+"vec4 tx3(vec3 p)")+Vt+Do+`
uniform sampler2D uGt;
out vec4 o;
// relief added to the normal only. Walls are flowstone: tiers of rounded lobes, each swelling to a lip with an undercut
// below it, and organ-pipe flutes (round ribs, sharp grooves) running down the lobes. Floors carry micro-gours, little
// rimstone steps along the contours. The roof: broad shallow cups a hand to an arm across, the joints cut through it,
// and knobbly popcorn only in drifts, most of them by the joints (the last two lookups are turned off the world's axes).
// m = (roof, wall, floor, under water).
float relief(vec3 p, vec4 m) {
  vec4 tq = vec4(0.0);
  for (int i = 0; i < int(uV[23].w) + 2; i++) {
    vec4 t = tcub(i == 0 ? p * 1.1 + 0.13 : i == 1 ? p * vec3(3.4, 0.35, 3.4) + 0.41 : RT * p * (i == 2 ? 0.75 : 2.9) + 0.29);
    if (i == 0) tq.x = t.r; else if (i == 1) tq.y = t.g; else if (i == 2) tq.z = t.r; else tq.w = t.a;
  }
  float a = tq.x, pm = texture(uN3, p * 0.7 + 0.55).b;
  float h = (1.0 - abs(2.0 * a - 1.0)) * 0.006 * (1.0 - 0.75 * m.x);
  vec4 fine = texture(uN3, p.zxy * 21.0 + 0.4);
  if (m.w > 0.5) {
    float g = texture(uN3, p * vec3(6.0, 1.0, 6.0) + 0.3).r;
    return h * 0.5 + 0.003 * smoothstep(0.07, 0.0, abs(g - 0.5)) * smoothstep(0.3, 0.7, pm) + fine.a * 0.0006;
  }
  float sheet = smoothstep(0.3, 0.55, pm) * m.y;
  float f = fract(p.y * 2.7 + (a - 0.5) * 0.9 + pm * 0.6 + tq.y * 0.3);
  // each lip rises over a quarter of its tier and dies out along it (20 to 60 cm), so lips run, fade and merge
  float lobe = smoothstep(1.0, 0.25, f) * smoothstep(0.0, 0.2, f) * (0.4 + 0.6 * smoothstep(0.28, 0.6, tq.z));
  h += 0.026 * lobe * sheet;
  float rib = abs(2.0 * tq.y - 1.0);
  h += 0.014 * rib * (2.0 - rib) * m.y * (0.12 + 0.88 * sheet * smoothstep(0.95, 0.2, f));
  float gv = fract(p.y * 34.0 + a * 16.0 + fine.b * 0.8);
  h += 0.002 * smoothstep(0.0, 0.75, gv) * (1.0 - smoothstep(0.86, 1.0, gv)) * m.z;
  vec3 jn = jointAt(p);
  float pop = smoothstep(0.38, 0.62, pm * 0.7 + jn.z * 0.45);
  float kb = clamp((tq.w - 0.35) * 2.0, 0.0, 1.0);
  h += m.x * (0.02 * smoothstep(0.25, 0.75, tq.z) + 0.011 * kb * kb * pop);
  h += (m.x + 0.6 * m.y) * (jn.y - 0.006 * jn.x * jn.x);
  h += texture(uN3, p * 9.0 + 0.29).b * 0.0005 * (1.0 - 0.7 * sheet);
  h += fine.a * 0.0007;
  return h;
}
void main() {
  float uw, t; vec3 rd = rayDir(gl_FragCoord.xy);
  vec3 P = gPos(texelFetch(uGt, ivec2(gl_FragCoord.xy), 0), rd, uw, t);
  if (t > 11.9) { o = vec4(0.5, 0.5, 1.0, 0.0); return; }
  int n4 = int(uV[23].x), n5 = int(uV[23].y);
  // one loop, one SDF: four tetrahedral taps for the normal, then the AO taps along it
  vec3 N = vec3(0.0), N0 = vec3(0.0, 1.0, 0.0);
  float ao = 0.0, wt = 1.0;
  for (int i = 0; i < n4 + n5; i++) {
    vec3 e = 2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0;
    float hh = 0.02 + 0.035 * float((i - 3) * (i - 3));
    if (i == n4) N0 = normalize(N);
    vec3 X = i < n4 ? P + e * 0.0025 : P + N0 * hh;
    float d = sdf(X);
    if (i < n4) N += e * d; else { ao += wt * max(hh - d, 0.0) / hh; wt *= 0.7; }
  }
  N = N0;
  float uwm = (uw > 0.0 || (P.y < uV[3].w + 0.004 && poolP(P.xz) < 0.0)) ? 1.0 : 0.0;
  float wl = (1.0 - smoothstep(0.45, 0.85, abs(N.y))) * smoothstep(uV[10].x + 0.03, uV[10].x + 0.25, P.y);
  vec4 m = vec4(smoothstep(-0.3, -0.8, N.y), wl, smoothstep(0.5, 0.9, N.y) * (1.0 - uwm), uwm);
  vec3 g = vec3(0.0); float hc = 0.0;
  joints(P);
  for (int i = 0; i < n4; i++) { vec3 e = 2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0; float hh = relief(P + e * 0.003, m); g += e * hh; hc += hh; }
  g *= 0.25 / 0.003;
  N = normalize(N - (g - N * dot(g, N)));
  // the hollows of the relief (under the lips, in the grooves) hold less light
  float cav = mix(1.0, 0.5 + 0.5 * smoothstep(0.002, 0.03, hc * 0.25), wl);
  o = vec4(N * 0.5 + 0.5, clamp(1.0 - ao * 0.42, 0.0, 1.0) * cav);
}`,Bo=h0+Mt+ne.replace("vec4 tx3(vec3 p)",qe+"vec4 tx3(vec3 p)")+Vt+`
uniform sampler2D uGt;
uniform sampler2D uNt;
out vec4 o;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  float uw, t; vec3 rd = rayDir(gl_FragCoord.xy);
  vec3 P = gPos(texelFetch(uGt, ip, 0), rd, uw, t);
  if (t > 11.9) { o = vec4(0.0); return; }
  vec3 N = texelFetch(uNt, ip, 0).xyz * 2.0 - 1.0;
  float W0 = uV[10].x;
  vec4 nA = tcub(P * 0.35), nB = tcub(P * vec3(1.3, 0.11, 1.3) + 0.21), nC = tcub(P * 1.7 + 0.77), nD = tx3(P.yzx * 3.1 + 0.3), nE = tx3(P * 11.0 + 0.5);
  float ceil = smoothstep(-0.3, -0.8, N.y), flo = smoothstep(0.45, 0.85, N.y);
  vec3 alb = mix(uV[11].rgb, uV[12].rgb, smoothstep(0.3, 0.7, nA.r * 0.6 + nC.g * 0.4));
  alb *= 0.82 + 0.2 * nC.b + 0.14 * (nD.r - 0.5) + 0.08 * (nE.g - 0.5);
  // the normal pass's AO darkens the scallop hollows a little more: silt settles there
  alb *= mix(1.0, 0.5 + 0.5 * texelFetch(uNt, ip, 0).a, 1.0 - flo);
  // bedding: a few crisp darker seams
  float seam = abs(fract(P.y * 3.1 + nA.g * 1.6 + nC.a * 0.3) - 0.5);
  alb *= 1.0 - 0.25 * smoothstep(0.03, 0.0, seam) * (1.0 - flo) * (1.0 - ceil) * smoothstep(0.4, 0.6, nC.r);
  // flowstone sheets: smooth, lighter, running down the walls
  float fs = smoothstep(0.38, 0.6, tx3(P * 0.7 + 0.55).b) * (1.0 - ceil * 0.8) * (0.55 + 0.45 * smoothstep(0.35, 0.6, nB.r));
  alb = mix(alb, uV[13].rgb * (0.9 + 0.12 * nD.g), fs * 0.7);
  // stains: vertical streaks with soft, even edges
  float st = smoothstep(0.44, 0.6, nB.b * 0.85 + nD.a * 0.15) * uV[14].w * (1.0 - flo);
  alb = mix(alb, uV[14].rgb * (0.8 + 0.3 * nC.b), st);
  // dark pits and speckle
  alb *= 1.0 - 0.08 * smoothstep(0.55, 0.75, nE.r);
  alb *= mix(1.0, 0.72 + 0.22 * nA.b, ceil);
  // the popcorn drifts are pale, dry calcite (the joints' own darkness is in the normal bake's groove)
  float pop = smoothstep(0.45, 0.62, tx3(P * 0.7 + 0.55).b * 0.7 + 0.12) * ceil;
  alb = mix(alb, uV[13].rgb * (0.95 + 0.1 * nE.g), pop * 0.4);
  float low = (1.0 - smoothstep(W0 - 0.02, W0 + 0.16, P.y)) * flo * (poolP(P.xz) > 0.06 ? 1.0 : 0.0);
  alb = mix(alb, uV[15].rgb * (0.8 + 0.4 * nC.r), low * smoothstep(0.42, 0.55, nA.a) * 0.8);
  float wet = clamp(0.25 + 0.6 * fs + 0.5 * smoothstep(0.52, 0.6, nB.a) * (1.0 - ceil) + 0.3 * flo - 0.2 * pop, 0.0, 1.0);
  float P2 = poolP(P.xz);
  if (uw > 0.0 || (P.y < uV[3].w + 0.004 && P2 < 0.0)) {
    // pool floor: clean calcite rims of micro-gours over darker silt in the cups
    vec3 pb = uV[16].rgb * (0.82 + 0.3 * nC.b) * (0.9 + 0.2 * nA.r);
    pb *= 0.8 + 0.3 * nE.b;
    pb *= 0.7 + 0.45 * smoothstep(0.3, 0.7, nD.b);
    pb = mix(pb, uV[13].rgb * 0.9, smoothstep(0.6, 0.68, nC.a) * 0.35 * uV[16].r);
    alb = mix(alb, pb, smoothstep(0.0, -0.1, P2) * 0.85 + 0.15);
    wet = 1.0;
  }
  vec2 dq = normalize(P.xz - uV[5].xy + vec2(1e-5));
  float frontK = smoothstep(-0.3, -0.75, dq.y);
  float damK = smoothstep(0.13, 0.0, abs(P2 - 0.03)) * (1.0 - smoothstep(W0 + 0.03, W0 + 0.08, P.y)) * frontK;
  float wl = smoothstep(0.12, 0.0, P.y - uV[3].w) * step(0.0, P2) * (1.0 - frontK);
  alb *= 1.0 - 0.35 * wl; wet = max(wet, wl);
  alb = mix(alb, uV[13].rgb * (0.95 + 0.15 * nD.r), damK * 0.8);
  float terr = (1.0 - smoothstep(W0 - 0.05, W0 - 0.02, P.y)) * flo * step(0.06, P2);
  alb = mix(alb, uV[13].rgb * 0.92, terr * 0.6);
  wet = max(wet, max(damK, terr * 0.8));
  if (uV[17].a > 0.5) { alb = mix(alb, alb * vec3(0.85, 0.95, 1.1), 0.5); wet = max(wet, 0.7); }
  o = vec4(sqrt(clamp(alb, 0.0, 1.0)), wet);
}`,Oe=`
uniform sampler2D uD;
vec4 rings(vec2 x, float fw) {
  vec4 acc = vec4(0.0);
  int n = int(uV[13].z); float T = uV[13].x;
  for (int i = 0; i < n; i++) {
    vec4 R = texelFetch(uD, ivec2(i, 2), 0);
    float tau = T - R.z;
    if (tau > 0.0 && tau <= 7.0) {
    vec2 d = x - R.xy; float r = length(d) + 1e-4;
    float rc = 0.05 + 0.23 * tau, sg = 0.03 + 0.07 * tau;
    float q = (r - rc) / sg;
    if (abs(q) <= 3.0) {
    float lam = 0.022 + 0.016 * tau, k = 6.2832 / lam;
    float en = exp(-q * q) * R.w * exp(-0.5 * tau) / sqrt(1.0 + r * 14.0) * exp(-pow(k * fw, 2.0) * 0.9);
    float ps = k * (r - 0.3 * tau);
    float h = en * sin(ps), dr = en * k * cos(ps);
    acc += vec4(h, d / r * dr, -k * k * h);
    } }
  }
  return acc;
}
`,Pt=`
float fshadow(vec3 P, vec3 L, int s0, int s1) {
  vec3 u = L - P; float a = dot(u, u), D = sqrt(a), sh = 1.0;
  int n = int(uV[13].w);
  for (int i = 0; i < n; i++) {
    if (sh >= 0.01 && (i < s0 || i >= s1)) {
    vec4 A = texelFetch(uD, ivec2(i, 0), 0), B = texelFetch(uD, ivec2(i, 1), 0);
    vec3 v = B.xyz - A.xyz, w0 = P - A.xyz;
    float b = dot(u, v), c = dot(v, v), dd = dot(u, w0), e = dot(v, w0);
    float s = clamp((b * e - c * dd) / max(a * c - b * b, 1e-9), 0.0, 1.0);
    float tt = clamp((b * s + e) / c, 0.0, 1.0);
    s = clamp((b * tt - dd) / a, 0.0, 1.0);
    float dist = length(w0 + u * s - v * tt);
    float r = mix(abs(A.w), abs(B.w), tt), pen = uV[12].w * s + 0.0015;
    sh *= 1.0 - smoothstep(r + pen, r - pen, dist) * smoothstep(0.012, 0.04, s * D) * (A.w < 0.0 ? 0.45 * min(1.0, r * r / (pen * pen)) : 0.9 * min(1.0, r / pen));
    }
  }
  return sh;
}
uniform sampler2D uSh;
float gSh = 0.0;
// ss: the shell's own shadow (baked per lamp position); spk: crystalline sparkle amount
vec3 lit(vec3 P, vec3 N, vec3 V, vec3 alb, float wet, float ao, float trans, int s0, int s1, float ss, float spk) {
  vec3 L = uV[11].xyz, Lc = uV[12].rgb * uV[11].w;
  vec3 d = L - P; float D2 = dot(d, d); vec3 l = d * inversesqrt(D2);
  float ndl = dot(N, l), att = 1.0 / (D2 + 0.085);
  vec3 c = vec3(0.0); float shq = 0.0;
  if (uV[11].w > 0.0 && (ndl > 0.0 || trans > 0.0) && ss > 0.0) {
    float sh = fshadow(P, L, s0, s1) * ss;
    gSh = sh; shq = sh * smoothstep(0.0, 0.35, ndl);
    c = alb * Lc * att * sh * (max(ndl, 0.0) + trans * max(-ndl, 0.0) * 0.8);
    vec3 h = normalize(l + V);
    float ex = mix(16.0, 240.0, wet * wet);
    float fr = 0.03 + 0.97 * pow(1.0 - max(dot(h, V), 0.0), 5.0);
    c += Lc * att * sh * max(ndl, 0.0) * pow(max(dot(N, h), 0.0), ex) * (ex + 8.0) * 0.11 * fr * (0.15 + wet + 2.0 * smoothstep(0.7, 0.95, wet));
    if (spk > 0.0) {
      // calcite grains: each catches the lamp at its own angle
      vec3 hg = hash3(floor(P * 210.0)) * 2.0 - 1.0;
      float g = pow(max(dot(normalize(N + hg * 0.45), h), 0.0), 900.0) * step(0.975, hg.z * 0.5 + 0.5);
      c += Lc * att * sh * max(ndl, 0.0) * g * spk * 3.0;
    }
  }
  // the fill: the lamp's light off the rock (warm, from the lamp's side) and off the pool (uV[14], cooler and greyer,
  // from everywhere), and near the lamp the lit wall itself, a wide source that fills the shell's own shadows
  vec3 Fc = uV[14].rgb * uV[11].w;
  vec3 b = uV[17].a * ((Lc * (0.2 + 0.45 * dot(N, l)) + Fc * 0.35) * (0.35 + 0.65 * ss) / (D2 + 0.25) + Fc * 0.05);
  b += (Lc + Fc) * (1.0 - shq) * (uV[21].w > 1.5 ? 0.28 : 0.1) / (D2 + 0.12) * smoothstep(2.5, 0.4, D2);
  // by a white lamp, the light the clear pool sends back up: green-blue, on the stone just over the water
  if (uV[21].w > 1.5) b += Fc * 0.05 * exp(-max(P.y - uV[3].w, 0.0) * 9.0) * (0.6 - 0.4 * N.y) / (D2 + 0.3);
  return c + alb * (max(b, 0.0) + uV[15].rgb) * ao;
}
vec3 tone(vec3 c, vec2 fc) {
  c *= uV[13].y;
  // the dark stone greys and cools (uV[19].w: by how much, none over black water)
  float lu = dot(c, vec3(0.2126, 0.7152, 0.0722));
  vec3 dk = uV[21].w > 1.5 ? uV[14].rgb / max(dot(uV[14].rgb, vec3(0.2126, 0.7152, 0.0722)), 1e-4) : vec3(0.92, 1.0, 1.1);
  c = mix(c, lu * dk, uV[19].w * (1.0 - smoothstep(0.0, 0.15, lu)));
  c = pow(max(c, 0.0), vec3(1.35)) * 5.0;
  vec2 q = fc / uV[2].w - 0.5; c *= 1.0 - 0.6 * dot(q, q);
  // a toe that lets unlit rock fall to black, then a long shoulder: part per channel, part scaled by the brightest
  // channel, and the brightest light settles on the lamp's own white (gold by a candle), never on paper white
  // white stone is seen white: the eye takes part of the lamp's colour out (uV[14].w), and its white point is near neutral
  vec3 lw = uV[12].rgb / max(uV[12].r, max(uV[12].g, uV[12].b));
  c /= mix(vec3(1.0), lw, uV[14].w * 0.6);
  vec3 wp = uV[18].w > 0.5 ? vec3(0.9, 0.96, 1.0) : uV[21].w > 1.5 ? vec3(0.94, 0.91, 0.84) : mix(pow(lw, vec3(1.0, 0.4, 0.75)), vec3(1.0), uV[14].w);
  float m = max(c.r, max(c.g, c.b));
  c = mix(c * (m + 0.02) / (m * (m + 1.0) + 0.2), c * (c + 0.02) / (c * (c / wp + 1.0) + 0.2), 0.6);
  c = pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
  return c + (fract(sin(dot(fc, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
}
vec3 enc(vec3 c) { c *= uV[13].y; return c / (1.0 + c); }
vec3 dec(vec3 e) { return e / max(1.0 - e, 0.004) / uV[13].y; }
`,No=h0+Mt+Vt+Xe+Oe+Pt.replace("float gSh = 0.0;","float gSh = 0.0, fsC = -1.0;").replace("float sh = fshadow(P, L, s0, s1) * ss;","float sh = (fsC >= 0.0 ? fsC : fshadow(P, L, s0, s1)) * ss;")+`
uniform float uRx;
uniform sampler2D uFs;
uniform sampler2D uGt;
uniform sampler2D uNt;
uniform sampler2D uAt;
uniform sampler2D uRf;
out vec4 o;
// before the formation-shadow cache is built (a first make on a context compiles FS_FSH a few frames in), the same value the
// cache would hold: FS_FSH's gate and its 16-bit step, so a make draws the same pixels whether an earlier make already compiled it
float fshQ(vec3 P, vec3 N, vec3 L, float ss) { float s = 1.0; if (dot(N, L - P) > 0.0 && ss > 0.0) s = fshadow(P, L, -1, -1); return floor(clamp(s, 0.0, 1.0) * 65535.0 + 0.5) / 65535.0; }
vec2 toPix(vec3 X) { vec3 v = X - uV[0].xyz; float z = max(dot(v, uV[1].xyz), 1e-3); return (vec2(v.x, dot(v, uV[2].xyz)) / (z * uV[0].w) * 0.5 + 0.5) * uV[2].w; }
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec3 rd = rayDir(gl_FragCoord.xy), E = uV[0].xyz;
  float uw, t; vec3 P = gPos(texelFetch(uGt, ip, 0), rd, uw, t);
  vec3 col = vec3(0.0); float dep = 1.0;
  if (t < 11.9) {
    ivec2 ib = ip;
    vec3 V = -rd, Ps = P, L = uV[11].xyz, refl = vec3(0.0);
    float W = uV[3].w, F = 0.0, fw = 0.0, uw2 = 0.0, dl = 0.0, foc = 1.0;
    bool water = false;
    water = uRx < 0.5 && uw > 0.0;
    // ring queries: water surface then the lamp's entry point (water), or the pool point that mirrors the lamp (dry)
    vec2 q; float fq;
    vec3 Lm = vec3(L.x, 2.0 * W - L.y, L.z), Wp = vec3(0.0);
    float dLW = 1.0, dPW = 0.0;
    if (water) {
      float tS = (W - E.y) / rd.y;
      Ps = E + rd * tS;
      fw = tS * uV[0].w * 2.0 / uV[2].w / pow(max(-rd.y, 0.04), 0.8);
      q = Ps.xz; fq = fw;
    } else {
      Wp = P + (Lm - P) * ((P.y - W) / max(P.y - Lm.y, 1e-3));
      dLW = length(L - Wp); dPW = length(P - Wp);
      q = Wp.xz; fq = length(P - E) * uV[0].w * 2.0 / uV[2].w * dLW / (dLW + dPW) + 0.001;
    }
    int nq = int(uV[23].z) - (water ? 0 : 1);
    vec4 rg1 = vec4(0.0), rg2 = vec4(0.0);
    for (int k = 0; k < nq; k++) {
      vec4 r = rings(q, fq);
      if (k == 0) {
        rg1 = r;
        if (water) {
          vec3 n = normalize(vec3(-r.y, 1.0, -r.z));
          float cosI = clamp(-dot(rd, n), 0.0, 1.0);
          F = 0.02 + 0.98 * pow(1.0 - cosI, 5.0);
          vec3 rr = reflect(rd, n);
          vec3 Fm = vec3(uV[1].x, -uV[1].y, uV[1].z), Um = vec3(uV[2].x, -uV[2].y, uV[2].z);
          refl = dec(texture(uRf, vec2(rr.x, dot(rr, Um)) / max(dot(rr, Fm), 0.05) / uV[0].w * 0.5 + 0.5).rgb);
          vec3 t0 = refract(rd, vec3(0.0, 1.0, 0.0), 0.7502), t1 = refract(rd, n, 0.7502);
          vec3 Pa = Ps + rd * (uw * 0.75);
          vec2 off = toPix(Pa + (t1 - t0) * uw) - toPix(Pa);
          ib = clamp(ip + ivec2(floor(off + 0.5)), ivec2(0), ivec2(int(uV[2].w) - 1));
          float t2; vec3 P2 = gPos(texelFetch(uGt, ib, 0), rayDir(vec2(ib) + 0.5), uw2, t2);
          if (uw2 <= 0.0 || t2 > 11.9) { ib = ip; P2 = P; uw2 = uw; }
          P = P2; V = -t0;
          vec3 Wl = P + (L - P) * clamp((W - P.y) / max(L.y - P.y, 1e-3), 0.0, 1.0);
          dl = length(Wl - P);
          q = Wl.xz; fq = fw * 0.7 + 0.002;
        }
      } else rg2 = r;
    }
    if (water) foc = mix(1.0, clamp(1.0 - rg2.w * dl * 0.18, 0.35, 2.6), 0.85);
    vec4 nt = texelFetch(uNt, ib, 0), at = texelFetch(uAt, ib, 0);
    vec3 N = nt.xyz * 2.0 - 1.0, alb = at.rgb * at.rgb;
    float wet = at.a;
    if (water) wet = 0.2;
    float ss = texture(uSh, (vec2(ib) + 0.5) / uV[2].w).r;
    fsC = uV[16].w > 0.5 ? dec16(texelFetch(uFs, ib, 0).rg) : fshQ(P, N, L, ss);
    col = lit(P, N, V, alb, wet, nt.a, 0.0, -1, -1, ss, water ? 0.0 : smoothstep(0.5, 0.9, wet));
    if (water) {
      vec3 sig = uV[16].rgb;
      col *= foc * exp(-sig * (dl + uw2));
      vec3 ins = uV[17].rgb * uV[12].rgb * uV[11].w / (dot(L - Ps, L - Ps) + 0.4) * (1.0 - exp(-(sig.g * 0.5 + 0.6) * uw2));
      col = (col + ins) * (1.0 - F) + refl * F;
    } else {
      float pp = poolP(Wp.xz);
      if (P.y > W + 0.03 && uV[11].w > 0.0 && pp < -0.02) {
        vec3 l = normalize(Lm - P);
        float D = length(Lm - P), cosI = (L.y - W) / max(dLW, 1e-3);
        float F2 = 0.02 + 0.98 * pow(1.0 - cosI, 5.0);
        float foc2 = clamp(1.0 - rg1.w * dPW * 0.05, 0.35, 2.2);
        col += alb * uV[12].rgb * uV[11].w * F2 * max(dot(N, l), 0.0) * foc2 / (D * D + 0.02) * smoothstep(-0.02, -0.15, pp) * 1.8;
      }
      if (uV[18].w > 0.5) col += alb * uV[15].rgb * 1.2 * smoothstep(0.2, 0.9, at.a) * nt.a * nt.a;
    }
    dep = dot(Ps - E, uV[1].xyz) / FAR;
  }
  o = vec4(uRx > 0.5 ? enc(col) : tone(col, gl_FragCoord.xy), 1.0);
  gl_FragDepth = clamp(dep, 0.0, 1.0);
}`,Uo=h0+Vt+`
uniform sampler2D uD;
`+Pt.slice(Pt.indexOf("float fshadow"),Pt.indexOf("uniform sampler2D uSh;"))+`
uniform sampler2D uGt;
uniform sampler2D uNt;
uniform sampler2D uSh;
out vec4 o;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  float uw, t; vec3 P = gPos(texelFetch(uGt, ip, 0), rayDir(gl_FragCoord.xy), uw, t);
  vec3 N = texelFetch(uNt, ip, 0).xyz * 2.0 - 1.0, L = uV[11].xyz;
  float s = 1.0;
  if (t < 11.9 && dot(N, L - P) > 0.0 && texture(uSh, (vec2(ip) + 0.5) / uV[2].w).r > 0.0) s = fshadow(P, L, -1, -1);
  float v = floor(clamp(s, 0.0, 1.0) * 65535.0 + 0.5);
  o = vec4(floor(v / 256.0), mod(v, 256.0), 0.0, 255.0) / 255.0;
}`,Ge=h0+`
layout(location = 0) in vec2 aM;
layout(location = 1) in vec4 i0;
layout(location = 2) in vec4 i1;
layout(location = 3) in vec4 i2;
layout(location = 4) in vec4 i3;
out vec3 vP; out vec3 vN; out vec4 vM; out float vTh; out float vR; out float vO; flat out ivec2 vS; flat out float vV;
vec3 frame1(vec3 T) { return normalize(cross(T, abs(T.y) < 0.95 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0))); }
// the formation's axis at s, and its tangent
vec3 axisAt(float s, out vec3 T) {
#if FT == 3
  if (i2.y > 2.5 && i2.y < 3.5) {
    vec3 dd = i1.xyz, e1 = frame1(dd), e2 = cross(dd, e1);
    float ph = i2.z * 6.2832, w = i3.y;
    T = normalize(dd * 0.45 + i3.x * (e1 * (w * cos(w * s + ph) + 0.6) - e2 * (0.8 * w * sin(w * s * 0.8 + ph * 1.3))));
    return i0.xyz + i0.w * (dd * s * 0.45 + i3.x * (e1 * (sin(w * s + ph) - sin(ph) + s * 0.6) + e2 * (cos(w * s * 0.8 + ph * 1.3) - cos(ph * 1.3))));
  }
#endif
  T = i1.xyz;
  vec3 a = i0.xyz + i1.xyz * (s * i0.w);
  if (i2.y < 0.5 || i2.y > 3.5) {
    // no formation grows straight: a gentle lean and a kink, pinned at both ends; a stalagmite's top stays under its
    // drip while its foot spreads off to one side, so the body leans and its bulk sits off-centre
    vec3 e1 = frame1(T), e2 = cross(T, e1);
    float sd = i2.z, w = sin(3.1416 * s), ms = i2.y > 3.5 && i2.y < 4.5 ? 1.0 : 0.0;
    a += (e1 * sin(sd * 37.0) + e2 * cos(sd * 37.0)) * (i0.w * (0.06 * w + ms * (0.05 + 0.1 * fract(sd * 4.7)) * (1.0 - s) * (1.0 - s))) + (e1 * cos(sd * 53.0) + e2 * sin(sd * 53.0)) * (i0.w * 0.02 * sin(6.2832 * s + sd * 9.0) * w);
  }
  return a;
}
float gO = 1.0;
vec3 surf(float s, float th) {
  float L = i0.w, rB = i1.w, rT = i2.x, ty = i2.y, sd = i2.z;
  float c = cos(th), sn = sin(th);
#if FT == 2
  if (ty > 1.5 && ty < 2.5) {
    vec3 dd = i1.xyz, e1 = frame1(dd), e2 = cross(dd, e1);
    float ca = cos(i3.x), sa = sin(i3.x);
    vec3 a1 = e1 * ca + e2 * sa, a2 = -e1 * sa + e2 * ca;
    // across the sheet in even steps (a cosine would spend the mesh on the two edges)
    c = abs(th * 0.63662 - 2.0) - 1.0;
    float W = i2.w, x = c * W * 0.5;
    float cs = fract(sd * 5.0) < 0.5 ? c : -c;
    float lf = 0.06 + 0.94 * pow(max(0.5 + 0.5 * cs, 0.0), 0.75) * (1.0 - 0.25 * pow(max(cs, 0.0), 6.0)) + 0.05 * sin(c * 3.7 + sd * 20.0);
    float fold = W * (0.13 * sin(c * 5.0 + sd * 11.0) + 0.05 * sin(c * 2.1 + sd * 3.0)) * (0.1 + 0.9 * s * s);
    float thick = 0.003 + 0.012 * (1.0 - s) * (1.0 - s);
    return i0.xyz + a1 * x + vec3(0.0, i3.y * x, 0.0) + a2 * (fold + thick * sn) + dd * (s * L * lf);
  }
#endif
  vec3 T, a = axisAt(s, T);
  vec3 e1 = frame1(T), e2 = cross(T, e1);
  float r, tipR = max(rT, 0.0015);
  if (ty < 0.5 || ty > 4.5) {
    // a carrot, not a tooth: a slim body that keeps its width most of the way down and rounds in to the tip, stacked
    // growth bulges, and a wide cone at the root where it runs out into the ceiling
    float lump = ty > 4.5 ? 0.15 : 1.0, rS = rB * (ty > 4.5 ? 0.7 : 0.62);
    float cone = rS * pow(max(1.0 - pow(s / 0.97, 2.4 + 2.2 * fract(sd * 7.0)), 0.0), 0.7);
    cone *= 1.0 + lump * (0.1 * sin(s * L * 44.0 + sd * 31.0 + 2.0 * sin(s * L * 9.0 + sd * 9.0)) + 0.07 * sin(s * L * 17.0 + sd * 13.0)) * (1.0 - 0.5 * s);
    tipR = max(rT, rS * 0.2);
    r = max(cone, max(rT, rS * 0.15) * (1.1 + 0.25 * smoothstep(0.8, 1.0, sin(s * L * 70.0 + sd * 9.0)))) + rB * 0.75 * exp(-s * L / (0.5 * rB + 0.018));
    r *= 1.0 + lump * (0.08 * sin(th * 2.0 + sd * 17.0 + s * 5.0) + 0.05 * sin(th * 3.0 + sd * 29.0 - s * 9.0) + 0.03 * sin(s * L * 9.0 + sd * 9.0 + th) + 0.03 * sin(th * 5.0 + sd * 3.0 + s * 3.0)) * smoothstep(0.0, 0.3, cone / rS);
    r *= 1.0 + (ty > 4.5 ? 0.03 : 0.012) * sin(s * L * 150.0 + sd * 5.0 + th);
  }
#if FT == 1
  else if (ty < 1.5) {
    r = rB * 0.8 * (1.0 + 0.15 * smoothstep(0.8, 1.0, sin(s * L * 60.0 + sd * 9.0))) + rB * 1.3 * exp(-s * L / 0.006);
    // a straw is never drawn thinner than a pixel and a half, so it survives the small tile
    r = max(r, 1.6 * dot(a - uV[0].xyz, uV[1].xyz) * uV[0].w / uV[2].w);
  }
#endif
#if FT == 3
  else if (ty < 3.5) {
    r = rB * (1.0 - 0.35 * s) * (1.0 + 0.18 * sin(s * 21.0 + sd * 7.0)) + rB * 1.2 * exp(-s * L / 0.01);
    tipR = rB * 0.8;
  }
#endif
  else {
    // a stalagmite, built the way drip calcite builds one: a broad foot that runs out into the floor as flowstone, a
    // leaning, tapering body whose relief runs DOWN it like poured wax: runnels from the top, each ending at its own
    // height in a rounded drip lobe, and between them bulges that swell out on one side only (never a ring all round);
    // a few low ribs, knobs, and a flat-ish top: a splash cup in a low cap whose rim dips on one side and is scalloped
    // by the runnels. k (set in the JS from the seed): 0 a stack, 1 a low boss, 2 a tall thin one on a wide foot.
    float k = floor((ty - 3.95) * 10.0), wb = step(0.5, k) - step(1.5, k), wt = step(1.5, k);
    float h1 = fract(sd * 3.7), h2 = fract(sd * 5.3), h3 = fract(sd * 11.1), h4 = fract(sd * 17.9), hb = s * L;
    float tf = mix(0.32, 0.55, h1) + 0.2 * wb - 0.05 * wt;
    float body = rB * (1.0 - (1.0 - tf) * pow(s, mix(0.7, 1.4, h2)));
    // bulges: one per growth spell, each swelling out on its own side
    float t2 = sin(th * 2.0 + sd * 21.0);
    float v = (s + 0.06 * sin(s * 5.0 + sd * 13.0) + 0.035 * sin(s * 13.0 + sd * 5.0)) * (clamp(floor(L / 0.06), 2.0, 9.0) + floor(h4 * 2.0)) + fract(sd * 2.3)
            + 0.3 * t2;
    float t5 = 0.5 + 0.5 * sin(th * 5.0 + sd * 13.0 + 2.0 * t2); t5 *= t5; v += 0.5 * t5 * t5;
    float f = fract(v), ki = floor(v), ak = 0.3 + 0.7 * fract((ki + 3.0) * (0.754877 + 0.3 * sd));
    float side = 0.5 + 0.5 * sin(th + ki * 2.4 + sd * 9.0); side *= side * ak;
    // runnels: n of them round the body, meandering; runnel i runs from the top down to e and ends in a lobe
    float nr = 6.0 + floor(h3 * 4.0), w = th * nr / 6.2832 + 0.35 * sin(s * 4.0 + sd * 7.0), g = fract(w);
    float e = 0.08 + 0.6 * fract((mod(floor(w), nr) + 5.0) * (0.618034 + 0.2 * sd));
    float sg = sin(3.1416 * g), se = smoothstep(e, e + 0.05, s), run = sg * sqrt(sg) * (se + 0.7 * exp(-(s - e - 0.015) * (s - e - 0.015) * 784.0));
    gO = (1.0 - 0.35 * side * (1.0 - smoothstep(0.0, 0.2, min(f, 1.0 - f) * 2.0))) * (1.0 - 0.3 * (1.0 - sqrt(sg)) * se);
    float rib = 0.06 * sin(th * 3.0 + sd * 7.0 + s * 2.5) + 0.05 * t2 + 0.07 * sin(hb * 22.0 + th * 3.0 + sd * 17.0) * sin(hb * 15.0 - th * 4.0 + sd * 5.0);
    r = body * (1.0 + (0.32 * sin(3.1416 * f) * (1.0 - 0.35 * f) * side + 0.16 * run) * smoothstep(0.05, 0.1, hb) + rib * (1.1 - 0.5 * s));
    float rt = rB * tf, hd = min(rt * (0.3 + 0.3 * h3), 0.3 * L);
    float q = clamp((hb - L + hd + hd * 0.8 * (0.5 + 0.5 * sin(th + sd * 31.0))) / hd, 0.0, 1.0);
    r *= sqrt(1.0 - q * q);
    a -= T * (rt * (0.2 + 0.3 * h4) * smoothstep(0.55, 1.0, q));
    // the foot spreads and sinks as it goes out, so it follows the floor down a bank instead of standing off it
    float fo = rB * (0.4 + 0.3 * h2 + 0.3 * wt) * (1.0 + 0.3 * sin(th + sd * 20.0) + 0.25 * sin(th * 3.0 + sd * 13.0)) * exp(-(hb - 0.04) / ((0.22 + 0.15 * h1) * rB + 0.01));
    r += fo; a -= T * (0.35 * fo);
    tipR = 0.0;
  }
  bool joined = i2.w > 0.5 && (ty < 1.5 || ty > 3.5);
  if (joined) r = max(r, rT); else if (tipR > 0.0) r *= sqrt(clamp((1.0 - s) * L / tipR * 0.9, 0.0, 1.0));
  return a + (e1 * c + e2 * sn) * r;
}
void main() {
  float s = aM.x, th = aM.y * 6.2831853;
  vec3 p = vec3(0.0), sp = vec3(0.0), sm = vec3(0.0), tp = vec3(0.0), tm = vec3(0.0);
  float o0 = 1.0;
  int n5 = int(uV[23].w);
  for (int k = 0; k < n5; k++) {
    float ss = k == 1 ? min(s + 0.012, 1.0) : k == 2 ? max(s - 0.012, 0.0) : s;
    float tt = k == 3 ? th + 0.06 : k == 4 ? th - 0.06 : th;
    vec3 q = surf(ss, tt);
    if (k == 0) { p = q; o0 = gO; } else if (k == 1) sp = q; else if (k == 2) sm = q; else if (k == 3) tp = q; else tm = q;
  }
  vec3 cr = cross(tp - tm, sp - sm), Tx;
  vec3 ax = axisAt(s, Tx);
  vec3 n = dot(cr, cr) > 1e-16 ? normalize(cr) : Tx;
  // (the stalagmite grid always faces out, and its splash cup would fool this test)
  if ((i2.y < 1.5 || i2.y > 2.5) && (i2.y < 3.5 || i2.y > 4.5)) { if (dot(n, p - ax) < 0.0) n = -n; }
  vR = (i2.y > 1.5 && i2.y < 2.5) ? 0.003 + 0.012 * (1.0 - s) * (1.0 - s) : length(p - ax);
  vP = p; vN = n; vO = o0; vTh = aM.y; vM = vec4(s, i2.y, i2.z, i0.w); vS = ivec2(int(i3.z), int(i3.w)); vV = i2.y > 3.5 && i2.y < 4.5 ? i3.y : 1.0;
  vec3 v = p - uV[0].xyz;
  float z = dot(v, uV[1].xyz);
  gl_Position = vec4(v.x / uV[0].w, dot(v, uV[2].xyz) / uV[0].w, (z / FAR * 2.0 - 1.0) * z, z);
}`,je=h0+Mt+Xe+Oe+Pt+`
vec3 poolLight(vec3 P, vec3 N) {
  float W = uV[3].w;
  if (P.y < W + 0.03 || uV[11].w <= 0.0) return vec3(0.0);
  vec3 L = uV[11].xyz, Lm = vec3(L.x, 2.0 * W - L.y, L.z);
  vec3 Wp = P + (Lm - P) * ((P.y - W) / (P.y - Lm.y));
  float pp = poolP(Wp.xz);
  if (pp > -0.02) return vec3(0.0);
  vec3 l = normalize(Lm - P);
  float ndl = max(dot(N, l), 0.0);
  float D = length(Lm - P);
  float cosI = (L.y - W) / max(length(L - Wp), 1e-3);
  float F = 0.02 + 0.98 * pow(1.0 - cosI, 5.0);
  float dLW = length(L - Wp), dPW = length(P - Wp);
  float fwP = length(P - uV[0].xyz) * uV[0].w * 2.0 / uV[2].w;
  vec4 r = rings(Wp.xz, fwP * dLW / (dLW + dPW) + 0.001);
  float foc = clamp(1.0 - r.w * dPW * 0.05, 0.35, 2.2);
  return uV[12].rgb * uV[11].w * F * ndl * foc / (D * D + 0.02) * smoothstep(-0.02, -0.15, pp) * 1.8;
}
`+`
in vec3 vP; in vec3 vN; in vec4 vM; in float vTh; in float vR; in float vO; flat in ivec2 vS; flat in float vV;
uniform sampler3D uN3;
out vec4 o;
void main() {
  bool mir = uV[1].w > 0.5;
  if (mir && vP.y < uV[3].w) discard;
  vec3 V = normalize(uV[0].xyz - vP);
  float s = vM.x, ty = vM.y, sd = vM.z, L = vM.w;
#if FT == 2
  bool sheet = ty > 1.5 && ty < 2.5;
#else
  const bool sheet = false;
#endif
  float cth = abs(vTh * 4.0 - 2.0) - 1.0;
  // drapery ends in a scalloped edge, not a straight hem
  if (sheet && s > 0.985 - 0.035 * (0.5 + 0.5 * sin(cth * 19.0 + sd * 3.0)) - 0.02 * (0.5 + 0.5 * sin(cth * 7.0 + sd * 8.0))) discard;
  vec3 N = normalize(vN); if (dot(N, V) < 0.0 && sheet) N = -N;
  // the fine folds of drapery: a bump applied with screen derivatives. Round formations take no texture slope (a
  // trilinear slope read per 2x2 pixels drew 2 px blocks): their relief is the closed-form lumps, rings and flutes, and
  // one coarse lookup only mottles their colour
  vec4 kn = texture(uN3, vP * (ty > 3.5 && ty < 4.5 ? vec3(12.0, 4.0, 12.0) : vec3(2.5, 1.6, 2.5)) + sd);
  {
    float bh = sheet ? 0.014 * sin(cth * 8.0 + sd * 5.0 + 1.5 * sin(s * 4.0 + sd)) * (0.15 + 0.85 * s) : 0.0;
    vec3 dpx = dFdx(vP), dpy = dFdy(vP), r1 = cross(dpy, N), r2 = cross(N, dpx);
    float det = dot(dpx, r1);
    vec3 gb = sign(det) * (dFdx(bh) * r1 + dFdy(bh) * r2);
    if (abs(det) > 1e-14) N = normalize(abs(det) * N - gb);
  }
  if (ty < 1.5 || ty > 3.5) {
    float ring = (2.0 * smoothstep(0.55, 0.98, sin(s * L * 210.0 + 3.0 * sin(s * L * 31.0 + sd * 9.0) + 2.0 * sin(vTh * 6.2832 * 2.0 + sd * 5.0))) - 0.4) * (ty > 4.5 ? 0.05 : ty < 0.5 ? 0.055 : ty > 3.5 && ty < 4.15 ? 0.015 : 0.04);
    float flute = sin(vTh * 6.2832 * 7.0 + sd * 7.0 + s * 4.0) * 0.08 + sin(vTh * 6.2832 * 3.0 + sd * 3.0) * 0.06;
    if (ty > 3.5 && ty < 4.5) flute = (0.07 * sin(vTh * 6.2832 * 9.0 + sd * 7.0 + 1.3 * sin(s * L * 14.0 + sd * 3.0)) + 0.05 * sin(vTh * 6.2832 * 16.0 + sd * 3.0 + s * L * 5.0)) * (0.3 + 1.4 * kn.g);
    N = normalize(N + vec3(0.0, 1.0, 0.0) * ring + normalize(cross(N, vec3(0.0, 1.0, 0.0)) + 1e-4) * flute);
  }
  // growth rings: each a slightly different calcite, so they show in the stone's colour and in the light through it
  float rg = sin(s * L * 170.0 + sd * 20.0 + 2.5 * sin(s * L * 23.0 + sd * 4.0));
  vec3 alb = mix(uV[18].rgb, uV[19].rgb, 0.6 * smoothstep(0.25, 1.0, s));
  alb *= 0.92 + 0.08 * rg;
  // tk: how much lamp light the stone lets through; dn: how dense it is to that light
  float wet = 0.6, ao = mix(0.3, 1.0, smoothstep(0.0, 0.25, s * L)), tk = 0.0, dn = 1.0 + 0.08 * rg;
  if (ty < 0.5) { wet = 0.75 + 0.25 * s; tk = 0.55; }
  else if (ty < 1.5) { wet = 1.0; tk = 1.0; alb = mix(alb, uV[19].rgb, 0.75); }
#if FT == 2
  else if (sheet) {
    wet = 0.75; tk = 1.0;
    // "bacon": bands of iron-stained and clean calcite, each one an old lower edge
    // of no two widths, and following the folds a little
    float bs = s + 0.025 * sin(cth * 6.0 + sd * 2.0);
    vec4 bn = textureLod(uN3, vec3(bs * 1.9 + sd, sd * 3.7, 0.37), 0.0), bm = textureLod(uN3, vec3(bs * 6.5 + sd * 5.0, sd * 1.3, 0.71), 0.0);
    float band = clamp(smoothstep(0.38, 0.62, bn.r) * 0.7 + smoothstep(0.52, 0.6, bm.g) * 0.5, 0.0, 1.0);
    alb = mix(mix(alb, uV[19].rgb, 0.35), uV[20].rgb, band * 0.7);
    dn = 0.4 + 1.5 * band;
    ao = mix(0.45, 1.0, smoothstep(0.0, 0.3, s));
  }
#endif
  else if (ty < 3.5) { wet = 0.5; tk = 0.8; alb = uV[19].rgb; ao = 1.0; }
  else if (ty < 4.5) {
    // stalagmites: matt calcite under a wet film that runs in streaks down the flutes; honey stains hang from the tiers'
    // lips, the necks under them stay dark (vO), the foot darker still, and the top is wet where the drip lands
    float st = smoothstep(0.55, 0.95, 0.5 + 0.5 * sin(vTh * 6.2832 * 7.0 + sd * 7.0 + 1.6 * sin(s * L * 9.0 + sd * 5.0) + 3.0 * kn.g)) * (0.5 + kn.r);
    float mt = 0.5 + 0.3 * sin(s * L * 23.0 + sd * 7.0 + 2.0 * sin(vTh * 6.2832 + sd * 3.0)) + 0.2 * sin(vTh * 6.2832 * 3.0 + s * L * 9.0 + sd * 11.0);
    wet = 0.15 + 0.85 * st + 0.4 * smoothstep(0.8, 1.0, s); tk = 0.35;
    alb = mix(uV[18].rgb, uV[19].rgb, 0.05 + 0.25 * s);
    alb = mix(alb, uV[20].rgb, clamp(0.45 * smoothstep(0.35, 0.9, mt * 0.6 + kn.r * 0.6) + 0.5 * st, 0.0, 0.85) * (1.0 - 0.4 * s));
    alb *= (0.68 + 0.5 * kn.b) * (1.0 - 0.12 * st);
    float ft = smoothstep(0.03, 0.06 + 0.5 * vR, s * L);
    alb *= (0.84 + 0.08 * sin(s * L * 70.0 + sd * 13.0 + 3.0 * sin(s * L * 11.0 + sd * 5.0))) * mix(0.55, 1.0, ft);
    ao = mix(0.35, 1.0, ft) * vO;
  }
  else { wet = 1.0; tk = 1.0; alb = uV[19].rgb; }
  vec3 col = lit(vP, N, V, alb, wet, ao * 1.6, 1e-4, vS.x, vS.y, vV, 0.0) + alb * poolLight(vP, N) * 0.6;
  if (uV[11].w > 0.0) {
    vec3 dL = uV[11].xyz - vP; float D2 = dot(dL, dL); vec3 l = dL * inversesqrt(D2);
    float ndl = dot(N, l), shs = 0.2 + 0.8 * gSh;
    vec3 Li = uV[12].rgb * uV[11].w * shs;
    // lamp light through the stone. Its path is a chord of the round section (short at the flanks and the tip, so
    // they glow while the core stays dark), the wall of a hollow straw, or the thickness of a sheet. Iron in the
    // calcite takes the blue first, ice takes the red, and white calcite takes little: the stone's own colour says which.
    float path = sheet ? vR / max(abs(ndl), 0.3) : ty > 0.5 && ty < 1.5 ? 0.003 : 2.0 * vR * max(-ndl, 0.0);
    vec3 T = exp(log(uV[18].rgb) * (uV[18].w > 0.5 ? 12.0 : 75.0) * path * dn - (6.0 - 4.0 * uV[18].w) * path);
    float back = sheet ? clamp(0.4 - ndl, 0.0, 1.0) : ty > 0.5 && ty < 1.5 ? 0.25 + 0.75 * max(-dot(V, l), 0.0) : clamp(1.0 - ndl, 0.0, 1.0);
    col += alb * Li / (D2 + 0.1) * T * back * tk;
    // the lit rock round the lamp is a wide, soft source of its own: it wraps past the terminator and rounds the body
    float wr = clamp((ndl + 0.85) / 1.85, 0.0, 1.0);
    col += alb * Li / (D2 + 0.3) * (wr * wr * 0.7 * vO + (ty > 0.5 && ty < 1.5 ? 0.1 + 0.22 * fract(sd * 7.3) : 0.0));
    // wet sheen: the film mirrors that lit rock, brightest at grazing angles
    vec3 Rf = reflect(-V, N);
    float fv = 0.03 + 0.97 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    col += Li / (D2 + 0.3) * fv * wet * (0.07 + 1.8 * pow(max(dot(Rf, l), 0.0), 3.0));
  }
  if (ty > 4.5) col += uV[15].rgb * 0.8 * pow(1.0 - max(dot(N, V), 0.0), 2.0);
  o = vec4(mir ? enc(col) : tone(col, gl_FragCoord.xy), 1.0);
}`,Co=h0+`
layout(location = 0) in vec2 aQ;
layout(location = 1) in vec4 i0;
layout(location = 2) in vec4 i1;
layout(location = 3) in vec4 i2;
out vec2 vP; flat out vec2 vA; flat out vec2 vB; flat out float vR; flat out vec4 vC; flat out float vK;
vec4 projc(vec3 X) { vec3 v = X - uV[0].xyz; float z = dot(v, uV[1].xyz); return vec4(v.x / uV[0].w, dot(v, uV[2].xyz) / uV[0].w, (z / FAR * 2.0 - 1.0) * z, z); }
void main() {
  vec4 a = projc(i0.xyz), b = projc(i0.xyz + i1.xyz);
  bool mir = uV[1].w > 0.5;
  if (a.w < 0.05 || b.w < 0.05 || (mir && i0.y < uV[3].w)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec2 sa = a.xy / a.w, sb = b.xy / b.w;
  float r = max(i0.w / (a.w * uV[0].w), 2.0 / uV[2].w);
  vec2 ax = sb - sa; float L = length(ax);
  vec2 t = L > 1e-6 ? ax / L : vec2(1.0, 0.0), n = vec2(-t.y, t.x);
  float ext = i1.w > 1.5 && i1.w < 2.5 ? 4.0 : 2.0;
  vec2 p = (sa + sb) * 0.5 + t * aQ.x * (L * 0.5 + r * ext) + n * aQ.y * r * ext;
  vP = p; vA = sa; vB = sb; vR = r; vC = i2; vK = i1.w;
  gl_Position = vec4(p * a.w, a.z, a.w);
}`,Io=h0+`
in vec2 vP; flat in vec2 vA; flat in vec2 vB; flat in float vR; flat in vec4 vC; flat in float vK;
out vec4 o;
void main() {
  vec2 pa = vP - vA, ba = vB - vA;
  float d = length(pa - ba * clamp(dot(pa, ba) / max(dot(ba, ba), 1e-12), 0.0, 1.0)) / vR;
  float a;
  if (vK < 0.5) a = exp(-d * d * 2.2);
  else if (vK < 1.5) a = exp(-d * d * 2.5) * 0.7;
  else if (vK < 2.5) a = exp(-d * d * 1.6) + 0.08 * exp(-d * 1.1);
  else a = exp(-d * d * 3.0) * 0.6;
  vec3 c = vC.rgb * a * vC.a * (vK > 1.5 ? uV[15].w : 1.0) * uV[13].y;
  o = vec4(1.0 - exp(-c), 0.0);
}`,Wo=h0+`
layout(location = 0) in vec2 aQ;
out vec2 vP; flat out vec2 vB; flat out vec2 vU; flat out vec2 vX;
vec4 projc(vec3 X) { vec3 v = X - uV[0].xyz; float z = dot(v, uV[1].xyz); return vec4(v.x / uV[0].w, dot(v, uV[2].xyz) / uV[0].w, (z / FAR * 2.0 - 1.0) * z, z); }
void main() {
  vec3 B = uV[21].xyz, T = uV[22].xyz;
  vec4 b = projc(B), t = projc(T), x = projc(B + vec3(0.1, 0.0, 0.0)), f = projc(mix(B, T, uV[23].x));
  vec2 sb = b.xy / b.w, st = t.xy / t.w, sx = x.xy / x.w, sf = f.xy / f.w;
  vB = sb; vU = st - sb; vX = normalize(sx - sb) * length(st - sb);
  float H = max(length(st - sb) * 1.6, 0.42);
  vP = sf + aQ * H;
  float z = f.z / f.w - 0.0004;
  gl_Position = b.w > 0.05 ? vec4(vP, z, 1.0) : vec4(2.0, 2.0, 2.0, 1.0);
}`,qo=h0+`
in vec2 vP; flat in vec2 vB; flat in vec2 vU; flat in vec2 vX;
out vec4 o;
float box(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float hsh(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
void main() {
  // local lamp coordinates in units of the lamp height (x right, y up from the base)
  vec2 d = vP - vB;
  mat2 M = mat2(vX, vU);
  vec2 p = inverse(M) * d;
  float px = 2.0 / (uV[2].w * length(vU));
  float ty = uV[21].w, on = uV[23].y, fl = uV[22].w;
  float fy = uV[23].x;
  vec3 col = vec3(0.0); float a = 0.0;
  vec3 Lc = uV[12].rgb;
  float bodyD = 1e3; vec3 bodyC = vec3(0.0);
  // flame / emitter
  vec2 fp = p - vec2(0.0, fy);
  float flame = 0.0; vec3 fcol = vec3(0.0);
  if (ty < 0.5) {
    // candle lantern: base, posts, roof, ring, glass, candle
    float metal = box(p - vec2(0.0, 0.045), vec2(0.27, 0.045));
    metal = min(metal, box(vec2(abs(p.x) - 0.245, p.y - 0.42), vec2(0.022, 0.37)));
    metal = min(metal, box(vec2(abs(p.x) - 0.085, p.y - 0.42), vec2(0.011, 0.37)));
    float roof = max(box(p - vec2(0.0, 0.84), vec2(0.3, 0.07)), abs(p.x) - (0.3 - (p.y - 0.77) * 1.6));
    metal = min(metal, roof);
    metal = min(metal, abs(length(p - vec2(0.0, 0.98)) - 0.09) - 0.016);
    float glass = box(p - vec2(0.0, 0.42), vec2(0.235, 0.36));
    float cand = box(p - vec2(0.0, 0.2), vec2(0.06, 0.12));
    vec2 q = (fp - vec2(fl * 0.02 * (p.y - fy), 0.0)) / vec2(0.034, 0.1);
    float fd = length(vec2(q.x * (1.0 + 0.5 * max(q.y, 0.0)), q.y * (q.y > 0.0 ? 0.75 : 1.4)));
    flame = smoothstep(1.0, 0.3, fd) * on;
    fcol = mix(vec3(1.0, 0.45, 0.12), vec3(1.0, 0.92, 0.7), smoothstep(0.9, 0.2, fd)) * 3.0 + vec3(0.2, 0.3, 1.0) * smoothstep(0.6, 0.0, abs(q.y + 0.6)) * smoothstep(1.0, 0.4, abs(q.x)) * 0.8;
    float g = smoothstep(px, -px, glass);
    vec3 gc = Lc * on * (0.35 + 0.5 * exp(-dot(fp, fp) * 9.0)) * (0.8 + 0.2 * hsh(floor(p * 40.0)));
    col = mix(col, gc, g); a = max(a, g * mix(0.25, 0.85, on));
    float cd = smoothstep(px, -px, cand);
    col = mix(col, vec3(0.95, 0.85, 0.65) * (0.25 + 1.2 * on * smoothstep(0.0, 0.3, p.y)), cd); a = max(a, cd);
    float m = smoothstep(px, -px, metal);
    vec3 mc = vec3(0.05, 0.045, 0.04) + Lc * on * 0.35 * exp(-abs(metal) * 30.0) * smoothstep(0.1, 0.7, p.y);
    col = mix(col, mc, m); a = max(a, m);
  } else if (ty < 1.5) {
    // carbide lamp: brass water / carbide body, reflector, jet flame
    float body = box(p - vec2(0.0, 0.2), vec2(0.17, 0.2)) - 0.03;
    body = min(body, box(p - vec2(0.0, 0.47), vec2(0.11, 0.08)) - 0.02);
    float refl = length(p - vec2(0.0, 0.68)) - 0.27;
    vec3 brass = vec3(0.55, 0.38, 0.15);
    float sh = 0.25 + 0.75 * smoothstep(0.17, -0.1, p.x);
    float m = smoothstep(px, -px, body);
    col = mix(col, brass * (0.05 + Lc * on * 0.45 * sh) + vec3(1.0, 0.85, 0.6) * on * 0.6 * smoothstep(0.04, 0.0, abs(p.x + 0.07)) * step(p.y, 0.4), m); a = max(a, m);
    float rr = length(p - vec2(0.0, 0.68)) / 0.27;
    float rm = smoothstep(px * 4.0, -px * 4.0, refl);
    vec3 rc = mix(vec3(0.9, 0.85, 0.75), brass, smoothstep(0.7, 1.0, rr)) * (0.08 + on * (0.3 + 1.6 * exp(-rr * rr * 5.0)) * Lc);
    col = mix(col, rc, rm); a = max(a, rm);
    vec2 q = (fp - vec2(fl * 0.012 * (p.y - fy), 0.0)) / vec2(0.035, 0.14);
    float fd = length(vec2(q.x * (1.0 + 0.8 * max(q.y, 0.0)), q.y * (q.y > 0.0 ? 0.7 : 2.0)));
    flame = smoothstep(1.0, 0.25, fd) * on;
    fcol = mix(vec3(1.0, 0.75, 0.4), vec3(1.0, 0.98, 0.9), smoothstep(0.8, 0.1, fd)) * 3.5;
  } else {
    // cold LED: a small matt housing, the emitter a point too bright to have a shape
    float body = box(p - vec2(0.0, 0.17), vec2(0.13, 0.13)) - 0.03;
    float m = smoothstep(px, -px, body);
    col = mix(col, vec3(0.045, 0.043, 0.04) + Lc * on * 0.05 * smoothstep(0.0, 0.3, p.y) * (0.6 + 0.4 * smoothstep(0.13, -0.1, p.x)), m); a = max(a, m);
    flame = on * exp(-dot(fp, fp) * 900.0);
    fcol = vec3(1.0, 1.0, 1.0) * 4.0;
  }
  col = mix(col, fcol, clamp(flame, 0.0, 1.0)); a = max(a, clamp(flame, 0.0, 1.0));
  // glare in screen space around the flame
  vec2 fs = (vP - (vB + vU * fy)) * 0.5;
  float r = length(fs);
  float g = ty > 1.5 ? 0.5 * exp(-r * r / 0.00003) + 0.1 * exp(-r / 0.006) + 0.012 * exp(-r / 0.02) : 0.55 * exp(-r * r / 0.00012) + 0.12 * exp(-r / 0.022) + 0.03 * exp(-r / 0.09);
  vec3 glare = Lc * g * on * (0.85 + 0.15 * fl);
  vec3 c = col * uV[13].y;
  vec3 disp = uV[1].w > 0.5 ? c / (1.0 + c) : 1.0 - exp(-c * 1.2);
  vec3 gl = uV[1].w > 0.5 ? glare * 0.6 : glare;
  o = vec4(disp * a + gl, a);
}`;function F0(n,o,d){const w=(S,B)=>{const k=n.createShader(S);return n.shaderSource(k,B),n.compileShader(k),k},T=n.createProgram(),F=w(n.VERTEX_SHADER,o),E=w(n.FRAGMENT_SHADER,d);return n.attachShader(T,F),n.attachShader(T,E),n.linkProgram(T),{p:T,u:{},sh:[F,E]}}const Xo=["march","nrm","alb","comp","spr","lamp"],It=(n,o)=>n.replace("#define FAR 14.0","#define FT "+o+`
#define FAR 14.0`),M=32;function Oo(){const n=new Uint8Array(M*M*M*4),o=[4,8,6,10];for(let d=0;d<4;d++){const w=o[d],T=new Float32Array(w*w*w);let F=(d+1)*2654435761|0;for(let f=0;f<T.length;f++)F=Math.imul(F^F>>>15,739982445)+1831565813|0,F^=F>>>12,T[f]=(F>>>0)%1e5/1e5;const E=w/M;let S=1,B=0;const k=new Float32Array(M*M*M);for(let f=0;f<M;f++)for(let D=0;D<M;D++)for(let U=0;U<M;U++){const $=U*E,q=D*E,y0=f*E,I0=Math.floor($),L0=Math.floor(q),w0=Math.floor(y0);let u0=$-I0,W0=q-L0,p0=y0-w0;u0=u0*u0*(3-2*u0),W0=W0*W0*(3-2*W0),p0=p0*p0*(3-2*p0);const t0=I0%w,s0=(I0+1)%w,g0=L0%w,e0=(L0+1)%w,et=w0%w,R=(w0+1)%w,l0=(N,P,_0)=>T[(_0*w+P)*w+N],Q=Y(Y(Y(l0(t0,g0,et),l0(s0,g0,et),u0),Y(l0(t0,e0,et),l0(s0,e0,et),u0),W0),Y(Y(l0(t0,g0,R),l0(s0,g0,R),u0),Y(l0(t0,e0,R),l0(s0,e0,R),u0),W0),p0);k[(f*M+D)*M+U]=Q,Q<S&&(S=Q),Q>B&&(B=Q)}for(let f=0;f<k.length;f++)n[f*4+d]=Math.round((k[f]-S)/(B-S)*255)}return n}function Go(n,o){let d=Ie.get(n);const w="form"+o;if(d)return d[w]||(d[w]=F0(n,It(Ge,o),It(je,o)),n.flush()),d;const T=We;n.getExtension("KHR_parallel_shader_compile"),d={march:F0(n,T,ko),nrm:F0(n,T,So),alb:F0(n,T,Bo),comp:F0(n,T,No),[w]:F0(n,It(Ge,o),It(je,o)),spr:F0(n,Co,Io),lamp:F0(n,Wo,qo),vao0:n.createVertexArray(),ok:!1},n.flush(),d.n3data=Oo(),d.n3=n.createTexture(),n.bindTexture(n.TEXTURE_3D,d.n3),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.texImage3D(n.TEXTURE_3D,0,n.RGBA8,M,M,M,0,n.RGBA,n.UNSIGNED_BYTE,d.n3data),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_3D,n.TEXTURE_MAG_FILTER,n.LINEAR);for(const E of[n.TEXTURE_WRAP_S,n.TEXTURE_WRAP_T,n.TEXTURE_WRAP_R])n.texParameteri(n.TEXTURE_3D,E,n.REPEAT);const F=(E,S,B)=>{const k=new Float32Array((E+1)*(S+1)*2),f=new Uint16Array(E*S*6);let D=0;for(let U=0;U<=E;U++)for(let $=0;$<=S;$++){const q=U/E;k[D++]=.6*Math.pow(q,.85)+.4*(.5-.5*Math.cos(Math.PI*q)),k[D++]=$/S}D=0;for(let U=0;U<E;U++)for(let $=0;$<S;$++){const q=U*(S+1)+$,y0=q+S+1;f[D++]=q,f[D++]=y0,f[D++]=q+1,f[D++]=q+1,f[D++]=y0,f[D++]=y0+1}d["meshV"+B]=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,d["meshV"+B]),n.bufferData(n.ARRAY_BUFFER,k,n.STATIC_DRAW),d["meshI"+B]=n.createBuffer(),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,d["meshI"+B]),n.bufferData(n.ELEMENT_ARRAY_BUFFER,f,n.STATIC_DRAW),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,null),d["meshN"+B]=f.length};return F(40,16,""),F(64,36,"2"),d.quad=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,d.quad),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),n.STATIC_DRAW),d.lampVao=n.createVertexArray(),n.bindVertexArray(d.lampVao),n.bindBuffer(n.ARRAY_BUFFER,d.quad),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,2,n.FLOAT,!1,0,0),n.bindVertexArray(null),Ie.set(n,d),d}function jo(n,o,d){const w=o.ok?[]:Xo.slice();o.ok=!0,o[d].ok||(o[d].ok=!0,w.push(d));for(const T of w){const F=o[T];if(!n.getProgramParameter(F.p,n.LINK_STATUS))throw new Error("066 link "+T+": "+n.getProgramInfoLog(F.p)+" "+n.getShaderInfoLog(F.sh[0])+" "+n.getShaderInfoLog(F.sh[1]))}for(const T of w)He(n,o[T])}function He(n,o){const d=n.getProgramParameter(o.p,n.ACTIVE_UNIFORMS);for(let T=0;T<d;T++){const F=n.getActiveUniform(o.p,T);o.u[F.name.replace(/\[0\]$/,"")]=n.getUniformLocation(o.p,F.name)}n.useProgram(o.p);const w={uN3:0,uGt:1,uNt:2,uAt:3,uD:4,uRf:5,uSh:6,uFs:7};for(const T in w)o.u[T]&&n.uniform1i(o.u[T],w[T])}function x0(n,o,d,w,T,F){const E=n.createTexture();return n.bindTexture(n.TEXTURE_2D,E),n.texImage2D(n.TEXTURE_2D,0,w,o,d,0,n.RGBA,T,F||null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,w===n.RGBA8?n.LINEAR:n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,w===n.RGBA8?n.LINEAR:n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),E}function b0(n,o,d){const w=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,w),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0),d&&n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,d),w}const Ho={"Major pentatonic":[0,2,4,7,9],"Minor pentatonic":[0,3,5,7,10],Dorian:[0,2,3,5,7,9,10],Lydian:[0,2,4,6,7,9,11]};Ce.add({num:66,name:"Drip Cave",fam:"Worlds",recipe:"A still limestone cave lit by one lamp on a ledge. Drops fall from the stalactites into a clear pool, each one ringing the water with a note, so the cave plays slow music. Tap a stalactite to shake a drop loose, drag to carry the lamp, tap the lamp to put it out or light it, or hold to run time so the formations grow and meet.",interactive:"Tap a stalactite to shake loose a drop. Drag across the cave to carry the lamp along the ledge: the shadows swing and the caustics move. Tap the lamp to put it out or light it. Hold to make time run: centuries pass in seconds and the cave grows, for good.",music:!0,gl:!0,fps:30,seed:0,make(n){const o=n.gl,d=n.size,w=n.hash.slice(2),T=t=>{let e=parseInt(w.slice(t,t+8),16)>>>0,s=parseInt(w.slice(t+8,t+16),16)>>>0,a=parseInt(w.slice(t+16,t+24),16)>>>0,r=parseInt(w.slice(t+24,t+32),16)>>>0;const i=()=>{e>>>=0,s>>>=0,a>>>=0,r>>>=0;let l=e+s|0;return e=s^s>>>9,s=a+(a<<3)|0,a=a<<21|a>>>11,r=r+1|0,l=l+r|0,a=a+l|0,(l>>>0)/4294967296};for(let l=0;l<15;l++)i();return i},F=T(0),E=T(16),S=T(32),B=T(8),k=(t,e)=>{e=e||F;let s=0;for(const r of t)s+=r[1];let a=e()*s;for(const r of t)if(a-=r[1],a<=0)return r[0];return t[t.length-1][0]},f=(t,e,s)=>t+(e-t)*(s||E)();let D=k([["Cream limestone",40],["Orange iron-stained",30],["White calcite",22],["Blue ice cave",8]]),U=k([["Stalactite forest",38],["Soda straws",27],["Flowstone curtains",25],["Helictites",10]]),$=k([["Clear turquoise",42],["Deep blue",33],["Still black mirror",25]]),q=k([["Candle lantern",40],["Carbide lamp",35],["Cold LED",25]]),y0=k([["Major pentatonic",30],["Minor pentatonic",26],["Dorian",19],["Lydian",15],["Overtone series",10]]),I0=k([["Low vault",35],["High hall",35],["Passage beyond",30]]),L0=k([["Slow drips",32],["Steady drips",46],["Busy drips",22]]),w0=k([["None",70],["Glow-worms",12],["Cave pearls",10],["A column completing",8]]);n.home&&(D="Cream limestone",U="Stalactite forest",$="Clear turquoise",q="Candle lantern",y0="Major pentatonic",I0="High hall",L0="Steady drips",w0="Cave pearls");const u0=w0==="Cave pearls";u0&&(w0="None"),n.trait("Stone",D),n.trait("Formations",U),n.trait("Pool",$),n.trait("Lamp",q),n.trait("Tuning",y0),n.trait("Chamber",I0),n.trait("Drips",L0),n.trait("Rare",w0);const W0=T(4);let p0=k([["From the bank",50],["Low at the water",22],["Along the wall",14],["Up into the roof",14]],W0);n.home&&(p0="From the bank"),n.trait("View",p0);const t0=D==="Blue ice cave",s0=U[0]==="S"&&U[1]==="t"?0:U[0]==="S"?1:U[0]==="F"?2:3,g0=$[0]==="C"?0:$[0]==="D"?1:2,e0=q[0]==="C"&&q[1]==="a"&&q[2]==="n"?0:q[0]==="C"&&q[1]==="a"?1:2,et=I0[0]==="L"?0:I0[0]==="H"?1:2,R=Go(o,s0),l0="form"+s0,Q=E()<.5?1:-1,N=0;let P=[0,.45,-.1],_0=.1;p0==="Low at the water"?(P=[-Q*.22,.16,.75],_0=.22):p0==="Along the wall"?(P=[Q*.7,.42,.05],_0=.22):p0==="Up into the roof"&&(P=[-Q*.25,.18,.35],_0=.42);const q0=Math.tan(33*Math.PI/180),z0=[0,Math.sin(_0),Math.cos(_0)],X0=[0,Math.cos(_0),-Math.sin(_0)],At=[[1.95,1.4,2.5,.5,1.52],[2.1,1.95,2.6,.72,2.25],[1.95,1.6,2.5,.55,1.78]][et],K=[0,At[3],1.85],C=[At[0],At[1],At[2]],Ye=At[4]+f(-.06,.06),Ke=f(-.08,.06),Je=f(.06,.14),re=f(0,W),ot=N+f(.3,.36),Ft=-.4,Lt=f(1.5,1.7),o0=[Q*f(.02,.22),f(2.55,2.7)],c0=[f(1.15,1.35),f(1.7,1.8)],X=[f(.03,.09),f(0,W),f(.02,.07),f(0,W)],Qe=[f(.35,.5),f(.7,.95),f(.8,1.1)][g0],k0=et===2?[-Q*f(.7,1.1),.62,3.85,f(.5,.62)]:[0,0,0,0],Ze=f(.16,.28),Wt=f(0,50),$e=t=>ot+.06*Math.sin(t*1.7+Wt)+.03*Math.sin(t*4.3+Wt*1.7),to=(t,e,s)=>{const a=Math.max(s-Math.abs(t-e),0)/s;return Math.min(t,e)-a*a*s*.25},eo=(t,e,s)=>-to(-t,-e,s),a0=[{c0:[.5,.42,.31],c1:[.66,.58,.45],fl:[.8,.7,.54],st:[.42,.26,.13,.35],mud:[.22,.16,.11],fb:[.7,.6,.46],ft:[.9,.86,.78],band:[.62,.44,.26]},{c0:[.5,.29,.14],c1:[.68,.43,.22],fl:[.82,.56,.3],st:[.4,.15,.05,.85],mud:[.28,.14,.07],fb:[.76,.46,.24],ft:[.94,.74,.52],band:[.62,.22,.07]},{c0:[.66,.64,.6],c1:[.8,.79,.75],fl:[.9,.89,.86],st:[.55,.47,.38,.18],mud:[.33,.3,.26],fb:[.86,.85,.82],ft:[.96,.96,.95],band:[.75,.68,.58]},{c0:[.36,.52,.66],c1:[.55,.7,.82],fl:[.72,.84,.93],st:[.25,.4,.56,.3],mud:[.3,.34,.4],fb:[.62,.78,.92],ft:[.8,.92,1],band:[.45,.62,.82]}][t0?3:D[0]==="C"?0:D[0]==="O"?1:2],T0=[{sig:[.6,.13,.1],sc:[.004,.02,.022],bot:[.72,.68,.58]},{sig:[.95,.32,.12],sc:[.004,.02,.07],bot:[.42,.44,.44]},{sig:[3,2.7,2.4],sc:[.001,.001,.002],bot:[.06,.05,.045]}][g0];t0&&(T0.sig=T0.sig.map((t,e)=>t*[1.1,.9,.8][e]));const z=[{col:[1,.56,.24],I:1,exp:1.4,rad:.03,fy:.37,h:.19},{col:[1,.74,.46],I:1.35,exp:1.2,rad:.02,fy:.68,h:.2},{col:[.97,.96,1],I:1.5,exp:.95,rad:.015,fy:.24,h:.12}][e0],ie=t0?[9e-4,.0024,.0048]:[5e-4,45e-5,4e-4],le=t=>{const e=Math.cbrt(.4122*t[0]+.5363*t[1]+.0514*t[2]),s=Math.cbrt(.2119*t[0]+.6807*t[1]+.1074*t[2]),a=Math.cbrt(.0883*t[0]+.2817*t[1]+.63*t[2]);return[.2105*e+.7936*s-.0041*a,1.978*e-2.4286*s+.4506*a,.0259*e+.7828*s-.8087*a]},oo=t=>{const e=(t[0]+.3963*t[1]+.2158*t[2])**3,s=(t[0]-.1056*t[1]-.0639*t[2])**3,a=(t[0]-.0895*t[1]-1.2915*t[2])**3;return[4.0767*e-3.3077*s+.231*a,-1.2684*e+2.6098*s-.3413*a,-.0042*e-.7034*s+1.7076*a].map(r=>Math.max(r,0))},ce=(()=>{if(g0===2)return z.col.slice();if(e0===2){const a=le(z.col),r=le(T0.sig.map(l=>Math.exp(-l))),i=Math.atan2(r[2],r[1]);return oo([a[0],.024*Math.cos(i),.024*Math.sin(i)])}const t=le(z.col),e=Math.hypot(t[1],t[2]),s=Math.atan2(t[2],t[1])+(g0===1?26:20)*Math.PI/180*(e0===2?.3:1);return oo([t[0],e*.55*Math.cos(s),e*.55*Math.sin(s)])})(),so=t0?.4:D[0]==="W"?.75:0,qt=R.n3data,Yo=[0,0,0,0],Ko=(t,e,s)=>{const a=t*M-.5,r=e*M-.5,i=s*M-.5,l=Math.floor(a),h=Math.floor(r),p=Math.floor(i),v=a-l,x=r-h,y=i-p,u=Yo;u[0]=u[1]=u[2]=u[3]=0;for(let c=0;c<8;c++){const m=c&1,g=c>>1&1,A=c>>2,H=(m?v:1-v)*(g?x:1-x)*(A?y:1-y),C0=((l+m)%M+M)%M,$0=((h+g)%M+M)%M,A0=((((p+A)%M+M)%M*M+$0)*M+C0)*4;u[0]+=H*qt[A0],u[1]+=H*qt[A0+1],u[2]+=H*qt[A0+2],u[3]+=H*qt[A0+3]}return u},ao=(t,e)=>.06*Math.sin(t*1.7+e*1.9)+.03*Math.sin(t*4.1+e*4.1)+.015*Math.sin(t*9.3+e*2.3)+.006*Math.sin(t*23+e),Xt=(t,e,s)=>{const a=Ko(t,e,s);return(a[0]*.62+a[1]*.38)/255},_t=(t,e)=>{const s=(t-o0[0])/c0[0],a=(e-o0[1])/c0[1],r=Math.atan2(a,s+1e-6);let i=1+X[0]*Math.sin(2*r+X[1])+X[2]*Math.sin(3*r+X[3])+.03*Math.sin(7*r+X[1]*3)+.016*Math.sin(12*r+X[3]*5)+.009*Math.sin(19*r+X[1]*7)+.005*Math.sin(31*r+X[3]*11);const l=r*14.32394+.4*Math.sin(r*3+X[1]),h=(l-Math.floor(l))*2-1;return i+=.016*(1-h*h)*(.55+.45*Math.sin(r*5+X[3])),(Math.hypot(s,a)-i)*Math.min(c0[0],c0[1])};let E0=N,ut=0;const r0=(t,e,s)=>{const a=J((s-t)/(e-t),0,1);return a*a*(3-2*a)},fe=(t,e)=>{const s=_t(t,e);let a=t-o0[0]+1e-5,r=e-o0[1]+1e-5;const i=Math.hypot(a,r);r/=i;const l=r0(-.3,-.75,r),h=E0+.004*l;if(s<0){const m=N-.02-Qe*r0(0,.9,-s)*(.8+.2*Math.sin(t*2.3+e*1.7+Wt));return Y(m,h-.006*(1-l),r0(-.08-.25*(1-l),0,s))}const p=h+Ze*r0(0,.8,s)+.05*r0(.3,1.2,s)*Math.sin(t*3.1+e*2.3),v=h-.12*r0(.022,.05,s),x=Math.max(s-.08,0)/.19,y=Math.floor(x),u=x-y,c=N-.115-y*.07-.07*r0(.86,1,u)+.014*r0(.4,.78,u)*(1-r0(.8,.9,u));return Y(p,s<.08?v:c,l)},Jo=(t,e)=>Ye+Ke*(e-2)+Je*Math.sin(t*1.7+re)*Math.sin(e*1.2+re*1.7),O0=(t,e,s)=>{let a=(1-Math.hypot((t-K[0])/C[0],(e-K[1])/C[1],(s-K[2])/C[2]))*1.4;if(a=Math.min(a,(Jo(t,s)-e)*.85),k0[3]>0){let g=-.55*Q,A=.03,H=1;const C0=Math.hypot(g,A,H);g/=C0,A/=C0,H/=C0;const $0=t-k0[0],Rt=e-k0[1],A0=s-k0[2],tt=Math.max($0*g+Rt*A+A0*H,0);a=Math.max(a,k0[3]*(1+.2*Math.sin(tt*2.3))-Math.hypot($0-g*tt,Rt-A*tt,A0-H*tt))}a=Math.min(a,(e-fe(t,s))*.7);const r=Math.sqrt(Math.max(1-Math.pow((ot-K[1])/C[1],2),.05)),i=(t-K[0])/(C[0]*r),l=(s-K[2])/(C[2]*r),h=Math.atan2(l,i*Q),p=r0(-.25,.15,Math.min(h-Ft,Lt-h)),v=Xt(t*.9+.83,e*.4+.83,s*.9+.83),x=r0(N+.04,N+.4,e)*Y(1,Y(.45,1,r0(.04,.24,Math.abs(e-ot-.1+.25*(v-.5)))),p);a+=Y(.07,1,x)*(.36*(Xt(t*.3,e*.3,s*.3)-.5)+.14*(Xt(t*.8+.37,e*.3+.37,s*.8+.37)-.5));const y=(1-Math.hypot(i,l))*.5*(C[0]+C[2])*r,u=$e(h)+.09*(v-.5),c=(.3+.22*(Xt(t*2+.61,e*.9+.61,s*2+.61)-.5))*r0(0,.45,Math.min(h-Ft,Lt-h)),m=eo(eo(y-c,e-u,.035),u-.05-(c-y)*1.2-e,.05);return to(a,m,.06)},Ot=(t,e,s,a)=>{let r=s,i=s;if(O0(t,r,e)<=0)return null;for(let p=0;p<80;p++){const v=O0(t,r,e);if(v<.002)break;if(i=r,r+=a*Math.max(v*.8,.004),r>3.5||r<-1.5)return null}let l=i,h=r;for(let p=0;p<8;p++){const v=(l+h)/2;O0(t,v,e)>0?l=v:h=v}return(l+h)/2},G0=(t,e,s)=>{const a=t-P[0],r=e-P[1],i=s-P[2],l=a*z0[0]+r*z0[1]+i*z0[2];return l<.05?null:[.5+.5*a/(l*q0),.5-.5*(r*X0[1]+i*X0[2])/(l*q0),l]},he=Math.sqrt(Math.max(1-Math.pow((ot-K[1])/C[1],2),.05)),no=(t,e)=>{const s=1-e/(.5*(C[0]+C[2])*he);return[K[0]+Q*C[0]*he*Math.cos(t)*s,$e(t),K[2]+C[2]*he*Math.sin(t)*s]},R0=[];for(let t=0;t<=48;t++){const e=Y(Ft+.3,Lt-.3,t/48);let s=no(e,.15);for(const r of[.15,.2,.26,.11]){const i=no(e,r),l=Ot(i[0],i[2],i[1]+.22,-1);if(l!==null&&Math.abs(l-i[1])<.12&&O0(i[0],l+.12,i[2])>.06){s=[i[0],l-.004,i[2]];break}}const a=G0(s[0],s[1]+.08,s[2]);R0.push({a:e,p:s,sx:a?a[0]:Q>0?2:-1})}const Qo=t=>{const e=J((t-R0[0].a)/(R0[48].a-R0[0].a),0,1)*48,s=Math.min(47,Math.floor(e)),a=e-s,r=R0[s].p,i=R0[s+1].p;return[Y(r[0],i[0],a),Y(r[1],i[1],a),Y(r[2],i[2],a)]},ro=(t,e)=>{let s=9;for(const a of R0)s=Math.min(s,Math.hypot(a.p[0]-t,a.p[2]-e));return s},I=[],pt=t=>{const e=Object.assign({type:0,b:[0,0,0],d:[0,-1,0],len:.2,rB:.03,rT:.004,seed:S(),W:0,cA:0,cW:0,c0:-1,c1:-1,joined:0,drip:null,midi:72,mite:null,grow:1,vis:1},t);return I.push(e),e},j0=(t,e,s,a)=>{const r=G0(t,e,s);return r&&r[0]>-a&&r[0]<1+a&&r[1]>-a-.1&&r[1]<1+a},io=(t,e,s)=>{if(_t(t,e)<-.03)return{y:E0,water:!0};const a=Ot(t,e,s-.05,-1);return a===null?null:{y:a,water:!1}},Gt=(t,e,s)=>{for(const a of I)if(a.type!==4&&Math.hypot(a.b[0]-t,a.b[2]-e)<(a.rB+s)*1.15+.004)return!0;return!1},D0=(t,e)=>{const s=Math.max(fe(t,e)+.15,N+.5);return Ot(t,e,s,1)},H0=[];for(let t=0;t<4;t++){const e=f(1,3.6),s=f(-1.4,1.4)*(.45+.25*e)+P[0],a=f(0,W),r=f(.8,2.2);H0.push({x:s,z:e,dx:Math.cos(a),dz:Math.sin(a),L:r})}const ue=()=>{const t=H0[Math.floor(E()*H0.length)],e=f(-.5,.5)*t.L;return[t.x+t.dx*e+f(-.06,.06),t.z+t.dz*e+f(-.06,.06)]},pe=()=>{const t=.7+Math.pow(E(),.8)*3.3;return[f(-1,1)*(.62*(t-P[2]))+P[0],t]},de=(t,e,s,a)=>{const r=D0(t,e);if(r===null||r<N+.6)return null;const i=io(t,e,r);if(!i)return null;let l=r-i.y-(i.water?.3:.12);if(ro(t,e)<.55&&(l=Math.min(l,r-ot-.55)),l<.04)return null;let h,p,v=.0035,x=a;return a===1?(h=Math.min(.05+.5*Math.pow(E(),1.5),l),p=.0055+.0025*E(),v=p):(h=Math.min(.05+s*Math.pow(E(),2),l),p=.014+h*f(.09,.17),t0&&(p*=.75,v=.002)),Gt(t,e,p)||!j0(t,r-h,e,.08)?null:pt({type:x,b:[t,r+.035,e],d:[0,-1,0],len:h+.035,rB:p,rT:v,land:i})},me=t0?5:0;for(let t=0,e=0;t<60&&e<3;t++){const s=f(1.1,1.7),a=(E()<.5?-1:1)*f(.2,.6)*(s-P[2])*q0+P[0];de(a,s,1.2,me)&&e++}const Zo=[30,10,14,18][s0];for(let t=0,e=0;t<400&&e<Zo;t++){const s=E()<.7?ue():pe();de(s[0],s[1],s0===0?.95:.6,me)&&e++}if(s0===1){for(const s of H0)s.z=f(1.2,2.6),s.x=f(-.9,.9)*(s.z-P[2])*q0+P[0];for(let s=0,a=0;s<500&&a<56;s++){const r=E()<.85?ue():pe();de(r[0],r[1],0,1)&&a++}for(const s of I)if(s.type===1){const a=J((s.len-.085)/.5,0,1),r=Math.min(.015+.5*a*a*a*a,s.len-.035);s.len=r+.035,s.rB*=.56,s.rT=s.rB}const t=T(20),e=()=>t()+t()+t()+t()-2;for(let s=0,a=0;s<40&&a<75;s++){const r=Math.floor(t()*4),i=H0[r],l=(t()-.5)*i.L,h=2+Math.floor(Math.pow(t(),1.3)*9),p=.008+.025*t(),v=.5+1.2*t()*t(),x=ao(l,r),y=i.x+i.dx*l+i.dz*x,u=i.z+i.dz*l-i.dx*x,c=D0(y,u),m=D0(y+i.dx*.08,u+i.dz*.08);if(!(c===null||m===null||Math.abs(c-m)>.05||c<N+.7))for(let g=0;g<h&&a<75;g++){const A=l+e()*1.7*p,H=ao(A,r)+e()*.014+(t()<.25?e()*.04:0),C0=i.x+i.dx*A+i.dz*H,$0=i.z+i.dz*A-i.dx*H,Rt=c+(m-c)*(A-l)/.08,A0=v*(.008+.07*t()*t())+(t()<.15?.06+.4*t()*t():0),tt=.0028+.0012*t();Gt(C0,$0,tt)||!j0(C0,Rt-A0,$0,.02)||(pt({type:1,b:[C0,Rt+.03,$0],len:A0+.03,rB:tt,rT:tt,deco:!0,seed:t()}),a++)}}}if(s0===2)for(let t=0,e=0;t<200&&e<7;t++){const s=E()<.6?ue():pe(),a=s[0],r=s[1],i=D0(a,r);if(i===null)continue;const l=io(a,r,i);if(!l)continue;let h=i-l.y-(l.water?.35:.15);ro(a,r)<.7&&(h=Math.min(h,i-ot-.55));const p=f(.25,.6);if(h<.15||Gt(a,r,p*.5))continue;const v=Math.min(f(.25,.6),h);if(!j0(a,i-v,r,.05))continue;const x=f(0,W),y=-Math.sin(x)*p*.5,u=Math.cos(x)*p*.5,c=D0(a-y,r-u),m=D0(a+y,r+u),g=c===null||m===null?0:J((m-c)/p,-.9,.9);pt({type:2,b:[a,i+.14,r],len:v+.14,rB:p*.5,rT:.004,W:p,cA:x,cW:g,land:l}),e++}if(s0===3)for(let t=0,e=0;t<300&&e<26;t++){let s,a;if(E()<.55){const l=f(.45,1.8),h=f(-.75,.75)*(l-P[2])*.75+P[0],p=D0(h,l);if(p===null)continue;s=[h,p+.01,l],a=[f(-.5,.5),-1,f(-.5,.5)]}else{const l=f(.3,2.8),h=f(N+.6,N+1.3),p=Math.sqrt(Math.max(1-Math.pow((h-K[1])/C[1],2),.05));let v=K[0]+(E()<.5?1:-1)*C[0]*p*Math.cos(l)*.7,x=K[2]+C[2]*p*Math.sin(l)*.7;if(x<1)continue;const y=v-K[0],u=x-K[2],c=Math.hypot(y,u);let m=0;for(;m<2.5&&!(O0(v+y/c*m,h,x+u/c*m)<0);m+=.04);if(m>=2.5)continue;for(let g=0;g<4&&m>0;g++)if(m-=.01,O0(v+y/c*m,h,x+u/c*m)>0){m+=.01;break}s=[v+y/c*(m+.01),h,x+u/c*(m+.01)],a=[-y/c,f(-.3,.3),-u/c]}const r=Math.hypot(a[0],a[1],a[2]);a=a.map(l=>l/r);const i=f(.06,.2);j0(s[0],s[1],s[2],0)&&(pt({type:3,b:s,d:a,len:i,rB:f(.006,.011),rT:.004,cA:f(.12,.3),cW:f(4,10)}),e++)}if(s0!==3){const t=T(24),e=[36,10,16][s0];for(let s=0,a=0;s<140&&a<e;s++){const r=H0[Math.floor(t()*H0.length)],i=(t()-.5)*r.L,l=r.x+r.dx*i+(t()-.5)*.1,h=r.z+r.dz*i+(t()-.5)*.1,p=D0(l,h);if(p===null||p<N+.7)continue;const v=.03+.16*t()*t(),x=.006+v*(.1+.08*t());Gt(l,h,x)||!j0(l,p-v,h,.02)||(pt({type:me,b:[l,p+.03,h],len:v+.03,rB:x,rT:t0?.0018:.0028,deco:!0,seed:t()}),a++)}}const lo=Ho[y0]||null,zt=50+Math.floor(B()*8),kt=[];if(lo)for(let t=1;t<=3;t++)for(const e of lo){const s=zt+12*t+e;s<=zt+38&&kt.push(440*Math.pow(2,(s-69)/12))}else{const t=440*Math.pow(2,(zt-12-69)/12);for(let e=6;e<=22;e++)e!==11&&e!==13&&e!==17&&e!==19&&kt.push(t*e)}const M0=I.filter(t=>t.type!==3&&t.type!==4&&!t.deco);M0.sort((t,e)=>e.len-t.len),M0.forEach((t,e)=>{const s=e/Math.max(1,M0.length-1);t.freq=kt[J(Math.floor(s*kt.length*.999+(B()-.5)*2.2),0,kt.length-1)]});const d0=t=>t.type===2?[t.b[0],t.b[1]-t.len*.99,t.b[2]]:[t.b[0]+t.d[0]*t.len,t.b[1]+t.d[1]*t.len,t.b[2]+t.d[2]*t.len],co=L0[0]==="S"&&L0[1]==="l"?6:L0[0]==="S"?9:13,ve=M0.filter(t=>j0(...d0(t),.02));for(const t of ve)t.score=(t.land.water?1:.55)+B()*.8+(t.type===1?.2:0);ve.sort((t,e)=>e.score-t.score);const Y0=[];let fo=0;for(const t of ve){if(Y0.length>=co)break;!t.land.water&&fo>=3||(t.land.water||fo++,t.drip={T:f(4.5,13,B)*(co>10?.85:1),ph:B(),hang:0},Y0.push(t))}const xe=(t,e)=>{t.k0===void 0&&(t.k0=[t.rB,t.len]);const[s,a]=t.k0,r=a-.04,i=t.seed*3.3%1;t.k=e,e===0?(t.rB=J(r*(.3+.1*i),.03,.14),t.len=a):e===1?(t.rB=J(Math.max(s,r*(.5+.2*i)),.035,.13),t.len=Math.min(r,1.6*t.rB)+.04):(t.rB=J(r*(.17+.06*i),.025,.08),t.len=a),t.rT=t.rB*.45};for(const t of M0){if(t.land.water||!t.drip&&E()>.55)continue;const e=d0(t),s=e[1]-t.land.y;if(s<.12)continue;const a=(e[2]-o0[1])/Math.max(.01,Math.abs(e[0]-o0[0]));if(e[2]<o0[1]-c0[1]*.55&&a<-.6)continue;const r=Math.min(.03+Math.pow(E(),1.3)*.5,s*.65),i=J(.028+r*f(.12,.26),.028,.11),l=t.mite=pt({type:4,b:[e[0],t.land.y-.04,e[2]],d:[0,1,0],len:r+.04,rB:i,rT:i*.45,freq:t.freq*.5});xe(l,l.seed*7.31%1<.45?0:l.seed*7.31%1<.75?1:2)}let $o=null;if(w0==="A column completing"){let e=Y0.filter(s=>s.mite)[0];if(e||(e=M0.find(s=>!s.land.water&&s.mite),e&&(e.drip={T:f(4,8,B),ph:B(),hang:0},Y0.push(e))),e){e.mite.k===1&&xe(e.mite,0);const s=d0(e);e.mite.len=s[1]-e.mite.b[1]-.014,$o=e,e.mite.rB=Math.max(e.mite.rB,J((e.mite.len-.04)*.18,.03,.15)),e.mite.rT=e.mite.rB*.45}}for(const t of I.filter(e=>e.type===4)){const e=t.seed*13.7%1,s=e<.2?0:e<.7?1:2,a=t.len-.04,r=t.b[1]+.04;for(let i=0;i<s;i++){const l=(t.seed*29.3+i*.618)%1,h=(t.seed*7.7+i*.45+.3*l)*W,p={type:4,b:[0,0,0],d:[0,1,0],len:Math.max(.03,a*(.3+.35*l))+.04,rB:0,rT:0,seed:(t.seed*91.7+i*.31)%1,W:0,cA:0,cW:0,c0:-1,c1:-1,joined:0,drip:null,midi:72,mite:null,grow:1,vis:1,sat:!0,freq:t.freq};xe(p,t.k===1||i===1?0:1);const v=t.rB*(1.05+.5*l)+p.rB*.8,x=t.b[0]+Math.cos(h)*v,y=t.b[2]+Math.sin(h)*v;if(_t(x,y)<.04||I.some(c=>c.type===4&&c!==t&&Math.hypot(c.b[0]-x,c.b[2]-y)<c.rB+p.rB))continue;const u=Ot(x,y,r+.4,-1);u===null||Math.abs(u-r)>.12||O0(x,u+p.len,y)<.03||(p.b=[x,u-.04,y],I.push(p))}}const K0=[],ts=I.filter(t=>t.type!==3&&!t.deco).sort((t,e)=>(e.type===2?e.W:e.rB*e.len*4)-(t.type===2?t.W:t.rB*t.len*4));for(const t of ts){const e=t.type===2?3:1;if(!(K0.length+e>60)){t.c0=K0.length,t.c1=K0.length+e;for(let s=0;s<e;s++)K0.push({f:t,k:s})}}f(0,W);const es=t=>{for(let e=0;e<50;e++){const s=o0[0]+f(-1,1)*c0[0]*.8,a=o0[1]-c0[1]*f(.15,.85);if(a<t&&_t(s,a)<-.1&&fe(s,a)<N-.06)return[s,a]}return[o0[0],o0[1]-c0[1]*.4]};if(u0){const t=es(2),e=[],s=7+Math.floor(E()*6);for(let a=0;a<s*3&&e.length<s;a++){const r=t[0]+f(-.13,.13),i=t[1]+f(-.1,.1),l=f(.009,.019);_t(r,i)>-.03||e.some(h=>Math.hypot(h[0]-r,h[1]-i)<h[2]+l+.002)||e.push([r,i,l])}}const jt=[];if(w0==="Glow-worms")for(let t=0;t<900&&jt.length<170;t++){const e=f(.9,4.2),s=f(-1,1)*.75*(e-P[2])+P[0],a=D0(s,e);a===null||a<N+.9||j0(s,a,e,0)&&jt.push([s,a-.006,e,f(.04,.16),E()])}const os=Y(Ft+.3,Lt-.3,n.home?.66:f(.45,.85)),L=Math.min(d,640),S0=o.RGBA8,B0=o.UNSIGNED_BYTE,dt=x0(o,d,d,S0,B0),mt=x0(o,d,d,S0,B0),be=x0(o,d,d,S0,B0),vt=x0(o,L,L,S0,B0),xt=x0(o,L,L,S0,B0),ye=x0(o,L,L,S0,B0);for(const t of[dt,mt,be,vt,xt,ye])o.bindTexture(o.TEXTURE_2D,t),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);const ho=x0(o,L,L,S0,B0),Dt=Math.ceil(d/2),St=Math.ceil(L/2),we=x0(o,Dt,Dt,S0,B0),ge=x0(o,St,St,S0,B0),ss=b0(o,we),as=b0(o,ge),uo=o.createRenderbuffer();o.bindRenderbuffer(o.RENDERBUFFER,uo),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT24,L,L);const ns=b0(o,dt),rs=b0(o,mt),is=b0(o,be),ls=b0(o,vt),cs=b0(o,xt),fs=b0(o,ye),hs=b0(o,ho,uo);o.bindFramebuffer(o.FRAMEBUFFER,null);const V0=64,f0=new Float32Array(V0*4*4),po=x0(o,V0,4,o.RGBA32F,o.FLOAT,f0),Ht=16,O=new Float32Array(I.length*Ht),Te=o.createBuffer();let st=I.findIndex(t=>t.type===4);st<0&&(st=I.length);const mo=(t,e)=>{const s=o.createVertexArray();o.bindVertexArray(s),o.bindBuffer(o.ARRAY_BUFFER,R["meshV"+t]),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0),o.vertexAttribDivisor(0,0),o.bindBuffer(o.ARRAY_BUFFER,Te);for(let a=0;a<4;a++)o.enableVertexAttribArray(1+a),o.vertexAttribPointer(1+a,4,o.FLOAT,!1,Ht*4,e*Ht*4+a*16),o.vertexAttribDivisor(1+a,1);return o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,R["meshI"+t]),o.bindVertexArray(null),s};o.bindBuffer(o.ARRAY_BUFFER,Te),o.bufferData(o.ARRAY_BUFFER,O.byteLength,o.DYNAMIC_DRAW);const us=mo("",0),ps=mo("2",st),Yt=12,vo=640,n0=new Float32Array(vo*Yt),xo=o.createBuffer(),bo=o.createVertexArray();o.bindVertexArray(bo),o.bindBuffer(o.ARRAY_BUFFER,R.quad),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0),o.vertexAttribDivisor(0,0),o.bindBuffer(o.ARRAY_BUFFER,xo),o.bufferData(o.ARRAY_BUFFER,n0.byteLength,o.DYNAMIC_DRAW);for(let t=0;t<3;t++)o.enableVertexAttribArray(1+t),o.vertexAttribPointer(1+t,4,o.FLOAT,!1,Yt*4,t*16),o.vertexAttribDivisor(1+t,1);o.bindVertexArray(null);const ds=new Float32Array(96),b=(t,e,s,a,r,i)=>{t[e*4]=s,t[e*4+1]=a,t[e*4+2]=r,t[e*4+3]=i},Ee=t=>{b(t,0,P[0],P[1],P[2],q0),b(t,1,z0[0],z0[1],z0[2],0),b(t,2,X0[0],X0[1],X0[2],d)},Re=(t,e)=>{b(t,0,P[0],2*N-P[1],P[2],q0),b(t,1,z0[0],-z0[1],z0[2],1),b(t,2,X0[0],-X0[1],X0[2],e)},Bt=t=>{b(t,3,K[0],K[1],K[2],E0),b(t,4,C[0],C[1],C[2],Q),b(t,5,o0[0],o0[1],c0[0],c0[1]),b(t,6,X[0],X[1],X[2],X[3]),b(t,7,Ye,Ke,Je,re),b(t,8,ot,Ft,Lt,Qe),b(t,9,k0[0],k0[1],k0[2],k0[3]),b(t,10,N,Ze,d>600?180:140,Wt)};Bt(ds);const m0=new Float32Array(96);Bt(m0),b(m0,11,...a0.c0,0),b(m0,12,...a0.c1,0),b(m0,23,4,5,27,2),b(m0,13,...a0.fl,0),b(m0,14,...a0.st),b(m0,15,...a0.mud,0),b(m0,16,...T0.bot,0),b(m0,17,0,0,0,t0?1:0);const at=new Float32Array(96),bt=new Float32Array(96);jo(o,R,l0);const V=(t,e,s)=>{o.activeTexture(o.TEXTURE0+t),o.bindTexture(e,s)},nt=(t,e)=>{o.useProgram(t.p),o.uniform4fv(t.u.uV,e),o.bindVertexArray(R.vao0),o.drawArrays(o.TRIANGLES,0,3)};let yo=0;function Me(t,e){const s=t?L:d,a=m0;Bt(a),t?Re(a,s):Ee(a);for(let r=0;r<4;r++){const i=H0[r];b(a,19+r,i.x,i.z,i.dx*i.L*.5,i.dz*i.L*.5)}o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.viewport(0,0,s,s),e?(o.enable(o.SCISSOR_TEST),o.scissor(0,0,s,e)):o.disable(o.SCISSOR_TEST),V(0,o.TEXTURE_3D,R.n3),b(a,18,0,0,0,0),V(1,o.TEXTURE_2D,null),V(2,o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,t?ls:ns),nt(R.march,a),V(1,o.TEXTURE_2D,t?vt:dt),o.bindFramebuffer(o.FRAMEBUFFER,t?cs:rs),nt(R.nrm,a),V(2,o.TEXTURE_2D,t?xt:mt),o.bindFramebuffer(o.FRAMEBUFFER,t?fs:is),nt(R.alb,a),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,null),t||(yo=ut),N0[t?1:0]=null}const Ve=[null,null],wo=[null,null],N0=[null,null];let go=!1,ms=0;function vs(){const t=R;if(go)return!0;if(!t.fsh)return++ms<3||(t.fshX=o.getExtension("KHR_parallel_shader_compile"),t.fsh=F0(o,We,Uo),t.fshOk=0,o.flush()),!1;if(t.fshOk===0){if(t.fshX&&!o.getProgramParameter(t.fsh.p,t.fshX.COMPLETION_STATUS_KHR))return!1;if(!o.getProgramParameter(t.fsh.p,o.LINK_STATUS))return t.fshOk=-1,!1;He(o,t.fsh),t.fshOk=1}if(t.fshOk<0)return!1;for(let e=0;e<2;e++){const s=e?L:d,a=o.createTexture();V(7,o.TEXTURE_2D,a),o.texImage2D(o.TEXTURE_2D,0,o.RG8,s,s,0,o.RG,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),Ve[e]=a,wo[e]=b0(o,a)}return o.bindFramebuffer(o.FRAMEBUFFER,null),go=!0,N0[0]=N0[1]=null,!0}function xs(){V(7,o.TEXTURE_2D,null),o.disable(o.DEPTH_TEST),o.disable(o.BLEND);for(let t=0;t<2;t++){const e=N0[t];if(e&&e[0]===_[0]&&e[1]===_[1]&&e[2]===_[2])continue;const s=t?L:d;V(1,o.TEXTURE_2D,t?vt:dt),V(2,o.TEXTURE_2D,t?xt:mt),V(6,o.TEXTURE_2D,t?ge:we),o.bindFramebuffer(o.FRAMEBUFFER,wo[t]),o.viewport(0,0,s,s),t?(o.enable(o.SCISSOR_TEST),o.scissor(0,0,L,Math.ceil(L*rt))):o.disable(o.SCISSOR_TEST),nt(R.fsh,t?bt:at),N0[t]=_.slice()}o.disable(o.SCISSOR_TEST)}let yt=null;function bs(){const t=m0;Bt(t),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),V(0,o.TEXTURE_3D,R.n3),V(6,o.TEXTURE_2D,null);for(let e=0;e<2;e++)e?Re(t,L):Ee(t),b(t,18,_[0],_[1],_[2],1),b(t,19,e?L/St:d/Dt,26,0,0),V(1,o.TEXTURE_2D,e?vt:dt),V(2,o.TEXTURE_2D,e?xt:mt),o.bindFramebuffer(o.FRAMEBUFFER,e?as:ss),o.viewport(0,0,e?St:Dt,e?St:Dt),nt(R.march,t);b(t,18,0,0,0,0),o.bindFramebuffer(o.FRAMEBUFFER,null);for(const e of I)if(e.type===4){let s=e.b[0],a=e.b[1]+e.len*.8,r=e.b[2];const i=_[0]-s,l=_[2]-r,h=Math.hypot(i,l)+1e-6;s+=i/h*e.rB,r+=l/h*e.rB;const p=_[0]-s,v=_[1]-a,x=_[2]-r,y=Math.hypot(p,v,x);let u=.02,c=1;for(let A=0;A<48&&u<y-.1&&c>.01;A++){const H=O0(s+p/y*u,a+v/y*u,r+x/y*u);c=Math.min(c,26*H/u),u+=J(H*.9,.006,.25)}const m=J(c,0,1),g=.5+.5*m*m*(3-2*m);e.vis!==g&&(e.vis=g,Qt=!0)}yt=_.slice(),N0[0]=N0[1]=null}let rt=0;for(let t=0;t<64;t++){const e=t/64*W;for(let s=0;s<2;s++){const a=1+X[0]*Math.sin(2*e+X[1])+X[2]*Math.sin(3*e+X[3]),r=G0(o0[0]+Math.cos(e)*c0[0]*a,N,o0[1]+Math.sin(e)*c0[1]*a);r&&(rt=Math.max(rt,1-r[1]))}}rt=J(rt+.06,.3,1);let Nt=os,To=Nt,it=1,J0=1,U0=0,Pe=0,Is=0;const Ut=new Float32Array(24*4);let Ae=0,Kt=0;const lt=[],Q0=[];let wt=0,Ws=0,Z=1,Jt=0,Eo=0,Qt=!0,Fe=!0,Zt=!0;const G=T(40),ct=n.sound,P0=22050,v0=[],ys=[1687,1813,1931,2087,2269].map(t=>({b:new Float32Array(t),i:0,f:0})),ws=[389,127,43].map(t=>({b:new Float32Array(t),i:0})),Ro=new Float32Array(800);let $t=0,ft=19088743^Math.floor(S()*1e9),Le=0,_e=0,te=0,ze=0,gt=0,ke=f(6,20,S),ee=0,De=0,Se=0,oe=0,Be=0,Mo=0,Ne=0;const Tt=()=>(ft^=ft<<13,ft^=ft>>>17,ft^=ft<<5,(ft>>>0)/4294967296*2-1),Et=(t,e)=>{!ct.on||v0.length>28||v0.push(Object.assign({k:t,t:0,p:0,v:.5,f:440,dec:.4},e))};function gs(t){const e=new Float32Array(t),s=.9,a=e0===1&&it?1:0;for(let r=0;r<t;r++){let i=0,l=0;for(let u=v0.length-1;u>=0;u--){const c=v0[u],m=c.t;let g=0;if(c.k==="drip"){c.c===void 0&&(c.c=1,c.a=1,c.e=1,c.h=1,c.kd=Math.exp(-1/(P0*c.dec))),c.c*=.99434,c.a*=.96292,c.e*=c.kd,c.h*=.99887,c.p+=W*c.f*(1-.42*c.c)/P0;const A=Math.sin(c.p);if(g=(A+.2*A*A*c.h)*(1-c.a)*c.e*c.v+(c.a>.01?Tt()*c.a*.25*c.v:0),c.e<.001){v0.splice(u,1);continue}}else if(c.k==="stone"){if(c.p+=W*c.f/P0,g=(Math.sin(c.p)*Math.exp(-m/.05)*.6+Tt()*Math.exp(-m/.006)*.5)*c.v,m>.4){v0.splice(u,1);continue}}else if(c.k==="bell"){if(c.p+=W*c.f/P0,g=(Math.sin(c.p)+.5*Math.sin(c.p*2.01)*Math.exp(-m/1.2)+.35*Math.sin(c.p*2.76)*Math.exp(-m/.7)+.2*Math.sin(c.p*5.4)*Math.exp(-m/.3))*Math.exp(-m/2.4)*(1-Math.exp(-m/.003))*c.v,m>9){v0.splice(u,1);continue}}else if(c.k==="click"){if(g=Tt()*Math.exp(-m/.002)*c.v+Math.sin(W*2300*m)*Math.exp(-m/.01)*c.v*.3,m>.1){v0.splice(u,1);continue}}else if(c.k==="pop"&&(g=(Tt()*.6+Math.sin(W*140*m))*Math.exp(-m/.04)*c.v,m>.3)){v0.splice(u,1);continue}c.t+=1/P0,i+=g*(c.dry===void 0?.55:c.dry),l+=g}const h=Tt();Le=Le*.996+h*.02,_e+=(Le-_e)*.05;let p=_e*.9;if(gt>.001&&(te+=(h-te)*.12,ze+=(te-ze)*.04,Se+=((Tt()>.995?1:0)-Se)*.002,p+=(te-ze)*gt*(.5+.5*Math.sin(De)+Se*2)*.9,De+=W*(5+3*Math.sin(De*.01))/P0),a&&(Ne+=(h-Ne)*.6,i+=(h-Ne)*.006),oe>5e-4){Be+=W*55*Math.pow(2,(zt-33)/12)/P0,Mo+=W*55*Math.pow(2,(zt-26)/12)*1.003/P0;const u=(Math.sin(Be)+.6*Math.sin(Mo)+.25*Math.sin(Be*3))*oe*.22;i+=u*.6,l+=u*.5}const v=Ro[$t];Ro[$t]=l*.3+p*.5,++$t===800&&($t=0);let x=0;for(let u=0;u<5;u++){const c=ys[u],m=c.b;let g=c.i;const A=m[g];c.f=A*.62+c.f*.38,m[g]=v+c.f*.885,++g===m.length&&(g=0),c.i=g,x+=A}x*=.2;for(let u=0;u<3;u++){const c=ws[u],m=c.b;let g=c.i;const A=m[g],H=x+A*.55;m[g]=H,++g===m.length&&(g=0),c.i=g,x=A-H*.55}const y=i+x*s+p*.25;e[r]=y/(1+Math.abs(y))}return e}const Ts=(t,e,s)=>{ct.on&&(e?Et("drip",{f:t.freq,v:.42*s,dec:.22+.25*G()}):Et("stone",{f:t.freq*.5,v:.4*s,dry:.4}))},Es=(t,e,s)=>{const a=Ae*4;Ut[a]=t,Ut[a+1]=e,Ut[a+2]=wt,Ut[a+3]=s,Ae=(Ae+1)%24,Kt=Math.min(24,Kt+1),Fe=!0},Vo=(t,e)=>{const s=d0(t);if(lt.push({x:s[0],y:s[1]-.004,z:s[2],vy:0,f:t,vel:e?1:.7+.3*G(),py:s[1],wait:0}),e)for(let a=0;a<2;a++)lt.push({x:s[0],y:s[1]-.004,z:s[2],vy:0,f:t,vel:.55-.2*a,py:s[1],wait:.1+.13*a+.08*G()});t.drip&&(t.drip.ph=0,t.drip.k=G()<.1?.12+.1*G():.7+.75*G()*G()+.25*G())};let se=0;const Rs=t=>{const e=t.f,s=!e.mite&&e.land.water;if(s){Es(t.x,t.z,9e-4*t.vel*(Z>2?.6:1));const a=Z>2?3:9;for(let r=0;r<a;r++){const i=r/a*W+G()*.5,l=.25+.35*G();Q0.push({x:t.x,y:E0+.003,z:t.z,vx:Math.cos(i)*l,vy:.5+.6*G(),vz:Math.sin(i)*l,age:0,r:.0016+.0016*G()})}Q0.push({x:t.x,y:E0,z:t.z,vx:0,vy:.75+.2*G(),vz:0,age:-.06,r:.0026,jet:1})}else for(let a=0;a<4;a++){const r=G()*W,i=.1+.2*G();Q0.push({x:t.x,y:t.y+.004,z:t.z,vx:Math.cos(r)*i,vy:.2+.3*G(),vz:Math.sin(r)*i,age:0,r:.0012})}Z<2?Ts(e,s,t.vel):se>=1&&(se-=1,ct.on&&Et("drip",{f:e.freq,v:.22*t.vel,dec:.12}))},Ms=t=>t.mite?t.mite.b[1]+t.mite.len:t.land.water?E0:t.land.y;let Po=!1;const Vs=t=>{Eo+=t;for(const e of Y0){if(e.joined)continue;const s=t*(.9+.3*Math.sin(e.seed*40));e.type===2?e.len+=s*.6:(e.len+=s*(e.type===1?.8:1),e.type!==1&&(e.rB+=s*.05)),e.mite&&(e.mite.len+=s*1.25,e.mite.rB=Math.min(.2,e.mite.rB+s*.3),e.mite.rT=e.mite.rB*.45);const a=d0(e);if(e.mite){const r=e.mite.b[1]+e.mite.len;if(a[1]-r<.004){const i=(a[1]+r)*.5;e.len=e.b[1]-i+.002,e.mite.len=i-e.mite.b[1]+.002,e.joined=1,e.mite.joined=1,e.rT=Math.max(e.rT,e.mite.rB*.55),e.drip=null,ct.on&&(Et("bell",{f:e.freq/4,v:.5}),Et("bell",{f:e.freq*3/8,v:.3})),Po=!0;const l=M0.find(h=>!h.drip&&!h.joined&&h.land.water&&j0(...d0(h),0));l&&(l.drip={T:f(5,12,B),ph:0,hang:0},Y0.push(l))}}else e.land.water&&a[1]<E0+.22&&(e.len-=s*(e.type===1?.8:1))}for(const e of M0)!e.drip&&!e.joined&&d0(e)[1]>(e.land.water?E0+.3:e.mite?e.mite.b[1]+e.mite.len+.03:e.land.y+.15)&&(e.len+=t*(.3+.4*e.seed),(e.type===0||e.type===5)&&(e.rB+=t*.02),e.mite&&(e.mite.len+=t*.35,e.mite.rB=Math.min(.16,e.mite.rB+t*.1),e.mite.rT=e.mite.rB*.45));ut=Math.min(.05,ut+t*.035),E0=N+ut,Qt=!0,Zt=!0};function Ao(t){wt+=t;const e=Math.min(Z,7);for(const s of Y0){if(!s.drip)continue;const a=s.drip;a.ph+=t*e/(a.T*(a.k||1))*(1+.04*Math.sin(wt*.13+s.seed*30)),a.ph>=1&&Vo(s,!1)}for(let s=lt.length-1;s>=0;s--){const a=lt[s];if(a.wait>0){a.wait-=t;continue}a.py=a.y,a.vy-=9.81*t,a.y+=a.vy*t;const r=Ms(a.f);a.y<=r&&(a.y=r,Rs(a),lt.splice(s,1))}for(let s=Q0.length-1;s>=0;s--){const a=Q0[s];a.age+=t,!(a.age<0)&&(a.vy-=9.81*t,a.x+=a.vx*t,a.y+=a.vy*t,a.z+=a.vz*t,(a.y<E0-.002||a.age>1.2)&&Q0.splice(s,1))}Z>1.01&&Vs(t*(Z-1)*.0024)}for(let t=0;t<6*30;t++)Ao(1/30);function Ps(){for(let t=0;t<I.length;t++){const e=I[t],s=t*Ht;O[s]=e.b[0],O[s+1]=e.b[1],O[s+2]=e.b[2],O[s+3]=e.len,O[s+4]=e.d[0],O[s+5]=e.d[1],O[s+6]=e.d[2],O[s+7]=e.rB,O[s+8]=e.rT,O[s+9]=e.type+(e.type===4?e.k*.1:0),O[s+10]=e.seed,O[s+11]=e.type===2?e.W:e.joined,O[s+12]=(e.type===2,e.cA),O[s+13]=e.type===4?e.vis:e.cW,O[s+14]=e.c0,O[s+15]=e.c1}o.bindBuffer(o.ARRAY_BUFFER,Te),o.bufferData(o.ARRAY_BUFFER,O,o.DYNAMIC_DRAW)}function As(){if(o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),Zt){N0[0]=N0[1]=null;for(let t=0;t<K0.length;t++){const{f:e,k:s}=K0[t];let a,r,i,l;if(e.type===2){const h=[-Math.sin(e.cA),0,Math.cos(e.cA)],p=(s-1)*e.W/3;a=[e.b[0]+h[0]*p,e.b[1]+e.cW*p,e.b[2]+h[2]*p],r=[a[0],a[1]-e.len*(s===1?.95:.7),a[2]],i=l=-e.W/6}else a=e.b,r=d0(e),i=e.type===4?e.rB*[.9,.95,.8][e.k]:e.type===1?e.rB*.62:e.rB*.6,l=e.type===4?e.rB*[.4,.6,.45][e.k]:e.type===1?e.rB*.62:Math.max(e.rT,e.rB*.3),(e.type===0||e.type===5)&&(a=[e.b[0],e.b[1]-.03,e.b[2]]);e.type===1&&(i=-Math.abs(i)),f0[t*4]=a[0],f0[t*4+1]=a[1],f0[t*4+2]=a[2],f0[t*4+3]=i,f0[(V0+t)*4]=r[0],f0[(V0+t)*4+1]=r[1],f0[(V0+t)*4+2]=r[2],f0[(V0+t)*4+3]=l}}Fe&&f0.set(Ut,2*V0*4),o.bindTexture(o.TEXTURE_2D,po),Zt?o.texSubImage2D(o.TEXTURE_2D,0,0,0,V0,4,o.RGBA,o.FLOAT,f0):o.texSubImage2D(o.TEXTURE_2D,0,0,2,V0,1,o.RGBA,o.FLOAT,f0,2*V0*4),Zt=!1,Fe=!1}let ht=0;const Ct=(t,e,s,a,r,i,l,h,p,v,x,y)=>{if(ht>=vo)return;const u=ht++*Yt;n0[u]=t,n0[u+1]=e,n0[u+2]=s,n0[u+3]=a,n0[u+4]=r,n0[u+5]=i,n0[u+6]=l,n0[u+7]=h,n0[u+8]=p,n0[u+9]=v,n0[u+10]=x,n0[u+11]=y};let _=[0,0,0],i0=[0,0,0];const Ue=(t,e,s,a)=>{const r=(t-_[0])**2+(e-_[1])**2+(s-_[2])**2;return J0*z.I*a/(r+.05)};function Fs(){ht=0;for(const t of I){if(t.joined||t.type===3||t.type===4)continue;const e=d0(t),s=t.drip?.0014+.0026*Math.min(t.drip.ph,1):t.type===1?.0017:.0021,a=Math.min(Ue(e[0],e[1],e[2],3.2),6)+.05*J0;Ct(e[0],e[1]-s,e[2],s,0,0,0,0,z.col[0]*a,z.col[1]*a,z.col[2]*a,1)}for(const t of lt){if(t.wait>0)continue;const e=Ue(t.x,t.y,t.z,1.6)+.03*J0,s=G0(t.x,t.y,t.z),a=Math.max((t.py-t.y)*1.6+.004,s?8*2*s[2]*q0/d:0);Ct(t.x,t.y,t.z,.0022,0,a,0,1,z.col[0]*e,z.col[1]*e,z.col[2]*e,1)}for(const t of Q0){if(t.age<0)continue;const e=Ue(t.x,t.y,t.z,t.jet?.5:.4)*Math.min(1,(1.2-t.age)*3);Ct(t.x,t.y,t.z,t.r,0,t.jet?.014*Math.max(0,t.vy):0,0,t.jet?1:0,z.col[0]*e,z.col[1]*e,z.col[2]*e,1)}for(const t of jt){const e=.65+.35*Math.sin(wt*.4+t[4]*40);Ct(t[0],t[1],t[2],.0035,0,0,0,2,.05*e,.32*e,.28*e,1),Ct(t[0],t[1]-t[3],t[2],8e-4,0,t[3],0,3,.02*e,.06*e,.06*e,1)}o.bindBuffer(o.ARRAY_BUFFER,xo),o.bufferData(o.ARRAY_BUFFER,n0.subarray(0,Math.max(1,ht)*Yt),o.DYNAMIC_DRAW)}const Ls=()=>z.col.map(t=>t*(1+.12*U0));function _s(t){Bt(t);const e=Ls();b(t,11,_[0],_[1],_[2],z.I*J0*(1+(e0===0?.14:e0===1?.05:0)*U0)),b(t,12,e[0],e[1],e[2],z.rad),b(t,13,wt,z.exp,Kt,K0.length),b(t,14,ce[0],ce[1],ce[2],so),b(t,15,ie[0],ie[1],ie[2],1.4-J0*1),b(t,16,T0.sig[0],T0.sig[1],T0.sig[2],0),b(t,17,T0.sc[0],T0.sc[1],T0.sc[2],t0?.03:.026),b(t,18,a0.fb[0],a0.fb[1],a0.fb[2],t0?1:0),b(t,19,a0.ft[0],a0.ft[1],a0.ft[2],g0===2?0:so>0?.55:.15),b(t,20,a0.band[0],a0.band[1],a0.band[2],Z),b(t,21,i0[0],i0[1],i0[2],e0),b(t,22,i0[0],i0[1]+z.h,i0[2],U0),b(t,23,z.fy,J0,2,5)}function Fo(){i0=Qo(Nt),_=[i0[0],i0[1]+z.h*z.fy,i0[2]],(!yt||Math.hypot(_[0]-yt[0],_[1]-yt[1],_[2]-yt[2])>.004)&&bs(),Qt&&(Ps(),Qt=!1),As(),Fs(),_s(at),Ee(at),bt.set(at),Re(bt,L),V(0,o.TEXTURE_3D,R.n3),V(4,o.TEXTURE_2D,po),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST);const t=vs();at[67]=bt[67]=t?1:0,t&&xs(),V(5,o.TEXTURE_2D,null),o.bindFramebuffer(o.FRAMEBUFFER,hs),o.viewport(0,0,L,L),o.enable(o.SCISSOR_TEST),o.scissor(0,0,L,Math.ceil(L*rt)),o.enable(o.DEPTH_TEST),o.depthMask(!0),o.depthFunc(o.ALWAYS),o.disable(o.BLEND),V(1,o.TEXTURE_2D,vt),V(2,o.TEXTURE_2D,xt),V(3,o.TEXTURE_2D,ye),V(6,o.TEXTURE_2D,ge),V(7,o.TEXTURE_2D,Ve[1]),o.useProgram(R.comp.p),o.uniform1f(R.comp.u.uRx,1),nt(R.comp,bt),Lo(bt),o.disable(o.SCISSOR_TEST),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,d,d),o.enable(o.DEPTH_TEST),o.depthMask(!0),o.depthFunc(o.ALWAYS),o.disable(o.BLEND),V(1,o.TEXTURE_2D,dt),V(2,o.TEXTURE_2D,mt),V(3,o.TEXTURE_2D,be),V(5,o.TEXTURE_2D,ho),V(6,o.TEXTURE_2D,we),V(7,o.TEXTURE_2D,Ve[0]),o.useProgram(R.comp.p),o.uniform1f(R.comp.u.uRx,0),nt(R.comp,at),Lo(at),o.depthMask(!0),o.disable(o.DEPTH_TEST),o.disable(o.BLEND)}function Lo(t){o.depthFunc(o.LESS),o.useProgram(R[l0].p),o.uniform4fv(R[l0].u.uV,t),o.bindVertexArray(us),st>0&&o.drawElementsInstanced(o.TRIANGLES,R.meshN,o.UNSIGNED_SHORT,0,st),st<I.length&&(o.bindVertexArray(ps),o.drawElementsInstanced(o.TRIANGLES,R.meshN2,o.UNSIGNED_SHORT,0,I.length-st)),o.depthMask(!1),o.enable(o.BLEND),ht>0&&(o.blendFunc(o.ONE,o.ONE),o.depthFunc(o.LEQUAL),o.useProgram(R.spr.p),o.uniform4fv(R.spr.u.uV,t),o.bindVertexArray(bo),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,ht)),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthFunc(o.LEQUAL),o.useProgram(R.lamp.p),o.uniform4fv(R.lamp.u.uV,t),o.bindVertexArray(R.lampVao),o.drawArrays(o.TRIANGLE_STRIP,0,4),o.bindVertexArray(null),o.depthMask(!0)}Me(!1),Me(!0),Fo();const Z0=n.input;let j=null,qs=!1,_o=0;const zs=()=>G0(i0[0],i0[1]+z.h*.5,i0[2]),zo=(t,e)=>{const s=zs();if(s&&Math.hypot(s[0]-t,s[1]-e)<.045){it=it?0:1,ct.on&&Et(e0===1&&it?"pop":"click",{v:.35});return}let a=null,r=.06;for(const i of M0){if(i.joined)continue;const l=G0(i.b[0],i.b[1]-.03,i.b[2]),h=G0(...d0(i));if(!l||!h)continue;const p=h[0]-l[0],v=h[1]-l[1],x=p*p+v*v,y=x>0?J(((t-l[0])*p+(e-l[1])*v)/x,0,1):0,u=Math.hypot(t-l[0]-p*y,e-l[1]-v*y)-Math.min(.02,i.rB/h[2]/q0*.5);u<r&&(r=u,a=i)}if(!a){let i=.06;for(const l of M0){if(l.joined)continue;const h=G0(...d0(l));if(!h||h[1]>e+.02)continue;const p=Math.abs(h[0]-t)+(e-h[1])*.05;p<i&&(i=p,a=l)}}a&&Vo(a,!0)},ks=t=>{const e=(t-.5)*1.25+.5;let s=0,a=1e9;for(let r=0;r<R0.length;r++){const i=Math.abs(R0[r].sx-e);i<a&&(a=i,s=r)}return R0[s].a};let ae=0;const Ds=(t,e)=>{e=Math.min(e,.25);const s=Z0.taps();let a=!1;if(s.length){const h=s[s.length-1];j={x:h.x,y:h.y,t:0,moved:0,drag:!1},Z0.down||(zo(h.x,h.y),j=null)}j&&Z0.down?(j.t+=e,j.moved=Math.max(j.moved,Math.hypot(Z0.x-j.x,Z0.y-j.y)),j.moved>.03&&(j.drag=!0),j.drag?To=ks(Z0.x):j.t>.35&&(a=!0)):j&&!Z0.down&&(!j.drag&&j.t<=.35&&zo(j.x,j.y),j=null),Z0.down||s.length?_o=0:_o+=e,a?(Jt+=e,Z=Math.min(60,1+Jt*Jt*14)):(Jt=0,Z+=(1-Z)*Math.min(1,e*4),Z<1.02&&(Z=1));let r=To-Nt;Nt+=r*Math.min(1,e*5),J0+=(it-J0)*Math.min(1,e*(it?3:6));const i=e0===0?1:e0===1?.35:.04;Pe+=(-U0*40+(G()-.5)*120*i)*e,Pe*=Math.exp(-e*8),U0+=Pe*e,U0=J(U0,-1,1),Z>2&&(U0=J(U0+(G()-.5)*.3*i,-1,1)),ae+=e,se=Math.min(2,se+e*6);let l=0;for(;ae>=1/60&&l<20;)Ao(1/60),ae-=1/60,l++;if(l>=20&&(ae=0),Math.abs(ut-yo)>.0025&&Math.floor(wt*30)%3===0&&(Me(!1,Math.ceil(d*rt)),yt=null),ct.on){ke-=e,ke<=0&&ee<=0&&(ee=f(7,13,S),ke=f(24,50,S)),ee>0?(ee-=e,gt+=(.22-gt)*Math.min(1,e*.4)):gt+=(0-gt)*Math.min(1,e*.3),oe+=((Z>1.5?Math.min(1,(Z-1)/25):0)-oe)*Math.min(1,e*1.5);const h=Math.round(Math.min(e,.2)*P0);h>0&&ct.pcm(gs(h),P0,{vel:.8})}else v0.length=0;Fo()};return n.dbg&&(n.dbg.get=()=>({forms:I.length,casters:K0.length,drippers:Y0.length,falling:lt.length,beads:Q0.length,rings:Kt,rim:ut,years:Eo,timeRate:Z,lampA:Nt,lampOn:it,worms:jt.length,nSpr:ht,vox:v0.length,columnDone:Po,types:[0,1,2,3,4,5,6].map(t=>I.filter(e=>e.type===t).length).join("/")})),Ds}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
