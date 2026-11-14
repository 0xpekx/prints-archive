// Night Dive: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/580.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Aa){Aa&&function(){"use strict";const co={yaw:0,pitch:0,x:0,y:0,z:0},fo=0,ct=Math.PI*2,qt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler2DShadow;
`,Gt=`
#ifndef BOT
#define BOT 0
#endif
#ifndef SND
#define SND 0
#endif
uniform vec4 uC[20];
uniform mat4 uVP, uLVP;
uniform sampler2D uN;
uniform sampler2DShadow uSh;
#define CAMP uC[0].xyz
#define TANF uC[0].w
#define CAMF uC[1].xyz
#define TIME uC[1].w
#define CAMR uC[2].xyz
#define PXW uC[2].w
#define CAMU uC[3].xyz
#define EXPO uC[3].w
#define TPOS uC[4].xyz
#define TPOW uC[4].w
#define TDIR uC[5].xyz
#define RES uC[5].w
#define SIGT uC[6].xyz
#define SURF uC[6].w
#define SIGS uC[7].xyz
#define GPH uC[7].w
#define TCOL uC[8].xyz
#define BIO uC[8].w
#define FLW uC[9]
#define FLW2 uC[10]
#define GP uC[11]
#define MF uC[12]
#define CH uC[13]
#define CH2 uC[14]
#define RF uC[15]
#define AMB uC[16]
#define MOON uC[17]
#define FRM uC[18]
#define BW uC[19]
float sq(float x) { return x * x; }
#if BOT > 0
// the bottom beside the meadow (2026-11-11): a patch round the standpoint, baked height and material (reef, maerl) or
// procedural ripples; uB[0] = patch centre xz, half size, radius cleared of meadow
uniform sampler2D uBH, uBM;
uniform vec4 uB[2];
float botM(vec2 p) { vec2 d = abs(p - uB[0].xy) / uB[0].z; return 1. - smoothstep(.8, .97, max(d.x, d.y)); }
#endif
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float fb3(vec2 p) { return n2(p) * .5 + n2(p * 2.03 + 17.1) * .3 + n2(p * 4.1 + 41.7) * .2; }
float field(vec2 p) {
  float f = fb3(p * MF.w + MF.xy) - MF.z + .35 * exp(-dot(p - vec2(1.4, -1.), p - vec2(1.4, -1.)) / 6.);
  vec2 d = p - CH.xy; float a = dot(d, CH.zw); float pd = abs(d.x * CH.w - d.y * CH.z);
  float w = CH2.x * (.75 + .5 * n2(p * .7 + 3.1));
#if BOT > 0
  f -= 3. * (1. - smoothstep(uB[0].w, uB[0].w + 1.8, length(p - uB[0].xy)));
#endif
  return f - CH2.y * exp(-sq(pd / w)) * smoothstep(-6., -3., a);
}
float meadow(vec2 p) { return smoothstep(-.04, .05, field(p)); }
float meadH(vec2 p) { return smoothstep(-.11, .1, field(p)); }
float reefD(vec2 p) { return dot(p, RF.xy) - CH2.z - 1.6 * (n2(p * .22 + RF.zz) - .5); }
float reefM(vec2 p) { return smoothstep(0., 1.6, reefD(p)); }
float gH(vec2 p) {
  float s = .09 * sin(p.x * .23 + GP.x) * sin(p.y * .19 + GP.y) + .05 * sin(p.x * .11 - p.y * .17 + GP.z);
  float rm = reefM(p);
  float m = meadH(p) * (1. - rm);
  float rock = rm * CH2.w * (.55 + .9 * fb3(p * .5 + 7.3)) + smoothstep(.3, 1., rm) * .35 * (n2(p * 1.7) - .5);
#if BOT == 1 || BOT == 3
  s += textureLod(uBH, (p - uB[0].xy) / (2. * uB[0].z) + .5, 0.).r;
#endif
  return s + GP.w * m * (.85 + .3 * n2(p * 1.3)) + rock;
}
vec2 flow(vec2 p, float t) {
  float ph = dot(p, FLW.xy) * FLW2.x;
  float s = sin(FLW.w * t - ph) + .3 * sin(2.13 * FLW.w * t - 1.9 * ph + 1.3) + .2 * sin(.37 * FLW.w * t + .4 * ph);
  vec2 tb = vec2(n2(p * .6 + vec2(t * .35, 3.)), n2(p * .6 + vec2(7., t * .31))) - .5;
  return FLW.xy * (FLW.z * s + .55) + tb * FLW2.y;
}
float beam(float ct) {
  float th = sqrt(max(2. - 2. * ct, 0.)) * (1. + (1. - ct) * .17) / BW.y;   // BW.y: the beam's width (pencil .26 .. flood 2.15)
  // a dive torch: a tight bright hotspot that rolls off softly (no rim), a narrow halo and a faint wide spill
  return exp(-sq(th / .15)) * 1.05 + .3 * exp(-sq(th / .3)) + .03 * exp(-sq(th / .5)) * (1. - smoothstep(.3, .78, th));
}
float shad(vec3 p) {
  vec4 q = uLVP * vec4(p, 1.);
  if (q.w <= .01) return 1.;
  q.xyz = q.xyz / q.w * .5 + .5;
  if (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1. || q.z > 1.) return 1.;
  return textureLod(uSh, vec3(q.xy, q.z - .0008), 0.);
}
// surfaces: four filtered taps, so a leaf's shadow has the soft edge a 5 cm reflector gives (no stair steps)
float shadS(vec3 p) {
  vec4 q = uLVP * vec4(p, 1.);
  if (q.w <= .01) return 1.;
  q.xyz = q.xyz / q.w * .5 + .5;
  if (q.x < 0. || q.y < 0. || q.x > 1. || q.y > 1. || q.z > 1.) return 1.;
  float s = 0.;
  for (int i = 0; i < 4; i++) { vec2 o = vec2((i & 1) == 0 ? -1.4 : 1.4, i < 2 ? -1.4 : 1.4) / 1024.; s += textureLod(uSh, vec3(q.xy + o, q.z - .0011), 0.); }
  return s * .25;
}
float gSpec = .06, gSh = 1.;
// the scene target: RGBA16F (colour, distance); on devices with no float render targets an RGBA8 fallback keeps the
// picture (sqrt-compressed colour, distance as d / (d + 4))
vec4 outC(vec3 c, float de) {
#ifdef ENC8
  return vec4(sqrt(c / (1. + c)), de / (de + 4.));
#else
  return vec4(c, de);
#endif
}
vec3 torchL(vec3 p, vec3 N, vec3 V, float de, vec3 alb, float rough, float trans) {
  vec3 Lv = TPOS - p; float dl = length(Lv); vec3 l = Lv / dl;
  // the surface response adds a soft spill (surfaces only, so the water stays black) and the mint's reach gain (BW.x)
  float ang = sqrt(max(2. + 2. * dot(l, TDIR), 0.));
  float sp = (beam(dot(-l, TDIR)) + .07 * exp(-sq(ang / (.5 * BW.y))) * (1. - smoothstep(.45 * BW.y, .66 * BW.y, ang))) * TPOW * BW.x;
  if (sp < 1e-4) return vec3(0.);
  vec3 att = exp(-SIGT * (dl + de)) / (dl * dl + .3);
  float sh = shadS(p + l * (.04 + .03 * dl));
#if BOT > 0 || SND > 0
  sh *= gSh;
#endif
  float nl = dot(N, l);
  vec3 dif = alb * max(nl, 0.) + alb * trans * max(-nl, 0.) * vec3(.85, 1., .45);
  vec3 H = normalize(l + V); float nh = max(dot(N, H), 0.); float a2 = sq(rough * rough);
  float spec = a2 / (3.14 * sq(nh * nh * (a2 - 1.) + 1.)) * gSpec * max(nl, 0.);
  return TCOL * sp * att * sh * (dif + spec);
}
vec3 ambL(vec3 p, vec3 N, float de, vec3 alb) {
  return alb * AMB.rgb * (.3 + .7 * max(N.y, 0.)) * exp(-SIGT * (max(SURF - p.y, 0.) + de));
}
`,Na=qt+Gt+`
layout(location = 0) in vec4 aA;
layout(location = 1) in vec4 aB;
uniform vec4 uG;
out vec3 vP; out vec3 vN; out vec4 vU; out float vL; out vec3 vW;
// the whole clump bends together: the surge at the clump's rhizome (base position), no per-leaf phase
vec2 leanAt(float si, vec2 td, vec2 F, float flut) {
#ifdef FOR
  // the algal forest (age 3 + kind + the stem's height): aB.y < 0 is a bush's stem, stiff, leaning as a whole with the
  // surge at its holdfast; the rest are its branches, rising from the stem's top into a round crown (Cystoseira) or long
  // and arching over (Sargassum), leaning with the stem, the tips flicking last
  if (aB.z > 2.5) {
    vec2 nd = vec2(-td.y, td.x);
    if (aB.y < 0.) return F * .25 + td * .03;
    bool sg = aB.z >= 4.;
    float sf = (sg ? .22 : .06) + .1 * fract(aB.w * 7.31), up = smoothstep(sf - .04, sf + .15, si);
    return td * (sg ? aB.y + 1.3 * si * si * up : aB.y * (1.1 - .3 * si) + .2 * si * si) + nd * (sg ? .2 : .4) * up * sin(si * 4.5 + aB.w * 31.)
      + F * (.25 + .3 * si * si) + .1 * FLW.z * sin(TIME * FLW.w * 1.7 + aB.w * 6. - si * 1.5) * si * si * nd;
  }
#endif
  if (aB.z > 1.5) return td * 9. + 3.6 * sin(si * (1.6 + 2.2 * aB.w) + aB.w * 20.) * vec2(-td.y, td.x);   // a shed leaf lying curled on the sand
  return td * (aB.y + .1 * si + .25 * aB.z * si * si) + F * (2.7 * pow(si, 1.25))
    + .035 * sin(TIME * 1.3 + si * 4. + flut) * vec2(-td.y, td.x);
}
void main() {
  int seg = gl_VertexID >> 1; float side = float(gl_VertexID & 1);
  float NS = uG.x; float s = float(seg) / NS;
  vec3 b = aA.xyz; float L = aA.w;
  vec2 td = vec2(cos(aB.x), sin(aB.x));
  vec2 F = flow(b.xz, TIME);
#ifdef FOR
  if (aB.z > 2.5 && aB.y >= 0.) { float st = fract(aB.z) * (.55 + .45 * fract(aB.w * 5.13)); b += vec3(F.x * .25 * st, st, F.y * .25 * st); }
#endif
  float flut = dot(b.xz, vec2(3.1, 2.3));
  vec3 p = b; float ds = L / NS;
  int ns = int(NS);
  float thM = aB.z > 1.5 ? 1.565 : 1.5;
#ifdef FOR
  if (aB.z > 2.5) thM = 2.2;
#endif
  for (int i = 0; i < ns; i++) {
    if (i >= seg) break;
    vec2 ln = leanAt((float(i) + .5) / NS, td, F, flut);
    float th = min(length(ln), thM); vec2 hd = ln / max(length(ln), 1e-4);
    p += vec3(hd.x * sin(th), cos(th), hd.y * sin(th)) * ds;
  }
  vec2 ln = leanAt(min(s, 1.), td, F, flut);
  float th = min(length(ln), thM); vec2 hd = ln / max(length(ln), 1e-4);
  vec3 d = vec3(hd.x * sin(th), cos(th), hd.y * sin(th));
  vec3 w0 = vec3(-hd.y, 0., hd.x);
  float tw = aB.z > 1.5 ? 0. : (aB.w - .5) * 2.4 * s + .3 * sin(aB.w * 40.) * s;
  vec3 w = w0 * cos(tw) + cross(d, w0) * sin(tw);
  // a flat ribbon about 1 cm wide with a blunt, worn end (no taper to a point)
  float wd = .0105 * (aB.z > 1.5 ? 1.25 : uG.y) * (s < .05 ? .8 : 1.) * (s > .99 ? .8 : 1.);
#ifdef FOR
  // a branch: a short thin stalk, then the brush, widest a third of the way up and rounded at the end (its branchlets
  // are cut in the fragment shader; seen from too far for that, it is drawn narrower); it turns about its length so the
  // crown shows faces every way. A stem: finger-thick, near black.
  if (aB.z > 2.5) {
    bool sg = aB.z >= 4.;
    float sf = (sg ? .22 : .06) + .1 * fract(aB.w * 7.31), u = clamp((s - sf) / (1. - sf), 0., 1.);
    float cw = (sg ? .022 : .046) * (.8 + .4 * fract(aB.w * 13.7));
    wd = max(.004 * (1. - .4 * u), cw * smoothstep(0., .25, u) * sqrt(max(1. - sq(max(u - .35, 0.) / .66), 0.)));
    if (aB.y < 0.) wd = sg ? .007 : .013;
    tw = (aB.w - .5) * 3.4 + (fract(aB.w * 3.7) - .5) * 4. * s;
    w = w0 * cos(tw) + cross(d, w0) * sin(tw);
  }
#endif
#ifndef SHADOW
  float dist = length(p - CAMP);
  wd = max(wd, PXW * dist * 1.1);
#endif
  vec3 pos = p + w * (side - .5) * wd;
  vP = pos; vN = normalize(cross(d, w)); vU = vec4(s, side, aB.z, aB.w); vL = L; vW = w;
#ifdef FOR
  if (aB.z > 2.5 && aB.y < 0.) vU.z = 2.75;
#endif
  gl_Position = uVP * vec4(pos, 1.);
}`,ho=qt+Gt+`
in vec3 vP; in vec3 vN; in vec4 vU; in float vL; in vec3 vW;
uniform vec4 uG;
out vec4 o;
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
  vec3 N = normalize(vN); if (dot(N, V) < 0.) N = -N;
#ifdef FOR
  if (vU.z > 2.5) {
    // a frond: the stalk near black and woody, the lower crown dark brown and furred, the crown olive-gold to amber with
    // the growing tips paler and glowing where the torch is behind them; matt, no wet sheen
    float s = vU.x, sd = vU.w, xw = vU.y - .5, sm = s * vL;
    bool sg = vU.z >= 4., stem = vU.z < 2.9;
    float sf = (sg ? .22 : .06) + .1 * fract(sd * 7.31), u = stem ? 0. : clamp((s - sf) / (1. - sf), 0., 1.);
    float cw = (sg ? .022 : .046) * (.8 + .4 * fract(sd * 13.7));
    float wdm = max(.004 * (1. - .4 * u), cw * smoothstep(0., .25, u) * sqrt(max(1. - sq(max(u - .35, 0.) / .66), 0.)));
    float ax = abs(xw) * wdm, fp = PXW * de;            // metres from the branch's axis; metres a pixel
    // the branchlets: short spines on both sides of the axis, slanted up, of uneven length (a bottle-brush); cut where a
    // spine is a few pixels long; further off only the outline is broken
    float k = sm / (sg ? .012 : .0095) + (xw < 0. ? .5 : 0.) - ax * (sg ? 25. : 55.), ki = floor(k);
    float ln = .5 + .5 * hf(uint(ki + 4000.) * 7919u + uint(sd * 65536.) + (xw < 0. ? 77u : 0u));
    float sp = fract(k), hw = wdm * .5 * ln;
    bool keep = stem || ax < .0022 || u < .02 || (ax < hw && sp < .6 * (1. - ax / max(hw, 1e-4)) + .1);
    if (fp < .0034 ? !keep : (!stem && u > .02 && abs(xw) > .2 + .18 * n2(vec2(sm * 70. + sd * 50., xw > 0. ? 3. : 9.)))) discard;
    N = normalize(N + normalize(vW) * xw * 1.8);       // the brush is round across
    vec3 cr = sg ? vec3(.3, .22, .075) : vec3(.34, .24, .065);
    cr *= .78 + .44 * n2(vec2(sm * 19. + sd * 40., xw * 1.5 + sd * 9.));
    vec3 alb = mix(vec3(.13, .08, .032), cr, smoothstep(.1, .45, u));
    alb = mix(vec3(.045, .028, .014) * (.7 + .6 * n2(vec2(sm * 90., sd * 30. + xw * 4.))), alb, smoothstep(.0, .06, u));
    alb = mix(alb, vec3(.46, .37, .15), smoothstep(.72, 1., u) * .75);
    gSpec = .03;
    float trn = mix(.3, 1.7, smoothstep(.3, 1., u)) * step(.02, u);
    vec3 c = torchL(vP, N, V, de, alb, .6, trn) + ambL(vP, N, de, alb);
    if (uG.w > 0.) c += vec3(.02, .3, .26) * smoothstep(.85, 1., u) * (.006 + .2 * pow(n2(vec2(TIME * .8 + sd * 37., sd * 91.)), 6.)) * exp(-SIGT * de);
    o = outC(c, de);
  } else {
#endif
  // the blade is slightly cupped across its width with thickened margins: the torch runs a bright line down one edge
  float xw = vU.y - .5;
  float nearL = 1. - smoothstep(1.5, 4., de);
  N = normalize(N + normalize(vW) * (xw * 1.1 + sign(xw) * .5 * smoothstep(.36, .5, abs(xw))) * nearL);
  float s = vU.x, age = vU.z, sd = vU.w;
  float sm = s * vL;                                   // metres along the leaf
  // three ages: the young inner leaves clean bright green, the middle ones olive, the old outer ones brown-green; the
  // season (uG.z: summer, spring, autumn) sets how clean they are
  float sea = uG.z, dead = step(1.5, age); age = min(age, 1.);
  vec3 alb = age < .5 ? mix(vec3(.11, .37, .06), vec3(.2, .31, .07), age * 2.) : mix(vec3(.2, .31, .07), vec3(.28, .23, .08), age * 2. - 1.);
  if (sea > 1.5) alb = mix(alb, vec3(.25, .2, .08), .3);
  // fouled tips: a brown fuzz of filamentous epiphytes over the last part of older leaves, then a dead brown end
  float tipZ = smoothstep(vL - .05 - (sea > .5 && sea < 1.5 ? .08 : .45) * age, vL, sm);
  if (tipZ > 0.) alb = mix(alb, vec3(.13, .095, .04) * (.7 + .6 * n2(vec2(sm * 90., vU.y * 3. + sd * 31.))), tipZ * (.3 + .7 * age));
  alb = mix(alb, vec3(.09, .06, .03), smoothstep(vL - .025, vL, sm) * age);
  // a pale crust of bryozoans and coralline algae in soft patches over the outer part of old leaves
  float epd = smoothstep(.35, .8, s) * age;
  if (epd > .05) {
    float ep = n2(vec2(sm * 38. + sd * 50., vU.y * 1.3 + sd * 13.)) * .7 + n2(vec2(sm * 140., vU.y * 4. + sd * 7.)) * .3;
    alb = mix(alb, mix(vec3(.6, .58, .52), vec3(.6, .4, .42), smoothstep(.4, .6, n2(vec2(sm * 11. + sd * 9., sd * 23.)))), smoothstep(.5, .75, ep) * epd * (sea > .5 && sea < 1.5 ? .15 : .85));
  }
  // the dead sheaths at the base of the shoot: brown fibre
  alb = mix(vec3(.12, .085, .04), alb, smoothstep(.03, .1, sm));
  // fine parallel veins and slow mottling along the leaf
  alb *= .92 + .08 * sin(vU.y * 44. + sd * 9.);
  alb *= .8 + .4 * n2(vec2(sm * 9. + sd * 31., sd * 57.));
  if (dead > .5) { alb = vec3(.21, .15, .08) * (.65 + .7 * n2(vec2(sm * 14. + sd * 31., sd * 17.))); alb = mix(alb, vec3(.42, .38, .32), smoothstep(.72, .8, n2(vec2(sm * 60., sd * 40.))) * .6); }
  float ao = dead > .5 ? 1. : .2 + .8 * smoothstep(0., .45, sm);
  // living blades are thin and glow yellow-green with the torch behind them; fouled, dead tips pass little light
  float trn = dead > .5 ? .15 : (2.1 - 1.2 * age) * (1. - .8 * tipZ);
  gSpec = .05 + .1 * nearL;                           // a waxy cuticle: sheen streaks along the cupped blade
  vec3 c = torchL(vP, N, V, de, alb * ao, .32, trn) + ambL(vP, N, de, alb) * ao;
  // a Noctiluca bloom: every leaf tip working in the surge is edged with blue-green light, in and out of the beam
  if (uG.w > 0. && dead < .5) c += vec3(.02, .3, .26) * smoothstep(vL - .06, vL, sm) * (.006 + .2 * pow(n2(vec2(TIME * .8 + sd * 37., sd * 91.)), 6.)) * exp(-SIGT * de);
  o = outC(c, de);
#ifdef FOR
  }
#endif
}`,Fa=qt+Gt+`
layout(location = 0) in vec2 aP;
uniform vec4 uO;
out vec3 vP; out vec3 vN;
uniform int uZ;   // never set (0): keeps the height loop rolled, one gH expansion instead of three
void main() {
  vec2 xz = aP + uO.xy;
#ifdef SHADOW
  float h = gH(xz);
#else
  float e = max(.04, length(aP) * .012), h = 0., hx = 0., hz = 0.;
  for (int i = 0; i < 3 + uZ; i++) {
    float g = gH(xz + (i == 0 ? vec2(0.) : i == 1 ? vec2(e, 0.) : vec2(0., e)));
    if (i == 0) h = g; else if (i == 1) hx = g; else hz = g;
  }
  vN = normalize(vec3(h - hx, e, h - hz));
#endif
  vP = vec3(xz.x, h, xz.y);
  gl_Position = uVP * vec4(vP, 1.);
}`,lo=qt+Gt+`
in vec3 vP; in vec3 vN;
out vec4 o;
uniform vec4 uO;
uniform int uZ;
#if BOT == 4
// a silt flat (2026-11-11): soft mud with a low swell, the cones of burrowing shrimps each with a crater at the top,
// pairs of worm holes, a snail's winding furrow with its two low berms. Returns height in metres (A fades it out far off).
float ripH(vec2 p, float A) {
  float h = .005 * (n2(p * 1.9 + 5.) - .5) + .0016 * n2(p * 7. + 2.) + .0006 * n2(p * 23. + 8.);
  vec2 q = mat2(.8, .6, -.6, .8) * p;
  vec2 c = q / .66, ci = floor(c); uint bh = hu(uint(int(ci.x) + 5000) * 7919u + uint(int(ci.y) + 5000) + 313u);
  if (hf(bh) < .55) {
    vec2 bq = q - (ci + .22 + .56 * vec2(hf(bh + 1u), hf(bh + 2u))) * .66;
    float R = .08 + .12 * hf(bh + 3u), d = length(bq * vec2(1., .8 + .3 * hf(bh + 5u))) * (1. + .3 * (n2(bq * 35. + float(bh & 255u)) - .5));
    float cn = clamp(1. - d / R, 0., 1.);
    h += R * (.36 + .2 * hf(bh + 4u)) * cn * cn * (3. - 2. * cn) - R * .3 * smoothstep(R * .24, R * .07, d);
  }
  vec2 c2 = p / .41, cj = floor(c2); uint wh = hu(uint(int(cj.x) + 3000) * 6271u + uint(int(cj.y) + 3000) + 71u);
  if (hf(wh) < .22) {
    vec2 w0 = (cj + .25 + .5 * vec2(hf(wh + 1u), hf(wh + 2u))) * .41, wd = vec2(cos(hf(wh + 3u) * 6.28), sin(hf(wh + 3u) * 6.28)) * (.025 + .025 * hf(wh + 4u));
    float r = .005 + .004 * hf(wh + 5u), d = min(length(p - w0 - wd), length(p - w0 + wd));
    h -= .002 * smoothstep(r * 3.5, r, d) + .0025 * smoothstep(r, r * .4, d);
  }
  vec2 rd = normalize(FLW.yx * vec2(1., -1.) + vec2(.3, .2)), rq = vec2(-rd.y, rd.x);
  float x = dot(p, rd), y = dot(p, rq), bi = floor(y / 1.7);
  float tc = (bi + .5) * 1.7 + .35 * sin(x * 1.3 + bi * 2.1) + .5 * (n2(vec2(x * .8, bi * 3.)) - .5), dd = y - tc;
  float tv = step(.4, fract(sin(bi * 12.9898) * 43758.5)) * smoothstep(.35, .5, n2(vec2(x * .35, bi * 7. + 3.)));
  h += tv * (.0025 * exp(-sq((abs(dd) - .016) / .007)) - .006 * exp(-sq(dd / .009)));
  return h * A / .011;
}
#elif BOT == 2 || SND == 1
// wave ripples in the sand, ~10 cm apart: a sharp crest, a rounded trough; two sets a little turned swap over in
// patches so the crests bend, fork and join, and the amplitude dies away in places. Felt balls of seagrass fibre lie
// in the troughs (BOT 2). Returns height in metres.
float ripH(vec2 p, float A) {
  vec2 rd = normalize(FLW.xy), rq = vec2(-rd.y, rd.x);
  float w = n2(p * .8 + 3.) * 1.3 + n2(p * 2.2 + 11.) * .7 + n2(p * 5.3 + 27.) * .35;
  float ph = dot(p, rd) * 10.5 + w + .45 * sin(dot(p, rq) * 2.3 + n2(p * .45) * 5.);
  float ph2 = dot(p, rd * .93 + rq * .37) * 8.6 + w * .7 + 2.6 * n2(p * .9 + 31.);
  float t1 = abs(fract(ph) * 2. - 1.), t2 = abs(fract(ph2) * 2. - 1.);
  float h = mix(pow(t1, 1.7), pow(t2, 1.7), smoothstep(.4, .6, n2(p * 1.1 + 40.)));
  // crests run out and restart: their height breaks along the crest line, not only in broad patches
  h *= (.2 + .8 * smoothstep(.2, .6, n2(p * .7 + 9.))) * (.35 + .65 * smoothstep(.25, .6, n2(p * vec2(2.6, 2.6) + rq * 3. + 51.)));
  h *= A;
#if BOT == 2
  vec2 c = p / .42, ci = floor(c); uint bh = hu(uint(int(ci.x) + 4096) * 7919u + uint(int(ci.y) + 4096) + 911u);
  if (hf(bh) < .4) {
    vec2 bc = (ci + .25 + .5 * vec2(hf(bh + 1u), hf(bh + 2u))) * .42;
    float bp = dot(bc, rd) * 10.5 + n2(bc * .8 + 3.) * 1.3 + n2(bc * 2.2 + 11.) * .7 + n2(bc * 5.3 + 27.) * .35 + .45 * sin(dot(bc, vec2(-rd.y, rd.x)) * 2.3 + n2(bc * .45) * 5.);
    bc += rd * (.5 - fract(bp)) / 10.5;                              // rolled into the nearest trough
    float r = .022 + .018 * hf(bh + 3u);
    vec2 q = p - bc; float d = length(q / vec2(1., .82 + .2 * hf(bh + 4u))) * (1. + .14 * (n2(q * 160. + float(bh & 255u)) - .5));
    h = max(h, r * .85 * sqrt(max(1. - sq(d / r), 0.)) - .002);
  }
#endif
  return h;
}
#endif
#if BOT == 1 || BOT == 3 || BOT == 5
vec2 ngr(vec2 q) { float a = n2(q); return vec2(n2(q + vec2(.3, 0.)) - a, n2(q + vec2(0., .3)) - a); }
#endif
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
  vec2 p = vP.xz;
  vec2 rd = normalize(vec2(FLW.x, FLW.y));
  float rm = reefM(p), m0 = 0., m1 = 0.;
  for (int i = 0; i < 2 + uZ; i++) { float g = meadow(i == 0 ? p : p + rd * .5); if (i == 0) m0 = g; else m1 = g; }
  vec3 N = normalize(vN);
  float mm = max(m0, smoothstep(.0, .3, m0) * smoothstep(.97, .85, N.y)) * (1. - rm);
  float fw = clamp(de * .03, 0., 1.);
  // sand: wave ripples, grains, flecks
  float rph = dot(p, rd) * 62.8 + 1.4 * sin(dot(p, vec2(-rd.y, rd.x)) * 1.7 + n2(p * .4) * 6.) + 3. * n2(p * .7) + 4.2 * n2(p * 3.1) + 2.2 * n2(p * 7.3 + 5.);
  // a second, slightly turned set from the last storm: where they cross, crests fork and break (no clean corduroy)
  float rph2 = dot(p, vec2(rd.x * .94 - rd.y * .34, rd.y * .94 + rd.x * .34)) * 51. + 4. * n2(p * .9 + 13.);
  float rip = (1. - smoothstep(.0, .5, fw)) * (1. - mm) * (1. - smoothstep(.0, .3, rm)) * smoothstep(.85, .97, N.y);
  float rw = mix(cos(rph), cos(rph2), smoothstep(.35, .65, n2(p * .7 + 40.))); rw = sign(rw) * pow(abs(rw), .7);
  float rpm = rip * (.15 + .85 * smoothstep(.15, .8, n2(p * 1.3 + 9.))) * (.25 + .75 * smoothstep(.3, .55, n2(p * 4.6 + 21.)));
  N = normalize(N + vec3(rd.x, 0., rd.y) * .45 * rw * rpm);
  vec3 sand = vec3(.52, .47, .38) * (.8 + .4 * n2(p * 95.)) * (.82 + .36 * n2(p * 6.));
  // soft mottling on a rotated, warped domain so the noise lattice never shows as blocks
  vec2 mq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 5.3 + 2.), n2(p * 4.7 + 19.)) - .5) * .22;
  float mt = n2(mq * 19. + 4.) * .5 + n2(mq.yx * 47.) * .3 + n2(mq * 103. + 11.) * .2;
  sand *= 1. + (mt - .5) * .5 * (1. - fw);
  float gfade = 1. - smoothstep(.2, .6, PXW * de * 110. / max(V.y, .2));
  // detritus settles in the ripple troughs; grey-brown silt patches; scattered shell grit and dark grains
  float tro = smoothstep(.2, -.7, sin(rph)) * rpm;
  sand = mix(sand, vec3(.2, .16, .1) * (.7 + .6 * mt), tro * .4);
  sand *= .62 + .38 * smoothstep(.25, .7, n2(p * 1.6 + 23.) * .6 + n2(p * 4.3 + 5.) * .4);
  float gq = n2(mq * 83. + 3.) * n2(mq.yx * 37. + 8.);
  sand = mix(sand, vec3(.85, .8, .7), smoothstep(.42, .55, gq) * gfade * .8);
  sand *= 1. - .4 * smoothstep(.72, .82, n2(mq.yx * 110. + 41.)) * gfade;
  // burrows: a dark hole in a raised ring of cast sand
  {
    vec2 bc = p / .45; vec2 bi = floor(bc); uint bh = hu(uint(int(bi.x) + 8192) * 6271u + uint(int(bi.y) + 8192) + 77u);
    if (hf(bh) < .3) {
      vec2 bq = (fract(bc) - (vec2(hf(bh + 1u), hf(bh + 2u)) * .6 + .2)) * .45;
      float br = .006 + .01 * hf(bh + 3u), bd = length(bq);
      float ring = exp(-sq((bd - br * 2.2) / (br * 1.3)));
      sand *= mix(1., .08, smoothstep(br, br * .55, bd)) * (1. + .25 * ring);
      N = normalize(N + vec3(bq.x, 0., bq.y) / max(bd, 1e-4) * (ring * .5 - smoothstep(br * 1.6, br, bd) * .6));
    }
  }
  // shells
  vec2 sc = p / .32; vec2 ci = floor(sc); uint h = hu(uint(int(ci.x) + 4096) * 9973u + uint(int(ci.y) + 4096));
  if (hf(h) < .38) {
    vec2 ce = vec2(hf(h + 1u), hf(h + 2u)) * .7 + .15; float an = hf(h + 3u) * 6.28;
    vec2 q = (fract(sc) - ce) * .32; q = mat2(cos(an), sin(an), -sin(an), cos(an)) * q;
    float rr = .006 + .018 * hf(h + 4u);
    float e = length(q / vec2(rr, rr * .72));
    if (e < 1.) {
      float rib = .8 + .2 * sin(atan(q.y / (abs(q.x) + 1e-4)) * 14.);
      sand = mix(sand, vec3(.74, .68, .58) * rib * (hf(h + 5u) < .3 ? vec3(.8, .6, .55) : vec3(1.)), (1. - mm) * smoothstep(1., .8, e));
      N = normalize(N + vec3(q.x, 0., q.y) / rr * .6 * (1. - mm));
    }
  }
  // dead leaves washed against the meadow edge
  float edge = smoothstep(.0, .25, m1) * (1. - mm);
  vec2 lq = mat2(rd.x, rd.y, -rd.y, rd.x) * p;
  float lf = smoothstep(.66, .7, n2(lq * vec2(3.5, 70.) + 3.)) * smoothstep(.3, .6, n2(p * 2.1));
  sand = mix(sand, vec3(.2, .13, .06) * (.8 + .4 * n2(lq * 40.)), lf * (.08 + .92 * edge));
  // matte: dead sheaths and fibre
  vec3 mat = vec3(.1, .075, .04) * (.55 + .9 * n2(p * vec2(9., 52.) + vec2(0., vP.y * 30.)));
  float bank = smoothstep(.97, .8, N.y);
  // the bank face: layered dead sheaths (fine horizontal bands) torn by hanging rhizome fibre (vertical streaks)
  float fib = n2(vec2((p.x - p.y) * 70., vP.y * 6.)) * n2(vec2((p.x + p.y) * 23., vP.y * 3. + 5.));
  mat = mix(mat, vec3(.13, .09, .05) * (.7 + .4 * n2(vec2(p.x + p.y, vP.y) * vec2(25., 160.) + n2(p * 9.) * 3.)) * (.65 + .8 * fib), bank);
  // far meadow (no leaf instances out there): the canopy seen as dark streaks
  float far = smoothstep(FLW2.w - 1.6, FLW2.w, length(p - uO.xy));
  mat = mix(mat, vec3(.09, .14, .05) * (.6 + .8 * n2(p * 9.)), far);
  vec3 alb = mix(sand, mat, mm);
  // reef rock: coralline crust, turf, sponges, urchins
  if (rm > .01) {
    float a = n2(p * 3.1 + 2.), b = n2(p * 7.3 + 9.), cc = n2(p * 1.4 + 31.);
    vec3 rock = mix(vec3(.20, .17, .1), vec3(.42, .25, .3), smoothstep(.4, .65, a));
    rock = mix(rock, vec3(.62, .48, .1), smoothstep(.72, .78, b) * .9);
    rock = mix(rock, vec3(.6, .12, .06), smoothstep(.74, .8, n2(p * 5.1 + 77.)) * .9);
    rock *= .55 + .7 * n2(p * 40.) * n2(p * 13. + 3.);
    float ur = smoothstep(.78, .85, n2(p * 9. + 50.));
    rock = mix(rock, vec3(.03, .02, .03), ur);
    vec2 g = vec2(n2(p * 18. + .05) - n2(p * 18. - vec2(.05, 0.)), n2(p * 18. + vec2(0., .05)) - n2(p * 18. - vec2(0., .05)));
    N = normalize(mix(N, normalize(N + vec3(g.x, 0., g.y) * 6. * (1. - fw)), smoothstep(.05, .4, rm)));
    alb = mix(alb, rock, smoothstep(.05, .35, rm));
    alb *= .7 + .3 * cc;
  }
  float rough = mix(.8, .5, rm);
  float fpx = PXW * de / max(V.y, .25);                 // metres of ground under one pixel
  float aoB = 1.;
#if BOT == 1 || BOT == 3
  {
    float pm = botM(p);
    if (pm > .001) {
      vec2 bu = (p - uB[0].xy) / (2. * uB[0].z) + .5;
      vec4 bh = texture(uBH, bu), bm = texture(uBM, bu);
      float rk = 1. - bm.a, nf = 1. - smoothstep(.002, .012, fpx);
      vec3 Nb = normalize(vec3(-bh.g, 1., -bh.b));
      vec3 ra;
#if BOT == 1
      // limestone: rounded, pitted, a few fissures; light warm grey with hard small shadows
      vec2 g = ngr(p * 9. + 3.) * .8;
      float fis = smoothstep(.022, .0, abs(n2(p * 2.6 + 61.) - .5)) * smoothstep(.45, .6, n2(p * .9 + 13.)) * rk;
      ra = vec3(.5, .47, .41) * (.8 + .32 * n2(p * 4.3 + vP.y * 3. + 2.)) * (.88 + .24 * n2(vec2(p.x + p.y, vP.y) * 37.) * nf);
      // coralline crust on the tops and lit sides: pink to mauve, paler growing rims, faintly knobbly
      float cr = bm.r, rim = smoothstep(.25, .45, cr) * (1. - smoothstep(.5, .8, cr));
      vec3 crc = mix(vec3(.5, .34, .37), vec3(.45, .32, .4), n2(p * 3.1 + 17.)) * (.85 + .3 * n2(p * 23. + 4.));
      ra = mix(ra, mix(crc, vec3(.64, .53, .53), rim * .5), smoothstep(.25, .6, cr));

      // brown-gold algal turf: fuzzy, matt
      float tf = bm.g * (1. - smoothstep(.3, .5, cr));
      ra = mix(ra, mix(vec3(.34, .27, .12), vec3(.3, .29, .14), n2(p * 5. + 8.)) * (.7 + .6 * n2(p * 140.) * nf + .3 * (1. - nf)), smoothstep(.15, .6, tf) * .9);
      // sponge: thin matt skins of orange and red under the overhangs, lobed at the edge, pores on low mounds
      float spg = bm.b * smoothstep(.35, .65, n2(p * 6. + 23.) * .7 + bm.b * .5);
      vec3 spc = n2(p * 1.3 + 71.) > .5 ? vec3(.72, .27, .07) : vec3(.6, .1, .07);
      ra = mix(ra, spc * (.85 + .2 * n2(p * 55.)), smoothstep(.3, .5, spg));
      { vec2 c = p / .045, ci = floor(c); uint h = hu(uint(int(ci.x) + 9000) * 6271u + uint(int(ci.y) + 9000) + 3u);
        vec2 q = (fract(c) - .5 - (vec2(hf(h), hf(h + 1u)) - .5) * .4) * .045; float d = length(q);
        float pr = smoothstep(.3, .5, spg) * nf * step(.6, hf(h + 2u));
        ra *= 1. - .6 * smoothstep(.004, .0022, d) * pr;
        g -= q / max(d, 1e-4) * exp(-sq(d / .012)) * .9 * pr; }
      ra *= 1. - .8 * fis;
      // fine relief from three planes (so the steep faces are not streaked): pitted, granular, hard small shadows
      { vec3 P3 = vP * 16.; vec3 an = abs(Nb); an /= an.x + an.y + an.z;
        vec2 gx = ngr(P3.zy + 5.) * 2.2 + ngr(P3.zy * 3.3 + 1.) * 1.1 * nf, gy = ngr(P3.xz) * 2.2 + ngr(P3.xz * 3.3 + 7.) * 1.1 * nf, gz = ngr(P3.xy + 9.) * 2.2 + ngr(P3.xy * 3.3 + 3.) * 1.1 * nf;
        vec3 d3 = vec3(0., gx.y, gx.x) * an.x + vec3(gy.x, 0., gy.y) * an.y + vec3(gz.x, gz.y, 0.) * an.z;
        Nb = normalize(Nb - d3 * (.55 + .5 * smoothstep(.3, .6, cr)) * rk);
        float pit = smoothstep(.62, .78, n2(P3.xz * 2.1 + P3.y * .7 + 13.)) * nf * rk * (1. - smoothstep(.3, .6, cr));
        ra *= 1. - .45 * pit; aoB *= 1. - .3 * pit; }
      Nb = normalize(Nb + vec3(-g.x, 0., -g.y) * .5 * rk);
#else
      // cobbles and boulders: each stone its own rock (pale limestone, brown sandstone, dark grey-green basalt, a few
      // speckled granites), matt and finely grained; a brown film of diatoms and turf on the tops, coralline crust in
      // pink-mauve patches on the highest; silt and gravel in the hollows, the gaps dark (the bake's openness)
      float sid = bm.b;
      vec3 sc = mix(vec3(.56, .53, .47), vec3(.47, .36, .26), smoothstep(.25, .4, sid));
      sc = mix(sc, vec3(.22, .23, .21), smoothstep(.55, .68, sid));
      sc = mix(sc, vec3(.5, .48, .44), smoothstep(.84, .92, sid));
      sc *= mix(1., .7 + .5 * smoothstep(.45, .65, n2(p * 420. + 9.)), smoothstep(.84, .92, sid) * (1. - smoothstep(.0012, .003, fpx)));   // granite grain
      sc *= (.84 + .3 * n2(p * 21. + sid * 40.)) * (.92 + .16 * n2(p * 85.) * nf);
      float fm = bm.g;
      sc = mix(sc, vec3(.32, .26, .15) * (.75 + .45 * n2(p * 37. + 7.)), smoothstep(.3, .8, fm) * .45);
      float cr = bm.r, rim = smoothstep(.3, .5, cr) * (1. - smoothstep(.55, .85, cr));
      vec3 crc = mix(vec3(.53, .36, .39), vec3(.47, .34, .41), n2(p * 4.1 + 17.)) * (.86 + .26 * n2(p * 58. + 4.) * nf);
      sc = mix(sc, mix(crc, vec3(.64, .55, .55), rim * .5), smoothstep(.3, .6, cr + .3 * (n2(p * 47. + 5.) - .5) * nf) * .85);
      ra = sc;
      vec2 g = (ngr(p * 31. + 3.) * .7 + ngr(p * 80.) * .6 * smoothstep(.3, .6, cr)) * nf + ngr(p * 9. + 7.) * .55 + ngr(p * 3.3 + 1.) * .35;
      Nb = normalize(Nb + vec3(-g.x, 0., -g.y) * rk);
      // silt and fine gravel in the hollows
      sand = vec3(.4, .37, .31) * (.86 + .24 * n2(p * 9. + 1.)) * (.9 + .2 * n2(p * 70.) * nf);
#endif
      // sand lies in every hollow (the A channel)
      ra = mix(ra, sand, smoothstep(.3, .7, bm.a));
      alb = mix(alb, ra, pm);
      N = normalize(mix(N, Nb, pm));
      aoB = mix(1., aoB * bh.a, pm);
      rough = mix(rough, .85, pm);
      gSpec = mix(gSpec, .02, pm);
    }
  }
#endif
#if BOT == 5
  {
    // the forest's floor: bedrock under a thin pink-grey coralline crust, matt and finely grained, a little silt in the
    // low places; the bushes' shadows give it its form
    float pm = botM(p);
    if (pm > .001) {
      float nf = 1. - smoothstep(.002, .012, fpx);
      vec3 ra = vec3(.5, .43, .41) * (.88 + .2 * n2(p * 2.3 + 7.)) * (.9 + .2 * n2(p * 29.) * nf);
      ra = mix(ra, vec3(.4, .37, .31), smoothstep(.55, .75, n2(p * .9 + 3.)) * .5);
      vec2 g = ngr(p * 23. + 3.) * .7 * nf + ngr(p * 61. + 9.) * .5 * nf;
      alb = mix(alb, ra, pm);
      N = normalize(mix(N, normalize(vN + vec3(-g.x, 0., -g.y)), pm));
      rough = mix(rough, .85, pm);
      gSpec = mix(gSpec, .02, pm);
    }
  }
#endif
#if BOT == 2 || BOT == 4 || SND == 1
  {
    // the ripple field and the sand of the sand views: each ripple a lit face and a lee with a sharp crest; the lee
    // takes the torch's shadow (marched towards the lamp), grains sparkle on the lit faces, the troughs hold the hash
    float sa = (1. - mm) * smoothstep(.85, .97, vN.y) * (1. - smoothstep(.0, .3, rm));
#if BOT == 2 || BOT == 4
    sa *= botM(p);
#endif
    if (sa > .01) {
      float A = .011 * (1. - smoothstep(.012, .04, fpx));
      vec3 Lt = TPOS - vP; float dlt = length(Lt); Lt /= dlt;
      float h0 = 0., hx = 0., hz = 0., sr = 1., pen = max(.03 / dlt, .02);
      for (int i = 0; i < 12 + uZ; i++) {
        float t = i < 3 ? 0. : .005 * pow(1.5, float(i - 3));
        vec2 q = i == 1 ? p + vec2(.0025, 0.) : i == 2 ? p + vec2(0., .0025) : p + Lt.xz * t;
        float hh = ripH(q, A);
        if (i == 0) h0 = hh; else if (i == 1) hx = hh; else if (i == 2) hz = hh;
        else sr = min(sr, clamp((h0 + Lt.y * t - hh) / (t * pen) + .5, 0., 1.));
      }
      vec3 Nr = normalize(normalize(vN) + vec3(-(hx - h0), 0., -(hz - h0)) / .0025);
#if BOT == 4
      // the silt: olive grey-brown and matt, the shrimps' cones paler with fresh grey mud from below, the holes and
      // craters dark, soft flocs of detritus lying in the hollows, a few half-buried pale shells
      float hs = h0 * .011 / max(A, 1e-5);   // metres
      vec3 sd = vec3(.37, .35, .28) * (.84 + .3 * n2(p * 2.7 + 5.)) * (.9 + .2 * n2(p * 13. + 1.)) * (.93 + .14 * n2(p * 70.) * (1. - smoothstep(.001, .004, fpx)));
      sd = mix(sd, vec3(.47, .46, .41) * (.9 + .2 * n2(p * 45.)), smoothstep(.006, .022, hs) * .7);
      sd *= .55 + .45 * smoothstep(-.016, -.007, hs);
      vec2 fq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 7.), n2(p * 7. + 31.)) - .5) * .06;
      float flc = smoothstep(.28, .45, n2(fq * 52. + 3.) * n2(fq.yx * 33. + 17.)) * (1. - smoothstep(.003, .012, fpx));
      sd = mix(sd, vec3(.5, .49, .43), flc * .35);
      vec2 sq2 = p / .47, si = floor(sq2); uint shh = hu(uint(int(si.x) + 4000) * 9973u + uint(int(si.y) + 4000) + 19u);
      if (hf(shh) < .35) {
        float an = hf(shh + 3u) * 6.28, rr = .015 + .02 * hf(shh + 4u);
        vec2 q = mat2(cos(an), sin(an), -sin(an), cos(an)) * ((fract(sq2) - .2 - .6 * vec2(hf(shh + 1u), hf(shh + 2u))) * .47);
        float e = length(q / vec2(rr, rr * .78)), bur = smoothstep(-.1, .25, q.y / rr + .6 * (hf(shh + 5u) - .5));
        float sh = smoothstep(1., .86, e) * bur;
        float rib = .84 + .16 * sin(atan(q.y / (abs(q.x) + 1e-4)) * 12.) * (1. - smoothstep(.002, .005, fpx));
        sd = mix(sd * (1. - .35 * smoothstep(1.35, 1., e) * (1. - bur)), vec3(.7, .66, .58) * rib, sh);
        Nr = normalize(Nr + vec3(q.x, 0., q.y) / rr * .5 * sh);
      }
#else
      float hn = A > 1e-4 ? clamp(h0 / A, 0., 1.4) : .5;
      // the sand: pale, warm; the troughs darker and coarser with shell hash and bits of leaf
      vec3 sd = vec3(.6, .55, .46) * (.86 + .22 * n2(p * 7. + 5.)) * (.9 + .2 * n2(p * 160.) * (1. - smoothstep(.001, .004, fpx)));
      float tro = smoothstep(.35, .05, hn) * (A > 1e-4 ? 1. : 0.);
      vec2 rdd = normalize(FLW.xy), tq = vec2(dot(p, rdd), dot(p, vec2(-rdd.y, rdd.x)));
      vec2 cq = mat2(.8, .6, -.6, .8) * p + (vec2(n2(p * 11.), n2(p * 11. + 17.)) - .5) * .02;
      float cv = n2(cq * 170. + 3.) * n2(cq.yx * 113. + 8.), chip = smoothstep(.3, .42, cv) * (1. - smoothstep(.002, .006, fpx));
      vec3 hsh = mix(vec3(.3, .25, .19), n2(cq * 40. + 5.) > .55 ? vec3(.66, .62, .55) : vec3(.16, .12, .08), chip * .8);
      sd = mix(sd, hsh * (.8 + .3 * n2(p * 30.)), tro * .7);
      sd = mix(sd, vec3(.2, .15, .08), tro * smoothstep(.62, .72, n2(tq * vec2(40., 7.) + 7.)) * .6);
      // grains: a fine sparkle on the lit faces only
      vec2 gq = p / .0022, gc = floor(gq); uint gh = hu(uint(int(gc.x) + 70000) * 9973u + uint(int(gc.y) + 70000));
      sd += vec3(.9, .85, .75) * step(.975, hf(gh)) * smoothstep(.0, .5, dot(Nr, Lt)) * (1. - smoothstep(.0006, .0016, fpx)) * (1. - tro);
#if BOT == 2
      // felt balls (in ripH's height): matted brown fibre
      { vec2 rd = normalize(FLW.xy); vec2 c = p / .42, ci = floor(c); uint bh = hu(uint(int(ci.x) + 4096) * 7919u + uint(int(ci.y) + 4096) + 911u);
        if (hf(bh) < .4) {
          vec2 bc = (ci + .25 + .5 * vec2(hf(bh + 1u), hf(bh + 2u))) * .42;
          float bp = dot(bc, rd) * 10.5 + n2(bc * .8 + 3.) * 1.3 + n2(bc * 2.2 + 11.) * .7 + n2(bc * 5.3 + 27.) * .35 + .45 * sin(dot(bc, vec2(-rd.y, rd.x)) * 2.3 + n2(bc * .45) * 5.);
          bc += rd * (.5 - fract(bp)) / 10.5;
          float r = .022 + .018 * hf(bh + 3u);
          vec2 q = p - bc; float d = length(q / vec2(1., .82 + .2 * hf(bh + 4u))) * (1. + .14 * (n2(q * 160. + float(bh & 255u)) - .5));
          float fb = smoothstep(r, r * .85, d);
          vec2 fq = mat2(.6, .8, -.8, .6) * q;
          vec3 fc = vec3(.3, .2, .1) * (.6 + .5 * n2(fq * vec2(300., 60.) + float(bh & 127u)) * n2(fq.yx * vec2(240., 50.)));
          sd = mix(sd * (1. - .45 * smoothstep(r * 1.3, r, d)), fc, fb);
        } }
#endif
#endif
      alb = mix(alb, sd, sa);
      N = normalize(mix(N, Nr, sa));
      gSh = mix(1., sr, sa);
      gSpec = mix(gSpec, .03, sa);
    }
  }
#endif
  vec3 c = torchL(vP, N, V, de, alb * aoB, rough, 0.) + ambL(vP, N, de, alb) * aoB;
  o = outC(c, de);
}`,qe=16,Wt=10,ga=qt+Gt+`
layout(location = 0) in vec4 a0;
layout(location = 1) in vec4 a1;
layout(location = 2) in vec4 a2;
layout(location = 3) in vec4 a3;
layout(location = 4) in vec4 a4;
layout(location = 5) in vec4 a5;
out vec3 vP; out vec3 vN; out vec4 vU; flat out vec4 vM;
void main() {
  int ring = gl_VertexID / ${Wt+1}, j = gl_VertexID - ring * ${Wt+1};
  float t = float(ring) / ${qe}., th = float(j) / ${Wt}. * 6.2831853;
  float u = 1. - t;
  vec3 C = u * u * u * a0.xyz + 3. * u * u * t * a1.xyz + 3. * u * t * t * a2.xyz + t * t * t * a3.xyz;
  vec3 T = 3. * u * u * (a1.xyz - a0.xyz) + 6. * u * t * (a2.xyz - a1.xyz) + 3. * t * t * (a3.xyz - a2.xyz);
  T = normalize(T + 1e-6);
  vec3 B = cross(T, a4.xyz); B = length(B) < 1e-4 ? normalize(cross(T, vec3(.3, .1, .9))) : normalize(B);
  vec3 Nn = cross(B, T);
  float r = u * u * a0.w + 2. * u * t * a1.w + t * t * a2.w;
  int caps = int(a5.x);
  if ((caps & 4) != 0) r = a1.w * (t < .3 ? pow(sin(1.5707963 * t / .3), .55) : mix(1., a2.w / a1.w, smoothstep(.3, 1., t)));
  if ((caps & 1) != 0 && t < .2) r *= sqrt(max(1. - sq((.2 - t) / .2), 0.));
  if ((caps & 2) != 0 && t > .8) r *= sqrt(max(1. - sq((t - .8) / .2), 0.));
  float cs = cos(th), sn = sin(th);
  vec3 pos = C + r * (cs * Nn * a4.w + sn * B * a5.w);
  vN = normalize(cs * Nn / max(a4.w, .05) + sn * B / max(a5.w, .05));
  vP = pos; vU = vec4(t, th, cs, sn); vM = vec4(a3.w, a5.y, a5.z, r);
  gl_Position = uVP * vec4(pos, 1.);
}`,uo=qt+Gt+`
in vec3 vP; in vec3 vN; in vec4 vU; flat in vec4 vM;
out vec4 o;
void main() {
  vec3 V = CAMP - vP; float de = length(V); V /= de;
  vec3 N = normalize(vN); if (dot(N, V) < 0.) N = -N;
  int m = int(vM.x + .5); float sd = vM.y, pa = vM.z, t = vU.x;
  vec2 uv = vec2(t, vU.y / 6.2831853);
  float rough = .45, tr = 0.;
  vec3 alb;
  float bump = n2(uv * vec2(60., 14.) + sd * 31.);
  {                        // the comb star: orange-red above, the marginal plates and their pale spines fringing each arm
    alb = vec3(.62, .2, .07) * (.75 + .35 * n2(uv * vec2(80., 20.) + sd * 9.));
    float rim = 1. - smoothstep(.1, .4, abs(vU.z));
    alb = mix(alb, vec3(.8, .58, .4) * (.7 + .3 * smoothstep(-.2, .6, sin(t * 170.))), rim);
    alb = mix(alb, vec3(.42, .13, .05), smoothstep(.9, .99, vU.z) * .5);
    rough = .72;
  }
  N = normalize(N + (bump - .5) * .35 * normalize(cross(N, vec3(.2, .9, .3))));
  vec3 c = torchL(vP, N, V, de, alb, rough, tr) + ambL(vP, N, de, alb);
  o = outC(c, de);
}`,po=qt+"out vec4 o; void main() { o = vec4(0.); }",mo=qt+Gt+`
uniform vec4 uM;
out vec3 vC;
void main() {
  // two populations in world-anchored wrapping boxes centred ahead of the eye: fine glittering plankton (dense, near)
  // and marine snow (larger pale flakes sinking slowly, out to further)
  uint id = uint(gl_VertexID);
  bool snow = gl_VertexID >= int(uM.x);
  vec3 h = vec3(hf(id * 3u + 11u), hf(id * 3u + 12u), hf(id * 3u + 13u));
  float B = snow ? 8. : uM.y;
  vec3 dr = snow ? vec3(.012, -.022, .008) * TIME + .03 * sin(TIME * (.15 + h.yzx * .2) + h * 30.)
                 : vec3(.03, -.006, .02) * TIME + .05 * sin(TIME * (.25 + h.yzx * .4) + h * 30.);
  dr.xz += FLW.xy * FLW.z * .05 * sin(FLW.w * TIME + h.x * 3.);
  vec3 C0 = CAMP + CAMF * B * .38;
  vec3 p = C0 + (fract(h + (dr - C0) / B) - .5) * B;
  vec3 Lv = TPOS - p; float dl = length(Lv); vec3 l = Lv / dl;
  vec3 V = CAMP - p; float de = length(V); V /= de;
  float sp = beam(dot(-l, TDIR)) * TPOW;
  gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 1.; vC = vec3(0.);
  if (sp < .001 || de < .1) return;
  float cph = dot(-l, V);
  float ph = (1. - .55 * .55) / pow(1. + .3025 - 1.1 * cph, 1.5) * .08 + .15;
  // plankton glitter: most are dim specks, a few flash as their facets catch the beam
  float tw = snow ? .8 + .2 * sin(TIME * .7 + h.y * 40.) : .3 + .5 * pow(.5 + .5 * sin(TIME * (1.5 + h.x * 4.) + h.y * 40.), 3.) + 3. * pow(.5 + .5 * sin(TIME * (2.3 + h.z * 5.) + h.x * 60.), 24.);
  vec3 I = TCOL * sp * exp(-SIGT * (dl + de)) / (dl * dl + .03) * ph * tw;
  // physical size (sub-pixel for plankton) spread over the defocus disc (focus about 1.7 m), energy kept
  float sz = uM.w * (snow ? 2.5 + 4. * h.z * h.z : 1.3 + 2. * h.z * h.z) / de;
  float bd = uM.w * 7. * abs(1. / de - .6);
  float disc = max(max(sz, bd), 1.);
  gl_PointSize = min(disc, 48.);
  vC = I * uM.z * sq(sz / disc) * (snow ? 1.6 : 1.3) * (h.x < .05 ? 4. : 1.);
  gl_Position = uVP * vec4(p, 1.);
}`,vo=qt+`
in vec3 vC;
out vec4 o;
void main() { vec2 q = gl_PointCoord * 2. - 1.; float r2 = dot(q, q); if (r2 > 1.) discard; o = vec4(vC * exp(-r2 * 2.6), 0.);
#ifdef ENC8
o.rgb = sqrt(o.rgb / (1. + o.rgb)) * .5;
#endif
}`,xo=qt+Gt+`
layout(location = 0) in vec4 aS;
layout(location = 1) in vec4 aK;
out vec3 vC;
void main() {
  vec3 p = aS.xyz; vec3 V = CAMP - p; float de = length(V);
  vec3 c = aK.rgb * exp(-SIGT * de);
  float px = aS.w / (de * PXW);
  float sz = max(px, 2.);
  gl_PointSize = min(sz, 90.);
  vC = c * sq(max(px, .4) / sz) * (aS.w > 0. ? 1. : 0.);
  gl_Position = uVP * vec4(p, 1.);
}`,za=qt+Gt+`
uniform sampler2D uS;
out vec4 o;
#ifdef UPSURF
vec3 sky(vec3 d) {
  float mI = AMB.w;
  vec3 c = vec3(.006, .011, .024) * (.3 + 1.6 * mI) * (.5 + .5 * d.y);
  vec2 sp = d.xz / (1. + d.y) * 240.;
  vec2 ci = floor(sp); uint h = hu(uint(ci.x + 2000.) * 7919u + uint(ci.y + 2000.));
  if (hf(h) < .045) { vec2 o2 = vec2(hf(h + 1u), hf(h + 2u)) * .6 + .2; float r = length(fract(sp) - o2); c += vec3(.8, .85, 1.) * pow(hf(h + 3u), 5.) * 6. * exp(-r * r * 30.) * MOON.w; }
  float cm = dot(d, MOON.xyz);
  c += vec3(1., .95, .85) * mI * (smoothstep(.99985, .99992, cm) * 30. + exp((cm - 1.) * 60.) * .5 + exp((cm - 1.) * 6.) * .06);
  return c;
}
float wv(vec2 q) { return n2(q * .9 + TIME * vec2(.23, .13)) + .5 * n2(q * 2.3 - TIME * vec2(.17, .37)) + .25 * n2(q * 5.1 + TIME * vec2(.41, -.3)); }
vec3 surf(vec3 rd, out float t) {
  t = (SURF - CAMP.y) / rd.y; vec3 hp = CAMP + rd * t;
  float e = .1, w0 = wv(hp.xz);
  vec3 Nd = normalize(vec3((wv(hp.xz + vec2(e, 0.)) - w0) / e * .25, -1., (wv(hp.xz + vec2(0., e)) - w0) / e * .25));
  vec3 tr = refract(rd, Nd, 1.333);
  vec3 c = vec3(0.);
  if (dot(tr, tr) > .5) { float F = .02 + .98 * pow(1. - abs(dot(rd, Nd)), 5.); c = sky(tr) * (1. - F) * 2.2; }
  else c = AMB.rgb * .02;
  return c * exp(-SIGT * t);
}
#endif
void main() {
  vec2 fc = gl_FragCoord.xy;
  vec4 sc = texelFetch(uS, ivec2(fc * FRM.z), 0);
#ifdef ENC8
  { vec3 x = sc.rgb * sc.rgb; sc.rgb = x / max(1. - x, 1e-3); sc.a = sc.a > .998 ? 1e4 : 4. * sc.a / (1. - sc.a); }
#endif
  vec2 q = fc / RES * 2. - 1.;
  vec3 rd = normalize(CAMF + q.x * TANF * CAMR + q.y * TANF * CAMU);
  float de = sc.a; vec3 col = sc.rgb;
  float colDepth = SURF - CAMP.y;
  // starlight through the water column: deep blue-black, brighter towards the surface overhead
  vec3 Wsrc = AMB.rgb * exp(-SIGT * colDepth * .9) * vec3(.45, .95, 1.2);
  // moonlight in the water column: under a full moon at six metres the water itself is pale enough that the meadow
  // stands dark against it well past the beam; at sixteen metres under a new moon the beam is the world
  vec3 Lw = Wsrc * (.22 + 3.4 * sq(smoothstep(-.45, 1., rd.y))) * (1. + 1.6 * AMB.w * AMB.w * min(1.6, 10. / SURF));
  if (de > 1e3) {
#ifdef UPSURF
    if (rd.y > .6) { float t; col += surf(rd, t); de = t; } else
#endif
    de = 80.;   // below ~.66 the surface is a dark mirror (total internal reflection)
  }
  col = col * (sc.a > 1e3 ? 1. : exp(-.1 * de)) + Lw * (1. - exp(-(SIGT + .12) * de * 2.5));
  // the torch beam: single scattering inside the cone only (ray clipped to the cone analytically), sampled
  // equiangularly about the lamp so the bright throat near the torch is smooth; the shadow map cuts shafts
  vec3 co = CAMP - TPOS;
  float k2 = sq(cos(BW.w));                            // the spill edge
  float dA = dot(rd, TDIR), cA = dot(co, TDIR);
  float qa = dA * dA - k2, qb = dA * cA - k2 * dot(rd, co), qc = cA * cA - k2 * dot(co, co);
  float disc = qb * qb - qa * qc;
  float t0 = 1e9, t1 = -1e9;
  if (disc > 0.) {
    float sd = sqrt(disc), r1 = (-qb - sd) / qa, r2 = (-qb + sd) / qa;
    float lo = min(r1, r2), hi = max(r1, r2);
    if (qa < 0.) { if (cA + dA * (lo + hi) * .5 > 0.) { t0 = lo; t1 = hi; } }
    else if (dA > 0.) { t0 = hi; t1 = 1e4; }
    else { t0 = -1e4; t1 = lo; }
  } else if (qa > 0. && dA > 0.) { t0 = 0.; t1 = 1e4; }
  t0 = max(t0, 0.); t1 = min(t1, min(de, 16.));
  float bp = dot(-co, rd);                             // ray parameter of the closest approach to the lamp
  float hh = max(length(co + rd * bp), .02);
  vec3 acc = vec3(0.);
  ivec2 qi = ivec2(fc) & 1;
  if (t1 > t0) {
    float a0 = atan((t0 - bp) / hh), a1 = atan((t1 - bp) / hh);
    int nv = int(FRM.y);
    // the jitter is stratified over each 2x2 pixel quad (one hashed offset per quad, a quarter step per pixel) and the quad
    // is averaged below, so the four samples per pixel act as sixteen: no dither pattern in the beam
    float jt = (float(qi.x + 2 * qi.y) + hf(uint(fc.x * .5) * 7919u + uint(fc.y * .5) * 104729u + uint(FRM.x) * 26699u + 5u)) * .25;
    float cph = -dot(TDIR, rd);                       // scattering angle taken along the beam axis: once per pixel
    float ph = (1. - GPH * GPH) / pow(1. + GPH * GPH - 2. * GPH * cph, 1.5) * .08 + .06;
    for (int i = 0; i < nv; i++) {
      float th = mix(a0, a1, (float(i) + jt) / FRM.y);
      float t = bp + hh * tan(th);
      vec3 pp = CAMP + rd * t;
      vec3 Lv = pp - TPOS; float dl = length(Lv);
      // the shaft itself: drifting silt thins and frays it, the core and halo widen (and so dim) with distance, and the
      // water takes it out quickly: a hot throat at the lamp, gone before it reaches the frame's far side
      float ang = sqrt(max(2. - 2. * dot(Lv, TDIR) / dl, 0.));
      vec2 dr = TIME * vec2(.06, .04);
      float silt = n2(pp.xz * 3.1 + pp.y * 1.7 + dr) * .55 + n2(pp.xz * 1.4 - pp.y * 1.1 - dr * 1.7) * .45;
      float wc = .115 * (1. + .9 * dl) * BW.y, wh = .25 * (1. + .7 * dl) * BW.y, af = ang * (1. + .7 * (silt - .5));
      float prof = (exp(-sq(af / wc)) * 1.05 * .115 / wc + .22 * exp(-sq(af / wh)) * .25 / wh) * (1. - smoothstep(.42 * BW.y, .58 * BW.y, ang)) * min(BW.y, 1.);
      float along = exp(-.85 * dl) * (1. - smoothstep(1.2, 2.7, dl)) * (.3 + 1.4 * smoothstep(.3, .75, silt)) * (1. + 1.8 * exp(-dl / .4));
      acc += 2.6 * prof * along * shad(pp) * exp(-SIGT * (dl + t)) * (dl * dl / (dl * dl + .3));
    }
    acc *= ph * (a1 - a0) / (hh * FRM.y);
  }
  // depth-aware quad average: the x neighbour, then the other row's pair (derivatives; side found from a ramp so it
  // holds whatever the quad orientation); pairs that straddle a depth edge (a leaf against the far water) stay apart
  {
    float dq = min(de, 16.);
    float lx = dFdx(float(qi.x)) * (qi.x == 0 ? 1. : -1.), ly = dFdy(float(qi.y)) * (qi.y == 0 ? 1. : -1.);
    vec3 ax = dFdx(acc); float dx = dFdx(dq);
    float wx = step(abs(dx), .04 * (dq + .5 * lx * dx) + .01);
    vec3 h = acc + .5 * wx * lx * ax; float hd = dq + .5 * lx * dx;
    vec3 ay = dFdy(h); float dy = dFdy(hd);
    float wy = step(abs(dy), .04 * (hd + .5 * ly * dy) + .01);
    acc = h + .5 * wy * ly * ay;
  }
  col += TCOL * TPOW * SIGS * acc * FRM.w * .55;
  // backscatter haze: light scattered more than once glows softly around the beam and its throat
  {
    float tb = clamp(bp, 0., min(de, 16.));
    vec3 pc = CAMP + rd * tb; vec3 lc = pc - TPOS; float dc = length(lc);
    float wide = sq(smoothstep(-.3, 1., dot(lc / max(dc, 1e-3), TDIR)));
    float hq = max(hh, .12), ha = (atan((min(de, 16.) - bp) / hq) - atan(-bp / hq)) / hq;
    col += TCOL * TPOW * SIGS * ha * wide * exp(-SIGT * (dc + tb) * 1.4) * vec3(.55, .9, 1.) * .004 * (.4 + 30. * sq(SIGS.g - .1));
  }
  col *= EXPO;
  col = clamp(col * (2.51 * col + .03) / (col * (2.43 * col + .59) + .14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  float gr = hf(uint(fc.x) * 1973u + uint(fc.y) * 9277u + uint(FRM.x) * 26699u) - .5;
  col += gr * .014 * (.4 + col);
  vec2 vq = fc / RES - .5;
  col *= 1. - .06 * sq(dot(vq, vq) * 2.);
  o = vec4(col, 1.);
}`,bo=qt+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }";function wo(e){if(e.__c580)return e.__c580;const a=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_hwfloat")),U=(A,P)=>{const D=e.createShader(A);return e.shaderSource(D,a?P:P.replace(`#version 300 es
`,`#version 300 es
#define ENC8
`)),e.compileShader(D),D},j=A=>A.replace(`#version 300 es
`,`#version 300 es
#define SHADOW
`),nt=U(e.FRAGMENT_SHADER,po),Mt=U(e.FRAGMENT_SHADER,vo),ft={tb:[ga,uo],tbS:[j(ga),nt],mo:[mo,Mt],sp:[xo,Mt]},J={};for(const A in ft){const P=U(e.VERTEX_SHADER,ft[A][0]),D=typeof ft[A][1]=="string"?U(e.FRAGMENT_SHADER,ft[A][1]):ft[A][1],F=e.createProgram();e.attachShader(F,P),e.attachShader(F,D),e.linkProgram(F),J[A]={p:F,v:P,f:D}}e.flush();const et=(A,P)=>()=>{if(J[A])return;const D=U(e.VERTEX_SHADER,bo),F=U(e.FRAGMENT_SHADER,P),X=e.createProgram();e.attachShader(X,D),e.attachShader(X,F),e.linkProgram(X),e.flush(),J[A]={p:X,v:D,f:F}},St=et("fin",za),p=et("finS",za.replace(`#version 300 es
`,`#version 300 es
#define UPSURF
`)),Nt=(A,P)=>{if(J["gd"+A])return;const D=F=>F.replace(`#version 300 es
`,`#version 300 es
`+P);for(const[F,X,lt]of[["gdS"+A,j(D(Fa)),nt],["gd"+A,D(Fa),D(lo)]]){const yt=U(e.VERTEX_SHADER,X),pt=typeof lt=="string"?U(e.FRAGMENT_SHADER,lt):lt,mt=e.createProgram();e.attachShader(mt,yt),e.attachShader(mt,pt),e.linkProgram(mt),J[F]={p:mt,v:yt,f:pt}}e.flush()},de=(A,P)=>{if(J["gr"+A])return;const D=F=>F.replace(`#version 300 es
`,`#version 300 es
`+P);for(const[F,X,lt]of[["gr"+A,D(Na),D(ho)],["grS"+A,j(D(Na)),nt]]){const yt=U(e.VERTEX_SHADER,X),pt=typeof lt=="string"?U(e.FRAGMENT_SHADER,lt):lt,mt=e.createProgram();e.attachShader(mt,yt),e.attachShader(mt,pt),e.linkProgram(mt),J[F]={p:mt,v:yt,f:pt}}e.flush()};let st=1540483477;const Ft=()=>(st=Math.imul(st^st>>>15,739982445),st=Math.imul(st^st>>>12,695872825),st^=st>>>15,st&255),Lt=new Uint8Array(256*256);for(let A=0;A<Lt.length;A++)Lt[A]=Ft();e.pixelStorei(e.UNPACK_ALIGNMENT,1);const ue=e.createTexture();e.bindTexture(e.TEXTURE_2D,ue),e.texImage2D(e.TEXTURE_2D,0,e.R8,256,256,0,e.RED,e.UNSIGNED_BYTE,Lt),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const ht=220,Xt=150,Se=new Float32Array((ht+1)*(Xt+1)*2);for(let A=0,P=0;A<=Xt;A++){const D=42*Math.pow(A/Xt,2.1);for(let F=0;F<=ht;F++){const X=F/ht*ct;Se[P++]=Math.cos(X)*D,Se[P++]=Math.sin(X)*D}}const Tt=new Uint32Array(ht*Xt*6);for(let A=0,P=0;A<ht/11;A++)for(let D=0;D<Xt;D++)for(let F=A*11;F<A*11+11;F++){const X=D*(ht+1)+F,lt=X+ht+1;Tt[P++]=X,Tt[P++]=lt,Tt[P++]=X+1,Tt[P++]=X+1,Tt[P++]=lt,Tt[P++]=lt+1}const Ge=e.createVertexArray();e.bindVertexArray(Ge);const oa=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,oa),e.bufferData(e.ARRAY_BUFFER,Se,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const O=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,O),e.bufferData(e.ELEMENT_ARRAY_BUFFER,Tt,e.STATIC_DRAW),e.bindVertexArray(null);const ot=new Uint16Array(qe*Wt*6);for(let A=0,P=0;A<qe;A++)for(let D=0;D<Wt;D++){const F=A*(Wt+1)+D,X=F+Wt+1;ot[P++]=F,ot[P++]=X,ot[P++]=F+1,ot[P++]=F+1,ot[P++]=X,ot[P++]=X+1}const oe=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,oe),e.bufferData(e.ELEMENT_ARRAY_BUFFER,ot,e.STATIC_DRAW);const pe=1024,ne=e.createTexture();e.bindTexture(e.TEXTURE_2D,ne),e.texStorage2D(e.TEXTURE_2D,1,e.DEPTH_COMPONENT24,pe,pe),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_COMPARE_FUNC,e.LEQUAL);const me=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,me),e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,ne,0),e.bindFramebuffer(e.FRAMEBUFFER,null);const Ue={uN:0,uSh:1,uS:2,uBH:3,uBM:4},Ht={},jt={fl:a,ready:A=>{if(Ht[A])return Ht[A];const P=J[A].p;if(!e.getProgramParameter(P,e.LINK_STATUS))throw new Error("580 "+A+": "+e.getShaderInfoLog(J[A].v)+" "+e.getShaderInfoLog(J[A].f)+" "+e.getProgramInfoLog(P));const D={p:P};Ht[A]=D;const F=e.getProgramParameter(P,e.ACTIVE_UNIFORMS);for(let X=0;X<F;X++){const lt=e.getActiveUniform(P,X).name.replace("[0]","");D[lt]=e.getUniformLocation(P,lt)}e.useProgram(P);for(const X in Ue)D[X]&&e.uniform1i(D[X],Ue[X]);return D},fin:St,finS:p,gdK:Nt,grK:de,grid2:()=>{if(jt.g2)return jt.g2;const A=300,P=new Float32Array((ht+1)*(A+1)*2),D=new Uint32Array(ht*A*6);for(let yt=0,pt=0;yt<=A;yt++){const mt=42*Math.pow(yt/A,2.1);for(let Et=0;Et<=ht;Et++){const $=Et/ht*ct;P[pt++]=Math.cos($)*mt,P[pt++]=Math.sin($)*mt}}for(let yt=0,pt=0;yt<ht/11;yt++)for(let mt=0;mt<A;mt++)for(let Et=yt*11;Et<yt*11+11;Et++){const $=mt*(ht+1)+Et,vt=$+ht+1;D[pt++]=$,D[pt++]=vt,D[pt++]=$+1,D[pt++]=$+1,D[pt++]=vt,D[pt++]=vt+1}const F=e.createVertexArray();e.bindVertexArray(F);const X=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,X),e.bufferData(e.ARRAY_BUFFER,P,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0);const lt=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,lt),e.bufferData(e.ELEMENT_ARRAY_BUFFER,D,e.STATIC_DRAW),e.bindVertexArray(null),jt.g2={vao:F,gWi:A*11*6}},tN:ue,NZ:Lt,gVao:Ge,nGi:Tt.length,nGW:ht/11,gWi:Xt*11*6,tib:oe,tSh:ne,fbSh:me,SM:pe,eVao:e.createVertexArray(),fb:{}};return e.__c580=jt,jt}function Mo(e,a,U){const j=Math.min(U,e.getParameter(e.MAX_TEXTURE_SIZE),e.getParameter(e.MAX_RENDERBUFFER_SIZE));if(a.fb[j])return a.fb[j];const nt=a.fl?e.RGBA16F:e.RGBA8,Mt=e.createTexture();e.bindTexture(e.TEXTURE_2D,Mt),e.texStorage2D(e.TEXTURE_2D,1,nt,j,j),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const ft=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,ft),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Mt,0);let J=null;const et=e.getInternalformatParameter(e.RENDERBUFFER,nt,e.SAMPLES),St=Math.min(4,et&&et.length?et[0]:0);if(St>1){const p=e.createRenderbuffer(),Nt=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,p),e.renderbufferStorageMultisample(e.RENDERBUFFER,St,nt,j,j),e.bindRenderbuffer(e.RENDERBUFFER,Nt),e.renderbufferStorageMultisample(e.RENDERBUFFER,St,e.DEPTH_COMPONENT24,j,j),J=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,J),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,p),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,Nt),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE&&(J=null)}if(!J){e.bindFramebuffer(e.FRAMEBUFFER,ft);const p=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,p),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,j,j),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,p)}return e.bindRenderbuffer(e.RENDERBUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null),a.fb[j]={t:Mt,f:ft,fm:J,W:j}}const wt=(e,a,U)=>Math.max(a,Math.min(U,e)),K=(e,a,U)=>{const j=wt((U-e)/(a-e),0,1);return j*j*(3-2*j)},le=e=>{const a=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/a,e[1]/a,e[2]/a]},Be=(e,a)=>[e[1]*a[2]-e[2]*a[1],e[2]*a[0]-e[0]*a[2],e[0]*a[1]-e[1]*a[0]],Ae=(e,a)=>e[0]*a[0]+e[1]*a[1]+e[2]*a[2];function Pa(e,a,U,j,nt,Mt,ft,J){const et=1/Mt,St=(J+ft)/(ft-J),p=2*J*ft/(ft-J),Nt=[et*j[0],et*j[1],et*j[2],-et*Ae(j,a)],de=[et*nt[0],et*nt[1],et*nt[2],-et*Ae(nt,a)],st=[-U[0],-U[1],-U[2],Ae(U,a)];for(let Ft=0;Ft<4;Ft++)e[Ft*4]=Nt[Ft],e[Ft*4+1]=de[Ft],e[Ft*4+2]=St*st[Ft]+(Ft===3?p:0),e[Ft*4+3]=-st[Ft]}Aa.add({num:580,name:"Night Dive",fam:"Vistas",recipe:"Hovering over seagrass or a little seaweed forest at night, where your torch finds ribbon leaves swaying in the surge, a starfish on the sand and plankton glittering in the beam. Where you hover, what grows on the bottom and the moon change every mint. Drag to sweep the torch and the stirred water flares with green sparks, tap a spot to point the torch there, or hold to switch it off and let your eyes slowly get used to the sparks and the moonlit water.",interactive:"Drag to sweep the torch through the water: the beam follows your hand and the stirred water flares with green sparks; tap a spot to point the torch there for a moment; hold to switch the torch off and let your eyes slowly adapt to the sparks and the moonlit water.",music:!0,gl:!0,fps:30,seed:0,make(e){const a=e.gl,U=yo(a),j=e.size,nt=!!e.home,Mt=e.hash.slice(2);let ft=parseInt(Mt.slice(0,8),16)>>>0,J=parseInt(Mt.slice(8,16),16)>>>0,et=parseInt(Mt.slice(16,24),16)>>>0,St=parseInt(Mt.slice(24,32),16)>>>0;const p=()=>{ft>>>=0,J>>>=0,et>>>=0,St>>>=0;let t=ft+J|0;return ft=J^J>>>9,J=et+(et<<3)|0,et=et<<21|et>>>11,St=St+1|0,t=t+St|0,et=et+t|0,(t>>>0)/4294967296};for(let t=0;t<12;t++)p();const Nt=(t,o,n)=>{let r=0;for(const f of o)r+=f[1];let s=p()*r,i=o[o.length-1];for(const f of o)if(s-=f[1],s<0){i=f;break}return nt&&(i=o[n]),e.trait(t,i[0]),i[2]};let de=(parseInt(Mt.slice(56,64)||"0",16)^2135587861)>>>0;const st=()=>{de=de+1831565813>>>0;let t=de;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296},Ft=(t,o)=>{let n=0;for(let r=0;r<o.length;r++)if(n+=o[r],t*100<n)return r;return o.length-1},Lt=st(),ue=st(),ht=st(),Xt=st(),Se=st(),Tt=st(),Ge=st(),oa=st();let O=nt||Lt<.34?0:Lt<.55?5:Lt<.66?2:Lt<.76?5:Lt<.88?2:5,ot=O===1?ue<.6?1:2:O===2?ue<.7?3:4:O===3?5:O===4?6:O===5?ue<.5?7:8:O===6?ue<.5?10:9:0;const oe=Nt("Water",[["Clear",11,0],["Plankton bloom",7,1],["Milky after a storm",2,2]],0),pe=Nt("Torch",[["Warm white",10,0],["Cool LED",8,1],["Red filter",2,2]],0),ne=Nt("Moon",[["New moon",7,0],["Half moon",9,1],["Full moon",4,2]],1),me=Nt("Sparks",[["Faint",7,0],["Lively",10,1],["Noctiluca bloom",3,2]],1),Ue=Nt("Swell",[["Still",5,0],["Gentle surge",11,1],["Long swell",4,2]],1),Ht=Nt("Meadow",[["Dense",8,0],["Sand channels",9,1],["Eroded matte",3,2]],1),na=Nt("Depth",[["Six metres",5,6],["Ten metres",9,10],["Sixteen metres",4,16]],1);O&&e.trait("Meadow",["","Rock reef","Ripple field","Cobbles and boulders","Silt and burrows","Cystoseira forest","Broken rock"][O]);const _a=(()=>{const t=p()*12;return nt||t<10?1:2})();let jt=(parseInt(Mt.slice(40,48),16)^2654435769)>>>0,P=nt||(()=>{jt=jt+1831565813>>>0;let t=jt;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296})()*14<10?0:2,D=(parseInt(Mt.slice(48,56)||"0",16)^625341585)>>>0;const F=()=>{D=D+1831565813>>>0;let t=D;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296},X=(t,o)=>{let n=0;for(let r=0;r<o.length;r++)if(n+=o[r],t*100<n)return r;return o.length-1},lt=F(),yt=F(),pt=F(),mt=F(),Et=[F(),F(),F(),F()];let $=nt?0:X(lt,[46,22,12,20,0,0]),vt=nt?0:X(yt,[32,27,22,0,19]),gt=nt?0:X(pt,[45,30,25]);!nt&&!O&&!$&&!P&&ne===0&&($=3);const sa=O?"b"+O:$===3?"s":"";U.gdK(sa,O?"#define BOT "+O+`
`:$===3?`#define SND 1
`:"");const We=O===5?"f":"";U.grK(We,We?`#define FOR 1
`:"");let Ne=!1;if(fo){const t={"0xde3967de":{off:!0},"0x79926f40":{find:2,hold:0,seas:0},"0x549df33d":{find:3,hold:1,seas:2},"0x4ec9bad0":{find:1,hold:3,seas:0}}[e.hash.slice(0,10)];t&&(t.find!==void 0&&($=t.find),t.hold!==void 0&&(vt=t.hold),t.seas!==void 0&&(gt=t.seas),t.off!==void 0&&(Ne=t.off),t.view!==void 0&&(P=t.view))}const ra=[[.19,.06,.07],[.25,.1,.12],[.36,.19,.21]][oe],ia=[[.15,.18,.19],[.2,.25,.23],[.45,.5,.5]][oe],ca=[[1,.8,.56],[.86,.94,1],[1,.17,.07]][pe],Eo=[5.2,4.8,10][pe],fa=[0,.5,1][ne],ve=[.45,1,2.4][me],Fe=[.03,.3,.5][Ue],ge=[.9,1.05,.7][Ue],ha=p()*ct,dt=[Math.cos(ha),Math.sin(ha)],Yt=[p()*ct,p()*ct,p()*ct,[.22,.26,.5][Ht]],Kt=[p()*200,p()*200,[.3,.36,.42][Ht],.17],qa=(p()-.5)*.3,N=[-.85+p()*.15,0,Math.sin(qa),-Math.cos(qa)],kt=[[.5,.55,0,0][0],.7,5.2+p()*1.5,1.4+p()*.8];kt[0]=[.4,.55,.8][Ht];const Sa=(p()-.5)*.5,se=[Math.cos(Sa),Math.sin(Sa),p()*100,0],To=na,Ua=p()*ct,la=.6+p()*.5,Xe=[Math.cos(Ua)*Math.cos(la),Math.sin(la),Math.sin(Ua)*Math.cos(la),.5+.5*(1-fa*.6)],da=[.026,.06,.07].map(t=>t*(.3+1.4*fa)*(10/na)),tt=5,He=4.6;let Rt=[1,0];if(O){kt[2]=99;let t=Se*ct;ot===3&&(t=Math.atan2(dt[1],dt[0])+(Ge<.5?1:-1)*(Math.PI/2-.25-.35*oa)),Rt=[Math.cos(t),Math.sin(t)]}const Zt=Rt[0]*2.3,$t=Rt[1]*2.3,ua=-Rt[1],pa=Rt[0];let xe=null;const je=U.NZ,Q=(t,o)=>{const n=Math.floor(t),r=Math.floor(o);let s=t-n,i=o-r;s=s*s*(3-2*s),i=i*i*(3-2*i);const f=n&255,h=r&255,x=f+1&255,M=h+1&255,c=je[h*256+f],B=je[h*256+x],w=je[M*256+f],E=je[M*256+x],m=c+(B-c)*s,b=w+(E-w)*s;return(m+(b-m)*i)/255},ma=(t,o)=>Q(t,o)*.5+Q(t*2.03+17.1,o*2.03+17.1)*.3+Q(t*4.1+41.7,o*4.1+41.7)*.2,Da=(t,o)=>{const n=ma(t*Kt[3]+Kt[0],o*Kt[3]+Kt[1])-Kt[2]+.35*Math.exp(-((t-1.4)*(t-1.4)+(o+1)*(o+1))/6),r=t-N[0],s=o-N[1],i=r*N[2]+s*N[3],f=Math.abs(r*N[3]-s*N[2]),h=kt[0]*(.75+.5*Q(t*.7+3.1,o*.7+3.1)),x=O?3*(1-K(He,He+1.8,Math.hypot(t-Zt,o-$t))):0;return n-x-kt[1]*Math.exp(-(f/h)*(f/h))*K(-6,-3,i)},zt=(t,o)=>K(-.04,.05,Da(t,o)),Ro=(t,o)=>K(-.11,.1,Da(t,o)),Ye=(t,o)=>K(0,1.6,t*se[0]+o*se[1]-kt[2]-1.6*(Q(t*.22+se[2],o*.22+se[2])-.5)),at=(t,o)=>{const n=.09*Math.sin(t*.23+Yt[0])*Math.sin(o*.19+Yt[1])+.05*Math.sin(t*.11-o*.17+Yt[2]),r=Ye(t,o),s=Ro(t,o)*(1-r),i=r*kt[3]*(.55+.9*ma(t*.5+7.3,o*.5+7.3))+K(.3,1,r)*.35*(Q(t*1.7,o*1.7)-.5);return n+Yt[3]*s*(.85+.3*Q(t*1.3,o*1.3))+i+(xe?xe.h(t,o):0)},Bo=(t,o)=>O?1-K(.8,.97,Math.max(Math.abs(t-Zt),Math.abs(o-$t))/tt):0,Ao=(t,o,n)=>{const r=(t*dt[0]+o*dt[1])*.9,s=Math.sin(ge*n-r)+.3*Math.sin(2.13*ge*n-1.9*r+1.3)+.2*Math.sin(.37*ge*n+.4*r);return[dt[0]*(Fe*s+.55)+(Q(t*.6+n*.35,o*.6+3)-.5)*.25,dt[1]*(Fe*s+.55)+(Q(t*.6+7,o*.6+n*.31)-.5)*.25]};let Bt=[];if(O===1){const o=2*tt/384,n=new Float32Array(384*384),r=new Float32Array(384*384);let s=Tt*4294967296>>>0;const i=()=>{s=s+1831565813>>>0;let d=s;return d=Math.imul(d^d>>>15,d|1),d^=d+Math.imul(d^d>>>7,d|61),((d^d>>>14)>>>0)/4294967296},f=(d,g)=>[Zt+Rt[0]*d+ua*g,$t+Rt[1]*d+pa*g],h=O===1,x=(d,g,_,I)=>{const L=f(d,g);if(Math.abs(d)>tt-.4-_||Math.abs(g)>tt-.4-_)return!1;if(!I){if(Math.hypot(d+2.3,g)<_+(h?.55:.25)||ot===2&&Math.abs(g)<.3+_*.8&&d>-1.9-_&&d<1.6)return!1;for(const z of Bt)if(Math.hypot(L[0]-z.x,L[1]-z.z)<(h?.82:1.05)*(_+z.r))return!1}return Bt.push({x:L[0],z:L[1],r:_,el:.65+.35*i(),an:i()*Math.PI,hg:_*(h?.55+.35*i():.4+.15*i()),bur:_*(.05+.15*i()),sd:i()*200,tx:(i()-.5)*.5,tz:(i()-.5)*.5}),!0};if(h){if(ot===1)for(let d=0;d<4;d++)x(-1.2+d*1.15+(i()-.5)*.2,.95-d*.3+(i()-.5)*.2,.55+.35*i(),!0);else{const d=.82+.15*i(),g=.78+.15*i();x(.3,-(d+.14),d,!0),x(.4,g+.14,g,!0),x(2.1,(i()-.5)*.3,.65+.2*i(),!0)}for(let d=0;d<500&&Bt.length<70;d++)x((i()*2-1)*tt,(i()*2-1)*tt,.2+.75*i()*i(),!1)}else for(let d=0;d<1400&&Bt.length<260;d++)x((i()*2-1)*tt,(i()*2-1)*tt,.08+.1*i(),!1);const M=Zt-tt,c=$t-tt;for(const d of Bt){const g=Math.cos(d.an),_=Math.sin(d.an),I=d.r*1.15,L=Math.max(0,Math.floor((d.x-I-M)/o)),z=Math.min(383,Math.ceil((d.x+I-M)/o)),C=Math.max(0,Math.floor((d.z-I-c)/o)),l=Math.min(383,Math.ceil((d.z+I-c)/o));for(let v=C;v<=l;v++)for(let y=L;y<=z;y++){const S=M+(y+.5)*o,k=c+(v+.5)*o,q=S-d.x,H=k-d.z,W=(q*g+H*_)/d.r,ut=(-q*_+H*g)/(d.r*d.el);let bt=Math.hypot(W,ut);if(h&&(bt*=1+.4*(Q(S*1.4+d.sd,k*1.4)-.5)+.16*(Q(S*4.3+d.sd,k*4.3)-.5)),bt>=1)continue;let it=d.hg*Math.pow(1-Math.pow(bt,h?3.2:2),h?.38:.55)-d.bur;if(h){const ee=K(1,.6,bt);it+=(d.tx*q+d.tz*H)*ee+d.r*ee*(.2*(ma(S*1.7+d.sd,k*1.7)-.5)+.1*(1-Math.abs(2*Q(S*4.1,k*4.1+d.sd)-1))+.05*(1-Math.abs(2*Q(S*9.3+d.sd,k*9.3)-1)));const ae=.055+.03*(d.sd%1),Vt=it/ae,he=Vt-Math.floor(Vt);it=Math.max(0,(Math.floor(Vt)+K(.55,.95,he))*ae*.6+it*.4+d.r*.01*(Q(S*17,k*17)-.5))}const Ot=v*384+y;it>n[Ot]&&(n[Ot]=it,r[Ot]=it/(d.hg-d.bur))}}const B=(d,g)=>{const _=new Float32Array(147456),I=new Float32Array(384*384),L=2*g+1;for(let z=0;z<384;z++){let C=0;for(let l=-g;l<=g;l++)C+=d[z*384+wt(l,0,383)];for(let l=0;l<384;l++)_[z*384+l]=C/L,C+=d[z*384+Math.min(383,l+g+1)]-d[z*384+Math.max(0,l-g)]}for(let z=0;z<384;z++){let C=0;for(let l=-g;l<=g;l++)C+=_[wt(l,0,383)*384+z];for(let l=0;l<384;l++)I[l*384+z]=C/L,C+=_[Math.min(383,l+g+1)*384+z]-_[Math.max(0,l-g)*384+z]}return I},w=B(n,2),E=B(n,9),m=new Float32Array(384*384*4),b=new Uint8Array(384*384*4);for(let d=0;d<384;d++)for(let g=0;g<384;g++){const _=d*384+g,I=n[_],L=(n[d*384+Math.min(383,g+1)]-n[d*384+Math.max(0,g-1)])/(2*o),z=(n[Math.min(383,d+1)*384+g]-n[Math.max(0,d-1)*384+g])/(2*o),C=1/Math.sqrt(1+L*L+z*z),l=E[_]-I,v=M+(g+.5)*o,y=c+(d+.5)*o,S=1-wt(l*(h?2.6:4),0,h?.88:.6)*(h?1:.8);m[_*4]=I,m[_*4+1]=L,m[_*4+2]=z,m[_*4+3]=S;const k=K(.012,.045,I);if(h){const q=r[_],H=k*K(.45,.8,C)*K(.35,.7,q)*K(.5,.72,Q(v*4.6+5,y*4.6)*.6+Q(v*11,y*11+3)*.4),W=k*K(.4,.75,C)*K(.2,.55,Q(v*2.3+50,y*2.3)*.8+.3*q),ut=k*K(.75,.35,C)*K(.55,.2,q)*K(.05,.3,l+.1),bt=Math.max(1-k,k*K(.85,.97,C)*K(.004,.012,w[_]-I+.002)*.9);b[_*4]=H*255,b[_*4+1]=W*255,b[_*4+2]=ut*255,b[_*4+3]=bt*255}else b[_*4+3]=(1-k)*255}const V=(d,g,_)=>{const I=a.createTexture();return a.bindTexture(a.TEXTURE_2D,I),a.texImage2D(a.TEXTURE_2D,0,d,384,384,0,a.RGBA,g,_),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),I};xe={tH:V(a.RGBA16F,a.FLOAT,m),tM:V(a.RGBA8,a.UNSIGNED_BYTE,b),h:(d,g)=>{const _=(d-M)/o-.5,I=(g-c)/o-.5;if(_<0||I<0||_>=383||I>=383)return 0;const L=_|0,z=I|0,C=_-L,l=I-z,v=z*384+L;return(n[v]*(1-C)+n[v+1]*C)*(1-l)+(n[v+384]*(1-C)+n[v+384+1]*C)*l}},a.bindTexture(a.TEXTURE_2D,null)}if(O===3){const o=2*tt/512,n=new Float32Array(512*512),r=new Float32Array(512*512),s=new Int16Array(512*512).fill(-1);let i=Tt*4294967296>>>0;const f=()=>{i=i+1831565813>>>0;let l=i;return l=Math.imul(l^l>>>15,l|1),l^=l+Math.imul(l^l>>>7,l|61),((l^l>>>14)>>>0)/4294967296},h=Zt-tt,x=$t-tt,M=.6,c=Math.ceil(2*tt/M)+1,B=[];for(let l=0;l<c*c;l++)B.push([]);const w=(l,v,y)=>{if(l<h+.25+y||v<x+.25+y||l>h+2*tt-.25-y||v>x+2*tt-.25-y||y>.22&&Math.hypot(l,v)<1.1+y)return;const S=Math.floor((l-h)/M),k=Math.floor((v-x)/M),q=Math.ceil((y+.65)/M);for(let ut=Math.max(0,k-q);ut<=Math.min(c-1,k+q);ut++)for(let bt=Math.max(0,S-q);bt<=Math.min(c-1,S+q);bt++)for(const it of B[ut*c+bt])if(Math.hypot(l-it.x,v-it.z)<.9*(y+it.r))return;const H=f(),W={x:l,z:v,r:y,el:.6+.4*f(),an:f()*Math.PI,hg:y*(H<.25?.3+.12*f():.42+.3*f()),bur:y*(.03+.1*f()),sd:f()*200,tint:f(),tx:f()-.5,tz:f()-.5,cap:H<.25?.75+.15*f():2,pe:1.8+2.4*f()};B[k*c+S].push(W),Bt.push(W)},E=5+(f()*6|0);for(let l=0;l<60&&Bt.length<E;l++)w(h+f()*2*tt,x+f()*2*tt,.3+.28*f());for(let l=0;l<3e4&&Bt.length<7e3;l++){const v=h+f()*2*tt,y=x+f()*2*tt,S=.5+1.1*K(.25,.75,Q(v*.35+Tt*50,y*.35));w(v,y,(.04+.2*Math.pow(f(),1.6))*S*(l<6e3?1.3:1))}const m=new Float32Array(512*512).fill(9),b=new Float32Array(512*512).fill(9),V=new Float32Array(512*512),d=new Float32Array(512*512);for(let l=0;l<Bt.length;l++){const v=Bt[l],y=Math.cos(v.an),S=Math.sin(v.an),k=v.r*1.5,q=Math.max(0,Math.floor((v.x-k-h)/o)),H=Math.min(511,Math.ceil((v.x+k-h)/o)),W=Math.max(0,Math.floor((v.z-k-x)/o)),ut=Math.min(511,Math.ceil((v.z+k-x)/o));for(let bt=W;bt<=ut;bt++)for(let it=q;it<=H;it++){const Ot=h+(it+.5)*o-v.x,ee=x+(bt+.5)*o-v.z,ae=(Ot*y+ee*S)/v.r,Vt=(-Ot*S+ee*y)/(v.r*v.el),he=Math.hypot(ae,Vt)*(1+.18*(Q(ae*1.3+v.sd,Vt*1.3+v.sd)-.5)+.06*(Q(ae*3.7+v.sd,Vt*3.7)-.5)),Dt=bt*512+it;he<m[Dt]?(b[Dt]=m[Dt],m[Dt]=he,s[Dt]=l,V[Dt]=ae,d[Dt]=Vt):he<b[Dt]&&(b[Dt]=he)}}for(let l=0;l<512*512;l++){if(s[l]<0)continue;const v=Bt[s[l]],y=V[l],S=d[l],k=Math.max(2*m[l]/(m[l]+b[l]),m[l]*.92);if(k>=1)continue;let q=v.hg*Math.pow(1-Math.pow(k,v.pe),.5)+(v.tx*y+v.tz*S)*v.hg*.4*(1-k*k);const H=v.hg*v.cap;q>H&&(q=H+(q-H)*.2),q+=v.r*(.07*(Q(y*2.6+v.sd,S*2.6)-.5)+.025*(Q(y*8,S*8+v.sd)-.5))-v.bur,q>0?(n[l]=q,r[l]=wt((q+v.bur)/v.hg,0,1)):s[l]=-1}const g=(l,v)=>{const y=new Float32Array(262144),S=new Float32Array(512*512),k=2*v+1;for(let q=0;q<512;q++){let H=0;for(let W=-v;W<=v;W++)H+=l[q*512+wt(W,0,511)];for(let W=0;W<512;W++)y[q*512+W]=H/k,H+=l[q*512+Math.min(511,W+v+1)]-l[q*512+Math.max(0,W-v)]}for(let q=0;q<512;q++){let H=0;for(let W=-v;W<=v;W++)H+=y[wt(W,0,511)*512+q];for(let W=0;W<512;W++)S[W*512+q]=H/k,H+=y[Math.min(511,W+v+1)*512+q]-y[Math.max(0,W-v)*512+q]}return S},_=g(n,4),I=g(n,12),L=new Float32Array(512*512*4),z=new Uint8Array(512*512*4);for(let l=0;l<512;l++)for(let v=0;v<512;v++){const y=l*512+v,S=n[y],k=h+(v+.5)*o,q=x+(l+.5)*o,H=(n[l*512+Math.min(511,v+1)]-n[l*512+Math.max(0,v-1)])/(2*o),W=(n[Math.min(511,l+1)*512+v]-n[Math.max(0,l-1)*512+v])/(2*o),ut=1/Math.sqrt(1+H*H+W*W),bt=Math.max(_[y]-S,0)+.5*Math.max(I[y]-S,0);L[y*4]=S,L[y*4+1]=H,L[y*4+2]=W,L[y*4+3]=1-wt(bt*12,0,.9);const it=K(.003,.015,S),Ot=r[y],ee=s[y]>=0?Bt[s[y]].tint:0,ae=s[y]>=0&&Bt[s[y]].sd%1<.4?1:.12,Vt=it*K(.55,.9,Ot)*K(.55,.85,ut)*K(.48,.66,Q(k*5.3+ee*60,q*5.3)*.7+Q(k*15,q*15+3)*.3)*ae,he=it*K(.4,.8,ut)*K(.25,.65,Ot)*(.45+.55*Q(k*3.1+ee*9,q*3.1)),Dt=Math.max(1-it,it*K(.93,.99,ut)*K(.35,.15,Ot)*.8);z[y*4]=Vt*255,z[y*4+1]=he*255,z[y*4+2]=ee*255,z[y*4+3]=Dt*255}const C=(l,v,y)=>{const S=a.createTexture();return a.bindTexture(a.TEXTURE_2D,S),a.texImage2D(a.TEXTURE_2D,0,l,512,512,0,a.RGBA,v,y),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),S};xe={tH:C(a.RGBA16F,a.FLOAT,L),tM:C(a.RGBA8,a.UNSIGNED_BYTE,z),h:(l,v)=>{const y=(l-h)/o-.5,S=(v-x)/o-.5;if(y<0||S<0||y>=511||S>=511)return 0;const k=y|0,q=S|0,H=y-k,W=S-q,ut=q*512+k;return(n[ut]*(1-H)+n[ut+1]*H)*(1-W)+(n[ut+512]*(1-H)+n[ut+512+1]*H)*W}},a.bindTexture(a.TEXTURE_2D,null)}const be=N[2],we=N[3],re=-N[3],ie=N[2],La=(t,o,n,r)=>{let s=0;for(;s<3&&!(zt(t+n*s,o+r*s)>.5);s+=.04);return s};let R=null;if($===1){const t=1.3+Et[0]*1.8,o=Et[1]<.5?-1:1,n=N[0]+be*t,r=N[1]+we*t,s=La(n,r,re*o,ie*o),i=n+re*o*s,f=r+ie*o*s;for(const h of[.75,.6,.48]){const x=i-re*o*h-be*.3,M=f-ie*o*h-we*.3,c=at(x,M);!R&&s<2.9&&zt(x,M)<.4&&(R={e:[x,c+.4,M],aim:[i+be*.3,c+Yt[3]*.5,f+we*.3],ex:.3})}}else if($===2)for(let t=0;t<40&&!R;t++){const o=Et[0]*ct+t*2.4,n=1.2+3*((Et[1]+t*.37)%1),r=Math.cos(o)*n,s=Math.sin(o)*n,i=r+dt[0]*2.4,f=s+dt[1]*2.4;zt(r,s)>.6&&Ye(r,s)<.01&&zt(i,f)>.6&&zt(r+dt[0]*1.2,s+dt[1]*1.2)>.6&&i*i+f*f<64&&(R={e:[r,at(r,s)+1.4,s],aim:[i,at(i,f)+.55,f],gaze:[r+dt[0]*1.5,at(r,s)+.5,s+dt[1]*1.5],ex:.2})}else if($===3)for(let t=0;t<12&&!R;t++){const o=.9+(Et[0]+t*.29)%1*2.4,n=N[0]+be*o+re*(Et[1]-.5)*.15,r=N[1]+we*o+ie*(Et[1]-.5)*.15,s=(Et[2]-.5)*1.4,i=be*Math.cos(s)-re*Math.sin(s),f=we*Math.cos(s)-ie*Math.sin(s);zt(n,r)<.15&&(R={e:[n-i*.2,at(n,r)+.62,r-f*.2],aim:[n,at(n,r),r],ex:.5})}$&&!R&&($=0),!O&&vt===1&&($===1||!$&&!P&&ne===0)&&(vt=0);let De=null;if(O){$=0,P=0;const t=(s,i)=>[Zt+Rt[0]*s+ua*i,$t+Rt[1]*s+pa*i],o=s=>at(s[0],s[1]),n=[0,0];let r=0;for(let s=0;s<ct;s+=.5)r=Math.max(r,at(Math.cos(s)*.35,Math.sin(s)*.35));if(ot===1){const s=Bt[1],i=Bt[2];R={e:[n[0],r+.8,n[1]],aim:[s.x,at(s.x,s.z)*.8,s.z],gaze:[(s.x+i.x)/2,at(s.x,s.z)*.5,(s.z+i.z)/2],ex:.3}}else if(ot===2){const s=t(.5,0),i=t(.25,0);R={e:[n[0],r+1.05,n[1]],aim:[s[0],o(s)+.1,s[1]],gaze:[i[0],o(i)+.3,i[1]],ex:.3}}else if(ot===3){const s=t(1.2,0),i=t(.9,-.15);R={e:[n[0],r+.25,n[1]],aim:[i[0],o(i)+.02,i[1]],gaze:[s[0],o(s)-.02,s[1]],ex:.3}}else if(ot===7){const s=t(-1.05,0),i=t(-1.15,.1);R={e:[n[0],r+.5,n[1]],aim:[i[0],o(i)+.22,i[1]],gaze:[s[0],o(s)+.08,s[1]],ex:.3}}else if(ot===8){const s=t(-1.05,0);R={e:[n[0],r+1.2,n[1]],aim:[s[0],o(s)+.3,s[1]],gaze:[s[0],o(s)+.15,s[1]],ex:.3}}else{const s=t(-1.15,0);R={e:[n[0],r+.72,n[1]],aim:[s[0],o(s),s[1]],ex:.3}}vt===2&&(ot===2||O>=2)&&(vt=0)}if(O===2&&ht<.55&&ne>0||O===4&&ht<.35){vt=5,R.gaze||(R.gaze=R.aim.slice());const t=R.e[0],o=R.e[2],n=R.aim[0]-t,r=R.aim[2]-o,s=Math.hypot(n,r)||1,i=n/s,f=r/s,h=t-f*.3+i*.25,x=o+i*.3+f*.25;De=[h,at(h,x)+.05,x];const M=h+i*2.4+f*.25,c=x+f*2.4-i*.25;R.aim=[M,at(M,c)+.03,c]}let Qt=null;if(!R&&P===0){const t=N[0]+be*.92,o=N[1]+we*.92,n=La(t,o,-re,-ie),r=t-re*(n-.1),s=o-ie*(n-.1),i=N[0]+re*.1-be*.2,f=N[1]+ie*.1-we*.2,h=Math.hypot(r-i,s-f)||1;Qt=[i+(r-i)/h*.3,.95,f+(s-f)/h*.3]}const ka=R?[R.e[0],R.e[2]]:[0,0],Me=9.5,Ke=.3,va=4.2,Ze=[],Ia=[],No=[1.06,.5,.72][gt],xa=R?R.e[0]:Qt?Qt[0]:N[0]-N[3]*.1-N[2]*.2,ba=R?R.e[2]:Qt?Qt[2]:N[1]+N[2]*.1-N[3]*.2,Fo=R?R.ex:.6,Ca=(t,o,n,r,s,i,f,h,x)=>{Math.hypot(o-xa,r-ba)<=Fo||gt===1&&(h>.7?x<.8:x<.25)||gt===2&&(h>.55?x<.85:x<.2)||t.push(o,n,r,s*(gt===0?1:No*(gt===1?.9+.3*x:1)),i,f,gt===1?h*.55:h,x)},Oa=(t,o)=>{let n=Math.imul(t*73856093^o*19349663,2654435761)>>>0;return n^=n>>>15,n=Math.imul(n,2246822507)>>>0,n^=n>>>13,(n>>>0)/4294967296};for(let t=-Me;t<Me;t+=Ke)for(let o=-Me;o<Me;o+=Ke){const n=t+p()*Ke,r=o+p()*Ke,s=p(),i=p();if(n*n+r*r>Me*Me)continue;const f=zt(n,r);if(f<.5||Ye(n,r)>.06||s>(Ht===0?1:.93))continue;const h=K(.5,.9,f),x=3+(i*(Ht===0?6:5)|0)+(n*n+r*r<9?1:0),M=.05+.08*p(),c=p()*ct,B=(.55+.3*h)*(.9+.35*Q(n*.8+40,r*.8)),w=at(n,r)-.03,E=f<.62,m=n*n+r*r<va*va,b=R?Math.hypot(n-ka[0],r-ka[1])<va:m,V=b?Ze:Ia;for(let d=0;d<x;d++){const g=p()*ct,_=M*Math.sqrt(p()),I=n+Math.cos(g)*_,L=r+Math.sin(g)*_;if(E&&zt(I,L)<.45)continue;const z=w,C=4+(p()*4|0),l=c+(p()-.5)*.9,v=.85+.3*p();for(let y=0;y<C;y++){const S=(y+.5)/C,k=p();if(!m&&y&1&&y!==C-1){if(b){const q=Oa(t*40+d,o*40+y),H=Oa(o*40+y,t*40+d+7);Ca(V,I,z,L,(.22+.6*S+.12*q)*B*v,l+(y&1?Math.PI:0)+(H-.5)*.35,.03+.1*S+.04*q,wt(S*.85+H*.3,0,1),k)}continue}Ca(V,I,z,L,(.22+.6*S+.12*p())*B*v,l+(y&1?Math.PI:0)+(p()-.5)*.35,.03+.1*S+.04*p(),wt(S*.85+p()*.3,0,1),k)}}}{const t=O?O===2?5:0:[50,12,220][gt],o=R?R.e[0]:xa,n=R?R.e[2]:ba;for(let r=0,s=0;r<t*5&&s<t;r++){const i=r*.618%1*ct,f=3*Math.sqrt(r*.382%1),h=F()<.7,x=o+(h?Math.cos(i*7%ct)*f*(r%5)/4+(F()-.5)*.5:(F()*2-1)*3.4),M=n+(h?Math.sin(i*7%ct)*f*(r%5)/4+(F()-.5)*.5:(F()*2-1)*3.4),c=zt(x,M),B=F(),w=.12+.3*F(),E=Math.atan2(dt[1],dt[0])+(F()-.5)*2,m=F();c>.55||Ye(x,M)>.05||B>.25+2.2*c*(1-c)*2||Math.hypot(x-xa,M-ba)<.2||(Ze.push(x,at(x,M)+.004,M,w,E,0,2,m),s++)}}const go=(t,o)=>{const n=N[0]+N[2]*t,r=N[1]+N[3]*t,s=-N[3]*o,i=N[2]*o;let f=0;for(;f<3&&!(zt(n+s*f,r+i*f)>.5);f+=.05);return[n+s*f,r+i*f,f]},Jt=-N[3],te=N[2],Va=go(.85+p()*.15,-1),It=[{x:Va[0]+Jt*.1,z:Va[1]+te*.1,yaw:Math.atan2(Jt,te)+(p()-.5)*.4,turn:0,tt:-9,sd:p()}];_a===2&&It.push({x:It[0].x-N[2]*.22+Jt*.05,z:It[0].z-N[3]*.22+te*.05,yaw:It[0].yaw+.5,turn:0,tt:-9,sd:p()});for(const t of It)t.y=at(t.x,t.z),t.H=.4+.12*t.sd,t.bL=.5+p()*.1,t.bAz=Math.atan2(te,Jt)+(p()-.5)*.6,t.bs=p(),Ze.push(t.x,t.y-.03,t.z,t.bL,t.bAz,.14,.5,t.bs);const Ga=It[0],rt={x:Ga.x+Jt*(.3+p()*.15)+N[2]*.6,z:Ga.z+te*(.3+p()*.15)+N[3]*.6,rot:p()*ct,curl:p()};rt.y=at(rt.x,rt.z);const Ct=P===2?[N[0]+N[2]*2.1+Jt*.05,0,N[1]+N[3]*2.1+te*.05]:null;Ct&&(Ct[1]=at(Ct[0],Ct[2])+.06);const ye=17,zo=N[0]+Jt*.1-N[2]*.2,Po=N[1]+te*.1-N[3]*.2,wa=t=>{const o=new Float32Array(t),n=o.length/8,r=new Uint8Array(n),s=new Int32Array(ye+1);for(let c=0;c<n;c++){const B=o[c*8]-zo,w=o[c*8+2]-Po;r[c]=B*B+w*w<2.25?0:1+Math.min(15,(Math.atan2(w,B)/ct+.5)*16|0),s[r[c]+1]++}for(let c=0;c<ye;c++)s[c+1]+=s[c];const i=new Float32Array(o.length),f=s.slice(0,ye),h=new Float32Array(ye*6);for(let c=0;c<ye;c++)h.set([1e9,1e9,1e9,-1e9,-1e9,-1e9],c*6);for(let c=0;c<n;c++){const B=r[c],w=f[B]++*8,E=o[c*8+3]+.05,m=B*6;for(let b=0;b<8;b++)i[w+b]=o[c*8+b];h[m]=Math.min(h[m],o[c*8]-E),h[m+1]=Math.min(h[m+1],o[c*8+1]-.05),h[m+2]=Math.min(h[m+2],o[c*8+2]-E),h[m+3]=Math.max(h[m+3],o[c*8]+E),h[m+4]=Math.max(h[m+4],o[c*8+1]+E),h[m+5]=Math.max(h[m+5],o[c*8+2]+E)}const x=a.createVertexArray();a.bindVertexArray(x);const M=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,M),a.bufferData(a.ARRAY_BUFFER,i,a.STATIC_DRAW);for(let c=0;c<2;c++)a.enableVertexAttribArray(c),a.vertexAttribPointer(c,4,a.FLOAT,!1,32,c*16),a.vertexAttribDivisor(c,1);return a.bindVertexArray(null),{vao:x,b:M,n,st:s,box:h}},$e=[],Wa=[];if(O===5){let t=(Tt*4294967296^5369127)>>>0;const o=()=>{t=t+1831565813>>>0;let c=t;return c=Math.imul(c^c>>>15,c|1),c^=c+Math.imul(c^c>>>7,c|61),((c^c>>>14)>>>0)/4294967296},n=vt===1?-.32:.3,r=Rt[0]*.6-Rt[1]*n,s=Rt[1]*.6+Rt[0]*n,i=.4,f=ot===7?.8:.5,h=R.gaze[0]-R.e[0],x=R.gaze[2]-R.e[2],M=Math.hypot(h,x)||1;for(let c=-tt+.3;c<tt-.3;c+=i)for(let B=-tt+.3;B<tt-.3;B+=i){const w=o(),E=o(),m=o(),b=Zt+Rt[0]*(c+(w-.5)*i*.9)+ua*(B+(E-.5)*i*.9),V=$t+Rt[1]*(c+(w-.5)*i*.9)+pa*(B+(E-.5)*i*.9),d=Math.hypot(b,V);if(Math.hypot(b-Zt,V-$t)>He+.5||d<f||Math.hypot(b-r,V-s)<.6)continue;const g=(b*h+V*x)/M/d>.8&&d<2.4,_=Q(b*.55+Tt*90,V*.55+11)*.7+Q(b*1.4+5,V*1.4+Tt*70)*.3;if(!g&&_<.3+.1*m)continue;const I=o()<.16,L=I?.05+.05*o():.06+.1*o(),z=I?.5+.35*o():.19+.16*o(),C=I?6+(o()*4|0):38+(o()*16|0),l=at(b,V)-.01,v=o()*ct,y=(I?4:3)+L;$e.push(b,l,V,L+.02,v,-1,y,o()),I||Wa.push([b,l+L+z*.45,V,d,(b*h+V*x)/M/d]);for(let S=0;S<C;S++){const k=v+S*2.4+(o()-.5)*.8,q=Math.sqrt(o());$e.push(b,l,V,z*(.6+.5*o())*(I?1:1.05-.2*q),k,I?.08+.45*q:.2+1.5*q,y,o())}}}if(O===5){let t=null,o=1e9;for(const n of Wa){const r=ot===7?n[4]>.82?n[3]+3*(1-n[4]):1e9:Math.hypot(n[0]-R.gaze[0],n[2]-R.gaze[2]);r<o&&(o=r,t=n)}t&&(R.aim=[t[0],t[1],t[2]],ot===7&&(R.gaze=[t[0]*1.5,t[1]*.55,t[2]*1.5]))}const Xa=wa(Ze),_o=wa(Ia),Qe=$e.length?wa($e):null,Ha=200,Ma=new Float32Array(Ha*24),ya=a.createVertexArray();a.bindVertexArray(ya);const ja=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,ja),a.bufferData(a.ARRAY_BUFFER,Ma.byteLength,a.DYNAMIC_DRAW);for(let t=0;t<6;t++)a.enableVertexAttribArray(t),a.vertexAttribPointer(t,4,a.FLOAT,!1,96,t*16),a.vertexAttribDivisor(t,1);a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,U.tib),a.bindVertexArray(null);const Ya=900,Ka=new Float32Array(Ya*8),Za=a.createVertexArray();a.bindVertexArray(Za);const $a=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,$a),a.bufferData(a.ARRAY_BUFFER,Ka.byteLength,a.DYNAMIC_DRAW);for(let t=0;t<2;t++)a.enableVertexAttribArray(t),a.vertexAttribPointer(t,4,a.FLOAT,!1,32,t*16);a.bindVertexArray(null);const Pt=Mo(a,U,j);let ze=0;const qo=(t,o,n,r,s,i,f,h,x,M,c,B,w,E)=>{if(ze>=Ha)return;const m=ze++*24,b=Ma;b[m]=t[0],b[m+1]=t[1],b[m+2]=t[2],b[m+3]=s,b[m+4]=o[0],b[m+5]=o[1],b[m+6]=o[2],b[m+7]=i,b[m+8]=n[0],b[m+9]=n[1],b[m+10]=n[2],b[m+11]=f,b[m+12]=r[0],b[m+13]=r[1],b[m+14]=r[2],b[m+15]=h,b[m+16]=x[0],b[m+17]=x[1],b[m+18]=x[2],b[m+19]=M,b[m+20]=B,b[m+21]=w,b[m+22]=E,b[m+23]=c},So=(t,o,n,r)=>{const s=Math.cos(o),i=Math.sin(o),f=Math.cos(n),h=Math.sin(n),x=Math.cos(r),M=Math.sin(r);return c=>{let B=c[0]*x-c[1]*M,w=c[0]*M+c[1]*x,E=c[2];const m=w*f-E*h,b=w*h+E*f;return w=m,E=b,[t[0]+B*s+E*i,t[1]+w,t[2]-B*i+E*s]}},Go=(t,o)=>{const n=t([0,0,0]),r=t(o);return[r[0]-n[0],r[1]-n[1],r[2]-n[2]]},Wo=(t,o,n,r,s,i,f,h,x,M)=>{const c=[Math.cos(s),Math.sin(s)],B=Ao(t,n,M),w=t*3.1+n*2.3,E=8,m=r/E;let b=t,V=o,d=n;const g=Math.floor(x*E),_=x*E-g,I=L=>{const z=2.7*Math.pow(L,1.25),C=.035*Math.sin(M*1.3+L*4+w),l=i+.1*L+.25*f*L*L;return[c[0]*l+B[0]*z-c[1]*C,c[1]*l+B[1]*z+c[0]*C]};for(let L=0;L<=g&&L<E;L++){const z=L<g?1:_;if(z<=0)break;const C=I((L+.5)/E),l=Math.hypot(C[0],C[1])||1e-4,v=Math.min(l,1.5);b+=C[0]/l*Math.sin(v)*m*z,V+=Math.cos(v)*m*z,d+=C[1]/l*Math.sin(v)*m*z}return[b,V,d]};function Qa(t){if(ze=0,!!Ja){{const o=So([rt.x,rt.y+.004,rt.z],rt.rot,0,0);for(let n=0;n<5;n++){const r=n/5*ct+Math.sin(n*3.1+rt.curl*9)*.12,s=[Math.sin(r),0,Math.cos(r)],i=[Math.cos(r),0,-Math.sin(r)],f=(rt.curl-.5)*.05*(n&1?1:-1),h=(B,w,E)=>o([s[0]*B+i[0]*w,E,s[2]*B+i[2]*w]),x=(B,w)=>at(B,w)+.004,M=h(.105,f*1.6,0),c=x(M[0],M[2])-rt.y;qo(h(0,0,.009),h(.035,f*.2,.009),h(.07,f*.8,.006+c*.5),h(.11,f*1.6,.003+c),.021,.013,.005,5,[0,1,0],.3,1,2,rt.curl+n,0)}}a.bindBuffer(a.ARRAY_BUFFER,ja),a.bufferSubData(a.ARRAY_BUFFER,0,Ma,0,ze*24)}}const Le=700,G=new Float32Array(Le*10);let Ea=0;for(let t=0;t<Le;t++)G[t*10+6]=99;const Ta=(t,o,n,r,s,i,f,h,x,M=.5)=>{for(let c=0;c<r;c++){const B=Ea*10;Ea=(Ea+1)%Le,G[B]=t+(p()-.5)*s,G[B+1]=o+(p()-.5)*s,G[B+2]=n+(p()-.5)*s,G[B+3]=i+(p()-.5)*.25,G[B+4]=f+(p()-.5)*.25,G[B+5]=h+(p()-.5)*.25,G[B+6]=-p()*M,G[B+7]=.15+p()*.5,G[B+8]=x*(.3+p()*p()*1.4),G[B+9]=p()}},ke=It[0],Y=R?R.e.slice():[N[0]+Jt*.1-N[2]*.2,1.05,N[1]+te*.1-N[3]*.2];Qt&&(Y[0]=Qt[0],Y[1]=Qt[1],Y[2]=Qt[2]);let _t=Math.atan2(ke.x-Y[0],-(ke.z-Y[2]))+.06,Ee=Math.atan2(ke.y+.2-Y[1],Math.hypot(ke.x-Y[0],ke.z-Y[2]))+.14;P===0&&(_t-=.14);const Uo=60*Math.PI/180,Ut=Math.tan(Uo/2);let Ie=null;if(R){Ie=R.aim.slice();const t=R.gaze||R.aim;_t=Math.atan2(t[0]-Y[0],-(t[2]-Y[2])),Ee=Math.atan2(t[1]-Y[1],Math.hypot(t[0]-Y[0],t[2]-Y[2])),$===1&&(Ee+=.08)}else P===2&&(Ie=Ct.slice(),_t=Math.atan2(Ct[0]-Y[0],-(Ct[2]-Y[2]))+.12,Ee=Math.atan2(Ct[1]+.45-Y[1],Math.hypot(Ct[0]-Y[0],Ct[2]-Y[2])));if($===3){const t=R.gaze||Ie;rt.x=t[0]+.2*Math.cos(_t)+.1*Math.sin(_t),rt.z=t[2]+.2*Math.sin(_t)-.1*Math.cos(_t),rt.y=at(rt.x,rt.z)}const Ja=O?O===2&&Xt<.25:$!==3||Xt<.25;if(O===2&&Ja){const t=R.gaze?(R.aim[0]+R.gaze[0])/2:R.aim[0],o=R.gaze?(R.aim[2]+R.gaze[2])/2:R.aim[2];rt.x=t+.05,rt.z=o,rt.y=at(rt.x,rt.z)}e.trait("View",O?["","Along the rock","Into the crevice","Low over the ripples","Over the ripples","Over the cobbles","Over the silt","At the forest's edge","Over the canopy","Along the ledges","Into the crevice"][ot]:!$&&P===2?"Up the channel":["The bank","The matte wall","Over the canopy","Down on the sand","The reef's foot","Up the beam"][$]);const ce=[[.3,-.28,.6],[-.32,-.26,.6],[.05,.13,.06],[.24,-.24,.55],[.16,-.14,.22],[0,0,0]][vt].slice();($===3||ot>=4&&ot<=6)&&(ce[1]*=.5,ce[2]=.1);const Je=[1,1,1,.42,2.15,1][vt]*(O===5&&vt<2?1.3:1),Do=[1,1,1,2.2,.5,.75][vt]*(O===5&&vt<2?1.25:1);e.trait("Torch held",["Low in the right hand","Low in the left hand","Above the mask","Pencil spot","Wide flood","Laid on the sand"][vt]),e.trait("Season",["High summer","Spring growth","Autumn litter"][gt]),Ne&&e.trait("Opening","Torch off"),$===5?U.finS():U.fin();const Te=new Float32Array(16),Pe=new Float32Array(16),to=new Float32Array(80),u={e:Y.slice(),f:[0,0,-1],r:[1,0,0],u:[0,1,0]},At=[0,0,0];let Z=null;const Lo=()=>{const t=e.view||co,o=_t+(t.yaw||0),n=wt(Ee+(t.pitch||0),-1.45,1.45),r=u.e,s=u.f,i=u.r,f=u.u;u.e=[Y[0]+wt(t.x||0,-1,1),Y[1]+wt(t.y||0,-.6,1.2),Y[2]+wt(t.z||0,-1,1)],u.f=[Math.sin(o)*Math.cos(n),Math.sin(n),-Math.cos(o)*Math.cos(n)],u.r=le(Be(u.f,[0,1,0])),u.u=Be(u.r,u.f);for(let h=0;h<3;h++)At[h]=De?De[h]:u.e[h]+u.r[h]*ce[0]+u.u[h]*ce[1]+u.f[h]*ce[2];if(Z&&(s[0]!==u.f[0]||s[1]!==u.f[1]||s[2]!==u.f[2]||r[0]!==u.e[0]||r[1]!==u.e[1]||r[2]!==u.e[2])){const h=M=>{const c=Ae(M,i),B=Ae(M,f),w=Ae(M,s);return[u.r[0]*c+u.u[0]*B+u.f[0]*w,u.r[1]*c+u.u[1]*B+u.f[1]*w,u.r[2]*c+u.u[2]*B+u.f[2]*w]},x=M=>{const c=h([M[0]-r[0],M[1]-r[1],M[2]-r[2]]);return[u.e[0]+c[0],u.e[1]+c[1],u.e[2]+c[2]]};Z.cur=h(Z.cur),Z.base=x(Z.base),Z.tap&&(Z.tap=x(Z.tap))}},Ra=(t,o)=>{const n=le([u.f[0]+(2*t-1)*Ut*u.r[0]+(1-2*o)*Ut*u.u[0],u.f[1]+(2*t-1)*Ut*u.r[1]+(1-2*o)*Ut*u.u[1],u.f[2]+(2*t-1)*Ut*u.r[2]+(1-2*o)*Ut*u.u[2]]);let r=0;for(let s=.2;s<16;s+=.06){const i=u.e[0]+n[0]*s,f=u.e[1]+n[1]*s,h=u.e[2]+n[2]*s;if(f<at(i,h)+.4*zt(i,h))return{p:[u.e[0]+n[0]*(s+r)/2,u.e[1]+n[1]*(s+r)/2,u.e[2]+n[2]*(s+r)/2],d:n};r=s}return{p:[u.e[0]+n[0]*6,u.e[1]+n[1]*6,u.e[2]+n[2]*6],d:n}};u.f=[Math.sin(_t)*Math.cos(Ee),Math.sin(Ee),-Math.cos(_t)*Math.cos(Ee)],u.r=le(Be(u.f,[0,1,0])),u.u=Be(u.r,u.f),u.e=Y.slice();for(let t=0;t<3;t++)At[t]=De?De[t]:Y[t]+u.r[t]*ce[0]+u.u[t]*ce[1]+u.f[t]*ce[2];const Re=Ie||[It[0].x-Jt*.1,It[0].y+.2,It[0].z-te*.1];Z={cur:le([Re[0]-At[0],Re[1]-At[1],Re[2]-At[2]]),tgt:null,base:Re.slice(),tap:null,tapT:-9},Z.tgt=Z.cur.slice();let Ce=Math.hypot(Re[0]-At[0],Re[1]-At[1],Re[2]-At[2]);for(let t=.15;t<Ce;t+=.05){const o=At[0]+Z.cur[0]*t,n=At[1]+Z.cur[1]*t,r=At[2]+Z.cur[2]*t;if(n<at(o,r)+.4*zt(o,r)){Ce=t;break}}const eo=(Ce*Ce+.3)*Math.exp(.06*(Ce-1.8))/3.54,ko=R?wt(eo,.32,2):Ie?1.6:wt(eo,.9,2),T={pow:Ne?0:1,adapt:Ne?1:0,wasDown:!1,pT:0,px:0,py:0,moved:!1,hold:!1,kickT:1.2,breathT:2,frame:0,lastT:0,simT:0,on:!Ne,wT:0,wO:[0,0,0]},ta=e.sound||{hit(){},note(){}},xt=1/30;function ao(t){const o=e.input||{},n=o.taps?o.taps():[];o.down&&!T.wasDown&&(T.pT=t,T.px=o.x,T.py=o.y,T.moved=!1,T.hold=!1),!o.down&&!T.wasDown&&(T.hold=!1),o.down&&(Math.hypot(o.x-T.px,o.y-T.py)>.03&&(T.moved=!0),!T.moved&&t-T.pT>.4&&(T.hold=!0));let r=null;if(!o.down&&T.wasDown&&!T.moved&&!T.hold?r=[T.px,T.py]:!o.down&&!T.wasDown&&n.length&&(r=[n[0].x,n[0].y]),o.down&&T.moved&&!T.hold){const w=Ra(o.x,o.y);Z.base=w.p}if(o.down&&T.wasDown){const w=o.x-T.lx,E=o.y-T.ly,m=Math.hypot(w,E)/xt;if(m>.05){const b=Ra(o.x,o.y),V=b.d,d=Math.hypot(b.p[0]-u.e[0],b.p[1]-u.e[1],b.p[2]-u.e[2]),g=u.r[0]*w-u.u[0]*E,_=u.r[1]*w-u.u[1]*E,I=u.r[2]*w-u.u[2]*E;for(let L=Math.min(14,m*5*ve*(1+T.adapt))+p();L>=1;L--){const z=Math.min(d-.1,.9+p()*1.4),C=p();Ta(u.e[0]+V[0]*z-g*C*3,u.e[1]+V[1]*z-_*C*3,u.e[2]+V[2]*z-I*C*3,1,.1*z,g*8,_*8,I*8,ve*(.6+.5*p()),.06)}}}if(T.lx=o.x,T.ly=o.y,r){const w=Ra(r[0],r[1]);Z.tap=w.p,Z.tapT=t}T.wasDown=!!o.down;const s=Ne?T.hold:!T.hold;s!==T.on&&(ta.hit("click",.25),T.on=s),T.pow+=((s?1:0)-T.pow)*Math.min(1,xt*18),T.adapt+=((s?0:1)-T.adapt)*Math.min(1,xt*(s?1.2:.18));let i=Z.base;const f=K(3,9,t)*(o.down?0:1);if(Z.tap&&t-Z.tapT<1.8&&(i=Z.tap),t>T.wT){T.wT=t+2.5+p()*5+(p()<.3?4:0);const w=p()<.35?0:.45;T.wO=[(p()-.5)*w*1.4,(p()-.5)*w*.5,(p()-.5)*w]}T.wC=T.wC||[0,0,0];for(let w=0;w<3;w++)T.wC[w]+=(T.wO[w]-T.wC[w])*xt*.7;const h=[i[0]+f*T.wC[0],i[1]+f*T.wC[1],i[2]+f*T.wC[2]],x=le([h[0]-At[0],h[1]-At[1],h[2]-At[2]]),M=Math.min(1,xt*(o.down&&T.moved?9:4));Z.cur=le([Z.cur[0]+(x[0]-Z.cur[0])*M,Z.cur[1]+(x[1]-Z.cur[1])*M,Z.cur[2]+(x[2]-Z.cur[2])*M]);const c=1+1.6*T.adapt;if(t>T.kickT){T.kickT=t+1.6+p()*1.2;const w=Math.sin(_t),E=-Math.cos(_t);for(const m of[-1,1])Ta(Y[0]-w*1.3-E*m*.22,Y[1]-.5,Y[2]-E*1.3+w*m*.22,Math.round((8+p()*10)*ve*c),.35,m*.1,-.25,-.35,ve);ta.hit("noise",.05,{cutoff:300,dur:.6})}const B=ve*c*(.6+4*Fe)*xt*30;for(let w=B+p();w>=1;w--){const E=p()<.6?_t+(p()-.5)*1.4:p()*ct,m=.6+p()*5,b=u.e[0]+Math.sin(E)*m,V=u.e[2]-Math.cos(E)*m;(zt(b,V)>.5||Bo(b,V)>.5)&&Ta(b,at(b,V)+.3+p()*.3,V,1+(p()*3|0),.15,0,0,0,ve*.8)}if(t>T.breathT){T.breathT=t+4+p()*2.6+(p()<.2?2.5+p()*4:0),ta.hit("noise",.04,{cutoff:3200,dur:1});for(let w=0;w<6;w++)ta.hit("blip",.05,{at:1.6+w*.12+p()*.1,freq:180+p()*260})}for(let w=0;w<Le;w++){const E=w*10;if(G[E+6]>3)continue;G[E+6]+=xt;const m=Math.exp(-xt*1.8);G[E+3]*=m,G[E+4]=G[E+4]*m-.002,G[E+5]*=m;const b=G[E+4],V=G[E+5],d=xt*1.2*(G[E+9]-.5);G[E+4]=b*Math.cos(d)-V*Math.sin(d),G[E+5]=b*Math.sin(d)+V*Math.cos(d),G[E]+=(G[E+3]+dt[0]*Fe*.3*Math.sin(ge*t))*xt,G[E+1]+=G[E+4]*xt,G[E+2]+=(G[E+5]+dt[1]*Fe*.3*Math.sin(ge*t))*xt}T.simT=t}function Io(t){let o=0;const n=Ka,r=1+1.2*T.adapt;for(let s=0;s<Le&&o<Ya;s++){const i=s*10,f=G[i+6];if(f<0||f>3)continue;const h=G[i+7],x=f<.03?f/.03:Math.exp(-(f-.03)/h)*(1+.5*Math.sin(f*23+G[i+9]*40)*(G[i+9]>.7?1:0)),M=G[i+8]*x*r;if(M<.01)continue;const c=o++*8;n[c]=G[i],n[c+1]=G[i+1],n[c+2]=G[i+2],n[c+3]=.011+.012*G[i+9],n[c+4]=.35*M,n[c+5]=2.6*M,n[c+6]=1.6*M,n[c+7]=0}return a.bindBuffer(a.ARRAY_BUFFER,$a),a.bufferSubData(a.ARRAY_BUFFER,0,n,0,o*8),o}const oo=[26e3,34e3,4e4][oe],Co=[2200,3200,4500][oe],Oo=7,Oe=new Float32Array(20),ea=new Float32Array(20),no=(t,o)=>{for(let n=0;n<5;n++){const r=n>>1,s=n&1?-1:1,i=n===4?2:r;for(let f=0;f<4;f++)o[n*4+f]=t[f*4+3]+s*t[f*4+i]}},Vo=(t,o,n)=>{for(let r=0;r<5;r++){const s=t[r*4],i=t[r*4+1],f=t[r*4+2];if(s*(s>0?o[n+3]:o[n])+i*(i>0?o[n+4]:o[n+1])+f*(f>0?o[n+5]:o[n+2])+t[r*4+3]<0)return!0}return!1},Ve=(t,o,n)=>{a.bindVertexArray(t.vao),a.bindBuffer(a.ARRAY_BUFFER,t.b);let r=-1,s=-1;for(let i=0;i<=ye;i++){const f=i<ye&&t.st[i+1]>t.st[i]&&!Vo(o,t.box,i*6);if(f&&r<0&&(r=t.st[i]),f&&(s=t.st[i+1]),!f&&r>=0){for(let h=0;h<2;h++)a.vertexAttribPointer(h,4,a.FLOAT,!1,32,r*32+h*16);a.drawArraysInstanced(a.TRIANGLE_STRIP,0,n,s-r),r=-1}}},_e=new Float32Array(6*6*20);{const t=1/Math.cos(Math.PI/20);for(let o=0;o<20;o++){const n=o*Math.PI/10,r=n+Math.PI/10;for(let s=0;s<6;s++){const i=s%3===0?0:42*t,f=s%3===1?n:r,h=(o*6+s)*3;_e[h]=Y[0]+Math.cos(f)*i,_e[h+1]=s<3?-.7:3.8,_e[h+2]=Y[2]+Math.sin(f)*i}}}const Ba=O===1||O===3?U.grid2():{vao:U.gVao,gWi:U.gWi},so=new Float32Array([Zt,$t,tt,He,0,0,0,0]),ro=t=>{a.bindVertexArray(Ba.vao);let o=-1,n=-1;for(let r=0;r<=U.nGW;r++){let s=!1;if(r<U.nGW){s=!0;for(let i=0;i<5&&s;i++){let f=!0;for(let h=0;h<6;h++){const x=(r*6+h)*3;if(t[i*4]*_e[x]+t[i*4+1]*_e[x+1]+t[i*4+2]*_e[x+2]+t[i*4+3]>=0){f=!1;break}}f&&(s=!1)}}s&&o<0&&(o=r),s&&(n=r+1),!s&&o>=0&&(a.drawElements(a.TRIANGLES,(n-o)*Ba.gWi,a.UNSIGNED_INT,o*Ba.gWi*4),o=-1)}};function io(t){Lo();const o=At,n=Z.cur,r=le(Be(n,Math.abs(n[1])>.95?[1,0,0]:[0,1,0])),s=Be(r,n),i=Math.tan(Math.min(1.4,.68*Je));Pa(Te,u.e,u.f,u.r,u.u,Ut,.03,90),Pa(Pe,o,n,r,s,i,.08,22),no(Te,Oe),no(Pe,ea);const f=Eo*Do*T.pow,h=.9*(1+2.4*T.adapt*T.adapt)*(pe===2?1.4:1),x=[u.e[0],u.e[1],u.e[2],Ut,u.f[0],u.f[1],u.f[2],t,u.r[0],u.r[1],u.r[2],2*Ut/j,u.u[0],u.u[1],u.u[2],h,o[0],o[1],o[2],f,n[0],n[1],n[2],j,ra[0],ra[1],ra[2],To,ia[0],ia[1],ia[2],.82,ca[0],ca[1],ca[2],ve,dt[0],dt[1],Fe*(.55+.45*K(-.6,.8,Math.sin(t*.21+1.3)+.6*Math.sin(t*.137+ha))),ge,.9,.25,T.adapt,Me,Yt[0],Yt[1],Yt[2],Yt[3],Kt[0],Kt[1],Kt[2],Kt[3],N[0],N[1],N[2],N[3],kt[0],kt[1],kt[2],kt[3],se[0],se[1],se[2],se[3],da[0],da[1],da[2],fa,Xe[0],Xe[1],Xe[2],Xe[3],0,4,Pt.W/j,Oo,ko,Je,.3*Je,Math.min(1.3,.58*Je)];to.set(x);const M=E=>{const m=U.ready(E);return a.useProgram(m.p),a.uniform4fv(m.uC,to),a.uniformMatrix4fv(m.uLVP,!1,Pe),m};a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,U.tN),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,null),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,null),xe&&(a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,xe.tH),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,xe.tM)),a.disable(a.BLEND),a.disable(a.CULL_FACE),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.depthMask(!0),a.colorMask(!0,!0,!0,!0),a.bindFramebuffer(a.FRAMEBUFFER,U.fbSh),a.viewport(0,0,U.SM,U.SM),a.clearDepth(1),a.clear(a.DEPTH_BUFFER_BIT);let c=M("gdS"+sa);a.uniformMatrix4fv(c.uVP,!1,Pe),a.uniform4f(c.uO,Y[0],Y[2],0,0),c.uB&&a.uniform4fv(c.uB,so),ro(ea),c=M("grS"+We),a.uniformMatrix4fv(c.uVP,!1,Pe),a.uniform4f(c.uG,6,1,gt,0),Ve(Xa,ea,14),Qe&&(a.uniform4f(c.uG,8,1,gt,0),Ve(Qe,ea,18)),c=M("tbS"),a.uniformMatrix4fv(c.uVP,!1,Pe),a.bindVertexArray(ya),a.drawElementsInstanced(a.TRIANGLES,qe*Wt*6,a.UNSIGNED_SHORT,0,ze),a.bindFramebuffer(a.FRAMEBUFFER,Pt.fm||Pt.f),a.viewport(0,0,Pt.W,Pt.W),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,U.tSh),a.clearColor(0,0,0,1e4),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),c=M("gd"+sa),a.uniformMatrix4fv(c.uVP,!1,Te),a.uniform4f(c.uO,Y[0],Y[2],0,0),c.uB&&a.uniform4fv(c.uB,so),ro(Oe),c=M("gr"+We),a.uniformMatrix4fv(c.uVP,!1,Te),a.uniform4f(c.uG,8,1.2,gt,me===2?1:0),Ve(Xa,Oe,18),a.uniform4f(c.uG,4,1.5,gt,me===2?1:0),Ve(_o,Oe,10),Qe&&(a.uniform4f(c.uG,12,1,gt,me===2?1:0),Ve(Qe,Oe,26)),c=M("tb"),a.uniformMatrix4fv(c.uVP,!1,Te),a.bindVertexArray(ya),a.drawElementsInstanced(a.TRIANGLES,qe*Wt*6,a.UNSIGNED_SHORT,0,ze),a.enable(a.BLEND),a.blendFuncSeparate(a.ONE,a.ONE,a.ZERO,a.ONE),a.depthMask(!1),c=M("mo"),a.uniformMatrix4fv(c.uVP,!1,Te),a.uniform4f(c.uM,oo,3.4,[1,1.3,1.6][oe]*15,j/1e3),a.bindVertexArray(U.eVao),a.drawArrays(a.POINTS,0,oo+Co);const B=Io(t);B&&(c=M("sp"),a.uniformMatrix4fv(c.uVP,!1,Te),a.bindVertexArray(Za),a.drawArrays(a.POINTS,0,B)),a.disable(a.BLEND),a.depthMask(!0),a.disable(a.DEPTH_TEST),Pt.fm&&(a.bindFramebuffer(a.READ_FRAMEBUFFER,Pt.fm),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,Pt.f),a.blitFramebuffer(0,0,Pt.W,Pt.W,0,0,Pt.W,Pt.W,a.COLOR_BUFFER_BIT,a.NEAREST)),a.flush(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,j,j),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,Pt.t);let w=-1;for(const E of[-1,1])for(const m of[-1,1]){const b=u.f[0]+Ut*(E*u.r[0]+m*u.u[0]),V=u.f[1]+Ut*(E*u.r[1]+m*u.u[1]),d=u.f[2]+Ut*(E*u.r[2]+m*u.u[2]);w=Math.max(w,V/Math.hypot(b,V,d))}w>.58?U.finS():U.fin(),c=M(w>.58?"finS":"fin"),a.bindVertexArray(U.eVao),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null),T.frame++}let fe=0;for(let t=0;t<40;t++)fe+=xt,ao(fe);Qa(fe),io(fe);let aa=0;return(t,o)=>{aa+=Math.min(.25,o||xt);let n=0;for(;aa>=xt&&n<4;)aa-=xt,fe+=xt,ao(fe),n++;n===4&&(aa=0),Qa(fe),io(fe),T.frame===3&&(U.finS(),U.fin())}}});function yo(e){return wo(e)}}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
