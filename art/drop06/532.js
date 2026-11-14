// Under the Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/532.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fe){Fe&&function(){"use strict";const ht={yaw:0,pitch:0,x:0,y:0,z:0},K=(t,s,v)=>t<s?s:t>v?v:t,H=Math.PI*2,ye=34,fe=512,U=32,ft=256,He=12,Ue=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Q=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,we=`
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) * (1. / 16777216.); }
`,ut=we+`
out vec4 oC;
float gn(vec2 p, uint k) {
  vec2 i = floor(p), f = p - i, u = f * f * f * (f * (f * 6. - 15.) + 10.);
  float r[4];
  for (int j = 0; j < 4; j++) {
    ivec2 o = ivec2(j & 1, j >> 1), c = (ivec2(i) + o + 32) % 32;
    float a = hf(uint(c.x) + uint(c.y) * 32u + k * 1024u + 77u) * 6.2831853;
    r[j] = dot(vec2(cos(a), sin(a)), f - vec2(o));
  }
  return mix(mix(r[0], r[1], u.x), mix(r[2], r[3], u.x), u.y);
}
void main() {
  vec2 p = gl_FragCoord.xy / 8.;
  vec4 v;
  for (int k = 0; k < 4; k++) v[k] = gn(p, uint(k));
  oC = clamp(v * .78 + .5, 0., 1.);
}`,Y=we+`
uniform vec4 uP[${ye}];
uniform sampler2D uN, uL, uB, uD, uV;
#define CAM uP[0].xyz
#define TANH uP[0].w
#define TIME uP[2].w
#define SUN uP[3].w
#define EXT uP[21].xyz
#define ZI int(uP[30].x)
#define NH (2 + int(uP[30].z))
float N1(vec2 p, float fp) { return textureLod(uN, p * .03125, log2(max(fp * 8., 1.))).r; }
vec4 N4(vec2 p, float fp) { return textureLod(uN, p * .03125, log2(max(fp * 8., 1.))); }
vec3 Lw(vec3 d) {
  vec3 hor = uP[28].rgb;
  vec3 c = mix(vec3(0., .0015, .006), hor * .45, smoothstep(-.95, -.2, d.y));
  c = mix(c, hor, smoothstep(-.25, .04, d.y));
  return mix(c, hor * vec3(.9, 1.08, 1.1) * 1.3, smoothstep(.02, .4, d.y));
}
float hg(float c, float g) { return (1. - g * g) / pow(1. + g * g - 2. * g * c, 1.5) * .08; }
vec3 tmap(vec3 c) {
  c *= uP[28].w;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
`,ne=`
float keelZ(float x) { return uP[11].x + 1.1 * sin(.11 * x + uP[12].x) + .5 * sin(.29 * x + 2. * uP[12].x); }
// the ice underside (m, 0 = mean); higher = thinner ice
float hC(vec2 q) {
  float h = uP[6].w * sin(dot(uP[6].xy, q) + uP[6].z) + uP[7].w * sin(dot(uP[7].xy, q) + uP[7].z)
          + uP[8].w * sin(dot(uP[8].xy, q) + uP[8].z) + uP[9].w * sin(dot(uP[9].xy, q) + uP[9].z)
          + uP[10].w * sin(dot(uP[10].xy, q) + uP[10].z);
  float dz = q.y - keelZ(q.x);
  return h - uP[12].y * exp(-dz * dz * .05);
}
`,dt=`
// three fbm octave stacks in one loop: the snow, the algae (same footprint) and the platelet clumps
vec3 fbm3(vec2 a, vec2 b, vec2 c, float fa, float fc) {
  float w = .5; vec3 s = vec3(0.);
  mat2 M = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4 + ZI; i++) {
    s += w * vec3(N1(a, fa), N1(b, fa), N1(c, fc));
    a = M * a + vec2(3.1, 1.7); b = M * b + vec2(3.1, 1.7); c = M * c + vec2(3.1, 1.7); fa *= 2.; fc *= 2.; w *= .5;
  }
  return s / .9375;
}
float gCl = 0.;
// distance to the nearest crack (m) and its local half width
float crackD(vec2 q, float fp, out float wd, out float tv) {
  float best = 1e3; wd = .05; tv = .5;
  vec2 j = (N4(q * 2.3, fp * 2.3).xy - .5) * .05 + (N4(q * 9.1, fp * 9.1).zw - .5) * .02;
  for (int k = 0; k < 3 + ZI; k++) {
    vec4 A = k == 0 ? uP[13] : (k == 1 ? uP[15] : uP[17]);
    vec4 B = k == 0 ? uP[14] : (k == 1 ? uP[16] : uP[18]);
    if (B.w > .5) {
      vec2 r = q + j - A.xy;
      float u = dot(r, A.zw), v = dot(r, vec2(-A.w, A.z));
      float Ls = 2.4 + 2.2 * fract(B.y * .37), s = u / Ls, i0 = floor(s);
      uint sd = uint(B.y * 977.);
      float o0 = hf(uint(int(i0) + 4096) * 2654435761u ^ sd), o1 = hf(uint(int(i0) + 4097) * 2654435761u ^ sd);
      float sl = (o1 - o0) * B.x * .9, vc = mix(o0, o1, s - i0) * B.x * .9 * Ls;     // (A.xy is shifted so vertex 0 sits on the start point)
      float d = abs(v - vc) / sqrt(1. + sl * sl);
      if (k > 0 && u < 0.) d = length(vec2(u, v - vc));    // a side crack ends where it meets the first
      // a refrozen lead: near-parallel edges; tv = how thin its new ice is
      float w = B.z * (.75 + .35 * smoothstep(.3, .7, N1(vec2(u * .12, B.y * 7.), fp * .12)) + .1 * N1(vec2(u * 1.7, B.y * 3.), fp * 1.7));
      if (d < best) { best = d; wd = w; tv = smoothstep(.3, .75, N1(vec2(u * .55 + 4.1, B.y * 5.), fp * .55)); }
    }
  }
  return best;
}
// overcast transmitted radiance just under the ice (sky = 1), without the platelet texture or hole interiors
float gCr = 0.;
vec3 ceilT(vec2 q, float fp) {
  vec2 w = uP[19].xy;
  vec2 r = vec2(dot(q, w), dot(q, vec2(-w.y, w.x)));
  // the snow on top in soft-edged patches metres wide, long in the wind: drifts dark, swept ice bright
  vec3 F3 = fbm3(r * vec2(.07, .15) + 11.3, q * .3 + 3.7, q * 2.4 + 4.1, fp * .3, fp * 2.4);
  float sf = F3.x; gCl = F3.z;
  float S = uP[19].z + uP[19].w * ((smoothstep(.5 - uP[24].x, .5 + uP[24].x, sf) - .5) * 2. + .5 * (sf - .5));
  S += .1 * (N1(q * .8 + 5., fp * .8) - .5) + .05 * (N1(q * 2.1 + 2., fp * 2.1) - .5);
  S = max(S, .02);
  float wd, tv, dc = crackD(q, fp, wd, tv);
  float we = max(wd, fp * .8);
  float band = smoothstep(we * 1.5 + fp, we * .2, dc) * wd / we;      // the lead's young ice, soft edged
  float halo = exp(-dc / (wd * 3. + .6));                             // thinner, scoured ice either side
  gCr = exp(-max(dc - wd, 0.) / .07);
  S *= mix(1., .3, smoothstep(wd * 7. + 1.6, 0., dc)) * (1. - .4 * band);
  float I = -.4 * hC(q) - .45 * halo;          // ice thickness minus 2 m (the swells are mostly in the snow, not the ice)
  vec3 T = mix(vec3(.3, .8, 1.), vec3(.13, .5, 1.), uP[23].x) * exp(-uP[20].w * (S - .25)) * exp(-vec3(1.4, .5, .38) * I);
  T *= 1. + band * (.4 + .3 * (N1(q * 6.3 + 1.9, fp * 6.3) - .5) + .7 * tv) * vec3(.4, .85, 1.);   // mottled nilas, brightest where thinnest
  T *= 1. + vec3(.3, .8, 1.) * (.2 * halo + .3 * exp(-dc / (wd * 6. + 1.3)));   // the glow bleeding into the scoured ice
  float A = uP[20].x * smoothstep(.46, .62, F3.y) * (.55 + .45 * smoothstep(.5, .1, S));
  T *= mix(vec3(1.), vec3(.86, .66, .3), A);
  float pl = uP[20].y * (.55 + .9 * N1(q * .45 + 9., fp * .45));
  T *= 1. - .22 * pl;
  for (int k = 0; k < NH; k++) {
    vec4 H = k == 0 ? uP[4] : (k == 1 ? uP[5] : uP[31]);
    if (H.w > 0.) { float rr = length(q - H.xz); T += vec3(.45, .9, 1.) * (.75 * exp(-max(rr - H.w * 1.3, 0.) / .6) + .5 * exp(-max(rr - H.w, 0.) / 1.8)); }
  }
  return T;
}
`,Te=`
#ifdef PTL
// the points' light: the light map at one level and the plain cone of each hole (no shaft noise, no curtains), cheap to compile
void light(vec3 p, vec3 d, out vec3 Ed, out vec3 Eh) {
  float D = max(hC(p.xz) - p.y, .05), sn = SUN;
  vec3 a = textureLod(uL, (p.xz + ${U}.) / ${2*U}., clamp(log2(1. + D * 3.), 0., 8.)).rgb;
  vec3 ls = normalize(vec3(-uP[22].x, -1., -uP[22].y));
  Ed = 3. * a * (1. + .8 * sn) * exp(-EXT * D) * mix(hg(d.y, .45), hg(dot(ls, -d), .8), .25 + .6 * sn);
  Eh = vec3(0.);
  for (int k = 0; k < NH; k++) {
    vec4 H = k == 0 ? uP[4] : (k == 1 ? uP[5] : uP[31]);
    vec3 v = p - H.xyz;
    float r2 = dot(v, v), r = sqrt(r2);
    if (H.w > 0. && -v.y > .05 * r) {
      vec2 q0 = v.xz / max(-v.y, .2), q = q0 + uP[22].xy * uP[23].z, dq = q0 + uP[22].xy;
      float cz = inversesqrt(1. + dot(q, q));
      float I = .7 * uP[24].w * H.w * H.w * 3.14 * (smoothstep(.25, .85, cz) * (.4 + .6 * cz) + exp(-dot(dq, dq) * 7.) * sn * 5.) / (r2 + H.w * H.w * 3.);
      float cs = dot(v / max(r, 1e-3), -d);
      Eh += mix(vec3(.55, .92, 1.), vec3(.95, .97, .8), uP[23].y) * I * exp(-EXT * r) * (1.5 * hg(cs, .92) + 1.2 * hg(cs, .75) + 2. * hg(cs, .35));
    }
  }
}
#else
// light scattered toward the camera at p (diffuse ceiling light and the hole beams), phase weighted
void light(vec3 p, vec3 d, out vec3 Ed, out vec3 Eh) {
  float D = max(hC(p.xz) - p.y, .05);
  vec3 att = exp(-EXT * D);
  vec2 uv = (p.xz + ${U}.) / ${2*U}.;
  vec3 a = textureLod(uL, uv, clamp(log2(1. + D * 9.), 0., 8.)).rgb;
  vec4 b4 = textureLod(uL, uv + uP[22].xy * D / ${2*U}., clamp(log2(1. + D * 1.1), 0., 8.)); vec3 b = b4.rgb;
  float sn = SUN;
  vec3 ls = normalize(vec3(-uP[22].x, -1., -uP[22].y));
  Ed = 3. * (mix(a, b * (1. + sn), .2 + .7 * sn) + vec3(.3, .8, 1.) * b4.a * (.5 + .8 * sn) * exp(-D * .1)) * att * mix(hg(d.y, .45), hg(dot(ls, -d), .8), .25 + .6 * sn);   // .a: the curtain of light hanging under each crack
  Eh = vec3(0.);
  for (int k = 0; k < NH; k++) {
    vec4 H = k == 0 ? uP[4] : (k == 1 ? uP[5] : uP[31]);
    vec3 v = p - vec3(H.x, H.y, H.z);
    float r2 = dot(v, v), r = sqrt(r2), cz = -v.y / max(r, 1e-3);
    if (H.w > 0. && cz > .05) {
      vec2 q0 = v.xz / max(-v.y, .2), q = q0 + uP[22].xy * uP[23].z;    // the cone leans away from the sun (once)
      cz = inversesqrt(1. + dot(q, q));
      float fq = mix(.85, 1., smoothstep(0., .3, sn)), dep = .97 - .25 * sn;    // overcast: the same deep shafts, broader and fewer
      float st = textureLod(uN, q * (.55 * fq) + vec2(TIME * .011 + 7.2, -TIME * .008 + 14.8), 0.).r;
      float s2 = textureLod(uN, q * (1.6 * fq) + vec2(-TIME * .02, TIME * .015) + 5.3, 0.).g;
      float streak = mix(1., .05 + 3. * st * st * st * (.4 + s2), dep) / (1. - .25 * dep);   // the gaps dark, the light kept
      vec2 dq = q0 + uP[22].xy;
      float beam = exp(-dot(dq, dq) * 7.) * sn * 5.;
      float I = uP[24].w * H.w * H.w * 3.14 * (smoothstep(.25, .85, cz) * (.4 + .6 * cz) + beam) * streak / (r2 + H.w * H.w * 3.);
      float cs = dot(v / max(r, 1e-3), -d);
      Eh += mix(vec3(.55, .92, 1.), vec3(.95, .97, .8), uP[23].y) * I * exp(-EXT * r) * (1. - .35 * smoothstep(.6, .95, d.y)) * ((1.5 - .7 * smoothstep(.55, .9, d.y)) * hg(cs, .92) + 1.2 * hg(cs, .75) + 2. * hg(cs, .35));
    }
  }
}
#endif
`,Ce=`in vec2 vUV; out vec4 oC;
#if !KEEL
// the sea floor far below: a gently sloping silt plain that falls away over a drop-off
float hF(vec2 q) {
  float u = dot(q, uP[29].yz);
  // the drop-off's lip wanders in bays and spurs at several scales, and its face is gullied and slumped
  // (kept out of the opening frame: gated by direction from the opening eye, so the home's floor is as it was)
  vec3 gv = vec3(q.x, -uP[29].x, q.y) - uP[32].xyz;
  float gF = smoothstep(uP[32].w, uP[33].w, dot(normalize(gv), uP[33].xyz));
  float e = u - uP[29].w + 6. * (N1(q * .06 + 1.3, 0.) - .5) + 2.5 * (N1(q * .27 + 5.1, 0.) - .5);
  if (gF > 0.) e += gF * (16. * (N1(q * .021 + 6.6, 0.) - .5) + 6.5 * (N1(q * .14 + 2.6, 0.) - .5) + 2.6 * (N1(q * .61 + 3.9, 0.) - .5));
  float dr = smoothstep(-1.5, 4., e), fc = dr * (1. - dr) * 4. * gF;
  return -uP[29].x + .12 * u - 14. * dr + 2.2 * (N1(q * .09 + 7.1, 0.) - .5) + .6 * (N1(q * .37 + 2.3, 0.) - .5) + fc * 2.4 * (N1(q * .45 + 8.8, 0.) - .5);
}
#endif
#if KEEL
// the keel's depth along its length: broad lobes and narrower hanging tongues, so its lower edge is ragged, not a ruler line
float keelD(float x) { return uP[11].y * (.45 + .85 * N1(vec2(x * .055, 3.7), 0.) + .7 * max(N1(vec2(x * .19, 8.3), 0.) - .45, 0.)); }
float keelSD(vec3 p, out float id, out float ly) {   // ly: where p sits across the slab's thickness, -1 old underside .. 1 old top
  float zc = keelZ(p.x), D = keelD(p.x);
  float dep = clamp(-p.y / D, 0., 1.2);
  float env = max(abs(p.z - zc) - uP[11].z * (1. - .85 * dep * dep) - .3, -p.y - D);
  float b = 1e3; id = -1.; ly = 0.;
  for (int k = 0; k < 16 + ZI; k++) {     // two interleaved grids: big tumbled slabs and smaller rubble
    int L = k >> 3;
    float cs = uP[12].w * (L == 0 ? 1. : .55);
    vec3 off = L == 0 ? vec3(0.) : vec3(.37, .21, .53) * uP[12].w;
    vec3 g = (p + off) / cs, ic = floor(g), o = step(.5, g - ic) - 1.;
    vec3 c = ic + o + vec3(float(k & 1), float((k >> 1) & 1), float((k >> 2) & 1));
    uvec3 u = uvec3(ivec3(c) + 4096);
    uint hh = hsh(u.x * 73856093u ^ u.y * 19349663u ^ u.z * 83492791u ^ uint(uP[12].z) ^ uint(L * 977));
    vec3 rr = vec3(hf(hh), hf(hh + 1u), hf(hh + 2u));
    vec3 ct = (c + .5 + (rr - .5) * .3) * cs - off;
    float Dc = keelD(ct.x), dc = clamp(-ct.y / Dc, 0., 1.2);
    float ec = max(abs(ct.z - keelZ(ct.x)) - uP[11].z * (1. - .85 * dc * dc) - .3, -ct.y - Dc);
    if (ec < .3 * cs && hf(hh + 3u) > (L == 0 ? .06 : .45) && (L == 0 || ct.y < -1.2)) {    // no loose rubble up at the root
      // jammed at steep angles: most plates tipped 35-85 degrees
      float a = hf(hh + 4u) * 6.283, t1 = (hf(hh + 5u) > .5 ? 1. : -1.) * (.6 + .9 * hf(hh + 13u)), t2 = (hf(hh + 6u) - .5) * 1.2;
      vec3 q = p - ct;
      q.xz = mat2(cos(a), sin(a), -sin(a), cos(a)) * q.xz;
      q.xy = mat2(cos(t1), sin(t1), -sin(t1), cos(t1)) * q.xy;
      q.yz = mat2(cos(t2), sin(t2), -sin(t2), cos(t2)) * q.yz;
      vec3 hs = cs * vec3(.34 + .28 * rr.x, .1 + .1 * hf(hh + 7u), .28 + .26 * rr.z) * (.78 + .14 * hf(hh + 8u));   // rotated extent stays inside the 2-cell search
      q.y /= 1. + .45 * (hf(hh + 17u) - .5) * clamp(q.x / hs.x, -1., 1.);    // plates thin toward one end
      float rd = min(.42 * hs.y, .09 * cs);    // broken edges worn round by a season of melt
      vec3 dq = abs(q) - hs + rd;
      float bd = length(max(dq, 0.)) + min(max(dq.x, max(dq.y, dq.z)), 0.) - rd;
      // broken off at random angles: two corner cuts make irregular slabs, worn round
      vec2 cd = normalize(vec2(hf(hh + 9u), hf(hh + 10u)) - .5 + 1e-3);
      float c1 = dot(q.xz, cd) - hs.x * (.5 + .45 * hf(hh + 11u)), c2 = dot(q.xz, vec2(-cd.y, cd.x)) - hs.z * (.5 + .5 * hf(hh + 12u));
      float hk = max(rd - abs(bd - c1), 0.); bd = max(bd, c1) + hk * hk * .25 / rd;
      hk = max(rd - abs(bd - c2), 0.); bd = max(bd, c2) + hk * hk * .25 / rd;
      vec2 ce = normalize(vec2(hf(hh + 14u), hf(hh + 15u)) - .5 + 1e-3);    // a snapped end, oblique through the thickness
      float c3 = dot(q.xy, ce) - hs.x * (.55 + .4 * hf(hh + 16u));
      hk = max(rd - abs(bd - c3), 0.); bd = max(bd, c3) + hk * hk * .25 / rd;
      if (bd < b) { id = float(hh & 1023u); ly = clamp(q.y / hs.y, -1., 1.); }
      float sk = .22 * cs, sh = max(sk - abs(bd - b), 0.) / sk;
      b = min(b, bd) - sh * sh * sk * .25;     // neighbours frozen together at their contacts
    }
  }
  // the consolidated core behind the blocks: its face bulges and recedes, so no flat wall shows between them
  float core = env + uP[12].w * (.95 + 1.1 * (N1(vec2(p.x * .16, p.y * .23) + p.z * .05 + 4.4, 0.) - .5) + .45 * (N1(vec2(p.x * .43 + p.z * .2, p.y * .5) + 1.9, 0.) - .5));
  if (core < b) { b = core; id = -1.; ly = 0.; }
  // lumpy, melt-sculpted mass: metre-scale swelling breaks the flat faces and straight silhouettes; fine frost on top
  float lump = .55 * (N1(p.xz * .23 + p.y * .19 + 2.1, 0.) - .5) + .3 * (N1(p.zy * .61 + p.x * .47 + 5.3, 0.) - .5);
  return b + lump * uP[12].w * .45 + .07 * (N1(p.xz * .7 + p.y * .6, 0.) - .5) + .02 * (N1(p.zy * 2.9 + p.x * 1.7, 0.) - .5);
}
#endif
void main() {
  vec2 qn = vUV * 2. - 1.;
  vec3 o = CAM, d = normalize(uP[1].xyz + (qn.x * uP[2].xyz + qn.y * uP[3].xyz) * TANH);
  float pa = 2. * TANH / uP[1].w;      // pixel angle
  float tH = 3000.; vec3 col = Lw(d);
  // ceiling heightfield
  float hMax = abs(uP[6].w) + abs(uP[7].w) + abs(uP[8].w) + abs(uP[9].w) + abs(uP[10].w);
  float hMin = -hMax - uP[12].y;
  float tc = 3000.;
  bool lmM = uP[30].y > .5;     // light-map mode: just the ice's transmitted light on a plane
  if (d.y > .003 && !lmM) {
    float t0 = max((hMin - o.y) / d.y, 0.), t1 = min((hMax - o.y) / d.y, 400.);
    float ta = t0, tb = t1, dtm = (t1 - t0) / 56.;
    for (int i = 0; i < 56 + ZI; i++) {
      float t = t0 + dtm * float(i + 1);
      vec3 p = o + d * t;
      if (p.y > hC(p.xz)) { tb = t; ta = t - dtm; break; }
    }
    for (int i = 0; i < 7 + ZI; i++) {
      float t = .5 * (ta + tb); vec3 p = o + d * t;
      if (p.y > hC(p.xz)) tb = t; else ta = t;
    }
    tc = tb;
  }
  if (lmM) tc = 1.;
  // keel: one loop, one keelSD call site (march, then 4 normal taps, then 4 probes: occlusion outward, open water above)
  float tk = 3000.;
#if KEEL
  float kid = -1., kly = 0., cs = uP[12].w, occ = 0., opn = 1.;
  vec3 n = vec3(0.);
  if (uP[11].w > .5) {
    float zl = uP[11].x - uP[11].z - 3.5, zh = uP[11].x + uP[11].z + 3.5;
    float ea = -1e4, eb = 1e4;
    if (abs(d.z) > 1e-4) { float a1 = (zl - o.z) / d.z, a2 = (zh - o.z) / d.z; ea = min(a1, a2); eb = max(a1, a2); }
    else if (o.z < zl || o.z > zh) eb = -1.;
    ea = max(ea, 0.); eb = min(min(eb, tc), 90.);
    if (eb > ea) {
      float t = ea, id, ly, e = .02;
      int ph = 0, j = 0;
      vec3 p0 = o;
      for (int i = 0; i < 138 + ZI; i++) {
        vec3 sg = vec3(j == 0 || j == 3 ? 1. : -1., j >= 2 ? 1. : -1., j == 1 || j == 3 ? 1. : -1.);
        float hh = .14 * float(j + 1) * cs;
        vec3 q = ph == 0 ? o + d * t : (ph == 1 ? p0 + sg * e : (j < 3 ? p0 + n * hh : p0 + vec3(0., .5 * cs, 0.)));
        float s = keelSD(q, id, ly);
        if (ph == 0) {
          if (s < .004 * t + .003) { tk = t; kid = id; kly = ly; p0 = q; e = max(.02, pa * t); ph = 1; }
          else { t += max(s * .6, .01); if (t > eb || i >= 129) break; }
        } else if (ph == 1) {
          n += sg * s; j++;
          if (j == 4) { n = normalize(n); ph = 2; j = 0; }
        } else {
          if (j < 3) occ += max(hh - s, 0.) / hh; else { opn = smoothstep(-.3 * cs, .2 * cs, s); break; }
          j++;
        }
      }
    }
  }
  if (tk < tc) {
    vec3 p = o + d * tk;
    occ = clamp(1. - occ * .55, 0., 1.);
    float D = max(hC(p.xz) - p.y, 0.);
    vec3 Et = textureLod(uL, (p.xz + ${U}.) / ${2*U}., 4.).rgb * 3.;   // what the ice above lets through, ~2 m blur
    vec3 Ed = Et * exp(-EXT * D * .7 - .1 * max(D - 1., 0.));    // the blocks above shade the ones below
    float bh = kid < 0. ? .45 : hf(uint(kid + 2.) * 977u), fd = pa * tk;
    // detail in the face's own plane: a frost crust and melt pits bump the shading normal, brine channels streak it
    vec3 an = abs(n);
    vec2 fq = (an.x > max(an.y, an.z) ? p.zy : (an.y > an.z ? p.xz : p.xy)) + bh * 17.;
    vec4 g1 = N4(fq * vec2(1.4, 4.6), fd * 4.6), g2 = N4(fq * 3.3 + 7.7, fd * 3.3);
    n = normalize(n + (g2.xyz - .5) * .9 + (g1.xyz - .5) * .35);
    float up = n.y * .5 + .5;
    // matte, frosted sea-ice: snow-white slabs, pale blue-white ice, a few clear blue ones; granular frost and old snow
    vec3 alb = mix(vec3(.5, .74, .88), vec3(.9, .96, 1.), smoothstep(.3, .75, bh));
    alb = mix(alb, vec3(.26, .52, .72), smoothstep(.16, .02, bh));
    float fr = N1(p.xz * 2.3 + p.y * 1.9 + bh * 9., fd * 2.3) * .5 + N1(p.zy * 7.1 + p.x * 5.3, fd * 7.1) * .3 + N1(p.xy * 19. + p.z * 11., fd * 19.) * .2;
    alb *= (.72 + .5 * fr) * (.66 + .7 * g1.w) * (kid < 0. ? .8 : .55 + .8 * hf(uint(kid + 5.) * 7919u));   // each block its own tone
    // the floe's own layers where a slab is broken through: a snow-ice cap, clear columnar ice, a brown algal band at the old underside
    float lw = kly + .2 * (g2.w - .5) + .12 * (g1.z - .5);
    alb = mix(alb, vec3(.93, .97, 1.) * (.85 + .3 * fr), smoothstep(.45, .7, lw) * .85);
    alb *= mix(vec3(1.), vec3(.6, .84, .97), smoothstep(.45, .1, abs(lw)) * .55);
    alb = mix(alb, vec3(.5, .38, .2) * (.7 + .6 * g2.w), smoothstep(-.5, -.8, lw) * (.4 + .5 * uP[20].x) * step(.2, fract(bh * 7.3)));
    // undersides of overturned plates stained brown by ice algae, in patches
    float dn = smoothstep(-.1, -.6, n.y);
    float alg = smoothstep(.42, .66, N1(p.xz * .9 + p.y * .7 + bh * 5., fd)) * (.35 + uP[20].x) * step(.4, fract(bh * 7.3));
    alb = mix(alb, vec3(.55, .42, .22), min(alg * (.4 + .6 * dn), 1.) * .8);
    // light from the ice overhead, a little up-welling, a soft blue glow through thinner plates
    // old snow caught on the plates in patches, darker meltwater streaks down the faces
    float sn = smoothstep(.5, .72, N1(p.xz * .55 + p.y * .4 + bh * 13., fd * .55)) * smoothstep(-.2, .5, n.y);
    alb = mix(alb, vec3(.95, .98, 1.), sn * .8) * (.75 + .5 * N1(vec2(p.x * 1.7 + p.z * 1.3, p.y * .25), fd * 1.7)) * (.8 + .4 * N1(p.xy * 1.1 + p.z * .9 + 3.3, fd * 1.1));
    col = Ed * alb * (.2 + .8 * pow(up, 1.6)) * occ * (.75 + .25 * opn) * 3.8;
    col += Ed * vec3(.2, .55, .85) * .12 * (1. - up) * occ;
    col *= 1. + 1.3 * exp(-D * .6);    // the root of the ridge, close under the ice, catches the most light
    col *= .25;
    col = mix(col, Lw(d) * .85, 1. - exp(-.13 * max(tk - 3., 0.) - .05 * D));   // dissolving into the blue
    vec3 T = exp(-EXT * tk);
    col = col * T + Lw(d) * (1. - T);
    tH = tk;
  } else discard;     // the keel pass only overwrites what the keel covers
#else
  if (tc < 2999.) {
    vec3 p = o + d * tc;
    float fp = pa * tc / max(d.y, .08);
    if (lmM) { p = vec3((vUV * 2. - 1.) * ${U}., 0.).xzy; fp = .125; }
    vec3 L = ceilT(p.xz, fp);
    if (lmM) { oC = vec4(min(L / 3., 1.), gCr); return; }
    // platelet layer: soft clumps at distance, overlapping loose plates up close
    float cl = gCl;
    float tex = .66 + .62 * cl * (.75 + .5 * N1(p.xz * 7.3 + 1.1, fp * 7.3));
    float pk = 0.;
    for (int lay = 0; lay < 2 + ZI; lay++) {
      float cs = lay == 0 ? .05 : .085;
      float fade = 1. - smoothstep(.12, .55, fp / cs);
      if (fade > 0.) {
        vec2 g = p.xz / cs + float(lay) * 17.3, i0 = floor(g), f = g - i0;
        float d1 = 9., d2 = 9., v1 = 0., s1 = 0.;
        for (int j = 0; j < 9 + ZI; j++) {
          vec2 oo = vec2(float(j % 3 - 1), float(j / 3 - 1));
          ivec2 ci = ivec2(i0 + oo) + 50000;
          uint hh = hsh(uint(ci.x) * 1664525u ^ uint(ci.y) * 22695477u ^ uint(lay * 7919 + 13));
          vec2 dd = f - oo - vec2(hf(hh), hf(hh + 1u));
          float an = hf(hh + 2u) * 3.1416;
          vec2 ax = vec2(cos(an), sin(an));
          float along = dot(dd, ax);
          float dist = length(vec2(along, dot(dd, vec2(-ax.y, ax.x)) * 1.9));
          if (dist < d1) { d2 = d1; d1 = dist; v1 = hf(hh + 3u); s1 = along; } else if (dist < d2) d2 = dist;
        }
        float e = smoothstep(.1, .0, d2 - d1) * smoothstep(-.1, .3, s1);
        float pv = (.86 + .3 * v1 * v1) * (.82 + .3 * smoothstep(-.45, .45, s1)) + e * .3 * v1;
        tex *= mix(1., pv, fade * uP[20].y * (lay == 0 ? .28 : .36));
        pk += e * fade * v1;
      }
    }
    L *= tex * mix(1., 1.08, uP[20].y) * .8;
    L = mix(L, vec3(dot(L, vec3(.25, .45, .3))) * vec3(.8, 1., 1.05), .12 * uP[20].y);
    // round each breathing hole the ice is thinned and rounded and glows (the shaft itself is drawn by FS_HOLE)
    float gn1 = N1(p.xz * 1.3 + 4.4, 0.), gn2 = smoothstep(.3, .65, N1(p.xz * 2.2 + 8.1, 0.));
    for (int k = 0; k < NH; k++) {
      vec4 H = k == 0 ? uP[4] : (k == 1 ? uP[5] : uP[31]);
      float rl = length(p.xz - H.xz);
      if (H.w > 0.) L *= 1. + .55 * smoothstep(H.w * (1.7 + .9 * gn1), H.w * 1.25, rl) * gn2;   // thinner in uneven patches
    }
    vec3 T = exp(-EXT * mix(tc, -o.y / max(d.y, .003), smoothstep(8., 25., tc)));
    col = L * T + Lw(d) * (1. - T);
    tH = tc;
  } else if (d.y > .003) tH = 2900.;
  else if (d.y < -.06) {
    float t0 = max((-uP[29].x + 5. - o.y) / d.y, 0.), t1 = min((-uP[29].x - 18. - o.y) / d.y, 95.);
    float ta = t0, tb = -1., dtm = (t1 - t0) / 40.;
    vec2 gr = vec2(0.);
    int ph = 0, j = 0;
    for (int i = 0; i < 52 + ZI; i++) {    // one hF call site: march, then bisection, then four gradient taps
      float t = ph == 0 ? t0 + dtm * float(i + 1) : (ph == 1 ? .5 * (ta + tb) : tb);
      vec3 q = o + d * t;
      vec2 e2 = vec2(j < 2 ? .15 : 0., j < 2 ? 0. : .15) * ((j & 1) == 0 ? 1. : -1.);
      float h = hF(q.xz + (ph == 2 ? e2 : vec2(0.)));
      if (ph == 0) { if (q.y < h) { tb = t; ta = t - dtm; ph = 1; } else if (i >= 39) break; }
      else if (ph == 1) { if (q.y < h) tb = t; else ta = t; j++; if (j == 6) { ph = 2; j = 0; } }
      else { float sh = (j & 1) == 0 ? h : -h; if (j < 2) gr.x += sh; else gr.y += sh; j++; if (j == 4) break; }
    }
    if (tb > 0.) {
      vec3 p = o + d * tb;
      gr /= .3;
      vec3 n = normalize(vec3(-gr.x, 1., -gr.y));
      float fp = pa * tb / max(-d.y, .15);
      // silt mottled by drift and scattered dropstones
      float m1 = N1(p.xz * 1.1 + 4.4, fp * 1.1), m2 = N1(p.xz * 3.7 + 1.7, fp * 3.7);
      vec3 alb = vec3(.62, .62, .55) * (.7 + .5 * m1) * (.85 + .3 * m2);
      alb = mix(alb, vec3(.3, .33, .32), smoothstep(.66, .72, N1(p.xz * .8 + 9.3, fp * .8)) * .8);
      // sponges, sea stars and soft corals: small pale shapes
      vec2 g = p.xz / 1.1, ic = floor(g), f = g - ic;
      uint h = hsh(uint(int(ic.x) + 50000) * 73856093u ^ uint(int(ic.y) + 50000) * 19349663u ^ 5381u);
      float r = hf(h);
      float dens = smoothstep(.38, .68, N1(p.xz * .13 + 3.3, fp * .13));    // life gathers in patches
      if (r < .62 * dens) {
        vec2 cc = .28 + .44 * vec2(hf(h + 1u), hf(h + 2u));
        float rad = (.07 + .16 * hf(h + 3u) * hf(h + 3u)) / 1.1, fq = fp / 1.1;
        vec2 df = f - cc; df.x *= .7 + .6 * hf(h + 4u);
        float cov = smoothstep(rad + fq, rad * .5 - fq, length(df) * (1. + .35 * (N1(f * 9. + float(h & 63u), 0.) - .5))) * min(rad / max(fq, 1e-4), 1.);
        vec3 ca = r < .3 * dens ? vec3(1., .96, .82) : (r < .42 * dens ? vec3(.95, .5, .36) : vec3(.85, .9, .9));
        alb = mix(alb, ca * (1. + .5 * hf(h + 5u)), cov);
      }
      float D = max(hC(p.xz) - p.y, 0.);
      vec3 Et = textureLod(uL, (p.xz + ${U}.) / ${2*U}., 6.).rgb * 3.;
      col = Et * exp(-EXT * D * .5) * alb * (.25 + .9 * max(n.y, 0.)) * vec3(1.6, 2.6, 1.9);
      vec3 T = exp(-EXT * tb * .5) * smoothstep(58., 32., tb);
      col = col * T + Lw(d) * (1. - T);
      tH = tb;
    }
  }
#endif
#ifdef E8
  float tE = min(tH, 2990.);
  oC = vec4(col / (col + uP[25].z), tE / (tE + uP[25].w));
#else
  oC = vec4(col / uP[25].z, min(tH, 2990.) / uP[25].w);
#endif
}`,vt=`in vec2 vUV; out vec4 oC;
void main() {
  vec2 qn = vUV * 2. - 1.;
  vec3 o = CAM, d = normalize(uP[1].xyz + (qn.x * uP[2].xyz + qn.y * uP[3].xyz) * TANH);
  float pa = 2. * TANH / uP[1].w;
  if (d.y < .02) discard;
  vec3 col = vec3(0.); float cov = 0., tc = 0.;
  for (int k = 0; k < NH; k++) {
    vec4 H = k == 0 ? uP[4] : (k == 1 ? uP[5] : uP[31]);
    float t = (H.y - o.y) / d.y;
    for (int i = 0; i < 3 + ZI; i++) { vec3 p = o + d * t; t += (hC(p.xz) - p.y) / d.y; }   // the underside near the hole
    vec3 p = o + d * t;
    vec2 rq = p.xz - H.xz;
    float rl = length(rq), fp = pa * t / max(d.y, .08);
    vec2 dn = rq / max(rl, 1e-4);
    vec4 nr = N4(dn * 1.3 + float(k) * 9.1, 0.), nm = N4(dn * 3.4 + float(k) * 2.7, 0.), nf = N4(dn * 9. + float(k) * 4., 0.);
    // a ragged gap, not a lens: slow lobes, then bites reamed by teeth and refrozen shelves jutting in, then loose plates
    float irr = 1. + .3 * (nr.x - .5) + .12 * (nr.y - .5) + .1 * (nm.x - .5) + .07 * smoothstep(.57, .61, nm.y) - .06 * smoothstep(.6, .63, nm.w);
    float rb = H.w * 1.35 * irr, rf = rb * (1. + .05 * (nf.x - .5) + .035 * (nf.y - .5) + .03 * smoothstep(.56, .6, nf.w));
    float lw = H.w * (.14 + .08 * nr.w) + fp * 1.5;    // the lip: the ice's thick edge seen from beneath, dark on the near side
    vec2 tc2 = normalize(o.xz - H.xz + 1e-4);
    float nearS = smoothstep(-.1, .6, dot(dn, tc2));
    float lu = max(rl - rf, 0.) / lw, lc = nearS * smoothstep(1., .55, lu) * (.75 + .25 * nm.z);
    vec3 lcol = mix(vec3(.05, .2, .24), vec3(.12, .42, .5), lu) * (1.6 + .8 * nf.z);
    if (H.w > 0. && rl >= rf && rl < rf + lw) { col = lcol; tc = t; cov = lc; }
    if (H.w > 0. && rl < rf) {
      float s = 0., yy = 2.; vec2 wq = vec2(0.);
      bool done = false;
      for (int i = 0; i < 24 + ZI; i++) {
        s += .11;
        vec3 pp = p + d * s;
        float h01 = (pp.y - H.y) / 2.;
        float rr = H.w * irr * mix(1.35, .78, clamp(h01, 0., 1.));
        if (!done && (length(pp.xz - H.xz) > rr || h01 > .92)) { yy = h01 > .92 ? 2. : h01; wq = pp.xz - H.xz; done = true; }
      }
      bool top = yy > 1.5;
      float hy = clamp(yy, 0., 1.);
      vec2 dw = wq / max(length(wq), 1e-4);
      vec3 pt = p + d * ((H.y + 1.84 - p.y) / max(d.y, .05));
      vec4 nz = N4(top ? pt.xz * 4.2 + float(k) * 5.7 : vec2(hy * 9. + dw.x * .15, dw.y * .25 + float(k) * 3.1), 0.);
      vec3 c2;
      if (top) c2 = mix(vec3(.8, .9, .97), vec3(1., .93, .8), uP[23].y) * (4.5 + 1.2 * nz.z) * (1. - .72 * min(smoothstep(.5, .64, nz.x) * .75 + smoothstep(.56, .68, nz.y) * .5, 1.));
      else {
        // the far wall: glassy blue-green low down, snow-white at the top, lit from above, banded, grooved by teeth
        vec4 ng = N4(dw * 5.5 + vec2(hy * .7, float(k) * 1.7), 0.);
        vec3 wc = mix(vec3(.12, .5, .66), vec3(.85, .95, 1.), smoothstep(.2, .6, hy + .2 * (nr.z - .5)));
        c2 = wc * mix(3., 13., smoothstep(.0, .55, hy)) * (.7 + .6 * nz.x) * (.75 + .25 * sin(hy * 45. + nz.y * 5.));
        c2 *= 1. - .45 * smoothstep(.5, .7, ng.x) * (1. - .5 * hy);   // vertical tooth grooves
        c2 = mix(c2, vec3(.7, .85, .9) * 3., .5 * smoothstep(.62, .72, ng.y) * smoothstep(.5, .1, hy));   // slush stuck to the wall
      }
      float ci = smoothstep(rf, rf - fp * 2., rl);
      col = mix(lcol, c2, ci); tc = t;
      cov = max(ci, lc);
    }
  }
  if (cov <= 0.) discard;
  vec3 T = exp(-EXT * mix(tc, -o.y / max(d.y, .003), smoothstep(8., 25., tc)));
#ifdef E8
  col = col * T + Lw(d) * (1. - T);
  oC = vec4(col / (col + uP[25].z), cov);
#else
  oC = vec4((col * T + Lw(d) * (1. - T)) / uP[25].z, cov);
#endif
}`,pt=`in vec2 vUV; out vec4 oC;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 B = texelFetch(uB, ip, 0);
  vec2 qn = vUV * 2. - 1.;
  vec3 o = CAM, d = normalize(uP[1].xyz + (qn.x * uP[2].xyz + qn.y * uP[3].xyz) * TANH);
  float sk = 1. + 1.25 * SUN;
#ifdef E8
  B /= max(1. - B, 1e-3);
#endif
  vec3 col = B.rgb * uP[25].z * sk;
  float tH = B.a * uP[25].w;
  if (d.y < -.06 && tH < 200.) {   // caustics dappling the sea floor
    vec3 pf = o + d * tH;
    if (pf.y < 6. - uP[29].x) {
      vec2 cq = pf.xz * .028;
      float n1 = textureLod(uN, cq + vec2(TIME * .0021, TIME * .0013), 0.).r;
      float n2 = textureLod(uN, cq * 1.31 + vec2(-TIME * .0016, TIME * .0024) + .37, 0.).g;
      float fw = smoothstep(.1, .4, tH * 3.2 * TANH / uP[1].w);
      col *= 1. + exp(-abs(n1 - n2) * 11.) * (1. - fw) * (.15 + 1.6 * SUN) * smoothstep(.35, .65, textureLod(uN, pf.xz * .006 + .2, 0.).b);
    }
  }
  // air pools under the ice: total internal reflection of the dark water below, wobbling
  int np = int(uP[25].x);
  for (int i = 0; i < ${He} + ZI; i++) {
    if (i >= np) break;
    vec4 A = texelFetch(uD, ivec2(i, 4), 0), W = texelFetch(uD, ivec2(i, 5), 0);
    if (d.y > .01) {
      float tp = (A.y - o.y) / d.y;
      if (tp < tH + .35 && tp > 0.) {
        vec3 p = o + d * tp;
        vec2 rq = p.xz - A.xz;
        float rl = length(rq);
        if (rl < A.w * 1.4) {
          vec2 dn = rq / max(rl, 1e-4);
          float rr = A.w * (1. + .5 * (N1(dn * 1.1 + W.w * 3.7, 0.) - .5) + .25 * (N1(dn * 2.7 + W.w * 1.3, 0.) - .5) + .07 * W.x * sin(W.y * 1.3 + dn.x * 3.)
                              + .05 * sin(TIME * 2.1 + dn.y * 4. + W.w));
          float cov = smoothstep(rr, rr - max(.012, tp * 2. * TANH / uP[1].w), rl);
          if (cov > 0.) {
            float e = W.x, ph = W.y;
            vec2 g = vec2(0.);
            g += e * .05 * vec2(cos(rq.x * 17. + ph * 1.7), cos(rq.y * 15. - ph * 1.3)) * 2.;
            g += e * .04 * dn * cos(rl * 32. - ph * 3.2) * exp(-rl / max(A.w, .05));
            g += .012 * vec2(sin(rq.y * 23. + TIME * 3.1 + W.w), sin(rq.x * 21. - TIME * 2.7));
            float edge = smoothstep(rr * .62, rr, rl);
            vec3 n = normalize(vec3(g.x + dn.x * edge * 1.6, -1., g.y + dn.y * edge * 1.6));
            float ci = -dot(d, n), si = sqrt(max(1. - ci * ci, 0.)) * 1.333;
            float F = si >= 1. ? 1. : .02 + .98 * pow(1. - sqrt(1. - si * si), 5.);
            vec3 R = reflect(d, n);
            vec3 Lr = (Lw(R) * 1.6 + uP[28].rgb * vec3(1.4, 1.2, 1.1) * 11. * smoothstep(-.95, -.05, R.y) + vec3(.6, .9, 1.) * 1.2 * pow(max(1. + R.y * 1.6, 0.), 6.)) * sk + col * .45;   // quicksilver: the lit water and the glow round it
            vec3 pc = mix(col * 1.08, Lr, F);
            pc *= 1. - .3 * smoothstep(rr * .9, rr, rl) * smoothstep(rr * 1.02, rr * .96, rl);   // the meniscus edge
            pc += vec3(.75, .93, 1.) * 1.6 * sk * smoothstep(rr * .8, rr * .9, rl) * smoothstep(rr * .97, rr * .9, rl);
            vec3 T = exp(-EXT * tp);
            pc = pc * T + Lw(d) * sk * (1. - T);
            col = mix(col, pc, cov);
          }
        }
      }
    }
  }
  vec2 vs = vec2(floor((uP[1].w + 1.) * .5)), vc = floor(vUV * vs + .5), va = vec2(uP[30].w), vp = min(vc + 1., vs - .5);   // a 4x4 box over the half-res dither (4 bilinear taps on texel corners); the target is shared across sizes (va), its tile is the bottom-left vs: taps past its top/right edge held on the edge texels (vp), as CLAMP_TO_EDGE did
#ifdef E8
  vec3 v0 = texture(uV, vp / va).rgb, v1 = texture(uV, vec2(vc.x - 1., vp.y) / va).rgb, v2 = texture(uV, vec2(vp.x, vc.y - 1.) / va).rgb, v3 = texture(uV, (vc - 1.) / va).rgb;
  col += (v0 / max(1. - v0, 1e-3) + v1 / max(1. - v1, 1e-3) + v2 / max(1. - v2, 1e-3) + v3 / max(1. - v3, 1e-3)) * .25;
#else
  col += (texture(uV, vp / va) + texture(uV, vec2(vc.x - 1., vp.y) / va) + texture(uV, vec2(vp.x, vc.y - 1.) / va) + texture(uV, (vc - 1.) / va)).rgb * .25;   // scattered light (half resolution, tent filtered)
#endif
  oC = vec4(tmap(col), 1.);
}`,xt=`in vec2 vUV; out vec4 oC;
void main() {
  ivec2 ip = ivec2(gl_FragCoord.xy), bs = ivec2(int(uP[1].w)) - 1;
  float tH = 1e4;
  for (int j = 0; j < 4 + ZI; j++) tH = min(tH, texelFetch(uB, min(ip * 2 + ivec2(j & 1, j >> 1), bs), 0).a);
#ifdef E8
  tH /= max(1. - tH, 1e-3);
#endif
  tH *= uP[25].w;
  vec2 qn = vUV * 2. - 1.;
  vec3 o = CAM, d = normalize(uP[1].xyz + (qn.x * uP[2].xyz + qn.y * uP[3].xyz) * TANH);
  float sk = 1. + 1.25 * SUN, tm = min(tH, 30.);
  int bi = (ip.x & 3) + ((ip.y & 3) << 2);
  float jit = (float((bi * 7) & 15) + .5) / 16.;
  vec3 acc = vec3(0.);
  for (int i = 0; i < 12 + ZI; i++) {
    float u = (float(i) + jit) / 12., t = tm * u * u, dt = tm * 2. * u / 12.;
    vec3 p = o + d * t, Ed, Eh;
    light(p, d, Ed, Eh);
    acc += (Ed * sk + Eh * (1. + 1.6 * SUN) * 3.) * exp(-EXT * t) * dt;
  }
#ifdef E8
  acc *= uP[21].w;
  oC = vec4(acc / (acc + 1.), 1.);
#else
  oC = vec4(acc * uP[21].w, 1.);
#endif
}`,mt=`out vec4 vC; out vec4 vA; flat out int vK; out float vZ;
vec3 rnd3(uint i) { return vec3(hf(i * 3u + 1u), hf(i * 3u + 2u), hf(i * 3u + 3u)); }
void main() {
  int id = gl_VertexID;
  int nM = int(uP[26].x), nK = nM + int(uP[26].y), nJ = nK + int(uP[26].z), nP = nJ + int(uP[26].w);
  uint sd = uint(uP[27].x) * 7919u;
  vec3 cam = CAM, p; float sz, alpha = 1., cof = -1e3; int k;   // cof: how far below the ice it is held (one hC call site)
  vec4 A = vec4(0.);
  vec2 cur = uP[22].zw;
  if (id < nM) {
    k = 0;
    vec3 r = rnd3(uint(id) + sd);
    vec3 b = r * 12. + vec3(sin(TIME * .07 + r.x * 40.), sin(TIME * .05 + r.y * 30.) * .4 - TIME * .012, cos(TIME * .06 + r.z * 50.)) * .5;
    b.xz += cur;
    p = cam + (fract((b - cam) / 12.) - .5) * 12.;
    sz = .005 + .022 * pow(hf(uint(id) * 5u + sd + 9u), 3.);
    A = vec4(hf(uint(id) + sd + 3u), 0., 0., 0.);
  } else if (id < nK) {
    k = 1;
    uint j = uint(id - nM) + sd + 1000u;
    vec3 r = rnd3(j);
    // one cloud grazing under the ice: dense core, ragged edge, all heading the same slow way
    vec3 g = (r - .5) * (r - .5) * (r - .5) * 8. + (rnd3(j + 77u) - .5) * .6;
    float ph = hf(j * 7u) * 6.28, dart = fract(TIME * (.13 + .1 * hf(j * 11u)) + ph);
    vec2 hd = vec2(cos(uP[23].w + .3 * sin(TIME * .05)), sin(uP[23].w + .3 * sin(TIME * .05)));
    vec3 b = vec3(uP[24].y, 0., uP[24].z) + vec3(g.x * 3.2, 0., g.z * 3.2) + vec3(hd.x, 0., hd.y) * (smoothstep(.0, .12, dart) * .06 + sin(TIME * .07 + r.x * 6.) * .4);
    b.xz += cur * 1.1;
    b.y = -.2 - 1.1 * abs(g.y) - .9 * r.y * r.y + .05 * sin(TIME * 1.3 + ph * 5.);
    p = b; cof = .04;
    sz = .014 + .01 * hf(j * 13u);
    vec2 sh = vec2(dot(vec3(hd.x, 0., hd.y), uP[2].xyz), dot(vec3(hd.x, 0., hd.y), uP[3].xyz));
    A = vec4(normalize(sh + 1e-4), hf(j * 17u), 0.);
  } else if (id < nJ) {
    k = 2;
    uint j = uint(id - nK) + sd + 3000u;
    vec3 r = rnd3(j);
    vec3 b = vec3(r.x * 14., 0., r.z * 14.) + vec3(sin(TIME * .04 + r.y * 9.), 0., cos(TIME * .035 + r.x * 7.)) * .8;
    b.xz += cur * .9;
    p.xz = cam.xz + (fract((b.xz - cam.xz) / 14.) - .5) * 14.;
    p.y = -.5 - 9. * r.y * r.y + .15 * sin(TIME * .3 + r.z * 20.);
    cof = .3;
    sz = .05 + .08 * pow(hf(j * 5u), 2.);
    A = vec4(sin(TIME * .11 + r.x * 30.) * .5 + (hf(j * 3u) - .5) * .8, hf(j * 9u), .65 + .3 * hf(j * 19u), 0.);
  } else if (id < nP) {
    k = 3;
    uint j = uint(id - nJ) + sd + 6000u;
    vec3 r = rnd3(j);
    float a = r.x * 6.2832, rr = 5.5 * sqrt(r.y);
    p.xz = uP[27].zw + vec2(cos(a), sin(a)) * rr;
    float hang = uP[20].z * pow(hf(j * 3u), 2.);
    if (uP[20].z > .5) {     // curtains: plates frozen into drapes a metre long, hanging in loose ranks
      uint cl = j / 9u; vec3 rc = rnd3(cl * 31u + 5u);
      float ca = rc.x * 6.2832, cr = 5.5 * sqrt(rc.y);
      p.xz = uP[27].zw + vec2(cos(ca), sin(ca)) * cr + (r.xy - .5) * vec2(.35, .08);
      hang = uP[20].z * (.25 + .75 * rc.z) * float(j % 9u) / 8.;
    }
    float sw = uP[27].y;
    p.xz += vec2(cur.x, cur.y) * 0. + normalize(vec2(uP[22].z, uP[22].w) + 1e-4) * sw * hang * .5 * (.6 + .4 * sin(TIME * 1.7 + r.z * 9.));
    p.y = 1e3; cof = .012 + hang;
    sz = .022 + .05 * pow(hf(j * 5u), 1.5);
    float tilt = .25 + .75 * hf(j * 7u);
    A = vec4(r.z * 6.28 + sw * .6 * sin(TIME * 1.3 + r.x * 20.) + .05 * sin(TIME * .7 + r.y * 30.), tilt, hf(j * 11u), 0.);
  } else {
    k = 4;
    int b = id - nP;
    vec4 Q = texelFetch(uD, ivec2(b & 63, b >> 6), 0);
    p = Q.xyz; sz = Q.w * 2.6;
    A = vec4(float(b), Q.w, 0., 0.);
  }
  float hc = hC(p.xz);
  p.y = min(p.y, hc - cof);
  vec3 v = p - cam;
  float z = dot(v, uP[1].xyz), dist = length(v);
  float px = sz * uP[1].w / (2. * TANH * max(z, .01));
  if (z < .12 || (k == 0 && dist < .25)) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; vK = -1; return; }
  vec2 sc = vec2(dot(v, uP[2].xyz), dot(v, uP[3].xyz)) / (z * TANH);
  gl_Position = vec4(sc, 0., 1.);
  float minpx = k == 0 ? 1.6 : (k == 4 ? 3.2 : 2.);
  if (px < minpx) alpha *= px * px / (minpx * minpx);
  float ps = max(px, minpx);
  gl_PointSize = clamp(k == 2 ? ps * 1.15 : (k == 1 ? ps * 1.6 : (k == 0 ? min(ps, 3.2 * uP[1].w / 1000.) : ps)), 1., 160.);   // near snow stays small flakes
  vec3 dd = v / max(dist, 1e-3), Ed, Eh;
  light(p, dd, Ed, Eh);
  float sk = 1. + 1.25 * SUN;
  vec3 L = Ed * sk + Eh * (1. + 1.6 * SUN);
  vec3 T = exp(-EXT * dist);
  // ambient from the lit ceiling for things near it
  float D = max(hc - p.y, 0.);
  vec3 amb = Lw(vec3(0., 1., 0.)) * sk * exp(-EXT * D * .5) * .5;
  vC = vec4((L * 14. + amb) * T, alpha * (.25 + .75 * T.b));
  vA = A; vK = k; vZ = dist;
  if (k == 2) vA.w = smoothstep(.15, .6, dot(Eh, vec3(1.)) / (dot(Ed + Eh, vec3(1.)) + 1e-4));    // inside a ray
}`,bt=`in vec4 vC; in vec4 vA; flat in int vK; in float vZ; out vec4 oC;
vec3 rb(float h) { return .5 + .5 * cos(6.2832 * (h + vec3(0., .33, .67))); }
void main() {
  if (vK < 0) discard;
#ifdef E8
  float tb = texelFetch(uB, ivec2(gl_FragCoord.xy), 0).a;
  tb = tb / max(1. - tb, 1e-3) * uP[25].w;
#else
  float tb = texelFetch(uB, ivec2(gl_FragCoord.xy), 0).a * uP[25].w;
#endif
  if (vZ > tb) discard;
  vec2 pc = gl_PointCoord * 2. - 1.; pc.y = -pc.y;
  vec3 L = vC.rgb; float al = vC.a;
  vec4 o = vec4(0.);
  if (vK == 0) {
    float r = length(pc), a = exp(-r * r * 4.) * smoothstep(1., .6, r);
    float gl = vA.x > .9 ? .6 + 2.4 * pow(.5 + .5 * sin(TIME * (2. + vA.x * 3.) + vA.x * 80.), 12.) : 1.;
    o = vec4(tmap(L * 1.6 * gl + vec3(.05, .12, .16)), 1.) * a * .85;
  } else if (vK == 1) {
    vec2 q = vec2(dot(pc, vA.xy), dot(pc, vec2(-vA.y, vA.x)));
    float e = length(q / vec2(.9, .26));
    float a = smoothstep(1., .55, e);
    vec3 c = L * vec3(1., .5, .38) * .55 + L * vec3(.4, .8, .3) * .5 * smoothstep(.5, .1, length(q - vec2(.15, 0.)) * 3.);
    o = vec4(tmap(c), 1.) * a * .7;
  } else if (vK == 2) {
    float an = vA.x;
    vec2 q = mat2(cos(an), sin(an), -sin(an), cos(an)) * pc;
    q /= vec2(.5, .95) * vA.z / .8;
    float e = length(q);
    if (e > 1.05) discard;
    float body = smoothstep(1., .82, e);
    float rim = smoothstep(.55, .97, e) * body;
    vec3 c = tmap(L * .6 + vec3(.02, .05, .07)) * (body * .02 + rim * .03);
    float ca = body * .01 + rim * .015;
    float cy = sqrt(max(1. - q.y * q.y, 0.));
    for (int i = 0; i < 4 + ZI; i++) {
      float s = i == 0 ? -.82 : (i == 1 ? -.32 : (i == 2 ? .3 : .8));
      float dx = abs(q.x - s * cy);
      float band = smoothstep(.08, .015, dx) * smoothstep(.95, .55, abs(q.y + .08));
      float ph = q.y * 2.2 - TIME * 1.6 + float(i) * .27 + vA.y * 7.;
      float spk = pow(.5 + .5 * sin(ph * 6.2832), 4.) * (.4 + .6 * fract(sin(floor(ph * 3.) * 91.3 + vA.y * 50.) * 4375.85));
      c += rb(fract(ph * .7 + vA.y)) * band * spk * (.5 + 1.1 * (1. - abs(s))) * vA.w * 1.5;
    }
    o = vec4(c, ca);
  } else if (vK == 3) {
    float an = vA.x;
    vec2 q = mat2(cos(an), sin(an), -sin(an), cos(an)) * pc;
    q.y /= vA.y;
    float e = length(q);
    vec2 dn = q / max(e, 1e-3);
    float rr = .78 + .2 * (textureLod(uN, dn * .09 + vA.z * 3.1, 0.).r - .5) * 2.4;
    if (e > rr || abs(q.y) > vA.y * 1.2) discard;
    float edge = smoothstep(rr - .2, rr - .03, e);
    vec3 c = tmap(L * .8) ;
    o = vec4(c, 1.) * (.12 + .5 * edge) * (.5 + .5 * vA.y);
    o.rgb *= 1. + .6 * pow(vA.z, 6.);
  } else {
    float r = length(pc * vec2(1., 1.25 + .12 * sin(TIME * 21. + vA.x)));
    if (r > 1.) discard;
    float rim = smoothstep(.55, .98, r);
    float top = .6 + .4 * pc.y;
    vec3 sil = tmap(L * .8 + Lw(vec3(0., .2, 0.)) * 3.) * (.5 + 1.1 * rim * top);
    float hl = smoothstep(.28, .0, length(pc - vec2(-.25, .45)));
    o = vec4(sil + hl * .6, .18 + .75 * rim);
    o.rgb *= o.a; o.rgb += hl * .4;
  }
  oC = o * al;
}`,yt=`in vec2 vUV; out vec4 oC;
void main() {
  vec3 c = texelFetch(uB, ivec2(gl_FragCoord.xy), 0).rgb;
  float g = hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u) - .5;
  oC = vec4(c + g * .004, 1.);
}`;function wt(t){if(t.__c532)return t.__c532;const s=!!t.getExtension("EXT_color_buffer_float"),v=s||!!t.getExtension("EXT_color_buffer_half_float"),r=v?"":`#define E8
`,G=(x,y)=>{const E=t.createShader(x);return t.shaderSource(E,y),t.compileShader(E),E},M={nz:[Q,ut],bake:[Q,`#define KEEL 0
`+Y+ne+dt+Ce],hole:[Q,Y+ne+vt],comp:[Q,Y+ne+Te+pt],vol:[Q,Y+ne+Te+xt],pt:[`#define PTL
`+Y+ne+Te+mt,Y+bt],fin:[Q,we+`uniform vec4 uP[${ye}]; uniform sampler2D uN, uL, uB, uD;
#define TIME uP[2].w
`+yt]},i={};M.bakeK=[Q,`#define KEEL 1
`+Y+ne+Ce];const g=x=>{const y=t.createProgram(),E=G(t.VERTEX_SHADER,Ue+r+M[x][0]),N=G(t.FRAGMENT_SHADER,Ue+r+M[x][1]);t.attachShader(y,E),t.attachShader(y,N),t.linkProgram(y),t.flush(),i[x]={p:y,v:E,f:N}},k=x=>{const{p:y,v:E,f:N}=i[x];if(!t.getProgramParameter(y,t.LINK_STATUS))throw new Error("532 "+x+": "+(t.getShaderInfoLog(E)||"")+(t.getShaderInfoLog(N)||"")+t.getProgramInfoLog(y));t.useProgram(y),["uN","uL","uB","uD","uV"].forEach((B,X)=>{const W=t.getUniformLocation(y,B);W&&t.uniform1i(W,X)}),i[x]={p:y,uP:t.getUniformLocation(y,"uP")}},q=t.getExtension("KHR_parallel_shader_compile");for(const x in M)x!=="bakeK"&&g(x);t.flush();const ee=x=>("uP"in i[x]||k(x),i[x]);ee("nz");const te=x=>{if(i.bakeK||g("bakeK"),!i.bakeK.uP){if(!x&&!(q&&t.getProgramParameter(i.bakeK.p,q.COMPLETION_STATUS_KHR)))return null;k("bakeK")}return i.bakeK},D=t.createVertexArray(),j=t.createTexture();t.bindTexture(t.TEXTURE_2D,j),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,null);const oe=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,oe),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,j,0),t.viewport(0,0,256,256),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);for(let x=0;x<5;x++)t.activeTexture(t.TEXTURE0+x),t.bindTexture(t.TEXTURE_2D,null);t.activeTexture(t.TEXTURE0),t.useProgram(i.nz.p),t.bindVertexArray(D),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(oe),t.bindTexture(t.TEXTURE_2D,j),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const Z=t.createTexture();return t.bindTexture(t.TEXTURE_2D,Z),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,64,8,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.__c532={P:i,use:ee,flt:s,hf:v,tN:j,tD:Z,vao:D,keel:te,pc:!!q,lm:new Map,bk:new Map,rt:{s:0,c:null,v:null},users:0}}function ue(t,s,v,r,G,M,i,g){const k=t.createTexture();t.bindTexture(t.TEXTURE_2D,k),t.texImage2D(t.TEXTURE_2D,0,r,s,v,0,G,M,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,g?t.LINEAR_MIPMAP_LINEAR:i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const q=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,q),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,k,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:k,fb:q,w:s,h:v}}const ie=(t,s)=>{t.deleteTexture(s.tex),t.deleteFramebuffer(s.fb)},Se=(t,s,v)=>{const r=s.rt;if(v>r.s){r.c&&(ie(t,r.c),ie(t,r.v));const G=Math.ceil(v/2);r.c=ue(t,v,v,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,!1),r.v=ue(t,G,G,s.hf?t.RGBA16F:t.RGBA8,t.RGBA,s.hf?t.HALF_FLOAT:t.UNSIGNED_BYTE,t.LINEAR,!1),r.s=v}return r},je=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{const s=t.G,v=t.gl;if(--s.users>0||v.isContextLost())return;const r=s.rt;r.c&&(ie(v,r.c),ie(v,r.v)),r.c=r.v=null,r.s=0}):null;Fe.add({num:532,name:"Under the Ice",fam:"Vistas",recipe:"Under two metres of sea ice in spring, where the light comes through green-blue, cracks show as lines of light and a seal's hole sends rays fanning down. The snow on top, the algae, the cracks and where you float change every mint. Tap to breathe out bubbles that pool under the ice like wobbly silver mirrors, drag to stir a slow current, or hold to let the sun come out.",interactive:"Tap to breathe out a burst of bubbles there: they rise and pool under the ice as wobbling quicksilver mirrors that creep uphill and merge. Drag to set a slow current drifting the motes and swaying the loose platelets. Hold to let the sun come out: the ceiling brightens and the shafts sharpen.",music:!0,gl:!0,fps:30,seed:0,make(t){const s=t.gl,v=t.size,r=wt(s),G=r.P;let M=2654435769;for(let e=2;e<t.hash.length;e+=8)M=Math.imul(M^parseInt(t.hash.slice(e,e+8),16),2246822507)>>>0;const i=()=>{M=M+1831565813|0;let e=Math.imul(M^M>>>15,1|M);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},g=e=>{let o=0;for(const n in e)o+=e[n];let a=i()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]};let k=g({"Wind drifts":40,"Patchy thin snow":35,"Deep drifts":15,"Bare blue ice":10}),q=g({"Platelet carpet":50,"Thin platelets":35,"Platelet curtains":15}),ee=g({"Faint algae":45,"Algae bloom":35,"Clean ice":20}),te=g({"One crack":50,"Crack network":35,"Refrozen lead":15}),D=g({"One breathing hole":82,"Two holes":18}),j=g({"Low ridge":25,"Pressure ridge":55,"Deep keel":20}),oe=g({"Clear spring water":55,"Plankton haze":30,"Crystal clear":15}),Z=g({"Comb jellies":50,"Krill swarm":35,"Jelly drift":15}),x=g({Overcast:55,"Thin sun":35,"Low sun":10});t.home&&(k="Patchy thin snow",q="Platelet carpet",ee="Faint algae",te="One crack",D="One breathing hole",j="Pressure ridge",oe="Clear spring water",Z="Comb jellies",x="Thin sun");let y=795581749;for(let e=2;e<t.hash.length;e+=8)y=Math.imul(y^parseInt(t.hash.slice(e,e+8),16),2654435761)>>>0;const E=()=>{y=y+1831565813|0;let e=Math.imul(y^y>>>15,1|y);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},N=[E(),E(),E(),E(),E(),E(),E()];D==="Two holes"&&!t.home&&N[6]<.4&&(D="Row of holes");let B=1821285621;for(let e=2;e<t.hash.length;e+=8)B=Math.imul(B^parseInt(t.hash.slice(e,e+8),16),668265263)>>>0;const X=()=>{B=B+1831565813|0;let e=Math.imul(B^B>>>15,1|B);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},W=[X(),X(),X(),X()];let O=t.home||N[0]<.64&&D!=="Row of holes"?"level":"deep";O==="level"&&!t.home&&(O=W[0]<.2?"up":W[0]<.42?"ridge":"level"),Z==="Jelly drift"&&(Z="Krill swarm");const Tt={level:"Level with the hole",deep:"From deep",up:"Under the hole"}[O]||"Along "+{"Low ridge":"a low ridge","Pressure ridge":"a pressure ridge","Deep keel":"a deep keel"}[j];t.trait("Snow",k),t.trait("Platelets",q),t.trait("Algae",ee),t.trait("Cracks",te),t.trait("Holes",D),t.trait("View",Tt),t.trait("Water",oe),t.trait("Life",Z),t.trait("Sky",x);const u=new Float32Array(ye*4),m=(e,o,a,n,c)=>{u[e*4]=o,u[e*4+1]=a,u[e*4+2]=n,u[e*4+3]=c},b={x:0,y:-(2.4+i()*.6),z:0},Ee=[];for(let e=0;e<5;e++){const o=i()*H,a=H/(3.5+11*Math.pow(i(),1.3));Ee.push([Math.cos(o)*a,Math.sin(o)*a,i()*H,(.05+.1*i())*(e<2?1.4:.8)*K(H/a/11,.3,1.1)])}Ee.forEach((e,o)=>m(6+o,e[0],e[1],e[2],e[3]));const ze=j==="Low ridge"?3.5:j==="Deep keel"?11:6.5,Pe=O==="ridge"?-(10+i()*2.5):-(16.5+i()*3),Me=i()*H,Be=.8+.5*i(),Et=e=>Pe+1.1*Math.sin(.11*e+Me)+.5*Math.sin(.29*e+2*Me);m(11,Pe,ze,2.2+ze*.25,1),m(12,Me,Be,i()*65536|0,2.2+.5*i());const R=(e,o)=>{let a=0;for(const c of Ee)a+=c[3]*Math.sin(c[0]*e+c[1]*o+c[2]);const n=o-Et(e);return a-Be*Math.exp(-n*n*.05)},zt=(e,o)=>[(R(e+.05,o)-R(e-.05,o))/.1,(R(e,o+.05)-R(e,o-.05))/.1],Xe=i()<.5?-1:1,ge=Xe*(.18+.12*i()),ke=4.1+1*i(),I=Math.sin(ge)*ke,F=(O==="ridge"?-1:1)*Math.cos(ge)*ke,Pt=.42+.14*i();m(4,I,R(I,F),F,Pt);const P=i()*Math.PI,Oe=i()*100,Ve=.7+.6*i(),Mt=e=>(e^=e>>>16,e=Math.imul(e,2146121005),e^=e>>>15,e=Math.imul(e,-2073254261),e^=e>>>16,e>>>0),gt=e=>(Mt(e>>>0)>>>8)/16777216,qe=(e,o)=>{const a=Math.fround(e),n=Math.floor(Math.fround(a*977)),c=Math.fround(o)*.9,l=2.4+2.2*(Math.fround(a*.37)%1),f=d=>gt(Math.imul(d+4096>>>0,-1640531535)^n);return{z:f(0)*c*l,v:d=>{const p=d/l,T=Math.floor(p);return(f(T)+(f(T+1)-f(T))*(p-T)-f(0))*c*l}}},Ae=(e,o,a,n,c)=>m(e,o+Math.sin(n)*c.z,a-Math.cos(n)*c.z,Math.cos(n),Math.sin(n)),Ke=qe(Oe,Ve),de=Ke.v,kt=te==="Refrozen lead";if(Ae(13,I,F,P,Ke),m(14,Ve,Oe,kt?.6:.045+.03*i(),1),te!=="One crack"){const e=P+.9+i()*1.3,o=3+i()*6,a=de(o),n=[.6+.8*i(),i()*100,.035+.03*i(),1];Ae(15,I+Math.cos(P)*o-Math.sin(P)*a,F+Math.sin(P)*o+Math.cos(P)*a,e,qe(n[1],n[0])),m(16,...n)}else m(16,0,0,0,0);if(te==="Crack network"){const e=P+Math.PI-.7-i(),o=-(4+i()*6),a=de(o),n=[.5+.8*i(),i()*100,.03+.025*i(),1];Ae(17,I+Math.cos(P)*o-Math.sin(P)*a,F+Math.sin(P)*o+Math.cos(P)*a,e,qe(n[1],n[0])),m(18,...n)}else m(18,0,0,0,0);if(D==="Two holes"||D==="Row of holes"){const e=Math.cos(P),o=Math.sin(P),a=i()<.5?-1:1,n=e*I+o*F,c=(Math.abs(n)>.15*ke?Math.sign(n):a)*(5.5+3*i()),l=de(c),f=I+e*c-o*l,d=F+o*c+e*l;m(5,f,R(f,d),d,.36+.12*i())}else m(5,0,0,0,0);if(m(31,0,0,0,0),D==="Row of holes"){const e=Math.cos(P),o=Math.sin(P),a=(u[20]-I)*e+(u[22]-F)*o,n=a+Math.sign(a)*(4.5+2*N[4]),c=de(n),l=I+e*n-o*c,f=F+o*n+e*c;m(31,l,R(l,f),f,.34+.12*N[5])}let z=0,V=.2;const Ne=[4,5,31].filter(e=>u[e*4+3]>0);if(O==="level"&&Ne.length>1){let e=0,o=0;for(const a of Ne)e+=u[a*4],o+=u[a*4+2];z=Math.atan2(e,o)}if(O==="up"){const e=Math.atan2(I,F),o=1.3+.9*W[1],a=4.6+2*W[2];b.x=I-Math.sin(e)*o,b.z=F-Math.cos(e)*o,b.y=-a,z=e+(W[3]-.5)*.6,V=Math.min(Math.atan2(a,o)-.22,1.12)}if(O==="ridge"&&(z=Math.PI-ge-Xe*.25,V=.1),O==="deep"){const e=N[1]<.5?-1:1;let o=0,a=0,n=0;for(const f of[4,5,31])u[f*4+3]>0&&(o+=u[f*4],a+=u[f*4+2],n++);o/=n,a/=n,b.y=-(7.5+2.5*N[2]),z=e*(.15+.25*N[3]),V=.48+.08*N[2];const c=z-e*(n>1?.08:.2),l=Math.min(-b.y/Math.tan(V+(n>1?.12:.22)),10);b.x=o-Math.sin(c)*l,b.z=Math.max(a-Math.cos(c)*l,-2.5)}for(let e=0;e<14;e++){const o=Math.cos(V),a=[Math.sin(z)*o,Math.sin(V),Math.cos(z)*o],n=[Math.cos(z),0,-Math.sin(z)],c=[a[1]*n[2]-a[2]*n[1],a[2]*n[0]-a[0]*n[2],a[0]*n[1]-a[1]*n[0]],l=Math.tan(33*Math.PI/180);let f=0;for(const d of Ne){const p=[u[d*4]-b.x,u[d*4+1]-b.y,u[d*4+2]-b.z],T=p[0]*a[0]+p[1]*a[1]+p[2]*a[2];f=Math.max(f,T<1?9:Math.abs(p[0]*n[0]+p[2]*n[2])/(T*l*.8),Math.abs(p[0]*c[0]+p[1]*c[1]+p[2]*c[2])/(T*l*.8))}if(f<=1)break;b.x-=a[0]*.8,b.z-=a[2]*.8,b.y=Math.max(b.y-Math.max(a[1],0)*.8,-14)}{const e=5+2.5*X(),o=(X()-.5)*4,a=Math.sin(z),n=Math.cos(z);u[24*4+1]=b.x+a*e+n*o,u[24*4+2]=b.z+n*e-a*o,u[23*4+3]=X()*H}const Ge=i()*H,Re={"Wind drifts":[.3,.2,.12],"Patchy thin snow":[.17,.15,.1],"Deep drifts":[.62,.3,.07],"Bare blue ice":[.02,.015,.2]}[k];m(19,Math.cos(Ge),Math.sin(Ge),Re[0],Re[1]),u[24*4]=Re[2],u[23*4]=k==="Bare blue ice"?1:0,m(20,ee==="Algae bloom"?1:ee==="Faint algae"?.5:0,q==="Platelet carpet"?1:q==="Thin platelets"?.45:1.3,q==="Platelet curtains"?1.1:.08,k==="Bare blue ice"?2.6:3.6);const C={"Clear spring water":[[.42,.075,.042],.05,[.006,.085,.25]],"Plankton haze":[[.5,.2,.3],.11,[.04,.09,.05]],"Crystal clear":[[.4,.14,.02],.035,[.04,.03,.32]]}[oe];if(oe==="Plankton haze"){let e=1374496523;for(let L=2;L<t.hash.length;L+=8)e=Math.imul(e^parseInt(t.hash.slice(L,L+8),16),739982445)>>>0;e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);o=o+Math.imul(o^o>>>7,61|o)^o;const a=((o^o>>>14)>>>0)/4294967296,n=(L,se,le)=>L.map((ce,Ut)=>ce+(se[Ut]-ce)*le),c=[[.45,.16,.24],.1,[.02,.1,.045]],l=[[.38,.17,.24],.15,[.055,.1,.075]],f=[[.22,.16,.27],.12,[.06,.075,.035]],[d,p,T]=a<.5?[c,l,a*2]:[l,f,a*2-1];C[0]=n(d[0],p[0],T),C[1]=d[1]+(p[1]-d[1])*T,C[2]=n(d[2],p[2],T)}m(21,C[0][0],C[0][1],C[0][2],C[1]);const Ze=x==="Overcast"?0:x==="Thin sun"?.3:.45,We=i()*H,$e=x==="Low sun"?.75:x==="Thin sun"?.45:.15;u[23*4+1]=x==="Low sun"?1:0,u[23*4+2]=x==="Low sun"?1:x==="Thin sun"?.15:0;const qt=Math.cos(We)*$e,At=Math.sin(We)*$e;m(28,C[2][0],C[2][1],C[2][2],k==="Bare blue ice"?.21:k==="Deep drifts"?.17:.2);const re={"Comb jellies":[2400,150,40],"Krill swarm":[2200,2600,10]}[Z],Je=q==="Platelet carpet"?520:q==="Thin platelets"?200:900;m(26,re[0],re[1],re[2],Je);const Nt=i()*4096|0;{const e=i()*H;m(29,22+8*i(),Math.cos(e),Math.sin(e),3+9*i())}m(25,0,0,r.hf?1:2,r.hf?1:6),m(30,0,0,u[31*4+3]>0?1:0,0);const ae=(e,o,a,n,c,l)=>{s.bindFramebuffer(s.FRAMEBUFFER,o),s.viewport(0,0,a,n),l?(s.enable(s.BLEND),s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE)):s.disable(s.BLEND),s.disable(s.DEPTH_TEST),s.disable(s.SCISSOR_TEST),s.disable(s.CULL_FACE),s.colorMask(!0,!0,!0,!0),s.useProgram(e.p),s.uniform4fv(e.uP,u),Ye(c),s.bindVertexArray(r.vao),s.drawArrays(s.TRIANGLES,0,3),l&&s.disable(s.BLEND)};let Qe=null,$=null,_e=null;const Ye=e=>{s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,r.tN),s.activeTexture(s.TEXTURE1),s.bindTexture(s.TEXTURE_2D,Qe||r.tN),s.activeTexture(s.TEXTURE2),s.bindTexture(s.TEXTURE_2D,e||r.tN),s.activeTexture(s.TEXTURE3),s.bindTexture(s.TEXTURE_2D,r.tD),s.activeTexture(s.TEXTURE4),s.bindTexture(s.TEXTURE_2D,_e||r.tN),s.activeTexture(s.TEXTURE0)};let Le=null;const et=()=>{let e=r.lm.get(t.hash);if(e)r.lm.delete(t.hash),r.lm.set(t.hash,e);else{if(r.lmT=r.lmT||0,r.lm.size>=4){for(const[o,a]of r.lm)if(r.lmT-a.used>90){ie(s,a),a.dead=!0,r.lm.delete(o);break}}e=ue(s,fe,fe,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.LINEAR,!0),r.lm.set(t.hash,e),m(3,0,0,0,0),u[30*4+1]=1,ae(r.use("bake"),e.fb,fe,fe,null),u[30*4+1]=0,s.bindTexture(s.TEXTURE_2D,e.tex),s.generateMipmap(s.TEXTURE_2D)}e.used=r.lmT,Le=e,Qe=e.tex};et(),Se(s,r,v);const tt=Math.ceil(v/2),ve=Math.tan(33*Math.PI/180);{const e=Math.cos(V),o=Math.atan(ve*Math.SQRT2);m(32,b.x,Math.min(b.y,R(b.x,b.z)-.6),b.z,Math.cos(o+.1)),m(33,Math.sin(z)*e,Math.sin(V),Math.cos(z)*e,Math.cos(o+.45))}const h={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},ot=()=>{const e=t.view||ht;h.x=b.x+K(e.x||0,-2.5,2.5),h.z=b.z+K(e.z||0,-2.5,2.5),h.y=Math.min(b.y+K(e.y||0,-3,2),R(h.x,h.z)-.6);const o=z+(e.yaw||0),a=K(V+(e.pitch||0),-1.35,1.35),n=Math.cos(a);h.fw=[Math.sin(o)*n,Math.sin(a),Math.cos(o)*n],h.rt=[Math.cos(o),0,-Math.sin(o)];const c=h.fw,l=h.rt;h.up=[c[1]*l[2]-c[2]*l[1],c[2]*l[0]-c[0]*l[2],c[0]*l[1]-c[1]*l[0]]},Rt=(e,o)=>{const a=e*2-1,n=1-o*2,c=[0,1,2].map(f=>h.fw[f]+(a*h.rt[f]+n*h.up[f])*ve),l=Math.hypot(c[0],c[1],c[2]);return c.map(f=>f/l)},_t=()=>{m(0,h.x,h.y,h.z,ve),m(1,h.fw[0],h.fw[1],h.fw[2],v),u[8]=h.rt[0],u[9]=h.rt[1],u[10]=h.rt[2],u[12]=h.up[0],u[13]=h.up[1],u[14]=h.up[2]},Lt=()=>{const e=t.hash+"|"+v+"|"+[h.x,h.y,h.z,h.fw[0],h.fw[1],h.fw[2]].map(l=>l.toFixed(4)).join(",");if($&&$.key===e&&r.bk.get(e)===$)return;let o=r.bk.get(e);if(o){r.bk.delete(e),r.bk.set(e,o),$=o;return}const a=v>512;let n=0;for(const l of r.bk.values())l.big===a&&n++;for(const[l,f]of[...r.bk]){if(n<(a?2:8))break;f.big===a&&(ie(s,f),r.bk.delete(l),n--)}o=ue(s,v,v,r.hf?s.RGBA16F:s.RGBA8,s.RGBA,r.hf?s.HALF_FLOAT:s.UNSIGNED_BYTE,s.NEAREST,!1),o.key=e,o.big=a,r.bk.set(e,o);let c=!1;for(let l=0;l<9&&!c;l++){const f=l%3-1,d=(l/3|0)-1,p=[0,1,2].map(ce=>h.fw[ce]+(f*h.rt[ce]+d*h.up[ce])*ve),T=Math.hypot(p[0],p[1],p[2]),L=p[1]/T,se=p[2]/T,le=L>.05?(1.5-h.y)/L:90;c=se<0&&h.z+se*le<Pe+2.2+ze*.25+4}ae(r.use("bake"),o.fb,v,v,null),ae(r.use("hole"),o.fb,v,v,null,!0),c&&ae(r.keel(!0),o.fb,v,v,null),$=o};let S=0,De=Ze,Dt=0,pe=!1;const A=[0,0],xe=[0,0];let Ie=0;const J=[],_=[],me=[];let at=12+i()*20,st=4+i()*8,It=0,ct=0;const nt=(e,o)=>{const a=Rt(e,o);let n,c,l;if(a[1]>.06){let d=0,p=60;for(let le=0;le<300;le++)if(d+=.1,h.y+a[1]*d>R(h.x+a[0]*d,h.z+a[2]*d)){p=d;break}const T=Math.min(p,12),L=h.x+a[0]*T,se=h.z+a[2]*T;n=L,l=se,c=Math.max(R(L,se)-.6,h.y+.3)}else n=h.x+a[0]*2.4,c=h.y+a[1]*2.4,l=h.z+a[2]*2.4;const f=30+(i()*12|0);for(let d=0;d<f;d++){const p=i()<.3;me.push({at:S+Math.pow(i(),1.5)*.55,x:n+(i()-.5)*.08,y:c+(i()-.5)*.06,z:l+(i()-.5)*.08,r:p?.014+.02*i():.004+.008*i(),vx:(i()-.5)*.35,vz:(i()-.5)*.35,ph:i()*H})}t.sound.hit("noise",.3,{cutoff:900,dur:.5});for(let d=0;d<7;d++)t.sound.note(64+Math.floor(i()*20),{dur:.05,vel:.12+.1*i(),wave:"sine",at:d*.06+i()*.04})},Ft=(e,o,a,n)=>{let c=null,l=1e9;for(const d of _){const p=Math.hypot(d.x-e,d.z-o);p<d.r+.12&&p<l&&(l=p,c=d)}c||(_.length>=He&&_.shift(),c={x:e,z:o,vol:0,r:0,e:0,ph:i()*10,id:It++%37*.37+i()},_.push(c));const f=c.vol+a;c.x=(c.x*c.vol+e*a)/f,c.z=(c.z*c.vol+o*a)/f,c.vol=f,c.r=Math.sqrt(f/(Math.PI*.011)),c.e=Math.min(c.e+n,1.6),S-ct>.07&&(ct=S,t.sound.note(84+Math.floor(i()*10)-Math.min(12,c.r*30|0),{dur:.08,vel:.05+n*.2,wave:"sine"}))},it=e=>{S+=e,De+=((pe?1:Ze)-De)*(1-Math.exp(-e*(pe?1.6:.35))),A[0]*=Math.exp(-e/7),A[1]*=Math.exp(-e/7),xe[0]+=A[0]*e,xe[1]+=A[1]*e,Ie+=(Math.min(Math.hypot(A[0],A[1])*3,1.2)-Ie)*(1-Math.exp(-e*2));for(let o=me.length-1;o>=0;o--)if(me[o].at<=S){const a=me.splice(o,1)[0];J.length<ft&&J.push(a)}for(let o=J.length-1;o>=0;o--){const a=J[o],n=.2+1.4*Math.sqrt(a.r);a.vx*=Math.exp(-e*2.2),a.vz*=Math.exp(-e*2.2),a.ph+=e*(a.r<.006?9:4);const c=a.r<.006?.05:.02;a.x+=(a.vx+A[0]+Math.cos(a.ph)*c)*e,a.z+=(a.vz+A[1]+Math.sin(a.ph*.8)*c)*e,a.y+=n*e,a.y>R(a.x,a.z)-a.r-.012&&(Ft(a.x,a.z,4.19*a.r*a.r*a.r*7,a.r>.01?.45:.12),J.splice(o,1))}for(const o of _){const a=zt(o.x,o.z);o.x+=(a[0]*.9+A[0]*.25)*e,o.z+=(a[1]*.9+A[1]*.25)*e,o.e*=Math.exp(-e*1.1),o.ph+=e*(4+o.e*6)}for(let o=0;o<_.length;o++)for(let a=_.length-1;a>o;a--){const n=_[o],c=_[a];if(Math.hypot(n.x-c.x,n.z-c.z)<(n.r+c.r)*.8){const l=n.vol+c.vol;n.x=(n.x*n.vol+c.x*c.vol)/l,n.z=(n.z*n.vol+c.z*c.vol)/l,n.vol=l,n.r=Math.sqrt(l/(Math.PI*.011)),n.e=Math.min(n.e+.8,1.6),_.splice(a,1),t.sound.note(57+Math.floor(i()*5),{dur:.3,vel:.12,wave:"sine"})}}if(S>at){at=S+18+i()*30;const o=70+i()*14;for(let a=0;a<9;a++)t.sound.note(o-a*2.2,{dur:.16,vel:.05,wave:"sine",at:a*.14})}S>st&&(st=S+6+i()*12,t.sound.hit("noise",.1,{cutoff:220,dur:1.4}),t.sound.note(28+Math.floor(i()*5),{dur:1.2,vel:.08,wave:"triangle",cutoff:300}))};let w=null;const Ht=e=>{const o=t.input,a=o.taps();if(pe=!1,o.down){w||(w={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0,drag:!1});const n=o.x-w.lx,c=o.y-w.ly;if(w.lx=o.x,w.ly=o.y,w.t+=e,w.path+=Math.hypot(n,c),w.path>.02){w.drag||(w.drag=!0,t.sound.hit("noise",.2,{cutoff:380,dur:1.6}));const l=h.fw[0],f=h.fw[2],d=Math.hypot(l,f)||1,p=6;A[0]=K(A[0]+(n*h.rt[0]-c*l/d)*p,-.6,.6),A[1]=K(A[1]+(n*h.rt[2]-c*f/d)*p,-.6,.6)}else w.t>.35&&(pe=!0,Dt+=e)}else w?(!w.drag&&w.t<=.35&&nt(w.x0,w.y0),w=null):a.length&&nt(a[0].x,a[0].y)},he=new Float32Array(64*8*4),rt=()=>{ot(),_t(),Lt(),u[11]=S,u[15]=De,m(22,qt,At,xe[0],xe[1]),u[24*4+3]=46,m(27,Nt,Ie,b.x+1.5*Math.sin(z),b.z+1.5*Math.cos(z)),he.fill(0),J.forEach((c,l)=>{const f=c.r<.006?.05:.02;he.set([c.x+Math.cos(c.ph)*f*.3,c.y,c.z+Math.sin(c.ph*.8)*f*.3,c.r],l*4)}),_.forEach((c,l)=>{he.set([c.x,R(c.x,c.z)-.011,c.z,c.r],(4*64+l)*4),he.set([c.e,c.ph,0,c.id],(5*64+l)*4)}),u[25*4]=_.length,u[25*4+1]=J.length,s.bindTexture(s.TEXTURE_2D,r.tD),s.texSubImage2D(s.TEXTURE_2D,0,0,0,64,6,s.RGBA,s.FLOAT,he);const e=Se(s,r,v),o=e.c,a=e.v;u[30*4+3]=a.w,_e=null,ae(r.use("vol"),a.fb,tt,tt,$.tex),_e=a.tex,ae(r.use("comp"),o.fb,v,v,$.tex),s.enable(s.BLEND),s.blendFunc(s.ONE,s.ONE_MINUS_SRC_ALPHA);const n=r.use("pt");s.useProgram(n.p),s.uniform4fv(n.uP,u),Ye($.tex),s.bindVertexArray(r.vao),s.drawArrays(s.POINTS,0,re[0]+re[1]+re[2]+Je+J.length),s.disable(s.BLEND),s.flush(),ae(r.use("fin"),null,v,v,o.tex)};ot();for(let e=0;e<3;e++)it(1/30);rt();let be=0;const lt=(e,o)=>{for(o=K(o||1/30,0,.1),Ht(o),be=Math.min(be+o,.2);be>=1/60;)be-=1/60,it(1/60);Le.dead&&et(),Le.used=++r.lmT,rt()};return r.users++,je&&je.register(lt,{G:r,gl:s}),lt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
