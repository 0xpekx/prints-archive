// Candle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/036.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Uo){Uo&&function(){"use strict";const _o=new WeakMap,R=Math.PI*2,V=(i,o,x)=>i<o?o:i>x?x:i,Et=(i,o,x)=>i+(o-i)*x,Bo=(()=>{const o=[],x=[.25,.5,.75,1];for(let u=0;u<4;u++){const y=[];let P=x[u];for(let S=0;S<4;S++)y.push(P),P*=x[u];for(let S=0;S<4;S++)y.push(u===S?1:0);o.push(y)}for(let u=0;u<4;u++){let y=u;for(let b=u+1;b<4;b++)Math.abs(o[b][u])>Math.abs(o[y][u])&&(y=b);const P=o[u];o[u]=o[y],o[y]=P;const S=o[u][u];for(let b=0;b<2*4;b++)o[u][b]/=S;for(let b=0;b<4;b++)if(b!==u){const w=o[b][u];for(let M=0;M<2*4;M++)o[b][M]-=w*o[u][M]}}return o.map(u=>u.slice(4))})(),Do=[0,0,0,0],Xo=[],en=i=>{let o=Xo[i];if(o)return o;o=Xo[i]=new Float32Array(2*i+1);let x=0;for(let u=-i;u<=i;u++){const y=Math.exp(-(u*u)/(i*i*.5));o[u+i]=y,x+=y}for(let u=0;u<=2*i;u++)o[u]/=x;return o},f0=(i,o,x)=>{const u=V((x-i)/(o-i),0,1);return u*u*(3-2*u)},ge=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Go=`#version 300 es
uniform vec4 uRect;
out vec2 vUv;
void main() { vec2 p = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)); vUv = mix(uRect.xy, uRect.zw, p); gl_Position = vec4(vUv * 2.0 - 1.0, 0.0, 1.0); }`,Te=`
vec3 enc(vec3 c) { return pow(clamp(c * 0.25, 0.0, 1.0), vec3(1.0 / 3.0)); }
vec3 dec(vec3 c) { return c * c * c * 4.0; }
float hash12(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec3 tone(vec3 c) { c = max(c, 0.0); c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14); return pow(clamp(c, 0.0, 1.0), vec3(0.4545)); }
vec3 camRay(vec2 uv, vec3 cx, vec3 cy, vec3 cz, float tn) { return normalize(cz + (uv.x * 2.0 - 1.0) * tn * cx + (uv.y * 2.0 - 1.0) * tn * cy); }
`,Oo=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
#ifdef BOT
uniform sampler2D uBw, uBc;  // the bottle candle's wax map
#endif
uniform vec3 uCam, uCX, uCY, uCZ;
uniform vec4 uV;        // tanHalf, focus dist, coc scale, mode (0 ambient, 1 flame light)
uniform vec4 uL0, uL1;  // flame light positions, w = power
uniform vec4 uPa[14], uPb[14], uPc[14];
uniform int uNP;
uniform vec4 uS;        // setting, wallZ, niche half width, niche arch centre y
uniform vec4 uW;        // window x0 x1 y0 y1 on the wall
uniform vec4 uO;        // outside kind (0 moon 1 lamp 2 dark), snow, rain, mullion x
uniform vec4 uCd, uCd2; // candles: cx cz R yTop (R 0 = none)
uniform vec4 uGl;       // the water glass: x z r top (r 0 = none)
uniform float uGw;
uniform vec3 uTab, uWal, uAmb, uCw;
uniform float uTz;      // the table's front edge (z); beyond it the room falls away into the dark
uniform vec4 uBk[10];
uniform int uNB, uIt, uNL;
#ifdef BOT
#define NLC 1
#else
#define NLC uNL
#endif
${Te}
vec4 T(vec2 p) { return textureLod(uN, p, 0.0); }
float nz(vec2 p) { return T(p).r; }
float iBox(vec3 ro, vec3 rd, vec3 c, vec3 h, out vec3 n) {
  vec3 m = 1.0 / rd, k = abs(m) * h, q = m * (ro - c), t1 = -q - k, t2 = -q + k;
  float tn = max(max(t1.x, t1.y), t1.z), tf = min(min(t2.x, t2.y), t2.z);
  if (tn > tf || tn < 0.0) return 1e9;
  n = -sign(rd) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz);
  return tn;
}
float iCyl(vec3 ro, vec3 rd, vec2 c, float y0, float y1, float r, out vec3 n) {
  vec2 oc = ro.xz - c; float a = dot(rd.xz, rd.xz), b = dot(oc, rd.xz), cc = dot(oc, oc) - r * r, h = b * b - a * cc, t = 1e9;
  if (h >= 0.0) { float tt = (-b - sqrt(h)) / a, y = ro.y + rd.y * tt; if (tt > 0.0 && y > y0 && y < y1) { t = tt; vec2 q = oc + rd.xz * tt; n = vec3(q.x, 0.0, q.y) / r; } }
  float tc = (y1 - ro.y) / rd.y; vec2 q = oc + rd.xz * tc;
  if (tc > 0.0 && tc < t && dot(q, q) < r * r) { t = tc; n = vec3(0.0, 1.0, 0.0); }
  return t;
}
float iEll(vec3 ro, vec3 rd, vec3 c, vec3 r, out vec3 n) {
  vec3 oc = (ro - c) / r, d = rd / r; float a = dot(d, d), b = dot(oc, d), cc = dot(oc, oc) - 1.0, h = b * b - a * cc;
  if (h < 0.0) return 1e9; float t = (-b - sqrt(h)) / a; if (t < 0.0) return 1e9;
  n = normalize((oc + d * t) / r); return t;
}
float sCyl(vec3 p, vec2 c, float y0, float y1, float r) { vec2 d = vec2(length(p.xz - c) - r, abs(p.y - (y0 + y1) * 0.5) - (y1 - y0) * 0.5); return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)); }
float scene(vec3 p) {
  float d = sCyl(p, uCd.xy, 0.0, uCd.w, uCd.z);
  if (uCd2.z > 0.0) d = min(d, sCyl(p, uCd2.xy, 0.0, uCd2.w, uCd2.z));
  for (int i = 0; i < uNP; i++) {
    vec4 A = uPa[i], B = uPb[i]; float e;
    if (B.w > 8.5 && B.w < 9.5) continue;
    if (A.w < 0.5) { vec3 q = abs(p - A.xyz) - B.xyz; e = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); }
    else if (A.w < 1.5) e = sCyl(p, A.xz, A.y, B.y, B.x);
    else { vec3 q = (p - A.xyz) / B.xyz; float k0 = length(q), k1 = length(q / B.xyz); e = k0 * (k0 - 1.0) / max(k1, 1e-4); }
    d = min(d, e);
  }
  return d;
}
float shadow(vec3 p, vec3 l, float maxT) {
  float res = 1.0, t = 0.12;
  for (int i = 0; i < uIt; i++) { float h = scene(p + l * t); res = min(res, 9.0 * h / t); t += clamp(h, 0.1, 1.6); if (res < 0.01 || t > maxT) break; }
  return clamp(res, 0.0, 1.0);
}
// the night outside the window, as seen along rd
vec3 outside(vec3 ro, vec3 rd) {
  float T = (uS.y - 260.0 - ro.z) / rd.z; vec2 P = ro.xy + rd.xy * T;
  float k = uO.x;
  vec3 sky = k < 0.5 ? mix(vec3(0.010, 0.016, 0.034), vec3(0.030, 0.045, 0.085), clamp(P.y / 160.0, 0.0, 1.0))
           : k < 1.5 ? mix(vec3(0.050, 0.026, 0.012), vec3(0.016, 0.012, 0.016), clamp(P.y / 160.0, 0.0, 1.0))
           : vec3(0.004, 0.005, 0.008);
  if (uO.y > 0.5) sky = sky * 1.8 + vec3(0.010, 0.012, 0.016);
  float ridge = 25.0 + 40.0 * nz(vec2(P.x * 0.0012, 0.3)) + 18.0 * step(0.5, fract(P.x / 70.0 + nz(vec2(P.x * 0.004, 0.7))));
  if (P.y < ridge) {
    sky = k < 0.5 ? vec3(0.004, 0.006, 0.010) : k < 1.5 ? vec3(0.012, 0.007, 0.005) : vec3(0.002);
    if (uO.y > 0.5) sky += vec3(0.05, 0.055, 0.065) * smoothstep(ridge - 6.0, ridge - 1.0, P.y);
  }
  for (int i = 0; i < uNB; i++) {
    vec4 b = uBk[i]; float d = length(P - b.xy) / b.z;
    if (d > 1.05) continue;
    vec3 bc = b.w < 0.5 ? vec3(1.0, 0.55, 0.20) : b.w < 1.5 ? vec3(1.0, 0.78, 0.45) : vec3(0.55, 0.65, 0.9);
    sky += bc * (1.0 - smoothstep(0.9, 1.0, d)) * (0.05 + 0.06 * smoothstep(0.6, 0.98, d)) * (0.8 + 0.4 * nz(P * 0.02 + float(i)));
  }
  if (k < 0.5) { vec2 m = P - vec2(-120.0, 190.0); sky += vec3(0.05, 0.06, 0.09) * exp(-dot(m, m) / 9000.0); }
  return sky;
}
void main() {
  vec3 ro = uCam, rd = camRay(vUv, uCX, uCY, uCZ, uV.x);
  float set = uS.x, wz = uS.y, t = 1e9, mat = -1.0; vec4 hA = vec4(0.0), hB = vec4(0.0), hC = vec4(0.0); vec3 n = vec3(0.0, 1.0, 0.0), alb = vec3(0.5), nn;
  // table / sill / niche floor
  float tt = -ro.y / rd.y;
  if (tt > 0.0) { vec3 p = ro + rd * tt; if (p.z > wz && p.z < uTz) { t = tt; mat = 10.0; n = vec3(0.0, 1.0, 0.0); } }
  // walls
  if (set > 1.5 && set < 2.5) {
    float nw = uS.z, ay = uS.w, zf = wz + 13.0;
    tt = (zf - ro.z) / rd.z; vec3 p = ro + rd * tt;
    bool open = abs(p.x) < nw && (p.y < ay || length(vec2(p.x, p.y - ay)) < nw);
    if (!open && tt > 0.0 && p.y > 0.0) { t = tt; mat = 12.0; n = vec3(0.0, 0.0, 1.0); }
    else {
      tt = (wz - ro.z) / rd.z; if (tt > 0.0 && tt < t) { t = tt; mat = 12.0; n = vec3(0.0, 0.0, 1.0); }
      for (int s = 0; s < 2; s++) { float sx = s == 0 ? -nw : nw; tt = (sx - ro.x) / rd.x; vec3 q = ro + rd * tt; if (tt > 0.0 && tt < t && q.z < zf && q.z > wz && q.y > 0.0 && q.y < ay) { t = tt; mat = 12.0; n = vec3(-sign(sx), 0.0, 0.0); } }
      vec2 oc = ro.xy - vec2(0.0, ay); float a = dot(rd.xy, rd.xy), b = dot(oc, rd.xy), cc = dot(oc, oc) - nw * nw, h = b * b - a * cc;
      if (h > 0.0) { tt = (-b + sqrt(h)) / a; vec3 q = ro + rd * tt; if (tt > 0.0 && tt < t && q.y > ay && q.z < zf && q.z > wz) { t = tt; mat = 12.0; n = normalize(vec3(-q.x, ay - q.y, 0.0)); } }
    }
  } else {
    tt = (wz - ro.z) / rd.z; vec3 p = ro + rd * tt;
    if (tt > 0.0 && tt < t && p.y > 0.0) {
      t = tt; n = vec3(0.0, 0.0, 1.0); mat = 11.0;
      if (p.x > uW.x && p.x < uW.y && p.y > uW.z && p.y < uW.w) {
        float fw = 1.6, mw = 0.9;
        float dx = min(p.x - uW.x, uW.y - p.x), dy = min(p.y - uW.z, uW.w - p.y);
        float mul = min(abs(fract((p.x - uO.w) / 30.0 + 0.5) - 0.5) * 30.0, abs(p.y - (set < 0.5 ? uS.w : (uW.z + uW.w) * 0.5)));
        mat = (min(dx, dy) < fw || mul < mw) ? 13.0 : 14.0;
        if (mat > 13.5 && min(dx, dy) < fw + 0.5) n = normalize(vec3(0.0, 0.0, 1.0));
      }
    }
  }
  // props
  for (int i = 0; i < uNP; i++) {
    vec4 A = uPa[i], B = uPb[i];
    if (B.w > 8.5 && B.w < 9.5) continue;
    float ti = A.w < 0.5 ? iBox(ro, rd, A.xyz, B.xyz, nn) : A.w < 1.5 ? iCyl(ro, rd, A.xz, A.y, B.y, B.x, nn) : iEll(ro, rd, A.xyz, B.xyz, nn);
    if (ti < t) { t = ti; n = nn; mat = B.w; hC = uPc[i]; alb = hC.rgb; hA = A; hB = B; }
  }
#ifdef BOT
  {
    // the neck under its collar of old wax: step the ray in from a bounding cylinder until it reaches the wax surface
    float na = dot(rd.xz, rd.xz), nb = dot(ro.xz, rd.xz), nc = dot(ro.xz, ro.xz) - 3.5, nh = nb * nb - na * nc;
    if (nh > 0.0) {
      nh = sqrt(nh); float tm = (-nb - nh) / na, ne = (-nb + nh) / na, dm = (ne - tm) / float(uIt * 2), prev = 0.0;
      bool hitN = false;
      for (int i = 0; i < uIt * 2 && tm < t; i++, tm += dm) {
        vec3 q = ro + rd * tm;
        if (q.y > 10.4 && q.y < 13.8) {
          float rq = length(q.xz), tb = textureLod(uBw, vec2(atan(q.z, q.x) / 6.2831853 + 0.5, (13.2 - q.y + 0.55 * max(rq - 1.25, 0.0)) / 14.0), 0.0).r * 0.7, f = rq - 1.25 - 0.85 * (1.0 - 0.82 * smoothstep(12.2, 13.3, q.y)) * tb + 1.7 * max(q.y - 13.08 - 0.9 * tb, 0.0);
          if (f < 0.0) { tm -= dm * f / (f - prev + 1e-4); hitN = true; break; }
          prev = f;
        }
      }
      if (hitN) { t = tm; vec3 q = ro + rd * t; mat = 2.0; n = normalize(vec3(q.x, 0.35 * length(q.xz), q.z)); hC = vec4(0.03, 0.03, 0.017, 0.0); alb = hC.rgb; }
    }
  }
#endif
  vec3 p = ro + rd * t, col = vec3(0.0);
  float mode = uV.w, rough = 0.6, spec = 0.04, win = 0.0, wcv = 0.0, angB = 0.0, bH = 0.0, bCav = 1.0;
  // materials: choose two noise coordinates, sample once each, then shade (few samples keep the compile fast)
  int M = int(mat + 0.5);
  vec2 c1 = p.xz * 0.05, c2 = p.xz * 0.2, sp = p.xy;
  if (M == 10) { c1 = set < 0.5 ? p.xz * 0.05 : set < 1.5 ? vec2(p.x * 0.006, p.z * 0.11) : set < 2.5 ? p.xz * 0.04 : vec2(p.x * 0.008, p.z * 0.09 + floor(p.z / 11.0) * 0.37); c2 = set < 0.5 ? p.xz * vec2(0.4, 0.04) : p.xz * 0.15; }
  else if (M == 11) { c1 = vec2(p.x * 0.015 - p.y * 0.012, p.x * 0.012 + p.y * 0.015) + 0.4; c2 = set > 2.5 ? floor(p.xy / 7.5) * 0.31 : vec2(p.x * 0.14 + p.y * 0.1, p.y * 0.14 - p.x * 0.1) * 1.0; }
  else if (M == 12) { sp = abs(n.z) > 0.5 ? p.xy : abs(n.x) > 0.5 ? p.zy : p.xz; vec2 bc = sp / vec2(11.0, 6.5); bc.x += 0.5 * floor(bc.y); c1 = sp * 0.05; c2 = floor(bc) * 0.173 + sp * 0.03; }
  else if (M == 13 || M == 1) c2 = p.xy * 0.3 + p.z * 0.1;
  
#ifdef BOT
  else if (M == 2) { angB = atan(p.z, p.x); c1 = vec2(angB * 0.35, p.y * 0.05); c2 = vec2(angB * 1.1, p.y * 0.17); }
#endif
  else if (M == 6) c1 = vec2(p.x * 0.01, p.z * 0.2);
  else if (M == 4 || M == 5) { c1 = (p.xz - hA.xz) * 0.3; c2 = p.xz * 0.6 + p.y; }
  vec4 N1 = T(c1), N2 = T(c2);
  if (mat < -0.5 || t > 5e8) alb = vec3(0.0);
  else if (M == 10) {
    if (set < 0.5) { alb = uTab * (0.9 + 0.2 * N1.r) * (0.9 + 0.12 * N2.r); spec = 0.05; rough = 0.5; }
    else if (set < 1.5) { float g = 0.5 + 0.5 * sin(N1.r * 40.0 + p.z * 0.6); alb = uTab * (0.75 + 0.4 * g) * (0.85 + 0.3 * N2.a); spec = 0.35; rough = 0.25; }
    else if (set < 2.5) { alb = uTab * (0.7 + 0.5 * N1.a) * (0.85 + 0.3 * N2.r); spec = 0.03; }
    else { float seam = smoothstep(0.012, 0.0, abs(fract(p.z / 11.0) - 0.5) - 0.48); alb = uTab * (0.8 + 0.35 * (0.5 + 0.5 * sin(N1.r * 30.0))) * (1.0 - 0.6 * seam); spec = 0.08; rough = 0.45; }
  } else if (M == 11) {
    alb = uWal * (0.85 + 0.3 * N1.a) * (0.92 + 0.12 * N2.r) * (set < 0.5 && p.y < uW.z ? 0.45 : 1.0);
    if (set > 0.5 && set < 1.5) alb *= 0.9 + 0.1 * step(0.5, fract(p.x / 6.0));
    if (set > 2.5) { vec2 f = abs(fract(p.xy / 7.5) - 0.5); alb = uWal * (0.9 + 0.15 * N2.r) * (1.0 - 0.5 * smoothstep(0.455, 0.49, max(f.x, f.y))); spec = 0.25; rough = 0.2; }
  } else if (M == 12) {
    vec2 bc = sp / vec2(11.0, 6.5); bc.x += 0.5 * floor(bc.y); vec2 f = abs(fract(bc) - 0.5);
    alb = uWal * (0.75 + 0.4 * N1.r) * (0.8 + 0.35 * N2.g) * (1.0 - 0.55 * smoothstep(0.44, 0.49, max(f.x, f.y))) * (0.9 + 0.2 * N2.b);
  } else if (M == 13) { alb = vec3(0.30, 0.27, 0.23) * (0.8 + 0.3 * N2.b) * (set < 0.5 ? 0.45 : 1.0); spec = 0.1; }
  else if (M == 14) { win = 1.0; alb = vec3(0.0); }
  else if (M == 1) {
    // worked metal, tarnished unevenly
    alb = hC.rgb * (0.85 + 0.25 * N2.b) * (0.6 + 0.5 * N1.r); spec = 1.4; rough = 0.3;
  }
#ifdef BOT
  else if (M == 2) {
    // a green bottle under the map of old wax built in make(): thickness, gradient, cavity; colour, shine
    float bs = 13.2 - p.y + 0.55 * max(length(p.xz) - 1.25, 0.0);
    vec2 bu = vec2(angB / 6.2831853 + 0.5, bs / 14.0);
    vec4 b1 = textureLod(uBw, bu, 0.0), b2 = textureLod(uBc, bu, 0.0);
    bH = b1.r * 0.7; wcv = smoothstep(0.012, 0.06, bH); bCav = b1.a;
    vec2 gr = (b1.gb - 0.5) * 6.0;
    vec3 tg = vec3(-sin(angB), 0.0, cos(angB));
    n = normalize(n - (tg * gr.x + cross(n, tg) * gr.y) * wcv);
    alb = mix(hC.rgb * (0.7 + 0.6 * N1.r), b2.rgb * b2.rgb * (0.93 + 0.14 * N2.r), wcv);
    spec = mix(0.7, 0.1 + 0.15 * b2.a, wcv); rough = mix(0.08, 0.6, wcv);
  }
#endif
  else if (M == 3) { spec = 0.4; rough = 0.2; }
  else if (M == 4) {
    vec3 q = p - hA.xyz;
    bool cover = abs(n.y) > 0.5 || abs(q.y) > hB.y - 0.3 || n.x < -0.5;
    alb = cover ? hC.rgb * (0.8 + 0.3 * N2.r) : vec3(0.62, 0.55, 0.42) * (0.85 + 0.15 * sin(q.y * 70.0)) * (0.9 + 0.1 * N1.b);
  } else if (M == 5) {
    vec3 q = p - hA.xyz;
    float top = smoothstep(0.0, 0.8, n.y), sl = smoothstep(0.75, 0.95, sin(q.x * 0.9 + q.z * 0.35));
    alb = mix(vec3(0.40, 0.20, 0.07), vec3(0.62, 0.38, 0.16), N1.r) * (1.0 - 0.3 * top);
    alb = mix(alb, vec3(0.78, 0.62, 0.40), sl * top * 0.8); alb = mix(alb, vec3(0.75), 0.25 * smoothstep(0.6, 0.8, N2.r) * top);
  } else if (M == 6) { alb = hC.rgb * (0.8 + 0.35 * (0.5 + 0.5 * sin(N1.r * 30.0))); spec = 0.06; }
  else if (M == 7) { spec = 0.5; rough = 0.12; if (n.y > 0.9 && length(p.xz - hA.xz) < hB.x - 0.35) { alb = vec3(0.05, 0.022, 0.01); spec = 0.8; rough = 0.04; } }
  else if (M == 15) {
    if (length(p.xz - hA.xz) > hB.x - 0.18 || abs(n.y) < 0.5) { alb = vec3(0.06, 0.05, 0.045); spec = 0.5; rough = 0.2; }
    else { alb = uTab * 0.55; spec = 0.9; rough = 0.05; }
  }
  vec3 V = -rd;
#ifdef AMB
  {
    // night: cool window fill + a faint bounce
    vec3 wc = vec3((uW.x + uW.y) * 0.5, (uW.z + uW.w) * 0.5, wz);
    vec3 wl = normalize(wc - p);
    float wf = set > 1.5 && set < 2.5 ? 0.15 : 1.0;
    col = alb * uAmb * (0.25 + 0.75 * max(dot(n, wl), 0.0) * wf + 0.15 * n.y);
    if (win > 0.5) {
      col = outside(p, rd);
      if (uO.y > 0.5) { col += vec3(0.05, 0.055, 0.06) * smoothstep(uW.z + 4.0, uW.z + 1.0, p.y) * (0.7 + 0.3 * nz(p.xy * 0.2)); }
    }
    col += spec * uAmb * 0.3 * pow(max(dot(reflect(rd, n), wl), 0.0), 8.0);
#ifdef BOT
    if (M == 2) col += (1.0 - wcv) * uAmb * pow(1.0 - abs(dot(n, V)), 3.0) * 0.5;
#endif
  }
#else
  {
    for (int k = 0; k < NLC; k++) {
      vec4 L = k == 0 ? uL0 : uL1;
      if (L.w <= 0.0) continue;
      vec3 lv = L.xyz - p; float d2 = dot(lv, lv), d = sqrt(d2); vec3 l = lv / d;
      float ndl = max(dot(n, l), 0.0);
      float sh = ndl > 0.0 && win < 0.5 ? shadow(p + n * 0.03, l, d - 0.8) : 0.0;
      if (M == 2) sh = max(sh, 0.8);
      vec3 lc = vec3(1.0, 0.62, 0.30) * L.w / (d2 + 2.0);
      vec3 h = normalize(l + V);
      float sp = pow(max(dot(n, h), 0.0), mix(8.0, 160.0, 1.0 - rough)) * mix(1.0, 8.0, 1.0 - rough);
      float dfk = spec > 1.0 ? 0.14 : 1.0;
      if (M != 2) col += lc * sh * (alb * ndl * dfk + (spec > 1.0 ? alb * 2.0 : vec3(spec)) * sp * ndl);
      col += alb * vec3(1.0, 0.62, 0.30) * L.w * 0.0006 * (0.6 + 0.4 * n.y);
#ifdef BOT
      if (M == 2) {
        vec3 lg = lc / (1.0 + 0.55 * lc.r);
        float fv = 1.0 - max(dot(n, V), 0.0), up = smoothstep(-0.1, 0.7, n.y), wt = exp(-bH / 0.14);
        // glass: a dark body with the flame's light caught at the rim, passing through the shoulder and its reflection
        vec3 gc = alb * lg * (0.3 + 0.6 * ndl);
        // (dark olive, a third of the old green, only on the upper half of the shoulder that faces the flame)
        float by = smoothstep(2.0, 11.0, p.y); gc += vec3(0.0042, 0.0042, 0.0018) * lg * by * by * up * (0.3 + 0.7 * (1.0 - fv));
        gc += vec3(0.30, 0.29, 0.11) * lg * 0.03 * smoothstep(7.0, 10.5, p.y) * up * (0.3 + 0.7 * (1.0 - fv));
        gc += vec3(0.5, 0.46, 0.2) * lg * 0.3 * up * fv * fv * fv * fv;
        vec3 rf = reflect(rd, n), mw = L.xyz - p; float ra = max(dot(mw, rf), 0.0), md = length(mw - rf * ra);
        gc += vec3(1.0, 0.8, 0.55) * lg * (exp(-md * md / 0.16) * 1.6 + exp(-md / 0.8) * 0.1 + pow(max(dot(n, h), 0.0), 180.0) * 0.8 + pow(max(dot(n, h), 0.0), 26.0) * 0.022);
        // wax: wrapped diffuse, darker in the cavities, the light through it where it's thin, and a soft shine on the rounded edges
        float wr = max(dot(n, l) * 0.6 + 0.42, 0.0);
        vec3 wx = alb * lg * (wr * sh * 0.55 + 0.07) * bCav * (1.0 - 0.32 * smoothstep(0.1, 0.5, bH)) + alb * vec3(2.2, 1.0, 0.7) * lg * wt * 0.32 * (0.5 + 0.5 * ndl);
        wx += lg * (pow(max(dot(n, h), 0.0), 14.0) * 0.05 + fv * fv * fv * 0.04) * bCav;
        col += mix(gc * vec3(0.24, 0.22, 0.2), wx, wcv * (1.0 - 0.4 * wt));
      }
#endif
      if (spec > 0.6) { vec3 rf = reflect(rd, n); float r3 = max(dot(rf, l), 0.0); r3 *= r3 * r3; col += alb * lc * (0.35 * (spec > 1.0 ? r3 * r3 * r3 * r3 * sh : r3) + 0.05 * (0.6 - 0.4 * rf.y)); }   // metal: a sheen where it mirrors the flame, not a wash
      if (win > 0.5) {
        vec3 lm = vec3(L.x, L.y, 2.0 * (wz - 0.4) - L.z), rr = reflect(rd, vec3(0.0, 0.0, 1.0));
        vec3 w = lm - p; float along = dot(w, rr), dd = length(w - rr * along);
        col += vec3(1.0, 0.65, 0.3) * L.w * 0.0009 * exp(-dd * dd / 0.35) * 30.0;
      }
    }
  }
#endif
  // the water glass (tea light): see through it with a tint, a rim and the flame's glints
  if (uGl.z > 0.0) {
    vec2 oc = ro.xz - uGl.xy; float ga = dot(rd.xz, rd.xz), gb = dot(oc, rd.xz), gc = dot(oc, oc) - uGl.z * uGl.z, gh = gb * gb - ga * gc;
    float tg = gh > 0.0 ? (-gb - sqrt(gh)) / ga : 1e9; vec3 gq = ro + rd * tg;
    if (gq.y < 0.0 || gq.y > uGl.w) tg = 1e9; nn = vec3(gq.x - uGl.x, 0.0, gq.z - uGl.y) / uGl.z;
    if (tg < t) {
      t = tg; vec3 q = ro + rd * tg; float fr = pow(1.0 - abs(dot(nn, V)), 3.0);
      bool water = q.y < uGw;
      col *= water ? vec3(0.70, 0.78, 0.76) : vec3(0.88, 0.92, 0.9);
#ifdef AMB
      col += uAmb * fr * 0.4;
#else
      vec3 lv = uL0.xyz - q; float d2 = dot(lv, lv); vec3 l = lv * inversesqrt(d2), h = normalize(l + V);
      col += vec3(1.0, 0.65, 0.3) * uL0.w / (d2 + 2.0) * (pow(max(dot(nn, h), 0.0), 120.0) * 1.5 + fr * 0.03 + (water ? 0.0025 : 0.0));
      if (abs(q.y - uGw) < 0.1 || abs(q.y - uGl.w) < 0.12) col += vec3(1.0, 0.65, 0.3) * uL0.w / (d2 + 2.0) * 0.045;
#endif
    }
  }
  float coc = clamp(abs(t - uV.y) / t * uV.z, 0.0, 1.0);
  o = vec4(enc(col) + (hash12(gl_FragCoord.xy + mode * 37.0) - 0.5) / 255.0, mode < 0.5 ? win : coc);
}`,on=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uA, uC;
uniform vec4 uP;   // 1/size, max radius px
uniform int uTaps;
${Te}
void main() {
  vec4 c0 = texture(uA, vUv);
  float r0 = texture(uC, vUv).a * uP.y;
  vec3 acc = dec(c0.rgb); float w = 1.0, rot = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453) * 6.2831;
  float nt = float(uTaps);
  for (int i = 0; i < uTaps; i++) {
    float fi = float(i) + 0.5, rr = sqrt(fi / nt) * r0, a = fi * 2.39996 + rot;
    vec2 off = vec2(cos(a), sin(a)) * rr * uP.x;
    float ct = textureLod(uC, vUv + off, 0.0).a * uP.y;
    float wt = clamp(ct - rr * 0.8 + 1.0, 0.0, 1.0);
    acc += dec(textureLod(uA, vUv + off, 0.0).rgb) * wt; w += wt;
  }
  o = vec4(enc(acc / w), c0.a);
}`,an=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uA, uB, uD, uN;
uniform vec4 uF;   // intensity, sway mix, time, exposure
uniform vec4 uO;   // snow, rain, grain seed, foot glow
uniform vec4 uG;   // the table round the candle's foot: ellipse centre, half axes (uv)
uniform vec4 uR;   // the pane's point nearest the flame (uv), 25 cm there in uv
${Te}
void main() {
  vec4 a = texture(uA, vUv);
  vec3 c = dec(a.rgb) + uF.x * mix(dec(texture(uB, vUv).rgb), dec(texture(uD, vUv).rgb), uF.y);
  float m = a.a, T = uF.z;
  if (m > 0.01) {
    if (uO.y > 0.5) {
      for (int k = 0; k < 2; k++) {
        float s = k == 0 ? 5.0 : 8.0;
        vec2 q = vUv * s + float(k) * 0.37;
        float fk = float(k), cs = hash12(vec2(floor(q.x), 3.7 + fk));
        if (k == 1) q.y += T * 0.045 * smoothstep(0.62, 0.9, cs);
        vec2 cl = floor(q), f = fract(q);
        vec4 rn = vec4(hash12(cl + fk * 7.1), hash12(cl * 1.37 + 2.9 + fk), hash12(cl * 0.71 + 8.3 + fk), hash12(cl * 1.13 + 5.5 + fk));
        vec2 bp = f - 0.2 - 0.6 * rn.rg;
        float d = length(bp) / s, rad = 0.010 + 0.013 * rn.a, on = step(k == 0 ? 0.5 : 0.6, rn.b);
        c += m * on * smoothstep(rad, rad * 0.45, d) * (0.3 + 0.7 * rn.g) * (vec3(0.003, 0.004, 0.006) + uF.x * vec3(0.013, 0.008, 0.0045));
        // a bead near the flame holds a tiny image of it
        float nf = smoothstep(1.0, 0.3, length(vUv - uR.xy) / uR.z), dp = length(bp / s - (uR.xy - vUv) * 0.04);
        c += m * on * nf * nf * smoothstep(0.0025, 0.0, dp) * smoothstep(rad, rad * 0.6, d) * uF.x * vec3(0.22, 0.13, 0.05);
      }
    }
    if (uO.x > 0.5) {
      // snow in depth: a few large soft near flakes falling fast, smaller ones behind, a far grain that only shows on the dark
      // roofs. Every cell and column has its own hash (no lattice), each column falls at its own speed, all lean with the draught.
      float dk = 1.0 - smoothstep(0.008, 0.06, dot(c, vec3(0.25, 0.45, 0.3))), dw = uO.x - 1.0;
      float lb = dw < 0.5 ? 0.04 : dw < 1.5 ? 0.2 : 0.46, la = dw < 0.5 ? 0.03 : dw < 1.5 ? 0.08 : 0.2;
      float D = lb * T - la * 1.6 * cos(T * 0.6 + 1.0);
      for (int k = 0; k < 3; k++) {
        float fk = float(k), s = k == 0 ? 6.5 : k == 1 ? 17.0 : 46.0, v = k == 0 ? 0.15 : k == 1 ? 0.06 : 0.028;
        vec2 q = vUv * s; q.x -= D * v * s;
        float hc = hash12(vec2(floor(q.x), 7.3 + fk * 13.1));
        q.y += (T * v * (0.6 + 0.8 * hc) + hc * 9.0) * s;
        vec2 cl = floor(q), f = fract(q);
        float h1 = hash12(cl + fk * 31.7), h2 = hash12(cl * 1.71 + 3.9 + fk * 11.3), h3 = hash12(cl * 0.83 + 17.2 + fk * 5.1);
        float rr = (k == 0 ? 4.0 + 6.0 * h3 : k == 1 ? 1.5 + 1.5 * h3 : 0.75 + 0.5 * h3) * 0.001;
        vec2 ctr = vec2(0.22 + 0.56 * h1 + 0.07 * sin(T * (0.6 + 0.7 * h2) + h1 * 6.28), 0.2 + 0.6 * h2);
        float d = length(f - ctr) / s, w = max(rr * 2.0, 0.0015);
        float a = smoothstep(w, 0.0, d) * step(0.42, fract(h1 * 13.7 + h2 * 5.3)) * (0.6 + 0.8 * fract(h3 * 9.1));
        float vis = k == 2 ? dk * dk : 0.3 + 0.7 * dk;
        c += m * a * vis * (k == 0 ? vec3(0.03, 0.032, 0.036) + uF.x * vec3(0.02, 0.012, 0.006) : k == 1 ? vec3(0.10, 0.11, 0.13) : vec3(0.06, 0.066, 0.078));
      }
    }
  }
  vec2 gq = (vUv - uG.xy) / uG.zw;
  c *= 1.0 + uF.x * uO.w * vec3(1.9, 0.85, 0.3) * exp(-dot(gq, gq));
  c *= uF.w;
  c = max(c - 0.004, 0.0) * 1.04;
  vec2 v = vUv - 0.5; c *= 1.0 - 1.2 * dot(v, v);
  float gr = hash12(gl_FragCoord.xy + vec2(uO.z * 761.0, uO.z * 383.0)) - 0.5;
  vec3 img = tone(c);
  o = vec4(img + gr * (0.010 + 0.030 * sqrt(max(img.g, 0.0))), 1.0);
}`,nn=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uT, uSd, uN;
uniform vec3 uCam, uCX, uCY, uCZ;
uniform vec4 uC;    // cx cz R yTop0
uniform vec4 uC2;   // y0, side map top y, mirror, type
uniform vec4 uF1;   // flame light (world) + intensity
uniform vec4 uF2;   // the other candle's flame + intensity
uniform vec4 uFa;   // reflection: flame base (world) + width
uniform vec4 uFb;   // flame tip (world) + tan half fov
uniform vec4 uP;    // pool y, pool radius, exposure, time
uniform vec4 uM;    // glow length, ripple, pixel cm per unit depth, lip radius
uniform vec4 uG;    // glass radius, glass top, water y, on
uniform vec3 uWax, uGlow, uAmb;
uniform int uIt, uL4, uL6;
${Te}
vec4 SD(float th, float y) { vec4 s = textureLod(uSd, vec2(th * uC2.z / 6.2831853 + 0.5, (y - uC2.x) / (uC2.y - uC2.x)), 0.0); s.r = 0.24 * (1.0 - exp(-s.r / 0.11)); return s; }
float at2(float y, float x) { return abs(x) > 1e-5 ? atan(y / x) + (x < 0.0 ? (y >= 0.0 ? 3.14159265 : -3.14159265) : 0.0) : (y >= 0.0 ? 1.5707963 : -1.5707963); }
vec4 TP(vec2 q) { vec2 m = vec2(q.x * uC2.z, q.y); return textureLod(uT, vec2(at2(m.x, m.y) / 6.2831853 + 0.5, length(m) / uC.z), 0.0); }
vec4 NT(vec2 p) { return textureLod(uN, p, 0.0); }
vec2 cyl(vec3 o, vec3 d, float r) { float a = dot(d.xz, d.xz), b = dot(o.xz, d.xz), c = dot(o.xz, o.xz) - r * r, h = b * b - a * c; if (h < 0.0) return vec2(-1.0); h = sqrt(h); return vec2(-b - h, -b + h) / a; }
// the flame seen along a mirror direction: closest approach of the ray to the flame's axis
vec3 flameSeen(vec3 p, vec3 rr) {
  vec3 a = uFa.xyz, ab = uFb.xyz - a, w0 = p - a;
  float b = dot(rr, ab), c = dot(ab, ab), d = dot(rr, w0), e = dot(ab, w0), den = max(c - b * b, 1e-4);
  float s = clamp((e - b * d) / den, 0.0, 1.0), t = max(dot(a + ab * s - p, rr), 0.0);
  float dist = length(p + rr * t - a - ab * s), wd = uFa.w * (0.35 + 1.4 * sqrt(s) * (1.0 - s));
  vec3 fc = s < 0.15 ? vec3(0.5, 0.3, 0.3) * 0.5 : s < 0.75 ? vec3(1.0, 0.82, 0.5) * 16.0 : vec3(1.0, 0.45, 0.12) * 2.0;
  return uF1.w * (fc * exp(-dist * dist / (wd * wd)) + vec3(1.0, 0.6, 0.25) * 0.35 * exp(-dist / 1.2));
}
void main() {
  vec3 rd = camRay(vUv, uCX, uCY, uCZ, uFb.w);
  vec3 lo = uCam - vec3(uC.x, 0.0, uC.y);
  float R = uC.z, y0 = uC2.x, typ = uC2.w;
  if (cyl(lo, rd, R + 0.5).x < 0.0) discard;
  vec3 p = vec3(0.0); float th = 0.0, r = R + 0.5, tS = -1.0; vec4 sd = vec4(0.0);
  for (int i = 0; i < uL4; i++) { vec2 q = cyl(lo, rd, r); if (q.x < 0.0) { tS = -1.0; break; } tS = q.x; p = lo + rd * q.x; th = at2(p.x, p.z); sd = SD(th, p.y); r = R + sd.r + sd.a; }
  float cov = 1.0;
  if (tS > 0.0) {
    vec2 q = cyl(lo, rd, r);
    if (q.x < 0.0) tS = -1.0; else { tS = q.x; p = lo + rd * tS; th = at2(p.x, p.z); sd = SD(th, p.y); }
    float a2 = dot(rd.xz, rd.xz), dmin = length(lo.xz - rd.xz * dot(lo.xz, rd.xz) / a2);
    cov = clamp((r - dmin) / (uM.z * max(tS, 1.0)) + 0.5, 0.0, 1.0);
  }
  float rimY = uC.w + TP(vec2(sin(th), cos(th)) * (R - 0.6 * R / 20.0)).r;
  bool side = false; vec3 pt = vec3(0.0); float bcov = 1.0;
  if (tS > 0.0 && p.y < y0 + (typ > 2.5 && typ < 3.5 ? sd.b * 1.5 : 0.0)) discard;
  if (tS > 0.0 && p.y <= rimY + 0.03) side = true;
  else {
    vec2 q = cyl(lo, rd, R * 0.995); if (q.x < 0.0) discard;
    float t0 = max(q.x, 0.0), dt = (q.y - t0) / float(uIt), tp = t0; bool hit = false;
    float mg = 1e3;
    for (int i = 0; i <= uIt; i++) { vec3 s = lo + rd * tp; vec4 h = TP(s.xz); mg = s.y - (uC.w + h.r); if (i == 0 && tS < 0.0 && mg < 0.0) discard; if (s.y < uC.w + h.r + h.g) { hit = true; break; } tp += dt; }
    if (!hit) {
      // the ray left over the far rim: a soft edge there, then nothing
      float pcm = uM.z * q.y * 1.5;
      if (mg > pcm) discard;
      bcov = 1.0 - clamp(mg / pcm, 0.0, 1.0); tp = q.y;
    }
    float ta = max(tp - dt, t0), tb = tp;
    for (int i = 0; i < uL6; i++) { float tm = (ta + tb) * 0.5; vec3 s = lo + rd * tm; vec4 h = TP(s.xz); if (s.y < uC.w + h.r + h.g) tb = tm; else ta = tm; }
    pt = lo + rd * tb;
    if (tS < 0.0) cov = 1.0;
    cov = min(cov, bcov);
  }
  vec3 V = -rd, F = uF1.xyz - vec3(uC.x, 0.0, uC.y), F2 = uF2.xyz - vec3(uC.x, 0.0, uC.y);
  vec3 lc = vec3(1.0, 0.62, 0.30), col;
  float I = uF1.w, gl = uM.x, poolY = uP.x, poolR = uP.y;
  if (side) {
    float e = 0.07, hy = (uC2.y - y0) / 64.0;
    vec4 sa0 = SD(th - e, p.y), sa1 = SD(th + e, p.y), sb0 = SD(th, p.y - hy), sb1 = SD(th, p.y + hy);
    float dth = (sa1.r + sa1.a - sa0.r - sa0.a) / (2.0 * e * R);
    float dy = (sb1.r + sb1.a - sb0.r - sb0.a) / (2.0 * hy);
    vec3 n0 = vec3(sin(th), 0.0, cos(th)), tg = vec3(cos(th), 0.0, -sin(th));
    vec2 gd = vec2(dth * 1.8, dy * 1.2); gd *= min(1.0, 0.9 / max(length(gd), 1e-4));
    float drip = smoothstep(0.015, 0.09, sd.r), warm = sd.g;
    vec4 mt = NT(vec2(th * R * 0.055, p.y * 0.05));
    vec2 bmp = NT(vec2(th * R * 0.31 + p.y * 0.04, p.y * 0.27)).rg - 0.5;
    gd += bmp * mix(0.10, 0.04, warm) * (1.0 - 0.5 * drip);
    // the faint rings a run keeps where it paused and set
    gd.y += (NT(vec2(th * R * 0.11 + 0.3, p.y * 0.61)).b - 0.5) * drip * (1.0 - warm) * 0.12;
    float lk = smoothstep(uM.w, 0.0, rimY - p.y);   // the side leans into the rolled lip (the roll itself is in the top map)
    vec3 n = normalize(n0 - tg * gd.x - vec3(0.0, 1.0, 0.0) * (gd.y - 1.2 * lk * lk));
    vec3 alb = uWax * (0.84 + 0.26 * mt.r);
    alb = mix(alb, alb * 1.12 + 0.015, smoothstep(0.58, 0.8, mt.a) * 0.6 * (1.0 - drip));
    float spec = (0.06 + 0.24 * drip + 0.55 * warm) * (0.85 + 0.3 * mt.b), metal = 0.0;
    if (typ > 1.5 && typ < 2.5) {
      vec2 hp = vec2(th * R, p.y) * 2.4, rr = vec2(1.0, 1.732), hh = rr * 0.5;
      vec2 ga = mod(hp, rr) - hh, gb = mod(hp - hh, rr) - hh, g = dot(ga, ga) < dot(gb, gb) ? ga : gb;
      vec2 ag = abs(g); float he = max(dot(ag, vec2(0.5, 0.866)), ag.x), k = 1.0 - drip;
      alb *= 1.0 - 0.3 * smoothstep(0.36, 0.5, he) * k;
      n = normalize(n + (tg * g.x + vec3(0.0, 1.0, 0.0) * g.y) * 0.6 * k);
    }
    alb = mix(alb, alb * vec3(1.02, 0.97, 0.88), drip);
    if (typ > 3.5) { alb = vec3(0.55, 0.56, 0.58); metal = 1.0; n = normalize(n + tg * 0.35 * sin(th * 46.0)); spec = 1.2; }
    float av = NT(vec2(th * 0.159155, 0.37 + p.y * 0.016)).r, thick = smoothstep(1.2, 2.6, R);
    float below = max(poolY - p.y, 0.0) + ((mt.g - 0.5) * 0.55 + (av - 0.5) * 0.9 * thick) * gl, wall = max(R + sd.r - poolR, 0.08) * mix(1.0, 0.45 + 1.1 * av, thick);
    below = max(below, 0.0);
    float edge = 1.0 - max(dot(n, n0), 0.0);
    float thru = (1.0 - metal) * exp(-sd.r * 3.2 * (1.0 - warm)) * (0.85 + 0.5 * n.y + 0.3 * drip * warm) * (1.0 - edge) * (0.7 + 0.4 * max(dot(n, V), 0.0));
    float sss = I * exp(-below / gl) * exp(-wall / (gl * 1.7)) * thru;
    // red travels furthest through wax: a deep ember-coloured tail far below the pool
    float deep = I * 0.20 * thick * exp(-below / (gl * 4.2)) * exp(-wall / (gl * 3.4)) * thru * (0.75 + 0.5 * mt.r);
    vec3 gcol = uGlow * mix(vec3(1.0), vec3(1.0, 0.5, 0.22), 1.0 - exp(-below / (gl * 1.6)));
    vec3 L = F - p; float d2 = dot(L, L); vec3 l = L * inversesqrt(d2);
    float own = max(dot(n, l), 0.0) * (0.04 + 0.3 * drip * smoothstep(-0.2, 0.6, n.y)) * smoothstep(R - 0.25, R + 0.35, dot(F.xz, n0.xz) + sd.r * 2.0);
    vec3 direct = lc * I * 40.0 / (d2 + 2.0) * own;
    if (uF2.w > 0.0) { vec3 L2 = F2 - p; float e2 = dot(L2, L2); direct += lc * uF2.w * 30.0 / (e2 + 2.0) * max(dot(n, L2 * inversesqrt(e2)), 0.0); }
    vec3 h = normalize(l + V);
    float sp = pow(max(dot(n, h), 0.0), mix(18.0, 90.0, max(warm, metal))) * spec * I * 40.0 / (d2 + 2.0) * smoothstep(-0.3, 0.3, n.y + drip);
    float rim = pow(1.0 - max(dot(n, V), 0.0), 3.0);
    col = alb * (direct + uAmb * (0.35 + 0.65 * rim) + lc * I * mix(0.05, 0.026, thick) * (1.0 + n.y)) + gcol * max(sss, 0.0) * 1.3 + uGlow * vec3(1.0, 0.34, 0.12) * deep + lc * sp * (metal > 0.5 ? alb : vec3(1.0)) * 0.5
      + alb * lc * I * 0.3 * exp(-(p.y - y0) / 0.9) * step(2.5, typ) * step(typ, 3.5);   // a bottle candle's foot takes the light the lit collar throws back
  } else {
    vec4 h = TP(pt.xz);
    float e = R / 20.0;
    vec4 hx0 = TP(pt.xz - vec2(e, 0.0)), hx1 = TP(pt.xz + vec2(e, 0.0)), hz0 = TP(pt.xz - vec2(0.0, e)), hz1 = TP(pt.xz + vec2(0.0, e));
    vec2 dg = vec2(hx1.g - hx0.g, hz1.g - hz0.g) / (2.0 * e);
    vec3 n = normalize(vec3(-(hx1.r + hx1.g - hx0.r - hx0.g) / (2.0 * e), 1.0, -(hz1.r + hz1.g - hz0.r - hz0.g) / (2.0 * e)));
    vec3 L = F - pt; float d2 = dot(L, L); vec3 l = L * inversesqrt(d2);
    float att = I * 40.0 / (d2 + 2.0), rr0 = length(pt.xz);
    float sss = I * exp(-max(rr0 - poolR, 0.0) / (gl * 1.4)) * exp(-max(poolY - pt.y, 0.0) / gl);
    // the dry wax: top face, rim and tunnel wall, with soot flecks near the flame
    vec4 ms = NT(pt.xz * 0.55);
    vec2 bmp = NT(pt.xz * 0.9).rg - 0.5;
    vec3 ns = normalize(n + vec3(bmp.x, 0.0, bmp.y) * 0.14);
    float soft = h.b, ndl = max(dot(ns, l), 0.0);
    vec3 hv = normalize(l + V);
    float sp = pow(max(dot(ns, hv), 0.0), mix(14.0, 60.0, soft)) * (0.08 + 0.5 * soft);
    vec3 alb = uWax * (0.88 + 0.2 * ms.r);
    float ae = att * ndl; ae = ae / (1.0 + 0.42 * ae);
    vec3 solid = alb * (mix(lc, uGlow, 0.45) * ae * 0.8 + uAmb * 0.4 + lc * I * 0.05) + uGlow * sss * (0.9 + 0.8 * soft) + lc * att * sp;
    if (typ > 3.5 && rr0 > R - 0.13) solid = vec3(0.5) * (lc * att * (0.3 + pow(max(dot(ns, hv), 0.0), 40.0)) + uAmb * 0.5);
    float liqA = smoothstep(0.006, 0.03, h.g);
    col = solid;
    if (liqA > 0.002) {
      // the clear pool: refract down to the floor, absorb a little on the way, reflect the flame off the surface, climb the wall at the meniscus
      vec2 rp = pt.xz * 3.0 + uP.w * vec2(0.7, 0.4);
      float mk = exp(-h.g / 0.055);
      vec2 dn = dg / (length(dg) + 0.25);
      vec3 nl = normalize(vec3(0.0, 1.0, 0.0) + vec3(NT(rp * 0.05).r - 0.5, 0.0, NT(rp * 0.05 + 0.5).g - 0.5) * uM.y + vec3(dn.x, 0.0, dn.y) * 2.5 * exp(-h.g / 0.12) + vec3(pt.x, 0.0, pt.z) * (0.95 * exp(-rr0 / 0.3) / max(rr0, 0.02)));
      float fr = 0.03 + 0.97 * pow(1.0 - max(dot(nl, V), 0.0), 5.0);
      vec3 tr = refract(rd, nl, 0.694);
      float dpt = h.g / max(-tr.y, 0.25);
      vec2 fxz = pt.xz + tr.xz * dpt;
      float fy = pt.y - h.g;
      vec3 Lf = F - vec3(fxz.x, fy, fxz.y); float d2f = dot(Lf, Lf);
      float Ef = max(Lf.y * inversesqrt(d2f), 0.1) * 10.5 * I / (d2f + 2.5);
      vec4 fn = NT(fxz * 0.55);
      vec3 fa = uWax * (0.9 + 0.2 * fn.r);
      vec3 Tl = exp(-dpt * vec3(0.3, 0.75, 1.5) * (1.2 - dot(uWax, vec3(0.33))));
      vec3 under = (fa * mix(lc, uGlow, 0.85) * Ef + uGlow * sss * 0.62) * Tl + uAmb * 0.05;
      vec3 rr = reflect(rd, nl);
      vec3 liq = under * (1.0 - fr) + fr * (flameSeen(pt + vec3(uC.x, 0.0, uC.y), rr) + uAmb * 0.4);
      liq *= 1.0 - 0.34 * smoothstep(0.0, 0.03, h.g) * exp(-h.g / 0.1);
      liq += uGlow * mk * I * 0.12 + vec3(1.0, 0.55, 0.2) * exp(-dot(pt.xz, pt.xz) / 0.04) * I * 0.3;
      col = mix(solid, liq, liqA);
    }
  }
  if (uG.w > 0.5) {
    vec2 q = cyl(lo, rd, uG.x);
    if (q.x > 0.0) { vec3 s = lo + rd * q.x; if (s.y < uG.y) { vec3 gn = normalize(vec3(s.x, 0.0, s.z)); float fr = pow(1.0 - abs(dot(gn, V)), 3.0); col = col * (s.y < uG.z ? vec3(0.72, 0.8, 0.78) : vec3(0.9)) + uAmb * fr * 0.4 + lc * I * fr * 0.15; } }
  }
  col *= uP.z;
  o = vec4(tone(col) * cov, cov);
}`,rn=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uN;
uniform vec4 uB;    // flame origin uv, uv per cm, time
uniform vec4 uS;    // height, half width, -, intensity
uniform vec4 uLn;   // lean x (cm at the tip), lift, flicker, detach
uniform vec4 uAx;   // centre line: x(u) = u (a + u (b + u (c + u d)))
uniform vec4 uWk;   // wick length, curl, mushroom, ember
uniform vec4 uMk;   // front rim ellipse (uv): centre, half axes
uniform vec4 uFl;   // match flare uv, strength, exposure
uniform int uL7;
void main() {
  vec2 q = (vUv - uB.xy) / uB.z;
  float T = uB.w, H = uS.x, W = uS.y, I = uS.w;
  vec2 e = (vUv - uMk.xy) / uMk.zw;
  float mk = (abs(e.x) < 1.0) ? smoothstep(-0.03, 0.03, e.y + sqrt(max(1.0 - e.x * e.x, 0.0))) : 1.0;
  vec3 col = vec3(0.0); float lum = 0.0;
  float yb = -0.42, u = (q.y - yb) / H, uc = clamp(u, 0.0, 1.1);
  float ax = uc * (uAx.x + uc * (uAx.y + uc * (uAx.z + uc * uAx.w)));
  if (I > 0.002) {
    float wn = uc < 0.3 ? sqrt(max(0.0, 1.0 - pow((0.3 - uc) / 0.3, 2.0))) * (0.72 + 0.28 * uc / 0.3) : pow(max(0.0, 1.0 - pow((uc - 0.3) / 0.7, 1.7)), 0.85);
    float w = max(W * wn, 1e-3), x = abs(q.x - ax), f = x / w;
    float px = fwidth(q.x), edge = max(0.04, px * 1.6);
    float body = smoothstep(edge, -edge, x - w) * smoothstep(-0.02, 0.01, u) * smoothstep(1.02, 0.95, uc);
    body *= 1.0 - uLn.w * smoothstep(0.1, 0.0, abs(uc - 0.6 - 0.08 * (textureLod(uN, vec2(T * 0.2, 0.71), 0.0).r - 0.5)));
    // luminous soot sits in a shell, starting low near the edge and high in the middle (the dark, clear zone round the wick)
    float c = sqrt(max(1.0 - f * f, 0.0));
    float u0 = 0.09 + 0.15 * c * c;
    float on = smoothstep(u0 - 0.03, u0 + 0.13, uc);
    float grow = mix(0.32, 1.0, smoothstep(0.22, 0.62, uc));
    float tipf = smoothstep(1.03, 0.68, uc);
    float fl = 0.93 + 0.14 * textureLod(uN, vec2(q.x * 0.15 + T * 0.03, uc * 0.3 - T * 0.26), 0.0).r;
    float E = body * (on * grow * (0.45 + 0.55 * tipf) * (0.32 + 0.68 * c) * mix(0.5, 1.0, smoothstep(0.12, 0.3, uc)) + 0.055 * (1.0 - on) * smoothstep(0.07, 0.2, uc)) * fl;
    lum = clamp(E * 2.0, 0.0, 1.0);
    // the thin blue reaction sheet round the base, seen edge-on at the limb, faint across the front, closing under the flame
    float bs = smoothstep(0.62, 0.94, min(f, 1.0)) * (1.0 - smoothstep(0.08, 0.44, uc)) * smoothstep(0.0, 0.03, u) * smoothstep(edge * 1.4, -edge * 0.6, x - w);
    float bf = (1.0 - smoothstep(0.06, 0.3, uc)) * smoothstep(-0.01, 0.015, u) * 0.1 * body;
    float blue = (bs + bf) * (1.0 - min(E * 2.5, 1.0));
    // the orange fringe just outside the luminous body
    float mantle = (1.0 - body) * exp(-max(x - w, 0.0) / 0.07) * on * smoothstep(1.1, 0.5, uc) * smoothstep(-0.05, 0.1, uc);
    col = I * (vec3(1.15, 0.68, 0.25) * E * 5.6 + vec3(0.16, 0.3, 1.0) * blue * 1.9 + vec3(0.75, 0.32, 0.09) * 0.22 * mantle) * mk;
    vec2 hc = q - vec2(uLn.x * 0.35, yb + 0.5 * H);
    float r = length(hc * vec2(1.0, 0.78));
    col += I * vec3(1.0, 0.58, 0.26) * (0.045 * exp(-r / 0.8) + 0.06 * exp(-r / 2.6) + 0.035 * exp(-r / 7.0)) * smoothstep(7.5, 3.5, r);
  }
  // the wick: a frayed charred thread from the pool, curling, its tip an ember in lumps
  float wl = uWk.x, cu = uWk.y, dmin = 1e3, sAt = 0.0;
  vec2 prev = vec2(0.0, -wl);
  for (int i = 1; i <= uL7; i++) {
    float s = float(i) / 7.0;
    vec2 pn = vec2(cu * pow(s, 2.4) * 0.6, -wl + s * wl - abs(cu) * 0.24 * pow(s, 3.2));
    vec2 ba = pn - prev, pa = q - prev; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0), d = length(pa - ba * h);
    if (d < dmin) { dmin = d; sAt = (float(i - 1) + h) / 7.0; }
    prev = pn;
  }
  vec4 nf = textureLod(uN, q * vec2(1.3, 0.7) + vec2(0.37, 0.11), 0.0);
  float fib = nf.g - 0.5;
  float wr = mix(0.058, 0.082, sAt);
  float mr = length(q - prev);
  float mush = uWk.z * smoothstep(0.21, 0.13, mr + fib * 0.1);
  float wa = max(smoothstep(wr + 0.025, wr - 0.012, dmin + fib * 0.05), mush) * mk;
  float tipK = smoothstep(0.66, 1.0, sAt);
  float emb = uWk.w * (tipK * (0.25 + 1.3 * clamp(nf.b - 0.35, 0.0, 1.0)) + mush * (0.15 + 1.0 * clamp(nf.a - 0.45, 0.0, 1.0)));
  vec3 wc = mix(vec3(0.20, 0.15, 0.09), vec3(0.02, 0.017, 0.015), smoothstep(0.0, 0.32, sAt)) + vec3(1.0, 0.27, 0.05) * 1.7 * emb;
  float wo = wa * (1.0 - 0.8 * lum);
  col += vec3(1.0, 0.3, 0.06) * uWk.w * 0.22 * exp(-mr / 0.16);
  // the match
  if (uFl.z > 0.001) {
    vec2 m = (vUv - uFl.xy) / uB.z; float d2 = dot(m - vec2(0.0, 0.3), m - vec2(0.0, 0.3));
    col += uFl.z * (vec3(1.0, 0.8, 0.5) * 3.0 * exp(-d2 / 0.08) + vec3(1.0, 0.55, 0.2) * (0.5 * exp(-sqrt(d2) / 0.8) + 0.1 * exp(-sqrt(d2) / 1.2)) * smoothstep(3.0, 1.5, sqrt(d2)));
  }
  vec3 g = 1.0 - exp(-col * uFl.w);
  o = vec4(g * (1.0 - wo) + wc * wo, wo);
}`,cn=`#version 300 es
layout(location = 0) in vec4 a0;
layout(location = 1) in vec4 a1;
layout(location = 2) in vec4 a2;
out vec2 vQ; out vec4 vC; out float vK;
void main() {
  vec2 c = vec2(float(gl_VertexID & 1), float((gl_VertexID >> 1) & 1)) * 2.0 - 1.0;
  vQ = c; float ca = cos(a2.x), sa = sin(a2.x);
  vec2 off = vec2(c.x * a2.y, c.y); off = vec2(ca * off.x - sa * off.y, sa * off.x + ca * off.y) * a0.z;
  gl_Position = vec4((a0.xy + off) * 2.0 - 1.0, 0.0, 1.0); vC = vec4(a1.rgb, a0.w); vK = a1.w;
}`,sn=`#version 300 es
precision highp float;
in vec2 vQ; in vec4 vC; in float vK; out vec4 o;
void main() {
  float r = length(vQ), a = vK < 0.5 ? exp(-r * r * 3.2) * (1.0 - smoothstep(0.75, 1.0, r)) : smoothstep(1.0, 0.75, r) * (0.75 + 0.25 * vQ.y);
  a *= vC.a; o = vec4(vC.rgb * a, a);
}`;function qt(i,o,x){const u=(b,w)=>{const M=i.createShader(b);return i.shaderSource(M,w),i.compileShader(M),M},y=i.createProgram(),P=u(i.VERTEX_SHADER,o),S=u(i.FRAGMENT_SHADER,x);return i.attachShader(y,P),i.attachShader(y,S),i.linkProgram(y),i.flush(),{p:y,u:{},sh:[P,S]}}const Ho=["blur","comp","cand","flame","spr"];function ln(i){let o=_o.get(i);if(o)return o;o={blur:qt(i,ge,on),comp:qt(i,ge,an),cand:qt(i,Go,nn),flame:qt(i,Go,rn),spr:qt(i,cn,sn),vao0:i.createVertexArray(),ok:!1};const x=128,u=(b,w,M,X)=>{b=(b%M+M)%M,w=(w%M+M)%M;let z=b*374761393+w*668265263+X*2246822519|0;return z=Math.imul(z^z>>>13,1274126177),z^=z>>>16,(z>>>0)/4294967296},y=(b,w,M,X)=>{const z=Math.floor(b),k0=Math.floor(w),L0=b-z,U0=w-k0,st=L0*L0*(3-2*L0),M0=U0*U0*(3-2*U0),G0=u(z,k0,M,X),it=u(z+1,k0,M,X),E=u(z,k0+1,M,X),Qe=u(z+1,k0+1,M,X);return G0+(it-G0)*st+(E-G0)*M0+(G0-it-E+Qe)*st*M0},P=(b,w,M,X,z)=>{let k0=0,L0=.5,U0=M,st=0;for(let M0=0;M0<X;M0++)k0+=L0*y(b*U0/x,w*U0/x,U0,z+M0),st+=L0,L0*=.5,U0*=2;return k0/st},S=new Uint8Array(x*x*4);for(let b=0;b<x;b++)for(let w=0;w<x;w++){const M=(b*x+w)*4;S[M]=P(w,b,4,4,11)*255,S[M+1]=P(w,b,8,3,23)*255,S[M+2]=(y(w*32/x,b*32/x,32,41)*.7+y(w*64/x,b*64/x,64,43)*.3)*255,S[M+3]=P(w,b,16,2,77)*255}for(let b=0;b<4;b++){let w=255,M=0;for(let X=b;X<S.length;X+=4)w=Math.min(w,S[X]),M=Math.max(M,S[X]);for(let X=b;X<S.length;X+=4)S[X]=(S[X]-w)*255/Math.max(1,M-w)}return o.noise=i.createTexture(),i.bindTexture(i.TEXTURE_2D,o.noise),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_ALIGNMENT,1),i.texImage2D(i.TEXTURE_2D,0,i.RGBA8,x,x,0,i.RGBA,i.UNSIGNED_BYTE,S),i.generateMipmap(i.TEXTURE_2D),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.REPEAT),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.REPEAT),_o.set(i,o),o}function Ze(i,o,x){const u=x?"roomBA":"roomA",y=x?"roomBL":"roomL";if(!o[u]&&!i.isContextLost()){const P=x?`
#define BOT 1`:"";o[u]=qt(i,ge,Oo.replace("#version 300 es",`#version 300 es
#define AMB 1`+P)),o[y]=qt(i,ge,Oo.replace("#version 300 es","#version 300 es"+P))}return[o[u],o[y]]}function fn(i,o,x){const u=Ze(i,o,x);if(!u[0].ok)for(const y of u){if(y.ok=!0,!i.getProgramParameter(y.p,i.LINK_STATUS))throw new Error("036 room link: "+i.getProgramInfoLog(y.p)+" "+i.getShaderInfoLog(y.sh[1]));const P=i.getProgramParameter(y.p,i.ACTIVE_UNIFORMS);for(let S=0;S<P;S++){const b=i.getActiveUniform(y.p,S);y.u[b.name.replace(/\[0\]$/,"")]=i.getUniformLocation(y.p,b.name)}i.useProgram(y.p),y.u.uN&&i.uniform1i(y.u.uN,0),y.u.uBw&&i.uniform1i(y.u.uBw,4),y.u.uBc&&i.uniform1i(y.u.uBc,5)}}function un(i,o){if(o.ok)return;o.ok=!0;for(const u of Ho){const y=o[u];if(!i.getProgramParameter(y.p,i.LINK_STATUS))throw new Error("036 link "+u+": "+i.getProgramInfoLog(y.p)+" "+i.getShaderInfoLog(y.sh[0])+" "+i.getShaderInfoLog(y.sh[1]))}for(const u of Ho){const y=o[u],P=i.getProgramParameter(y.p,i.ACTIVE_UNIFORMS);for(let S=0;S<P;S++){const b=i.getActiveUniform(y.p,S);y.u[b.name.replace(/\[0\]$/,"")]=i.getUniformLocation(y.p,b.name)}}const x={blur:{uA:0,uC:1},comp:{uA:0,uB:1,uD:2,uN:3},cand:{uT:0,uSd:1,uN:2,uL4:4,uL6:6},flame:{uN:0,uL7:7}};for(const u in x){i.useProgram(o[u].p);for(const y in x[u])o[u].u[y]&&i.uniform1i(o[u].u[y],x[u][y])}}function X0(i,o,x,u,y){const P=i.createTexture();return i.bindTexture(i.TEXTURE_2D,P),u==="f16"?i.texImage2D(i.TEXTURE_2D,0,i.RGBA16F,o,x,0,i.RGBA,i.HALF_FLOAT,null):i.texImage2D(i.TEXTURE_2D,0,i.RGBA8,o,x,0,i.RGBA,i.UNSIGNED_BYTE,null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,y?i.REPEAT:i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),P}Uo.add({num:36,name:"Candle",fam:"Worlds",recipe:"One candle burning in a dark room lit by nothing else. The wax melts into a pool that spills over the low side and runs down in drips that set into layers. The candle and the draught change every mint. Drag toward the flame to blow on it (blow hard and it goes out), tap to relight it, hold near it to shield it, or tap the pool to spill a drip.",interactive:"Drag toward the flame to blow: it bends away along your breath, stretches, gutters, and a hard breath puts it out with a curl of smoke; tap to relight it. Hold near the candle to shield it and the flame grows tall and still. Tap the pool to spill a drop over the rim and watch the drip run.",music:!0,gl:!0,fps:30,seed:0,make(i){const o=i.gl,x=i.size,u=ln(o),y=i.hash.slice(2),P=t=>{let a=parseInt(y.slice(t,t+8),16)>>>0,e=parseInt(y.slice(t+8,t+16),16)>>>0,n=parseInt(y.slice(t+16,t+24),16)>>>0,r=parseInt(y.slice(t+24,t+32),16)>>>0;const s=()=>{a>>>=0,e>>>=0,n>>>=0,r>>>=0;let c=a+e|0;return a=e^e>>>9,e=n+(n<<3)|0,n=n<<21|n>>>11,r=r+1|0,c=c+r|0,n=n+c|0,(c>>>0)/4294967296};for(let c=0;c<15;c++)s();return s},S=P(0),b=P(16),w=P(32),M=P(8),X=(t,a)=>{a=a||S;let e=0;for(const r of t)e+=r[1];let n=a()*e;for(const r of t)if(n-=r[1],n<=0)return r[0];return t[t.length-1][0]},z=(t,a,e)=>t+(a-t)*(e||b)();let k0=X([["Brass taper",30],["Ivory pillar",28],["Beeswax",22],["Bottle candle",14],["Tea light in water",6]]),L0=X([["Windowsill",30],["Old desk",28],["Stone niche",20],["Kitchen table",22]]),U0=X([["Still",40],["Window draught",40],["Gusty",20]]),st=X([["Fresh",30],["Half-burnt",45],["Stub",25]]),M0=X([["Rain and streetlamps",34],["Moonlit",34],["Pitch dark",26],["Snowfall",6]]),G0=X([["Curled",50],["Straight",30],["Mushroomed",20]]),it=X([["None",86],["Twin flames",7],["Moth",7]]);i.home&&(k0="Ivory pillar",L0="Windowsill",U0="Window draught",st="Half-burnt",M0="Rain and streetlamps",G0="Curled",it="None"),M0==="Snowfall"&&L0==="Stone niche"&&(L0="Windowsill"),it==="Twin flames"&&(k0==="Tea light in water"||k0==="Bottle candle")&&(it="Moth"),i.trait("Candle",k0),i.trait("Setting",L0),i.trait("Draught",U0),i.trait("Age",st),i.trait("Night",M0),i.trait("Wick",G0),i.trait("Rare",it);const E={"Brass taper":0,"Ivory pillar":1,Beeswax:2,"Bottle candle":3,"Tea light in water":4}[k0],Qe=Ze(o,u,E===3),E0={Windowsill:0,"Old desk":1,"Stone niche":2,"Kitchen table":3}[L0],_0={Fresh:0,"Half-burnt":1,Stub:2}[st],P0={Still:0,"Window draught":1,Gusty:2}[U0],$e=M0==="Snowfall",Vo=M0==="Rain and streetlamps"&&E0!==2,o0=it==="Twin flames",hn=it==="Moth",wt=M0==="Moonlit"?0:M0==="Rain and streetlamps"?1:M0==="Snowfall"?0:2,S0=[{R:1.1,y0:3,len:[15,9,3.4],wax:[.82,.8,.74],glow:[1,.62,.32],gl:1.1,wl:.85,H:3.3,W:.58},{R:3.8,y0:.45,len:[12,7.5,3.6],wax:[.8,.69,.5],glow:[1,.56,.26],gl:1.5,wl:1,H:3.5,W:.66},{R:2.7,y0:.8,len:[11,7,3.2],wax:[.6,.33,.08],glow:[1,.46,.1],gl:.85,wl:.95,H:3.4,W:.62},{R:1.05,y0:13.2,len:[9,6,2.6],wax:[.8,.74,.6],glow:[1,.62,.32],gl:.82,wl:.85,H:3.1,W:.56},{R:1.95,y0:5.9,len:[1.5,1.5,1.5],wax:[.86,.85,.8],glow:[1,.64,.36],gl:.6,wl:.6,H:2.5,W:.5}][E],k=S0.R,N=S0.y0,O0=S0.len[_0]*z(.92,1.06),j=N+O0,te=[],_t=(t,a,e,n,r,s,c,l)=>te.push([t,a,e,0,n,r,s,c,l[0],l[1],l[2],0]),lt=(t,a,e,n,r,s,c,l)=>te.push([t,e,a,1,r,n,l||0,s,c[0],c[1],c[2],0]),Bt=(t,a,e,n,r,s,c,l)=>te.push([t,a,e,2,n,r,s,c,l[0],l[1],l[2],0]),bt=P(6),J0=bt()<.3&&!i.home,ee=[.4,.31,.17],mn=[.42,.42,.4];function jo(t,a){if(E===0)lt(t,a,0,.7,o0?3:4.6,1,ee),lt(t,a,.7,N,1.5,1,ee);else if(E===1)lt(t,a,0,N,o0?4.3:5.6,1,mn);else if(E===2)lt(t,a,0,N,4,6,[.36,.22,.12]);else if(E===3){const e=[.03,.03,.017];lt(t,a,0,8.5,3.6,2,e),Bt(t,8.5,a,3.6,2.6,3.6,2,e),lt(t,a,8.5,N,1.25,2,e)}else lt(t,a,0,9.5,4.2,9,[.9,.9,.9],6.5)}jo(0,0);const I0=o0?E===1?9.2:E===2?8.6:6.6:0,Mt=o0?-2.5:0,Ct=o0?j-z(1,2.5):0;o0&&jo(I0,Mt);const a0=o0||b()<.5?-1:1,gt=E===1?4:E===2||E===4?2.5:1;let Ft,oe,ae,H0=[0,0,0,0],Ae=1e3,Yo=10,Je=15;if(E0===0){if(Ft=-9,oe=[.5,.47,.42],ae=[.42,.39,.35],H0=[-60,60,1.6,90],Ae=a0*z(9,13)+(o0?I0*.5:0),b()<.6){const t=z(-4,-1)}b()<.7&&!J0&&(Bt(a0*(6.5+gt),.45,3,.9,.5,.7,0,[.3,.28,.25]),Bt(a0*(8.4+gt),.35,1.6,.6,.38,.55,0,[.42,.38,.32]))}else if(E0===1){Ft=-30,oe=[.22,.11,.05],ae=[.17,.15,.12],H0=a0<0?[14,70,8,90]:[-70,-14,8,90],Ae=a0<0?40:-40;const t=a0*(9.5+gt);if(J0||_t(t,1.6,.5,4.2,1.6,6,4,[.3,.06,.04]),J0||_t(t+a0*.3,3.9,.1,3.6,.7,5.2,4,[.06,.13,.08]),!o0&&!J0){const a=-a0*(6.5+gt);lt(a,4.5,0,.18,1.5,15,[.1,.1,.1]),lt(a-a0*3.5,4.8,0,.18,1.5,15,[.1,.1,.1]),_t(a-a0*1.75,.2,4.6,.3,.06,.08,1,ee),_t(a+a0*1.4,.12,7.5,.06,.06,3,1,ee),_t(a-a0*4.9,.12,7.8,.06,.06,3,1,ee)}}else if(E0===2)Ft=-7,oe=[.4,.36,.3],ae=[.42,.38,.31],Yo=Math.max(10,gt+8+(o0?I0:0)),Je=Math.max(15,j+4),J0||Bt(a0*(5+gt),.5,1.5,1,.55,.8,0,[.35,.33,.3]),Bt(a0*(6.6+gt),.4,-1.2,.7,.4,.6,0,[.28,.26,.24]);else{Ft=-45,oe=[.5,.33,.17],ae=[.36,.33,.28],H0=a0<0?[8,70,12,90]:[-70,-8,12,90],Ae=a0<0?38:-38;const t=a0*(12+gt);J0||(_t(t,.6,1.5,7,.6,5,6,[.55,.38,.2]),Bt(t,1.2+2.3,1.5,5.5,2.6,3.2,5,[.5,.3,.1]))}const Ko=Math.min(te.length,14),pn=E===4;E0===0&&(Je=j+6+bt()*8);const Dt=(E0===2?14:19)*Math.PI/180,Y=Math.tan(15*Math.PI/180),ze=V(E===3?O0+13:j+9.5,17,30),Zo=ze/(2*Y),Qo=j+2,$o=o0?I0*.5:-a0*ze*z(.02,.07),Jo=Qo-.15*ze;let N0=[$o,Jo+Zo*Math.sin(Dt),Zo*Math.cos(Dt)],u0=[0,-Math.sin(Dt),-Math.cos(Dt)],g0=[1,0,0],h0=[0,Math.cos(Dt),-Math.sin(Dt)];const Xt=P(24);let Tt=X([["Close",60],["Low across the table",40]],Xt);if(i.home&&(Tt="Close"),J0&&(Tt="Across the room"),i.trait("View",Tt),Tt==="Close"&&E0===0&&!i.home){const t=-a0*(.21+bt()*.1),a=Math.cos(t),e=Math.sin(t),n=r=>[r[0]*a+r[2]*e,r[1],-r[0]*e+r[2]*a];N0=n(N0),u0=n(u0),g0=n(g0),h0=n(h0)}else if(Tt==="Across the room"){const t=bt()<.5?-1:1,a=j+3.5,e=Math.max(a/(.2+bt()*.05),42),n=e/(2*Y),r=(1+bt()*3)*Math.PI/180,s=t*(.05+bt()*.15),c=Math.cos(r),l=Math.sin(r),f=Math.cos(s),m=Math.sin(s);u0=[-m*c,-l,-f*c],g0=[f,0,-m],h0=[-m*l,c,-f*l];const p=t*(.3+bt()*.06),v=-.2,A=j+2,d=[(o0?I0*.5:0)-g0[0]*p*n*Y-h0[0]*v*n*Y,A-h0[1]*v*n*Y,-g0[2]*p*n*Y-h0[2]*v*n*Y];N0=[d[0]-u0[0]*n,d[1]-u0[1]*n,d[2]-u0[2]*n]}else if(Tt!=="Close"){const a=Xt()<.5?-1:1,e=(4+Xt()*4)*Math.PI/180,n=a*(.22+Xt()*.16),r=ze*(1.28+Xt()*.22),s=r/(2*Y),c=Math.cos(e),l=Math.sin(e),f=Math.cos(n),m=Math.sin(n);u0=[-m*c,-l,-f*c],g0=[f,0,-m],h0=[-m*l,c,-f*l];const p=a*(.36+Xt()*.08),v=-.1,A=N+O0*.55,d=[(o0?I0*.5:0)-g0[0]*p*s*Y-h0[0]*v*s*Y,A-h0[1]*v*s*Y,-g0[2]*p*s*Y-h0[2]*v*s*Y];N0=[d[0]-u0[0]*s,d[1]-u0[1]*s,d[2]-u0[2]*s]}if(E===3&&!J0){const t=P(20),a=Tt!=="Close",e=-a0,n=(a?5+t()*3:10+t()*5)*Math.PI/180,r=e*(a?.16+t()*.14:.06+t()*.1),s=V((O0+9)/.73,15.5,26)*(.97+t()*.08),c=s/(2*Y),l=Math.cos(n),f=Math.sin(n),m=Math.cos(r),p=Math.sin(r);u0=[-p*l,-f,-m*l],g0=[m,0,-p],h0=[-p*f,l,-m*f];const v=e*(.26+t()*.08),A=.46,q=j+2,d=[-g0[0]*v*c*Y-h0[0]*A*c*Y,q-h0[1]*A*c*Y,-g0[2]*v*c*Y-h0[2]*A*c*Y];N0=[d[0]-u0[0]*c,d[1]-u0[1]*c,d[2]-u0[2]*c]}const A0=(t,a,e,n)=>{const r=t-N0[0],s=a-N0[1],c=e-N0[2],l=r*u0[0]+s*u0[1]+c*u0[2];return n[0]=.5+.5*(r*g0[0]+s*g0[1]+c*g0[2])/(l*Y),n[1]=.5+.5*(r*h0[0]+s*h0[1]+c*h0[2])/(l*Y),n[2]=1/(2*Y*l),n},to=[],vn=wt===1?8:wt===0?3:2;for(let t=0;t<vn;t++)to.push($o+z(-90,90),Jo+z(-20,80),(wt===2?z(3,5):z(7,17))*(J0?.45:1),wt===1?b()<.6?0:1:wt===0&&b()<.5?2:1);const Re=$e?[.016,.019,.026]:wt===0?[.01,.014,.024]:wt===1?[.02,.012,.0065]:[.0035,.0035,.004];if(E0===2)for(let t=0;t<3;t++)Re[t]*=.6;const ta=150,ea=u.vao0,dn=o.createFramebuffer(),ke=[X0(o,x,x),X0(o,x,x),X0(o,x,x)],oa=[X0(o,x,x),X0(o,x,x),X0(o,x,x)],aa=new Float32Array(56),na=new Float32Array(56),ra=new Float32Array(56);for(let t=0;t<Ko;t++){const a=te[t];aa.set(a.slice(0,4),t*4),na.set(a.slice(4,8),t*4),ra.set(a.slice(8,12),t*4)}const ca=new Float32Array(40);ca.set(to.slice(0,40));const sa=1.3,eo=.4,ia=t=>{o.bindFramebuffer(o.FRAMEBUFFER,dn),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0),o.viewport(0,0,x,x)};o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.disable(o.BLEND),o.colorMask(!0,!0,!0,!0),o.depthMask(!1);function xn(){const e=.041666666666666664,n=new Float32Array(448*336),r=new Float32Array(448*336*3),s=P(4),c=new Float32Array(336);{let h=0;for(let L=.3546,U=0;U<=200&&h<336;U++,L=.3546+(Math.PI/2-.3546)*U/200){const O=3.6*Math.sin(L),B=13.2-(8.5+2.6*Math.cos(L))+.55*Math.max(O-1.25,0);for(;h<336&&(h+.5)*e<B;)c[h]=(h+.5)*e<2.2?1.25:O,h++}for(;h<336;h++)c[h]=3.6}const l=h=>c[h],f=S0.wax,m=[[1,1,1],[.93,.93,.92],[1.04,1.02,.98],[.89,.88,.85]].map(h=>[f[0]*h[0],f[1]*h[1],f[2]*h[2]]),p=()=>(s(),m[Math.floor(s()*m.length)]),v=h=>{const L=.95+.1*s(),U=h[0]*L,O=h[1]*L,B=h[2]*L;return(H,s0)=>{const D=Math.min(1,s0/.05),J=H*3;r[J]+=(U-r[J])*D,r[J+1]+=(O-r[J+1])*D,r[J+2]+=(B-r[J+2])*D}},A=(h,L,U)=>{h=(h-Math.floor(h))*L;const O=Math.floor(h),B=h-O,H=B*B*(3-2*B),s0=Gt(O%L+U),D=Gt((O+1)%L+U);return s0+(D-s0)*H},q=(h,L,U,O)=>{const B=(h-Math.floor(h))*U,H=Math.floor(B),s0=B-H,D=Math.floor(L),J=L-D,w0=s0*s0*(3-2*s0),I=J*J*(3-2*J),t0=(i0,Z)=>Gt(i0%U+Z*1013+O);return Et(Et(t0(H,D),t0(H+1,D),w0),Et(t0(H,D+1),t0(H+1,D+1),w0),I)},d=Math.floor(s()*9e3),F=3.1+s()*.8,$=new Float32Array(448);for(let h=0;h<2;h++){const L=d+h*131,U=8+Math.floor(s()*5),O=h===0?F:F-1.1-s()*.5;for(let B=0;B<448;B++){const H=(B+.5)/448,s0=H*U+.9*A(H,5,L+7)+.3*A(H,13,L+9),D=s0-Math.floor(s0),J=Math.pow(Math.max(0,1-(2*D-1)*(2*D-1)),.7),w0=O+.6*A(H,4,L)+.25*A(H,11,L+3)+.1*A(H,41,L+4)+(.08+.7*Math.pow(.5+.5*Gt((Math.floor(s0)%U+U)%U+L+5),1.5))*J;h===0&&($[B]=w0);for(let I=0;I<336;I++){const t0=(I+.5)*e;if(t0>w0)break;const i0=I*448+B,Z=V(.5+.35*q(H,t0*1.1,7,L+11)+.2*q(H,t0*2.6,17,L+13),0,1),b0=(h===0?.14+.16*Z+.1*f0(2.2,.2,t0):.06+.06*Z)*Math.pow(V((w0-t0)/.4,0,1),.45);n[i0]+=b0;const l0=(h===0?.93:.99)+.08*Z;r[i0*3]=f[0]*l0,r[i0*3+1]=f[1]*l0,r[i0*3+2]=f[2]*l0}}}for(let h=0;h<11;h++){const L=s()*R-Math.PI,U=.15+s()*2.2,O=.45+s()*.5,B=.35+s()*.5,H=.22+s()*.26,s0=.94+s()*.1,D=Math.max(0,Math.floor((U-3*B)/e)),J=Math.min(335,Math.ceil((U+3*B)/e)),w0=Math.ceil(O*3/c[0]/R*448);for(let I=D;I<=J;I++){const t0=(I+.5)*e,i0=(t0-U)/B,Z=(L/R+.5)*448,b0=Math.exp(-i0*i0);for(let l0=Math.floor(Z)-w0;l0<=Math.floor(Z)+w0;l0++){const nt=(l0+.5-Z)/448*R*c[0]/O,Q0=H*b0*Math.exp(-nt*nt);if(Q0<.01)continue;const $0=I*448+(l0%448+448)%448;n[$0]+=Q0;const yt=s0*(.95+.06*s()),rt=Math.min(1,Q0/.14),ct=$0*3;r[ct]+=(f[0]*yt-r[ct])*rt,r[ct+1]+=(f[1]*yt-r[ct+1])*rt,r[ct+2]+=(f[2]*yt-r[ct+2])*rt}}}{const h=4+Math.floor(s()*4),L=s()*R,U=Math.floor(s()*h);for(let O=0;O<h;O++){const B=L+(O+.2+.6*s())/h*R,H=((B+Math.PI)/R%1+1)%1*448,s0=$[Math.floor(H)%448],D=O===0?z(2.8,3.4,s):O===1?z(.9,1.1,s):z(1.1,2.9,s),J=z(.32,.55,s),w0=z(.13,.2,s),I=s0-z(.5,.9,s),t0=s()*97,i0=O===U||s()<.15,Z=I+D-J*.5,b0=J*.42,l0=p(),nt=v(l0),Q0=Math.max(0,Math.floor(I/e)),$0=Math.min(335,Math.ceil((I+D)/e));for(let yt=Q0;yt<=$0;yt++){const rt=(yt+.5)*e,ct=V((rt-I)/D,0,1),Po=c[yt],On=B+(.3*n0(rt*.6+t0)+.1*n0(rt*1.9+t0*1.7))*Math.min(1,ct*2)/Po,Ja=J*Math.pow(1-ct,.8)*(.85+.3*n0(rt*1.4+t0*2.1))+.03,Me=(rt-Z)/b0,So=i0&&Math.abs(Me)<1?b0*Math.sqrt(1-Me*Me):0,Hn=Math.max(Ja,So),Io=((On+Math.PI)/R%1+1)%1*448,tn=Math.ceil(Hn/Po/R*448)+1;for(let Ye=Math.floor(Io)-tn;Ye<=Math.floor(Io)+tn;Ye++){const Ke=(Ye+.5-Io)/448*R*Po,No=Math.abs(Ke)/Ja;let Jt=No<1?w0*(1-.55*ct)*Math.pow(1-No*No,.6)*f0(I,I+.4,rt):0;if(So>0&&Math.abs(Ke)<So&&(Jt=Math.max(Jt,w0*1.1*Math.sqrt(Math.max(1-Ke/b0*(Ke/b0)-Me*Me,0)))),Jt<=.002)continue;const Wo=yt*448+(Ye%448+448)%448;n[Wo]=Math.max(n[Wo]+Jt*.62,Jt),nt(Wo,Jt)}}}}const K=new Uint8Array(448*336*4),T0=new Uint8Array(448*336*4),K0=new Int32Array(448),Z0=new Int32Array(448),Qt=new Int32Array(448),p0=new Int32Array(448);for(let h=0;h<448;h++)K0[h]=(h+448-1)%448,Z0[h]=(h+1)%448,Qt[h]=(h+448-7)%448,p0[h]=(h+7)%448;for(let h=0;h<336;h++){const L=R*c[h]/448,U=h*448,O=Math.max(0,h-1)*448,B=Math.min(335,h+1)*448,H=Math.max(0,h-6)*448,s0=Math.max(0,h-11)*448,D=6*e*.35,J=11*e*.35,w0=7*L*.5;for(let I=0;I<448;I++){const t0=U+I,i0=n[t0],Z=t0*4,b0=(n[U+Z0[I]]-n[U+K0[I]])/(2*L),l0=(n[B+I]-n[O+I])/(2*e);K[Z]=Math.min(255,i0/.7*255),K[Z+1]=V(b0/6+.5,0,1)*255,K[Z+2]=V(l0/6+.5,0,1)*255;const nt=Math.max(n[H+I]-i0-D,n[s0+I]-i0-J,n[U+Qt[I]]-i0-w0,n[U+p0[I]]-i0-w0);K[Z+3]=V(1-nt*1.6,0,1)*255;const Q0=t0*3;T0[Z]=Math.sqrt(r[Q0])*255,T0[Z+1]=Math.sqrt(r[Q0+1])*255,T0[Z+2]=Math.sqrt(r[Q0+2])*255,T0[Z+3]=96+(I*71+h*37)%96}}const D0=h=>{const L=X0(o,448,336,"",!0);return o.bindTexture(o.TEXTURE_2D,L),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texSubImage2D(o.TEXTURE_2D,0,0,0,448,336,o.RGBA,o.UNSIGNED_BYTE,h),L},$t=new Float32Array(448);for(let h=0;h<448;h++)$t[h]=Math.min(n[h],.7);return[D0(K),D0(T0),$t]}function la(){o.bindVertexArray(ea),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,u.noise);const t=Math.hypot(N0[0],N0[1]-Qo,N0[2]);for(let e=0;e<3;e++){const n=Qe[e===0?0:1],r=n.u;o.useProgram(n.p),e<2&&(o.uniform3fv(r.uCam,N0),o.uniform3fv(r.uCX,g0),o.uniform3fv(r.uCY,h0),o.uniform3fv(r.uCZ,u0),o.uniform4fv(r.uPa,aa),o.uniform4fv(r.uPb,na),o.uniform4fv(r.uPc,ra),o.uniform1i(r.uNP,Ko),o.uniform4f(r.uS,E0,Ft,Yo,Je),o.uniform4f(r.uW,H0[0],H0[1],H0[2],H0[3]),o.uniform4f(r.uO,wt,$e?1:0,Vo?1:0,Ae),o.uniform4f(r.uCd,0,0,k,j),o.uniform4f(r.uCd2,I0,Mt,o0?k:0,Ct),o.uniform3fv(r.uCw,S0.wax),o.uniform3fv(r.uTab,oe),o.uniform3fv(r.uWal,ae),o.uniform3fv(r.uAmb,Re),o.uniform4fv(r.uBk,ca),o.uniform1i(r.uNB,to.length/4),o.uniform1i(r.uIt,24),o.uniform1i(r.uNL,o0?2:1),o.uniform4f(r.uGl,0,0,pn?4.2:0,9.5),o.uniform1f(r.uGw,6.5),o.uniform1f(r.uTz,J0?E0===0?16:34:1e4)),ia(ke[e]);const s=e===1?-eo:eo;o.uniform4f(r.uV,Y,t,4,e===0?0:1),o.uniform4f(r.uL0,s,j+sa-(E===4?.6:0),0,ta),o.uniform4f(r.uL1,I0+s,Ct+sa,Mt,o0?ta:0),o.drawArrays(o.TRIANGLES,0,3)}const a=u.blur.u;o.useProgram(u.blur.p),o.uniform4f(a.uP,1/x,x*.016,0,0),o.uniform1i(a.uTaps,28),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,ke[1]);for(let e=0;e<3;e++)ia(oa[e]),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,ke[e]),o.drawArrays(o.TRIANGLES,0,3);o.bindFramebuffer(o.FRAMEBUFFER,null);for(const e of ke)o.deleteTexture(e)}const _=64,V0=18,C=_*V0,ne=k/V0,g=112,m0=144,fa=j+.3,v0=(fa-N)/m0,W=new Float32Array(C),At=new Float32Array(C),ft=new Float32Array(C),Lt=new Float32Array(C),tt=new Float32Array(C),Pt=new Float32Array(C),ut=new Uint8Array(C),Ee=new Int32Array(C),ht=new Uint8Array(C),oo=new Int32Array(C),q0=new Int32Array(C*4),Vn=0,mt=[1.6,3,2.35,1.5,9][E],ao=N-j+.25,y0=E===4;for(let t=0;t<V0;t++)for(let a=0;a<_;a++){const e=t*_+a,n=(t+.5)*ne;Lt[e]=n,tt[e]=(a+.5)/_*R-Math.PI,Pt[e]=R/_*n*ne,ut[e]=t===V0-1?2:1,ft[e]=.75+.5*M(),q0[e*4]=t*_+(a+_-1)%_,q0[e*4+1]=t*_+(a+1)%_,q0[e*4+2]=t>0?e-_:-1,q0[e*4+3]=t<V0-1?e+_:-1}for(let t=0;t<4;t++)for(let a=0;a<C;a++){let e=ft[a]*2,n=2;for(let r=0;r<4;r++){const s=q0[a*4+r];s>=0&&(e+=ft[s],n++)}ft[a]=e/n}let Q=0,z0=0,re=1,ce=0,qe=0,St=-1,j0=z(-Math.PI,Math.PI,M);if(P0>0&&!i.home){const t=z(-2.2,-.9,M),a=M()<.5?1:-1;j0=E0===2?t*a:(E0===0?0:(H0[0]+H0[1]>0?-1:1)*Math.PI/2)+(t+1.55)*.8*a}i.home&&(j0=-.75);function no(t){re++;let a=0,e=0,n=0;ce=0,qe=0,St=-1;for(let r=0;r<_;r++)W[r]<t&&(oo[e++]=r,Ee[r]=re);for(;a<e;){const r=oo[a++];n+=(t-W[r])*Pt[r],ce++,qe+=Pt[r];for(let s=0;s<4;s++){const c=q0[r*4+s];if(!(c<0||Ee[c]===re||W[c]>=t)){if(ut[c]===2&&!y0){(St<0||W[c]<W[St])&&(St=c);continue}Ee[c]=re,oo[e++]=c}}}return n}const pt=()=>{let t=1e3;for(let a=0;a<_;a++)t=Math.min(t,W[a]);return t},vt=new Float64Array(C),se=new Uint8Array(C),ua=new Int32Array(C),ro=new Float64Array(C+1),co=new Float64Array(C+1),B0=new Float64Array(C*4+_),zt=new Int32Array(C*4+_),ha=new Int32Array(C);let Rt=0;function yn(){let t=0,a=0,e=0;se.fill(0),vt.fill(1/0),Rt=0;const n=(r,s)=>{let c=t++;for(;c>0;){const l=c-1>>1;if(B0[l]<=r)break;B0[c]=B0[l],zt[c]=zt[l],c=l}B0[c]=r,zt[c]=s};for(let r=0;r<_;r++)vt[r]=W[r],n(W[r],r);for(;;){let r,s;if(a<e){if(r=ha[a++],s=vt[r],se[r])continue}else if(t>0){if(s=B0[0],r=zt[0],t--,t>0){const c=B0[t],l=zt[t];let f=0;for(;;){let m=2*f+1;if(m>=t||(m+1<t&&B0[m+1]<B0[m]&&m++,B0[m]>=c))break;B0[f]=B0[m],zt[f]=zt[m],f=m}B0[f]=c,zt[f]=l}if(se[r]||s>vt[r])continue}else break;se[r]=1,ua[Rt]=r,ro[Rt+1]=ro[Rt]+Pt[r],co[Rt+1]=co[Rt]+W[r]*Pt[r],Rt++;for(let c=0;c<4;c++){const l=q0[r*4+c];if(l<0||se[l]||ut[l]===2&&!y0)continue;const f=W[l];f<=s?vt[l]>s&&(vt[l]=s,ha[e++]=l):f<vt[l]&&(vt[l]=f,n(f,l))}}}function wn(t){let a=0,e=Rt;for(;a<e;){const n=a+e>>1;vt[ua[n]]<t?a=n+1:e=n}return t*ro[a]-co[a]}function Ce(){if(Q<=1e-5){Q=0,z0=pt(),ht.fill(0),ce=0,qe=0;return}let t=pt(),a=t+4;yn();for(let e=0;e<12;e++){const n=(t+a)*.5;wn(n)<Q?t=n:a=n}z0=(t+a)*.5,no(z0);for(let e=0;e<C;e++)ht[e]=Ee[e]===re?1:0}{const t=E===1&&_0>0?k-.45:Math.min(mt,k-ne*2.5),a=[M()*R,M()*R,M()*R];for(let e=0;e<C;e++){const n=Lt[e];if(y0){W[e]=ut[e]===2?0:-[.3,.6,1][_0];continue}if(_0===0){if(W[e]=-.06*f0(.5,0,n),E===3){const l=tt[e];W[e]+=(.1*Math.sin(l+a[0])+.06*Math.sin(3*l+a[1])+(ft[e]-1)*.25)*f0(.4,k,n)}continue}const r=_0===1?E===1?-1.6:-.5:E===1?-2.9:E===2?-1.4:-.7,s=f0(t+.12,t-.3,n);let c=r*s;if(mt>k){const l=Math.exp(-Math.pow(Math.atan2(Math.sin(tt[e]-j0),Math.cos(tt[e]-j0))/.5,2));c=Math.min(c,r*.4-(E===3?.06:.18+.1*P0)*l*f0(k*.5,k,n))+(ft[e]-1)*.1*f0(k*.6,k,n)}else{const l=tt[e];c+=(.12*Math.sin(l+a[0])+.07*Math.sin(2*l+a[1])+.05*Math.sin(3*l+a[2])-(.16+.14*Math.min(P0,1.5))*Math.exp(-Math.pow(Math.atan2(Math.sin(l-j0),Math.cos(l-j0))/.6,2)))*f0(t,k,n)+(ft[e]-1)*.1*f0(t,k,n)}if(c-=.14*f0(k-2.2*ne,k,n)*(_0>0?1:.5),E===3){const l=tt[e],f=Math.exp(-Math.pow(Math.atan2(Math.sin(l-j0),Math.cos(l-j0))/.55,2));c+=(.12*Math.sin(l+a[0])+.08*Math.sin(2*l+a[1])+.05*Math.sin(3*l+a[2])+(ft[e]-1)*.25-.08*f)*f0(k*.45,k,n)}W[e]=Math.max(c,ao)}if(_0>0||y0){let e=1e3;for(let n=C-_;n<C;n++)e=Math.min(e,W[n]);Q=no(Math.min(e-.04,pt()+(y0?.35:.6))),y0&&_0===0&&(Q*=.3)}else Q=.02;Ce()}const e0=new Float32Array(g*m0*4),C0=[];let ie=0,so=0,io=0;const ma=t=>(Math.floor((t/R+.5)*g)%g+g)%g,jn=Math.max(1,Math.round(.17/(R*k/g)));function lo(t,a,e,n,r,s){const c=ma(t),l=Math.floor((a-N)/v0);if(l<0||l>=m0)return;const f=Math.max(1,Math.round(n/(R*k/g))),m=R*k/g,p=en(f);for(let v=-f;v<=f;v++){const A=p[v+f],q=(l*g+((c+v)%g+g)%g)*4;e0[q]+=e*A/(m*v0),e0[q]>.32&&(e0[q]=.32),r>e0[q+1]&&(e0[q+1]=r),s>=0&&e*A/(m*v0)>.02&&(e0[q+2]=s)}}const pa=(t,a)=>{const e=V(Math.floor((a-N)/v0),0,m0-1);return e0[(e*g+ma(t))*4]};function bn(t,a,e,n,r,s,c){const l=Math.max(e-a,1e-4),f=Math.floor((a-N)/v0),m=Math.floor((e-N)/v0);for(let p=f;p<=m;p++){const v=Math.max(a,N+p*v0),A=Math.min(e,N+(p+1)*v0);A>v&&lo(t,N+(p+.5)*v0,n*(A-v)/l,r,s,c)}}const Gt=t=>{let a=Math.imul((t|0)^668265261,374761393);return a^=a>>>15,a=Math.imul(a,2246822519),a^=a>>>13,(a>>>0)/4294967296*2-1},n0=t=>{const a=Math.floor(t),e=t-a,n=e*e*(3-2*e),r=Gt(a);return r+(Gt(a+1)-r)*n};function fo(t,a){t.seed===void 0&&(t.seed=t.rnd()*100),t.temp-=a*(.07+.025/(.03+t.vol*3));const e=.5+.5*(.65*n0(t.y*.47+t.seed*3.7)+.35*n0(t.y*1.13+t.seed*1.3)),n=(2.4*t.temp*t.temp*V(t.vol/.08,.4,1.4)+.03)*(.45+.95*e),r=t.y-n*a,s=(.21+Math.min(.18,t.vol*.7))*Math.max(.6,.82+.4*n0(t.y*.37+t.seed)+.1*n0(t.y*1.9+t.seed*2.3)),c=Math.min(t.vol,(t.y-r)*s*(.09+.07*(1-t.temp))*(1.22-.44*e));t.vol-=c,bn(t.a,r,t.y,c,s,t.warm?Math.max(t.temp,.3):0,t.ci),t.y=r;const l=R/g*1.5,f=pa(t.a-l,t.y-v0),m=pa(t.a+l,t.y-v0);if(t.a-=V((m-f)*3,-1,1)*.03/Math.max(k,1.4)-(n0(t.y*.6+t.seed*3.1)*.5+.08*n0(t.y*1.7+t.seed*.7))*(t.y-r)/Math.max(k,1.4),t.temp<.06||t.vol<.003||t.y<=N+.08){const p=Math.max(t.y,N+.05),v=Math.max(2,Math.round((.3+t.vol*2.4)/v0));let A=0;for(let q=0;q<v;q++)A+=Math.pow(1-q/v,.9);for(let q=0;q<v;q++)lo(t.a+.03*n0(q*.7+t.seed)/k,p+q*v0,t.vol*Math.pow(1-q/v,.9)/A,s*(1.12-.35*q/v)*(.9+.2*n0(q*.9+t.seed*1.9)),t.warm?.5:0,t.ci);t.done=!0}}if(E===3)gn();else{const t=y0?0:Math.round([1,5,11][_0]*(E===1?.6:E===3?2.4:E===2?.8:1.2)*z(.7,1.25,M));for(let a=0;a<t;a++){const n={a:M()<.6||P0>0?j0+(M()+M()+M()-1.5)*(P0>0?.6:1.2):z(-Math.PI,Math.PI,M),y:j-M()*Math.min(2.5,O0*.4)-.1,vol:z(.12,.42,M)*(k>2?1.6:1),temp:z(.85,1,M),rnd:M,warm:!1,ci:-1};for(let r=0;r<400&&!n.done;r++)fo(n,1/15)}if(E===1&&_0>0){const a=P(28),e=2+Math.floor(a()*3);for(let n=0;n<e;n++){const r={a:j0+(P0>0?-.5+(n+a())*1/e:.5+(n+a())*1.9/e),y:j-.15-a()*.5,vol:.2+a()*.5,temp:.8+a()*.2,rnd:a,warm:!1,ci:-1};for(let s=0;s<400&&!r.done;s++)fo(r,1/15)}}if(_0>0&&mt>k)for(let a=0;a<6;a++)lo(j0+(a-2.5)*.08,j-.1,.03,.2,0,-1)}{const t=new Float32Array(g*m0);for(let a=0;a<(E===3?6:2);a++){for(let e=0;e<g*m0;e++)t[e]=e0[e*4];for(let e=0;e<m0;e++)for(let n=0;n<g;n++){const r=e*g+n,s=e*g+(n===0?g-1:n-1),c=e*g+(n===g-1?0:n+1);e0[r*4]=(t[s]+2*t[r]+t[c])/4}for(let e=0;e<g*m0;e++)t[e]=e0[e*4];for(let e=0;e<g;e++)for(let n=0;n<m0;n++){const r=Math.min(m0-1,n+1)*g+e,s=Math.max(0,n-1)*g+e,c=n*g+e;e0[c*4]=(t[r]+2*t[c]+t[s])/4}}}if(!y0){const t=P(12),a=t()*R,e=t()*R,n=t()*40,r=.15+.85*Math.min(1,k/3.8),s=new Float32Array(g),c=new Float32Array(g),l=new Float32Array(g),f=new Float32Array(g),m=new Float32Array(g);for(let p=0;p<g;p++){const v=(p+.5)/g*R-Math.PI;s[p]=.006*n0((p+.5)/g*R*4.3+n),c[p]=Math.sin(v*3),l[p]=Math.cos(v*3),f[p]=Math.sin(v*7),m[p]=Math.cos(v*7)}for(let p=0;p<m0;p++){const v=N+(p+.5)*v0,A=n0(v*.35+n),q=n0(v*.8+n*1.7),d=a+A*2,F=e+q*3,$=Math.sin(d),K=Math.cos(d),T0=Math.sin(F),K0=Math.cos(F),Z0=E===0?.17*V(1-(v-N)/(j-N),0,1):0,Qt=_0===2&&E!==3?.2*Math.pow(f0(N+.9,N,v),1.5):0;for(let p0=0;p0<g;p0++)e0[(p*g+p0)*4+3]=Math.min(.26,r*(.05*(c[p0]*K+l[p0]*$)+.03*(f[p0]*K0+m[p0]*T0)+s[p0])+Z0+Qt*(.85+.15*f[p0]*K0))}}function Mn(t,a,e,n,r,s,c,l,f,m,p,v,A,q,d){const F=A()*97,$=Math.min(d||.5,p*(1+.3*A())),K=$*(1.5+.9*A()),T0=f+m-K,K0=v*(1.1+.25*A()),Z0=Math.max(0,Math.floor(f/r)),Qt=Math.min(n-1,Math.ceil((f+m)/r));for(let p0=Z0;p0<=Qt;p0++){const D0=(p0+.5)*r,$t=V((D0-f)/m,0,1),h=s(p0),L=l+(.34*n0(D0*.7+F)+.12*n0(D0*2.3+F*1.7))*Math.min(1,$t*2)*Math.min(1,p*3)/h,U=1-.38*f0(T0-2.4*K,T0-.3*K,D0),O=p*(1.28-.45*$t)*U,B=O*(.82+.34*n0(D0*1.5+F*2.1)),H=O*(.82+.34*n0(D0*1.3+F*3.3)),s0=v*(1-.35*$t)*f0(f,f+.3,D0+.02),D=(D0-T0)/K,J=Math.abs(D)<1?$*Math.sqrt(1-D*D):0,w0=Math.max(B,H,J),I=c?n-1-p0:p0,t0=(L/R+.5)*e,i0=Math.ceil(w0/h/R*e)+1;for(let Z=Math.floor(t0)-i0;Z<=Math.floor(t0)+i0;Z++){const b0=(Z+.5-t0)/e*R*h;let l0=0;if(D0<T0){const $0=b0<0?-b0/B:b0/H;$0<1&&(l0=s0*Math.pow(1-$0*$0,.55))}if(J>0&&Math.abs(b0)<J){const $0=K0*Math.sqrt(Math.max(1-b0/$*(b0/$)-D*D,0));$0>l0&&(l0=$0)}if(l0<=.002)continue;const nt=I*e+(Z%e+e)%e,Q0=t[nt*a];t[nt*a]=Math.max(Q0+l0*.62,l0),q(nt,l0)}}}function gn(){const t=P(4),a=Math.round(5+O0*1.3),e=()=>k,n=()=>{},r=[t()*R,t()*R,t()*R];for(let s=0;s<m0;s++){const c=N+(s+.5)*v0,l=f0(N+.75,N,c);if(l<=0)break;for(let f=0;f<g;f++){const m=(f+.5)/g*R-Math.PI;e0[(s*g+f)*4]+=l*(.12+.05*Math.sin(m*2+r[0])+.04*Math.sin(m*5+r[1])+.03*Math.sin(m*9+r[2]))}}for(let s=0;s<2;s++){const c=s===0,l=c?Math.round(a*.7):a+2;for(let f=0;f<l;f++){const m=(f+t()*.9)/l*R+(c?0:.4),p=c?z(.2,.34,t):z(.11,.2,t),v=z(.25,.55,t)+(c?0:t()*O0*.35),A=Math.max(O0-v-.1,.5),q=Math.min(A,(c?z(.55,1,t):z(.2,.8,t))*O0);Mn(e0,4,g,m0,v0,e,!0,m-Math.PI,v,q,p,c?z(.09,.14,t):z(.07,.11,t),t,n,c?.26:.2)}}for(let s=0;s<g*m0;s++)e0[s*4]>.32&&(e0[s*4]=.32)}let Fe=1,uo=0,Le=!0,le=0;const va=.004,Tn=.05,An=.45,da=new Float64Array(C),xa=new Float64Array(C),ya=new Float64Array(C);for(let t=0;t<C;t++)da[t]=f0(mt+.5,mt-.7,Lt[t]),xa[t]=Math.sin(tt[t]),ya[t]=f0(0,k,Lt[t]);function wa(t){if(Fe>.05){for(let e=0;e<C;e++){const n=Lt[e];let r=Fe*da[e]*ft[e]*(1+.45*V(uo,-1.5,1.5)*xa[e]*ya[e]);if(y0&&ut[e]===2&&(r=0),At[e]=Et(At[e],V(r,0,1.5),t*.8),At[e]<.02)continue;let s=0;if(ht[e])s=(mt>k?va:.006)*At[e]*Math.exp(-(z0-W[e])/.5)*t*(ut[e]===2?.3:1);else{const c=e*4;ht[q0[c]]||ht[q0[c+1]]||q0[c+2]>=0&&ht[q0[c+2]]||q0[c+3]>=0&&ht[q0[c+3]]?s=.06*At[e]*t*(ut[e]===2?Tn:1):Lt[e]<.45&&ce===0&&(s=.03*At[e]*t)}if(s>0){const c=Math.max(W[e]-s,ao);Q+=(W[e]-c)*Pt[e]*.9,W[e]=c}}Q=Math.max(0,Q-(mt>k?va*An:.006*.55)*.9*Math.PI*Math.min(mt,k)*Math.min(mt,k)*Fe*t*Math.min(1,Q/.06))}else{for(let e=0;e<C;e++)At[e]*=Math.exp(-t*.5);if(Q>0){const e=1-Math.exp(-t*.06);for(let n=0;n<C;n++)if(ht[n]){const r=(z0-W[n])*e;W[n]+=r,Q-=r*Pt[n]}}}if(Ce(),St>=0&&!y0&&Q>0){const e=St,n=W[e]+.015;if(z0>n){const r=Q-no(n),s=Math.max(0,r*Math.min(1,4*t));if(s>0){Q-=s;const c=tt[e];so+=Math.sin(c)*s,io+=Math.cos(c)*s,ie+=s}Ce()}}if(ie>.06){const e=Math.atan2(so,io);let n=!1;for(const r of C0)if(!r.done&&Math.abs(Math.atan2(Math.sin(r.a-e),Math.cos(r.a-e)))<.2){r.vol=Math.min(r.vol+ie,.6),r.temp=Math.max(r.temp,.9),n=!0;break}!n&&C0.length<24&&(C0.push({a:e,y:j+ba(e),vol:Math.min(ie,.35),temp:1,rnd:w,warm:!0,ci:-1}),et.push("drip")),ie=so=io=0}for(const e of C0)e.done||(fo(e,t),Le=!0);for(let e=C0.length-1;e>=0;e--)C0[e].done&&C0.splice(e,1);if(le>.004){const e=Math.exp(-t/25);le=0;for(let n=1;n<e0.length;n+=4)e0[n]*=e,e0[n]>le&&(le=e0[n]);Le=!0}C0.length&&(le=1)}function ba(t){const a=(Math.floor((t/R+.5)*_)%_+_)%_;return W[C-_+a]}function zn(t){if(y0){ue=1;return}for(let a=0;a<C;a++){const e=Math.abs(Math.atan2(Math.sin(tt[a]-t),Math.cos(tt[a]-t))),n=Lt[a];if(e<.32&&n>k*.55){const r=Math.min(W[a],Math.max(z0,pt())-.18*f0(k*.55,k,n)*(1-e/.32));W[a]=Math.max(r,ao)}}Q<.05&&(Q+=.08),Ce(),ue=1}const fe=new Float32Array(C*4),Ma=new Uint16Array(C*4),ga=new Uint16Array(g*m0*4),Ta=new Float32Array(1),Rn=new Uint32Array(Ta.buffer),Aa=(t,a)=>{for(let e=0,n=a.length;e<n;e++){const r=t[e],s=r>>>16&32768,c=(r>>>23&255)-112;a[e]=c<=0?s:c>=31?s|31744:s|c<<10|(r&8388607)>>>13}},kn=new Uint32Array(fe.buffer),En=new Uint32Array(e0.buffer),Yn=t=>{Ta[0]=t;const a=Rn[0],e=a>>>16&32768,n=(a>>>23&255)-112;return n<=0?e:n>=31?e|31744:e|n<<10|(a&8388607)>>>13},za=[X0(o,_,V0,"f16",!0),X0(o,_,V0,"f16",!0)],Ra=[X0(o,g,m0,"f16",!0),X0(o,g,m0,"f16",!0)];let ho=za[0],mo=Ra[0],ka=0,Ea=0;function qa(){for(let t=0;t<C;t++){const a=t*4;let e=W[t]*2,n=2;if(!(y0&&ut[t]===2))for(let s=0;s<4;s++){const c=q0[t*4+s];c>=0&&!(y0&&ut[c]===2)&&(e+=W[c],n++)}const r=e/n-Ca[t/_|0];fe[a]=r,fe[a+1]=ht[t]&&Q>0?Math.max(z0-r,0):0,fe[a+2]=V(At[t],0,1),fe[a+3]=0}Aa(kn,Ma),ka^=1,ho=za[ka],o.bindTexture(o.TEXTURE_2D,ho),o.texSubImage2D(o.TEXTURE_2D,0,0,0,_,V0,o.RGBA,o.HALF_FLOAT,Ma)}function po(){Aa(En,ga),Ea^=1,mo=Ra[Ea],o.bindTexture(o.TEXTURE_2D,mo),o.texSubImage2D(o.TEXTURE_2D,0,0,0,g,m0,o.RGBA,o.HALF_FLOAT,ga),Le=!1}const et=[];let ue=0;const he=y0?.02:E===2?.1:Math.min(.42,k*.16),Ca=new Float32Array(V0);for(let t=0;t<V0;t++){const a=.93*V(1-(V0-1-t)*ne/he,0,1);Ca[t]=y0?0:he*(1-Math.sqrt(1-a*a))}for(let t=0;t<24;t++)wa(1/15);qa(),po();const Ot=E===3?xn():null;if(E===3){for(let t=0;t<g;t++){const a=(t+.5)/g*R-Math.PI,e=Math.atan2(Math.cos(a),Math.sin(a))/R+.5,n=e*448-.5,r=Math.floor(n),s=n-r,c=Ot[2][(r+448)%448]*(1-s)+Ot[2][(r+449)%448]*s,l=Math.max(.9*c-.1,.12)+.05+.1*n0(a*2.3+5.1)+.05*n0(a*6.1+1.7);for(let f=0;f<m0&&f*v0<1.6;f++)e0[(f*g+t)*4+2]=l/1.5}po()}un(o,u),fn(o,u,E===3),E===3?(o.activeTexture(o.TEXTURE4),o.bindTexture(o.TEXTURE_2D,Ot[0]),o.activeTexture(o.TEXTURE5),o.bindTexture(o.TEXTURE_2D,Ot[1]),o.activeTexture(o.TEXTURE0),la(),o.deleteTexture(Ot[0]),o.deleteTexture(Ot[1])):la(),u.rmQ||(u.rmQ=!0,setTimeout(()=>Ze(o,u,E!==3),150));const dt=S0.wl*(G0==="Mushroomed"?1.1:1),vo=G0==="Curled"?(w()<.5?-1:1)*z(.35,.55,w):G0==="Straight"?z(-.08,.08,w):z(-.25,.25,w),Pe=G0==="Mushroomed"?1:0;let d0=!0,ot=1,F0=0,xo=0,Ht=0,Y0=0,Se=0,xt=0,It=.8,Ie=0,me=0,x0=null,r0=0,yo=0,Ne=0,We=0,Fa=0,W0=0,qn=0,Vt=S0.H,wo=S0.W,pe=1,Ue=0,jt=1,La=0,_e=0;const Yt=96,bo=new Float32Array(Yt),Pa=[0,0,0,0],Sa=[0,0,0,0],Ia=[0,0,0,0];let ve=0;const Cn=t=>{const a=Math.floor(t),e=t-a,n=bo[(ve-a+Yt*4)%Yt],r=bo[(ve-a-1+Yt*4)%Yt];return n+(r-n)*e},at=[w()*R,w()*R,w()*R,w()*R],Na=E0===2?w()<.5?-1:1:(H0[0]+H0[1]>0?-1:1)*(w()<.8?1:-1);let Mo=3+w()*6,Nt=null;const R0=t=>{const a=Math.floor(t),e=t-a,n=e*e*(3-2*e),r=s=>{let c=Math.imul((s|0)^2654435769,2246822507);return c^=c>>>13,c=Math.imul(c,3266489909),c^=c>>>16,(c>>>0)/4294967296};return Et(r(a),r(a+1),n)*2-1};function Fn(t){let e=[.03,.2,.36][P0]*Na*(.5+.75*R0(r0*.21+at[0])+.42*R0(r0*.63+at[1]*3)+.2*R0(r0*1.7+at[2]*3));if(Mo-=t,Mo<=0&&(Nt={t:0,dur:1.2+w()*1.5,amp:Na*[.2,.4,.68][P0]*(.6+.6*w())},Mo=[13,8,4.5][P0]+w()*[10,7,5][P0],et.push("gust")),Nt){Nt.t+=t;const n=Nt.t/Nt.dur;n>=1?Nt=null:e+=Nt.amp*Math.pow(Math.sin(Math.PI*n),2)*(1+.4*R0(r0*7))}return e}const T=[0,0,0],c0=[0,0,0],Be=()=>j+(Q>0?z0:pt());function Wa(t){return A0(F0*.3,Be()+dt+Vt*.3,0,t)}function Ln(){d0=!1,Ht=0,Ie=1,It=1,yo=0,et.push("out")}function Ua(t,a){x0||(x0={t:0,x:t,y:a},et.push("strike"))}let go=!1,de=!1,De=0,To=.5,Ao=.5,Xe=0;const Wt=[0,0,0,0];function _a(t,a){if(Ne=0,!d0){Ua(t,a);return}const e=(t-Wt[0])/Wt[2],n=(a-Wt[1])/Wt[3];if(e*e+n*n<1.6&&Math.abs(e)<1.25){zn(Math.atan2(e,-n+.35)),et.push("dip");return}Wa(T),We=.6,Fa=Math.sign(T[0]-t)*.7}function Pn(t){const a=i.input,e=a.taps();let n=0,r=0;if(Se=0,go=!1,a.inside){const s=a.x,c=1-a.y;if(a.down){de||(de=!0,De=0,To=s,Ao=c,Xe=0),De+=t;const l=s-To,f=c-Ao,m=l/Math.max(t,.001),p=f/Math.max(t,.001);Xe+=Math.hypot(l,f),To=s,Ao=c;const v=Math.hypot(m,p);Wa(T);const A=T[0]-s,q=T[1]-c,d=Math.hypot(A,q)+1e-4;if(v>.05){const K0=Math.max(.25,(m*A+p*q)/(v*d)),Z0=v*K0*Math.exp(-d/.3)*4.5;n=m/v*Z0,r=p/v*Z0}A0(0,N+O0*.5,0,c0);const F=T[0]-c0[0],$=T[1]-c0[1],K=V(((s-c0[0])*F+(c-c0[1])*$)/(F*F+$*$),0,1.3),T0=Math.hypot(s-c0[0]-F*K,c-c0[1]-$*K);v<.3&&De>.18&&T0<.3&&Xe<.1&&(Se=1),Ne=0}else de&&(de=!1,go=!0,De<.3&&Xe<.03&&_a(s,c))}else de=!1;if(!a.down&&!go)for(const s of e)_a(s.x,1-s.y);return[n,r]}function Sn(t,a){La=Fn(t),We>0&&(We-=t);const e=a[0]+(We>0?Fa:0),n=a[1];Y0=Et(Y0,Se,1-Math.exp(-t*(Se>Y0?3:4)));const r=1-.88*Y0,s=La*r+e,c=n*r;W0=Math.hypot(s,c),qn=c,uo=s;const l=o0?.3:0,f=Math.max(1,Math.ceil(t/(1/60))),m=t/f;for(let d=0;d<f;d++)xo+=((V(s*1.3,-2.6,2.6)+l-F0)*45-xo*10)*m,F0+=xo*m,ve=(ve+1)%Yt,bo[ve]=F0;xt=V((W0-.8)/1.4,0,1),Ht=Ht*Math.exp(-t*1.2)+Math.max(0,W0-1.3)*t*3.6,d0&&Ht>1&&Ln(),d0?(ot=Math.min(1,ot+t*(.35+.6*(1-ot))),It=Et(It,.8,t)):(ot=Math.max(0,ot-t*6),It*=Math.exp(-t/3.5),yo+=t),Ie*=Math.exp(-t/2.6);const p=R0(r0*.47+at[2])*.018+R0(r0*1.6+at[3])*.009,v=(.1*Math.min(W0,1.2)+.12*xt)*R0(r0*5.7+at[1]);Ue=(p+v)*(1-.85*Y0);const A=(.006+.075*Math.min(W0,1.2))*(1-.9*Y0),q=9.5+1.8*R0(r0*.17+at[0]);_e=(_e+R*q*t)%R;for(let d=0;d<4;d++){const F=(d+1)/4,$=Math.pow(F,1.35),K=Cn(F*.26*60),T0=A*F*F*Math.sin(_e-5.6*F+at[1])+(.012+.05*Math.min(W0,1.2))*F*F*R0(r0*3.3-F*1.6+at[2]);Ia[d]=$*K+T0;const K0=A*F*F*Math.sin(_e*1.05-5.6*F+at[3]),Z0=$*(K-.6)+K0;Do[d]=Z0}for(let d=0;d<4;d++){let F=0,$=0;for(let K=0;K<4;K++)F+=Bo[d][K]*Ia[K],$+=Bo[d][K]*Do[K];Pa[d]=F,Sa[d]=$}if(Vt=S0.H*(Pe?1.12:1)*Math.max(ot,.05)*(1+.3*Y0)*(1+.22*Math.min(W0,1.2)-.55*xt)*(1+.15*V(c,-1,1))*(1+Ue*.9),wo=S0.W*(Pe?1.08:1)*(1-.25*xt)*(1-.07*Y0)*(.7+.3*Math.max(ot,.05)),me=0,x0){x0.t+=t;const d=x0.t;A0(0,Be()+dt,0,T);const F=V(d/.55,0,1),$=F*F*(3-2*F);x0.cx=T[0]+.004*$,x0.cy=T[1]-.004,me=.55*(d<.12?1.6*d/.12:1.6-.6*Math.min(1,(d-.12)/.3))*(d>.7?Math.max(0,1-(d-.7)/.5):1),!d0&&d>.3&&(d0=!0,ot=.12,Ht=0,et.push("catch")),d>1.35&&(x0=null)}pe=(d0?Math.max(ot,0):0)*(1+Ue)*(1-.35*xt)*(1+.1*Y0),jt=pe+me*.5+(d0?0:It*.015),Fe=d0?ot*(1+.15*Y0):0}const zo=300,xe=12,G=new Float32Array((zo+8)*xe),Kt=[];let ye=0;const Ba=o.createVertexArray(),Da=o.createBuffer();o.bindVertexArray(Ba),o.bindBuffer(o.ARRAY_BUFFER,Da),o.bufferData(o.ARRAY_BUFFER,G.byteLength,o.DYNAMIC_DRAW);for(let t=0;t<3;t++)o.enableVertexAttribArray(t),o.vertexAttribPointer(t,4,o.FLOAT,!1,xe*4,t*16),o.vertexAttribDivisor(t,1);o.bindVertexArray(null);const Xa=vo*.55,Ro=-Math.abs(vo)*.22;function In(t){const a=75*Ie+(d0?9*xt+1.5*Pe*(.3+xt):0);for(ye+=a*t;ye>=1&&Kt.length<zo;)ye-=1,Kt.push({x:Xa+(w()-.5)*.04,y:Ro+(d0?Vt:.05),vx:0,vy:.6,age:0,life:3.5+w()*2.5,ph:w(),a0:d0?.5:.6+.6*Ie});ye>1&&(ye=0);for(let e=Kt.length-1;e>=0;e--){const n=Kt[e];if(n.age+=t,n.age>n.life){Kt.splice(e,1);continue}const r=Math.max(n.y-Ro,0),s=.05+.13*r+.02*r*r,c=s*Math.sin(.75*r-r0*1.5+n.ph*r*.35)+.5*uo+.25*s*R0(n.ph*50+r0*.9);n.vx+=(c-n.vx)*Math.min(1,t*2.5),n.vy+=(2.4+.2*r-n.vy)*Math.min(1,t*1.4),n.x+=n.vx*t,n.y+=n.vy*t}}const ko=hn?{a:w()*R,r:4,y:0,z:0,x:0,fl:0}:null;function Nn(t){const a=ko;if(!a)return;const e=d0?1:.3;a.a+=t*(1.6+.8*R0(r0*.5+3)),a.r=1.8+2*(.5+.5*R0(r0*.31+9))/e;const n=Be()+dt+1.5;a.x=Math.cos(a.a)*a.r+.7*R0(r0*2.3),a.z=Math.sin(a.a)*a.r*.7,a.y=n+1.6*R0(r0*.6+5)+.5*R0(r0*3.1),a.fl+=t*38,Math.hypot(a.x-F0*.3,a.y-n,a.z)<1.6&&d0&&(Ue+=.08,et.push("moth"))}function Wn(t,a,e){let n=0;const r=Re,s=jt;for(const c of Kt){if(n>=zo)break;const l=c.age/c.life,f=n*xe,m=(.1+.09*c.age+.02*c.age*c.age)*e,p=Math.hypot(c.x-Xa,c.y-Ro),v=r[0]*14+It*.6*Math.exp(-p/1.4)+s*.25*Math.exp(-p/6);G[f]=t+c.x*e,G[f+1]=a+c.y*e,G[f+2]=m,G[f+3]=c.a0*.22*(1-l)*(1-l)*Math.min(1,c.age*6),G[f+4]=Math.min(1,r[0]*9+v*.95),G[f+5]=Math.min(1,r[1]*9+v*.62),G[f+6]=Math.min(1,r[2]*9+v*.4),G[f+7]=0,G[f+8]=0,G[f+9]=1,G[f+10]=0,G[f+11]=0,n++}if(ko){const c=ko;A0(c.x,c.y,c.z,T);const l=Be()+dt+1.5,f=Math.hypot(c.x-F0*.3,c.y-l,c.z),m=Math.min(1.6,jt*14/(f*f+1)+.05),p=T[2],v=.35+.55*Math.abs(Math.sin(c.fl)),A=T[0]-(c.px===void 0?T[0]:c.px),q=T[1]-(c.py===void 0?T[1]:c.py);c.px=T[0],c.py=T[1];const d=n*xe,F=Math.hypot(A,q),$=.55+.45*Math.abs(Math.sin(c.fl*.5));G[d]=T[0],G[d+1]=T[1],G[d+2]=(.42+Math.min(1.1,F/Math.max(p,1e-5)*.9))*p,G[d+3]=.5*$*v/.9,G[d+4]=Math.min(1,.55*m),G[d+5]=Math.min(1,.45*m),G[d+6]=Math.min(1,.32*m),G[d+7]=0,G[d+8]=F>1e-6?Math.atan2(-A,q):0,G[d+9]=Math.min(1,.36*p/G[d+2]),G[d+10]=0,G[d+11]=0,n++}return n}function Ga(t,a,e,n,r,s){let c=1e3,l=1e3,f=-1e3,m=-1e3;for(const p of[n,r])for(let v=0;v<12;v++){const A=v/12*R;A0(t+Math.sin(A)*e,p,a+Math.cos(A)*e,T),c=Math.min(c,T[0]),f=Math.max(f,T[0]),l=Math.min(l,T[1]),m=Math.max(m,T[1])}return[c-s,l-s,f+s,m+s]}const Un=Ga(0,0,k+(Tt==="Close"?.7:1.6),N,fa+.3,.004),_n=o0?Ga(I0,Mt,k+.7,N,Ct+.6,.004):null,Ge=y0?[4.2,9.5,6.5,1]:[0,0,0,0];let Oa=0,Oe=0;function Ha(t,a,e,n){let r=0;for(let p=0;p<8;p++)r+=ba(p/8*R-Math.PI);const s=e+r/8;A0(t,s,a,T);const c=T[0],l=T[1];A0(t+k-he*.8,s,a,c0);const f=c0[0]-c;A0(t,s,a+k-he*.8,c0);const m=l-c0[1];return n[0]=c,n[1]=l,n[2]=Math.max(f,1e-4),n[3]=Math.max(m,1e-4),n}const Va=[0,0,0,0],Zt=[0,0,1];A0(0,j+3,Ft,T),A0(25,j+3,Ft,c0),Zt[0]=T[0],Zt[1]=T[1],Zt[2]=E0===0?Math.max(Math.hypot(c0[0]-T[0],c0[1]-T[1]),1e-4):1e-4;const kt=[0,0,1,1],Bn=y0||E===3?0:f0(1.2,2.6,k)*(.5+.5*Math.min(1,O0/7));A0(0,0,0,T),kt[0]=T[0],kt[1]=T[1],A0(k*2.3,0,0,c0),kt[2]=Math.max(Math.hypot(c0[0]-T[0],c0[1]-T[1]),1e-4),A0(0,0,k*2.3,c0),kt[3]=Math.max(Math.hypot(c0[0]-T[0],c0[1]-T[1]),1e-4);function ja(t,a,e,n,r,s,c,l){o.uniform4f(t.uRect,s[0],s[1],s[2],s[3]),o.uniform4f(t.uC,a,e,k,n),o.uniform4f(t.uC2,N,n+.3,r,E),o.uniform4f(t.uF1,c[0],c[1],c[2],jt),o.uniform4f(t.uF2,l[0],l[1],l[2],o0?jt:0);const f=n+(Q>0?z0:pt())+dt-.38;o.uniform4f(t.uFa,a,f,e,wo),o.uniform4f(t.uFb,a+(r<0?F0-.6:F0),f+Vt,e,Y),o.uniform4f(t.uP,n+z0,Math.sqrt(qe/Math.PI),1,r0),o.drawArrays(o.TRIANGLE_STRIP,0,4)}function Ya(t,a,e,n,r,s,c){A0(a,n+(Q>0?z0:pt())+dt,e,T);const l=T[0],f=T[1],m=T[2];let p=l-8*m,v=l+8*m,A=f-7*m,q=f+10*m;x0&&s&&(p=Math.min(p,x0.cx-5*m),v=Math.max(v,x0.cx+5*m),A=Math.min(A,x0.cy-3*m),q=Math.max(q,x0.cy+5*m)),o.uniform4f(t.uRect,p,A,v,q),o.uniform4f(t.uB,l,f,m,r0),o.uniform4f(t.uS,Vt*(s?1:.94),wo,0,pe),o.uniform4f(t.uLn,r,0,.3+xt,xt*.8);const d=s?Pa:Sa;o.uniform4f(t.uAx,d[0],d[1],d[2],d[3]),o.uniform4f(t.uWk,dt,vo*(s?1:-1),Pe,It),o.uniform4f(t.uMk,c[0],c[1],c[2],c[3]),o.uniform4f(t.uFl,x0&&s?x0.cx:0,x0&&s?x0.cy:0,s?me:0,1),o.drawArrays(o.TRIANGLE_STRIP,0,4)}const we=[0,0,0],be=[0,0,0];function Ka(){Oa++,o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,x,x),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.disable(o.BLEND),o.colorMask(!0,!0,!0,!0),o.depthMask(!1),o.bindVertexArray(ea);let t=u.comp.u;o.useProgram(u.comp.p);for(let n=0;n<3;n++)o.activeTexture(o.TEXTURE0+n),o.bindTexture(o.TEXTURE_2D,oa[n]);o.activeTexture(o.TEXTURE3),o.bindTexture(o.TEXTURE_2D,u.noise),o.uniform4f(t.uF,jt,V(.5+F0*.35/(2*eo),0,1),r0,1),o.uniform4f(t.uO,$e?1+P0:0,Vo?1:0,Oa*.137%1,Bn),o.uniform4f(t.uG,kt[0],kt[1],kt[2],kt[3]),o.uniform4f(t.uR,Zt[0],Zt[1],Zt[2],0),o.drawArrays(o.TRIANGLES,0,3),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA);const a=(Q>0?z0:pt())+dt+.25*Vt;we[0]=F0*.3,we[1]=j+a,we[2]=0,be[0]=I0+(F0-.6)*.3,be[1]=Ct+a,be[2]=Mt,t=u.cand.u,o.useProgram(u.cand.p),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,ho),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,mo),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,u.noise),o.uniform3fv(t.uCam,N0),o.uniform3fv(t.uCX,g0),o.uniform3fv(t.uCY,h0),o.uniform3fv(t.uCZ,u0),o.uniform3fv(t.uWax,S0.wax),o.uniform3fv(t.uGlow,S0.glow),o.uniform3fv(t.uAmb,Re),o.uniform4f(t.uM,S0.gl,.06+ue*.5,2*Y/x,he),o.uniform4f(t.uG,Ge[0],Ge[1],Ge[2],Ge[3]),o.uniform1i(t.uIt,Math.round(V(22+9*k,24,56))),o0&&ja(t,I0,Mt,Ct,-1,_n,be,we),ja(t,0,0,j,1,Un,we,be),t=u.flame.u,o.useProgram(u.flame.p),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,u.noise),Ha(0,0,j,Wt),o0&&(Ha(I0,Mt,Ct,Va),Ya(t,I0,Mt,Ct,F0-.6,!1,Va)),Ya(t,0,0,j,F0,!0,Wt),A0(0,j+(Q>0?z0:pt())+dt,0,T);const e=Wn(T[0],T[1],T[2]);e&&(t=u.spr.u,o.useProgram(u.spr.p),o.bindVertexArray(Ba),o.bindBuffer(o.ARRAY_BUFFER,Da),o.bufferSubData(o.ARRAY_BUFFER,0,G,0,e*xe),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,e)),o.disable(o.BLEND),o.bindVertexArray(null)}const Za=8e3,Eo=new Float32Array(1024),Dn=M0==="Rain and streetlamps",Qa=(w()-.5)*1.2;let He=0,qo=0,Ve=0,Co=0,Fo=.5+w(),$a=0,Lo=0,Ut=parseInt(y.slice(56,64),16)|0||625341585;const je=()=>(Ut^=Ut<<13,Ut^=Ut>>>17,Ut^=Ut<<5,(Ut>>>0)/2147483648-1);function Xn(t){const a=i.sound;if(!a.on){et.length=0;return}for(const s of et)s==="out"?(a.hit("noise",.32,{cutoff:700,dur:.4}),a.hit("noise",.14,{cutoff:2600,dur:.12})):s==="strike"?(a.hit("noise",.35,{cutoff:4200,dur:.16}),a.hit("snare",.1),a.hit("noise",.16,{cutoff:1500,dur:.5,at:.12})):s==="catch"?(a.hit("kick",.16),a.note(45,{dur:.25,vel:.07,wave:"sine"})):s==="dip"?a.hit("blip",.1,{freq:620}):s==="drip"?a.hit("blip",.035,{freq:400+w()*160}):s==="moth"?w()<.12&&a.hit("noise",.05,{cutoff:380,dur:.06}):s==="gust"&&P0>0&&a.hit("noise",.06*P0,{cutoff:450,dur:1.3});et.length=0,Lo-=t,d0&&W0>.6&&Lo<=0&&(Lo=.03+w()*.12/W0,a.hit("click",V(.05+.12*W0*w(),0,.35),{pan:(w()-.5)*.3})),Fo-=t,Fo<=0&&(Fo+=1,$a++,$a%2?a.hit("click",.06,{pan:Qa}):a.hit("blip",.025,{freq:1500,pan:Qa})),He+=t*Za;let e=Math.floor(He);if(He-=e,e=Math.min(e,Eo.length),e<16){He+=e;return}const n=(d0?pe:0)*(.05+.5*Math.min(W0,1.5))+me*.3,r=Math.min(W0,2)*.5;for(let s=0;s<e;s++){const c=je();qo+=(c-qo)*.5,Ve+=(c-Ve)*.07;let l=(c-qo)*n*.4+Ve*r;Dn&&(je()>.996&&(Co=.3+.5*Math.abs(je())),Co*=.86,l+=Co*je()*.4+Ve*.12),Eo[s]=l}a.pcm(Eo.subarray(0,e),Za,{vel:.5})}Ka();const Gn=(t,a)=>{a=Math.min(Math.max(a,0),.12),r0+=a,Ne+=a;const e=Pn(a);Sn(a,e),!d0&&!x0&&Ne>14&&yo>8&&Ua(.5-a0*.3,.2),Oe+=a;let n=0;for(;Oe>=1/15&&n<3;)wa(1/15),Oe-=1/15,n++;n>=3&&(Oe=0),n&&(qa(),Le&&po()),In(a),Nn(a),ue=Math.max(ue*Math.exp(-a*1.5),Math.min(W0,1.5)*.25),Ka(),Xn(a)};return i.dbg&&(i.dbg.get=()=>({hsMin:Math.min(...W),hsMax:Math.max(...W),rimMin:Math.min(...W.subarray(C-_)),V:Q,L:z0,poolCells:ce,drips:C0.length,lit:d0,leanX:F0,strain:Ht,shield:Y0,If:pe,rimE:Wt,touchEdge:St,sdsum:e0.reduce((t,a,e)=>e%4?t:t+a,0),d0:C0[0]&&{a:C0[0].a,y:C0[0].y,vol:C0[0].vol,temp:C0[0].temp,YT:j,Y0:N,HC:v0}})),Gn}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
