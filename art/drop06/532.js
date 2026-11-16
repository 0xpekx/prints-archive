// Under the Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/532.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ue){Ue&&function(){"use strict";const ft={yaw:0,pitch:0,x:0,y:0,z:0},K=(t,s,p)=>t<s?s:t>p?p:t,H=Math.PI*2,we=34,re=512,U=32,ut=256,Ce=12,Se=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,J=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,Te=`
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) * (1. / 16777216.); }
`,dt=Te+`
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
}`,Q=Te+`
uniform vec4 uP[${we}];
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
`,se=`
float keelZ(float x) { return uP[11].x + 1.1 * sin(.11 * x + uP[12].x) + .5 * sin(.29 * x + 2. * uP[12].x); }
// the ice underside (m, 0 = mean); higher = thinner ice
float hC(vec2 q) {
  float h = uP[6].w * sin(dot(uP[6].xy, q) + uP[6].z) + uP[7].w * sin(dot(uP[7].xy, q) + uP[7].z)
          + uP[8].w * sin(dot(uP[8].xy, q) + uP[8].z) + uP[9].w * sin(dot(uP[9].xy, q) + uP[9].z)
          + uP[10].w * sin(dot(uP[10].xy, q) + uP[10].z);
  float dz = q.y - keelZ(q.x);
  return h - uP[12].y * exp(-dz * dz * .05);
}
`,vt=`
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
`,Ee=`
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
`,je=`in vec2 vUV; out vec4 oC;
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
}`,pt=`in vec2 vUV; out vec4 oC;
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
}`,xt=`in vec2 vUV; out vec4 oC;
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
  for (int i = 0; i < ${Ce} + ZI; i++) {
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
}`,mt=`in vec2 vUV; out vec4 oC;
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
}`,yt=`out vec4 vC; out vec4 vA; flat out int vK; out float vZ;
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
}`,wt=`in vec2 vUV; out vec4 oC;
void main() {
  vec3 c = texelFetch(uB, ivec2(gl_FragCoord.xy), 0).rgb;
  float g = hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u) - .5;
  oC = vec4(c + g * .004, 1.);
}`;function Tt(t){if(t.__c532)return t.__c532;const s=!!t.getExtension("EXT_color_buffer_float"),p=s||!!t.getExtension("EXT_color_buffer_half_float"),m=p?"":`#define E8
`,ne=(d,b)=>{const E=t.createShader(d);return t.shaderSource(E,b),t.compileShader(E),E},g={nz:[J,dt],bake:[J,`#define KEEL 0
`+Q+se+vt+je],hole:[J,Q+se+pt],comp:[J,Q+se+Ee+xt],vol:[J,Q+se+Ee+mt],pt:[`#define PTL
`+Q+se+Ee+yt,Q+bt],fin:[J,Te+`uniform vec4 uP[${we}]; uniform sampler2D uN, uL, uB, uD;
#define TIME uP[2].w
`+wt]},i={};g.bakeK=[J,`#define KEEL 1
`+Q+se+je];const M=d=>{const b=t.createProgram(),E=ne(t.VERTEX_SHADER,Se+m+g[d][0]),N=ne(t.FRAGMENT_SHADER,Se+m+g[d][1]);t.attachShader(b,E),t.attachShader(b,N),t.linkProgram(b),t.flush(),i[d]={p:b,v:E,f:N}},k=d=>{const{p:b,v:E,f:N}=i[d];if(!t.getProgramParameter(b,t.LINK_STATUS))throw new Error("532 "+d+": "+(t.getShaderInfoLog(E)||"")+(t.getShaderInfoLog(N)||"")+t.getProgramInfoLog(b));t.useProgram(b),["uN","uL","uB","uD","uV"].forEach((B,X)=>{const Z=t.getUniformLocation(b,B);Z&&t.uniform1i(Z,X)}),i[d]={p:b,uP:t.getUniformLocation(b,"uP")}},q=t.getExtension("KHR_parallel_shader_compile");for(const d in g)d!=="bakeK"&&M(d);t.flush();const Y=d=>("uP"in i[d]||k(d),i[d]);Y("nz");const ee=d=>{if(i.bakeK||M("bakeK"),!i.bakeK.uP){if(!d&&!(q&&t.getProgramParameter(i.bakeK.p,q.COMPLETION_STATUS_KHR)))return null;k("bakeK")}return i.bakeK},L=t.createVertexArray(),j=t.createTexture();t.bindTexture(t.TEXTURE_2D,j),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,null);const te=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,te),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,j,0),t.viewport(0,0,256,256),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);for(let d=0;d<5;d++)t.activeTexture(t.TEXTURE0+d),t.bindTexture(t.TEXTURE_2D,null);t.activeTexture(t.TEXTURE0),t.useProgram(i.nz.p),t.bindVertexArray(L),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(te),t.bindTexture(t.TEXTURE_2D,j),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const G=t.createTexture();return t.bindTexture(t.TEXTURE_2D,G),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,64,8,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.__c532={P:i,use:Y,flt:s,hf:p,tN:j,tD:G,vao:L,keel:ee,pc:!!q}}function le(t,s,p,m,ne,g,i,M){const k=t.createTexture();t.bindTexture(t.TEXTURE_2D,k),t.texImage2D(t.TEXTURE_2D,0,m,s,p,0,ne,g,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,M?t.LINEAR_MIPMAP_LINEAR:i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const q=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,q),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,k,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:k,fb:q,w:s,h:p}}const Et=(t,s)=>{t.deleteTexture(s.tex),t.deleteFramebuffer(s.fb)},Be=typeof FinalizationRegistry=="function"?new FinalizationRegistry(t=>{const s=t();try{s.list.forEach(p=>Et(s.gl,p))}catch{}}):null;Ue.add({num:532,name:"Under the Ice",fam:"Vistas",recipe:"Under two metres of sea ice in spring, where the light comes through green-blue, cracks show as lines of light and a seal's hole sends rays fanning down. The snow on top, the algae, the cracks and where you float change every mint. Tap to breathe out bubbles that pool under the ice like wobbly silver mirrors, drag to stir a slow current, or hold to let the sun come out.",interactive:"Tap to breathe out a burst of bubbles there: they rise and pool under the ice as wobbling quicksilver mirrors that creep uphill and merge. Drag to set a slow current drifting the motes and swaying the loose platelets. Hold to let the sun come out: the ceiling brightens and the shafts sharpen.",music:!0,gl:!0,fps:30,seed:0,make(t){const s=t.gl,p=t.size,m=Tt(s),ne=m.P;let g=2654435769;for(let e=2;e<t.hash.length;e+=8)g=Math.imul(g^parseInt(t.hash.slice(e,e+8),16),2246822507)>>>0;const i=()=>{g=g+1831565813|0;let e=Math.imul(g^g>>>15,1|g);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},M=e=>{let o=0;for(const c in e)o+=e[c];let a=i()*o;for(const c in e)if(a-=e[c],a<0)return c;return Object.keys(e)[0]};let k=M({"Wind drifts":40,"Patchy thin snow":35,"Deep drifts":15,"Bare blue ice":10}),q=M({"Platelet carpet":50,"Thin platelets":35,"Platelet curtains":15}),Y=M({"Faint algae":45,"Algae bloom":35,"Clean ice":20}),ee=M({"One crack":50,"Crack network":35,"Refrozen lead":15}),L=M({"One breathing hole":82,"Two holes":18}),j=M({"Low ridge":25,"Pressure ridge":55,"Deep keel":20}),te=M({"Clear spring water":55,"Plankton haze":30,"Crystal clear":15}),G=M({"Comb jellies":50,"Krill swarm":35,"Jelly drift":15}),d=M({Overcast:55,"Thin sun":35,"Low sun":10});t.home&&(k="Patchy thin snow",q="Platelet carpet",Y="Faint algae",ee="One crack",L="One breathing hole",j="Pressure ridge",te="Clear spring water",G="Comb jellies",d="Thin sun");let b=795581749;for(let e=2;e<t.hash.length;e+=8)b=Math.imul(b^parseInt(t.hash.slice(e,e+8),16),2654435761)>>>0;const E=()=>{b=b+1831565813|0;let e=Math.imul(b^b>>>15,1|b);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},N=[E(),E(),E(),E(),E(),E(),E()];L==="Two holes"&&!t.home&&N[6]<.4&&(L="Row of holes");let B=1821285621;for(let e=2;e<t.hash.length;e+=8)B=Math.imul(B^parseInt(t.hash.slice(e,e+8),16),668265263)>>>0;const X=()=>{B=B+1831565813|0;let e=Math.imul(B^B>>>15,1|B);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Z=[X(),X(),X(),X()];let O=t.home||N[0]<.64&&L!=="Row of holes"?"level":"deep";O==="level"&&!t.home&&(O=Z[0]<.2?"up":Z[0]<.42?"ridge":"level"),G==="Jelly drift"&&(G="Krill swarm");const zt={level:"Level with the hole",deep:"From deep",up:"Under the hole"}[O]||"Along "+{"Low ridge":"a low ridge","Pressure ridge":"a pressure ridge","Deep keel":"a deep keel"}[j];t.trait("Snow",k),t.trait("Platelets",q),t.trait("Algae",Y),t.trait("Cracks",ee),t.trait("Holes",L),t.trait("View",zt),t.trait("Water",te),t.trait("Life",G),t.trait("Sky",d);const u=new Float32Array(we*4),x=(e,o,a,c,n)=>{u[e*4]=o,u[e*4+1]=a,u[e*4+2]=c,u[e*4+3]=n},y={x:0,y:-(2.4+i()*.6),z:0},ze=[];for(let e=0;e<5;e++){const o=i()*H,a=H/(3.5+11*Math.pow(i(),1.3));ze.push([Math.cos(o)*a,Math.sin(o)*a,i()*H,(.05+.1*i())*(e<2?1.4:.8)*K(H/a/11,.3,1.1)])}ze.forEach((e,o)=>x(6+o,e[0],e[1],e[2],e[3]));const Pe=j==="Low ridge"?3.5:j==="Deep keel"?11:6.5,ge=O==="ridge"?-(10+i()*2.5):-(16.5+i()*3),Me=i()*H,Xe=.8+.5*i(),Pt=e=>ge+1.1*Math.sin(.11*e+Me)+.5*Math.sin(.29*e+2*Me);x(11,ge,Pe,2.2+Pe*.25,1),x(12,Me,Xe,i()*65536|0,2.2+.5*i());const R=(e,o)=>{let a=0;for(const n of ze)a+=n[3]*Math.sin(n[0]*e+n[1]*o+n[2]);const c=o-Pt(e);return a-Xe*Math.exp(-c*c*.05)},gt=(e,o)=>[(R(e+.05,o)-R(e-.05,o))/.1,(R(e,o+.05)-R(e,o-.05))/.1],Oe=i()<.5?-1:1,ke=Oe*(.18+.12*i()),qe=4.1+1*i(),D=Math.sin(ke)*qe,I=(O==="ridge"?-1:1)*Math.cos(ke)*qe,Mt=.42+.14*i();x(4,D,R(D,I),I,Mt);const P=i()*Math.PI,Ve=i()*100,Ke=.7+.6*i(),kt=e=>(e^=e>>>16,e=Math.imul(e,2146121005),e^=e>>>15,e=Math.imul(e,-2073254261),e^=e>>>16,e>>>0),qt=e=>(kt(e>>>0)>>>8)/16777216,Ae=(e,o)=>{const a=Math.fround(e),c=Math.floor(Math.fround(a*977)),n=Math.fround(o)*.9,l=2.4+2.2*(Math.fround(a*.37)%1),h=f=>qt(Math.imul(f+4096>>>0,-1640531535)^c);return{z:h(0)*n*l,v:f=>{const v=f/l,T=Math.floor(v);return(h(T)+(h(T+1)-h(T))*(v-T)-h(0))*n*l}}},Ne=(e,o,a,c,n)=>x(e,o+Math.sin(c)*n.z,a-Math.cos(c)*n.z,Math.cos(c),Math.sin(c)),Ge=Ae(Ve,Ke),he=Ge.v,At=ee==="Refrozen lead";if(Ne(13,D,I,P,Ge),x(14,Ke,Ve,At?.6:.045+.03*i(),1),ee!=="One crack"){const e=P+.9+i()*1.3,o=3+i()*6,a=he(o),c=[.6+.8*i(),i()*100,.035+.03*i(),1];Ne(15,D+Math.cos(P)*o-Math.sin(P)*a,I+Math.sin(P)*o+Math.cos(P)*a,e,Ae(c[1],c[0])),x(16,...c)}else x(16,0,0,0,0);if(ee==="Crack network"){const e=P+Math.PI-.7-i(),o=-(4+i()*6),a=he(o),c=[.5+.8*i(),i()*100,.03+.025*i(),1];Ne(17,D+Math.cos(P)*o-Math.sin(P)*a,I+Math.sin(P)*o+Math.cos(P)*a,e,Ae(c[1],c[0])),x(18,...c)}else x(18,0,0,0,0);if(L==="Two holes"||L==="Row of holes"){const e=Math.cos(P),o=Math.sin(P),a=i()<.5?-1:1,c=e*D+o*I,n=(Math.abs(c)>.15*qe?Math.sign(c):a)*(5.5+3*i()),l=he(n),h=D+e*n-o*l,f=I+o*n+e*l;x(5,h,R(h,f),f,.36+.12*i())}else x(5,0,0,0,0);if(x(31,0,0,0,0),L==="Row of holes"){const e=Math.cos(P),o=Math.sin(P),a=(u[20]-D)*e+(u[22]-I)*o,c=a+Math.sign(a)*(4.5+2*N[4]),n=he(c),l=D+e*c-o*n,h=I+o*c+e*n;x(31,l,R(l,h),h,.34+.12*N[5])}let z=0,V=.2;const Re=[4,5,31].filter(e=>u[e*4+3]>0);if(O==="level"&&Re.length>1){let e=0,o=0;for(const a of Re)e+=u[a*4],o+=u[a*4+2];z=Math.atan2(e,o)}if(O==="up"){const e=Math.atan2(D,I),o=1.3+.9*Z[1],a=4.6+2*Z[2];y.x=D-Math.sin(e)*o,y.z=I-Math.cos(e)*o,y.y=-a,z=e+(Z[3]-.5)*.6,V=Math.min(Math.atan2(a,o)-.22,1.12)}if(O==="ridge"&&(z=Math.PI-ke-Oe*.25,V=.1),O==="deep"){const e=N[1]<.5?-1:1;let o=0,a=0,c=0;for(const h of[4,5,31])u[h*4+3]>0&&(o+=u[h*4],a+=u[h*4+2],c++);o/=c,a/=c,y.y=-(7.5+2.5*N[2]),z=e*(.15+.25*N[3]),V=.48+.08*N[2];const n=z-e*(c>1?.08:.2),l=Math.min(-y.y/Math.tan(V+(c>1?.12:.22)),10);y.x=o-Math.sin(n)*l,y.z=Math.max(a-Math.cos(n)*l,-2.5)}for(let e=0;e<14;e++){const o=Math.cos(V),a=[Math.sin(z)*o,Math.sin(V),Math.cos(z)*o],c=[Math.cos(z),0,-Math.sin(z)],n=[a[1]*c[2]-a[2]*c[1],a[2]*c[0]-a[0]*c[2],a[0]*c[1]-a[1]*c[0]],l=Math.tan(33*Math.PI/180);let h=0;for(const f of Re){const v=[u[f*4]-y.x,u[f*4+1]-y.y,u[f*4+2]-y.z],T=v[0]*a[0]+v[1]*a[1]+v[2]*a[2];h=Math.max(h,T<1?9:Math.abs(v[0]*c[0]+v[2]*c[2])/(T*l*.8),Math.abs(v[0]*n[0]+v[1]*n[1]+v[2]*n[2])/(T*l*.8))}if(h<=1)break;y.x-=a[0]*.8,y.z-=a[2]*.8,y.y=Math.max(y.y-Math.max(a[1],0)*.8,-14)}{const e=5+2.5*X(),o=(X()-.5)*4,a=Math.sin(z),c=Math.cos(z);u[24*4+1]=y.x+a*e+c*o,u[24*4+2]=y.z+c*e-a*o,u[23*4+3]=X()*H}const Ze=i()*H,_e={"Wind drifts":[.3,.2,.12],"Patchy thin snow":[.17,.15,.1],"Deep drifts":[.62,.3,.07],"Bare blue ice":[.02,.015,.2]}[k];x(19,Math.cos(Ze),Math.sin(Ze),_e[0],_e[1]),u[24*4]=_e[2],u[23*4]=k==="Bare blue ice"?1:0,x(20,Y==="Algae bloom"?1:Y==="Faint algae"?.5:0,q==="Platelet carpet"?1:q==="Thin platelets"?.45:1.3,q==="Platelet curtains"?1.1:.08,k==="Bare blue ice"?2.6:3.6);const C={"Clear spring water":[[.42,.075,.042],.05,[.006,.085,.25]],"Plankton haze":[[.5,.2,.3],.11,[.04,.09,.05]],"Crystal clear":[[.4,.14,.02],.035,[.04,.03,.32]]}[te];if(te==="Plankton haze"){let e=1374496523;for(let F=2;F<t.hash.length;F+=8)e=Math.imul(e^parseInt(t.hash.slice(F,F+8),16),739982445)>>>0;e=e+1831565813|0;let o=Math.imul(e^e>>>15,1|e);o=o+Math.imul(o^o>>>7,61|o)^o;const a=((o^o>>>14)>>>0)/4294967296,c=(F,$,be)=>F.map((He,St)=>He+($[St]-He)*be),n=[[.45,.16,.24],.1,[.02,.1,.045]],l=[[.38,.17,.24],.15,[.055,.1,.075]],h=[[.22,.16,.27],.12,[.06,.075,.035]],[f,v,T]=a<.5?[n,l,a*2]:[l,h,a*2-1];C[0]=c(f[0],v[0],T),C[1]=f[1]+(v[1]-f[1])*T,C[2]=c(f[2],v[2],T)}x(21,C[0][0],C[0][1],C[0][2],C[1]);const We=d==="Overcast"?0:d==="Thin sun"?.3:.45,$e=i()*H,Je=d==="Low sun"?.75:d==="Thin sun"?.45:.15;u[23*4+1]=d==="Low sun"?1:0,u[23*4+2]=d==="Low sun"?1:d==="Thin sun"?.15:0;const Nt=Math.cos($e)*Je,Rt=Math.sin($e)*Je;x(28,C[2][0],C[2][1],C[2][2],k==="Bare blue ice"?.21:k==="Deep drifts"?.17:.2);const ce={"Comb jellies":[2400,150,40],"Krill swarm":[2200,2600,10]}[G],Qe=q==="Platelet carpet"?520:q==="Thin platelets"?200:900;x(26,ce[0],ce[1],ce[2],Qe);const _t=i()*4096|0;{const e=i()*H;x(29,22+8*i(),Math.cos(e),Math.sin(e),3+9*i())}x(25,0,0,m.hf?1:2,m.hf?1:6),x(30,0,0,u[31*4+3]>0?1:0,0);const oe=(e,o,a,c,n,l)=>{s.bindFramebuffer(s.FRAMEBUFFER,o),s.viewport(0,0,a,c),l?(s.enable(s.BLEND),s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE)):s.disable(s.BLEND),s.disable(s.DEPTH_TEST),s.disable(s.SCISSOR_TEST),s.disable(s.CULL_FACE),s.colorMask(!0,!0,!0,!0),s.useProgram(e.p),s.uniform4fv(e.uP,u),et(n),s.bindVertexArray(m.vao),s.drawArrays(s.TRIANGLES,0,3),l&&s.disable(s.BLEND)};let Ye=null,ae=null,Le=null;const et=e=>{s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,m.tN),s.activeTexture(s.TEXTURE1),s.bindTexture(s.TEXTURE_2D,Ye||m.tN),s.activeTexture(s.TEXTURE2),s.bindTexture(s.TEXTURE_2D,e||m.tN),s.activeTexture(s.TEXTURE3),s.bindTexture(s.TEXTURE_2D,m.tD),s.activeTexture(s.TEXTURE4),s.bindTexture(s.TEXTURE_2D,Le||m.tN),s.activeTexture(s.TEXTURE0)},fe=le(s,re,re,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.LINEAR,!0);x(3,0,0,0,0),u[30*4+1]=1,oe(m.use("bake"),fe.fb,re,re,null),u[30*4+1]=0,s.bindTexture(s.TEXTURE_2D,fe.tex),s.generateMipmap(s.TEXTURE_2D),Ye=fe.tex;const ue=Math.ceil(p/2),De=le(s,p,p,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.NEAREST,!1),de=le(s,ue,ue,m.hf?s.RGBA16F:s.RGBA8,s.RGBA,m.hf?s.HALF_FLOAT:s.UNSIGNED_BYTE,s.LINEAR,!1),tt={gl:s,list:[fe,De,de]},ve=Math.tan(33*Math.PI/180);{const e=Math.cos(V),o=Math.atan(ve*Math.SQRT2);x(32,y.x,Math.min(y.y,R(y.x,y.z)-.6),y.z,Math.cos(o+.1)),x(33,Math.sin(z)*e,Math.sin(V),Math.cos(z)*e,Math.cos(o+.45))}const r={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},ot=()=>{const e=t.view||ft;r.x=y.x+K(e.x||0,-2.5,2.5),r.z=y.z+K(e.z||0,-2.5,2.5),r.y=Math.min(y.y+K(e.y||0,-3,2),R(r.x,r.z)-.6);const o=z+(e.yaw||0),a=K(V+(e.pitch||0),-1.35,1.35),c=Math.cos(a);r.fw=[Math.sin(o)*c,Math.sin(a),Math.cos(o)*c],r.rt=[Math.cos(o),0,-Math.sin(o)];const n=r.fw,l=r.rt;r.up=[n[1]*l[2]-n[2]*l[1],n[2]*l[0]-n[0]*l[2],n[0]*l[1]-n[1]*l[0]]},Lt=(e,o)=>{const a=e*2-1,c=1-o*2,n=[0,1,2].map(h=>r.fw[h]+(a*r.rt[h]+c*r.up[h])*ve),l=Math.hypot(n[0],n[1],n[2]);return n.map(h=>h/l)},Dt=()=>{x(0,r.x,r.y,r.z,ve),x(1,r.fw[0],r.fw[1],r.fw[2],p),u[8]=r.rt[0],u[9]=r.rt[1],u[10]=r.rt[2],u[12]=r.up[0],u[13]=r.up[1],u[14]=r.up[2]};let at=null;const It=()=>{const e=t.hash+"|"+p+"|"+[r.x,r.y,r.z,r.fw[0],r.fw[1],r.fw[2]].map(c=>c.toFixed(4)).join(",");if(at===e)return;ae||(ae=le(s,p,p,m.hf?s.RGBA16F:s.RGBA8,s.RGBA,m.hf?s.HALF_FLOAT:s.UNSIGNED_BYTE,s.NEAREST,!1),tt.list.push(ae));const o=ae;at=e;let a=!1;for(let c=0;c<9&&!a;c++){const n=c%3-1,l=(c/3|0)-1,h=[0,1,2].map($=>r.fw[$]+(n*r.rt[$]+l*r.up[$])*ve),f=Math.hypot(h[0],h[1],h[2]),v=h[1]/f,T=h[2]/f,F=v>.05?(1.5-r.y)/v:90;a=T<0&&r.z+T*F<ge+2.2+Pe*.25+4}oe(m.use("bake"),o.fb,p,p,null),oe(m.use("hole"),o.fb,p,p,null,!0),a&&oe(m.keel(!0),o.fb,p,p,null)};let S=0,Ie=We,Ft=0,pe=!1;const A=[0,0],xe=[0,0];let Fe=0;const W=[],_=[],me=[];let st=12+i()*20,ct=4+i()*8,Ht=0,nt=0;const it=(e,o)=>{const a=Lt(e,o);let c,n,l;if(a[1]>.06){let f=0,v=60;for(let be=0;be<300;be++)if(f+=.1,r.y+a[1]*f>R(r.x+a[0]*f,r.z+a[2]*f)){v=f;break}const T=Math.min(v,12),F=r.x+a[0]*T,$=r.z+a[2]*T;c=F,l=$,n=Math.max(R(F,$)-.6,r.y+.3)}else c=r.x+a[0]*2.4,n=r.y+a[1]*2.4,l=r.z+a[2]*2.4;const h=30+(i()*12|0);for(let f=0;f<h;f++){const v=i()<.3;me.push({at:S+Math.pow(i(),1.5)*.55,x:c+(i()-.5)*.08,y:n+(i()-.5)*.06,z:l+(i()-.5)*.08,r:v?.014+.02*i():.004+.008*i(),vx:(i()-.5)*.35,vz:(i()-.5)*.35,ph:i()*H})}t.sound.hit("noise",.3,{cutoff:900,dur:.5});for(let f=0;f<7;f++)t.sound.note(64+Math.floor(i()*20),{dur:.05,vel:.12+.1*i(),wave:"sine",at:f*.06+i()*.04})},Ut=(e,o,a,c)=>{let n=null,l=1e9;for(const f of _){const v=Math.hypot(f.x-e,f.z-o);v<f.r+.12&&v<l&&(l=v,n=f)}n||(_.length>=Ce&&_.shift(),n={x:e,z:o,vol:0,r:0,e:0,ph:i()*10,id:Ht++%37*.37+i()},_.push(n));const h=n.vol+a;n.x=(n.x*n.vol+e*a)/h,n.z=(n.z*n.vol+o*a)/h,n.vol=h,n.r=Math.sqrt(h/(Math.PI*.011)),n.e=Math.min(n.e+c,1.6),S-nt>.07&&(nt=S,t.sound.note(84+Math.floor(i()*10)-Math.min(12,n.r*30|0),{dur:.08,vel:.05+c*.2,wave:"sine"}))},rt=e=>{S+=e,Ie+=((pe?1:We)-Ie)*(1-Math.exp(-e*(pe?1.6:.35))),A[0]*=Math.exp(-e/7),A[1]*=Math.exp(-e/7),xe[0]+=A[0]*e,xe[1]+=A[1]*e,Fe+=(Math.min(Math.hypot(A[0],A[1])*3,1.2)-Fe)*(1-Math.exp(-e*2));for(let o=me.length-1;o>=0;o--)if(me[o].at<=S){const a=me.splice(o,1)[0];W.length<ut&&W.push(a)}for(let o=W.length-1;o>=0;o--){const a=W[o],c=.2+1.4*Math.sqrt(a.r);a.vx*=Math.exp(-e*2.2),a.vz*=Math.exp(-e*2.2),a.ph+=e*(a.r<.006?9:4);const n=a.r<.006?.05:.02;a.x+=(a.vx+A[0]+Math.cos(a.ph)*n)*e,a.z+=(a.vz+A[1]+Math.sin(a.ph*.8)*n)*e,a.y+=c*e,a.y>R(a.x,a.z)-a.r-.012&&(Ut(a.x,a.z,4.19*a.r*a.r*a.r*7,a.r>.01?.45:.12),W.splice(o,1))}for(const o of _){const a=gt(o.x,o.z);o.x+=(a[0]*.9+A[0]*.25)*e,o.z+=(a[1]*.9+A[1]*.25)*e,o.e*=Math.exp(-e*1.1),o.ph+=e*(4+o.e*6)}for(let o=0;o<_.length;o++)for(let a=_.length-1;a>o;a--){const c=_[o],n=_[a];if(Math.hypot(c.x-n.x,c.z-n.z)<(c.r+n.r)*.8){const l=c.vol+n.vol;c.x=(c.x*c.vol+n.x*n.vol)/l,c.z=(c.z*c.vol+n.z*n.vol)/l,c.vol=l,c.r=Math.sqrt(l/(Math.PI*.011)),c.e=Math.min(c.e+.8,1.6),_.splice(a,1),t.sound.note(57+Math.floor(i()*5),{dur:.3,vel:.12,wave:"sine"})}}if(S>st){st=S+18+i()*30;const o=70+i()*14;for(let a=0;a<9;a++)t.sound.note(o-a*2.2,{dur:.16,vel:.05,wave:"sine",at:a*.14})}S>ct&&(ct=S+6+i()*12,t.sound.hit("noise",.1,{cutoff:220,dur:1.4}),t.sound.note(28+Math.floor(i()*5),{dur:1.2,vel:.08,wave:"triangle",cutoff:300}))};let w=null;const Ct=e=>{const o=t.input,a=o.taps();if(pe=!1,o.down){w||(w={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0,drag:!1});const c=o.x-w.lx,n=o.y-w.ly;if(w.lx=o.x,w.ly=o.y,w.t+=e,w.path+=Math.hypot(c,n),w.path>.02){w.drag||(w.drag=!0,t.sound.hit("noise",.2,{cutoff:380,dur:1.6}));const l=r.fw[0],h=r.fw[2],f=Math.hypot(l,h)||1,v=6;A[0]=K(A[0]+(c*r.rt[0]-n*l/f)*v,-.6,.6),A[1]=K(A[1]+(c*r.rt[2]-n*h/f)*v,-.6,.6)}else w.t>.35&&(pe=!0,Ft+=e)}else w?(!w.drag&&w.t<=.35&&it(w.x0,w.y0),w=null):a.length&&it(a[0].x,a[0].y)},ie=new Float32Array(64*8*4),lt=()=>{ot(),Dt(),It(),u[11]=S,u[15]=Ie,x(22,Nt,Rt,xe[0],xe[1]),u[24*4+3]=46,x(27,_t,Fe,y.x+1.5*Math.sin(z),y.z+1.5*Math.cos(z)),ie.fill(0),W.forEach((o,a)=>{const c=o.r<.006?.05:.02;ie.set([o.x+Math.cos(o.ph)*c*.3,o.y,o.z+Math.sin(o.ph*.8)*c*.3,o.r],a*4)}),_.forEach((o,a)=>{ie.set([o.x,R(o.x,o.z)-.011,o.z,o.r],(4*64+a)*4),ie.set([o.e,o.ph,0,o.id],(5*64+a)*4)}),u[25*4]=_.length,u[25*4+1]=W.length,s.bindTexture(s.TEXTURE_2D,m.tD),s.texSubImage2D(s.TEXTURE_2D,0,0,0,64,6,s.RGBA,s.FLOAT,ie),u[30*4+3]=de.w,Le=null,oe(m.use("vol"),de.fb,ue,ue,ae.tex),Le=de.tex,oe(m.use("comp"),De.fb,p,p,ae.tex),s.enable(s.BLEND),s.blendFunc(s.ONE,s.ONE_MINUS_SRC_ALPHA);const e=m.use("pt");s.useProgram(e.p),s.uniform4fv(e.uP,u),et(ae.tex),s.bindVertexArray(m.vao),s.drawArrays(s.POINTS,0,ce[0]+ce[1]+ce[2]+Qe+W.length),s.disable(s.BLEND),s.flush(),oe(m.use("fin"),null,p,p,De.tex)};ot();for(let e=0;e<3;e++)rt(1/30);lt();let ye=0;const ht=(e,o)=>{for(o=K(o||1/30,0,.1),Ct(o),ye=Math.min(ye+o,.2);ye>=1/60;)ye-=1/60,rt(1/60);lt()};return Be&&Be.register(ht,()=>tt),ht}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
