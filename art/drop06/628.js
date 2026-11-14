// Clear Rift: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/628.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pe){Pe&&function(){"use strict";const Ze={yaw:0,pitch:0,x:0,y:0,z:0},Ye=0,$=(e,o,r)=>e<o?o:e>r?r:e,Je=.26,$e=.19,B=Math.PI*2,Qe=9.81,ue=21,G=14,C=256,me=32,et=12,tt=300,ot=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,L=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,_=`
uniform vec4 uP[${ue}];
uniform sampler2D uN, uR, uD, uT, uC, uW, uQ, uK, uS, uM, uF;
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define EXPO uP[3].w
#define SUN uP[4].xyz
#define SUNE uP[4].w
#define SUNC uP[5].rgb
#define SLK uP[5].w
#define KD uP[6].rgb
#define AMB uP[6].w
#define WCOL uP[7].rgb
#define MOSSD uP[7].w
#define SKYC uP[8].rgb
#define MOSSA uP[8].w
#define MC1 uP[9].rgb
#define RK uP[9].w
#define HW uP[10].x
#define A1 uP[10].y
#define A2 uP[10].z
#define PH1 uP[10].w
#define PH2 uP[11].x
#define PH3 uP[11].y
#define PH4 uP[11].z
#define DOG uP[11].w
#define T1 uP[12].x
#define T2 uP[12].y
#define T3 uP[12].z
#define DRP uP[12].w
#define RIM uP[13].x
#define SHK uP[13].y
#define MIR uP[13].z
#define KAP uP[13].w
#define SKH uP[14].rgb
#define SILV uP[14].w
#define SKZ uP[15].rgb
#define NWV int(uP[15].w)
#define MC2 uP[16].rgb
#define VEIL uP[16].w
#define SUNA uP[17].xyz
#define LAG uP[17].w
#define AMBK uP[18].x
#define MOSSL uP[18].y
#define RAIN uP[18].z
#define ICE uP[18].w
#define CHK uP[19].x
#define SHC uP[19].y
#define NZ int(uP[19].w)
#define COV uP[20].x
#define FAC uP[20].y
#define MATS uP[20].z
#define MAPL ${me}.
#define TMAX ${tt}.
vec3 ray(vec2 u) { return normalize(FW + (u.x * 2. - 1.) * TANH * RT + (u.y * 2. - 1.) * TANH * UPV); }
float upk(vec3 c) { return dot(floor(c * 255. + .5), vec3(65536., 256., 1.)) / 16777216. * 400.; }
vec3 tmap(vec3 c) {
  c *= EXPO;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
#ifdef HALF
// "Half above, half below": the lens half in the air. The waterline across the frame (static, so both bakes split on it;
// the composite's band, a little wider than its own sway, hides the seam). The eye above it floats AIRH over the water.
#define LNY uP[19].z
#define LNT uP[20].w
#define AIRH .14
float wl(float x) { return LNY + LNT * (x - .5) + .0045 * sin(x * 19. + PH1) + .002 * sin(x * 53. + PH3); }
bool airAt(vec2 u) { return u.y > wl(u.x); }
#define UPW(v) (air ? -(v) : (v))
#else
#define UPW(v) v
#endif
`,ne=`
float cl(float z) { return A1 * sin(z * .047 + PH1) + A2 * sin(z * .0193 + PH2) + DOG * smoothstep(22., 52., z); }
float hw(float z) {
  float h = HW * (1. + .16 * sin(z * .063 + PH3) + .1 * sin(z * .0271 + PH4));
  h *= 1. - .55 * step(.5, CHK) * exp(-(z - CHK) * (z - CHK) * .012);
  return h * mix(.42 + 1.9 * LAG, 1., smoothstep(-30. + 8. * LAG, -4. * LAG, z));
}
float flY(float z) {
  return mix(-.55 - 2.7 * LAG, -9., smoothstep(-27. + 13. * LAG, -5. + 3. * LAG, z)) - max(z + 5., 0.) * DRP - 1.3 * sin(z * .09 + PH1) * smoothstep(-12., 12., z);
}
float ter(float y, float z, float sd) {
  float n = sin(z * .061 + sd) * .3;
  float zc = z / 2.3;
  n += (textureLod(uN, vec2(zc * .0391 + sd * .37, zc * .0173 + y * .002), 0.).r - .5) * 3.4 + (textureLod(uN, vec2(z * .071 + sd * .37, y * .05), 2.).r - .5) * .9;
  return T1 * smoothstep(-2.3, -3.5, y + n) + T2 * smoothstep(-5.7, -7.3, y + n * 1.6) + T3 * smoothstep(-10.2, -12., y + n * 2.);
}
// where on the block relief a wall point lies: a gentle warp so the joints are not ruled lines (shared with the shading,
// so tone and joints sit on the blocks the march found)
vec2 wqf(float z, float y, float sd) {
  vec2 wq = vec2(z + sd * 17.3, y + sd * 9.1);
  // smooth octaves only: the fine ones, stretched over the steep joint faces, grew teeth along every edge
  return wq + (textureLod(uN, wq * vec2(.11, .083) + sd * .31, 3.).rg - .5) * vec2(.55, .38);
}
// a wall block's relief from the baked joint distance and the heights either side of the joint
// (the block's shoulder falls to the joint over about 25 cm on a curve: tops domed, edges blunt, never a 10 cm box step)
float blkR(vec4 rr) {
  float dj = rr.r * .4, x = 1. - clamp(dj / .24, 0., 1.);
  return max(mix(rr.b, rr.g, 1. - .5 * x * x) - .06 * (1. - smoothstep(.0, .06, dj)), 0.);
}
float smx(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(a, b, h) + k * h * (1. - h); }
// the floor above its base line: rockfall from the walls lying wall to wall in three sizes (boulders, stones, cobbles),
// heaped on and against each other, with pale silt only in the pockets between; sl returns the silt's own level and
// FLT the tone of the rock on top (the shading reads it; the march ignores it)
float FLT;
float flr(vec2 xz, out float sl) {
  float un = textureLod(uN, xz / 67., 0.).g, sc = 1. - .6 * LAG;
  vec4 A = textureLod(uF, xz / 64. + .37, 0.), B = textureLod(uF, xz / 36. + .11, 0.), C = textureLod(uF, xz / 17. + .71, 0.);
  float far = 1. - smoothstep(14., 32., length(xz - CAM.xz));
  float big = A.r * 2.5;
  // the stones heap against the boulders and fill between them; only in a few hollows do they sink under the silt
  float cls = smoothstep(.2, .5, un + .6 * smoothstep(.0, .4, big)) * COV;
  // (stones and cobbles sit deep in the silt: low backs, their steep sides buried)
  float mid = B.b * .62 - .03 - (1. - cls) * .4, sml = C.b * .3 - .05 - (1. - cls * far) * .3;
  float s0 = .55 + .18 * un + .012 * sin(dot(xz, vec2(.8, 2.9)) + un * 9.) * far, base = (un - .5) * .6 * sc;
  float rb = .6 + big - (1. - COV) * .5, rm = .64 + max(mid, sml);
  FLT = rb > rm ? A.g : mid > sml ? B.a : C.a;
  // the silt banks against the rock in a soft fillet (a smooth max of the two levels; sl carries the bank, so the
  // shading calls it silt)
  float rk = max(rb, rm), fs = smx(s0, rk, .26);
  sl = (s0 + fs - max(s0, rk)) * sc + base;
  return fs * sc + base;
}
`,ve=`
float map(vec3 p) {
  float z = p.z, dx = p.x - cl(z), ax = abs(dx), sd = dx < 0. ? -1. : 1., h = hw(z);
  vec2 wq = wqf(z, p.y, sd);
  float r = blkR(textureLod(uR, wq / 64., 0.)) + (textureLod(uN, wq * .0177 + .13, 2.).b - .5) * .4;
  float w = h - ter(p.y, z, sd) - r * RK - ax;
  float xr = ax / h, fs = 9. * xr * xr / h, sl, f = flY(z) + 3. * xr * xr * xr + flr(p.xz, sl);
  // the block faces are steep, so w alone over-reports near the rock; clear of the outermost blocks the envelope is the
  // honest distance, and inside it a third of w keeps the march from skipping block corners (saw teeth on edges)
  float d = min(max((w - (1.25 - r) * RK) * .62, w * .3), (p.y - f) * .7 * inversesqrt(1. + fs * fs));
  // a chockstone wedged across the narrows (only where the view rolls one)
  // (two broken blocks jammed against each other, each end a fracture face, not one rounded box)
  if (CHK > .5) {
    vec3 cq = p - vec3(cl(CHK), -1.9, CHK);
    vec3 qa = cq - vec3(-1.25, .1, 0.), qb = cq - vec3(1.75, -.35, .2);
    qa.xy = mat2(.96, .28, -.28, .96) * qa.xy; qb.xy = mat2(.98, -.2, .2, .98) * qb.xy; qb.xz = mat2(.97, .24, -.24, .97) * qb.xz;
    vec3 ba = abs(qa) - vec3(2.3, .72, 1.2), bb = abs(qb) - vec3(1.75, .62, 1.05);
    float da = length(max(ba, 0.)) + min(max(ba.x, max(ba.y, ba.z)), 0.) - .05;
    float db = length(max(bb, 0.)) + min(max(bb.x, max(bb.y, bb.z)), 0.) - .05;
    da = max(da, max(dot(qa, vec3(-.83, .33, .45)) - 1.75, dot(qa, vec3(.6, .55, -.58)) - 1.5));
    db = max(db, max(dot(qb, vec3(.8, -.36, .48)) - 1.35, dot(qb, vec3(-.5, .7, .51)) - 1.05));
    d = min(d, min(da, db));
  }
  // the walls end a little above the water in broken block tops, not on a plane
#ifdef HALF
  // seen from the air the tops must be one surface: their height read from the relief at one level, not per height (read
  // per height, rows of different blocks stood as floating slabs and teeth against the sky)
  float rc = blkR(textureLod(uR, wqf(z, RIM, sd) / 64., 0.));
  return max(d, p.y - RIM - (sd > 0. ? 1. : 0.) - 1.3 * rc);
#else
  return max(d, p.y - RIM - (sd > 0. ? 1. : 0.) - 1.3 * r);
#endif
}
`,at=`out vec4 oC;
in vec2 vUV;
uniform float uZ;   // never set (0): loop bounds that D3D keeps rolled
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) / 16777216.; }
// value noise on the tile's 64 m period (a block's face is rough and bowed, and its rows wander)
float rvn(vec2 p, float f) {
  vec2 i = floor(p * f), u = p * f - i; u = u * u * (3. - 2. * u);
  float m = floor(64. * f + .5);
  #define RH(a, b) hf((uint(mod(i.x + a, m)) + uint(mod(i.y + b, m)) * 7919u) * 5u + uint(f * 7.))
  return mix(mix(RH(0., 0.), RH(1., 0.), u.x), mix(RH(0., 1.), RH(1., 1.), u.x), u.y);
}
// a block's height: column ic, row rr, tilted across the column (pq: to the column's seed, cells) and up the row (ff)
float bkh(uint ic, float rr, vec2 pq, float ff) {
  uint b = ic * 31u + uint(rr + 999.);
  return clamp(.12 + .88 * pow(hf(b), 1.5) + .22 * (hf(b + 3u) - .5) * pq.x + .5 * (hf(b + 13u) - .5) * (ff - .5), 0., 1.);
}
void main() {
  vec2 s = vUV * 64., g = vec2(64. / 46., 64. / 15.), ig = floor(s / g), fg = s / g - ig;
  float d1 = 9.; vec2 pc = vec2(0.); uint id1 = 0u;
  int Z = int(uZ);
  for (int j = -1; j <= 1 + Z; j++) for (int i = -1; i <= 1 + Z; i++) {
    vec2 of = vec2(float(i), float(j)), ce = mod(ig + of, vec2(46., 15.));
    uint id = uint(ce.x) + uint(ce.y) * 97u + 5u;
    vec2 q = of + vec2(hf(id * 3u + 11u), hf(id * 7u + 2u)) * .9 + .05 - fg;
    float e = dot(q, q);
    if (e < d1) { d1 = e; pc = q; id1 = id; }
  }
  // exact distance (metres) to the nearest column edge: the bisector with each neighbour seed, measured in metres
  float ed = 9.; vec2 pn = vec2(0.); uint idn = id1;
  for (int j = -2; j <= 2 + Z; j++) for (int i = -1; i <= 1 + Z; i++) {
    vec2 of = vec2(float(i), float(j)), ce = mod(ig + of, vec2(46., 15.));
    uint id = uint(ce.x) + uint(ce.y) * 97u + 5u;
    vec2 q = of + vec2(hf(id * 3u + 11u), hf(id * 7u + 2u)) * .9 + .05 - fg;
    if (dot(q - pc, q - pc) < 1e-6) continue;
    vec2 nC = normalize(q - pc);
    float e = dot((pc + q) * .5, nC) / length(nC / g);
    if (e < ed) { ed = e; pn = q; idn = id; }
  }
  // no courses: each column's row joints tilt by its own hash and wander with the rock, so no joint runs level past a block
  float wv = (rvn(s, .75) - .5) * .7;
  float rk = .55 + 1.7 * hf(id1 + 5u), vk = (s.y + hf(id1 + 2u) * 6. - pc.x * g.x * (hf(id1 + 8u) - .5) * .7 + wv) / rk, rw = floor(vk), fk = vk - rw;
  float hb = min(fk, 1. - fk) * rk;
  float rn = .55 + 1.7 * hf(idn + 5u), vn = (s.y + hf(idn + 2u) * 6. - pn.x * g.x * (hf(idn + 8u) - .5) * .7 + wv) / rn, nb = fk < .5 ? -1. : 1.;
  bool col = ed < hb;
  vec2 hh = vec2(0.);
  for (int k = 0; k < 2 + Z; k++) {
    bool o = k == 0;
    hh[k] = bkh(o ? id1 : col ? idn : id1, o ? rw : col ? floor(vn) : rw + nb, o || !col ? pc : pn, o ? fk : col ? fract(vn) : fk - nb);
  }
  // each block's face rough and bowed: relief at half a block and a finer pitting (the same at both sides of a joint)
  float fr = (rvn(s + 2.3, 1.5) - .5) * .17 + (rvn(s + 5.9, 6.) - .5) * .05;
  float hO = clamp(hh.x + fr, 0., 1.), hN = clamp(hh.y + fr, 0., 1.);
  uint bid = id1 * 31u + uint(rw + 999.);
  oC = vec4(min(min(ed, hb) / .4, 1.), hO, hN, hf(bid * 3u + 1u));
}`,rt=`out vec4 oC;
in vec2 vUV;
uniform float uZ;
uniform sampler2D uN;
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) / 16777216.; }
// value noise on a 64-unit periodic lattice (for broken faces: a block's faces and edges are never planes)
float vn(vec2 p, float f) {
  vec2 i = floor(p * f), u = p * f - i; u = u * u * (3. - 2. * u);
  uint m = uint(64. * f + .5);
  #define VH(a, b) hf((uint(mod(i.x + a, float(m))) + uint(mod(i.y + b, float(m))) * 7919u) * 3u + uint(f))
  return mix(mix(VH(0., 0.), VH(1., 0.), u.x), mix(VH(0., 1.), VH(1., 1.), u.x), u.y);
}
// smooth max / min (polynomial): rounded joins where two faces meet
float smx(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(a, b, h) + k * h * (1. - h); }
float smn(float a, float b, float k) { return -smx(-a, -b, k); }
vec2 blk(vec2 s, float n, uint salt, float occ, float r0, float r1, float th, float rs, vec4 N1) {
  float cs = 64. / n; vec2 iv = floor(s / cs), fv = s / cs - iv;
  float bh = 0., tn = .5;
  // the grain and the edge waviness do not depend on the block: read once here, not per neighbour
  float vg = (vn(s, 9.) - .5) * .008, vd = vn(s + 7.1, 2.) - .5;
  // basalt broken along cooling joints: no face flat, no edge straight. The outline is warped at the stone's own size and
  // at a quarter of it, the top carries lumps at a third of its size and pits at a tenth; all in units of the stone's
  // radius (scaled per block below), read once here
  // (N1: the noise tile, read in main at whole repeats of the 64-unit tile so the bake stays seamless; the same noise
  // computed here cost 110 ms of the Windows first make)
  vec2 wp = (N1.rg - .5) * .65;
  float lp = (N1.b - .5) * .15 - abs(N1.a - .5) * .2;
  int Z = int(uZ);
  for (int j = -1; j <= 1 + Z; j++) for (int i = -1; i <= 1 + Z; i++) {
    vec2 of = vec2(float(i), float(j)), ce = mod(iv + of, vec2(n));
    uint id = uint(ce.x) + uint(ce.y) * 101u + salt;
    vec2 q = (fv - of - .5 - (vec2(hf(id * 5u + 1u), hf(id * 11u + 3u)) - .5) * .5) * cs;
    float rad = cs * mix(r0, r1, hf(id + 7u)), a0 = hf(id) * 6.283, dd = -9.;
    q += wp * rad;
    if (hf(id + 29u) <= occ && dot(q, q) <= rad * rad * 2.7) {   // a block here, and not clear of its widest corner
      int ns = 5 + int(hf(id + 3u) * 3.99);
      for (int k = 0; k < 8 + Z; k++) {
        if (k < ns) {
          float a = a0 + (float(k) + .8 * (hf(id + 40u + uint(k)) - .5)) * 6.283 / float(ns);
          // the sides joined by a rounded corner (6 % of the radius on a boulder, never a knife; the stones and cobbles
          // worn sub-angular)
          dd = smx(dd, dot(q, vec2(cos(a), sin(a))) - rad * (.7 + .42 * hf(id + 50u + uint(k))), rs * rad);
        }
      }
      // a bite or two broken out of the outline
      // (a wedge with two flat faces, not a round scoop: scoops read as thumbed clay)
      for (int k = 0; k < 2 + Z; k++) {
        float b = a0 + (k == 0 ? 2.1 : 4.4) + hf(id + 60u + uint(k) * 4u), wa = .55 + .5 * hf(id + 62u + uint(k) * 4u);
        vec2 cb = q - vec2(cos(b), sin(b)) * rad * (.42 + .25 * hf(id + 61u + uint(k) * 4u));
        float nt = min(dot(cb, vec2(cos(b + wa), sin(b + wa))), dot(cb, vec2(cos(b - wa), sin(b - wa))));
        if (rs < .1 && hf(id + 64u) < .5 && (k == 0 || hf(id + 63u) < .55)) dd = max(dd, nt);
      }
      // the top: tilted, and on most a ridge where two facets meet
      // (the ridge a rounded crease, not a ruled line)
      float a2 = hf(id + 70u) * 6.283, rx = dot(q, vec2(cos(a2), sin(a2))) - rad * (hf(id + 71u) - .5) * .7, e = .12 * rad;
      float top = th * rad * (.5 + .5 * hf(id + 13u)) + dot(q, vec2(hf(id + 17u) - .5, hf(id + 19u) - .5)) * .7
        - (sqrt(rx * rx + e * e) - e) * (.2 + .45 * hf(id + 72u)) * step(.3, hf(id + 73u));
      // broken faces: a few centimetres of chipped relief on the tops, the edges notched
      // corners broken off in flat facets, and only a fine grain on the faces (broad noise kneaded them into dough)
      float a3 = hf(id + 74u) * 6.283, a4 = a3 + 2.2 + 1.6 * hf(id + 75u);
      top = min(top, th * rad * (.25 + .3 * hf(id + 76u)) + (rad * (.35 + .3 * hf(id + 77u)) - dot(q, vec2(cos(a3), sin(a3)))) * (.5 + .6 * hf(id + 78u)));
      top = min(top, th * rad * (.3 + .3 * hf(id + 79u)) + (rad * (.4 + .3 * hf(id + 81u)) - dot(q, vec2(cos(a4), sin(a4)))) * (.6 + .6 * hf(id + 82u)));
      top += vg + lp * rad;
      dd += vd * rad * .03;
      // the arris rounded a hand wide where the sides meet the top
      float h = smn(top, -dd * (1.7 + 1.6 * hf(id + 80u)) * (1. - 1.5 * rs + .09), rs * rad);
      if (h > bh) { bh = h; tn = hf(id + 90u); }
    }
  }
  return vec2(bh, tn);
}
void main() {
  vec2 s = vUV * 64., b = vec2(0.), m = vec2(0.);
  vec4 Nb = textureLod(uN, s * (5. / 64.) + .31, 0.), Ns = textureLod(uN, (s + 13.7) * (13. / 64.) + .31, 0.);
  for (int k = 0; k < 2 + int(uZ); k++) {
    bool o = k == 0;
    vec2 r = blk(o ? s : s + 13.7, o ? 14. : 40., o ? 773u : 1907u, o ? .92 : .96, o ? .36 : .38, o ? .6 : .62, o ? .55 : .6, o ? .06 : .24, o ? Nb : Ns);
    if (o) b = r; else m = r;
  }
  oC = vec4(clamp(b.x / 2.5, 0., 1.), b.y, clamp(m.x, 0., 1.), m.y);
}`,st=`out vec4 oC;
in vec2 vUV;
void main() {
  float z = vUV.y * 320. - 40.;
  vec3 p = vec3(cl(z) + (vUV.x * 2. - 1.) * 26., .02, z);
  float k = 1., t = .05;
  for (int i = 0; i < 26 + NZ; i++) {
    float d = map(p + SUN * t);
    if (d < .01) { k = 0.; break; }
    k = min(k, 7. * d / t);
    t += clamp(d, .12, 2.2);
  }
  k = clamp(k, 0., 1.);
  oC = vec4(k * k * (3. - 2. * k));
}`,it=`out vec4 oC;
in vec2 vUV;
// The walls are a height field of blocks with steep joint faces, so the field over-reports distance there and a plain
// march lands inside the rock (zigzag bands, smeared faces). Any step that ends inside is taken back by bisection to
// the true face. The direct ray and its reflection off the mirror share one loop, so map() has one call site.
void main() {
#ifdef HALF
  bool air = airAt(vUV);
  vec3 C0 = air ? vec3(CAM.x, AIRH, CAM.z) : CAM;
  #undef CAM
  #define CAM C0
#endif
  vec3 dv = ray(vUV), ro = CAM, rd = dv;
  float ts = UPW(dv.y) > .0005 ? -CAM.y / dv.y : 1e9;
  float tm = min(ts, TMAX), base = 0., fl = 0., t = 0., lo = 0., hi = -1.;
  for (int i = 0; i < 280 + NZ; i++) {
    float d = map(ro + rd * t), tw = base + t;
    if (hi >= 0.) {
      if (d < 0.) hi = t; else lo = t;
      if (hi - lo < .002 + tw * .0004) { t = lo; break; }
      t = (lo + hi) * .5;
    } else if (d >= 0. && d < .002 + tw * .0012) {
      break;
    } else if (d < 0.) {
      hi = t; t = (lo + t) * .5;
    } else {
      lo = t; t += max(d * .92, .001 + tw * .0016);   // never crawl along a grazing face: an overshoot is bisected
#ifdef HALF
      // in the air a ray climbing clear of the banks has nothing more to hit: the sky
      if (air && rd.y > 0. && ro.y + rd.y * t > RIM + 5.) { t = tm = TMAX - base; break; }
#endif
      if (t > tm) {
        if (fl > .5 || ts >= TMAX) break;
        // reached the surface: carry on along the mirrored ray
        fl = 1.; base = ts; ro = CAM + dv * ts; rd = vec3(dv.x, -dv.y, dv.z); ro += rd * .01; tm = TMAX - ts; t = 0.; lo = 0.;
      }
    }
  }
  float tt = base + min(t, tm);
  float v = clamp(tt / 400., 0., 1.) * 16777215.;
  vec3 c = vec3(floor(v / 65536.), floor(mod(v, 65536.) / 256.), floor(mod(v, 256.))) / 255.;
  oC = vec4(c, fl);
}`,nt=`out uvec4 oG;
in vec2 vUV;
void main() {
#ifdef HALF
  bool air = airAt(vUV);
  vec3 C0 = air ? vec3(CAM.x, AIRH, CAM.z) : CAM;
  #undef CAM
  #define CAM C0
  #define SUNX (air ? SUNA : SUN)
#else
  #define SUNX SUN
#endif
  vec4 tv = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  float t = upk(tv.rgb);
  bool rf = tv.a > .5;
  vec3 d = ray(vUV), ro = CAM, dd = d;
  float t1 = t;
  if (rf) { float ts = -CAM.y / d.y; ro = CAM + d * ts; dd = vec3(d.x, -d.y, d.z); t1 = t - ts; }
  vec3 p = ro + dd * t1;
  vec3 n0 = vec3(0., 1., 0.);
  float ao = 1., sk = 1.;
  if (t < TMAX - .5) {
    // one normal, wider than a few relief texels (finer differences show its bilinear steps along the block edges)
    // the normal, the occlusion and the sun's shadow share one rolled loop with one map() call site (each inlined copy of
    // map costs the D3D compiler dearly)
    vec3 nacc = vec3(0.);
    // (the fine normal only on the floor clear of the walls' feet: on the walls' lowest ledges it showed every relief texel as a comb)
    float t2 = .14, ne = max(p.y < flY(p.z) + 2.6 && abs(p.x - cl(p.z)) < .5 * hw(p.z) ? .035 : .075, t * .0021);
    for (int i = 0; i < 60 + NZ; i++) {
      vec3 kv = i == 0 ? vec3(1., -1., -1.) : i == 1 ? vec3(-1., -1., 1.) : i == 2 ? vec3(-1., 1., -1.) : vec3(1.);
      float ah = .16 * float((i - 3) * (i - 3));
      vec3 q = i < 4 ? p + kv * ne : i < 9 ? p + n0 * ah : p + n0 * .05 + SUNX * t2;
      if (i >= 9 && q.y > RIM + 4.) break;
      float dm = map(q);
      if (i < 4) { nacc += kv * dm; n0 = normalize(nacc); }
      else if (i < 9) ao -= max(ah - dm, 0.) * (.34 / (ah + .4));
      else {
        if (dm < .005) { sk = 0.; break; }
        sk = min(sk, 9. * dm / t2);
        t2 += clamp(dm, .02 + t2 * .012, 1.2);
      }
    }
  }
  oG = uvec4(floatBitsToUint(n0), packUnorm2x16(clamp(vec2(ao, sk), 0., 1.)));
}`,ct=`out vec4 oC;
in vec2 vUV;
uniform highp usampler2D uG;
void main() {
#ifdef HALF
  bool air = airAt(vUV);
  vec3 C0 = air ? vec3(CAM.x, AIRH, CAM.z) : CAM, aC = vec3(0.);
  #undef CAM
  #define CAM C0
  #define SUNX (air ? SUNA : SUN)
#else
  #define SUNX SUN
#endif
  vec4 tv = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  float t = upk(tv.rgb);
  bool rf = tv.a > .5;
  vec3 d = ray(vUV), ro = CAM, dd = d;
  float t1 = t;
  if (rf) { float ts = -CAM.y / d.y; ro = CAM + d * ts; dd = vec3(d.x, -d.y, d.z); t1 = t - ts; }
  vec3 col = vec3(0.);
  float caus = 0.;
  vec3 p = ro + dd * t1;
  if (t < TMAX - .5) {
    // the normal, occlusion and shadow from the first half
    uvec4 gq = texelFetch(uG, ivec2(gl_FragCoord.xy), 0);
    vec3 n0 = uintBitsToFloat(gq.xyz);
    vec2 as = unpackUnorm2x16(gq.w);
    float ao = as.x, shadow = as.y;
    vec3 n = n0;
    // what we hit: wall or floor, and its block data
    float dx = p.x - cl(p.z), ax = abs(dx), sd = dx < 0. ? -1. : 1.;
    // block data read a little up-slope, so a joint face takes the tone of the block it belongs to instead of
    // smearing the narrow joint across its whole height
    vec2 wq = wqf(p.z - n0.z * .16, p.y - n0.y * .16, sd) / 64.;
    vec4 rw = textureLod(uR, wq, 0.);
    float crk = 1. - smoothstep(.0, .1, rw.r * .4), btone = rw.a;
    float isW = smoothstep(.45, .75, abs(n.x));
    vec3 an = abs(n0);
    vec2 tq = (an.y > max(an.x, an.z) ? p.xz : an.x > an.z ? p.zy : p.xy) / 64.;
    // texture lookups filtered to the pixel's footprint (one 256 px noise tile per 64 m at scale 1)
    float L0 = log2(max(t * 8. * TANH / SZ / max(abs(dot(n0, dd)), .25), 1e-6));
    // fine rock: pitted, vesicular texture carried on the normal (never at the far end)
    float det = 1. - smoothstep(14., 55., t);
    vec4 v1 = textureLod(uN, tq * 21., L0 + 4.4), v2 = textureLod(uN, tq * 83., L0 + 6.4);
    float s1 = v1.r, s2 = v2.r;
    // fine grain only: broad tilts of the normal read as cloud camouflage over the blocks
    // (doubled on the floor's rock within a few metres of the eye, where a face would otherwise shade as one gradient)
    vec3 rb = (v2.gba - .5) * .3 * (1. + (1. - isW) * (1. - smoothstep(5., 8., t)));
    n = normalize(n + (rb - n * dot(rb, n)) * det);
    // the floor: broken blocks, and pale silt lying level in the hollows between them
    float silt = 0., fsl = 1.;
    if (isW < .5) {
      float sl, fh = flr(p.xz, sl);
      fsl = fh - sl;
      silt = smoothstep(.05, .0, fh - sl) * smoothstep(.55, .85, n0.y) * step(p.y, flY(p.z) + 2.6);
      btone = mix(FLT, btone, smoothstep(.1, .45, isW));
    }
    // troll hair: green filaments rooted on the upper rock, streaming one way in the slow current
    float depth = max(-p.y, 0.), up0 = n0.y;
    vec2 mq = tq;
    float mo1 = textureLod(uN, mq * 3.1, L0 + 1.6).b, mo3 = textureLod(uN, p.xz * .05, 0.).a;
    float up = smoothstep(.1, .55, n0.y);
    float dm = 1. - smoothstep(MOSSD * .25, MOSSD * .55, depth);
    float pat = smoothstep(.36, .6, mo1 + (mo3 - .5) * .45);
    vec2 sq = mat2(.94, .34, -.34, .94) * mq;
    // strands stream along the current on ledges and hang down the faces (lengthwise stripes across a face read as paint)
    float strand = textureLod(uN, (an.y > max(an.x, an.z) ? vec2(sq.x * 2.2, sq.y * 44.) : vec2(sq.x * 44., sq.y * 2.2)) + mo1 * .3, L0 + 5.2).g;
    strand = mix(.5, strand, 1. - smoothstep(4., 6., L0 + 5.2));
    strand = smoothstep(.38, .72, strand);
    float moss = dm * smoothstep(.15, .85, up * (.55 + .7 * pat) + (pat - .5) * .5 * MOSSA + (MOSSA - 1.) * .25);
    moss += MOSSA * .3 * pat * (1. - smoothstep(.5, 3.5 * MOSSL, depth)) * smoothstep(.0, .25, n0.y + .4) * (1. - up);
    moss = clamp(moss, 0., 1.) * (1. - .6 * crk) * (1. - silt) * mix(.08, 1., strand) * (1. - LAG * (1. - isW));
    // rich mints: mats of troll hair over a third to a half of the upward rock in the top six metres, the boulder tops in
    // the lagoon too, streaked along the current but whole mats, not stripes
    float mats = MATS * up * (1. - smoothstep(4.5, 6.5, depth)) * smoothstep(.47, .6, pat + (mo1 - .5) * .35) * (1. - silt) * (1. - .7 * crk);
    moss = max(moss, mats * mix(.6, 1., strand));
    // light at this depth
    float dep2 = -min(p.y, -.05);
    vec3 Ln = exp(-KD * dep2 / max(SUN.y, .12));
    float ndl = max(dot(n, SUN), 0.);
    // the downwelling glow of the bright surface: strongest on what faces up (the silt in the rim's shadow still reads)
    float ambL = AMBK * AMB * (.5 + .5 * n.y + .45 * max(n.y, 0.) * (1. - shadow)) * ao * ao * (.45 + .55 * exp(-.07 * dep2));
    vec3 ambC = SKYC * exp(-KD * dep2 * 1.25);
    vec3 fill = WCOL * .35 * mix(ao, sqrt(ao), isW) * (.75 - .25 * n.y);
    // in the top metre and a half (and on every block of the lagoon) red still reaches: the rock shows its own brown
    float wrm = max(smoothstep(-2.2, -.6, p.y), LAG * smoothstep(-5., -2., p.y));
    ambC = mix(ambC, vec3(dot(ambC, vec3(.33))) * vec3(1.08, .96, .84), wrm * .55);
    fill *= 1. - .5 * wrm;
    // the pale floor throws its light onto the lower wall faces
    fill *= 1. + isW * (1. - smoothstep(3., 7., p.y - flY(p.z)));
    vec3 sunC = SUNC * SUNE * 1.3 * Ln * shadow;
    // basalt: one dark brown-grey, each block a shade apart, a faint grain near; an ochre stain on a few blocks; black
    // joints; a dusting of silt on every upward ledge. The light gives the form, not the paint
    float tone = .72 + .56 * btone;
    vec3 alb = vec3(.1, .066, .045) * tone * (.56 + .2 * (s1 - .5) + .2 * (s2 - .5) * det);
    alb = mix(alb, vec3(.1, .062, .036) * tone * .6, smoothstep(.82, .97, btone) * smoothstep(.4, .7, s1) * .7);
    // (joints only on the walls: drawn on a fallen boulder's steep face they read as a net)
    alb *= 1. - .9 * crk * smoothstep(.0, .4, isW) * det * smoothstep(.45, .7, ax / hw(p.z));
    vec3 sC = mix(vec3(.13, .125, .115), vec3(.072, .1, .11), LAG);
    // rust: iron stains on the shallow rock
    alb = mix(alb, vec3(.17, .075, .035) * tone * .62, wrm * smoothstep(.45, .7, s1 + (btone - .5) * .4) * .8);
    // gas pits and grit on the fallen rock: dark flecks
    alb *= 1. - .45 * smoothstep(.3, .2, s2) * det * (1. - isW);
    // the dusting thins toward the arris (only the flattest of a top holds it)
    alb = mix(alb, sC * .7, smoothstep(.8, .97, n0.y) * (1. - silt) * .36 * smoothstep(.3, .62, s1 + (mo3 - .5) * .5));
    // silt: a step under the corridor's light, mottled and freckled with grit, a damp shade where it meets the rock
    float sm = mix(.75, 1.1, clamp(s1 * .6 + mo3 * .7 - .15, 0., 1.)) * (1. - .35 * smoothstep(.28, .18, s2) * det);
    alb = mix(alb, sC * .48 * sm * (1. - .25 * smoothstep(.005, .045, fsl)), silt);
    // the lit wall throws a little of the sun back across the crack onto the shaded one
    float bs = SUN.x < 0. ? 1. : -1.;
    vec3 bnc = SUNC * SUNE * Ln * vec3(.5, .62, .78) * .18 * max(n.x * bs, 0.) * ao;
    vec3 cr = alb * (ambC * ambL + fill + bnc) + alb * sunC * ndl;
    float sunPart = dot(alb * sunC * ndl, vec3(.3, .6, .1));
    float ambPart = dot(cr, vec3(.3, .6, .1));
    if (moss > .005) {
      float m2 = textureLod(uN, mq * 1.7, 0.).b;
      vec3 ma = mix(MC2, MC1, smoothstep(.25, .75, strand * (1. - smoothstep(1., 4.5 * MOSSL, depth)) + (m2 - .5) * .4)) * (.3 + .7 * strand) * .5;
      ma = mix(vec3(dot(ma, vec3(.3, .6, .1))), ma, .72 - .08 * MATS) * (1. - .4 * MATS);
      vec3 nv = normalize(n0 + vec3(0., .5, 0.));
      float wrap = max(dot(nv, SUN) * .8 + .2, 0.);
      // in shade it is a dull olive no brighter than the rock round it; only the sun lights it lime
      vec3 mc = ma * .4 * (ambC * ambL + fill + bnc) + ma * sunC * wrap * (.6 + .4 * ndl);
      float mP = dot(ma * sunC * wrap, vec3(.3, .6, .1));
      cr = mix(cr, mc, moss);
      sunPart = mix(sunPart, mP, moss);
      ambPart = dot(cr, vec3(.3, .6, .1));
    }
    caus = rf ? 0. : clamp(sunPart / max(ambPart, 1e-5), 0., 1.);
    // along the path to the eye the light dims with the water, red first
    col = cr * exp(-KD * t);
#ifdef HALF
    if (air) {
      // above the water: dry basalt in daylight, dark brown-grey, with ochre and grey-green heath on the tops (snow on them
      // when the surface is iced); sun and sky light, a little haze far off
      vec3 aA = mix(vec3(dot(alb, vec3(.33))), alb, .55) * 1.4;
      float tp = smoothstep(.5, .88, n0.y) * (1. - smoothstep(.0, .35, max(-p.y, 0.)));
      float hv = smoothstep(.38, .62, mo1 + (mo3 - .5) * .6);
      aA = mix(aA, mix(vec3(.085, .095, .06), vec3(.19, .14, .055), smoothstep(.35, .7, s1 + (btone - .5) * .5)), tp * hv * .9);
      if (abs(ICE) > 0.) aA = mix(aA, vec3(.62, .66, .7), tp * smoothstep(.3, .5, mo1 + (s1 - .5) * .3));
      float nd = max(dot(n, SUNA), 0.);
      vec3 skA = mix(SKH, SKZ, .3 + .3 * n.y) * (.55 + .45 * n.y) * ao;
      aC = aA * (SUNC * SUNE * .65 * nd * shadow + skA * .95);
      aC = mix(aC, SKH * .42, 1. - exp(-t * .005));
    }
#endif
  }
  // the water itself between us and what we see: dark ultramarine level and below, brighter toward the light above
  vec3 dW = rf ? dd : d;
  float yg = clamp(dW.y * .5 + .5, 0., 1.);
  vec3 wc = WCOL * (.42 + 1.05 * yg * yg);
  float lit = .65 + .55 * pow(max(dot(dW, SUN), 0.), 4.);
  float dep = clamp(-(ro.y + p.y) * .5, 0., 200.);
  wc *= lit * exp(-.03 * dep);
  col += wc * (1. - exp(-VEIL * vec3(1.1, 1.05, 1.) * t * t / (t + 38.)));
#ifdef HALF
  if (air) { col = aC; caus = 0.; }
#endif
  float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
  oC = vec4(sqrt(col * .5) + (ign - .5) / 900., caus);
}`,lt=`out vec4 oC;
in vec2 vUV;
void main() {
  vec2 s = vUV * MAPL, g = vec2(0.);
  float h = 0.;
  for (int i = 0; i < NWV; i++) {
    vec4 a = texelFetch(uD, ivec2(i, 0), 0), b = texelFetch(uD, ivec2(i, 1), 0);
    float ph = dot(a.xy, s) - b.x * TIME + b.y;
    g += a.z * cos(ph) * a.xy; h += a.z * sin(ph);
  }
  oC = vec4(g * 2. + .5, h * 2. + .5, 1.);
}`,ft=`out vec4 oC;
in vec2 vUV;
float I(float k, mat2 J) { float det = (1. + k * J[0][0]) * (1. + k * J[1][1]) - k * k * J[0][1] * J[1][0]; float e = .03 + .016 * abs(k); float v = (1. + e) / (abs(det) + e); return v / (1. + v); }
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy), m = ivec2(${C-1});
  vec2 a = texelFetch(uW, (c + ivec2(1, 0)) & m, 0).xy - texelFetch(uW, (c - ivec2(1, 0)) & m, 0).xy;
  vec2 b = texelFetch(uW, (c + ivec2(0, 1)) & m, 0).xy - texelFetch(uW, (c - ivec2(0, 1)) & m, 0).xy;
  float sc = .5 / (2. * ${me}. / ${C}.) * .5;   // decode (*.5) over 2 texels
  mat2 J = mat2(a * sc, b * sc);
  oC = vec4(I(-KAP * 3., J), I(-KAP * 9., J), I(-KAP * 22., J), 1.);
}`,dt=`out vec4 oC;
in vec2 vUV;
float cl(float z) { return A1 * sin(z * .047 + PH1) + A2 * sin(z * .0193 + PH2) + DOG * smoothstep(22., 52., z); }
void main() {
  vec3 d = ray(vUV);
  vec4 tv = texture(uT, vUV);
  float t = upk(tv.rgb), ts = d.y > .0005 ? -CAM.y / d.y : 1e9;
  float tm = min(min(t, ts), 58.);
  float dr = .5;
  vec3 acc = vec3(0.);
  float ph = 1.;
  { float c = dot(d, SUN); ph = min((1. - .49) / pow(1.49 - 1.4 * c, 1.5) * .9 + .22, 2.4); }
  for (int i = 0; i < 26; i++) {
    float a = (float(i) + dr) / 26., ti = tm * a * a, dt = tm * 2. * a / 26.;
    vec3 p = CAM + d * ti;
    float h = max(-p.y, 0.);
    vec2 s = p.xz + SUN.xz / SUN.y * h;
    vec2 mu = vec2((s.x - cl(s.y)) / 52. + .5, (s.y + 40.) / 320.);
    float mk = textureLod(uK, mu, 0.).r;
    vec2 cc = textureLod(uQ, s / MAPL, 2. + clamp(h * .22, 0., 3.)).rg;
    float ca = mix(cc.r, cc.g, smoothstep(2., 10., h));
    ca = ca / (1.002 - ca);
    // calm water still lenses the sun a little through the long slow swell running up the crack: static sheets of
    // light along the corridor (drawn once per view), so a ray looking down it stays in one or between two and sees
    // long shafts, not the haze that crossing many round columns averages to
    vec2 sl = vec2((s.x - cl(s.y)) * .13, s.y * .012);
    float sw = textureLod(uN, sl + .17, 0.).g + (textureLod(uN, sl * vec2(2.6, 3.4) + .61, 0.).b - .5) * .4;
    float b = .02 + 11. * pow(smoothstep(.56, .8, sw), 1.5);   // sparse: a ray must cross only a few to see them apart
    if (SHC > 0.) { float big = textureLod(uN, s * .052 + vec2(TIME * .0031, -TIME * .0023), 0.).g;
      b = (.06 + 1.6 * ca * ca * ca) * smoothstep(.3, .7, big + (cc.r - .5) * .4) * 2.4 + .03; }
    b = mix(b, 1., smoothstep(30., 90., h));
    acc += exp(-KD * (ti + h / max(SUN.y, .15))) * mk * b * dt * (SHC > 0. ? 1. : smoothstep(2., 9., ti));
  }
  acc *= SUNC * vec3(.42, .72, 1.) * SUNE * ph * SHK * .0062;
  oC = vec4(min(acc, vec3(.2, .4, .65)), 1.);
}`,ht=`out vec4 oC;
in vec2 vUV;
float cl(float z) { return A1 * sin(z * .047 + PH1) + A2 * sin(z * .0193 + PH2) + DOG * smoothstep(22., 52., z); }
// what the water surface shows above it, seen from below through the window
vec3 sky(vec3 r) {
  float e = max(r.y, 0.), lh = max(length(r.xz), 1e-3);
  vec3 c = mix(SKH, SKZ, pow(clamp(e, 0., 1.), .7));
  float cd = max(dot(r, SUNA), 0.);
#ifdef HALF
  // in the open air the sun is a glare, not a disc, and the clouds are white heaps over the plain with grey bases
  c += SUNC * (1.6 * pow(cd, 2400.) + .35 * pow(cd, 160.) + .12 * pow(cd, 8.));
  vec2 cq = r.xz / (r.y + .07) * .045 + .3;
  float cl2 = textureLod(uN, cq, 0.).g + (textureLod(uN, cq * 3.1, 0.).b - .5) * .45;
  c = mix(SKH, SKZ * 1.1, pow(clamp(e, 0., 1.), .42)) + c - mix(SKH, SKZ, pow(clamp(e, 0., 1.), .7));
  float cw = smoothstep(.54, .7, cl2) * smoothstep(-.01, .05, r.y);
  vec3 cB = mix(vec3(dot(SKH, vec3(.33))) * vec3(.74, .76, .8), vec3(max(max(SKH.r, SKH.g), SKH.b)) * 1.12, smoothstep(.5, .74, cl2));
  c = mix(c, cB * mix(vec3(1.), SUNC, .3), cw * .85);
#else
  // (a glare, not a disc: a crisp disc read as a white dot pinned to the window)
  c += SUNC * (1.4 * pow(cd, 1800.) + .3 * pow(cd, 160.) + .12 * pow(cd, 40.) + .08 * pow(cd, 4.));
  // cloud: bright tops, greyer bases, so the window holds shapes
  vec2 cq = r.xz / max(r.y, .1) * .018 + .3;
  float cl2 = textureLod(uN, cq, 0.).g + (textureLod(uN, cq * 3.1, 0.).b - .5) * .35;
  float cw = smoothstep(.5, .72, cl2) * (1. - .5 * e);
  c = mix(c, mix(SKH * vec3(.82, .86, .92), vec3(1.08) * SKH, smoothstep(.55, .8, cl2)), cw * .8);
#endif
  // far mountains along the valley, the rims of the crack closer in
  vec2 ring = r.xz / lh;
  float mt = .11 + .1 * textureLod(uN, ring * .22 + .4, 0.).r + .03 * textureLod(uN, ring * .9, 0.).g;
  float me = r.y / lh;
#ifdef HALF
  // seen from the air the mountains are a low soft line over the banks (the banks themselves are marched)
  me = me * 2.4 + .012;
  c = mix(c, mix(vec3(.2, .24, .3), SKH * .85, .55), smoothstep(mt + .02, mt - .02, me));
#else
  c = mix(c, mix(vec3(.2, .24, .3), SKH * .85, .55), smoothstep(mt + .004, mt - .004, me));
  float rm = (RIM + 1.) * abs(r.x) / lh / max(HW * 1.3, 1.);
  c = mix(c, vec3(.018, .021, .024), smoothstep(rm + .01, rm - .01, me));
#endif
  return c;
}
void main() {
  vec2 uv = vUV;
  vec3 d = ray(uv);
  vec4 tv = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  float t = upk(tv.rgb), ts = d.y > .0005 ? -CAM.y / d.y : 1e9;
  vec3 col;
#ifdef HALF
  bool air = airAt(uv);
  if (air) {
    vec4 cs = texelFetch(uC, ivec2(gl_FragCoord.xy), 0);
    col = t < TMAX - .5 ? cs.rgb * cs.rgb * 2. : sky(d) * .55;
    if (tv.a > .5) {
      // the water from above: a thin band mirroring the banks and the sky, broken by the ripples
      float ta = AIRH / max(-d.y, .002);
      vec2 sw = (vec2(CAM.x, CAM.z) + d.xz * ta) / MAPL;
      vec2 g = (textureLod(uW, sw, 1.).xy - .5) * .5 * max(SLK, .5) * 1.2;
      vec3 nw = normalize(vec3(-g.x, 1., -g.y)), rr = reflect(d, nw);
      rr.y = abs(rr.y);
      float fr = .02 + .98 * pow(1. - max(dot(-d, nw), 0.), 5.);
      vec3 rc = col;
      if (t < TMAX - .5) { vec4 c2 = texture(uC, clamp(uv + g * .06 / TANH, vec2(.002), vec2(.998))); rc = c2.rgb * c2.rgb * 2.; }
      else rc = sky(rr) * .55;
      col = mix(WCOL * .12, rc, clamp(fr, .25, 1.));
      // thin ice: the same shelf along one edge, seen from above, frosted grey-white
      if (abs(ICE) > 0.) {
        float ix = (CAM.x + d.x * ta - cl(CAM.z + d.z * ta)) * ICE, lip = HW * .1 + (textureLod(uN, sw * MAPL * .021 + .7, 0.).r - .5) * 6.;
        col = mix(col, SKH * (.75 + .25 * textureLod(uN, sw * MAPL * .19, 0.).g), smoothstep(lip - .04, lip + .04, ix) * .9);
      }
    }
  } else
#endif
  if (tv.a > .5) {
    // the surface from below: a mirror of the crack, and the window where the angle lets the sky through
    vec3 s = CAM + d * ts;
    float fp = ts * TANH * 2. / SZ / max(d.y, .02);
    vec3 wv = textureLod(uW, s.xz / MAPL, log2(max(fp / (MAPL / ${C}.), 1.))).xyz;
    vec2 g = (wv.xy - .5) * .5 * SLK;
    float drk = 0.;
    vec2 gw = g;
    if (FAC > 0.) {
      // a fine boil of facets a few centimetres across (rain, or a breeze seen from straight below)
      vec2 fb = texture(uN, s.xz * .37 + vec2(TIME * .021, -TIME * .017)).rg - texture(uN, s.xz * .61 - vec2(TIME * .016, TIME * .023)).ba;
      g += fb * .55 * FAC;
      // rain: each drop punches a dark crater that opens into a ring over .4 s and is gone (two drops a cell, cells of
      // 7 and 12 cm at random phase; faded out where a ring would be under three pixels)
      float fq = 1. - smoothstep(.03, .09, fp * sqrt(max(d.y, .02)));
      if (RAIN > 0. && fq > 0.) for (int k = 0; k < 2; k++) {
        float ce = k == 0 ? .3 : .19;
        vec2 rq = s.xz / ce + float(k) * 17.3, ri = floor(rq);
        vec4 hr = fract(texelFetch(uN, ivec2(mod(ri, 256.)), 0) * 97.);
        float per = .9 + 1.1 * hr.b, age = fract(TIME / per + hr.a) * per;
        vec2 dv = (rq - ri - .3 - .4 * hr.rg) * ce;
        float rr = length(dv), R = ce * (.06 + .36 * age / .4), w = ce * (.1 + .08 * age / .4);
        float on = smoothstep(.42, .2, age) * fq, x = (rr - R) / w;
        float rg = exp(-x * x) * on;
        g += dv / max(rr, 1e-4) * x * rg * .3;
        // the ring's crest catches the light, the crater inside it is a soft dimple
        drk += rg * .5 - smoothstep(ce * .16, 0., rr) * smoothstep(.15, .0, age) * on * .3;
      }
    }
    vec3 n = normalize(vec3(-g.x, 1., -g.y));
    // (the fine boil tilts the window less: steep facets opened it onto the dark rims as hard black dots)
    vec2 g3 = gw * 3. + (g - gw) * 1.2;
    vec3 n2 = normalize(vec3(-g3.x, 1., -g3.y));
    float ci = dot(d, n2), si2 = 1. - ci * ci;
    vec2 q = clamp(uv + (gw + (g - gw) * .25) * .62 / TANH, vec2(.002), vec2(.998));
    vec4 cs = texture(uC, q);
    vec3 rfl = cs.rgb * cs.rgb * 2.;
    // the silver: a mirror lit from below with the pale water glow, brightest near the window's edge
    float edge = smoothstep(.72, .985, sqrt(si2) * 1.333);
    float lift = 1. + clamp((wv.z - .5) * 3.6, -.55, .55);
    vec3 ag = vec3(.42, .68, 1.) * SILV * (.28 * RAIN + .72 * edge * edge * edge) * lift;
    rfl = rfl * MIR + ag * (1. + 6. * g.x * g.x + 6. * g.y * g.y);
    rfl = mix(rfl, (vec3(dot(rfl, vec3(.3, .5, .2))) * vec3(.9, 1., 1.1) + vec3(.2, .24, .28) * SILV) * .5, RAIN * .75);
    col = rfl;
    float sn = sqrt(si2) * 1.3333;
    if (sn < 1.) {
      vec3 r = normalize(n2 * sqrt(1. - sn * sn) + (d - n2 * ci) * 1.3333);
      float c1 = ci, c2 = sqrt(1. - sn * sn);
      float rs = (1.3333 * c1 - c2) / (1.3333 * c1 + c2), rp = (c1 - 1.3333 * c2) / (c1 + 1.3333 * c2);
      float fr = clamp(.5 * (rs * rs + rp * rp), 0., 1.);
      vec3 win = sky(r) * exp(-KD * ts * .8) * (1. - .5 * RAIN);
      col = mix(win * .3, rfl, fr);
    }
    col *= 1. + clamp(drk, -.4, .8);
    if (abs(ICE) > 0.) {
      // a shelf of thin ice along one edge, seen from under it: a frosted pane with a sharp lip
      float ix = (s.x - cl(s.z)) * ICE, lip = HW * .1 + (textureLod(uN, s.xz * .021 + .7, 0.).r - .5) * 6.;
      float ic = smoothstep(lip - .04, lip + .04, ix);
      float fr2 = textureLod(uN, s.xz * .19, 0.).g;
      vec3 fro = vec3(.62, .78, .92) * (.45 + .55 * fr2) * (1. + 1.6 * smoothstep(.7, 0., ix - lip)) * SUNE * .16 * exp(-KD * ts * .7);
      col = mix(col, fro, ic);
    }
  } else {
    vec4 cs = texelFetch(uC, ivec2(gl_FragCoord.xy), 0);
    col = cs.rgb * cs.rgb * 2.;
    if (cs.a > .003) {
      vec3 p = CAM + d * t;
      float h = max(-p.y, 0.);
      vec2 sv = p.xz + SUN.xz / SUN.y * h;
      float fp = t * TANH * 2. / SZ;
      vec3 cc = textureLod(uQ, sv / MAPL, clamp(log2(max(fp / (MAPL / ${C}.), 1.)) + .4, 0., 7.)).rgb;
      float lh = clamp(log2(max(h, .1) / 3.) / 1.6, 0., 1.);
      float ca = mix(mix(cc.r, cc.g, lh), cc.b, clamp(h / 22. - .4, 0., 1.));
      ca = ca / (1.002 - ca);
      ca = mix(ca, 1., smoothstep(14., 40., h));
      col *= 1. + cs.a * min(1.6 * ca - 1., 1.1) * (1. - .8 * RAIN) * (1. - smoothstep(7., 15., t));
    }
  }
#ifdef HALF
  if (!air) col = (col + texture(uS, uv).rgb) * .58;
#else
  col += texture(uS, uv).rgb;
#endif
#ifdef HALF
  // the waterline: a soft dark band (the meniscus seen edge-on) swaying a pixel or two, a pale lip above it
  float wy = wl(uv.x) + .0011 * sin(uv.x * 41. + TIME * 1.3) + .0008 * sin(uv.x * 13. - TIME * .8);
  float px = (uv.y - wy) * SZ, bw = max(SZ * .0052, 1.6), ew = max(SZ * .0011, .7);
  col *= 1. - .82 * exp(-(px + bw * .25) * (px + bw * .25) / (bw * bw));
  col += SKH * .1 * exp(-(px - bw * 1.1) * (px - bw * 1.1) / (ew * ew * 2.));
#endif
  oC = vec4(tmap(col), 1.);
}`,ut=`uniform vec4 uP[${ue}];
uniform sampler2D uT;
out vec4 vC; out float vK;
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define SUN uP[4].xyz
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) / 16777216.; }
void main() {
  uint id = uint(gl_VertexID);
  float dr = hf(id * 3u + 1u) * 6.28;
  vec3 o = vec3(hf(id) - .5, hf(id * 7u) - .5, 0.) * vec3(5.5, 4., 0.) * (1. + hf(id * 13u) * 2.) + vec3(sin(TIME * .043 + dr) * .3, sin(TIME * .029 + dr * 2.) * .25 + TIME * .004 * (hf(id * 5u) - .4), cos(TIME * .037 + dr) * .3);
  vec3 p = CAM + RT * o.x + UPV * o.y + FW * (1.2 + hf(id * 13u) * 5.);
  p.y = min(p.y, -.3);
  float r = .0012 + .0018 * hf(id * 17u), br = .5 + .5 * hf(id * 23u); vK = 1.;
  vec3 q = p - CAM;
  float z = dot(q, FW);
  if (z < .3 || p.y > -.05) { gl_Position = vec4(2.); gl_PointSize = 0.; vC = vec4(0.); return; }
  float f = SZ * .5 / (TANH * z);
  float ps = r * 2. * f;
  gl_PointSize = clamp(ps, 1.6, 60.);
  float vis = min(1., ps * ps / (1.4 * 1.4)) * exp(-.05 * z);
  vC = vec4(vis * br, length(q), 0., ps);
  gl_Position = vec4(dot(q, RT) / (TANH * z), dot(q, UPV) / (TANH * z), 0., 1.);
}`,mt=`out vec4 oC;
in vec4 vC; in float vK;
void main() {
  vec4 tv = texelFetch(uT, ivec2(gl_FragCoord.xy), 0);
  if (upk(tv.rgb) < vC.y) discard;
#ifdef HALF
  if (airAt(gl_FragCoord.xy / SZ)) discard;
#endif
  vec2 c = gl_PointCoord * 2. - 1.;
  float r = length(c);
  if (r > 1.) discard;
  float a = vC.x * smoothstep(1., .1, r) * .35;
  oC = vec4(vec3(.62, .8, 1.) * a, 0.);
}`,vt=`out vec4 oC;
in vec2 vUV;
void main() {
  vec3 c = textureLod(uM, vUV, 0.).rgb;
  vec2 q = vUV - .5;
  c *= 1. - dot(q, q) * .05;
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  c += (g - .5) / 230.;
  oC = vec4(c, 1.);
}`;function xt(e,o){const h=o?new Float32Array(262144):new Uint8Array(262144),n=new Float32Array(256*256);let m=11585;const u=()=>{m=m+1831565813|0;let s=Math.imul(m^m>>>15,1|m);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296},T=new Int32Array(5*256*2),P=new Int32Array(5*256*2),S=new Float64Array(5*256*2),z=[];let l=.5,E=0;for(let s=0,a=6;s<5;s++,a*=2){for(let d=0;d<256;d++){const v=d/256*a,p=Math.floor(v),b=v-p,M=b*b*(3-2*b),w=(s*256+d)*2;T[w]=(p%a+a)%a+s*37,T[w+1]=((p+1)%a+a)%a+s*37,P[w]=((p%a+a)%a+s*53&255)*256,P[w+1]=(((p+1)%a+a)%a+s*53&255)*256,S[w]=M,S[w+1]=1-M}z.push(l),E+=l,l*=.55}for(let s=0;s<4;s++){for(let a=0;a<n.length;a++)n[a]=u();for(let a=0;a<256;a++)for(let d=0;d<256;d++){let v=0;for(let p=0;p<5;p++){const b=(p*256+d)*2,M=(p*256+a)*2,w=T[b],K=T[b+1],R=P[M],pe=P[M+1],ce=S[b],te=S[b+1],H=S[M],Z=S[M+1],I=n[w+R]*te+n[K+R]*ce,oe=n[w+pe]*te+n[K+pe]*ce;v+=(I*Z+oe*H)*z[p]}h[(d+a*256)*4+s]=o?$(v/E,0,1):$(v/E*255,0,255)}}const j=e.createTexture();return e.bindTexture(e.TEXTURE_2D,j),o?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,256,256,0,e.RGBA,e.FLOAT,h):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,h),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),j}function V(e,o,r,h){const n=e.createTexture(),m=e.createFramebuffer();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,h.ifmt,o,r,0,e.RGBA,h.type,null);const u=h.nearest?e.NEAREST:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,h.mip?e.LINEAR_MIPMAP_LINEAR:u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u);const T=h.repeat?e.REPEAT:e.CLAMP_TO_EDGE;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,T),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,T),e.bindFramebuffer(e.FRAMEBUFFER,m),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:n,fb:m,w:o,h:r}}const pt=["uN","uR","uD","uT","uC","uW","uQ","uK","uS","uM","uF","uG"],Re=["march","geo","shade","main","pts"];function xe(e,o,r){const h="rf"+r;if(o[h])return o[h];const n=V(e,r,r,{...o.fmt,repeat:!0});e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,r,r),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.useProgram(o.use("relief").p),e.bindVertexArray(o.vao),e.drawArrays(e.TRIANGLES,0,3);const m=V(e,r/2,r/2,{...o.fmt,repeat:!0});return e.bindFramebuffer(e.FRAMEBUFFER,m.fb),e.viewport(0,0,r/2,r/2),e.useProgram(o.use("floor").p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,o.tN),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null),o[h]={tR:n.tex,tF:m.tex}}function bt(e,o,r){if(e.__c628)return e.__c628.need(o),e.__c628;const h=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float"),n=(s,a)=>{const d=e.createShader(s);return e.shaderSource(d,a),e.compileShader(d),d},m={relief:[L,at],floor:[L,rt],mask:[L,_+ne+ve+st],march:[L,_+ne+ve+it],geo:[L,_+ne+ve+nt],shade:[L,_+ne+ct],wave:[L,_+lt],caus:[L,_+ft],shaft:[L,_+dt],main:[L,_+ht],pts:[ut,_+mt],fin:[L,_+vt]},u={},T=(s,a)=>{const d=ot+(a?`#define HALF 1
`:""),v=e.createProgram(),p=n(e.VERTEX_SHADER,d+m[s][0]),b=n(e.FRAGMENT_SHADER,d+m[s][1]);e.attachShader(v,p),e.attachShader(v,b),e.linkProgram(v),u[s+(a?"H":"")]={p:v,v:p,f:b}};for(const s in m)T(s,o&&Re.includes(s));const P=s=>{u[s?"marchH":"march"]||(Re.forEach(a=>T(a,s)),e.flush())};e.flush();const S=xt(e,h),z=s=>{if(!("uP"in u[s])){const{p:a,v:d,f:v}=u[s];if(!e.getProgramParameter(a,e.LINK_STATUS))throw new Error("628 "+s+": "+(e.getShaderInfoLog(d)||"")+(e.getShaderInfoLog(v)||"")+e.getProgramInfoLog(a));e.useProgram(a),pt.forEach((p,b)=>{const M=e.getUniformLocation(a,p);M&&e.uniform1i(M,b)}),u[s]={p:a,uP:e.getUniformLocation(a,"uP")}}return u[s]},l=e.createVertexArray(),E=h?{ifmt:e.RGBA16F,type:e.HALF_FLOAT}:{ifmt:e.RGBA8,type:e.UNSIGNED_BYTE},j=e.__c628={use:z,need:P,hf:h,fmt:E,tN:S,vao:l};return r||xe(e,j,2048),j}Pe.add({num:628,name:"Clear Rift",fam:"Vistas",recipe:"Floating in the Silfra fissure in glacier water, between black lava walls with moss and algae on the ledges and fallen boulders on the floor, the surface a silver mirror overhead. The light, how clear it is, the moss and the shape of the crack change every mint, and some float half in and half out of the water. Nothing to do but look while the light moves.",interactive:"Nothing to do but look: the light moves.",music:!1,gl:!0,fps:30,seed:0,make(e){const o=e.gl,r=e.size;let h=2654435769;for(let t=2;t<e.hash.length;t+=8)h=Math.imul(h^parseInt(e.hash.slice(t,t+8),16),2246822507)>>>0;const n=()=>{h=h+1831565813|0;let t=Math.imul(h^h>>>15,1|h);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},m=t=>{let c=0;for(const f in t)c+=t[f];let g=n()*c;for(const f in t)if(g-=t[f],g<0)return f;return Object.keys(t)[0]};let u=m({"High summer sun":42,"Low arctic sun":28,"Silver overcast":20,"Midnight sun":10}),T=m({"Over a hundred metres":50,"Blue veil":30,"Absolute clear":20}),P=m({"Moss on the ledges":45,"Thin moss":22,"Rich carpets":25,"Spring green":8}),S=m({Cathedral:42,"Wide hall":30,Dogleg:28}),z=m({"Glass calm":58,"Light breeze":42}),l=m({"Along the crack":44,"Over the drop":22,"By the wall":20,"Toward the light":14});e.home&&(u="High summer sun",T="Over a hundred metres",P="Moss on the ledges",S="Cathedral",z="Glass calm",l="Along the crack");let E=103334110;for(let t=2;t<e.hash.length;t+=8)E=Math.imul(E^parseInt(e.hash.slice(t,t+8),16),668265263)^E>>>15;const j=()=>{E=E+1831565813|0;let t=Math.imul(E^E>>>15,1|E);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},s=t=>{let c=0;for(const f in t)c+=t[f];let g=j()*c;for(const f in t)if(g-=t[f],g<0)return f;return Object.keys(t)[0]};let a=s({"":62,"Lagoon shallows":14,"Up from the floor":13,"The narrows":11}),d=s({"":78,"Pocked by rain":14,"Thin ice":8});if(d==="Thin ice"&&u!=="Low arctic sun"&&u!=="Silver overcast"&&(d=""),Ye&&!e.home){const t={"0x505594de":["Lagoon shallows",""],"0x96af06c5":["Up from the floor",""],"0x9a941611":["The narrows",""],"0xce50302f":["","Pocked by rain"],"0x30370618":["","Thin ice"]}[e.hash.slice(0,10)];t&&(a=t[0],d=t[1],d==="Thin ice"&&(u="Low arctic sun"))}e.home&&(a="",d=""),a==="The narrows"&&u==="Silver overcast"&&(u="Low arctic sun"),a&&(l=a),d==="Thin ice"&&l==="Over the drop"&&(d=""),d&&(z=d);const v=z==="Pocked by rain",p=z==="Thin ice",b=z==="Glass calm"||p,M=u;v&&(u="Silver overcast");let w=1595564683;for(let t=2;t<e.hash.length;t+=8)w=Math.imul(w^parseInt(e.hash.slice(t,t+8),16),739982445)^w>>>13;const K=()=>{w=w+1831565813|0;let t=Math.imul(w^w>>>15,1|w);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},R=[K(),K(),K(),K(),K(),K()],ce=!e.home&&(l==="Along the crack"||l==="Over the drop"||l==="By the wall"||l==="Toward the light")&&R[0]<.6,te=e.home?0:l==="The narrows"||R[4]<.3?1:R[4]<.58?2:0;let H=1243547176;for(let t=2;t<e.hash.length;t+=8)H=Math.imul(H^parseInt(e.hash.slice(t,t+8),16),374761393)^H>>>11;const Z=()=>{H=H+1831565813|0;let t=Math.imul(H^H>>>15,1|H);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},I=[Z(),Z(),Z(),Z(),Z(),Z()],oe=l==="Lagoon shallows",Q=!e.home&&e.hash.slice(0,10)!=="0x8bd9fe8d"&&(l==="Along the crack"&&I[0]<Je||oe&&I[0]<$e);Q&&(l="Half above, half below");const U=bt(o,Q,e.tile),ae=e.tile&&!U.rf2048?xe(o,U,512):xe(o,U,2048);e.trait("Light",u),e.trait("Clarity",T),e.trait("Moss",P),e.trait("Crack",S),e.trait("Surface",z),e.trait("View",l);const F=new Float32Array(ue*4),x=(t,c,g,f,N)=>{F[t*4]=c,F[t*4+1]=g,F[t*4+2]=f,F[t*4+3]=N},q={Cathedral:[4.2,.9,2.4,0,.2,.08,.12,.16],"Wide hall":[13.5,1.1,3.2,0,.13,.55,.8,.9],Dogleg:[6.2,1.1,2.8,11,.17,.18,.26,.3]}[S],be=l==="The narrows"?Math.min(q[0],4.6):l==="Up from the floor"?Math.min(q[0],6):q[0],Le=q[1],ze=q[2],Ue=q[3],Fe=q[4],wt=q[5],yt=q[6],At=q[7],we=n()*B,_e=n()*B,gt=n()*B,Tt=n()*B,kt=t=>Le*Math.sin(t*.047+we)+ze*Math.sin(t*.0193+_e)+Ue*(c=>c*c*(3-2*c))($((t-22)/30,0,1)),He=l==="Lagoon shallows"||Q&&oe?1:0,Et=l==="The narrows"?14:0;x(10,be,Le,ze,we),x(11,_e,gt,Tt,Ue),x(12,wt,yt,At,Fe);const k={"High summer sun":[62,[1,.96,.9],3.3,.9,[.62,.7,.78],[.14,.3,.66],[.5,.62,.84],1.12,1],"Low arctic sun":[24,[1,.86,.66],2.8,.7,[.85,.72,.55],[.13,.24,.55],[.6,.62,.78],.42,1.05],"Silver overcast":[58,[.9,.95,1],.55,2.4,[.76,.8,.84],[.3,.36,.44],[.68,.74,.82],.25,1.42],"Midnight sun":[11,[1,.5,.2],3.4,.62,[1,.58,.38],[.24,.2,.4],[1,.52,.26],.5,1.25]}[u];let Y=M==="High summer sun"||M==="Silver overcast"?(e.home||n()<.5?-1:1)*(.72+n()*.34):n()*.7-.35,le=k[0]*Math.PI/180;e.home&&(Y*=.55),te===1?Y*=.3:te===2&&(Y=(Y<0?-1:1)*(1.2+.25*R[5]));const ye=[Math.sin(Y)*Math.cos(le),Math.sin(le),Math.cos(Y)*Math.cos(le)],fe=Math.cos(le)/1.3333,Mt=Math.sqrt(1-fe*fe),Ae=[Math.sin(Y)*fe,Mt,Math.cos(Y)*fe],X={"Over a hundred metres":[.095,.03,.0135,1],"Blue veil":[.125,.046,.026,.92],"Absolute clear":[.08,.024,.0085,1.06]}[T];x(6,X[0],X[1],X[2],k[3]),x(4,Ae[0],Ae[1],Ae[2],k[2]*(v?.3:1)),x(5,k[1][0],k[1][1],k[1][2],v?.3:b?.16:1.6),x(17,ye[0],ye[1],ye[2],He),x(19,Et,b?0:1,0,0),x(20,He?.9:1,v?1:0,P==="Rich carpets"||P==="Spring green"?1:0,0);const Ie=M==="Silver overcast"&&!v,ge=Ie?T==="Blue veil"?[.04,.25,.34]:[.03,.23,.37]:T==="Blue veil"?[.024,.2,.5]:[.014,.165,.6];Ie&&(F[6*4+1]=X[1]*.78,F[6*4+2]=X[2]*1.5),x(7,ge[0]*X[3],ge[1]*X[3],ge[2]*X[3],0);const W={"Moss on the ledges":[11,1.05,[.27,.54,.03],[.085,.2,.018],1],"Thin moss":[6,.45,[.2,.4,.05],[.07,.16,.03],.6],"Rich carpets":[16,1.7,[.26,.58,.03],[.07,.22,.02],1.5],"Spring green":[12,1.35,[.45,.72,.03],[.16,.32,.015],1.2]}[P];F[7*4+3]=W[0],x(18,.75,W[4],v?1:0,p?j()<.5?-1:1:0);const Te=u==="Midnight sun"?[.6,.58,.62]:k[4];x(8,Te[0],Te[1],Te[2],W[1]),x(9,W[2][0],W[2][1],W[2][2],1.5),x(16,W[3][0],W[3][1],W[3][2],X[2]*1.6),x(13,1.3+n()*1.6,k[7],1.05,.58),x(14,k[6][0],k[6][1],k[6][2],b?.2:v?.13:.26),x(15,k[5][0],k[5][1],k[5][2],G);const St=1.5*k[8]*(l==="Lagoon shallows"?.64:1);F[19*4+2]=.42+.13*I[4],F[20*4+3]=(I[5]-.5)*.105;const ee=new Float32Array(G*2*4),re=B/me,Nt=n()*B,Ct=b?.004:v?.01:.014;for(let t=0;t<G;t++){const c=.55*Math.pow(14,t/(G-1))*(.85+.3*n()),g=Nt+(n()-.5)*2.1;let f=B/c,N=Math.round(f*Math.cos(g)/re)*re,J=Math.round(f*Math.sin(g)/re)*re;N===0&&J===0&&(N=re),f=Math.hypot(N,J);const ie=Ct*(.6+.8*n())/f*(1.4-.7*t/G);ee[t*4]=N,ee[t*4+1]=J,ee[t*4+2]=ie,ee[(t+G)*4]=Math.sqrt(Qe*f+.074/1e3*f*f*f),ee[(t+G)*4+1]=n()*B}const qe=o.createTexture();o.bindTexture(o.TEXTURE_2D,qe),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,G,2,0,o.RGBA,o.FLOAT,ee),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST);const de={ifmt:o.RGBA8,type:o.UNSIGNED_BYTE},ke=V(o,r,r,{...de,nearest:!0}),De=V(o,r,r,U.fmt),Ee=V(o,r,r,de),he=Math.max(128,Math.ceil(r/2)),Pt=b,Ve=V(o,he,he,U.fmt),Ke=V(o,C,C,{...U.fmt,repeat:!0}),Xe=V(o,C,C,{...de,repeat:!0,mip:!0}),We=V(o,128,512,de),se=t=>Q?t+"H":t,i=(t,c)=>{o.activeTexture(o.TEXTURE0+t),o.bindTexture(o.TEXTURE_2D,c)},D=(t,c,g,f)=>{const N=U.use(t);o.bindFramebuffer(o.FRAMEBUFFER,c?c.fb:null),o.viewport(0,0,g,f),o.useProgram(N.p),o.uniform4fv(N.uP,F)},O=()=>o.drawArrays(o.TRIANGLES,0,3),y={"Along the crack":{dx:-.75,y:-2.5,z:-2,yaw:.06,pitch:-.17,fov:66},"Over the drop":{dx:.6,y:-3.2,z:4,yaw:-.12,pitch:-.62,fov:70},"By the wall":{dx:-1.9,y:-2.2,z:-4,yaw:.4,pitch:-.2,fov:66},"Toward the light":{dx:-.5,y:-8,z:2,yaw:.05,pitch:.4,fov:72},"Lagoon shallows":{dx:0,y:-1.1,z:-27,yaw:.02,pitch:-.2,fov:68},"Up from the floor":{dx:0,y:0,z:26,yaw:.08,pitch:.85,fov:74},"The narrows":{dx:0,y:-3.4,z:6.5,yaw:.03,pitch:.12,fov:70},"Half above, half below":{dx:(I[1]-.5)*2*5.2/be,y:-.12,z:oe?-25+4*I[2]:-4+12*I[2],yaw:(I[3]-.5)*.18,pitch:0,fov:72}}[l],Oe=(t,c,g)=>{const f=$((g-t)/(c-t),0,1);return f*f*(3-2*f)};l==="Up from the floor"&&(y.y=-.55-8.45*Oe(-27,-5,y.z)-Math.max(y.z+5,0)*Fe-1.3*Math.sin(y.z*.09+we)*Oe(-12,12,y.z)+3.8),ce&&!Q&&(y.dx=l==="By the wall"?R[1]<.5?-1.9:1.9:(R[1]-.5)*3.4,y.yaw+=(R[2]-.5)*.6-(l==="By the wall"&&R[1]>=.5?.8:0),l!=="Toward the light"&&(y.y=-(1.5+R[3]*4.5))),l==="By the wall"&&(y.yaw+=y.dx<0?.2:-.2,S==="Wide hall"&&(y.pitch-=.1));const Rt=kt(y.z)+y.dx*be/5.2,Lt=Math.tan(y.fov*.5*Math.PI/180),A={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let Me="";const Be=()=>{const t=e.view||Ze,c=t.yaw+","+t.pitch+","+t.x+","+t.y+","+t.z;if(c===Me)return!1;Me=c;const g=y.yaw+t.yaw,f=$(y.pitch+t.pitch,-1.5,1.5),N=Math.cos(g),J=Math.sin(g),ie=Math.cos(f),Ce=Math.sin(f);return A.fw=[J*ie,Ce,N*ie],A.rt=[N,0,-J],A.up=[-J*Ce,ie,-N*Ce],A.x=Rt+t.x,A.y=Math.min(y.y+t.y,Q?-.12:-.3),A.z=y.z+t.z,x(0,A.x,A.y,A.z,Lt),x(1,A.fw[0],A.fw[1],A.fw[2],r),x(3,A.up[0],A.up[1],A.up[2],St),!0},Se=()=>{o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.bindVertexArray(U.vao)},zt=()=>{Se(),i(0,U.tN),i(1,ae.tR),i(10,ae.tF),D("mask",We,128,512),O()},Ut=()=>{Se(),i(0,U.tN),i(1,ae.tR),i(10,ae.tF),i(3,null),D(se("march"),ke,r,r),O(),o.flush(),i(3,ke.tex);const t=o.createTexture(),c=o.createFramebuffer();i(11,t),o.texStorage2D(o.TEXTURE_2D,1,o.RGBA32UI,r,r),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),i(11,null),o.bindFramebuffer(o.FRAMEBUFFER,c),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0),D(se("geo"),{fb:c},r,r),O(),i(11,t),D(se("shade"),De,r,r),O(),i(11,null),i(3,null),o.deleteFramebuffer(c),o.deleteTexture(t),o.flush()},Ge=t=>{Be()&&(x(2,A.rt[0],A.rt[1],A.rt[2],t),Ut(),Ne=!0),F[2*4+3]=t,Se(),i(0,U.tN),i(1,ae.tR),i(2,qe),i(3,null),i(4,null),i(5,null),i(6,null),i(7,We.tex),i(8,null),i(9,null),D("wave",Ke,C,C),O(),i(5,Ke.tex),D("caus",Xe,C,C),O(),i(6,Xe.tex),o.generateMipmap(o.TEXTURE_2D),i(3,ke.tex),(!Pt||Ne)&&(D("shaft",Ve,he,he),O(),Ne=!1),i(4,De.tex),i(8,Ve.tex),D(se("main"),Ee,r,r),O(),o.enable(o.BLEND),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),D(se("pts"),Ee,r,r),o.drawArrays(o.POINTS,0,et),o.disable(o.BLEND),o.flush(),i(3,null),i(4,null),i(5,null),i(6,null),i(8,null),i(9,Ee.tex),D("fin",null,r,r),O(),i(9,null),o.bindVertexArray(null)};x(2,1,0,0,0),Be(),Me="",zt();let je=0,Ne=!0;return Ge(0),(t,c)=>{c=$(c||1/30,0,.1),je+=c,Ge(je%3e3)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
