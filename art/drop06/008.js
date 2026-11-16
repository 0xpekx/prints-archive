// Windy Meadow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/008.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function($a){$a&&function(){"use strict";const tn=new WeakMap,mo=new Map,As=4,gs=s=>{const t=mo.get(s);return t&&(mo.delete(s),mo.set(s,t)),t},Es=(s,t)=>{for(mo.set(s,t);mo.size>As;)mo.delete(mo.keys().next().value)},Xt=(s,t,p)=>{const R=Math.max(0,Math.min(1,(p-s)/(t-s)));return R*R*(3-2*R)},At=(s,t,p)=>s<t?t:s>p?p:s,at=(s,t,p=0)=>Math.sqrt(s*s+t*t+p*p),tt=s=>{const t=parseInt(s.slice(1),16);return[t>>16&255,t>>8&255,t&255].map(p=>Math.pow(p/255,2.2))},ce=(s,t)=>[s[0]*t,s[1]*t,s[2]*t],pe=(s,t,p)=>[s[0]+(t[0]-s[0])*p,s[1]+(t[1]-s[1])*p,s[2]+(t[2]-s[2])*p],va=`#version 300 es
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
`,ve=va+`
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
`,Ms=ve+`
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
}`,Ss=ve+`
in vec3 vC; out vec4 o;
void main() { o = vec4(tone(vC), 1.); }`,Rs=ve+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aN;
out vec3 vP, vN;
void main() { vP = aPos; vN = aN; gl_Position = uVP * vec4(aPos, 1.); }`,Ts=ve+`
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
}`,xa=ve+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec4 aA;
layout(location=2) in float aS;
out vec3 vP; out vec4 vA; out float vS;
void main() { vP = aPos; vA = aA; vS = aS; gl_Position = uVP * vec4(aPos, 1.); }`,ma=ve+`
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
}`,en=`#version 300 es
layout(location=0) in vec2 aV; out vec2 vN;
void main() { vN = aV; gl_Position = vec4(aV, 1., 1.); }`,ks=ve+`
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
}`,zs=ve+`
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
}`,Fs=va+`
layout(location=0) in vec3 aPos;
void main() { gl_Position = uLS * vec4(aPos, 1.); }`,Cs=`#version 300 es
precision mediump float; out vec4 o; void main() { o = vec4(1.); }`,Ps=va+`
layout(location=0) in vec2 aV;
layout(location=1) in vec4 aP;
layout(location=3) in vec4 aK;
out vec2 vUV; flat out float vCell;
void main() {
  float cs = cos(aK.z), sn = sin(aK.z);
  vec2 o = vec2(aV.x * cs - aV.y * sn, aV.x * sn + aV.y * cs) * aP.w;
  vUV = aV; vCell = aK.w;
  gl_Position = uLS * vec4(aP.xyz + uLX * o.x + uLY * o.y, 1.);
}`,_s=`#version 300 es
precision mediump float; precision mediump sampler2D;
uniform sampler2D uLeaf; in vec2 vUV; flat in float vCell; out vec4 o;
void main() {
  vec2 cuv = (vUV * .5 + .5) * .5 + vec2(mod(vCell, 2.), floor(vCell * .5)) * .5;
  if (texture(uLeaf, cuv).a < .5) discard;
  o = vec4(1.);
}`,Ns=ve+`
layout(location=0) in vec3 aPos;
layout(location=1) in vec3 aN;
layout(location=2) in vec3 aCol;
layout(location=3) in float aM;
out vec3 vP, vN, vCol; flat out float vM;
void main() {
  vec3 P = aPos; float m = aM;
  if (m > 9.5) { float w = m - 10.; w *= w; P.xz += uTree.xy * w; P.y -= dot(uTree.xy, uTree.xy) * w * .12; m = 0.; }
  vP = P; vN = aN; vCol = aCol; vM = m; gl_Position = uVP * vec4(P, 1.);
}`,Ls=ve+`
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
}`,Bs=ve+`
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
}`,Ds=ve+`
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
}`;function Us(s,t,p,R,I,x,S,P,_,k,C,D,O,q,K,nt,V,L,N,G,Q,ot,B){for(let Z=0;Z<p;Z++){const $=R[Z]*D-I[Z]*C,Wt=I[Z]*D+R[Z]*C,ft=x[Z]*q-S[Z]*O,Ot=S[Z]*q+x[Z]*O,Tt=Wt*ft,et=$*Ot,te=(_[Z]*nt-P[Z]*K)*k[Z];s[Z]+=(Tt*L+et*G+te*ot)*B,t[Z]-=(Tt*V+et*N+te*Q)*B}}function Vs(s,t,p,R,I,x,S,P,_,k,C,D,O){for(let q=0;q<P;q++){const K=I[q];for(let nt=0;nt<S;nt++){const V=q*S+nt,L=Math.max(K-t[V]*_,.05);let N=Math.log(L/k)*C-.5,G=((x[V]-s[V]*_)/(D+O*L)+1)*.5*S-.5;G<0?G=0:G>S-1.001&&(G=S-1.001),N<0?N=0:N>P-1.001&&(N=P-1.001);const Q=G|0,ot=N|0,B=G-Q,Z=N-ot,$=ot*S+Q,Wt=(1-B)*(1-Z),ft=B*(1-Z),Ot=(1-B)*Z,Tt=B*Z;p[V]=s[$]*Wt+s[$+1]*ft+s[$+S]*Ot+s[$+S+1]*Tt,R[V]=t[$]*Wt+t[$+1]*ft+t[$+S]*Ot+t[$+S+1]*Tt}}}function Is(s,t,p,R,I,x,S,P,_){for(let k=0;k<x;k++)for(let C=0;C<I;C++){const D=k*I+C,O=C>0?D-1:D,q=C<I-1?D+1:D,K=k>0?D-I:D,nt=k<x-1?D+I:D;p[D]=s[D]+.06*(s[O]+s[q]+s[K]+s[nt]-4*s[D]),R[D]=t[D]+.06*(t[O]+t[q]+t[K]+t[nt]-4*t[D]),p[D]+=(P-p[D])*S,R[D]+=(_-R[D])*S}}function Os(s,t,p,R,I,x,S,P,_,k,C,D){for(let O=0;O<C;O++)for(let q=0;q<k;q++){const K=O*k+q,nt=q<k-1?s[K+1]:s[K],V=q>0?s[K-1]:s[K],L=O<C-1?t[K+k]:t[K],N=O>0?t[K-k]:t[K];p[K]=(nt-V)/(2*I[O])+(L-N)/(2*x[O])}for(let O=0;O<5;O++)for(let q=0;q<2;q++)for(let K=0;K<C;K++){const nt=S[K],V=P[K],L=_[K],N=(K+1)*D+1,G=K*k;for(let Q=K+q&1;Q<k;Q+=2){const ot=N+Q;R[ot]+=(((R[ot-1]+R[ot+1])*nt+(R[ot-D]+R[ot+D])*V-p[G+Q])*L-R[ot])*1.7}}for(let O=0;O<C;O++){const q=.5/I[O],K=.5/x[O],nt=(O+1)*D+1;for(let V=0;V<k;V++){const L=O*k+V,N=nt+V;s[L]-=(R[N+1]-R[N-1])*q,t[L]-=(R[N+D]-R[N-D])*K}}}function Ks(s,t,p,R,I,x,S,P){for(let C=0;C<S;C++){const D=at(s[C],t[C])+1e-5,O=1.3*(1-Math.exp(-D/5))/D;I[C]+=(26*(s[C]*O-p[C])-2.9*I[C])*P,x[C]+=(26*(t[C]*O-R[C])-2.9*x[C])*P,p[C]+=I[C]*P,R[C]+=x[C]*P}}const on=(s,t)=>s.valSide*(6+.08*t+3*Math.sin(t*.035+s.valPh)),s0=(s,t)=>on(s,t)+.8*Math.sin(t*.11+s.valPh2),r0=(s,t)=>{const p=(t-s.pz)*s.pil,R=s.b0+s.b1*t+s.pw*Math.exp(-p*p)+s.tw*Xt(s.tz,s.tz+22,t);return t>s.zE-16?R*Math.sqrt(Math.max(0,1-Xt(s.zE-16,s.zE,t))):R},an=(s,t,p)=>{const R=Math.abs(t-s0(s,p));return p>s.zE?Math.sqrt(R*R+(p-s.zE)*(p-s.zE)):R-r0(s,p)},nn=(s,t,p)=>s.VALLEY&&an(s,t,p)<.3,sn=(s,t,p)=>s.VALLEY&&Math.abs(t-s0(s,p))<(.9+.015*p)*1.25,C0=(s,t)=>{const p=At(t,0,s.wl.length-1.001),R=p|0,I=p-R;return s.wl[R]*(1-I)+s.wl[R+1]*I};function Gs(s,t,p,R){const I=Xt(2,7,p)*(1-Xt(s.zE+6,s.zE+24,p));if(I<=0)return R;const x=s0(s,p),S=Math.abs(t-x),P=r0(s,p),_=5+.05*p,k=p>s.zE?Math.sqrt(S*S+(p-s.zE)*(p-s.zE)):S-P;if(k>=_)return R;let C;if(k<=0){const D=S/P;C=-Math.min(.55,.2+.12*P)*(1-D*D)}else C=(.05+.27*Xt(-.4,.7,Math.sin(p*.11+s.valPh2)*(t>x?1:-1)))*(1-Math.exp(-k/.2))+.035*k;return R+(C0(s,p)+C-R)*(1-Xt(.5,_,k))*I}function rn(s,t,p){const R=Math.sqrt(t*t+p*p),I=s.waves,x=s.farW;let S=0;for(let _=0;_<I.length;_++){const k=I[_];S+=k[4]*Math.sin((t*k[0]+p*k[1])*k[2]+k[3])}let P=S*(.22+1.5*Xt(12,130,R))*(s.RIDGE||s.VALLEY?.55:1);if(R>170){let _=0;for(let k=0;k<x.length;k++){const C=x[k];_+=C[4]*Math.sin((t*C[0]+p*C[1])*C[2]+C[3])}P+=(_*13+16+Math.abs(_)*9)*Xt(170,800,R)}if(s.RIDGE){const _=p-(50+5*Math.sin(t*.035+s.ridgePh)+2*Math.sin(t*.09));P+=_<0?5.2*Math.exp(-(_/17)*(_/17)):12.2*Math.exp(-(_/30)*(_/30))-7}if(s.VALLEY){const _=on(s,p),k=8+.3*Math.max(p,0);P-=6*Math.exp(-((t-_)/k)*((t-_)/k))*Xt(-8,12,p);const C=(t-s0(s,p))/(1.44+.024*p);P-=.5*Math.exp(-C*C)*Xt(-2,6,p)}return P}const c0=(s,t,p)=>{let R=rn(s,t,p);const I=t-s.mx,x=p-s.mz;return R+=s.mh*Math.exp(-(I*I+x*x)/(s.mr*s.mr)),s.wl?Gs(s,t,p,R):R};function Ws(s,t,p,R,I,x){let S=0;for(const P of s){if(P===x)continue;const _=P[0]-t[0],k=P[1]-t[1],C=P[2]-t[2],D=_*p+k*R+C*I;if(D<=0)continue;const O=_*_+k*k+C*C-D*D,q=P[4]*P[4];O<q&&(S+=Math.sqrt(q-O)*Math.min(1,D/P[4]))}return S}function qs(s,t,p,R,I,x){for(let S=0;S<R;S++){const P=I*Math.exp(S/(R-1)*x),_=.75*P+8;for(let k=0;k<p;k++)t[S*p+k]=c0(s,(k/(p-1)*2-1)*_,P)}}function Hs(s,t,p,R,I,x){for(let S=0;S<R;S++){const P=S/(R-1),_=.6*Math.pow(3200/.6,P),k=2.5+.56*_;for(let C=0;C<p;C++){const D=(C/(p-1)*2-1)*k,O=(S*p+C)*6;t[O]=D,t[O+1]=x?I[S*p+C]:c0(s,D,_),t[O+2]=_,x||(I[S*p+C]=t[O+1])}}for(let S=0;S<R;S++)for(let P=0;P<p;P++){const _=(S*p+P)*6,k=(S*p+Math.max(0,P-1))*6,C=(S*p+Math.min(p-1,P+1))*6,D=(Math.max(0,S-1)*p+P)*6,O=(Math.min(R-1,S+1)*p+P)*6,q=t[C]-t[k],K=t[C+1]-t[k+1],nt=t[C+2]-t[k+2],V=t[O]-t[D],L=t[O+1]-t[D+1],N=t[O+2]-t[D+2];let G=L*nt-N*K,Q=N*q-V*nt,ot=V*K-L*q;Q<0&&(G=-G,Q=-Q,ot=-ot);const B=at(G,Q,ot)||1;t[_+3]=G/B,t[_+4]=Q/B,t[_+5]=ot/B}}function Xs(s,t,p,R,I,x,S,P,_,k){let C=0;const D=s.VALLEY?700:0;let O=s.valPh*1e6|0;const q=()=>(O=Math.imul(O,1664525)+1013904223|0,(O>>>8)/16777216);for(let K=0;K<R;K++){const nt=(K+t())/R;let V=(I*Math.exp(nt*P)-x)/S,L=0,N=0,G=0;for(let $=0;$<4&&(L=(t()*2-1)*(.41*V+.35),!!sn(s,L,V));$++);if(s.VALLEY&&V>7){const $=K>=R-D,Wt=q(),ft=q()<.5?-1:1,Ot=q(),Tt=q();G=q(),$&&(V=78+(s.zE+4-78)*Tt);const et=Math.sin(V*.37+ft*1.7+s.valPh)*Math.sin(V*.083+ft+s.valPh2)+.5*Math.sin(V*1.3+ft*4);($||Wt<.13&&et>.1)&&(L=s0(s,V)+ft*(r0(s,V)+(Ot*Ot*1.1-.2)*($?1.5:.8)),N=$&&et<.05?2:1)}const Q=c0(s,L,V),ot=.75+.5*Math.sin(L*.31+V*.23+_)*Math.sin(L*.13-V*.37);let B=(.3+.42*Math.pow(t(),1.4))*ot*k;N?B=N>1?0:(.3+.75*G*G+.6*B)*(V>78?1.15:1):nn(s,L,V)?B=0:s.VALLEY&&an(s,L,V)<1.1&&(B*=.62);const Z=K*8;p[Z]=L,p[Z+1]=Q-.03,p[Z+2]=V,p[Z+3]=B,p[Z+4]=(x+S*V)*(.7+.6*t())*(N?V>78?.55:1.3:1),p[Z+5]=t()*6.283,p[Z+6]=t(),p[Z+7]=t(),V<10&&(C=K+1)}return C}const Ys=(s,t)=>ba(s,cn(s,t));function cn(s,t){const p=(I,x)=>{const S=s.createShader(I);return s.shaderSource(S,x),s.compileShader(S),S},R={};for(const I in t){const[x,S]=t[I],P=s.createProgram(),_=p(s.VERTEX_SHADER,x),k=p(s.FRAGMENT_SHADER,S.replace(`#version 300 es
`,`#version 300 es
#define FRAG 1
`));s.attachShader(P,_),s.attachShader(P,k),s.linkProgram(P),R[I]={p:P,v:_,fr:k,u:{}}}return R}function ba(s,t){for(const p in t){const R=t[p];if(!s.getProgramParameter(R.p,s.LINK_STATUS)){const x=s.getShaderInfoLog(R.v)||s.getShaderInfoLog(R.fr)||s.getProgramInfoLog(R.p);throw new Error("Windward "+p+": "+x)}const I=s.getUniformBlockIndex(R.p,"Env");I!==s.INVALID_INDEX&&s.uniformBlockBinding(R.p,I,0),s.useProgram(R.p),[["uNoise",0],["uWind",1],["uSkyB",2],["uLeaf",3],["uShd",4],["uSkyC",5]].forEach(([x,S])=>{const P=s.getUniformLocation(R.p,x);P&&s.uniform1i(P,S)})}return t}function js(s,t){let p=tn.get(s);if(p)return t&&!p.wOK&&(p.water||p.later(),ba(s,{water:p.water}),p.wOK=!0),p;const R={grass:[Ms,Ss],terr:[Rs,Ts],skyb:[en,ks],sky:[en,zs],solid:[Ns,Ls],spr:[Bs,Ds],shd:[Fs,Cs],shdl:[Ps,_s]};t&&(R.water=[xa,ma]),p=Ys(s,R),p.wOK=!!t,p.nd=0,p.later=()=>{p.water||(p.par=s.getExtension("KHR_parallel_shader_compile"),p.water=p.pw?S(p.pw):cn(s,{water:[xa,ma]}).water,p.pw=null,s.flush())};const I=(L,N)=>{const G=s.createShader(L);return s.shaderSource(G,N),s.compileShader(G),G},x=()=>I(s.FRAGMENT_SHADER,ma.replace(`#version 300 es
`,`#version 300 es
#define FRAG 1
`)),S=L=>(L.fr||(L.fr=x()),s.attachShader(L.p,L.v),s.attachShader(L.p,L.fr),s.linkProgram(L.p),L);p.pre=L=>{if(!p.water){if(!L)p.pw={p:s.createProgram(),v:I(s.VERTEX_SHADER,xa),fr:null,u:{}};else if(p.pw&&!p.pw.fr)p.pw.fr=x();else return;s.flush()}},p.warm=()=>(p.par?!s.getProgramParameter(p.water.p,p.par.COMPLETION_STATUS_KHR):++p.nd<36)?!1:(ba(s,{water:p.water}),p.wOK=!0,p.wVAO=p.wVAO||s.createVertexArray(),!0);const P=256;let _=625341585;const k=()=>(_^=_<<13,_^=_>>>17,_^=_<<5,(_>>>0)/4294967296),C=L=>{const N=new Float32Array(L*L);for(let G=0;G<N.length;G++)N[G]=k();return N},D=L=>{const N=L.map(C),G=new Float32Array(P*P);let Q=1,ot=0;L.forEach((B,Z)=>{const $=N[Z],Wt=B/P;for(let ft=0;ft<P;ft++){const Ot=ft*Wt,Tt=Math.floor(Ot),et=Ot-Tt,te=et*et*(3-2*et),Ie=Tt%B*B,Oe=(Tt+1)%B*B;for(let Ce=0;Ce<P;Ce++){const Qe=Ce*Wt,Pe=Math.floor(Qe),ee=Qe-Pe,_e=ee*ee*(3-2*ee),Lo=Pe%B,Bo=(Pe+1)%B,Ze=($[Ie+Lo]*(1-_e)+$[Ie+Bo]*_e)*(1-te)+($[Oe+Lo]*(1-_e)+$[Oe+Bo]*_e)*te;G[ft*P+Ce]+=Ze*Q}}ot+=Q,Q*=.5});for(let B=0;B<G.length;B++)G[B]=At((G[B]/ot-.5)*2.3+.5,0,1);return G},O=D([4,8,16,32,64]),q=D([8,16,32,64,128]),K=D([16,32,64,128]),nt=new Uint8Array(P*P*4);for(let L=0;L<P*P;L++)nt[L*4]=O[L]*255,nt[L*4+1]=q[L]*255,nt[L*4+2]=K[L]*255,nt[L*4+3]=k()*255;p.noise=s.createTexture(),s.bindTexture(s.TEXTURE_2D,p.noise),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,P,P,0,s.RGBA,s.UNSIGNED_BYTE,nt),s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR_MIPMAP_LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.REPEAT),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.REPEAT);{const N=new Uint8Array(65536);for(let G=0;G<4;G++){const Q=G%2*64,ot=(G>>1)*64,B=13+G*2;for(let Z=0;Z<B;Z++){const $=Math.sqrt(k())*.62,Wt=k()*6.283,ft=Math.cos(Wt)*$,Ot=Math.sin(Wt)*$,Tt=Wt+(k()-.5)*1.3+($<.15?k()*6.283:0),et=.3+k()*.16,te=.11+k()*.07,Ie=Math.cos(Tt),Oe=Math.sin(Tt),Ce=.55+k()*.45,Qe=k(),Pe=ft-Ie*et*.5,ee=Ot-Oe*et*.5,_e=Math.max(0,Math.floor((ft-et*.6-te+1)*32)),Lo=Math.min(64,Math.ceil((ft+et*.6+te+1)*32)),Bo=Math.max(0,Math.floor((Ot-et*.6-te+1)*32)),Ze=Math.min(64,Math.ceil((Ot+et*.6+te+1)*32));for(let Je=Bo;Je<Ze;Je++)for(let $e=_e;$e<Lo;$e++){const l0=($e+.5)/32-1,i0=(Je+.5)/32-1,W=l0-Pe,xe=i0-ee,bo=(W*Ie+xe*Oe)/et,zt=-W*Oe+xe*Ie;if(bo<-.05||bo>1.05)continue;const yt=te*.5*Math.pow(Math.max(0,Math.sin(Math.PI*Math.min(1,Math.max(0,bo)))),.8)*(1-.25*bo),dt=Math.min(1,Math.max(0,(yt-Math.abs(zt))*32+.5));if(dt<=0)continue;const Pt=((ot+Je)*128+Q+$e)*4,Ke=1-.3*Math.exp(-(zt/.012)*(zt/.012)),ge=dt;N[Pt]=N[Pt]*(1-ge)+255*Ce*Ke*(.85+.15*bo)*ge,N[Pt+1]=N[Pt+1]*(1-ge)+255*Qe*ge,N[Pt+2]=N[Pt+2]*(1-ge)+255*Math.min(1,Math.abs(zt)/(yt+.001))*ge,N[Pt+3]=Math.max(N[Pt+3],255*dt)}}}p.leaf=s.createTexture(),s.bindTexture(s.TEXTURE_2D,p.leaf),s.texImage2D(s.TEXTURE_2D,0,s.RGBA8,128,128,0,s.RGBA,s.UNSIGNED_BYTE,N),s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR_MIPMAP_LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}const V=L=>{const N=[];for(let G=0;G<L;G++){const Q=Math.pow(G/L,.9);N.push(Q,-1,Q,1)}return N.push(1,0),new Float32Array(N)};return p.tplN=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,p.tplN),s.bufferData(s.ARRAY_BUFFER,V(6),s.STATIC_DRAW),p.tplF=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,p.tplF),s.bufferData(s.ARRAY_BUFFER,V(3),s.STATIC_DRAW),p.quad=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,p.quad),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),s.STATIC_DRAW),p.tri=s.createBuffer(),s.bindBuffer(s.ARRAY_BUFFER,p.tri),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW),tn.set(s,p),p}$a.add({num:8,name:"Windy Meadow",fam:"Worlds",recipe:"A meadow on rolling hills, and you're the wind. The air really flows, so the grass, seeds, birds, flags and chimes all react to it. The season, sky, land, flowers and birds change every mint. Drag to blow a gust, hold in the sky to build a big one and let go, or tap to toss a handful of seeds.",interactive:"Drag across the field to blow a gust along your stroke; hold in the sky to gather a big gust and let go to send it rolling in from the horizon; hold on the grass and let go for a burst; tap to cast a handful of seeds. Where there is a stream, your gusts ruffle its water.",music:!0,gl:!0,fps:30,seed:0,make(s){const t=s.gl,p=s.size,R=s.hash.slice(2),I=e=>{let o=parseInt(R.slice(e,e+8),16)>>>0,a=parseInt(R.slice(e+8,e+16),16)>>>0,n=parseInt(R.slice(e+16,e+24),16)>>>0,c=parseInt(R.slice(e+24,e+32),16)>>>0;const i=()=>{o>>>=0,a>>>=0,n>>>=0,c>>>=0;let l=o+a|0;return o=a^a>>>9,a=n+(n<<3)|0,n=n<<21|n>>>11,c=c+1|0,l=l+c|0,n=n+l|0,(l>>>0)/4294967296};for(let l=0;l<15;l++)i();return i.st=()=>[o,a,n,c],i.ld=l=>{o=l[0],a=l[1],n=l[2],c=l[3]},i},x=I(0),S=I(32),P=s.hash+(s.home?"h":""),_=gs(P),k=_?null:{},C=e=>{let o=0;for(const n of e)o+=n[1];let a=x()*o;for(const n of e)if(a-=n[1],a<=0)return n[0];return e[e.length-1][0]};let D=C([["Spring green",34],["Summer gold",34],["Autumn rust",23],["Silver frost",9]]),O=C([["Morning haze",30],["Golden hour",34],["Storm light",26],["Aurora night",10]]),q=C([["Gentle swells",38],["A long ridge",34],["Stream valley",28]]),K=C([["Lone tree",36],["Standing stones",24],["Weathered shelter",22],["Tethered kite",18]]),nt=C([["Meadow mix",34],["Poppies",24],["Cornflower and daisy",24],["Sparse",18]]),V=C([["Dandelion seeds",52],["Petals",30],["Fireflies",18]]),L=C([["Gusty",44],["Calm",30],["Steady",26]]),N=C([["Swifts",30],["Rooks",24],["Hovering kestrel",20],["None",26]]),G=C([["Major pentatonic",38],["Minor pentatonic",32],["Lydian",20],["Whole-tone",10]]);s.home&&(D="Summer gold",O="Golden hour",q="A long ridge",K="Lone tree",nt="Meadow mix",V="Dandelion seeds",L="Gusty",N="Swifts",G="Major pentatonic"),N==="Hovering kestrel"&&(N="None");const Q=O==="Aurora night";V==="Fireflies"&&(O==="Morning haze"||O==="Storm light")&&(V="Dandelion seeds"),Q&&V==="Dandelion seeds"&&(V="Glowing seeds"),Q&&N!=="None"&&(N="None"),D==="Silver frost"&&V==="Fireflies"&&(V="Glowing seeds");const ot=V==="Dandelion seeds"||V==="Glowing seeds";s.trait("Season",D),s.trait("Sky",O),s.trait("Land",q),s.trait("Landmark",K);const B=js(t,q==="Stream valley"),Z=I(16);let $=(()=>{const e=Z()*100;return e<58?"Standing":e<84?"Lying in the grass":"Up on a rise"})();(s.home||$==="Lying in the grass"&&q==="Stream valley")&&($="Standing");let Wt=!s.home&&Z()<.3;s.trait("Flowers",nt),s.trait("Drifting",V),s.trait("View",Wt?$+", by the flag line":$),s.trait("Birds",N),s.trait("Wind and chimes",L+", "+G);const ft={"Spring green":{g0:"#16300c",g1:"#3f7a22",g2:"#94c447",g3:"#c9da62",stem:"#4c8a2a",soil:"#33361a",leaf:["#5a8e34","#73a042","#4a7e30"],gk:[.55,.9,.35,0]},"Summer gold":{g0:"#3a3512",g1:"#9a8434",g2:"#eccb72",g3:"#b9b452",stem:"#7b8a34",soil:"#5a4a26",leaf:["#4d6a2e","#6a7a36","#3f5a2a","#7a7a3a"],gk:[.6,1,.4,0]},"Autumn rust":{g0:"#2e1a0c",g1:"#7e4520",g2:"#d68f4c",g3:"#a87a3a",stem:"#6a5a2a",soil:"#3a2a18",leaf:["#c0602a","#d8962f","#a8402a"],gk:[.55,.95,.35,0]},"Silver frost":{g0:"#26363b",g1:"#71878e",g2:"#e2edf2",g3:"#aabdca",stem:"#6c8288",soil:"#5c6468",leaf:["#cfdde4"],gk:[.7,.55,.6,1]}}[D],Ot={"Golden hour":{el:8.5,az:-7,sun:[3.3,2.15,1.05],amb:[.3,.32,.44],top:"#2c4c88",hor:"#f4bd86",horK:1.1,glow:[1.5,.82,.36],fog:"#d8ad84",fogD:.0016,fogB:.012,fogP:10,cov:.56,soft:.2,sh:.6,cl:"#ffc48a",clK:1.4,cd:"#6a5a7c",cdK:1,disc:.99982,grade:[.02,.01,.035],exp:1,tone:[1.08,.3]},"Morning haze":{el:21,az:-58,sun:[2.6,2.42,2.1],amb:[.4,.48,.6],top:"#5e8fcb",hor:"#dde4e7",horK:1.05,glow:[.95,.85,.62],fog:"#d3dbe0",fogD:.0038,fogB:.02,fogP:4,cov:.6,soft:.25,sh:.45,cl:"#ffffff",clK:1.15,cd:"#a2adbf",cdK:1,disc:.99985,grade:[.01,.015,.03],exp:.95,tone:[1,.15]},"Storm light":{el:15,az:24,sun:[3.6,3,2],amb:[.17,.2,.25],top:"#262c37",hor:"#7c8389",horK:1,glow:[1,.85,.5],fog:"#69727a",fogD:.0024,fogB:.015,fogP:6,cov:.4,soft:.2,sh:.93,cl:"#bdb9ab",clK:1,cd:"#2a3657",cdK:1,disc:.99985,grade:[0,.01,.025],exp:1.05,tone:[.82,.32]},"Aurora night":{el:14,az:-13,sun:[.28,.36,.58],amb:[.032,.055,.09],top:"#03060f",hor:"#0e1f2e",horK:1,glow:[.015,.022,.036],fog:"#0d1a27",fogD:.0013,fogB:.012,fogP:8,cov:.82,soft:.2,sh:.4,cl:"#1e2a3e",clK:1,cd:"#08101c",cdK:1,disc:.99993,grade:[.004,.01,.025],exp:1,tone:[.68,.2]}}[O],Tt={"Meadow mix":{n:760,types:[[0,"#f4f1e6",30],[1,"#f2c21c",26],[4,"#d68ab0",16],[3,"#6a5ad0",14],[2,"#e2442a",8]]},Poppies:{n:820,types:[[2,"#d8301c",70],[2,"#e8582a",14],[0,"#f4f1e6",16]]},"Cornflower and daisy":{n:780,types:[[3,"#3d63dc",50],[0,"#f4f1e6",44],[4,"#c08ad8",6]]},Sparse:{n:220,types:[[1,"#f2c21c",50],[0,"#f4f1e6",50]]}}[nt],et=x()<.5?-1:1,te=[],Ie=[];for(let e=0;e<5;e++){const o=x()*6.283,a=30+x()*60;te.push([Math.cos(o),Math.sin(o),6.283/a,x()*6.283,.35+x()*.5])}for(let e=0;e<6;e++){const o=x()*6.283,a=260+x()*800;Ie.push([Math.cos(o),Math.sin(o),6.283/a,x()*6.283,.4+x()*.6])}const Oe=x()*6.283,Ce=x()*6.283,Qe=x()*6.283,Pe=q==="A long ridge",ee=q==="Stream valley",_e=et,Lo=e=>50+5*Math.sin(e*.035+Oe)+2*Math.sin(e*.09),Bo=e=>_e*(6+.08*e+3*Math.sin(e*.035+Ce)),Ze=e=>Bo(e)+.8*Math.sin(e*.11+Qe);let Je=0,$e=-999,l0=0,i0=9;const W={waves:te,farW:Ie,RIDGE:Pe,VALLEY:ee,ridgePh:Oe,valSide:_e,valPh:Ce,valPh2:Qe,mx:Je,mz:$e,mh:l0,mr:i0,wl:null},xe=I(24);W.b0=.75+.3*xe(),W.b1=.005,W.pz=26+30*xe(),W.pw=xe()<.7?1.2+1.8*xe():xe()*0,W.pil=1/(5+5*xe()),W.zE=118+48*xe(),W.tz=W.zE-60-22*xe(),W.tw=5+6*xe();const bo=(e,o)=>rn(W,e,o),zt=(e,o)=>c0(W,e,o);let yt,dt;if(Pe)yt=et*(8+x()*4),dt=Lo(yt)-1;else if(ee)dt=38+x()*10,yt=-et*(.15+x()*.2)*.384*dt;else{dt=36+x()*14,yt=et*(.3+x()*.2)*.384*dt;let e=-1e9,o=yt,a=dt;for(let n=0;n<40;n++){const c=yt+(x()-.5)*12,i=dt+(x()-.5)*12,l=bo(c,i)-Math.abs(c/(.384*i)-et*.4)*2;l>e&&(e=l,o=c,a=i)}yt=o,dt=a}if(Je=yt,$e=dt,l0=Pe?.6:1.4,i0=8,W.mx=Je,W.mz=$e,W.mh=l0,W.mr=i0,ee&&_)W.wl=_.wl;else if(ee){const e=Math.ceil(W.zE)+28,o=new Float32Array(e);for(let n=0;n<e;n++){const c=Ze(n),i=r0(W,n)+3+.03*n;let l=1e9;for(let d=-4;d<=4;d++)l=Math.min(l,c0(W,c+d/4*i,n));o[n]=l-.12}for(let n=0;n<9;n++)o[n]=o[9];for(let n=10;n<e;n++)o[n]=Math.min(o[n],o[n-1]);const a=o[Math.ceil(W.zE)+4];for(let n=0;n<e;n++)o[n]+=(a-o[n])*Xt(W.tz-16,W.tz-2,n);for(let n=0;n<4;n++){let c=o[0];for(let i=1;i<e-1;i++){const l=o[i];o[i]=(c+2*l+o[i+1])/4,c=l}}W.wl=o,k.wl=o}const Pt=zt(yt,dt),Ke=48,ge=96,P0=.5,ln=Math.log(260/P0),wo=new Float32Array(Ke*ge);_?wo.set(_.hl):(qs(W,wo,Ke,ge,P0,ln),k.hl=wo.slice());const Do=(e,o)=>{if(o<P0||o>259)return zt(e,o);const a=Math.log(o/P0)/ln*(ge-1),n=(e/(.75*o+8)+1)*.5*(Ke-1);if(n<0||n>Ke-1.001)return zt(e,o);const c=n|0,i=Math.min(ge-2,a|0),l=n-c,d=a-i,f=i*Ke+c;return(wo[f]*(1-l)+wo[f+1]*l)*(1-d)+(wo[f+Ke]*(1-l)+wo[f+Ke+1]*l)*d},f0=((Pe?3.4:ee?.6:2.6)+($==="Lying in the grass"?5.5:$==="Up on a rise"?-6:0))*Math.PI/180,Uo=Math.tan(21*Math.PI/180),wa=1/Uo,ht=[0,zt(0,1.5)+($==="Lying in the grass"?.42:$==="Up on a rise"?3.4:1.3),0],yo=[0,Math.sin(f0),Math.cos(f0)],Ne=[1,0,0],Le=[0,Math.cos(f0),-Math.sin(f0)],oe=new Float32Array(16);{const a=[wa,0,0,0,0,wa,0,0,0,0,-1.0001250078129884,-1,0,0,-.500031251953247,0],n=[-yo[0],-yo[1],-yo[2]],c=[Ne[0],Le[0],n[0],0,Ne[1],Le[1],n[1],0,Ne[2],Le[2],n[2],0,-(Ne[0]*ht[0]+Ne[1]*ht[1]+Ne[2]*ht[2]),-(Le[0]*ht[0]+Le[1]*ht[1]+Le[2]*ht[2]),-(n[0]*ht[0]+n[1]*ht[1]+n[2]*ht[2]),1];for(let i=0;i<4;i++)for(let l=0;l<4;l++){let d=0;for(let f=0;f<4;f++)d+=a[f*4+l]*c[i*4+f];oe[i*4+l]=d}}const ac=(e,o,a)=>{const n=oe[0]*e+oe[4]*o+oe[8]*a+oe[12],c=oe[1]*e+oe[5]*o+oe[9]*a+oe[13],i=oe[3]*e+oe[7]*o+oe[11]*a+oe[15];return[n/i,c/i,i]},ya=Ot.el*Math.PI/180,fn=Ot.az*et*Math.PI/180,Ee=[Math.sin(fn)*Math.cos(ya),Math.sin(ya),Math.cos(fn)*Math.cos(ya)],ct=28,xt=48,gt=ct*xt,u0=2.5,Qs=95,d0=Math.log(Qs/u0),h0=1.6,p0=.56,Vo=new Float32Array(xt),_0=new Float32Array(xt),N0=new Float32Array(xt),Io=new Float32Array(gt);for(let e=0;e<xt;e++){const o=u0*Math.exp((e+.5)/xt*d0),a=h0+p0*o;Vo[e]=o,_0[e]=2*a/ct,N0[e]=o*d0/xt;for(let n=0;n<ct;n++)Io[e*ct+n]=((n+.5)/ct*2-1)*a}let Et=new Float32Array(gt),Mt=new Float32Array(gt),Ao=new Float32Array(gt),go=new Float32Array(gt);const un=new Float32Array(gt),Aa=new Float32Array(gt),ga=new Float32Array(gt),Ea=new Float32Array(gt),Ma=new Float32Array(gt);let Eo=0,Mo=0;const Zs=(e,o)=>{const a=Math.max(o,.05);Mo=Math.log(a/u0)/d0*xt-.5,Eo=(e/(h0+p0*a)+1)*.5*ct-.5},dn=(e,o,a)=>{o<0?o=0:o>ct-1.001&&(o=ct-1.001),a<0?a=0:a>xt-1.001&&(a=xt-1.001);const n=o|0,c=a|0,i=o-n,l=a-c,d=c*ct+n;return(e[d]*(1-i)+e[d+1]*i)*(1-l)+(e[d+ct]*(1-i)+e[d+ct+1]*i)*l};let Ut=0,Vt=0;const Be=(e,o)=>{Zs(e,o);const a=Math.max(-Eo/3,(Eo-ct+1)/3,-Mo/3,(Mo-xt+1)/6,0),n=Math.min(1,a);Ut=dn(Et,Eo,Mo)*(1-n)+Ge*n,Vt=dn(Mt,Eo,Mo)*(1-n)+We*n},me={Calm:{base:.9,gS:3.6,gI:[6,11],turb:.35,tau:2.2},Gusty:{base:1.8,gS:7.5,gI:[2.4,5],turb:.8,tau:3},Steady:{base:4.4,gS:3.8,gI:[4,7],turb:.5,tau:3.2}}[L],hn=(x()<.5?0:Math.PI)+(x()-.5)*.9+(x()<.25?-Math.PI/2*.7:0);let to=Math.cos(hn),Oo=Math.sin(hn);s.home&&(to=Math.cos(.6),Oo=Math.sin(.6));let Ge=to*me.base,We=Oo*me.base;for(let e=0;e<gt;e++)Et[e]=Ge,Mt[e]=We;const Ko=[.43,.21],Go=[-.17,.37],Wo=[1.3,-.9],Sa=[x()*6.28,x()*6.28,x()*6.28],pn=new Float32Array(gt),vn=new Float32Array(gt),xn=new Float32Array(gt),mn=new Float32Array(gt),bn=new Float32Array(gt),wn=new Float32Array(gt),yn=new Float32Array(gt);for(let e=0;e<xt;e++)for(let o=0;o<ct;o++){const a=e*ct+o,n=Io[a],c=Vo[e],i=(n*Ko[0]+c*Ko[1])*.6+Sa[0],l=(n*Go[0]+c*Go[1])*.6+Sa[1],d=n*Wo[0]+c*Wo[1]+Sa[2];pn[a]=Math.sin(i),vn[a]=Math.cos(i),xn[a]=Math.sin(l),mn[a]=Math.cos(l),bn[a]=Math.sin(d),wn[a]=Math.cos(d),yn[a]=.25*(c<20?1:.4)}const An=(Ge*Ko[0]+We*Ko[1])*.9*.6,gn=(Ge*Go[0]+We*Go[1])*.9*.6,En=.7-(Ge*Wo[0]+We*Wo[1])*.9,Mn=ct+2,Sn=new Float32Array(Mn*(xt+2)),Ra=new Float32Array(xt),Ta=new Float32Array(xt),Rn=new Float32Array(xt),Js=xt/d0;for(let e=0;e<xt;e++)Ra[e]=1/(_0[e]*_0[e]),Ta[e]=1/(N0[e]*N0[e]),Rn[e]=1/(2*Ra[e]+2*Ta[e]);const De=[];let Ft=0,L0=.4+x()*1.5;const $s=e=>1.3*(1-Math.exp(-e/5));function tr(){const e=me.gS*(.6+.7*S()),o=to+(S()-.5)*.5,a=Oo+(S()-.5)*.5,n=at(o,a),c=o/n,i=a/n,l=(S()-.5)*30,d=25+S()*30;De.push({ring:!1,ox:l-c*75,oz:d-i*75,ux:c,uz:i,s:0,U:3+e*.9,S:e+me.base,Wd:14+S()*22,T:3+S()*3,len:150,lat:0,ph:S()*6.28})}function er(e){for(let o=De.length-1;o>=0;o--){const a=De[o];if(a.s+=a.U*e,a.ring,a.s>a.len){De.splice(o,1);continue}const n=a.ring?1-a.s/a.len:Xt(0,10,a.s)*Xt(a.len,a.len-20,a.s),c=a.ring?a.S*n:a.S,i=1/(c+1e-4);for(let l=0;l<xt;l++){const d=Vo[l],f=h0+p0*d;let A=-f,r=f;if(a.ring){const u=a.s+2.5*a.T,b=u*u-(d-a.oz)*(d-a.oz);if(b<=0)continue;const g=Math.sqrt(b);A=a.ox-g,r=a.ox+g}else if(Math.abs(a.ux)>.001){const u=a.s-(d-a.oz)*a.uz,b=2.5*a.T;let g=a.ox+(u-b)/a.ux,y=a.ox+(u+b)/a.ux;if(g>y){const m=g;g=y,y=m}A=g,r=y}const h=Math.max(0,Math.floor((A/f+1)*.5*ct-.5)),v=Math.min(ct-1,Math.ceil((r/f+1)*.5*ct-.5));for(let u=h;u<=v;u++){const b=l*ct+u,g=Io[b];let y,m,w;if(a.ring){const T=g-a.ox,F=d-a.oz,E=Math.sqrt(T*T+F*F)+.001,z=(E-a.s)/a.T;if(z>2.5||z<-2.5)continue;w=Math.exp(-z*z),y=T/E*a.S*n,m=F/E*a.S*n}else{const T=g-a.ox,F=d-a.oz,E=(T*a.ux+F*a.uz-a.s)/a.T;if(E>2.5||E<-2.5)continue;const z=(-T*a.uz+F*a.ux-a.lat)/a.Wd;if(z>2.5||z<-2.5)continue;w=Math.exp(-E*E-z*z)*(.6+.4*Math.sin(z*2.3+a.ph))*n,y=a.ux*a.S,m=a.uz*a.S}const M=Math.min(1,w*e*5);(Et[b]*y+Mt[b]*m)*i<c&&(Et[b]+=(y-Et[b])*M,Mt[b]+=(m-Mt[b])*M)}}}}function or(e){Ft>=L0&&(tr(),L0=Ft+me.gI[0]+S()*(me.gI[1]-me.gI[0])),er(e);const o=Ft,a=me.turb*(1+.3*Math.sin(o*.21)),n=a*e*3,c=Math.sin(An*o),i=Math.cos(An*o),l=Math.sin(gn*o),d=Math.cos(gn*o),f=Math.sin(En*o),A=Math.cos(En*o),r=Ko[0]*.6,h=Ko[1]*.6,v=Go[0]*.6,u=Go[1]*.6;Us(Et,Mt,gt,pn,vn,xn,mn,bn,wn,yn,c,i,l,d,f,A,r,h,v,u,Wo[0],Wo[1],n),Vs(Et,Mt,Ao,go,Vo,Io,ct,xt,e,u0,Js,h0,p0);let b=Et;Et=Ao,Ao=b,b=Mt,Mt=go,go=b;const g=1-Math.exp(-e/me.tau);Is(Et,Mt,Ao,go,ct,xt,g,Ge,We),b=Et,Et=Ao,Ao=b,b=Mt,Mt=go,go=b,Os(Et,Mt,un,Sn,_0,N0,Ra,Ta,Rn,ct,xt,Mn),Ks(Et,Mt,Aa,ga,Ea,Ma,gt,e)}const So=(e,o)=>{const a=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,e,o||t.STATIC_DRAW),a},ar=[0,1].map(()=>{const e=t.createTexture();return t.bindTexture(t.TEXTURE_2D,e),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,ct,xt,0,t.RGBA,t.HALF_FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),e});let Tn=0;const B0=new Uint16Array(gt*4),ka=e=>{const o=e>>>16&32768,a=(e>>>23&255)-112;return a<=0?o:a>30?o|31743:o|a<<10|e>>>13&1023},nr=new Uint32Array(Aa.buffer),sr=new Uint32Array(ga.buffer),kn=new Float32Array(gt),rr=new Uint32Array(kn.buffer),qe=112,v0=168,zn=new Float32Array(qe*v0*6);k&&(k.tY=new Float32Array(qe*v0)),Hs(W,zn,qe,v0,_?_.tY:k.tY,!!_);const eo=new Uint16Array((qe-1)*(v0-1)*6);{let e=0;for(let o=0;o<v0-1;o++)for(let a=0;a<qe-1;a++){const n=o*qe+a;eo[e++]=n,eo[e++]=n+1,eo[e++]=n+qe,eo[e++]=n+1,eo[e++]=n+qe+1,eo[e++]=n+qe}}const Fn=t.createVertexArray();t.bindVertexArray(Fn),So(zn),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,24,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,24,12);const cr=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,cr),t.bufferData(t.ELEMENT_ARRAY_BUFFER,eo,t.STATIC_DRAW),t.bindVertexArray(null);let D0=null,Cn=0;if(ee){const e=[],o=W.zE-16;for(let c=0;c<118;c++)e.push(3*Math.pow(o/3,c/117));for(let c=1;c<=12;c++)e.push(o+16*Math.sin(c/12*Math.PI/2));const a=new Float32Array(e.length*16),n=new Float32Array(e.length);e.forEach((c,i)=>{const l=Ze(c),d=r0(W,c),f=C0(W,c),A=at(l,c),r=l/A,h=c/A,v=2*d+5;let u=0;for(let y=0;y<26;y++){const m=v*Math.pow(2600/v,y/25);u=Math.max(u,(zt(l+r*m,c+h*m)-f)/m)}n[i]=u;const b=Ze(c+.5)-Ze(c-.5),g=(C0(W,c-2)-C0(W,c+2))/4;for(let y=0;y<2;y++){const m=y*2-1,w=(i*2+y)*8;a[w]=l+m*d,a[w+1]=f,a[w+2]=c,a[w+3]=m,a[w+4]=d,a[w+5]=u,a[w+6]=b,a[w+7]=g}});for(let c=0;c<3;c++){let i=n[0];for(let l=1;l<n.length-1;l++){const d=n[l];n[l]=(i+2*d+n[l+1])/4,i=d}}for(let c=0;c<n.length;c++)a[c*16+5]=a[c*16+13]=n[c];Cn=e.length*2,D0=t.createVertexArray(),t.bindVertexArray(D0),So(a),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,32,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,1,t.FLOAT,!1,32,28),t.bindVertexArray(null)}const qo=17e3,lr=1.5,ir=80,Ro=.0048,To=.0017,Ho=Ro+To*lr,fr=Ro+To*ir,ur=Math.log(fr/Ho),dr=x()*100,za=(e,o)=>sn(W,e,o),Fa=(e,o)=>nn(W,e,o),Ca=ft===void 0?1:D==="Silver frost"?.8:D==="Spring green"?.9:1.05,Me=[];{const e=Math.max(4,Math.round(Tt.n/50));for(let o=0;o<e;o++){const a=x(),n=(Ho*Math.exp(a*Math.log((Ro+To*40)/Ho))-Ro)/To,c=(x()*2-1)*.42*n;let i=0;for(const r of Tt.types)i+=r[2];let l=x()*i,d=Tt.types[0];for(const r of Tt.types)if(l-=r[2],l<=0){d=r;break}const f=Math.round(Tt.n/e*(.5+x())),A=.8+n*.12;for(let r=0;r<f&&Me.length<1100;r++){const h=x()*6.283,v=A*Math.sqrt(-Math.log(1-x()*.95))*.7,u=c+Math.cos(h)*v,b=n+Math.sin(h)*v*1.4;if(b<1.8||za(u,b)||Math.abs(u)>.44*b+.4)continue;const g=x()<.2?Tt.types[x()*Tt.types.length|0]:d,y=g[0]===2?nt==="Poppies"?.043:.048:g[0]===1?.034:g[0]===4?.04:.048,m=Fa(u,b)?0:1;Me.push({x:u,z:b,y:zt(u,b),h:(.32+x()*.38)*Ca*m,fa:x()*6.283,r2:x(),v:g[0],col:tt(g[1]),sz:y*(g[0]===2?.84:.8)*(1+x()*(g[0]===2?.38:.5))*(1+b*(g[0]===2?.03:.012))*m})}}}if(nt==="Poppies"){const e=I(12),o=Me.length;for(let a=0;a<o&&Me.length<1100;a++){const n=Me[a],c=e(),i=e()*6.283,l=.12+e()*.35,d=e(),f=e();if(n.v!==2||c>.6||n.sz===0)continue;const A=n.x+Math.cos(i)*l,r=n.z+Math.sin(i)*l;r<1.8||za(A,r)||Fa(A,r)||Me.push({x:A,z:r,y:zt(A,r),h:n.h*(.8+d*.35),fa:i,r2:f,v:2,col:n.col,sz:.043*.84*(1+d*.38)*(1+r*.03)})}}const Yt=[];if(ot)for(let e=0;e<56;e++){const o=x(),a=(Ho*Math.exp(o*Math.log((Ro+To*32)/Ho))-Ro)/To,n=(x()*2-1)*.42*a;if(a<2||za(n,a)){e--;continue}const c=Fa(n,a)?0:1;Yt.push({x:n,z:a,y:zt(n,a),h:(.42+x()*.3)*Ca*c,fa:x()*6.283,r2:x(),full:c,sz:.04*(1+a*.012)*c})}const Pa=Me.length+Yt.length,He=new Float32Array((qo+Pa)*8);let Xo=0;_?(He.set(_.bl),Xo=_.nNear,x.ld(_.rB)):(Xo=Xs(W,x,He,qo,Ho,Ro,To,ur,dr,Ca),k.bl=He.slice(0,qo*8),k.nNear=Xo,k.rB=x.st()),Me.concat(Yt).forEach((e,o)=>{const a=(qo+o)*8;He[a]=e.x,He[a+1]=e.y-.02,He[a+2]=e.z,He[a+3]=e.h,He[a+4]=-(.0022+e.z*9e-4)});const hr=So(He),_a=(e,o)=>{const a=t.createVertexArray();return t.bindVertexArray(a),t.bindBuffer(t.ARRAY_BUFFER,e),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,hr),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,o*32),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,o*32+16),t.vertexAttribDivisor(2,1),t.bindVertexArray(null),a},pr=_a(B.tplN,0),vr=_a(B.tplF,Xo),xr=_a(B.tplN,qo),be=10,Pn=e=>({d:new Float32Array(e*be),n:0,cap:e}),pt=(e,o,a,n,c)=>{if(e.n>=e.cap)return;const i=e.n*be;e.d[i]=o[0],e.d[i+1]=o[1],e.d[i+2]=o[2],e.d[i+3]=a[0],e.d[i+4]=a[1],e.d[i+5]=a[2],e.d[i+6]=n[0],e.d[i+7]=n[1],e.d[i+8]=n[2],e.d[i+9]=c,e.n++},Jt=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],le=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]],_t=e=>{const o=at(e[0],e[1],e[2])||1;return[e[0]/o,e[1]/o,e[2]/o]},Xe=(e,o,a,n,c,i)=>{const l=_t(le(Jt(a,o),Jt(n,o)));pt(e,o,l,c,i),pt(e,a,l,c,i),pt(e,n,l,c,i)},mr=(e,o,a,n,c,i,l)=>{Xe(e,o,a,n,i,l),Xe(e,o,n,c,i,l)},sc=(e,o,a,n,c)=>{[[0,1,2,3],[7,6,5,4],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]].forEach((l,d)=>{const f=c?pe(a,ce(a,.75+d*.37%.5),.6):a;mr(e,o[l[0]],o[l[1]],o[l[2]],o[l[3]],f,n)})},U0=(e,o,a,n,c,i,l,d)=>{const f=_t(Jt(a,o));let A=Math.abs(f[1])<.9?[0,1,0]:[1,0,0];const r=_t(le(f,A)),h=le(f,r);for(let v=0;v<i;v++){const u=v/i*6.283,b=(v+1)/i*6.283,g=[r[0]*Math.cos(u)+h[0]*Math.sin(u),r[1]*Math.cos(u)+h[1]*Math.sin(u),r[2]*Math.cos(u)+h[2]*Math.sin(u)],y=[r[0]*Math.cos(b)+h[0]*Math.sin(b),r[1]*Math.cos(b)+h[1]*Math.sin(b),r[2]*Math.cos(b)+h[2]*Math.sin(b)],m=[o[0]+g[0]*n,o[1]+g[1]*n,o[2]+g[2]*n],w=[o[0]+y[0]*n,o[1]+y[1]*n,o[2]+y[2]*n],M=[a[0]+g[0]*c,a[1]+g[1]*c,a[2]+g[2]*c],T=[a[0]+y[0]*c,a[1]+y[1]*c,a[2]+y[2]*c];pt(e,m,g,l,d),pt(e,w,y,l,d),pt(e,T,y,l,d),pt(e,m,g,l,d),pt(e,T,y,l,d),pt(e,M,g,l,d)}},Se=(e,o,a,n,c,i)=>{const l=Jt(a,o),d=Jt(ht,o),f=_t(le(l,d)),A=n*.5,r=_t(d),h=[o[0]-f[0]*A,o[1]-f[1]*A,o[2]-f[2]*A],v=[o[0]+f[0]*A,o[1]+f[1]*A,o[2]+f[2]*A],u=[a[0]+f[0]*A,a[1]+f[1]*A,a[2]+f[2]*A],b=[a[0]-f[0]*A,a[1]-f[1]*A,a[2]-f[2]*A];pt(e,h,r,c,i),pt(e,v,r,c,i),pt(e,u,r,c,i),pt(e,h,r,c,i),pt(e,u,r,c,i),pt(e,b,r,c,i)},st=Pn(6e4),x0=[],br=tt("#7a6a58"),V0=tt("#4e4236");let ie=null,oo=[yt,Pt+6,dt];const ao=D==="Silver frost",St=Wt?[-et*1.3,0,3.9]:[-et*3.7,0,11.5],ae=Wt?[-et*.2,0,13.5]:[-et*1.5,0,18.5];St[1]=zt(St[0],St[2])+2.35,ae[1]=zt(ae[0],ae[2])+2.05;const I0=I(24),_n=tt("#8a7d68"),wr=(e,o,a,n)=>{const l=[],d=[(I0()-.5)*.06,(I0()-.5)*.06],f=tt(ao?"#c3c9cb":"#c6b294"),A=tt("#4a4034");for(let h=0;h<=5;h++){const v=h/5,u=Math.sin(v*Math.PI),b=(a+(n-a)*v)*(1+(I0()-.5)*.14),g=e[0]+(o[0]-e[0])*v+d[0]*u,y=e[1]+(o[1]-e[1])*v,m=e[2]+(o[2]-e[2])*v+d[1]*u,w=pe(pe(A,br,Xt(.02,.2,v)),f,Xt(.12,.7,v)*.85),M=[];for(let T=0;T<9;T++){const F=T/9*6.283,E=1+.1*Math.sin(F*2+h);M.push([[g+Math.cos(F)*b*E,y,m+Math.sin(F)*b*E],[Math.cos(F),0,Math.sin(F)],ce(w,.84+.32*((T*.618+h*.37)%1))])}l.push(M)}for(let h=0;h<5;h++)for(let v=0;v<9;v++){const u=l[h][v],b=l[h][(v+1)%9],g=l[h+1][(v+1)%9],y=l[h+1][v];for(const m of[u,b,g,u,g,y])pt(st,m[0],m[1],m[2],4)}const r=[o[0]+.012,o[1]+.03,o[2]];for(let h=0;h<9;h++){const v=l[5][h],u=l[5][(h+1)%9];pt(st,v[0],[v[1][0]*.5,.86,v[1][2]*.5],v[2],4),pt(st,u[0],[u[1][0]*.5,.86,u[1][2]*.5],u[2],4),pt(st,r,[0,1,0],ce(f,.9),4)}},yr=(e,o,a,n)=>{const c=e[0]+o*n,i=e[2]+a*n,l=[c,zt(c,i)+.03,i];let d=e;for(let f=1;f<=5;f++){const A=f/5,r=[e[0]+(l[0]-e[0])*A,e[1]+(l[1]-e[1])*A-.05*4*A*(1-A),e[2]+(l[2]-e[2])*A];Se(st,d,r,.011,_n,0),d=r}U0(st,[l[0]-o*.05,l[1]-.14,l[2]-a*.05],[l[0]+o*.07,l[1]+.15,l[2]+a*.07],.018,.013,5,V0,4)};{const e=at(ae[0]-St[0],ae[2]-St[2]),o=(ae[0]-St[0])/e,a=(ae[2]-St[2])/e,n=[[St,2.6,.03,.12,.055,.04,-1],[ae,2.3,-.02,.1,.05,.035,1]];for(const[c,i,l,d,f,A,r]of n){wr([c[0],c[1]-i,c[2]],[c[0]+l,c[1]+d,c[2]],f,A),U0(st,[c[0]+l*.9,c[1]-.035,c[2]],[c[0]+l*.95,c[1]+.03,c[2]],A+.012,A+.011,8,ce(_n,.8),0);for(const h of[-.62,.7]){const v=Math.cos(h),u=Math.sin(h);yr([c[0]+l*.9,c[1]-.05,c[2]],r*(o*v-a*u),r*(o*u+a*v),1.25+I0()*.5)}}}const m0=(e,o)=>e[0]*o[0]+e[1]*o[1]+e[2]*o[2],Re=(e,o,a,n,c,i,l,d,f)=>{const A=_t(Jt(a,o)),r=_t(le(A,n)),h=le(r,A),v=[];for(const u of[o,a])for(const[b,g]of[[-1,-1],[1,-1],[1,1],[-1,1]])v.push([u[0]+h[0]*b*c*.5+r[0]*g*i*.5,u[1]+h[1]*b*c*.5+r[1]*g*i*.5,u[2]+h[2]*b*c*.5+r[2]*g*i*.5]);for(const u of[[0,1,2,3],[7,6,5,4],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]]){const b=[0,1,2].map(w=>(v[u[0]][w]+v[u[1]][w]+v[u[2]][w]+v[u[3]][w])/4),g=f&&f(b)?.36:1,y=_t(le(Jt(v[u[1]],v[u[0]]),Jt(v[u[2]],v[u[0]]))),m=w=>ce(w<4?l:d,g);for(const w of[0,1,2,0,2,3])pt(e,v[u[w]],y,m(u[w]),0)}};let O0=Pt,K0=1,Nn=3,Na=0;const Yo=[];if(K==="Lone tree"){const e=tt(ao?"#77736e":"#4a3c30"),o=2.3+x()*.7,a=[yt,Pt-.3,dt];O0=a[1],K0=o*3.2;const n=A=>10+At((A-O0)/K0,0,.999),c=(A,r,h,v,u)=>{const b=_t(Jt(r,A)),g=Math.abs(b[1])<.9?[0,1,0]:[1,0,0],y=_t(le(b,g)),m=le(b,y);for(let w=0;w<u;w++){const M=w/u*6.283,T=(w+1)/u*6.283,F=[0,1,2].map(H=>y[H]*Math.cos(M)+m[H]*Math.sin(M)),E=[0,1,2].map(H=>y[H]*Math.cos(T)+m[H]*Math.sin(T)),z=[0,1,2].map(H=>A[H]+F[H]*h),X=[0,1,2].map(H=>A[H]+E[H]*h),it=[0,1,2].map(H=>r[H]+F[H]*v),J=[0,1,2].map(H=>r[H]+E[H]*v),ut=ce(e,.85+.3*(w*.37%1));pt(st,z,F,ut,n(z[1])),pt(st,X,E,ut,n(X[1])),pt(st,J,E,ut,n(J[1])),pt(st,z,F,ut,n(z[1])),pt(st,J,E,ut,n(J[1])),pt(st,it,F,ut,n(it[1]))}},i=[];let l=0;const d=(A,r,h,v,u,b)=>{const g=_t([r[0]+(x()-.5)*.32,r[1]+.04-(u<2?.16:0),r[2]+(x()-.5)*.32]),y=[A[0]+g[0]*h,A[1]+g[1]*h,A[2]+g[2]*h];if(c(A,y,v,v*.68,u>3?7:u>1?5:3),u<=1&&!ao){const w=u===0?7:4;for(let M=0;M<w;M++){const T=u===0?.25+M*.17:.3+M*.3,F=.35+.45*h;i.push([A[0]+(y[0]-A[0])*T+(x()-.5)*F,A[1]+(y[1]-A[1])*T+(x()-.35)*F*.8,A[2]+(y[2]-A[2])*T+(x()-.5)*F,b])}}if(u===0)return;u===4&&!ie&&g[1]<.85&&y[2]<dt&&(ie=[y[0]*.6+A[0]*.4,y[1]*.6+A[1]*.4-v,y[2]*.6+A[2]*.4]);const m=u>4?2:2+(x()<.45?1:0);for(let w=0;w<m;w++){const M=x()*6.283+w*2.1,T=.5+x()*.5+(u<3?.2:0);d(y,_t([g[0]+Math.cos(M)*T,g[1]+.1,g[2]+Math.sin(M)*T]),h*(.68+x()*.1),v*.64,u-1,u>=3?l++:b)}},f=[(x()-.5)*.15-to*.08,1,(x()-.5)*.1];if(d(a,_t(f),o,.4,6,0),i.length){let A=0,r=0,h=0;for(const m of i)A+=m[0],r+=m[1],h+=m[2];oo=[A/i.length,r/i.length,h/i.length];const v=i.map(m=>at(m[0]-oo[0],(m[1]-oo[1])*1.3,m[2]-oo[2])).sort((m,w)=>m-w);Nn=Math.max(1.5,v[Math.floor(v.length*.85)]);const u=ft.leaf.map(tt),b=new Map;for(const m of i){let w=b.get(m[3]);w||b.set(m[3],w=[0,0,0,0,0]),w[0]+=m[0],w[1]+=m[1],w[2]+=m[2],w[3]++}for(const m of b.values())m[0]/=m[3],m[1]/=m[3],m[2]/=m[3];for(const m of i){const w=b.get(m[3]);w[4]+=(m[0]-w[0])*(m[0]-w[0])+(m[1]-w[1])*(m[1]-w[1])+(m[2]-w[2])*(m[2]-w[2])}const g=[...b.values()];for(const m of g)m[4]=Math.max(.55,Math.sqrt(m[4]/m[3])*1.25);const y=(m,w,M,T,F)=>Ws(g,m,w,M,T,F);for(const m of i){const w=pe(u[x()*u.length|0],u[x()*u.length|0],x()),M=b.get(m[3]),T=m[0]-M[0],F=m[1]-M[1]+.15*M[4],E=m[2]-M[2],z=at(T,F,E)||1,it=At(((T*Ee[0]+F*Ee[1]+E*Ee[2])/z*Math.min(1,z/(M[4]*.5))+.45)/1.45,0,1)*Math.exp(-y(m,Ee[0],Ee[1],Ee[2],M)*.7),J=At(.2+.8*Math.exp(-y(m,0,1,0,M)*.45)*(.55+.45*At(F/M[4]+.5,0,1)),0,.99);x0.push([m[0],m[1],m[2],.45+x()*.32,ce(w,.85+x()*.3),0,m[3]*1.7+x()*.6,x()*6.283,x()*4|0,Math.round(it*255)+J])}}else oo=[yt,Pt+o*2.2,dt];Yo.push([yt,Pt+o*1.6,dt,o*2.6])}else if(K==="Standing stones"){const e=5+(x()*3|0),o=tt(ao?"#8f9599":"#8a877c"),a=I(20);for(let n=0;n<e;n++){const c=(n/(e-1)-.5)*2.4+Math.PI*1.5+(x()-.5)*.2,i=5.5,l=yt+Math.cos(c)*i*1.2,d=dt+Math.sin(c)*i+4,f=zt(l,d)-.3,A=1.6+x()*1.9,r=.6+x()*.6,h=.3+x()*.25,v=c+Math.PI/2+(x()-.5)*.4,u=Math.cos(v),b=Math.sin(v),g=(x()-.5)*.25,y=(x()-.5)*.2,m=[],w=[];for(let Y=0;Y<4;Y++)m.push(.45+x()*.35),w.push(.7+x()*.3);const M=ce(pe(o,tt("#7d8a5a"),x()*.35),.76),T=[0,.2,.45,.7,.9,1],F=T.length,E=8,z=[],X=.3,it=[[1,-1+X],[1,1-X],[1-X,1],[-1+X,1],[-1,1-X],[-1,-1+X],[-1+X,-1],[1-X,-1]],J=(m[0]+m[3])/2,ut=(m[1]+m[2])/2,H=(w[0]+w[1]+w[2]+w[3])/4,Qt=At((w[1]+w[2]-w[0]-w[3])*1.1,-.28,.28),Ye=tt(ao?"#dfe6e8":"#9c9d78");for(let Y=0;Y<F;Y++){const rt=T[Y],kt=Y===F-1,Zt=Y?(a()-.5)*.12*r:0,ye=Y?(a()-.5)*.14*h:0;for(let xo=0;xo<E;xo++){const he=it[xo][0],Ae=it[xo][1],bs=1+(a()-.5)*.2,ws=he*r*(1+((he<0?J:ut)-1)*Math.pow(rt,1.5))*(kt?.8:1)*bs+Zt,ys=Ae*h*(1-.25*rt)*(kt?.72:1)*bs+ye,ec=A*(H+Qt*he)*rt*(1+(Y?(a()-.5)*.06:0)),oc=ce(pe(M,Ye,rt>.3&&a()<.22?.5:0),.62+.38*Xt(0,.35,rt));z.push({p:[l+ws*u-ys*b+g*A*rt,f+ec,d+ws*b+ys*u+y*A*rt],n:[0,0,0],c:oc})}}const je={p:[0,0,0],n:[0,0,0],c:M};for(let Y=0;Y<E;Y++){const rt=z[(F-1)*E+Y];for(let kt=0;kt<3;kt++)je.p[kt]+=rt.p[kt]/E}const vo=[],No=(Y,rt,kt,Zt)=>{const ye=le(Jt((Zt||kt).p,Y.p),Jt(rt.p,Y.p)),xo=.72+.4*a(),he=Zt?[Y,rt,kt,Y,kt,Zt]:[Y,rt,kt];for(const Ae of Zt?[Y,rt,kt,Zt]:he)Ae.n[0]+=ye[0],Ae.n[1]+=ye[1],Ae.n[2]+=ye[2];vo.push([he,_t(ye),xo])};for(let Y=0;Y<F-1;Y++)for(let rt=0;rt<E;rt++)No(z[Y*E+rt],z[Y*E+(rt+1)%E],z[(Y+1)*E+(rt+1)%E],z[(Y+1)*E+rt]);for(let Y=0;Y<E;Y++)No(z[(F-1)*E+Y],z[(F-1)*E+(Y+1)%E],je);for(const[Y,rt,kt]of vo)for(const Zt of Y){const ye=_t(Zt.n);pt(st,Zt.p,_t([rt[0]*.65+ye[0]*.35,rt[1]*.65+ye[1]*.35,rt[2]*.65+ye[2]*.35]),ce(Zt.c,kt),0)}}oo=[yt,Pt+2,dt],Yo.push([yt,Pt+1.5,dt+4,8])}else if(K==="Weathered shelter"){const e=-et*.35+(x()-.5)*.3,o=Math.cos(e),a=Math.sin(e),n=(E,z,X)=>[yt+E*o-z*a,Pt+X,dt+E*a+z*o],c=[o,0,a],i=[-a,0,o],l=[0,1,0],d=2.3,f=1.45,A=2.35,r=1.75,h=E=>A+(r-A)*(E+f)/(2*f),v=(ao?["#b3b8ba","#9ca1a3","#c9cdcd"]:["#8c8273","#7a6b5a","#9c9282","#6e604e","#857868","#94897a"]).map(tt),u=()=>pe(v[x()*v.length|0],tt("#5c4e3e"),x()*.2),b=E=>pe(E,tt("#2c2820"),.5),g=E=>pe(E,tt(ao?"#e2e8ea":"#55603a"),.45),y=E=>{const z=Jt(E,[yt,Pt,dt]),X=m0(z,c),it=m0(z,i);return Math.abs(X)<d-.005&&Math.abs(it)<f+.03&&z[1]<h(it)-.03&&it<f+.03&&it>-f-.06&&Math.abs(X)<d+.03},m=(E,z,X)=>{const it=u();Re(st,n(E,z,-.4),n(E+(x()-.5)*.06,z+(x()-.5)*.05,X),c,.15,.15,b(it),it,y)};for(const E of[-d,-d/3,d/3,d])m(E,-f,A);m(-d,f,r),m(d,f,r),Re(st,n(-d-.18,-f,A-.06),n(d+.18,-f,A-.06),l,.17,.11,u(),u(),null),Re(st,n(-d-.18,f,r-.06),n(d+.18,f,r-.06),l,.17,.11,u(),u(),null);for(const E of[-d,-d/3,d/3,d])Re(st,n(E,-f-.38,h(-f-.38)+.04),n(E,f+.32,h(f+.32)+.04),l,.12,.07,u(),u(),null);let w=-d-.3;const M=3+(x()*12|0);for(let E=0;w<d+.3;E++){const z=.22+x()*.08,X=pe(u(),tt("#aaa293"),.15),it=(x()-.5)*.02,J=(x()-.5)*.02;E!==M&&Re(st,n(w+z/2,-f-.44,h(-f-.44)+.13+it),n(w+z/2+(x()-.5)*.04,f+.38,h(f+.38)+.13+J),c,z+.01,.03,X,g(X),y),w+=z}Re(st,n(-d-.32,-f-.45,h(-f-.45)+.05),n(d+.32,-f-.45,h(-f-.45)+.05),l,.16,.03,u(),u(),null),Re(st,n(-d-.32,f+.39,h(f+.39)+.05),n(d+.32,f+.39,h(f+.39)+.05),l,.14,.03,g(u()),g(u()),null);const T=(E,z,X,it,J)=>{let ut=X;const H=x()*30|0;for(let Qt=0;ut<it;Qt++){const Ye=.17+x()*.09,je=ut+Ye/2;if(Qt!==H){const vo=Zt=>J?n(E,je,Zt):n(je,E,Zt),No=J?je:E,Y=h(Math.min(No,f))-.02,rt=x()<.08?.1+x()*.2:-.15,kt=u();Re(st,vo(rt),vo(Y),J?i:c,Ye-.004,.024,b(kt),pe(kt,tt("#a8a296"),.25),y)}ut+=Ye+(x()<.05?.025:.002)}};T(f+.07,null,-d-.05,d+.05,!1);const F=et;T(-F*(d+.07),null,-f+.05,f,!0),T(F*(d+.07),null,f*.1,f,!0);for(const E of[-1,1])Re(st,n(E*(d+.03),-f,1.05),n(E*(d+.03),f,1),l,.11,.06,u(),u(),null);Re(st,n(-1.3,.85,.47),n(1.3,.85,.47),i,.3,.05,u(),u(),y);for(const E of[-1.1,1.1])Re(st,n(E,.85,-.2),n(E,.85,.45),c,.08,.22,b(u()),u(),y);ie=n(-et*d*.55,-f-.02,A-.16),oo=[yt,Pt+2,dt],Yo.push([yt,Pt+1.2,dt,3.6])}if(!ie){const e=[St[0]+et*.45,St[1]+.02,St[2]-.1];U0(st,[St[0],St[1]-.05,St[2]],e,.025,.02,5,V0,4),ie=[e[0]-et*.06,e[1]-.03,e[2]]}let Ct=null;if(K==="Tethered kite"){const e=52-Oo*14;Ct=[-Math.sign(to||1)*.42*.384*e,0,e],Ct[1]=zt(Ct[0],Ct[2])+.4,U0(st,[Ct[0],Ct[1]-.8,Ct[2]],Ct,.05,.04,5,V0,4)}const Ln=e=>{const o=t.createVertexArray();return t.bindVertexArray(o),t.bindBuffer(t.ARRAY_BUFFER,e),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,be*4,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,3,t.FLOAT,!1,be*4,12),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,3,t.FLOAT,!1,be*4,24),t.enableVertexAttribArray(3),t.vertexAttribPointer(3,1,t.FLOAT,!1,be*4,36),t.bindVertexArray(null),o},Ar=So(st.d.subarray(0,Math.max(3,st.n)*be)),Bn=Ln(Ar),vt=Pn(9e3),Dn=So(vt.d.byteLength,t.DYNAMIC_DRAW),gr=Ln(Dn),Te=12,G0=new Float32Array((x0.length+Me.length)*Te);let W0=0;for(const e of x0){const o=W0++*Te;G0.set([e[0],e[1],e[2],e[3],e[4][0],e[4][1],e[4][2],e[9]===void 0?255.9:e[9],0,e[6],e[7],e[8]||0],o)}for(const e of Me){const o=W0++*Te;G0.set([e.x,e.y-.02,e.z,e.sz,e.col[0],e.col[1],e.col[2],e.v,4,e.h,e.r2,e.fa],o)}const Un=e=>{const o=t.createVertexArray();t.bindVertexArray(o),t.bindBuffer(t.ARRAY_BUFFER,B.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,e);for(let a=1;a<=3;a++)t.enableVertexAttribArray(a),t.vertexAttribPointer(a,4,t.FLOAT,!1,Te*4,(a-1)*16),t.vertexAttribDivisor(a,1);return t.bindVertexArray(null),o},Er=So(G0.length?G0:new Float32Array(Te)),Vn=Un(Er),Kt=ot?Yt.length*6:V==="Petals"?300:170,La=36,ne=new Float32Array((Yt.length+Kt*2+La+4)*Te),Ba=So(ne.byteLength,t.DYNAMIC_DRAW),In=Un(Ba),q0=t.createVertexArray();t.bindVertexArray(q0),t.bindBuffer(t.ARRAY_BUFFER,B.tri),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null);const Nt=new Float32Array(Kt),qt=new Float32Array(Kt),Lt=new Float32Array(Kt),b0=new Float32Array(Kt),no=new Float32Array(Kt),w0=new Float32Array(Kt),fe=new Uint8Array(Kt),ke=new Int16Array(Kt),ue=new Float32Array(Kt),H0=new Float32Array(Kt),ko=new Float32Array(Kt*3),jo=Me.filter(e=>e.v!==0&&e.v!==4),y0=e=>{if(ot){const o=Yt[ke[e]];Nt[e]=o.x,qt[e]=o.y+o.h,Lt[e]=o.z}else if(V==="Petals"&&jo.length){const o=jo[ke[e]%jo.length];Nt[e]=o.x,qt[e]=o.y+o.h,Lt[e]=o.z}else{const o=3+S()*30,a=(S()*2-1)*.4*o;Nt[e]=a,Lt[e]=o,qt[e]=zt(a,o)+.3}};for(let e=0;e<Kt;e++){ke[e]=ot?e/6|0:S()*1e3|0,fe[e]=0,y0(e),ue[e]=S()*10;const o=V==="Petals"&&jo.length?jo[ke[e]%jo.length].col:V==="Fireflies"?[1,.85,.35]:[.95,.94,.9];ko[e*3]=o[0],ko[e*3+1]=o[1],ko[e*3+2]=o[2]}const zo=V==="Fireflies",On=V==="Glowing seeds",X0=(e,o,a,n,c,i,l)=>{fe[e]=1,Nt[e]=o,qt[e]=a,Lt[e]=n,b0[e]=c,no[e]=i,w0[e]=l,ue[e]=0,ot&&(Yt[ke[e]].full=Math.max(0,Yt[ke[e]].full-1/6))};function Mr(e){for(let o=0;o<Kt;o++){const a=fe[o];if(ue[o]+=e,a===0){if(zo){S()<e*.08*(Q?1.5:1)&&(y0(o),X0(o,Nt[o],qt[o],Lt[o],0,.3,0));continue}Be(Nt[o],Lt[o]);const u=at(Ut,Vt);u>3.3&&S()<e*(u-3.3)*.35&&(y0(o),X0(o,Nt[o],qt[o],Lt[o],Ut*.5,.6+S()*.6,Vt*.5));continue}Be(Nt[o],Lt[o]);const n=Do(Nt[o],Lt[o]),c=qt[o]-n,i=At(.35+c*.28,.35,1.5);let l=Ut*i,d=Vt*i;const f=at(Ut,Vt),A=Math.sin(ue[o]*2.3+o*1.7)*.5+Math.sin(ue[o]*5.1+o)*.3;if(a===2){f>4.2&&S()<e*(f-4.2)*.5?(fe[o]=1,no[o]=1.2):ue[o]>(zo?4+o%5:22+o%13)&&(fe[o]=0,y0(o),ot&&(Yt[ke[o]].full=Math.min(1,Yt[ke[o]].full+1/6)));continue}let r;if(zo){const u=ue[o]*.7+o*2.1;l=l*.35+Math.cos(u)*.45,d=d*.35+Math.sin(u*1.3)*.45,r=(.9+.7*Math.sin(o)-c)*.5+Math.sin(ue[o]*1.1+o)*.3+Math.max(0,f-4)*.25}else r=Math.max(0,f-2.2)*.3+A*(.15+f*.08)-(ot?.32:.55);const h=ot?4.5:zo?2.5:2.6;b0[o]+=(l-b0[o])*Math.min(1,h*e),w0[o]+=(d-w0[o])*Math.min(1,h*e),no[o]+=(r-no[o])*Math.min(1,3*e),Nt[o]+=b0[o]*e,qt[o]+=no[o]*e,Lt[o]+=w0[o]*e,H0[o]+=(f*.6+1)*e*(o%2?1:-1),qt[o]<n+.3&&(qt[o]=n+.3,no[o]<0&&(no[o]=0),!zo&&f<3.2&&(fe[o]=2,ue[o]=0,qt[o]=n+.25+o%7*.04));const v=Lt[o];zo&&ue[o]>14+o%9&&(fe[o]=2,ue[o]=0),(v>110||v<.8||Math.abs(Nt[o])>.6*Math.max(v,1)+6||qt[o]>n+45)&&(fe[o]=0,y0(o),ot&&(Yt[ke[o]].full=Math.min(1,Yt[ke[o]].full+1/6)))}}const so=9,jt=6,A0=.28,Kn=.86,Gn=["#3e4c70","#9c4a36","#c39a52","#6b7652","#d9d0bd","#7b5a68","#b9a98c"].map(tt),Da=so*jt*2,U=new Float32Array(Da*3),It=new Float32Array(Da*3),g0=new Uint8Array(Da),E0=[],Ua=[],Sr=.32,Va=(e,o)=>{o[0]=St[0]+(ae[0]-St[0])*e,o[1]=St[1]+(ae[1]-St[1])*e-Sr*4*e*(1-e),o[2]=St[2]+(ae[2]-St[2])*e},Bt=[0,0,0];let Qo=0,Zo=0;const Y0=_t(Jt(ae,St));for(let e=0;e<so;e++){E0.push((e+.8)/(so+.6)),Ua.push(pe(Gn[x()*Gn.length|0],[.6,.55,.45],x()*.3));for(let o=0;o<jt;o++)for(let a=0;a<2;a++){const n=(e*jt+o)*2+a;Va(E0[e],Bt);const c=(a-.5)*A0;U[n*3]=Bt[0]+Y0[0]*c,U[n*3+1]=Bt[1]-o*Kn/(jt-1),U[n*3+2]=Bt[2]+Y0[2]*c,g0[n]=o===0?1:0}}It.set(U);const Jo=[];for(let e=0;e<so;e++)for(let o=0;o<jt;o++){const a=(e*jt+o)*2;if(Jo.push([a,a+1,A0]),o<jt-1){const n=Kn/(jt-1);Jo.push([a,a+2,n],[a+1,a+3,n],[a,a+3,at(A0,n)],[a+1,a+2,at(A0,n)])}}const Rr=Jo.length,Tr=new Int16Array(Jo.map(e=>e[0])),kr=new Int16Array(Jo.map(e=>e[1])),zr=new Float32Array(Jo.map(e=>e[2]));function Fr(e){Be((St[0]+ae[0])/2,(St[2]+ae[2])/2);const o=at(Ut,Vt);Qo+=(Ut*.012-Qo)*e*3,Zo+=(Vt*.012-Zo)*e*3;const a=2,n=e/a;for(let c=0;c<a;c++){for(let i=0;i<so;i++){Va(E0[i],Bt);const l=4*E0[i]*(1-E0[i]);Be(Bt[0],Bt[2]);const d=Ft+c*n,f=Math.sin(d*(9+i)+i*1.7)*.35+Math.sin(d*23.1+i*3.1)*.2,A=Math.cos(d*(7.5+i*.7)+i)*.35,r=Ut*(1+f*.5)+A*o*.3,h=Vt*(1+A*.5)-f*o*.3,v=f*o*.15,u=Math.min(o*o,40)*n*n*.16,b=Math.sin(d*(5.3+i*.61)+i*2.3);for(let g=0;g<jt-1;g++){const y=(i*jt+g)*6,m=y+3,w=y+6,M=y+9,T=U[m]-U[y],F=U[m+1]-U[y+1],E=U[m+2]-U[y+2],z=U[w]-U[y],X=U[w+1]-U[y+1],it=U[w+2]-U[y+2];let J=F*it-E*X,ut=E*z-T*it,H=T*X-F*z;const Qt=at(J,ut,H)||1;J/=Qt,ut/=Qt,H/=Qt;const Ye=1/(4*n),je=r-(U[y]-It[y]+U[m]-It[m]+U[w]-It[w]+U[M]-It[M])*Ye,vo=v-(U[y+1]-It[y+1]+U[m+1]-It[m+1]+U[w+1]-It[w+1]+U[M+1]-It[M+1])*Ye,No=h-(U[y+2]-It[y+2]+U[m+2]-It[m+2]+U[w+2]-It[w+2]+U[M+2]-It[M+2])*Ye,Y=je*J+vo*ut+No*H,rt=Y*Math.abs(Y)*n*n,kt=.05*n*n,Zt=J*rt+je*kt,ye=ut*rt+vo*kt,xo=H*rt+No*kt;for(let Ae=y;Ae<=M;Ae+=3)g0[Ae/3]||(U[Ae]+=Zt,U[Ae+1]+=ye,U[Ae+2]+=xo);const he=u*(g+1)/jt*(b+.6*Math.sin(d*11.7+i*4.1+g*.9));U[w]+=J*he,U[w+1]+=ut*he,U[w+2]+=H*he,U[M]-=J*he,U[M+1]-=ut*he,U[M+2]-=H*he}for(let g=0;g<jt;g++)for(let y=0;y<2;y++){const m=(i*jt+g)*2+y;if(g0[m]){const w=(y-.5)*A0;U[m*3]=Bt[0]+Y0[0]*w+Qo*l,U[m*3+1]=Bt[1],U[m*3+2]=Bt[2]+Y0[2]*w+Zo*l,It[m*3]=U[m*3],It[m*3+1]=U[m*3+1],It[m*3+2]=U[m*3+2];continue}for(let w=0;w<3;w++){const M=U[m*3+w],T=(M-It[m*3+w])*.985;It[m*3+w]=M,U[m*3+w]=M+T+(w===1?-9.8*n*n:0)}}}for(let i=0;i<4;i++)for(let l=0;l<Rr;l++){const d=Tr[l],f=kr[l],A=zr[l],r=d*3,h=f*3,v=U[h]-U[r],u=U[h+1]-U[r+1],b=U[h+2]-U[r+2],g=Math.sqrt(v*v+u*u+b*b)+1e-6,y=(g-A)/g,m=g0[d]?0:1,w=g0[f]?0:1,M=m+w;if(!M)continue;const T=y*m/M,F=y*w/M;U[r]+=v*T,U[r+1]+=u*T,U[r+2]+=b*T,U[h]-=v*F,U[h+1]-=u*F,U[h+2]-=b*F}}}const Cr={"Major pentatonic":[0,2,4,7,9],"Minor pentatonic":[0,3,5,7,10],Lydian:[0,4,6,7,11],"Whole-tone":[0,2,4,6,8]},Wn=74+(x()*5|0)-2,qn=Cr[G].map(e=>Wn+e),ro=5,j0=.075,Q0=qn.map(e=>.42*Math.pow(2,-(e-Wn)/24)),ze=new Float32Array(ro*2),co=new Float32Array(ro*2),Ia=new Float32Array(ro).fill(-9);let se=[0,0],Fe=[0,0];const Ue=.2,Oa=[];function Pr(e,o){Be(ie[0],ie[2]);const a=at(Ut,Vt),n=Ft,c=Math.max(0,a-me.base*.8),i=(Math.sin(n*3.1)+Math.sin(n*5.4+1)*.8+Math.sin(n*13.7+2)*.3)*(a*.35+c*.5),l=(Math.cos(n*2.7+1)+Math.sin(n*5.9)*.8)*(a*.35+c*.5),d=(Ut+i)*.22,f=(Vt+l)*.22;for(let r=0;r<ro;r++){const h=.12+Q0[r]*.5,v=9.8/h;for(let u=0;u<2;u++)co[r*2+u]+=(-v*ze[r*2+u]-.8*co[r*2+u]+(u?f:d)*1.2*(1+r*.07))*e,ze[r*2+u]+=co[r*2+u]*e}const A=9.8/.32;for(let r=0;r<2;r++)Fe[r]+=(-A*se[r]-.5*Fe[r]+(r?f:d)*3.6+(r?i:l)*.08)*e,se[r]+=Fe[r]*e;for(let r=0;r<ro;r++){const h=r/ro*6.283,v=Math.cos(h)*j0+ze[r*2]*Ue,u=Math.sin(h)*j0+ze[r*2+1]*Ue,b=se[0]*Ue,g=se[1]*Ue,y=b-v,m=g-u,w=at(y,m)+1e-6;if(w<.044){const M=y/w,T=m/w,F=((Fe[0]-co[r*2])*M+(Fe[1]-co[r*2+1])*T)*Ue;if(F<0){const E=-F*1.6/Ue;Fe[0]+=M*E*.6,Fe[1]+=T*E*.6,co[r*2]-=M*E*.4,co[r*2+1]-=T*E*.4;const z=(.044-w)/Ue;se[0]+=M*z*.6,se[1]+=T*z*.6,ze[r*2]-=M*z*.4,ze[r*2+1]-=T*z*.4,o&&Ft-Ia[r]>.14&&-F>.008&&(Ia[r]=Ft,Oa.push([r,Math.min(1,-F*9)]))}}}}const lt=Ct?{p:[Ct[0]-to*10,Ct[1]+26,Ct[2]+18],o:null,L:34,tail:[]}:null;if(lt){lt.o=lt.p.slice();for(let e=0;e<10;e++)lt.tail.push([lt.p[0],lt.p[1]-e*.35,lt.p[2]],[lt.p[0],lt.p[1]-e*.35,lt.p[2]])}function _r(e){if(!lt)return;Be(lt.p[0],lt.p[2]);const o=Ut*1.5+Ge*.3,a=Vt*1.5+We*.3,n=lt.p,c=lt.o,i=(n[0]-c[0])/e,l=(n[1]-c[1])/e,d=(n[2]-c[2])/e,f=o-i,A=-l,r=a-d,h=at(f,A,r),v=f*h*.09,u=r*h*.09,b=h*h*.11+A*h*.09-9.8*.35+Math.sin(Ft*1.3)*.6;for(let M=0;M<3;M++)c[M]=n[M];n[0]+=i*e*.99+v*e*e,n[1]+=l*e*.99+b*e*e,n[2]+=d*e*.99+u*e*e;const g=Jt(n,Ct),y=at(g[0],g[1],g[2]);if(y>lt.L)for(let M=0;M<3;M++)n[M]=Ct[M]+g[M]/y*lt.L;const m=Do(n[0],n[2])+1;n[1]<m&&(n[1]=m);const w=lt.tail;w[0]=[n[0],n[1]-.85,n[2]],w[1]=w[0].slice();for(let M=1;M<10;M++){const T=w[M*2],F=w[M*2+1];for(let E=0;E<3;E++){const z=(T[E]-F[E])*.96;F[E]=T[E],T[E]+=z+(E===0?o:E===2?a:0)*.5*e*e*8+(E===1?-3*e*e:0)}}for(let M=0;M<3;M++)for(let T=1;T<10;T++){const F=w[(T-1)*2],E=w[T*2],z=Jt(E,F),X=at(z[0],z[1],z[2])+1e-6,it=(X-.6)/X;for(let J=0;J<3;J++)E[J]-=z[J]*it}}const Ve=N==="Swifts"?16:N==="Rooks"?14:0,lo=[],$o=N==="Swifts"?10:N==="Rooks"?6.5:7,Nr=N==="Swifts"?.42:N==="Rooks"?.95:.78,we=[et*.25,45+x()*20,12+x()*8];N==="Rooks"?(we[1]=we[1]*1.5+30,we[2]*=1.8):(we[1]*=1.25,we[2]*=1.2);const Fo=[-et*2.5,0,22+x()*6];Fo[1]=zt(Fo[0],Fo[2])+9+x()*3;for(let e=0;e<Ve;e++){const o=x()*6.283,a=Ve===1?Fo.slice():[we[0]*we[1]+(x()-.5)*16,zt(0,we[1])+we[2]+(x()-.5)*6,we[1]+(x()-.5)*14];lo.push({p:a,a:[Math.cos(o)*$o,0,Math.sin(o)*$o],ph:x()*6.283,flap:1})}function Lr(e){if(!Ve)return;const o=Ft;let a=0,n=0,c=0,i=0,l=0;for(const r of lo)a+=r.p[0],n+=r.p[1],c+=r.p[2],i+=r.a[0],l+=r.a[2];a/=Ve,n/=Ve,c/=Ve,i/=Ve,l/=Ve;const d=we[1]+Math.sin(o*.05)*18,f=Math.sin(o*.07+1)*.3*d,A=Do(f,d)+we[2]+Math.sin(o*.11)*4;for(const r of lo){Be(r.p[0],r.p[2]);const h=Ut*1.35+Ge*.4,v=Vt*1.35+We*.4,u=at(h,v);let b=0,g=0,y=0;if(Ve===1){const w=-h+(Fo[0]-r.p[0])*.5+(u<1.5?Math.cos(o*.4)*2.5:0),M=-v+(Fo[2]-r.p[2])*.5+(u<1.5?Math.sin(o*.4)*2.5:0);b=(w-r.a[0])*2.5,y=(M-r.a[2])*2.5,g=(Fo[1]+Math.sin(o*.9)*.4-r.p[1])*2-r.a[1]*2,r.flap=u>5?.25:1}else{b+=(f-a)*.05+(a-r.p[0])*.12+(i-r.a[0])*.35,y+=(d-c)*.05+(c-r.p[2])*.12+(l-r.a[2])*.35,g+=(A-r.p[1])*.25-r.a[1]*.6;for(const M of lo){if(M===r)continue;const T=r.p[0]-M.p[0],F=r.p[1]-M.p[1],E=r.p[2]-M.p[2],z=T*T+F*F+E*E+.01;z<9&&(b+=T/z*6,g+=F/z*3,y+=E/z*6)}const w=At(u/7,0,1)*(N==="Rooks"?1.6:1);b+=(-h/(u+.001)*$o-r.a[0])*w*.6,y+=(-v/(u+.001)*$o-r.a[2])*w*.6,N==="Swifts"&&(b+=Math.sin(o*1.7+r.ph)*4,y+=Math.cos(o*1.3+r.ph*2)*4),r.flap=N==="Swifts"?Math.sin(o*.9+r.ph)>.2?1:.15:Math.sin(o*.5+r.ph)>-.4?1:.2}r.a[0]+=b*e,r.a[1]+=g*e,r.a[2]+=y*e;const m=at(r.a[0],r.a[2]);if(Ve>1){const w=At(m,$o*.6,$o*1.3);r.a[0]*=w/(m+1e-4),r.a[2]*=w/(m+1e-4)}r.a[1]=At(r.a[1],-2.5,2.5),r.p[0]+=(r.a[0]+h)*e,r.p[1]+=r.a[1]*e,r.p[2]+=(r.a[2]+v)*e,r.p[2]=At(r.p[2],14,140),r.p[0]=At(r.p[0],-.55*r.p[2],.55*r.p[2]),r.ph+=e*(N==="Rooks"?9:N==="Swifts"?22:17)*(r.flap>.5?1:.2)}}const de=s.input;let M0=!1,Z0=0,Hn=0,Xn=0,J0=0,$0=0,ta=0,Ht=0,Br=!1,Ka=null,Ga=!1;const ea=(e,o)=>{const a=e*2-1,n=1-o*2;let c=yo[0]+(Ne[0]*a+Le[0]*n)*Uo,i=yo[1]+(Ne[1]*a+Le[1]*n)*Uo,l=yo[2]+(Ne[2]*a+Le[2]*n)*Uo;const d=at(c,i,l);c/=d,i/=d,l/=d;let f=.5,A=.5;for(;f<160;){const r=ht[0]+c*f,h=ht[1]+i*f,v=ht[2]+l*f;if(h<Do(r,v)){let u=A,b=f;for(let g=0;g<12;g++){const y=(u+b)/2;ht[1]+i*y<Do(ht[0]+c*y,ht[2]+l*y)?b=y:u=y}return{sky:!1,x:ht[0]+c*b,y:ht[1]+i*b,z:ht[2]+l*b,t:b,d:[c,i,l]}}A=f,f+=.05+f*.03}return{sky:!0,d:[c,i,l],x:c/Math.max(l,.05)*90,z:90,y:0,t:40}},Wa=[];for(let e=0;e<La;e++)Wa.push({a:e/La*6.283+x(),r:1,y:0,live:0,p:[0,0,0],v:[0,0,0]});let Co=[0,0,0],Po=1,io=0;function Dr(e,o,a,n,c,i){let l=a-e,d=n-o;const f=at(l,d);if(f<1e-4)return;l/=f,d/=f;const A=l*c,r=d*c;for(let h=0;h<xt;h++){const v=Vo[h],u=.6+.075*v;for(let b=0;b<ct;b++){const g=h*ct+b,y=Io[g],m=y-e,w=v-o;let M=(m*l+w*d)/f;M=At(M,0,1);const T=e+l*f*M-y,F=o+d*f*M-v,E=(T*T+F*F)/(u*u);if(E>6)continue;const z=Math.exp(-E)*Math.min(1,i*10);Et[g]*l+Mt[g]*d<c&&(Et[g]+=(A-Et[g])*z,Mt[g]+=(r-Mt[g])*z)}}}function Ur(e,o,a,n){for(let c=0;c<xt;c++){const i=Vo[c],l=3+.25*i;for(let d=0;d<ct;d++){const f=c*ct+d,A=e-Io[f],r=o-i,h=at(A,r)+.3,v=Math.exp(-(h*h)/(l*l))*n*2;Et[f]+=(A/h*a-Et[f])*v*.5,Mt[f]+=(r/h*a-Mt[f])*v*.5}}}let oa=[];function Vr(e){const o=de.taps();if(de.down&&de.inside){M0||(M0=!0,Z0=0,Hn=$0=de.x,Xn=ta=de.y,J0=0,Ht=0,Ga=!0),Z0+=e;const a=at(de.x-$0,de.y-ta);if(J0+=a,J0>.03){if(a>1e-4){const n=ea($0,ta),c=ea(de.x,de.y),i=At(a/Math.max(e,.001)*13,2.5,15);Dr(n.x,n.z,c.x,c.z,i,e)}Ht=0}else if(Z0>.3){const n=ea(de.x,de.y);Br=n.sky,Ka=n,Ht=Math.min(1,Ht+e/2.2),Ur(n.x,n.z,1.5+3*Ht,e);const c=n.sky?26:Math.min(n.t,30);Co=[ht[0]+n.d[0]*c,ht[1]+n.d[1]*c,ht[2]+n.d[2]*c],Po=c/10}$0=de.x,ta=de.y}else M0&&(M0=!1,J0<=.03&&Z0<=.3?oa.push([Hn,Xn]):Ht>.08&&Ka&&Ir(Ka,Ht),Ht=0);if(!Ga)for(const a of o)oa.push([a.x,a.y]);Ga=M0;for(const a of oa)Or(a[0],a[1]);oa=[]}function Ir(e,o){if(e.sky){const a=At(e.x,-45,45),n=96,c=-a*.5,i=-n,l=at(c,i);De.push({ring:!1,ox:a,oz:n,ux:c/l,uz:i/l,s:0,U:9+9*o,S:8+12*o,Wd:14+20*o,T:4+4*o,len:125,lat:0,ph:S()*6})}else{const a=1+e.z/25;De.push({ring:!0,ox:e.x,oz:e.z,s:.3,U:(5+6*o)*a,S:4+9*o,T:1.2*a,len:(4+10*o)*a});let n=0;for(let c=0;c<Kt&&n<6+20*o;c++)fe[c]!==1&&at(Nt[c]-e.x,Lt[c]-e.z)<5*a&&(X0(c,Nt[c],Do(Nt[c],Lt[c])+.5,Lt[c],(Nt[c]-e.x)*2,1.5+o*2,(Lt[c]-e.z)*2),n++)}io=1.2;for(const a of Wa)a.live=1,a.v=[(S()-.5)*6,(S()-.2)*4,(e.sky?-8:0)+(S()-.5)*6]}function Or(e,o){const a=ea(e,o);let n,c,i;a.sky?(n=ht[0]+a.d[0]*12,c=ht[1]+a.d[1]*12,i=ht[2]+a.d[2]*12):(n=a.x,i=a.z,c=a.y+.6);let l=0;for(let d=0;d<2&&l<22;d++)for(let f=0;f<Kt&&l<22;f++){const A=(f*37+(Ft*97|0))%Kt;if(d===0?fe[A]===0:fe[A]===2){const r=S()*6.283,h=.6+S()*1.4;X0(A,n+Math.cos(r)*.15,c+S()*.3,i+Math.sin(r)*.15,Math.cos(r)*h,.8+S()*1.4,Math.sin(r)*h),l++}}a.sky||De.push({ring:!0,ox:n,oz:i,s:.2,U:5,S:2.6,T:.8*(1+i/25),len:2.5*(1+i/25)}),s.sound.on&&s.sound.hit("noise",.35,{cutoff:2200,dur:.35})}const qa=11025,Ha=new Float32Array(4096);let aa=0,_o=19088743^(parseInt(R.slice(56,64),16)|0),Xa=0,Ya=0,Yn=0,na=0,ja=0,jn=0,Qn=0,Kr=0,Gr=0;const Zn=()=>(_o^=_o<<13,_o^=_o>>>17,_o^=_o<<5,(_o>>>0)/2147483648-1);function Wr(e){let o=0,a=0,n=0;for(let r=0;r<33;r+=2)for(let h=4;h<ct-4;h+=2){n++;const v=r*ct+h;o+=at(Et[v],Mt[v]),a+=Math.abs(Ea[v])+Math.abs(Ma[v])}o/=n,a/=n;const c=a;Gr=c;for(const r of Oa){const[h,v]=r,u=qn[h],b=At(ie[0]/Math.max(ie[2],1)*1.5,-.8,.8);s.sound.note(u,{dur:3.2,vel:.12+.5*v,wave:"sine",pan:b,attack:.003}),s.sound.note(u,{freq:440*Math.pow(2,(u-69)/12)*2.76,dur:1.1,vel:(.12+.5*v)*.28,wave:"sine",pan:b})}if(Oa.length=0,!s.sound.on)return;aa+=e*qa;let i=Math.floor(aa);if(aa-=i,i=Math.min(i,Ha.length),i<16){aa+=i;return}const l=jn,d=Qn,f=At((o-.5)/9,0,1.2),A=At(c/2.2,0,1);for(let r=0;r<i;r++){const h=r/i,v=l+(f-l)*h,u=d+(A-d)*h,b=Zn(),g=.02+.05*v;Xa+=(b-Xa)*g,Ya+=(Xa-Ya)*g;const y=260+520*v+90*Math.sin(Kr+=9e-5*(1+v*3)),m=2*Math.sin(Math.PI*y/qa),w=.32;Yn+=m*na;const M=b-Yn-w*na;na+=m*M,ja+=(b-ja)*.55;const T=b-ja,F=Zn()>.94-u*.25?1:.25;Ha[r]=Ya*(1.6+3.5*v)+na*(.18+.75*v*v)+T*u*.22*F}jn=f,Qn=A,s.sound.pcm(Ha.subarray(0,i),qa,{vel:.55})}const bt=Ot,qr=.8+x()*.5,Jn=[x()*4e3,x()*4e3],sa=I(8),$n=s.home?[0,0]:[sa()*6e4,sa()*6e4],Hr=s.home?1:.72+sa()*.6,Xr=s.home?0:sa()*.06-.012,ts=L==="Calm"?6:L==="Gusty"?10:14,t0=7,fo={"Golden hour":[1500,1300,.66,8500,1/80,60],"Morning haze":[1150,900,.63,7e3,1/100,52],"Storm light":[850,2200,.44,12e3,1/65,56],"Aurora night":[1600,800,.64,8500,1/90,44]}[O],uo=32,Rt=new Float32Array(uo+38*4),j=(e,o,a)=>{const n=uo+e*4;for(let c=0;c<o.length&&c<4;c++)Rt[n+c]=o[c];a!==void 0&&(Rt[n+3]=a)};Rt.set(oe,0);const Yr=Q?[bt.amb[0]+.01,bt.amb[1]+.035,bt.amb[2]+.025]:bt.amb;j(0,ht,0),j(1,Ee,Uo),j(2,bt.sun,wa),j(3,Yr,2/p),j(4,tt(bt.fog),On?1:0),j(5,bt.glow,0),j(6,tt(bt.top)),j(7,ce(tt(bt.hor),bt.horK)),j(8,[bt.fogD,bt.fogB,ee?-4:0,bt.fogP]),j(9,[bt.cov,bt.soft,0,0]),j(10,[bt.sh,650,qr,Q?1:0]),j(11,[u0,d0,h0,p0]),j(12,[0,0,me.base,L==="Gusty"?1:L==="Calm"?.4:.6]),j(13,[bt.grade[0],bt.grade[1],bt.grade[2],bt.exp]),j(14,[bt.tone[0],bt.tone[1],0,0]),j(15,tt(ft.g0)),j(16,tt(ft.g1)),j(17,tt(ft.g2)),j(18,tt(ft.g3)),j(19,tt(ft.stem)),j(20,tt(ft.soil)),j(21,ft.gk.map((e,o)=>o===1?e*(O==="Golden hour"?1.1:O==="Storm light"?.7:Q?.3:.8):e)),j(22,[_e,Ce,Qe,ee?1:0]),j(36,[W.pz,W.pil,W.pw,W.zE]),j(37,[W.tz,W.tw,W.b0,W.b1]),j(23,yo),j(24,Ne),j(25,Le),j(26,oo,Nn),j(27,[0,0,O0,K0]),j(28,ce(tt(bt.cl),bt.clK),fo[0]),j(29,tt(bt.cd),fo[1]),j(30,[fo[2]+Xr,1/(fo[3]*Hr),fo[4],fo[5]]),j(31,[.15,1,.45]),j(32,[.55,.2,.95]),j(33,[Q?.0098:.0092,Q?12:0,Q?1:0,Q?1:0]);const es=to*ts,os=Oo*ts,ho=e=>uo+e*4+3,Qa=e=>{Rt[ho(23)]=$n[0]+es*e,Rt[ho(24)]=$n[1]+os*e,Rt[ho(25)]=e*1.5};{const e=fo[0]+fo[1]*.3-ht[1];Rt[ho(18)]=es/e,Rt[ho(19)]=os/e}let ra=0,S0=0,ca=1,as=3,Za=3,la=3+2*t0,R0=3,po=0,Ja=!0;Qa(3);const e0=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,e0),t.bufferData(t.UNIFORM_BUFFER,Rt,t.DYNAMIC_DRAW);const jr=uo+3,ns=uo+9*4+2,ss=uo+12*4,rs=uo+27*4;let o0=0,a0=0,T0=0,k0=0;Na=K==="Lone tree"?Math.pow(At((ie[1]-O0)/K0,0,1),2):0;const re=p<=600?p:Math.round(p*.8),cs=(e,o,a,n,c,i)=>{const l=t.createTexture();return t.bindTexture(t.TEXTURE_2D,l),t.texImage2D(t.TEXTURE_2D,0,a,e,o,0,n,c,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),l},ia=[0,1,2].map(()=>cs(re,re,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR)),ls=t.createFramebuffer(),Qr=Math.max(8,re>>6),fa=At(Math.floor((-Math.tan(f0)/(Uo*1.06)*.5+.5)*re)-2,0,re-8);function is(e){e<=po||(t.bindFramebuffer(t.FRAMEBUFFER,ls),Ja&&(t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ia[ca],0),Ja=!1),t.viewport(0,0,re,re),t.enable(t.SCISSOR_TEST),t.scissor(0,po,re,e-po),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.depthMask(!1),t.colorMask(!0,!0,!0,!0),t.bindBufferBase(t.UNIFORM_BUFFER,0,e0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,B.noise),t.useProgram(B.skyb.p),t.bindVertexArray(q0),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),po=e)}const ua=Yo.length?1024:4,fs=cs(ua,ua,t.DEPTH_COMPONENT24,t.DEPTH_COMPONENT,t.UNSIGNED_INT,t.LINEAR);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_COMPARE_FUNC,t.LEQUAL);{t.bindBuffer(t.UNIFORM_BUFFER,e0),t.bindBufferBase(t.UNIFORM_BUFFER,0,e0),t.disable(t.BLEND),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,B.noise),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,B.leaf),t.bindFramebuffer(t.FRAMEBUFFER,ls),t.viewport(0,0,re,re),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.clearColor(0,0,0,1);for(let o=2;o>=0;o--)t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ia[o],0),o&&t.clear(t.COLOR_BUFFER_BIT);t.drawBuffers([t.COLOR_ATTACHMENT0]),t.useProgram(B.skyb.p),t.bindVertexArray(q0),t.drawArrays(t.TRIANGLES,0,3);const e=t.createFramebuffer();if(t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,fs,0),t.drawBuffers([t.NONE]),t.viewport(0,0,ua,ua),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),Yo.length){const o=Yo[0],a=[o[0],o[1],o[2]],n=o[3],c=n+4,i=_t(le([0,1,0],Ee)),l=le(Ee,i),d=new Float32Array(16);for(let f=0;f<3;f++)d[f*4]=i[f]/n,d[f*4+1]=l[f]/n,d[f*4+2]=-Ee[f]/c;d[12]=-m0(a,i)/n,d[13]=-m0(a,l)/n,d[14]=m0(a,Ee)/c,d[15]=1,Rt.set(d,16),j(34,i),j(35,l),Rt[uo+5*4+3]=1,t.bufferSubData(t.UNIFORM_BUFFER,0,Rt),t.useProgram(B.shd.p),t.bindVertexArray(Bn),t.drawArrays(t.TRIANGLES,0,st.n),x0.length&&(t.useProgram(B.shdl.p),t.bindVertexArray(Vn),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,x0.length))}t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindVertexArray(null),t.deleteFramebuffer(e),po=fa,Qa(la)}const $t=(jt-1)*2+1,wt=3,Gt=new Float32Array($t*wt*3),rc=new Float32Array($t*wt*3),mt=new Float32Array($t*6),us=new Float32Array($t*wt),Zr=[0,1,wt+1,0,wt+1,wt],ds=new Float32Array(256);for(let e=0;e<256;e++)ds[e]=Math.sin(e/256*6.283185);const hs=e=>ds[e*40.743665&255];for(let e=0;e<$t;e++)for(let o=0;o<wt;o++)us[e*wt+o]=(1-e*.03)*(e===$t-1||e===0?.78:1);const z0=$t*wt,Dt=new Float32Array(z0*be),ps=new Float64Array(so*z0),da=new Int32Array(($t-1)*(wt-1)*6);for(let e=0;e<so;e++)for(let o=0;o<z0;o++)ps[e*z0+o]=us[o]*(.94+.12*((e*7+o%wt*3)%5/4));for(let e=0;e<$t-1;e++)for(let o=0;o<wt-1;o++)for(let a=0;a<6;a++)da[(e*(wt-1)+o)*6+a]=(e*wt+o+Zr[a])*be;function Jr(){const e=vt.d;for(let o=0;o<so;o++){for(let r=0;r<$t;r++){const h=r>>1,v=r*6;for(let u=0;u<2;u++)for(let b=0;b<3;b++){const g=((o*jt+h)*2+u)*3+b;let y=U[g];if(r&1){const m=U[g+6],w=h>0?U[g-6]:y,M=h<jt-2?U[g+12]:m;y=.5*(y+m)+.0625*(y+m-w-M)}mt[v+u*3+b]=y}}const a=($t>>1)*6;Be((mt[a]+mt[a+3])*.5,(mt[a+2]+mt[a+5])*.5);const n=at(Ut,Vt),c=Math.min(.014,.0026*n),i=Ft*(6.1+o*.37),l=Ua[o];for(let r=0;r<$t;r++){const h=r*6,v=Math.max(0,r-1)*6,u=Math.min($t-1,r+1)*6,b=mt[h+3]-mt[h],g=mt[h+4]-mt[h+1],y=mt[h+5]-mt[h+2],m=mt[u]+mt[u+3]-mt[v]-mt[v+3],w=mt[u+1]+mt[u+4]-mt[v+1]-mt[v+4],M=mt[u+2]+mt[u+5]-mt[v+2]-mt[v+5];let T=g*M-y*w,F=y*m-b*M,E=b*w-g*m;const z=Math.sqrt(T*T+F*F+E*E)||1;T/=z,F/=z,E/=z;const X=Math.min(1,r/3),it=At((Ut*T+Vt*E)*.014,-.05,.05)*X;for(let J=0;J<wt;J++){const ut=J/(wt-1),H=it*4*ut*(1-ut)+c*X*(hs(r*1.15-i+J*1.7+o*1.3)+.5*hs(r*.7-i*1.63-J*2.3+o*2.9)),Qt=(r*wt+J)*3;Gt[Qt]=mt[h]+b*ut+T*H,Gt[Qt+1]=mt[h+1]+g*ut+F*H,Gt[Qt+2]=mt[h+2]+y*ut+E*H}}const d=o*z0;for(let r=0;r<$t;r++)for(let h=0;h<wt;h++){const v=(r*wt+h)*3,u=(r*wt+Math.max(0,h-1))*3,b=(r*wt+Math.min(wt-1,h+1))*3,g=(Math.max(0,r-1)*wt+h)*3,y=(Math.min($t-1,r+1)*wt+h)*3,m=Gt[b]-Gt[u],w=Gt[b+1]-Gt[u+1],M=Gt[b+2]-Gt[u+2],T=Gt[y]-Gt[g],F=Gt[y+1]-Gt[g+1],E=Gt[y+2]-Gt[g+2],z=w*E-M*F,X=M*T-m*E,it=m*F-w*T,J=Math.sqrt(z*z+X*X+it*it)||1,ut=r*wt+h,H=ut*be,Qt=ps[d+ut];Dt[H]=Gt[v],Dt[H+1]=Gt[v+1],Dt[H+2]=Gt[v+2],Dt[H+3]=z/J,Dt[H+4]=X/J,Dt[H+5]=it/J,Dt[H+6]=l[0]*Qt,Dt[H+7]=l[1]*Qt,Dt[H+8]=l[2]*Qt,Dt[H+9]=1}const f=vt.n,A=Math.min(da.length,Math.floor((vt.cap-f)/6)*6);for(let r=0;r<A;r++){const h=da[r],v=(f+r)*be;e[v]=Dt[h],e[v+1]=Dt[h+1],e[v+2]=Dt[h+2],e[v+3]=Dt[h+3],e[v+4]=Dt[h+4],e[v+5]=Dt[h+5],e[v+6]=Dt[h+6],e[v+7]=Dt[h+7],e[v+8]=Dt[h+8],e[v+9]=Dt[h+9]}if(vt.n=f+A,A<da.length)return}}function $r(){vt.n=0;const e=tt("#5a5046");let o=null;for(let l=0;l<=14;l++){const d=l/14;Va(d,Bt);const f=4*d*(1-d),A=[Bt[0]+Qo*f,Bt[1],Bt[2]+Zo*f];o&&Se(vt,o,A,.014,e,0),o=A}Jr();const a=tt(ao?"#c9d2d8":"#c8b07a"),n=[ie[0]+o0*Na,ie[1],ie[2]+a0*Na];Se(vt,[n[0],n[1]+.02,n[2]],[n[0],n[1]-.06,n[2]],.01,e,0);for(let l=0;l<ro;l++){const d=l/ro*6.283,f=Math.cos(d)*j0,A=Math.sin(d)*j0,r=[n[0]+f,n[1]-.06,n[2]+A],h=[r[0]+ze[l*2]*.1,r[1]-.1,r[2]+ze[l*2+1]*.1],v=[h[0]+ze[l*2]*Q0[l],h[1]-Q0[l],h[2]+ze[l*2+1]*Q0[l]];Se(vt,r,h,.004,e,0),Se(vt,h,v,.022,a,3)}const c=[n[0]+se[0]*Ue,n[1]-.06-Ue,n[2]+se[1]*Ue];if(Se(vt,[n[0],n[1]-.06,n[2]],c,.004,e,0),Se(vt,[c[0]-.03,c[1],c[2]],[c[0]+.03,c[1],c[2]],.02,V0,0),Se(vt,c,[c[0]+se[0]*.25,c[1]-.22,c[2]+se[1]*.25],.06,ce(Ua[0],.9),1),lt){const l=lt.p,d=[tt("#c83a2a"),tt("#e8d6a0")];let f=Ct;for(let E=1;E<=16;E++){const z=E/16,X=[Ct[0]+(l[0]-Ct[0])*z,Ct[1]+(l[1]-Ct[1])*z-2.2*4*z*(1-z)*.5,Ct[2]+(l[2]-Ct[2])*z];Se(vt,f,X,.025+z*.03,e,0),f=X}Be(l[0],l[2]);const A=at(Ut,Vt)+.001,r=Ut/A,h=Vt/A,v=[0,1,0],u=_t(le(v,[r,0,h])),b=.5,g=[-r*b,1,-h*b],y=_t(g),m=[l[0]+y[0]*1.3,l[1]+y[1]*1.3,l[2]+y[2]*1.3],w=[l[0]-y[0]*.9,l[1]-y[1]*.9,l[2]-y[2]*.9],M=[l[0]-u[0]*.9,l[1],l[2]-u[2]*.9],T=[l[0]+u[0]*.9,l[1],l[2]+u[2]*.9];Xe(vt,m,M,l,d[0],1),Xe(vt,m,l,T,d[1],1),Xe(vt,M,w,l,d[1],1),Xe(vt,l,w,T,d[0],1);const F=lt.tail;for(let E=1;E<10;E++)Se(vt,F[(E-1)*2],F[E*2],.16,d[E%2],1)}const i=tt(N==="Rooks"?"#1a1816":"#2a2622");for(const l of lo){const d=at(l.a[0],l.a[2])+1e-4,f=[l.a[0]/d,0,l.a[2]/d],A=[f[2],0,-f[0]],r=Nr,h=l.flap>.5?Math.sin(l.ph):.15+Math.sin(l.ph)*.05,v=l.p,u=[v[0]+f[0]*r*.35,v[1],v[2]+f[2]*r*.35],b=[v[0]-f[0]*r*.4,v[1],v[2]-f[2]*r*.4],g=h*r*.35,y=N==="Swifts"?.32:.1,m=[v[0]-A[0]*r*.5-f[0]*r*y,v[1]+g,v[2]-A[2]*r*.5-f[2]*r*y],w=[v[0]+A[0]*r*.5-f[0]*r*y,v[1]+g,v[2]+A[2]*r*.5-f[2]*r*y],M=[v[0]-f[0]*r*.08,v[1],v[2]-f[2]*r*.08];Xe(vt,u,m,M,i,2),Xe(vt,u,M,w,i,2);const T=[b[0]-A[0]*r*.1,v[1],b[2]-A[2]*r*.1],F=[b[0]+A[0]*r*.1,v[1],b[2]+A[2]*r*.1];Xe(vt,M,T,F,i,2),Se(vt,u,b,r*.09,i,2)}}let ha=0,n0=0;function tc(){let e=0;const o=(a,n,c,i,l,d,f,A,r,h,v,u)=>{const b=e++*Te;ne[b]=a,ne[b+1]=n,ne[b+2]=c,ne[b+3]=i,ne[b+4]=l,ne[b+5]=d,ne[b+6]=f,ne[b+7]=A,ne[b+8]=r,ne[b+9]=h,ne[b+10]=v,ne[b+11]=u};for(const a of Yt)o(a.x,a.y-.02,a.z,a.sz*(.45+.55*Math.sqrt(a.full)),1,1,1,.25+.75*a.full,5,a.h,a.r2,a.fa);n0=e;for(let a=0;a<Kt;a++){if(fe[a]===0)continue;const n=ko[a*3],c=ko[a*3+1],i=ko[a*3+2];if(zo){const l=Math.pow(Math.max(0,Math.sin(ue[a]*(1.7+a%5*.2)+a)),6);if(l<.02)continue;o(Nt[a],qt[a],Lt[a],.09,n*2.2,c*2.2,i*2.2,l,3,0,0,0)}else ot?(o(Nt[a],qt[a],Lt[a],.045,n,c,i,1,1,0,H0[a],0),On&&o(Nt[a],qt[a],Lt[a],.12,.25,.7,.9,.55,3,0,0,0)):o(Nt[a],qt[a],Lt[a],.02,n,c,i,1,2,0,H0[a],a*.7)}if(Ht>0||io>0){for(const a of Wa){let n;if(Ht>0)a.a+=.12+Ht*.15,a.r=1.6-Ht*1.1+Math.sin(a.a*.7)*.25,n=[Co[0]+Math.cos(a.a)*a.r*Po,Co[1]+Math.sin(a.a*1.3)*.25*Po,Co[2]+Math.sin(a.a)*a.r*Po*.6],a.p=n;else{for(let i=0;i<3;i++)a.p[i]+=a.v[i]*Po*.04;n=a.p}const c=Ht>0?.35+Ht*.5:io;o(n[0],n[1],n[2],.05*Po,1.4,1.2,.9,c*.8,3,0,0,0)}Ht>0&&o(Co[0],Co[1],Co[2],(.25+Ht*.5)*Po,.9,.85,.7,.25+.3*Ht,3,0,0,0)}ha=e}function vs(){if(Ft>=R0+t0){is(re);const o=ra===S0?3-S0-ca:ra;ra=S0,S0=ca,ca=o,as=Za,Za=la,R0+=t0,la=R0+2*t0,po=fa,Ja=!0,Qa(la)}Rt[ho(20)]=Ft-as,Rt[ho(31)]=Ft-Za,Rt[ho(32)]=At((Ft-R0)/t0,0,1),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,p,p),t.enable(t.SCISSOR_TEST),t.scissor(0,0,p,p),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),t.clearColor(0,0,0,1),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.colorMask(!0,!0,!0,!1),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.STENCIL_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.disable(t.RASTERIZER_DISCARD),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL);{const o=me.base,a=$s(o)/o;Rt[ss]=Ge*a,Rt[ss+1]=We*a}const e=Ft*4.5;Rt[jr]=Ft,Rt[ns]=Jn[0]+to*e,Rt[ns+1]=Jn[1]+Oo*e,Rt[rs]=o0,Rt[rs+1]=a0,t.bindBuffer(t.UNIFORM_BUFFER,e0),t.bufferData(t.UNIFORM_BUFFER,Rt,t.DYNAMIC_DRAW),t.bindBufferBase(t.UNIFORM_BUFFER,0,e0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,B.noise),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,ia[ra]),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,ia[S0]),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,B.leaf),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,fs),t.activeTexture(t.TEXTURE1),Tn^=1,t.bindTexture(t.TEXTURE_2D,ar[Tn]),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.bindBuffer(t.PIXEL_UNPACK_BUFFER,null);for(let o=0;o<gt;o++)kn[o]=Math.sqrt(Et[o]*Et[o]+Mt[o]*Mt[o]),B0[o*4]=ka(nr[o]),B0[o*4+1]=ka(sr[o]),B0[o*4+2]=ka(rr[o]);if(t.texSubImage2D(t.TEXTURE_2D,0,0,0,ct,xt,t.RGBA,t.HALF_FLOAT,B0),$r(),t.useProgram(B.solid.p),t.bindVertexArray(Bn),t.drawArrays(t.TRIANGLES,0,st.n),t.bindBuffer(t.ARRAY_BUFFER,Dn),t.bufferData(t.ARRAY_BUFFER,vt.d.subarray(0,Math.max(1,vt.n)*be),t.DYNAMIC_DRAW),vt.n&&(t.bindVertexArray(gr),t.drawArrays(t.TRIANGLES,0,vt.n)),t.useProgram(B.grass.p),t.bindVertexArray(pr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,13,Xo),t.bindVertexArray(vr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,7,qo-Xo),Pa&&(t.bindVertexArray(xr),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,13,Pa)),D0?(t.useProgram(B.water.p),t.bindVertexArray(D0),t.drawArrays(t.TRIANGLE_STRIP,0,Cn)):B.water&&!B.wOK&&B.warm()&&(t.bindVertexArray(B.wVAO),t.scissor(0,0,0,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.scissor(0,0,p,p)),t.useProgram(B.terr.p),t.bindVertexArray(Fn),t.drawElements(t.TRIANGLES,eo.length,t.UNSIGNED_SHORT,0),tc(),t.bindBuffer(t.ARRAY_BUFFER,Ba),t.bufferData(t.ARRAY_BUFFER,ne.subarray(0,Math.max(1,ha)*Te),t.DYNAMIC_DRAW),t.useProgram(B.spr.p),t.enable(t.SAMPLE_ALPHA_TO_COVERAGE),W0&&(t.bindVertexArray(Vn),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,W0)),t.bindVertexArray(In),n0&&t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,n0),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.useProgram(B.sky.p),t.depthMask(!1),t.bindVertexArray(q0),t.drawArrays(t.TRIANGLES,0,3),ha>n0){t.useProgram(B.spr.p),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.bindVertexArray(In),t.bindBuffer(t.ARRAY_BUFFER,Ba);for(let o=1;o<=3;o++)t.vertexAttribPointer(o,4,t.FLOAT,!1,Te*4,n0*Te*4+(o-1)*16);t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,ha-n0);for(let o=1;o<=3;o++)t.vertexAttribPointer(o,4,t.FLOAT,!1,Te*4,(o-1)*16);t.disable(t.BLEND)}{const o=Math.min(re,fa+Math.ceil((Ft-R0)/(t0*.9)*(re-fa)));(o-po>=Qr||o>=re&&o>po)&&is(o)}t.depthMask(!0),t.bindVertexArray(null),t.colorMask(!0,!0,!0,!0),t.disable(t.SCISSOR_TEST),!B.wOK&&!B.water&&++B.nd>=4&&(B.nd>=6?B.later():B.pre(B.nd-4))}const F0=1/30;let pa=0;function xs(e,o){or(e),Mr(e),Fr(e),Pr(e,o),_r(e),Lr(e),K==="Lone tree"&&(Be(yt,dt),T0+=((Ut*.055-o0)*7.5-T0*.9)*e,k0+=((Vt*.055-a0)*7.5-k0*.9)*e,o0+=T0*e,a0+=k0*e),io>0&&(io=Math.max(0,io-e*.8)),Ft+=e}const ms=()=>[Et,Mt,Ao,go,un,Sn,Aa,ga,Ea,Ma,Nt,qt,Lt,b0,no,w0,fe,ke,ue,H0,ko,U,It,ze,co,Ia];if(_){const e=_.sim,o=ms();for(let n=0;n<o.length;n++)o[n].set(e.a[n]);De.length=0;for(const n of e.fronts)De.push(Object.assign({},n));for(let n=0;n<Yt.length;n++)Yt[n].full=e.full[n];for(let n=0;n<lo.length;n++){const c=lo[n],i=e.bird[n];for(let l=0;l<3;l++)c.p[l]=i[l],c.a[l]=i[3+l];c.ph=i[6],c.flap=i[7]}if(lt){const n=e.kite;for(let c=0;c<3;c++)lt.p[c]=n[c],lt.o[c]=n[3+c];for(let c=0;c<lt.tail.length;c++)for(let i=0;i<3;i++)lt.tail[c][i]=n[6+c*3+i]}const a=e.n;[Ft,L0,Ut,Vt,Eo,Mo,Qo,Zo,o0,a0,T0,k0,io]=a,se[0]=a[13],se[1]=a[14],Fe[0]=a[15],Fe[1]=a[16],Bt[0]=a[17],Bt[1]=a[18],Bt[2]=a[19],S.ld(e.rt)}else{for(let o=0;o<90;o++)xs(F0,!1);const e=[];if(lt){e.push(...lt.p,...lt.o);for(const o of lt.tail)e.push(o[0],o[1],o[2])}k.sim={a:ms().map(o=>o.slice()),fronts:De.map(o=>Object.assign({},o)),full:Yt.map(o=>o.full),bird:lo.map(o=>[o.p[0],o.p[1],o.p[2],o.a[0],o.a[1],o.a[2],o.ph,o.flap]),kite:e,n:[Ft,L0,Ut,Vt,Eo,Mo,Qo,Zo,o0,a0,T0,k0,io,se[0],se[1],Fe[0],Fe[1],Bt[0],Bt[1],Bt[2]],rt:S.st()},Es(P,k)}return vs(),(e,o)=>{o=Math.min(o||F0,.25),Vr(o),pa+=o;let a=0;for(;pa>=F0-1e-6&&a<5;)xs(F0,!0),pa-=F0,a++;a===5&&(pa=0),Wr(o),vs()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
