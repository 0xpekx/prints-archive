// Windy Meadow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/008.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Oa){Oa&&function(){"use strict";const Ka=new WeakMap,qt=(s,t,x)=>{const T=Math.max(0,Math.min(1,(x-s)/(t-s)));return T*T*(3-2*T)},bt=(s,t,x)=>s<t?t:s>x?x:s,ot=(s,t,x=0)=>Math.sqrt(s*s+t*t+x*x),$=s=>{const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255].map(x=>Math.pow(x/255,2.2))},ae=(s,t)=>[s[0]*t,s[1]*t,s[2]*t],ue=(s,t,x)=>[s[0]+(t[0]-s[0])*x,s[1]+(t[1]-s[1])*x,s[2]+(t[2]-s[2])*x],ca=`#version 300 es
precision highp float;
precision highp sampler2D;
precision highp sampler2DShadow;
layout(std140) uniform Env { mat4 uVP; mat4 uLS; vec4 E[38]; };
#define uEye E[0].xyz
#define uT E[0].w
#define uSun E[1].xyz
#define uTanH E[1].w
#define uSunCol E[2].xyz
#define uF E[2].w
#define uAmb E[3].xyz
#define uPxN E[3].w
#define uFogCol E[4].xyz
#define uGlowAmt E[4].w
#define uGlowCol E[5].xyz
#define uShdOn E[5].w
#define uSkyTop E[6].xyz
#define uSkyHor E[7].xyz
#define uFog E[8]
#define uCloud E[9]
#define uCloud2 E[10]
#define uWM E[11]
#define uBaseW E[12]
#define uGrade E[13]
#define uTone2 E[14]
#define uG0 E[15].xyz
#define uG1 E[16].xyz
#define uG2 E[17].xyz
#define uG3 E[18].xyz
#define uStem E[19].xyz
#define uSoil E[20].xyz
#define uGK E[21]
#define uStr E[22]
#define uFwd E[23].xyz
#define uRight E[24].xyz
#define uUpV E[25].xyz
#define uCan E[26].xyz
#define uCanR E[26].w
#define uTree E[27]
#define uCloudLit E[28].xyz
#define uCB E[28].w
#define uCloudDark E[29].xyz
#define uCH E[29].w
#define uCK E[30]
#define uAur1 E[31].xyz
#define uAur2 E[32].xyz
#define uSkyK E[33]
#define uLX E[34].xyz
#define uLY E[35].xyz
#define uSunCol2 uSunCol
#define uCOff vec2(E[23].w, E[24].w)
#define uCChurn E[25].w
#define uCWk vec2(E[18].w, E[19].w)
#define uCAge vec3(E[20].w, E[31].w, E[32].w)
#define uSt2 E[36]
#define uSt3 E[37]
`,de=ca+`
uniform sampler2D uNoise, uWind;
uniform sampler2DShadow uShd;
float sunShadow(vec3 p) {
  vec2 q = ((p.xz + uSun.xz / max(uSun.y, .15) * 30.) * 4.2 + uCloud.zw * 4.2 + 900.) / 1700.;
  float c = smoothstep(uCloud.x, uCloud.x + uCloud.y, texture(uNoise, q).r);
  float s = 1. - c * uCloud2.x;
  if (uShdOn > .5) {
    vec4 l = uLS * vec4(p, 1.); vec3 lc = l.xyz * .5 + .5;
    if (lc.x > 0. && lc.x < 1. && lc.y > 0. && lc.y < 1.) s *= mix(.08, 1., texture(uShd, vec3(lc.xy, min(lc.z, 1.) - .0025)));
  }
  return s;
}
vec2 windUV(vec2 xz) {
  float z = max(xz.y, .05);
  return vec2(xz.x / (uWM.z + uWM.w * z) * .5 + .5, log(z / uWM.x) / uWM.y);
}
vec4 windAt(vec2 xz) {
  vec2 uv = windUV(xz);
  vec4 w = texture(uWind, clamp(uv, vec2(0.), vec2(1.)));
  float o = max(max(-uv.x, uv.x - 1.), max(-uv.y, uv.y - 1.));
  return mix(w, vec4(uBaseW.xy, uBaseW.z, 0.), smoothstep(0., .3, o));
}
vec3 skyCol(vec3 d) {
  float y = max(d.y, 0.);
  vec3 c = mix(uSkyHor, uSkyTop, pow(y, .32));
  c += uSkyHor * .22 * exp(-y * 28.);
  float s = max(dot(d, uSun), 0.);
  c += uGlowCol * (pow(s, 8.) * .16 + pow(s, 40.) * .45 + pow(s, 500.) * 1.8);
  return c;
}
vec4 fogFC(vec3 p) {
  vec3 d = p - uEye; float dist = length(d); vec3 v = d / max(dist, 1e-3);
  float b = uFog.y, dy = p.y - uEye.y;
  float k = abs(dy) > .05 ? (1. - exp(-b * dy)) / (b * dy) : 1.;
  float dens = uFog.x * exp(-b * (uEye.y - uFog.z)) * k;
  float f = 1. - exp(-dist * dens);
  float s = pow(max(dot(v, uSun), 0.), uFog.w);
  return vec4(mix(uFogCol, uGlowCol, s * .8), f);
}
vec3 tone(vec3 c) {
  c = max(c * uGrade.w, 0.);
  float m = max(max(c.r, c.g), max(c.b, 1e-4));
  float t = m * (2.51 * m + .03) / (m * (2.43 * m + .59) + .14);
  vec3 a = c * (2.51 * c + .03) / (c * (2.43 * c + .59) + .14);
  c = mix(c * (t / m), a, .3);
  c = pow(clamp(c, 0., 1.), vec3(1. / 2.2));
  float l = dot(c, vec3(.3, .55, .15));
  c = mix(vec3(l), c, uTone2.x);
  c = mix(c, c * c * (3. - 2. * c), uTone2.y);
  c += uGrade.rgb * pow(1. - clamp(l, 0., 1.), 3.);
#ifdef FRAG
  c += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - .5) / 160.;
#endif
  return clamp(c, 0., 1.);
}
vec2 bladeBend(vec3 base, float r2, float fa, out float wm) {
  vec4 W = windAt(base.xz);
  wm = W.z;
  float bl = length(W.xy);
  vec2 wd = bl > 1e-4 ? W.xy / bl : vec2(1., 0.);
  float ph = uT * 4.4 - dot(base.xz, wd) * 1.1 + r2 * 2.4;
  float fl = (sin(ph) * .6 + sin(ph * 2.17 + fa) * .25) * (.03 + .05 * wm);
  return W.xy * (.72 + .56 * r2) + wd * fl + vec2(cos(fa * 2.7), sin(fa * 2.7)) * .17 * (r2 - .35);
}
vec3 bladePt(vec3 base, float h, vec2 b, float s, out vec3 tg) {
  float bl = length(b);
  float th = min(bl, 1.38);
  vec2 d = bl > 1e-4 ? b / bl : vec2(1., 0.);
  vec3 p1 = vec3(0., h * .6, 0.);
  vec3 p2 = vec3(d.x * sin(th) * h, cos(th) * h, d.y * sin(th) * h);
  tg = 2. * (1. - s) * p1 + 2. * s * (p2 - p1);
  return base + 2. * s * (1. - s) * p1 + s * s * p2;
}
`,ps=de+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aP;
layout(location=2) in vec4 aQ;
out vec3 vC;
void main() {
  vec3 base = aP.xyz; float h = aP.w, w = abs(aQ.x), fa = aQ.y, r1 = aQ.z, r2 = aQ.w;
  bool stem = aQ.x < 0.;
  float wm; vec2 b = bladeBend(base, r2, fa, wm);
  float s = aV.x; vec3 tg;
  vec3 P = bladePt(base, h, b, s, tg);
  vec3 te = uEye - base;
  vec2 vp = normalize(vec2(-te.z, te.x));
  vec2 rf = vec2(cos(fa), sin(fa));
  rf *= sign(dot(rf, vp) + 1e-4);
  vec2 wd = normalize(mix(rf, vp, .6));
  vec3 Wd = vec3(wd.x, 0., wd.y);
  float wid = stem ? w : w * (1. - pow(s, 1.4)) * (.8 + .35 * sin(s * 2.6 + .3));
  P += Wd * aV.y * wid * .5;
  gl_Position = uVP * vec4(P, 1.);
  vec3 V = normalize(uEye - P);
  vec3 N = normalize(cross(Wd, normalize(tg)));
  if (dot(N, V) < 0.) N = -N;
  N = normalize(N + vec3(0., .35, 0.));
  float pn = texture(uNoise, base.xz * .019).r;
  float pm = texture(uNoise, base.xz * .061 + .5).g;
  vec3 alb = mix(uG0, uG1, smoothstep(0., .55, s));
  vec3 tipC = mix(uG2, uG3, clamp(r1 * 1.3 - .25 + (pn - .5) * 2.2, 0., 1.));
  alb = mix(alb, tipC, smoothstep(.3, 1., s));
  alb *= .82 + .36 * pm;
  if (stem) alb = mix(uG0, uStem, smoothstep(0., .7, s));
  float sh = sunShadow(base);
  float ndl = dot(N, uSun);
  float diff = max(ndl, 0.);
  float back = max(-dot(normalize(cross(Wd, normalize(tg))), uSun) * sign(dot(cross(Wd, normalize(tg)), V)), 0.);
  float glow = pow(max(dot(-V, uSun), 0.), 4.);
  float tr = (back * .5 + .5) * (.18 + 2.4 * glow) * uGK.y * smoothstep(.15, .9, s);
  vec3 H = normalize(uSun + V);
  float sp = pow(max(dot(N, H), 0.), 22.) * uGK.z;
  float ao = mix(.16 + .2 * smoothstep(9., 2., length(te.xz)), 1., pow(s, .75));
  float bendA = clamp(length(b) / 1.15, 0., 1.);
  vec3 col = alb * (uAmb * (.55 + .45 * N.y) * ao + uSunCol * sh * (diff * .8 * ao + tr * ao));
  col += uSunCol * sh * sp * ao * mix(vec3(1.), alb * 2.5, .5);
  vec2 vxz = normalize(base.xz - uEye.xz + vec2(0., .01));
  float away = clamp(dot(b, vxz), -1., 1.);
  float exb = clamp(length(b) - length(uBaseW.xy) * .9, -.4, 1.);
  col *= max(1. + uGK.x * s * (.7 * away + 1.6 * exb), .2 + .34 * smoothstep(9., 2., length(te.xz)));
  col = mix(col, col * vec3(1.08, 1.04, .94) + uAmb * .15, clamp(exb, 0., 1.) * s * .6);
  col += (alb * .7 + .2 * uAmb) * (uAmb + uSunCol * sh * .3) * max(away, 0.) * bendA * s * uGK.x * .8;
  if (uGK.w > 0.) col += uSunCol * sh * pow(max(dot(N, H), 0.), 90.) * step(.82, fract(r1 * 41.3)) * s * uGK.w * 3.;
  vec4 f = fogFC(P);
  vC = mix(col, f.rgb, f.a);
}`,vs=de+`
in vec3 vC; out vec4 o;
void main() { o = vec4(tone(vC), 1.); }`,xs=de+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aN;
out vec3 vP, vN;
void main() { vP = aPos; vN = aN; gl_Position = uVP * vec4(aPos, 1.); }`,ms=de+`
in vec3 vP, vN; out vec4 o;
float streamX(float z) { return uStr.x * (6. + .08 * z + 3. * sin(z * .035 + uStr.y)) + .8 * sin(z * .11 + uStr.z); }
void main() {
  vec3 P = vP, N = normalize(vN);
  vec3 V = normalize(uEye - P); float dist = length(uEye - P);
  vec4 W = windAt(P.xz);
  float bendA = clamp(length(W.xy) / 1.15, 0., 1.);
  float fn = texture(uNoise, P.xz * .0035 - uBaseW.xy * uT * .012 + .3).r;
  float farF = smoothstep(70., 150., P.z);
  bendA = mix(bendA, clamp((fn - .42) * 2.4 * uBaseW.w + length(uBaseW.xy) * .4, 0., 1.), farF);
  float pn = texture(uNoise, P.xz * .019).r;
  vec3 tipC = mix(uG2, uG3, clamp(.45 + (pn - .5) * 2.2, 0., 1.));
  float farMix = smoothstep(3., 45., dist);
  vec3 alb = mix(mix(uG0, uG1, .5 + .32 * smoothstep(10., 2., dist)), mix(uG1, tipC, .5 + .3 * bendA), farMix);
  float m = texture(uNoise, P.xz * vec2(.21, .13)).b;
  float m2 = texture(uNoise, P.xz * .043).g;
  alb *= .78 + .3 * m + .25 * (m2 - .5);
  float rock = smoothstep(.55, .8, dot(N, vec3(0., 1., 0.)));
  alb = mix(uSoil * 1.4, alb, mix(1., rock, smoothstep(150., 400., dist)));
  float sh = sunShadow(P);
  float ndl = dot(N, uSun);
  float diff = clamp((ndl + .3) / 1.3, 0., 1.);
  float tr = pow(max(dot(-V, uSun), 0.), 3.) * uGK.y * .5 * farMix;
  vec3 col = alb * (uAmb * (.55 + .45 * N.y) + uSunCol * sh * (diff * .8 + tr));
  vec2 vxz = normalize(P.xz - uEye.xz + vec2(0., .01));
  float away = mix(clamp(dot(W.xy, vxz), -1., 1.), (bendA - .3) * 1.2, farF);
  float exb = clamp(mix(length(W.xy) - length(uBaseW.xy) * .9, bendA - .35, farF), -.4, 1.);
  col *= 1. + uGK.x * (.6 * away + 1.9 * exb) * (.4 + .6 * farMix);
  if (uStr.w > .5 && P.z < uSt2.w + 22.) {
    // the water itself is its own level sheet; here only its margin: dark wet peat at the foot of the bank and under the
    // shallows, a pale bar of shingle on the inside of each bend
    float sx = streamX(P.z), pq = (P.z - uSt2.x) * uSt2.y;
    float hw = uSt3.z + uSt3.w * P.z + uSt2.z * exp(-pq * pq) + uSt3.y * smoothstep(uSt3.x, uSt3.x + 22., P.z);
    hw *= sqrt(max(1. - smoothstep(uSt2.w - 16., uSt2.w, P.z), 0.));
    float dx = abs(P.x - sx), e = P.z > uSt2.w ? length(vec2(dx, P.z - uSt2.w)) : dx - hw;
    if (e < 1.6) {
      float bar = smoothstep(.2, .7, (P.x > sx ? -1. : 1.) * sin(P.z * .11 + uStr.z) + (m - .5) * .9) * smoothstep(.4, .62, fn + (m2 - .5) * .5);
      vec3 mud = mix(uSoil * (.45 + .5 * m), vec3(.2, .19, .165) * (.6 + .8 * m), bar);
      float wet = smoothstep(.35 + .55 * bar, -.05, e) * smoothstep(3., 8., P.z);
      col = mix(col, mud * (uAmb + uSunCol * sh * diff * .7) * (.5 + .5 * smoothstep(-.05, .3 + .3 * bar, e)), wet * .92);
    }
  }
  vec4 f = fogFC(P);
  o = vec4(tone(mix(col, f.rgb, f.a)), 1.);
}`,Ga=de+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec4 aA;
layout(location=2) in float aS;
out vec3 vP; out vec4 vA; out float vS;
void main() { vP = aPos; vA = aA; vS = aS; gl_Position = uVP * vec4(aPos, 1.); }`,Wa=de+`
in vec3 vP; in vec4 vA; in float vS; out vec4 o;
uniform sampler2D uSkyB, uSkyC;
void main() {
  vec3 P = vP, Ev = uEye - P; float dist = length(Ev); vec3 V = Ev / dist;
  float a = clamp(vA.x, -1., 1.), hwid = vA.y, mid = 1. - a * a;
  vec2 tg = normalize(vec2(vA.w, 1.)), nr = vec2(tg.y, -tg.x);
  vec4 W = windAt(P.xz);
  float bl = length(W.xy);
  vec2 wd = bl > 1e-4 ? W.xy / bl : vec2(1., 0.);
  vec2 bd = normalize(uBaseW.xy + vec2(1e-5, 0.));
  float fn = texture(uNoise, P.xz * .0035 - uBaseW.xy * uT * .012 + .3).r;
  float spd = mix(W.z, uBaseW.z + clamp((fn - .42) * 2.4 * uBaseW.w, 0., 1.) * 6., smoothstep(70., 150., P.z));
  // a cat's paw: the solved wind speed over the water, broken into patches that travel with it; the strip under the
  // windward bank has no fetch and stays glass
  float cw = dot(wd, nr);
  float fetch = hwid * (1. + a * (cw > 0. ? 1. : -1.)) / max(abs(cw), .25);
  vec2 qw = vec2(dot(P.xz, bd), P.x * bd.y - P.z * bd.x);
  float pt = texture(uNoise, (qw - vec2(uT * .6, 0.)) * vec2(.07, .11)).g;
  float ruf = smoothstep(2., 6.2, spd + (pt - .5) * 4.6) * smoothstep(.1, 1.2, fetch) * (.2 + .8 * smoothstep(.05, .6, mid));
  float riff = clamp(vS * 6. - .08, 0., 1.);
  float flow = clamp(1.7 / hwid, 0., 1.) * mid;
  // slopes: a slow swell, the current's own ripple down the middle of the run (none in the pool and the tarn), wind ripple
  vec2 n0 = texture(uNoise, (P.xz - tg * uT * .22) * vec2(.19, .13)).gb - .5;
  vec2 nf = texture(uNoise, vec2(P.x * .31 + P.z * .07, (P.z - uT * .45) * .17 - P.x * .05) + .63).rg - .5;
  vec2 q1 = qw - vec2(uT * .5, 0.), q2 = qw - vec2(uT * .8, 0.);
  vec2 n1 = texture(uNoise, vec2(q1.x * .83 + q1.y * .31, q1.y * .37 - q1.x * .19) + .37).gb - .5;
  vec2 n2 = texture(uNoise, vec2(q2.x * .47 - q2.y * .23, q2.y * .29 + q2.x * .13) + .11).br - .5;
  vec2 sl = n0 * .018 + nf * (.07 * flow + .16 * riff) + (n1 * .6 + n2 * .5) * ruf * .4;
  vec3 N = normalize(vec3(-sl.x, 1., -sl.y));
  vec3 R = reflect(-V, N);
  // ripples too small to see at a distance lean toward the eye on average: far water takes the sky above the hills
  R.y = abs(R.y) + .006 + .1 * smoothstep(30., 150., dist);
  R = normalize(R);
  float Fr = (.16 + .82 * pow(1. - max(dot(V, N), 0.), 1.8)) * (1. - .22 * ruf);
  // the sky as it is drawn: gradient, then the cloud keyframes, each read where its cloud has drifted to
  vec3 w3 = vec3(uCWk.x, 0., uCWk.y) * R.y;
  vec3 da = R - w3 * uCAge.x, db = R - w3 * uCAge.y;
  vec4 A = texture(uSkyB, vec2(dot(da, uRight), dot(da, uUpV)) / (dot(da, uFwd) * uTanH * 1.06) * .5 + .5);
  vec4 B = texture(uSkyC, vec2(dot(db, uRight), dot(db, uUpV)) / (dot(db, uFwd) * uTanH * 1.06) * .5 + .5);
  vec4 c = mix(A, B, uCAge.z);
  // a ruffled patch throws back the whole sky at once and loses the picture of the clouds: darker than mirrored white
  // cloud, lighter than a mirrored storm deck
  vec3 sc = mix(skyCol(R), mix(uSkyTop, uSkyHor, .4), ruf * .6);
  vec2 rd = normalize(R.xz + vec2(0., 1e-4));
  if (uSkyK.z > 0.) sc += mix(uAur1, uAur2, .35) * pow(texture(uNoise, vec2(rd.x * .35 + uT * .003, .11)).r, 2.) * smoothstep(.02, .14, R.y) * smoothstep(.6, .2, R.y) * .28;
  float sh = sunShadow(P);
  vec3 sn = uSunCol / max(uSunCol.r, max(uSunCol.g, uSunCol.b));
  // what stands above the water: the near bank and its sedge as a dark edge (the far shore of the tarn too), and the
  // far hills below their skyline (measured for each reach), pale with haze
  float tr = R.y / max(length(R.xz), 1e-3);
  float cR = dot(rd, nr);
  float tb = .6 * max(abs(cR), .05) / max(hwid * (1. - a * (cR > 0. ? 1. : -1.)), .05);
  tb = max(tb, .8 / max(uSt2.w - P.z, .5));
  float sw = .012 + .14 * tr;
  float bank = smoothstep(-sw, sw, tb - tr + n0.x * .04);
  float hill = smoothstep(-.012, .012, vA.z - tr + n0.y * .01) * (1. - bank);
  vec3 lc = mix(uG1, uG2, .4) * (uAmb + uSunCol * .42 * sh);
  float ks = (1. - bank) * (1. - hill);
  vec3 rf = sc * ks + mix(lc * .85, uFogCol, .62) * hill + lc * .42 * bank;
  // looking down into it: stones and peat on the bed, lost with depth
  float dep = min(.55, .2 + .12 * hwid) * mid;
  float pb = texture(uNoise, (P.xz + sl * 1.5) * 1.3).b;
  vec3 bed = mix(uSoil, vec3(.26, .23, .18), smoothstep(.3, .7, pb)) * (.25 + .8 * pb) * (uAmb + uSunCol * sh * max(uSun.y, 0.) * 1.2);
  bed *= exp(-dep * vec3(1.6, 1.9, 3.) / max(V.y, .25));
  vec4 f = fogFC(P);
  vec3 col = tone(mix(mix(bed, rf, Fr), f.rgb, f.a) * (1. + ruf * ((n1.x * .6 + n2.x * .5) * .65 - .1)));
  // the clouds and the sun or moon in the mirrored sky
  float kc = ks * Fr * (1. - f.a) * (1. - .65 * ruf);
  float sd = max(dot(R, uSun), 0.);
  col = col * (1. - kc * (1. - c.a)) + (c.rgb + sn * (pow(sd, 1400.) * 1.6 + pow(sd, 90.) * .22) * c.a * sh) * kc;
  // hard glints: single facets that catch the light, on the leading edge of a ruffle and where the bed falls
  vec2 gq = qw * vec2(14., 5.) - vec2(uT * 1.3, 0.), gi = floor(gq);
  float gh = fract(sin(dot(gi, vec2(127.1, 311.7))) * 43758.5453);
  float g = step(.8, gh) * smoothstep(.17, .03, length(fract(gq) - .5 - (vec2(gh, fract(gh * 57.31)) - .5) * .7)) * (.5 + .5 * sin(uT * 7. + gh * 50.)) * smoothstep(70., 25., dist);
  vec3 gc = mix(pow(uSkyHor, vec3(.45)) * .8, sn, c.a * sh * (.2 + .8 * pow(max(dot(rd, normalize(uSun.xz)), 0.), 3.)));
  col += gc * g * (ruf * (1. - ruf) * 4. + riff * .6) * (1.2 - .7 * uSkyK.w);
  o = vec4(clamp(col, 0., 1.), 1.);
}`,qa=`#version 300 es
layout(location=0) in vec2 aV; out vec2 vN;
void main() { vN = aV; gl_Position = vec4(aV, 1., 1.); }`,bs=de+`
in vec2 vN; out vec4 o;
float gS, gB, gE;
float dens(vec3 p, float fine) {
  // wide domes from the low-passed coverage; the billows from two vertical projections (no extruded columns), then two
  // finer octaves of the same that only eat into the surface (turrets on turrets: knobs, then cauliflower), near only
  vec2 q = (p.xz - uCOff) * uCK.y;
  float c = textureLod(uNoise, q, 1.6).r * .76 + textureLod(uNoise, q * 2.3 + .43, 1.6).g * .24;
  float h = uCH * pow(clamp((c - uCK.x) / (1. - uCK.x), 0., 1.), .7);
  float y = p.y - uCB, A = h * .33 + 90.;
  if (h <= 1. || y < -60. || y > h + A * .5 + 10.) { gS = -1e4; return 0.; }
  vec3 r = vec3(p.x - uCOff.x * .86, p.y + uCChurn, p.z - uCOff.y * .86) * uCK.y * 3.4;
  // three projections (two vertical, one level), so no billow is drawn out along x or z into a bar or a hanging leg
  float nb = textureLod(uNoise, r.xz * .7 + vec2(.21, .67), 0.).b;
  float n = .5 + ((textureLod(uNoise, r.xy + vec2(.31, .17), 0.).b + textureLod(uNoise, r.zy + vec2(.73, .41), 0.).b + nb) / 3. - .5) * 1.35;
  float sd = h - y - (n - .5) * A;
  gE = 0.;
  if (fine > 0. && sd > -10. && sd < A * .6) {
    vec3 r2 = r * 3.1, r3 = r * 8.3;
    float n2 = (textureLod(uNoise, r2.xy + vec2(.13, .57), 0.).b + textureLod(uNoise, r2.zy + vec2(.61, .29), 0.).b) * .5;
    float n3 = (textureLod(uNoise, r3.xy + vec2(.47, .83), 0.).b + textureLod(uNoise, r3.zy + vec2(.19, .07), 0.).b) * .5;
    float e = (max(n2 - .3, 0.) * .47 + max(n3 - .3, 0.) * .16) * fine;
    sd -= e * A; gE = e;
  }
  gS = sd; gB = n;
  // the base is flat under the body of a cloud and curls up toward its thin edges, with lumps along it (level noise)
  return smoothstep(0., 40., sd) * smoothstep(-20., 50., y - 300. * (1. - smoothstep(0., 700., h)) + (nb - .5) * 150.);
}
float densL(vec3 p) {
  vec2 q = (p.xz - uCOff) * uCK.y;
  float c = textureLod(uNoise, q, 1.6).r * .76 + textureLod(uNoise, q * 2.3 + .43, 1.6).g * .24;
  float h = uCH * pow(clamp((c - uCK.x) / (1. - uCK.x), 0., 1.), .7), y = p.y - uCB;
  if (h <= 1. || y < -60.) return 0.;
  vec2 r = vec2(p.x - uCOff.x * .86, p.z - uCOff.y * .86) * uCK.y * 3.4;
  float nb = textureLod(uNoise, r * .7 + vec2(.21, .67), 0.).b;
  return smoothstep(0., 40., h - y - (nb - .5) * (h * .2 + 50.)) * smoothstep(-20., 50., y - 300. * (1. - smoothstep(0., 700., h)) + (nb - .5) * 150.);
}
void main() {
  vec3 d = normalize(uFwd + (uRight * vN.x + uUpV * vN.y) * (uTanH * 1.06));
  float s = dot(d, uSun);
  float Tr = 1.; vec3 acc = vec3(0.);
  // below about 4 degrees the layer goes into the haze over a soft band, so nothing ruled is left at the horizon
  float kE = smoothstep(.1, .02, d.y);
  if (d.y > .004 && kE < .999) {
    float t0 = (uCB - 60. - uEye.y) / d.y, t1 = (uCB + uCH * 1.17 + 70. - uEye.y) / d.y;
    if (t0 < 90000.) {
      int N = int(uCK.w);
      // steps a fixed share of the distance (floored at the near step), so far cloud is sampled as finely per pixel as
      // near cloud; where a step lands in cloud, three halvings find the surface between it and the last clear sample and
      // the march goes on from there in quarter steps: the outline sits on the cloud, not on a row-dependent grid (no comb)
      float dn = (uCH + 60.) / uCK.w * .5, t = t0, st = max(dn, t * .016);
      float g = .62, hg = (1. - g * g) / pow(1. + g * g - 2. * g * s, 1.5);
      float ph = .5 + .11 * hg;
      vec3 ls = normalize(uSun + vec3(0., .06, 0.)), hz = skyCol(d) * .25;
      // the low storm deck (hS) stands in thick air: each sample past 2.5 km goes into the haze, so its far banks fade
      // instead of hanging as pale bars and legs under the near deck; its shade also has the strongest body
      float hS = step(uCB, 1000.);
      float dp = 0., lo = 0., hi = 0.; int md = 0, NI = N + 100;
      for (int i = 0; i < 164; i++) {
        if (i >= NI || t > t1 || Tr < .025) break;
        vec3 p = uEye + d * t;
        float de = dens(p, smoothstep(12000., 4000., t)), sS = gS, sB = gB, sE = gE, od = de * 40.;
        // two light samples toward the sun, from the cheap field (domes and level billows only: the light is soft anyway)
        if (de + dp > .003 && (md == 0 || md == 4)) od += densL(p + ls * 150.) * 150. + densL(p + ls * 520.) * 400.;
        if (md > 0 && md < 4) {
          if (de > .003) hi = t; else lo = t;
          md++;
          t = md < 4 ? (lo + hi) * .5 : hi;
          st = hi - lo;
        } else if (md == 0 && dp <= .003 && de > .003) {
          lo = t - st; hi = t; md = 1; t = (lo + hi) * .5;
        } else {
          float cs = max(dn, t * .016);
          float dm = (de + dp) * .5; dp = de;
          if (dm > .0015) {
            od *= uCK.z * .42;
            float y = clamp((p.y - uCB) / uCH, 0., 1.);
            float pw = 1. - exp(-de * 3.);
            // the shade has a body: thin edges and tops lighter, cores and the base darker, the billows showing as lumps
            float th = (.5 + .66 * (1. - smoothstep(0., 520., sS))) * (.66 + .68 * sB);
            th = mix(1. + (th - 1.) * .45, th, hS);
            // the lit side: knobs that stand out catch the sun, the creases between them (where the fine octaves ate in) less
            vec3 L = uCloudLit * (exp(-od) + .35 * exp(-od * .25) + .035 * exp(-od * .06)) * ph * (.55 + .45 * pw) * (1. - mix(1.1, 1.6, hS) * sE) + uCloudDark * (.55 + .75 * y) * th;
            float a = 1. - exp(-dm * uCK.z * mix(1.5, 2.5, hS) * min(1., 90. / cs) * st);
            float kt = (1. - exp(-max(t - 2500., 0.) / 5500.)) * .9 * hS;
            acc += Tr * a * mix(L, hz, kt); Tr *= 1. - a * (1. - kt);
          }
          md = de > .003 ? 4 : 0;
          // quarter steps inside, and in clear air within a step of a surface (so thin tops and wisps are not met on
          // alternate rows only: no comb)
          st = md == 4 || sS > -cs ? cs * .25 : cs;
          t += st;
        }
      }
      // the higher layers fade by the distance to their base, as before (a low sun keeps shining through far cloud)
      float k = max(kE, (1. - exp(-t0 / 17000.)) * .9 * (1. - hS));
      acc = acc * (1. - k) + hz * (1. - Tr) * k;
      Tr = mix(Tr, 1., k);
    }
  }
  float cv = 1. - Tr;
  o = vec4(tone(acc / max(cv, 1e-3)) * cv, Tr);
}`,ys=de+`
in vec2 vN; out vec4 o;
uniform sampler2D uSkyB, uSkyC;
float hsh(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
void main() {
  vec3 d = normalize(uFwd + (uRight * vN.x + uUpV * vN.y) * uTanH);
  vec3 col = skyCol(d);
  float s = dot(d, uSun);
  // the tight halo is drawn below with the disc: less of it here leaves the sun room to be brighter than its sky
  col -= uGlowCol * pow(max(s, 0.), 500.) * .35;
  if (uSkyK.z > 0. && d.y > 0.) {
    vec3 q = d * 300.; vec3 id = floor(q);
    float h = hsh(id);
    vec3 cp = id + .5 + (vec3(hsh(id + 1.), hsh(id + 2.), hsh(id + 3.)) - .5) * .6;
    col += vec3(.8, .85, 1.) * smoothstep(.2, .0, length(q - cp)) * step(.988, h) * smoothstep(.0, .15, d.y) * (h - .988) * 60.;
    vec3 acc = vec3(0.);
    int N = int(uSkyK.y);
    for (int i = 0; i < 32; i++) {
      if (i >= N) break;
      float fi = float(i);
      float t = (60. + fi * 34.) / max(d.y, .015);
      vec2 p = d.xz * t;
      float zc = 1000. + 300. * sin(p.x * .0016 + 1.3 + uT * .02) + 140. * sin(p.x * .0047 - uT * .045) + 60. * sin(p.x * .013 + uT * .08);
      float band = (p.y - zc) / 130.;
      float n = textureLod(uNoise, vec2(p.x * .0005 + uT * .003, .11), 0.).r;
      float ray = textureLod(uNoise, vec2(p.x * .0016 + uT * .006, .37), 0.).g;
      acc += mix(uAur1, uAur2, smoothstep(2., 9., fi)) * exp(-band * band) * (.2 + 1.5 * n * n) * (.45 + ray * ray) * exp(-fi * .19);
    }
    col += acc * .13 * smoothstep(0., .05, d.y);
  }
  // each keyframe is read where its cloud was: the layer slides along the wind, so the ray is moved back by its age
  vec3 w = vec3(uCWk.x, 0., uCWk.y) * max(d.y, 0.);
  vec3 da = d - w * uCAge.x, db = d - w * uCAge.y;
  vec4 A = texture(uSkyB, vec2(dot(da, uRight), dot(da, uUpV)) / (dot(da, uFwd) * uTanH * 1.06) * .5 + .5);
  vec4 B = texture(uSkyC, vec2(dot(db, uRight), dot(db, uUpV)) / (dot(db, uFwd) * uTanH * 1.06) * .5 + .5);
  vec4 c = mix(A, B, uCAge.z);
  // the sun (the moon at night) goes on after the clouds and is screened on, so nothing clips to a white patch: a
  // small cream disc through what the clouds let pass, a warm glow that falls off fast, warm light on cloud edges near it
  vec3 sn = uSunCol / max(uSunCol.r, max(uSunCol.g, uSunCol.b));
  float ang = sqrt(2. * max(1. - s, 0.)) / uSkyK.x, nt = uSkyK.w;
  vec3 base = tone(col) * c.a + c.rgb;
  float edge = 4. * c.a * (1. - c.a);
  // the glow is a warming of the sky round the disc (its blue taken down) more than a brightening, so the core stays the lightest thing
  float g1 = exp(-ang * .5), g2 = exp(-ang * .12), vis = (.45 + .55 * c.a) * (1. - .55 * nt);
  base *= mix(vec3(1.), pow(sn, vec3(.35)), min((g1 * .5 + g2 * .9) * vis, 1.));
  vec3 gw = pow(sn, vec3(.7)) * ((g1 * .46 + g2 * .26) * vis + edge * exp(-ang * .045) * (.3 - .2 * nt));
  base = 1. - (1. - base) * (1. - min(gw, vec3(.8)));
  vec3 core = pow(sn, vec3(.17)) * (.985 - .08 * nt);
  if (nt > .5) {
    vec3 od = (d - uSun) / uSkyK.x;
    float mr = textureLod(uNoise, vec2(dot(od, uRight), dot(od, uUpV)) * .15 + .37, 0.).r;
    core *= (.78 + .22 * smoothstep(.62, .36, mr)) * (1. - .1 * min(ang * ang, 1.));
  }
  o = vec4(mix(base, max(base, core), smoothstep(1.18, .78, ang) * smoothstep(0., .5, c.a)), 1.);
}`,ws=ca+`
layout(location=0) in vec3 aPos;
void main() { gl_Position = uLS * vec4(aPos, 1.); }`,As=`#version 300 es
precision mediump float; out vec4 o; void main() { o = vec4(1.); }`,gs=ca+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aP;
layout(location=3) in vec4 aK;
out vec2 vUV; flat out float vCell;
void main() {
  float cs = cos(aK.z), sn = sin(aK.z);
  vec2 o = vec2(aV.x * cs - aV.y * sn, aV.x * sn + aV.y * cs) * aP.w;
  vUV = aV; vCell = aK.w;
  gl_Position = uLS * vec4(aP.xyz + uLX * o.x + uLY * o.y, 1.);
}`,Es=`#version 300 es
precision mediump float; precision mediump sampler2D;
uniform sampler2D uLeaf; in vec2 vUV; flat in float vCell; out vec4 o;
void main() {
  vec2 cuv = (vUV * .5 + .5) * .5 + vec2(mod(vCell, 2.), floor(vCell * .5)) * .5;
  if (texture(uLeaf, cuv).a < .5) discard;
  o = vec4(1.);
}`,Ms=de+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aN;
layout(location=2) in vec3 aCol;
layout(location=3) in float aM;
out vec3 vP, vN, vCol; flat out float vM;
void main() {
  vec3 P = aPos; float m = aM;
  if (m > 9.5) { float w = m - 10.; w *= w; P.xz += uTree.xy * w; P.y -= dot(uTree.xy, uTree.xy) * w * .12; m = 0.; }
  vP = P; vN = aN; vCol = aCol; vM = m; gl_Position = uVP * vec4(P, 1.);
}`,Ss=de+`
in vec3 vP, vN, vCol; flat in float vM; out vec4 o;
void main() {
  vec3 V = normalize(uEye - vP);
  vec3 col;
  float sh = sunShadow(vP);
  if (vM > 1.5 && vM < 2.5) {
    col = vCol * (uAmb * .35 + uSunCol * sh * .06);
  } else {
    vec3 N = normalize(vN);
    if (dot(N, V) < 0.) N = -N;
    float ndl = dot(N, uSun);
    float diff = clamp((ndl + .15) / 1.15, 0., 1.);
    vec3 alb = vCol;
    if (vM < .5) alb *= .8 + .4 * texture(uNoise, (vP.xz + vP.yy * vec2(.7, -.5)) * vec2(1.7, 2.3)).b;
    else if (vM > 3.5) {
      // weathered wood: grain running up the post, a few dark checks
      vec2 gq = vec2((vP.x - vP.z) * 2.3, vP.y * .09);
      alb *= (.6 + .75 * texture(uNoise, gq).g) * (1. - .5 * smoothstep(.36, .27, texture(uNoise, gq * vec2(3.1, .8) + .4).b));
    }
    col = alb * (uAmb * (.6 + .4 * N.y) + uSunCol * sh * diff * .85);
    if (vM > .5 && vM < 1.5) {
      // thin cloth: its shaded side still glows with what comes through, in the dye's own deeper colour
      vec3 tc = vCol * vCol / max(max(vCol.r, vCol.g), max(vCol.b, 1e-3));
      col += tc * uSunCol * sh * max(-ndl, 0.) * (.26 + 1.1 * pow(max(dot(-V, uSun), 0.), 3.));
    }
    if (vM > 2.5 && vM < 3.5) { vec3 H = normalize(uSun + V); col += uSunCol * sh * pow(max(dot(N, H), 0.), 40.) * 1.5 + skyCol(reflect(-V, N)) * .35; }
  }
  vec4 f = fogFC(vP);
  o = vec4(tone(mix(col, f.rgb, f.a)), 1.);
}`,Rs=de+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aP;
layout(location=2) in vec4 aC;
layout(location=3) in vec4 aK;
out vec2 vUV, vPx; out vec4 vCol; out vec3 vLit, vNb; out vec4 vFog; out float vBack, vSd; flat out int vKind;
void main() {
  int k = int(aK.x + .5);
  vec3 c = aP.xyz; float sz = aP.w;
  vec2 sq = vec2(1.); float rot = 0.;
  vec3 nb = vec3(0., 1., 0.), fl = vec3(0.);
  float gust = 0.;
  if (k >= 4) {
    float wm; vec2 b = bladeBend(c, aK.z, aK.w, wm); vec3 tg;
    c = bladePt(c, aK.y, b, 1., tg);
    nb = normalize(tg);
  } else if (k == 0) {
    vec4 W = windAt(c.xz);
    float hw = clamp((c.y - uTree.z) / uTree.w, 0., 1.3), ph = aK.y, gs = .02 + .017 * W.z;
    c.xz += uTree.xy * hw * hw;
    // each clump tosses on its own (its cards share a phase), harder in a gust, and gives downwind with the air at it
    c += (vec3(sin(uT * 2.3 + ph), .5 * sin(uT * 3.1 + ph * 1.7), cos(uT * 1.9 + ph * 1.3)) * gs + vec3(W.x, -.25 * length(W.xy), W.y) * .13) * hw;
    rot = aK.z + sin(uT * 4.3 + ph * 2.3) * (.07 + .05 * W.z);
    gust = clamp(W.z * .12 - .35, 0., 1.) * smoothstep(.3, 1., sin(uT * 4.3 + ph * 2.3));
    nb = normalize(aP.xyz - uCan + vec3(0., .3 * uCanR, 0.));
  } else rot = aK.z;
  vCol = aC;
  if (k == 0) {
    vec3 rel = (aP.xyz - uCan) / uCanR;
    // alpha carries what was worked out once per card: sun reaching it (whole part) and open sky above it (fraction)
    vCol.rgb *= (.34 + .66 * fract(aC.a)) * (.7 + .3 * clamp(length(rel), 0., 1.));
    // in a gust some leaves turn their pale undersides out
    vCol.rgb = mix(vCol.rgb, vCol.rgb * 1.35 + vec3(.04, .05, .03), gust * .6);
    vCol.a = floor(aC.a) / 255.;
  }
  vec4 cc = uVP * vec4(c, 1.);
  float r = max(sz * uF / cc.w, uPxN * (k >= 4 ? .9 : 1.3));
  float cs = cos(rot), sn = sin(rot);
  vec2 o = vec2(aV.x * cs - aV.y * sn, aV.x * sn + aV.y * cs) * sq;
  if (k == 2) o *= vec2(1., .25 + .4 * abs(sin(aK.w + uT * 3.)));
  vec3 V = normalize(uEye - c);
  if (k == 4) {
    // a flower head is a real little disc: it looks up, leans a little with its stem, to the sun and its own way, and
    // is never seen thinner than about half (the near ones a little flatter than the far)
    float nr = smoothstep(16., 5., cc.w), f0 = mix(.6, .5, nr), bowl = 0., h1 = fract(aK.z * 91.7), lean = .16;
    // poppies, from the head's own hash: one in six a bud hanging small on its crook, one in ten a bare capsule; the
    // open ones tilt further (some seen side-on), their near wall dropped a little so a tilted head reads as a bowl
    if (aC.a > 1.5 && aC.a < 2.5) {
      if (h1 < .1667) { r *= .4; f0 = 1.; c.y -= r * cc.w / uF * 1.4; }
      else if (h1 < .2667) { r *= .42; f0 = 1.; }
      else { f0 = mix(.4, .3, nr); bowl = .5; lean = .2 + .45 * fract(aK.z * 29.3); }
    }
    vec3 ax = normalize(vec3(0., 1., 0.) + nb * .45 + uSun * .25 + vec3(cos(aK.w * 5.3), 0., sin(aK.w * 5.3)) * lean);
    float dv = dot(ax, V), f = max(dv, f0);
    ax = f * V + sqrt(1. - f * f) * normalize(ax - dv * V + 1e-4);
    vec3 e1 = normalize(cross(ax, uFwd)), e2 = cross(e1, ax);
    float wr = r * cc.w / uF;
    gl_Position = uVP * vec4(c + (e1 * aV.x + e2 * aV.y) * wr - ax * (wr * bowl * (1. - f) * step(aV.y, 0.)), 1.);
    fl = vec3(dot(uSun, e1), dot(uSun, e2), nr);
    nb = ax; sq.x = f;
  } else gl_Position = cc + vec4(o * r * cc.w, 0., 0.);
  vPx = vec2(r / uPxN, sq.x);
  vUV = aV; vKind = k; vNb = k == 4 ? fl : nb; vSd = k == 0 ? aK.w : aK.z;
  float sh = sunShadow(c);
  vBack = pow(max(dot(-V, uSun), 0.), 3.) * (k == 0 ? .4 + .6 * sh : sh);
  vLit = uAmb + uSunCol * sh * (.45 + .45 * max(dot(nb, uSun), 0.));
  vFog = fogFC(c);
}`,Ts=de+`
in vec2 vUV, vPx; in vec4 vCol; in vec3 vLit, vNb; in vec4 vFog; in float vBack, vSd; flat in int vKind;
uniform sampler2D uLeaf;
out vec4 o;
void main() {
  vec2 uv = vUV; float r = length(uv);
  vec3 col = vec3(0.); float a = 0.; bool add = false;
  float ang = atan(uv.y / (abs(uv.x) + 1e-5));
  if (uv.x < 0.) ang = (uv.y < 0. ? -3.14159 : 3.14159) - ang;
  if (vKind == 0) {
    vec4 lf = texture(uLeaf, (uv * .5 + .5) * .5 + vec2(mod(vSd, 2.), floor(vSd * .5)) * .5);
    a = lf.a;
    if (a < .1) discard;
    vec3 N = normalize(vNb * .8 + (uRight * uv.x + uUpV * uv.y) * .3 + uSun * (lf.g - .5) * .9);
    // vCol.a: the sun this card gets (the lit side of its own clump, and not behind another clump)
    float lit = vCol.a * (.45 + .8 * lf.g);
    vec3 alb = vCol.rgb * (.5 + .65 * lf.r);
    col = alb * (uAmb * (.5 + .4 * N.y) + uSunCol2 * lit * .8);
    float rim = pow(1. - max(dot(vNb, -uFwd), 0.), 1.5);
    col += alb * uSunCol2 * vBack * (.25 + rim) * (.35 + .65 * lf.b) * 1.3 * (.12 + .88 * vCol.a);
  } else if (vKind == 1) {
    float fib = .55 + .45 * sin(ang * 15. + vSd * 23.);
    float puff = smoothstep(1., .25, r) * (.3 + .45 * fib);
    float ds = length(uv - vec2(0., -.62));
    float seed = smoothstep(.3, .12, ds);
    a = max(puff, seed);
    col = mix(vCol.rgb * vLit + vCol.rgb * uSunCol * vBack * 1.4, vec3(.22, .17, .1) * vLit, seed);
    col += vCol.rgb * uGlowAmt * 2.2 * puff;
  } else if (vKind == 2) {
    a = smoothstep(1., .75, r);
    col = vCol.rgb * (vLit + uSunCol * vBack * 1.3) * (.85 + .3 * uv.y);
  } else if (vKind == 3) {
    a = exp(-r * r * 4.) * vCol.a;
    col = vCol.rgb * (1. + 3. * exp(-r * r * 30.));
    add = true;
  } else if (vKind == 4 && vCol.a > 1.5 && vCol.a < 2.5) {
    // a field poppy: four crumpled silk petals (two broad outer ones, two narrower inner ones a quarter turn on) in a
    // shallow bowl; a pale capsule ringed with blue-black stamens, on most a dark blotch at each petal's base. From the
    // head's own hash: a hanging bud, a bare seed capsule, or one petal dropped. Heads a few pixels across stay a plain fleck.
    float px = vPx.x, nr = smoothstep(4., 14., px), ck = smoothstep(2.5, 6., px);
    float h1 = fract(vSd * 91.7), h2 = fract(vSd * 53.3 + .31), h3 = fract(vSd * 17.9 + .67);
    float lu = dot(uv, vNb.xy);
    vec3 pc = vCol.rgb;
    if (h1 < .1667) {
      // the bud: a hairy green oval hanging askew from its crook (never upright), its sepals parting at the tip on some
      float ba = (h2 - .5) * 1.6 + (h2 < .5 ? -.5 : .5), cb = cos(ba), sb = sin(ba);
      uv = vec2(cb * uv.x - sb * uv.y, sb * uv.x + cb * uv.y);
      float e = length((uv - vec2(0., .04)) / vec2(.6, .92));
      a = smoothstep(1., .84, e);
      if (a < .05) discard;
      vec3 bc = vec3(.13, .2, .055) * (.85 + .35 * lu + .2 * smoothstep(.3, -.7, uv.y));
      bc = mix(bc, pc * .8, smoothstep(.12, .0, abs(uv.x)) * smoothstep(.5, .9, uv.y) * step(.5, h2));
      col = bc * vLit + bc * uSunCol * vBack * 2. * smoothstep(.55, 1., e) + vec3(.1, .12, .06) * vLit * smoothstep(.8, 1., e);
    } else if (h1 < .2667) {
      // a bare seed capsule: a grey-green pepper pot under a flat ribbed cap
      vec2 q = uv - vec2(0., -.1);
      float body = length(q / vec2(.58, .78)), cap = max(abs(uv.x) / .66, abs(uv.y - .62) / .13);
      a = max(smoothstep(1., .86, body), smoothstep(1., .8, cap));
      if (a < .05) discard;
      vec3 kc = vec3(.2, .24, .13) * (.8 + .4 * smoothstep(.4, -.4, uv.x) + .25 * lu);
      kc = mix(kc, vec3(.17, .17, .11) * (.85 + .3 * sin(uv.x * 26.)), smoothstep(1., .85, cap));
      col = kc * vLit + kc * uSunCol * vBack * .8;
    } else {
      float th0 = h2 * 6.2832, gone = h1 < .3917 ? floor(h3 * 4.) : -1.;
      float wob = (texture(uNoise, vec2(ang * .9, vSd * 3.7)).a - .5) * .1 * nr;
      float ro = 0., ri = 0., dao = 0., dai = 0.;
      for (int i = 0; i < 4; i++) {
        float fi = float(i), da = mod(ang - th0 - fi * 1.5708 + 3.1416, 6.2832) - 3.1416;
        float L = fi == gone ? 0. : .82 + .18 * fract(sin(fi * 7.31 + vSd * 41.7) * 4375.85);
        float inner = mod(fi, 2.);
        float R = L * pow(max(cos(da * mix(.82, 1.02, inner)), 0.), mix(.3, .42, inner)) + wob;
        if (inner > .5) { if (R > ri) { ri = R; dai = da; } } else if (R > ro) { ro = R; dao = da; }
      }
      float oR = max(ro, ri);
      a = smoothstep(oR, oR - .1, r);
      if (a < .05) discard;
      bool top = r < ri;
      float da = top ? dai : dao;
      // silk: folds running out from the base, a darker line where an inner petal lies on an outer one, the rim a shade paler
      float kf = 17. + floor(h2 * 7.);
      float fold = 1. - .14 * nr * smoothstep(.3, 1., sin(ang * kf + h3 * 20. + r * 4.)) * smoothstep(.15, .7, r);
      float sh = top ? 1.06 : .9 - .4 * nr * exp(-max(r - ri, 0.) * 14.);
      float shp = (.74 + .26 * smoothstep(.1, .55, r)) * (1. - .5 * lu) * fold * sh * (1. + .08 * (fract(sin(da * 3. + vSd) * 43758.5) - .5) * nr);
      // the shade turns crimson, never black; the near wall of a tilted head shows the petal's back, duller and paler
      vec3 base = mix(pc * vec3(.8, .45, .62), pc, clamp(shp * 1.5 - .45, 0., 1.)) * shp;
      float bk = smoothstep(.2, -.2, uv.y + .15 * uv.x * uv.x) * clamp((1. - vPx.y) * 1.6, 0., 1.);
      base = mix(base, pc * vec3(.7, .9, 1.) + vec3(.05, .016, .024), bk * .85);
      // the middle: a pale green capsule with a ribbed cap, a ring of blue-black stamens, the blotches at the petal bases
      float ring = .16 * (1. + .12 * sin(ang * 11. + vSd * 30.) * nr);
      float blot = h3 < .667 ? (.25 + .15 * fract(sin(floor((ang - th0) / 1.5708 + .5) * 3.7 + vSd * 9.1) * 437.5)) * pow(max(cos(da * 1.6), 0.), .6) : 0.;
      vec3 mid = mix(vec3(.3, .36, .16) * (1. - .3 * step(.6, sin(ang * 8.))), vec3(.05, .035, .06), smoothstep(.06, .08, r));
      float mk = max(smoothstep(ring + .02, ring - .02, r), smoothstep(blot + .03, blot - .03, r) * step(.1, blot)) * ck;
      base = mix(base, mid, mk);
      col = base * (vLit * (.8 + .2 * uv.y)) + (pc + vec3(0., .03, 0.)) * uSunCol * vBack * 1.4 * smoothstep(.14, 1., r) * (1. - mk) * (1. - .5 * bk);
    }
  } else if (vKind == 4) {
    int v = int(vCol.a + .5);
    float pet, cen = .28, np = 6.5, cup = -.5;
    vec3 pc = vCol.rgb, cc = vec3(.95, .72, .12);
    if (v == 0) {
      // a daisy: 21 to 34 narrow rays of slightly different lengths, two or three missing, round a domed middle
      float nRay = 21. + floor(fract(vSd * 37.1) * 14.), ri = mod(floor(ang * nRay / 6.2832 + .5), nRay);
      float rh = fract(sin(ri * 12.9898 + vSd * 78.233) * 43758.5453);
      float L = rh < .09 ? .45 : .84 + .16 * fract(rh * 7.13);
      // far (a few pixels across) the rays merge into the old soft white star, so a small daisy stays a clean white fleck
      pet = mix(.55 + .45 * pow(abs(cos(ang * 6.5)), .6), .3 + (L - .3) * pow(abs(cos(ang * nRay * .5)), .45), smoothstep(7., 16., vPx.x));
      cc *= 1. - .4 * smoothstep(.08, .28, r);
    }
    else if (v == 1) { pet = .72 + .28 * abs(cos(ang * 2.5)); cen = .2; cc = pc * .7; np = 2.5; cup = .8; }
    else if (v == 2) { pet = .78 + .22 * abs(cos(ang * 2.)); cen = .22; cc = vec3(.06, .04, .05); np = 2.; cup = 1.; }
    else if (v == 3) { pet = .6 + .4 * abs(fract(ang * 1.9) - .5) * 2.; cen = .25; cc = pc * .5; np = 5.97; cup = -.3; }
    else { pet = .8 + .2 * texture(uNoise, uv * .4 + vSd).a; cen = 0.; np = 3.; cup = .4; }
    a = smoothstep(pet, pet - .12, r);
    if (a < .05) discard;
    // shape, on the near ones (vNb.z): each petal its own tone, shade toward the middle, and one wall of a cupped flower
    // (poppy, buttercup) or one shoulder of a domed one (daisy, cornflower) catching the light; vNb.xy is the light in the disc
    float lu = dot(uv, vNb.xy), nr = vNb.z;
    float pv = fract(sin(floor(ang * np / 3.14159 + .5) * 12.9898 + vSd * 78.233) * 43758.5453);
    float shp = (1. + (pv - .5) * .24) * (.72 + .28 * smoothstep(cen, cen + .4, r)) * (1. - cup * .5 * lu);
    vec3 base = mix(pc * mix(1., shp, nr), cc * (1. + nr * lu), smoothstep(cen + .06, cen - .04, r));
    base *= 1. - .3 * nr * smoothstep(.09, 0., abs(r - cen - .04)) * step(.01, cen);
    col = base * (vLit * (.8 + .2 * uv.y)) + base * uSunCol * vBack * 1.5 * smoothstep(cen, 1., r);
  } else {
    float n = texture(uNoise, uv * .45 + vSd * 2.1).a;
    float fib = .6 + .4 * sin(ang * 21. + vSd * 13.);
    a = smoothstep(1., .55, r + (n - .5) * .35) * (.55 + .45 * fib) * vCol.a;
    a = max(a, smoothstep(.22, .12, r));
    if (a < .2) discard;
    col = vec3(.92, .92, .88) * (vLit * (.75 + .25 * uv.y)) + vec3(1.) * uSunCol * vBack * 1.6 * smoothstep(.2, 1., r);
    col += vec3(.6, .9, 1.) * uGlowAmt * 1.5;
    col = mix(col, vec3(.35, .32, .2) * vLit, smoothstep(.2, .1, r));
  }
  col = mix(col, vFog.rgb, vFog.a);
  vec3 t = tone(col);
  if (vKind == 0 || vKind >= 4) o = vec4(t, a);
  else o = vec4(t * a, add ? 0. : a);
}`;function ks(s,t,x,T,F,p,S,V,U,C,P,I,G,O,_,D,L,W,H,N,yt,at,xt){for(let K=0;K<x;K++){const ct=T[K]*I-F[K]*P,Rt=F[K]*I+T[K]*P,Z=p[K]*O-S[K]*G,_t=S[K]*O+p[K]*G,Ot=Rt*Z,jt=ct*_t,ne=(U[K]*D-V[K]*_)*C[K];s[K]+=(Ot*W+jt*N+ne*at)*xt,t[K]-=(Ot*L+jt*H+ne*yt)*xt}}function zs(s,t,x,T,F,p,S,V,U,C,P,I,G){for(let O=0;O<V;O++){const _=F[O];for(let D=0;D<S;D++){const L=O*S+D,W=Math.max(_-t[L]*U,.05);let H=Math.log(W/C)*P-.5,N=((p[L]-s[L]*U)/(I+G*W)+1)*.5*S-.5;N<0?N=0:N>S-1.001&&(N=S-1.001),H<0?H=0:H>V-1.001&&(H=V-1.001);const yt=N|0,at=H|0,xt=N-yt,K=H-at,ct=at*S+yt,Rt=(1-xt)*(1-K),Z=xt*(1-K),_t=(1-xt)*K,Ot=xt*K;x[L]=s[ct]*Rt+s[ct+1]*Z+s[ct+S]*_t+s[ct+S+1]*Ot,T[L]=t[ct]*Rt+t[ct+1]*Z+t[ct+S]*_t+t[ct+S+1]*Ot}}}function Fs(s,t,x,T,F,p,S,V,U){for(let C=0;C<p;C++)for(let P=0;P<F;P++){const I=C*F+P,G=P>0?I-1:I,O=P<F-1?I+1:I,_=C>0?I-F:I,D=C<p-1?I+F:I;x[I]=s[I]+.06*(s[G]+s[O]+s[_]+s[D]-4*s[I]),T[I]=t[I]+.06*(t[G]+t[O]+t[_]+t[D]-4*t[I]),x[I]+=(V-x[I])*S,T[I]+=(U-T[I])*S}}function Cs(s,t,x,T,F,p,S,V,U,C,P,I){for(let G=0;G<P;G++)for(let O=0;O<C;O++){const _=G*C+O,D=O<C-1?s[_+1]:s[_],L=O>0?s[_-1]:s[_],W=G<P-1?t[_+C]:t[_],H=G>0?t[_-C]:t[_];x[_]=(D-L)/(2*F[G])+(W-H)/(2*p[G])}for(let G=0;G<5;G++)for(let O=0;O<2;O++)for(let _=0;_<P;_++){const D=S[_],L=V[_],W=U[_],H=(_+1)*I+1,N=_*C;for(let yt=_+O&1;yt<C;yt+=2){const at=H+yt;T[at]+=(((T[at-1]+T[at+1])*D+(T[at-I]+T[at+I])*L-x[N+yt])*W-T[at])*1.7}}for(let G=0;G<P;G++){const O=.5/F[G],_=.5/p[G],D=(G+1)*I+1;for(let L=0;L<C;L++){const W=G*C+L,H=D+L;s[W]-=(T[H+1]-T[H-1])*O,t[W]-=(T[H+I]-T[H-I])*_}}}function Ps(s,t,x,T,F,p,S,V){for(let P=0;P<S;P++){const I=ot(s[P],t[P])+1e-5,G=1.3*(1-Math.exp(-I/5))/I;F[P]+=(26*(s[P]*G-x[P])-2.9*F[P])*V,p[P]+=(26*(t[P]*G-T[P])-2.9*p[P])*V,x[P]+=F[P]*V,T[P]+=p[P]*V}}const Ha=(s,t)=>s.valSide*(6+.08*t+3*Math.sin(t*.035+s.valPh)),qo=(s,t)=>Ha(s,t)+.8*Math.sin(t*.11+s.valPh2),Ho=(s,t)=>{const x=(t-s.pz)*s.pil,T=s.b0+s.b1*t+s.pw*Math.exp(-x*x)+s.tw*qt(s.tz,s.tz+22,t);return t>s.zE-16?T*Math.sqrt(Math.max(0,1-qt(s.zE-16,s.zE,t))):T},Xa=(s,t,x)=>{const T=Math.abs(t-qo(s,x));return x>s.zE?Math.sqrt(T*T+(x-s.zE)*(x-s.zE)):T-Ho(s,x)},Ya=(s,t,x)=>s.VALLEY&&Xa(s,t,x)<.3,ja=(s,t,x)=>s.VALLEY&&Math.abs(t-qo(s,x))<(.9+.015*x)*1.25,m0=(s,t)=>{const x=bt(t,0,s.wl.length-1.001),T=x|0,F=x-T;return s.wl[T]*(1-F)+s.wl[T+1]*F};function _s(s,t,x,T){const F=qt(2,7,x)*(1-qt(s.zE+6,s.zE+24,x));if(F<=0)return T;const p=qo(s,x),S=Math.abs(t-p),V=Ho(s,x),U=5+.05*x,C=x>s.zE?Math.sqrt(S*S+(x-s.zE)*(x-s.zE)):S-V;if(C>=U)return T;let P;if(C<=0){const I=S/V;P=-Math.min(.55,.2+.12*V)*(1-I*I)}else P=(.05+.27*qt(-.4,.7,Math.sin(x*.11+s.valPh2)*(t>p?1:-1)))*(1-Math.exp(-C/.2))+.035*C;return T+(m0(s,x)+P-T)*(1-qt(.5,U,C))*F}function Qa(s,t,x){const T=Math.sqrt(t*t+x*x),F=s.waves,p=s.farW;let S=0;for(let U=0;U<F.length;U++){const C=F[U];S+=C[4]*Math.sin((t*C[0]+x*C[1])*C[2]+C[3])}let V=S*(.22+1.5*qt(12,130,T))*(s.RIDGE||s.VALLEY?.55:1);if(T>170){let U=0;for(let C=0;C<p.length;C++){const P=p[C];U+=P[4]*Math.sin((t*P[0]+x*P[1])*P[2]+P[3])}V+=(U*13+16+Math.abs(U)*9)*qt(170,800,T)}if(s.RIDGE){const U=x-(50+5*Math.sin(t*.035+s.ridgePh)+2*Math.sin(t*.09));V+=U<0?5.2*Math.exp(-(U/17)*(U/17)):12.2*Math.exp(-(U/30)*(U/30))-7}if(s.VALLEY){const U=Ha(s,x),C=8+.3*Math.max(x,0);V-=6*Math.exp(-((t-U)/C)*((t-U)/C))*qt(-8,12,x);const P=(t-qo(s,x))/(1.44+.024*x);V-=.5*Math.exp(-P*P)*qt(-2,6,x)}return V}const Xo=(s,t,x)=>{let T=Qa(s,t,x);const F=t-s.mx,p=x-s.mz;return T+=s.mh*Math.exp(-(F*F+p*p)/(s.mr*s.mr)),s.wl?_s(s,t,x,T):T};function Ns(s,t,x,T,F,p){for(let S=0;S<T;S++){const V=F*Math.exp(S/(T-1)*p),U=.75*V+8;for(let C=0;C<x;C++)t[S*x+C]=Xo(s,(C/(x-1)*2-1)*U,V)}}function Ls(s,t,x,T){for(let F=0;F<T;F++){const p=F/(T-1),S=.6*Math.pow(3200/.6,p),V=2.5+.56*S;for(let U=0;U<x;U++){const C=(U/(x-1)*2-1)*V,P=(F*x+U)*6;t[P]=C,t[P+1]=Xo(s,C,S),t[P+2]=S}}for(let F=0;F<T;F++)for(let p=0;p<x;p++){const S=(F*x+p)*6,V=(F*x+Math.max(0,p-1))*6,U=(F*x+Math.min(x-1,p+1))*6,C=(Math.max(0,F-1)*x+p)*6,P=(Math.min(T-1,F+1)*x+p)*6,I=t[U]-t[V],G=t[U+1]-t[V+1],O=t[U+2]-t[V+2],_=t[P]-t[C],D=t[P+1]-t[C+1],L=t[P+2]-t[C+2];let W=D*O-L*G,H=L*I-_*O,N=_*G-D*I;H<0&&(W=-W,H=-H,N=-N);const yt=ot(W,H,N)||1;t[S+3]=W/yt,t[S+4]=H/yt,t[S+5]=N/yt}}function Bs(s,t,x,T,F,p,S,V,U,C){let P=0;const I=s.VALLEY?700:0;let G=s.valPh*1e6|0;const O=()=>(G=Math.imul(G,1664525)+1013904223|0,(G>>>8)/16777216);for(let _=0;_<T;_++){const D=(_+t())/T;let L=(F*Math.exp(D*V)-p)/S,W=0,H=0,N=0;for(let ct=0;ct<4&&(W=(t()*2-1)*(.41*L+.35),!!ja(s,W,L));ct++);if(s.VALLEY&&L>7){const ct=_>=T-I,Rt=O(),Z=O()<.5?-1:1,_t=O(),Ot=O();N=O(),ct&&(L=78+(s.zE+4-78)*Ot);const jt=Math.sin(L*.37+Z*1.7+s.valPh)*Math.sin(L*.083+Z+s.valPh2)+.5*Math.sin(L*1.3+Z*4);(ct||Rt<.13&&jt>.1)&&(W=qo(s,L)+Z*(Ho(s,L)+(_t*_t*1.1-.2)*(ct?1.5:.8)),H=ct&&jt<.05?2:1)}const yt=Xo(s,W,L),at=.75+.5*Math.sin(W*.31+L*.23+U)*Math.sin(W*.13-L*.37);let xt=(.3+.42*Math.pow(t(),1.4))*at*C;H?xt=H>1?0:(.3+.75*N*N+.6*xt)*(L>78?1.15:1):Ya(s,W,L)?xt=0:s.VALLEY&&Xa(s,W,L)<1.1&&(xt*=.62);const K=_*8;x[K]=W,x[K+1]=yt-.03,x[K+2]=L,x[K+3]=xt,x[K+4]=(p+S*L)*(.7+.6*t())*(H?L>78?.55:1.3:1),x[K+5]=t()*6.283,x[K+6]=t(),x[K+7]=t(),L<10&&(P=_+1)}return P}const Ds=(s,t)=>ia(s,Za(s,t));function Za(s,t){const x=(F,p)=>{const S=s.createShader(F);return s.shaderSource(S,p),s.compileShader(S),S},T={};for(const F in t){const[p,S]=t[F],V=s.createProgram(),U=x(s.VERTEX_SHADER,p),C=x(s.FRAGMENT_SHADER,S.replace(`#version 300 es
`,`#version 300 es
#define FRAG 1
`));s.attachShader(V,U),s.attachShader(V,C),s.linkProgram(V),T[F]={p:V,v:U,fr:C,u:{}}}return T}function ia(s,t){for(const x in t){const T=t[x];if(!s.getProgramParameter(T.p,s.LINK_STATUS)){const p=s.getShaderInfoLog(T.v)||s.getShaderInfoLog(T.fr)||s.getProgramInfoLog(T.p);throw new Error("Windward "+x+": "+p)}const F=s.getUniformBlockIndex(T.p,"Env");F!==s.INVALID_INDEX&&s.uniformBlockBinding(T.p,F,0),s.useProgram(T.p),[["uNoise",0],["uWind",1],["uSkyB",2],["uLeaf",3],["uShd",4],["uSkyC",5]].forEach(([p,S])=>{const V=s.getUniformLocation(T.p,p);V&&s.uniform1i(V,S)})}return t}function Us(s,t){let x=Ka.get(s);if(x)return t&&!x.wOK&&(x.water||x.later(),ia(s,{water:x.water}),x.wOK=!0),x;const T={grass:[ps,vs],terr:[xs,ms],skyb:[qa,bs],sky:[qa,ys],solid:[Ms,Ss],spr:[Rs,Ts],shd:[ws,As],shdl:[gs,Es]};t&&(T.water=[Ga,Wa]),x=Ds(s,T),x.wOK=!!t,x.nd=0,x.later=()=>{x.water||(x.par=s.getExtension("KHR_parallel_shader_compile"),x.water=Za(s,{water:[Ga,Wa]}).water,s.flush())},x.warm=()=>(x.par?!s.getProgramParameter(x.water.p,x.par.COMPLETION_STATUS_KHR):++x.nd<36)?!1:(ia(s,{water:x.water}),x.wOK=!0,x.wVAO=x.wVAO||s.createVertexArray(),!0);const F=256;let p=625341585;const S=()=>(p^=p<<13,p^=p>>>17,p^=p<<5,(p>>>0)/4294967296),V=_=>{const D=new Float32Array(_*_);for(let L=0;L<D.length;L++)D[L]=S();return D},U=_=>{const D=_.map(V),L=new Float32Array(F*F);let W=1,H=0;_.forEach((N,yt)=>{const at=D[yt],xt=N/F;for(let K=0;K<F;K++){const ct=K*xt,Rt=Math.floor(ct),Z=ct-Rt,_t=Z*Z*(3-2*Z),Ot=Rt%N*N,jt=(Rt+1)%N*N;for(let ne=0;ne<F;ne++){const Ge=ne*xt,Te=Math.floor(Ge),se=Ge-Te,ke=se*se*(3-2*se),Eo=Te%N,Mo=(Te+1)%N,We=(at[Ot+Eo]*(1-ke)+at[Ot+Mo]*ke)*(1-_t)+(at[jt+Eo]*(1-ke)+at[jt+Mo]*ke)*_t;L[K*F+ne]+=We*W}}H+=W,W*=.5});for(let N=0;N<L.length;N++)L[N]=bt((L[N]/H-.5)*2.3+.5,0,1);return L},C=U([4,8,16,32,64]),P=U([8,16,32,64,128]),I=U([16,32,64,128]),G=new Uint8Array(F*F*4);for(let _=0;_<F*F;_++)G[_*4]=C[_]*255,G[_*4+1]=P[_]*255,G[_*4+2]=I[_]*255,G[_*4+3]=S()*255;x.noise=s.createTexture(),s.bindTexture(s.TEXTURE_2D,x.noise),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,F,F,0,s.RGBA,s.UNSIGNED_BYTE,G),s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR_MIPMAP_LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.REPEAT),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.REPEAT);{const D=new Uint8Array(65536);for(let L=0;L<4;L++){const W=L%2*64,H=(L>>1)*64,N=13+L*2;for(let yt=0;yt<N;yt++){const at=Math.sqrt(S())*.62,xt=S()*6.283,K=Math.cos(xt)*at,ct=Math.sin(xt)*at,Rt=xt+(S()-.5)*1.3+(at<.15?S()*6.283:0),Z=.3+S()*.16,_t=.11+S()*.07,Ot=Math.cos(Rt),jt=Math.sin(Rt),ne=.55+S()*.45,Ge=S(),Te=K-Ot*Z*.5,se=ct-jt*Z*.5,ke=Math.max(0,Math.floor((K-Z*.6-_t+1)*32)),Eo=Math.min(64,Math.ceil((K+Z*.6+_t+1)*32)),Mo=Math.max(0,Math.floor((ct-Z*.6-_t+1)*32)),We=Math.min(64,Math.ceil((ct+Z*.6+_t+1)*32));for(let qe=Mo;qe<We;qe++)for(let He=ke;He<Eo;He++){const Yo=(He+.5)/32-1,jo=(qe+.5)/32-1,Y=Yo-Te,he=jo-se,ro=(Y*Ot+he*jt)/Z,Tt=-Y*jt+he*Ot;if(ro<-.05||ro>1.05)continue;const mt=_t*.5*Math.pow(Math.max(0,Math.sin(Math.PI*Math.min(1,Math.max(0,ro)))),.8)*(1-.25*ro),it=Math.min(1,Math.max(0,(mt-Math.abs(Tt))*32+.5));if(it<=0)continue;const Ft=((H+qe)*128+W+He)*4,De=1-.3*Math.exp(-(Tt/.012)*(Tt/.012)),Ae=it;D[Ft]=D[Ft]*(1-Ae)+255*ne*De*(.85+.15*ro)*Ae,D[Ft+1]=D[Ft+1]*(1-Ae)+255*Ge*Ae,D[Ft+2]=D[Ft+2]*(1-Ae)+255*Math.min(1,Math.abs(Tt)/(mt+.001))*Ae,D[Ft+3]=Math.max(D[Ft+3],255*it)}}}x.leaf=s.createTexture(),s.bindTexture(s.TEXTURE_2D,x.leaf),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,128,128,0,s.RGBA,s.UNSIGNED_BYTE,D),s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR_MIPMAP_LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}const O=_=>{const D=[];for(let L=0;L<_;L++){const W=Math.pow(L/_,.9);D.push(W,-1,W,1)}return D.push(1,0),new Float32Array(D)};return x.tplN=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,x.tplN),s.bufferData(s.ARRAY_BUFFER,O(6),s.STATIC_DRAW),x.tplF=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,x.tplF),s.bufferData(s.ARRAY_BUFFER,O(3),s.STATIC_DRAW),x.quad=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,x.quad),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW),x.tri=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,x.tri),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW),Ka.set(s,x),x}Oa.add({num:8,name:"Windy Meadow",fam:"Worlds",recipe:"A meadow on rolling hills, and you're the wind. The air really flows, so the grass, seeds, birds, flags and chimes all react to it. The season, sky, land, flowers and birds change every mint. Drag to blow a gust, hold in the sky to build a big one and let go, or tap to toss a handful of seeds.",interactive:"Drag across the field to blow a gust along your stroke; hold in the sky to gather a big gust and let go to send it rolling in from the horizon; hold on the grass and let go for a burst; tap to cast a handful of seeds. Where there is a stream, your gusts ruffle its water.",music:!0,gl:!0,fps:30,seed:0,make(s){const t=s.gl,x=s.size,T=s.hash.slice(2),F=e=>{let o=parseInt(T.slice(e,e+8),16)>>>0,a=parseInt(T.slice(e+8,e+16),16)>>>0,n=parseInt(T.slice(e+16,e+24),16)>>>0,c=parseInt(T.slice(e+24,e+32),16)>>>0;const l=()=>{o>>>=0,a>>>=0,n>>>=0,c>>>=0;let i=o+a|0;return o=a^a>>>9,a=n+(n<<3)|0,n=n<<21|n>>>11,c=c+1|0,i=i+c|0,n=n+i|0,(i>>>0)/4294967296};for(let i=0;i<15;i++)l();return l},p=F(0),S=F(32),V=e=>{let o=0;for(const n of e)o+=n[1];let a=p()*o;for(const n of e)if(a-=n[1],a<=0)return n[0];return e[e.length-1][0]};let U=V([["Spring green",34],["Summer gold",34],["Autumn rust",23],["Silver frost",9]]),C=V([["Morning haze",30],["Golden hour",34],["Storm light",26],["Aurora night",10]]),P=V([["Gentle swells",38],["A long ridge",34],["Stream valley",28]]),I=V([["Lone tree",36],["Standing stones",24],["Weathered shelter",22],["Tethered kite",18]]),G=V([["Meadow mix",34],["Poppies",24],["Cornflower and daisy",24],["Sparse",18]]),O=V([["Dandelion seeds",52],["Petals",30],["Fireflies",18]]),_=V([["Gusty",44],["Calm",30],["Steady",26]]),D=V([["Swifts",30],["Rooks",24],["Hovering kestrel",20],["None",26]]),L=V([["Major pentatonic",38],["Minor pentatonic",32],["Lydian",20],["Whole-tone",10]]);s.home&&(U="Summer gold",C="Golden hour",P="A long ridge",I="Lone tree",G="Meadow mix",O="Dandelion seeds",_="Gusty",D="Swifts",L="Major pentatonic"),D==="Hovering kestrel"&&(D="None");const W=C==="Aurora night";O==="Fireflies"&&(C==="Morning haze"||C==="Storm light")&&(O="Dandelion seeds"),W&&O==="Dandelion seeds"&&(O="Glowing seeds"),W&&D!=="None"&&(D="None"),U==="Silver frost"&&O==="Fireflies"&&(O="Glowing seeds");const H=O==="Dandelion seeds"||O==="Glowing seeds";s.trait("Season",U),s.trait("Sky",C),s.trait("Land",P),s.trait("Landmark",I);const N=Us(t,P==="Stream valley"),yt=F(16);let at=(()=>{const e=yt()*100;return e<58?"Standing":e<84?"Lying in the grass":"Up on a rise"})();(s.home||at==="Lying in the grass"&&P==="Stream valley")&&(at="Standing");let xt=!s.home&&yt()<.3;s.trait("Flowers",G),s.trait("Drifting",O),s.trait("View",xt?at+", by the flag line":at),s.trait("Birds",D),s.trait("Wind and chimes",_+", "+L);const K={"Spring green":{g0:"#16300c",g1:"#3f7a22",g2:"#94c447",g3:"#c9da62",stem:"#4c8a2a",soil:"#33361a",leaf:["#5a8e34","#73a042","#4a7e30"],gk:[.55,.9,.35,0]},"Summer gold":{g0:"#3a3512",g1:"#9a8434",g2:"#eccb72",g3:"#b9b452",stem:"#7b8a34",soil:"#5a4a26",leaf:["#4d6a2e","#6a7a36","#3f5a2a","#7a7a3a"],gk:[.6,1,.4,0]},"Autumn rust":{g0:"#2e1a0c",g1:"#7e4520",g2:"#d68f4c",g3:"#a87a3a",stem:"#6a5a2a",soil:"#3a2a18",leaf:["#c0602a","#d8962f","#a8402a"],gk:[.55,.95,.35,0]},"Silver frost":{g0:"#26363b",g1:"#71878e",g2:"#e2edf2",g3:"#aabdca",stem:"#6c8288",soil:"#5c6468",leaf:["#cfdde4"],gk:[.7,.55,.6,1]}}[U],ct={"Golden hour":{el:8.5,az:-7,sun:[3.3,2.15,1.05],amb:[.3,.32,.44],top:"#2c4c88",hor:"#f4bd86",horK:1.1,glow:[1.5,.82,.36],fog:"#d8ad84",fogD:.0016,fogB:.012,fogP:10,cov:.56,soft:.2,sh:.6,cl:"#ffc48a",clK:1.4,cd:"#6a5a7c",cdK:1,disc:.99982,grade:[.02,.01,.035],exp:1,tone:[1.08,.3]},"Morning haze":{el:21,az:-58,sun:[2.6,2.42,2.1],amb:[.4,.48,.6],top:"#5e8fcb",hor:"#dde4e7",horK:1.05,glow:[.95,.85,.62],fog:"#d3dbe0",fogD:.0038,fogB:.02,fogP:4,cov:.6,soft:.25,sh:.45,cl:"#ffffff",clK:1.15,cd:"#a2adbf",cdK:1,disc:.99985,grade:[.01,.015,.03],exp:.95,tone:[1,.15]},"Storm light":{el:15,az:24,sun:[3.6,3,2],amb:[.17,.2,.25],top:"#262c37",hor:"#7c8389",horK:1,glow:[1,.85,.5],fog:"#69727a",fogD:.0024,fogB:.015,fogP:6,cov:.4,soft:.2,sh:.93,cl:"#bdb9ab",clK:1,cd:"#2a3657",cdK:1,disc:.99985,grade:[0,.01,.025],exp:1.05,tone:[.82,.32]},"Aurora night":{el:14,az:-13,sun:[.28,.36,.58],amb:[.032,.055,.09],top:"#03060f",hor:"#0e1f2e",horK:1,glow:[.015,.022,.036],fog:"#0d1a27",fogD:.0013,fogB:.012,fogP:8,cov:.82,soft:.2,sh:.4,cl:"#1e2a3e",clK:1,cd:"#08101c",cdK:1,disc:.99993,grade:[.004,.01,.025],exp:1,tone:[.68,.2]}}[C],Rt={"Meadow mix":{n:760,types:[[0,"#f4f1e6",30],[1,"#f2c21c",26],[4,"#d68ab0",16],[3,"#6a5ad0",14],[2,"#e2442a",8]]},Poppies:{n:820,types:[[2,"#d8301c",70],[2,"#e8582a",14],[0,"#f4f1e6",16]]},"Cornflower and daisy":{n:780,types:[[3,"#3d63dc",50],[0,"#f4f1e6",44],[4,"#c08ad8",6]]},Sparse:{n:220,types:[[1,"#f2c21c",50],[0,"#f4f1e6",50]]}}[G],Z=p()<.5?-1:1,_t=[],Ot=[];for(let e=0;e<5;e++){const o=p()*6.283,a=30+p()*60;_t.push([Math.cos(o),Math.sin(o),6.283/a,p()*6.283,.35+p()*.5])}for(let e=0;e<6;e++){const o=p()*6.283,a=260+p()*800;Ot.push([Math.cos(o),Math.sin(o),6.283/a,p()*6.283,.4+p()*.6])}const jt=p()*6.283,ne=p()*6.283,Ge=p()*6.283,Te=P==="A long ridge",se=P==="Stream valley",ke=Z,Eo=e=>50+5*Math.sin(e*.035+jt)+2*Math.sin(e*.09),Mo=e=>ke*(6+.08*e+3*Math.sin(e*.035+ne)),We=e=>Mo(e)+.8*Math.sin(e*.11+Ge);let qe=0,He=-999,Yo=0,jo=9;const Y={waves:_t,farW:Ot,RIDGE:Te,VALLEY:se,ridgePh:jt,valSide:ke,valPh:ne,valPh2:Ge,mx:qe,mz:He,mh:Yo,mr:jo,wl:null},he=F(24);Y.b0=.75+.3*he(),Y.b1=.005,Y.pz=26+30*he(),Y.pw=he()<.7?1.2+1.8*he():he()*0,Y.pil=1/(5+5*he()),Y.zE=118+48*he(),Y.tz=Y.zE-60-22*he(),Y.tw=5+6*he();const ro=(e,o)=>Qa(Y,e,o),Tt=(e,o)=>Xo(Y,e,o);let mt,it;if(Te)mt=Z*(8+p()*4),it=Eo(mt)-1;else if(se)it=38+p()*10,mt=-Z*(.15+p()*.2)*.384*it;else{it=36+p()*14,mt=Z*(.3+p()*.2)*.384*it;let e=-1e9,o=mt,a=it;for(let n=0;n<40;n++){const c=mt+(p()-.5)*12,l=it+(p()-.5)*12,i=ro(c,l)-Math.abs(c/(.384*l)-Z*.4)*2;i>e&&(e=i,o=c,a=l)}mt=o,it=a}if(qe=mt,He=it,Yo=Te?.6:1.4,jo=8,Y.mx=qe,Y.mz=He,Y.mh=Yo,Y.mr=jo,se){const e=Math.ceil(Y.zE)+28,o=new Float32Array(e);for(let n=0;n<e;n++){const c=We(n),l=Ho(Y,n)+3+.03*n;let i=1e9;for(let d=-4;d<=4;d++)i=Math.min(i,Xo(Y,c+d/4*l,n));o[n]=i-.12}for(let n=0;n<9;n++)o[n]=o[9];for(let n=10;n<e;n++)o[n]=Math.min(o[n],o[n-1]);const a=o[Math.ceil(Y.zE)+4];for(let n=0;n<e;n++)o[n]+=(a-o[n])*qt(Y.tz-16,Y.tz-2,n);for(let n=0;n<4;n++){let c=o[0];for(let l=1;l<e-1;l++){const i=o[l];o[l]=(c+2*i+o[l+1])/4,c=i}}Y.wl=o}const Ft=Tt(mt,it),De=48,Ae=96,b0=.5,Ja=Math.log(260/b0),Qo=new Float32Array(De*Ae);Ns(Y,Qo,De,Ae,b0,Ja);const So=(e,o)=>{if(o<b0||o>259)return Tt(e,o);const a=Math.log(o/b0)/Ja*(Ae-1),n=(e/(.75*o+8)+1)*.5*(De-1);if(n<0||n>De-1.001)return Tt(e,o);const c=n|0,l=Math.min(Ae-2,a|0),i=n-c,d=a-l,f=l*De+c;return(Qo[f]*(1-i)+Qo[f+1]*i)*(1-d)+(Qo[f+De]*(1-i)+Qo[f+De+1]*i)*d},Zo=((Te?3.4:se?.6:2.6)+(at==="Lying in the grass"?5.5:at==="Up on a rise"?-6:0))*Math.PI/180,Ro=Math.tan(21*Math.PI/180),la=1/Ro,lt=[0,Tt(0,1.5)+(at==="Lying in the grass"?.42:at==="Up on a rise"?3.4:1.3),0],co=[0,Math.sin(Zo),Math.cos(Zo)],ze=[1,0,0],Fe=[0,Math.cos(Zo),-Math.sin(Zo)],Jt=new Float32Array(16);{const a=[la,0,0,0,0,la,0,0,0,0,-1.0001250078129884,-1,0,0,-.500031251953247,0],n=[-co[0],-co[1],-co[2]],c=[ze[0],Fe[0],n[0],0,ze[1],Fe[1],n[1],0,ze[2],Fe[2],n[2],0,-(ze[0]*lt[0]+ze[1]*lt[1]+ze[2]*lt[2]),-(Fe[0]*lt[0]+Fe[1]*lt[1]+Fe[2]*lt[2]),-(n[0]*lt[0]+n[1]*lt[1]+n[2]*lt[2]),1];for(let l=0;l<4;l++)for(let i=0;i<4;i++){let d=0;for(let f=0;f<4;f++)d+=a[f*4+i]*c[l*4+f];Jt[l*4+i]=d}}const Yr=(e,o,a)=>{const n=Jt[0]*e+Jt[4]*o+Jt[8]*a+Jt[12],c=Jt[1]*e+Jt[5]*o+Jt[9]*a+Jt[13],l=Jt[3]*e+Jt[7]*o+Jt[11]*a+Jt[15];return[n/l,c/l,l]},fa=ct.el*Math.PI/180,$a=ct.az*Z*Math.PI/180,ge=[Math.sin($a)*Math.cos(fa),Math.sin(fa),Math.cos($a)*Math.cos(fa)],rt=28,dt=48,wt=rt*dt,Jo=2.5,Vs=95,$o=Math.log(Vs/Jo),t0=1.6,e0=.56,To=new Float32Array(dt),y0=new Float32Array(dt),w0=new Float32Array(dt),ko=new Float32Array(wt);for(let e=0;e<dt;e++){const o=Jo*Math.exp((e+.5)/dt*$o),a=t0+e0*o;To[e]=o,y0[e]=2*a/rt,w0[e]=o*$o/dt;for(let n=0;n<rt;n++)ko[e*rt+n]=((n+.5)/rt*2-1)*a}let Et=new Float32Array(wt),Mt=new Float32Array(wt),zo=new Float32Array(wt),Fo=new Float32Array(wt);const Is=new Float32Array(wt),tn=new Float32Array(wt),en=new Float32Array(wt),on=new Float32Array(wt),an=new Float32Array(wt);let o0=0,a0=0;const Os=(e,o)=>{const a=Math.max(o,.05);a0=Math.log(a/Jo)/$o*dt-.5,o0=(e/(t0+e0*a)+1)*.5*rt-.5},nn=(e,o,a)=>{o<0?o=0:o>rt-1.001&&(o=rt-1.001),a<0?a=0:a>dt-1.001&&(a=dt-1.001);const n=o|0,c=a|0,l=o-n,i=a-c,d=c*rt+n;return(e[d]*(1-l)+e[d+1]*l)*(1-i)+(e[d+rt]*(1-l)+e[d+rt+1]*l)*i};let Kt=0,Gt=0;const Ce=(e,o)=>{Os(e,o);const a=Math.max(-o0/3,(o0-rt+1)/3,-a0/3,(a0-dt+1)/6,0),n=Math.min(1,a);Kt=nn(Et,o0,a0)*(1-n)+Ue*n,Gt=nn(Mt,o0,a0)*(1-n)+Ve*n},pe={Calm:{base:.9,gS:3.6,gI:[6,11],turb:.35,tau:2.2},Gusty:{base:1.8,gS:7.5,gI:[2.4,5],turb:.8,tau:3},Steady:{base:4.4,gS:3.8,gI:[4,7],turb:.5,tau:3.2}}[_],sn=(p()<.5?0:Math.PI)+(p()-.5)*.9+(p()<.25?-Math.PI/2*.7:0);let Xe=Math.cos(sn),Co=Math.sin(sn);s.home&&(Xe=Math.cos(.6),Co=Math.sin(.6));let Ue=Xe*pe.base,Ve=Co*pe.base;for(let e=0;e<wt;e++)Et[e]=Ue,Mt[e]=Ve;const Po=[.43,.21],_o=[-.17,.37],No=[1.3,-.9],ua=[p()*6.28,p()*6.28,p()*6.28],rn=new Float32Array(wt),cn=new Float32Array(wt),ln=new Float32Array(wt),fn=new Float32Array(wt),un=new Float32Array(wt),dn=new Float32Array(wt),hn=new Float32Array(wt);for(let e=0;e<dt;e++)for(let o=0;o<rt;o++){const a=e*rt+o,n=ko[a],c=To[e],l=(n*Po[0]+c*Po[1])*.6+ua[0],i=(n*_o[0]+c*_o[1])*.6+ua[1],d=n*No[0]+c*No[1]+ua[2];rn[a]=Math.sin(l),cn[a]=Math.cos(l),ln[a]=Math.sin(i),fn[a]=Math.cos(i),un[a]=Math.sin(d),dn[a]=Math.cos(d),hn[a]=.25*(c<20?1:.4)}const pn=(Ue*Po[0]+Ve*Po[1])*.9*.6,vn=(Ue*_o[0]+Ve*_o[1])*.9*.6,xn=.7-(Ue*No[0]+Ve*No[1])*.9,mn=rt+2,Ks=new Float32Array(mn*(dt+2)),da=new Float32Array(dt),ha=new Float32Array(dt),bn=new Float32Array(dt),Gs=dt/$o;for(let e=0;e<dt;e++)da[e]=1/(y0[e]*y0[e]),ha[e]=1/(w0[e]*w0[e]),bn[e]=1/(2*da[e]+2*ha[e]);const io=[];let Nt=0,yn=.4+p()*1.5;const Ws=e=>1.3*(1-Math.exp(-e/5));function qs(){const e=pe.gS*(.6+.7*S()),o=Xe+(S()-.5)*.5,a=Co+(S()-.5)*.5,n=ot(o,a),c=o/n,l=a/n,i=(S()-.5)*30,d=25+S()*30;io.push({ring:!1,ox:i-c*75,oz:d-l*75,ux:c,uz:l,s:0,U:3+e*.9,S:e+pe.base,Wd:14+S()*22,T:3+S()*3,len:150,lat:0,ph:S()*6.28})}function Hs(e){for(let o=io.length-1;o>=0;o--){const a=io[o];if(a.s+=a.U*e,a.ring,a.s>a.len){io.splice(o,1);continue}const n=a.ring?1-a.s/a.len:qt(0,10,a.s)*qt(a.len,a.len-20,a.s),c=a.ring?a.S*n:a.S,l=1/(c+1e-4);for(let i=0;i<dt;i++){const d=To[i],f=t0+e0*d;let A=-f,r=f;if(a.ring){const u=a.s+2.5*a.T,b=u*u-(d-a.oz)*(d-a.oz);if(b<=0)continue;const g=Math.sqrt(b);A=a.ox-g,r=a.ox+g}else if(Math.abs(a.ux)>.001){const u=a.s-(d-a.oz)*a.uz,b=2.5*a.T;let g=a.ox+(u-b)/a.ux,w=a.ox+(u+b)/a.ux;if(g>w){const m=g;g=w,w=m}A=g,r=w}const h=Math.max(0,Math.floor((A/f+1)*.5*rt-.5)),v=Math.min(rt-1,Math.ceil((r/f+1)*.5*rt-.5));for(let u=h;u<=v;u++){const b=i*rt+u,g=ko[b];let w,m,y;if(a.ring){const k=g-a.ox,z=d-a.oz,E=Math.sqrt(k*k+z*z)+.001,R=(E-a.s)/a.T;if(R>2.5||R<-2.5)continue;y=Math.exp(-R*R),w=k/E*a.S*n,m=z/E*a.S*n}else{const k=g-a.ox,z=d-a.oz,E=(k*a.ux+z*a.uz-a.s)/a.T;if(E>2.5||E<-2.5)continue;const R=(-k*a.uz+z*a.ux-a.lat)/a.Wd;if(R>2.5||R<-2.5)continue;y=Math.exp(-E*E-R*R)*(.6+.4*Math.sin(R*2.3+a.ph))*n,w=a.ux*a.S,m=a.uz*a.S}const M=Math.min(1,y*e*5);(Et[b]*w+Mt[b]*m)*l<c&&(Et[b]+=(w-Et[b])*M,Mt[b]+=(m-Mt[b])*M)}}}}function Xs(e){Nt>=yn&&(qs(),yn=Nt+pe.gI[0]+S()*(pe.gI[1]-pe.gI[0])),Hs(e);const o=Nt,a=pe.turb*(1+.3*Math.sin(o*.21)),n=a*e*3,c=Math.sin(pn*o),l=Math.cos(pn*o),i=Math.sin(vn*o),d=Math.cos(vn*o),f=Math.sin(xn*o),A=Math.cos(xn*o),r=Po[0]*.6,h=Po[1]*.6,v=_o[0]*.6,u=_o[1]*.6;ks(Et,Mt,wt,rn,cn,ln,fn,un,dn,hn,c,l,i,d,f,A,r,h,v,u,No[0],No[1],n),zs(Et,Mt,zo,Fo,To,ko,rt,dt,e,Jo,Gs,t0,e0);let b=Et;Et=zo,zo=b,b=Mt,Mt=Fo,Fo=b;const g=1-Math.exp(-e/pe.tau);Fs(Et,Mt,zo,Fo,rt,dt,g,Ue,Ve),b=Et,Et=zo,zo=b,b=Mt,Mt=Fo,Fo=b,Cs(Et,Mt,Is,Ks,y0,w0,da,ha,bn,rt,dt,mn),Ps(Et,Mt,tn,en,on,an,wt,e)}const lo=(e,o)=>{const a=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,e,o||t.STATIC_DRAW),a},Ys=[0,1].map(()=>{const e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,rt,dt,0,t.RGBA,t.HALF_FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),e});let wn=0;const A0=new Uint16Array(wt*4),pa=e=>{const o=e>>>16&32768,a=(e>>>23&255)-112;return a<=0?o:a>30?o|31743:o|a<<10|e>>>13&1023},js=new Uint32Array(tn.buffer),Qs=new Uint32Array(en.buffer),An=new Float32Array(wt),Zs=new Uint32Array(An.buffer),Ye=112,g0=168,gn=new Float32Array(Ye*g0*6);Ls(Y,gn,Ye,g0);const je=new Uint16Array((Ye-1)*(g0-1)*6);{let e=0;for(let o=0;o<g0-1;o++)for(let a=0;a<Ye-1;a++){const n=o*Ye+a;je[e++]=n,je[e++]=n+1,je[e++]=n+Ye,je[e++]=n+1,je[e++]=n+Ye+1,je[e++]=n+Ye}}const En=t.createVertexArray();t.bindVertexArray(En),lo(gn),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,24,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,24,12);const Js=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,Js),t.bufferData(t.ELEMENT_ARRAY_BUFFER,je,t.STATIC_DRAW),t.bindVertexArray(null);let E0=null,Mn=0;if(se){const e=[],o=Y.zE-16;for(let c=0;c<118;c++)e.push(3*Math.pow(o/3,c/117));for(let c=1;c<=12;c++)e.push(o+16*Math.sin(c/12*Math.PI/2));const a=new Float32Array(e.length*16),n=new Float32Array(e.length);e.forEach((c,l)=>{const i=We(c),d=Ho(Y,c),f=m0(Y,c),A=ot(i,c),r=i/A,h=c/A,v=2*d+5;let u=0;for(let w=0;w<26;w++){const m=v*Math.pow(2600/v,w/25);u=Math.max(u,(Tt(i+r*m,c+h*m)-f)/m)}n[l]=u;const b=We(c+.5)-We(c-.5),g=(m0(Y,c-2)-m0(Y,c+2))/4;for(let w=0;w<2;w++){const m=w*2-1,y=(l*2+w)*8;a[y]=i+m*d,a[y+1]=f,a[y+2]=c,a[y+3]=m,a[y+4]=d,a[y+5]=u,a[y+6]=b,a[y+7]=g}});for(let c=0;c<3;c++){let l=n[0];for(let i=1;i<n.length-1;i++){const d=n[i];n[i]=(l+2*d+n[i+1])/4,l=d}}for(let c=0;c<n.length;c++)a[c*16+5]=a[c*16+13]=n[c];Mn=e.length*2,E0=t.createVertexArray(),t.bindVertexArray(E0),lo(a),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,32,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,1,t.FLOAT,!1,32,28),t.bindVertexArray(null)}const n0=17e3,$s=1.5,tr=80,fo=.0048,uo=.0017,Lo=fo+uo*$s,er=fo+uo*tr,or=Math.log(er/Lo),ar=p()*100,va=(e,o)=>ja(Y,e,o),xa=(e,o)=>Ya(Y,e,o),ma=K===void 0?1:U==="Silver frost"?.8:U==="Spring green"?.9:1.05,Ee=[];{const e=Math.max(4,Math.round(Rt.n/50));for(let o=0;o<e;o++){const a=p(),n=(Lo*Math.exp(a*Math.log((fo+uo*40)/Lo))-fo)/uo,c=(p()*2-1)*.42*n;let l=0;for(const r of Rt.types)l+=r[2];let i=p()*l,d=Rt.types[0];for(const r of Rt.types)if(i-=r[2],i<=0){d=r;break}const f=Math.round(Rt.n/e*(.5+p())),A=.8+n*.12;for(let r=0;r<f&&Ee.length<1100;r++){const h=p()*6.283,v=A*Math.sqrt(-Math.log(1-p()*.95))*.7,u=c+Math.cos(h)*v,b=n+Math.sin(h)*v*1.4;if(b<1.8||va(u,b)||Math.abs(u)>.44*b+.4)continue;const g=p()<.2?Rt.types[p()*Rt.types.length|0]:d,w=g[0]===2?G==="Poppies"?.043:.048:g[0]===1?.034:g[0]===4?.04:.048,m=xa(u,b)?0:1;Ee.push({x:u,z:b,y:Tt(u,b),h:(.32+p()*.38)*ma*m,fa:p()*6.283,r2:p(),v:g[0],col:$(g[1]),sz:w*(g[0]===2?.84:.8)*(1+p()*(g[0]===2?.38:.5))*(1+b*(g[0]===2?.03:.012))*m})}}}if(G==="Poppies"){const e=F(12),o=Ee.length;for(let a=0;a<o&&Ee.length<1100;a++){const n=Ee[a],c=e(),l=e()*6.283,i=.12+e()*.35,d=e(),f=e();if(n.v!==2||c>.6||n.sz===0)continue;const A=n.x+Math.cos(l)*i,r=n.z+Math.sin(l)*i;r<1.8||va(A,r)||xa(A,r)||Ee.push({x:A,z:r,y:Tt(A,r),h:n.h*(.8+d*.35),fa:l,r2:f,v:2,col:n.col,sz:.043*.84*(1+d*.38)*(1+r*.03)})}}const re=[];if(H)for(let e=0;e<56;e++){const o=p(),a=(Lo*Math.exp(o*Math.log((fo+uo*32)/Lo))-fo)/uo,n=(p()*2-1)*.42*a;if(a<2||va(n,a)){e--;continue}const c=xa(n,a)?0:1;re.push({x:n,z:a,y:Tt(n,a),h:(.42+p()*.3)*ma*c,fa:p()*6.283,r2:p(),full:c,sz:.04*(1+a*.012)*c})}const ba=Ee.length+re.length,ho=new Float32Array((n0+ba)*8);let M0=0;M0=Bs(Y,p,ho,n0,Lo,fo,uo,or,ar,ma),Ee.concat(re).forEach((e,o)=>{const a=(n0+o)*8;ho[a]=e.x,ho[a+1]=e.y-.02,ho[a+2]=e.z,ho[a+3]=e.h,ho[a+4]=-(.0022+e.z*9e-4)});const nr=lo(ho),ya=(e,o)=>{const a=t.createVertexArray();return t.bindVertexArray(a),t.bindBuffer(t.ARRAY_BUFFER,e),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,nr),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,o*32),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,o*32+16),t.vertexAttribDivisor(2,1),t.bindVertexArray(null),a},sr=ya(N.tplN,0),rr=ya(N.tplF,M0),cr=ya(N.tplN,n0),ve=10,Sn=e=>({d:new Float32Array(e*ve),n:0,cap:e}),ft=(e,o,a,n,c)=>{if(e.n>=e.cap)return;const l=e.n*ve;e.d[l]=o[0],e.d[l+1]=o[1],e.d[l+2]=o[2],e.d[l+3]=a[0],e.d[l+4]=a[1],e.d[l+5]=a[2],e.d[l+6]=n[0],e.d[l+7]=n[1],e.d[l+8]=n[2],e.d[l+9]=c,e.n++},Qt=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],ce=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]],Ct=e=>{const o=ot(e[0],e[1],e[2])||1;return[e[0]/o,e[1]/o,e[2]/o]},Ie=(e,o,a,n,c,l)=>{const i=Ct(ce(Qt(a,o),Qt(n,o)));ft(e,o,i,c,l),ft(e,a,i,c,l),ft(e,n,i,c,l)},ir=(e,o,a,n,c,l,i)=>{Ie(e,o,a,n,l,i),Ie(e,o,n,c,l,i)},Qr=(e,o,a,n,c)=>{[[0,1,2,3],[7,6,5,4],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]].forEach((i,d)=>{const f=c?ue(a,ae(a,.75+d*.37%.5),.6):a;ir(e,o[i[0]],o[i[1]],o[i[2]],o[i[3]],f,n)})},S0=(e,o,a,n,c,l,i,d)=>{const f=Ct(Qt(a,o));let A=Math.abs(f[1])<.9?[0,1,0]:[1,0,0];const r=Ct(ce(f,A)),h=ce(f,r);for(let v=0;v<l;v++){const u=v/l*6.283,b=(v+1)/l*6.283,g=[r[0]*Math.cos(u)+h[0]*Math.sin(u),r[1]*Math.cos(u)+h[1]*Math.sin(u),r[2]*Math.cos(u)+h[2]*Math.sin(u)],w=[r[0]*Math.cos(b)+h[0]*Math.sin(b),r[1]*Math.cos(b)+h[1]*Math.sin(b),r[2]*Math.cos(b)+h[2]*Math.sin(b)],m=[o[0]+g[0]*n,o[1]+g[1]*n,o[2]+g[2]*n],y=[o[0]+w[0]*n,o[1]+w[1]*n,o[2]+w[2]*n],M=[a[0]+g[0]*c,a[1]+g[1]*c,a[2]+g[2]*c],k=[a[0]+w[0]*c,a[1]+w[1]*c,a[2]+w[2]*c];ft(e,m,g,i,d),ft(e,y,w,i,d),ft(e,k,w,i,d),ft(e,m,g,i,d),ft(e,k,w,i,d),ft(e,M,g,i,d)}},Me=(e,o,a,n,c,l)=>{const i=Qt(a,o),d=Qt(lt,o),f=Ct(ce(i,d)),A=n*.5,r=Ct(d),h=[o[0]-f[0]*A,o[1]-f[1]*A,o[2]-f[2]*A],v=[o[0]+f[0]*A,o[1]+f[1]*A,o[2]+f[2]*A],u=[a[0]+f[0]*A,a[1]+f[1]*A,a[2]+f[2]*A],b=[a[0]-f[0]*A,a[1]-f[1]*A,a[2]-f[2]*A];ft(e,h,r,c,l),ft(e,v,r,c,l),ft(e,u,r,c,l),ft(e,h,r,c,l),ft(e,u,r,c,l),ft(e,b,r,c,l)},nt=Sn(6e4),s0=[],lr=$("#7a6a58"),R0=$("#4e4236");let ie=null,Qe=[mt,Ft+6,it];const Ze=U==="Silver frost",At=xt?[-Z*1.3,0,3.9]:[-Z*3.7,0,11.5],$t=xt?[-Z*.2,0,13.5]:[-Z*1.5,0,18.5];At[1]=Tt(At[0],At[2])+2.35,$t[1]=Tt($t[0],$t[2])+2.05;const T0=F(24),Rn=$("#8a7d68"),fr=(e,o,a,n)=>{const i=[],d=[(T0()-.5)*.06,(T0()-.5)*.06],f=$(Ze?"#c3c9cb":"#c6b294"),A=$("#4a4034");for(let h=0;h<=5;h++){const v=h/5,u=Math.sin(v*Math.PI),b=(a+(n-a)*v)*(1+(T0()-.5)*.14),g=e[0]+(o[0]-e[0])*v+d[0]*u,w=e[1]+(o[1]-e[1])*v,m=e[2]+(o[2]-e[2])*v+d[1]*u,y=ue(ue(A,lr,qt(.02,.2,v)),f,qt(.12,.7,v)*.85),M=[];for(let k=0;k<9;k++){const z=k/9*6.283,E=1+.1*Math.sin(z*2+h);M.push([[g+Math.cos(z)*b*E,w,m+Math.sin(z)*b*E],[Math.cos(z),0,Math.sin(z)],ae(y,.84+.32*((k*.618+h*.37)%1))])}i.push(M)}for(let h=0;h<5;h++)for(let v=0;v<9;v++){const u=i[h][v],b=i[h][(v+1)%9],g=i[h+1][(v+1)%9],w=i[h+1][v];for(const m of[u,b,g,u,g,w])ft(nt,m[0],m[1],m[2],4)}const r=[o[0]+.012,o[1]+.03,o[2]];for(let h=0;h<9;h++){const v=i[5][h],u=i[5][(h+1)%9];ft(nt,v[0],[v[1][0]*.5,.86,v[1][2]*.5],v[2],4),ft(nt,u[0],[u[1][0]*.5,.86,u[1][2]*.5],u[2],4),ft(nt,r,[0,1,0],ae(f,.9),4)}},ur=(e,o,a,n)=>{const c=e[0]+o*n,l=e[2]+a*n,i=[c,Tt(c,l)+.03,l];let d=e;for(let f=1;f<=5;f++){const A=f/5,r=[e[0]+(i[0]-e[0])*A,e[1]+(i[1]-e[1])*A-.05*4*A*(1-A),e[2]+(i[2]-e[2])*A];Me(nt,d,r,.011,Rn,0),d=r}S0(nt,[i[0]-o*.05,i[1]-.14,i[2]-a*.05],[i[0]+o*.07,i[1]+.15,i[2]+a*.07],.018,.013,5,R0,4)};{const e=ot($t[0]-At[0],$t[2]-At[2]),o=($t[0]-At[0])/e,a=($t[2]-At[2])/e,n=[[At,2.6,.03,.12,.055,.04,-1],[$t,2.3,-.02,.1,.05,.035,1]];for(const[c,l,i,d,f,A,r]of n){fr([c[0],c[1]-l,c[2]],[c[0]+i,c[1]+d,c[2]],f,A),S0(nt,[c[0]+i*.9,c[1]-.035,c[2]],[c[0]+i*.95,c[1]+.03,c[2]],A+.012,A+.011,8,ae(Rn,.8),0);for(const h of[-.62,.7]){const v=Math.cos(h),u=Math.sin(h);ur([c[0]+i*.9,c[1]-.05,c[2]],r*(o*v-a*u),r*(o*u+a*v),1.25+T0()*.5)}}}const r0=(e,o)=>e[0]*o[0]+e[1]*o[1]+e[2]*o[2],Se=(e,o,a,n,c,l,i,d,f)=>{const A=Ct(Qt(a,o)),r=Ct(ce(A,n)),h=ce(r,A),v=[];for(const u of[o,a])for(const[b,g]of[[-1,-1],[1,-1],[1,1],[-1,1]])v.push([u[0]+h[0]*b*c*.5+r[0]*g*l*.5,u[1]+h[1]*b*c*.5+r[1]*g*l*.5,u[2]+h[2]*b*c*.5+r[2]*g*l*.5]);for(const u of[[0,1,2,3],[7,6,5,4],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]]){const b=[0,1,2].map(y=>(v[u[0]][y]+v[u[1]][y]+v[u[2]][y]+v[u[3]][y])/4),g=f&&f(b)?.36:1,w=Ct(ce(Qt(v[u[1]],v[u[0]]),Qt(v[u[2]],v[u[0]]))),m=y=>ae(y<4?i:d,g);for(const y of[0,1,2,0,2,3])ft(e,v[u[y]],w,m(u[y]),0)}};let k0=Ft,z0=1,Tn=3,wa=0;const Bo=[];if(I==="Lone tree"){const e=$(Ze?"#77736e":"#4a3c30"),o=2.3+p()*.7,a=[mt,Ft-.3,it];k0=a[1],z0=o*3.2;const n=A=>10+bt((A-k0)/z0,0,.999),c=(A,r,h,v,u)=>{const b=Ct(Qt(r,A)),g=Math.abs(b[1])<.9?[0,1,0]:[1,0,0],w=Ct(ce(b,g)),m=ce(b,w);for(let y=0;y<u;y++){const M=y/u*6.283,k=(y+1)/u*6.283,z=[0,1,2].map(q=>w[q]*Math.cos(M)+m[q]*Math.sin(M)),E=[0,1,2].map(q=>w[q]*Math.cos(k)+m[q]*Math.sin(k)),R=[0,1,2].map(q=>A[q]+z[q]*h),X=[0,1,2].map(q=>A[q]+E[q]*h),tt=[0,1,2].map(q=>r[q]+z[q]*v),j=[0,1,2].map(q=>r[q]+E[q]*v),et=ae(e,.85+.3*(y*.37%1));ft(nt,R,z,et,n(R[1])),ft(nt,X,E,et,n(X[1])),ft(nt,j,E,et,n(j[1])),ft(nt,R,z,et,n(R[1])),ft(nt,j,E,et,n(j[1])),ft(nt,tt,z,et,n(tt[1]))}},l=[];let i=0;const d=(A,r,h,v,u,b)=>{const g=Ct([r[0]+(p()-.5)*.32,r[1]+.04-(u<2?.16:0),r[2]+(p()-.5)*.32]),w=[A[0]+g[0]*h,A[1]+g[1]*h,A[2]+g[2]*h];if(c(A,w,v,v*.68,u>3?7:u>1?5:3),u<=1&&!Ze){const y=u===0?7:4;for(let M=0;M<y;M++){const k=u===0?.25+M*.17:.3+M*.3,z=.35+.45*h;l.push([A[0]+(w[0]-A[0])*k+(p()-.5)*z,A[1]+(w[1]-A[1])*k+(p()-.35)*z*.8,A[2]+(w[2]-A[2])*k+(p()-.5)*z,b])}}if(u===0)return;u===4&&!ie&&g[1]<.85&&w[2]<it&&(ie=[w[0]*.6+A[0]*.4,w[1]*.6+A[1]*.4-v,w[2]*.6+A[2]*.4]);const m=u>4?2:2+(p()<.45?1:0);for(let y=0;y<m;y++){const M=p()*6.283+y*2.1,k=.5+p()*.5+(u<3?.2:0);d(w,Ct([g[0]+Math.cos(M)*k,g[1]+.1,g[2]+Math.sin(M)*k]),h*(.68+p()*.1),v*.64,u-1,u>=3?i++:b)}},f=[(p()-.5)*.15-Xe*.08,1,(p()-.5)*.1];if(d(a,Ct(f),o,.4,6,0),l.length){let A=0,r=0,h=0;for(const m of l)A+=m[0],r+=m[1],h+=m[2];Qe=[A/l.length,r/l.length,h/l.length];const v=l.map(m=>ot(m[0]-Qe[0],(m[1]-Qe[1])*1.3,m[2]-Qe[2])).sort((m,y)=>m-y);Tn=Math.max(1.5,v[Math.floor(v.length*.85)]);const u=K.leaf.map($),b=new Map;for(const m of l){let y=b.get(m[3]);y||b.set(m[3],y=[0,0,0,0,0]),y[0]+=m[0],y[1]+=m[1],y[2]+=m[2],y[3]++}for(const m of b.values())m[0]/=m[3],m[1]/=m[3],m[2]/=m[3];for(const m of l){const y=b.get(m[3]);y[4]+=(m[0]-y[0])*(m[0]-y[0])+(m[1]-y[1])*(m[1]-y[1])+(m[2]-y[2])*(m[2]-y[2])}const g=[...b.values()];for(const m of g)m[4]=Math.max(.55,Math.sqrt(m[4]/m[3])*1.25);const w=(m,y,M,k,z)=>{let E=0;for(const R of g){if(R===z)continue;const X=R[0]-m[0],tt=R[1]-m[1],j=R[2]-m[2],et=X*y+tt*M+j*k;if(et<=0)continue;const q=X*X+tt*tt+j*j-et*et,Dt=R[4]*R[4];q<Dt&&(E+=Math.sqrt(Dt-q)*Math.min(1,et/R[4]))}return E};for(const m of l){const y=ue(u[p()*u.length|0],u[p()*u.length|0],p()),M=b.get(m[3]),k=m[0]-M[0],z=m[1]-M[1]+.15*M[4],E=m[2]-M[2],R=ot(k,z,E)||1,tt=bt(((k*ge[0]+z*ge[1]+E*ge[2])/R*Math.min(1,R/(M[4]*.5))+.45)/1.45,0,1)*Math.exp(-w(m,ge[0],ge[1],ge[2],M)*.7),j=bt(.2+.8*Math.exp(-w(m,0,1,0,M)*.45)*(.55+.45*bt(z/M[4]+.5,0,1)),0,.99);s0.push([m[0],m[1],m[2],.45+p()*.32,ae(y,.85+p()*.3),0,m[3]*1.7+p()*.6,p()*6.283,p()*4|0,Math.round(tt*255)+j])}}else Qe=[mt,Ft+o*2.2,it];Bo.push([mt,Ft+o*1.6,it,o*2.6])}else if(I==="Standing stones"){const e=5+(p()*3|0),o=$(Ze?"#8f9599":"#8a877c"),a=F(20);for(let n=0;n<e;n++){const c=(n/(e-1)-.5)*2.4+Math.PI*1.5+(p()-.5)*.2,l=5.5,i=mt+Math.cos(c)*l*1.2,d=it+Math.sin(c)*l+4,f=Tt(i,d)-.3,A=1.6+p()*1.9,r=.6+p()*.6,h=.3+p()*.25,v=c+Math.PI/2+(p()-.5)*.4,u=Math.cos(v),b=Math.sin(v),g=(p()-.5)*.25,w=(p()-.5)*.2,m=[],y=[];for(let Q=0;Q<4;Q++)m.push(.45+p()*.35),y.push(.7+p()*.3);const M=ae(ue(o,$("#7d8a5a"),p()*.35),.76),k=[0,.2,.45,.7,.9,1],z=k.length,E=8,R=[],X=.3,tt=[[1,-1+X],[1,1-X],[1-X,1],[-1+X,1],[-1,1-X],[-1,-1+X],[-1+X,-1],[1-X,-1]],j=(m[0]+m[3])/2,et=(m[1]+m[2])/2,q=(y[0]+y[1]+y[2]+y[3])/4,Dt=bt((y[1]+y[2]-y[0]-y[3])*1.1,-.28,.28),Oe=$(Ze?"#dfe6e8":"#9c9d78");for(let Q=0;Q<z;Q++){const st=k[Q],St=Q===z-1,Yt=Q?(a()-.5)*.12*r:0,ye=Q?(a()-.5)*.14*h:0;for(let so=0;so<E;so++){const fe=tt[so][0],we=tt[so][1],us=1+(a()-.5)*.2,ds=fe*r*(1+((fe<0?j:et)-1)*Math.pow(st,1.5))*(St?.8:1)*us+Yt,hs=we*h*(1-.25*st)*(St?.72:1)*us+ye,Hr=A*(q+Dt*fe)*st*(1+(Q?(a()-.5)*.06:0)),Xr=ae(ue(M,Oe,st>.3&&a()<.22?.5:0),.62+.38*qt(0,.35,st));R.push({p:[i+ds*u-hs*b+g*A*st,f+Hr,d+ds*b+hs*u+w*A*st],n:[0,0,0],c:Xr})}}const Ke={p:[0,0,0],n:[0,0,0],c:M};for(let Q=0;Q<E;Q++){const st=R[(z-1)*E+Q];for(let St=0;St<3;St++)Ke.p[St]+=st.p[St]/E}const no=[],go=(Q,st,St,Yt)=>{const ye=ce(Qt((Yt||St).p,Q.p),Qt(st.p,Q.p)),so=.72+.4*a(),fe=Yt?[Q,st,St,Q,St,Yt]:[Q,st,St];for(const we of Yt?[Q,st,St,Yt]:fe)we.n[0]+=ye[0],we.n[1]+=ye[1],we.n[2]+=ye[2];no.push([fe,Ct(ye),so])};for(let Q=0;Q<z-1;Q++)for(let st=0;st<E;st++)go(R[Q*E+st],R[Q*E+(st+1)%E],R[(Q+1)*E+(st+1)%E],R[(Q+1)*E+st]);for(let Q=0;Q<E;Q++)go(R[(z-1)*E+Q],R[(z-1)*E+(Q+1)%E],Ke);for(const[Q,st,St]of no)for(const Yt of Q){const ye=Ct(Yt.n);ft(nt,Yt.p,Ct([st[0]*.65+ye[0]*.35,st[1]*.65+ye[1]*.35,st[2]*.65+ye[2]*.35]),ae(Yt.c,St),0)}}Qe=[mt,Ft+2,it],Bo.push([mt,Ft+1.5,it+4,8])}else if(I==="Weathered shelter"){const e=-Z*.35+(p()-.5)*.3,o=Math.cos(e),a=Math.sin(e),n=(E,R,X)=>[mt+E*o-R*a,Ft+X,it+E*a+R*o],c=[o,0,a],l=[-a,0,o],i=[0,1,0],d=2.3,f=1.45,A=2.35,r=1.75,h=E=>A+(r-A)*(E+f)/(2*f),v=(Ze?["#b3b8ba","#9ca1a3","#c9cdcd"]:["#8c8273","#7a6b5a","#9c9282","#6e604e","#857868","#94897a"]).map($),u=()=>ue(v[p()*v.length|0],$("#5c4e3e"),p()*.2),b=E=>ue(E,$("#2c2820"),.5),g=E=>ue(E,$(Ze?"#e2e8ea":"#55603a"),.45),w=E=>{const R=Qt(E,[mt,Ft,it]),X=r0(R,c),tt=r0(R,l);return Math.abs(X)<d-.005&&Math.abs(tt)<f+.03&&R[1]<h(tt)-.03&&tt<f+.03&&tt>-f-.06&&Math.abs(X)<d+.03},m=(E,R,X)=>{const tt=u();Se(nt,n(E,R,-.4),n(E+(p()-.5)*.06,R+(p()-.5)*.05,X),c,.15,.15,b(tt),tt,w)};for(const E of[-d,-d/3,d/3,d])m(E,-f,A);m(-d,f,r),m(d,f,r),Se(nt,n(-d-.18,-f,A-.06),n(d+.18,-f,A-.06),i,.17,.11,u(),u(),null),Se(nt,n(-d-.18,f,r-.06),n(d+.18,f,r-.06),i,.17,.11,u(),u(),null);for(const E of[-d,-d/3,d/3,d])Se(nt,n(E,-f-.38,h(-f-.38)+.04),n(E,f+.32,h(f+.32)+.04),i,.12,.07,u(),u(),null);let y=-d-.3;const M=3+(p()*12|0);for(let E=0;y<d+.3;E++){const R=.22+p()*.08,X=ue(u(),$("#aaa293"),.15),tt=(p()-.5)*.02,j=(p()-.5)*.02;E!==M&&Se(nt,n(y+R/2,-f-.44,h(-f-.44)+.13+tt),n(y+R/2+(p()-.5)*.04,f+.38,h(f+.38)+.13+j),c,R+.01,.03,X,g(X),w),y+=R}Se(nt,n(-d-.32,-f-.45,h(-f-.45)+.05),n(d+.32,-f-.45,h(-f-.45)+.05),i,.16,.03,u(),u(),null),Se(nt,n(-d-.32,f+.39,h(f+.39)+.05),n(d+.32,f+.39,h(f+.39)+.05),i,.14,.03,g(u()),g(u()),null);const k=(E,R,X,tt,j)=>{let et=X;const q=p()*30|0;for(let Dt=0;et<tt;Dt++){const Oe=.17+p()*.09,Ke=et+Oe/2;if(Dt!==q){const no=Yt=>j?n(E,Ke,Yt):n(Ke,E,Yt),go=j?Ke:E,Q=h(Math.min(go,f))-.02,st=p()<.08?.1+p()*.2:-.15,St=u();Se(nt,no(st),no(Q),j?l:c,Oe-.004,.024,b(St),ue(St,$("#a8a296"),.25),w)}et+=Oe+(p()<.05?.025:.002)}};k(f+.07,null,-d-.05,d+.05,!1);const z=Z;k(-z*(d+.07),null,-f+.05,f,!0),k(z*(d+.07),null,f*.1,f,!0);for(const E of[-1,1])Se(nt,n(E*(d+.03),-f,1.05),n(E*(d+.03),f,1),i,.11,.06,u(),u(),null);Se(nt,n(-1.3,.85,.47),n(1.3,.85,.47),l,.3,.05,u(),u(),w);for(const E of[-1.1,1.1])Se(nt,n(E,.85,-.2),n(E,.85,.45),c,.08,.22,b(u()),u(),w);ie=n(-Z*d*.55,-f-.02,A-.16),Qe=[mt,Ft+2,it],Bo.push([mt,Ft+1.2,it,3.6])}if(!ie){const e=[At[0]+Z*.45,At[1]+.02,At[2]-.1];S0(nt,[At[0],At[1]-.05,At[2]],e,.025,.02,5,R0,4),ie=[e[0]-Z*.06,e[1]-.03,e[2]]}let kt=null;if(I==="Tethered kite"){const e=52-Co*14;kt=[-Math.sign(Xe||1)*.42*.384*e,0,e],kt[1]=Tt(kt[0],kt[2])+.4,S0(nt,[kt[0],kt[1]-.8,kt[2]],kt,.05,.04,5,R0,4)}const kn=e=>{const o=t.createVertexArray();return t.bindVertexArray(o),t.bindBuffer(t.ARRAY_BUFFER,e),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,ve*4,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,ve*4,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,3,t.FLOAT,!1,ve*4,24),t.enableVertexAttribArray(3),t.vertexAttribPointer(3,1,t.FLOAT,!1,ve*4,36),t.bindVertexArray(null),o},dr=lo(nt.d.subarray(0,Math.max(3,nt.n)*ve)),zn=kn(dr),ut=Sn(9e3),Fn=lo(ut.d.byteLength,t.DYNAMIC_DRAW),hr=kn(Fn),Re=12,F0=new Float32Array((s0.length+Ee.length)*Re);let C0=0;for(const e of s0){const o=C0++*Re;F0.set([e[0],e[1],e[2],e[3],e[4][0],e[4][1],e[4][2],e[9]===void 0?255.9:e[9],0,e[6],e[7],e[8]||0],o)}for(const e of Ee){const o=C0++*Re;F0.set([e.x,e.y-.02,e.z,e.sz,e.col[0],e.col[1],e.col[2],e.v,4,e.h,e.r2,e.fa],o)}const Cn=e=>{const o=t.createVertexArray();t.bindVertexArray(o),t.bindBuffer(t.ARRAY_BUFFER,N.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,e);for(let a=1;a<=3;a++)t.enableVertexAttribArray(a),t.vertexAttribPointer(a,4,t.FLOAT,!1,Re*4,(a-1)*16),t.vertexAttribDivisor(a,1);return t.bindVertexArray(null),o},pr=lo(F0.length?F0:new Float32Array(Re)),Pn=Cn(pr),Ut=H?re.length*6:O==="Petals"?300:170,Aa=36,te=new Float32Array((re.length+Ut*2+Aa+4)*Re),ga=lo(te.byteLength,t.DYNAMIC_DRAW),_n=Cn(ga),P0=t.createVertexArray();t.bindVertexArray(P0),t.bindBuffer(t.ARRAY_BUFFER,N.tri),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null);const Lt=new Float32Array(Ut),Ht=new Float32Array(Ut),Bt=new Float32Array(Ut),_0=new Float32Array(Ut),po=new Float32Array(Ut),N0=new Float32Array(Ut),xe=new Uint8Array(Ut),Pe=new Int16Array(Ut),me=new Float32Array(Ut),Ea=new Float32Array(Ut),Do=new Float32Array(Ut*3),Uo=Ee.filter(e=>e.v!==0&&e.v!==4),c0=e=>{if(H){const o=re[Pe[e]];Lt[e]=o.x,Ht[e]=o.y+o.h,Bt[e]=o.z}else if(O==="Petals"&&Uo.length){const o=Uo[Pe[e]%Uo.length];Lt[e]=o.x,Ht[e]=o.y+o.h,Bt[e]=o.z}else{const o=3+S()*30,a=(S()*2-1)*.4*o;Lt[e]=a,Bt[e]=o,Ht[e]=Tt(a,o)+.3}};for(let e=0;e<Ut;e++){Pe[e]=H?e/6|0:S()*1e3|0,xe[e]=0,c0(e),me[e]=S()*10;const o=O==="Petals"&&Uo.length?Uo[Pe[e]%Uo.length].col:O==="Fireflies"?[1,.85,.35]:[.95,.94,.9];Do[e*3]=o[0],Do[e*3+1]=o[1],Do[e*3+2]=o[2]}const vo=O==="Fireflies",Nn=O==="Glowing seeds",L0=(e,o,a,n,c,l,i)=>{xe[e]=1,Lt[e]=o,Ht[e]=a,Bt[e]=n,_0[e]=c,po[e]=l,N0[e]=i,me[e]=0,H&&(re[Pe[e]].full=Math.max(0,re[Pe[e]].full-1/6))};function vr(e){for(let o=0;o<Ut;o++){const a=xe[o];if(me[o]+=e,a===0){if(vo){S()<e*.08*(W?1.5:1)&&(c0(o),L0(o,Lt[o],Ht[o],Bt[o],0,.3,0));continue}Ce(Lt[o],Bt[o]);const u=ot(Kt,Gt);u>3.3&&S()<e*(u-3.3)*.35&&(c0(o),L0(o,Lt[o],Ht[o],Bt[o],Kt*.5,.6+S()*.6,Gt*.5));continue}Ce(Lt[o],Bt[o]);const n=So(Lt[o],Bt[o]),c=Ht[o]-n,l=bt(.35+c*.28,.35,1.5);let i=Kt*l,d=Gt*l;const f=ot(Kt,Gt),A=Math.sin(me[o]*2.3+o*1.7)*.5+Math.sin(me[o]*5.1+o)*.3;if(a===2){f>4.2&&S()<e*(f-4.2)*.5?(xe[o]=1,po[o]=1.2):me[o]>(vo?4+o%5:22+o%13)&&(xe[o]=0,c0(o),H&&(re[Pe[o]].full=Math.min(1,re[Pe[o]].full+1/6)));continue}let r;if(vo){const u=me[o]*.7+o*2.1;i=i*.35+Math.cos(u)*.45,d=d*.35+Math.sin(u*1.3)*.45,r=(.9+.7*Math.sin(o)-c)*.5+Math.sin(me[o]*1.1+o)*.3+Math.max(0,f-4)*.25}else r=Math.max(0,f-2.2)*.3+A*(.15+f*.08)-(H?.32:.55);const h=H?4.5:vo?2.5:2.6;_0[o]+=(i-_0[o])*Math.min(1,h*e),N0[o]+=(d-N0[o])*Math.min(1,h*e),po[o]+=(r-po[o])*Math.min(1,3*e),Lt[o]+=_0[o]*e,Ht[o]+=po[o]*e,Bt[o]+=N0[o]*e,Ea[o]+=(f*.6+1)*e*(o%2?1:-1),Ht[o]<n+.3&&(Ht[o]=n+.3,po[o]<0&&(po[o]=0),!vo&&f<3.2&&(xe[o]=2,me[o]=0,Ht[o]=n+.25+o%7*.04));const v=Bt[o];vo&&me[o]>14+o%9&&(xe[o]=2,me[o]=0),(v>110||v<.8||Math.abs(Lt[o])>.6*Math.max(v,1)+6||Ht[o]>n+45)&&(xe[o]=0,c0(o),H&&(re[Pe[o]].full=Math.min(1,re[Pe[o]].full+1/6)))}}const Je=9,Xt=6,i0=.28,Ln=.86,Bn=["#3e4c70","#9c4a36","#c39a52","#6b7652","#d9d0bd","#7b5a68","#b9a98c"].map($),Ma=Je*Xt*2,B=new Float32Array(Ma*3),Vt=new Float32Array(Ma*3),l0=new Uint8Array(Ma),f0=[],Sa=[],xr=.32,Ra=(e,o)=>{o[0]=At[0]+($t[0]-At[0])*e,o[1]=At[1]+($t[1]-At[1])*e-xr*4*e*(1-e),o[2]=At[2]+($t[2]-At[2])*e},ee=[0,0,0];let B0=0,D0=0;const U0=Ct(Qt($t,At));for(let e=0;e<Je;e++){f0.push((e+.8)/(Je+.6)),Sa.push(ue(Bn[p()*Bn.length|0],[.6,.55,.45],p()*.3));for(let o=0;o<Xt;o++)for(let a=0;a<2;a++){const n=(e*Xt+o)*2+a;Ra(f0[e],ee);const c=(a-.5)*i0;B[n*3]=ee[0]+U0[0]*c,B[n*3+1]=ee[1]-o*Ln/(Xt-1),B[n*3+2]=ee[2]+U0[2]*c,l0[n]=o===0?1:0}}Vt.set(B);const Vo=[];for(let e=0;e<Je;e++)for(let o=0;o<Xt;o++){const a=(e*Xt+o)*2;if(Vo.push([a,a+1,i0]),o<Xt-1){const n=Ln/(Xt-1);Vo.push([a,a+2,n],[a+1,a+3,n],[a,a+3,ot(i0,n)],[a+1,a+2,ot(i0,n)])}}const mr=Vo.length,br=new Int16Array(Vo.map(e=>e[0])),yr=new Int16Array(Vo.map(e=>e[1])),wr=new Float32Array(Vo.map(e=>e[2]));function Ar(e){Ce((At[0]+$t[0])/2,(At[2]+$t[2])/2);const o=ot(Kt,Gt);B0+=(Kt*.012-B0)*e*3,D0+=(Gt*.012-D0)*e*3;const a=2,n=e/a;for(let c=0;c<a;c++){for(let l=0;l<Je;l++){Ra(f0[l],ee);const i=4*f0[l]*(1-f0[l]);Ce(ee[0],ee[2]);const d=Nt+c*n,f=Math.sin(d*(9+l)+l*1.7)*.35+Math.sin(d*23.1+l*3.1)*.2,A=Math.cos(d*(7.5+l*.7)+l)*.35,r=Kt*(1+f*.5)+A*o*.3,h=Gt*(1+A*.5)-f*o*.3,v=f*o*.15,u=Math.min(o*o,40)*n*n*.16,b=Math.sin(d*(5.3+l*.61)+l*2.3);for(let g=0;g<Xt-1;g++){const w=(l*Xt+g)*6,m=w+3,y=w+6,M=w+9,k=B[m]-B[w],z=B[m+1]-B[w+1],E=B[m+2]-B[w+2],R=B[y]-B[w],X=B[y+1]-B[w+1],tt=B[y+2]-B[w+2];let j=z*tt-E*X,et=E*R-k*tt,q=k*X-z*R;const Dt=ot(j,et,q)||1;j/=Dt,et/=Dt,q/=Dt;const Oe=1/(4*n),Ke=r-(B[w]-Vt[w]+B[m]-Vt[m]+B[y]-Vt[y]+B[M]-Vt[M])*Oe,no=v-(B[w+1]-Vt[w+1]+B[m+1]-Vt[m+1]+B[y+1]-Vt[y+1]+B[M+1]-Vt[M+1])*Oe,go=h-(B[w+2]-Vt[w+2]+B[m+2]-Vt[m+2]+B[y+2]-Vt[y+2]+B[M+2]-Vt[M+2])*Oe,Q=Ke*j+no*et+go*q,st=Q*Math.abs(Q)*n*n,St=.05*n*n,Yt=j*st+Ke*St,ye=et*st+no*St,so=q*st+go*St;for(let we=w;we<=M;we+=3)l0[we/3]||(B[we]+=Yt,B[we+1]+=ye,B[we+2]+=so);const fe=u*(g+1)/Xt*(b+.6*Math.sin(d*11.7+l*4.1+g*.9));B[y]+=j*fe,B[y+1]+=et*fe,B[y+2]+=q*fe,B[M]-=j*fe,B[M+1]-=et*fe,B[M+2]-=q*fe}for(let g=0;g<Xt;g++)for(let w=0;w<2;w++){const m=(l*Xt+g)*2+w;if(l0[m]){const y=(w-.5)*i0;B[m*3]=ee[0]+U0[0]*y+B0*i,B[m*3+1]=ee[1],B[m*3+2]=ee[2]+U0[2]*y+D0*i,Vt[m*3]=B[m*3],Vt[m*3+1]=B[m*3+1],Vt[m*3+2]=B[m*3+2];continue}for(let y=0;y<3;y++){const M=B[m*3+y],k=(M-Vt[m*3+y])*.985;Vt[m*3+y]=M,B[m*3+y]=M+k+(y===1?-9.8*n*n:0)}}}for(let l=0;l<4;l++)for(let i=0;i<mr;i++){const d=br[i],f=yr[i],A=wr[i],r=d*3,h=f*3,v=B[h]-B[r],u=B[h+1]-B[r+1],b=B[h+2]-B[r+2],g=Math.sqrt(v*v+u*u+b*b)+1e-6,w=(g-A)/g,m=l0[d]?0:1,y=l0[f]?0:1,M=m+y;if(!M)continue;const k=w*m/M,z=w*y/M;B[r]+=v*k,B[r+1]+=u*k,B[r+2]+=b*k,B[h]-=v*z,B[h+1]-=u*z,B[h+2]-=b*z}}}const gr={"Major pentatonic":[0,2,4,7,9],"Minor pentatonic":[0,3,5,7,10],Lydian:[0,4,6,7,11],"Whole-tone":[0,2,4,6,8]},Dn=74+(p()*5|0)-2,Un=gr[L].map(e=>Dn+e),$e=5,V0=.075,I0=Un.map(e=>.42*Math.pow(2,-(e-Dn)/24)),_e=new Float32Array($e*2),xo=new Float32Array($e*2),Vn=new Float32Array($e).fill(-9);let Ne=[0,0],mo=[0,0];const Le=.2,Ta=[];function Er(e,o){Ce(ie[0],ie[2]);const a=ot(Kt,Gt),n=Nt,c=Math.max(0,a-pe.base*.8),l=(Math.sin(n*3.1)+Math.sin(n*5.4+1)*.8+Math.sin(n*13.7+2)*.3)*(a*.35+c*.5),i=(Math.cos(n*2.7+1)+Math.sin(n*5.9)*.8)*(a*.35+c*.5),d=(Kt+l)*.22,f=(Gt+i)*.22;for(let r=0;r<$e;r++){const h=.12+I0[r]*.5,v=9.8/h;for(let u=0;u<2;u++)xo[r*2+u]+=(-v*_e[r*2+u]-.8*xo[r*2+u]+(u?f:d)*1.2*(1+r*.07))*e,_e[r*2+u]+=xo[r*2+u]*e}const A=9.8/.32;for(let r=0;r<2;r++)mo[r]+=(-A*Ne[r]-.5*mo[r]+(r?f:d)*3.6+(r?l:i)*.08)*e,Ne[r]+=mo[r]*e;for(let r=0;r<$e;r++){const h=r/$e*6.283,v=Math.cos(h)*V0+_e[r*2]*Le,u=Math.sin(h)*V0+_e[r*2+1]*Le,b=Ne[0]*Le,g=Ne[1]*Le,w=b-v,m=g-u,y=ot(w,m)+1e-6;if(y<.044){const M=w/y,k=m/y,z=((mo[0]-xo[r*2])*M+(mo[1]-xo[r*2+1])*k)*Le;if(z<0){const E=-z*1.6/Le;mo[0]+=M*E*.6,mo[1]+=k*E*.6,xo[r*2]-=M*E*.4,xo[r*2+1]-=k*E*.4;const R=(.044-y)/Le;Ne[0]+=M*R*.6,Ne[1]+=k*R*.6,_e[r*2]-=M*R*.4,_e[r*2+1]-=k*R*.4,o&&Nt-Vn[r]>.14&&-z>.008&&(Vn[r]=Nt,Ta.push([r,Math.min(1,-z*9)]))}}}}const zt=kt?{p:[kt[0]-Xe*10,kt[1]+26,kt[2]+18],o:null,L:34,tail:[]}:null;if(zt){zt.o=zt.p.slice();for(let e=0;e<10;e++)zt.tail.push([zt.p[0],zt.p[1]-e*.35,zt.p[2]],[zt.p[0],zt.p[1]-e*.35,zt.p[2]])}function Mr(e){if(!zt)return;Ce(zt.p[0],zt.p[2]);const o=Kt*1.5+Ue*.3,a=Gt*1.5+Ve*.3,n=zt.p,c=zt.o,l=(n[0]-c[0])/e,i=(n[1]-c[1])/e,d=(n[2]-c[2])/e,f=o-l,A=-i,r=a-d,h=ot(f,A,r),v=f*h*.09,u=r*h*.09,b=h*h*.11+A*h*.09-9.8*.35+Math.sin(Nt*1.3)*.6;for(let M=0;M<3;M++)c[M]=n[M];n[0]+=l*e*.99+v*e*e,n[1]+=i*e*.99+b*e*e,n[2]+=d*e*.99+u*e*e;const g=Qt(n,kt),w=ot(g[0],g[1],g[2]);if(w>zt.L)for(let M=0;M<3;M++)n[M]=kt[M]+g[M]/w*zt.L;const m=So(n[0],n[2])+1;n[1]<m&&(n[1]=m);const y=zt.tail;y[0]=[n[0],n[1]-.85,n[2]],y[1]=y[0].slice();for(let M=1;M<10;M++){const k=y[M*2],z=y[M*2+1];for(let E=0;E<3;E++){const R=(k[E]-z[E])*.96;z[E]=k[E],k[E]+=R+(E===0?o:E===2?a:0)*.5*e*e*8+(E===1?-3*e*e:0)}}for(let M=0;M<3;M++)for(let k=1;k<10;k++){const z=y[(k-1)*2],E=y[k*2],R=Qt(E,z),X=ot(R[0],R[1],R[2])+1e-6,tt=(X-.6)/X;for(let j=0;j<3;j++)E[j]-=R[j]*tt}}const Be=D==="Swifts"?16:D==="Rooks"?14:0,u0=[],Io=D==="Swifts"?10:D==="Rooks"?6.5:7,Sr=D==="Swifts"?.42:D==="Rooks"?.95:.78,be=[Z*.25,45+p()*20,12+p()*8];D==="Rooks"?(be[1]=be[1]*1.5+30,be[2]*=1.8):(be[1]*=1.25,be[2]*=1.2);const bo=[-Z*2.5,0,22+p()*6];bo[1]=Tt(bo[0],bo[2])+9+p()*3;for(let e=0;e<Be;e++){const o=p()*6.283,a=Be===1?bo.slice():[be[0]*be[1]+(p()-.5)*16,Tt(0,be[1])+be[2]+(p()-.5)*6,be[1]+(p()-.5)*14];u0.push({p:a,a:[Math.cos(o)*Io,0,Math.sin(o)*Io],ph:p()*6.283,flap:1})}function Rr(e){if(!Be)return;const o=Nt;let a=0,n=0,c=0,l=0,i=0;for(const r of u0)a+=r.p[0],n+=r.p[1],c+=r.p[2],l+=r.a[0],i+=r.a[2];a/=Be,n/=Be,c/=Be,l/=Be,i/=Be;const d=be[1]+Math.sin(o*.05)*18,f=Math.sin(o*.07+1)*.3*d,A=So(f,d)+be[2]+Math.sin(o*.11)*4;for(const r of u0){Ce(r.p[0],r.p[2]);const h=Kt*1.35+Ue*.4,v=Gt*1.35+Ve*.4,u=ot(h,v);let b=0,g=0,w=0;if(Be===1){const y=-h+(bo[0]-r.p[0])*.5+(u<1.5?Math.cos(o*.4)*2.5:0),M=-v+(bo[2]-r.p[2])*.5+(u<1.5?Math.sin(o*.4)*2.5:0);b=(y-r.a[0])*2.5,w=(M-r.a[2])*2.5,g=(bo[1]+Math.sin(o*.9)*.4-r.p[1])*2-r.a[1]*2,r.flap=u>5?.25:1}else{b+=(f-a)*.05+(a-r.p[0])*.12+(l-r.a[0])*.35,w+=(d-c)*.05+(c-r.p[2])*.12+(i-r.a[2])*.35,g+=(A-r.p[1])*.25-r.a[1]*.6;for(const M of u0){if(M===r)continue;const k=r.p[0]-M.p[0],z=r.p[1]-M.p[1],E=r.p[2]-M.p[2],R=k*k+z*z+E*E+.01;R<9&&(b+=k/R*6,g+=z/R*3,w+=E/R*6)}const y=bt(u/7,0,1)*(D==="Rooks"?1.6:1);b+=(-h/(u+.001)*Io-r.a[0])*y*.6,w+=(-v/(u+.001)*Io-r.a[2])*y*.6,D==="Swifts"&&(b+=Math.sin(o*1.7+r.ph)*4,w+=Math.cos(o*1.3+r.ph*2)*4),r.flap=D==="Swifts"?Math.sin(o*.9+r.ph)>.2?1:.15:Math.sin(o*.5+r.ph)>-.4?1:.2}r.a[0]+=b*e,r.a[1]+=g*e,r.a[2]+=w*e;const m=ot(r.a[0],r.a[2]);if(Be>1){const y=bt(m,Io*.6,Io*1.3);r.a[0]*=y/(m+1e-4),r.a[2]*=y/(m+1e-4)}r.a[1]=bt(r.a[1],-2.5,2.5),r.p[0]+=(r.a[0]+h)*e,r.p[1]+=r.a[1]*e,r.p[2]+=(r.a[2]+v)*e,r.p[2]=bt(r.p[2],14,140),r.p[0]=bt(r.p[0],-.55*r.p[2],.55*r.p[2]),r.ph+=e*(D==="Rooks"?9:D==="Swifts"?22:17)*(r.flap>.5?1:.2)}}const le=s.input;let d0=!1,O0=0,In=0,On=0,K0=0,G0=0,W0=0,Wt=0,Tr=!1,ka=null,za=!1;const q0=(e,o)=>{const a=e*2-1,n=1-o*2;let c=co[0]+(ze[0]*a+Fe[0]*n)*Ro,l=co[1]+(ze[1]*a+Fe[1]*n)*Ro,i=co[2]+(ze[2]*a+Fe[2]*n)*Ro;const d=ot(c,l,i);c/=d,l/=d,i/=d;let f=.5,A=.5;for(;f<160;){const r=lt[0]+c*f,h=lt[1]+l*f,v=lt[2]+i*f;if(h<So(r,v)){let u=A,b=f;for(let g=0;g<12;g++){const w=(u+b)/2;lt[1]+l*w<So(lt[0]+c*w,lt[2]+i*w)?b=w:u=w}return{sky:!1,x:lt[0]+c*b,y:lt[1]+l*b,z:lt[2]+i*b,t:b,d:[c,l,i]}}A=f,f+=.05+f*.03}return{sky:!0,d:[c,l,i],x:c/Math.max(i,.05)*90,z:90,y:0,t:40}},Fa=[];for(let e=0;e<Aa;e++)Fa.push({a:e/Aa*6.283+p(),r:1,y:0,live:0,p:[0,0,0],v:[0,0,0]});let yo=[0,0,0],wo=1,Oo=0;function kr(e,o,a,n,c,l){let i=a-e,d=n-o;const f=ot(i,d);if(f<1e-4)return;i/=f,d/=f;const A=i*c,r=d*c;for(let h=0;h<dt;h++){const v=To[h],u=.6+.075*v;for(let b=0;b<rt;b++){const g=h*rt+b,w=ko[g],m=w-e,y=v-o;let M=(m*i+y*d)/f;M=bt(M,0,1);const k=e+i*f*M-w,z=o+d*f*M-v,E=(k*k+z*z)/(u*u);if(E>6)continue;const R=Math.exp(-E)*Math.min(1,l*10);Et[g]*i+Mt[g]*d<c&&(Et[g]+=(A-Et[g])*R,Mt[g]+=(r-Mt[g])*R)}}}function zr(e,o,a,n){for(let c=0;c<dt;c++){const l=To[c],i=3+.25*l;for(let d=0;d<rt;d++){const f=c*rt+d,A=e-ko[f],r=o-l,h=ot(A,r)+.3,v=Math.exp(-(h*h)/(i*i))*n*2;Et[f]+=(A/h*a-Et[f])*v*.5,Mt[f]+=(r/h*a-Mt[f])*v*.5}}}let H0=[];function Fr(e){const o=le.taps();if(le.down&&le.inside){d0||(d0=!0,O0=0,In=G0=le.x,On=W0=le.y,K0=0,Wt=0,za=!0),O0+=e;const a=ot(le.x-G0,le.y-W0);if(K0+=a,K0>.03){if(a>1e-4){const n=q0(G0,W0),c=q0(le.x,le.y),l=bt(a/Math.max(e,.001)*13,2.5,15);kr(n.x,n.z,c.x,c.z,l,e)}Wt=0}else if(O0>.3){const n=q0(le.x,le.y);Tr=n.sky,ka=n,Wt=Math.min(1,Wt+e/2.2),zr(n.x,n.z,1.5+3*Wt,e);const c=n.sky?26:Math.min(n.t,30);yo=[lt[0]+n.d[0]*c,lt[1]+n.d[1]*c,lt[2]+n.d[2]*c],wo=c/10}G0=le.x,W0=le.y}else d0&&(d0=!1,K0<=.03&&O0<=.3?H0.push([In,On]):Wt>.08&&ka&&Cr(ka,Wt),Wt=0);if(!za)for(const a of o)H0.push([a.x,a.y]);za=d0;for(const a of H0)Pr(a[0],a[1]);H0=[]}function Cr(e,o){if(e.sky){const a=bt(e.x,-45,45),n=96,c=-a*.5,l=-n,i=ot(c,l);io.push({ring:!1,ox:a,oz:n,ux:c/i,uz:l/i,s:0,U:9+9*o,S:8+12*o,Wd:14+20*o,T:4+4*o,len:125,lat:0,ph:S()*6})}else{const a=1+e.z/25;io.push({ring:!0,ox:e.x,oz:e.z,s:.3,U:(5+6*o)*a,S:4+9*o,T:1.2*a,len:(4+10*o)*a});let n=0;for(let c=0;c<Ut&&n<6+20*o;c++)xe[c]!==1&&ot(Lt[c]-e.x,Bt[c]-e.z)<5*a&&(L0(c,Lt[c],So(Lt[c],Bt[c])+.5,Bt[c],(Lt[c]-e.x)*2,1.5+o*2,(Bt[c]-e.z)*2),n++)}Oo=1.2;for(const a of Fa)a.live=1,a.v=[(S()-.5)*6,(S()-.2)*4,(e.sky?-8:0)+(S()-.5)*6]}function Pr(e,o){const a=q0(e,o);let n,c,l;a.sky?(n=lt[0]+a.d[0]*12,c=lt[1]+a.d[1]*12,l=lt[2]+a.d[2]*12):(n=a.x,l=a.z,c=a.y+.6);let i=0;for(let d=0;d<2&&i<22;d++)for(let f=0;f<Ut&&i<22;f++){const A=(f*37+(Nt*97|0))%Ut;if(d===0?xe[A]===0:xe[A]===2){const r=S()*6.283,h=.6+S()*1.4;L0(A,n+Math.cos(r)*.15,c+S()*.3,l+Math.sin(r)*.15,Math.cos(r)*h,.8+S()*1.4,Math.sin(r)*h),i++}}a.sky||io.push({ring:!0,ox:n,oz:l,s:.2,U:5,S:2.6,T:.8*(1+l/25),len:2.5*(1+l/25)}),s.sound.on&&s.sound.hit("noise",.35,{cutoff:2200,dur:.35})}const Ca=11025,Pa=new Float32Array(4096);let X0=0,Ao=19088743^(parseInt(T.slice(56,64),16)|0),_a=0,Na=0,Kn=0,Y0=0,La=0,Gn=0,Wn=0,_r=0,Nr=0;const qn=()=>(Ao^=Ao<<13,Ao^=Ao>>>17,Ao^=Ao<<5,(Ao>>>0)/2147483648-1);function Lr(e){let o=0,a=0,n=0;for(let r=0;r<33;r+=2)for(let h=4;h<rt-4;h+=2){n++;const v=r*rt+h;o+=ot(Et[v],Mt[v]),a+=Math.abs(on[v])+Math.abs(an[v])}o/=n,a/=n;const c=a;Nr=c;for(const r of Ta){const[h,v]=r,u=Un[h],b=bt(ie[0]/Math.max(ie[2],1)*1.5,-.8,.8);s.sound.note(u,{dur:3.2,vel:.12+.5*v,wave:"sine",pan:b,attack:.003}),s.sound.note(u,{freq:440*Math.pow(2,(u-69)/12)*2.76,dur:1.1,vel:(.12+.5*v)*.28,wave:"sine",pan:b})}if(Ta.length=0,!s.sound.on)return;X0+=e*Ca;let l=Math.floor(X0);if(X0-=l,l=Math.min(l,Pa.length),l<16){X0+=l;return}const i=Gn,d=Wn,f=bt((o-.5)/9,0,1.2),A=bt(c/2.2,0,1);for(let r=0;r<l;r++){const h=r/l,v=i+(f-i)*h,u=d+(A-d)*h,b=qn(),g=.02+.05*v;_a+=(b-_a)*g,Na+=(_a-Na)*g;const w=260+520*v+90*Math.sin(_r+=9e-5*(1+v*3)),m=2*Math.sin(Math.PI*w/Ca),y=.32;Kn+=m*Y0;const M=b-Kn-y*Y0;Y0+=m*M,La+=(b-La)*.55;const k=b-La,z=qn()>.94-u*.25?1:.25;Pa[r]=Na*(1.6+3.5*v)+Y0*(.18+.75*v*v)+k*u*.22*z}Gn=f,Wn=A,s.sound.pcm(Pa.subarray(0,l),Ca,{vel:.55})}const pt=ct,Br=.8+p()*.5,Hn=[p()*4e3,p()*4e3],j0=F(8),Xn=s.home?[0,0]:[j0()*6e4,j0()*6e4],Dr=s.home?1:.72+j0()*.6,Ur=s.home?0:j0()*.06-.012,Yn=_==="Calm"?6:_==="Gusty"?10:14,Ko=7,to={"Golden hour":[1500,1300,.66,8500,1/80,60],"Morning haze":[1150,900,.63,7e3,1/100,52],"Storm light":[850,2200,.44,12e3,1/65,56],"Aurora night":[1600,800,.64,8500,1/90,44]}[C],eo=32,gt=new Float32Array(eo+38*4),J=(e,o,a)=>{const n=eo+e*4;for(let c=0;c<o.length&&c<4;c++)gt[n+c]=o[c];a!==void 0&&(gt[n+3]=a)};gt.set(Jt,0);const Vr=W?[pt.amb[0]+.01,pt.amb[1]+.035,pt.amb[2]+.025]:pt.amb;J(0,lt,0),J(1,ge,Ro),J(2,pt.sun,la),J(3,Vr,2/x),J(4,$(pt.fog),Nn?1:0),J(5,pt.glow,0),J(6,$(pt.top)),J(7,ae($(pt.hor),pt.horK)),J(8,[pt.fogD,pt.fogB,se?-4:0,pt.fogP]),J(9,[pt.cov,pt.soft,0,0]),J(10,[pt.sh,650,Br,W?1:0]),J(11,[Jo,$o,t0,e0]),J(12,[0,0,pe.base,_==="Gusty"?1:_==="Calm"?.4:.6]),J(13,[pt.grade[0],pt.grade[1],pt.grade[2],pt.exp]),J(14,[pt.tone[0],pt.tone[1],0,0]),J(15,$(K.g0)),J(16,$(K.g1)),J(17,$(K.g2)),J(18,$(K.g3)),J(19,$(K.stem)),J(20,$(K.soil)),J(21,K.gk.map((e,o)=>o===1?e*(C==="Golden hour"?1.1:C==="Storm light"?.7:W?.3:.8):e)),J(22,[ke,ne,Ge,se?1:0]),J(36,[Y.pz,Y.pil,Y.pw,Y.zE]),J(37,[Y.tz,Y.tw,Y.b0,Y.b1]),J(23,co),J(24,ze),J(25,Fe),J(26,Qe,Tn),J(27,[0,0,k0,z0]),J(28,ae($(pt.cl),pt.clK),to[0]),J(29,$(pt.cd),to[1]),J(30,[to[2]+Ur,1/(to[3]*Dr),to[4],to[5]]),J(31,[.15,1,.45]),J(32,[.55,.2,.95]),J(33,[W?.0098:.0092,W?12:0,W?1:0,W?1:0]);const jn=Xe*Yn,Qn=Co*Yn,oo=e=>eo+e*4+3,Ba=e=>{gt[oo(23)]=Xn[0]+jn*e,gt[oo(24)]=Xn[1]+Qn*e,gt[oo(25)]=e*1.5};{const e=to[0]+to[1]*.3-lt[1];gt[oo(18)]=jn/e,gt[oo(19)]=Qn/e}let Q0=0,h0=0,Z0=1,Zn=3,Da=3,J0=3+2*Ko,p0=3,ao=0,Ua=!0;Ba(3);const Go=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,Go),t.bufferData(t.UNIFORM_BUFFER,gt,t.DYNAMIC_DRAW);const Ir=eo+3,Jn=eo+9*4+2,$n=eo+12*4,ts=eo+27*4;let $0=0,ta=0,Va=0,Ia=0;wa=I==="Lone tree"?Math.pow(bt((ie[1]-k0)/z0,0,1),2):0;const oe=x<=600?x:Math.round(x*.8),es=(e,o,a,n,c,l)=>{const i=t.createTexture();return t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,a,e,o,0,n,c,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),i},ea=[0,1,2].map(()=>es(oe,oe,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR)),os=t.createFramebuffer(),Or=Math.max(8,oe>>6),oa=bt(Math.floor((-Math.tan(Zo)/(Ro*1.06)*.5+.5)*oe)-2,0,oe-8);function as(e){e<=ao||(t.bindFramebuffer(t.FRAMEBUFFER,os),Ua&&(t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ea[Z0],0),Ua=!1),t.viewport(0,0,oe,oe),t.enable(t.SCISSOR_TEST),t.scissor(0,ao,oe,e-ao),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.depthMask(!1),t.colorMask(!0,!0,!0,!0),t.bindBufferBase(t.UNIFORM_BUFFER,0,Go),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,N.noise),t.useProgram(N.skyb.p),t.bindVertexArray(P0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),ao=e)}const aa=Bo.length?1024:4,ns=es(aa,aa,t.DEPTH_COMPONENT24,t.DEPTH_COMPONENT,t.UNSIGNED_INT,t.LINEAR);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_FUNC,t.LEQUAL);{t.bindBuffer(t.UNIFORM_BUFFER,Go),t.bindBufferBase(t.UNIFORM_BUFFER,0,Go),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,N.noise),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.leaf),t.bindFramebuffer(t.FRAMEBUFFER,os),t.viewport(0,0,oe,oe),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.clearColor(0,0,0,1);for(let o=2;o>=0;o--)t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ea[o],0),o&&t.clear(t.COLOR_BUFFER_BIT);t.drawBuffers([t.COLOR_ATTACHMENT0]),t.useProgram(N.skyb.p),t.bindVertexArray(P0),t.drawArrays(t.TRIANGLES,0,3);const e=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ns,0),t.drawBuffers([t.NONE]),t.viewport(0,0,aa,aa),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),Bo.length){const o=Bo[0],a=[o[0],o[1],o[2]],n=o[3],c=n+4,l=Ct(ce([0,1,0],ge)),i=ce(ge,l),d=new Float32Array(16);for(let f=0;f<3;f++)d[f*4]=l[f]/n,d[f*4+1]=i[f]/n,d[f*4+2]=-ge[f]/c;d[12]=-r0(a,l)/n,d[13]=-r0(a,i)/n,d[14]=r0(a,ge)/c,d[15]=1,gt.set(d,16),J(34,l),J(35,i),gt[eo+5*4+3]=1,t.bufferSubData(t.UNIFORM_BUFFER,0,gt),t.useProgram(N.shd.p),t.bindVertexArray(zn),t.drawArrays(t.TRIANGLES,0,nt.n),s0.length&&(t.useProgram(N.shdl.p),t.bindVertexArray(Pn),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,s0.length))}t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindVertexArray(null),t.deleteFramebuffer(e),ao=oa,Ba(J0)}const Zt=(Xt-1)*2+1,vt=3,It=new Float32Array(Zt*vt*3),Zr=new Float32Array(Zt*vt*3),ht=new Float32Array(Zt*6),ss=new Float32Array(Zt*vt),Kr=[0,1,vt+1,0,vt+1,vt],rs=new Float32Array(256);for(let e=0;e<256;e++)rs[e]=Math.sin(e/256*6.283185);const cs=e=>rs[e*40.743665&255];for(let e=0;e<Zt;e++)for(let o=0;o<vt;o++)ss[e*vt+o]=(1-e*.03)*(e===Zt-1||e===0?.78:1);const v0=Zt*vt,Pt=new Float32Array(v0*ve),is=new Float64Array(Je*v0),na=new Int32Array((Zt-1)*(vt-1)*6);for(let e=0;e<Je;e++)for(let o=0;o<v0;o++)is[e*v0+o]=ss[o]*(.94+.12*((e*7+o%vt*3)%5/4));for(let e=0;e<Zt-1;e++)for(let o=0;o<vt-1;o++)for(let a=0;a<6;a++)na[(e*(vt-1)+o)*6+a]=(e*vt+o+Kr[a])*ve;function Gr(){const e=ut.d;for(let o=0;o<Je;o++){for(let r=0;r<Zt;r++){const h=r>>1,v=r*6;for(let u=0;u<2;u++)for(let b=0;b<3;b++){const g=((o*Xt+h)*2+u)*3+b;let w=B[g];if(r&1){const m=B[g+6],y=h>0?B[g-6]:w,M=h<Xt-2?B[g+12]:m;w=.5*(w+m)+.0625*(w+m-y-M)}ht[v+u*3+b]=w}}const a=(Zt>>1)*6;Ce((ht[a]+ht[a+3])*.5,(ht[a+2]+ht[a+5])*.5);const n=ot(Kt,Gt),c=Math.min(.014,.0026*n),l=Nt*(6.1+o*.37),i=Sa[o];for(let r=0;r<Zt;r++){const h=r*6,v=Math.max(0,r-1)*6,u=Math.min(Zt-1,r+1)*6,b=ht[h+3]-ht[h],g=ht[h+4]-ht[h+1],w=ht[h+5]-ht[h+2],m=ht[u]+ht[u+3]-ht[v]-ht[v+3],y=ht[u+1]+ht[u+4]-ht[v+1]-ht[v+4],M=ht[u+2]+ht[u+5]-ht[v+2]-ht[v+5];let k=g*M-w*y,z=w*m-b*M,E=b*y-g*m;const R=Math.sqrt(k*k+z*z+E*E)||1;k/=R,z/=R,E/=R;const X=Math.min(1,r/3),tt=bt((Kt*k+Gt*E)*.014,-.05,.05)*X;for(let j=0;j<vt;j++){const et=j/(vt-1),q=tt*4*et*(1-et)+c*X*(cs(r*1.15-l+j*1.7+o*1.3)+.5*cs(r*.7-l*1.63-j*2.3+o*2.9)),Dt=(r*vt+j)*3;It[Dt]=ht[h]+b*et+k*q,It[Dt+1]=ht[h+1]+g*et+z*q,It[Dt+2]=ht[h+2]+w*et+E*q}}const d=o*v0;for(let r=0;r<Zt;r++)for(let h=0;h<vt;h++){const v=(r*vt+h)*3,u=(r*vt+Math.max(0,h-1))*3,b=(r*vt+Math.min(vt-1,h+1))*3,g=(Math.max(0,r-1)*vt+h)*3,w=(Math.min(Zt-1,r+1)*vt+h)*3,m=It[b]-It[u],y=It[b+1]-It[u+1],M=It[b+2]-It[u+2],k=It[w]-It[g],z=It[w+1]-It[g+1],E=It[w+2]-It[g+2],R=y*E-M*z,X=M*k-m*E,tt=m*z-y*k,j=Math.sqrt(R*R+X*X+tt*tt)||1,et=r*vt+h,q=et*ve,Dt=is[d+et];Pt[q]=It[v],Pt[q+1]=It[v+1],Pt[q+2]=It[v+2],Pt[q+3]=R/j,Pt[q+4]=X/j,Pt[q+5]=tt/j,Pt[q+6]=i[0]*Dt,Pt[q+7]=i[1]*Dt,Pt[q+8]=i[2]*Dt,Pt[q+9]=1}const f=ut.n,A=Math.min(na.length,Math.floor((ut.cap-f)/6)*6);for(let r=0;r<A;r++){const h=na[r],v=(f+r)*ve;e[v]=Pt[h],e[v+1]=Pt[h+1],e[v+2]=Pt[h+2],e[v+3]=Pt[h+3],e[v+4]=Pt[h+4],e[v+5]=Pt[h+5],e[v+6]=Pt[h+6],e[v+7]=Pt[h+7],e[v+8]=Pt[h+8],e[v+9]=Pt[h+9]}if(ut.n=f+A,A<na.length)return}}function Wr(){ut.n=0;const e=$("#5a5046");let o=null;for(let i=0;i<=14;i++){const d=i/14;Ra(d,ee);const f=4*d*(1-d),A=[ee[0]+B0*f,ee[1],ee[2]+D0*f];o&&Me(ut,o,A,.014,e,0),o=A}Gr();const a=$(Ze?"#c9d2d8":"#c8b07a"),n=[ie[0]+$0*wa,ie[1],ie[2]+ta*wa];Me(ut,[n[0],n[1]+.02,n[2]],[n[0],n[1]-.06,n[2]],.01,e,0);for(let i=0;i<$e;i++){const d=i/$e*6.283,f=Math.cos(d)*V0,A=Math.sin(d)*V0,r=[n[0]+f,n[1]-.06,n[2]+A],h=[r[0]+_e[i*2]*.1,r[1]-.1,r[2]+_e[i*2+1]*.1],v=[h[0]+_e[i*2]*I0[i],h[1]-I0[i],h[2]+_e[i*2+1]*I0[i]];Me(ut,r,h,.004,e,0),Me(ut,h,v,.022,a,3)}const c=[n[0]+Ne[0]*Le,n[1]-.06-Le,n[2]+Ne[1]*Le];if(Me(ut,[n[0],n[1]-.06,n[2]],c,.004,e,0),Me(ut,[c[0]-.03,c[1],c[2]],[c[0]+.03,c[1],c[2]],.02,R0,0),Me(ut,c,[c[0]+Ne[0]*.25,c[1]-.22,c[2]+Ne[1]*.25],.06,ae(Sa[0],.9),1),zt){const i=zt.p,d=[$("#c83a2a"),$("#e8d6a0")];let f=kt;for(let E=1;E<=16;E++){const R=E/16,X=[kt[0]+(i[0]-kt[0])*R,kt[1]+(i[1]-kt[1])*R-2.2*4*R*(1-R)*.5,kt[2]+(i[2]-kt[2])*R];Me(ut,f,X,.025+R*.03,e,0),f=X}Ce(i[0],i[2]);const A=ot(Kt,Gt)+.001,r=Kt/A,h=Gt/A,v=[0,1,0],u=Ct(ce(v,[r,0,h])),b=.5,g=[-r*b,1,-h*b],w=Ct(g),m=[i[0]+w[0]*1.3,i[1]+w[1]*1.3,i[2]+w[2]*1.3],y=[i[0]-w[0]*.9,i[1]-w[1]*.9,i[2]-w[2]*.9],M=[i[0]-u[0]*.9,i[1],i[2]-u[2]*.9],k=[i[0]+u[0]*.9,i[1],i[2]+u[2]*.9];Ie(ut,m,M,i,d[0],1),Ie(ut,m,i,k,d[1],1),Ie(ut,M,y,i,d[1],1),Ie(ut,i,y,k,d[0],1);const z=zt.tail;for(let E=1;E<10;E++)Me(ut,z[(E-1)*2],z[E*2],.16,d[E%2],1)}const l=$(D==="Rooks"?"#1a1816":"#2a2622");for(const i of u0){const d=ot(i.a[0],i.a[2])+1e-4,f=[i.a[0]/d,0,i.a[2]/d],A=[f[2],0,-f[0]],r=Sr,h=i.flap>.5?Math.sin(i.ph):.15+Math.sin(i.ph)*.05,v=i.p,u=[v[0]+f[0]*r*.35,v[1],v[2]+f[2]*r*.35],b=[v[0]-f[0]*r*.4,v[1],v[2]-f[2]*r*.4],g=h*r*.35,w=D==="Swifts"?.32:.1,m=[v[0]-A[0]*r*.5-f[0]*r*w,v[1]+g,v[2]-A[2]*r*.5-f[2]*r*w],y=[v[0]+A[0]*r*.5-f[0]*r*w,v[1]+g,v[2]+A[2]*r*.5-f[2]*r*w],M=[v[0]-f[0]*r*.08,v[1],v[2]-f[2]*r*.08];Ie(ut,u,m,M,l,2),Ie(ut,u,M,y,l,2);const k=[b[0]-A[0]*r*.1,v[1],b[2]-A[2]*r*.1],z=[b[0]+A[0]*r*.1,v[1],b[2]+A[2]*r*.1];Ie(ut,M,k,z,l,2),Me(ut,u,b,r*.09,l,2)}}let sa=0,Wo=0;function qr(){let e=0;const o=(a,n,c,l,i,d,f,A,r,h,v,u)=>{const b=e++*Re;te[b]=a,te[b+1]=n,te[b+2]=c,te[b+3]=l,te[b+4]=i,te[b+5]=d,te[b+6]=f,te[b+7]=A,te[b+8]=r,te[b+9]=h,te[b+10]=v,te[b+11]=u};for(const a of re)o(a.x,a.y-.02,a.z,a.sz*(.45+.55*Math.sqrt(a.full)),1,1,1,.25+.75*a.full,5,a.h,a.r2,a.fa);Wo=e;for(let a=0;a<Ut;a++){if(xe[a]===0)continue;const n=Do[a*3],c=Do[a*3+1],l=Do[a*3+2];if(vo){const i=Math.pow(Math.max(0,Math.sin(me[a]*(1.7+a%5*.2)+a)),6);if(i<.02)continue;o(Lt[a],Ht[a],Bt[a],.09,n*2.2,c*2.2,l*2.2,i,3,0,0,0)}else H?(o(Lt[a],Ht[a],Bt[a],.045,n,c,l,1,1,0,Ea[a],0),Nn&&o(Lt[a],Ht[a],Bt[a],.12,.25,.7,.9,.55,3,0,0,0)):o(Lt[a],Ht[a],Bt[a],.02,n,c,l,1,2,0,Ea[a],a*.7)}if(Wt>0||Oo>0){for(const a of Fa){let n;if(Wt>0)a.a+=.12+Wt*.15,a.r=1.6-Wt*1.1+Math.sin(a.a*.7)*.25,n=[yo[0]+Math.cos(a.a)*a.r*wo,yo[1]+Math.sin(a.a*1.3)*.25*wo,yo[2]+Math.sin(a.a)*a.r*wo*.6],a.p=n;else{for(let l=0;l<3;l++)a.p[l]+=a.v[l]*wo*.04;n=a.p}const c=Wt>0?.35+Wt*.5:Oo;o(n[0],n[1],n[2],.05*wo,1.4,1.2,.9,c*.8,3,0,0,0)}Wt>0&&o(yo[0],yo[1],yo[2],(.25+Wt*.5)*wo,.9,.85,.7,.25+.3*Wt,3,0,0,0)}sa=e}function ls(){if(Nt>=p0+Ko){as(oe);const o=Q0===h0?3-h0-Z0:Q0;Q0=h0,h0=Z0,Z0=o,Zn=Da,Da=J0,p0+=Ko,J0=p0+2*Ko,ao=oa,Ua=!0,Ba(J0)}gt[oo(20)]=Nt-Zn,gt[oo(31)]=Nt-Da,gt[oo(32)]=bt((Nt-p0)/Ko,0,1),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,x,x),t.enable(t.SCISSOR_TEST),t.scissor(0,0,x,x),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),t.clearColor(0,0,0,1),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.colorMask(!0,!0,!0,!1),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.STENCIL_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.disable(t.RASTERIZER_DISCARD),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL);{const o=pe.base,a=Ws(o)/o;gt[$n]=Ue*a,gt[$n+1]=Ve*a}const e=Nt*4.5;gt[Ir]=Nt,gt[Jn]=Hn[0]+Xe*e,gt[Jn+1]=Hn[1]+Co*e,gt[ts]=$0,gt[ts+1]=ta,t.bindBuffer(t.UNIFORM_BUFFER,Go),t.bufferData(t.UNIFORM_BUFFER,gt,t.DYNAMIC_DRAW),t.bindBufferBase(t.UNIFORM_BUFFER,0,Go),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,N.noise),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ea[Q0]),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,ea[h0]),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.leaf),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,ns),t.activeTexture(t.TEXTURE1),wn^=1,t.bindTexture(t.TEXTURE_2D,Ys[wn]),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.bindBuffer(t.PIXEL_UNPACK_BUFFER,null);for(let o=0;o<wt;o++)An[o]=Math.sqrt(Et[o]*Et[o]+Mt[o]*Mt[o]),A0[o*4]=pa(js[o]),A0[o*4+1]=pa(Qs[o]),A0[o*4+2]=pa(Zs[o]);if(t.texSubImage2D(t.TEXTURE_2D,0,0,0,rt,dt,t.RGBA,t.HALF_FLOAT,A0),Wr(),t.useProgram(N.solid.p),t.bindVertexArray(zn),t.drawArrays(t.TRIANGLES,0,nt.n),t.bindBuffer(t.ARRAY_BUFFER,Fn),t.bufferData(t.ARRAY_BUFFER,ut.d.subarray(0,Math.max(1,ut.n)*ve),t.DYNAMIC_DRAW),ut.n&&(t.bindVertexArray(hr),t.drawArrays(t.TRIANGLES,0,ut.n)),t.useProgram(N.grass.p),t.bindVertexArray(sr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,13,M0),t.bindVertexArray(rr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,7,n0-M0),ba&&(t.bindVertexArray(cr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,13,ba)),E0?(t.useProgram(N.water.p),t.bindVertexArray(E0),t.drawArrays(t.TRIANGLE_STRIP,0,Mn)):N.water&&!N.wOK&&N.warm()&&(t.bindVertexArray(N.wVAO),t.scissor(0,0,0,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.scissor(0,0,x,x)),t.useProgram(N.terr.p),t.bindVertexArray(En),t.drawElements(t.TRIANGLES,je.length,t.UNSIGNED_SHORT,0),qr(),t.bindBuffer(t.ARRAY_BUFFER,ga),t.bufferData(t.ARRAY_BUFFER,te.subarray(0,Math.max(1,sa)*Re),t.DYNAMIC_DRAW),t.useProgram(N.spr.p),t.enable(t.SAMPLE_ALPHA_TO_COVERAGE),C0&&(t.bindVertexArray(Pn),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,C0)),t.bindVertexArray(_n),Wo&&t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Wo),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.useProgram(N.sky.p),t.depthMask(!1),t.bindVertexArray(P0),t.drawArrays(t.TRIANGLES,0,3),sa>Wo){t.useProgram(N.spr.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.bindVertexArray(_n),t.bindBuffer(t.ARRAY_BUFFER,ga);for(let o=1;o<=3;o++)t.vertexAttribPointer(o,4,t.FLOAT,!1,Re*4,Wo*Re*4+(o-1)*16);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,sa-Wo);for(let o=1;o<=3;o++)t.vertexAttribPointer(o,4,t.FLOAT,!1,Re*4,(o-1)*16);t.disable(t.BLEND)}{const o=Math.min(oe,oa+Math.ceil((Nt-p0)/(Ko*.9)*(oe-oa)));(o-ao>=Or||o>=oe&&o>ao)&&as(o)}t.depthMask(!0),t.bindVertexArray(null),t.colorMask(!0,!0,!0,!0),t.disable(t.SCISSOR_TEST),!N.wOK&&!N.water&&++N.nd>=6&&N.later()}const x0=1/30;let ra=0;function fs(e,o){Xs(e),vr(e),Ar(e),Er(e,o),Mr(e),Rr(e),I==="Lone tree"&&(Ce(mt,it),Va+=((Kt*.055-$0)*7.5-Va*.9)*e,Ia+=((Gt*.055-ta)*7.5-Ia*.9)*e,$0+=Va*e,ta+=Ia*e),Oo>0&&(Oo=Math.max(0,Oo-e*.8)),Nt+=e}for(let e=0;e<90;e++)fs(x0,!1);return ls(),(e,o)=>{o=Math.min(o||x0,.25),Fr(o),ra+=o;let a=0;for(;ra>=x0-1e-6&&a<5;)fs(x0,!0),ra-=x0,a++;a===5&&(ra=0),Lr(o),ls()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
