// Steppe Night: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/556.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(so){so&&function(){"use strict";const Bo={yaw:0,pitch:0,x:0,y:0,z:0},co=0,Y=Math.PI*2,p=Math.PI/180,Ht=47.2*p,Re=5.7,Ot=23.3*p,Co=.66,Te=Math.tan(33*p),ze=.1,Fe=2e4,Z=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,st=`
uniform sampler2D uN;
float sq(float x) { return x * x; }
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float nf(vec2 p) { vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float nz(vec2 p) {
  vec2 i = floor(p), f = p - i; f = f * f * (3. - 2. * f);
  ivec2 c = ivec2(i) & 255, e = (c + 1) & 255;
  float a = texelFetch(uN, c, 0).r, b = texelFetch(uN, ivec2(e.x, c.y), 0).r, g = texelFetch(uN, ivec2(c.x, e.y), 0).r, h = texelFetch(uN, e, 0).r;
  return mix(mix(a, b, f.x), mix(g, h, f.x), f.y);
}
float an2(vec2 v) { vec2 n = normalize(v + 1e-6); return n.y >= 0. ? 1. - n.x : 3. + n.x; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
`,ft=`
layout(std140) uniform UB { vec4 u[52]; };
#define CAM u[0].xyz
#define TANH u[0].w
#define FWD u[1].xyz
#define PA u[1].w
#define RGT u[2].xyz
#define TIME u[2].w
#define UPV u[3].xyz
#define EXPO u[3].w
#define SUND u[4].xyz
#define LZT u[5].x
#define GAMP u[5].y
#define GSIG u[5].z
#define NFL u[5].w
#define EQ0 u[6].xyz
#define MLIM u[6].w
#define EQ1 u[7].xyz
#define SGAIN u[7].w
#define EQ2 u[8].xyz
#define MWG u[8].w
#define GL0 u[9].xyz
#define TILE u[9].w
#define GL1 u[10].xyz
#define NBRT u[10].w
#define GL2 u[11].xyz
#define NMET u[11].w
#define WIND u[12]
#define FIRE u[13]
#define DOORN u[14].xyz
#define FIRECOL u[15].rgb
#define MFLASH u[15].w
#define SKYUP u[16].rgb
#define GW u[16].w
#define LG u[17].xyz
#define GLI u[17].w
#define GLC u[18].rgb
#define SHEEN u[18].w
#define GERP u[19].xyz
#define MOON u[20]
#define FL1 u[21]
#define FL2 u[22]
#define MISC u[23]
#define T0 u[24]
#define SW u[25]
#define GH u[26]
#define GRS u[27]
#define SMK u[28]
#define SMK2 u[29]
#define VP mat4(u[30], u[31], u[32], u[33])
#define MT u[34]
#define ALB u[35]
#define TRK u[36]
#define TRK2 u[37]
#define FIN u[38]
#define SKYK u[44]
#define SKY2 u[45]
#define MNL u[46]
#define MNC u[47]
#define MISTC u[48]
`,Et=`
float Hraw(vec2 p) {
  return 26. * (nz(p * (1. / 4100.) + T0.yx * .37) - .5) + 24. * (nz(p * (1. / 880.) + T0.xy) - .5) + 7. * (nz(p * (1. / 230.) + T0.zw) - .5)
       + 1.1 * (nz(p * (1. / 53.) + T0.wz) - .5) + .14 * (nz(p * (1. / 8.5) + T0.xw) - .5);
}
float H(vec2 p) {
  float h = Hraw(p);
  vec2 q = p - SW.xy; h += SW.z * exp(-(dot(q, q) - sq(dot(q, GH.zw))) * SW.w) + 11. * (1. - exp(-dot(p, p) * 1.6e-6));
  vec2 g = p - GERP.xz; h = mix(h, GH.x, exp(-dot(g, g) * (1. / 70.)));
  return h - GH.y;
}
float rut(vec2 p) {
  vec2 dl = p - TRK.xy; float s = dot(dl, TRK.zw);
  float off = dot(dl, vec2(-TRK.w, TRK.z)) - TRK2.x * sq(max(s - 45., 0.)) * .0011 - TRK2.y * sin(max(s - 45., 0.) * .013);
  return exp(-sq((abs(off) - .72) / .17)) * smoothstep(-.5, 2., s) * TRK2.w;
}
vec3 tmap(vec3 x) { x = max(x, 0.); vec3 y = (x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14); return pow(clamp(y, 0., 1.), vec3(1. / 2.2)); }
vec3 skyRad(vec3 d) {
  float e = max(d.y, 0.), aw = 1. - e;
  vec2 hz = normalize(d.xz + vec2(1e-7, 0.));
  float cd = dot(hz, normalize(SUND.xz + vec2(1e-7, 0.)));
  vec3 blue = vec3(.15, .29, .8) * (1. + .5 * aw * aw) * (1. + aw * .8 * smoothstep(-.3, 1., cd)) * (1. - .55 * aw * smoothstep(.3, -.9, cd) * (.5 + .5 * exp(-e / .3)));
  float x = e / GSIG;
  float az = exp(-(1. - cd) / GW);
  vec3 gc = mix(vec3(1., .3, .05), vec3(1., .5, .1), smoothstep(0., .5, x));
  gc = mix(gc, vec3(.95, .74, .26), smoothstep(.45, 1.25, x));
  gc = mix(gc, vec3(.5, .72, .5), smoothstep(1.1, 2.1, x));
  gc = mix(gc, vec3(.25, .5, .68), smoothstep(1.9, 3.2, x));
  float gm = az * exp(-x * .55);
  vec3 c = LZT * (blue * (1. - .75 * gm) + gc * GAMP * az * exp(-x * 1.15) + vec3(.5, .3, .55) * .5 * smoothstep(-.2, 1., cd) * exp(-sq((e - .35) / .25)) * smoothstep(9., 5., GAMP));
  float vr = 1. / sqrt(1. - .96 * (1. - e * e));
  float ea = smoothstep(-.2, -.9, cd) * MNL.w;
  c *= 1. - .45 * ea * exp(-e / .05);
  c += LZT * vec3(.62, .34, .44) * .3 * ea * exp(-sq((e - .1) / .06));
  c += NFL * (vec3(.42, .5, .78) * (.7 + .3 * vr) + vec3(.25, .62, .3) * .45 * vr * exp(-sq((e - .1) / .12)));
  return c * mix(vec3(.55, .4, .32), vec3(1.), smoothstep(0., .015, e));
}
vec3 farLights(vec3 vd, float dist) {
  vec3 c = vec3(0.);
  if (FL1.w > 0. && dist > MISC.x * .97) { float x = 1. - dot(vd, FL1.xyz); c += vec3(1., .62, .3) * FL1.w * (exp(-x / (PA * PA * .5)) + .05 * exp(-x / (PA * PA * 30.))); }
  if (FL2.w > 0. && dist > MISC.y * .97) { float x = 1. - dot(vd, FL2.xyz); c += vec3(1., .93, .78) * FL2.w * (exp(-x / (PA * PA * .4)) + .06 * exp(-x / (PA * PA * 40.))); }
  return c;
}
vec3 keyL(vec3 N) { return GLC * GLI * max(dot(N, LG), 0.) + MNC.rgb * max(dot(N, MNL.xyz), 0.); }
float mistA(float y, float dist, float lvn) {
  return SKYK.x != 3. ? 0. : max(smoothstep(SKY2.x + lvn + .5, SKY2.x + lvn - 1.8, y) * (1. - exp(-max(dist - 6., 0.) / 60.)) * .66, (1. - exp(-dist / 450.)) * .7);
}
vec3 mistC(vec3 vd) { float w = max(dot(vd, LG), 0.); return MISTC.rgb * (.55 + .45 * w) + GLC * GLI * (.5 * w * w + .7 * pow(w, 6.)); }
vec3 doorL(vec3 P, vec3 N) {
  vec3 L = FIRE.xyz - P; float dd = dot(L, L); L *= inversesqrt(dd);
  return FIRECOL * FIRE.w * smoothstep(.35, .9, dot(-L, DOORN)) * 1.6 * max(dot(N, L), 0.) / (dd + 1.5) * smoothstep(55., 4., dd);
}
`,Go=Z+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 1., 1.); }",Uo=Z+st+`
uniform vec2 uRes;
uniform float uZ;
out vec4 o;
float fbm(vec2 p, int n) { float s = 0., a = .5, w = 0.; n += int(uZ); for (int i = 0; i < n; i++) { s += a * nf(p); w += a; p = p * 2.03 + 17.3; a *= .5; } return s / w; }
vec4 mwAt(float l, float b, float lx) {
  vec2 p = vec2(lx, b) * 10.2;
  float cen = smoothstep(-.2, 1., cos(l));
  float thick = .045 + .07 * cen;
  float lonI = .16 + .5 * cen + .45 * exp(-sq(l - 1.32) / .05) + .3 * exp(-sq(l - .47) / .008) + .15 * exp(-sq(l + 1.4) / .1);
  float disc = exp(-abs(b + .006 * sin(l * 3.)) / thick);
  float bul = exp(-1.5 * pow(sq(l / .19) + sq(b / .13), .55));
  float cl = fbm(p, 5), cl2 = fbm(p * 2.6 + 11., 4), cl3 = fbm(p * 7. + 23., 3);
  cl = clamp((cl - .5) * 2.4 + .5, 0., 1.); cl2 = clamp((cl2 - .5) * 2.4 + .5, 0., 1.);
  float I = disc * lonI * (.25 + 1.4 * cl * cl + .5 * cl2 * cl3) + bul * (2.4 + 1.2 * cl);
  I += .9 * exp(-(sq(l - .08) / .006 + sq(b + .06) / .003)) * (.6 + .8 * cl2);
  I += .6 * exp(-(sq(l - .47) / .004 + sq(b + .03) / .002)) * (.5 + cl2);
  float r1 = 1. - abs(2. * fbm(p * 1.7 + 31., 5) - 1.); r1 = r1 * r1 * r1;
  float r2 = 1. - abs(2. * fbm(p * 4.3 + 57., 4) - 1.); r2 *= r2;
  float rb = .03 + .025 * sin(l * 1.9 + .4) + .03 * (fbm(vec2(lx * 3., 5.), 3) - .5);
  float rw = .03 + .03 * smoothstep(0., 1.3, l);
  float rift = exp(-sq((b - rb) / rw)) * smoothstep(-.3, .05, l) * (1. - smoothstep(1.35, 1.65, l));
  float tau = rift * (1.1 + 1.6 * r1 + .7 * r2) + exp(-abs(b) / .045) * (.5 * r1 + .7 * r2) * (.4 + .6 * cen);
  tau += 1.6 * exp(-(sq(l) / .0016 + sq(b - .09) / .0006)) * (.6 + r2);
  vec3 sc = mix(vec3(.74, .82, 1.), vec3(1., .88, .72), cen);
  sc = mix(sc, vec3(1., .78, .55), clamp(bul * 1.4, 0., 1.));
  vec3 col = sc * I * exp(-tau * vec3(.75, 1., 1.4));
  float neb = exp(-(sq(l - .105) / .0002 + sq(b + .022) / .0001)) + .6 * exp(-(sq(l - .29) / .0002 + sq(b - .014) / .0001)) + .5 * exp(-(sq(l - 1.49) / .0012 + sq(b + .017) / .0006));
  col += vec3(1., .3, .38) * neb * .35 * exp(-tau * .4);
  float edge = smoothstep(.48, .3, abs(b));
  col *= edge;
  float dens = clamp((disc * lonI * (.3 + cl) + bul) * exp(-tau * .9), 0., 1.) * edge;
  return vec4(sqrt(clamp(col * .22, 0., 1.)), dens);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float l = (uv.x - .5) * 6.2831853, b = uv.y - .5;
  float w = smoothstep(2.7, 3.1416, abs(l)) * .5;
  vec4 c = vec4(0.);
  int n = int(uRes.x * 0.) + (w > 0. ? 2 : 1);
  for (int i = 0; i < n; i++) c += mwAt(l, b, i == 0 ? l : l - sign(l) * 6.2831853) * (i == 0 ? 1. - w : w);
  o = c / (n == 1 ? 1. - w : 1.);
}`,qo=Z+st+ft+Et+`
layout(location=0) in vec2 aP;
out vec3 vP; out vec3 vN;
void main() {
  float fu = aP.y - .5, hw = u[43].x, fd = u[43].y * .5, sg = fu < 0. ? -1. : 1.;
  float an = abs(fu) < fd ? fu / fd * hw : sg * (hw + (abs(fu) - fd) / (.5 - fd) * (3.1415927 - hw));
  an += u[43].z;
  vec2 p = aP.x * vec2(sin(an), cos(an));
  float e = max(.06, aP.x * .008), h = 0., hx = 0., hz = 0.;
  int n5 = int(u[39].y);
  for (int i = 0; i < n5; i++) {
    vec2 o = i == 0 ? vec2(0.) : i == 1 ? vec2(e, 0.) : i == 2 ? vec2(-e, 0.) : i == 3 ? vec2(0., e) : vec2(0., -e);
    float v = H(p + o);
    if (i == 0) h = v; else if (i < 3) hx += i == 1 ? v : -v; else hz += i == 3 ? v : -v;
  }
  vN = normalize(vec3(-hx, 2. * e, -hz));
  vec2 dc = p - CAM.xz;
  vP = vec3(p.x, h - dot(dc, dc) / 1.2742e7, p.y);
  gl_Position = VP * vec4(vP, 1.);
}`,go=Z+st+ft+Et+`
in vec3 vP; in vec3 vN; out vec4 o;
void main() {
  vec3 P = vP, dv = P - CAM; float dist = length(dv); vec3 vd = dv / dist;
  float fp = dist * PA;
  vec2 q = P.xz;
  vec3 N = normalize(vN);
  // the footprint of a pixel along the ground (it stretches at a grazing look): finer octaves fade before they alias
  float fpa = fp / max(abs(dot(vd, N)), .04);
  float big = nf(q / 70. + 3.7), mid = nf(q / 11. + 9.1), midA = mix(mid, .5, smoothstep(3., 10., fpa));
  float fine = mix(.5, nf(q / .45 + 1.3), 1. - smoothstep(.12, .45, fpa));
  float vfine = mix(.5, nf(q / .085 + 5.2), 1. - smoothstep(.025, .08, fpa));
  vec2 gq = vec2(nf(q / .3 + 11.) - .5, nf(q / .3 + 37.) - .5) * (1. - smoothstep(.06, .25, fpa));
  N = normalize(N + vec3(gq.x, 0., gq.y) * .5);
  float green = smoothstep(.38, .72, big * .65 + midA * .35);
  vec3 alb = mix(ALB.rgb, ALB.rgb * vec3(.62, .82, .6), green * ALB.w);
  alb *= .6 + .6 * fine + .3 * (vfine - .5);
  alb = mix(alb, vec3(dot(alb, vec3(.3, .5, .2))), .3);
  float r0 = length(q);
  float nearW = 1. - smoothstep(8., 14.5, r0);
  vec3 soil = vec3(.155, .135, .112) * (.65 + .7 * vfine);
  vec3 litter = mix(soil, ALB.rgb * .6, .35 + .5 * (fine - .5));
  alb = mix(alb, litter, nearW * .85);
  if (fpa < .035) {
    float nd = 1. - smoothstep(.015, .035, fpa);
    vec2 c1 = q / .045, i1 = floor(c1);
    uint h1 = hu(uint(int(i1.x) + 900000) * 1973u ^ uint(int(i1.y) + 900000) * 9277u);
    float pr = .15 + .25 * hf(h1 ^ 7u), pd = length(c1 - i1 - .3 - .4 * vec2(hf(h1 ^ 3u), hf(h1 ^ 5u)));
    vec2 pv = c1 - i1 - .3 - .4 * vec2(hf(h1 ^ 3u), hf(h1 ^ 5u));
    float pb = step(hf(h1), .09) * smoothstep(pr, pr * .75, pd * (1. + .35 * sin(an2(pv) * 3. + hf(h1 ^ 2u) * 6.)));
    vec2 c2 = q / .08, i2 = floor(c2);
    uint h2 = hu(uint(int(i2.x) + 700000) * 7919u ^ uint(int(i2.y) + 700000) * 3343u);
    float an = hf(h2 ^ 9u) * 6.2832; vec2 dr = vec2(cos(an), sin(an)), rl = c2 - i2 - .5;
    float sl = .15 + .3 * hf(h2 ^ 15u), bw = dot(rl, dr);
    float st = step(hf(h2), .45) * smoothstep(sl, sl - .06, abs(bw)) * smoothstep(.025, .008, abs(dot(rl, vec2(-dr.y, dr.x)) - .06 * bw * bw * (hf(h2 ^ 17u) - .5) * 8.));
    alb = mix(alb, vec3(.2, .185, .16) * (.7 + .5 * hf(h1 ^ 11u)) * (.7 + .5 * clamp(dot(pv, vec2(-.7, .7)) / pr + .5, 0., 1.)), pb * nd);
    alb = mix(alb, vec3(.36, .33, .25) * (.7 + .5 * hf(h2 ^ 13u)), st * nd * .45);
  }
  float gd = length(q - GERP.xz);
  float camp = 1. - smoothstep(5., 13., gd);
  alb = mix(alb, soil * 1.1, camp * .55 * (.6 + .6 * midA));
  float rr = rut(q) * clamp(.34 / fp, 0., 1.);
  alb = mix(alb, vec3(.19, .17, .145) * (.8 + .4 * vfine), rr * .4);
  // grass clumps at 2 and 6 m, shrinking with distance and fading before they alias (the ridge's face, the far slope)
  float tx = mix(.5, nf(q / 2.2 + 21.), 1. - smoothstep(.7, 2.2, fpa)) * .55 + mix(.5, nf(q / 6.5 + 41.), 1. - smoothstep(2.2, 6.5, fpa)) * .45;
  alb *= .76 + .48 * tx;
  // on a steep face (the ridge) the grass runs up the slope: streaks along the fall line, thinning with distance
  float slp = smoothstep(.12, .35, length(N.xz));
  float gs = nf(q / .8 + 61.);
  alb *= mix(1., .55 + .9 * mix(.5, gs, 1. - smoothstep(.4, 1.2, fp)) * (.7 + .6 * tx), slp);
  float occ = .7 + .3 * fine;
  vec3 E = SKYUP * (.76 + .5 * N.y) * occ + keyL(N) * (1. - .45 * slp);
  vec3 col = alb * E;
  float fs = pow(max(dot(vd, LG), 0.), 5.), graz = 1. - smoothstep(.0, .35, -vd.y);
  float wv = 1. + WIND.z * 1.4 * (nf((q - WIND.xy * WIND.w) / 7.) - .5) + WIND.z * .5 * (nf((q - WIND.xy * WIND.w * 1.3) / 2.1 + 5.) - .5) * (1. - smoothstep(1., 2.5, fpa));
  col += GLC * GLI * SHEEN * fs * graz * (.45 + .9 * fine) * wv * (1. - nearW * .7) * (1. - rr * .5) * (1. - camp * .6) * (1. - .85 * slp);
  col += MNC.rgb * SHEEN * pow(max(dot(vd, MNL.xyz), 0.), 5.) * graz * (.45 + .9 * fine) * wv * (1. - rr * .5);
  col += SKYUP * .12 * rr * graz;

  vec2 tf = FIRE.xz - P.xz;
  col += alb * doorL(P + vec3(0., .12, 0.), normalize(N + .45 * vec3(tf.x, 0., tf.y) / max(length(tf), .01))) * (.35 + 1.3 * fine * vfine);
  col += alb * MFLASH * vec3(.75, .9, 1.) * (.5 + .5 * N.y);
  if (dist < 5.) {
    vec2 cg = q / .008, ci = floor(cg);
    uint hh = hu(uint(int(ci.x) + 900000) * 7919u ^ uint(int(ci.y) + 900000) * 104729u);
    vec2 sp = ci + .25 + .5 * vec2(hf(hh ^ 1u), hf(hh ^ 2u));
    float dpx = length(cg - sp) * .008 / fp;
    float glt = step(hf(hh), .0015) * exp(-dpx * dpx * 2.) * (1. - smoothstep(2., 5., dist));
    vec3 tg = FIRE.xyz - P;
    col += glt * (GLC * GLI * 1.2 * pow(max(dot(vd, LG), 0.), 2.) + SKYUP * .25 + FIRECOL * FIRE.w * .01 * smoothstep(55., 4., dot(tg, tg)));
  }
  vec3 fogc = skyRad(normalize(vec3(vd.x, .012, vd.z))) * .55;
  // the ridge's crest against the sky: grass seen edge-on, the sky's light through it
  col += (fogc * .5 + GLC * GLI * SHEEN * fs) * smoothstep(.14, .02, abs(dot(vd, N))) * smoothstep(.04, .08, vd.y) * (.6 + .8 * tx);
  col = mix(col, fogc, 1. - exp(-dist / MISC.z));
  float ma = mistA(P.y, dist, 2.4 * (big - .5) + 1.1 * (mid - .5));
  col = mix(col, mistC(vd), ma) + FIRECOL * FIRE.w * ma * .05 * exp(-dot(P - FIRE.xyz, P - FIRE.xyz) / 40.);
  o = vec4(tmap(col * EXPO + farLights(vd, dist)), 1.);
}`,no=`
vec3 farLand(vec3 d, vec2 hz) {
  float swl = -.0005 + .0012 * nf(hz * 22. + MT.zw) + .0005 * nf(hz * 70. + 3.);
  float mt = -1.;
  if (MT.x > 0. && d.y < .06) {
    float a = .5, m = 0.; vec2 x = hz * MT.y + MT.zw * 3.;
    for (int i = 0; i < 6 + int(u[40].x); i++) { float n = nf(x); m += a * (i < 2 ? n : 1. - abs(2. * n - 1.) * .9); x = x * 2.03 + 7.1; a *= i < 2 ? .5 : .42; }
    mt = MT.x * max(m - .3, 0.) * 1.8 * smoothstep(.2, .55, nf(hz * 1.1 + MT.wz));
  }
  float cm = smoothstep(mt + PA * .6, mt - PA * .6, d.y), cs = smoothstep(swl + PA * .6, swl - PA * .6, d.y);
  return vec3(max(cm, cs), cs, swl);
}
`,Ko=Z+st+ft+Et+no+`
uniform sampler2D uMW, uD;
out vec4 o;
vec3 starL(vec3 q, float N, float prob, float m0, float m1, uint salt, float mlim, float dens) {
  vec3 a = abs(q);
  float m = max(a.x, max(a.y, a.z));
  bool bx = a.x >= m, by = !bx && a.y >= m;
  vec2 uv = (bx ? q.zy : by ? q.xz : q.xy) / m;
  uint face = (bx ? 0u : by ? 2u : 4u) + ((bx ? q.x : by ? q.y : q.z) > 0. ? 0u : 1u);
  vec2 g = (uv * .5 + .5) * N, ci = floor(g);
  uint h = hu(uint(ci.x) * 73856093u ^ uint(ci.y) * 19349663u ^ face * 83492791u ^ salt);
  float on = step(hf(h), prob * (1. + dens));
  uint h2 = hu(h ^ 0x9e3779b9u);
  vec4 r = vec4(uvec4(h2, h2 >> 8u, h2 >> 16u, h2 >> 24u) & 255u) / 255.;
  vec2 sp = ci + .2 + .6 * r.xy;
  float ang = length(g - sp) * (2. / N) / (1. + .5 * dot(uv, uv));
  float mg = m1 + .8686 * log(max(r.z, .004));
  on *= step(m0, mg);
  float b = SGAIN * exp2(-1.063 * (mg - 1.)) * clamp((mlim - mg) * .8 + .5, 0., 1.);
  float sg = PA * (TILE > 0. ? .55 : .62);
  vec3 sc = r.w < .12 ? vec3(.75, .86, 1.15) : r.w < .55 ? vec3(1., .98, .95) : r.w < .85 ? vec3(1.06, .95, .82) : vec3(1.15, .84, .62);
  return on * sc * b * exp(-ang * ang / (2. * sg * sg));
}
void main() {
  vec2 nd = gl_FragCoord.xy * PA / TANH - 1.;
  vec3 d = normalize(FWD + (RGT * nd.x + UPV * nd.y) * TANH);
  vec3 sk = skyRad(d);
  float lum = dot(sk, vec3(.25, .65, .1));
  vec3 col = sk * EXPO;
  vec2 hz = normalize(d.xz + vec2(1e-7, 0.));
  vec3 fl3 = farLand(d, hz); float cov = fl3.x, cs = fl3.y, swl = fl3.z;
  if (cov > 0.) {
    vec3 hc = sk;
    vec3 land = mix(hc * .62, hc * .34, cs);
    if (SKYK.x == 3.) land = mix(land, mistC(d), .75 * smoothstep(swl - .006, swl - .0005, d.y));
    col = mix(col, land * EXPO, cov);
  }
  vec3 cel = vec3(0.);
  if (d.y > -.01 && cov < 1.) {
    float lr = max(lum / NFL, 1.);
    float mlim = MLIM - 1.2 * log(lr) * .4343;
    vec3 q = vec3(dot(d, EQ0), dot(d, EQ1), dot(d, EQ2));
    vec3 g = vec3(dot(d, GL0), dot(d, GL1), dot(d, GL2));
    float lat = asin(clamp(g.z, -1., 1.));
    vec4 mw = vec4(0.);
    if (abs(lat) < .49) { mw = textureLod(uMW, vec2(at2(g.y, g.x) * (1. / 6.2831853) + .5, lat + .5), 0.); mw.rgb *= mw.rgb; }
    cel += mw.rgb * MWG / (1. + lr / 10.);
    vec3 st = vec3(0.);
    int nl = int(MISC.w);
    for (int i = 0; i < nl; i++) {
      float N = i == 0 ? 40. : i == 1 ? 100. : 230.;
      st += starL(q, N, i == 2 ? .22 : .3, i == 0 ? 3. : i == 1 ? 5.5 : 7., i == 0 ? 5.5 : i == 1 ? 7. : 8.5, uint(i) * 977u + 11u, mlim, mw.a * (i == 0 ? 0. : i == 1 ? 1.5 : 4.));
    }
    int nb = int(NBRT);
    for (int i = 0; i < nb; i++) {
      vec4 a = texelFetch(uD, ivec2(i, 0), 0), b = texelFetch(uD, ivec2(i, 1), 0);
      float x = 1. - dot(q, a.xyz);
      if (x < .0004) {
        float sg = PA * (TILE > 0. ? .58 : .62 + .09 * max(2. - a.w, 0.));
        float br = SGAIN * exp2(-1.063 * (a.w - 1.)) * clamp((mlim - a.w) * .8 + .5, 0., 1.);
        st += b.rgb * br * (exp(-x / (sg * sg)) + .025 * exp(-sqrt(2. * x) / (sg * 3.)));
      }
    }
    float e = max(d.y, 0.);
    cel += st * (1. + .3 * pow(1. - e, 8.) * sin(TIME * 11. + dot(q, vec3(4e3, 7e3, 3e3))));
    if (MOON.w > 0.) {
      float cm2 = dot(d, MOON.xyz);
      if (cm2 > .99) {
        vec3 md = MOON.xyz, e1 = normalize(cross(md, vec3(0., 1., 0.))), e2 = cross(e1, md);
        vec2 xy = vec2(dot(d, e1), dot(d, e2) * (1. + .17 * MNC.w)) / .0046;
        float r2 = dot(xy, xy), disc = smoothstep(1. + PA / .0046, 1. - PA / .0046, sqrt(r2));
        vec3 n = e1 * xy.x + e2 * xy.y - md * sqrt(max(1. - r2, 0.));
        float lit = smoothstep(-.04, .12, dot(n, SUND));
        cel += vec3(1., .95, .86) * (lit * 2.4 + .03) * (.85 + .15 * nf(xy * 3. + 7.)) * disc;
        cel += vec3(.9, .82, .7) * .06 * exp(-(1. - cm2) / .00005) + vec3(.9, .8, .7) * .015 * exp(-(1. - cm2) / .0008);
        cel += MNC.w * vec3(1., .7, .45) * (.05 * exp(-(1. - cm2) / .0003) + .012 * exp(-(1. - cm2) / .003));
      }
    }
    int nm = int(NMET);
    for (int i = 0; i < nm; i++) {
      vec4 A = texelFetch(uD, ivec2(i, 2), 0), B = texelFetch(uD, ivec2(i, 3), 0), C = texelFetch(uD, ivec2(i, 4), 0);
      float tau = (TIME - A.w) / C.y;
      if (tau > 0. && tau < 4.) {
        float off = dot(d, cross(A.xyz, B.xyz));
        float al = at2(dot(d, B.xyz), dot(d, A.xyz));
        float L = B.w, hd = L * min(tau, 1.);
        float sg = PA * (.42 + .16 * C.x);
        float lin = exp(-off * off / (2. * sg * sg));
        float I = C.x * pow(max(sin(3.1416 * min(tau, 1.)), 0.), .8) * step(tau, 1.) * clamp((mlim - 2.6 + 3.2 * C.x) * .6, 0., 1.);
        float uu = (hd - al) / (L * .32);
        float tr = smoothstep(-PA * 1.5 / (L * .32), .1, uu) * pow(max(1. - uu, 0.), 1.6) * step(-.05, al);
        vec3 mc = mix(vec3(.78, 1., .84), vec3(1., .86, .66), clamp(uu * 1.6, 0., 1.)) * tr * I * lin * 1.3;
        float tw = .0007 + .0009 * max(tau - 1., 0.);
        mc += vec3(.55, .9, .65) * C.x * .07 * exp(-max(tau - 1., 0.) * 1.5) * step(1., tau) * smoothstep(L * .1, L * .5, al) * step(al, L) * exp(-off * off / (2. * tw * tw));
        cel += mc;
      }
    }
    cel *= exp(-.09 / (e + .03) * vec3(.6, .85, 1.3)) * smoothstep(-.003, .012, d.y);
    col += cel * (1. - cov);
  }
  o = vec4(tmap(col + farLights(d, 1e9)), 1.);
}`,Ho=Z+st+ft+Et+no+`
out vec4 o;
float fb4(vec2 p) { float s = 0., a = .5; for (int i = 0; i < 4 + int(u[40].x); i++) { s += a * nf(p); p = p * 2.07 + 5.3; a *= .5; } return s * 1.0667; }
void main() {
  vec2 nd = gl_FragCoord.xy * PA / TANH - 1.;
  vec3 d = normalize(FWD + (RGT * nd.x + UPV * nd.y) * TANH);
  vec3 sk = skyRad(d);
  float lum = dot(sk, vec3(.25, .65, .1));
  vec2 hz = normalize(d.xz + vec2(1e-7, 0.));
  float A = 0.; vec3 oc = vec3(0.), add = vec3(0.);
  // the Sky trait (SKYK.x): 1 high cirrus, 2 an overcast lid with a gap, 4 noctilucent cloud, 5 a far storm; 3 is ground mist
  float ccov = 0.;
  float ck = SKYK.x;
  if (ck > .5 && ck != 3. && d.y > -.02) {
    float e = max(d.y, 0.);
    vec2 sh = normalize(SUND.xz + vec2(1e-7, 0.)), dr = vec2(cos(SKYK.w), sin(SKYK.w));
    float cd = dot(hz, sh), az = exp(-(1. - cd) / GW);
    vec2 pc = d.xz / (e + (ck == 2. ? .012 : .025));
    vec2 q = ck == 1. ? vec2(dot(pc, dr) * .2, dot(pc, vec2(-dr.y, dr.x)) * 1.05) + TIME * .002
           : ck == 2. ? pc * .55 + TIME * .0015
           : ck == 4. ? vec2(dot(pc, dr) * .5, dot(pc, vec2(-dr.y, dr.x)) * 1.6)
           : vec2(dot(hz, vec2(-SKY2.w, SKY2.z)) * SKY2.x, e) / max(SKYK.y * .8, .01) * 1.1;
    float n = fb4(q + SKYK.w * 3.);
    vec3 cc = sk;
    if (ck == 1.) {
      ccov = smoothstep(.5, .74, n) * smoothstep(.0, .05, e) * smoothstep(.25, .6, nf(pc * .05 + 2.)) * .8;
      float fwd = pow(max(cd, 0.), 5.) * exp(-e / .2);
      cc = sk * (.38 + .7 * fwd) + vec3(1., .46, .36) * lum * 5. * SKYK.z * az * exp(-e / .06);
      cc = mix(cc, sk * 1.1, smoothstep(.12, .42, e));   // high up, against the dark, a faint paler veil, never a dark smear
    } else if (ck == 2.) {
      float eb = SKYK.y + .03 * (nf(hz * 5. + 3.) - .5) + .012 * (n - .5);
      ccov = smoothstep(eb - .004, eb + .018, e) * (.9 + .1 * n);
      cc = sk * (.16 + .1 * n) + LZT * GAMP * vec3(1., .5, .28) * .02 * az * (.6 + .8 * n) * exp(-max(e - eb, 0.) / .05);
    } else if (ck == 4.) {
      float rp = .5 + .5 * sin(dot(pc, vec2(dr.y, -dr.x)) * 11. + n * 14.), bl = smoothstep(.42, .75, n) * (.45 + .55 * rp);
      float w = smoothstep(.0, .3, cd) * smoothstep(.045, .09, e) * smoothstep(.26, .11, e) * SKYK.z;
      add = tmap(sk * EXPO + vec3(.12, .42, 1.) * sk.b * 1.3 * bl * w * EXPO) - tmap(sk * EXPO);
      ccov = 0.;
    } else {
      // a far storm: a low dark bank along the horizon, its top heaped in turrets that rise toward one massed head, its
      // base lost in rain and haze; lit warm only along its crest on the afterglow side; lightning flickers inside it.
      // x and Y in units of its height, x positive away from the ger
      float xr = dot(hz, vec2(-SKY2.w, SKY2.z)), Hs = SKYK.y * .8, x = xr * SKY2.x / Hs, Y = e / Hs, fz = dot(hz, SKY2.zw), pw = PA / Hs;
      float b2 = nf(vec2(x, Y) * 2.4 + 7.), b3 = nf(vec2(x, Y) * 6.5 + 3.);
      float env = smoothstep(-1.4, .2, x) * smoothstep(7.5, 2.5, x);
      // the crest heaped in turrets: rows of rounded heads with cusps between them, big ones and small ones on them
      float k1 = x * 1.7 + 2. * n, k2 = x * 4.6 + 3. * b2, t1 = 0., t2 = 0.;
      for (int j = -1; j < 2; j++) {
        float c1 = floor(k1) + float(j), f1 = (k1 - c1 - .5) / .62, c2 = floor(k2) + float(j), f2 = (k2 - c2 - .5) / .62;
        t1 = max(t1, (.45 + .55 * hf(uint(int(c1) + 5000) * 7919u)) * sqrt(max(1. - f1 * f1, 0.)));
        t2 = max(t2, (.4 + .6 * hf(uint(int(c2) + 5000) * 3343u)) * sqrt(max(1. - f2 * f2, 0.)));
      }
      float hd = smoothstep(-.7, .4, x) * smoothstep(2.9, 1.5, x);
      float top = env * (.3 + .75 * hd + .2 * (n - .5) + (.2 + .12 * hd) * t1 + .1 * t2);
      float sdf = top - Y - .03 * env;
      float thin = smoothstep(-.02, .14, sdf);
      ccov = smoothstep(-pw * 1.5, pw * 1.5, sdf) * (.72 + .28 * thin) * step(0., fz) * smoothstep(-.1, .45, Y) * .96;
      float sgn = sign(dot(sh, vec2(-SKY2.w, SKY2.z)) + 1e-4), xs = xr * sgn;
      float rim = smoothstep(.18, 0., sdf) * (.5 + .5 * smoothstep(-.1, .1, xs)) * (.4 + .8 * b3);
      cc = min(mix(vec3(dot(SKYUP, vec3(.3, .5, .2))), SKYUP, .3), sk * .5) * (.4 + .2 * n + .16 * b3) * (.75 + .25 * smoothstep(0., 1., Y))
         + vec3(1., .52, .38) * lum * .3 * rim * (.3 + .7 * smoothstep(-.4, 1., cd));
      float rain = smoothstep(.35, .75, nf(vec2(x * 5., Y * .4) + 9.)) * smoothstep(.4, .05, Y) * env;
      cc = mix(cc, sk * .6, .5 * exp(-Y / .12)) * (1. - .25 * rain);
      float fl = SKY2.y * exp(-sq((x - 1.5 - SKYK.z * 40.) / .9) - sq((Y - .4) / .35)) * smoothstep(.0, .15, sdf) * (.25 + b3 * b3 + b2);
      cc += vec3(.72, .78, 1.) * (lum * 2.5 + .002) * fl;
    }
    A = ccov;
    oc = tmap(cc * EXPO);
  }
  float vis = 1. - farLand(d, hz).x;
  if (A * vis < .002 && dot(add, add) < 1e-7) discard;
  o = vec4((oc * A + add) * vis, A * vis);
}`,Oo=Z+st+ft+Et+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aI;
layout(location=2) in vec4 aO;
out vec4 vC;
vec2 arcP(float th0, float K, float L, float s) {
  float k = abs(K) < 1e-3 ? 1e-3 : K, a1 = th0 + k * s;
  return L * vec2(cos(th0) - cos(a1), sin(a1) - sin(th0)) / k;
}
void main() {
  float cr = cos(GRS.w), sr = sin(GRS.w);
  vec2 b = vec2(cr * aI.x - sr * aI.y, sr * aI.x + cr * aI.y);
  vec2 ld = vec2(cr * aO.x - sr * aO.y, sr * aO.x + cr * aO.y);
  float sd = aI.w, tr = aO.z, rr = aO.w, s = aV.x;
  float kind = tr < GRS.x ? 1. : tr < GRS.y ? 0. : 2.;
  bool culm = kind == 1. && rr < .42 && length(b - CAM.xz) > 1.4 - u[43].w;
  float L = aI.z * GRS.z * (kind == 1. ? (culm ? 2.1 + u[43].w : 1.5) : kind == 2. ? .55 : 1.);
  if (culm) ld = ld * .35 + normalize(ld + 1e-4) * .08;
  float ru = rut(b);
  L *= 1. - .75 * smoothstep(.3, .7, ru);
  float by = H(b) - .015;
  vec2 wp = b - WIND.xy * WIND.w;
  float g1 = nf(wp * (1. / 5.5) + 3.), g2 = nf(wp * (1. / 1.7) + 9.);
  float flex = kind == 2. ? .3 : culm ? 1.25 : .8;
  float wb = (WIND.z * (.12 + 1.15 * smoothstep(.35, .8, g1) + .35 * (g2 - .5)) + (.03 + .07 * WIND.z) * sin(TIME * (1.6 + 2. * fract(sd * 13.)) + sd * 40.)) * flex;
  vec2 B = ld + WIND.xy * wb;
  vec2 tq = b - u[41].xy; float tq2 = dot(tq, tq), ta = max(TIME - u[41].z, 0.);
  B += tq * inversesqrt(tq2 + .004) * u[41].w * exp(-tq2 / .3) * exp(-ta * 1.3) * cos(ta * 6.5) * smoothstep(0., .08, ta) * 1.25;
  float th0 = min(length(B), 1.35); vec2 dh = B / max(length(B), 1e-4);
  float K = kind == 1. ? (culm ? .18 + .3 * fract(sd * 11.) : .5 + .7 * fract(sd * 7.)) : kind == 2. ? .6 : .7 + 1.1 * fract(sd * 7.);
  vec2 a; float ang, fc = .55;
  if (culm) {
    vec2 c1 = arcP(th0, K, L * fc, min(s / fc, 1.));
    float thA = th0 + K, Ka = .45 + .8 * fract(sd * 3.3) + .4 * wb;
    a = c1 + arcP(thA, Ka, L * (1. - fc), max(s - fc, 0.) / (1. - fc));
    ang = s < fc ? th0 + K * s / fc : thA + Ka * (s - fc) / (1. - fc);
  } else { a = arcP(th0, K, L, s); ang = th0 + K * s; }
  vec3 P = vec3(b.x + dh.x * a.x, by + a.y, b.y + dh.y * a.x);
  vec3 tg = normalize(vec3(dh.x * sin(ang), cos(ang), dh.y * sin(ang)));
  vec3 te = CAM - P; float dist = length(te); vec3 V = te / dist;
  vec3 Wd = normalize(cross(tg, V) + 1e-5);
  bool awn = culm && s > fc;
  float w0 = awn ? .0036 * sin(3.1416 * min((s - fc) / (1. - fc) * .9 + .1, 1.)) + .0003 : culm ? .0011 : kind == 2. ? .005 * (1. - s * .6) : .0015 * (1. - pow(s, 1.5)) + .0002;
  float wd = max(w0, dist * PA * .85);
  P += Wd * aV.y * wd * .5;
  gl_Position = VP * vec4(P, 1.);
  vec3 N = normalize(cross(Wd, tg)); N = dot(N, V) < 0. ? -N : N;
  float r1 = fract(sd * 5.7);
  vec3 alb = kind == 2. ? vec3(.5, .53, .47) : kind == 1. ? vec3(.3, .32, .23) : vec3(.26, .29, .2);
  alb = mix(alb, vec3(.5, .46, .34), smoothstep(.35, 1., s) * (kind == 2. ? 0. : .8));
  if (!culm && fract(rr * 7.3) < .28) alb = vec3(.46, .41, .3);
  if (culm) alb = awn ? vec3(.76, .76, .72) : vec3(.36, .33, .24);
  alb = mix(alb, vec3(dot(alb, vec3(.3, .5, .2))), .25);
  alb *= .75 + .5 * r1;
  float fs = pow(max(dot(-V, LG), 0.), 4.);
  float trn = awn ? 2.8 : kind == 2. ? .5 : culm ? 1.2 : 1.;
  float occ = .3 + .7 * smoothstep(0., .55, s * (aI.z * GRS.z / .3));
  vec3 E = (SKYUP * (.65 + .6 * max(N.y, 0.)) + keyL(N) * .7 + GLC * GLI * fs * trn + doorL(P, N) * .8) * occ;
  vec3 col = alb * (E + MFLASH * vec3(.75, .9, 1.) * .5);
  vC = vec4(tmap(col * EXPO), clamp(w0 / wd, 0., 1.) * (awn ? .8 : 1.) * (L > .003 ? 1. : 0.));
}`,Wo=Z+"in vec4 vC; out vec4 o; void main() { o = vC; }",Yo=Z+st+ft+`
layout(location=0) in vec2 aQ;
layout(location=1) in vec4 aA;
layout(location=2) in vec4 aB;
layout(location=3) in vec4 aC;
layout(location=4) in vec4 aD;
out vec3 vW; flat out vec4 vA; flat out vec4 vB; flat out vec4 vC; flat out vec4 vD;
void main() {
  vec3 tc = aA.xyz - CAM; float D = length(tc); tc /= D;
  vec3 rx = normalize(cross(tc, vec3(0., 1., 0.))), ry = cross(rx, tc);
  float nr = max(D - aA.w * 1.05, .2);
  float hs = aA.w * 1.1 * nr / sqrt(max(D * D - aA.w * aA.w, 1e-3));
  vW = CAM + tc * nr + (rx * aQ.x + ry * aQ.y) * hs;
  vA = aA; vB = aB; vC = aC; vD = aD;
  gl_Position = VP * vec4(vW, 1.);
}`,ro=`
float sdBox(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float sdE(vec3 p, vec3 r) { float k0 = length(p / r), k1 = length(p / (r * r)); return k0 * (k0 - 1.) / max(k1, 1e-6); }
float sdC(vec3 p, vec3 a, vec3 b, float ra, float rb) { vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h) - mix(ra, rb, h); }
float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.) / k; return min(a, b) - h * h * k * .25; }
vec3 toL(vec3 w, vec3 o, float a) { vec3 d = w - o; return vec3(dot(d.xz, vec2(sin(a), cos(a))), d.y, dot(d.xz, vec2(cos(a), -sin(a)))); }
vec3 toW(vec3 l, float a) { return vec3(l.x * sin(a) + l.z * cos(a), l.y, l.x * cos(a) - l.z * sin(a)); }
`,Vo=Z+st+ft+Et+ro+`
in vec3 vW; flat in vec4 vA; flat in vec4 vB; flat in vec4 vC; flat in vec4 vD;
out vec4 o;
float KIND, LEAF;
float ger(vec3 p) {
  float r = length(p.xz);
  float d = max(r - 3. - .03 * sin(p.y * 2.03), max(-p.y - .2, p.y - 1.56));
  float s = clamp((p.y - 1.5) / 1.22, 0., 1.);
  float rr = mix(3.14, .62, s) - .12 * sin(3.1416 * s);
  d = min(d, max((r - rr) * .43, max(1.5 - p.y, p.y - 2.72)));
  d = min(d, max(abs(r - .55) - .08, abs(p.y - 2.74) - .05));
  vec2 pc = p.xz - vec2(-.15, .1);
  d = min(d, max(length(pc) - .07, abs(p.y - 3.1) - .42));
  d = min(d, max(length(pc) - .12, abs(p.y - 3.53) - .025));
  vec3 q = p - vec3(3.01, .7, 0.);
  d = min(d, max(sdBox(q, vec3(.09, .71, .5)), -sdBox(q - vec3(.05, -.06, 0.), vec3(.1, .66, .39))));
  vec3 hq = p - vec3(3.1, .67, -.42);
  vec2 e = vec2(sin(LEAF), cos(LEAF));
  d = min(d, sdBox(vec3(dot(hq.xz, e) - .4, hq.y, dot(hq.xz, vec2(e.y, -e.x))), vec3(.4, .63, .025)));
  vec2 pr = vec2(cos(.8) * p.x + sin(.8) * p.z, -sin(.8) * p.x + cos(.8) * p.z);
  vec3 pq = vec3(pr.x - 3.24, p.y - .42, pr.y);
  pq.xy = vec2(cos(.42) * pq.x + sin(.42) * pq.y, -sin(.42) * pq.x + cos(.42) * pq.y);
  d = min(d, sdBox(pq, vec3(.018, .45, .5)));
  return d;
}
float hitch(vec3 p) {
  float d = sdC(p, vec3(0.), vec3(.03, 1.25, .02), .07, .055);
  d = min(d, sdC(p, vec3(4., 0., 0.), vec3(3.96, 1.2, -.03), .065, .055));
  float x = clamp(p.x, 0., 4.);
  d = min(d, length(vec2(p.y - 1.12 + .2 * (1. - sq((x - 2.) / 2.)), p.z)) + max(max(-p.x, p.x - 4.), 0.) - .014);
  // a saddle thrown over the rail, its felt hanging both sides (the motorbike went: at its size it read as a toy)
  vec3 sp = p - vec3(1.3, 0., 0.);
  d = min(d, sdE(sp - vec3(0., 1.0, 0.), vec3(.27, .09, .19)));
  d = min(d, sdE(sp - vec3(-.2, 1.09, 0.), vec3(.05, .09, .09)));
  d = min(d, sdE(sp - vec3(.21, 1.07, 0.), vec3(.05, .07, .1)));
  d = min(d, sdBox(sp - vec3(0., .8, 0.), vec3(.22, .17, .09)) - .02);
  return d;
}
float map(vec3 p) { return KIND < .5 ? ger(p) : hitch(p); }
void main() {
  KIND = vB.x; LEAF = vB.z;
  vec3 rd = normalize(vW - CAM);
  float D = length(vA.xyz - CAM), R = vA.w;
  float t = max(D - R * 1.05, .1), te = D + R * 1.05, mr = 1e9, tm = t, ep = 0.;
  bool hit = false, nrm = false;
  vec3 p = vec3(0.), pn = vec3(0.), nl = vec3(0.);
  int k = 0, n4 = int(u[39].x), nmax = int(u[39].z);
  float al = 0.;
  for (int i = 0; i < nmax; i++) {
    vec3 e = .5773 * (2. * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.);
    p = nrm ? pn + e * ep : toL(CAM + rd * t, vC.xyz, vB.y);
    float d = map(p);
    if (nrm) { nl += e * d; k++; if (k >= n4) break; continue; }
    float px = PA * t, rt = d / px;
    if (rt < mr) { mr = rt; tm = t; }
    bool stop = d < px * .2;
    hit = stop;
    t += max(d * .85, px * .4);
    if (stop || t > te) {
      al = hit ? 1. : clamp(.6 - mr, 0., 1.);
      if (al < .01) break;
      nrm = true; pn = toL(CAM + rd * tm, vC.xyz, vB.y); ep = max(PA * tm * .6, .004);
    }
  }
  if (al < .01) discard;
  vec3 W = CAM + rd * tm; p = pn;
  nl = normalize(nl);
  vec3 N = toW(nl, vB.y);
  vec3 alb = vec3(.7);
  vec3 em = vec3(0.);
  float spec = 0.;
  if (KIND < .5) {
    float r = length(p.xz), an = at2(p.z, p.x);
    bool door = p.x > 2.7 && abs(p.z) < .39 && p.y < 1.29 && p.y > -.03 && r < 3.06;
    vec3 hq = p - vec3(3.1, .67, -.42);
    vec2 e = vec2(sin(LEAF), cos(LEAF));
    float leaf = sdBox(vec3(dot(hq.xz, e) - .4, hq.y, dot(hq.xz, vec2(e.y, -e.x))), vec3(.4, .63, .025));
    float frame = sdBox(p - vec3(3.01, .7, 0.), vec3(.09, .71, .5));
    vec2 pr = vec2(cos(.8) * p.x + sin(.8) * p.z, -sin(.8) * p.x + cos(.8) * p.z);
    float panel = abs(pr.y) < .52 && pr.x > 3.0 && p.y < .9 && r > 3.02 ? 1. : 0.;
    if (door) {
      float lat = sq(sin((p.z + p.y) * 22.)) * sq(sin((p.z - p.y) * 22.));
      em = FIRECOL * FIRE.w * .42 * (.1 + .16 * smoothstep(1.25, .1, p.y) * (.8 + .2 * cos(p.z * 6.))) * (1. - .5 * lat) * (1. - .45 * exp(-sq(p.y - .98) / .002)) + vec3(1., .72, .3) * FIRE.w * .1 * exp(-sq(p.z + .1) / .004 - sq(p.y - .3) / .006);
      alb = vec3(0.);
    } else if (leaf < ep * 2.) {
      alb = vec3(.62, .22, .05) * (.85 + .3 * nf(p.yz * 9.));
      alb = mix(alb, vec3(.12, .25, .45), step(.82, fract(p.y * 4.)) * .5);
    } else if (frame < ep * 2. && r > 2.95) {
      alb = vec3(.55, .2, .05) * (.8 + .3 * nf(p.yz * 14.));
    } else if (panel > .5) {
      alb = vec3(.02, .025, .04); spec = 1.;
    } else if (p.y > 2.6 && r < .75) {
      alb = vec3(.05, .045, .04);
    } else if (p.y > 1.5) {
      float s = clamp((p.y - 1.5) / 1.22, 0., 1.);
      alb = vec3(.76, .75, .7) * (.92 + .08 * nf(vec2(an * 30., s * 10.)));
      alb = mix(alb, vec3(.12, .16, .26), step(s, .07) * .85);
      alb *= 1. - .45 * smoothstep(.06, .0, abs(fract(an * 8. / 6.2831853 + .5) - .5) * r);
      alb *= 1. - .3 * smoothstep(.85, 1., s);
    } else {
      alb = vec3(.74, .72, .66) * (.9 + .1 * nf(vec2(an * 70., p.y * 2.))) * (1. - .06 * sq(sin(an * 19.)) * smoothstep(.6, 1.5, p.y));
      alb *= mix(vec3(.62, .58, .5), vec3(1.), smoothstep(.0, .45, p.y + .15 * nf(vec2(an * 25., 3.))));
      float rope = max(max(exp(-sq((p.y - .3) / .035)), exp(-sq((p.y - .82) / .035))), exp(-sq((p.y - 1.33) / .035)));
      alb = mix(alb, vec3(.16, .14, .12), rope * .8);
      alb *= mix(.55, 1., smoothstep(-.05, .3, p.y));
    }
  } else {
    bool post = p.y > -.1 && (length(p.xz) < .12 || length(p.xz - vec2(4., 0.)) < .12);
    alb = post ? vec3(.24, .19, .14) * (.7 + .5 * nf(p.xy * vec2(8., 20.))) : vec3(.05, .05, .055);
    if (!post && abs(p.x - 1.3) < .32 && p.y > .58) alb = p.y < .96 ? mix(vec3(.2, .07, .045), vec3(.1, .13, .2), step(.6, p.y) * step(p.y, .65)) * (.8 + .3 * nf(p.xy * 30.)) : vec3(.13, .08, .05);
  }
  vec3 V = -rd;
  vec3 E = SKYUP * (.55 + .45 * N.y) + keyL(N) + doorL(W, N) * (KIND < .5 ? 1. : 1.4);
  E += MFLASH * vec3(.75, .9, 1.) * (.5 + .5 * N.y);
  E += vec3(.05, .045, .035) * SKYUP * max(-N.y, 0.);
  vec3 col = alb * E;
  if (spec > 0.) { vec3 rf = reflect(rd, N); col += spec * ((SKYUP * .6 + GLC * GLI * 2. * pow(max(dot(rf, LG), 0.), 6.)) * (rf.y > 0. ? .3 : .03) + FIRECOL * FIRE.w * .02 * pow(max(dot(rf, normalize(FIRE.xyz - W)), 0.), 40.)); }
  col += em;
  float fs = pow(max(dot(rd, LG), 0.), 3.);
  col += GLC * GLI * .5 * fs * pow(1. - max(dot(N, V), 0.), 4.);
  col = mix(col, mistC(rd), mistA(W.y, length(W - CAM), 0.));
  vec4 cp = VP * vec4(W, 1.);
  gl_FragDepth = cp.z / cp.w * .5 + .5;
  o = vec4(tmap(col * EXPO), al);
}`,Xo=Z+st+ft+Et+ro+`
in vec3 vW; flat in vec4 vA; flat in vec4 vB; flat in vec4 vC; flat in vec4 vD;
out vec4 o;
float HU, GP, SA, TS, HS, HOB;
float horse(vec3 p) {
  float d = sdE(p - vec3(-.02, .98, 0.), vec3(.62, .27, .25));
  d = smin(d, sdE(p - vec3(.42, 1.0, 0.), vec3(.3, .32, .22)), .14);
  d = smin(d, sdE(p - vec3(-.5, 1.04, 0.), vec3(.32, .3, .25)), .14);
  vec3 W = vec3(.5, 1.2, 0.);
  vec3 Pl = mix(vec3(1.0, .36, HS * .18), vec3(.95, 1.6, HS * .22), HU);
  vec3 Mz = mix(vec3(1.13, .05, HS * .25), vec3(1.26, 1.33, HS * .3), HU);
  d = smin(d, sdC(p, W, Pl, .19, .1), .1);
  d = smin(d, sdC(p, W + vec3(-.06, .13, 0.), Pl + vec3(-.08, .09, 0.), .06, .04), .05);
  d = smin(d, sdC(p, Pl, Mz, .1, .065), .05);
  vec3 ear = Pl + mix(vec3(-.02, .1, 0.), vec3(-.04, .13, 0.), HU);
  d = min(d, sdC(vec3(p.x, p.y, abs(p.z - Pl.z) + Pl.z), Pl + vec3(0., .02, .04), ear + vec3(0., 0., .06), .03, .01));
  for (int i = 0; i < 4 + int(u[40].x); i++) {
    float fi = float(i);
    float side = mod(fi, 2.) < .5 ? -1. : 1.;
    bool fr = i < 2;
    float ph = fi * 1.5708 + (fr ? 0. : 3.1416);
    float sw = SA * sin(GP + (HOB > .5 && fr ? 0. : ph));
    float lift = max(cos(GP + (HOB > .5 && fr ? 0. : ph)), 0.) * .1 * SA;
    float z = side * (fr && HOB > .5 ? .07 : .13);
    vec3 top = fr ? vec3(.44, .9, z) : vec3(-.52, .92, z);
    vec3 kn = fr ? vec3(.47 + .28 * sw, .46 + lift * .5, z) : vec3(-.68 + .2 * sw, .5 + lift * .5, z);
    vec3 hf2 = fr ? vec3(.46 + .45 * sw, .03 + lift, z) : vec3(-.58 + .42 * sw, .03 + lift, z);
    d = smin(d, sdC(p, top, kn, fr ? .085 : .1, .05), .06);
    d = min(d, sdC(p, kn, hf2, .042, .036));
  }
  vec3 t0 = vec3(-.8, 1.12, 0.), t1 = vec3(-.95, .8, TS * .18), t2 = vec3(-.92, .42, TS * .34);
  d = smin(d, sdC(p, t0, t1, .07, .06), .05);
  d = min(d, sdC(p, t1, t2, .06, .075));
  return d;
}
void main() {
  HU = vB.y; GP = vB.z; SA = vB.w; TS = vC.w; HS = vD.w; HOB = vD.z;
  float SC = vD.x;
  vec3 rd = normalize(vW - CAM);
  float D = length(vA.xyz - CAM), R = vA.w;
  float t = max(D - R * 1.05, .1), te = D + R * 1.05, mr = 1e9, tm = t, ep = 0.;
  bool hit = false, nrm = false;
  vec3 p = vec3(0.), pn = vec3(0.), nl = vec3(0.);
  int k = 0, n4 = int(u[39].x), nmax = int(u[39].w);
  float al = 0.;
  for (int i = 0; i < nmax; i++) {
    vec3 e = .5773 * (2. * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.);
    p = nrm ? pn + e * ep : toL(CAM + rd * t, vC.xyz, vB.x) / SC;
    float d = horse(p) * SC;
    if (nrm) { nl += e * d; k++; if (k >= n4) break; continue; }
    float px = PA * t, rt = d / px;
    if (rt < mr) { mr = rt; tm = t; }
    bool stop = d < px * .2;
    hit = stop;
    t += max(d * .85, px * .4);
    if (stop || t > te) {
      al = hit ? 1. : clamp(.6 - mr, 0., 1.);
      if (al < .01) break;
      nrm = true; pn = toL(CAM + rd * tm, vC.xyz, vB.x) / SC; ep = max(PA * tm * .6 / SC, .01);
    }
  }
  if (al < .01) discard;
  vec3 W = CAM + rd * tm; p = pn;
  nl = normalize(nl);
  vec3 N = toW(nl, vB.x), V = -rd;
  vec3 coat = vD.y < .5 ? vec3(.07, .045, .03) : vD.y < 1.5 ? vec3(.16, .08, .04) : vD.y < 2.5 ? vec3(.25, .2, .13) : vec3(.55, .54, .5);
  coat *= mix(.6, 1., smoothstep(.1, .5, p.y));
  vec3 E = SKYUP * (.45 + .55 * max(N.y, 0.)) + keyL(N) + doorL(W, N) + MFLASH * vec3(.75, .9, 1.) * (.5 + .5 * N.y);
  vec3 col = coat * E;
  float fs = pow(max(dot(rd, LG), 0.), 2.);
  col += GLC * GLI * (.3 + .4 * vD.y / 3.) * fs * pow(1. - max(dot(N, V), 0.), 3.);
  col = mix(col, mistC(rd), mistA(W.y, length(W - CAM), 0.));
  vec4 cp = VP * vec4(W, 1.);
  gl_FragDepth = cp.z / cp.w * .5 + .5;
  o = vec4(tmap(col * EXPO), al);
}`,Qo=Z+st+ft+`
layout(location=0) in vec2 aQ;
out vec2 vQ; out vec3 vW;
void main() {
  vec3 rh = normalize(vec3(RGT.x, 0., RGT.z));
  vQ = vec2(aQ.x * 26., (aQ.y * .5 + .5) * 10.5 - .4);
  vW = SMK.xyz + rh * vQ.x + vec3(0., vQ.y, 0.);
  gl_Position = VP * vec4(vW, 1.);
}`,jo=Z+st+ft+Et+`
in vec2 vQ; in vec3 vW; out vec4 o;
void main() {
  vec3 rh = normalize(vec3(RGT.x, 0., RGT.z));
  float sx = dot(vec3(SMK2.x, 0., SMK2.y), rh), sd = sx < 0. ? -1. : 1., fsh = max(abs(sx), .3);
  float W = clamp(WIND.z + SMK2.z * .6, 0., 1.);
  float yL = mix(SMK2.w, .9, smoothstep(.06, .5, max(WIND.z - 1.5 * SMK2.z, 0.))), xs = .35 + 3.2 * W;
  float y = vQ.y;
  float xw = (nf(vec2(y * .9 - TIME * .55, 3.)) - .5) * (.12 + .25 * smoothstep(0., 2., y)) * (1. - .6 * W);
  float x = (vQ.x * sd - xw) / fsh;
  float yu = y + (nf(vec2(x * .12 - TIME * .06, 7.)) - .5) * .9 * smoothstep(1., 8., x);
  float yc = yL * (1. - exp(-max(x, 0.) / xs));
  float xc = -xs * log(max(1. - min(yu, yL * .999) / yL, 1e-3));
  float dy = yu - yc, dx = yu > yL * .97 ? 1e3 : x - xc;
  float dc = abs(dx * dy) * inversesqrt(dx * dx + dy * dy + 1e-4);
  dc = yu < 0. ? length(vec2(x, yu)) : dc;
  float sA = max(x, 0.) + clamp(yu, 0., yL);
  float wd = .05 + .045 * sA + .025 * W * sA;
  float tb = nf(vec2(dc * 1.4 / wd + 9., (sA - TIME * (.5 + W * 1.6)) * 1.3 / (1. + sA * .05)));
  float tb2 = nf(vec2(dc * 3. / wd + 31., (sA - TIME * (.6 + W * 1.6)) * 3.2 / (1. + sA * .03)));
  float puff = u[42].y * exp(-sq(sA - (TIME - u[42].x) * 1.3) / 1.4) * exp(-(TIME - u[42].x) / 9.) * step(u[42].x, TIME);
  float den = exp(-sq(dc / wd) * 1.2) * (.45 + .9 * tb * (.55 + .7 * tb2)) * (1. + 1.8 * puff) / (1. + sA * .045);
  den *= mix(1., smoothstep(.35, .75, tb2 * .6 + tb * .5), smoothstep(.15, .5, W) * smoothstep(1., 6., sA));
  den *= smoothstep(-.05, .2, y) * (1. - smoothstep(16., 34., sA));
  vec3 rd = normalize(vW - CAM);
  float fs = pow(max(dot(rd, LG), 0.), 3.);
  vec3 c = SKYUP * .62 + GLC * GLI * (.2 + 1.8 * fs);
  float a = clamp(den * SMK.w * .42, 0., .5);
  if (a < .003) discard;
  o = vec4(tmap(c * EXPO), a);
}`,Zo=Z+st+ft+`
uniform sampler2D uS;
out vec4 o;
void main() {
  vec2 sz = vec2(2. * TANH / PA);
  vec2 uv = gl_FragCoord.xy / sz;
  vec3 c = texelFetch(uS, ivec2(gl_FragCoord.xy), 0).rgb;
  vec2 v = uv - .5;
  c *= 1. - .15 * dot(v, v);
  float hd = length(uv - FIN.xy);
  c += vec3(1., .55, .22) * FIN.z * .5 * exp(-hd / FIN.w);
  uint s = uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u;
  float g = hf(s) + hf(s ^ 0x55u) - 1.;
  float l = dot(c, vec3(.3, .6, .1));
  c += g * (TILE > 0. ? .004 : .0093) * (.35 + .65 * (1. - l)) * (.6 + .4 * smoothstep(0., .15, l));
  o = vec4(c, 1.);
}`,io=[[11.062,61.75,1.79,1.07],[11.031,56.38,2.37,-.02],[11.897,53.69,2.44,.04],[12.257,57.03,3.31,.08],[12.9,55.96,1.77,-.02],[13.399,54.93,2.23,.02],[13.42,54.99,4,.16],[13.792,49.31,1.86,-.19],[2.53,89.26,1.98,.6],[14.261,19.18,-.05,1.23],[18.616,38.78,.03,0],[20.69,45.28,1.25,.09],[19.846,8.87,.77,.22],[16.49,-26.43,1.06,1.83],[13.42,-11.16,.97,-.23],[17.56,-37.1,1.62,-.22],[17.622,-43,1.86,.4],[18.403,-34.38,1.85,-.03],[18.921,-26.3,2.05,-.13],[18.35,-29.83,2.7,1.38],[18.466,-25.42,2.81,1.02],[19.043,-29.88,2.6,.08],[16.006,-22.62,2.29,-.12],[16.091,-19.81,2.62,-.07],[17.512,-37.3,2.7,-.22],[17.582,12.56,2.08,.15],[16.836,-34.29,2.29,1.15],[18.229,-21.06,3.86,1.1],[17.708,-39.03,2.41,.51],[17.793,-40.13,3.03,-.18],[16.354,-25.59,2.89,.13],[16.598,-28.22,2.82,-.2],[15.578,26.71,2.23,-.02],[17.244,14.39,3.1,1.16],[19.512,27.96,3.05,1.13],[20.37,40.26,2.23,.67],[19.749,45.13,2.86,-.03],[20.77,33.97,2.48,1.03],[18.982,32.69,3.24,-.05],[16.619,-10.57,2.56,.02],[5.278,46,.08,.8],[10.139,11.97,1.35,-.11],[11.818,14.57,2.13,.09],[.14,29.09,2.06,-.11],[.675,56.54,2.24,1.17],[.153,59.15,2.28,.34],[.945,60.72,2.15,-.15],[1.43,60.24,2.68,.13],[3.405,49.86,1.79,.48],[21.736,9.88,2.39,1.52],[3.136,40.96,2.12,-.05],[14.845,74.16,2.08,1.47],[14.75,27.07,2.37,.97],[13.91,18.4,2.68,.58],[17.943,51.49,2.24,1.52],[17.507,52.3,2.79,.98],[7.755,28.03,1.14,1],[7.577,31.89,1.58,.03],[7.655,5.22,.34,.42],[9.46,-8.66,1.98,1.44]],fo=t=>{const e=Math.max(-.3,Math.min(1.9,t));return[Math.min(1.25,.82+.3*(e+.3)),.86+.14*Math.cos((e-.45)*1.6),Math.max(.48,1.22-.4*(e+.3))]},Jo=[[-.0548755604,-.8734370902,-.4838350155],[.4941094279,-.44482963,.7469822445],[-.867666149,-.1980763734,.4559837762]],ne=(t,e)=>{const c=t*15*p,A=e*p;return[Math.cos(A)*Math.cos(c),Math.cos(A)*Math.sin(c),Math.sin(A)]},qe=t=>{const e=t*15*p,c=Math.cos(e),A=Math.sin(e),g=Math.sin(Ht),k=Math.cos(Ht),J=[0,k,-g],K=[-1,0,0];return[[c*J[0]+A*K[0],c*J[1]+A*K[1],c*J[2]+A*K[2]],[A*J[0]-c*K[0],A*J[1]-c*K[1],A*J[2]-c*K[2]],[0,g,k]]},Wt=(t,e)=>[t[0][0]*e[0]+t[1][0]*e[1]+t[2][0]*e[2],t[0][1]*e[0]+t[1][1]*e[1]+t[2][1]*e[2],t[0][2]*e[0]+t[1][2]*e[1]+t[2][2]*e[2]],lo=(t,e)=>[t[0][0]*e[0]+t[0][1]*e[1]+t[0][2]*e[2],t[1][0]*e[0]+t[1][1]*e[1]+t[1][2]*e[2],t[2][0]*e[0]+t[2][1]*e[1]+t[2][2]*e[2]],lt=t=>{const e=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/e,t[1]/e,t[2]/e]},$o=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],re=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],ct=(t,e,c)=>Math.max(e,Math.min(c,t)),wt=(t,e,c)=>{const A=ct((c-t)/(e-t),0,1);return A*A*(3-2*A)},_a=t=>{const e=(t-Re)*15*p;return Math.asin(Math.sin(Ht)*Math.sin(Ot)+Math.cos(Ht)*Math.cos(Ot)*Math.cos(e))/p},ta=t=>{const e=(Math.sin(t*p)-Math.sin(Ht)*Math.sin(Ot))/(Math.cos(Ht)*Math.cos(Ot));return Re+Math.acos(ct(e,-1,1))/p/15},vo=(t,e)=>{if(e.P.cld)return;const c=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(c,Ho),t.compileShader(c);const A=t.createProgram();t.attachShader(A,e.P.sky.vs),t.attachShader(A,c),t.linkProgram(A),t.flush(),e.P.cld={p:A,fs:c,ok:!1}},ea=(t,e)=>{vo(t,e);const c=e.P.cld;if(c.ok)return;if(!t.getProgramParameter(c.p,t.LINK_STATUS))throw new Error("556 cld: "+t.getProgramInfoLog(c.p)+t.getShaderInfoLog(c.fs));const A=t.getUniformBlockIndex(c.p,"UB");A!==t.INVALID_INDEX&&t.uniformBlockBinding(c.p,A,0),t.useProgram(c.p);const g=t.getUniformLocation(c.p,"uN");g&&t.uniform1i(g,0),c.ok=!0};function oa(t){if(t.__c556)return t.__c556;const e=[performance.now()],c=[],A=!!t.getExtension("EXT_color_buffer_float");t.getExtension("KHR_parallel_shader_compile");const g=(n,M)=>{const R=t.createShader(n);return t.shaderSource(R,M),t.compileShader(R),R},k=g(t.VERTEX_SHADER,Go),J=g(t.VERTEX_SHADER,Yo),K={mw:[k,Uo],ter:[qo,go],sky:[k,Ko],grs:[Oo,Wo],obj:[J,Vo],hrs:[J,Xo],smk:[Qo,jo],fin:[k,Zo]},nt={};for(const n in K){const[M,R]=K[n],w=t.createProgram(),y=typeof M=="string"?g(t.VERTEX_SHADER,M):M,F=g(t.FRAGMENT_SHADER,R);t.attachShader(w,y),t.attachShader(w,F),t.linkProgram(w),nt[n]={p:w,vs:y,fs:F}}t.flush(),e.push(performance.now());let m=305441741;const v=()=>{m=m+1831565813|0;let n=Math.imul(m^m>>>15,1|m);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296},L=new Uint8Array(65536);for(let n=0;n<65536;n++)L[n]=Math.floor(v()*256);const ht=170,u=384,Le=new Float32Array(ht*u*2);for(let n=0;n<ht;n++){const M=n===0?0:.22*Math.pow(27272.727272727272,(n-1)/(ht-2));for(let R=0;R<u;R++)Le[(n*u+R)*2]=M,Le[(n*u+R)*2+1]=R/u}const pt=new Uint16Array((ht-1)*u*6);let D=0;for(let n=0;n<ht-1;n++)for(let M=0;M<u;M++){const R=n*u+M,w=n*u+(M+1)%u,y=R+u,F=w+u;pt[D++]=R,pt[D++]=y,pt[D++]=w,pt[D++]=w,pt[D++]=y,pt[D++]=F}const rt=14.5,Pt=.34,Yt=48,z=[];for(let n=0;n<=Yt;n++)z.push([]);for(let n=-rt;n<rt;n+=Pt)for(let M=-rt;M<rt;M+=Pt){const R=n+v()*Pt,w=M+v()*Pt,y=Math.hypot(R,w);if(y>rt||y<.5||v()>(y<6?.8:.8-.5*(y-6)/(rt-6)))continue;const F=v(),P=.03+.08*Math.pow(v(),1.5),Dt=8+Math.floor(P/.11*22*(.6+.8*v())),zt=.7+.6*v();let it=Math.atan2(R,w);it<0&&(it+=Y);const _t=y<3?0:1+Math.min(Yt-1,Math.floor(it/Y*Yt));for(let Pe=0;Pe<Dt;Pe++){const pe=Math.sqrt(v())*P,b=v()*Y,me=.12+.75*(pe/P)*(.4+.6*v());z[_t].push(R+Math.sin(b)*pe,w+Math.cos(b)*pe,(.16+.2*v())*zt,v(),Math.sin(b)*me,Math.cos(b)*me,F,v())}}const Nt=z.reduce((n,M)=>n+M.length/8,0),tt=new Float32Array(Nt*8),dt=[],ie=[];let _=0;for(const n of z)dt.push(_),ie.push(n.length/8),tt.set(n,_*8),_+=n.length/8;const B=6,Vt=[];for(let n=0;n<=B;n++)Vt.push(n/B,-1,n/B,1);const Xt=new Float32Array(64*5*4);io.forEach((n,M)=>{const R=ne(n[0],n[1]),w=fo(n[3]);Xt.set([R[0],R[1],R[2],n[2]],M*4),Xt.set([w[0],w[1],w[2],0],(64+M)*4)}),e.push(performance.now());for(const n in nt){const M=nt[n].p,R=t.getProgramParameter(M,t.LINK_STATUS);if(c.push(n+" "+(performance.now()-e[0]).toFixed(0)),!R)throw new Error("556 "+n+": "+t.getProgramInfoLog(M)+t.getShaderInfoLog(nt[n].fs)+(nt[n].vs?t.getShaderInfoLog(nt[n].vs):""));const w=t.getUniformBlockIndex(M,"UB");w!==t.INVALID_INDEX&&t.uniformBlockBinding(M,w,0),t.useProgram(M);for(const[y,F]of[["uN",0],["uMW",1],["uD",2],["uS",3]]){const P=t.getUniformLocation(M,y);P&&t.uniform1i(P,F)}nt[n].uRes=t.getUniformLocation(M,"uRes")}const et=(n,M,R,w,y,F,P,Dt,zt)=>{const it=t.createTexture();return t.bindTexture(t.TEXTURE_2D,it),t.texImage2D(t.TEXTURE_2D,0,R,n,M,0,w,y,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,P),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,P),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,Dt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,zt),it};t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.bindBuffer(t.PIXEL_UNPACK_BUFFER,null);const mt=et(256,256,t.R8,t.RED,t.UNSIGNED_BYTE,L,t.LINEAR,t.REPEAT,t.REPEAT),Se=et(64,5,t.RGBA32F,t.RGBA,t.FLOAT,Xt,t.NEAREST,t.CLAMP_TO_EDGE,t.CLAMP_TO_EDGE),fe=2048,Rt=384,xt=et(fe,Rt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),Tt=(n,M,R)=>{const w=t.createBuffer();return t.bindBuffer(n,w),t.bufferData(n,M,R||t.STATIC_DRAW),w},le=t.createVertexArray(),de=t.createVertexArray();t.bindVertexArray(de),Tt(t.ARRAY_BUFFER,Le),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),Tt(t.ELEMENT_ARRAY_BUFFER,pt);const Qt=t.createVertexArray();t.bindVertexArray(Qt),Tt(t.ARRAY_BUFFER,new Float32Array(Vt)),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0);const ve=Tt(t.ARRAY_BUFFER,tt);t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(2,1);const jt=Tt(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1])),he=n=>{const M=t.createVertexArray();t.bindVertexArray(M),t.bindBuffer(t.ARRAY_BUFFER,jt),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0);const R=Tt(t.ARRAY_BUFFER,new Float32Array(n*16),t.DYNAMIC_DRAW);for(let w=0;w<4;w++)t.enableVertexAttribArray(1+w),t.vertexAttribPointer(1+w,4,t.FLOAT,!1,64,w*16),t.vertexAttribDivisor(1+w,1);return{v:M,b:R}},xe=he(2),H=he(12),O=t.createVertexArray();t.bindVertexArray(O),t.bindBuffer(t.ARRAY_BUFFER,jt),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),t.bindVertexArray(null);const $=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,$),t.bufferData(t.UNIFORM_BUFFER,52*16,t.DYNAMIC_DRAW);const It=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,It),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,xt,0),t.viewport(0,0,fe,Rt),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.useProgram(nt.mw.p),t.uniform2f(nt.mw.uRes,fe,Rt),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,mt),t.bindVertexArray(le),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(It),co&&console.warn("556 make: submit "+(e[1]-e[0]).toFixed(0)+" bake "+(e[2]-e[1]).toFixed(0)+" links "+c.join(", ")+" mw "+(performance.now()-e[0]).toFixed(0));const kt=io.map(n=>({q:ne(n[0],n[1]),m:n[2],c:fo(n[3])})),G={P:nt,fl:A,nd:L,bright:kt,tN:mt,tD:Se,tMW:xt,vEmpty:le,vTer:de,nTer:pt.length,vGrs:Qt,gBuf:ve,nGrsV:(B+1)*2,bStart:dt,bCount:ie,NSEC:Yt,qObj:xe,qHrs:H,vSmk:O,ubo:$,rts:{}};return t.__c556=G,G}const aa=(t,e,c)=>{if(e.rts[c])return e.rts[c];const A=t.createTexture();t.bindTexture(t.TEXTURE_2D,A),e.fl?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,c,c,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,c,c,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const g=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,g),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,c,c);const k=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,k),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,A,0),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,g),t.bindFramebuffer(t.FRAMEBUFFER,null),e.rts[c]={t:A,fb:k}};so.add({num:556,name:"Steppe Night",fam:"Vistas",recipe:"Out in the feather grass of the steppe on a June evening, with a white ger, its door open on the firelight, stove smoke drifting and horses grazing in the afterglow. The stars come out brightest first and the Milky Way climbs out of the east. The sky, the moon and the herd change every mint. Tap the grass to part it or tap the ger to feed the stove, drag to send a gust through the grass, or hold to run the night on.",interactive:"Tap the grass to part it with your hand, or tap the ger to feed the stove; drag to send a gust across the grass and lean the smoke; hold to run the night on.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,c=oa(e),A=t.size,g=aa(e,c,A),k=!!t.home,J=t.hash.slice(2).padEnd(64,"0"),K=o=>{let s=parseInt(J.slice(0,8),16)^o,r=parseInt(J.slice(8,16),16),a=parseInt(J.slice(16,24),16)^o*7,f=parseInt(J.slice(24,32),16);const d=()=>{s|=0,r|=0,a|=0,f|=0;const x=(s+r|0)+f|0;return f=f+1|0,s=r^r>>>9,r=a+(a<<3)|0,a=a<<21|a>>>11,a=a+x|0,(x>>>0)/4294967296};for(let x=0;x<12;x++)d();return d},nt=K(1366),m=K(40503),v=K(20973),L=K(31292),ht=L(),u=k||ht<.46?0:ht<.66?1:ht<.82?2:ht<.94?3:4,Le=["","Hearth","Horizon","Herd","Herd"][u],pt=["",", at the door",", from a rise above the camp",", grazing round you",", through a long lens"][u],D=K(11133),rt=D(),Pt=D(),Yt=D();let z=k||rt<.58?0:rt<.71?1:rt<.81?3:rt<.89?5:rt<.97?2:4;const Nt=!k&&Yt<.08;let tt=k||u===4||Pt<.65?0:Pt<.85?1:u===0?2:0;z===4&&(tt=0),Nt&&u!==4&&(tt=1);const dt=K(27679),ie=dt(),_=[dt(),dt(),dt(),dt(),dt(),dt()];let B=k||u!==0?0:ie<.3?1:ie<.6?2:0;const Vt={},Xt={Meteors:1,Hearth:1};Nt&&(Vt.Moon=["Full moon rising",0,2]),B===2&&(Xt.Horizon=1);const et=(o,s,r)=>{let a=0;for(const x of s)a+=x[1];let f=nt()*a,d=s[s.length-1];for(const x of s)if(f-=x[1],f<0){d=x;break}return k&&(d=s[r]),Vt[o]&&(d=Vt[o]),Xt[o]||t.trait(o,d[0]),d[2]},mt=et("Hour",[["Blue hour",2,-9.5],["Nautical dusk",4,-12.5],["Last light",3,-15.5],["Short night",1,-19]],1),Se=et("Herd",[["Five horses",4,5],["Three horses",2,3],["Nine horses",3,9],["Mare and foal",1,-6]],0),fe=et("Moon",[["None",7,0],["Thin crescent",3,1]],1),Rt=et("Wind",[["Still",3,.04],["Light breeze",4,.2],["Steady wind",2,.45]],1),xt=et("Grass",[["Feather grass",5,0],["Short fescue",3,1],["Tall feather grass",1,2]],0);B===1&&xt===1&&(B=0);const Tt=et("Horizon",[["Low far range",5,1],["Open steppe",3,0],["High range",1,2]],0),le=et("Far lights",[["None",4,0],["A neighbour's ger",4,1],["Ger and a rider's lamp",1,2]],1),de=et("Meteors",[["Sporadic",7,0],["June Bootids",2,1]],0),Qt=et("Hearth",[["Banked fire",3,.65],["Warm fire",5,1],["Stoked",1,1.5]],1);t.trait("Sky",["Clear","High cirrus","Overcast with a gap","Ground mist","Noctilucent cloud","Far storm"][z]),B===2&&t.trait("Horizon","Under the ridge"),t.trait("Looking",(B===1?"Lying in the grass":[["Into the afterglow","Into the east","Along the track"][tt],"At the door","From a rise above the camp","Among the herd","Long lens on the skyline"][u])+((u>0||B===1)&&tt===1?", into the east":""));const ve=ta(mt),jt=qe(ve),he=Wt(jt,ne(Re,Ot/p)),xe=Math.atan2(he[0],he[2]),H=xe-(9+m()*5)*p+(tt===1?Math.PI+(D()-.5)*.35:0),O=u===4?Math.tan(12.5*p):Te,$=o=>[Math.sin(o),Math.cos(o)],It=c.nd,kt=(o,s)=>{const r=Math.floor(o),a=Math.floor(s);let f=o-r,d=s-a;f=f*f*(3-2*f),d=d*d*(3-2*d);const x=r&255,E=a&255,T=x+1&255,N=E+1&255,X=It[E*256+x]/255,W=It[E*256+T]/255,Q=It[N*256+x]/255,yt=It[N*256+T]/255,I=X+(W-X)*f,h=Q+(yt-Q)*f;return I+(h-I)*d},G=[m()*200,m()*200,m()*200,m()*200],n=(o,s)=>26*(kt(o/4100+G[1]*.37,s/4100+G[0]*.37)-.5)+24*(kt(o/880+G[0],s/880+G[1])-.5)+7*(kt(o/230+G[2],s/230+G[3])-.5)+1.1*(kt(o/53+G[3],s/53+G[2])-.5)+.14*(kt(o/8.5+G[0],s/8.5+G[3])-.5),[M,R]=$(H+(15+m()*6)*p),w=78+m()*14,y=[M*w,R*w,2.4+m()*.8,1/(46*46)],F=[y[0],y[1]];if(u===2){const o=62+L()*14,[s,r]=$(H+Math.PI+(L()-.5)*.5);y[0]=s*o*.7,y[1]=r*o*.7,y[2]=20+L()*6,y[3]=1/(o*o)}const P=[0,0],Dt=_[0]<.5?-1:1;if(B===2){const o=(tt===2?H-5*p:H)+Dt*(12+_[1]*14)*p,s=250+_[2]*170,[r,a]=$(o),f=s*.4,d=f*(2.2+_[4]);y[0]=r*s,y[1]=a*s,y[2]=Math.min(90,s*(.22+.1*_[3])),y[3]=1/(f*f);const x=$(o+Math.PI/2+(_[5]-.5)*.5),E=Math.sqrt(1-(f/d)**2);P[0]=x[0]*E,P[1]=x[1]*E}const zt=H-(12+m()*4)*p+[0,-(7+L()*5),3+L()*3,0,0][u]*p,it=m(),_t=[38+it*6,13.5+it*2.5,82+it*24,38+it*6,38+it*6][u],[Pe,pe]=$(zt),b=[Pe*_t,0,pe*_t];if(B===2&&(F[0]=y[0]-P[0]*60*Dt,F[1]=y[1]-P[1]*60*Dt),u===2){const[o,s]=$(zt+(5+L()*5)*p);F[0]=o*(_t+6),F[1]=s*(_t+6)}if(u===3){const[o,s]=$(H+(8+L()*10)*p);F[0]=o*54,F[1]=s*54}const me=(o,s)=>y[2]*Math.exp(-((o-y[0])**2+(s-y[1])**2-((o-y[0])*P[0]+(s-y[1])*P[1])**2)*y[3])+11*(1-Math.exp(-(o*o+s*s)*16e-7)),Bt=[n(b[0],b[2])+me(b[0],b[2]),0,0,0],ho=(o,s)=>{const r=n(o,s)+me(o,s),a=(o-b[0])**2+(s-b[2])**2,f=Math.exp(-a/70);return r+(Bt[0]-r)*f};Bt[1]=ho(0,0);const Zt=(o,s)=>ho(o,s)-Bt[1];b[1]=Bt[0]-Bt[1];const sa=Math.atan2(-b[0],-b[2]),Ct=sa+((u===1?24:36)+m()*8)*p,[Gt,Ut]=$(Ct),ot=[b[0]+Gt*3.25,b[1]+.62,b[2]+Ut*3.25],ca=1.75+m()*.35,Jt=[Math.cos(H),-Math.sin(H)],ut=[b[0]+Gt*5.4-Jt[0]*1.6,0,b[2]+Ut*5.4-Jt[1]*1.6];ut[1]=Zt(ut[0],ut[2]);const ge=H+Math.PI/2+(m()-.5)*.4,xo=3.4*Jt[0]-b[0]-Gt*4,po=3.4*Jt[1]-b[2]-Ut*4,mo=Math.hypot(xo,po),Ft=[b[0]+Gt*4,b[2]+Ut*4,xo/mo,po/mo],ue=[(m()-.5)*2,(m()-.5)*40,0,1],Ke=Math.abs(Se),na=Se<0,vt=[];for(let o=0;o<Ke;o++){let s=H+(4+m()*34)*p,r=62+m()*48;if(u===2&&(s=zt+(-3+L()*19)*p,r=_t+(L()-.4)*46),u===3&&(s=H+(o%3===2?150+L()*120:-30+L()*80)*p,r=44+30*Math.pow(L(),1.3)),B===2){const f=(dt()-.5)*1.6/Math.sqrt(y[3]),d=F[0]+P[0]*f,x=F[1]+P[1]*f;s=Math.atan2(d,x),r=Math.hypot(d,x)}const a={x:Math.sin(s)*r,z:Math.cos(s)*r,hd:m()*Y,hu:m()<.25?1:0,huT:0,gp:m()*Y,sa:0,walk:0,tm:1+m()*6,sw:0,swT:-10,swA:0,sc:.95+m()*.12,coat:m()<.08?3:Math.floor(m()*3),hob:0,hs:0,hsP:m()*9,look:0};a.huT=a.hu,vt.push(a)}if(Ke>2&&(vt[1].hob=1),na){const o=vt[0],s=vt[Ke-1];s.sc=.62,s.x=o.x+2.6,s.z=o.z+1.2,s.coat=2}k&&(vt[0].coat=3,vt[0].hd=H+Math.PI*.55);let V=H+[0,-3-L()*3,4+L()*4,2+L()*6,15+L()*6][u]*p,$t=[7.5,6,3,9,3.2][u]*p;if(tt===2){V=zt+(7+D()*5)*p,$t=3.6*p;const o=.7*Jt[0]-Ft[0],s=.7*Jt[1]-Ft[1],r=Math.hypot(o,s);Ft[2]=o/r,Ft[3]=s/r,ue[0]*=.3}let uo=Co;if(B===1)uo=.25,$t=(25+_[3]*9)*p,V+=(_[4]-.5)*.5;else if(B===2)$t=(2+_[3]*2)*p;else if(!k){const o=tt===1||mt===-19||z===4||z===2||u===0&&(mt===-15.5||z===1&&mt===-9.5),s=!o&&u===0&&xt!==1&&_[3]<.55&&(tt===0&&mt>-13||xt===2||Rt>.4);let r=o?[.78,.78,.66,.78,.72][u]+.07*_[2]:s?.33+.07*_[2]:0;!r&&u!==2&&(r=mt>-14&&z!==5&&(u===1||xt!==1)&&_[5]<[.66,.58,0,.58,.45][u]?[.3,.34,0,.32,.38][u]+.08*_[1]:[.71,.72,0,.72,.74][u]+.07*_[1]),r&&($t=Math.atan((2*r-1)*O))}const Ne=[Math.cos(V),-Math.sin(V)],Ie=[[0,19,0,0],[.03,19,m()*50,m()*50],[.055,15,m()*50,m()*50]][Tt],ke=[[.27,.27,.19,.5],[.22,.24,.16,.8],[.3,.29,.2,.4]][xt],te=[[.45,.85,1,0],[.06,.8,.7,0],[.72,.9,1.25,0]][xt].slice();te[3]=m()*Y;const ra=[.35,.15,.5][xt];let be=null;if(Nt){const o=xe+Math.PI+(D()-.5)*.3,s=(2.6+D()*2)*p;be=lo(jt,[Math.sin(o)*Math.cos(s),Math.sin(s),Math.cos(o)*Math.cos(s)])}else if(fe){const o=xe-(20+m()*8)*p,s=(8+m()*3)*p;be=lo(jt,[Math.sin(o)*Math.cos(s),Math.sin(s),Math.cos(o)*Math.cos(s)])}const ia=V-(5+m()*30*.6)*p*O/Te,qt=2600+m()*1800,fa=V+(6+m()*60*.28)*p*O/Te,gt=4200+m()*900,bo=de?ne(14.93,48):null,He=H+(60+m()*70)*p*(m()<.5?1:-1),la=3.2+v()*2.6,da=z===2?.045+D()*.04:z===5?.1+D()*.04:0,va=D()*Y,ha=D()<.5?-1:1,De=Math.atan2(b[0],b[2])-V,Oe=Math.sin(De)<0?1:k?ha:-1;let ye=V+Oe*(9+D()*14)*p*O/Te;if(u!==4){const o=Math.atan2(Math.sin(ye-V-De),Math.cos(ye-V-De));Math.abs(o)<22*p&&(ye=V+De+Oe*22*p)}const xa=u===2?b[1]+.4:.42;let We=0,yo=0,Ao=1+v()*3,_e=0;const ee=new Float32Array(52*4),Ae=new Float32Array(4*3*4),Be=new Float32Array(64*2*4),Mo=new Float32Array(12*16),Ye=new Float32Array(2*16);let Ce=ve,Kt=0,Me=0,Eo=0,Ve=0,oe=0;const S={dx:-Math.sin(He),dz:-Math.cos(He),g:0,travel:0},bt=[],wo=()=>de?15+v()*35:40+v()*110;let Ro=wo()*(.3+.7*v()),To=9+v()*20,Xe=0,C=null,pa=0,Qe=0,je=-99,Ze=0;const Lt=[0,0,-99,0],Je=new Float32Array(7e3);{let o=0,s=0;for(let r=0;r<Je.length;r++){const a=r/11025,f=Math.exp(-zo((a-.08)/.05))*.5+Math.exp(-zo((a-.36)/.14))*(.8+.2*Math.sin(a*150)),x=(v()*2-1)*f+1.6*o*.93-.86*s;s=o,o=x,Je[r]=x*.25*(.6+.4*Math.sin(a*Y*24))}}function zo(o){return o*o}const l={e:[0,0,0],f:[0,0,1],r:[1,0,0],u:[0,1,0],yaw:V,pitch:$t,off:0},U=new Float32Array(16),ma=()=>{const o=t.view||Bo,s=V+(o.yaw||0),r=ct($t+(o.pitch||0),-1.45,1.45),a=[Math.sin(s)*Math.cos(r),Math.sin(r),Math.cos(s)*Math.cos(r)],f=lt([a[2],0,-a[0]]),d=$o(a,f),x=ct(o.x||0,-4,4),E=ct(o.z||0,-4,4),T=Ne[0]*x+Math.sin(V)*E,N=Ne[1]*x+Math.cos(V)*E,X=Zt(T,N)+Math.max(.25,uo+ct(o.y||0,-.55,1.5));l.e=[T,X,N],l.f=a,l.r=f,l.u=d,l.yaw=s,l.pitch=r,l.off=Math.hypot(x,E);const W=1/O,Q=(Fe+ze)/(ze-Fe),yt=2*Fe*ze/(ze-Fe),I=[f,d,[-a[0],-a[1],-a[2]]],h=I.map(q=>-re(q,l.e));for(let q=0;q<4;q++){const j=q<3?[I[0][q],I[1][q],I[2][q],0]:[h[0],h[1],h[2],1];U[q*4]=W*j[0],U[q*4+1]=W*j[1],U[q*4+2]=Q*j[2]+yt*j[3],U[q*4+3]=-j[2]}},Fo=o=>{const s=U[0]*o[0]+U[4]*o[1]+U[8]*o[2]+U[12],r=U[1]*o[0]+U[5]*o[1]+U[9]*o[2]+U[13],a=U[3]*o[0]+U[7]*o[1]+U[11]*o[2]+U[15];return a>.01?[s/a*.5+.5,.5-r/a*.5]:null},ua=(o,s,r)=>{let a;if(bo)a=Wt(qe(Ce),bo);else{const Q=v()*Y;a=lt([o[0]+Math.sin(Q)*1.4,o[1]+.6+v(),o[2]+Math.cos(Q)*1.4])}const f=ct(re(a,o),-.99,.99);let d=lt([o[0]-a[0]*f,o[1]-a[1]*f,o[2]-a[2]*f]);const x=lt([-a[0]*Math.sqrt(1-f*f)+d[0]*f,-a[1]*Math.sqrt(1-f*f)+d[1]*f,-a[2]*Math.sqrt(1-f*f)+d[2]*f]),E=(8+v()*14)*p*(.6+.5*s),T=E*.4,N=lt([o[0]*Math.cos(T)-x[0]*Math.sin(T),o[1]*Math.cos(T)-x[1]*Math.sin(T),o[2]*Math.cos(T)-x[2]*Math.sin(T)]),X=re(N,o),W=lt([o[0]-N[0]*X,o[1]-N[1]*X,o[2]-N[2]*X]);bt.length>=4&&bt.shift(),bt.push({a:N,b:W,t0:r,len:E,br:s,dur:.35+.5*v()*(.5+s)}),t.sound&&t.sound.note(88+Math.floor(v()*6),{dur:1.2,vel:.05+.06*s,wave:"sine",pan:ct(re(o,l.r)*1.4,-1,1)})},ba=()=>{const o=l.yaw+(v()-.5)*1.6,s=(15+v()*45)*p;return[Math.sin(o)*Math.cos(s),Math.sin(s),Math.cos(o)*Math.cos(s)]},ya=(o,s)=>{const r=1-.8*Me;for(const a of vt){if(a.tm-=o,a.tm<0){const d=v();d<.14*r?(a.huT=1,a.walk=0,a.tm=2+v()*4):d<.55*r?(a.huT=0,a.walk=1.2+v()*3,a.hd+=(v()-.5)*1.2,a.tm=a.walk+2+v()*5):(a.huT=Me>.5?.35:0,a.tm=3+v()*7),v()<.6&&(a.swT=s,a.swA=(v()<.5?-1:1)*(.6+v()*.6))}a.look>0&&(a.look-=o,a.huT=1,a.walk=0);const f=a.walk>0?1:0;if(a.walk=Math.max(0,a.walk-o),a.sa+=((f?.32:0)-a.sa)*Math.min(1,o*3),a.sa>.02){a.gp+=o*Y*(a.hob?.9:1.1);const d=(a.hob?.3*Math.max(0,Math.sin(a.gp))*2:.55)*a.sa/.32;if(Math.hypot(a.x-F[0],a.z-F[1])>32&&(a.hd+=(Math.atan2(F[0]-a.x,F[1]-a.z)-a.hd>0?1:-1)*o*.4),u===3&&Math.hypot(a.x,a.z)<38){const E=Math.atan2(a.x,a.z)-a.hd;a.hd+=(Math.sin(E)>0?1:-1)*o*.8}a.x+=Math.sin(a.hd)*d*o*a.sc,a.z+=Math.cos(a.hd)*d*o*a.sc}a.hu+=ct(a.huT-a.hu,-o*.9,o*.9),a.hs=Math.sin(s*.45+a.hsP)*(1-a.hu)*.6+Math.sin(s*.23+a.hsP*2)*.3}S.g*=Math.exp(-o/3.2),Kt+=((oe>0?1:0)-Kt)*o*(oe>0?.35:.05),Me+=((oe>0?1:Me*.999)-Me)*o*.3},Lo=o=>{ma();const s=qe(Ce),r=Wt(s,ne(Re,Ot/p)),a=Math.asin(ct(r[1],-1,1))/p,f=-a,d=4e-5,x=Math.exp(.9*(a+6)),E=ct(3+.6*(f-4),3,16),T=Math.min(.3,.035+.2*Math.exp(-(f-6)*.16)),N=.03+.24*Math.exp((a+6)*.28),X=x*.31+d*.55,W=N/X,Q=lt([r[0],0,r[2]]),yt=Rt+S.g*.9;let I=0;const h=(i,at,St,ce)=>{ee[I++]=i,ee[I++]=at,ee[I++]=St,ee[I++]=ce},q=2*O/A;h(l.e[0],l.e[1],l.e[2],O),h(l.f[0],l.f[1],l.f[2],q),h(l.r[0],l.r[1],l.r[2],o),h(l.u[0],l.u[1],l.u[2],W),h(r[0],r[1],r[2],a),h(x,E,T,d);const j=Jo.map(i=>[i[0]*s[0][0]+i[1]*s[1][0]+i[2]*s[2][0],i[0]*s[0][1]+i[1]*s[1][1]+i[2]*s[2][1],i[0]*s[0][2]+i[1]*s[1][2]+i[2]*s[2][2]]);h(s[0][0],s[0][1],s[0][2],7.3),h(s[1][0],s[1][1],s[1][2],1.25),h(s[2][0],s[2][1],s[2][2],.5),h(j[0][0],j[0][1],j[0][2],A<=300?1:0);let Ee=0;const Ea=Math.cos(64*p);Be.fill(0);for(const i of c.bright){const at=Wt(s,i.q);at[1]>-.03&&re(at,l.f)>Ea&&Ee<64&&(Be.set([i.q[0],i.q[1],i.q[2],i.m],Ee*4),Be.set([i.c[0],i.c[1],i.c[2],0],(64+Ee)*4),Ee++)}h(j[1][0],j[1][1],j[1][2],Ee),h(j[2][0],j[2][1],j[2][2],bt.length),h(S.dx,S.dz,yt,S.travel);const $e=o-je,wa=$e>0?Ze*wt(0,.6,$e)*Math.exp(-$e/3):0,Po=(.9+.08*Math.sin(o*7.3)+.05*Math.sin(o*13.1+1)+.04*Math.sin(o*2.3))*Qt*(1+.7*Kt+.9*wa),Ra=.2*Po*Math.pow(120/W,.42);h(ot[0],ot[1],ot[2],Ra),h(Gt,0,Ut,.39),h(1,.4-.05*Kt,.1-.03*Kt,0);const Ta=1+1.6*wt(13.5,18.5,f),At=[0,1,2].map(i=>(x*([.15,.29,.8][i]*.9+[1,.6,.35][i]*E*T*.25)+d*[.45,.55,.8][i]*1.8)*Ta),ae=z===2?.7:1;h(At[0]*ae,At[1]*ae,At[2]*ae,.42);const to=lt([Q[0],.07,Q[2]]),Ge=x*E*T*.6;if(h(to[0],to[1],to[2],Ge),h(1,.56,.3,ra),h(b[0],b[1],b[2],Ct),be){const i=Wt(s,be);h(i[0],i[1],i[2],1)}else h(0,1,0,0);const[No,Io]=$(ia),za=Zt(No*qt,Io*qt)+2.5-qt*qt/12742e3-l.e[1],eo=lt([No*qt-l.e[0],za,Io*qt-l.e[2]]);h(eo[0],eo[1],eo[2],le>0?.9:0);const Fa=fa+Math.sin(o*.011)*.18,[ko,Do]=$(Fa),La=Zt(ko*gt,Do*gt)+1.2-gt*gt/12742e3-l.e[1],oo=lt([ko*gt-l.e[0],La,Do*gt-l.e[2]]);h(oo[0],oo[1],oo[2],le>1?1.1*(.75+.25*Math.sin(o*1.7)):0),h(qt,gt,9e3,A<=300?2:3),h(G[0],G[1],G[2],G[3]),h(y[0],y[1],y[2],y[3]),h(Bt[0],Bt[1],P[0],P[1]),h(te[0],te[1],te[2],te[3]),h(b[0]-.15*Math.sin(Ct)+.1*Math.cos(Ct),b[1]+3.55,b[2]-.15*Math.cos(Ct)-.1*Math.sin(Ct),(.55+.45*Qt)*(1+Kt));const[Sa,Pa]=$(He),Ue=Math.min(1,yt*1.5);h(Sa*(1-Ue)+S.dx*Ue,Pa*(1-Ue)+S.dz*Ue,.6*S.g,la);for(let i=0;i<16;i++)ee[I++]=U[i];h(Ie[0],Ie[1],Ie[2],Ie[3]),h(ke[0],ke[1],ke[2],ke[3]),h(Ft[0],Ft[1],Ft[2],Ft[3]),h(ue[0],ue[1],ue[2],ue[3]),I=39*4,h(4,5,100,80),I=38*4;const we=Fo([ot[0]-Gt*.1,ot[1],ot[2]-Ut*.1]),Na=Math.max(0,-(Gt*(ot[0]-l.e[0])+Ut*(ot[2]-l.e[2]))/Math.hypot(ot[0]-l.e[0],ot[2]-l.e[2])),Ia=Math.hypot(ot[0]-l.e[0],ot[1]-l.e[1],ot[2]-l.e[2]);h(we?we[0]:-9,we?1-we[1]:-9,we?.05*Po*Na*Math.min(1,Math.pow(120/W,-.25)):0,Math.max(.0015,.3/(Ia*2*O))),I=48*4,h(At[0]*ae*1.6+Ge*.2,At[1]*ae*1.6+Ge*.12,At[2]*ae*1.6+Ge*.07,0),I=41*4,h(Lt[0],Lt[1],Lt[2],Lt[3]),h(je,Ze,0,0);const _o=Math.abs(l.pitch)>.75?Math.PI:Math.min(Math.PI,Math.atan(O*1.45)+.14);h(_o,_o>=Math.PI?1:.75,l.yaw,B===1?1.1:0);const ka=z===1?wt(13.5,9,f):z===4?wt(6,9,f)*wt(17.5,13,f):z===5?yo:0;h(z,da,ka,va),h(z===5?-Oe:xa,We*wt(10.5,13.5,f),Math.sin(ye),Math.cos(ye));let Mt=[0,0,0],se=[0,1,0];if(Nt){se=Wt(s,be);const i=Math.max(se[1],0)+.03;Mt=[.6,.85,1.3].map((St,ce)=>Math.exp(-.09/i*St)*[1,.93,.82][ce]*.0045*wt(-.01,.02,se[1]));const at=Math.min(1,1.8*(At[0]+At[1]+At[2])/(Mt[0]+Mt[1]+Mt[2]+1e-9));Mt=Mt.map(St=>St*at)}h(se[0],se[1],se[2],wt(13,8.5,f)*(tt===1?1:0)),h(Mt[0],Mt[1],Mt[2],Nt?1:0),Ae.fill(0),bt.forEach((i,at)=>{Ae.set([i.a[0],i.a[1],i.a[2],i.t0],at*4),Ae.set([i.b[0],i.b[1],i.b[2],i.len],(4+at)*4),Ae.set([i.br,i.dur,0,0],(8+at)*4)}),Ye.set([b[0],b[1]+1.6,b[2],4.2,0,Ct,ca,0,b[0],b[1],b[2],0,0,0,0,0],0);const ao=[ut[0]+Math.sin(ge)*1.2,ut[1]+.6,ut[2]+Math.cos(ge)*1.2];Ye.set([ao[0],ao[1],ao[2],3.3,1,ge,0,0,ut[0],ut[1],ut[2],0,0,0,0,0],16),vt.forEach((i,at)=>{const St=Zt(i.x,i.z)-.02,ce=i.hob&&i.sa>.02?Math.max(0,Math.sin(i.gp))*.08:0,Da=i.swA*Math.sin((o-i.swT)*5.5)*Math.exp(-(o-i.swT)*1.1)*(o>i.swT?1:0)+.08*Math.sin(o*.9+at);Mo.set([i.x+Math.sin(i.hd)*.1*i.sc,St+1*i.sc+ce,i.z+Math.cos(i.hd)*.1*i.sc,1.75*i.sc,i.hd,i.hu,i.gp,i.sa,i.x,St+ce,i.z,Da,i.sc,i.coat,i.hob,i.hs],at*16)})},So=()=>{e.bindFramebuffer(e.FRAMEBUFFER,g.fb),e.viewport(0,0,A,A),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindBuffer(e.UNIFORM_BUFFER,c.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,ee),e.bindBufferBase(e.UNIFORM_BUFFER,0,c.ubo),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,c.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,c.tMW),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,c.tD),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.bindBuffer(e.PIXEL_UNPACK_BUFFER,null),e.texSubImage2D(e.TEXTURE_2D,0,0,2,4,3,e.RGBA,e.FLOAT,Ae),e.texSubImage2D(e.TEXTURE_2D,0,0,0,64,2,e.RGBA,e.FLOAT,Be),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,null),e.clearColor(0,0,0,1),e.clearDepth(1),e.depthMask(!0),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.disable(e.BLEND),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.useProgram(c.P.ter.p),e.bindVertexArray(c.vTer),e.drawElements(e.TRIANGLES,c.nTer,e.UNSIGNED_SHORT,0),e.depthFunc(e.LEQUAL),e.depthMask(!1),e.useProgram(c.P.sky.p),e.bindVertexArray(c.vEmpty),e.drawArrays(e.TRIANGLES,0,3),z&&z!==3&&(ea(e,c),e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(c.P.cld.p),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND)),e.depthFunc(e.LESS),e.depthMask(!0),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(c.P.grs.p),e.bindVertexArray(c.vGrs),e.bindBuffer(e.ARRAY_BUFFER,c.gBuf);const o=c.NSEC,s=33*p+Y/o*.5+14*p,r=l.off>.3||Math.abs(l.pitch)>1.1||B===1,a=d=>{if(d===0||r)return!0;let E=((d-.5)/o*Y-te[3]-l.yaw)%Y;return E>Math.PI&&(E-=Y),E<-Math.PI&&(E+=Y),Math.abs(E)<s};let f=-1;for(let d=0;d<=o+1;d++){const x=d<=o&&a(d);if(x&&f<0&&(f=d),!x&&f>=0){const E=c.bStart[f],T=c.bStart[d-1]+c.bCount[d-1];T>E&&(e.vertexAttribPointer(1,4,e.FLOAT,!1,32,E*32),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,E*32+16),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,c.nGrsV,A<=300?Math.ceil((T-E)*.55):T-E)),f=-1}}e.useProgram(c.P.obj.p),e.bindVertexArray(c.qObj.v),e.bindBuffer(e.ARRAY_BUFFER,c.qObj.b),e.bufferSubData(e.ARRAY_BUFFER,0,Ye),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,2),e.useProgram(c.P.hrs.p),e.bindVertexArray(c.qHrs.v),e.bindBuffer(e.ARRAY_BUFFER,c.qHrs.b),e.bufferSubData(e.ARRAY_BUFFER,0,Mo),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,vt.length),e.depthMask(!1),e.useProgram(c.P.smk.p),e.bindVertexArray(c.vSmk),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,A,A),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.useProgram(c.P.fin.p),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,g.t),e.bindVertexArray(c.vEmpty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null),e.activeTexture(e.TEXTURE0)},Aa=(o,s)=>{s=ct(s||0,0,.25),pa++;const r=t.input;if(r&&r.down){C||(C={x:r.x,y:r.y,t:o,lx:r.x,ly:r.y,mode:0});const a=r.x-C.lx,f=r.y-C.ly;if(C.mode!==2&&Math.hypot(r.x-C.x,r.y-C.y)>.02&&(C.mode=1),C.mode===0&&o-C.t>.4&&(C.mode=2),C.mode===1&&s>0){const d=Math.hypot(a,f)/s;if(d>.02){const x=Ne[0]*a+Math.sin(l.yaw)*-f,E=Ne[1]*a+Math.cos(l.yaw)*-f,T=Math.hypot(x,E)||1,N=Math.min(1,s*4);S.dx+=(x/T-S.dx)*N,S.dz+=(E/T-S.dz)*N;const X=Math.hypot(S.dx,S.dz)||1;S.dx/=X,S.dz/=X,S.g=Math.min(1.2,Math.max(S.g,d*.9))}}oe=C.mode===2?1:0,C.lx=r.x,C.ly=r.y}else C&&(Qe=C.mode),C=null,oe=0;if(r&&r.taps){const a=r.taps(),f=Qe!==0;Qe=0;for(const d of f?[]:a){const x=d.x*2-1,E=1-d.y*2;let T=lt([l.f[0]+(l.r[0]*x+l.u[0]*E)*O,l.f[1]+(l.r[1]*x+l.u[1]*E)*O,l.f[2]+(l.r[2]*x+l.u[2]*E)*O]);const N=Fo([b[0],b[1]+1.4,b[2]]),X=Math.hypot(b[0]-l.e[0],b[2]-l.e[2]);if(N&&Math.hypot(N[0]-d.x,N[1]-d.y)<Math.max(.025,3.4/(X*2*O)))je=o,Ze=1;else if(T[1]<0){let W=.3,Q=null;for(let yt=0;yt<60&&W<18;yt++){const I=l.e[0]+T[0]*W,h=l.e[1]+T[1]*W,q=l.e[2]+T[2]*W;if(h<Zt(I,q)+.15){Q=[I,q];break}W*=1.08}Q&&(Lt[0]=Q[0],Lt[1]=Q[1],Lt[2]=o,Lt[3]=1,t.sound&&t.sound.hit("noise",.05,{cutoff:2400,dur:.35}))}}}if(Ce=Math.min(ve+4.5,Ce+s*(oe?.42:.006)),o>Ro){const a=ba(),f=v();ua(a,.25+.6*f*f+(v()<.08?.5:0),o),Ro=o+wo()}for(;bt.length&&o-bt[0].t0>bt[0].dur*4+.5;)bt.shift();if(Xe-=s,Xe<0&&t.sound){const a=Rt+S.g*.9;t.sound.hit("noise",.02+.1*a,{cutoff:260+900*a,dur:1.2}),Xe=.45+v()*.2}if(t.sound&&v()<s*(1.2+3*Kt)*Qt&&t.sound.hit("click",.015+.025*v()),o>To){t.sound&&t.sound.pcm(Je,11025,{vel:.2,pan:v()-.5});const a=vt[Math.floor(v()*vt.length)];a.look=2+v()*2,To=o+14+v()*30}for(z===5&&(We*=Math.exp(-s*12),o>Ao&&(We=.5+v(),_e<=0?(_e=Math.floor(v()*4),yo=(v()-.5)*.05):_e--,Ao=o+(_e>0?.08+v()*.3:2+12*v()*v()))),Ve+=s;Ve>=.05;)Ve-=.05,Eo+=.05,ya(.05,Eo);S.travel+=s*(1.6+4.5*(Rt+S.g*.9)),Lo(o),So()},Ma=performance.now();return Lo(0),So(),(!t.tile||z&&z!==3)&&vo(e,c),co&&(e.finish(),console.warn("556 first draw "+(performance.now()-Ma).toFixed(0))),Aa}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
