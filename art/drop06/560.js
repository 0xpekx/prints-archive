// Redwood Grove: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/560.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fe){Fe&&function(){"use strict";const fa={yaw:0,pitch:0,x:0,y:0,z:0},Y=(e,a,h)=>e<a?a:e>h?h:e,bt=Math.PI*2,Le=24,Ot=1024,ft=24,ht=10,g=ft*ht,yt=2.5,ot=256,St=768,Ct="2.",Kt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp usampler2D;
`,Pe=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,qe=`
uniform vec4 uP[${Le}];
uniform sampler2D uN, uC, uL, uB, uF;
uniform highp usampler2D uK;
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define ZI int(uP[3].w)
#define SUN uP[4].xyz
#define SUNE uP[4].w
#define SUNC uP[5].rgb
#define HC uP[5].w
#define FOGC uP[6].rgb
#define SIG uP[6].w
#define AMBK uP[7].x
#define EXPO uP[7].y
#define BMK uP[7].z
#define ENC uP[7].w
#define DRIFT uP[8].xy
#define WIND uP[8].zw
#define HFC uP[9].x
#define OPEN uP[9].y
#define FERN uP[9].z
#define SORR uP[9].w
#define CS uP[10].x
#define NC uP[10].y
#define PER uP[10].z
#define CRK uP[10].w
#define LA uP[11].xyz
#define LR uP[11].w
#define LB uP[12].xyz
#define WL uP[12].w
#define SLUG uP[13].xyz
#define FCS uP[17].w
#define CRX uP[19].xyz
#define CRW uP[19].w
#define GAP0 uP[20].xy
#define GAPR uP[20].z
#define FH uP[21]
#define CAM0 uP[22].xy
#define DRY uP[22].w
#define FULL uP[23].x
#define WARM uP[23].y
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) * (1. / 16777216.); }
uint ch(ivec2 c, uint s) { return hsh(uint(c.x) * 1597334677u ^ uint(c.y) * 3812015801u ^ s * 2654435769u); }
float atn(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hg(float c, float g) { return (1. - g * g) / pow(1. + g * g - 2. * g * c, 1.5) * .0796; }
vec4 nz(vec2 u) { return textureLod(uN, u, 0.); }
// the creek: offset across from its centreline (periodic like the grove)
float creekD(vec2 x) {
  float w = 6.2831853 / PER;
  float xc = CRX.x + 2.2 * sin(x.y * w * 3. + CRX.y) + 1.1 * sin(x.y * w * 7. + CRX.z);
  float dx = x.x - xc;
  return dx - PER * floor(dx / PER + .5);
}
float floorH(vec2 x) {
  vec2 u = x / PER;
  float h = (nz(u * 4.).r - .5) * .6 + (nz(u * 24.).g - .5) * .06 + (nz(u * 9.).b - .5) * .12;
  if (CRK > .5) h = mix(h, -uP[22].z + .05 * h, 1. - smoothstep(CRW * .45, CRW + 1.5, abs(creekD(x)) + (nz(u * 12.).b - .5) * .5 + (nz(u * 40.).a - .5) * .12));
  return h;
}
// canopy gaps at canopy point Q: 1 = open sky
float gapF(vec2 Q) {
  vec2 u = Q / PER;
  float n = nz(u * 1.6).g * .6 + nz(u * 2.5).b * .4;
  float th = mix(.655, .575, OPEN);
  float g = smoothstep(th - .035, th + .085, n);
  vec2 dc = Q - (CAM0 + SUN.xz / SUN.y * HC); dc -= PER * floor(dc / PER + .5);
  g *= smoothstep(4.5, 7., length(dc));
  if (GAPR > 0.) {
    vec2 dq = Q - GAP0; dq -= PER * floor(dq / PER + .5);
    g = max(g, smoothstep(GAPR, GAPR * .45, length(dq * vec2(1., .8)) + (n - .5) * 7.));
  }
  return g;
}
// the high fog above the canopy, drifting: how much sun reaches canopy point Q now
float hfog(vec2 Q) {
  vec2 u = (Q + DRIFT) / PER;
  float n = nz(u * 1.5).r * .7 + nz(u * 1.5 + .37).g * .3;
  return mix(.1, 1., smoothstep(HFC - .1, HFC + .1, n));
}
vec2 canQ(vec3 p) { return p.xz + SUN.xz / SUN.y * (HC - p.y); }
vec3 fogRad(vec3 d) { float cs = max(dot(d, SUN), 0.); return FOGC * (.6 + .32 * d.y + .4 * cs * cs * cs); }
float fogTau(vec3 o, vec3 d, float t) {
  float H = 14., e0 = exp(-o.y / H);
  float b = abs(d.y) < 1e-3 ? e0 * t : H * (e0 - exp(-max(o.y + d.y * t, -5.) / H)) / d.y;
  return SIG * (.72 * t + .28 * b);
}
void cellFetch(ivec2 c, out vec4 a, out vec4 b) {
  vec2 f = vec2(c); ivec2 m = ivec2(f - NC * floor(f / NC) + .5);
  a = texelFetch(uC, ivec2(m.x * 2, m.y), 0); b = texelFetch(uC, ivec2(m.x * 2 + 1, m.y), 0);
}
// a: centre in cell xz, radius, seed; b: flare, feature (1 scar, 2 goose pen), feature angle, burls
float rBase(float y, vec4 a, vec4 b) { float yy = max(y, 0.); return a.z * (1. + b.x * exp(-yy / (.75 * a.z))) * (1. - .0035 * yy); }
`,ra=`out vec4 oC;
in vec2 vUV;
void main() {
  vec2 e = vUV * PER;
  float g = gapF(e);
  vec2 sx = SUN.xz / SUN.y, dir = normalize(sx + 1e-5);
  float ls = length(sx), len = HC * ls;
  vec3 occ = vec3(1.);
  vec2 P0 = e, dv = -dir;
  vec2 sg = vec2(dv.x < 0. ? -1. : 1., dv.y < 0. ? -1. : 1.), iv = 1. / max(abs(dv), vec2(1e-6));
  ivec2 cell = ivec2(floor(P0 / CS));
  vec2 tN = ((vec2(cell) + max(sg, 0.)) * CS - P0) * sg * iv, tD = CS * iv;
  for (int i = 0; i < 24 + ZI; i++) {
    vec4 a, b; cellFetch(cell, a, b);
    if (a.z > 0.) {
      vec2 cc = vec2(cell) * CS + a.xy;
      for (int l = 0; l < 3 + ZI; l++) {
        float yl = l == 0 ? 0. : l == 1 ? 12. : 30.;
        float s = clamp(dot(cc - P0, dv), 0., (HC - yl) * ls);
        float y = HC - s / ls;
        float dist = length(P0 + dv * s - cc), w = .2 + .0093 * (y - yl) / SUN.y;
        occ[l] *= smoothstep(-w, w, dist - rBase(y, a, b) * .97);
      }
    }
    if (min(tN.x, tN.y) > len) break;
    if (tN.x < tN.y) { cell.x += int(sg.x); tN.x += tD.x; } else { cell.y += int(sg.y); tN.y += tD.y; }
  }
  oC = vec4(g, occ);
}`,It=`// sun reaching p past the trunks and the log (the canopy and the high fog are gated per frame)
float trunkSh(vec3 p) {
  vec2 sx = SUN.xz / SUN.y, dir = normalize(sx + 1e-5);
  float ls = length(sx), len = max(HC - p.y, 0.) * ls;
  float occ = 1.;
  vec2 P0 = p.xz;
  vec2 sg = vec2(dir.x < 0. ? -1. : 1., dir.y < 0. ? -1. : 1.), iv = 1. / max(abs(dir), vec2(1e-6));
  ivec2 cell = ivec2(floor(P0 / CS));
  vec2 tN = ((vec2(cell) + max(sg, 0.)) * CS - P0) * sg * iv, tD = CS * iv;
  for (int i = 0; i < 16 + ZI; i++) {
    vec4 a, b; cellFetch(cell, a, b);
    if (a.z > 0.) {
      vec2 cc = vec2(cell) * CS + a.xy;
      float s = clamp(dot(cc - P0, dir), 0., len);
      float y = p.y + s / ls;
      float dist = length(P0 + dir * s - cc), w = .02 + .0093 * s / ls / SUN.y;
      occ *= smoothstep(-w, w, dist - rBase(y, a, b) * .95);
    }
    if (min(tN.x, tN.y) > len || occ < .01) break;
    if (tN.x < tN.y) { cell.x += int(sg.x); tN.x += tD.x; } else { cell.y += int(sg.y); tN.y += tD.y; }
  }
  // the fallen log: closest approach of the sun ray to its axis
  vec3 ax = LB - LA; float ll = length(ax); ax /= ll;
  vec3 w0 = p - LA; float bb = dot(SUN, ax), dd = dot(SUN, w0), ee = dot(ax, w0), den = max(1. - bb * bb, 1e-4);
  float sr = max((bb * ee - dd) / den, 0.), sl = clamp((ee - bb * dd) / den, 0., ll);
  float dl = length(p + SUN * sr - LA - ax * sl);
  occ *= smoothstep(-.06, .1, dl - LR * .97);
  return occ;
}`,Ue=`vec3 bedSt(vec2 x, float fpf) {
  vec3 st = vec3(.105, .097, .084); float got = 0.;
  for (int i = 0; i < 2 + ZI; i++) {
    float cs = i == 0 ? .34 : .09;
    vec2 g = (i == 0 ? x * mat2(.8, .6, -.6, .8) : x * mat2(.96, -.28, .28, .96) + 7.3) / cs, fg = fract(g) - .5;
    uint hs = ch(ivec2(floor(g)), 13u + uint(i) * 7u);
    float rr = i == 0 ? .17 + .2 * hf(hs + 3u) : .17 + .25 * hf(hs + 3u);
    float e = length((fg + (vec2(hf(hs), hf(hs + 1u)) - .5) * (.9 - 2. * rr)) * vec2(1., .65 + .5 * hf(hs + 4u)));
    float pb = smoothstep(rr, rr - .1 - fpf / cs, e) * step(i == 0 ? .5 : .4, hf(hs + 5u)) * (1. - got);
    st = mix(st, mix(vec3(.08, .075, .066), vec3(.165, .15, .126), hf(hs + 2u)) * (.7 + .3 * smoothstep(rr, 0., e)), pb);
    got = max(got, pb);
  }
  st *= .7 + .3 * got;
  return mix(st, vec3(.105, .097, .084), smoothstep(.025, .09, fpf)) * (.8 + .4 * nz(x * .9).r);
}`,la=`layout(location = 0) out uvec4 oK;
in vec2 vUV;
${It}
${Ue}
bool clumpXZ(ivec2 c, out vec2 cp, out float sc) {
  vec2 f = vec2(c); float np = PER / FCS;
  ivec2 m = ivec2(f - np * floor(f / np) + .5);
  uint hs = ch(m, 7u);
  cp = (f + .2 + .6 * vec2(hf(hs + 1u), hf(hs + 2u))) * FCS;
  float dn = FERN * smoothstep(.36, .6, nz(cp / PER * 6.).g * .7 + nz(cp / PER * 2.).r * .3);
  bool on = hf(hs) < dn;
  if (c == ivec2(floor(FH.xy / FCS))) { on = true; cp = FH.xy; }
  if (c == ivec2(floor(FH.zw / FCS))) { on = true; cp = FH.zw; }
  if (length(cp - CAM0) < 1.4) on = false;
  if (CRK > .5 && abs(creekD(cp)) < CRW + .3) on = false;
  vec2 ax = normalize(LB.xz - LA.xz); float al = dot(cp - LA.xz, ax);
  if (al > .5 && al < length(LB.xz - LA.xz) - .5 && abs(dot(cp - LA.xz, vec2(-ax.y, ax.x))) < LR + .9) on = false;
  sc = .78 + .45 * hf(hs + 3u);
  return on;
}
// the floor's fine detail, baked once (FS_FD): needles over darker needles (r brightness, g hue) and sorrel leaves
// (b cover x shade, a the leaf's rank), read at the pixel's footprint from two turned, scaled copies so it never tiles
vec4 fdS(vec2 x, float fp) {
  float lod = log2(max(fp, 1e-5) * ${St}. / ${Ct}) - .6;
  vec4 a = textureLod(uF, x / ${Ct}, lod);
  vec4 b = textureLod(uF, (mat2(.8, .6, -.6, .8) * x * 1.37 + 3.1) / ${Ct}, lod + .454);
  return mix(a, b, smoothstep(.42, .58, nz(x * .11).r));
}
// needle duff: the baked needles under a slow change of tone, and fallen branchlets and slabs of bark
vec3 duff(vec2 x, float fp, vec4 fd) {
  vec3 base = fd.r * .4 * mix(vec3(1.4, .66, .42), vec3(1.04, .86, .74), fd.g);
  // older, damper duff in patches, fresh needle-fall in others: a change of tone at every scale, never of hue
  base *= (.78 + .44 * nz(x * .21).g) * (.66 + .62 * smoothstep(.25, .75, nz(x * .83).b * .6 + nz(x * 2.9).r * .4));
  // fallen branchlets and slabs of bark, kept at every distance (only their width meets the pixel's footprint)
  {
    vec2 gb = x / .95; ivec2 bc = ivec2(floor(gb)); uint bh = ch(bc, 21u);
    float a = hf(bh + 1u) * 6.2832; vec2 dr = vec2(cos(a), sin(a));
    vec2 rel = (gb - vec2(bc) - .5 - (vec2(hf(bh + 2u), hf(bh + 3u)) - .5) * .3) * .95;
    float ln = .14 + .28 * hf(bh + 4u), al = dot(rel, dr), ac = abs(dot(rel, vec2(-dr.y, dr.x)) - .03 * sin(al * 9. + a));
    float sl = step(.72, hf(bh + 6u)), wd = mix(.006 + .014 * hf(bh + 5u), .04 + .05 * hf(bh + 5u), sl);
    float cv = step(hf(bh), .8) * (1. - smoothstep(ln - .04, ln, abs(al))) * smoothstep(wd + fp, wd - fp * .5, ac);
    base = mix(base, mix(vec3(.1, .066, .045), vec3(.15, .095, .065), sl) * (.75 + .5 * smoothstep(wd, 0., ac)), cv);
  }
  return base;
}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  float tB = 1e5; int mat = 0;
  float tmax = d.y > 0. ? min(115., (HC + 15. - o.y) / d.y) : 115.;
  // ---------- floor (heightfield, slab search then bisection) ----------
  // (down in the ravine the eye is below the banks' tops: rays rising toward them search too)
  if (d.y < -1e-4 || (o.y < .5 && d.y > 1e-4)) {
    float ta = d.y < 0. ? max((.5 - o.y) / d.y, 0.) : 0., tb = d.y < 0. ? min((-uP[22].z - .16 - o.y) / d.y, 400.) : min((.5 - o.y) / d.y, 60.);
    float tp = ta, tc = ta; bool bis = false;
    // slabs fine enough not to step over a creek bank's lip (else the bank shows level terraces), then bisection
    for (int i = 0; i < 42 + ZI; i++) {
      float tm = bis ? .5 * (tp + tc) : ta + (tb - ta) * float(i + 1) / 34.;
      vec3 pm = o + d * tm;
      bool below = pm.y < floorH(pm.xz);
      if (bis) { if (below) tc = tm; else tp = tm; }
      else if (below) { bis = true; tc = tm; } else tp = tm;
      if (!bis && i >= 33) break;
    }
    if (bis) { tB = tc; mat = 3; }
  }
  // ---------- shade: C0 under unit fog light, C1 under unit sun (canopy gating is per frame) ----------
  vec3 C0 = vec3(0.), C1 = vec3(0.), shn = vec3(0.);
  float t = mat == 0 ? 1000. : tB;
  vec3 p = o + d * t;
  float fp = t * pa;
  if (mat == 3) {
    vec2 x = p.xz;
    float e = .02;
    vec2 gd = vec2(0.);
    for (int i = 0; i < 4 + ZI; i++) { vec2 e2 = vec2(i == 0 ? -e : i == 1 ? e : 0., i == 2 ? -e : i == 3 ? e : 0.); gd[i >> 1] += floorH(x + e2) * (float(i & 1) * 2. - 1.); }
    vec3 n = normalize(vec3(-gd.x, 2. * e, -gd.y));
    float fpf = fp / sqrt(max(-dot(d, n), .05));
    float cr = CRK > .5 ? abs(creekD(x)) : 99.;
    vec4 fd = fdS(x, fpf);
    vec3 alb = duff(x, fpf, fd);
    // sorrel in soft-edged beds that thin to single plants (never patches of flat colour), away from the creek
    float sd = SORR * smoothstep(.32, .64, nz(x / PER * 34.).g * .6 + nz(x / PER * 9.).r * .4) * smoothstep(CRW + .2, CRW + 1.6, cr);
    {
      float cv = clamp(fd.b * 1.33, 0., 1.);
      float cov = mix(cv * step(fd.a, sd * 1.4), clamp(fd.b * 2.2, 0., 1.) * min(sd * 1.6, 1.), smoothstep(.4, 2.2, log2(max(fpf, 1e-5) * ${St}. / ${Ct})));
      vec3 sc = vec3(.042, .092, .021) * (.7 + .65 * smoothstep(.5, .95, fd.b)) * (.85 + .3 * nz(x * .7).g);
      alb = mix(alb, sc, cov);
    }
    // creek bed: wet pebbles and silt
    float bed = 1. - smoothstep(CRW * .7, CRW + .5, cr);
    if (bed > 0.) alb = mix(alb, bedSt(x, fpf) * (DRY > .5 ? 1.3 : .7), bed);
    // contact: ferns, trunk bases, the log
    float ao = 1., fsh = 1.;
    vec2 fc = floor(x / FCS);
    for (int j = 0; j < 9 + ZI; j++) {
      ivec2 cc = ivec2(fc) + ivec2(j % 3 - 1, j / 3 - 1);
      vec2 B; float sc;
      if (clumpXZ(cc, B, sc)) {
        float dc = length(x - B);
        ao *= 1. - .6 * smoothstep(1.1 * sc, .1, dc);
        fsh *= 1. - .65 * smoothstep(.95 * sc, .15 * sc, length(x + SUN.xz / SUN.y * .35 * sc - B));
      }
    }
    {
      ivec2 tc = ivec2(floor(x / CS));
      for (int j = 0; j < 4 + ZI; j++) {
        ivec2 cc = tc + ivec2(j & 1, j >> 1) - ivec2(fract(x / CS).x < .5 ? 1 : 0, fract(x / CS).y < .5 ? 1 : 0);
        vec4 a, b; cellFetch(cc, a, b);
        if (a.z > 0.) { float dc = length(x - vec2(cc) * CS - a.xy) - rBase(0., a, b); ao *= .45 + .55 * smoothstep(-.1, 1.8, dc); }
      }
      vec3 ax = normalize(LB - LA); float al = clamp(dot(p - LA, ax), 0., length(LB - LA));
      float dl = length((LA + ax * al - p).xz) - LR;
      ao *= .4 + .6 * smoothstep(-.2, 1.2, dl);
    }
    float dome = .3 + .7 * (n.y * .5 + .5);
    C0 = alb * dome * ao * FOGC * 1.5;
    shn = n * .05;
    C1 = alb * max(dot(n, SUN), 0.) * fsh * (.6 + .4 * ao);
  }
  if (mat > 0 && dot(C1, C1) > 0.) C1 *= trunkSh(p + shn);
  if (any(isnan(C0)) || any(isnan(C1)) || any(isinf(C0)) || any(isinf(C1))) { C0 = vec3(.004); C1 = vec3(0.); }
  oK = uvec4(packHalf2x16(C0.rg), packHalf2x16(vec2(C0.b, C1.r)), packHalf2x16(C1.gb), packHalf2x16(vec2(min(t, 1000.), float(mat))));
  gl_FragDepth = min(t, 1000.) / 1024.;
}`,ia=`layout(location = 0) out uvec4 oK;
in vec2 vUV;
${It}
${Ue}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  if (CRK < .5 || DRY > .5 || d.y > -1e-4) discard;
  float t = (WL - o.y) / d.y;
  vec3 p = o + d * t;
  if (t <= 0. || t > 400. || floorH(p.xz) >= WL) discard;
  vec2 x = p.xz;
  float cr = abs(creekD(x)), fpf = t * pa / sqrt(max(-d.y, .05));
  vec3 alb = mix(vec3(.06, .043, .03), bedSt(x, fpf) * .7, 1. - smoothstep(CRW * .7, CRW + .5, cr));
  vec3 C0 = alb * FOGC * 1.5, C1 = alb * max(SUN.y, 0.);
  // water: dark, clear, a mirror at grazing angles with the trunks in it
  vec2 rp = (nz(x * .45 + vec2(.0, .3)).gb - .5) * .06 + (nz(x * 1.9).ba - .5) * .03;
  vec3 wn = normalize(vec3(rp.x, 1., rp.y));
  vec3 r = reflect(d, wn);
  float F = .02 + .98 * pow(1. - max(dot(-d, wn), 0.), 5.);
  vec3 rc = fogRad(r);
  // the trunks seen in it: plain columns
  vec2 rz = r.xz;
  vec2 sg = vec2(rz.x < 0. ? -1. : 1., rz.y < 0. ? -1. : 1.), iv = 1. / max(abs(rz), vec2(1e-6));
  ivec2 cell = ivec2(floor(p.xz / CS));
  vec2 tN = ((vec2(cell) + max(sg, 0.)) * CS - p.xz) * sg * iv, tD = CS * iv;
  float tr = 1e5; vec4 ra = vec4(0.), rb2 = vec4(0.); vec2 rcn = vec2(0.);
  for (int i = 0; i < 10 + ZI; i++) {
    vec4 a, b; cellFetch(cell, a, b);
    if (a.z > 0.) {
      vec2 cen = vec2(cell) * CS + a.xy, oc = p.xz - cen;
      float rr = a.z * (1. + b.x * .4), A = dot(rz, rz), Bq = dot(oc, rz), C = dot(oc, oc) - rr * rr, disc = Bq * Bq - A * C;
      if (disc > 0.) { float t0 = (-Bq - sqrt(disc)) / A; if (t0 > 0. && t0 < tr) { tr = t0; rcn = cen; } }
    }
    if (min(tN.x, tN.y) > tr) break;
    if (tN.x < tN.y) { cell.x += int(sg.x); tN.x += tD.x; } else { cell.y += int(sg.y); tN.y += tD.y; }
  }
  if (tr < 1e4) {
    float Tr = exp(-fogTau(p, r, tr));
    vec3 pr = p + r * tr;
    vec3 nr = normalize(vec3(pr.x - rcn.x, 0., pr.z - rcn.y));
    rc = vec3(.2, .08, .045) * FOGC * (.4 + .25 * dot(nr, -r)) * Tr + rc * (1. - Tr);
  }
  float depth = max(WL - (WL - .25 * smoothstep(CRW + .6, 0., cr)), 0.);
  vec3 tw = exp(-vec3(3.5, 2.6, 2.2) * depth * 2.);
  C0 = F * rc + (1. - F) * C0 * tw;
  C1 = (1. - F) * C1 * tw;

  if (dot(C1, C1) > 0.) C1 *= trunkSh(p + vec3(0., .05, 0.));
  if (any(isnan(C0)) || any(isnan(C1)) || any(isinf(C0)) || any(isinf(C1))) { C0 = vec3(.004); C1 = vec3(0.); }
  oK = uvec4(packHalf2x16(C0.rg), packHalf2x16(vec2(C0.b, C1.r)), packHalf2x16(C1.gb), packHalf2x16(vec2(min(t, 1000.), 2.)));
  gl_FragDepth = min(t, 1000.) / 1024.;
}`,ha=`out vec4 oC;
in vec2 vUV;
ivec2 wr(ivec2 c, int m) { return ((c % m) + m) % m; }
void main() {
  float px = ${Ct} / ${St}.;
  vec4 acc = vec4(0.);
  for (int ss = 0; ss < 4 + ZI; ss++) {
    vec2 x = (gl_FragCoord.xy + .25 + .5 * vec2(ss & 1, ss >> 1) - .5) * px;
    // needles: flat, 2 to 3.5 cm, over a darker layer of older needles
    float R = (.11 + .1 * nz(x * 3.1).g) * (.75 + .5 * nz(x * 23.).a), G = .3 + .45 * nz(x * 2.3 + .5).b;
    {
      float cs = ${Ct} / 144.;
      vec2 g = x / cs; ivec2 ic = ivec2(floor(g));
      float best = -1.;
      for (int j = 0; j < 25 + ZI; j++) {
        ivec2 cc = ic + ivec2(j % 5 - 2, j / 5 - 2);
        uint hs = ch(wr(cc, 144), 5u);
        float a = hf(hs) * 6.2832, ln = .8 + .7 * hf(hs + 1u), z = hf(hs + 4u);
        vec2 cen = vec2(cc) + vec2(hf(hs + 2u), hf(hs + 3u));
        vec2 dr = vec2(cos(a), sin(a)), rel = g - cen;
        float al = dot(rel, dr), ac = dot(rel, vec2(-dr.y, dr.x));
        float w = .17 * (1. - pow(min(abs(al) / ln, 1.), 3.));
        if (abs(al) < ln && abs(ac) < w && z > best) {
          best = z;
          float hv = hf(hs + 5u);
          R = (hv < .5 ? mix(.43, .22, hv * 2.) : mix(.22, .47, hv * 2. - 1.)) * (.7 + .5 * hf(hs + 6u)) * (.85 + .3 * smoothstep(w, 0., abs(ac)));
          G = hv < .5 ? 0. : hv * 2. - 1.;
        }
      }
    }
    // twigs (3 to 10 cm, grey-brown) and cones no bigger than an olive, on top of the needles
    {
      float cs = ${Ct} / 16.;
      vec2 g = x / cs; ivec2 ic = ivec2(floor(g));
      for (int j = 0; j < 9 + ZI; j++) {
        ivec2 cc = ic + ivec2(j % 3 - 1, j / 3 - 1);
        uint hs = ch(wr(cc, 16), 17u);
        vec2 cen = vec2(cc) + vec2(hf(hs + 2u), hf(hs + 3u));
        vec2 rel = (g - cen) * cs;
        if (hf(hs) < .55) {
          float a = hf(hs + 1u) * 6.2832; vec2 dr = vec2(cos(a), sin(a));
          float ln = .015 + .035 * hf(hs + 4u), al = dot(rel, dr), ac = abs(dot(rel, vec2(-dr.y, dr.x)) - .004 * sin(al * 90. + a));
          float wd = .0012 + .0014 * hf(hs + 5u);
          if (abs(al) < ln && ac < wd) { R = (.42 + .3 * hf(hs + 6u)) * (.8 + .4 * smoothstep(wd, 0., ac)); G = .55 + .35 * hf(hs + 7u); }
        }
        if (hf(hs + 8u) < .2) {
          vec2 q = rel - vec2(hf(hs + 9u) - .5, hf(hs + 10u) - .5) * cs * .6;
          float a = hf(hs + 11u) * 6.2832; q = vec2(dot(q, vec2(cos(a), sin(a))), dot(q, vec2(-sin(a), cos(a))));
          float e = length(q / vec2(.011, .008));
          if (e < 1.) { float sc = fract((q.x * 2.2 + abs(q.y) * 3.) / .006); R = (.2 + .25 * (1. - e)) * (.7 + .5 * sc); G = .1; }
        }
      }
    }
    // redwood sorrel: trefoils of heart-shaped leaflets with a pale stripe (cover x shade, and the plant's rank)
    float B = 0., A = 0.;
    {
      float cs = ${Ct} / 36.;
      vec2 g = x / cs; ivec2 ic = ivec2(floor(g));
      float best = -1.;
      for (int j = 0; j < 9 + ZI; j++) {
        ivec2 cc = ic + ivec2(j % 3 - 1, j / 3 - 1);
        uint hs = ch(wr(cc, 36), 3u);
        vec2 cen = vec2(cc) + .2 + .6 * vec2(hf(hs + 1u), hf(hs + 2u));
        float s = .32 + .2 * hf(hs + 3u), rot = hf(hs + 4u) * 6.2832, z = hf(hs + 5u);
        vec2 rel = g - cen;
        if (dot(rel, rel) > s * s * 1.3 || z < best) continue;
        for (int k = 0; k < 3 + ZI; k++) {
          float an = rot + float(k) * 2.0944;
          vec2 dr = vec2(cos(an), sin(an));
          float uu = dot(rel, dr), vv = dot(rel, vec2(-dr.y, dr.x));
          float dl = min(length(vec2(uu - .62 * s, vv - .23 * s)), length(vec2(uu - .62 * s, vv + .23 * s))) - .37 * s;
          dl = max(dl, abs(vv) - uu * 1.3 - .02 * s);
          if (dl < 0.) {
            float str = smoothstep(.12 * s, .03 * s, abs(vv)) * smoothstep(.75 * s, .3 * s, uu);
            float sh = clamp(.55 + .25 * str + .2 * hf(hs + 6u) - .25 * smoothstep(-.06 * s, 0., dl), .5, 1.);
            if (z > best) { best = z; B = sh; } else B = max(B, sh);
            A = .05 + .95 * hf(hs + 7u);
          }
        }
      }
    }
    acc += vec4(R, G, B, 0.); acc.a = max(acc.a, A);
  }
  oC = vec4(clamp(acc.rgb * .25, 0., 1.), acc.a);
}`,da=`layout(location = 0) out uvec4 oK;
in vec2 vUV;
${It}
float trunkD(vec3 p, vec2 cen, vec4 a, vec4 b, float fp, float lod, out float fz) {
  vec2 q = p.xz - cen;
  float L = length(q), th = atn(q), y = p.y, R = a.z, s = a.w;
  float r = rBase(y, a, b);
  float fl = exp(-max(y, 0.) / (1.1 * R));
  r *= 1. + fl * (.08 * sin(th * 4. + s * 6.) + .055 * sin(th * 7. + s * 11.) + .035 * sin(th * 12. + s * 3.));
  fz = 0.;
  if (lod < 1.5 && b.w > 0.) {
    for (int i = 0; i < 2 + ZI; i++) {
      float fi = float(i), tb = s * 13. + fi * 2.4, yb = 1.2 + fract(s * 7.3 + fi * .37) * 7., sb = (.25 + .35 * fract(s * 3.1 + fi * .71)) * min(R, 2.2);
      float dth = mod(th - tb + 3.1415927, 6.2831853) - 3.1415927;
      float g = exp(-(dth * dth * R * R + (y - yb) * (y - yb) * .7) / (sb * sb));
      r += b.w * sb * .55 * g * (.75 + .6 * nz(vec2(th * R, y) * .11 + s).a);
    }
  }
  if (lod < .5) {
    float k = max(3., floor(R * 2.6 + .5));
    float u = th / 6.2831853 * k;
    float lt = log2(max(fp * 256. * k * .5 / (6.2831853 * R), 1.));
    float wv = textureLod(uN, vec2(u * .5, y / 30. + s), 0.).g - .5;
    // ridges a hand to a forearm wide, flat on top, the furrows between them braiding and joining every metre or two
    float n = textureLod(uN, vec2(u * .5 + wv * .14, y / 55. + s), lt).b;
    float rr = smoothstep(.62, .95, 1. - abs(n - .5) * 2.6);
    float n2 = textureLod(uN, vec2(u * 2. - wv * .05, y / 70. + s * 1.7), lt + 1.).a;
    float rr2 = clamp(1. - abs(n2 - .5) * 5., 0., 1.);
    fz = rr;
    float D = min(.2, .065 * R + .04);
    r -= D * (fz * (1. - .45 * fl) + .22 * rr2 * rr2 * rr2);
    r += min(.07, .03 * R) * (textureLod(uN, vec2(u * .5 + wv * .03, y / 90. + s * 2.), max(lt - 1., 0.)).g - .5) * 2.;
    r += .01 * (textureLod(uN, vec2(u * 6., y / 14.), lt + 2.6).a - .5) * (1. - fz);
  }
  float d = L - r;
  if (b.y > 1.5) {
    vec2 dir = vec2(cos(b.z), sin(b.z));
    vec2 qd = vec2(dot(q, dir), dot(q, vec2(-dir.y, dir.x)));
    float hA = 1.25 * R + .6, yy = y + .4;
    float hw = R * .34 * pow(clamp(1. - yy / hA, 0., 1.), .55) + .05 * sin(y * 3.1 + s * 5.) + .03 * sin(y * 7.3);
    float slot = max(max(abs(qd.y) - hw, -qd.x), yy - hA);
    float inner = max(L - R * .66 - .05 * sin(th * 5. + y), y - hA * 1.6);
    // the lips: healed bark rolled inward round the opening
    float ed = max(abs(qd.y) - hw, yy - hA);
    d -= .16 * exp(-ed * ed / .05) * smoothstep(R * .45, R * .95, qd.x);
    float cv = -min(inner, slot), hk = clamp(.5 + .5 * (d - cv) / .18, 0., 1.);
    d = mix(cv, d, hk) + .18 * hk * (1. - hk);
  }
  return d;
}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  float tB = 1e5; int mat = 0;
  float tmax = d.y > 0. ? min(115., (HC + 15. - o.y) / d.y) : 115.;
  // ---------- trunks: cell walk, bound, sphere trace ----------
  vec4 ha = vec4(0.), hb = vec4(0.); vec2 hcen = vec2(0.); vec3 hn = vec3(0., 1., 0.); float hfz = 0.;
  {
    vec2 dz = d.xz;
    vec2 sg = vec2(dz.x < 0. ? -1. : 1., dz.y < 0. ? -1. : 1.), iv = 1. / max(abs(dz), vec2(1e-6));
    ivec2 cell = ivec2(floor(o.xz / CS));
    vec2 tN = ((vec2(cell) + max(sg, 0.)) * CS - o.xz) * sg * iv, tD = CS * iv;
    float tc0 = 0.;
    for (int i = 0; i < 34 + ZI; i++) {
      if (tc0 > min(tB, tmax)) break;
      vec4 a, b; cellFetch(cell, a, b);
      if (a.z > 0.) {
        vec2 cen = vec2(cell) * CS + a.xy;
        vec2 oc = o.xz - cen;
        float rb = a.z * (1. + b.x) * 1.16 + .25;
        float A = dot(dz, dz), Bq = dot(oc, dz), C = dot(oc, oc) - rb * rb, disc = Bq * Bq - A * C;
        if (disc > 0. && A > 1e-9) {
          float sq = sqrt(disc);
          float t0 = max((-Bq - sq) / A, 0.), t1 = min((-Bq + sq) / A, min(tB, tmax));
          if (t0 < t1) {
            float lod = t0 > 26. ? 2. : t0 > 19. ? 1. : 0.;
            if (lod > 1.5) {
              // a far trunk: a plain column, its radius at the height it is met
              float tt = -Bq / A;
              for (int it = 0; it < 3 + ZI; it++) {
                float rr = rBase(o.y + d.y * tt, a, b) * .97;
                float C2 = dot(oc, oc) - rr * rr, D2 = Bq * Bq - A * C2;
                if (D2 <= 0.) { tt = 1e5; break; }
                tt = (-Bq - sqrt(D2)) / A;
              }
              if (tt > 0. && tt < min(tB, tmax)) {
                vec3 ph = o + d * tt;
                tB = tt; mat = 1; ha = a; hb = b; hcen = cen; hn = normalize(vec3(ph.x - cen.x, 0., ph.z - cen.y)); hfz = .3;
              }
            } else {
            float t = t0, th = 1e5; int nm = -1; vec3 ph = vec3(0.), na = vec3(0.); float fz = 0., fzh = 0., dl = 1e5;
            for (int j = 0; j < 72 + ZI; j++) {
              vec3 e = 2. * vec3(((nm + 3) >> 1) & 1, (nm >> 1) & 1, nm & 1) - 1.;
              if (nm < 0 && (t > t1 || j > 67)) { if (t < t1 && dl < .03) { th = t; ph = o + d * t; nm = 0; fzh = fz; } else break; }
              vec3 pp = nm < 0 ? o + d * t : ph + e * max(.004, th * pa * .7);
              float dd = trunkD(pp, cen, a, b, max(t, .3) * pa, lod, fz);
              if (nm >= 0) { na += e * dd; nm++; if (nm > 3) break; }
              else if (dd < .001 + t * pa * .5) { th = t; ph = pp; nm = 0; fzh = fz; }
              else { t += dd * (lod > .5 ? .85 : .62); dl = dd; }
            }
            if (th < tB) { tB = th; mat = 1; ha = a; hb = b; hcen = cen; hn = dot(na, na) > 1e-14 ? normalize(na) : normalize(vec3(ph.x - cen.x, 0., ph.z - cen.y) + 1e-6); hfz = fzh; }
            }
          }
        }
      }
      tc0 = min(tN.x, tN.y);
      if (tN.x < tN.y) { cell.x += int(sg.x); tN.x += tD.x; } else { cell.y += int(sg.y); tN.y += tD.y; }
    }
  }
  if (mat == 0) discard;
  // ---------- shade: C0 under unit fog light, C1 under unit sun (canopy gating is per frame) ----------
  vec3 C0 = vec3(0.), C1 = vec3(0.), shn = vec3(0.);
  float t = mat == 0 ? 1000. : tB;
  vec3 p = o + d * t;
  float fp = t * pa;
  {
    vec3 n = hn;
    float R = ha.z, s = ha.w, y = p.y;
    vec2 q = p.xz - hcen; float th = atn(q), L = length(q);
    float k = max(3., floor(R * 2.6 + .5));
    float u = th / 6.2831853 * k;
    float tone = nz(vec2(u * 2., y / 30. + s * 3.)).g;
    vec3 ridge = mix(vec3(.2, .095, .055), vec3(.22, .16, .125), smoothstep(.38, .7, tone) * .85);
    vec3 alb = mix(ridge, vec3(.1, .036, .018), hfz);
    alb *= .75 + .5 * nz(vec2(u * 3., y / 9.) + s).a;
    alb *= mix(vec3(1.), vec3(1.08, .95, .9), fract(s * 5.3));
    // lichen and moss low on the trunk, on one side
    float lich = smoothstep(.55, .75, nz(vec2(u * 4., y / 8. + s)).r + .25 * dot(normalize(q), vec2(-.6, .8))) * smoothstep(9., 1., y);
    // (not on the far plain columns, where a patch has no bark to break it: there the furrows' tone runs as streaks)
    float far = smoothstep(19., 26., t);
    alb = mix(alb, vec3(.2, .22, .14), lich * .55 * (1. - hfz) * (1. - far));
    alb *= mix(1., .8 + .4 * nz(vec2(u * 6., y / 70. + s)).b, far);
    float ao = (1. - .6 * hfz) * (.5 + .5 * smoothstep(-.4, 2.6, y));
    // char: a fire scar on one side, and inside the goose pen
    float ch0 = 0.;
    if (hb.y > .5) {
      float dth = abs(mod(th - hb.z + 3.1416, 6.2832) - 3.1416);
      float hs = (hb.y > 1.5 ? 2.2 : 1.6) * R + 1. + .8 * sin(th * 6. + s);
      ch0 = smoothstep(.15, -.1, dth / (hb.y > 1.5 ? 1.25 : 1.) - .9 * (1. - y / hs)) * step(y, hs);
      if (hb.y > 1.5 && L < R * .86) { ch0 = 1.; ao *= .1 + .9 * smoothstep(.6, 1., L / R); }
    }
    if (ch0 > 0.) {
      vec2 cg = vec2(u * 26., y * 4.5) + (vec2(nz(vec2(u, y * .1)).a, nz(vec2(u * 1.3, y * .13) + .5).a) - .5) * 2.5;
      cg.x += hf(uint(floor(cg.y)) * 7u + 3u) * 3.;
      vec2 cf = fract(cg) - .5;
      float crack = smoothstep(.38, .5, max(abs(cf.x) * (.8 + .4 * hf(uint(floor(cg.x) + 911.))), abs(cf.y)));
      vec3 cc = alb * .16 + vec3(.012, .011, .01) - crack * .008;
      alb = mix(alb, cc, ch0);
    }
    vec3 lb = normalize(vec3(SUN.x, .5, SUN.z));
    float dome = .22 + .38 * (n.y * .5 + .5) + .75 * pow(max(dot(n, lb), 0.), 1.5) + .15 * max(dot(n, -FW), 0.);
    C0 = alb * dome * ao * FOGC * 1.5;
    shn = n * .1;
    C1 = alb * max(dot(n, SUN), 0.) * (1. - .55 * hfz) * (1. - .7 * ch0 * step(L, R * .86));
  }
  if (mat > 0 && dot(C1, C1) > 0.) C1 *= trunkSh(p + shn);
  if (any(isnan(C0)) || any(isnan(C1)) || any(isinf(C0)) || any(isinf(C1))) { C0 = vec3(.004); C1 = vec3(0.); }
  oK = uvec4(packHalf2x16(C0.rg), packHalf2x16(vec2(C0.b, C1.r)), packHalf2x16(C1.gb), packHalf2x16(vec2(min(t, 1000.), float(mat))));
  gl_FragDepth = min(t, 1000.) / 1024.;
}`,va=`layout(location = 0) out uvec4 oK;
in vec2 vUV;
${It}
float logD(vec3 p, out vec3 li) {
  vec3 ax = LB - LA; float ll = length(ax); ax /= ll;
  vec3 r = p - LA; float al = dot(r, ax);
  r.y += .22 * sin(3.1416 * clamp(al / ll, 0., 1.)) - .1 * sin(al * .7);
  vec3 pr = r - ax * al; float L = length(pr);
  vec3 sd = normalize(cross(ax, vec3(0., 1., 0.)));
  float th = atn(vec2(pr.y, dot(pr, sd)));
  float cu = pr.y / max(L, 1e-4);
  float moss = smoothstep(.15, .45, cu + 1.1 * (nz(vec2(al * .11, th * .16)).g - .5));
  // the moss is a fleece: its relief no finer than a quarter metre (its nap is in the colour)
  float mt = moss * (.03 + .05 * nz(vec2(al * .25, th * .19)).g);
  float rn = nz(vec2(th * .55, al * .045)).b;
  float rr = clamp(1. - abs(rn - .5) * 5., 0., 1.);
  float gir = LR * (1. + .1 * (nz(vec2(al * .05, .3)).r - .5) * 2. + .05 * sin(th * 3. + al * .4));
  float d = L - gir - mt + (1. - moss) * .07 * rr * rr;
  float jag = .35 * (nz(vec2(th * .16, .5)).b - .5) + .15 * (nz(vec2(th * .5, .2)).a - .5);
  // the near end is a break: splinters standing out from the shell, the heart rotted hollow a way in; the far end
  // is out in the fog
  float spk = .55 * smoothstep(.5, .8, nz(vec2(th * .45, .63)).b) * smoothstep(.6, .95, L / gir) * smoothstep(-.3, .4, pr.y / max(L, 1e-4));
  d = max(d, max(-al + .3 + jag * 1.6 - spk, al - ll + .3 + jag));
  d = max(d, min(gir * (.5 + .14 * (nz(vec2(th * .3, al * .2)).r - .5)) - L, 1.4 + jag * 2. - al));
  li = vec3(al, moss, rr);
  return d;
}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  float tB = 1e5; int mat = 0;
  float tmax = d.y > 0. ? min(115., (HC + 15. - o.y) / d.y) : 115.;
  // ---------- the fallen log ----------
  vec3 li = vec3(0.); vec3 ln = vec3(0., 1., 0.);
  {
    vec3 ax = normalize(LB - LA), oc = o - LA;
    vec3 dd2 = d - ax * dot(d, ax), oo = oc - ax * dot(oc, ax);
    float Rb = LR + .4, A = dot(dd2, dd2), Bq = dot(dd2, oo), C = dot(oo, oo) - Rb * Rb, disc = Bq * Bq - A * C;
    if (disc > 0. && A > 1e-8) {
      float sq = sqrt(disc), t = max((-Bq - sq) / A, 0.), t1 = min((-Bq + sq) / A, tB);
      int nm = -1; vec3 ph = vec3(0.), na = vec3(0.); float th = 1e5;
      for (int j = 0; j < 44 + ZI; j++) {
        vec3 e = 2. * vec3(((nm + 3) >> 1) & 1, (nm >> 1) & 1, nm & 1) - 1.;
        if (nm < 0 && (t > t1 || j > 39)) break;
        vec3 pp = nm < 0 ? o + d * t : ph + e * .006;
        vec3 l3;
        float dd = logD(pp, l3);
        if (nm >= 0) { na += e * dd; nm++; if (nm > 3) break; }
        else if (dd < .001 + t * pa * .5) { th = t; ph = pp; nm = 0; li = l3; }
        else t += dd * .7;
      }
      if (th < tB) { tB = th; mat = 5; ln = normalize(na); }
    }
  }
  if (mat == 0) discard;
  // ---------- shade: C0 under unit fog light, C1 under unit sun (canopy gating is per frame) ----------
  vec3 C0 = vec3(0.), C1 = vec3(0.), shn = vec3(0.);
  float t = mat == 0 ? 1000. : tB;
  vec3 p = o + d * t;
  float fp = t * pa;
  if (mat == 5) {
    vec3 n = ln;
    float moss = li.y;
    vec3 ax = normalize(LB - LA); vec3 pr = p - LA - ax * li.x;
    float th = atn(vec2(pr.y, dot(pr, normalize(cross(ax, vec3(0., 1., 0.))))));
    // the bark's fibres run along the trunk, as on the standing giants
    vec3 bark = mix(vec3(.24, .14, .09), vec3(.13, .07, .045), li.z) * (.8 + .4 * nz(vec2(li.x * .06, th * 1.7)).a);
    vec3 mc = mix(vec3(.03, .07, .015), vec3(.085, .12, .025), nz(p.xz * .9 + p.y * .3).g) * (.75 + .5 * nz(p.xz * 17. + p.y * 9.).a);
    vec3 alb = mix(bark, mc, moss);
    // the broken end: weathered heartwood, grey-brown, split along its rings
    float en = smoothstep(.55, .85, abs(dot(n, ax)));
    alb = mix(alb, vec3(.15, .105, .075) * (.75 + .5 * nz(vec2(length(pr) * 1.3, th * .4)).b), en);
    float ao = .4 + .6 * smoothstep(-.7, .8, n.y) - .2 * li.z * (1. - moss);
    float dome = .25 + .75 * (n.y * .5 + .5);
    // a banana slug's dried trail: a silver ribbon wandering along the log's back
    float tc = SLUG.z + .32 * sin(li.x * 1.1 + SLUG.z * 3.) + .12 * sin(li.x * 3.7 + 1.) + .04 * sin(li.x * 11.);
    float tw = (abs(th - tc) * LR - .009) / max(fp, .002);
    float trl = (1. - smoothstep(-.6, .6, tw)) * smoothstep(SLUG.x, SLUG.x + .3, li.x) * smoothstep(SLUG.y, SLUG.y - .3, li.x);
    trl *= .6 + .4 * nz(vec2(li.x * 7., th)).a;
    vec3 r = reflect(d, n);
    C0 = (alb * dome * ao * 1.5 + trl * (.05 + .25 * pow(max(r.y, 0.), 3.))) * FOGC;
    shn = n * .08;
    C1 = alb * max(dot(n, SUN), 0.) * (1. + .3 * moss) + trl * .5 * pow(max(dot(r, SUN), 0.), 12.);
  }
  if (mat > 0 && dot(C1, C1) > 0.) C1 *= trunkSh(p + shn);
  if (any(isnan(C0)) || any(isnan(C1)) || any(isinf(C0)) || any(isinf(C1))) { C0 = vec3(.004); C1 = vec3(0.); }
  oK = uvec4(packHalf2x16(C0.rg), packHalf2x16(vec2(C0.b, C1.r)), packHalf2x16(C1.gb), packHalf2x16(vec2(min(t, 1000.), float(mat))));
  gl_FragDepth = min(t, 1000.) / 1024.;
}`,ma=`layout(location = 0) out uvec4 oK;
in vec2 vUV;
${It}
// a fern clump in fern cell c: its crown, size and hash
bool clump(ivec2 c, out vec3 B, out float sc, out uint hs) {
  vec2 f = vec2(c); float np = PER / FCS;
  ivec2 m = ivec2(f - np * floor(f / np) + .5);
  hs = ch(m, 7u);
  vec2 cp = (f + .2 + .6 * vec2(hf(hs + 1u), hf(hs + 2u))) * FCS;
  float dn = FERN * smoothstep(.36, .6, nz(cp / PER * 6.).g * .7 + nz(cp / PER * 2.).r * .3);
  bool on = hf(hs) < dn;
  if (c == ivec2(floor(FH.xy / FCS))) { on = true; cp = FH.xy; }
  if (c == ivec2(floor(FH.zw / FCS))) { on = true; cp = FH.zw; }
  if (length(cp - CAM0) < 1.4) on = false;
  if (CRK > .5 && abs(creekD(cp)) < CRW + .3) on = false;
  ivec2 tc = ivec2(floor(cp / CS));
  vec4 a, b; cellFetch(tc, a, b);
  if (a.z > 0. && length(cp - vec2(tc) * CS - a.xy) < a.z * (1. + b.x) + .4) on = false;
  sc = .78 + .45 * hf(hs + 3u);
  float y0 = floorH(cp) - .05;
  // the nurse log: a clump on top grows from its moss
  vec2 ax = normalize(LB.xz - LA.xz); float al = dot(cp - LA.xz, ax);
  float pd = abs(dot(cp - LA.xz, vec2(-ax.y, ax.x)));
  if (al > .5 && al < length(LB.xz - LA.xz) - .5 && pd < LR + .9) {
    if (pd < LR * .6 && hf(hs + 9u) < .9) { y0 = mix(LA.y, LB.y, al / length(LB.xz - LA.xz)) + LR * .88; sc *= .7; on = true; }
    else on = false;
  }
  B = vec3(cp.x, y0, cp.y);
  return on;
}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  float tB = 1e5; int mat = 0;
  float tmax = d.y > 0. ? min(115., (HC + 15. - o.y) / d.y) : 115.;
  // ---------- sword ferns: clumps of arched fronds, each a quadratic ----------
  vec3 fB = vec3(0.); float fsc = 1., fw = 0., flam = 0., ffold = 0., fv = 0., fm = 0.; vec2 fcs = vec2(1., 0.); int fkind = 0;
  {
    vec2 dz = d.xz;
    float tlim = min(tB, 24.);
    vec2 sg = vec2(dz.x < 0. ? -1. : 1., dz.y < 0. ? -1. : 1.), iv = 1. / max(abs(dz), vec2(1e-6));
    vec2 o2 = o.xz - dz * 1.4;
    ivec2 cell = ivec2(floor(o2 / FCS));
    vec2 tN = ((vec2(cell) + max(sg, 0.)) * FCS - o2) * sg * iv, tD = FCS * iv;
    float tc0 = -1.4;
    for (int i = 0; i < 22 + ZI; i++) {
      if (tc0 > min(tB, tlim) + 1.4) break;
      vec3 B; float sc; uint hs;
      if (clump(cell, B, sc, hs)) {
        vec3 oc = o - B - vec3(0., .3 * sc, 0.);
        float bq = dot(oc, d), cq = dot(oc, oc) - 1.05 * sc * 1.05 * sc, disc = bq * bq - cq;
        if (disc > 0. && -bq - sqrt(disc) < tB) {
          int nf = 13 + int(hf(hs + 11u) * 7.);
          float rot0 = hf(hs + 12u) * 6.2832;
          vec3 ro = o - B;
          for (int k = 0; k < 20 + ZI; k++) {
            if (k >= nf) break;
            uint fh = hsh(hs + uint(k) * 747796405u);
            float r1 = hf(fh), r2 = hf(fh + 1u), r3 = hf(fh + 2u), r4 = hf(fh + 3u);
            float phi = rot0 + (float(k) + .6 * r1) * 6.2832 / float(nf);
            float ca = cos(phi), sa = sin(phi);
            bool dead = r4 < .08;
            float Lf = sc * (.62 + .42 * r2);
            float sMax = Lf * (dead ? .95 : .58 + .3 * r3), hA = Lf * (dead ? .1 : .3 + .3 * (1. - r3));
            float sA = sMax * (dead ? .28 : .52 + .2 * r1);
            float kq = hA / (sA * sA), m0 = 2. * hA / sA;
            float s0 = ro.x * ca + ro.z * sa, w0 = -ro.x * sa + ro.z * ca, h0 = ro.y;
            float ds = d.x * ca + d.z * sa, dw = -d.x * sa + d.z * ca, dh = d.y;
            float qa = kq * ds * ds, qb = 2. * kq * s0 * ds + dh - m0 * ds, qc = h0 - m0 * s0 + kq * s0 * s0;
            float x1 = 1e5, x2 = 1e5;
            if (abs(qa) < 1e-7) { x1 = abs(qb) > 1e-7 ? -qc / qb : 1e5; }
            else { float D = qb * qb - 4. * qa * qc; if (D >= 0.) { float sq = sqrt(D); x1 = (-qb - sq) / (2. * qa); x2 = (-qb + sq) / (2. * qa); if (x2 < x1) { float tt = x1; x1 = x2; x2 = tt; } } }
            for (int r = 0; r < 2 + ZI; r++) {
              float tt = r == 0 ? x1 : x2;
              if (tt <= .05 || tt >= tB) continue;
              float s = s0 + ds * tt;
              if (s < 0. || s > sMax) continue;
              float w = w0 + dw * tt, aw = abs(w);
              float m1 = m0 - 2. * kq * s;
              float q0 = sqrt(1. + m0 * m0), q1 = sqrt(1. + m1 * m1);
              float F0 = m0 * q0 + sign(m0) * log(abs(m0) + q0), F1 = m1 * q1 + sign(m1) * log(abs(m1) + q1);
              float m2 = m0 - 2. * kq * sMax, q2 = sqrt(1. + m2 * m2), F2 = m2 * q2 + sign(m2) * log(abs(m2) + q2);
              float ar = (F0 - F1) / (4. * kq), La = (F0 - F2) / (4. * kq), v = ar / La;
              float fp = tt * pa;
              bool hit = aw < max(.0032 * sc, fp * .55);
              float lam = 0., fold = 0.;
              float bl = (v - .16) / .84;
              if (!hit && bl > 0.) {
                float wid = sc * (.068 + .028 * r2) * pow(sin(3.1416 * clamp(bl * .96 + .04, 0., 1.)), .5);
                lam = aw / wid;
                if (lam < 1.) {
                  float spc = La * .84 / 36.;
                  float g = (ar - .16 * La - .5 * aw) / spc + (w > 0. ? 0. : .5);
                  float f = fract(g) - .5;
                  float hw = .45 * pow(1. - lam, .42) * (1. - .2 * lam);
                  if (f > 0. && lam < .24) hw += .13 * (1. - lam / .24);
                  float fill = smoothstep(.3, .9, fp / spc);
                  hw -= .07 * fract(lam * wid / .0045) * (1. - fill);
                  hw = mix(hw, .5, fill * .85);
                  hit = abs(f) < hw && !(dead && hf(uint(floor(g)) * 31u + fh) < .35);
                  fold = f / max(hw, .02);
                }
              }
              if (hit) {
                tB = tt; mat = 4; fB = B; fsc = sc; fw = w; flam = lam; ffold = fold; fv = v; fm = m1; fcs = vec2(ca, sa);
                fkind = dead ? 2 : r2 > .82 ? 1 : 0;
                break;
              }
            }
          }
        }
      }
      tc0 = min(tN.x, tN.y);
      if (tN.x < tN.y) { cell.x += int(sg.x); tN.x += tD.x; } else { cell.y += int(sg.y); tN.y += tD.y; }
    }
  }
  if (mat == 0) discard;
  // ---------- shade: C0 under unit fog light, C1 under unit sun (canopy gating is per frame) ----------
  vec3 C0 = vec3(0.), C1 = vec3(0.), shn = vec3(0.);
  float t = mat == 0 ? 1000. : tB;
  vec3 p = o + d * t;
  float fp = t * pa;
  {
    float ca = fcs.x, sa = fcs.y;
    vec3 T = normalize(vec3(ca, fm, sa)), W = vec3(-sa, 0., ca);
    vec3 n = normalize(vec3(-fm * ca, 1., -fm * sa));
    n = normalize(n - W * sign(fw) * .55 * flam + T * ffold * .22);
    bool back = dot(n, d) > 0.;
    if (back) n = -n;
    vec3 alb = fkind == 2 ? vec3(.13, .075, .035) : fkind == 1 ? vec3(.05, .1, .02) : vec3(.026, .056, .017);
    alb *= .85 + .3 * fv;
    if (flam == 0.) alb = fkind == 2 ? alb : vec3(.05, .055, .02);
    if (fv < .16) alb = vec3(.08, .05, .025);
    float hgt = (p.y - fB.y) / (.6 * fsc);
    float ao = mix(.3, 1., smoothstep(0., 1., hgt)) * (.7 + .3 * flam);
    float dome = .35 + .65 * (n.y * .5 + .5);
    vec3 r = reflect(d, n);
    float spec = .045 * pow(max(r.y, 0.), 3.);
    C0 = (alb * dome * ao * (back ? .8 : 1.) * 1.5 + spec * vec3(.6, .65, .55)) * FOGC;
    float sh = clamp(.25 + 1.1 * hgt, .25, 1.);
    float tr = max(-dot(n, SUN), 0.);
    C1 = (alb * max(dot(n, SUN), 0.) + vec3(.06, .11, .015) * tr * 1.4 * (fkind == 2 ? .3 : 1.) + .12 * pow(max(dot(r, SUN), 0.), 24.) * vec3(.9, .95, .8)) * sh;
  }
  if (mat > 0 && dot(C1, C1) > 0.) C1 *= trunkSh(p + shn);
  if (any(isnan(C0)) || any(isnan(C1)) || any(isinf(C0)) || any(isinf(C1))) { C0 = vec3(.004); C1 = vec3(0.); }
  oK = uvec4(packHalf2x16(C0.rg), packHalf2x16(vec2(C0.b, C1.r)), packHalf2x16(C1.gb), packHalf2x16(vec2(min(t, 1000.), float(mat))));
  gl_FragDepth = min(t, 1000.) / 1024.;
}`,xa=`out vec4 oC;
in vec2 vUV;
float fogN(vec3 p, float ds) {
  vec2 a = (p.xz + WIND) / PER, b = (p.xz + WIND * 1.9) / PER;
  // above head height the fog also changes upward (else a ray straight up runs along one column of it)
  float hy = max(p.y - 25., 0.);
  float n1 = textureLod(uN, a * 9. + p.y * vec2(.0021, .0013) + hy * vec2(.021, -.013), 0.).r;
  float n2 = textureLod(uN, b * 13. + p.y * vec2(-.0017, .0029) + hy * vec2(-.018, .024) + .5, 0.).g;
  // a soft floor (a hard clamp left flat plateaus with cut edges where the fog thins)
  // a step longer than a wisp averages it out (else the far steps sample the fine wisps sparsely: blotchy grain)
  float x = .25 + 1.5 * (n1 - .5) * 1.6 * smoothstep(9., 2.5, ds) + .5 + (n2 - .5) * 1.4 * smoothstep(3.5, .9, ds);
  return min(.5 * (x + sqrt(x * x + .05)), 2.4);
}
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  float t = unpackHalf2x16(texelFetch(uK, ivec2(vUV * FULL), 0).w).x;
  float tm = min(t, 95.);
  const int N = 30;
  float j = hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u + 17u);
  float cth = dot(d, SUN);
  float ph = mix(hg(cth, .62), .08, .3);
  float Ls = 0., Wa = 0., Tc = 1., Am = 0.;
  bool sw = uP[17].x + uP[17].y + uP[17].z > 0.;
  float sPrev = 0.;
  for (int i = 0; i < N + ZI; i++) {
    float x = (float(i) + j) / float(N);
    float s = tm * x * x, ds = tm * 2. * x / float(N);
    vec3 p = o + d * s;
    float hp = .72 + .28 * exp(-p.y / 14.);
    float fn = fogN(p, ds);
    if (sw) {
      for (int k = 0; k < 3; k++) {
        vec4 S = uP[14 + k]; float amp = uP[17][k];
        if (amp <= 0.) continue;
        vec3 q = p - S.xyz;
        vec3 ax = normalize(vec3(S.xyz - CAM) * vec3(1., 0., 1.) + 1e-4);
        float al = dot(q, ax);
        vec3 qp = q - ax * al;
        vec3 e1 = normalize(cross(ax, vec3(0., 1., 0.)));
        vec2 uv = vec2(dot(qp, e1), qp.y);
        float rho = length(uv), Rs = 1.3 + 1.1 * sqrt(S.w);
        float ang = atn(uv) - 2.2 * S.w / (.35 + rho);
        float arm = sin(3. * ang + rho * 4.2) * .6 + sin(5. * ang - rho * 7. + S.w) * .4;
        float env = amp * exp(-rho * rho / (Rs * Rs) - al * al / (Rs * Rs * .5));
        fn *= max(0., 1. + 1.5 * env * arm - .7 * env * exp(-rho * rho / (Rs * Rs * .12)));
      }
    }
    float den = SIG * hp * fn;
    vec2 Q = canQ(p);
    vec4 lm = textureLod(uL, Q / PER, 0.);
    float occ = p.y < 12. ? mix(lm.g, lm.b, max(p.y, 0.) / 12.) : mix(lm.b, lm.a, min((p.y - 12.) / 18., 1.));
    float vis = lm.r * occ * hfog(Q);
    Ls += Tc * den * ds * vis;
    Wa += Tc * SIG * hp * (fn - 1.) * ds;
    Tc *= exp(-den * ds);
    Am += SIG * hp * ds;
  }
  // the wisps are the fog's departure from its mean: they can't take away more light than the mean fog gives (a ray
  // straight up runs a long way through one column of the noise): a soft floor and ceiling, exact inside. Looking
  // steeply up, what thinner fog reveals is the glow of the fog and canopy above, not dark trunks: a higher floor there
  float wl = 1. - exp(-Am), lo = mix(.75, .3, smoothstep(.62, .95, d.y));
  if (Wa < -lo * wl) { float x = (-lo * wl - Wa) / (.15 * wl + 1e-6); Wa = -lo * wl - .15 * wl * x / (1. + x); }
  if (Wa > 1.1 * wl) { float x = (Wa - 1.1 * wl) / (.5 * wl + 1e-6); Wa = 1.1 * wl + .5 * wl * x / (1. + x); }
  vec3 c = Ls * ph * BMK * SUNC + Wa * fogRad(d) * AMBK * .9;
  c = any(isnan(c)) ? vec3(0.) : c;
  // without float targets: a signed, compressed code in a 10-bit target (the wisps go negative)
  oC = vec4(ENC < .99 ? .5 + .5 * c / (abs(c) + 1.) : c * ENC, tm);
}`,ua=`out vec4 oC;
in vec2 vUV;
vec3 tmap(vec3 c) {
  c *= EXPO;
  float mx = max(c.r, max(c.g, c.b));
  c = mix(c, vec3(dot(c, vec3(.4, .45, .15))), smoothstep(.5, 3., mx) * .5);
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
#ifdef CROWN
// the crowns seen from below: at tier height h, how much of point P is covered by the limbs of the trunk in cell cc
// (crooked spokes, each carrying a flat ragged plate of spray: 1 at the limb, .5 at the plate's rim)
float crownC(vec2 P, float h, float k, ivec2 cc, float lod) {
  vec4 a, b; cellFetch(cc, a, b);
  if (a.z <= 0.) return 0.;
  vec2 rel = P - (vec2(cc) * CS + a.xy);
  float dist = length(rel), r = a.z * (1. - .0035 * h) * .9;
  uint s0 = uint(a.w * 65536.) * 4u + uint(k);
  // the tier's limbs: 5 to 9, turned from the last tier; each carries a lobe of spray (its length its own)
  float n = 5. + floor(hf(s0) * 4.99), an = (atn(rel) + 3.1415927) * n / 6.2831853 + hf(s0 + 9u) * n;
  float si = floor(an), key = mod(si, n), fa = an - si;
  float j1 = hf(s0 * 31u + uint(key)) - .5, j2 = hf(s0 * 37u + uint(key) + 5u);
  float L0 = min(3.4 + 2.6 * clamp((a.z - .6) / 1.8, 0., 1.), 6.) * (1. - .08 * k);
  // the outline: lobes that meet between the limbs at half length (continuous from limb to limb), broken at two scales
  float pl = pow(sin(3.1415927 * fa), .7);
  float rag = textureLod(uN, P * .125 + vec2(k * .31, h * .07), lod).g, rg2 = textureLod(uN, P * .26 + vec2(k * .7, .1), lod + 1.).a;
  float Rc = L0 * (.42 + (.42 + .3 * j2) * pl) + (rag - .5) * 2.4 + (rg2 - .5) * .7;
  float x = dist / max(Rc, .5);
  // inside the outline, sprays with gaps between them (open near the trunk, close toward the rim), half cover at the rim
  float lace = textureLod(uN, P * .11 + vec2(hf(s0 + 3u), k * .19), lod).g + .35 * x - .2;
  float cv = smoothstep(1.06, .94, x) * smoothstep(.36, .52, lace) * mix(1., .55, smoothstep(.6, 1., x)) * step(r, dist);
  // the limb itself, crooked, where the sprays let it show
  float da = (fa - .5 - j1 * .3) * 6.2831853 / n;
  float u = dist * cos(da), w = dist * sin(da) + (.25 + .2 * j2) * sin(u * (.9 + .6 * j2) + j1 * 9.) * smoothstep(r, r + 1.5, u);
  float limb = (1. - smoothstep(.08, .17 + .04 * k, abs(w))) * step(r * .8, u) * smoothstep(Rc * .9, Rc * .6, u);
  return max(limb, cv);
}
#endif
vec4 bmT(vec2 u) { vec4 b = textureLod(uB, u, 0.); if (ENC < .99) { b.rgb = 2. * b.rgb - 1.; b.rgb = b.rgb / max(1. - abs(b.rgb), 1e-3) * ENC; } return b; }
void main() {
  vec2 qq = vUV * 2. - 1.;
  vec3 d = normalize(FW + (qq.x * RT + qq.y * UPV) * TANH), o = CAM;
  uvec4 K = texelFetch(uK, ivec2(gl_FragCoord.xy), 0);
  vec2 ka = unpackHalf2x16(K.x), kb = unpackHalf2x16(K.y), ke = unpackHalf2x16(K.z), kw = unpackHalf2x16(K.w);
  vec3 C0 = vec3(ka, kb.x), C1 = vec3(kb.y, ke);
  float t = kw.x, mat = kw.y;
  vec3 col;
  vec3 fr = fogRad(d) * AMBK;
  // the sky (fog under the canopy's gaps), also behind the far end of a trunk's trace (115 m, or above the canopy): a
  // trunk fades into it over the last stretch, so a far trunk seen from below has no end cap
  float wS = mat < .5 ? 1. : mat < 1.5 && d.y > .02 ? smoothstep(.6, 1., t / min(115., (HC + 15. - o.y) / d.y)) : 0.;
  vec3 sky = fr;
  if (wS > 0.) {
    float g = 1.;
    if (d.y > .02) { vec2 Q = o.xz + d.xz * (HC - o.y) / d.y; g = mix(.84, 1.07, gapF(Q) * hfog(Q)); }
    sky = fr * mix(1., g, smoothstep(.0, .5, d.y));
  }
  if (mat < .5) {
    col = sky;
  } else {
    vec3 p = o + d * t;
    vec2 Q = canQ(p);
    float sv = textureLod(uL, Q / PER, clamp(log2(t * .25) + 1., 2.2, 4.5)).r * hfog(Q);
    col = C0 * AMBK * uP[23].z + C1 * SUNC * SUNE * sv;
    if (mat > 1.5 && mat < 2.5) {
      vec2 x = p.xz;
      float cr = creekD(x);
      vec2 fl = vec2(.25, 1.) * TIME * .35;
      vec2 g1 = textureLod(uN, x * .7 - fl * .7, 0.).gb - .5, g2 = textureLod(uN, x * 2.3 + fl.yx * .5, 0.).ba - .5;
      vec3 n = normalize(vec3((g1 * .5 + g2 * .5) * .9, 1.).xzy);
      // the sun on the water: short streaks where it breaks over stones, not single specks
      float rf = smoothstep(.55, .8, textureLod(uN, x * vec2(.35, .9) - fl * .4, 0.).r);
      float sp = pow(max(dot(reflect(d, n), SUN), 0.), 70.) * rf;
      col += SUNC * SUNE * sv * sp * 3.;
    }
    float T = exp(-fogTau(o, d, t));
    col = col * T + fr * (1. - T);
    if (wS > 0.) col = mix(col, sky, wS);
  }
#ifdef CROWN
  // the tiers of limbs between 26 and 58 m: each a dark lace faded by the fog to its distance, none where the canopy
  // is open (the bright channels are where the shafts come down)
  if (d.y > .05) {
    float tz = mat < .5 ? 1e5 : t;
    for (int k = 3; k >= ZI; k--) {
      float h = 26. + 10.6 * float(k), tk = (h - o.y) / d.y;
      if (tk > tz) continue;
      vec2 P = o.xz + d.xz * tk;
      vec2 cf = P / CS; ivec2 c0 = ivec2(floor(cf)); vec2 fc = fract(cf) - .5;
      float lod = max(log2(tk * TANH / SZ * 2. * 256. * .26), 0.);
      float cv = 0.;
      for (int m = 0; m < 4 + ZI; m++) {
        // this cell's trunk, and a neighbour's when the point is within 3 m of that edge
        // this cell's trunk and the three on the nearer sides (a crown reaches at most 6 m out)
        ivec2 sx = ivec2(fc.x < 0. ? -1 : 1, fc.y < 0. ? -1 : 1);
        ivec2 cc = c0 + (m == 1 ? ivec2(sx.x, 0) : m == 2 ? ivec2(0, sx.y) : m == 3 ? sx : ivec2(0));
        cv = max(cv, crownC(P, h, float(k), cc, lod));
      }
      cv *= 1. - smoothstep(.25, .75, gapF(P + SUN.xz / SUN.y * (HC - h)));
      float T = exp(-.35 * fogTau(o, d, tk));
      vec3 cl = vec3(.012, .02, .012) * 1.5 * FOGC * AMBK * uP[23].z;
      col = mix(col, cl * T + fr * (1. - T), cv);
    }
  }
#endif
  // the shafts: a 3x3 gather over the half-size march, weighted by how near each tap's depth is to this pixel's (the
  // march's jitter is white noise, joined here; a trunk's edge keeps the shaft behind it off its face)
  {
    vec3 bs = vec3(0.); float ws = 0., tq = min(t, 95.);
    for (int i = 0; i < 9 + ZI; i++) {
      vec2 off = vec2(float(i % 3) - 1., float(i / 3) - 1.);
      vec4 b = bmT(vUV + off * 1.15 / (SZ * .5));
      float w = exp(-.5 * dot(off, off)) * (ENC < .99 ? 1. : exp(-6. * abs(log((b.a + .3) / (tq + .3)))));
      bs += b.rgb * w; ws += w;
    }
    col += bs / max(ws, 1e-4) / ENC;
  }
  // grade: a touch of warmth in the highlights, cool in the deep shade
  col *= mix(vec3(.96, .98, 1.03), vec3(1.04, 1., .93), smoothstep(.1, .8, dot(col, vec3(.33))));
  col *= 1. + WARM * vec3(.12, .03, -.1);
  col *= 1. - .1 * dot(qq * .75, qq * .75);
  // the light's own grade: a tint and a saturation
  col *= uP[18].rgb;
  col = max(mix(vec3(dot(col, vec3(.3, .5, .2))), col, uP[18].w), 0.);
  vec3 c = tmap(col);
  float g = hf(uint(gl_FragCoord.x) * 7919u + uint(gl_FragCoord.y) * 104729u) - .5;
  oC = vec4(c + g * .006, 1.);
}`;function pa(e,a,h){let r=Math.imul(e^2654435769,2246822507)^Math.imul(a+2135587861,3266489909)^Math.imul(h+374761393,668265263);return r^=r>>>15,r=Math.imul(r,739982445),r^=r>>>12,r=Math.imul(r,695872825),r^=r>>>15,(r>>>0)/4294967296}const Be=e=>e*e*e*(e*(e*6-15)+10);function ba(){const e=ot,a=new Uint8Array(e*e*4);for(let h=0;h<4;h++){const r=8<<h,S=new Float32Array(r*r),F=new Float32Array(r*r);for(let f=0;f<r*r;f++){const C=pa(f,h,560)*bt;S[f]=Math.cos(C),F[f]=Math.sin(C)}for(let f=0;f<e;f++){const C=(f+.5)/e*r,q=Math.floor(C),v=C-q,b=Be(v),E=q%r*r,w=(q+1)%r*r;for(let D=0;D<e;D++){const rt=(D+.5)/e*r,$=Math.floor(rt),G=rt-$,J=Be(G),U=$%r,st=($+1)%r,gt=S[E+U]*G+F[E+U]*v,Vt=S[E+st]*(G-1)+F[E+st]*v,Bt=S[w+U]*G+F[w+U]*(v-1),y=S[w+st]*(G-1)+F[w+st]*(v-1),tt=gt+(Vt-gt)*J,dt=tt+(Bt+(y-Bt)*J-tt)*b;a[(f*e+D)*4+h]=Y(Math.round((dt*.85+.5)*255),0,255)}}}return a}function me(e,a,h,r,S,F,f,C){const q=e.createTexture();e.bindTexture(e.TEXTURE_2D,q),e.texImage2D(e.TEXTURE_2D,0,r,a,h,0,S,F,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,C),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,C);const v=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,v),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:q,fb:v,w:a,h}}function ya(e){if(e.__c560)return e.__c560;const a=(v,b)=>{const E=e.createShader(v);return e.shaderSource(E,b),e.compileShader(E),E},h={tr:la,tk:da,lg:va,fn:ma,tw:ia,lm:ra,fd:ha,bm:xa,fin:ua},r={};for(const v in h){const b=e.createProgram(),E=a(e.VERTEX_SHADER,Kt+Pe),w=a(e.FRAGMENT_SHADER,Kt+qe+h[v]);e.attachShader(b,E),e.attachShader(b,w),e.linkProgram(b),r[v]={p:b,v:E,f:w}}e.flush();const S=ba(),F=e.createTexture();e.bindTexture(e.TEXTURE_2D,F),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,ot,ot,0,e.RGBA,e.UNSIGNED_BYTE,S),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const f=v=>{if(!r[v]){const[b,E]=v.split("|"),w=e.createProgram();e.attachShader(w,a(e.VERTEX_SHADER,Kt+Pe));const D=a(e.FRAGMENT_SHADER,Kt+"#define "+E+`
`+qe+h[b]);e.attachShader(w,D),e.linkProgram(w),r[v]={p:w,v:D,f:D}}if(!("uP"in r[v])){const{p:b,v:E,f:w}=r[v];if(!e.getProgramParameter(b,e.LINK_STATUS))throw new Error("560 "+v+": "+(e.getShaderInfoLog(E)||"")+(e.getShaderInfoLog(w)||"")+e.getProgramInfoLog(b));e.useProgram(b),["uN","uC","uL","uB","uK","uF"].forEach((D,rt)=>{const $=e.getUniformLocation(b,D);$&&e.uniform1i($,rt)}),r[v]={p:b,uP:e.getUniformLocation(b,"uP")}}return r[v]},C=e.createVertexArray(),q=me(e,St,St,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.REPEAT);return e.__c560={P:r,use:f,hf:null,tN:F,nd:S,vao:C,FD:q,fdOk:!1,rt:{},worlds:[]}}function Ft(e,a,h,r){const S=h*ot-.5,F=r*ot-.5,f=Math.floor(S),C=Math.floor(F),q=S-f,v=F-C,b=(E,w)=>e[((w%ot+ot)%ot*ot+(E%ot+ot)%ot)*4+a]/255;return(b(f,C)*(1-q)+b(f+1,C)*q)*(1-v)+(b(f,C+1)*(1-q)+b(f+1,C+1)*q)*v}Fe.add({num:560,name:"Redwood Grove",fam:"Vistas",recipe:"A coast redwood grove, mostly on a summer morning as the sea fog burns off, with trunks metres across, sword ferns, a mossy fallen giant and a creek. The light, the fog and the grove change every mint. Tap a sunbeam to swirl fog through it, drag to drift the fog so the beams sweep across the trunks, or hold to let the sun burn through (let go and the fog rolls back).",interactive:"Tap a sunbeam to send a swirl of fog through it: the shaft breaks into rays and reforms. Drag to drift the fog bank so the beams sweep across the trunks and ferns. Hold to let the sun burn through: the fog thins, the beams multiply and the light warms, then the fog rolls back in when you let go.",music:!0,gl:!0,fps:30,seed:0,make(e){const a=e.gl,h=e.size,r=ya(a),S=r.nd;let F=2654435769;for(let t=2;t<e.hash.length;t+=8)F=Math.imul(F^parseInt(e.hash.slice(t,t+8),16),2246822507)>>>0;const f=()=>{F=F+1831565813|0;let t=Math.imul(F^F>>>15,1|F);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},C=t=>{let o=0;for(const c in t)o+=t[c];let s=f()*o;for(const c in t)if(s-=t[c],s<0)return c;return Object.keys(t)[0]};let q=C({"Morning fog":50,"Thick fog":24,"Thin fog":18,"Sea fog pouring in":8}),v=C({"Scattered shafts":50,"Many shafts":22,"Few shafts":20,"One great shaft":8}),b=C({"Old growth":52,Giants:26,"Young and old":22}),E=C({"Sword ferns":46,"Sorrel carpet":30,"Needle duff":18,"Fern sea":6}),w=C({Creek:58,"Dry creek bed":20,"No creek":22}),D=C({"Goose pen":42,"Fire scar":36,Burls:22}),rt=C({"Mid-morning":52,Early:30,"Late morning":18}),$=625341585;for(let t=2;t<e.hash.length;t+=8)$=Math.imul($^parseInt(e.hash.slice(t,t+8),16),2654435761)>>>0;const G=()=>{$=$+1831565813|0;let t=Math.imul($^$>>>15,1|$);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let J="By the giant";{const t={"By the giant":60,"Behind a fallen giant":30,"Inside the goose pen":10};let o=0;for(const c in t)o+=t[c];let s=G()*o;for(const c in t)if(s-=t[c],s<0){J=c;break}}e.home&&(J="By the giant"),J==="Inside the goose pen"&&(D="Goose pen"),e.home&&(q="Morning fog",v="Scattered shafts",b="Old growth",E="Sword ferns",w="Creek",D="Goose pen",rt="Mid-morning");let U=J==="By the giant"?0:J==="Behind a fallen giant"?1:3,st=2135587861;for(let t=2;t<e.hash.length;t+=8)st=Math.imul(st^parseInt(e.hash.slice(t,t+8),16),3266489909)>>>0;const gt=()=>{st=st+1831565813|0;let t=Math.imul(st^st>>>15,1|st);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Vt=t=>{let o=0;for(const c in t)o+=t[c];let s=gt()*o;for(const c in t)if(s-=t[c],s<0)return c;return Object.keys(t)[0]};let Bt=Vt({"Fog burning off":40,"Grey fog, no sun":13,"Low gold sun":12,"Into the sun":11,"Clear after the fog":10,"After rain":8,"Blue dusk":0,"Moon through fog":2}),y=0;if(U===0&&gt()<.5){const t=Vt({"Low in the ferns":30,"On the log":25,"Close on the bark":25,"In the creek":20});y=t==="Low in the ferns"?1:t==="On the log"?2:t==="Close on the bark"?3:w==="No creek"?1:4,J=["","Low in the ferns","On the log","Close on the bark",w==="Dry creek bed"?"In the dry creek bed":"In the creek"][y]}const tt=gt(),dt=gt()-.5;e.home&&(Bt="Fog burning off",y=0,J="By the giant");let Lt=461845907;for(let t=2;t<e.hash.length;t+=8)Lt=Math.imul(Lt^parseInt(e.hash.slice(t,t+8),16),668265263)>>>0;const nt=()=>{Lt=Lt+1831565813|0;let t=Math.imul(Lt^Lt>>>15,1|Lt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let T=0;{const t=e.home?1:nt(),o=nt(),s=U===0&&y===0;(s||U===1)&&t<.5?T=o<.83||w==="No creek"?2:4:s&&w!=="No creek"&&t<.65&&(T=4),T===4&&(U=0,y=4,T=0,J=w==="Dry creek bed"?"In the dry creek bed":"In the creek"),T&&(U=0,y=0,J=T===1?"Up the trunks":"In a windfall gap")}const ga=nt()<.5,wa=nt()<.5,xe=nt(),R=[nt(),nt(),nt(),nt(),nt(),nt(),nt()],ue=y===4;e.home&&(T=0);const k=["Fog burning off","Grey fog, no sun","Low gold sun","Into the sun","Clear after the fog","After rain","Blue dusk","Moon through fog"].indexOf(Bt),De=q,_e=v,Ra=rt;(k===1||k===6)&&(v="No shafts"),k===3&&v==="Few shafts"&&(v="Scattered shafts"),k===4&&(q="Burnt off"),k===2&&(rt="Early"),k===6&&(rt="Dusk"),k===7&&(rt="Night"),e.trait("Light",Bt),e.trait("Fog",q),e.trait("Shafts",v),e.trait("Grove",b),e.trait("Floor",E),e.trait("Water",w),e.trait("Near giant",D),e.trait("Hour",rt),e.trait("Standpoint",J);const vt=new Float32Array(Le*4),z=(t,o,s,c,n)=>{vt[t*4]=o,vt[t*4+1]=s,vt[t*4+2]=c,vt[t*4+3]=n};let A=e.home?0:(f()-.5)*.5,Et=.07+f()*.05*(e.home?0:1);const L=5,N=1;let Ht=1.62;const j=(t,o)=>[L+Math.sin(A)*t+Math.cos(A)*o,N+Math.cos(A)*t-Math.sin(A)*o],Dt={Early:[.72,[1,.7,.45],.88],"Mid-morning":[.9,[1,.8,.56],1],"Late morning":[1.08,[1,.88,.7],1.08]}[Ra];let mt=Dt[0],Pt=A+.78+(e.home?0:(f()-.5)*.5);const wt=[{sc:Dt[1],se:1,bk:1,fc:[.255,.222,.16],sg:1,hf:0,ak:1,ex:1.05,tn:[1,1,1],sat:1},{sc:[.9,.92,.9],se:.05,bk:.06,fc:[.215,.222,.21],sg:1.05,hf:.1,ak:1.25,sa:.75,ex:1.3,tn:[1,1,1],sat:.85},{sc:[1,.58,.28],se:1.4,bk:1.3,fc:[.16,.155,.15],sg:.8,hf:-.08,ak:.8,ex:1.12,tn:[1.02,1,.96],sat:1.05},{sc:[1,.85,.6],se:1,bk:1.25,fc:[.27,.24,.185],sg:.6,hf:-.1,ak:.5,ex:1,tn:[1.02,1,.95],sat:1},{sc:[1,.92,.8],se:1.35,bk:.5,fc:[.14,.175,.19],sg:.2,hf:-.3,ak:.95,ex:1.12,tn:[.98,1.02,1],sat:1.15},{sc:[1,.88,.7],se:1.1,bk:.7,fc:[.15,.19,.145],sg:.5,hf:-.12,ak:.95,ex:1.08,tn:[.97,1.03,.96],sat:1.15},{sc:[.5,.6,.9],se:0,bk:0,fc:[.08,.092,.125],sg:1,hf:.1,ak:1,sa:.45,ex:1.6,tn:[1,1,1.03],sat:.75},{sc:[.55,.66,.92],se:.2,bk:.32,fc:[.032,.042,.066],sg:1,hf:-.04,ak:1,sa:.7,ex:1.7,tn:[.92,.98,1.1],sat:.45}][k];k===2&&(mt=.35+tt*.07,Pt=A+(dt<0?-1:1)*(1.25+Math.abs(dt)*.7)),k===3&&(mt=.5+tt*.12,Pt=A+dt*.5),(k===4||k===5)&&(mt+=.08),k===7&&(mt=.75+tt*.2),k===6&&(mt=.14,Pt=A+dt*.9),wa&&!e.home&&(Pt=2*A-Pt),T===2&&k!==1&&k!==6&&k!==7&&(mt=Math.max(mt,.82+tt*.12)),T===1&&(Et=1.02+R[0]*.18);const Zt=ga&&!e.home,Gt=(t,o)=>{if(!Zt)return[t,o];const s=(t-L)*Math.cos(A)-(o-N)*Math.sin(A);return[t-2*s*Math.cos(A),o+2*s*Math.sin(A)]},X=[Math.sin(Pt)*Math.cos(mt),Math.sin(mt),Math.cos(Pt)*Math.cos(mt)],Qt=w!=="No creek"?1:0,Ie=w==="Dry creek bed"?1:0;let Tt=.9+f()*.5;const pe=ue?1.2+R[1]*.4:.64,He=-pe+.24;ue&&(Tt=1.1+R[2]*.5);let qt=e.home?8:8+f()*3;const $t=e.home?.628:f()*bt,Yt=e.home?-.626:f()*bt;if(Zt&&(qt=2*L-qt),y===4){const t=bt/g;qt=L-2.2*Math.sin(N*t*3+$t)-1.1*Math.sin(N*t*7+Yt)+dt*.4}const be=(t,o)=>{const s=bt/g,c=qt+2.2*Math.sin(o*s*3+$t)+1.1*Math.sin(o*s*7+Yt);let n=t-c;return n-=g*Math.floor(n/g+.5),n};y===1&&Math.abs(be(L,N+3))<4.5&&(qt+=9);const ye=(t,o)=>{const s=t/g,c=o/g;let n=(Ft(S,0,s*4,c*4)-.5)*.6+(Ft(S,1,s*24,c*24)-.5)*.06+(Ft(S,2,s*9,c*9)-.5)*.12;if(Qt){const i=Math.abs(be(t,o)),d=1-Y((i-Tt*.45)/(Tt+1.5-Tt*.45),0,1),u=d*d*(3-2*d);n=n+(-pe+.05*n-n)*u}return n};let W=e.home?3.1:2.8+f()*1.5,O=e.home?11.4:11+f()*2,et=e.home?11.2:10+f()*3,at=e.home?17:13+f()*6,xt=e.home?.8:.65+f()*.3;if(U===1){xt=.72+G()*.16;const t=j(2.5+G()*.7,-2.4-G()*.8),o=j(13+G()*4,4.5+G()*3);W=t[0],O=t[1],et=o[0],at=o[1]}if(y===2){xt=.85+tt*.2;const t=j(-2.5,.15),o=j(15+tt*4,1.2+dt*2.4);W=t[0],O=t[1],et=o[0],at=o[1]}const Ge=(t,o,s,c)=>{const n=j(t,o),i=A+s;W=n[0],O=n[1],et=n[0]+Math.sin(i)*c,at=n[1]+Math.cos(i)*c},ge=R[3]<.5?-1:1;let jt=0,we=12;if(T===2)xt=1.05+R[1]*.25,Ge(10+R[2],-4.6-R[2],.55+R[4]*.3,62);else if(T===1||U!==1&&y!==2&&!e.home&&xe>=.5&&xe<.8)Ge(1.2+R[2],ge*(2.2+R[4]*.5+xt),-ge*(.2+R[4]*.14),46);else if(U!==1&&y!==2&&!e.home&&xe>=.8){const t=j(-3.5,-6),o=j(-5,9);W=t[0],O=t[1],et=o[0],at=o[1]}else{const t=et-W,o=at-O,s=Math.hypot(t,o),c=e.home?0:Math.max(42-s,0);we=s,jt=U===1||y===2||e.home?0:2.2,et+=t/s*c,at+=o/s*c,W-=t/s*jt,O-=o/s*jt}{const t=Gt(W,O),o=Gt(et,at);W=t[0],O=t[1],et=o[0],at=o[1]}const Re=ye(W,O)+xt-.25,je=ye(et,at)+xt-.1,Xe=(t,o)=>{const s=et-W,c=at-O,n=s*s+c*c,i=Y(((t-W)*s+(o-O)*c)/n,0,1);return Math.hypot(t-W-s*i,o-O-c*i)},Jt={"Old growth":[.7,.45,2.1],Giants:[.55,.9,2.4],"Young and old":[.85,.3,1.5]}[b],lt=new Float32Array(ft*ft*8),K=[{x:e.home?.4:f()*1.2,z:e.home?8.2:7.6+f()*1.5,r:e.home?2.1:1.8+f()*.5,f:D==="Goose pen"?2:D==="Fire scar"?1:0,burl:D==="Burls"?1.3:.3},{x:e.home?2:1+f()*6,z:e.home?23:21.5+f()*6,r:e.home?2.3:1.9+f()*.7,f:f()<.5?1:0,burl:D==="Burls"?1.2:.2}];if(U===1){const t=K[0];t.x=.8+G()*1.6,t.z=14.4+G()*2,t.r=2.1+G()*.4}if(y===2){const t=K[0],o=j(8+tt*2,-5.2-t.r*.4);t.x=o[0],t.z=o[1]}if(y===3){const t=K[0];t.r=2+tt*.5;const o=j(2.2+t.r*1.05,-1.1-t.r*.75);t.x=o[0],t.z=o[1]}if(U===3){const t=K[0];t.r=2.35+G()*.3,t.x=L-Math.sin(A)*.45,t.z=N-Math.cos(A)*.45,t.f=2}if(T===1){const t=K[0],o=K[1];t.r=2+tt*.5;const s=j(1.2+t.r*.5,-2.3-R[1]*.7-t.r);t.x=s[0],t.z=s[1],o.r=1.2+R[2]*.8;const c=j(3+R[4]*2,6+R[0]*3+o.r*.5);o.x=c[0],o.z=c[1]}const te=j(15+R[0]*4,0),ke=11+R[2]*4;if(T===2){const t=j(15+R[0]*4+ke+2,-ge*6);K[1].x=t[0],K[1].z=t[1]}for(const t of K){const o=Gt(t.x,t.z);t.x=o[0],t.z=o[1]}for(const t of K)t.x-=g*Math.floor(t.x/g),t.z-=g*Math.floor(t.z/g),t.ci=Math.floor(t.x/ht),t.cj=Math.floor(t.z/ht);const ze=[];for(let t=0;t<ft;t++)for(let o=0;o<ft;o++){const s=(t*ft+o)*8;let c=f()<Jt[0],n=Jt[1]<.5?.45+Jt[2]*Math.pow(f(),1.6):.9+Jt[2]*Math.pow(f(),1.1);b==="Young and old"&&f()<.55&&(n=.3+f()*.45);const i=n*1.6+.6;let d=i+f()*Math.max(ht-2*i,0),u=i+f()*Math.max(ht-2*i,0);const x=f(),p=.3+f()*.3,m=f()*bt;let P=n>1.3&&f()<.3?1:0,Z=f()<.35?.4+f()*.6:0;const Q=o===K[0].ci&&t===K[0].cj?0:o===K[1].ci&&t===K[1].cj?1:-1;if(Q>=0){const At=K[Q];c=!0,n=At.r,d=At.x-o*ht,u=At.z-t*ht,P=At.f,Z=At.burl}const B=o*ht+d,H=t*ht+u,pt=n*(1+p);Q<0&&((Math.hypot(B-L,H-N)<pt+2.4||Math.hypot(B-L-g,H-N)<pt+2.4||Math.hypot(B-L,H-N-g)<pt+2.4)&&(c=!1),Qt&&Math.abs(be(B,H))<pt+Tt+.6&&(c=!1),Xe(B,H)<pt+xt+.4&&(c=!1),T===2&&Math.hypot(B-te[0],H-te[1])<ke+pt&&(c=!1));let _t=Math.atan2(N-H,L-B)+(f()-.5)*.5;Q===1&&(_t=Math.atan2(N-H,L-B)+.15),Q===0&&(_t=U===3?Math.atan2(Math.cos(A),Math.sin(A)):Math.atan2(N-H,L-B)+(Zt?-.38:.38)),P===0&&(_t=m),lt[s]=d,lt[s+1]=u,lt[s+2]=c?n:0,lt[s+3]=x,lt[s+4]=p,lt[s+5]=P,lt[s+6]=_t,lt[s+7]=Z,c&&ze.push([B,H,n,s,Q])}let Ce=e.home?.62:.35+f()*.4;const ka=(f()-.5)*.3+(f()-.5)*.3,Ee=[jt+we*Ce-1.2-Ce*1.5,jt+we*Ce+1.4,ka],Ut=T===1?[.6,1]:[1,1];{const t={"Morning fog":[.068,.52],"Thick fog":[.095,.6],"Thin fog":[.045,.44],"Sea fog pouring in":[.08,.56]}[De];Ut[0]*=t[0],Ut[1]=t[1]}const We=Math.max({"Scattered shafts":.5,"Many shafts":.85,"Few shafts":.18,"One great shaft":.1}[_e],k===3?.62:0),ee=_e==="One great shaft",Te=Math.hypot(X[0],X[2]),Oe=X[0]/Te,Ke=X[2]/Te,za=62*Te/X[1],Ve=(t,o,s)=>{let c=99;for(const n of ze)for(let i=-1;i<=1;i++)for(let d=-1;d<=1;d++){const u=n[0]+i*g-t,x=n[1]+d*g-o,p=Y(u*Oe+x*Ke,0,za),m=Math.hypot(u-Oe*p,x-Ke*p)-n[2]*1.3;s&&n[4]<0&&m<(T===2?ke*.7:1)?(lt[n[3]+2]=0,n[2]=0):(n[4]>=0||!s)&&(c=Math.min(c,n[4]>=0?m:m+2))}return c},ae=A+(ee?-.3:.08+(f()-.5)*.2),oe=ee?12:8.5+f()*2;let se=L+Math.sin(ae)*oe,ne=N+Math.cos(ae)*oe,Ze=-1e9;for(let t=-2;t<=7;t+=1)for(let o=-.36;o<=.37;o+=.06){const s=L+Math.sin(ae+o)*(oe+t),c=N+Math.cos(ae+o)*(oe+t),n=Math.min(Ve(s,c,!1),ee?3:1.5)-Math.abs(o)*2.5-Math.abs(t)*.12-(Xe(s,c)<xt?1:0);n>Ze&&(Ze=n,se=s,ne=c)}T===2&&(se=te[0],ne=te[1]),Ve(se,ne,!0);const Rt=[se+X[0]/X[1]*62,ne+X[2]/X[1]*62,T===2?12+R[4]*3:ee?7:2.4],Ca=Math.max({"Sword ferns":.8,"Sorrel carpet":.3,"Needle duff":.16,"Fern sea":.95}[E],y===1?.75:T===2?.9:0),Ea=T===2?1:{"Sword ferns":.55,"Sorrel carpet":1,"Needle duff":.12,"Fern sea":.4}[E],ce=62;z(4,X[0],X[1],X[2],4.2*Dt[2]*wt.se),z(5,wt.sc[0],wt.sc[1],wt.sc[2],ce),z(6,wt.fc[0],wt.fc[1],wt.fc[2],Ut[0]*wt.sg),z(9,Ut[1],We,Ca,Ea),z(10,ht,ft,g,Qt),z(11,W,Re,O,xt),z(12,et,je,at,He),z(13,Ee[0],Ee[1],Ee[2],0),z(17,0,0,0,yt),z(19,qt,$t,Yt,Tt),z(20,Rt[0],Rt[1],Rt[2],0);const Qe=(t,o)=>[(Math.floor(t/yt)+.5)*yt,(Math.floor(o/yt)+.5)*yt];let kt=Qe(L-1.6+Math.sin(A)*2.6,N+2.6),ut=Qe(L+2.3+Math.sin(A)*3.3,N+3.3);if(y===1&&(kt=j(1.75,-.75-dt*.4),ut=j(2.5,1.05-dt*.4),Math.floor(kt[0]/yt)===Math.floor(ut[0]/yt)&&Math.floor(kt[1]/yt)===Math.floor(ut[1]/yt)&&(ut=j(3.6,1.3))),ue){const t=N+3.2,o=N+4.4,s=bt/g,c=n=>qt+2.2*Math.sin(n*s*3+$t)+1.1*Math.sin(n*s*7+Yt);kt=[c(t)-Tt-2.1,t],ut=[c(o)+Tt+2.1,o]}else y!==1&&(kt=Gt(kt[0],kt[1]),ut=Gt(ut[0],ut[1]));z(21,kt[0],kt[1],ut[0],ut[1]),z(22,L,N,pe,Ie);let _=null;const $e=()=>{if(_=r.worlds.find(t=>t.hash===e.hash),!_&&r.worlds.length>=12&&(_=r.worlds.reduce((t,o)=>(o.use||0)<(t.use||0)?o:t),_.hash=e.hash,_.baked=!1,a.bindTexture(a.TEXTURE_2D,_.tC),a.texSubImage2D(a.TEXTURE_2D,0,0,0,ft*2,ft,a.RGBA,a.FLOAT,lt)),!_){const t=a.createTexture();a.bindTexture(a.TEXTURE_2D,t),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32F,ft*2,ft,0,a.RGBA,a.FLOAT,lt);const o=me(a,Ot,Ot,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR,a.REPEAT);_={hash:e.hash,tC:t,L:o,baked:!1},r.worlds.push(_)}_.use=r.n=(r.n||0)+1};$e(),r.hf===null&&(r.hf=!!a.getExtension("EXT_color_buffer_float")||!!a.getExtension("EXT_color_buffer_half_float"));const Me=r.hf,fe=Math.ceil(h/2);if(!r.rt[h]){const t=a.createTexture();a.bindTexture(a.TEXTURE_2D,t),a.texImage2D(a.TEXTURE_2D,0,a.RGBA32UI,h,h,0,a.RGBA_INTEGER,a.UNSIGNED_INT,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);const o=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,o),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t,0);const s=a.createRenderbuffer();a.bindRenderbuffer(a.RENDERBUFFER,s),a.renderbufferStorage(a.RENDERBUFFER,a.DEPTH_COMPONENT32F,h,h),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,s),a.bindRenderbuffer(a.RENDERBUFFER,null),a.bindFramebuffer(a.FRAMEBUFFER,null);const c=Me?a.RGBA16F:a.RGB10_A2,n=Me?a.HALF_FLOAT:a.UNSIGNED_INT_2_10_10_10_REV;r.rt[h]={K:{tex:t,fb:o},B:me(a,fe,fe,c,a.RGBA,n,a.LINEAR,a.CLAMP_TO_EDGE),kOwner:null,kKey:new Float64Array(9)}}const ct=r.rt[h],Ta=Me?1:.5;if(y===1&&(Ht=ye(L,N)+.5+tt*.15,Et+=.06),y===2){const t=Y(((L-W)*(et-W)+(N-O)*(at-O))/((et-W)**2+(at-O)**2),0,1);Ht=Re+(je-Re)*t+xt*1.1+1.55,Et-=.2}y===3&&(Et+=.12),y===4&&(Ht=He+.9,Et-=.06),!e.home&&y===0&&T===0&&U!==3&&(R[5]<.36?Et+=.14+R[6]*.16:U===0&&R[5]>.72&&(E==="Sword ferns"||E==="Fern sea")&&(Et-=.4+R[6]*.08));const Ye=Math.tan((T===1?36+R[3]*4:y===3?26:y===1?36:33)*Math.PI/180),Ne=T===1?(Zt?-1:1)*(.32+R[4]*.12):0,Je=Math.cos(Ne),ta=Math.sin(Ne),l={x:L,y:Ht,z:N,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},ea=()=>{const t=e.view||fa;l.x=L+Y(t.x||0,-1.5,1.5),l.z=N+Y(t.z||0,-1.5,1.5),l.y=Ht+Y(t.y||0,-.8,1.2);const o=A+(t.yaw||0),s=Y(Et+(t.pitch||0),-1.35,1.35),c=Math.cos(s);l.fw[0]=Math.sin(o)*c,l.fw[1]=Math.sin(s),l.fw[2]=Math.cos(o)*c,l.rt[0]=Math.cos(o),l.rt[1]=0,l.rt[2]=-Math.sin(o);const n=l.fw,i=l.rt;if(l.up[0]=n[1]*i[2]-n[2]*i[1],l.up[1]=n[2]*i[0]-n[0]*i[2],l.up[2]=n[0]*i[1]-n[1]*i[0],Ne)for(let d=0;d<3;d++){const u=i[d],x=l.up[d];i[d]=u*Je+x*ta,l.up[d]=x*Je-u*ta}};ea();let aa=0,Xt=0,Ae=!1,Wt=De==="Sea fog pouring in"?1:0;const Mt=[f()*200,f()*200],re=[f()*300,f()*300];for(let t=0;t<24;t++){const o=(Rt[0]+Mt[0]+4.4)/g*1.5,s=(Rt[1]+Mt[1]+2)/g*1.5;if(Ft(S,0,o,s)*.7+Ft(S,1,o+.37,s+.37)*.3>Ut[1]+.07)break;Mt[0]=f()*200,Mt[1]=f()*200}const I={x:0,z:0,tx:0,tz:0},Nt=[];let M=null,le=2.5+f()*5,ie=6+f()*8;const Ma=(t,o)=>{const s=t/g,c=o/g,n=Ft(S,1,s*1.6,c*1.6)*.6+Ft(S,2,s*2.5,c*2.5)*.4,i=.655+(.575-.655)*We;let d=t-Rt[0],u=o-Rt[1];d-=g*Math.round(d/g),u-=g*Math.round(u/g);const x=Y((Rt[2]-(Math.hypot(d,u*.8)+(n-.5)*7))/(Rt[2]*.55),0,1);return Math.max(Y((n-i)/.05,0,1),x)},oa=(t,o)=>{const s=t*2-1,c=1-o*2,n=[0,0,0];for(let m=0;m<3;m++)n[m]=l.fw[m]+(s*l.rt[m]+c*l.up[m])*Ye;const i=Math.hypot(n[0],n[1],n[2]);n[0]/=i,n[1]/=i,n[2]/=i;let d=n[1]<-.01?(0-l.y)/n[1]:40;for(const m of ze)for(let P=-1;P<=1;P++)for(let Z=-1;Z<=1;Z++){const Q=l.x-m[0]-P*g,B=l.z-m[1]-Z*g,H=n[0]*n[0]+n[2]*n[2],pt=Q*n[0]+B*n[2],_t=Q*Q+B*B-m[2]*m[2]*1.2,At=pt*pt-H*_t;if(At>0&&H>1e-6){const Se=(-pt-Math.sqrt(At))/H;Se>0&&Se<d&&(d=Se)}}d=Math.min(d,30);let u=-1,x=Y(d*.6,2,16);for(let m=0;m<28;m++){const P=1.8+(d-1.8)*(m+.5)/28,Z=l.x+n[0]*P,Q=l.y+n[1]*P,B=l.z+n[2]*P,H=Ma(Z+X[0]/X[1]*(ce-Q),B+X[2]/X[1]*(ce-Q))/(1+P*.04);H>u+.05&&(u=H,x=P)}const p=[l.x+n[0]*x,l.y+n[1]*x,l.z+n[2]*x];Nt.length>=3&&Nt.shift(),Nt.push({p,age:0,amp:1}),e.sound.hit("noise",.32,{cutoff:420,dur:1.6}),e.sound.hit("noise",.16,{cutoff:1400,dur:.7,at:.15})},Na=t=>{const o=e.input,s=o.taps();for(const c of s)M?o.down||oa(c.x,c.y):M={x:c.x,y:c.y,lx:c.x,ly:c.y,t:0,moved:!1,held:!1};if(M)if(M.t+=t,o.down){const c=o.x-M.x,n=o.y-M.y;if(!M.moved&&!M.held&&Math.hypot(c,n)>.035&&(M.moved=!0,e.sound.hit("noise",.2,{cutoff:260,dur:2.2})),M.moved){const i=o.x-M.lx,d=o.y-M.ly,u=Math.hypot(l.fw[0],l.fw[2])||1;I.tx+=(i*l.rt[0]-d*l.fw[0]/u)*60,I.tz+=(i*l.rt[2]-d*l.fw[2]/u)*60;const x=Math.hypot(I.tx,I.tz);x>14&&(I.tx*=14/x,I.tz*=14/x)}!M.moved&&!M.held&&M.t>.4&&(M.held=!0,e.sound.hit("noise",.14,{cutoff:600,dur:3})),Ae=M.held,M.lx=o.x,M.ly=o.y}else!M.moved&&!M.held&&oa(M.x,M.y),M=null,Ae=!1};let he=null,de=null;const Aa=()=>{he=new Float32Array(Math.floor(22050*.9));let o=12345;const s=()=>(o=Math.imul(o,1103515245)+12345|0,(o>>>8&65535)/32768-1);for(let i=0;i<3;i++){const d=i*.26,u=.15;for(let x=0;x<u*22050;x++){const p=x/22050,m=Math.sin(Math.PI*p/u)**.6,P=2100-900*p/u,Z=bt*P*p;he[Math.floor((d+p)*22050)]+=m*.5*(Math.sin(Z)*.5+Math.sin(Z*2.02)*.3+s()*.45)*(1-i*.1)}}de=new Float32Array(Math.floor(22050*3.4));let c=.02,n=0;for(;c<3.2;){const i=s(),d=4+Math.floor((s()+1)*5),u=4200+s()*1800,x=.028+(s()+1)*.018;for(let p=0;p<d&&c<3.3;p++){const m=u+(i>0?1:-1)*p*90+s()*300;for(let P=0;P<x*22050;P++){const Z=P/(x*22050),Q=m*(1+.25*(i>.3?Z:-Z));n+=bt*Q/22050;const B=Math.floor(c*22050)+P;B<de.length&&(de[B]+=Math.sin(n)*Math.sin(Math.PI*Z)*.45)}c+=x*(1.05+(s()+1)*.2)}c+=.015+(s()+1)*.03}},sa=t=>{he||Aa(),t==="jay"?e.sound.pcm(he,22050,{vel:.2,pan:.5}):e.sound.pcm(de,22050,{vel:.13,pan:-.3})},Sa=t=>{aa+=t,I.x+=(I.tx-I.x)*Math.min(1,t*1.5),I.z+=(I.tz-I.z)*Math.min(1,t*1.5);const o=Math.exp(-t/2.5);I.tx*=o,I.tz*=o,Mt[0]+=(1.1+Wt*1.6+I.x)*t,Mt[1]+=(.5+Wt*1.2+I.z)*t,re[0]+=(.35+Wt*.9+I.x*.6)*t,re[1]+=(.22+Wt*.7+I.z*.6)*t,Xt+=Ae?(1-Xt)*Math.min(1,t*.11):-Xt*Math.min(1,t*.045);for(const s of Nt)s.age+=t,s.amp=Math.min(1,s.age*3)*Math.exp(-Math.max(s.age-.5,0)/2.2);for(;Nt.length&&Nt[0].age>9;)Nt.shift();le-=t,ie-=t*(1+Xt*3),le<0&&(sa("jay"),le=11+f()*26),ie<0&&(sa("wren"),ie=9+f()*30)},it=new Float64Array(9),na={},V=(t,o)=>{a.activeTexture(a.TEXTURE0+t),a.bindTexture(a.TEXTURE_2D,o)},zt=(t,o,s,c)=>{const n=r.use(t);return a.bindFramebuffer(a.FRAMEBUFFER,o),a.viewport(0,0,s,c),a.useProgram(n.p),vt[1*4+3]=s,a.uniform4fv(n.uP,vt),n},ca=()=>{_.hash!==e.hash&&$e(),_.use=r.n=r.n+1,ea();const t=Xt;z(0,l.x,l.y,l.z,Ye),z(1,l.fw[0],l.fw[1],l.fw[2],h),z(2,l.rt[0],l.rt[1],l.rt[2],aa%600),z(3,l.up[0],l.up[1],l.up[2],0);const o=wt,s=k===4?1+3.5*t:1-.55*t,c=k===1?1+14*t:k===4?1-.3*t:1+.5*t,n=k===1?o.bk+.9*t:k===4?o.bk+1.2*t:o.bk*(1+.5*t),i=k>=6?0:t,d=[o.fc[0]+.02*i,o.fc[1]+.008*i,o.fc[2]-.015*i],u=(1+.3*i)*Dt[2]*o.ak;z(6,d[0],d[1],d[2],Ut[0]*s*o.sg),z(7,u,o.ex*(1+.1*i),(16+8*i)*Dt[2]*(1+Wt*.2)*n,Ta),vt[4*4+3]=4.2*Dt[2]*o.se*c,z(5,o.sc[0],o.sc[1]-.03*i,o.sc[2]-.1*i,ce),z(8,Mt[0],Mt[1],re[0],re[1]),vt[9*4]=Ut[1]+o.hf-(k===4?-.3:.38)*t,z(18,o.tn[0],o.tn[1],o.tn[2],o.sat);for(let p=0;p<3;p++){const m=Nt[p];m?(z(14+p,m.p[0],m.p[1],m.p[2],m.age),vt[17*4+p]=m.amp):(z(14+p,0,0,0,0),vt[17*4+p]=0)}z(23,h,t,o.sa||1,0),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.bindVertexArray(r.vao),V(0,r.tN),V(1,_.tC),V(2,_.L.tex),V(3,null),V(4,null),V(5,null),r.fdOk||(zt("fd",r.FD.fb,St,St),a.drawArrays(a.TRIANGLES,0,3),r.fdOk=!0,V(5,r.FD.tex),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.generateMipmap(a.TEXTURE_2D)),V(5,r.FD.tex),_.baked||(V(2,null),zt("lm",_.L.fb,Ot,Ot),a.drawArrays(a.TRIANGLES,0,3),_.baked=!0,V(2,_.L.tex),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),a.generateMipmap(a.TEXTURE_2D)),it[0]=l.x,it[1]=l.y,it[2]=l.z,it[3]=l.fw[0],it[4]=l.fw[1],it[5]=l.fw[2],it[6]=l.rt[0],it[7]=l.rt[2],it[8]=0;let x=ct.kOwner===na;for(let p=0;x&&p<9;p++)ct.kKey[p]!==it[p]&&(x=!1);x||(a.enable(a.DEPTH_TEST),a.depthMask(!0),a.depthFunc(a.ALWAYS),zt("tr",ct.K.fb,h,h),a.drawArrays(a.TRIANGLES,0,3),a.depthFunc(a.LESS),Qt&&!Ie&&(zt("tw",ct.K.fb,h,h),a.drawArrays(a.TRIANGLES,0,3)),zt("tk",ct.K.fb,h,h),a.drawArrays(a.TRIANGLES,0,3),zt("lg",ct.K.fb,h,h),a.drawArrays(a.TRIANGLES,0,3),zt("fn",ct.K.fb,h,h),a.drawArrays(a.TRIANGLES,0,3),a.disable(a.DEPTH_TEST),ct.kOwner=na,ct.kKey.set(it)),V(4,ct.K.tex),zt("bm",ct.B.fb,fe,fe),a.drawArrays(a.TRIANGLES,0,3),a.flush(),V(3,ct.B.tex),zt(T===1?"fin|CROWN":"fin",null,h,h),a.drawArrays(a.TRIANGLES,0,3),V(3,null),V(4,null),V(5,null),a.bindVertexArray(null)};le=3+gt()*12,ie=5+gt()*16,ca();let ve=0;return(t,o)=>{for(o=Y(o||1/30,0,.1),Na(o),ve=Math.min(ve+o,.3);ve>=1/30;)ve-=1/30,Sa(1/30);ca()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
