// Paper Plane: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/197.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ao){Ao&&function(){"use strict";const qe=new WeakMap,lt=`
`,P0="#version 300 es"+lt+"precision highp float;"+lt+"precision highp int;"+lt+"precision highp sampler2D;"+lt,ht=P0+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Ve=`uniform sampler2D uW; uniform sampler2D uN; uniform vec4 uA[10];
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
`,Eo=`float stackAt(float px, float a, float lod){
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
`,fa=P0+Ve+`uniform sampler2D uFl; uniform sampler2D uFm; uniform vec4 uC[8]; uniform vec4 uT[8]; uniform int uBranches; uniform int uSteps;
out vec4 o;
`+Eo+`
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
}`,ua=P0+`uniform sampler2D uS; uniform vec4 uG[2]; uniform int uN2; out vec4 o;
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
}`,la=P0+`uniform sampler2D uS; uniform sampler2D uP; uniform vec4 uD[3]; out vec4 o;
vec3 pre(vec3 c){ if (uD[2].x > 0.5) c = c / max(vec3(1.0) - c, vec3(0.02)); float l = dot(c, vec3(0.3, 0.5, 0.2)); return c * smoothstep(1.6, 4.5, l); }
void main(){
  vec2 uv = gl_FragCoord.xy * uD[0].xy, e = uD[0].zw;
  vec3 c = pre(textureLod(uS, uv + e * vec2(-1.0, -1.0), 0.0).rgb) + pre(textureLod(uS, uv + e * vec2(1.0, -1.0), 0.0).rgb) + pre(textureLod(uS, uv + e * vec2(-1.0, 1.0), 0.0).rgb) + pre(textureLod(uS, uv + e, 0.0).rgb);
  vec2 lp = (uv * 2.0 - 1.0 - uD[1].xy) / uD[1].zw * 0.5 + 0.5;
  vec2 g = step(vec2(0.0), lp) * step(lp, vec2(1.0));
  vec3 pc = g.x * g.y * pre(textureLod(uP, lp, 1.0).rgb);
  o = vec4(c * 0.25 + pc * 1.2, 1.0);
}`,ha=P0+`uniform sampler2D uS; uniform vec4 uB; out vec4 o;
void main(){
  vec2 uv = gl_FragCoord.xy * uB.xy, d = uB.zw;
  vec3 c = textureLod(uS, uv, 0.0).rgb * 0.227;
  c += (textureLod(uS, uv + d * 1.385, 0.0).rgb + textureLod(uS, uv - d * 1.385, 0.0).rgb) * 0.316;
  c += (textureLod(uS, uv + d * 3.231, 0.0).rgb + textureLod(uS, uv - d * 3.231, 0.0).rgb) * 0.07;
  o = vec4(c, 1.0);
}`,da=P0+`uniform sampler2D uS; uniform sampler2D uL; uniform sampler2D uBl; uniform vec4 uP[4]; out vec4 o;
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
}`,Mo=P0+`layout(location=0) in vec4 aF; layout(location=1) in vec2 aS; layout(location=2) in vec4 aT;
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
}`,go=P0+Ve+`uniform sampler2D uFm; uniform sampler2D uSm; uniform vec4 uT[8]; uniform vec4 uV[6]; uniform vec4 uK[4]; uniform int uBranches;
in vec3 vW; in vec3 vN; in vec2 vF; in vec2 vS; in vec3 vSp; in vec4 vT; in vec3 vB;
out vec4 o;
`+Eo+`
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
}`,So=P0+Ve+`uniform vec4 uC[8]; uniform vec4 uM;
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
}`,Ro=P0+`in vec3 vC; in float vR; out vec4 o;
void main(){ vec2 d = gl_PointCoord * 2.0 - 1.0; float r = dot(d, d); float a = smoothstep(1.0, 0.25, r); o = vec4(vC * a, 0.0); }`,Te=P0+`out vec4 o; uniform vec4 uB0[4];
uint hu(uvec2 p){ uint x = p.x * 1597334677u ^ p.y * 3812015801u; x *= 1597334677u; x ^= x >> 16; x *= 1597334677u; return x; }
float h1(vec2 p){ return float(hu(uvec2(ivec2(p) + 8192)) >> 8) / 16777216.0; }
float vn(vec2 p, float per){ vec2 i = floor(p), f = p - i; f = f * f * (3.0 - 2.0 * f);
  float a = h1(mod(i, per)), b = h1(mod(i + vec2(1.0, 0.0), per)), c = h1(mod(i + vec2(0.0, 1.0), per)), d = h1(mod(i + vec2(1.0, 1.0), per));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); }
uniform int uZ;
float fbm(vec2 p, float per){ float s = 0.0, a = 0.5; for (int i = 0; i < 4 + uZ; i++) { s += a * vn(p + float(i) * 17.0, per); p *= 2.0; per *= 2.0; a *= 0.5; } return s / 0.9375; }
`,ma=Te+`void main(){ vec2 uv = gl_FragCoord.xy / 256.0;
  o = vec4(fbm(uv * 8.0, 8.0), fbm(uv * 8.0 + 31.0, 8.0), fbm(uv * 16.0 + 57.0, 16.0), fbm(uv * 32.0 + 91.0, 32.0)); }`,xa=Te+`void main(){
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
}`,va=Te+`void main(){
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
}`,pa=Te+`void main(){
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
}`,ba=P0+"layout(location=0) in vec2 aP; layout(location=1) in vec2 aA; out vec2 vA; void main(){ vA = aA; gl_Position = vec4(aP * 2.0 - 1.0, 0.0, 1.0); }",ya=P0+"in vec2 vA; uniform vec4 uC0; out vec4 o; void main(){ float d = 1.0 - abs(vA.x); o = uC0 * (uC0.a > 1.5 ? d * d * vA.y : 1.0); }",Fo=e=>va.replace("void main(){","#define KIND "+e+`
void main(){`),Lo="uniform sampler2D uW; uniform sampler2D uN; uniform vec4 uA[10];",oe=(e,t)=>t?e.replace(Lo,t+Lo):e,Do=(e,t)=>oe(fa,t).replace("out vec4 o;","#define PLC "+e+`
out vec4 o;`),Oe=(e,t,v)=>{const u=e.createProgram();return e.attachShader(u,t),e.attachShader(u,v),e.linkProgram(u),e.flush(),u},ae=(e,t,v)=>{const u=e.createShader(t);return e.shaderSource(u,v),e.compileShader(u),u};function Ge(e,t,v){if(!e.getProgramParameter(t,e.LINK_STATUS)){let d="";for(const E of e.getAttachedShaders(t))e.getShaderParameter(E,e.COMPILE_STATUS)||(d+=" "+e.getShaderInfoLog(E));throw new Error("197 "+v+": "+e.getProgramInfoLog(t)+d)}const u={},m=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let d=0;d<m;d++){const E=e.getActiveUniform(t,d);u[E.name.replace("[0]","")]=e.getUniformLocation(t,E.name)}const b=_o[v];if(b){e.useProgram(t);for(const d in b)u[d]&&e.uniform1i(u[d],b[d])}return{p:t,u}}const _o={hall:{uW:0,uN:1,uFl:2,uFm:3},paper:{uW:0,uN:1,uFm:2,uSm:3},mote:{uW:0,uN:1},gather:{uS:0},down:{uS:0,uP:1},blur:{uS:0},comp:{uS:0,uL:1,uBl:2}};function Ta(e,t,v,u){if(t.hal[v+u])return;const m=t.hal[v+u]={p:Oe(e,t.vsf,ae(e,e.FRAGMENT_SHADER,Do(v,u))),u:{}};t.wait.push(()=>{try{Object.assign(m.u,Ge(e,m.p,"hall").u)}catch(b){throw delete t.hal[v+u],b}})}function wa(e,t,v){if(t.pm[v])return;const u=Oe(e,ae(e,e.VERTEX_SHADER,Mo),ae(e,e.FRAGMENT_SHADER,oe(go,v))),m=Oe(e,ae(e,e.VERTEX_SHADER,oe(So,v)),ae(e,e.FRAGMENT_SHADER,Ro)),b=t.pm[v]={paper:{p:u,u:{}},mote:{p:m,u:{}}};t.wait.push(()=>{try{Object.assign(b.paper.u,Ge(e,u,"paper").u),Object.assign(b.mote.u,Ge(e,m,"mote").u)}catch(d){throw delete t.pm[v],d}})}function za(e,t,v){if(t.flo[v])return;const u=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(u,Fo(v)),e.compileShader(u);const m=e.createProgram();e.attachShader(m,t.vsf),e.attachShader(m,u),e.linkProgram(m),e.flush();const b=t.flo[v]={p:m,uB0:null};t.wait.push(()=>{if(!e.getProgramParameter(m,e.LINK_STATUS))throw delete t.flo[v],new Error("197 floor: "+e.getProgramInfoLog(m)+" "+e.getShaderInfoLog(u));b.uB0=e.getUniformLocation(m,"uB0[0]")})}function Aa(e,t){for(;t.wait.length;)t.wait.shift()()}function Ea(e,t,v,u,m){let b=qe.get(e);if(b)return za(e,b,t),Ta(e,b,v,u),wa(e,b,m),b;const d={hall:[ht,Do(v,u)],gather:[ht,ua],down:[ht,la],blur:[ht,ha],comp:[ht,da],paper:[Mo,oe(go,m)],mote:[oe(So,m),Ro],noise:[ht,ma],win:[ht,xa],floor:[ht,Fo(t)],sheet:[ht,pa],flat:[ba,ya]},E=(T,D)=>{const j=e.createShader(T);return e.shaderSource(j,D),e.compileShader(j),j},l={},k={};for(const T in d){const D=e.createProgram(),j=l[d[T][0]]||(l[d[T][0]]=E(e.VERTEX_SHADER,d[T][0]));e.attachShader(D,j),e.attachShader(D,E(e.FRAGMENT_SHADER,d[T][1])),e.linkProgram(D),e.flush(),k[T]=D}const W={};for(const T in k)W[T]={};const m0=e.createVertexArray(),r0=e.createTexture();return b={pr:k,U:W,vao:m0,nt:r0,meshes:{},vsf:l[ht],flo:{[t]:{p:k.floor,uB0:null}},hal:{[v+u]:{p:k.hall,u:W.hall}},pm:{[m]:{paper:{p:k.paper,u:W.paper},mote:{p:k.mote,u:W.mote}}},wait:[]},qe.set(e,b),b.wait.push(()=>{try{for(const D in k){if(!e.getProgramParameter(k[D],e.LINK_STATUS)){let t0="";for(const h of e.getAttachedShaders(k[D]))e.getShaderParameter(h,e.COMPILE_STATUS)||(t0+=" "+e.getShaderInfoLog(h));throw new Error("197 "+D+": "+e.getProgramInfoLog(k[D])+t0)}const j=W[D],_0=e.getProgramParameter(k[D],e.ACTIVE_UNIFORMS);for(let t0=0;t0<_0;t0++){const h=e.getActiveUniform(k[D],t0),f=h.name.replace("[0]","");j[f]=e.getUniformLocation(k[D],h.name)}const n0=_o[D];if(n0){e.useProgram(k[D]);for(const t0 in n0)j[t0]&&e.uniform1i(j[t0],n0[t0])}}}catch(D){throw qe.delete(e),D}b.flo[t].uB0=W.floor.uB0,e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r0),e.texStorage2D(e.TEXTURE_2D,5,e.RGBA8,256,256);const T=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,T),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r0,0),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.viewport(0,0,256,256),e.useProgram(k.noise),e.bindVertexArray(m0),e.drawArrays(e.TRIANGLES,0,3),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.bindFramebuffer(e.FRAMEBUFFER,null)}),b}const Bo=.297,ko=.21;function Ma(e){const t=e==="Dart"||e==="Blunt delta",v=t?Bo:ko,u=t?ko/2:Bo/2;let m=[{p:[[0,0,0,0],[0,u,0,u],[v,u,v,u],[v,0,v,0]],l:0}];const b=[],d=(z,M,q,e0)=>{const o0=q-z,f0=e0-M,Q=Math.hypot(o0,f0),G=o0/Q,tt=f0/Q,Et=U=>(U[0]-z)*-tt+(U[1]-M)*G,x0=U=>{const B0=U[0]-z,U0=U[1]-M,Y=B0*G+U0*tt;return[z+(2*Y*G-B0),M+(2*Y*tt-U0),U[2],U[3]]};let C0=0;for(const U of m)U.l>C0&&(C0=U.l);const O0=[];for(const U of m){const B0=[],U0=[],Y=[];for(let k0=0;k0<U.p.length;k0++){const L0=U.p[k0],T0=U.p[(k0+1)%U.p.length],A=Et(L0),s0=Et(T0);if(A>1e-7?B0.push(L0):A<-1e-7?U0.push(L0):(B0.push(L0),U0.push(L0),Y.push(L0)),A>1e-7&&s0<-1e-7||A<-1e-7&&s0>1e-7){const dt=A/(A-s0),G0=[0,1,2,3].map(ot=>L0[ot]+(T0[ot]-L0[ot])*dt);B0.push(G0),U0.push(G0),Y.push(G0)}}Y.length>=2&&b.push([Y[0][2],Y[0][3],Y[1][2],Y[1][3]]),B0.length>=3&&O0.push({p:B0.map(x0).reverse(),l:2*C0+1-U.l}),U0.length>=3&&O0.push({p:U0,l:U.l})}const et=[...new Set(O0.map(U=>U.l))].sort((U,B0)=>U-B0);for(const U of O0)U.l=et.indexOf(U.l);m=O0};let E=.026,l=.2,k=1;e==="Dart"?(d(0,0,u,u),d(0,0,u/Math.tan(Math.PI/8),u),E=.03,l=.2,k=1.6):e==="Blunt delta"?(d(0,0,u,u),d(.07,0,.07,u),d(.07,.04,.2,u),E=.024,l=.17,k=1.1):e==="Long wing"?(d(.05,0,.05,u),d(.082,0,.082,u),d(.082,u-.05,.082+.05/Math.tan(.75),u),E=.017,l=.13,k=.45):(d(.03,0,.03,u),d(.054,0,.054,u),d(.078,0,.078,u),d(.102,0,.102,u),E=.012,l=.1,k=.3);let W=1e9,m0=-1e9,r0=0;for(const z of m)for(const M of z.p)M[0]<W&&(W=M[0]),M[0]>m0&&(m0=M[0]),M[1]>r0&&(r0=M[1]);for(const z of m)for(const M of z.p)M[0]-=W;m0-=W;let T=0,D=0,j=0;const _0=(z,M,q)=>{let e0=!1;for(let o0=0,f0=z.length-1;o0<z.length;f0=o0++){const Q=z[o0],G=z[f0];Q[1]>q!=G[1]>q&&M<(G[0]-Q[0])*(q-Q[1])/(G[1]-Q[1])+Q[0]&&(e0=!e0)}return e0},n0=44,t0=26,h=m0/n0,f=r0/t0;let x=0,P=0,O=0;for(let z=0;z<t0;z++){const M=(z+.5)*f;let q=1e9,e0=-1e9,o0=0;for(let f0=0;f0<n0;f0++){const Q=(f0+.5)*h;let G=0;for(const tt of m)_0(tt.p,Q,M)&&G++;G&&(T+=G*h*f,D+=G*h*f*Q,j+=G*h*f*Q*Q,M>E&&(o0++,x+=h*f,P+=Q*h*f,Q<q&&(q=Q),Q>e0&&(e0=Q)))}if(o0){const f0=e0-q+h;O+=f0*f0*f}}T*=2,D*=2,j*=2,x*=2,P*=2,O*=2;const X=D/T,V=O/x,_=2*(r0-E),Z=_*_/x,J=j-T*X*X,F=P/x-.17*V;return{polys:m,creases:b,h:E,dih:l,kvx:k,L:m0,Y:r0,S:x,mac:V,b:_,AR:Z,xcg:X,xac:F,area:T,iyy:J,LS:v,WS:u,portrait:t,sheetArea:2*v*u}}const we=1.2,Ye=9.81,$0=1/400;function ga(e,t,v){const u=e.sheetArea*t*.001,m=e.S,b=e.mac,d=e.b,E=e.AR,l=2*Math.PI*E/(2+Math.sqrt(4+E*E)),k=E<2?.85:.78,W=we*Math.PI*.25*b*b*d*.9,m0=Math.min(.16,Math.max(.1,(e.xac-e.xcg)/b+.04));return{m:u,S:m,c:b,b:d,AR:E,CLa:l,k:1/(Math.PI*k*E),CD0:.024+.004*v,kv:e.kvx,as:(e.kvx>1.3?28:e.kvx>.9?22:15)*Math.PI/180,ds:4.5*Math.PI/180,SM:m0,Cm0:.012,Cmd:.34,tau:.3,Cmq:-3.2-3*(e.L/b-1),I:e.iyy*t*.001+we*Math.PI/128*b*b*b*b*d*2.2,ma:W,h:e.h,xn:e.xcg,xt:e.L-e.xcg}}const Po=()=>({x:0,z:0,vx:4,vz:0,th:0,q:0,f:1,de:0,a:0,V:4,n:1,contact:0,slide:0,hit:0}),Sa=(e,t,v)=>{const u=Math.max(0,Math.min(1,(v-e)/(t-e)));return u*u*(3-2*u)};function Ke(e,t,v,u){v(t.x,t.z);const m=t.vx-v.u,b=t.vz-v.w,d=Math.max(Math.hypot(m,b),.05),E=Math.atan2(b,m);let l=t.th-E;l=Math.atan2(Math.sin(l),Math.cos(l));const k=Math.abs(l),W=1-Sa(e.as-e.ds,e.as+e.ds,k),m0=(W<t.f?5:14)*e.c/Math.max(d,.6);t.f+=(W-t.f)*Math.min(1,$0/m0);const r0=t.f,T=Math.sin(l),D=Math.cos(l),j=t.de,_0=Math.max(t.z,.005)/e.b,n0=16*_0,t0=n0*n0/(1+n0*n0),h=l-e.tau*j,f=Math.sin(h),x=Math.cos(h),P=e.CLa*(1+.22*(1-t0))*f*x+e.kv*.55*T*Math.abs(T)*D,O=e.CD0+e.k*t0*P*P+.1*f*f,X=1.05*Math.sin(2*l),V=e.CD0+1.85*T*T,_=r0*P+(1-r0)*X,Z=r0*O+(1-r0)*V,J=.5*we*d*d*e.S,F=J*_,z=J*Z,M=-b/d,q=m/d,e0=-m/d,o0=-b/d,f0=F*M+z*e0,Q=F*q+z*o0-e.m*Ye,G=_*D+Z*T,tt=t.q*e.c/(2*d),Et=e.SM+(1-r0)*.2*Math.min(1,k/.6),x0=e.Cm0+e.Cmd*j*(.45+.55*r0)-Et*G+e.Cmq*tt,C0=J*e.c*x0,O0=Math.cos(t.th),et=Math.sin(t.th),U=f0*O0+Q*et,B0=-f0*et+Q*O0,U0=U/e.m,Y=B0/(e.m+e.ma);t.vx+=(U0*O0-Y*et)*$0,t.vz+=(U0*et+Y*O0)*$0,t.q+=C0/e.I*$0,t.q=Math.max(-40,Math.min(40,t.q)),t.x+=t.vx*$0,t.z+=t.vz*$0,t.th+=t.q*$0,t.V=d,t.a=l,t.n=F/(e.m*Ye),t.contact=0;const k0=Math.cos(t.th),L0=Math.sin(t.th);for(let T0=0;T0<2;T0++){const A=T0===0?e.xn:-e.xt,s0=k0>-.2?-e.h:.012,dt=k0*A-L0*s0,G0=L0*A+k0*s0,ot=t.z+G0;if(ot<0){const Y0=t.vz+t.q*dt,H0=t.vx-t.q*G0,at=1/e.m+dt*dt/e.I,Dt=1/e.m+G0*G0/e.I;if(Y0<0){const Mt=-(1+(Y0<-.6?.22:0))*Y0/at;t.vz+=Mt/e.m,t.q+=dt*Mt/e.I;const g0=.34*Mt,rt=Math.max(-g0,Math.min(g0,-H0/Dt));t.vx+=rt/e.m,t.q+=-G0*rt/e.I,Mt/e.m>.1&&(t.hit=Math.max(t.hit,Mt/e.m))}t.z-=ot,t.contact=1}const se=t.z+L0*A+.012;if(se>u){const Y0=k0*A,H0=t.vz+t.q*Y0;if(H0>0){const at=-1.25*H0/(1/e.m+Y0*Y0/e.I);t.vz+=at/e.m,t.q+=Y0*at/e.I,t.vx*=.8,t.hit=Math.max(t.hit,-at/e.m)}t.z-=se-u}}t.contact?(t.q*=.985,t.vx*=.9985,t.slide=Math.abs(t.vx)):t.slide=0}function Ra(e,t,v){const u=[],m=[],b=t.L-Math.min(.035,t.L*.2);for(let f=0;f<=t.L+1e-6;f+=.012)u.push(f);u.push(b-.003,b,b+.004,t.L+.001),u.sort((f,x)=>f-x);for(let f=0;f<=t.h;f+=t.h/3)m.push(f);for(let f=t.h;f<=t.Y+1e-6;f+=.012)m.push(f);m.push(t.h+.004),m.push(t.Y+.001),m.sort((f,x)=>f-x);const d=(f,x,P,O)=>{const X=[];for(let V=0;V<f.length;V++){const _=f[V],Z=f[(V+1)%f.length],J=_[x]-P,F=Z[x]-P,z=O?J>=0:J<=0,M=O?F>=0:F<=0;if(z&&X.push(_),z!==M){const q=J/(J-F),e0=[0,1,2,3].map(o0=>_[o0]+(Z[o0]-_[o0])*q);X.push(e0)}}return X};let E=16384,l=new Float32Array(E*10),k=0;const W=(f,x,P,O,X,V,_,Z,J)=>{if(k===E){E*=2;const z=new Float32Array(E*10);z.set(l),l=z}const F=k*10;l[F]=f,l[F+1]=x,l[F+2]=P,l[F+3]=0,l[F+4]=O,l[F+5]=X,l[F+6]=V,l[F+7]=_,l[F+8]=Z,l[F+9]=J,k++};for(const f of t.polys){const x=f.p[0];let P=1,O=0,X=0,V=1;for(let _=1;_+1<f.p.length;_++){const Z=f.p[_],J=f.p[_+1],F=Z[2]-x[2],z=Z[3]-x[3],M=J[2]-x[2],q=J[3]-x[3],e0=F*q-M*z;if(Math.abs(e0)>1e-7){const o0=Z[0]-x[0],f0=Z[1]-x[1],Q=J[0]-x[0],G=J[1]-x[1];P=(o0*q-Q*z)/e0,O=(f0*q-G*z)/e0,X=(Q*F-o0*M)/e0,V=(G*F-f0*M)/e0;break}}for(let _=0;_+1<u.length;_++){const Z=d(d(f.p,0,u[_],!0),0,u[_+1],!1);if(!(Z.length<3))for(let J=0;J+1<m.length;J++){const F=d(d(Z,1,m[J],!0),1,m[J+1],!1);if(!(F.length<3))for(let z=1;z+1<F.length;z++){const M=[F[0],F[z],F[z+1]];for(const q of M)W(q[0],q[1]+1e-5,f.l,q[2]/t.LS,.5+q[3]/t.WS*.5,P,O,X,V);for(const q of M)W(q[0],-(q[1]+1e-5),f.l,q[2]/t.LS,.5-q[3]/t.WS*.5,P,-O,-X,V)}}}}const m0=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m0),e.bufferData(e.ARRAY_BUFFER,l.subarray(0,k*10),e.STATIC_DRAW);const r0=e.createVertexArray();e.bindVertexArray(r0),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,40,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,40,16),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,40,24),e.bindVertexArray(null);const T=[];for(const f of t.polys)for(let x=1;x+1<f.p.length;x++)for(const P of[f.p[0],f.p[x],f.p[x+1]])T.push(P[0]/t.L,P[1]/t.Y,0,0);const D=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,D),e.bufferData(e.ARRAY_BUFFER,new Float32Array(T),e.STATIC_DRAW);const j=e.createVertexArray();e.bindVertexArray(j),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,16,8),e.bindVertexArray(null);const _0=[],n0=(f,x,P,O,X,V=1)=>{const _=P-f,Z=O-x,J=Math.hypot(_,Z)||1,F=-Z/J*X,z=_/J*X,M=(Q,G)=>[Q/t.LS,.5+G/t.WS*.5],q=M(f+F,x+z),e0=M(f-F,x-z),o0=M(P+F,O+z),f0=M(P-F,O-z);_0.push(q[0],q[1],1,V,e0[0],e0[1],-1,V,o0[0],o0[1],1,V,o0[0],o0[1],1,V,e0[0],e0[1],-1,V,f0[0],f0[1],-1,V)};for(const f of t.creases)n0(f[0],f[1],f[2],f[3],.0016),n0(f[0],-f[1],f[2],-f[3],.0016);n0(0,0,t.LS,0,.002);{let f=91;const x=()=>(f=f*16807%2147483647)/2147483647;for(let P=0;P<16;P++){const O=x()*t.LS,X=(x()*2-1)*t.WS,V=x()*6.283,_=.012+x()*.05;n0(O,X,O+Math.cos(V)*_,X+Math.sin(V)*_,.0012+x()*.001,.1+x()*.16)}}for(const f of t.polys){const x=[];for(let P=0;P<f.p.length;P++){const O=f.p[P],X=f.p[(P+1)%f.p.length],V=O[1]-t.h,_=X[1]-t.h;if(V>0!=_>0){const Z=V/(V-_);x.push([O[2]+(X[2]-O[2])*Z,O[3]+(X[3]-O[3])*Z])}}x.length===2&&(n0(x[0][0],x[0][1],x[1][0],x[1][1],.002),n0(x[0][0],-x[0][1],x[1][0],-x[1][1],.002))}const t0=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t0),e.bufferData(e.ARRAY_BUFFER,new Float32Array(_0),e.STATIC_DRAW);const h=e.createVertexArray();return e.bindVertexArray(h),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,16,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,2,e.FLOAT,!1,16,8),e.bindVertexArray(null),{vao:r0,count:k,xH:b,fv:j,fcount:T.length/4,cv:h,ccount:_0.length/4}}const Fa={"Copy white":{alb:[.86,.85,.82],T:.33,rs:.86,gsm:80,ink:[0,0,0],iw:0,k:0,stiff:1},"Cream laid":{alb:[.86,.8,.66],T:.34,rs:.86,gsm:90,ink:[0,0,0],iw:0,k:1,stiff:1.2},Graph:{alb:[.86,.87,.84],T:.33,rs:.86,gsm:80,ink:[.2,.42,.72],iw:.75,k:2,stiff:1},Kraft:{alb:[.5,.35,.21],T:.14,rs:.8,gsm:115,ink:[0,0,0],iw:0,k:0,stiff:1.6},Onionskin:{alb:[.88,.87,.8],T:.62,rs:.72,gsm:36,ink:[0,0,0],iw:0,k:0,stiff:.4},"Airmail blue":{alb:[.55,.68,.82],T:.55,rs:.76,gsm:45,ink:[0,0,0],iw:0,k:0,stiff:.5},"Stave paper":{alb:[.86,.81,.68],T:.33,rs:.86,gsm:80,ink:[.1,.08,.07],iw:.85,k:6,stiff:1}},La={"Late gold":{el:17,az:30,sun:[13,8.4,4],amb:[.62,.52,.42],bn:[.32,.2,.11],haze:[1.2,.8,.45],hr:.018,sh:[7.2,4.9,2.6],st:[2.6,3.3,4.4],tr:[.85,.82,.22],trA:.8,exp:.8,dust:.012,aur:1},Afternoon:{el:27,az:26,sun:[12,10,7.2],amb:[.7,.72,.72],bn:[.3,.25,.18],haze:[1.2,1.1,.95],hr:.012,sh:[6.2,6.2,5.8],st:[2.4,3.4,5],tr:[.42,.72,.2],trA:.8,exp:.72,dust:.007,aur:.5},"Last red":{el:9,az:34,sun:[14,5.6,1.7],amb:[.5,.3,.2],bn:[.32,.14,.06],haze:[1.2,.5,.26],hr:.024,sh:[8,3.4,1.4],st:[2.2,1.5,2],tr:[.3,.13,.06],trA:.9,exp:.95,dust:.016,aur:1.2},"Hazy morning":{el:19,az:24,sun:[13,10.5,7.2],amb:[.62,.58,.5],bn:[.3,.24,.16],haze:[1.5,1.3,.98],hr:.032,sh:[6,5.9,5.5],st:[4.8,5,5.2],tr:[1.4,1.55,1.25],trA:.5,exp:.72,dust:.03,aur:.8},Moonlit:{el:24,az:28,sun:[1.5,2,3.3],amb:[.05,.08,.15],bn:[.03,.04,.07],haze:[.05,.08,.15],hr:.02,sh:[.25,.4,.8],st:[.1,.17,.35],tr:[.01,.015,.03],trA:.8,exp:2.5,dust:.03,aur:.5}},Da={Limewash:[.78,.72,.6],"Sage distemper":[.42,.5,.38],Oxblood:[.36,.12,.09],"Soot-dark panel":[.12,.09,.07]},_a={"Oak boards":{k:0,a:[.44,.26,.13],b:[.2,.11,.05],F0:.05,gloss:.72,rough:1.5,tile:3},Terrazzo:{k:1,a:[.62,.58,.5],b:[.3,.3,.3],F0:.06,gloss:1.05,rough:.45,tile:3.2},"Limestone flags":{k:2,a:[.55,.5,.42],b:[.42,.37,.31],F0:.04,gloss:.55,rough:1.2,tile:3.6},"Chequer marble":{k:3,a:[.7,.68,.63],b:[.03,.03,.035],F0:.07,gloss:1.2,rough:.25,tile:2.4}},re=.82,Co=3,Ba=.36,ne=[null,[1.25,.08],[1.5,.12],[1.8,.16],[1,.04],[.85,0]],Uo=2.5;Ao.add({num:197,name:"Paper Plane",fam:"Worlds",recipe:"A paper plane in free flight, where the fold and how its flaps are bent decide whether it floats, stalls or loops. Most mints fly down a sunny hall, some down a corridor. Drag back and let go to throw it (further is harder, pull back to the right to throw it at the far wall), or tap the top or bottom half to bend the flaps up or down, even mid-flight.",interactive:"Drag back from anywhere and let go to throw: the farther the pull, the harder the throw; pull down to throw upward, pull back to the right to throw it into the picture at the far wall. Tap the top half of the picture to bend the elevons up, the bottom half to bend them down, even in flight.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,v=e.size,u=(e.hash||"0x0").slice(2).padEnd(64,"0"),m=r=>parseInt(u.slice(r*8,r*8+8),16)>>>0,b=r=>{let a=r>>>0;return()=>{a=a+1831565813|0;let s=Math.imul(a^a>>>15,1|a);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296}},d=b((m(0)^Math.imul(m(3),739982445)^6522)>>>0),E=(r,a)=>{let s=0;for(const p of a)s+=p;let n=d()*s,i=0;for(;n>=a[i]&&i<a.length-1;)n-=a[i++];return r[i]},l=(r,a,s)=>r<a?a:r>s?s:r,k=(r,a,s)=>{const n=l((s-r)/(a-r),0,1);return n*n*(3-2*n)},W=(r,a,s)=>r+(a-r)*s;let m0=E(["Dart","Blunt delta","Long wing","Spar wing"],[34,30,28,8]),r0=E(["Copy white","Cream laid","Graph","Kraft","Onionskin","Airmail blue","Stave paper"],[30,22,16,12,10,5,5]),T=E(["Floater","Porpoise","Stall-prone","Looper"],[44,28,18,10]),D=E(["Late gold","Afternoon","Last red","Hazy morning","Moonlit"],[44,20,20,10,6]),j=E(["Tall sash","Arched","Pointed","Stained quarries"],[44,30,18,8]),_0=E(["Oak boards","Terrazzo","Limestone flags","Chequer marble"],[40,26,24,10]),n0=E(["Limewash","Sage distemper","Oxblood","Soot-dark panel"],[44,28,18,10]),t0=E(["Still","Warm bars","Draught","Dusty"],[44,32,16,8]),h=E(["Alongside","Close behind","From under","Long lens"],[42,24,20,14]);const f=d(),x=d(),P=d(),O=d();T==="Looper"&&h==="From under"&&(h="Alongside");{const r=b((m(5)^Math.imul(m(6),2654435761)^6514)>>>0),a=r();a<.12?h="Down the hall":a<.22?h="From above":h==="Alongside"&&a<.48&&(h=a<.36?"Down the hall":"From above")}const X=b((m(1)^Math.imul(m(4),3266489909)^6516)>>>0),V=X(),_=X(),Z=X(),J=X(),F=X(),z=X();e.home&&(m0="Dart",r0="Cream laid",T="Floater",D="Late gold",j="Tall sash",_0="Oak boards",n0="Limewash",t0="Warm bars",h="Alongside");const M=b((m(3)^Math.imul(m(6),668265263)^6517)>>>0),q=M(),e0=M(),o0=M(),f0=M(),Q=M();!e.home&&(h==="Alongside"||h==="Close behind")&&o0<.2&&(h="The sheet");const G=h==="The sheet",tt=!e.home&&_>=.15&&_<.3&&h!=="From under"&&T!=="Looper",Et=!e.home&&h==="From above"&&f0<.18&&!tt,x0=!e.home&&h!=="From under"&&D!=="Moonlit"&&j!=="Stained quarries"&&q<Ba&&D!=="Last red"&&(r0!=="Kraft"||h==="The sheet")&&n0!=="Soot-dark panel"&&_0!=="Chequer marble"&&!Et&&!(tt&&h==="Down the hall"),C0=e0<.5?3:4,O0=r=>x0&&((Math.floor(r)%C0+C0)%C0!==0||r-Math.floor(r)<=.5);e.trait("Fold",m0),e.trait("Paper",r0),e.trait("Trim",T),e.trait("Hour",D),e.trait("Windows",x0?"Shutters closed":j),e.trait("Floor",_0),e.trait("Walls",n0),e.trait("Air",t0),e.trait("View",h);let et=!e.home&&V<.65&&h!=="From above"&&h!=="Down the hall"&&n0!=="Limewash",U=e.home?"mid":_<.15?"end":_<.3?"door":"mid";U==="end"&&!(h==="Close behind"||h==="Down the hall"||h==="Long lens")&&(U="mid");const B0=e.home||Z<.4?0:Z<.62?1:Z<.82?2:3,U0=J<.5?1:0,Y=tt;(Y||x0)&&h!=="From above"&&h!=="Down the hall"&&(et=!0),U==="door"&&(U="mid");let k0=.12+.45*F;const L0=.0025+.003*z,T0=Fa[r0],A=La[D],s0=_a[_0],dt=Da[n0],G0=U==="end"?1:0,ot=x0?"#define SHUT "+C0+".0"+lt+"#define SHK "+(j==="Tall sash"?0:1)+lt+"#define SHX 0.16"+lt+"#define SHS 0.34"+lt:"",se=ot+(x0?"#define SHB 1"+lt:"")+(Y?"#define CORR 1"+lt:""),Y0=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),H0=Y0?0:1,at=Y0?t.RGBA16F:t.RGBA8,Dt=Y0?t.HALF_FLOAT:t.UNSIGNED_BYTE,Mt=t.getExtension("EXT_texture_filter_anisotropic"),g0=Ea(t,s0.k,G0,se,ot),rt=g0.pr,gt=g0.U,Ho=g0.hal[G0+se],ie=g0.pm[ot].paper,No=g0.pm[ot].mote,We=d(),Ot=d()*6.283,ze=d()*6.283,je=d()*6.283,Io=g0.meshes[m0]||(g0.meshes[m0]=(()=>{const r=Ma(m0);return{F:r,M:Ra(t,r,m0)}})()),y=Io.F,K0=Io.M,mt=ga(y,T0.gsm,T0.stiff),er=y.L,or=y.Y,Ae=e.home;let N0=Ae?2.4:2+1.1*f,F0=Ae?3.5:3+1.3*x,Ee=F0*(Ae?.6:.5+.17*P),Me=Ae?5.9:4.9+1.6*O,W0=Me+.7,ge=.5,Ze=.34;Y&&(N0=1.05+.25*f,F0=2.3+.7*x,Ee=.85+.3*P,W0=2.5+.4*O,Me=W0-.38,ge=.62,Ze=.9);const Je=A.el*Math.PI/180,Xo=A.az*Math.PI/180,j0=Math.sin(Xo)*Math.cos(Je),Z0=Math.cos(Xo)*Math.cos(Je),I0=Math.sin(Je),ka=d()<.65?1:.3,Pa=D==="Hazy morning"?.1:.32,Gt=(r,a)=>{let s=0,n=0;if(t0==="Warm bars"&&a<5){const i=.5+.5*Math.cos((r-X0)/F0*6.283);n=.24*i*i*(1-a/5)}t0==="Draught"&&(s=-.5+.28*Math.sin(r*.31+Ot)+.2*Math.sin(r*.83+ze),n=.16*Math.sin(r*1.13+je)+.1*Math.sin(r*2.3+Ot)),Gt.u=s,Gt.w=n};let X0=0,ce=2,St=1e5,Se=2,Yt=0;const Re=r=>(mt.SM*r-mt.Cm0)/mt.Cmd,Qe=Re(T==="Floater"?.5:T==="Porpoise"?.42:T==="Stall-prone"?1.25:1.05),$e=r=>Math.sqrt(2*mt.m*Ye/(we*mt.S*r)),fe=T==="Floater"?1.2*$e(.5):T==="Porpoise"?2.2*$e(.42):T==="Stall-prone"?1.5*$e(1):10.5,to=T==="Floater"?.06:T==="Porpoise"?.14:T==="Stall-prone"?.1:.22;let _t=l(Qe,-.26,.6);const o=Po();o.de=_t;const Bt=g0.pre||(g0.pre=new Map),Fe=String(e.hash)+(e.home?" h":""),eo=Bt.get(Fe);if(eo)Bt.delete(Fe),Bt.set(Fe,eo),[o.x,o.z,o.vx,o.vz,o.th,o.q,o.f,X0,ce,St,Se,Yt]=eo;else{for(let r=0;r<2;r++){const a=(I,S)=>{Gt(I,S<900?S:S-1e3+ce),a.u=Gt.u,a.w=Gt.w};let s=0,n=null,i=1e9,p=-1e9,L=0,g=0,H=1,v0=4*re,p0=null,$=1e9;Y&&(v0=(4-Uo)*re);for(let I=Y?1:0;I<(Y?ne.length:1);I++){const S=Po(),R=I===0?[1,to]:ne[I];S.z=1e3,S.de=_t,S.vx=fe*R[0]*Math.cos(R[1]),S.vz=fe*R[0]*Math.sin(R[1]),S.th=R[1]+(I?.05:.04);const A0=T==="Looper"||I>0?0:1.2;for(let c0=0;c0<A0*400;c0++)Ke(mt,S,a,1e9);s=S.z,n={x:S.x,vx:S.vx,vz:S.vz,th:S.th,q:S.q,f:S.f},i=1e9,p=-1e9,L=0,g=0;for(let c0=0;c0<4.2*re*400;c0++){Ke(mt,S,a,1e9);const y0=S.z-s;c0/400<v0&&y0<i&&(i=y0),y0>p&&(p=y0),Math.abs(c0/400-v0)<1.5/400&&(L=y0,g=S.x)}if(!Y){H=l(Math.max(.78-L,.32-i),1,W0-.9-Math.max(p,0));break}const b0=Math.max(.85-L,.3-i),V0=W0-.3-Math.max(p,0),Q0=l(b0,.9,Math.max(V0,.9)),ut=(b0<=V0?0:10)+Math.abs(Q0+L-.85);ut<$&&($=ut,p0={z0:Q0,ci:I,z0a:s,st0:n,zMin:i,zMax:p,zAt:L,xAt:g})}Y&&({z0:H,ci:Yt,z0a:s,st0:n,zMin:i,zMax:p,zAt:L,xAt:g}=p0),o.x=n.x,o.z=H,o.vx=n.vx,o.vz=n.vz,o.th=n.th,o.q=n.q,o.f=n.f;const a0=H+L,N=N0/Z0,w=g+j0*N,l0=a0+I0*N;X0=w-F0*.55;const R0=j0/Z0*ge,d0=Ee*.5;x0?X0=w-F0*.5-(Math.max(-d0,-R0)+(d0-R0-Math.max(-d0,-R0))*(h==="From above"?.3:.5)):Y&&(X0=w-F0*.5+R0*.5),Se=g-n.x;for(let I=0;I<12;I++){const S=(w-X0)/F0;let A0=((Math.floor(S)*.7131+We)%1+1)%1;if(A0=(A0*A0*91.7+A0*13.1)%1,x0||A0<.58)break;X0-=F0}if(x0){const I=Math.floor((w-X0)/F0);X0+=(I%C0+C0)%C0*F0}ce=H,St=U==="end"?g+2.6:1e5}Bt.set(Fe,[o.x,o.z,o.vx,o.vz,o.th,o.q,o.f,X0,ce,St,Se,Yt]),Bt.size>16&&Bt.delete(Bt.keys().next().value)}let w0=0,nt=0,st=0,kt=0,it=0,M0="fly",J0=0,ue=0,xt=0,le=0,Le=0,De=2.8,ar=0,he=0,de=0,rr=null,Ca=0,Pt=0,qo=!1,oo=0,_e=0,Kt=0;Y&&(M0="lift",Le=o.x,De=o.z,Kt=Uo,o.th=ne[Yt][1]+.05);let Be=.72;Aa(t,g0);const ke=g0.vao,Tt=(r,a,s,n,i,p)=>{const L=t.createTexture();return t.bindTexture(t.TEXTURE_2D,L),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,p>1?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texStorage2D(t.TEXTURE_2D,p,s,r,a),L},me=(r,a,s,n)=>{const i=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,i),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),a){const p=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,p),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,s,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,p)}return i},u0=Math.max(180,Math.round(v*.72)),Rt=Math.min(768,Math.max(256,Math.round(v*1.15))),z0=Math.max(64,Math.round(v*.2)),ao=Tt(u0,u0,at,t.RGBA,Dt,1),Vo=Tt(u0,u0,at,t.RGBA,Dt,1),Oo=ao,ro=Tt(Rt,Rt,at,t.RGBA,Dt,4),no=Tt(z0,z0,at,t.RGBA,Dt,1),Go=Tt(z0,z0,at,t.RGBA,Dt,1),Yo=me(ao,Et,u0,u0),Ua=me(Vo),Ha=Yo,Na=me(ro,!0,Rt,Rt),Ko=me(no),Ia=me(Go);t.activeTexture(t.TEXTURE0);const Ct=(r,a)=>{t.viewport(0,0,r,a),t.drawArrays(t.TRIANGLES,0,3)},Wo=t.createFramebuffer(),so=(r,a,s,n,i,p)=>{t.bindFramebuffer(t.FRAMEBUFFER,Wo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(n),t.bindVertexArray(ke),i(),Ct(a,s)},Pe=r=>{t.bindTexture(t.TEXTURE_2D,r),t.generateMipmap(t.TEXTURE_2D)},io=256,co=512;t.activeTexture(t.TEXTURE0);const xe=Tt(io,co,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,5);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT);const Xa=j==="Tall sash"?0:j==="Arched"?1:j==="Pointed"?2:3;so(xe,io,co,rt.win,()=>{t.uniform4fv(gt.win.uB0,new Float32Array([Xa,Ee,Ze,Me,F0,W0,3,.62,1,1,1,1,1/io,1/co,0,0]))}),t.bindTexture(t.TEXTURE_2D,xe),Pe(xe);const Ut=v<400?512:1024,fo=Tt(Ut,Ut,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,Ut===1024?11:10);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),Mt&&t.texParameterf(t.TEXTURE_2D,Mt.TEXTURE_MAX_ANISOTROPY_EXT,8),so(fo,Ut,Ut,g0.flo[s0.k].p,()=>{t.uniform4fv(g0.flo[s0.k].uB0,new Float32Array([s0.k,0,0,0,s0.a[0],s0.a[1],s0.a[2],1,s0.b[0],s0.b[1],s0.b[2],1,1/Ut,1/Ut,0,0]))}),Pe(fo);const Ce=G?1024:256,Ue=Tt(Ce,Ce,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,G?9:7);t.bindFramebuffer(t.FRAMEBUFFER,Wo),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ue,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.disable(t.DEPTH_TEST),t.useProgram(rt.flat),t.bindVertexArray(K0.fv),t.uniform4f(gt.flat.uC0,1/8,1/8,1/8,1/8),t.viewport(0,0,Ce,Ce),t.drawArrays(t.TRIANGLES,0,K0.fcount),t.disable(t.BLEND),Pe(Ue);const ct=v<400?512:1024,uo=Tt(ct,ct,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,ct===1024?6:5);so(uo,ct,ct,rt.sheet,()=>{t.uniform4fv(gt.sheet.uB0,new Float32Array([T0.k,0,0,0,y.LS,y.WS*2,We*40,0,0,0,0,0,1/ct,1/ct,0,0]))}),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.useProgram(rt.flat),t.bindVertexArray(K0.cv),t.colorMask(!0,!1,!1,!1),t.uniform4f(gt.flat.uC0,.4,0,0,2),t.viewport(0,0,ct,ct),t.drawArrays(t.TRIANGLES,0,K0.ccount),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND),Pe(uo),t.bindFramebuffer(t.FRAMEBUFFER,null);const lo=x0?.08:1,ho=x0?.25:1,mo=x0?.15:1,qa=x0?{"Late gold":.52,Afternoon:.4,"Hazy morning":.27}[D]*(h==="The sheet"?1.45:h==="From above"?.85:1)*(Y?2:1):1,Ht=new Float32Array(40),C=new Float32Array(32),K=new Float32Array(32),B=new Float32Array(24),Wt=new Float32Array(16),q0=new Float32Array(8),vt=new Float32Array(12),S0=new Float32Array(16);Ht.set([N0,W0,F0,ge,j0,Z0,I0,Pa,A.sun[0],A.sun[1],A.sun[2],0,A.amb[0]*lo,A.amb[1]*lo,A.amb[2]*lo,x0?0:.75*ka,A.bn[0]*ho,A.bn[1]*ho,A.bn[2]*ho,0,A.haze[0]*mo,A.haze[1]*mo,A.haze[2]*mo,A.hr,dt[0],dt[1],dt[2],We,A.sh[0],A.sh[1],A.sh[2],0,A.st[0],A.st[1],A.st[2],A.aur,A.tr[0],A.tr[1],A.tr[2],A.trA]),Ht[31]=B0,Wt.set([T0.alb[0],T0.alb[1],T0.alb[2],1,T0.T,T0.rs,.85,0,T0.ink[0],T0.ink[1],T0.ink[2],T0.iw,1.2/ct,1.2/ct,0,0]),h==="The sheet"&&(Wt[15]=90);const jt={Alongside:[-.5,-.54,.1,20],"Close behind":[-.62,-.36,.34,22],"From under":[-.4,-.5,-.2,21],"Long lens":[-.85,-.98,.38,11.5],"Down the hall":[-1.25,-.8,.3,20],"From above":[-.45,-.3,1,24],"The sheet":[-.3,-.17,.17,24]}[h],ve=Math.tan(jt[3]*Math.PI/180),jo=h==="Long lens"?.02:.011,Va=h==="Long lens"?.2:.34,pt=et?[jt[0],-jt[1]*.95,jt[2],jt[3]]:jt.slice();if(Y&&(h==="Down the hall"||h==="Close behind"||h==="Long lens")&&(pt[1]*=.45),Y&&h==="Close behind"&&(pt[2]=.14),x0&&!Y&&h==="From above")for(let r=0;r<3;r++)pt[r]*=1.5;let Zt=0;const c={x:0,y:0,z:0,fx:1,fy:0,fz:0,rx:0,ry:0,rz:0,ux:0,uy:0,uz:1,focus:1};let Ft=0,He=0,Jt=0,Nt=0,It=0,Xt=0,xo=!1,Ne=0,Ie=0;const E0={},Zo=()=>{const r=Math.cos(o.th),a=Math.sin(o.th),s=Math.cos(it),n=Math.sin(it),i=Math.cos(st),p=Math.sin(st),L=r*s,g=r*n,H=a,v0=-n,p0=s,$=0,a0=-a*s,N=-a*n,w=r;E0.ex=L,E0.ey=g,E0.ez=H,E0.yx=v0*i+a0*p,E0.yy=p0*i+N*p,E0.yz=$*i+w*p,E0.zx=-v0*p+a0*i,E0.zy=-p0*p+N*i,E0.zz=-$*p+w*i},Oa=(r,a,s,n)=>(n[0]=o.x+E0.ex*r+E0.yx*a+E0.zx*s,n[1]=w0+E0.ey*r+E0.yy*a+E0.zy*s,n[2]=o.z+E0.ez*r+E0.yz*a+E0.zz*s,n),Jo=[0,0,0],Qt=[],Ga=(r,a)=>{const s=r[0]-c.x,n=r[1]-c.y,i=r[2]-c.z,p=s*c.fx+n*c.fy+i*c.fz;return a[0]=(s*c.rx+n*c.ry+i*c.rz)/(p*ve),a[1]=(s*c.ux+n*c.uy+i*c.uz)/(p*ve),a[2]=p,a};for(let r=0;r<8;r++)Qt.push([0,0,0]);const Ya=x0||Y,vo=(r,a)=>{const s=(r-X0)/F0,n=s-Math.floor(s);return Math.abs(n-.5)*F0<Ee*.5&&a>Ze&&a<Me},po=(r,a,s)=>{const n=(N0-a)/Z0,i=r+j0*n,p=s+I0*n;if(!Ya)return vo(i,p);const L=ge/Z0,g=i+j0*L,H=p+I0*L;return vo(i,p)&&vo(g,H)&&!O0((g-X0)/F0)},Qo=()=>po(o.x,w0,o.z),$o=(()=>{const r=s0.a,a=s0.b,s=n=>r[n]*.6+a[n]*.4;return s(0)*.3+s(1)*.5+s(2)*.2})(),Ka=()=>{let r=0;for(let a=-1;a<=1;a++)po(o.x,w0+a*.12,0)&&(r+=1/3);return r},$t=[],Wa=(m(4)^Math.imul(m(5),374761393)^6518)>>>0;let ta=0;const ja=(r,a)=>po(r,a,0)?1:0;function ea(){if($t.length=0,!Et)return;const r=b(Wa+Math.imul(ta+1,2654435761)>>>0),a=4+Math.floor(r()*6),s=o.x+Se,n=y.h/Math.max(y.Y-y.h,.01)*.9,i=r()*6.283,p=Math.floor(r()*a),L=h==="Down the hall"?2+Math.floor(r()*2):0,g=h==="From above"?[-.6,1]:[-.4,1.9],H=h==="From above"?.75:Math.min(1,N0-.45);let v0=0;for(let p0=0;p0<a;p0++){const $=i+p0*6.283/a+(r()-.5)*.35*6.283/a,a0=Math.sin($);let N=0,w=0,l0=!1;for(let I=0;I<8&&!l0;I++){N=s+W(g[0],g[1],r()),v0<L&&a0>.55?w=N0-.012-a0*y.xcg:w=(r()*2-1)*H,l0=!0;for(const S of $t)Math.hypot(S.x-N,S.y-w)<.34&&(l0=!1)}if(!l0)continue;const R0=Math.abs(w)>N0-.4;R0&&v0++;const d0=p0===p&&!R0;$t.push({x:N,y:w,z:d0?(y.Y-y.h)*Math.sin(y.dih)+.004:y.h,th:(r()-.5)*.06,yaw:$,roll:d0?Math.PI+(r()-.5)*.2:(r()<.5?1:-1)*n*(.8+.3*r()),dent:R0?.9+.4*r():.12+.5*r(),sun:ja(N,w)})}}ea();function oa(r){k0=Math.min(k0+.14+r*.08,1.3),o.vx*=.25,o.vz=Math.min(o.vz,0),o.f=.15,o.q+=(Ot>3.14?1:-1)*(2+r),e.sound.hit("click",l(.2+r*.08,.1,.7)),e.sound.hit("noise",l(.06+r*.03,.04,.3),{dur:.12,cutoff:2400})}function aa(r){const a=re;Zt+=((M0==="rest"||o.contact&&M0==="fly"?1:0)-Zt)*(1-Math.exp(-r*1.2));const s=G?16:6.5,n=G?a/s:.13*a,i=o.x+o.vx*n,p=w0,L=o.z+o.vz*(G?n:.1*a);if(xo||(Ft=i,He=p,Jt=L,Nt=o.x,It=w0,Xt=o.z,xo=!0),G){const c0=Zt;pt[0]=W(-.3,-.62,c0),pt[1]=W(-.17,-.36,c0)*(et?-.95:1),pt[2]=W(.17,.34,c0)}const g=1-Math.exp(-r*s),H=1-Math.exp(-r*15);Ft+=(i-Ft)*g,He+=(p-He)*g,Jt+=(L-Jt)*g;const v0=o.x-Ft;Math.abs(v0)>1.1&&(Ft=o.x-Math.sign(v0)*1.1);const $=o.z-Jt;Math.abs($)>1&&(Jt=o.z-Math.sign($)*1);const a0=c.x;c.x=Ft+pt[0],c.y=l(He+pt[1],-N0+.15,N0-.2),c.z=Math.max(Jt+pt[2],.1),c.z=Math.min(c.z,W0-.2);{const c0=c.x-o.x,y0=c.y-w0,h0=c.z-o.z,zt=Math.hypot(c0,y0,h0),At=h==="Long lens"?1:G?W(.22,.72,Zt):.72;if(zt<At){const yt=At/Math.max(zt,.05);c.x=o.x+c0*yt,c.y=l(w0+y0*yt,-N0+.1,N0-.1),c.z=Math.max(o.z+h0*yt,.08),Ft+=c.x-Ft-pt[0]}}const N=a/15,w=M0==="fly"?1:0,l0=G?1-Zt:0,R0=(y.xcg-y.L*.5)*Math.cos(o.th);Nt+=(o.x+W(-.07,R0,l0)+o.vx*N*w*(1-l0)-Nt)*H,It+=(w0+nt*N*w*(1-l0)-It)*H,Xt+=(o.z-.08*(1-l0)+o.vz*N*w*(1-l0)-Xt)*H;{const c0=o.x-c.x,y0=w0-c.y,h0=o.z-c.z,zt=Nt-c.x,At=It-c.y,yt=Xt-c.z,qt=Math.hypot(zt,At,yt),Vt=Math.hypot(c0,y0,h0),pe=(c0*zt+y0*At+h0*yt)/(qt*Vt),be=.14;if(pe<Math.cos(be)){const Xe=Math.acos(l(pe,-1,1)),te=1-be/Xe;Nt+=(o.x-Nt)*te,It+=(w0-It)*te,Xt+=(o.z-.1-Xt)*te}}let d0=Nt-c.x,I=It-c.y,S=Xt-c.z;const R=Math.hypot(d0,I,S);d0/=R,I/=R,S/=R;let A0=I,b0=-d0,V0=0;const Q0=Math.hypot(A0,b0);A0/=Q0,b0/=Q0,c.fx=d0,c.fy=I,c.fz=S,c.rx=A0,c.ry=b0,c.rz=V0,c.ux=b0*S-V0*I,c.uy=V0*d0-A0*S,c.uz=A0*I-b0*d0;const ut=(o.x-c.x)*d0+(w0-c.y)*I+(o.z-c.z)*S;c.focus=Math.max(ut,.3)}function bo(r,a,s){o.vx=r*Math.cos(a),o.vz=r*Math.sin(a),o.th=a+.05,o.q=0,o.f=1,st=0,kt=0,it=s||0,nt=0,M0="fly",J0=0,oo=0,ue=0,e.sound.hit("noise",l(.2+r*.05,0,.8),{dur:.3+r*.03,cutoff:500+r*170})}function Za(r){const a=r*re;le+=a;const s=Math.min(Math.floor(le/$0),200);if(le-=s*$0,le>$0*4&&(le=0),o.de+=l(_t-o.de,-2.6*r,2.6*r),M0==="fly"||M0==="rest"){for(let w=0;w<s;w++)Ke(mt,o,Gt,W0);if(St<1e4){const w=Math.max(Math.cos(o.th)*mt.xn,-Math.cos(o.th)*mt.xt,.02),l0=o.x+w-(St-.01);l0>0&&(o.x-=l0,o.vx>.3&&M0==="fly"&&oa(o.vx),o.vx>0&&(o.vx*=-.15))}xt+=s*$0;const n=Math.max(o.V,.3),i=Math.sin(xt*.71+Ot)+.6*Math.sin(xt*1.73+ze)+.4*Math.sin(xt*3.1+je),p=1-o.f,L=l(-w0*.06-nt*.1,-.14,.14)+i*(.022+.3*p),g=2.2+n*.8,H=o.contact||o.z<.05,v0=y.h/Math.max(y.Y-y.h,.01)*(Ot>3.14?1:-1)*.9,p0=H?v0:L;kt+=(g*g*(p0-st)-2*.55*g*kt)*a,H&&(kt*=.8),st+=kt*a,st=l(st,-1.1,1.1);const $=Math.abs(o.vx)+.1;H?it+=(ze>3.14?1:-1)*Math.min(o.slide,2.5)*a*1.4:it+=(l(st*.5,-.5,.5)-it)*Math.min(1,a*1.6),nt+=(Math.sign(o.vx)*$*Math.sin(it)-nt)*Math.min(1,a*5),H&&(nt*=.9),w0+=nt*a;const a0=N0-(y.Y-y.h)-.04;Math.abs(w0)>a0&&(M0==="fly"&&!H&&Math.abs(nt)>.25&&oa(Math.abs(nt)),w0=Math.sign(w0)*a0,nt*=-.2,it*=-.3),Pt+=((o.V>.5&&!H?l((1-o.f)*.9+l((o.V-9)*.12,0,.7),0,1):0)-Pt)*Math.min(1,a*7),o.hit>0&&(o.hit>.25&&xt-oo>.12&&(e.sound.hit("click",l(o.hit*.3,.05,.7)),e.sound.hit("noise",l(o.hit*.15,.02,.3),{dur:.1,cutoff:2600}),oo=xt),o.hit=0),o.slide>.25&&xt-_e>.09&&(e.sound.hit("noise",l(o.slide*.09,.02,.22),{dur:.1,cutoff:3e3}),_e=xt),Pt>.25&&xt-_e>.07&&(e.sound.hit("noise",Pt*.12,{dur:.05,cutoff:3800}),_e=xt);const N=Qo();if(N&&!qo&&!o.contact){const w=[0,2,4,7,9,12,14,16],l0=l(Math.floor(o.z/W0*8),0,7);e.sound.note(62+w[l0],{dur:1.6,vel:l(.1+o.V*.03,.08,.28),wave:"sine",pan:.2})}if(qo=N,M0==="fly"&&o.contact&&Math.hypot(o.vx,o.vz)<.25&&Math.abs(o.q)<.5){if(ue+=r,ue>.35){M0="rest",J0=0,o.vx=0,o.vz=0,o.q=0;const w=Math.round(o.th/6.2832);o.th-=w*6.2832}}else M0==="fly"&&(ue=0)}}function bt(r){Zo();const a=E0;Ht[11]=X0,Ht[19]=r;const s=y.dih+l((o.n-1)*.02,-.05,.08),n=y.xcg;C[0]=o.x,C[1]=w0,C[2]=o.z,C[3]=r,C[4]=a.ex,C[5]=a.ey,C[6]=a.ez,C[7]=n,C[8]=a.yx,C[9]=a.yy,C[10]=a.yz,C[11]=y.L,C[12]=a.zx,C[13]=a.zy,C[14]=a.zz,C[15]=y.Y,C[16]=.07,C[17]=s,C[18]=y.h,C[19]=5e-4,C[20]=o.de,C[21]=Pt,C[22]=.5+l(o.n*.5,-.5,1.4),C[23]=K0.xH,C[28]=k0,C[29]=L0,K[24]=St,K[25]=U0,K[26]=1e5,Wt[7]=I0*$o*(.06+.9*Ka()*Math.exp(-o.z*.35)),C[24]=j0*a.ex+Z0*a.ey+I0*a.ez,C[25]=j0*a.yx+Z0*a.yy+I0*a.yz,C[26]=j0*a.zx+Z0*a.zy+I0*a.zz,C[27]=T0.T,K[0]=c.x,K[1]=c.y,K[2]=c.z,K[3]=ve,K[4]=c.rx,K[5]=c.ry,K[6]=c.rz,K[7]=1/c.focus,K[8]=c.ux,K[9]=c.uy,K[10]=c.uz,K[11]=jo,K[12]=c.fx,K[13]=c.fy,K[14]=c.fz,K[15]=H0,K[16]=1/u0,K[17]=1/u0,K[18]=s0.tile,K[19]=(A.dust*(t0==="Dusty"?2.4:1)+A.hr*.9)*(x0?1.6:1),K[20]=s0.F0,K[21]=s0.gloss,K[22]=s0.rough,K[23]=r,t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindFramebuffer(t.FRAMEBUFFER,Yo),t.useProgram(Ho.p),t.bindVertexArray(ke),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,xe),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,g0.nt),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,fo),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Ue);let i=Ho.u;t.uniform4fv(i.uA,Ht),t.uniform4fv(i.uC,K),t.uniform4fv(i.uT,C),t.uniform1i(i.uBranches,Co),t.uniform1i(i.uSteps,x0?12:8),Ct(u0,u0),B[0]=c.x,B[1]=c.y,B[2]=c.z,B[3]=ve,B[4]=c.rx,B[5]=c.ry,B[6]=c.rz,B[7]=Math.max(c.focus-.45,.02),B[8]=c.ux,B[9]=c.uy,B[10]=c.uz,B[11]=c.focus+.6,B[12]=c.fx,B[13]=c.fy,B[14]=c.fz,B[15]=1,B[16]=0,B[17]=0,B[18]=1,B[19]=1;const p=s0.gloss*.13*Math.exp(-o.z*.8);B[20]=p,B[21]=H0,i=ie.u,t.useProgram(ie.p),t.bindVertexArray(K0.vao),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ue),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,uo),t.uniform4fv(i.uA,Ht),t.uniform4fv(i.uT,C),t.uniform4fv(i.uK,Wt),t.uniform1i(i.uBranches,Co),p>.01&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.colorMask(!0,!0,!0,!1),B[7]=.02,B[11]=60,t.uniform4fv(i.uV,B),t.viewport(0,0,u0,u0),t.drawArrays(t.TRIANGLES,0,K0.count),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0)),$t.length&&Ja(r);const L=Math.hypot(o.vx,o.vz),g=c.x-(bt.px===void 0?c.x:bt.px),H=c.z-(bt.pz===void 0?c.z:bt.pz);bt.px=c.x,bt.pz=c.z;const v0=.5*.5/(4.5*ve);Ne=(g*c.rx+H*c.rz)*v0*-1,Ie=(g*c.ux+H*c.uz)*v0*-1;const p0=Math.hypot(Ne,Ie);p0>.1&&(Ne*=.1/p0,Ie*=.1/p0),i=gt.gather,t.useProgram(rt.gather),t.bindVertexArray(ke),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ao),t.bindFramebuffer(t.FRAMEBUFFER,Ua),q0[0]=1/u0,q0[1]=1/u0,q0[2]=Ne,q0[3]=Ie,q0[4]=1,q0[5]=20,q0[6]=H0?.125:1,t.uniform4fv(i.uG,q0),t.uniform1i(i.uN2,20),Ct(u0,u0),t.bindFramebuffer(t.FRAMEBUFFER,Ha),t.bindTexture(t.TEXTURE_2D,Vo),q0[2]=0,q0[3]=0,q0[4]=.3,q0[5]=7,t.uniform4fv(i.uG,q0),t.uniform1i(i.uN2,7),Ct(u0,u0),i=No.u,t.useProgram(No.p),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,xe),t.uniform4fv(i.uA,Ht),t.uniform4fv(i.uC,K),t.uniform4f(i.uM,u0,(t0==="Dusty"?.16:.08)*(D==="Moonlit"?.5:1),0,0),H0||(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.colorMask(!0,!0,!0,!1),t.viewport(0,0,u0,u0),t.drawArrays(t.POINTS,0,t0==="Dusty"?220:120),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0));let $=1e9,a0=-1e9,N=1e9,w=-1e9,l0=1e9,R0=-1e9;const d0=[[n,0,0],[n-y.L,y.Y-y.h,(y.Y-y.h)*Math.sin(s)+.05],[n-y.L,-(y.Y-y.h),(y.Y-y.h)*Math.sin(s)+.05],[n-y.L,0,-y.h],[n-y.L*.6,y.Y-y.h,(y.Y-y.h)*Math.sin(s)],[n-y.L*.6,-(y.Y-y.h),(y.Y-y.h)*Math.sin(s)]];for(let y0=0;y0<d0.length;y0++){Oa(d0[y0][0],d0[y0][1],d0[y0][2],Jo),Ga(Jo,Qt[y0]);const h0=Qt[y0];h0[2]>.02&&(h0[0]<$&&($=h0[0]),h0[0]>a0&&(a0=h0[0]),h0[1]<N&&(N=h0[1]),h0[1]>w&&(w=h0[1])),h0[2]<l0&&(l0=h0[2]),h0[2]>R0&&(R0=h0[2])}const I=.05+.2*Math.max(a0-$,w-N);$-=I,a0+=I,N-=I,w+=I,$=Math.max($,-1.1),N=Math.max(N,-1.1),a0=Math.min(a0,1.1),w=Math.min(w,1.1);const S=a0>$&&w>N,R=($+a0)*.5,A0=(N+w)*.5,b0=Math.max((a0-$)*.5,.02),V0=Math.max((w-N)*.5,.02);t.bindFramebuffer(t.FRAMEBUFFER,Na),t.viewport(0,0,Rt,Rt),t.clearColor(0,0,0,0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),S&&(B[7]=Math.max(l0-.1,.01),B[11]=R0+.1,B[15]=0,B[16]=R,B[17]=A0,B[18]=b0,B[19]=V0,B[20]=1,B[21]=H0,i=ie.u,t.useProgram(ie.p),t.bindVertexArray(K0.vao),t.uniform4fv(i.uV,B),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.drawArrays(t.TRIANGLES,0,K0.count),t.disable(t.DEPTH_TEST),t.bindVertexArray(ke),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ro),t.generateMipmap(t.TEXTURE_2D)),i=gt.down,t.useProgram(rt.down),t.bindFramebuffer(t.FRAMEBUFFER,Ko),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Oo),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,ro),vt[0]=1/z0,vt[1]=1/z0,vt[2]=.75/z0,vt[3]=.75/z0,vt[4]=R,vt[5]=A0,vt[6]=b0,vt[7]=V0,vt[8]=H0,t.uniform4fv(i.uD,vt),Ct(z0,z0),i=gt.blur,t.useProgram(rt.blur),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,Ia),t.bindTexture(t.TEXTURE_2D,no),t.uniform4f(i.uB,1/z0,1/z0,1.6/z0,0),Ct(z0,z0),t.bindFramebuffer(t.FRAMEBUFFER,Ko),t.bindTexture(t.TEXTURE_2D,Go),t.uniform4f(i.uB,1/z0,1/z0,0,1.6/z0),Ct(z0,z0),t.bindFramebuffer(t.FRAMEBUFFER,null),i=gt.comp,t.useProgram(rt.comp),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Oo),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,no);let Q0=0,ut=0,c0=0;{const y0=1/c.focus,h0=ye=>(1/Math.max(ye[2],.05)-y0)*jo*Va,zt=Qt[0],At=Qt[3],yt=Qt[1],qt=zt[0]*.5+.5,Vt=zt[1]*.5+.5,pe=At[0]*.5+.5,be=At[1]*.5+.5,Xe=yt[0]*.5+.5,te=yt[1]*.5+.5,ee=h0(zt),wo=h0(At),ca=h0(yt),zo=(pe-qt)*(te-Vt)-(Xe-qt)*(be-Vt);if(Math.abs(zo)>1e-4?(Q0=((wo-ee)*(te-Vt)-(ca-ee)*(be-Vt))/zo,ut=((pe-qt)*(ca-ee)-(Xe-qt)*(wo-ee))/zo,c0=ee-Q0*qt-ut*Vt):c0=.3*(ee+wo),Q0=l(Q0,-.1,.1),ut=l(ut,-.1,.1),c0=l(c0,-.1,.1),G){const ye=W(.3,1,Zt);Q0*=ye,ut*=ye,c0*=ye}}S0[0]=1/v,S0[1]=1/v,S0[2]=A.exp*(h==="From under"?Be:1)*qa,S0[3]=0,S0[4]=R,S0[5]=A0,S0[6]=S?b0:1e-4,S0[7]=S?V0:1e-4,S0[8]=Q0,S0[9]=ut,S0[10]=c0,S0[11]=.08,S0[12]=1/Rt,S0[13]=1/Rt,S0[14]=H0,S0[15]=0,t.uniform4fv(i.uP,S0),t.viewport(0,0,v,v),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}const i0=new Float32Array(32),yo=new Float32Array(16),D0=new Float32Array(24),nr={};function Ja(r){const a=ie.u;D0.set(B),D0[7]=.05,D0[11]=80,D0[15]=0,D0[16]=0,D0[17]=0,D0[18]=1,D0[19]=1,D0[21]=H0,i0.set(C),i0[3]=r,i0[17]=y.dih,i0[20]=Qe,i0[21]=0,i0[22]=.5,i0[29]=L0,yo.set(Wt),t.viewport(0,0,u0,u0),t.colorMask(!0,!0,!0,!1);const s=(n,i,p,L,g,H)=>{const v0=Math.cos(n.th),p0=Math.sin(n.th),$=Math.cos(n.yaw),a0=Math.sin(n.yaw),N=Math.cos(n.roll),w=Math.sin(n.roll),l0=-a0,R0=$,d0=-p0*$,I=-p0*a0,S=v0,R=[v0*$,v0*a0,p0,l0*N+d0*w,R0*N+I*w,S*w,-l0*w+d0*N,-R0*w+I*N,S*N];if(i0[24]=j0*R[0]+Z0*R[1]+I0*R[2],i0[25]=j0*R[3]+Z0*R[4]+I0*R[5],i0[26]=j0*R[6]+Z0*R[7]+I0*R[8],L)for(let b0=0;b0<9;b0+=3){const V0=R[b0+2]/L;R[b0]=(R[b0]-i*V0)*H,R[b0+1]=(R[b0+1]-p*V0)*H,R[b0+2]*=.002}const A0=L?(n.z-g)/L:0;i0[0]=n.x-i*A0,i0[1]=n.y-p*A0,i0[2]=L?g:n.z,i0[4]=R[0],i0[5]=R[1],i0[6]=R[2],i0[8]=R[3],i0[9]=R[4],i0[10]=R[5],i0[12]=R[6],i0[13]=R[7],i0[14]=R[8],i0[28]=n.dent,t.uniform4fv(a.uT,i0)};t.enable(t.BLEND),t.blendFunc(t.ZERO,t.ONE_MINUS_SRC_ALPHA);for(const n of $t)D0[20]=.09,t.uniform4fv(a.uV,D0),s(n,0,0,1,.001,1.05),t.drawArrays(t.TRIANGLES,0,K0.count),n.sun&&(D0[20]=.15,t.uniform4fv(a.uV,D0),s(n,j0,Z0,I0,.001,1),t.drawArrays(t.TRIANGLES,0,K0.count));t.disable(t.BLEND),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),D0[20]=1,t.uniform4fv(a.uV,D0);for(const n of $t)yo[7]=I0*$o*(.06+.9*n.sun),t.uniform4fv(a.uK,yo),s(n,0,0,0,0,1),t.drawArrays(t.TRIANGLES,0,K0.count);t.disable(t.DEPTH_TEST),t.colorMask(!0,!0,!0,!0),t.uniform4fv(a.uT,C),t.uniform4fv(a.uK,Wt)}let wt=!1,Lt=!1,ra=0,To=0,na=0;function sa(r){_t=l(_t+(r<.5?.12:-.12),-.26,.62),e.sound.hit("click",.35),e.sound.hit("noise",.12,{dur:.06,cutoff:3200})}function Qa(r){const a=e.input,s=a.taps();if(a.down&&!wt&&(ra=a.x,To=a.y,Lt=!1,na=0),a.down){na+=r;const n=a.x-ra,i=a.y-To,p=Math.hypot(n,i);!Lt&&p>.04&&(Lt=!0,Kt=0,M0="lift",J0=0,Le=o.x+.2,De=Math.max(Math.min(3.6,W0-1.2),o.z),o.q=0,Ca=1),Lt&&(he=n,de=i)}if(!a.down&&wt){if(Lt){const n=he,i=de,p=Math.hypot(n,i),L=2.6+12.5*Math.pow(Math.min(p/.48,1),1.25),g=l(Math.atan2(i*1.35,Math.abs(n)+.1),-.65,1.25);bo(L,g,n>.02?et?-.75:.75:0)}else sa(To);Lt=!1,he=0,de=0}else!a.down&&!wt&&s.length&&sa(s[s.length-1].y);wt=a.down}const ft=b((m(2)^Math.imul(m(7),2246822507)^6515)>>>0);let ia=3+3.5*ft();function $a(){const r=ft(),a=ft(),s=ft(),n=ft(),i=ft(),p=ft();_t=l(Qe+(p-.5)*.09,-.26,.6),o.de=_t;const L=Math.min(3.8,W0-1.1);o.x+=F0*(1.25+.5*ft()),k0=.12+.45*F,o.z=T==="Looper"?L:l(L-1.6*s,1.1,L),Y?(o.z=l(ce+.3*(s-.5),.9,W0-.6),o.vx=0,o.vz=0,o.q=0,o.f=1,nt=0,M0="lift",J0=0,ue=0,Le=o.x,De=o.z,Kt=.8+.8*r):bo(fe*(.84+.32*r),to+(a-.4)*(T==="Looper"?.12:.18)),w0=(n-.5)*Math.max(N0-.9,.4),st=(i-.5)*.36,kt=(ft()-.5)*.8,it=(ft()-.5)*.16,xo=!1,bt.px=void 0,bt.pz=void 0,St<1e4&&(St=o.x+1.2+fe*1.6),ia=2.6+5*ft(),ta++,ea()}function tr(r){if(J0+=r,M0==="rest"&&(o.vx=0,o.vz=0,o.q=0,J0>ia&&!wt&&$a()),M0==="lift"&&Kt>0&&!wt&&J0>=Kt&&(Kt=0,bo(fe*ne[Yt][0],ne[Yt][1])),M0==="lift"){const a=wt&&Lt?l(Math.atan2(de*1.35,Math.abs(he)+.1),-.65,1.25):to,s=wt&&Lt?Math.min(Math.hypot(he,de)/.48,1):0,n=s*.42,i=Le-n*Math.cos(a)+.003*Math.sin(J0*9.7+ze),p=De-n*Math.sin(a)+.01*Math.sin(J0*2.1)+.004*Math.sin(J0*13.3+Ot)+.002*Math.sin(J0*23.1),L=wt?8:2.8,g=1-Math.exp(-r*L);o.x+=(i-o.x)*g,o.z+=(p-o.z)*g,w0+=(0-w0)*g;let H=a+.05-o.th;H=Math.atan2(Math.sin(H),Math.cos(H)),o.th+=H*g,st+=(.035*s*Math.sin(J0*17.3+je)-st)*g,it+=(0-it)*g,kt=0,o.vx=0,o.vz=0,o.q=0,o.f=1,Pt+=(.3*s-Pt)*g,o.n=1,o.V=1}}aa(.2),Zo(),bt(0);let sr=0;return(r,a)=>{const s=Math.min(a,.12);Qa(s),tr(s),Za(s),h==="From under"&&(Be+=((M0==="rest"||o.contact)&&!Qo()?1-Be:.72-Be)*(1-Math.exp(-s*2.5))),aa(s),bt(r)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
