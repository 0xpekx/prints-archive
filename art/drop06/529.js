// Hole-Punch Cloud: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/529.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ze){ze&&function(){"use strict";const Be={yaw:0,pitch:0,x:0,y:0,z:0},M=Math.PI*2,S=Math.PI/180,K=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,He=K+"void main() { vec2 p = vec2(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1.); gl_Position = vec4(p, 0., 1.); }",Oe=K+`
uniform vec4 uM;
uniform int uZ;   // never set (0): keeps the loops rolled, for a faster compile
out vec4 o;
float h21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec2 h22(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.xx + p3.yz) * p3.zy); }
float vn(vec2 x, float N) {
  vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f);
  float a = h21(mod(i, N)), b = h21(mod(i + vec2(1, 0), N)), c = h21(mod(i + vec2(0, 1), N)), d = h21(mod(i + vec2(1, 1), N));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 x, float N) { float s = 0., a = .5; for (int i = 0; i < 5 + uZ; i++) { s += a * vn(x, N); x *= 2.; N *= 2.; a *= .5; } return s / .97; }
vec3 wor(vec2 x, float N) {
  vec2 i = floor(x), f = fract(x); float F1 = 9., F2 = 9., id = 0.;
  for (int y = -1; y <= 1 + uZ; y++) for (int xx = -1; xx <= 1 + uZ; xx++) {
    vec2 g = vec2(xx, y), cell = mod(i + g, N), r = g + .12 + .76 * h22(cell) - f; float d = dot(r, r);
    if (d < F1) { F2 = F1; F1 = d; id = h21(cell + 7.1); } else if (d < F2) F2 = d;
  }
  return vec3(sqrt(F1), sqrt(F2), id);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uM.y;
  if (uM.x > 1.5) {
    o = vec4(fbm(uv * 4. + .3, 4.), fbm(uv * 4. + 5.1, 4.), fbm(uv * 4. + 9.7, 4.), fbm(uv * 4. + 13.3, 4.));
  } else if (uM.x < .5) {
    vec2 w = vec2(fbm(uv * 8. + .3, 8.), fbm(uv * 8. + 5.7, 8.)) - .5;
    // cloudlets: rounded domes of uneven size (two scales, radius per cell) that merge where they meet and leave gaps of
    // sky that vary; thickest in the middle with a soft frayed edge (a cell-scale cotton noise), never a cut crack
    vec3 a = wor(uv * 30. + w * 2.6, 30.), b2 = wor(uv * 52. + w * 3.6 + 11.3, 52.);
    float ra = .3 + .44 * a.z, rb = .28 + .28 * b2.z;
    float da = clamp(1. - a.x * a.x / (ra * ra), 0., 1.), db = clamp(1. - b2.x * b2.x / (rb * rb), 0., 1.) * (.35 + .4 * b2.z);
    float lump = 1. - (1. - da * (.8 + .2 * a.z)) * (1. - db);
    float ct = vn(uv * 72. + w * 4. + 2.3, 72.) * .6 + vn(uv * 150. + w * 5., 150.) * .4;
    lump = clamp(lump * (.62 + .62 * ct) * (.88 + .24 * fbm(uv * 144. + w * 3., 144.)) - .13, 0., 1.);
    vec3 b = wor(uv * 90. + w * 6., 90.);
    float fine = smoothstep(0., .45, b.y - b.x) * (.55 + .45 * b.z) * smoothstep(1., .2, b.x);
    o = vec4(lump, fine * .8 + .2 * fbm(uv * 32. + w, 32.), fbm(uv * 4., 4.), fbm(uv * 64. + w * 2., 64.));
  } else {
    vec2 s1 = vec2(0), s2 = vec2(0);
    for (int i = 0; i < 28 + uZ; i++) {
      float fi = float(i);
      vec2 r = h22(vec2(fi, 3.7)), r2 = h22(vec2(fi, 13.3));
      float an = (r.x - .5) * 2.4, k = 3. + fi * .9 + r.y * 4.;
      vec2 kv = floor(vec2(sin(an), cos(an)) * k + .5);
      s1 += kv / (dot(kv, kv) + 6.) * cos(6.2832 * dot(kv, uv) + h21(vec2(fi, 9.1)) * 6.2832);
      float an2 = (r2.x - .5) * 6.2832, k2 = 4. + fi * 1.3 + r2.y * 5.;
      vec2 kv2 = floor(vec2(sin(an2), cos(an2)) * k2 + .5);
      s2 += kv2 / (dot(kv2, kv2) + 6.) * cos(6.2832 * dot(kv2, uv) + h21(vec2(fi, 2.2)) * 6.2832);
    }
    o = vec4(s1 * .2 + .5, s2 * .2 + .5);
  }
}`,ie=`
uniform vec4 uP[19];
uniform int uZc;   // never set (0): the two cloudlet lookups run in one rolled loop (one call site, a faster compile)
uniform sampler2D uDk;
uniform sampler2D uH;
uniform sampler2D uW;
#define FW uP[0].xyz
#define TANH uP[0].w
#define RT uP[1].xyz
#define TIME uP[1].w
#define UPV uP[2].xyz
#define EYE uP[2].w
#define SUN uP[3].xyz
#define SUNTAN uP[3].w
#define SUNC uP[4].rgb
#define HB uP[5].x
#define TAU0 uP[5].y
#define CS uP[5].z
#define FINE uP[5].w
#define DOFF uP[6].xy
#define DEDGE uP[6].z
#define SHEARV uP[7].xy
#define UNDER uP[7].z
#define FALL uP[7].w
#define HALOK uP[9].w
#define CAMK uP[11].xy
#define SUNH uP[16].xy
#define VEIL uP[16].w
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hgp(float mu, float g) { return (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5); }
// randomly oriented ice: a narrow diffraction peak, a broad lobe, the 22 and 46 degree halos (red inside, sharp inner edge)
vec3 icePh(float mu) {
  float th = degrees(acos(clamp(mu, -1., 1.)));
  vec3 x = th - vec3(21.6, 22.0, 22.5), y = th - vec3(45.5, 46., 46.6);
  vec3 h = mix(exp(-x * x * 5.), exp(-x * .32), step(0., x)) + .3 * mix(exp(-y * y * 2.), exp(-y * .25), step(0., y));
  return vec3(5. * exp(-th * th / 30.) + hgp(mu, .4) * .8 + .12) + HALOK * h;
}
// the deck's holes: feathered capsule distance (1 at the rim), lobed and irregular, with radial ice fibres; fib = fibre strength
float holeD(vec2 p, float lod, out float fib) {
  float best = 9., ba = 0., bp = 0., br = 1., bs = 0.;
  int n = int(uP[6].w);
  for (int i = 0; i < 4; i++) {
    if (i >= n) break;
    vec4 A = texelFetch(uH, ivec2(0, i), 0), B = texelFetch(uH, ivec2(1, i), 0);
    vec2 v = p - A.xy;
    float a = dot(v, B.xy), pr = dot(v, vec2(-B.y, B.x));
    float ac = a - clamp(a, -A.w, A.w);
    float d = length(vec2(ac * .9, pr)) / max(A.z, 1e-3);
    if (d < best) { best = d; ba = a; bp = pr; br = A.z; bs = B.w; }
  }
  fib = 0.;
  if (best > 2.6) return best;
  float an = at2(vec2(bp, ba));
  float lob = textureLod(uDk, vec2(an * (1. / 6.2832) + bs * .37, bs * .21), 4.).b;
  float lob2 = textureLod(uDk, vec2(an * (3. / 6.2832) - bs * .53, bs * .43 + .5), 3.).b;
  best *= 1. + (lob - .5) * 1.1 + (lob2 - .5) * .45;
  float f1 = textureLod(uDk, vec2(an * (9. / 6.2832) + bs, best * 1.2 + bs * 3.1), lod).a;
  float f2 = textureLod(uDk, vec2(an * (23. / 6.2832) - bs, best * .6 + .5), lod).a;
  fib = f1 * .6 + f2 * .4;
  return best + (fib - .5) * .3;
}
// pixel footprint on the deck (km): gA along the view, gC across; gF the true along-view length (set per pixel in skyAll)
vec2 gA = vec2(0.), gC = vec2(0.); bool gAn = false; float gOV = 0., gF = 0., gM = 0.;
// cubic B-spline lookup from 4 bilinear taps (N texels per side at that mip): smooth contours instead of texel-grid kinks
vec4 bspl(sampler2D s, vec2 uv, float lod, float N) {
  vec2 x = uv * N - .5, i = floor(x), f = x - i, f2 = f * f, f3 = f2 * f;
  vec2 w0 = (1. - 3. * f + 3. * f2 - f3) / 6., w1 = (4. - 6. * f2 + 3. * f3) / 6., w2 = (1. + 3. * f + 3. * f2 - 3. * f3) / 6., w3 = f3 / 6.;
  vec2 g0 = w0 + w1, g1 = w2 + w3, c0 = (i - .5 + w1 / g0) / N, c1 = (i + 1.5 + w3 / g1) / N;
  return g0.y * (g0.x * textureLod(s, c0, lod) + g1.x * textureLod(s, vec2(c1.x, c0.y), lod))
       + g1.y * (g0.x * textureLod(s, vec2(c0.x, c1.y), lod) + g1.x * textureLod(s, c1, lod));
}
// the deck's large-scale weather (km): x cell size (big puffs / fine ripples), y thickness, z rows and billows, w lanes
// (mip never finer than the along-view footprint: toward the horizon a fixed mip aliased into blocky slabs)
vec4 deckW(vec2 p) {
  vec2 q = (p + DOFF * .3) * .019, ra = vec2(cos(uP[15].w), sin(uP[15].w)), pe = vec2(-ra.y, ra.x);
  float lw = max(1., log2(max(gF * 4.864, 1e-6)));
  vec4 w = textureLod(uW, q + vec2(.37, .71), lw);
  // grazing: the thickness/density cuts of this coarse field are squeezed 10-30x vertically there, where bilinear kinks
  // read as stair-stepped slabs; blend in a smooth B-spline sample (blended samples, so no seam where it starts)
  float bw = smoothstep(1., 2., gM);
  if (bw > 0.) w = mix(w, textureLod(uW, q + vec2(.37, .71), lw + 1.3), bw);
  w.xyz = .5 + (w.xyz - .5) * 1.6;
  vec2 dh = gF > 0. ? normalize(gA) : vec2(0.), dc = vec2(-dh.y, dh.x) * length(gC);
  dh *= gF;
  float fl = max(length(vec2(dot(dh, ra) * .05, dot(dh, pe) * .0045)), length(vec2(dot(dc, ra) * .05, dot(dc, pe) * .0045))) * 256.;
  w.w = textureLod(uW, vec2(dot(p, ra) * .05, dot(p, pe) * .0045) + vec2(.7, .2), max(0., log2(max(fl, 1e-6)))).a;
  return w;
}
// grazing deck: the along-view footprint (gA, km) is longer than the isotropic one (gC); where it is clearly longer the
// deck pattern is sampled with an anisotropic footprint (textureGrad) instead of one undersampled mip
// (one sampling path: away from grazing gA and gC are the isotropic footprint, so this equals the mip lookup)
vec4 dkS(vec2 uv, float lod, vec2 ga, vec2 gc) { return textureGrad(uDk, uv, ga, gc); }
// the cloudlet pattern: medium cells, big puffy cells, fine ripples and billow rows blended by the weather
float cellAt(vec2 p, float lod, vec2 ra, vec3 w) {
  vec2 pe = vec2(-ra.y, ra.x);
  // wind-aligned: cloudlets drawn out along the row axis and packed across it, so the field reads in rows, not a grid
  mat2 S = mat2(ra, pe) * mat2(.8, 0., 0., 1.12) * transpose(mat2(ra, pe));
  vec2 q = S * (p + DOFF) * CS, sA = S * gA * CS, sC = S * gC * CS;
  vec4 a = dkS(q, lod, sA, sC);
  float c = mix(a.r * .92 + a.g * .12, a.g * 1.05 + a.r * .12, w.y);
  // patchy cell size: in some km-scale patches the cloudlets are half again as small (tight flocks between bigger puffs)
  float zk = smoothstep(.5, .62, textureLod(uDk, q * .45 + vec2(.71, .29), max(lod - 2., 0.)).b) * (1. - w.x);
  if (zk > .005) c = mix(c, dkS(q * 1.55 + .63, lod + .63, sA * 1.55, sC * 1.55).r * .98, zk);
  mat2 M = mat2(.8, -.6, .6, .8);
  if (w.x > .005) c = mix(c, dkS(M * q * .6 + .41, max(lod - .74, 0.), M * sA * .6, M * sC * .6).r * 1.08, w.x);
  if (w.z < .005) return c;
  q = (p + DOFF) * CS;
  // rolls: cells drawn out 3:1 along the row axis, gathered into long bands with lanes of clear sky between (~0.9 km)
  vec2 rs = mix(vec2(.6, 1.25), vec2(.35, 1.3), uP[12].w);
  float rw = dkS(vec2(dot(q, ra), dot(q, pe)) * rs + .23, lod + .32, vec2(dot(gA, ra), dot(gA, pe)) * rs * CS, vec2(dot(gC, ra), dot(gC, pe)) * rs * CS).r;
  rw *= mix(1., smoothstep(-.55, .45, sin(dot(p, pe) * 6.98 + a.b * 5.)) * 1.2, uP[12].w);
  return mix(c, rw, w.z);
}
// cloud thickness 0..1 at a deck point (km); veil = glaciated ice (fibres at the rim, haze inside)
// sh: x shadowing step toward the sun (when shOff > 0), y dense, z cells
float deckTh(vec2 p, float lod, float shOff, out float veil, out float hd, out vec3 sh) {
  float fib;
  hd = holeD(p, lod, fib);
  vec4 W = deckW(p);
  // overhead (the steep views only, nothing the opening sees): km-scale weather so the cloudlets clump, merge, change
  // size and open into lanes instead of one even field of same-size spots
  float ov = smoothstep(.9 * HB, .45 * HB, length(p - CAMK));
  if (ov > 0.) {
    vec4 m = textureLod(uW, (p + DOFF * .3) * .085 + vec2(.61, .13), 0.) - .5;
    W.xy += vec2(m.x * 1.3, m.y * .7 + m.z * .3) * ov;
  }
  gOV = ov;
  vec2 ra = vec2(cos(uP[15].w), sin(uP[15].w));
  float rim = smoothstep(1.75, 1.05, hd);
  vec3 w = vec3(smoothstep(.5, .6, W.x) * (1. - FINE * .6), max(max(smoothstep(.46, .37, W.x), FINE), rim * .3), 0.);
  w.z = max(smoothstep(.5, .6, W.z), uP[12].w * .75) * (1. - rim);
  w.x *= 1. - rim;
  // the cloudlets here and (for the sun-side shading) a step toward the sun: one call site in a rolled loop
  float cells = 0., cS = 0.;
  for (int k = 0; k < 2 + uZc; k++) {
    if (k == 1 && shOff <= 0.) break;
    float v = cellAt(p + SUNH * (shOff * float(k)), lod, ra, w);
    if (k == 0) cells = v; else cS = v;
  }
  float mid = dkS((p + DOFF) * CS * .5 + vec2(.13, .57), max(lod - 1., 0.), gA * (CS * .5), gC * (CS * .5)).b;
  cells *= .4 + 1.15 * mid;
  if (shOff > 0.) cells += (dkS((p + DOFF) * CS * 2.3 + .17, lod + 1.2, gA * (CS * 2.3), gC * (CS * 2.3)).a - .5) * .32 * (1. - FINE * .5);
  float dense = smoothstep(.5, .62, W.y), thin = smoothstep(.47, .36, W.y);
  float e = dot(p, SUNH) + (W.x - .5) * 16.;
  float cut = smoothstep(1.3, .8, hd);
  float far = smoothstep(uP[18].x - 14., uP[18].x + 4., length(p - CAMK) + (W.z - .5) * 60.);
  float near = smoothstep(5., 1.8, hd);
  float thr = .02 + (.5 - W.y) * .9 * (1. - near * .6) + smoothstep(.56, .66, W.w) * .35 * (1. - near) + thin * .06 - near * .12 + cut * 1.6 + rim * .1
    + smoothstep(DEDGE - 9., DEDGE + 2., e) * 1.2 + far * 1.4 + (1. - UNDER) * .1
    + uP[18].y + uP[18].z * smoothstep(.55, .42, W.y) * .9;
  float th = smoothstep(thr, thr + .55 + .35 * (1. - UNDER), cells) + .2 * dense * UNDER * (1. - cut) * (1. - far) * smoothstep(.3, .6, mid);
  th *= smoothstep(.8, 1.45, hd);
  sh = vec3(0., dense, cells);
  if (shOff > 0.) sh.x = cells - cS * (.4 + 1.15 * mid);
  veil = VEIL * (smoothstep(.55, .92, hd) * smoothstep(1.5, 1.02, hd) * (.16 + fib * .22) + .03 * smoothstep(1., .3, hd) * fib);
  veil *= smoothstep(DEDGE + 2., DEDGE - 9., e) * (1. - far);
  return th;
}
// sunlight left after the sun's ray from p (km) crosses the deck (on a curved Earth; a set sun runs under it)
float deckLite(vec2 p, float lod) {
  float best = 9.;
  int n = int(uP[6].w);
  for (int i = 0; i < 4; i++) {
    if (i >= n) break;
    vec4 A = texelFetch(uH, ivec2(0, i), 0), B = texelFetch(uH, ivec2(1, i), 0);
    vec2 v = p - A.xy;
    float a = dot(v, B.xy), ac = a - clamp(a, -A.w, A.w);
    best = min(best, length(vec2(ac * .9, dot(v, vec2(-B.y, B.x)))) / max(A.z, 1e-3));
  }
  vec4 W = textureLod(uW, (p + DOFF * .3) * .019 + vec2(.37, .71), 1.);
  W.y = .5 + (W.y - .5) * 1.6;
  vec4 a = textureLod(uDk, (p + DOFF) * CS, lod);
  float cells = mix(a.r * .85 + a.g * .3, a.g, FINE) * (.4 + 1.15 * a.b);
  float thr = .02 + (.5 - W.y) * .9 + smoothstep(1.3, .8, best) * 1.05 + (1. - UNDER) * .34 + smoothstep(DEDGE - 9., DEDGE + 2., dot(p, SUNH)) * 1.2;
  return smoothstep(thr, thr + .55, cells) + .35 * smoothstep(.5, .62, W.y) * smoothstep(1.3, 1.8, best);
}
// a set sun on a curved Earth: a point h km up, x km sunward, still sees it while its ray clears the low haze (~.6 km);
// the light that just clears it is crimson, the light with room to spare gold (multiplies SUNC; 1 when the sun is up)
vec3 sunTint(vec2 p, float h) {
  if (UNDER < .5) return vec3(1.);
  float m = SUNTAN + dot(p, SUNH) * (1. / 6371.) + sqrt(max(h - .6, 0.) * (2. / 6371.));
  return smoothstep(-.0012, .0035, m) * mix(vec3(.95, .5, .95), vec3(1.08, 1.3, 1.1), smoothstep(.001, .02, m));
}
vec3 hzCol(vec3 d) {
  float caz = dot(normalize(d.xz + 1e-6), SUNH);
  float g = .5 + .5 * caz;
  return mix(uP[10].rgb, uP[9].rgb, .75 * pow(g, 12.) + .25 * g * g);
}
// the waterline: signed distance (m) seaward of it at a point P (m) on the flat
float shoreS(vec2 P) {
  float al = dot(P, vec2(uP[12].y, -uP[12].x));
  return dot(P, uP[12].xy) - uP[11].w - uP[12].z * (1. + .35 * sin(al * .043 + TIME * .07)) - 1.6 * sin(al * .017 + 1.3);
}
float sunT(vec3 p, float lod) {
  float a = 1. / 12742., cc = p.y - HB;
  float s = (-SUNTAN + sqrt(max(SUNTAN * SUNTAN - 4. * a * cc, 0.))) / (2. * a);
  vec2 q = p.xz + SUNH * s;
  if (dot(q, SUNH) > DEDGE + 3. || s > 300.) return 1.;
  float th = deckLite(q, lod);
  float sE = max(SUNTAN, .06);
  return exp(-th * TAU0 / sE * .55);
}
`,Xe=K+ie+`
out vec4 o;
uniform vec4 uQ;
float h21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  vec2 uv = gl_FragCoord.xy / uQ.x;
  vec3 d = normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UPV) * TANH);
  vec3 ro = vec3(CAMK.x, EYE * .001, CAMK.y);
  if (d.y < 0.) { d.y = -d.y; ro.y = -ro.y; }
  vec3 col = vec3(0); float T = 1.;
  float mu = dot(d, SUN);
  vec3 ph = icePh(mu);
  // sundogs: plates lying flat light the ice level with the sun, 22 degrees to either side (red inside, a white tail out)
  if (uP[10].w > 0.) {
    vec3 xd = degrees(acos(clamp(dot(normalize(d.xz + 1e-6), SUNH), -1., 1.))) - vec3(21.8, 22.3, 23.);
    ph += uP[10].w * 14. * (mix(exp(-xd * xd * 1.2), exp(-xd * .45), step(0., xd)) + .15 * exp(-max(xd.x, 0.) * .05)) * exp(-pow((d.y - SUN.y) / .03, 2.));
  }
  float jit = h21(gl_FragCoord.xy + .37);
  int n = int(uP[6].w);
  for (int i = 0; i < 4; i++) {
    if (i >= n) break;
    vec4 A = texelFetch(uH, ivec2(0, i), 0), B = texelFetch(uH, ivec2(1, i), 0);
    vec4 bm = texelFetch(uH, ivec2(2, i), 0), bx = texelFetch(uH, ivec2(3, i), 0);
    if (B.w * 0. + B.z < .02 || bx.w < .01) continue;
    vec3 inv = 1. / d, t0 = (bm.xyz - ro) * inv, t1 = (bx.xyz - ro) * inv;
    vec3 tn = min(t0, t1), tf = max(t0, t1);
    float ta = max(max(tn.x, tn.y), max(tn.z, 0.)), tb = min(min(tf.x, tf.y), tf.z);
    if (tb <= ta) continue;
    float dt = (tb - ta) / 24., t = ta + dt * jit, sT = -1.;
    float R = max(A.z, .65), Lz = B.z, vs = bx.w;
    vec2 ax = B.xy, pe = vec2(-ax.y, ax.x), vp = normalize(vec2(-d.z, d.x) + 1e-6);
    for (int k = 0; k < 24; k++) {
      vec3 p = ro + d * t; t += dt;
      float z = HB - p.y;
      if (z < -.02 || z > Lz) continue;
      float zn = z / Lz;
      vec2 c = A.xy + SHEARV * (z * .4 + z * z * .35);
      vec2 q = p.xz - c;
      // fibres: noise across the view (u is near constant along a ray, so each fibre stays a crisp thread) and drawn
      // out ~10:1 along the fall; q is taken from the sheared path, so every thread follows the one curve
      float u = dot(q, vp) + bm.w, al = dot(q, ax); q -= ax * clamp(al, -A.w * .7, A.w * .7);
      float r2 = dot(q, q);
      float f1 = textureLod(uDk, vec2(u * .21, z * .021 - FALL * .002), 0.).a;
      float f2 = textureLod(uDk, vec2(u * .63 + .41, z * .06 + .5), 0.).a;
      float len = textureLod(uDk, vec2(u * .06 + .3, .37), 0.).a;
      float fib = smoothstep(.3, .78, f1 * .55 + f2 * .45);
      float w0 = R * (.32 - .17 * zn);
      float top = smoothstep(-.02, .1, z);
      float env = exp(-r2 / (w0 * w0)) * top;
      float de = vs * env * (exp(-z / (.35 + .1 * R)) * .6 + 2.6 * (.06 + .94 * fib * fib) * smoothstep(1., .3, zn / (.72 + .45 * len)));
      if (de < .002) continue;
      float st = de * 1.6 * dt;
      if (sT < 0. || (k & 3) == 0) sT = sunT(p, 2.);
      // (by day the ice under the deck still has the sky's light round it: never a dark smoke)
      vec3 L = (SUNC * (sT + (1. - sT) * .4 * (1. - UNDER)) * ph + uP[15].rgb) * .85;
      col += T * L * (1. - exp(-st));
      T *= exp(-st);
      if (T < .03) break;
    }
  }
  o = vec4(col, 1. - T);
}`,Ge=K+ie+`
uniform vec4 uQ;
out vec4 o;
void main() {
  vec2 uv = gl_FragCoord.xy / uQ.x;
  vec3 d = normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UPV) * TANH);
  vec2 ok = CAMK; float rough = 0.;
  if (d.y < 0.) {
    vec2 P = CAMK * 1000. + d.xz * (EYE / -d.y);
    // the sea's ripples blur it a little; on the flat the tide's film is a sharp mirror and damp sand a blurred one
    float s = shoreS(P), nz = dot(textureLod(uDk, P * .0035, 0.).ba, vec2(1., .3));
    rough = s > 0. ? .06 * (.4 + uP[11].z) : mix(.2, .004, smoothstep(.28, .5, nz + .3 * smoothstep(-30., 0., s)));
    ok = P * .001; d.y = max(-d.y, .0015); d = normalize(d);
  }
    float t = (-d.y + sqrt(d.y * d.y + 2. * HB / 6371.)) * 6371.;
    vec2 p = ok + d.xz * t;
    float fp = t * uP[13].w / sqrt(max(d.y, .004)) * (1. + rough * 40.);
    float lod = log2(max(fp * CS * 1024., 1.));
    // the true along-view footprint (grazing angle at the curved deck); m > 1 only where the mip above undersamples it
    float fa = t * uP[13].w / max(sqrt(d.y * d.y + 2. * HB / 6371.), .004) * (1. + rough * 40.), ra = fa / fp;
    float m = ra * smoothstep(1.5, 3., ra);
    gAn = m > 1.;
    vec2 dh = normalize(d.xz + 1e-6);
    gA = dh * (fp * max(m, 1.)); gC = vec2(-dh.y, dh.x) * fp; gF = max(fa, fp); gM = m;
    float veil, hd; vec3 sh;
    float th = deckTh(p, lod, rough > 0. ? 0. : .012 / CS, veil, hd, sh);
    float mu = dot(d, SUN);
    float tau = th * TAU0 / (.15 + d.y) * .5 + veil * 1.2 / (.2 + d.y) * .3;
    float a = 1. - exp(-tau);
    // under: the set sun lights the bases from below (self-shadow from the sunward neighbour, dense patches greyer)
    float dS = sh.x * smoothstep(.85, 1.2, hd) * (1. - FINE);   // cirrocumulus: too thin to shade itself
    // (soft: a hard one-sided step embossed every cloudlet with a dark rim)
    // (lit from below and from the sun's side: the sunward edge and the belly glow, the far side falls grey-mauve)
    float sl = exp(-.8 * max(-dS, 0.)) * (1. + .6 * max(dS, 0.));
    sl *= .8 + .3 * smoothstep(.0, .9, sh.z);
    float dn = sh.y * smoothstep(.3, .9, th);
    // thin edges scatter the low light about as well as cores per unit cover (alpha already thins them): no dark rims;
    // cores still a touch brighter than the thin sheet between them
    float refl = (.6 + .4 * (1. - exp(-th * TAU0 * .7))) * mix(.72 + .28 * smoothstep(.1, .7, th), 1., gOV * .7);
    float edgeR = smoothstep(DEDGE + 2., DEDGE - 30., dot(p, SUNH));
    float sa = .5 + .5 * dot(normalize(d.xz + 1e-6), SUNH);
    vec3 Lu = SUNC * sunTint(p, HB) * sl * refl * (.35 + .5 * hgp(mu, .45)) * mix(1.25, .8, edgeR) * mix(.35, 1., sa * sa) * smoothstep(-.05, .25, d.y + .1 * sa);
    Lu *= mix(1., .7, dn) * mix(vec3(1.), vec3(.9, .86, .96), dn);
    // over: a sun above the deck, seen through it (silver-gold edges where thin, grey cores where thick)
    float sE = max(SUNTAN, .05), tS = th * TAU0 / sE * .16;
    vec3 Lo = SUNC * (hgp(mu, .8) * exp(-tS) * .18 * vec3(1., .93, .8) + .95 * mix(1., .42, smoothstep(.05, .95, th))) * (.55 + .45 * sl) * mix(vec3(1.), vec3(.86, .88, 1.), smoothstep(.4, 1., th));
    Lo *= mix(1., .6, dn);
    vec3 dc = mix(Lo, Lu, UNDER) * a + uP[13].rgb * a * mix(1., .65, dn);
    vec3 ic = (SUNC * icePh(mu) * .25 + uP[13].rgb) * veil;
    dc = dc * (1. - veil * .3) + ic * .35 * (1. - a);
    float hz = 1. - exp(-t / 160.);
    dc = mix(dc, hzCol(d) * a * .55, hz);
  o = vec4(dc, a);
}`,Ve=K+ie+`
uniform sampler2D uV;
uniform sampler2D uR;
uniform sampler2D uK;
uniform vec4 uQ;
out vec4 o;
float h21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec4 landAt(float u) {
  float x = fract(u + .5) * 512. - .5, i = floor(x), f = x - i;
  vec4 a = texelFetch(uH, ivec2(int(mod(i, 512.)), 4), 0), b = texelFetch(uH, ivec2(int(mod(i + 1., 512.)), 4), 0);
  return mix(a, b, f);
}
vec3 clearSky(vec3 d, float u) {
  float el = max(d.y, 0.), mu = dot(d, SUN);
  vec3 hz = hzCol(d);
  vec3 col = mix(hz, uP[8].rgb, smoothstep(0., 1., pow(el, .5) * 1.15));
  col += SUNC * (.05 * exp((mu - 1.) * 5.) + .35 * exp((mu - 1.) * 50.) + 1.6 * exp((mu - 1.) * 700.)) * (1. - uP[8].w * .8);
  col += SUNC * 60. * smoothstep(.99997, .99999, mu) * step(0., SUNTAN);
  float anti = max(-dot(normalize(d.xz + 1e-6), SUNH), 0.);
  col = mix(col, col * vec3(.62, .66, .86), uP[14].w * anti * smoothstep(.07, 0., el));
  col += uP[14].w * anti * vec3(.16, .07, .09) * exp(-pow((el - .1) / .05, 2.));
  // sundogs: oriented plates in a thin ice haze low in the gap, 22 degrees either side of the sun
  vec3 xd = degrees(acos(clamp(dot(normalize(d.xz + 1e-6), SUNH), -1., 1.))) - vec3(21.9, 22.4, 23.1);
  col += uP[10].w * SUNC * mix(exp(-xd * xd * 2.), exp(-xd * .5), step(0., xd)) * exp(-pow((d.y - max(SUNTAN, 0.) - .012) / .042, 2.)) * 1.3;
  if (uP[8].w > .5) {
    vec2 g = vec2(u * 1005.3, asin(min(el, 1.)) * 160.);
    vec2 cid = floor(g); float hs = h21(cid);
    vec2 f = fract(g) - .2 - .6 * vec2(h21(cid + 3.1), h21(cid + 7.7));
    col += vec3(.8, .85, 1.) * step(.94, hs) * pow(hs, 40.) * exp(-dot(f, f) * 900.) * .25 * smoothstep(0., .2, el);
  }
  return col;
}
vec3 landCol(vec3 d, float dist, float top, float s) {
  float f = clamp((top - d.y) * dist * 1000. / max(top * dist * 1000. + EYE, .5), 0., 1.);
  float nz = textureLod(uDk, vec2(s * 41., d.y * 23.), 0.).a;
  vec3 c = uP[17].rgb * (.7 + .6 * nz) * (1. - .35 * f);
  float lit = max(-dot(normalize(d.xz + 1e-6), SUNH), 0.) * step(0., SUNTAN) * (1. - uP[8].w);
  c += SUNC * uP[16].z * lit * (.6 - .3 * f) * .12;
  return mix(c, hzCol(d) * .92, 1. - exp(-dist / 14.));
}
// one sky call per pixel: land silhouettes, clear sky, the deck (premultiplied over), aerial haze
vec3 skyAll(vec3 d, vec4 dk, out float alpha) {
  alpha = 0.;
  float u = at2(d.zx) / 6.2832;
  vec4 L = landAt(u);
  float nEl = L.x * .06, fEl = L.z * .06;
  // near land in front of far land (one call site)
  vec3 lc0 = nEl > 1e-4 && d.y < nEl ? vec3(L.y * 40., nEl, u) : vec3(L.w * 40., fEl, u + .5);
  if (lc0.y > 1e-4 && d.y < lc0.y) { alpha = 1.; return landCol(d, lc0.x, lc0.y, lc0.z); }
  vec3 col = clearSky(d, u);
  // distant low cloud along the horizon, out past the deck's far edge
  float lc = textureLod(uDk, vec2(u * 7., .17), 2.).b, lc2 = textureLod(uDk, vec2(u * 37., .61), 1.).a;
  float lh = uP[18].w * .011 * smoothstep(.5, .64, lc) * (.55 + .6 * lc2);
  if (lh > 1e-4 && d.y < lh + .003 && d.y > .0015) {
    float k = clamp((d.y - .003) / lh, 0., 1.), sw = max(dot(normalize(d.xz + 1e-6), SUNH), 0.);
    vec3 cc = hzCol(d) * (.3 + .25 * k) + SUNC * .2 * pow(k, 5.) * sw * sw * (.2 + .8 * UNDER);
    col = mix(col, cc, smoothstep(0., .0012, lh + .003 - d.y) * smoothstep(.0015, .004, d.y) * .85);
  }
  if (d.y > 0.) { col = col * (1. - dk.a) + dk.rgb; alpha = dk.a; }
  return col;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uQ.x;
  vec3 d = normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UPV) * TANH);
  float u = at2(d.zx) / 6.2832;
  vec4 L = landAt(u);
  float ld = L.x > 1e-4 ? L.y * 40000. : 1e9;
  vec3 sd = d; float F = 0.; vec3 body = vec3(0); vec2 vofs = vec2(0);
  bool surf = d.y < 0. && EYE / -d.y < ld;
  float foam = 0., film = 0., dry = 0.;
  if (surf) {
    float t = EYE / -d.y;
    vec2 P = CAMK * 1000. + d.xz * t;
    vec2 tg = vec2(uP[12].y, -uP[12].x);
    float al = dot(P, tg);
    float s = shoreS(P);
    float lodR = log2(max(t * uP[13].w * 256. / 7., 1.));
    vec3 n;
    // sun on the sand through the deck (sun above it only): one blurred lookup of the cloudlets where its ray crosses
    float sE = max(SUNTAN, .06);
    vec2 qS = P * .001 + SUNH * (HB / sE);
    float shS = exp(-smoothstep(.3, .85, textureLod(uDk, (qS + DOFF) * CS, 3.).r) * TAU0 / sE * .25);
    vec3 E = uP[14].rgb * (1. + shS * max(SUNTAN, 0.) * 6. * (1. - uP[8].w));
    if (s > 0.) {
      float ch = uP[11].z;
      vec2 w = uP[17].w * vec2(.6, .8);
      vec4 r1 = textureLod(uR, P / 7. + w * TIME * .05, lodR);
      vec4 r2 = textureLod(uR, mat2(.8, -.6, .6, .8) * P / 23. - w * TIME * .021, max(lodR - 1.7, 0.));
      vec2 sl = ((r1.xy - .5) * .9 + (r1.zw - .5) * .4) * .02 * (.4 + ch) + (r2.xy - .5) * .022 * (.5 + ch);
      sl *= smoothstep(-.5, 6., s);
      sl += vec2(.012, .02) * sin(dot(P, vec2(.05, .07)) - TIME * .7) * ch;
      n = normalize(vec3(-sl.x, 1., -sl.y));
      float dep = smoothstep(0., 30., s);
      vec3 sandC = vec3(.30, .25, .19) * .6;
      body = mix(sandC * E * 1.4, vec3(.010, .030, .036) * E * 2.4, dep);
      F = 1.;
      foam = smoothstep(.9, 0., s) * smoothstep(.0, .25, s + .05) * smoothstep(.35, .7, textureLod(uDk, P * vec2(.0021, .009), 0.).a + .2 * sin(al * .9));
    } else {
      // wet sand: shining film in the low spots, damp sand between, drier toward the dunes
      vec4 nz = textureLod(uDk, P * .0035, 0.), nf = textureLod(uDk, P * .019 + .37, 0.);
      // ripple marks ~0.3 m apart with their crests along the waterline, wavy and broken into short bars: the tide's
      // film stands in the troughs, so near the eye the mirror breaks into rows of bright bars between dull sand ridges;
      // farther off (once a pixel spans a ripple) the rows merge into the flat's mirror. Sharp-edged pools here and there.
      float fpv = t * uP[13].w / max(-d.y, .01), rv = smoothstep(.055, .018, fpv);
      float ph = s / .14 + (nf.a - .5) * 1.3 + (nz.a - .5) * 1.6 + .25 * sin(al * 2.1 + nf.b * 6.);
      float rp = sin(6.2832 * ph);
      float bar = smoothstep(.3, .6, nf.b);
      float cov = smoothstep(.28, .5, nz.b + .3 * nz.a + .3 * smoothstep(-30., 0., s));
      float pool = smoothstep(.545, .56, nz.b + .25 * nf.b);
      film = max(pool, cov * mix(.85, smoothstep(.62, .15, rp) * (.6 + .4 * bar), rv)) * smoothstep(-160., -40., s);
      dry = smoothstep(-90., -170., s + nz.a * 60.);
      vec4 rr = textureLod(uR, P / .9, lodR + 2.5);
      vec2 sl = ((rr.xy - .5) * .06 + uP[12].xy * cos(6.2832 * ph) * .1 * rv) * (1. - film) * (1. - dry) + (rr.xy - .5) * .004 * film;
      n = normalize(vec3(-sl.x, 1., -sl.y));
      vec3 sandC = mix(vec3(.30, .25, .19) * (.75 + .5 * nz.a) * (.85 + .3 * nf.a) * .4 * (1. + .3 * rp * rv), vec3(.40, .35, .29) * (.85 + .3 * nz.a), dry);
      body = sandC * E * 1.1 * (1. - .8 * film);
      foam = .3 * smoothstep(.6, 0., abs(s + 1.8 + 1.5 * nz.a)) * smoothstep(.4, .7, textureLod(uDk, P * vec2(.003, .011), 0.).a) * (1. - film);
    }
    sd = reflect(d, n); sd.y = max(abs(sd.y), .0015);
    float c = clamp(dot(-d, n), 0., 1.);
    float fr = .02 + .98 * pow(1. - c, 5.);
    // the water film over dark sand reads as a mirror (dark substrate, nothing to see but the reflection)
    F = s > 0. ? F * fr : (film * (.48 + .52 * fr) + (1. - film) * fr * .45) * (1. - dry);
    vofs = n.xz * .06;
  }
  // the deck from its pass: this pixel's own, or for a reflection the pixel whose mirror ray is sd
  vec2 kuv = uv;
  if (d.y < 0.) { vec3 m = vec3(sd.x, -sd.y, sd.z); float z = dot(m, FW); kuv = clamp(vec2(dot(m, RT), dot(m, UPV)) / (max(z, .05) * TANH) * .5 + .5, 0., 1.); }
  float al;
  vec3 sky = skyAll(sd, textureLod(uK, kuv, 0.), al);
  vec4 v = (d.y < 0. && !surf) ? vec4(0) : texture(uV, uv + vofs);
  v *= 1. - al * step(sd.y, .06);
  vec3 col = sky * (1. - v.a) + v.rgb;
  if (surf) {
    float Fw = F;
    col = col * Fw + body * (1. - Fw);
    col += foam * uP[14].rgb * 1.1;
  }
  col *= uP[4].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  o = vec4(col, 1.);
}`;ze.add({num:529,name:"Hole-Punch Cloud",fam:"Vistas",recipe:"Standing on wet sand under a flat layer of cloud with a hole in it, where ice falls out in a glowing curtain, all mirrored in the wet beach. The hole, the light and the tide change every mint. Tap the cloud or its reflection to seed a bit of ice that slowly opens a small hole of its own, drag to blow a gust that bends the falling ice, or hold to let the ice fall and the holes grow.",interactive:"Tap the deck (or its reflection) to seed it with ice: a tuft of ice shows at once and slowly opens a small hole round it. Drag to blow a gust that bends the falling ice and drifts the deck, hold to let the ice fall and the holes widen.",music:!0,gl:!0,fps:30,seed:0,make(x){const e=x.gl,A=x.size;let D=0;for(let t=2;t<66;t+=8)D=(D^parseInt(x.hash.slice(t,t+8),16))+2654435769|0;const u=()=>{D=D+1831565813|0;let t=Math.imul(D^D>>>15,1|D);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},F=t=>{let a=0;for(const o in t)a+=t[o];let s=u()*a;for(const o in t)if(s-=t[o],s<0)return o;return Object.keys(t)[0]},m=!!x.home,ce=m?"Round":F({Round:55,Canal:33,"Cluster of three":12}),B=m?"Sunset":F({Sunset:50,"Late afternoon":40,"Moonlit night":10}),de=m?"Altocumulus":F({Altocumulus:50,Cirrocumulus:35,"Wave rows":15}),te=m?"Faint halo":F({"Faint halo":55,"Bright halo":33,Sundogs:12}),fe=m?"Jellyfish":F({Jellyfish:55,"Long trails":30,Faded:15}),ke=m?"Calm":F({Calm:65,"Light chop":35}),Y=m?"Dune shore":F({"Dune shore":50,"Rocky headland":35,"Open flats":15});x.trait("Hole",ce),x.trait("Light",B==="Moonlit night"?"Moonlit night":B),x.trait("Deck",de),x.trait("Ice optics",B==="Moonlit night"&&te==="Sundogs"?"Moondogs":te),x.trait("Virga",fe),x.trait("Sea",ke),x.trait("Coast",Y);let N=1386028631;for(let t=2;t<66;t+=8)N=Math.imul(N^parseInt(x.hash.slice(t,t+8),16),3432918353)>>>0;const he=()=>{N=N+1831565813|0;let t=Math.imul(N^N>>>15,1|N);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ae=he(),oe=m||Ae<.55?"Out to sea":Ae<.8?"Looking up":"Along the shore";x.trait("View",oe);const Re=he(),We=he(),ue=m||Re<.5?"Broken":Re<.75?"Closed":"Rafts";x.trait("Cover",ue);const qe=m?1:[.3,.6,1,1.7,3][Math.min(4,Math.floor(We*5))],me=B==="Moonlit night",H=B==="Sunset",O=(m?24:18+u()*14)*S,pe=u(),Q=(H?m?-.8:-.4-pe*1.5:me?11+pe*5:8+pe*3.5)*S,Ke=H?Math.max(0,(-Q/S-.4)/1.5):0,Ye=H?40:me?60:30+u()*8,ae=de==="Cirrocumulus",T=ae?6.2:3.5+u()*.4*(m?0:1),Qe=ae?1/8:1/11,Pe=[Math.sin(O),Math.cos(O)],X=[Math.sin(O)*Math.cos(Q),Math.sin(Q),Math.cos(O)*Math.cos(Q)],i={Sunset:{zen:[.035,.075,.22],hzs:[1.25,.5,.16],hza:[.22,.18,.3],sunc:[1,.36,.15],k:.95,ambD:[.05,.045,.1],ground:[.42,.25,.24],amV:[.1,.07,.1],belt:1,land:[.035,.03,.04],expo:.8},"Late afternoon":{zen:[.07,.2,.55],hzs:[.95,.8,.6],hza:[.36,.46,.66],sunc:[1,.82,.6],k:1.7,ambD:[.12,.14,.2],ground:[.3,.29,.3],amV:[.14,.14,.18],belt:0,land:[.05,.05,.05],expo:.58},"Moonlit night":{zen:[.003,.006,.016],hzs:[.016,.02,.032],hza:[.01,.013,.024],sunc:[.62,.68,.82],k:.13,ambD:[.005,.006,.01],ground:[.01,.012,.018],amV:[.004,.005,.008],belt:0,land:[.002,.002,.003],expo:3.4}}[B];if(H&&!m){const t=Ke-.267;i.hzs=[i.hzs[0]*(1-.4*t),i.hzs[1]*(1-.6*t),i.hzs[2]*(1-.3*t)],i.zen=i.zen.map(a=>a*(1-.45*t)),i.hza=i.hza.map(a=>a*(1-.3*t))}const ve=i.sunc.map(t=>t*i.k),Ze={"Faint halo":3,"Bright halo":4.5,Sundogs:1.2}[te],je=te==="Sundogs"?1:0,Z={Jellyfish:2.7,"Long trails":3.3,Faded:1.2}[fe],j={Jellyfish:1,"Long trails":.85,Faded:.35}[fe];let se=0,re=.2,Me=1.7;const xe=Math.tan(36*S),L=(m?22:10+u()*25)*S,G=[Math.sin(L),Math.cos(L)],Je=(m?24:14+u()*22)*qe,k=[Math.sin(O+.5),Math.cos(O+.5)],z=[],J=(t,a,s,o,c,r,l,n)=>{const d={x:Math.sin(t)*a,z:Math.cos(t)*a,R:n?s:.02,Rt:s,L:o,ax:Math.cos(c),az:Math.sin(c),vs:n?r:0,vst:r,Lz:n?l:.05,Lzt:l,age:n?60:0,seed:u()*7,tapped:!n};return z.push(d),d},$e=m||u()<.6||oe==="Along the shore"?-1:1,U=$e*(m?.3:.22+u()*.16),$=T/Math.tan((m?31:28+u()*6)*S);if(ce==="Round"){const t=(m?1.25:1.1+u()*.45)*T/3.5;J(U,$,t,t*(.25+u()*.3),m?.5:u()*M,j,Z*T/3.5,!0)}else if(ce==="Canal")J(U,$*1.1,1.35*T/3.5,3.2*T/3.5,Math.atan2(k[1],k[0])+(u()-.5)*.6,j,Z*T/3.5,!0);else{const t=T/3.5;J(U,$,1.45*t,.1,0,j,Z*t,!0),J(U-.32,$*1.25,.95*t,.1,0,j*.8,Z*.7*t,!0),J(U+.22,$*1.7,.75*t,.1,0,j*.7,Z*.6*t,!0)}oe==="Looking up"?(se=U*.15,re=.52):oe==="Along the shore"&&(se=Math.max(L-.95,U-.42),re=.15);const et=Math.atan2(k[1],k[0])+Math.PI/2+(u()-.5)*.5,tt=m?55:42+u()*30,ot=m?1:u()*1.3;let ge=.8;{const t=z[0],a=.5*t.Lzt,s=.4*a+.35*a*a;for(let o=.8;o<=2.6;o+=.05){const c=t.x+o*k[0]*s,r=T-a,l=t.z+o*k[1]*s;if(Math.acos((c*X[0]+r*X[1]+l*X[2])/Math.hypot(c,r,l))<23*S){ge=o;break}}}const y=[k[0]*ge,k[1]*ge],Se=y.slice();let V=[u()*30,u()*30];const De=new Float32Array(512*4);{const t=[G[1],-G[0]],a=(r,l)=>{const n=Math.floor(r),d=r-n,f=d*d*(3-2*d),h=v=>{let R=Math.imul(v+l*7919^1540483477,668265261);return R^=R>>>15,(R>>>0)%1e3/1e3};return h(n)*(1-f)+h(n+1)*f},s=(r,l,n)=>{let d=((n-r)%M+M)%M,f=((l-r)%M+M)%M;return d<f?Math.sin(Math.PI*d/f):0},o=Y==="Rocky headland"?1.8:Y==="Open flats"?.25:1,c=Y==="Open flats"?.003:.012;for(let r=0;r<512;r++){const l=r/512*M-Math.PI,n=[Math.sin(l),Math.cos(l)],d=n[0]*G[0]+n[1]*G[1];let f=0,h=40;if(d<-.02){const I=Math.min(.9/-d,14),q=(n[0]*t[0]+n[1]*t[1])*I;f=(c*(.6+.6*a(q*4,1)+.25*a(q*30,2))+.0015*a(q*300,3))/I,h=I}const v=s(L-1.55-.5*o*.3,L-.85,l);if(v>0){const I=4.5+3*a(l*3,4),q=o*.13*Math.pow(v,.6)*(.55+.45*a(l*12,5)+.12*a(l*90,6));q/I>f&&(f=q/I,h=I)}let R=0,P=40;const C=s(L-2.9,L-.8,l);C>0&&Y!=="Open flats"&&(P=32,R=.75*Math.pow(C,.5)*(.5+.5*a(l*5,7)+.1*a(l*40,8))/P),De.set([f/.06,h/40,R/.06,P/40],r*4)}}const W=(t,a,s,o,c,r,l)=>{const n=e.createTexture();return e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,s,t,a,0,o,c,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,r===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,l),n},Fe=t=>{const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),a},p=e.__c529||(e.__c529=(()=>{e.getExtension("KHR_parallel_shader_compile");const a=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),s=(f,h)=>{const v=e.createShader(h);return e.shaderSource(v,f),e.compileShader(v),v},o=s(He,e.VERTEX_SHADER),c={bake:Oe,deck:Ge,comp:Ve,virga:Xe},r={};for(const f in c){const h=e.createProgram(),v=s(c[f],e.FRAGMENT_SHADER);e.attachShader(h,o),e.attachShader(h,v),e.linkProgram(h),e.flush(),r[f]={p:h,f:v}}for(const f in r){if(!e.getProgramParameter(r[f].p,e.LINK_STATUS))throw new Error("529 "+f+": "+e.getShaderInfoLog(r[f].f)+e.getProgramInfoLog(r[f].p));const h=r[f].p,v={p:h};r[f]=v;const R=e.getProgramParameter(h,e.ACTIVE_UNIFORMS);for(let P=0;P<R;P++){const C=e.getActiveUniform(h,P).name.replace("[0]","");v[C]=e.getUniformLocation(h,C)}e.useProgram(h),["uDk","uH","uV","uR","uW","uK"].forEach((P,C)=>{v[P]&&e.uniform1i(v[P],C)})}const l=e.createVertexArray();e.bindVertexArray(l),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE);const n={P:r,vao:l,VR:300};n.tDk=W(1024,1024,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),n.tW=W(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),n.tR=W(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT),e.useProgram(r.bake.p);for(const[f,h,v]of[[n.tDk,1024,0],[n.tR,256,1],[n.tW,256,2]]){const R=Fe(f);e.viewport(0,0,h,h),e.uniform4f(r.bake.uM,v,h,0,0),e.drawArrays(e.TRIANGLES,0,3),e.deleteFramebuffer(R),e.bindTexture(e.TEXTURE_2D,f),e.generateMipmap(e.TEXTURE_2D)}const d=e.getExtension("EXT_texture_filter_anisotropic");return d&&(e.bindTexture(e.TEXTURE_2D,n.tDk),e.texParameterf(e.TEXTURE_2D,d.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(16,e.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)||1))),n.kF=a,e.bindFramebuffer(e.FRAMEBUFFER,null),n})()),at=W(512,5,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE),Ne=p.kF?W(p.VR,p.VR,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):W(p.VR,p.VR,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),st=Fe(Ne);e.bindFramebuffer(e.FRAMEBUFFER,null);let le=null,Ee=null,Le=!1;const E={yaw:se,pitch:re,x:0,z:0,eye:Me},g=[0,0,1],b=[1,0,0],_=[0,1,0],Ue=()=>{const t=x.view||Be;E.yaw=se+(t.yaw||0),E.pitch=Math.max(-1.25,Math.min(1.25,re+(t.pitch||0)));const a=t.x||0,s=t.z||0,o=Math.hypot(a,s),c=o>30?30/o:1;E.x=a*c,E.z=s*c,E.eye=Math.max(.4,Math.min(3,Me+(t.y||0)));const r=Math.cos(E.pitch);g[0]=Math.sin(E.yaw)*r,g[1]=Math.sin(E.pitch),g[2]=Math.cos(E.yaw)*r,b[0]=Math.cos(E.yaw),b[1]=0,b[2]=-Math.sin(E.yaw),_[0]=g[1]*b[2]-g[2]*b[1],_[1]=g[2]*b[0]-g[0]*b[2],_[2]=g[0]*b[1]-g[1]*b[0]};Ue();const rt=(t,a)=>{const s=t*2-1,o=1-a*2,c=[0,1,2].map(l=>g[l]+(s*b[l]+o*_[l])*xe),r=Math.hypot(c[0],c[1],c[2]);return c.map(l=>l/r)};let ee=0,w=null,we=0,_e=0,ye=0,be=0;const Ce=(t,a)=>{const s=rt(t,a);if(s[1]<0&&(s[1]=-s[1]),s[1]<.06)return;const o=T/s[1],c=E.x*.001+s[0]*o,r=E.z*.001+s[2]*o;for(let d=z.length-1;d>=0;d--)z[d].tapped&&z.splice(d,1);z.length>=4&&z.pop();const l=Math.min(.75,.3+.02*o)*(.85+.3*u()),n={x:c,z:r,R:.09,Rt:l,L:.05,ax:1,az:0,vs:2.8,vst:.95,Lz:.45,Lzt:.5+l*1.6,age:0,seed:u()*7,tapped:!0};z.push(n),x.sound.hit("noise",.25,{cutoff:260,dur:1.4}),x.sound.note(40+Math.floor(u()*3)*2,{dur:1.6,vel:.12,wave:"sine"})},lt=t=>{const a=x.input,s=a.taps();if(we=0,a.down){w||(w={x0:a.x,y0:a.y,lx:a.x,ly:a.y,t:0,path:0});const o=a.x-w.lx,c=a.y-w.ly;if(w.lx=a.x,w.ly=a.y,w.t+=t,w.path+=Math.hypot(o,c),w.path>.015){const r=2.6*T/3.5,l=Math.hypot(g[0],g[2])||1,n=(b[0]*o-g[0]/l*c)*r,d=(b[2]*o-g[2]/l*c)*r,f=Math.hypot(n,d);if(f>1e-5){for(const v of z)v.x+=n*.4,v.z+=d*.4;V[0]-=n*.4,V[1]-=d*.4,y[0]+=n*.7,y[1]+=d*.7;const h=Math.hypot(y[0],y[1]);h>3&&(y[0]*=3/h,y[1]*=3/h),be-=t,be<=0&&(be=.35,x.sound.hit("noise",Math.min(.25,f*2),{cutoff:500,dur:.6}))}}else w.t>.3&&(we=1)}else w?(w.path<=.015&&w.t<.3&&Ce(w.x0,w.y0),w=null):s.length&&Ce(s[0].x,s[0].y)},nt=t=>{const a=we?1:0;_e+=t*(.05+.5*a);for(const s of z){s.age+=t,s.tapped&&(s.R+=(s.Rt-s.R)*(1-Math.exp(-t/45)),s.vs+=(s.vst-s.vs)*(1-Math.exp(-t/30)),s.Lz+=(s.Lzt-s.Lz)*(1-Math.exp(-t/20)));const o=a*.05+.002;s.R=Math.min(s.R+o*t,s.Rt*1.5+.2),s.Lz=Math.min(s.Lz+a*.1*t,s.Lzt*1.4+.2),s.vs=Math.min(s.vs+a*.08*t,Math.max(s.vst,.2)*1.4)}y[0]+=(Se[0]-y[0])*(1-Math.exp(-t/8)),y[1]+=(Se[1]-y[1])*(1-Math.exp(-t/8)),V[0]-=k[0]*t*.006,V[1]-=k[1]*t*.006;for(const s of z)s.x+=k[0]*t*.006,s.z+=k[1]*t*.006;if(a&&(ye-=t,ye<=0)){ye=.12+u()*.25;const s=[88,91,93,95,98,100,103];x.sound.note(s[Math.floor(u()*s.length)],{dur:.5,vel:.05+u()*.05,wave:"sine"})}},Te=new Float32Array(4*4*4),ne=new Float32Array(19*4),Ie=()=>{const t=Math.min(z.length,4),a=[E.x*.001,E.z*.001],s=z.slice(0,t).sort((o,c)=>Math.hypot(o.x-a[0],o.z-a[1])-Math.hypot(c.x-a[0],c.z-a[1]));if(Te.fill(0),s.forEach((o,c)=>{const r=c*16,l=y[0]*(o.Lz*.4+o.Lz*o.Lz*.35),n=y[1]*(o.Lz*.4+o.Lz*o.Lz*.35),d=Math.max(o.R,.65)*1.4+o.L*.7;Te.set([o.x,o.z,o.R,o.L,o.ax,o.az,o.Lz,o.seed,Math.min(o.x,o.x+l)-d,T-o.Lz-.05,Math.min(o.z,o.z+n)-d,o.seed*.37,Math.max(o.x,o.x+l)+d,T+.05,Math.max(o.z,o.z+n)+d,o.vs],r)}),e.bindVertexArray(p.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,at),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.texSubImage2D(e.TEXTURE_2D,0,0,0,4,4,e.RGBA,e.FLOAT,Te),Le||(e.texSubImage2D(e.TEXTURE_2D,0,0,4,512,1,e.RGBA,e.FLOAT,De),Le=!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,p.tDk),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,p.tR),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,p.tW),ne.set([g[0],g[1],g[2],xe,b[0],b[1],b[2],ee,_[0],_[1],_[2],E.eye,X[0],X[1],X[2],Math.tan(Q),ve[0],ve[1],ve[2],i.expo,T,ae?3.2:H?4.2:2.6,Qe,ae?1:0,V[0],V[1],Ye,t,y[0],y[1],H?1:0,_e,i.zen[0],i.zen[1],i.zen[2],me?1:0,i.hzs[0],i.hzs[1],i.hzs[2],Ze,i.hza[0],i.hza[1],i.hza[2],je,a[0],a[1],ke==="Light chop"?1:.15,Je,G[0],G[1],2.2*Math.sin(ee*.37+1.7*Math.sin(ee*.13))+.8*Math.sin(ee*.91),de==="Wave rows"?1:0,i.ambD[0],i.ambD[1],i.ambD[2],2*xe/A,i.ground[0],i.ground[1],i.ground[2],i.belt,i.amV[0],i.amV[1],i.amV[2],et,Pe[0],Pe[1],1,1,i.land[0],i.land[1],i.land[2],1,tt,ue==="Closed"?-.13:0,ue==="Rafts"?1:0,ot]),e.bindFramebuffer(e.FRAMEBUFFER,st),e.viewport(0,0,p.VR,p.VR),e.useProgram(p.P.virga.p),e.uniform4fv(p.P.virga.uP,ne),e.uniform4f(p.P.virga.uQ,p.VR,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.flush(),!le){e.activeTexture(e.TEXTURE5),le=p.kF?(()=>{const o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,A,A,0,e.RGBA,e.HALF_FLOAT,null),o})():(()=>{const o=e.createTexture();return e.bindTexture(e.TEXTURE_2D,o),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,A,A,0,e.RGBA,e.UNSIGNED_BYTE,null),o})();for(const[o,c]of[[e.TEXTURE_MIN_FILTER,e.LINEAR],[e.TEXTURE_MAG_FILTER,e.LINEAR],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,o,c);Ee=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,Ee),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,le,0)}e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,Ee),e.viewport(0,0,A,A),e.useProgram(p.P.deck.p),e.uniform4fv(p.P.deck.uP,ne),e.uniform4f(p.P.deck.uQ,A,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,A,A),e.useProgram(p.P.comp.p),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,le),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ne),e.uniform4fv(p.P.comp.uP,ne),e.uniform4f(p.P.comp.uQ,A,0,0,0),e.drawArrays(e.TRIANGLES,0,3)};return Ie(),(t,a)=>{a=Math.min(Math.max(a||0,0),.1),ee+=a,Ue(),lt(a);let s=a;for(;s>1e-6;){const o=Math.min(s,.05);nt(o),s-=o}Ie()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
