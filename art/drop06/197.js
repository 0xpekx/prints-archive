// Paper Plane: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/197.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(yo){yo&&function(){"use strict";const To=new WeakMap,ut=`
`,C0="#version 300 es"+ut+"precision highp float;"+ut+"precision highp int;"+ut+"precision highp sampler2D;"+ut,lt=C0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Xe=`uniform sampler2D uW; uniform sampler2D uN; uniform vec4 uA[10];
#define W2 uA[0].x
#define HH uA[0].y
#define BAY uA[0].z
#define REV uA[0].w
#define SD uA[1].xyz
vec4 winMask(vec2 q, float lod){
  float u = (q.x - uA[2].w) / BAY, bay = floor(u);
  float r = fract(bay * 0.7131 + uA[6].w); r = fract(r * r * 91.7 + r * 13.1);
  vec4 m = textureLod(uW, vec2(u, q.y / HH), lod);
  float top = HH * (1.0 - uA[3].w * step(0.58, r) * (0.18 + 0.62 * fract(r * 7.3)));
  m.rgb *= mix(0.06, 1.0, 1.0 - smoothstep(top - 0.02, top + 0.02, q.y));
  return m;
}
// n12d: a shuttered hall (only on mints that roll it: the define is absent from every other mint's text). Bays whose whole
// number is not 0 modulo SHUT are closed by leaves standing in the reveal at the glass; light gets through only at the
// hairline where the leaves meet and along their top. In the open bay one leaf is folded back: half the window lets the sun in.
#ifdef SHUT
// p2: louvred leaves leak. Between the slats, every 6 cm of height, a blade of sun gets through over a tenth of the period; the
// blades are box-filtered over shutF (metres of window height: the sun's own width at the distance, plus the pixel's footprint), so
// they stand sharp and separate near the glass and run together into their average, a dim striped glow, a few metres on
float shutC = 0.0, shutF = 1.0, shutP = 0.0;
#ifdef SHB
float bladeI(float x){ return floor(x) * 0.1 + clamp(fract(x) - 0.45, 0.0, 0.1); }
#endif
// (the march's own: only which leaf is closed, at a faint thread)
float shutM(vec2 q){
  float u = (q.x - uA[2].w) / BAY;
  return mix(1.0, 0.012, max(step(0.5, mod(floor(u), SHUT)), step(fract(u), 0.5)));
}
float shutK(vec2 q){
  float u = (q.x - uA[2].w) / BAY, bay = floor(u);
  shutC = max(step(0.5, mod(bay, SHUT)), step(fract(u), 0.5));
  // two pairs of leaves across the opening, so their meeting lines fall in clear glass, not on the sash's middle stile; their tops
  // meet the upper leaves in the middle of a row of panes
  float lx = abs(abs(fract(u) - 0.5) * BAY - SHX), hd = HH - 0.7;
#if SHK == 0
  float zt = hd - 0.3;
#else
  float zt = SHS + (hd - SHS) * 0.62;
#endif
  zt = SHS + (floor((zt - SHS) / 0.62) + 0.5) * 0.62;
  float slit = max(1.0 - smoothstep(0.004, 0.011, lx), 1.0 - smoothstep(0.004, 0.011, abs(q.y - zt)));
  slit *= min(0.012 / max(shutF, 1e-3), 1.0);   // (p2: a hairline spread wider than itself dims, or far off it beads into dots)
#ifdef SHB
  float x = q.y / 0.06 - 0.35, w = max(shutF / 0.06, 0.02);
  float bl = mix((bladeI(x + w * 0.5) - bladeI(x - w * 0.5)) / w, 0.1, smoothstep(0.7, 1.2, w));
#else
  float bl = 0.1;   // (the plane and the motes take the blades' average)
#endif
  return mix(1.0, min(0.01 + 0.7 * bl + 0.95 * slit, 1.0), shutC);
}
#define SHUTM(q) shutK(q)
#else
#define SHUTM(q) 1.0
#endif
vec3 sunAt(vec3 p){
  float k = 1.0 / SD.y, t1 = (W2 - p.y) * k, t2 = t1 + REV * k, lod = clamp(t1 * 0.22, 0.0, 3.0);
  vec2 a = p.xz + SD.xz * t1, b = p.xz + SD.xz * t2;
  vec4 ma = winMask(a, lod), mb = winMask(b, lod);
#ifdef SHUT
  shutF = shutP + t2 * 0.0093;
#endif
  float n = textureLod(uN, b * 0.07 + vec2(uA[4].w * 0.006, uA[4].w * 0.002), 0.0).r;
  return ma.a * mb.a * mb.rgb * SHUTM(b) * mix(1.0, smoothstep(0.32, 0.62, n) * 1.2, uA[1].w);
}
`,zo=`float stackAt(float px, float a, float lod){
  vec2 fuv = vec2((uT[1].w - px) / uT[2].w, a / uT[3].w);
  vec2 gd = step(vec2(0.0), fuv) * step(fuv, vec2(1.0));
  return gd.x * gd.y * textureLod(uFm, fuv, lod).r;
}
float planeShadow(vec3 vb, float t0, float lodK){
  vec3 lb = uT[6].xyz;
  float h0 = uT[4].z, sd = sin(uT[4].y), cd = cos(uT[4].y), occ = 0.0;
  for (int i = 0; i < uBranches; i++) {
    float sgn = i == 0 ? 1.0 : -1.0;
    vec2 n = i < 2 ? vec2(-sgn * sd, cd) : vec2(1.0, 0.0);
    float den = dot(lb.yz, n);
    float tt = -dot(vb.yz, n) / (abs(den) < 1e-4 ? 1e-4 : den);
    vec3 q = vb + lb * tt;
    float a = i < 2 ? h0 + q.y * sgn * cd + q.z * sd : h0 + q.z;
    a = (i < 2 ? step(0.0, q.y * sgn) : step(q.z, 0.0)) * a + (i < 2 ? (1.0 - step(0.0, q.y * sgn)) * (-1.0) : (1.0 - step(q.z, 0.0)) * (-1.0));
    float lod = max(log2(max(tt, 0.002) * lodK), 0.0);
    occ = max(occ, step(t0, tt) * clamp(stackAt(q.x, a, lod) * 6.0, 0.0, 1.0));
  }
  return 1.0 - occ * (1.0 - uT[6].w * 0.7);
}
`,na=C0+Xe+`uniform sampler2D uFl; uniform sampler2D uFm; uniform vec4 uC[8]; uniform vec4 uT[8]; uniform int uBranches; uniform int uSteps;
out vec4 o;
`+zo+`
vec3 skyCol(vec3 d){
  float k = clamp(d.z * 1.4 + 0.25, 0.0, 1.0), sn = max(dot(d, SD), 0.0), s2 = sn * sn, s4 = s2 * s2, s8 = s4 * s4, s32 = s8 * s8; s32 *= s32;
  vec3 c = mix(uA[7].rgb, uA[8].rgb, k) + uA[2].rgb * uA[8].w * (0.05 * s8 + 0.35 * s32 + 6.0 * s32 * s32 * s32);
  // the far side of the glass, by uA[7].w: full leaf swaying a little, bare branches, a courtyard wall in sun, or open sky
  float ok = uA[7].w, hz = d.z / max(d.y, 0.1), hx = d.x / max(d.y, 0.1), tt = uC[5].w;
  vec2 tv = vec2(hx * 0.21 + 0.004 * sin(tt * 0.37) + 0.0025 * sin(tt * 0.23 + 1.7), hz * 0.21 + 0.002 * sin(tt * 0.29 + 0.4));
  vec4 n = textureLod(uN, tv * (ok > 0.5 && ok < 1.5 ? vec2(3.2, 0.9) : vec2(2.0)), ok > 0.5 && ok < 1.5 ? 0.0 : 1.0);
  float tree = ok < 0.5 ? smoothstep(-0.04, 0.04, (n.g - 0.5) * 0.7 + (n.b - 0.5) * 0.3 + 0.1 - hz)
    : ok < 1.5 ? (1.0 - smoothstep(0.0, 0.035, abs(n.g - 0.5) + max(hz - 0.1, 0.0) * 0.1)) * (0.85 - 0.6 * smoothstep(0.0, 0.7, hz)) : 0.0;
  c = mix(c, uA[9].rgb * (0.35 + 3.0 * n.r * n.a) * (ok > 0.5 ? 0.6 : 1.0), tree * uA[9].w);
  if (ok > 1.5 && ok < 2.5) {
    // the courtyard's far wall, its top a little above the sill line, sunlit, with its own dark windows
    float wl = 1.0 - smoothstep(0.17, 0.18, hz);
    vec2 wg = abs(fract(vec2(hx * 3.1, hz * 4.4) + 0.5) - 0.5);
    float wn = step(0.3, wg.x) * step(0.22, wg.y) * step(hz, 0.08);
    c = mix(c, uA[6].rgb * uA[2].rgb * 0.18 * (0.9 + 0.2 * n.r) * (1.0 - 0.75 * wn), wl);
  }
  return c;
}
vec3 walls(vec3 o2, vec3 d, float rg, out float tOut){
  float dy = d.y >= 0.0 ? max(d.y, 1e-4) : min(d.y, -1e-4);
  float tw = ((d.y > 0.0 ? W2 : -W2) - o2.y) / dy, tc = d.z > 1e-4 ? (HH - o2.z) / d.z : 1e5, t = min(tw, tc);
#if PLC == 1
  float te = d.x > 1e-4 ? (uC[6].x - o2.x) / d.x : 1e5;
  t = min(t, te);
#endif
  vec3 p = o2 + d * t, c;
  vec4 n1 = textureLod(uN, p.xz * 0.19 + p.y * 0.1, rg * 0.5), n2 = textureLod(uN, p.xz * 0.9 + p.y * 0.3, rg * 0.5 + 0.5);
  vec3 pl = uA[6].rgb * (0.72 + 0.42 * n1.r + 0.2 * (n2.g - 0.5));
  float nearWin = exp(-max(W2 - p.y, 0.0) * 0.32), rowC = 0.5 + 0.5 * cos((p.x - uA[2].w) / BAY * 6.2832 - 3.1416);
#if PLC == 1
  if (te <= t) {
    // the end of the hall, out of the sun: one tall window onto the bright side, or a pair of doors with light at their meeting
    float z = p.z, ay = abs(p.y), sk = 1.0 - smoothstep(0.19, 0.2, z);
    vec3 e = pl * (uA[3].rgb * (0.16 + 0.3 * nearWin) + uA[4].rgb * (0.3 + 0.5 * exp(-z * 0.5))) * (1.0 - 0.5 * sk);
    if (uC[6].y < 0.5) {
      float op = step(ay, 0.62) * step(0.6, z) * step(z, HH - 0.9);
      vec2 gb = abs(fract(vec2(p.y / 0.41, (z - 0.6) / 0.62) + 0.5) - 0.5) * vec2(0.41, 0.62);
      float br = 1.0 - smoothstep(0.012, 0.02, min(gb.x, gb.y));
      vec3 g = mix(uA[7].rgb, uA[8].rgb, clamp((z - 0.6) / (HH - 1.5), 0.0, 1.0)) * 0.3;
      e = mix(e, mix(g / (1.0 + g * 0.25), pl * uA[3].rgb * 0.3, br), op);
    } else {
      float op = step(ay, 0.82) * step(z, 2.5), seam = 1.0 - smoothstep(0.004, 0.009, ay);
      vec2 pn = abs(fract(vec2(p.y / 0.41 + 0.5, z / 0.6) + 0.5) - 0.5);
      vec3 wd = vec3(0.16, 0.09, 0.05) * (uA[3].rgb * 0.5 + uA[4].rgb * 0.7) * (0.8 + 0.3 * step(0.4, max(pn.x, pn.y)));
      e = mix(e, wd + uA[2].rgb * 0.12 * seam * step(0.05, z), op);
    }
    c = e;
  } else
#endif
  if (tc < tw) {
    float beam = smoothstep(0.42, 0.44, abs(fract((p.x - uA[2].w) / (BAY * 0.5)) - 0.5));
    c = pl * (0.75 - 0.42 * beam) * (uA[3].rgb * (0.2 + 0.5 * nearWin * rowC) + uA[4].rgb * 0.5);
  } else if (d.y > 0.0) {
    vec4 m0 = winMask(p.xz, rg);
    float t2 = (W2 + REV - o2.y) / dy;
    vec3 p2 = o2 + d * t2;
    vec4 m1 = winMask(p2.xz, rg);
    // the window keeps its own range: a shoulder on the glass, so the sky, the trees and the reveal survive the hall's exposure
    vec3 glass = skyCol(d) * m1.rgb * 0.3;
    glass = glass / (1.0 + glass * 0.25);
#ifdef SHUT
    shutF = t2 * uC[0].w * uC[4].x * 2.0 * (1.0 + rg);
    float trS = shutK(p2.xz);
    if (shutC > 0.5) {
      float lz = fract(p2.z / 0.06), lv = smoothstep(0.0, 0.25, lz) * (1.0 - smoothstep(0.55, 0.75, lz));
      float lxx = abs(fract((p2.x - uA[2].w) / BAY) - 0.5) * BAY, frm = smoothstep(0.03, 0.05, lxx);
      vec3 wood = pl * vec3(0.8, 0.62, 0.45) * (uA[3].rgb * 0.5 + uA[4].rgb * 0.7 + 0.02) * (0.78 + 0.22 * lv) * (0.8 + 0.2 * frm);
      wood += uA[2].rgb * vec3(0.9, 0.55, 0.28) * 0.006 * lv * frm;
      glass = wood + glass * max(trS - 0.02, 0.0) * 2.0;
    }
#endif
    float rs = (p2.x - p.x) * SD.x;
    vec3 rev = pl * (uA[3].rgb * 0.9 + uA[2].rgb * smoothstep(0.0, 0.2, -rs) * 1.4 * abs(SD.x) + uA[4].rgb * 0.4);
    rev += pl * uA[2].rgb * SD.z * 0.1 * step(p2.z, 0.34) * step(0.24, p2.z);
    vec3 inner = mix(rev, glass, m1.a);
    float z = p.z, skirt = 1.0 - smoothstep(0.19, 0.2, z), dado = smoothstep(0.9, 0.91, z) * (1.0 - smoothstep(0.935, 0.945, z));
    float crn = smoothstep(HH - 0.5, HH - 0.48, z);
    float uB2 = uA[9].w * 0.0 + 1.05;
    vec3 pier = pl * (uA[4].rgb * (0.35 + 0.5 * exp(-z * 0.6)) + uA[3].rgb * 0.07);
    {
      float uu = abs(fract((p.x - uA[2].w) / BAY) - 0.5) * BAY, pw = uu - (BAY * 0.5 - (BAY * 0.5 - uB2) * 0.72);
      float inPanel = smoothstep(0.0, 0.03, -(-pw)) * smoothstep(1.0, 1.04, z) * (1.0 - smoothstep(HH - 0.72, HH - 0.68, z));
      pier *= 1.0 - 0.16 * inPanel;
      pier *= 1.0 + 0.14 * (1.0 - smoothstep(0.0, 0.05, abs(pw))) * step(1.0, z) * step(z, HH - 0.7);
    }
    pier *= (1.0 - 0.55 * skirt) * (1.0 - 0.25 * dado) * (1.0 + 0.2 * crn);
    c = mix(pier, inner, m0.a);
  } else {
    float k = (W2 + REV - p.y) / SD.y;
#ifdef CORR
    // (a corridor's far wall is seen at a slant and close: its ladder of sun is read at the pixel's own footprint, or the
    // glazing bars of every window down the passage beat into a mesh)
    vec4 m = winMask(p.xz + SD.xz * k, clamp(log2(t * uC[0].w * uC[4].x * 220.0 / max(abs(d.y), 0.15)), 1.0, 5.0));
#else
    vec4 m = winMask(p.xz + SD.xz * k, 1.0);
#endif
#ifdef SHUT
    shutF = t * uC[0].w * uC[4].x * 2.0 * (1.0 + rg) + k * 0.0093;
#endif
    c = pl * (uA[2].rgb * m.rgb * m.a * SHUTM(p.xz + SD.xz * k) * SD.y + uA[3].rgb * (0.3 + 0.4 * rowC));
  }
  tOut = t;
  return mix(c, uA[5].rgb, (1.0 - exp(-t * uA[5].w)) * 0.22);
}
void main(){
  vec2 ndc = gl_FragCoord.xy * uC[4].xy * 2.0 - 1.0;
  vec3 ro = uC[0].xyz, fw = uC[3].xyz;
  vec3 rd = normalize(fw + (uC[1].xyz * ndc.x + uC[2].xyz * ndc.y) * uC[0].w);
  // the floor's texture is read up front, with the ray's own footprint
  float tF = rd.z < -1e-3 ? -ro.z / rd.z : 400.0;
  vec2 fuv = (ro.xy + rd.xy * min(tF, 400.0)) / uC[4].z;
  vec4 ft = textureGrad(uFl, fuv, dFdx(fuv), dFdy(fuv));
#ifdef SHUT
  // (three pixels' width: far down the floor the ladder's bars, cut by the glazing bars, would bead into rows of dots)
  shutP = 3.0 * max(length(dFdx(fuv)), length(dFdy(fuv))) * uC[4].z * SD.z / SD.y;
#endif
  float dy = rd.y >= 0.0 ? max(rd.y, 1e-4) : min(rd.y, -1e-4);
  float tw = ((rd.y > 0.0 ? W2 : -W2) - ro.y) / dy;
  vec3 col = vec3(0.0), o2 = ro, d2 = rd;
  float t0 = 0.0, wr = 1.0, rg = 0.0;
#if PLC == 1
  float tE0 = rd.x > 1e-4 ? (uC[6].x - ro.x) / rd.x : 1e5;
#else
  float tE0 = 1e5;
#endif
  if (rd.z < 0.0 && tF < tw && tF < tE0) {
    t0 = tF;
    vec3 p = ro + rd * tF;
    vec3 alb = ft.rgb * ft.rgb;
    vec3 sun = sunAt(p);
    vec3 v = p - uT[0].xyz;
    float along = dot(v, SD);
    vec3 perp = v - SD * along;
    if (dot(perp, perp) < 0.25 && along < 0.0) sun *= planeShadow(vec3(dot(v, uT[1].xyz), dot(v, uT[2].xyz), dot(v, uT[3].xyz)), 0.01, 14.0);
    float nearWin = exp(-max(W2 - p.y, 0.0) * 0.42), rowC = 0.5 + 0.5 * cos((p.x - SD.x / SD.y * (W2 - p.y) - uA[2].w) / BAY * 6.2832 - 3.1416);
    vec3 E = uA[2].rgb * sun * SD.z + uA[3].rgb * (0.16 + 0.5 * nearWin * (0.4 + 0.6 * rowC)) + uA[4].rgb * 0.3;
    col = alb * E;
    {
      vec2 vbp = vec2(dot(v, uT[1].xyz) + (uT[2].w * 0.5 - uT[1].w), dot(v, uT[2].xyz));
      float nearF = clamp(1.0 - uT[0].z * 2.2, 0.0, 1.0);
      float d2c = vbp.x * vbp.x / (uT[2].w * uT[2].w * 0.3) + vbp.y * vbp.y / (uT[3].w * uT[3].w * 0.7);
      float ao = 1.0 - nearF * 0.72 * exp(-d2c * 2.2);
      // n12: a sheet lying on stone meets it with a dark line: tight under the keel and the low wing when it rests
      float nearC = clamp(1.0 - uT[0].z * 14.0, 0.0, 1.0);
      float keel = exp(-vbp.y * vbp.y * 2500.0) * (1.0 - smoothstep(uT[2].w * 0.36, uT[2].w * 0.52, abs(vbp.x)));
      ao *= 1.0 - nearC * (0.55 * exp(-d2c * 9.0) + 0.35 * keel);
      col *= ao; sun *= mix(1.0, ao, 0.25 + 0.6 * nearC);
    }
    vec4 nr = textureLod(uN, p.xy * 0.37 + ft.a * 0.1, 0.0);
    float worn = 1.0 - smoothstep(0.3 * W2, 0.85 * W2, abs(p.y));
    rg = uC[5].z * (1.4 - ft.a) * (1.0 + 1.2 * worn);
    vec3 nf = normalize(vec3((nr.r - 0.5) * rg * 0.016 + (nr.a - 0.5) * rg * 0.05, (nr.g - 0.5) * rg * 0.016 + (nr.b - 0.5) * rg * 0.05, 1.0));
    float cs = max(-dot(rd, nf), 0.0), f = 1.0 - cs, f2 = f * f;
    wr = (uC[5].x + (1.0 - uC[5].x) * f2 * f2 * f) * ft.a * uC[5].y * (1.0 - 0.45 * worn);
    o2 = p + nf * 1e-3; d2 = reflect(rd, nf);
    d2.z = abs(d2.z) + 1e-3;
  }
  float tH;
  // n12: a polished floor is not a mirror: its image of the wall goes soft with the distance it has to carry
  float lodM = rg * 3.0;
  if (t0 > 0.0) { float tW2 = abs(((d2.y > 0.0 ? W2 : -W2) - o2.y) / (abs(d2.y) > 1e-4 ? d2.y : 1e-4)); lodM += log2(1.0 + min(tW2, 12.0) * 0.9); }
  vec3 wc = walls(o2, d2, lodM, tH);
  if (t0 == 0.0) t0 = tH; else col = mix(col, uA[5].rgb, (1.0 - exp(-t0 * uA[5].w)) * 0.22);
  col += wc * wr * (t0 == tH ? vec3(1.0) : mix(vec3(1.0), ft.rgb * 1.6, 0.6));
  // the air in the shafts: a short march looking for the sun, with the same window
  float jit = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  float tv = min(t0, 14.0), ds = tv / float(uSteps);
  vec3 acc = vec3(0.0);
#ifdef SHUT
  // (in the air the closed leaves' threads stay faint, so the open leaf's shaft stands as the one bar in the dark)
#undef SHUTM
#define SHUTM(q) shutM(q)
#endif
  for (int i = 0; i < uSteps; i++) {
    vec3 q = ro + rd * ((float(i) + jit) * ds);
    vec2 w = q.xz + SD.xz * ((W2 + REV - q.y) / SD.y);
#ifdef CORR
    vec4 m = textureLod(uW, vec2((w.x - uA[2].w) / BAY, w.y / HH), 2.2);
#else
    vec4 m = textureLod(uW, vec2((w.x - uA[2].w) / BAY, w.y / HH), 0.6);
#endif
    acc += m.rgb * m.a * SHUTM(w);
  }
  float sn = max(dot(rd, SD), 0.0), sn2 = sn * sn, sn4 = sn2 * sn2;
  vec4 dn = textureLod(uN, ndc * 0.14 + vec2(uA[4].w * 0.004, -uA[4].w * 0.003), 0.0);
  col += uA[2].rgb * acc * ds * uC[4].w * (0.25 + 0.5 * sn4 * sn4) * (0.65 + 0.7 * dn.r);
  float tz = t0 * dot(rd, fw);
  float coc = abs(1.0 / max(tz, 0.02) - uC[1].w) * uC[2].w;
  // n12: where the floor's colour is mostly its mirror, the lens sees the mirrored thing at its own distance, not the floor's
  if (t0 != tH) {
    float lw = dot(wc * wr, vec3(0.3, 0.5, 0.2)), lc = dot(col, vec3(0.3, 0.5, 0.2)) + 1e-4;
    float cocM = abs(1.0 / max((t0 + tH) * dot(rd, fw), 0.02) - uC[1].w) * uC[2].w;
    coc = mix(coc, max(coc, cocM), clamp(lw / lc * 2.0, 0.0, 1.0));
  }
  col = min(col, vec3(40.0));
  if (uC[3].w > 0.5) { col = col / (1.0 + col); coc *= 8.0; }
  o = vec4(col, min(coc, uC[3].w > 0.5 ? 0.24 : 0.03));
}`,sa=C0+`uniform sampler2D uS; uniform vec4 uG[2]; uniform int uN2; out vec4 o;
void main(){
  vec2 uv = gl_FragCoord.xy * uG[0].xy;
  vec4 c0 = textureLod(uS, uv, 0.0);
  float r0 = c0.a * uG[1].z, rS = r0 * uG[1].x;
  float ang = 6.2832 * fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  vec3 acc = c0.rgb; float w = 1.0;
  float inv = 1.0 / uG[1].y;
  for (int i = 0; i < uN2; i++) {
    float fi = float(i) + 0.5, rr = pow(fi * inv, 0.72), a = ang + fi * 2.39996;
    vec2 off = vec2(cos(a), sin(a)) * rr * rS + uG[0].zw * (fract(fi * 0.618) - 0.5) * min(r0 * 30.0, 1.0);
    vec4 s = textureLod(uS, uv + off, 0.0);
    acc += s.rgb; w += 1.0;
  }
  o = vec4(acc / w, c0.a);
}`,ia=C0+`uniform sampler2D uS; uniform sampler2D uP; uniform vec4 uD[3]; out vec4 o;
vec3 pre(vec3 c){ if (uD[2].x > 0.5) c = c / max(vec3(1.0) - c, vec3(0.02)); float l = dot(c, vec3(0.3, 0.5, 0.2)); return c * smoothstep(1.6, 4.5, l); }
void main(){
  vec2 uv = gl_FragCoord.xy * uD[0].xy, e = uD[0].zw;
  vec3 c = pre(textureLod(uS, uv + e * vec2(-1.0, -1.0), 0.0).rgb) + pre(textureLod(uS, uv + e * vec2(1.0, -1.0), 0.0).rgb) + pre(textureLod(uS, uv + e * vec2(-1.0, 1.0), 0.0).rgb) + pre(textureLod(uS, uv + e, 0.0).rgb);
  vec2 lp = (uv * 2.0 - 1.0 - uD[1].xy) / uD[1].zw * 0.5 + 0.5;
  vec2 g = step(vec2(0.0), lp) * step(lp, vec2(1.0));
  vec3 pc = g.x * g.y * pre(textureLod(uP, lp, 1.0).rgb);
  o = vec4(c * 0.25 + pc * 1.2, 1.0);
}`,ca=C0+`uniform sampler2D uS; uniform vec4 uB; out vec4 o;
void main(){
  vec2 uv = gl_FragCoord.xy * uB.xy, d = uB.zw;
  vec3 c = textureLod(uS, uv, 0.0).rgb * 0.227;
  c += (textureLod(uS, uv + d * 1.385, 0.0).rgb + textureLod(uS, uv - d * 1.385, 0.0).rgb) * 0.316;
  c += (textureLod(uS, uv + d * 3.231, 0.0).rgb + textureLod(uS, uv - d * 3.231, 0.0).rgb) * 0.07;
  o = vec4(c, 1.0);
}`,fa=C0+`uniform sampler2D uS; uniform sampler2D uL; uniform sampler2D uBl; uniform vec4 uP[4]; out vec4 o;
vec3 dec(vec3 c){ return uP[3].z > 0.5 ? c / max(vec3(1.0) - c, vec3(0.02)) : c; }
void main(){
  vec2 uv = gl_FragCoord.xy * uP[0].xy;
  vec3 c = dec(textureLod(uS, uv, 0.0).rgb);
  vec2 lp = (uv * 2.0 - 1.0 - uP[1].xy) / uP[1].zw * 0.5 + 0.5;
  if (lp.x > -0.02 && lp.x < 1.02 && lp.y > -0.02 && lp.y < 1.02) {
    float rad = max(abs(dot(vec3(uv, 1.0), uP[2].xyz)), uP[0].x * 0.62);
    vec2 sc = vec2(rad) * 2.0 / uP[1].zw * 0.5;
    float ang = 6.2832 * fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    vec4 acc = vec4(0.0);
    // the taps read a level of the layer as wide as their own spacing, so a soft edge is smooth, never a comb
    float lod = clamp(log2(max(sc.x / uP[3].x * 0.6, 1.0)), 0.0, 3.0);
    for (int i = 0; i < 9; i++) {
      float fi = float(i) + 0.5, a = ang + fi * 2.39996, rr = sqrt(fi / 9.0);
      acc += textureLod(uL, lp + vec2(cos(a), sin(a)) * rr * sc, lod);
    }
    acc /= 9.0;
    vec3 pc = uP[3].z > 0.5 ? dec(acc.rgb / max(acc.a, 1e-3)) * acc.a : acc.rgb;
    c = c * (1.0 - acc.a) + pc;
  }
  c += textureLod(uBl, uv, 0.0).rgb * uP[2].w;
  vec2 cv = uv - 0.5;
  c *= uP[0].z * (1.0 - uP[3].w * dot(cv, cv));
  c = 1.0 - exp(-max(c, vec3(0.0)));
  c = c * c / (c + 0.012);
  c = pow(c, vec3(0.4545));
  // a fixed dither of under one level against banding: no grain
  float n1 = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5;
  c += n1 * (1.0 / 255.0);
  o = vec4(c, 1.0);
}`,wo=C0+`layout(location=0) in vec4 aF; layout(location=1) in vec2 aS; layout(location=2) in vec4 aT;
uniform vec4 uT[8]; uniform vec4 uV[6];
out vec3 vW; out vec3 vN; out vec2 vF; out vec2 vS; out vec3 vSp; out vec4 vT; out vec3 vB;
// uV[0] eye, tan half fov   uV[1] right, near   uV[2] up, far   uV[3] forward, mirror z   uV[4] layer centre, layer scale
void main(){
  float Xf = aF.x, s = aF.y < 0.0 ? -1.0 : 1.0, a = abs(aF.y), h0 = uT[4].z;
  float sk = uT[4].x, ck = sqrt(1.0 - sk * sk), dih = uT[4].y, sd = sin(dih), cd = cos(dih);
  float wing = step(h0, a);
  // the cross section: a shallow V down to the keel's crease, then the wing lifting out from the root
  vec2 yz, Ny;
  vec2 Tan;
  if (a < h0) { yz = vec2(s * a * sk, -(h0 - a) * ck); Ny = vec2(-s * ck, sk); Tan = vec2(s * sk, ck); }
  else { yz = vec2(s * h0 * sk + s * (a - h0) * cd, (a - h0) * sd); Ny = vec2(-s * sd, cd); Tan = vec2(s * cd, sd); }
  float span = max(a - h0, 0.0), sp1 = span / max(uT[3].w - h0, 0.01);
  // the wing curves a little under load, and in a stall its back edge chatters; it is also bowed, a little hollow from root to
  // tip, and the two wings were never folded quite alike
  float bw = uT[7].y * (s > 0.0 ? 1.0 : 0.72);
  float bill = uT[5].z * sp1 * sp1 * 0.006 - bw * sin(sp1 * 3.1416);
  yz.y += bill * wing;
  float billS = (uT[5].z * sp1 * 2.0 * 0.006 - bw * 3.1416 * cos(sp1 * 3.1416)) / max(uT[3].w - h0, 0.01) * wing;
  vec3 bp = vec3(uT[1].w - Xf, yz.x, yz.y);
  vec3 bn = vec3(0.0, Ny.x + s * billS * cd * -1.0, Ny.y);
  // the elevon: the back of each wing bent along a soft line
  float eX = Xf - uT[5].w, eS = smoothstep(h0 + 0.004, h0 + 0.012, a) * wing;
  float r = smoothstep(-0.003, 0.004, eX) * eS, de = uT[5].x * r;
  float rise = max(eX, 0.0) * eS;
  bp.z += rise * sin(uT[5].x);
  bp.x += rise * (1.0 - cos(uT[5].x));
  bn = normalize(bn + vec3(sin(de), 0.0, 0.0) * cd);
  float fl = sin(Xf * 70.0 + uT[0].w * 53.0 + a * 40.0 * s) * uT[5].y * smoothstep(0.35, 1.0, Xf / uT[2].w) * sp1;
  bp.z += fl * 0.004;
  bn.x += fl * 0.5;
  // the nose dented by earlier landings and crumpled further by each wall it meets
  float nz = (1.0 - smoothstep(0.0, 0.04, Xf)) * uT[7].x;
  float cr = sin(a * 260.0 + Xf * 410.0) * sin(a * 170.0 - Xf * 230.0 + 1.3);
  bp.x -= nz * 0.012; bp.z += nz * cr * 0.004; bn.x += nz * cr * 1.2; bn.y += nz * cos(a * 210.0 + Xf * 330.0) * 0.6;
  // the layers lie close at the nose and spring apart towards the tail, where the trailing edge is a small fan of sheets
  float spring = 1.0 + 7.0 * smoothstep(0.55, 1.0, Xf / uT[2].w);
  bp += normalize(bn) * aF.z * uT[4].w * spring;
  vec3 ex = uT[1].xyz, ey = uT[2].xyz, ez = uT[3].xyz;
  vec3 w = uT[0].xyz + ex * bp.x + ey * bp.y + ez * bp.z;
  vec3 n = ex * bn.x + ey * bn.y + ez * bn.z;
  vSp = ey * Tan.x + ez * Tan.y;
  if (uV[3].w > 0.5) { w.z = -w.z; n.z = -n.z; vSp.z = -vSp.z; }
  vW = w; vN = n; vF = vec2(Xf / uT[2].w, a / uT[3].w); vS = aS; vT = aT; vB = bp;
  vec3 r0 = w - uV[0].xyz;
  float zc = dot(r0, uV[3].xyz);
  vec2 nd = vec2(dot(r0, uV[1].xyz), dot(r0, uV[2].xyz)) / uV[0].w;
  nd = (nd - uV[4].xy * zc) / uV[4].zw;
  float zz = (zc - uV[1].w) / (uV[2].w - uV[1].w) * 2.0 - 1.0;
  zz -= aF.z * (dot(n, uV[0].xyz - w) >= 0.0 ? 1.0 : -1.0) * 0.0012;
  gl_Position = vec4(nd, zz * zc, zc);
}`,Eo=C0+Xe+`uniform sampler2D uFm; uniform sampler2D uSm; uniform vec4 uT[8]; uniform vec4 uV[6]; uniform vec4 uK[4]; uniform int uBranches;
in vec3 vW; in vec3 vN; in vec2 vF; in vec2 vS; in vec3 vSp; in vec4 vT; in vec3 vB;
out vec4 o;
`+zo+`
vec3 envE(vec3 n){
  float up = 0.5 + 0.5 * n.z, win = 0.5 + 0.5 * n.y;
  vec3 e = uA[3].rgb * (0.12 + 0.75 * win * win) + uA[4].rgb * (0.85 * (1.0 - up) * (1.0 - up) + 0.2) + uA[3].rgb * 0.12 * up;
  // a hall full of bounced light: the shade on paper is light and only a little warm, not the floor's own orange
  return mix(e, vec3(dot(e, vec3(0.3, 0.5, 0.2))), 0.45) * 1.2;
}
void main(){
  vec3 N0 = normalize(vN), V = normalize(uV[0].xyz - vW);
  vec4 sm = texture(uSm, vS);
  vec2 ex = vec2(uK[3].x, 0.0), ey = vec2(0.0, uK[3].y);
  float hu = textureLod(uSm, vS + ex, uK[3].z).r - textureLod(uSm, vS - ex, uK[3].z).r;
  float hv = textureLod(uSm, vS + ey, uK[3].z).r - textureLod(uSm, vS - ey, uK[3].z).r;
  vec2 g = hu * vT.xy + hv * vT.zw;
  vec3 gW = -g.x * uT[1].xyz + g.y * normalize(vSp);
  float side = dot(N0, V) >= 0.0 ? 1.0 : -1.0;
  // a layer that ends on top of another leaves a small step: its shadow side and its lit side
  vec4 fm = texture(uFm, vF);
  float n = fm.r * 8.0, nb = textureLod(uFm, vF, 1.4).r * 8.0;
  vec3 N = normalize(N0 * side - gW * uK[1].z);
  float nl = dot(N, SD);
  vec3 sun = sunAt(vW);
  float selfS = mix(planeShadow(vB, 0.006, 14.0 + uK[3].w), 1.0, uK[3].w * 0.006);
  // through the sheet: each layer takes its toll, and the paper's cloudy formation shows only here
  // a stack of diffusing sheets passes 1 / (1 + n S) (Kubelka-Munk without absorption): one layer a third, two a fifth, four a tenth
  float form = sm.g, lay = max(n, 1.0);
  float Sc = (1.0 / uK[1].x - 1.0) * (1.0 + (form - 0.5) * 0.5);
  float Tr = 1.0 / (1.0 + lay * Sc);
  vec3 alb = uK[0].rgb * (1.0 - sm.b * uK[2].w) + uK[2].rgb * sm.b * uK[2].w;
  alb *= 0.98 + 0.04 * form;
  vec3 tint = alb * mix(vec3(1.0), alb, 0.25);
  float rs = uK[1].y;
  vec3 c = alb * uA[2].rgb * sun * selfS * max(nl, 0.0) * rs;
  c += tint * uA[2].rgb * sun * selfS * max(-nl, 0.0) * Tr * 1.3;
  // the sun patch on the floor below lights the underside warm
  vec3 bnc = uA[2].rgb * uK[1].w * max(-N.z, 0.0);
  c += alb * (envE(N) + bnc) * rs;
  c += tint * (envE(-N) + uA[2].rgb * uK[1].w * max(N.z, 0.0)) * Tr;
  float stp = clamp((n - nb) * 0.5, -1.0, 1.0);
  c *= 1.0 + (stp < 0.0 ? stp * 0.3 : 0.0);
  // a hairline of light on every edge the sun reaches, and the crease itself: fibres cracked along the fold, raised and pale
  float crease = smoothstep(0.56, 0.76, sm.r);
  c += uA[2].rgb * sun * selfS * (max(stp, 0.0) * 0.5 + crease * 0.16) * (0.35 + 0.65 * abs(nl)) * rs;
  c *= 1.0 + crease * 0.22;
  // the elevon's hinge: a crease across the back of each wing
  c *= 1.0 + 0.3 * (1.0 - smoothstep(0.0, 0.012, abs(vF.x - uT[5].w / uT[2].w))) * step(uT[4].z * 1.4 / uT[3].w, vF.y);
  vec3 H = normalize(V + SD);
  float sh = max(dot(N, H), 0.0), sh2 = sh * sh, sh4 = sh2 * sh2, sh8 = sh4 * sh4;
  float f = 1.0 - max(dot(N, V), 0.0), f2 = f * f;
  c += uA[2].rgb * sun * selfS * sh8 * sh8 * 0.035 * step(0.0, nl);
  c += envE(reflect(-V, N)) * f2 * f2 * f * 0.14;
  float aout = uV[5].x;
  // the mirror image is a faint smudge only as tall as the plane: it fades with height above the varnish
  if (uV[3].w > 0.5) { aout *= exp(vW.z * 55.0); c *= aout; }
  if (uV[5].y > 0.5) c = c / (1.0 + c);
  o = vec4(c, aout);
}`,Ao=C0+Xe+`uniform vec4 uC[8]; uniform vec4 uM;
out vec3 vC; out float vR;
void main(){
  float id = float(gl_VertexID);
  vec3 h = fract(vec3(id * 0.1031, id * 0.1030 + 0.37, id * 0.0973 + 0.71) * 7.13);
  h = fract(h + dot(h, h.yzx + 33.33));
  h = fract((h.xxy + h.yzz) * h.zyx);
  float t = uA[4].w;
  vec3 box = vec3(5.0, 3.6, 2.6), eye = uC[0].xyz + uC[3].xyz * 1.6;
  vec3 p = h * box + vec3(sin(t * 0.13 + id) * 0.25 + t * 0.012, cos(t * 0.1 + id * 1.7) * 0.2, sin(t * 0.09 + id * 2.3) * 0.2 - t * 0.008);
  p = mod(p - eye + box * 0.5, box) - box * 0.5 + eye;
  p.y = clamp(p.y, -W2, W2); p.z = max(p.z, 0.02);
  vec3 r0 = p - uC[0].xyz;
  float zc = dot(r0, uC[3].xyz);
  vec2 nd = vec2(dot(r0, uC[1].xyz), dot(r0, uC[2].xyz)) / (uC[0].w * max(zc, 0.05));
  float k = (W2 + REV - p.y) / SD.y;
  vec2 w = p.xz + SD.xz * k;
  vec4 m = textureLod(uW, vec2((w.x - uA[2].w) / BAY, w.y / HH), 1.0);
  float coc = abs(1.0 / max(zc, 0.05) - uC[1].w) * uC[2].w;
  float sz = uM.x * (0.0014 + 0.0016 * h.x) / max(zc, 0.2) + coc * uM.x * 0.9;
  sz = min(max(sz, uM.x * 0.0028), uM.x * 0.03);
  float fade = smoothstep(0.1, 0.5, zc);
  float area = (uM.x * 0.0016) * (uM.x * 0.0016) / (sz * sz);
  vC = uA[2].rgb * m.rgb * m.a * SHUTM(w) * fade * uM.y * (0.3 + 0.7 * h.y) * min(area * 3.0, 1.0);
  vR = 0.0;
  gl_Position = vec4(nd, 0.0, 1.0);
  gl_PointSize = sz * 2.0;
  if (zc < 0.1) gl_Position = vec4(2.0, 2.0, 0.0, 1.0);
}`,Mo=C0+`in vec3 vC; in float vR; out vec4 o;
void main(){ vec2 d = gl_PointCoord * 2.0 - 1.0; float r = dot(d, d); float a = smoothstep(1.0, 0.25, r); o = vec4(vC * a, 0.0); }`,be=C0+`out vec4 o; uniform vec4 uB0[4];
uint hu(uvec2 p){ uint x = p.x * 1597334677u ^ p.y * 3812015801u; x *= 1597334677u; x ^= x >> 16; x *= 1597334677u; return x; }
float h1(vec2 p){ return float(hu(uvec2(ivec2(p) + 8192)) >> 8) / 16777216.0; }
float vn(vec2 p, float per){ vec2 i = floor(p), f = p - i; f = f * f * (3.0 - 2.0 * f);
  float a = h1(mod(i, per)), b = h1(mod(i + vec2(1.0, 0.0), per)), c = h1(mod(i + vec2(0.0, 1.0), per)), d = h1(mod(i + vec2(1.0, 1.0), per));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
uniform int uZ;
float fbm(vec2 p, float per){ float s = 0.0, a = 0.5; for (int i = 0; i < 4 + uZ; i++) { s += a * vn(p + float(i) * 17.0, per); p *= 2.0; per *= 2.0; a *= 0.5; } return s / 0.9375; }
`,ua=be+`void main(){ vec2 uv = gl_FragCoord.xy / 256.0;
  o = vec4(fbm(uv * 8.0, 8.0), fbm(uv * 8.0 + 31.0, 8.0), fbm(uv * 16.0 + 57.0, 16.0), fbm(uv * 32.0 + 91.0, 32.0)); }`,la=be+`void main(){
  vec2 uv = gl_FragCoord.xy * uB0[3].xy;
  float B = uB0[1].x, HH = uB0[1].y, kind = uB0[0].x, wd = uB0[0].y, z0 = uB0[0].z, z1 = uB0[0].w;
  vec2 q = vec2((uv.x - 0.5) * B, uv.y * HH);
  float hw = wd * 0.5, ax = abs(q.x);
  // the opening, by its head
  float head = z1;
  if (kind > 0.5) { float zs = z1 - hw; float rr = max(hw * hw - ax * ax, 0.0); head = zs + sqrt(rr); }
  if (kind > 1.5 && kind < 2.5) { float zs = z1 - hw * 1.7, R = hw * 2.0, dx = ax + hw; head = zs + sqrt(max(R * R - dx * dx, 0.0)); }
  float px = B / 256.0;
  float op = smoothstep(hw + px * 0.5, hw - px * 0.5, ax) * smoothstep(z0 - px, z0 + px, q.y) * smoothstep(head + px, head - px, q.y);
  // the glazing bars
  float nc = uB0[1].z, rh = uB0[1].w, tb = 0.024;
  float cx = (q.x + hw) / (wd / nc), cz = (q.y - z0) / rh;
  float bx = abs(fract(cx + 0.5) - 0.5) * (wd / nc), bz = abs(fract(cz + 0.5) - 0.5) * rh;
  float bar = 1.0 - smoothstep(tb * 0.7, tb * 1.2, min(bx, bz));
  float rail = 1.0 - smoothstep(0.05, 0.06, abs(q.y - (z0 + (z1 - z0) * 0.56)));
  float stile = 1.0 - smoothstep(0.035, 0.05, ax);
  float frame = 1.0 - smoothstep(0.045, 0.06, min(hw - ax, min(q.y - z0, head - q.y)));
  vec3 T = vec3(1.0);
  if (kind > 0.5 && kind < 2.5) {
    float zs = z1 - hw;
    if (q.y > zs) {
      vec2 d = vec2(q.x, q.y - zs);
      float rr = length(d), th = atan(d.y, d.x) / 3.14159 * 6.0;
      float spoke = abs(fract(th + 0.5) - 0.5) * 3.14159 / 6.0 * rr;
      bar = 1.0 - smoothstep(tb * 0.7, tb * 1.2, min(spoke, abs(rr - hw * 0.45)));
      rail = 1.0 - smoothstep(0.04, 0.05, abs(q.y - zs));
    }
  }
  float glass = 0.88 + 0.2 * (fbm(q * 2.3, 256.0) - 0.5);
  if (kind > 2.5) {
    // leaded quarries, the small panes each their own colour
    vec2 g = vec2(q.x * 5.6, (q.y - z0) * 3.7);
    vec2 d = vec2(g.x + g.y, g.x - g.y);
    vec2 id = floor(d);
    float h = h1(id + 40.0), h2 = h1(id + 91.0);
    vec2 fd = abs(fract(d) - 0.5);
    vec3 pal = h < 0.2 ? vec3(0.9, 0.5, 0.1) : h < 0.3 ? vec3(0.62, 0.1, 0.08) : h < 0.38 ? vec3(0.1, 0.2, 0.55) : h < 0.44 ? vec3(0.12, 0.42, 0.22) : vec3(0.97, 0.86, 0.62);
    T = pal * (0.8 + 0.5 * h2);
    float lead = 1.0 - smoothstep(0.42, 0.47, max(fd.x, fd.y));
    bar = max(0.0, 1.0 - lead);
  }
  float solid = max(max(bar, rail), max(stile, frame));
  o = vec4(T * glass * (1.0 - solid) + vec3(0.0), op);
}`,ha=be+`void main(){
  vec2 uv = gl_FragCoord.xy * uB0[3].xy;
  vec3 c; float gl;
#if KIND == 0
    // oak boards along the hall, staggered, worn and waxed
    float nb = 27.0;
    float by = floor(uv.y * nb), fy = fract(uv.y * nb);
    float off = h1(vec2(by, 7.0)), nl = 2.0;
    float bx = floor(uv.x * nl + off * 3.0), fx = fract(uv.x * nl + off * 3.0);
    vec2 id = vec2(mod(bx, nl), by);
    float h = h1(id), h2 = h1(id + 13.0);
    float gr = fbm(vec2(uv.x * 7.0 + h * 9.0, (uv.y * nb + h * 37.0) * 5.0), 512.0);
    float rings = sin((gr * 16.0 + uv.y * nb * 4.0 + h2 * 11.0)) * 0.5 + 0.5;
    float fine = fbm(vec2(uv.x * 28.0 + h, uv.y * nb * 18.0 + h2 * 31.0), 2048.0);
    c = mix(uB0[1].rgb, uB0[2].rgb, 0.18 + h * 0.34 + rings * 0.2);
    c *= 0.58 + 0.84 * fine + 0.16 * rings;
    float seam = smoothstep(0.0, 0.016, fy) * smoothstep(0.0, 0.016, 1.0 - fy) * smoothstep(0.0, 0.004, fx) * smoothstep(0.0, 0.004, 1.0 - fx);
    c *= 0.42 + 0.58 * seam;
    gl = (0.3 + 0.7 * smoothstep(0.3, 0.72, fbm(uv * 8.0, 8.0)) * (0.7 + 0.5 * fine)) * seam;
#elif KIND == 1
    // terrazzo: chips of marble in a pale ground, brass strips in a wide grid
    float base = 0.92 + 0.12 * fbm(uv * 16.0, 16.0);
    c = uB0[1].rgb * base;
    for (int i = 0; i < 2; i++) {
      float sc = i == 0 ? 90.0 : 190.0;
      vec2 g = uv * sc + float(i) * 13.0, id = floor(g), f = g - id;
      float d = 9.0; vec2 cid = id;
      for (int y = -1; y < 2; y++) for (int x = -1; x < 2; x++) { vec2 e = vec2(float(x), float(y)), ci = mod(id + e, sc); vec2 pt = e + vec2(h1(ci), h1(ci + 77.0)); vec2 dv = abs(pt - f); float dd = max(dv.x, dv.y * 0.8) + 0.3 * dv.x; if (dd < d) { d = dd; cid = ci; } }
      float h = h1(cid + 5.0);
      vec3 ch = h < 0.4 ? uB0[2].rgb : h < 0.7 ? uB0[1].rgb * 1.25 : h < 0.9 ? vec3(0.55, 0.32, 0.22) : vec3(0.1, 0.1, 0.1);
      c = mix(c, ch, smoothstep(0.42, 0.38, d) * step(0.35, h1(cid + 200.0)));
    }
    vec2 s = abs(fract(uv * 2.0 + 0.5) - 0.5);
    float strip = 1.0 - smoothstep(0.0012, 0.002, min(s.x, s.y));
    c = mix(c, vec3(0.55, 0.42, 0.2), strip);
    gl = 0.8 + 0.2 * fbm(uv * 6.0, 6.0);
#elif KIND == 2
    // worn limestone flags, uneven courses
    float rows = 5.0, by = floor(uv.y * rows), fy = fract(uv.y * rows);
    float off = h1(vec2(by, 3.0)), nx = 3.0;
    float bx = floor(uv.x * nx + off * 3.0), fx = fract(uv.x * nx + off * 3.0);
    vec2 id = vec2(mod(bx, nx), by);
    float h = h1(id + 3.0);
    float n = fbm(uv * 32.0 + h * 40.0, 32.0 * 2048.0), n2 = fbm(uv * 128.0, 128.0);
    c = mix(uB0[1].rgb, uB0[2].rgb, h * 0.6 + 0.4 * n);
    c *= 0.74 + 0.5 * n2;
    float ed = min(min(fy, 1.0 - fy) / rows, min(fx, 1.0 - fx) / nx);
    float seam = smoothstep(0.0, 0.004 + 0.005 * n, ed);
    c *= 0.3 + 0.7 * seam;
    gl = (0.3 + 0.7 * smoothstep(0.35, 0.7, n)) * seam;
#else
    // black and white marble, laid on the square, its veins and its wear
    vec2 g = uv * 6.0;
    float chk = mod(floor(g.x) + floor(g.y), 2.0);
    vec2 w = uv * 8.0 + vec2(fbm(uv * 8.0, 8.0), fbm(uv * 8.0 + 9.0, 8.0)) * 0.7;
    float v = abs(fbm(w * 2.0, 16.0) - 0.5) * 2.0, vein = 1.0 - smoothstep(0.0, 0.05, v);
    c = chk > 0.5 ? mix(uB0[1].rgb, uB0[1].rgb * 0.62, vein) : mix(uB0[2].rgb, uB0[1].rgb * 0.7, vein * 0.55);
    vec2 f = abs(fract(g) - 0.5);
    c *= 0.72 + 0.28 * (1.0 - smoothstep(0.494, 0.5, max(f.x, f.y)));
    gl = 0.85 + 0.15 * fbm(uv * 12.0, 12.0);
#endif
  o = vec4(sqrt(clamp(c, 0.0, 1.0)), clamp(gl, 0.0, 1.0));
}`,da=be+`void main(){
  vec2 uv = gl_FragCoord.xy * uB0[3].xy;
  float kind = uB0[0].x, A = uB0[1].x, Bw = uB0[1].y, sd = uB0[1].z;
  vec2 m = vec2(uv.x * A, (uv.y - 0.5) * Bw);
  // long fibre-flocs, then finer ones: what you see holding paper to a window
  float fA = fbm(uv * 8.0 + sd, 8.0), fB = fbm(uv * 32.0 + sd, 32.0), fC = fbm(uv * 128.0 + sd, 128.0);
  float form = 0.5 + (fA - 0.5) * 0.35 + (fB - 0.5) * 0.85 + (fC - 0.5) * 1.0;
  if (kind > 0.5 && kind < 1.5) {
    float laid = 0.5 + 0.5 * sin(m.y * 2.0 * 3.14159 / 0.00135 * 0.25);
    float chain = 1.0 - smoothstep(0.0, 0.0012, abs(fract(m.x / 0.025 + 0.5) - 0.5) * 0.025);
    form += (laid - 0.5) * 0.12 + chain * 0.14;
  }
  float ink = 0.0;
  if (kind > 1.5 && kind < 2.5) {
    vec2 g = abs(fract(m / 0.005 + 0.5) - 0.5) * 0.005, G = abs(fract(m / 0.025 + 0.5) - 0.5) * 0.025;
    ink = max(0.5 * (1.0 - smoothstep(0.00012, 0.0003, min(g.x, g.y))), 1.0 - smoothstep(0.00022, 0.0004, min(G.x, G.y)));
  }
  if (kind > 5.5) {
    // a stave every 22 mm across the sheet, five ruled lines
    float row = m.x / 0.022, r = fract(row), l = r * 22.0 - 3.0;
    float st = step(0.0, l) * step(l, 8.0);
    float line = 1.0 - smoothstep(0.05, 0.13, abs(fract(l / 2.0 + 0.5) - 0.5) * 2.0);
    ink = line * st * 0.85;
  }
  // soft creasing from being handled
  float h = 0.5 + 0.035 * (fbm(uv * 4.0 + sd * 1.7, 4.0) - 0.5) + 0.016 * (fbm(uv * 16.0 + sd, 16.0) - 0.5) + 0.03 * (fC - 0.5);
  o = vec4(h, clamp(form, 0.0, 1.0), ink, 1.0);
}`,ma=C0+"layout(location=0) in vec2 aP; layout(location=1) in vec2 aA; out vec2 vA; void main(){ vA = aA; gl_Position = vec4(aP * 2.0 - 1.0, 0.0, 1.0); }",xa=C0+"in vec2 vA; uniform vec4 uC0; out vec4 o; void main(){ float d = 1.0 - abs(vA.x); o = uC0 * (uC0.a > 1.5 ? d * d * vA.y : 1.0); }",go=e=>ha.replace("void main(){","#define KIND "+e+`
void main(){`),So="uniform sampler2D uW; uniform sampler2D uN; uniform vec4 uA[10];",Qt=(e,t)=>t?e.replace(So,t+So):e,Ro=(e,t)=>Qt(na,t).replace("out vec4 o;","#define PLC "+e+`
out vec4 o;`),Ie=(e,t,p)=>{const l=e.createProgram();return e.attachShader(l,t),e.attachShader(l,p),e.linkProgram(l),e.flush(),l},$t=(e,t,p)=>{const l=e.createShader(t);return e.shaderSource(l,p),e.compileShader(l),l};function Ve(e,t,p){if(!e.getProgramParameter(t,e.LINK_STATUS)){let y="";for(const m of e.getAttachedShaders(t))e.getShaderParameter(m,e.COMPILE_STATUS)||(y+=" "+e.getShaderInfoLog(m));throw new Error("197 "+p+": "+e.getProgramInfoLog(t)+y)}const l={},x=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let y=0;y<x;y++){const m=e.getActiveUniform(t,y);l[m.name.replace("[0]","")]=e.getUniformLocation(t,m.name)}return{p:t,u:l}}function va(e,t,p,l){t.hal[p+l]||(t.hal[p+l]=Ve(e,Ie(e,t.vsf,$t(e,e.FRAGMENT_SHADER,Ro(p,l))),"hall"))}function pa(e,t,p){if(t.pm[p])return;const l=Ie(e,$t(e,e.VERTEX_SHADER,wo),$t(e,e.FRAGMENT_SHADER,Qt(Eo,p))),x=Ie(e,$t(e,e.VERTEX_SHADER,Qt(Ao,p)),$t(e,e.FRAGMENT_SHADER,Mo));t.pm[p]={paper:Ve(e,l,"paper"),mote:Ve(e,x,"mote")}}function ba(e,t,p){if(t.flo[p])return;const l=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(l,go(p)),e.compileShader(l);const x=e.createProgram();if(e.attachShader(x,t.vsf),e.attachShader(x,l),e.linkProgram(x),!e.getProgramParameter(x,e.LINK_STATUS))throw new Error("197 floor: "+e.getProgramInfoLog(x)+" "+e.getShaderInfoLog(l));t.flo[p]={p:x,uB0:e.getUniformLocation(x,"uB0[0]")}}function ya(e,t,p,l,x){let y=To.get(e);if(y)return ba(e,y,t),va(e,y,p,l),pa(e,y,x),y;const m={hall:[lt,Ro(p,l)],gather:[lt,sa],down:[lt,ia],blur:[lt,ca],comp:[lt,fa],paper:[wo,Qt(Eo,x)],mote:[Qt(Ao,x),Mo],noise:[lt,ua],win:[lt,la],floor:[lt,go(t)],sheet:[lt,da],flat:[ma,xa]},D=(B,t0)=>{const z0=e.createShader(B);return e.shaderSource(z0,t0),e.compileShader(z0),z0},u={},X={};for(const B in m){const t0=e.createProgram(),z0=u[m[B][0]]||(u[m[B][0]]=D(e.VERTEX_SHADER,m[B][0]));e.attachShader(t0,z0),e.attachShader(t0,D(e.FRAGMENT_SHADER,m[B][1])),e.linkProgram(t0),e.flush(),X[B]=t0}const W={};for(const B in X){if(!e.getProgramParameter(X[B],e.LINK_STATUS)){let j="";for(const m0 of e.getAttachedShaders(X[B]))e.getShaderParameter(m0,e.COMPILE_STATUS)||(j+=" "+e.getShaderInfoLog(m0));throw new Error("197 "+B+": "+e.getProgramInfoLog(X[B])+j)}const t0=W[B]={},z0=e.getProgramParameter(X[B],e.ACTIVE_UNIFORMS);for(let j=0;j<z0;j++){const m0=e.getActiveUniform(X[B],j),h=m0.name.replace("[0]","");t0[h]=e.getUniformLocation(X[B],m0.name)}}const d0=e.createVertexArray();e.activeTexture(e.TEXTURE0);const r0=e.createTexture();e.bindTexture(e.TEXTURE_2D,r0),e.texStorage2D(e.TEXTURE_2D,5,e.RGBA8,256,256);const _=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,_),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r0,0),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.viewport(0,0,256,256),e.useProgram(X.noise),e.bindVertexArray(d0),e.drawArrays(e.TRIANGLES,0,3),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.bindFramebuffer(e.FRAMEBUFFER,null),y={pr:X,U:W,vao:d0,nt:r0,meshes:{},vsf:u[lt],flo:{[t]:{p:X.floor,uB0:W.floor.uB0}},hal:{[p+l]:{p:X.hall,u:W.hall}},pm:{[x]:{paper:{p:X.paper,u:W.paper},mote:{p:X.mote,u:W.mote}}}},To.set(e,y),y}const Fo=.297,Lo=.21;function Ta(e){const t=e==="Dart"||e==="Blunt delta",p=t?Fo:Lo,l=t?Lo/2:Fo/2;let x=[{p:[[0,0,0,0],[0,l,0,l],[p,l,p,l],[p,0,p,0]],l:0}];const y=[],m=(z,E,V,e0)=>{const o0=V-z,c0=e0-E,Q=Math.hypot(o0,c0),G=o0/Q,$0=c0/Q,Et=C=>(C[0]-z)*-$0+(C[1]-E)*G,x0=C=>{const B0=C[0]-z,H0=C[1]-E,Y=B0*G+H0*$0;return[z+(2*Y*G-B0),E+(2*Y*$0-H0),C[2],C[3]]};let U0=0;for(const C of x)C.l>U0&&(U0=C.l);const O0=[];for(const C of x){const B0=[],H0=[],Y=[];for(let k0=0;k0<C.p.length;k0++){const D0=C.p[k0],w0=C.p[(k0+1)%C.p.length],w=Et(D0),n0=Et(w0);if(w>1e-7?B0.push(D0):w<-1e-7?H0.push(D0):(B0.push(D0),H0.push(D0),Y.push(D0)),w>1e-7&&n0<-1e-7||w<-1e-7&&n0>1e-7){const ht=w/(w-n0),G0=[0,1,2,3].map(et=>D0[et]+(w0[et]-D0[et])*ht);B0.push(G0),H0.push(G0),Y.push(G0)}}Y.length>=2&&y.push([Y[0][2],Y[0][3],Y[1][2],Y[1][3]]),B0.length>=3&&O0.push({p:B0.map(x0).reverse(),l:2*U0+1-C.l}),H0.length>=3&&O0.push({p:H0,l:C.l})}const tt=[...new Set(O0.map(C=>C.l))].sort((C,B0)=>C-B0);for(const C of O0)C.l=tt.indexOf(C.l);x=O0};let D=.026,u=.2,X=1;e==="Dart"?(m(0,0,l,l),m(0,0,l/Math.tan(Math.PI/8),l),D=.03,u=.2,X=1.6):e==="Blunt delta"?(m(0,0,l,l),m(.07,0,.07,l),m(.07,.04,.2,l),D=.024,u=.17,X=1.1):e==="Long wing"?(m(.05,0,.05,l),m(.082,0,.082,l),m(.082,l-.05,.082+.05/Math.tan(.75),l),D=.017,u=.13,X=.45):(m(.03,0,.03,l),m(.054,0,.054,l),m(.078,0,.078,l),m(.102,0,.102,l),D=.012,u=.1,X=.3);let W=1e9,d0=-1e9,r0=0;for(const z of x)for(const E of z.p)E[0]<W&&(W=E[0]),E[0]>d0&&(d0=E[0]),E[1]>r0&&(r0=E[1]);for(const z of x)for(const E of z.p)E[0]-=W;d0-=W;let _=0,B=0,t0=0;const z0=(z,E,V)=>{let e0=!1;for(let o0=0,c0=z.length-1;o0<z.length;c0=o0++){const Q=z[o0],G=z[c0];Q[1]>V!=G[1]>V&&E<(G[0]-Q[0])*(V-Q[1])/(G[1]-Q[1])+Q[0]&&(e0=!e0)}return e0},j=44,m0=26,h=d0/j,f=r0/m0;let d=0,k=0,O=0;for(let z=0;z<m0;z++){const E=(z+.5)*f;let V=1e9,e0=-1e9,o0=0;for(let c0=0;c0<j;c0++){const Q=(c0+.5)*h;let G=0;for(const $0 of x)z0($0.p,Q,E)&&G++;G&&(_+=G*h*f,B+=G*h*f*Q,t0+=G*h*f*Q*Q,E>D&&(o0++,d+=h*f,k+=Q*h*f,Q<V&&(V=Q),Q>e0&&(e0=Q)))}if(o0){const c0=e0-V+h;O+=c0*c0*f}}_*=2,B*=2,t0*=2,d*=2,k*=2,O*=2;const I=B/_,q=O/d,F=2*(r0-D),Z=F*F/d,J=t0-_*I*I,S=k/d-.17*q;return{polys:x,creases:y,h:D,dih:u,kvx:X,L:d0,Y:r0,S:d,mac:q,b:F,AR:Z,xcg:I,xac:S,area:_,iyy:J,LS:p,WS:l,portrait:t,sheetArea:2*p*l}}const ye=1.2,qe=9.81,Q0=1/400;function za(e,t,p){const l=e.sheetArea*t*.001,x=e.S,y=e.mac,m=e.b,D=e.AR,u=2*Math.PI*D/(2+Math.sqrt(4+D*D)),X=D<2?.85:.78,W=ye*Math.PI*.25*y*y*m*.9,d0=Math.min(.16,Math.max(.1,(e.xac-e.xcg)/y+.04));return{m:l,S:x,c:y,b:m,AR:D,CLa:u,k:1/(Math.PI*X*D),CD0:.024+.004*p,kv:e.kvx,as:(e.kvx>1.3?28:e.kvx>.9?22:15)*Math.PI/180,ds:4.5*Math.PI/180,SM:d0,Cm0:.012,Cmd:.34,tau:.3,Cmq:-3.2-3*(e.L/y-1),I:e.iyy*t*.001+ye*Math.PI/128*y*y*y*y*m*2.2,ma:W,h:e.h,xn:e.xcg,xt:e.L-e.xcg}}const Do=()=>({x:0,z:0,vx:4,vz:0,th:0,q:0,f:1,de:0,a:0,V:4,n:1,contact:0,slide:0,hit:0}),wa=(e,t,p)=>{const l=Math.max(0,Math.min(1,(p-e)/(t-e)));return l*l*(3-2*l)};function Oe(e,t,p,l){p(t.x,t.z);const x=t.vx-p.u,y=t.vz-p.w,m=Math.max(Math.hypot(x,y),.05),D=Math.atan2(y,x);let u=t.th-D;u=Math.atan2(Math.sin(u),Math.cos(u));const X=Math.abs(u),W=1-wa(e.as-e.ds,e.as+e.ds,X),d0=(W<t.f?5:14)*e.c/Math.max(m,.6);t.f+=(W-t.f)*Math.min(1,Q0/d0);const r0=t.f,_=Math.sin(u),B=Math.cos(u),t0=t.de,z0=Math.max(t.z,.005)/e.b,j=16*z0,m0=j*j/(1+j*j),h=u-e.tau*t0,f=Math.sin(h),d=Math.cos(h),k=e.CLa*(1+.22*(1-m0))*f*d+e.kv*.55*_*Math.abs(_)*B,O=e.CD0+e.k*m0*k*k+.1*f*f,I=1.05*Math.sin(2*u),q=e.CD0+1.85*_*_,F=r0*k+(1-r0)*I,Z=r0*O+(1-r0)*q,J=.5*ye*m*m*e.S,S=J*F,z=J*Z,E=-y/m,V=x/m,e0=-x/m,o0=-y/m,c0=S*E+z*e0,Q=S*V+z*o0-e.m*qe,G=F*B+Z*_,$0=t.q*e.c/(2*m),Et=e.SM+(1-r0)*.2*Math.min(1,X/.6),x0=e.Cm0+e.Cmd*t0*(.45+.55*r0)-Et*G+e.Cmq*$0,U0=J*e.c*x0,O0=Math.cos(t.th),tt=Math.sin(t.th),C=c0*O0+Q*tt,B0=-c0*tt+Q*O0,H0=C/e.m,Y=B0/(e.m+e.ma);t.vx+=(H0*O0-Y*tt)*Q0,t.vz+=(H0*tt+Y*O0)*Q0,t.q+=U0/e.I*Q0,t.q=Math.max(-40,Math.min(40,t.q)),t.x+=t.vx*Q0,t.z+=t.vz*Q0,t.th+=t.q*Q0,t.V=m,t.a=u,t.n=S/(e.m*qe),t.contact=0;const k0=Math.cos(t.th),D0=Math.sin(t.th);for(let w0=0;w0<2;w0++){const w=w0===0?e.xn:-e.xt,n0=k0>-.2?-e.h:.012,ht=k0*w-D0*n0,G0=D0*w+k0*n0,et=t.z+G0;if(et<0){const v0=t.vz+t.q*ht,N0=t.vx-t.q*G0,P0=1/e.m+ht*ht/e.I,Te=1/e.m+G0*G0/e.I;if(v0<0){const ot=-(1+(v0<-.6?.22:0))*v0/P0;t.vz+=ot/e.m,t.q+=ht*ot/e.I;const ae=.34*ot,Nt=Math.max(-ae,Math.min(ae,-N0/Te));t.vx+=Nt/e.m,t.q+=-G0*Nt/e.I,ot/e.m>.1&&(t.hit=Math.max(t.hit,ot/e.m))}t.z-=et,t.contact=1}const oe=t.z+D0*w+.012;if(oe>l){const v0=k0*w,N0=t.vz+t.q*v0;if(N0>0){const P0=-1.25*N0/(1/e.m+v0*v0/e.I);t.vz+=P0/e.m,t.q+=v0*P0/e.I,t.vx*=.8,t.hit=Math.max(t.hit,-P0/e.m)}t.z-=oe-l}}t.contact?(t.q*=.985,t.vx*=.9985,t.slide=Math.abs(t.vx)):t.slide=0}function Ea(e,t,p){const l=[],x=[],y=t.L-Math.min(.035,t.L*.2);for(let f=0;f<=t.L+1e-6;f+=.012)l.push(f);l.push(y-.003,y,y+.004,t.L+.001),l.sort((f,d)=>f-d);for(let f=0;f<=t.h;f+=t.h/3)x.push(f);for(let f=t.h;f<=t.Y+1e-6;f+=.012)x.push(f);x.push(t.h+.004),x.push(t.Y+.001),x.sort((f,d)=>f-d);const m=(f,d,k,O)=>{const I=[];for(let q=0;q<f.length;q++){const F=f[q],Z=f[(q+1)%f.length],J=F[d]-k,S=Z[d]-k,z=O?J>=0:J<=0,E=O?S>=0:S<=0;if(z&&I.push(F),z!==E){const V=J/(J-S),e0=[0,1,2,3].map(o0=>F[o0]+(Z[o0]-F[o0])*V);I.push(e0)}}return I};let D=16384,u=new Float32Array(D*10),X=0;const W=(f,d,k,O,I,q,F,Z,J)=>{if(X===D){D*=2;const z=new Float32Array(D*10);z.set(u),u=z}const S=X*10;u[S]=f,u[S+1]=d,u[S+2]=k,u[S+3]=0,u[S+4]=O,u[S+5]=I,u[S+6]=q,u[S+7]=F,u[S+8]=Z,u[S+9]=J,X++};for(const f of t.polys){const d=f.p[0];let k=1,O=0,I=0,q=1;for(let F=1;F+1<f.p.length;F++){const Z=f.p[F],J=f.p[F+1],S=Z[2]-d[2],z=Z[3]-d[3],E=J[2]-d[2],V=J[3]-d[3],e0=S*V-E*z;if(Math.abs(e0)>1e-7){const o0=Z[0]-d[0],c0=Z[1]-d[1],Q=J[0]-d[0],G=J[1]-d[1];k=(o0*V-Q*z)/e0,O=(c0*V-G*z)/e0,I=(Q*S-o0*E)/e0,q=(G*S-c0*E)/e0;break}}for(let F=0;F+1<l.length;F++){const Z=m(m(f.p,0,l[F],!0),0,l[F+1],!1);if(!(Z.length<3))for(let J=0;J+1<x.length;J++){const S=m(m(Z,1,x[J],!0),1,x[J+1],!1);if(!(S.length<3))for(let z=1;z+1<S.length;z++){const E=[S[0],S[z],S[z+1]];for(const V of E)W(V[0],V[1]+1e-5,f.l,V[2]/t.LS,.5+V[3]/t.WS*.5,k,O,I,q);for(const V of E)W(V[0],-(V[1]+1e-5),f.l,V[2]/t.LS,.5-V[3]/t.WS*.5,k,-O,-I,q)}}}}const d0=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,d0),e.bufferData(e.ARRAY_BUFFER,u.subarray(0,X*10),e.STATIC_DRAW);const r0=e.createVertexArray();e.bindVertexArray(r0),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,40,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,40,16),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,40,24),e.bindVertexArray(null);const _=[];for(const f of t.polys)for(let d=1;d+1<f.p.length;d++)for(const k of[f.p[0],f.p[d],f.p[d+1]])_.push(k[0]/t.L,k[1]/t.Y,0,0);const B=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,B),e.bufferData(e.ARRAY_BUFFER,new Float32Array(_),e.STATIC_DRAW);const t0=e.createVertexArray();e.bindVertexArray(t0),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const z0=[],j=(f,d,k,O,I,q=1)=>{const F=k-f,Z=O-d,J=Math.hypot(F,Z)||1,S=-Z/J*I,z=F/J*I,E=(Q,G)=>[Q/t.LS,.5+G/t.WS*.5],V=E(f+S,d+z),e0=E(f-S,d-z),o0=E(k+S,O+z),c0=E(k-S,O-z);z0.push(V[0],V[1],1,q,e0[0],e0[1],-1,q,o0[0],o0[1],1,q,o0[0],o0[1],1,q,e0[0],e0[1],-1,q,c0[0],c0[1],-1,q)};for(const f of t.creases)j(f[0],f[1],f[2],f[3],.0016),j(f[0],-f[1],f[2],-f[3],.0016);j(0,0,t.LS,0,.002);{let f=91;const d=()=>(f=f*16807%2147483647)/2147483647;for(let k=0;k<16;k++){const O=d()*t.LS,I=(d()*2-1)*t.WS,q=d()*6.283,F=.012+d()*.05;j(O,I,O+Math.cos(q)*F,I+Math.sin(q)*F,.0012+d()*.001,.1+d()*.16)}}for(const f of t.polys){const d=[];for(let k=0;k<f.p.length;k++){const O=f.p[k],I=f.p[(k+1)%f.p.length],q=O[1]-t.h,F=I[1]-t.h;if(q>0!=F>0){const Z=q/(q-F);d.push([O[2]+(I[2]-O[2])*Z,O[3]+(I[3]-O[3])*Z])}}d.length===2&&(j(d[0][0],d[0][1],d[1][0],d[1][1],.002),j(d[0][0],-d[0][1],d[1][0],-d[1][1],.002))}const m0=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m0),e.bufferData(e.ARRAY_BUFFER,new Float32Array(z0),e.STATIC_DRAW);const h=e.createVertexArray();return e.bindVertexArray(h),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,16,8),e.bindVertexArray(null),{vao:r0,count:X,xH:y,fv:t0,fcount:_.length/4,cv:h,ccount:z0.length/4}}const Aa={"Copy white":{alb:[.86,.85,.82],T:.33,rs:.86,gsm:80,ink:[0,0,0],iw:0,k:0,stiff:1},"Cream laid":{alb:[.86,.8,.66],T:.34,rs:.86,gsm:90,ink:[0,0,0],iw:0,k:1,stiff:1.2},Graph:{alb:[.86,.87,.84],T:.33,rs:.86,gsm:80,ink:[.2,.42,.72],iw:.75,k:2,stiff:1},Kraft:{alb:[.5,.35,.21],T:.14,rs:.8,gsm:115,ink:[0,0,0],iw:0,k:0,stiff:1.6},Onionskin:{alb:[.88,.87,.8],T:.62,rs:.72,gsm:36,ink:[0,0,0],iw:0,k:0,stiff:.4},"Airmail blue":{alb:[.55,.68,.82],T:.55,rs:.76,gsm:45,ink:[0,0,0],iw:0,k:0,stiff:.5},"Stave paper":{alb:[.86,.81,.68],T:.33,rs:.86,gsm:80,ink:[.1,.08,.07],iw:.85,k:6,stiff:1}},Ma={"Late gold":{el:17,az:30,sun:[13,8.4,4],amb:[.62,.52,.42],bn:[.32,.2,.11],haze:[1.2,.8,.45],hr:.018,sh:[7.2,4.9,2.6],st:[2.6,3.3,4.4],tr:[.85,.82,.22],trA:.8,exp:.8,dust:.012,aur:1},Afternoon:{el:27,az:26,sun:[12,10,7.2],amb:[.7,.72,.72],bn:[.3,.25,.18],haze:[1.2,1.1,.95],hr:.012,sh:[6.2,6.2,5.8],st:[2.4,3.4,5],tr:[.42,.72,.2],trA:.8,exp:.72,dust:.007,aur:.5},"Last red":{el:9,az:34,sun:[14,5.6,1.7],amb:[.5,.3,.2],bn:[.32,.14,.06],haze:[1.2,.5,.26],hr:.024,sh:[8,3.4,1.4],st:[2.2,1.5,2],tr:[.3,.13,.06],trA:.9,exp:.95,dust:.016,aur:1.2},"Hazy morning":{el:19,az:24,sun:[13,10.5,7.2],amb:[.62,.58,.5],bn:[.3,.24,.16],haze:[1.5,1.3,.98],hr:.032,sh:[6,5.9,5.5],st:[4.8,5,5.2],tr:[1.4,1.55,1.25],trA:.5,exp:.72,dust:.03,aur:.8},Moonlit:{el:24,az:28,sun:[1.5,2,3.3],amb:[.05,.08,.15],bn:[.03,.04,.07],haze:[.05,.08,.15],hr:.02,sh:[.25,.4,.8],st:[.1,.17,.35],tr:[.01,.015,.03],trA:.8,exp:2.5,dust:.03,aur:.5}},ga={Limewash:[.78,.72,.6],"Sage distemper":[.42,.5,.38],Oxblood:[.36,.12,.09],"Soot-dark panel":[.12,.09,.07]},Sa={"Oak boards":{k:0,a:[.44,.26,.13],b:[.2,.11,.05],F0:.05,gloss:.72,rough:1.5,tile:3},Terrazzo:{k:1,a:[.62,.58,.5],b:[.3,.3,.3],F0:.06,gloss:1.05,rough:.45,tile:3.2},"Limestone flags":{k:2,a:[.55,.5,.42],b:[.42,.37,.31],F0:.04,gloss:.55,rough:1.2,tile:3.6},"Chequer marble":{k:3,a:[.7,.68,.63],b:[.03,.03,.035],F0:.07,gloss:1.2,rough:.25,tile:2.4}},te=.82,_o=3,Ra=.36,ee=[null,[1.25,.08],[1.5,.12],[1.8,.16],[1,.04],[.85,0]],Bo=2.5;yo.add({num:197,name:"Paper Plane",fam:"Worlds",recipe:"A paper plane in free flight, where the fold and how its flaps are bent decide whether it floats, stalls or loops. Most mints fly down a sunny hall, some down a corridor. Drag back and let go to throw it (further is harder, pull back to the right to throw it at the far wall), or tap the top or bottom half to bend the flaps up or down, even mid-flight.",interactive:"Drag back from anywhere and let go to throw: the farther the pull, the harder the throw; pull down to throw upward, pull back to the right to throw it into the picture at the far wall. Tap the top half of the picture to bend the elevons up, the bottom half to bend them down, even in flight.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,p=e.size,l=(e.hash||"0x0").slice(2).padEnd(64,"0"),x=r=>parseInt(l.slice(r*8,r*8+8),16)>>>0,y=r=>{let a=r>>>0;return()=>{a=a+1831565813|0;let i=Math.imul(a^a>>>15,1|a);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}},m=y((x(0)^Math.imul(x(3),739982445)^6522)>>>0),D=(r,a)=>{let i=0;for(const v of a)i+=v;let s=m()*i,n=0;for(;s>=a[n]&&n<a.length-1;)s-=a[n++];return r[n]},u=(r,a,i)=>r<a?a:r>i?i:r,X=(r,a,i)=>{const s=u((i-r)/(a-r),0,1);return s*s*(3-2*s)},W=(r,a,i)=>r+(a-r)*i;let d0=D(["Dart","Blunt delta","Long wing","Spar wing"],[34,30,28,8]),r0=D(["Copy white","Cream laid","Graph","Kraft","Onionskin","Airmail blue","Stave paper"],[30,22,16,12,10,5,5]),_=D(["Floater","Porpoise","Stall-prone","Looper"],[44,28,18,10]),B=D(["Late gold","Afternoon","Last red","Hazy morning","Moonlit"],[44,20,20,10,6]),t0=D(["Tall sash","Arched","Pointed","Stained quarries"],[44,30,18,8]),z0=D(["Oak boards","Terrazzo","Limestone flags","Chequer marble"],[40,26,24,10]),j=D(["Limewash","Sage distemper","Oxblood","Soot-dark panel"],[44,28,18,10]),m0=D(["Still","Warm bars","Draught","Dusty"],[44,32,16,8]),h=D(["Alongside","Close behind","From under","Long lens"],[42,24,20,14]);const f=m(),d=m(),k=m(),O=m();_==="Looper"&&h==="From under"&&(h="Alongside");{const r=y((x(5)^Math.imul(x(6),2654435761)^6514)>>>0),a=r();a<.12?h="Down the hall":a<.22?h="From above":h==="Alongside"&&a<.48&&(h=a<.36?"Down the hall":"From above")}const I=y((x(1)^Math.imul(x(4),3266489909)^6516)>>>0),q=I(),F=I(),Z=I(),J=I(),S=I(),z=I();e.home&&(d0="Dart",r0="Cream laid",_="Floater",B="Late gold",t0="Tall sash",z0="Oak boards",j="Limewash",m0="Warm bars",h="Alongside");const E=y((x(3)^Math.imul(x(6),668265263)^6517)>>>0),V=E(),e0=E(),o0=E(),c0=E(),Q=E();!e.home&&(h==="Alongside"||h==="Close behind")&&o0<.2&&(h="The sheet");const G=h==="The sheet",$0=!e.home&&F>=.15&&F<.3&&h!=="From under"&&_!=="Looper",Et=!e.home&&h==="From above"&&c0<.18&&!$0,x0=!e.home&&h!=="From under"&&B!=="Moonlit"&&t0!=="Stained quarries"&&V<Ra&&B!=="Last red"&&(r0!=="Kraft"||h==="The sheet")&&j!=="Soot-dark panel"&&z0!=="Chequer marble"&&!Et&&!($0&&h==="Down the hall"),U0=e0<.5?3:4,O0=r=>x0&&((Math.floor(r)%U0+U0)%U0!==0||r-Math.floor(r)<=.5);e.trait("Fold",d0),e.trait("Paper",r0),e.trait("Trim",_),e.trait("Hour",B),e.trait("Windows",x0?"Shutters closed":t0),e.trait("Floor",z0),e.trait("Walls",j),e.trait("Air",m0),e.trait("View",h);let tt=!e.home&&q<.65&&h!=="From above"&&h!=="Down the hall"&&j!=="Limewash",C=e.home?"mid":F<.15?"end":F<.3?"door":"mid";C==="end"&&!(h==="Close behind"||h==="Down the hall"||h==="Long lens")&&(C="mid");const B0=e.home||Z<.4?0:Z<.62?1:Z<.82?2:3,H0=J<.5?1:0,Y=$0;(Y||x0)&&h!=="From above"&&h!=="Down the hall"&&(tt=!0),C==="door"&&(C="mid");let k0=.12+.45*S;const D0=.0025+.003*z,w0=Aa[r0],w=Ma[B],n0=Sa[z0],ht=ga[j],G0=C==="end"?1:0,et=x0?"#define SHUT "+U0+".0"+ut+"#define SHK "+(t0==="Tall sash"?0:1)+ut+"#define SHX 0.16"+ut+"#define SHS 0.34"+ut:"",oe=et+(x0?"#define SHB 1"+ut:"")+(Y?"#define CORR 1"+ut:""),v0=ya(t,n0.k,G0,oe,et),N0=v0.pr,P0=v0.U,Te=v0.hal[G0+oe],ot=v0.pm[et].paper,ae=v0.pm[et].mote,Nt=m(),Xt=m()*6.283,ze=m()*6.283,Ge=m()*6.283,ko=v0.meshes[d0]||(v0.meshes[d0]=(()=>{const r=Ta(d0);return{F:r,M:Ea(t,r,d0)}})()),b=ko.F,Y0=ko.M,dt=za(b,w0.gsm,w0.stiff),Za=b.L,Ja=b.Y,we=e.home;let X0=we?2.4:2+1.1*f,L0=we?3.5:3+1.3*d,Ee=L0*(we?.6:.5+.17*k),Ae=we?5.9:4.9+1.6*O,K0=Ae+.7,Me=.5,Ye=.34;Y&&(X0=1.05+.25*f,L0=2.3+.7*d,Ee=.85+.3*k,K0=2.5+.4*O,Ae=K0-.38,Me=.62,Ye=.9);const Ke=w.el*Math.PI/180,Po=w.az*Math.PI/180,W0=Math.sin(Po)*Math.cos(Ke),j0=Math.cos(Po)*Math.cos(Ke),I0=Math.sin(Ke),Fa=m()<.65?1:.3,La=B==="Hazy morning"?.1:.32,It=(r,a)=>{let i=0,s=0;if(m0==="Warm bars"&&a<5){const n=.5+.5*Math.cos((r-at)/L0*6.283);s=.24*n*n*(1-a/5)}m0==="Draught"&&(i=-.5+.28*Math.sin(r*.31+Xt)+.2*Math.sin(r*.83+ze),s=.16*Math.sin(r*1.13+Ge)+.1*Math.sin(r*2.3+Xt)),It.u=i,It.w=s};let at=0,We=2,Vt=1e5,Co=2,ge=0;const Se=r=>(dt.SM*r-dt.Cm0)/dt.Cmd,je=Se(_==="Floater"?.5:_==="Porpoise"?.42:_==="Stall-prone"?1.25:1.05),Ze=r=>Math.sqrt(2*dt.m*qe/(ye*dt.S*r)),re=_==="Floater"?1.2*Ze(.5):_==="Porpoise"?2.2*Ze(.42):_==="Stall-prone"?1.5*Ze(1):10.5,Je=_==="Floater"?.06:_==="Porpoise"?.14:_==="Stall-prone"?.1:.22;let Rt=u(je,-.26,.6);const o=Do();o.de=Rt;for(let r=0;r<2;r++){const a=(N,M)=>{It(N,M<900?M:M-1e3+We),a.u=It.u,a.w=It.w};let i=0,s=null,n=1e9,v=-1e9,R=0,A=0,U=1,p0=4*te,b0=null,$=1e9;Y&&(p0=(4-Bo)*te);for(let N=Y?1:0;N<(Y?ee.length:1);N++){const M=Do(),g=N===0?[1,Je]:ee[N];M.z=1e3,M.de=Rt,M.vx=re*g[0]*Math.cos(g[1]),M.vz=re*g[0]*Math.sin(g[1]),M.th=g[1]+(N?.05:.04);const M0=_==="Looper"||N>0?0:1.2;for(let i0=0;i0<M0*400;i0++)Oe(dt,M,a,1e9);i=M.z,s={x:M.x,vx:M.vx,vz:M.vz,th:M.th,q:M.q,f:M.f},n=1e9,v=-1e9,R=0,A=0;for(let i0=0;i0<4.2*te*400;i0++){Oe(dt,M,a,1e9);const T0=M.z-i;i0/400<p0&&T0<n&&(n=T0),T0>v&&(v=T0),Math.abs(i0/400-p0)<1.5/400&&(R=T0,A=M.x)}if(!Y){U=u(Math.max(.78-R,.32-n),1,K0-.9-Math.max(v,0));break}const y0=Math.max(.85-R,.3-n),q0=K0-.3-Math.max(v,0),J0=u(y0,.9,Math.max(q0,.9)),ft=(y0<=q0?0:10)+Math.abs(J0+R-.85);ft<$&&($=ft,b0={z0:J0,ci:N,z0a:i,st0:s,zMin:n,zMax:v,zAt:R,xAt:A})}Y&&({z0:U,ci:ge,z0a:i,st0:s,zMin:n,zMax:v,zAt:R,xAt:A}=b0),o.x=s.x,o.z=U,o.vx=s.vx,o.vz=s.vz,o.th=s.th,o.q=s.q,o.f=s.f;const a0=U+R,H=X0/j0,T=A+W0*H,u0=a0+I0*H;at=T-L0*.55;const F0=W0/j0*Me,h0=Ee*.5;x0?at=T-L0*.5-(Math.max(-h0,-F0)+(h0-F0-Math.max(-h0,-F0))*(h==="From above"?.3:.5)):Y&&(at=T-L0*.5+F0*.5),Co=A-s.x;for(let N=0;N<12;N++){const M=(T-at)/L0;let M0=((Math.floor(M)*.7131+Nt)%1+1)%1;if(M0=(M0*M0*91.7+M0*13.1)%1,x0||M0<.58)break;at-=L0}if(x0){const N=Math.floor((T-at)/L0);at+=(N%U0+U0)%U0*L0}We=U,Vt=C==="end"?A+2.6:1e5}let E0=0,rt=0,nt=0,Ft=0,st=0,S0="fly",Z0=0,ne=0,mt=0,se=0,Re=0,Fe=2.8,Qa=0,ie=0,ce=0,$a=null,Da=0,Lt=0,Uo=!1,Qe=0,Le=0,qt=0;Y&&(S0="lift",Re=o.x,Fe=o.z,qt=Bo,o.th=ee[ge][1]+.05);let De=.72;const $e=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),At=$e?0:1,fe=$e?t.RGBA16F:t.RGBA8,ue=$e?t.HALF_FLOAT:t.UNSIGNED_BYTE,Ho=t.getExtension("EXT_texture_filter_anisotropic"),le=v0.vao,yt=(r,a,i,s,n,v)=>{const R=t.createTexture();return t.bindTexture(t.TEXTURE_2D,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,v>1?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texStorage2D(t.TEXTURE_2D,v,i,r,a),R},he=(r,a,i,s)=>{const n=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),a){const v=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,v),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,i,s),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,v)}return n},f0=Math.max(180,Math.round(p*.72)),Mt=Math.min(768,Math.max(256,Math.round(p*1.15))),A0=Math.max(64,Math.round(p*.2)),to=yt(f0,f0,fe,t.RGBA,ue,1),No=yt(f0,f0,fe,t.RGBA,ue,1),Xo=to,_e=yt(Mt,Mt,fe,t.RGBA,ue,4),eo=yt(A0,A0,fe,t.RGBA,ue,1),Io=yt(A0,A0,fe,t.RGBA,ue,1),Vo=he(to,Et,f0,f0),_a=he(No),Ba=Vo,ka=he(_e,!0,Mt,Mt),qo=he(eo),Pa=he(Io);t.activeTexture(t.TEXTURE0);const Dt=(r,a)=>{t.viewport(0,0,r,a),t.drawArrays(t.TRIANGLES,0,3)},Oo=t.createFramebuffer(),oo=(r,a,i,s,n,v)=>{t.bindFramebuffer(t.FRAMEBUFFER,Oo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(s),t.bindVertexArray(le),n(),Dt(a,i)},Be=r=>{t.bindTexture(t.TEXTURE_2D,r),t.generateMipmap(t.TEXTURE_2D)},ao=256,ro=512;t.activeTexture(t.TEXTURE0);const de=yt(ao,ro,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,5);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT);const Ca=t0==="Tall sash"?0:t0==="Arched"?1:t0==="Pointed"?2:3;oo(de,ao,ro,N0.win,()=>{t.uniform4fv(P0.win.uB0,new Float32Array([Ca,Ee,Ye,Ae,L0,K0,3,.62,1,1,1,1,1/ao,1/ro,0,0]))}),t.bindTexture(t.TEXTURE_2D,de),Be(de);const _t=p<400?512:1024,no=yt(_t,_t,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,_t===1024?11:10);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),Ho&&t.texParameterf(t.TEXTURE_2D,Ho.TEXTURE_MAX_ANISOTROPY_EXT,8),oo(no,_t,_t,v0.flo[n0.k].p,()=>{t.uniform4fv(v0.flo[n0.k].uB0,new Float32Array([n0.k,0,0,0,n0.a[0],n0.a[1],n0.a[2],1,n0.b[0],n0.b[1],n0.b[2],1,1/_t,1/_t,0,0]))}),Be(no);const ke=G?1024:256,Pe=yt(ke,ke,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,G?9:7);t.bindFramebuffer(t.FRAMEBUFFER,Oo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Pe,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.disable(t.DEPTH_TEST),t.useProgram(N0.flat),t.bindVertexArray(Y0.fv),t.uniform4f(P0.flat.uC0,1/8,1/8,1/8,1/8),t.viewport(0,0,ke,ke),t.drawArrays(t.TRIANGLES,0,Y0.fcount),t.disable(t.BLEND),Be(Pe);const it=p<400?512:1024,so=yt(it,it,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,it===1024?6:5);oo(so,it,it,N0.sheet,()=>{t.uniform4fv(P0.sheet.uB0,new Float32Array([w0.k,0,0,0,b.LS,b.WS*2,Nt*40,0,0,0,0,0,1/it,1/it,0,0]))}),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.useProgram(N0.flat),t.bindVertexArray(Y0.cv),t.colorMask(!0,!1,!1,!1),t.uniform4f(P0.flat.uC0,.4,0,0,2),t.viewport(0,0,it,it),t.drawArrays(t.TRIANGLES,0,Y0.ccount),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),Be(so),t.bindFramebuffer(t.FRAMEBUFFER,null);const io=x0?.08:1,co=x0?.25:1,fo=x0?.15:1,Ua=x0?{"Late gold":.52,Afternoon:.4,"Hazy morning":.27}[B]*(h==="The sheet"?1.45:h==="From above"?.85:1)*(Y?2:1):1,Bt=new Float32Array(40),P=new Float32Array(32),K=new Float32Array(32),L=new Float32Array(24),Ot=new Float32Array(16),V0=new Float32Array(8),xt=new Float32Array(12),R0=new Float32Array(16);Bt.set([X0,K0,L0,Me,W0,j0,I0,La,w.sun[0],w.sun[1],w.sun[2],0,w.amb[0]*io,w.amb[1]*io,w.amb[2]*io,x0?0:.75*Fa,w.bn[0]*co,w.bn[1]*co,w.bn[2]*co,0,w.haze[0]*fo,w.haze[1]*fo,w.haze[2]*fo,w.hr,ht[0],ht[1],ht[2],Nt,w.sh[0],w.sh[1],w.sh[2],0,w.st[0],w.st[1],w.st[2],w.aur,w.tr[0],w.tr[1],w.tr[2],w.trA]),Bt[31]=B0,Ot.set([w0.alb[0],w0.alb[1],w0.alb[2],1,w0.T,w0.rs,.85,0,w0.ink[0],w0.ink[1],w0.ink[2],w0.iw,1.2/it,1.2/it,0,0]),h==="The sheet"&&(Ot[15]=90);const Gt={Alongside:[-.5,-.54,.1,20],"Close behind":[-.62,-.36,.34,22],"From under":[-.4,-.5,-.2,21],"Long lens":[-.85,-.98,.38,11.5],"Down the hall":[-1.25,-.8,.3,20],"From above":[-.45,-.3,1,24],"The sheet":[-.3,-.17,.17,24]}[h],me=Math.tan(Gt[3]*Math.PI/180),Go=h==="Long lens"?.02:.011,Ha=h==="Long lens"?.2:.34,vt=tt?[Gt[0],-Gt[1]*.95,Gt[2],Gt[3]]:Gt.slice();if(Y&&(h==="Down the hall"||h==="Close behind"||h==="Long lens")&&(vt[1]*=.45),Y&&h==="Close behind"&&(vt[2]=.14),x0&&!Y&&h==="From above")for(let r=0;r<3;r++)vt[r]*=1.5;let Yt=0;const c={x:0,y:0,z:0,fx:1,fy:0,fz:0,rx:0,ry:0,rz:0,ux:0,uy:0,uz:1,focus:1};let gt=0,Ce=0,Kt=0,kt=0,Pt=0,Ct=0,uo=!1,Ue=0,He=0;const g0={},Yo=()=>{const r=Math.cos(o.th),a=Math.sin(o.th),i=Math.cos(st),s=Math.sin(st),n=Math.cos(nt),v=Math.sin(nt),R=r*i,A=r*s,U=a,p0=-s,b0=i,$=0,a0=-a*i,H=-a*s,T=r;g0.ex=R,g0.ey=A,g0.ez=U,g0.yx=p0*n+a0*v,g0.yy=b0*n+H*v,g0.yz=$*n+T*v,g0.zx=-p0*v+a0*n,g0.zy=-b0*v+H*n,g0.zz=-$*v+T*n},Na=(r,a,i,s)=>(s[0]=o.x+g0.ex*r+g0.yx*a+g0.zx*i,s[1]=E0+g0.ey*r+g0.yy*a+g0.zy*i,s[2]=o.z+g0.ez*r+g0.yz*a+g0.zz*i,s),Ko=[0,0,0],Wt=[],Xa=(r,a)=>{const i=r[0]-c.x,s=r[1]-c.y,n=r[2]-c.z,v=i*c.fx+s*c.fy+n*c.fz;return a[0]=(i*c.rx+s*c.ry+n*c.rz)/(v*me),a[1]=(i*c.ux+s*c.uy+n*c.uz)/(v*me),a[2]=v,a};for(let r=0;r<8;r++)Wt.push([0,0,0]);const Ia=x0||Y,lo=(r,a)=>{const i=(r-at)/L0,s=i-Math.floor(i);return Math.abs(s-.5)*L0<Ee*.5&&a>Ye&&a<Ae},ho=(r,a,i)=>{const s=(X0-a)/j0,n=r+W0*s,v=i+I0*s;if(!Ia)return lo(n,v);const R=Me/j0,A=n+W0*R,U=v+I0*R;return lo(n,v)&&lo(A,U)&&!O0((A-at)/L0)},Wo=()=>ho(o.x,E0,o.z),jo=(()=>{const r=n0.a,a=n0.b,i=s=>r[s]*.6+a[s]*.4;return i(0)*.3+i(1)*.5+i(2)*.2})(),Va=()=>{let r=0;for(let a=-1;a<=1;a++)ho(o.x,E0+a*.12,0)&&(r+=1/3);return r},jt=[],qa=(x(4)^Math.imul(x(5),374761393)^6518)>>>0;let Zo=0;const Oa=(r,a)=>ho(r,a,0)?1:0;function Jo(){if(jt.length=0,!Et)return;const r=y(qa+Math.imul(Zo+1,2654435761)>>>0),a=4+Math.floor(r()*6),i=o.x+Co,s=b.h/Math.max(b.Y-b.h,.01)*.9,n=r()*6.283,v=Math.floor(r()*a),R=h==="Down the hall"?2+Math.floor(r()*2):0,A=h==="From above"?[-.6,1]:[-.4,1.9],U=h==="From above"?.75:Math.min(1,X0-.45);let p0=0;for(let b0=0;b0<a;b0++){const $=n+b0*6.283/a+(r()-.5)*.35*6.283/a,a0=Math.sin($);let H=0,T=0,u0=!1;for(let N=0;N<8&&!u0;N++){H=i+W(A[0],A[1],r()),p0<R&&a0>.55?T=X0-.012-a0*b.xcg:T=(r()*2-1)*U,u0=!0;for(const M of jt)Math.hypot(M.x-H,M.y-T)<.34&&(u0=!1)}if(!u0)continue;const F0=Math.abs(T)>X0-.4;F0&&p0++;const h0=b0===v&&!F0;jt.push({x:H,y:T,z:h0?(b.Y-b.h)*Math.sin(b.dih)+.004:b.h,th:(r()-.5)*.06,yaw:$,roll:h0?Math.PI+(r()-.5)*.2:(r()<.5?1:-1)*s*(.8+.3*r()),dent:F0?.9+.4*r():.12+.5*r(),sun:Oa(H,T)})}}Jo();function Qo(r){k0=Math.min(k0+.14+r*.08,1.3),o.vx*=.25,o.vz=Math.min(o.vz,0),o.f=.15,o.q+=(Xt>3.14?1:-1)*(2+r),e.sound.hit("click",u(.2+r*.08,.1,.7)),e.sound.hit("noise",u(.06+r*.03,.04,.3),{dur:.12,cutoff:2400})}function $o(r){const a=te;Yt+=((S0==="rest"||o.contact&&S0==="fly"?1:0)-Yt)*(1-Math.exp(-r*1.2));const i=G?16:6.5,s=G?a/i:.13*a,n=o.x+o.vx*s,v=E0,R=o.z+o.vz*(G?s:.1*a);if(uo||(gt=n,Ce=v,Kt=R,kt=o.x,Pt=E0,Ct=o.z,uo=!0),G){const i0=Yt;vt[0]=W(-.3,-.62,i0),vt[1]=W(-.17,-.36,i0)*(tt?-.95:1),vt[2]=W(.17,.34,i0)}const A=1-Math.exp(-r*i),U=1-Math.exp(-r*15);gt+=(n-gt)*A,Ce+=(v-Ce)*A,Kt+=(R-Kt)*A;const p0=o.x-gt;Math.abs(p0)>1.1&&(gt=o.x-Math.sign(p0)*1.1);const $=o.z-Kt;Math.abs($)>1&&(Kt=o.z-Math.sign($)*1);const a0=c.x;c.x=gt+vt[0],c.y=u(Ce+vt[1],-X0+.15,X0-.2),c.z=Math.max(Kt+vt[2],.1),c.z=Math.min(c.z,K0-.2);{const i0=c.x-o.x,T0=c.y-E0,l0=c.z-o.z,zt=Math.hypot(i0,T0,l0),wt=h==="Long lens"?1:G?W(.22,.72,Yt):.72;if(zt<wt){const bt=wt/Math.max(zt,.05);c.x=o.x+i0*bt,c.y=u(E0+T0*bt,-X0+.1,X0-.1),c.z=Math.max(o.z+l0*bt,.08),gt+=c.x-gt-vt[0]}}const H=a/15,T=S0==="fly"?1:0,u0=G?1-Yt:0,F0=(b.xcg-b.L*.5)*Math.cos(o.th);kt+=(o.x+W(-.07,F0,u0)+o.vx*H*T*(1-u0)-kt)*U,Pt+=(E0+rt*H*T*(1-u0)-Pt)*U,Ct+=(o.z-.08*(1-u0)+o.vz*H*T*(1-u0)-Ct)*U;{const i0=o.x-c.x,T0=E0-c.y,l0=o.z-c.z,zt=kt-c.x,wt=Pt-c.y,bt=Ct-c.z,Ut=Math.hypot(zt,wt,bt),Ht=Math.hypot(i0,T0,l0),xe=(i0*zt+T0*wt+l0*bt)/(Ut*Ht),ve=.14;if(xe<Math.cos(ve)){const Ne=Math.acos(u(xe,-1,1)),Zt=1-ve/Ne;kt+=(o.x-kt)*Zt,Pt+=(E0-Pt)*Zt,Ct+=(o.z-.1-Ct)*Zt}}let h0=kt-c.x,N=Pt-c.y,M=Ct-c.z;const g=Math.hypot(h0,N,M);h0/=g,N/=g,M/=g;let M0=N,y0=-h0,q0=0;const J0=Math.hypot(M0,y0);M0/=J0,y0/=J0,c.fx=h0,c.fy=N,c.fz=M,c.rx=M0,c.ry=y0,c.rz=q0,c.ux=y0*M-q0*N,c.uy=q0*h0-M0*M,c.uz=M0*N-y0*h0;const ft=(o.x-c.x)*h0+(E0-c.y)*N+(o.z-c.z)*M;c.focus=Math.max(ft,.3)}function mo(r,a,i){o.vx=r*Math.cos(a),o.vz=r*Math.sin(a),o.th=a+.05,o.q=0,o.f=1,nt=0,Ft=0,st=i||0,rt=0,S0="fly",Z0=0,Qe=0,ne=0,e.sound.hit("noise",u(.2+r*.05,0,.8),{dur:.3+r*.03,cutoff:500+r*170})}function Ga(r){const a=r*te;se+=a;const i=Math.min(Math.floor(se/Q0),200);if(se-=i*Q0,se>Q0*4&&(se=0),o.de+=u(Rt-o.de,-2.6*r,2.6*r),S0==="fly"||S0==="rest"){for(let T=0;T<i;T++)Oe(dt,o,It,K0);if(Vt<1e4){const T=Math.max(Math.cos(o.th)*dt.xn,-Math.cos(o.th)*dt.xt,.02),u0=o.x+T-(Vt-.01);u0>0&&(o.x-=u0,o.vx>.3&&S0==="fly"&&Qo(o.vx),o.vx>0&&(o.vx*=-.15))}mt+=i*Q0;const s=Math.max(o.V,.3),n=Math.sin(mt*.71+Xt)+.6*Math.sin(mt*1.73+ze)+.4*Math.sin(mt*3.1+Ge),v=1-o.f,R=u(-E0*.06-rt*.1,-.14,.14)+n*(.022+.3*v),A=2.2+s*.8,U=o.contact||o.z<.05,p0=b.h/Math.max(b.Y-b.h,.01)*(Xt>3.14?1:-1)*.9,b0=U?p0:R;Ft+=(A*A*(b0-nt)-2*.55*A*Ft)*a,U&&(Ft*=.8),nt+=Ft*a,nt=u(nt,-1.1,1.1);const $=Math.abs(o.vx)+.1;U?st+=(ze>3.14?1:-1)*Math.min(o.slide,2.5)*a*1.4:st+=(u(nt*.5,-.5,.5)-st)*Math.min(1,a*1.6),rt+=(Math.sign(o.vx)*$*Math.sin(st)-rt)*Math.min(1,a*5),U&&(rt*=.9),E0+=rt*a;const a0=X0-(b.Y-b.h)-.04;Math.abs(E0)>a0&&(S0==="fly"&&!U&&Math.abs(rt)>.25&&Qo(Math.abs(rt)),E0=Math.sign(E0)*a0,rt*=-.2,st*=-.3),Lt+=((o.V>.5&&!U?u((1-o.f)*.9+u((o.V-9)*.12,0,.7),0,1):0)-Lt)*Math.min(1,a*7),o.hit>0&&(o.hit>.25&&mt-Qe>.12&&(e.sound.hit("click",u(o.hit*.3,.05,.7)),e.sound.hit("noise",u(o.hit*.15,.02,.3),{dur:.1,cutoff:2600}),Qe=mt),o.hit=0),o.slide>.25&&mt-Le>.09&&(e.sound.hit("noise",u(o.slide*.09,.02,.22),{dur:.1,cutoff:3e3}),Le=mt),Lt>.25&&mt-Le>.07&&(e.sound.hit("noise",Lt*.12,{dur:.05,cutoff:3800}),Le=mt);const H=Wo();if(H&&!Uo&&!o.contact){const T=[0,2,4,7,9,12,14,16],u0=u(Math.floor(o.z/K0*8),0,7);e.sound.note(62+T[u0],{dur:1.6,vel:u(.1+o.V*.03,.08,.28),wave:"sine",pan:.2})}if(Uo=H,S0==="fly"&&o.contact&&Math.hypot(o.vx,o.vz)<.25&&Math.abs(o.q)<.5){if(ne+=r,ne>.35){S0="rest",Z0=0,o.vx=0,o.vz=0,o.q=0;const T=Math.round(o.th/6.2832);o.th-=T*6.2832}}else S0==="fly"&&(ne=0)}}function pt(r){Yo();const a=g0;Bt[11]=at,Bt[19]=r;const i=b.dih+u((o.n-1)*.02,-.05,.08),s=b.xcg;P[0]=o.x,P[1]=E0,P[2]=o.z,P[3]=r,P[4]=a.ex,P[5]=a.ey,P[6]=a.ez,P[7]=s,P[8]=a.yx,P[9]=a.yy,P[10]=a.yz,P[11]=b.L,P[12]=a.zx,P[13]=a.zy,P[14]=a.zz,P[15]=b.Y,P[16]=.07,P[17]=i,P[18]=b.h,P[19]=5e-4,P[20]=o.de,P[21]=Lt,P[22]=.5+u(o.n*.5,-.5,1.4),P[23]=Y0.xH,P[28]=k0,P[29]=D0,K[24]=Vt,K[25]=H0,K[26]=1e5,Ot[7]=I0*jo*(.06+.9*Va()*Math.exp(-o.z*.35)),P[24]=W0*a.ex+j0*a.ey+I0*a.ez,P[25]=W0*a.yx+j0*a.yy+I0*a.yz,P[26]=W0*a.zx+j0*a.zy+I0*a.zz,P[27]=w0.T,K[0]=c.x,K[1]=c.y,K[2]=c.z,K[3]=me,K[4]=c.rx,K[5]=c.ry,K[6]=c.rz,K[7]=1/c.focus,K[8]=c.ux,K[9]=c.uy,K[10]=c.uz,K[11]=Go,K[12]=c.fx,K[13]=c.fy,K[14]=c.fz,K[15]=At,K[16]=1/f0,K[17]=1/f0,K[18]=n0.tile,K[19]=(w.dust*(m0==="Dusty"?2.4:1)+w.hr*.9)*(x0?1.6:1),K[20]=n0.F0,K[21]=n0.gloss,K[22]=n0.rough,K[23]=r,t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindFramebuffer(t.FRAMEBUFFER,Vo),t.useProgram(Te.p),t.bindVertexArray(le),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,de),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,v0.nt),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,no),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Pe);let n=Te.u;t.uniform1i(n.uW,0),t.uniform1i(n.uN,1),t.uniform1i(n.uFl,2),t.uniform1i(n.uFm,3),t.uniform4fv(n.uA,Bt),t.uniform4fv(n.uC,K),t.uniform4fv(n.uT,P),t.uniform1i(n.uBranches,_o),t.uniform1i(n.uSteps,x0?12:8),Dt(f0,f0),L[0]=c.x,L[1]=c.y,L[2]=c.z,L[3]=me,L[4]=c.rx,L[5]=c.ry,L[6]=c.rz,L[7]=Math.max(c.focus-.45,.02),L[8]=c.ux,L[9]=c.uy,L[10]=c.uz,L[11]=c.focus+.6,L[12]=c.fx,L[13]=c.fy,L[14]=c.fz,L[15]=1,L[16]=0,L[17]=0,L[18]=1,L[19]=1;const v=n0.gloss*.13*Math.exp(-o.z*.8);L[20]=v,L[21]=At,n=ot.u,t.useProgram(ot.p),t.bindVertexArray(Y0.vao),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Pe),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,so),t.uniform1i(n.uW,0),t.uniform1i(n.uN,1),t.uniform1i(n.uFm,2),t.uniform1i(n.uSm,3),t.uniform4fv(n.uA,Bt),t.uniform4fv(n.uT,P),t.uniform4fv(n.uK,Ot),t.uniform1i(n.uBranches,_o),v>.01&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.colorMask(!0,!0,!0,!1),t.uniform4fv(n.uV,L),L[7]=.02,L[11]=60,t.uniform4fv(n.uV,L),t.viewport(0,0,f0,f0),t.drawArrays(t.TRIANGLES,0,Y0.count),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)),jt.length&&Ya(r);const R=Math.hypot(o.vx,o.vz),A=c.x-(pt.px===void 0?c.x:pt.px),U=c.z-(pt.pz===void 0?c.z:pt.pz);pt.px=c.x,pt.pz=c.z;const p0=.5*.5/(4.5*me);Ue=(A*c.rx+U*c.rz)*p0*-1,He=(A*c.ux+U*c.uz)*p0*-1;const b0=Math.hypot(Ue,He);b0>.1&&(Ue*=.1/b0,He*=.1/b0),n=P0.gather,t.useProgram(N0.gather),t.bindVertexArray(le),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,to),t.uniform1i(n.uS,0),t.bindFramebuffer(t.FRAMEBUFFER,_a),V0[0]=1/f0,V0[1]=1/f0,V0[2]=Ue,V0[3]=He,V0[4]=1,V0[5]=20,V0[6]=At?.125:1,t.uniform4fv(n.uG,V0),t.uniform1i(n.uN2,20),Dt(f0,f0),t.bindFramebuffer(t.FRAMEBUFFER,Ba),t.bindTexture(t.TEXTURE_2D,No),V0[2]=0,V0[3]=0,V0[4]=.3,V0[5]=7,t.uniform4fv(n.uG,V0),t.uniform1i(n.uN2,7),Dt(f0,f0),n=ae.u,t.useProgram(ae.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,de),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,v0.nt),t.uniform1i(n.uW,0),t.uniform1i(n.uN,1),t.uniform4fv(n.uA,Bt),t.uniform4fv(n.uC,K),t.uniform4f(n.uM,f0,(m0==="Dusty"?.16:.08)*(B==="Moonlit"?.5:1),0,0),At||(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.colorMask(!0,!0,!0,!1),t.viewport(0,0,f0,f0),t.drawArrays(t.POINTS,0,m0==="Dusty"?220:120),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0));let $=1e9,a0=-1e9,H=1e9,T=-1e9,u0=1e9,F0=-1e9;const h0=[[s,0,0],[s-b.L,b.Y-b.h,(b.Y-b.h)*Math.sin(i)+.05],[s-b.L,-(b.Y-b.h),(b.Y-b.h)*Math.sin(i)+.05],[s-b.L,0,-b.h],[s-b.L*.6,b.Y-b.h,(b.Y-b.h)*Math.sin(i)],[s-b.L*.6,-(b.Y-b.h),(b.Y-b.h)*Math.sin(i)]];for(let T0=0;T0<h0.length;T0++){Na(h0[T0][0],h0[T0][1],h0[T0][2],Ko),Xa(Ko,Wt[T0]);const l0=Wt[T0];l0[2]>.02&&(l0[0]<$&&($=l0[0]),l0[0]>a0&&(a0=l0[0]),l0[1]<H&&(H=l0[1]),l0[1]>T&&(T=l0[1])),l0[2]<u0&&(u0=l0[2]),l0[2]>F0&&(F0=l0[2])}const N=.05+.2*Math.max(a0-$,T-H);$-=N,a0+=N,H-=N,T+=N,$=Math.max($,-1.1),H=Math.max(H,-1.1),a0=Math.min(a0,1.1),T=Math.min(T,1.1);const M=a0>$&&T>H,g=($+a0)*.5,M0=(H+T)*.5,y0=Math.max((a0-$)*.5,.02),q0=Math.max((T-H)*.5,.02);t.bindFramebuffer(t.FRAMEBUFFER,ka),t.viewport(0,0,Mt,Mt),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),M&&(L[7]=Math.max(u0-.1,.01),L[11]=F0+.1,L[15]=0,L[16]=g,L[17]=M0,L[18]=y0,L[19]=q0,L[20]=1,L[21]=At,n=ot.u,t.useProgram(ot.p),t.bindVertexArray(Y0.vao),t.uniform4fv(n.uV,L),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.drawArrays(t.TRIANGLES,0,Y0.count),t.disable(t.DEPTH_TEST),t.bindVertexArray(le),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,_e),t.generateMipmap(t.TEXTURE_2D)),t.bindVertexArray(le),n=P0.down,t.useProgram(N0.down),t.bindFramebuffer(t.FRAMEBUFFER,qo),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Xo),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,_e),t.uniform1i(n.uS,0),t.uniform1i(n.uP,1),xt[0]=1/A0,xt[1]=1/A0,xt[2]=.75/A0,xt[3]=.75/A0,xt[4]=g,xt[5]=M0,xt[6]=y0,xt[7]=q0,xt[8]=At,t.uniform4fv(n.uD,xt),Dt(A0,A0),n=P0.blur,t.useProgram(N0.blur),t.activeTexture(t.TEXTURE0),t.uniform1i(n.uS,0),t.bindFramebuffer(t.FRAMEBUFFER,Pa),t.bindTexture(t.TEXTURE_2D,eo),t.uniform4f(n.uB,1/A0,1/A0,1.6/A0,0),Dt(A0,A0),t.bindFramebuffer(t.FRAMEBUFFER,qo),t.bindTexture(t.TEXTURE_2D,Io),t.uniform4f(n.uB,1/A0,1/A0,0,1.6/A0),Dt(A0,A0),t.bindFramebuffer(t.FRAMEBUFFER,null),n=P0.comp,t.useProgram(N0.comp),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Xo),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,_e),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,eo),t.uniform1i(n.uS,0),t.uniform1i(n.uL,1),t.uniform1i(n.uBl,2);let J0=0,ft=0,i0=0;{const T0=1/c.focus,l0=pe=>(1/Math.max(pe[2],.05)-T0)*Go*Ha,zt=Wt[0],wt=Wt[3],bt=Wt[1],Ut=zt[0]*.5+.5,Ht=zt[1]*.5+.5,xe=wt[0]*.5+.5,ve=wt[1]*.5+.5,Ne=bt[0]*.5+.5,Zt=bt[1]*.5+.5,Jt=l0(zt),po=l0(wt),ra=l0(bt),bo=(xe-Ut)*(Zt-Ht)-(Ne-Ut)*(ve-Ht);if(Math.abs(bo)>1e-4?(J0=((po-Jt)*(Zt-Ht)-(ra-Jt)*(ve-Ht))/bo,ft=((xe-Ut)*(ra-Jt)-(Ne-Ut)*(po-Jt))/bo,i0=Jt-J0*Ut-ft*Ht):i0=.3*(Jt+po),J0=u(J0,-.1,.1),ft=u(ft,-.1,.1),i0=u(i0,-.1,.1),G){const pe=W(.3,1,Yt);J0*=pe,ft*=pe,i0*=pe}}R0[0]=1/p,R0[1]=1/p,R0[2]=w.exp*(h==="From under"?De:1)*Ua,R0[3]=0,R0[4]=g,R0[5]=M0,R0[6]=M?y0:1e-4,R0[7]=M?q0:1e-4,R0[8]=J0,R0[9]=ft,R0[10]=i0,R0[11]=.08,R0[12]=1/Mt,R0[13]=1/Mt,R0[14]=At,R0[15]=0,t.uniform4fv(n.uP,R0),t.viewport(0,0,p,p),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}const s0=new Float32Array(32),xo=new Float32Array(16),_0=new Float32Array(24),tr={};function Ya(r){const a=ot.u;_0.set(L),_0[7]=.05,_0[11]=80,_0[15]=0,_0[16]=0,_0[17]=0,_0[18]=1,_0[19]=1,_0[21]=At,s0.set(P),s0[3]=r,s0[17]=b.dih,s0[20]=je,s0[21]=0,s0[22]=.5,s0[29]=D0,xo.set(Ot),t.viewport(0,0,f0,f0),t.colorMask(!0,!0,!0,!1);const i=(s,n,v,R,A,U)=>{const p0=Math.cos(s.th),b0=Math.sin(s.th),$=Math.cos(s.yaw),a0=Math.sin(s.yaw),H=Math.cos(s.roll),T=Math.sin(s.roll),u0=-a0,F0=$,h0=-b0*$,N=-b0*a0,M=p0,g=[p0*$,p0*a0,b0,u0*H+h0*T,F0*H+N*T,M*T,-u0*T+h0*H,-F0*T+N*H,M*H];if(s0[24]=W0*g[0]+j0*g[1]+I0*g[2],s0[25]=W0*g[3]+j0*g[4]+I0*g[5],s0[26]=W0*g[6]+j0*g[7]+I0*g[8],R)for(let y0=0;y0<9;y0+=3){const q0=g[y0+2]/R;g[y0]=(g[y0]-n*q0)*U,g[y0+1]=(g[y0+1]-v*q0)*U,g[y0+2]*=.002}const M0=R?(s.z-A)/R:0;s0[0]=s.x-n*M0,s0[1]=s.y-v*M0,s0[2]=R?A:s.z,s0[4]=g[0],s0[5]=g[1],s0[6]=g[2],s0[8]=g[3],s0[9]=g[4],s0[10]=g[5],s0[12]=g[6],s0[13]=g[7],s0[14]=g[8],s0[28]=s.dent,t.uniform4fv(a.uT,s0)};t.enable(t.BLEND),t.blendFunc(t.ZERO,t.ONE_MINUS_SRC_ALPHA);for(const s of jt)_0[20]=.09,t.uniform4fv(a.uV,_0),i(s,0,0,1,.001,1.05),t.drawArrays(t.TRIANGLES,0,Y0.count),s.sun&&(_0[20]=.15,t.uniform4fv(a.uV,_0),i(s,W0,j0,I0,.001,1),t.drawArrays(t.TRIANGLES,0,Y0.count));t.disable(t.BLEND),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),_0[20]=1,t.uniform4fv(a.uV,_0);for(const s of jt)xo[7]=I0*jo*(.06+.9*s.sun),t.uniform4fv(a.uK,xo),i(s,0,0,0,0,1),t.drawArrays(t.TRIANGLES,0,Y0.count);t.disable(t.DEPTH_TEST),t.colorMask(!0,!0,!0,!0),t.uniform4fv(a.uT,P),t.uniform4fv(a.uK,Ot)}let Tt=!1,St=!1,ta=0,vo=0,ea=0;function oa(r){Rt=u(Rt+(r<.5?.12:-.12),-.26,.62),e.sound.hit("click",.35),e.sound.hit("noise",.12,{dur:.06,cutoff:3200})}function Ka(r){const a=e.input,i=a.taps();if(a.down&&!Tt&&(ta=a.x,vo=a.y,St=!1,ea=0),a.down){ea+=r;const s=a.x-ta,n=a.y-vo,v=Math.hypot(s,n);!St&&v>.04&&(St=!0,qt=0,S0="lift",Z0=0,Re=o.x+.2,Fe=Math.max(Math.min(3.6,K0-1.2),o.z),o.q=0,Da=1),St&&(ie=s,ce=n)}if(!a.down&&Tt){if(St){const s=ie,n=ce,v=Math.hypot(s,n),R=2.6+12.5*Math.pow(Math.min(v/.48,1),1.25),A=u(Math.atan2(n*1.35,Math.abs(s)+.1),-.65,1.25);mo(R,A,s>.02?tt?-.75:.75:0)}else oa(vo);St=!1,ie=0,ce=0}else!a.down&&!Tt&&i.length&&oa(i[i.length-1].y);Tt=a.down}const ct=y((x(2)^Math.imul(x(7),2246822507)^6515)>>>0);let aa=3+3.5*ct();function Wa(){const r=ct(),a=ct(),i=ct(),s=ct(),n=ct(),v=ct();Rt=u(je+(v-.5)*.09,-.26,.6),o.de=Rt;const R=Math.min(3.8,K0-1.1);o.x+=L0*(1.25+.5*ct()),k0=.12+.45*S,o.z=_==="Looper"?R:u(R-1.6*i,1.1,R),Y?(o.z=u(We+.3*(i-.5),.9,K0-.6),o.vx=0,o.vz=0,o.q=0,o.f=1,rt=0,S0="lift",Z0=0,ne=0,Re=o.x,Fe=o.z,qt=.8+.8*r):mo(re*(.84+.32*r),Je+(a-.4)*(_==="Looper"?.12:.18)),E0=(s-.5)*Math.max(X0-.9,.4),nt=(n-.5)*.36,Ft=(ct()-.5)*.8,st=(ct()-.5)*.16,uo=!1,pt.px=void 0,pt.pz=void 0,Vt<1e4&&(Vt=o.x+1.2+re*1.6),aa=2.6+5*ct(),Zo++,Jo()}function ja(r){if(Z0+=r,S0==="rest"&&(o.vx=0,o.vz=0,o.q=0,Z0>aa&&!Tt&&Wa()),S0==="lift"&&qt>0&&!Tt&&Z0>=qt&&(qt=0,mo(re*ee[ge][0],ee[ge][1])),S0==="lift"){const a=Tt&&St?u(Math.atan2(ce*1.35,Math.abs(ie)+.1),-.65,1.25):Je,i=Tt&&St?Math.min(Math.hypot(ie,ce)/.48,1):0,s=i*.42,n=Re-s*Math.cos(a)+.003*Math.sin(Z0*9.7+ze),v=Fe-s*Math.sin(a)+.01*Math.sin(Z0*2.1)+.004*Math.sin(Z0*13.3+Xt)+.002*Math.sin(Z0*23.1),R=Tt?8:2.8,A=1-Math.exp(-r*R);o.x+=(n-o.x)*A,o.z+=(v-o.z)*A,E0+=(0-E0)*A;let U=a+.05-o.th;U=Math.atan2(Math.sin(U),Math.cos(U)),o.th+=U*A,nt+=(.035*i*Math.sin(Z0*17.3+Ge)-nt)*A,st+=(0-st)*A,Ft=0,o.vx=0,o.vz=0,o.q=0,o.f=1,Lt+=(.3*i-Lt)*A,o.n=1,o.V=1}}$o(.2),Yo(),pt(0);let er=0;return(r,a)=>{const i=Math.min(a,.12);Ka(i),ja(i),Ga(i),h==="From under"&&(De+=((S0==="rest"||o.contact)&&!Wo()?1-De:.72-De)*(1-Math.exp(-i*2.5))),$o(i),pt(r)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
