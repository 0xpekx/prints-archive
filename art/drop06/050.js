// Soap Film: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/050.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(K0){K0&&function(){"use strict";const W0=new WeakMap,J=Math.PI*2,I=(e,r,h)=>e<r?r:e>h?h:e,h0=96,k=256,ve=6,M0=1024,$0=2.4,j0=1.2,F0=384,_0=512,he=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,N0=`
float sdBox(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdStar(vec2 p, float r, float rf) {
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-0.809016994375, -0.587785252292);
  p.x = abs(p.x);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1;
  p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x);
  p.y -= r;
  vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0.0, 1.0);
  float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}
float ringSD(vec2 f, vec4 g) {
  if (g.x < 0.5) return length(f) - g.y;
  if (g.x < 1.5 || g.x > 2.5) return sdBox(f, vec2(g.y), g.z);
  float c = cos(g.w), s = sin(g.w);
  return sdStar(mat2(c, s, -s, c) * f, g.y - 0.06, g.z) - 0.06;
}`,Y0=`
float frostAt(vec2 f, float aa) {
  float cov = 0.0;
  int nf = int(FN + 0.5);
  for (int i = 0; i < nf; i++) {
    vec4 nu = uA[FB + i];
    if (nu.w <= 0.0) continue;
    vec2 d = f - nu.xy;
    if (length(d) > nu.w + 0.05) continue;
    vec2 wq = f * 2.5 + float(i) * 0.37;
    d += (vec2(texture(uN, wq).g, texture(uN, wq + 0.5).g) - 0.5) * 0.05;
    float r = length(d);
    float a = atan(d.y, d.x) + nu.z;
    float a6 = mod(a, 1.0471976) - 0.5235988;
    float x = r * cos(a6), y = abs(r * sin(a6));
    float tip = clamp(1.0 - x / max(nu.w, 1e-3), 0.0, 1.0);
    float spine = y - (0.0025 + 0.007 * tip);
    float u = x - y * 0.57735;
    float P = 0.03 + 0.01 * tip;
    float db = abs(fract(u / P) - 0.5) * P * 0.866;
    float kl = 0.45 + 0.9 * texture(uN, vec2(x * 3.0, float(i) * 0.21 + floor((a + 9.4248) / 1.0471976) * 0.13)).b;
    float br = max(db - 0.0015 * (1.0 + tip), y - ((nu.w - x) * 0.5 * kl + 0.004));
    float u2 = x + y * 0.57735;
    float db2 = abs(fract(u2 / (P * 0.5)) - 0.5) * P * 0.433;
    float br2 = max(db2 - 0.0011, y - (nu.w - x) * 0.18 - 0.002);
    float dd = min(min(spine, br), br2 + aa * 0.5);
    dd = max(dd, r - nu.w);
    cov = max(cov, smoothstep(aa, -aa, dd));
    cov = max(cov, 0.7 * smoothstep(0.04 * nu.w + 0.012, 0.0, r));
    cov = max(cov, 0.12 * smoothstep(nu.w, nu.w * 0.5, r));
  }
  return cov;
}`,xe=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform vec4 uA[6];
void main() {
  vec2 e = (vUv * 2.0 - 1.0) * uA[0].y;
  float r2 = dot(e, e);
  vec3 col = uA[3].rgb * (r2 < 1.0 ? 1.0 : 0.45) * (0.8 + 0.4 * texture(uN, e * 0.6 + 0.3).r);
  int k = int(uA[0].x + 0.5);
  vec3 L = uA[2].rgb * uA[2].a;
  vec2 c = uA[1].xy, hs = uA[1].zw;
  if (k == 0) {
    vec2 d = abs(e - c) - hs;
    float m = max(d.x, d.y);
    float win = 1.0 - smoothstep(-0.035, 0.035, m);
    float glow = exp(-max(m, 0.0) * 7.0) * 0.12;
    vec2 q = e - c - uA[4].xy;
    float bars = smoothstep(uA[4].z * 0.4, uA[4].z * 1.6, min(abs(q.x), abs(q.y)));
    float yy = clamp((e.y - c.y) / hs.y * 0.5 + 0.5, 0.0, 1.0);
    float sky = (0.7 + 0.4 * yy) * (1.0 - 0.22 * dot((e - c) / hs, (e - c) / hs));
    float tree = texture(uN, e * 1.1 + uA[0].z).r * 0.7 + texture(uN, e * 2.7 - uA[0].z).g * 0.3;
    sky *= 1.0 - 0.45 * smoothstep(0.42, 0.75, tree) * clamp(1.1 - yy * 1.3, 0.0, 1.0);
    col += L * (win * sky * mix(0.6, 1.0, bars) + glow);
  } else if (k == 1) {
    float r = length(e - c);
    float rg = exp(-pow((r - hs.x) / hs.y, 2.0));
    col += L * (rg + 0.05 * exp(-r * 3.0));
  } else if (k == 2) {
    float r = length((e - c) * vec2(1.0, 0.85));
    float shade = 1.0 - smoothstep(hs.x - 0.05, hs.x + 0.05, r);
    float hot = exp(-r * r / (hs.x * hs.x) * 1.4);
    col += L * (shade * (0.45 + 0.55 * hot) + 0.14 * exp(-r * 3.5));
  } else {
    col += L * (1.0 - smoothstep(0.22, 0.45, sqrt(r2)));
  }
  o = vec4(col, 1.0);
}`,me=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform vec4 uA[3];
uniform vec4 uB[16];
uniform vec4 uC[16];
void main() {
  vec2 p = vUv;
  int k = int(uA[0].x + 0.5);
  vec3 col = uA[1].rgb;
  float n1 = texture(uN, p * 0.9 + uA[0].z).r, n2 = texture(uN, p * 2.3 - uA[0].z).g;
  if (k == 0) {
    float fib = texture(uN, p * vec2(7.0, 5.0) + uA[0].z).b;
    col *= 0.65 + 0.6 * n1 + 0.3 * (fib - 0.5);
    col *= 1.0 + 0.5 * smoothstep(0.2, 1.0, p.x * uA[0].w + p.y * (1.0 - uA[0].w));
  } else if (k == 1) {
    float n3 = texture(uN, p * 0.45 + uA[0].z * 0.3).r;
    float lf = smoothstep(0.25, 0.85, n3 * 0.75 + n1 * 0.25);
    col = mix(vec3(0.004, 0.009, 0.004), vec3(0.030, 0.060, 0.018), lf);
    col += vec3(0.03, 0.04, 0.01) * smoothstep(0.55, 0.9, texture(uN, p * 0.7 - uA[0].z).a) * smoothstep(0.1, 0.9, p.y);
  } else {
    col *= 0.55 + 0.7 * n1;
  }
  int nb = int(uA[0].y + 0.5);
  for (int i = 0; i < nb; i++) {
    vec4 b = uB[i];
    float d = length(p - b.xy) / b.z;
    float disc = smoothstep(1.0, 0.72, d);
    float rim = smoothstep(0.55, 0.9, d) * smoothstep(1.0, 0.86, d);
    col += uC[i].rgb * b.w * (disc * (0.7 + 0.3 * texture(uN, p * 3.0 + float(i) * 0.17).b) + rim * 0.2);
  }
  o = vec4(sqrt(max(col, 0.0)), 1.0);
}`,de=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uV;
uniform sampler2D uH;
uniform sampler2D uN;
uniform vec4 uA[12];
${N0}
void main() {
  vec2 p = vUv; float dt = uA[0].x, e = uA[0].y, t = uA[0].z;
  vec2 f = p * 2.0 - 1.0;
  float sd = ringSD(f, uA[2]);
  if (sd > -0.01 || p.y < uA[11].x) { o = vec4(0.0); return; }
  vec4 C = texture(uV, p), L = texture(uV, p - vec2(e, 0.0)), R = texture(uV, p + vec2(e, 0.0)), B = texture(uV, p - vec2(0.0, e)), T = texture(uV, p + vec2(0.0, e));
  vec2 v = C.xy - 0.5 * vec2(R.z - L.z, T.z - B.z);
  vec2 q = p - dt * v;
  vec4 Q = texture(uV, q);
  float qx = texture(uV, q + vec2(e, 0.0)).z - texture(uV, q - vec2(e, 0.0)).z;
  float qy = texture(uV, q + vec2(0.0, e)).z - texture(uV, q - vec2(0.0, e)).z;
  vec2 va = Q.xy - 0.5 * vec2(qx, qy);
  float w = 0.5 * ((R.y - L.y) - (T.x - B.x));
  vec2 g = 0.5 * vec2(abs(R.w) - abs(L.w), abs(T.w) - abs(B.w));
  vec2 nn = g / (length(g) + 1e-5);
  vec2 F = uA[1].y * vec2(nn.y, -nn.x) * w;
  vec4 H = texture(uH, p);
  float hs = 0.0, ws = 0.0;
  for (int i = 0; i < 4; i++) { vec4 a = texture(uH, p + vec2((float(i) - 1.5) * 0.11, 0.0)); hs += a.r * a.g; ws += a.g; }
  float href = hs / max(ws, 1e-3);
  F.y += uA[1].x * clamp(href - H.r, -1.5, 1.5) * H.g;
  vec2 np = p * uA[1].w + vec2(0.013, 0.021) * t;
  float n0 = texture(uN, np).g, nx = texture(uN, np + vec2(0.012, 0.0)).g, ny = texture(uN, np + vec2(0.0, 0.012)).g;
  F += uA[1].z * vec2(ny - n0, n0 - nx) * 80.0;
  int nsp = int(uA[11].y + 0.5);
  for (int i = 0; i < nsp; i++) {
    vec4 s = uA[3 + i], k = uA[7 + i];
    vec2 d = p - s.xy;
    float gk = exp(-dot(d, d) / (k.x * k.x));
    F += (s.zw + k.y * vec2(-d.y, d.x) / k.x) * gk;
  }
  vec2 vn = (va + dt * F) / (1.0 + dt * uA[0].w);
  vn *= smoothstep(0.0, 0.05, -sd) * H.g * (1.0 - H.b);
  float sp = length(vn); if (sp > 0.5) vn *= 0.5 / sp;
  o = vec4(vn, C.z * 0.8, w);
}`,be=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uV;
uniform vec4 uA[3];
${N0}
void main() {
  vec2 p = vUv; float e = uA[0].y;
  if (ringSD(p * 2.0 - 1.0, uA[2]) > -0.01) { o = vec4(0.0); return; }
  vec4 C = texture(uV, p), L = texture(uV, p - vec2(e, 0.0)), R = texture(uV, p + vec2(e, 0.0)), B = texture(uV, p - vec2(0.0, e)), T = texture(uV, p + vec2(0.0, e));
  float div = 0.5 * (R.x - L.x + T.y - B.y);
  o = vec4(C.xy, (L.z + R.z + B.z + T.z - div) * 0.25, C.w);
}`,Ae=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uH;
uniform sampler2D uV;
uniform sampler2D uN;
uniform vec4 uA[14];
#define FB 10
#define FN uA[4].w
${N0}
${Y0}
// Catmull-Rom read of the thickness from five bilinear taps: keeps the marbling's filaments sharp under advection
float hCR(vec2 uv) {
  vec2 sp = uv * ${k}.0, tp = floor(sp - 0.5) + 0.5, g = sp - tp;
  vec2 w0 = g * (-0.5 + g * (1.0 - 0.5 * g)), w1 = 1.0 + g * g * (-2.5 + 1.5 * g), w2 = g * (0.5 + g * (2.0 - 1.5 * g)), w3 = g * g * (-0.5 + 0.5 * g);
  vec2 w12 = w1 + w2, c12 = (tp + w2 / w12) / ${k}.0, c0 = (tp - 1.0) / ${k}.0, c3 = (tp + 2.0) / ${k}.0;
  float r = texture(uH, vec2(c12.x, c0.y)).r * (w12.x * w0.y) + texture(uH, vec2(c0.x, c12.y)).r * (w0.x * w12.y) + texture(uH, c12).r * (w12.x * w12.y)
          + texture(uH, vec2(c3.x, c12.y)).r * (w3.x * w12.y) + texture(uH, vec2(c12.x, c3.y)).r * (w12.x * w3.y);
  return r / (w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y);
}
void main() {
  vec2 p = vUv, f = p * 2.0 - 1.0; float dt = uA[0].x, e = uA[0].y, t = uA[0].z;
  float sd = ringSD(f, uA[2]);
  if (sd > 0.0) { o = vec4(0.0); return; }
  vec4 C = texture(uH, p);
  vec4 L = texture(uV, p - vec2(e, 0.0)), R = texture(uV, p + vec2(e, 0.0)), B = texture(uV, p - vec2(0.0, e)), T = texture(uV, p + vec2(0.0, e));
  vec2 v = texture(uV, p).xy - 0.5 * vec2(R.z - L.z, T.z - B.z);
  float h = C.r;
  vec2 q = p - dt * (v + vec2(0.0, -uA[0].w * h * h));
  ivec2 i0 = clamp(ivec2(floor(q * ${k}.0 - 0.5)), ivec2(0), ivec2(${k-2}));
  float t00 = texelFetch(uH, i0, 0).r, t10 = texelFetch(uH, i0 + ivec2(1, 0), 0).r, t01 = texelFetch(uH, i0 + ivec2(0, 1), 0).r, t11 = texelFetch(uH, i0 + ivec2(1, 1), 0).r;
  float hn = mix(texture(uH, q).r, clamp(hCR(q), min(min(t00, t10), min(t01, t11)), max(max(t00, t10), max(t01, t11))), 0.55);
  float fz = C.b;
  hn = mix(hn, h, fz);
  float bz = smoothstep(-0.06 - 0.02 * smoothstep(0.1, 0.5, f.y), 0.0, sd);
  float ang = atan(f.y, f.x) * 0.477465;
  float nb = texture(uN, vec2(ang + t * 0.004, t * 0.003 + sd * 2.0)).r;
  float hb = mix(0.1, 0.42, smoothstep(0.3, 0.65, nb));
  hb = mix(hb, 0.012, smoothstep(0.1, 0.5, f.y));
  hb = mix(hb, uA[1].z * 0.9, smoothstep(-0.4, -0.8, f.y));
  hn = mix(hn, hb, clamp(dt * uA[1].y * bz, 0.0, 1.0));
  hn = max(hn - dt * uA[1].x, 0.0);
  int nlb = int(uA[4].z + 0.5);
  for (int i = 0; i < nlb; i++) { vec4 l = uA[5 + i]; vec2 d = f - l.xy; hn *= exp(-dt * l.z * exp(-dot(d, d) / (l.w * l.w))); }
  vec4 dp = uA[9];
  if (dp.z > 0.0) { vec2 d = f - dp.xy; hn += dt * dp.z * exp(-dot(d, d) / (dp.w * dp.w)); }
  float pres = C.g;
  vec4 ho = uA[3];
  if (ho.w > 0.5 && length(f - ho.xy) < ho.z * 0.86 - 0.01) pres = 0.0;
  if (uA[4].x > 0.5) pres = 0.0;
  if (p.y < uA[1].w) {
    pres = 1.0; fz = 0.0;
    float sn = texture(uN, p * 0.7 + vec2(0.31, t * 0.03)).r;
    hn = uA[1].z * (0.12 + 0.95 * pow(1.0 - p.y, 1.2)) * (0.85 + 0.3 * sn);
  }
  if (uA[4].y > 0.5 && pres > 0.5) fz = max(fz, smoothstep(0.1, 0.6, frostAt(f, 0.006)));
  o = vec4(min(hn, 2.3), pres, fz, 0.0);
}`,J0=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uH;
uniform sampler2D uEnv;
uniform sampler2D uBg;
uniform sampler2D uLut;
uniform sampler2D uN;
uniform vec4 uA[33];
uniform vec4 uD[24];
#define FB 26
#define FN uA[25].y
${N0}
#ifdef RARE
${Y0}
#endif
vec3 envAt(vec3 R) { vec2 e = R.xy / (1.0 + max(R.z, -0.9)); return texture(uEnv, e * ${(.5/j0).toFixed(5)} + 0.5).rgb; }
vec3 lutAt(float d) { return texture(uLut, vec2(d * ${(1/$0).toFixed(5)}, 0.5)).rgb; }
// the slope of the film (height away from the camera): bulges, the blown dome pinned at the wire, ripples
vec2 slope(vec2 f, float sd, vec2 gs) {
  vec2 g = vec2(0.0);
  int nl = int(uA[30].x + 0.5), nr = int(uA[30].y + 0.5);
  for (int i = 0; i < nl; i++) { vec4 l = uA[8 + i]; vec2 d = f - l.xy; float iw = 1.0 / (l.w * l.w); g += l.z * exp(-dot(d, d) * iw) * (-2.0 * iw) * d; }
  float A = uA[7].y;
  if (A != 0.0) {
    float s = clamp(-sd / 0.9, 0.0, 1.0);
    g += A * (2.0 - 2.0 * s) * (-gs / 0.9) * step(s, 0.999) * step(0.0, -sd);
  }
  for (int i = 0; i < nr; i++) {
    vec4 r = uA[12 + i]; vec2 q = f - r.xy; float rl = length(q) + 1e-5; float d = rl - r.z * 0.85;
    float en = r.w * exp(-r.z * 2.2) * exp(-d * d * 90.0);
    g += en * (-180.0 * d * cos(d * 75.0) - 75.0 * sin(d * 75.0)) * (q / rl);
  }
  return g;
}
vec3 film(vec3 col, float h, float pres, vec2 sl, vec3 V) {
  vec3 N = normalize(vec3(sl, 1.0));
  float ci = max(-dot(V, N), 0.05);
  vec3 env = envAt(reflect(V, N));
  float n = uA[5].x;
  float st = sqrt(1.0 - (1.0 - ci * ci) / (n * n));
  vec3 lt = lutAt(h * st);
  if (uA[4].w > 0.5) lt = max(lt - dot(lt, vec3(0.3333)) * 0.3, 0.0) * 0.95;
  float fr = 1.0 + 4.0 * pow(1.0 - ci, 5.0);
  vec3 rf = env * lt * fr * uA[4].rgb * pres;
  // what lies behind shows through clearly only where the film reflects little (the black film, the silver band)
  return col * (1.0 - pres * (0.05 + uA[5].y * smoothstep(0.0, 0.3, dot(rf, vec3(0.3, 0.55, 0.15))))) + rf;
}
// a free bubble as col * T + A (so all of them run through one loop, in front of or behind the film)
float sphere(vec2 uv, vec4 a, vec4 b, float t, out vec3 A) {
  A = vec3(0.0);
  vec2 q = (uv - a.xy) / a.z;
  float r = length(q);
  float cov = smoothstep(1.0 + a.w, 1.0 - a.w, r) * b.z;
  if (cov <= 0.001) return 1.0;
  float rr = min(r * r, 0.996);
  vec3 N = vec3(q, sqrt(1.0 - rr));
  float ci = N.z;
  float c = cos(b.x), s = sin(b.x);
  vec2 hq = mat2(c, s, -s, c) * q;
  float h = b.y * (0.25 + 0.9 * (0.5 - 0.5 * N.y)) + 0.45 * b.y * (texture(uN, hq * 0.3 + vec2(0.13, t * 0.004)).r - 0.5) + 0.3 * b.y * (texture(uN, hq * 0.7 + vec2(t * 0.006, 0.4)).a - 0.5);
  h = max(h, 0.0);
  float n = uA[5].x, st = sqrt(1.0 - (1.0 - ci * ci) / (n * n));
  float front0 = b.w > 0.5 ? 0.25 : 1.0;
  float fr = front0 + 6.0 * pow(1.0 - ci, 4.0);
  float es = b.w > 0.5 ? 0.9 : 0.62;
  vec3 Rf = reflect(vec3(0.0, 0.0, -1.0), N);
  vec3 ef = envAt(vec3(Rf.xy * es, Rf.z));
  vec3 front = (ef * fr + max(ef - 0.12, 0.0) * (1.0 - front0)) * lutAt(h * st);
  float hb = b.y * (0.25 + 0.9 * (0.5 + 0.5 * N.y)) + 0.4 * b.y * (texture(uN, -hq * 0.3 + vec2(0.5, t * 0.003)).r - 0.5);
  vec3 Rb = reflect(vec3(0.0, 0.0, -1.0), vec3(-q, N.z));
  vec3 eb = envAt(vec3(Rb.xy * es, Rb.z));
  vec3 back = (eb * front0 + max(eb - 0.12, 0.0) * (1.0 - front0)) * lutAt(max(hb, 0.0) * st) * 0.55;
  A = cov * (front + back) * uA[4].rgb * 1.5;
  float edge = 1.0 - ci;
  return 1.0 - cov + cov * (0.97 - 0.8 * edge * edge);
}
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
vec3 tube(vec3 col, float d, float w, vec2 gdir, vec3 V, vec3 tint, float px, float soft) {
  if (d > w + 2.0 * px + soft) return col;
  float tt = clamp(d / w, 0.0, 1.0);
  vec3 N = vec3(gdir * tt, sqrt(1.0 - tt * tt));
  vec3 c = (envAt(reflect(V, N)) * 1.1 + 0.01) * tint;
  return mix(col, c, smoothstep(w + px + soft, w - px - soft, d));
}
#ifdef RARE
vec3 cubeFilm(vec3 col, vec2 f, vec2 sl, float hAdd, float holeK, vec3 V, float px) {
  float a = uA[2].y;
  vec2 bc = uA[31].xy, qc = uA[32].xy; float bh = uA[31].z, qh = uA[31].w, k = uA[32].z;
  vec2 dq = f - qc, sg = sign(dq + 1e-6);
  vec2 tF2 = (sg * dq - qh) / (a - qh - sg * qc);
  vec2 tB2 = (sg * dq - qh) / (bh - qh + sg * (bc - qc));
  float tF = max(tF2.x, tF2.y), tB = max(tB2.x, tB2.y);
  vec2 axF = tF2.x > tF2.y ? vec2(sg.x, 0.0) : vec2(0.0, sg.y);
  vec2 axB = tB2.x > tB2.y ? vec2(sg.x, 0.0) : vec2(0.0, sg.y);
  // the back frame and the four depth edges, seen through the films
  float dw = abs(sdBox(f - bc, vec2(bh), 0.01));
  vec2 gw = vec2(0.0, 1.0);
  for (int i = 0; i < 4; i++) {
    vec2 s4 = vec2(i == 0 || i == 3 ? 1.0 : -1.0, i < 2 ? 1.0 : -1.0);
    float ds = sdSeg(f, s4 * a, bc + s4 * bh);
    if (ds < dw) { dw = ds; vec2 dd = (s4 * a) - (bc + s4 * bh); gw = normalize(vec2(-dd.y, dd.x)); }
  }
  col = tube(col, dw, uA[1].w * 0.75, gw, V, uA[3].rgb * 0.7, px, 0.004);
  if (tF < 0.0) {
    vec4 H = texture(uH, f * 0.5 + 0.5);
    col = film(col, H.r + hAdd, H.g * holeK, sl, V);
  } else {
    if (tB < 1.0) { vec4 H = texture(uH, vec2(-f.x, f.y) * 0.85 * 0.5 + 0.5); col = film(col, H.r * 1.1 + hAdd, H.g * holeK, sl + axB * k, V); }
    vec4 H = texture(uH, f * 0.5 + 0.5);
    col = film(col, H.r + hAdd, H.g * holeK, sl - axF * k * 1.2, V);
  }
  // Plateau borders: the liquid edges where three films meet at 120 degrees
  float db = abs(sdBox(f - qc, vec2(qh), 0.004));
  for (int i = 0; i < 4; i++) {
    vec2 s4 = vec2(i == 0 || i == 3 ? 1.0 : -1.0, i < 2 ? 1.0 : -1.0);
    vec2 qa = qc + s4 * qh;
    db = min(db, sdSeg(f, qa, s4 * a));
    db = min(db, sdSeg(f, qa, bc + s4 * bh) + 0.0015);
  }
  float bw = 0.0075 * holeK;
  if (db < bw + 2.0 * px) {
    float tt = clamp(db / bw, 0.0, 1.0);
    vec3 env = envAt(reflect(V, normalize(vec3(sl * 0.5 + vec2(tt * 0.9, 0.3 * tt), 1.0))));
    vec3 bcol = col * 0.35 + env * (0.25 + 1.1 * smoothstep(0.35, 0.75, tt) * smoothstep(1.0, 0.8, tt)) + env * lutAt(1.9) * 0.3;
    col = mix(col, bcol, smoothstep(bw + px, bw - px, db));
  }
  return col;
}
#endif
void main() {
  float S = uA[0].x, t = uA[0].y, TF = uA[0].z;
  vec2 uv = gl_FragCoord.xy / S;
  float L = uA[1].z, px = 1.0 / (S * L), wr = uA[1].w;
  vec2 f = (uv - uA[1].xy) / L;
  vec3 bs = texture(uBg, uv).rgb; vec3 col = bs * bs;
  vec3 V = normalize(vec3((uv * 2.0 - 1.0) * TF, -1.0));
  int nS = int(uA[30].z + 0.5);
  float Tb = 1.0, Tf = 1.0; vec3 Ab = vec3(0.0), Af = vec3(0.0);
  for (int i = 0; i < nS; i++) {
    vec3 A; float T = sphere(uv, uA[18 + i], uA[21 + i], t, A);
    if (uA[21 + i].w < 0.5) { Ab = Ab * T + A; Tb *= T; } else { Af = Af * T + A; Tf *= T; }
  }
  col = col * Tb + Ab;
  vec4 g = uA[2];
  float sd = ringSD(f, g);
  vec2 gn = vec2(0.0, 1.0);
  vec2 gs = vec2(0.0, 1.0);
  if (abs(sd) < 0.05 || uA[7].y != 0.0) { float e = 0.003; gs = vec2(ringSD(f + vec2(e, 0.0), g) - sd, ringSD(f + vec2(0.0, e), g) - sd) / e; gn = normalize(gs + 1e-7); }
  if (sd < -wr * 0.5) {
    vec2 sl = slope(f, sd, gs);
    float dm = max(-sd - wr, 0.0);
    float men = exp(-dm / 0.006);
    sl -= gn * 1.3 * men;
    float hAdd = 2.0 * men;
    vec4 du = uA[24]; float dust = 0.0;
    if (du.w > 0.5) {
      vec2 d = f - du.xy;
      hAdd += 0.55 * exp(-length(d) / 0.022);
      float c = cos(du.z), s = sin(du.z); vec2 q = mat2(c, s, -s, c) * d;
      float ang = atan(q.y, q.x);
      float dd = length(q) - 0.0075 * (1.0 + 0.35 * sin(ang * 3.0 + 1.0) + 0.2 * sin(ang * 7.0));
      dd = min(dd, length(max(abs(q - vec2(0.012, 0.004)) - vec2(0.014, 0.0), 0.0)) - 0.0018);
      dust = smoothstep(px, -px, dd);
    }
    vec4 ho = uA[6]; float holeK = 1.0, rim = 0.0;
    if (ho.w > 0.5) {
      vec2 d = f - ho.xy; float dd = length(d);
      float an = atan(d.y, d.x) * 0.477465;
      float rr = ho.z * (1.0 + 0.1 * (texture(uN, vec2(an, 0.37)).r - 0.5) + 0.06 * (texture(uN, vec2(an * 2.0, 0.71)).a - 0.5));
      holeK = smoothstep(rr - px, rr + px, dd);
      rim = exp(-pow((dd - rr - 0.01) / 0.012, 2.0)) * smoothstep(0.0, 0.03, ho.z);
    }
    vec4 Hs = texture(uH, f * 0.5 + 0.5);
#ifdef RARE
    if (uA[30].w > 0.5) col = cubeFilm(col, f, sl, hAdd, holeK, V, px);
    else
#endif
    {
      float pres = Hs.g * holeK;
      if (pres > 0.002) col = film(col, Hs.r + hAdd, pres, sl, V);
    }
    if (rim > 0.002) {
      vec2 rn = normalize(f - ho.xy + 1e-5);
      float rx = clamp((length(f - ho.xy) - ho.z) / 0.012, -1.0, 1.0);
      vec3 env = envAt(reflect(V, normalize(vec3(sl + rn * rx * 0.35, 1.0))));
      col = mix(col, col * 0.2 + env * (0.45 + 1.3 * lutAt(1.4)) + 0.06, min(rim * 1.4, 1.0));
    }
#ifdef RARE
    if (uA[25].x > 0.5 && Hs.g > 0.5) {
      float fc = frostAt(f, px * 1.5);
      if (fc > 0.0) {
        vec2 cell = floor(f * 240.0);
        float sp = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
        vec3 R = reflect(V, normalize(vec3(sl + (vec2(sp, fract(sp * 7.31)) - 0.5) * 0.25, 1.0)));
        vec3 ice = col * 0.3 + (envAt(R) * 0.75 + 0.03) * vec3(0.86, 0.93, 1.0) * (0.55 + 1.5 * step(0.985, sp));
        col = mix(col, ice, fc);
      }
    }
#endif
    if (dust > 0.0) col = mix(col, vec3(0.012, 0.009, 0.007) + envAt(reflect(V, vec3(0.3, 0.4, 0.86))) * 0.05, dust * Hs.g);
  }
  // the wire
  if (abs(sd) < wr + 2.0 * px) {
    float tt = clamp(sd / wr, -1.0, 1.0);
    vec3 N = vec3(gn * tt, sqrt(1.0 - tt * tt));
    float crease = 1.0;
    if (uA[3].w > 0.0) {
      float u = fract(atan(f.y, f.x) * uA[3].w + tt * 0.45);
      vec2 tg = vec2(-gn.y, gn.x);
      N = normalize(N + vec3(tg * (u - 0.5) * 1.8, 0.0));
      crease = smoothstep(0.0, 0.2, u) * smoothstep(1.0, 0.8, u);
    }
    vec3 wc = (envAt(reflect(V, N)) * 1.15 + 0.012) * uA[3].rgb * (0.2 + 0.8 * crease);
    col = mix(col, wc, smoothstep(wr + px, wr - px, abs(sd)));
  }
  // droplets thrown off a popping rim
  int nD = int(uA[5].w + 0.5);
  for (int i = 0; i < nD; i++) {
    vec4 d = uD[i];
    vec2 q = (uv - d.xy) / d.z; float r = length(q);
    if (r < 1.3) {
      vec3 N = vec3(q, sqrt(max(1.0 - r * r, 0.0)));
      vec3 dc = col * 0.3 + envAt(reflect(vec3(0.0, 0.0, -1.0), N)) * 1.1 + envAt(vec3(-q * 0.5, 1.0)) * 0.3 * smoothstep(0.8, 0.0, r);
      col = mix(col, dc, smoothstep(1.0, 0.75, r) * d.w);
    }
  }
  // the bath, when the ring dips
  float by = uA[7].x;
  if (by > -0.5) {
    float lev = by + 0.025 * L * exp(-abs(sd) / 0.03);
    float dy = (uv.y - lev) * S;
    if (dy < 0.0) col = col * 0.16 + vec3(0.010, 0.012, 0.014) + envAt(vec3((uv.x - 0.5) * 0.3, -0.2, 1.0)) * 0.06 * exp(dy / (0.2 * S));
    col += envAt(vec3((uv.x - 0.5) * 0.45, 0.08, 1.0)) * (exp(-dy * dy / (6.0 * S / 1000.0)) * 0.9 + exp(-abs(dy) / (14.0 * S / 1000.0)) * 0.12);
  }
  col = col * Tf + Af;
  vec2 vq = uv - 0.5;
  col *= 1.0 - 0.55 * dot(vq, vq);
  col = 1.0 - exp(-col * uA[0].w);
  col = pow(col, vec3(0.4545));
  float gr = fract(sin(dot(gl_FragCoord.xy + fract(t * 7.13) * 317.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (gr - 0.5) * uA[5].z;
  o = vec4(col, 1.0);
}`,D0=(()=>{const e=new Float32Array(1),r=new Uint32Array(e.buffer);return h=>{e[0]=h;const f=r[0],R=f>>>16&32768;let A=(f>>>23&255)-112;const g=f&8388607;return A<=0?A<-10?R:R|(g|8388608)>>14-A:A>=31?R|31744:R|A<<10|g>>13}})();function s0(e,r){const h=(g,v)=>{const c=e.createShader(g);return e.shaderSource(c,v),e.compileShader(c),c};r=r.replace("precision highp float;",`precision highp float;
#define TX(s, p) textureLod(s, p, 0.0)`).split("texture(").join("TX(");const f=e.createProgram(),R=h(e.VERTEX_SHADER,he),A=h(e.FRAGMENT_SHADER,r);return e.attachShader(f,R),e.attachShader(f,A),e.linkProgram(f),{p:f,u:{},sh:[R,A]}}const ye=["comp","comp2","hh","vel","env","bg","jac"];function we(e){const r=(x,S,y,V)=>{const W=(x-S)/(x<S?y:V);return Math.exp(-.5*W*W)},h=[],f=[],R=[],A=[];for(let x=380;x<=780;x+=4)h.push(x),f.push(1.056*r(x,599.8,37.9,31)+.362*r(x,442,16,26.7)-.065*r(x,501.1,20.4,26.2)),R.push(.821*r(x,568.8,46.9,40.5)+.286*r(x,530.9,16.3,31.1)),A.push(1.217*r(x,437,11.8,36)+.681*r(x,459,26,13.8));const g=(x,S,y)=>[3.2406*x-1.5372*S-.4986*y,-.9689*x+1.8758*S+.0415*y,.0557*x-.204*S+1.057*y];let v=0,c=0,d=0;for(let x=0;x<h.length;x++)v+=f[x],c+=R[x],d+=A[x];const a=g(v,c,d),M=((e-1)/(e+1))**2,U=4*M/(1-M)**2,X=.95/(U/(1+U)),P=new Uint16Array(M0*4);for(let x=0;x<M0;x++){const S=x/(M0-1)*$0*1e3;let y=0,V=0,W=0;for(let F=0;F<h.length;F++){const m=Math.sin(J*e*S/h[F])**2,x0=U*m/(1+U*m);y+=x0*f[F],V+=x0*R[F],W+=x0*A[F]}const n0=g(y,V,W);for(let F=0;F<3;F++)P[x*4+F]=D0(Math.max(0,n0[F]/a[F]*X));P[x*4+3]=D0(1)}return P}function Te(e){let r=W0.get(e);if(r)return r;e.getExtension("EXT_color_buffer_float"),e.getExtension("EXT_color_buffer_half_float"),e.getExtension("KHR_parallel_shader_compile"),r={env:s0(e,xe),bg:s0(e,me),vel:s0(e,de),jac:s0(e,be),hh:s0(e,Ae),comp:s0(e,J0),comp2:s0(e,J0.replace("#define FB 26",`#define RARE
#define FB 26`)),vao:e.createVertexArray(),ok:!1};const h=128,f=(v,c,d,a)=>{v=(v%d+d)%d,c=(c%d+d)%d;let M=v*374761393+c*668265263+a*2246822519|0;return M=Math.imul(M^M>>>13,1274126177),M^=M>>>16,(M>>>0)/4294967296},R=(v,c,d,a)=>{const M=Math.floor(v),U=Math.floor(c),X=v-M,P=c-U,x=X*X*(3-2*X),S=P*P*(3-2*P),y=f(M,U,d,a),V=f(M+1,U,d,a),W=f(M,U+1,d,a),n0=f(M+1,U+1,d,a);return y+(V-y)*x+(W-y)*S+(y-V-W+n0)*x*S},A=(v,c,d,a,M)=>{let U=0,X=.5,P=d,x=0;for(let S=0;S<a;S++)U+=X*R(v*P/h,c*P/h,P,M+S),x+=X,X*=.5,P*=2;return U/x},g=new Uint8Array(h*h*4);for(let v=0;v<h;v++)for(let c=0;c<h;c++){const d=(v*h+c)*4;g[d]=A(c,v,4,4,11)*255,g[d+1]=A(c,v,8,3,23)*255,g[d+2]=(R(c*32/h,v*32/h,32,41)*.7+R(c*64/h,v*64/h,64,43)*.3)*255,g[d+3]=A(c,v,16,2,77)*255}for(let v=0;v<4;v++){let c=255,d=0;for(let a=v;a<g.length;a+=4)c=Math.min(c,g[a]),d=Math.max(d,g[a]);for(let a=v;a<g.length;a+=4)g[a]=(g[a]-c)*255/Math.max(1,d-c)}return r.noiseData=g,r.noise=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r.noise),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,h,h,0,e.RGBA,e.UNSIGNED_BYTE,g),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),r.lut=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r.lut),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,M0,1,0,e.RGBA,e.HALF_FLOAT,we(1.34)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),W0.set(e,r),r}const Q0={env:{uN:0},bg:{uN:0},vel:{uV:0,uH:1,uN:2},jac:{uV:0},hh:{uH:0,uV:1,uN:2},comp:{uH:0,uEnv:1,uBg:2,uLut:3,uN:4},comp2:{uH:0,uEnv:1,uBg:2,uLut:3,uN:4}};function Z0(e,r,h){const f=r[h];if(f.ok)return f;if(!e.getProgramParameter(f.p,e.LINK_STATUS))throw new Error("050 link "+h+": "+e.getProgramInfoLog(f.p)+" "+e.getShaderInfoLog(f.sh[0])+" "+e.getShaderInfoLog(f.sh[1]));const R=e.getProgramParameter(f.p,e.ACTIVE_UNIFORMS);for(let A=0;A<R;A++){const g=e.getActiveUniform(f.p,A);f.u[g.name.replace(/\[0\]$/,"")]=e.getUniformLocation(f.p,g.name)}e.useProgram(f.p);for(const A in Q0[h])f.u[A]&&e.uniform1i(f.u[A],Q0[h][A]);return f.ok=!0,f}function ge(e,r){if(!r.ok){r.ok=!0;for(const h of ye)h!=="comp2"&&Z0(e,r,h)}}function g0(e,r,h,f,R,A,g){const v=e.createTexture();return e.bindTexture(e.TEXTURE_2D,v),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,f,r,h,0,R,A,g||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),v}function k0(e,r){const h=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,h),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),h}K0.add({num:50,name:"Soap Film",fam:"Worlds",recipe:"One soap film stretched across a wire up close. The colours come from how thick the film is in each spot, so they drain down, go black at the top and swirl around. The wire and the light change every mint. Drag to blow on it, tap to poke it with a wet finger (sometimes it pops), or hold to blow a bubble that floats away and a new film sweeps up.",interactive:"Drag across the film to blow on it: it bulges and the colours stream and curl along your breath. Tap to touch it with a wet finger: a ripple and a swirl, and sometimes it pops. Hold to blow steadily until the film stretches into a bubble that floats away; then the wire dips in its bath and a fresh film sweeps up.",music:!0,gl:!0,fps:30,seed:0,make(e){const r=e.gl,h=e.size,f=Te(r),R=e.hash.slice(2),A=t=>{let i=parseInt(R.slice(t,t+8),16)>>>0,o=parseInt(R.slice(t+8,t+16),16)>>>0,n=parseInt(R.slice(t+16,t+24),16)>>>0,s=parseInt(R.slice(t+24,t+32),16)>>>0;const p=()=>{i>>>=0,o>>>=0,n>>>=0,s>>>=0;let u=i+o|0;return i=o^o>>>9,o=n+(n<<3)|0,n=n<<21|n>>>11,s=s+1|0,u=u+s|0,n=n+u|0,(u>>>0)/4294967296};for(let u=0;u<15;u++)p();return p},g=A(0),v=A(16),c=A(32),d=(t,i)=>{i=i||g;let o=0;for(const s of t)o+=s[1];let n=i()*o;for(const s of t)if(n-=s[1],n<=0)return s[0];return t[t.length-1][0]},a=(t,i,o)=>t+(i-t)*(o||v)();let M=d([["Round wire",45],["Square frame",25],["Twisted wire star",22],["Cube frame",8]]),U=d([["Soft window",42],["Ring light",24],["Warm lamp",24],["Dark field",10]]),X=d([["Glycerin-rich, slow bands",50],["Thin, quick marbling",50]]),P=d([["Black velvet",40],["Blurred garden",30],["Dark room, bokeh",30]]),x=d([["Steel",50],["Copper",30],["Brass",20]]),S=d([["None",82],["Bubble in a bubble",7],["Trapped dust mote",6],["Frost",5]]);e.home&&(M="Round wire",U="Soft window",X="Thin, quick marbling",P="Black velvet",x="Steel",S="None"),e.trait("Wire",M),e.trait("Light",U),e.trait("Mix",X),e.trait("Background",P),e.trait("Metal",x),e.trait("Rare",S);const y=["Round wire","Square frame","Twisted wire star","Cube frame"].indexOf(M),V=["Soft window","Ring light","Warm lamp","Dark field"].indexOf(U),W=X[0]==="T",n0=["Black velvet","Blurred garden","Dark room, bokeh"].indexOf(P),F=["None","Bubble in a bubble","Trapped dust mote","Frost"].indexOf(S),m=[y,0,0,0];y===0?m[1]=.94:y===1?(m[1]=.9,m[2]=.11):y===2?(m[1]=1,m[2]=.55,m[3]=a(-.18,.18)):(m[1]=.92,m[2]=.015);const x0=(y===0||y===1)&&v()<.45,Q=e.home?.57:y===3?a(.5,.54):x0?a(.68,.9):a(.5,.62),S0=x0?.18:.05,m0=e.home?.47:.5+a(-S0,S0),c0=e.home?.53:.5+a(-S0,S0*.6),Ee=y===3?.016:.019,Re=y===2?15:0,Me=(t,i,o,n)=>{const s=.809016994375,p=-.587785252292,u=-s,E=p;t=Math.abs(t);let N=Math.max(s*t+p*i,0);t-=2*N*s,i-=2*N*p,N=Math.max(u*t+E*i,0),t-=2*N*u,i-=2*N*E,t=Math.abs(t),i-=o;const D=n*-p,B=n*s-1,Y=I((t*D+i*B)/(D*D+B*B),0,o);return Math.hypot(t-D*Y,i-B*Y)*Math.sign(i*D-t*B)},E0=(t,i)=>{if(y===0)return Math.hypot(t,i)-m[1];if(y!==2){const s=Math.abs(t)-m[1]+m[2],p=Math.abs(i)-m[1]+m[2];return Math.hypot(Math.max(s,0),Math.max(p,0))+Math.min(Math.max(s,p),0)-m[2]}const o=Math.cos(m[3]),n=Math.sin(m[3]);return Me(o*t-n*i,n*t+o*i,m[1]-.06,m[2])-.06},z0=(t,i)=>[(t-m0)/Q,(i-c0)/Q],z=W?{drain:.1,evap:.0015,buoy:.55,eps:2.2,nAmp:.0035,nSc:1.6,damp:.7,fresh:.85,border:1.6,life:[30,46],n:1.335,rip:1}:{drain:.04,evap:7e-4,buoy:.3,eps:1.1,nAmp:.0015,nSc:1.1,damp:1.5,fresh:1.2,border:.9,life:[62,95],n:1.36,rip:.7};let f0=a(z.life[0],z.life[1],c),i0=e.home?f0*.32:f0*a(.1,.62,c);i0=Math.min(i0,f0-9),ge(r,f);const ee=g0(r,F0,F0,r.RGBA16F,r.RGBA,r.HALF_FLOAT),Fe=k0(r,ee),te=g0(r,_0,_0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE),_e=k0(r,te);r.disable(r.BLEND),r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.colorMask(!0,!0,!0,!0),r.bindVertexArray(f.vao),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,f.noise);{r.bindFramebuffer(r.FRAMEBUFFER,Fe),r.viewport(0,0,F0,F0),r.useProgram(f.env.p);const t=new Float32Array(24);t.set([V,j0,v()*7,0],0),V===0?(t.set([a(-.07,.03),a(0,.08),a(.16,.2),a(.19,.24)],4),t.set([1,.985,.96,1.25],8),t.set([.04,.042,.046,0],12),t.set([a(-.12,.12),a(-.1,.12),.022,0],16)):V===1?(t.set([a(-.03,.03),a(-.02,.04),a(.14,.17),.035],4),t.set([1,1,1,1.7],8),t.set([.035,.035,.038,0],12)):V===2?(t.set([a(0,.1),a(.03,.12),a(.13,.16),0],4),t.set([1,.7,.4,1.35],8),t.set([.07,.042,.022,0],12)):(t.set([0,0,0,0],4),t.set([1,1,1,.75],8),t.set([0,0,0,0],12)),r.uniform4fv(f.env.u.uA,t),r.drawArrays(r.TRIANGLES,0,3)}{r.bindFramebuffer(r.FRAMEBUFFER,_e),r.viewport(0,0,_0,_0),r.useProgram(f.bg.p);const t=new Float32Array(12),i=new Float32Array(64),o=new Float32Array(64);let n=0;if(n0===0)t.set([.008,.0075,.009,0],4);else if(n0===1){n=9;for(let s=0;s<n;s++){i.set([a(0,1),a(.3,1.05),a(.02,.1),a(.008,.07)],s*4);const p=v();o.set(p<.6?[.7,.9,.4]:[1,.95,.7],s*4)}}else{t.set([.009,.007,.006,0],4),n=13;for(let s=0;s<n;s++){i.set([a(-.05,1.05),a(-.05,1.05),a(.018,.09),a(.025,.22)],s*4);const p=v();o.set(p<.65?[1,.68,.36]:p<.85?[1,.85,.6]:[.55,.7,1],s*4)}}t[0]=n0,t[1]=n,t[2]=v()*5,t[3]=v(),r.uniform4fv(f.bg.u.uA,t),r.uniform4fv(f.bg.u.uB,i),r.uniform4fv(f.bg.u.uC,o),r.drawArrays(r.TRIANGLES,0,3)}const L0=f.noiseData,H0=(t,i,o)=>{t=t*128-.5,i=i*128-.5;const n=Math.floor(t),s=Math.floor(i),p=t-n,u=i-s,E=n&127,N=n+1&127,D=s&127,B=s+1&127,Y=L0[(D*128+E)*4+o],w0=L0[(D*128+N)*4+o],T0=L0[(B*128+E)*4+o],U0=L0[(B*128+N)*4+o];return(Y+(w0-Y)*p+(T0-Y)*u+(Y-w0-T0+U0)*p*u)/255},Ne=t=>{const i=new Uint16Array(k*k*4),o=D0(1),n=v()*10,s=v()*10,p=1-(.04+.26*t)*(W?1:.6),u=z.fresh*(.95-.3*t);for(let E=0;E<k;E++)for(let N=0;N<k;N++){const D=(N+.5)/k,B=(E+.5)/k;if(E0(D*2-1,B*2-1)>0)continue;const Y=H0(D*.9+n,B*.9+s,0),w0=H0(D*2.1+s,B*2.1+n,1),T0=H0(D*1.3-n,B*1.3,3),U0=I(B+.16*(Y-.5)+.06*(w0-.5),0,1);let Ce=U0>p?.012:.05+(u-.05)*Math.pow((p-U0)/p,.85)*(.7+.6*T0);const pe=(E*k+N)*4;i[pe]=D0(Ce),i[pe+1]=o}return i},q0=[0,1].map(()=>g0(r,h0,h0,r.RGBA16F,r.RGBA,r.HALF_FLOAT)),oe=q0.map(t=>k0(r,t)),De=Ne(I(i0/f0,0,1)),B0=[g0(r,k,k,r.RGBA16F,r.RGBA,r.HALF_FLOAT,De),g0(r,k,k,r.RGBA16F,r.RGBA,r.HALF_FLOAT)],ke=B0.map(t=>k0(r,t));let d0=0,$=0,w="film",G=0,P0=99,V0=0;const b0=[0,1].map(()=>({x:0,y:0,a:0,va:0,tgt:0,rad:.24}));let l0=0,u0=0,R0=0,j=0;const Z=[],e0=[];let t0=null,_=null;const p0=[];let v0=-1,L=null,q=null,C0=a(2,5,c);const l={down:!1,t:0,sx:0,sy:0,px:0,py:0,moved:0,kind:""};let A0=null;const b=F===2?{x0:a(-.3,.3),y0:a(-.35,.1),p1:v()*J,p2:v()*J,x:0,y:0,ang:v()*J,spin:a(1.2,2)*(v()<.5?-1:1),bx:0,by:0}:null,T=F===1?{x0:m0+a(-.2,.2),y0:a(.3,.42),p:v()*J,x:0,y:0,vx:0,vy:0,r:a(.15,.19)}:null,o0=[],re=t=>{o0.length=0;const i=2+Math.floor(v()*2);for(let o=0;o<i;o++){let n,s,p=0;do n=a(-.75,.75),s=a(-.75,.75),p++;while(E0(n,s)>-.12&&p<20);o0.push({x:n,y:s,ang:v()*J,t0:t-o*a(1.5,4),sp:a(.02,.03)})}};F===3&&re(-a(6,10,c));const I0=t=>Math.max(0,($-t.t0)*t.sp),a0=new Float32Array(48),O=new Float32Array(56),H=new Float32Array(33*4),ne=new Float32Array(96),Se=t=>{a0.fill(0),a0.set([t,1/h0,$,z.damp,z.buoy,z.eps,z.nAmp,z.nSc,m[0],m[1],m[2],m[3]],0);for(let o=0;o<4&&o<e0.length;o++){const n=e0[o],s=n.life>0?Math.max(0,1-n.t/n.life):1;a0.set([n.x,n.y,n.fx*s,n.fy*s],12+o*4),a0.set([n.rad,n.swirl*s,0,0],28+o*4)}const i=v0>-.5?(v0-c0)/Q*.5+.5:-1;a0[44]=i,a0[45]=Math.min(4,e0.length),O.fill(0),O.set([t,1/h0,$,z.drain,z.evap,z.border,z.fresh,i,m[0],m[1],m[2],m[3]],0),_&&O.set([_.x,_.y,_.r,1],12),O[16]=w==="bubble"||w==="empty"?1:0,O[17]=F===3&&w==="film"?1:0,O[18]=3,O[19]=Math.min(4,o0.length);for(let o=0;o<2;o++){const n=b0[o];n.va>0&&n.a>.002&&O.set([n.x,n.y,n.va*7,n.rad*.8],20+o*4)}u0>0&&l0>.01&&O.set([0,0,u0*.9,.75],28),t0&&O.set([t0.x,t0.y,t0.amt,t0.rad],36);for(let o=0;o<o0.length&&o<4;o++){const n=o0[o];O.set([n.x,n.y,n.ang,I0(n)],40+o*4)}},K=(t,i)=>{r.activeTexture(r.TEXTURE0+t),r.bindTexture(r.TEXTURE_2D,i)};let r0=0;function ie(t){$+=t,Se(t),r.disable(r.BLEND),r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.colorMask(!0,!0,!0,!0),r.bindVertexArray(f.vao),r.viewport(0,0,h0,h0),r.bindFramebuffer(r.FRAMEBUFFER,oe[1-r0]),r.useProgram(f.vel.p),K(0,q0[r0]),K(1,B0[d0]),K(2,f.noise),r.uniform4fv(f.vel.u.uA,a0),r.drawArrays(r.TRIANGLES,0,3),r0=1-r0,r.useProgram(f.jac.p),r.uniform4fv(f.jac.u.uA,a0.subarray(0,12));for(let i=0;i<ve;i++)r.bindFramebuffer(r.FRAMEBUFFER,oe[1-r0]),K(0,q0[r0]),r.drawArrays(r.TRIANGLES,0,3),r0=1-r0;r.viewport(0,0,k,k),r.bindFramebuffer(r.FRAMEBUFFER,ke[1-d0]),r.useProgram(f.hh.p),K(0,B0[d0]),K(1,q0[r0]),K(2,f.noise),r.uniform4fv(f.hh.u.uA,O),r.drawArrays(r.TRIANGLES,0,3),d0=1-d0}const C=e.sound,y0=[0,2,4,7,9],ze=(t,i)=>E0(t,i)<-.03;function Le(t,i,o){Z.length>=6&&Z.shift(),Z.push({x:t,y:i,age:0,amp:o})}function ae(t,i){if(w!=="film")return;let o=0;for(let n=0;n<16;n++){const s=n/16*J;o=Math.max(o,Math.hypot(Math.cos(s)*1.05-t,Math.sin(s)*1.05-i))}_={x:t,y:i,r:0,max:o+.05},w="pop",G=0,p0.length=0;for(let n=0;n<30;n++){const s=c()*J;p0.push({a:s,at:a(.08,o*.9,c),x:0,y:0,vx:0,vy:0,r:a(.006,.016,c),born:-1})}R0=0,j=0,C.hit("click",.55,{pan:I(t*.6,-.8,.8)}),C.hit("blip",.22,{freq:1500+c()*500}),C.hit("noise",.12,{cutoff:2600,dur:.18})}function qe(){w="bubble",G=0;const t=Q*(y===0?.94:.9);L={x:m0,y:c0,r:t*.92,z:0,vx:a(-.06,.06,c),vy:a(.03,.07,c),rot:c()*J},l0=0,u0=0,R0=0,j=0,C.hit("noise",.25,{cutoff:380,dur:.6}),C.note(76+y0[Math.floor(c()*5)],{dur:2.5,vel:.08,wave:"sine",attack:.05})}function se(){w="dip",G=0,_=null,C.hit("noise",.18,{cutoff:300,dur:.9})}function ce(t,i){const[o,n]=z0(t,i);if(w!=="film"||!ze(o,n))return;Le(o,n,.0011);const s=o*.5+.5,p=n*.5+.5;e0.push({x:s,y:p,fx:0,fy:0,rad:.05,swirl:(c()<.5?-1:1)*1.6,t:0,life:.45}),t0={x:o,y:n,amt:3,rad:.03,t:0};const u=.08+.85*I((n-.3)/.5,0,1)*I(i0/f0+.4,0,1);C.hit("blip",.16,{freq:520+c()*120}),C.note(81+y0[Math.floor(c()*5)],{dur:1.2,vel:.06,wave:"sine"}),c()<u&&ae(o,n)}function Be(t){const i=e.input,o=i.taps?i.taps():[];o.length&&(A0=o[o.length-1]),i.inside?P0=0:P0+=t;const n=i.x,s=1-i.y;if(i.down&&i.inside){l.down?l.t+=t:(l.down=!0,l.t=0,l.sx=n,l.sy=s,l.px=n,l.py=s,l.moved=0,l.kind="press",l.bt=0,A0=null);const p=t>0?(n-l.px)/t:0,u=t>0?(s-l.py)/t:0;l.moved+=Math.hypot(n-l.px,s-l.py),l.kind==="press"&&l.moved>.03&&(l.kind="drag"),l.kind==="press"&&l.t>.3&&(l.kind="hold"),l.kind==="drag"&&fe(n,s,p,u,t,1),l.kind==="hold"&&Ue(n,s,t),l.px=n,l.py=s}else l.down?(l.kind==="press"&&ce(l.sx,l.sy),l.down=!1,b0[0].tgt=0,R0=0,j=Math.max(0,j-.3)):A0&&ce(A0.x,1-A0.y),A0=null}function fe(t,i,o,n,s,p){const[u,E]=z0(t,i),N=Math.hypot(o,n),D=b0[p<1?1:0];if(D.x=u,D.y=E,D.tgt=(w==="film"?1:0)*Math.min(.07,N*.05)*p,D.rad=.26,w!=="film")return;const B=10*p/(2*Q);e0.push({x:u*.5+.5,y:E*.5+.5,fx:o*B,fy:n*B,rad:.065,swirl:0,t:0,life:0}),l.bt=(l.bt||0)-s,p>=1&&l.bt<=0&&N>.05&&(l.bt=.11,C.hit("noise",I(.06+N*.12,0,.3),{cutoff:450+N*900,dur:.28,pan:I((t-.5)*1.4,-.9,.9)}))}function Ue(t,i,o){if(w!=="film")return;const[n,s]=z0(t,i);j=Math.min(1.05,j+o/1.6),R0=.55*Math.pow(j,1.3),e0.push({x:n*.5+.5,y:s*.5+.5,fx:0,fy:0,rad:.12,swirl:.5*(1+j),t:0,life:0}),l.bt=(l.bt||0)-o,l.bt<=0&&(l.bt=.16,C.hit("noise",.08+j*.1,{cutoff:300+j*500,dur:.35,pan:I((t-.5)*1.4,-.9,.9)})),j>=1&&l0>.42&&qe()}function le(t){G+=t;for(const o of b0){const n=90*(o.tgt-o.a)-7*o.va;o.va+=n*t,o.a+=o.va*t,Math.abs(o.a)<1e-4&&Math.abs(o.va)<.001&&o.tgt===0&&(o.a=0,o.va=0)}{const o=45*(R0-l0)-6*u0;u0+=o*t,l0+=u0*t,w!=="film"&&(l0*=.8,u0=0)}for(let o=Z.length-1;o>=0;o--)Z[o].age+=t,Z[o].age>2.4&&Z.splice(o,1);for(let o=e0.length-1;o>=0;o--){const n=e0[o];n.t+=t,(n.life===0||n.t>n.life)&&e0.splice(o,1)}t0&&(t0.t+=t,t0.t>.25&&(t0=null));const i=P0>6&&!l.down;if(i&&w==="film"&&(C0-=t,!q&&C0<=0)){const o=c()*J,n=a(.25,.45,c),s=m0+a(-.15,.15,c),p=c0+a(-.2,.1,c);q={x0:s-Math.cos(o)*n,y0:p-Math.sin(o)*n,x1:s+Math.cos(o)*n,y1:p+Math.sin(o)*n,t:0,dur:a(1.4,2.2,c)},C0=a(5,10,c)}if(q){q.t+=t;const o=q.t/q.dur;if(o>=1||w!=="film")q=null,b0[1].tgt=0;else{const n=Math.sin(Math.PI*o),s=q.x0+(q.x1-q.x0)*o,p=q.y0+(q.y1-q.y0)*o;fe(s,p,(q.x1-q.x0)/q.dur*n,(q.y1-q.y0)/q.dur*n,t,.45)}}if(w==="film"){i0+=t;let o=i&&i0>f0;if(F===3){let n=!0;for(const s of o0)I0(s)<1.5&&(n=!1);n&&(V0+=t,V0>3&&(o=!0))}if(o){const n=a(-.35,.35,c);ae(n,Math.min(.8,-E0(n,.8)>.05?.8:.5))}}else if(w==="pop")_.r+=t*3.2,_.r>_.max&&(w="empty",G=0);else if(w==="empty")G>.5&&se();else if(w==="bubble")G>2.4&&se();else if(w==="dip"){const p=Math.min(1.06,c0+1.08*Q);if(G<.8){const u=G/.8;v0=-.03+(p+.03)*(u*u*(3-2*u))}else if(G<1)v0=p;else if(G<2.6){const u=(G-1)/1.6;v0=p-(p+.03)*(1-(1-u)*(1-u))}else v0=-1,w="film",i0=0,f0=a(z.life[0],z.life[1],c),V0=0,F===3&&re($+a(1.5,4,c)),_=null,C.note(84+y0[Math.floor(c()*5)],{dur:2.2,vel:.06,wave:"sine",attack:.2});Math.abs(G-1)<t&&C.note(60+y0[Math.floor(c()*5)],{dur:1.5,vel:.07,wave:"sine"})}_&&w!=="pop"&&w!=="empty"&&(_=null);for(const o of p0){if(o.born<0&&_&&_.r>=o.at){o.born=0,o.x=_.x+Math.cos(o.a)*o.at,o.y=_.y+Math.sin(o.a)*o.at;const n=a(.6,1.6,c);o.vx=Math.cos(o.a)*n,o.vy=Math.sin(o.a)*n}o.born>=0&&(o.born+=t,o.x+=o.vx*t,o.y+=o.vy*t,o.vy-=3*t,o.vx*=.96)}for(let o=p0.length-1;o>=0;o--)p0[o].born>.6&&p0.splice(o,1);if(L&&(L.z+=t*.9,L.x+=L.vx*t,L.y+=L.vy*t,L.rot+=t*.4,L.z>7&&(L=null)),b){if(b.x=b.x0+.22*Math.sin($*.11+b.p1)+b.bx,b.y=b.y0+.16*Math.sin($*.083+b.p2)+b.by,b.bx*=Math.exp(-t*.05),b.by*=Math.exp(-t*.05),l.down&&l.kind==="drag"){const[n,s]=z0(l.px,l.py);Math.hypot(n-b.x,s-b.y)<.3&&(b.bx+=(l.px-l.sx)*t*.8,b.by+=(l.py-l.sy)*t*.8)}const o=Math.hypot(b.x,b.y);E0(b.x,b.y)>-.12&&(b.bx-=b.x/o*t*.2,b.by-=b.y/o*t*.2),b.ang+=b.spin*t,w==="film"&&e0.push({x:b.x*.5+.5,y:b.y*.5+.5,fx:0,fy:0,rad:.035,swirl:.35*Math.sign(b.spin),t:0,life:0})}T&&(T.x=T.x0+.05*Math.sin($*.21+T.p)+T.vx,T.y=T.y0+.025*Math.sin($*.33+T.p*2)+T.vy,T.vx*=Math.exp(-t*.15),T.vy*=Math.exp(-t*.15),l.down&&l.kind==="drag"&&Math.hypot(l.px-T.x,l.py-T.y)<.2&&(T.vx+=(l.px-l.sx)*t*.4,T.vy+=(l.py-l.sy)*t*.4),T.vx=I(T.vx,-.3,.3),T.vy=I(T.vy,-.2,.3))}const He=.38,Pe=V===3?1.15:V===1?1.05:1.15,X0=x==="Steel"?[.72,.75,.8]:x==="Copper"?[.95,.52,.34]:[.92,.72,.36];function ue(t){H.fill(0),H.set([h,t,He,Pe,m0,c0,Q,Ee,m[0],m[1],m[2],m[3],X0[0],X0[1],X0[2],Re,1,1,1,V===3?1:0,z.n,n0>0?.8:0,h>500?.012:.008,0],0),_&&H.set([_.x,_.y,_.r,1],24),H.set([v0,l0,0,0],28);let i=0;for(const u of b0)Math.abs(u.a)>1e-4&&(H.set([u.x,u.y,u.a,u.rad],32+i*4),i++);for(let u=0;u<Z.length;u++){const E=Z[u];H.set([E.x,E.y,E.age,E.amp*z.rip],48+u*4)}let o=0;const n=(u,E,N,D,B,Y,w0,T0)=>{H.set([u,E,N,D],72+o*4),H.set([B,Y,w0,T0],84+o*4),o++};if(L){const u=1/(1+L.z);n(L.x,L.y+(1-u)*.05,L.r*u,.01+L.z*.02,L.rot,.55+L.z*.03,I(1.4-L.z*.2,0,1),0)}if(T&&(n(T.x+T.r*.22,T.y-T.r*.2,T.r*.5,.012,$*.3,.42,1,1),n(T.x,T.y,T.r,.008,-$*.2,.7,1,1)),b&&H.set([b.x,b.y,b.ang,w==="film"||w==="dip"?1:0],96),F===3){H[100]=w==="film"?1:0,H[101]=Math.min(4,o0.length);for(let u=0;u<o0.length;u++){const E=o0[u];H.set([E.x,E.y,E.ang,I0(E)],104+u*4)}}H.set([i,Z.length,o,y===3?1:0],120),y===3&&(H.set([.035,.045,.6,.27],124),H.set([.017,.022,.26,0],128));let s=0;for(const u of p0)u.born<0||s>=24||(ne.set([m0+u.x*Q,c0+u.y*Q,u.r*Q,I(1-u.born/.6,0,1)],s*4),s++);H[23]=s,r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,h,h),r.disable(r.BLEND),r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.SCISSOR_TEST),r.colorMask(!0,!0,!0,!0),r.bindVertexArray(f.vao);const p=y===3||F===3?Z0(r,f,"comp2"):f.comp;r.useProgram(p.p),K(0,B0[d0]),K(1,ee),K(2,te),K(3,f.lut),K(4,f.noise),r.uniform4fv(p.u.uA,H),r.uniform4fv(p.u.uD,ne),r.drawArrays(r.TRIANGLES,0,3)}let G0=a(1,3,c),O0=-1;function Ve(t){if(G0-=t,G0<=0&&(G0=a(4,8,c),C.note(72+y0[Math.floor(c()*5)]+(c()<.3?12:0),{dur:3.5,vel:.045,wave:"sine",attack:.9,pan:a(-.6,.6,c)})),w==="film"){const i=z.fresh*.75/(1+i0*z.drain*2.2),o=Math.floor(i*2*z.n*1e3/560);O0>=0&&o!==O0&&C.note(64+y0[(o%5+5)%5]+12*(o%2),{dur:1.6,vel:.06,wave:"triangle",attack:.2,cutoff:1600}),O0=o}}for(let t=0;t<44;t++)le(1/15),ie(1/15);return ue(0),(t,i)=>{if(i=Math.min(Math.max(i,0),.15),Be(i),le(i),i>0){const o=i>.05?2:1;for(let n=0;n<o;n++)ie(i/o)}ue(t),Ve(i)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
