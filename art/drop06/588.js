// Midsummer Fire: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/588.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ra){ra&&function(){"use strict";const Ea={yaw:0,pitch:0,x:0,y:0,z:0},He=0,U=Math.PI*2,ct=Math.PI/180,Fo=61.2*ct,Eo=23.44*ct,ka=Math.tan(32.5*ct),Po=.08,Lo=2e4,bt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,At=`
layout(std140) uniform UB {
  mat4 uVP;
  vec4 uE;    // eye, time
  vec4 uSun;  // sun dir, sky brightness
  vec4 uF;    // flame light centre, light intensity
  vec4 uF2;   // fire base, fuel
  vec4 uW;    // wind dir xz, gust, base wind
  vec4 uR;    // camera right, size
  vec4 uU;    // camera up, radians per pixel
  vec4 uFw;   // camera forward, tan half fov
  vec4 uP;    // planet dir, brightness
  vec4 uSk;   // skerry offset xz, flare, burst time
  vec4 uX;    // n lights, mist, sky kind, exposure
  vec4 uY;    // pile height, flame height, embers, hour
  vec4 uV;    // sauna window pos, intensity
  vec4 uZ;    // overcast, wet rock, skerry turn and scale (cos, sin) / size
  vec4 uK;    // foreground: rain pools, plants in the joints, polish sheen, flame hidden inside the pile (0 for the tower)
};
`,ve=`
uniform sampler2D uN;
uniform float uZr;   // never set (0): loop bounds the compilers cannot fold
float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return texture(uN, (i + f + .5) / 256.).r; }
float fbm(vec2 p) { float s = 0., a = .5; int no = 4 + int(uZr); for (int i = 0; i < no; i++) { s += a * vn(p); p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(17.3, 9.1); a *= .5; } return s / .9375; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = 3.1415927 - a; return y < 0. ? -a : a; }
vec3 bb(float k) {
  vec3 c = vec3(1., .26, .04) * smoothstep(0., .35, k);
  c = mix(c, vec3(1., .58, .16) * 2.2, smoothstep(.3, .66, k));
  return mix(c, vec3(1., .86, .58) * 5., smoothstep(.62, .97, k));
}
`,oo=`
vec3 skyB(vec3 d) {
  vec3 s = uSun.xyz;
  float e = max(d.y, 0.);
  vec2 hd = d.xz / max(length(d.xz), 1e-4), sd = s.xz / max(length(s.xz), 1e-4);
  float ca = dot(hd, sd), w = ca * .5 + .5;
  float lift = clamp(s.y * 9. + .75, 0., 1.4);
  vec3 zen = vec3(.062, .118, .25);
  vec3 hor = mix(vec3(.12, .15, .25), vec3(.50, .48, .32), w * w);
  vec3 c = mix(hor, zen, smoothstep(0., 1., pow(e, .55) * 1.25));
  float sw = pow(w, 3.), hw = .045 + .05 * w + .05 * lift;
  c += vec3(1.25, .58, .23) * exp(-e / hw) * sw * (1.05 + .5 * lift);
  c += vec3(1.6, .72, .22) * exp(-e / (hw * .45)) * pow(max(ca, 0.), 16.) * (.8 + 1.6 * lift);
  c += vec3(.20, .07, .09) * exp(-pow((e - .11 - .04 * w) / .07, 2.)) * pow(w, 1.6);
  c += vec3(.03, .085, .06) * exp(-pow((e - .3) / .16, 2.)) * w;
  float aw = pow(1. - w, 2.);
  c = mix(c, vec3(.27, .19, .27), aw * exp(-pow((e - .085) / .055, 2.)) * .65);
  c = mix(c, vec3(.075, .085, .15), aw * exp(-e / .04) * .75);
  // grey overcast: a flat pewter lid, a little lighter in the north and toward the zenith
  c = mix(c, vec3(.15, .152, .16) * (.8 + .35 * e) + vec3(.05, .035, .02) * sw * exp(-e / .2), uZ.x * .9);
  return c * uSun.w;
}
vec3 skyIrr(vec3 n) {
  // one copy of skyB for both lookups
  vec3 a = vec3(0.), b = vec3(0.);
  for (int i = 0; i < 2 + int(uZr); i++) { vec3 v = skyB(i == 0 ? normalize(n + vec3(0., .55, 0.)) : normalize(vec3(n.x, .1 + .2 * max(n.y, 0.), n.z) + vec3(0., 1e-3, 0.))); if (i == 0) a = v; else b = v; }
  float up = n.y * .5 + .5;
  return 3. * mix(b, a, .55) * (.3 + .7 * up) + vec3(.015, .013, .012) * uSun.w * (1. - up);
}
// w wraps the light round a shoulder (.1765: the old .85 cos + .15)
vec3 fireL(vec3 P, vec3 n, float w) {
  vec3 L = uF.xyz - P; float d = length(L);
  vec3 r = vec3(1., .38, .1) * uF.w / (pow(d, 1.45) + 6.) * max((dot(n, L / d) + w) / (1. + w), 0.);
  vec3 W = uV.xyz - P; float dw = length(W);
  return r + vec3(1., .55, .22) * uV.w / (dw * dw + .6) * max(dot(n, W / dw), 0.);
}
`,Ta=`
vec3 sky(vec3 d, vec3 sb) {
  vec3 s = uSun.xyz, c = sb / uSun.w;
  float e = max(d.y, 0.);
  vec2 hd = d.xz / max(length(d.xz), 1e-4), sd = s.xz / max(length(s.xz), 1e-4);
  float w = dot(hd, sd) * .5 + .5, sw = pow(w, 3.);
  float kd = uX.z;
  if (kd > .5 && d.y > 0.) {
    vec2 q = d.xz / (d.y + .07), r = mat2(.8, .6, -.6, .8) * q;
    // one fbm call site for every cloud kind (each call site costs a compile on Windows)
    float f = fbm(kd < 1.5 ? vec2(r.x * .5, r.y * 3.2) + 11. : kd < 2.5 ? q * vec2(.9, .5) + 2. : q * .55 + vec2(3.1, 7.7));
    if (kd < 1.5) {
      f = f * .7 + vn(r * .9 + 3.) * .3;
      float dn = smoothstep(.5, .78, f) * smoothstep(0., .08, d.y) * (1. - smoothstep(.4, .95, d.y));
      vec3 lc = mix(vec3(.16, .15, .24), vec3(1.25, .62, .45), pow(w, 2.2)) * (1. + .8 * exp(-e / .15) * sw);
      c = mix(c, lc, dn * .8);
    } else if (kd > 2.5) {
      // overcast: a soft low cloud base; after rain: broken cloud lit rose from under in the north, blue holes between
      f = f * .75 + vn(q * 2.3 + 5.) * .25;
      if (kd < 3.5) c *= .82 + .36 * f;
      else {
        float cv = smoothstep(.42, .6, f) * smoothstep(0., .04, d.y);
        vec3 lc = mix(vec3(.05, .055, .075) + vec3(.05, .05, .07) * (1. - f), vec3(1.2, .52, .36) * (.5 + .7 * f), pow(w, 2.5) * exp(-e / .35));
        c = mix(c, lc, cv * .94);
      }
    } else {
      float f2 = vn(q * vec2(5., 2.4) + 7.) * .6 + vn(q * vec2(11., 5.)) * .4;
      float bil = pow(.5 + .5 * sin(dot(q, vec2(9., 4.)) * 3. + f * 7. + f2 * 4.), 6.) * .7 + .3 * f2;
      float mk = smoothstep(.02, .05, e) * (1. - smoothstep(.09, .2, e)) * pow(w, 6.) * smoothstep(.5, .72, f + .1);
      c += vec3(.42, .62, .98) * bil * mk * .4;
    }
  }
  c *= uSun.w;
  if (s.y > -.03) {
    float cs = dot(d, s);
    c += vec3(30., 15., 6.) * smoothstep(.99995, .99998, cs) * smoothstep(-.03, .0, s.y) + vec3(1.6, .7, .2) * pow(max(cs, 0.), 600.) * uSun.w;
  }
  float pd = length(d - uP.xyz), pw = max(uU.w * .75, .0003);
  c += vec3(1., .95, .86) * uP.w * (exp(-pd * pd / (pw * pw)) + .02 * exp(-pd / (pw * 5.)));
  return c;
}
`,Ra=bt+"out vec2 vQ; void main() { vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2) * 2. - 1.; vQ = p; gl_Position = vec4(p, 1., 1.); }",Aa=bt+At+ve+oo+Ta+`
uniform sampler2D uT, uRf, uL, uHm, uS;
in vec2 vQ; out vec4 o;
// the far shores: each layer a profile (top, distance, ground) for the envelope and the strip for the tree shapes in it
vec3 layers(vec3 c, float u, float y0, float r0, float m, vec3 hz, float pix, float pv, inout float dist) {
  vec4 H = texture(uT, vec2(u, .125)), D = texture(uT, vec2(u, .375)), G = texture(uT, vec2(u, .625)), U = texture(uT, vec2(u, .875));
  // the strip's three lookups (layers 1-3) before the loop, at each layer's own ray height (rows clamp at the ground)
  vec4 hy4 = y0 + m * (D - r0), v4 = (hy4 - G) / 48.;
  vec4 s1 = textureLod(uS, vec2(u, v4.y), 0.), s2 = textureLod(uS, vec2(u, v4.z), 0.), s3 = textureLod(uS, vec2(u, v4.w), 0.);
  vec4 SN = vec4(1., s1.r, s2.b, s3.a), SB = vec4(0., s1.g, 0., 0.);
  int nl = 4 + int(uZr);
  for (int i = 0; i < nl; i++) {
    // (n13) a near shore's image reaches its own foot: no hairline of sky reflected in the last two metres of water
    if (H.x > 0. && D.x > r0 + .1 + 1.9 * smoothstep(450., 700., D.x)) {
      float dd = D.x - r0, hy = y0 + m * dd, px = dd * pix;
      // a stand further than one already drawn solid here stays behind it (the narrow sound's sides reach past its main shore)
      float cov = clamp((H.x - hy) / (dd * pv) + .5, 0., 1.) * clamp((hy + .3) / px + .5, 0., 1.) * step(dd, dist + 1.);
      if (cov > 0.) {
        // the trees from the strip, the undergrowth (and the back rank's band) from their per-column tops
        float hr = hy - G.x, ua = i == 1 ? U.x : i == 2 ? U.z : U.w;
        float cn = hr < 0. ? 1. : max(SN.x, clamp((ua - hr) / px + .5, 0., 1.));
        float cb = i == 1 ? max(SB.x, clamp((U.y - hr) / px + .5, 0., 1.)) * (1. - cn) : 0., cs = cn + cb;
        float hzf = 1. - exp(-D.x / 5200.);
        // value noise at a fixed level (no gradient lookups inside this loop: Windows compile); in the mirror (r0 > 0) it is
        // streaked along the ripples and breaks the trees' images from the top down: shorter and softer than the trees
        vec2 np = r0 > 0. ? vec2(u * 1800., hr / dd * 900. + uE.w * .5) : vec2(D.x * .37 + hy * .9, hy * .6), ni = floor(np), nf = np - ni; nf = nf * nf * (3. - 2. * nf);
        float nv = textureLod(uN, (ni + nf + .5) / 256., 0.).r;
        vec3 lc = vec3(.0035, .0055, .0065) * uSun.w * (.8 + .4 * nv);
        float rk = 1. - step(.001, r0) * smoothstep(.35, 1., clamp(hr / max(H.x - G.x, .5), 0., 1.) + (nv - .5) * .9) * (1. - .6 * smoothstep(250., 900., D.x));
        // a pale foot of shore rock and reed at the waterline along much of each stand
        float sw = sin(u * 2632.6 + float(i) * 2. + 2.3 * sin(u * 911.06)) * .3 + sin(u * 1187.5 + 1.7 * sin(u * 3097.6)) * .2 + .5, sth = .15 + .75 * sw;
        float sl = (1. - smoothstep(sth * .5, sth + .5 * px, hy)) * smoothstep(-.32, -.12, hy) * smoothstep(.12, .3, sw) * step(.5, float(i));
        // (n13) only beyond ~600 m; nearer, the same uneven profile is a line of dark wet boulders and slabs, not pale beads
        lc = mix(lc, mix(hz * .4, lc * .55, 1. - smoothstep(450., 700., D.x)), sl * .8);
        // the back rank paler: the air between
        lc = mix(lc, mix(lc, hz, .3 * smoothstep(250., 900., D.x)), cb / max(cs, 1e-3));
        lc = mix(lc, hz, hzf);
        lc += hz * .07 * exp(-max(hy, 0.) / 1.5) * (1. - hzf);
        lc += (vec3(.006, .011, .016) * uSun.w + hz * .1) * (1. - smoothstep(110., 230., D.x));
        cov *= min(cs, 1.) * rk;
        if (cov > .5) dist = dd;
        c = mix(c, lc, cov);
      }
    }
    H = H.yzwx; D = D.yzwx; G = G.yzwx; SN = SN.yzwx; SB = SB.yzwx;
  }
  return c;
}
// far bonfires and cottage windows: direct, mirrored, and their glitter paths on the water
vec3 lights(vec3 O, vec3 d, float pix, float refl, float s2, float fr, vec3 d0, float Dw, out vec3 dir) {
  vec3 acc = vec3(0.); dir = vec3(0.);
  int n = int(uX.x + .5);
  for (int i = 0; i < 8 + int(uZr); i++) {
    if (i >= n) break;
    vec4 a = texelFetch(uL, ivec2(i, 0), 0), b = texelFetch(uL, ivec2(i, 1), 0);
    vec3 Lp = vec3(a.x * a.z, a.w * (refl > .5 ? -1. : 1.), a.y * a.z);
    vec3 v = Lp - O; float lv = length(v); vec3 ld = v / lv;
    vec3 df = d - ld;
    // (n13) a near bonfire (b.w .25) is a small flame (e-folds .35 m across, 1.5 m up), narrowing upward
    float nf = step(.1, b.w) * step(b.w, .5);
    float cw = max(pix * .8, (b.w > .5 ? .6 : 2.2 - 1.85 * nf) / lv);
    float th = dot(df.xz, df.xz) * (1. + nf * 2.5 * clamp(df.y / (cw * 4.3), 0., 1.)) + df.y * df.y * (b.w > .5 ? .7 : .18 - .126 * nf);
    float fl = b.w > .5 ? 1. : .7 + .3 * vn(vec2(uE.w * 2.3 + float(i) * 17., float(i)));
    vec3 g = b.rgb * fl * (exp(-th / (cw * cw)) + .03 * exp(-sqrt(th) / (pix * 7.)));
    if (refl > .5) {
      // (n13) a near fire seen below the horizon: the eye's own ray reaches it before the water (drawn over the shore)
      vec3 v0 = vec3(a.x * a.z, a.w, a.y * a.z) - uE.xyz; float l0 = length(v0); vec3 e0 = d0 - v0 / l0;
      dir += b.rgb * fl * nf * exp(-(dot(e0.xz, e0.xz) * (1. + 2.5 * clamp(e0.y * l0 * .66, 0., 1.)) + e0.y * e0.y * .054) * l0 * l0 * 8.2) * step(length(v0.xz), Dw);
      vec3 Lr = normalize(vec3(a.x * a.z, a.w, a.y * a.z) - O);
      vec3 Hh = normalize(Lr - d);
      float t2 = dot(Hh.xz, Hh.xz) / (Hh.y * Hh.y);
      g = g * fr + b.rgb * fl * fr * exp(-t2 / (2. * (s2 + .00006))) * .05;
    }
    acc += g;
  }
  return acc;
}
vec3 mist(vec3 c, vec3 d, float dist, vec3 hz, float u) {
  float dn = uX.y;
  if (dn <= 0.) return c;
  vec2 dh = d.xz / max(length(d.xz), 1e-5);
  float hm = 2. + 4.5 * vn(dh * 11. + 3.1) * (.5 + .5 * min(dn, 1.5));
  float hl = length(d.xz);
  float len = d.y > 1e-4 ? min(dist, max(hm - uE.y, 0.) * hl / d.y) : dist;
  float a = (1. - exp(-len * dn / 2300.)) * (.5 + .5 * vn(dh * 4.8 + vec2(-uE.w * .004, 2.)));
  vec3 fd = uF.xyz - uE.xyz; float fdl = length(fd);
  float cg = max(dot(d, fd / fdl), 0.);
  vec3 mc = hz * .95 + vec3(1., .42, .14) * uF.w * .006 * (pow(cg, 400.) * 2.5 + pow(cg, 40.) * .35) * smoothstep(fdl * .4, fdl, len);
  return mix(c, mc, a);
}
void wgeo(vec3 d, float Dw, float hl, float pix, out vec3 r, out vec3 P, out vec2 sl, out float s2, out float fr, out float cosi, out float dep, out float sb) {
  vec3 E = uE.xyz;
  vec2 p = E.xz + d.xz / hl * Dw;
  P = vec3(p.x, 0., p.y);
  float sg = max(-d.y, .002), fp = Dw * pix / sg, t = uE.w;
  vec2 wd = uW.xy;
  // depth under the surface: the shore's height map, the skerry's shelf
  dep = 3.;
  vec2 hm = (p + 48.) / 96.;
  if (hm.x > 0. && hm.y > 0. && hm.x < 1. && hm.y < 1.) dep = 3. - texture(uHm, hm).r * 6.;
  vec2 sk = p - uSk.xy; sk = vec2(sk.x * uZ.z + sk.y * uZ.w, sk.y * uZ.z - sk.x * uZ.w);
  dep = max(min(dep, max(.03, (length(sk * vec2(1., 1.35)) - 5.4) * .45)), .02);
  float sh = exp(-dep * 2.5);
  // catspaws: wind-driven patches of capillary ripples that run downwind
  float wind = uW.w + uW.z;
  float pm = fbm(p * .016 - wd * t * .11 + 3.7);
  float pa = smoothstep(.64 - .22 * min(wind, 1.), .84, pm) * min(wind * 1.5, 1.);
  float amp = .006 + .07 * pa + .012 * sh + .02 * uW.z;
  // the long swell: each wave fades once the pixel's footprint on the water (long along the view, narrow across) holds
  // more than about a wavelength of it, and what it loses goes into the roughness, so far water never tears into bars
  vec2 fw = d.xz / hl, fa = vec2(-fw.y, fw.x);
  vec3 kx = vec3(.28, -.87, 1.96), kz = vec3(.85, 1.09, 1.2), ka = (kx * fw.x + kz * fw.y) * fp, kb = (kx * fa.x + kz * fa.y) * Dw * pix;
  vec3 wf = exp(-.5 * (ka * ka + kb * kb)), wa = vec3(.0016, .0011, .0007);
  sl = vec2(.31, .95) * cos(dot(vec2(.28, .85), p) - t * 2.9) * wa.x * wf.x + vec2(-.62, .78) * cos(dot(vec2(-.87, 1.09), p) - t * 3.6 + 1.) * wa.y * wf.y
     + vec2(.85, .52) * cos(dot(vec2(1.96, 1.2), p) - t * 4.6 + 2.) * wa.z * wf.z;
  float lost = dot(wa * wa, 1. - wf * wf) * .5;
  float w1 = clamp(1.3 - fp / .3, 0., 1.);
  if (w1 > 0.) {
    float e = .07;
    vec2 q = p * 2.1 - wd * t * 1.3;
    float h0 = vn(q), hx = vn(q + vec2(e, 0.)), hz2 = vn(q + vec2(0., e));
    vec2 q2 = mat2(.8, .6, -.6, .8) * p * 5.3 - wd * t * 2.2;
    float g0 = vn(q2), gx = vn(q2 + vec2(e, 0.)), gz = vn(q2 + vec2(0., e));
    sl += (vec2(hx - h0, hz2 - h0) + vec2(gx - g0, gz - g0) * .55) / e * amp * .45 * w1;
  }
  s2 = .000012 + amp * amp * .35 * (1. - w1 * .5) + lost;
  // the reflected shore's vertical blur (radians): the unresolved slopes stretch its image into soft streaks
  sb = 1.6 * sqrt(lost + .12 * amp * amp * (1. - w1));
  vec3 n = normalize(vec3(-sl.x, 1., -sl.y));
  r = reflect(d, n); r.y = max(r.y, .0004);
  cosi = max(dot(-d, n), 0.); fr = .02 + .98 * pow(1. - cosi, 5.);
}
vec3 wshade(vec3 d, vec3 env, vec3 P, vec2 sl, float s2, float fr, float cosi, float dep, vec3 sba, float sb) {
  vec2 p = P.xz, wd = uW.xy; float t = uE.w;
  vec2 uv = gl_FragCoord.xy / uR.w;
  vec2 du = vec2(dot(sl, uR.xz) * .5, dot(sl, normalize(uFw.xz)) * 2.) / (2. * uFw.w);
  vec2 dv = vec2(0., (.7 + 2.5 * min(dep, 1.)) / uR.w + sb * .35 / uFw.w);
  // two taps a little apart on a slant: the rippled image in soft lozenges, not square-ended bars
  vec2 dh = vec2(1.1 / uR.w, 0.);
  vec4 rf = (texture(uRf, uv + du * vec2(.6, 1.) - dv - dh) + texture(uRf, uv + du * vec2(.6, 1.) + dv + dh)) * .5;
  vec3 refl = rf.rgb + (1. - rf.a) * env;
  // the fire's glitter path
  vec3 Lv = uF.xyz - P; float dl = length(Lv);
  vec3 Hh = normalize(Lv / dl - d);
  float t2 = dot(Hh.xz, Hh.xz) / (Hh.y * Hh.y), sg2 = s2 + .00012;
  float spk = .35 + 1.3 * vn(p * vec2(2.2, .9) + t * vec2(.4, 1.9)) * vn(p * 1.3 - wd * t);
  vec3 glit = vec3(1., .45, .14) * uF.w * .0011 * exp(-t2 / (2. * sg2)) / (sg2 * 900. + .4) * spk * fr;
  // under the surface: tea-brown lake water, granite showing in the shallows
  vec3 rk = vec3(.30, .24, .19) * (.6 + .7 * vn(p * 2.7)) * (.8 + .4 * vn(p * .6));
  vec3 att = exp(-dep * vec3(1.7, 2.7, 4.6) * (1. + 1. / max(cosi, .2)));
  vec3 amb = sba * 1.3 + fireL(P - vec3(0., dep, 0.), vec3(0., 1., 0.), .1765) * .5;
  vec3 body = (rk * att + vec3(.012, .008, .004) * (1. - att)) * amb;
  return refl * fr + glit + body * (1. - fr);
}
void main() {
  vec3 d = normalize(uFw.xyz + vQ.x * uFw.w * uR.xyz + vQ.y * uFw.w * uU.xyz);
  float pix = uU.w;
  vec3 E = uE.xyz;
  float hl = max(length(d.xz), 1e-5), m = d.y / hl;
  float u = fract(at2(d.x, d.z) / 6.2831853);
  bool wat = m < -1e-4;
  float Dw = wat ? E.y / -m : 0.;
  vec3 rd = d, P = E; vec2 sl = vec2(0.); float s2 = 0., fr = 1., cosi = 1., dep = 3., sb = 0.;
  if (wat) wgeo(d, Dw, hl, pix, rd, P, sl, s2, fr, cosi, dep, sb);
  // the three sky lookups share one copy of skyB: the ray, the horizon under it, the light on the lake bed
  vec3 sb0 = vec3(0.), sb1 = vec3(0.), sb2 = vec3(0.);
  for (int i = 0; i < 3 + int(uZr); i++) { vec3 v = skyB(i == 0 ? rd : i == 1 ? normalize(vec3(d.x, .03 * hl, d.z)) : vec3(0., .8, .6)); if (i == 0) sb0 = v; else if (i == 1) sb1 = v; else sb2 = v; }
  vec3 hz = sb1;
  float rh = max(length(rd.xz), 1e-5), dist = 9000.;
  // pass 0: sky and far shores along the (reflected) ray; pass 1 (water only): the shaded surface, then the shores in front of it
  vec3 col = sky(rd, sb0), env = col, lg = vec3(0.), ldr = vec3(0.);
  for (int k = 0; k < 2 + int(uZr); k++) {
    if (k == 1) { if (!wat) break; dist = Dw; col = wshade(d, env, P, sl, s2, fr, cosi, dep, sb2, sb) + lg; }
    col = layers(col, u, k == 0 && wat ? 0. : E.y, k == 0 ? Dw : 0., k == 0 ? rd.y / rh : m, hz, pix, k == 0 && wat ? pix + sb : pix, dist);
    if (k == 0) { env = col; lg = lights(P, rd, pix, wat ? 1. : 0., s2, fr, d, Dw, ldr); col = env + lg; }
  }
  col += ldr;
  col = mist(col, d, dist, hz, u);
  o = vec4(col, 1.);
}
`,za=bt+At+`
uniform float uM;
layout(location = 0) in vec3 aP; layout(location = 1) in vec4 aN;
out vec3 vW; out vec3 vN; out float vK;
void main() { vec3 p = aP; if (aN.w > .5) p.xz += uSk.xy; vW = p; vN = aN.xyz; vK = aN.w; p.y *= uM; gl_Position = uVP * vec4(p, 1.); }
`,ga=bt+At+ve+oo+`
in vec3 vW; in vec3 vN; in float vK; out vec4 o;
vec3 h3(vec2 i) { vec3 p = fract(vec3(i.xyx) * vec3(.1031, .103, .0973)); p += dot(p, p.yzx + 33.33); return fract((p.xxy + p.yzz) * p.zyx); }
// a joint: distance (m) from a wandering crack line of one set, and whether this stretch of it is open
float crk(vec2 q, vec2 dr, float sp, float sd, out float gate) {
  // (n13) each joint wanders half its spacing over ~3 m and steps sideways a tenth where its open stretch begins or ends
  float s = dot(q, dr) / sp + (vn(q * .3 + sd) - .5) * .5 + (vn(q * 2.3 + sd) - .5) * .05;
  float gv = vn(vec2(dot(q, vec2(-dr.y, dr.x)) * .55, floor(s) * 7.3 + sd));
  gate = smoothstep(.44, .56, gv);
  s += .1 * gate - .05;
  return abs(fract(s) - .5) * sp;
}
// lichen rosettes: at most one per cell of size s, present where the cluster field allows; lobed edge
// x: cover, y: rim band, z: radius 0 (centre) .. 1 (edge)
vec3 ros(vec2 q, float s, float dens, float lob, float px) {
  vec2 g = q / s, i = floor(g), f = g - i - .5;
  vec3 h = h3(i);
  if (h.z > dens) return vec3(0., 0., 1.);
  float r = .1 + .36 * h.x * h.x;
  vec2 v = f - (h.xy - .5) * .3;
  v.x *= .8 + .45 * h.y;
  float d = length(v) / r;
  d *= 1. + lob * (vn(g * 2.3 + h.yx * 61.) - .55) + lob * .6 * (vn(g * 6.1 + h.xz * 17.) - .5);
  float w = max(.035, px / r * .8);
  return vec3(1. - smoothstep(1. - w, 1. + w, d), smoothstep(.8 - w, .9, d) * (1. - smoothstep(1.02, 1.12 + w, d)), d);
}
void main() {
  vec3 P = vW;
  if (P.y < -.035) discard;
  vec3 n = normalize(vN);
  vec3 V = uE.xyz - P; float dist = length(V); V /= dist;
  float fp = dist * uU.w;
  vec2 q = P.xz + P.y * vec2(.37, .61) + vK * 31.;
  float a1 = clamp(1. - fp / .05, 0., 1.), a2 = clamp(1. - fp / .012, 0., 1.);
  float slope = 1. - n.y;
  // glacial polish over swells: bump from a broad and a fine noise
  float e = .04;
  int Z = int(uZr);
  vec3 bA = vec3(0.);
  for (int i = 0; i < 3 + Z; i++) { vec2 qq = q + (i == 1 ? vec2(e, 0.) : i == 2 ? vec2(0., e) : vec2(0.)); bA = vec3(bA.yz, fbm(qq * .7) * .26 + vn(qq * 13.) * .012 * a1); }
  float b0 = bA.x, bx = bA.y, bz = bA.z;
  n = normalize(n - vec3(bx - b0, 0., bz - b0) / e * clamp(1. - fp / .25, 0., 1.));
  // joints: two open sets (some stretches grown in) and fine hair cracks
  vec4 fA = vec4(0.), gA = vec4(0.);
  for (int i = 0; i < 4 + Z; i++) {
    vec2 dr = i == 0 ? vec2(.83, .56) : i == 1 ? vec2(-.38, .93) : i == 2 ? vec2(.2, .98) : vec2(.95, -.3);
    float sp = i == 0 ? 2.9 : i == 1 ? 4.6 : i == 2 ? .85 : 3.7, sd = i == 0 ? 3. : i == 1 ? 9. : i == 2 ? 17. : 51., gg;
    fA = vec4(fA.yzw, crk(q, dr, sp, sd, gg)); gA = vec4(gA.yzw, gg);
  }
  float g1 = gA.x, g2 = gA.y, g3 = gA.z, f1 = fA.x, f2 = fA.y, f3 = fA.z;
  float wd1 = .004 + .02 * pow(vn(q * 1.7 + 3.), 2.), wd2 = .004 + .02 * pow(vn(q * 1.7 + 9.), 2.);
  float ck = max(max(g1 * (1. - smoothstep(wd1 * .4, wd1 + fp * .7, f1)), g2 * (1. - smoothstep(wd2 * .4, wd2 + fp * .7, f2))), g3 * .45 * (1. - smoothstep(.002, .006 + fp * .7, f3)));
  // vegetated stretches: crowberry, heather and moss filling the wider joints
  float wv1 = .025 + .08 * vn(q * 1.1 + 4.), wv2 = .02 + .07 * vn(q * 1.3 + 8.);
  float vg1 = g1 * smoothstep(.48, .6, vn(q * .45 + 3.)), vg2 = g2 * smoothstep(.5, .62, vn(q * .5 + 9.));
  float veg = max(vg1 * (1. - smoothstep(wv1 * .55, wv1 + fp, f1)), vg2 * (1. - smoothstep(wv2 * .55, wv2 + fp, f2)));
  float vrim = max(vg1 * smoothstep(wv1 * 1.6, wv1, f1), vg2 * smoothstep(wv2 * 1.6, wv2, f2)) * (1. - veg);
  // granite: weathered pink-grey, greyer patches, feldspar, quartz and mica grains
  vec3 gr = vec3(.305, .30, .30) * (.6 + .75 * (vn(q * .23 + 5.) * .62 + vn(q * .61 + 8.) * .38));
  gr = mix(gr, vec3(.36, .27, .21), smoothstep(.62, .8, vn(q * .55 + 61.)) * .18);
  float gv = gA.w, fv = fA.w;
  gr = mix(gr, vec3(.56, .42, .34), gv * (1. - smoothstep(.02 + .06 * vn(q * .8 + 2.), .03 + .06 * vn(q * .8 + 2.) + fp, fv)) * .7);
  gr = mix(gr, vec3(.31, .30, .30), smoothstep(.45, .78, vn(q * .9 + 19.)) * .45);
  // the crystals: a warped mosaic of ~1 cm grains (pink-grey feldspar, milky plagioclase, smoky quartz, biotite) with
  // scattered 2-4 cm feldspar phenocrysts; both fade to their mean once a grain is under ~2 px
  float gF = clamp(1.6 - fp / .005, 0., 1.), mica = 0.;
  vec2 wi = vec2(0.);
  if (fp < .0192) {
  if (gF > 0.) {
  vec2 wq = mat2(.88, .47, -.47, .88) * q * 85. + (vec2(vn(q * 41.), vn(q * 41. + 13.)) - .5) * 2.6;
  wi = floor(wq); vec3 hx = h3(wi + 191.);
  vec3 xc = hx.x < .38 ? vec3(.53, .41, .38) : hx.x < .66 ? vec3(.62, .6, .57) : hx.x < .9 ? vec3(.34, .35, .37) : vec3(.12, .11, .11);
  gr *= mix(vec3(1.), xc * (.85 + .3 * hx.y) / vec3(.462, .413, .398), gF * .3);
  mica = step(.9, hx.x) * step(.7, hx.z) * gF;
  }
  vec2 pq = mat2(.6, -.8, .8, .6) * q * 24.; vec3 hp = h3(floor(pq) + 37.);
  float pa = hp.x * 3.1416, pc = cos(pa), ps = sin(pa);
  vec2 pf = mat2(pc, ps, -ps, pc) * (fract(pq) - .5 - (hp.xy - .5) * .35);
  float ph = step(hp.z, .3) * (1. - smoothstep(.13, .24, max(abs(pf.x) * (.75 + .35 * hp.y), abs(pf.y) * 1.5)));
  gr = mix(gr, vec3(.55, .43, .40) * (.85 + .25 * hp.y), ph * .4 * clamp(1.6 - fp / .012, 0., 1.));
  mica *= 1. - ph;
  }
  gr *= 1. - .05 * a1 * smoothstep(.55, 1., sin(dot(q, vec2(.55, -.83)) * 210. + vn(q * 2.6) * 26.));
  // dark run-off streaks down the steeper faces
  vec2 dh = n.xz / max(length(n.xz), 1e-4);
  float stk = smoothstep(.55, .8, vn(vec2(dot(q, vec2(-dh.y, dh.x)) * 7., dot(q, dh) * .5 + 3.))) * smoothstep(.04, .2, slope);
  gr = mix(gr, vec3(.09, .085, .08), stk * .6);
  // weathering pits: shallow rounded hollows on the flatter rock, dark silt in the bottom, some holding rain
  vec2 kq = q / .17, ki = floor(kq); vec3 hk = h3(ki + 53.);
  vec2 kf = kq - ki - .5 - (hk.xy - .5) * .4;
  float kd = length(kf * vec2(1., .75 + .5 * hk.y)) / (.1 + .18 * hk.x) * (1. + .25 * (vn(kq * 5.) - .5));
  // (n13) faded out once a pit is a few pixels (through a long lens they were a speckle of hard dots)
  float pit = step(hk.z, .3) * smoothstep(.12, .03, slope) * (1. - smoothstep(.8, 1.05 + fp / .17, kd)) * clamp(1.8 - fp / .009, 0., 1.);
  gr = mix(gr, gr * vec3(.55, .52, .5), pit * smoothstep(.95, .3, kd));
  gr *= 1. + .25 * pit * smoothstep(.55, .95, kd);
  vec3 al = gr;
  // lichens: big grey-green crust mats, grey-green rosettes and map-lichen rosettes, each in clusters
  float px1 = fp / .26, px2 = fp / .1;
  float Cg = smoothstep(.56, .8, vn(q * .33 + 11.) * .6 + vn(q * 1.3 + 5.) * .4);
  float Cm = smoothstep(.52, .76, vn(q * .42 + 23.) * .6 + vn(q * 1.7) * .4) * (1. - .7 * Cg);
  float Lm = vn(q * 2.2 + 31.) * .6 + vn(q * 5.3 + 2.) * .4 + (vn(q * 19.) - .5) * .18 * a1;
  float mat = smoothstep(.62, .68, Lm) * Cg * .35;
  vec3 rA0 = vec3(0.), rA1 = vec3(0.), rA2 = vec3(0.), rA3 = vec3(0.);
  for (int i = 0; i < 4 + Z; i++) {
    vec2 qq = i == 1 ? mat2(.8, -.6, .6, .8) * q + 7.3 : i == 3 ? mat2(.6, .8, -.8, .6) * q + 3.1 : q;
    float dn = i == 0 ? .03 + .8 * Cg : i == 1 ? .7 * Cg : i == 2 ? .02 + .85 * Cm : .75 * Cm;
    vec3 v = ros(qq, i == 0 ? .26 : i == 1 ? .52 : i == 2 ? .1 : .045, dn, i < 2 ? .9 : .8, i < 2 ? px1 * (i == 1 ? .5 : 1.) : px2 * (i == 3 ? 2.2 : 1.)); if (i == 0) rA0 = v; else if (i == 1) rA1 = v; else if (i == 2) rA2 = v; else rA3 = v;
  }
  vec3 rg = max(rA0, rA1), rm = max(rA2, rA3);
  float fd1 = clamp(1. - px1 * 1.5, 0., 1.), fd2 = clamp(1. - px2 * 1.5, 0., 1.);
  vec3 gl = vec3(.43, .46, .37) * (.8 + .4 * vn(q * 37.) * a2);
  float cg = max(mat, rg.x * fd1);
  vec3 gc = mix(gl * vec3(.8, .8, .76), gl * 1.1, smoothstep(.55, .92, rg.z));
  gc *= 1. - .55 * smoothstep(.6, .7, vn(q * 150.)) * (1. - smoothstep(.6, .85, rg.z)) * a2;
  gc *= (1. - .1 * rg.y * fd1) * (.75 + .5 * vn(q * 23. + 9.) * a1 + .25 * (1. - a1));
  al = mix(al, gc, cg * .7 + (1. - fd1) * Cg * .1);
  vec3 ym = vec3(.44, .45, .2) * (.75 + .5 * vn(q * 60.));
  float ar = smoothstep(.36, .42, abs(vn(q * 140.) - .5) * 4.) * a2;
  al = mix(al, mix(ym, vec3(.03), ar * .7), rm.x * fd2 * .62 + (1. - fd2) * Cm * .06);
  al = mix(al, vec3(.03, .028, .025), rm.y * .12 * fd2);
  float l3 = smoothstep(.69, .73, vn(q * 2.3 + 77.) * .6 + vn(q * 5.1) * .4) * smoothstep(.15, .45, slope);
  al = mix(al, vec3(.045, .04, .04), l3);
  // the joints and their plants
  al = mix(al, vec3(.03, .025, .02), ck * .92);
  al *= 1. - .25 * vrim;
  float vk = vn(q * .8 + 41.), tf = vn(q * 31.) * vn(q * 83.);
  vec3 cb = vec3(.09, .15, .05) * (.2 + 2.8 * tf) + vec3(.16, .24, .08) * smoothstep(.6, .72, vn(q * 160.)) * a2;
  vec3 ht = vec3(.13, .085, .085) * (.4 + 1.8 * vn(q * 55.) * vn(q * 21.)) + vec3(.1, .05, .09) * smoothstep(.65, .75, vn(q * 120.)) * a2;
  vec3 ms = vec3(.27, .27, .08) * (.5 + 1. * vn(q * 45.) * vn(q * 110.));
  vec3 vc = mix(cb, ht, smoothstep(.45, .6, vk));
  vc = mix(ms, vc, smoothstep(.15, .6, veg + .25 * vn(q * 9.)));
  al = mix(al, vc, veg);
  // a few fallen birch leaves, mostly near the joints
  {
    vec2 lg = q / .45, li = floor(lg); vec3 h = h3(li + 71.);
    float dn = .1 + .5 * max(vrim, veg);
    if (h.z < dn && a1 > 0.) {
      float an = h.x * 6.283, ca = cos(an), sa = sin(an);
      vec2 r = mat2(ca, sa, -sa, ca) * ((lg - li - .5 - (h.xy - .5) * .5) * .45);
      float lf = length(r / vec2(.024, .015)) + max(r.x, 0.) / .024 * .35;
      float cv = (1. - smoothstep(.9 - fp / .02, 1., lf)) * a1;
      vec3 lc = mix(vec3(.36, .19, .06), vec3(.66, .5, .12), step(.55, h.y)) * (.8 + .3 * vn(r * 400.));
      lc *= 1. - .4 * (1. - smoothstep(.0, .0015, abs(r.y))) * a2;
      al = mix(al, lc, cv);
    }
  }
  al *= .31;
  // the skerry: soot under the pile
  vec2 fo = P.xz - uF2.xz;
  // (n13) a ragged patch under the pile, not most of the rock
  if (vK > .5) al *= mix(.22, 1., smoothstep(1.1, 1.7, length(fo) + .6 * (vn(fo * 3.) - .5)));
  // black cyanobacteria band and the wet rock at the waterline
  float wl = P.y + .05 * vn(q * 3.);
  float bl = 1. - smoothstep(.12, .32, wl + .1 * stk);
  al = mix(al, vec3(.035, .03, .025), bl * .55 * (1. - veg));
  float wet = max(1. - smoothstep(.02, .14 + .1 * vn(q * 4.), P.y), pit * mix(step(.55, hk.y), 1., uZ.y) * smoothstep(.9, .5, kd) * (1. - veg));
  wet = max(wet, uZ.y * .45 * (1. - veg));
  al *= 1. - .55 * wet;
  vec3 R = reflect(-V, n);
  vec3 Rs = R.y < .02 ? normalize(vec3(R.x, .02, R.z)) : R;
  // the sky light (as skyIrr) and the reflected sky share one copy of skyB
  vec3 sa = vec3(0.), sb = vec3(0.), sR = vec3(0.);
  for (int i = 0; i < 3 + Z; i++) { vec3 v = skyB(i == 0 ? normalize(n + vec3(0., .55, 0.)) : i == 1 ? normalize(vec3(n.x, .1 + .2 * max(n.y, 0.), n.z) + vec3(0., 1e-3, 0.)) : Rs); if (i == 0) sa = v; else if (i == 1) sb = v; else sR = v; }
  float up = n.y * .5 + .5;
  // on the skerry the fire's light falls off fast: hot faces by the pile, the far ends in the sky's own light
  float dF = length(uF.xyz - P);
  vec3 irr = 3. * mix(sb, sa, .55);
  irr = mix(irr, vec3(dot(irr, vec3(.3, .4, .3))), .3);
  // (n13) on the skerry the flame (two metres wide) wraps round the shoulders and the bright sky reaches the flanks
  float sk = step(.5, vK);
  vec3 col = al * (irr * mix(.3 + .7 * up, .55 + .45 * up, sk) + vec3(.015, .013, .012) * uSun.w * (1. - up) + fireL(P, n, mix(.1765, .45, sk)) * 2.8 * mix(1., 2.4 / (1. + .075 * dF * dF), sk));
  // the low sun when it is up (late sun, first sun): warm grazing light on the faces turned to it
  col += al * vec3(1.5, .72, .3) * uSun.w * .9 * max(dot(n, uSun.xyz), 0.) * smoothstep(-.01, .03, uSun.y);
  float fr = .03 + .2 * pow(1. - max(dot(n, V), 0.), 5.);
  float bare = clamp(1. - cg * 1.2 - rm.x - ck - l3 - veg, 0., 1.);
  col += sR * fr * (.2 + .1 * vn(q * .4) + .5 * wet * (1. + sk * smoothstep(.4, .6, wet))) * bare;
  vec3 Lf = normalize(uF.xyz - P);
  // mica: biotite flakes tilted at random glint in the firelight and toward the bright north sky
  if (mica > 0.) {
  vec3 Rm = reflect(-V, normalize(n + (h3(wi + 7.) - .5) * .9));
  vec3 sg = normalize(vec3(uSun.x, .08, uSun.z));
  col += mica * bare * (vec3(1., .5, .2) * uF.w / (pow(length(uF.xyz - P), 1.6) + 3.) * pow(max(dot(Rm, Lf), 0.), 90.) * .5 + sR * pow(max(dot(Rm, sg), 0.), 40.) * .4);
  }
  col += vec3(1., .5, .2) * uF.w / (pow(length(uF.xyz - P), 1.6) + 3.) * pow(max(dot(R, Lf), 0.), 30.) * (.04 + .6 * wet) * bare;
  o = vec4(col, 1.);
}
`,Sa=bt+At+`
uniform float uM;
layout(location = 1) in vec4 aA; layout(location = 2) in vec4 aB;
out vec2 vC; out float vH; out float vPh; out vec3 vW; out float vLn; out float vLo; out vec3 vSd; out vec3 vTe; out float vRd;
void main() {
  float k = .3 + .7 * clamp(uF2.w, 0., 1.);
  vec3 A = aA.xyz, B = aB.xyz;
  // burning down, the pile falls in on itself: lower, the tops slumped toward the heart, a heap rather than a star
  // a lying log (phase 2 and up) of the stack sinks and spreads as the stack burns down; a leaning pole slumps inward
  float ly = step(1.5, aB.w);
  float ky = mix(k, .45 + .55 * k, ly); A.y *= ky; B.y *= ky; A.xz *= 1. + (1. - k) * mix(.12, .22, ly); B.xz *= mix(.45 + .55 * k, 1. + (1. - k) * .22, ly);
  A += uF2.xyz; B += uF2.xyz;
  float s = float(gl_VertexID & 1), v = float(gl_VertexID >> 1) * 2. - 1.;
  vec3 E = uE.xyz; if (uM < 0.) E.y = -E.y;
  vec3 ax = B - A; float L = length(ax);
  vec3 mid = mix(A, B, s) + ax / L * (s * 2. - 1.) * aA.w;
  vec3 sd = normalize(cross(ax, E - mid));
  vec3 p = mid + sd * v * aA.w;
  vC = vec2(s, v); vH = (p.y - uF2.y) / max(uY.x * k, .1); vPh = aB.w; vW = p; vLn = L; vLo = -sd.y * v;
  vSd = sd; vTe = normalize(E - mid); vRd = aA.w;
  p.y *= uM;
  gl_Position = uVP * vec4(p, 1.);
}
`,_a=bt+At+ve+`
in vec2 vC; in float vH; in float vPh; in vec3 vW; in float vLn; in float vLo; in vec3 vSd; in vec3 vTe; in float vRd; out vec4 o;
void main() {
  float v = vC.y;
  // (n13) round ends: the ribbon runs a radius past each end; cut it to the end's circle
  float al = vC.x * (vLn + 2. * vRd) - vRd, ov = max(-al, al - vLn);
  if (ov > 0. && ov * ov + v * v * vRd * vRd > vRd * vRd) discard;
  float sh = sqrt(max(1. - v * v, 0.));
  vec2 q = vec2(vC.x * vLn * 2.5, v * 1.5 + vPh * 13.);
  float ch = vn(q) * .6 + vn(q * 2.7) * .4;
  float k = clamp(uF2.w, 0., 1.);
  float heat = (1. - smoothstep(.0, .4, vH)) * (.45 + .45 * k) + uY.z * (1. - smoothstep(0., .5, vH));
  float fl = .75 + .25 * vn(vec2(uE.w * 2.6 + vPh * 9., vC.x * 3.));
  // embers glow orange-red through black char, never white, and only where it burns: along the underside of each log
  // (the gaps between the courses) low in the stack, in streaks along the grain, not dots
  vec3 em = bb(min(.25 + .5 * heat * fl, .58)) * smoothstep(.5, .8, ch + heat * .15) * min(heat, 1.) * (.14 + .45 * uY.z) * (.4 + .6 * sh) * (.15 + .85 * smoothstep(.15, .8, vLo));
  // (n13) a round log lit from the flame's side, strongest low in the pile
  vec3 Lf = uF.xyz - vW; float dl = length(Lf);
  float lam = max(dot(normalize(vSd * v + vTe * sh), Lf / dl), 0.);
  vec3 col = vec3(.02, .016, .014) * (.4 + .6 * sh) * (uSun.w * 2. + uF.w * .02) + em
    + vec3(1., .42, .12) * uF.w * .008 * pow(1. - sh, 3.) * (1. - smoothstep(.2, 1., vH)) * (.3 + .7 * k)
    + vec3(1., .38, .1) * uF.w * .17 * lam / (dl * dl + 4.) * (1. - .6 * smoothstep(.2, 1.2, vH)) * (1. - .5 * ch);
  o = vec4(col, 1.);
}
`,Fa=bt+At+`
uniform float uM;
layout(location = 1) in vec4 aI; layout(location = 2) in vec4 aJ;
out vec2 vC; out float vS; out float vI; out vec2 vWH; out float vY;
void main() {
  float k = clamp(uF2.w, 0., 1.25), kh = .3 + .7 * min(k, 1.);
  float flare = uSk.z;
  float live = smoothstep(.02, .35, k);
  vec3 base = uF2.xyz + vec3(aI.x * (1. + (1. - kh) * .4), aI.y * kh, aI.z * (1. + (1. - kh) * .4));
  float h = aJ.y * (.28 + .72 * min(k, 1.15)) * (1. + .55 * flare) * live + .25;
  float w = aJ.x * (.65 + .35 * kh) * (1. + .2 * flare);
  float ln = (.12 + .5 * uW.w + 1.2 * uW.z) * aJ.w;
  vec3 up = normalize(vec3(uW.x * ln, 1., uW.y * ln));
  vec3 E = uE.xyz; if (uM < 0.) E.y = -E.y;
  vec3 rt = normalize(cross(up, E - base));
  float cx = float(gl_VertexID & 1) * 2. - 1., cy = float(gl_VertexID >> 1) * 1.15 - .08;
  vec3 p = base + rt * cx * w + up * cy * h + vec3(uW.x, 0., uW.y) * ln * cy * cy * h * .35;
  vC = vec2(cx, cy); vS = aI.w; vI = aJ.z * (live * .8 + .2) * (1. + .5 * flare); vWH = vec2(w, h);
  // height over the pile's top: flame inside the pile is seen only between the timbers
  vY = (p.y - uF2.y) / max(uY.x * kh, .1);
  p.y *= uM;
  gl_Position = uVP * vec4(p, 1.);
}
`,Pa=bt+At+ve+`
in vec2 vC; in float vS; in float vI; in vec2 vWH; in float vY; out vec4 o;
void main() {
  float x = vC.x, y = vC.y;
  if (y < -.08 || y > 1.07) discard;
  float t = uE.w + vS * 7.;
  vec2 p = vec2(x * vWH.x, y * vWH.y);
  float n1 = fbm(p * vec2(.9, .55) + vec2(vS * 13., -t * 2.3));
  float n2 = fbm(p * vec2(2.1, 1.25) + vec2(vS * 5. + n1 * 1.6, -t * 4.1));
  float xx = x + (n1 - .5) * (.3 + 1.1 * y);
  float env = 1. - abs(xx) / (.12 + .88 * pow(max(1. - y, 0.), .65));
  float heat = env * 1.25 - y * .95 + (n2 - .5) * 1.5 + (n1 - .5) * .5 + .2;
  heat *= smoothstep(-.04, .2, y);
  heat = clamp(heat, 0., 1.);
  heat *= 1. - .72 * uK.w * (1. - smoothstep(.5, 1.05, vY));
  // the edge at the screen's own pixel (no stairs where a tongue's edge is steep)
  float fw = max(fwidth(heat) * 1.2, .02);
  vec3 e = bb(min(heat, .84)) * smoothstep(-fw * .5, .18 + fw, heat) * vI * .27;
  o = vec4(e, 0.);
}
`,La=bt+At+ve+`
uniform float uM;
layout(location = 1) in vec4 aR; layout(location = 2) in vec4 aQ;
out float vV; out vec3 vC;
vec3 sp(float a, float bu) {
  float kh = .3 + .7 * clamp(uF2.w, 0., 1.);
  float up = (2.4 + 3.2 * aR.x) * (1. + bu * .9);
  float tau = .9 + 1.3 * aR.y;
  vec3 p = vec3((aR.z - .5) * 1.5 * (1. + bu * .6), (1. + 2.8 * aR.w) * kh, (aQ.y - .5) * 1.5 * (1. + bu * .6));
  p.y += up * tau * (1. - exp(-a / tau)) + .45 * a;
  float wv = .5 + .9 * uW.w + 3. * uW.z;
  p.xz += uW.xy * wv * a * (.5 + .8 * aQ.z) * (.4 + .6 * min(a * .5, 1.));
  p.x += sin(a * (1.2 + 2. * aQ.z) + aR.x * 30.) * (.15 + .3 * aQ.y) * a + (vn(vec2(aQ.z * 97., a * .8)) - .5) * 1.4 * a;
  p.z += cos(a * (1.1 + 1.7 * aQ.y) + aR.z * 40.) * .22 * a + (vn(vec2(aQ.y * 61., a * .8 + 3.)) - .5) * 1.4 * a;
  return uF2.xyz + p;
}
void main() {
  float bu = aQ.w;
  float P = 2.2 + 3.4 * aQ.x;
  float age = bu > .5 ? uE.w - uSk.w - aQ.x * .3 : mod(uE.w + aR.x * P * 7.13, P);
  float k = clamp(uF2.w, 0., 1.2);
  float alive = step(0., age) * step(age, P) * (bu > .5 ? 1. : step(aR.y, k * .8 + .1 + uSk.z * .4));
  float temp = exp(-age * (.5 + .9 * aR.y)) * (bu > .5 ? 1.15 : 1.);
  float tw = sin(age * (14. + aR.z * 20.) + aR.w * 30.); temp *= .65 + .35 * tw * tw;
  vec3 p1 = sp(age, bu), p0 = sp(max(age - .025 - .09 * fract(aR.z * 7.31 + aQ.y * 3.7), 0.), bu);
  p1.y *= uM; p0.y *= uM;
  vec4 c1 = uVP * vec4(p1, 1.), c0 = uVP * vec4(p0, 1.);
  float id = float(gl_VertexID & 1), sv = float(gl_VertexID >> 1) * 2. - 1.;
  vec2 s1 = c1.xy / c1.w, s0 = c0.xy / c0.w, dr = s1 - s0;
  float L = length(dr); dr = L > 1e-6 ? dr / L : vec2(0., 1.);
  float px = 2. / (uR.w * (uM < 0. ? .5 : 1.));
  float wn = max(px * .7, .03 / (c1.w * uFw.w));
  vec4 cc = mix(c0, c1, id);
  cc.xy += (vec2(-dr.y, dr.x) * sv * wn + dr * (id * 2. - 1.) * wn) * cc.w;
  gl_Position = alive > .5 && c0.w > .1 ? cc : vec4(2., 2., 2., 1.);
  vV = sv;
  vC = bb(.3 + .62 * temp) * temp * .55 / (1. + L / (wn * 4.)) * (uM < 0. ? .7 : 1.);
}
`,Ua=bt+"in float vV; in vec3 vC; out vec4 o; void main() { o = vec4(vC * exp(-vV * vV * 2.5), 0.); }",Da=bt+At+ve+`
uniform float uM; uniform vec4 uS0, uS1;
out vec2 vA; out vec3 vW; out float vL;
vec3 ctr(float s) {
  vec2 wd = normalize(uW.xy + 1e-4);
  float wv = .3 + .6 * uW.w + 1.4 * uW.z;
  float rise = uS1.y * (1. - exp(-s * 3.2 / (1. + wv)));
  vec2 sd = vec2(-wd.y, wd.x);
  vec2 xz = wd * s * uS1.z * wv + sd * (vn(vec2(s * 2.2 + uS1.w, uE.w * .03)) - .5) * s * uS1.z * .4;
  return uS0.xyz + vec3(xz.x, rise + s * 2.5, xz.y);
}
void main() {
  float s = float(gl_VertexID >> 1) / 47., v = float(gl_VertexID & 1) * 2. - 1.;
  vec3 c = ctr(s), tg = normalize(ctr(s + .01) - c);
  vec3 E = uE.xyz; if (uM < 0.) E.y = -E.y;
  vec3 sd = normalize(cross(tg, E - c));
  float w = uS0.w * (.3 + 3.2 * s + 2.5 * s * s);
  vec3 p = c + sd * v * w;
  vW = p; vA = vec2(s, v); vL = w;
  p.y *= uM;
  gl_Position = uVP * vec4(p, 1.);
}
`,Na=bt+At+ve+oo+`
uniform vec4 uS0, uS1;
in vec2 vA; in vec3 vW; in float vL; out vec4 o;
void main() {
  float s = vA.x, v = vA.y, t = uE.w;
  vec2 q = vec2(s * uS1.z * .16 - t * .32, v * vL * .2 + uS1.w);
  float n = fbm(q + vec2(fbm(q * .5 + t * .03) * 1.6, 0.));
  float dn = pow(max(1. - v * v, 0.), 1.3) * smoothstep(.3, .72, n + .2 - abs(v) * .15);
  dn *= smoothstep(0., .05, s) * (1. - smoothstep(.45, 1., s)) * (.35 + .65 * clamp(uF2.w + .3, 0., 1.) * step(.5, uS1.x) + (1. - step(.5, uS1.x)));
  vec3 Lv = uF.xyz - vW; float dl = length(Lv);
  vec3 amber = vec3(1., .42, .13) * uF.w * 1.1 / (dl * dl * .35 + 6.) * uS1.x;
  vec3 skl = skyB(vec3(0., 1., 0.)) * 1.3 + skyB(normalize(vec3(uSun.x, .12, uSun.z))) * .5;
  vec3 col = vec3(.5, .49, .48) * skl * .7 + amber;
  float a = clamp(dn, 0., 1.) * (uS1.x > .5 ? .62 : .35);
  o = vec4(col * a, a);
}
`,Ia=bt+At+ve+`
uniform float uM;
layout(location = 1) in vec4 aR; layout(location = 2) in vec4 aQ;
out vec2 vC; out float vS; out vec3 vW; out float vSd;
vec3 ctr(float s, float live, float kh) {
  vec2 wd = normalize(uW.xy + 1e-4);
  float wv = .45 + .7 * uW.w + 1.5 * uW.z;
  float H = 9. + 12. * live;
  vec2 sd = vec2(-wd.y, wd.x);
  vec3 b = uF2.xyz + vec3(0., uY.x * kh * .6 + uY.y * .32 * live, 0.);
  float rise = H * (1. - exp(-s * 4. / (.6 + wv)));
  vec2 xz = wd * s * 75. * wv + sd * (vn(vec2(s * 2.3 + 3.1, uE.w * .02)) - .5) * s * 30.;
  return b + vec3(xz.x, rise + s * 4., xz.y);
}
void main() {
  float k = clamp(uF2.w, 0., 1.2), live = smoothstep(.02, .35, k), kh = .3 + .7 * min(k, 1.);
  // each puff on its own lap (no shared conveyor to watch round)
  float s = fract(uE.w / (27. + 16. * aQ.x) + aR.x);
  float w = .7 + 5. * s + 6. * s * s;
  vec3 c = ctr(s, live, kh) + (vec3(aR.y, aR.z * .6, aR.w) - .5) * w * 1.1;
  float sz = w * (.55 + .55 * aQ.x);
  vec3 E = uE.xyz; if (uM < 0.) E.y = -E.y;
  vec3 f = normalize(E - c), rt = normalize(cross(vec3(0., 1., 0.), f)), up = cross(f, rt);
  vec2 cc = vec2(float(gl_VertexID & 1), float(gl_VertexID >> 1)) * 2. - 1.;
  float an = aQ.y * 6.28 + s * 3. * (aQ.z - .5);
  vec2 rc = mat2(cos(an), sin(an), -sin(an), cos(an)) * cc;
  // high up the plume stops rising and spreads into a flat sheet
  vec3 p = c + (rt * rc.x * (1. + .5 * s) + up * rc.y * (1. - .5 * s * s)) * sz;
  vC = cc; vS = s; vW = p; vSd = aQ.z * 31. + aR.w * 7.;
  p.y *= uM;
  gl_Position = uVP * vec4(p, 1.);
}
`,qa=bt+At+ve+oo+`
in vec2 vC; in float vS; in vec3 vW; in float vSd; out vec4 o;
void main() {
  float r = length(vC);
  if (r > 1.) discard;
  float n = fbm(vC * 1.25 + vSd + vec2(0., -uE.w * .04)) * .75 + vn(vC * 5. + vSd) * .25;
  float dn = (1. - smoothstep(.15, 1., r)) * smoothstep(.32, .78, n + .32 * (1. - r));
  float k = clamp(uF2.w, 0., 1.2);
  dn *= smoothstep(0., .012, vS) * (1. - smoothstep(.45, 1., vS)) * (.3 + .7 * smoothstep(.0, .5, k));
  vec3 Lv = uF.xyz - vW; float dl = length(Lv);
  // amber only within about a flame-height of the fire; above it the smoke is grey-brown against the sky
  vec3 amber = vec3(1., .42, .13) * uF.w * 1.4 / (dl * dl * .3 + 5.) * exp(-dl * dl / (uY.y * uY.y * .7 + 1.));
  vec3 skl = skyB(vec3(0., 1., 0.)) * 1.1 + skyB(normalize(vec3(uSun.x, .4, uSun.z))) * .4;
  vec3 col = vec3(.5, .49, .48) * skl * (.6 + .4 * n) + amber * (.6 + .4 * n);
  float a = clamp(dn, 0., 1.) * .11 * (1. - .6 * vS);
  o = vec4(col * a, a);
}
`,Ba=bt+At+`
layout(location = 0) in vec3 aP; layout(location = 1) in vec4 aN; layout(location = 2) in vec2 aT;
out vec3 vW; out vec3 vN; out float vM; out vec2 vT;
void main() { vW = aP; vN = aN.xyz; vM = aN.w; vT = aT; gl_Position = uVP * vec4(aP, 1.); }
`,Va=bt+At+ve+oo+`
in vec3 vW; in vec3 vN; in float vM; in vec2 vT; out vec4 o;
void main() {
  vec3 n = normalize(vN), P = vW;
  int mt = int(vM + .5);
  vec3 al = vec3(.3), em = vec3(0.);
  if (mt == 0) {
    // falu-red logs, the paint weathered thin and flaking to grey wood, dirt in the undersides
    vec2 t = vec2(vT.y, vT.x * .7);
    float wr = vn(vec2(t.x * 2.6, t.y * 9.) + 3.) * .6 + vn(vec2(t.x * 7., t.y * 20.)) * .4, gr = vn(vec2(t.x * 1.3, t.y * 60.));
    al = vec3(.24, .045, .03) * (.65 + .55 * vn(t * vec2(1.2, 5.))) * (.8 + .35 * gr);
    al = mix(al, vec3(.13, .11, .095) * (.7 + .5 * gr), smoothstep(.6, .75, wr) * .85);
    al *= 1. - .6 * smoothstep(-.2, -.8, n.y);
  } else if (mt == 1) {
    vec2 t = P.xz;
    al = vec3(.05, .045, .04) * (.7 + .6 * vn(t * 2.));
    al = mix(al, vec3(.07, .09, .035), smoothstep(.55, .72, vn(t * .9 + 4.) * .7 + vn(t * 3.) * .3) * .9);
    al = mix(al, vec3(.2, .21, .18), smoothstep(.72, .8, vn(t * 9. + 2.)) * .5);
  } else if (mt == 2) {
    vec2 w = vT;
    float gl = step(.1, w.x) * step(w.x, .9) * step(.1, w.y) * step(w.y, .9) * step(.035, abs(w.x - .5)) * step(.035, abs(w.y - .52));
    al = vec3(.25, .23, .2) * .6;
    em = gl * vec3(1., .5, .19) * (1.1 + 1.6 * exp(-pow(length(w - vec2(.35, .3)) / .3, 2.))) * uV.w * .9;
  } else if (mt == 3) {
    float bd = fract(vT.x * 7.);
    al = vec3(.2, .19, .17) * (.6 + .5 * vn(vec2(vT.x * 40., vT.y * 3.))) * (1. - .6 * (1. - smoothstep(0., .06, bd)));
  } else if (mt == 4) {
    al = vec3(.24, .22, .21) * (.55 + .7 * vn(P.xz * 6. + P.y * 3.));
    al = mix(al, vec3(.33, .35, .3), smoothstep(.6, .7, vn(P.xz * 14. + P.y * 9.)) * .6);
  } else if (mt == 5) {
    // birch bark: chalk-white with horizontal lenticels, black scars, fissured black base
    float ln = smoothstep(.6, .74, vn(vec2(vT.x * 6., vT.y * 26.)));
    float sc = smoothstep(.7, .8, vn(vec2(vT.x * 4., vT.y * 2.2) + 5.));
    float base = 1. - smoothstep(.4, 1.8, vT.y + .5 * vn(vT * vec2(5., 1.)));
    al = vec3(.62, .6, .55) * (.85 + .3 * vn(vT * vec2(3., 9.)));
    al = mix(al, vec3(.04, .035, .03), max(max(ln * .9, sc * .95), base * smoothstep(.25, .6, vn(vT * vec2(7., 5.)) + base * .5)));
  } else if (mt == 7) {
    float rg = .5 + .5 * sin(vT.x * 34. + vn(vT * 9.) * 3.);
    al = vec3(.23, .19, .15) * (.75 + .25 * rg) * (.8 + .4 * vn(P.xz * 30.));
  } else { al = vec3(.03); }
  vec3 col = al * (skyIrr(n) + fireL(P, n, .1765)) + em;
  o = vec4(col, 1.);
}
`,Ca=bt+At+`
layout(location = 1) in vec4 aI; layout(location = 2) in vec4 aJ;
out vec2 vC; out vec3 vW;
void main() {
  vec3 c = aI.xyz;
  vec3 rt = normalize(cross(vec3(0., 1., 0.), uE.xyz - c));
  float cx = float(gl_VertexID & 1) * 2. - 1., cy = float(gl_VertexID >> 1);
  vec3 p = c + rt * cx * aI.w + vec3(0., cy * aJ.z, 0.);
  vC = vec2((aJ.x + .5 + cx * aJ.y * .499) / 4., cy);
  vW = p;
  gl_Position = uVP * vec4(p, 1.);
}
`,Ga=bt+At+ve+oo+`
uniform sampler2D uB;
in vec2 vC; in vec3 vW; out vec4 o;
void main() {
  float a = texture(uB, vC).r * smoothstep(0., .1, vC.y) * (1. - smoothstep(.96, 1., vC.y));
  if (a < .02) discard;
  vec3 col = vec3(.009, .013, .006) * uSun.w + skyB(vec3(0., 1., 0.)) * .035 + fireL(vW, normalize(uF.xyz - vW), .1765) * .012;
  o = vec4(col * a, a);
}
`,Ha=bt+At+`
uniform sampler2D uC; uniform vec4 uG, uG2;
in vec2 vQ; out vec4 o;
void main() {
  vec2 uv = vQ * .5 + .5;
  vec3 c = texture(uC, uv).rgb;
  vec2 a = uv - uG.xy;
  float d1 = length(a * vec2(1., .75));
  vec3 gc = vec3(1., .45, .16);
  c += gc * uG2.x * .14 * exp(-d1 * d1 / .0008);
  c *= uX.w;
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  c = clamp(c, 0., 1.);
  float l = dot(c, vec3(.3, .55, .15));
  c = mix(c, c * vec3(.94, .98, 1.08), (1. - smoothstep(.0, .35, l)) * .25);
  c = pow(c, vec3(1. / 2.2));
  o = vec4(c, 1.);
}
`,ae=(o,a,d)=>Math.max(a,Math.min(d,o)),Mt=(o,a,d)=>{const rt=ae((d-o)/(a-o),0,1);return rt*rt*(3-2*rt)},ia=new Float32Array(1),Oa=new Uint32Array(ia.buffer),Uo=o=>{ia[0]=o;const a=Oa[0],d=a>>>16&32768,rt=(a>>>23&255)-112;return rt<=0?d:rt>30?d|31743:d|rt<<10|(a&8388607)>>>13},la=o=>{const a=Math.PI+o*15*ct,d=-Math.cos(Eo)*Math.sin(a),rt=Math.sin(Eo)*Math.cos(Fo)-Math.cos(Eo)*Math.cos(a)*Math.sin(Fo),Vt=Math.sin(Eo)*Math.sin(Fo)+Math.cos(Eo)*Math.cos(a)*Math.cos(Fo);return[d,Vt,rt]},fa=typeof FinalizationRegistry=="function"?new FinalizationRegistry(o=>{try{if(o.gl.isContextLost())return;o.tex.forEach(a=>o.gl.deleteTexture(a)),o.vao.forEach(a=>{o.gl.deleteBuffer(a.b),o.gl.deleteVertexArray(a)})}catch{}}):null;function Xa(o){if(o.__c588)return o.__c588;const a=performance.now(),d=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float"),rt=o.getParameter(o.MAX_TEXTURE_SIZE);o.getExtension("KHR_parallel_shader_compile");const Vt=(e,i)=>{const c=o.createShader(e);return o.shaderSource(c,i),o.compileShader(c),c},ot=Vt(o.VERTEX_SHADER,Ra),Ct={env:[ot,Aa],rock:[za,ga],log:[Sa,_a],flm:[Fa,Pa],spk:[La,Ua],puf:[Ia,qa],fin:[ot,Ha]},Et={smk:[Da,Na],obj:[Ba,Va],crn:[Ca,Ga]},Pt={},Pe=e=>{for(const i in e){const[c,m]=e[i],h=o.createProgram(),p=typeof c=="string"?Vt(o.VERTEX_SHADER,c):c,k=Vt(o.FRAGMENT_SHADER,m);o.attachShader(h,p),o.attachShader(h,k),o.linkProgram(h),Pt[i]={p:h,vs:p,fs:k}}o.flush()};Pe(Ct);const _=o.getExtension("KHR_parallel_shader_compile"),Gt=performance.now();let Lt=5802684;const z=()=>{Lt=Lt+1831565813|0;let e=Math.imul(Lt^Lt>>>15,1|Lt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},kt=new Uint8Array(65536);for(let e=0;e<65536;e++)kt[e]=Math.floor(z()*256);const V=(e,i)=>{const c=Math.floor(e),m=Math.floor(i);let h=e-c,p=i-m;h=h*h*(3-2*h),p=p*p*(3-2*p);const k=c&255,M=m&255,E=k+1&255,A=M+1&255,T=kt[M*256+k],y=kt[M*256+E],D=kt[A*256+k],g=kt[A*256+E],P=T+(y-T)*h,C=D+(g-D)*h;return(P+(C-P)*p)/255},Oe=Math.cos(-.65),Do=Math.sin(-.65),Ut=[[-7.5,8.5,9,3.4,1],[9.5,5.5,6.5,3,.7],[0,-1.5,8,4.5,.55],[-14,2,7,3.5,.8],[16,-2,9,4,.9],[-4,-12,10,5,1.1],[7,-18,9,5,.9],[-18,-16,11,6,1.3],[3,3.5,3.2,1.8,.35],[-3,4.6,2.6,1.4,.3]];for(let e=0;e<14;e++)Ut.push([(z()-.5)*90,-10-z()*55,5+z()*9,3+z()*4,.5+z()*1.2]);const ye=[[-3.3,3.5,1.7,1.15,.3],[3.5,3.8,2.1,1.3,.2],[-.9,4.3,.9,.65,.12],[-1.6,1.6,1.3,1,.1],[2.2,1.2,1.4,1.1,-.08],[5.5,1.5,1.8,1.4,.25],[-6,1.8,2,1.5,.3]],ao=e=>5.6-.0105*e*e+2.6*(V(e*.06+3.1,7.7)-.5),Re=(e,i)=>{let c=.15*(ao(e)-i);for(let m=0;m<Ut.length;m++){const h=Ut[m],p=e-h[0],k=i-h[1];if(p>h[2]||p<-h[2]||k>h[2]||k<-h[2])continue;const M=(p*Oe+k*Do)/h[2],E=(k*Oe-p*Do)/h[3],A=M*M+E*E;if(A<1){const T=1-A;c+=h[4]*T*T*(M>0?1-.3*M:1)}}c+=.7*(V(e/11+1.3,i/11+4.2)-.5)+.24*(V(e/3.3+5,i/3.3+2)-.5)+.07*(V(e/1.1+9,i/1.1)-.5);for(const m of ye){const h=(e-m[0])/m[2],p=(i-m[1])/m[3],k=h*h+p*p;if(k<1){const M=1-k;c+=m[4]*M*M*(3-2*M)}}return c>-.5&&c<.45&&(c+=.16*(V(e/.9+31,i/.9+7)-.5)*(1-Math.abs(c- -.02)/.48)),c<0?c*2.2:c},ko=[[4.6,2.2,.7,.1],[-4.2,-2.4,.55,0],[5.8,-1.2,.5,-.1],[-1.5,3.5,.45,.2]],no={c:1,s:0,ax:6.4,az:4.3,hs:1,o:0,f:0,k:0,B:ko,ext:21,J:[[3.9,-1.9,1.05,.26,.83,.56,.62,.05],[2.6,2.6,.8,.18,.56,-.83,.7,-.04],[-4.4,.9,.9,.22,.83,.56,.55,.06],[-2.2,-3,.65,.16,.56,-.83,.8,0]]},Le=e=>e>=1?-1:Math.pow(1-e*e*e*e*e*e,.28)*(1-.18*e*e),Xe=(e,i,c,m)=>{c=c||no;const h=e*c.c+i*c.s,p=i*c.c-e*c.s,k=c.o,M=(h/c.ax)**2+(p/c.az)**2;if(M>(c.f===3?3.4:1.85)&&(c.f!==4||((h-c.k)/3.4)**2+(p/2.6)**2>1.85))return-.4-(M-1)*2.4;const E=M+.35*(V(Math.atan2(h,p)*1.6+5+k,2)-.5),A=c.e||.7;let T=E<1?1.75*c.hs*Math.pow(1-E,A)-.4:-.4-(E-1)*2.4;if(c.f===0)T+=.7*Math.exp(-((h-3.4)**2/3+(p+1.4)**2/1.8))+.45*Math.exp(-((h+3.2)**2/2.4+(p-1)**2/1.5));else if(c.f===1){const y=h/c.ax;T+=y>.35?-1.1*Mt(.35,.62,y)*c.hs:.35*(1-y*y)}else if(c.f===2){const y=Math.abs(p-c.k-.22*h+.25*(V(h*.5+k,4)-.5)*2);T-=2.6*(1-Mt(.18,.75,y))*Mt(-.2,.5,T)}else if(c.f===4){const y=h-c.k,D=(y/3.4)**2+(p/2.6)**2,g=D<1?1.25*c.hs*Math.pow(1-D,A)-.4:-.4-(D-1)*2.4;T=Math.max(T,g)}T+=.75*(V(h/1.9+40+k,p/1.9+11)-.5)+.3*(V(h/.7+3,p/.7+77+k)-.5)+.1*(V(h/.3+9+k,p/.3)-.5);for(const y of c.B){const D=h-y[0],g=p-y[1];if(c.f===3){if(D>y[2]*1.85||D<-y[2]*1.85||g>y[2]*1.85||g<-y[2]*1.85)continue;const P=D*y[4]+g*y[5],C=(g*y[4]-D*y[5])*1.4,yt=1+.1*(V(P*1.3+y[0]*7,C*1.3+k)-.5),q=Math.pow(Math.pow(Math.abs(P),4)+Math.pow(Math.abs(C),4),.25)/(y[2]*yt);q<1&&(T=Math.max(T,y[3]+(.3+.45*y[2])*Le(q)*(.8+.4*V(P*1.6+y[0]*3,C*1.6+k+9))+.06*P-.04*C+.07*(V(P*4.5+k,C*4.5+y[1])-.5)))}else{const P=D*D+g*g;P<y[2]*y[2]&&(T=Math.max(T,y[3]+Math.sqrt(y[2]*y[2]-P)*.85))}}if(!m&&c.J)for(const y of c.J){const D=h-y[0],g=p-y[1];if(D*D+g*g>y[2]*y[2]*3.3)continue;const P=D*y[4]+g*y[5],C=(g*y[4]-D*y[5])/y[6],yt=1+.12*(V(P*1.7+y[1]*5,C*1.7+k+3)-.5),q=Math.pow(Math.pow(Math.abs(P),5)+Math.pow(Math.abs(C),5),.2)/(y[2]*yt);c.Jg?q<1.6&&(T+=y.r*Mt(1.6,.4,q)*(1+y[7]*P*3)+.03*(V(P*3+k,C*3)-.5)*Mt(1.6,1,q)):q<1.6&&(T=Math.max(T,(q<1?y[3]-.2+.2*Le(q):y[3]-.2-1.6*y[2]*(q-1))+y[7]*P+.03*(V(P*3+k,C*3)-.5)))}return T},so=e=>{if(e.J)for(const i of e.J)i.ok||(i.r=i[3],i[3]+=Xe(i[0]*e.c-i[1]*e.s,i[1]*e.c+i[0]*e.s,e,!0),i.ok=1);return e};so(no);const N=120,K=300,at=160,To=N*K+at*at,Ue=N*K,No=(e,i,c,m,h,p,k,M)=>{let E=m*M-h*k,A=h*p-c*M,T=c*k-m*p;A<0&&(E=-E,A=-A,T=-T);const y=Math.sqrt(E*E+A*A+T*T)||1;e[i+3]=E/y,e[i+4]=A/y,e[i+5]=T/y},We=new Float32Array(N),co=new Float32Array(K),Ae=new Float32Array(K);for(let e=1;e<N;e++)We[e]=.3*Math.pow(85/.3,(e-1)/(N-2));for(let e=0;e<K;e++)co[e]=Math.sin(e/K*U),Ae[e]=Math.cos(e/K*U);const ne=(e,i,c,m)=>{for(let h=0;h<N;h++){const p=We[h],k=p>14;for(let M=0;M<K;M++){const E=i+co[M]*p,A=c+Ae[M]*p,T=(h*K+M)*7;let y=k&&M&1?0:Re(E,A);if(m)for(const D of m){const g=(E-D[0])/D[2],P=(A-D[1])/D[3],C=g*g+P*P;C<1&&(y=Math.max(y,D[4]+D[5]*Math.pow(1-C,.45)))}e[T]=E,e[T+1]=y,e[T+2]=A,e[T+6]=0}if(k)for(let M=1;M<K;M+=2){const E=(h*K+M)*7;e[E+1]=.5*(e[E-6]+e[(h*K+(M+1)%K)*7+1])}}for(let h=0;h<N;h++)for(let p=0;p<K;p++){const k=(h*K+p)*7;if(h===0){e[k+3]=0,e[k+4]=1,e[k+5]=0;continue}const M=(h*K+(p+1)%K)*7,E=(h*K+(p+K-1)%K)*7,A=(Math.min(N-1,h+1)*K+p)*7,T=((h-1)*K+p)*7;No(e,k,e[M]-e[E],e[M+1]-e[E+1],e[M+2]-e[E+2],e[A]-e[T],e[A+1]-e[T+1],e[A+2]-e[T+2])}},ue=(e,i,c)=>{const m=(i||no).ext;for(let h=0;h<at;h++)for(let p=0;p<at;p++){const k=(p/(at-1)-.5)*m,M=(h/(at-1)-.5)*m,E=(c+h*at+p)*7;e[E]=k,e[E+1]=Xe(k,M,i),e[E+2]=M,e[E+6]=1}for(let h=0;h<at;h++)for(let p=0;p<at;p++){const k=(c+h*at+p)*7,M=c+h*at,E=(M+Math.min(at-1,p+1))*7,A=(M+Math.max(0,p-1))*7,T=(c+Math.min(at-1,h+1)*at+p)*7,y=(c+Math.max(0,h-1)*at+p)*7;No(e,k,e[E]-e[A],e[E+1]-e[A+1],e[E+2]-e[A+2],e[T]-e[y],e[T+1]-e[y+1],e[T+2]-e[y+2])}},me=new Float32Array(To*7);ne(me,0,0),ue(me,null,Ue);const zt=new Uint16Array((N-1)*K*6+(at-1)*(at-1)*6);let Wt=0;for(let e=0;e<N-1;e++)for(let i=0;i<K;i++){const c=e*K+i,m=e*K+(i+1)%K,h=c+K,p=m+K;zt[Wt++]=c,zt[Wt++]=h,zt[Wt++]=m,zt[Wt++]=m,zt[Wt++]=h,zt[Wt++]=p}for(let e=0;e<at-1;e++)for(let i=0;i<at-1;i++){const c=Ue+e*at+i,m=c+1,h=c+at,p=h+1;zt[Wt++]=c,zt[Wt++]=h,zt[Wt++]=m,zt[Wt++]=m,zt[Wt++]=h,zt[Wt++]=p}const Me=new Uint8Array(128*128);for(let e=0;e<128;e++)for(let i=0;i<128;i++)Me[e*128+i]=Math.round(ae((Re((i+.5)/128*96-48,(e+.5)/128*96-48)+3)/6,0,1)*255);const De=[],ut=(e,i,c,m)=>De.push(e[0],e[1],e[2],i[0],i[1],i[2],c,m[0],m[1]),Tt=[-8.6,-23.5],se=22*ct,xt=[Math.sin(se),Math.cos(se)],W=[Math.cos(se),-Math.sin(se)],Rt=1.65,dt=1.35,$=1.95,ce=2.95,Dt=.4,re=.11;let je=1e9;for(let e=-Rt;e<=Rt+.01;e+=.33)for(let i=-dt;i<=dt+.01;i+=.45)je=Math.min(je,Re(Tt[0]+W[0]*e+xt[0]*i,Tt[1]+W[1]*e+xt[1]*i));je+=.22;const ft=(e,i,c)=>[Tt[0]+W[0]*e+xt[0]*c,je+i,Tt[1]+W[1]*e+xt[1]*c],Ne=(e,i,c,m,h,p,k,M,E)=>{const A=i[0]-e[0],T=i[1]-e[1],y=i[2]-e[2],D=m[0]-e[0],g=m[1]-e[1],P=m[2]-e[2];let C=[T*P-y*g,y*D-A*P,A*g-T*D];const yt=Math.hypot(C[0],C[1],C[2])||1;C=[C[0]/yt,C[1]/yt,C[2]/yt],ut(e,C,h,p),ut(i,C,h,k),ut(c,C,h,M),ut(e,C,h,p),ut(c,C,h,M),ut(m,C,h,E)},ro=(e,i,c,m,h,p,k,M,E)=>{const A=i[0]-e[0],T=i[1]-e[1],y=i[2]-e[2],D=Math.hypot(A,T,y),g=[A/D,T/D,y/D];let P=Math.abs(g[1])>.9?[1,0,0]:[0,1,0];const C=[g[1]*P[2]-g[2]*P[1],g[2]*P[0]-g[0]*P[2],g[0]*P[1]-g[1]*P[0]],yt=Math.hypot(...C);P=C.map(Q=>Q/yt);const q=[g[1]*P[2]-g[2]*P[1],g[2]*P[0]-g[0]*P[2],g[0]*P[1]-g[1]*P[0]],lt=[];for(let Q=0;Q<=p;Q++){const st=Q/p,It=c(st),jt=m(st),Kt=[e[0]+A*st+jt[0],e[1]+T*st+jt[1],e[2]+y*st+jt[2]],J=[];for(let gt=0;gt<=k;gt++){const pe=gt/k*U,te=Math.cos(pe),_e=Math.sin(pe),ee=It*(1+.05*(V(M*7+st*3,gt%k*1.7+M)-.5)),St=[P[0]*te+q[0]*_e,P[1]*te+q[1]*_e,P[2]*te+q[2]*_e];J.push([[Kt[0]+St[0]*ee,Kt[1]+St[1]*ee,Kt[2]+St[2]*ee],St,[gt/k,st*D]])}lt.push(J)}for(let Q=0;Q<p;Q++)for(let st=0;st<k;st++){const It=lt[Q][st],jt=lt[Q][st+1],Kt=lt[Q+1][st],J=lt[Q+1][st+1];for(const gt of[It,jt,J,It,J,Kt])ut(gt[0],gt[1],h,gt[2])}if(E)for(const[Q,st]of[[0,-1],[p,1]]){const It=lt[Q],jt=[0,1,2].map(J=>It.reduce((gt,pe)=>gt+pe[0][J],0)/It.length),Kt=g.map(J=>J*st);for(let J=0;J<k;J++)ut(jt,Kt,7,[0,0]),ut(It[J][0],Kt,7,[1,J]),ut(It[J+1][0],Kt,7,[1,J+1])}},Io=(e,i,c)=>ro(e,i,()=>re,m=>[0,.025*Math.sin(Math.PI*m)*(V(c,1)-.5),0],0,3,8,c,!0),tt=.24;for(let e=0;e<10;e++){const i=re+e*2*re*.9;for(const c of[-dt,dt])Io(ft(-Rt-tt-.03*V(e,c),i,c),ft(Rt+tt+.03*V(c,e),i,c),e*3.1+c)}for(let e=0;;e++){const i=re*1.9+e*2*re*.9;if(i>ce-.12)break;const c=i<$?1:1-(i-$)/(ce-$),m=i<$?tt:-.02;for(const h of[-Rt,Rt])Io(ft(h,i,-dt*c-m),ft(h,i,dt*c+m),e*5.3+h)}const ie=$+re-Dt*(ce-$)/dt,mt=7;for(let e=0;e<mt;e++){const i=-Rt-.42+e/mt*(2*Rt+.84),c=i+(2*Rt+.84)/mt,m=.07*Math.sin(Math.PI*e/mt)+.02*(V(e,1)-.5),h=.07*Math.sin(Math.PI*(e+1)/mt)+.02*(V(e+1,1)-.5),p=.03*(V(e,4)-.5),k=.03*(V(e+1,4)-.5);for(const M of[1,-1]){const E=ft(i,ie-m*.4+p,M*(dt+Dt)),A=ft(c,ie-h*.4+k,M*(dt+Dt)),T=ft(c,ce+re-h,0),y=ft(i,ce+re-m,0);M>0?Ne(E,A,T,y,1,[i,0],[c,0],[c,2],[i,2]):Ne(A,E,y,T,1,[c,0],[i,0],[i,2],[c,2]);const D=[E[0],E[1]-.13,E[2]],g=[A[0],A[1]-.13,A[2]];M>0?Ne(D,g,A,E,3,[i,0],[c,0],[c,.13],[i,.13]):Ne(g,D,E,A,3,[c,0],[i,0],[i,.13],[c,.13])}}const Zt=dt+re+.02;Ne(ft(.3,.95,Zt),ft(.88,.95,Zt),ft(.88,1.42,Zt),ft(.3,1.42,Zt),2,[0,0],[1,0],[1,1],[0,1]),Ne(ft(-1.25,.08,Zt),ft(-.6,.08,Zt),ft(-.6,1.78,Zt),ft(-1.25,1.78,Zt),3,[0,0],[.65,0],[.65,1.7],[0,1.7]);for(const[e,i]of[[-Rt,-dt],[Rt,-dt],[-Rt,dt],[Rt,dt],[0,dt],[0,-dt]]){const c=ft(e,-.12,i);ro([c[0],c[1]-.2,c[2]],[c[0],c[1]+.14,c[2]],m=>.26*Math.sqrt(Math.max(0,1-(2*m-1)**2))+.02,()=>[0,0,0],4,4,7,e*3+i,!1)}const I=[.75,-.5],io=ce-Math.abs(I[1])/dt*(ce-$);ro(ft(I[0],io-.1,I[1]),ft(I[0],ce+.95,I[1]),()=>.085,()=>[0,0,0],6,1,8,9,!1);const Ie=ft(.6,1.18,dt+.4),Ro=ft(I[0],ce+1,I[1]),ze=[],jo=(e,i,c,m,h)=>{const p=Re(e,i)-.1,k=.07+.08*m,M=h[0],E=h[1],A=(V(m*40,1)-.5)*.5,T=(V(1,m*40)-.5)*.5,y=q=>[M*q*q*c+A*Math.sin(q*7+m*9)*q,0,E*q*q*c+T*Math.sin(q*5+m*4)*q],D=.9;ro([e,p,i],[e,p+c*D,i],q=>k*(1-.8*q)+(q<.05?(.05-q)*2.2*k*6:0),y,5,9,8,m*10,!1);const g=q=>{const lt=y(q/D);return[e+lt[0],p+c*q,i+lt[2]]},P=Math.floor(m*4)%4,C=V(m*9,2)>.5?1:-1,yt=g(.26);if(ze.push(yt[0],yt[1],yt[2],c*.29,P,C,c*.78,0),V(m*13,5)>.45){const q=g(.42),lt=m*40;ze.push(q[0]+Math.sin(lt)*c*.1,q[1],q[2]+Math.cos(lt)*c*.1,c*.2,(P+1+Math.floor(m*7)%3)%4,-C,c*.52,0)}};[[-15,-19,1],[-3,-27,2],[-19,-31,1],[-11,-36,1],[2.5,-18,3],[-23,-24,1],[6,-31,1],[-8,-15.5,1],[12,-24,2],[-27,-14,1],[-31,-6,1],[24,-11,1],[20,-3.5,2],[-7.4,-19.6,1],[-10.6,-20.2,2],[-5,-22.8,1],[-12.4,-27.5,1],[-1.5,-21,1]].forEach(e=>{const i=z();for(let c=0;c<e[2];c++){const m=c?z():i,h=z()*U,p=c?.25+.15*z():0,k=c?.035+.03*z():.01+.03*z()*z(),M=c?h:z()*U;jo(e[0]+Math.sin(h)*p,e[1]+Math.cos(h)*p,(c?8:10)+z()*(c?6:9),m,[Math.sin(M)*k,Math.cos(M)*k])}});const Ke=320,qe=448,Ao=Ke*4,lo=new Uint8Array(Ao*qe),Ye=(e,i,c,m,h)=>{const p=Math.max(0,Math.floor(i-m-1)),k=Math.min(Ke-1,Math.ceil(i+m+1)),M=Math.max(0,Math.floor(c-m-1)),E=Math.min(qe-1,Math.ceil(c+m+1));for(let A=M;A<=E;A++)for(let T=p;T<=k;T++){const y=Math.hypot(T+.5-i,A+.5-c),D=Math.min(1,m+.5-y)*h;if(D>0){const g=A*Ao+e+T,P=D*255;P>lo[g]&&(lo[g]=P)}}},zo=(e,i,c,m,h,p,k,M)=>{const E=Math.ceil(Math.hypot(m-i,h-c)/.7)+1;for(let A=0;A<=E;A++){const T=A/E;Ye(e,i+(m-i)*T,c+(h-c)*T,p+(k-p)*T,M)}};for(let e=0;e<4;e++){const i=e*Ke,c=Ke/2,m=e*31+7;let h=c,p=0;for(let M=1;M<=24;M++){const E=M/24,A=c+(V(m,E*3)-.5)*18*E,T=E*qe*.93;zo(i,h,p,A,T,3.6*(1-E)+.7,3.6*(1-E)+.5,1),h=A,p=T}const k=15+e*2;for(let M=0;M<k;M++){const E=.04+.82*(M+z()*.8)/k,A=(M+e)%2?1:-1,T=Math.pow(Math.sin(Math.PI*Math.min(1,E*.95+.12)),.75),y=(70-48*E+(z()-.5)*22)*ct,D=Ke*.47*T*(.65+.45*z()),g=(.25+.5*(1-E))*(.7+.6*z()),P=c+(V(m,E*3)-.5)*18*E,C=E*qe*.97,yt=Q=>[P+A*Math.sin(y)*D*Q,C+Math.cos(y)*D*Q-g*D*Q*Q];let q=yt(0);for(let Q=1;Q<=12;Q++){const st=yt(Q/12);zo(i,q[0],q[1],st[0],st[1],2.2*(1-Q/12)+.45,2.2*(1-(Q+1)/12)+.45,1),q=st}const lt=Math.round(D/6.5);for(let Q=0;Q<lt;Q++){const st=.2+.8*z(),It=yt(st),jt=qe*(.06+.3*z()*(1-E*.6))*(.5+st*.7),Kt=A*(.04+.12*z()),J=4+6*z();let gt=It[0],pe=It[1];const te=Math.max(4,Math.round(jt/5));for(let _e=1;_e<=te;_e++){const ee=_e/te,St=It[0]+Kt*jt*ee+J*Math.sin(Math.PI*ee)*A*.5,Ee=It[1]+J*ee*(1-ee)*2-jt*ee;zo(i,gt,pe,St,Ee,.42,.32,.85);const Ot=V(St/34+m,Ee/34+e*5);z()<.15+.85*Mt(.4,.7,Ot)&&Ye(i,St+(z()-.5)*6,Ee+(z()-.5)*5,1.1+1.2*z(),.95);const _t=V(St*1.7+e*13,Ee*1.3);_t>.38&&Ye(i,St+(_t-.62)*10,Ee+(V(Ee*.9,St*.7+e)-.5)*7,1.4+2.4*(_t-.38),.9),gt=St,pe=Ee}}}}const fo=new Float32Array(De),ho=300,Be=160,vo=new Float32Array((ho+Be)*8);for(let e=0;e<ho+Be;e++){for(let i=0;i<7;i++)vo[e*8+i]=z();vo[e*8+7]=e>=ho?1:0}const Ht=11025,it=new Float32Array(Math.floor(Ht*2.2));{let e=0;for(let i=0;i<it.length;i++){const c=i/Ht,m=c<.35?640+560*Mt(0,.35,c):c<1.4?1200+20*Math.sin(c*34):1200-260*Mt(1.4,2.1,c);e+=U*m/Ht;const h=Mt(0,.12,c)*(1-Mt(1.7,2.2,c));it[i]=(Math.sin(e)*.8+Math.sin(2*e)*.15+Math.sin(3*e)*.05)*h*.7}}const ge=(e,i,c)=>{for(const m in e){const h=Pt[m].p,p=o.getProgramParameter(h,o.LINK_STATUS);if(He&&i.push(m+" "+(performance.now()-c).toFixed(0)),!p)throw new Error("588 "+m+": "+o.getProgramInfoLog(h)+o.getShaderInfoLog(Pt[m].fs)+(Pt[m].vs?o.getShaderInfoLog(Pt[m].vs):""));const k=o.getUniformBlockIndex(h,"UB");k!==o.INVALID_INDEX&&o.uniformBlockBinding(h,k,0),o.useProgram(h);for(const[M,E]of[["uN",0],["uT",1],["uRf",2],["uL",3],["uHm",4],["uC",5],["uB",6],["uS",7]]){const A=o.getUniformLocation(h,M);A&&o.uniform1i(A,E)}Pt[m].uM=o.getUniformLocation(h,"uM"),Pt[m].uS0=o.getUniformLocation(h,"uS0"),Pt[m].uS1=o.getUniformLocation(h,"uS1"),Pt[m].uG=o.getUniformLocation(h,"uG"),Pt[m].uG2=o.getUniformLocation(h,"uG2")}},Ko=()=>{const e=performance.now(),i=[];ge(Ct,i,e),He&&console.warn("588 link wait "+(performance.now()-e).toFixed(0)+" | "+i.join(", "))};let Ve=0;const $t=e=>{if(Ve===0&&(Pe(Et),Ve=1,!e))return!1;if(Ve===1&&(e||!_||Object.keys(Et).every(i=>o.getProgramParameter(Pt[i].p,_.COMPLETION_STATUS_KHR)))){const i=o.getParameter(o.CURRENT_PROGRAM);ge(Et,[],0),o.useProgram(i),Ve=2}return Ve===2},le=performance.now(),Se=(e,i,c,m,h,p,k,M)=>{const E=o.createTexture();return o.bindTexture(o.TEXTURE_2D,E),o.texImage2D(o.TEXTURE_2D,0,c,e,i,0,m,h,p),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,k),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,k),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,M),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,M===o.REPEAT&&i===e?o.REPEAT:o.CLAMP_TO_EDGE),E};o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.bindBuffer(o.PIXEL_UNPACK_BUFFER,null);const go=Se(256,256,o.R8,o.RED,o.UNSIGNED_BYTE,kt,o.LINEAR,o.REPEAT),qo=Se(128,128,o.R8,o.RED,o.UNSIGNED_BYTE,Me,o.LINEAR,o.CLAMP_TO_EDGE),Nt=(e,i,c)=>{const m=o.createBuffer();return o.bindBuffer(e,m),o.bufferData(e,i,c||o.STATIC_DRAW),m},O=o.createVertexArray(),So=o.createVertexArray();o.bindVertexArray(So),Nt(o.ARRAY_BUFFER,me),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,3,o.FLOAT,!1,28,0),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,28,12);const Bo=Nt(o.ELEMENT_ARRAY_BUFFER,zt),uo=new Uint16Array((at-1)*(at-1)*6);for(let e=0;e<uo.length;e++)uo[e]=zt[(N-1)*K*6+e]-Ue;o.bindVertexArray(null);const Yo=Nt(o.ELEMENT_ARRAY_BUFFER,uo),Vo=(e,i)=>{const c=o.createVertexArray();return o.bindVertexArray(c),c.b=Nt(o.ARRAY_BUFFER,e),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,3,o.FLOAT,!1,28,0),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,28,12),o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,i),o.bindVertexArray(null),c},mo=(e,i,c)=>{const m=new Float32Array(Ue*7);return ne(m,e,i,c),Vo(m,Bo)},Co=e=>{const i=new Float32Array(at*at*7);return ue(i,e,0),Vo(i,Yo)},_o=o.createVertexArray();o.bindVertexArray(_o),Nt(o.ARRAY_BUFFER,fo),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,3,o.FLOAT,!1,36,0),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,36,12),o.enableVertexAttribArray(2),o.vertexAttribPointer(2,2,o.FLOAT,!1,36,28);const po=e=>{const i=o.createVertexArray();return o.bindVertexArray(i),i.b=Nt(o.ARRAY_BUFFER,e),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(1,1),o.enableVertexAttribArray(2),o.vertexAttribPointer(2,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(2,1),o.bindVertexArray(null),i},be=po(vo),xo=po(new Float32Array(ze)),wo=o.createTexture();o.bindTexture(o.TEXTURE_2D,wo),o.texImage2D(o.TEXTURE_2D,0,o.R8,Ao,qe,0,o.RED,o.UNSIGNED_BYTE,lo),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.generateMipmap(o.TEXTURE_2D),o.bindVertexArray(null);const Ce=o.createBuffer();o.bindBuffer(o.UNIFORM_BUFFER,Ce),o.bufferData(o.UNIFORM_BUFFER,76*4,o.DYNAMIC_DRAW),He&&console.warn("588 shared tail "+(performance.now()-le).toFixed(1)),He&&console.warn("588 make: submit "+(Gt-a).toFixed(0)+" bake "+(le-Gt).toFixed(0));const Qe={linkAll:Ko,late:$t,crPts:ze,P:Pt,fl:d,mts:rt,nz:V,G:Re,SKF:Xe,SK0:no,placeJ:so,BOUL:ko,shoreVao:mo,skVao:Co,inst:po,tN:go,tHm:qo,vEmpty:O,vRock:So,nRock:zt.length,nShore:(N-1)*K*6,nSk:uo.length,vObj:_o,nObj:fo.length/9,vSpk:be,NSP:ho,NSB:Be,vCrn:xo,nCrn:ze.length/8,tB:wo,ubo:Ce,winPos:Ie,chimTop:Ro,loon:it,LR:Ht,rts:{}};return o.__c588=Qe,Qe}const Wa=(o,a,d)=>{const rt=a.rts[d];if(rt&&rt.size===d)return rt;const Vt=Ct=>{const Et=o.createTexture();o.bindTexture(o.TEXTURE_2D,Et),a.fl?o.texImage2D(o.TEXTURE_2D,0,o.RGBA16F,Ct,Ct,0,o.RGBA,o.HALF_FLOAT,null):o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,Ct,Ct,0,o.RGBA,o.UNSIGNED_BYTE,null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE);const Pt=o.createRenderbuffer();o.bindRenderbuffer(o.RENDERBUFFER,Pt),o.renderbufferStorage(o.RENDERBUFFER,o.DEPTH_COMPONENT24,Ct,Ct);const Pe=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,Pe),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Et,0),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.RENDERBUFFER,Pt),o.bindFramebuffer(o.FRAMEBUFFER,null),{t:Et,fb:Pe,s:Ct}},ot=Math.max(64,Math.round(d/2));return a.rts[d]={size:d,main:Vt(d),mir:Vt(ot)}};ra.add({num:588,name:"Midsummer Fire",fam:"Vistas",recipe:"The granite shore of a lake on Midsummer Eve, with a pile of logs burning on a little rock island under a sky that never gets dark, and a red sauna with a lit window up the slope. The hour, the sky and the neighbours' fires change every mint. Tap to stir the fire so a log slumps in and sparks climb, drag to send a breeze across the lake, or hold to let the night run on as the fire burns down and the sun comes back up.",interactive:"Tap to stir the fire: a timber slumps into the pile, the flames rise and sparks climb; drag to send a breeze across the lake (catspaws break the mirror, flames and smoke lean); hold to let the white night run on through the small hours as the fire burns down and the sun comes back up.",music:!0,gl:!0,fps:30,seed:0,make(o){const a=o.gl,d=Xa(a),rt=o.size,Vt=Wa(a,d,rt),ot=!!o.home,Ct=o.hash.slice(2).padEnd(64,"0"),Et=t=>{let n=parseInt(Ct.slice(0,8),16)^t,s=parseInt(Ct.slice(8,16),16),r=parseInt(Ct.slice(16,24),16)^t*7,f=parseInt(Ct.slice(24,32),16);const x=()=>{n|=0,s|=0,r|=0,f|=0;const u=(n+s|0)+f|0;return f=f+1|0,n=s^s>>>9,s=r+(r<<3)|0,r=r<<21|r>>>11,r=r+u|0,(u>>>0)/4294967296};for(let u=0;u<12;u++)x();return x};He&&console.warn("588 make start");const Pt=performance.now(),Pe=Et(1416),_=Et(40503),Gt=Et(20973),Lt=Et(11325),z=Et(32277),kt=Et(15217),V=(t,n,s,r)=>{let f=0;for(const l of n)f+=l[1];let x=Pe()*f,u=n[n.length-1];for(const l of n)if(x-=l[1],x<0){u=l;break}return ot?u=n[s]:r&&(u=r(u)||u),o.trait(t,u[0]),u[2]},Oe=(t,n)=>{let s=0;for(const r of n)s+=r[1];t*=s;for(const r of n)if(t-=r[1],t<0)return r;return n[n.length-1]},Do=V("Hour",[["Before midnight",4,-.85],["Solar midnight",3,0],["Small hours",2,1.3],["First sun",1,2.85]],0,t=>{const n=Lt(),s=Lt();return t[0]==="Before midnight"&&n<.3?["Late sun",0,-2.75-.45*s]:null}),Ut=V("Fire",[["Log kokko",5,0],["Low bonfire",3,1],["Tar-barrel tower",1,2]],0),ye=V("Sky",[["Clear",5,0],["Cirrus veils",3,1],["Noctilucent clouds",1,2]],0,t=>{const n=Lt();return t[2]===0?n<.24?["Grey overcast",0,3]:n<.4?["After rain",0,4]:null:null}),ao=V("Far shore",[["Spruce",4,0],["Mixed birch",3,1],["Pine ridge",2,2]],0),Re=V("Neighbours",[["Two fires across the lake",4,2],["Lone fire",3,0],["A cottage light",2,-1],["Fires all round the lake",1,6]],0),ko=V("Water",[["Mirror calm",5,0],["Light airs",3,.3],["Evening breeze",1,.65]],0),no=V("Mist",[["None",4,0],["Lake mist",4,1],["Thick mist",1,2.4]],1),Le=Et(22441),Xe=[["On the shore rocks",5,0,0,1.15,-3.5],["Down at the waterline",3,-6.5,6.6,.75,-2],["Up on the whaleback",2,1.5,-9.5,1.6,-6],["Out on the lake",1,0,0,.95,-1.5],["Along the shore",0,0,0,1.2,-3],["Up the slope",0,0,0,1.6,-10]],so=[[56,70],[50,66],[28,40],[36,52],[28,40],[28,40]];let N=0;{let t=Le()*11;for(;N<3&&t>=Xe[N][1];)t-=Xe[N][1],N++}const K=Lt(),at=Lt(),To=Lt(),Ue=Lt(),No=Lt(),We=Lt(),co=Lt();ot?N=0:K<.45&&(N=at<.55?4:5);const Ae=Xe[N];o.trait("Standpoint",Ae[0]);let ne=ot?ka:Math.tan(.5*ct*(so[N][0]+(so[N][1]-so[N][0])*No));const ue=ot?0:["Full blaze","Burning down","Just lit","Embers"].indexOf(Oe(z(),[["Full blaze",.55],["Burning down",.25],["Just lit",.12],["Embers",.08]])[0]);o.trait("Fire stage",["Full blaze","Burning down","Just lit","Embers"][ue]);const me=ot?0:["Bay","Narrow sound","Open selka","Skerries"].indexOf(Oe(z(),[["Bay",.5],["Narrow sound",.2],["Open selka",.17],["Skerries",.13]])[0]);o.trait("Lake",["Bay","Narrow sound","Open selka","Skerries"][me]);const zt=ot?14*ct:(Pe()<.7?1:-1)*(9+_()*13)*ct,Wt=ot?34:29+_()*12;let Me=zt,De=Wt,ut=d.SK0;if(!ot){const t=Oe(z(),[[0,.22],[1,.24],[2,.16],[3,.16],[4,.22]])[0],n=z()*U,s=z()*50,r=z()<.5?1:-1,f=t===1?8+2*z():t===3?4.5+1.5*z():t===4?4.2+.8*z():5.5+2*z(),x=t===1?3+z():t===4?3.4+.8*z():3.8+1.3*z(),u=t===2?r*(2.6+z()):t===4?r*(8+1.5*z()):0,l=[];if(t===3)for(let b=0;b<9;b++){const w=z()*U,R=.35+.6*z(),F=z()*U;l.push([Math.sin(w)*f*R,Math.cos(w)*x*R,.8+1.1*z(),-.3+.9*z(),Math.cos(F),Math.sin(F)])}else{const b=1+Math.floor(z()*4);for(let w=0;w<b;w++){const R=z()*U,F=.55+.3*z();l.push([Math.sin(R)*f*F,Math.cos(R)*x*F,.4+.35*z(),-.1+.3*z()])}}if(ut={c:Math.cos(n),s:Math.sin(n),ax:f,az:x,hs:t===1?.75+.2*z():.85+.35*z(),o:s,f:t,k:u,B:l,ext:2*(Math.max(f,Math.abs(t===4?u:0)+3.6)+2.4)},t!==3){const b=Et(19055),w=3+(b()<.5?1:0),R=[];for(let F=0;F<w;F++){const B=(b()-.5)*2.4+(F===3?Math.PI:0),S=.42+.36*b(),X=(b()<.5?.59:-.98)+(b()-.5)*.3;R.push([Math.cos(B)*f*S,Math.sin(B)*x*S,.55+.55*b(),.12+.16*b(),Math.cos(X),Math.sin(X),.5+.35*b(),(b()-.5)*.12])}N<2&&(ut.J=R,ut.Jg=1,d.placeJ(ut))}t!==3&&(ut.e=1.15);const v=Math.max(f,t===4?Math.abs(u)+3.4:0)+2;for(let b=0;b<16;b++){const w=r*(5+88*Math.pow(z(),1.15))*ct,R=30+58*Math.pow(z(),1.5),F=Math.sin(w)*R,B=Math.cos(w)*R;let S=d.G(F,B)<-.8;for(let X=0;X<8&&S;X++){const nt=X/8*U;S=d.G(F+Math.sin(nt)*v,B+Math.cos(nt)*v)<-.5}if(S||b===15){S&&(Me=w,De=R);break}}if(ue>=2&&De>35)for(let b=0;b<8;b++){const w=24+11*kt(),R=Math.sin(Me)*w,F=Math.cos(Me)*w;let B=d.G(R,F)<-.8;for(let S=0;S<8&&B;S++){const X=S/8*U;B=d.G(R+Math.sin(X)*v,F+Math.cos(X)*v)<-.5}if(B){De=w;break}}}const Tt=[Math.sin(Me)*De,Math.cos(Me)*De],se=[Tt[0],d.SKF(0,0,ut)-.05,Tt[1]],[xt,W,Rt,dt]=Ut===0?[3.6,1.8,7.5,2.4]:Ut===1?[1.7,1.4,4.2,2]:[6.2,1,9.5,1.5],$=[],ce=Ut===1?26:40;for(let t=0;t<ce;t++){const n=t/ce*U+(_()-.5)*.35,s=W*(.85+.3*_()),r=.1+.25*_(),f=n+(_()-.5)*1.2,x=xt*(.7+.45*_()),u=.1+.4*_(),l=_();$.push(Math.sin(n)*s,-.05,Math.cos(n)*s,.042+.12*l*l+(l>.8?.04:0),Math.sin(f)*r*(1-u),x*(1+u*.3),Math.cos(f)*r*(1-u),_())}for(let t=0;t<7;t++){const n=_()*U,s=W*(.9+.5*_()),r=n+1.2+_();$.push(Math.sin(n)*s,.08,Math.cos(n)*s,.09+.05*_(),Math.sin(r)*s*.8,.1+.2*_(),Math.cos(r)*s*.8,_())}{const t=Et(4261),n=Ut===1?22:34;for(let s=0;s<n;s++){const r=t()*U,f=W*(.75+.4*t()),x=r+(t()-.5)*1.4,u=W*(.12+.45*t()),l=xt*(.35+.65*t()*t());$.push(Math.sin(r)*f,-.05,Math.cos(r)*f,.05+.07*t(),Math.sin(x)*u,l,Math.cos(x)*u,t())}for(let s=0;s<6;s++){const r=t()*U,f=W*(.6+.7*t()),x=r+.8+1.4*t();$.push(Math.sin(r)*f,.05+.25*t(),Math.cos(r)*f,.06+.05*t(),Math.sin(x)*f*.7,.15+.5*t(),Math.cos(x)*f*.7,t())}for(let s=0;s<3;s++){const r=t()*U,f=r+(t()-.5)*.5;$.push(Math.sin(r)*W*.5,xt*(.25+.3*t()),Math.cos(r)*W*.5,.1+.05*t(),Math.sin(f)*W*1.9,-.02,Math.cos(f)*W*1.9,t())}}if(Ut<2){$.length=0;const t=Et(20935),n=t()*U,s=(f,x,u,l,v,b,w,R)=>{const F=Math.cos(u),B=Math.sin(u);$.push(f-F*l,b,x-B*l,R,f+F*v,w,x+B*v,2+t())},r=(f,x,u,l,v,b,w)=>$.push(Math.sin(f)*x,u,Math.cos(f)*x,w,Math.sin(l)*v,b,Math.cos(l)*v,t());if(Ut===0){const f=ue===1||ue===3?1:0,x=f?7:10,u=xt*.66/10;for(let l=0;l<x;l++){const v=l/10,b=W*(.66-.3*v)*(.9+.2*t()),w=n+l*Math.PI/2+(t()-.5)*.3,R=t()<.3?3:2,F=.06+l*u;for(let B=0;B<R;B++){const S=w+(t()-.5)*(.3+.6*f),X=Math.cos(S),nt=Math.sin(S),et=Math.cos(w),wt=Math.sin(w),Y=.09+.07*t()*t(),pt=(R===3?B-1:B?1:-1)*b*(.85+.25*t()),Bt=b+.1+.55*t(),G=b+.1+.55*t();if(l>1&&t()<.12+.1*f)continue;const ht=F+Y+(t()-.5)*.1,fe=f&&l>2&&t()<.35;$.push(-wt*pt-X*Bt,fe?.1:ht,et*pt-nt*Bt,Y,-wt*pt+X*G,ht+(t()-.5)*(.16+.3*f),et*pt+nt*G,2+t())}}for(let l=0;l<26;l++){const v=n+l/26*U+(t()-.5)*.3,b=.06+.08*t();if(f&&t()<.3){const w=t()*U,R=W*.5*t();s(Math.sin(w)*R,Math.cos(w)*R,t()*U,W*(.5+.4*t()),W*(.5+.4*t()),xt*.5*t(),xt*.5*t(),b);continue}r(v,W*(.95+.3*t()),-.05,v+(t()-.5)*.9,W*(.04+.22*t()),xt*(.72+.45*t())*(f?.65:1),b)}for(let l=0;l<22;l++){const v=t()*U;r(v,W*(1.05+.45*t()),-.05,v+(t()-.5)*1.4,W*(.5+.35*t()),.25+1.1*t()*t(),.018+.02*t())}for(let l=0;l<4;l++){const v=t()*U,b=W*(1.1+.4*t());s(Math.sin(v)*b,Math.cos(v)*b,t()*U,.6+.5*t(),.6+.5*t(),.1,.14+.1*t(),.1+.05*t())}for(let l=0;l<22;l++){const v=t()*U;r(v,W*(1+.3*t()),-.05,v+(t()-.5)*1.2,W*(.3+.4*t()),.4+1.2*t(),.025+.03*t())}}else{for(let f=0;f<6;f++){const x=3+(t()*2|0),u=.08+f*xt*.19;for(let l=0;l<x;l++){const v=t()*Math.PI,b=W*.45*(1-f/6)*Math.sqrt(t()),w=t()*U,R=W*(.75+.7*t())*(1-f*.09),F=.07+.07*t();s(Math.sin(w)*b,Math.cos(w)*b,v,R*(.3+.4*t()),R*(.3+.4*t()),u+F+(t()-.5)*.2,u+F+(t()-.5)*.35,F)}}for(let f=0;f<12;f++){const x=n+f/12*U+(t()-.5)*.5;r(x,W*(.9+.4*t()),-.05,x+(t()-.5)*.9,W*(.05+.3*t()),xt*(.75+.6*t()),.035+.045*t())}for(let f=0;f<18;f++){const x=t()*U;r(x,W*(1+.5*t()),-.05,x+(t()-.5)*1.4,W*(.4+.4*t()),.2+.8*t()*t(),.016+.02*t())}}}{const t=d.SKF(0,0,ut),n=W+.3;for(let s=0;s<$.length;s+=8){if($[s+7]>=2)for(const r of[0,4]){const f=$[s+r],x=$[s+r+2],u=Math.hypot(f,x);u>n&&($[s+r]=f*n/u,$[s+r+2]=x*n/u)}for(const r of[0,4])$[s+r+1]<.5&&($[s+r+1]+=ae(d.SKF($[s+r],$[s+r+2],ut)-t,-1.5,0))}}const Dt=[0,xt*.12,0,_()*9,dt,Rt,1.15,1],re=Ut===2?9:7;for(let t=0;t<re;t++){const n=_()*U,s=W*(.25+.45*_()),r=Ut===2?xt*(t/re)*.8:xt*(.16+.3*_());Dt.push(Math.sin(n)*s,r,Math.cos(n)*s,_()*9,dt*(.35+.35*_())*(Ut===2?1.3:1),Rt*(.4+.45*_())*(Ut===2?.85:1),.65+.4*_(),.8+.5*_())}for(let t=0;t<5;t++){const n=Math.atan2(-Tt[0],-Tt[1])+(_()-.5)*1.9,s=W*(.45+.4*_());Dt.push(Math.sin(n)*s*.8,xt*(.22+.25*_()),Math.cos(n)*s*.8,_()*9,dt*(.2+.16*_()),xt*(.7+.7*_()),.6+.35*_(),1)}if(ue===2){const t=z()*U;for(let n=0;n<Dt.length;n+=8)Dt[n]=Dt[n]*.45+Math.sin(t)*W*.75,Dt[n+2]=Dt[n+2]*.45+Math.cos(t)*W*.75,Dt[n+1]*=.5,Dt[n+4]*=.6,Dt[n+5]*=.55}const je=d.inst(new Float32Array($)),ft=d.inst(new Float32Array(Dt)),Ne=$.length/8,ro=Dt.length/8,Io=performance.now(),tt=8192,ie=new Float32Array(tt*4),mt=new Float32Array(tt*4).fill(3e4),Zt=new Float32Array(tt*4),I=d.nz,io=_()*100,Ie=_()*100,Ro=t=>(t+.5)/tt*U,ze=t=>t>Math.PI?t-U:t,jo=ot?[[-.27,-.14],[.62,.7]]:[[(_()-.5)*1.4,0],[(_()-.5)*2.2,0]].map(t=>[t[0],t[0]+.05+_()*.12]),ha=t=>jo.some(n=>t>n[0]&&t<n[1]),Ke=t=>Math.max(0,Math.sin(Math.PI*(t+.5)/.2)),qe=ao===2?1:0,Ao=me===1?.23:me===2?5:1,lo=[];if(me===3)for(let t=0;t<6;t++)lo.push([(z()-.5)*2.6,(12+30*z())/300,90+330*z()**1.3,t<2?4+4*z():1+2*z()]);const Ye=t=>{for(const n of lo){const s=(t-n[0])*n[2]/(n[1]*300);if(Math.abs(s)<1)return n}return null},zo=[t=>(5200+2600*I(t*2+io,1))*(me===2?1.8:1),t=>(640+420*I(t*1.6+Ie,2)+220*I(t*6+Ie,4))*Ao,t=>{const n=Ye(t);if(n)return n[2]*(1+.04*I(t*40,3));const s=Math.abs(t);return s>1.1&&s<2?170+300*Mt(1.9,1.15,s)+60*I(t*8,3):440+40*I(t*9,5)},t=>82+40*I(t*3+7,6)],fo=[t=>40+75*I(t*3+io,7)+25*I(t*11,8),t=>2+(10+30*qe)*I(t*2.3+Ie,9)**2+4*I(t*13,10)+30*Math.pow(I(t*1.4+Ie*.7,13),3)+9*Math.pow(I(t*5+3,14),2),t=>{const n=Ye(t);if(n){const s=(t-n[0])*n[2]/(n[1]*300);return Math.sqrt(Math.max(0,1-s*s))*n[3]*(.6+.6*I(t*60,11))}return t<0&&t>-.6?Math.sqrt(Ke(t))*(1.2+3*I(t*40,11)):2+8*I(t*4,11)},t=>9+4*I(t*5,12)],ho=[t=>Math.abs(t)<2.05,t=>Math.abs(t)<1.75&&!ha(t),t=>{const n=Math.abs(t);return me===3&&Ye(t)?!0:me===2?n>1.3&&n<2:n>1.1&&n<2||t>-.5&&t<-.3},t=>Math.abs(t)>1.72];for(let t=0;t<tt;t++){const n=ze(Ro(t));for(let s=0;s<4;s++)ho[s](n)&&(mt[t*4+s]=zo[s](n))}for(let t=1;t<4;t++){let n=0;for(let s=0;s<tt*2;s++){const r=s%tt;n=mt[r*4+t]<2e4?n+1:0,s>=tt&&(Zt[r*4+t]=n)}n=0;for(let s=tt*2-1;s>=0;s--){const r=s%tt;n=mt[r*4+t]<2e4?n+1:0,s<tt&&(Zt[r*4+t]=Math.min(Zt[r*4+t],n)*U/tt*mt[r*4+t])}}const Be=(t,n)=>Mt(0,n===3?45:n===2?30:70,Zt[t*4+n]),vo=(t,n,s,r)=>t===2?fo[2](n):Math.max(0,fo[t](n)*s+(r<600&&t===1?(1-Mt(300,600,r))*(1.1*I(n*r/16+t*7,27)+.5*I(n*r/4.5,28)-.8)*s:0));let Ht=tt;for(;Ht>d.mts;)Ht>>=1;const it=Math.min(Ht,rt<=400?4096:8192),ge=rt<=400?64:256,Ko=48,Ve=Ko/ge,$t=tt/it,le=d.SB&&d.SB.length===it*ge*4?d.SB.fill(0):d.SB=new Uint8Array(it*ge*4),Se=new Float32Array(tt*4),go=new Float32Array(tt*4),qo=[0,0,2,3],Nt=(t,n,s,r,f)=>{const x=Math.max(0,s/Ve),u=Math.min(ge,r/Ve);if(u<=x)return;const l=Math.floor(x),v=Math.floor(u),b=it*4;let w=(l*it+t)*4+n,R;if(l===v){R=(u-x)*f+.5|0,R>le[w]&&(le[w]=R);return}R=(l+1-x)*f+.5|0,R>le[w]&&(le[w]=R);for(let F=l+1;F<v;F++)w+=b,f>le[w]&&(le[w]=f);v<ge&&(w+=b,R=(u-v)*f+.5|0,R>le[w]&&(le[w]=R))};for(let t=0;t<tt;t++){const n=ze(Ro(t));for(let s=0;s<4;s++){if(mt[t*4+s]>2e4)continue;const r=mt[t*4+s],f=n*r,x=s?Be(t,s):1,u=s===0?0:((s===3?1.5+3*I(f/30+s,15):1.2+3.6*I(f/70+s*3,15))+2.2*I(f/7+s,16)**2+1.3*I(f/2.2,17))*(.3+.7*Mt(.3,.6,I(f/45+s*5,18))),l=vo(s,n,x,r);Se[t*4+s]=l,ie[t*4+s]=l+u*x,s&&(go[t*4+(s===1?0:s)]=u*x)}}const O=(t,n)=>{const s=Math.sin(t*12.9898+n*78.233)*43758.5453;return s-Math.floor(s)},So=new Float32Array(64),Bo=new Float32Array(64),uo=(t,n,s)=>{const r=Math.min(60,Math.max(7,Math.round(t/.75))),f=O(s,99)<.1?.12:0;let x=0;for(let u=0;u<r;u++){const l=O(s,u),v=t*(1-(u+.3+.5*l)/r);v>t*(1-f)||l<.1&&u>2||(So[x]=v,Bo[x]=n*Math.pow(1-v/t,.8)*(.55+.6*O(s+1,u)),x++)}return x},Yo=(t,n,s,r)=>{const f=Math.abs(t),x=t<0?r:1;let u=f<.09?n:0;for(let l=0,v=0;l<s;l++){const b=Bo[l]*x;if(f<=b){const w=f/b,R=So[l]+.12*b-.45*b*w*Math.sqrt(w);if(R>u&&(u=R),++v>2)break}}return u},Vo=(t,n,s,r)=>{let f=0;for(let x=0;x<7;x++){const u=(O(r,x)-.5)*s*1.1,l=n*(.55+.35*O(r,x+9))*(1-.4*Math.abs(u)/s),v=s*(.22+.25*O(r,x+5)),b=n*(.08+.1*O(r,x+3)),w=(t-u)/v;w*w<1&&(f=Math.max(f,l+b*Math.sqrt(1-w*w)))}return f-n*.07*I(t*2.3+r,2)},mo=ao===0?.9:ao===1?.45:.3,Co=ao===2?.5:.05,_o=(t,n,s,r,f,x,u,l,v,b,w,R)=>{(v===1||v===4)&&(l=Math.min(l,17));const F=x*U/it,B=s/$t,S=(r-1)/$t+1;let X=0;for(let nt=Math.floor(B-S);nt<=Math.ceil(B+S);nt++){const et=(nt%it+it)%it,wt=(nt+.5-B)*F,Y=Math.abs(wt);if(Y>f+F*.5)continue;const pt=u-Se[et*$t*4+t];let Bt=0;if(v===3){const G=l*(1-Math.pow(Y/f,.85))-l*.06*I(wt*1.9+R,5)*(Y/f);G>0&&Nt(et,n,0,pt+G,255),X=Math.max(X,G),Bt=G}else if(v===5){const G=l*(1-.3*(Y/f)**2.5-.1*I(wt*1.3+R,6));G>0&&Nt(et,n,0,pt+G,255),X=Math.max(X,G),Bt=G}else if(v===0){const G=Yo(Math.max(Y,.1)*(wt<0?-1:1),l,b,w),ht=Y<.09?l:G;Nt(et,n,0,pt+G,255),Y<F*.5&&Nt(et,n,pt+G,pt+l,255*Math.min(1,.2/F)),X=Math.max(X,ht),Bt=ht}else if(v===1||v===4){const G=Vo(wt,l,f,R),ht=l*(.14+.1*O(R,31))*(1-.3*Y/f);G>ht&&Nt(et,n,pt+ht,pt+G,200),Y<F*.5+.12&&Nt(et,n,0,pt+Math.max(ht,G)*.8,255*Math.min(1,.25/F)),X=Math.max(X,G),Bt=G}else{const G=l-l*.3*Math.abs(wt/f)**2.5-l*.07*I(wt*2+R,3)-(Y>f*.25?l*.12*I(wt*.9+R,4):0),ht=l*(.36+.14*O(R,33))+l*.16*(Y/f)**2+l*.08*(I(wt*2.1+R,7)-.5);G>ht&&Nt(et,n,pt+ht,pt+G,255),Y<F*.5+.15&&Nt(et,n,0,pt+ht+.5,255*Math.min(1,.35/F)),X=Math.max(X,G),Bt=G}for(let G=0;G<$t;G++){const ht=(et*$t+G)*4+t;mt[ht]<2e4&&u+Bt>ie[ht]&&(ie[ht]=u+Bt)}}return X},po=320,be=new Float32Array(4096).map((t,n)=>O(n*.731,3.7)),xo=new Float32Array(4096),wo=new Float32Array(4096),Ce=new Float32Array(48),Qe=new Float32Array(48),e=new Float32Array(48),i=new Float32Array(48),c=(t,n,s,r,f,x,u,l,v,b)=>{const w=f*U/it,R=s/$t,F=L=>255*Math.min(1,L/w)+.5|0,B=Math.min(1,Math.max(0,(w-.25)/.4)),S=(O(v,60)-.5)*.07+(O(v,61)<.12?(O(v,62)-.5)*.22:0),X=l===0&&O(v,63)<(b?.02:.045);X&&(u*=.55+.3*O(v,64)),l&&(u=Math.min(u*(b?.62:.9),l===1?17:26));let nt=0,et=u;if(l===0){let L=u-(.4+.8*O(v,41))*(X?.2:1);et=L;for(let Z=0;L>.2&&nt<48;Z++){const vt=1-L/u,H=X?.2+.5*O(v,Z+600):r*Math.pow(vt,.6)*(.6+.6*O(v,Z));(Z<2||O(v,Z+200)>.1)&&(Ce[nt]=L,Qe[nt]=H*(.65+.5*O(v,Z+100)),e[nt]=H*(.65+.5*O(v,Z+300)),i[nt]=X?.07:(.35+.45*O(v,Z+400))*(.7+.8*vt),nt++),L-=(.35+.45*O(v,Z+500))*(.75+.5*vt)}}else{const L=l===2;et=u*(L?.5+.15*O(v,33):.26+.14*O(v,33)),et*=1-.4*B;const Z=L?7+(O(v,34)*6|0):18+(O(v,34)*10|0),vt=u-et;for(let H=0;H<Z;H++){const j=H===0?1:O(v,H+700),de=et+vt*(L?.12+.78*Math.sqrt(j):.1+.8*j),he=(de-et)/vt,we=r*(L?.5+.5*Math.sin(Math.PI*he):Math.pow(Math.sin(Math.PI*Math.min(1,.12+he*.9)),.6));Ce[nt]=de,Qe[nt]=S*de+(H===0?0:(O(v,H+800)-.5)*(L?1.2*(1-.15*B):1.5+.3*B)*we),e[nt]=r*(L?.3+.35*O(v,H+900):.14+.2*O(v,H+900)),i[nt]=vt*(L?.09+.09*O(v,H+1e3):.05+.07*O(v,H+1e3))*(1+(L?.3:.1)*B),nt++}}const wt=Math.max(l===0?.1+.01*u:.06+.005*u,w*.5),Y=F(l===0?.2+.02*u:.12+.01*u),pt=l===0?et:l===2?u*.92:u*.85,Bt=(O(v,65)-.5)*.5,G=(et+u)*.5,ht=r+Math.abs(S)*u+1,fe=Math.floor(R-ht/w)-1,Te=Math.min(4096,Math.ceil(2*ht/w)+3);for(let L=0;L<Te;L++)xo[L]=-1,wo[L]=x-Se[((fe+L)%it+it)%it*$t*4+t];const xe=(L,Z,vt,H)=>{L<0||L>=Te||(Z<0&&(Z=0),vt>Z&&(Nt(((fe+L)%it+it)%it,n,wo[L]+Z,wo[L]+vt,H),vt>xo[L]&&(xo[L]=vt)))},Xt=L=>Math.floor(L/w+R)-fe,Fe=L=>(fe+L+.5-R)*w;for(let L=Math.max(0,Xt(Math.min(0,S*pt)-wt)),Z=Math.min(Te-1,Xt(Math.max(0,S*pt)+wt));L<=Z;L++){const vt=Fe(L);if(Math.abs(S)<.001)Math.abs(vt)<wt&&xe(L,0,pt,Y);else{const H=(vt-wt)/S,j=(vt+wt)/S;xe(L,Math.min(H,j),Math.min(Math.max(H,j),pt),Y)}}if(l===0){const L=Math.max(.04,w*.5),Z=F(.09),vt=S*(et+G)*.5,H=S*(G+u)*.5+Bt;for(let j=Xt(vt-L);j<=Xt(vt+L);j++)Math.abs(Fe(j)-vt)<L&&xe(j,et-.3,G,Z);for(let j=Xt(H-L);j<=Xt(H+L);j++)Math.abs(Fe(j)-H)<L&&xe(j,G,u,Z);for(let j=0;j<nt;j++){const de=S*Ce[j],he=Qe[j],we=e[j],oe=X?.1:.55,to=i[j];for(let Qt=Math.max(0,Xt(de-he-w*.5)),eo=Math.min(Te-1,Xt(de+we+w*.5));Qt<=eo;Qt++){const Jt=Fe(Qt)-de,bo=Jt<0?he:we,Wo=Math.abs(Jt);if(Wo>bo+w*.5)continue;const Ge=Math.min(1,Wo/bo),Ma=fe+Qt,ba=Ce[j]+.06*bo-oe*bo*Ge*Math.sqrt(Ge)+(be[Ma*7+j*131&4095]-.5)*(.14+.4*Ge*to);xe(Qt,ba-to*(X?1:1.5-.9*Ge)-(X?0:to*Ge*be[Ma*13+j*71+900&4095]),ba,255)}}}else{const L=l===2,Z=b?245:L?255:228,vt=2.4*Math.min(1,(.12/w)**1.5);for(let H=0;H<nt;H++){const j=Qe[H],de=e[H],he=Ce[H],we=i[H];if(L){const oe=S*(he-we*2),to=Math.min(oe,j),Qt=Math.max(oe,j),eo=F(.14);for(let Jt=Math.max(0,Xt(to)),bo=Math.min(Te-1,Xt(Qt));Jt<=bo;Jt++){const Wo=(Fe(Jt)-oe)/(j-oe||1),Ge=he-we*2*(1-Wo);xe(Jt,Ge-.1,Ge+.1,eo)}}for(let oe=Math.max(0,Xt(j-de)),to=Math.min(Te-1,Xt(j+de));oe<=to;oe++){const Qt=(Fe(oe)-j)/de;if(Qt*Qt>=1)continue;const eo=Math.sqrt(1-Qt*Qt),Jt=fe+oe;L?xe(oe,he-we*(.6*eo+.4*be[Jt*11+H*97+1700&4095]),he+we*(Math.pow(1-Qt*Qt,.3)-.5*be[Jt*5+H*59+2500&4095]-B*.8*be[Jt*3+H*37+3300&4095]),Z):xe(oe,he-we*(eo+vt*be[Jt*11+H*97+1700&4095]**2),he+we*eo*(.55+.45*be[Jt*5+H*59+2500&4095]-B*.9*be[Jt*3+H*37+3300&4095]),Z)}}}let ca=0;for(let L=0;L<Te;L++){const Z=xo[L];if(Z<0)continue;Z>ca&&(ca=Z);const vt=((fe+L)%it+it)%it;for(let H=0;H<$t;H++){const j=(vt*$t+H)*4+t;mt[j]<2e4&&x+Z>ie[j]&&(ie[j]=x+Z)}}return ca};for(let t=1;t<4;t++){let n=-Math.PI;for(;n<Math.PI;){const s=Math.floor((n+U)%U/U*tt),r=mt[s*4+t];if(r>2e4){n+=30/3e3;continue}if(_()<.035){n+=(4+9*_())/r;continue}n+=(1.3+3.6*_()**1.5)/r*(r>2e3?3:1);const f=Be(s,t),x=I(n*r/25+t*9,t+20),u=_();let l=((t===3?9:8)+_()*(t===3?14:15))*(.6+.6*x)*(.35+.65*f);_()<.08&&(l*=1.3);const v=u<(t===3?.92:mo)?0:u<mo+Co?2:1,b=v===0?l*(.11+.08*_()):v===1?Math.min(4.5,l*(.2+.1*_())):l*(.2+.08*_()),w=(n+U)%U/U*tt,R=b/r/U*tt+1,F=_()*100,B=vo(t,n,f,r),S=.85+.3*O(F,7);v||r<po?c(t,qo[t],w,b,r,B,l,v,F,!1):_o(t,qo[t],w,R,b,r,B,l,v,uo(l,b,F),S,F)}}{const t=Et(11031);for(let s=0;s<it;s++){const r=s*$t;if(mt[r*4+1]>2e4)continue;const f=ze(Ro(r)),x=Be(r,1),u=mt[r*4+1]+90+160*I(f*4+Ie,19),l=f*u,v=Math.min(1,mt[r*4+1]/600),b=(1.5+9*I(f*2.6+io,24)**2)*x*v,w=(3+4*I(l/60+7,25)+1.5*I(l/6,26))*x*v;for(let R=0;R<$t;R++){const F=(r+R)*4;go[F+1]=b+w,ie[F+1]=Math.max(ie[F+1],Se[F+1]+b+w)}}let n=-Math.PI;for(;n<Math.PI;){const s=Math.floor((n+U)%U/U*tt),r=mt[s*4+1];if(r>2e4){n+=30/3e3;continue}const f=r+90+160*I(n*4+Ie,19);n+=(1.4+3.2*t()**1.5)/f;const x=Be(s,1),u=I(n*f/30+4,23),l=t(),v=(9+15*t())*(.6+.6*u)*(.35+.65*x),b=l<mo?0:l<mo+Co?2:1,w=b===0?v*(.11+.08*t()):b===1?Math.min(4.5,v*(.2+.1*t())):v*(.2+.08*t()),R=(n+U)%U/U*tt,F=w/f/U*tt+1,B=t()*100+300,S=Se[s*4+1]+(1.5+9*I(n*2.6+io,24)**2)*x*Math.min(1,r/600);b||f<po+250?c(1,1,R,w,f,S,v,b,B,!0):_o(1,1,R,F,w,f,S,v,b+3,0,0,B)}}const m=new Uint16Array(Ht*16),h=tt/Ht;for(let t=0;t<Ht;t++)for(let n=0;n<4;n++){let s=ie[t*h*4+n],r=mt[t*h*4+n];for(let f=1;f<h;f++)s=Math.max(s,ie[(t*h+f)*4+n]),r=Math.min(r,mt[(t*h+f)*4+n]);m[t*4+n]=Uo(s),m[(Ht+t)*4+n]=Uo(r),m[(Ht*2+t)*4+n]=Uo(Se[t*h*4+n]),m[(Ht*3+t)*4+n]=Uo(go[t*h*4+n])}const p=(t,n,s,r,f,x,u,l)=>{const v=a.createTexture();return a.bindTexture(a.TEXTURE_2D,v),a.texImage2D(a.TEXTURE_2D,0,s,t,n,0,r,f,x),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,u),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,l),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),v};a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.bindBuffer(a.PIXEL_UNPACK_BUFFER,null);const k=p(Ht,4,a.RGBA16F,a.RGBA,a.HALF_FLOAT,m,a.LINEAR,a.REPEAT),M=p(it,ge,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,le,a.LINEAR,a.REPEAT);He&&console.warn("588 far bake "+(performance.now()-Io).toFixed(1)),d.linkAll&&(d.linkAll(),d.linkAll=null);const E=new Float32Array(16*4);let A=0;const T=(t,n)=>{const s=Math.floor((t+U)%U/U*tt),r=mt[s*4+1]<2e4?1:2,f=mt[s*4+r];if(f>2e4||A>=8)return;const x=fo[r](t),u=f-(n?30:12),l=n?.5:2.2+_()*1.5,v=!n&&u<400;E.set([Math.sin(t),Math.cos(t),v?f-4:u,n?Math.min(x,6)+3:v?1.1:Math.min(x,5)*.4+1.6],A*4),E.set(n?[l,l*.62,l*.3,1]:[l,l*.45,l*.14,v?.25:0],(8+A)*4),A++};if(ot)T(-.62,0),T(.47,0),T(-.05,1);else{const t=Re<0?0:Re;for(let n=0;n<t;n++)T((_()-.5)*2.6,0);(Re<0||_()<.4)&&T((_()-.5)*2.4,1)}const y=p(8,2,a.RGBA32F,a.RGBA,a.FLOAT,E,a.NEAREST,a.CLAMP_TO_EDGE);let D=Do,g=(Ut===1?.9:1)*[1,.3,1,.065][ue],P=0,C=0,yt=-100,q=0,lt=0;const Q=ue===2?.45:1,st=6.4/ut.ax,It=[ye===3?1:0,ye===4?1:ye===3?.3:0,ut.c*st,ut.s*st],jt=Math.exp(.36*ae(Math.asin(la(-.85)[1])/ct,-9,4)),Kt=ot?1:_()*U,J=[Math.sin(Kt),Math.cos(Kt)],gt=ot?152*ct:(120+_()*90)*ct,pe=ot?9.5*ct:(6+_()*12)*ct,te=[Math.sin(gt)*Math.cos(pe),Math.sin(pe),Math.cos(gt)*Math.cos(pe)],_e=_(),ee=Le()<.5?1:-1,St=[Math.sin(Me),Math.cos(Me)],Ee=[St[1],-St[0]];let Ot=Ae[2],_t=Ae[3];if(N===3){const t=ee*(5+5*Le()),n=17+6*Le();Ot=Tt[0]+Ee[0]*t+St[0]*n,_t=Tt[1]+Ee[1]*t+St[1]*n}let Je=Math.atan(ne);if(!ot&&N<3)for(let t=0;t<6;t++){const n=1-t/6,s=Ot+(To-.5)*6*n,r=_t+(Ue-.5)*6*n,f=d.G(s,r);if(f>(N===1?-.05:.1)&&f<(N===1?.7:9)){Ot=s,_t=r;break}}else if(N===4){const t=ee,n=t*(13+13*To);let s=14;for(;s>-40&&d.G(n,s)<.25;)s-=.25;Ot=n,_t=s-.4-1.5*Ue}else N===5&&(Ot=-5+12*To,_t=-9.5-4*Ue);const yo=Math.atan2(Tt[0]-Ot,Tt[1]-_t),va=N===2||N===4||N===5;if(va){const t=Math.hypot(Tt[0]-Ot,Tt[1]-_t),n=Math.min(g,1.15),s=xt*(.3+.7*Math.min(n,1))+Rt*(.28+.72*n)*Q*.8;ne=Math.max(Math.tan(10*ct),Math.min(ne,s/(.17*t))),Je=Math.atan(ne)}let Ze=0;if(N===0&&!ot)Ze=yo+(_e-.5)*1.1*Je;else if(N===1||N===2||N===3)Ze=yo-ee*(14+6*Le())/32.5*Je;else if(N===4){const t=Math.atan2(-Ot,-_t);Ze=yo+(Math.sin(t-yo)>0?1:-1)*(.62+.14*We)*Je}else N===5&&(Ze=yo+(We-.5)*.7*Je);let Go=Ae[5]*ct;if(!ot){const t=ye===1||ye===2||ye===4,n=ko===0&&!t;if(va){const s=Math.hypot(Tt[0]-Ot,Tt[1]-_t),r=Math.max(d.G(Ot,_t),0)+Ae[4];Go=ae(-Math.atan((r-se[1])/s)+Math.atan((.06+.04*co)*2*ne),-4.5*ct,0)}else t&&co<.6?Go=(3+7*We)*ct*Je/(32.5*ct):n&&co<.5&&(Go=-(6+5*We)*ct*Je/(32.5*ct))}if(ot){const t=24*ct,n=21*ct;te[0]=Math.sin(t)*Math.cos(n),te[1]=Math.sin(n),te[2]=Math.cos(t)*Math.cos(n)}let $e=ot||N===3||N===1?0:Oe(kt(),[[0,N===5?0:.3],[1,.3],[2,.3],[3,N===4?0:.25]])[0];ye===4&&!ot&&N!==3&&N!==1&&($e=1);const ja=[$e===1?1:$e?.35*kt():0,$e===2?.8+.2*kt():$e?.3+.3*kt():0,$e?.6+.4*kt():0,Ut===2?0:[.3,1,.5,1][ue]];let Ho=null;if($e===3){Ho=[];const t=Math.sin(yo-Ze)>0?-1:1,n=2+Math.floor(kt()*2);for(let s=0;s<n;s++){const r=3.6+8*kt()*(s?1:.4),f=t*(.35+.55*kt())*r*ne*(s===2?-.8:1),x=Ze+Math.atan2(f,r),u=Ot+Math.sin(x)*Math.hypot(r,f),l=_t+Math.cos(x)*Math.hypot(r,f),v=.55+.7*kt();Ho.push([u,l,v,v*(.7+.4*kt()),d.G(u,l)-.12,v*(.6+.35*kt())])}}const Qo=ot||N===0&&!Ho?null:d.shoreVao(Ot,_t,Ho),Jo=ot?null:d.skVao(ut),ua=()=>{if(ot){a.bindVertexArray(d.vRock),a.drawElements(a.TRIANGLES,d.nRock,a.UNSIGNED_SHORT,0);return}a.bindVertexArray(Qo||d.vRock),a.drawElements(a.TRIANGLES,d.nShore,a.UNSIGNED_SHORT,0),a.bindVertexArray(Jo),a.drawElements(a.TRIANGLES,d.nSk,a.UNSIGNED_SHORT,0)},Ft=new Float32Array(76),Yt=new Float32Array(16);let qt=null;const ma=()=>{const t=o.view||Ea,n=Ze+(t.yaw||0),s=ae(Go+(t.pitch||0),-1.45,1.45),r=Ot+ae(t.x||0,-4,4),f=_t+ae(t.z||0,-4,4),x=Math.max(d.G(r,f),0)+Ae[4]+ae(t.y||0,-.6,1.5),u=[r,x,f],l=[Math.sin(n)*Math.cos(s),Math.sin(s),Math.cos(n)*Math.cos(s)],v=[Math.cos(n),0,-Math.sin(n)],b=[l[1]*v[2]-l[2]*v[1],l[2]*v[0]-l[0]*v[2],l[0]*v[1]-l[1]*v[0]],w=1/ne,R=(Lo+Po)/(Lo-Po),F=-2*Lo*Po/(Lo-Po),B=-(v[0]*u[0]+v[1]*u[1]+v[2]*u[2]),S=-(b[0]*u[0]+b[1]*u[1]+b[2]*u[2]),X=-(l[0]*u[0]+l[1]*u[1]+l[2]*u[2]);return Yt.set([w*v[0],w*b[0],R*l[0],l[0],w*v[1],w*b[1],R*l[1],l[1],w*v[2],w*b[2],R*l[2],l[2],w*B,w*S,R*X+F,X]),{e:u,F:l,R:v,U:b}},Zo=t=>{const n=Yt[0]*t[0]+Yt[4]*t[1]+Yt[8]*t[2]+Yt[12],s=Yt[1]*t[0]+Yt[5]*t[1]+Yt[9]*t[2]+Yt[13],r=Yt[3]*t[0]+Yt[7]*t[1]+Yt[11]*t[2]+Yt[15];return r>.1?[n/r*.5+.5,s/r*.5+.5,1]:[0,0,0]};let Oo=null,Xo=!1,$o=0,pa=0,xa=0,ta=0,ea=0,ke=0,oa=0,aa=6+Gt()*10,na=0,da=20+40*Gt();const wa=t=>{if(t>=1&&(g=Math.min(1.25,g+.14)),C=Math.min(1.2,C+t),yt=lt+.25,o.sound){o.sound.hit("kick",.25*t),o.sound.hit("noise",.2*t,{cutoff:600,dur:1.2});for(let n=0;n<5;n++)o.sound.hit("click",(.1+.1*Gt())*t,{at:.2+Gt()*.8})}},sa=(t,n)=>{n=Math.min(Math.max(n||0,0),.1),lt+=n,!Mo&&!ya&&Ka++>0&&(Mo=d.late(!1));const s=o.input;if(s){const Y=s.taps?s.taps():[];if(Y.length&&(Oo={x:Y[Y.length-1].x,y:Y[Y.length-1].y}),s.down){Xo||(Xo=!0,$o=0,pa=ta=s.x,xa=ea=s.y,ke=0),$o+=n;const pt=Math.hypot(s.x-pa,s.y-xa);if(ke===0&&pt>.035&&(ke=1),ke===0&&$o>.4&&(ke=2),ke&&(Oo=null),ke===1){const Bt=(s.x-ta)/Math.max(n,.001),G=(s.y-ea)/Math.max(n,.001),ht=Math.hypot(Bt,G);if(ht>.02&&qt){const fe=qt.R[0]*Bt-qt.F[0]*G*.6,Te=qt.R[2]*Bt-qt.F[2]*G*.6,xe=Math.hypot(fe,Te)||1,Xt=ae(ht*n*2.5,0,.5);J[0]+=(fe/xe-J[0])*Xt,J[1]+=(Te/xe-J[1])*Xt;const Fe=Math.hypot(J[0],J[1])||1;J[0]/=Fe,J[1]/=Fe,q=Math.min(1,q+ht*n*1.4)}}else ke===2&&(D=Math.min(D+n*.11,4.2),g=Math.max(.04,g-n*.018));ta=s.x,ea=s.y}else Oo&&(!Xo||ke===0)&&wa(1),Oo=null,Xo=!1,ke=0}q*=Math.exp(-n/2.6),P+=(C-P)*(1-Math.exp(-n/.45)),C*=Math.exp(-n/1.1),lt>da&&(g>.15&&wa(.35+.3*Gt()),da=lt+25+50*Gt()),g>1&&(g=Math.max(1,g-n*.05));const r=la(D),f=Math.asin(r[1])/ct,x=Math.exp(.36*ae(f,-9,4)),u=.5/Math.pow(jt,.8)*Math.pow(x/jt,-.62-.23*Mt(-1,2,f)),l=ae(g,0,1.25),v=Mt(.02,.4,l),b=.88+.06*Math.sin(lt*6.1+Math.sin(lt*1.7)*2)+.04*Math.sin(lt*9.7+1.3)+.03*Math.sin(lt*3.3),w=.3+.7*Math.min(l,1),R=Q*(24*(v*.85+.15*Mt(0,.2,l))*(.7+.3*l)+4*Math.max(0,.3-l))*b*(1+.7*P);qt=ma();const F=qt.e;Ft.set(Yt,0),Ft.set([F[0],F[1],F[2],lt+11],16),Ft.set([r[0],r[1],r[2],x],20);const B=[se[0],se[1]+xt*w*.5+1.2*v,se[2]];Ft.set([B[0],B[1],B[2],R],24),Ft.set([se[0],se[1],se[2],g],28),Ft.set([J[0],J[1],q,ko],32),Ft.set([qt.R[0],qt.R[1],qt.R[2],rt],36),Ft.set([qt.U[0],qt.U[1],qt.U[2],2*ne/rt],40),Ft.set([qt.F[0],qt.F[1],qt.F[2],ne],44),Ft.set([te[0],te[1],te[2],1.1*Mt(2,-3,f)],48),Ft.set([Tt[0],Tt[1],P,yt+11],52),Ft.set([A,no,ye,u],56),Ft.set([xt,Rt,Mt(.5,.05,l),D],60),Ft.set([d.winPos[0],d.winPos[1],d.winPos[2],.9*Mt(2.5,1,D)],64),Ft.set(It,68),Ft.set(ja,72),a.bindBuffer(a.UNIFORM_BUFFER,d.ubo),a.bufferSubData(a.UNIFORM_BUFFER,0,Ft),a.bindBufferBase(a.UNIFORM_BUFFER,0,d.ubo),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,d.tN),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,k),a.activeTexture(a.TEXTURE7),a.bindTexture(a.TEXTURE_2D,M),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,y),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,d.tHm),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.blendEquation(a.FUNC_ADD);const S=d.P,X=Y=>{a.useProgram(S.puf.p),a.uniform1f(S.puf.uM,Y),a.bindVertexArray(d.vSpk),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,72),Y>0&&Mo&&(a.useProgram(S.smk.p),a.uniform1f(S.smk.uM,Y),a.bindVertexArray(d.vEmpty),a.uniform4f(S.smk.uS0,d.chimTop[0],d.chimTop[1],d.chimTop[2],.18),a.uniform4f(S.smk.uS1,0,5,22,8.7),a.drawArrays(a.TRIANGLE_STRIP,0,96))},nt=Y=>{a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.depthMask(!0),a.disable(a.BLEND),a.useProgram(S.log.p),a.uniform1f(S.log.uM,Y),a.bindVertexArray(je),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,Ne),a.depthMask(!1),a.enable(a.BLEND),a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA),X(Y),a.blendFuncSeparate(a.ONE,a.ONE,a.ZERO,a.ONE),a.useProgram(S.flm.p),a.uniform1f(S.flm.uM,Y),a.bindVertexArray(ft),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,ro),a.useProgram(S.spk.p),a.uniform1f(S.spk.uM,Y),a.bindVertexArray(d.vSpk),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,d.NSP+(lt-yt<7?d.NSB:0))};a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,null),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,null),a.bindFramebuffer(a.FRAMEBUFFER,Vt.mir.fb),a.viewport(0,0,Vt.mir.s,Vt.mir.s),a.clearColor(0,0,0,0),a.clearDepth(1),a.depthMask(!0),a.clear(a.COLOR_BUFFER_BIT|a.DEPTH_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.disable(a.BLEND),a.useProgram(S.rock.p),a.uniform1f(S.rock.uM,-1),ua(),nt(-1),a.flush(),a.bindFramebuffer(a.FRAMEBUFFER,Vt.main.fb),a.viewport(0,0,rt,rt),a.depthMask(!0),a.clear(a.DEPTH_BUFFER_BIT),a.enable(a.DEPTH_TEST),a.depthFunc(a.LEQUAL),a.disable(a.BLEND),a.useProgram(S.rock.p),a.uniform1f(S.rock.uM,1),ua(),Mo&&(a.useProgram(S.obj.p),a.bindVertexArray(d.vObj),a.drawArrays(a.TRIANGLES,0,d.nObj)),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,Vt.mir.t),a.useProgram(S.env.p),a.bindVertexArray(d.vEmpty),a.drawArrays(a.TRIANGLES,0,3),a.depthMask(!1),a.enable(a.BLEND),a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA),a.activeTexture(a.TEXTURE6),a.bindTexture(a.TEXTURE_2D,d.tB),Mo&&(a.useProgram(S.crn.p),a.bindVertexArray(d.vCrn),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,d.nCrn)),nt(1),a.flush(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,rt,rt),a.disable(a.DEPTH_TEST),a.disable(a.BLEND),a.depthMask(!0),a.useProgram(S.fin.p);const et=Zo(B),wt=Zo([B[0],-B[1],B[2]]);a.uniform4f(S.fin.uG,et[0],et[1],wt[0],wt[1]),a.uniform4f(S.fin.uG2,R*.02*et[2],R*.02*wt[2],0,0),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,Vt.main.t),a.bindVertexArray(d.vEmpty),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null),o.sound&&n>0&&(oa-=n,oa<0&&(o.sound.hit("click",(.05+.1*Gt())*(v+P),{pan:(Gt()-.5)*.4}),oa=(.04+Gt()*.25)/(.3+v+P)),aa-=n,aa<0&&(o.sound.pcm(d.loon,d.LR,{vel:.12+.1*Gt(),pan:(Gt()-.5)*1.4}),aa=18+Gt()*30),na-=n,q>.15&&na<0&&(o.sound.hit("noise",.05+.15*q,{cutoff:300+900*q,dur:1.1}),na=.5))};let Mo=!1,Ka=0,ya=!1;{ma();const t=[d.winPos,d.chimTop,[d.winPos[0],d.winPos[1]-1.2,d.winPos[2]]],n=d.crPts;for(let r=0;r<n.length;r+=8)t.push([n[r],n[r+1],n[r+2]],[n[r],n[r+1]+n[r+6],n[r+2]],[n[r],n[r+1]-n[r+6]*.35,n[r+2]]);t.some(r=>{const f=Zo(r);return f[2]&&f[0]>-.25&&f[0]<1.25&&f[1]>-.25&&f[1]<1.25})?Mo=d.late(!0):o.tile&&(ya=!0)}const Ya=performance.now();return fa&&fa.register(sa,{gl:a,tex:[k,y,M],vao:[je,ft].concat(Qo?[Qo]:[],Jo?[Jo]:[])}),sa(0,0),He&&(a.finish(),console.warn("588 first frame "+(performance.now()-Ya).toFixed(1))),sa}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
