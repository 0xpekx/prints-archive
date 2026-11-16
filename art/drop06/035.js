// Aurora Lake: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/035.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(it){it&&function(){"use strict";const ct=new WeakMap,D=Math.PI*2,K=(t,e,x)=>t<e?e:t>x?x:t,P0=(t,e,x)=>t+(e-t)*x,g0=(t,e,x)=>{const k=K((x-t)/(e-t),0,1);return k*k*(3-2*k)},ut=.9,lt=.31,ft=Math.atan((1-2*lt)/ut),Bt=Math.sin(ft),Ct=Math.cos(ft),L0=1.6,Ut=66*Math.PI/180,Se=1/Math.tan(Ut),xe=1/(2*6371),M0=300,Q0=14,ht=2.9,$0=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Z0=`
uniform vec4 uCam;
vec3 viewDir(vec2 uv) { vec2 p = uv * 2.0 - 1.0; return normalize(vec3(p.x, uCam.x * uCam.z - p.y * uCam.y, uCam.x * uCam.y + p.y * uCam.z)); }
vec3 toCam(vec3 P) { return vec3(P.x, P.y * uCam.z + P.z * uCam.y, -P.y * uCam.y + P.z * uCam.z); }
`,Gt=`
vec3 tonemap(vec3 x) { x = max(x, 0.0); vec3 a = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14); return pow(clamp(a, 0.0, 1.0), vec3(1.0 / 2.2)); }
`,It=`#version 300 es
precision highp float;
precision highp int;
out vec4 o;
float hh(vec2 i, float P, float sd) { i = mod(i, P); uvec2 q = uvec2(i); uint h = q.x * 1597334677u ^ q.y * 3812015801u ^ uint(sd * 97.0) * 2654435769u; h = h * 747796405u + 2891336453u; h ^= h >> 16; h *= 2246822519u; h ^= h >> 13; return float(h) / 4294967295.0; }
float vn(vec2 x, float P, float sd) { vec2 i = floor(x), f = fract(x), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hh(i, P, sd), hh(i + vec2(1.0, 0.0), P, sd), u.x), mix(hh(i + vec2(0.0, 1.0), P, sd), hh(i + vec2(1.0), P, sd), u.x), u.y); }
float fbm(vec2 uv, float P, float oct, float sd) { float t = 0.0, a = 0.5, s = 0.0; for (int k = 0; k < 5; k++) { if (float(k) >= oct) break; t += a * vn(uv * P, P, sd + float(k) * 3.0); s += a; a *= 0.5; P *= 2.0; } return t / s; }
float edges(vec2 uv, float P, float sd) { vec2 x = uv * P, i = floor(x), f = fract(x); float d1 = 9.0, d2 = 9.0;
  for (int y = -1; y <= 1; y++) for (int xx = -1; xx <= 1; xx++) { vec2 g = vec2(float(xx), float(y)); vec2 c = i + g; vec2 pt = g + vec2(hh(c, P, sd), hh(c, P, sd + 5.0)) - f; float d = dot(pt, pt); if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d; }
  return sqrt(d2) - sqrt(d1); }
float st(float v) { return clamp((v - 0.5) * 2.1 + 0.5, 0.0, 1.0); }
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5) / 256.0;
  o = vec4(st(fbm(uv, 8.0, 4.0, 1.0)), st(fbm(uv, 32.0, 3.0, 2.0)), vn(uv * 64.0, 64.0, 3.0) * 0.6 + vn(uv * 128.0, 128.0, 4.0) * 0.4, clamp(edges(uv, 16.0, 5.0) * 1.3, 0.0, 1.0));
}`,De=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
${Z0}
uniform vec4 uPx;    // pixel angle (rad), seed, size, shore kind
uniform vec4 uSkyT;  // zenith colour, star gain
uniform vec4 uSkyH;  // horizon colour, milky way gain
uniform vec4 uMoon;  // direction to the moon, angular radius
uniform vec4 uMoonL; // moonlight on surfaces, phase angle
uniform vec4 uMoonV; // disc brightness, glow, terminator roll, airglow
uniform vec4 uAmb;   // skylight on up-facing surfaces, ice kind
uniform vec4 uGeo;   // shore geometry
uniform vec4 uGeo2;  // far shore distance, tree tooth height, tooth density, forest flag
uniform int uMode;
uniform ivec4 uLoop; // 72, 6, 2, 3: loop bounds (uniform, so the compiler cannot unroll them)
uint hu(uvec2 q) { uint h = q.x * 1597334677u ^ q.y * 3812015801u; h = h * 747796405u + 2891336453u; h ^= h >> 16; h *= 2246822519u; h ^= h >> 13; return h; }
float h21(vec2 p) { return float(hu(uvec2(ivec2(floor(p)) + 65536))) / 4294967295.0; }
float ridge(float x, float f, float row) {
  float a = textureLod(uN, vec2(x * f, row), 0.0).r;
  float b = textureLod(uN, vec2(x * f * 1.9 + 0.13, row + 0.31), 0.0).r;
  float c = textureLod(uN, vec2(x * f * 5.0 + 0.29, row + 0.57), 0.0).g;
  return a * 0.66 + (1.0 - abs(b * 2.0 - 1.0)) * 0.26 + c * 0.08;
}
vec3 lit(vec3 n, vec3 alb) { return alb * (uAmb.rgb * (0.45 + 0.55 * max(n.z, 0.0)) + uMoonL.rgb * max(dot(n, uMoon.xyz), 0.0)); }
`,qt=De+`
uniform vec4 uML[3]; // mountain layers: base elevation, height, frequency, haze
float layerEl(float az, vec4 M, float row) { float r = ridge(az, M.z, row); return M.x + M.y * r * (0.4 + 0.8 * r); }
vec3 skyCol(vec3 d, vec2 uv) {
  float e = max(asin(clamp(d.z, -1.0, 1.0)), 0.0);
  vec3 c = mix(uSkyH.rgb, uSkyT.rgb, pow(clamp(e / 1.15, 0.0, 1.0), 0.5));
  c += vec3(0.006, 0.012, 0.004) * exp(-pow((e - 0.15) / 0.1, 2.0)) * uMoonV.w;
  // milky way: a faint band with dust lanes
  vec2 mq = uv - vec2(0.5, 0.62);
  float md = abs(dot(mq, normalize(vec2(0.55, -1.0))) + 0.08 * (uPx.y - 0.5));
  float mwn = texture(uN, uv * vec2(1.7, 2.3) + uPx.y).r, lane = texture(uN, uv * vec2(3.1, 4.3) + uPx.y * 1.7).g;
  float mw = exp(-md * md / 0.02) * (0.55 + 0.6 * mwn) * (1.0 - 0.45 * smoothstep(0.5, 0.75, lane) * exp(-md * md / 0.004));
  c += vec3(0.005, 0.0052, 0.006) * mw * uSkyH.w;
  // stars
  float ext = exp(-0.1 / max(d.z + 0.02, 0.012));
  for (int g = 0; g < uLoop.z; g++) {
    float cells = g == 0 ? 64.0 : (g == 1 ? 23.0 : 170.0);
    vec2 sp = uv * cells, ci = floor(sp) + float(g) * 311.0;
    float pres = h21(ci + 11.0) + 0.42 * (texture(uN, uv * 3.1 + uPx.y).r - 0.5);
    vec2 jo = 0.08 + 0.84 * vec2(h21(ci + 23.0), h21(ci + 37.0));
    vec2 dpx = (fract(sp) - jo) * (uPx.z / cells);
    float b = h21(ci + 53.0);
    float flux = g == 0 ? (0.004 + 0.05 * b * b * b + 0.3 * pow(b, 12.0)) * step(0.5 - 0.3 * mw, pres) : (g == 1 ? (0.02 + 0.22 * b * b * b + 1.9 * pow(b, 9.0)) * step(0.8, pres) : (0.0025 + 0.012 * b * b) * step(0.62 - 0.45 * mw, pres));
    float sig = max(0.5, 0.62 * uPx.z / 1000.0) * (1.0 + (g == 0 ? 0.15 : 0.5) * b);
    float st = flux * (exp(-dot(dpx, dpx) / (2.0 * sig * sig)) + (g == 1 ? 0.045 * b * exp(-dot(dpx, dpx) / (26.0 * sig * sig)) : 0.0));
    vec3 tint = mix(vec3(1.0, 0.66, 0.4), vec3(0.66, 0.8, 1.0), smoothstep(0.12, 0.62, h21(ci + 71.0)));
    c += tint * st * uSkyT.w * ext;
  }
  // moon glow and disc
  float cm = dot(d, uMoon.xyz);
  float ang = sqrt(max(2.0 - 2.0 * cm, 0.0));
  c += vec3(0.75, 0.82, 1.0) * uMoonV.y * (0.5 * exp(-ang / 0.05) + 0.2 * exp(-ang / 0.3));
  if (uMoonV.x > 0.0 && ang < uMoon.w * 1.6) {
    vec3 ax = normalize(cross(uMoon.xyz, vec3(0.0, 0.0, 1.0))), ay = cross(ax, uMoon.xyz);
    vec2 q = vec2(dot(d, ax), dot(d, ay)) / uMoon.w;
    float r = length(q);
    float disc = 1.0 - smoothstep(1.0 - 1.5 * uPx.x / uMoon.w, 1.0 + 0.5 * uPx.x / uMoon.w, r);
    vec3 n = vec3(q, sqrt(max(1.0 - r * r, 0.0)));
    float ph = uMoonL.w, rl = uMoonV.z;
    vec3 sun = vec3(sin(ph) * cos(rl), sin(ph) * sin(rl), cos(ph));
    float l = smoothstep(-0.03, 0.08, dot(n, sun));
    float mare = 0.8 + 0.2 * texture(uN, q * 0.12 + 0.37).r;
    c += vec3(1.0, 0.96, 0.88) * disc * uMoonV.x * (l * mare + 0.004 * (1.0 - l));
  }
  return c;
}
float mh(vec2 q) { float a = texture(uN, q).g; float b = texture(uN, q * vec2(1.9, 0.7) + 0.37).r; return a * 0.45 + (1.0 - abs(b * 2.0 - 1.0)) * 0.55; }
vec3 mtn(float az, float el, float elR, vec4 M, float row, out float rec) {
  vec2 q = vec2(az * 2.6, el * 4.2) * M.z * 1.4 + vec2(row * 2.1, row);
  float e = 0.004;
  float h0 = mh(q), hx = mh(q + vec2(e, 0.0)), hy = mh(q + vec2(0.0, e));
  vec2 g = vec2(hx - h0, hy - h0) / e;
  vec3 n = normalize(vec3(-g.x * 0.06, -1.0, 0.75 - g.y * 0.04));
  float depth = clamp((elR - el) / max(M.y, 1e-3), 0.0, 1.0);
  float sn = smoothstep(0.2, 0.8, n.z + 0.12 * (texture(uN, q * 2.0).r - 0.5) + 0.16 * (1.0 - depth));
  vec3 alb = mix(vec3(0.05, 0.052, 0.058), vec3(0.3, 0.33, 0.39), sn);
  vec3 col = lit(n, alb);
  float hz = clamp(M.w * (0.75 + 0.5 * depth) + 0.1, 0.0, 1.0);
  col = mix(col, uSkyH.rgb * 0.85, hz);
  rec = sn * 0.35 * (1.0 - hz) * (0.1 + 0.9 * max(dot(n, normalize(vec3(0.0, 0.55, 0.83))), 0.0));
  return col;
}
float teeth(float az) {
  float x = az * uGeo2.z, ci = floor(x), best = 0.0;
  for (int kk = 0; kk < uLoop.w; kk++) {
    float c = ci + float(kk - 1);
    float hr = h21(vec2(c, 7.0)), w = 0.45 + 0.5 * h21(vec2(c, 9.0)), off = (h21(vec2(c, 13.0)) - 0.5) * 0.6;
    float tri = max(0.0, 1.0 - abs(x - c - 0.5 - off) / w);
    best = max(best, (0.3 + 0.7 * hr) * pow(tri, 1.4));
  }
  return best * uGeo2.y;
}
vec3 forest(vec2 uv, float az, float el, vec4 M, out float rec) {
  float sp = texture(uN, vec2(az * 60.0, el * 90.0)).b, sp2 = texture(uN, vec2(az * 14.0, el * 30.0) + 0.3).r;
  float snow = smoothstep(0.5, 0.8, sp * 0.7 + sp2 * 0.5);
  vec3 col = mix(vec3(0.008, 0.01, 0.009), vec3(0.5, 0.52, 0.56), snow * 0.3) * (uAmb.rgb * 1.3 + uMoonL.rgb * 0.55);
  col = mix(col, uSkyH.rgb * 0.85, M.w);
  rec = snow * 0.35 * (1.0 - M.w);
  return col;
}
void main() {
  vec2 uv = vUv;
  vec3 d = viewDir(uv);
  float az = atan(d.x, d.y), el = asin(clamp(d.z, -1.0, 1.0)), px = uPx.x;
  vec3 col = skyCol(d, uv); float rec = 0.0, sky = 1.0;
  for (int k = 0; k < uLoop.w; k++) {
    vec4 M = uML[k];
    if (M.y <= 0.0) continue;
    float row = 0.13 + 0.29 * float(k);
    float e = layerEl(az, M, row);
    bool fo = k == 2 && uGeo2.w > 0.5;
    if (k == 2 && uGeo2.y > 0.0) e += teeth(az);
    float aw = px * (k == 0 ? 1.7 : 1.15);
    float cv = smoothstep(-aw, aw, e - el);
    if (cv <= 0.0) continue;
    float r;
    vec3 m = fo ? forest(uv, az, el, M, r) : mtn(az, el, e, M, row, r);
    col = mix(col, m, cv); rec = mix(rec, r, cv); sky *= 1.0 - cv;
  }
  if (uMode == 0) o = vec4(col, 1.0); else o = vec4(0.0, rec, sky, 0.0);
}`,Ht=De+`
uniform vec4 uLampW; // warm light position (m), strength
uniform vec4 uRidge; // pressure ridges: y0, y1, height, half width
float ridgeH(vec2 p) {
  float best = 0.0;
  for (int j = 0; j < uLoop.z; j++) {
    float y0 = j == 0 ? uRidge.x : uRidge.y;
    float yc = y0 + 4.0 * sin(p.x * 0.045 + float(j) * 2.0 + uPx.y * 6.0) + 1.5 * sin(p.x * 0.13 + 1.0);
    float prof = max(0.0, 1.0 - abs(p.y - yc) / uRidge.w);
    if (prof <= 0.0) continue;
    float an = float(j) * 0.7 + 0.45, ca = cos(an), sa = sin(an);
    vec2 sc = vec2(ca * p.x - sa * p.y, sa * p.x + ca * p.y) * vec2(1.6, 2.1) + float(j) * 7.3;
    sc.x += 0.5 * floor(sc.y);
    vec2 cell = floor(sc), f = fract(sc) - 0.5;
    float r1 = h21(cell + 17.0), r2 = h21(cell + 5.0), r3 = h21(cell + 9.0);
    float hgt = uRidge.z * sqrt(prof) * (0.25 + 0.8 * r1) + (f.x * (r2 - 0.5) + f.y * (r3 - 0.5)) * 0.6;
    best = max(best, hgt * step(0.2, r1 + prof * 0.6));
  }
  return best;
}
void main() {
  vec2 uv = vUv;
  vec3 d = viewDir(uv);
  float sd = uPx.y, shore = uPx.w, px = uPx.x;
  float el = asin(clamp(d.z, -1.0, 1.0));
  vec3 col = vec3(0.0); float mir = 0.0, rec = 0.0, lamp = 0.0;
  // the lake and the shore
  float elF = -uCam.w / (shore > 2.5 ? 6000.0 : uGeo2.x);
  float gc = d.z < 0.0 && el < elF ? 1.0 : 0.0;
  vec2 G = vec2(0.0); float tG = 1e9, gz = 0.0;
  bool hitRidge = false; vec3 rn = vec3(0.0, 0.0, 1.0);
  if (uAmb.w > 1.5 && d.y > 0.05) {
    float tA = max((min(uRidge.x, uRidge.y) - uRidge.w - 6.0) / d.y, 0.3);
    float tB = (max(uRidge.x, uRidge.y) + uRidge.w + 6.0) / d.y;
    if (d.z < 0.0) tB = min(tB, uCam.w / -d.z);
    float dt = (tB - tA) / float(uLoop.x), tp = tA;
    for (int i = 0; i < uLoop.x; i++) {
      float t = tA + dt * float(i);
      vec3 p = vec3(d.xy * t, uCam.w + d.z * t);
      if (p.z < ridgeH(p.xy)) {
        float lo = tp, hi = t;
        for (int k = 0; k < uLoop.y; k++) { float m = 0.5 * (lo + hi); vec3 q = vec3(d.xy * m, uCam.w + d.z * m); if (q.z < ridgeH(q.xy)) hi = m; else lo = m; }
        tG = hi; G = d.xy * hi; gz = uCam.w + d.z * hi; hitRidge = true;
        break;
      }
      tp = t;
    }
    if (hitRidge) {
      // five heights from one call site (each call site is compiled again on Windows): forward differences, and backward
      // ones for where the forward step fell off a block
      float h0 = 0.0, gx = 0.0, gy = 0.0, gx2 = 0.0, gy2 = 0.0;
      for (int k = 0; k < uLoop.w + 2; k++) {
        float e = k < 3 ? 0.04 : -0.03;
        float hv = ridgeH(G + (k == 0 ? vec2(0.0) : ((k == 1 || k == 3) ? vec2(e, 0.0) : vec2(0.0, e))));
        if (k == 0) h0 = hv; else if (k == 1) gx = (hv - h0) / e; else if (k == 2) gy = (hv - h0) / e; else if (k == 3) gx2 = (hv - h0) / e; else gy2 = (hv - h0) / e;
      }
      if (abs(gx) > 6.0 || abs(gy) > 6.0) { gx = gx2; gy = gy2; }
      rn = normalize(vec3(-clamp(gx, -5.0, 5.0), -clamp(gy, -5.0, 5.0), 1.0));
      gc = 1.0;
    }
  }
  if (gc > 0.0 && !hitRidge) { tG = uCam.w / max(-d.z, 1e-5); G = d.xy * tG; }
  if (gc < 0.5) discard;
  // drifts (worked out here, in one flat loop outside the branch below, which keeps the Windows compile short): tongues
  // of wind-packed snow at two sizes, blunt to windward with a long tail to leeward, every one pointing the same way.
  // dm is 0.6 on a drift's spine, 0 at its edge, -0.4 on open ice, and 0 (no say) far off where drifts are specks.
  vec2 Gr = vec2(G.x * 0.94 + G.y * 0.34, -G.x * 0.34 + G.y * 0.94);
  float wob = textureLod(uN, Gr * vec2(0.03, 0.11) + 0.7, 0.0).r - 0.5, dm = -0.4;
  for (int i = 0; i < uLoop.w * uLoop.y; i++) {
    int k = i / 9, j = i - 9 * k, ix = j / 3;
    vec2 q = Gr * (k == 0 ? vec2(0.055, 0.26) : vec2(0.19, 0.85)) + float(k) * 17.3 + sd * 31.0;
    q.y += wob * (k == 0 ? 0.5 : 0.9);
    vec2 c = floor(q) + vec2(float(ix - 2), float(j - 3 * ix - 1));
    uint hq = hu(uvec2(ivec2(c) + 65536));
    float r1 = float(hq & 1023u) / 1023.0, r2 = float((hq >> 10) & 1023u) / 1023.0, r3 = float(hq >> 20) / 4095.0;
    vec2 p = q - c - vec2(r1, 0.2 + 0.6 * r2);
    float t = p.x / (0.75 + 0.9 * r3) + 0.1;
    float wid = (0.2 + 0.25 * r2) * smoothstep(0.0, 0.2, t) * pow(clamp(1.0 - t, 0.0, 1.0), 1.4);
    dm = max(dm, max(0.6 - abs(p.y) / max(wid, 1e-3), -0.4) * (k == 0 ? smoothstep(170.0, 70.0, tG) : smoothstep(30.0, 10.0, tG)));
  }
  if (gc > 0.0) {
    bool land = false;
    float shoreD = 1e3;
    if (shore < 0.5) { float xs = uGeo.y + uGeo.z * G.y + 7.0 * (texture(uN, vec2(G.y * 0.0035, 0.61 + sd)).r - 0.5); shoreD = uGeo.x * G.x - xs; land = shoreD > 0.0; }
    if (shore > 2.5) { float yf = uGeo2.x + 8.0 * (texture(uN, vec2(G.x * 0.004 + sd, 0.27)).r - 0.5); shoreD = G.y - yf; land = shoreD > 0.0; }
    if (G.y > uGeo2.x && shore < 2.5) land = true;
    float ik = uAmb.w;
    float w1 = texture(uN, Gr * vec2(0.0035, 0.014) + sd).r * 0.62 + texture(uN, Gr * vec2(0.016, 0.055) + sd * 1.3).r * 0.26 + texture(uN, G * vec2(0.07, 0.22) + 0.2).g * 0.12;
    float thr = ik < 0.5 ? 0.6 : (ik < 1.5 ? 0.36 : 0.56);
    float streak = texture(uN, Gr * vec2(0.006, 0.12) + sd * 2.0).g;
    // where the snow thins out it breaks into drifts and sastrugi, and the ice between them is swept bare
    float sv = (w1 + 0.05 * smoothstep(0.55, 0.8, streak) - thr) / 0.1 + 1.7 * dm;
    float sw = 0.12 + 2.0 * tG * tG * px / uCam.w;
    float snow = smoothstep(-sw, sw, sv);
    float thin = land || hitRidge ? 1.0 : mix(0.6, 1.0, smoothstep(0.0, 1.6, sv));
    if (land || hitRidge) snow = 1.0;
    // snow relief: sastrugi along the wind, drifts on land
    vec2 bq = land ? G * vec2(0.11, 0.2) : Gr * vec2(0.06, 0.5);
    float b0 = texture(uN, bq + 0.5).g, bx = texture(uN, bq + vec2(0.012, 0.0) + 0.5).g, by = texture(uN, bq + vec2(0.0, 0.012) + 0.5).g;
    float bk = (land ? 0.6 : 0.9) * snow;
    vec2 bg = vec2(bx - b0, by - b0) / 0.012 * bk * 0.08;
    if (!land) bg = vec2(bg.x * 0.94 - bg.y * 0.34, bg.x * 0.34 + bg.y * 0.94);
    vec3 n = normalize(vec3(-bg, 1.0));
    if (hitRidge) n = rn;
    vec3 gcol; float gm = 0.0, gr = 0.0, gl = 0.0;
    float sAlb = 0.82;
    if (shore > 2.5 && land) { float sh = smoothstep(0.62, 0.78, texture(uN, G * 0.23 + sd).b) * smoothstep(0.4, 0.6, texture(uN, G * 0.031).r); sAlb *= 1.0 - 0.85 * sh; }
    float rocks = 0.0;
    if (abs(shoreD) < 2.5) { rocks = smoothstep(2.5, 0.3, abs(shoreD)) * smoothstep(0.45, 0.6, texture(uN, G * 0.4).b); sAlb *= 1.0 - 0.8 * rocks; }
    vec3 snowC = lit(n, vec3(sAlb, sAlb * 1.01, sAlb * 1.04)) * thin;
    float glint = step(0.985, texture(uN, G * 2.7 + 0.31).b) * smoothstep(22.0, 3.0, tG) * snow;
    snowC += glint * (uAmb.rgb * 6.0 + uMoonL.rgb * 3.0);
    // ice: black, with a few long pressure cracks, a web of fine ones near you and bubbles under it
    vec2 Gc = G + 9.0 * (texture(uN, G * 0.004 + sd).rg - 0.5);
    float e0 = texture(uN, Gc * 0.0021 + sd * 2.0).a, e1 = texture(uN, G * 0.0105 + sd * 2.0).a, e2 = texture(uN, G * 0.037 + sd * 3.0).a;
    float crack = ((1.0 - smoothstep(0.0, 0.007, e0)) * 0.85 + (1.0 - smoothstep(0.0, 0.035, e0)) * 0.2) * smoothstep(260.0, 30.0, tG)
                + (1.0 - smoothstep(0.0, 0.022, e1)) * 0.28 * smoothstep(70.0, 8.0, tG) + (1.0 - smoothstep(0.0, 0.02, e2)) * 0.13 * smoothstep(16.0, 3.0, tG);
    float bub = step(0.955, texture(uN, G * 0.8 + 0.17).b) * smoothstep(14.0, 2.0, tG);
    vec3 iceC = vec3(0.003, 0.0045, 0.006) + lit(vec3(0.0, 0.0, 1.0), vec3(0.32, 0.36, 0.4)) * clamp(crack + bub * 0.6, 0.0, 1.0);
    float cosI = clamp(-d.z, 0.0, 1.0);
    float fres = 0.018 + 0.982 * pow(1.0 - cosI, 5.0);
    float smooth1 = ik < 0.5 ? 1.0 : (ik < 1.5 ? 0.75 : 0.9);
    gm = (1.0 - snow) * fres * smooth1 * (1.0 - 0.7 * clamp(crack, 0.0, 1.0));
    if (hitRidge) { float slabI = 1.0 - smoothstep(0.55, 0.85, n.z); snowC = mix(snowC, lit(n, vec3(0.05, 0.08, 0.09)), slabI); gm = slabI * 0.12; }
    gcol = mix(iceC, snowC, snow);
    gr = snow * sAlb * (0.2 + 0.8 * max(dot(n, normalize(vec3(0.0, 0.55, 0.83))), 0.0)) + (1.0 - snow) * (0.02 + 0.35 * clamp(crack + bub * 0.6, 0.0, 1.0));
    // warm light pool
    if (uLampW.w > 0.0) {
      vec2 dl = G - uLampW.xy; float r2 = dot(dl, dl);
      float pool = uLampW.w * exp(-r2 / 26.0) * 0.11 / (1.0 + r2 * 0.06) * (0.4 + 0.6 * snow);
      gcol += vec3(1.0, 0.56, 0.22) * pool * sAlb; gl = pool * sAlb;
    }
    float hz = 1.0 - exp(-tG / 7000.0);
    gcol = mix(gcol, uSkyH.rgb * 0.8, hz); gr *= 1.0 - hz; gm *= 1.0 - hz;
    col = gcol; rec = gr; mir = gm; lamp = gl;
  }
  if (uMode == 0) o = vec4(col, 1.0); else o = vec4(mir, rec, 0.0, lamp);
}`,Vt=De+`
uniform vec4 uFall;  // waterfall x, half width, -, -
float wh(vec2 w) {
  float big = texture(uN, w * vec2(0.0009, 0.0005) + uPx.y * 1.7).r;
  float rib = 1.0 - abs(texture(uN, w * vec2(0.0032, 0.0008) + uPx.y).g * 2.0 - 1.0);
  float rib2 = 1.0 - abs(texture(uN, w * vec2(0.008, 0.0016) + 0.3).r * 2.0 - 1.0);
  return big * 0.55 + rib * 0.33 + rib2 * 0.12;
}
vec3 rockWall(vec2 w0, float sc, vec3 n0, vec3 tA, float t, out float rec) {
  vec2 w = w0 * sc;
  float e = 3.0;
  float h0 = wh(w), hx = wh(w + vec2(e, 0.0)), hz = wh(w + vec2(0.0, e));
  vec3 n = normalize(n0 - tA * (hx - h0) / e * 70.0 - vec3(0.0, 0.0, 1.0) * (hz - h0) / e * 30.0);
  float ledge = texture(uN, w * vec2(0.003, 0.01) + 0.7).r;
  float gully = 1.0 - (h0 - 0.25) * 1.6;
  float sn = smoothstep(0.42, 0.66, gully * 0.55 + ledge * 0.35 + 0.3 * max(n.z, 0.0) + 0.25 * smoothstep(70.0 / sc, 0.0, w0.y));
  vec3 alb = mix(vec3(0.028, 0.027, 0.03) * (0.75 + 0.5 * texture(uN, w * 0.006).g), vec3(0.46, 0.49, 0.55), sn);
  vec3 col = lit(n, alb);
  rec = sn * 0.45 * (0.15 + 0.85 * max(dot(n, normalize(vec3(0.0, 0.55, 0.83))), 0.0));
  float fog = 1.0 - exp(-t / 9000.0);
  col = mix(col, uSkyH.rgb * 0.85, fog); rec *= 1.0 - fog;
  return col;
}
void main() {
  vec2 uv = vUv;
  vec3 d = viewDir(uv);
  float sd = uPx.y, shore = uPx.w, px = uPx.x;
  float tSolid = 1e9, cvo = 0.0, rec = 0.0;
  vec3 col = vec3(0.0);
  for (int s = 0; s < uLoop.z; s++) {
    float sg = s == 0 ? -1.0 : 1.0, W0, lean, den, k = uGeo.z;
    if (shore < 1.5) { if (s == 1) break; lean = uGeo.z; W0 = uGeo.y; den = d.y - lean * d.z; }
    else { lean = 0.62; W0 = s == 0 ? uGeo.x : uGeo.y; den = sg * d.x - k * d.y - lean * d.z; }
    if (den <= 1e-4) continue;
    float tw = (W0 + lean * uCam.w) / den;
    if (tw > tSolid) continue;
    vec3 p = vec3(d.xy * tw, uCam.w + d.z * tw);
    float along = shore < 1.5 ? p.x : p.y;
    float top = shore < 1.5 ? uGeo.w * (0.45 + 0.75 * (textureLod(uN, vec2(p.x / 900.0 + sd, 0.83), 0.0).r * 0.75 + textureLod(uN, vec2(p.x / 140.0 + sd, 0.27), 0.0).g * 0.25)) * smoothstep(uFall.z, uFall.z + 60.0, uGeo.x * p.x)
                            : uGeo.w * (0.3 + 0.75 * pow(ridge(p.y / 3800.0 + sg * 0.21 + sd, 1.0, 0.41 + 0.2 * float(s)), 1.2) + 0.12 * textureLod(uN, vec2(p.y / 700.0 + sd, 0.6 + 0.2 * float(s)), 0.0).g) * (0.5 + 0.5 * smoothstep(12000.0, 1200.0, p.y));
    float cv = smoothstep(-px * tw, px * tw, top - p.z) * step(0.0, p.z);
    if (cv <= 0.0) continue;
    vec3 n0 = shore < 1.5 ? normalize(vec3(0.0, -1.0, lean)) : normalize(vec3(-sg, k, lean));
    vec3 tA = shore < 1.5 ? vec3(1.0, 0.0, 0.0) : normalize(vec3(sg * k, 1.0, 0.0));
    float r;
    vec3 wc = rockWall(vec2(along, p.z), shore < 1.5 ? 6.0 : 1.0, n0, tA, tw, r);
    if (shore < 1.5) {
      // the frozen waterfall: a column of blue-white ice in a gully
      float fx = p.x - uFall.x - 1.5 * sin(p.z * 0.12);
      float fw = uFall.y * (0.55 + 0.6 * smoothstep(top * 0.9, 0.0, p.z)) * (0.85 + 0.3 * texture(uN, vec2(p.z * 0.02, 0.4)).r);
      float fall = (1.0 - smoothstep(fw * 0.75, fw, abs(fx))) * smoothstep(top * 0.97, top * 0.85, p.z);
      if (fall > 0.0) {
        float c1 = texture(uN, vec2(fx * 0.35, p.z * 0.025)).r, c2 = texture(uN, vec2(fx * 1.1, p.z * 0.06)).g;
        float cyl = fx / fw;
        vec3 nI = normalize(vec3(cyl * 0.9, -1.0, 0.15));
        vec3 ice = lit(nI, vec3(0.42, 0.58, 0.68) * (0.45 + 0.9 * c1 * c2 * 2.0)) + vec3(0.004, 0.01, 0.014) * (1.0 - abs(cyl));
        wc = mix(wc, ice, fall); r = mix(r, 0.75 * (0.6 + 0.4 * c1), fall);
      }
    }
    col = mix(col, wc, cv); rec = mix(rec, r, cv); cvo = cvo + cv * (1.0 - cvo); tSolid = tw;
  }
  if (cvo < 0.003) discard;
  if (uMode == 0) o = vec4(col, cvo); else o = vec4(0.0, rec, 0.0, cvo);
}`,Wt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
layout(location = 0) in vec2 aQ;
layout(location = 1) in vec4 aT;
layout(location = 2) in vec4 aT2;
${Z0}
out vec2 vQ; flat out vec4 vT2; flat out vec3 vR; flat out vec3 vF; out float vDist;
void main() {
  float r = length(aT.xy);
  vec2 dir = aT.xy / r, rg = vec2(dir.y, -dir.x);
  vec3 P = vec3(aT.xy + rg * aQ.x * aT.w * 0.5, aQ.y * aT.z - 0.5 - uCam.w);
  P.xy += rg * aT2.y * aQ.y * aQ.y * aT.z;
  vec3 C = toCam(P);
  gl_Position = vec4(uCam.x * C.x, uCam.x * C.z, 0.0, C.y);
  vQ = aQ; vT2 = aT2; vR = vec3(rg, 0.0); vF = vec3(-dir, 0.0); vDist = r;
}`,Xt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
in vec2 vQ; flat in vec4 vT2; flat in vec3 vR; flat in vec3 vF; in float vDist;
uniform sampler2D uN;
uniform vec4 uAmb; uniform vec4 uMoon; uniform vec4 uMoonL; uniform vec4 uSkyH;
uniform int uMode;
out vec4 o;
void main() {
  float u = vQ.x, v = vQ.y, sd = vT2.x;
  float au = abs(u), sg = u < 0.0 ? 0.37 : 0.0;
  float nb = texture(uN, vec2(sd * 0.73, v * 0.6 + sd)).r;
  // a narrow spire: whorls of boughs, each widest at its drooping tip and tucked in under the one above, no two the
  // same length and the two sides different
  float env = pow(clamp(1.0 - v, 0.0, 1.0), 0.8 + 0.4 * nb) * (0.82 + 0.18 * smoothstep(0.0, 0.14, v));
  float NT = 10.0 + 7.0 * fract(sd * 7.31);
  float tq = v * NT + 0.62 * au / max(env, 0.1) + nb * 1.5 + sg * 2.7;
  float ti = floor(tq), tier = tq - ti;
  float len = 0.55 + 0.6 * texture(uN, vec2(ti * 0.137 + sd * 5.1 + sg, sd * 0.5)).b;
  float lump = texture(uN, vec2(u * 0.2 + sd * 3.1, v * 1.6 + sd * 1.9)).g;
  float lump2 = texture(uN, vec2(u * 0.5 + sd * 1.3, v * 4.0 + sd)).b;
  float tw = 0.44 + 0.56 * len * smoothstep(0.0, 0.12, tier) * smoothstep(1.0, 0.2, tier);
  float R = env * tw * (0.84 + 0.3 * lump + 0.12 * lump2);
  R = max(R, 0.04 * (1.0 - smoothstep(0.93, 1.0, v)));
  float aa = fwidth(u) * 1.2 + 0.003;
  float cov = 1.0 - smoothstep(R - aa, R + aa, au);
  float trunk = (1.0 - smoothstep(0.06, 0.06 + aa, au)) * step(v, 0.08);
  cov = max(cov, trunk);
  if (cov < 0.003) discard;
  float nx = clamp(u / max(R, 0.03), -1.0, 1.0);
  // snow lies on the top of a bough, not under it, and not every bough has kept its load
  float load = smoothstep(0.32, 0.62, texture(uN, vec2(ti * 0.31 + sd * 2.3 + sg, 0.77)).r + 0.3 * (vT2.z - 0.6));
  float sn = smoothstep(0.28, 0.55, tier + 0.3 * (lump2 - 0.5)) * load;
  sn = clamp(sn * (0.55 + 0.6 * vT2.z) * (0.8 + 0.4 * lump), 0.0, 1.0) * (1.0 - trunk);
  vec3 n = normalize(vR * nx * 0.8 + vF * sqrt(max(1.0 - nx * nx, 0.0)) * 0.55 + vec3(0.0, 0.0, mix(-0.3, 1.0, sn)));
  vec3 light = uAmb.rgb * (0.4 + 0.6 * max(n.z, 0.0)) + uMoonL.rgb * max(dot(n, uMoon.xyz), 0.0);
  vec3 alb = mix(vec3(0.007, 0.01, 0.009), vec3(0.3, 0.33, 0.39), sn);
  vec3 col = alb * light;
  float rec = sn * 0.55 * (0.3 + 0.7 * max(n.z, 0.0));
  float hz = 1.0 - exp(-vDist / 7000.0);
  col = mix(col, uSkyH.rgb * 0.8, hz);
  if (uMode == 0) o = vec4(col, cov); else o = vec4(0.0, rec, 0.0, cov);
}`,Ot=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
layout(location = 0) in vec3 aP;
layout(location = 1) in vec3 aNm;
layout(location = 2) in vec3 aM;
${Z0}
out vec3 vN; out vec3 vM; out vec3 vW; out vec3 vV;
void main() { vec3 C = toCam(aP - vec3(0.0, 0.0, uCam.w)); gl_Position = vec4(uCam.x * C.x, uCam.x * C.z, 0.0, C.y); vN = aNm; vM = aM; vW = aP; vV = vec3(0.0, 0.0, uCam.w) - aP; }`,Kt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
in vec3 vN; in vec3 vM; in vec3 vW; in vec3 vV;
uniform sampler2D uN;
uniform vec4 uAmb; uniform vec4 uMoon; uniform vec4 uMoonL; uniform vec4 uLampW;
uniform int uMode;
out vec4 o;
void main() {
  float m = vM.x; vec2 q = vM.yz; vec3 n = normalize(vN);
  vec3 light = uAmb.rgb * (0.5 + 0.5 * max(n.z, 0.0)) + uMoonL.rgb * max(dot(n, uMoon.xyz), 0.0);
  vec3 col; float rec = 0.0, lamp = 0.0;
  vec3 warm = vec3(1.0, 0.56, 0.22) * uLampW.w;
  if (m < 0.5) {
    float lg = fract(vW.z / 0.23);
    float groove = smoothstep(0.0, 0.2, lg) * smoothstep(1.0, 0.75, lg);
    col = vec3(0.075, 0.05, 0.034) * (0.45 + 0.55 * groove) * (0.75 + 0.5 * texture(uN, q * vec2(0.25, 1.5)).g) * light;
    col += warm * 0.004 * exp(-dot(vW.xy - uLampW.xy, vW.xy - uLampW.xy) / 3.0);
  } else if (m < 1.5) {
    float b = texture(uN, q * 0.35).g;
    col = vec3(0.56, 0.59, 0.66) * (0.85 + 0.25 * b) * (0.62 + 0.38 * max(n.z, 0.0)) * light;
    rec = 0.7 * (0.35 + 0.65 * max(n.z, 0.0));
  } else if (m < 2.5) {
    float fr = step(0.1, q.x) * step(q.x, 0.9) * step(0.1, q.y) * step(q.y, 0.9);
    float mull = (1.0 - step(abs(q.x - 0.5), 0.035)) * (1.0 - step(abs(q.y - 0.55), 0.035));
    float g = fr * mull;
    vec3 inside = warm * (0.55 + 0.45 * smoothstep(0.9, 0.2, length(q - vec2(0.45, 0.3)))) * 0.9;
    col = mix(vec3(0.05, 0.035, 0.025) * light, inside, g); lamp = g;
  } else if (m < 3.5) {
    col = vec3(0.025, 0.023, 0.022) * light;
  } else if (m < 4.5) {
    float seam = smoothstep(0.0, 0.08, abs(fract(q.x * 11.0) - 0.5));
    float glow = 0.12 + 0.88 * pow(clamp(1.0 - q.y, 0.0, 1.0), 2.2);
    float facet = 0.6 + 0.4 * abs(dot(normalize(vec3(normalize(vW.xy - uLampW.xy), 0.7)), normalize(vV)));
    float door = (1.0 - smoothstep(0.012, 0.02, abs(q.x - 0.54))) * step(q.y, 0.55);
    col = vec3(1.0, 0.62, 0.32) * uLampW.w * 0.2 * glow * facet * (0.7 + 0.3 * seam) * (1.0 - 0.6 * door) + vec3(0.5, 0.45, 0.4) * light * 0.25;
    lamp = 0.2 * glow * facet;
    rec = 0.2;
  } else {
    float pl = fract(q.x / 0.17);
    float gap = smoothstep(0.0, 0.1, pl) * smoothstep(1.0, 0.9, pl);
    col = vec3(0.24, 0.04, 0.03) * (0.55 + 0.45 * gap) * (0.8 + 0.4 * texture(uN, q * vec2(0.4, 0.1)).g) * light;
  }
  if (uMode == 0) o = vec4(col, 1.0); else o = vec4(0.0, rec, 0.0, lamp);
}`,jt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
layout(location = 0) in vec2 aP;
${Z0}
uniform sampler2D uN;
uniform vec4 uB0;     // D, L, brightness, kind
uniform vec4 uB1;     // bow, tilt, travel phase, how much of the sheet is rayed
uniform vec4 uMy[3];  // fold modes in y: amplitude (km), wavenumber, phase
uniform vec4 uMx[2];  // curl modes in x
uniform vec4 uH;      // bottom km, top km, cot dip, curvature
uniform vec4 uSA[6];  // surges: centre s, width, gain, ray boost
uniform vec4 uSB[6];  // surges: pull (km), fold (km), fold k, ray shift
uniform vec4 uRay;    // ray amount, rays per s, ray offset, time slice
uniform vec4 uPat;    // patchiness, pulse, time, seed
uniform vec4 uProf;   // base km, green scale, red, pink
out float vH; out float vRU; out float vI; out float vS; out float vLos; out float vBo; out vec3 vExt;
const float TAU = 6.2831853;
// the baseline at s and its tangent dq (per unit s) from the bow, the folds and the surges, but not the small ripples: the
// pleat a fold makes when it is seen edge-on comes from this smooth tangent, so ripples never turn into wires
vec2 base(float s, out vec2 dq, out float g, out float bo, out float rs) {
  float c = 2.0 * s - 1.0;
  float ea = TAU * 2.9 * s + uMy[1].w, env = 0.28 + 0.96 * (0.5 + 0.5 * sin(ea)), denv = 0.48 * TAU * 2.9 * cos(ea);   // folds gather in one stretch of the sheet and leave the next plain
  float a0 = TAU * uMy[0].y * s + uMy[0].z, a1 = TAU * uMy[1].y * s + uMy[1].z, b0 = TAU * uMx[0].y * s + uMx[0].z;
  vec2 q = vec2(c * uB0.y + uMx[0].x * env * sin(b0) + uMx[1].x * sin(TAU * uMx[1].y * s + uMx[1].z),
                uB0.x + uB1.x * c * c + uB1.y * c + uMy[0].x * sin(a0) + uMy[1].x * env * sin(a1) + uMy[2].x * sin(TAU * uMy[2].y * s + uMy[2].z));
  dq = vec2(2.0 * uB0.y + uMx[0].x * (denv * sin(b0) + env * TAU * uMx[0].y * cos(b0)),
            4.0 * uB1.x * c + 2.0 * uB1.y + uMy[0].x * TAU * uMy[0].y * cos(a0) + uMy[1].x * (denv * sin(a1) + env * TAU * uMy[1].y * cos(a1)));
  g = 0.0; bo = 0.0; rs = 0.0;
  float pul = 0.0, dpul = 0.0, ws = 0.0;
  for (int k = 0; k < 6; k++) {
    float ds = (s - uSA[k].x) / uSA[k].y;
    float e = exp(-ds * ds), sw = uSB[k].x + uSB[k].y * sin(ds * uSB[k].z);
    pul += e * sw;
    dpul += e * (uSB[k].y * uSB[k].z * cos(ds * uSB[k].z) - 2.0 * ds * sw) / uSA[k].y;
    ws += e;
    g += e * uSA[k].z; bo += e * uSA[k].w; rs += e * uSB[k].w;
  }
  float wn = 1.0 / (1.0 + 0.7 * max(ws - 1.0, 0.0));
  q.y += pul * wn; dq.y += dpul * wn;
  return q;
}
void main() {
  float s = aP.x, g, bo, rs;
  vec2 dq;
  vec2 b0 = base(s, dq, g, bo, rs);
  vec2 T = dq / max(length(dq), 1e-3);
  vec3 P, N;
  float h;
  if (uB0.w > 2.5) {
    // pulsating patches: a thin horizontal layer near 100 km
    float ac = mix(uH.x, uH.y, aP.y);
    h = ac;
    P = vec3(b0.x, b0.y + ac, uProf.x + 6.0);
    N = vec3(0.0, 0.0, 1.0);
  } else {
    h = mix(uH.x, uH.y, pow(aP.y, 1.7));
    vec3 bd = vec3(0.0, uH.z, 1.0);
    N = normalize(cross(vec3(T, 0.0), bd));
    // a curtain is not a perfect ruled sheet: its rays lean a little off it, one way and then the other along its
    // length, so seen from underneath it has width and turns like a ribbon instead of closing to a line
    float twn = textureLod(uN, vec2(s * 2.6 + uPat.w * 3.1 + uB1.z * 0.5, uPat.z * 0.0017 + 0.23), 0.0).r - 0.5;
    P = vec3(b0, 0.0) + h * bd + N * (uMx[0].w * twn * (h - uProf.x) * 0.02);
  }
  P.z -= dot(P.xy, P.xy) * uH.w;
  vec3 V = normalize(P);
  vLos = dot(N, V);
  float am = 1.0 / (max(V.z, 0.0) + 0.03);
  vExt = exp(-vec3(0.045, 0.06, 0.1) * am);
  float pa = textureLod(uN, vec2(s * 2.3 + uPat.w + uB1.z, uPat.z * 0.003), 0.0).r;
  float pb = textureLod(uN, vec2(s * 9.0 + uPat.w * 1.7 + uB1.z * 2.4, uPat.z * 0.008 + 0.5), 0.0).g;
  float along = mix(1.0, (0.14 + 1.05 * smoothstep(0.2, 0.78, pa)) * (0.55 + 0.95 * pb), uPat.x);
  float ew = 0.15 + 0.2 * smoothstep(300.0, 900.0, uB1.x);
  float ends = smoothstep(0.0, ew, s) * smoothstep(1.0, 1.0 - ew, s);
  vI = uB0.z * along * ends * (1.0 + 1.5 * g / (1.0 + g)) * (uB0.w > 2.5 ? 1.0 : mix(0.5, 1.0, smoothstep(50.0, 240.0, length(b0))));
  // rays come with activity: stretches of the sheet are a smooth, nearly rayless arc, others break into rays, and the
  // stretches drift along it
  float qa = textureLod(uN, vec2(s * 1.7 + uPat.w * 2.3 - uB1.z * 0.7, uPat.z * 0.0045 + 0.71), 0.0).r;
  vBo = bo - uRay.x * 0.8 * (1.0 - smoothstep(0.34 - uB1.w, 0.62 - uB1.w, qa));
  vS = s; vH = h;
  vRU = s * uRay.y + uRay.z + rs;
  vec3 C = toCam(P);
  gl_Position = vec4(uCam.x * C.x, uCam.x * C.z, C.y - 2.0, C.y);
}`,Yt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
in float vH; in float vRU; in float vI; in float vS; in float vLos; in float vBo; in vec3 vExt;
uniform sampler2D uR; uniform sampler2D uN;
uniform vec4 uB0; uniform vec4 uH; uniform vec4 uProf; uniform vec4 uProf2; uniform vec4 uRay; uniform vec4 uPat;
out vec4 o;
float gs(float x) { return exp(-x * x); }
void main() {
  float kind = uB0.w, h = vH, hb = uProf.x;
  float fine = texture(uR, vec2(vRU * (1.0 / 1024.0), uRay.w), 0.8).r;
  float bund = texture(uR, vec2(vRU * (1.0 / 1024.0) * 0.37 + 0.21, uRay.w * 0.8 + 0.17), 1.6).g;
  float ra = clamp(uRay.x + vBo, 0.0, 1.0);
  // a thin sheet seen edge-on is a long path through it, so a fold is brightest right where it turns and falls away
  // smoothly to the face-on sheet beside it (bounded: the sheet has thickness)
  float nearF = min(uProf2.w, 1.0);
  float los = kind > 2.5 ? min(1.0 / (abs(vLos) + 0.3), 1.6) : min(0.52 / (abs(vLos) + 0.24), 1.7 - 0.4 * nearF);
  vec3 col;
  if (kind > 2.5) {
    // pulsating patches: faint, ragged, elongated east-west, no edge to speak of
    vec2 pq = vec2((2.0 * vS - 1.0) * uB0.y, (vH + uB0.x) * 2.3);
    float blob = texture(uN, pq / 3400.0 + uPat.w).r * 0.6 + texture(uN, pq / 1150.0 + uPat.w * 1.3).g * 0.3 + texture(uN, pq / 360.0 + uPat.w * 0.7).b * 0.1;
    float pt = smoothstep(0.3, 0.92, blob); pt *= pt * (2.2 - 1.2 * pt);
    float ph = fract(uPat.z / 7.0 + texture(uN, pq / 6000.0 + 0.3).r * 3.0);
    float on = smoothstep(0.0, 0.14, ph) * (1.0 - smoothstep(0.26, 0.62, ph));
    float fade = smoothstep(uH.x, uH.x + 200.0, vH) * smoothstep(uH.y, uH.y - 200.0, vH);
    col = (vec3(0.13, 1.0, 0.42) * max(uProf2.y, 0.6) + vec3(1.0, 0.08, 0.15) * uProf.z * 0.1) * pt * fade * mix(1.0, 0.16 + 1.15 * on, uPat.y);
  } else if (kind > 1.5) {
    float hs = (h - 232.0) / 24.0, band = exp(-hs * hs), core = exp(-4.0 * hs * hs);
    float fence = smoothstep(0.45, 0.8, fine) * gs((h - 125.0) / 17.0) * smoothstep(0.3, 0.6, texture(uN, vec2(vS * 4.0, uPat.z * 0.01)).g);
    col = vec3(0.5, 0.2, 0.95) * band * 0.3 + vec3(0.7, 0.55, 0.9) * core * 0.1 + vec3(0.12, 1.0, 0.32) * fence * 0.6;
  } else {
    // a Chapman profile about a lower border that is ragged at ray scale: soft below, a long tail above
    float low = texture(uN, vec2(vS * 11.0 + uPat.w, uPat.z * 0.012)).g - 0.5;
    float hbL = hb + 5.0 * low + 1.5 * ra * (fine - 0.4) - 6.0 * ra * (bund - 0.35);
    float d = h - hbL;
    float bs = smoothstep(0.25, 0.9, bund), fs = smoothstep(0.3, 0.85, fine), rb = ra * bs * bs * (0.3 + 1.1 * fs);
    float z = d < 0.0 ? d / uProf2.x : d / (uProf.y * 0.42 * (1.0 + uProf2.w));
    // the low band takes the whole pleat; the rays above it are separate things that do not pile up edge-on the same
    // way, and where the sheet runs along the line of sight they are short
    float gz = smoothstep(0.4, 0.08, abs(vLos)) * (1.0 - nearF), lt = min(los, 1.1) / los;
    float tail = smoothstep(-3.0, 12.0, d) * exp(-max(d, 0.0) / (uProf.y * (0.9 + 2.3 * rb) * (1.0 - 0.6 * gz))) * (1.0 - 0.45 * nearF) * lt;
    float green = (exp(1.0 - z - exp(-z)) * 0.66 + tail * (0.07 * (1.0 - 0.9 * nearF) + 0.62 * rb)) * uProf2.y;
    // fine rays ride the sheet: strongest a little above the border, thinning with height
    float cont = ra * (1.0 - 0.72 * gs(d / 9.0)) * mix(1.0, 0.4 + 0.5 * nearF, smoothstep(15.0, 170.0, d));
    float rays = max(1.0 + cont * (1.05 * ra * (fine - 0.36) + 1.5 * (bund - 0.4)), 0.07);
    float red = smoothstep(150.0, 235.0, h) * exp(-max(h - 235.0, 0.0) / 80.0) * uProf.z * (0.14 + 0.25 * smoothstep(0.8, 1.5, uProf.z) + 1.2 * bs * ra * (0.45 + 0.8 * fs) + 0.42 * (1.0 - ra));
    float pink = gs((d + 2.0) / 9.0) * uProf.w;
    float top = 1.0 - smoothstep(uH.y * 0.6, uH.y, h);
    vec3 gc = mix(vec3(0.2, 1.0, 0.29), vec3(0.1, 0.92, 0.42), smoothstep(10.0, 110.0, d));
    // sunlit tops (rare): resonant blue-violet N2+ high in the tallest rays
    float blu = smoothstep(150.0, 300.0, h) * uProf2.z * (0.06 + 1.3 * bs * ra * (0.45 + 0.8 * fs));
    col = (gc * green * rays + (vec3(0.72, 0.06, 0.2) * red * 0.42 * (0.55 + 0.45 * rays) + vec3(0.2, 0.17, 0.95) * blu * 0.27) * lt * (1.0 - 0.85 * gz) + vec3(0.78, 0.1, 0.48) * pink * 0.26 * lt) * top;
    float ph = fract(uPat.z / 5.0 + texture(uN, vec2(vS * 0.9, 0.37) + uPat.w).r * 1.6);
    float on = smoothstep(0.0, 0.14, ph) * (1.0 - smoothstep(0.3, 0.62, ph));
    col *= mix(1.0, 0.55 + 0.8 * on, uPat.y * step(kind, 0.5));
  }
  o = vec4(col * vI * los * vExt, 1.0);
}`,Qt=`#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; out vec4 o;
uniform sampler2D uB; uniform sampler2D uI; uniform sampler2D uA; uniform sampler2D uN;
${Z0}
${Gt}
uniform vec4 uAL;    // aurora light on snow, exposure
uniform vec4 uBin[7]; // aurora light by screen column: rgb, sky height of the glow
uniform vec4 uRf;    // ice roughness, reflection blur, aurora scale, grain
uniform vec4 uLamp;  // window on screen, glow radius, flicker
uniform vec4 uLampC; // warm colour x strength
uniform vec4 uSmk;   // chimney on screen, plume height, time
uniform vec4 uSmk2;  // drift, density, aspect, -
uniform vec4 uSat;   // satellite on screen, brightness, size px
uniform vec4 uMet;   // meteor head, tail
uniform vec4 uMet2;  // meteor brightness
uniform vec4 uTap;   // a tap on the ice: ground x, y (m), ring radius (m), strength
uniform vec4 uMoonR; // the moon for its streak in the ice: horizontal direction, sin elevation, strength
uniform vec4 uMoonS; // the moon on screen
void main() {
  vec2 uv = vUv;
  vec4 B = texture(uB, uv), I = texture(uI, uv);
  vec3 col = B.rgb;
  col += texture(uA, uv).rgb * uRf.z * I.b;
  float bx = uv.x * 5.999, bi = floor(bx), bf = bx - bi;
  bf = bf * bf * (3.0 - 2.0 * bf);
  vec4 bn = mix(uBin[int(bi)], uBin[int(bi) + 1], bf);
  col += bn.rgb * vec3(0.5, 1.2, 0.72) * I.b * exp(-(uv.y - bn.a) * (uv.y - bn.a) / 0.0484) * 0.62;
  col += I.g * bn.rgb;
  col += I.a * uLampC.rgb * uLamp.w;
  if (I.r > 0.002) {
    vec3 d = viewDir(uv);
    float t = uCam.w / max(-d.z, 1e-4);
    vec2 G = d.xy * t;
    vec2 nn = (texture(uN, G * vec2(0.06, 0.09)).rg - 0.5) + (texture(uN, G * vec2(0.3, 0.5) + 0.3).ba - 0.5) * 0.7;
    vec3 r = vec3(d.x + nn.x * uRf.x, d.y, -d.z + nn.y * uRf.x * 0.6);
    float rq = length(G - uTap.xy) - uTap.z;
    r.z += uTap.w * sin(rq * 2.4) * exp(-rq * rq / (6.0 + 0.2 * uTap.z * uTap.z));
    vec3 C = toCam(r);
    vec2 m = vec2(uCam.x * C.x / C.y, uCam.x * C.z / C.y) * 0.5 + 0.5;
    vec4 IB = texture(uI, m);
    vec3 rb = min(texture(uB, m).rgb, vec3(0.3)) + IB.g * uAL.rgb;
    // rough ice draws a light out toward you: the curtains come back long and soft
    float jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5;
    vec2 dy = vec2(0.0, uRf.y);
    vec3 ra = (textureLod(uA, m + dy * jit, 0.0).rgb * 0.34 + (textureLod(uA, m + dy * (jit + 1.0), 0.0).rgb + textureLod(uA, m + dy * (jit - 1.0), 0.0).rgb) * 0.23 + (textureLod(uA, m + dy * (jit + 2.0), 0.0).rgb + textureLod(uA, m + dy * (jit - 2.0), 0.0).rgb) * 0.1) * uRf.z * 0.8;
    col += I.r * mix(0.38, 1.0, clamp(I.r * 5.0, 0.0, 1.0)) * (rb + ra * IB.b);
    // the moon in the ice is a long streak toward you, sparkling where the surface is rough, cut wherever snow lies
    vec2 hr = r.xy / max(length(r.xy), 1e-4);
    float daz = hr.x * uMoonR.y - hr.y * uMoonR.x, del = r.z / length(r) - uMoonR.z;
    float sp = textureLod(uN, G * vec2(0.5, 0.21), 0.0).b * textureLod(uN, G * vec2(0.045, 0.017) + 0.4, 0.0).r;
    float sw = 0.02 + 0.03 * max(del, 0.0);
    col += I.r * vec3(1.0, 0.95, 0.86) * uMoonR.w * (0.3 + 2.8 * sp) * exp(-daz * daz / (sw * sw)) * exp(-del * del / (del > 0.0 ? 0.1 : 0.0025)) * textureLod(uI, uMoonS.xy, 0.0).b;
  }
  // chimney smoke drifting off, lit by the aurora and, at its root, by the window
  if (uSmk2.y > 0.0) {
    vec2 q = (uv - uSmk.xy) / uSmk.z; q.x *= uSmk2.z;
    if (q.y > -0.05 && q.y < 1.2 && abs(q.x) < 1.2) {
      float y = max(q.y, 0.0);
      float cx = uSmk2.x * pow(y, 1.5) + 0.04 * sin(y * 7.0 - uSmk.w * 0.6) * y;
      float w = 0.03 + 0.2 * y;
      float n1 = texture(uN, vec2(q.x * 1.1 - cx, y * 0.9 - uSmk.w * 0.07)).r;
      float n2 = texture(uN, vec2(q.x * 2.2, y * 1.5 - uSmk.w * 0.16) + 0.4).r;
      float dn = exp(-pow((q.x - cx) / w, 2.0)) * smoothstep(-0.02, 0.05, q.y) * (1.0 - smoothstep(0.12, 0.75, y)) * smoothstep(0.22, 0.78, n1 * 0.6 + n2 * 0.4);
      dn *= uSmk2.y;
      vec3 sc = vec3(0.016, 0.019, 0.025) + uAL.rgb * 0.5 + uLampC.rgb * 0.04 * exp(-y * 10.0);
      col = mix(col, col * 0.82 + sc, clamp(dn * 0.6, 0.0, 0.7));
    }
  }
  // the lamp's glow in the cold air
  if (uLamp.z > 0.0) { vec2 dl = uv - uLamp.xy; col += uLampC.rgb * (1.0 + uLamp.w) * 0.05 * exp(-dot(dl, dl) / (uLamp.z * uLamp.z)); }
  // satellite and meteor
  float skyV = I.b;
  if (uSat.z > 0.0) { vec2 dp = (uv - uSat.xy) * uSat.w; col += vec3(0.85, 0.9, 1.0) * uSat.z * exp(-dot(dp, dp) / 1.2) * skyV; }
  if (uMet2.x > 0.0) {
    vec2 ab = uMet.zw - uMet.xy, ap = uv - uMet.xy;
    float hh = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
    vec2 dp = (ap - ab * hh) * uSat.w;
    float trail = pow(1.0 - hh, 1.5);
    col += mix(vec3(0.75, 1.0, 0.8), vec3(1.0, 0.95, 0.85), trail) * uMet2.x * trail * exp(-dot(dp, dp) / (0.9 + 1.5 * trail)) * skyV;
  }
  vec3 c = tonemap(col * uAL.w);
  vec2 vq = uv - 0.5;
  c *= 1.0 - 0.2 * pow(dot(vq, vq) * 2.0, 1.4);
  float gr = texture(uN, uv * uSat.w / 160.0 + uSmk.w * vec2(0.0, 0.0)).b - 0.5;
  o = vec4(c + gr * uRf.w, 1.0);
}`;function mt(t,e,x){const k=(v,t0)=>{const o=t.createShader(v);return t.shaderSource(o,t0),t.compileShader(o),o},O=t.createProgram(),I=k(t.VERTEX_SHADER,e),g=k(t.FRAGMENT_SHADER,x);return t.attachShader(O,I),t.attachShader(O,g),t.linkProgram(O),{p:O,u:{},sh:[I,g]}}const _0={noise:[$0,It],sky:[$0,qt],ground:[$0,Ht],wall:[$0,Vt],tree:[Wt,Xt],mesh:[Ot,Kt],aur:[jt,Yt],comp:[$0,Qt]};function $t(t,e){let x=ct.get(t),k=0;if(x){for(const b in _0)e[b]&&!x[b]&&(x[b]=mt(t,_0[b][0],_0[b][1]),k++);return k&&t.flush(),x}const O=!!t.getExtension("EXT_color_buffer_float");x={vao0:t.createVertexArray(),ok:!1};for(const b in _0)e[b]&&(x[b]=mt(t,_0[b][0],_0[b][1]));t.flush(),x.half=O;const I=1024,g=32,v=(b=>()=>{b=b+1831565813|0;let M=Math.imul(b^b>>>15,1|b);return M=M+Math.imul(M^M>>>7,61|M)^M,((M^M>>>14)>>>0)/4294967296})(9137),t0=(b,M,E,C)=>{const _=[];for(let Z=0;Z<b;Z++)_.push({x:v()*I,w:M+Math.pow(v(),2)*(E-M),a:.3+.7*v(),k:1+Math.floor(v()*3.99),ph:v()*D,dx:(v()-.5)*C,ph2:v()*D});return _},o=t0(1100,.42,1.25,5),J0=t0(150,2.5,8.5,13),C0=new Float32Array(I),U0=new Float32Array(I),S0=new Uint8Array(I*g*2),G0=new Float32Array(256);for(let b=0;b<256;b++)G0[b]=Math.exp(-.5*Math.pow(b/85,2));const k0=(b,M,E)=>{b.fill(0);for(const C of M){const _=C.a*Math.pow(Math.max(0,.42+.58*Math.sin(D*C.k*E+C.ph)),1.2);if(_<.01)continue;const Z=C.x+C.dx*Math.sin(D*E+C.ph2),D0=Math.floor(Z-3*C.w),ze=Math.ceil(Z+3*C.w);for(let I0=D0;I0<=ze;I0++){const q0=Math.abs((I0-Z)/C.w);q0<3&&(b[I0+I&I-1]+=_*G0[q0*85|0])}}};for(let b=0;b<g;b++){const M=b/g;k0(C0,o,M),k0(U0,J0,M);for(let E=0;E<I;E++){const C=(b*I+E)*2;S0[C]=Math.round(255*(1-Math.exp(-C0[E]*.55))),S0[C+1]=Math.round(255*(1-Math.exp(-U0[E]*.42)))}}x.rayT=t.createTexture(),t.bindTexture(t.TEXTURE_2D,x.rayT),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RG8,I,g,0,t.RG,t.UNSIGNED_BYTE,S0),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const b0=new Float32Array(M0*Q0*2);for(let b=0;b<Q0;b++)for(let M=0;M<M0;M++){const E=(b*M0+M)*2;b0[E]=M/(M0-1),b0[E+1]=b/(Q0-1)}const J=new Uint16Array((M0-1)*(Q0-1)*6);let j=0;for(let b=0;b<Q0-1;b++)for(let M=0;M<M0-1;M++){const E=b*M0+M,C=E+1,_=E+M0,Z=_+1;J[j++]=E,J[j++]=C,J[j++]=Z,J[j++]=E,J[j++]=Z,J[j++]=_}x.nIdx=j,x.gridVao=t.createVertexArray(),t.bindVertexArray(x.gridVao);const m0=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,m0),t.bufferData(t.ARRAY_BUFFER,b0,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0);const T0=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,T0),t.bufferData(t.ELEMENT_ARRAY_BUFFER,J,t.STATIC_DRAW),t.bindVertexArray(null),x.quad=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,x.quad),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,0,1,0,1,1,-1,0,1,1,-1,1]),t.STATIC_DRAW),ct.set(t,x),x}const Zt={sky:{uN:0},ground:{uN:0},wall:{uN:0},tree:{uN:0},mesh:{uN:0},aur:{uR:0,uN:1},comp:{uB:0,uI:1,uA:2,uN:3}};function B0(t,e,x){const k=e[x];if(k.ok)return k;if(!t.getProgramParameter(k.p,t.LINK_STATUS))throw new Error("035 link "+x+": "+t.getProgramInfoLog(k.p)+" "+t.getShaderInfoLog(k.sh[0])+" "+t.getShaderInfoLog(k.sh[1]));const O=t.getProgramParameter(k.p,t.ACTIVE_UNIFORMS);for(let g=0;g<O;g++){const v=t.getActiveUniform(k.p,g);k.u[v.name.replace(/\[0\]$/,"")]=t.getUniformLocation(k.p,v.name)}const I=Zt[x];if(I){t.useProgram(k.p);for(const g in I)k.u[g]&&t.uniform1i(k.u[g],I[g])}return k.ok=!0,k}function Jt(t,e){if(e.ok)return;B0(t,e,"noise"),e.ok=!0,e.noiseT=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.noiseT),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,null);const x=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,x),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e.noiseT,0),t.viewport(0,0,256,256),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.useProgram(e.noise.p),t.bindVertexArray(e.vao0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(x),t.bindTexture(t.TEXTURE_2D,e.noiseT),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)}function Ne(t,e,x,k){const O=t.createTexture();return t.bindTexture(t.TEXTURE_2D,O),k==="half"?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,e,x,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,e,x,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),O}it.add({num:35,name:"Aurora Lake",fam:"Worlds",recipe:"A frozen lake in the far north at night under an aurora that hangs and folds like the real thing. The black ice mirrors the sky. The storm's colour and shape change every mint. Drag across the sky to send a surge along the curtains, hold to break them into a crown overhead, tap the sky for fast rays or tap the ice to make it sing.",interactive:"You are the solar wind. Drag across the sky to send a surge along your stroke: the curtain brightens, folds and races along it. Hold to build a substorm: the arc brightens, breaks up into a corona overhead, then pulses after you let go. Tap the sky for a burst of fast rays; tap the ice and it sings, a ring of flexing ice running out through the reflection.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,x=t.size,k=t.hash.slice(2),O=s=>{let i=parseInt(k.slice(s,s+8),16)>>>0,a=parseInt(k.slice(s+8,s+16),16)>>>0,n=parseInt(k.slice(s+16,s+24),16)>>>0,r=parseInt(k.slice(s+24,s+32),16)>>>0;const u=()=>{i>>>=0,a>>>=0,n>>>=0,r>>>=0;let l=i+a|0;return i=a^a>>>9,a=n+(n<<3)|0,n=n<<21|n>>>11,r=r+1|0,l=l+r|0,n=n+l|0,(l>>>0)/4294967296};for(let l=0;l<15;l++)u();return u},I=O(0),g=O(16),v=O(32),t0=(s,i)=>{i=i||I;let a=0;for(const r of s)a+=r[1];let n=i()*a;for(const r of s)if(n-=r[1],n<=0)return r[0];return s[s.length-1][0]},o=(s,i,a)=>s+(i-s)*(a||g)();let J0=t0([["Classic green",50],["Green with red tops",28],["Pink-fringed storm",15],["All-red great storm",7]]),C0=t0([["Quiet arc",27],["Rayed band",37],["Corona",20],["Pulsating patches",16]]),U0=t0([["Spruce and cabin",34],["Bare mountains, frozen waterfall",24],["Fjord with fishing hut",22],["Tundra with lone tent",20]]),S0=t0([["Black clear ice",40],["Wind-carved snow",35],["Pressure ridges",25]]),G0=t0([["None",46],["Crescent",34],["Full",20]]),k0=t0([["None",70],["Meteor",14],["STEVE",9],["Sunlit blue tops",7]]);t.home&&(J0="Green with red tops",C0="Rayed band",U0="Spruce and cabin",S0="Black clear ice",G0="Crescent",k0="None"),t.trait("Aurora colour",J0),t.trait("Form",C0),t.trait("Shore",U0),t.trait("Ice",S0),t.trait("Moon",G0),t.trait("Something rare",k0);const b0=O(24);let J=t0([["Across the lake",58],["Looking up",24],["Long lens on the shore",18]],b0);t.home&&(J="Across the lake"),t.trait("View",J);let j=ut,m0=lt,T0=Bt,b=Ct;if(J!=="Across the lake"){const s=J==="Looking up";j=s?.86+b0()*.06:1.75+b0()*.35,m0=s?.12+b0()*.04:.24+b0()*.05;const i=Math.atan((1-2*m0)/j);T0=Math.sin(i),b=Math.cos(i)}const M=(s,i,a)=>{const n=i*b+a*T0,r=-i*T0+a*b;return n<=.001?null:[.5+.5*j*s/n,.5+.5*j*r/n]},E={"Spruce and cabin":0,"Bare mountains, frozen waterfall":1,"Fjord with fishing hut":2,"Tundra with lone tent":3}[U0],C={"Black clear ice":0,"Wind-carved snow":1,"Pressure ridges":2}[S0],_={"Quiet arc":0,"Rayed band":1,Corona:2,"Pulsating patches":3}[C0],Z={"Classic green":0,"Green with red tops":1,"Pink-fringed storm":2,"All-red great storm":3}[J0],D0={None:0,Crescent:1,Full:2}[G0],ze=k0==="STEVE",I0=k0==="Meteor",q0=k0==="Sunlit blue tops",eo=I(),o0=g()<.5?-1:1;let be=[.0024,.0044,.0125],A0=[.011,.021,.034],i0=[.018,.023,.034],vt=1,pt=1,q=[0,1,0],c0=[0,0,0],Fe=0,ye=0,_e=0,dt=-1.57,to=.021;const xt=(s,i)=>[Math.sin(s)*Math.cos(i),Math.cos(s)*Math.cos(i),Math.sin(i)];if(D0===1){const s=-o0*o(.2,.55),i=o(.15,.26);q=xt(s,i),Fe=o(2.25,2.6),ye=5,_e=.012,dt=-1.57+(s>0?.5:-.5),c0=[.012,.012,.013],A0=[.014,.024,.038],i0=[.021,.026,.037]}else if(D0===2){const s=g()<.5,i=s?-o0*o(.15,.55):o0*o(2.3,2.9),a=s?o(.16,.32):o(.4,.65);q=xt(i,a),Fe=.05,ye=s?30:0,_e=s?.06:0,c0=[.11,.115,.13],be=[.008,.014,.034],A0=[.03,.045,.075],i0=[.03,.042,.07],vt=.45,pt=.15}const oo=o(.6,1.4),U=[0,0,0,0],a0=[1200,0,0,0],ee=[0,0,0,0],ao=[o(16,24),o(45,75),o(.55,1),o(1.3,2.1)];let te=[0,0,.5,.5],we=[0,0,.3,.3],Be=[0,0,.35,.15];const u0=[],ge=[];let H0=[0,0,0,0],r0=null,v0=null;const oe=[0,0,L0],y0=(s,i,a,n,r,u,l)=>{const f=[i[0]-s[0],i[1]-s[1],i[2]-s[2]],p=[a[0]-s[0],a[1]-s[1],a[2]-s[2]];let h=[f[1]*p[2]-f[2]*p[1],f[2]*p[0]-f[0]*p[2],f[0]*p[1]-f[1]*p[0]];const N=Math.hypot(h[0],h[1],h[2])||1;if(h=h.map(y=>y/N),!((s[0]-oe[0])*h[0]+(s[1]-oe[1])*h[1]+(s[2]-oe[2])*h[2]>=0))for(const[y,R]of[[s,r],[i,u],[a,l]])ge.push(y[0],y[1],y[2],h[0],h[1],h[2],n,R[0],R[1])},P=(s,i,a,n,r,u,l)=>{y0(s,i,a,r,[0,0],[u,0],[u,l]),y0(s,a,n,r,[0,0],[u,l],[0,l])},bt=(s,i,a)=>{const n=Math.cos(a),r=Math.sin(a);return(u,l,f)=>[s+u*n-l*r,i+u*r+l*n,f]},Ce=(s,i,a,n,r,u,l,f,p)=>{const h=(N,y,R)=>s(N,y,R);P(h(i,n,u),h(a,n,u),h(a,n,l),h(i,n,l),f,a-i,l-u),P(h(a,r,u),h(i,r,u),h(i,r,l),h(a,r,l),f,a-i,l-u),P(h(i,r,u),h(i,n,u),h(i,n,l),h(i,r,l),f,r-n,l-u),P(h(a,n,u),h(a,r,u),h(a,r,l),h(a,n,l),f,r-n,l-u),P(h(i,n,l),h(a,n,l),h(a,r,l),h(i,r,l),p===void 0?f:p,a-i,r-n)},po=(s,i)=>o0*s>U[1]+U[2]*i+4;if(E===0){U[0]=o0,U[1]=o(6,9),U[2]=o(.3,.42),a0[0]=o(900,1300),a0[1]=13/a0[0],a0[2]=a0[0]/8,a0[3]=1,Be=[-L0/a0[0],o(.018,.04),.4,.12],we=[0,o(.07,.12),o(.22,.32),.3],te=[0,o(.06,.1),o(.45,.6),.55];const s=o(30,40),i=o0*(U[1]+U[2]*s+o(5,7)),a=Math.atan2(s,i)+Math.PI/2+o0*o(.35,.6),n=bt(i,s,a),r=o(5.5,6.8)/2,u=o(4.2,4.8)/2,l=2.5,f=o(1.6,2),p=.55,h=.58,N=.2;Ce(n,-r,r,-u,u,0,l,0,0);for(const A of[-1,1]){const w=n(A*r,-u,l),S=n(A*r,u,l),z=n(A*r,0,l+f);A>0?y0(w,S,z,0,[0,0],[2*u,0],[u,f]):y0(S,w,z,0,[0,0],[2*u,0],[u,f])}for(const A of[-1,1]){const w=n(-r-p,A*(u+p),l-.25),S=n(r+p,A*(u+p),l-.25),z=n(r+p,0,l+f+h),f0=n(-r-p,0,l+f+h),d0=n(-r-p,A*(u+p+N),l-.25+h),F=n(r+p,A*(u+p+N),l-.25+h);A<0?(P(d0,F,z,f0,1,2*r,u),P(w,S,F,d0,1,2*r,h)):(P(F,d0,f0,z,1,2*r,u),P(S,w,d0,F,1,2*r,h))}for(const A of[-1,1]){const w=A*(r+p);for(const S of[-1,1]){const z=n(w,S*(u+p),l-.25),f0=n(w,0,l+f),d0=n(w,0,l+f+h),F=n(w,S*(u+p+N),l-.25+h);A*S>0?P(f0,z,F,d0,1,1,1):P(z,f0,d0,F,1,1,1)}}const y=r*o(.3,.55)*(g()<.5?-1:1);Ce(n,y-.3,y+.3,-.3,.3,l+f+h-.12,l+f+1.15,3,1),v0=n(y,0,l+f+1.2);for(const A of[-1,1]){const w=A*(u+.03),S=A*.4;A<0?P(n(S-.6,w,1),n(S+.6,w,1),n(S+.6,w,1.85),n(S-.6,w,1.85),2,1,1):P(n(S+.6,w,1),n(S-.6,w,1),n(S-.6,w,1.85),n(S+.6,w,1.85),2,1,1)}for(const A of[-1,1]){const w=A*(r+.03);A>0?P(n(w,u*.15,0),n(w,u*.65,0),n(w,u*.65,1.95),n(w,u*.15,1.95),3,1,1):P(n(w,-u*.15,0),n(w,-u*.65,0),n(w,-u*.65,1.95),n(w,-u*.15,1.95),3,1,1)}const R=n(0,0,0),H=n(0,1,0),G=(H[0]-R[0])*(oe[0]-R[0])+(H[1]-R[1])*(oe[1]-R[1])>0?1:-1;r0=n(G*.4,G*(u+.05),1.42);const j0=n(G*.4,G*(u+2.2),0);H0=[j0[0],j0[1],0,o(1.6,2.4)];const z0=46+Math.floor(g()*30);for(let A=0,w=0;A<z0&&w<2e3;w++){const S=9+160*Math.pow(g(),1.4),z=o0*(U[1]+U[2]*S+2+g()*S*.9);if(Math.abs(z)/S>1.25||Math.hypot(z-i,S-s)<9)continue;const f0=o(7,16);u0.push([z,S,f0,f0*o(.24,.32),g(),o(-.02,.02),o(.55,1),0]),A++}}else if(E===1)U[0]=o0,U[1]=o(200,300),U[2]=.3,U[3]=o(38,62),a0[0]=o(2200,3e3),ee[2]=o(-.15,.2)*U[1],ee[0]=o0*(ee[2]+o(.25,.45)*U[1]),ee[1]=o(5,8),we=[0,o(.14,.21),o(.25,.35),.3],te=[0,o(.08,.12),o(.45,.6),.55];else if(E===2){U[0]=o(200,300),U[1]=o(240,360),U[2]=o(0,.05),U[3]=o(520,850),a0[0]=o(7e3,11e3),we=[0,o(.05,.09),o(.35,.5),.35],te=[0,o(.05,.08),o(.5,.7),.6];const s=o(32,50),i=o0*o(3,10),a=bt(i,s,Math.atan2(s,i)+Math.PI/2+o(-.6,.6)),n=1.25,r=.95,u=2.3,l=1.85;P(a(-n,-r,0),a(n,-r,0),a(n,-r,l),a(-n,-r,l),5,2*n,l),P(a(n,r,0),a(-n,r,0),a(-n,r,u),a(n,r,u),5,2*n,u),y0(a(-n,r,0),a(-n,-r,0),a(-n,-r,l),5,[0,0],[2*r,0],[2*r,l]),y0(a(-n,r,0),a(-n,-r,l),a(-n,r,u),5,[0,0],[2*r,l],[0,u]),y0(a(n,-r,0),a(n,r,0),a(n,r,u),5,[0,0],[2*r,0],[2*r,u]),y0(a(n,-r,0),a(n,r,u),a(n,-r,l),5,[0,0],[2*r,u],[0,l]);const f=.2,p=.25;P(a(-n-f,-r-f,l-.05+p),a(n+f,-r-f,l-.05+p),a(n+f,r+f,u+.05+p),a(-n-f,r+f,u+.05+p),1,2*n,2*r),P(a(-n-f,-r-f,l-.05),a(n+f,-r-f,l-.05),a(n+f,-r-f,l-.05+p),a(-n-f,-r-f,l-.05+p),1,1,1),P(a(n+f,r+f,u+.05),a(-n-f,r+f,u+.05),a(-n-f,r+f,u+.05+p),a(n+f,r+f,u+.05+p),1,1,1),P(a(-n-f,r+f,u+.05),a(-n-f,-r-f,l-.05),a(-n-f,-r-f,l-.05+p),a(-n-f,r+f,u+.05+p),1,1,1),P(a(n+f,-r-f,l-.05),a(n+f,r+f,u+.05),a(n+f,r+f,u+.05+p),a(n+f,-r-f,l-.05+p),1,1,1),P(a(-.35,-r-.03,.95),a(.35,-r-.03,.95),a(.35,-r-.03,1.5),a(-.35,-r-.03,1.5),2,1,1),P(a(-n-.03,r*.5,1),a(-n-.03,-r*.3,1),a(-n-.03,-r*.3,1.5),a(-n-.03,r*.5,1.5),2,1,1),P(a(n+.03,-r*.3,1),a(n+.03,r*.5,1),a(n+.03,r*.5,1.5),a(n+.03,-r*.3,1.5),2,1,1);const h=l-.05+p+(u-l+.1)*((.365+r+f)/(2*(r+f)))-.06;Ce(a,.55,.68,.3,.43,h,u+.9,3,3),v0=a(.615,.365,u+.92),r0=a(0,-r-.5,1.2),H0=[r0[0],r0[1],0,o(1,1.6)]}else{a0[0]=o(24,38),Be=[-4e-4,o(.008,.016),.4,.22],te=[0,o(.02,.04),o(.5,.7),.62];const s=a0[0]+o(5,12),i=o0*o(4,12),a=11,n=o(2,2.5),r=o(3,3.5),u=[i,s,r];for(let l=0;l<a;l++){const f=l/a*D,p=(l+1)/a*D,h=[i+n*Math.cos(f),s+n*Math.sin(f),0],N=[i+n*Math.cos(p),s+n*Math.sin(p),0];y0(h,N,u,4,[l/a,0],[(l+1)/a,0],[(l+.5)/a,1])}for(let l=0;l<5;l++){const f=l/5*D+.3,p=Math.cos(f),h=Math.sin(f),N=.05,y=[i+p*.12,s+h*.12,r-.15],R=[i-p*.35,s-h*.35,r+.55],H=-h*N,G=p*N;P([y[0]-H,y[1]-G,y[2]],[y[0]+H,y[1]+G,y[2]],[R[0]+H,R[1]+G,R[2]],[R[0]-H,R[1]-G,R[2]],3,1,1),P([y[0]+H,y[1]+G,y[2]],[y[0]-H,y[1]-G,y[2]],[R[0]-H,R[1]-G,R[2]],[R[0]+H,R[1]+G,R[2]],3,1,1)}v0=[i,s,r+.2],r0=[i,s,1],H0=[i,s,0,o(1.3,1.9)]}for(const s of u0){const i=s[4]*7.13%1;s[2]*=.6+.75*i*i,s[3]*=.8+.3*i}u0.sort((s,i)=>Math.hypot(i[0],i[1])-Math.hypot(s[0],s[1]));const B=$t(e,{noise:1,sky:1,ground:1,wall:E===1||E===2,tree:u0.length>0,mesh:ge.length>0,aur:1,comp:1});Jt(e,B);const ro=r0?Math.hypot(r0[0],r0[1]):0;let V0=0;for(;V0<u0.length&&Math.hypot(u0[V0][0],u0[V0][1])>ro;)V0++;const Ue=B.half,yt=Ne(e,x,x,Ue?"half":"rgba8"),wt=Ne(e,x,x,"rgba8"),ae=[j,T0,b,L0];{const s=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,s),e.viewport(0,0,x,x),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,B.noiseT);const i=f=>{const p=B0(e,B,f),h=p.u;e.useProgram(p.p),e.uniform4fv(h.uCam,ae),e.uniform4f(h.uPx,2/(x*j),eo,x,E),e.uniform4f(h.uSkyT,be[0],be[1],be[2],vt),e.uniform4f(h.uSkyH,A0[0],A0[1],A0[2],pt),e.uniform4f(h.uMoon,q[0],q[1],q[2],to),e.uniform4f(h.uMoonL,c0[0],c0[1],c0[2],Fe),e.uniform4f(h.uMoonV,ye,_e,dt,oo),e.uniform4f(h.uAmb,i0[0],i0[1],i0[2],C),e.uniform4fv(h.uGeo,U),e.uniform4fv(h.uGeo2,a0),e.uniform4i(h.uLoop,C===2?120:72,6,3,3),h.uML&&e.uniform4fv(h.uML,[...te,...we,...Be]),h.uFall&&e.uniform4fv(h.uFall,ee),h.uLampW&&e.uniform4fv(h.uLampW,H0),h.uRidge&&e.uniform4fv(h.uRidge,ao)};let a=null,n=null;if(u0.length){const f=new Float32Array(u0.length*8);u0.forEach((p,h)=>f.set(p,h*8)),a=e.createVertexArray(),e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,B.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,0),n=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,f,e.STATIC_DRAW),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(2,1),e.bindVertexArray(null)}let r=null,u=null;const l=ge.length/9;l&&(r=e.createVertexArray(),e.bindVertexArray(r),u=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,u),e.bufferData(e.ARRAY_BUFFER,new Float32Array(ge),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,36,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,36,12),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,3,e.FLOAT,!1,36,24),e.bindVertexArray(null));for(let f=0;f<2;f++){e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f?wt:yt,0),e.disable(e.BLEND),e.bindVertexArray(B.vao0),i("sky"),e.uniform1i(B.sky.u.uMode,f),e.drawArrays(e.TRIANGLES,0,3),i("ground"),e.uniform1i(B.ground.u.uMode,f),e.drawArrays(e.TRIANGLES,0,3),(E===1||E===2)&&(e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE_MINUS_SRC_ALPHA),i("wall"),e.uniform1i(B.wall.u.uMode,f),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND));const p=(h,N)=>{if(!a||N<=h)return;e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE_MINUS_SRC_ALPHA);const y=B0(e,B,"tree");e.useProgram(y.p),e.uniform1i(y.u.uMode,f),e.uniform4fv(y.u.uCam,ae),e.uniform4f(y.u.uAmb,i0[0],i0[1],i0[2],0),e.uniform4f(y.u.uMoon,q[0],q[1],q[2],0),e.uniform4f(y.u.uMoonL,c0[0],c0[1],c0[2],0),e.uniform4f(y.u.uSkyH,A0[0],A0[1],A0[2],0),e.bindVertexArray(a),e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,h*32),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,h*32+16),e.drawArraysInstanced(e.TRIANGLES,0,6,N-h),e.disable(e.BLEND)};if(p(0,V0),l){const h=B0(e,B,"mesh");e.useProgram(h.p),e.uniform1i(h.u.uMode,f),e.uniform4fv(h.u.uCam,ae),e.uniform4f(h.u.uAmb,i0[0],i0[1],i0[2],0),e.uniform4f(h.u.uMoon,q[0],q[1],q[2],0),e.uniform4f(h.u.uMoonL,c0[0],c0[1],c0[2],0),e.uniform4fv(h.u.uLampW,H0),e.bindVertexArray(r),e.drawArrays(e.TRIANGLES,0,l)}p(V0,u0.length)}e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(s),a&&(e.deleteVertexArray(a),e.deleteBuffer(n)),r&&(e.deleteVertexArray(r),e.deleteBuffer(u))}const Me=Math.min(x,720),gt=Ne(e,Me,Me,Ue?"half":"rgba8"),Mt=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,Mt),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,gt,0),e.bindFramebuffer(e.FRAMEBUFFER,null);const kt=Ue?1:4,no=.34,re=[{green:1,red:.05,pink:0},{green:1,red:.42,pink:0},{green:1,red:.28,pink:.7},{green:.16,red:1.6,pink:0}][Z],ne=Z===2?.25:Z===3?.15:0,Q=[],$=s=>{const i=g()<.5?-1:1,a=Object.assign({kind:0,D0:500,L:1500,bright0:1.2,bow:0,tilt:0,twist:10,near:0,hb:o(102,110),Hg:34,rays0:.5,soft:11,patch:.75,Dc:80,raySpeed:i*o(3,9),slice:g(),sliceSpeed:o(.016,.03),rayOff:g()*1024,rayScale:o(950,1250),seed:g()*10,travel:i*o(.006,.014)},s);a.D=a.D0;const n=s.ampK||1,r=o(6.5,12)*(s.kK||1),u=g()*D,l=-i*o(.16,.42)*D/D,f=o(30,70)*n;return a.my=[{a:o(40,110)*n,k:o(.6,1.4),ph:g()*D,w:o(.01,.03)*(g()<.5?-1:1)},{a:f,k:r,ph:u,w:l},{a:o(4,11)*Math.min(n,1.1),k:o(26,42),ph:g()*D,w:-i*o(.6,1.3)}],a.mx=[{a:f*(s.curlK||o(.55,1)),k:r,ph:u+1.5708,w:l},{a:o(2,6)*Math.min(n,1.1),k:o(40,60),ph:g()*D,w:-i*o(.7,1.4)}],a.hBot=a.hb-32,a.hTop=re.red>.2||a.kind===2||q0?430:320,a.kind===1&&(a.hBot=a.hb-50,a.hTop=380),a.kind===3&&(a.hBot=-a.W,a.hTop=a.W),Q.push(a),a},p0=()=>(g()<.5?-1:1)*o(60,300);if(_===0){const s=270+(o(430,620)-430)*.75;$({D0:s,bright0:1.15,rays0:o(.18,.38),Hg:30,ampK:.6,bow:o(-100,40),tilt:p0(),Dc:90,soft:13}),g()<.6&&$({D0:s+o(70,130),bright0:.45,rays0:.14,Hg:28,ampK:.5,bow:o(-60,40),tilt:p0(),Dc:235,soft:14}),$({kind:1,D0:s+o(120,220),bright0:.26,rays0:0,Hg:70,soft:30,ampK:.3,bow:o(-60,60),tilt:p0(),Dc:320})}else if(_===1){const s=t.home?225:o(190,290);$({D0:s,kK:.5,bright0:1.25,rays0:o(.75,.95),Hg:44,ampK:t.home?2.3:1.7,curlK:t.home?.8:void 0,bow:t.home?-40:o(-90,60),tilt:t.home?180:p0()*1.1,Dc:60}),$({D0:s+o(130,240),bright0:.62,rays0:o(.55,.8),Hg:34,ampK:.9,bow:o(-60,60),tilt:p0(),Dc:160,soft:14}),$({kind:1,D0:s+o(300,460),bright0:.24,rays0:0,Hg:70,soft:30,ampK:.3,bow:o(-60,60),tilt:p0(),Dc:320})}else _===2?($({D0:o(95,135)-55,bright0:1.2,rays0:.9,Hg:48,ampK:1.5,tilt:o(-60,60),Dc:45,soft:13}),$({D0:o(190,280),bright0:.85,rays0:.8,Hg:42,ampK:1.2,tilt:o(-60,60),Dc:150,soft:13}),$({D0:o(460,600),bright0:.5,rays0:.5,Hg:34,ampK:.8,bow:o(-80,40),tilt:p0(),Dc:280}),$({kind:1,D0:o(650,800),bright0:.22,rays0:0,Hg:70,soft:30,ampK:.3,tilt:p0(),Dc:420}),$({D0:-o(45,95),bright0:.9,rays0:.85,Hg:46,ampK:1.3,tilt:o(-50,50),Dc:-70,soft:13})):($({kind:3,D0:o(330,400),W:420,bright0:.33,Hg:18,ampK:.14,tilt:o(-80,80),Dc:330,rays0:0,patch:0}),$({D0:o(600,740),bright0:.42,rays0:.22,Hg:26,ampK:.5,bow:o(-60,40),tilt:p0(),Dc:300,soft:14}),$({kind:1,D0:o(720,860),bright0:.22,rays0:0,Hg:70,soft:30,ampK:.3,tilt:p0(),Dc:420}));if(ze){const s=$({kind:2,D0:o(150,210),bright0:1,rays0:.9,Hg:30,ampK:.12,tilt:(g()<.5?-1:1)*o(260,380),bow:o(-120,-40),Dc:160,patch:.3,sliceSpeed:.004});s.hBot=95,s.hTop=285}const E0=[];let V=ne,n0=0,ke=0,Tt=0,W0=!1,se=!1,Ge=o(2,5,v),Ie=o(30,60,v),e0=0;const Te=[0,0];let ie=9,qe=!1,He=0,Ae=0,Ee=0,Re=0,Ve=0;const so=(s,i)=>{let a=0,n=0;for(const r of s.sgs){const u=(i-r.sc)/r.w,l=Math.exp(-u*u);a+=l*(r.pdy+r.pfold*Math.sin(u*r.fk)),n+=l}return a/(1+.7*Math.max(n-1,0))},At=(s,i)=>{const a=2*i-1,n=1-.85*n0;let r=a*s.L,u=s.D+s.bow*n*a*a+s.tilt*n*a;const l=.28+.96*(.5+.5*Math.sin(D*ht*i+s.envPh));return s.my.forEach((f,p)=>{u+=(p===1?s.ayE*l:p===0?s.ay0E:f.a*s.ampE)*Math.sin(D*f.k*i+f.ph)}),s.mx.forEach((f,p)=>{r+=(p===0?s.axE*l:f.a*s.ampE)*Math.sin(D*f.k*i+f.ph)}),[r,u+so(s,i)]},ce=(s,i,a)=>{const[n,r]=At(s,i);if(s.kind===3)return M(n,r,s.hb+6-(n*n+r*r)*xe);const u=r+a*Se;return M(n,u,a-(n*n+u*u)*xe)};for(const s of Q)s.sgs=[],s.ampE=1,s.axE=0,s.ayE=0,s.ay0E=0,s.envPh=s.seed*D,s.trvPh=0,s.open=1;const L=O(8),io=[o(0,.1,L),o(.2,.38,L),o(.22,.4,L),o(.05,.15,L)][_]*(1-2*ne),Et=[1,o(1.2,1.6,L),o(1.1,1.35,L),1][_],Rt=o(700,1500,L);let We=1;{let s=0;for(let i=0;i<Q.length;i++){const a=Q[i];if(a.kind===2||(_===0?a.bow+=Rt:_===3&&a.kind!==3&&(a.bow+=.6*Rt),_===0&&J==="Looking up"&&(a.D0*=.62,a.D=a.D0),a.kind!==0))continue;const n=s++===0,r=L()<.5?-1:1,u=o(40,55,L),l=K((a.D0+80)/300,.3,1);if(a.envPh=Math.PI/2-D*ht*(.5+o(-.06,.06,L)),a.open=n?Et:1+.5*(Et-1),_===0||_===3)E0.push({ci:i,sc:.5+o(-.04,.04,L),v:r*.001,w:o(.1,.14,L),gain:.25,rb:.1,dy:-o(15,40,L),fold:r*o(4,10,L),fk:2,rs:0,rsv:0,life:.13*u,dur:u});else{const f=(n?1:.6)*l;E0.push({ci:i,sc:.5+o(-.05,.05,L),v:r*o(.0015,.004,L),w:o(.05,.075,L),gain:o(.3,.5,L)*(n?.7:.5),rb:.45,dy:-o(10,50,L)*f,fold:r*o(30,55,L)*f,fk:o(2.2,3.2,L),rs:0,rsv:r*30,life:.13*u,dur:u}),n&&E0.push({ci:i,sc:.5-r*o(.1,.15,L),v:-r*o(.001,.003,L),w:o(.035,.05,L),gain:.3,rb:.2,dy:o(-20,30,L)*l,fold:-r*o(12,24,L)*l,fk:o(3,4.5,L),rs:0,rsv:0,life:.16*u,dur:u*.8})}}}const Pt=(s,i)=>{let a=null,n=1e9;for(let r=0;r<Q.length;r++){const u=Q[r];if(!(u.kind===1||u.kind===2))for(let l=.2;l<=.8;l+=.008){const f=ce(u,l,u.hb+4),p=ce(u,l,u.hb+70);if(!f||!p)continue;const h=p[0]-f[0],N=p[1]-f[1],y=s-f[0],R=i-f[1],H=K((y*h+R*N)/(h*h+N*N+1e-9),0,1),G=Math.hypot(y-h*H,R-N*H)*(1+.15*r);G<n&&(n=G,a={i:r,s:l})}}return a},Xe=s=>{let i=0;for(const a of E0)a.ci===s.ci&&i++;i<6&&E0.push(s)},co=(s,i,a)=>{const[n,r]=At(s,i);let u=-150,l=1400;for(let f=0;f<16;f++){const p=.5*(u+l),h=p+(s.hb+6)*Se,N=M(n,h,s.hb+6-(n*n+h*h)*xe);N&&N[1]<a?l=p:u=p}return K(.5*(u+l)-r,-150,150)},X0=[v()*D,v()*D,v()*D],s0={t:o(0,40,v),per:o(80,120,v),a:[o(0,.3,v),o(.55,.95,v)],b:[o(.7,1,v),o(.6,.98,v)]};if(v()<.5){const s=s0.a;s0.a=s0.b,s0.b=s}const W={t:I0?o(3,8,v):1e9,on:0,dur:1,a:[0,0],b:[0,0]},ue=r0?M(r0[0],r0[1],r0[2]-L0):null,le=D0?M(q[0]*1e3,q[1]*1e3,q[2]*1e3):null,Lt=Math.hypot(q[0],q[1])||1,St=[q[0]/Lt,q[1]/Lt],uo=D0===2?ye>0?.5:0:.07;let R0=null,Oe=0;if(v0){R0=M(v0[0],v0[1],v0[2]-L0);const s=M(v0[0],v0[1],v0[2]+10-L0);R0&&s&&(Oe=s[1]-R0[1])}const lo=o(.25,.7,v)*(v()<.5?-1:1);let Dt=0,fe=0,Ke=o(20,50,v);const je=t.sound,O0=16e3;let Pe=new Float32Array(4096),Ye=22222,Qe=0,$e=0,Le=0,Ze=0,he=.25,Je=0;const N0=[];let et=o(2,7,v),tt=o(8,20,v),ot=o(12,35,v);const fo=()=>(Ye=Ye*1103515245+12345&2147483647,Ye/1073741824-1),Nt=(s,i)=>{N0.length<5&&N0.push({k:0,f:i||o(2200,4200,v),ph:0,a:s,n:Math.round(o(.35,.9,v)*O0),type:0,pan:0})},zt=s=>{N0.length<5&&N0.push({k:0,f:o(38,62,v),ph:0,a:s,n:Math.round(o(1.4,2.4,v)*O0),type:1})},ho=s=>{Pe.length<s&&(Pe=new Float32Array(s));for(let i=0;i<s;i++){const a=fo();Qe+=(a-Qe)*.012,$e+=(Qe-$e)*.05,Le+=(a-Le)*.06,Ze+=(Le-Ze)*.25;let n=$e*2.6+(Le-Ze)*he*1.4;for(let r=N0.length-1;r>=0;r--){const u=N0[r],l=u.k/u.n;if(u.type===0){const f=u.f*Math.pow(.07,Math.pow(l,.55));u.ph+=D*f/O0,n+=Math.sin(u.ph)*u.a*Math.exp(-l*5)*Math.min(1,u.k/40)*.5}else u.ph+=D*u.f*(1-.3*l)/O0,n+=(Math.sin(u.ph)*.8+a*.25*Math.exp(-l*30))*u.a*Math.exp(-l*4)*Math.min(1,u.k/30)*.9;++u.k>=u.n&&N0.splice(r,1)}Pe[i]=Math.max(-1,Math.min(1,n*.6))}return Pe.subarray(0,s)},mo=()=>{const s=5+Math.floor(v()*5),i=o(53,57,v),a=o(.42,.6,v),n=o(-.8,.8,v);for(let r=0;r<s;r++)je.note(i-r*.12,{dur:.22,vel:.22,wave:"sine",cutoff:900,pan:n,at:r*a*(1-r*.02)})},me=new Float32Array(12),ve=new Float32Array(8),at=new Float32Array(24),rt=new Float32Array(24),w0=[0,0,0],K0=new Float32Array(7),nt=new Float32Array(7),pe=new Float32Array(28);let l0=0,xo=0;const Ft=(s,i)=>{i=Math.min(Math.max(i||0,0),.25),l0+=i;const a=t.input,n=a.taps(),r=a.x,u=1-a.y;if(a.down&&a.inside){qe||(He=0,Re=0,Ae=r,Ee=u),He+=i;const c=(r-Ae)/Math.max(i,.001),m=(u-Ee)/Math.max(i,.001),d=Math.hypot(c,m);if(Re+=Math.hypot(r-Ae,u-Ee),Ve-=i,d>.12&&Ve<=0&&u>m0-.05){Ve=.16;const T=Pt(r,u);if(T){const Y=Q[T.i],X=ce(Y,T.s,Y.hb+6),x0=ce(Y,T.s+.01,Y.hb+6);let F0=.02;if(X&&x0){const Y0=x0[0]-X[0],h0=x0[1]-X[1],_t=Math.hypot(Y0,h0)+1e-6;F0=K((c*Y0+m*h0)/_t*.01/_t*1.4,-.12,.12)}const de=Y.kind===3?0:co(Y,T.s,u)*.85;Xe({ci:T.i,sc:T.s,v:F0,w:o(.045,.07,v),gain:.9,rb:.35,dy:de,fold:Y.kind===3?0:o(10,22,v)*(v()<.5?-1:1),fk:o(3,5,v),rs:0,rsv:F0*1500,life:0,dur:o(3.5,5,v)}),he=Math.min(1.2,he+.04)}}Re<.03&&He>.35&&(W0=!0),Re>.06&&(W0=!1),Ae=r,Ee=u}else qe&&W0&&se&&(ke=1),W0=!1;qe=a.down&&a.inside;for(const c of n){const m=1-c.y;if(m<m0-.01){Nt(.5,o(2500,4500,v)),v()<.35&&zt(.35);const d=c.x*2-1,T=m*2-1,Y=j*T0+T*b;if(Y<-.001){const X=L0/-Y;Te[0]=d*X,Te[1]=(j*b-T*T0)*X,ie=0}}else{const d=Pt(c.x,m);if(d)for(const T of[-1,1])Xe({ci:d.i,sc:d.s,v:T*o(.03,.05,v),w:.028,gain:.8,rb:1,dy:0,fold:o(3,8,v),fk:6,rs:0,rsv:T*220,life:0,dur:1.7})}}if(W0?(Tt+=i,V=Math.min(1.2,V+i*.28),V>.65&&(se=!0)):(Tt=0,V=Math.max(ne+Math.max(e0,0),V-i*.055),V<ne+.42&&(se=!1)),n0+=((se?1:0)-n0)*Math.min(1,i*(se?.7:.16)),ke=Math.max(0,ke-i*.035),Ge-=i,Ge<=0){Ge=o(4,10,v)*(a.inside?1.8:1);const c=Q.map((m,d)=>d).filter(m=>Q[m].kind===0||Q[m].kind===3);if(c.length){const m=c[Math.floor(v()*c.length)%c.length],d=v()<.5?-1:1;Xe({ci:m,sc:o(.38,.62,v),v:d*o(.008,.025,v),w:o(.03,.06,v),gain:o(.4,.9,v),rb:.25,dy:o(-45,45,v),fold:o(10,28,v)*d,fk:o(3,5,v),rs:0,rsv:d*60,life:0,dur:o(5,8,v)})}}Ie-=i,Ie<=0&&(Ie=o(45,80,v),e0=1e-4),e0>0?(e0+=i*.05,e0>.7&&(e0=-.35)):e0<0&&(e0+=i*.05,e0>=0&&(e0=0));const f=e0>0?e0*.5:-e0;W0||(V=Math.max(V,ne+f+io*Math.exp(-l0/50)));for(const c of Q)c.sgs.length=0;for(let c=E0.length-1;c>=0;c--){const m=E0[c];if(m.life+=i,m.life>m.dur){E0.splice(c,1);continue}m.sc+=m.v*i,m.rs+=m.rsv*i;const d=m.life/m.dur,T=g0(0,.12,d)*(1-g0(.45,1,d)),Y=g0(0,.1,d)*(1-g0(.6,1,d));m.pg=m.gain*T,m.prb=m.rb*T,m.pdy=m.dy*Y,m.pfold=m.fold*T;const X=Q[m.ci];X&&X.sgs.length<6&&X.sgs.push(m)}We=Math.exp(-l0/50);const p=1+1.6*V+.8*n0,h=K(.74+.3*(.5*(Math.sin(l0*.0291+X0[0])-Math.sin(X0[0]))+.32*(Math.sin(l0*.0667+X0[1])-Math.sin(X0[1]))+.18*(Math.sin(l0*.151+X0[2])-Math.sin(X0[2]))),.3,1.15);let N=0,y=0,R=0;for(const c of Q){for(const h0 of c.my)h0.ph+=h0.w*i*p;for(const h0 of c.mx)h0.ph+=h0.w*i*p;c.ampE=(1+.6*V+.5*n0)*(c.kind===2?.2:1)*K((c.D+80)/480,.3,1)*(1+(c.open-1)*We);const m=Math.max(c.D,60);c.ay0E=Math.min(c.my[0].a*c.ampE,.35*m),c.ayE=Math.min(c.my[1].a*c.ampE,1.1*c.L/(Math.PI*c.my[1].k*1.24),.42*m),c.axE=Math.min(c.mx[0].a*c.ampE,1.12*c.L/(Math.PI*c.mx[0].k*1.24)),c.D=P0(c.D0,c.Dc,n0*(c.kind===1?.3:c.kind===3?0:1));const d=K(1-c.D/220,0,1.4);c.near=c.kind===0?1.1*d:0,c.envPh+=.012*i*p,c.trvPh+=c.travel*p*i,c.rayOff+=c.raySpeed*i*p,c.slice+=c.sliceSpeed*i*(1+2.5*V+n0);const T=.85+.15*Math.sin(l0*.11+c.seed*3)+.08*Math.sin(l0*.37+c.seed);c.bright=c.bright0*T*(.45+.75*h)*(1+.3*V)*(1-.22*n0)*(1-.45*Math.min(d,1))*(c.kind===2?1/(1+1.5*V):1),c.rayK=c.rayScale*(1+1.6*K(1-c.D/250,0,1)),c.rays=K(c.rays0*(.4+.8*h)+(c.kind===0?.45*V+.4*n0:0),0,1),c.red=re.red*(1+1.2*V)*(q0?.45:1),c.pink=Z===3?0:re.pink+.18*Math.max(0,V-.3)*(c.kind===0?1:0),c.pulseA=c.kind===3?1:ke*.8;const Y=K(1-c.D/450,0,1),X=.25+.75*Y;let x0=0;for(const h0 of c.sgs)x0+=h0.pg*h0.w*3;const F0=c.bright*X*(1+x0)*(c.kind===1?.6:1)*(c.kind===3?.45:1),de=c.kind===2?.3:re.green,Y0=c.kind===2?.5:c.red*.45;N+=F0*(.09*de+1*Y0+.9*c.pink*.3),y+=F0*(1*de+.07*Y0+.12*c.pink*.3),R+=F0*(.3*de+.13*Y0+.6*c.pink*.3+(c.kind===2?.5:0))}const H=.0145,G=1/(1+2.4*y*H);w0[0]=(N+.22*y)*H*G,w0[1]=y*H*G,w0[2]=(R+.32*y)*H*G,K0.fill(0),nt.fill(0);for(const c of Q){if(c.kind===2)continue;const m=c.bright*(c.kind===1?.5:1);for(let d=0;d<9;d++){const T=ce(c,.18+.64*d/8,c.hb+22);if(!T||T[1]<m0-.08)continue;const Y=K(T[0],-.15,1.15)*6;for(let X=0;X<7;X++){const x0=Math.max(0,1-Math.abs(Y-X)/2.6);x0>0&&(K0[X]+=m*x0,nt[X]+=m*x0*T[1])}}}let j0=0;for(let c=0;c<7;c++)j0+=K0[c]/7;for(let c=0;c<7;c++){const m=c*4,d=j0>1e-4?K(K0[c]/j0,.6,1.3):1;pe[m]=w0[0]*d,pe[m+1]=w0[1]*d,pe[m+2]=w0[2]*d,pe[m+3]=K0[c]>1e-4?K(nt[c]/K0[c],m0,m0+.34):m0+.15}Ke-=i,Ke<=0&&(Ke=o(25,60,v),fe=o(2,6,v)),fe>0&&(fe-=i),Dt=.05*Math.sin(l0*11.3)*Math.sin(l0*3.1+1)+(fe>0?-.35*g0(0,.6,fe):0),s0.t+=i;const z0=s0.t%s0.per/(s0.per*.75),A=z0<1?[P0(s0.a[0],s0.b[0],z0),P0(s0.a[1],s0.b[1],z0)]:null;if(W.t-=i,W.t<=0&&W.on<=0){W.on=W.dur=o(.6,1.3,v);const c=o(.1,.9,v),m=o(.65,.95,v),d=o(-2.6,-.5,v),T=o(.15,.35,v);W.a=[c,m],W.b=[c+Math.cos(d)*T,m+Math.sin(d)*T],W.t=o(10,26,v)}let w=null;W.on>0&&(W.on-=i,w=1-Math.max(W.on,0)/W.dur),e.bindFramebuffer(e.FRAMEBUFFER,Mt),e.viewport(0,0,Me,Me),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE);const S=B.aur,z=S.u;e.useProgram(S.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,B.rayT),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,B.noiseT),e.uniform4fv(z.uCam,ae),e.bindVertexArray(B.gridVao);const f0=l0%7e3;for(const c of Q){for(let m=0;m<3;m++){const d=c.my[m];me[m*4]=m===1?c.ayE:m===0?c.ay0E:d.a*c.ampE,me[m*4+1]=d.k,me[m*4+2]=d.ph%D,me[m*4+3]=m===1?c.envPh%D:0}for(let m=0;m<2;m++){const d=c.mx[m];ve[m*4]=m===0?c.axE:d.a*c.ampE,ve[m*4+1]=d.k,ve[m*4+2]=d.ph%D,ve[m*4+3]=m===0?c.twist*K(1.25-c.D/180,.1,1):0}for(let m=0;m<6;m++){const d=c.sgs[m];d?(at.set([d.sc,d.w,d.pg,d.prb],m*4),rt.set([d.pdy,d.pfold,d.fk,d.rs],m*4)):(at.set([-9,1,0,0],m*4),rt.set([0,0,0,0],m*4))}e.uniform4f(z.uB0,c.D,c.L,c.bright*no/kt,c.kind),e.uniform4f(z.uB1,c.bow*(1-.85*n0),c.tilt*(1-.85*n0),c.trvPh%256,.34*K(V+n0,0,1)),e.uniform4fv(z.uMy,me),e.uniform4fv(z.uMx,ve),e.uniform4f(z.uH,c.hBot,c.hTop,Se,xe),e.uniform4fv(z.uSA,at),e.uniform4fv(z.uSB,rt),e.uniform4f(z.uRay,c.rays,c.rayK,c.rayOff,c.slice),e.uniform4f(z.uPat,c.patch*(1-.4*We),c.pulseA,f0,c.seed),e.uniform4f(z.uProf,c.hb,c.Hg*(1+.25*V),c.red,c.pink),e.uniform4f(z.uProf2,c.soft*(c.kind===0&&c.bright0>1?.6:1)*(1+c.near),c.kind===2?1:re.green,q0&&c.kind===0?1:0,c.near),e.drawElements(e.TRIANGLES,B.nIdx,e.UNSIGNED_SHORT,0)}e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,x,x);const d0=B.comp,F=d0.u;e.useProgram(d0.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,yt),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,wt),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,gt),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,B.noiseT),e.uniform4fv(F.uCam,ae);const vo=D0===2?1.25:1.7;e.uniform4f(F.uAL,w0[0],w0[1],w0[2],vo),e.uniform4fv(F.uBin,pe),ie+=i,e.uniform4f(F.uTap,Te[0],Te[1],.6+9*ie,ie<5?.09*Math.exp(-ie*1.1):0),e.uniform4f(F.uRf,C===0?.006:.012,.013,kt,.007),e.uniform4f(F.uMoonR,St[0],St[1],q[2],le?uo:0),e.uniform4f(F.uMoonS,le?le[0]:.5,le?le[1]:.9,0,0);const st=H0[3];if(e.uniform4f(F.uLamp,ue?ue[0]:0,ue?ue[1]:0,ue?.012:0,Dt),e.uniform4f(F.uLampC,1*st,.56*st,.22*st,0),e.uniform4f(F.uSmk,R0?R0[0]:0,R0?R0[1]:0,Math.max(Oe,.001)*1.6,f0),e.uniform4f(F.uSmk2,lo,R0&&Oe>0?E===3?.7:1:0,1,0),e.uniform4f(F.uSat,A?A[0]:0,A?A[1]:0,A?.55*g0(0,.08,z0)*(1-g0(.85,1,z0)):0,x),w!==null){const c=g0(0,1,w),m=P0(W.a[0],W.b[0],c),d=P0(W.a[1],W.b[1],c),T=.35+.65*Math.min(1,w*2);e.uniform4f(F.uMet,m,d,P0(m,W.a[0],T),P0(d,W.a[1],T)),e.uniform4f(F.uMet2,2.2*Math.sin(Math.PI*Math.min(1,w))+.2,0,0,0)}else e.uniform4f(F.uMet2,0,0,0,0);if(e.bindVertexArray(B.vao0),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),je.on){Je+=i,he+=(.22+.12*Math.sin(Je*.13)*Math.sin(Je*.31+1)-he)*Math.min(1,i*.4),et-=i,et<=0&&(et=o(3,11,v),Nt(o(.2,.5,v))),tt-=i,tt<=0&&(tt=o(14,38,v),zt(o(.3,.6,v))),ot-=i,ot<=0&&(ot=o(40,90,v),mo());const c=Math.round(Math.min(i,.2)*O0);c>0&&je.pcm(ho(c),O0,{vel:.6})}};return B0(e,B,"aur"),B0(e,B,"comp"),Ft(0,0),Ft}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
