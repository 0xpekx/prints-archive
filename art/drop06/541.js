// Under the Surf: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/541.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Lt){Lt&&function(){"use strict";const Ft={yaw:0,pitch:0,x:0,y:0,z:0},bo=0,j=(o,a,p)=>o<a?a:o>p?p:o,_=Math.PI*2,Ce=9.81,Bt=38,yo=4,vt=40,J=448,go=24,wt=1500,zo=4e3,He=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,me=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,ae=`
uniform vec4 uP[${Bt}];
uniform sampler2D uN, uD, uV, uS, uW, uF, uX, uV2;
uniform sampler3D uN3;
#define MAPC uP[23].xy
#define MAPE uP[23].z
#define MAPN uP[23].w
#define CAM uP[0].xyz
#define TANH uP[0].w
#define FW uP[1].xyz
#define SZ uP[1].w
#define RT uP[2].xyz
#define TIME uP[2].w
#define UPV uP[3].xyz
#define NWV (int(uP[3].w) + ZI)
#define SUNW uP[4].xyz
#define SUNE uP[4].w
#define SUNA uP[5].xyz
#define DEP uP[6].x
#define SLP uP[6].y
#define NSW (int(uP[6].z) + ZI)
#define EXPO uP[6].w
#define SIG uP[7].x
#define SANDT uP[7].y
#define NBLB (int(uP[7].z) + ZI)
#define NFOAM (int(uP[7].w) + ZI)
#define SHP uP[8].w
#define SHORE uP[15].xy
#define ZI int(uP[15].w)
#define AMB uP[19].rgb
#define SUNC uP[20].rgb
const float ETA = 1.3333;
uint hsh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hsh(x) >> 8) * (1. / 16777216.); }
// 2D noise tile: 16 cells over 128 texels, one cell per unit of p
float N1(vec2 p, float fp) { return textureLod(uN, p * .0625, log2(max(fp * 8., 1.))).r; }
vec4 N4(vec2 p, float fp) { return textureLod(uN, p * .0625, log2(max(fp * 8., 1.))); }
float botY(vec2 p) { return -DEP + SLP * dot(p, SHORE) + .22 * (N1(p * .07 + 7.7, 0.) - .5); }
float botPlane(vec3 o, vec3 d) {
  float den = d.y - SLP * dot(d.xz, SHORE);
  return den < -1e-4 ? (-DEP + SLP * dot(o.xz, SHORE) - o.y) / den : 1e5;
}
float hg(float c, float g) { return (1. - g * g) / pow(1. + g * g - 2. * g * c, 1.5) * .0796; }
// in-water radiance looking along d: seaward blue, shoreward milky, brighter up, a forward-scatter glow round the sun
vec3 wcol(vec3 d) {
  float s = smoothstep(-.8, .85, dot(d.xz, SHORE) / (length(d.xz) + 1e-3));
  vec3 c = mix(uP[8].rgb, uP[9].rgb, s);
  float v = smoothstep(-.85, 1., d.y);
  c *= .16 + 1.05 * v * v;
  c += SUNC * SUNE * hg(dot(d, SUNW), .8) * .38;
  vec3 sd = uP[12].rgb * (AMB + SUNC * SUNE * .3) * .55;
  return mix(c, sd, clamp(SANDT * .7, 0., .8) * smoothstep(.5, -.4, d.y));
}
// optical depth: clear water plus suspended sand that thins out with height above the bottom
float tau(vec3 o, vec3 d, float t) {
  float a = max(o.y + DEP - SLP * dot(o.xz, SHORE), 0.), dy = d.y - SLP * dot(d.xz, SHORE), H = .8;
  float I = abs(dy) < 1e-3 ? t * exp(-a / H) : H / dy * (exp(-a / H) - exp(-max(a + dy * t, 0.) / H));
  return SIG * t + (SANDT * 1.5 + SIG * .8) * I + SANDT * .1 * t;
}
vec3 tmap(vec3 c) {
  c *= EXPO;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
// the sea surface: (kx, kz, amplitude, phase) per wave in row 0 of the data texture, longest first
float wvS(vec2 p) {
  float h = 0.;
  for (int i = 0; i < NSW; i++) { vec4 w = texelFetch(uD, ivec2(i, 0), 0); h += w.z * sin(dot(w.xy, p) + w.w); }
  return h;
}
vec3 wvH(vec2 p, int n, out vec2 g) {
  vec3 H = vec3(0.); g = vec2(0.);
  for (int i = 0; i < n; i++) {
    vec4 w = texelFetch(uD, ivec2(i, 0), 0);
    float ph = dot(w.xy, p) + w.w, s = sin(ph), c = cos(ph);
    g += w.z * c * w.xy; H -= w.z * s * vec3(w.x * w.x, w.y * w.y, w.x * w.y);
  }
  return H;
}
// the light map (uW): sunlight sent down through the surface onto the sand each frame (a grid of rays refracted by the
// waves and added up where they land: folds, twin lines and cusps come of themselves), mean 1, with mip levels for the
// blur of the sun's width and the pixel's footprint. CZC its centre (ahead of the eye), CZE its size in metres, CZN texels
#define CZC uP[36].xy
#define CZE uP[36].z
#define CZN uP[36].w
// (round: a square fade drew straight lines and corners on the ceiling and the sand)
float inMap(vec2 p) { return smoothstep(1., .78, length(p - MAPC) / MAPE * 2.); }
float czIn(vec2 u) { vec2 m = abs(u - .5) * 2.; return smoothstep(1., .82, max(m.x, m.y)); }
float czI(vec2 u, float lod) { return textureLod(uW, u, lod).r * (uP[18].w > 0. ? 16. : 1.); }
// sunlight focused by the surface onto a point of the sand (fp the blur wanted, in metres)
float caus(vec3 p, float fp) {
  vec2 u = (p.xz - CZC) / CZE + .5;
  float h = max(-p.y, .2), bl = max(fp, (.004 + uP[11].w * .03) * h) * CZN / CZE;
  float I = czI(u, log2(max(bl, 1.7)));
  return mix(1.05, I / (1. + uP[35].w * I) * (1. + uP[35].w), czIn(u));
}
// Broken crests, each along its whole length (uP[26 + 2e]: front s now, the line where it broke, strength, the peel's
// centre u; uP[27 + 2e]: time since it broke, two phases, peel rate). s runs with the swell, u along the crest. A section
// breaks where the crest's own strength (three slow sines along it) allows; the far sections go later as the break peels.
#define SDIR uP[34].xy
#define C1 uP[34].z
#define NCRE (int(uP[34].w) + ZI)
// returns (age here, the strength along the crest, metres behind the front, metres shoreward of the break line)
vec4 crest(int e, vec2 xz) {
  vec4 A = uP[26 + 2 * e], B = uP[27 + 2 * e];
  float s = dot(xz, SDIR), u = dot(xz, vec2(-SDIR.y, SDIR.x));
  float env = .5 + .25 * sin(u * .07 + B.y) + .17 * sin(u * .15 + B.z) + .1 * sin(u * .33 + B.y * 1.7 + B.z);
  float sb = A.y + B.w * abs(u - A.w) + 1.2 * sin(u * .11 + B.z * 1.3);
  return vec4((A.x - s) / C1, A.z * smoothstep(.28, .6, env), s - A.x, s - sb);
}
// the strength where white water lies: shoreward of the break line (a short ramp) and behind the front
float crW(vec4 c) { return c.y * smoothstep(-.2, .25, c.w) * step(0., c.x); }
// the white water's density (per metre of 1 m depth) by age, and how deep it has been driven
float plRho(float a) { return 2.4 * exp(-a / 2.2) + .35 * exp(-a / 12.); }
float plDp(float a, float S) { return min(.5 + .95 * S, DEP * .55) * (1. - exp(-a / .14)) * (1. - .45 * smoothstep(2., 12., a)); }
// optical depth of white water above a point (the shadow it casts on the sand)
// (the shadow's edges soft and ragged: under the front and the break line the white water thins over a metre or two, so
// its shadow has no ruled edge; gw: the same column spread over several metres, for the glow of the haze under it)
float plCol(vec2 xz, out float gw) {
  float r = 0., nz = N1(xz * .37 + 1.9, 0.) - .5;
  gw = 0.;
  for (int e = 0; e < NCRE; e++) {
    vec4 c = crest(e, xz);
    float a = max(c.x, 0.), k = c.y * plRho(a) * (plDp(a, c.y) + .15);
    r += k * smoothstep(-.7, .5, c.w + nz * 1.6) * smoothstep(-.06, .3, c.x + nz * .2);
    gw += k * smoothstep(-3., 2.5, c.w) * smoothstep(-.5, .9, c.x);
  }
  return r;
}
float plSh(vec2 xz) { return textureLod(uF, (xz - MAPC) / MAPE + .5, 0.).g * 8. * inMap(xz); }
// the water itself glows under a roof of white water (lit from the bubbles above, all round): the haze looking along d
// brightens by the white water over the stretch of the ray where the haze builds
float wwG(vec3 o, vec3 d) {
  vec2 h = d.xz / max(length(d.xz), .2), u0 = (o.xz - MAPC) / MAPE + .5;
  // read from the spread column (the map's alpha): a ruled edge in the column turned into a line from the ceiling to the
  // sand, since this depends on the look's bearing only
  float g = textureLod(uF, u0 + h * 2.5 / MAPE, 2.).a + textureLod(uF, u0 + h * 6. / MAPE, 2.5).a;
  return 1. + 2. * (1. - exp(-2.4 * g)) * smoothstep(-.7, .1, d.y);
}
`,Ze=`
in vec2 vUV; out vec4 oC;
float ripPh(vec2 p, float fp) {
  float lam = uP[12].w;
  return (dot(p, uP[13].xy) + lam * (3.2 * (N1(p * .5 + 1.7, fp * .5) - .5) + 1.1 * (N1(p * 2.3 + 4.2, fp * 2.3) - .5) + .5 * (N1(p * 6.1 + 9.4, fp * 6.1) - .5))) * 6.2831853 / lam;
}
float ripP(float ph) { float u = ph + .45 * sin(ph); return 1. - pow(abs(sin(.5 * u)), 1.3); }
float segD(vec2 p, vec2 a, vec2 b, out float s) { vec2 ab = b - a; s = clamp(dot(p - a, ab) / dot(ab, ab), 0., 1.); return length(p - a - ab * s); }
float weedD(vec2 p, out float s) {
  float s0, s1, s2;
  float d0 = segD(p, uP[16].xy, uP[16].zw, s0), d1 = segD(p, uP[16].zw, uP[17].xy, s1), d2 = segD(p, uP[17].xy, uP[17].zw, s2);
  s = s0 / 3.; float d = d0;
  if (d1 < d) { d = d1; s = (1. + s1) / 3.; }
  if (d2 < d) { d = d2; s = (2. + s2) / 3.; }
  return d;
}
// Away from the opening frame (by direction from the opening eye, fixed in the world) the bottom is a real surf-zone
// floor: low bars and troughs from ~10 m out, and the caustic net bent by the swell's spread of directions. Inside the
// opening frame and under the eye nothing changes.
float gwt(vec3 p) { vec3 v = p - uP[24].xyz; return uP[24].w * smoothstep(.62, .17, dot(v, uP[25].xyz) / max(length(v), 1e-3)); }
float barY(vec2 p) { return 1.6 * (N1(p * .05 + 3.1, 0.) - .5) + .45 * (N1(p * .17 + .6, 0.) - .5); }
float botY2(vec2 p) { vec3 q = vec3(p.x, -DEP, p.y); float w = gwt(q) * smoothstep(5., 12., length(p - uP[24].xz)); return botY(p) + w * barY(p); }
vec3 sandC(vec3 p, float fp, bool full) {
  vec2 xz = p.xz;
  float lam = uP[12].w, A = full ? uP[13].z * (1. - smoothstep(.15 * lam, .6 * lam, fp)) : 0.;
  float ph = ripPh(xz, fp), e = .012;
  vec2 gp = full ? vec2(ripPh(xz + vec2(e, 0.), fp) - ph, ripPh(xz + vec2(0., e), fp) - ph) / e : vec2(0.);
  float P = full ? ripP(ph) : .6, dP = (ripP(ph + .05) - ripP(ph - .05)) * 10.;
  vec4 n7 = N4(mat2(.8, .6, -.6, .8) * xz * 9. + 3.7, fp * 9.), n3 = N4(mat2(.6, -.8, .8, .6) * xz * 37. + 1.3, fp * 37.);
  A *= .45 + .55 * smoothstep(.3, .62, n7.y);
  vec2 gr = A * dP * gp + (n3.yz - .5) * .25 * (1. - smoothstep(.002, .01, fp));
  vec3 n = normalize(vec3(-gr.x, 1., -gr.y));
  vec3 alb = uP[12].rgb * (.82 + .3 * n7.x) * mix(.68, 1.08, mix(P, .6, smoothstep(.12 * lam, .45 * lam, fp)));
  // heavy dark grains and shell grit collect in the troughs
  float tr = (1. - P) * (1. - smoothstep(.12 * lam, .45 * lam, fp));
  // (grains far below the pixel: only their tone, mottled at a few centimetres, darker and finer in the troughs; the dark
  // heavy grains lie in bands along the troughs, not as flecks; shell bits are small and broken, never a stamped flake)
  float sp = N1(mat2(.8, -.6, .6, .8) * xz * 160. + 2.1, fp * 160.);
  alb *= .94 + .12 * (n3.x - .5) * (1. - smoothstep(.004, .02, fp)) + .1 * (sp - .5) * (1. - smoothstep(.0015, .006, fp));
  alb = mix(alb, uP[12].rgb * .55, tr * (.18 + .3 * smoothstep(.4, .75, n3.y * .6 + sp * .4)));
  alb = mix(alb, vec3(.9, .86, .78), smoothstep(.76, .86, n3.w) * smoothstep(.45, .7, sp) * uP[13].w * (1. - smoothstep(.002, .008, fp)));
  // under white water the sun comes through diffused: dimmer, and with no caustic net
  float h = max(-p.y, .2), psh = plSh(xz + SUNW.xz / SUNW.y * h), Ts = exp(-SIG * .75 * h / SUNW.y - SANDT * .6 - psh * .8);
  float gw = gwt(p);
  vec3 pc = p;
  if (gw > 0.) { vec4 wn = N4(xz * .31 + 1.1, fp * .31), wm = N4(xz * .83 + 6.1, fp * .83); pc.xz += ((wn.xy - .5) * 1.5 + (wm.zw - .5) * .4) * gw; }
  float C = full ? mix(1.05, mix(caus(pc, fp), 1.05, smoothstep(.06, .2, fp)), exp(-psh * .9)) : 1.05;
  float sh = 1.;
  if (full) {
    // shells: one chance in each 0.6 m cell
    vec2 cid = floor(xz / .6);
    uint hs = hsh(uint(int(cid.x) + 4096) * 7919u + uint(int(cid.y) + 4096) * 104729u + uint(uP[15].z));
    if (hf(hs) < uP[14].w && fp < .006) {
      vec2 ce = (cid + .15 + .7 * vec2(hf(hs + 1u), hf(hs + 2u))) * .6;
      float an = hf(hs + 3u) * 6.2831853, sz = .012 + .022 * hf(hs + 4u) * hf(hs + 5u), ca = cos(an), sa = sin(an);
      mat2 Rm = mat2(ca, sa, -sa, ca);
      vec2 q = Rm * (xz - ce) / sz;
      vec2 qs = Rm * (xz + SUNW.xz / SUNW.y * .3 * sz - ce) / sz;
      float rr = length(q * vec2(1., 1.16)), rs = length(qs * vec2(1., 1.16));
      sh = 1. - .75 * smoothstep(1.05, .8, rs);
      float bur = .6 + .5 * hf(hs + 6u);   // how much of it shows above the sand
      if (rr < 1. && q.y > -bur * 1.2 + (N1(xz * 40., 0.) - .5) * .3) {
        vec2 v = q - vec2(0., -1.05);
        float rib = sin(atan(v.x / max(v.y, .05)) * (16. + 10. * hf(hs + 7u))), ring = sin(length(v) * (20. + 9. * hf(hs + 8u)));
        float dz = sqrt(max(1. - rr * rr, .02));
        vec2 gq = transpose(Rm) * (q * .55 / dz + vec2(rib * .18, 0.));
        n = normalize(vec3(gq.x, 1., gq.y));
        vec3 sc = hf(hs + 9u) < .35 ? vec3(.86, .7, .64) : hf(hs + 9u) < .6 ? vec3(.62, .64, .66) : vec3(.9, .85, .74);
        alb = sc * (.85 + .1 * rib + .08 * ring) * mix(.65, 1., smoothstep(.98, .7, rr));
        sh = 1.;
      }
    }
    // a stray strand of weed lying on the sand
    if (uP[18].y > .5 && fp < .01) {
      float s, wd = weedD(xz, s), w = uP[18].x * (.55 + .45 * sin(s * 17. + 1.3)) * smoothstep(0., .08, s) * smoothstep(1., .9, s);
      vec2 so = SUNW.xz / SUNW.y * (.004 + .03 * s * s);
      float s2, wd2 = weedD(xz + so, s2);
      // (the edges kept apart: past the strand's ends w is 0, and smoothstep(0, 0, x) is undefined; it shaded a half-plane
      // of the sand there, ruled off at the strand's end)
      sh *= 1. - .6 * (1. - smoothstep(w * .4, w * 1.2 + 1e-4, wd2));
      if (wd < w) {
        float u = wd / w;
        alb = mix(vec3(.16, .15, .05), vec3(.07, .09, .03), u * u) * (.8 + .4 * N1(vec2(s * 60., u), 0.));
        n = vec3(0., 1., 0.);
        sh = 1.;
      }
    }
  }
  float ndl = max(dot(n, SUNW), 0.);
  vec3 L = SUNC * SUNE * Ts * C * ndl * sh * 1.15 + AMB * exp(-SIG * .5 * h) * (.4 + .4 * n.y) * (.65 + .35 * P);
  return alb * L;
}
vec3 skyA(vec3 a) {
  float y = max(a.y, 0.), mu = dot(a, SUNA);
  vec3 c = mix(uP[11].rgb, uP[10].rgb * .85, smoothstep(0., .75, y));
  c *= .55 + .5 * smoothstep(.0, .35, y);
  c += SUNC * (.12 * pow(max(mu, 0.), 4.) + .6 * pow(max(mu, 0.), 40.) + 4. * pow(max(mu, 0.), 400.));
  vec2 cp = a.xz / (y + .1) * .9 + vec2(TIME * .006, 0.);
  float cl = smoothstep(.5, .8, N1(cp, 0.) * .65 + N1(cp * 2.7 + 5., 0.) * .35) * uP[10].w * smoothstep(.02, .2, y);
  c = mix(c, vec3(.95, .96, .97) * (.85 + .6 * pow(max(mu, 0.), 6.)), cl * .75);
  // near the horizon: dunes and scrub on the shore side, the grey-blue sea and its haze on the other
  vec2 hz = normalize(a.xz + 1e-4);
  float sh = smoothstep(-.3, .4, dot(hz, SHORE));
  float sk = (.05 + .08 * N1(hz * 7.3 + 2.2, 0.) + .03 * N1(hz * 31., 0.)) * sh + .025;
  vec3 lo = mix(uP[8].rgb * 1.6 + vec3(.08, .1, .12), vec3(.13, .14, .09) * (.8 + .4 * N1(hz * 60., 0.)), sh);
  c = mix(c, lo, smoothstep(sk + .01, sk - .006, y));
  return c + SUNC * SUNE * 60. * pow(max(mu, 0.), uP[5].w);
}
float foam(vec2 p, float fp) {
  float im = inMap(p), f = textureLod(uF, (p - MAPC) / MAPE + .5, 0.).r * 2. * im;
  // past the map's edge the rafts' cover goes on (the same field the map holds), so the foam has no rim out there
  if (im < 1.) f += (1. - im) * uP[9].w * smoothstep(.5, .78, N1(p * .16 + vec2(3.1, 1.7) + vec2(TIME * .01, 0.), 0.) + .3 * (N1(p * .7, 0.) - .5));
  // the white water's roof: thick behind each broken front, thinning to lace over half a minute; and the lip just
  // whitening along a crest about to go
  for (int e = 0; e < NCRE; e++) {
    vec4 c = crest(e, p);
    float B = uP[27 + 2 * e].x, ap = max(c.x, 0.);
    f += c.y * smoothstep(-.2, .25, c.w) * (1.4 * exp(-ap / 5.) + .3 * exp(-ap / 20.)) * smoothstep(-1.1 / C1, .05, c.x)
      + uP[26 + 2 * e].z * smoothstep(-.9, 0., B) * step(B, .6) * exp(-(c.z + .25) * (c.z + .25) * 5.) * .9;
  }
  float l1 = N1(p * 2.3, fp * 2.3), l2 = N1(p * 7.9 + 1.3, fp * 7.9), l3 = N1(p * 23. + 4.1, fp * 23.);
  // a raft is a net of bubbles: as it thins, clear cells open up and leave lace along the ridges
  float net = abs(l2 - .5) * 2., cov = f * 1.3 - .3 - (l1 - .5) * .9;
  return smoothstep(-.14, .5, cov - net * .45 - (l3 - .5) * .3) * (.3 + .6 * clamp(f, 0., 1.));
}
// transmittance out through the surface for cos(incidence) ci, averaged over unresolved slopes (spread w in ci):
// exact Fresnel above the critical angle, softened across it by the slope spread; the critical angle per channel
// (water's dispersion) gives the window's rim its faint rainbow
vec3 trans(float ci, float w) {
  const float eta = 1.3333;
  float cc = sqrt(1. - 1. / (eta * eta)), ce = max(ci, cc + .004 + .35 * w);
  float ct = sqrt(max(1. - eta * eta * (1. - ce * ce), 0.));
  float rs = (eta * ce - ct) / (eta * ce + ct), rp = (ce - eta * ct) / (ce + eta * ct);
  vec3 cr = sqrt(1. - 1. / vec3(1.3275 * 1.3275, eta * eta, 1.3425 * 1.3425));
  return (1. - .5 * (rs * rs + rp * rp)) * smoothstep(vec3(-1.), vec3(1.1), (ci - cr) / w);
}
// the surface's slope at p: every wave summed here (no baked map, so no texel corners), each faded out as it shrinks
// below the pixel, its lost slope kept as spread (sv); then wind ripples down to two centimetres, as a function
vec2 surfG(vec2 p, float fp, out float sv) {
  vec2 g = vec2(0.); sv = 0.;
  // ripples in gusts: patches of the surface roughen and calm as the wind moves over (never glassy under a wind)
  float gu = uP[35].y * (.75 + 1.1 * smoothstep(.3, .75, N1(p * .09 + vec2(TIME * .04, TIME * .015), 0.)));
  // the waves, then eleven wind ripples (16 cm to 2 cm) after them in the same row: one loop
  for (int i = 0; i < NWV + 11; i++) {
    vec4 w = texelFetch(uD, ivec2(i, 0), 0);
    float k2 = dot(w.xy, w.xy), f = exp(-k2 * fp * fp * .5), a = w.z * (i < NWV ? 1. : gu);
    g += f * a * cos(dot(w.xy, p) + w.w) * w.xy;
    sv += a * a * k2 * .5 * (1. - f * f);
  }
  // the steep crest of each set wave crossing overhead
  for (int e = 0; e < NCRE; e++) {
    vec4 A = uP[26 + 2 * e], B = uP[27 + 2 * e];
    float x = dot(p, SDIR) - A.x, w = x < 0. ? 3.2 : 1.2;
    float H = uP[35].z * A.z * smoothstep(-6., -1., B.x) * (1. - .45 * smoothstep(0., 2.5, B.x));
    g += SDIR * (-H * x / (w * w) * exp(-.5 * x * x / (w * w)));
  }
  return g;
}
vec3 surfC(vec3 d, vec3 p, float t, float fp) {
  float sv;
  vec2 g = surfG(p.xz, fp, sv);
  // slope spread the pixel can't draw
  float sw = sqrt(sv) + .014;
  vec3 n = normalize(vec3(-g.x, 1., -g.y));
  float ci = max(dot(d, n), .02);
  // reflected below the surface: total internal reflection outside the window
  vec3 rd = reflect(d, -n);
  rd.y = min(rd.y, -.03); rd = normalize(rd);
  float t2 = min(botPlane(p, rd), 40.);
  vec3 pb = p + rd * t2;
  float h2 = max(-pb.y, .2);
  // the mirror shows the sand below as it is lit: its caustic net (softer with distance) and the white water's shadow
  float fb = (t + t2) * fp / max(t, .1);
  vec3 Lr = uP[12].rgb * (.8 + .3 * N1(pb.xz * 2.1, fb * 2.1)) * (SUNC * SUNE * exp(-SIG * .75 * h2 / SUNW.y - plSh(pb.xz) * .45) * SUNW.y * 1.1
    * mix(caus(pb, fb), 1.05, smoothstep(.06, .2, fb)) + AMB * exp(-SIG * .5 * h2) * .75);
  float T2 = exp(-tau(p, rd, t2));
  Lr = Lr * T2 + wcol(rd) * (1. - T2);
  float sn = sqrt(max(1. - ci * ci, 0.)), w = sw * (.35 + sn) * .9;
  vec3 Tt = trans(ci, w);
  // the sky through the surface, bent toward the horizon as the window edge nears (clamped at grazing)
  float ce = max(ci, sqrt(1. - 1. / (ETA * ETA)) + .002);
  vec3 tg = d - n * dot(d, n); tg /= max(length(tg), 1e-4);
  vec3 dt = n * ce + tg * sqrt(1. - ce * ce);
  float ct = sqrt(max(1. - ETA * ETA * (1. - ce * ce), 0.));
  vec3 a = normalize(ETA * dt + (ct - ETA * ce) * n);
  vec3 L = skyA(a) * 1.05 * Tt + Lr * (1. - Tt);
  // the sun broken into glints: facets the pixel can't resolve that tip the sun into view, sparkling as the ripples move
  // glints are the ripple facets themselves: a narrow lobe on the slope the pixel draws (slivers along the ripple
  // crests, moving with them), widening into the soft glitter where the facets are smaller than the pixel
  float mu = dot(a, SUNA), s2 = .006 + 4. * sw * sw * (.3 + 3. * sn * sn), s3 = .0009 + 3. * sv * (.3 + 3. * sn * sn);
  float lobe = exp(-(1. - mu) / s2) * .02 / s2 * .7 + exp(-(1. - mu) / s3) * .02 / s3 * 1.1;
  L += SUNC * SUNE * lobe * Tt * (1. + .5 * uP[5].w / 1400.);
  float f = foam(p.xz, fp);
  // foam from below: inside the window a soft backlit white, greying where the raft is thick; outside it the foam only
  // spoils the mirror, a dull blotch lit by the water under it
  vec3 fw = vec3(.93, .97, .98) * (SUNE * .62 + .28) * (1.08 - .55 * f);
  vec3 fm = Lr * .4 + (SUNC * SUNE * .15 + AMB * .28) * (1. - .5 * f);
  // thick white water is a diffuser: lit from above, it glows from below even outside the window
  fm = mix(fm, fw * .72, smoothstep(.45, 1.1, f));
  return mix(L, mix(fm, fw, Tt.g), f);
}
// MP 1: the sand pass (every pixel classed once: the sand and its haze, or a flag for the surface); MP 2: the surface,
// the sand pass's result elsewhere, and the volume; MP 0: both in one program (devices with no float targets). Two
// smaller programs compile side by side on D3D, where the one big program was most of the first make.
void main() {
  vec2 q = vUV * 2. - 1.;
  vec3 d = normalize(FW + (q.x * RT + q.y * UPV) * TANH), o = CAM;
  float pa = 2. * TANH / SZ;
  vec3 col; float t;
#if MP != 2
  float tb = min(botPlane(o, d), 60.), ts = 1e5;
  if (d.y > .003) {
    float tt = -o.y / d.y;
    for (int i = 0; i < 3 + ZI; i++) tt = (wvS(o.xz + d.xz * tt) - o.y) / d.y;
    ts = max(tt, 0.);
  }
  if (ts < tb) {
#if MP == 1
    oC = vec4(0.); return;
#else
    t = min(ts, 60.);
    col = surfC(d, o + d * t, t, t * pa / max(d.y, .15));
#endif
  } else {
    t = tb;
    vec3 p = o + d * t;
#if MP == 0 || defined(FAR)
    // (the far floor is its own program, compiled after the first frame: the opening view never shows it)
    vec3 f0 = uP[25].xyz, r0 = normalize(vec3(f0.z, 0., -f0.x)), u0 = cross(f0, r0);
    float dz = dot(d, f0);
    if (uP[24].w > 0. && (dz <= 0. || max(abs(dot(d, r0)), abs(dot(d, u0))) > TANH * dz * 1.02)) {   // outside the opening frame
      // bars and troughs: march the band they can occupy in short steps, then bisect (no jumping over a thin crest)
      float den = d.y - SLP * dot(d.xz, SHORE), base = -DEP + SLP * dot(o.xz, SHORE) - o.y;
      float ta = den < -1e-4 ? max((base + 1.) / den, 0.) : 0., tz = den < -1e-4 ? min((base - 1.) / den, 60.) : 60., dt = (tz - ta) / 20., tp = ta, tq = tz;
      bool hit = false;
      for (int i = 0; i < 20 + ZI; i++) { float tt = ta + dt * float(i + 1); vec3 q = o + d * tt; if (q.y < botY2(q.xz)) { tq = tt; tp = tt - dt; hit = true; break; } }
      if (hit) for (int i = 0; i < 6 + ZI; i++) { float tt = .5 * (tp + tq); vec3 q = o + d * tt; if (q.y < botY2(q.xz)) tq = tt; else tp = tt; }
      t = hit ? tq : min(t, 60.);
    } else
#endif
    t = clamp(t + (botY(p.xz) - p.y) / min(d.y, -.05), t - 2., t + 2.);
    p = o + d * t;
    col = sandC(p, t * pa / sqrt(max(-d.y, .05)) * .6, true);
  }
  float T = exp(-tau(o, d, t));
  col = col * T + wcol(d) * wwG(o, d) * (1. - T);
#if MP == 1
  oC = vec4(col, 1.); return;
#endif
#else
  vec4 X = texelFetch(uX, ivec2(gl_FragCoord.xy), 0);
  if (X.a > .5) col = X.rgb;
  else {
    float ts = 1e5;
    if (d.y > .003) {
      float tt = -o.y / d.y;
      for (int i = 0; i < 3 + ZI; i++) tt = (wvS(o.xz + d.xz * tt) - o.y) / d.y;
      ts = max(tt, 0.);
    }
    t = min(ts, 60.);
    col = surfC(d, o + d * t, t, t * pa / max(d.y, .15));
    float T = exp(-tau(o, d, t));
    col = col * T + wcol(d) * wwG(o, d) * (1. - T);
  }
#endif
#if MP != 1
  // the volume is traced at half the resolution with a per-pixel jittered start: reconstruct it with a tent over
  // its neighbouring texels (four bilinear taps half a texel out), which averages the jitter away instead of stippling
  vec2 ve = .5 / vec2(textureSize(uV, 0));
  vec4 V = .25 * (texture(uV, vUV - ve) + texture(uV, vUV + ve) + texture(uV, vUV + vec2(ve.x, -ve.y)) + texture(uV, vUV + vec2(-ve.x, ve.y)));
  vec4 V2 = .25 * (texture(uV2, vUV - ve) + texture(uV2, vUV + ve) + texture(uV2, vUV + vec2(ve.x, -ve.y)) + texture(uV2, vUV + vec2(-ve.x, ve.y)));
  // the two volume passes: the sand clouds, fingers and shafts behind the white water
  col = max((col * V2.a + V2.rgb) * V.a + V.rgb, 0.);
  oC = vec4(tmap(col), 1.);
#endif
}`,To=`
out vec2 vO;
void main() {
  float N = uP[37].x;
  vec2 g = vec2(float(gl_VertexID >> 1), float(gl_InstanceID + (gl_VertexID & 1))) / (N - 1.);
  // where this light lands under a flat sea, and the surface point it enters through
  vec2 o = CZC + (g * 1.08 - .54) * CZE;
  float h = max(DEP - SLP * dot(o, SHORE), .3), sp = CZE * 1.08 / (N - 1.);
  vec2 p = o + SUNW.xz / SUNW.y * h, sl = vec2(0.);
  // each wave tilts the light by its slope; one that focuses well above the sand (short chop over deep water) has crossed
  // and spread long before the light lands: it only shimmers, so it enters with its focus pushed down past the sand
  for (int i = 0; i < NWV; i++) {
    vec4 w = texelFetch(uD, ivec2(i, 0), 0);
    float k2 = dot(w.xy, w.xy), zf = 4. / max(abs(w.z) * k2, 1e-5);
    sl += min(1., zf / (uP[37].y * h)) * smoothstep(1.6, 1., sqrt(k2) * sp) * w.z * cos(dot(w.xy, p) + w.w) * w.xy;
  }
  vec3 L = refract(-SUNA, normalize(vec3(-sl.x, 1., -sl.y)), 1. / ETA);
  vO = o;
  gl_Position = vec4((p + L.xz / max(-L.y, .05) * h - CZC) / CZE * 2., 0., 1.);
}`,Eo=`
in vec2 vO; out vec4 oC;
void main() {
  // the flat-sea area of light this fragment receives, over its own area
  vec2 a = dFdx(vO), b = dFdy(vO);
  float tx = CZE / CZN;
  oC = vec4(min(abs(a.x * b.y - a.y * b.x) / (tx * tx), 120.) * uP[37].z, 0., 0., 0.);
}`,Mo=`
in vec2 vUV; out vec4 oC;
void main() {
  vec2 p = MAPC + (gl_FragCoord.xy / 512. - .5) * MAPE;
  float f = 0., en = .5 * (N1(p * 1.1, 0.) - .5);
  for (int i = 0; i < NFOAM; i++) {
    vec4 a = texelFetch(uD, ivec2(i, 3), 0), b = texelFetch(uD, ivec2(i, 4), 0);
    vec2 q = p - a.xy;
    float ca = cos(b.x), sa = sin(b.x);
    q = vec2(ca * q.x + sa * q.y, -sa * q.x + ca * q.y) / vec2(b.y, 1.);
    f += a.w * smoothstep(1., .25, length(q) / a.z + en);
  }
  float s = N1(p * .16 + vec2(3.1, 1.7) + vec2(TIME * .01, 0.), 0.);
  f += uP[9].w * smoothstep(.5, .78, s + .3 * (N1(p * .7, 0.) - .5));
  // g: the white water's shadow, baked here once so the sand and surface programs only sample it
  float pg, pc = plCol(p, pg);
  // b: the sun focused under this surface point (the light map where its light lands, as broad as this map's texel), the
  // excess over the mean only, under no foam or white water: the volume's shafts read it along each ray, so a ray ends on
  // its knot of the net (its mip levels where the ray's samples stand far apart)
  float hb = max(DEP - SLP * dot(p, SHORE), .3);
  vec2 uc = (p - SUNW.xz / SUNW.y * hb - CZC) / CZE + .5;
  vec2 um = abs(uc - .5) * 2.;
  float E = max(czI(uc, log2(MAPE / 512. * CZN / CZE)) - 1., 0.) * smoothstep(1., .45, max(um.x, um.y));
  E *= exp(-pc * .9) * (1. - .8 * clamp(f, 0., 1.));
  oC = vec4(clamp(f * .5, 0., 1.), clamp(pc / 8., 0., 1.), E / (E + 2.5), clamp(pg / 8., 0., 1.) * inMap(p));
}`,Vt=`
in vec2 vUV; out vec4 oC;
// two programs that compile side by side: VP 1 the white water of the broken crests, VP 2 the sun shafts, the sand
// clouds and the plunging fingers
#if VP == 2
const int MB = 10;
uint m0 = 0u, m1 = 0u;   // the (at most MB) blobs this ray passes: their indices, 6 bits each, five to a word
int nb = 0;
// bubble and sand densities at x; ts gathers each blob's sun transmittance (from the blobs above it, worked out per frame)
float blobs(vec3 x, out float rs, out float ts, out float rh) {
  float rb = 0.; rs = 0.; ts = 0.; rh = 0.;
  for (int k = 0; k < nb; k++) {
    {
      int i = int(((k < 5 ? m0 >> uint(6 * k) : m1 >> uint(6 * k - 30))) & 63u);
      vec4 P = texelFetch(uD, ivec2(i, 1), 0), Q = texelFetch(uD, ivec2(i, 2), 0);
      vec3 v = x - P.xyz;
      v.y /= Q.w;
      float e = dot(v, v) / (P.w * P.w), g = Q.x * exp(-e);
      if (Q.y > .5) rs += g; else { rb += g; float hh = 1. / (1. + e * .4); rh += Q.x * hh * hh; }
      ts += g * Q.z;
    }
  }
  return rb;
}
#else
// the white water of the broken crests at x: the plume's density (x), its mist of fine bubbles (y), and the plume's
// optical depth above x (z: what the light from the surface has passed through to reach x). The plume hangs from the
// surface along the whole crest: rounded boils at its underside sinking with the plunge, then curtains of bubbles
// rising at their own speeds as it ages.
vec4 plume(vec3 x, vec3 fl, float st, bool full) {
  vec4 r = vec4(0., 0., 0., 1.);
#ifdef PLSTUB
  return r;
#endif
  vec3 Ld = normalize(SUNW + vec3(0., .8, 0.));
  vec2 lq = vec2(.6 * dot(Ld.xz, SDIR) + .14 * dot(Ld.xz, vec2(-SDIR.y, SDIR.x)), .22 * dot(Ld.xz, vec2(-SDIR.y, SDIR.x)) - .3 * dot(Ld.xz, SDIR));
  float s = dot(x.xz, SDIR), u = dot(x.xz, vec2(-SDIR.y, SDIR.x));
  for (int e = 0; e < NCRE; e++) {
    vec4 A = uP[26 + 2 * e], B = uP[27 + 2 * e], c = vec4(0.);
    c.x = (A.x - s) / C1;
    if (c.x > -1.6 / C1 && c.x < 36.) c.w = s - (A.y + B.w * abs(u - A.w) + 1.2 * sin(u * .11 + B.z * 1.3)); else c.w = -1e5;
    if (c.w > -3.6) {
      float env = .5 + .25 * sin(u * .07 + B.y) + .17 * sin(u * .15 + B.z) + .1 * sin(u * .33 + B.y * 1.7 + B.z);
      c.y = A.z * smoothstep(.28, .6, env);
    } else c.y = 0.;
    if (c.y > 0.) {
      float S = c.y, a0 = max(c.x, 0.);
      float sk = .55 * min(a0, 1.4) - .2 * max(a0 - 1.4, 0.);
      // the boils are rolls with their axes along the crest (the breaker's vortex), drawn out along it: torn rolls and
      // streaks, not round puffs
      vec3 q = vec3(s * .6 + u * .14, (x.y + sk) * .8, u * .22 - s * .3);
      vec3 qn = q * .85 + fl * .3;
      // the boil noise a step toward the light (the sun and the bright surface above): its change shades the skin
      float n1 = textureLod(uN3, qn, 0.).r, n2 = textureLod(uN3, q * 1.9 + vec3(3.1, 1.7, .4) + fl * .5, 0.).r;
      float n0 = textureLod(uN3, qn * .31 + vec3(.5, .2, .9), 0.).b;
      // where the crest's strength runs out along it, the white water frays: the boil field decides, point by point in
      // depth too, where it still hangs, so the end tapers into torn curtains and plumes (S alone ended it on one
      // smooth surface, which looked along drew a straight edge from the ceiling to the sand)
      float fr = smoothstep(0., .45, 3. * S / max(uP[26 + 2 * e].z, .05) - .15 + (n0 - .5) * 1.1 + (n1 - .5) * .9 + (n2 - .5) * .5);
      S *= fr;
      // the front is where the lip went in, never a ruled line: the boils run ahead or lag by a metre, in depth too
      float a = c.x + ((n0 - .5) * 2.4 + (n1 - .5) * 1.2 + (n2 - .5) * 1.2) / C1, fa = smoothstep(0., .06, a);
      a = max(a, 0.);
      // the seaward edge, where the lip went in: a ragged curtain pushed in and out by the same boils
      float rho = S * fa * plRho(a) * smoothstep(36., 20., a + (n0 - .5) * 10.) * smoothstep(-.2, .2, c.w + (n0 - .5) * 2.6 + (n1 - .5) * 2. + (n2 - .5) * 1.4);
      // nothing here when neither the plume (rho) nor its mist (g1, g2) reaches this point: skip the rest
      float g1 = smoothstep(-1.3, .3, c.w + (n0 - .5) * 2.6 + (n1 - .5) * 2.), g2 = smoothstep(0., .3, a);
      if (rho > 0. || (full && g1 > 0. && g2 > 0.)) {
      // deeper and shallower sections along the crest, shallowing toward the line where the lip went in
      // fingers: where the plunge drives the bubbles down in slanted columns (leaning shoreward with depth), the white
      // water reaches twice as deep, so its underside is ragged by a metre and more
      float nf = textureLod(uN3, vec3(u * .55, (s - x.y * .7) * .6 + a * .04, x.y * .12 + a * .03) + vec3(.13, .71, .37), 0.).b;
      float fg = smoothstep(.56, .82, nf) * smoothstep(.15, .6, a);
      float Dp = plDp(a, S) * (.4 + .6 * fr) * (.7 + .5 * sin(u * .23 + uP[27 + 2 * e].y * 2.) * sin(u * .097 + 1.3)) * (.3 + .7 * smoothstep(-.3, 3.5, c.w + (n0 - .5) * 3.)) * (1. + 1.3 * fg);
      float hgt = (x.y + .1 + Dp) / max(Dp, .25);
      // the skin is sharp where the march walks it in short steps, softened to the step's length on the coarse steps
      float ew = .05 + (st < .1 ? .2 : .9) * st / max(Dp, .25);
      // below the boils, turbulence down to a few centimetres where the march walks the skin in short steps: ridged eddies
      // (folds within folds) drawn out along the plunge and moving with it, so the skin is grainy, never a soft puff
      float n3 = textureLod(uN3, vec3(q.x * 5.3, q.y * 3.1 - a * .9, q.z * 5.3) + fl * 1.1 + vec3(.31, .17, .73), 0.).g;
      float m = hgt + (n0 - .5) * 1.2 + (n1 - .5) * 1.8 + ((n2 - .5) * .6 + (n3 - .55) * .7) / (1. + 2. * st) - .15;
      // the deepest reach, after the noise: a floor that rises and falls with the boils, never a plane, never at the eye
      // (the cap eases in, never a flat floor where the noise runs high)
      float yf = -.1 - min(Dp * (1.75 + (n0 - .5) * 1.4 + (n2 - .5) * .6), DEP * .82 * (1. - exp(-(.18 + .3 * n0 + .55 * n2) / .45)));
      float dn = rho * smoothstep(0., ew, m) * smoothstep(yf - .05, yf + .3, x.y) * (1. + 1.5 * smoothstep(-.7, -.12, x.y));
      if (dn > 0.) {
        float rope = textureLod(uN3, vec3(s * 1.1 + u * .83, (x.y - .3 * a) * .26, u * 1.1 - s * .83) + .7, 0.).g;
        dn *= mix(1., .2 + 1.6 * rope * rope, smoothstep(.8, 4.5, a));
      }
      // the mist thins out seaward past the line where the lip went in and with age by the same boils, never on a plane
      if (!full) r.x += dn;
      else {
      float mi = c.y * (.35 + .65 * fr) * (.16 * exp(-a / 4.) + .06 * exp(-a / 25.) * smoothstep(36., 20., a + (n0 - .5) * 10.)) * smoothstep(-1.2, .05, m) * smoothstep(yf - 1.1, yf, x.y) * (.4 + 1.2 * n2)
        * g1 * g2;
      r.xyz += vec3(dn, mi, rho * 3. * clamp(-x.y - .1, 0., Dp));
      // relief: the boils' sides toward the sun and the bright surface lit near white, the folds and undersides
      // grey-green (where the boil field falls toward the light, the skin faces it)
      if (dn > 0.) {
        float n1u = textureLod(uN3, qn + vec3(lq.x, .8 * Ld.y, lq.y) * .85 * .1, 0.).r;
        float rl = clamp(1. - 8. * (n1u - n1) + .4 * (n2 - .5) + .7 * (n3 - .55), .35, 1.9);
        r.w = mix(r.w, rl, smoothstep(0., .3, dn));
      }
      }
      }
    }
  }
  return r;
}
#endif
void main() {
  vec2 q = vUV * 2. - 1.;
  vec3 d = normalize(FW + (q.x * RT + q.y * UPV) * TANH), o = CAM;
  float tSf = d.y > .003 ? (-.1 - o.y) / d.y : 1e5;
  float tE = min(min(botPlane(o, d), tSf), 40.);
  // outside Snell's window the surface is a mirror: the march carries on into the reflection (the world folded at the surface)
  float refl = d.y > .003 ? smoothstep(.7, .6, d.y) : 0.;
  float tM = refl > 0. ? min(tSf + (DEP - .3) / d.y, 40.) : tE;
  // the march's start jittered per pixel by a hash (no lattice for the eye to find: a gradient noise drew hatching)
  float j = fract(hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u + 7u) + TIME * 18.618);
  vec3 acc = vec3(0.);
  float t0 = 1e5, t1 = 0.;
#if VP == 2
  // sun shafts: each point on the ray is lit by the surface point straight up-sun of it, whose focus is baked in the
  // foam map's blue channel; that point runs along a line as the ray goes, so a sample is one read, from a mip level
  // as broad as the stretch of surface the sample stands for. Only light added, bright in the upper metres, gone by the sand.
  float tS = min(tE, 7.), shf = 0.;
  float dsp = length(d.xz - SUNW.xz / SUNW.y * d.y) * 512. / MAPE;
  for (int k = 0; k < 16 + ZI; k++) {
    float u = (float(k) + .3 + .4 * j) / 16., t = tS * u * u, dt = tS * 2. * u / 16.;
    vec3 x = o + d * t;
    float h = max(-x.y, 0.);
    vec2 sp = x.xz + SUNW.xz / SUNW.y * h;
    // the rays are the focus over its neighbourhood's mean: no glow, nothing taken away
    vec2 fu = (sp - MAPC) / MAPE + .5;
    float ld = log2(max(dsp * dt * .6, 1.)), F = textureLod(uF, fu, ld).b - textureLod(uF, fu, max(ld + 2.5, 4.5)).b;
    shf += max(F, 0.) * dt * smoothstep(.1, .7, h) * exp(-h / 2.2 - (SIG + .08) * t);
  }
  acc += SUNC * SUNE * hg(dot(d, SUNW), .62) * uP[19].w * SHP * 8. / (1. + 4. * SANDT) * shf;
#else
  // the white water: bound the march by each crest's slab
  float s0 = dot(o.xz, SDIR), sd = dot(d.xz, SDIR);
  for (int e = 0; e < NCRE; e++) {
    vec4 A = uP[26 + 2 * e];
    // this crest's white water lies between the surface and its deepest reach (unless the ray goes on into the mirror)
    float ty0 = 0., ty1 = 1e5, yl = -1.3 - DEP * .75;
    bool ok = true;
    if (abs(d.y) > 1e-4) {
      float ya = (yl - o.y) / d.y, yb = (-.02 - o.y) / d.y;
      if (d.y > 0.) { ty0 = ya; ty1 = refl > 0. ? 1e5 : yb; } else { ty0 = yb; ty1 = ya; }
    } else ok = o.y >= yl;
    float lo = max(A.y - 5., A.x - C1 * 36.), hi = A.x + 1.7, ta = -1e5, tb = 1e5;
    if (abs(sd) > 1e-4) { ta = (lo - s0) / sd; tb = (hi - s0) / sd; if (ta > tb) { float k = ta; ta = tb; tb = k; } }
    else ok = ok && s0 >= lo && s0 <= hi;
    ta = max(max(ta, ty0), 0.); tb = min(tb, ty1);
    if (ok && tb > ta) { t0 = min(t0, ta); t1 = max(t1, tb); }
  }
#endif
#if VP == 2
  for (int i = 0; i < NBLB; i++) {
    vec4 b = texelFetch(uD, ivec2(i, 1), 0), b2 = texelFetch(uD, ivec2(i, 2), 0);
    vec3 oc = o - b.xyz, om = vec3(oc.x, o.y + .2 + b.y, oc.z);
    float R = b.w * (b2.y > .5 ? 1.9 : 3.) * max(b2.w, 1.), bb = dot(oc, d), dc = bb * bb - dot(oc, oc) + R * R;
    float bm = dot(om, d), dm = refl > 0. ? bm * bm - dot(om, om) + R * R : -1.;
    if ((dc > 0. || dm > 0.) && nb < MB) {
      if (dc > 0.) { float sq = sqrt(dc); t0 = min(t0, -bb - sq); t1 = max(t1, -bb + sq); }
      if (dm > 0.) { float sq = sqrt(dm); t0 = min(t0, -bm - sq); t1 = max(t1, -bm + sq); }
      if (nb < 5) m0 |= uint(i) << uint(6 * nb); else m1 |= uint(i) << uint(6 * nb - 30);
      nb++;
    }
  }
#endif
  t0 = max(t0, 0.); t1 = min(t1, min(tM, 30.));
  float Tr = 1.;
  if (t1 > t0) {
    vec3 wc = wcol(d) * wwG(o, d);
    float phs = hg(dot(d, SUNW), .55);
    vec3 fl = uP[21].xyz;
    // coarse steps crowd near the eye and stretch far off (md 0) until the young white water's skin is met; then a few
    // halvings find the skin (md 1) and short steps walk in from it (md 2): what is seen of the white water is its skin,
    // which is opaque within a hand's width. Thin white water and mist take the coarse steps.
    int md = 0, nk = 0, nm = 0;
    float tp = t0, ta = t0, tb = t0, tc = t0;
    for (int i = 0; i < 50 + ZI; i++) {
      if (md == 0 && nk >= 28) break;
      float u0 = (float(nk) + .2 + .6 * j) / 28., t = t0 + (t1 - t0) * u0 * u0, dt = (t1 - t0) * 2. * u0 / 28.;
      if (md == 1) { t = .5 * (ta + tb); dt = .07; }
      if (md == 2) { t = tc; dt = min(.07 * (1. + .3 * float(nm)), .3); tc += dt; }
      vec3 x = o + d * t;
      float wr = 1.;
      if (x.y > -.1) { x.y = -.2 - x.y; wr = refl; }
#if VP == 1
      vec4 P = plume(x, fl, dt, md != 1);
      bool dense = P.x * 3. > (md == 0 ? 1.1 : 1.5);
#else
      vec4 P = vec4(0., 0., 0., 1.);
      bool dense = false;
#endif
      bool take = md == 2 || (md == 0 && !dense);
      if (md == 0 && dense) { md = 1; nm = 0; ta = tp; tb = t; }
      else if (md == 1) { if (dense) tb = t; else ta = t; nm++; if (nm == 6) { md = 2; nm = 0; tc = ta; } }
      else if (md == 2) { nm++; if ((nm >= 9 && !dense) || tc > t1) { md = 0; nk = int(ceil(28. * sqrt(clamp((tc - t0) / (t1 - t0), 0., 1.)) - .2 - .6 * j)); } }
      else { tp = t; nk++; }
      float rs = 0., ts = 0., rh = 0., rb = 0.;
#if VP == 2
      x += (textureLod(uN3, x * .33 + fl * .5, 0.).rgb - .5) * .8; rb = blobs(x, rs, ts, rh);
#endif
      float hz = max(rh - rb * .8, 0.) * .14;
      float db = 0., ds = 0., dh = 0., Tsun = 1.;
#if VP == 2
      if (rb + rs + hz > .02) {
        float dp = smoothstep(.3, 1.3, -x.y), n1, n2;
        { vec4 nn = textureLod(uN3, x * vec3(1.7, mix(.8, .36, dp), 1.7) + fl * 1.3, 0.); n1 = nn.r; n2 = nn.g; }
        float n = mix(n1 * .5 + n2 * .5, n1 * .22 + n2 * n2 * .9, dp);
        float rc = 1. - exp(-rb * 1.3);
        db = clamp((rc * (.12 + 1.95 * n) - .38 + .16 * smoothstep(.5, .12, -x.y) - .3 * smoothstep(.4, 1.8, -x.y)) * mix(4.2, 3., dp), 0., 2.8); ds = max(rs * (.4 + n) - .25, 0.);
        dh = hz * (.5 + n) * .9;
        Tsun = ts / max(rb + rs, 1e-3) * exp(-rb * (.3 + 1.4 * n) * 1.5);
      }
#endif
      // on a coarse step only thin white water counts: near the skin's threshold it is the skin's smeared edge, which
      // the short steps draw (counted here it drew bright lines along the step lattice)
      float dpl = P.x * 3. * (md == 0 ? smoothstep(.8, .25, P.x * 3.) : 1.), dmi = P.y * 1.3, sg = db * 4.5 + ds * 3. + dh + dpl + dmi;
      if (take && sg > 1e-3) {
      float h = max(-x.y, 0.), Es = SUNE * exp(-SIG * .75 * h / SUNW.y);
      vec3 am = AMB * exp(-SIG * .5 * h);
      // light inside the white water: what got through the plume above (sun and the bright surface), so its top and
      // thin edges glow and its thick core goes grey-green
      float Tps = exp(-P.z * .5 / SUNW.y), Tpa = exp(-P.z * .4);
      Tsun *= Tps;
#if VP == 2
      vec3 Lb = vec3(.94, 1., 1.) * (SUNC * Es * (phs * 5. * Tsun + .4 * pow(Tsun, .75) + .1 * Tps) + am * (.35 + .6 * sqrt(Tsun)) * (1. + .6 * smoothstep(1.2, 0., h)) * Tpa) * uP[20].w;
      vec3 Ls = mix(uP[12].rgb * 1.3 + .1, wc, .4) * (SUNC * Es * .5 * (.5 + .5 * Tsun) + am * 1.1);
      vec3 Lm = ((db * 4.5 + dh) * Lb + ds * 3. * Ls) / sg;
#else
      // bubbles scatter the water's own light: the white water carries the water's hue, paler where it is thin and lit
      vec3 Lp = mix(vec3(.92, 1., 1.), wc / max(max(wc.r, max(wc.g, wc.b)), 1e-3), .22 * (1. - .5 * Tps)) * (SUNC * Es * (phs * 4. + .45) * Tps + am * (.12 + 1.15 * Tpa) * (1. + .6 * smoothstep(1.2, 0., h))) * uP[20].w * P.w;
      vec3 Lmi = mix(vec3(.85, 1., 1.), wc * 3., .4) * (SUNC * Es * (phs * 3. + .3) * Tps + am * (.4 + .9 * Tpa) + (SUNC * Es * .3 + am * .9) * (1. - Tps));
      vec3 Lm = (dpl * Lp + dmi * Lmi) / sg;
#endif
      float Ts = exp(-sg * dt), Tw = exp(-SIG * t);
      acc += Tr * (1. - Ts) * wr * (Lm * Tw + wc * (1. - Tw));
      Tr *= mix(1., Ts, wr);
      }
      if (Tr < .02) break;
    }
  }
  oC = vec4(acc, Tr);
}`,Po=`
out vec4 vC; out float vR; flat out int vK;
void main() {
  int id = gl_VertexID, nb = int(uP[14].z);
  vec3 p; float r; vK = 0;
  float fa = 1.;
  if (id < nb) {
    vec4 b = texelFetch(uD, ivec2(id & 63, 5 + (id >> 6)), 0);
    p = b.xyz; r = b.w * 1.7;
  } else if (id >= nb + ${wt}) {
    // single bubbles of the white water: at its skin and underside, sizes by a power law (many fine, a few large), each
    // rising at its own speed for its own life, then born again elsewhere (a fresh draw per life, so nothing repeats)
    int k = id - nb - ${wt}, e = k % max(NCRE, 1);
    vec4 A = uP[26 + 2 * e], B = uP[27 + 2 * e];
    // in clumps of eight (the torn fringe of a boil), most of them along the white water's underside
    uint h0 = uint(k >> 3) * 2654435761u + uint(e) * 977u + 13u, hi = uint(k) * 747796405u + 5u;
    float life = 1.4 + 2.6 * hf(h0), tc = TIME + hf(h0 + 1u) * life, cyc = floor(tc / life), tl = tc - cyc * life;
    uint h = hsh(h0 ^ (uint(cyc) * 0x9e3779b9u)), hb = hsh(hi ^ (uint(cyc) * 0x85ebca6bu));
    float ag = min(max(B.x, 0.), 9.) * pow(hf(h), 1.7), sp = A.x - C1 * ag;
    vec2 pr = vec2(-SDIR.y, SDIR.x), xz = sp * SDIR + (dot(CAM.xz, pr) + (hf(h + 1u) - .5) * 16.) * pr;
    float cr = .05 + .2 * hf(h + 4u);
    xz += (vec2(hf(hb), hf(hb + 1u)) - .5) * cr * 2.;
    vec4 c = crest(e, xz);
    float S = crW(c) * smoothstep(-.1, .4, c.w), Dp = plDp(max(c.x, 0.), S);
    r = .0003 / pow(.03 + .97 * hf(hb + 2u), .6);
    float y = -.12 - Dp * (hf(h + 3u) < .7 ? 1.25 + .7 * hf(h + 5u) : .3 + 1.2 * hf(h + 5u)) + (hf(hb + 3u) - .5) * cr * 1.5 + (25. * r + .04) * tl;
    p = vec3(xz.x + uP[14].x, min(y, -.04), xz.y + uP[14].y);
    fa = step(.05, S) * step(0., B.x) * smoothstep(0., .25, tl) * smoothstep(life, life - .35, tl) * smoothstep(-.03, -.12, y);
    vK = 2;
  } else {
    uint h = uint(id) * 747796405u + 2891336453u;
    vec3 u = vec3(hf(h), hf(h + 1u), hf(h + 2u));
    vec2 xz = mod(u.xz * 12. + uP[22].xy - CAM.xz + 6., 12.) - 6. + CAM.xz;
    float yb = botY(xz);
    float y = mix(yb + .03, -.25, pow(u.y, 1.3)) + .08 * sin(TIME * (.2 + .3 * u.x) + u.z * 40.);
    vec2 sw = vec2(0.);
    for (int i = 0; i < NSW; i++) {
      vec4 w = texelFetch(uD, ivec2(i, 0), 0);
      float k = length(w.xy);
      sw += w.z / (k * DEP) * cos(dot(w.xy, xz) + w.w) * w.xy / k;
    }
    xz += sw + uP[14].xy;
    p = vec3(xz.x, y, xz.y);
    r = .0003 + .0012 * hf(h + 3u) * hf(h + 4u);
    vK = 1;
  }
  vec3 v = p - CAM;
  float z = dot(v, FW), dl = length(v);
  if (z < .08 || fa <= 0.) { gl_Position = vec4(2., 2., 2., 1.); gl_PointSize = 0.; vC = vec4(0.); vR = 0.; return; }
  gl_Position = vec4(dot(v, RT) / (z * TANH), dot(v, UPV) / (z * TANH), 0., 1.);
  float px = r / (z * TANH) * SZ * .5;
  float coc = abs(1. / z - 1. / 3.5) * .0025 * SZ;
  float sz = max(px * 2., 1.2) + coc;
  gl_PointSize = min(sz + 1., 48.);
  vR = px;
  vec3 dd = v / dl;
  float h = max(-p.y, 0.), Es = SUNE * exp(-SIG * .75 * h / SUNW.y);
  vec3 L;
  if (vK != 1) L = (SUNC * Es * (1.2 + 5. * hg(dot(dd, SUNW), .6)) + AMB * 2.4) * (vK == 0 ? 1.1 : .95);
  else L = (SUNC * Es * (.25 + 3. * hg(dot(dd, SUNW), .7)) + AMB * .7) * mix(vec3(.9, .9, .85), uP[12].rgb * 1.6, .5);
  float T = exp(-tau(CAM, dd, dl));
  float cov = min(1., (max(px * 2., .8) * max(px * 2., .8)) / (sz * sz));
  if (vK == 2) { L *= 1.7; cov = max(cov, .85); gl_PointSize = max(gl_PointSize, 2.2); }
  vC = vec4(tmap(L * T + wcol(dd) * (1. - T)), min(1., cov * T * (vK == 0 ? 2.6 : vK == 2 ? 1.6 : .55)) * fa);
}`,So=`
in vec4 vC; in float vR; flat in int vK; out vec4 oC;
void main() {
  vec2 u = gl_PointCoord * 2. - 1.;
  float r = length(u);
  if (r > 1.) discard;
  float a;
  if (vK != 1 && vR > (vK == 2 ? 4. : 1.8)) {
    // a big bubble: silver rim by total reflection, a clear middle, a highlight on top
    a = smoothstep(.55, .9, r) * (1. - smoothstep(.9, 1., r)) * .95 + .9 * smoothstep(.38, 0., length(u - vec2(-.25, -.45)));
    a = min(a, 1.);
  } else a = 1. - smoothstep(0., 1., r);
  oC = vec4(vC.rgb, 1.) * a * vC.a;
}`,Ao=`
in vec2 vUV; out vec4 oC;
void main() {
  oC = vec4(texture(uS, vUV).rgb, 1.);
}`;function Ye(o,a,p){let d=Math.imul(o^2654435769,2246822507)^Math.imul(a+2135587861,3266489909)^Math.imul(p+374761393,668265263);return d^=d>>>15,d=Math.imul(d,739982445),d^=d>>>12,d=Math.imul(d,695872825),d^=d>>>15,(d>>>0)/4294967296}const Le=o=>o*o*o*(o*(o*6-15)+10);function No(o){const d=new Uint8Array(65536),T=new Float32Array(16*16),h=new Float32Array(16*16);for(let M=0;M<4;M++){for(let N=0;N<16*16;N++){const G=Ye(N,M,11)*_;T[N]=Math.cos(G),h[N]=Math.sin(G)}for(let N=0;N<128;N++){const G=(N+.5)/128*16,m=Math.floor(G),F=G-m,y=Le(F),z=m%16*16,w=(m+1)%16*16;for(let E=0;E<128;E++){const U=(E+.5)/128*16,A=Math.floor(U),W=U-A,B=Le(W),ee=A%16,he=(A+1)%16,te=T[z+ee]*W+h[z+ee]*F,O=T[z+he]*(W-1)+h[z+he]*F,ce=T[w+ee]*W+h[w+ee]*(F-1),xe=T[w+he]*(W-1)+h[w+he]*(F-1),ge=te+(O-te)*B,fe=ge+(ce+(xe-ce)*B-ge)*y;d[(N*128+E)*4+M]=j(Math.round((fe*.85+.5)*255),0,255)}}}const L=o.createTexture();return o.bindTexture(o.TEXTURE_2D,L),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,128,128,0,o.RGBA,o.UNSIGNED_BYTE,d),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),L}function Ro(o){const p=new Uint8Array(131072),d=(m,F)=>{const y=new Float32Array(m*m*m*3);for(let w=0;w<m*m*m;w++){let E=Ye(w,F,1)*2-1,U=Ye(w,F,2)*2-1,A=Ye(w,F,3)*2-1;const W=Math.hypot(E,U,A)||1;y[w*3]=E/W,y[w*3+1]=U/W,y[w*3+2]=A/W}const z=new Float32Array(32*32*32);for(let w=0;w<32;w++)for(let E=0;E<32;E++)for(let U=0;U<32;U++){const A=(U+.5)/32*m,W=(E+.5)/32*m,B=(w+.5)/32*m,ee=Math.floor(A),he=Math.floor(W),te=Math.floor(B),O=A-ee,ce=W-he,xe=B-te,ge=Le(O),fe=Le(ce),Fe=Le(xe);let Se=0;for(let V=0;V<8;V++){const H=V&1,b=V>>1&1,q=V>>2,le=(((te+q)%m*m+(he+b)%m)*m+(ee+H)%m)*3;Se+=(y[le]*(O-H)+y[le+1]*(ce-b)+y[le+2]*(xe-q))*(H?ge:1-ge)*(b?fe:1-fe)*(q?Fe:1-Fe)}z[(w*32+E)*32+U]=Se}return z},T=d(4,1),h=d(8,2),L=d(8,3),M=d(16,4),N=d(4,5);for(let m=0;m<32*32*32;m++){p[m*4]=j(Math.round(((T[m]*.65+h[m]*.35)*1.1+.5)*255),0,255);const F=1-Math.abs(L[m]*.65+M[m]*.35)*2.4;p[m*4+1]=j(Math.round(F*255),0,255),p[m*4+2]=j(Math.round((N[m]*1.2+.5)*255),0,255),p[m*4+3]=255}const G=o.createTexture();o.bindTexture(o.TEXTURE_3D,G),o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage3D(o.TEXTURE_3D,0,o.RGBA8,32,32,32,0,o.RGBA,o.UNSIGNED_BYTE,p),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const m of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,m,o.REPEAT);return o.bindTexture(o.TEXTURE_3D,null),G}function ko(o){if(o.__c541)return o.__c541;const a=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float"),p=(y,z)=>{const w=o.createShader(y);return o.shaderSource(w,z),o.compileShader(w),w},d={cz:[ae+To,ae+Eo],foam:[me,ae+Mo],vol:[me,`#define VP 1
`+ae+Vt],vol2:[me,`#define VP 2
`+ae+Vt],pt:[ae+Po,ae+So],fin:[me,ae+Ao]};a?(d.mainS=[me,`#define MP 1
`+ae+Ze],d.main=[me,`#define MP 2
`+ae+Ze]):d.main=[me,`#define MP 0
`+ae+Ze];const T=bo?[["start",performance.now()]]:null,h={};for(const y in d){const z=o.createProgram(),w=p(o.VERTEX_SHADER,He+d[y][0]),E=p(o.FRAGMENT_SHADER,He+d[y][1]);o.attachShader(z,w),o.attachShader(z,E),o.linkProgram(z),h[y]={p:z,v:w,f:E}}o.flush();const L=()=>{if(!a||h.mainSF)return;const y=o.createProgram(),z=p(o.VERTEX_SHADER,He+me),w=p(o.FRAGMENT_SHADER,He+`#define MP 1
#define FAR
`+ae+Ze);o.attachShader(y,z),o.attachShader(y,w),o.linkProgram(y),o.flush(),h.mainSF={p:y,v:z,f:w}};T&&T.push(["submit",performance.now()]);const M=No(o),N=Ro(o);T&&T.push(["noise",performance.now()]);const G=y=>{if(!("uP"in h[y])){const{p:z,v:w,f:E}=h[y],U=o.getProgramParameter(z,o.LINK_STATUS);if(T&&T.push([y,performance.now()]),!U)throw new Error("541 "+y+": "+(o.getShaderInfoLog(w)||"")+(o.getShaderInfoLog(E)||"")+o.getProgramInfoLog(z));o.useProgram(z),["uN","uD","uV","uN3","uS","uW","uF","uX","uV2"].forEach((A,W)=>{const B=o.getUniformLocation(z,A);B&&o.uniform1i(B,W)}),h[y]={p:z,uP:o.getUniformLocation(z,"uP")}}return h[y]},m=o.createVertexArray(),F=o.createTexture();return o.bindTexture(o.TEXTURE_2D,F),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,64,12,0,o.RGBA,o.FLOAT,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.__c541={tl:T,P:h,use:G,kick:L,hf:a,tN:M,tN3:N,tD:F,vao:m,rt:{}}}function Pe(o,a,p,d,T,h,L){const M=o.createTexture();o.bindTexture(o.TEXTURE_2D,M),o.texImage2D(o.TEXTURE_2D,0,d,a,p,0,T,h,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,L),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,L),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const N=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,N),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,M,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:M,fb:N,w:a,h:p}}Lt.add({num:541,name:"Under the Surf",fam:"Vistas",recipe:"A few metres down in the surf on a bright morning, looking up at the underside of the waves with a bright circle of sky and broken sun in the middle. Each wave breaks right over you, driving foam and bubbles down that rise again in curtains. The moment, where you sit and the swell change every mint. Tap overhead to pick where the next wave breaks, drag to slosh the surge back and forth, or hold to bring in a bigger set.",interactive:"Tap a spot overhead to choose where the next wave breaks: it arrives in its own time and goes over hardest there. Drag to send the surge sloshing back and forth, swaying motes, bubbles and weed together. Sets come through on their own; hold to bring in a bigger one: the light flickers harder, more crests break and the bottom clouds with sand.",music:!0,gl:!0,fps:30,seed:0,make(o){const a=o.gl,p=o.size,d=ko(a);let T=2654435769;for(let e=2;e<o.hash.length;e+=8)T=Math.imul(T^parseInt(o.hash.slice(e,e+8),16),2246822507)>>>0;const h=()=>{T=T+1831565813|0;let e=Math.imul(T^T>>>15,1|T);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},L=e=>{let s=0;for(const r in e)s+=e[r];let t=h()*s;for(const r in e)if(t-=e[r],t<0)return r;return Object.keys(e)[0]};let M=L({"Morning sun":45,"High sun":25,"Low gold sun":18,"Veiled sun":12}),N=L({"Head-high":45,"Small surf":30,"Overhead sets":17,"Big wave day":8}),G=L({"Green surf":45,"Blue clear":27,"Milky after a storm":18,Crystal:10}),m=L({"Three metres":50,"Two metres":25,"Five metres":25}),F=L({"Fine ripples":50,"Coarse megaripples":22,"Shell grit":18,"Black volcanic sand":10}),y=L({"A few shells":45,"Weed strands":25,"Shell drift":18,"Bare sand":12}),z=L({"Lacy foam":50,"Thick rafts":30,Clean:20}),w=L({"Light chop":55,Glassy:20,"Onshore wind":25});o.home&&(M="Morning sun",N="Head-high",G="Green surf",m="Three metres",F="Fine ripples",y="A few shells",z="Lacy foam",w="Light chop"),o.trait("Sun",M),o.trait("Swell",N),o.trait("Water",G),o.trait("Depth",m),o.trait("Sand",F),o.trait("On the sand",y),o.trait("Foam",z),o.trait("Chop",w);let E=625341585;for(let e=2;e<o.hash.length;e+=8)E=Math.imul(E^parseInt(o.hash.slice(e,e+8),16),2654435761)>>>0;const U=()=>{E=E+1831565813|0;let e=Math.imul(E^E>>>15,1|E);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let A="Along the beach";{const e={"Along the beach":44,"Facing the shore":22,"Out to sea":22,"Under the break":12};let s=U()*100;for(const t in e)if(s-=e[t],s<0){A=t;break}}o.home&&(A="Along the beach"),o.trait("View",A);const W=A==="Along the beach";let B=1779033703;for(let e=2;e<o.hash.length;e+=8)B=Math.imul(B^parseInt(o.hash.slice(e,e+8),16),3266489909)>>>0;const ee=()=>{B=B+1831565813|0;let e=Math.imul(B^B>>>15,1|B);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},he=e=>{let s=ee()*100;for(const t in e)if(s-=e[t],s<0)return t;return Object.keys(e)[0]};let te=he({"A wave breaking":46,"Between sets":30,"The wave overhead":14,"After the set":10}),O=he({"Along the bottom":30,"Up into the water":44,"Up at the surface":20,"Straight up":6});const ce=ee(),xe=ee(),ge=ee(),fe=ee();o.home&&(te="A wave breaking",O="Up into the water"),A==="Under the break"&&O!=="Straight up"&&(O="Up at the surface");const Fe=G==="Milky after a storm"&&(O==="Up at the surface"||O==="Straight up");Fe&&(O="Up into the water");const Se=!o.home&&A==="Along the beach"&&ge<.5;o.trait("Moment",te),o.trait("Gaze",O);const V={"Along the beach":[.05,.36,1,1,.45],"Facing the shore":[1.3+.25*U(),.25,.6,.75,.2],"Out to sea":[-1.4-.25*U(),.28,1.9,.5,.45],"Under the break":[.05+(U()-.5)*.5,.66+.08*U(),.45,1,.45]}[A];!o.home&&A!=="Under the break"?V[1]={"Along the bottom":.1+.14*ce,"Up into the water":.3+.15*ce,"Up at the surface":.55+.25*ce,"Straight up":1.55}[O]:O==="Straight up"?V[1]=1.55:Fe&&(V[1]=.38+.1*ce),Se&&(V[0]=Math.PI-V[0]);const H=new Float32Array(Bt*4),b=(e,s,t,r,i)=>{H[e*4]=s,H[e*4+1]=t,H[e*4+2]=r,H[e*4+3]=i},q={"Three metres":3,"Two metres":2.1,"Five metres":5}[m],le=.03,Be=e=>-q+le*e,ne={"Morning sun":[20,-.5,[1,.9,.76],1,1400,.45],"High sun":[68,-.6,[1,.97,.92],1.15,1600,.2],"Low gold sun":[13,-.25,[1,.7,.45],.75,1200,.35],"Veiled sun":[24,-.5,[1,.95,.88],.55,60,.9]}[M],Ke=Se?Math.PI-ne[1]:ne[1],Ve=ne[0]*Math.PI/180,bt=[Math.sin(Ke)*Math.cos(Ve),Math.sin(Ve),Math.cos(Ke)*Math.cos(Ve)],je=Math.asin(Math.cos(Ve)/1.3333),Q=[Math.sin(Ke)*Math.sin(je),Math.cos(je),Math.cos(Ke)*Math.sin(je)];b(4,Q[0],Q[1],Q[2],ne[3]),b(5,bt[0],bt[1],bt[2],ne[4]);const $={"Green surf":[[.02,.15,.19],[.1,.3,.24],.12,.03],"Blue clear":[[.02,.11,.22],[.07,.24,.27],.14,0],"Milky after a storm":[[.1,.2,.17],[.27,.33,.25],.19,.09],Crystal:[[.015,.12,.23],[.05,.27,.28],.08,0]}[G],Uo=$[2],qt=$[3],Ae={"Fine ripples":[[.6,.53,.41],.14,.036,.25],"Coarse megaripples":[[.56,.5,.4],.55,.06,.5],"Shell grit":[[.64,.58,.49],.13,.015,1],"Black volcanic sand":[[.1,.095,.09],.11,.014,.15]}[F],Do={"A few shells":.1,"Weed strands":.06,"Shell drift":.4,"Bare sand":.015}[y],Io={"Lacy foam":.4,"Thick rafts":.75,Clean:.08}[z],Jo={"Lacy foam":1,"Thick rafts":1.4,Clean:.6}[z],Z={"Small surf":[.17,.35,.8],"Head-high":[.32,.7,1],"Overhead sets":[.46,.85,1.2],"Big wave day":[.62,1,1.45]}[N],Xt={"Light chop":1,Glassy:.45,"Onshore wind":1.6}[w],ve=[],Gt=(h()-.5)*.3;for(let e=0;e<3;e++){const s=e===0?34+10*h():22+20*h(),t=_/s,r=Gt+(e===0?0:(h()-.5)*.5),i=t*Math.sqrt(Ce*q)*(1-t*q*(t*q)/6);ve.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,k:t,a:Z[0]*(e===0?1:.3+.2*h()),om:i,ph:h()*_})}const qe=[],yt=w==="Onshore wind"?(h()-.5)*.6:h()*_;for(let e=0;e<18;e++){const s=3.6*Math.pow(.82,e)*(.92+.16*h()),t=_/s,r=yt+e*2.39996*(w==="Onshore wind"?.45:1)+(h()-.5)*.5;qe.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,k:t,a:.011*Math.pow(s,1.05)*(.6+.8*h())*Xt,om:Math.sqrt(Ce*t*Math.tanh(t*q)),ph:h()*_})}const gt=[];for(let e=0;e<11;e++){const s=.16*Math.pow(.76,e),t=_/s,r=yt+e*2.39996+.4*Math.sin(e*7.1);gt.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,a:.0088*s,om:Math.sqrt(Ce*t+73e-6*t*t*t),ph:e*1.93})}const Wt=6,_o=Wt+qe.length;let Qe=0;for(const e of qe)Qe+=e.a*e.k*e.a*e.k*.25;Qe=Math.sqrt(Qe);let Y=1,zt=1,Tt=1;const Ot=o.home?[3.6,3.3]:[U()*_,U()*_],Co=e=>1+.22*j((Math.sin(e*.097+Ot[0])+.7*Math.sin(e*.041+Ot[1])-.5)/.9,0,1),Ne=[0,0],$e=(e,s,t)=>{Ne[0]=0,Ne[1]=0;const r=Math.max(q-le*e,1);for(let i=0;i<ve.length;i++){const n=ve[i],c=n.a*Y*Math.sin(n.kx*e+n.kz*s-n.om*t+n.ph)*Math.sqrt(Ce/r);Ne[0]+=c*n.kx/n.k,Ne[1]+=c*n.kz/n.k}return Ne},Ht=-24,Zt=.5,Je=97,ue=new Float32Array(Je*3),Et=new Int32Array(Je);let et=0,Yt=0;const Lo=e=>{et++,Yt=e},Kt=e=>{Et[e]=et;const s=Ht+e*Zt,t=l.z+4,r=Math.max(q-le*s,1);let i=0,n=0,c=0;for(let f=0;f<ve.length;f++){const u=ve[f],v=u.kx*s+u.kz*t-u.om*Yt+u.ph,k=Math.sin(v),I=u.a*Y*k*Math.sqrt(Ce/r);i+=I*u.kx/u.k,n+=I*u.kz/u.k,c+=u.a*Y*(k+.3*u.a*Y/Z[0]*Math.sin(2*v-Math.PI/2))}ue[e*3]=i,ue[e*3+1]=n,ue[e*3+2]=c};let Mt=0;const jt=e=>{let s=(e-Ht)/Zt;s=s<0?0:s>Je-1.001?Je-1.001:s;const t=s|0;return Mt=s-t,Et[t]!==et&&Kt(t),Et[t+1]!==et&&Kt(t+1),t*3},g=new Float32Array(64*12*4),Fo=e=>{let s=0;for(let t=0;t<ve.length;t++){const r=ve[t],i=r.ph-r.om*e-r.kx*x.x-r.kz*x.z,n=r.a*Y;g[s]=r.kx,g[s+1]=r.kz,g[s+2]=n,g[s+3]=i,g[s+4]=2*r.kx,g[s+5]=2*r.kz,g[s+6]=.3*n*n/Z[0],g[s+7]=2*i-Math.PI/2,s+=8}for(let t=0;t<qe.length;t++){const r=qe[t];g[s]=r.kx,g[s+1]=r.kz,g[s+2]=r.a*Tt,g[s+3]=r.ph-r.om*e-r.kx*x.x-r.kz*x.z,s+=4}for(let t=0;t<gt.length;t++){const r=gt[t];g[s]=r.kx,g[s+1]=r.kz,g[s+2]=r.a,g[s+3]=(r.ph-r.om*e-r.kx*x.x-r.kz*x.z)%_,s+=4}},Qt=[1,0];b(6,q,le,Wt,.95),b(8,$[0][0],$[0][1],$[0][2],{"Morning sun":1,"High sun":.9,"Low gold sun":.8,"Veiled sun":.12}[M]),b(9,$[1][0],$[1][1],$[1][2],Io*(te==="Between sets"?.25:te==="After the set"?1.6:1));const Pt=M==="Veiled sun"?[.5,.6,.7]:M==="Low gold sun"?[.3,.48,.72]:[.22,.45,.85],St=M==="Low gold sun"?[1,.82,.62]:M==="Veiled sun"?[.85,.88,.9]:[.58,.74,.92];b(10,Pt[0],Pt[1],Pt[2],ne[5]),b(11,St[0],St[1],St[2],M==="Veiled sun"?.5:.15),b(12,Ae[0][0],Ae[0][1],Ae[0][2],Ae[1]);const $t=Gt+(h()-.5)*.2;b(13,Math.cos($t),Math.sin($t),Ae[2],Ae[3]),b(15,Qt[0],Qt[1],h()*65536|0,0);const At=[$[0][0]*.5+$[1][0]*.5+.05,$[0][1]*.5+$[1][1]*.5+.06,$[0][2]*.5+$[1][2]*.5+.06].map(e=>e*1.6*(.6+.4*ne[3]));b(19,At[0],At[1],At[2],1),b(20,ne[2][0],ne[2][1],ne[2][2],1.7);const oe=V[0],Nt=V[1],Jt=V[4];{const e=Math.cos(Nt);b(24,0,j(-q+Jt,-q+.15,-.9),0,1),b(25,Math.sin(oe)*e,Math.sin(Nt),Math.cos(oe)*e,0)}const tt=Math.tan((O==="Straight up"?54:37)*Math.PI/180),l={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},eo=()=>{const e=o.view||Ft;l.x=j(e.x||0,-3,3),l.z=j(e.z||0,-3,3),l.y=j(Be(l.x)+Jt+(e.y||0),Be(l.x)+.15,-.9);const s=oe+(e.yaw||0),t=j(Nt+(e.pitch||0),-1.4,1.56),r=Math.cos(t);l.fw=[Math.sin(s)*r,Math.sin(t),Math.cos(s)*r],l.rt=[Math.cos(s),0,-Math.sin(s)];const i=l.fw,n=l.rt;l.up=[i[1]*n[2]-i[2]*n[1],i[2]*n[0]-i[0]*n[2],i[0]*n[1]-i[1]*n[0]]},Bo=(e,s)=>{const t=e*2-1,r=1-s*2,i=[0,1,2].map(c=>l.fw[c]+(t*l.rt[c]+r*l.up[c])*tt),n=Math.hypot(i[0],i[1],i[2]);return i.map(c=>c/n)},Vo=y==="Weed strands",ot=y==="Weed strands"?.75:.42,Xe=[];{const e=Math.sin(oe+(h()-.5)*.5),s=Math.cos(oe+(h()-.5)*.5),t=1.75+.6*h(),r=e*t+.15,i=s*t;let n=h()*_,c=r-Math.cos(n)*ot/2,f=i-Math.sin(n)*ot/2;for(let u=0;u<4;u++)Xe.push([c,f]),n+=(h()-.5)*1.2,c+=Math.cos(n)*ot/3,f+=Math.sin(n)*ot/3}b(18,y==="Weed strands"?.007:.005,Vo?1:0,0,d.hf?0:1),b(35,yt,Xt,1.6*Z[0],M==="High sun"?.34:.16);let R=0;const D=[],se=[];let st=0;const x={x:0,z:0,vx:0,vz:0},Re=[0,0,0],at=[h()*12,h()*12];let Ge=qt;const we=ve[0],ze=we.om/we.k,P=we.kx/we.k,S=we.kz/we.k,to=e=>(we.om*e-we.ph+Math.PI/2)/_;let oo=Math.floor(to(0));const qo=(e,s)=>{const t=e*Math.sin(oe)+s*Math.cos(oe),r=e*Math.cos(oe)-s*Math.sin(oe);return[t*P+r*S,-t*S+r*P]};let so=0;const nt=e=>{if(D.length>=vt){let s=0;for(let t=1;t<D.length;t++)D[t].d<D[s].d&&(s=t);D.splice(s,1)}D.push(e)},es=e=>{se.length>=go&&se.shift(),se.push(e)},rt=new Float64Array(J),it=new Float64Array(J),ht=new Float64Array(J),ct=new Float64Array(J),Rt=new Float64Array(J),kt=new Float64Array(J),Ut=new Float64Array(J);let ke=0,de=0;const Dt=(e,s,t,r,i,n)=>{de>=J&&(ke=(ke+1)%J,de--);const c=(ke+de)%J;de++,rt[c]=e,it[c]=s,ht[c]=t,ct[c]=r,Rt[c]=i,kt[c]=0,Ut[c]=n},X=[],Xo=(e,s)=>.5+.25*Math.sin(s*.07+e.p1)+.17*Math.sin(s*.15+e.p2)+.1*Math.sin(s*.33+e.p1*1.7+e.p2),ao=(e,s)=>{const t=j((Xo(e,s)-.28)/.32,0,1);return e.str*t*t*(3-2*t)},no=(e,s)=>e.sb+e.pk*Math.abs(s-e.up)+1.2*Math.sin(s*.11+e.p2*1.3),lt=e=>e.sb+ze*(R-e.tB),Ue=(e,s,t,r)=>{X.length>=yo&&X.shift();const i={sb:e,up:s,tB:t,str:r,pk:.04+.2*h(),p1:h()*_,p2:h()*_,nb:0,snd:!1};return X.push(i),i},ft=(e,s)=>{e.p1=Math.PI/2-s*.07,e.p2=Math.PI/2-s*.15},Go=e=>{const s=-l.x*S+l.z*P;for(let r=0;r<X.length;r++){const i=X[r],n=R-i.tB;if(!i.snd&&n>=0&&(i.snd=!0,i.str>.5&&o.sound.hit("noise",Math.min(.6,.25*i.str),{cutoff:260+120*i.str,dur:2.6})),n<0||n>14)continue;const c=lt(i);for(let f=i.str*e*80*Math.exp(-n/3.5);f>0;f--)if(h()<f){const u=s+(h()-.5)*20,v=ao(i,u),k=h()*Math.min(n,7),I=c-ze*k;if(v<.05||I<no(i,u))continue;const K=Math.min(.5+.95*v,q*.55)*(1-Math.exp(-k/.14)),Te=I*P-u*S,Ee=I*S+u*P,ye=h()<.3;Dt(Te,-.12-K*h(),Ee,ye?.0014+.003*h():6e-4+.0016*h()*h(),h()*_,ye?0:1+2.5*h())}if(n<2.2&&n>=i.nb){i.nb+=.2;const f=s+(h()-.5)*16,u=ao(i,f);if(u>.25&&c-1>no(i,f)){const v=c-.8-2*h(),k=v*P-f*S,I=v*S+f*P,K=(.1+.12*h())*(.8+.3*u);nt({x:k,y:-.4-.2*h(),z:I,vx:P*ze*.2,vy:-(1+1.3*h())*u,vz:S*ze*.2,top:!1,r:K,d:(.5+.4*h())*Math.min(1.3,u),sy:2,type:0,age:0,cx:k+P*.45,cy:-.55-.3*u,cz:I+S*.45,om:(1.2+1.2*h())*u,st:h()<.6?.4+h()*1.4:-1,stT:0,sox:(h()-.5)*K,soz:(h()-.5)*K})}}}let t=0;for(let r=0;r<X.length;r++)R-X[r].tB<40&&(X[t++]=X[r]);X.length=t},We=(e,s,t,r)=>{const i=qo(e*V[2],s*V[3]),n=l.x*P+l.z*S,c=-l.x*S+l.z*P;return Ue(i[0]+n,i[1]+c,R+r,t)},Wo=e=>{for(let s=0;s<D.length;s++){const t=D[s];t.age+=e;const r=$e(t.x,t.z,R);let i=0,n=0,c=0;if(t.type===0){const u=t.om*Math.exp(-t.age/1.3),v=(t.x-t.cx)*P+(t.z-t.cz)*S,k=t.y-t.cy,I=u*k,K=-u*v;i=I*P,c=I*S,n=K,t.vy+=.42*Math.min(1,t.age/1.2)*e,t.top&&(n=0,i*=.3,c*=.3,t.vy+=(-.17-t.y)*3*e);const Te=(t.top?1.6:1.4)*e;t.vx-=t.vx*Te,t.vy-=t.vy*Te,t.vz-=t.vz*Te,t.d*=Math.exp(-e/(t.top?3.2:t.y>-.8?3:1.6)),t.r+=e*(t.top?.12:.2)/(1+t.age*1.3),t.sy=t.top?.45+.25*Math.min(1,t.age/2.5):1.35+Math.min(1.4,Math.max(0,-(t.vy+n))*.8),t.st>0&&t.age>.5&&(t.stT-=e,t.stT<=0&&(t.stT=.07+.1*h(),Dt(t.x+t.sox,t.y-t.r*.3,t.z+t.soz,.0014+.0024*t.st*h(),h()*_,0),t.st-=.015));for(let Ee=t.d*e*9;Ee>0;Ee--)if(h()<Ee){const ye=(h()+h()+h()-1.5)*t.r,xt=(h()+h()+h()-1.5)*t.r,_t=(h()+h()+h()-1.5)*t.r;Dt(t.x+ye,t.y+xt,t.z+_t,6e-4+.0016*h()*h(),h()*_,1+2.5*h())}}else t.vy-=.05*e,t.vy*=Math.exp(-e*.8),t.vx*=Math.exp(-e),t.vz*=Math.exp(-e),t.d*=Math.exp(-e/6),t.r+=e*.1/(1+t.age*.5);t.x+=(t.vx+i+r[0]+x.vx)*e,t.y+=(t.vy+n)*e,t.z+=(t.vz+c+r[1]+x.vz)*e,t.cx+=(r[0]+x.vx)*e,t.cz+=(r[1]+x.vz)*e;const f=Be(t.x);t.y-t.r*.25<f&&(t.type===0&&t.vy+n<-.35&&D.length<vt-2&&nt({x:t.x,y:f+.15,z:t.z,vx:t.vx,vy:.25,vz:t.vz,r:.35,d:.7*Math.min(1,-(t.vy+n)),type:1,age:0}),t.y=f+t.r*.25,t.vy<0&&(t.vy*=-.3)),t.y>-.12&&(t.y=-.12)}},Oo=e=>{let s=0,t=0;const r=x.vx,i=x.vz;for(let n=0;n<de;n++){const c=(ke+n)%J,f=ct[c],u=kt[c]+e,v=f<7e-4?.1:f<.0013?.17:.23;let k=rt[c],I=jt(k),K=Mt;const Te=ue[I]*(1-K)+ue[I+3]*K,Ee=ue[I+1]*(1-K)+ue[I+4]*K,ye=Rt[c]+e*(f>.0015?14:6),xt=f>.0013?.06:.02;k+=(Te+r+Math.cos(ye)*xt)*e;const _t=ht[c]+(Ee+i+Math.sin(ye*.9)*xt)*e,wo=it[c]+v*Math.min(1,u*3)*e,Ct=Ut[c];if(I=jt(k),K=Mt,wo>ue[I+2]*(1-K)+ue[I+5]*K-.02)s++;else if(!(Ct&&u>Ct)){const Me=(ke+t++)%J;rt[Me]=k,it[Me]=wo,ht[Me]=_t,ct[Me]=f,Rt[Me]=ye,kt[Me]=u,Ut[Me]=Ct}}return de=t,s},ro=e=>{R+=e,Y+=(zt-Y)*Math.min(1,e*(zt>Y?.35:.12)),Tt=1+.55*(Y-1);const s=Math.floor(to(R));s!==oo&&(oo=s,R>st&&h()<Z[1]*(Y>1.15?1.3:1)&&We(1.5+11*h(),-3+8*h(),Z[2]*Y*(.75+.4*h()),5+2*h())),Go(e);const t=_/1.3;x.vx+=(-t*t*x.x-.6*x.vx)*e,x.vz+=(-t*t*x.z-.6*x.vz)*e;const r=Math.hypot(x.vx,x.vz);if(r>.7&&h()<(r-.7)*e*3&&D.length<vt-4){const c=(h()-.5)*1.6,f=1.2+4*h(),u=l.x+Math.sin(oe+c)*f,v=l.z+Math.cos(oe+c)*f;nt({x:u,y:Be(u)+.08,z:v,vx:0,vy:.12,vz:0,r:.3+.25*h(),d:.55,sy:.6,type:1,age:0}),Ge+=.01}x.x+=x.vx*e,x.z+=x.vz*e,Re[0]+=x.vx*e*.5,Re[2]+=x.vz*e*.5,Re[1]-=e*.02,at[0]+=.03*e,at[1]+=.012*e;const i=qt+Math.max(0,Y-1.12)*1.3;if(Ge+=(i-Ge)*e*(i>Ge?.25:.05),Wo(e),Y>1.2&&h()<(Y-1.2)*e*2.5){const c=h()*_,f=1.5+6*h(),u=l.x+Math.sin(oe+c*.4)*f,v=l.z+Math.cos(oe+c*.4)*f;nt({x:u,y:Be(u)+.1,z:v,vx:$e(u,v,R)[0]*.5,vy:.18,vz:Ne[1]*.5,r:.4+.3*h(),d:.5,type:1,age:0})}{let c=0;for(let f=0;f<D.length;f++)D[f].d>=.03&&(D[c++]=D[f]);D.length=c}Lo(R),Oo(e)&&(so-=e)<0&&(so=.15+.2*h(),o.sound.hit("blip",.05,{freq:900+900*h()}));for(let c=0;c<se.length;c++){const f=se[c];f.age+=e;const u=$e(f.x,f.z,R);f.x+=(u[0]+x.vx*.6)*e*1.1,f.z+=(u[1]+x.vz*.6)*e*1.1,f.r+=e*.1/(1+f.age*.3),f.a*=Math.exp(-e/10)}{let c=0;for(let f=0;f<se.length;f++)se[f].a>=.04&&(se[c++]=se[f]);se.length=c}};let C=null,ut=!1,Ho=0,io=0;const ho=(e,s)=>{const t=Bo(e,s);let r,i;if(t[1]>.04){const v=Math.min((0-l.y)/t[1],16);r=l.x+t[0]*v,i=l.z+t[2]*v}else{const v=t[1]-le*t[0],k=v<-.001?Math.min((-q+le*l.x-l.y)/v,12):12;r=l.x+t[0]*k,i=l.z+t[2]*k}const n=r*P+i*S,c=-r*S+i*P,f=Math.max(Z[2]*1.25,1.1);let u=null;for(let v=0;v<X.length;v++)if(R<X[v].tB&&lt(X[v])<n-2){u=X[v];break}if(u){const v=lt(u);u.sb=n,u.tB=R+(n-v)/ze,u.str=Math.max(u.str,f)}else u=Ue(n,c,R+2.2+.6*h(),f);u.up=c,u.pk=.03,ft(u,c)},Zo=e=>{const s=o.input,t=s.taps();if(ut=!1,s.down){C||(C={x0:s.x,y0:s.y,lx:s.x,ly:s.y,t:0,path:0,drag:!1});const r=s.x-C.lx,i=s.y-C.ly;if(C.lx=s.x,C.ly=s.y,C.t+=e,C.path+=Math.hypot(r,i),C.path>.02){C.drag||(C.drag=!0,o.sound.hit("noise",.25,{cutoff:420,dur:1.4}));const n=l.fw[0],c=l.fw[2],f=Math.hypot(n,c)||1;x.vx=j(x.vx+(r*l.rt[0]-i*n/f)*16,-2.2,2.2),x.vz=j(x.vz+(r*l.rt[2]-i*c/f)*16,-2.2,2.2)}else if(C.t>.35&&(ut=!0,Ho+=e,C.t-e<=.35))for(let n=0;n<3;n++)o.sound.note([31,38,43][n],{dur:4,vel:.14,wave:"sine",at:n*.3,attack:1})}else C?(!C.drag&&C.t<=.35&&ho(C.x0,C.y0),C=null):t.length&&ho(t[0].x,t[0].y);zt=ut?1.7:Co(R),ut&&(io-=e)<0&&(io=2.5,o.sound.hit("noise",.3,{cutoff:180,dur:2.6}))},co=d.rt[p]||(d.rt[p]=Pe(a,p,p,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST)),Yo=768,Ko=24,re=p>600?1024:512,lo=18,De=d.rt["c"+re]||(d.rt["c"+re]=Pe(a,re,re,d.hf?a.RGBA16F:a.RGBA8,a.RGBA,d.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),jo=(()=>{const e=Math.sin(Ve),s=Math.cos(je);return 4*(1-e/(1.3333*s))/(s*s)})();b(37,re/2,.85*jo,d.hf?1:1/16,0);const Ie=d.rt.f5||(d.rt.f5=Pe(a,512,512,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR)),be=Math.ceil(p/2),dt=d.hf?d.rt["x"+p]||(d.rt["x"+p]=Pe(a,p,p,a.RGBA16F,a.RGBA,a.HALF_FLOAT,a.NEAREST)):null,fo=d.rt["v2"+p]||(d.rt["v2"+p]=Pe(a,be,be,d.hf?a.RGBA16F:a.RGBA8,a.RGBA,d.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),uo=d.rt["w2"+p]||(d.rt["w2"+p]=Pe(a,be,be,d.hf?a.RGBA16F:a.RGBA8,a.RGBA,d.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),pt=[null,null,null,null,null,null,null,null,null],pe=[d.tN,d.tD,null,d.tN3,null,null,null,null,null];let Oe=!0;const It=e=>{pe[2]=e==="v"?fo.tex:null,pe[4]=e==="s"?co.tex:null,pe[5]=e==="w"?null:De.tex,pe[6]=e==="w"||e==="f"?null:Ie.tex,pe[7]=e==="v"&&dt?dt.tex:null,pe[8]=e==="v"?uo.tex:null;let s=!1;for(let t=0;t<9;t++)(Oe||pt[t]!==pe[t])&&(a.activeTexture(a.TEXTURE0+t),a.bindTexture(t===3?a.TEXTURE_3D:a.TEXTURE_2D,pe[t]),pt[t]=pe[t],s=!0);s&&a.activeTexture(a.TEXTURE0)},_e=(e,s,t,r,i)=>{const n=d.use(e);a.bindFramebuffer(a.FRAMEBUFFER,s),a.viewport(0,0,t,r),Oe&&(a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.bindVertexArray(d.vao)),a.useProgram(n.p),a.uniform4fv(n.uP,H),It(i),Oe=!1,a.drawArrays(a.TRIANGLES,0,3)},Qo=()=>{const e=(s,t,r,i,n)=>{g[s]=t,g[s+1]=r,g[s+2]=i,g[s+3]=n};for(let s=0;s<D.length;s++){const t=D[s];let r=0;for(let i=0;i<D.length;i++){const n=D[i];if(n===t)continue;const c=n.x-t.x,f=n.y-t.y,u=n.z-t.z,v=c*Q[0]+f*Q[1]+u*Q[2];if(v<=0)continue;const k=c*c+f*f+u*u-v*v;k>6*n.r*n.r||(r+=n.d*n.r*1.77*Math.exp(-k/(n.r*n.r))*(n.type?.6:1))}e((64+s)*4,t.x,t.y,t.z,t.r),e((128+s)*4,t.d,t.type,Math.exp(-r*2.6),t.sy||1)}},po=()=>{eo(),b(0,l.x,l.y,l.z,tt),b(1,l.fw[0],l.fw[1],l.fw[2],p),b(2,l.rt[0],l.rt[1],l.rt[2],R),b(3,l.up[0],l.up[1],l.up[2],_o),b(7,Uo,Ge,D.length,se.length),b(14,x.x,x.z,de,Do),H[18*4+2]=Qe*Tt;{const i=Q[0]*l.fw[0]+Q[1]*l.fw[1]+Q[2]*l.fw[2],n=(Q[0]*l.rt[0]+Q[2]*l.rt[2])/(Math.max(i,.05)*tt),c=(Q[0]*l.up[0]+Q[1]*l.up[1]+Q[2]*l.up[2])/(Math.max(i,.05)*tt);b(21,Re[0],Re[1],Re[2],i>.2&&Math.abs(n)<1.3&&Math.abs(c)<1.3?ne[3]*(M==="Veiled sun"?.25:1):0),b(22,at[0],at[1],n*.5+.5,c*.5+.5)}H[19*4+3]=1+.6*(Y-1);{const i=$e(Xe[1][0],Xe[1][1],R);let n=0;for(let c=0;c<4;c++){const f=.12+.25*c/3+.15*Math.sin(R*.7+c),u=Xe[c][0]+(x.x*.5+i[0]*.35)*f,v=Xe[c][1]+(x.z*.5+i[1]*.35)*f;H[16*4+n++]=u,H[16*4+n++]=v}}{const i=x.x*P+x.z*S;let n=0;for(let c=0;c<X.length;c++){const f=X[c];R-f.tB<-7||(b(26+2*n,lt(f)+i,f.sb+i,f.str,f.up),b(27+2*n,R-f.tB,f.p1,f.p2,f.pk),n++)}b(34,P,S,ze,n)}g.fill(0),Fo(R);const e=(i,n,c,f,u)=>{g[i]=n,g[i+1]=c,g[i+2]=f,g[i+3]=u};Qo();for(let i=0;i<se.length;i++){const n=se[i];e((192+i)*4,n.x,n.z,n.r,n.a),e((256+i)*4,n.an,n.el,n.seed,0)}for(let i=0,n=320*4;i<de;i++,n+=4){const c=(ke+i)%J;g[n]=rt[c],g[n+1]=it[c],g[n+2]=ht[c],g[n+3]=ct[c]}a.bindTexture(a.TEXTURE_2D,d.tD),a.texSubImage2D(a.TEXTURE_2D,0,0,0,64,12,a.RGBA,a.FLOAT,g),b(23,Math.round(l.x*8)/8,Math.round(l.z*8)/8,Ko,Yo),Oe=!0;{const i=Math.hypot(l.fw[0],l.fw[2]),n=5*Math.min(i/.5,1)/(i||1),c=lo/re;b(36,Math.round((l.x+l.fw[0]*n)/c)*c,Math.round((l.z+l.fw[2]*n)/c)*c,lo,re);const f=d.use("cz");a.bindFramebuffer(a.FRAMEBUFFER,De.fb),a.viewport(0,0,re,re),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.bindVertexArray(d.vao),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),a.useProgram(f.p),a.uniform4fv(f.uP,H),It("w"),Oe=!1,a.drawArraysInstanced(a.TRIANGLE_STRIP,0,re,re/2-1),a.disable(a.BLEND),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,De.tex),a.generateMipmap(a.TEXTURE_2D),De.mip||(De.mip=!0,a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR)),pt[5]=De.tex,a.activeTexture(a.TEXTURE0)}_e("foam",Ie.fb,512,512,"f"),a.activeTexture(a.TEXTURE6),a.bindTexture(a.TEXTURE_2D,Ie.tex),a.generateMipmap(a.TEXTURE_2D),Ie.mip||(Ie.mip=!0,a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR)),pt[6]=Ie.tex,a.activeTexture(a.TEXTURE0),_e("vol",fo.fb,be,be,null),_e("vol2",uo.fb,be,be,null);const s=o.view||Ft,t=!!(s.yaw||s.pitch||s.x||s.y||s.z);t&&d.kick(),dt&&_e(t?"mainSF":"mainS",dt.fb,p,p,"x"),_e("main",co.fb,p,p,"v"),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA);const r=d.use("pt");a.useProgram(r.p),a.uniform4fv(r.uP,H),It(null),a.drawArrays(a.POINTS,0,de+wt+zo),a.disable(a.BLEND),_e("fin",null,p,p,"s")};eo();const mo=1.5,ie=mo+4,xo=l.x*P+l.z*S,vo=-l.x*S+l.z*P;if(st=ie+1,te==="A wave breaking"){{const s=Ue(xo+3.5,vo+(Se?-6:6),ie-9,Z[2]*.7);s.pk=.05}let e;if(o.home)e=We(8,-.3,Z[2]*1.05,0),e.tB=ie-1.1;else if(A==="Out to sea"){const s=.4+2.6*Math.pow(xe,1.3),t=2.5+2.5*fe,r=Math.hypot(l.fw[0],l.fw[2])||1,i=l.x+l.fw[0]/r*t,n=l.z+l.fw[2]/r*t;e=Ue(i*P+n*S-ze*s,-i*S+n*P,ie-s,Z[2]*1.05)}else if(A==="Facing the shore"){const s=.8+3*Math.pow(xe,1.3),t=1.5+3*fe,r=Math.hypot(l.fw[0],l.fw[2])||1,i=l.x+l.fw[0]/r*t,n=l.z+l.fw[2]/r*t;e=Ue(i*P+n*S,-i*S+n*P,ie-s,Z[2]*1.05)}else e=We(7+5*(fe*7.31%1),-3.5+7*fe,Z[2]*1.05,0),e.tB=ie-(.3+6.7*Math.pow(xe,1.7));e.pk=.06,ft(e,e.up)}else if(te==="Between sets")st=ie+14;else if(te==="The wave overhead"){{const e=Ue(xo+5,vo,ie-11,Z[2]*.6);e.pk=.1}{const e=We(3.5,2.5,Z[2]*1.1,0);e.tB=ie+.45,e.pk=.05,ft(e,e.up)}}else{for(const[e,s,t]of[[10,4,17],[7,1.5,9.5],[5,-1,2.6]]){const r=We(e,s,Z[2]*1.2,0);r.tB=ie-t,r.pk=.05,ft(r,r.up)}st=ie+4}for(let e=0;e<mo*30;e++)ro(1/30);po();let mt=0,$o=0;return(e,s)=>{for(++$o===3&&d.kick(),s=j(s||1/30,0,.1),Zo(s),mt=Math.min(mt+s,.2);mt>=1/30;)mt-=1/30,ro(1/30);po()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
