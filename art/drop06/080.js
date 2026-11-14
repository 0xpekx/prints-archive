// Frost Window: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/080.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(nt){nt&&function(){"use strict";const it=new WeakMap,u=384,x0=128,ct=22,Pt=5,lt=2.5,D=Math.PI*2,Nt=Math.PI/3,R0=(o,t,c)=>o<t?t:o>c?c:o,Z=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,ft=`
float nrmOf(vec4 m) {
  float b = floor(m.b * 255.0 + 0.5);
  return b < 0.5 ? -1.0 : (b < 127.5 ? (b - 1.0) / 126.0 * 6.2831853 : (b - 128.0) / 126.0 * 6.2831853 + 10.0);
}`,St=`#version 300 es
precision highp float;
precision highp int;
uniform highp sampler2D uS;
uniform highp sampler2D uM;
uniform highp sampler2D uH;
uniform vec4 uP[10];
out vec4 o;
uvec3 pcg(uvec3 v) { v = v * 1664525u + 1013904223u; v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; v ^= v >> 16u; v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; return v; }
const ivec2 OF[8] = ivec2[8](ivec2(1, 0), ivec2(-1, 0), ivec2(0, 1), ivec2(0, -1), ivec2(1, 1), ivec2(-1, 1), ivec2(1, -1), ivec2(-1, -1));
const float S60 = 1.0471976;
float hh(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hh(i), hh(i + vec2(1.0, 0.0)), f.x), mix(hh(i + vec2(0.0, 1.0)), hh(i + 1.0), f.x), f.y); }
${ft}
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec4 P0 = uP[0], P1 = uP[1], P2 = uP[2], P3 = uP[3], P4 = uP[4], P5 = uP[5], P6 = uP[6], P7 = uP[7], P8 = uP[8];
  float N = uP[9].x;
  int NB = int(uP[9].y), K3 = int(uP[9].z), N4 = int(uP[9].w);
  ivec2 hi = ivec2(int(N) - 1);
  vec2 uv = (vec2(p) + 0.5) / N;
  vec4 s = texelFetch(uS, p, 0);
  vec4 m = texelFetch(uM, p, 0);
  vec3 hm3 = texture(uH, uv).rgb;
  vec2 hm = hm3.rg;
  float regrow = hm3.b;
  vec2 ds = uv - P5.xy, dc = uv - P6.xy;
  float heat = hm.x + P5.w * (P8.x + exp(-dot(ds, ds) / (P5.z * P5.z)));
  if (P6.w > 0.0) heat += P6.w * exp(-dot(dc, dc) / (P6.z * P6.z)) * (0.45 + 1.1 * vn(uv * 13.0) * vn(uv * 29.0 + 3.7));
  float c0 = P3.w * (1.0 - P4.x * uv.y) + 0.5 * hm.y + 0.45 * regrow;
  vec3 rnd = vec3(pcg(uvec3(uvec2(p), uint(P3.z))) >> 8u) * (1.0 / 16777216.0);
  if (m.r < 0.5) { o = vec4(c0, 0.0, 0.0, 0.0); return; }
  float cold = 1.0 - smoothstep(0.04, 0.2, heat);
  if (P7.z > 0.5 && length(vec2(p) - P7.xy) < 1.7) { o = vec4(0.7, P7.w, -1.0, 129.0); return; }
  if (s.a > 0.5) {
    float sum = 0.0;
    for (int i = 0; i < N4; i++) { vec4 n = texelFetch(uS, clamp(p + OF[i], ivec2(0), hi), 0); sum += n.a < 0.5 ? n.r : 0.0; }
    float th = min(P8.y, s.r + (P3.y * sum + P8.z) * cold) - P4.w * max(0.0, heat - 0.08);
    if (th <= 0.0) { o = vec4(c0 * 0.6, 0.0, 0.0, 0.0); return; }
    o = vec4(th, s.gba);
    return;
  }
  vec4 nb[8];
  for (int i = 0; i < NB; i++) nb[i] = texelFetch(uS, clamp(p + OF[i], ivec2(0), hi), 0);
  float lap = 0.0;
  for (int i = 0; i < N4; i++) lap += (nb[i].a > 0.5 ? s.r * (1.0 - P0.w) : nb[i].r) - s.r;
  float c = s.r + 0.2 * lap + P0.z * (c0 - s.r);
  if (m.a > 0.1 && rnd.x < P4.y * cold) { o = vec4(0.6, m.g * S60, nrmOf(m), 129.0); return; }
  if (hm.y > 0.15 && rnd.x < P4.z * hm.y * cold) { o = vec4(0.4, rnd.z * S60, -1.0, 129.0); return; }
  float best = 9.0, bAng = 0.0, bE = 0.0, bCnt = 0.0, bGen = 0.0;
  int par = -1;
  vec2 bd = vec2(0.0);
  for (int i = 0; i < NB; i++) {
    vec4 n = nb[i];
    if (n.a < 0.5) continue;
    vec2 ov = -vec2(OF[i]);
    float ol = length(ov);
    float pk = n.a - 1.0;
    float gen = floor(pk / 256.0), cnt = mod(pk, 32.0);
    int fi = int(floor(mod(pk, 256.0) / 32.0));
    for (int k = 0; k < K3; k++) {
      float ang = n.g, e0 = 0.0, ng = 0.0, nc = 0.0;
      if ((fi & 4) != 0) {
        if (k > 0) break;
        float oa = atan(ov.y, ov.x);
        ang = n.g + S60 * floor((oa - n.g) / S60 + 0.5);
        // needle frost: a sheaf of near-parallel blades fans out of the speck along its axis
        if (P8.w > 0.0) { float da = mod(oa - (n.b > -0.5 ? (n.b > 9.0 ? n.b - 10.0 : n.b) : n.g) + 4.712389, 3.1415927) - 1.5707963; if (abs(da) > 0.9) break; ang = oa + P8.w * (rnd.z - 0.5); }
        if (n.b > -0.5) { float nr = n.b > 9.0 ? n.b - 10.0 : n.b; float dn = cos(ang - nr); if ((n.b > 9.0 ? abs(dn) : dn) < 0.35) break; }
      } else if (k == 0) { e0 = n.b; ng = gen; nc = cnt + 1.0; }
      else if (k == 1) { if ((fi & 1) == 0) continue; ang = n.g + S60; ng = gen + 1.0; }
      else { if ((fi & 2) == 0) continue; ang = n.g - S60; ng = gen + 1.0; }
      vec2 d = vec2(cos(ang), sin(ang));
      if (dot(d, ov) < 0.3 * ol) continue;
      float e = e0 + d.x * ov.y - d.y * ov.x;
      if (abs(e) < 0.5 && abs(e) < best) { best = abs(e); bAng = ang; bE = e; bCnt = nc; bGen = ng; par = i; bd = d; }
    }
  }
  if (par >= 0 && bGen <= P1.w) {
    bool blocked = false;
    for (int i = 0; i < NB; i++) {
      if (i == par) continue;
      vec4 n = nb[i];
      if (n.a < 0.5) continue;
      if ((int(floor(mod(n.a - 1.0, 256.0) / 32.0)) & 4) != 0) continue;
      if (dot(vec2(OF[i]), bd) > -0.2 && regrow < 0.15) blocked = true;
    }
    if (!blocked) {
      float pr = P0.x * max(0.0, c - P0.y) / (1.0 - P0.y) * max(0.0, 1.0 + P2.z * bd.y) * pow(P2.y, bGen) * cold * (1.0 + 2.5 * regrow);
      if (rnd.y < pr) {
        float ang = bAng + P2.w * bd.x + P3.x * (rnd.z - 0.5);
        ang = mod(ang + 3.1415927, 6.2831853) - 3.1415927;
        float L = (bGen < 0.5 ? P1.x : bGen < 1.5 ? P1.y : P1.z) + floor(rnd.x * 3.0);
        float cnt = min(bCnt, 31.0), fl = 0.0;
        if (cnt >= L && bGen < P1.w) { cnt = 0.0; fl = fract(rnd.z * 7.31) < P2.x ? 3.0 : (fract(rnd.x * 13.7) < 0.5 ? 1.0 : 2.0); }
        o = vec4(0.06, ang, bE, 1.0 + cnt + 32.0 * fl + 256.0 * bGen);
        return;
      }
    }
  }
  o = vec4(c, 0.0, 0.0, 0.0);
}`,Tt=`#version 300 es
precision highp float;
uniform highp sampler2D uM;
out vec4 o;
${ft}
void main() {
  vec4 m = texelFetch(uM, ivec2(gl_FragCoord.xy), 0);
  o = m.r > 0.5 && m.a > 0.1 ? vec4(0.6, m.g * 1.0471976, nrmOf(m), 129.0) : vec4(1.0, 0.0, 0.0, 0.0);
}`,_t=`#version 300 es
precision highp float;
precision highp int;
uniform highp sampler2D uH;
uniform vec4 uQ[66];
out vec4 o;
float seg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0); return length(pa - ba * h); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy), hi = ivec2(int(uQ[0].z) - 1);
  vec3 c3 = texelFetch(uH, p, 0).rgb;
  vec2 c = c3.rg;
  float rg = c3.b * uQ[1].z;
  vec2 sm = texelFetch(uH, clamp(p + ivec2(1, 0), ivec2(0), hi), 0).rg + texelFetch(uH, clamp(p - ivec2(1, 0), ivec2(0), hi), 0).rg
    + texelFetch(uH, clamp(p + ivec2(0, 1), ivec2(0), hi), 0).rg + texelFetch(uH, clamp(p - ivec2(0, 1), ivec2(0), hi), 0).rg;
  vec2 v = c + uQ[0].x * (sm - 4.0 * c);
  v.r *= uQ[0].y;
  v.g *= v.r < 0.15 ? uQ[1].y : uQ[1].x;
  vec2 uv = (vec2(p) + 0.5) / uQ[0].z;
  int n = int(uQ[0].w);
  for (int i = 0; i < n; i++) {
    vec4 A = uQ[2 + 2 * i], B = uQ[3 + 2 * i];
    float w = 1.0 - smoothstep(B.x * 0.45, B.x, seg(uv, A.xy, A.zw));
    v.r += w * B.y; v.g += w * B.z;
    rg = max(rg, w * step(0.001, B.z));
  }
  o = vec4(min(v, vec2(4.0, 1.5)), rg, 1.0);
}`,zt=`#version 300 es
precision highp float;
precision highp int;
uniform highp sampler2D uS;
uniform vec4 uQ;
out vec4 o;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, hi = ivec2(int(uQ.z) - 1);
  int R = int(uQ.x);
  float acc = 0.0, w = 0.0, th = 0.0, vp = 0.0;
  for (int j = -R; j <= R; j++) for (int i = -R; i <= R; i++) {
    vec4 s = texelFetch(uS, clamp(p + ivec2(i, j) * 2, ivec2(0), hi), 0);
    float k = exp(-float(i * i + j * j) / uQ.y);
    float v = s.a > 0.5 ? 1.0 : 0.0;
    acc += v * k; th += v * s.r * k; vp += (1.0 - v) * s.r * k; w += k;
  }
  o = vec4(acc / w, th / w, vp / w, 1.0);
}`,Ot=`#version 300 es
precision highp float;
precision highp int;
uniform highp sampler2D uS;
uniform vec4 uQ;
out vec4 o;
void main() {
  ivec2 b = ivec2(gl_FragCoord.xy) * int(uQ.x);
  int K = int(uQ.y);
  float cnt = 0.0;
  for (int j = 0; j < K; j++) for (int i = 0; i < K; i++) cnt += step(0.5, texelFetch(uS, b + ivec2(i, j) * 3, 0).a);
  float f = cnt / float(K * K);
  o = vec4(f, fract(f * 255.0), 0.0, 1.0);
}`,Gt=o=>`#version 300 es
precision highp float;
precision highp int;
#define KIND ${o}
in vec2 vUv;
uniform sampler2D uN;
uniform vec4 uO[20];
out vec4 o;
float h11(float x) { return fract(sin(x * 127.1 + 31.7) * 43758.5453); }
float wd(float x) { return fract(x + 0.5) - 0.5; }
float n1(float x, float k) { return texture(uN, vec2(x * k, 0.37)).r; }
void main() {
  vec2 v = vUv;
  vec3 top = uO[0].rgb, hor = uO[1].rgb, snow = uO[2].rgb, dark = uO[3].rgb, warm = uO[4].rgb;
  float hy = uO[1].w, B = uO[3].w, lamps = uO[4].w;
  ivec4 CN = ivec4(uO[19] + 0.5);
  float sk = clamp((v.y - hy + 0.04) / (1.0 - hy), 0.0, 1.0);
  vec3 col = mix(hor, top, pow(sk, 0.55));
  col *= 0.93 + 0.14 * texture(uN, v * vec2(1.0, 2.0) + vec2(0.0, uO[0].w)).a;
  float vis = 1.0;
  float gl = hy + 0.012 * (n1(v.x, 2.0) - 0.5);
  float gnd = smoothstep(gl + B, gl - B, v.y);
  vec3 g = snow * (0.78 + 0.32 * smoothstep(hy, 0.05, v.y)) * (0.9 + 0.2 * texture(uN, v * vec2(2.0, 5.0)).g);
  g = mix(g, snow * (uO[2].w > 1.5 ? vec3(0.42, 0.58, 1.0) * 0.62 : vec3(0.72, 0.8, 1.0) * 0.8), (uO[2].w > 1.5 ? 0.75 : 0.5) * smoothstep(0.55, 0.75, texture(uN, v * vec2(3.0, 7.0) + 0.3).r));
  col = mix(col, g, gnd); vis *= 1.0 - gnd;
#if KIND != 3
  // the far tree line
  float tt = hy + uO[5].w + 0.05 * n1(v.x, 3.0) + 0.03 * texture(uN, vec2(v.x * 11.0, 0.61)).g;
  float band = smoothstep(tt + B, tt - B, v.y) * smoothstep(hy - 0.05, hy - 0.02, v.y);
  col = mix(col, mix(dark, hor, 0.5), band * 0.92); vis *= 1.0 - band;
#endif
#if KIND == 0
  // a snowy hedge, bare trees, snowed shrubs, the feeder on its pole
  float ht = hy - 0.035 + 0.02 * n1(v.x, 4.0);
  float hed = smoothstep(ht + B, ht - B, v.y) * smoothstep(hy - 0.13 - B, hy - 0.13 + B, v.y);
  vec3 hc = mix(dark * 1.6, snow * 0.85, smoothstep(ht - 0.03, ht - 0.005, v.y) * (0.6 + 0.4 * texture(uN, v * 9.0).b));
  col = mix(col, hc, hed); vis *= 1.0 - hed;
  for (int i = 0; i < CN.x; i++) {
    vec4 T = uO[6 + i];
    float dx = wd(v.x - T.x), y = v.y - T.y;
    float w = T.w * (1.0 - 0.6 * clamp(y / T.z, 0.0, 1.0));
    float tr = smoothstep(w + B, w - B * 0.5, abs(dx)) * step(0.0, y) * smoothstep(T.z, T.z * 0.7, y);
    vec2 cr = vec2(dx, y - T.z * 0.75) / vec2(T.z * 0.42, T.z * 0.36);
    float crown = smoothstep(1.0, 0.45, length(cr)) * step(0.0, y) * (0.2 + 0.35 * texture(uN, v * vec2(10.0, 7.0) + float(i)).b);
    // a few limbs fanning up and out of the trunk, soft
    float lim = 0.0;
    for (int k = 0; k < CN.w + 2; k++) {
      float fk = float(k), side = mod(fk, 2.0) < 0.5 ? 1.0 : -1.0, hk = h11(fk * 7.3 + float(i) * 3.1);
      vec2 a0 = vec2(0.0, T.z * (0.3 + 0.13 * fk)), dl = vec2(side * (0.35 + 0.4 * hk), 1.0) * T.z * (0.32 - 0.03 * fk);
      vec2 pa = vec2(dx, y) - a0;
      float h = clamp(dot(pa, dl) / dot(dl, dl), 0.0, 1.0);
      float lw = T.w * (0.55 - 0.35 * h);
      lim = max(lim, smoothstep(lw + B, lw - B * 0.5, length(pa - dl * h)));
    }
    col = mix(col, dark * 1.3, max(max(tr * 0.9, lim * 0.75), crown * 0.5)); vis *= 1.0 - max(max(tr, lim * 0.8), crown * 0.6);
  }
  for (int i = 0; i < CN.y; i++) {
    vec4 M = uO[10 + i];
    vec2 q = vec2(wd(v.x - M.x), v.y - M.y) / M.zw;
    float mo = smoothstep(1.0 + 6.0 * B / M.z, 1.0 - 6.0 * B / M.z, length(q)) * step(-0.2, q.y);
    col = mix(col, snow * (0.62 + 0.42 * smoothstep(-0.2, 0.8, q.y)), mo);
  }
  vec4 F = uO[13];
  float fdx = wd(v.x - F.x);
  float pole = smoothstep(0.006 + B, 0.006 - B * 0.5, abs(fdx)) * step(v.y, F.y) * step(F.y - 0.38, v.y);
  float box = smoothstep(0.03 + B, 0.03 - B, abs(fdx)) * smoothstep(0.022 + B, 0.022 - B, abs(v.y - F.y - 0.024));
  float roof = smoothstep(B, -B, (v.y - F.y - 0.046) - 0.03 * (1.0 - abs(fdx) / 0.042)) * step(F.y + 0.04, v.y) * step(abs(fdx), 0.046);
  vec3 wood = vec3(0.09, 0.06, 0.04) * (0.6 + 0.6 * dot(hor, vec3(0.3, 0.5, 0.2)));
  col = mix(col, wood, max(pole, box)); vis *= 1.0 - max(pole, box);
  col = mix(col, snow * 0.95, roof); vis *= 1.0 - roof;
#elif KIND == 1
  // a frozen lake under the far shore, snow banks and reeds in front
  float sh = 0.27 + 0.03 * n1(v.x, 2.0) + 0.02 * texture(uN, vec2(v.x * 5.0, 0.2)).g;
  float lake = smoothstep(sh - B, sh + B, v.y) * smoothstep(hy - 0.025 + B, hy - 0.025 - B, v.y);
  vec3 refl = mix(hor, top, 0.35 + 0.5 * smoothstep(hy, sh, v.y)) * 0.72;
  refl *= 0.9 + 0.2 * texture(uN, vec2(v.x * 2.0, v.y * 30.0)).g;
  refl = mix(refl, snow * 0.92, smoothstep(0.62, 0.7, texture(uN, v * vec2(2.0, 9.0) + 0.5).r));
  col = mix(col, refl, lake);
  float id = floor(v.x * 70.0), rf = fract(v.x * 70.0) - 0.5 - 0.3 * (h11(id) - 0.5);
  float rh = sh - 0.02 + 0.13 * h11(id + 7.0) * step(0.45, n1(v.x, 3.0));
  float reed = smoothstep(0.16, 0.05, abs(rf)) * step(v.y, rh) * step(0.08, v.y) * step(0.35, h11(id + 3.0));
  col = mix(col, vec3(0.1, 0.075, 0.04) * (0.5 + dot(hor, vec3(0.4))), reed * 0.75); vis *= 1.0 - reed;
  vec4 F = uO[13];
  float post = smoothstep(0.011 + B, 0.011 - B, abs(wd(v.x - F.x))) * step(v.y, F.y) * step(F.y - 0.2, v.y);
  float cap = smoothstep(0.013 + B, 0.013 - B, abs(wd(v.x - F.x))) * smoothstep(0.012, 0.0, abs(v.y - F.y - 0.004));
  col = mix(col, vec3(0.07, 0.05, 0.035), post); vis *= 1.0 - post;
  col = mix(col, snow, cap);
#elif KIND == 2
  // a village street: houses with snow on the roofs, lit windows, lamps
  for (int i = 0; i < CN.z; i++) {
    vec4 H = uO[6 + i];
    float dx = wd(v.x - H.x);
    float base = hy - 0.03, wt = base + H.z;
    float wall = smoothstep(H.y + B, H.y - B, abs(dx)) * smoothstep(base - 0.02 - B, base - 0.02 + B, v.y) * smoothstep(wt + B, wt - B, v.y);
    float ry = wt + H.w * (1.0 - abs(dx) / (H.y + 0.012));
    float roof = smoothstep(ry + B, ry - B, v.y) * smoothstep(wt - 2.0 * B, wt, v.y) * smoothstep(H.y + 0.012 + B, H.y + 0.012 - B, abs(dx));
    float rsn = roof * smoothstep(ry - 0.03, ry - 0.008, v.y);
    float hk = h11(float(i) * 3.1);
    vec3 pal = hk < 0.3 ? vec3(0.42, 0.12, 0.07) : hk < 0.55 ? vec3(0.45, 0.33, 0.16) : hk < 0.8 ? vec3(0.55, 0.53, 0.5) : vec3(0.16, 0.1, 0.06);
    vec3 wc = pal * (dark * 2.0 + hor * 0.35 + snow * 0.12) * (0.8 + 0.4 * h11(float(i)));
    col = mix(col, wc, wall); vis *= 1.0 - max(wall, roof);
    col = mix(col, dark * 1.2, roof);
    col = mix(col, snow * 0.9, rsn);
    vec2 wq = vec2(fract((dx + H.y) / (H.y * 0.66)) - 0.5, (v.y - base - H.z * 0.45) / (H.z * 0.22));
    float wid = floor((dx + H.y) / (H.y * 0.66)) + float(i) * 5.0, wk = h11(wid);
    float wg = exp(-wq.x * wq.x / 0.07 - wq.y * wq.y / 0.9) + 0.25 * exp(-wq.x * wq.x / 0.5 - wq.y * wq.y / 5.0);
    float win = wall * wg * smoothstep(H.y, H.y * 0.7, abs(dx)) * step(0.3, wk) * (0.35 + 0.9 * h11(wid + 1.7));
    col += warm * lamps * win * 1.3;
    // a thread of chimney smoke from some roofs
    float sy = v.y - ry, sw = 0.018 + 0.12 * sy;
    float sm = step(0.55, hk) * exp(-pow((dx - H.y * 0.4 - 0.25 * sy * sy - 0.01 * sin(sy * 9.0 + float(i))) / sw, 2.0)) * smoothstep(-0.01, 0.04, sy) * smoothstep(0.35, 0.05, sy);
    col = mix(col, hor * 0.85 + snow * 0.25, sm * 0.16);
  }
  float road = smoothstep(0.5, 0.0, abs(wd(v.x - uO[13].z) * 2.0 + (hy - v.y) * 0.9 - 0.2)) * gnd * smoothstep(hy - 0.01, hy - 0.2, v.y);
  col *= 1.0 - 0.18 * road;
  for (int i = 0; i < CN.w; i++) {
    float lx = uO[14].x + float(i) * 0.37, ly = hy + 0.11 - float(i) * 0.04, r = 0.03 + 0.012 * float(i);
    float dl = length(vec2(wd(v.x - lx), v.y - ly));
    float post = smoothstep(0.005 + B, 0.004, abs(wd(v.x - lx))) * step(v.y, ly) * step(hy - 0.08 - float(i) * 0.05, v.y);
    col = mix(col, dark * 0.8, post); vis *= 1.0 - post;
    float bok = smoothstep(r, r * 0.6, dl);
    col += warm * lamps * (bok * (0.55 + 0.35 * smoothstep(r * 0.5, r, dl)) + 0.25 * exp(-dl * dl / (r * r * 6.0)));
  }
  vec4 F = uO[13];
  float fp = smoothstep(0.008 + B, 0.008 - B, abs(wd(v.x - F.x))) * step(v.y, F.y) * step(0.0, v.y);
  col = mix(col, dark * 0.7, fp); vis *= 1.0 - fp;
#else
  // a pine forest in three layers, snow caught on the boughs
  for (int L = 0; L < CN.w; L++) {
    float fl = float(L);
    float sp = 0.075 + 0.055 * fl, base = hy + 0.05 - 0.09 * fl;
    vec3 lc = mix(dark * (1.0 + 0.5 * fl), hor, 0.62 - 0.27 * fl);
    for (int kk = 0; kk < CN.y; kk++) {
      float id = floor(v.x / sp) + float(kk - 1);
      float hh = h11(id + fl * 31.0);
      float xc = (id + 0.5 + 0.6 * (h11(id * 1.7 + fl) - 0.5)) * sp;
      float hgt = (0.2 + 0.25 * hh) * (1.0 + 0.5 * fl);
      float y = v.y - base;
      float rel = y / hgt;
      float w = sp * (0.55 + 0.2 * hh) * (1.0 - rel) * (0.82 + 0.25 * abs(sin(rel * 26.0 + id)));
      float tr = smoothstep(w + B, w - B, abs(v.x - xc)) * step(-0.05, y) * step(rel, 1.0);
      float sn = smoothstep(0.55, 0.7, texture(uN, v * vec2(8.0, 14.0) + fl * 0.3).b) * smoothstep(0.2, 0.9, fract(rel * 9.0 + id));
      vec3 tc = mix(lc, snow * (0.75 - 0.15 * fl), sn * (0.4 + 0.2 * fl));
      col = mix(col, tc, tr); vis *= 1.0 - tr;
    }
  }
  vec4 F = uO[13];
  float stump = smoothstep(0.03 + B, 0.03 - B, abs(wd(v.x - F.x))) * step(v.y, F.y) * step(F.y - 0.15, v.y);
  float scap = smoothstep(0.036 + B, 0.034 - B, abs(wd(v.x - F.x))) * smoothstep(0.016, 0.0, abs(v.y - F.y - 0.006));
  col = mix(col, vec3(0.06, 0.04, 0.03), stump); vis *= 1.0 - stump;
  col = mix(col, snow, scap);
#endif
  // the near snow on the outside sill, out of focus
  float ns = smoothstep(0.1 + B * 3.0, 0.1 - B * 3.0, v.y + 0.02 * (n1(v.x, 3.0) - 0.5));
  col = mix(col, snow * 1.05, ns);
  o = vec4(col, vis);
}`,Lt=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv;
uniform sampler2D uA;
uniform vec4 uQ;
out vec4 o;
void main() {
  vec4 acc = vec4(0.0); float w = 0.0;
  int R = int(uQ.x);
  for (int j = -R; j <= R; j++) for (int i = -R; i <= R; i++) {
    vec2 d = vec2(float(i), float(j));
    float k = exp(-dot(d, d) / uQ.y);
    acc += texture(uA, vUv + d * uQ.z * vec2(1.0, 1.0)) * k; w += k;
  }
  o = acc / w;
}`,Ut=`
float sdRB(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; }
float glassSD(vec2 uv, vec4 G0, vec4 G1) {
#if WK == 0
  return min(min(uv.y - G0.x, uv.x - G0.y), min(abs(uv.x - G0.z) - G0.w, abs(uv.y - G1.x) - G0.w));
#elif WK == 1
  float wood = min(uv.y - G0.x, G0.y - uv.x);
  float f1 = uv.x / G1.x + uv.y / G1.y + G1.z, f2 = uv.x / G1.x - uv.y / G1.y + G1.w;
  float L = length(vec2(1.0 / G1.x, 1.0 / G1.y));
  float came = min(abs(f1 - floor(f1 + 0.5)), abs(f2 - floor(f2 + 0.5))) / L - G0.z;
  return min(wood, came);
#elif WK == 2
  return -sdRB(uv - G0.xy, G0.zw, G1.x);
#else
  return G1.x - length(uv - G0.xy);
#endif
}`,It=o=>`#version 300 es
precision highp float;
precision highp int;
#define WK ${o}
in vec2 vUv;
uniform sampler2D uN;
uniform vec4 uF[6];
out vec4 o;
${Ut}
void main() {
  vec2 uv = vUv;
  vec4 G0 = uF[0], G1 = uF[1];
  float px = uF[2].x;
  float sd = glassSD(uv, G0, G1);
  float a = smoothstep(px, -px, sd);
  float d = -sd;
  vec3 col;
  vec4 nz = texture(uN, uv * 2.0), nf = texture(uN, uv * 9.0);
#if WK == 0
  // painted sash: putty bevel at the glass, chipped paint, a sill at the foot
  vec3 paint = uF[3].rgb;
  float dir = abs(uv.x - G0.z) < G0.w + 0.02 || uv.x < G0.y + 0.01 ? 1.0 : 0.0;
  // thick old paint: brush streaks along each member, sags, chips down to grey wood near the glass
  vec2 bs = dir > 0.5 ? vec2(uv.x * 38.0, uv.y * 1.3) : vec2(uv.x * 1.3, uv.y * 38.0);
  float brush = texture(uN, bs).g * 0.6 + texture(uN, bs * vec2(2.3, 1.7) + 0.4).b * 0.4;
  col = paint * (0.72 + 0.4 * brush);
  float chip = smoothstep(0.78, 0.8, texture(uN, uv * 6.0 + 0.2).b * 0.45 + texture(uN, uv * 23.0).r * 0.55) * smoothstep(0.04, 0.006, d);
  col = mix(col, vec3(0.3, 0.25, 0.19) * (0.7 + 0.5 * nf.g), chip * 0.8);
  col *= 0.94 + 0.06 * texture(uN, uv * 1.3).a;
  float putty = smoothstep(0.013 + px, 0.013 - px, d);
  col = mix(col, vec3(0.6, 0.58, 0.52) * (0.8 + 0.25 * nf.b), putty);
  col *= mix(1.0, 1.25, putty * smoothstep(0.013, 0.0, d));
  // the window's own light falls on the reveal beside the glass and fades into the room
  col *= 0.7 + 0.55 * exp(-max(0.0, d - 0.013) / 0.03);
  col *= mix(1.0, 0.72, smoothstep(0.013, 0.016, d) * smoothstep(0.024, 0.016, d));
  if (uv.y < 0.05) { col = paint * (1.05 + 0.15 * brush) * (0.75 + 0.3 * smoothstep(0.0, 0.045, uv.y)); col *= 1.0 - 0.45 * smoothstep(0.004, 0.0, abs(uv.y - 0.049)); }
#elif WK == 1
  // dark oak and lead cames with soldered joints
  float wood = min(uv.y - G0.x, G0.y - uv.x);
  float f1 = uv.x / G1.x + uv.y / G1.y + G1.z, f2 = uv.x / G1.x - uv.y / G1.y + G1.w;
  float L = length(vec2(1.0 / G1.x, 1.0 / G1.y));
  float d1 = abs(f1 - floor(f1 + 0.5)) / L, d2 = abs(f2 - floor(f2 + 0.5)) / L;
  float dc = min(d1, d2);
  if (wood > 0.0) {
    float t = clamp(dc / G0.z, 0.0, 1.0);
    col = vec3(0.2, 0.2, 0.21) * (0.45 + 0.75 * (1.0 - t * t)) * (0.85 + 0.3 * nf.b) + vec3(0.25) * exp(-pow((t - 0.3) / 0.25, 2.0)) * (0.6 + 0.4 * nz.g);
    float joint = length(vec2(d1, d2)) - G0.z * 1.7;
    float jb = smoothstep(px, -px, joint);
    col = mix(col, vec3(0.16, 0.16, 0.17) * (0.7 + 0.6 * smoothstep(G0.z * 1.7, 0.0, length(vec2(d1, d2)))), jb);
    a = max(smoothstep(px, -px, dc - G0.z), jb);
  } else {
    float grain = texture(uN, vec2(uv.x * (uv.y < G0.x ? 1.0 : 30.0), uv.y * (uv.y < G0.x ? 30.0 : 1.0))).g;
    col = uF[3].rgb * (0.6 + 0.6 * grain) * (0.85 + 0.3 * nz.r);
    col *= 0.6 + 0.4 * smoothstep(0.0, 0.025, -wood);
    col *= 1.0 + 0.35 * smoothstep(0.012, 0.0, -wood);
  }
#elif WK == 2
  // rubber gasket, then the carriage's painted wall
  float gk = 0.024;
  if (d < gk) {
    float t = d / gk;
    col = vec3(0.018, 0.018, 0.02) * (0.6 + 1.6 * exp(-pow((t - 0.35) / 0.18, 2.0))) + vec3(0.03) * nf.b;
  } else {
    col = uF[3].rgb * (0.88 + 0.12 * nz.r + 0.05 * nf.g);
    col *= 0.7 + 0.3 * smoothstep(gk, gk + 0.05, d);
    col *= 1.0 + 0.25 * exp(-pow((d - gk - 0.006) / 0.004, 2.0));
    float rv = length(fract(uv * vec2(12.0, 12.0)) - 0.5);
    col *= 1.0 + 0.15 * smoothstep(0.08, 0.04, rv) * step(gk + 0.04, d);
  }
#else
  // a heavy cast brass porthole rim: a bevelled inner lip, a flat, a groove green with verdigris, a raised outer
  // ring carrying domed bolt heads, all turned on a lathe; in a painted steel wall
  vec2 q = uv - G0.xy;
  float r = length(q), ang = atan(q.y, q.x);
  float r0 = G1.x, r1 = G1.x + 0.085;
  vec2 rd = q / max(r, 1e-4);
  float lk = dot(rd, normalize(vec2(-0.55, 0.8)));
  if (r < r1) {
    float t = (r - r0) / (r1 - r0);
    // the profile's slope across the ring (+ rises outward) and the creases
    float sl = 1.6 * smoothstep(0.0, 0.03, t) * smoothstep(0.13, 0.08, t) - 1.2 * smoothstep(0.4, 0.44, t) * smoothstep(0.5, 0.46, t)
      + 1.0 * smoothstep(0.5, 0.54, t) * smoothstep(0.62, 0.56, t) - 0.9 * smoothstep(0.78, 0.86, t) * smoothstep(1.0, 0.94, t)
      + 0.5 * cos(clamp((t - 0.56) / 0.3, 0.0, 1.0) * 3.1416) * step(0.56, t) * step(t, 0.86);
    float crease = exp(-pow((t - 0.47) / 0.025, 2.0)) + 0.7 * exp(-pow((t - 0.02) / 0.02, 2.0)) + 0.6 * exp(-pow((t - 0.98) / 0.02, 2.0));
    vec3 br = vec3(0.5, 0.34, 0.13) * (0.82 + 0.3 * nf.g + 0.1 * nz.r);
    float dif = 0.55 + 0.45 * clamp(sl * lk, -1.0, 1.0);
    col = br * dif * (1.0 - 0.55 * crease);
    col += vec3(1.0, 0.82, 0.5) * 0.45 * pow(max(0.0, sl * lk), 3.0) * (0.7 + 0.3 * nf.b);
    col = mix(col, vec3(0.16, 0.27, 0.21) * (0.6 + 0.6 * nf.r), crease * smoothstep(0.45, 0.7, texture(uN, uv * 13.0).g) * 0.8);
    float ba = floor(ang / 0.7853982 + 0.5) * 0.7853982 + 0.3927;
    vec2 bc = G0.xy + vec2(cos(ba), sin(ba)) * (r0 + 0.059);
    vec2 bq = (uv - bc) / 0.0105;
    float bd = length(bq);
    float bolt = smoothstep(1.0 + px / 0.0105, 1.0 - px / 0.0105, bd);
    vec3 bn = vec3(bq, sqrt(max(0.0, 1.0 - bd * bd)));
    float bl = max(0.0, dot(bn, normalize(vec3(-0.5, 0.75, 0.6))));
    vec3 bcol = br * (0.35 + 0.75 * bl) + vec3(1.0, 0.85, 0.55) * 0.6 * pow(bl, 18.0);
    col *= 1.0 - 0.45 * smoothstep(1.6, 1.0, length(bq - vec2(0.25, -0.3))) * (1.0 - bolt);
    col = mix(col, bcol, bolt);
  } else {
    col = uF[3].rgb * (0.9 + 0.1 * nz.r + 0.04 * nf.g);
    col *= 0.5 + 0.5 * smoothstep(r1, r1 + 0.07, r + 0.012 * lk);
  }
#endif
  o = vec4(col * a, a);
}`,Dt=`#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uN;
uniform vec4 uF[2];
out vec4 o;
void main() {
  // a burnt-down stub: a sunken pool, a raised lip, a run of wax down one side, lit through from the flame
  vec2 cp = vUv - vec2(uF[0].x, 0.0);
  float rw = 0.028, top = uF[0].y - 0.036, px = uF[0].z;
  float lip = top + 0.005 * smoothstep(0.55 * rw, rw, abs(cp.x)) - 0.004 * smoothstep(0.7 * rw, 0.0, abs(cp.x));
  float drip = 0.0035 * smoothstep(top - 0.06, top - 0.005, cp.y) * smoothstep(0.003, 0.0, cp.x - rw) * step(0.0, cp.x) + 0.004 * exp(-pow((cp.y - top + 0.055) / 0.006, 2.0)) * step(0.0, cp.x);
  float side = abs(cp.x) - rw - drip - 0.0015 * texture(uN, vec2(0.3, cp.y * 9.0)).g;
  float body = smoothstep(px, -px, max(side, cp.y - lip));
  float cyl = cos(clamp(cp.x / (rw + 0.004), -1.0, 1.0) * 1.35);
  float near = exp(-max(0.0, lip - cp.y) / 0.022);
  vec3 wax = vec3(0.6, 0.55, 0.45) * (0.45 + 0.55 * cyl) + vec3(1.0, 0.6, 0.3) * 0.75 * near * (0.6 + 0.4 * cyl);
  wax *= 1.0 - 0.25 * smoothstep(0.004, 0.0, lip - cp.y) * step(abs(cp.x), 0.7 * rw);
  o = vec4(min(wax, vec3(1.0)) * body, body);
}`,Ht=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv;
uniform highp sampler2D uS;
uniform sampler2D uP;
uniform sampler2D uH;
uniform sampler2D uO;
uniform sampler2D uOB;
uniform sampler2D uF;
uniform sampler2D uN;
uniform sampler2D uM;
uniform vec4 uC[20];
out vec4 o;
float h21(vec2 p) { p = fract(p * vec2(0.1031, 0.1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
float ell(vec2 p, vec2 c, vec2 r) { return length((p - c) / r) - 1.0; }
void main() {
  vec2 uv = vUv;
  vec4 C0 = uC[0], C1 = uC[1], C2 = uC[2], C3 = uC[3], C4 = uC[4], C5 = uC[5], C6 = uC[6], C7 = uC[7], C8 = uC[8], C9 = uC[9];
  float S = C0.x, t = C0.y, N = C0.z;
  float px = N / S;
  // ---- frost needles: the 3 x 3 cells around, each a crisp line through its true offset
  vec2 q = uv * N, ic = floor(q);
  ivec2 hi = ivec2(int(N) - 1);
  vec2 sp = C1.xy;
  vec2 sdir = normalize(sp - uv + vec2(0.0, 0.0001));
  float aa = 0.55 * px + 0.04;
  float cov = 0.0, across = 0.0, thk = 0.0, halo = 0.0;
  vec3 glint = vec3(0.0);
  float itc = uC[13].w, sunR = sqrt(dot(uv - sp, uv - sp));
  vec2 lperp = vec2(0.0, 1.0);
  int R1 = int(uC[13].y);
  for (int j = -R1; j <= R1; j++) for (int i = -R1; i <= R1; i++) {
    ivec2 cc = clamp(ivec2(ic) + ivec2(i, j), ivec2(0), hi);
    vec4 s = texelFetch(uS, cc, 0);
    if (s.a < 0.5) continue;
    vec2 rel = q - (vec2(cc) + 0.5);
    float pk = s.a - 1.0, gen = floor(pk / 256.0), fl = floor(mod(pk, 256.0) / 32.0);
    float sd, w, cut = 1.0;
    vec2 pp;
    if (fl > 3.5) { sd = length(rel); w = 0.5; pp = rel / max(sd, 1e-3); }
    else {
      vec2 d = vec2(cos(s.g), sin(s.g));
      pp = vec2(-d.y, d.x);
      sd = dot(rel, pp) + s.b;
      float al = dot(rel, d);
      cut = smoothstep(0.95, 0.6, abs(al));
      float tn = clamp(s.r * itc, 0.0, 1.0);
      w = (gen < 0.5 ? C9.x : gen < 1.5 ? C9.y : C9.z) * (0.18 + 0.82 * sqrt(tn));
      if (gen > uC[11].x - 0.5) w *= max(0.45, 1.0 - 0.07 * mod(pk, 32.0));
      // a tip (no ice ahead along the needle) comes to a point instead of a round end
      if (texelFetch(uS, clamp(cc + ivec2(floor(d * 1.42 + 0.5)), ivec2(0), hi), 0).a < 0.5) { w *= clamp(0.6 - 0.75 * al, 0.08, 1.0); cut = smoothstep(0.75, 0.3, al) * smoothstep(-0.95, -0.6, al); }
      float hc = h21(vec2(cc) * 1.37 + 0.5);
      // a glint: a facet turned just right to the sun, mostly on thick old ice and in a loose ring round the sun
      float ring = exp(-pow((sunR - 0.16) / 0.12, 2.0)) + 0.35;
      if (hc > C9.w - 0.03 * ring * tn) {
        vec2 gp = rel + s.b * pp;
        float dg = length(gp) / px;
        float face = abs(dot(pp, sdir));
        float tw = pow(max(0.0, sin(t * 0.7 + hc * 80.0 + (sp.x + sp.y) * 60.0)), 40.0);
        float h2 = fract(hc * 91.7);
        vec3 gc = h2 < 0.3 ? vec3(1.0, 0.62, 0.32) : h2 < 0.55 ? vec3(0.55, 1.0, 0.85) : vec3(1.0);
        glint += gc * tw * face * face * tn * ring * (exp(-dg * dg * 0.5) + 0.3 * exp(-abs(gp.x / px) * 0.8 - abs(gp.y / px) * 9.0) + 0.3 * exp(-abs(gp.y / px) * 0.8 - abs(gp.x / px) * 9.0));
      }
    }
    float we = max(w, 0.45 * px);
    float k = (w / we) * smoothstep(we + aa, we - aa * 0.5, abs(sd)) * cut;
    halo = max(halo, (w / we) * exp(-sd * sd / (we * we * 7.0)) * cut);
    if (k > cov) { cov = k; across = clamp(sd / we, -1.0, 1.0); thk = clamp(s.r * itc, 0.0, 1.0); lperp = pp; }
  }
  vec3 nrm = vec3(lperp * across, sqrt(max(0.0, 1.0 - across * across)));
  vec4 P = texture(uP, uv);
  vec2 hm = texture(uH, uv).rg;
  // ---- the glass: wavy (sash), tilted quarries (leaded), clear
  vec2 wob = (texture(uN, uv * vec2(0.35, 2.2) + 0.1).rg - 0.5) * C6.y;
  float qsh = 1.0;
  if (C0.w > 0.5 && C0.w < 1.5) {
    float f1 = floor(uv.x / C8.x + uv.y / C8.y + C8.z + 0.5), f2 = floor(uv.x / C8.x - uv.y / C8.y + C8.w + 0.5);
    wob += (vec2(h21(vec2(f1, f2)), h21(vec2(f2, f1 + 9.0))) - 0.5) * 0.012;
    qsh = 0.93 + 0.14 * h21(vec2(f1 + 3.0, f2 - 5.0));
  }
  vec2 wet = (hm.x > 0.3 ? (texture(uN, uv * 6.0 + vec2(0.0, t * 0.01)).gb - 0.5) * 0.01 * smoothstep(0.3, 1.0, hm.x) : vec2(0.0));
  vec2 ou = vec2(uv.x + C6.x, uv.y) + wob + wet;
  vec4 O4 = texture(uO, ou);
  vec3 O = O4.rgb;
  // the sun: a disc hidden behind what stands in front of it, and its glow
  vec2 ds = (ou - vec2(C6.x, 0.0) - sp);
  float d2 = dot(ds, ds);
  vec3 sunC = C2.rgb * C1.z;
  O += sunC * (1.8 * smoothstep(C1.w * 1.1, C1.w * 0.3, sqrt(d2)) * (0.3 + 0.7 * O4.a) + 1.1 * exp(-d2 / (C1.w * C1.w * 5.0)) * (0.4 + 0.6 * O4.a) + 0.2 * exp(-d2 / 0.06));
  // falling snow, out of focus, veiling the far view
  if (C6.z > 0.01) {
    O = mix(O, uC[14].rgb * 1.2 + sunC * 0.05, 0.14 * (1.0 - smoothstep(0.1, 0.5, abs(uv.y - 0.45))) * C6.z);
    for (int l = 0; l < int(uC[13].z); l++) {
      float k = l == 0 ? 7.0 : 16.0, sz = l == 0 ? 0.11 : 0.06;
      vec2 g = uv * k + vec2(sin(t * 0.3 + float(l)) * 0.6, t * C6.w * (l == 0 ? 1.0 : 0.6));
      vec2 id = floor(g), f = fract(g) - 0.5;
      float r1 = h21(id + float(l) * 17.0), r2 = h21(id + 31.0 + float(l) * 7.0);
      vec2 c = (vec2(r1, r2) - 0.5) * 0.6 + vec2(0.12 * sin(t * 1.3 + r1 * 30.0), 0.0);
      float dd = length(f - c);
      float rs = sz * (0.45 + 0.55 * r2);
      float fl = exp(-dd * dd / (rs * rs)) * step(0.45, r1) * C6.z;
      O = mix(O, uC[14].rgb * 1.3 + C3.rgb + sunC * 0.1, fl * (l == 0 ? 0.22 : 0.4));
    }
  }
  vec3 A = uC[14].rgb;
  vec3 OB = texture(uOB, ou + nrm.xy * 0.012).rgb;
  OB += sunC * (0.6 * exp(-d2 / (C1.w * C1.w * 14.0)) + 0.2 * exp(-d2 / 0.1));
  vec3 room = C3.rgb;
  // candle light inside
  vec2 dcv = uv - C5.xy;
  float cl = C5.z * C5.w * (0.7 * exp(-dot(dcv, dcv) / 0.05) + 0.2 * exp(-dot(dcv, dcv) / 0.4));
  room += vec3(1.0, 0.55, 0.22) * cl;
  // ---- frost: a matte film where it is dense, and the needles themselves
  float bl = dot(OB, vec3(0.3, 0.55, 0.15));
  vec3 tint = C4.rgb;
  float dens = smoothstep(0.03, 0.5, P.r);
  float haze = clamp(dens * C4.w * (1.0 + 0.6 * smoothstep(0.55, 0.1, uv.y)), 0.0, 0.92);
  vec3 film = tint * (A * 0.85 + OB * 0.45 + room * 1.6) + sunC * 0.2 * exp(-d2 / 0.06);
  // a mist of tiny grains on the open glass where the vapour is still high; none in the clear margin by the fronds
  float gr = texture(uN, uv * 11.3 + 0.37).b * 0.5 + texture(uN, uv * 23.9).b * 0.5;
  float mist = smoothstep(0.62, 0.95, P.b) * (1.0 - dens);
  haze += mist * (0.1 + 0.07 * smoothstep(0.45, 0.8, gr));
  vec3 col = mix(O, film, haze);
  float face = max(0.0, dot(nrm.xy, sdir));
  float sideLit = pow(face, 1.5) * C1.z;
  float var = 0.72 + 0.56 * texture(uN, q * 0.013).a;
  vec3 Rf = texture(uO, ou + nrm.xy * 0.025).rgb;
  float rim = pow(1.0 - nrm.z, 1.5);
  vec3 ice = tint * (A * (0.85 + 0.6 * thk) + OB * 0.35 + room * (1.6 + 1.4 * thk)) * var * (0.78 + 0.4 * rim);
  ice = mix(ice, Rf * 1.1 + tint * A * 0.3, (0.25 + 0.45 * (1.0 - thk)) * nrm.z);
  // against the sun the thick ice goes grey and the thin edges light up
  float back = exp(-d2 / 0.03) * C1.z;
  ice *= 1.0 - 0.4 * back * thk * nrm.z;
  ice += sunC * (1.1 * sideLit + 0.35 * exp(-d2 / 0.05) + 0.45 * pow(abs(dot(lperp, sdir)), 6.0)) * (0.35 + 0.65 * mix(thk, 1.0 - nrm.z, back));
  ice += room * 1.2 * pow(max(0.0, nrm.y), 3.0);
  // ice is translucent: the light behind scatters through it, most at the thin edges
  ice = ice * 0.8 + col * (0.3 + 0.35 * (1.0 - nrm.z) * (1.0 - 0.5 * thk));
  float ia = cov * (0.3 + 0.7 * sqrt(thk));
  col = mix(col, ice, max(ia, halo * 0.3));
  col += (sunC * 1.6 + room * 3.0 + A * 0.6) * glint * C2.w * 1.6;
  // ---- breath: wet glass while warm, then a fog of droplets, then it freezes again
  float fog = hm.y * smoothstep(1.1, 0.2, hm.x);
  vec3 fogC = tint * (A * 1.0 + OB * 0.4 + room * 1.8) + sunC * 0.2 * exp(-d2 / 0.08);
  col = mix(col, fogC, clamp(fog * 0.9, 0.0, 0.88));
  col *= qsh;
  // the glass itself: scratches and a dust film catch the low sun where the pane is still clear
  float scr = 1.0 - smoothstep(0.62, 0.95, texture(uM, uv).r);
  float dst = uC[11].y * smoothstep(0.35, 0.8, texture(uN, uv * 2.1 + 0.6).r * 0.7 + texture(uN, uv * 9.0).g * 0.3);
  float gsun = exp(-d2 / 0.05) * C1.z;
  col += (sunC * (1.4 * gsun + 0.12) + A * 0.25) * scr * (1.0 - cov) * 0.55 + (sunC * (0.5 * gsun + 0.04) + A * 0.06) * dst * (1.0 - 0.6 * haze);
  // ---- a ridge of solid ice and frozen run-off beads along the bottom rail of the sash
  if (C0.w < 0.5) {
    float bx = uv.x * 46.0, bi = floor(bx), bf = fract(bx) - 0.5, r1 = h21(vec2(bi, 3.1));
    float hgt = 0.005 + 0.006 * texture(uN, vec2(uv.x * 2.3, 0.21)).r + 0.008 * r1 * r1 * sqrt(max(0.0, 1.0 - 4.0 * bf * bf)) * step(0.45, r1);
    hgt *= smoothstep(0.6, 0.2, hm.x);
    float dy = uv.y - 0.1;
    float rid = smoothstep(hgt + 1.5 / S, hgt - 1.5 / S, dy);
    vec3 rc = tint * (A * 1.2 + room * 2.4 + OB * 0.35) * (0.7 + 0.45 * smoothstep(0.0, hgt, dy)) + sunC * 0.12 * exp(-d2 / 0.1);
    rc += (A * 0.6 + sunC * 0.3) * smoothstep(0.003, 0.0, abs(dy - hgt + 0.002)) * 0.6;
    col = mix(col, rc, rid * 0.93);
  }
  // ---- the frame, lit by the room and by the window's own light
  vec4 F = texture(uF, uv);
  vec3 frl = room * C3.w + uC[12].rgb;
  col = col * (1.0 - F.a) + F.rgb * frl;
  // ---- the candle (rare): its wax is baked into the frame layer; here only the wick and the live flame
  if (C5.z > 0.5) {
    vec2 cp = uv - vec2(C5.x, 0.0);
    float lip = C5.y - 0.04;
    float wick = smoothstep(0.0012, 0.0004, abs(cp.x - 0.001)) * step(lip, cp.y) * step(cp.y, lip + 0.012);
    col = mix(col, vec3(0.02), wick);
    vec2 fq = (uv - vec2(C5.x + 0.0015 * sin(t * 11.0) * C5.w, lip + 0.02)) / vec2(0.0075, 0.019);
    float fd = length(vec2(fq.x * (1.0 + 0.7 * max(0.0, fq.y)), fq.y));
    float fb = smoothstep(1.0, 0.25, fd) * C5.w;
    vec3 fc = mix(vec3(0.25, 0.35, 1.0) * 0.5, vec3(1.0, 0.55, 0.16), smoothstep(-0.9, -0.3, fq.y));
    col += fc * fb * 2.2 + vec3(1.0, 0.92, 0.75) * smoothstep(0.55, 0.0, length(fq - vec2(0.0, 0.15))) * 2.4 * C5.w;
    col += vec3(1.0, 0.5, 0.15) * 0.1 * C5.w * exp(-dot(uv - C5.xy, uv - C5.xy) / 0.003);
  }
  // ---- exposure, vignette, grain
  col *= 1.0 - C2.w * 0.0;
  col *= 1.0 - 0.35 * dot(uv - 0.5, uv - 0.5) * 2.0;
  col = 1.0 - exp(-max(col, 0.0) * uC[13].x);
  col = pow(col, vec3(0.4545));
  col += (h21(gl_FragCoord.xy + fract(t * 7.13) * 511.0) - 0.5) * 0.02;
  o = vec4(col, 1.0);
}`;function t0(o,t,c){const r=(h,n)=>{const p=o.createShader(h);return o.shaderSource(p,n),o.compileShader(p),p},v=o.createProgram(),b=r(o.VERTEX_SHADER,t),m=r(o.FRAGMENT_SHADER,c);return o.attachShader(v,b),o.attachShader(v,m),o.linkProgram(v),{p:v,u:{},sh:[b,m],ok:!1}}const qt={step:{uS:0,uM:1,uH:2},init:{uM:0},heat:{uH:0},prep:{uS:0},sum:{uS:0},blur:{uA:0},comp:{uS:0,uP:1,uH:2,uO:3,uOB:4,uF:5,uN:6,uM:7}};function L0(o,t,c){const r=t[c];if(r.ok)return r;if(!o.getProgramParameter(r.p,o.LINK_STATUS))throw new Error("080 link "+c+": "+o.getProgramInfoLog(r.p)+" "+o.getShaderInfoLog(r.sh[0])+" "+o.getShaderInfoLog(r.sh[1]));const v=o.getProgramParameter(r.p,o.ACTIVE_UNIFORMS);for(let m=0;m<v;m++){const h=o.getActiveUniform(r.p,m);r.u[h.name.replace(/\[0\]$/,"")]=o.getUniformLocation(r.p,h.name)}o.useProgram(r.p);const b=qt[c]||(c.startsWith("out")||c.startsWith("frame")||c==="candle"?{uN:0}:{});for(const m in b)r.u[m]&&o.uniform1i(r.u[m],b[m]);return r.ok=!0,r}function q(o,t,c,r,v,b,m,h,n,p){const d=o.createTexture();return o.bindTexture(o.TEXTURE_2D,d),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage2D(o.TEXTURE_2D,0,r,t,c,0,v,b,m||null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,h),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,h),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,n||o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,p||n||o.CLAMP_TO_EDGE),d}function e0(o,t){const c=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,c),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0),c}function Kt(o){let t=it.get(o);if(t)return t;o.getExtension("EXT_color_buffer_float"),o.getExtension("EXT_color_buffer_half_float"),t={step:t0(o,Z,St),init:t0(o,Z,Tt),heat:t0(o,Z,_t),prep:t0(o,Z,zt),blur:t0(o,Z,Lt),comp:t0(o,Z,Ht),vao:o.createVertexArray()};const c=128,r=(h,n,p,d)=>{h=(h%p+p)%p,n=(n%p+p)%p;let l=h*374761393+n*668265263+d*2246822519|0;return l=Math.imul(l^l>>>13,1274126177),l^=l>>>16,(l>>>0)/4294967296},v=(h,n,p,d)=>{const l=Math.floor(h),P=Math.floor(n),O=h-l,T=n-P,I=O*O*(3-2*O),B=T*T*(3-2*T),K=r(l,P,p,d),c0=r(l+1,P,p,d),l0=r(l,P+1,p,d),y0=r(l+1,P+1,p,d);return K+(c0-K)*I+(l0-K)*B+(K-c0-l0+y0)*I*B},b=(h,n,p,d,l)=>{let P=0,O=.5,T=p,I=0;for(let B=0;B<d;B++)P+=O*v(h*T/c,n*T/c,T,l+B),I+=O,O*=.5,T*=2;return P/I},m=new Uint8Array(c*c*4);for(let h=0;h<c;h++)for(let n=0;n<c;n++){const p=(h*c+n)*4;m[p]=b(n,h,4,4,11)*255,m[p+1]=b(n,h,8,3,23)*255,m[p+2]=v(n*32/c,h*32/c,32,41)*255,m[p+3]=b(n,h,16,2,77)*255}for(let h=0;h<4;h++){let n=255,p=0;for(let d=h;d<m.length;d+=4)n=Math.min(n,m[d]),p=Math.max(p,m[d]);for(let d=h;d<m.length;d+=4)m[d]=(m[d]-n)*255/Math.max(1,p-n)}return t.noise=q(o,c,c,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,m,o.LINEAR,o.REPEAT),it.set(o,t),t}function w0(o,t,c){return t[c]||(t[c]=t0(o,Z,c==="sum"?Ot:c==="candle"?Dt:c.startsWith("out")?Gt(+c.slice(3)):It(+c.slice(5)))),t[c]}function Qt(o,t,c,r,v){if(o===0)return Math.min(Math.min(c-r[0],t-r[1]),Math.min(Math.abs(t-r[2])-r[3],Math.abs(c-v[0])-r[3]));if(o===1){const b=Math.min(c-r[0],r[1]-t),m=t/v[0]+c/v[1]+v[2],h=t/v[0]-c/v[1]+v[3],n=Math.hypot(1/v[0],1/v[1]),p=Math.min(Math.abs(m-Math.floor(m+.5)),Math.abs(h-Math.floor(h+.5)))/n-r[2];return Math.min(b,p)}if(o===2){const b=Math.abs(t-r[0])-r[2]+v[0],m=Math.abs(c-r[1])-r[3]+v[0];return-(Math.min(Math.max(b,m),0)+Math.hypot(Math.max(b,0),Math.max(m,0))-v[0])}return v[0]-Math.hypot(t-r[0],c-r[1])}nt.add({num:80,name:"Frost Window",fam:"Worlds",recipe:"A close look through an old window on a freezing morning, with frost ferns growing across the glass. Needles reach out from the frame and branch off at ice's own angles. The frost changes every mint. Hold to breathe on the glass and clear a patch, drag a finger to melt a line or a shape, or tap to plant a speck that new frost grows from.",interactive:"Hold to breathe on the glass: a round patch melts clear, fogs, then refreezes into new frost. Drag a fingertip to melt a clear line, a peephole or a shape; the needles grow back into it. Tap to plant a speck that new frost grows from.",music:!0,gl:!0,fps:30,seed:0,make(o){const t=o.gl,c=o.size,r=Kt(t),v=e=>parseInt(o.hash.slice(2+e*8,10+e*8),16)>>>0,b=e=>{let a=e>>>0;return()=>{a=a+2654435769>>>0;let s=a;return s=Math.imul(s^s>>>16,2246822507),s=Math.imul(s^s>>>13,3266489909),s^=s>>>16,(s>>>0)/4294967296}},m=b(v(0)^Math.imul(80,625341585)),h=b(v(1)^v(2)),n=b(v(3)^v(4)),p=b(v(5)^v(6)^v(7)),d=e=>{let a=0;for(const f of e)a+=f[1];let s=m()*a;for(const f of e)if(s-=f[1],s<=0)return f[0];return e[e.length-1][0]},l=(e,a,s)=>e+(a-e)*(s||h)(),P=["Ferny dendrites","Needle frost","Star flowers","Feather frost"],O=["Old sash, wavy glass","Cottage casement, lead lines","Train window","Round porthole"],T=["Snowy garden","Frozen lake","Village street at dawn","Pine forest"],I=["Blue pre-dawn","Golden sunrise","Bright noon on snow"],B=["None","Robin on the frame","Candle on the sill","Heart in the frost"];let K=d([[P[0],42],[P[1],24],[P[2],24],[P[3],10]]),c0=d([[O[0],40],[O[1],30],[O[2],20],[O[3],10]]),l0=d([[T[0],32],[T[1],24],[T[2],24],[T[3],20]]),y0=d([[I[0],32],[I[1],44],[I[2],24]]),U0=d([["Still air",62],["Snowing",38]]),o0=d([["Clean",45],["Scratched",30],["Dusty",25]]),a0=d([[B[0],76],[B[1],0],[B[2],12],[B[3],12]]);o.home&&(K=P[0],c0=O[0],l0=T[0],y0=I[1],U0="Snowing",o0="Scratched",a0=B[0]);const X=b(v(7)^v(1)^1592592384);let P0=X()*100<66?"Grown overnight":"Just creeping in from the edges";o.home&&(P0="Grown overnight"),a0===B[3]&&K===P[1]&&(a0=B[2]),a0===B[3]&&P0!=="Grown overnight"&&(a0=B[2]);const ut=P.indexOf(K),M=O.indexOf(c0),j=T.indexOf(l0),W=I.indexOf(y0),I0=B.indexOf(a0),Xt=U0==="Snowing";o.trait("Frost",K),o.trait("Window",c0),o.trait("Outside",l0),o.trait("Light",y0),o.trait("Weather",U0),o.trait("Glass",o0),o.trait("Something rare",a0),o.trait("Stage",P0);const y=[{L:[1,4,3],mg:2,both:.8,gdec:.6,bias:.5,curl:.008,wig:.03,cth:.55,kr:.006,sink:.6,specks:6,edgeP:.9,w:[1,.62,.24],pre:560},{L:[9,6,3],mg:1,both:.5,gdec:.35,bias:.1,curl:.002,wig:.01,cth:.62,kr:.006,sink:.6,specks:45,edgeP:.45,sheaf:1.1,w:[.5,.32,.24],pre:300},{L:[2,4,2],mg:1,both:1,gdec:.8,bias:0,curl:0,wig:.02,cth:.6,kr:.003,sink:.95,c0:.9,rate:2,specks:12,edgeP:.012,w:[.8,.5,.26],pre:150},{L:[2,4,2],mg:1,both:.95,gdec:.5,bias:.8,curl:.02,wig:.02,cth:.55,kr:.006,sink:.6,specks:2,edgeP:.05,w:[1.05,.6,.24],pre:560}][ut];let f0=[0,0,0,0],s0=[0,0,0,0];M===0?(f0=[.1,.055,5,.016],s0=[5,0,0,0]):M===1?(f0=[.1,.925,.0075,0],s0=[l(.2,.26),l(.3,.38),h(),h()]):M===2?(f0=[.68,.52,.6,.38],s0=[.14,0,0,0]):(f0=[.5,.53,0,0],s0=[.37,0,0,0]);const r0=new Float32Array(u*u);for(let e=0;e<u;e++)for(let a=0;a<u;a++)r0[e*u+a]=Qt(M,(a+.5)/u,(e+.5)/u,f0,s0);const G=new Uint8Array(u*u*4),ht=(e,a)=>{let s=Math.imul(e,374761393)+Math.imul(a,668265263)+v(2)|0;return s=Math.imul(s^s>>>13,1274126177),s^=s>>>16,(s>>>0)/4294967296},pt=(e,a)=>(e=(e%D+D)%D,(a?128:1)+Math.round(e/D*126)%127);for(let e=0;e<u;e++)for(let a=0;a<u;a++){const s=e*u+a,f=r0[s];if(!(f<=0)&&(G[s*4]=255,f<1.3/u)){const x=r0[e*u+Math.min(u-1,a+1)]-r0[e*u+Math.max(0,a-1)],F=r0[Math.min(u-1,e+1)*u+a]-r0[Math.max(0,e-1)*u+a],z=Math.floor(a/9),A=Math.floor(e/9);ht(a*7+1,e*13+5)<y.edgeP&&(G[s*4+1]=Math.floor(ht(z,A)*255),G[s*4+2]=pt(Math.atan2(F,x),!1),G[s*4+3]=85)}}const vt=(e,a,s)=>e>=0&&a>=0&&e<u&&a<u&&r0[a*u+e]>s/u,jt=y.specks+(o0==="Dusty"?ut===2?8:40:0);for(let e=0;e<jt;e++){const a=Math.floor(h()*u),s=Math.floor(h()*u);if(!vt(a,s,3))continue;const f=s*u+a;G[f*4+1]=Math.floor(h()*255),G[f*4+2]=0,G[f*4+3]=255}const Wt=o0==="Scratched"?4:o0==="Clean"?1:0;for(let e=0;e<Wt;e++){const a=h()*u,s=h()*u*.8+u*.15,f=h()*Math.PI,x=l(.15,.45)*u,F=h(),z=pt(f+Math.PI/2,!0);for(let A=0;A<x;A+=.5){const Q=Math.floor(a+Math.cos(f)*A),d0=Math.floor(s+Math.sin(f)*A+6*Math.sin(A/x*3)),B0=vt(Q,d0,2);if(B0&&o0==="Scratched"&&(G[(d0*u+Q)*4]=150),!B0||h()<.88)continue;const rt=d0*u+Q;G[rt*4+1]=Math.floor((F+A*.004)%1*255),G[rt*4+2]=z,G[rt*4+3]=170}}const D0=t.RGBA16F,H0=t.HALF_FLOAT,q0=q(t,u,u,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,G,t.LINEAR),b0=[0,1].map(()=>q(t,u,u,D0,t.RGBA,H0,null,t.NEAREST)),mt=b0.map(e=>e0(t,e)),N0=[0,1].map(()=>q(t,x0,x0,D0,t.RGBA,H0,null,t.LINEAR)),K0=N0.map(e=>e0(t,e)),S0=u/2,dt=q(t,S0,S0,D0,t.RGBA,H0,null,t.LINEAR),Yt=e0(t,dt),T0=256,g0=128,Q0=q(t,T0,T0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),Vt=e0(t,Q0),xt=q(t,g0,g0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),$t=e0(t,xt),Y=Math.min(1024,c),wt=q(t,Y,Y,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR),yt=e0(t,wt);for(const e of K0)t.bindFramebuffer(t.FRAMEBUFFER,e),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);let V=0,u0=0;const k=(e,a)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,a)},n0=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(r.vao)},C={};w0(t,r,"out"+j),w0(t,r,"frame"+M),I0===2&&w0(t,r,"candle"),w0(t,r,"sum"),t.flush();for(const e of["step","init","heat","prep","blur","comp","out"+j,"frame"+M])C[e]=L0(t,r,e);const w=[{top:[.012,.022,.07],hor:[.2,.13,.22],snow:[.075,.09,.16],dark:[.008,.01,.022],warm:[1,.5,.17],lamps:1,sun:[1,.42,.22],sunK:.35,room:[.05,.034,.022],tint:[.78,.88,1.05],exp:2.1,hy:.42},{top:[.1,.17,.36],hor:[.95,.55,.28],snow:[.5,.42,.4],dark:[.03,.022,.03],warm:[1,.55,.2],lamps:.5,sun:[1.5,.85,.42],sunK:1,room:[.03,.028,.035],tint:[.88,.92,1],exp:1.5,hy:.4},{top:[.16,.34,.8],hor:[.58,.72,.95],snow:[1,1,1.02],dark:[.05,.06,.08],warm:[1,.7,.4],lamps:0,sun:[1.4,1.3,1.15],sunK:1,room:[.07,.07,.08],tint:[.9,.94,1],exp:1.15,hy:.38}][W],h0=w.hy+l(-.03,.03,n),N=new Float32Array(20*4);N.set([...w.top,n()],0),N.set([...w.hor,h0],4),N.set([...w.snow,W],8),N.set([...w.dark,j===2?.05:.03],12),N.set([...w.warm,w.lamps],16),N[23]=l(.03,.06,n),N.set([4,3,6,3],76);let L=[l(.25,.45,n),0];if(j===0){for(let e=0;e<4;e++)N.set([n(),h0-.06+n()*.04,l(.35,.6,n),l(.006,.014,n)],24+e*4);for(let e=0;e<3;e++)N.set([n(),l(.14,.26,n),l(.08,.16,n),l(.04,.07,n)],40+e*4);L=[l(.28,.5,n),h0-l(.02,.08,n)],N.set([L[0],L[1],0,0],52)}else if(j===1)L=[l(.25,.75,n),.33],N.set([L[0],L[1],0,0],52);else if(j===2){let e=n();for(let a=0;a<6;a++){const s=l(.05,.09,n);N.set([e%1,s,l(.1,.2,n),l(.05,.09,n)],24+a*4),e+=s*2+l(.02,.08,n)}L=[l(.2,.5,n),h0-.05],N.set([L[0],L[1],n(),0],52),N[56]=n()}else L=[l(.25,.5,n),.26],N.set([L[0],L[1],0,0],52);n0(),t.bindFramebuffer(t.FRAMEBUFFER,Vt),t.viewport(0,0,T0,T0),t.useProgram(C["out"+j].p),k(0,r.noise),t.uniform4fv(C["out"+j].u.uO,N),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,$t),t.viewport(0,0,g0,g0),t.useProgram(C.blur.p),k(0,Q0),t.uniform4f(C.blur.u.uQ,4,8,1.6/g0,0),t.drawArrays(t.TRIANGLES,0,3);const F0=new Float32Array(6*4);F0.set(f0,0),F0.set(s0,4),F0[8]=1/Y;const Jt=M===0?[[.78,.76,.7],[.62,.68,.66],[.55,.6,.66]][Math.floor(h()*3)]:M===1?[.16,.09,.045]:M===2?[[.5,.52,.42],[.6,.55,.45],[.36,.42,.44]][Math.floor(h()*3)]:[.72,.72,.68];F0.set(Jt,12),t.bindFramebuffer(t.FRAMEBUFFER,yt),t.viewport(0,0,Y,Y),t.useProgram(C["frame"+M].p),k(0,r.noise),t.uniform4fv(C["frame"+M].u.uF,F0),t.drawArrays(t.TRIANGLES,0,3);const g=new Float32Array(10*4);g.set([y.rate||1,y.cth,y.kr,y.sink],0),g.set([y.L[0],y.L[1],y.L[2],y.mg],4),g.set([y.both,y.gdec,y.bias,y.curl],8),g.set([y.wig,.0025,0,y.c0||1],12),g.set([.25,.02,.0012,.14],16),g.set([u,8,3,4],36);let bt=0;t.bindFramebuffer(t.FRAMEBUFFER,mt[0]),t.viewport(0,0,u,u),t.useProgram(C.init.p),k(0,q0),t.drawArrays(t.TRIANGLES,0,3),V=0;function gt(e){if(!(e<=0)){n0(),t.useProgram(C.step.p),t.viewport(0,0,u,u),k(1,q0),k(2,N0[u0]),t.activeTexture(t.TEXTURE0);for(let a=0;a<e;a++)g[14]=bt+1,t.uniform4fv(C.step.u.uP,g),t.bindFramebuffer(t.FRAMEBUFFER,mt[1-V]),t.bindTexture(t.TEXTURE_2D,b0[V]),t.drawArrays(t.TRIANGLES,0,3),V=1-V,bt++,g[30]=0}}const E0=new Float32Array(66*4);let p0=0;const $=(e,a,s,f,x,F,z)=>{p0>=32||(E0.set([e,a,s,f],8+p0*8),E0.set([x,F,z,0],12+p0*8),p0++)};function Ft(e){n0(),E0.set([.08,Math.exp(-e/1.6),x0,p0],0),E0.set([Math.exp(-e/9),Math.exp(-e/3.5),Math.exp(-e/25),0],4),t.useProgram(C.heat.p),t.viewport(0,0,x0,x0),t.bindFramebuffer(t.FRAMEBUFFER,K0[1-u0]),k(0,N0[u0]),t.uniform4fv(C.heat.u.uQ,E0),t.drawArrays(t.TRIANGLES,0,3),u0=1-u0,p0=0}function Et(){n0(),t.viewport(0,0,S0,S0),t.bindFramebuffer(t.FRAMEBUFFER,Yt),t.useProgram(C.prep.p),k(0,b0[V]),t.uniform4f(C.prep.u.uQ,2,2.5,u,0),t.drawArrays(t.TRIANGLES,0,3)}const X0=150;let _0=o.home?.32*X0:l(.2,.55,p)*X0;const Ct=o.home?.6:l(.3,.75,p),E={amt:0,x:Ct,y:0,r:.03},z0=[p()*D,p()*D,p()*D,p()*D],Mt=e=>24*Math.sin(e*.0157+z0[0])+14*Math.sin(e*.0263+z0[1]),O0=_0,Zt=Mt(O0);function j0(e){const s=((e+Mt(e)-Zt)/X0%1+1)%1,f=R0((s-.05)/.45,0,1),x=R0((s-.8)/.15,0,1),F=f*f*(3-2*f)*(1-x*x*(3-2*x)),z=Math.sin((e-O0)*.041+z0[2])+Math.sin((e-O0)*.067+z0[3]),A=1-.45*R0((z-.9)/.8,0,1)*R0((e-O0-15)/20,0,1);E.amt=(.25+.75*F*A)*w.sunK,W===0?(E.y=h0-.1+.07*F,E.r=.035):W===1?(E.y=h0-.04+.26*F,E.r=.03):(E.y=1.02+.05*F,E.r=.05),E.x=Ct+.04*F}const W0=()=>{g.set([E.x,Math.min(E.y,.95),.32,W===0?0:.11*Math.max(0,E.amt-.45)*(W===2?1.4:1)],20),g[32]=.6,g[33]=lt,g[34]=.0025,g[35]=y.sheaf||0},U=I0===2?{x:M===3?.84:.83,y:M===0?.135:.12}:null;if(U){g.set([U.x,U.y+.12,.17,.5],24),w0(t,r,"candle");const e=L0(t,r,"candle");n0(),t.bindFramebuffer(t.FRAMEBUFFER,yt),t.viewport(0,0,Y,Y),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.useProgram(e.p),k(0,r.noise),t.uniform4fv(e.u.uF,new Float32Array([U.x,U.y,1.2/Y,0,0,0,0,0])),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND)}j0(0),E.amt=0,W0(),g[23]=0;const Y0=y.pre,te=Math.floor(Y0*.96),ee=X()<.5?-1:1,_=P0==="Just creeping in from the edges"?{x:.5+ee*l(.03,.08,X),y:l(.5,.58,X),r:(M===3?.62:1)*l(.29,.35,X),h:.8}:null,oe=_?[0,1,2].map(e=>{const a=(e/3+X()*.3)*D,s=_.r*l(.45,.75,X);return[_.x+Math.cos(a)*s,_.y+Math.sin(a)*s,_.r*l(.35,.55,X)]}):[];_&&(g[19]=0);for(let e=0;e<Y0;e+=10){if(_){$(_.x-.06,_.y,_.x+.06,_.y,_.r*.85,_.h,0);for(const a of oe)$(a[0],a[1],a[0],a[1],a[2],_.h,0)}if(I0===3&&e===Math.floor(te/10)*10){const a=.5+l(-.06,.06),s=.55+l(-.05,.05),f=.0105;let x=0,F=0;for(let A=0;A<=30;A++){const Q=A/30*D,d0=a+f*16*Math.pow(Math.sin(Q),3),B0=s+f*(13*Math.cos(Q)-5*Math.cos(2*Q)-2*Math.cos(3*Q)-Math.cos(4*Q));A&&$(x,F,d0,B0,.02,4,0),x=d0,F=B0}$(a,s-17*f,a+.003,s-17*f-l(.04,.07),.009,4,0);const z=h()<.5?-1:1;$(a+z*11*f,s-9*f,a+z*11*f,s-9*f-l(.03,.05),.008,4,0)}Ft(10/ct),gt(Math.min(10,Y0-e))}if(j0(_0),W0(),g[2]=y.kr*2.5,g[19]=.14,_)for(const e of K0)t.bindFramebuffer(t.FRAMEBUFFER,e),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);const i={down:!1,t:0,x0:0,y0:0,x:0,y:0,px:0,py:0,mode:""};let i0=0,C0=0,H=null,ae=0;const v0=o.sound;function se(e){const a=o.input,s=a.taps?a.taps():[],f=a.x,x=1-a.y;if(a.down)i.down?(i.t+=e,i.px=i.x,i.py=i.y,i.x=f,i.y=x,i.mode===""&&Math.hypot(f-i.x0,x-i.y0)>.02&&(i.mode="drag",i.px=i.x0,i.py=i.y0),i.mode===""&&i.t>.28&&(i.mode="hold"),i.mode==="drag"&&($(i.px,i.py,i.x,i.y,.02,5,.06),ae+=Math.hypot(i.x-i.px,i.y-i.py))):(i.down=!0,i.t=0,i.x0=i.x=i.px=f,i.y0=i.y=i.py=x,i.mode="");else if(i.down)i.down=!1,i.mode===""&&(H={x:i.x0,y:i.y0});else if(s.length){const z=s[s.length-1];H={x:z.x,y:1-z.y}}const F=i.down&&i.mode==="hold";i0=F?Math.min(1,i0+e*1.5):Math.max(0,i0-e*2.5),F&&$(i.x,i.y,i.x,i.y,.07+.06*i0,.22*i0,.09*i0)}let M0=null,k0=null,kt=null,At=null,G0=null,V0=0,$0=null,re=0;const A0=22050,J0=new Float32Array(8192);let Z0=0,tt=0,et=0,Bt=0,ue=0,J=(v(7)|1)>>>0,ot=l(8,20,p),R=null,at=0;const ne=()=>(J^=J<<13,J^=J>>>17,J^=J<<5,J>>>=0,J/2147483648-1);function ie(e){if(v0.on){if(k0||(C.sum=L0(t,r,"sum"),kt=q(t,8,8,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST),At=e0(t,kt),k0=t.createBuffer(),t.bindBuffer(t.PIXEL_PACK_BUFFER,k0),t.bufferData(t.PIXEL_PACK_BUFFER,8*8*4,t.STREAM_READ),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),G0=new Uint8Array(256)),M0){const a=t.clientWaitSync(M0,0,0);(a===t.ALREADY_SIGNALED||a===t.CONDITION_SATISFIED)&&(t.deleteSync(M0),M0=null,t.bindBuffer(t.PIXEL_PACK_BUFFER,k0),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,G0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),ce());return}V0-=e,!(V0>0)&&(V0=.2,n0(),t.bindFramebuffer(t.FRAMEBUFFER,At),t.viewport(0,0,8,8),t.useProgram(C.sum.p),k(0,b0[V]),t.uniform4f(C.sum.u.uQ,u/8,16,0,0),t.drawArrays(t.TRIANGLES,0,3),t.bindBuffer(t.PIXEL_PACK_BUFFER,k0),t.readPixels(0,0,8,8,t.RGBA,t.UNSIGNED_BYTE,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),M0=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0))}}const m0=[];function ce(){const e=new Float32Array(64);for(let a=0;a<64;a++)e[a]=G0[a*4]/255+G0[a*4+1]/65025;if($0)for(let a=0;a<64;a++){const s=e[a]-$0[a];s>.002&&(re+=s*60,m0.length<24&&m0.push({at:p()*.2,x:(a%8+.5)/8,v:Math.min(1,s*40)}))}$0=e}function le(e){if(!v0.on||e<=0)return;for(let s=m0.length-1;s>=0;s--)if(m0[s].at-=e,m0[s].at<=0){const f=m0.splice(s,1)[0];v0.hit("click",.05+.12*f.v*p(),{pan:(f.x-.5)*1.4}),p()<.3&&v0.note(96+Math.floor(p()*8),{dur:.05,vel:.02,wave:"sine",pan:(f.x-.5)*1.4,attack:.001})}ot-=e,ot<=0&&!R&&(R={t:0,len:l(.5,1.2,p),f0:l(18,34,p),ph:0,r1:0,r2:0},ot=l(18,45,p));const a=Math.min(J0.length,Math.round(e*A0));for(let s=0;s<a;s++){const f=ne();Z0+=(f-Z0)*.02,tt+=(Z0-tt)*.02,et+=(f-et)*.12;let x=tt*1.4+et*i0*.55;if(i.mode==="drag"&&i.down&&(at+=1/A0,Bt+=(f-Bt)*.35,x+=Math.sin(at*2*Math.PI*(900+300*Math.sin(at*7)))*.025*Math.min(1,Math.hypot(i.x-i.px,i.y-i.py)*60)),R){R.t+=1/A0;const F=R.t/R.len,z=R.f0*(1+.6*Math.sin(F*5));R.ph+=z/A0;let A=0;R.ph>=1&&(R.ph-=1,A=1),R.r1+=A*.8-R.r1*.02-R.r2*.05,R.r2+=R.r1*.05,x+=R.r2*.25*Math.sin(Math.PI*Math.min(1,F)),F>=1&&(R=null)}J0[s]=x}v0.pcm(J0.subarray(0,a),A0,{vel:.3})}const S=new Float32Array(20*4),fe=M===2?.006:0;let st=n();function Rt(e){S.fill(0),S.set([c,e,u,M],0),S.set([E.x,E.y,E.amt,E.r],4),S.set([w.sun[0],w.sun[1],w.sun[2],1],8),S.set([w.room[0],w.room[1],w.room[2],1],12),S.set([w.tint[0],w.tint[1],w.tint[2],.7],16);const a=U?.85+.1*Math.sin(e*9.1)+.05*Math.sin(e*23.7+1):0;S.set([U?U.x:0,U?U.y:0,U?1:0,a],20),S.set([st,M===0?.022:.003,Xt?1:0,.5],24),S.set(M===1?s0:[1,1,0,0],32),S[44]=y.mg,S[45]=o0==="Dusty"?1:0,S.set([y.w[0],y.w[1],y.w[2],W===0?.985:W===2?.93:.95],36);const s=.7+.3*E.amt,f=[0,1,2].map(x=>(w.hor[x]*.4+w.snow[x]*.4+w.top[x]*.2)*s);S.set([f[0],f[1],f[2],0],56),S.set([f[0]*.25+w.sun[0]*.03*E.amt,f[1]*.25+w.sun[1]*.03*E.amt,f[2]*.25+w.sun[2]*.03*E.amt,0],48),S.set([w.exp,1,2,1/lt],52),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,c,c),n0(),t.useProgram(C.comp.p),k(0,b0[V]),k(1,dt),k(2,N0[u0]),k(3,Q0),k(4,xt),k(5,wt),k(6,r.noise),k(7,q0),t.uniform4fv(C.comp.u.uC,S),t.drawArrays(t.TRIANGLES,0,3)}return Et(),Rt(0),(e,a)=>{a=Math.min(Math.max(a,0),.2),se(a),_0+=a,j0(_0),W0(),U&&(g[27]=.5),st=(st+fe*a)%1,H&&(g.set([H.x*u,H.y*u,1,p()*Nt],28),$(H.x,H.y,H.x,H.y,.035,0,.04),H=null,v0.note(93,{dur:.6,vel:.04,wave:"sine",attack:.002})),Ft(a),C0+=a*ct;let s=Math.min(Pt,Math.floor(C0));C0-=s,C0>2&&(C0=2),g[30]>.5&&s===0&&(s=1),gt(s),Et(),Rt(e),ie(a),le(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
