// Watercolours: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/046.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(St){St&&function(){"use strict";const Pt=new WeakMap,U=256,W=192,f0=1/40,S0=36,te=12,P0=Math.PI*2,p0=(a,e,v)=>a<e?e:a>v?v:a,r0=(a,e,v)=>a+(e-a)*v,Ao=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,et=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform vec4 uC[22];
uniform vec4 uPa[${S0}], uPb[${S0}], uPc[${S0}], uPd[${S0}];
uniform vec4 uPan[6];
uniform int uNP, uIt, uMode;
#define CAM uC[0].xyz
#define TANH uC[0].w
#define LKIND uC[1].w
#define DESK uC[2].w
#define WALLZ uC[11].y
float gLod = 0.0;
vec4 T(vec2 p) { return textureLod(uN, p, gLod); }
// set by each material before shadeLit: gBn 1 = takes the sheet's bounce and the window's sky (0: the sheet and the board's top);
// gMir = strength of the mirror term (the room program only), gMirR = its blur
float gBn = 1.0, gMir = 0.0, gMirR = 1.0;
#ifndef GLASSP
uniform sampler2D uE;
// the edge passes (uMode 2) redraw only pixels on an edge of the first bake
bool flatPx() {
  ivec2 c = ivec2(gl_FragCoord.xy), mx = ivec2(int(uC[17].w) - 1); vec3 a = texelFetch(uE, c, 0).rgb;
  vec3 m = max(max(abs(texelFetch(uE, min(c + ivec2(1, 0), mx), 0).rgb - a), abs(texelFetch(uE, max(c - ivec2(1, 0), ivec2(0)), 0).rgb - a)),
               max(abs(texelFetch(uE, min(c + ivec2(0, 1), mx), 0).rgb - a), abs(texelFetch(uE, max(c - ivec2(0, 1), ivec2(0)), 0).rgb - a)));
  return max(m.r, max(m.g, m.b)) < 0.05;
}
#endif
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float sdBox(vec3 p, vec3 h, float r) { vec3 q = abs(p) - h + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdCyl(vec3 p, vec2 c, float y0, float y1, float r, float rr) { vec2 d = vec2(length(p.xz - c) - r + rr, abs(p.y - (y0 + y1) * 0.5) - (y1 - y0) * 0.5 + rr); return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - rr; }
float sdRCone(vec3 p, vec3 a, vec3 b, float r1, float r2) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - mix(r1, r2, h); }
float prim(vec3 p, int i) {
  vec4 A = uPa[i], B = uPb[i], D = uPd[i];
  if (A.w < 0.5) { vec3 q = p - A.xyz; q.xz = rot(-D.x) * q.xz; return sdBox(q, B.xyz, D.y); }
  if (A.w < 1.5) { float d = sdCyl(p, A.xz, A.y, B.y, B.x, D.y); if (B.z > 0.0) d = max(d, -sdCyl(p, A.xz, A.y + 0.6, B.y + 2.0, B.x - B.z, 0.0)); return d; }
  return sdRCone(p, A.xyz, B.xyz, B.w, D.z);
}
float sceneD(vec3 p) { float d = 1e9; for (int i = 0; i < uNP; i++) d = min(d, prim(p, i)); return d; }
// analytic ray hits for what the camera sees (the SDF is only used for shadows and occlusion)
float iBox(vec3 ro, vec3 rd, int i, out vec3 n) {
  vec4 A = uPa[i], B = uPb[i], D = uPd[i]; float t = 1e9;
  mat2 m = rot(-D.x); vec3 o = ro - A.xyz; o.xz = m * o.xz; vec3 d = rd; d.xz = m * d.xz;
  vec3 iv = 1.0 / d, k = abs(iv) * B.xyz, q = iv * o, t1 = -q - k, t2 = -q + k;
  float tn = max(max(t1.x, t1.y), t1.z), tf = min(min(t2.x, t2.y), t2.z);
  if (tn < tf && tn > 0.0) { t = tn; vec3 nl = -sign(d) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz); nl.xz = rot(D.x) * nl.xz; n = nl; }
  return t;
}
#ifndef GLASSP
float iPrim(vec3 ro, vec3 rd, int i, out vec3 n) {
  vec4 A = uPa[i], B = uPb[i], D = uPd[i]; float t = 1e9;
  if (A.w < 0.5) t = iBox(ro, rd, i, n);
  else if (A.w < 1.5) {
    vec2 oc = ro.xz - A.xz; float a = dot(rd.xz, rd.xz), b = dot(oc, rd.xz), cc = dot(oc, oc) - B.x * B.x, h = b * b - a * cc;
    if (h >= 0.0) { float tt = (-b - sqrt(h)) / a, y = ro.y + rd.y * tt; if (tt > 0.0 && y > A.y && y < B.y) { t = tt; vec2 q = oc + rd.xz * tt; n = vec3(q.x, 0.0, q.y) / B.x; } }
    float tc = (B.y - ro.y) / rd.y; vec2 q = oc + rd.xz * tc; float r2 = dot(q, q), ri = B.x - B.z;
    if (tc > 0.0 && tc < t && r2 < B.x * B.x) {
      t = tc; n = vec3(0.0, 1.0, 0.0);
      if (B.z > 0.0 && r2 < ri * ri) {   // through the mouth of the jar: its floor, or the far side of the inner wall
        float tw = (-b + sqrt(max(b * b - a * (dot(oc, oc) - ri * ri), 0.0))) / max(a, 1e-6), tf = (A.y + 0.6 - ro.y) / rd.y;
        if (tf < tw) t = tf; else { t = tw; q = oc + rd.xz * tw; n = vec3(-q.x, 0.0, -q.y) / ri; }
      }
    }
  } else {   // a cone with flat ends, radius B.w at A and D.z at B (handles, ferrules, tufts)
    vec3 ba = B.xyz - A.xyz, oa = ro - A.xyz;
    float ra = B.w, rb = D.z, m0 = dot(ba, ba), m1 = dot(oa, ba), m3 = dot(rd, ba), m4 = dot(rd, oa), m5 = dot(oa, oa), rr = ra - rb, hy = m0 + rr * rr;
    bool lo = m1 < 0.0, hi = m1 > m0;
    float tc = ((hi ? m0 : 0.0) - m1) / m3, rc = hi ? rb : ra; vec3 qc = oa + rd * tc - (hi ? ba : vec3(0.0));
    if ((lo || hi) && tc > 0.0 && dot(qc, qc) < rc * rc) { t = tc; n = ba * inversesqrt(m0) * (hi ? 1.0 : -1.0); }
    else {
      float k2 = m0 * m0 - m3 * m3 * hy, k1 = m0 * m0 * m4 - m1 * m3 * hy + m0 * ra * rr * m3, k0 = m0 * m0 * m5 - m1 * m1 * hy + m0 * ra * (rr * m1 * 2.0 - m0 * ra), h = k1 * k1 - k2 * k0;
      if (h > 0.0) {
        h = sqrt(h); float tt = (-k1 - h) / k2, y = m1 + tt * m3;
        if (!(tt > 0.0 && y > 0.0 && y < m0)) { tt = (-k1 + h) / k2; y = m1 + tt * m3; }
        if (tt > 0.0 && y > 0.0 && y < m0) { t = tt; n = normalize(m0 * (m0 * (oa + tt * rd) + rr * ba * ra) - ba * hy * y); }
      }
    }
  }
  return t;
}
#endif
// the ambient-occlusion distance (gAoP, when gAo) is the loop's iteration -1: one sceneD call site per program (D3D inlines each)
bool gAo = false, gPr = false; vec3 gAoP; float gAoD = 1.0;
float shadow(vec3 p, vec3 L, float maxT, float k, bool on) {
  float res = 1.0, t = 0.04;
  for (int i = gAo ? -1 : 0; i < (on ? uIt : 0); i++) { float h = sceneD(i < 0 ? gAoP : p + L * t); if (i < 0) { gAoD = h; continue; } res = min(res, k * h / t); t += clamp(h, 0.04, 2.5); if (res < 0.004 || t > maxT) break; }
  return clamp(res, 0.0, 1.0);
}
vec2 paperLocal(vec2 xz) { vec2 d = xz - uC[7].xy; return vec2(uC[7].z * d.x + uC[7].w * d.y, -uC[7].w * d.x + uC[7].z * d.y); }
float paperIn(vec2 lp) {
  vec2 h = uC[8].xy, e = h - abs(lp);
  float dk = uC[8].w;
  float ex = dk * (0.10 + 0.22 * T(vec2(lp.y * 0.031, 0.17 + sign(lp.x) * 0.3)).r + 0.10 * T(vec2(lp.y * 0.21, 0.61)).g);
  float ez = dk * (0.10 + 0.22 * T(vec2(lp.x * 0.031, 0.43 + sign(lp.y) * 0.3)).r + 0.10 * T(vec2(lp.x * 0.21, 0.83)).g);
  return min(e.x - ex, e.y - ez);
}
vec2 tapeD(vec2 lp) {
  if (uC[12].w < 0.5) return vec2(-1.0);
  vec2 h = uC[8].xy, a = abs(lp);
  float n1 = T(lp * 0.013 + 0.37).g, n2 = T(lp * 0.45 + 0.11).r - 0.5;
  return vec2(min(0.62 + 0.05 * n2 - abs(a.x - h.x + 0.12), h.y + 0.5 + 1.1 * n1 + 0.3 * n2 - a.y), min(0.62 - 0.05 * n2 - abs(a.y - h.y + 0.12), h.x + 1.3 - 1.0 * n1 + 0.3 * n2 - a.x));
}
// light through (or around) the water glass: x = transmitted factor, y = share of it that came through the water
vec2 glassLight(vec3 p, vec3 L) {   // one exit (FXC compiles early returns slowly)
  vec2 res = vec2(1.0, 0.0);
  vec2 C = uC[10].xy; float R = uC[10].z, H = uC[10].w, Hw = uC[11].x;
  vec2 rel = C - p.xz;
  float lh = length(L.xz);
  if (uC[15].w < 0.5) {}
  else if (dot(rel, rel) < R * R) res = vec2(0.85, 0.6);
  else if (!(lh < 1e-3)) {
    vec2 dh = L.xz / lh;
    float u = dot(rel, dh);
    float v = abs(rel.x * dh.y - rel.y * dh.x);
    float yg = p.y + u * L.y / lh;
    if (!(u < 0.0) && !(yg > H)) {
      float pen = R * 0.05 + u * uC[17].x * 1.2;
      float geo = smoothstep(R - pen, R + pen, v);
      if (yg > Hw) { float e = v / R; res = vec2(mix(mix(0.86, 0.3, smoothstep(0.82, 1.0, e)), 1.0, geo), 0.0); }
      else {
        float f = 2.0 * R, k = 1.0 - u / f, ak = max(abs(k), 0.05 + u * uC[17].x);
        float x = v / (ak * R);
        float I = smoothstep(1.0, 0.4, x) * min(0.8 / ak, 2.4) * (1.0 + 0.5 * smoothstep(0.4, 0.95, x)) * smoothstep(1.7 * f, 0.7 * f, u);
        I *= smoothstep(Hw, Hw - 0.6, yg);
        float tr = geo + (1.0 - geo) * 0.22 + I;
        res = vec2(tr, I / max(tr, 1e-3));
      }
    }
  }
  return res;
}
float winMask(vec3 q, float s) {
  vec4 w = uC[14];
  float m = smoothstep(w.x - s, w.x + s, q.x) * smoothstep(w.y + s, w.y - s, q.x) * smoothstep(w.z - s, w.z + s, q.y) * smoothstep(w.w + s, w.w - s, q.y);
  float dx = abs(fract((q.x - w.x) / 24.0 + 0.5) - 0.5) * 24.0; m *= smoothstep(0.8, 0.8 + 2.0 * s, dx);
  m *= smoothstep(0.8, 0.8 + 2.0 * s, abs(q.y - w.z - 30.0));
  return m;
}
float winLight(vec3 p, vec3 L) {
  if (L.z > -0.05) return 0.0;
  float t = (WALLZ - p.z) / L.z; return winMask(p + L * t, 0.3 + t * 0.025);
}
// the sky's two-colour gradient (outside()'s constants, from JS), dark below the roofs
vec3 skyG(float y) { return mix(uC[19].rgb, uC[20].rgb, sqrt(clamp((y - 6.0) / 55.0, 0.0, 1.0))) * mix(1.0, 0.12, smoothstep(14.0, 10.0, y)); }
vec3 lightAt(vec3 p, vec3 n, out vec3 L, out float cf) {
  float at;
  if (LKIND > 1.5) { L = normalize(uC[4].xyz); at = winLight(p, L); }
  else { vec3 d = uC[4].xyz - p; float d2 = dot(d, d); L = d * inversesqrt(d2); at = 1.0 / (d2 + (LKIND > 0.5 ? 60.0 * smoothstep(260.0, 30.0, d2) : 0.0)); if (LKIND < 0.5) at *= smoothstep(uC[5].w, uC[5].w + 0.3, dot(-L, uC[6].xyz)); }
  cf = 0.0;
  bool on = !(at < 1e-6 || dot(n, L) <= 0.0);
  float sh = shadow(p + n * 0.03, L, 70.0, uC[4].w, on);
  if (!on) return vec3(0.0);
  vec2 g = glassLight(p, L); cf = g.y;
  return uC[5].rgb * at * sh * g.x;
}
vec3 outside(vec2 q) {
  float hh = clamp((q.y - 6.0) / 55.0, 0.0, 1.0);
  vec3 c = mix(vec3(0.085, 0.07, 0.085), vec3(0.012, 0.022, 0.06), pow(hh, 0.5)) + vec3(0.09, 0.04, 0.012) * exp(-hh * 10.0);
  c *= 0.8 + 0.4 * T(vec2(q.x * 0.004, q.y * 0.012) + 0.3).r;
  if (LKIND > 1.5) c = c * 1.5 + vec3(0.006, 0.012, 0.03);
  float ridge = 7.0 + 7.0 * T(vec2(q.x * 0.009, 0.61)).r + 4.5 * T(vec2(floor(q.x / 7.3) * 0.137, 0.27)).g * step(0.35, T(vec2(floor(q.x / 7.3) * 0.211, 0.53)).r) + 2.2 * step(0.7, T(vec2(floor(q.x / 1.9) * 0.173, 0.77)).g);
  float roof = step(q.y, ridge);
  c = mix(c, vec3(0.006, 0.007, 0.011), roof * 0.94);
  vec2 g = q * vec2(0.22, 0.3), id = floor(g), f = fract(g) - 0.5;
  vec4 h = T(id * 0.0731 + 0.13);
  float lit = step(0.8, h.r) * (roof > 0.5 ? 1.0 : 0.25);
  c += mix(vec3(1.0, 0.5, 0.16), vec3(0.95, 0.78, 0.5), h.a) * 0.16 * lit * smoothstep(0.34, 0.1, max(abs(f.x - (h.g - 0.5) * 0.4) * 1.5, abs(f.y - (h.b - 0.5) * 0.4)));
  return c;
}
vec3 tone(vec3 c) { c = max(c * uC[3].w, 0.0); c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14); return sqrt(clamp(c, 0.0, 1.0)); }
float hitCyl(vec3 ro, vec3 rd, vec2 c, float r, bool far) { vec2 oc = ro.xz - c; float a = dot(rd.xz, rd.xz), b = dot(oc, rd.xz), cc = dot(oc, oc) - r * r, h = b * b - a * cc; if (h < 0.0) return -1.0; h = sqrt(h); return far ? (-b + h) / a : (-b - h) / a; }
vec3 camRay() { vec2 uv = vUv + uC[21].xy; return normalize(uC[3].xyz + (uv.x * 2.0 - 1.0) * TANH * uC[1].xyz + (uv.y * 2.0 - 1.0) * TANH * uC[2].xyz); }
void primaryHit(vec3 ro, vec3 rd, out float t, out int mat, out int pid, out vec3 n) {
  t = 1e9; mat = 0; pid = -1; n = vec3(0.0, 1.0, 0.0);
  if (rd.y < 0.0) { float tt = -ro.y / rd.y; vec3 p = ro + rd * tt; if (p.z > WALLZ) { t = tt; mat = 1; } }
  if (rd.z < 0.0) { float tt = (WALLZ - ro.z) / rd.z; vec3 p = ro + rd * tt; if (tt > 0.0 && tt < t && p.y > 0.0) { t = tt; mat = 2; n = vec3(0.0, 0.0, 1.0); } }
#ifndef GLASSP
  if (rd.y < 0.0) { float tt = (uC[8].z - ro.y) / rd.y; vec3 p = ro + rd * tt; vec2 lp = paperLocal(p.xz), td = tapeD(lp); if (tt > 0.0 && tt < t && max(paperIn(lp), max(td.x, td.y)) > 0.0) { t = tt; mat = 3; } }
#endif
#ifdef GLASSP
  for (int k = 0; k < 2; k++) { vec3 nn; float tt = iBox(ro, rd, k, nn); if (tt < t) { t = tt; mat = 10; pid = k; n = nn; } }   // only the board and the tin can stand before the glass
#else
#ifdef ROOMP
  for (int k = 0; k < NBOX; k++) { vec3 nn; float tt = iBox(ro, rd, k, nn); if (tt < t) { t = tt; mat = 10; pid = k; n = nn; } }   // the board (and the tin) are shaded here, the rest in props
#else
  for (int k = 0; k < uNP; k++) { vec3 nn; float tt = iPrim(ro, rd, k, nn); if (tt < t) { t = tt; mat = 10; pid = k; n = nn; } }
#endif
#endif
}
vec3 shadeLit(vec3 p, vec3 rd, vec3 n, vec3 alb, float spec, float shin, float ao, vec3 emit, out float causF) {
  vec3 L; float cf;
  vec3 Li = lightAt(p, n, L, cf);
#ifdef AOF
  if (gAo) ao *= AOF(gAoD);
#endif
  float ndl = max(dot(n, L), 0.0);
  vec3 Hh = normalize(L - rd);
  vec3 amb = uC[15].rgb * ao * (0.55 + 0.45 * max(n.y, 0.0) + 0.3 * max(n.z, 0.0)), warm = vec3(0.0), bn = vec3(0.0);
#ifndef NOWARM
  if (uC[16].w > 0.5) { vec3 dc = uC[4].xyz - p; warm = uC[5].rgb * 0.05 * ao / (dot(dc, dc) + 40.0); }
#endif
  if (gBn > 0.5) {
    // the lit sheet is the second lamp: a 28 x 21 rectangle at its centre seen from p, brightest low down
    vec3 v = vec3(uC[7].x, uC[8].z, uC[7].y) - p; float d2 = dot(v, v), id = inversesqrt(d2);
    bn = uC[18].rgb * ao * 588.0 * max(dot(n, v) * id, 0.0) * 0.35 / (3.1416 * d2 + 588.0) * exp(max(v.y, -12.0) * 0.4);
    // the window's sky, by its solid angle from p and how far n faces it; the room's own part dimmer
    vec4 w = uC[14]; vec3 vw = vec3((w.x + w.y) * 0.5, (w.z + w.w) * 0.5, WALLZ) - p; float dw2 = dot(vw, vw), iw = inversesqrt(dw2), Aw = (w.y - w.x) * (w.w - w.z);
    amb = uC[15].rgb * ao * (0.45 + 0.3 * max(n.y, 0.0)) + mix(uC[19].rgb, uC[20].rgb, 0.85) * uC[19].w * mix(ao, 1.0, 0.4) * Aw * max(dot(n, vw) * iw, 0.0) * max(-vw.z * iw, 0.0) / (3.1416 * dw2 + Aw);
    warm *= uC[21].z;
  }
  vec3 dir = Li * ndl, spc = Li * spec * pow(max(dot(n, Hh), 0.0), shin) * (shin + 8.0) / 25.0 * ndl;
  causF = cf * clamp(dot(dir, vec3(0.33)) / max(dot(dir + (amb + warm) * alb, vec3(0.33)), 1e-4), 0.0, 1.0);
  vec3 c = alb * (dir + amb + warm + bn) + spc;
#ifdef RMIR
  vec3 rr = reflect(rd, n);
  if (gMir > 0.0 && rr.z < -0.02) {   // a mirror term: the window's sky in a glossy top
    float t = (WALLZ - p.z) / rr.z; vec3 q = p + rr * t;
    c += gMir * (0.04 + 0.96 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0)) * uC[20].w * skyG(q.y) * winMask(q, 0.3 + t * 0.06 * gMirR);
  }
#endif
  return c + emit;
}
`,Dt=et.replace("#define CAM",`#define ROOMP
#define NBOX 1
#define AOF(d) (gPr ? clamp(0.4 + d, 0.0, 1.0) * 0.5 + 0.5 : mix(0.55, 1.0, smoothstep(0.0, 1.6, d)))
#define CAM`)+`
void main() {
  if (uMode == 2 && flatPx()) discard;
  vec3 ro = CAM, rd = camRay();
  float t; int mat, pid; vec3 n; primaryHit(ro, rd, t, mat, pid, n);
#if RSET == 1
  if (mat == 2 || mat == 3) discard;
#else
  if (mat != 2 && mat != 3) discard;
#endif
  float paperM = 0.0, winM = 0.0, causF = 0.0; vec3 c = vec3(0.0);
  vec2 GC = uC[10].xy; float GR = uC[10].z;
  if (t < 1e8) {
    vec3 p = ro + rd * t;
    { float px = t * 2.0 * TANH / uC[17].w; gLod = log2(max(px * (mat == 3 ? 37.0 : 25.0), 1.0)); }
    vec3 alb = vec3(0.5); float spec = 0.04, shin = 20.0, ao = 1.0; vec3 emit = vec3(0.0);
    // one paperIn site (D3D inlines each): the desk and the sheet test where they are, the board where the sheet's shadow falls
    vec2 lpS = paperLocal(p.xz); vec3 q = p;
#if RSET == 1
    if (mat == 10) {
      q = p - uPa[pid].xyz; q.xz = rot(-uPd[pid].x) * q.xz;
      float lift = uC[12].w > 0.5 ? 0.14 : 0.5;
      vec3 Lw = LKIND > 1.5 ? normalize(uC[4].xyz) : normalize(uC[4].xyz - p);
      vec2 Ll = vec2(uC[7].z * Lw.x + uC[7].w * Lw.z, -uC[7].w * Lw.x + uC[7].z * Lw.z) / max(Lw.y, 0.2);
      lpS = q.xz + Ll * lift;
    }
#endif
    float pdS = paperIn(lpS);
#if RSET == 1
    if (mat == 1) {
      vec2 dp = p.xz; float ofs = uC[6].w;
      // this mint's desk only (DSK = DESK, compiled per desk)
#if DSK == 0
      {
        float pl = floor((dp.y + 200.0) / 9.5), po = pl * 7.31 + ofs;
        vec4 N1 = T(vec2(dp.x * 0.004 + po, dp.y * 0.045 + po * 0.3)), N2 = T(vec2(dp.x * 0.02, dp.y * 0.55) + po), N3 = T(vec2(dp.x * 0.11, dp.y * 2.3) + po);
        float rings = 0.5 + 0.5 * sin((N1.r + 0.5 * N1.g) * 21.0 + dp.y * 0.9);
        alb = uC[12].rgb * (0.74 + 0.2 * rings * N2.r + 0.24 * N2.g) * (0.9 + 0.2 * N3.b) * (0.88 + 0.24 * fract(sin(pl * 12.9898) * 43758.5453));
        float sm = abs(fract((dp.y + 200.0) / 9.5) - 0.5) * 9.5;
        alb *= mix(0.5, 1.0, smoothstep(4.73, 4.64, sm));
        spec = 0.09; shin = 34.0; gMir = 0.25 + 0.75 * N2.r * (0.6 + 0.4 * N3.b); gMirR = 1.3;
      }
#elif DSK == 1
      {
        vec4 N1 = T(vec2(dp.x * 0.01, dp.y * 0.2) + ofs), N2 = T(dp * 0.02 + ofs + 0.4), N3 = T(dp * 0.007 + 0.71);
        alb = uC[12].rgb * (0.85 + 0.25 * N1.r) * (0.9 + 0.15 * N1.a);
        float wear = smoothstep(0.865, 0.875, N2.r * 0.8 + N3.g * 0.35 + uC[11].w * 0.1 + 0.07 * smoothstep(6.0, 1.5, -pdS) + 0.025 * sin(dp.x * 3.1 + dp.y * 1.7) * sin(dp.y * 2.3 - dp.x * 0.9));
        alb = mix(alb, max(vec3(0.40, 0.32, 0.22) * (0.8 + 0.3 * N1.g), alb * 0.75), wear);
        float st = smoothstep(0.80, 0.83, T(dp * 0.045 + 3.7).g);
        int si = int(T(floor(dp * 0.05) * 0.13).b * 5.99);
        alb *= mix(vec3(1.0), max(exp(-2.0 * uPan[si].rgb * 0.35), vec3(0.62)), st * (0.6 + 0.4 * N2.b));
        alb *= mix(vec3(1.0), max(exp(-2.0 * uPan[si].rgb * 0.5), vec3(0.85)), smoothstep(0.02, 0.0, abs(T(dp * 0.045 + 3.7).g - 0.81)) * st);
        spec = 0.05; shin = 25.0; gMir = 0.5 * (1.0 - wear); gMirR = 0.8;
      }
#else
      {
        vec4 N1 = T(dp * 0.01 + ofs), N2 = T(dp * vec2(0.05, 0.03) + ofs);
        alb = uC[12].rgb * (0.75 + 0.45 * N1.r) * (0.88 + 0.22 * N2.b);
        alb *= 1.0 - 0.15 * smoothstep(0.6, 0.65, T(vec2(dp.x * 0.004, dp.y * 0.06)).g);
        spec = 0.12; shin = 50.0; gMir = 1.0; gMirR = 0.35;
      }
#endif
      float pd = pdS;
      ao *= mix(0.55, 1.0, smoothstep(0.0, 0.9, -pd));
      if (uC[15].w > 0.5) { float e = length(dp - GC) - GR; ao *= mix(0.55, 1.0, smoothstep(0.0, 1.5, e)); }
      gAo = true; gAoP = p + n * 0.6;   // ao *= AOF(sceneD(gAoP)) in shadeLit
    }
    else if (mat == 10) {   // the board (moved here from props to balance the D3D compile)
      alb = uPc[pid].rgb;
      vec4 N1 = T(vec2(q.x * 0.005, q.z * 0.1) + 0.23), N2 = T(vec2(q.x * 0.03, q.z * 4.5) + 0.5), N3 = T(q.xz * 0.03 + 1.7);
      alb *= (0.8 + 0.3 * N1.r) * (0.9 + 0.2 * N2.g);
      spec = 0.05; shin = 14.0;
      if (n.y < 0.5) alb *= (0.55 + 0.4 * step(0.5, fract(p.y * 4.4 + 0.2))) * (1.0 + 0.9 * smoothstep(0.6, 0.69, p.y));
      else {
        int si = int(T(floor(q.xz * 0.11) * 0.13 + 0.4).b * 5.99);
        alb *= mix(vec3(1.0), exp(-2.0 * uPan[si].rgb * 0.16), smoothstep(0.68, 0.8, N3.g) * (0.4 + 0.6 * N2.b));
        float pd2 = pdS, lift = uC[12].w > 0.5 ? 0.14 : 0.5; gBn = 0.0; gMir = 0.3; gMirR = 1.5;
        alb *= mix(1.0, 0.75, smoothstep(0.6, 0.0, -pd2)) * mix(1.0, 0.4, smoothstep(-0.03, lift * 0.6, pd2));
      }
      gPr = true; gAo = true; gAoP = p + n * 0.6;   // after the shading normal, as props does
    }
#else
    if (mat == 2) {
      vec4 w = uC[14];
      alb = uC[13].rgb * (0.85 + 0.25 * T(p.xy * 0.02).r) * (0.94 + 0.1 * T(p.xy * 0.13).g);
      if (p.x > w.x - 2.0 && p.x < w.y + 2.0 && p.y > w.z - 2.0 && p.y < w.w + 2.0) {
        float dx = abs(fract((p.x - w.x) / 24.0 + 0.5) - 0.5) * 24.0, dy = abs(p.y - w.z - 30.0);
        bool frame = p.x < w.x || p.x > w.y || p.y < w.z || dx < 0.8 || dy < 0.8;
        if (frame) {
          float sx = fract((p.x - w.x) / 24.0 + 0.5) - 0.5, sy = p.y - w.z - 30.0;
          alb = uC[13].rgb * 0.75; spec = 0.12; shin = 30.0;
          n = (p.x < w.x || p.x > w.y || p.y < w.z) ? normalize(vec3(0.0, 0.3, 1.0)) : normalize(vec3(dx < 0.8 ? clamp(sx * 30.0, -1.0, 1.0) * 0.7 : 0.0, dy < 0.8 ? clamp(sy / 0.8, -1.0, 1.0) * 0.7 : 0.0, 1.0));
          if (p.y < w.z && p.y > w.z - 1.5 && p.x > w.x - 2.0 && p.x < w.y + 2.0) { n = normalize(vec3(0.0, 1.0, 0.25)); alb = uC[13].rgb * 0.85; }   // the sill
        }
        else { winM = 1.0; emit = outside(p.xy); alb = vec3(0.0); spec = 0.6; shin = 400.0; }
      }
    } else if (mat == 3) {
      vec2 lp = lpS, uv = lp / (2.0 * uC[8].xy) + 0.5;
      vec2 tc = uv * vec2(4.0, 3.0) + vec2(uC[17].y);
      float e = 1.0 / 512.0, h0 = T(tc).b, hx = T(tc + vec2(e, 0.0)).b, hz = T(tc + vec2(0.0, e)).b;
      vec2 tb = uv * vec2(1.3, 0.98) + 0.41; float e2 = 1.0 / 256.0, b0 = T(tb).g;
      vec2 g = vec2(hx - h0, hz - h0) * uC[9].w * 2.4 + vec2(T(tb + vec2(e2, 0.0)).g - b0, T(tb + vec2(0.0, e2)).g - b0) * uC[9].w * 0.32;
      vec3 nl = normalize(vec3(-g.x, 1.0, -g.y));
      n = normalize(vec3(uC[7].z * nl.x - uC[7].w * nl.z, nl.y, uC[7].w * nl.x + uC[7].z * nl.z));
      alb = uC[9].rgb * (0.96 + 0.07 * T(uv * vec2(1.4, 1.05) + 0.2).a) * (1.0 - 0.05 * uC[9].w * (0.5 - h0));
      float pd = pdS;
      alb *= 1.0 + 0.08 * smoothstep(0.25, 0.0, pd);
      spec = 0.02; shin = 8.0;
      paperM = 1.0; gBn = 0.0;
      vec2 td = tapeD(lp);
      if (max(td.x, td.y) > 0.0) {
        bool sd = td.x > 0.0; float d = sd ? td.x : td.y;
        vec4 cr = T(lp * (sd ? vec2(0.5, 0.21) : vec2(0.21, 0.5)) + 0.2);
        vec3 ta = vec3(0.33, 0.24, 0.15) * (0.93 + 0.09 * cr.g + 0.07 * cr.b) * (1.0 - 0.35 * smoothstep(0.06, 0.0, d));
        if (!sd) ta *= 1.0 - 0.25 * smoothstep(0.14, 0.0, -td.x) * step(td.x, 0.0);
        alb = ta * (pd > 0.0 ? 1.0 : 0.93);
        n = normalize(vec3((cr.r - 0.5) * 0.18, 1.0, (cr.a - 0.5) * 0.18)); spec = 0.05 + 0.2 * smoothstep(0.35, 0.75, cr.g); shin = 30.0; paperM = 0.0;
      }
    }
#endif
    c = shadeLit(p, rd, n, alb, spec, shin, ao, emit, causF);
    if (winM > 0.5) c = emit;
  }
  if (uMode != 1) o = vec4(tone(c), paperM);
  else o = vec4(0.0, causF, 0.0, winM);
}`,qt=et.replace("#define CAM",`#define NBOX 1
#define AOF(d) (clamp(0.4 + d, 0.0, 1.0) * 0.5 + 0.5)
#define CAM`)+`
void main() {
  if (uMode == 2 && flatPx()) discard;
  vec3 ro = CAM, rd = camRay();
  float t; int mat, pid; vec3 n; primaryHit(ro, rd, t, mat, pid, n);
  if (mat != 10 || pid < NBOX) discard;
  { int M0 = int(uPc[pid].w + 0.5);
#if PSET == 1
    if (M0 != 1 && M0 != 6) discard;
#else
    if (M0 == 1 || M0 == 6) discard;
#endif
  }
  vec3 p = ro + rd * t;
  { float px = t * 2.0 * TANH / uC[17].w; gLod = log2(max(px * 25.0, 1.0)); }
  vec3 alb = vec3(0.5); float spec = 0.04, shin = 20.0, ao = 1.0, panI = 0.0, causF; vec3 emit = vec3(0.0);
  {
      vec4 Cc = uPc[pid], A = uPa[pid], B = uPb[pid], D = uPd[pid];
      int M = int(Cc.w + 0.5); alb = Cc.rgb;
#if PSET == 1
      if (M == 1) {
        vec3 q = p - A.xyz; q.xz = rot(-D.x) * q.xz;
        alb = vec3(0.012, 0.012, 0.014); spec = 0.5; shin = 120.0;
        if (n.y > 0.8 && abs(q.x) < B.x - 0.4 && abs(q.z) < B.z - 0.4) {
          alb = vec3(0.62, 0.61, 0.57) * (0.94 + 0.08 * T(q.xz * 0.2).r); spec = 0.25; shin = 60.0;
          vec2 cell = vec2(q.x < 0.0 ? 0.0 : 1.0, clamp(floor((q.z + 4.8) / 3.2), 0.0, 2.0));
          vec2 pc = vec2(cell.x < 0.5 ? -1.35 : 1.35, (cell.y - 1.0) * 3.2), lq = q.xz - pc;
          if (abs(lq.x) < 1.15 && abs(lq.y) < 1.45) {
            int pi = int(cell.x + cell.y * 2.0 + 0.5);
            alb = vec3(0.70, 0.70, 0.68); spec = 0.3; shin = 50.0;
            if (abs(lq.x) < 0.98 && abs(lq.y) < 1.28) {
              vec3 K = uPan[pi].rgb; vec4 nz = T(lq * 0.35 + vec2(float(pi) * 0.17, 0.3));
              float sc = smoothstep(1.0, 0.1, length((lq - (nz.rg - 0.5) * 0.6) / vec2(0.8, 1.0)));
              alb = exp(-2.0 * K * (1.1 - 0.3 * sc + 0.08 * (nz.b - 0.5)));
              if (uPan[pi].w > 1.5) { spec = 0.6; shin = 30.0; alb = mix(alb, vec3(0.5, 0.36, 0.12), 0.4); }
              else { spec = 0.12; shin = 40.0; }
              n = normalize(n + vec3(lq.x, 0.0, lq.y) * 0.18 * sc);
              ao *= 0.85 + 0.15 * smoothstep(0.98, 0.7, max(abs(lq.x) / 0.98, abs(lq.y) / 1.28));
            }
          }
          ao *= smoothstep(0.0, 0.25, min(B.x - 0.4 - abs(q.x), B.z - 0.4 - abs(q.z))) * 0.3 + 0.7;
        }
      }
#ifdef CNDL
      else if (M == 6) {   // the candle: a rim round a pool of clear melted wax, a top that glows from inside, one run of wax
        spec = 0.06; shin = 10.0;
        vec2 rx = p.xz - A.xz; float r = length(rx) / B.x, dt = max(B.y - p.y, 0.0);
        if (n.y > 0.7) {
          float pool = smoothstep(0.84, 0.70, r + 0.025 * sin(rx.x * 4.0 + A.x * 3.0) * sin(rx.y * 3.3 - A.x));
          alb = mix(alb * vec3(0.9, 0.84, 0.72), vec3(0.45, 0.30, 0.12), pool);
          spec = mix(0.05, 1.2, pool); shin = mix(10.0, 900.0, pool);
          n = normalize(vec3(rx / max(r * B.x, 1e-3) * (smoothstep(0.66, 0.84, r) * 0.7 - smoothstep(0.9, 1.0, r) * 0.8), 1.0).xzy);
          emit = vec3(1.0, 0.5, 0.15) * mix(0.5, 0.12, pool) * uC[16].w;
        } else {
          vec2 cd = rot(0.5) * normalize(CAM.xz - A.xz), tg = vec2(-cd.y, cd.x), nr = rx / max(length(rx), 1e-4);
          float run = smoothstep(0.992, 0.999, dot(nr, cd)) * smoothstep(3.4 + 1.5 * fract(A.x * 7.31), 0.4, dt);
          n = normalize(n + vec3(tg.x, 0.0, tg.y) * dot(nr, tg) * 7.0 * run);
          alb *= 1.0 + 0.12 * run;
          emit = vec3(1.0, 0.5, 0.15) * ((0.75 + 0.3 * run) * exp(-dt * 1.6) + 0.05 * exp(-dt * 0.3)) * uC[16].w;
        }
      }
#endif
#else
      if (M == 2) {
        float r = length(p.xz - A.xz), hy = p.y / B.y, ri = B.x - B.z;
        vec4 gz = T(vec2(n.x * 0.35 + n.z * 0.21, p.y * 0.06) + A.x * 0.1), sk = T(vec2(n.x * 2.1 - n.z * 1.3, p.y * 0.33));
        float thr = sin(p.y * 2.6 + gz.g * 4.0);
        vec3 clay = vec3(0.50, 0.40, 0.31) * (0.85 + 0.25 * sk.g), lip = vec3(0.34, 0.22, 0.13);
        spec = 0.5; shin = 140.0;
        alb *= 0.78 + 0.3 * gz.r + 0.03 * thr;
        alb = mix(alb, alb * vec3(0.5, 0.42, 0.34), smoothstep(0.72, 0.8, sk.b) * 0.3);
        if (n.y > 0.7 && p.y > B.y - 0.1) {   // the lip: a rolled rim, the glaze worn thin on it
          float e = (r - (B.x + ri) * 0.5) / (B.z * 0.5);
          n = normalize(vec3((p.xz - A.xz) / r * e * 0.9, 1.0).xzy); alb = mix(alb, lip, 0.75); ao *= 0.8 + 0.2 * smoothstep(1.0, 0.5, abs(e));
        } else if (n.y > 0.7) { alb = clay * 0.5; spec = 0.03; shin = 8.0; ao *= 0.35; }   // the floor of the jar
        else if (r < ri + 0.05) {   // the inner wall: pale liner glaze, stained and darker with depth
          float dp = B.y - p.y;
          alb = mix(vec3(0.62, 0.58, 0.50), alb, 0.25) * (0.85 + 0.25 * gz.g) * mix(1.0, 0.6, smoothstep(0.75, 0.82, sk.r + 0.03 * dp));
          ao *= mix(1.0, 0.22, smoothstep(0.0, 5.5, dp)); spec = 0.3; shin = 60.0;
        } else {
          alb = mix(alb, lip, smoothstep(0.93, 0.995, hy + 0.04 * gz.g));
          if (hy < 0.07 + 0.025 * gz.g) { alb = clay; spec = 0.03; shin = 8.0; }
          n = normalize(n + vec3(0.0, 0.05 * thr, 0.0));
        }
      } else if (M >= 3 && M <= 5) {
        vec3 ba = B.xyz - A.xyz; float h = clamp(dot(p - A.xyz, ba) / dot(ba, ba), 0.0, 1.0), ang = dot(n, vec3(0.61, 0.31, 0.73));
        vec4 nz = T(vec2(h * 0.10 + D.x, ang * 0.045 + D.x * 3.7)), fz = T(vec2(ang * 1.9 + D.x, h * 0.13 + D.x));
        if (M == 3) {   // lacquered handle: chipped to the wood, a dipped tail, a line of gold lettering
          spec = 0.55; shin = 150.0;
          alb *= 0.85 + 0.3 * nz.r;
          if (h < D.y) alb = mix(alb, vec3(0.55, 0.52, 0.45), 0.85);
          alb = mix(alb, vec3(0.62, 0.50, 0.22), step(0.5, fz.b) * step(abs(h - 0.84), 0.035) * step(0.0, ang) * 0.6);
          float chip = smoothstep(0.70, 0.76, nz.g + 0.3 * smoothstep(0.93, 1.0, h) + D.w);
          alb = mix(alb, vec3(0.50, 0.37, 0.21) * (0.8 + 0.4 * fz.a), chip); spec *= 1.0 - 0.85 * chip;
        } else if (M == 4) {   // ferrule: bright metal with two crimps; it mirrors the dark room, so it is mostly highlight
          float g = smoothstep(0.035, 0.0, abs(h - 0.22)) + smoothstep(0.035, 0.0, abs(h - 0.36));
          vec3 rf = reflect(rd, n);
          emit = alb * (uC[15].rgb * 5.0 + uC[5].rgb * 0.00002 * (LKIND > 1.5 ? 400.0 : 1.0)) * (0.25 + 0.75 * smoothstep(-0.3, 0.7, rf.y)) * (0.7 + 0.6 * nz.r) * (1.0 - 0.6 * g);
          alb *= 0.35 * (1.0 - 0.5 * g); spec = 1.6; shin = 60.0;
        } else {   // the tuft: fine hair, darker at the root and where it last held paint
          alb *= (0.62 + 0.6 * fz.g) * mix(0.7, 1.05, smoothstep(0.0, 0.5, h));
          if (D.y > 0.5) alb = mix(alb, alb * exp(-2.0 * uPan[int(D.y - 0.5)].rgb * 0.8), smoothstep(0.25, 0.85, h + 0.2 * nz.r) * 0.85);
          spec = 0.10; shin = 14.0;
        }
      }
#endif
  }
  gAo = true; gAoP = p + n * 0.6;   // ao *= AOF(sceneD(gAoP)) in shadeLit
  vec3 c = shadeLit(p, rd, n, alb, spec, shin, ao, emit, causF);
#if PSET == 1
  if (int(uPc[pid].w + 0.5) == 1) {
      vec3 q = p - uPa[pid].xyz; q.xz = rot(-uPd[pid].x) * q.xz;
      vec2 cell = vec2(q.x < 0.0 ? 0.0 : 1.0, clamp(floor((q.z + 4.8) / 3.2), 0.0, 2.0));
      vec2 lq = q.xz - vec2(cell.x < 0.5 ? -1.35 : 1.35, (cell.y - 1.0) * 3.2);
      if (n.y > 0.5 && abs(lq.x) < 1.0 && abs(lq.y) < 1.3) panI = (cell.x + cell.y * 2.0 + 1.0) / 8.0;
  }
#endif
  if (uMode != 1) o = vec4(tone(c), 0.0);
  else o = vec4(0.0, causF, panI, 0.0);
}`,Ro=et.replace("#define CAM",`#define GLASSP
#define CAM`)+`
uniform sampler2D uPrev;
vec2 projS(vec3 q) { vec3 d = q - CAM; float z = dot(d, uC[3].xyz); return (vec2(dot(d, uC[1].xyz), dot(d, uC[2].xyz)) / (z * TANH) + 1.0) * 0.5; }
// what a ray leaving the glass sees, display-linear: the baked picture (filtered) where it lands on the desk or the wall,
// the sky's gradient where it leaves the picture through the window, the room's dim light elsewhere
vec3 envLook(vec3 o, vec3 d) {
  float tq = d.y < 0.0 ? -o.y / d.y : 1e9; vec3 q = o + d * tq;
  if (d.z < 0.0 && q.z < WALLZ) { tq = (WALLZ - o.z) / d.z; q = o + d * tq; }
  vec3 e = tone(uC[15].rgb * 1.5 + uC[18].rgb * uC[18].w * 0.06);
  vec2 su = projS(q);
  if (tq < 1e8 && dot(q - CAM, uC[3].xyz) > 0.0 && su == clamp(su, 0.0, 1.0)) e = textureLod(uPrev, su, 0.0).rgb;
  else if (d.z < 0.0 && tq < 1e8 && q.y > 0.0) e = mix(e, tone(skyG(q.y)), winMask(q, 1.0));
  return e * e;
}
void main() {
  ivec2 pcx = ivec2(gl_FragCoord.xy); vec4 prev = texelFetch(uPrev, pcx, 0);
  if (uC[15].w < 0.5) { o = prev; return; }
  vec3 ro = CAM, rd = camRay();
  float t; int mat, pid; vec3 n0; primaryHit(ro, rd, t, mat, pid, n0);
  vec3 thr = vec3(1.0), acc = vec3(0.0), dl = vec3(0.0); float waterP = 0.0;
  vec2 GC = uC[10].xy; float GR = uC[10].z, GH = uC[10].w, GW = uC[11].x, GRi = GR - 0.2;
  bool hit = false;
  {
      float tg = hitCyl(ro, rd, GC, GR, false); vec3 pg = ro + rd * tg; bool top = false;
      if (tg < 0.0 || pg.y > GH || pg.y < 0.0) { float tt = (GH - ro.y) / rd.y; vec3 q = ro + rd * tt; if (rd.y < 0.0 && length(q.xz - GC) < GR) { tg = tt; pg = q; top = true; } else tg = 1e9; }
      if (tg > 0.0 && tg < t) {
        vec3 nn = top ? vec3(0.0, 1.0, 0.0) : normalize(vec3(pg.x - GC.x, 0.0, pg.z - GC.y));
        float fr = 0.04 + 0.96 * pow(1.0 - abs(dot(rd, nn)), 5.0);
        vec3 rr = reflect(rd, nn), Lr = LKIND > 1.5 ? normalize(uC[4].xyz) : normalize(uC[4].xyz - pg);
        vec3 envR; { float tr = rr.y < -0.01 ? -pg.y / rr.y : 1e9; vec2 sr = projS(pg + rr * min(tr, 60.0)); envR = textureLod(uPrev, clamp(sr, 0.0, 1.0), 0.0).rgb; envR *= envR * (tr < 1e8 ? 1.0 : 0.4); }
        float hl = pow(max(dot(rr, Lr), 0.0), 900.0) * 60.0 + pow(max(dot(rr, Lr), 0.0), 40.0) * 0.6;
        float rim = top && length(pg.xz - GC) > GRi ? 1.0 : 0.0, sideL = max(dot(normalize(pg.xz - GC), normalize(Lr.xz + 1e-4)), 0.0);
        float LS = LKIND > 1.5 ? 1.0 : 0.002;
        acc += thr * (fr * uC[5].rgb * hl * LS + rim * (uC[5].rgb * LS * 0.06 + vec3(0.004)) * (0.1 + 2.0 * sideL * sideL));
        dl += thr * fr * envR;
        thr *= (1.0 - fr) * vec3(0.93, 0.97, 0.96);
        if (rim > 0.5) thr *= 0.6;
        vec3 p = pg, d = rd; bool inW = false, done = false; float wp = 0.0;
        if (!top && p.y < 0.45) {   // the base: a solid puck of glass that gathers the light
          d = refract(rd, nn, 1.0 / 1.5); done = true;
          acc += thr * (uC[18].rgb * uC[18].w * 0.22 + uC[5].rgb * LS * 0.08 + uC[15].rgb * 3.0); thr *= 0.75;
        } else if (!top && p.y < GW) { d = refract(rd, nn, 1.0 / 1.33); inW = true; if (abs(p.y - GW) < 0.07) acc += thr * (uC[5].rgb * LS * 0.15 + vec3(0.01)); }
        if (!inW && !done) {
          float tw = d.y < 0.0 ? (GW - p.y) / d.y : 1e9; vec3 q = p + d * tw;
          float tx = hitCyl(p + d * 0.01, d, GC, GRi, true) + 0.01;
          if (tw > 0.0 && tw < tx && length(q.xz - GC) < GRi) {
            float fw = 0.02 + 0.98 * pow(1.0 - abs(d.y), 5.0);
            vec3 rs = reflect(d, vec3(0.0, 1.0, 0.0)); acc += thr * fw * uC[5].rgb * pow(max(dot(rs, Lr), 0.0), 600.0) * LS * 2.0;
            dl += thr * fw * envR * 0.5;
            thr *= 1.0 - fw; p = q; d = refract(d, vec3(0.0, 1.0, 0.0), 1.0 / 1.33); inW = true;
          } else { p += d * tx; thr *= 0.9; done = true; }
        }
        if (inW && !done) {
          float tx = hitCyl(p + d * 0.01, d, GC, GRi, true) + 0.01, tb = d.y < 0.0 ? (0.45 - p.y) / d.y : 1e9;
          if (tb < tx) { p += d * tb; wp += tb; acc += thr * (uC[18].rgb * uC[18].w * 0.15 + uC[15].rgb * 1.5); }
          else {
            p += d * tx; wp += tx;
            vec3 no = normalize(vec3(p.x - GC.x, 0.0, p.z - GC.y)), dd = refract(d, -no, 1.33);
            acc += thr * uC[5].rgb * LS * pow(max(dot(reflect(d, -no), Lr), 0.0), 500.0) * 6.0;   // the flame again, faint, in the far wall
            d = dot(dd, dd) < 0.5 ? reflect(d, -no) : dd; thr *= 0.92;
          }
        }
        waterP = clamp(wp / (2.0 * GR), 0.0, 1.0) * (inW ? 1.0 : 0.0);
        if (inW) acc += thr * (uC[5].rgb * LS * pow(max(dot(d, Lr), 0.0), 250.0) * 10.0 + uC[18].rgb * uC[18].w * 0.05 * smoothstep(GW, 0.0, pg.y));   // the flame bent through the water; the sheet's glow off the far wall
        ro = p + d * 0.02; rd = d; hit = true;
      }
  }
  if (!hit) { o = prev; return; }
  vec3 bg = envLook(ro, rd);
  if (uMode != 1) { vec3 a = tone(acc); o = vec4(sqrt(bg * thr + a * a + dl), 0.0); }
  else o = vec4(waterP, 0.0, 0.0, 0.0);
}`,Bt=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uS, uPp;
uniform vec4 uU[9];
uniform vec4 uG[${te}];
uniform int uK;
out vec4 o;
#define NX ${U}
#define NY ${W}
const ivec2 OF[8] = ivec2[8](ivec2(1, 0), ivec2(-1, 0), ivec2(0, 1), ivec2(0, -1), ivec2(1, 1), ivec2(-1, 1), ivec2(1, -1), ivec2(-1, -1));
vec4 st(ivec2 c, int r) { c = clamp(c, ivec2(0), ivec2(NX - 1, NY - 1)); return texelFetch(uS, ivec2(c.x + r * NX, c.y), 0); }
vec4 pp(ivec2 c) { c = clamp(c, ivec2(0), ivec2(NX - 1, NY - 1)); return texelFetch(uPp, c, 0); }
float capOf(vec4 p) { return uU[6].x * (0.8 + 0.4 * p.b); }
float openF(vec4 w, float cap, float g) { return max(smoothstep(0.0004, 0.004, w.x), smoothstep(0.45, 0.72, w.y / cap + (g - 0.5) * 0.45)); }
float pres(vec4 w, vec4 p, float o) { return w.x + uU[4].y * (p.r - 0.5) * o - uU[4].z * w.z; }
float condK(vec4 a, vec4 b) { float c = (a.g + b.g) * 0.5; return 0.05 + 3.0 * c * c; }
float flux(vec4 wi, vec4 pi, float oi, float Pi, vec4 wj, vec4 pj, float wt) {
  float oj = openF(wj, capOf(pj), pj.g);
  float F = uU[4].x * wt * min(oi, oj) * condK(pi, pj) * (pres(wj, pj, oj) - Pi);
  return F > 0.0 ? min(F, 0.1 * wj.x) : max(F, -0.1 * wi.x);
}
float wtot(vec4 w) { return w.x + 0.35 * w.y; }
float depF(vec4 w) {
  if (wtot(w) < 0.004) return 1.0;
  return clamp((uU[7].x + uU[7].y * (1.0 - smoothstep(0.0, 0.08, w.x))) * uU[3].x, 0.0, 1.0);
}
float segD(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0); return length(pa - ba * h); }
float brushCov(vec2 c, vec4 pv) {
  float mode = uU[1].w;
  if (mode < 0.5) return 0.0;
  if (mode > 2.5) {
    vec2 q = c - uU[0].xy; float a = uU[6].z, s = uU[6].w; q = mat2(cos(a), -sin(a), sin(a), cos(a)) * q / s;
    float m = smoothstep(1.0, 0.75, length((q - vec2(0.0, 0.32)) / vec2(0.6, 0.47)));
    m = max(m, smoothstep(1.0, 0.7, length((q - vec2(-0.66, -0.36)) / vec2(0.2, 0.25))));
    m = max(m, smoothstep(1.0, 0.7, length((q - vec2(-0.23, -0.74)) / vec2(0.2, 0.25))));
    m = max(m, smoothstep(1.0, 0.7, length((q - vec2(0.23, -0.74)) / vec2(0.2, 0.25))));
    m = max(m, smoothstep(1.0, 0.7, length((q - vec2(0.66, -0.36)) / vec2(0.2, 0.25))));
    return m * (0.6 + 0.6 * pv.a);
  }
  float r = uU[1].x, d = segD(c, uU[0].xy, uU[0].zw);
  float cov = 1.0 - smoothstep(r * 0.45, r, d + (pv.a - 0.5) * r * 0.4);
  float th = uU[6].y;
  if (th > 0.0) cov *= smoothstep(th - 0.1, th + 0.1, pv.r * 0.8 + pv.a * 0.2);
  return cov;
}
void main() {
  ivec2 fc = ivec2(gl_FragCoord.xy);
  int reg = fc.x / NX; ivec2 c = ivec2(fc.x - reg * NX, fc.y);
  vec4 wi = st(c, 0), pi = pp(c);
  float capi = capOf(pi), oi = openF(wi, capi, pi.g), Pi = pres(wi, pi, oi), dt = uU[3].x, simT = uU[3].y;
  vec2 cc = vec2(c) + 0.5;
  float cov = brushCov(cc, pi);
  float Lw = uU[1].y, kB = uU[1].z;
  float dW = cov > 0.0 ? (Lw > wi.x ? (Lw - wi.x) * cov * kB : (Lw - wi.x) * cov * kB * 0.25) : 0.0;
  int ng = int(uU[7].w);
  if (reg == 0) {
    float sF = 0.0, sS = 0.0, ring = 0.0;
    for (int k = 0; k < uK; k++) {
      ivec2 cj = c + OF[k]; float wt = k < 4 ? 1.0 : 0.6;
      vec4 wj = st(cj, 0), pj = pp(cj);
      sF += flux(wi, pi, oi, Pi, wj, pj, wt);
      float capj = capOf(pj);
      float src = wj.y > wi.y ? wj.y / capj : wi.y / capi;
      float S = uU[5].z * wt * smoothstep(0.42, 0.72, src) * condK(pi, pj) * (wj.y - wi.y);
      sS += S > 0.0 ? min(S, 0.1 * wj.y) : max(S, -0.1 * wi.y);
      ring += smoothstep(0.002, 0.03, st(c + OF[k] * 2, 0).x);
    }
    float w = wi.x + sF + dW, s = wi.y + sS;
    for (int g = 0; g < ng; g++) {
      vec4 G = uG[g]; float ph = simT - G.z; if (ph < 0.0) continue;
      vec2 dd = cc - G.xy; float k = exp(-dot(dd, dd) / (G.w * G.w));
      if (ph < 1.0) w -= w * min(1.0, k * 8.0 * dt);
      else if (ph < 18.0 && wi.y > 0.4 * capi) w += k * 0.06 * dt * (1.0 - ph / 18.0);
    }
    w = max(w, 0.0);
    float ab = min(w, uU[4].w * dt * max(capi - s, 0.0)); w -= ab; s += ab;
    w -= min(w, dt * (uU[5].x + uU[5].y * wi.z));
    s -= dt * uU[5].w * (1.0 - smoothstep(0.0, 0.01, w)) * (0.4 + 0.6 * s / capi);
    s = max(s, 0.0);
    if (s > capi) { w += s - capi; s = capi; }
    float E = smoothstep(0.002, 0.03, wi.x) * clamp(1.0 - ring / 8.0, 0.0, 1.0);
    float fx = wi.w;
    if (w < 0.001 && s < 0.25 * capi) fx = min(1.0, fx + dt * 0.1);
    o = vec4(w, s, E, fx);
    return;
  }
  vec4 Pc = st(c, 1), Dc = st(c, 2);
  float dfi = depF(wi);
  float lf = wtot(wi) < 0.004 ? 0.0 : clamp(dt * (uU[7].z * smoothstep(0.003, 0.08, wi.x) * (1.0 - 0.9 * wi.w) + uU[3].w * cov), 0.0, 0.3);
  vec4 dep = Pc * dfi, lift = Dc * lf;
  if (reg == 2) { o = Dc + dep - lift; return; }
  float wti = wtot(wi);
  vec4 ci = Pc * (1.0 - dfi) / max(wti, 1e-4), adv = vec4(0.0);
  for (int k = 0; k < uK; k++) {
    ivec2 cj = c + OF[k]; float wt = k < 4 ? 1.0 : 0.6;
    vec4 wj = st(cj, 0), pj = pp(cj), Pj = st(cj, 1);
    float F = flux(wi, pi, oi, Pi, wj, pj, wt);
    float wtj = wtot(wj);
    vec4 cj4 = Pj * (1.0 - depF(wj)) / max(wtj, 1e-4);
    adv += F > 0.0 ? F * cj4 : F * ci;
    float oj = openF(wj, capOf(pj), pj.g);
    adv += uU[8].x * wt * min(oi, oj) * condK(pi, pj) * min(wti, wtj) * (cj4 - ci);
  }
  vec4 Cb = uU[2];
  vec4 bP = dW > 0.0 ? dW * Cb : dW * ci;
  bP += (Cb * max(wi.x + dW, 0.0) - Pc * (1.0 - dfi)) * cov * uU[3].z;
  vec4 r = Pc - dep + lift + adv + bP;
  for (int g = 0; g < ng; g++) {
    vec4 G = uG[g]; float ph = simT - G.z; if (ph < 0.0 || ph > 1.0) continue;
    vec2 dd = cc - G.xy; r -= r * min(1.0, exp(-dot(dd, dd) / (G.w * G.w)) * 5.0 * dt);
  }
  o = max(r, 0.0);
}`,Ut=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uS, uPp;
uniform vec4 uV;
out vec4 o;
#define NX ${U}
#define NY ${W}
vec4 W(ivec2 c) { c = clamp(c, ivec2(0), ivec2(NX - 1, NY - 1)); return texelFetch(uS, c, 0); }
float hb(ivec2 c) { vec4 w = W(c); return w.x * 0.5 + w.y; }
void main() {
  ivec2 fc = ivec2(gl_FragCoord.xy);
  if (fc.x < NX) {
    vec4 P = texelFetch(uS, fc + ivec2(NX, 0), 0), D = texelFetch(uS, fc + ivec2(2 * NX, 0), 0), w = texelFetch(uS, fc, 0);
    vec3 d = D.rgb + P.rgb * 1.2;
    float g = (D.a + P.a * 1.2) / max(d.r + d.g + d.b, 1e-4);
    float cap = uV.x * (0.8 + 0.4 * texelFetch(uPp, fc, 0).b);
    d += vec3(0.05, 0.045, 0.035) * clamp(w.y / cap, 0.0, 1.0) * uV.y;
    o = vec4(d, clamp(g, 0.0, 1.0));
  } else {
    ivec2 c = ivec2(fc.x - NX, fc.y);
    vec4 w = W(c);
    float fx = W(c + ivec2(1, 0)).x - W(c - ivec2(1, 0)).x, fy = W(c + ivec2(0, 1)).x - W(c - ivec2(0, 1)).x;
    float bx = (hb(c + ivec2(5, 0)) - hb(c - ivec2(5, 0))) * 0.1 + (hb(c + ivec2(11, 0)) - hb(c - ivec2(11, 0))) * 0.045;
    float by = (hb(c + ivec2(0, 5)) - hb(c - ivec2(0, 5))) * 0.1 + (hb(c + ivec2(0, 11)) - hb(c - ivec2(0, 11))) * 0.045;
    float cap = uV.x * (0.8 + 0.4 * texelFetch(uPp, c, 0).b);
    o = vec4(fx * 0.25 + bx, fy * 0.25 + by, smoothstep(0.003, 0.07, w.x), clamp(w.y / cap, 0.0, 1.0));
  }
}`,Gt=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; out vec4 o;
uniform sampler2D uB0, uB1, uDp, uN;
uniform vec4 uF[17];
uniform vec4 uG[${te}];
#define GRD vec2(${U}.0, ${W}.0)
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, s, -s, c); }
float luma(vec3 c) { return dot(c, vec3(0.3, 0.55, 0.15)); }
void main() {
  ivec2 pc = ivec2(gl_FragCoord.xy);
  vec4 b0 = texelFetch(uB0, pc, 0), b1 = texelFetch(uB1, pc, 0);
  vec3 col = b0.rgb * b0.rgb;
  float S = uF[1].w, tm = uF[2].w;
  vec3 rd = normalize(uF[3].xyz + (vUv.x * 2.0 - 1.0) * uF[0].w * uF[1].xyz + (vUv.y * 2.0 - 1.0) * uF[0].w * uF[2].xyz);
  if (b0.a > 0.5) {
    float t = (uF[5].z - uF[0].y) / rd.y; vec3 p = uF[0].xyz + rd * t;
    vec2 d = p.xz - uF[4].xy, lp = vec2(uF[4].z * d.x + uF[4].w * d.y, -uF[4].w * d.x + uF[4].z * d.y);
    vec2 uv = lp / (2.0 * uF[5].xy) + 0.5;
    vec4 nz = texture(uN, uv * vec2(6.0, 4.5) + 0.31);
    vec2 cj = clamp(uv * GRD + (nz.rg - 0.5) * 0.5, vec2(0.5), GRD - 0.5);
    vec4 A = texture(uDp, vec2(cj.x / (2.0 * GRD.x), cj.y / GRD.y));
    vec4 B = texture(uDp, vec2((cj.x + GRD.x) / (2.0 * GRD.x), cj.y / GRD.y));
    float tooth = texture(uN, uv * vec2(4.0, 3.0) + uF[14].w).b;
    vec3 dn = A.rgb * (1.0 - uF[3].w);
    float gf = A.a;
    float gr = texture(uN, uv * vec2(9.0, 6.75) + 0.13).a * 0.5 + tooth * 0.5;
    dn *= max(0.0, 1.0 + uF[13].w * (0.5 - tooth) * 0.2 + uF[14].x * gf * (0.52 - gr) * 1.5);
    vec3 Tr = exp(-2.0 * dn);
    vec3 litW = col / max(uF[13].rgb, vec3(1e-3));
    vec3 c = col * Tr;
    if (uF[5].w > 0.0) {
      float m = max(dn.r, max(dn.g, dn.b)), cov = 1.0 - exp(-2.2 * (dn.r + dn.g + dn.b));
      vec3 body = exp(-2.2 * dn / max(m, 1e-3)) * 0.85;
      c = mix(c, litW * body, uF[5].w * cov);
    }
    // the light at this point, and the buckled, wet surface
    vec3 L; float at;
    if (uF[6].w > 1.5) { L = normalize(uF[6].xyz); at = 1.0; }
    else { vec3 dl = uF[6].xyz - p; float d2 = dot(dl, dl); L = dl * inversesqrt(d2); at = 260.0 / d2; if (uF[6].w < 0.5) at *= smoothstep(uF[15].w, uF[15].w + 0.3, dot(-L, uF[15].xyz)); }
    vec2 g = B.xy * uF[14].y;
    vec3 nl = normalize(vec3(-g.x, 1.0, -g.y)), nd = normalize(vec3(-g.x * 0.35, 1.0, -g.y * 0.35));
    vec3 N = normalize(vec3(uF[4].z * nl.x - uF[4].w * nl.z, nl.y, uF[4].w * nl.x + uF[4].z * nl.z));
    vec3 Nd = normalize(vec3(uF[4].z * nd.x - uF[4].w * nd.z, nd.y, uF[4].w * nd.x + uF[4].z * nd.z));
    float rat = max(dot(Nd, L), 0.0) / max(L.y, 0.08);
    c *= mix(1.0, rat, 0.8);
    vec3 V = -rd, H = normalize(L + V);
    float nh = max(dot(N, H), 0.0), lit = clamp(luma(litW) * 2.5, 0.0, 1.0);
    float fr = 0.03 + 0.25 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    vec3 Lc = uF[7].rgb * at * lit;
    float gl = B.z;
    c += Lc * gl * (pow(nh, 700.0) * 45.0 + pow(nh, 90.0) * 1.1) * fr * 4.0;
    c += Lc * B.w * (1.0 - gl) * pow(nh, 18.0) * 0.035;
    c = mix(c, c * 0.9 + vec3(0.002, 0.002, 0.003), gl * 0.25);
    if (uF[9].w > 0.5 && gf > 0.05) {
      vec4 fl = texture(uN, uv * vec2(48.0, 36.0) + 0.7);
      vec3 fN = normalize(N + (fl.rgb - 0.5) * vec3(1.4, 0.2, 1.4));
      float cov = 1.0 - exp(-1.5 * (dn.r + dn.g + dn.b));
      c += vec3(1.0, 0.75, 0.35) * Lc * pow(max(dot(fN, H), 0.0), 50.0) * gf * cov * 3.0;
      c += vec3(0.5, 0.36, 0.12) * litW * gf * cov * 0.12;
    }
    int ng = int(uF[14].z);
    for (int i = 0; i < ng; i++) {
      vec4 G = uG[i]; if (G.z > tm) continue;
      vec2 q = (uv - G.xy) * 2.0 * uF[5].xy;
      float a = smoothstep(G.w, G.w * 0.5, max(abs(q.x + q.y * 0.4), abs(q.y - q.x * 0.3)));
      vec4 cn = textureLod(uN, q * 2.0 + float(i) * 0.13, 0.0);
      c = mix(c, litW * (0.8 + 0.4 * cn.r) + Lc * pow(cn.g, 6.0) * 2.0, a * 0.85);
    }
    col = c;
  }
  if (b1.r > 0.001) {
    vec3 K = uF[8].rgb;
    col *= exp(-K * b1.r * 3.0);
    float sw = texture(uN, gl_FragCoord.xy / S * vec2(1.6, 2.4) + vec2(tm * 0.013, tm * 0.021)).g;
    float sw2 = texture(uN, gl_FragCoord.xy / S * vec2(3.1, 1.2) - vec2(tm * 0.017, tm * 0.008)).r;
    col += exp(-K * 0.8) * (0.012 + luma(col) * 0.6) * uF[8].w * b1.r * smoothstep(0.35, 0.8, sw * 0.6 + sw2 * 0.5);
  }
  if (b1.g > 0.001) col *= mix(vec3(1.0), exp(-uF[8].rgb * 2.5), b1.g);
  if (b1.b > 0.01) {
    int id = int(b1.b * 8.0 + 0.5) - 1;
    if (id == int(uF[9].x + 0.5)) {
      float sh = texture(uN, gl_FragCoord.xy / S * 6.0 + tm * 0.02).b;
      col *= 1.08 + 0.25 * uF[9].y;
      col += vec3(0.05) * smoothstep(0.62, 0.8, sh) * (0.4 + uF[9].y);
    }
  }
  if (b1.a > 0.5 && uF[9].z > 0.5) {
    vec2 q = gl_FragCoord.xy / S;
    float r1 = texture(uN, vec2(q.x * 7.0, q.y * 0.9 + tm * 0.21)).b, r2 = texture(uN, vec2(q.x * 13.0 + 0.4, q.y * 1.6 + tm * 0.33)).b;
    float bead = smoothstep(0.84, 0.95, texture(uN, q * vec2(9.0, 7.0) + 0.5).g);
    col += vec3(0.5, 0.55, 0.65) * (smoothstep(0.78, 0.92, r1) * 0.045 + smoothstep(0.83, 0.95, r2) * 0.03 + bead * 0.035);
  }
  if (uF[6].w > 0.5 && uF[6].w < 1.5) col *= mix(1.0, uF[7].w, b0.a > 0.5 ? 0.92 : clamp((col.r - col.b * 1.4) / max(col.r, 1e-4) * 1.3, 0.0, 1.0) * (1.0 - b1.a));
  if (uF[11].w > 0.5 && b1.a > 0.5) {   // the candle's flame mirrored in the window pane, faint and doubled by the glass
    vec2 q = (vUv - uF[11].xy) / uF[11].z, q2 = q - vec2(2.0 / (S * uF[11].z), 0.0);
    col += vec3(1.0, 0.62, 0.28) * 0.07 * (smoothstep(1.0, 0.2, length(q / vec2(0.13, 0.5))) + 0.6 * smoothstep(1.0, 0.2, length(q2 / vec2(0.13, 0.5))));
  }
  if (uF[10].w > 0.5) {
    vec2 q = (vUv - uF[10].xy) / uF[10].z;
    float w = 0.24 * (1.0 - smoothstep(-0.1, 1.0, q.y)) * smoothstep(-0.55, -0.1, q.y) + 0.02;
    float fl = smoothstep(1.0, 0.4, abs(q.x) / max(w, 1e-3)) * step(-0.5, q.y) * step(q.y, 1.0);
    float core = smoothstep(1.0, 0.0, length(vec2(q.x / 0.1, (q.y + 0.05) / 0.35)));
    vec3 fc = mix(vec3(1.0, 0.45, 0.08), vec3(1.0, 0.85, 0.5), smoothstep(0.9, 0.2, abs(q.x) / max(w, 1e-3)));
    fc = mix(fc, vec3(0.25, 0.35, 1.0) * 0.6, smoothstep(-0.25, -0.5, q.y) * 0.8);
    float wy = clamp((q.y + 0.6) / 0.42, 0.0, 1.0), wk = smoothstep(0.04, 0.018, abs(q.x - 0.06 * wy * wy)) * step(-0.62, q.y) * step(q.y, -0.2);
    col = mix(col, vec3(0.012, 0.008, 0.006), wk);
    col = mix(col, fc * 1.3, fl * 0.95);
    col = mix(col, col * vec3(0.32, 0.2, 0.2), smoothstep(1.0, 0.2, length(vec2(q.x / 0.075, (q.y + 0.34) / 0.14))) * fl);
    col += vec3(1.0, 0.35, 0.05) * smoothstep(0.045, 0.0, length(q - vec2(0.054, -0.21))) * 0.7;
    col += vec3(1.0, 0.95, 0.8) * core * 0.6;
    col += vec3(1.0, 0.55, 0.2) * 0.012 / (dot(q * vec2(1.0, 0.6), q * vec2(1.0, 0.6)) * 0.4 + 0.02) * uF[7].w * 0.08;
  }
  float dith = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  o = vec4(sqrt(max(col, 0.0)) + dith / 255.0, 1.0);
}`;function D0(a,e){const v=(P,B)=>{const A=a.createShader(P);return a.shaderSource(A,B),a.compileShader(A),A},w=a.createProgram(),p=v(a.VERTEX_SHADER,Ao),T=v(a.FRAGMENT_SHADER,e);return a.attachShader(w,p),a.attachShader(w,T),a.linkProgram(w),{p:w,u:{},sh:[p,T]}}const Fo=["room","roomW","props","propsT","glass","sim","disp","comp"],oe=(a,e,v)=>{if(a.indexOf(e)<0)throw new Error("046 NF "+e);return a.split(e).join(v)};function _t(a,e){return a=oe(a,"texelFetch(uS, ","tS("),a=oe(a,"uniform sampler2D uS, uPp;",`uniform highp usampler2D uS;
uniform sampler2D uPp;
vec4 tS(ivec2 c, int l) { return uintBitsToFloat(texelFetch(uS, c, l)); }`),e===2?a:(a=oe(a,"out vec4 o;",e?`out highp uvec4 oU;
vec4 o;
highp uint hb16(float v) { return packHalf2x16(vec2(v, 0.0)); }`:`out highp uvec4 oU;
vec4 o;`),a=oe(a,"void main() {","void main0() {"),a+(e?`
void main() { main0(); oU = uvec4(hb16(o.r), hb16(o.g), hb16(o.b), hb16(o.a)); }`:`
void main() { main0(); oU = floatBitsToUint(o); }`))}function Mo(a){return a=oe(a,"uniform sampler2D uB0, uB1, uDp, uN;",`uniform sampler2D uB0, uB1, uN;
uniform highp usampler2D uDp;
vec4 dpF(ivec2 c, ivec2 sz) { highp uvec4 u = texelFetch(uDp, clamp(c, ivec2(0), sz - 1), 0); return vec4(unpackHalf2x16(u.r).x, unpackHalf2x16(u.g).x, unpackHalf2x16(u.b).x, unpackHalf2x16(u.a).x); }
vec4 dpT(vec2 uv) { ivec2 sz = textureSize(uDp, 0); vec2 p = uv * vec2(sz) - 0.5, f = fract(p); ivec2 i = ivec2(floor(p));
  return mix(mix(dpF(i, sz), dpF(i + ivec2(1, 0), sz), f.x), mix(dpF(i + ivec2(0, 1), sz), dpF(i + ivec2(1, 1), sz), f.x), f.y); }`),oe(a,"texture(uDp, ","dpT(")}function Co(){const e=(b,z,G,C)=>{b=(b%G+G)%G,z=(z%G+G)%G;let j=b*374761393+z*668265263+C*2246822519|0;return j=Math.imul(j^j>>>13,1274126177),j^=j>>>16,(j>>>0)/4294967296},v=(b,z)=>{const G=new Float32Array(b*b);for(let C=0;C<b;C++)for(let j=0;j<b;j++)G[C*b+j]=e(j,C,b,z);return G},w=(b,z)=>({P:b,a:v(b,z)}),p=(b,z,G)=>{const C=b.P,j=z*C/256,O=G*C/256,i0=Math.floor(j),H0=Math.floor(O),k=j-i0,A0=O-H0,h0=k*k*(3-2*k),Ce=A0*A0*(3-2*A0),ke=(i0+1)%C,Le=(H0+1)%C,K0=b.a;return r0(r0(K0[H0*C+i0],K0[H0*C+ke],h0),r0(K0[Le*C+i0],K0[Le*C+ke],h0),Ce)},T=[w(4,1),w(8,2),w(16,3),w(32,4)],P=[w(16,5),w(32,6),w(64,7)],B=[w(64,8),w(128,9)],A=[w(32,10),w(64,11)],I=new Float32Array(256*256*4);for(let b=0;b<256;b++)for(let z=0;z<256;z++){const G=(b*256+z)*4;I[G]=p(T[0],z,b)*.53+p(T[1],z,b)*.27+p(T[2],z,b)*.13+p(T[3],z,b)*.07,I[G+1]=p(P[0],z,b)*.57+p(P[1],z,b)*.29+p(P[2],z,b)*.14;const C=p(B[0],z,b)*.65+p(B[1],z,b)*.35;I[G+2]=C,I[G+3]=p(A[0],z,b)*.65+p(A[1],z,b)*.35}const u0=new Uint8Array(256*256*4);for(let b=0;b<4;b++){let z=1,G=0;for(let C=b;C<I.length;C+=4)I[C]<z&&(z=I[C]),I[C]>G&&(G=I[C]);for(let C=b;C<I.length;C+=4)u0[C]=Math.round((I[C]-z)/Math.max(1e-6,G-z)*255)}return u0}function ko(a,e,v){let w=Pt.get(a);const p="r"+e,T="t"+v;if(w&&w.v[p]&&w.v[T])return w;const P=()=>D0(a,Dt.replace("#define ROOMP",`#define ROOMP
#define RSET 1
#define RMIR
#define DSK `+e)),B=()=>D0(a,qt.replace("#define NBOX",`#define PSET 1
`+(v?"#define CNDL":"#define NOWARM")+`
#define NBOX`));if(w)return w.v[p]||(w.v[p]=P()),w.v[T]||(w.v[T]=B()),a.flush(),w;const A=!!a.getExtension("EXT_color_buffer_float"),I=A||!!a.getExtension("EXT_color_buffer_half_float");a.getExtension("KHR_parallel_shader_compile");const u0={};u0[p]=P();const b=D0(a,Dt.replace("#define ROOMP",`#define ROOMP
#define RSET 2`)),z=D0(a,qt.replace("#define NBOX",`#define PSET 2
#define NBOX`));return u0[T]=B(),w={v:u0,roomW:b,props:z,glass:D0(a,Ro),sim:D0(a,A?Bt:_t(Bt,0)),disp:D0(a,A?Ut:_t(Ut,I?2:1)),comp:D0(a,I?Gt:Mo(Gt)),vao:a.createVertexArray(),fl:A,hf:I},a.flush(),w.nd=Co(),w.noise=a.createTexture(),a.bindTexture(a.TEXTURE_2D,w.noise),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,256,256,0,a.RGBA,a.UNSIGNED_BYTE,w.nd),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.REPEAT),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.REPEAT),Pt.set(a,w),w}const It={room:{uN:0,uE:2},roomW:{uN:0,uE:2},props:{uN:0,uE:2},propsT:{uN:0,uE:2},glass:{uN:0,uPrev:1},sim:{uS:0,uPp:1},disp:{uS:0,uPp:1},comp:{uB0:0,uB1:1,uDp:2,uN:3}};function Lo(a,e,v){const w=Fo.map(p=>[p,v[p]||e[p]]).filter(p=>!p[1].ok);for(const[p,T]of w)if(!a.getProgramParameter(T.p,a.LINK_STATUS))throw new Error("046 link "+p+": "+a.getProgramInfoLog(T.p)+" "+a.getShaderInfoLog(T.sh[1]));for(const[,p]of w){const T=a.getProgramParameter(p.p,a.ACTIVE_UNIFORMS);for(let P=0;P<T;P++){const B=a.getActiveUniform(p.p,P);p.u[B.name.replace(/\[0\]$/,"")]=a.getUniformLocation(p.p,B.name)}}for(const[p,T]of w){a.useProgram(T.p);for(const P in It[p])T.u[P]&&a.uniform1i(T.u[P],It[p][P]);T.ok=!0}}function d0(a,e,v,w,p,T,P,B){const A=a.createTexture();return a.bindTexture(a.TEXTURE_2D,A),a.texImage2D(a.TEXTURE_2D,0,w,e,v,0,p,T,B||null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,P),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,P),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),A}function W0(a,e){const v=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,v),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),v}function z0(a,e){const v=a.slice(2);let w=parseInt(v.slice(e*8%56,e*8%56+8),16)>>>0,p=parseInt(v.slice(8,16),16)^e*2654435769,T=parseInt(v.slice(32,40),16)>>>0,P=parseInt(v.slice(56,64),16)+e>>>0;const B=()=>{w>>>=0,p>>>=0,T>>>=0,P>>>=0;const A=w+p+P>>>0;return P=P+1>>>0,w=p^p>>>9,p=T+(T<<3)>>>0,T=(T<<21|T>>>11)>>>0,T=T+A>>>0,A/4294967296};for(let A=0;A<16;A++)B();return B}const No={"Earth tones":[[[.8,.6,.25],.35],[[.74,.46,.2],.3],[[.62,.3,.16],.45],[[.36,.24,.16],.55],[[.62,.24,.2],.25],[[.27,.32,.4],.35]],"Sea blues":[[[.22,.3,.7],.9],[[.32,.6,.82],.75],[[.08,.5,.56],0],[[.36,.72,.7],.4],[[.16,.19,.31],.15],[[.78,.55,.3],.35]],Botanical:[[[.86,.28,.45],0],[[.95,.4,.65],0],[[.47,.6,.18],.1],[[.17,.29,.22],.1],[[.97,.86,.26],0],[[.56,.55,.8],.6]],"Gold and indigo":[[[.16,.2,.36],.2],[[.1,.26,.42],.1],[[.8,.6,.24],2],[[.88,.78,.48],2],[[.35,.27,.2],.4],[[.86,.62,.18],0]]},So={"Earth tones":{sky:5,sea:5,land:1,dark:3,warm:0,flower:4,accent:2,leaf:1},"Sea blues":{sky:1,sea:0,land:3,dark:4,warm:5,flower:0,accent:2,leaf:3},Botanical:{sky:5,sea:5,land:2,dark:3,warm:4,flower:0,accent:1,leaf:2},"Gold and indigo":{sky:0,sea:1,land:4,dark:1,warm:5,flower:2,accent:3,leaf:4}};St.add({num:46,name:"Watercolours",fam:"Worlds",recipe:"A drawing board on a desk at night with watercolour paper, a glass of rinse water, a tin of paints and a jar of brushes. The paint spreads and dries with a dark rim, while an unseen hand paints a landscape. The paints and the painting change every mint. Tap a pan to load the brush and drag to paint, hold still to drop clean water, or tap the glass to rinse.",interactive:"Tap a pan to load the brush with its colour, then drag on the paper to paint; touch a colour into a wet wash and it blooms. Hold still on the paper to drop clean water, which lifts and pushes back what is there. Tap the water glass to rinse the brush and cloud the water. When you stop, the unseen hand carries on.",music:!0,gl:!0,fps:30,seed:0,make(a){const e=a.gl,v=a.size,w=z0(a.hash,0),p=z0(a.hash,1),T=z0(a.hash,2),P=z0(a.hash,3),B=(t,o)=>{o=o||w;let r=0;for(const s of t)r+=s[1];let c=o()*r;for(const s of t)if(c-=s[1],c<=0)return s[0];return t[t.length-1][0]},A=(t,o,r)=>t+(o-t)*(r||p)();let I=B([["Earth tones",30],["Sea blues",30],["Botanical",30],["Gold and indigo",9]]),u0=B([["Cold-press white",42],["Hot-press smooth",26],["Toned cream",24],["Indigo-dyed",7]]),b=B([["Hills",30],["Sea",28],["Flowers",22],["Sky",20]]),z=B([["Oak",42],["Painted table",32],["Slate windowsill",26]]),G=B([["Lamp",50],["Candle",28],["Moonlight",22]]),C=B([["Quiet night",62],["Rain",38]]),j=B([["None",82],["Cat's paw print",6],["Tea ring",6],["Salt starbursts",6]]);a.home&&(I="Sea blues",u0="Cold-press white",b="Sea",z="Oak",G="Lamp",C="Rain",j="None"),u0==="Indigo-dyed"&&I!=="Gold and indigo"&&w()<.5&&(I="Gold and indigo"),j==="Salt starbursts"&&b==="Flowers"&&(b="Sky"),a.trait("Palette",I),a.trait("Paper",u0),a.trait("Painting",b),a.trait("Desk",z),a.trait("Light",G),a.trait("Weather",C),a.trait("Rare",j);const O={Lamp:0,Candle:1,Moonlight:2}[G],i0={Oak:0,"Painted table":1,"Slate windowsill":2}[z],H0=O===1?1:0,k=ko(e,i0,H0),A0={room:k.v["r"+i0],propsT:k.v["t"+H0]},h0={"Cold-press white":0,"Hot-press smooth":1,"Toned cream":2,"Indigo-dyed":3}[u0],Ce=C==="Rain",ke=j==="Cat's paw print",Le=j==="Tea ring",K0=j==="Salt starbursts",Po=No[I],fe=So[I],Do=I==="Gold and indigo",qo=t=>Math.pow(t,2.2),tt=Po.map(([t,o])=>({K:t.map(c=>-Math.log(Math.max(qo(c),.001))/2),g:o})),Z=a.home||p()<.5?1:-1,ae=14,re=10.5,ot=.7,pe=ot+.07,Bo=z0(a.hash,978);let at=B([["Taped to the board",64],["Loose deckled sheet",36]],Bo);a.home&&(at="Taped to the board"),a.trait("Mount",at);const Uo=at==="Taped to the board"?1:0,c0=-2.5*Z+A(-.6,.6),e0=.8+A(-.5,.5),rt=A(-.05,.05),q0=Math.cos(rt),B0=Math.sin(rt),Ot=z0(a.hash,977);Ot();let R0=B([["Overhead",26],["Across the desk",28],["Close on the sheet",18],["Low along the sheet",28]],Ot);a.home&&(R0="Overhead"),a.trait("View",R0);let H=[c0+Z*1.5,88,e0+26],Ne=[c0,0,e0-3.6],m0=.22;R0==="Across the desk"?(H=[Z*34,35,46],Ne=[-Z*3.5,0,-5.5]):R0==="Close on the sheet"?(H=[c0+Z*10,26,e0+22],Ne=[c0-Z*1.5,0,e0-1.5]):R0==="Low along the sheet"&&(H=[c0+Z*13,13.5,e0+17],Ne=[c0-Z*3,0,e0-7]);const F0=(t,o)=>[t[0]-o[0],t[1]-o[1],t[2]-o[2]],s0=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],U0=t=>{const o=Math.hypot(t[0],t[1],t[2]);return[t[0]/o,t[1]/o,t[2]/o]},Se=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]];let K=U0(F0(Ne,H)),$=U0(Se(K,[0,1,0])),t0=Se($,K);const V0=(t,o,r)=>{const c=[t-H[0],o-H[1],r-H[2]],s=s0(c,K);return[(s0(c,$)/(s*m0)+1)/2,(s0(c,t0)/(s*m0)+1)/2]},Xt=(t,o)=>{const r=1-o,c=[K[0]+(t*2-1)*m0*$[0]+(r*2-1)*m0*t0[0],K[1]+(t*2-1)*m0*$[1]+(r*2-1)*m0*t0[1],K[2]+(t*2-1)*m0*$[2]+(r*2-1)*m0*t0[2]],s=(pe-H[1])/c[1],i=H[0]+c[0]*s-c0,n=H[2]+c[2]*s-e0;return[(q0*i+B0*n)/(2*ae)+.5,(-B0*i+q0*n)/(2*re)+.5]},Go=(t,o)=>{const r=(t-.5)*2*ae,c=(o-.5)*2*re;return[c0+q0*r-B0*c,e0+B0*r+q0*c]},Pe=-24,ce=-Z*(13.9+A(-.5,.5)),ie=-15.6+A(-.6,.5),De=3.3,ct=10.5,it=A(6.6,8.4),st=[],Y0=[],de=(t,o,r,c)=>{for(let s=0;s<8;s++)Y0.push([t+Math.cos(s*P0/8)*c,o,r+Math.sin(s*P0/8)*c])},w0=(t,o,r,c,s,i)=>st.push({a:[o[0],o[1],o[2],t],b:[r[0],r[1],r[2],r[3]||0],c:[c[0],c[1],c[2],s],d:i||[0,0,0,0]}),jt=-Z*3.3+A(-.3,.3),Wt=-15.9+A(-.4,.4),ue=Math.PI/2+Z*A(.03,.12);w0(0,[c0,ot/2,e0],[ae+1.3,ot/2,re+1.3],[.5,.45,.34],8,[rt,.1,0,0]),w0(0,[jt,.6,Wt],[3.3,.6,5.3],[.01,.01,.012],1,[ue,.35,0,0]);const Ht=(t,o)=>[jt+Math.cos(ue)*t-Math.sin(ue)*o,1.2,Wt+Math.sin(ue)*t+Math.cos(ue)*o];for(const t of[[-3.3,-5.3],[3.3,-5.3],[-3.3,5.3],[3.3,5.3]])Y0.push(Ht(t[0],t[1]));de(ce,ct,ie,De),de(ce,0,ie,De);const _o=A(-.5,.7),Io=A(-.6,.6),qe=2.9,nt=8.6,Kt=.26,Oo=.6,lt=qe-Kt,he=Z*((O===1?11.2:8.3)+_o*.6),me=Math.min(-15.5+Io*.5,e0-15.6),Xo=[[.42,.5,.4],[.62,.56,.44],[.1,.16,.34],[.4,.18,.1]][Math.floor(p()*4)];for(let t=(2+Math.floor(p()*2))*6;t>0;t--)p();const o0=z0(a.hash,979),Y=(t,o)=>t+(o-t)*o0(),jo=(t,o,r,c)=>{const s=F0(o,t),i=F0(c,r),n=F0(t,r),d=s0(s,s),N=s0(i,i),F=s0(i,n),X=s0(s,n),Q=s0(s,i),h=d*N-Q*Q;let m=h>1e-9?p0((Q*F-X*N)/h,0,1):0,l=(Q*m+F)/N;return l<0?(l=0,m=p0(-X/d,0,1)):l>1&&(l=1,m=p0((Q-X)/d,0,1)),Math.hypot(n[0]+s[0]*m-i[0]*l,n[1]+s[1]*m-i[1]*l,n[2]+s[2]*m-i[2]*l)};if(R0!=="Close on the sheet"){w0(1,[he,0,me],[qe,nt,Kt],Xo,2,[0,.08,0,0]),de(he,0,me,qe),de(he,nt,me,qe);const t=5+Math.floor(o0()*4),o=o0()*P0,r=o0()<.6?Math.floor(o0()*t):-1,c=[],s=[[.3,.04,.025],[.02,.02,.022],[.42,.27,.13],[.06,.15,.09],[.05,.09,.22],[.5,.33,.05]],i=[[.62,.62,.6],[.7,.52,.2],[.72,.4,.24]],n=[[.5,.26,.1],[.1,.07,.05],[.72,.5,.22],[.75,.7,.6]],d=(N,F,X)=>[N[0]+F[0]*X,N[1]+F[1]*X,N[2]+F[2]*X];for(let N=0;N<t;N++){const F=N===r?3:[0,0,0,1,2][Math.floor(o0()*5)],X=[Y(.26,.34),Y(.17,.2),Y(.3,.36),Y(.38,.44)][F],Q=X*.45,h=[Y(10.4,12.6),Y(10.4,12),Y(10,12),Y(9.6,11)][F],m=[Y(2.1,2.6),1.7,Y(2.2,2.6),1.9][F],l=[Y(1.8,2.5),Y(2.3,2.8),Y(1.4,1.8),Y(2.9,3.4)][F];let x=null,u=-1e9;for(let l0=0;l0<12&&u<.1;l0++){const ee=o+(N+Y(-.3,.3))/t*P0,Fe=ee+Math.PI+Y(-1,1),Me=Y(.1,.95)*(lt-Q-.05)*(Math.sin(ee)<-.3?.35:1),ca=[he+Math.cos(ee)*(lt-X),nt+X*.4,me+Math.sin(ee)*(lt-X)],Je=[he+Math.cos(Fe)*Me,Oo+Q,me+Math.sin(Fe)*Me],Eo=U0(F0(ca,Je)),zo=d(Je,Eo,h+m+l);let Qe=9;for(const Nt of c)Qe=Math.min(Qe,jo(Je,zo,Nt[0],Nt[1])-X*1.3-Nt[2]*1.3);Qe>u&&(u=Qe,x=[Je,zo,X,Eo])}c.push(x);const g=x[0],S=x[3],y=d(g,S,h),f=d(y,S,m),M=d(f,S,l),q=o0()*7,_=X*[.82,.72,1.3,1.15][F];w0(2,g,[y[0],y[1],y[2],Q],s[Math.floor(o0()*6)],3,[q,o0()<.4?.1:0,X,Y(-.16,.02)]),w0(2,y,[f[0],f[1],f[2],X*1.03],F===3?[.3,.2,.11]:i[Math.floor(o0()*3)],4,[q,0,_,0]);const L0=n[F===3?o0()<.6?1:3:F===2?2+Math.floor(o0()*2):Math.floor(o0()*3)],N0=o0()<.55?1+Math.floor(o0()*6):0;if(F===3){const l0=d(f,S,.9);w0(2,f,[l0[0],l0[1],l0[2],_],L0,5,[q,0,_*1.4,0]),w0(2,l0,[M[0],M[1],M[2],_*1.4],L0,5,[q,N0,.04,1])}else w0(2,f,[M[0],M[1],M[2],_*(F===2?1:1.08)],L0,5,[q,N0,F===2?_*.94:.03,0]);Y0.push(M,d(M,S,.5))}}const y0=Z*5.3+A(-.3,.3),g0=-18.2,G0=A(5.5,7.5);if(O===1&&(w0(1,[y0,0,g0],[2.2,.5,0,0],[.62,.45,.18],4,[0,.15,0,0]),w0(1,[y0,.5,g0],[1.3,.5+G0,0,0],[.8,.72,.58],6,[0,.2,0,0]),de(y0,0,g0,2.2),Y0.push([y0,G0+3.2,g0])),p()<.65)for(let t=0;t<5;t++)p();if(R0==="Overhead"||R0==="Across the desk")for(const t of[[-1,-1],[1,-1],[-1,1],[1,1]]){const o=t[0]*(ae+1.6),r=t[1]*(re+1.6);Y0.push([c0+q0*o-B0*r,0,e0+B0*o+q0*r])}else for(const t of R0==="Close on the sheet"?[[.28,.9],[.72,.9]]:[[.5,.74]]){const o=Go(t[0],t[1]);Y0.push([o[0],pe,o[1]])}for(let t=0;t<8;t++){let o=1e9,r=-1e9,c=1e9,s=-1e9;for(const d of Y0){const N=F0(d,H),F=s0(N,K),X=s0(N,$)/F,Q=s0(N,t0)/F;o=Math.min(o,X),r=Math.max(r,X),c=Math.min(c,Q),s=Math.max(s,Q)}const i=(o+r)/2,n=(c+s)/2;K=U0([K[0]+i*$[0]+n*t0[0],K[1]+i*$[1]+n*t0[1],K[2]+i*$[2]+n*t0[2]]),$=U0(Se(K,[0,1,0])),t0=Se($,K),m0=Math.max(r-o,s-c)/2*1.055}const Vt=[];for(let t=0;t<6;t++){const o=Ht(t%2?1.35:-1.35,(Math.floor(t/2)-1)*3.2);Vt.push(V0(o[0],1.2,o[2]))}const Wo=st.length,Yt=new Float32Array(S0*4),Zt=new Float32Array(S0*4),$t=new Float32Array(S0*4),Jt=new Float32Array(S0*4);st.forEach((t,o)=>{Yt.set(t.a,o*4),Zt.set(t.b,o*4),$t.set(t.c,o*4),Jt.set(t.d,o*4)});const Qt=new Float32Array(24);tt.forEach((t,o)=>{Qt.set([t.K[0],t.K[1],t.K[2],t.g],o*4)});let n0,v0,Be,Ue,Ge,se,_e=.5,_0=[0,-1,0];O===0?(n0=[-Z*34,30,0],v0=[1*1150,.76*1150,.5*1150],Be=7,Ue=.11,Ge=1.15,se=[.022,.023,.032],_0=U0(F0([c0,0,e0],n0)),_e=.69):O===1?(n0=[y0,.5+G0+1.3,g0],v0=[1*260,.56*260,.24*260],Be=22,Ue=.025,Ge=1.35,se=[.014,.013,.017]):(n0=U0([Z*.32,.62,-1]),v0=[.5,.64,1],Be=40,Ue=.01,Ge=1.6,se=[.016,.022,.04]);const Z0=[[.86,.85,.8],[.9,.89,.85],[.86,.75,.56],[.025,.04,.11]][h0],eo=[1,.25,.9,.9][h0],ft=i0===0?[.27,.165,.09]:i0===1?[[.22,.3,.25],[.16,.22,.3],[.36,.1,.07],[.55,.5,.4]][Math.floor(p()*4)]:[.055,.06,.068],pt=i0===2?[.1,.1,.1]:[.2,.17,.13],$0=i0===2?[-46,46,1.2,90]:[Z*4-26,Z*4+26,5.5,72];{const t=F0([ce,ct*.6,ie],H),o=(Pe-H[2])/t[2],r=(H[0]+t[0]*o-$0[0])/24,c=(r-Math.round(r))*24,s=7.5*o+.8;if(Math.abs(c)<s){const i=(c>=0?-1:1)*(s-Math.abs(c));$0[0]+=i,$0[1]+=i}}const Ie=[p(),p()];let dt;if(O===2)dt=v0.map(t=>t*Math.max(n0[1],0)*.55);else{const t=F0(n0,[c0,pe,e0]),o=U0(t);let r=1/s0(t,t);if(O===0){const c=p0((-s0(o,_0)-_e)/.3,0,1);r*=c*c*(3-2*c)}dt=v0.map(c=>c*r*Math.max(o[1],0))}const ut=Z0.map((t,o)=>t*dt[o]*[3,26,2][O]);let ve=[.175,.11,.097],xe=[.012,.022,.06];O===2&&(ve=ve.map((t,o)=>t*1.5+[.006,.012,.03][o]),xe=xe.map((t,o)=>t*1.5+[.006,.012,.03][o]));const x0=new Float32Array(22*4);x0.set([H[0],H[1],H[2],m0,$[0],$[1],$[2],O,t0[0],t0[1],t0[2],i0,K[0],K[1],K[2],Ge]),x0.set([n0[0],n0[1],n0[2],Be,v0[0],v0[1],v0[2],_e,_0[0],_0[1],_0[2],p()*10],16),x0.set([c0,e0,q0,B0,ae,re,pe,h0===1?.15:1,Z0[0],Z0[1],Z0[2],eo],28),x0.set([ce,ie,De,ct,it,Pe,i0===2?1:0,p(),ft[0],ft[1],ft[2],Uo,pt[0],pt[1],pt[2],0],40),x0.set([$0[0],$0[1],$0[2],$0[3],se[0],se[1],se[2],1,y0,g0,.5+G0,O===1?1:0,Ue,Ie[0],Ie[1],v],56),x0.set([ut[0],ut[1],ut[2],[.12,.8,.5][O],ve[0],ve[1],ve[2],[4,6.5,2][O],xe[0],xe[1],xe[2],[2,2.5,1.5][O],0,0,.32,0],72),Lo(e,k,A0);const Oe=k.vao,ht=d0(e,v,v,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST),to=d0(e,v,v,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST),oo=W0(e,ht),Ho=W0(e,to);e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.bindVertexArray(Oe);const mt=d0(e,v,v,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),vt=W0(e,mt),Xe=d0(e,v,v,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),je=W0(e,Xe),T0=(t,o)=>{const r=t.u;e.useProgram(t.p),e.uniform4fv(r.uC,x0),e.uniform4fv(r.uPa,Yt),e.uniform4fv(r.uPb,Zt),e.uniform4fv(r.uPc,$t),e.uniform4fv(r.uPd,Jt),r.uPan&&e.uniform4fv(r.uPan,Qt),e.uniform1i(r.uNP,Wo),r.uIt&&e.uniform1i(r.uIt,40),e.uniform1i(r.uMode,o)};{e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,k.noise),e.viewport(0,0,v,v);for(let t=0;t<2;t++)e.bindFramebuffer(e.FRAMEBUFFER,t?je:vt),T0(A0.room,t),e.drawArrays(e.TRIANGLES,0,3),T0(k.roomW,t),e.drawArrays(e.TRIANGLES,0,3),T0(k.props,t),e.drawArrays(e.TRIANGLES,0,3),T0(A0.propsT,t),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,t?Ho:oo),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,t?Xe:mt),T0(k.glass,t),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0);e.bindFramebuffer(e.FRAMEBUFFER,null)}const We=[[-.375,-.125],[.125,-.375],[.375,.125],[-.125,.375]];let be=0,Ko=0;function Vo(){x0[84]=We[be][0]/v,x0[85]=We[be][1]/v,e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(Oe),e.viewport(0,0,v,v),e.bindFramebuffer(e.READ_FRAMEBUFFER,vt),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,je),e.blitFramebuffer(0,0,v,v,0,0,v,v,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,je),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,k.noise),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,ht),T0(A0.room,2),e.drawArrays(e.TRIANGLES,0,3),T0(k.roomW,2),e.drawArrays(e.TRIANGLES,0,3),T0(k.props,2),e.drawArrays(e.TRIANGLES,0,3),T0(A0.propsT,2),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,oo),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Xe),e.enable(e.BLEND),e.blendFunc(e.CONSTANT_ALPHA,e.ONE_MINUS_CONSTANT_ALPHA),e.blendColor(0,0,0,1/(be+2)),e.colorMask(!0,!0,!0,!1),T0(k.glass,2),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindVertexArray(null),x0[84]=x0[85]=0,++be===We.length&&(e.deleteFramebuffer(vt),e.deleteTexture(mt),e.deleteFramebuffer(je),e.deleteTexture(Xe))}const Yo=k.nd,Zo=Math.floor(T()*256),$o=Math.floor(T()*256),we=new Uint8Array(U*W*4);let M0=(parseInt(a.hash.slice(10,18),16)|1)>>>0;const ao=()=>(M0^=M0<<13,M0>>>=0,M0^=M0>>>17,M0^=M0<<5,M0>>>=0,M0/4294967296),ne=(t,o,r)=>Yo[((o+$o&255)*256+(t+Zo&255)<<2)+r]/255;for(let t=0;t<W;t++)for(let o=0;o<U;o++){const r=(t*U+o)*4;let c=.85*ne(o,t,2)+.15*ao();h0===1&&(c=.5+(c-.5)*.3);const s=.45*ne(o*2,t*2,1)+.35*ne(o+77,t+31,3)+.2*ne(o*3+5,t*3+9,2);we[r]=c*255,we[r+1]=p0((s-.5)*1.6+.5,0,1)*255,we[r+2]=ne(o>>1,t>>1,0)*255,we[r+3]=(.8*ne(o*2+40,t*2+90,3)+.2*ao())*255}const ro=d0(e,U,W,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,we),He=k.fl?[d0(e,U*3,W,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST),d0(e,U*3,W,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST)]:[d0(e,U*3,W,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST),d0(e,U*3,W,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST)],co=[W0(e,He[0]),W0(e,He[1])],io=k.hf?d0(e,U*2,W,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR):d0(e,U*2,W,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,e.NEAREST),so=W0(e,io),no=new Uint32Array(4);let ye=0;function lo(){e.clearColor(0,0,0,0);for(let t=0;t<2;t++)e.bindFramebuffer(e.FRAMEBUFFER,co[t]),k.fl?e.clear(e.COLOR_BUFFER_BIT):e.clearBufferuiv(e.COLOR,0,no);e.bindFramebuffer(e.FRAMEBUFFER,so),k.hf?e.clear(e.COLOR_BUFFER_BIT):e.clearBufferuiv(e.COLOR,0,no)}lo();const J=h0===1?{kf:.13,kh:.003,kE:.07,ab:.6,E0:.01,E1:.3,cap:.022,Es:.016,capB:.18,D0:.015,D1:.6,L0:.4,Dp:.016,gran:.35}:{kf:.11,kh:.008,kE:.06,ab:.8,E0:.01,E1:.25,cap:.016,Es:.016,capB:.22,D0:.02,D1:.6,L0:.4,Dp:.016,gran:1},R=new Float32Array(36),le=new Float32Array(te*4);let ge=0,Ke=0;const L={mode:0,ax:0,ay:0,bx:0,by:0,r:4,lw:.4,kb:.35,cb:[0,0,0,0],mix:.04,lift:0,dry:0,pa:0,ps:6};function fo(t,o){R[0]=t.ax,R[1]=t.ay,R[2]=t.bx,R[3]=t.by,R[4]=t.r,R[5]=t.lw,R[6]=t.kb,R[7]=t.mode,R[8]=t.cb[0],R[9]=t.cb[1],R[10]=t.cb[2],R[11]=t.cb[3],R[12]=o,R[13]=Ke,R[14]=t.mix,R[15]=t.lift;const r=o/f0;R[16]=Math.min(J.kf*r,.15),R[17]=J.kh,R[18]=J.kE,R[19]=J.ab,R[20]=J.E0,R[21]=J.E1,R[22]=Math.min(J.cap*r,.1),R[23]=J.Es,R[24]=J.capB,R[25]=t.dry,R[26]=t.pa,R[27]=t.ps,R[28]=J.D0,R[29]=J.D1,R[30]=J.L0,R[31]=ge,R[32]=Math.min(J.Dp*r,.1);const c=k.sim.u;e.uniform4fv(c.uU,R),e.bindFramebuffer(e.FRAMEBUFFER,co[1-ye]),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,He[ye]),e.drawArrays(e.TRIANGLES,0,3),ye=1-ye,Ke+=o}function po(){e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(Oe),e.useProgram(k.sim.p),e.viewport(0,0,U*3,W),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ro),e.uniform1i(k.sim.u.uK,8),e.uniform4fv(k.sim.u.uG,le)}const D=(t,o)=>{const r=[0,0,0,0];for(const[c,s]of t){const i=tt[c],n=Math.min(i.g,1)*J.gran;for(let d=0;d<3;d++)r[d]+=i.K[d]*s*o*1.4;r[3]+=(i.K[0]+i.K[1]+i.K[2])*s*o*1.4*n}return r},V=[0,0,0,0];function uo(t){const o=z0(a.hash,5+t),r=[],c=h=>r.push(Object.assign({lw:.45,dry:0,sp:.5,pause:.25,mode:1,hold:0,mix:.04,kb:.35,lift:0},h)),s=fe,i=(h,m)=>h+(m-h)*o(),n=(h,m)=>h.map((l,x)=>[l[0]+(o()-.5)*m,l[1]+(o()-.5)*m,l[2]]),d=(h,m,l,x,u,g)=>{const S=[];for(let y=0;y<=g;y++){const f=y/g;S.push([r0(h,l,f),r0(m,x,f),typeof u=="function"?u(f):u])}return S},N=(h,m,l,x,u,g)=>{const S=[];for(let y=0;y<=g;y++){const f=r0(h,m,y/g),M=y%2?x:l,q=y%2?l:x;S.push([M,f,u],[r0(M,q,.5),f+(o()-.5)*.01,u],[q,f,u])}return S},F=(h,m,l,x,u,g)=>c(Object.assign({pts:[[h,m,l]],hold:x,cb:u,sp:1,pause:.12},g||{})),X=(h,m,l,x)=>u=>h+m*(Math.sin(u*x+l)*.6+Math.sin(u*x*2.3+l*1.7)*.3+Math.sin(u*x*5.1+l*.3)*.1),Q=(h,m,l)=>{c({pts:N(h,m,.03,.97,.05,Math.round((m-h)/.07)),cb:V,lw:.42,sp:1.3,pause:.3,mode:2,mix:0});const x=4+Math.floor(o()*2);for(let u=0;u<x;u++){const g=h+.03+u*(m-h)*.1+(o()-.5)*.015;let S=.02+o()*.08;for(;S<.95;){const y=i(.15,.5),f=Math.min(.98,S+y);c({pts:n(d(S,g,f,g+(o()-.5)*.03,.046,6),.012),cb:D([[s.sky,1]],l*(1.25-u*.16)),lw:.55,sp:.9,pause:.03}),S=f+i(0,.1)*(u<2?1:1.6)}}c({pts:n(d(.04,m-.04,.96,m-.035,.03,8),.01),cb:D([[s.warm,1]],.45),lw:.45,sp:.7,pause:.2})};if(Le){const h=i(.2,.8),m=i(.3,.7),l=[];for(let x=0;x<=26;x++){const u=x/24*P0;l.push([h+Math.cos(u)*.085,m+Math.sin(u)*.113,.006+.003*Math.sin(u*2+h*9)])}c({pts:l,cb:[.68,1.1,1.82,0],lw:.3,sp:3,pause:2.5,kb:.5})}if(b==="Sky"){const h=i(.72,.8);Q(.03,h-.02,1.2);for(let x=0;x<5;x++)F(i(.1,.9),i(.18,h-.2),i(.025,.045),i(.2,.4),D([[s.sky,.6],[s.dark,.4]],.9),{lw:.55});K0&&c({pts:[[.5,.3,0]],mode:4,hold:0,pause:.4,cb:V}),c({pts:[[.5,.5,0]],mode:0,hold:0,pause:3.5,cb:V});for(let x=0;x<2;x++)F(i(.15,.85),i(.15,h-.25),.022,.5,V,{mode:2,lw:.9,mix:0});c({pts:[[.5,.5,0]],mode:0,hold:0,pause:9,cb:V});const m=X(h+.015,.02,o()*6,7);c({pts:d(.02,m(.02),.98,m(.98),.016,24).map(x=>[x[0],m(x[0]),x[2]]),cb:D([[s.dark,.6],[s.land,.4]],1.6),lw:.42,sp:.45,pause:.1}),c({pts:N(h+.03,h+.06,.02,.98,.016,2),cb:D([[s.dark,.7],[s.land,.3]],1.4),lw:.4,sp:.6,pause:.4});const l=6+Math.floor(o()*6);for(let x=0;x<l;x++){const u=i(.05,.95),g=i(.02,.06);c({pts:d(u,m(u)+.005,u+(o()-.5)*.01,m(u)-g,S=>.009*(1-S*.6),5),cb:D([[s.dark,1]],1.7),lw:.38,sp:.25,pause:.15})}}else if(b==="Hills")Q(.02,.48,.9),c({pts:[[.5,.5,0]],mode:0,pause:5,cb:V}),[[.4,.035,D([[s.sky,.55],[s.dark,.45]],.6),.56],[.53,.04,D([[s.land,1]],.9),.74],[.67,.045,D([[s.land,.6],[s.dark,.4]],1.15),.985]].forEach(([m,l,x,u],g)=>{const S=X(m,l,o()*6,4+g*1.5);c({pts:d(.01,0,.99,0,.018,28).map(f=>[f[0],S(f[0]),f[2]]),cb:x,lw:.45,sp:.55,pause:.05});const y=Math.round((u-m)/.04);for(let f=1;f<=y;f++){const M=m+(u-m)*f/y,q=f%2?.99:.01;c({pts:d(q,Math.min(S(q)+.02,M),1-q,M,.034,8).map(_=>[_[0],Math.max(S(_[0])+.015,_[1]),_[2]]),cb:x,lw:.48,sp:.9,pause:.02})}if(g===1)for(let f=0;f<4;f++)F(i(.1,.9),i(m+.06,u-.03),i(.02,.035),.25,D([[s.warm,1]],.9),{lw:.5});if(g===2){for(let f=0;f<5;f++)F(i(.05,.95),i(.85,.97),i(.025,.04),.3,D([[s.dark,1]],1.4),{lw:.55});F(i(.3,.7),i(.8,.9),.025,.6,V,{mode:2,lw:.9,mix:0})}if(c({pts:[[.5,.5,0]],mode:0,pause:g===2?6:3.5,cb:V}),g===1){const f=5+Math.floor(o()*8);for(let M=0;M<f;M++){const q=i(.05,.95),_=S(q)+i(0,.05);F(q,_,i(.01,.02),.15,D([[s.dark,.8],[s.land,.2]],1.6),{lw:.4})}}}),c({pts:d(0,.84,.6,.78,.004,10),cb:D([[s.dark,1]],1.2),lw:.12,sp:.3,pause:.2,dry:1});else if(b==="Sea"){const h=i(.38,.46);Q(.02,h-.01,1),c({pts:[[.5,.5,0]],mode:0,pause:1.5,cb:V});for(let y=0;y<3;y++)F(i(.1,.9),i(.07,h-.15),i(.02,.032),i(.35,.6),V,{mode:2,lw:.9,mix:0});c({pts:[[.5,.5,0]],mode:0,pause:2,cb:V}),c({pts:d(.01,h+.008,.99,h+.008,.012,16),cb:D([[s.sea,.7],[s.dark,.3]],1.6),lw:.38,sp:.6,pause:.05});const m=i(.3,.7),l=i(.05,.08),x=9;for(let y=1;y<=x;y++){const f=y/x,M=h+.012+(.85-h)*f,q=D([[s.sea,1-.55*f],[s.accent,.55*f]],1.35-.75*f),_=y%2,L0=y>=2&&y<=7&&o()<.75,N0=m+i(-.09,.09),l0=l*i(.4,1.5),ee=L0?[[.01,N0-l0],[N0+l0,.99]]:[[.01,.99]];_||ee.reverse();for(const[Fe,Me]of ee)c({pts:n(d(_?Fe:Me,M,_?Me:Fe,M+(o()-.5)*.01,.03,8),.006),cb:q,lw:.46,sp:.9,pause:.02});L0&&c({pts:n(d(N0-l0-.03,M,N0+l0+.03,M,.02,5),.008),cb:q,lw:.11,dry:1.5,sp:.8,pause:.02})}const u=o()<.5?0:1,g=i(.25,.4),S=y=>h-.1*Math.max(0,1-(u?1-y:y)/g)*(.8+.2*Math.sin(y*40));for(let y=0;y<6;y++){const f=h-.1+y*.02,M=u?1-g:0;c({pts:d(M,f,u?1:g,f,.02,8).map(_=>[_[0],Math.max(_[1],S(_[0])),_[2]]),cb:D([[s.dark,.7],[s.land,.3]],1.4),lw:.42,sp:.8,pause:.02})}c({pts:[[.5,.5,0]],mode:0,pause:4,cb:V}),c({pts:N(.89,.98,.01,.99,.03,3),cb:D([[s.warm,1]],.55),lw:.45,sp:1,pause:.2}),c({pts:n(d(.01,.885,.99,.885,.006,16),.005),cb:D([[s.dark,.5],[s.warm,.5]],1.3),lw:.35,sp:.5,pause:.3}),K0&&c({pts:[[.5,(h+.86)/2,0]],mode:4,pause:.4,cb:V});for(let y=0;y<5;y++){const f=i(.1,.8),M=i(h+.08,.84);c({pts:d(f,M,f+i(.05,.14),M+(o()-.5)*.006,q=>.005*Math.sin(Math.PI*q)+.002,6),cb:D([[s.dark,.6],[s.sea,.4]],1.5),lw:.35,sp:.35,pause:.1})}}else{c({pts:N(.08,.9,.06,.94,.05,11),cb:V,lw:.4,sp:1.4,pause:.2,mode:2,mix:0});for(let l=0;l<7;l++)F(i(.1,.9),i(.1,.9),i(.05,.08),.35,D([[l%2?s.leaf:s.sky,1]],.3),{lw:.5});c({pts:[[.5,.5,0]],mode:0,pause:5,cb:V});const h=4+Math.floor(o()*3),m=[];for(let l=0;l<h;l++)m.push([i(.15,.85),i(.18,.58),i(.04,.065)]);for(const[l,x,u]of m){const g=5+Math.floor(o()*3),S=o()*P0,y=o()<.7?s.flower:s.accent;for(let f=0;f<g;f++){const M=S+f/g*P0;F(l+Math.cos(M)*u*.55,x+Math.sin(M)*u*.55*1.33,u*.5,.16,D([[y,1]],i(.9,1.3)),{lw:.5})}F(l,x,u*.24,.35,D([[s.dark,.5],[s.warm,.5]],1.6),{lw:.55}),o()<.6&&F(l+u*.4,x-u*.3,u*.25,.5,V,{mode:2,lw:.85,mix:0})}c({pts:[[.5,.5,0]],mode:0,pause:4,cb:V});for(const[l,x,u]of m){const g=(o()-.5)*.15,S=d(l,x+u*.7,l+g,.97,.005,12).map((f,M)=>[f[0]+Math.sin(M/12*Math.PI)*g*.4,f[1],f[2]]);c({pts:S,cb:D([[s.leaf,.8],[s.dark,.2]],1.3),lw:.35,sp:.35,pause:.05});const y=1+Math.floor(o()*2);for(let f=0;f<y;f++){const M=i(.35,.8),q=S[Math.floor(M*12)],_=o()<.5?-1:1,L0=i(.06,.1);c({pts:d(q[0],q[1],q[0]+_*L0,q[1]-L0*.6,N0=>.004+.02*Math.sin(Math.PI*N0),8),cb:D([[s.leaf,.7],[s.dark,.3]],1.2),lw:.45,sp:.3,pause:.08})}}for(let l=0;l<12;l++)F(i(.05,.95),i(.05,.95),i(.003,.006),.08,D([[m.length&&o()<.5?s.flower:s.leaf,1]],1.5),{lw:.4,pause:.03})}if(ke){const h=i(.15,.85),m=b==="Sea"?.8:b==="Sky"?.5:.75,l=i(-.6,.6)+(o()<.5?0:Math.PI),x=Math.max(1,Math.floor(r.length*.55)),u=[];for(let g=0;g<3;g++)u.push(Object.assign({lw:.5,dry:0,sp:1,mix:.05,kb:.9,lift:.3},{pts:[[h+Math.cos(l)*g*.09+(g%2?.02:-.02)*Math.sin(l),m+Math.sin(l)*g*.09*1.33+(g%2?.02:-.02)*Math.cos(l),.05]],mode:3,hold:.05,pause:.5,cb:D([[s.dark,1]],.8),pawA:l+Math.PI/2}));r.splice(x,0,...u)}return r}const I0=[0,0,0];let O0=0,E0=null;const ho=()=>{const t=tt[fe.sky].K;for(let o=0;o<3;o++)I0[o]=t[o]*.16;O0=.35,E0=null};ho();let xt=0,bt=uo(0),Te=0,J0=0,X0=0,Q0=0,wt=0,Ee=0,yt=!1;const ze={amp:0},b0=[],mo=(t,o)=>{let r=0;for(let c=1;c<t.length;c++){const s=t[c-1],i=t[c],n=Math.hypot(i[0]-s[0],(i[1]-s[1])*.75);if(r+n>=o||c===t.length-1){const d=n>0?p0((o-r)/n,0,1):1;return[r0(s[0],i[0],d),r0(s[1],i[1],d),r0(s[2],i[2],d),r+n<=o&&c===t.length-1]}r+=n}return[t[0][0],t[0][1],t[0][2],!0]},ia=t=>{let o=0;for(let r=1;r<t.length;r++)o+=Math.hypot(t[r][0]-t[r-1][0],(t[r][1]-t[r-1][1])*.75);return o};function Jo(t,o){ge=0;const r=z0(a.hash,40+xt);for(let c=0;c<te;c++){const s=r()*P0,i=Math.sqrt(r())*.3;le.set([(t+Math.cos(s)*i)*U,p0(o+Math.sin(s)*i*.8,.05,.95)*W,Ke+r()*1.5,1.1+r()*.8],c*4),ge++}}function vo(){if(Te>=bt.length)return wt+=f0,!1;const t=bt[Te];if(X0>0)return X0-=f0,X0<=0&&(Te++,J0=0,Q0=0),!1;if(t.mode===0)return X0=t.pause,!1;if(t.mode===4)return Jo(t.pts[0][0],t.pts[0][1]),X0=t.pause,b0.push("salt"),!1;let o,r,c;t.pts.length===1?(o=r=t.pts[0],Q0+=f0,c=Q0>=t.hold):(o=mo(t.pts,J0),J0+=t.sp*f0,r=mo(t.pts,J0),c=r[3]);const s=t.pts.length===1?Q0*.1:J0,i=t.lw*Math.exp(-s*(t.dry||.35));if(t.mode===1){const n=t.cb[0]+t.cb[1]+t.cb[2]+1e-6,d=[t.cb[0]/n,t.cb[1]/n,t.cb[2]/n];if(E0&&E0[0]*d[0]+E0[1]*d[1]+E0[2]*d[2]<.93*Math.hypot(d[0],d[1],d[2])*Math.hypot(E0[0],E0[1],E0[2])){for(let N=0;N<3;N++)I0[N]=Math.min(I0[N]+E0[N]*.14,1.6);O0=Math.min(1,O0+.45),b0.push("tink")}E0=d}return L.mode=t.mode,L.ax=o[0]*U,L.ay=o[1]*W,L.bx=r[0]*U,L.by=r[1]*W,L.r=Math.max(1.2,r[2]*U),L.lw=i,L.kb=t.kb,L.cb=t.cb,L.mix=t.mix,L.lift=t.lift||(t.mode===2?.4:0),L.dry=i<.2?p0((.2-i)/.2,0,1)*.85:0,t.mode===3&&(L.pa=t.pawA,L.ps=r[2]*U,Q0<=f0&&b0.push("paw")),ze.amp=t.pts.length===1?.15:t.sp*1.2,c&&(X0=t.pause,X0<=0&&(Te++,J0=0,Q0=0)),!0}po();for(let t=0;t<1e3;t++)vo()||(L.mode=0),fo(L,f0);b0.length=0;const a0={cb:D([[fe.sky,1]],1.3),lw:.55,pan:fe.sky};let gt=fe.sky,Ve=0,Ye=99,Tt=99,E=null,sa=0,na=0;const j0=[],Et=V0(ce,it*.6,ie),Qo=V0(ce+De,it*.6,ie),ea=Math.abs(Qo[0]-Et[0])*1.25;function ta(t){const o=a.input,r=o.taps();for(const c of r){Ye=0;let s=!1;for(let i=0;i<6;i++){const n=Vt[i];Math.hypot(c.x-n[0],1-c.y-n[1])<.03&&(gt=i,a0.cb=D([[i,1]],1.4),a0.lw=.58,a0.pan=i,Ve=1,b0.push("pan"),s=!0)}if(!s&&Math.hypot(c.x-Et[0],1-c.y-Et[1])<ea){const i=a0.cb[0]+a0.cb[1]+a0.cb[2];for(let n=0;n<3;n++)I0[n]=Math.min(I0[n]+a0.cb[n]*.12,1.6);O0=Math.min(1,O0+(i>.01?.8:.2)),a0.cb=V,a0.lw=.7,gt=-1,b0.push("tink"),s=!0}if(!s){const[i,n]=Xt(c.x,c.y);i>0&&i<1&&n>0&&n<1&&(E={u:i,v:n,t:0,moved:!1,lu:i,lv:n,water:!1})}}if(E)if(o.down&&o.inside){Ye=0,Tt=0;const[c,s]=Xt(o.x,o.y);E.t+=t;const i=Math.hypot(c-E.u,(s-E.v)*.75);if(!E.moved&&!E.water&&i>.012&&(E.moved=!0),!E.moved&&!E.water&&E.t>.32&&(E.water=!0,b0.push("drop")),E.moved){const n=Math.hypot(c-E.lu,(s-E.lv)*.75)/Math.max(t,.001),d=p0(.03-n*.006,.011,.03);j0.push({mode:1,a:[E.lu,E.lv],b:[c,s],r:d,lw:a0.lw,cb:a0.cb,mix:.05,lift:0,kb:.4}),a0.lw=Math.max(.06,a0.lw*Math.exp(-Math.hypot(c-E.lu,(s-E.lv)*.75)*.45)),ze.user=Math.min(1.5,n*1.5),E.lu=c,E.lv=s}else if(E.water){const n=Math.min(1,(E.t-.32)/1.5);j0.push({mode:2,a:[E.u,E.v],b:[E.u,E.v],r:.02+.03*n,lw:.6+.5*n,cb:V,mix:0,lift:.8,kb:.3}),Math.floor(E.t*2.5)!==Math.floor((E.t-t)*2.5)&&b0.push("drop")}}else!E.moved&&!E.water&&j0.push({mode:1,a:[E.u,E.v],b:[E.u,E.v],r:.03,lw:Math.max(a0.lw,.5),cb:a0.cb,mix:.05,lift:0,kb:.6,hold:5}),E=null}const C0=new Float32Array(17*4),Ae=new Float32Array(te*4),oa=new Float32Array([J.capB,h0===3?.4:1,0,0]);let xo=1,bo=0,zt=0;const aa=t=>{const o=Math.floor(t),r=t-o,c=k.nd[(o*97&65535)*4]/255,s=k.nd[((o+1)*97&65535)*4]/255;return c+(s-c)*r*r*(3-2*r)};function wo(){if(e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(Oe),e.useProgram(k.disp.p),e.uniform4fv(k.disp.u.uV,oa),e.bindFramebuffer(e.FRAMEBUFFER,so),e.viewport(0,0,U*2,W),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,He[ye]),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ro),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,v,v),e.useProgram(k.comp.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,ht),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,to),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,io),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,k.noise),C0.set([H[0],H[1],H[2],m0,$[0],$[1],$[2],v,t0[0],t0[1],t0[2],zt,K[0],K[1],K[2],Ee],0),C0.set([c0,e0,q0,B0,ae,re,pe,h0===3?.75:0,n0[0],n0[1],n0[2],O,v0[0]/(O<2?260:1),v0[1]/(O<2?260:1),v0[2]/(O<2?260:1),xo],16),C0.set([I0[0],I0[1],I0[2],O0,gt,Ve,Ce?1:0,Do?1:0],32),O===1){const t=V0(y0,.5+G0+.75,g0),o=V0(y0,.5+G0+2.4,g0);C0.set([t[0],t[1],Math.abs(o[1]-t[1])/1.3,1],40);const r=V0(y0,.5+G0+.75,2*Pe-g0),c=V0(y0,.5+G0+2.4,2*Pe-g0);C0.set([r[0],r[1],Math.abs(c[1]-r[1])/1.3,1],44)}else C0.set([0,0,0,0,0,0,0,0],40);C0.set([Z0[0],Z0[1],Z0[2],eo,J.gran,3.5,ge,Ie[0]],52),C0.set([_0[0],_0[1],_0[2],_e,0,0,0,0],60);for(let t=0;t<te;t++)Ae[t*4]=le[t*4]/U,Ae[t*4+1]=le[t*4+1]/W,Ae[t*4+2]=le[t*4+2]-Ke+zt,Ae[t*4+3]=.09+.04*(le[t*4+3]-1.1);e.uniform4fv(k.comp.u.uF,C0),e.uniform4fv(k.comp.u.uG,Ae),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}const yo=8e3,At=new Float32Array(2048),go=(P()-.5)*1.4;let Ze=0,$e=0,Rt=0,Ft=0,Mt=0,Ct=.5+P(),To=0,kt=0,k0=(parseInt(a.hash.slice(50,58),16)|1)>>>0;const Re=()=>(k0^=k0<<13,k0>>>=0,k0^=k0>>>17,k0^=k0<<5,k0>>>=0,k0/2147483648-1);function ra(t,o){const r=a.sound;if(!r.on){b0.length=0;return}for(const i of b0)if(i==="tink")r.note(96,{dur:.9,vel:.12,wave:"sine"}),r.note(103.2,{dur:.6,vel:.05,wave:"sine"}),r.note(91,{dur:1.2,vel:.04,wave:"triangle"}),r.hit("noise",.08,{cutoff:900,dur:.5});else if(i==="pan")r.hit("click",.08),r.hit("noise",.05,{cutoff:1800,dur:.12});else if(i==="drop")r.hit("blip",.07,{freq:300+P()*120});else if(i==="salt")for(let n=0;n<4;n++)r.hit("hat",.03);else i==="paw"&&r.hit("kick",.05);b0.length=0,Ct-=t,Ct<=0&&(Ct+=1,To++,To%2?r.hit("click",.05,{pan:go}):r.hit("blip",.018,{freq:1300,pan:go})),Ze+=t*yo;let c=Math.floor(Ze);if(Ze-=c,c=Math.min(c,At.length),c<16){Ze+=c;return}const s=h0===1?.4:1;for(let i=0;i<c;i++){kt+=(o-kt)*.002;const n=Re();$e+=(n-$e)*.45,Rt+=($e-Rt)*.3;let d=($e-Rt)*kt*.5*(1+s*(Re()>.9?1.5:0));Ce&&(Re()>.995&&(Mt=.25+.4*Math.abs(Re())),Mt*=.85,Ft+=(n-Ft)*.05,d+=Mt*Re()*.3+Ft*.25),At[i]=d}r.pcm(At.subarray(0,c),yo,{vel:.5})}wo();let Lt=0;return(t,o)=>{o=p0(o,0,.15),zt+=o,Ye+=o,Tt+=o,Ve=Math.max(0,Ve-o*2),O0=Math.max(0,O0-o*.01),ze.user=0,ta(o),O===1&&(bo+=o,xo=1+.08*(aa(bo*.8+Ie[0]*60)-.5)),be<We.length&&++Ko%4===0&&Vo(),Lt+=o;let r=Math.floor(Lt/f0);Lt-=r*f0,r>4&&(r=4);let c=0;if(r>0){po();for(let s=0;s<r;s++){let i=!1;if(j0.length){const n=j0[Math.min(j0.length-1,Math.floor(s*j0.length/r))],d=s/r,N=(s+1)/r;L.mode=n.mode,L.ax=r0(n.a[0],n.b[0],d)*U,L.ay=r0(n.a[1],n.b[1],d)*W,L.bx=r0(n.a[0],n.b[0],N)*U,L.by=r0(n.a[1],n.b[1],N)*W,L.r=n.r*U,L.lw=n.lw,L.kb=n.kb,L.cb=n.cb,L.mix=n.mix,L.lift=n.lift,L.dry=n.lw<.2?p0((.2-n.lw)/.2,0,1)*.85:0,i=!0,c=Math.max(c,ze.user||.2)}else Ye>9&&(yt?(Ee=Math.min(1,Ee+f0/2.5),Ee>=1&&(lo(),ge=0,xt++,ho(),bt=uo(xt),Te=0,J0=0,X0=0,Q0=0,wt=0,Ee=0,yt=!1)):(i=vo(),i&&(c=Math.max(c,ze.amp*.6)),wt>30&&Tt>90&&(yt=!0)));i||(L.mode=0),fo(L,f0)}j0.length=0}wo(),ra(o,c)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
