// Roaring Stag: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/569.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fo){Fo&&function(){"use strict";const wa={yaw:0,pitch:0,x:0,y:0,z:0},we=Math.PI*2,Ge=Math.PI/180,j=(v,t,T)=>v<t?t:v>T?T:v,St=(v,t,T)=>{const w=j((T-v)/(t-v),0,1);return w*w*(3-2*w)},Ue=(v,t,T)=>v.map((w,_)=>w+(t[_]-w)*T),Ro=21,Ka=6e4,te=12e3,Ut=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
#define FAR 60000.
`,ga=Ut+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",Co=Ut+`uniform vec4 uMo; out vec4 o;
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float lat(ivec2 c, int ch, int M) { c = ((c % M) + M) % M; return float(hsh(uint(c.x + c.y * M) * 4u + uint(ch) + 569u) & 0xffffu) / 65535.; }
float vn(vec2 p, int ch) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(lat(c, ch, 64), lat(c + ivec2(1, 0), ch, 64), f.x), mix(lat(c + ivec2(0, 1), ch, 64), lat(c + ivec2(1, 1), ch, 64), f.x), f.y); }
float lt2(ivec2 c, int ch, ivec2 M) { c = ((c % M) + M) % M; return float(hsh(uint(c.x + c.y * 977) * 16u + uint(ch) + 569u) & 0xffffu) / 65535.; }
float vm(vec2 p, int ch, ivec2 M) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(lt2(c, ch, M), lt2(c + ivec2(1, 0), ch, M), f.x), mix(lt2(c + ivec2(0, 1), ch, M), lt2(c + ivec2(1, 1), ch, M), f.x), f.y); }
void main() {
  vec2 q = floor(gl_FragCoord.xy), p = (q + .5) / 4.;
  if (uMo.x < .5) o = vec4(vn(p, 0), vn(p, 1), vn(p, 2), lat(ivec2(q), 3, 256));
  else {
    // the moor's ground tile, 6.4 m across and seamless: x the canopy's height (tussocks and hummocks, a hand or two
    // across), y strands combed one way (moor-grass blades), z which patch you are in, w heather's sprigs
    vec2 u = (q + .5) / 512.;
    vec2 wv = vec2(vm(u * 7., 4, ivec2(7)), vm(u * 7., 5, ivec2(7))) - .5;
    float l1 = vm(u * 13. + wv * 1.3, 6, ivec2(13)), l2 = vm(u * 31. + wv * 2.2, 7, ivec2(31));
    vec2 su = u + wv * .035;
    float s1 = 1. - abs(vm(su * vec2(170., 23.), 8, ivec2(170, 23)) * 2. - 1.), s2 = vm(su * vec2(331., 57.), 9, ivec2(331, 57));
    float sp = vm(u * 229., 10, ivec2(229)) * .6 + vm(u * 97. + wv * 3., 11, ivec2(97)) * .4;
    float id = vm(u * 5. + wv * .9, 12, ivec2(5));
    float st = clamp(s1 * .62 + s2 * .5 - .1, 0., 1.);
    float h = smoothstep(.24, .76, l1 * .45 + l2 * .55) * .6 + st * .22 + sp * .18;
    o = vec4(h, st, clamp(id * .8 + l2 * .2, 0., 1.), smoothstep(.28, .72, sp));
  }
}`,ao=`
const float PI = 3.14159265;
float nA(vec2 p) { return textureLod(uN, p * (1. / 64.), 0.).x; }
float nB(vec2 p) { return textureLod(uN, p * (1. / 64.), 0.).y; }
float nC(vec2 p) { return textureLod(uN, p * (1. / 64.), 0.).z; }
// smooth gradient noise from a hash, for the fine relief round your feet (texture noise turns blocky that close)
float hs2(vec2 i) { uvec2 u = uvec2(ivec2(i) + 65536); uint h = u.x * 1597334677u ^ u.y * 3812015801u; h = (h ^ (h >> 16)) * 2246822519u; h ^= h >> 13; return float(h & 0xffffffu) / 16777215.; }
vec2 gr2(vec2 i) { float a = hs2(i) * 6.2832; return vec2(cos(a), sin(a)); }
float vz(vec2 p) { p = vec2(p.x * .8 - p.y * .6, p.x * .6 + p.y * .8); vec2 i = floor(p), f = p - i, u = f * f * (3. - 2. * f);
  float a = dot(gr2(i), f), b = dot(gr2(i + vec2(1., 0.)), f - vec2(1., 0.)), c = dot(gr2(i + vec2(0., 1.)), f - vec2(0., 1.)), d = dot(gr2(i + 1.), f - 1.);
  return clamp(.5 + .9 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y), 0., 1.); }
float smin(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
`,so=`
float zAx(float x) { return uT[0].x + uT[0].y * sin(x * .00041 + uT[0].z) + 70. * sin(x * .00123 + 2.3 * uT[0].z + 1.); }
float pathD(vec2 p) {
  float xp = uV.y + uV.z * p.y + 2.2 * sin(p.y * .11 + .4) + .6 * sin(p.y * .31 + 1.) + .25 * sin(p.y * .9);
  return abs(p.x - xp) + max(p.y - uT[2].y + 12., 0.) * .5 + max(-30. - p.y, 0.) * .6;
}
float brk(vec2 p, float sl, float el) {
  float b = nA(p * .043 + 3.3) * .6 + nB(p * .16 + 1.1) * .28 + nC(p * .7 + 2.) * .12;
  float r = length(p - vec2(uT[4].z, uT[5].x));
  b += uT[4].x * smoothstep(5., 11., r) * smoothstep(40., 24., r) - smoothstep(6., 2.5, length(p - uT[2].xy));
  return smoothstep(uV.x - .07, uV.x + .16, b) * smoothstep(1.25, .8, sl) * smoothstep(330., 240., el) * smoothstep(10., 40., el);
}
// a few half-buried boulders on the knoll's flanks: height over the ground, and m = how much is rock
float bldr(vec2 p, out float m) {
  vec2 k = p - uT[2].xy; float h = -1.; m = 0.;
  for (int i = 0; i < 4 + int(uT[4].y); i++) {
    vec3 B = i == 0 ? vec3(-6., -7., .95) : i == 1 ? vec3(5.5, -8.5, .62) : i == 2 ? vec3(10., -3., .8) : vec3(-6.6, -15.5, .42);
    vec2 q = (k - B.xy) / B.z; q = vec2(q.x * .9 + q.y * .35, q.y * 1.25 - q.x * .2);
    float d = length(q) * (1. + .35 * (nA(p * 1.3 + B.xy) - .5));
    float hb = B.z * (min(sqrt(max(1. - d * d, 0.)) * 1.25, .78 + .18 * q.x - .1 * q.y) * .62 - .12);
    h = max(h, hb); m = max(m, smoothstep(1.02, .86, d));
  }
  return h;
}
float terr(vec2 p, out float gully) {
  float x = p.x, so = uT[4].w;
  float d = p.y - zAx(x);
  float W = 240.;
  float h = uT[1].x + (d < 0. ? uT[0].w : uT[3].w) * (sqrt(d * d + W * W) - W);
  // the far side rounds over into low hills, lower where the sun comes up through a col
  float ft = uT[3].z + 70. * (nA(vec2(x * .0009 + so, 3.7)) - .5) + 36. * (nB(vec2(x * .0027, 1.3 + so)) - .5) - uT[5].z * exp(-pow((x - uT[5].w) / 1300., 2.));
  if (d > 0.) h = smin(h, ft + .03 * d + 30. * (nC(p * .0012 + so) - .5), 140.);
  // our hill tops out in a crest behind us
  float cd = uT[3].x + 70. * (nC(vec2(x * .0016, 5.1 + so)) - .5);
  float ch = uT[3].y + 60. * (nA(vec2(x * .0019 + 2.3, so)) - .5);
  h = smin(h, ch - .7 * (cd - d), 50.);
  // spurs and gullies running down the slopes, kept smooth under your feet
  float sl = smoothstep(70., 330., abs(d));
  float fr = smoothstep(120., 480., length(p));
  float rid = 1. - abs(nA(vec2(x * .0034, d * .0012) + so) * 2. - 1.);
  h += sl * ((nB(vec2(x * .0021 + 1.7, d * .0009) + so) - .5) * 120. * fr + (rid - .5) * 38. * (.3 + .7 * fr) + (nC(vec2(x * .0105, d * .0042)) - .5) * 20.);
  float gq = abs(nA(vec2(x * .0072 + 4.1, d * .0016)) - .5);
  float gul = smoothstep(.07, .0, gq) * sl;
  h -= gul * 11. * (.4 + .6 * fr);
  gully = gul * smoothstep(260., 60., abs(d - cd - 90.));
  // hummocks and old moraine
  h += (nC(p * .0055 + so) - .5) * 16. * (1. - .5 * sl) + (nA(p * .019 + 3.) - .5) * 6. + (nB(p * .063) - .5) * 2.2 + (nC(p * .21) - .5) * .7;
  // crags along the crest
  float ck = exp(-abs(d - cd) / 90.);
  h += ck * (pow(1. - abs(nB(p * .011 + 7.) * 2. - 1.), 3.) * 34. + (nA(p * .05) - .5) * 8.);
  // the loch
  float lw = uT[5].y * (.7 + .6 * nB(vec2(x * .0011, 9.)));
  float lm = smoothstep(lw, lw * .5, abs(d + 60. * (nC(vec2(x * .0023, 2.)) - .5))) * smoothstep(uT[1].z - 300., uT[1].z + 300., x) * smoothstep(uT[1].w + 300., uT[1].w - 300., x);
  h = mix(h, uT[1].y - 9., lm);
  // the knoll
  vec2 kq = (p - uT[2].xy) / uT[2].w * vec2(.75, 1.05);
  float kn = exp(-dot(kq, kq) * 1.4);
  h += uT[2].z * kn * (.85 + .3 * nA(p * .17)) + uT[2].z * .16 * smoothstep(.3, .95, nC(p * .3 + 1.)) * kn * kn;
  // a low rise on the slope beyond the knoll, where that slope would otherwise drop out of sight (uT[6]: x, z, height)
  vec2 rq = (p - uT[6].xy) / 15.;
  h += uT[6].z * exp(-dot(rq, rq));
  return h;
}
// heather clumps, peat and the deer path at the scale of your feet
float micro(vec2 p, out float hag) {
  float pd = pathD(p);
  // the moor's own low swell; the tussocks and hummocks themselves come from the ground tile
  float cl = (nB(p * .55 + 11.) - .5) * .16 + (nC(p * 1.3 + 5.) - .5) * .05;
  cl *= smoothstep(.2, .6, pd);
  cl -= .1 * smoothstep(.45, .12, pd);
  // peat hags: winding banks where the peat has slumped, a steep black face under a heather lip, a bare floor
  float e = nA(p * .05 + 9.) + (nC(p * .37) - .5) * .05 - .64;
  hag = smoothstep(0., .012, e) * smoothstep(.1, .03, e) * smoothstep(8., 13., length(p)) * smoothstep(4., 8., length(p - uT[2].xy)) * smoothstep(.6, 1.4, pd);
  cl -= .55 * hag;
  float bo = smoothstep(.9, .97, nC(p * .19 + 2.)) * smoothstep(10., 20., length(p - uT[2].xy));
  float bm; float bh = bldr(p, bm);
  return max(cl + bo * (.35 + .3 * nB(p * 2.3)), bh);
}`,no=Ut+"uniform sampler2D uN; uniform vec4 uT[7]; uniform vec4 uV; uniform vec4 uA; uniform vec4 uMo; uniform vec4 uP[32]; out vec4 o;"+ao+so+`
void main() {
  vec2 fc = gl_FragCoord.xy;
  bool pr = uMo.x > 1.5;
  vec2 p = uA.xy + fc * uA.zw;
  if (pr) {
    int i = int(fc.x); vec4 pp = uP[i / 2]; p = (i % 2 == 0) ? pp.xy : pp.zw;
    // the rows above the first: the ground along 64 sight lines out from where you stand
    if (fc.y > 1.) { float a = uA.z + fc.x * uA.w, r = fc.y - 1.5; p = uA.xy + vec2(sin(a), cos(a)) * (2.5 + r * (1. + .0115 * r)); }
  }
  float e = uA.z * .6, h0 = 0., hx = 0., hz = 0., gully = 0., hag = 0.;
  int nk = int(uMo.z);
  for (int k = 0; k < nk; k++) {
    vec2 q = p + (k == 1 ? vec2(e, 0.) : k == 2 ? vec2(0., e) : vec2(0.));
    float gq; float h = terr(q, gq);
    float hq = 0.; if (uMo.y > .5) h += micro(q, hq);
    if (k == 0) { h0 = h; gully = gq; hag = hq; } else if (k == 1) hx = h; else hz = h;
  }
  vec2 g = vec2(hx - h0, hz - h0) / e;
  if (pr) {
    float v = floor(clamp((h0 + 600.) / 1200., 0., 1.) * 16777215.);
    float r = floor(v / 65536.), g = floor((v - r * 65536.) / 256.), b = v - r * 65536. - g * 256.;
    o = vec4(r, g, b, 255.) / 255.;
    return;
  }
  float w = gully;
  if (uMo.y > .5) {
    // what grows here: bracken (tall), heather (short) or nothing (path, rock)
    float sl = length(g), b = brk(p, sl, h0 - uV.w);
    float bm; bldr(p, bm);
    float bare = max(max(smoothstep(.45, .2, pathD(p)), smoothstep(.88, .93, nC(p * .19 + 2.))), max(smoothstep(.2, .7, bm), smoothstep(.25, .6, hag)));
    w = mix(.22, mix(.5, .95, b) * (.8 + .4 * nB(p * .9)), smoothstep(.12, .3, b)) * (1. - bare) * smoothstep(1.35, 1., sl);
    // (a boulder is written as minus its rock amount, so the main pass need not find the boulders again)
    if (bm > .3) w = -bm;
  }
  o = vec4(h0, g, w);
}`,Lo=Ut+`uniform sampler2D uF; uniform vec4 uA; uniform vec4 uFM; uniform vec4 uSh; uniform vec4 uTE; out vec4 o;
void main() {
  vec2 p = uA.xy + gl_FragCoord.xy * uA.zw;
  float h0 = textureLod(uF, (p - uFM.xy) * uFM.zw, 0.).x;
  vec4 m = vec4(-1e4);
  float d = 3.;
  int n = int(uSh.z);
  for (int k = 0; k < n; k++) {
    d *= 1.075;
    float h = textureLod(uF, (p + uSh.xy * d - uFM.xy) * uFM.zw, 0.).x;
    m = max(m, h - d * uTE);
  }
  o = m - h0;
}`,No=`
// the top of the mist: a level sea with soft billows, flatter where it is shallow, dropped where the breeze cleared it
// the breeze's clearance field, B-spline filtered from four bilinear taps so window walls come out smooth
float clr(vec2 p) {
  vec2 u = (p - uC[15].xy) * uC[15].zw * vec2(64., 32.) - .5, i = floor(u), f = u - i, f2 = f * f, f3 = f2 * f;
  vec2 w0 = (1. - 3. * f + 3. * f2 - f3) / 6., w1 = (4. - 6. * f2 + 3. * f3) / 6., w3 = f3 / 6., g0 = w0 + w1, g1 = 1. - g0;
  vec2 h0 = (i - .5 + w1 / g0) / vec2(64., 32.), h1 = (i + 1.5 + w3 / g1) / vec2(64., 32.);
  return mix(mix(textureLod(uM, h0, 0.).x, textureLod(uM, vec2(h1.x, h0.y), 0.).x, g1.x), mix(textureLod(uM, vec2(h0.x, h1.y), 0.).x, textureLod(uM, h1, 0.).x, g1.x), g1.y);
}
float mistTopC(vec2 p, float gh, out float cl) {
  cl = clr(p);
  vec2 q = p + OFF;
  float b = (nA(q * vec2(.0036, .006)) - .5) * 1.5 + (nB(q * vec2(.011, .017) + 7.3) - .5) * .6 + (nC(q * .045 + 2.1) - .5) * .22;
  return MTOP + b * BIL * smoothstep(4., 50., MTOP - gh) - cl * DROP;
}
float mistTop(vec2 p, float gh) { float cl; return mistTopC(p, gh, cl); }
vec3 skyGrad(vec3 d) {
  float y = max(d.y, 0.);
  vec2 hz = normalize(d.xz + vec2(1e-5, 0.)), sz = normalize(LS.xz + vec2(1e-5, 0.));
  float ca = dot(hz, sz), w = .5 + .5 * ca;
  vec3 hor = mix(SKYA, SKYS, w * w * w);
  vec3 col = mix(hor, SKYZ, pow(min(y * 2.3, 1.), .55));
  // the pink band of the anti-twilight away from the sun, and the earth's shadow under it
  float anti = smoothstep(.1, -.8, ca) * uC[19].x;
  col += vec3(.24, .1, .13) * anti * smoothstep(.02, .07, y) * smoothstep(.34, .1, y);
  col = mix(col, col * vec3(.72, .76, .95), anti * smoothstep(.06, .0, y) * .7);
  float cs = dot(d, LS);
  col += SUNC * (.05 * exp(-(1. - cs) * 4.) + .2 * exp(-(1. - cs) * 45.) + .7 * exp(-(1. - cs) * 1100.)) * (1. - .6 * smoothstep(0., .4, y));
  return col;
}
vec3 hazeC(vec3 rd) {
  float mu = max(dot(rd, LS), 0.);
  return skyGrad(vec3(rd.x, .02, rd.z)) * .92 + SUNC * uC[4].w * pow(mu, 8.) * .3;
}
vec3 HC;
vec3 haze(vec3 col, vec3 rd, float t, float py) {
  float k = HAZEK * (2.3e-4 + 3.e-4 * exp(-max(py - uV.w, 0.) / 110.));
  return mix(col, HC, 1. - exp(-t * k));
}
`,ke=`uniform vec4 uC[${Ro}];
#define CAM uC[0].xyz
#define TT uC[0].w
#define FW uC[1].xyz
#define TANH uC[1].w
#define RT uC[2].xyz
#define PIXA uC[2].w
#define UP uC[3].xyz
#define LS uC[4].xyz
#define SUNC uC[5].xyz
#define HAZEK uC[5].w
#define SKYZ uC[6].xyz
#define FROST uC[6].w
#define SKYS uC[7].xyz
#define RIPL uC[7].w
#define SKYA uC[8].xyz
#define CLOUD uC[8].w
#define AMB uC[9].xyz
#define SIG uC[9].w
#define MTOP uC[10].x
#define MBASE uC[10].y
#define BIL uC[10].z
#define DROP uC[10].w
#define OFF uC[11].xy
#define WY uC[14].y
#define GZ 7.
float sunVis(vec3 p, float soft) {
  vec2 u = (p.xz - uC[13].xy) * uC[13].zw;
  float sd = dot(textureLod(uS, u, 0.), uC[16]);
  float hp = textureLod(uF, u, 0.).x;
  return smoothstep(-soft, soft, p.y - hp - sd) * uC[4].w;
}
`,ue=Ut+"uniform sampler2D uN, uF, uR, uS, uM, uL, uD, uGt; uniform vec4 uT[7]; uniform vec4 uV; out vec4 o;"+ke+ao+so.slice(0,so.indexOf("float terr("))+`
float at2(float y, float x) { float a = atan(abs(y) / max(abs(x), 1e-7)); a = x < 0. ? PI - a : a; return y < 0. ? -a : a; }
vec4 F4(vec2 p) { return textureLod(uF, (p - uC[13].xy) * uC[13].zw, 0.); }
vec4 N4(vec2 p) { return textureLod(uR, (p - uC[12].xy) * uC[12].z + .5, 0.); }
float nearW(vec2 p) { vec2 q = abs((p - uC[12].xy) * uC[12].z); return smoothstep(.49, .42, max(q.x, q.y)); }
// the ground tile (baked once): tussocks and heather hummocks as real relief near you, so the knoll's skyline is
// ragged and the low sun rakes across it; its strands run one way, the way the wind combs the moor grass
vec4 TL(vec2 p, float sc, float lod) { return textureLod(uGt, vec2(uC[14].z * p.x + uC[14].w * p.y, uC[14].z * p.y - uC[14].w * p.x) * sc, lod); }
float czone(vec2 p) { float d = length(p - CAM.xz); return smoothstep(64., 36., d) * smoothstep(3., 9., d); }
float H(vec2 p) {
  float w = nearW(p);
  float h = w < 1. ? F4(p).x : 0.;
  if (w > 0.) { vec4 nn = N4(p); h = mix(h, nn.x, w); float cz = czone(p) * w * smoothstep(.04, .16, nn.w); if (cz > 0.) h += (TL(p, .15625, 2.).x - .45) * .17 * cz; }
  return h;
}
// the same without the hummocks, for the mist's far-below steps (the clump zone is always far above the mist)
float H0(vec2 p) { float w = nearW(p); float h = w < 1. ? F4(p).x : 0.; if (w > 0.) h = mix(h, N4(p).x, w); return h; }
`+No+`vec3 sky(vec3 d) {
  vec3 col = skyGrad(d);
  float cs = dot(d, LS);
  if (d.y > .012) {
    // cirrus on a plane far up: mares' tails combed out by the jet wind, catching the dawn from below the horizon
    vec2 cp = d.xz / (d.y + .05) * 1.8 + vec2(TT * .003, 0.);
    cp = vec2(cp.x * .8 + cp.y * .6, cp.y * .8 - cp.x * .6);
    cp += (vec2(nC(cp * .31 + 2.), nA(cp * .7 + 5.)) - .5) * vec2(.75, .55);
    float st = (nA(cp * vec2(1.3, 7.) + 3.) * .5 + nB(cp * vec2(3.1, 19.) + 1.) * .3 + nC(cp * vec2(7., 46.)) * .2 - .5) * 2.1 + .5;
    float cov = smoothstep(.3, .72, nB(cp * .23 + 2.) * .7 + nA(cp.yx * .09 + 7.) * .3) * .92 + .08;
    float cl = smoothstep(.52, .86, st) * cov * CLOUD * smoothstep(.012, .12, d.y);
    vec3 cc = mix(SKYS * vec3(.98, .72, .7), SKYZ * 1.15, .3 * smoothstep(.1, .8, d.y)) + SUNC * (.14 + .8 * pow(max(cs, 0.), 6.)) * .5;
    col = mix(col, cc, cl * .72);
  }
  col += SUNC * smoothstep(1.6e-5, 1.1e-5, 1. - cs) * 40. * uC[4].w;
  // the far ranges, nearest first, fading into the haze and the mist in their valleys
  float e = d.y / max(length(d.xz), 1e-4);
  float u = at2(d.x, d.z) / (2. * PI) + .5;
  vec4 L1 = textureLod(uL, vec2(u, .5), 0.), L2 = textureLod(uL, vec2(u + 1. / 1024., .5), 0.);
  float sside = sign(at2(LS.x, LS.z) / (2. * PI) + .5 - u);
  // pick the nearest range the ray is under without indexing vectors in a loop (cheap to compile)
  vec4 under = step(vec4(e), L1);
  if (under.x + under.y + under.z + under.w > 0.) {
    vec4 Dv = uC[17], sel = under.x > 0. ? vec4(1., 0., 0., 0.) : under.y > 0. ? vec4(0., 1., 0., 0.) : under.z > 0. ? vec4(0., 0., 1., 0.) : vec4(0., 0., 0., 1.);
    float D = dot(Dv, sel), l1 = dot(L1, sel), l2 = dot(L2, sel);
    float eb = (MTOP + 25. - CAM.y) / D;
    float ht = clamp((e - eb) / max(l1 - eb, 1e-4), 0., 1.);
    float sl = (l2 - l1) * 1024. / (2. * PI);
    float lit = clamp(-sside * sl * 6. + .25, 0., 1.) * uC[4].w;
    vec3 lc = vec3(.05, .05, .06) * (AMB * .8 + SUNC * lit * .5) + vec3(.04, .03, .03) * nA(vec2(u * 900., e * 600.));
    lc = mix(lc, HC, 1. - exp(-D * HAZEK * .9e-4));
    col = mix(lc, HC, smoothstep(.5, 0., ht) * .3);
  }
  return col;
}
vec3 mistLight(float dep, vec3 n, float sv, float mu) {
  float ph = .45 + 2.3 * pow(mu, 8.) + .55 * mu;
  float sk = 1.;
  float att = exp(-max(dep, 0.) * .06);
  return SUNC * (sv * ph * sk * att * .5) + AMB * (1.02 - .4 * (1. - exp(-max(dep, 0.) * .02)));
}
float nearShadow(vec3 p, float vf) {
  vec2 sd = normalize(LS.xz + vec2(1e-6, 0.)); float te = LS.y / max(length(LS.xz), 1e-3);
  float s = 1., d = .45;
  int nS = int(uC[19].y) / 30;
  for (int k = 0; k < nS; k++) {
    d *= 1.38;
    vec2 q = p.xz + sd * d;
    vec4 nn = N4(q);
    float top = nn.x + max(nn.w - .3, 0.) * .9 * vf;
    s = min(s, clamp((p.y + te * d - top) / (.5 + .22 * d) + .5, 0., 1.));
  }
  return s;
}
vec3 ground(vec3 p, float t, vec3 rd) {
  vec4 f = F4(p.xz); float w = nearW(p.xz);
  vec4 nr = w > 0. ? N4(p.xz) : vec4(0.);
  vec2 g = mix(f.yz, nr.yz, w);
  float el = p.y - uV.w, sl = length(f.yz), fd = 1. - w, fp = t * PIXA;
  // one ground tile read at three sizes: the tussocks at your feet, the drifts across the knoll, the hillside's patches
  float lf = log2(fp * 80.) + .6;
  vec4 t0 = TL(p.xz, .15625, lf), t3 = TL(p.zx + 1.3, .71, lf + 2.18), t1 = TL(p.zx + 3.7, .0625, lf - 1.32), t2 = TL(p.xz + 11., .0047, lf - 5.);
  float n1 = nA(p.xz * .33), n3 = nC(p.xz * 4.1), nf = 1. - smoothstep(.004, .012, fp);
  t0.yw = mix(t0.yw, t0.yw * .45 + t3.yw * .62, nf);
  // spurs, banks and hummocks the coarse far map can't hold
  float fm = smoothstep(50., 260., t) * fd;
  g += ((vec2(nA(p.xz * .08), nB(p.xz * .08 + 3.)) - .5) * .5 + (vec2(nC(p.xz * .025 + 1.), nA(p.xz * .025 + 7.)) - .5) * .6 + (vec2(t1.x, t1.z) - .5) * .9) * fm;
  g += (vec2(t1.x - .45, t1.w - .5)) * .12 * smoothstep(.02, .06, fp) * (1. - fm);
  vec3 n = normalize(vec3(-g.x, 1., -g.y));
  float b = brk(p.xz, sl, el);
  float path = smoothstep(.36, .14, pathD(p.xz)) * w;
  float kd = smoothstep(10., 20., length(p.xz - uT[2].xy));
  float bm = clamp(-nr.w * 1.3, 0., 1.) * w;
  float rock = clamp(smoothstep(.75, 1.1, sl + (nA(p.xz * .07) - .5) * .6) * (.2 + .8 * kd) + smoothstep(.9, .97, nC(p.xz * .19 + 2.)) * w * kd + smoothstep(330., 400., el) * smoothstep(.4, .8, sl), 0., 1.);
  rock = max(rock, bm);
  float snow = smoothstep(.25, .55, f.w + (nA(p.xz * .03) - .5) * .4) * (1. - rock * .5);
  // bare black peat: the deer path and the hags' faces and floors
  float bare = max(path, w * (1. - smoothstep(.02, .15, nr.w)) * (1. - bm));
  // the tile's own relief toward the low sun: lit crowns, each clump's shadow laid over the next, dark gaps between
  vec2 sdc = normalize(LS.xz + vec2(1e-6, 0.)); float tec = LS.y / max(length(LS.xz), 1e-3);
  float hA = TL(p.xz + sdc * .05, .15625, lf).x, hB = TL(p.xz + sdc * .2, .15625, lf + 1.).x;
  float cSh = min(clamp(((t0.x - hA) * .17 + tec * .05) / .016 + .5, 0., 1.), clamp(((t0.x - hB) * .17 + tec * .2) / .03 + .5, 0., 1.));
  float sy = t0.y * .45 + t1.y * .55;
  float gap = smoothstep(.36, .14, t0.x), crown = smoothstep(.42, .75, t0.x);
  // October moor: deer grass and moor grass gone tawny in drifts, heather dark and woody between, its flowers faded
  // (the drifts run a little down the slope, and their edges are ragged bush by bush: where grass and heather meet,
  // each hummock of the tile tips the balance)
  float gq = nB(p.xz * vec2(.11, .075) + (vec2(nA(p.xz * .31 + 4.), nC(p.xz * .27 + 9.)) - .5) * 1.6) * .85 + .075 + (t1.z - .5) * .5 + (t0.z - .5) * .22 + (t2.z - .5) * .3 * fd;
  float gr = smoothstep(-.13, .13, gq - .2 - .6 * uV.x + ((t1.x - .45) * .34 + (t0.x - .45) * .2) * (1. - .6 * fd));
  float fc = (t0.x - hA) * 3.4 * (1. - bare) * (1. - .65 * gr);
  vec3 grc = mix(vec3(.13, .08, .038), vec3(.36, .215, .085), smoothstep(.2, .8, sy) * (.82 + .18 * crown)) * (.78 + .44 * n1);
  grc = mix(grc, vec3(.33, .27, .16), smoothstep(.55, .8, t1.w) * .4);
  // heather after its flowering: dark woody shoots, russet-mauve where the dead bells hang on, olive where it is still
  // green, grey tips
  vec3 hec = mix(vec3(.05, .036, .034), mix(vec3(.15, .083, .068), vec3(.105, .088, .05), smoothstep(.35, .65, t1.x)), t0.w * (.5 + .5 * crown));
  hec = mix(hec, vec3(.17, .125, .13), smoothstep(.55, .85, t0.z) * t0.w * .55);
  hec = mix(hec, vec3(.2, .15, .08), smoothstep(.6, .85, nC(p.xz * .021 + 5.)) * .5 * fd);
  vec3 alb = mix(hec, grc, gr);
  vec3 gapc = mix(vec3(.03, .022, .017), vec3(.05, .05, .022), smoothstep(.56, .72, n3) * .6);
  alb = mix(alb, gapc, gap * (.6 - .35 * gr));
  // dead bracken collapsed in drifts: rust and tan fronds lying over each other, combed downhill
  vec3 brc = mix(vec3(.2, .08, .032), vec3(.34, .16, .06), n1) * (.62 + .7 * t0.y);
  brc = mix(brc, vec3(.3, .2, .11), smoothstep(.6, .85, t1.w) * .5);
  alb = mix(alb, brc, b * (1. - .5 * gap));
  // far off the hillsides are a patchwork: grass, heather, wet flushes, bracken
  alb *= mix(1., (.7 + .6 * nB(p.xz * .011 + 2.)) * (.8 + .4 * t2.x), fd);
  // grey schist: bedding lines, pale crusts of lichen, a little yellow-green map lichen, dark where it overhangs
  vec3 rc = vec3(.1, .1, .096) * (.6 + .6 * t1.x) * mix(.5, 1., smoothstep(.18, .4, t1.y));
  rc = mix(rc, vec3(.2, .205, .185), smoothstep(.5, .66, t0.z * .5 + t0.w * .5) * smoothstep(-.3, .4, n.y) * .7);
  rc = mix(rc, vec3(.13, .14, .06), smoothstep(.74, .82, t1.w) * .35);
  alb = mix(alb, rc + vec3(.03, .04, .01) * n3 * (1. - bm), rock);
  if (bm > 0.) n = normalize(n + vec3(t1.x - .45, 0., t1.w - .5) * .6 * bm);
  // trodden and slumped peat: black and wet, drier crumbs, a few small stones on the path
  vec3 pc = mix(vec3(.028, .02, .016), vec3(.085, .06, .042), smoothstep(.35, .75, t0.w * .5 + n3 * .5));
  pc = mix(pc, vec3(.16, .15, .13), smoothstep(.8, .9, t0.z * .4 + t0.w * .6) * path);
  alb = mix(alb, pc, bare * (1. - rock));
  alb = mix(alb, vec3(.8, .84, .9), snow);
  // hoar frost: a fine rime on every strand and sprig, thickest in the clumps' shadows, gone where the sun strikes
  float frm = mix(.42 + .3 * (t0.w - .5), max(.35 + .4 * t0.y * gr + .3 * t0.w * (1. - gr), 1. - cSh) * (.6 + .4 * crown), w);
  alb = mix(alb, vec3(.5, .52, .56), FROST * (1. - rock) * (1. - snow) * frm * .55);
  float veg = (1. - rock) * (1. - bare) * (1. - snow);
  float sv = sunVis(p + n * .5, 2. + .004 * t);
  sv *= mix(1., cSh, veg * (.66 - .21 * gr));
  if (w > 0. && t < 90.) { float ns = nearShadow(p + n * .03, smoothstep(14., 6., t)); sv *= mix(1., clamp((ns - .5) * .9 + .5, 0., 1.), .45); }
  // the stag's long shadow, thrown toward you down his knoll by the low sun: his body an upright ellipse (uC[20]: where
  // he stands, his heading) that the sun's ray from here must pass, its height there inside his shape
  if (t < 140.) {
    vec2 sd = normalize(LS.xz + vec2(1e-6, 0.)), hv = vec2(cos(uC[20].w), sin(uC[20].w)), dq = p.xz - uC[20].xz;
    vec2 o2 = vec2(dot(dq, hv) / .7, dot(dq, vec2(-hv.y, hv.x)) / .27), d2 = vec2(dot(sd, hv) / .7, dot(sd, vec2(-hv.y, hv.x)) / .27);
    float sc = -dot(o2, d2) / dot(d2, d2), yr = p.y + sc * LS.y / max(length(LS.xz), 1e-3) - uC[20].y;
    float lg = smoothstep(1.1, .75, length(o2 + d2 * sc)) * step(0., sc) * smoothstep(1.55, 1.25, yr);
    sv *= 1. - .82 * lg * smoothstep(.0, .2, yr) * (yr < .6 ? .45 + .3 * nA(p.xz * 9.) : 1.);
  }
  float nl = dot(n, LS) + fc * length(LS.xz);
  float dif = mix(max(nl, 0.), clamp((nl + .3) / 1.3, 0., 1.) * .65, veg * w);
  float mu = max(dot(rd, LS), 0.);
  float bk = pow(mu, 3.) * (b + (1. - b) * .3);
  float ao = (1. + .3 * veg * w) * mix(1., mix(.56, .42, gr) + mix(.44, .58, gr) * smoothstep(.1, .6, t0.x), veg * (1. - .4 * gr)) * mix(1., .7 + .3 * smoothstep(5., 16., t), veg);
  vec3 col = alb * (SUNC * sv * (dif + bk * .5) + AMB * (.5 + .5 * n.y) * ao);
  col += SUNC * sv * snow * pow(max(dot(reflect(rd, n), LS), 0.), 8.) * .2;
  // looking into the low sun: the grass blades' tips and the fronds' edges glow, the heather's sprigs catch a little
  vec3 rim = mix(vec3(.07, .04, .04) * smoothstep(.55, .95, t0.w), vec3(.3, .2, .08) * smoothstep(.4, .85, sy), gr);
  rim = mix(rim, vec3(.16, .07, .02) * smoothstep(.4, .85, t0.y), b);
  col += SUNC * sv * pow(mu, 3.) * veg * rim * crown * (1. + 2. * FROST);
  return col;
}
vec3 water(vec3 p, float t, vec3 rd) {
  vec2 q = p.xz * .09 + OFF * .01 + vec2(TT * .05, TT * .03);
  float e = .2;
  vec3 n = normalize(vec3((nB(q) - nB(q + vec2(e, 0.))) * RIPL * 5. + (nC(q * 4.1) - .5) * RIPL * .3, 1., (nB(q) - nB(q + vec2(0., e))) * RIPL * 5. + (nA(q * 4.1 + .7) - .5) * RIPL * .3));
  vec3 r = reflect(rd, n); r.y = abs(r.y) + .002;
  float fr = .02 + .98 * pow(1. - max(-dot(rd, n), 0.), 5.);
  vec3 rc = skyGrad(r);
  vec3 mc = AMB * 1.05 + SUNC * uC[4].w * .2;
  rc = mix(rc, mc, smoothstep(.22, .03, r.y));
  float sv = sunVis(p + vec3(0., 1., 0.), 3.);
  // glitter: the share of ripple facets tipped to throw the sun to you
  vec3 hv = normalize(LS - rd);
  float c2 = hv.y * hv.y, th2 = (1. - c2) / max(c2, 1e-4), m2 = .011 * (1. + RIPL * 2.);
  float D = exp(-th2 / m2) / (PI * m2 * c2 * c2);
  float sp = .4 + 1.4 * smoothstep(.5, .8, nA(p.xz * .7 + vec2(TT * .4, TT * .23)));
  return AMB * vec3(.012, .01, .008) + fr * rc + SUNC * sv * D * sp * .03;
}
void main() {
  vec2 fc = gl_FragCoord.xy / uC[12].w * 2. - 1.;
  vec3 rd = normalize(FW + (fc.x * RT + fc.y * UP) * TANH), ro = CAM;
  HC = hazeC(rd);
  int nk = int(uC[19].w);
  vec2 bmin = uC[13].xy, bmax = bmin + 1. / uC[13].zw;
  float tx = rd.x > 0. ? (bmax.x - ro.x) / rd.x : (bmin.x - ro.x) / min(rd.x, -1e-6);
  float tz = rd.z > 0. ? (bmax.y - ro.z) / rd.z : (bmin.y - ro.z) / min(rd.z, -1e-6);
  float tMax = min(tx, tz);
  if (rd.y > 0.) tMax = min(tMax, (560. - ro.y) / rd.y);
  float mHi = MTOP + BIL * .75 + GZ;
  float t = .05, tp = .05; int kind = 0;
  float stK = .85 / (max(-rd.y, 0.) + .7);
  int nIt = int(uC[19].y);
  // the march and its refinement are one loop (ph 0 marches, ph 1 bisects), so H and mistTop expand once each. The
  // refinement is shared by the ground, the water and the gauzy top of the mist, so the entry is smooth from pixel to
  // pixel; its last step re-reads the height at the final t
  int ph = 0, rk = 0; bool dn = false;
  for (int i = 0; i < nIt + nk + 4; i++) {
    // one exit (Windows compile)
    if (dn || ph == 0 && t > tMax) break;
    float tm = ph == 0 || rk == nk + 3 ? t : .5 * (tp + t);
    vec3 p = ro + rd * tm;
    float h = H(p.xz), s = max(h, WY), dg = p.y - s, dy = dg, mt = -1e9;
    if (ph == 0 ? p.y < mHi && p.y > MBASE : kind == 3 && p.y > MBASE) mt = mistTop(p.xz, h) + GZ;
    if (ph == 0) {
      // a ray grazing the mist's top counts as entering it, never as a hit on the ground far below
      bool m = false;
      if (mt > s) { dy = min(dy, p.y - mt); m = p.y - mt < .0008 * t; }
      if (m || dg < .0008 * t) { kind = m ? 3 : (h > WY ? 1 : 2); ph = 1; }
      else {
      tp = t; t += max(dy * stK * (dy < .3 && dot(p.xz - CAM.xz, p.xz - CAM.xz) < 4300. ? .6 : 1.), p.y < mHi ? .008 * t + .5 : .0012 * t + .006);
      if (i == nIt - 1) { kind = 1; ph = 1; }
      }
    } else {
      if (rk == nk + 3) { if (kind != 3) kind = h > WY ? 1 : 2; dn = true; }
      else {
      if (p.y < max(s, mt)) t = tm; else tp = tm;
      rk++;
      }
    }
  }
  vec3 col = vec3(0.), S = vec3(0.), Lm = AMB * .9;
  float Tm = 1., tF = kind == 0 ? FAR : t, tE = t;
  if (kind == 3) {
    // into the mist: gauze over a soft top, lit gold where the low sun skims the billows, cool in the hollows and the
    // hills' shadow, thinning to wisps where it laps up the slopes. Steps are laid from the entry point (no jitter), so
    // neighbouring pixels integrate nearly the same path and the sea comes out smooth.
    vec3 p0 = ro + rd * t;
    float h0 = H0(p0.xz);
    float m0 = 0., mx = 0., mz = 0.;
    for (int k = 0; k < nk; k++) { float v = mistTop(p0.xz + (k == 1 ? vec2(18., 0.) : k == 2 ? vec2(0., 18.) : vec2(0.)), h0); if (k == 0) m0 = v; else if (k == 1) mx = v; else mz = v; }
    vec3 nT = normalize(vec3(m0 - mx, 18., m0 - mz));
    float hol = clamp((m0 - MTOP) / max(BIL, 1.), -1.5, 1.5);
    float sv = sunVis(p0, 3. + .003 * t), mu = max(dot(rd, LS), 0.);
    float sk = clamp(.6 + (dot(nT, LS) - LS.y) * 9., .2, 1.7) * (.78 + .2 * hol);
    // the billows in the hills' shadow still model: tops see more sky, faces toward the dawn glow are brighter
    float skyS = clamp((.8 + .2 * hol) * (1. + 6. * dot(nT.xz, normalize(LS.xz + vec2(1e-5, 0.)))), .4, 1.4);
    float tm = t;
    kind = 4;
    int nMs = int(uC[19].z);
    float dt = .8 + .0045 * t;
    float dpv = max(p0.y - max(h0, WY), .001);
    bool md = false;
    for (int k = 0; k < nMs; k++) {
      if (md) break;
      tm += dt;
      vec3 q = ro + rd * tm;
      float gh = H0(q.xz), dq = q.y - max(gh, WY);
      // through the mist onto ground or water: one secant step from the last two heights is fine enough in the haze
      if (dq < 0.) { t = tm - dt * dq / (dq - dpv); kind = gh > WY ? 1 : 2; md = true; }
      else {
      dpv = dq;
      vec3 qm = ro + rd * (tm - dt * .5);
      float cl, mt = mistTopC(qm.xz, gh, cl), dep = mt - qm.y;
      // shallow mist over the slopes and the clearings thins into wisps
      float wisp = smoothstep(.0, 16., mt - max(gh, WY) + 10. * (nC(qm.xz * .021 + OFF * .004) - .5));
      float dens = SIG * smoothstep(-GZ, 34., dep) * smoothstep(MBASE - 1., MBASE + 10., qm.y) * wisp * (1. - .85 * cl);
      float a = 1. - exp(-dens * dt);
      float dk = exp(-max(dep, 0.) * .09);
      vec3 n = normalize(mix(vec3(0., 1., 0.), nT, dk));
      Lm = mistLight(dep, n, sv * mix(1., sk, dk), mu) * mix(1., skyS, dk);
      S += Tm * a * Lm;
      Tm *= 1. - a;
      md = Tm < .03;
      dt *= 1.14;
      }
    }
  }
  vec3 p = ro + rd * t;
  if (kind == 0) col = sky(rd);
  else if (kind == 1) col = ground(p, t, rd);
  else if (kind == 2) col = water(p, t, rd);
  else col = Lm;
  if (kind == 1 || kind == 2) col = haze(col, rd, t, p.y);
  if (tE < t || kind == 4) col = haze(S + Tm * col, rd, tE, ro.y + rd.y * tE);
  o = vec4(col, 1.);
  gl_FragDepth = clamp(tF * dot(rd, FW) / FAR, 0., 1.);
}`,ee=v=>{const t=ue.indexOf(v);if(t<0)throw new Error("569 split: "+v);return t},ro=ue.slice(0,ee("vec3 sky(vec3 d) {")),Bo=`
  vec2 fc = gl_FragCoord.xy / uC[12].w * 2. - 1.;
  vec3 rd = normalize(FW + (fc.x * RT + fc.y * UP) * TANH);
  HC = hazeC(rd);
`,ya=ro.replace("out vec4 o;","layout(location = 0) out vec4 o; layout(location = 1) out float oT;")+ue.slice(ee("vec3 mistLight("),ee("float nearShadow("))+ue.slice(ee("void main() {"),ee(`  vec3 p = ro + rd * t;
  if (kind == 0)`))+`  vec3 p = ro + rd * t;
  float gB = kind == 1 || kind == 2 ? 1. : 0.;
  if (kind > 2) col = Lm;
  if (tE < t || kind == 4) { col = haze(S + Tm * col, rd, tE, ro.y + rd.y * tE); gB *= Tm * exp(-tE * HAZEK * (2.3e-4 + 3.e-4 * exp(-max(ro.y + rd.y * tE - uV.w, 0.) / 110.))); }
  o = vec4(col, gB);
  oT = kind == 1 ? t : kind == 2 ? -t : -3e38;
  gl_FragDepth = kind == 0 ? 1. : clamp(tF * dot(rd, FW) / FAR, 0., 1.);
}`,ba=Ut+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 1., 1.); }",Ma=ro+ue.slice(ee("vec3 sky(vec3 d) {"),ee("vec3 mistLight("))+"void main() {"+Bo+`  o = vec4(sky(rd), 0.);
}`,Ta=ro.replace("out vec4 o;","uniform sampler2D uZ; out vec4 o;")+ue.slice(ee("float nearShadow("),ee("void main() {"))+`void main() {
  float t = texelFetch(uZ, ivec2(gl_FragCoord.xy), 0).x;
  if (t < -1e37) discard;
  bool wt = t < 0.; t = abs(t);`+Bo+`  vec3 p = CAM + rd * t;
  o = vec4(haze(wt ? water(p, t, rd) : ground(p, t, rd), rd, t, p.y), 1.);
}`,Po=Ut+"uniform sampler2D uD, uS, uF, uR; out vec2 vL; out vec3 vW; flat out int vI; flat out vec2 vG;"+ke+`
// the ground as the main pass draws it (near map inside far map)
float gH(vec2 p) {
  vec2 q = abs((p - uC[12].xy) * uC[12].z); float w = smoothstep(.49, .42, max(q.x, q.y));
  float h = textureLod(uF, (p - uC[13].xy) * uC[13].zw, 0.).x;
  if (w > 0.) h = mix(h, textureLod(uR, (p - uC[12].xy) * uC[12].z + .5, 0.).x, w);
  return h;
}
void main() {
  int i = gl_InstanceID, c = gl_VertexID;
  bool steam = i >= int(uC[18].x);
  int k = steam ? int(uC[18].z) : i;
  vec4 A = texelFetch(uD, ivec2(k, 0), 0), B = texelFetch(uD, ivec2(k, 1), 0), E = texelFetch(uD, ivec2(k, 2), 0);
  // the deer's and the breath's boxes come from JS (row 4), the birches' from their size
  vec4 bx = B.z > 9. && !steam ? vec4(-E.x * .5, E.x * .5, -1., E.x * 1.05) : texelFetch(uD, ivec2(steam ? 31 : k, 4), 0);
  vec2 q = vec2(c % 2 == 0 ? bx.x : bx.y, c < 2 ? bx.z : bx.w);
  // G: the height of the ground under it and its lie across the card; the hinds read both off the ground itself
  vec2 G = vec2(A.y, 0.);
  // (the stag and a rival: the probe gave the lie of the ground under their hooves, the drawn ground gives its height)
  if (!steam && B.z < 9. && (B.z < .5 || B.z > 1.5)) G.x = gH(A.xz) - .02;
  if (!steam && B.z > .5 && B.z < 1.5) { float yF = gH(A.xz + B.xy * .5 * A.w), yB = gH(A.xz - B.xy * .5 * A.w); G = vec2((yF + yB) * .5 - .03, clamp((yF - yB) / A.w, -.4, .4)); }
  vG = G;
  vec3 P = vec3(A.x, G.x, A.z) + vec3(B.x, 0., B.y) * q.x + vec3(0., q.y, 0.);
  if (steam) P -= normalize(P - CAM) * .3;
  vL = q; vW = P; vI = i;
  vec3 rel = P - CAM; float zf = dot(rel, FW);
  gl_Position = vec4(dot(rel, RT) / TANH, dot(rel, UP) / TANH, (2. * zf / FAR - 1.) * zf, zf);
}`,Do=Ut+"uniform sampler2D uN, uD, uS, uF, uM; uniform vec4 uV; in vec2 vL; in vec3 vW; flat in int vI; flat in vec2 vG; out vec4 o;"+ke+ao+No+`
void main() {
  vec3 rel = vW - CAM; float tq = length(rel); vec3 rd = rel / tq;
  HC = hazeC(rd);
  int i = vI; bool steam = i >= int(uC[18].x);
  int k = steam ? int(uC[18].z) : i;
  vec4 A = texelFetch(uD, ivec2(k, 0), 0), B = texelFetch(uD, ivec2(k, 1), 0), E = texelFetch(uD, ivec2(k, 2), 0);
  vec2 l = vL;
  float pix = tq * PIXA, wy = vG.x + l.y, dm = mistTop(A.xz, vG.x) - wy;
  vec3 oc = vec3(0.); float a = 0.;
  float mu = max(dot(rd, LS), 0.);
  if (steam) {
    // the steam of his breath, lit by the low sun
    int np = int(uC[18].y);
    float dens = 0.;
    for (int j = 0; j < np; j++) {
      vec4 P = texelFetch(uD, ivec2(j, 3), 0);
      vec2 dq = (l - P.xy) / P.z;
      float r2 = dot(dq, dq);
      if (r2 < 4.) dens += 1.1 * P.w * exp(-r2 * 1.7) * smoothstep(.22, .8, nA(l * 3.1 + P.xy * 1.7 + float(j) * 3.3 + vec2(TT * .3, 0.)) * .62 + nB(l * 8.3 - vec2(0., TT * .4) + float(j)) * .38);
    }
    // backlit: thin edges glow (a silver lining), the denser core shades itself grey, so it reads against bright mist
    float core = smoothstep(.25, 1.4, dens);
    a = 1. - exp(-dens * 1.9);
    oc = SUNC * sunVis(A.xyz + vec3(0., 1.6, 0.), 2.) * (.12 + .9 * pow(mu, 5.) + .2 * mu) * (1.25 - .4 * core) + AMB * (.9 - .1 * core);
  } else if (B.z > 9.) {
    // a birch: white trunk, a thin crown of last leaves and hanging twigs
    float hb = E.x;
    float yy = l.y / hb, uu = l.x - E.y * yy * yy * hb;
    float tr = abs(uu) - hb * .011 * (1.3 - yy);
    float tc = clamp(.5 - tr / pix, 0., 1.) * step(yy, .82);
    float s = clamp((yy - .2) / .8, 0., 1.);
    float rr = E.z * hb * pow(sin(PI * s), .6) * (.75 + .5 * nB(vec2(yy * 3., E.w)));
    float tw = nA(vec2(uu / hb * 20., yy * 3. + E.w)) * .55 + nC(vec2(uu / hb * 60., yy * 9. + E.w)) * .45;
    float cc = smoothstep(rr, rr * .5, abs(uu)) * smoothstep(.34, .6, tw) * step(.2, yy) * smoothstep(1., .9, yy);
    a = max(tc, cc * .9);
    float sv = sunVis(vec3(A.x, wy, A.z), 3.);
    float lf = smoothstep(.5, .75, tw) * (1. - tc);
    vec3 alb = mix(vec3(.05, .045, .038), vec3(.3, .21, .05), lf * .7);
    alb = mix(alb, vec3(.34, .33, .31), tc * (.5 + .5 * smoothstep(.0, .5, nA(vec2(E.w, yy * 30.)))));
    oc = alb * (SUNC * sv * (.2 + .45 * pow(mu, 3.)) + AMB * .5);
    a *= exp(-max(dm, 0.) * .09);
  } else {
    // a deer: the limbs of its jointed figure, posed and turned for this view in JS, as tapered capsules blended
    // into one body. Inside, the nearest limb that holds the point lights it, rounded like a limb: its sides turn
    // from you, so the low sun behind rims the outline and the near side stays dark
    int s0 = int(E.x), np = int(E.y);
    vec2 lp = vec2(l.x, l.y - vG.y * l.x), ow = vec2(0.);
    float d = 9., kw = 1e3, tw = 0., zw = 0.;
    for (int j = 0; j < np; j++) {
      int t = 2 * (s0 + j); ivec2 tc = ivec2(t & 127, 5 + (t >> 7));
      vec4 P0 = texelFetch(uD, tc, 0), P1 = texelFetch(uD, tc + ivec2(1, 0), 0);
      vec2 pa = lp - P0.xy, ba = P0.zw - P0.xy;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0., 1.);
      vec2 of = pa - ba * h; float r = mix(P1.x, P1.y, h), di = length(of) - r;
      d = smin(d, di, max(P1.z, 1e-4));
      float tg = floor(P1.w / 20.), z = P1.w - tg * 20. - 10., key = di < 0. ? z - 100. : di;
      if (key < kw) { kw = key; ow = of / r; tw = tg; zw = z; }
    }
    // the coat's ragged edge, the mane's long hanging hair
    float fur = tw == 2. ? .07 : .014;
    d += (nA(vec2(lp.x * 34., lp.y * (tw == 2. ? 5. : 30.)) + E.x) - .45) * fur;
    a = clamp(.5 - d / pix, 0., 1.);
    // standing in the heather: it crosses the legs a hand or two above the hooves
    float hg = E.w * (.55 + .9 * nB(vec2(lp.x * 23., A.x)));
    a *= smoothstep(hg * .6, hg, lp.y - E.z * lp.x - B.w);
    float ql = min(length(ow), 1.);
    vec3 ax3 = vec3(B.x, 0., B.y), tc3 = normalize(vec3(-rd.x, 0., -rd.z));
    vec3 nE = normalize(ax3 * ow.x + vec3(0., ow.y, 0.) + 1e-5);
    vec3 n3 = normalize(nE * ql + tc3 * sqrt(1. - ql * ql));
    float edge = exp(min(d, 0.) / max(.035, pix * 1.2));
    float sv = sunVis(vec3(A.x, wy, A.z), 2.);
    float rim = edge * edge * max(dot(nE, LS), 0.) * (.4 + 2.4 * pow(mu, 3.));
    vec3 alb = B.z > .5 && B.z < 1.5 ? vec3(.06, .044, .032) : vec3(.035, .024, .017);
    alb = tw == 2. ? alb * .7 : tw == 3. ? vec3(.075, .062, .046) : tw == 4. ? vec3(.17, .135, .09) : alb;
    // the far side's limbs in their own shade
    float fs = zw > .06 ? .6 : 1.;
    oc = alb * (SUNC * sv * max(dot(n3, LS), 0.) * .7 * fs + AMB * (.17 + .13 * n3.y) * (.8 + .2 * fs)) + SUNC * sv * rim * fs * vec3(.55, .36, .2) * .6;
    a *= exp(-max(dm, 0.) * .2);
  }
  if (a < .01) discard;
  o = vec4(haze(oc, rd, tq, wy), a);
}`,_o=Ut+`uniform sampler2D uR, uS, uF, uN; uniform vec4 uK, uK2;
out vec2 vUV; out vec3 vW; out vec3 vNr; out float vSh; flat out vec4 vI;`+ke+`
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float rf(uint x) { return float(hsh(x) & 0xffffffu) / 16777215.; }
float nearShV(vec3 p) {
  vec2 sd = normalize(LS.xz + vec2(1e-6, 0.)); float te = LS.y / max(length(LS.xz), 1e-3);
  float s = 1., d = .1;
  int nS = int(uC[19].y) / 30;
  for (int k = 0; k < nS; k++) {
    d *= 1.45;
    vec4 nn = textureLod(uR, (p.xz + sd * d - uC[12].xy) * uC[12].z + .5, 0.);
    float top = nn.x + max(nn.w - .3, 0.) * .9;
    s = min(s, clamp((p.y + te * d - top) / (.05 + .05 * d) + .5, 0., 1.));
  }
  return s;
}
void main() {
  int N = int(uK.y), id = gl_InstanceID, vid = gl_VertexID;
  bool br = uK.x < .5;
  ivec2 ci = ivec2(id % N, id / N) + ivec2(uK2.xy) - N / 2;
  uint sd = (uint(ci.x + 40000) * 92837u + uint(ci.y + 40000) * 689287u) ^ (br ? 0u : 0x9e3779b9u);
  vec4 r = vec4(rf(sd), rf(sd + 1u), rf(sd + 2u), rf(sd + 3u));
  vec2 wp = (vec2(ci) + r.xy) * uK.z;
  // moor grass grows in tussocks: pull the blades in toward each tussock's heart, leaving gaps between
  vec2 tc = wp; float th = 1.;
  if (!br) {
    vec2 cg = floor(wp / .45); uint cs = uint(int(cg.x) + 40000) * 1973u + uint(int(cg.y) + 40000) * 9277u;
    tc = (cg + .25 + .5 * vec2(rf(cs), rf(cs + 1u))) * .45; th = .7 + .6 * rf(cs + 2u);
    wp = tc + (wp - tc) * .55;
  }
  vec2 nu = (wp - uC[12].xy) * uC[12].z + .5;
  vec4 nm = textureLod(uR, nu, 0.);
  float dc = length(wp - CAM.xz);
  bool ok = br ? (nm.w > .4 && r.z < .93) : (nm.w > .1 && nm.w < .45 && textureLod(uN, (wp * .8 + 4.) / 64., 0.).z > .3 + .16 * r.z);
  // collapsed fronds lie flat: further off they'd be edge-on slivers, and the ground's bracken mat shows them there
  bool cf = br && rf(sd + 13u) < .78;
  // past a few metres the fronds are the ground's rust mat; only a scattered few still stand out of it
  ok = ok && !(cf && dc > 8.) && !(br && dc > 9. && rf(sd + 17u) > .25) && dc > (br ? 1.3 : .5) && dc < uK.w && max(abs(nu.x - .5), abs(nu.y - .5)) < .485;
  if (!ok) { gl_Position = vec4(2., 2., 2., 1.); vUV = vec2(0.); vW = vec3(0.); vNr = vec3(0., 1., 0.); vSh = 0.; vI = vec4(0.); return; }
  float fade = smoothstep(uK.w, uK.w * (br ? .55 : .8), dc);
  int seg = vid / 2; float side = float(vid % 2) * 2. - 1.;
  float s = float(seg) / (br ? 7. : 4.);
  vec3 base = vec3(wp.x, nm.x - (br ? .06 : 0.), wp.y);
  float r4 = rf(sd + 7u), r5 = rf(sd + 9u), r6 = rf(sd + 11u);
  float az = r4 * 6.2832;
  vec2 dir = vec2(cos(az), sin(az));
  if (!br) dir = normalize(mix(dir, normalize(wp - tc + 1e-4), .6));
  float gust = uC[11].z * (.5 + .5 * sin(TT * 1.9 + wp.x * .25 - wp.y * .1 + r6 * 2.));
  vec2 wv = vec2(gust * .012 + .015 * sin(TT * 1.3 + r5 * 6.), .01 * sin(TT * 1.1 + r4 * 6.));
  vec3 P, T, lat;
  if (br) {
    float Hf = (.42 + .4 * r.w) * clamp(nm.w / .85, .65, 1.15);
    // by October most fronds have collapsed: they arch low and lie over the mat; a few still stand
    float reach = Hf * (.6 + .4 * r5) * (cf ? 1.35 : 1.), dr = .3 + .45 * r6;
    float A = cf ? .75 : 1.8, Bq = cf ? .6 + .3 * dr : .8 + dr;
    float y = max(Hf * (A * s - Bq * s * s), .02 * s + .01);
    float hx = reach * pow(s, 1.5);
    P = base + vec3(dir.x * hx + wv.x * s * s * Hf, y, dir.y * hx + wv.y * s * s * Hf);
    float s0 = .36, bs = max((s - s0) / (1. - s0), 0.);
    float w = s < s0 ? (dc < 7. ? .006 : 0.) : Hf * .33 * (1. - bs) * smoothstep(0., .12, bs) + .005;
    lat = normalize(vec3(-dir.y, (rf(sd + 15u) - .5) * .9, dir.x));
    P += lat * side * w * .88 + vec3(0., -w * .45 * (.3 + r6), 0.);
    T = normalize(vec3(dir.x * reach * 1.5 * sqrt(max(s, .01)), Hf * (A - 2. * Bq * s), dir.y * reach * 1.5 * sqrt(max(s, .01))));
  } else {
    float Hs = (r6 < .4 ? .12 + .1 * r.w : .24 + .3 * r.w) * th, ln = .2 + .5 * r5;
    P = base + vec3(0., -.04, 0.) + vec3(dir.x, 0., dir.y) * ln * Hs * s * s * 1.1 + vec3(0., Hs * (s - .45 * ln * s * s), 0.) + vec3(wv.x, 0., wv.y) * s * s * .6;
    lat = normalize(cross(vec3(0., 1., 0.), normalize(P - CAM)));
    P += lat * side * (.0035 * (1. - .7 * s) + .0013);
    T = vec3(0., 1., 0.);
  }
  vNr = normalize(cross(T, lat));
  vW = P; vUV = vec2(side, s); vI = vec4(fade, br ? r.w : r6, r5, br ? 0. : 1.);
  vSh = sunVis(P, 2.) * nearShV(P);
  vec3 rel = P - CAM; float zf = dot(rel, FW);
  gl_Position = vec4(dot(rel, RT) / TANH, dot(rel, UP) / TANH, (2. * zf / FAR - 1.) * zf, zf);
}`,Io=Ut+`uniform sampler2D uS, uF;
in vec2 vUV; in vec3 vW; in vec3 vNr; in float vSh; flat in vec4 vI; out vec4 o;`+ke+`
void main() {
  float u = vUV.x, v = vUV.y, au = abs(u);
  vec3 rd = normalize(vW - CAM);
  float a; vec3 alb;
  if (vI.w < .5) {
    float s0 = .36;
    if (v < s0) { a = smoothstep(1., .5, au); alb = vec3(.07, .045, .03); }
    else {
      float bs = (v - s0) / (1. - s0);
      float k = bs * 16. + au * 1.5;
      float f = abs(fract(k) - .5);
      float fk = fwidth(k) * .8 + .015;
      // each pinna notched into pinnules, curled and shrivelled toward its tip, gaps between: lace, not a leaf
      float pn = abs(fract(au * (6. + 6. * (1. - bs)) + floor(k) * .37) - .5);
      float pw = .27 * (1. - au * .6) * (.5 + 1. * pn);
      a = max(smoothstep(.05, .02, au), smoothstep(pw + fk, pw - fk, f));
      a = mix(a, .85, smoothstep(.15, .35, fk));
      float edge = .74 + .24 * smoothstep(.5, .0, f);
      a *= smoothstep(edge + .04, edge - .06, au);
      float ph = fract(sin(floor(k) * 12.9 + vI.z * 78.2) * 4375.5);
      // October bracken: rust, orange and dark brown fronds, a few bleached tan, browned curled edges
      vec3 c1 = vI.z < .45 ? mix(vec3(.24, .085, .03), vec3(.36, .15, .05), vI.y) : vI.z < .7 ? vec3(.4, .19, .065) : vI.z < .88 ? vec3(.2, .085, .032) : vec3(.32, .22, .12);
      c1 = mix(c1, vec3(.22, .18, .05), smoothstep(.97, .995, vI.z));
      c1 = mix(c1, vec3(.1, .05, .028), smoothstep(.5, 1., au) * .55 + smoothstep(.15, .0, .5 - f) * .25);
      alb = c1 * (.7 + .4 * au) * (.75 + .5 * ph) * (.65 + .35 * bs);
    }
  } else {
    // purple moor grass gone to straw: thin blades in tussocks, dark at the base
    a = smoothstep(1., .55, au);
    vec3 gc = vI.y < .4 ? vec3(.34, .16, .07) : vec3(.4, .34, .23) * (.8 + .4 * vI.z);
    alb = mix(vec3(.08, .06, .035), gc, smoothstep(.05, .5, v));
    // the leaf tips bleached almost white-straw by the summer
    alb = mix(alb, vec3(.55, .5, .4), smoothstep(.6, 1., v) * .6 * step(.4, vI.y));
  }
  a *= vI.x;
  if (a < .3) discard;
  vec3 n = normalize(vNr); if (dot(n, rd) > 0.) n = -n;
  float df = dot(n, LS);
  float tr = max(-df, 0.) * (.5 + 1.8 * pow(max(dot(rd, LS), 0.), 3.));
  vec3 trc = vI.w < .5 ? vec3(.9, .45, .18) * .5 : vec3(1., .75, .4);
  vec3 col = alb * (SUNC * vSh * (max(df, 0.) * .9 + tr * trc * 1.3 * (vI.w < .5 ? 1. + 1.2 * smoothstep(.5, 1., au) : 1.)) + AMB * (.35 + .45 * v));
  // dew beads on the blades and fronds: a few pinpoints thrown back from the low sun
  float mu = max(dot(rd, LS), 0.);
  float dw = step(.9, fract(vI.z * 53.1 + floor(v * 9.) * .413)) * smoothstep(.35, .1, abs(fract(v * 9.) - .5));
  col += SUNC * vSh * pow(mu, 8.) * dw * (vI.w < .5 ? 0. : 1.4) * smoothstep(9., 3., length(vW - CAM));
  col = mix(col, (vec3(.6, .63, .68) * (AMB + SUNC * vSh * .5)), FROST * smoothstep(.5, 1., v) * .35);
  o = vec4(col, smoothstep(.3, .7, a));
}`,Ho=Ut+"uniform sampler2D uTg, uS, uF; uniform vec4 uG; out vec4 o;"+ke+`
void main() {
  vec2 uv = gl_FragCoord.xy / uC[12].w;
  vec3 col = textureLod(uTg, uv, 0.).rgb;
  vec2 fc = uv * 2. - 1.;
  vec3 rd = normalize(FW + (fc.x * RT + fc.y * UP) * TANH);
  float vis = 0.;
  if (uG.z > .5) {
    for (int k = 0; k < 5; k++) {
      float an = float(k) * 1.5708;
      vec2 of = k == 0 ? vec2(0.) : vec2(cos(an), sin(an)) * uG.w * .6;
      vec3 c = textureLod(uTg, uG.xy + of, 0.).rgb;
      vis += smoothstep(3., 10., dot(c, vec3(.3, .5, .2))) * .2;
    }
  } else vis = sunVis(CAM, 2.) * uG.w;
  float a2 = max(2. * (1. - dot(rd, LS)), 0.);
  col += SUNC * vis * (.0009 / (a2 + .0008) + .05 * exp(-sqrt(a2) * 4.5)) * .45;
  col *= uC[3].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col *= 1. - .17 * dot(fc * .72, fc * .72);
  float gr = fract(sin(dot(gl_FragCoord.xy + fract(TT * 7.) * 91., vec2(12.9898, 78.233))) * 43758.5453);
  col += (gr - .5) * (2. / 255.);
  o = vec4(col, 1.);
}`,io=["uF","uR","uS"],za=`precision highp usampler2D;
vec4 nfF(highp usampler2D s, ivec2 p) { uvec2 v = texelFetch(s, p, 0).xy; return vec4(unpackHalf2x16(v.x), unpackHalf2x16(v.y)); }
vec4 nfBl(highp usampler2D s, vec2 u) {
  ivec2 n = textureSize(s, 0), m = n - 1; vec2 t = u * vec2(n) - .5, f = fract(t); ivec2 i = ivec2(floor(t));
  ivec2 a = clamp(i, ivec2(0), m), b = clamp(i + 1, ivec2(0), m);
  return mix(mix(nfF(s, a), nfF(s, ivec2(b.x, a.y)), f.x), mix(nfF(s, ivec2(a.x, b.y)), nfF(s, b), f.x), f.y);
}
vec4 nfDec(vec4 e) { vec3 y = e.rgb * e.rgb; return vec4(y / max(1. - y, 1e-3), e.a); }
`,Aa=v=>{const t=[];let T=0,w=0;for(let _=0;_<v.length;_++){const l=v[_];l==="("||l==="["?T++:l===")"||l==="]"?T--:l===","&&!T&&(t.push(v.slice(w,_)),w=_+1)}return t.push(v.slice(w)),t},me=(v,t)=>{v=v.replace(`#define FAR 60000.
`,`#define FAR 60000.
`+za),v=v.replace(/uniform sampler2D ([^;]+);/g,(_,l)=>{const lt=l.split(",").map(X=>X.trim()),et=lt.filter(X=>!io.includes(X)),B=lt.filter(X=>io.includes(X));return(et.length?"uniform sampler2D "+et.join(", ")+";":"")+B.map(X=>" uniform usampler2D "+X+";").join("")});let T="",w=0;for(;;){const _=v.indexOf("textureLod(",w);if(_<0)break;let l=_+11,lt=1;for(;lt;){const X=v[l++];X==="("?lt++:X===")"&&lt--}const et=Aa(v.slice(_+11,l-1)),B=et[0].trim();if(io.includes(B))T+=v.slice(w,_)+"nfBl("+B+","+et[1]+")";else if(B==="uTg")T+=v.slice(w,_)+"nfDec("+v.slice(_,l)+")";else{T+=v.slice(w,_+11),w=_+11;continue}w=l}return v=T+v.slice(w),t==="p"&&(v=v.replace("out vec4 o;","vec4 o; out uvec4 oP;").replace("void main()","void main0()")+`
void main() { main0(); oP = uvec4(packHalf2x16(o.xy), packHalf2x16(o.zw), 0u, 0u); }`),t==="e"&&(v=v.replace("void main()","void main0()")+`
void main() { main0(); vec3 x = max(o.rgb, 0.); o.rgb = sqrt(x / (1. + x)); }`),v},Go=(v,t,T,w,_)=>{let l=_>>>0;const lt=()=>(l=Math.imul(l,1664525)+1013904223>>>0,l/4294967296),et=T[T.length-1],B=Math.ceil((et[0]+et[1]+.3)*te),X=w?[[1.4,.3,.25],[3.3,.15,.15]]:[[.85,.13,.35],[2.45,.3,.3],[5.6,.17,.18],[7.3,.07,.12]],Et=B+Math.ceil((X[X.length-1][0]+.2)*te),nt=new Float32Array(B),Yt=new Float32Array(Et),Q=[250,470,800,1250,1950],S=[60,80,120,170,240],Oe=[1,.85,.55,.32,.14],pe=new Float32Array(5),z=new Float32Array(5),k=new Float32Array(5),P=new Float32Array(5),C=new Float32Array(5);let ot=0,a=0,A=0,O=0,mt=0;for(let E=0;E<B;E++){const Zt=E/te;for(;a<T.length-1&&Zt>T[a][0]+T[a][1];)a++;const G=T[a],pt=(Zt-G[0])/G[1],Jt=pt>=0&&pt<=1?St(0,.1,pt)*(1-St(.7,1,pt))*G[2]:0;if(!(E&63)){const bt=t*(1.12-.24*j(pt,0,1));for(let ft=0;ft<5;ft++){const Dt=Q[ft]*bt,_t=Math.exp(-Math.PI*S[ft]/te);k[ft]=-2*_t*Math.cos(we*Dt/te),P[ft]=_t*_t,C[ft]=(1-_t)*Oe[ft]}mt=(lt()-.5)*.04}const Lt=v*(.82+.3*Math.sin(Math.PI*Math.min(j(pt,0,1)*1.25,1)))*(1+mt+.015*Math.sin(Zt*37));ot+=Lt/te;const Ee=ot%1,oe=Math.floor(ot);let Z=Ee<.45?Math.sin(Math.PI*Ee/.45)**2:0;Z=(Z-.3)*(oe&1?.62:1),O=O*.6+(lt()*2-1)*.4;const Se=(Z+O*.35)*Jt;let vt=0;for(let bt=0;bt<5;bt++){const ft=C[bt]*Se-k[bt]*pe[bt]-P[bt]*z[bt];z[bt]=pe[bt],pe[bt]=ft,vt+=ft}w&&(A+=(vt-A)*.22,vt=A),nt[E]=vt}Yt.set(nt);for(const[E,Zt,G]of X){let pt=0;const Jt=Math.round(E*te);for(let Lt=0;Lt<B;Lt++)pt+=(nt[Lt]-pt)*G,Yt[Jt+Lt]+=pt*Zt}let rt=0;for(let E=0;E<Et;E++)rt=Math.max(rt,Math.abs(Yt[E]));const Pt=.95/(rt||1);for(let E=0;E<Et;E++)Yt[E]*=Pt;return Yt},Uo=(()=>{let v=null,t=0,T=1,w=0,_=0,l=0,lt=0,et=[0,0,0,0];const B=(z,k)=>[z[0]+k[0],z[1]+k[1],z[2]+k[2]],X=(z,k)=>[z[0]*k,z[1]*k,z[2]*k],Et=(z,k,P)=>[z[0]+(k[0]-z[0])*P,z[1]+(k[1]-z[1])*P,z[2]+(k[2]-z[2])*P],nt=(z,k,P)=>{const C=Math.cos(P),ot=Math.sin(P),a=z[0]-k[0],A=z[1]-k[1];return[k[0]+C*a-ot*A,k[1]+ot*a+C*A,z[2]]},Yt=(z,k,P)=>{const C=Math.cos(P),ot=Math.sin(P),a=z[0]-k[0],A=z[2]-k[2];return[k[0]+C*a+ot*A,z[1],k[2]-ot*a+C*A]},Q=z=>{const k=z[0]*w-z[2]*T;return[z[0]*T-z[2]*w+l,z[1]+k*_+lt,k]},S=(z,k,P,C,ot,a)=>{const A=Q(z),O=Q(k),mt=t*8;v[mt]=A[0],v[mt+1]=A[1],v[mt+2]=O[0],v[mt+3]=O[1],v[mt+4]=P,v[mt+5]=C,v[mt+6]=ot,v[mt+7]=a*20+Math.max(-9.9,Math.min(9.9,(A[2]+O[2])*.5))+10;const rt=Math.max(P,C);et[0]=Math.min(et[0],A[0]-rt,O[0]-rt),et[1]=Math.max(et[1],A[0]+rt,O[0]+rt),et[2]=Math.min(et[2],A[1]-rt,O[1]-rt),et[3]=Math.max(et[3],A[1]+rt,O[1]+rt),t++},Oe=(z,k,P,C,ot)=>{const a=k[0]-z[0],A=k[1]-z[1];let O=Math.hypot(a,A);const mt=a/O,rt=A/O;O=Math.min(O,(P+C)*.999);const Pt=(P*P-C*C+O*O)/(2*O),E=Math.sqrt(Math.max(P*P-Pt*Pt,0));return[z[0]+mt*Pt-rt*E*ot,z[1]+rt*Pt+mt*E*ot,(z[2]+k[2])*.5]};return{build:(z,k,P,C,ot)=>{v=z,t=k,T=Math.cos(ot.psi),w=Math.sin(ot.psi),_=ot.tel,l=ot.ou||0,lt=ot.oy||0,et=[9,-9,9,-9];const a=P.S,A=P.hind,O=P.calf,mt=P.J,rt=C.lie||0,Pt=(M,U,J)=>[M*a,U*a,J*a],E=A?.8:1,Zt=rt*.5*a,G=(M,U,J)=>[M*a,U*a-Zt,J*a],pt=G(.33,.85,0),Jt=G(.08,.9,0),Lt=G(.3,1.02,0),Ee=G(.04,1,0),oe=G(.08,.93,0),Z=G(-.3,.99+.02*A,0),Se=G(-.36,.98,0),vt=G(-.55,.99,0);S(pt,Jt,.27*a*E,.26*a*E,.02,0),S(Lt,Ee,.17*a*E,.14*a*E,.1*a,0),S(oe,Z,.25*a*E,.18*a*E,.12*a,0),S(Se,vt,.19*a*E,.16*a*E,.1*a,0),S(G(-.6,.98,0),G(-.67,.87,0),.1*a*E,.08*a*E,.03*a,4);const bt=C.tail||0;S(G(-.68,1.03,0),G(-.73-.04*bt,.9+.08*bt,0),.045*a,.035*a,.02*a,0);const ft=C.st||0,Dt=(C.sa||0)*a;for(let M=-1;M<=1;M+=2){const U=.12*M*a*E,J=.13*M*a*E,at=[ft+(M>0?Math.PI:0),ft+(M>0?0:Math.PI)+1.6];for(let I=0;I<2;I++){const ut=Math.sin(at[I]),ht=Math.max(0,Math.cos(at[I]))*Math.min(1,Dt*6),K=I?J:U,Vt=(I?-.6:.34)*a+ut*Dt*.5+(M>0?I?-.05:.07:0)*a*(1-Math.min(1,Dt*4)),L=C.gy?C.gy(Vt,K):0;if(rt>.5){I?(S(G(-.42,.9,K),[-.18*a,.12*a,K],.15*a,.09*a,.05*a,0),S([-.18*a,.12*a,K],[.05*a,.07*a,K],.05*a,.03*a,.02*a,0)):(S(G(.26,.68,K),[.42*a,.1*a,K],.065*a,.04*a,.04*a,0),S([.42*a,.1*a,K],[.2*a,.05*a,K],.035*a,.03*a,.01*a,0));continue}const Mt=[Vt,L+ht*.06*a,K],$=[Vt-.02*a-ht*.04*a,L+(.08+ht*.06)*a,K];if(I){const Qt=G(-.46,.95,K*.6),q=G(-.38+ut*Dt*.1/a,.72,K),V=Oe(q,$,.33*a*(O?1.1:1),.38*a*(O?1.1:1),-1);S(Qt,q,.17*a*E,.095*a*E,.16*a,0),S(G(-.6,.9,K*.6),V,.09*a*E,.045*a,.08*a,0),S(q,V,.07*a,.042*a,.04*a,0),S(V,$,.034*a,.027*a,.01*a,0),S($,Mt,.027*a,.03*a,.006*a,0)}else{const Qt=G(.27+ut*Dt*.1/a,.68,K),q=G(.34,.95,K),V=Oe(Qt,$,.34*a*(O?1.12:1),.27*a*(O?1.12:1),1);S(q,Qt,.12*a*E,.07*a,.06*a,0),S(Qt,V,.062*a,.038*a,.03*a,0),S(V,$,.032*a,.026*a,.01*a,0),S($,Mt,.027*a,.03*a,.006*a,0)}}}const _t=G(.38,.98,0),Ot=C.an,Fe=(C.nl||1)*.5*a;let it=B(_t,[Math.cos(Ot)*Fe,Math.sin(Ot)*Fe,0]);it=Yt(it,_t,(C.hy||0)*.45);const Nt=P.nk||1;if(A)S(_t,it,.17*a,.08*a,.12*a,0);else{S(_t,it,.26*a*Nt,.13*a*Math.sqrt(Nt),.14*a,0);const M=B(_t,[.04*a,-.16*a*Nt,0]),U=Et(_t,it,.8);S(M,B(U,[0,-.08*a,0]),.17*a*Nt,.1*a*Nt,.1*a,2)}const de=C.hp,ae=-.6,Ze=(C.hy||0)*.55,qe=C.hr||0,Y=A?O?.3:.38:.44,Tt=M=>{let U=nt(B(it,M),it,de-ae);if(qe){const J=[Math.cos(de),Math.sin(de),0],at=[U[0]-it[0],U[1]-it[1],U[2]-it[2]],I=Math.cos(qe),ut=Math.sin(qe),ht=at[0]*J[0]+at[1]*J[1],K=[J[1]*at[2],-J[0]*at[2],J[0]*at[1]-J[1]*at[0]];U=[it[0]+at[0]*I+K[0]*ut+J[0]*ht*(1-I),it[1]+at[1]*I+K[1]*ut+J[1]*ht*(1-I),it[2]+at[2]*I+K[2]*ut]}return Ze?Yt(U,it,Ze):U},ge=[Math.cos(ae),Math.sin(ae),0],Re=[-Math.sin(ae),Math.cos(ae),0],xt=(M,U)=>B(X(ge,M*a),X(Re,U*a));S(Tt(xt(-.02,0)),Tt(xt(Y*.62,0)),(A?.075:.1)*a,(A?.055:.075)*a,.05*a,0),S(Tt(xt(Y*.55,0)),Tt(xt(Y,-.02)),(A?.05:.068)*a,(A?.032:.042)*a,.03*a,0);const F=C.m||0;if(!A){const M=xt(.1,-.05),U=nt(xt(Y*.95,-.07),M,-F*.55);S(Tt(M),Tt(U),.05*a,.028*a,.03*a,0)}const zt=A?O?1.15:1:.62,It=C.ear||0;for(let M=-1;M<=1;M+=2){const U=xt(-.04,.05),J=B(U,X(B(X(ge,-.07-.06*It),B(X(Re,.07*(1-It)),[0,0,.11*M])),a*zt)),at=B(J,X(B(X(ge,-.04-.05*It),B(X(Re,.03),[0,0,.06*M])),a*zt));S(Tt(U),Tt(J),.02*a,.042*a*zt,.015*a,0),S(Tt(J),Tt(at),.042*a*zt,.01*a,.01*a,0)}if(P.ant){const M=P.ant,U=M===1?.7:M===3?1.08:M===4?1.12:1,J=(M===3?.05:M===1?.034:.044)*a;for(let at=-1;at<=1;at+=2){const I=L=>1+(mt[(L+(at>0?12:0))%24]-.5)*.3,ut=(L,Mt,$)=>Tt(B(xt(-.02,.07),Pt(L*U,Mt*U,$*U*at))),ht=[[0,0,.05],[-.06,.25*I(0),.17*I(1)],[-.13,.48,.27*I(2)],[-.18*I(3),.67,.31],[-.13,.84*I(4),.25]];M===4&&(ht[3]=[-.12,.66,.3],ht[4]=[-.04,.86,.24]);const K=ht.map(L=>ut(L[0],L[1],L[2]));for(let L=0;L<4;L++)S(K[L],K[L+1],J*(1-L*.17),J*(1-(L+1)*.17)+.004*a,.01*a,3);const Vt=(L,Mt,$,Qt,q,V)=>{const ne=Et(ht[L],ht[L+1],Mt),ve=[ne[0]+$*q*.55,ne[1]+Qt*q*.5,ne[2]+.02],Ce=[ve[0]+$*q*.35,ve[1]+q*.55,ve[2]-.01],Bt=ut(ne[0],ne[1],ne[2]),m=ut(ve[0],ve[1],ve[2]),Je=ut(Ce[0],Ce[1],Ce[2]);S(Bt,m,V*a,V*.6*a,.006*a,3),S(m,Je,V*.6*a,.006*a,.002*a,3)};if(Vt(0,.25,1,.25,.3*I(5),.024),(M===2||M===3)&&Vt(0,.7,1,.1,.24*I(6),.021),M!==4&&Vt(1,.75,.9,.2,(M===1?.17:.22)*I(7),.02),M===1||M===2){const L=ht[3],Mt=[L[0]+.1*I(8),L[1]+.2,L[2]-.03];S(ut(...L),ut(...Mt),.018*a,.005*a,.004*a,3)}if(M===3){const L=ht[3];for(const Mt of[[.12,.17,-.03],[.02,.22,-.08],[-.1,.15,.02]]){const $=[L[0]+Mt[0]*I(9),L[1]+Mt[1]*I(10),L[2]+Mt[2]];S(ut(...L),ut(...$),.019*a,.005*a,.006*a,3)}}}}if(C.tuft){const M=Tt(B(xt(-.02,.07),Pt(-.06,.3,.1)));S(M,B(M,[.03*a,-.2*a*C.tuft,.05*a]),.06*a,.03*a,.03*a,2)}const qt=Tt(xt(Y+.02,-.03)),se=Q(qt),ye=Q(Tt(xt(Y+.3,-.03-.25*F)));return{n:t,bb:et.slice(),mouth:[se[0],se[1],ye[0]-se[0],ye[1]-se[1]]}}}})();Fo.add({num:569,name:"Roaring Stag",fam:"Vistas",recipe:"A heather slope above a glen at dawn, where the valley floor is a sea of mist with the loch glinting through, and a stag in the rut roars below you with his breath steaming. The light, the mist and his antlers change every mint, and rare ones get a hard frost or no hinds at all. He roars when he likes and a rival sometimes answers. Drag left or right to pour the mist along the glen, or hold to let the sun climb and lift the mist off the loch.",interactive:"Drag left or right to send a breeze along the glen that pours the mist and opens windows onto the loch; hold and the sun climbs over the hills, the glen fills with gold and the mist lifts off the loch. The stag roars when he will, and a rival answers from across the glen.",music:!0,gl:!0,fps:30,seed:0,make(v){const t=v.gl,T=v.size,w=!!v.home;let _=1453133313;for(let e=2;e<66;e+=8)_=Math.imul(_^parseInt(v.hash.slice(e,e+8),16),2246822507)^_>>>13;const l=()=>{_=_+1831565813|0;let e=Math.imul(_^_>>>15,1|_);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},lt=e=>{let o=0;for(const f in e)o+=e[f];let n=l()*o;for(const f in e)if(n-=e[f],n<0)return f;return Object.keys(e)[0]},et=v.trait("Light",w?"Gold sunrise":lt({"Gold sunrise":46,"Pink before the sun":22,"Red sun in haze":18,"Hoar frost":14})),B=v.trait("Mist",w?"Sea of mist":lt({"Sea of mist":48,"Mist in rags":32,"Brim full":20})),X=v.trait("Stag",w?"Ten pointer":lt({"Ten pointer":40,"Young six pointer":28,Royal:20,Switch:12}));let Et=1000280775;for(let e=2;e<66;e+=8)Et=Math.imul(Et^parseInt(v.hash.slice(e,e+8),16),668265263)^Et>>>14;const nt=()=>{Et=Et+1831565813|0;let e=Math.imul(Et^Et>>>15,1|Et);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Yt=e=>{let o=0;for(const f in e)o+=e[f];let n=nt()*o;for(const f in e)if(n-=e[f],n<0)return f;return Object.keys(e)[0]},Q=v.trait("Stag is",w?"Roaring":Yt({Roaring:40,Watching:22,Walking:10,Thrashing:10,"Lying up":10,Herding:8})),S=nt(),Oe=nt()<.5?1:-1,pe=nt(),z=nt(),k=v.trait("Hinds",w?"Five hinds":lt({"Five hinds":38,"A dozen hinds":28,"Hinds and calves":22,Alone:12})),P=v.trait("Rival",w?"Across the glen":lt({"Across the glen":50,"Two rivals":32,"Only the echo":18})),C=v.trait("Birches",w?"A few in the mist":lt({"A few in the mist":46,"A birch wood":30,None:24})),ot=v.trait("Hills",w?"Rounded ranges":lt({"Rounded ranges":50,"Long glen":30,"Jagged peaks":20})),a=v.trait("Slope",w?"Bronze bracken":lt({"Bronze bracken":46,"Heather moor":30,"Bracken sea":24}));let A=2050776721;for(let e=2;e<66;e+=8)A=Math.imul(A^parseInt(v.hash.slice(e,e+8),16),2654435761)^A>>>11;const O=()=>{A=A+1831565813|0;let e=Math.imul(A^A>>>15,1|A);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},mt=O(),rt=O()<.5?-1:1,Pt=v.trait("Standpoint",w||mt<.55?"Above the knoll":mt<.85?"Higher up the slope":"Down the glen"),E=Pt==="Higher up the slope",Zt=Pt==="Down the glen",G=et==="Hoar frost",pt=et==="Pink before the sun",Jt=et==="Red sun in haze",Lt=pt?-1.3:Jt?1.8+l():G?3+2*l():w?3.4:2.6+2.2*l(),Ee=Jt?2.3:G?.75:1,oe=w?.3:(l()<.5?-1:1)*(.2+.65*l()),Z=(w?0:(l()-.5)*.3)+(Zt?rt*.8:0),Se=E?-.2:-.16,vt=w?650:600+110*l(),bt=w?.4:.37+.07*l(),ft=-179,Dt=ft+9,Ot=Dt+(B==="Brim full"?125:B==="Mist in rags"?60:84),Fe=B==="Mist in rags"?7:B==="Brim full"?12:9;let it=w?4.5:-10+22*l(),Nt=w?22:20+8*l();if(Zt){const e=Z-rt*.19,o=20+(Nt-20)*.5;it=Math.sin(e)*o,Nt=Math.cos(e)*o}const de=ot==="Long glen",ae=ot==="Jagged peaks",Ze=de?-40:10+(w?0:40*(l()-.5)),qe=Math.abs(oe+Z)<1.3?j(Math.tan(oe+Z)*(vt+1100),-4500,4500):0,Y=new Float32Array([vt,w?90:60+80*l(),w?1.1:we*l(),bt,Dt,ft,-1800-(w?0:1500*l()),2400+(w?0:1500*l()),it,Nt,4.2+(w?0:l()*1.2),12,-vt-430,205+(w?0:50*l()),Ze,.36,w?.16:.06+.1*l(),0,0,w?3.1:40*l(),0,B==="Mist in rags"?120:170,130,qe,0,0,0,0]),Tt=a==="Bracken sea"?.4:a==="Heather moor"?.64:.5,ge=1.6,Re=(it-3-ge)/Nt,xt=new Float32Array([Tt,ge,Re,Dt]),F=t.__c569||(t.__c569=(()=>{{const g=t.getExtension("KHR_parallel_shader_compile");g&&g.maxShaderCompilerThreadsKHR&&g.maxShaderCompilerThreadsKHR(4294967295)}const e=(g,s)=>{const u=t.createShader(s);return t.shaderSource(u,g),t.compileShader(u),u},o=e(ga,t.VERTEX_SHADER),n=!!t.getExtension("EXT_color_buffer_float"),f=!n&!t.getExtension("EXT_color_buffer_half_float");let h=String(t.getParameter(t.RENDERER));if(!/ANGLE|Direct3D/.test(h)){const g=t.getExtension("WEBGL_debug_renderer_info");g&&(h=String(t.getParameter(g.UNMASKED_RENDERER_WEBGL)))}const d=!f&&n&&/Direct3D|D3D1/.test(h),p=f?{noise:[o,Co],bake:[o,no],bakeU:[o,me(no,"p")],shadow:[o,me(Lo,"p")],main:[o,me(ue,"e")],veg:[e(me(_o),t.VERTEX_SHADER),me(Io,"e")],obj:[e(me(Po),t.VERTEX_SHADER),me(Do,"e")],comp:[o,me(Ho)]}:{noise:[o,Co],bake:[o,no],shadow:[o,Lo],main:[o,d?ya:ue],veg:[e(_o,t.VERTEX_SHADER),Io],obj:[e(Po,t.VERTEX_SHADER),Do],comp:[o,Ho]},x={};d&&(p.grnd=[o,Ta],p.sky=[e(ba,t.VERTEX_SHADER),Ma]);for(const g in p){const s=t.createProgram(),u=e(p[g][1],t.FRAGMENT_SHADER);t.attachShader(s,p[g][0]),t.attachShader(s,u),t.linkProgram(s),x[g]={p:s,f:u,v:p[g][0]}}return t.flush(),{P:x,nf:f,split:d,fresh:!0,slots:{big:[],small:[],n:0},rts:{}}})()),zt=(e,o,n,f,h,d,p,x)=>{const g=t.createTexture();return t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,n,e,o,0,f,h,x||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,d),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,p),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,p),g},It=(e,o)=>{const n=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),o&&t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,o),n},qt=T>450,se=-5200,ye=-1900,M=10400,U=5800,J=qt?1280:512,at=qt?640:256,I=qt?768:384,ut=qt?384:192,ht=qt?512:256,K=0,Vt=12,L=52,Mt=new Float32Array(128),$=(e,o,n)=>{Mt[e*2]=o,Mt[e*2+1]=n},Qt=ge-13*Re>0?-6:6,q=E?-Math.sin(Z)*13+Math.cos(Z)*Qt:0,V=E?-Math.cos(Z)*13-Math.sin(Z)*Qt:0,ne=E?rt*.3:0;$(0,q,V),$(1,q+1.5,V),$(2,q,V+1.5);const ve=(e,o)=>{const n=Math.hypot(e,o)||1;return[-e/n,-o/n]},Ce=(e,o)=>{const n=ve(e,o);return[-n[1],n[0]]},Bt=w?-1:(it>2?-1:1)*(l()<.8?1:-1),m={x:it+.2,z:Nt-.3,f:Bt,ax:Ce(it,Nt)};$(3,m.x+m.ax[0]*Bt*.5,m.z+m.ax[1]*Bt*.5),$(4,m.x-m.ax[0]*Bt*.62,m.z-m.ax[1]*Bt*.62),m.aw=[-m.ax[1],m.ax[0]],Math.hypot(m.x+m.aw[0],m.z+m.aw[1])<Math.hypot(m.x,m.z)&&(m.aw=[-m.aw[0],-m.aw[1]]);for(let e=0;e<4;e++)for(let o=0;o<6;o++){const n=(o-2.5)*1.5,f=(e-1.5)*1.5;$(5+e*6+o,m.x+m.ax[0]*n+m.aw[0]*f,m.z+m.ax[1]*n+m.aw[1]*f)}const Je=w||S<.45?0:S<.7?1:S<.85?2:Q==="Lying up"?1:3,Oo=(Bt>0?0:Math.PI)+[-.2,-.75,.8,-1.25][Je]*Bt+(Je?(nt()-.5)*.3:0),Le=k==="Five hinds"?5:k==="A dozen hinds"?12:k==="Hinds and calves"?6:0,Wt=[];for(let e=0;e<Le;e++){e>1&&l(),l(),l();const o=k==="Hinds and calves"&&e>=4,n=l(),f=l(),h=l(),d=l()*we;Wt.push({calf:o,fr:n,sc:o?.6+.06*f:.86+.08*f,tm:3+16*h,ph:d,w:.45+.5*h,st:f<.5?0:1,fs:.8+.2*(f*7%1),g:-1,lv:-1,up:!1,sen:!1,rT:-1})}const Ne=.82/64,Be=Z+ne-.41;Y[18]=q,Y[20]=V;const ka=C==="None"?0:C==="A birch wood"?11:5,re=[],Ea=(l()-.5)*2.2;for(let e=0;e<32;e++){const o=C==="A birch wood"?Ea+(l()-.5)*.5:(l()-.5)*2.8,n=220+640*l();re.push([Math.sin(o+Z)*n,Math.cos(o+Z)*n]),$(29+e,re[e][0],re[e][1])}const wt=64,Ht=32,qo=-5e3,co=-200,Vo=1e4/wt,Wo=2400/Ht,Pe=new Float32Array(wt*Ht),Xo=new Float32Array(wt*Ht),Ko=new Float32Array(wt*Ht),jo=new Float32Array(128*Ht),Qe=[];Math.abs(oe)<1.2&&Qe.push([j(Math.tan(oe+Z)*(vt+30),-4500,4500),vt+30,230,1]),Qe.push([w?-760:(l()-.5)*2600,vt-40+(w?0:80*(l()-.5)),w?180:140+100*l(),.95]);const Sa=B==="Mist in rags"?6:B==="Brim full"?0:w?1:Math.floor(l()*3);for(let e=0;e<Sa;e++)Qe.push([(l()-.5)*6e3,vt+(l()-.5)*300,110+160*l(),.7+.3*l()]);for(let e=0;e<Ht;e++)for(let o=0;o<wt;o++){const n=qo+(o+.5)*Vo,f=co+(e+.5)*Wo;let h=0;for(const d of Qe)h=Math.max(h,d[3]*St(d[2],d[2]*.35,Math.hypot((n-d[0])*.8,f-d[1])));Ko[e*wt+o]=h,Pe[e*wt+o]=h}{const e=new Float32Array(153).map(()=>l());for(let o=0;o<Ht;o++)for(let n=0;n<128;n++){const f=n/8,h=o/4,d=Math.floor(f),p=Math.floor(h),x=f-d,g=h-p,s=(c,y)=>e[y%9*17+c%16],u=(s(d,p)*(1-x)+s(d+1,p)*x)*(1-g)+(s(d,p+1)*(1-x)+s(d+1,p+1)*x)*g;jo[o*128+n]=St(.55,.8,u)}}let lo=!0;const $e=new Uint16Array(wt*Ht),Yo=new Float32Array(1),Fa=new Uint32Array(Yo.buffer),Ra=e=>{Yo[0]=e;const o=Fa[0],n=(o>>>23&255)-112;return n<=0?0:n<<10|o>>>13&1023},D=F.P;if(F.fresh){if(F.ready=n=>{if(!t.getProgramParameter(D[n].p,t.LINK_STATUS))throw new Error("569 "+n+": "+t.getShaderInfoLog(D[n].f)+t.getShaderInfoLog(D[n].v)+t.getProgramInfoLog(D[n].p));const f=D[n].p,h={};D[n]=h,h.p=f;const d=t.getProgramParameter(f,t.ACTIVE_UNIFORMS);for(let p=0;p<d;p++){const x=t.getActiveUniform(f,p).name.replace("[0]","");h[x]=t.getUniformLocation(f,x)}t.useProgram(f),["uN","uF","uR","uS","uM","uL","uD","uTg","uGt","uH","uZ"].forEach((p,x)=>{h[p]&&t.uniform1i(h[p],x)})},F.split)for(const n of["noise","bake","bakeU","shadow"])D[n]&&F.ready(n);else for(const n in D)n!=="main"&&F.ready(n);F.vao=t.createVertexArray(),F.tN=zt(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT);const e=It(F.tN);t.bindVertexArray(F.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.viewport(0,0,256,256),t.useProgram(D.noise.p),t.uniform4f(D.noise.uMo,0,0,0,0),t.drawArrays(t.TRIANGLES,0,3),t.deleteFramebuffer(e),F.tG=zt(512,512,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.REPEAT);const o=It(F.tG);t.viewport(0,0,512,512),t.uniform4f(D.noise.uMo,1,0,0,0),t.drawArrays(t.TRIANGLES,0,3),t.deleteFramebuffer(o),t.bindTexture(t.TEXTURE_2D,F.tG),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),F.tPr=zt(64,97,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE),F.fPr=It(F.tPr),t.bindFramebuffer(t.FRAMEBUFFER,null),F.fresh=!1}const gt=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},fo=()=>{t.bindVertexArray(F.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.depthMask(!0)};fo(),t.bindFramebuffer(t.FRAMEBUFFER,F.fPr),t.viewport(0,0,64,97),t.useProgram(D.bake.p),gt(0,F.tN),t.uniform4fv(D.bake.uT,Y),t.uniform4fv(D.bake.uV,xt),t.uniform4f(D.bake.uMo,2,1,1,0),t.uniform4fv(D.bake.uP,Mt),t.uniform4f(D.bake.uA,q,V,Be,Ne),t.drawArrays(t.TRIANGLES,0,3);const Ft=new Uint8Array(64*97*4);t.readPixels(0,0,64,97,t.RGBA,t.UNSIGNED_BYTE,Ft),t.bindFramebuffer(t.FRAMEBUFFER,null);const ie=e=>(Ft[e*4]*65536+Ft[e*4+1]*256+Ft[e*4+2])/16777215*1200-600,ho=ie(0),Ca=(ie(1)-ho)/1.5,La=(ie(2)-ho)/1.5,At=ho+1.65;{const e=ie(3),o=ie(4);m.y=(e+o)/2-.05,m.shear=(e-o)/1.12;const n=Math.atan2(m.x-q,m.z-V),f=Math.hypot(m.x-q,m.z-V),h=Math.round((n-Be)/Ne-.5);if(h>=0&&h<64){const d=u=>{const c=(u*64+h)*4;return(Ft[c]*65536+Ft[c+1]*256+Ft[c+2])/16777215*1200-600},p=u=>2.5+(u-1)*(1+.0115*(u-1));let x=-9,g=-1;for(let u=1;u<97&&p(u)<f+1;u++){const c=p(u),y=(d(u)-At)/c;c>f-8&&y>x+.45/c&&(g=c),x=Math.max(x,y)}if(((e+o)/2-At+.3)/f<x&&g>0){const u=f-g+.6;m.x-=Math.sin(n)*u,m.z-=Math.cos(n)*u,$(3,m.x+m.ax[0]*Bt*.5,m.z+m.ax[1]*Bt*.5),$(4,m.x-m.ax[0]*Bt*.62,m.z-m.ax[1]*Bt*.62);for(let c=0;c<4;c++)for(let y=0;y<6;y++){const b=(y-2.5)*1.5,dt=(c-1.5)*1.5;$(5+c*6+y,m.x+m.ax[0]*b+m.aw[0]*dt,m.z+m.ax[1]*b+m.aw[1]*dt)}t.bindFramebuffer(t.FRAMEBUFFER,F.fPr),t.viewport(0,0,64,97),t.useProgram(D.bake.p),t.uniform4fv(D.bake.uP,Mt),t.drawArrays(t.TRIANGLES,0,3),t.readPixels(0,0,64,97,t.RGBA,t.UNSIGNED_BYTE,Ft),t.bindFramebuffer(t.FRAMEBUFFER,null),m.y=(ie(3)+ie(4))/2-.05}}m.gr=new Float32Array(24);for(let d=0;d<24;d++)m.gr[d]=ie(5+d)}if(Le){let e=1374496523;for(let r=2;r<66;r+=8)e=Math.imul(e^parseInt(v.hash.slice(r,r+8),16),3266489909)^e>>>12;const o=()=>{e=e+1831565813|0;let r=Math.imul(e^e>>>15,1|e);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},n=(r,H)=>{const R=(H*64+r)*4;return(Ft[R]*65536+Ft[R+1]*256+Ft[R+2])/16777215*1200-600},f=Math.hypot(m.x-q,m.z-V),h=Math.atan2(m.x-q,m.z-V),d=Math.max(f+14,45),p=[],x=r=>2.5+(r-1)*(1+.0115*(r-1)),g=r=>{p.length=0;for(let H=2;H<62;H++){const R=Be+(H+.5)*Ne,W=Math.sin(R),$t=Math.cos(R);let fe=-9;for(let Kt=1;Kt<97;Kt++){const jt=x(Kt),ze=q+W*jt,Ae=V+$t*jt,he=n(H,Kt)+(r?r[2]*Math.exp(-((ze-r[0])**2+(Ae-r[1])**2)/225):0),Ie=(he-At)/jt,He=(fe-Ie)*jt;fe=Math.max(fe,Ie);const xa=Math.abs(ze-K)<43&&Math.abs(Ae-Vt)<43;jt<d||jt>92||He>(xa?.4:-.15)||Math.abs(R-h)<.12||he<Ot+Fe*.75+3||r&&Math.hypot(ze-r[0],Ae-r[1])>16||p.push({x:ze,y:he,z:Ae,d:jt,az:R,ax:[$t,-W],ok:He<(xa?.1:-.4)})}}};if(g(null),p.filter(r=>r.ok).length<Le*6){const r=Math.max(f+34,58);let H=99,R=0;for(let Kt=6;Kt<58;Kt++){if(Math.abs(Be+(Kt+.5)*Ne-h)<.28)continue;let jt=-9,ze=0;for(let he=1;he<97;he++){const Ie=x(he);if(Ie<r-4)for(let He=-4;He<5;He++)jt=Math.max(jt,(n(Kt+He,he)-At)/Ie);Ie<r&&(ze=n(Kt,he))}const Ae=jt*r+At-ze;Ae<H&&(H=Ae,R=Kt)}const W=Be+(R+.5)*Ne,$t=q+Math.sin(W)*r,fe=V+Math.cos(W)*r;Y[24]=$t,Y[25]=fe,Y[26]=j(H+(Le>6?3.6:2.8),1.5,9),g([$t,fe,Y[26]]),m.y+=Y[26]*Math.exp(-((m.x-$t)**2+(m.z-fe)**2)/225)}const s=p.filter(r=>r.ok),u=s.length>=Le*4?s:p,c=(r,H)=>Math.hypot(r.x-H.x,r.z-H.z);let y=null,b=-1;for(let r=0;r<8&&u.length;r++){const H=u[Math.floor(o()*u.length)];let R=0;for(const W of u)c(W,H)<9&&R++;R>b&&(b=R,y=H)}const dt=Le>6?18:9;for(const r of u)r.k=c(r,y)+o()*dt;u.sort((r,H)=>r.k-H.k);const kt=[],st=o()<.5?-1:1,yt=(r,H)=>kt.every(R=>!R||c(R,r)>H&&(Math.abs(R.az-r.az)*r.d>H*.7||Math.abs(R.d-r.d)>7));Wt.forEach((r,H)=>{let R=null;if(r.calf){const W=kt[H-4];W&&(R=u.filter($t=>yt($t,1.2)).sort(($t,fe)=>c($t,W)-c(fe,W))[0])}else R=u.find(W=>yt(W,2.6))||u.find(W=>yt(W,1.7));kt.push(R||null),R&&(r.x=R.x,r.z=R.z,r.d=R.d,r.ax=R.ax,r.y0=R.y,r.f=r.fr<.72?st:-st)});for(let r=Wt.length-1;r>=0;r--)kt[r]||Wt.splice(r,1);Wt.forEach((r,H)=>{r.sen=!r.calf&&(H===0||H===6),(r.sen||r.calf&&r.fr<.5)&&(r.up=!0,r.lv=r.sen?1:.5,r.g=r.lv,r.tm=8+12*o())}),Wt.sort((r,H)=>H.d-r.d);const Gt=w||pe<.5?0:pe<.7?1:pe<.85?2:3,So=(nt()-.5)*1.2;Wt.forEach((r,H)=>{r.S=r.sc,r.aw=[-r.ax[1],r.ax[0]],Math.hypot(r.x+r.aw[0]-q,r.z+r.aw[1]-V)<Math.hypot(r.x-q,r.z-V)&&(r.aw=[-r.aw[0],-r.aw[1]]),r.ax=[r.ax[0],r.ax[1]];const R=nt(),W=nt();r.psi=Gt===2?-Math.PI/2+So+(R-.5)*2.4:Gt===3?Math.PI/2+(R-.5)*1.1:R*we,r.lie=Gt===1&&!r.sen&&W<.8||Gt===0&&!r.sen&&W<.14?1:0,r.stare=Gt===2,r.walk=Gt===3,r.stare&&(r.up=!0,r.lv=1,r.g=1,r.tm=6+20*nt()),r.sT=W*6,r.stepping=r.walk&&W<.7,r.v=r.stepping?.4:0,r.walked=0,r.sp=R*9,r.sa=r.stepping?.25:0})}const uo=[];for(let e=0;e<32&&uo.length<ka;e++){const o=ie(29+e),n=Math.atan2(re[e][0],re[e][1])-Math.atan2(it,Nt);o>Ot-34&&o<Ot+5&&Math.abs(n)>.3&&uo.push({x:re[e][0],z:re[e][1],y:o,ax:Ce(re[e][0],re[e][1]),hb:9+7*l(),lean:(l()-.5)*.12,wd:.2+.1*l(),sd:l()*40})}const Ve=1024,Zo=new Float32Array(Ve*4),Jo=[7200,11500,17500,28e3],Qo=de?[200,420,700,950]:ae?[380,720,1080,1300]:[300,600,950,1250],Na=de?[160,220,300,360]:ae?[300,420,560,620]:[180,260,360,420],to=oe+Z;for(let e=0;e<4;e++){const o=[9,23,61,157].map(d=>{const p=new Float32Array(d).map(()=>l());return x=>{x=(x%d+d)%d;const g=Math.floor(x),s=x-g,u=s*s*(3-2*s);return p[g]+(p[(g+1)%d]-p[g])*u}}),n=Jo[e],f=Math.sqrt(Math.max(n*n-vt*vt,1)),h=(de?1700:1100)/n;for(let d=0;d<Ve;d++){const p=(d+.5)/Ve,x=p*we-Math.PI;let g=o[0](p*9)*.42+o[1](p*23)*.3+o[2](p*61)*.18+o[3](p*157)*.1;ae&&(g=Math.pow(1-Math.abs(g*2-1),1.6)*.9+.1*g);let s=Qo[e]+Na[e]*(g-.5),u=x-to;u=Math.atan2(Math.sin(u),Math.cos(u)),s-=(Qo[e]*.55+60)*Math.exp(-u*u/.03);for(const c of[-1,1]){let y=x-Math.atan2(c*f,vt);y=Math.atan2(Math.sin(y),Math.cos(y));const b=Math.exp(-y*y/(h*h));s=s+(Ot-40-s)*b}Zo[d*4+e]=(s-At)/n-n/1274e4}}const $o=qt?"big":"small",eo=F.slots[$o],mo=v.hash+$o;let N=null;const ta=()=>{if(N=eo.find(n=>n.key===mo),N)return;if(eo.length<(qt?1:4)?(N={use:0},eo.push(N)):N=eo.reduce((n,f)=>f.use<n.use?f:n),!N.tF){const n=F.nf?(f,h)=>zt(f,h,t.RG32UI,t.RG_INTEGER,t.UNSIGNED_INT,t.NEAREST,t.CLAMP_TO_EDGE):(f,h)=>zt(f,h,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE);N.tF=n(J,at),N.fF=It(N.tF),N.tR=n(ht,ht),N.fR=It(N.tR),N.tS=n(I,ut),N.fS=It(N.tS),N.tM=zt(wt,Ht,t.R16F,t.RED,t.HALF_FLOAT,t.LINEAR,t.CLAMP_TO_EDGE),N.tL=zt(Ve,1,t.RGBA16F,t.RGBA,t.FLOAT,t.LINEAR,t.REPEAT),N.tD=zt(128,13,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE)}N.key=mo,fo();const e=F.nf?D.bakeU:D.bake;t.useProgram(e.p),gt(0,F.tN),t.uniform4fv(e.uT,Y),t.uniform4fv(e.uV,xt),t.bindFramebuffer(t.FRAMEBUFFER,N.fF),t.viewport(0,0,J,at),t.uniform4f(e.uA,se,ye,M/J,U/at),t.uniform4f(e.uMo,0,0,3,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,N.fR),t.viewport(0,0,ht,ht),t.uniform4f(e.uA,K-L,Vt-L,2*L/ht,2*L/ht),t.uniform4f(e.uMo,0,1,3,0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,N.fS),t.viewport(0,0,I,ut);const o=D.shadow;t.useProgram(o.p),gt(1,N.tF),t.uniform4f(o.uA,se,ye,M/I,U/ut),t.uniform4f(o.uFM,se,ye,1/M,1/U),t.uniform4f(o.uSh,Math.sin(to),Math.cos(to),96,0),t.uniform4fv(o.uTE,We),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),gt(5,N.tL),t.texSubImage2D(t.TEXTURE_2D,0,0,0,Ve,1,t.RGBA,t.FLOAT,Zo)},We=new Float32Array([1,4,9,18].map(e=>Math.tan(e*Ge)));ta();let Xt=F.rts[T];if(!Xt){const e=F.nf?zt(T,T,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST,t.CLAMP_TO_EDGE):zt(T,T,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),o=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,o),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,T,T),Xt=F.rts[T]={t:e,f:It(e,o)},F.split&&(Xt.tT=zt(T,T,t.R32F,t.RED,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE),Xt.fM=It(e,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT1,t.TEXTURE_2D,Xt.tT,0),t.drawBuffers([t.COLOR_ATTACHMENT0,t.COLOR_ATTACHMENT1])),t.bindFramebuffer(t.FRAMEBUFFER,null)}const Xe=Math.tan(25*Ge),Ba=2*Xe/T,ct={x:0,y:At,z:0,yaw:Z,pitch:Se},Pa=()=>{const e=v.view||wa,o=j(e.x||0,-3,3),n=j(e.z||0,-3,3),f=Math.cos(Z),h=Math.sin(Z),d=f*o+h*n,p=-h*o+f*n;ct.x=q+d,ct.z=V+p,ct.y=At+Ca*d+La*p+j(e.y||0,-.7,1.5),ct.yaw=Z+ne+(e.yaw||0),ct.pitch=j(Se+(e.pitch||0),-1.35,1.35)},Da=()=>{const e=Math.cos(ct.pitch),o=[Math.sin(ct.yaw)*e,Math.sin(ct.pitch),Math.cos(ct.yaw)*e],n=[Math.cos(ct.yaw),0,-Math.sin(ct.yaw)],f=[o[1]*n[2]-o[2]*n[1],o[2]*n[0]-o[0]*n[2],o[0]*n[1]-o[1]*n[0]];return{fw:o,rt:n,up:f}},ce=X==="Young six pointer"?1:X==="Royal"?3:X==="Switch"?4:2,po={S:ce===1?.93:ce===3?1.04:1,hind:0,calf:0,nk:ce===1?.78:ce===3?1.2:1.05,ant:ce,J:Array.from({length:24},nt)},ea=3+Math.floor(l()*2.5),be=[];{let e=0;for(let o=0;o<ea;o++){const n=o===ea-1?.45+.2*l():1.4-o*.18+.25*l();be.push([e,n,1-o*.08]),e+=n+.3+.25*l()}}const Ke=be[be.length-1][0]+be[be.length-1][1],_a=ce===1?128:ce===3?82:92+8*l(),Ia=ce===1?1.1:ce===3?.88:.97,je=P==="Only the echo"?[]:P==="Two rivals"?[{az:-.55+Z,d:1100},{az:1.1+Z,d:1700}]:[{az:(w?-.5:(l()-.5)*1.6)+Z,d:1e3+500*l()}],oa=[[0,1.2,.9],[1.55,1,.85],[2.8,.5,.7]];{const e=(h,d)=>{const p=(d*64+h)*4;return(Ft[p]*65536+Ft[p+1]*256+Ft[p+2])/16777215*1200-600},o=Math.atan2(m.x-q,m.z-V),n=[];for(let h=3;h<61;h++){const d=Be+(h+.5)*Ne,p=Math.sin(d),x=Math.cos(d);if(Math.abs(d-o)<.16||Wt.some(s=>s.x!==void 0&&Math.abs(Math.atan2(s.x-q,s.z-V)-d)<.03))continue;let g=-9;for(let s=1;s<97;s++){const u=2.5+(s-1)*(1+.0115*(s-1)),c=q+p*u,y=V+x*u,b=e(h,s)+(Y[26]?Y[26]*Math.exp(-((c-Y[24])**2+(y-Y[25])**2)/225):0),dt=(b-At)/u;u>100&&u<200&&dt>g+.3/u&&b>Ot+Fe*.75+4&&n.push({x:c,z:y,y:b,d:u,az:d,ax:[x,-p],sky:s<96?(b-At)/u-(e(h,s+1)-At)/(u+4):0}),g=Math.max(g,dt)}}n.sort((h,d)=>d.sky-h.sky);const f=n.slice(0,Math.max(1,n.length>>2));if(je.length&&f.length){const h=f[Math.floor(z*f.length)];Object.assign(je[0],{x:h.x,y:h.y,z:h.z,ax:h.ax,d:h.d,az:h.az,seen:!0,psi:(nt()<.5?0:Math.PI)+(nt()-.5)*1.2,g:0,m:0,rT:-1,J:Array.from({length:24},nt)})}}const aa=.25;let vo=null,xo=null;const i={g:0,m:0,roarT:-1,nextRoar:1e9,breathT:1.5,look:0,psi:Oo,psiT:Oo,wu:0,wa:0,ph:0,sa:0,v:0,mvT:2+3*nt(),moving:Q==="Walking"||Q==="Herding",thr:0,thrT:2.2,thrOn:!1,tuft:0,tail:0,tailT:3,ear:0,earT:2},le=[],De=[];let Rt=0;const Ha=(e,o)=>j(Math.sin(Math.atan2(e-ct.x,o-ct.z)-ct.yaw),-1,1)*.8,Ga=()=>{v.sound.on&&(vo=vo||Go(_a,Ia,be,!1,569),v.sound.pcm(vo,te,{vel:aa,pan:Ha(m.x,m.z)}))},Ua=e=>{e.seen&&(e.rT=0),v.sound.on&&(xo=xo||Go(108,.95,oa,!0,917),v.sound.pcm(xo,te,{vel:aa*j(700/e.d,.25,.6),pan:j(Math.sin(e.az-ct.yaw),-1,1)*.9}))},sa={Roaring:[17,40],Watching:[35,45],Walking:[28,42],Herding:[28,42],Thrashing:[30,40],"Lying up":[18,32]}[Q],na=e=>{if(!(i.roarT>=0&&i.roarT<Ke)){i.roarT=0,Ga(),i.nextRoar=Rt+sa[0]+sa[1]*l()*l();for(const o of Wt)!o.up&&l()<.6&&(o.rT=Rt+.5+2.6*l());e||je.forEach((o,n)=>De.push({t:Rt+Ke+o.d/343+.8+n*2.5,f:()=>Ua(o)}))}},xe=(e,o)=>{const n=j(e/1.5+2.5,0,4.999),f=j(o/1.5+1.5,0,2.999),h=Math.floor(n),d=Math.floor(f),p=n-h,x=f-d,g=m.gr,s=m.x+m.ax[0]*e+m.aw[0]*o,u=m.z+m.ax[1]*e+m.aw[1]*o;return(g[d*6+h]*(1-p)+g[d*6+h+1]*p)*(1-x)+(g[d*6+6+h]*(1-p)+g[d*6+7+h]*p)*x+(Y[26]?Y[26]*Math.exp(-((s-Y[24])**2+(u-Y[25])**2)/225):0)},ra=e=>j(Math.atan2(-Math.cos(e),-Math.sin(e)),-1.35,1.35),wo=Q==="Lying up"?1:0,ia=e=>{i.roarT>=0&&(i.roarT+=e);const o=i.roarT;let n=0,f=0,h=!1,d=0;const p=o>=0&&o<Ke+1.6;if(p){n=.8;for(const s of be){const u=(o-s[0])/s[1];u>=-.15&&u<=1&&(n=1,u>=0&&(h=!0,d=s[2]*St(0,.1,u)*(1-St(.75,1,u)),f=d*(.85+.15*Math.sin(Rt*47))))}o>Ke&&(n=.8*(1-St(0,1.6,o-Ke)))}if(i.g+=(n-i.g)*Math.min(1,e*5),i.m+=(f-i.m)*Math.min(1,e*14),!p&&Rt>i.nextRoar&&!i.thrOn&&Math.abs(i.psiT-i.psi)<.1&&(i.moving=!1,na(!1)),l()<e*.1&&(i.look=l()<.5?0:(l()-.5)*2),i.earT-=e,i.earT<0&&(i.ear=.6,i.earT=2+7*l()),i.ear*=Math.exp(-e*5),i.tailT-=e,i.tailT<0&&(i.tail=1,i.tailT=4+9*l()),i.tail*=Math.exp(-e*3),Q==="Walking"||Q==="Herding"){i.mvT-=e,i.mvT<0&&!p&&(i.moving=!i.moving,i.mvT=i.moving?3+4*l():3+7*l());const s=Math.cos(i.psi),u=Math.sin(i.psi);i.moving&&Math.abs(i.psiT-i.psi)<.1&&(Math.abs(i.wu+s*1.2)>2.6||Math.abs(i.wa+u*1.2)>1.6)&&(i.psiT=i.psi+Math.PI*(Math.sin(i.psi)>0?1:-1)*(Math.cos(i.psi)>0?1:-1));const c=Math.abs(i.psiT-i.psi)>.05;i.psi+=j(i.psiT-i.psi,-e*.9,e*.9);const y=i.moving&&!p?c?.15:Q==="Herding"?.7:.55:0;i.v+=(y-i.v)*Math.min(1,e*2.5),i.wu+=s*i.v*e,i.wa+=u*i.v*e,i.ph+=e*(i.v/.95)*we,i.sa+=((i.v>.05?.3:0)-i.sa)*Math.min(1,e*3)}if(Q==="Thrashing"){i.thrT-=e,i.thrT<0&&(i.thrOn=!i.thrOn&&!p,i.thrT=i.thrOn?2+2.5*l():3+6*l(),i.thrOn||(i.tuft=1));const s=i.thrOn?.5*Math.sin(Rt*6.3)*(.6+.4*Math.sin(Rt*1.7)):0;i.thr+=(s-i.thr)*Math.min(1,e*8)}i.breathT-=e;const x=i.mouth;if(x&&(h&&i.breathT<0||!h&&i.breathT<-3.2)){const s=Math.hypot(x[2],x[3])||1,u=x[2]/s,c=x[3]/s,y=h?2.4*d:.45;le.push({x:x[0]+u*.04,y:x[1]+c*.04,vx:u*y*1.3,vy:c*y*1.3+.05,r:h?.045:.04,a:h?.5*d+.08:.22,age:0}),le.length>16&&le.shift(),i.breathT=h?.1:0}const g=Ct.v*.01*m.ax[0];for(const s of le){s.age+=e,s.x+=(s.vx+g)*e,s.y+=s.vy*e;const u=Math.exp(-e*1.7);s.vx*=u,s.vy=s.vy*u+.22*e,s.r+=e*(.06+.22*Math.hypot(s.vx,s.vy)),s.a*=Math.exp(-e*1.6)}for(;le.length&&le[0].a<.01;)le.shift();for(const s of je)if(s.seen){let u=0,c=0;if(s.rT>=0){s.rT+=e;for(const y of oa){const b=(s.rT-y[0])/y[1];b>=-.2&&b<=1.2&&(u=1,b>=0&&b<=1&&(c=y[2]*St(0,.1,b)*(1-St(.75,1,b))))}s.rT>5&&(s.rT=-1)}s.g+=(u-s.g)*Math.min(1,e*4),s.m+=(c-s.m)*Math.min(1,e*12)}for(const s of Wt){s.tm-=e,s.rT>=0&&Rt>s.rT&&(s.rT=-1,s.up=!0,s.lv=.7+.3*l(),s.tm=2.5+4*l()),s.tm<0&&(s.up=s.sen||s.stare?l()<.8:!s.up&&l()<(s.calf?.5:.3),s.lv=s.up?s.sen||s.stare?1:.1+.9*l():-1,s.tm=s.up?s.sen||s.stare?10+20*l():2+5*l():5+16*l());const u=s.up?s.lv:-1+.05*Math.sin(Rt*s.w+s.ph);if(s.g+=(u-s.g)*Math.min(1,e*(.9+s.w)),!s.lie){s.sT-=e,s.sT<0&&(s.stepping=!s.stepping,s.sT=s.stepping?s.walk?4+5*l():.7:s.walk?3+5*l():4+10*l());const c=s.stepping&&s.walked<9?s.walk?.4:.35:0;s.v+=(c-s.v)*Math.min(1,e*3);const y=Math.cos(s.psi),b=Math.sin(s.psi);s.x+=(s.ax[0]*y+s.aw[0]*b)*s.v*e*s.S,s.z+=(s.ax[1]*y+s.aw[1]*b)*s.v*e*s.S,s.walked+=s.v*e,s.sp+=e*s.v/(.8*s.S)*we,s.sa+=((s.v>.05?.25:0)-s.sa)*Math.min(1,e*4)}}},ca=w?2.5:(l()<.5?-1:1)*(1.5+2*l()),Ct={v:ca,off:0,offT:0};let _e=Lt;const Oa=Math.max(Lt+13,15),qa=e=>{Ct.off+=Ct.v*e;const o=Ct.v*e/Vo;Ct.offT+=o;for(let f=0;f<Ht;f++){const h=co+(f+.5)*Wo,d=.55+.45*Math.exp(-(((h-vt)/380)**2)),p=o*d;for(let x=0;x<wt;x++){const g=x-p,s=Math.floor(g),u=g-s,c=Pe[f*wt+j(s,0,wt-1)],y=Pe[f*wt+j(s+1,0,wt-1)];Xo[f*wt+x]=c+(y-c)*u}}const n=Math.max(Math.abs(Ct.v)-7,0)/45;for(let f=0;f<Ht;f++)for(let h=0;h<wt;h++){const d=f*wt+h;let p=Xo[d];if(p+=(Ko[d]-p)*e*.05,n>0){const x=(Math.floor(h*2-Ct.offT*2)%128+128)%128;p+=n*jo[f*128+x]*e*1.2}Pe[d]=j(p,0,1)}},Va=e=>{const o=_e,n=St(-2,12,o),f=St(-.9,.4,o),h=to,d=Math.cos(o*Ge);e.set([Math.sin(h)*d,Math.sin(o*Ge),Math.cos(h)*d,f],16);let p=Ue([1,.44,.15],[1,.84,.64],St(0,14,o)).map(kt=>kt*1.9*(.75+.25*St(2,15,o)));Jt&&(p=p.map((kt,st)=>kt*[1,.62,.4][st]*.7)),e.set([...p,Ee],20);const x=pt?[.26,.3,.5]:Ue([.27,.36,.58],[.32,.48,.8],n);e.set([...x,G?1:0],24);const g=pt?[.95,.58,.52]:Jt?[1,.55,.3]:Ue([1.05,.7,.42],[1,.86,.7],n);e.set([...g,.12+Math.min(Math.abs(Ct.v),60)/60*.6],28),e.set([...pt?[.55,.42,.55]:Ue([.48,.43,.55],[.6,.66,.8],n),w?.85:.25+.65*la],32);const s=pt?[.36,.33,.44]:Ue([.33,.34,.45],[.47,.52,.64],n),u=St(0,9,_e-Math.max(Lt,0));e.set([...s,.022*(1-.55*u)],36),e.set([Ot+u*12,ft-4+u*(Ot-ft)*.8,Fe,Ot-ft+30],40);const c=Math.tan(Math.max(o,0)*Ge),y=[0,0,0,0];let b=0;for(;b<2&&c>We[b+1];)b++;const dt=(c-We[b])/(We[b+1]-We[b]);y[b]=1-dt,y[b+1]=dt,e.set(y,64)};let oo=795581981;for(let e=2;e<66;e+=8)oo=Math.imul(oo^parseInt(v.hash.slice(e,e+8),16),668265261)^oo>>>15;const la=(oo>>>0)%1e3/1e3,fa=-1+(la-.5)*.7;let ha=!1,go=0,yo=0,ua=0,bo=0,Mo=!1,To=99;const Wa=e=>{const o=v.input;if(o.taps(),o.down){if(ha||(go=0,yo=o.x,ua=o.y,bo=o.x,Mo=!1),go+=e,Math.hypot(o.x-yo,o.y-ua)>.03&&(Mo=!0),Mo){const n=(o.x-bo)/Math.max(e,.008333333333333333),f=j((o.x-yo)*170+n*10,-75,75);Ct.v+=(f-Ct.v)*Math.min(1,e*4)}else go>.35&&(_e=Math.min(Oa,_e+e*2.4),To=0);bo=o.x}else Ct.v+=(ca-Ct.v)*Math.min(1,e*.3),To+=e,To>5&&(_e=Math.max(Lt,_e-e*.7));ha=o.down},tt=new Float32Array(Ro*4),Ye=new Float32Array(128*15*4),zo=new Float32Array(640*8),Me=new Float32Array(4);let Te=0;const Ao=Math.hypot(m.x-q,m.z-V);for(let e=0;e>-2.3;e-=.25){let o=!0;const n=(xe(0,e)+.25-At)/(Ao+e);for(let f=e-.25;f>-2.3;f-=.25)if((xe(0,f)-At)/(Ao+f)>n){o=!1;break}if(i.wa=e,o)break}const Xa=xe(0,0),ma=j((At-Xa)/Ao,-.4,.6),pa=()=>{const e=i.g,o=Math.cos(i.psi),n=Math.sin(i.psi),f=xe(i.wu,i.wa);let h=.95,d=1,p=-.62,x=j(i.look*.9,-1.2,1.2),g=.2,s=0;Q==="Watching"?(h=1.15,p=-.4,x=ra(i.psi),g=0):Q==="Walking"?(h=.5,d=1.05,p=-.55,x*=.4):Q==="Herding"?(h=.1,d=1.15,p=-.2,x*=.3,g=.6):Q==="Thrashing"&&(h=-.5,p=-1.35,s=i.thr,x=.5*i.thr);const u=(c,y)=>c+(y-c)*e;return{an:u(h,.85),nl:u(d,1.05),hp:u(p,.38),hy:u(x,x*.3),hr:s*(1-e),m:i.m,ear:Math.max(u(g,1),i.ear),lie:wo,st:i.ph,sa:i.sa,tail:i.tail,tuft:i.tuft,yC:f,gy:(c,y)=>xe(i.wu+c*o-y*n,i.wa+c*n-y*o)-f}},da=()=>{Ye.fill(0,0,2560);let e=0;Te=0;const o=(c,y,b)=>Ye.set(b,(c*128+y)*4);for(const c of uo)o(0,e,[c.x,c.y,c.z,1]),o(1,e,[c.ax[0],c.ax[1],10,0]),o(2,e,[c.hb,c.lean,c.wd,c.sd]),e++;const n=(c,y,b,dt,kt,st,yt,Gt,So,r,H,R)=>{const W=Uo.build(zo,Te,c,y,b);return o(0,e,[dt,kt,st,So]),o(1,e,[yt[0],yt[1],Gt,r]),o(2,e,[Te,W.n-Te,H,R]),o(4,e,[W.bb[0]-.08,W.bb[1]+.08,W.bb[2]-.08,W.bb[3]+.08]),Te=W.n,e++,W};for(const c of Wt){const y=j(c.g*.5+.5,0,1),b=c.lie;c.o=c.o||{S:c.S,hind:1,calf:c.calf?1:0,J:po.J},n(c.o,{an:b?.3+.75*y:-.85+2*y,hp:b?-.95+.6*y:-1.35+1.05*y,hy:c.stare||c.sen?ra(c.psi)*y:0,ear:0,lie:b,st:c.sp,sa:c.sa},{psi:c.psi,tel:j((At-c.y0)/c.d,-.4,.6)},c.x,0,c.z,c.ax,1,c.S,0,0,b?.22:.1*c.S)}const f=e,h=pa(),d=(xe(i.wu+1,i.wa)-xe(i.wu-1,i.wa))/2,p=n(po,h,{psi:i.psi,tel:ma},m.x+m.ax[0]*i.wu+m.aw[0]*i.wa,h.yC,m.z+m.ax[1]*i.wu+m.aw[1]*i.wa,m.ax,0,1,0,d,wo?.3:.13);i.mouth=p.mouth;for(const c of je)if(c.seen){const y=c.g,b=(dt,kt)=>dt+(kt-dt)*y;c.o=c.o||{S:1,hind:0,calf:0,nk:1.05,ant:2,J:c.J},n(c.o,{an:b(1,.85),nl:b(1,1.05),hp:b(-.55,.45),m:c.m,ear:y},{psi:c.psi,tel:j((At-c.y)/c.d,-.4,.6)},c.x,c.y,c.z,c.ax,2,1,0,0,.13)}Ye.set(zo.subarray(0,Te*8),2560);let x=9,g=-9,s=9,u=-9;return le.forEach((c,y)=>{Ye.set([c.x,c.y,c.r,c.a],(384+y)*4),x=Math.min(x,c.x-2*c.r),g=Math.max(g,c.x+2*c.r),s=Math.min(s,c.y-2*c.r),u=Math.max(u,c.y+2*c.r)}),o(4,31,[x,g,s,u]),[e,le.length,f]},va=()=>{N.key!==mo&&ta(),N.use=++F.slots.n,Pa();const e=Da();tt.fill(0),tt.set([ct.x,ct.y,ct.z,Rt],0),tt.set([...e.fw,Xe],4),tt.set([...e.rt,Ba],8),tt.set([...e.up,1],12),Va(tt),tt.set([-Ct.off,0,Ct.v,0],44),tt.set([K,Vt,1/(2*L),T],48),tt.set([se,ye,1/M,1/U],52),tt.set([Dt,ft,Math.cos(fa),Math.sin(fa)],56),tt.set([qo,co,1/1e4,1/2400],60),tt.set(Jo,68);const[o,n,f]=da();tt.set([o,n,f,0],72),tt.set([pt?1.3:1,240,36,3],76);{const st=Math.cos(i.psi),yt=Math.sin(i.psi);tt.set([m.x+m.ax[0]*i.wu+m.aw[0]*i.wa,xe(i.wu,i.wa)-wo*.5,m.z+m.ax[1]*i.wu+m.aw[1]*i.wa,Math.atan2(m.ax[1]*st+m.aw[1]*yt,m.ax[0]*st+m.aw[0]*yt)],80)}if(fo(),gt(0,F.tN),gt(1,N.tF),gt(2,N.tR),gt(3,N.tS),gt(4,N.tM),gt(5,N.tL),gt(6,N.tD),gt(8,F.tG),t.pixelStorei(t.UNPACK_ALIGNMENT,1),lo||N.clrK!==$e){for(let st=0;st<Pe.length;st++)$e[st]=Ra(Pe[st]);gt(4,N.tM),t.texSubImage2D(t.TEXTURE_2D,0,0,0,wt,Ht,t.RED,t.HALF_FLOAT,$e),lo=!1,N.clrK=$e}gt(6,N.tD),t.texSubImage2D(t.TEXTURE_2D,0,0,0,128,5+Math.ceil(Te/64),t.RGBA,t.FLOAT,Ye),t.bindFramebuffer(t.FRAMEBUFFER,Xt.fM||Xt.f),t.viewport(0,0,T,T),t.enable(t.DEPTH_TEST),t.depthFunc(t.ALWAYS);const h=D.main;if(t.useProgram(h.p),t.uniform4fv(h.uC,tt),t.uniform4fv(h.uT,Y),t.uniform4fv(h.uV,xt),t.drawArrays(t.TRIANGLES,0,3),Xt.fM){t.bindFramebuffer(t.FRAMEBUFFER,Xt.f),t.depthFunc(t.LEQUAL),t.depthMask(!1);const st=D.sky;t.useProgram(st.p),t.uniform4fv(st.uC,tt),st.uV&&t.uniform4fv(st.uV,xt),t.drawArrays(t.TRIANGLES,0,3),t.depthMask(!0),t.disable(t.DEPTH_TEST),t.enable(t.BLEND),t.blendFunc(t.DST_ALPHA,t.ONE),gt(10,Xt.tT);const yt=D.grnd;t.useProgram(yt.p),t.uniform4fv(yt.uC,tt),t.uniform4fv(yt.uT,Y),t.uniform4fv(yt.uV,xt),t.drawArrays(t.TRIANGLES,0,3),gt(10,null),t.enable(t.DEPTH_TEST)}t.depthFunc(t.LEQUAL),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA);const d=D.obj;t.useProgram(d.p),t.uniform4fv(d.uC,tt),t.uniform4fv(d.uV,xt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,o+(n>0?1:0)),t.depthFunc(t.LESS);const p=D.veg;t.useProgram(p.p),t.uniform4fv(p.uC,tt);const x=Math.hypot(e.fw[0],e.fw[2])||1,g=e.fw[0]/x*.3,s=e.fw[2]/x*.3,u=qt?.3:.6,c=15,y=Math.ceil(c*1.5/u)+2;if(t.uniform4f(p.uK,0,y,u,c),t.uniform4f(p.uK2,Math.round((ct.x+g*c)/u),Math.round((ct.z+s*c)/u),0,0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,16,y*y),qt){const Gt=Math.ceil(192.85714285714283)+2;t.uniform4f(p.uK,1,Gt,.07,9),t.uniform4f(p.uK2,Math.round((ct.x+g*9)/.07),Math.round((ct.z+s*9)/.07),0,0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,10,Gt*Gt)}t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,T,T),gt(7,Xt.t);const b=[tt[16],tt[17],tt[18]],dt=b[0]*e.fw[0]+b[1]*e.fw[1]+b[2]*e.fw[2];if(Me[2]=0,Me[3]=1,dt>.05){const st=(b[0]*e.rt[0]+b[2]*e.rt[2])/(dt*Xe),yt=(b[0]*e.up[0]+b[1]*e.up[1]+b[2]*e.up[2])/(dt*Xe);Math.abs(st)<.98&&Math.abs(yt)<.98&&(Me[0]=st*.5+.5,Me[1]=yt*.5+.5,Me[2]=1,Me[3]=.0042/(2*Xe))}const kt=D.comp;t.useProgram(kt.p),t.uniform4fv(kt.uC,tt),t.uniform4fv(kt.uG,Me),t.drawArrays(t.TRIANGLES,0,3),gt(7,null)};da(),(Q==="Roaring"||Q==="Lying up")&&(na(!1),De.length=0);for(let e=0;e<40;e++)Rt+=1/30,ia(1/30),i.mouth=Uo.build(zo,0,po,pa(),{psi:i.psi,tel:ma}).mouth;if(Rt=0,i.nextRoar=(Q==="Roaring"||Q==="Lying up"?14:8)+10*l(),F.split){if(!D.main.uC)for(const e in D)D[e].f&&F.ready(e)}else D.main.uC||F.ready("main");va();let ko=0,Eo=0;return(e,o)=>{for(o=Math.min(o||0,.25),Wa(o),ko+=o,Eo+=o;ko>1/30;)Rt+=1/30,ia(1/30),ko-=1/30;for(;Eo>1/15;)qa(1/15),Eo-=1/15,lo=!0;for(let n=De.length-1;n>=0;n--)if(Rt>=De[n].t){const f=De[n];De.splice(n,1),f.f()}va()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
