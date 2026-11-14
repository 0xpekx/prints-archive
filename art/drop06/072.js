// Tea Bowl: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/072.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ae){Ae&&function(){"use strict";const ge=new WeakMap,Q=Math.PI*2,f0=(o,e,p)=>o<e?e:o>p?p:o,M0=256,E0=256,Q0=12,Je=10,et=1.8,tt=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,S0=`
uniform vec4 uC[24];
#define CAMP uC[0].xyz
#define TANH uC[0].w
#define CAMF uC[1].xyz
#define CAMR uC[2].xyz
#define HL uC[2].w
#define CAMU uC[3].xyz
#define RW uC[3].w
#define SUND uC[4].xyz
#define SUNON uC[4].w
#define SUNC uC[5].rgb
#define RIMH uC[5].w
#define WINC uC[6].xyz
#define WINHW uC[6].w
#define WINN uC[7].xyz
#define WINHH uC[7].w
#define WINU uC[8].xyz
#define MULW uC[8].w
#define WINCOL uC[9].rgb
#define LK uC[9].w
#define AMB uC[10].rgb
#define RIMR uC[10].w
#define CANP uC[11].xyz
#define CANS uC[11].w
#define WD uC[20].xyz
#define WIRR uC[20].w
#define EM ${et.toFixed(2)}
// atan2 from one-argument atan (each two-argument atan costs FXC 10-15 ms of compile per call site)
float at2(float y, float x) {
  float ax = abs(x), ay = abs(y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-12));
  a = ay > ax ? 1.5707963 - a : a;
  a = x < 0.0 ? 3.1415927 - a : a;
  return y < 0.0 ? -a : a;
}
vec3 camRay(vec2 uv) { vec2 s = (uv * 2.0 - 1.0) * TANH; return normalize(CAMF + s.x * CAMR + s.y * CAMU); }
vec2 envUV(vec3 R) { return R.xz / (1.0 + max(R.y, -0.6)) / (2.0 * EM) + 0.5; }
// how much of the sun gets through the window panes to P (soft edges grow with distance)
float winMask(vec3 P, vec3 L, float soft) {
  float dn = dot(L, WINN);
  if (dn > -1e-3) return 0.0;
  float t = dot(WINC - P, WINN) / dn;
  vec3 Q = P + L * t - WINC;
  vec3 WV = cross(WINN, WINU);
  float u = dot(Q, WINU), v = dot(Q, WV);
  float pen = soft + t * 0.01;
  float m = smoothstep(WINHW + pen, WINHW - pen, abs(u)) * smoothstep(WINHH + pen, WINHH - pen, abs(v));
  float bar = min(abs(u - uC[23].x), abs(v - uC[23].y));
  return m * smoothstep(MULW - pen, MULW + pen, bar);
}
vec3 keyDir(vec3 p) { return LK > 1.5 ? normalize(CANP - p) : SUND; }
vec3 keyRad(vec3 p) {
  if (LK > 1.5) { vec3 d = CANP - p; return SUNC * (CANS / dot(d, d)); }
  return SUNC * (SUNON * winMask(p, SUND, 0.006));
}`,Ne=`
vec2 hh2(vec2 c) {
  float a = fract(c.x * 0.7548776662 + c.y * 0.5698402910 + uC[21].w);
  float b = fract(c.x * 0.3678794412 + c.y * 0.8133070 + uC[21].w * 1.618);
  return vec2(fract(a * b * 43.13 + a * 7.71), fract(a + b * b * 29.37));
}
vec4 cells(vec2 p, float ph) {
  vec2 g = vec2(p.x - p.y * 0.5773503, p.y * 1.1547005);
  vec2 gi = floor(g + 0.5);
  float f1 = 9.0, f2 = 9.0; vec2 bv = vec2(0.0);
  int n3 = int(uC[23].z + 0.5);
  for (int j = 0; j < n3; j++) for (int i = 0; i < n3; i++) {
    vec2 c = gi + vec2(float(i - 1), float(j - 1));
    vec2 h = hh2(c);
    vec2 o = 0.33 * vec2(sin(ph * (0.6 + 0.8 * h.x) + 6.2832 * h.y), sin(ph * (0.5 + 0.9 * h.y) + 6.2832 * h.x + 1.3));
    vec2 d = p - (vec2(c.x + c.y * 0.5, c.y * 0.8660254) + o);
    float dd = dot(d, d);
    if (dd < f1) { f2 = f1; f1 = dd; bv = d; } else if (dd < f2) f2 = dd;
  }
  f1 = sqrt(f1); f2 = sqrt(f2);
  return vec4(f1, f2 - f1, bv);
}
vec2 cellP(vec2 x) { return x / (uC[21].x * (1.2 - 0.4 * dot(x, x) / (RW * RW))) + (texture(uN, x * 0.37 + uC[22].xy).rg - 0.5) * uC[21].z; }`,ot=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform vec4 uA[4];
${S0}
void main() {
  vec2 e = (vUv * 2.0 - 1.0) * EM;
  float q = dot(e, e);
  vec3 R = vec3(2.0 * e.x, 1.0 - q, 2.0 * e.y) / (1.0 + q);
  vec3 P0 = vec3(0.0, HL, 0.0);
  // the wall round the window and the ceiling, lit by it (warm plaster): a soft gradient toward the window, and the
  // ceiling, which a dark drink seen from above mirrors, brightest (with the warm bounce of the sun's patch)
  float gw = pow(max(dot(R, WD) * 0.5 + 0.5, 0.0), 3.0), ceil = smoothstep(0.7, 0.97, R.y);
  vec3 col = AMB * (0.55 + 0.45 * clamp(R.y, 0.0, 1.0)) + (WINCOL * vec3(1.0, 0.93, 0.82) * (WIRR * (0.06 + gw * (0.25 + 1.8 * ceil))) + SUNC * (SUNON * 0.03 * ceil)) * smoothstep(-0.2, 0.4, R.y);
  col *= mix(0.5, 1.0, smoothstep(-0.3, 0.1, R.y));
  float dn = dot(R, WINN);
  if (dn < -1e-3) {
    float t = dot(WINC - P0, WINN) / dn;
    vec3 Q = P0 + R * t - WINC;
    vec3 WV = cross(WINN, WINU);
    float u = dot(Q, WINU), v = dot(Q, WV);
    float m = smoothstep(WINHW + 0.06, WINHW - 0.06, abs(u)) * smoothstep(WINHH + 0.06, WINHH - 0.06, abs(v));
    if (m > 0.0) {
      float vy = v / WINHH;
      vec3 sky = mix(uA[1].rgb, uA[2].rgb, smoothstep(-0.9, 1.0, vy));
      float n = texture(uN, vec2(u * 0.07, 0.31) + uA[0].zw).r;
      float hor = -0.3 + 0.9 * n;   // high enough that a low view mirrors a tree line, not a white sheet
      float tree = smoothstep(hor + 0.05, hor - 0.05, vy) * max(uA[3].x, 0.92);
      float br = texture(uN, vec2(u, v) * 0.09 + uA[0].zw * 1.7).g;
      tree = max(tree, smoothstep(0.03, 0.0, abs(br - 0.5)) * smoothstep(-0.1, 0.9, vy + n * 0.4) * uA[3].y);
      sky = mix(sky, sky * 0.04, tree);
      float sd = max(dot(R, SUND), 0.0);
      sky += SUNC * (SUNON * (pow(sd, 3000.0) * 30.0 + pow(sd, 80.0) * 1.0));
      float bar = min(abs(u - uC[23].x), abs(v - uC[23].y));
      float fr = smoothstep(MULW + 0.03, MULW - 0.03, bar);
      col = mix(col, mix(sky, WINCOL * 0.03 + AMB, fr), m);
    }
  }
  if (LK > 1.5) {
    vec3 Lc = normalize(CANP - P0);
    vec3 dd = R - Lc;
    float up = max(dd.y, 0.0);
    float fl = exp(-(dd.x * dd.x + dd.z * dd.z) * 30000.0 - dd.y * dd.y * 6000.0 - up * 60.0);
    col += SUNC * (CANS * (fl * 3.0 + exp(-dot(dd, dd) * 150.0) * 0.003) + 0.12 * exp(-dot(dd, dd) * 2.5));   // and a warm pool on the ceiling above the flame
  }
  o = vec4(col, 1.0);
}`,Re=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform sampler2D uE;
#ifdef SPL
uniform sampler2D uT;
#endif
uniform vec4 uA[3];
${S0}
#define BA uC[12].xy
#define BB uC[12].zw
#define BC uC[13].xy
#define BTH uC[13].z
#define FOOTR uC[13].w
#define GLK uC[15].x
#define TRK uC[15].y
const float TAU = 6.2831853;
float dot2(vec2 v) { return dot(v, v); }
// distance to a quadratic Bezier and the parameter of the nearest point
vec2 bez(vec2 pos, vec2 A, vec2 B, vec2 C) {
  vec2 a = B - A, b = A - 2.0 * B + C, c = a * 2.0, d = A - pos;
  float kk = 1.0 / dot(b, b);
  float kx = kk * dot(a, b);
  float ky = kk * (2.0 * dot(a, a) + dot(d, b)) / 3.0;
  float kz = kk * dot(d, a);
  float p = ky - kx * kx, q = kx * (2.0 * kx * kx - 3.0 * ky) + kz;
  float h = q * q + 4.0 * p * p * p;
  float res, tt;
  if (h >= 0.0) {
    h = sqrt(h);
    vec2 x = (vec2(h, -h) - q) / 2.0;
    vec2 uv = sign(x) * pow(abs(x), vec2(1.0 / 3.0));
    tt = clamp(uv.x + uv.y - kx, 0.0, 1.0);
    res = dot2(d + (c + b * tt) * tt);
  } else {
    float z = sqrt(-p);
    float v = acos(q / (p * z * 2.0)) / 3.0;
    float m = cos(v), n = sin(v) * 1.732050808;
    vec3 t3 = clamp(vec3(m + m, -n - m, n - m) * z - kx, 0.0, 1.0);
    float r1 = dot2(d + (c + b * t3.x) * t3.x), r2 = dot2(d + (c + b * t3.y) * t3.y);
    res = min(r1, r2); tt = r1 < r2 ? t3.x : t3.y;
  }
  return vec2(sqrt(res), tt);
}
// profile coordinates with the hand-thrown wobble: an oval, and a rim that rises and dips
vec2 bowlQ(vec3 p) {
  float a = at2(p.z, p.x);
  float r = length(p.xz) * (1.0 + uC[14].x * cos(2.0 * (a - uC[14].y)));
  float w = uC[14].z * (sin(3.0 * a + uC[14].w) + 0.6 * sin(5.0 * a + 2.3 * uC[14].w));
  return vec2(r, p.y - w * smoothstep(BA.y, BC.y, p.y));
}
// (distance, Bezier parameter, distance to the shell alone)
vec3 bowlDT(vec3 p) {
  vec2 q = bowlQ(p);
  vec2 bz = bez(q, BA, BB, BC);
  float d = bz.x - BTH;
  float fh = BA.y - BTH * 0.5;
  vec2 fb = abs(vec2(q.x - FOOTR, q.y - fh * 0.5)) - vec2(0.05, fh * 0.5);
  return vec3(min(d, length(max(fb, 0.0)) + min(max(fb.x, fb.y), 0.0) - 0.01), bz.y, d);
}
float bowlSD(vec3 p) { return bowlDT(p).x; }
float softShadow(vec3 p, vec3 L, float k, float tmax) {
  vec3 oc = p - vec3(0.0, BC.y * 0.5, 0.0);
  float br = BC.x + BTH + 0.15, b = dot(oc, L), c = dot(oc, oc) - br * br;
  if (c > 0.0 && (b > 0.0 || b * b - c < 0.0)) return 1.0;
  float res = 1.0, t = 0.015;
  int n = int(uA[0].z + 0.5);
  for (int i = 0; i < n; i++) {
    float hh = bowlSD(p + L * t);
    res = min(res, k * hh / t);
    t += clamp(hh, 0.008, 0.25);
    if (res < 0.001 || t > tmax) break;
  }
  return clamp(res, 0.0, 1.0);
}
// a jittered grid: (distance to nearest point, F2 - F1, hash of nearest)
vec3 vor(vec2 g) {
  vec2 gi = floor(g), gf = fract(g);
  float f1 = 9.0, f2 = 9.0, hn = 0.0;
  int n3 = int(uC[23].z + 0.5);
  for (int j = 0; j < n3; j++) for (int i = 0; i < n3; i++) {
    vec2 o = vec2(float(i - 1), float(j - 1));
    vec2 hc = gi + o;
    vec2 hj = fract(sin(vec2(dot(hc, vec2(127.1, 311.7)), dot(hc, vec2(269.5, 183.3)))) * 43758.5453);
    float d = length(gf - o - hj * 0.8 - 0.1);
    if (d < f1) { f2 = f1; f1 = d; hn = hj.x; } else if (d < f2) f2 = d;
  }
  return vec3(f1, f2 - f1, hn);
}
void main() {
  vec3 ro = CAMP, rd = camRay(vUv);
  float tB = 1e9;
#ifdef BOWL
  const bool isBowl = true;
  // the liquid is clear: a ray that reaches its surface bends there and goes on to the glaze under it
  float tL = (HL - ro.y) / rd.y;
  vec3 PL = ro + rd * tL;
  bool wet = length(PL.xz) < RW + 0.03, bent = false;
#ifdef SPL
  // the march ran in its own pass (MSH, which compiles alongside this program): t, negative where the ray was bent
  vec4 TS = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  if (TS.r < 0.0) { ro = PL; rd = refract(rd, vec3(0.0, 1.0, 0.0), 0.75); bent = true; }
  tB = abs(TS.r);
#else
  vec3 oc = ro - vec3(0.0, BC.y * 0.5, 0.0);
  float br = length(vec2(BC.x + BTH + 0.12, BC.y * 0.5 + 0.1));
  float b = dot(oc, rd), c = dot(oc, oc) - br * br, h = b * b - c;
  if (h > 0.0) {
    float t = max(-b - sqrt(h), 0.0), t1 = -b + sqrt(h);
    int n = int(uA[0].y + 0.5);
    for (int i = 0; i < n; i++) {
      float d = bowlSD(ro + rd * t);
      if (d < 0.0003 * (t + (bent ? tL : 0.0))) { tB = t; break; }
      float tn = t + d * 0.85;
      if (wet && !bent && tn > tL) { ro = PL; rd = refract(rd, vec3(0.0, 1.0, 0.0), 0.75); t = 0.002; t1 = 4.0; bent = true; }
      else { t = tn; if (t > t1) break; }
    }
  }
#endif
#ifdef MSH
  if (tB > 1e8) { o = vec4(bent ? -1e9 : 1e9, 1.0, 1.0, 1.0); return; }
#endif
  if (tB > 1e8) {
    if (!bent) discard;
    float z = dot(PL - CAMP, CAMF);
    o = vec4(0.0, 0.0, 0.0, 200.0 + clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y));
    return;
  }
  float tP = tB;
#else
  const bool isBowl = false;
  const bool bent = false;
  vec3 PL = ro;
  float tP = -ro.y / rd.y;
#endif
  vec3 P = ro + rd * tP;
  vec3 N = vec3(0.0, 1.0, 0.0);
  vec3 alb; float spec, shin, metal = 0.0, ao = 1.0, inside = 0.0, lip = 0.0;
#ifdef BOWL
  {
    vec2 e = vec2(1.0, -1.0) * 0.0022;   // wider than the distance solve's noise (a finer step sparkled in the reflections)
    N = vec3(0.0);
    vec3 bi = vec3(0.0);
    int n4 = int(uA[2].x + 0.5);
    for (int i = 0; i < n4; i++) { vec3 k = i == 0 ? e.xyy : i == 1 ? e.yyx : i == 2 ? e.yxy : e.xxx; bi = bowlDT(P + k); N += k * bi.x; }
    N = normalize(N);
    vec2 q = bowlQ(P);
    vec2 bt = vec2(bi.z + BTH, bi.y);
    float s = bt.y;
    lip = smoothstep(0.96, 0.995, s);   // the rounded lip: inside and outside are both true here, pixel by pixel
    vec2 cp = mix(mix(BA, BB, s), mix(BB, BC, s), s);
    vec2 tg = normalize(mix(BB - BA, BC - BB, s));
    vec2 nO = vec2(tg.y, -tg.x);
    inside = dot(q - cp, nO) < 0.0 ? 1.0 : 0.0;
    float foot = bt.x - BTH > 0.004 ? 1.0 : 0.0;
    float a = at2(P.z, P.x), u = a / TAU + 0.5;
    // throwing rings
    vec3 T3 = normalize(vec3(tg.x * cos(a), tg.y, tg.x * sin(a)));
    float ring = sin(s * 135.0 + 4.0 * texture(uN, vec2(u * 3.0, s * 0.5)).r);
    N = normalize(N + T3 * ring * (0.008 + 0.016 * inside) * (1.0 - foot) * (1.0 - uC[15].w) * (0.35 + 0.65 * uA[1].z) * smoothstep(0.985, 0.93, s));   // rings fade at the lip and in small views (they sparkled as specks)   // uC[15].w: rings flattened for grazing views
#ifdef MSH
    {
      // the shadow marches toward the key and the window, for the glaze program
      vec2 shv = vec2(1.0);
      int nl = int(uA[1].w + 0.5);
      for (int li = 0; li < nl; li++) {
        vec3 L = li == 0 ? keyDir(P) : normalize(WINC - P);
        bool off = li == 0 ? LK < 1.5 && SUNON * max(SUNC.r, max(SUNC.g, SUNC.b)) < 1e-4 : WIRR * max(WINCOL.r, max(WINCOL.g, WINCOL.b)) < 1e-4;
        float s1 = 1.0;
        if (!off) s1 = softShadow(P + N * 0.004, L, li == 0 ? 16.0 : 2.0, 6.0);
        if (li == 0) shv.x = s1; else shv.y = s1;
      }
      o = vec4(bent ? -tB : tB, shv, 1.0);
      return;
    }
#endif
    float n1 = texture(uN, vec2(u * 6.0, s * 1.3)).r;
    // fine glaze noise, eased off in small views (sub-pixel noise sparkled along the rims as specks)
    float n2 = mix(0.5, texture(uN, vec2(u * 12.0, s * 1.5)).b, 0.35 + 0.65 * uA[1].z);
    float n3 = mix(0.5, texture(uN, vec2(u * 20.0, s * 5.0)).a, 0.35 + 0.65 * uA[1].z);
    vec2 vg = GLK < 0.5 ? vec2(u * 62.0, s * 17.0) : GLK < 1.5 ? vec2(u * 64.0, s * 15.0) + (vec2(n1, n3) - 0.5) * 0.9 : vec2(u * 160.0, s * 44.0);
    vec3 vv = vor(vg);
    spec = 0.05; shin = 300.0;
#if GK == 0
    {
      // oil-spot tenmoku: near-black iron glaze, rust where it thins at the lip, silver spots
      float thin = smoothstep(0.95, 0.995, s) * (0.5 + 0.5 * n2);
      alb = mix(vec3(0.026, 0.016, 0.010) * (0.6 + 0.9 * n2), vec3(0.05, 0.026, 0.012) * (0.7 + 0.5 * n1), thin);
      alb += vec3(0.03, 0.016, 0.008) * smoothstep(0.6, 0.95, texture(uN, vec2(u * 64.0, s * 0.5)).b) * (1.0 - thin) * (0.3 + 0.7 * s);
      float spot = smoothstep(0.17, 0.08, vv.x / (0.6 + 0.8 * vv.z)) * smoothstep(0.35, 0.8, vv.z) * smoothstep(0.3, 0.6, n1 + 0.2 * s) * smoothstep(0.12, 0.4, s) * (1.0 - thin) * (0.25 + 0.75 * uA[1].z);   // sub-pixel spots sparkled in tiles
      alb = mix(alb, vec3(0.1, 0.095, 0.09) * (0.7 + 0.5 * n3), spot * 0.6);
      metal = spot * 0.6;
      spec = 0.055; shin = 500.0;
    }
#elif GK == 1
    {
      // celadon: pale grey-green, pooling deeper in the well, a crackle network
      alb = vec3(0.34, 0.45, 0.39) * (0.9 + 0.2 * n1);
      alb = mix(alb, vec3(0.15, 0.29, 0.23), inside * (1.0 - smoothstep(0.05, 0.6, s)) * 0.8);
      alb = mix(alb, vec3(0.40, 0.37, 0.30), smoothstep(0.92, 1.0, s) * 0.5);
      alb *= 1.0 - 0.1 * max(ring, 0.0) * inside;
      float crack = smoothstep(0.035, 0.0, vv.y) * (0.5 + 0.5 * n2) * (0.1 + 0.9 * uA[1].z);
      alb *= 1.0 - 0.45 * crack;
      spec = 0.05; shin = 240.0;
    }
#elif GK == 2
    {
      // natural ash glaze: rough speckled clay, glassy green runs from the rim, a glass pool in the well
      vec3 clay = vec3(0.19, 0.14, 0.10) * (0.75 + 0.5 * n3);
      clay *= 1.0 - 0.6 * smoothstep(0.2, 0.05, vv.x) * step(0.7, vv.z);
      float ash = smoothstep(0.35, 0.7, n1 + 0.3 * s);
      alb = mix(clay, mix(vec3(0.17, 0.16, 0.10), vec3(0.25, 0.23, 0.14), n2), ash * 0.8);
      float cl = texture(uN, vec2(u * 9.0, 0.37 + s * 0.08)).r;
      float len = 0.1 + 0.5 * texture(uN, vec2(u * 9.0, 0.71)).g;
      float run = smoothstep(0.62, 0.68, cl) * smoothstep(1.0 - len - 0.02, 1.0 - len + 0.03, s);
      alb = mix(alb, vec3(0.07, 0.12, 0.05) * (0.8 + 0.5 * n2), run * 0.65);
      float pool = inside * (1.0 - smoothstep(0.25, 0.42, s + 0.06 * n1));
      alb = mix(alb, vec3(0.05, 0.15, 0.08), pool);
      float gl = max(run, pool);
      spec = mix(0.02, 0.05, gl); shin = mix(25.0, 400.0, gl);
    }
#else
    {
      // black raku with a crack mended in gold
      alb = vec3(0.028, 0.024, 0.022) * (0.75 + 0.5 * n1) + vec3(0.02, 0.012, 0.008) * n2;
      spec = 0.035; shin = 60.0;
      float uc = uC[22].z + 0.035 * sin(s * 6.0 + uC[22].w) + 0.03 * (texture(uN, vec2(s * 2.0, 0.53)).r - 0.5);
      float du = abs(fract(u - uc + 0.5) - 0.5) * TAU * q.x;
      float ub = uc + (s - 0.6) * 0.14 + 0.01 * sin(s * 20.0);
      float du2 = s > 0.6 ? abs(fract(u - ub + 0.5) - 0.5) * TAU * q.x : 9.0;
      float uc3 = uc + 0.47 + 0.02 * sin(s * 9.0);
      du = min(du, abs(fract(u - uc3 + 0.5) - 0.5) * TAU * q.x + (s < 0.35 ? 9.0 : 0.0));
      float gold = smoothstep(0.013, 0.006, min(du, du2 + 0.003)) * step(0.06, s);
      alb = mix(alb, vec3(0.95, 0.68, 0.30) * (0.8 + 0.3 * n3), gold);
      metal = gold * 0.45; shin = mix(shin, 180.0, gold);
    }
#endif
    // the unglazed foot and the lower outside
    float glazed = inside > 0.5 ? 1.0 : smoothstep(0.0, 0.03, s - (0.52 + 0.08 * n1 - (GLK > 1.5 && GLK < 2.5 ? 0.12 * n2 : 0.0)));
    glazed *= 1.0 - foot;
    vec3 clayF = vec3(0.26, 0.19, 0.14) * (0.7 + 0.5 * n3);
    alb = mix(clayF, alb, glazed); spec = mix(0.015, spec, glazed); shin = mix(16.0, shin, glazed); metal *= glazed;
    ao = inside > 0.5 ? mix(0.3, 1.0, smoothstep(BA.y, BC.y, P.y)) : mix(0.35, 1.0, smoothstep(0.0, 0.3, P.y));
  }
#else
  {
    vec2 x = P.xz;
    float fade = uA[1].z;
    if (TRK < 0.5) {
      // an oiled dark wood tray on a darker table
      vec2 w = vec2(x.x * 0.05, x.y * 0.55) + uC[22].xy;
      float g = texture(uN, w).r * 6.0 + texture(uN, vec2(x.x * 0.4, x.y * 3.0)).g * 0.7;
      float rg = smoothstep(0.15, 0.5, abs(fract(g) - 0.5));
      float pore = texture(uN, vec2(x.x * 0.6, x.y * 14.0)).b;
      alb = mix(vec3(0.026, 0.015, 0.009), vec3(0.075, 0.042, 0.022), rg * 0.6 + 0.4 * texture(uN, w * 3.0).a);
      alb *= 0.8 + 0.4 * mix(0.5, pore, fade);
      spec = 0.03; shin = 90.0;
      float e = max(abs(x.x) - 2.6, abs(x.y - 0.25) - 1.95);
      if (e > 0.0) { alb *= 0.22; spec = 0.012; }
      alb *= 1.0 + 1.5 * exp(-abs(e) / 0.02) * step(-0.06, e) * step(e, 0.0);
    } else if (TRK < 1.5) {
      // a slate plate with a ragged edge
      float n = texture(uN, x * 0.35 + uC[22].xy).r, f = texture(uN, x * 2.2).b;
      alb = vec3(0.040, 0.045, 0.050) * (0.7 + 0.5 * n + 0.25 * f * fade);
      alb *= 0.9 + 0.25 * smoothstep(0.47, 0.53, texture(uN, vec2(x.x * 0.2 + x.y * 0.1, x.y * 0.9)).g);
      N = normalize(N + vec3(texture(uN, x * 0.9).r - 0.5, 0.0, texture(uN, x * 0.9 + 0.3).r - 0.5) * 0.12);
      spec = 0.03; shin = 30.0;
      float e = max(abs(x.x) - 2.0, abs(x.y + 0.15) - 1.75) + 0.05 * texture(uN, x * 1.7).r;
      if (e > 0.0) { N = vec3(0.0, 1.0, 0.0); alb = vec3(0.022, 0.013, 0.008) * (0.7 + 0.6 * texture(uN, vec2(x.x * 0.06, x.y * 0.6)).r); spec = 0.01; shin = 30.0; }
      alb *= 1.0 + 1.2 * exp(-abs(e) / 0.015) * step(e, 0.0);
    } else {
      // a linen cloth: weave, slubs and soft folds
      float k = 250.0;
      float wv = sin(x.x * k) * sin(x.y * k) * 0.5 + 0.5 * sin(x.x * k * 0.5 + 1.0) * sin(x.y * k * 0.5);
      float slub = texture(uN, vec2(x.x * 0.25, x.y * 7.0)).b - 0.5 + texture(uN, vec2(x.x * 7.0, x.y * 0.25)).b - 0.5;
      alb = vec3(0.30, 0.27, 0.22) * (0.9 + 0.12 * wv * fade + 0.22 * slub);
      N = normalize(N + vec3(sin(x.x * 1.3 + x.y * 0.5) * 0.06, 0.0, cos(x.y * 1.1 - x.x * 0.3) * 0.05));
      spec = 0.012; shin = 8.0;
    }
    ao = mix(0.22, 1.0, smoothstep(FOOTR + 0.05, BC.x + BTH + 0.3, length(P.xz)));
  }
#endif
  // light: the key (sun through the window, or the candle) and the window's soft sky light
  vec3 V = -rd, col = vec3(0.0);
  int nl = int(uA[1].w + 0.5);
  for (int li = 0; li < nl; li++) {
    vec3 L = li == 0 ? keyDir(P) : normalize(WINC - P);
    vec3 rad = li == 0 ? keyRad(P) : WINCOL * WIRR;
    if (max(rad.r, max(rad.g, rad.b)) < 1e-4) continue;
    float nd = dot(N, L);
    float dif = li == 0 ? max(nd, 0.0) : pow(clamp((nd + 0.5) / 1.5, 0.0, 1.0), 1.5);
#ifdef SPL
    float sh = li == 0 ? TS.g : TS.b;
#else
    float sh = softShadow(P + N * 0.004, L, li == 0 ? (isBowl ? 16.0 : 6.0) : 2.0, 6.0);
#endif
    vec3 H = normalize(L + V);
    float sp = min(pow(max(dot(N, H), 0.0), shin) * (shin + 8.0) / 25.0, 5.0);
    col += rad * sh * (alb * (1.0 - metal) * dif + mix(vec3(spec), alb, metal) * sp * max(nd, 0.0));
  }
  col += alb * AMB * ao * (0.6 + 0.4 * N.y);
  if (bent) col += alb * uC[18].rgb * (1.0 - metal) * (WINCOL * (WIRR * 4.0) + SUNC * (SUNON * 0.08));   // a pale bowl lights its own inside (bounce scaled by the glaze's mean colour)
  if (!isBowl) col += alb * mix(0.4, 1.0, ao) * (SUNC * (SUNON * 0.03) + WINCOL * (WIRR * 0.1));   // bounce from the lit wood and the room
  vec3 R = reflect(rd, N);
  float occ = 1.0;
  if (isBowl) {
    occ = smoothstep(-0.3, 0.05, R.y);
    if (inside > 0.5) occ = mix(smoothstep(-0.06, 0.16, R.y) * smoothstep(RIMR + 0.05, RIMR - 0.1, length(P.xz + R.xz * (BC.y - P.y) / max(R.y, 0.02))), occ, lip);
  }   // the tray's reflection is glossy: the old cut-out of the bowl in it read as a pale pedestal under the bowl
  float fr = pow(1.0 - max(dot(N, V), 0.0), 5.0);
  vec3 F = mix(vec3(spec + (1.0 - spec) * fr), alb * (0.7 + 0.3 * fr), metal);
  vec3 ev = vec3(0.0);
#ifdef BOWL
  { vec3 Rk = R; ev = texture(uE, envUV(Rk)).rgb; }
#else
  // the tray's reflection is glossy: a few taps around the mirror direction
  int nG = int(uA[2].z + 0.5);
  float gr0 = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 6.2831853;
  for (int k = 0; k < nG; k++) {
    float ga = float(k) * 2.3999632 + gr0, gq = sqrt((float(k) + 0.5) / float(nG)) * 0.16;
    vec3 Rk = normalize(R + (CAMR * cos(ga) + vec3(0.0, 0.0, 1.0) * sin(ga)) * gq);
    ev += texture(uE, envUV(Rk)).rgb;
  }
  ev /= float(nG);
#endif
  col += ev * F * occ * mix(1.0, ao, 0.6) * (isBowl ? (bent ? 0.1 : 1.0) : uA[2].y * mix(1.0, 0.45, smoothstep(0.12, 0.4, R.y)));
  // under the liquid: what the drink absorbs along the way in and the way out
  if (bent) col *= exp(-uC[16].rgb * 2.4 * (length(P - PL) + (HL - P.y) * 1.2));
  float z = dot((bent ? PL : P) - CAMP, CAMF);
  o = vec4(col, clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y) + (bent ? 200.0 : 0.0));
}`,at=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uS;
uniform vec4 uA[1];
void main() {
  float S = uA[0].x; vec2 px = vec2(1.0 / S);
  vec2 uv = gl_FragCoord.xy / S;
  vec4 c0 = texture(uS, uv);
  bool l0 = c0.a > 100.0;
  float k0 = l0 ? c0.a - 200.0 : c0.a;
  vec3 sum = c0.rgb; float ls = l0 ? 1.0 : 0.0, ws = 1.0;
  int n = int(uA[0].z + 0.5);
  float mc = uA[0].y;
  float rot = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 6.2831853;
  for (int i = 1; i < n; i++) {
    float fi = float(i);
    float r = sqrt(fi / float(n)) * (fract(fi * 0.5) < 0.25 ? mc : clamp(abs(k0) + 1.5, 1.5, mc));   // half the taps within the pixel's own blur (few taps there sparkled on lightly blurred rims)
    float a = fi * 2.3999632 + rot;
    vec4 s = texture(uS, uv + vec2(cos(a), sin(a)) * r * px);
    bool l = s.a > 100.0;
    float k = l ? s.a - 200.0 : s.a;
    float cv = abs(k);
    if (k > k0) cv = min(cv, abs(k0));
    float w = clamp(cv - r + 1.0, 0.0, 1.0);
    sum += w * min(s.rgb, vec3(3.0)); ls += w * (l ? 1.0 : 0.0); ws += w;
  }
  // in focus: the pixel's own colour (a few random taps at a hard silhouette sparkled along the rims)
  float fk = smoothstep(1.6, 0.6, abs(k0)) * smoothstep(10.0, 5.0, ws);
  vec4 ob = mix(vec4(sum / ws, ls / ws), vec4(c0.rgb, l0 ? 1.0 : 0.0), fk);
  o = ob;
}`,st=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uD;
uniform sampler2D uN;
uniform vec4 uA[4];
${S0}
${Ne}
void main() {
  vec2 uv = vUv;
  float dt = uA[0].x, t = uA[0].y;
  vec2 v = vec2(0.0, uA[0].w * (0.5 + 0.7 * uv.y));
  float tx = 1.0 / 128.0;
  vec2 np = uv * vec2(1.3, 0.9) + vec2(t * 0.006, -t * 0.04);
  float n0 = texture(uN, np).r, nx = texture(uN, np + vec2(tx, 0.0)).r, ny = texture(uN, np + vec2(0.0, tx)).r;
  v += uA[3].y * vec2(ny - n0, n0 - nx) * 3.0;
  vec2 np2 = uv * vec2(3.0, 2.2) + vec2(-t * 0.015, -t * 0.085);
  float m0 = texture(uN, np2).g, mx = texture(uN, np2 + vec2(tx, 0.0)).g, my = texture(uN, np2 + vec2(0.0, tx)).g;
  v += uA[3].y * vec2(my - m0, m0 - mx) * 1.2;
  vec2 gd = uv - uA[1].xy;
  float gw = exp(-dot(gd, gd) / (uA[2].x * uA[2].x));
  v += uA[1].zw * gw;
  vec2 pd = uv - uA[2].yz;
  float pw = exp(-dot(pd, pd) / 0.03) * uA[2].w;
  v += vec2(pd.x * 1.2, 0.35) * pw;
  vec4 D = texture(uD, uv - v * dt);
  float strip = 1.0 - min(0.9, gw * length(uA[1].zw) * dt * 5.0);
  float cnd = 1.0 - exp(-dt * 1.4);
  float d = (D.r * exp(-dt * uA[3].z * (1.0 + 2.0 * smoothstep(uA[3].w, uA[3].w + 0.35, uv.y))) + D.g * cnd) * strip;
  float vap = D.g * (1.0 - cnd) * strip;
  vec3 rd = camRay(uv);
  vec2 x = (CAMP + rd * ((HL - CAMP.y) / rd.y)).xz;
  float r = length(x);
  if (r < RW) {
    vec2 cp = cellP(x);
    vec4 cv = cells(cp, uA[3].x);
    float hot = 1.0 - smoothstep(0.0, 0.2, cv.x);
    float gate = smoothstep(0.42, 0.6, texture(uN, (cp - cv.zw) * 0.11 + vec2(t * 0.003, 0.0)).r);
    float pl = smoothstep(0.3, 0.8, texture(uN, x * 0.55 + vec2(t * 0.011, -t * 0.019)).a);
    vap += dt * uA[0].z * (0.006 + hot * gate) * (0.1 + 1.4 * pl) * smoothstep(RW, RW * 0.8, r);
    vap += dt * pw * 1.2 * (0.3 + hot);
  }
  o = vec4(min(d, 3.0), min(vap, 3.0), 0.0, 1.0);
}`,nt=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uB;
uniform sampler2D uE;
uniform sampler2D uSt;
uniform sampler2D uN;
uniform vec4 uA[${18+Q0*2}];
${S0}
${Ne}
#define ABSB uC[16].rgb
#define YBOT uC[16].w
#define SCAT uC[17].rgb
#define DUSTK uC[17].w
#define GLZ uC[18].rgb
#define SHEEN uC[18].w
#define FOAMC uC[19].rgb
#define PW uC[19].w
#define MATTE uC[21].y
vec3 envAt(vec3 R) { return texture(uE, envUV(R)).rgb; }
float rimVis(vec2 x, vec3 L, float pen) {
  if (L.y < 0.01) return 0.0;
  vec2 Q = x + L.xz * (RIMH - HL) / L.y;
  return smoothstep(RIMR + pen, RIMR - pen, length(Q));
}
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
// the things that float or fly: albedo and coverage in object units (long axis x, about -1..1)
vec4 objShape(float k, vec2 q, float sd0, float px, out float sdo) {
  vec3 alb = vec3(0.0); float sd = 1.0;
  float n1 = texture(uN, q * 0.23 + sd0).b, n2 = texture(uN, q * 0.07 + sd0 * 1.7).r;
  if (k < 0.5) {
    // a tea leaf, opened in the water: serrated, a pale midrib, veins
    float xx = clamp(q.x, -1.0, 1.0);
    float w = 0.36 * pow(max(1.0 - xx * xx, 0.0), 0.7) * (1.0 + 0.15 * xx);
    w = w * (0.8 + 0.4 * texture(uN, vec2(q.x * 0.11, sd0)).r) - 0.03 * abs(fract(q.x * 11.0 + sd0) - 0.5) * smoothstep(1.0, 0.7, abs(xx));
    sd = max(abs(q.y) - w, abs(q.x) - 1.0);
    sd = min(sd, sdSeg(q, vec2(-1.2, 0.02), vec2(-0.9, 0.0)) - 0.035);
    float vy = abs(q.y) / max(w, 1e-3);
    // a steeped leaf: clear deep green, crumpled, the midrib only a little paler
    alb = mix(vec3(0.047, 0.092, 0.018), vec3(0.095, 0.165, 0.036), n2) * (0.8 + 0.4 * n1);
    alb = mix(alb, vec3(0.10, 0.13, 0.04), 0.5 * exp(-q.y * q.y / 0.0005) * step(abs(q.x), 1.0));
    float vn = abs(fract(q.x * 3.2 - abs(q.y) * 3.4 + sd0) - 0.5);
    alb *= 1.0 + 0.08 * exp(-vn * vn / 0.003) * step(vy, 0.9);
    alb *= 0.85 + 0.3 * smoothstep(0.55, 1.0, vy);
  } else if (k < 1.5) {
    // a tea stem: a thin twig with a node
    sd = sdSeg(q, vec2(-1.0, 0.0), vec2(1.0, 0.0)) - 0.075 * (1.0 - 0.25 * q.x) - 0.03 * exp(-(q.x - 0.35) * (q.x - 0.35) / 0.0036);
    float cy = clamp(q.y / 0.09, -1.0, 1.0);
    alb = mix(vec3(0.17, 0.14, 0.05), vec3(0.30, 0.25, 0.10), n2) * (0.55 + 0.6 * (1.0 - cy * cy)) * (0.85 + 0.3 * cy);
  }
#ifdef FLW
  else if (k < 2.5) {
    // an osmanthus flower: four rounded petals
    float a = at2(q.y, q.x) + sd0 * 3.0, r = length(q);
    sd = r - 0.95 * (0.5 + 0.45 * pow(abs(cos(2.0 * a)), 0.6));
    alb = mix(vec3(0.80, 0.40, 0.05), vec3(0.95, 0.60, 0.16), n1) * (0.7 + 0.4 * r);
    alb = mix(alb, vec3(0.45, 0.22, 0.03), smoothstep(0.22, 0.08, r));
    alb *= 1.0 - 0.3 * smoothstep(0.08, 0.0, abs(fract(a / 1.5708 + 0.5) - 0.5)) * smoothstep(0.1, 0.4, r);
  }
#endif
#ifdef PET
  else {
    // a petal, base at -x: camellia (crimson) or cherry (pale pink, notched)
    float cherry = step(3.5, k);
    float xx = q.x;
    float w = 0.72 * sqrt(max(1.0 - (xx - 0.1) * (xx - 0.1) / 1.1025, 0.0)) * (0.45 + 0.55 * smoothstep(-1.0, 0.1, xx));
    sd = max(abs(q.y) - w, abs(xx - 0.05) - 1.0);
    sd = max(sd, -(length(q - vec2(1.08, 0.0)) - 0.22 * cherry));
    float va = at2(q.y, q.x + 1.0);
    float vl = abs(fract(va * 7.0 + sd0) - 0.5);
    vec3 cA = mix(vec3(0.36, 0.015, 0.03), vec3(0.78, 0.50, 0.52), cherry);
    vec3 cB = mix(vec3(0.62, 0.22, 0.20), vec3(0.85, 0.66, 0.66), cherry);
    alb = mix(cA, cB, smoothstep(-0.3, -1.0, xx)) * (0.85 + 0.3 * n2);
    alb *= 1.0 - 0.15 * exp(-vl * vl / 0.004);
    alb *= 0.85 + 0.3 * smoothstep(0.6, 1.0, abs(q.y) / max(w, 1e-3));
  }
#endif
  sdo = sd;
  return vec4(alb, smoothstep(px, -px, sd));
}
void main() {
  float S = uA[0].x, t = uA[0].y, T = uA[0].z;
  vec2 uv = gl_FragCoord.xy / S;
  vec4 Bk = texture(uB, uv);
  vec3 col = Bk.rgb;
  vec3 rd = camRay(uv);
  float tl = (HL - CAMP.y) / rd.y;
  vec3 P = CAMP + rd * tl;
  vec2 x = P.xz; float r = length(x);
  vec3 kd = keyDir(P);
  float kv = rimVis(x, kd, 0.03);
  vec3 kr = keyRad(P) * (kv * uA[6].w);
  vec3 Lin = kr * max(kd.y, 0.0) + WINCOL * (WIRR * (0.25 + 0.75 * rimVis(x, WD, 0.5))) + AMB;
  float dep = max(HL - mix(YBOT, HL, pow(clamp(r / RW, 0.0, 1.0), PW)), 0.0);
  vec3 tr = exp(-ABSB * dep * 2.4);
  if (Bk.a > 0.003) {
    vec2 sl = vec2(0.0);
    vec2 cpx = cellP(x);
    vec4 cv = cells(cpx, uA[1].x);
    sl += cv.zw * uA[1].y * smoothstep(0.55, 0.12, cv.x) * smoothstep(0.0, 0.12, cv.y);
    float patchy = smoothstep(0.25, 0.75, texture(uN, x * 0.6 + vec2(uA[1].x * 0.002, 0.0)).a);
    // tea dust, swept out of the rising cell centres into soft threads where the liquid sinks: uneven in width,
    // broken and rejoined by slow noise (no even outline net)
    float tw = 0.12 + 0.26 * texture(uN, cpx * 0.29 + vec2(0.0, uA[1].x * 0.003)).g;
    float tb = smoothstep(0.42, 0.7, texture(uN, cpx * 0.17 - vec2(uA[1].x * 0.002, 0.0)).r);
    float line = exp(-cv.y * cv.y / (tw * tw)) * tb * (0.35 + 0.65 * patchy);
    // ripple rings
    int nR = int(uA[1].w + 0.5);
    for (int i = 0; i < nR; i++) {
      vec4 rp = uA[8 + i];
      vec2 d = x - rp.xy; float rr = length(d) + 1e-4;
      float k = (rr - rp.z * 0.45) / 0.028;
      float env = exp(-k * k * 0.16) * rp.w * exp(-rp.z * 0.8) / (1.0 + rr * 7.0);
      sl += d / rr * env * cos(k * 2.3);
    }
#ifdef ACT
    // (ACT: the variant used while you blow or pour, compiled after the first frame so the opening compiles less)
    // wind ripples where you blow: two crossing trains in a noisy patch
    vec4 g = uA[2]; float gs = length(g.zw);
    if (gs > 1e-3) {
      vec2 gd = x - g.xy; float gw = exp(-dot(gd, gd) / (uA[3].x * uA[3].x));
      vec2 dir = g.zw / gs, dir2 = vec2(dir.x * 0.94 - dir.y * 0.34, dir.y * 0.94 + dir.x * 0.34);
      float nn = texture(uN, x * 1.4 - dir * t * 0.3).a;
      sl += (dir * cos(dot(x, dir) * 70.0 - t * 9.0) + dir2 * 0.4 * cos(dot(x, dir2) * 105.0 - t * 12.0)) * gw * gs * 1.6 * smoothstep(0.25, 0.75, nn);   // finer trains aliased into dots
    }
    // the pour: churn near the stream
    vec2 fd = x - uA[3].yz; float fr2 = length(fd);
    sl += (texture(uN, x * 0.9 + vec2(t * 0.25, -t * 0.2)).rg - 0.5) * uA[7].w * exp(-fr2 * fr2 / 0.05) * 0.15;
    sl += fd / (fr2 + 1e-3) * uA[7].w * exp(-fr2 * fr2 / 0.0025) * 1.2;
#endif
    // the meniscus climbing the wall
    sl += x / max(r, 1e-3) * exp(-max(RW - r, 0.0) / 0.016) * 0.7;
    vec3 N = normalize(vec3(-sl.x, 1.0, -sl.y));
    vec3 Rf = reflect(rd, N);
    float F = 0.02 + 0.98 * pow(1.0 - max(dot(-rd, N), 0.0), 5.0);
    vec3 wall = GLZ * (WINCOL * WIRR * 0.5 + AMB * 2.0);
    vec3 refl = envAt(Rf);
    refl = Rf.y > 0.0 ? mix(refl, wall, smoothstep(RIMR - 0.06, RIMR + 0.02, length(x + Rf.xz * (RIMH - HL) / Rf.y))) : wall;
    // the glaze under the liquid (baked with the drink's absorption), shifted by the surface's slope
    vec2 so = vec2(dot(sl, CAMR.xz), dot(sl, CAMU.xz)) * (dep * 0.5 / (tl * 2.0 * TANH));
    vec4 Bo = texture(uB, uv + so);
    vec3 base = mix(Bk.rgb, Bo.rgb, Bk.a * Bo.a);
    vec3 body = Lin * SCAT * (1.0 - tr + 1.5 * tr * (1.0 - tr)) * (1.0 + 3.0 * max(inversesqrt(max(1.0 - 0.5625 * (1.0 - rd.y * rd.y), 0.05)) - 1.18, 0.0));   // deeper only in low views
    float cool = smoothstep(0.04, 0.45, T);
    float dmul = 1.0 - DUSTK * 0.9 * line * cool;
    body *= dmul;
    float spk = smoothstep(0.8, 0.93, texture(uN, cpx * 0.23 + vec2(uA[1].x * 0.004, 0.0)).b);
    body += Lin * SCAT * spk * DUSTK * (0.4 + line) * 0.8;
    // whisked matcha: an opaque satin froth of pin bubbles, thicker and paler over part of the surface, thinning to
    // darker green elsewhere, a few larger bubbles, a pale froth line at the wall; no mirror image, one broad sheen
    float bub = texture(uN, x * 3.1 + vec2(uA[1].x * 0.003)).b;
    float thick = smoothstep(0.3, 0.7, texture(uN, x * 0.42 + vec2(uA[1].x * 0.001, 0.37)).g);
    float bigb = smoothstep(0.8, 0.9, texture(uN, x * 1.7 + 0.53).a) * thick;
    vec3 froth = Lin * SCAT * (mix(0.72, 1.1, thick) * (0.88 + 0.24 * bub) * (1.0 - 0.3 * bigb) + 0.45 * exp(-max(RW - r, 0.0) / 0.025));
    body = mix(body, froth + WINCOL * (WIRR * 0.05 * pow(max(dot(Rf, WD), 0.0), 3.0)) * SCAT * 8.0, MATTE);
    vec3 lc = body * (1.0 - F) + refl * F * (1.0 - MATTE) * (1.0 + SHEEN * (line * 1.5 - 0.2) * cool);
    lc += kr * (1.0 - MATTE) * pow(max(dot(Rf, kd), 0.0), LK > 1.5 ? 6000.0 : 900.0) * (LK > 1.5 ? 40.0 : 30.0);   // the sun's glint, or the candle flame doubled in the surface
#ifdef ACT
    // the foam whorl where the hot water lands
    float fs = uA[3].w;
    if (fs > 0.002 && fr2 < 0.5) {
      float fa = at2(fd.y, fd.x);
      float arm = 0.5 + 0.5 * sin(fa - log(fr2 + 0.03) * 2.2 + uA[4].x);
      float ca = cos(uA[4].x * 0.4), sa = sin(uA[4].x * 0.4);
      vec2 fq = vec2(ca * fd.x + sa * fd.y, -sa * fd.x + ca * fd.y);
      float fb = texture(uN, fq * 2.2 + 0.37).a;
      float rk = (fr2 - 0.05 - 0.08 * fs) / 0.035;
      float fm = fs * (0.3 * exp(-rk * rk) * (0.4 + 0.6 * fb) + 0.6 * smoothstep(0.3, 0.02, fr2) * smoothstep(0.5, 0.85, arm * 0.65 + fb * 0.45));
      fm = clamp(fm, 0.0, 0.45);
      lc = mix(lc, FOAMC * Lin * (0.85 + 0.3 * fb) + refl * 0.07, fm);
    }
#endif
    col = base * (1.0 - Bk.a * (1.0 - (1.0 - F) * (1.0 - MATTE) * dmul)) + Bk.a * lc;
  }
  // floaters (on the liquid) and fliers (in screen space)
  int nO = int(uA[4].y + 0.5);
  float pxw = tl * 2.0 * TANH / S;
  float shadeK = clamp(dot(kr * max(kd.y, 0.0), vec3(0.33)) / max(dot(Lin, vec3(0.33)), 1e-4), 0.0, 1.0) * dot(tr, vec3(0.33));
  vec2 shOff = kd.xz / max(kd.y, 0.15) * dep * 0.75;
  for (int i = 0; i < nO; i++) {
    vec4 a = uA[18 + i * 2], b = uA[19 + i * 2];
    float mode = b.y;
    vec2 d = (mode < 0.5 ? x : uv) - a.xy;
    float bound = a.w * a.w * 2.4;
    if (mode < 0.5 && Bk.a > 0.003) {
      vec2 d2 = d + shOff;
      if (dot(d2, d2) < bound) {
        float c = cos(a.z), s = sin(a.z);
        vec2 q = vec2(c * d2.x + s * d2.y, -s * d2.x + c * d2.y) / a.w;
        float sh = smoothstep(1.0, 0.55, length(q * vec2(0.9, 2.2)));
        col *= 1.0 - Bk.a * sh * shadeK * 0.7 * b.w;
      }
    }
    if (dot(d, d) > bound * b.z * b.z + bound) continue;
    float c = cos(a.z), s = sin(a.z);
    vec2 q = vec2(c * d.x + s * d.y, -s * d.x + c * d.y) / a.w;
    q.y /= b.z;
    float sdo;
    float px = (mode < 0.5 ? pxw : 1.0 / S) / (a.w * min(b.z, 1.0));
    float kk = floor(b.x + 0.001);
    vec4 sh = objShape(kk, q, fract(b.x) * 10.0, px, sdo);
    vec3 L = mode < 0.5 ? Lin : (uA[7].rgb * 1.2 + AMB * 2.0);
    vec3 oc = sh.rgb * L;
    if (mode < 0.5) {
      vec4 cn = texture(uN, q * 0.21 + b.x * 0.37);
      vec3 Nq = normalize(vec3(-q.x * 0.06 + (cn.r - 0.5) * 0.14, 1.0, -q.y * 0.12 + (cn.g - 0.5) * 0.14));
      // it lies on the surface, wet: it mirrors the room as the drink does (same Fresnel) and carries the key's glint
      vec3 Rq = reflect(rd, Nq), eq = envAt(Rq);
      float Fq = 0.02 + 0.98 * pow(1.0 - max(dot(-rd, Nq), 0.0), 5.0);
      oc = oc * (1.0 - Fq) + eq * Fq + kr * pow(max(dot(Rq, kd), 0.0), 60.0) * 0.4;
      sh.a *= smoothstep(0.0, -0.02, sdo) * 0.4 + 0.6;   // only the very edge dips under
      float men = exp(-max(sdo, 0.0) * a.w / 0.004) * (1.0 - sh.a);   // the surface climbs it in a thin bright line
      col += men * Bk.a * b.w * (1.0 - MATTE) * eq * 0.06;
    }
    float al = sh.a * b.w * (mode > 0.5 && mode < 1.5 ? 1.0 : Bk.a);
    if (mode > 1.5) oc *= 0.35;
    col = mix(col, oc, al);
  }
  // steam, lit by the window behind it and by the key light where its beam crosses
  // steam: a smooth read of the 256 buffer (four offset taps, no bilinear stair steps), fine wisps carried up on
  // top, lit from behind by the window and by the key light where its beam crosses it (forward scattering)
  vec2 sto = vec2(0.6 / 256.0);
  float sv = 0.25 * (texture(uSt, uv + sto).r + texture(uSt, uv - sto).r + texture(uSt, uv + vec2(sto.x, -sto.y)).r + texture(uSt, uv - vec2(sto.x, -sto.y)).r);
  float svk = 1.0;
  vec2 wq = uv * vec2(2.5, 1.4) + vec2(0.0, -t * 0.05) + (texture(uN, uv * vec2(0.8, 0.5) + vec2(t * 0.004, -t * 0.02)).rg - 0.5) * 0.45;
  float fil = 1.0 - abs(2.0 * texture(uN, wq).r - 1.0);   // ridged: thin ribbons rather than blobs
  sv *= svk * (0.2 + 1.7 * fil * fil) * (0.6 + 0.8 * texture(uN, wq * 2.6 + vec2(0.31, -t * 0.03)).a);
  sv = sv / (1.0 + sv);
  vec3 nH = normalize(vec3(CAMF.x, 0.0, CAMF.z));
  vec3 Ps = CAMP + rd * (dot(vec3(0.0, HL, 0.0) - CAMP, nH) / dot(rd, nH));
  float hgk = 0.64 / pow(1.36 - 1.2 * dot(rd, LK > 1.5 ? normalize(CANP - Ps) : SUND), 1.5), hgw = 0.64 / pow(1.36 - 1.2 * dot(rd, WD), 1.5);
  vec3 sl = uA[7].rgb * (0.35 + 0.65 * hgw) + SUNC * (LK > 1.5 ? CANS / dot(CANP - Ps, CANP - Ps) : SUNON * 0.5) * (uA[6].w * 0.12 * hgk * smoothstep(RIMH - 0.3, RIMH + 0.2, Ps.y));
  col = col * (1.0 - 0.12 * sv) + sl * sv * uA[4].w;
#ifdef ACT
  // the stream of hot water
  vec4 st = uA[5], s2 = uA[6];
  if (s2.x > 0.001 && uv.y > max(st.y, s2.y) && uv.y < s2.z) {
    float hy = uv.y - st.y;
    float xc = st.x + hy * st.z + 0.0006 * sin(uv.y * 41.0 - t * 23.0) * min(hy * 8.0, 1.0);
    float w = st.w * (1.0 + 0.35 * hy) * (1.0 + 0.12 * sin(uv.y * 23.0 - t * 19.0));
    float dd = (uv.x - xc) / w;
    if (abs(dd) < 1.0) {
      float nz = sqrt(1.0 - dd * dd);
      vec3 Ns = normalize(dd * CAMR - nz * CAMF);
      vec3 Rs = reflect(rd, Ns);
      float Fs = 0.02 + 0.98 * pow(1.0 - nz, 5.0);
      vec3 sc = col * (0.2 + 0.75 * nz * nz) + envAt(Rs) * (0.03 + Fs) * 1.2 + (WINCOL * WIRR + kr * 0.12 + uA[7].rgb) * (0.45 * exp(-(dd + 0.45) * (dd + 0.45) / 0.012) + 0.1 * exp(-(dd - 0.6) * (dd - 0.6) / 0.006));
      col = mix(col, sc, smoothstep(1.0, 0.75, abs(dd)) * s2.x);
    }
  }
#endif
  // the print
  vec2 vq = uv - vec2(0.5, 0.47);
  col *= 1.0 - 0.95 * dot(vq, vq);
  col = 1.0 - exp(-col * uA[0].w);
  col = pow(col, vec3(0.4545));
  float gr = fract(sin(dot(gl_FragCoord.xy + fract(t * 3.17) * 211.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (gr - 0.5) * uA[4].z;
  o = vec4(col, 1.0);
}`;function u0(o,e){const p=(C,E)=>{const f=o.createShader(C);return o.shaderSource(f,E),o.compileShader(f),f};e=e.replace("precision highp float;",`precision highp float;
#define TX(s, p) textureLod(s, p, 0.0)`).split("texture(").join("TX(");const d=o.createProgram(),T=p(o.VERTEX_SHADER,tt),k=p(o.FRAGMENT_SHADER,e);return o.attachShader(d,T),o.attachShader(d,k),o.linkProgram(d),{p:d,u:{},sh:[T,k],ok:!1}}const L0={env:{uN:0},tray:{uN:0,uE:1},bowl0:{uN:0,uE:1,uT:2},bowl1:{uN:0,uE:1,uT:2},bowl2:{uN:0,uE:1,uT:2},bowl3:{uN:0,uE:1,uT:2},msh:{uN:0,uE:1},blur:{uS:0},steam:{uD:0,uN:1},comp:{uB:0,uE:1,uSt:2,uN:3},compA:{uB:0,uE:1,uSt:2,uN:3}};function w0(o,e,p){const d=e[p];if(d.ok)return d;if(!o.getProgramParameter(d.p,o.LINK_STATUS))throw new Error("072 link "+p+": "+o.getProgramInfoLog(d.p)+" "+o.getShaderInfoLog(d.sh[1]));const T=o.getProgramParameter(d.p,o.ACTIVE_UNIFORMS);for(let k=0;k<T;k++){const C=o.getActiveUniform(d.p,k);d.u[C.name.replace(/\[0\]$/,"")]=o.getUniformLocation(d.p,C.name)}o.useProgram(d.p);for(const k in L0[p])d.u[k]&&o.uniform1i(d.u[k],L0[p][k]);return d.ok=!0,d}function rt(){const e=new Uint8Array(65536),p=new Float32Array(128*128),d=(C,E,f,P)=>{C=(C%f+f)%f,E=(E%f+f)%f;let c=Math.imul(C,668265261)^Math.imul(E+374761393,2654435761)^Math.imul(P+1,2246822519);return c=Math.imul(c^c>>>15,739982445),c^=c>>>12,c=Math.imul(c,695872825),c^=c>>>15,(c>>>0)/4294967296},T=(C,E,f,P)=>{const c=Math.floor(C),K=Math.floor(E),L=C-c,U=E-K,I=L*L*(3-2*L),Z=U*U*(3-2*U),D=d(c,K,f,P),J=d(c+1,K,f,P),q=d(c,K+1,f,P),e0=d(c+1,K+1,f,P);return D+(J-D)*I+(q-D)*Z+(D-J-q+e0)*I*Z},k=[[4,5,11],[8,4,23],[0,0,41],[16,3,77]];for(let C=0;C<4;C++){const[E,f,P]=k[C];let c=1e9,K=-1e9;for(let L=0;L<128;L++)for(let U=0;U<128;U++){let I;if(C===2)I=T(U*32/128,L*32/128,32,P)*.6+T(U*64/128,L*64/128,64,P+1)*.4;else{let Z=.5,D=E,J=0;I=0;for(let q=0;q<f;q++)I+=Z*T(U*D/128,L*D/128,D,P+q),J+=Z,Z*=.5,D*=2;I/=J}p[L*128+U]=I,I<c&&(c=I),I>K&&(K=I)}for(let L=0;L<128*128;L++)e[L*4+C]=Math.round((p[L]-c)/(K-c)*255)}return e}const it={env:[["o = vec4(col, 1.0);","o = vec4(sqrt(clamp(col / 16.0, 0.0, 1.0)), 1.0);"]],scene:[["texture(uE, envUV(Rk)).rgb","(pow(texture(uE, envUV(Rk)).rgb, vec3(2.0)) * 16.0)"],["o = vec4(0.0, 0.0, 0.0, 200.0 + clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y));","o = vec4(0.0, 0.0, 0.0, 0.75 + 0.24 * clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y) / uA[1].y);"],["o = vec4(col, clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y) + (bent ? 200.0 : 0.0));","o = vec4(sqrt(clamp(col / 16.0, 0.0, 1.0)), (bent ? 0.75 : 0.25) + 0.24 * clamp(uA[0].w * (z - uA[1].x) / z, -uA[1].y, uA[1].y) / uA[1].y);"]],blur:[["uniform vec4 uA[1];",`uniform vec4 uA[1];
vec4 dS(vec4 v) { bool l = v.a > 0.5; return vec4(v.rgb * v.rgb * 16.0, (l ? 200.0 : 0.0) + (v.a - (l ? 0.75 : 0.25)) / 0.24 * uA[0].y); }`],["vec4 c0 = texture(uS, uv);","vec4 c0 = dS(texture(uS, uv));"],["vec4 s = texture(uS, uv + vec2(cos(a), sin(a)) * r * px);","vec4 s = dS(texture(uS, uv + vec2(cos(a), sin(a)) * r * px));"],["o = ob;","o = vec4(sqrt(clamp(ob.rgb / 16.0, 0.0, 1.0)), ob.a);"]],steam:[["vec4 D = texture(uD, uv - v * dt);","vec4 D = texture(uD, uv - v * dt) * vec4(3.0, 3.0, 1.0, 1.0);"],["o = vec4(min(d, 3.0), min(vap, 3.0), 0.0, 1.0);","o = vec4(min(d, 3.0) / 3.0, min(vap, 3.0) / 3.0, 0.0, 1.0);"]],comp:[["vec3 envAt(vec3 R) { return texture(uE, envUV(R)).rgb; }","vec3 envAt(vec3 R) { return pow(texture(uE, envUV(R)).rgb, vec3(2.0)) * 16.0; }"],["vec4 Bk = texture(uB, uv);","vec4 Bk = texture(uB, uv); Bk.rgb = Bk.rgb * Bk.rgb * 16.0;"],["vec4 Bo = texture(uB, uv + so);","vec4 Bo = texture(uB, uv + so); Bo.rgb = Bo.rgb * Bo.rgb * 16.0;"],["float svk = 1.0;","float svk = 3.0;"]]},d0=(o,e,p)=>{if(p)for(const[d,T]of it[e])o=o.split(d).join(T);return o},Ce=(o,e,p)=>u0(o,d0(nt,"comp",p).replace("precision highp float;",`precision highp float;
`+(e&1?`#define FLW
`:"")+(e&2?`#define PET
`:"")+(e&4?"#define ACT":""))),Te=(o,e)=>Ce(o,7,e);for(let o=0;o<4;o++)L0["comp"+o]=L0.comp;const ke=(o,e,p,d)=>u0(o,d0(Re,"scene",p).replace("precision highp float;",`precision highp float;
#define BOWL
#define GK `+e+(d?`
#define `+d:"")));function ct(o){let e=ge.get(o);if(e)return e;const p=o.getExtension("EXT_color_buffer_float"),d=o.getExtension("EXT_color_buffer_half_float");o.getExtension("KHR_parallel_shader_compile");const T=!p&&!d;return e={lo:T,sp:!!p,msh:p?ke(o,0,!1,"MSH"):null,env:u0(o,d0(ot,"env",T)),tray:u0(o,d0(Re,"scene",T)),blur:u0(o,d0(at,"blur",T)),steam:u0(o,d0(st,"steam",T)),vao:o.createVertexArray()},ge.set(o,e),e}function lt(o,e,p,d){const T="bowl"+p;e[T]||(e[T]=ke(o,p,e.lo,e.sp&&"SPL"));let k="comp"+d;for(let C=0;C<4&&!e[k];C++)(C&d)===d&&e["comp"+C]&&(k="comp"+C);if(e[k]||(e[k]=Ce(o,d,e.lo)),e.compA||(e.compA=Te(o,e.lo)),o.flush(),e.nd)return w0(o,e,T),w0(o,e,k),k;e.nd=rt(),e.noise=o.createTexture(),o.bindTexture(o.TEXTURE_2D,e.noise),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,128,128,0,o.RGBA,o.UNSIGNED_BYTE,e.nd),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT);for(const C of["env",T,"tray","blur","steam",k])w0(o,e,C);return e.sp&&w0(o,e,"msh"),k}function B0(o,e,p,d,T,k){const C=o.createTexture();return o.bindTexture(o.TEXTURE_2D,C),o.texImage2D(o.TEXTURE_2D,0,d,e,p,0,T,k,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),C}function y0(o,e){const p=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,p),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),p}Ae.add({num:72,name:"Tea Bowl",fam:"Worlds",recipe:"A handmade bowl of a hot drink on a tray by a window. The surface turns over in slow cells you can see in the window's reflection, and as it cools the swirling slows. The drink and the glaze change every mint. Drag across to blow on it, tap to drop in a leaf, flower or tea stem, or hold to pour more hot water.",interactive:"Drag across the bowl to blow on it: ripples run and the steam tears sideways, then reforms. Tap to drop in a leaf, a flower or a tea stem; it floats and turns in the convection, and a stem may stand upright. Hold to pour more hot water: the cells restart, the steam billows and a foam whorl spins where the stream lands.",music:!0,gl:!0,fps:30,seed:0,make(o){const e=o.gl,p=o.size,d=ct(e),T=o.hash.slice(2),k=t=>{let a=parseInt(T.slice(t,t+8),16)>>>0,l=parseInt(T.slice(t+8,t+16),16)>>>0,s=parseInt(T.slice(t+16,t+24),16)>>>0,i=1;const n=()=>{a>>>=0,l>>>=0,s>>>=0,i>>>=0;const r=a+l+i|0;return i=i+1|0,a=l^l>>>9,l=s+(s<<3)|0,s=s<<21|s>>>11,s=s+r|0,(r>>>0)/4294967296};for(let r=0;r<16;r++)n();return n},C=k(0),E=k(24),f=k(40),P=(t,a)=>{a=a||C;let l=0;for(const i of t)l+=i[1];let s=a()*l;for(const i of t)if(s-=i[1],s<=0)return i[0];return t[t.length-1][0]},c=(t,a,l)=>t+(a-t)*(l||E)();let K=P([["Green tea",38],["Black coffee",30],["Golden oolong",24],["Whisked matcha",8]]),L=P([["Oil-spot tenmoku",38],["Pale celadon",28],["Rough ash glaze",26],["Gold-mended crack",8]]),U=P([["Wide",40],["Deep",32],["Conical",28]]),I=P([["Dark wood",45],["Slate",30],["Linen",25]]),Z=P([["Dawn window",55],["Overcast day",33],["Candle",12]]),D=P([["Tea leaf",38],["Tea stem",24],["Osmanthus",22],["Camellia petal",16],["Cherry petals",12]]),J=P([["None",80],["Standing tea stem",8],["None",6],["Falling petal",6]]);L==="Oil-spot tenmoku"&&U!=="Conical"&&C()<.5&&(U="Conical"),o.home&&(K="Green tea",L="Oil-spot tenmoku",U="Wide",I="Dark wood",Z="Dawn window",D="Tea leaf",J="None"),o.trait("Drink",K),o.trait("Bowl",L),o.trait("Shape",U),o.trait("Tray",I),o.trait("Light",Z),o.trait("Floating",D),o.trait("Rare",J);const q=k(12);let e0=P([["Over the rim",50],["Straight down",22],["Low across the tray",18],["Close on the surface",10]],q);o.home&&(e0="Over the rim"),o.trait("View",e0);const P0=e0==="Low across the tray"?.3:1,ze=["Green tea","Black coffee","Golden oolong","Whisked matcha"].indexOf(K),U0=["Oil-spot tenmoku","Pale celadon","Rough ash glaze","Gold-mended crack"].indexOf(L),ft=lt(e,d,U0,D==="Osmanthus"||D==="Camellia petal"||D==="Cherry petals"||J==="Falling petal"?3:0),Me=["Dark wood","Slate","Linen"].indexOf(I),a0=["Dawn window","Overcast day","Candle"].indexOf(Z),A0=["Tea leaf","Tea stem","Osmanthus","Camellia petal","Cherry petals"].indexOf(D),F0=["None","Standing tea stem","None","Falling petal"].indexOf(J),ut=U==="Wide"?[[0,.09],[.96,.02],[1,.74]]:U==="Deep"?[[0,.1],[.98,-.02],[.86,.98]]:[[0,.1],[.42,.1],[1.03,.64]],[s0,n0,$]=ut.map(t=>[t[0]*c(.98,1.02),t[1]]);s0[0]=0;const i0=.036,dt=U==="Conical"?.3:U==="Deep"?.46:.42,ht=t=>[(1-t)*(1-t)*s0[0]+2*(1-t)*t*n0[0]+t*t*$[0],(1-t)*(1-t)*s0[1]+2*(1-t)*t*n0[1]+t*t*$[1]],pt=t=>{const a=(1-t)*(n0[0]-s0[0])+t*($[0]-n0[0]),l=(1-t)*(n0[1]-s0[1])+t*($[1]-n0[1]),s=Math.hypot(a,l)||1;return[l/s,-a/s]},Ee=t=>{const a=ht(t),l=pt(t);return[a[0]-i0*l[0],a[1]-i0*l[1]]},g0=s0[1]+i0,vt=o.home?.62:c(.55,.7),B=g0+($[1]-g0)*vt;let _=.5;for(let t=400;t>0;t--){const a=Ee(t/400);if(a[1]<=B){_=a[0];break}}let Se=B;for(let t=0;t<=400;t++){const a=Ee(t/400);if(a[0]>=_*.5){Se=a[1];break}}const xt=f0(Math.log(Math.max(.001,(Se-g0)/(B-g0)))/Math.log(.5),1.2,8),mt=$[0]-i0,N0=$[0]+i0,R0=$[1]+i0*.8,bt=[c(.004,.014),E()*Q,c(.004,.011),E()*Q];let h0=o.home?.86:c(.8,.95),Le=o.home?0:c(-.1,.1),c0=.3,I0=o.home?.9:c(.84,.94),D0=o.home?.43:c(.4,.47),wt=o.home?0:c(-.025,.025);e0==="Straight down"?(h0=1.38+.08*q(),I0=.78+.06*q(),D0=.5):e0==="Low across the tray"?(h0=.42+.08*q(),I0=.64+.08*q(),D0=.4):e0==="Close on the surface"&&(h0=.95+.15*q(),I0=1.22+.15*q(),D0=.5);const g={P:[0,0,0],F:[0,0,0],R:[0,0,0],U:[0,0,0]},Be=(t,a,l)=>{const s=[Math.sin(Le)*Math.cos(h0),-Math.sin(h0),-Math.cos(Le)*Math.cos(h0)];g.F=s,g.P=[t-s[0]*l,a-s[1]*l,-s[2]*l];const i=Math.hypot(s[2],s[0]);g.R=[-s[2]/i,0,s[0]/i];const n=g.R;g.U=[n[1]*s[2]-n[2]*s[1],n[2]*s[0]-n[0]*s[2],n[0]*s[1]-n[1]*s[0]]},W=t=>{const a=[t[0]-g.P[0],t[1]-g.P[1],t[2]-g.P[2]],l=a[0]*g.F[0]+a[1]*g.F[1]+a[2]*g.F[2];return[(a[0]*g.R[0]+a[1]*g.R[1]+a[2]*g.R[2])/(l*c0)*.5+.5,(a[0]*g.U[0]+a[1]*g.U[1]+a[2]*g.U[2])/(l*c0)*.5+.5,l]};let C0=3.8,$0=B+.3,Y0=0;for(let t=0;t<8;t++){Be(Y0,$0,C0);const a=W([-N0,R0,0]),l=W([N0,R0,0]),s=W([0,R0,N0]),i=W([0,R0,-N0]);C0*=(l[0]-a[0])/I0,$0+=((s[1]+i[1])/2-D0)*C0*c0*1.6,Y0+=((a[0]+l[0])/2-.5-wt)*C0*c0*1.6}Be(Y0,$0,C0);const yt=(t,a)=>{const l=(t*2-1)*c0,s=(a*2-1)*c0,i=[g.F[0]+l*g.R[0]+s*g.U[0],g.F[1]+l*g.R[1]+s*g.U[1],g.F[2]+l*g.R[2]+s*g.U[2]],n=Math.hypot(i[0],i[1],i[2]);return[i[0]/n,i[1]/n,i[2]/n]},W0=(t,a)=>{const l=yt(t,a),s=(B-g.P[1])/l[1];return[g.P[0]+l[0]*s,g.P[2]+l[2]*s]},At=W([0,B,0])[2],gt=W([0,R0,-N0])[1],Z0=e0==="Straight down"?.35:e0==="Close on the surface"?.7:1,J0=c(.38,.5),ee=o.home?.22:c(0,.42)*(E()<.7?1:-1),p0=[-Math.sin(ee)*Math.cos(J0),Math.sin(J0),-Math.cos(ee)*Math.cos(J0)],Pe=ee*.5+c(-.06,.06),T0=[Math.sin(Pe),0,Math.cos(Pe)],te=[T0[2],0,-T0[0]],Nt=c(2.1,2.5),Ue=c(2.6,3.1),Rt=5.5,oe=Rt/Math.max(.2,-(p0[0]*T0[0]+p0[2]*T0[2])),ae=[p0[0]*oe,B+p0[1]*oe,p0[2]*oe],q0=c(.2,.6)*(E()<.5?1:-1),Fe=-Ue*c(.15,.4),Ct=q0-Math.sign(q0)*c(1.35,1.6),Tt=Fe+c(.75,1),_0=[ae[0]-te[0]*q0,ae[1]-Fe,ae[2]-te[2]*q0],kt=(()=>{const t=[_0[0],_0[1]-B,_0[2]],a=Math.hypot(t[0],t[1],t[2]);return[t[0]/a,t[1]/a,t[2]/a]})(),zt=[c(.5,1)*(E()<.5?1:-1),B+c(2.8,3.2),-c(2.4,2.8)],S=[{sun:[1,.64,.34],sunI:4.2,on:1,win:[.46,.56,.72],wirr:.38,amb:[.009,.01,.015],hz:[6,4.1,2.7],up:[2,2.45,3.4],trees:.85,br:.6,expo:1.7},{sun:[1,1,1],sunI:0,on:0,win:[.72,.77,.84],wirr:.6,amb:[.014,.015,.018],hz:[5.2,5.3,5.4],up:[4.3,4.6,5],trees:.55,br:.4,expo:1.55},{sun:[1,.52,.2],sunI:1,on:0,win:[.05,.07,.12],wirr:.25,amb:[.005,.004,.004],hz:[.05,.06,.1],up:[.025,.035,.07],trees:.7,br:.3,expo:1.75}][a0],Mt=6.5,v0=[{abs:[.6,.45,1.8],scat:[.035,.05,.011],dust:.22,sheen:0,foam:[.3,.3,.19],matte:0},{abs:[9,12,16],scat:[.005,.0025,.0012],dust:.15,sheen:.4,foam:[.2,.13,.075],matte:0},{abs:[.45,1,3.4],scat:[.07,.026,.003],dust:.15,sheen:.15,foam:[.32,.26,.16],matte:0},{abs:[6,6,6],scat:[.1,.19,.06],dust:.12,sheen:0,foam:[.32,.42,.14],matte:1}][ze],Et=[[.03,.02,.014],[.2,.27,.22],[.08,.13,.07],[.03,.026,.024]][U0],Ie=o.home?.13:c(.11,.15),se=c(.8,1.1),ne=E(),V=new Float32Array(96);V.set([...g.P,c0,...g.F,p,...g.R,B,...g.U,_],0),V.set([...p0,S.on,S.sun[0]*S.sunI,S.sun[1]*S.sunI,S.sun[2]*S.sunI,$[1]],16),V.set([..._0,Nt,...T0,Ue,...te,.085,...S.win,a0,...S.amb,mt,...zt,a0===2?Mt:0],24),V.set([s0[0],s0[1],n0[0],n0[1],$[0],$[1],i0,dt,...bt,U0,Me,ze,P0<1?.85:0],48),V.set([...v0.abs,g0,...v0.scat,v0.dust*P0,...Et,v0.sheen*P0,...v0.foam,xt,...kt,S.wirr,Ie,v0.matte,se,ne,E()*7,E()*7,.25+c(-.07,.07),E()*Q,Ct,Tt,3,0],64),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(d.vao);const H=(t,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,a)},O0=d.lo?[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE]:[e.RGBA16F,e.RGBA,e.HALF_FLOAT],re=B0(e,M0,M0,...O0),De=y0(e,re);{const t=d.env;e.bindFramebuffer(e.FRAMEBUFFER,De),e.viewport(0,0,M0,M0),e.useProgram(t.p),H(0,d.noise),e.uniform4fv(t.u.uC,V),e.uniform4fv(t.u.uA,new Float32Array([0,0,E()*5,E()*5,...S.hz,0,...S.up,0,S.trees,S.br,0,0])),e.drawArrays(e.TRIANGLES,0,3)}const ie=B0(e,p,p,...O0),ce=y0(e,ie);d.lo&&(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST));const We=B0(e,p,p,...O0),St=y0(e,We),Lt=46*p/1e3,qe=Math.max(3,24*p/1e3);{e.bindFramebuffer(e.FRAMEBUFFER,ce),e.viewport(0,0,p,p),H(0,d.noise),H(1,re);const t=new Float32Array([p,110,40,Lt,At,qe,f0((p-300)/400,0,1),2,4,[.3,.25,.06][Me],8,0]);let a=null,l=null;if(d.sp){a=e.createTexture(),H(2,a),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,p,p,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),H(2,null),l=y0(e,a),e.viewport(0,0,p,p);const s=d.msh;e.useProgram(s.p),e.uniform4fv(s.u.uC,V),e.uniform4fv(s.u.uA,t),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,ce),H(2,a)}for(const s of[d.tray,d["bowl"+U0]])e.useProgram(s.p),e.uniform4fv(s.u.uC,V),e.uniform4fv(s.u.uA,t),e.drawArrays(e.TRIANGLES,0,3);a&&(H(2,null),e.deleteFramebuffer(l),e.deleteTexture(a))}{const t=d.blur;e.bindFramebuffer(e.FRAMEBUFFER,St),e.viewport(0,0,p,p),e.useProgram(t.p),H(0,ie),e.uniform4fv(t.u.uA,new Float32Array([p,qe,p>500?96:64,0])),e.drawArrays(e.TRIANGLES,0,3)}e.deleteFramebuffer(ce),e.deleteTexture(ie),e.deleteFramebuffer(De);const le=[0,1].map(()=>B0(e,E0,E0,...O0)),Bt=le.map(t=>y0(e,t));let k0=0;const H0=d.nd,_e=(t,a,l)=>{t=t*128-.5,a=a*128-.5;const s=Math.floor(t),i=Math.floor(a),n=t-s,r=a-i,h=s&127,m=s+1&127,v=i&127,A=i+1&127,N=H0[(v*128+h)*4+l],b=H0[(v*128+m)*4+l],y=H0[(A*128+h)*4+l],z=H0[(A*128+m)*4+l];return(N+(b-N)*n+(y-N)*r+(N-b-y+z)*n*r)/255},G0=t=>t-Math.floor(t),Pt=(t,a,l)=>{const s=t*.37+V[88],i=a*.37+V[89],n=Ie*(1.2-.4*(t*t+a*a)/(_*_)),r=t/n+(_e(s,i,0)-.5)*se,h=a/n+(_e(s,i,1)-.5)*se,m=r-h*.5773503,v=h*1.1547005,A=Math.floor(m+.5),N=Math.floor(v+.5);let b=9,y=9,z=0,X=0;for(let G=-1;G<=1;G++)for(let b0=-1;b0<=1;b0++){const xe=A+b0,V0=N+G,me=G0(xe*.7548776662+V0*.569840291+ne),be=G0(xe*.3678794412+V0*.813307+ne*1.618),Ye=G0(me*be*43.13+me*7.71),Ze=G0(me+be*be*29.37),_t=.33*Math.sin(l*(.6+.8*Ye)+6.2832*Ze),Ot=.33*Math.sin(l*(.5+.9*Ze)+6.2832*Ye+1.3),we=r-(xe+V0*.5+_t),ye=h-(V0*.8660254+Ot),j0=we*we+ye*ye;j0<b?(y=b,b=j0,z=we,X=ye):j0<y&&(y=j0)}return[z,X,Math.sqrt(y)-Math.sqrt(b)]};let O=o.home?.92:c(.45,1,f),K0=f()*40,t0=0,Ut=0,fe=99;const o0=[],w={x:0,z:0,dx:0,dz:0,s:0,su:.5,sv:.5,vx:0,vy:0,rad:.35},u={on:!1,x:0,z:0,u:.5,v:.5,str:0,t:0,front:1.2,tail:1.3,auto:0,ripT:0},j={x:0,z:0,s:0,rot:0},F=[],Oe=[.13,.11,.05,.12,.075],He=()=>A0===0?f()<.12?1:0:A0===1?f()<.2?0:1:A0===2?2:A0===4?4:3,Ft=t=>t===3?3:t===2?2:t;function z0(t,a,l,s,i){if(F.length>=9){const r=F.find(h=>!h.sinking&&!h.stand);r&&(r.sinking=!0)}const n=Object.assign({x:t,z:a,a:f()*Q,va:c(-.4,.4,f),vx:0,vz:0,size:Oe[l]*c(.85,1.15,f),kind:l,h:s,vh:0,stand:0,seed:f(),alpha:1,age:0,sinking:!1,tilt:0},i||{});return F.push(n),n}{let t=o.home?1:Math.floor(c(0,3.2,f));A0===4&&(t=3+Math.floor(q()*4));for(let a=0;a<t;a++){const l=f()*Q,s=Math.sqrt(f())*_*.7;z0(Math.cos(l)*s,Math.sin(l)*s,He(),0)}if(o.home&&(F[0].x=-.22*_,F[0].z=.18*_,F[0].kind=0,F[0].size=Oe[0],F[0].a=.6),F0===1&&z0(_*c(-.3,.3,f),_*c(-.2,.3,f),1,0,{stand:1,size:.1}),F0===3)for(let a=0;a<2;a++){const l=f()*Q,s=Math.sqrt(f())*_*.75;z0(Math.cos(l)*s,Math.sin(l)*s,4,0)}}const R=F0===3?{on:!1,next:c(4,9,f),t:0,dur:0,x:0,z:0,sx:0,a:0}:null;let ue=c(5,10,f),de=c(18,30,f);const Ge=o.sound,r0=[];function X0(t,a,l){o0.length>=Je&&o0.shift(),o0.push({x:t,z:a,age:0,amp:l})}function he(t,a){let[l,s]=W0(t,a);const i=Math.hypot(l,s),n=_*.8;i>n&&(l*=n/i,s*=n/i);const r=He(),h=z0(l,s,r,.55,{});r===1&&f()<(F0===1?.45:.15)&&(h.willStand=1)}function pe(t,a,l){let[s,i]=W0(t,a);const n=Math.hypot(s,i),r=_*.75;n>r&&(s*=r/n,i*=r/n),Object.assign(u,{on:!0,x:s,z:i,t:0,front:1.2,tail:1.3,auto:l?c(2.2,3.4,f):0}),j.x=s,j.z=i;const h=W([s,B,i]);u.u=h[0],u.v=h[1];const m=W([s,B+1.5,i]);u.slope=(m[0]-h[0])/Math.max(.001,m[1]-h[1]),u.w=Math.abs(W([s+.034,B,i])[0]-h[0])}function Ke(t,a,l,s,i,n){const r=Math.hypot(l,s);if(r<.02)return;const[h,m]=W0(t,a),[v,A]=W0(t+l*.05,a+s*.05),N=v-h,b=A-m,y=Math.hypot(N,b)||1,z=f0(r*.7,0,1.4)*n;w.x=h,w.z=m,w.dx=N/y,w.dz=b/y,w.s=Math.max(w.s*.8,z*.1),w.su=t,w.sv=a,w.vx=l*.55*n,w.vy=s*.55*n,w.hold=.25;for(const X of F){const G=(X.x-h)**2+(X.z-m)**2;if(G<.12){const b0=Math.exp(-G/.05)*z*.35;X.vx+=w.dx*b0*i*6,X.vz+=w.dz*b0*i*6}}f()<i*14*n&&X0(h+c(-.08,.08,f),m+c(-.08,.08,f),.022*Math.min(1,z))}const M={down:!1,t:0,sx:0,sy:0,px:0,py:0,moved:0,kind:""};let x0=null;function It(t){const a=o.input,l=a.taps?a.taps():[];l.length&&(x0=l[l.length-1]),a.inside?fe=0:fe+=t;const s=a.x,i=1-a.y;if(a.down&&a.inside){M.down?M.t+=t:(Object.assign(M,{down:!0,t:0,sx:s,sy:i,px:s,py:i,moved:0,kind:"press"}),x0=null);const n=t>0?(s-M.px)/t:0,r=t>0?(i-M.py)/t:0;M.moved+=Math.hypot(s-M.px,i-M.py),M.kind==="press"&&M.moved>.03&&(M.kind="drag"),M.kind==="press"&&M.t>.3&&(M.kind="hold",pe(s,i,!1)),M.kind==="drag"&&Ke(s,i,n,r,t,1),M.kind==="hold"&&!u.on&&pe(s,i,!1),M.px=s,M.py=i}else M.down?(M.kind==="press"&&he(M.sx,M.sy),M.kind==="hold"&&u.on&&!u.auto&&(u.on=!1),M.down=!1):x0&&he(x0.x,1-x0.y),x0=null}function Xe(t){Ut+=t,O-=t*O/95,u.on&&(O=Math.min(1,O+t*.3),t0=Math.min(1,t0+t*.8)),t0*=Math.exp(-t/7),K0+=t*(.04+.32*O+1.2*t0);for(let i=o0.length-1;i>=0;i--)o0[i].age+=t,o0[i].age>3&&o0.splice(i,1);if(w.hold=(w.hold||0)-t,w.hold<=0&&(w.s*=Math.exp(-t*3),w.vx*=Math.exp(-t*4),w.vy*=Math.exp(-t*4)),fe>6&&!M.down&&(ue-=t,ue<=0&&!w.auto&&(ue=c(9,16,f),w.auto={t:0,dur:c(1.6,2.6,f),u0:c(.15,.35,f),v0:c(.45,.75,f),dir:f()<.6?1:-1}),de-=t,de<=0&&(de=c(22,38,f),F.length<5&&he(c(.3,.7,f),c(.3,.55,f))),!u.on&&O<.24&&pe(c(.35,.65,f),c(.35,.55,f),!0)),w.auto){const i=w.auto;i.t+=t;const n=i.t/i.dur,r=Math.sin(Math.PI*Math.min(1,n)),h=i.dir>0?i.u0+n*.5:1-i.u0-n*.5;Ke(h,i.v0,.5/i.dur*i.dir*r*1.3,.05*r,t,.45),n>=1&&(w.auto=null)}(u.on||u.str>0)&&(u.t+=t,u.on?(u.str=Math.min(1,u.str+t*6),u.front=Math.max(u.v,u.front-t*4.5)):(u.tail-=t*4.5,u.tail<=u.v&&(u.str=0)),u.auto&&u.t>u.auto&&(u.on=!1),u.on&&u.front<=u.v+.01&&(j.s=Math.min(1,j.s+t*.7),u.ripT-=t,u.ripT<=0&&(u.ripT=.13,X0(u.x+c(-.02,.02,f),u.z+c(-.02,.02,f),.03)))),j.s*=Math.exp(-t/(u.on?60:7)),j.rot+=t*(.6+2.5*j.s);const l=Math.max(1,Math.ceil(t/.05)),s=t/l;for(let i=0;i<l;i++)for(const n of F){if(n.age+=s,n.h>0){n.vh-=9*s,n.h+=n.vh*s*.25,n.h<=0&&(n.h=0,X0(n.x,n.z,.025),r0.push({k:"plip",age:0,dur:.09,f:c(900,1300,f)}),n.willStand&&(n.stand=1,n.tilt=.5));continue}const r=Pt(n.x,n.z,K0),h=.05*(.15+O)*(1+2*t0);let m=r[0]*h-n.z*.012,v=r[1]*h+n.x*.012;if(w.s>.002){const b=(n.x-w.x)**2+(n.z-w.z)**2,y=Math.exp(-b/.06)*w.s*4;m+=w.dx*y,v+=w.dz*y}if(u.on&&u.front<=u.v+.01){const b=n.x-u.x,y=n.z-u.z,z=b*b+y*y,X=Math.exp(-z/.08),G=Math.sqrt(z)+.001;m+=(b/G*.12-y/G*.2)*X,v+=(y/G*.12+b/G*.2)*X,n.va+=X*s*3}n.vx+=(m-n.vx)*Math.min(1,s*1.5),n.vz+=(v-n.vz)*Math.min(1,s*1.5),n.x+=n.vx*s,n.z+=n.vz*s,n.a+=n.va*s,n.va*=Math.exp(-s*.35),n.va+=r[0]*r[1]*.4*O*s;const A=Math.hypot(n.x,n.z),N=_-n.size*(n.stand?.3:.7);if(A>N){n.x*=N/A,n.z*=N/A;const b=(n.vx*n.x+n.vz*n.z)/N;b>0&&(n.vx-=1.6*b*n.x/N,n.vz-=1.6*b*n.z/N),n.va+=b*2}n.stand&&(n.tilt*=Math.exp(-s*1.5)),n.sinking&&(n.alpha-=s/4)}for(let i=0;i<F.length;i++)for(let n=i+1;n<F.length;n++){const r=F[i],h=F[n];if(r.h>0||h.h>0)continue;const m=h.x-r.x,v=h.z-r.z,A=Math.hypot(m,v)+1e-4,N=(r.size+h.size)*.8;if(A<N){const b=(N-A)*.5/A;r.x-=m*b,r.z-=v*b,h.x+=m*b,h.z+=v*b}}for(let i=F.length-1;i>=0;i--)F[i].alpha<=0&&F.splice(i,1);if(R){if(R.on)R.t+=t,R.t>=R.dur&&(R.on=!1,R.next=c(16,28,f),z0(R.x,R.z,4,0,{a:R.a+R.t*1.3,seed:R.seed}),X0(R.x,R.z,.012),r0.push({k:"plip",age:0,dur:.07,f:1500}));else if(R.next-=t,R.next<=0){const i=f()*Q,n=Math.sqrt(f())*_*.7;Object.assign(R,{on:!0,t:0,dur:c(3.2,4.4,f),x:Math.cos(i)*n,z:Math.sin(i)*n,sx:c(-.4,.4,f),a:f()*Q,seed:f()})}}}const Y=new Float32Array((18+Q0*2)*4),m0=new Float32Array(16),Dt=(S.win[0]+S.win[1]+S.win[2])/3,Wt=[0,1,2].map(t=>(S.win[t]+Dt)*.5*S.wirr*.5+S.amb[t]*3+(a0===2?[.05,.025,.01][t]:0));function Ve(t,a){m0.fill(0);const l=3.4*Math.pow(O,1.6)*(1+1.5*t0)*Math.sqrt(Z0);m0.set([t,a,l,(.13+.1*O+.1*t0)*Z0],0),m0.set([w.su,w.sv,w.vx,w.vy],4);const s=u.on&&u.front<=u.v+.01?u.str:0;m0.set([.22,u.u,u.v,s],8),m0.set([K0,.9+.6*O,(.55+.25*(1-O))/Math.sqrt(Z0),gt],12),e.bindFramebuffer(e.FRAMEBUFFER,Bt[1-k0]),e.viewport(0,0,E0,E0);const i=d.steam;e.useProgram(i.p),H(0,le[k0]),H(1,d.noise),e.uniform4fv(i.u.uC,V),e.uniform4fv(i.u.uA,m0),e.drawArrays(e.TRIANGLES,0,3),k0=1-k0}let je=1,ve=0;function Qe(t){Y.fill(0);const a=p>500?.022:.012;Y.set([p,t,O,S.expo],0),Y.set([K0,.016*(.25+.75*f0((O-.05)/.5,0,1))*(1+t0)*P0,t0,o0.length],4),Y.set([w.x,w.z,w.dx*w.s,w.dz*w.s],8),Y.set([.32,j.x,j.z,j.s,j.rot,0,a,1.05*(a0===2?1.2:1)],12),Y.set([u.u,u.v,u.slope||0,u.w||.01,u.str,u.front,u.tail,je],20),Y.set([...Wt,u.on&&u.front<=u.v+.01?.4*u.str:0],28);for(let r=0;r<o0.length;r++){const h=o0[r];Y.set([h.x,h.z,h.age,h.amp],32+r*4)}let l=0;const s=(r,h,m,v,A,N,b,y,z)=>{l>=Q0||(Y.set([r,h,m,v,A+f0(N,0,.99)*.099,b,y,z],72+l*8),l++)};for(const r of F){const h=Ft(r.kind);if(r.h>0||r.stand)if(r.stand){const m=r.size,v=.12+r.tilt,A=[r.x,B,r.z],N=[r.x+Math.cos(r.a)*m*v,B+m*.95,r.z+Math.sin(r.a)*m*v],b=W(A),y=W(N),z=W([r.x-Math.cos(r.a)*m*v,B-m*.95,r.z-Math.sin(r.a)*m*v]),X=Math.atan2(y[1]-b[1],y[0]-b[0]),G=Math.hypot(y[0]-b[0],y[1]-b[1])/2;s((b[0]+z[0])/2,(b[1]+z[1])/2,Math.atan2(b[1]-z[1],b[0]-z[0]),G,1,r.seed,2,1.8,r.alpha*.8),s((b[0]+y[0])/2,(b[1]+y[1])/2,X,G,1,r.seed,1,1.8,r.alpha)}else{const m=W([r.x,B+r.h,r.z]),v=W([r.x+r.size,B+r.h,r.z]);s(m[0],m[1],r.a+r.h*6,Math.abs(v[0]-m[0])*1.1,h,r.seed,1,.5+.3*Math.cos(r.h*9),1)}else s(r.x,r.z,r.a,r.size,h,r.seed,0,1,r.alpha)}if(R&&R.on){const r=R.t/R.dur,h=(1-r)*1.6,m=Math.sin(R.t*2.2)*.12*(1-r),v=W([R.x+m+R.sx*(1-r),B+h,R.z]),A=W([R.x+.07+m+R.sx*(1-r),B+h,R.z]);s(v[0],v[1],R.a+R.t*1.3,Math.abs(A[0]-v[0]),4,R.seed,1,.25+.75*Math.abs(Math.cos(R.t*2.7)),Math.min(1,r*4))}Y[17]=l,e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,p,p),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(d.vao);const i=w.s>.001||u.str>0||j.s>.002;i&&!d.compA&&(d.compA=Te(e,d.lo));const n=i?w0(e,d,"compA"):d[ft];e.useProgram(n.p),H(0,We),H(1,re),H(2,le[k0]),H(3,d.noise),e.uniform4fv(n.u.uC,V),e.uniform4fv(n.u.uA,Y),e.drawArrays(e.TRIANGLES,0,3)}const l0=16e3,x={t:0,gen:0,s:(parseInt(T.slice(8,16),16)|1)>>>0,lp1:0,lp2:0,lph:0,bl:0,bb:0,br:0,sim:0,hiss:0,pr:0,bw:0,birdT:c(1,4,f),popT:0},$e=a0===0?1:a0===1?.45:0;function qt(t){if(!Ge.on){x.t=0,x.gen=0,r0.length=0;return}x.t+=t;let a=Math.floor((x.t+.12)*l0)-x.gen;if(a<=0)return;a>4e3&&(x.gen+=a-4e3,a=4e3);const l=.5,s=.06*Math.pow(O,1.5)*(1+t0),i=u.on&&u.front<=u.v+.01?.5:0,n=f0(w.s*6,0,.6);if(x.birdT-=t,$e&&x.birdT<=0){x.birdT=c(2.5,8,f)/$e;const m=2+Math.floor(f()*5),v=c(2600,4200,f),A=c(-1,1,f),N=c(.03,.08,f);for(let b=0;b<m;b++)r0.push({k:"bird",age:-b*c(.09,.16,f),dur:c(.05,.12,f),f:v*c(.9,1.1,f),sw:A*900,amp:N,ph:0})}const r=new Float32Array(a);let h=x.s;for(let m=0;m<a;m++){h^=h<<13,h^=h>>>17,h^=h<<5,h>>>=0;const v=h/2147483648-1;x.sim+=(l-x.sim)*5e-4,x.hiss+=(s-x.hiss)*5e-4,x.pr+=(i-x.pr)*.002,x.bw+=(n-x.bw)*.002,x.lp1+=(v-x.lp1)*.015,x.lp2+=(x.lp1-x.lp2)*.05;let A=x.lp2*2.2*x.sim;if(x.lph+=(v-x.lph)*.5,A+=(v-x.lph)*x.hiss*.5,x.pr>.002){const y=v-x.bl-.35*x.bb;x.bb+=.32*y,x.bl+=.32*x.bb;const z=.6+.4*Math.sin(m*.009+x.t*37)*Math.sin(x.t*13+m*.002);A+=x.bb*x.pr*.6*z}x.bw>.002&&(x.br+=(v-x.br)*.06,A+=x.br*x.bw*1.4),r[m]=A}x.s=h,x.popT-=t,x.popT<=0&&(x.popT=c(.04,.3,f),r0.push({k:"pop",age:0,dur:c(.015,.035,f),f:c(160,420,f),amp:c(.02,.07,f)*(.5+x.sim)}));for(let m=r0.length-1;m>=0;m--){const v=r0[m];let A=v.ph||0;for(let N=0;N<a;N++){const b=v.age+N/l0;if(b<0||b>v.dur)continue;const y=b/v.dur;if(v.k==="bird"){const z=v.f+v.sw*y;A+=Q*z/l0,r[N]+=Math.sin(A)*Math.sin(Math.PI*y)*v.amp}else if(v.k==="pop"){const z=v.f*(1+y*1.5);A+=Q*z/l0,r[N]+=Math.sin(A)*(1-y)*(1-y)*v.amp}else if(v.k==="plip"){const z=v.f*(1+y*.9);A+=Q*z/l0,r[N]+=Math.sin(A)*Math.sin(Math.PI*Math.min(1,y*4))*(1-y)*.22}}v.ph=A,v.age+=a/l0,v.age>v.dur&&r0.splice(m,1)}x.gen+=a,Ge.pcm(r,l0,{vel:1})}for(let t=0;t<50;t++)Xe(1/15),Ve(1/15,t/15);return Qe(0),(t,a)=>{if(a=Math.min(Math.max(a,0),.15),It(a),Xe(a),a0===2&&(ve-=a,ve<=0&&(ve=c(.05,.2,f),je=c(.9,1.05,f))),a>0){const l=a>.05?2:1;for(let s=0;s<l;s++)Ve(a/l,t+3.3)}Qe(t),qt(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
