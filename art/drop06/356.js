// Dry Ring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/356.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function($t){$t&&function(){"use strict";const N0=[270,579.6,176],qt=40*Math.PI/180,Dt=Math.tan(20*Math.PI/180),Gt=1/60,nt=`#version 300 es
out vec2 vUv;
void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,mt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
layout(std140) uniform U { vec4 u[32]; };
uniform int uLZ; // never set, always 0: keeps loops rolled so they compile once
#define N 192
#define NB 1024
const float DM = ${540 .toFixed(1)};
const float CELL = ${2.8125.toFixed(5)};
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hc(ivec2 c, uint s) { return float(hh(uint(c.x) * 73856093u ^ uint(c.y) * 19349663u ^ s) & 0xffffu) / 65535.; }
// atan(y, x) from the one-argument atan (the two-argument one costs ~15 ms of compile per call site)
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-30)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
vec2 stoneQ(vec2 g) { vec2 d = g - u[7].xy; return vec2(u[7].z * d.x + u[7].w * d.y, -u[7].w * d.x + u[7].z * d.y); }
// the swash front: lobed, breaking every period
float lobe(float x, float s) { float f = fract((x + 22. * sin(x * 0.017 + s * 3.3)) / 83. + s); f = 2. * f - 1.; return sqrt(max(1. - f * f, 0.)); }
float frontY(float x) { float s = u[11].w; return u[11].x + u[12].y * (0.45 * sin(x * 0.0123 + s) + 0.2 * sin(x * 0.0291 + s * 2.7) + 0.45 * lobe(x, s)); }
`,B0=`#version 300 es
precision highp float; precision highp int;
in vec2 vUv; out vec4 o; uniform int uLZ;
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
vec3 h3(ivec2 c) { uint a = hh(uint(c.x) * 1597u + uint(c.y) * 51749u + 13u); return vec3(float(a & 1023u), float((a >> 10) & 1023u), float((a >> 20) & 1023u)) / 1023.; }
const float G = 48.;
void main() {
  vec2 p = gl_FragCoord.xy / 512.;
  vec2 g = p * G; ivec2 i = ivec2(floor(g)); vec2 f = fract(g);
  float d1 = 9., d2 = 9., id = 0.; vec2 dv = vec2(0.);
  for (int k = 0; k < 9 + uLZ; k++) {
    int x = k % 3 - 1, y = k / 3 - 1;
    ivec2 cc = i + ivec2(x, y); ivec2 w = ivec2(int(mod(float(cc.x), G)), int(mod(float(cc.y), G)));
    vec3 r = h3(w);
    vec2 d = vec2(x, y) + 0.1 + r.xy * 0.8 - f;
    float dd = length(d) / (0.75 + 0.5 * r.z);
    if (dd < d1) { d2 = d1; d1 = dd; id = fract(r.z * 7.31 + r.x * 3.7); dv = d / (0.75 + 0.5 * r.z); } else if (dd < d2) d2 = dd;
  }
  float q = max(1e-3, 1. - d1 * d1 * 1.4), edge = smoothstep(0.0, 0.22, d2 - d1);
  float hgt = sqrt(q) * edge;
  vec2 grd = dv * 1.4 / sqrt(q) * edge * 0.12;
  o = vec4(id, hgt, clamp(0.5 + grd.x, 0., 1.), clamp(0.5 + grd.y, 0., 1.));
}`,T0=`#version 300 es
precision highp float; precision highp int;
in vec2 vUv; out vec4 o; uniform int uLZ;
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float h1(ivec2 c, int P, uint s) { c = ivec2(int(mod(float(c.x), float(P))), int(mod(float(c.y), float(P)))); return float(hh(uint(c.x) * 73856093u ^ uint(c.y) * 19349663u ^ s) & 65535u) / 65535.; }
float vn(vec2 p, int P, uint s) {
  vec2 i = floor(p), f = fract(p); f = f * f * f * (f * (f * 6. - 15.) + 10.);
  ivec2 c = ivec2(i);
  return mix(mix(h1(c, P, s), h1(c + ivec2(1, 0), P, s), f.x), mix(h1(c + ivec2(0, 1), P, s), h1(c + ivec2(1, 1), P, s), f.x), f.y);
}
void main() {
  vec2 p = gl_FragCoord.xy / 256.;
  vec4 r = vec4(0.);
  for (int k = 0; k < 10 + uLZ; k++) {
    int ch = k < 3 ? 0 : k < 6 ? 1 : k < 8 ? 2 : 3;
    int j = k < 3 ? k : k < 6 ? k - 3 : k < 8 ? k - 6 : k - 8;
    float P = ch < 2 ? 32. * exp2(float(j)) : ch == 2 ? 24. : 8. * exp2(float(j));
    float w = ch < 2 ? (j == 0 ? 0.6 : j == 1 ? 0.28 : 0.12) : ch == 2 ? 0.6 : (j == 0 ? 0.65 : 0.35);
    vec2 q = (p + (ch == 1 ? 0.37 : 0.)) * P + (ch == 2 ? float(j) * 7.1 : 0.);
    float v = vn(q, int(P), uint(k * 7 + 1));
    if (ch == 2) v = pow(1. - abs(2. * v - 1.), 7.);
    r[ch] += v * w;
  }
  o = r;
}`,Jt=mt+`
uniform sampler2D tN;
in vec2 vUv; out vec4 o;
float nz(vec2 p) { return textureLod(tN, p, 0.).r; }
float na(vec2 p) { return textureLod(tN, p, 0.).a; }
// a shell valve or fragment, partly buried. P: x, y, radius, angle. Q: colour, broken, burial, kind
vec4 shell(vec2 g, vec4 P, vec4 Q) {
  vec2 d = g - P.xy; float cs = cos(P.w), sn = sin(P.w);
  vec2 l = vec2(cs * d.x + sn * d.y, -sn * d.x + cs * d.y);
  float r = P.z;
  bool mus = Q.x > 0.9;
  vec2 e = mus ? l / vec2(1., 0.5 * (1.12 + 0.55 * clamp(l.x / r, -1., 1.))) / r : l / vec2(1., 0.84) / r;
  float rr = length(e) * (1. + 0.08 * (nz(g * 0.012 + P.w) - 0.5));
  float cut = Q.y > 0.5 ? l.x * 0.8 + l.y * 0.6 - r * (0.1 + 0.35 * nz(g * 0.02 + P.w) + 0.08 * nz(g * 0.06)) : -1.;
  float kind = Q.w;
  float dome = r * (kind < 0.5 ? 0.5 : 0.26) * pow(max(1. - rr * rr, 0.), 0.7);
  float an = at2(l.x, l.y + 0.86 * r);
  float rib = kind < 0.5 ? pow(0.5 + 0.5 * cos(an * 22. + 0.6 * sin(an * 5.)), 1.6) * smoothstep(0.1, 0.5, rr) : 0.;
  float grow = 0.5 + 0.5 * sin(rr * (kind < 0.5 ? 26. : 55.) + nz(g * 0.015 + P.w) * 5.);
  // tipped, so one side dips under the sand
  if (mus && Q.x < 0.95) dome = r * 0.05 * (0.4 + rr * rr) - Q.z * 0.8;   // lining-up: a shallow dish lying on the sand
  float h = dome + rib * 0.3 * (0.6 + 0.4 * rr) + grow * 0.06 + Q.z + l.y * 0.22 * (0.2 + 0.8 * fract(P.w * 3.1));
  return rr > 1. || cut > 0. ? vec4(-99.) : vec4(h, Q.x, rib * 0.8 + grow * 0.2, kind);
}
#ifdef RILL
uniform sampler2D tR;   // the rill marks, grown in JS (rillMap), 512 x 512, filtered
#endif
#ifdef RUNNEL
// a runnel: the trough the ebb leaves along the beach, still holding water. u[13]: its near edge's y, width, depth, phase;
// u[14]: the edge's bend (amplitude, frequency) and the x of the two rills that feed it. Returns the depth to take off.
float runnelD(vec2 g, inout float mat, inout float vr) {
  float yc = u[13].x + u[14].x * (sin(g.x * u[14].y + u[13].w) + 0.45 * sin(g.x * u[14].y * 2.3 + u[13].w * 1.7))
           + (na(vec2(g.x * 0.004, 0.37)) - 0.5) * 30. + (nz(vec2(g.x * 0.013, 0.71)) - 0.5) * 12.;
  float w0 = g.y - yc;                                   // > 0: up the beach from the water's edge
  float Bw = 22. + 20. * na(g * 0.004 + 0.61);
  float dn = smoothstep(Bw * 0.2, -Bw, w0);              // the near bank: a gentle wet slope
  float wf = w0 + u[13].y + (nz(vec2(g.x * 0.006, 0.13)) - 0.5) * 22.;
  float far = smoothstep(-7., 3., wf);                   // the far bank: a low step up to the bar
  float D = u[13].z * dn * far;
  // ripple marks on its floor, crests along it, plain in the middle where the last of the flow smoothed them
  float mid = min(-w0, wf);
  vec2 rg = g + (vec2(nz(g * 0.003 + 0.4), nz(g * 0.003 + 0.9)) - 0.5) * 16.;
  float fp = fract(rg.y / 31. + 0.1 * sin(rg.x * 0.011) + u[13].w);
  float prof = smoothstep(0., 1., fp < 0.62 ? fp / 0.62 : (1. - fp) / 0.38);
  D -= (prof - 0.5) * 1.3 * smoothstep(1., 8., mid) * (1. - smoothstep(26., 70., mid)) * (0.6 + 0.6 * nz(g * 0.01 + 0.2));
  // the rills that feed it: shallow grooves from up the beach, widening and deepening to the edge
  for (int k = 0; k < 2 + uLZ; k++) {
    float rx = k == 0 ? u[14].z : u[14].w;
    float cx = g.x - rx - 7. * sin(g.y * 0.031 + float(k) * 2.) - 3. * sin(g.y * 0.083 + float(k));
    float lr = clamp(w0 / 80., 0., 1.), wd = mix(5., 1.2, lr);
    D += mix(1.6, 0.25, lr) * exp(-cx * cx / (wd * wd)) * step(-6., w0) * (1. - smoothstep(60., 85., w0));
  }
  // its margin: wet fines, dark
  float mg = smoothstep(-4., 2., w0) * (1. - smoothstep(4., 16., w0));
  if (mg > 0.2) { mat = 3.; vr = max(vr, 0.6 * mg); }
  return D;
}
#endif
#ifdef FOOT
FOOT_FN
#endif
void main() {
  vec2 g = vUv * DM;
  float h = (na(g * 0.0016 + u[25].xy) - 0.5) * 2.6 + (nz(g * 0.0016 + u[25].yx) - 0.5) * 0.4 + (nz(g * 0.008) - 0.5) * 0.12 + (nz(g * 0.025 + 0.3) - 0.5) * 0.09;
  float mat = 0., vr = 0., aux = 0., rp = 0.;
  if (u[17].x > 0.) {
    vec2 rg = g + (vec2(nz(g * 0.002 + 0.1), nz(g * 0.002 + 0.6)) - 0.5) * 14.;
    float ph = rg.y / 46. + 0.08 * sin(rg.x * 0.009);
    float fp = fract(ph);
    float prof = fp < 0.64 ? fp / 0.64 : (1. - fp) / 0.36;
    prof = smoothstep(0., 1., prof);
    rp = u[17].x * (prof - 0.5) * (0.65 + 0.7 * nz(g * 0.004 + 0.4));
    h += rp;
  }
  // rhomboid backwash marks: a faint diamond lattice left by the last backwash
  {
    vec2 rg = g + (vec2(na(g * 0.0021 + 0.31), na(g * 0.0021 + 0.77)) - 0.5) * 90.;
    vec2 d1 = vec2(0.5, 0.866), d2 = vec2(-0.5, 0.866);
    float f1 = fract(dot(rg, d1) / 47. + na(g * 0.004) * 0.6), f2 = fract(dot(rg, d2) / 53. + na(g * 0.004 + 0.5) * 0.6);
    float r1 = exp(-pow((f1 - 0.5) / 0.08, 2.)), r2 = exp(-pow((f2 - 0.5) / 0.08, 2.));
    h += 0.13 * max(r1, r2) * smoothstep(0.35, 0.65, na(g * 0.003 + 0.9));
  }
  // old swash marks: hairline ridges of fines where earlier sheets stopped
  for (int k = 0; k < 5 + uLZ; k++) {
    float fk = float(k);
    float y0 = DM * (0.1 + 0.17 * fk + 0.1 * hc(ivec2(k, 3), 11u + uint(u[25].x * 100.)));
    float yl = y0 + 22. * sin(g.x * 0.008 + fk * 2.1) + 7. * sin(g.x * 0.024 + fk) + (na(vec2(g.x * 0.003, fk * 0.37)) - 0.5) * 40.;
    float dd = g.y - yl;
    float ln = exp(-dd * dd / 4.) * smoothstep(0.22, 0.5, na(vec2(g.x * 0.004, fk * 0.53 + 0.2)));
    h += ln * 0.025;
    if (ln > 0.04) { mat = 3.; vr = max(vr, ln); }
  }
  // bubble holes and pin holes where air escaped as the sheet soaked in
  {
    vec2 cg = g / 3.1; ivec2 ci = ivec2(floor(cg));
    if (hc(ci, 21u) < u[25].z * 6. * smoothstep(0.6, 0.74, na(g * 0.0042 + 0.23))) {
      vec2 ctr = (vec2(ci) + 0.25 + 0.5 * vec2(hc(ci, 22u), hc(ci, 23u))) * 3.1;
      float rad = 0.12 + 0.3 * hc(ci, 24u) * hc(ci, 25u);
      float d = length(g - ctr);
      h -= (0.2 + rad) * (1. - smoothstep(rad * 0.45, rad, d));
      h += 0.04 * exp(-pow((d - rad * 1.25) / (rad * 0.5 + 0.1), 2.));
      if (d < rad) aux = 1.;
    }
  }
  // lugworm casts: coiled piles of spaghetti sand
  if (u[17].y > 0.) {
    vec2 cg = g / 105.; ivec2 ci = ivec2(floor(cg));
    if (hc(ci, 31u) < u[25].w) {
      vec2 ctr = (vec2(ci) + 0.25 + 0.5 * vec2(hc(ci, 32u), hc(ci, 33u))) * 105.;
      float rad = 5. + 3. * hc(ci, 34u);
      vec2 dl = g - ctr; dl += (vec2(nz(g * 0.03), nz(g * 0.03 + 0.5)) - 0.5) * 6.;
      float rho = length(dl), pile = max(1. - rho * rho / (rad * rad), 0.);
      float pitch = rad / 2.4, th = at2(dl.y, dl.x) + 6.283 * hc(ci, 35u);
      float cw = abs(fract((rho - pitch * th / 6.283) / pitch) - 0.5) * pitch, tw = pitch * 0.44;
      float tube = sqrt(max(1. - cw * cw / (tw * tw), 0.)) * tw;
      float hp = pile > 0. ? rad * 0.3 * pow(pile, 0.7) + tube * (0.5 + 0.7 * pile) * smoothstep(0., 0.2, pile) : 0.;
      if (hp > 0.05 && hp + h * 0.3 > h) { h = max(h, hp + h * 0.3); mat = 4.; vr = tube / tw; }
      // and its feeding funnel a little way off
      vec2 fc = ctr + vec2(46., -20.) * (hc(ci, 37u) > 0.5 ? 1. : -1.);
      float fd = length(g - fc);
      h -= 2.2 * exp(-fd * fd / 30.);
    }
  }
  // backwash scour at the stone (u[7]: its home and mean radius) and the shells: a crescent hollow on the up-beach side,
  // a V of two grooves opening down the beach with a low tail of sand in the lee between them
  float wob = na(g * 0.006 + 0.29) - 0.5;
  for (int k = 0; k < 4 + uLZ; k++) {
    vec4 Ok = k == 0 ? vec4(u[7].xy, u[7].z, 1.) : k == 1 ? u[26] : k == 2 ? u[27] : u[28];
    if (k > 0 && float(k) - 0.5 > u[17].w) Ok.z = 0.;
    float rad = k == 0 ? Ok.z : Ok.z * 0.8, dep = k == 0 ? 0.35 : 0.2;
    vec2 d = (g - Ok.xy) / max(rad, 1e-3) + (Ok.z > 0. ? 0. : 99.);
    float rr = length(d);
    // (u[1].w: dark sand, where a thin pooled groove reads as a pen line: a broken moat with a soft outer step instead)
    float xs = rr - 1.2 - 0.3 * wob;
    h -= dep * mix(exp(-xs * xs / 0.3025), 0.4 * (1. - smoothstep(-0.3, 1.7, xs)) * smoothstep(-0.2, 0.15, wob), u[1].w) * smoothstep(-0.1, 0.7, d.y / max(rr, 1e-3));
    float tq = -d.y, ax = abs(d.x + wob * 0.3 * tq);
    if (tq > 0.4) {
      float fade = exp(-tq / (k == 0 ? 2.6 : 3.2)) * smoothstep(0.4, 1.1, tq);
      float gr = exp(-pow((ax - 0.75 - 0.32 * tq) / (0.16 + 0.04 * tq), 2.)) * fade;
      h += dep * (0.55 * exp(-ax * ax / (0.3 + 0.08 * tq)) * fade - 0.7 * gr);
      if (gr > 0.4) { mat = 3.; vr = max(vr, gr * 0.6); }
    }
  }
#ifdef RILL
  {
    float rl = textureLod(tR, vUv + (textureLod(tN, g * 0.016 + 0.37, 0.).rg - 0.5) * (4. / float(NB)), 0.).r;   // its course and edge bent a little at a finger's scale
    h += rl;
    if (rl < -0.2) { mat = 3.; vr = max(vr, smoothstep(0.2, 0.9, -rl)); }   // a floor of wet fines
    if (aux == 0.) aux = min(rl, 0.);   // kept apart for the simulation's coarse bed (see FS_DOWN)
  }
#endif
  // the shells: one call site in a rolled loop (every call site compiles again on Windows)
  vec4 sb = vec4(-99.);
  for (int k = 0; k < 3 + uLZ; k++) {
    vec4 Pk = k == 0 ? u[26] : k == 1 ? u[27] : u[28], Qk = k == 0 ? u[29] : k == 1 ? u[30] : u[31];
    vec4 sk = float(k) + 0.5 < u[17].w && dot(g - Pk.xy, g - Pk.xy) < Pk.z * Pk.z * 2. ? shell(g, Pk, Qk) : vec4(-99.);
    sb = sk.x > sb.x ? sk : sb;
  }
  if (sb.x > h) { h = sb.x; mat = 1. + 0.1 * sb.w; vr = sb.y; aux = sb.z; }
#ifdef FOOT
  for (int k = 0; k < 2 + uLZ; k++) {
    float fd = footD(g, 1., k == 0 ? u[15] : vec4(u[12].xy, u[15].zw), k == 0 ? u[16] : vec4(u[16].x, -u[16].y, u[16].z, u[16].w + 0.31));
    h += fd - rp * smoothstep(0., 0.3, -fd / u[16].z);   // the ripple crests crushed under the foot
  }
  {
    vec2 dc = g - u[15].xy - u[15].zw * 0.5 * u[16].x;
    vec2 qh = vec2(dot(dc, u[15].zw) / (0.56 * u[16].x), dot(dc, vec2(u[15].w, -u[15].z)) / (0.3 * u[16].x));
    h += u[16].z * 0.8 * (1. - smoothstep(1., 1.85, length(qh)));
  }
#endif
#ifdef RUNNEL
  h -= runnelD(g, mat, vr);   // last, so the marks, casts and shells in it lie on its floor
#endif
  o = vec4(mat, vr, aux, h);
}`,D0=`
const vec4 TOE[5] = vec4[5](vec4(-0.098, 0.905, 0.056, 0.07), vec4(-0.012, 0.918, 0.033, 0.039), vec4(0.043, 0.893, 0.03, 0.035), vec4(0.09, 0.858, 0.027, 0.031), vec4(0.128, 0.808, 0.023, 0.027));
float footD(vec2 g, float k, vec4 A, vec4 B) {
  vec2 d = g - A.xy;
  vec2 l = vec2(dot(d, vec2(A.w, -A.z)) * B.y, dot(d, A.zw)) / B.x;   // x across (+ toward the little toe), y along (heel 0, toes 1)
  if (abs(l.x) > 0.5 || l.y < -0.2 || l.y > 1.2) return 0.;
  l += (vec2(nz(g * 0.006 + B.w), nz(g * 0.006 + B.w + 0.5)) - 0.5) * 0.04;
  // the sole's outline: a blunt heel, the outer edge, the arch lifting clear on the inside, the ball's slanting front
  float cx = 0.032 * smoothstep(0.1, 0.72, l.y);
  float hw = mix(0.118, 0.19, smoothstep(0.16, 0.66, l.y)) * pow(max(1. - pow(max(0.17 - l.y, 0.) / 0.17, 2.4), 0.), 0.42);
  float inner = cx - hw + 0.125 * smoothstep(0.17, 0.36, l.y) * (1. - smoothstep(0.44, 0.62, l.y));
  float front = 0.775 - 0.07 * (l.x - cx) / 0.19;
  float e = 0.03;
  float sole = smoothstep(-e, e, l.x - inner) * smoothstep(-e, e, cx + hw - l.x) * smoothstep(-e, e, l.y) * smoothstep(-e, e, front - l.y);
  // pressure: deepest under the heel's back and the ball (most under the big toe's joint), shallow under the arch
  float heel = exp(-dot((l - vec2(0.004, 0.085)) / vec2(0.1, 0.085), (l - vec2(0.004, 0.085)) / vec2(0.1, 0.085)));
  float ball = exp(-dot((l - vec2(-0.045, 0.69)) / vec2(0.15, 0.065), (l - vec2(-0.045, 0.69)) / vec2(0.15, 0.065)));
  float dep = sole * (0.26 + 0.74 * max(heel * 1.12, ball) + 0.14 * smoothstep(0.02, 0.12, l.x - cx));
  // the toes: five pads in an arc, unequal, the big toe set apart on the inside, each deepest at its tip
  float toes = 0.;
  for (int i = 0; i < 5 + uLZ; i++) {
    vec4 t = TOE[i];
    vec2 q = (l - t.xy) / t.zw;
    float td = length(q);
    toes = max(toes, (i == 0 ? 0.92 : 0.74 - 0.07 * float(i)) * (1. - smoothstep(0.25, 1.12, td)) * (0.8 + 0.2 * smoothstep(-0.8, 0.6, q.y)));
  }
  dep = max(dep, toes);
  if (k < 0.5) return dep;
  // the low rim of sand pushed back behind the toes as the foot left, a slight lip round the heel
  float rim = 0.3 * exp(-pow((l.y - 0.985 + 0.06 * l.x) / 0.05, 2.)) * smoothstep(0.2, 0.04, abs(l.x + 0.01))
            + 0.1 * exp(-pow((length((l - vec2(0., 0.11)) / vec2(0.14, 0.14)) - 1.05) / 0.14, 2.)) * smoothstep(0.3, 0.1, l.y);
  return B.z * (rim * (1. - dep) - dep);
}`,A0=mt+`
uniform sampler2D tN;
in vec2 vUv; out vec4 o;
float nz(vec2 p) { return textureLod(tN, p, 0.).r; }
float F(vec2 q) {
  vec2 w = q + (vec2(textureLod(tN, q * 0.004 + u[28].w, 0.).a, textureLod(tN, q * 0.004 + u[28].w + 0.5, 0.).a) - 0.5) * 9.
             + (vec2(textureLod(tN, q * 0.0016 + u[28].w + 0.2, 0.).r, textureLod(tN, q * 0.0016 + u[28].w + 0.7, 0.).r) - 0.5) * 3.;
  vec2 a = abs(w) / u[28].xy;
  float f = pow(pow(a.x, u[29].w) + pow(a.y, u[29].w), 1. / u[29].w);
  float c = dot(q, u[29].xy) / (u[28].x * 0.93), k = 0.16, hm = clamp(0.5 + 0.5 * (c - f) / k, 0., 1.);
  return mix(f, c, hm) + k * hm * (1. - hm);
}
void main() {
  vec2 q = (vUv - 0.5) * 2. * ${50 .toFixed(1)};
  float f = F(q), e = 0.3;
  vec2 gr = vec2(F(q + vec2(e, 0.)) - F(q - vec2(e, 0.)), F(q + vec2(0., e)) - F(q - vec2(0., e))) / (2. * e);
  float sdf = (f - 1.) / max(length(gr), 1e-4);
  float T = u[28].z, Ub = u[29].z;
  float dIn = max(-sdf, 0.);
  float ee = clamp(dIn / (0.5 * T), 0., 1.); float rnd = sqrt(1. - (1. - ee) * (1. - ee));
  float core = 1. - pow(1. - clamp(dIn / (0.8 * min(u[28].x, u[28].y)), 0., 1.), 2.);
  float zr = Ub + 0.24 * T;
  float tilt = 1. + 0.13 * dot(q / u[28].xy, normalize(vec2(0.35, -0.8) + u[29].xy));
  float dent = (textureLod(tN, q * 0.007 + 0.3 + u[28].w, 0.).a - 0.5) * 2.4 + (nz(q * 0.0035 + 0.7) - 0.5) * 0.5 + (nz(q * 0.012 + 0.1) - 0.5) * 0.05;
  float top = T * (0.62 + 0.38 * core) * tilt + dent * (0.3 + 0.7 * core);
  // a few pits weathered out of the surface
  vec2 cg = q / 5.; ivec2 ci = ivec2(floor(cg));
  float pit = 0.;
  if (hc(ci, 41u + uint(u[28].w * 50.)) < 0.09) {
    vec2 ctr = (vec2(ci) + 0.2 + 0.6 * vec2(hc(ci, 42u), hc(ci, 43u))) * 5.;
    float rad = 0.3 + 0.5 * hc(ci, 44u);
    pit = 1. - smoothstep(rad * 0.5, rad, length(q - ctr));
  }
  top -= pit * 0.4 * core;
  float zt = zr + (top - zr) * rnd - 2. * max(sdf, 0.);
  float zu = zr - (zr - Ub * (1. - core)) * rnd + 2. * max(sdf, 0.);
  float mott = 0.6 * textureLod(tN, q * 0.012 + 0.13, 0.).a + 0.3 * nz(q * 0.01 + 0.51) + 0.1 * nz(q * 0.04);
  o = vec4(zt, zu, max(mott, 0.02) * (pit > 0.5 ? -1. : 1.), sdf);
}`,t0=mt+`
uniform sampler2D tBed;
in vec2 vUv; out vec4 o;
void main() {
  vec2 g = (floor(gl_FragCoord.xy) + 0.5) * CELL;
  float k = 1.2 * DM / float(NB);
#ifdef RILL
  // the rills are narrower than a cell: water pooled in them cell by cell reads as a chain of beads, so the film runs
  // over the bed without them (their depth is in .b, negative); their floors are dark by material instead
  vec4 a = textureLod(tBed, (g + vec2(k, k)) / DM, 0.), b = textureLod(tBed, (g + vec2(-k, k)) / DM, 0.),
       c = textureLod(tBed, (g + vec2(k, -k)) / DM, 0.), d = textureLod(tBed, (g + vec2(-k, -k)) / DM, 0.);
  o = vec4((a.a + b.a + c.a + d.a - min(a.b, 0.) - min(b.b, 0.) - min(c.b, 0.) - min(d.b, 0.)) * 0.25, 0., 0., 1.);
#else
  float s = textureLod(tBed, (g + vec2(k, k)) / DM, 0.).a + textureLod(tBed, (g + vec2(-k, k)) / DM, 0.).a
          + textureLod(tBed, (g + vec2(k, -k)) / DM, 0.).a + textureLod(tBed, (g + vec2(-k, -k)) / DM, 0.).a;
  o = vec4(s * 0.25, 0., 0., 1.);
#endif
}`,R0=mt+`
uniform sampler2D tStone, tN, tBS;
uniform vec4 uA, uB;
in vec2 vUv; out vec4 o;
void main() {
  vec2 g = gl_FragCoord.xy / float(NB) * DM;
  vec2 d = g - uA.xy;
  if (uB.y > 1.5) {
    // the lip: sand squeezed up just outside the rim, more on the side the stone is pushed toward; over a fixed base
    vec2 q = vec2(uA.z * d.x + uA.w * d.y, -uA.w * d.x + uA.z * d.y);
    vec2 uv = q / (2. * ${50 .toFixed(1)}) + 0.5;
    if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) discard;
    float sd = textureLod(tStone, uv, 0.).w;
    if (sd <= 0. || sd > 11.) discard;
    vec2 dir = d / max(length(d), 1e-3);
    float vd = dot(dir, u[9].xy) * 3., side = 1. + 1.6 * clamp(vd, 0., 1.) - 0.5 * clamp(-vd, 0., 1.);
    float nl = textureLod(tN, g * 0.0025 + 0.41, 0.).r, nl2 = textureLod(tN, g * 0.007 + 0.17, 0.).r;
    float base = (textureLod(tN, g * 0.0016 + u[25].xy, 0.).a - 0.5) * 2.6 + (textureLod(tN, g * 0.0016 + u[25].yx, 0.).r - 0.5) * 0.4;
    float w = 3.5 + 3. * nl;
    float lip = uB.z * max(side, 0.2) * (0.45 + 0.9 * nl) * (0.8 + 0.4 * nl2) * exp(-pow(max(sd - 0.6, 0.) / w, 1.6));
    if (lip < 0.03) discard;
    o = vec4(0., 0., 0., base + lip);
  } else if (uB.y < 0.5) {
    vec2 q = vec2(uA.z * d.x + uA.w * d.y, -uA.w * d.x + uA.z * d.y);
    vec2 uv = q / (2. * ${50 .toFixed(1)}) + 0.5;
    vec4 s = textureLod(tStone, uv, 0.);
    if (s.w > 0. || uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) discard;
    o = vec4(0., 0., 0., uB.x + s.y + 0.32 * max(8. + s.w, 0.));
  } else {
    float cs = cos(uB.w), sn = sin(uB.w);
    vec2 l = vec2(cs * d.x + sn * d.y, (-sn * d.x + cs * d.y) / uB.z);
    float rr = length(l) / uA.z * (1. + 0.12 * (textureLod(tN, g * 0.06 + uA.w, 0.).r - 0.5));
    if (rr > 1.) discard;
    // uB.x > 9: laid on the local sand surface (washed-up gravel) rather than at a fixed depth (a tapped pebble)
    // and where the bed lies lower than the open sand (a runnel, a print) it settles onto that floor
    float base = (textureLod(tN, g * 0.0016 + u[25].xy, 0.).a - 0.5) * 2.6 + (textureLod(tN, g * 0.0016 + u[25].yx, 0.).r - 0.5) * 0.4;
    float z0 = (uB.x > 5. ? uB.x - 10. + base : uB.x) + min(textureLod(tBS, g / DM, 0.).x - base + 0.6, 0.);
    float zp = z0 + uA.z * (0.34 + 0.1 * fract(uA.w * 7.3)) * sqrt(max(1. - rr * rr, 0.)) + (textureLod(tN, g * 0.02 + uA.w, 0.).a - 0.5) * uA.z * (uB.x > 5. ? 0.12 : 0.3) + (textureLod(tN, g * 0.2, 0.).r - 0.5) * 0.15;
    o = vec4(2., uA.w, 0., zp);
  }
}`,e0=mt+`
uniform sampler2D tN, tBS;
in vec2 vUv; out vec4 o;
#ifdef FOOT
float nz(vec2 p) { return textureLod(tN, p, 0.).r; }
FOOT_FN
#endif
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy); vec2 g = (vec2(c) + 0.5) * CELL;
  float n = 0.6 * textureLod(tN, g * 0.002 + 0.21, 0.).a + 0.4 * textureLod(tN, g * 0.003 + 0.7, 0.).r;
  float h = u[17].z * (0.5 + n);
  h += max(-texelFetch(tBS, c, 0).x - 0.4, 0.) * 0.12;
  float fy = u[31].x + u[31].y * (0.7 * sin(g.x * 0.011 + 1.3) + 0.3 * sin(g.x * 0.031 + 0.4) + 0.7 * lobe(g.x, 0.37));
  float d = g.y - fy;
  float f = (d > 0. ? exp(-d * d / 5.) : exp(-d * d / 60.)) * (0.55 + 0.45 * n) + exp(-pow((d + 14.) / 9., 2.)) * 0.3 * n;
#ifdef FOOT
  // a fresh footprint: the sand round it dilated under the step, as a full press would, then left to the simulation
  float hl = 0.;
  for (int i = 0; i < 48 + uLZ; i++) {
    int k = i / 24; float fi = float(i - k * 24);
    float r = sqrt(fi / 23.), an = fi * 2.39996;
    float w = footD(g + vec2(cos(an), sin(an)) * r * 0.3 * u[16].x, 0., k == 0 ? u[15] : vec4(u[12].xy, u[15].zw), k == 0 ? u[16] : vec4(u[16].x, -u[16].y, u[16].z, u[16].w + 0.31));
    hl = max(hl, w - r * 0.8);
  }
  o = vec4(1.5 * clamp(hl, 0., 1.), h, 0., f);
#else
  o = vec4(0., h, 0., f);
#endif
}`,_0=mt+`
uniform sampler2D tS, tBS;
in vec2 vUv; out vec4 o;
float surf(ivec2 c) { c = clamp(c, ivec2(0), ivec2(N - 1)); return texelFetch(tBS, c, 0).x + u[5].w * (float(c.y) + 0.5) * CELL + texelFetch(tS, c, 0).y; }
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float hm = max(texelFetch(tS, c, 0).y - 0.012, 0.);
  vec4 F = vec4(0.);
  if (hm > 0.) {
    float s0 = surf(c);
    vec4 sl = vec4(s0 - surf(c + ivec2(1, 0)), s0 - surf(c - ivec2(1, 0)), s0 - surf(c + ivec2(0, 1)), s0 - surf(c - ivec2(0, 1))) / CELL;
    if (c.y == 0) sl.w = max(sl.w, u[5].w);
    sl = max(sl, 0.);
    float dt = u[19].x;
    float hl = 3270. * hm * hm, ht = 500. * pow(hm, 0.6667);
    vec4 v = min(min(hl * sl, ht * sqrt(sl)), vec4(0.45 * CELL / dt));
    F = v * hm * CELL;
    float tot = (F.x + F.y + F.z + F.w) * dt, cap = hm * CELL * CELL;
    if (tot > cap) F *= cap / tot;
  }
  o = F;
}`,P0=mt+`
uniform sampler2D tS, tF, tStone, tN, tBS;
in vec2 vUv; out vec4 o;
vec4 Fx(ivec2 c) { return texelFetch(tF, clamp(c, ivec2(0), ivec2(N - 1)), 0); }
vec4 Sx(ivec2 c) { return texelFetch(tS, clamp(c, ivec2(0), ivec2(N - 1)), 0); }
float imp(vec2 g, vec4 v) { float d = length(g - v.xy); return v.z * exp(-max(d - v.w, 0.) / (0.7 * v.w + 0.5)) * (d < v.w * 0.7 ? 0.6 : 1.); }
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec2 g = (vec2(c) + 0.5) * CELL;
  vec4 s = texelFetch(tS, c, 0);
  float dt = u[19].x, Ld = u[19].y;
  vec4 fo = texelFetch(tF, c, 0);
  float fin = (c.x > 0 ? Fx(c - ivec2(1, 0)).x : 0.) + (c.x < N - 1 ? Fx(c + ivec2(1, 0)).y : 0.)
            + (c.y > 0 ? Fx(c - ivec2(0, 1)).z : 0.) + (c.y < N - 1 ? Fx(c + ivec2(0, 1)).w : 0.);
  float h = max(s.y + dt / (CELL * CELL) * (fin - (fo.x + fo.y + fo.z + fo.w)), 0.);
  // what the stone's load asks of the packing
  vec2 q = stoneQ(g);
  float d = (length(q / u[21].yz) - 1.) * min(u[21].y, u[21].z);
  vec2 suv = q / (2. * u[21].x) + 0.5;
  if (suv.x > 0.02 && suv.y > 0.02 && suv.x < 0.98 && suv.y < 0.98) d = textureLod(tStone, suv, 0.).w;
  // a print left below the water table fills at once from the saturated sand round it
  float wt = (textureLod(tN, g * 0.0016 + u[25].xy, 0.).a - 0.5) * 2.6 + (textureLod(tN, g * 0.0016 + u[25].yx, 0.).r - 0.5) * 0.4 - 0.45;
  float dep = (d > 1. || u[8].x > 0.) ? wt - texelFetch(tBS, c, 0).x : 0.;
  float L = u[8].z;
  vec2 dir = (g - u[7].xy) / max(length(g - u[7].xy), 1e-3);
  float lam = u[9].z * (0.55 + 0.8 * L) * (0.45 + 1.1 * textureLod(tN, g * 0.0026 + 0.61, 0.).a) * (1. + 0.35 * dir.y);
  float lead = 1. + 1.8 * max(dot(dir, u[9].xy), 0.) - 0.5 * max(-dot(dir, u[9].xy), 0.);
  float S = L * u[9].w * lead * (d > 0. ? exp(-d / lam) : 0.75);
  S *= 0.7 + 0.6 * textureLod(tN, g * 0.0045 + 0.37, 0.).r;
  S += imp(g, u[13]) + imp(g, u[14]) + imp(g, u[15]) + imp(g, u[16]);
  // the swash sheet
  float sheet = 0.;
  float f = s.w;
  if (u[11].y > 0.5) {
    float dy = frontY(g.x) - g.y;
    if (dy > 0.) { h = max(h, min(u[12].x, 0.22 + dy * 0.012)); sheet = 1.; }
    float band = exp(-pow((dy - 9.) / 13., 2.));
    f = max(f, band * u[12].w * (0.3 + 0.9 * textureLod(tN, g * 0.006 + vec2(u[10].x * 0.03, 0.), 0.).a));
  }
  // dilation follows its target fast when loading, slower when the packing settles back
  float e = s.z;
  float rate = S > e ? 14. : 1.6;
  if (h > 0.35) rate = max(rate, 5.); // under a running sheet the grains are shaken loose and resettle
  float en = e + (S - e) * (1. - exp(-rate * dt));
  float uD = s.x + Ld * (en - e);
  // pore water moves toward the suction
  float lap = Sx(c + ivec2(1, 0)).x + Sx(c - ivec2(1, 0)).x + Sx(c + ivec2(0, 1)).x + Sx(c - ivec2(0, 1)).x - 4. * s.x;
  uD += u[19].z * dt / (CELL * CELL) * lap;
  // the film is drawn down into unsaturated pores
  float x = min(min(h, max(uD, 0.)), (3. + 25. * sheet) * dt);
  h -= x; uD -= x;
  // and the water table refills them slowly from below
  uD -= max(uD, 0.) * dt / u[19].w;
  // contracted packing: excess pore water wells out onto the surface
  if (uD < 0.) { h -= uD; uD = 0.; }
  // a print left behind: its floor packs again and water seeps in from the saturated sand round it
  if (dep > 0.25) { uD *= exp(-dt * 4.); if (dep > h) h += (dep - h) * (1. - exp(-dt * 3.)); }
  // foam rides the film and bursts
  float hv = max(h, 0.03);
  vec2 v = vec2(fo.x - fo.y, fo.z - fo.w) / (hv * CELL);
  float fxm = Sx(c - ivec2(1, 0)).w, fxp = Sx(c + ivec2(1, 0)).w, fym = Sx(c - ivec2(0, 1)).w, fyp = Sx(c + ivec2(0, 1)).w;
  float dfx = v.x > 0. ? f - fxm : fxp - f, dfy = v.y > 0. ? f - fym : fyp - f;
  f -= clamp(dt / CELL * (v.x * dfx + v.y * dfy), -0.5, 0.5);
  f *= exp(-dt / (h > 0.2 ? 0.8 : 35.));
  // swash soaks into the beach face above the water table
  h -= max(h - 0.1, 0.) * (1. - exp(-dt * 0.7));
  if (c.y == 0) h *= 0.85;
  o = vec4(uD, h, en, clamp(f, 0., 1.5));
}`,o0=mt+`
uniform sampler2D tBed, tSt, tStone, tN, tG;
in vec2 vUv; out vec4 o;
float bedH(vec2 g) { return textureLod(tBed, g * (1. / DM), 0.).a; }
vec4 simAt(vec2 g) {
  vec2 c = g / CELL - 0.5; ivec2 i = ivec2(floor(c)); vec2 f = c - vec2(i);
  ivec2 a = clamp(i, ivec2(0), ivec2(N - 1)), b = clamp(i + 1, ivec2(0), ivec2(N - 1));
  return mix(mix(texelFetch(tSt, a, 0), texelFetch(tSt, ivec2(b.x, a.y), 0), f.x), mix(texelFetch(tSt, ivec2(a.x, b.y), 0), texelFetch(tSt, b, 0), f.x), f.y);
}
vec4 stoneAt(vec2 g) {
  vec2 uv = stoneQ(g) / (2. * u[21].x) + 0.5;
  if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) return vec4(0., 0., 0., 99.);
  return textureLod(tStone, uv, 0.);
}
float slab(vec3 p) { vec4 s = stoneAt(p.xy); float zb = u[8].x; return max(s.w, max(p.z - (zb + s.x), (zb + s.y) - p.z)); }
vec3 sky(vec3 r) {
  float el = clamp(r.z, 0., 1.);
  vec3 c = mix(u[4].rgb, u[3].rgb, pow(el, 0.5)) * 1.1;
  float cs = max(dot(r, u[1].xyz), 0.);
  c += u[2].rgb * (0.16 * cs * cs + 0.2 * pow(cs, 4.) + 0.4 * pow(cs, 16.) + 0.6 * pow(cs, 200.));
  return c;
}
float ggx(vec3 n, vec3 v, vec3 l, float a) {
  vec3 hv = normalize(v + l); float nh = max(dot(n, hv), 0.); float a2 = a * a;
  float dd = nh * nh * (a2 - 1.) + 1.; float D = a2 / (3.14159 * dd * dd);
  float nl = max(dot(n, l), 0.), nv = max(dot(n, v), 1e-3); float k = a * 0.5;
  return D * nl / (nl * (1. - k) + k) / (nv * (1. - k) + k) * 0.25;
}
float fres(float c) { float m = 1. - clamp(c, 0., 1.); float m2 = m * m; return 0.02 + 0.98 * m2 * m2 * m; }
float shadowAt(vec3 P) {
  vec3 L = u[1].xyz; float sh = 1.;
  float tl = min(max(13. - P.z, 2.) / L.z, 95.);
  for (int i = 0; i < 9 + uLZ; i++) {
    float f = (float(i) + 1.) / 9.; float t = 0.5 + tl * f * f;
    vec3 p = P + L * t;
    sh = min(sh, clamp(0.5 + (p.z - bedH(p.xy)) / (0.25 + 0.03 * t), 0., 1.));
  }
  float ts = (u[8].x + u[8].y + 0.5 - P.z) / L.z;
  if (ts > 0.) {
    vec2 a = P.xy, ab = L.xy * ts;
    float k = clamp(dot(u[7].xy - a, ab) / max(dot(ab, ab), 1e-4), 0., 1.);
    if (length(a + ab * k - u[7].xy) < u[21].x) {
      float t = 0.6;
      for (int i = 0; i < 18 + uLZ; i++) {
        float d = slab(P + L * t);
        sh = min(sh, mix(clamp(0.5 + 0.5 * d / (0.03 * t + 0.25), 0., 1.), 1., 0.32 * smoothstep(8., 70., t)));
        t += clamp(d, 0.35, 9.);
        if (t > ts + 1.) break;
      }
    }
  }
  return sh;
}
`,U0=o0+`
void main() {
  vec2 sc = (vUv - 0.5) * 2. * u[0].w;
  vec3 ro = u[0].xyz;
  vec3 rd = normalize(u[22].xyz + sc.x * u[24].xyz + sc.y * u[23].xyz);
  vec3 L = u[1].xyz, V = -rd;
  // the bed
  float t0 = (ro.z - 14.) / -rd.z, t1 = (ro.z + 9.) / -rd.z;
  float ta = t0, tb = t1;
  for (int i = 0; i < 16 + uLZ; i++) {
    float t = t0 + (t1 - t0) * (float(i) + 1.) / 16.;
    vec3 p = ro + rd * t;
    if (p.z < bedH(p.xy)) { tb = t; break; }
    ta = t;
  }
  for (int i = 0; i < 5 + uLZ; i++) { float m = 0.5 * (ta + tb); vec3 p = ro + rd * m; if (p.z < bedH(p.xy)) tb = m; else ta = m; }
  float tHit = 0.5 * (ta + tb);
  float zb = u[8].x, Tm = u[8].y;
  vec3 P = ro + rd * tHit;
  vec3 Ls = u[2].rgb;
  vec3 skyA = mix(u[4].rgb, u[3].rgb, 0.6 + u[3].w) * 0.5;
  vec3 col;
  {
    vec2 g = P.xy;
    vec4 Bl = textureLod(tBed, g / DM, 0.);
    ivec2 bi = clamp(ivec2(floor(g / DM * float(NB) - 0.5)), ivec2(0), ivec2(NB - 2));
    vec4 B = texelFetch(tBed, bi, 0), B1 = texelFetch(tBed, bi + ivec2(1, 0), 0), B2 = texelFetch(tBed, bi + ivec2(0, 1), 0), B3 = texelFetch(tBed, bi + ivec2(1, 1), 0);
    B = B1.r > B.r ? B1 : B; B = B2.r > B.r ? B2 : B; B = B3.r > B.r ? B3 : B;
    int mat = int(B.r + 0.5);
    float e = 0.55;
    float hxp = bedH(g + vec2(e, 0.)), hxm = bedH(g - vec2(e, 0.)), hyp = bedH(g + vec2(0., e)), hym = bedH(g - vec2(0., e));
    vec3 nb = normalize(vec3(-(hxp - hxm) / (2. * e), -(hyp - hym) / (2. * e) - u[5].w, 1.));
    vec4 G = texture(tG, g / 16.8);
    vec2 gsl = (G.zw - 0.5) * 2.;
    vec4 S = simAt(g + (textureLod(tN, g * 0.008 + 0.13, 0.).rg - 0.5) * 7.);
    float uD = S.x, h = S.y;
    float nf = textureLod(tN, g * 0.05, 0.).r;
    // the halo: the same sand gone matt where the pores took the film down, a tone or two lighter, with a soft edge
    float D = smoothstep(0.004, 0.18, uD + (textureLod(tN, g * 0.012 + 0.4, 0.).r - 0.5) * 0.03);
    float gv = 1. + (G.r - 0.5) * mix(0.22, 0.62, D);
    float heavy = step(G.r, 0.05 + 0.05 * nf);
    vec3 alb = mix(u[6].rgb, u[5].rgb, u[6].w * D) * gv;
    alb = mix(alb, alb * 0.3, heavy * 0.75);
    vec4 Gc = texture(tG, g / 40. + 0.21);
    alb = mix(alb, alb * 1.3 + 0.02, step(0.985, Gc.r) * Gc.g);
    alb = mix(alb, alb * 0.45, step(Gc.r, 0.03) * Gc.g);
    alb *= 0.88 + 0.24 * textureLod(tN, g * 0.0021 + 0.6, 0.).a;
    alb *= 1. - 0.38 * smoothstep(0.2, 0.8, Bl.b);
    // objects in the bed: the material of the highest id among the four nearest texels, blended by the filtered id
    float glazeMin = 0., objW = 0.;
    if (mat > 0) {
      float w = smoothstep(0.3, 0.7, Bl.r / float(mat));
      float k = B.g;
      vec3 oa = alb;
      if (mat == 1) {
        vec3 sc1 = k < 0.45 ? vec3(0.72, 0.68, 0.6) : k < 0.75 ? vec3(0.72, 0.6, 0.52) : k < 0.9 ? vec3(0.68, 0.57, 0.42) : k < 0.935 ? mix(vec3(1.25, 1.24, 1.22), vec3(0.62, 0.72, 0.86), smoothstep(0.2, 0.9, Bl.b * 2.5 + 0.3 * G.r)) : mix(vec3(0.07, 0.075, 0.09), vec3(0.16, 0.18, 0.24), 0.6 * smoothstep(0.1, 0.25, Bl.b));
        oa = sc1 * (0.5 + 0.5 * Bl.b) * (0.8 + 0.3 * textureLod(tN, g * 0.004 + k, 0.).a) * (0.9 + 0.15 * G.r) * 0.62;
        oa = mix(oa, oa * vec3(0.78, 0.7, 0.62), smoothstep(0.55, 0.9, textureLod(tN, g * 0.006 + k * 3., 0.).r));
        // sand grains stuck to the wet shell
        oa = mix(oa, alb, step(0.8, G.r) * 0.85 + step(0.97, Gc.r) * 0.5);
        glazeMin = (k > 0.9 ? 0.85 : 0.45) * w; objW = w;
      } else if (mat == 2) {
        vec3 pc = k < 0.3 ? vec3(0.25, 0.25, 0.24) : k < 0.55 ? vec3(0.31, 0.26, 0.21) : k < 0.8 ? vec3(0.13, 0.13, 0.135) : k < 0.94 ? vec3(0.4, 0.38, 0.34) : vec3(0.72, 0.7, 0.66);
        oa = pc * (0.88 + 0.24 * textureLod(tN, g * 0.02 + k, 0.).r) * (0.94 + 0.12 * G.r) * 0.5;
        glazeMin = 0.7 * w; objW = w;
      } else if (mat == 3) {
        oa = alb * (1. - Bl.g * 0.22 * (0.5 + G.r));
      } else {
        oa = alb * (1.04 + 0.1 * Bl.g);
      }
      alb = mix(alb, oa, w);
    }
    // the water film and the swash sheet
    float thick = smoothstep(0.09, 0.9, h);
    float glaze = max(smoothstep(0.012, 0.05, h - 0.015 * G.g), glazeMin * (1. - D));
    vec2 rip = vec2(0.);
    if (thick > 0.) {
      vec2 fl = vec2(0., -u[12].z * u[10].x * 70.);
      vec4 r1 = textureLod(tN, (g + fl) * 0.008, 0.), r2 = textureLod(tN, (g * 1.7 - fl * 1.3) * 0.008 + 0.5, 0.);
      rip = ((r1.rg - 0.5) + (r2.gr - 0.5) * 0.7) * 0.09 * thick;
    }
    vec3 nF = normalize(vec3(mix(nb.xy * 0.75, nb.xy * 0.15 + vec2(0., -u[5].w), thick) + rip + (G.zw - 0.5) * 0.02 * (1. - thick), 1.));
    alb *= mix(1., 0.82, thick);
    float sh = shadowAt(P + nb * 0.15);
    vec4 sa = stoneAt(g);
    // right at the stone's foot the sand slumps against it rather than standing as a dark wall
    nb = normalize(mix(nb, vec3(0., 0., 1.), (1. - smoothstep(0., 2.5, sa.w)) * 0.8 * (1. - smoothstep(3., 16., zb + 0.5 * Tm))));
    float low = 1. - smoothstep(3., 16., zb + 0.5 * Tm);
    float ao = mix(1., mix(0.5, 1., smoothstep(-0.5, 7., sa.w)), low);
    float sside = dot(normalize(g - u[7].xy + 1e-3), -normalize(L.xy));
    float cdk = mix(1., mix(mix(0.92, 0.74, smoothstep(-0.6, 0.6, sside)), 1., smoothstep(0., 2.5, sa.w)), low);
    // a pooled print: the water's flat face lies over its walls, which no longer stand dark in their own shade
    float wt = (textureLod(tN, g * 0.0016 + u[25].xy, 0.).a - 0.5) * 2.6 + (textureLod(tN, g * 0.0016 + u[25].yx, 0.).r - 0.5) * 0.4 - 0.45;
    float pool = max(smoothstep(0.1, 0.7, wt - P.z) * step(1., sa.w), smoothstep(0.4, 2., h));
    sh = mix(sh, 1., 0.75 * pool);
    vec3 nS = normalize(mix(nb, vec3(0., 0., 1.), pool) + vec3(gsl * mix(0.15, 0.6, D), 0.));
    vec3 diff = alb * (Ls * max(dot(nS, L), 0.) * sh + skyA * (0.55 + 0.45 * nS.z) * ao) * cdk;
    float F = fres(dot(nF, V));
    vec3 R = reflect(rd, nF);
    vec3 env = sky(R);
    // the stone mirrored in the film at its foot
    if (glaze > 0.05 && sa.w < 26. && low > 0.) {
      float tt = 0.4, hit = 0.;
      for (int i = 0; i < 10 + uLZ; i++) {
        float d = slab(P + R * tt);
        if (d < 0.) { hit = 1.; break; }
        tt += clamp(d, 0.4, 6.);
        if (P.z + R.z * tt > zb + Tm + 1.) break;
      }
      env = mix(env, u[18].rgb * 0.6 * (skyA + Ls * 0.12), hit);
    }
    vec3 nDm = normalize(nb + vec3(gsl * 0.3, 0.));
    float Fd = fres(dot(nDm, V));
    float fct = step(0.9, fract(G.r * 13.7 + G.g * 3.1));
    vec3 nG = normalize(nF + vec3((fract(G.r * vec2(37.1, 91.7)) - 0.5) * 0.7, 0.));
    float gF = 0., gD = 0., gG = 0.;
    for (int i = 0; i < 4 + uLZ; i++) {
      float gi = ggx(i == 2 ? nDm : i == 3 ? nG : nF, V, L, i == 0 ? 0.04 + 0.03 * (1. - thick) : i == 1 ? 0.16 : i == 2 ? 0.24 : 0.035);
      if (i == 2) gD = gi; else if (i == 3) gG = gi; else gF += (i == 0 ? 1. : 0.18) * gi;
    }
    float sF = sh * F * gF;
    vec3 film = F * env * mix(1., ao, 0.5) + Ls * (sF / (1. + 6. * sF) + sh * F * fct * min(gG * 0.06, 0.5));
    vec3 damp = Fd * sky(reflect(rd, nDm)) * 0.75 * ao + Ls * sh * Fd * gD;
    col = diff * (1. - F * glaze) + film * glaze + damp * (1. - 0.6 * D) * (1. - glaze) * (0.8 - 0.6 * objW);
    // standing water (u[23].w: a runnel): the floor sinks into the water's own dim, cooler body with depth, so the mirror reads
    // (its body is the silt it carries, paler than black sand; u[24].w: the mirror's weight, more on dark sand where it is what one sees)
    vec3 water = F * env * u[24].w + Ls * sF / (1. + 6. * sF) + mix(u[6].rgb, vec3(0.16, 0.15, 0.13), 0.45) * (Ls * L.z * sh + skyA) * vec3(0.3, 0.36, 0.4);
    col = mix(col, water, smoothstep(0.25, 0.9, h) * (0.35 + 0.65 * (1. - exp(-0.3 * max(h - 0.4, 0.)))) * u[23].w);
    // dry grains glint
    // foam: the sheet's front and what it strands
    float front = 0.;
    if (u[11].z > 0.) { float dy = frontY(g.x) - g.y; front = smoothstep(-1.4, 0.6, dy) * (1. - smoothstep(3., 9. + 9. * nf, dy)) * u[11].z; }
    vec4 Gb = texture(tG, g / 21.);
    float lace = textureLod(tN, g * 0.013, 0.).b + 0.6 * textureLod(tN, g * 0.031 + 0.5, 0.).b + 0.5 * textureLod(tN, g * 0.083 + 0.2, 0.).b - 0.25;
    float fa = smoothstep(0.05, 0.7, S.w) * (0.25 + 1.1 * lace) + 0.18 * Gb.g;
    float fcov = max(0.6 * smoothstep(0.45, 0.95, fa), 0.92 * smoothstep(0.4, 0.8, front * (0.3 + 0.9 * lace + 0.4 * Gb.g)));
    vec3 fcol = vec3(0.8, 0.8, 0.78) * (0.68 + 0.3 * Gb.g) * (Ls * max(dot(nb, L), 0.) * sh * (0.6 + 0.6 * Gb.g) + skyA * 1.15) + Ls * sh * pow(Gb.g, 10.) * 0.1;
    col = mix(col, fcol, fcov);
  }
  o = vec4(col, tHit);
}`,q0=o0+`
void main() {
  vec2 sc = (vUv - 0.5) * 2. * u[0].w;
  vec3 ro = u[0].xyz;
  vec3 rd = normalize(u[22].xyz + sc.x * u[24].xyz + sc.y * u[23].xyz);
  vec3 L = u[1].xyz, V = -rd;
  // the stone, drawn over the sand pass: its own program so the two compile side by side
  float zb = u[8].x, Tm = u[8].y;
  float s0 = (ro.z - (zb + Tm + 0.5)) / -rd.z, s1 = (ro.z - zb + 0.5) / -rd.z;
  vec3 pm = ro + rd * (0.5 * (s0 + s1));
  if (length(pm.xy - u[7].xy) > u[21].x + 0.5 * (s1 - s0)) discard;
  float sa = s0, sb = s1; bool hs = false;
  for (int i = 0; i < 16 + uLZ; i++) { float t = s0 + (s1 - s0) * (float(i) + 1.) / 16.; if (slab(ro + rd * t) < (i == 15 ? 0.45 : 0.)) { sb = t; hs = true; break; } sa = t; }
  if (!hs) discard;
  for (int i = 0; i < 5 + uLZ; i++) { float m = 0.5 * (sa + sb); if (slab(ro + rd * m) < 0.) sb = m; else sa = m; }
  float tHit = 0.5 * (sa + sb);
  // hidden where the ray went into the sand in front of it
  bool hid = false;
  for (int i = 0; i < 4 + uLZ; i++) { vec3 p = ro + rd * (tHit - 0.4 - 1.3 * float(i * i)); hid = hid || p.z < bedH(p.xy) - 0.05; }
  if (hid) discard;
  vec3 P = ro + rd * tHit;
  vec3 Ls = u[2].rgb;
  vec3 skyA = mix(u[4].rgb, u[3].rgb, 0.6 + u[3].w) * 0.5;
  vec3 col;
  vec2 q0 = stoneQ(P.xy);
  vec3 ne = vec3(q0 / (u[21].yz * u[21].yz), (P.z - zb - 0.5 * Tm) / (0.25 * Tm * Tm));
  float sh = shadowAt(P + normalize(vec3(u[7].z * ne.x - u[7].w * ne.y, u[7].w * ne.x + u[7].z * ne.y, ne.z)) * 0.4);
  {
    vec2 q = stoneQ(P.xy);
    vec2 uv = q / (2. * u[21].x) + 0.5; float tx = 1. / 192.;
    vec4 S0 = textureLod(tStone, uv, 0.);
    bool top = P.z > zb + 0.5 * (S0.x + S0.y);
    vec4 a1 = textureLod(tStone, uv + vec2(tx, 0.), 0.), a0 = textureLod(tStone, uv - vec2(tx, 0.), 0.);
    vec4 b1 = textureLod(tStone, uv + vec2(0., tx), 0.), b0 = textureLod(tStone, uv - vec2(0., tx), 0.);
    vec2 dq = (top ? vec2(a1.x - a0.x, b1.x - b0.x) : vec2(a1.y - a0.y, b1.y - b0.y)) / (4. * u[21].x * tx);
    vec2 dg = vec2(u[7].z * dq.x - u[7].w * dq.y, u[7].w * dq.x + u[7].z * dq.y);
    vec3 n = top ? normalize(vec3(-dg, 1.)) : normalize(vec3(dg, -1.));
    vec2 gq = vec2(a1.w - a0.w, b1.w - b0.w); gq /= max(length(gq), 1e-5);
    // the rounded rim: its normal from the outline's gradient and the rounding profile, not from steep texels
    {
      float rho = 0.5 * u[21].w, dIn = max(-S0.w, 0.);
      vec2 og = vec2(u[7].z * gq.x - u[7].w * gq.y, u[7].w * gq.x + u[7].z * gq.y);
      float zr = 0.27 * u[21].w;
      float hs = top ? max(S0.x - zr, 0.5) + 0.0 : max(zr - S0.y, 0.5);
      float zz = P.z - zb - zr;
      vec3 nr = normalize(vec3(og * (rho - dIn) / (rho * rho), zz / max(rho * rho, 1.)));
      n = normalize(mix(nr, n, smoothstep(0.55 * rho, rho, dIn)));
    }
    vec2 qs = q + gq * (P.z - zb - 0.27 * u[21].w) * (1. - abs(n.z));
    vec4 gs = texture(tG, qs / 40.), gs2 = texture(tG, qs / 15. + 0.37), gs3 = texture(tG, qs / 105. + 0.61);
    float mott = abs(S0.z);
    float m2 = textureLod(tN, qs * 0.004 + 0.47 + u[28].w, 0.).r, m3 = textureLod(tN, qs * 0.006 + 0.19 + u[28].w, 0.).a;
    // the rock: a mottled ground mass with clasts of three sizes, denser in patches, a little rusty or green in places
    vec3 alb = u[18].rgb * (0.62 + 0.76 * mott) * mix(vec3(1.), vec3(1.05, 1.0, 0.94), smoothstep(0.4, 0.8, m3)) * mix(vec3(1.), vec3(0.97, 1.0, 0.99), smoothstep(0.45, 0.85, m2));
    alb *= (0.84 + 0.32 * gs.r) * (0.9 + 0.2 * gs2.r);
    float dens = smoothstep(0.25, 0.8, m2);
    float lt = smoothstep(0.93 - 0.05 * dens, 0.98, gs2.r) * 0.6 + smoothstep(0.95, 0.99, gs.r) * 0.3;
    float dk = (1. - smoothstep(0.03, 0.1, gs2.r)) * 0.45 + (1. - smoothstep(0.02, 0.07, gs.r)) * 0.25;
    alb = mix(alb, mix(alb, vec3(0.6, 0.58, 0.54), 0.6) * (0.8 + 0.3 * gs.g), min(lt, 1.) * 0.55);
    alb = mix(alb, alb * 0.6, min(dk, 1.) * 0.35);
    if (u[18].w > 0.5) {
      float vd = abs(dot(q, u[30].xy) - u[30].z + (textureLod(tN, q * 0.015 + 0.33, 0.).r - 0.5) * 2.2 + (textureLod(tN, q * 0.06 + 0.13, 0.).r - 0.5) * 0.25);
      float vm = (1. - smoothstep(u[30].w * 0.5, u[30].w, vd)) * (0.75 + 0.25 * gs2.r);
      alb = mix(alb, vec3(0.6, 0.59, 0.55) * (0.85 + 0.3 * gs.r), vm);
    }
    float pit = S0.z < 0. ? 1. : 0.;
    alb *= (1. - 0.15 * pit) * 0.62;
    // wet sand grains stuck to the flank it was pressed in by
    float hb0 = P.z - bedH(P.xy);
    // a tide line round it: dark and wet below, the crown pale and matt where the sun has begun to dry it
    float tdl = hb0 - (Tm * 0.9 + (m2 - 0.5) * 2.2 + (m3 - 0.5) * 1.0) + u[22].w * (textureLod(tN, qs * 0.03 + 0.83, 0.).a - 0.5) * 3.5;
    float dry = smoothstep(-0.35, 0.5, tdl);
    alb *= mix(0.4, 0.8, dry) * (1. - 0.22 * exp(-tdl * tdl / 0.08));
    alb = mix(alb, u[6].rgb * (0.8 + 0.4 * gs2.g), step(0.72 + 0.3 * smoothstep(0.3, 1.6, hb0), texture(tG, qs / 7. + vec2(0.8, P.z * 0.05)).r) * 0.8);
    n = normalize(n + vec3((gs.zw - 0.5) * 0.035 + (gs2.zw - 0.5) * 0.02, 0.));
    float ao = mix(0.65, 1., smoothstep(0., 3.5, hb0));
    // light bounced off the sunlit sand onto the flanks, so the edge has no dark outline
    vec3 bounce = u[6].rgb * (Ls * L.z + skyA) * 0.8 * (0.6 - 0.4 * n.z);
    vec3 diff = alb * (Ls * max(dot(n, L), 0.) * sh + skyA * (0.5 + 0.5 * n.z) * ao + bounce);
    // matte wet: the stone is damp all over, with a thin sheen only where water still sits on the upper faces
    float wetp = smoothstep(0.58, 0.84, textureLod(tN, q * 0.011 + 0.71 + u[28].w, 0.).a + 0.25 * smoothstep(0.8, 0.97, n.z) - 0.2 * gs3.g * step(0.9, gs3.r));
    wetp = mix(0.72 + 0.28 * wetp, 0.06 * wetp, dry);
    vec3 nf = normalize(n + vec3((gs2.zw - 0.5) * mix(0.1, 0.01, wetp) * (1. - pit), 0.));
    float F = fres(dot(nf, V));
    vec3 Rs = reflect(rd, nf);
    vec3 envS = mix(u[6].rgb * (Ls * 0.2 + skyA) * 0.8, sky(Rs), smoothstep(-0.05, 0.25, Rs.z));
    vec3 spec = F * envS * ao * mix(0.14, 0.75, wetp) + Ls * sh * F * ggx(nf, V, L, mix(0.45, 0.07, wetp)) * (1. - 0.8 * pit) * mix(0.55, 1., wetp);
    col = diff * (1. - F * mix(0.3, 1., wetp)) + spec;
  }
  o = vec4(col, tHit);
}`,G0=`#version 300 es
precision highp float; precision highp sampler2D;
layout(std140) uniform U { vec4 u[32]; };
uniform sampler2D tS;
in vec2 vUv; out vec4 o;
float coc(float t) { return clamp(u[20].y * abs(1. - u[20].x / t), 0., u[20].z); }
void main() {
  vec2 px = 1. / vec2(u[10].z);
  vec4 c0 = texture(tS, vUv);
  float k0 = coc(c0.a);
  vec3 acc = min(c0.rgb, vec3(4.)); float ws = 1.;
  float R = u[20].z;
  int nt = int(u[20].w);
  for (int i = 0; i < nt; i++) {
    float fi = float(i) + 0.5;
    float r = sqrt(fi / float(nt)) * R;
    float an = fi * 2.39996;
    vec4 s = textureLod(tS, vUv + vec2(cos(an), sin(an)) * r * px, 0.);
    float ks = coc(s.a);
    float kk = s.a > c0.a ? min(ks, k0 * 1.2 + 0.5) : ks;
    float w = smoothstep(r - 0.5, r + 1.0, kk) / max(kk * kk * 0.08 + 1., 1.);
    acc += min(s.rgb, vec3(4.)) * w; ws += w;
  }
  vec3 col = acc / ws * u[10].w;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  vec2 q = vUv - 0.5;
  col *= 1. - dot(q, q) * 0.22;
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  uint h = uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u + uint(u[10].y) * 26699u;
  h ^= h >> 13; h *= 0x5bd1e995u; h ^= h >> 15;
  col += (float(h & 1023u) / 1023. - 0.5) * 0.018;
  o = vec4(col, 1.);
}`;function st(t,e,h){const a=t.createProgram();for(const[l,r]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,h]]){const g=t.createShader(l);t.shaderSource(g,r),t.compileShader(g),t.attachShader(a,g),a["_"+l]=g}return a}function a0(t,e){for(const h in e)t.linkProgram(e[h].p);for(const h in e){const a=e[h];if(!t.getProgramParameter(a.p,t.LINK_STATUS))throw new Error("356 "+h+": "+t.getProgramInfoLog(a.p)+" "+t.getShaderInfoLog(a.p["_"+t.FRAGMENT_SHADER]));t.useProgram(a.p),a.u={};const l=t.getProgramParameter(a.p,t.ACTIVE_UNIFORMS);let r=0;for(let _=0;_<l;_++){const L=t.getActiveUniform(a.p,_),S=t.getUniformLocation(a.p,L.name);S&&(a.u[L.name]=S,L.type===t.SAMPLER_2D&&(t.uniform1i(S,r),a.u[L.name+"#"]=r++))}const g=t.getUniformBlockIndex(a.p,"U");g!==t.INVALID_INDEX&&t.uniformBlockBinding(a.p,g,0)}}function ut(t,e,h,a,l,r,g){const _=t.createTexture();t.bindTexture(t.TEXTURE_2D,_),t.texStorage2D(t.TEXTURE_2D,g||1,a,e,h),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,r||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,r||t.CLAMP_TO_EDGE);const L=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,L),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,_,0),{t:_,f:L,w:e,h}}function I0(t){if(t.__c356)return t.__c356;const e=!!t.getExtension("EXT_color_buffer_float"),h=e||!!t.getExtension("EXT_color_buffer_half_float"),a={grain:{p:st(t,nt,B0)},noise:{p:st(t,nt,T0)},bed:{p:st(t,nt,Jt)},stone:{p:st(t,nt,A0)},down:{p:st(t,nt,t0)},stamp:{p:st(t,nt,R0)},init:{p:st(t,nt,e0)},flux:{p:st(t,nt,_0)},state:{p:st(t,nt,P0)},scene:{p:st(t,nt,U0)},stsh:{p:st(t,nt,q0)},post:{p:st(t,nt,G0)}};a0(t,a);const l={P:a,floatOK:e,halfOK:h,vao:t.createVertexArray()};l.ub=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,l.ub),t.bufferData(t.UNIFORM_BUFFER,32*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(l.vao);const r=t.getExtension("EXT_texture_filter_anisotropic");return l.grain=ut(t,512,512,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,10),t.bindFramebuffer(t.FRAMEBUFFER,l.grain.f),t.viewport(0,0,512,512),t.useProgram(a.grain.p),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,l.grain.t),t.generateMipmap(t.TEXTURE_2D),r&&t.texParameterf(t.TEXTURE_2D,r.TEXTURE_MAX_ANISOTROPY_EXT,4),l.noise=ut(t,256,256,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,9),t.bindFramebuffer(t.FRAMEBUFFER,l.noise.f),t.viewport(0,0,256,256),t.useProgram(a.noise.p),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,l.noise.t),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.__c356=l,l}function Wt(t,e,h,a,l){if(!l)return e.P[h];const r=h+"|"+l;if(e.V=e.V||{},!e.V[r]){const g=l.split(" ").map(L=>"#define "+L+`
`).join(""),_={p:st(t,nt,a.replace(`#version 300 es
`,`#version 300 es
`+g).replace("FOOT_FN",D0))};t.flush(),a0(t,{v:_}),e.V[r]=_}return e.V[r]}function O0(t,e,h){const a=e.floatOK?t.RGBA32F:t.RGBA16F;return{SA:[ut(t,192,192,a,t.NEAREST),ut(t,192,192,a,t.NEAREST)],FL:ut(t,192,192,a,t.NEAREST),BS:ut(t,192,192,a,t.NEAREST),BED:ut(t,1024,1024,t.RGBA16F,t.LINEAR),ST:ut(t,192,192,t.RGBA16F,t.LINEAR),scene:ut(t,h,h,e.halfOK?t.RGBA16F:t.RGBA8,t.LINEAR),S:h}}function bt(t,e){const h=t.slice(2).padEnd(64,"0"),a=S=>parseInt(h.slice(S*8,S*8+8),16)>>>0;let l=(a(0)^Math.imul(e,2654435761)^Math.imul(a(4),2246822507))>>>0,r=(a(1)^Math.imul(a(5),3266489909))>>>0,g=(a(2)+e^Math.imul(a(6),668265263))>>>0,_=(a(3)^Math.imul(a(7),374761393))>>>0;const L=()=>{l>>>=0,r>>>=0,g>>>=0,_>>>=0;let S=l+r|0;return l=r^r>>>9,r=g+(g<<3)|0,g=g<<21|g>>>11,_=_+1|0,S=S+_|0,g=g+S|0,(S>>>0)/4294967296};for(let S=0;S<20;S++)L();return L}const pt=(t,e)=>{let h=0;for(const l of e)h+=l.w;let a=t()*h;for(const l of e)if(a-=l.w,a<0)return l;return e[e.length-1]},Z=512,n0=new Float32Array(1),C0=new Uint32Array(n0.buffer);function X0(t,e,h,a){const l=Z/540,r=new Float32Array(Z*Z),g=1.5,_=t()<.5?-1:1,L=Math.min(532,h+170+120*t()),S=h-220-140*t(),dt=[];for(let u=0;u<3;u++)dt.push([540*t(),540*t(),40+50*t()]);const wt=(u,p)=>{let y=.18+.82/(1+Math.exp(-_*(u-e-20*_)/55));for(const x of dt)y*=Math.min(1,Math.hypot(u-x[0],p-x[1])/x[2]);return y},xt=[[e-1.3*a,h+.15*a,.35,260],[e+1.3*a,h+.15*a,-.35,260]],ht=34+Math.floor(26*t()),P=[];for(let u=0;u<ht*4&&P.length<ht;u++){const p=6+528*t(),y=S+60+(L-S-60)*Math.sqrt(t());Math.hypot(p-e,(y-h)*.8)<a*1.7||Math.abs(p-e)<a*1.1&&y<h&&y>h-a*4||t()<wt(p,y)&&P.push([p,y,(t()-.5)*.5,0])}P.sort((u,p)=>p[1]-u[1]),xt.push(...P);const C=[],G=[],m=[],tt=6,V=Math.ceil(540/tt)+1,yt=[],ft=[],It=(u,p,y,x)=>{let b=-1,w=y*y;const J=Math.floor((u-y)/tt),k=Math.floor((u+y)/tt),I=Math.floor((p-y)/tt),N=Math.floor((p+y)/tt);for(let M=I;M<=N;M++)for(let q=J;q<=k;q++){const K=yt[M*V+q];if(K)for(const T of K){if(m[T]===x)continue;const X=C[T]-u,et=G[T]-p,ct=X*X+et*et;ct<w&&(w=ct,b=T)}}return b},Mt=[];for(let u=0;u<3;u++)Mt.push([6.283/(80+140*t()),6.283*t(),(t()-.5)*.03,.5+.5*t()]);const At=(u,p)=>{let y=0;for(const x of Mt)y+=x[3]*x[0]*Math.cos(u*x[0]+x[1]+p*x[2]);return y};for(const u of xt){const p=ft.length,y={s:C.length,n:0,par:-1,at:0,q0:u[3],add:[]};let x=u[0],b=u[1],w=u[2],J=0;for(let k=0,I=0;k<900;k+=g,I++){t()<.12&&(J=(t()-.5)*.5),J*=.85;let N=Math.atan(6*At(x,b))*.9+J+.25*Math.sin(k*.021+u[0]);if(!(I&1)||y.near){const X=It(x-Math.sin(w)*9,b-Math.cos(w)*9,13,p);if(y.near=X>=0,X>=0){const et=Math.atan2(-(C[X]-x),-(G[X]-b));if(Math.abs(et-w)<1.3&&(N=w+Math.max(-.6,Math.min(.6,et-w))),Math.hypot(C[X]-x,G[X]-b)<2&&k>4){y.par=m[X],y.at=X;break}}}const M=x-e,q=b-h,K=Math.hypot(M,q);if(K<a*1.45&&(N-=Math.sign(M||1)*.6*(1.45-K/a)),N=Math.max(-1,Math.min(1,N)),w+=(N-w)*.35,x-=Math.sin(w)*g,b-=Math.cos(w)*g,x<1||x>539||b<1||b<S+25*Math.sin(x*.013+u[0]))break;C.push(x),G.push(b),m.push(p),y.n++;const T=Math.floor(b/tt)*V+Math.floor(x/tt);(yt[T]||(yt[T]=[])).push(C.length-1)}ft.push(y)}const Q=new Float32Array(C.length);for(let u=ft.length-1;u>=0;u--){const p=ft[u];for(let x=0;x<p.n;x++)Q[p.s+x]=p.q0+x*g;for(const[x,b]of p.add)for(let w=x-p.s;w<p.n;w++)Q[p.s+w]+=b;const y=p.n?Q[p.s+p.n-1]:0;p.par>=0&&ft[p.par].add.push([p.at,y])}for(const u of ft){const p=6.283*t(),y=6.283*t();let x=-1;for(let b=0;b<u.n;){const w=u.s+b,J=.88+.14*Math.sin(b*.1+p)+.07*Math.sin(b*.34+y),k=Math.min(9,2.4+.3*Math.sqrt(Q[w]))*J,I=(.08+.12*k/J)*Math.min(1,(b+1)/9,u.par<0?(u.n-b)/16:1),N=x>=0?C[x]-C[w]:0,M=x>=0?G[x]-G[w]:0,q=1/Math.max(N*N+M*M,1e-6),K=1/(k*k),T=k*1.3,X=Math.max(0,Math.floor((Math.min(C[w],C[w]+N)-T)*l)),et=Math.min(Z-1,Math.ceil((Math.max(C[w],C[w]+N)+T)*l)),ct=Math.max(0,Math.floor((Math.min(G[w],G[w]+M)-T)*l)),Rt=Math.min(Z-1,Math.ceil((Math.max(G[w],G[w]+M)+T)*l));for(let vt=ct;vt<=Rt;vt++)for(let kt=X;kt<=et;kt++){let ot=(kt+.5)/l-C[w],St=(vt+.5)/l-G[w];const it=Math.min(1,Math.max(0,(ot*N+St*M)*q));ot-=it*N,St-=it*M;const lt=(ot*ot+St*St)*K;if(lt>=1.69)continue;const gt=Math.sqrt(lt),_t=gt<.2?0:(gt-.2)*.9091,Ot=-I*(1-_t*_t*(3-2*_t));Ot<r[vt*Z+kt]&&(r[vt*Z+kt]=Ot)}if(x=w,b===u.n-1)break;b=Math.min(u.n-1,b+Math.max(1,Math.round(k/(3*g))))}}for(const u of ft){if(u.par>=0||u.n<30)continue;const p=u.s+u.n-1,y=Math.min(9,2.4+.3*Math.sqrt(Q[p])),x=C[p],b=G[p]-2*y,w=5*y+6,J=3.5*y+4,k=.25*(.08+.12*y),I=Math.max(0,Math.floor((x-J*1.5)*l)),N=Math.min(Z-1,Math.ceil((x+J*1.5)*l)),M=Math.max(0,Math.floor((b-w*1.5)*l)),q=Math.min(Z-1,Math.ceil((b+w*1.5)*l));for(let K=M;K<=q;K++)for(let T=I;T<=N;T++){const X=(T+.5)/l-x,et=(K+.5)/l-b,ct=X*X/(J*J)+et*et/(w*w);ct<2.25&&(r[K*Z+T]+=k*Math.exp(-ct)*(1-ct/2.25)*(1-ct/2.25))}}const U=new Uint16Array(Z*Z);for(let u=0;u<U.length;u++){n0[0]=r[u];const p=C0[0],y=(p>>>23&255)-112;U[u]=y<=0?0:p>>>16&32768|y<<10|(p&8388607)>>>13}return U}const s0=[{n:"Golden Quartz",w:50,dry:[.58,.47,.33],wet:[.17,.122,.074],halo:.5},{n:"Grey Volcanic",w:30,dry:[.325,.335,.35],wet:[.052,.058,.063],halo:.45},{n:"White Coral",w:20,dry:[.84,.81,.73],wet:[.25,.235,.2],halo:.7}],i0=[{n:"Damp",w:30,h:.025},{n:"Glassy",w:45,h:.07},{n:"Brimming",w:25,h:.15}],r0=[{n:"Golden Hour",w:45,el:13,col:[1,.76,.52],k:3.1},{n:"Morning",w:35,el:21,col:[1,.92,.8],k:2.9},{n:"Low Winter Sun",w:20,el:8,col:[1,.68,.46],k:3}],c0=[{n:"Clear",w:58,zen:[.3,.44,.72],hor:[1,.95,.88]},{n:"Hazy",w:30,zen:[.56,.6,.68],hor:[1.08,1.03,.96]},{n:"Evening Pink",w:12,zen:[.3,.33,.5],hor:[1.3,.84,.66],amb:.32}],l0=[{n:"Lazy",w:30,every:24,reach:[.6,1.2]},{n:"Regular",w:45,every:15,reach:[.45,1.1]},{n:"Restless",w:25,every:8.5,reach:[.3,.85]}],f0=[{n:"Smooth",w:60,rip:0,holes:.022},{n:"Pitted",w:28,rip:0,holes:.12},{n:"Rippled",w:12,rip:2.6,holes:.03}],h0=[{n:"Greywacke",w:40,col:[.28,.27,.25],vein:0},{n:"Basalt",w:28,col:[.14,.14,.15],vein:0},{n:"Sandstone",w:17,col:[.42,.35,.27],vein:0},{n:"Quartz Veined",w:15,col:[.24,.25,.25],vein:1}],u0=[{n:"Bare",w:20,sh:0,casts:0},{n:"A Few Shells",w:52,sh:2,casts:0},{n:"Mussel Shards",w:14,sh:3,casts:0,mussel:1},{n:"Lugworm Casts",w:14,sh:1,casts:1}];$t.add({num:356,name:"Dry Ring",fam:"Worlds",recipe:"Wet beach sand in low sun, with a flat stone pressed into it. Push and the sand around it sucks the water down and goes pale in a growing ring, then glazes back over when you let up. The sand, the sun and the surface change every mint. Hold to press the stone in (it hops to your finger), drag to plough it along, let go to watch the ring glaze over, or tap to drop a pebble.",interactive:"Hold to press the stone in (it hops to your finger), drag to plough it along, let go to take your weight off and watch the ring glaze over; tap to drop a pebble.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,h=I0(e),a=O0(e,h,t.size),l=h.P,r=bt(t.hash,356);let g=pt(r,s0),_=pt(r,i0),L=pt(r,r0),S=pt(r,c0),dt=pt(r,l0),wt=pt(r,f0),xt=pt(r,h0),ht=pt(r,u0);t.home&&(g=s0[0],_=i0[1],L=r0[0],S=c0[0],dt=l0[1],wt=f0[0],xt=h0[0],ht=u0[1]),t.trait("Sand",g.n),t.trait("Film",_.n),t.trait("Sun",L.n),t.trait("Sky",S.n);const P=bt(t.hash,385),C=!t.home&&P()<.2,G=new Float32Array(32*4),m=(s,f,n,i,c)=>{G[s*4]=f,G[s*4+1]=n,G[s*4+2]=i,G[s*4+3]=c},tt=()=>{e.bindBuffer(e.UNIFORM_BUFFER,h.ub),e.bufferSubData(e.UNIFORM_BUFFER,0,G),e.bindBufferBase(e.UNIFORM_BUFFER,0,h.ub)},V=(s,f,n,i)=>{e.bindFramebuffer(e.FRAMEBUFFER,f?f.f:null),i?e.viewport(i[0],i[1],i[2],i[3]):e.viewport(0,0,f?f.w:t.size,f?f.h:t.size),e.useProgram(s.p),e.bindVertexArray(h.vao);for(let c=0;c<n.length;c+=2){const v=s.u[n[c]+"#"];v!==void 0&&(e.activeTexture(e.TEXTURE0+v),e.bindTexture(e.TEXTURE_2D,n[c+1].t))}e.drawArrays(e.TRIANGLES,0,3)};e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0);const yt=bt(t.hash,369),ft=yt(),It=yt()<.5?-1:1,Mt=yt(),At=yt(),Q=t.home||ft<.3?"Facing the sea":ft<.55?"Along the shore":ft<.7?"Looking down":"Close on the rim",U=bt(t.hash,409),u=U(),p=U(),y=!t.home&&!(g.n==="Grey Volcanic"&&Q==="Looking down");let x=y&&wt.n==="Smooth"&&u<.41,b=y&&wt.n==="Smooth"&&u>=.41&&u<.62,w=y&&!C&&!x&&(ht.n==="Bare"||ht.n==="A Few Shells")&&Q!=="Close on the rim"&&p<.47&&!1;const J=Q==="Close on the rim";let k=[0,-Math.cos(qt),-Math.sin(qt)],I=[0,-Math.sin(qt),Math.cos(qt)],N=[1,0,0],M=N0;const q=(s,f)=>{const n=(s-.5)*2*Dt,i=(.5-f)*2*Dt,c=[k[0]+n*N[0]+i*I[0],k[1]+n*N[1]+i*I[1],k[2]+i*I[2]],v=-M[2]/c[2];return[M[0]+c[0]*v,M[1]+c[1]*v]};if(Q==="Close on the rim"){const s=(47+8*Mt)*Math.PI/180,f=It*(8+30*At)*Math.PI/180,n=Math.cos(f),i=Math.sin(f),c=F=>[F[0]*n-F[1]*i,F[0]*i+F[1]*n,F[2]];k=c([0,-Math.cos(s),-Math.sin(s)]),I=c([0,-Math.sin(s),Math.cos(s)]),N=c([1,0,0]);const v=118+30*Mt,E=v/-k[2];M=[540*.5-k[0]*E,540*.52-k[1]*E,v]}else if(Q!=="Facing the sea"){const s=(Q==="Looking down"?58+8*Mt:40+4*Mt)*Math.PI/180,f=It*(Q==="Looking down"?6+12*At:70+20*At)*Math.PI/180,n=Math.cos(f),i=Math.sin(f),c=v=>[v[0]*n-v[1]*i,v[0]*i+v[1]*n,v[2]];k=c([0,-Math.cos(s),-Math.sin(s)]),I=c([0,-Math.sin(s),Math.cos(s)]),N=c([1,0,0]);for(let v=320;v>90;v-=4){const E=v/-k[2];M=[540*.5-k[0]*E,540*.5-k[1]*E,v];let F=1e9,d=1e9,z=-1e9,D=-1e9;for(const rt of[[0,0],[1,0],[0,1],[1,1]]){const at=q(rt[0],rt[1]);F=Math.min(F,at[0]),d=Math.min(d,at[1]),z=Math.max(z,at[0]),D=Math.max(D,at[1])}if(M=[M[0]+540*.5-(F+z)*.5,M[1]+540*.5-(d+D)*.5,v],z-F<512&&D-d<512)break}}const K=s=>[Math.min(490,Math.max(50,s[0])),Math.min(500,Math.max(60,s[1]))];m(0,M[0],M[1],M[2],Dt);const T=g.n==="Grey Volcanic";m(22,k[0],k[1],k[2],T?1:0),m(23,I[0],I[1],I[2],0),m(24,N[0],N[1],N[2],0);const X=r(),et=L.el*Math.PI/180,ct=t.home?.38:(r()<.5?-1:1)*(.12+.75*X*X);m(1,Math.cos(et)*Math.sin(ct),-Math.cos(et)*Math.cos(ct),Math.sin(et),T?1:0),m(2,L.col[0]*L.k,L.col[1]*L.k,L.col[2]*L.k,0);const Rt=T?L.n==="Morning"?[1.1,1,.88]:[1.015,1,.98]:[1,1,1],vt=T?L.n==="Morning"?[1.05,1,.92]:[1.01,1,.985]:[1,1,1];m(3,S.zen[0]*Rt[0],S.zen[1]*Rt[1],S.zen[2]*Rt[2],S.amb||0),m(4,S.hor[0]*vt[0],S.hor[1]*vt[1],S.hor[2]*vt[2],0);const kt=.025+.015*r(),ot=T?[L.n==="Morning"?1.13:L.n==="Low Winter Sun"?.97:1,L.n==="Morning"?1:L.n==="Low Winter Sun"?1.01:1,L.n==="Morning"?.84:1]:[1,1,1];T&&S.n==="Evening Pink"&&(ot[0]*=.95,ot[1]*=1.06,ot[2]*=.95),m(5,g.dry[0]*ot[0],g.dry[1]*ot[1],g.dry[2]*ot[2],kt),m(6,g.wet[0]*ot[0],g.wet[1]*ot[1],g.wet[2]*ot[2],g.halo);const St=g.n==="White Coral"?.68:g.n==="Grey Volcanic"?.92:.95;m(19,Gt,6,5,10);const it=t.home?37:27+12*r(),lt=it*(t.home?.66:.6+.3*r()),gt=t.home?10.5:8.5+4*r(),_t=r(),Ot=1.85+.35*r(),Zt=.15*gt,d0=r()*6.283;m(21,50,it,lt,gt);const x0=xt.vein?1:r()<.55?.6:0,Qt=T?[.29,.31,.36]:[1,1,1];m(18,xt.col[0]*Qt[0],xt.col[1]*Qt[1],xt.col[2]*Qt[2],x0);const Lt=r(),Kt=r(),j=K(Q==="Close on the rim"?q(Lt<.5?.33+.08*Lt:.63+.08*Lt,.58+.08*Kt):Q==="Facing the sea"?q(t.home?.36:.24+.5*Lt,t.home?.6:.5+.17*Kt):q(Lt<.5?.27+.16*Lt:.57+.16*Lt,.5+.17*Kt)),Ct=(s,f)=>{const n=[s-M[0],f-M[1],-M[2]],i=n[0]*k[0]+n[1]*k[1]+n[2]*k[2];return[.5+(n[0]*N[0]+n[1]*N[1]+n[2]*N[2])/i/(2*Dt),.5-(n[0]*I[0]+n[1]*I[1]+n[2]*I[2])/i/(2*Dt)]};if(x){const s=8+16*U(),f=.006+.007*U(),n=U()*6.283,i=30+22*U(),c=6.2+1.4*U(),v=.3+.14*U(),E=U(),F=U(),d=A=>s*(Math.sin(A*f+n)+.45*Math.sin(A*f*2.3+n*1.7)),z=j[1]-Math.max(it,lt)-i-d(j[0]),D=[];for(let A=0;A<20;A++)for(let R=0;R<20;R++)D.push(q((A+.5)/20,(R+.5)/20));let rt=0,at=0;for(let A=50;A<=360&&at<v;A+=10)rt=A,at=D.filter(R=>R[1]<z+d(R[0])&&R[1]>z+d(R[0])-A).length/D.length;if(at<.2)x=!1;else{const A=j[0]+(E<.5?-1:1)*(55+90*F),R=A+(E<.5?-1:1)*(95+80*E);m(13,z,rt,c,n),m(14,s,f,A,R)}}if(w){const s=q(0,.5),f=q(1,.5),n=Math.min(195,Math.max(145,.44*Math.hypot(f[0]-s[0],f[1]-s[1]))),i=U()<.5?1:-1,c=330+80*U(),v=U(),E=3.8+.8*U(),F=(z,D)=>z[0]>D&&z[0]<1-D&&z[1]>D&&z[1]<1-D;let d=null;for(let z=0;z<48&&!(d&&d.two);z++){const D=.18+.64*U(),rt=.25+.55*U(),at=U()*6.283,A=U()<.5?1:-1,R=q(D,rt),H=[Math.cos(at),Math.sin(at)],Nt=[H[1],-H[0]],Ut=[R[0]-H[0]*n/2,R[1]-H[1]*n/2],Bt=[R[0]+H[0]*n/2,R[1]+H[1]*n/2];if(!F(Ct(Ut[0],Ut[1]),.05)||!F(Ct(Bt[0],Bt[1]),.05))continue;const jt=[j[0]-R[0],j[1]-R[1]];if(Math.hypot((jt[0]*H[0]+jt[1]*H[1])/(.56*n),(jt[0]*Nt[0]+jt[1]*Nt[1])/(.3*n))<1.85+.6*Math.max(it,lt)/(.3*n))continue;const Tt=[R[0]+A*c*H[0]-Nt[0]*i*.4*n,R[1]+A*c*H[1]-Nt[1]*i*.4*n],S0=[Tt[0]-A*H[0]*n/2,Tt[1]-A*H[1]*n/2],E0=[Tt[0]+A*H[0]*n/2,Tt[1]+A*H[1]*n/2],W0=Ct(S0[0],S0[1]),F0=F(W0,.03)&&!F(Ct(E0[0],E0[1]),0);(!d||F0)&&(d={heel:Ut,dir:H,two:F0,h2:[Tt[0]-H[0]*n/2,Tt[1]-H[1]*n/2]})}d?(m(15,d.heel[0],d.heel[1],d.dir[0],d.dir[1]),m(16,n,i,E,v),m(12,d.h2[0],d.h2[1],0,0)):w=!1}t.trait("Swash",dt.n),t.trait("Surface",x?"Runnel":b?"Rill-marked":wt.n),t.trait("Stone",xt.n),t.trait("Finds",C?"Gravel Strand":w?"A Footprint":ht.n),t.trait("View",Q),G[23*4+3]=x?1:0,G[24*4+3]=T?1.8:1;const o={x:j[0],y:j[1],a:r()*6.283,lift:0,sink:.4,L:0,Lt:.95,tx:j[0],ty:j[1],want:"press",vx:0,vy:0,yaw:0},H0=bt(t.hash,397),V0=w?0:ht.sh;for(let s=0;s<3;s++){let f=[0,0];for(let i=0;i<12&&(f=q(.1+.8*r(),.45+.47*r()),!(Math.hypot(f[0]-j[0],f[1]-j[1])>95));i++);const n=ht.mussel?1:0;m(26+s,f[0],f[1],n?7+6*r():8+6*r(),r()*6.283),m(29+s,n?H0()<.45?.92:.97:r()*.9,n||r()<.7?1:0,-(1+1.3*r()),n?1:r()<.75?0:1)}m(17,wt.rip,ht.casts,_.h,V0),m(25,r(),r(),wt.holes,.55),m(7,j[0],j[1],.5*(it+lt),0),tt();let Pt=null;b&&(Pt=e.createTexture(),e.bindTexture(e.TEXTURE_2D,Pt),e.texStorage2D(e.TEXTURE_2D,1,e.R16F,Z,Z),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,2),e.texSubImage2D(e.TEXTURE_2D,0,0,0,Z,Z,e.RED,e.HALF_FLOAT,X0(bt(t.hash,423),j[0],j[1],.5*(it+lt)))),V(Wt(e,h,"bed",Jt,[x&&"RUNNEL",w&&"FOOT",b&&"RILL"].filter(Boolean).join(" ")),a.BED,["tN",h.noise,"tR",{t:Pt}]),Pt&&e.deleteTexture(Pt),m(28,it,lt,gt,_t),m(29,Math.cos(d0),Math.sin(d0),gt*.03,Ot),tt(),V(l.stone,a.ST,["tN",h.noise]);const v0=r()*6.283;m(30,Math.cos(v0),Math.sin(v0),(r()-.5)*22,x0===1?1.4+2.2*r():.3+.35*r()),m(31,540*(.2+.12*r()),10+8*r(),0,0),tt();const Xt=b?Wt(e,h,"down",t0,"RILL"):l.down;V(Xt,a.BS,["tBed",a.BED]),V(Wt(e,h,"init",e0,w?"FOOT":""),a.SA[0],["tN",h.noise,"tBS",a.BS]);let Et=0;const m0=()=>{const s=Math.cos(o.a),f=Math.sin(o.a),n=1024/540,i=Math.max(0,Math.floor((o.x-50)*n)),c=Math.max(0,Math.floor((o.y-50)*n)),v=Math.min(1024,Math.ceil((o.x+50)*n)),E=Math.min(1024,Math.ceil((o.y+50)*n));v<=i||E<=c||(e.useProgram(l.stamp.p),e.uniform4f(l.stamp.u.uA,o.x,o.y,s,f),e.uniform4f(l.stamp.u.uB,o.lift-o.sink-Zt,0,1,0),e.enable(e.BLEND),e.blendEquationSeparate(e.FUNC_ADD,e.MIN),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ONE),e.colorMask(!1,!1,!1,!0),V(l.stamp,a.BED,["tStone",a.ST,"tN",h.noise,"tBS",a.BS],[i,c,v-i,E-c]),e.uniform4f(l.stamp.u.uB,0,2,.13*(o.sink+Zt),0),e.blendEquationSeparate(e.FUNC_ADD,e.MAX),V(l.stamp,a.BED,["tStone",a.ST,"tN",h.noise,"tBS",a.BS],[i,c,v-i,E-c]),e.colorMask(!0,!0,!0,!0),e.disable(e.BLEND))},p0=s=>{const f=1.8962962962962964,n=s.r*1.6,i=Math.max(0,Math.floor((s.x-n)*f)),c=Math.max(0,Math.floor((s.y-n)*f)),v=Math.min(1024,Math.ceil((s.x+n)*f)),E=Math.min(1024,Math.ceil((s.y+n)*f));e.useProgram(l.stamp.p),e.uniform4f(l.stamp.u.uA,s.x,s.y,s.r,s.v),e.uniform4f(l.stamp.u.uB,s.b===void 0?-1.5:s.b,1,s.asp,s.rot),e.enable(e.BLEND),e.blendEquationSeparate(e.FUNC_ADD,e.MAX),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ONE),V(l.stamp,a.BED,["tStone",a.ST,"tN",h.noise,"tBS",a.BS],[i,c,v-i,E-c]),e.disable(e.BLEND)};if(C){const s=P()<.3&&!x?-1:1,f=Math.min(480,Math.max(70,j[1]+s*(80+30*P()))),n=12+18*P(),i=.006+.008*P(),c=P()*6.283,v=14+10*P(),E=260+Math.floor(90*P()),F=60+420*P(),d=[];for(let z=0;z<E;z++){const D=10+520*P(),rt=(P()+P()+P()-1.5)*1.4,at=Math.exp(-Math.pow((D-F)/110,2)),A=f+n*Math.sin(D*i+c)+rt*v*(1+.6*Math.sin(D*.021+c*2))*(.6+.6*at),R=1.2+(1.2+8.5*P()**1.6)*(.25+.75*at),H=P(),Nt=.66+.3*P(),Ut=P()*6.283;Math.hypot((D-j[0])/(it+30),(A-j[1])/(lt+30))<1||d.some(Bt=>Math.hypot(Bt[0]-D,Bt[1]-A)<(Bt[2]+R)*.95)||(d.push([D,A,R]),p0({x:D,y:A,r:R,v:H,asp:Nt,rot:Ut,b:10-.3*R*.35-.2}))}V(Xt,a.BS,["tBed",a.BED])}const zt=[],O=bt(t.hash,363);let W=0,w0=0,Ht=0,Y=null,y0=0,g0=0;const $={t:0,dur:7.5+4*O(),ease:0};let B=null,b0=.9+1.3*O(),M0=!0;const Vt=[],Ft={x:-1e3,y:-1e3,sink:0},Yt=()=>{const s=o.lift-o.sink-Zt;m(7,o.x,o.y,Math.cos(o.a),Math.sin(o.a)),m(8,s,gt+1,o.L,1);const f=Math.hypot(o.vx,o.vy);m(9,o.vx/(f+40),o.vy/(f+40),10,.1*(1+Math.min(f/90,.9))),m(10,W,w0,t.size,St);for(let i=0;i<4;i++){const c=zt[i];c?m(13+i,c.x,c.y,c.s*Math.exp(-(W-c.t)/.32),c.r):m(13+i,-999,-999,0,1)}if(B){const i=W-B.t0,c=B.v0/B.a,v=Math.min(i,c),E=B.y0+B.v0*v-.5*B.a*v*v;m(11,E,i<c?1:0,Math.max(0,Math.min(1,1-(i-c)/.5)),B.seed),m(12,B.hs,26,i<c?1:-1,.9)}else m(11,-999,0,0,0),m(12,0,26,-1,0);const n=Math.hypot(o.x-M[0],o.y-M[1],M[2]);J?m(20,n,8*t.size/1e3,3.5*t.size/1e3,12):m(20,n,0,0,0)},k0=()=>{V(l.flux,a.FL,["tS",a.SA[Et],"tBS",a.BS]),V(l.state,a.SA[1-Et],["tS",a.SA[Et],"tF",a.FL,"tStone",a.ST,"tN",h.noise,"tBS",a.BS]),Et=1-Et},L0=()=>{V(l.scene,a.scene,["tBed",a.BED,"tSt",a.SA[Et],"tStone",a.ST,"tN",h.noise,"tG",h.grain]),V(l.stsh,a.scene,["tBed",a.BED,"tStone",a.ST,"tN",h.noise,"tG",h.grain]),e.flush(),V(l.post,null,["tS",a.scene])},j0=s=>{const f=o.x,n=o.y;if(o.want==="press"){if(o.lift>0)o.lift=Math.max(0,o.lift-Math.max(o.lift*7,45)*s),o.lift===0&&(t.sound.hit("kick",.16),t.sound.hit("noise",.22,{cutoff:1300,dur:.16}));else{const i=o.Lt>o.L,c=(o.Lt-o.L)*(1-Math.exp(-s*(i?2.2:3.2)));o.L+=c,c>.003&&W-y0>.05&&O()<c*30&&(t.sound.hit("click",.12+.25*O()),y0=W);const v=o.tx-o.x,E=o.ty-o.y,F=Math.hypot(v,E);if(F>1.5){const d=Math.min(F*6,170);o.x+=v/F*d*s,o.y+=E/F*d*s,o.a+=o.yaw*d*s*.002,W-g0>.08&&(t.sound.hit("noise",Math.min(.32,d/500),{cutoff:1700,dur:.1}),g0=W)}}o.lift===0&&(o.sink=Math.max(o.sink,.3+1.5*o.L))}else if(!o.toss)o.L*=Math.exp(-s*14),o.L<.25&&(o.toss={x0:o.x,y0:o.y,a0:o.a,t:0,T:.2+Math.min(Math.hypot(o.tx-o.x,o.ty-o.y),400)/1100},t.sound.hit("noise",.12,{cutoff:420,dur:.18}));else{const i=o.toss;i.t+=s;const c=Math.min(i.t/i.T,1),v=c*c*(3-2*c),E=Math.hypot(o.tx-i.x0,o.ty-i.y0);o.x=i.x0+(o.tx-i.x0)*v,o.y=i.y0+(o.ty-i.y0)*v,o.a=i.a0+o.yaw*.5*v,o.lift=4*Math.min(2.5+E*.045,11)*c*(1-c),o.sink=.35,c>=1&&(o.lift=0,o.toss=null,o.want="press",o.L=.45,zt.unshift({x:o.x,y:o.y,s:.16,r:it*1.05,t:W}),zt.length>4&&zt.pop(),t.sound.hit("kick",.22),t.sound.hit("noise",.26,{cutoff:1100,dur:.18}))}o.vx=s>0?(o.x-f)/s:0,o.vy=s>0?(o.y-n)/s:0,(o.want!=="press"||o.lift>0)&&(o.vx=0,o.vy=0)},z0=(s,f)=>{const n=q(s,f);if(n[0]<8||n[0]>532||n[1]<8||n[1]>532)return;const i=[n[0]-o.x,n[1]-o.y];if(o.lift<3&&Math.hypot(i[0]/it,i[1]/lt)<1.05){t.sound.hit("click",.5);return}Vt.push({x:n[0],y:n[1],r:3.5+3.5*O(),v:O(),asp:.68+.3*O(),rot:O()*6.283,t:W+.11})};o.L=0,o.sink=.4;for(let s=0;s<100;s++)o.L+=(.95-o.L)*(1-Math.exp(-Gt*2.6)),o.sink=Math.max(o.sink,.3+1.5*o.L),(s%4===0||s===99)&&(Yt(),tt(),m0(),V(Xt,a.BS,["tBed",a.BED])),k0();return Yt(),tt(),L0(),(s,f)=>{f=Math.min(Math.max(f||0,0),.25),W+=f,w0++;const n=t.input,i=n.taps();let c=0;for(!Y&&i.length&&(Y={x:i[0].x,y:i[0].y,t:0,mode:"tap"},c=1);c<i.length;c++)z0(i[c].x,i[c].y);if(!Y&&n.down&&(Y={x:n.x,y:n.y,t:0,mode:"tap"}),Y)if(n.down){if(Y.t+=f,Y.mode==="tap"&&(Y.t>.2||Math.hypot(n.x-Y.x,n.y-Y.y)>.03)){Y.mode="stone";const d=K(q(n.x,n.y));o.tx=d[0],o.ty=d[1],o.Lt=1,o.yaw=O()-.5,o.want=Math.hypot(d[0]-o.x,d[1]-o.y)>30||o.toss?"move":"press"}if(Y.mode==="stone"){const d=K(q(n.x,n.y));o.tx=d[0],o.ty=d[1],o.Lt=1}}else Y.mode==="tap"?z0(Y.x,Y.y):(o.want==="press"&&(o.Lt=.12),$.t=0,$.dur=5+5*O(),$.ease=0),Y=null;else if($.t+=f,o.want==="press"){o.tx=o.x,o.ty=o.y;let d=!1;if(B){const z=W-B.t0,D=B.v0/B.a,rt=Math.min(z,D);d=B.y0+B.v0*rt-.5*B.a*rt*rt>o.y-lt*.6&&z<D+1.4}d?(o.Lt=.1,$.t=0,$.dur=2.2+1.6*O(),$.ease=0):$.t>$.dur&&($.ease===0&&o.L>.4?($.ease=1,o.Lt=.04+.1*O(),$.t=0,$.dur=1.1+1.2*O()):($.ease=0,o.Lt=.82+.18*O(),$.t=0,$.dur=6+9*O()))}j0(f);let v=!1;for(let d=Vt.length-1;d>=0;d--){const z=Vt[d];W<z.t||(Vt.splice(d,1),p0(z),zt.unshift({x:z.x,y:z.y,s:.05,r:z.r*1.15,t:W}),zt.length>4&&zt.pop(),t.sound.hit("click",.55),t.sound.hit("noise",.18,{cutoff:2600,dur:.06}),v=!0)}if(!B&&W>=b0){const d=M0?540*(.26+.12*O()):540*(dt.reach[0]+(dt.reach[1]-dt.reach[0])*O()),z=430;M0=!1,B={t0:W,a:z,v0:Math.sqrt(2*z*(d+25)),y0:-25,hs:1.6+1.4*O(),seed:O()*6.283,fizz:!1},t.sound.hit("noise",.34,{cutoff:800,dur:2.2})}if(B){const d=W-B.t0;!B.fizz&&d>B.v0/B.a&&(B.fizz=!0,t.sound.hit("noise",.16,{cutoff:3400,dur:1.6})),d>B.v0/B.a+4&&(B=null,b0=W+dt.every*(.65+.7*O()))}Yt(),tt();let E=v;o.lift===0&&o.L>.02&&(o.sink>Ft.sink+.02||Math.hypot(o.x-Ft.x,o.y-Ft.y)>.3)&&(m0(),E=!0,Ft.sink=o.sink,Ft.x=o.x,Ft.y=o.y),E&&V(Xt,a.BS,["tBed",a.BED]),Ht+=f;let F=0;for(;Ht>=Gt&&F<6;)k0(),Ht-=Gt,F++;F===6&&(Ht=0),L0()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
