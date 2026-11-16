// Under the Surf: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/541.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Lt){Lt&&function(){"use strict";const Bt={yaw:0,pitch:0,x:0,y:0,z:0},yo=0,Q=(o,a,m)=>o<a?a:o>m?m:o,B=Math.PI*2,Fe=9.81,Ft=38,go=4,ze=40,ee=448,zo=24,wt=1500,To=4e3,Ze=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,ve=`out vec2 vUV;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUV = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,ae=`
uniform vec4 uP[${Ft}];
uniform sampler2D uN, uD, uV, uS, uW, uF, uX, uV2, uN1;   // uN1: uN's red channel alone (N1's many reads)
// the waves (kx, kz, amplitude, phase), longest first, then the wind ripples: also row 0 of uD, read here as uniforms
// (the light map's million vertices and the surface's pixels each loop over them)
uniform vec4 uWv[35];
uniform sampler3D uN3, uNr, uNg, uNb;   // uN3 RGBA; uNr/g/b its channels one by one (the white water's reads: a quarter of the cache)
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
float N1(vec2 p, float fp) { return textureLod(uN1, p * .0625, log2(max(fp * 8., 1.))).r; }
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
  for (int i = 0; i < NSW; i++) { vec4 w = uWv[i]; h += w.z * sin(dot(w.xy, p) + w.w); }
  return h;
}
vec3 wvH(vec2 p, int n, out vec2 g) {
  vec3 H = vec3(0.); g = vec2(0.);
  for (int i = 0; i < n; i++) {
    vec4 w = uWv[i];
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
`,Ke=`
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
    vec4 w = uWv[i];
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
}`,Eo=`
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
    vec4 w = uWv[i];
    float k2 = dot(w.xy, w.xy), zf = 4. / max(abs(w.z) * k2, 1e-5);
    sl += min(1., zf / (uP[37].y * h)) * smoothstep(1.6, 1., sqrt(k2) * sp) * w.z * cos(dot(w.xy, p) + w.w) * w.xy;
  }
  vec3 L = refract(-SUNA, normalize(vec3(-sl.x, 1., -sl.y)), 1. / ETA);
  vO = o;
  gl_Position = vec4((p + L.xz / max(-L.y, .05) * h - CZC) / CZE * 2., 0., 1.);
}`,Mo=`
in vec2 vO; out vec4 oC;
void main() {
  // the flat-sea area of light this fragment receives, over its own area
  vec2 a = dFdx(vO), b = dFdy(vO);
  float tx = CZE / CZN;
  oC = vec4(min(abs(a.x * b.y - a.y * b.x) / (tx * tx), 120.) * uP[37].z, 0., 0., 0.);
}`,Po=`
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
// the blobs (rows 1 and 2 of uD) as uniforms: every pixel tests all of them
uniform vec4 uBP[${ze}], uBQ[${ze}];
const int MB = 10;
uint m0 = 0u, m1 = 0u;   // the (at most MB) blobs this ray passes: their indices, 6 bits each, five to a word
int nb = 0;
// bubble and sand densities at x; ts gathers each blob's sun transmittance (from the blobs above it, worked out per frame)
float blobs(vec3 x, out float rs, out float ts, out float rh) {
  float rb = 0.; rs = 0.; ts = 0.; rh = 0.;
  for (int k = 0; k < nb; k++) {
    {
      int i = int(((k < 5 ? m0 >> uint(6 * k) : m1 >> uint(6 * k - 30))) & 63u);
      vec4 P = uBP[i], Q = uBQ[i];
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
      float n1 = textureLod(uNr, qn, 0.).r, n2 = textureLod(uNr, q * 1.9 + vec3(3.1, 1.7, .4) + fl * .5, 0.).r;
      float n0 = textureLod(uNb, qn * .31 + vec3(.5, .2, .9), 0.).r;
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
      float nf = textureLod(uNb, vec3(u * .55, (s - x.y * .7) * .6 + a * .04, x.y * .12 + a * .03) + vec3(.13, .71, .37), 0.).r;
      float fg = smoothstep(.56, .82, nf) * smoothstep(.15, .6, a);
      float Dp = plDp(a, S) * (.4 + .6 * fr) * (.7 + .5 * sin(u * .23 + uP[27 + 2 * e].y * 2.) * sin(u * .097 + 1.3)) * (.3 + .7 * smoothstep(-.3, 3.5, c.w + (n0 - .5) * 3.)) * (1. + 1.3 * fg);
      float hgt = (x.y + .1 + Dp) / max(Dp, .25);
      // the skin is sharp where the march walks it in short steps, softened to the step's length on the coarse steps
      float ew = .05 + (st < .1 ? .2 : .9) * st / max(Dp, .25);
      // below the boils, turbulence down to a few centimetres where the march walks the skin in short steps: ridged eddies
      // (folds within folds) drawn out along the plunge and moving with it, so the skin is grainy, never a soft puff
      float n3 = textureLod(uNg, vec3(q.x * 5.3, q.y * 3.1 - a * .9, q.z * 5.3) + fl * 1.1 + vec3(.31, .17, .73), 0.).r;
      float m = hgt + (n0 - .5) * 1.2 + (n1 - .5) * 1.8 + ((n2 - .5) * .6 + (n3 - .55) * .7) / (1. + 2. * st) - .15;
      // the deepest reach, after the noise: a floor that rises and falls with the boils, never a plane, never at the eye
      // (the cap eases in, never a flat floor where the noise runs high)
      float yf = -.1 - min(Dp * (1.75 + (n0 - .5) * 1.4 + (n2 - .5) * .6), DEP * .82 * (1. - exp(-(.18 + .3 * n0 + .55 * n2) / .45)));
      float dn = rho * smoothstep(0., ew, m) * smoothstep(yf - .05, yf + .3, x.y) * (1. + 1.5 * smoothstep(-.7, -.12, x.y));
      if (dn > 0.) {
        float rope = textureLod(uNg, vec3(s * 1.1 + u * .83, (x.y - .3 * a) * .26, u * 1.1 - s * .83) + .7, 0.).r;
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
        float n1u = textureLod(uNr, qn + vec3(lq.x, .8 * Ld.y, lq.y) * .85 * .1, 0.).r;
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
    vec4 b = uBP[i], b2 = uBQ[i];
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
}`,No=`
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
      vec4 w = uWv[i];
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
}`;function Ye(o,a,m){let u=Math.imul(o^2654435769,2246822507)^Math.imul(a+2135587861,3266489909)^Math.imul(m+374761393,668265263);return u^=u>>>15,u=Math.imul(u,739982445),u^=u>>>12,u=Math.imul(u,695872825),u^=u>>>15,(u>>>0)/4294967296}const Ve=o=>o*o*o*(o*(o*6-15)+10);function Ro(o){const u=new Uint8Array(65536),M=new Float32Array(16*16),h=new Float32Array(16*16);for(let k=0;k<4;k++){for(let U=0;U<16*16;U++){const O=Ye(U,k,11)*B;M[U]=Math.cos(O),h[U]=Math.sin(O)}for(let U=0;U<128;U++){const O=(U+.5)/128*16,p=Math.floor(O),E=O-p,D=Ve(E),q=p%16*16,T=(p+1)%16*16;for(let S=0;S<128;S++){const v=(S+.5)/128*16,g=Math.floor(v),z=v-g,F=Ve(z),ne=g%16,X=(g+1)%16,W=M[q+ne]*z+h[q+ne]*E,re=M[q+X]*(z-1)+h[q+X]*E,ue=M[T+ne]*z+h[T+ne]*(E-1),Ae=M[T+X]*(z-1)+h[T+X]*(E-1),le=W+(re-W)*F,Te=le+(ue+(Ae-ue)*F-le)*D;u[(U*128+S)*4+k]=Q(Math.round((Te*.85+.5)*255),0,255)}}}o.pixelStorei(o.UNPACK_ALIGNMENT,1);const P=(k,U,O)=>{const p=o.createTexture();return o.bindTexture(o.TEXTURE_2D,p),o.texImage2D(o.TEXTURE_2D,0,k,128,128,0,U,o.UNSIGNED_BYTE,O),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),p},N=new Uint8Array(128*128);for(let k=0;k<N.length;k++)N[k]=u[k*4];return[P(o.RGBA8,o.RGBA,u),P(o.R8,o.RED,N)]}function ko(o){const m=new Uint8Array(131072),u=(p,E)=>{const D=new Float32Array(p*p*p*3);for(let T=0;T<p*p*p;T++){let S=Ye(T,E,1)*2-1,v=Ye(T,E,2)*2-1,g=Ye(T,E,3)*2-1;const z=Math.hypot(S,v,g)||1;D[T*3]=S/z,D[T*3+1]=v/z,D[T*3+2]=g/z}const q=new Float32Array(32*32*32);for(let T=0;T<32;T++)for(let S=0;S<32;S++)for(let v=0;v<32;v++){const g=(v+.5)/32*p,z=(S+.5)/32*p,F=(T+.5)/32*p,ne=Math.floor(g),X=Math.floor(z),W=Math.floor(F),re=g-ne,ue=z-X,Ae=F-W,le=Ve(re),Te=Ve(ue),Re=Ve(Ae);let te=0;for(let G=0;G<8;G++){const y=G&1,H=G>>1&1,fe=G>>2,de=(((W+fe)%p*p+(X+H)%p)*p+(ne+y)%p)*3;te+=(D[de]*(re-y)+D[de+1]*(ue-H)+D[de+2]*(Ae-fe))*(y?le:1-le)*(H?Te:1-Te)*(fe?Re:1-Re)}q[(T*32+S)*32+v]=te}return q},M=u(4,1),h=u(8,2),P=u(8,3),N=u(16,4),k=u(4,5);for(let p=0;p<32*32*32;p++){m[p*4]=Q(Math.round(((M[p]*.65+h[p]*.35)*1.1+.5)*255),0,255);const E=1-Math.abs(P[p]*.65+N[p]*.35)*2.4;m[p*4+1]=Q(Math.round(E*255),0,255),m[p*4+2]=Q(Math.round((k[p]*1.2+.5)*255),0,255),m[p*4+3]=255}o.pixelStorei(o.UNPACK_ALIGNMENT,1);const U=(p,E,D)=>{const q=o.createTexture();o.bindTexture(o.TEXTURE_3D,q),o.texImage3D(o.TEXTURE_3D,0,p,32,32,32,0,E,o.UNSIGNED_BYTE,D),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const T of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,T,o.REPEAT);return q},O=[U(o.RGBA8,o.RGBA,m)];for(let p=0;p<3;p++){const E=new Uint8Array(32768);for(let D=0;D<E.length;D++)E[D]=m[D*4+p];O.push(U(o.R8,o.RED,E))}return o.bindTexture(o.TEXTURE_3D,null),O}function Uo(o){if(o.__c541)return o.__c541;const a=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float"),m=(v,g)=>{const z=o.createShader(v);return o.shaderSource(z,g),o.compileShader(z),z},u={cz:[ae+Eo,ae+Mo],foam:[ve,ae+Po],vol:[ve,`#define VP 1
`+ae+Vt],vol2:[ve,`#define VP 2
`+ae+Vt],pt:[ae+No,ae+So],fin:[ve,ae+Ao]};a?(u.mainS=[ve,`#define MP 1
`+ae+Ke],u.main=[ve,`#define MP 2
`+ae+Ke]):u.main=[ve,`#define MP 0
`+ae+Ke];const M=yo?[["start",performance.now()]]:null,h={};for(const v in u){const g=o.createProgram(),z=m(o.VERTEX_SHADER,Ze+u[v][0]),F=m(o.FRAGMENT_SHADER,Ze+u[v][1]);o.attachShader(g,z),o.attachShader(g,F),o.linkProgram(g),h[v]={p:g,v:z,f:F}}o.flush();const P={},N=(v=3)=>{if(!(!a||h.mainSF)){if(P.v||(P.v=m(o.VERTEX_SHADER,Ze+ve)),v>1&&!P.f&&(P.f=m(o.FRAGMENT_SHADER,Ze+`#define MP 1
#define FAR
`+ae+Ke)),v>2){const g=o.createProgram(),z=P.v,F=P.f;o.attachShader(g,z),o.attachShader(g,F),o.linkProgram(g),h.mainSF={p:g,v:z,f:F}}o.flush()}};M&&M.push(["submit",performance.now()]);const[k,U]=Ro(o),[O,p,E,D]=ko(o);M&&M.push(["noise",performance.now()]);const q=v=>{if(!("uP"in h[v])){const{p:g,v:z,f:F}=h[v],ne=o.getProgramParameter(g,o.LINK_STATUS);if(M&&M.push([v,performance.now()]),!ne)throw new Error("541 "+v+": "+(o.getShaderInfoLog(z)||"")+(o.getShaderInfoLog(F)||"")+o.getProgramInfoLog(g));o.useProgram(g),["uN","uD","uV","uN3","uS","uW","uF","uX","uV2","uNr","uNg","uNb","uN1"].forEach((X,W)=>{const re=o.getUniformLocation(g,X);re&&o.uniform1i(re,W)}),h[v]={p:g,uP:o.getUniformLocation(g,"uP"),uW:o.getUniformLocation(g,"uWv"),uBP:o.getUniformLocation(g,"uBP"),uBQ:o.getUniformLocation(g,"uBQ")}}return h[v]},T=o.createVertexArray(),S=o.createTexture();return o.bindTexture(o.TEXTURE_2D,S),o.texImage2D(o.TEXTURE_2D,0,o.RGBA32F,64,12,0,o.RGBA,o.FLOAT,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.__c541={tl:M,P:h,use:q,kick:N,hf:a,tN:k,tN1:U,tN3:O,tNr:p,tNg:E,tNb:D,tD:S,vao:T,rt:{}}}function Se(o,a,m,u,M,h,P){const N=o.createTexture();o.bindTexture(o.TEXTURE_2D,N),o.texImage2D(o.TEXTURE_2D,0,u,a,m,0,M,h,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,P),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,P),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const k=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,k),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,N,0),o.bindFramebuffer(o.FRAMEBUFFER,null),{tex:N,fb:k,w:a,h:m}}Lt.add({num:541,name:"Under the Surf",fam:"Vistas",recipe:"A few metres down in the surf on a bright morning, looking up at the underside of the waves with a bright circle of sky and broken sun in the middle. Each wave breaks right over you, driving foam and bubbles down that rise again in curtains. The moment, where you sit and the swell change every mint. Tap overhead to pick where the next wave breaks, drag to slosh the surge back and forth, or hold to bring in a bigger set.",interactive:"Tap a spot overhead to choose where the next wave breaks: it arrives in its own time and goes over hardest there. Drag to send the surge sloshing back and forth, swaying motes, bubbles and weed together. Sets come through on their own; hold to bring in a bigger one: the light flickers harder, more crests break and the bottom clouds with sand.",music:!0,gl:!0,fps:30,seed:0,make(o){const a=o.gl,m=o.size,u=Uo(a);let M=2654435769;for(let e=2;e<o.hash.length;e+=8)M=Math.imul(M^parseInt(o.hash.slice(e,e+8),16),2246822507)>>>0;const h=()=>{M=M+1831565813|0;let e=Math.imul(M^M>>>15,1|M);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},P=e=>{let s=0;for(const r in e)s+=e[r];let t=h()*s;for(const r in e)if(t-=e[r],t<0)return r;return Object.keys(e)[0]};let N=P({"Morning sun":45,"High sun":25,"Low gold sun":18,"Veiled sun":12}),k=P({"Head-high":45,"Small surf":30,"Overhead sets":17,"Big wave day":8}),U=P({"Green surf":45,"Blue clear":27,"Milky after a storm":18,Crystal:10}),O=P({"Three metres":50,"Two metres":25,"Five metres":25}),p=P({"Fine ripples":50,"Coarse megaripples":22,"Shell grit":18,"Black volcanic sand":10}),E=P({"A few shells":45,"Weed strands":25,"Shell drift":18,"Bare sand":12}),D=P({"Lacy foam":50,"Thick rafts":30,Clean:20}),q=P({"Light chop":55,Glassy:20,"Onshore wind":25});o.home&&(N="Morning sun",k="Head-high",U="Green surf",O="Three metres",p="Fine ripples",E="A few shells",D="Lacy foam",q="Light chop"),o.trait("Sun",N),o.trait("Swell",k),o.trait("Water",U),o.trait("Depth",O),o.trait("Sand",p),o.trait("On the sand",E),o.trait("Foam",D),o.trait("Chop",q);let T=625341585;for(let e=2;e<o.hash.length;e+=8)T=Math.imul(T^parseInt(o.hash.slice(e,e+8),16),2654435761)>>>0;const S=()=>{T=T+1831565813|0;let e=Math.imul(T^T>>>15,1|T);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let v="Along the beach";{const e={"Along the beach":44,"Facing the shore":22,"Out to sea":22,"Under the break":12};let s=S()*100;for(const t in e)if(s-=e[t],s<0){v=t;break}}o.home&&(v="Along the beach"),o.trait("View",v);const g=v==="Along the beach";let z=1779033703;for(let e=2;e<o.hash.length;e+=8)z=Math.imul(z^parseInt(o.hash.slice(e,e+8),16),3266489909)>>>0;const F=()=>{z=z+1831565813|0;let e=Math.imul(z^z>>>15,1|z);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ne=e=>{let s=F()*100;for(const t in e)if(s-=e[t],s<0)return t;return Object.keys(e)[0]};let X=ne({"A wave breaking":46,"Between sets":30,"The wave overhead":14,"After the set":10}),W=ne({"Along the bottom":30,"Up into the water":44,"Up at the surface":20,"Straight up":6});const re=F(),ue=F(),Ae=F(),le=F();o.home&&(X="A wave breaking",W="Up into the water"),v==="Under the break"&&W!=="Straight up"&&(W="Up at the surface");const Te=U==="Milky after a storm"&&(W==="Up at the surface"||W==="Straight up");Te&&(W="Up into the water");const Re=!o.home&&v==="Along the beach"&&Ae<.5;o.trait("Moment",X),o.trait("Gaze",W);const te={"Along the beach":[.05,.36,1,1,.45],"Facing the shore":[1.3+.25*S(),.25,.6,.75,.2],"Out to sea":[-1.4-.25*S(),.28,1.9,.5,.45],"Under the break":[.05+(S()-.5)*.5,.66+.08*S(),.45,1,.45]}[v];!o.home&&v!=="Under the break"?te[1]={"Along the bottom":.1+.14*re,"Up into the water":.3+.15*re,"Up at the surface":.55+.25*re,"Straight up":1.55}[W]:W==="Straight up"?te[1]=1.55:Te&&(te[1]=.38+.1*re),Re&&(te[0]=Math.PI-te[0]);const G=new Float32Array(Ft*4),y=(e,s,t,r,i)=>{G[e*4]=s,G[e*4+1]=t,G[e*4+2]=r,G[e*4+3]=i},H={"Three metres":3,"Two metres":2.1,"Five metres":5}[O],fe=.03,de=e=>-H+fe*e,ie={"Morning sun":[20,-.5,[1,.9,.76],1,1400,.45],"High sun":[68,-.6,[1,.97,.92],1.15,1600,.2],"Low gold sun":[13,-.25,[1,.7,.45],.75,1200,.35],"Veiled sun":[24,-.5,[1,.95,.88],.55,60,.9]}[N],je=Re?Math.PI-ie[1]:ie[1],qe=ie[0]*Math.PI/180,bt=[Math.sin(je)*Math.cos(qe),Math.sin(qe),Math.cos(je)*Math.cos(qe)],Qe=Math.asin(Math.cos(qe)/1.3333),$=[Math.sin(je)*Math.sin(Qe),Math.cos(Qe),Math.cos(je)*Math.sin(Qe)];y(4,$[0],$[1],$[2],ie[3]),y(5,bt[0],bt[1],bt[2],ie[4]);const J={"Green surf":[[.02,.15,.19],[.1,.3,.24],.12,.03],"Blue clear":[[.02,.11,.22],[.07,.24,.27],.14,0],"Milky after a storm":[[.1,.2,.17],[.27,.33,.25],.19,.09],Crystal:[[.015,.12,.23],[.05,.27,.28],.08,0]}[U],Do=J[2],qt=J[3],ke={"Fine ripples":[[.6,.53,.41],.14,.036,.25],"Coarse megaripples":[[.56,.5,.4],.55,.06,.5],"Shell grit":[[.64,.58,.49],.13,.015,1],"Black volcanic sand":[[.1,.095,.09],.11,.014,.15]}[p],Io={"A few shells":.1,"Weed strands":.06,"Shell drift":.4,"Bare sand":.015}[E],_o={"Lacy foam":.4,"Thick rafts":.75,Clean:.08}[D],Jo={"Lacy foam":1,"Thick rafts":1.4,Clean:.6}[D],K={"Small surf":[.17,.35,.8],"Head-high":[.32,.7,1],"Overhead sets":[.46,.85,1.2],"Big wave day":[.62,1,1.45]}[k],Wt={"Light chop":1,Glassy:.45,"Onshore wind":1.6}[q],we=[],Xt=(h()-.5)*.3;for(let e=0;e<3;e++){const s=e===0?34+10*h():22+20*h(),t=B/s,r=Xt+(e===0?0:(h()-.5)*.5),i=t*Math.sqrt(Fe*H)*(1-t*H*(t*H)/6);we.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,k:t,a:K[0]*(e===0?1:.3+.2*h()),om:i,ph:h()*B})}const We=[],yt=q==="Onshore wind"?(h()-.5)*.6:h()*B;for(let e=0;e<18;e++){const s=3.6*Math.pow(.82,e)*(.92+.16*h()),t=B/s,r=yt+e*2.39996*(q==="Onshore wind"?.45:1)+(h()-.5)*.5;We.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,k:t,a:.011*Math.pow(s,1.05)*(.6+.8*h())*Wt,om:Math.sqrt(Fe*t*Math.tanh(t*H)),ph:h()*B})}const gt=[];for(let e=0;e<11;e++){const s=.16*Math.pow(.76,e),t=B/s,r=yt+e*2.39996+.4*Math.sin(e*7.1);gt.push({kx:Math.cos(r)*t,kz:Math.sin(r)*t,a:.0088*s,om:Math.sqrt(Fe*t+73e-6*t*t*t),ph:e*1.93})}const Gt=6,Co=Gt+We.length;let $e=0;for(const e of We)$e+=e.a*e.k*e.a*e.k*.25;$e=Math.sqrt($e);let Y=1,zt=1,Tt=1;const Ot=o.home?[3.6,3.3]:[S()*B,S()*B],Lo=e=>1+.22*Q((Math.sin(e*.097+Ot[0])+.7*Math.sin(e*.041+Ot[1])-.5)/.9,0,1),Ue=[0,0],Je=(e,s,t)=>{Ue[0]=0,Ue[1]=0;const r=Math.max(H-fe*e,1);for(let i=0;i<we.length;i++){const n=we[i],c=n.a*Y*Math.sin(n.kx*e+n.kz*s-n.om*t+n.ph)*Math.sqrt(Fe/r);Ue[0]+=c*n.kx/n.k,Ue[1]+=c*n.kz/n.k}return Ue},Ht=-24,Zt=.5,et=97,pe=new Float32Array(et*3),Et=new Int32Array(et);let tt=0,Kt=0;const Bo=e=>{tt++,Kt=e},Yt=e=>{Et[e]=tt;const s=Ht+e*Zt,t=l.z+4,r=Math.max(H-fe*s,1);let i=0,n=0,c=0;for(let f=0;f<we.length;f++){const d=we[f],w=d.kx*s+d.kz*t-d.om*Kt+d.ph,_=Math.sin(w),L=d.a*Y*_*Math.sqrt(Fe/r);i+=L*d.kx/d.k,n+=L*d.kz/d.k,c+=d.a*Y*(_+.3*d.a*Y/K[0]*Math.sin(2*w-Math.PI/2))}pe[e*3]=i,pe[e*3+1]=n,pe[e*3+2]=c};let Mt=0;const jt=e=>{let s=(e-Ht)/Zt;s=s<0?0:s>et-1.001?et-1.001:s;const t=s|0;return Mt=s-t,Et[t]!==tt&&Yt(t),Et[t+1]!==tt&&Yt(t+1),t*3},b=new Float32Array(64*12*4),Fo=e=>{let s=0;for(let t=0;t<we.length;t++){const r=we[t],i=r.ph-r.om*e-r.kx*x.x-r.kz*x.z,n=r.a*Y;b[s]=r.kx,b[s+1]=r.kz,b[s+2]=n,b[s+3]=i,b[s+4]=2*r.kx,b[s+5]=2*r.kz,b[s+6]=.3*n*n/K[0],b[s+7]=2*i-Math.PI/2,s+=8}for(let t=0;t<We.length;t++){const r=We[t];b[s]=r.kx,b[s+1]=r.kz,b[s+2]=r.a*Tt,b[s+3]=r.ph-r.om*e-r.kx*x.x-r.kz*x.z,s+=4}for(let t=0;t<gt.length;t++){const r=gt[t];b[s]=r.kx,b[s+1]=r.kz,b[s+2]=r.a,b[s+3]=(r.ph-r.om*e-r.kx*x.x-r.kz*x.z)%B,s+=4}},Qt=[1,0];y(6,H,fe,Gt,.95),y(8,J[0][0],J[0][1],J[0][2],{"Morning sun":1,"High sun":.9,"Low gold sun":.8,"Veiled sun":.12}[N]),y(9,J[1][0],J[1][1],J[1][2],_o*(X==="Between sets"?.25:X==="After the set"?1.6:1));const Pt=N==="Veiled sun"?[.5,.6,.7]:N==="Low gold sun"?[.3,.48,.72]:[.22,.45,.85],Nt=N==="Low gold sun"?[1,.82,.62]:N==="Veiled sun"?[.85,.88,.9]:[.58,.74,.92];y(10,Pt[0],Pt[1],Pt[2],ie[5]),y(11,Nt[0],Nt[1],Nt[2],N==="Veiled sun"?.5:.15),y(12,ke[0][0],ke[0][1],ke[0][2],ke[1]);const $t=Xt+(h()-.5)*.2;y(13,Math.cos($t),Math.sin($t),ke[2],ke[3]),y(15,Qt[0],Qt[1],h()*65536|0,0);const St=[J[0][0]*.5+J[1][0]*.5+.05,J[0][1]*.5+J[1][1]*.5+.06,J[0][2]*.5+J[1][2]*.5+.06].map(e=>e*1.6*(.6+.4*ie[3]));y(19,St[0],St[1],St[2],1),y(20,ie[2][0],ie[2][1],ie[2][2],1.7);const oe=te[0],At=te[1],Jt=te[4];{const e=Math.cos(At);y(24,0,Q(-H+Jt,-H+.15,-.9),0,1),y(25,Math.sin(oe)*e,Math.sin(At),Math.cos(oe)*e,0)}const ot=Math.tan((W==="Straight up"?54:37)*Math.PI/180),l={x:0,y:0,z:0,fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},eo=()=>{const e=o.view||Bt;l.x=Q(e.x||0,-3,3),l.z=Q(e.z||0,-3,3),l.y=Q(de(l.x)+Jt+(e.y||0),de(l.x)+.15,-.9);const s=oe+(e.yaw||0),t=Q(At+(e.pitch||0),-1.4,1.56),r=Math.cos(t);l.fw=[Math.sin(s)*r,Math.sin(t),Math.cos(s)*r],l.rt=[Math.cos(s),0,-Math.sin(s)];const i=l.fw,n=l.rt;l.up=[i[1]*n[2]-i[2]*n[1],i[2]*n[0]-i[0]*n[2],i[0]*n[1]-i[1]*n[0]]},Vo=(e,s)=>{const t=e*2-1,r=1-s*2,i=[0,1,2].map(c=>l.fw[c]+(t*l.rt[c]+r*l.up[c])*ot),n=Math.hypot(i[0],i[1],i[2]);return i.map(c=>c/n)},qo=E==="Weed strands",st=E==="Weed strands"?.75:.42,Xe=[];{const e=Math.sin(oe+(h()-.5)*.5),s=Math.cos(oe+(h()-.5)*.5),t=1.75+.6*h(),r=e*t+.15,i=s*t;let n=h()*B,c=r-Math.cos(n)*st/2,f=i-Math.sin(n)*st/2;for(let d=0;d<4;d++)Xe.push([c,f]),n+=(h()-.5)*1.2,c+=Math.cos(n)*st/3,f+=Math.sin(n)*st/3}y(18,E==="Weed strands"?.007:.005,qo?1:0,0,u.hf?0:1),y(35,yt,Wt,1.6*K[0],N==="High sun"?.34:.16);let I=0;const C=[],se=[];let at=0;const x={x:0,z:0,vx:0,vz:0},De=[0,0,0],nt=[h()*12,h()*12];let Ge=qt;const be=we[0],Ee=be.om/be.k,A=be.kx/be.k,R=be.kz/be.k,to=e=>(be.om*e-be.ph+Math.PI/2)/B;let oo=Math.floor(to(0));const Wo=(e,s)=>{const t=e*Math.sin(oe)+s*Math.cos(oe),r=e*Math.cos(oe)-s*Math.sin(oe);return[t*A+r*R,-t*R+r*A]};let so=0;const rt=e=>{if(C.length>=ze){let s=0;for(let t=1;t<C.length;t++)C[t].d<C[s].d&&(s=t);C.splice(s,1)}C.push(e)},es=e=>{se.length>=zo&&se.shift(),se.push(e)},it=new Float64Array(ee),ht=new Float64Array(ee),ct=new Float64Array(ee),lt=new Float64Array(ee),Rt=new Float64Array(ee),kt=new Float64Array(ee),Ut=new Float64Array(ee);let Ie=0,me=0;const Dt=(e,s,t,r,i,n)=>{me>=ee&&(Ie=(Ie+1)%ee,me--);const c=(Ie+me)%ee;me++,it[c]=e,ht[c]=s,ct[c]=t,lt[c]=r,Rt[c]=i,kt[c]=0,Ut[c]=n},Z=[],Xo=(e,s)=>.5+.25*Math.sin(s*.07+e.p1)+.17*Math.sin(s*.15+e.p2)+.1*Math.sin(s*.33+e.p1*1.7+e.p2),ao=(e,s)=>{const t=Q((Xo(e,s)-.28)/.32,0,1);return e.str*t*t*(3-2*t)},no=(e,s)=>e.sb+e.pk*Math.abs(s-e.up)+1.2*Math.sin(s*.11+e.p2*1.3),ft=e=>e.sb+Ee*(I-e.tB),_e=(e,s,t,r)=>{Z.length>=go&&Z.shift();const i={sb:e,up:s,tB:t,str:r,pk:.04+.2*h(),p1:h()*B,p2:h()*B,nb:0,snd:!1};return Z.push(i),i},ut=(e,s)=>{e.p1=Math.PI/2-s*.07,e.p2=Math.PI/2-s*.15},Go=e=>{const s=-l.x*R+l.z*A;for(let r=0;r<Z.length;r++){const i=Z[r],n=I-i.tB;if(!i.snd&&n>=0&&(i.snd=!0,i.str>.5&&o.sound.hit("noise",Math.min(.6,.25*i.str),{cutoff:260+120*i.str,dur:2.6})),n<0||n>14)continue;const c=ft(i);for(let f=i.str*e*80*Math.exp(-n/3.5);f>0;f--)if(h()<f){const d=s+(h()-.5)*20,w=ao(i,d),_=h()*Math.min(n,7),L=c-Ee*_;if(w<.05||L<no(i,d))continue;const j=Math.min(.5+.95*w,H*.55)*(1-Math.exp(-_/.14)),Me=L*A-d*R,Pe=L*R+d*A,ge=h()<.3;Dt(Me,-.12-j*h(),Pe,ge?.0014+.003*h():6e-4+.0016*h()*h(),h()*B,ge?0:1+2.5*h())}if(n<2.2&&n>=i.nb){i.nb+=.2;const f=s+(h()-.5)*16,d=ao(i,f);if(d>.25&&c-1>no(i,f)){const w=c-.8-2*h(),_=w*A-f*R,L=w*R+f*A,j=(.1+.12*h())*(.8+.3*d);rt({x:_,y:-.4-.2*h(),z:L,vx:A*Ee*.2,vy:-(1+1.3*h())*d,vz:R*Ee*.2,top:!1,r:j,d:(.5+.4*h())*Math.min(1.3,d),sy:2,type:0,age:0,cx:_+A*.45,cy:-.55-.3*d,cz:L+R*.45,om:(1.2+1.2*h())*d,st:h()<.6?.4+h()*1.4:-1,stT:0,sox:(h()-.5)*j,soz:(h()-.5)*j})}}}let t=0;for(let r=0;r<Z.length;r++)I-Z[r].tB<40&&(Z[t++]=Z[r]);Z.length=t},Oe=(e,s,t,r)=>{const i=Wo(e*te[2],s*te[3]),n=l.x*A+l.z*R,c=-l.x*R+l.z*A;return _e(i[0]+n,i[1]+c,I+r,t)},Oo=e=>{for(let s=0;s<C.length;s++){const t=C[s];t.age+=e;const r=Je(t.x,t.z,I);let i=0,n=0,c=0;if(t.type===0){const d=t.om*Math.exp(-t.age/1.3),w=(t.x-t.cx)*A+(t.z-t.cz)*R,_=t.y-t.cy,L=d*_,j=-d*w;i=L*A,c=L*R,n=j,t.vy+=.42*Math.min(1,t.age/1.2)*e,t.top&&(n=0,i*=.3,c*=.3,t.vy+=(-.17-t.y)*3*e);const Me=(t.top?1.6:1.4)*e;t.vx-=t.vx*Me,t.vy-=t.vy*Me,t.vz-=t.vz*Me,t.d*=Math.exp(-e/(t.top?3.2:t.y>-.8?3:1.6)),t.r+=e*(t.top?.12:.2)/(1+t.age*1.3),t.sy=t.top?.45+.25*Math.min(1,t.age/2.5):1.35+Math.min(1.4,Math.max(0,-(t.vy+n))*.8),t.st>0&&t.age>.5&&(t.stT-=e,t.stT<=0&&(t.stT=.07+.1*h(),Dt(t.x+t.sox,t.y-t.r*.3,t.z+t.soz,.0014+.0024*t.st*h(),h()*B,0),t.st-=.015));for(let Pe=t.d*e*9;Pe>0;Pe--)if(h()<Pe){const ge=(h()+h()+h()-1.5)*t.r,vt=(h()+h()+h()-1.5)*t.r,_t=(h()+h()+h()-1.5)*t.r;Dt(t.x+ge,t.y+vt,t.z+_t,6e-4+.0016*h()*h(),h()*B,1+2.5*h())}}else t.vy-=.05*e,t.vy*=Math.exp(-e*.8),t.vx*=Math.exp(-e),t.vz*=Math.exp(-e),t.d*=Math.exp(-e/6),t.r+=e*.1/(1+t.age*.5);t.x+=(t.vx+i+r[0]+x.vx)*e,t.y+=(t.vy+n)*e,t.z+=(t.vz+c+r[1]+x.vz)*e,t.cx+=(r[0]+x.vx)*e,t.cz+=(r[1]+x.vz)*e;const f=de(t.x);t.y-t.r*.25<f&&(t.type===0&&t.vy+n<-.35&&C.length<ze-2&&rt({x:t.x,y:f+.15,z:t.z,vx:t.vx,vy:.25,vz:t.vz,r:.35,d:.7*Math.min(1,-(t.vy+n)),type:1,age:0}),t.y=f+t.r*.25,t.vy<0&&(t.vy*=-.3)),t.y>-.12&&(t.y=-.12)}},Ho=e=>{let s=0,t=0;const r=x.vx,i=x.vz;for(let n=0;n<me;n++){const c=(Ie+n)%ee,f=lt[c],d=kt[c]+e,w=f<7e-4?.1:f<.0013?.17:.23;let _=it[c],L=jt(_),j=Mt;const Me=pe[L]*(1-j)+pe[L+3]*j,Pe=pe[L+1]*(1-j)+pe[L+4]*j,ge=Rt[c]+e*(f>.0015?14:6),vt=f>.0013?.06:.02;_+=(Me+r+Math.cos(ge)*vt)*e;const _t=ct[c]+(Pe+i+Math.sin(ge*.9)*vt)*e,bo=ht[c]+w*Math.min(1,d*3)*e,Ct=Ut[c];if(L=jt(_),j=Mt,bo>pe[L+2]*(1-j)+pe[L+5]*j-.02)s++;else if(!(Ct&&d>Ct)){const Ne=(Ie+t++)%ee;it[Ne]=_,ht[Ne]=bo,ct[Ne]=_t,lt[Ne]=f,Rt[Ne]=ge,kt[Ne]=d,Ut[Ne]=Ct}}return me=t,s},ro=e=>{I+=e,Y+=(zt-Y)*Math.min(1,e*(zt>Y?.35:.12)),Tt=1+.55*(Y-1);const s=Math.floor(to(I));s!==oo&&(oo=s,I>at&&h()<K[1]*(Y>1.15?1.3:1)&&Oe(1.5+11*h(),-3+8*h(),K[2]*Y*(.75+.4*h()),5+2*h())),Go(e);const t=B/1.3;x.vx+=(-t*t*x.x-.6*x.vx)*e,x.vz+=(-t*t*x.z-.6*x.vz)*e;const r=Math.hypot(x.vx,x.vz);if(r>.7&&h()<(r-.7)*e*3&&C.length<ze-4){const c=(h()-.5)*1.6,f=1.2+4*h(),d=l.x+Math.sin(oe+c)*f,w=l.z+Math.cos(oe+c)*f;rt({x:d,y:de(d)+.08,z:w,vx:0,vy:.12,vz:0,r:.3+.25*h(),d:.55,sy:.6,type:1,age:0}),Ge+=.01}x.x+=x.vx*e,x.z+=x.vz*e,De[0]+=x.vx*e*.5,De[2]+=x.vz*e*.5,De[1]-=e*.02,nt[0]+=.03*e,nt[1]+=.012*e;const i=qt+Math.max(0,Y-1.12)*1.3;if(Ge+=(i-Ge)*e*(i>Ge?.25:.05),Oo(e),Y>1.2&&h()<(Y-1.2)*e*2.5){const c=h()*B,f=1.5+6*h(),d=l.x+Math.sin(oe+c*.4)*f,w=l.z+Math.cos(oe+c*.4)*f;rt({x:d,y:de(d)+.1,z:w,vx:Je(d,w,I)[0]*.5,vy:.18,vz:Ue[1]*.5,r:.4+.3*h(),d:.5,type:1,age:0})}{let c=0;for(let f=0;f<C.length;f++)C[f].d>=.03&&(C[c++]=C[f]);C.length=c}Bo(I),Ho(e)&&(so-=e)<0&&(so=.15+.2*h(),o.sound.hit("blip",.05,{freq:900+900*h()}));for(let c=0;c<se.length;c++){const f=se[c];f.age+=e;const d=Je(f.x,f.z,I);f.x+=(d[0]+x.vx*.6)*e*1.1,f.z+=(d[1]+x.vz*.6)*e*1.1,f.r+=e*.1/(1+f.age*.3),f.a*=Math.exp(-e/10)}{let c=0;for(let f=0;f<se.length;f++)se[f].a>=.04&&(se[c++]=se[f]);se.length=c}};let V=null,dt=!1,Zo=0,io=0;const ho=(e,s)=>{const t=Vo(e,s);let r,i;if(t[1]>.04){const w=Math.min((0-l.y)/t[1],16);r=l.x+t[0]*w,i=l.z+t[2]*w}else{const w=t[1]-fe*t[0],_=w<-.001?Math.min((-H+fe*l.x-l.y)/w,12):12;r=l.x+t[0]*_,i=l.z+t[2]*_}const n=r*A+i*R,c=-r*R+i*A,f=Math.max(K[2]*1.25,1.1);let d=null;for(let w=0;w<Z.length;w++)if(I<Z[w].tB&&ft(Z[w])<n-2){d=Z[w];break}if(d){const w=ft(d);d.sb=n,d.tB=I+(n-w)/Ee,d.str=Math.max(d.str,f)}else d=_e(n,c,I+2.2+.6*h(),f);d.up=c,d.pk=.03,ut(d,c)},Ko=e=>{const s=o.input,t=s.taps();if(dt=!1,s.down){V||(V={x0:s.x,y0:s.y,lx:s.x,ly:s.y,t:0,path:0,drag:!1});const r=s.x-V.lx,i=s.y-V.ly;if(V.lx=s.x,V.ly=s.y,V.t+=e,V.path+=Math.hypot(r,i),V.path>.02){V.drag||(V.drag=!0,o.sound.hit("noise",.25,{cutoff:420,dur:1.4}));const n=l.fw[0],c=l.fw[2],f=Math.hypot(n,c)||1;x.vx=Q(x.vx+(r*l.rt[0]-i*n/f)*16,-2.2,2.2),x.vz=Q(x.vz+(r*l.rt[2]-i*c/f)*16,-2.2,2.2)}else if(V.t>.35&&(dt=!0,Zo+=e,V.t-e<=.35))for(let n=0;n<3;n++)o.sound.note([31,38,43][n],{dur:4,vel:.14,wave:"sine",at:n*.3,attack:1})}else V?(!V.drag&&V.t<=.35&&ho(V.x0,V.y0),V=null):t.length&&ho(t[0].x,t[0].y);zt=dt?1.7:Lo(I),dt&&(io-=e)<0&&(io=2.5,o.sound.hit("noise",.3,{cutoff:180,dur:2.6}))},co=u.rt[m]||(u.rt[m]=Se(a,m,m,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST)),Yo=768,jo=24,he=m>600?1024:512,lo=18,Ce=u.rt["r"+he]||(u.rt["r"+he]=Se(a,he,he,u.hf?a.R16F:a.R8,a.RED,u.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),Qo=(()=>{const e=Math.sin(qe),s=Math.cos(Qe);return 4*(1-e/(1.3333*s))/(s*s)})();y(37,he/2,.85*Qo,u.hf?1:1/16,0);const Le=u.rt.f5||(u.rt.f5=Se(a,512,512,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR)),ye=Math.ceil(m/2),pt=u.hf?u.rt["x"+m]||(u.rt["x"+m]=Se(a,m,m,a.RGBA16F,a.RGBA,a.HALF_FLOAT,a.NEAREST)):null,fo=u.rt["v2"+m]||(u.rt["v2"+m]=Se(a,ye,ye,u.hf?a.RGBA16F:a.RGBA8,a.RGBA,u.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),uo=u.rt["w2"+m]||(u.rt["w2"+m]=Se(a,ye,ye,u.hf?a.RGBA16F:a.RGBA8,a.RGBA,u.hf?a.HALF_FLOAT:a.UNSIGNED_BYTE,a.LINEAR)),mt=[null,null,null,null,null,null,null,null,null,null,null,null,null],xe=[u.tN,u.tD,null,u.tN3,null,null,null,null,null,u.tNr,u.tNg,u.tNb,u.tN1];let He=!0;const It=e=>{xe[2]=e==="v"?fo.tex:null,xe[4]=e==="s"?co.tex:null,xe[5]=e==="w"?null:Ce.tex,xe[6]=e==="w"||e==="f"?null:Le.tex,xe[7]=e==="v"&&pt?pt.tex:null,xe[8]=e==="v"?uo.tex:null;let s=!1;for(let t=0;t<13;t++)(He||mt[t]!==xe[t])&&(a.activeTexture(a.TEXTURE0+t),a.bindTexture(t===3||t===9||t===10||t===11?a.TEXTURE_3D:a.TEXTURE_2D,xe[t]),mt[t]=xe[t],s=!0);s&&a.activeTexture(a.TEXTURE0)},Be=(e,s,t,r,i)=>{const n=u.use(e);a.bindFramebuffer(a.FRAMEBUFFER,s),a.viewport(0,0,t,r),He&&(a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.bindVertexArray(u.vao)),a.useProgram(n.p),a.uniform4fv(n.uP,G),n.uW&&a.uniform4fv(n.uW,b,0,140),n.uBP&&(a.uniform4fv(n.uBP,b,256,ze*4),a.uniform4fv(n.uBQ,b,512,ze*4)),It(i),He=!1,a.drawArrays(a.TRIANGLES,0,3)},$o=()=>{const e=(s,t,r,i,n)=>{b[s]=t,b[s+1]=r,b[s+2]=i,b[s+3]=n};for(let s=0;s<C.length;s++){const t=C[s];let r=0;for(let i=0;i<C.length;i++){const n=C[i];if(n===t)continue;const c=n.x-t.x,f=n.y-t.y,d=n.z-t.z,w=c*$[0]+f*$[1]+d*$[2];if(w<=0)continue;const _=c*c+f*f+d*d-w*w;_>6*n.r*n.r||(r+=n.d*n.r*1.77*Math.exp(-_/(n.r*n.r))*(n.type?.6:1))}e((64+s)*4,t.x,t.y,t.z,t.r),e((128+s)*4,t.d,t.type,Math.exp(-r*2.6),t.sy||1)}},po=()=>{eo(),y(0,l.x,l.y,l.z,ot),y(1,l.fw[0],l.fw[1],l.fw[2],m),y(2,l.rt[0],l.rt[1],l.rt[2],I),y(3,l.up[0],l.up[1],l.up[2],Co),y(7,Do,Ge,C.length,se.length),y(14,x.x,x.z,me,Io),G[18*4+2]=$e*Tt;{const i=$[0]*l.fw[0]+$[1]*l.fw[1]+$[2]*l.fw[2],n=($[0]*l.rt[0]+$[2]*l.rt[2])/(Math.max(i,.05)*ot),c=($[0]*l.up[0]+$[1]*l.up[1]+$[2]*l.up[2])/(Math.max(i,.05)*ot);y(21,De[0],De[1],De[2],i>.2&&Math.abs(n)<1.3&&Math.abs(c)<1.3?ie[3]*(N==="Veiled sun"?.25:1):0),y(22,nt[0],nt[1],n*.5+.5,c*.5+.5)}G[19*4+3]=1+.6*(Y-1);{const i=Je(Xe[1][0],Xe[1][1],I);let n=0;for(let c=0;c<4;c++){const f=.12+.25*c/3+.15*Math.sin(I*.7+c),d=Xe[c][0]+(x.x*.5+i[0]*.35)*f,w=Xe[c][1]+(x.z*.5+i[1]*.35)*f;G[16*4+n++]=d,G[16*4+n++]=w}}{const i=x.x*A+x.z*R;let n=0;for(let c=0;c<Z.length;c++){const f=Z[c];I-f.tB<-7||(y(26+2*n,ft(f)+i,f.sb+i,f.str,f.up),y(27+2*n,I-f.tB,f.p1,f.p2,f.pk),n++)}y(34,A,R,Ee,n)}b.fill(0),Fo(I);const e=(i,n,c,f,d)=>{b[i]=n,b[i+1]=c,b[i+2]=f,b[i+3]=d};$o();for(let i=0;i<se.length;i++){const n=se[i];e((192+i)*4,n.x,n.z,n.r,n.a),e((256+i)*4,n.an,n.el,n.seed,0)}for(let i=0,n=320*4;i<me;i++,n+=4){const c=(Ie+i)%ee;b[n]=it[c],b[n+1]=ht[c],b[n+2]=ct[c],b[n+3]=lt[c]}a.bindTexture(a.TEXTURE_2D,u.tD),a.texSubImage2D(a.TEXTURE_2D,0,0,0,64,12,a.RGBA,a.FLOAT,b),y(23,Math.round(l.x*8)/8,Math.round(l.z*8)/8,jo,Yo),He=!0;{const i=Math.hypot(l.fw[0],l.fw[2]),n=5*Math.min(i/.5,1)/(i||1),c=lo/he;y(36,Math.round((l.x+l.fw[0]*n)/c)*c,Math.round((l.z+l.fw[2]*n)/c)*c,lo,he);const f=u.use("cz");a.bindFramebuffer(a.FRAMEBUFFER,Ce.fb),a.viewport(0,0,he,he),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.bindVertexArray(u.vao),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),a.useProgram(f.p),a.uniform4fv(f.uP,G),a.uniform4fv(f.uW,b,0,140),It("w"),He=!1,a.drawArraysInstanced(a.TRIANGLE_STRIP,0,he,he/2-1),a.disable(a.BLEND),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,Ce.tex),a.generateMipmap(a.TEXTURE_2D),Ce.mip||(Ce.mip=!0,a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR)),mt[5]=Ce.tex,a.activeTexture(a.TEXTURE0)}Be("foam",Le.fb,512,512,"f"),a.activeTexture(a.TEXTURE6),a.bindTexture(a.TEXTURE_2D,Le.tex),a.generateMipmap(a.TEXTURE_2D),Le.mip||(Le.mip=!0,a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR)),mt[6]=Le.tex,a.activeTexture(a.TEXTURE0),Be("vol",fo.fb,ye,ye,null),Be("vol2",uo.fb,ye,ye,null);const s=o.view||Bt,t=!!(s.yaw||s.pitch||s.x||s.y||s.z);t&&u.kick(),pt&&Be(t?"mainSF":"mainS",pt.fb,m,m,"x"),Be("main",co.fb,m,m,"v"),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA);const r=u.use("pt");a.useProgram(r.p),a.uniform4fv(r.uP,G),a.uniform4fv(r.uW,b,0,140),It(null),a.drawArrays(a.POINTS,0,me+wt+To),a.disable(a.BLEND),Be("fin",null,m,m,"s")};eo();const mo=1.5,ce=mo+4,xo=l.x*A+l.z*R,vo=-l.x*R+l.z*A;if(at=ce+1,X==="A wave breaking"){{const s=_e(xo+3.5,vo+(Re?-6:6),ce-9,K[2]*.7);s.pk=.05}let e;if(o.home)e=Oe(8,-.3,K[2]*1.05,0),e.tB=ce-1.1;else if(v==="Out to sea"){const s=.4+2.6*Math.pow(ue,1.3),t=2.5+2.5*le,r=Math.hypot(l.fw[0],l.fw[2])||1,i=l.x+l.fw[0]/r*t,n=l.z+l.fw[2]/r*t;e=_e(i*A+n*R-Ee*s,-i*R+n*A,ce-s,K[2]*1.05)}else if(v==="Facing the shore"){const s=.8+3*Math.pow(ue,1.3),t=1.5+3*le,r=Math.hypot(l.fw[0],l.fw[2])||1,i=l.x+l.fw[0]/r*t,n=l.z+l.fw[2]/r*t;e=_e(i*A+n*R,-i*R+n*A,ce-s,K[2]*1.05)}else e=Oe(7+5*(le*7.31%1),-3.5+7*le,K[2]*1.05,0),e.tB=ce-(.3+6.7*Math.pow(ue,1.7));e.pk=.06,ut(e,e.up)}else if(X==="Between sets")at=ce+14;else if(X==="The wave overhead"){{const e=_e(xo+5,vo,ce-11,K[2]*.6);e.pk=.1}{const e=Oe(3.5,2.5,K[2]*1.1,0);e.tB=ce+.45,e.pk=.05,ut(e,e.up)}}else{for(const[e,s,t]of[[10,4,17],[7,1.5,9.5],[5,-1,2.6]]){const r=Oe(e,s,K[2]*1.2,0);r.tB=ce-t,r.pk=.05,ut(r,r.up)}at=ce+4}for(let e=0;e<mo*30;e++)ro(1/30);po();let xt=0,wo=0;return(e,s)=>{for(++wo===3?u.kick():wo===1&&u.kick(2),s=Q(s||1/30,0,.1),Ko(s),xt=Math.min(xt+s,.2);xt>=1/30;)xt-=1/30,ro(1/30);po()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
