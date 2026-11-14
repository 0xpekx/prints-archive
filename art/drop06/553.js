// Savanna Storm: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/553.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(no){no&&function(){"use strict";const Xo={yaw:0,pitch:0,x:0,y:0,z:0},qt=(t,o,U)=>t<o?o:t>U?U:t,Te=700,co=1600,Go=48,zt=16,Dt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,te=52,Zt=`
uniform vec4 uP[${te}];
uniform sampler2D uN2;
#define TIME uP[0].x
#define WIND uP[0].z
#define SUN uP[1].xyz
#define EYE uP[3].xyz
#define ENC uP[21].w
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 skyCol(vec3 d) {
  vec3 L = SUN;
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), lh = normalize(L.xz + vec2(1e-6, 0.));
  float ca = clamp(dot(dh, lh) * .5 + .5, 0., 1.);
  float cs = max(dot(d, L), 0.);
  vec3 hor = mix(uP[18].rgb, uP[17].rgb, pow(ca, 1.4));
  vec3 c = mix(hor, uP[16].rgb, smoothstep(0., .42, pow(e, .8)));
  c = mix(c, uP[15].rgb, smoothstep(.25, 1., e));
  float anti = 1. - ca;
  c = mix(c, uP[16].rgb * vec3(.7, .75, 1.05), anti * anti * exp(-e / .03) * .55);
  c += uP[18].rgb * vec3(1., .75, .85) * anti * anti * exp(-pow((e - .07) / .05, 2.)) * .35;
  c += uP[17].rgb * .45 * exp(-e / .03) * (.35 + .65 * ca);
  c += uP[19].rgb * uP[19].w * (pow(cs, 14.) * .5 + pow(cs, 4.) * .08) * exp(-e * 3.);
  return c;
}
vec3 rainFog() { return uP[20].rgb * 1.3 + uP[21].rgb * .5; }
vec3 sunAt(float h) {
  float hs = uP[15].w;
  return uP[19].rgb * mix(uP[45].z, 1., smoothstep(hs - .4, hs + 4., h)) * mix(vec3(1., .78, .62), vec3(1.), smoothstep(hs - .8, hs + 5., h));
}
float gustAt(vec2 xz) {
  vec2 a = xz - uP[22].xy * WIND * TIME * .85;
  float g = textureLod(uN2, a * .0105, 0.).r * .62 + textureLod(uN2, a * .034 + .43, 0.).b * .38;
  return smoothstep(.32, .76, g);
}
// the wind in the grass: rolling gusts, plus the gust front a drag sends across the plain
vec2 bendAt(vec2 xz, out float g) {
  g = gustAt(xz);
  vec2 b = uP[22].xy * (WIND / 21.) * (.3 + 1.05 * g);
  vec4 F = uP[23];
  if (F.z > 0.) {
    vec2 fd = vec2(cos(F.x), sin(F.x));
    vec2 q = xz - uP[22].zw;
    float al = dot(q, fd), ac = dot(q, vec2(-fd.y, fd.x));
    float x = al - F.w * (TIME - F.y);
    float w = F.z * (exp(-x * x / 30.) + .35 * exp(-max(-x, 0.) / 14.) * step(x, 0.)) * exp(-ac * ac / 3600.) * step(-8., al);
    b += fd * w * 1.25; g += w * .7;
  }
  return b;
}
`,pe=Dt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., .999999, 1.); }",Vo=Dt+Zt+`
uniform sampler3D uN3;
out vec4 oC;
vec4 n3(vec3 p) { return textureLod(uN3, p, 0.); }
// the rain under it: soft uneven veils, brighter and darker shafts drifting through, swept by the outflow near the ground
vec2 gV = vec2(0., 1.);   // the ray's heading: shafts are stretched along it, so a ray runs down a shaft or down a gap
float rainD(vec3 p) {
  float hR = uP[11].z;
  vec2 rax = uP[11].xy;
  float sw = .1 * (hR - p.y) + .9 * exp(-max(p.y, 0.) / .45) + .25 * sin(p.y * .9 + TIME * .05);
  vec2 rq0 = p.xz - uP[10].xy - rax * sw;
  vec2 lq = vec2(dot(rq0, rax), dot(rq0, vec2(-rax.y, rax.x))) / uP[10].zw;
  float re = length(lq);
  float sh2 = textureLod(uN2, rq0 * .07 + .17, 0.).r;
  vec2 vq = vec2(dot(rq0, vec2(gV.y, -gV.x)), dot(rq0, gV) * .3);
  vec4 sa = n3(vec3(vq.x * .11, p.y * .06 - TIME * .006, vq.y * .11) + .41);
  float st = n3(vec3(rq0.x * .3, p.y * .045 - TIME * .01, rq0.y * .3) + .13).b;
  // shafts come and go in separate bundles (a broad channel of the same read), with pale gaps between
  float lw = smoothstep(.45, .62, sa.b);
  // each shaft frays at its sides into separate streaks (fine strands along the fall; the dense core is untouched)
  vec2 rqS = p.xz - uP[10].xy - rax * .1 * (hR - p.y);   // the strands slant with the wind but do not curl at the foot
  float fr = textureLod(uN2, vec2(dot(rqS, vec2(gV.y, -gV.x)) * .065, p.y * .004 + dot(rqS, gV) * .003) + .29, 0.).a - .5;
  float edge = 1. - re + (sh2 - .5) * 1.1 + (sa.g - .5) * .5 + fr * .2;
  float shaft = smoothstep(.4, .66, sa.r * .75 + st * .25 + fr * .24) * mix(1., .55 + 1.2 * lw, uP[48].w);
  float dr = smoothstep(0., .8, edge) * (uP[45].x + 1.35 * shaft) * (.72 + .56 * st) * 1.25;
  dr *= (1. - smoothstep(hR - .1, hR + .6, p.y)) * smoothstep(.03, .14, abs((dot(rq0, rax) + uP[10].z * .7) / (uP[10].z * 1.4) - uP[31].w));
  // the bow's veil: thin sunlit rain from the anvil's forward underside over the shafts, gone where it turns to ice
  float vt = uP[24].x;
  float vl = uP[24].y * smoothstep(-.3, .4, edge) * (.35 + 1.3 * st) * (1. - smoothstep(vt - .5, vt + .5, p.y)) * step(.1, vt);
  return (dr * (.55 + .45 * smoothstep(0., .6, p.y)) + vl) * uP[11].w;
}
float segD(vec3 p, vec3 a, vec3 b) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.); return length(pa - ba * h); }
void main() {
  vec2 fc = vec2(gl_FragCoord.x, floor(gl_FragCoord.y) * 2. + uP[28].z + .5);
  vec2 uv = fc / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE * .001;
  vec3 dd = d; dd.y = max(dd.y, .0006); dd = normalize(dd);
  float tG = d.y < 0. ? o.y / -d.y : 1e9;
  vec3 L = SUN;
  float cosT = dot(dd, L);
  // the rainbow: the real scattering angle about the antisolar point
  float bowA = acos(clamp(-cosT, -1., 1.)) * 57.29578;
  // primary red outermost (42.3) to violet (40.4); the secondary twice as wide, red inside, about two fifths as bright
  vec3 bow = vec3(exp(-pow((bowA - 42.2) / .5, 2.)), exp(-pow((bowA - 41.3) / .5, 2.)) * 1.15, exp(-pow((bowA - 40.5) / .55, 2.)) * 1.5) * 1.3
    + vec3(exp(-pow((bowA - 50.3) / .9, 2.)), exp(-pow((bowA - 51.3) / .9, 2.)) * 1.1, exp(-pow((bowA - 52.3) / .9, 2.)) * 1.35) * .3 * uP[20].w
    + vec3(.15, .14, .15) * smoothstep(40.6, 34., bowA);
  bow += uP[13].w * (vec3(.45, .2, .4) * exp(-pow((bowA - 39.6) / .3, 2.)) + vec3(.15, .4, .25) * exp(-pow((bowA - 38.9) / .3, 2.)));
  float alex = smoothstep(42.6, 43.6, bowA) * smoothstep(50.2, 49.2, bowA);
  // the sunlit rain's own glow: bright inside the primary, darkest in Alexander's band, a little lighter outside the secondary
  float bwS = min(uP[13].z, 1.);
  vec3 phB = vec3(mix(.11, mix(.11, .075, smoothstep(50.5, 53., bowA)) * (1. - .85 * alex), bwS)), bowC = bow * min(uP[13].z, 1.2) * 1.7;
  vec3 haze = skyCol(normalize(vec3(dd.x, .02, dd.z))) * .7;
  vec2 lh = normalize(L.xz + vec2(1e-6, 0.));
  float hb = uP[2].z;
  float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))) + uP[29].x);
  vec3 fl0 = uP[26].rgb * uP[7].w;
  // 1: the rain, in front of the cloud it hangs under: a short stratified integration through its footprint
  vec3 ER = vec3(0.); float TR = 1.;
  {
    vec2 rax = uP[11].xy, rpx = vec2(-rax.y, rax.x);
    vec2 sm = uP[10].zw * 1.45;
    vec2 q0 = o.xz - uP[10].xy;
    vec2 lq = vec2(dot(q0, rax), dot(q0, rpx)) / sm, ld = vec2(dot(dd.xz, rax), dot(dd.xz, rpx)) / sm;
    float ea = dot(ld, ld), eb = dot(lq, ld), ec = dot(lq, lq) - 1., ed = eb * eb - ea * ec;
    float r0 = 0., r1 = -1.;
    float rTop = uP[24].x > .1 ? uP[24].x + .5 : uP[11].z + .6;
    if (ed > 0.) { float sq = sqrt(ed); r0 = max((-eb - sq) / ea, 0.); r1 = min(min((-eb + sq) / ea, (rTop - o.y) / dd.y), tG); }
    gV = normalize(dd.xz + vec2(1e-6, 0.));
    // the bow's light: the sun's colour of the hour (a little whiter at Last hour so its blue stands), no second tint
    vec3 sunB = mix(uP[19].rgb, vec3(dot(uP[19].rgb, vec3(.3333))), .4 * smoothstep(1.2, .6, uP[15].w));
    float ex = r0 > 0. ? 1. : 1.8;
    vec2 ld2 = vec2(dot(lh, rax), dot(lh, rpx)) / uP[10].zw;
    vec3 ambR = uP[20].rgb * .8 + uP[21].rgb * .5;
    float u1 = pow(0. / 20., ex);
    int NR = int(uP[46].w);
    for (int i = 0; i < NR; i++) {
      if (!(r1 > r0)) break;
      float u0 = u1, uj = pow((float(i) + jit) / 20., ex);
      u1 = pow((float(i) + 1.) / 20., ex);
      float tr = r0 + (r1 - r0) * uj, dl = (r1 - r0) * (u1 - u0);
      vec3 p = o + dd * tr;
      vec2 rq = p.xz - uP[10].xy;
      vec2 lq2 = vec2(dot(rq, rax), dot(rq, rpx)) / uP[10].zw;
      float sg = 1.1 * rainD(p);
      if (sg > .002) {
        // the sun's way out through the rain toward the west, and the tower's shade
        float fa = dot(ld2, ld2), fb = dot(lq2, ld2), fd = fb * fb - fa * (dot(lq2, lq2) - 1.);
        float chR = fd > 0. ? max((-fb + sqrt(fd)) / fa, 0.) : 0.;
        vec2 q = p.xz - uP[2].xy;
        float bq = dot(q, lh), dq = bq * bq - (dot(q, q) - uP[2].w * uP[2].w);
        float chord = dq > 0. ? max(0., -bq + sqrt(dq) - max(-bq - sqrt(dq), 0.)) : 0.;
        // above the base only the thin veil stands between the sun and the drop
        float sx = exp(-chR * mix(.9, .06, smoothstep(uP[11].z - .1, uP[11].z + .5, p.y)) - chord * 1.5);
        vec3 fl = fl0 / (1. + pow(segD(p, uP[7].xyz, uP[8].xyz) * 1.3, 2.));
        vec3 rl = vec3(.58, .64, .74) * (ambR * .75 + fl * .6) + (sunAt(p.y) * phB + sunB * bowC * smoothstep(uP[45].w + .1, uP[45].w - .5, p.y)) * sx * .55;
        float Ts = exp(-sg * dl);
        ER += TR * (1. - Ts) * mix(haze, rl, exp(-tr * uP[24].z));
        TR *= Ts;
      }
    }
  }
  vec4 r = vec4(ER * ENC, TR);
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.r < 6e4 && r.g < 6e4 && r.b < 6e4 && r.a >= 0. && r.a <= 1.01 ? r : vec4(0., 0., 0., 1.);
}
`,Oo=Dt+Zt+`
uniform sampler3D uN3;
uniform sampler2D uC;
out vec4 oC;
vec4 n3(vec3 p) { return textureLod(uN3, p, 0.); }
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(1. + g2 - 2. * g * c, 1.5); }
#define LOBE(i) f = max(f, uP[i].w - length(p - uP[i].xyz));
float gDepth = 0., gSk = 1., gGap = -9., gFlat = 0.;   // the last two read once in main(), outside the march
vec3 gAmb = vec3(0.);
// x cloud (0..1), y rain (0..1), z 0, w distance estimate (km)
vec4 field(vec3 p, int k) {
  bool full = k == 0, fine = k < 2;
  float hb = uP[2].z;
  float f = -1e3;
  LOBE(32) LOBE(33) LOBE(34) LOBE(35) LOBE(36) LOBE(37) LOBE(38) LOBE(39) LOBE(40) LOBE(41) LOBE(42) LOBE(43)
  // the shelf: one low slab along the rain's axis grown out of the tower's foot; billowed on top, clipped and lowered below
  vec2 sA = uP[47].xy, sB = uP[47].zw - sA, sQ = p.xz - sA;
  float sH = clamp(dot(sQ, sB) / max(dot(sB, sB), 1e-4), 0., 1.);
  // where a line of cells stands apart the shelf breaks (uP[31].w, its place along the shelf), and its top rises and falls
  float sk = clamp(abs(sH - gGap) * 10.5 - .16, 0., 1.); gSk = sk;
  float sTop = uP[48].y * sk - .3 * (1. - sk);
  float fS = uP[48].w * (min(uP[48].x * (1. - .3 * sH) * (.3 + .7 * sk) - length(sQ - sB * sH), (hb + sTop - p.y) * 1.4) - 1.6 * (1. - sk) + 1e3) - 1e3;
  float wS = clamp((fS - f) * 2. + .5, 0., 1.) * gFlat;   // a line's shelf is a low base, its billows smaller than the towers'
  f = max(f, fS);
  float dc = 0.; gDepth = 0.;
  float dist = max(-f - .9, 0.);
  if (f > -.9) {
    // billows at three scales: the worley channel is a union of soft spheres, so its iso-surface buds into lobes
    float Rc = uP[26].w;
    vec3 cc = p / Rc * 1.6 + vec3(.3, -TIME * .004, .1);
    vec4 c0 = n3(cc * .19 + vec3(.5, TIME * .0012, .2));
    vec3 ccw = cc + (c0.rgb - .5) * .5;
    float Dc = (n3(ccw * .45 + .13).a - .5) * .78 + (c0.a - .5) * .34;
    // the finer sizes, each about a third of the last and carrying .6 and .3 of the coarse relief, over the whole face (eased
    // only deep inside): turrets made of lumps made of knobs. The sample and the first tap toward the sun read them
    if (fine) { float Df = (n3(ccw * 1.2 + .51).a - .5) * .3 + (n3(ccw * 2.7 + .77).a - .5) * .085; Dc += Df * (1. - smoothstep(.3, 1.1, f + Dc * Rc * .55)); }
    float fD = f + Dc * Rc * .55 * (1. - wS);
    // the base: level in the large, ragged in the small, with lowerings (scud, a wall cloud) hanging where c0 is high
    float bs = smoothstep(-.04, .08, p.y - hb + (c0.g - .5) * .55 + Dc * .6 + uP[48].z * smoothstep(.45, .92, c0.b + Dc * .35) * gSk * gSk);
    dc = smoothstep(0., .07, fD) * bs;
    gDepth = max(fD, 0.);
    dist = max(-fD * .45, 0.);   // in the shell but clear of the billows: step on, so rays over a long shelf still reach the towers
  }
  // the anvil: one glaciated sheet spreading off the tower top and fed by it: a sharp rounded upwind edge, the base
  // sagging into the tower's crown, streaming downwind in smooth fibres that thin and fray; mammatus on some evenings
  vec2 ad = uP[14].xy, qa0 = p.xz - uP[12].xy;
  float AL = uP[12].z, HU = uP[12].w, W0 = uP[14].z, LU = uP[27].w;
  float u = dot(qa0, ad), v = dot(qa0, vec2(-ad.y, ad.x));
  if (p.y > HU - 2.4 && u > -LU - 2. && u < AL * 1.25 + 2. && abs(v) < W0 + .5 * max(u, 0.) + 3.) {
    float uf = clamp(u / AL, 0., 1.);
    float hw = W0 + .5 * max(u, 0.) * (1. - .35 * uf);
    // fibres: noise stretched hard along the wind, so the sheet reads as combed ice, not billows
    float fb = full ? n3(vec3(u * .016, p.y * .05 + v * .015, v * .11) + vec3(TIME * .0004, .3, .6)).r * .6 + n3(vec3(u * .03, p.y * .12 + v * .05, v * .4) + .27).g * .4 : .5;
    float fs = textureLod(uN2, vec2(u * .006, v * .045) + .37, 0.).r;
    // its plan: a rounded upwind nose, and downwind sides that curve into the frayed end (its corners rounded off)
    vec2 pq = u < 0. ? vec2(u / LU, v / W0) : vec2(u / AL, v / hw);
    float pr = u < 0. ? length(pq) : (max(pq.x, abs(pq.y)) + length(pq)) * .5;
    float rt = 1. - smoothstep(.0, .35, uf);
    float bw = full && rt > 0. ? n3(p * .3 + vec3(.2, -TIME * .003, .5)).a * .65 + n3(p * .75 + .4).a * .35 : .5;
    float edge = 1. - pr + (fb - .5) * mix(.08, .9, uf * uf) + (fs - .5) * mix(.03, .5, uf) + (bw - .5) * .7 * rt;
    float foot = smoothstep(0., mix(.06, .35, uf), edge);
    float r2 = dot(qa0, qa0);
    float ht = uP[13].x - .5 * uf + .7 * exp(-r2 / (W0 * W0 * 1.4)) + (fb - .5) * .3 + (bw - .5) * 1.4 * rt;
    float hu = HU + (uP[13].x - HU) * .5 * pow(uf, .7) - 2.4 * exp(-r2 / (W0 * W0 * 1.6)) + (fs - .5) * .12 + (bw - .5) * 1.2 * rt + (textureLod(uN2, p.xz * .032 + .52, 0.).r - .5) * .85 * smoothstep(.05, .3, uf);   // soft lumps at large scale only
    float mz = smoothstep(.15, .4, uf) * (1. - smoothstep(.55, .8, uf)) * foot * uP[13].y;   // clusters under the middle, not the frayed end
    if (mz > 0.) {
      // mammatus: round pouches packed in rows, hanging from part of the sheet, the deepest near the anvil's middle; one
      // cell field at a fixed size (a size that varies across the field shears it into swirls)
      vec2 mr = textureLod(uN2, p.xz * .03 + .1, 0.).rb;
      float wc = textureLod(uN2, (p.xz + (mr - .5) * 1.4) * .048, 0.).g * 1.95, mid = 1. - smoothstep(.15, .8, abs(v) / hw);
      float pw = max(1. - wc * wc, 0.), pv = textureLod(uN2, p.xz * .1 + .3, 0.).b;   // a round sagging bag, each a different depth
      hu -= .17 * sqrt(pw) * smoothstep(0., .3, pw) * mz * smoothstep(.56, .78, mr.x) * (.45 + .55 * mid) * mix(.7, 1.2, pv);
    }
    float da = foot * smoothstep(hu - .05, hu + .3, p.y) * (1. - smoothstep(ht - .3, ht, p.y));
    da *= mix(1., .5 + .6 * fb, smoothstep(hu + .1, hu + .7, p.y)) * mix(1., .3, uf);   // a smooth ceiling underneath, combed above
    if (da > dc) { dc = da; gDepth = min(ht - p.y, (p.y - hu) * 2.5); }
    dist = min(dist, max(max((pr - 1.4) * min(W0, LU), hu - .5 - p.y), p.y - ht - .5));
  } else dist = min(dist, max(max(u < -LU - 2. ? -u - LU - 2. : u - AL * 1.25 - 2., HU - 2.4 - p.y), 0.));
  return vec4(dc, 0., 0., dist);
}
float segD(vec3 p, vec3 a, vec3 b) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0., 1.); return length(pa - ba * h); }
void main() {
  gGap = uP[31].w; gFlat = uP[45].y; gAmb = uP[51].rgb;
  vec2 fc = vec2(gl_FragCoord.x, floor(gl_FragCoord.y) * 2. + uP[28].z + .5);
  vec2 uv = fc / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 o = EYE * .001;
  vec3 dd = d; dd.y = max(dd.y, .0006); dd = normalize(dd);
  float tG = d.y < 0. ? o.y / -d.y : 1e9;
  vec3 L = SUN;
  float cosT = dot(dd, L);
  float phC = mix(hg(cosT, .6), hg(cosT, -.2), .3);
  vec3 haze = skyCol(normalize(vec3(dd.x, .02, dd.z))) * .7;
  vec2 lh = normalize(L.xz + vec2(1e-6, 0.));
  float hb = uP[2].z;
  // segments: A the storm and rain inside a bounding cylinder below 8.8 km, then B the slab above
  vec2 Cc = uP[29].yz;
  float RC = uP[29].w;
  vec2 oc = o.xz - Cc, dx = dd.xz;
  float qa = dot(dx, dx), qb = dot(oc, dx), qc = dot(oc, oc) - RC * RC, disc = qb * qb - qa * qc;
  float tA0 = 1e9, tA1 = -1.;
  if (disc > 0.) { float sq = sqrt(disc); tA0 = max((-qb - sq) / qa, 0.); tA1 = (-qb + sq) / qa; }
  tA1 = min(min(tA1, (8.8 - o.y) / dd.y), tG);
  float tB0 = (8.8 - o.y) / dd.y, tB1 = min(min((15.6 - o.y) / dd.y, tB0 + 40.), tG);
  bool hasB = tB1 > tB0 && dd.y > .02;
  float t = tA0, tEnd = tA1; int seg = 0;
  if (!(tA1 > tA0)) { seg = 1; t = tB0; tEnd = hasB ? tB1 : -1.; }
  float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))) + uP[29].x);
  // 1: the rain, from its own pass
  vec4 Rr = texelFetch(uC, ivec2(gl_FragCoord.xy), 0);
  vec3 ER = Rr.rgb / ENC; float TR = Rr.a;
  // 2: the cloud: tower, anvil and shelf
  vec3 E = vec3(0.); float T = 1.; bool inside = false;
  int NS = int(uP[28].y), NK = int(uP[46].z);
  float dt = .1;
  t += (.07 + t * .004) * jit;
  for (int i = 0; i < NS; i++) {
    if (t >= tEnd) {
      if (seg == 0 && hasB) { seg = 1; t = max(tB0, t); tEnd = tB1; } else break;
    }
    vec3 p = o + dd * t;
    // one field() call site: k = 0 is the sample, k = 1, 2 are taps toward the sun
    vec4 F = vec4(0.); float tau = 0., dep = 0.;
    for (int k = 0; k < NK; k++) {
      // a third tap 1.6 km out shades a turret's own flank away from the sun (a front-lit tower keeps its relief)
      float kf = float(k), tk = kf > .5 ? .2 * exp2(1.5 * kf - 1.5) : 0.;   // 0, .2, .57, 1.6 km
      vec4 G = field(p + L * tk, k);
      if (k == 0) { F = G; dep = gDepth; if (G.x < .003) break; }
      else tau += G.x * 13. * .2 * exp2(kf - 1.);
    }
    float sig = 13. * F.x;
    if (sig > .02 && !inside) { inside = true; t = max(t - (.07 + t * .004) * jit, 0.); continue; }
    if (sig > .02) {
      dt = .07 + t * .004;
      // the low sun's chord through the tower (deep shadow the taps can't reach), the tower's own radius and lean at
      // this height, capped where the light leaves through the top; and the chord through the shelf toward the sun
      float yh = max(p.y - hb, 0.), tE = max(uP[24].w, .015);
      vec2 q = p.xz - uP[2].xy - uP[49].xy * yh;
      float Rm = max(uP[2].w - uP[49].z * yh, .8 * step(.01, uP[2].w));
      float bq = dot(q, lh), dq = bq * bq - (dot(q, q) - Rm * Rm);
      float chord = 0.;
      if (dq > 0.) { float sq = sqrt(dq); chord = max(0., -bq + sq - max(-bq - sq, 0.)); }
      chord = min(chord, max(uP[49].w - p.y, 0.) / tE);
      vec2 sA = uP[47].xy, sB = uP[47].zw - sA, sQ = p.xz - sA;
      vec2 sN = normalize(vec2(-sB.y, sB.x) + 1e-5); sN *= sign(dot(sN, lh) + 1e-5);
      float sdl = dot(sQ - sB * clamp(dot(sQ, sB) / max(dot(sB, sB), 1e-4), 0., 1.), sN);
      float chS = uP[48].w * clamp((uP[48].x - sdl) / max(dot(sN, lh), .25), 0., 6.) * step(-uP[48].x - .5, sdl);
      chS = min(chS, max(hb + uP[48].y + .3 - p.y, 0.) / tE) + uP[48].w * mix(.6, .9, step(-uP[48].x - .5, sdl)) * (1. - smoothstep(hb + .15, hb + .75, p.y));
      float tauT = tau + (chord * smoothstep(hb - .2, hb + .3, p.y) + chS * mix(.55, 1., smoothstep(hb - .2, hb + .3, p.y))) * 2.2;
      // the low sun on the cloud: its own colour, saturated a little more (a lit tower at sunset is gold, not cream)
      vec3 sc = sunAt(p.y); sc = max(mix(vec3(dot(sc, vec3(.3333))), sc, 1.3), 0.) * mix(vec3(1.), vec3(1.02, .92, .9), smoothstep(.3, .7, uP[15].w));
      vec3 ms = vec3(0.); float a = 1., b = 1.;
      for (int j = 0; j < 3; j++) { ms += a * exp(-tauT * b) * mix(phC, .0796, float(j) * .45); a *= .32; b *= .45; }
      float occ = exp(-dep / .35);
      float hy = clamp((p.y - hb) / 9., 0., 1.);
      // the shade takes the sky's light (slate to mauve, toned down toward grey), the red earth's bounce only on the underside
      vec3 amb = gAmb * (.07 + .93 * occ) * (.5 + .8 * hy) + uP[21].rgb * clamp((hb + .45 - p.y) * 1.8, 0., 1.) * (.35 + .65 * occ);
      vec3 fl = uP[26].rgb * (uP[7].w / (1. + pow(segD(p, uP[7].xyz, uP[8].xyz) * 1.3, 2.)) + uP[8].w / (1. + dot(p - uP[9].xyz, p - uP[9].xyz) * 1.1));
      // where the sun does not reach, the sky's light fills the shade (it sees the whole blue dome): gold turns through mauve to slate
      vec3 Lc = vec3(.97, .96, .94) * (sc * ms * .4 + amb * (.4 + .55 * (1. - exp(-tauT)))) + fl;
      float Ts = exp(-sig * dt);
      float fog = exp(-t * uP[24].z);
      E += T * (1. - Ts) * mix(haze, Lc, fog);
      T *= Ts;
      if (T < .015) break;
    } else {
      dt = clamp(F.w * .75, .07 + t * .004, 1.5);
    }
    t += dt;
  }
  E = ER + TR * E; T *= TR;
  vec4 r = vec4((E + T * skyCol(d)) * ENC, T);
  bool bad = !(r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. && r.r < 6e4 && r.g < 6e4 && r.b < 6e4 && r.a <= 1.01);
  oC = bad ? vec4(skyCol(d) * ENC, 1.) : r;
}
`,Wo=Dt+Zt+`
uniform sampler2D uC;
out vec4 oC;
float pxL(float K) { return log2(max(uP[4].w * K * 256., 1e-6)); }
float wrapA(float a) { return abs(mod(a + 3.1415927, 6.2831853) - 3.1415927); }
float farK(float az) { return uP[44].x * smoothstep(uP[44].z, uP[44].w, wrapA(az - uP[44].y)); }
// far land as elevation tangents by azimuth: the escarpment under the sunset, kopjes, low far hills
float landE(float az, float y, out float D, out float kind) {
  float u = az / 6.2831853, aL = pxL(1. / 6.2831853);
  float dA = wrapA(az - uP[30].z), dS = wrapA(az - uP[30].w);
  float n1 = textureLod(uN2, vec2(u * 3., .71), aL + log2(3.0)).r, n2 = textureLod(uN2, vec2(u * 24., .33), aL + log2(24.0)).a, n3 = textureLod(uN2, vec2(u * 9., .52), aL + log2(9.0)).b;
  float n4 = textureLod(uN2, vec2(u * 70., .47), aL + log2(70.0)).g;
  float H = uP[30].y * (.7 + .38 * n1 + .22 * (n2 - .5) + .035 * (n4 - .5)) * (1. - .35 * smoothstep(.62, .9, n3)) * smoothstep(1.4, .8, dA);
  float e1 = H / uP[30].x;
  float kp = smoothstep(.6, .78, textureLod(uN2, vec2(u * 7., .23), aL + log2(7.0)).b) * smoothstep(.55, .95, dS) * smoothstep(.5, .9, dA);
  float e2 = .085 * kp * (.75 + .35 * textureLod(uN2, vec2(u * 60., .61), aL + log2(60.0)).r) / 5.;
  float e3 = (.12 + .25 * textureLod(uN2, vec2(u * 5., .9), aL + log2(5.0)).r) / 34. * smoothstep(.4, .9, dS);
  D = 34.; kind = 3.;
  float e = e3;
  if (e1 > e) { e = e1; D = uP[30].x; kind = 1.; }
  if (e2 > e) { e = e2; D = 5.; kind = 2.; }
  float k4 = farK(az);
  if (k4 > 0.) {
    // low bushy swells one and three km out, breaking the line where the plain meets the sky, their crests ragged with bush
    float cr = textureLod(uN2, vec2(u * 260., .93), aL + log2(260.0)).a - .5;
    float eA = (6. + 18. * textureLod(uN2, vec2(u * 5., .17), aL + log2(5.0)).r + 2.5 * cr) * smoothstep(.38, .66, textureLod(uN2, vec2(u * 2., .39), aL + log2(2.0)).r) * k4 / 1300.;
    float eB = (12. + 44. * textureLod(uN2, vec2(u * 3., .63), aL + log2(3.0)).r + 4. * cr) * smoothstep(.32, .62, textureLod(uN2, vec2(u, .27), aL + log2(1.0)).b) * k4 / 3200.;
    // nearer layers hide farther ones: of the silhouettes standing above this ray, the nearest one shows
    if (eB > y) { D = 3.2; kind = 4.; }
    if (eA > y) { D = 1.3; kind = 4.; }
    e = max(e, max(eA, eB));
  }
  return e;
}
vec3 groundCol(vec3 d, out float dist) {
  float t = EYE.y / -d.y; dist = t;
  // the mip level of this pixel's footprint on the plain (each lookup adds its own scale)
  float gL = log2(max(t * uP[4].w / max(-d.y, .002) * 256., 1e-6));
  vec3 P = EYE + d * t;
  float pn = textureLod(uN2, P.xz * .013, gL + log2(.013)).r, pm = textureLod(uN2, P.xz * .061 + .3, gL + log2(.061)).b, pf = textureLod(uN2, P.xz * .4, gL + log2(.4)).a;
  vec3 grass = uP[25].rgb * (.72 + .5 * pm);
  grass = mix(grass, grass * vec3(.78, .74, .6), smoothstep(.5, .75, pn));
  float gn = textureLod(uN2, P.xz * .021 + .61, gL + log2(.021)).g;
  grass = mix(grass, grass * vec3(.74, .9, .62), smoothstep(.5, .72, gn) * .75);
  float gt = uP[17].w;
  if (gt > 1.5) grass = mix(grass, vec3(.035, .03, .028), smoothstep(.5, .62, pn) * .85);
  // close by, red earth shows between the tussocks, and each clump throws a shadow away from the low sun
  vec2 lh = normalize(SUN.xz + vec2(1e-6, 0.));
  float wv = textureLod(uN2, P.xz * .19 + .37, gL + log2(.19)).r * .65 + textureLod(uN2, P.xz * .8 + .1, gL + log2(.8)).a * .35;
  float ws = textureLod(uN2, (P.xz + lh * .5) * .19 + .37, gL + log2(.5)).r * .65 + textureLod(uN2, (P.xz + lh * .5) * .8 + .1, gL + log2(.5)).a * .35;
  float near = 1. - smoothstep(14., 34., t);
  vec3 earth = uP[27].rgb * (.75 + .45 * pf) * (.85 + .3 * pm);
  float rp = smoothstep(.62, .74, textureLod(uN2, P.xz * .009 + .83, gL + log2(.009)).b) + smoothstep(.035, .0, abs(textureLod(uN2, P.xz * vec2(.004, .0015) + .2, gL + log2(.004)).r - .5));
  earth = mix(earth, vec3(.4, .18, .1), clamp(rp, 0., 1.) * .8);
  // beyond the modelled tussocks: clumps receding, each lit on its sun side and throwing a shadow away from it
  float mid = smoothstep(16., 26., t) * (1. - smoothstep(90., 220., t));
  if (mid > 0.) {
    vec2 cq = P.xz * vec2(.55, .55);
    float cl = textureLod(uN2, cq + .13, gL + log2(.55)).a * .7 + textureLod(uN2, cq * 2.3 + .5, gL + log2(1.265)).g * .3;
    float cs = textureLod(uN2, cq + lh * .55 * .55 + .13, gL + log2(.55)).a * .7 + textureLod(uN2, (cq + lh * .55 * .55) * 2.3 + .5, gL + log2(1.265)).g * .3;
    float tuft = smoothstep(.5, .66, cl), shd = smoothstep(.5, .66, cs) * (1. - tuft);
    float gap = smoothstep(.36, .26, cl);
    float k = mid * (1. - smoothstep(40., 160., t) * .6);
    grass *= 1. + k * (.28 * tuft - .5 * shd - .3 * gap);
    grass = mix(grass, mix(earth, grass * vec3(.55, .5, .4), .5), gap * k * .6);
  }
  // the far plain: bush belts and thickets, pale grass flats, single bushes dotted about, and gentle swells lit on the
  // slopes that face the low sun (fades in away from the home's opening view, which keeps its old look)
  float fk = t > 120. ? farK(at2(vec2(d.z, d.x))) * smoothstep(120., 260., t) : 0.;
  float relief = 1.;
  if (fk > 0.) {
    vec2 fq = P.xz;
    float b1 = textureLod(uN2, fq * .00093 + .71, gL + log2(.00093)).b, b2 = textureLod(uN2, fq * .0041 + .23, gL + log2(.0041)).r, b3 = textureLod(uN2, fq * .019 + .57, gL + log2(.019)).a;
    float bush = smoothstep(.55, .7, b1 * .62 + b2 * .38), pale = smoothstep(.44, .3, b1 * .5 + b2 * .5);
    float dots = smoothstep(.64, .74, b3) * (1. - smoothstep(500., 2200., t));
    vec3 g2 = grass * mix(vec3(1.), vec3(1.12, 1.07, .94), pale * .75);
    g2 = mix(g2, grass * vec3(.4, .45, .28), clamp(bush * .8 + dots * .65, 0., 1.));
    grass = mix(grass, g2, fk);
    vec2 hq = fq * .00026 + .41;
    float h0 = textureLod(uN2, hq, gL + log2(.00026)).r, hx = textureLod(uN2, hq + vec2(.0156, 0.), gL + log2(.00026)).r, hz = textureLod(uN2, hq + vec2(0., .0156), gL + log2(.00026)).r;
    vec3 nn = normalize(vec3(-(hx - h0) * .67, 1., -(hz - h0) * .67));
    relief = mix(1., clamp(dot(nn, SUN) / max(SUN.y, .02), .35, 1.9), fk * (1. - smoothstep(2500., 9000., t)));
  }
  vec3 alb = mix(grass, mix(earth, grass * vec3(.5, .45, .38), smoothstep(.3, .42, wv)), near * .9);
  float g; vec2 b = bendAt(P.xz, g);
  vec3 L = SUN;
  vec2 dh = normalize(d.xz);
  float cv = dot(dh, lh);
  vec3 sunL = sunAt(0.);
  vec3 lit = sunL * (.25 + .3 * max(0., -cv) + .75 * pow(max(cv, 0.), 3.)) * mix(1., .2 + .35 * smoothstep(.55, .4, ws), near);
  lit *= 1. + .5 * (g - .45) * 1.5 * (1. - near * .6);
  if (fk > 0.) lit *= relief;
  // the storm's shade and wet ground under the rain
  vec2 rq = P.xz * .001 - uP[10].xy, rax = uP[11].xy;
  float re = length(vec2(dot(rq, rax), dot(rq, vec2(-rax.y, rax.x))) / uP[10].zw);
  float wet = smoothstep(1.1, .7, re);
  lit *= 1. - .7 * wet;
  alb *= 1. - .3 * wet - .32 * uP[46].x;
  vec3 c = alb * (lit + uP[20].rgb * .9 + uP[21].rgb * .3 + uP[26].rgb * (uP[8].w * .05 + uP[7].w * .03));
  vec3 pk = P * .001;
  float gd = length(pk.xz - uP[8].xz);
  c += alb * uP[26].rgb * uP[9].w / (1. + gd * gd * 1.6);
  return c;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uP[6].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  // Catmull-Rom enlargement of the volume (five bilinear taps, the four corners dropped): it keeps the cloud's edges as
  // sharp as the volume holds them, where a B-spline smoothed them; clamped so it cannot ring
  vec2 ts = vec2(uP[5].w), sp = uv * ts, tc = floor(sp - .5) + .5, f = sp - tc;
  vec2 w0 = f * (-.5 + f * (1. - .5 * f)), w1 = 1. + f * f * (-2.5 + 1.5 * f), w2 = f * (.5 + f * (2. - 1.5 * f)), w3 = f * f * (-.5 + .5 * f);
  vec2 w12 = w1 + w2, o12 = (tc + w2 / w12) / ts, q0 = (tc - 1.) / ts, q3 = (tc + 2.) / ts;
  vec4 C = textureLod(uC, vec2(o12.x, q0.y), 0.) * (w12.x * w0.y) + textureLod(uC, vec2(q0.x, o12.y), 0.) * (w0.x * w12.y)
         + textureLod(uC, o12, 0.) * (w12.x * w12.y) + textureLod(uC, vec2(q3.x, o12.y), 0.) * (w3.x * w12.y) + textureLod(uC, vec2(o12.x, q3.y), 0.) * (w12.x * w3.y);
  C /= w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  C = vec4(max(C.rgb, 0.), clamp(C.a, 0., 1.));
  vec3 col = C.rgb / ENC;
  vec3 sky = skyCol(d);
  vec2 lh = normalize(SUN.xz + vec2(1e-6, 0.));
  if (d.y < 0.) {
    float dist;
    vec3 G = groundCol(d, dist);
    G = mix(skyCol(normalize(vec3(d.x, 0., d.z))) * .92, G, exp(-dist / 6500.));
    float fh = dist > 400. ? farK(at2(vec2(d.z, d.x))) : 0.;
    if (fh > 0.) {
      // haze in layers: denser bands of dust lying over the plain at different distances
      float ly = smoothstep(.42, .7, textureLod(uN2, vec2(log2(dist) * .37, at2(vec2(d.z, d.x)) * .21 + .6), pxL(.21)).g);
      G = mix(G, skyCol(normalize(vec3(d.x, .004, d.z))) * .9, fh * ly * .32 * smoothstep(400., 2500., dist));
    }
    G = mix(G, rainFog(), uP[16].w * (1. - exp(-dist / 90.)) * .75);
    col += C.a * (G - sky);
  } else {
    float D, kind;
    float hl = length(d.xz);
    float e = d.y < .08 ? landE(at2(vec2(d.z, d.x)), d.y / hl, D, kind) : -1.;
    if (d.y / hl < e) {
      // far land: backlit toward the sun, warm and lit away from it, dissolving into the dust haze
      float cv = dot(d.xz / hl, lh);
      float tn = textureLod(uN2, vec2(at2(vec2(d.z, d.x)) * 4., d.y * 60.), pxL(60.)).r;
      vec3 rock = kind > 3.5 ? uP[25].rgb * vec3(.42, .44, .3) : kind > 1.5 && kind < 2.5 ? vec3(.3, .2, .13) : vec3(.2, .16, .13);
      vec3 lit = sunAt(.3) * max(0., -cv) * (.45 + .4 * tn) + uP[20].rgb * .9;
      vec3 Hc = rock * lit;
      float hz = 1. - exp(-D / (kind > 3.5 ? 4.5 : kind > 2.5 ? 18. : 11.));
      vec3 hzc = skyCol(normalize(vec3(d.x, .005, d.z)));
      float fr = clamp(d.y / hl / max(e, 1e-5), 0., 1.);
      float gl = textureLod(uN2, vec2(at2(vec2(d.z, d.x)) * 30., d.y * 25.), pxL(30.)).g;
      Hc *= kind < 1.5 ? .75 + .5 * smoothstep(.35, .7, gl) * fr : 1.;
      Hc = mix(Hc, hzc * mix(.72, .95, step(2.5, kind)), hz * mix(.75, .55, smoothstep(.6, 1., cv)) * (kind < 1.5 ? mix(.95, .6, fr) : 1.));
      Hc += sunAt(.3) * pow(max(cv, 0.), 40.) * smoothstep(e - .0015, e, d.y / hl) * .8;
      col += C.a * (Hc - sky);
    } else {
      float cs = dot(d, SUN);
      col += C.a * uP[19].rgb * vec3(1., .82, .62) * smoothstep(.999984, .999989, cs) * 6.;
      // a sparse high cirrus deck far from the storm, lit from below by the sunset, behind whatever the volume holds (drawn here,
      // at full size, so the cloud's own program compiles smaller on Windows)
      if (d.y > .05 && C.a > .01 && uP[50].w > 0.) {
        vec3 o = EYE * .001, L = SUN;
        float tc = (8.5 - o.y) / d.y;
        vec2 cp = o.xz + d.xz * tc;
        vec2 wdir = vec2(cos(uP[50].z), sin(uP[50].z));
        vec2 cu = vec2(dot(cp, wdir), dot(cp, vec2(-wdir.y, wdir.x))) + uP[50].xy;
        float cl = log2(max(tc * uP[4].w / max(d.y, .02) * 256., 1.));
        // ice falling out of tufts into slower air: the strands bent in a slow sheaf, so each curves away from a denser head
        vec4 cb = textureLod(uN2, cu * .0021 + .61, cl + log2(.0021));
        cu.y += (cb.b - .5) * 34.;
        float cn = textureLod(uN2, cu * vec2(.004, .018) + .3, cl + log2(.018)).r * .6 + textureLod(uN2, cu * vec2(.012, .06) + .7, cl + log2(.06)).a * .4;
        float away = smoothstep(14., 26., length(cp - uP[2].xy));
        float ca = smoothstep(.57, .84, cn) * smoothstep(.42, .7, cb.r) * away * smoothstep(.05, .22, d.y) * .5 * uP[50].w;
        vec3 ccol = sunAt(8.5) * .55 * (.6 + .6 * pow(max(dot(d, L), 0.), 3.)) + uP[20].rgb * .8;
        col += C.a * ca * (mix(sky * .8, ccol, exp(-tc * .006)) - sky);
      }
    }
  }
  oC = vec4(col * ENC, 1.);
}
`,Ho=Dt+Zt+`
uniform mat4 uVP;
uniform sampler2D uGI;
uniform ivec2 uGB;
out vec3 vC;
void main() {
  int vi = gl_VertexID % 10, bi = gl_InstanceID * ${zt} + gl_VertexID / 10, gi = (uGB.x + bi) * 2;
  if (bi >= uGB.y) { gl_Position = vec4(2., 2., 2., 1.); vC = vec3(0.); return; }
  vec2 aV = vec2(float(vi >> 1) * .25, (vi & 1) == 0 ? -1. : 1.);
  vec4 aI = texelFetch(uGI, ivec2(gi & 1023, gi >> 10), 0), aO = texelFetch(uGI, ivec2((gi + 1) & 1023, (gi + 1) >> 10), 0);
  float sd = aI.w, h = abs(aI.z) * uP[25].w, gt = uP[17].w;
  vec3 base = vec3(aI.x, -.03, aI.y);
  float g; vec2 b = bendAt(base.xz, g);
  float fa = sd * 43.98;
  float ph = TIME * (2.6 + 2.2 * fract(sd * 13.)) - dot(base.xz, uP[22].xy) * .9 + sd * 20.;
  b = (b + uP[22].xy * sin(ph) * (.05 + .08 * g) * WIND / 12.) * (.7 + .5 * fract(sd * 5.7)) + aO.xy;
  float bl = min(length(b), 1.35); vec2 bd = b / max(length(b), 1e-4);
  float s = aV.x;
  vec3 p1 = vec3(0., h * .55, 0.), p2 = vec3(bd.x * sin(bl) * h, cos(bl) * h, bd.y * sin(bl) * h);
  vec3 P = base + 2. * s * (1. - s) * p1 + s * s * p2;
  vec3 tg = normalize(2. * (1. - s) * p1 + 2. * s * (p2 - p1) + 1e-5);
  vec3 te = EYE - base; float dist = length(te);
  vec2 vp = normalize(vec2(-te.z, te.x) + 1e-5);
  vec2 rf = vec2(cos(fa * 1.3), sin(fa * 1.3)); rf *= sign(dot(rf, vp) + 1e-4);
  vec2 ww = normalize(mix(rf, vp, .55));
  vec3 Wd = vec3(ww.x, 0., ww.y);
  float w0 = .0025 + .004 * fract(sd * 31.);
  float prof = 1. - pow(s, 1.6);
  bool head = aI.z < 0. && gt < 1.5;
  if (head) prof = s > .74 ? .9 + .6 * sin((s - .74) / .26 * 3.1416) : prof * .6;
  float wid = max(w0, dist * uP[4].w * .75) * prof;
  P += Wd * aV.y * wid * .5;
  gl_Position = uVP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); vec3 V = normalize(EYE - P); N = dot(N, V) < 0. ? -N : N;
  N = normalize(N + vec3(0., .35, 0.));
  float r1 = fract(sd * 3.7);
  vec3 tip = uP[25].rgb * (.8 + .45 * r1);
  tip = mix(tip, tip * vec3(.75, .8, .6), smoothstep(.5, .72, aO.z));
  tip = mix(tip, tip * vec3(.7, .9, .58), smoothstep(.62, .85, aO.w) * .8);
  vec3 alb = mix(uP[25].rgb * vec3(.4, .36, .28), tip, smoothstep(0., .3, s));
  if (gt > 1.5) alb = mix(alb, vec3(.03, .028, .025), step(.62, aO.w) * (1. - s * .5));
  if (head && s > .74) alb = uP[31].rgb * (.85 + .3 * r1);
  vec3 sl = sunAt(0.);
  float diff = max(dot(N, SUN), 0.) * .8 + .2;
  float tr = pow(max(dot(-V, SUN), 0.), 4.) * (.3 + .9 * s);
  float shd = .25 + .75 * smoothstep(.05, .8, s * (.75 + .5 * fract(sd * 5.3)) + (aO.z - .5) * .5);
  vec3 c = alb * (sl * (diff * .85 + tr * 1.9) * shd + (uP[20].rgb + uP[21].rgb * .3) * (.25 + .75 * s)) * (.65 + .45 * fract(sd * 9.7));
  float gd = length(base.xz * .001 - uP[8].xz);
  c += alb * uP[26].rgb * (uP[9].w / (1. + gd * gd * 1.6) + uP[8].w * .05 + uP[7].w * .03) * (.4 + .6 * s);
  c *= 1. + (g - .45) * .3 * s;
  vC = mix(c, rainFog(), uP[16].w * (1. - exp(-dist / 90.)) * .75);
}
`,Yo=Dt+`
uniform vec4 uP[${te}];
in vec3 vC; out vec4 oC;
void main() { oC = vec4(vC * uP[21].w, 1.); }
`,jo=Dt+Zt+`
uniform mat4 uVP;
uniform sampler2D uRI;
uniform ivec2 uGB;
out vec3 vCol; out vec3 vSide; out vec3 vView; out vec4 vX; out vec4 vS;
void main() {
  int vi = gl_VertexID & 3, ci = gl_InstanceID * ${zt} + (gl_VertexID >> 2), ti = ci * 3;
  if (ci >= uGB.y) { gl_Position = vec4(2., 2., 2., 1.); vCol = vSide = vView = vec3(0.); vX = vS = vec4(0.); return; }
  vec2 aV = vec2((vi & 2) == 0 ? 0. : 1., (vi & 1) == 0 ? -1. : 1.);
  vec4 aA = texelFetch(uRI, ivec2(ti & 1023, ti >> 10), 0), aB = texelFetch(uRI, ivec2((ti + 1) & 1023, (ti + 1) >> 10), 0), aK = texelFetch(uRI, ivec2((ti + 2) & 1023, (ti + 2) >> 10), 0);
  // keep both ends in front of the camera (a span crossing behind it would fold across the frame)
  vec3 Ae = aA.xyz, Be = aB.xyz;
  float da = dot(Ae - EYE, uP[4].xyz), db = dot(Be - EYE, uP[4].xyz);
  if (da < .2 && db >= .2) Ae = mix(Ae, Be, (.2 - da) / (db - da));
  if (db < .2 && da >= .2) Be = mix(Be, Ae, (.2 - db) / (da - db));
  float kind = aK.w;
  bool bolt = kind > 1.5 && kind < 3.5;
  vec3 ax = Be - Ae; float L = length(ax); vec3 an = ax / max(L, 1e-5);
  vec3 Pm = mix(Ae, Be, aV.x);
  float w = mix(aA.w, aB.w, aV.x);
  vec3 toE = EYE - Pm; float dist = length(toE);
  vec3 side = normalize(cross(ax, toE) + vec3(1e-6, 0., 0.));
  side *= side.y < 0. ? -1. : 1.;
  float ww = max(w, dist * uP[4].w * (bolt ? 1.3 : .8));
  float sx = aV.x * 2. - 1.;
  float ext = ww * (bolt ? .4 : .5);
  vec3 P = Pm + side * aV.y * ww * .5 + an * sx * ext;
  gl_Position = (da < .2 && db < .2) || aA.w < 0. ? vec4(2., 2., 2., 1.) : uVP * vec4(P, 1.);
  vCol = aK.rgb; vSide = side; vView = toE / dist;
  vX = vec4(aV.y, w / ww, kind, dist);
  vS = vec4(aV.x * L + sx * ext, L, ww, fract(aA.x * .1371 + aA.z * .0713 + aB.y * .31));
}
`,Qo=Dt+Zt+`
in vec3 vCol; in vec3 vSide; in vec3 vView; in vec4 vX; in vec4 vS;
out vec4 oC;
void main() {
  float v = vX.x, k = vX.z;
  vec3 c; float a;
  if (k > 2.5 && k < 3.5) {         // lightning glow
    float I = uP[28].x * vCol.r;
    c = uP[26].rgb * I * exp(-v * v * 5.) * .1; a = 1.;
  } else if (k > 1.5 && k < 2.5) {  // lightning channel
    float I = uP[28].x * vCol.r;
    c = mix(uP[26].rgb, vec3(1.), .6) * I * (1. - v * v) * 7. * vX.y; a = 1.;
  } else {
    float s = vS.x, L = vS.y, ww = vS.z, px = vX.w * uP[4].w;
    float dc = length(vec2(s - clamp(s, 0., L), v * ww * .5));
    a = smoothstep(ww * .5 + px * .2, ww * .5 - px * .8, dc) * sqrt(vX.y);
    vec3 Ls = SUN;
    vec3 sunL = sunAt(.01);
    float back = pow(max(dot(-vView, Ls), 0.), 5.);
    vec3 amb = uP[20].rgb * .55 + uP[21].rgb * .3;
    if (k > 3.5) {
      // an acacia's foliage pad: ragged clumps of tiny leaves, gilded where the low sun comes through the edges
      float n = texture(uN2, vec2(s * .42, v * .3) + vS.w * 17.31).g;
      float n2 = texture(uN2, vec2(s * 1.2, v * .8) + vS.w * 5.13).r;
      float body = 1. - abs(v) * (.55 + .6 * n2) - (n - .3) * .7;
      float cov = smoothstep(.12, .3, body);
      a *= cov;
      vec3 N = normalize(vec3(0., v * .9 + .3, 0.) + vView * .7);
      float edge = 1. - smoothstep(.12, .5, body);
      c = vCol * (sunL * (max(dot(N, Ls), 0.) * .9 * (.55 + .45 * smoothstep(-.4, .6, v)) + back * (.4 + 2.5 * edge)) + amb * (.6 + .4 * v));
      c += sunL * vec3(1., .78, .4) * back * edge * .3;
    } else {
      vec3 N = normalize(vSide * v + vView * sqrt(max(0., 1. - v * v)));
      float tx = texture(uN2, vec2(s * .7, v * .45) + vS.w * 7.13).r * .6 + texture(uN2, vec2(s * 2.3, v * 1.1) + vS.w * 3.1).a * .4;
      c = vCol * (.72 + .56 * tx) * (sunL * (max(dot(N, Ls), 0.) * .9 + back * pow(abs(v), 2.) * 1.6) + amb);
    }
    float gd = length((EYE - vView * vX.w).xz * .001 - uP[8].xz);
    c += vCol * uP[26].rgb * uP[9].w / (1. + gd * gd * 1.6);
    c = mix(skyCol(normalize(vec3(-vView.x, .01, -vView.z))) * .92, c, exp(-vX.w / 6500.));
    c = mix(c, rainFog(), uP[16].w * (1. - exp(-vX.w / 90.)) * .75);
    if (a < .02) discard;
  }
  oC = vec4(c * ENC, a);
}
`,Ko=Dt+Zt+`
uniform mat4 uVP;
uniform sampler2D uPI;
uniform ivec2 uGB;
out vec4 vC; out vec3 vQ;
void main() {
  int vi = gl_VertexID & 3, id = gl_InstanceID * ${zt} + (gl_VertexID >> 2);
  if (id >= uGB.y) { gl_Position = vec4(2., 2., 2., 1.); vC = vec4(0.); vQ = vec3(0.); return; }
  vec2 aV = vec2((vi & 2) == 0 ? -1. : 1., (vi & 1) == 0 ? -1. : 1.);
  vec4 aI = texelFetch(uPI, ivec2(id & 1023, id >> 10), 0);
  float sd = aI.w;
  vec3 rt = uP[5].xyz, up = uP[6].xyz;
  vec3 P; vec3 col; float sz, al = 0., kind;
  vec2 wd = uP[22].xy;
  if (id < ${Te}) {
    // dust and grass seed drifting in the wind, glowing when the low sun is behind them
    kind = 0.;
    vec3 box = vec3(56., 1., 56.);
    vec3 dr = vec3(wd.x, 0., wd.y) * WIND * .22 * TIME + vec3(sin(TIME * .31 + sd * 30.), 0., cos(TIME * .27 + sd * 17.)) * .7;
    P = aI.xyz * box + dr;
    P.xz = EYE.xz + mod(P.xz - EYE.xz + box.xz * .5, box.xz) - box.xz * .5;
    P.y = .15 + 5.5 * pow(fract(aI.y + TIME * .004 * (fract(sd * 7.) - .3)), 2.) + .25 * sin(TIME * .5 + sd * 11.);
    vec3 v = normalize(P - EYE);
    float fw = pow(max(dot(v, SUN), 0.), 10.);
    float dist = length(P - EYE);
    sz = max((.004 + .012 * fract(sd * 13.)) * (1. + fw * 2.), dist * uP[4].w * .9);
    col = sunAt(P.y) * (.03 + 4. * fw) * mix(vec3(1., .85, .6), vec3(1.), fract(sd * 5.)) * (.004 + .012 * fract(sd * 13.)) / sz * (1. - smoothstep(20., 28., dist)) * smoothstep(.5, 2., dist);
    col *= 1. - .8 * uP[16].w;
  } else if (id < ${Te+co}) {
    // near raindrops when the curtain is over you: streaks lit by the sun when it breaks through
    kind = 1.;
    vec3 box = vec3(30., 14., 30.);
    P = aI.xyz * box;
    P.y = 13. - mod(TIME * 8.5 + sd * 14., 14.);
    P.xz += wd * (13. - P.y) * .18;
    P.xz = EYE.xz + mod(P.xz - EYE.xz + box.xz * .5, box.xz) - box.xz * .5;
    float dist = length(P - EYE);
    sz = max(.0016, dist * uP[4].w * .7);
    float on = step(fract(sd * 7.31), uP[16].w) * step(-.3, P.y);
    vec3 v = normalize(P - EYE);
    float bw = acos(clamp(-dot(v, SUN), -1., 1.)) * 57.29578;
    vec3 bowc = vec3(exp(-pow((bw - 42.2) / .8, 2.)), exp(-pow((bw - 41.4) / .8, 2.)), exp(-pow((bw - 40.6) / .8, 2.))) * 3.;
    col = (uP[20].rgb * 1.5 + sunAt(1.) * (.06 + bowc) * uP[14].w) * on * .0016 / sz * (1. - smoothstep(10., 15., dist));
    vec3 ax = normalize(vec3(-wd.x * .18, -1., -wd.y * .18));
    vec3 sd3 = normalize(cross(ax, EYE - P));
    P += ax * aV.y * .14 + sd3 * aV.x * sz * .5;
    vC = vec4(col, 0.); vQ = vec3(aV, kind);
    gl_Position = on > .5 ? uVP * vec4(P, 1.) : vec4(2., 2., 2., 1.);
    return;
  } else {
    // the first fat drops raising puffs of dust from the dry earth
    kind = 2.;
    float per = 1.4, cyc = floor((TIME + sd * per) / per), age = mod(TIME + sd * per, per) / per;
    float r = 1.5 + 11. * hash12(vec2(cyc, sd * 91.)), th = 6.2831853 * hash12(vec2(sd * 37., cyc + 3.1));
    P = EYE + vec3(sin(th) * r, 0., cos(th) * r);
    P.y = .05 + age * .25;
    sz = .06 + .3 * sqrt(age);
    float amt = uP[16].w * (1. - .7 * uP[14].w) * step(hash12(vec2(cyc, sd)), .8);
    al = (1. - age) * (1. - age) * .5 * amt;
    col = uP[27].rgb * 1.5 * (sunAt(.1) * .7 + uP[20].rgb * 1.5) * al;
  }
  P += (rt * aV.x + up * aV.y) * sz;
  vC = vec4(col, al); vQ = vec3(aV, kind);
  gl_Position = uVP * vec4(P, 1.);
}
`,$o=Dt+`
uniform vec4 uP[${te}];
in vec4 vC; in vec3 vQ;
out vec4 oC;
void main() {
  float a;
  if (vQ.z < .5) a = exp(-dot(vQ.xy, vQ.xy) * 3.);
  else if (vQ.z < 1.5) a = (1. - vQ.x * vQ.x) * smoothstep(1., .5, abs(vQ.y));
  else a = exp(-dot(vQ.xy, vQ.xy) * 2.6);
  oC = vec4(vC.rgb * a * uP[21].w, vC.a * a);
}
`,Zo=Dt+`
uniform vec4 uP[${te}];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[28].z) && uP[28].w < .5) discard;
  float yy = (float(p.y) - uP[28].z) * .5;
  vec4 r = texture(uS, vec2((float(p.x) + .5) / uP[5].w, (yy + .5) / (uP[5].w * .5)));
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. ? r : vec4(0., 0., 0., 1.);
}
`,Jo=Dt+`
uniform vec4 uP[${te}];
uniform sampler2D uS;
out vec4 oC;
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main() {
  vec2 fc = gl_FragCoord.xy, uv = fc / uP[6].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  vec3 c = texture(uS, fc / uP[6].w).rgb / uP[21].w * uP[18].w;
  c *= 1. - .08 * pow(length(uv - .5) * 1.25, 2.6);
  float cs = max(dot(d, uP[1].xyz), 0.);
  c += uP[19].rgb * (pow(cs, 1400.) * .9 + pow(cs, 160.) * .1 + pow(cs, 24.) * .025) * step(0., uP[1].w);
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  c += (hash12(fc) - .5) * (2. / 255.);
  oC = vec4(c, 1.);
}
`;function ta(t,o,U,p){const O=new Float32Array(o**p);for(let M=0;M<O.length;M++)O[M]=U();const c=new Int32Array(t),B=new Int32Array(t),v=new Float32Array(t);for(let M=0;M<t;M++){const z=M/t*o,_=Math.floor(z),R=z-_;c[M]=_%o,B[M]=(_+1)%o,v[M]=R*R*(3-2*R)}const H=new Float32Array(t**p);if(p===2)for(let M=0;M<t;M++){const z=c[M]*o,_=B[M]*o,R=v[M];for(let C=0;C<t;C++){const w=O[z+c[C]]+(O[z+B[C]]-O[z+c[C]])*v[C],Q=O[_+c[C]]+(O[_+B[C]]-O[_+c[C]])*v[C];H[M*t+C]=w+(Q-w)*R}}else{const M=new Float32Array(o*o*t);for(let z=0;z<o;z++)for(let _=0;_<o;_++){const R=(z*o+_)*o,C=(z*o+_)*t;for(let w=0;w<t;w++){const Q=O[R+c[w]];M[C+w]=Q+(O[R+B[w]]-Q)*v[w]}}for(let z=0;z<t;z++){const _=c[z]*o,R=B[z]*o,C=v[z];for(let w=0;w<t;w++){const Q=(_+c[w])*t,J=(_+B[w])*t,ft=(R+c[w])*t,ot=(R+B[w])*t,et=v[w],tt=(z*t+w)*t;for(let S=0;S<t;S++){const K=M[Q+S]+(M[J+S]-M[Q+S])*et,I=M[ft+S]+(M[ot+S]-M[ft+S])*et;H[tt+S]=K+(I-K)*C}}}}return H}function Se(t,o,U,p,O){const c=new Float32Array(t**U);p.forEach((H,M)=>{const z=ta(t,H,o,U);for(let _=0;_<c.length;_++)c[_]+=z[_]*O[M]});let B=1e9,v=-1e9;for(const H of c)H<B&&(B=H),H>v&&(v=H);for(let H=0;H<c.length;H++)c[H]=(c[H]-B)/(v-B);return c}function io(t,o,U){const p=o*o*o,O=new Float32Array(p),c=new Float32Array(p),B=new Float32Array(p);for(let R=0;R<p;R++)O[R]=U(),c[R]=U(),B[R]=U();const v=new Float32Array(t*t*t),H=o/t,M=new Int32Array(t*3),z=new Float32Array(t);for(let R=0;R<t;R++){const C=(R+.5)*H,w=Math.floor(C);z[R]=C-w;for(let Q=0;Q<3;Q++)M[R*3+Q]=(w+Q-1+o)%o}let _=0;for(let R=0;R<t;R++)for(let C=0;C<t;C++){const w=z[R],Q=z[C];for(let J=0;J<t;J++){const ft=z[J];let ot=9;for(let et=0;et<3;et++){const tt=M[R*3+et]*o*o,S=et-1-w;for(let K=0;K<3;K++){const I=tt+M[C*3+K]*o,dt=K-1-Q;for(let it=0;it<3;it++){const wt=I+M[J*3+it],Ut=it-1-ft+O[wt],Z=dt+c[wt],xt=S+B[wt],lt=Ut*Ut+Z*Z+xt*xt;lt<ot&&(ot=lt)}}}v[_++]=1-Math.min(Math.sqrt(ot),1)}}return v}function ea(t){const U=new Uint8Array(262144),p=z=>{const _=new Float32Array(65536);for(const[w,Q]of z){const J=new Float32Array(w*w);for(let ot=0;ot<J.length;ot++)J[ot]=t();const ft=256/w;for(let ot=0;ot<256;ot++){const et=ot/ft,tt=Math.floor(et),S=et-tt,K=S*S*(3-2*S),I=tt%w,dt=(tt+1)%w;for(let it=0;it<256;it++){const wt=it/ft,Ut=Math.floor(wt),Z=wt-Ut,xt=Z*Z*(3-2*Z),lt=Ut%w,Ht=(Ut+1)%w,bt=J[I*w+lt]+(J[I*w+Ht]-J[I*w+lt])*xt,Lt=J[dt*w+lt]+(J[dt*w+Ht]-J[dt*w+lt])*xt;_[ot*256+it]+=(bt+(Lt-bt)*K)*Q}}}let R=1e9,C=-1e9;for(const w of _)w<R&&(R=w),w>C&&(C=w);for(let w=0;w<_.length;w++)_[w]=(_[w]-R)/(C-R);return _},O=p([[4,.45],[8,.28],[16,.17],[32,.1]]),c=p([[8,.5],[16,.3],[32,.2]]),B=p([[32,.45],[64,.35],[128,.2]]),v=16,H=256/v,M=new Float32Array(v*v*2);for(let z=0;z<v*v;z++)M[z*2]=.15+.7*t(),M[z*2+1]=.15+.7*t();for(let z=0;z<256;z++)for(let _=0;_<256;_++){const R=_/H,C=z/H,w=Math.floor(R),Q=Math.floor(C);let J=9;for(let ot=-1;ot<=1;ot++)for(let et=-1;et<=1;et++){const tt=w+et,S=Q+ot,K=(S%v+v)%v*v+(tt%v+v)%v,I=tt+M[K*2]-R,dt=S+M[K*2+1]-C,it=I*I+dt*dt;it<J&&(J=it)}const ft=(z*256+_)*4;U[ft]=O[z*256+_]*255,U[ft+1]=Math.min(1,Math.sqrt(J))*255,U[ft+2]=c[z*256+_]*255,U[ft+3]=B[z*256+_]*255}return U}function oa(t,o){if(t.__c553)return t.__c553;const U=(l,A)=>{const L=t.createShader(l);return t.shaderSource(L,A),t.compileShader(L),L},p={rain:[pe,Vo],cloud:[pe,Oo],comp:[pe,Wo],grass:[Ho,Yo],rib:[jo,Qo],part:[Ko,$o],fin:[pe,Jo],copy:[pe,Zo]},O={};for(const l in p){const A=t.createProgram(),L=U(t.VERTEX_SHADER,p[l][0]),G=U(t.FRAGMENT_SHADER,p[l][1]);t.attachShader(A,L),t.attachShader(A,G),t.linkProgram(A),O[l]={p:A,v:L,f:G}}t.flush();let c=99538259;const B=()=>{c=c+1831565813|0;let l=Math.imul(c^c>>>15,1|c);return l=l+Math.imul(l^l>>>7,61|l)^l,((l^l>>>14)>>>0)/4294967296},v=32,H=[Se(v,B,3,[2,4,8],[.55,.3,.15]),Se(v,B,3,[2,4,8],[.55,.3,.15]),Se(v,B,3,[4,8,16],[.5,.32,.18])],M=io(v,4,B),z=io(v,8,B),_=new Float32Array(v**3);let R=1e9,C=-1e9;for(let l=0;l<_.length;l++){const A=M[l]*.62+z[l]*.38;_[l]=A,A<R&&(R=A),A>C&&(C=A)}const w=new Uint8Array(v**3*4);for(let l=0;l<_.length;l++)w[l*4]=H[0][l]*255,w[l*4+1]=H[1][l]*255,w[l*4+2]=H[2][l]*255,w[l*4+3]=(_[l]-R)/(C-R)*255;t.pixelStorei(t.UNPACK_ALIGNMENT,1);const Q=t.createTexture();t.bindTexture(t.TEXTURE_3D,Q),t.texImage3D(t.TEXTURE_3D,0,t.RGBA8,v,v,v,0,t.RGBA,t.UNSIGNED_BYTE,w),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const l of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,l,t.REPEAT);const J=t.createTexture();t.bindTexture(t.TEXTURE_2D,J),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,ea(B)),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,4);const ft=t.createVertexArray(),ot=[],et=4,tt=[1,2,3.5,5,7,10,14,20,28,40,55,70.2],S=[8,12,16,24,24,32,48,48,48,48,48],K=S.reduce((l,A)=>l+A,0),I=new Float32Array(K*8),dt=new Float32Array(K),it=[];for(let l=0,A=0,L=0;l<S.length;L+=S[l],l++){const G=S[l],yt=tt[l],st=tt[l+1]/Math.cos(Math.PI/G);it.push(L);for(let Et=0;Et<G;Et++){const St=Et/G*2*Math.PI-Math.PI,Gt=(Et+1)/G*2*Math.PI-Math.PI;I.set([Math.sin(St)*yt,Math.cos(St)*yt,Math.sin(Gt)*yt,Math.cos(Gt)*yt,Math.sin(St)*st,Math.cos(St)*st,Math.sin(Gt)*st,Math.cos(Gt)*st],A),A+=8,dt[L+Et]=tt[l+1]}}const wt=(l,A)=>{const L=Math.hypot(l,A);if(L<tt[0])return 0;let G=0;for(;G+1<S.length&&L>=tt[G+1];)G++;return 1+it[G]+Math.min(S[G]-1,Math.floor((Math.atan2(l,A)+Math.PI)/(2*Math.PI)*S[G]))};for(let l=0;l<=et;l++)ot.push(l/et,-1,l/et,1);const Ut=new Uint16Array(zt*et*2*3);for(let l=0,A=0;l<zt;l++)for(let L=0;L<et*2;L++){const G=l*(et+1)*2+L;Ut.set(L&1?[G+1,G,G+2]:[G,G+1,G+2],A),A+=3}const Z=t.createVertexArray();t.bindVertexArray(Z);const xt=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,xt),t.bufferData(t.ELEMENT_ARRAY_BUFFER,Ut,t.STATIC_DRAW),t.bindVertexArray(null);const lt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,lt),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,-1,0,1,1,-1,1,1]),t.STATIC_DRAW);const Ht=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Ht),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const bt=l=>{let A=632147;const L=()=>{A=A+1831565813|0;let T=Math.imul(A^A>>>15,1|A);return T=T+Math.imul(T^T>>>7,61|T)^T,((T^T>>>14)>>>0)/4294967296},G=new Float32Array(l*8);let yt=0;for(;yt<l;){const T=L()<.42,Tt=T?23+47*Math.pow(L(),1.3):.45+23.5*Math.pow(L(),.85),we=L()*6.2832,be=Math.sin(we)*Tt,Ot=Math.cos(we)*Tt,re=(.45+.6*L()*L()+(L()<.1?.35:0))*(T?1.15:1),ne=(.05+.13*L())*(T?.7:1),Bt=T?3+Math.floor(L()*4):6+Math.floor(L()*18),ce=L(),Re=.5+.5*Math.sin(be*.21+Math.sin(Ot*.17)*2)*Math.sin(Ot*.23+Math.sin(be*.13)*2),Ft=L();for(let jt=0;jt<Bt&&yt<l;jt++,yt++){const y=Math.sqrt(L())*ne,gt=L()*6.2832,W=Math.sin(gt)*y,Mt=Math.cos(gt)*y,Wt=.08+1.5*y/ne*(.25+.3*L());G.set([be+W,Ot+Mt,re*(.55+.5*L())*(1-.35*y/ne)*(L()<ce*.75?-1:1),L(),Math.sin(gt)*Wt,Math.cos(gt)*Wt,Ft*.6+L()*.4,Re],yt*8)}}const st=new Uint16Array(l),Et=new Int32Array(K+2),St=new Float32Array(K+1);for(let T=0;T<l;T++){const Tt=wt(G[T*8],G[T*8+1]);st[T]=Tt,Et[Tt+1]++,St[Tt]=Math.max(St[Tt],Math.abs(G[T*8+2]))}for(let T=0;T<=K;T++)Et[T+1]+=Et[T];const Gt=new Float32Array(l*8),ut=Et.slice(0,K+1);for(let T=0;T<l;T++)Gt.set(G.subarray(T*8,T*8+8),ut[st[T]]++*8);const Pt=Math.ceil(l*2/1024),kt=new Float32Array(1024*Pt*4);kt.set(Gt);const N=t.createTexture();return t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,N),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,1024,Pt,0,t.RGBA,t.FLOAT,kt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.activeTexture(t.TEXTURE0),{tex:N,n:l,st:Et,hz:St}},Lt={},Xt=o<=256?2e4:56e3;Lt[Xt]=bt(Xt);const ee=Te+co+Go,Yt=new Float32Array(ee*4);for(let l=0;l<ee*4;l++)Yt[l]=B();const It=t.createTexture(),oe=Math.ceil(ee/1024),Me=new Float32Array(1024*oe*4);Me.set(Yt),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,It),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,1024,oe,0,t.RGBA,t.FLOAT,Me),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.activeTexture(t.TEXTURE0);const ae=new Uint16Array(zt*6);for(let l=0;l<zt;l++)ae.set([l*4,l*4+1,l*4+2,l*4+2,l*4+1,l*4+3],l*6);const se=t.createVertexArray();t.bindVertexArray(se);const ve=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,ve),t.bufferData(t.ELEMENT_ARRAY_BUFFER,ae,t.STATIC_DRAW),t.bindVertexArray(null);const me=!!(t.getExtension("EXT_color_buffer_float")||t.getExtension("EXT_color_buffer_half_float"));for(const l in O){const{p:A,v:L,f:G}=O[l];if(!t.getProgramParameter(A,t.LINK_STATUS))throw new Error("553 "+l+": "+(t.getShaderInfoLog(L)||"")+(t.getShaderInfoLog(G)||"")+t.getProgramInfoLog(A));O[l]={p:A,uP:t.getUniformLocation(A,"uP"),uVP:t.getUniformLocation(A,"uVP"),uGB:t.getUniformLocation(A,"uGB")},t.useProgram(A),t.uniform1i(t.getUniformLocation(A,"uN2"),0),t.uniform1i(t.getUniformLocation(A,"uN3"),1),t.uniform1i(t.getUniformLocation(A,"uC"),2),t.uniform1i(t.getUniformLocation(A,"uGI"),4),t.uniform1i(t.getUniformLocation(A,"uPI"),5),t.uniform1i(t.getUniformLocation(A,"uRI"),6),t.uniform1i(t.getUniformLocation(A,"uS"),l==="fin"?3:2)}return t.__c553={P:O,n3:Q,n2:J,vEmpty:ft,quadBuf:lt,bladeVerts:(et+1)*2,half:me,rts:{},pool:{},fin:typeof FinalizationRegistry=="function"?new FinalizationRegistry(l=>{l.pool.push(l.rt);for(const A of l.tx)t.deleteTexture(A)}):null,grass:Lt,mkGrass:bt,vPart:se,pTex:It,NPT:ee,GKN:K,GQ:I,GR1:dt,vGrass:Z,gIdxN:Ut.length}}function ge(t,o,U,p,O=U,c=!1){const B=U+"x"+O+(p?"d":"c");if(!c&&o.rts[B])return o.rts[B];const v=t.createTexture();t.bindTexture(t.TEXTURE_2D,v),o.half?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,U,O,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,U,O,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const H=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,H),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,v,0),p){const z=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,z),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,U,O),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,z)}t.bindFramebuffer(t.FRAMEBUFFER,null);const M={tex:v,fb:H,w:U};return c?M:o.rts[B]=M}const lo=14,Ma=new Float32Array([0,0,0,-1,0,0,0,-1,0,0,0,0]);no.add({num:553,name:"Savanna Storm",fam:"Vistas",recipe:"An open savanna in the last hour before sunset as the rains start, with a towering storm lit gold by the low sun, acacias and a baobab across the grass and dust glowing in the air. The storm's shape and stage, how far off it is and the trees change every mint. Tap under the storm and its next lightning strikes near there, drag to send a gust through the grass, or hold to bring the rain over you until the sun breaks through.",interactive:"Tap a spot under the storm and its next stroke of lightning comes down near there, in the storm's own time (thunder rolls in seconds later). Drag to send a gust front across the grass: a wave runs through the stalks. Hold to bring the rain over you: the curtain sweeps across the plain, the light goes coppery, the first fat drops raise puffs of dust, then the sun breaks through behind the rain.",music:!0,gl:!0,fps:30,seed:0,make(t){const o=t.gl,U=t.size,p=oa(o,U);let O=0;for(let e=2;e<66;e+=8)O=Math.imul(O^parseInt(t.hash.slice(e,e+8),16),2654435761)+2135587861|0;const c=()=>{O=O+1831565813|0;let e=Math.imul(O^O>>>15,1|O);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},B=e=>{let a=c(),n=0;for(const[u,s]of e)if(n+=s,a<n)return u;return e[e.length-1][0]},v=t.home,H=v?"Lone thunderhead":B([["Lone thunderhead",.4],["Flanking line",.32],["Twin cells",.18],["Mammatus evening",.1]]),M=v?"Last hour":B([["Last hour",.5],["Sun on the escarpment",.3],["Late afternoon",.2]]),z=v?"Double":B([["Double",.55],["Single",.3],["Supernumerary fringes",.15]]),_=v?"Giraffe line":B([["Giraffe line",.35],["Zebra and wildebeest",.35],["Giraffes and zebra",.2],["Elephants",.1]]),R=v?"Acacias and a baobab":B([["Acacias and a baobab",.5],["Open plain, one baobab",.25],["Acacia woodland edge",.25]]),C=v?"Red oat grass":B([["Red oat grass",.5],["Tall dry stalks",.3],["Burnt and greening",.2]]),w=v?"Steady breeze":B([["Steady breeze",.5],["Gusty",.35],["Dust in the air",.15]]);let Q=492124935;for(let e=2;e<66;e+=8)Q=Math.imul(Q^parseInt(t.hash.slice(e,e+8),16),3266489909)^Q>>>15;const J=()=>{Q=Q+1831565813|0;let e=Math.imul(Q^Q>>>15,1|Q);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ft=J(),ot=J(),et=v||ft<.55?"Over your right shoulder":"Over your left shoulder",tt=et!=="Over your right shoulder",S=v||ot<.62?"mid":ot<.88?"close":"far";let K=1429516517;for(let e=2;e<66;e+=8)K=Math.imul(K^parseInt(t.hash.slice(e,e+8),16),374761393)^K>>>13;const I=()=>{K=K+1831565813|0;let e=Math.imul(K^K>>>15,1|K);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},dt=I(),it=I(),wt=I(),Ut=I(),Z=[];for(let e=0;e<12;e++)Z.push(I());const xt=v||dt<.6?"Mature cell":dt<.72?"Far curtains":dt<.84?"After the storm":dt<.94?"Far curtains":"Dusk cell",lt=xt==="Dusk cell",Ht=!v&&Ut<.05,bt="Facing the storm";let Lt=v?"Double":wt<.8?"None":wt<.87?"A foot in the rain":wt<.91?"Single":wt<.97?"Double":wt<.99?"Supernumerary fringes":"Double";!v&&!(xt==="Mature cell"&&S!=="far"&&bt==="Facing the storm")&&(Lt="None"),t.trait("Stage",xt),t.trait("Rainbow",Lt),t.trait("Storm",S==="mid"?H:H+(S==="close"?", rain closing in":", far off")),t.trait("Hour",lt?"After sunset":M),t.trait("Trees",R),t.trait("Grass",Ht?"First flush":C),t.trait("Wind",w);let Xt=1430202897;for(let e=2;e<66;e+=8)Xt=Math.imul(Xt^parseInt(t.hash.slice(e,e+8),16),2246822507)^Xt>>>13;const ee=()=>{Xt=Xt+1831565813|0;let e=Math.imul(Xt^Xt>>>15,1|Xt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Yt=v?"Bow on the right":(()=>{const e=ee();return e<.4?"Bow on the right":e<.7?"Tower dead ahead":e<.88?"Wide under the anvil":"Long lens on the bow"})(),It=S==="far"?v||Z[5]<.5?[.34,.12,22]:[.3,.2,36]:S==="close"?{"Bow on the right":[.12,.27,40],"Tower dead ahead":[-.45,.45,40],"Wide under the anvil":[-.08,.52,42],"Long lens on the bow":[.42,.1,17]}[Yt]:{"Bow on the right":[.2,.13,36],"Tower dead ahead":[-.12,.15,36],"Wide under the anvil":[.12,.3,37.5],"Long lens on the bow":[.44,.06,17]}[Yt],oe=tt?[-It[0],It[1],It[2]]:It,Me=S==="far"&&It[2]<30,ae=tt?"left":"right",se=Lt!=="None";t.trait("Framing",bt==="Toward the sunset"?"Wide, into the sun":bt==="Under an acacia"?"Wide, under the crown":S==="far"?Me?"Long lens on the far cell":"Wide on the far cell":Yt==="Bow on the right"?(se?"Bow on the ":"Rain on the ")+ae:Yt==="Long lens on the bow"?se?Yt:"Long lens on the rain's foot":Yt);const ve=!v&&!se&&Z[3]<.34?.87+.53*Z[4]:0,me=w==="Dust in the air",l=Ht||C==="Red oat grass"?0:C==="Tall dry stalks"?1:2;t.trait("Standpoint",bt==="Toward the sunset"?bt:bt+(ve?", the sun low on your ":", sun over your ")+(ve?ae:ae+" shoulder"));const L=(lt?-1.6+c()*.01:{"Last hour":5.5,"Sun on the escarpment":1.1,"Late afternoon":21}[M]+(c()-.5)*1.2)*Math.PI/180;let G=Math.PI-.3+(c()-.5)*.06-ve;const yt=[Math.sin(G)*Math.cos(L),Math.sin(L),Math.cos(G)*Math.cos(L)],st=lt?{zen:[.018,.025,.07],mid:[.06,.06,.13],hs:[.9,.32,.12],ha:[.13,.1,.17],sun:[2.3,.8,.3],amb:[.035,.04,.075],bn:[.02,.016,.014],exp:1.5}:M==="Sun on the escarpment"?{zen:[.04,.07,.17],mid:[.15,.17,.28],hs:[1.7,.66,.2],ha:[.4,.28,.32],sun:[2.5,1,.32],amb:[.07,.08,.13],bn:[.12,.07,.035],exp:1.12}:M==="Late afternoon"?{zen:[.035,.1,.32],mid:[.16,.28,.5],hs:[1,.95,.78],ha:[.36,.42,.56],sun:[2.6,2.3,1.85],amb:[.08,.12,.2],bn:[.13,.115,.085],exp:.82}:{zen:[.05,.1,.26],mid:[.17,.24,.4],hs:[1.5,.8,.32],ha:[.36,.32,.38],sun:[2.6,1.42,.62],amb:[.08,.1,.16],bn:[.12,.095,.06],exp:1};me&&(st.hs=st.hs.map((e,a)=>e*[1.1,.95,.7][a]),st.ha=st.ha.map((e,a)=>e*[1.25,1.05,.8][a]),st.sun=st.sun.map((e,a)=>e*[1,.88,.7][a]));const Et=Ht?[.2,.36,.09]:[[.54,.47,.3],[.66,.59,.4],[.2,.34,.08]][l],St=Ht?[.3,.36,.12]:[[.44,.27,.14],[.62,.52,.34],[.3,.3,.12]][l],Gt=[.3,.21,.15],ut=1.75+c()*.35;let Pt=-.12+(c()-.5)*.05,kt=23+c()*3;if(S!=="mid"){const e=Pt+Math.atan2(8.663,kt-8.898);kt*=S==="close"?.56:1.7,Pt=e-Math.atan2(8.663,kt-8.898)}const N=[Math.sin(Pt)*kt,Math.cos(Pt)*kt],T=[],Tt=(e,a,n,u)=>T.push([N[0]+e+.06*n+(c()-.5)*.6,ut+n,N[1]+a+(c()-.5)*.6,u*(.92+.16*c())]),we=v||Z[0]<.34?"massif":Z[0]<.56?"tall":Z[0]<.78?"three":"leaning",be={massif:[[0,0,2.2,4.4],[.3,.2,5,4.1],[.6,0,7.6,3.5],[.9,-.2,9.6,2.7],[1.1,-.4,10.9,1.9],[-3.6,-1,2,3.1],[3.3,-.8,3,3],[-2.7,-1.4,5.6,2.6],[2.6,-.6,7,2.5],[-1.7,-.9,8.4,2.3]],tall:[[0,0,2,3],[.2,.1,4.6,2.8],[.4,0,7.2,2.6],[.6,-.1,9.5,2.25],[.8,-.2,11.2,1.75],[-2.5,-.6,1.5,2],[2.3,-.4,1.9,2],[-1.6,-.8,4.2,1.7],[1.7,-.5,5.6,1.6],[-.9,-.5,8.2,1.6]],three:[[0,0,2.2,3.6],[.3,.1,5.4,3.2],[.6,0,8.4,2.6],[.8,-.2,10.4,1.9],[-5.6,-1.6,2,3],[-5.3,-1.6,4.9,2.6],[-5.1,-1.7,7.1,2],[5.2,-.8,2,3.1],[5.4,-.8,4.8,2.7],[5.6,-.9,7.6,2.1]],leaning:[[0,0,2.2,4],[1,.1,4.9,3.5],[2.1,0,7.3,2.9],[3.2,-.2,9.3,2.3],[4.2,-.4,10.7,1.7],[-3,-1,2,2.8],[3.4,-.8,2.6,2.6],[-1.8,-1.2,5,2.3],[3.8,-.6,6.3,2.1],[.4,-.9,8,2]]};for(const e of be[we])Tt(e[0],e[1],e[2],e[3]);if(H==="Flanking line")Tt(-6.6,-3.4,2.4,2.4),Tt(-9.6,-5.4,1.4,1.8);else if(H==="Twin cells"){Tt(9,5,1.8,2.8),Tt(9.3,5.1,4.4,2.4);const e=[[9.5,5,6.6,1.9],[9.7,4.9,8.1,1.4],[4.6,2.4,.9,2.4]];for(let a=0;a<3;a++){const n=T[7+a],u=e[a];n[0]=N[0]+u[0]+.06*u[2],n[1]=ut+u[2],n[2]=N[1]+u[1],n[3]=u[3]}}else Tt(-6,-2.2,1.4,2.2),Tt(5.4,-1.4,1.6,2.2);let Ot=H==="Mammatus evening",re=ut+9.4,ne=13.4+c()*.5;const Bt=[N[0]/kt,N[1]/kt],ce=[Bt[1]-.45*Bt[0],-Bt[0]-.45*Bt[1]],Re=Math.hypot(ce[0],ce[1]),Ft=[ce[0]/Re,ce[1]/Re],jt=e=>{const a=[Bt[1]-e*Bt[0],-Bt[0]-e*Bt[1]],n=Math.hypot(a[0],a[1]);return[a[0]/n,a[1]/n]},y=Ot?{c:[N[0]+1.4,N[1]-.6],ad:jt(.75),R:21,asp:4.6,up:3.2}:{c:[N[0]+1.5,N[1]-.3],ad:jt(.22),R:19,asp:3.1,up:2.8};if(!v&&!Ot){const e=Z[1],a=.7+.6*Z[2];e<.35?(y.R=19*a,y.asp=3.1/Math.sqrt(a)):e<.58?(y.ad=jt(.75),y.R=21*a,y.asp=4.2,y.up=3.2):e<.78?(y.ad=jt(-2.5),y.R=12*a,y.asp=4.6,y.c=[N[0]+.5,N[1]+.6]):Z[2]<.5?(y.R=11,y.asp=4.4,y.up=3.4):(y.R=28,y.asp=2.2,y.up=2.2),we==="tall"&&e<.35&&(y.R*=.6,y.asp*=.8)}const gt=Ft,W=[N[0]+Ft[0]*9.5-Bt[0]*5,N[1]+Ft[1]*9.5-Bt[1]*5];let Mt=9,Wt=3.4;const aa=ut-.15;let Be=Math.atan2(N[0],N[1]);const Y={veil:.05,wet:0,puddle:0,rain:1,floor:.55,bowTop:ut+.25,hs:0,chord:1,shelf:1,gap:-9,shTop:.9,flat:0},pt=[Math.cos(Pt),-Math.sin(Pt)],sa=(e,a,n,u,s,h)=>{T.length=0;for(let f=0;f<e;f++){const r=(f-(e-1)/2)*a*(.8+.4*I()),i=n*(.88+.24*I()),d=h*(.6+.55*I()),x=Math.sin(Pt)*i+pt[0]*r,m=Math.cos(Pt)*i+pt[1]*r;for(let P=0;P<u.length;P++){const b=s[P]*(.75+.3*d);T.push([x+(I()-.5)*1.5*(P>0)+.1*u[P]*d,ut+(P?u[P]*d:b*.45),m+(I()-.5)*1.2,b])}}};if(xt==="Far curtains"){Y.veil=0,Y.rain=1.4,Ft[0]=pt[0],Ft[1]=pt[1],Mt=18,Wt=2.6;const e=S==="far"?1.6:1;W[0]=(Math.sin(Pt)*11+pt[0]*4)*e,W[1]=(Math.cos(Pt)*11+pt[1]*4)*e;const a=I()<.3?2:3,n=Ot?7.4+.5*I():6+1.8*I(),u=a===3?[n,n*(.62+.14*I()),n*(.44+.1*I())]:[n,n*(.55+.16*I())],s=a===3?[5,4,3]:[5,7],h=Math.hypot(W[0],W[1]),f=[W[0]/h,W[1]/h],r=(6+3*I())*e,i=[],d=[W[0]+f[0]*r,W[1]+f[1]*r],x=It[0]+(I()-.5)*.22*(It[2]/36),m=Math.sin(x),P=Math.cos(x),b=qt((P*d[0]-m*d[1])/(m*pt[1]-P*pt[0]),-9,9),D=6.2+1.2*I(),k=I()<.5?-1:1,g=a===3?[b,b+k*D,b-k*D*(.9+.2*I())]:[b,b+k*D],V=g.map((mt,Jt)=>Jt);T.length=0;for(let mt=0;mt<a;mt++){const Jt=g[V[mt]]+(I()-.5)*1.6,so=u[mt],Ie=s[mt],ro=(2.3+.12*so)*(Ie>5?1.1:mt?1:1.12);i.push(Jt);const Ta=W[0]+pt[0]*Jt+f[0]*r,ga=W[1]+pt[1]*Jt+f[1]*r;for(let Pe=0;Pe<Ie;Pe++){const xe=Pe/(Ie-1),Bo=ro*(mt||!Ot?1-.42*xe:1-.16*xe+.14*xe*xe*xe),Co=Pe===Ie-1?so-Bo:ro*.45+(so-ro*1.03)*xe,qo=(Pe>0)*(mt?.4:.55);T.push([Ta+(I()-.5)*qo+.05*Co,ut+Co,ga+(I()-.5)*qo,Bo])}}const E=i.slice().sort((mt,Jt)=>mt-Jt),j=[E[0]-4.6,E[E.length-1]+4.6].map(mt=>mt*h/(h+r)),at=j.map(mt=>Math.abs(Math.atan2(W[0]+pt[0]*mt,W[1]+pt[1]*mt)-It[0])),Ct=i[0],ao=E[0]!==Ct,Ea=E[E.length-1]!==Ct,Pa=qt(ao&&(!Ea||at[0]<at[1])?j[0]:j[1],-Mt*.62,Mt*.62);Y.gap=(Pa+Mt*.7)/(Mt*1.4),Y.shTop=.5,Y.flat=.35,N[0]=T[0][0],N[1]=T[0][2],y.c[0]=N[0]+.5,y.c[1]=N[1],y.ad=jt(.05),y.R=17,y.asp=2.6,y.up=1.5,re=Ot?ut+n-.45:40,ne=re+1.25+.3*I()}else if(xt==="Line on the horizon")sa(6,5.5,kt*2.3,[0,5.4],[3.9,3.3],1.2),Y.chord=0,y.c[0]=T[0][0],y.c[1]=T[0][2],y.ad=[pt[0],pt[1]],y.R=52,y.asp=4.5,y.up=2.4,re=ut+8.6,Ft[0]=pt[0],Ft[1]=pt[1],Mt=24,Wt=3,Y.veil=.2,W[0]=Math.sin(Pt)*kt*2.2,W[1]=Math.cos(Pt)*kt*2.2;else if(xt==="After the storm"){for(const e of T)e[0]+=N[0]*.6,e[2]+=N[1]*.6;y.c[0]=N[0]*1.6+1.4,y.c[1]=N[1]*1.6,y.ad=jt(.75),y.R=24,y.asp=4.8,y.up=3.2,W[0]=N[0]*1.45,W[1]=N[1]*1.45,Mt=7,Y.rain=.7,Y.wet=1,Y.puddle=1,Y.shelf=0,Y.veil=.25,N[0]*=1.6,N[1]*=1.6}else lt&&(Y.floor=0,Y.hs=5.5);let ie=oe[0],Ae=oe[1],Rt=Math.tan(oe[2]*Math.PI/180);if(Lt==="Whole arch"){const e=G+Math.PI,a=Math.sin(e),n=Math.cos(e);W[0]=a*4.6,W[1]=n*4.6,Ft[0]=n,Ft[1]=-a,Mt=9,Wt=2.2,ie=tt?-e:e,Ae=.34,Rt=Math.tan(46*Math.PI/180)}bt==="Toward the sunset"?(ie=(tt?-1:1)*(G+(it-.86)*2.5),Ae=.08,Rt=Math.tan(31*Math.PI/180)):bt==="Under an acacia"&&(Ae=.2,Rt=Math.tan(40*Math.PI/180));const uo=Lt==="None"?0:1,ra=/Double|fringes|Whole/.test(Lt)?1:0,na=Lt==="Supernumerary fringes"?1:0,Ce=uo&&Lt!=="A foot in the rain"?v?5:S==="close"?2.4+.8*Z[10]:4.5+Z[10]:0;Ce&&(Y.bowTop=Ce-.3),Lt==="A foot in the rain"&&(Y.bowTop=ut*(.35+.5*qt((wt-.8)/.07,0,1)));const qe=w==="Gusty"?9:me?8:6,ho=1.6;if(tt){yt[0]=-yt[0],G=-G,Be=-Be,N[0]=-N[0],W[0]=-W[0];for(const e of T)e[0]=-e[0];Ft[0]=-Ft[0],y.c[0]=-y.c[0],y.ad[0]=-y.ad[0]}const le=T[0],ze=T[4],Xe=Math.max(ze[1]-le[1],1),fo=[(ze[0]-le[0])/Xe,(ze[2]-le[2])/Xe],xo=Math.max((le[3]-ze[3])/Xe,0),ca=Y.chord?le[3]+xo*(le[1]-ut):0,ia=Math.max(...T.slice(0,5).map(e=>e[1]+e[3])),_t=xt==="Far curtains"||xt==="Line on the horizon"?{a:[W[0]-gt[0]*Mt*.7,W[1]-gt[1]*Mt*.7],b:[W[0]+gt[0]*Mt*.7,W[1]+gt[1]*Mt*.7],w:Wt+.7}:{a:[N[0],N[1]],b:[W[0],W[1]],w:Wt+.6},la=me?.022+.008*Z[11]:.009,Le=v?[0,0,.6435,1]:[Z[6]*250,Z[7]*55,(tt?Math.PI-.6435:.6435)+(Z[8]-.5)*2.4,Z[9]<.2?0:.3+.32*Z[9]],Qt=[],Nt=(e,a,n,u,s,h=0)=>Qt.push(e[0],e[1],e[2],n,a[0],a[1],a[2],u,s[0],s[1],s[2],h),ue=(e,a)=>[Math.sin(e)*a,Math.cos(e)*a];let q=c;const po=(e,a,n,u)=>{const s=[.1,.08,.065].map(b=>b*(.85+.3*q())),h=1.3+q()*1.3,f=[e+(q()-.5)*.6,h,a+(q()-.5)*.6];Nt([e,-.15,a],f,.22+n*.025,.2+n*.015,s);const r=4+Math.floor(q()*3),i=q()<.4?2:1,d=e+(q()-.5)*u*.5,x=a+(q()-.5)*u*.5;for(let b=0;b<r;b++){const D=b/r*6.283+q()*.8,k=u*(.35+.4*q()),g=[d+Math.cos(D)*k,n-.7-q()*.9,x+Math.sin(D)*k];let V=f;for(let E=1;E<=3;E++){const j=E/3,at=[f[0]+(g[0]-f[0])*j+(q()-.5)*.7,f[1]+(g[1]-f[1])*Math.pow(j,.75)+(q()-.5)*.3,f[2]+(g[2]-f[2])*j+(q()-.5)*.7];Nt(V,at,.3*(1-j*.5)+.04,.26*(1-j*.6)+.04,s),V=at}for(let E=0;E<4;E++){const j=q()*6.283,at=1+q()*2.2;Nt(V,[V[0]+Math.cos(j)*at,V[1]+.25+q()*.5,V[2]+Math.sin(j)*at],.06,.03,s)}}const m=[[.11,.13,.05],[.13,.12,.05],[.09,.11,.045]][Math.floor(q()*3)],P=22+Math.floor(u*3.5);for(let b=0;b<P;b++){const D=u*Math.sqrt(q()),k=q()*6.283,g=i===2&&q()<.35?1:0,V=d+Math.cos(k)*D*(1-g*.4),E=x+Math.sin(k)*D*(1-g*.4),j=n-g*1.5-(D/u)**2*.5-q()*.35,at=q()*6.283,Ct=(1.4+q()*2.6)*(g?.7:1);Nt([V-Math.cos(at)*Ct/2,j,E-Math.sin(at)*Ct/2],[V+Math.cos(at)*Ct/2,j+(q()-.5)*.25,E+Math.sin(at)*Ct/2],.8+q()*.8,.7+q()*.8,m.map(ao=>ao*(.8+.4*q())),4)}},ua=(e,a,n)=>{const u=[.16,.15,.145],s=n*.32,h=()=>u.map(r=>r*(.85+.25*c()));for(let r=-1;r<=1;r++){const i=r*s*.17,d=(c()-.5)*s*.12,x=h();Nt([e+i,-.3,a+d],[e+i*.9,n*.2,a+d],s*(r?.6:.74),s*(r?.66:.84),x),Nt([e+i*.9,n*.2,a+d],[e+i*.35,n*.5,a+d*.4],s*(r?.66:.84),s*(r?.36:.5),x)}const f=[e,n*.47,a];for(let r=0;r<9;r++){const i=r/9*6.283+c()*.5,d=.15+c()*.55,x=n*(.17+.13*c()),m=h(),P=[f[0]+Math.cos(i)*s*.18,f[1]+c()*n*.04,f[2]+Math.sin(i)*s*.18],b=[P[0]+Math.cos(i)*Math.cos(d)*x*.55,P[1]+Math.sin(d)*x*.55,P[2]+Math.sin(i)*Math.cos(d)*x*.55],D=i+(c()-.5)*.9,k=d+.3+c()*.3,g=[b[0]+Math.cos(D)*Math.cos(k)*x*.5,b[1]+Math.sin(k)*x*.5,b[2]+Math.sin(D)*Math.cos(k)*x*.5];Nt(P,b,s*.2,s*.13,m),Nt(b,g,s*.13,s*.065,m);for(let V=0;V<3;V++){const E=D+(c()-.5)*2.2,j=[g[0]+Math.cos(E)*x*.3,g[1]+x*(.1+.22*c()),g[2]+Math.sin(E)*x*.3];Nt(g,j,s*.05,s*.02,m);const at=E+(c()-.5)*2;Nt(j,[j[0]+Math.cos(at)*x*.18,j[1]+x*(.05+.12*c()),j[2]+Math.sin(at)*x*.18],.14,.05,m)}}},nt=(e,a,n,u)=>{const[s,h]=ue(e,a);po(s,h,n,u)};if(R!=="Open plain, one baobab"){nt(.66,68,7.5,6.5),nt(.18,260,6.5,5),nt(.98,170,7,5.5),nt(.3,900,6,5),nt(3,110,7,6),nt(3.5,240,6.5,5),nt(2.6,400,7,6),nt(1.6,180,6.5,5.5),nt(2,600,7,6),nt(-1.3,130,6,5),nt(-.9,500,7,6),nt(-2.2,260,6.5,5);for(let e=0;e<6;e++)nt(c()*6.283,300+c()*1200,5.5+c()*2.5,4+c()*3)}else nt(1.4,600,6.5,5),nt(3.3,350,7,6),nt(-1.8,800,6,5);if(R==="Acacia woodland edge")for(let e=0;e<26;e++)nt(-2.6+c()*2.4,140+c()*700,5.5+c()*3,4+c()*3.5);{const[e,a]=ue(-.05+(c()-.5)*.08,300+c()*60);ua(e,a,17+c()*3)}for(let e=0;e<160;e++){const a=c()*6.283,n=35+900*Math.pow(c(),1.6),[u,s]=ue(a,n),h=.5+c()*1.1,f=.8+c()*1.6,r=[.07,.08,.035].map(i=>i*(.7+.6*c()));for(let i=0;i<3;i++){const d=(i-1)*f*.35,x=c()*6.283;Nt([u+d*Math.cos(x),h*(.35+.2*c()),s+d*Math.sin(x)],[u+d*Math.cos(x)+.3,h*(.45+.2*c()),s+d*Math.sin(x)],h*(.7+.4*c()),h*.6,r,4)}}if(bt==="Under an acacia"){q=I;const[e,a]=ue(It[0]-.55,4.2);po(e,a,6.4,7.5),q=c}const vo=(e,a,n,u)=>{const s=[.16,.12,.095].map(r=>r*(.85+.3*q())),h=(q()-.5)*.3*n,f=(q()-.5)*.3*n;Nt([e,-.4,a],[e+h,n,a+f],u*1.9,u*.3,s),q()<.6&&Nt([e+h*.3,n*.3,a+f*.3],[e+h*.3+(q()-.5)*u*1.6,n*.62,a+f*.3+(q()-.5)*u*1.6],u*.8,u*.25,s)};for(let e=0;e<12;e++){const[a,n]=ue(c()*6.283,120+500*Math.pow(c(),1.3));vo(a,n,1.8+c()*2.2,.7+c()*.5)}{let e=1429896729;for(let s=2;s<66;s+=8)e=Math.imul(e^parseInt(t.hash.slice(s,s+8),16),668265263)^e>>>16;const a=()=>{e=e+1831565813|0;let s=Math.imul(e^e>>>15,1|e);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296};q=a;const n=s=>!v||Math.abs(Math.atan2(Math.sin(s-ie),Math.cos(s-ie)))>1.05,u=R==="Open plain, one baobab"?6:R==="Acacia woodland edge"?34:22;for(let s=0;s<u;s++){const h=Math.floor(s/3),f=(h*2.39996+.7)%6.283,r=260+h*977%1700,i=f+(a()-.5)*.16,d=r*(.85+.3*a()),x=5+a()*3,m=3.8+a()*3;n(i)&&nt(i,d,x,m)}for(let s=0;s<140;s++){const h=a()*6.283,f=220+2600*Math.pow(a(),1.4),r=.7+a()*1.6,i=1.5+a()*3.5,d=n(h),x=[.07,.08,.035].map(m=>m*(.65+.6*a()));for(let m=0;m<3;m++){const P=(m-1)*i*.35,b=a()*6.283,D=r*(.35+.2*a()),k=r*(.45+.2*a()),g=r*(.7+.4*a());d&&Nt([Math.sin(h)*f+P*Math.cos(b),D,Math.cos(h)*f+P*Math.sin(b)],[Math.sin(h)*f+P*Math.cos(b)+.3,k,Math.cos(h)*f+P*Math.sin(b)],g,r*.6,x,4)}}for(let s=0;s<26;s++){const h=a()*6.283,f=200+1100*Math.pow(a(),1.2),r=2+a()*2.6,i=.8+a()*.6;if(n(h)){const[d,x]=ue(h,f);vo(d,x,r,i)}}q=c}if(tt)for(let e=0;e<Qt.length;e+=12)Qt[e]=-Qt[e],Qt[e+4]=-Qt[e+4];const Ge=Qt.length/12,mo=0,wo=Ge;new Float32Array(wo*12).set(Qt);const bo=(e,a)=>{const n=o.createTexture();return o.activeTexture(o.TEXTURE6),o.bindTexture(o.TEXTURE_2D,n),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,1024,e,0,o.RGBA,o.FLOAT,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.activeTexture(o.TEXTURE0),n},yo=(e,a,n,u)=>{if(u<=n)return;const s=n*3>>10,h=(u*3-1>>10)+1;o.activeTexture(o.TEXTURE6),o.bindTexture(o.TEXTURE_2D,e),o.texSubImage2D(o.TEXTURE_2D,0,0,s,1024,h-s,o.RGBA,o.FLOAT,a,s*4096),o.activeTexture(o.TEXTURE0)},Eo=Math.max(1,Math.ceil(wo*3/1024)),Ve=new Float32Array(Eo*4096),Oe=bo(Eo,Ve),Po=900,To=Math.ceil(Po*3/1024),We=new Float32Array(To*4096),He=bo(To,We),_e=U<=256?2e4:56e3;p.grass[_e]||(p.grass[_e]=p.mkGrass(_e));const Ne=p.grass[_e],At=Math.min(416,U),go=p.pool[At]||(p.pool[At]=[]),Ye=go.pop()||ge(o,p,At,!1,At,!0),Mo=ge(o,p,At,!1,At/2),Ro=p.rts["R"+At]||(p.rts["R"+At]=ge(o,p,At,!1,At/2,!0)),Ao=ge(o,p,U,!0);let zo=0;const ha=p.half?1:.25,rt=new Float32Array(te*4);let fa=0;const $t=new Float32Array(16),da=new Float32Array(25),X={eye:[0,ho,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let ht=0,ct=0,Kt=0,vt=null,Vt=null,he=null,ye=6+c()*16,Lo=1.5+c()*4,ke=c()<.5?1:0,Ee=null;const fe=[];let $=null,je=!1,Qe=0,Ke=0;const _o=()=>{const e=t.view||Xo,a=ie+(e.yaw||0),n=qt(Ae+(e.pitch||0),-1.35,1.45);let u=e.x||0,s=e.z||0;const h=Math.hypot(u,s);h>8&&(u*=8/h,s*=8/h),X.eye=[u,qt(ho+(e.y||0),.4,3),s];const f=Math.cos(n);X.fw=[Math.sin(a)*f,Math.sin(n),Math.cos(a)*f],X.rt=[Math.cos(a),0,-Math.sin(a)];const r=X.fw,i=X.rt;X.up=[r[1]*i[2]-r[2]*i[1],r[2]*i[0]-r[0]*i[2],r[0]*i[1]-r[1]*i[0]];const d=.05,x=6e4,m=(x+d)/(x-d),P=-2*x*d/(x-d),b=X.eye,D=X.up,k=V=>V[0]*b[0]+V[1]*b[1]+V[2]*b[2],g=[[i[0]/Rt,i[1]/Rt,i[2]/Rt,-k(i)/Rt],[D[0]/Rt,D[1]/Rt,D[2]/Rt,-k(D)/Rt],[r[0]*m,r[1]*m,r[2]*m,-k(r)*m+P],[r[0],r[1],r[2],-k(r)]];for(let V=0;V<4;V++)for(let E=0;E<4;E++)$t[E*4+V]=g[V][E]},$e=(e,a)=>{const n=e*2-1,u=1-a*2,s=[0,1,2].map(f=>X.fw[f]+(n*X.rt[f]+u*X.up[f])*Rt),h=Math.hypot(s[0],s[1],s[2]);return s.map(f=>f/h)},xa=e=>e*e*(3-2*e),Ze=()=>{const e=xa(qt(ct,0,1));return{c:[W[0]+(.5-W[0])*e,W[1]+(4-W[1])*e],A:Mt,B:Wt+(5-Wt)*e}};let de=0;const Je=(e,a,n,u,s)=>{de>=Po||(We.set([e[0]*1e3,e[1]*1e3,e[2]*1e3,n,a[0]*1e3,a[1]*1e3,a[2]*1e3,n*.8,u,0,0,s],de*12),de++)},No=(e,a,n,u)=>{let s=[e,a];for(let h=0;h<n;h++){const f=[s[0]];for(let r=1;r<s.length;r++){const i=s[r-1],d=s[r],x=Math.hypot(d[0]-i[0],d[1]-i[1],d[2]-i[2])*u;f.push([(i[0]+d[0])/2+(c()-.5)*x,(i[1]+d[1])/2+(c()-.5)*x*.5,(i[2]+d[2])/2+(c()-.5)*x],d)}s=f}return s},ko=(e,a)=>{const n=Ze(),u=Math.hypot(e-n.c[0],a-n.c[1]),s=Math.hypot(e-N[0],a-N[1]);let h=e,f=a;if(u>n.A&&s>4){const m=u<s?[n.c,u,n.A*.8]:[N,s,3],P=1-m[2]/m[1];h=e+(m[0][0]-e)*P,f=a+(m[0][1]-a)*P}const r=[h+(c()-.5)*.4,ut+.05,f+(c()-.5)*.4],i=[e,0,a];de=0;const d=No(r,i,7,.36);for(let m=1;m<d.length;m++)Je(d[m-1],d[m],3.5,1,2);for(let m=1;m<d.length;m+=3)Je(d[Math.max(0,m-3)],d[m],140,.9,3);for(let m=0;m<6;m++){const P=d[Math.floor((.05+.6*c())*(d.length-1))],b=.2+c()*.55,D=c()*6.283,k=[P[0]+Math.cos(D)*b,Math.max(.02,P[1]-b*(.5+c()*.6)),P[2]+Math.sin(D)*b],g=No(P,k,5,.42),V=.25+c()*.35;for(let E=1;E<g.length;E++)Je(g[E-1],g[E],2,V*(1-.6*E/g.length),2)}yo(He,We,0,de);const x=Math.hypot(e-X.eye[0]*.001,a-X.eye[2]*.001,.5);Vt={t0:ht,A:r,B:i,n:de,peak:4.5,strokes:[0,.07+c()*.05,.16+c()*.1].slice(0,2+(c()<.5?1:0))},fe.push({at:ht+Math.min(x*2.9,30),v:qt(1.3/(1+x/3),.08,1),dist:x})},pa=(e,a)=>{const n=$e(e,a),u=X.eye[0]*.001,s=X.eye[2]*.001,h=Math.hypot(n[0],n[2])||1;let f=n[1]<-.0015?X.eye[1]*.001/-n[1]:ut/Math.max(n[1],.03);f=qt(f,1.2,S==="far"?Math.hypot(W[0],W[1])+4:14),Ee=[u+n[0]/h*f,s+n[2]/h*f],ye=Math.min(ye,ht+2.5+c()*4.5)};let Fe=Ge,to=null;const va=Ve,ma=new Float32Array(20),Fo=()=>{if(to&&to.every((f,r)=>f===$t[r]))return;to=Float32Array.from($t);const e=$t,a=ma,n=X.eye,u=2*Rt/U*.8,s=[[1,0],[-1,0],[1,1],[-1,1],[-1,2]];for(let f=0;f<5;f++){const r=s[f][0],i=s[f][1],d=r*e[i]-e[3],x=r*e[4+i]-e[7],m=r*e[8+i]-e[11],P=Math.hypot(d,x,m)||1;a[f*4]=d/P,a[f*4+1]=x/P,a[f*4+2]=m/P,a[f*4+3]=(r*e[12+i]-e[15])/P}let h=0;for(let f=0;f<Ge;f++){const r=f*12,i=Qt,d=(i[r]+i[r+4])*.5,x=(i[r+1]+i[r+5])*.5,m=(i[r+2]+i[r+6])*.5,P=Math.hypot(i[r+4]-i[r],i[r+5]-i[r+1],i[r+6]-i[r+2])*.5,b=Math.hypot(d-n[0],x-n[1],m-n[2])+P,D=P+.7072*Math.max(Math.abs(i[r+3]),Math.abs(i[r+7]),b*u)+.01+b*.002;let k=!0;for(let g=0;g<20&&k;g+=4)a[g]*d+a[g+1]*x+a[g+2]*m+a[g+3]>D&&(k=!1);if(k){for(let g=0;g<12;g++)va[h*12+g]=i[r+g];h++}}Fe=h,yo(Oe,Ve,0,Fe)},wa=[0,0,0],ba=[1,.5,.26],De=[Math.cos(-.35),Math.sin(-.35)];tt&&(De[0]=-De[0]);const F=(e,a,n,u,s)=>{rt[e*4]=a,rt[e*4+1]=n,rt[e*4+2]=u,rt[e*4+3]=s},Ue=(e,a,n)=>e<0?0:(1-Math.exp(-e/a))*Math.exp(-e/n),Do=()=>{const e=qe*(1+.6*ct),a=qt((ct-.2)/.6,0,1)*(1-Kt),n=qt((ct-.55)/.35,0,1),u=wa;for(let E=0;E<3;E++)u[E]=st.sun[E]*(1+(ba[E]*.72-1)*a)*(1+.2*Kt);F(0,ht,ct,e,a),F(1,yt[0],yt[1],yt[2],L),F(2,N[0],N[1],ut,ca),F(3,X.eye[0],X.eye[1],X.eye[2],Rt),F(4,X.fw[0],X.fw[1],X.fw[2],2*Rt/U),F(5,X.rt[0],X.rt[1],X.rt[2],At),F(6,X.up[0],X.up[1],X.up[2],U);let s=0,h=0,f=0,r=0,i=[0,-50,0],d=[0,-50,0],x=[0,-50,0];if(Vt){const E=ht-Vt.t0,j=Ue(E,.035,.26);s=Vt.peak*j,i=Vt.A,d=Vt.B,f=2.2*j;let at=0;for(const Ct of Vt.strokes)at+=Ue(E-Ct,.006,.08);r=Math.min(1.4,at*1.1+.25*Ue(E,.01,.5)),E>1.6&&(Vt=null)}if(he){const E=ht-he.t0;h=he.peak*Ue(E,.05,.38),x=he.p,E>1.6&&(he=null)}F(7,i[0],i[1],i[2],s),F(8,d[0],d[1],d[2],h),F(9,x[0],x[1],x[2],f);const m=Ze();F(10,m.c[0],m.c[1],m.A,m.B),F(11,gt[0],gt[1],aa,(1-.45*Kt)*Math.max(Y.rain,ct)),F(12,y.c[0],y.c[1],y.R,re),F(13,ne,Ot?1:0,uo*(1+.5*Kt),na),F(14,y.ad[0],y.ad[1],y.asp,Kt);const P=st.zen,b=st.mid,D=st.hs,k=st.ha,g=st.amb,V=st.bn;F(15,P[0],P[1],P[2],lt?Y.hs:M==="Late afternoon"?.2:M==="Last hour"?.8:1.3),F(16,b[0],b[1],b[2],n),F(17,D[0],D[1],D[2],l),F(18,k[0],k[1],k[2],st.exp*(1+.35*a)),F(19,u[0],u[1],u[2],1),F(20,g[0]*(1-.35*a),g[1]*(1-.35*a),g[2]*(1-.35*a),ra),F(21,V[0],V[1],V[2],ha),F(22,De[0],De[1],vt?vt.x:0,vt?vt.z:0),F(23,vt?vt.ang:0,vt?vt.t0:0,vt?vt.s:0,vt?vt.v:0),F(25,Et[0],Et[1],Et[2],[1,1.45,.4][l]),F(26,.62,.66,1,3),F(27,Gt[0],Gt[1],Gt[2],y.up),F(28,r,U<=256?56:64,0,0),F(29,0,eo[0],eo[1],eo[2]),F(30,13,.5,G,Be),F(31,St[0],St[1],St[2],Y.gap),F(44,1,ie,-2,-1),F(45,Y.veil,Y.flat,Y.floor,Y.bowTop),F(24,Ce,.02,la,Math.tan(L)),F(47,_t.a[0],_t.a[1],_t.b[0],_t.b[1]),F(48,_t.w,Y.shTop,.36,Y.shelf);{const E=[0,1,2].map(Ct=>b[Ct]*.55+P[Ct]*.45),j=(E[0]+E[1]+E[2])/3,at=1-.35*a;F(51,(j+(E[0]-j)*.6)*.55+g[0]*.3*at,(j+(E[1]-j)*.6)*.55+g[1]*.3*at,(j+(E[2]-j)*.6)*.55+g[2]*.3*at,0)}F(49,fo[0],fo[1],xo,ia),F(50,Le[0],Le[1],Le[2],Le[3]),F(46,Y.wet,Y.puddle,4,20)},eo=(()=>{let e=1e9,a=-1e9,n=1e9,u=-1e9;const s=(i,d,x)=>{e=Math.min(e,i-x),a=Math.max(a,i+x),n=Math.min(n,d-x),u=Math.max(u,d+x)};for(const i of T)s(i[0],i[2],i[3]+1.6);Y.shelf&&(s(_t.a[0],_t.a[1],_t.w+1.6),s(_t.b[0],_t.b[1],_t.w+1.6));const h=(e+a)/2,f=(n+u)/2;let r=0;for(const i of T)r=Math.max(r,Math.hypot(i[0]-h,i[2]-f)+i[3]+1.6);if(Y.shelf)for(const i of[_t.a,_t.b])r=Math.max(r,Math.hypot(i[0]-h,i[1]-f)+_t.w+1.6);return[h,f,r]})();for(let e=0;e<12;e++){const a=T[e];F(32+e,a[0],a[1],a[2],a[3])}const oo=()=>{rt[29*4]=(fa++>>1)*.618034%1,rt[28*4+2]=zo,rt[28*4+3]=rt[7*4+3]+rt[8*4+3]>.02?1:0,o.bindFramebuffer(o.FRAMEBUFFER,Ro.fb),o.viewport(0,0,At,At/2),o.disable(o.DEPTH_TEST),o.disable(o.BLEND),o.disable(o.CULL_FACE),o.depthMask(!0),o.useProgram(p.P.rain.p),o.uniform4fv(p.P.rain.uP,rt),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,p.n2),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_3D,p.n3),o.bindVertexArray(p.vEmpty),o.drawArrays(o.TRIANGLES,0,3),o.bindFramebuffer(o.FRAMEBUFFER,Mo.fb),o.useProgram(p.P.cloud.p),o.uniform4fv(p.P.cloud.uP,rt),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,Ro.tex),o.drawArrays(o.TRIANGLES,0,3),o.bindFramebuffer(o.FRAMEBUFFER,Ye.fb),o.viewport(0,0,At,At),So&&rt[28*4+3]<.5&&(o.enable(o.BLEND),o.blendFunc(o.CONSTANT_ALPHA,o.ONE_MINUS_CONSTANT_ALPHA),o.blendColor(0,0,0,.5)),o.useProgram(p.P.copy.p),o.uniform4fv(p.P.copy.uP,rt),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,Mo.tex),o.drawArrays(o.TRIANGLES,0,3),o.disable(o.BLEND),zo^=1},Uo=()=>{o.bindFramebuffer(o.FRAMEBUFFER,Ao.fb),o.viewport(0,0,U,U),o.disable(o.BLEND),o.disable(o.CULL_FACE),o.clearDepth(1),o.depthMask(!0),o.clear(o.DEPTH_BUFFER_BIT),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,p.n2),o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_2D,Ye.tex),o.enable(o.DEPTH_TEST),o.depthFunc(o.LESS),o.depthMask(!0),o.useProgram(p.P.grass.p),o.uniform4fv(p.P.grass.uP,rt),o.uniformMatrix4fv(p.P.grass.uVP,!1,$t),o.bindVertexArray(p.vGrass),o.activeTexture(o.TEXTURE4),o.bindTexture(o.TEXTURE_2D,Ne.tex);{const e=p.GKN,a=p.GQ,n=$t,u=rt[25*4+3],s=rt[4*4+3]*.6,h=da;for(let r=0;r<4;r++){const i=r===1||r===3||r===4?-1:1,d=r<2?0:1,x=r===4?2:d,m=i*n[x]-n[3],P=i*n[4+x]-n[7],b=i*n[8+x]-n[11],D=i*n[12+x]-n[15];h[r*5]=m,h[r*5+1]=P,h[r*5+2]=b,h[r*5+3]=D,h[r*5+4]=Math.hypot(m,b)}{const r=-n[2]-n[3],i=-n[6]-n[7],d=-n[10]-n[11],x=-n[14]-n[15];h[20]=r,h[21]=i,h[22]=d,h[23]=x,h[24]=Math.hypot(r,d)}let f=-1;for(let r=0;r<=e+1;r++){let i=r===0;if(r>0&&r<=e){const d=(r-1)*8,x=Ne.hz[r]*u,m=x+.05,P=x+.02+s*(p.GR1[r-1]+12);i=!0;for(let b=0;b<25&&i;b+=5){const D=h[b],k=h[b+2],g=h[b+1]>0?h[b+1]*-.1:h[b+1]*m,V=h[b+3]+g-P*h[b+4];D*a[d]+k*a[d+1]+V>0&&D*a[d+2]+k*a[d+3]+V>0&&D*a[d+4]+k*a[d+5]+V>0&&D*a[d+6]+k*a[d+7]+V>0&&(i=!1)}}if(i&&f<0&&(f=r),!i&&f>=0){const d=Ne.st[f],x=Ne.st[r]-d;x>0&&(o.uniform2i(p.P.grass.uGB,d,x),o.drawElementsInstanced(o.TRIANGLES,p.gIdxN,o.UNSIGNED_SHORT,0,Math.ceil(x/zt))),f=-1}}}o.depthFunc(o.LEQUAL),o.depthMask(!1),o.useProgram(p.P.comp.p),o.uniform4fv(p.P.comp.uP,rt),o.bindVertexArray(p.vEmpty),o.drawArrays(o.TRIANGLES,0,3),o.depthFunc(o.LESS),o.depthMask(!0),o.enable(o.BLEND),o.blendFunc(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA),o.useProgram(p.P.rib.p),o.uniform4fv(p.P.rib.uP,rt),o.uniformMatrix4fv(p.P.rib.uVP,!1,$t),o.bindVertexArray(p.vPart),o.activeTexture(o.TEXTURE6),o.bindTexture(o.TEXTURE_2D,Oe),o.uniform2i(p.P.rib.uGB,0,Fe+mo*lo),o.drawElementsInstanced(o.TRIANGLES,zt*6,o.UNSIGNED_SHORT,0,Math.ceil((Fe+mo*lo)/zt)),Vt&&rt[28*4]>.002&&(o.blendFunc(o.ONE,o.ONE),o.depthMask(!1),o.bindTexture(o.TEXTURE_2D,He),o.uniform2i(p.P.rib.uGB,0,Vt.n),o.drawElementsInstanced(o.TRIANGLES,zt*6,o.UNSIGNED_SHORT,0,Math.ceil(Vt.n/zt))),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.depthMask(!1),o.useProgram(p.P.part.p),o.uniform4fv(p.P.part.uP,rt),o.uniformMatrix4fv(p.P.part.uVP,!1,$t),o.bindVertexArray(p.vPart),o.activeTexture(o.TEXTURE5),o.bindTexture(o.TEXTURE_2D,p.pTex);{const e=rt[67]>.001?p.NPT:Te;o.uniform2i(p.P.part.uGB,0,e),o.drawElementsInstanced(o.TRIANGLES,zt*6,o.UNSIGNED_SHORT,0,Math.ceil(e/zt))}o.depthMask(!0),o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.flush(),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,U,U),o.useProgram(p.P.fin.p),o.uniform4fv(p.P.fin.uP,rt),o.activeTexture(o.TEXTURE3),o.bindTexture(o.TEXTURE_2D,Ao.tex),o.bindVertexArray(p.vEmpty),o.drawArrays(o.TRIANGLES,0,3),o.bindVertexArray(null)},ya=e=>{const a=t.input;if(a.down&&a.inside!==!1){if($||($={x0:a.x,y0:a.y,lx:a.x,ly:a.y,t:0,moved:0,sent:!1}),$.t+=e,$.moved=Math.max($.moved,Math.hypot(a.x-$.x0,a.y-$.y0)),$.moved>.04&&!$.sent&&$.t>.08){const s=$e($.x0,$.y0),h=$e(a.x,a.y),f=k=>{const g=Math.hypot(k[0],k[2])||1,V=k[1]<-.02?Math.min(X.eye[1]/-k[1],120):120;return[X.eye[0]+k[0]/g*V,X.eye[2]+k[2]/g*V]},r=f(s),i=f(h);let d=a.x-$.x0,x=a.y-$.y0;const m=Math.hypot(X.fw[0],X.fw[2])||1,P=d*X.rt[0]-x*X.fw[0]/m,b=d*X.rt[2]-x*X.fw[2]/m,D=Math.atan2(b,P);vt={x:r[0]-Math.cos(D)*25,z:r[1]-Math.sin(D)*25,ang:D,t0:ht,s:1.1,v:9},t.sound.hit("noise",.16,{cutoff:900,dur:1.6}),$.sent=!0}$.moved<.025&&$.t>.35&&(ct=Math.min(1.05,ct+e*.24),ct>.9&&(Kt=Math.min(1,Kt+e*.45))),$.lx=a.x,$.ly=a.y}else $&&(je=$.t>.3||$.moved>.025,$=null);const n=a.taps(),u=$&&($.t>.3||$.moved>.025);if(n.length&&!je&&!u)for(const s of n.slice(-2))pa(s.x,s.y);n.length&&(je=!1)},Io=(e,a)=>{if(a=Math.min(Math.max(a||0,0),.25),ht=e,_o(),ya(a),t.input.down&&$&&$.moved<.025&&$.t>.35||(ct=Math.max(0,ct-a*.06),ct<.6&&(Kt=Math.max(0,Kt-a*.1))),vt&&ht-vt.t0>25&&(vt=null),lt&&ht>=Lo){const u=c()*6.283,s=c()*2;he={t0:ht,p:[N[0]+Math.cos(u)*s,ut+2+c()*6,N[1]+Math.sin(u)*s],peak:1.3*(.5+c())},Lo=ht+(ke>0?1.5+c()*4:6+c()*16),fe.push({at:ht+40+c()*10,v:.1,dist:17})}if(ht>=ye&&Math.max(Y.rain,ct)>.3){if(Ee)ko(Ee[0]+(c()-.5)*.5,Ee[1]+(c()-.5)*.5);else{const u=Ze(),s=c()*6.283,h=Math.sqrt(c())*.7;ko(u.c[0]+(Math.cos(s)*gt[0]*u.A-Math.sin(s)*gt[1]*u.B)*h,u.c[1]+(Math.cos(s)*gt[1]*u.A+Math.sin(s)*gt[0]*u.B)*h)}Ee=null,ke>0?(ke--,ye=ht+(2.2+c()*6)/(1+ct)):(ke=c()<.45?0:c()<.7?1:2,ye=ht+(18+c()*40)/(1+ct*2.5))}for(let u=fe.length-1;u>=0;u--)if(ht>=fe[u].at){const s=fe[u];fe.splice(u,1),s.dist<3&&t.sound.hit("kick",s.v),t.sound.hit("noise",s.v*.7,{cutoff:90+300/(1+s.dist),dur:2.2+Math.min(3,s.dist*.25)})}Qe-=a,Qe<=0&&(Qe=.45,t.sound.hit("noise",.02+.04*(qe*(1+.6*ct)-5)/10,{cutoff:260+30*qe,dur:.9})),Ke-=a,Ke<=0&&ct>.5&&(Ke=.25,t.sound.hit("noise",.03+.1*qt((ct-.5)*2,0,1),{cutoff:3500,dur:.5})),Fo(),Do(),oo(),Uo()};let So=!1;return _o(),Fo(),Do(),oo(),oo(),So=!0,Uo(),p.fin&&p.fin.register(Io,{pool:go,rt:Ye,tx:[Oe,He]}),Io}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
