// Lava Shore: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/587.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ut){Ut&&function(){"use strict";const wo={yaw:0,pitch:0,x:0,y:0,z:0},fe=(e,t,d)=>e<t?t:e>d?d:e,xe=(e,t,d)=>{const c=fe((d-e)/(t-e),0,1);return c*c*(3-2*c)},It=57,Eo=16,y=64,we=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D; precision highp usampler2D;
`,Ie=`
uniform vec4 uP[${It}];
uniform sampler2D uN2;
uniform sampler2D uNV;
#define TIME uP[0].x
#define HOLD uP[0].y
#define MOON uP[1].xyz
#define EYE uP[2].xyz
#define TANH uP[2].w
#define FW uP[3].xyz
#define SZ uP[3].w
#define RT uP[4].xyz
#define UPV uP[5].xyz
#define ENTRY uP[6].xyz
#define IG uP[6].w
#define GLOWC uP[41].rgb
const mat2 LR = mat2(.8, .6, -.6, .8);
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 rayDir(vec2 uv) { return normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UPV) * TANH); }
float shoreZ(float x) {
  float u = x * .0009 + uP[14].x;
  float n = textureLod(uN2, vec2(u, .21), 0.).r * .75 + textureLod(uN2, vec2(u * 4.3, .63), 0.).g * .25;
  float dx = (x - uP[44].z) / uP[14].z, bx = (x - uP[12].x) / uP[12].z;
  return uP[14].y + n * 60. + uP[14].w * exp(-dx * dx) - uP[13].w * exp(-bx * bx);
}
// the nearest lava rivulet: x |dx| / half-width (< 1 inside), y half-width, z signed dx, w which; read from the map
// the riv program bakes once per mint over the bench, in the rivulets' own frame (across, along the flow)
uniform sampler2D uRV;
vec4 riv(vec2 q0, float s) {
  vec2 dq = q0 - ENTRY.xz, f = vec2(dot(dq, vec2(uP[44].y, -uP[44].x)), dot(dq, uP[44].xy));
  vec2 u = (f - vec2(-48., -58.)) / vec2(96., 66.);
  if (s < -4. || s > 46. || u.x <= 0. || u.y <= 0. || u.x >= 1. || u.y >= 1.) return vec4(9., 1., 0., 0.);
  return textureLod(uRV, u, 0.);
}
vec2 lobeUV(vec2 q) { return LR * q * (1. / 54.) + (textureLod(uN2, q * .011 + .23, 0.).rb - .5) * .12 + (textureLod(uN2, q * .07 + .61, 0.).gr - .5) * .03 + .5; }
// macro land (m above the sea): a field rising gently inland, tumuli, inflated lobes, levees on the bench, a ragged
// ledge at the shore, a black sand cove. s = distance inland from the shore line, bm = sand
float gLed = 1., gLip = 0., gFc = 0.;   // gLip: the glassy rounded lip of each unit, which catches the sky; on the sea face: dark at the rubbly foot of each flow unit, light at its dense lip (the bake's occlusion)
float landH(vec2 q, out float s, out float bm, bool lev) {
  s = shoreZ(q.x) - q.y; gLed = 1.; gLip = 0.; gFc = 0.;
  vec2 w = q + (textureLod(uN2, q * .0021 + .4, 0.).gb - .5) * 34.;
  float hum = textureLod(uN2, w * .0042 + .13, 0.).r - .5, hum2 = textureLod(uN2, w * .013 + .57, 0.).g - .5;
  vec2 de = (q - ENTRY.xz) * vec2(.7, 1.);
  float bench = exp(-dot(de, de) / 1200.);
  bm = uP[12].y * smoothstep(uP[12].z, uP[12].z * .4, abs(q.x - uP[12].x)) * smoothstep(15., 7., s);
  // the seaward face: stacked flow units half a metre to a metre and a half thick, each a ledge, broken by cooling
  // joints into columns that step their ledges up or down; a ragged, notched top edge; fallen blocks and a talus
  // apron at the foot, half in the surf (one noise read, one cell read: compile time)
  // read C1-smooth (a bilinear read has a kink at every texel, and a face this steep turns each into a vertical stripe)
  vec2 cc = (q * .021 + .37) * 256. - .5, ci = floor(cc), cf = cc - ci;
  vec4 cn = textureLod(uN2, (ci + cf * cf * (3. - 2. * cf) + .5) / 256., 0.);
  vec4 jv = textureLod(uNV, q * (1. / 29.) + vec2(.17, .53) + (cn.gr - .5) * .06, 0.);
  float jt = smoothstep(.13, .02, jv.b);   // a joint
  // the cove: ragged ends, and a rib of rock poking through the sand here and there
  bm *= smoothstep(.0, .25, uP[12].z * (.75 + .5 * cn.r) - abs(q.x - uP[12].x) * .9) * (1. - step(.86, jv.a) * smoothstep(.02, .12, jv.b));
  float c = s + hum2 * 4. + (cn.r - .5) * 3.2 + (cn.g - .5) * 1.1 - .45 * jt;
  // on the face itself no fine relief taken across the ground (a steep face would show it as vertical combing), and
  // the face's own noise read smooth; the bake gives it grain on its own plane instead
  gFc = smoothstep(-1.5, -.8, c) * smoothstep(4.5, 3., c) * (1. - bm);
  float amp = smoothstep(1., 24., s) * (1. - .75 * bench) * (1. - bm);
  float h = .9 + .055 * min(s, 60.) + .016 * max(s - 60., 0.) + 4.5 * pow(clamp((s - 6.) / 48., 0., 1.), 1.6) + amp * (2.2 * hum + .8 * hum2);
  vec2 dc = q - EYE.xz;
  if (s > -2. && dot(dc, dc) < 160000.) {
    vec2 lu = lobeUV(q);
    vec4 v = textureLod(uNV, lu, 0.), v2 = textureLod(uNV, lu * 2.7 + .31, 0.);
    float l1 = sqrt(smoothstep(0., .5, v.b)) * (1. - .45 * dot(v.rg, v.rg)), l2 = smoothstep(0., .45, v2.b);
    h += smoothstep(.5, 5., s) * (1. - bm) * (1. - .5 * bench) * (.36 * l1 + .07 * l2 - .2) * (1. - gFc);
  }
  // the old sea cliff you stand on, buried low where the new delta has built out
  float dl = (q.x - .5 * (ENTRY.x + uP[44].z)) / (uP[14].z * 1.4 + abs(uP[44].z - ENTRY.x) * .5);
  h += uP[42].y * smoothstep(.2, 2.4, s) * (1. - .8 * exp(-dl * dl)) * (1. - bm) * (.85 + .3 * hum2);
  h += 2.4 * exp(-dot(q - vec2(-2., -3.), q - vec2(-2., -3.)) / 150.) * smoothstep(1., 6., s);   // the tumulus you stand on
  h += uP[51].z * exp(-dot(q - uP[51].xy, q - uP[51].xy) / uP[51].w) * smoothstep(1., 6., s);   // a taller one (0 at the opening)
  if (lev && bench > .03) {
    vec4 r = riv(q, s);
    h += (.24 * exp(-pow((r.x - 1.2) * 2.2, 2.)) - .12 * smoothstep(1.05, .8, r.x)) * smoothstep(-1., 1., s);
  }
  float bed = -1.4 + .22 * max(s, -30.) + hum2 * 1.5;
  float edge = smoothstep(-.9, 1.7, c);
  h = mix(bed, h, edge);
  float fm = smoothstep(14., 30., length(de));   // the mouth itself keeps its smooth new lip for the falls
  if (c > -8. && c < 4.5 && bm < .99) {
    float fu = .55 + .95 * jv.a, ph = jv.a * 1.3 + (cn.b - .5) * .45;   // smooth in the cell id: no slivers where it changes at a joint
    float wa = h * 1.9 + jv.a * 9., y = (h + .3 * sin(wa) / 1.9) / fu + ph + (cn.r - .5) * .6, iy = floor(y);   // units of uneven thickness, no brick courses
    float rs = smoothstep(.45, .8, y - iy), ht = h + (iy + rs - y) * fu / (1. + .3 * cos(wa)), wf = smoothstep(-.9, -.5, c) * smoothstep(4.5, 3.3, c) * (1. - bm) * (.35 + .65 * fm);
    h = mix(h, ht, wf);
    gLed = 1. - wf * (.7 * (1. - rs) * smoothstep(.3, .5, y - iy) + .3 * jt);
    gLip = .75 * wf * exp(-pow((y - iy - .74) / .11, 2.)) * (1. - jt);
    // fallen blocks the size of cars, angular (the cells), tops tilted, gaps between them; a rubbly apron under them
    float tal = smoothstep(-7.5, -3.5, c) * smoothstep(.6, -.9, c) * (1. - bm) * fm;
    float apron = -.55 + .6 * smoothstep(-4.5, -.6, c) + (cn.a - .5) * .5;
    float top = (.1 + 1.4 * fract(jv.a * 11.3)) * smoothstep(-7.5, -2., c) + dot(jv.rg, vec2(.5, -.35)) + (cn.b - .5) * .3;
    h = max(h, mix(bed, max(apron, top * step(.5, fract(jv.a * 7.1)) * smoothstep(.0, .12, jv.b) - .2), tal));
  }
  // black sand: a berm at the top of the swash, cusps along the water's edge, the beach face below them
  float cus = sin(q.x * .75 + cn.g * 4.) * smoothstep(-1., 1.5, s) * smoothstep(5., 2., s);
  h = mix(h, max(.22 + .07 * s + .22 * exp(-pow((s - 4.5 - cn.b) / 1.6, 2.)) + .1 * cus + (cn.a - .5) * .06, -2.6), bm);
  return h;
}
vec3 skyBase(vec3 d) {
  float e = max(d.y, 0.);
  vec3 c = mix(uP[21].rgb * 1.25, uP[20].rgb, smoothstep(0., .55, pow(e, .7)));
  float cm = max(dot(d, MOON), 0.), mb = uP[1].w;
  c += uP[22].rgb * mb * (pow(cm, 900.) * .5 + (pow(cm, 60.) * .035 + pow(cm, 6.) * .012) * uP[54].z);
  // twilight: the band over where the sun has gone down (or is about to come up), fading up the sky
  if (uP[52].w > 0.) {
    float cs = dot(normalize(d.xz + 1e-6), normalize(uP[52].xz + 1e-6)) * .5 + .5;
    c += uP[53].rgb * (exp(-e / (.04 + .14 * cs)) * (.12 + .88 * cs * cs * cs) + .06 * exp(-e / .5) * cs);
  }
  vec2 ge = normalize(ENTRY.xz - EYE.xz);
  float ca = max(dot(normalize(d.xz + 1e-6), ge), 0.);
  c += GLOWC * IG * 1.5e-4 * pow(ca, 24.) * exp(-e / .07);
  return c;
}
// low cloud at time tm with the entry's glow ig: moonlit grey, red over the vent, orange over the entry (rgb, cover)
float cloudN(vec2 cp) { cp *= uP[54].x > 2. ? 6. : 1.; return textureLod(uN2, cp * .000045 + .3, 0.).r * .65 + textureLod(uN2, cp * .00019 + .71, 0.).g * .35; }
float cloudCov(float n, float dy) { return smoothstep(.78 - uP[40].w * .35, .98 - uP[40].w * .25, n) * smoothstep(.004, .05, dy) * .9; }
// its colour less the entry's glow
vec3 cloudC(vec2 cp, float n) {
  vec2 vent = vec2(sin(uP[40].x), cos(uP[40].x)) * 16000.;
  return uP[22].rgb * uP[1].w * .01 * (.6 + .4 * n) + uP[21].rgb * .6 + vec3(1., .2, .05) * .05 * uP[40].z * exp(-length(cp - vent) / 6000.);
}
vec4 cloudAt(vec3 d, float tm, float ig) {
  float tc = max(uP[54].y - EYE.y, 20.) / d.y;
  vec2 cp = EYE.xz + d.xz * tc + vec2(tm * 1.5, tm * .6);
  float n = cloudN(cp);
  float cov = cloudCov(n, d.y);
  vec3 cc = cloudC(cp, n);
  bool lowD = uP[54].x > 2.;   // the low deck: lit from below in a patch over the entry, its base mottled by thickness
  cc += GLOWC * ig * 1e-4 * uP[54].x * exp(-length(cp - ENTRY.xz) / (lowD ? 300. : 1500.)) * (lowD ? .25 + 1.5 * n * n : 1.);
  return vec4(cc, cov);
}
// the fresh crack at your boots
float nearCrack(vec2 q, float fp) {
  if (q.y < -6. || q.y > 10.) return 0.;
  float cx = 1.05 + .55 * sin(q.y * .55 + 1.) + .22 * sin(q.y * 1.9 + 2.) + (textureLod(uN2, vec2(q.y * .07, .91), 0.).b - .5) * .9 + (textureLod(uN2, vec2(q.y * .4, .17), 0.).a - .5) * .25;
  float w = .008 + .016 * textureLod(uN2, vec2(q.y * .21, .45), 0.).r;
  float wm = max(w, fp * .9);
  return smoothstep(wm, wm * .2, abs(q.x - cx)) * (w / wm) * smoothstep(-6., -3., q.y) * smoothstep(10., 6., q.y);
}
`,qt=we+Ie+`
// the nearest lava rivulet: x |dx| / half-width (< 1 inside), y half-width, z signed dx, w which
vec4 rivA(vec2 q0, float s) {
  vec4 best = vec4(9., 1., 0., 0.);
  if (s < -4. || s > 46.) return best;
  // the rivulets' own frame: across (x) and along the flow toward the mouth (y)
  vec2 dq = q0 - ENTRY.xz, q = ENTRY.xz + vec2(dot(dq, vec2(uP[44].y, -uP[44].x)), dot(dq, uP[44].xy));
  if (q.y - ENTRY.z > 7. || abs(q.x - ENTRY.x) > 16. + uP[15].w * 4.5) return best;   // they end in the sea at the mouth, not across the bay
  // one rolled loop (compile time); constant uniform indices picked by ternaries, never a dynamic uniform index
  int nr = int(uP[19].w);
  for (int i = 0; i < nr; i++) {
    vec4 R = i == 0 ? uP[15] : i == 1 ? uP[16] : uP[17];
    float phs = i == 0 ? uP[18].x : i == 1 ? uP[18].y : uP[18].z, st = i == 0 ? uP[19].x : i == 1 ? uP[19].y : uP[19].z, fi = float(i);
    float xc = ENTRY.x + R.x * (.35 + .65 * clamp(s / 30., 0., 1.)) + R.y * (sin(q.y * R.z + phs) * .6 + sin(q.y * R.z * 2.3 + phs * 1.7) * .4) * clamp(s / 8., .25, 1.) + (textureLod(uN2, vec2(q.y * .019, .3 + fi * .17), 0.).b - .5) * 5. + (textureLod(uN2, vec2(q.y * .09, .1 + fi * .23), 0.).a - .5) * 1.4;
    float w = R.w * (1. + 2.3 * smoothstep(5., -1.5, s)) * (.75 + .5 * textureLod(uN2, vec2(q.y * .043, .8 + fi * .07), 0.).a);
    float u = abs(q.x - xc) / w + smoothstep(st - 5., st, s) * 4.;
    if (u < best.x) best = vec4(u, w, q.x - xc, fi);
  }
  return best;
}
out vec4 oC;
void main() {
  vec2 f = vec2(-48., -58.) + gl_FragCoord.xy / 512. * vec2(96., 66.);
  vec2 q = ENTRY.xz + f.x * vec2(uP[44].y, -uP[44].x) + f.y * uP[44].xy;
  oC = rivA(q, shoreZ(q.x) - q.y);
}
`,To=we+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",yo=we+Ie+`
out uvec4 oG;
// fine relief (m): cracks between lobes, ropy festoons bowed downstream, glassy skin; gl gloss, ck crack
float gRope = 1.;
float detailH(vec2 q, float s, float bm, float fp, out float gl, out float ck) {
  gl = .35; ck = 0.; gRope = 1.;
  float la = smoothstep(.5, 5., s) * (1. - bm);
  float nc = nearCrack(q, fp);
  float aa = smoothstep(.56, .64, textureLod(uN2, q * .0035 + .77, 0.).g) * smoothstep(12., 40., length(q - EYE.xz));
  if (la <= 0.) return 0.;
  vec2 lu = lobeUV(q);
  vec4 v = textureLod(uNV, lu, 0.), v2 = textureLod(uNV, lu * 2.7 + .31, 0.);
  const float CELL = 3.375;
  float cw = .006 + .005 * v.a, cwm = max(cw, fp * .8 / CELL);
  float cw2 = .01, cwm2 = max(cw2, fp * .8 * 2.7 / CELL);
  float crk = smoothstep(cwm, cwm * .25, v.b) * (cw / cwm) * smoothstep(.25, .45, fract(v.a * 13.7 + v2.a * .3));
  // farther off, where ropes are below a pixel: the small toes' cracks and slabby relief keep the field from going smooth
  float mid = smoothstep(.012, .035, fp);
  float cr2 = smoothstep(.05, .012, v2.b) * mid;
  crk = max(crk, cr2 * .7);
  float h = -.1 * crk - .14 * nc + mid * (.06 * (textureLod(uN2, q * .6 + .33, 0.).g - .5) + .05 * smoothstep(0., .3, v2.b));
  ck = max(crk * la, nc);
  // ropes: folds across each lobe's flow, bowed into festoons, on some lobes
  float th = v.a * 61.;
  vec2 fd = vec2(cos(th), sin(th));
  vec2 rel = -v.rg * CELL;
  float al = dot(rel, fd), ac = dot(rel, vec2(-fd.y, fd.x));
  float fine = textureLod(uN2, q * .2 + .3, 0.).r * .7 + textureLod(uN2, q * .55 + .1, 0.).g * .3;
  float ph = (al - .26 * ac * ac + (fine - .5) * .45) * (6.2832 / .085);
  float ropy = smoothstep(.1, .28, fract(v.a * 7.3)) * smoothstep(.07, .22, v.b) * smoothstep(-2.4, .3, al) * smoothstep(2.6, 1.5, length(rel));
  float rf = smoothstep(.016, .009, fp) * ropy;
  float rc = .5 + .5 * cos(ph);
  h += (.022 * sqrt(rc) + .004 * rc * sin(ac * 55. + ph * .31)) * rf;
  gRope = 1. - .6 * rf * (1. - sqrt(rc));
  // glassy skin: broad swells, fine wrinkles
  h += .05 * (textureLod(uN2, q * .12 + .71, 0.).r - .5) * la;
  h += .0025 * (textureLod(uN2, q * .7 + .17, 0.).b - .5) * la;
  h = mix(h, .16 * (textureLod(uN2, q * .5 + .1, 0.).b - .5) + .07 * (textureLod(uN2, q * 1.6 + .4, 0.).a - .5), aa);
  gl = (1. - .85 * aa) * (.55 + .7 * textureLod(uN2, q * 1.7 + .29, 0.).b) * mix(.5, .8, rf) * (1. - .85 * crk) * (.6 + .4 * smoothstep(.0, .2, v.b)) * (1. - .7 * nc) * (.45 + .75 * fract(v.a * 3.1));
  return h * la;
}
uint pk8(float a, float b) { return uint(clamp(a, 0., 1.) * 255. + .5) | (uint(clamp(b, 0., 1.) * 255. + .5) << 8); }
void main() {
  vec2 uv = gl_FragCoord.xy / SZ;
  vec3 d = rayDir(uv), o = EYE;
  float pxA = 2. * TANH / SZ;
  float tSea = d.y < 0. ? min(-o.y / min(d.y, -1e-6), 2e4) : 1e9;   // under half's 65504 (past it the far sea row came out black), and no sky texels below the horizon
  float tMax = min(tSea, 1700.);
  // one loop, one landH call site (compile time): 0 march, 1 bisect, 2 normal taps, 3 shadows toward the moon then
  // toward the glow at the entry, 4 occlusion, 5 how near the ray of the pixel above passes the land (the silhouette's
  // coverage: the composite blends the edge pixel toward that sky by it, so a skyline has no stairs), 9 done
  vec3 dU = rayDir(uv + vec2(0., 1. / SZ));
  float cl = 0.;
  float t = .05, lt = .05, s = 0., bm = 0.;
  bool hit = false, moonDone = false;
  int ph = d.y < .2 ? 0 : 9, nb = 0, kk = 0, im = 0, ks = 0;
  float a = 0., b = 0., fp = 0., e = 0., h0 = 0., D = 0., res = 1., tt = 0., oc = 0.;
  vec3 P = vec3(0.), n = vec3(0., 1., 0.), lg = vec3(0.);
  vec4 hk = vec4(0.);
  uint mat = 0u;
  float mv = 1., gv = 1., ao = 1., gl = 0., ck = 0., aoL = 1.;
  for (int i = 0; i < 460; i++) {
    if (ph == 9) break;
    vec3 p;
    if (ph == 0) p = o + d * t;
    else if (ph == 1) p = o + d * (.5 * (a + b));
    else if (ph == 2) p = vec3(P.x + (kk == 0 ? -e : kk == 1 ? e : 0.), 0., P.z + (kk == 2 ? -e : kk == 3 ? e : 0.));
    else if (ph == 3) p = P + n * (.03 + .25 * smoothstep(.8, .45, n.y)) + vec3(0., max(h0 - P.y, 0.) + .01, 0.) + (moonDone ? lg : MOON) * tt;   // from above the surface: the bisection can end a little inside a steep face
    else if (ph == 5) p = o + dU * (t * (1. + float(kk) * (.04 + .012 * float(kk))));
    else { float an = float(kk) * 2.094 + (kk > 2 ? 1.05 : 0.), r = kk > 2 ? 2.4 : .55; p = vec3(P.x + cos(an) * r, 0., P.z + sin(an) * r); }
    float s1, b1;
    float H = landH(p.xz, s1, b1, ph < 3);
    if (ph == 0) {
      float dh = p.y - H;
      if (dh < 0.) { hit = true; a = lt; b = t; ph = 1; }
      else {
        lt = t; t += max(dh * .55, .006 + t * .012 + max(t - 40., 0.) * .012);
        if (t > tMax) ph = 9;
        else if (++im >= 300) { hit = true; a = lt; b = t; ph = 1; }
      }
    } else if (ph == 1) {
      float m = .5 * (a + b);
      if (p.y < H) b = m; else a = m;
      if (++nb >= 9) {
        t = .5 * (a + b); P = o + d * t;
        fp = t * pxA / max(-d.y, .25); e = max(t * pxA * .7, .003);
        ph = 2; kk = 0;
      }
    } else if (ph == 2) {
      float g1, c1;
      float fF = 1. - gFc;
      H += detailH(p.xz, s1, b1, fp, g1, c1) * fF; c1 *= fF;
      if (kk == 0) hk.x = H; else if (kk == 1) hk.y = H; else if (kk == 2) hk.z = H; else if (kk == 3) hk.w = H;
      else { gl = g1; ck = c1; h0 = H; ao = mix(1., gRope, fF) * gLed; aoL = ao; gl = max(gl, gLip); s = s1; bm = b1; }
      if (++kk == 5) {
        n = normalize(vec3(hk.x - hk.y, 2. * e, hk.z - hk.w));
        mat = bm > .5 ? 2u : 1u;
        lg = ENTRY + vec3(0., 3., 0.) - P; D = length(lg); lg /= D;
        moonDone = MOON.y < 0.; res = 1.; tt = .03 + t * pxA; ks = 0;
        if (moonDone) { mv = 0.; tt = .05 + t * pxA; }
        ph = 3;
      }
    } else if (ph == 3) {
      float hh = p.y - H;
      res = min(res, (moonDone ? 5. : 7.) * hh / tt);
      tt += max(hh * .6, (moonDone ? .05 : .03) + tt * (moonDone ? .15 : .12));
      ks++;
      if (res < 0. || (moonDone ? tt > D - 3. || ks >= 26 : tt > 90. || ks >= 28)) {
        if (moonDone) { gv = clamp(res, 0., 1.); ph = 4; kk = 0; }
        else { mv = clamp(res, 0., 1.); moonDone = true; res = 1.; tt = .05 + t * pxA; ks = 0; }
      }
    } else if (ph == 4) {
      oc += max(H - h0, 0.) / (kk > 2 ? 2.4 : .55);
      if (++kk == 6) { ao = clamp(1. - oc * .22, 0., 1.) * (1. - .75 * ck) * ao; ph = dot(n, d) > -.6 && dU.y > -.025 ? 5 : 9; kk = 0; cl = 9.; }   // only rays near the horizon can pass over the land to the sky
    } else {
      float tk = t * (1. + float(kk) * (.04 + .012 * float(kk)));
      cl = min(cl, (p.y - H) / (tk * pxA));
      if (++kk == 8) ph = 9;
    }
  }
  // the rock's own grain on its own plane: a height field has none on a steep face (it would shade the same all the way
  // down, combed), so the sea face gets bands and rubble in its along-and-up frame, the fallen blocks their rough tops
  float wF = smoothstep(.8, .45, n.y), wT = (1. - wF) * smoothstep(.8, -1.5, s) * (1. - bm);
  if (hit && wF + wT > 0.) {
    vec3 T = wF > 0. ? normalize(vec3(-n.z, 0., n.x) + vec3(1e-4, 0., 0.)) : vec3(1., 0., 0.), B = normalize(cross(T, n));
    float u = dot(P, T), v = dot(P, B);
    // three reads: the broad bands in r, the rubble in a (its finest octaves) at the same place
    vec2 c1 = vec2(u, v * 1.8) * .045 + .13;
    const float dd = .002;
    vec4 b0 = textureLod(uN2, c1, 0.), bx = textureLod(uN2, c1 + vec2(dd, 0.), 0.), by = textureLod(uN2, c1 + vec2(0., dd), 0.);
    float b1 = b0.r;
    vec2 gr = (vec2(bx.r, by.r) - b0.r) * vec2(.045, .081) / dd * .8 + (vec2(bx.a, by.a) - b0.a) * vec2(.045, .081) / dd * .22;
    n = normalize(n - (gr.x * T + gr.y * B) * max(wF, wT * .6));
    // the ground-plane occlusion taps mean nothing on a face (they read the land above it): the units' own light and dark instead
    ao = mix(ao, aoL, wF) * (1. - .35 * max(wF, wT) * smoothstep(.55, .3, b1));
  }
  if (!hit && tSea < 1e8) { t = tSea; mat = 3u; }
  else if (!hit) discard;   // the sky program has written this texel
  vec2 oc2 = n.xz / (abs(n.x) + abs(n.y) + abs(n.z));
  if (n.y < 0.) oc2 = (1. - abs(oc2.yx)) * vec2(oc2.x >= 0. ? 1. : -1., oc2.y >= 0. ? 1. : -1.);
  oG = uvec4(packHalf2x16(vec2(t, 0.)) & 65535u, pk8(oc2.x * .5 + .5, oc2.y * .5 + .5),
    uint(mv * 63. + .5) | (uint(gv * 31. + .5) << 6) | (uint(ao * 31. + .5) << 11),
    mat | (uint(clamp(gl, 0., 1.) * 31. + .5) << 3) | (uint(clamp(ck, 0., 1.) * 31. + .5) << 8) | (uint(clamp(cl, 0., 1.) * 7. + .5) << 13));
}
`,ko=we+Ie+`
// the sky, static for a view, is baked here into the sky pixels' G-buffer texels
vec3 gStar = vec3(0.);
bool gFlank = false; float gBA = 0., gBP = 0.;   // a flank pixel, its breakout line glow and flicker phase (the composite flickers it)
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float wrapA(float a) { return mod(a + 3.1415927, 6.2831853) - 3.1415927; }
vec4 h4(vec2 p) { vec4 p4 = fract(vec4(p.xyxy) * vec4(.1031, .103, .0973, .1099)); p4 += dot(p4, p4.wzxy + 33.33); return fract((p4.xxyz + p4.yzzw) * p4.zywx); }
float skyEl(float az) {
  float bk = max(-cos(az) + .08, 0.) / 1.08;
  float u = az * .159155;
  float n = textureLod(uN2, vec2(u * 2. + uP[42].z, .37), 0.).r, m = textureLod(uN2, vec2(u * 13. + uP[42].z, .59), 0.).b;
  float cones = .007 * exp(-pow(wrapA(az - uP[42].w) / .03, 2.)) + .004 * exp(-pow(wrapA(az - uP[42].w - .45) / .02, 2.));
  float shield = .3 + .7 * exp(-pow(wrapA(az - uP[40].x - .35) / 1.1, 2.));
  return -.002 + bk * (.022 + uP[42].x * shield * (.85 + .3 * n) + .006 * (m - .5) + cones);
}
vec3 stars(vec3 d, float pxA) {
  vec3 a = abs(d); vec2 uv; float fid;
  if (a.x > a.y && a.x > a.z) { uv = d.yz / a.x; fid = d.x > 0. ? 0. : 1.; } else if (a.y > a.z) { uv = d.xz / a.y; fid = d.y > 0. ? 2. : 3.; } else { uv = d.xy / a.z; fid = d.z > 0. ? 4. : 5.; }
  float N = 190.; vec2 g = uv * N, id = floor(g), f = g - id;
  vec4 h = h4(id + vec2(fid * 523., fid * 211.));
  vec2 sp = .2 + .6 * h.yz;
  float dpx = length(f - sp) / N / pxA;
  float mag = pow(h.w, 18.) * 7. + pow(h.w, 7.) * .05;
  float tw = 1.;   // the composite twinkles them
  return mix(vec3(1., .82, .64), vec3(.74, .85, 1.), h.y) * step(h.x, .075 * clamp(uP[20].w * uP[20].w, .12, 1.)) * mag * tw * exp(-dpx * dpx * 1.6) * uP[20].w;
}
vec3 skyFull(vec3 d, float pxA) {
  vec3 c = skyBase(d);
  float az = at2(vec2(d.z, d.x)), el = d.y;
  float sk = skyEl(az);
  // the volcano's flank glows red low over the vent
  float dv = wrapA(az - uP[40].x);
  c += vec3(1., .2, .05) * uP[40].z * .007 * exp(-abs(dv) / .3) * exp(-max(el - sk, 0.) / .06);
  if (el < sk) {
    // the dark flank, faintly moonlit, hazier toward its foot
    gFlank = true;
    float fz = clamp((sk - el) / max(sk, .01), 0., 1.);
    float pali = smoothstep(.25, .4, el / max(sk, .01)) * smoothstep(.8, .6, el / max(sk, .01));
    vec3 lc = uP[21].rgb * mix(.55, .25, sqrt(fz)) * (1. - .4 * pali) + uP[22].rgb * uP[1].w * .0012 * (.5 + textureLod(uN2, vec2(az * 2.2, el * 30.), 0.).r) * (1. - .5 * pali);
    // breakouts: a flow line zig-zagging down the pali, glowing in broken stretches, and scattered spots below it
    float db = wrapA(az - uP[40].y);
    if (abs(db) < .5) {
      float u = db / .5 * .5 + .5;
      float elp = sk * (.78 - .62 * u) + sk * .07 * sin(db * 23. + 1.3) + sk * .04 * sin(db * 61.);
      float dl = abs(el - elp) / pxA;
      float seg = smoothstep(.42, .62, textureLod(uN2, vec2(db * 3.1, .83), 0.).g) * smoothstep(.5, .35, abs(db));
      float fl = .75 + .25 * sin(TIME * 1.3 + db * 90.);
      lc += vec3(1., .36, .08) * uP[40].z * seg * fl * (exp(-dl * dl * .5) * .5 + exp(-dl * .3) * .025);
      gBA = uP[40].z * seg * (exp(-dl * dl * .5) * .5 + exp(-dl * .3) * .025); gBP = db * 90.;
      float cell = floor(db * 140.), cx = (cell + .5) / 140.;
      float hs = hash12(vec2(cell, 7.));
      float ey = sk * (.06 + .3 * hash12(vec2(cell, 3.))) + (1. - u) * sk * .1;
      float dd = length(vec2(db - cx - (hs - .5) * .004, el - ey)) / pxA;
      lc += vec3(1., .4, .1) * step(.7, hs) * smoothstep(.0, .3, u) * uP[40].z * (exp(-dd * dd * .9) * 1.2 + exp(-dd * .4) * .03) * (.5 + hs);
    }
    return lc;
  }
  float vis = smoothstep(-.005, .05, el - sk);
  gStar = stars(d, pxA) * vis * smoothstep(0., .12, el);
  if (uP[1].w > 0.) {
    float ma = length(cross(d, MOON));
    if (ma < .012 && dot(d, MOON) > 0.) {
      vec3 mr = normalize(cross(MOON, vec3(0., 1., 0.))), mu = cross(mr, MOON);
      vec2 mq = vec2(dot(d, mr), dot(d, mu)) / .0046;
      float disc = smoothstep(1.05, .9, length(mq));
      float lit = smoothstep(-.15, .15, mq.x * .5 + sqrt(max(1. - dot(mq, mq), 0.)) * .87 + .1);
      float mar = .75 + .35 * textureLod(uN2, mq * .18 + .4, 0.).g;
      c += uP[22].rgb * disc * lit * mar * 14. * min(uP[1].w, 1.);
    }
  }
  if (uP[21].w > 0.) {
    vec3 nm = normalize(vec3(.42, .5, -.76));
    float b = dot(d, nm);
    float lane = textureLod(uN2, vec2(at2(vec2(d.x, d.y)) * .4, b * 3.) + .3, 0.).g;
    c += vec3(.75, .74, .7) * .012 * uP[21].w * exp(-b * b / .025) * (.5 + textureLod(uN2, d.xz * .7 + .2, 0.).r) * smoothstep(.25, .6, lane) * vis;
  }
  // low cloud: moonlit grey, red over the vent, orange over the entry
  if (d.y > .004 && uP[40].w > 0.) { vec4 k = cloudAt(d, TIME, IG); c = mix(c, k.rgb, k.a); gStar *= 1. - k.a; }
  return c;
}
out uvec4 oG;
void main() {
  vec2 uv = gl_FragCoord.xy / SZ;
  vec3 d = rayDir(uv);
  float pxA = 2. * TANH / SZ;
    vec3 c = skyFull(d, pxA);
    float I = max(max(gStar.r, gStar.g), gStar.b), hu = I > 0. ? clamp((gStar.b / gStar.r - .64) / .71, 0., 1.) : 0.;
    // flank texels: blue's sign bit set, the breakout line's glow and flicker phase in place of a star
    oG = uvec4(packHalf2x16(vec2(c.r, 0.)) & 65535u, packHalf2x16(vec2(c.g, 0.)) & 65535u, (packHalf2x16(vec2(c.b, 0.)) & 32767u) | (gFlank ? 32768u : 0u),
      gFlank ? (uint(fract(gBP * .15915494) * 32.) & 31u) << 3 | (uint(sqrt(clamp(gBA, 0., 1.)) * 255. + .5) << 8)
             : (uint(hu * 31. + .5) << 3) | (uint(sqrt(clamp(I / 8., 0., 1.)) * 255. + .5) << 8));
}
`,Po=we+Ie+`
uniform sampler3D uN3;
uniform highp usampler2D uG;
out vec4 oC;
vec4 n3(vec3 p) { return textureLod(uN3, p, 0.); }
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5) * .0796; }
// lobes are drawn out downwind: their centres come pre-squeezed along the wind (I - .3 w w^T), and so is p (pm)
#define LOBE(i) f = max(f, uP[i].w - length((pm - uP[i].xyz) * SQ));
// a tapered capsule from a (radius ra) to b (radius rb), its girth swelling in bulges that travel along it at speed k
#define SEG(i, j, fq, k) { vec3 pa = p - uP[i].xyz, ba = uP[j].xyz - uP[i].xyz; float hh = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.);   f = max(f, mix(uP[i].w, uP[j].w, hh) * (.8 + .22 * sin(hh * fq - TIME * k) + .14 * sin(hh * fq * 2.3 - TIME * k * 1.7 + 2.)) - length((pa - ba * hh) * SQ)); }
float gDep = 0., gDist = 0.;
float field(vec3 p, bool full) {
  float f = -1e3;
  vec3 SQ = vec3(1., 1. + 1.6 * HOLD + .8 * smoothstep(45., 130., p.y), 1.);   // letting go (and high up) the lobes flatten into drifting sheets
  vec3 WD = vec3(uP[7].x, 0., uP[7].y) / max(length(uP[7].xy), 1e-3), pm = p - WD * (dot(p, WD) * .3);
  // the wall of steam along the whole line where lava meets surf, and the column it feeds
  SEG(24, 25, 9., .7) SEG(45, 46, 10., 1.2) SEG(49, 50, 6., .9) SEG(46, 56, 6., .6)
  LOBE(26) LOBE(27) LOBE(28) LOBE(29) LOBE(30) LOBE(31)
  LOBE(32) LOBE(33) LOBE(34) LOBE(35) LOBE(36) LOBE(37) LOBE(38) LOBE(39)
  float rc = uP[7].w * (.5 + .5 * smoothstep(0., 22., p.y)) * (1. + max(p.y, 0.) * .012);
  gDep = 0.; gDist = max(-f - rc * (.75 + 1.1 * HOLD), 0.);
  if (f < -rc * (.75 + 1.1 * HOLD)) return 0.;
  // billows at three scales riding up with the steam; the worley channel buds the surface into rounded lobes
  vec3 cc = (p - vec3(uP[7].x * .5, 1.5, uP[7].y * .5) * TIME) / rc;
  vec4 c0 = n3(cc * .19 + vec3(.5, .2, .2));
  vec3 ccw = cc + (c0.rgb - .5) * .7;
  float Dc = (n3(ccw * .45 + .13).a - .5) * .62 + (c0.a - .5) * .2;
  if (full) Dc += (n3(ccw * 1.2 + .51).a - .5) * .36 + (n3(ccw * 2.7 + .77).a - .5) * .12;
  float fD = f + Dc * rc * (1.6 + 2.2 * HOLD) - HOLD * rc * .45;
  gDep = max(fD, 0.);
  // the steam is thin where it flashes off the water and thickens as it rises; the falls' lip itself stays clear
  vec3 la = p - uP[47].xyz, lb = uP[48].xyz - uP[47].xyz;
  vec3 dm = (la - lb * clamp(dot(la, lb) / dot(lb, lb), 0., 1.)) * vec3(1., .8, 1.);
  return smoothstep(0., rc * .22, fD) * smoothstep(uP[54].y + 10., uP[54].y - 25., p.y) * uP[7].z * mix(1., .4, smoothstep(25., 160., p.y)) * smoothstep(.6, 2.6, length(dm)) * (.15 + .85 * smoothstep(.4, 4., p.y));
}
void main() {
  float CR = uP[4].w;
  vec2 fc = gl_FragCoord.xy;
  vec2 uv = fc / CR;
  vec3 d = rayDir(uv), o = EYE;
  ivec2 gi = clamp(ivec2(uv * SZ), ivec2(0), ivec2(int(SZ) - 1));
  uvec4 gq = texelFetch(uG, gi, 0);
  float tS = (gq.w & 7u) == 0u ? 1e9 : unpackHalf2x16(gq.x).x;
  vec3 iv = 1. / vec3(abs(d.x) < 1e-5 ? 1e-5 : d.x, abs(d.y) < 1e-5 ? 1e-5 : d.y, abs(d.z) < 1e-5 ? 1e-5 : d.z);
  vec3 ta = (uP[8].xyz - o) * iv, tb = (uP[9].xyz - o) * iv;
  vec3 tn = min(ta, tb), tx = max(ta, tb);
  float t0 = max(max(tn.x, tn.y), max(tn.z, 0.)), t1 = min(min(tx.x, tx.y), min(tx.z, min(tS, 2000.)));
  vec3 E = vec3(0.); float T = 1.;
  if (t1 > t0) {
    float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))) + uP[8].w);
    float t = t0 + jit * (.8 + t0 * .02);
    vec3 Lg = ENTRY + vec3(0., 1.5, 0.);
    float cosM = dot(d, MOON);
    float phM = mix(hg(cosM, .62), hg(cosM, -.15), .3);
    vec3 MC = uP[22].rgb * uP[1].w;
    vec3 GC = GLOWC * IG;
    bool inside = false;
    int NK = 4 + int(min(uP[0].y, 0.));
    for (int i = 0; i < 80; i++) {
      if (t >= t1) break;
      vec3 p = o + d * t;
      vec3 lg = Lg - p; float dg = length(lg); lg /= dg;
      float glen = min(9., dg * .7);
      float F = 0., dep = 0., dist = 0., tm = 0., tg = 0.;
      // one field() call site: k = 0 the sample, 1-2 toward the moon, 3 toward the glow
      for (int k = 0; k < NK; k++) {   // NK is a uniform-bounded 4: kept rolled, one field() copy
        vec3 pp = k == 0 ? p : k == 1 ? p + MOON * 4. : k == 2 ? p + MOON * 16. : p + lg * glen * .5;
        float G = field(pp, k == 0);
        if (k == 0) { F = G; dep = gDep; dist = gDist; if (G < .002) break; }
        else if (k == 1) tm += G * 4.5; else if (k == 2) tm += G * 14.; else tg = G * glen;
      }
      float dt;
      if (F > .002) {
        if (!inside) { inside = true; t = max(t - jit * (.8 + t * .02), t0); continue; }
        dt = .7 + t * .016;
        float sig = .36 * F;
        float tauM = .28 * tm + dep * .3;
        vec3 ms = vec3(0.); float a = 1., b = 1.;
        for (int j = 0; j < 3; j++) { ms += a * exp(-tauM * b) * mix(phM, .0796, float(j) * .45); a *= .38; b *= .3; }
        // the glow from below: hot on the undersides near the water, gone by a few tens of metres up
        float tauG = .3 * tg + dep * .06;
        float hgt = max(p.y - 1., 0.);
        float att = (exp(-tauG) * .8 + .2 * exp(-tauG * .3)) * exp(-hgt / 4.2);
        vec3 Lgl = GC * att / (dg * dg + 380.) * mix(vec3(1., .45, .35), vec3(1., .8, .62), exp(-tauG * .6));
        // shadows take the sky's blue; only the base keeps an orange fill
        vec3 amb = (uP[21].rgb * mix(vec3(1.4, 2., 3.6), vec3(2.2, 2.3, 2.6), uP[55].w) + GC * (.7e-4 * exp(-hgt / 4.) + 4e-6 * max(uP[54].x - 1., 0.) * smoothstep(10., 90., hgt))) * (.3 + .7 * exp(-dep * .1));
        // low down the glow swamps the moon and the sky: the base burns orange, the top goes moon-grey
        float mk = mix(.4, 1., smoothstep(1., 22., hgt));
        // at dusk and dawn the sun, below your horizon, still lights the plume's upper half pink
        vec3 Ls = uP[55].rgb * uP[52].w * (hg(dot(d, uP[52].xyz), .5) * .7 + .06) * exp(-dep * .22) * smoothstep(8., 40., p.y);
        vec3 Lc = .92 * ((MC * ms * 1.15 + amb) * mk + Lgl * 2.6 + Ls);
        float Ts = exp(-sig * dt);
        E += T * (1. - Ts) * Lc;
        T *= Ts;
        if (T < .02) break;
      } else dt = clamp(dist * .8, .7 + t * .016, 25.);
      t += dt;
    }
  }
  if (uP[54].w > 0.) {
    // vog, or the murk under a low deck, lit round the entry: the ray's integral of 1/r^2 toward the glow
    vec3 lp = ENTRY + vec3(0., 5., 0.) - o;
    float tq = dot(lp, d), hh = sqrt(max(dot(lp, lp) - tq * tq, 0.) + 80.);
    E += GLOWC * IG * uP[54].w * (atan((min(tS, 3000.) - tq) / hh) + atan(tq / hh)) / hh * (.35 + .65 * T);   // the steam hides the haze behind it
  }
  vec4 r = vec4(E * uP[0].w, T);
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. && r.r < 6e4 ? r : vec4(0., 0., 0., 1.);
}
`,Gt=we+Ie+`
uniform highp usampler2D uG;
uniform sampler2D uC;
uniform sampler2D uB;
uniform sampler2D uSW;   // the sea's own surface: height and its two true slopes, a 23 m patch of wind sea (baked once)
uniform highp usampler2D uL;
out vec4 oC;
// blackbody-ish glow of lava, h 0 (dull red skin) .. 1 (yellow core)
vec3 bb(float h) { h = clamp(h, 0., 1.); return vec3(1., .13 + .6 * h * h, .01 + .36 * h * h * h * h) * (exp2(h * 10.5) - 1.) * .0045 * uP[43].x; }
float ggx(float nh, float a) { float a2 = a * a, d = nh * nh * (a2 - 1.) + 1.; return a2 / (3.1416 * d * d); }
float vis2(float nl, float nv, float a) { float k = a * .5 + .02; return nl / (nl * (1. - k) + k) * nv / (nv * (1. - k) + k); }
// the falls and the lit water at the entry, as a reflected ray from P sees them (a card facing P)
vec3 lavaRefl(vec3 P, vec3 r) {
  vec2 dh = ENTRY.xz - P.xz; float D = length(dh); dh /= max(D, 1e-3);
  float rh = dot(r.xz, dh);
  if (rh < .05 || D < 2.) return vec3(0.);
  vec3 H = P + r * (D / rh);
  float lx = dot(H.xz - ENTRY.xz, vec2(-dh.y, dh.x)), w = uP[12].w * .4;
  float m = smoothstep(w + 1.5, w * .5, abs(lx)) * smoothstep(-.6, .3, H.y) * smoothstep(2.8, 1., H.y);
  float br = textureLod(uN2, vec2(lx * .15, TIME * .05), 0.).b;
  return bb(.7 + .25 * br) * m * (1. + .6 * uP[43].w);
}
// what a glossy surface sees: the sky, the entry's glow, and the steam itself where the reflected ray lands on screen
vec3 env(vec3 P, vec3 r, float sharp, float lr) {
  r.y = abs(r.y) * (lr > .5 ? 1. : .5) + .001;   // a ray the swell turns down meets the water again: no hard black patches (the sea reflects the sky at its true height)
  vec3 c = skyBase(r) + lavaRefl(P, r) * sharp * lr + GLOWC * IG * 3e-5 * max(uP[54].x - 1., 0.) * exp(-length(P.xz - ENTRY.xz) / 450.);   // a low deck lit over the entry
  vec3 rv = vec3(dot(r, RT), dot(r, UPV), dot(r, FW));
  if (rv.z > .1) {
    vec2 sp = rv.xy / (rv.z * TANH) * .5 + .5;
    float ef = smoothstep(0., .08, min(min(sp.x, sp.y), min(1. - sp.x, 1. - sp.y)));
    if (ef > 0.) {
      vec4 C = textureLod(uC, sp, 0.);
      c = mix(c, C.rgb / uP[0].w + C.a * c, ef * sharp);
    }
  }
  return c;
}
float wavePh(float x, float s) { return TIME / uP[13].x - s / uP[13].z + (textureLod(uN2, vec2(x * .0023, .13), 0.).r - .5) * 1.6; }
float waveA(float n) { float h = hash12(vec2(n, 3.7)); return uP[13].y * (.55 + .7 * h * h + (fract(n * .37 + .2) < .18 ? .5 : 0.)); }
// x foam, y wet: breaking crests and their wake on the water, the swash running up the shore
vec2 surf(vec2 q, float s, float bm) {
  float ph = wavePh(q.x, min(s, 0.));
  float n = floor(ph), tau = (ph - n) * uP[13].x;
  float A = waveA(n);
  float foam = 0., wet = 0.;
  float st = textureLod(uN2, q * vec2(.11, .05) + vec2(.3, TIME * .01), 0.).g;
  if (s < 0.) {
    float bz = smoothstep(-6. - 14. * A, -2., s);
    foam = bz * A * (exp(-tau * 1.1) + .4 * exp(-tau * .3) * smoothstep(.4, .7, st));
    foam += smoothstep(-4., -.3, s) * (.5 + .5 * A) * exp(-tau * .45) * .6;
  } else {
    float Ru = mix(2.4, 5.5, bm) * A, Ts = 5.5;
    float fr = Ru * sin(clamp(tau / Ts, 0., 1.) * 3.1416);
    foam = smoothstep(fr + .25, fr - .5, s) * smoothstep(Ts, 2., tau) * (.5 + .5 * st);
    wet = smoothstep(Ru * 1.05 + .3, Ru * .8, s) * exp(-max(tau - 4., 0.) * .2);
  }
#ifdef INTER
  vec4 W = uP[10];
  if (W.z > 0.) {
    float lat = exp(-pow((q.x - W.x) / 45., 2.)) * W.z;
    float tb = TIME - W.y;
    if (s < 0.) {
      float sc = tb * 8.;
      foam = max(foam, lat * (smoothstep(-30., -6., s) * exp(-pow((s - sc) / (3. + max(-sc, 0.) * .12), 2.)) + exp(-max(tb, 0.) * .35) * step(0., tb) * smoothstep(-30., -6., s)));
    } else if (tb > 0.) {
      float Rb = 13. * lat, fb = Rb * sin(clamp(tb / 7., 0., 1.) * 3.1416);
      foam = max(foam, smoothstep(fb + .5, fb - 2., s) * smoothstep(7., 3., tb));
      wet = max(wet, smoothstep(Rb + .3, Rb * .8, s) * exp(-max(tb - 6., 0.) * .15));
    }
  }
#endif
  float bl = textureLod(uN2, q * .37 + .5, 0.).a;
  return vec2(clamp(foam * (.5 + .8 * bl), 0., 1.), wet);
}
// lava on the bench: crust plates riding the rivulets, an incandescent core, toes budding at the front, the breakout
vec3 lava(vec3 P, float s, out float cov, out float near) {
  vec2 q = P.xz;
  cov = 0.; near = 0.;
  vec3 em = vec3(0.);
  vec4 r = riv(q, s);
  if (r.x < 1.3) {
    // along the flow (and on down the bench face), warped so no plate lines up with another
    float fall = smoothstep(2.8, 1.2, s) * smoothstep(-2.4, -1., s);
    float fy = dot(q - ENTRY.xz, uP[44].xy) - P.y * 1.4;
    vec2 wp = (textureLod(uN2, q * .07 + .4, 0.).rg - .5) * 2.2 + (textureLod(uN2, q * .23 + .1, 0.).ba - .5) * .7;
    float u = r.x + (textureLod(uN2, q * .6 + .2, 0.).a - .5) * .3;
    float inside = smoothstep(1., .86, u);
    float spd = uP[18].w * (1.1 - u * u * .8) * (1. + 3. * fall);
    // two flow-map phases so the plates never shear without bound; plates at two sizes, seams of uneven width
    float PP = 6., f1 = fract(TIME / PP), f2 = fract(TIME / PP + .5), wb = abs(f1 * 2. - 1.);
    vec2 base = vec2(r.z * .55, fy * .4) + r.w * .31 + wp;
    vec2 sh1 = vec2(0., spd * f1 * PP * .4), sh2 = vec2(0., spd * f2 * PP * .4);
    vec4 va = textureLod(uNV, (base - sh1) * .12, 0.), vb = textureLod(uNV, (base - sh2) * .12 + .5, 0.);
    vec4 fa = textureLod(uNV, (base * 2.3 - sh1 * 2.3) * .12 + .27, 0.), fb = textureLod(uNV, (base * 2.3 - sh2 * 2.3) * .12 + .77, 0.);
    float cr = mix(va.b, vb.b, wb), ch = mix(va.a, vb.a, wb), cr2 = mix(fa.b, fb.b, wb), ch2 = mix(fa.a, fb.a, wb);
    float cw = .02 + .09 * textureLod(uN2, q * .21 + .5, 0.).g * textureLod(uN2, q * .9 + .15, 0.).b;
    float crack = max(smoothstep(cw, cw * .1, cr), .8 * smoothstep(cw * .55, 0., cr2) * step(.4, ch2));
    float strk = textureLod(uN2, vec2(r.z * .4, (fy - TIME * spd) * .08) + r.w * .2, 0.).a;
    float fyw = fy;
    float tear = textureLod(uN2, vec2(r.z * .12 + r.w * .3, (fy - TIME * spd * .5) * .045), 0.).r;
    float plate = .12 + .16 * ch * ch + .1 * (1. - u) + .05 * ch2;
    float seam = .55 + .22 * ch + .15 * (1. - u);
    float heat = mix(plate, seam, clamp(crack, 0., 1.));
    // incandescent core where the crust tears open, most of all where it speeds over the lip
    float exposed = smoothstep(.62, .12, u + (strk - .5) * .8) * smoothstep(.4, .62, tear + .25 * smoothstep(4., -1., s) + .6 * fall);
    heat = mix(heat, .84 + .16 * strk, exposed);
    // toes at the front: lobes of fresh lava breaking through and skinning over, each on its own clock
    if (s < 6.) {
      vec4 tv = textureLod(uNV, (q + wp * 1.5) * .045 + .17, 0.);
      float age = fract(tv.a * 5.3 + TIME * .07);
      float toe = mix(.97, .38, smoothstep(.05, .6, age)) * smoothstep(.02, .12, tv.b) + .3 * smoothstep(.05, .0, tv.b);
      heat = mix(heat, max(heat * .85, toe), smoothstep(6., 1.5, s));
    }
    // pouring down the face: streaming, hottest at the lip, breaking into strands
    float strand = textureLod(uN2, vec2(r.z * .23 + r.w + (textureLod(uN2, vec2(P.y * .05, r.w * .3), 0.).g - .5) * .2, (P.y - TIME * 1.6) * .11), 0.).b;
    float sv = smoothstep(.3, .58, strand + (strk - .5) * .4);
    heat = mix(heat, mix(.68, 1., sv) - .08 * smoothstep(.3, -1.2, P.y), fall * smoothstep(1.2, .7, u));
    em = bb(heat) * inside;
    cov = inside;
  }
  near = exp(-max(r.x - 1., 0.) * r.y / .9) * (1. - cov);
#ifdef INTER
  // the breakout a drag spreads: thickness and heat from the sim; it skins over from the edges as it cools
  vec2 bu = (q - uP[23].xy) / uP[23].z;
  if (uP[23].w > 0. && all(greaterThan(bu, vec2(0.))) && all(lessThan(bu, vec2(1.)))) {
    vec2 b = texture(uB, bu).rg;
    float en = textureLod(uN2, q * .5 + .4, 0.).a - .5;
    float lc = smoothstep(.02, .07, b.r + en * .04);
    if (lc > 0.) {
      vec2 w = (textureLod(uN2, q * .15 + .7, 0.).rg - .5) * 1.4;
      vec4 v = textureLod(uNV, (q + w) * .16 + .61, 0.), v2 = textureLod(uNV, (q + w) * .41 + .13, 0.);
      float crack = max(smoothstep(.07, .0, v.b), .7 * smoothstep(.05, .0, v2.b));
      float T = b.g + (en * .12) * (1. - b.g);
      // the skin: a thin glassy crust forms first at the cool thin edges, tears into plates, then goes dark
      float skin = smoothstep(.9, .62, T);
      float heat = mix(.5 + .36 * T * T, T * (.42 + .5 * crack), skin);
      em = mix(em, bb(heat), lc);
      cov = max(cov, lc * smoothstep(.2, .5, T));
    }
  }
#endif
  return em;
}
// light falling on a point: moon, the glow at the entry, the lit steam overhead, the breakout, sky; plus specular
vec3 lightUp(vec3 P, vec3 n, vec3 V, float mv, float gv, float ao, float rough, float F0, float gk, out vec3 spec) {
  float nv = max(dot(n, V), .05), a = rough * rough;
  vec3 MC = uP[22].rgb * uP[1].w, GC = GLOWC * IG;
  vec3 Ld = vec3(0.); spec = vec3(0.);
  // one rolled loop, one GGX call site: 0 the moon, 1 the glow at the entry, 2 the lit plume overhead, 3 the breakout
#ifdef INTER
  int nL = uP[11].z > 0. ? 4 : 3;
#else
  int nL = 3;
#endif
  for (int k = 0; k < nL; k++) {
    vec3 l; float E, dd = 1., wd = 0.; vec3 C = GC;
    if (k == 0) { l = MOON; E = mv; C = MC; }
    else if (k == 1) { l = ENTRY + vec3(0., 1.5, 0.) - P; dd = dot(l, l); E = gv * uP[41].w / (dd + 70.); wd = mix(.8, 3., smoothstep(.1, .3, rough)); }
    else if (k == 2) { l = ENTRY + vec3(uP[7].x * 7., 30., uP[7].y * 7.) - P; dd = dot(l, l); E = uP[22].w / (dd + 1500.); wd = 22.; }
    else { l = vec3(uP[11].x, 1.6, uP[11].y) - P; dd = dot(l, l); E = uP[11].z / (dd + 6.); wd = 2.; }
    float id = inversesqrt(dd);
    l *= id;
    vec3 h = normalize(l + V);
    float nl = max(dot(n, l), 0.);
    float fr = k == 3 ? F0 * 2. : F0 + (1. - F0) * pow(1. - max(dot(V, h), 0.), 5.);
    float vv = k == 1 || k == 3 ? smoothstep(0., .1, nl) : vis2(nl, nv, a);
    Ld += C * E * (k == 2 ? .3 + .7 * nl : nl) * (k == 1 ? gk : 1.);
    spec += C * E * ggx(max(dot(n, h), 0.), clamp(a + wd * (k == 0 ? 0. : id), 0., 1.)) * fr * vv * .25 / nv * (k == 2 ? smoothstep(.1, .3, rough) : 1.);
  }
  Ld += (uP[21].rgb * 1.6 * (.55 + .45 * n.y) + GC * 3e-5) * ao;
  return Ld;
}
void main() {
  vec2 fc = gl_FragCoord.xy, uv = fc / SZ;
  vec3 d = rayDir(uv);
  float pxA = 2. * TANH / SZ, k1 = SZ / 1000.;
  uvec4 g = texelFetch(uG, ivec2(fc), 0);
  // sky texels hold the baked sky colour in x, y, z (their distance is 'far')
  float t = (g.w & 7u) == 0u ? 65000. : unpackHalf2x16(g.x).x;
  // heat shimmer: over the fresh crack at your boots and in the hot air above the entry
  {
    vec3 P0 = EYE + d * t;
    float hm = 0.;
    if (t < 16. && P0.z > -6. && P0.z < 10.) {
      float cx = 1.05 + .55 * sin(P0.z * .55 + 1.) + .22 * sin(P0.z * 1.9 + 2.);
      hm = exp(-pow((P0.x - cx) / .45, 2.)) * .8;
    }
    vec3 de = normalize(ENTRY + vec3(0., 2., 0.) - EYE);
    if (dot(de, FW) > .2) {
      float ax = dot(d - de, RT), ay = dot(d - de, UPV);
      hm += exp(-ax * ax / (.0025 * uP[12].w * .1)) * smoothstep(-.012, .01, ay) * exp(-max(ay, 0.) / .05) * .9;
    }
    if (hm > .01) {
      vec2 off = vec2(sin(fc.y * .9 / k1 + TIME * 7.3 + sin(fc.x * .05 / k1 + TIME * 2.1) * 2.), .6 * cos(fc.y * 1.3 / k1 - TIME * 5.3 + fc.x * .02 / k1)) * hm * 1.3 * k1;
      g = texelFetch(uG, clamp(ivec2(fc + off), ivec2(0), ivec2(int(SZ) - 1)), 0);
      t = (g.w & 7u) == 0u ? 65000. : unpackHalf2x16(g.x).x;
    }
  }
  uint mat = g.w & 7u;
  vec3 col;
  vec3 V = -d;
  if (mat == 0u) {
    // the sky baked for this view (at time uP[44].w): its stars twinkle, the low cloud drifts on, the breakouts flicker
    col = vec3(unpackHalf2x16(g.x).x, unpackHalf2x16(g.y).x, unpackHalf2x16(g.z & 32767u).x);
    float I = float(g.w >> 8) / 255., hu = float((g.w >> 3) & 31u) / 31.;
    if (g.z > 32767u) {
      float ph = (float((g.w >> 3) & 31u) + .5) * .19634954;
      col += vec3(1., .36, .08) * I * I * .25 * (sin(TIME * 1.3 + ph) - sin(uP[44].w * 1.3 + ph));
    } else {
      if (d.y > .004 && uP[40].w > 0.) {
        // the cloud as baked comes out (cover <= .9), the cloud the wind has moved on goes in
        // (one colour for both: over a few minutes of drift only the cover changes visibly; the glow is taken at each time)
        vec2 cq = EYE.xz + d.xz * (max(uP[54].y - EYE.y, 20.) / d.y), p0 = cq + vec2(uP[44].w * 1.5, uP[44].w * .6), p1 = cq + vec2(TIME * 1.5, TIME * .6);
        float n1 = cloudN(p1), a0 = cloudCov(cloudN(p0), d.y), a1 = cloudCov(n1, d.y);
        if (a0 + a1 > 0.) {
          vec3 cc = cloudC(p1, n1), eg = GLOWC * 1e-4 * uP[54].x * exp(-length(p1 - ENTRY.xz) / (uP[54].x > 2. ? 300. : 1500.)) * (uP[54].x > 2. ? .25 + 1.5 * n1 * n1 : 1.);
          col = mix(max((col - (cc + eg * uP[11].w) * a0) / (1. - a0), 0.), cc + eg * IG, a1);
        }
      }
      col += mix(vec3(1., .82, .64), vec3(.74, .85, 1.), hu) * I * I * 8. * (.75 + .25 * sin(TIME * (2.5 + hu * 6.) + I * 61. + fc.x * .013));
    }
  }
  else {
    vec3 P = EYE + d * t;
    vec2 q = P.xz;
    float s = shoreZ(P.x) - P.z;
    bool isSea = mat == 3u, sand = mat == 2u;
    vec3 n, alb;
    float mv = 1., gv = 1., ao = 1., rough, F0, ck = 0., churn = 0., dE = 0.;
    if (isSea) {
      // swell and ripples, fading with distance
      float fd = 1. / (1. + t * .01), fn = 1. / (1. + t * .035);
      // the wind sea: two reads of the baked surface (true slopes), in the shore's frame, running in toward it at two
      // speeds and angles so the pattern never holds its shape; the swell under it: ranks parallel to the coast whose
      // slope is the derivative of their height, trochoid-sharpened crests, faded out where a pixel spans a rank
      vec2 ac = vec2(uP[44].y, -uP[44].x), fq = vec2(dot(q, ac), dot(q, uP[44].xy));
      vec2 w1 = texture(uSW, fq * (1. / 43.) + vec2(.0, TIME * .085)).gb - .5, w2 = texture(uSW, LR * fq * (1. / 3.7) + vec2(.37, TIME * .33 + .5)).gb - .5;
      vec2 gs = (w1 * 1.5 + (w2 * LR) * 1.3 * (.4 + .6 * fn)) * .85;   // stored as slope * 300
      float ph = wavePh(P.x, s), th = fract(ph) * 6.2832, L = uP[13].z;
      float fpz = t * pxA / max(-d.y, .015);
      float dHs = waveA(floor(ph)) * (sin(th) + .5 * sin(2. * th)) * 6.2832 / L * smoothstep(L * .5, L * .12, fpz);
      vec2 G = gs.x * ac + gs.y * uP[44].xy + vec2(0., dHs);
      n = normalize(vec3(-G.x * fd, 1., -G.y * fd));
      rough = .035 + .05 * (1. - fn); F0 = .02; alb = vec3(.006, .012, .018);
      vec2 dq = q - ENTRY.xz;
      dE = length(vec2(max(abs(dot(dq, vec2(uP[44].y, -uP[44].x))) - uP[12].w * .5, 0.), max(dot(dq, uP[44].xy) - 1.5, 0.)));
      churn = texture(uN2, q * .09 + vec2(TIME * .03, -TIME * .05)).r * .6 + texture(uN2, q * .31 - TIME * .07).a * .4;
    } else {
      vec2 e = vec2(float(g.y & 255u), float(g.y >> 8)) / 255. * 2. - 1.;
      n = vec3(e.x, 1. - abs(e.x) - abs(e.y), e.y);
      if (n.y < 0.) n.xz = (1. - abs(n.zx)) * vec2(n.x >= 0. ? 1. : -1., n.z >= 0. ? 1. : -1.);
      n = normalize(n);
      mv = float(g.z & 63u) / 63.; gv = float((g.z >> 6) & 31u) / 31.; ao = float(g.z >> 11) / 31.;
      float gl = float((g.w >> 3) & 31u) / 31.;
      ck = float((g.w >> 8) & 31u) / 31.;
      // on a steep face the ground's own patterns would run straight down it: give them the face's height as a second axis
      float stp = smoothstep(.6, .25, n.y);
      vec2 qa = q + stp * P.y * 1.7 * normalize(n.xz + 1e-5);
      float va = texture(uN2, qa * .07 + .3).g;
      alb = sand ? vec3(.026, .025, .028) : vec3(.046, .043, .046) * (.7 + .6 * va) * (.6 + .9 * smoothstep(.3, .75, texture(uN2, qa * .0045 + .52).r)) * mix(vec3(1.), vec3(1.15, 1.05, .92), smoothstep(.5, .7, texture(uN2, q * .002 + .15).b));
      rough = sand ? .55 : mix(.8, .22, gl * gl); F0 = .035;
      // steep faces (the bench's sea cliff): stacked flow units, rough and dark, not a smooth glossy wall
      if (stp > 0.) {
        vec2 tg = normalize(vec2(-n.z, n.x) + 1e-5); float ua = dot(q, tg);   // along the face, and up it: bedding a little drawn out sideways
        vec4 ly = texture(uN2, vec2(ua * .09, P.y * .3) + .21);
        float lay = ly.r * .6 + ly.a * .4;
        alb *= mix(1., .35 + 1.1 * smoothstep(.3, .75, lay), stp); rough = mix(rough, .92, stp * smoothstep(.8, .5, gl));   // the units' glassy lips stay glossy
      }
    }
    alb *= 1. - .3 * uP[10].w;   // seen from up the slope: the old flows darker
    vec2 sf = s < 16. && (s > -60. || uP[10].z > 0.) ? surf(q, s, sand ? 1. : 0.) : vec2(0.);
    float wet = isSea ? 0. : max(sf.y, sand ? max(HOLD * uP[43].z * smoothstep(12., 2., s), .85 * smoothstep(3.2, 1.2, s + .6 * sin(q.x * .75))) : 0.);   // the sand below the swash's reach stays wet
    alb *= 1. - .55 * wet;
    rough = mix(rough, sand ? .035 : .15, wet * (sand ? 1. : smoothstep(.3, .8, n.y)));   // wet rock sides stay matt
    vec3 sp;
    // on the water the glow falls off fast away from the entry: dark sea, lit only near the falls and in streaks
    float dS = max(length(q - ENTRY.xz) - uP[12].w * .5, 0.);
    vec3 Ld = lightUp(P, n, V, mv, gv, ao, rough, F0, isSea ? .18 + .82 * exp(-dE / 7.) : sand ? .2 + .8 * exp(-dS / 6.) : 1., sp);
    float nv = max(dot(n, V), 0.);
    float Fe = isSea ? .02 + .98 * pow(1. - nv, 5.) : (F0 + (1. - F0) * pow(1. - nv, 5.) * (1. - rough) * (1. - rough)) * (.3 + .7 * ao) * (1. - rough * .7) * .7;
    vec3 c = alb * Ld / 3.1416 + sp * (isSea ? vec3(1.) : vec3(.9, .95, 1.05)) + env(P, reflect(d, n), isSea ? 1. / (1. + t * .005) : smoothstep(.45, .1, rough) * (sand ? .5 : 1.), isSea ? 1. : .3) * Fe;
    // lava: rivulets and the breakout on land, and the same lava seen glowing through the water at the mouths
    vec3 de = (P - ENTRY) * vec3(.7, 1., 1.);
    float bench = exp(-dot(de.xz, de.xz) / 1200.);
    float cov = 0., near;
    if ((bench > .01 && (!isSea || s > -3.5)) || uP[23].w > 0.) {
#ifdef INTER
      vec3 em = lava(P, s, cov, near);
#else
      uvec4 lq = texelFetch(uL, ivec2(fc), 0); cov = uintBitsToFloat(lq.y); near = uintBitsToFloat(lq.z);
      vec3 em = bb(uintBitsToFloat(lq.x)) * cov;
#endif
      if (isSea) c += em * .6 * smoothstep(-3.5, 0., s);
      else c = mix(c, c * .3, cov) + em + alb * GLOWC * IG * .012 * near;
    }
    if (isSea && dE < 30.) {
      // the boiling glow at the entry: churned water lit from below, incandescent fragments
      float boil = texture(uNV, q * .35 + vec2(TIME * .11, -TIME * .07)).b, boil2 = texture(uNV, q * .9 - vec2(TIME * .19, TIME * .13) + .4).b;
      float bub = smoothstep(.12, .0, boil) * .7 + smoothstep(.08, .0, boil2);
      c += GLOWC * IG * (8e-4 * exp(-dE / 4.) + 6e-5 * exp(-dE / 12.)) * (.35 + churn) + bb(.62 + .3 * churn) * exp(-dE / 2.5) * smoothstep(.4, .7, churn)
         + GLOWC * IG * 4e-3 * exp(-dE / 4.) * bub * (.5 + churn) + GLOWC * IG * 6e-3 * uP[43].w * exp(-dE / 6.) * (.3 + churn);
    } else if (!isSea && ck > .02 && t < 60.) {
      // cracks: a faint red deep in the fresh one at your boots, and in a few far into the field
      float nc = nearCrack(q, t * pxA);
      float hot = max(nc * smoothstep(.3, .65, textureLod(uN2, vec2(q.y * .45, .37), 0.).g), smoothstep(.88, .97, texture(uNV, lobeUV(q)).a) * .4) * smoothstep(.35, .8, ck);
      float fl = .85 + .15 * sin(TIME * 1.7 + q.y * 3.) * sin(TIME * 2.9 + q.x * 2.);
      c += bb(.24 + .05 * fl) * vec3(1., .6, .5) * hot * uP[43].y * fl;
    }
    if (!isSea && t < 14. && P.z > -6. && P.z < 10.) {
      // the crack's heat on its lips
      float cx = 1.05 + .55 * sin(P.z * .55 + 1.) + .22 * sin(P.z * 1.9 + 2.) + (textureLod(uN2, vec2(P.z * .07, .91), 0.).b - .5) * .9 + (textureLod(uN2, vec2(P.z * .4, .17), 0.).a - .5) * .25;
      c += vec3(.012, .0022, .0004) * uP[43].y * exp(-abs(P.x - cx) / .07) * smoothstep(-6., -3., P.z) * smoothstep(10., 6., P.z);
    }
    // foam, lit by everything that lights the spot (orange near the entry)
    vec3 foamC = vec3(.75, .78, .8) * min(Ld / max(.35 + .65 * max(n.y, 0.), .3), vec3(.9, .5, .3)) / 3.1416 + (isSea ? GLOWC * IG * 5e-3 * exp(-dE / 6.) * (1. + churn) * (1. + 2. * uP[43].w) : vec3(0.));
    // surf washing over live lava flashes to steam instead of lying on it
    c = mix(c, foamC, sf.x * (isSea ? .35 + .65 / (1. + t * .01) : .7 * (1. - cov) * smoothstep(.45, .85, n.y)));   // no foam painted down a rock's side
    if (!isSea) c += (vec3(.9, .8, .7) * GLOWC * IG * 2.5e-3 + bb(.7) * .4) * sf.x * cov;
    col = c;
    // haze over distance, faintly lit by the glow toward the entry
    vec2 ge = normalize(ENTRY.xz - EYE.xz);
    float ca = max(dot(normalize(d.xz + 1e-6), ge), 0.);
    // the sky's own horizon colour (skyBase at the horizon, less the moon): no seam where the sea meets the sky
    float cs = dot(normalize(d.xz + 1e-6), normalize(uP[52].xz + 1e-6)) * .5 + .5;
    vec3 fogc = (uP[21].rgb * 1.25 + uP[53].rgb * (.12 + .88 * cs * cs * cs + .06 * cs) * uP[52].w) * .8 + GLOWC * IG * 6e-5 * pow(ca, 6.);
    col = mix(col, fogc, 1. - exp(-t * uP[53].w));
    // the land's silhouette: blend toward the sky texel above by how much of this pixel the bake found clear of land
    float cv = float(g.w >> 13) / 7.;
    if (!isSea && cv > 0.) {
      uvec4 gu = texelFetch(uG, min(ivec2(fc) + ivec2(0, 1), ivec2(int(SZ) - 1)), 0);
      if ((gu.w & 7u) == 0u) col = mix(col, vec3(unpackHalf2x16(gu.x).x, unpackHalf2x16(gu.y).x, unpackHalf2x16(gu.z & 32767u).x), cv);
    }
  }
  // the steam: edge-aware bilinear upsample of the volume: each of the four texels is weighted by how well the depth
  // its ray stopped at matches this pixel's, so steam behind the bank's edge doesn't bleed onto it
  {
    // four bilinear taps half a texel apart (a soft tent, so no texel blocks), each weighted by its depth match
    float CR = uP[4].w;
    float tq = log2(min(t, 4000.) + 1.);
    vec4 C = vec4(0.); float ws = 0.;
    int nt = 4 + int(min(uP[0].y, 0.));   // rolled
    for (int k = 0; k < nt; k++) {
      vec2 tu = uv + (vec2(k & 1, k >> 1) - .5) * .75 / CR;
      uvec4 gl4 = texelFetch(uG, ivec2(clamp(tu, 0., .9999) * SZ), 0);
      float tl = (gl4.w & 7u) == 0u ? 65000. : unpackHalf2x16(gl4.x).x;
      float dl = log2(min(tl, 4000.) + 1.) - tq;
      float w = 1e-3 + 1. / (1. + 40. * dl * dl);
      C += texture(uC, tu) * w; ws += w;
    }
    C /= ws;
    col = col * clamp(C.a, 0., 1.) + max(C.rgb, 0.) / uP[0].w;
  }
  // glare round the hottest lava
  vec3 de = normalize(ENTRY + vec3(0., 1., 0.) - EYE);
  float cg = max(dot(d, de), 0.);
  col += GLOWC * IG * 1.2e-4 * (pow(cg, 4000.) * 2. + pow(cg, 400.) * .5 + pow(cg, 40.) * .06);
  // exposure, a hue-keeping filmic curve, vignette, grain
  col *= uP[0].z * (1. - .09 * pow(length(uv - .5) * 1.3, 2.4));
  float m = max(max(col.r, col.g), col.b);
  float tm = (m * (2.51 * m + .03)) / (m * (2.43 * m + .59) + .14);
  col *= tm / max(m, 1e-6);
  col = mix(col, vec3(tm), smoothstep(.93, 1., tm) * .25);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (hash12(fc) - .5) * (3. / 255.);   // a still dither against banding, not grain
  oC = vec4(col, 1.);
}
`,go=we+Ie+`
uniform highp usampler2D uG;
uniform sampler2D uC;
uniform sampler2D uB;
uniform sampler2D uSW;   // the sea's own surface: height and its two true slopes, a 23 m patch of wind sea (baked once)
out uvec4 o;
vec3 bb(float h) { h = clamp(h, 0., 1.); return vec3(1., .13 + .6 * h * h, .01 + .36 * h * h * h * h) * (exp2(h * 10.5) - 1.) * .0045 * uP[43].x; }
float LH;
vec3 lava(vec3 P, float s, out float cov, out float near) {
  LH = 0.;
  vec2 q = P.xz;
  cov = 0.; near = 0.;
  vec3 em = vec3(0.);
  vec4 r = riv(q, s);
  if (r.x < 1.3) {
    // along the flow (and on down the bench face), warped so no plate lines up with another
    float fall = smoothstep(2.8, 1.2, s) * smoothstep(-2.4, -1., s);
    float fy = dot(q - ENTRY.xz, uP[44].xy) - P.y * 1.4;
    vec2 wp = (textureLod(uN2, q * .07 + .4, 0.).rg - .5) * 2.2 + (textureLod(uN2, q * .23 + .1, 0.).ba - .5) * .7;
    float u = r.x + (textureLod(uN2, q * .6 + .2, 0.).a - .5) * .3;
    float inside = smoothstep(1., .86, u);
    float spd = uP[18].w * (1.1 - u * u * .8) * (1. + 3. * fall);
    // two flow-map phases so the plates never shear without bound; plates at two sizes, seams of uneven width
    float PP = 6., f1 = fract(TIME / PP), f2 = fract(TIME / PP + .5), wb = abs(f1 * 2. - 1.);
    vec2 base = vec2(r.z * .55, fy * .4) + r.w * .31 + wp;
    vec2 sh1 = vec2(0., spd * f1 * PP * .4), sh2 = vec2(0., spd * f2 * PP * .4);
    vec4 va = textureLod(uNV, (base - sh1) * .12, 0.), vb = textureLod(uNV, (base - sh2) * .12 + .5, 0.);
    vec4 fa = textureLod(uNV, (base * 2.3 - sh1 * 2.3) * .12 + .27, 0.), fb = textureLod(uNV, (base * 2.3 - sh2 * 2.3) * .12 + .77, 0.);
    float cr = mix(va.b, vb.b, wb), ch = mix(va.a, vb.a, wb), cr2 = mix(fa.b, fb.b, wb), ch2 = mix(fa.a, fb.a, wb);
    float cw = .02 + .09 * textureLod(uN2, q * .21 + .5, 0.).g * textureLod(uN2, q * .9 + .15, 0.).b;
    float crack = max(smoothstep(cw, cw * .1, cr), .8 * smoothstep(cw * .55, 0., cr2) * step(.4, ch2));
    float strk = textureLod(uN2, vec2(r.z * .4, (fy - TIME * spd) * .08) + r.w * .2, 0.).a;
    float fyw = fy;
    float tear = textureLod(uN2, vec2(r.z * .12 + r.w * .3, (fy - TIME * spd * .5) * .045), 0.).r;
    float plate = .12 + .16 * ch * ch + .1 * (1. - u) + .05 * ch2;
    float seam = .55 + .22 * ch + .15 * (1. - u);
    float heat = mix(plate, seam, clamp(crack, 0., 1.));
    // incandescent core where the crust tears open, most of all where it speeds over the lip
    float exposed = smoothstep(.62, .12, u + (strk - .5) * .8) * smoothstep(.4, .62, tear + .25 * smoothstep(4., -1., s) + .6 * fall);
    heat = mix(heat, .84 + .16 * strk, exposed);
    // toes at the front: lobes of fresh lava breaking through and skinning over, each on its own clock
    if (s < 6.) {
      vec4 tv = textureLod(uNV, (q + wp * 1.5) * .045 + .17, 0.);
      float age = fract(tv.a * 5.3 + TIME * .07);
      float toe = mix(.97, .38, smoothstep(.05, .6, age)) * smoothstep(.02, .12, tv.b) + .3 * smoothstep(.05, .0, tv.b);
      heat = mix(heat, max(heat * .85, toe), smoothstep(6., 1.5, s));
    }
    // pouring down the face: streaming, hottest at the lip, breaking into strands
    float strand = textureLod(uN2, vec2(r.z * .23 + r.w + (textureLod(uN2, vec2(P.y * .05, r.w * .3), 0.).g - .5) * .2, (P.y - TIME * 1.6) * .11), 0.).b;
    float sv = smoothstep(.3, .58, strand + (strk - .5) * .4);
    heat = mix(heat, mix(.68, 1., sv) - .08 * smoothstep(.3, -1.2, P.y), fall * smoothstep(1.2, .7, u));
    LH = heat; em = bb(heat) * inside;
    cov = inside;
  }
  near = exp(-max(r.x - 1., 0.) * r.y / .9) * (1. - cov);
#ifdef INTER
  // the breakout a drag spreads: thickness and heat from the sim; it skins over from the edges as it cools
  vec2 bu = (q - uP[23].xy) / uP[23].z;
  if (uP[23].w > 0. && all(greaterThan(bu, vec2(0.))) && all(lessThan(bu, vec2(1.)))) {
    vec2 b = texture(uB, bu).rg;
    float en = textureLod(uN2, q * .5 + .4, 0.).a - .5;
    float lc = smoothstep(.02, .07, b.r + en * .04);
    if (lc > 0.) {
      vec2 w = (textureLod(uN2, q * .15 + .7, 0.).rg - .5) * 1.4;
      vec4 v = textureLod(uNV, (q + w) * .16 + .61, 0.), v2 = textureLod(uNV, (q + w) * .41 + .13, 0.);
      float crack = max(smoothstep(.07, .0, v.b), .7 * smoothstep(.05, .0, v2.b));
      float T = b.g + (en * .12) * (1. - b.g);
      // the skin: a thin glassy crust forms first at the cool thin edges, tears into plates, then goes dark
      float skin = smoothstep(.9, .62, T);
      float heat = mix(.5 + .36 * T * T, T * (.42 + .5 * crack), skin);
      em = mix(em, bb(heat), lc);
      cov = max(cov, lc * smoothstep(.2, .5, T));
    }
  }
#endif
  return em;
}
void main() {
  vec2 fc = gl_FragCoord.xy, uv = fc / SZ;
  vec3 d = rayDir(uv);
  float pxA = 2. * TANH / SZ, k1 = SZ / 1000.;
  uvec4 g = texelFetch(uG, ivec2(fc), 0);
  // sky texels hold the baked sky colour in x, y, z (their distance is 'far')
  float t = (g.w & 7u) == 0u ? 65000. : unpackHalf2x16(g.x).x;
  // heat shimmer: over the fresh crack at your boots and in the hot air above the entry
  {
    vec3 P0 = EYE + d * t;
    float hm = 0.;
    if (t < 16. && P0.z > -6. && P0.z < 10.) {
      float cx = 1.05 + .55 * sin(P0.z * .55 + 1.) + .22 * sin(P0.z * 1.9 + 2.);
      hm = exp(-pow((P0.x - cx) / .45, 2.)) * .8;
    }
    vec3 de = normalize(ENTRY + vec3(0., 2., 0.) - EYE);
    if (dot(de, FW) > .2) {
      float ax = dot(d - de, RT), ay = dot(d - de, UPV);
      hm += exp(-ax * ax / (.0025 * uP[12].w * .1)) * smoothstep(-.012, .01, ay) * exp(-max(ay, 0.) / .05) * .9;
    }
    if (hm > .01) {
      vec2 off = vec2(sin(fc.y * .9 / k1 + TIME * 7.3 + sin(fc.x * .05 / k1 + TIME * 2.1) * 2.), .6 * cos(fc.y * 1.3 / k1 - TIME * 5.3 + fc.x * .02 / k1)) * hm * 1.3 * k1;
      g = texelFetch(uG, clamp(ivec2(fc + off), ivec2(0), ivec2(int(SZ) - 1)), 0);
      t = (g.w & 7u) == 0u ? 65000. : unpackHalf2x16(g.x).x;
    }
  }
  uint mat = g.w & 7u;
  o = uvec4(0u);
  if (mat != 0u) {
    vec3 P = EYE + d * t;
    float s = shoreZ(P.x) - P.z;
    bool isSea = mat == 3u;
    vec3 de = (P - ENTRY) * vec3(.7, 1., 1.);
    float bench = exp(-dot(de.xz, de.xz) / 1200.);
    float cov = 0., near;
    if ((bench > .01 && (!isSea || s > -3.5)) || uP[23].w > 0.) {
      vec3 em = lava(P, s, cov, near);
      o = uvec4(floatBitsToUint(LH), floatBitsToUint(cov), floatBitsToUint(near), 1u);
    }
  }
}
`;function Ro(e,t,d,c){const h=new Float32Array(t**c);for(let x=0;x<h.length;x++)h[x]=d();const l=new Int32Array(e),v=new Int32Array(e),m=new Float32Array(e);for(let x=0;x<e;x++){const k=x/e*t,g=Math.floor(k),E=k-g;l[x]=g%t,v[x]=(g+1)%t,m[x]=E*E*(3-2*E)}const N=new Float32Array(e**c);if(c===2)for(let x=0;x<e;x++){const k=l[x]*t,g=v[x]*t,E=m[x];for(let p=0;p<e;p++){const R=h[k+l[p]]+(h[k+v[p]]-h[k+l[p]])*m[p],C=h[g+l[p]]+(h[g+v[p]]-h[g+l[p]])*m[p];N[x*e+p]=R+(C-R)*E}}else{const x=new Float32Array(t*t*e);for(let k=0;k<t;k++)for(let g=0;g<t;g++){const E=(k*t+g)*t,p=(k*t+g)*e;for(let R=0;R<e;R++){const C=h[E+l[R]];x[p+R]=C+(h[E+v[R]]-C)*m[R]}}for(let k=0;k<e;k++){const g=l[k]*t,E=v[k]*t,p=m[k];for(let R=0;R<e;R++){const C=(g+l[R])*e,u=(g+v[R])*e,F=(E+l[R])*e,A=(E+v[R])*e,X=m[R],L=(k*e+R)*e;for(let I=0;I<e;I++){const z=x[C+I]+(x[u+I]-x[C+I])*X,B=x[F+I]+(x[A+I]-x[F+I])*X;N[L+I]=z+(B-z)*p}}}}return N}function Le(e,t,d,c,h){const l=new Float32Array(e**d);c.forEach((N,x)=>{const k=Ro(e,N,t,d);for(let g=0;g<l.length;g++)l[g]+=k[g]*h[x]});let v=1e9,m=-1e9;for(const N of l)N<v&&(v=N),N>m&&(m=N);for(let N=0;N<l.length;N++)l[N]=(l[N]-v)/(m-v);return l}function St(e,t,d){const c=t*t*t,h=new Float32Array(c),l=new Float32Array(c),v=new Float32Array(c);for(let E=0;E<c;E++)h[E]=d(),l[E]=d(),v[E]=d();const m=new Float32Array(e*e*e),N=t/e,x=new Int32Array(e*3),k=new Float32Array(e);for(let E=0;E<e;E++){const p=(E+.5)*N,R=Math.floor(p);k[E]=p-R;for(let C=0;C<3;C++)x[E*3+C]=(R+C-1+t)%t}let g=0;for(let E=0;E<e;E++)for(let p=0;p<e;p++){const R=k[E],C=k[p];for(let u=0;u<e;u++){const F=k[u];let A=9;for(let X=0;X<3;X++){const L=x[E*3+X]*t*t,I=X-1-R;for(let z=0;z<3;z++){const B=L+x[p*3+z]*t,Y=z-1-C;for(let se=0;se<3;se++){const de=B+x[u*3+se],j=se-1-F+h[de],i=Y+l[de],P=I+v[de],D=j*j+i*i+P*P;D<A&&(A=D)}}}m[g++]=1-Math.min(Math.sqrt(A),1)}}return m}const $e=(()=>{const e=new Float32Array(1),t=new Uint32Array(e.buffer);return d=>{e[0]=d;const c=t[0],h=c>>>16&32768,l=(c>>>23&255)-112;return l<=0?h:l>=31?h|31743:h|(l<<10)+((c&8388607)+4096>>>13)}})();function Mo(e){const h=new Float32Array(768);for(let v=0;v<16*16;v++)h[v*3]=.12+.76*e(),h[v*3+1]=.12+.76*e(),h[v*3+2]=e();const l=new Uint16Array(256*256*4);for(let v=0;v<256;v++)for(let m=0;m<256;m++){const N=(m+.5)/16,x=(v+.5)/16,k=Math.floor(N),g=Math.floor(x);let E=9,p=9,R=0,C=0,u=0;for(let A=-2;A<=2;A++)for(let X=-2;X<=2;X++){const L=k+X,I=g+A,z=(I%16+16)%16*16+(L%16+16)%16,B=L+h[z*3]-N,Y=I+h[z*3+1]-x,se=Math.sqrt(B*B+Y*Y);se<E?(p=E,E=se,R=B,C=Y,u=h[z*3+2]):se<p&&(p=se)}const F=(v*256+m)*4;l[F]=$e(R),l[F+1]=$e(C),l[F+2]=$e(p-E),l[F+3]=$e(u)}return l}function No(e){const c=[];let h=6202759;const l=()=>{h=h+1831565813|0;let u=Math.imul(h^h>>>15,1|h);return u=u+Math.imul(u^u>>>7,61|u)^u,((u^u>>>14)>>>0)/4294967296};for(let u=0;u<44;u++){const F=2+Math.pow(l(),1.4)*21,A=(l()-.5)*(l()<.25?2.6:1.3),X=Math.round(F*Math.sin(A)),L=Math.round(F*Math.cos(A)),I=Math.hypot(X,L);I<1.5||c.push([X,L,.035*Math.pow(I/4,-.3)/(6.2832*I),l()*6.2832])}const v=new Float32Array(128*128),m=new Float32Array(128*128),N=new Float32Array(128*128),x=new Float32Array(128),k=new Float32Array(128),g=new Float32Array(128),E=new Float32Array(128);for(const[u,F,A,X]of c){for(let z=0;z<128;z++){const B=6.2832*u*z/128,Y=6.2832*F*z/128+X;x[z]=Math.cos(B),k[z]=Math.sin(B),g[z]=Math.cos(Y),E[z]=Math.sin(Y)}const L=-A*6.2832*u,I=-A*6.2832*F;for(let z=0;z<128;z++)for(let B=0;B<128;B++){const Y=z*128+B,se=x[B]*g[z]-k[B]*E[z],de=k[B]*g[z]+x[B]*E[z];v[Y]+=A*se,m[Y]+=L*de,N[Y]+=I*de}}let p=1e-6;for(let u=0;u<128*128;u++)p=Math.max(p,Math.abs(v[u]));const R=new Uint8Array(128*128*4);for(let u=0;u<128*128;u++)R[u*4]=fe(128+v[u]/p*127,0,255),R[u*4+1]=fe(128+m[u]*300,0,255),R[u*4+2]=fe(128+N[u]*300,0,255),R[u*4+3]=255;const C=e.createTexture();return e.bindTexture(e.TEXTURE_2D,C),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,128,128,0,e.RGBA,e.UNSIGNED_BYTE,R),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),C}function zo(e){if(e.__c587)return e.__c587;e.getExtension("KHR_parallel_shader_compile");const t=(i,P)=>{const D=e.createShader(i);return e.shaderSource(D,P),e.compileShader(D),D},d={riv:qt,sky:ko,bake:yo,vol:Po,comp:Gt,lava:go},c={},h=t(e.VERTEX_SHADER,To);for(const i in d){const P=e.createProgram(),D=t(e.FRAGMENT_SHADER,d[i]);e.attachShader(P,h),e.attachShader(P,D),e.linkProgram(P),c[i]={p:P,v:h,f:D}}e.flush();let l=99538311;const v=()=>{l=l+1831565813|0;let i=Math.imul(l^l>>>15,1|l);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296},m=256,N=[Le(m,v,2,[4,8,16,32],[.45,.28,.17,.1]),Le(m,v,2,[8,16,32],[.5,.3,.2]),Le(m,v,2,[16,32,64],[.5,.3,.2]),Le(m,v,2,[32,64,128],[.45,.35,.2])],x=new Uint8Array(m*m*4);for(let i=0;i<m*m;i++)for(let P=0;P<4;P++)x[i*4+P]=N[P][i]*255;e.pixelStorei(e.UNPACK_ALIGNMENT,1);const k=(i,P,D,$,V)=>{const ke=e.createTexture();return e.bindTexture(e.TEXTURE_2D,ke),e.texImage2D(e.TEXTURE_2D,0,D,m,m,0,i,P,$),V&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,V?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),ke},g=k(e.RGBA,e.UNSIGNED_BYTE,e.RGBA8,x,!0),E=k(e.RGBA,e.HALF_FLOAT,e.RGBA16F,Mo(v),!1),p=32,R=[Le(p,v,3,[2,4,8],[.55,.3,.15]),Le(p,v,3,[2,4,8],[.55,.3,.15]),Le(p,v,3,[4,8,16],[.5,.32,.18])],C=St(p,4,v),u=St(p,8,v),F=new Float32Array(p**3);let A=1e9,X=-1e9;for(let i=0;i<F.length;i++){const P=C[i]*.62+u[i]*.38;F[i]=P,P<A&&(A=P),P>X&&(X=P)}const L=new Uint8Array(p**3*4);for(let i=0;i<F.length;i++)L[i*4]=R[0][i]*255,L[i*4+1]=R[1][i]*255,L[i*4+2]=R[2][i]*255,L[i*4+3]=(F[i]-A)/(X-A)*255;const I=e.createTexture();e.bindTexture(e.TEXTURE_3D,I),e.texImage3D(e.TEXTURE_3D,0,e.RGBA8,p,p,p,0,e.RGBA,e.UNSIGNED_BYTE,L),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const i of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,i,e.REPEAT);e.pixelStorei(e.UNPACK_ALIGNMENT,4);const z=e.createVertexArray(),B=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float")),Y=()=>{for(const i in c){const{p:P,v:D,f:$}=c[i];if(!e.getProgramParameter(P,e.LINK_STATUS))throw new Error("587 "+i+": "+(e.getShaderInfoLog(D)||"")+(e.getShaderInfoLog($)||"")+e.getProgramInfoLog(P));c[i]={p:P,uP:e.getUniformLocation(P,"uP")},e.useProgram(P);const V=(ke,et)=>{const Ae=e.getUniformLocation(P,ke);Ae&&e.uniform1i(Ae,et)};V("uN2",0),V("uNV",1),V("uN3",2),V("uG",3),V("uC",4),V("uB",5),V("uRV",6),V("uSW",7),V("uL",8)}j.link=null},j={startI:()=>{if(j.PI)return;const i=e.createProgram(),P=t(e.FRAGMENT_SHADER,Gt.replace(we,we+`#define INTER
`));e.attachShader(i,h),e.attachShader(i,P),e.linkProgram(i),e.flush(),j.PI={p:i,f:P,ok:!1}},useI:()=>{const i=j.PI;if(!i.ok){if(!e.getProgramParameter(i.p,e.LINK_STATUS))throw new Error("587 compI: "+e.getShaderInfoLog(i.f)+e.getProgramInfoLog(i.p));i.uP=e.getUniformLocation(i.p,"uP"),e.useProgram(i.p);for(const[P,D]of[["uN2",0],["uNV",1],["uG",3],["uC",4],["uB",5],["uRV",6],["uSW",7]]){const $=e.getUniformLocation(i.p,P);$&&e.uniform1i($,D)}i.ok=!0}return i},PI:null,P:c,n2:g,nv:E,n3:I,sw:No(e),d2:x,vEmpty:z,half:B,link:Y,rts:{},pool:{},fin:typeof FinalizationRegistry=="function"?new FinalizationRegistry(i=>i.pool.push(i.o)):null};if(!B){const i=qt.replace("out vec4 oC;","out uvec4 oU;").replace("oC = rivA(q, shoreZ(q.x) - q.y);","vec4 oC = rivA(q, shoreZ(q.x) - q.y); oU = uvec4(packHalf2x16(oC.xy), packHalf2x16(oC.zw), 0u, 0u);");if(i.indexOf("oU = uvec4")<0)throw new Error("587 NH riv");const P=e.createProgram(),D=t(e.FRAGMENT_SHADER,i);e.attachShader(P,h),e.attachShader(P,D),e.linkProgram(P),e.deleteProgram(c.riv.p),e.deleteShader(c.riv.f),c.riv={p:P,v:h,f:D};const $=e.createTexture();e.bindTexture(e.TEXTURE_2D,$),e.texImage2D(e.TEXTURE_2D,0,e.RG32UI,512,512,0,e.RG_INTEGER,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const V=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,V),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,$,0),e.bindFramebuffer(e.FRAMEBUFFER,null),j.ru={tex:$,fb:V,a:new Uint32Array(512*512*4),h:new Uint16Array(512*512*4)}}return e.__c587=j}function Ct(e,t,d,c){const h=e.createTexture();e.bindTexture(e.TEXTURE_2D,h),t.half?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,d,c,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.SRGB8_ALPHA8,d,c,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const l=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,h,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:h,fb:l,w:d,h:c}}function Lo(e,t){const d=e.createTexture();e.bindTexture(e.TEXTURE_2D,d),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16UI,t,t,0,e.RGBA_INTEGER,e.UNSIGNED_SHORT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,d,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:d,fb:c,w:t}}const Xe=e=>e-Math.floor(e),Ao=(e,t)=>{let d=Xe(e*.1031),c=Xe(t*.1031),h=Xe(e*.1031);const l=d*(c+33.33)+c*(h+33.33)+h*(d+33.33);return d+=l,c+=l,h+=l,Xe((d+c)*h)};Ut.add({num:587,name:"Lava Shore",fam:"Vistas",recipe:"A volcanic coast, usually at night, where glowing lava crosses a low shelf and spills into the surf, and the waves blow up into steam that rolls off on the wind. The hour, the swell and where you stand change every mint. Tap the sea to raise a bigger wave that bursts the plume, drag across the shelf to spread a new flow of lava that skins over as it cools, or hold to let the plume die down so the moon and stars clear.",interactive:"Tap the sea to raise a bigger wave out at sea: when it reaches the bench it surges over the lava and the plume bursts. Drag across the bench to spread a new breakout of lava that skins over as it cools. Hold to let the plume fall back so the moon and stars clear.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,d=e.size,c=zo(t);let h=0;for(let o=2;o<66;o+=8)h=(h^parseInt(e.hash.slice(o,o+8),16))>>>0;h=(h^5797255)>>>0;const l=()=>{h=h+1831565813|0;let o=Math.imul(h^h>>>15,1|h);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},v=o=>{let s=0;for(const r in o)s+=o[r];let a=l()*s;for(const r in o)if(a-=o[r],a<=0)return r;return Object.keys(o)[0]};let m=v({"Gibbous moon":40,"Full moon":25,"Crescent moon low":22,"Moonless, Milky Way":13}),N=v({"Trades along the coast":45,"Sea breeze inland":25,"Gusty trades":18,"Dead calm":12}),x=v({"Three rivulets":45,"Two channels":33,"One broad sheet":22}),k=v({"Long swell":50,"Heavy surf":35,"Glassy calm":15}),g=v({"Breakouts on the slope":50,"Vent glow on low cloud":32,"Clear to the summit":18}),E=v({"Black sand cove":60,"Bare rock ledge":40});e.home&&(m="Gibbous moon",N="Trades along the coast",x="Three rivulets",k="Long swell",g="Breakouts on the slope",E="Black sand cove"),e.trait("Wind",N),e.trait("Lava",x),e.trait("Sea",k),e.trait("Upslope",g),e.trait("Shore",E);let p=49722759;for(let o=2;o<66;o+=4)p=Math.imul(p^parseInt(e.hash.slice(o,o+4),16),2246822507)>>>0;const R=()=>{p=p+1831565813|0;let o=Math.imul(p^p>>>15,1|p);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};let u=(o=>{let s=0;for(const r in o)s+=o[r];let a=R()*s;for(const r in o)if(a-=o[r],a<=0)return r;return Object.keys(o)[0]})({"On the old sea cliff":50,"Up on a tumulus":25,"Close to the falls":15,"Far down the coast":10});e.home&&(u="On the old sea cliff");let F=113366407;for(let o=2;o<66;o+=4)F=Math.imul(F^parseInt(e.hash.slice(o,o+4),16),3266489909)>>>0;const A=()=>{F=F+1831565813|0;let o=Math.imul(F^F>>>15,1|F);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},X=o=>{let s=0;for(const r in o)s+=o[r];let a=A()*s;for(const r in o)if(a-=o[r],a<=0)return r;return Object.keys(o)[0]};let L=X({"Moonlit night":44,Dusk:17,"First light":15,"Low cloud lit red":14,Vog:10});const I=A()<.42?X({"Out in the bay":55,"High on the slope":45}):null,z=(A()-.5)*.66,B=A(),Y=[A(),A()],se=A();e.home?L="Moonlit night":I&&(u=I);const de=L==="Dusk"||L==="First light";de&&m!=="Moonless, Milky Way"&&(m=m==="Crescent moon low"?"Young moon in the glow":"Pale moon rising"),de&&m==="Moonless, Milky Way"&&(m="No moon"),e.trait("Hour",L),e.trait("Standpoint",u),e.trait("Moon",m);const j=u==="Up on a tumulus"?[-.6,-1.2,8.5,420]:[0,0,0,1],i=u==="Far down the coast"?1.9:u==="Close to the falls"?.72:1,P=c.d2,D=(o,s,a)=>{const r=o*256-.5,n=s*256-.5,f=Math.floor(r),b=Math.floor(n),_=r-f,q=n-b,U=(H,G)=>P[((G&255)*256+(H&255))*4+a]/255;return(U(f,b)*(1-_)+U(f+1,b)*_)*(1-q)+(U(f,b+1)*(1-_)+U(f+1,b+1)*_)*q},$=l()*7,V=(e.home?44:38+l()*14)*i,ke=(e.home?11:9+l()*5)*Math.sqrt(i),et=(e.home?6:4+l()*4)*Math.sqrt(i),Ae=V*.55+(e.home?0:(l()-.5)*6),Be=(e.home?8:7+l()*3)*Math.sqrt(i),Xt=(e.home?13:10+l()*6)*Math.sqrt(i),Bt=e.home?2.6:2+l()*1.6,_o=e.home?14:11+l()*6,Ot=E==="Black sand cove"?1:0,Fo=o=>D(o*9e-4+$,.21,0)*.75+D((o*9e-4+$)*4.3,.63,1)*.25,Ht=o=>Fo(o)*60+et*Math.exp(-(((o-V)/ke)**2))-Xt*Math.exp(-(((o-Ae)/Be)**2)),Vt=_o-Ht(0),Pe=o=>Vt+Ht(o),O=Ae+Be*(e.home?.85:.7+l()*.3),ne=Pe(O)-.3,xt=Pe(O+.5)-Pe(O-.5),Z=[-xt/Math.hypot(xt,1),1/Math.hypot(xt,1)],_e=x==="One broad sheet"?18:x==="Two channels"?12:14,Oe=(o,s)=>{const a=Pe(o)-s,r=o+(D(o*.0021+.4,s*.0021+.4,1)-.5)*34,n=s+(D(o*.0021+.4,s*.0021+.4,2)-.5)*34,f=D(r*.0042+.13,n*.0042+.13,0)-.5,b=D(r*.013+.57,n*.013+.57,1)-.5,_=(o-O)*.7,q=s-ne,U=Math.exp(-(_*_+q*q)/1200),H=Ot*xe(Be,Be*.4,Math.abs(o-Ae))*xe(15,7,a);let G=.9+.055*Math.min(a,60)+.016*Math.max(a-60,0)+4.5*Math.pow(fe((a-6)/48,0,1),1.6)+xe(1,24,a)*(1-.75*U)*(1-H)*(2.2*f+.8*b);const w=(o-.5*(O+V))/(ke*1.4+Math.abs(V-O)*.5);G+=Bt*xe(.2,2.4,a)*(1-.8*Math.exp(-w*w))*(1-H)*(.85+.3*b),G+=2.4*Math.exp(-((o+2)**2+(s+3)**2)/150)*xe(1,6,a),G+=j[2]*Math.exp(-((o-j[0])**2+(s-j[1])**2)/j[3])*xe(1,6,a);const W=xe(-1.2,2.2,a+b*4);return G=-1.4+.22*Math.max(a,-30)+b*1.5+(G-(-1.4+.22*Math.max(a,-30)+b*1.5))*W,G+(Math.max(.22+.07*a,-2.6)-G)*H};let pt=-1e9;for(let o=0;o<9;o++)pt=Math.max(pt,Oe((o%3-1)*.4,(Math.floor(o/3)-1)*.4));let He=pt+.15+1.7,ee=Math.atan2(O,ne)-(e.home?.2:.12+l()*.16),te=[0,0],vt=u==="Up on a tumulus"?-.05:u==="Close to the falls"?.16:u==="Far down the coast"?.1:.085,Ve=34;if(u==="Out in the bay"){const o=Math.hypot(O,ne);te=[O+Z[0]*62-O/o*26,ne+Z[1]*62-ne/o*26];for(let s=0;s<12&&Pe(te[0])-te[1]>-10;s++)te[0]+=Z[0]*8,te[1]+=Z[1]*8;He=2.1,vt=.07,Ve=27,ee=Math.atan2(O-te[0],ne-te[1])}else if(u==="High on the slope"){te=[O-165,0],te[1]=Pe(te[0])-62,He=Oe(te[0],te[1])+17;const o=O-te[0],s=ne-te[1],a=Math.hypot(o,s);ee=Math.atan2(o,s)-.2,Ve=27,vt=-Math.atan2(He,a)+.36*Math.tan(Ve*Math.PI/180)}e.home||(ee+=z*(u==="High on the slope"?.3:1),Ve*=.86+.3*B);let We=ee-.24+(e.home?0:(l()-.5)*.5),Fe=.45+(e.home?0:(l()-.5)*.2),Ee=.8,Ye=[.78,.87,1],tt=0,De=.55;const Do=m;if(m==="Full moon"&&(Ee=1.1,Fe=.62,De=.35),(m==="Crescent moon low"||m==="Young moon in the glow")&&(Ee=.35,Fe=.14,We=ee-.57+l()*.3,Ye=[1,.8,.6],De=.85),(m==="Moonless, Milky Way"||m==="No moon")&&(Ee=0,tt=1,De=1.1),!e.home&&Ee>0){const o=m==="Crescent moon low"||m==="Young moon in the glow";We=ee+(Y[0]-.5)*(o?.9:1.05),Fe=o?.07+Y[1]*.12:.22+Y[1]*(Do==="Full moon"?.3:.38)}let bt=0,ot=[0,-1,0],Wt=0,at=[0,0,0],st=[0,0,0],Yt=0,jt=35e-5,Zt=1,Kt=2200,nt=.3,Jt=0,Qt=1;if(de){const o=L==="Dusk",s=ee+(se<.5?-1:1)*(.3+.55*Math.abs(se-.5)*2),a=-.05;ot=[Math.sin(s)*Math.cos(a),Math.sin(a),Math.cos(s)*Math.cos(a)],Wt=1,Yt=1,nt=.15,at=o?[.42,.12,.035]:[.3,.16,.11],st=o?[1.2,.5,.32]:[1.1,.62,.55],Ee*=.25,De=o?.1:.03,tt=0,Jt=o?1.4:1.25,Qt=o?.8:.55,m==="Young moon in the glow"&&(We=s+(Y[0]-.5)*.5,Fe=.06+Y[1]*.08)}L==="Vog"&&(Ye=[1,.5,.26],nt=1.2,jt=.0011,De*=.3,tt*=.3),L==="Low cloud lit red"&&(Zt=26,Kt=130,De*=.5,Ee*=.45,nt=.8,bt=5e-4),L==="Vog"&&(bt=8e-4);const wt=[Math.sin(We)*Math.cos(Fe),Math.sin(Fe),Math.cos(We)*Math.cos(Fe)],qe=.35+.65*Math.min(Ee,1.2);let ge=[.0035*qe,.0062*qe,.0125*qe],Re=[.0075*qe+.001,.0085*qe+.001,.012*qe+.0015];m==="Moonless, Milky Way"&&(ge=ge.map(o=>o*.6),Re=Re.map(o=>o*.6)),L==="Dusk"&&(ge=[.006,.011,.03],Re=[.03,.03,.05]),L==="First light"&&(ge=[.016,.026,.055],Re=[.06,.062,.078]),L==="Vog"&&(ge=[.005,.0045,.004],Re=[.016,.011,.0065]);const rt=N==="Sea breeze inland"?[2.2,1.4]:N==="Gusty trades"?[-5.4,2.2]:N==="Dead calm"?[-.25,.2]:[-3,1.7],re=[rt[0]*Math.cos(ee)+rt[1]*Math.sin(ee),-rt[0]*Math.sin(ee)+rt[1]*Math.cos(ee)],$t=Math.hypot(re[0],re[1])||1,oe=[re[0]/$t,re[1]/$t],ct=N==="Dead calm"?[-2.4*Math.cos(ee)+1.1*Math.sin(ee),2.4*Math.sin(ee)+1.1*Math.cos(ee)]:[0,0],eo=Math.hypot(O,ne),to=[O/eo,ne/eo],pe=[Z[1],-Z[0]],S=[O+Z[0]*3+to[0],ne+Z[1]*3+to[1]],je=_e*.55+2,oo=k==="Heavy surf"?8.2:k==="Glassy calm"?12:10,lt=k==="Heavy surf"?1.5:k==="Glassy calm"?.5:1,Uo=x==="One broad sheet"?380:320,Io=Math.PI+.45+(l()-.5)*.5,qo=Math.PI+.8+(l()-.5)*.4,Go=g==="Breakouts on the slope"?1:g==="Vent glow on low cloud"?.55:.3,So=L==="Low cloud lit red"?1.9:g==="Vent glow on low cloud"?1:g==="Clear to the summit"?0:.45,Co=g==="Vent glow on low cloud"?2.2:g==="Clear to the summit"?.5:1,Ge=x==="Three rivulets"?3:x==="Two channels"?2:1,me=[];for(let o=0;o<3;o++){const s=Ge===1?0:(o-(Ge-1)/2)*(_e/Ge)*1.2+(l()-.5)*2,a=Ge===1?6.5:Ge===2?2.1+l()*.7:1.5+l()*.8;me.push([s,1.2+l()*2.2,.08+l()*.1,a,l()*6.28,24+l()*18])}const K=new Float32Array(It*4),T=(o,s,a,r,n)=>{K[o*4]=s,K[o*4+1]=a,K[o*4+2]=r,K[o*4+3]=n},Ze=d>400?272:Math.max(2,Math.round(d*.6/2)*2),Xo=c.half?1:.5,ao=c.pool[d]||(c.pool[d]=[]),Ue=ao.pop()||{g:Lo(t,d),c:Ct(t,c,Ze,Ze)},Et=Ue.g,so=Ue.c,it=Ue.r||(Ue.r=Ct(t,c,512,512));let Te=O-24,ye=ne-36;const ve=30,Tt=Ue.b||(Ue.b=t.createTexture());t.bindTexture(t.TEXTURE_2D,Tt);const ft=new Uint8Array(y*y*4);t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,y,y,0,t.RGBA,t.UNSIGNED_BYTE,ft),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);let ie=0,be=0,Me=0,yt=0,Ke=!1,Je=!1,kt=0,ht=0,Pt=0,ut=null,ce=null,J=null,gt=!1,Rt=0,Mt=!1;const M={eye:[0,He,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0],key:""},Nt=Math.tan(Ve*Math.PI/180),no=()=>{const o=e.view||wo,s=ee+(o.yaw||0),a=fe(vt+(o.pitch||0),-1.35,1.35),r=fe(o.x||0,-4,4),n=fe(o.y||0,-1,2),f=fe(o.z||0,-4,4),b=Math.cos(a);M.fw=[Math.sin(s)*b,Math.sin(a),Math.cos(s)*b];const _=Math.hypot(M.fw[2],M.fw[0])||1;M.rt=[M.fw[2]/_,0,-M.fw[0]/_];const q=M.fw,U=M.rt;M.up=[q[1]*U[2]-q[2]*U[1],q[2]*U[0]-q[0]*U[2],q[0]*U[1]-q[1]*U[0]],M.eye=[te[0]+r,He+n,te[1]+f];const H=[s,a,r,n,f].map(w=>w.toFixed(5)).join(),G=H!==M.key;return M.key=H,G},ro=(o,s)=>{const a=(o*2-1)*Nt,r=((1-s)*2-1)*Nt,n=[0,1,2].map(b=>M.fw[b]+a*M.rt[b]+r*M.up[b]),f=Math.hypot(n[0],n[1],n[2]);return n.map(b=>b/f)},Se=[];for(let o=0;o<Eo-2;o++)Se.push({on:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,r:0,age:0,life:1,str:0});const zt=(o,s,a,r)=>{let n=Se.find(f=>!f.on);if(!n){n=Se[0];for(const f of Se)f.age/f.life>n.age/n.life&&(n=f)}if(n.on=!0,n.age=0,n.life=38+l()*26,n.str=o,a===void 0){const f=(l()+l()-1)*je,b=l()*2.5,_=l()*l()*7;n.x=S[0]+pe[0]*f+oe[0]*b+Z[0]*_,n.z=S[1]+pe[1]*f+oe[1]*b+Z[1]*_}else n.x=a+(l()-.5)*3,n.z=r+(l()-.5)*3;n.y=2+l()*2,n.vy=(3.5+5*l())*(.6+.5*o),n.vx=re[0]*.2+(l()-.5)*s,n.vz=re[1]*.2+(l()-.5)*s,n.r=(2.6+3*l())*(.75+.3*o)},Bo=o=>{for(const s of Se){if(!s.on)continue;const a=.45+.55*Math.min(Math.max(s.y,0)/50,1.6),r=xe(10,70,s.y);s.vx+=(re[0]*a+ct[0]*r-s.vx)*o/6,s.vz+=(re[1]*a+ct[1]*r-s.vz)*o/6;const n=.8+2.2*Math.exp(-s.age/16)*s.str;s.vy+=(n-s.vy)*o/3.5,s.x+=s.vx*o,s.y+=s.vy*o,s.z+=s.vz*o,s.r+=o*(.2+.026*s.r+.1*Math.abs(s.vy-n)),s.age+=o,(s.age>s.life||s.y>320)&&(s.on=!1)}},Oo=(o,s)=>s/oo+(D(o*.0023,.13,0)-.5)*1.6,Ho=o=>{const s=Ao(o,3.7);return lt*(.55+.7*s*s+(Xe(o*.37+.2)<.18?.5:0))},co=(o,s)=>{const a=s?5:1+Math.round(o*1.4);for(let r=0;r<a;r++)zt(s?1.6:.7+.5*o,s?6:1.5);Me=Math.max(Me,s?1.4:.35*o),yt=s?1:.35},lo=(o,s)=>{for(ht+=o;ht>=.1;){ht-=.1;const a=ie-ht;be<.3&&(Pt-=.1,Pt<=0&&(zt(.55+.3*l(),1.2),Pt=1.5+l()*1.7));const r=Oo(O,a),n=Math.floor(r);if(ut===null&&(ut=n),n!==ut){ut=n;const f=Ho(n);be<.5&&f>lt*.8&&co(f-lt*.5,!1),s&&(e.sound.hit("noise",Math.min(.3,.14*f),{cutoff:420,dur:1.8}),e.sound.hit("noise",.07*f,{cutoff:5200,dur:1}))}ce&&!ce.hit&&a>=ce.t&&(ce.hit=!0,co(2,!0),s&&(e.sound.hit("kick",.55),e.sound.hit("noise",.5,{cutoff:300,dur:2.6}),e.sound.hit("noise",.22,{cutoff:6500,dur:1.6}))),Bo(.1)}},le=[S[0]+oe[0]*9,21,S[1]+oe[1]*9];{let o=re[0]*.6,s=re[1]*.6,a=4,r=6;for(let n=0;n<900&&le[1]<75;n++){const f=.45+.55*Math.min(le[1]/50,1.6),b=xe(10,70,le[1]);o+=(re[0]*f+ct[0]*b-o)*.1/6,s+=(re[1]*f+ct[1]*b-s)*.1/6,a+=(.8+1.76*Math.exp(-r/16)-a)*.1/3.5,le[0]+=o*.1,le[1]+=a*.1,le[2]+=s*.1,r+=.1}}ie=-90;for(let o=0;o<900;o++)ie+=.1,lo(.1,!1);ie=0;const Ne=ve/y,Lt=new Float32Array(y*y),At=new Uint8Array(y*y),ae=new Float32Array(y*y),Q=new Float32Array(y*y),Qe=new Float32Array(y*y),dt=new Float32Array(y*y),io=(o,s)=>{Te=o-ve/2,ye=s-ve/2;for(let a=0;a<y;a++)for(let r=0;r<y;r++){const n=Te+(r+.5)*Ne,f=ye+(a+.5)*Ne,b=Pe(n)-f;Lt[a*y+r]=Oe(n,f)+(D(n*.05,f*.05,2)-.5)*.35+(D(n*.21,f*.21,3)-.5)*.12,At[a*y+r]=b<-.3?1:0}ae.fill(0),Q.fill(0)};let Ce=0,_t=0,Ft=0,mt=0,fo=0,ho=0;const Vo=o=>{Qe.fill(0),dt.fill(0);let s=!1;for(let a=0;a<y;a++)for(let r=0;r<y;r++){const n=a*y+r,f=ae[n];if(f<.004)continue;s=!0;const b=Lt[n]+f,_=1.4*o*Q[n]*Q[n]*Q[n];if(_<1e-5)continue;let q=0;const U=[r>0?n-1:-1,r<y-1?n+1:-1,a>0?n-y:-1,a<y-1?n+y:-1],H=[0,0,0,0];for(let w=0;w<4;w++){const W=U[w];if(W<0)continue;const he=b-Lt[W]-ae[W];he>0&&(H[w]=_*he,q+=H[w])}if(q<=0)continue;const G=Math.min(1,f*.45/q);for(let w=0;w<4;w++)if(H[w]>0){const W=H[w]*G;Qe[U[w]]+=W,dt[U[w]]+=W*Q[n],Qe[n]-=W,dt[n]-=W*Q[n]}}Ce=0,_t=0,Ft=0;for(let a=0;a<y*y;a++){if(Qe[a]!==0){const r=ae[a]+Qe[a];Q[a]=r>1e-5?fe((Q[a]*ae[a]+dt[a])/r,0,1):0,ae[a]=Math.max(r,0)}if(ae[a]>.002){if(At[a]){mt+=ae[a]*Q[a],fo=Te+(a%y+.5)*Ne,ho=ye+(Math.floor(a/y)+.5)*Ne,ae[a]=0,Q[a]=0;continue}Q[a]=Math.max(0,Q[a]-o*(.004+.005/(ae[a]+.05)));const r=Q[a]**4*Math.min(ae[a],.3);Ce+=r,_t+=r*(a%y),Ft+=r*Math.floor(a/y)}}return s},Wo=(o,s,a)=>{const r=(o-Te)/Ne,n=(s-ye)/Ne;for(let f=Math.floor(n-4);f<=n+4;f++)for(let b=Math.floor(r-4);b<=r+4;b++){if(b<0||f<0||b>=y||f>=y)continue;const _=f*y+b,q=Math.exp(-((b-r)**2+(f-n)**2)/5);if(At[_])continue;const U=3*a*q;Q[_]=(Q[_]*ae[_]+U)/(ae[_]+U),ae[_]+=U}Ke=!0,Je=!0},Yo=(o,s)=>{const a=ro(o,s);if(a[1]>-.005)return null;let r=.5,n=.5;for(let f=0;f<90&&r<160;f++){const b=M.eye[0]+a[0]*r,_=M.eye[2]+a[2]*r,q=M.eye[1]+a[1]*r,U=Oe(b,_)+.35;if(q<Math.max(U,0)){let H=n,G=r;for(let he=0;he<8;he++){const ue=(H+G)/2;M.eye[1]+a[1]*ue<Math.max(Oe(M.eye[0]+a[0]*ue,M.eye[2]+a[2]*ue)+.35,0)?G=ue:H=ue}const w=M.eye[0]+a[0]*G,W=M.eye[2]+a[2]*G;return Pe(w)-W>.5?[w,W]:null}n=r,r+=Math.max((q-Math.max(U,0))*.5,.15+r*.02)}return null},Dt=()=>{T(0,ie,be,Jt||1.9*(Ee>0?1:1.5),Xo),T(1,wt[0],wt[1],wt[2],Ee),T(2,M.eye[0],M.eye[1],M.eye[2],Nt),T(3,M.fw[0],M.fw[1],M.fw[2],d),T(4,M.rt[0],M.rt[1],M.rt[2],Ze),T(5,M.up[0],M.up[1],M.up[2],K[5*4+3]);const o=1+.06*Math.sin(ie*3.1)+.04*Math.sin(ie*7.3+1)+.03*Math.sin(ie*13.7);T(6,O,.5,ne,Uo*o*(1+Me)*(1-.3*yt)),T(7,re[0],re[1],(1-.85*be)*(N==="Gusty trades"?.8:1),7.5);let s=1e9,a=1e9,r=1e9,n=-1e9,f=-1e9,b=-1e9;const _=(w,W,he,ue,ze)=>{T(24+w,W,he,ue,ze),ze>0&&(s=Math.min(s,W-ze),a=Math.min(a,he-ze),r=Math.min(r,ue-ze),n=Math.max(n,W+ze),f=Math.max(f,he+ze),b=Math.max(b,ue+ze))},q=(1-.6*be)*(1+.5*Me);_(0,S[0]-pe[0]*je*.6,.8,S[1]-pe[1]*je*.6,(2.1+.4*Math.sin(ie*.7))*q),_(1,S[0]+pe[0]*je,.8,S[1]+pe[1]*je,(2.5+.5*Math.sin(ie*.53+2))*q);const U=(1-.8*be)*(1+.3*Me),H=[S[0]+oe[0]*9,S[1]+oe[1]*9];T(45,S[0],2.2,S[1],2.4*U),T(46,H[0],21,H[1],4.8*U),T(56,le[0],le[1],le[2],12*U),s=Math.min(s,le[0]-13),n=Math.max(n,le[0]+13),r=Math.min(r,le[2]-13),b=Math.max(b,le[2]+13),f=Math.max(f,27,le[1]+13),s=Math.min(s,H[0]-6,S[0]-3),n=Math.max(n,H[0]+6,S[0]+3),r=Math.min(r,H[1]-6,S[1]-3),b=Math.max(b,H[1]+6,S[1]+3),T(49,S[0],.9,S[1],2.3*q),T(50,S[0]+Z[0]*9+oe[0]*2,.9,S[1]+Z[1]*9+oe[1]*2,1.7*q),s=Math.min(s,S[0]+Z[0]*9+oe[0]*2-2.5),n=Math.max(n,S[0]+Z[0]*9+oe[0]*2+2.5),r=Math.min(r,S[1]+Z[1]*9+oe[1]*2-2.5),b=Math.max(b,S[1]+Z[1]*9+oe[1]*2+2.5),T(47,O-pe[0]*_e*.5,.6,ne-pe[1]*_e*.5,0),T(48,O+pe[0]*_e*.5,.6,ne+pe[1]*_e*.5,0),Se.forEach((w,W)=>{if(!w.on){T(26+W,0,-500,0,-100);return}const he=w.r*Math.min(1,w.age/1.5+.25)*(1-xe(w.life-14,w.life,w.age))*(1-.15*be);_(2+W,w.x,w.y,w.z,he*1.45);const ue=(w.x*oe[0]+w.z*oe[1])*.3;T(26+W,w.x-oe[0]*ue,w.y,w.z-oe[1]*ue,he)});const G=9;T(8,s-G,Math.max(a-G,-3),r-G,K[8*4+3]),T(9,n+G,f+G,b+G,K[9*4+3]),T(10,ce?ce.x:0,ce?ce.t:-1e3,ce?1:0,u==="High on the slope"?1:0),T(11,Te+(_t/(Ce||1)+.5)*Ne,ye+(Ft/(Ce||1)+.5)*Ne,Math.min(Ce*2.2,18),mo),T(12,Ae,Ot,Be,_e),T(13,oo,lt,32,Xt),T(14,$,Vt,ke,et);for(let w=0;w<3;w++)T(15+w,me[w][0],me[w][1],me[w][2],me[w][3]);T(18,me[0][4],me[1][4],me[2][4],.45),T(19,me[0][5],me[1][5],me[2][5],Ge),T(20,ge[0],ge[1],ge[2],De),T(21,Re[0],Re[1],Re[2],tt),T(22,Ye[0],Ye[1],Ye[2],1.6*(1-.7*be)*(1+.5*Me)),T(23,Te,ye,ve,Ke?1:0),T(40,Io,qo,Go*Co,So),T(41,1,.4,.12,1.5),T(42,.16,Bt,$*3.1,Math.PI+.5+$*.1),T(43,Qt,1,1,Math.min(Me,1.5)),T(44,Z[0],Z[1],V,uo),T(51,j[0],j[1],j[2],j[3]),T(52,ot[0],ot[1],ot[2],Wt),T(53,at[0],at[1],at[2],jt),T(54,Zt,Kt,nt,bt),T(55,st[0],st[1],st[2],Yt)};let uo=0,mo=0;const jo=()=>{if(t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,c.ru?c.ru.fb:it.fb),t.viewport(0,0,512,512),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.useProgram(c.P.riv.p),t.uniform4fv(c.P.riv.uP,K),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c.n2),t.bindVertexArray(c.vEmpty),t.drawArrays(t.TRIANGLES,0,3),c.ru){const o=c.ru.a,s=c.ru.h;t.readPixels(0,0,512,512,t.RGBA_INTEGER,t.UNSIGNED_INT,o);for(let a=0;a<o.length;a+=4)s[a]=o[a]&65535,s[a+1]=o[a]>>>16,s[a+2]=o[a+1]&65535,s[a+3]=o[a+1]>>>16;t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,it.tex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,512,512,0,t.RGBA,t.HALF_FLOAT,s)}},xo=()=>{uo=K[44*4+3]=K[0],mo=K[11*4+3]=K[6*4+3],t.bindFramebuffer(t.FRAMEBUFFER,Et.fb),t.viewport(0,0,d,d),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c.n2),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,c.nv),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,it.tex),t.bindVertexArray(c.vEmpty);for(const o of["sky","bake"])t.useProgram(c.P[o].p),t.uniform4fv(c.P[o].uP,K),t.drawArrays(t.TRIANGLES,0,3)},po=o=>{K[8*4+3]=0,K[9*4+3]=o?1:0,t.bindFramebuffer(t.FRAMEBUFFER,so.fb),t.viewport(0,0,Ze,Ze),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.useProgram(c.P.vol.p),t.uniform4fv(c.P.vol.uP,K),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c.n2),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,c.nv),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_3D,c.n3),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Et.tex),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.bindVertexArray(c.vEmpty),t.drawArrays(t.TRIANGLES,0,3)},vo=()=>{t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,d,d),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,c.n2),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,c.nv),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Et.tex),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,so.tex),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,Tt),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,it.tex),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,c.sw),t.bindVertexArray(c.vEmpty);const o=Ke||ce?c.useI():c.P.comp;if(o===c.P.comp){if(t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,null),!c.lt||c.lt.w<d){c.lt&&(t.deleteTexture(c.lt.tex),t.deleteFramebuffer(c.lt.fb));const a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32UI,d,d,0,t.RGBA_INTEGER,t.UNSIGNED_INT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST);const r=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),c.lt={tex:a,fb:r,w:d}}t.bindFramebuffer(t.FRAMEBUFFER,c.lt.fb),t.viewport(0,0,d,d);const s=c.P.lava;t.useProgram(s.p),t.uniform4fv(s.uP,K),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,d,d),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,c.lt.tex)}t.useProgram(o.p),t.uniform4fv(o.uP,K),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)},Zo=(o,s)=>{const a=ro(o,s);let r;if(a[1]<-.004){const n=Math.min(M.eye[1]/-a[1],400);r=M.eye[0]+a[0]*n}else r=M.eye[0]+a[0]/Math.max(Math.abs(a[2]),.25)*70;ce={x:fe(r,O-120,O+120),t:ie+3.2,hit:!1},e.sound.hit("noise",.16,{cutoff:650,dur:3})},Ko=o=>{const s=e.input;if(s.down&&s.inside!==!1){if(J||(J={x0:s.x,y0:s.y,t:0,moved:0}),J.t+=o,J.moved=Math.max(J.moved,Math.hypot(s.x-J.x0,s.y-J.y0)),J.moved>.025){const n=Yo(s.x,s.y);n&&!Je&&!Ke&&io(n[0],n[1]),n&&!Je&&Ke&&(Math.abs(n[0]-Te-ve/2)>ve*.35||Math.abs(n[1]-ye-ve/2)>ve*.35)&&io(n[0],n[1]),n&&n[0]>Te+1&&n[0]<Te+ve-1&&n[1]>ye+1&&n[1]<ye+ve-1&&(Wo(n[0],n[1],o),Rt-=o,Rt<=0&&(e.sound.hit("click",.12+l()*.1),Rt=.07+l()*.2))}}else J&&(gt=J.t>.3||J.moved>.025,J=null);const a=s.taps(),r=J&&(J.t>.3||J.moved>.025);a.length&&!gt&&!r&&Zo(a[a.length-1].x,a[a.length-1].y),a.length&&(gt=!1)},bo=(o,s)=>{s=Math.min(Math.max(s||0,0),.25),ie=o,no()&&(Dt(),xo()),Ko(s);const a=e.input.down&&J&&J.moved<.025&&J.t>.35;if(be=fe(be+(a?s/11:-s/15),0,1),a&&!Mt&&(e.sound.note(38,{dur:3,vel:.12,wave:"sine"}),Mt=!0),a||(Mt=!1),Me*=Math.exp(-s*1.4),yt*=Math.exp(-s*.6),lo(s,!0),Je){kt+=s;let r=!1;for(;kt>=.1;)kt-=.1,Vo(.1),r=!0;if(mt>.05&&(e.sound.hit("hat",Math.min(.2,mt)),zt(.6,1,fo,ho),mt=0),r){let n=!1;for(let f=0;f<y*y;f++)ft[f*4]=Math.min(255,ae[f]/.5*255),ft[f*4+1]=Q[f]*255,ae[f]>.004&&Q[f]>.03&&(n=!0);t.bindTexture(t.TEXTURE_2D,Tt),t.texSubImage2D(t.TEXTURE_2D,0,0,0,y,y,t.RGBA,t.UNSIGNED_BYTE,ft),!n&&!e.input.down&&(Je=!1,Ce=0)}}ce&&ie>ce.t+14&&(ce=null),(e.input.inside||e.input.down)&&c.startI(),Dt(),po(!0),vo()};return c.link&&c.link(),no(),Dt(),jo(),xo(),po(!0),vo(),c.fin&&c.fin.register(bo,{pool:ao,o:Ue}),bo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
