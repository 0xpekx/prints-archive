// Heat Lightning: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/533.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Xo){Xo&&function(){"use strict";const Go={yaw:0,pitch:0,x:0,y:0,z:0},K=(o,t,ht)=>o<t?t:o>ht?ht:o,ee=(o,t,ht)=>{const N=K((ht-o)/(t-o),0,1);return N*N*(3-2*N)},Te=[-30,0,-14],Ke=[44,17,26],Le=[176,104,68],re=[72,44,28],Ne=1024,Oe=384,qo=2048,Ho=768,Ce=2048,Yt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,we=`
#define BOX0 vec3(-30., 0., -14.)
#define BOXS vec3(44., 17., 26.)
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
uint hu(uint x) { x ^= x >> 16u; x *= 0x7feb352du; x ^= x >> 15u; x *= 0x846ca68bu; x ^= x >> 16u; return x; }
float hf(uint x) { return float(hu(x) >> 8u) * (1. / 16777216.); }
vec3 dtc(vec3 p) { vec3 g = (p - BOX0) / BOXS; return vec3(g.x, g.z, g.y); }
`,Mo=`
uniform sampler3D uN3;
float n3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN3, (i + f + .5) / 64., 0.).r; }
`,Yo=`
uniform vec4 uW[3];
void wray(vec2 uv, out vec3 ro, out vec3 rd) {
  float a = mix(uW[0].x, uW[0].y, uv.x), b = mix(uW[0].z, uW[0].w, uv.y);
  rd = vec3(sin(a) * cos(b), sin(b), cos(a) * cos(b));
  ro = vec3(0., .002 + uW[2].y, -uW[1].x);
}
vec2 boxT(vec3 ro, vec3 rd) {
  vec3 iv = 1. / (rd + mix(vec3(-1e-7), vec3(1e-7), step(0., rd)));
  vec3 t0 = (BOX0 - ro) * iv, t1 = (BOX0 + BOXS - ro) * iv;
  vec3 mn = min(t0, t1), mx = max(t0, t1);
  return vec2(max(max(mn.x, mn.y), max(mn.z, 0.)), min(min(mx.x, mx.y), mx.z));
}
float detail(vec3 p) { return (n3(p * 2.3 + 11.) - .5) * .7 + (n3(p * 5.3 + 3.) - .5) * .3; }
`,Sa=Yt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",Ba=Yt+we+Mo+`
uniform vec4 uS[5];
uniform sampler2D uSrc;   // the cells: x, z, radius, top (km)
uniform float uLayer;
out vec4 o;
float bil(vec3 p) { return abs(2. * n3(p) - 1.); }
float smax(float a, float b, float k) { float h = clamp(.5 + .5 * (a - b) / k, 0., 1.); return mix(b, a, h) + k * h * (1. - h); }
void main() {
  vec3 g = vec3(gl_FragCoord.x / 176., (uLayer + .5) / 68., gl_FragCoord.y / 104.);
  vec3 p = BOX0 + g * BOXS;
  float HB = uS[0].x, YA = uS[0].y, YT = uS[0].z, YO = uS[0].w;
  float LA = uS[1].x, WA = uS[1].y, WG = uS[1].z, BL = uS[1].w;
  vec3 SEED = uS[3].xyz;
  vec2 AD = uS[4].zw, AN = vec2(-AD.y, AD.x);
  float y = p.y;
  // convective cells: each a stack of soft bubbles leaning downwind, wide at the base, turreted, rounded on top
  float conv = -9., rainC = -9., Cr = 4.;
  int nc = int(uS[2].y);
  for (int k = 0; k < nc; k++) {
    vec4 C = texelFetch(uSrc, ivec2(k, 0), 0);
    float H = C.w - HB, fk = float(k) * 7.31 + SEED.x;
    vec2 q0 = p.xz - C.xy - AD * uS[2].w * max(y - HB, 0.) * (C.w / 12.) - C.z * .14 * vec2(sin(y * .55 + fk), cos(y * .42 + fk * 1.7));
    float hn = clamp((y - HB) / H, 0., 1.);
    // the column: broad flat base, waisted, narrowing to the top
    float R = C.z * (.95 - .4 * smoothstep(0., .35, hn) + .05 * smoothstep(.45, .8, hn) - .22 * smoothstep(.8, 1., hn));
    float yc = C.w - C.z * .55;
    float col = y < yc ? R - length(q0) : R - length(vec3(q0, (y - yc) * 1.6));
    // turrets: four bubbles up the column, the newest hardest on the upwind flank
    float tur = -9.;
    for (int j = 0; j < 6; j++) {
      float fj = float(j), u = (fj + .6) / 6., an = fk + fj * 2.399;
      vec3 c = vec3(C.z * .42 * sin(an), HB + H * (.16 + .76 * u), C.z * .42 * cos(an));
      float rb = C.z * (.6 - .18 * u) * (.75 + .5 * fract(sin(fk + fj * 12.9) * 43758.5));
      vec3 dq = vec3(q0.x - c.x, (y - c.y) * 1.1, q0.y - c.z);
      tur = smax(tur, rb - length(dq), .4);
    }
    float cl = smax(col, tur, .8);
    cl = min(cl, y - HB);
    Cr = cl > conv ? C.z : Cr;
    conv = smax(conv, cl, .5);
    rainC = max(rainC, (C.z * 1.05 - length(q0 + AD * .8)) / C.z - 9. * (1. - smoothstep(5., 9., C.w)));
  }
  // overshooting dome over the main tower
  vec2 A0 = uS[4].xy;
  if (YO > 0.) {
    vec3 dq = (p - vec3(A0.x, YT - .2, A0.y)) / vec3(2.8, YO - YT + .2, 2.5);
    conv = max(conv, (1. - length(dq)) * 1.6);
  }
  // anvil, fanning out downwind from the main tower: thick at the root, thin as a blade at its edge, a short lip upwind
  vec2 rel = p.xz - A0;
  float s = dot(rel, AD), l = dot(rel, AN);
  float sN = clamp(s / LA, 0., 1.);
  float hw = WA + WG * max(s, 0.);
  float ytop = YT + .3 * (1. - sN) - .8 * sN * sN + .25 * sin(s * .4 + SEED.y) * sN;
  float ybot = mix(YA, YT - .55, pow(sN, .7));
  ybot += (1. - smoothstep(-BL, -BL * .1, s)) * (ytop - ybot - .25);   // the upwind lip thins to an edge
  ybot += 1.1 * (n3(vec3(p.x * .22, 3.7, p.z * .22) + SEED) - .5) + .45 * (n3(vec3(p.x * .6, 9.1, p.z * .6) + SEED) - .5);   // a sagging, uneven underside
  float mm = 0.;
  if (uS[2].x > 0.) {
    vec2 cc = p.xz / 1.15, ci = floor(cc);
    for (int ij = 0; ij < 9; ij++) {
      vec2 id = ci + vec2(float(ij % 3 - 1), float(ij / 3 - 1));
      uint hh = hu(uint(id.x + 512.) * 7919u + uint(id.y + 512.) * 104729u);
      vec2 oc = id + .2 + .6 * vec2(hf(hh), hf(hh ^ 0x55u));
      float rr = .42 + .3 * hf(hh ^ 0x99u);
      float dd = length(cc - oc) * 1.15 / rr;
      mm = max(mm, rr * .85 * sqrt(max(1. - dd * dd, 0.)));
    }
    mm *= uS[2].x * smoothstep(-1., 2., s) * (1. - smoothstep(LA * .45, LA * .75, s));
  }
  float sc = (LA - BL) * .5, hl = (LA + BL) * .5;
  float plan = (1. - length(vec2((s - sc) / hl, l / hw))) * min(hw, hl) * .35;
  float anv = min(min(ytop - y, y - ybot + mm), plan);
  if (LA < .5) anv = -9.;
  vec3 pn = p + SEED * 7.;
  float lob = bil(pn * .5) + bil(pn * 1.1 + 3.1) * .55 + bil(pn * 2.3 + 7.7) * .22 - .89;
  float fib = (n3(vec3(dot(pn.xz, AD) * .2, pn.y * 1.7, dot(pn.xz, AN) * .7)) - .5) * 1.1 + (n3(pn * vec3(.7, 3.2, 1.9) + 5.) - .5) * .45;
  float wA = smoothstep(-.6, .6, anv - conv - .9);   // turrets keep their knobs up into the anvil's root
  float bs = mix(.35, 1., smoothstep(HB, HB + 1.2, y));
  float F = max(conv, anv) + mix(lob * 1.55 * bs * clamp(Cr / 3.6, .5, 1.), fib, wA);   // small cells get smaller knobs (no holes)
  // a tower is solid to the eye: the erosion bites only a shell (no holes clean through), and nothing grows far off it (no crumbs)
  F = mix(min(max(F, conv * 1.6 - .25), conv + .55), F, wA);
  F = min(F, y - HB + .1 * (n3(pn * 1.7) - .5));
  float dens = mix(1., mix(.8, .2, sN) * smoothstep(-.4, 1.6, plan + fib * .8), wA);
  // rain: a grey veil from the base down to the ground under the grown cells
  float rain = 0.;
  if (y < HB + .4) {
    float st = n3(vec3(p.x * 1.6, p.y * .25, p.z * 1.6) + SEED);
    rain = uS[2].z * smoothstep(0., .5, rainC + (st - .5) * .5) * (.45 + .55 * st) * smoothstep(-.05, .6, y) * (1. - smoothstep(HB + .1, HB + .4, y) * .5);
  }
  o = vec4(clamp(F / 3. + .5, 0., 1.), dens, rain, 1.);
}`,Ia=Yt+we+Mo+Yo+`
uniform sampler3D uDen;
uniform float uMode;
uniform vec4 uMo;
out vec4 o;
void mainMW();
void mainBase() {
  vec2 uv = gl_FragCoord.xy / vec2(${Ne}., ${Oe}.);
  vec3 ro, rd; wray(uv, ro, rd);
  vec2 tb = boxT(ro, rd);
  float T = 1., amb = 0., tE = -1., t = tb.x, tEnd = tb.y;
  if (tb.y > tb.x) {
    t += hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u) * .05;
    for (int i = 0; i < 340; i++) {
      if (t > tb.y || T < .01) break;
      vec3 p = ro + rd * t;
      vec4 d = textureLod(uDen, dtc(p), 0.);
      float F = (d.r - .5) * 3.;
      float st;
      if (F < -.6 && d.b < .004) st = max(.06, (-F - .55) * .8);
      else {
        float sig = smoothstep(0., .3, F + detail(p)) * d.g * uW[1].y + d.b * uW[1].z;
        st = .05 + .1 * (1. - smoothstep(0., 3., sig));
        float a = 1. - exp(-sig * st);
        float A = .3 + .7 * smoothstep(uW[1].w, uW[2].x, p.y);
        // moon or twilight: the cloud's own body toward the light shades its far side
        vec4 dm = textureLod(uDen, dtc(p + uMo.xyz * .7), 0.);
        A += uMo.w * 5. * exp(-max((dm.r - .5) * 3. + .4, 0.) * 2.2);
        amb += T * a * A;
        T *= 1. - a;
        if (tE < 0. && T < .92) tE = t;
      }
      t += st;
    }
    tEnd = min(t, tb.y);
  }
  if (tE < 0.) tE = tb.y;
  o = vec4(T, amb, max(tE, 0.) * .01, max(tEnd, 0.) * .01);
}
void main() { if (uMode > .5) mainMW(); else mainBase(); }
`+`
uniform sampler2D uN;
uniform vec4 uM;
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
uniform float uK;
float fbm(vec2 p) { float s = 0., a = .5; int n = int(uK); for (int i = 0; i < n; i++) { s += a * n2(p); p = p * 2.03 + 17.1; a *= .5; } return s; }
void mainMW() {
  vec2 uv = gl_FragCoord.xy / vec2(2048., 448.);
  float lon = (uv.x - .5) * 6.2831853, lat = (uv.y - .5) * 1.2;
  vec2 p = vec2(lon * 9., lat * 9.) + uM.xy;
  float cl = fbm(p * .6);
  float w = .07 + .05 * exp(-lon * lon / .5);
  float disc = exp(-pow((lat - .02 * sin(lon * 1.7)) / (w * 1.3), 2.)) * (.22 + .78 * exp(-lon * lon / 1.2));
  float bulge = exp(-(lon * lon / .05 + lat * lat / .03));
  float I = disc * (.4 + 1.3 * cl * cl) + bulge * 1.6 * (.7 + .5 * cl);
  float lane = .025 + .03 * sin(lon * 2.3 + 1.);
  float rift = smoothstep(.5, .62, cl * .6 + .62 * exp(-pow((lat - lane) / (.035 + .02 * smoothstep(0., 1., lon)), 2.))) * smoothstep(-.5, .1, lon) * (1. - smoothstep(.9, 1.6, lon));
  float fil = smoothstep(.48, .78, fbm(p * 1.3 + 40.)) * exp(-abs(lat) / .12);
  float dust = uM.z * (rift * (.6 + .6 * fbm(p * 2.5)) + fil * .8);
  I *= exp(-1.2 * dust * smoothstep(.0, .5, I));
  vec3 col = mix(vec3(.72, .8, 1.), vec3(1., .82, .6), clamp(exp(-lon * lon / .4) * .8 + bulge * .3, 0., 1.));
  float neb = smoothstep(.8, .95, fbm(p * 3.1 + 70.)) * exp(-abs(lat) / .04) * exp(-lon * lon / 1.5);
  col = col * I + vec3(.9, .25, .35) * neb * .5;
  o = vec4(clamp(col * uM.w, 0., 1.), clamp(I * .8, 0., 1.));
}`,Pa=Yt+we+`
uniform sampler3D uDen;
uniform sampler2D uSrc;
uniform vec4 uL;
uniform float uLayer;
out vec4 o;
void main() {
  vec3 g = vec3(gl_FragCoord.x / ${re[0]}., (uLayer + .5) / ${re[2]}., gl_FragCoord.y / ${re[1]}.);
  vec3 p = BOX0 + g * BOXS;
  float f = 0., f2 = 0.;
  int n = int(uL.x);
  for (int k = 0; k < 8; k++) {
    if (k >= n) break;
    vec4 S = texelFetch(uSrc, ivec2(k, 0), 0);
    vec3 dv = S.xyz - p; float dd = length(dv);
    float tau = 0.;
    for (int j = 0; j < 14; j++) {
      vec4 d = textureLod(uDen, dtc(p + dv * ((float(j) + .5) / 14.)), 0.);
      tau += smoothstep(-.15, .35, (d.r - .5) * 3.) * d.g + d.b * .15;
    }
    tau *= uL.y * dd / 14.;
    float fall = S.w / (1. + dd * dd / (uL.z * uL.z));
    f += fall * exp(-tau);
    f2 += fall * (uL.w + .07 * (exp(-tau * .2) - exp(-tau)));
  }
  o = vec4(sqrt(clamp(f, 0., 1.)), sqrt(clamp(f2, 0., 1.)), 0., 1.);
}`,Ua=Yt+we+Mo+Yo+`
uniform sampler3D uDen, uLV;
uniform sampler2D uBase;
uniform vec4 uLc;
out vec4 o;
vec2 lv(vec3 p) { vec2 v = textureLod(uLV, dtc(p), 0.).rg; return v * v; }
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(${Ne}., ${Oe}.);
  vec3 ro, rd; wray(uv, ro, rd);
  vec2 tb = boxT(ro, rd);
  vec2 rad = vec2(0.);
  if (tb.y > tb.x) {
    vec4 b = texture(uBase, uv);
    float tE = b.b * 100., tX = b.a * 100.;
    float a1 = clamp(tE - .5, tb.x, tb.y);
    float dA = (a1 - tb.x) / 10.;
    for (int i = 0; i < 10; i++) rad += lv(ro + rd * (tb.x + (float(i) + .5) * dA)) * dA * uW[2].z;
    float c1 = min(min(tX + .5, tb.y), a1 + 7.);
    float dt = max(c1 - a1, 0.) / 40.;
    float T = 1., t = a1 + dt * hf(uint(gl_FragCoord.x) * 3121u + uint(gl_FragCoord.y) * 7411u);
    int ns = int(uLc.w);
    for (int i = 0; i < 40; i++) {
      if (T < .015) break;
      vec3 p = ro + rd * t;
      vec4 d = textureLod(uDen, dtc(p), 0.);
      float sig = smoothstep(0., .3, (d.r - .5) * 3. + detail(p)) * d.g * uW[1].y + d.b * uW[1].z;
      float a = 1. - exp(-sig * dt);
      vec2 L = lv(p);
      if (a > .004) {
        // lobe-scale self-shadow toward the flash: what the coarse light volume can't resolve
        vec3 sd = normalize(uLc.xyz - p);
        float occ = 0.;
        for (int j = 0; j < ns; j++) {
          vec3 q = p + sd * (.12 + .2 * float(j));
          vec4 e = textureLod(uDen, dtc(q), 0.);
          occ += smoothstep(0., .3, (e.r - .5) * 3. + detail(q));
        }
        L *= vec2(.05 + .95 * exp(-occ * .9), .3 + .7 * exp(-occ * .45));
      }
      rad += T * (a + uW[2].z * dt) * L;
      T *= 1. - a;
      t += dt;
    }
  }
  vec2 v = sqrt(rad / 16.);
  o = vec4(v, v);
}`,Wa=Yt+`
layout(location = 0) in vec4 aS;
layout(location = 1) in vec4 aP;
uniform vec2 uRes;
out vec3 vL; out vec2 vP;
void main() {
  int id = gl_VertexID;
  float cx = (id == 1 || id == 4 || id == 5) ? 1. : 0.;
  float cy = (id == 2 || id == 3 || id == 5) ? 1. : -1.;
  vec2 a = aS.xy, b = aS.zw, dv = b - a;
  float L = length(dv);
  vec2 dir = L > 1e-4 ? dv / L : vec2(1., 0.), nr = vec2(-dir.y, dir.x);
  float hw = aP.x * 5. + 1.5;
  float al = -hw + (L + 2. * hw) * cx;
  vec2 pos = a + dir * al + nr * hw * cy;
  vL = vec3(al, hw * cy, L);
  vP = aP.xy;
  gl_Position = vec4(pos / uRes * 2. - 1., 0., 1.);
}`,Xa=Yt+`
in vec3 vL; in vec2 vP;
out vec4 o;
void main() {
  float dx = max(max(-vL.x, vL.x - vL.z), 0.);
  float d = length(vec2(dx, vL.y));
  float w = vP.x;
  float v = vP.y * (exp(-d * d / (.72 * w * w)) + .1 * exp(-d * d / (12. * w * w)));
  o = vec4(v, v, 0., 0.);
}`,To=`
uniform vec4 uC[40];
out vec4 o;
#define TIME uC[0].x
#define SIZE uC[0].y
#define TANH uC[0].z
#define IENV uC[0].w
#define EYE uC[1].xyz
#define EXPO uC[1].w
#define CR uC[2].xyz
#define CU uC[3].xyz
#define WAMP uC[3].w
#define CF uC[4].xyz
#define SEX uC[5].xy
#define SEZ uC[5].zw
#define WIN uC[6]
#define FA uC[7].x
#define FB uC[7].y
#define BA uC[7].z
#define BB uC[7].w
#define FCOL uC[8].rgb
#define MWK uC[9].w
#define AGK uC[10].w
#define DOMEK uC[11].w
#define WIND uC[12].xy
#define RBASE uC[12].z
#define RLINE uC[12].w
#define DCS uC[19].xy
#define DU uC[19].z
#define NREED uC[19].w
#define CAB uC[20]
#define LS uC[21].xyz
#define STARK uC[21].w
#define DOMEAZ uC[22].xy
#define MIST uC[22].z
#define AMBK uC[22].w
#define BOLTC uC[23].rgb
#define DOCK uC[26]
#define CAB2 uC[27]
#define I2 int(DOCK.w)
#define MOOND uC[32]
#define MOONS uC[33]
#define TWD uC[34]
#define FWARM uC[35].rgb
#define AMBC uC[36].rgb
#define DTINT uC[37].rgb
#define EMB uC[38]
uniform sampler2D uN;
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }

`,Ga=Yt+we+To+`
uniform sampler2D uProf, uWN;
// the dock: deck planks, fascia boards and posts, traced analytically in the dock's frame
float dockT(vec3 o, vec3 d, out vec3 n, out vec4 di) {
  vec2 rx = DCS, fx = vec2(DCS.y, -DCS.x);
  vec2 oo = o.xz + DU * rx;
  vec3 lo = vec3(dot(oo, rx), o.y, dot(oo, fx));
  vec3 ld = vec3(dot(d.xz, rx), d.y, dot(d.xz, fx));
  float W0 = DOCK.x, W1 = DOCK.y, DY = DOCK.z;
  float tb = 1e9; vec3 nl = vec3(0., 1., 0.); di = vec4(0.);
  vec3 iv = 1. / (ld + mix(vec3(-1e-7), vec3(1e-7), step(0., ld)));
  vec3 ta = (vec3(-1.3, -3., W0 - .3) - lo) * iv, tc = (vec3(1.3, 1.4, W1 + .3) - lo) * iv;
  vec3 tmn = min(ta, tc), tmx = max(ta, tc);
  float tn = max(max(tmn.x, tmn.y), max(tmn.z, 0.)), tf = min(min(tmx.x, tmx.y), tmx.z);
  if (tf > tn) {
    if (ld.y < 0. && lo.y > DY) {
      float t = (DY - lo.y) / ld.y; vec3 p = lo + ld * t;
      if (abs(p.x) < .95 && p.z > W0 && p.z < W1) { tb = t; nl = vec3(0., 1., 0.); di = vec4(1., p.x, p.z, p.y); }
    }
    if (ld.y > 0. && lo.y < DY - .25) {
      float t = (DY - .25 - lo.y) / ld.y; vec3 p = lo + ld * t;
      if (t < tb && abs(p.x) < .95 && p.z > W0 && p.z < W1) { tb = t; nl = vec3(0., -1., 0.); di = vec4(4., p.x, p.z, p.y); }
    }
    if (abs(lo.x) > .95) {
      float sx = sign(lo.x);
      float t = (sx * .95 - lo.x) * iv.x; vec3 p = lo + ld * t;
      if (t > 0. && t < tb && p.y > DY - .26 && p.y < DY && p.z > W0 && p.z < W1) { tb = t; nl = vec3(sx, 0., 0.); di = vec4(2., p.z, p.y, sx); }
    }
    if (lo.z > W1) {
      float t = (W1 - lo.z) * iv.z; vec3 p = lo + ld * t;
      if (t > 0. && t < tb && abs(p.x) < .95 && p.y > DY - .26 && p.y < DY) { tb = t; nl = vec3(0., 0., 1.); di = vec4(2., p.x, p.y, 2.); }
    }
    float wa = lo.z + ld.z * tn, wb = lo.z + ld.z * tf;
    float k0 = max(floor((W1 - max(wa, wb) - .6) / 2.42), 0.), k1 = ceil((W1 - min(wa, wb) + .6) / 2.42);
    int nk = min(int(k1 - k0) + 1, I2 * 8) * I2;
    // posts, both sides in one flat loop; the loop keeps only the nearest hit, its normal and data come after
    float hk = -1., hs = 0., hcap = 0.;
    for (int i = 0; i < nk; i++) {
      float k = k0 + float(i / 2), sd = float(i % 2) * 2. - 1.;
      uint hh = hu(uint(k) * 31u + uint(i % 2) * 7u + 99u);
      vec2 cc = vec2(sd * (1.03 + .03 * hf(hh)), W1 - .16 - k * 2.42 + .1 * hf(hh ^ 1u));
      float rr = .1 + .03 * hf(hh ^ 2u);
      float top = k < .5 ? (sd < 0. ? 1.24 : 1.03) : DY + (hf(hh ^ 9u) < .45 ? .06 + .5 * hf(hh ^ 3u) : -.03);
      vec2 oc = lo.xz - cc;
      float a = dot(ld.xz, ld.xz), b = dot(oc, ld.xz), disc = b * b - a * (dot(oc, oc) - rr * rr);
      float t = disc > 0. && a > 1e-9 ? (-b - sqrt(max(disc, 0.))) / a : 1e9;
      float tt = ld.y < 0. && lo.y > top ? (top - lo.y) / ld.y : 1e9;
      vec2 pc = oc + ld.xz * tt;
      tt = dot(pc, pc) < rr * rr && tt > 0. ? tt : 1e9;
      t = t > 0. && lo.y + ld.y * t < top ? t : 1e9;
      float tm = min(t, tt);
      if (tm < tb) { tb = tm; hk = k; hs = float(i % 2); hcap = step(tt, t); }
    }
    if (hk >= 0.) {
      float sd = hs * 2. - 1.;
      uint hh = hu(uint(hk) * 31u + uint(hs) * 7u + 99u);
      vec2 cc = vec2(sd * (1.03 + .03 * hf(hh)), W1 - .16 - hk * 2.42 + .1 * hf(hh ^ 1u));
      float rr = .1 + .03 * hf(hh ^ 2u);
      vec2 oc = lo.xz - cc + ld.xz * tb;
      vec2 q = normalize(oc);
      nl = hcap > .5 ? vec3(0., 1., 0.) : vec3(q.x, 0., q.y);
      di = hcap > .5 ? vec4(5., oc / rr, 0.) : vec4(3., q.x * 1.3 + q.y + hk * 3.1, lo.y + ld.y * tb, hf(hh ^ 5u));
    }
  }
  n = vec3(nl.x * rx.x + nl.z * fx.x, nl.y, nl.x * rx.y + nl.z * fx.y);
  return tb;
}

vec3 dockShade(vec3 n, vec4 di, float fp) {
  float m = di.x;
  vec3 fw = vec3(DCS.y, 0., -DCS.x);
  // one weathered-wood function: grain runs along gu, across gv
  bool plank = m < 1.5;
  float w = DOCK.y - di.z;
  w += .045 * sin(w * 1.7 + 1.) + .025 * sin(w * 4.3);   // boards of uneven width
  float pk = floor(w / .152), f = fract(w / .152);
  vec2 gq = plank ? vec2(di.y, f + pk * 3.7) : m < 2.5 ? vec2(di.y, di.z * 6.) : m < 3.5 ? vec2(di.z * .4, di.y * .8) : di.yz;
  uint hh = hu(uint((plank ? pk : floor(di.w * 9.)) + 400.) * 7919u);
  vec4 r = vec4(uvec4(hh, hh >> 8u, hh >> 16u, hh >> 24u) & 255u) / 255.;
  float aa = smoothstep(.004, .025, fp);
  float gr = mix(n2(vec2(gq.x * 1.9 + r.x * 60., gq.y * 24.)) * .6 + n2(vec2(gq.x * 7., gq.y * 70.)) * .4, .5, aa);
  vec3 alb = vec3(.33, .31, .28) * (.72 + .42 * r.y) * (.7 + .5 * gr);
  float ck = (1. - aa) * smoothstep(.035, .0, abs(fract(gq.y) - .25 - .45 * r.z + .03 * sin(gq.x * 3. + pk))) * step(.45, r.w) * step(.5, n2(gq * vec2(2.2, 1.7)));
  alb *= 1. - .6 * ck;
  vec3 nn = n;
  if (plank) {
    float u = di.y;
    float uj = clamp(floor(u / .83 + .5), -1., 1.) * .83;
    float nl = smoothstep(.0065 + fp, .004, min(length(vec2(u - uj, (f - .28) * .152)), length(vec2(u - uj, (f - .68) * .152))));
    alb = mix(alb, vec3(.05, .035, .025), nl * .85);
    alb *= (1. + .14 * exp(-u * u / .1)) * mix(1. - .93 * smoothstep(.9, .915, f), .9, aa);
    alb = mix(alb, vec3(.1, .12, .07), smoothstep(.72, .94, abs(u)) * .55 * gr);
    nn = normalize(vec3(0., 1., 0.) - fw * ((f - .45) * (.25 + .35 * r.z) * (1. - aa) + (gr - .5) * .08));
  } else {
    float y = m < 3.5 ? di.z : 1.;
    alb *= m > 3.5 && m < 4.5 ? .1 : 1.;
    alb = mix(alb, vec3(.04, .05, .03), smoothstep(.35, .02, y) * .8);
    alb *= m > 4.5 ? (1.25 + .25 * sin(length(di.yz) * 40. + gr * 6.)) * (1. - .7 * smoothstep(.06, .0, abs(di.y + .25 * di.z))) : 1.;   // the cut top: weathered pale, rings, a split
    alb = m > 2.5 && m < 3.5 ? mix(alb, vec3(.26, .23, .17) * (.7 + .5 * gr), smoothstep(.022, .008, abs(di.z - .97 - .02 * sin(di.y * 5.)))) : alb;   // a turn of rope
  }
  return alb * (vec3(.011, .013, .019) * (.55 + .45 * nn.y) + FCOL * IENV * max(dot(nn, LS), 0.) + MOOND.w * vec3(.05, .045, .04) * max(dot(nn, MOOND.xyz), 0.));
}

void main() {
  vec2 q = gl_FragCoord.xy / SIZE * 2. - 1.;
  float pa = 2. * TANH / SIZE;
  vec3 d = normalize(CF + q.x * TANH * CR + q.y * TANH * CU);
  vec3 ro = EYE, rd = d, acc = vec3(0.);
  float k = 1., dOff = 0.;
  o = vec4(0.);
  for (int pass = 0; pass < I2; pass++) {
    if (rd.y >= -1e-5 && pass == 0) break;
    vec3 dn; vec4 di;
    float td = dockT(ro, rd, dn, di), tw = pass == 0 ? -ro.y / rd.y : 1e9;
    if (td < tw) { o = vec4(acc + k * dockShade(dn, di, (td + dOff) * pa), 1.); break; }
    if (pass == 1) break;
    vec3 p = ro + rd * tw;
    float sh = textureLod(uProf, vec2(at2(vec2(-p.z, p.x)) * .15915494 + .5, 1. / 6.), 0.).x;
    if (length(p.xz) > sh) break;
    // water: wind-aligned ripples, cat's-paw line, breeze puffs
    float r = RBASE;
    float wl = n2(p.xz * .004 + 3.);
    float mb = exp(-pow((length(p.xz) - RLINE - (wl - .5) * RLINE * .5) / (RLINE * (.07 + .12 * wl)), 2.)) * smoothstep(.2, .5, n2(p.xz * (4. / RLINE) + 9.));
    r += .004 * mb;
    #define PUFF(i) { vec4 P = uC[i]; vec2 dv = p.xz - P.xy; r += P.w * exp(-dot(dv, dv) / (P.z * P.z + 1e-3)); }
    PUFF(13) PUFF(14) PUFF(15) PUFF(16) PUFF(17) PUFF(18)
    vec2 wd = WIND, wp = vec2(-wd.y, wd.x);
    vec2 a = vec2(dot(p.xz, wd), dot(p.xz, wp));
    float fpm = (tw + dOff) * pa / max(-rd.y, .015);
    float lod = log2(max(fpm / (4. / 128.), 1.));
    vec2 g1 = textureLod(uWN, vec2(a.x - TIME * .62, a.y * .42) / 4., lod).rg * 2. - 1.;
    vec2 g2 = textureLod(uWN, vec2(a.x * 1.8 - TIME * .75, a.y * .8) / 4. + .37, lod + .8).rg * 2. - 1.;
    vec2 g = vec2(g1.x + g2.x * .6, g1.y * .42 + g2.y * .48);
    vec2 gw = g.x * wd + g.y * wp;
    vec2 vd = normalize(rd.xz); gw += vd * (.0045 * sin(dot(p.xz, vd) * 1.7 - TIME * 1.1 + 2. * sin(dot(p.xz, vec2(-vd.y, vd.x)) * .21)) * smoothstep(8., 40., tw) * exp(-lod * .7) * (RLINE < 999. ? 1. : .45));
    // ripples too small to see: one number per pixel and frame, tilting only along the line of sight (a reflection is
    // drawn out up and down, never bent sideways); sized by what roughens the water: the calm base alone feathers an edge by under a pixel
    float unres = (r - .92 * RBASE) * (1. - exp(-lod * .35)) * 2.2;
    float jit = (hf(uint(gl_FragCoord.x) * 7919u + uint(gl_FragCoord.y) * 104729u + uint(TIME * 30.) * 15485863u + 0x5bd1e995u) - .5) * unres * 1.6;
    gw = gw * r * 4. + vd * jit;
    vec3 nw = normalize(vec3(-gw.x, 1., -gw.y));
    float F = .02 + .98 * pow(max(1. - max(dot(-rd, nw), 0.), 0.), 5.);
    acc = (1. - F) * vec3(.0004, .0006, .0007); k = F;
    o = vec4(nw.x, nw.z, mb, .5);
    vec3 rr = reflect(rd, nw); rr.y = max(rr.y, .0004);
    ro = p + vec3(0., .001, 0.); rd = normalize(rr); dOff = tw;
  }
#ifdef NEAR8
  o = o.a > .9 ? vec4(sqrt(clamp(o.rgb * 6., 0., 1.)), 1.) : o.a > .4 ? vec4(o.rg * 2. + .5, o.b, .5) : o;
#endif
}`,qa=Yt+we+To+`
uniform sampler2D uBase, uFl, uBolt, uMW, uProf, uReed, uNear;
vec3 skyBG(vec3 d) {
  float e = max(d.y, 0.);
  vec3 c = mix(vec3(.011, .014, .017), vec3(.0042, .0056, .011), smoothstep(0., .5, pow(e, .7)));
  float vr = 1. / sqrt(1. - .96 * (1. - e * e));
  float ext = .4 + .6 * exp(-.06 / (e + .02));
  vec2 pp = d.xz / (e + .12);
  float wv = .7 + .3 * sin(dot(pp, vec2(2.3, .8)) * 1.6 + 3. * n2(pp * .9 + 5.));
  float wv2 = AGK > 1.5 ? wv * wv * 1.6 : .12;
  c += (vec3(.0, .0042, .0013) * exp(-pow((e - .1) / .16, 2.)) * wv2 + vec3(.0022, .0007, .0004) * smoothstep(.05, .5, e) * .7) * vr * min(AGK, 1.6) * ext * .55;
  float da = dot(normalize(d.xz + 1e-6), DOMEAZ);
  c += vec3(.011, .0065, .003) * DOMEK * exp(-e / .07) * smoothstep(.2, 1., da);
  // late twilight: a deep blue sky with the last glow low on one side
  float tz = .5 + .5 * dot(normalize(d.xz + 1e-6), TWD.xy), g = tz * tz * tz * tz;
  c += TWD.z * (vec3(.006, .014, .034) * exp(-e / .5) + vec3(.13, .055, .016) * g * exp(-e / (.025 + .06 * g)) + vec3(.02, .013, .016) * g * exp(-e / .22));
  // moonlight lifts and blues the sky, most round the moon
  float md = max(dot(d, MOOND.xyz), 0.);
  c += MOOND.w * (vec3(.005, .0075, .013) * (.4 + .6 * exp(-e / .3)) + vec3(.03, .024, .016) * pow(md, 120.) + vec3(.05, .04, .028) * pow(md, 2500.));
  return c;
}

vec3 starL(vec3 d, float N, float prob, float br, uint salt, float pa, float boost) {
  vec3 a = abs(d);
  float m = max(a.x, max(a.y, a.z));
  bool bx = a.x >= m, by = !bx && a.y >= m;
  vec2 uv = (bx ? d.zy : by ? d.xz : d.xy) / m;
  uint face = (bx ? 0u : by ? 2u : 4u) + ((bx ? d.x : by ? d.y : d.z) > 0. ? 0u : 1u);
  vec2 g = (uv * .5 + .5) * N, ci = floor(g);
  uint h = hu(uint(ci.x) * 73856093u ^ uint(ci.y) * 19349663u ^ face * 83492791u ^ salt);
  uint h2 = hu(h);
  vec4 r = vec4(uvec4(h2, h2 >> 8u, h2 >> 16u, h2 >> 24u) & 255u) / 255.;
  vec2 sp = ci + .22 + .56 * r.xy;
  float ang = length(g - sp) * (2. / N) / (1. + .5 * dot(uv, uv));
  float u = r.z, u3 = u * u * u;
  float b = br * (.08 + 1.1 * u3 * u3 * u * u) * pow(min(1., .0012 / pa), .8);
  float sg = pa * (.56 + .14 * min(b, 2.));
  vec3 sc = mix(vec3(.72, .84, 1.18), vec3(1.18, .84, .58), r.w);
  sc = mix(sc, vec3(1.), .55 - abs(r.w - .5));
  float tw = 1. + .35 * smoothstep(.3, .0, d.y) * sin(TIME * (9. + 7. * r.w) + u * 40.);
  return float(hf(h) < prob * boost) * sc * b * tw * (exp(-ang * ang / (2. * sg * sg)) + .02 * exp(-ang / (sg * 3.)));
}

vec3 sky(vec3 d, float pa) {
  vec3 c = skyBG(d);
  vec3 g = vec3(dot(d, uC[9].xyz), dot(d, uC[10].xyz), dot(d, uC[11].xyz));
  float lat = asin(clamp(g.z, -1., 1.));
  float ext = exp(-.2 / (max(d.y, 0.) + .025));
  vec4 m = textureLod(uMW, vec2(at2(g.xy) * .15915494 + .5, lat / 1.2 + .5), 0.) * step(abs(lat), .6);
  c += m.rgb * MWK * ext * (.85 + .3 * hf(uint(gl_FragCoord.x) * 7u + uint(gl_FragCoord.y) * 7919u));
  vec3 s = vec3(0.);
#ifndef NO_STARS
  for (int i = 0; i <= I2; i++) {
    float fi = float(i);
    s += starL(d, fi < .5 ? 64. : fi < 1.5 ? 190. : 480., fi < .5 ? .035 : fi < 1.5 ? .12 : .14, fi < .5 ? .5 : fi < 1.5 ? .2 : .07, uint(i) * 977u + 11u, pa, (1. + m.a * fi * fi * 1.4) * (.2 + .8 * smoothstep(.03, .3, d.y)));
  }
#endif
  c += s * STARK * ext * exp(-.1 / (max(d.y, 0.) + .012)) * smoothstep(.004, .06, d.y);
  // the moon: a lit disc (gibbous or a thin crescent with earthshine), reddened and dimmed low down
  vec3 mv = d - MOOND.xyz * dot(d, MOOND.xyz);
  float mr = length(mv) / MOONS.w;
  if (MOOND.w > 0. && mr < 1.2 && dot(d, MOOND.xyz) > 0.) {
    vec3 mn = mv / MOONS.w - MOOND.xyz * sqrt(max(1. - mr * mr, 0.));
    float mx = exp(-.06 / (max(d.y, 0.) + .008));
    vec3 mc = mix(vec3(1., .5, .26), vec3(1., .92, .8), mx);
    c += smoothstep(1., 1. - 1.6 * pa / MOONS.w, mr) * mc * (smoothstep(-.06, .12, dot(mn, MOONS.xyz)) * 2.4 + .02) * (.35 + .65 * mx) * (.8 + .25 * n2(mv.xz / MOONS.w * 2.5 + 4.));
  }
  // a meteor (rare mints): a streak along a great circle
  if (uC[25].w > 0.) {
    vec3 nm = normalize(cross(uC[24].xyz, uC[25].xyz));
    float off = dot(d, nm);
    float al = dot(d, uC[25].xyz) - dot(uC[24].xyz, uC[25].xyz);
    float tl = smoothstep(-.02, uC[24].w * .3, al) * step(al, uC[24].w * .3);
    c += vec3(.8, .9, 1.) * uC[25].w * tl * tl * exp(-off * off / (pa * pa));
  }
#ifndef NO_STORM
  // the flash lighting the air around the storm
  float h0 = sqrt(max(2. - 2. * dot(d, uC[28].xyz), 0.)), h1 = sqrt(max(2. - 2. * dot(d, uC[29].xyz), 0.));
  c += FCOL * DTINT * (uC[28].w * (.0035 * exp(-h0 / .05) + .0012 * exp(-h0 / .25)) + uC[29].w * (.0035 * exp(-h1 / .05) + .0012 * exp(-h1 / .25))) * smoothstep(-.02, .03, d.y);
  // the storm, from its direction window
  vec2 dl = vec2(dot(d.xz, SEX), dot(d.xz, SEZ));
  vec2 w = vec2((atan(dl.x / max(dl.y, .1)) - WIN.x) / (WIN.y - WIN.x), (asin(clamp(d.y, -1., 1.)) - WIN.z) / (WIN.w - WIN.z));
  if (dl.y > .1 && w.x > 0. && w.x < 1. && w.y > 0. && w.y < 1.) {
    vec4 b = texture(uBase, w);
    vec4 f = texture(uFl, w); f = f * f * 16.;
    vec2 bo = texture(uBolt, w).rg;
    float edge = smoothstep(0., .03, min(min(w.x, 1. - w.x), 1. - w.y));
    // the light that came straight from the channel is white-violet; what crossed a lot of cloud comes out warm
    float fD = f.x * FA + f.z * FB, fS = f.y * FA + f.w * FB;
    float I = fD + fS * 1.3, hk = I / (I + .3) * (.45 + .55 * fD / (I + 1e-4));
    vec3 rc = mix(vec3(1., .42, .24), vec3(1., .6, .64), smoothstep(.03, .2, hk));
    rc = mix(rc, mix(vec3(.96, .95, 1.05), FCOL, .35), smoothstep(.22, .6, hk)) * mix(DTINT, vec3(1.), smoothstep(.5, .9, hk) * .6);
    // between flashes a weak flicker runs somewhere deep in the cloud (an ember)
    vec2 ed = (w - EMB.xy) / vec2(EMB.z, EMB.z * (WIN.y - WIN.x) / (WIN.w - WIN.z));
    float em = EMB.w * exp(-dot(ed, ed)) * (1. - b.r) * (.25 + 1.5 * smoothstep(.3, 3., (b.a - b.b) * 100.));   // leaks where the skin is soft, dark behind dense turret faces: never a round disc
    c = c * mix(1., b.r, edge) + (b.g * AMBK * AMBC + I * rc + fD * fD * .03 + em * vec3(1., .42, .24) * DTINT) * edge + BOLTC * (bo.x * BA + bo.y * BB);
  }
#endif
  return c;
}

// shores and hills: three cylindrical silhouette layers around the dock (distance and top height per azimuth)
bool layers(vec3 o, vec3 d, float pa, float dOff, out vec3 c, out float tl) {
  c = vec3(0.); tl = 1e9;
  vec2 dh = d.xz; float A = max(dot(dh, dh), 1e-9);
  float B = dot(o.xz, dh), O2 = dot(o.xz, o.xz);
  float az0 = at2(vec2(-d.z, d.x)) * .15915494 + .5;
  bool hit = false;
  for (int L = 0; L <= I2; L++) {
    float row = (float(L) + .5) / 3.;
    vec4 pr = textureLod(uProf, vec2(az0, row), 0.);
    float t = (-B + sqrt(max(B * B - A * (O2 - pr.x * pr.x), 0.))) / A;
    vec2 hp = o.xz + dh * t;
    pr = textureLod(uProf, vec2(at2(vec2(-hp.y, hp.x)) * .15915494 + .5, row), 0.);
    t = (-B + sqrt(max(B * B - A * (O2 - pr.x * pr.x), 0.))) / A;
    float yh = o.y + d.y * t;
    vec2 lp = vec2(at2(vec2(-hp.y, hp.x)) * pr.x, yh);
    float fz = n2(lp * 1.3 + float(L) * 37.) * .62 + n2(lp * 3.9 + 11.) * .38;
    if (t > 0. && yh < pr.y && yh > -.3 && pr.y - yh > pr.z * (fz * 1.5 - .25)) {
      hit = true; tl = t;
      float leaf = (.6 + .8 * fz) * pr.w;
      float face = max(dot(normalize(vec3(-dh.x, .45 * sqrt(A), -dh.y)), LS), 0.);
      vec3 base = (vec3(.0024, .0029, .0026) + FCOL * IENV * face * .05) * leaf * (.55 + .45 * smoothstep(0., 1.2, yh));
      c = mix(base, vec3(.009, .011, .013), 1. - exp(-(t + dOff) / 7000.));
      break;
    }
  }
  return hit;
}

// reed clumps: two crossed billboards each, stalks evaluated analytically
float reeds(vec3 o, vec3 d, float pa, float dOff, out float tR, out float lit) {
  float cov = 0.; tR = 1e9; lit = 0.;
  int n = int(NREED);
  // two reed groups: skip the clumps when the ray never passes low through a group's bounding cylinder
  bool g0 = false, g1 = false;
  for (int g = 0; g < I2; g++) {
    vec4 G = g == 0 ? uC[30] : uC[31];
    vec2 oc = o.xz - G.xy; float A2 = max(dot(d.xz, d.xz), 1e-9), b = dot(oc, d.xz), cc = dot(oc, oc) - G.z * G.z, disc = b * b - A2 * cc;
    float t0 = max((-b - sqrt(max(disc, 0.))) / A2, 0.), t1 = (-b + sqrt(max(disc, 0.))) / A2;
    bool on = disc > 0. && t1 > 0. && min(o.y + d.y * t0, o.y + d.y * t1) < G.w;
    if (g == 0) g0 = on; else g1 = on;
  }
  for (int k = 0; k < n; k++) {
    if (k == 0 ? !g0 : !g1) continue;
    vec4 A = texelFetch(uReed, ivec2(k, 0), 0);
    vec2 tc = A.xy - o.xz;
    float dc = length(tc);
    vec2 nP = -tc / max(dc, 1e-3), tP = vec2(-nP.y, nP.x);
    float den = dot(d.xz, nP);
    float t = dot(tc, nP) / min(den, -1e-4);
    vec3 h = o + d * t;
    float s = dot(h.xz - A.xy, tP);
    if (dc > .4 && den < -1e-4 && t > 0. && abs(s) < A.z && h.y < A.w * 1.05 && h.y > -.05) {
      vec4 B = texelFetch(uReed, ivec2(k, 1), 0);
      float fp = (t + dOff) * pa;
      float ci = floor(s / B.y);
      for (int jj = 0; jj <= I2; jj++) {
        float id = ci + float(jj - 1);
        uint hh = hu(uint(id + 8192.) * 2654435761u ^ uint(B.x) * 97u);
        vec4 r = vec4(uvec4(hh, hh >> 8u, hh >> 16u, hh >> 24u) & 255u) / 255.;
        float x0 = (id + .15 + .7 * r.x) * B.y;
        float hgt = A.w * (.35 + .65 * r.y) * (.35 + .65 * sqrt(max(1. - (x0 / A.z) * (x0 / A.z), 0.)));
        float u = max(h.y, 0.) / hgt;
        float bl = step(.6, r.z);
        float lean = (r.w - .5) * B.z * hgt * u * u * (1. + 1.6 * bl) + sin(TIME * (1.1 + r.x) + id) * .05 * u * u * WAMP;
        float w = mix(.0042 + .0036 * (1. - u), .011 * (1. - u * .85), bl);
        w = mix(w, .012, (1. - bl) * step(.8, r.y) * step(.7, u) * step(u, .9));
        float cv = step(h.y, hgt) * clamp((w - abs(s - x0 - lean)) / max(fp, 1e-4) + .5, 0., 1.);
        cov = max(cov, cv);
      }
      if (cov > 0.) { tR = min(tR, t); lit = max(dot(normalize(vec3(-d.x, .2, -d.z)), LS), 0.); }
    }
  }
  return cov;
}

vec3 lamp(vec4 L, vec3 o, vec3 d, float pa, float tOcc) {
  vec3 v = L.xyz - o; float dd = length(v);
  if (L.w <= 0. || dd > tOcc + 25.) return vec3(0.);
  vec3 vn = v / dd;
  if (dot(d, vn) < .999) return vec3(0.);
  float ang = length(cross(d, vn));
  float sz = .5 / dd;
  return vec3(1., .56, .24) * L.w * (exp(-pow(max(ang - sz, 0.) / (pa * .6), 2.)) + .03 * exp(-ang / (pa * 5.)));
}

vec3 env(vec3 o, vec3 d, float pa, float dOff) {
  float tR, rl;
#ifndef NO_REEDS
  float rc = reeds(o, d, pa, dOff, tR, rl);
#else
  float rc = 0.; tR = 1e9; rl = 0.;
#endif
  vec3 lc; float tl;
#ifndef NO_LAYERS
  bool hl = layers(o, d, pa, dOff, lc, tl);
#else
  bool hl = false; lc = vec3(0.); tl = 1e9;
#endif
  vec3 c = hl ? lc : sky(d, pa);
  for (int i = 0; i < I2; i++) c += lamp(i == 0 ? CAB : CAB2, o, d, pa, tl);
  if (rc > 0. && tR < tl) c = mix(c, vec3(.0016, .0016, .001) + FCOL * IENV * rl * .03, rc);
  return c;
}

void main() {
  vec2 q = gl_FragCoord.xy / SIZE * 2. - 1.;
  float pa = 2. * TANH / SIZE;
  vec3 d = normalize(CF + q.x * TANH * CR + q.y * TANH * CU);
  vec4 nr = texelFetch(uNear, ivec2(gl_FragCoord.xy), 0);
#ifdef NEAR8
  nr = nr.a > .9 ? vec4(nr.rgb * nr.rgb / 6., 1.) : nr.a > .2 ? vec4((nr.rg - .5) * .5, nr.b, .5) : vec4(0.);
#endif
  vec3 ro = EYE, rd = d, acc = vec3(0.);
  float k = 1., dOff = 0.;
  if (nr.a > .75) { acc = nr.rgb; k = 0.; }
  else if (nr.a > .25) {
    // the lake: a Fresnel mirror tilted by the near pass normal
    dOff = -EYE.y / d.y;
    vec3 nw = vec3(nr.x, sqrt(max(1. - nr.x * nr.x - nr.y * nr.y, 0.)), nr.y);
    k = .02 + .98 * pow(max(1. - max(dot(-d, nw), 0.), 0.), 5.);
    acc = (1. - k) * vec3(.0004, .0006, .0007) + k * nr.b * .6 * vec3(.009, .012, .017);
    k *= .66 * (1. - .6 * nr.b);
    vec3 rr = reflect(d, nw); rr.y = max(rr.y, .0004);
    ro = EYE + d * dOff + vec3(0., .001, 0.); rd = normalize(rr);
  }
  if (k > 0.) acc += k * env(ro, rd, pa, dOff);
  vec3 col = acc * EXPO * (1. - .1 * dot(q, q));
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  uint hg = uint(gl_FragCoord.x) * 7919u + uint(gl_FragCoord.y) * 104729u + uint(TIME * 30.) * 15485863u;
  col += (hf(hg) - .5) * .012 * (1. - col);
  o = vec4(col, 1.);
}`,Ha=Yt+we+To+`
uniform vec4 uO[8];
uniform sampler2D uMask, uNear, uProf;
// the shore layers' top, exactly as the frame draws it (layers()): true where the ray from o meets a shore or hill
bool shoreHit(vec3 o, vec3 d) {
  vec2 dh = d.xz; float A = max(dot(dh, dh), 1e-9), B = dot(o.xz, dh), O2 = dot(o.xz, o.xz);
  float az0 = at2(vec2(-d.z, d.x)) * .15915494 + .5;
  for (int L = 0; L <= I2; L++) {
    float row = (float(L) + .5) / 3.;
    vec4 pr = textureLod(uProf, vec2(az0, row), 0.);
    float t = (-B + sqrt(max(B * B - A * (O2 - pr.x * pr.x), 0.))) / A;
    vec2 hp = o.xz + dh * t;
    pr = textureLod(uProf, vec2(at2(vec2(-hp.y, hp.x)) * .15915494 + .5, row), 0.);
    t = (-B + sqrt(max(B * B - A * (O2 - pr.x * pr.x), 0.))) / A;
    float yh = o.y + d.y * t;
    vec2 lp = vec2(at2(vec2(-hp.y, hp.x)) * pr.x, yh);
    float fz = n2(lp * 1.3 + float(L) * 37.) * .62 + n2(lp * 3.9 + 11.) * .38;
    if (t > 0. && yh < pr.y && yh > -.3 && pr.y - yh > pr.z * (fz * 1.5 - .25)) return true;
  }
  return false;
}
// the dome of light over a storm below the horizon: e elevation, da azimuth from the storm (radians)
vec3 dome(float e, float da, float I) {
  vec2 r = vec2(da / uO[3].w, e / (uO[3].w * .62));
  float rr = length(r), br = n2(vec2(da * 40. + TIME * .7, e * 25.)) * .35 + .65;
  float k = I * exp(-rr * 2.2) * mix(br, 1., smoothstep(.5, 0., rr));
  return k * mix(uO[4].rgb, vec3(.42, .38, .62), smoothstep(.02, .22, e));
}
void main() {
  vec2 q = gl_FragCoord.xy / SIZE * 2. - 1.;
  vec3 d = normalize(CF + q.x * TANH * CR + q.y * TANH * CU);
  vec3 add = vec3(0.);
  vec4 nr = texelFetch(uNear, ivec2(gl_FragCoord.xy), 0);
#ifdef NEAR8
  nr = nr.a > .9 ? vec4(nr.rgb * nr.rgb / 6., 1.) : nr.a > .2 ? vec4((nr.rg - .5) * .5, nr.b, .5) : vec4(0.);
#endif
  bool wat = abs(nr.a - .5) < .2 && d.y < 0.;
  float tw = EYE.y / max(-d.y, 1e-4), dm = 0.;
  // the old moon's glints: water facets tilted to throw the moon at the eye, re-drawn in short slots (no beat).
  // (pass 2) Cells wider than tall that grow toward the eye (a wavelet's face seen at a grazing angle: level dashes, fewer
  // and larger near), a thread under the far shore, the path flaring where the water is ruffled and running to the lens
  if (uO[2].w > 0. && wat) {
    vec3 n = normalize(MOOND.xyz - d);
    vec2 rh = normalize(vec2(CR.x, CR.z));
    float tl = dot(n.xz, rh) / n.y, tv = dot(n.xz, vec2(rh.y, -rh.x)) / n.y, sg = uO[1].w * (1. + 3. * nr.b);
    float pl = exp(-tl * tl / (sg * sg)), pg = pl * exp(-tv * tv / .04);
    float gy = log(tw) / .05, cw = max(.0045, .2 * EYE.y / exp((floor(gy) + .5) * .05));
    vec2 g = vec2(dot(d.xz, rh) / cw, gy);
    vec2 ci = floor(g), f = fract(g) - .5;
    uint h = hu(uint(int(ci.x) + 40000) * 73856093u ^ uint(int(ci.y) + 40000) * 19349663u);
    float rate = 1.5 + 3. * hf(h), ph = TIME * rate + hf(h * 7u);
    uint h2 = hu(h ^ uint(floor(ph)) * 83492791u);
    vec2 c0 = vec2(hf(h2) - .5, hf(h2 >> 3u) - .5) * vec2(.4, .3);
    vec2 dv = (f - c0) / vec2(.4, .25);
    float gl = step(hf(h2 * 3u), min(pg * 1.5, .95)) * sin(3.1415927 * fract(ph)) * exp(-dot(dv, dv) * 2.);
    float th = exp(-tl * tl / (sg * sg * .12)) * (1. - smoothstep(.01, .045, -d.y));
    float mx = exp(-.06 / (max(MOOND.y, 0.) + .008));
    vec3 mc = mix(vec3(1., .5, .26), vec3(1., .92, .8), mx);
    // (pass 3) where the frame draws the moon's own image (within its disc of the mirror direction, measured in moon radii):
    // few sparkles there (the road's glow runs on through), and that image, which came out brighter than the crescent (the ripples' jitter lights whole pixels),
    // held to about .6 of itself. Before, the glints were cut along a 2 px line down the whole road (a dark bar)
    vec3 dr = vec3(d.x, -d.y, d.z), mh = normalize(vec3(-MOOND.z, 0., MOOND.x));
    float im = (1. - smoothstep(.9, 1.5, abs(dot(dr, mh)) / MOONS.w)) * (1. - smoothstep(1.3, 2.4, abs(dr.y - MOOND.y) / MOONS.w));
    add += mc * uO[2].w * (gl * .6 * mix(1., .15, im) + pg * pg * .15 + pg * .03 + th * .3);
    dm = .32 * im;
  }
  // (pass 2) the dock under the old moon: worn boards take its light (more of the near pass's own light, through the
  // frame's tone curve, so plank tops rise and the gaps stay dark)
  if (uO[1].x > 0. && nr.a > .75) {
    vec3 c0 = nr.rgb * EXPO, c1 = c0 * (1. + uO[1].x);
    c0 = pow(clamp((c0 * (2.51 * c0 + .03)) / (c0 * (2.43 * c0 + .59) + .14), 0., 1.), vec3(1. / 2.2));
    c1 = pow(clamp((c1 * (2.51 * c1 + .03)) / (c1 * (2.43 * c1 + .59) + .14), 0., 1.), vec3(1. / 2.2));
    add += min(c1 - c0, vec3(.07));
  }
  // the dome over the storm below the horizon, and its long column on the lake
  if (uO[3].z > 0.) {
    vec2 dh = normalize(d.xz), sd = uO[3].xy;
    float da = acos(clamp(dot(dh, sd), -1., 1.));
    bool sk = d.y > 0. && nr.a < .2;
    if (sk || wat) {
      // one call site each (Windows compiles every call again): the sky, or the lake seen as the sky's mirror image
      vec3 P = EYE + d * tw;
      if (!shoreHit(sk ? EYE : vec3(P.x, .001, P.z), vec3(d.x, abs(d.y), d.z))) add += dome(sk ? d.y : -d.y * .7, sk ? da : da * 1.9, uO[3].z) * (sk ? 1. : .55 * (1. - nr.b * .5));
    }
  }
  // the foreground silhouette, laid out in the opening view's own frame (fades if the camera is turned or moved off it)
  // (pass 2) its green channel is the sky- and storm-facing step: lit by the night's ambient (uO[2]) and the flash (uO[4] x uO[0].w);
  // the flash goes with its cube, so the full-value rims take it and the dimmer litter only a little
  float cov = 0., lt = 0.;
  if (uO[7].w > 0.) {
    float df = dot(d, uO[5].xyz);
    vec2 p = vec2(dot(d, uO[6].xyz), dot(d, uO[7].xyz)) / max(df, .05);
    vec2 uv = vec2(p.x / uO[5].w * .5 + .5, .5 - p.y / uO[5].w * .5);
    if (df > 0. && uv.x > 0. && uv.x < 1. && uv.y > 0. && uv.y < 1.) { vec2 m = texture(uMask, uv).rg; cov = m.r * uO[7].w; lt = m.g / max(m.r, .004); }
  }
  // (pass 3) the flash lights the ground too: the litter with its value, the full-value edges (lips, tops, rims, the storm
  // side's needles) more; the night's ambient takes the value capped at .7
  o = vec4(add * (1. - cov) + (uO[0].rgb + min(lt, .7) * uO[2].rgb + (min(sqrt(lt) * 1.6, 1.) + smoothstep(.7, 1., lt) * .12) * uO[4].rgb * uO[0].w) * cov, 1. - (1. - cov) * (1. - dm));
}`;function Ya(o,t,ht,N){const Z=typeof OffscreenCanvas<"u"?new OffscreenCanvas(ht,ht):Object.assign(document.createElement("canvas"),{width:ht,height:ht});let l=Z.getContext("2d");l.fillStyle="#000",l.fillRect(0,0,ht,ht),l.setTransform(N,0,0,N,ht/2-500*N,ht/2-500*N),l.lineCap="round",l.lineJoin="round";const y=(r,m)=>r+(m-r)*o(),Vt=Array.from({length:512},()=>o()*2-1),lt=(r,m)=>{const p=Math.floor(r),i=r-p,h=i*i*(3-2*i),E=Vt[p+m&511],H=Vt[p+1+m&511];return E+(H-E)*h},zt=(r,m)=>lt(r,m)*.6+lt(r*2.3,m+101)*.28+lt(r*5.9,m+211)*.12,{hy:kt,cx:S,s0:vt,s1:D,st:xt}=t,Nt=(r,m,p)=>r+m/2>vt-p&&r-m/2<D+p,Et="#f00",It=r=>"rgb(255,"+Math.round(255*K(r,0,1))+",0)",ut=r=>{l.fillStyle=r,l.strokeStyle=r},Rt=r=>S>r?1:-1;ut(Et);const Pt=(r,m)=>{for(let p=1;p<r.length;p++)l.lineWidth=m[Math.min(p-1,m.length-1)],l.beginPath(),l.moveTo(r[p-1][0],r[p-1][1]),l.lineTo(r[p][0],r[p][1]),l.stroke()},Ot=r=>{l.beginPath(),l.moveTo(r[0][0],r[0][1]);for(const m of r)l.lineTo(m[0],m[1]);l.closePath()},ge=(r,m,p,i)=>{l.save(),Ot(r),l.clip(),ut(It(p)),l.fill(),ut(Et),l.translate(i,m),Ot(r),l.fill(),l.restore(),ut(Et)},Mt=(r,m,p,i,h,E,H,w)=>{const P=Math.floor(o()*400),B=[];for(let j=0;j<H;j++){const U=j/H*6.2832,d=Math.cos(U),I=Math.sin(U),O=1+w*lt(j*1.37,P);B.push([r+d*p*O,m+(I<0?-Math.pow(-I,h)*i:Math.pow(I,E)*i*.55)*O])}return B},te=(r,m,p,i,h)=>{for(let E=0;E<h;E++){const H=p+(E/(h-1)-.5)*1.7+y(-.15,.15),w=i*y(.6,1.05),P=r+Math.cos(H)*w,B=m+Math.sin(H)*w;l.moveTo(r,m),l.quadraticCurveTo((r+P)/2+y(-1,1),(m+B)/2-w*.12,P,B)}},pt=()=>{},oe={beginPath:pt,moveTo:pt,lineTo:pt,quadraticCurveTo:pt,closePath:pt,fill:pt,stroke:pt,save:pt,restore:pt,clip:pt,translate:pt},at=r=>{const m=l;l=oe;try{r()}finally{l=m}};let Kt=Math.floor(Vt[3]*1e9)^Math.floor(Vt[77]*1e9)^12139|0;const ot=()=>{Kt=Kt+1831565813|0;let r=Math.imul(Kt^Kt>>>15,1|Kt);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},L=(r,m)=>r+(m-r)*ot(),bt=r=>{l.beginPath();for(const m of r){l.moveTo(m[0][0],m[0][1]);for(const p of m)l.lineTo(p[0],p[1]);l.closePath()}},Ut=(r,m,p,i)=>{const h=Math.floor(ot()*400),E=Math.round(K(p*.45,8,16)),H=ot()*6.2832,w=[];for(let P=0;P<E;P++){const B=H+P/E*6.2832,j=1+.3*lt(P*5/E,h)+.16*lt(P*13/E,h+60)+(P&1?.08:-.06);w.push([r+Math.cos(B)*p*j,m+Math.sin(B)*i*j])}return w},se=(r,m,p,i,h)=>{for(let E=0;E<h;E++){const H=p+(E/(h-1)-.5)*1.25+L(-.2,.2),w=i*L(.55,1.05),P=r+Math.cos(H)*w,B=m+Math.sin(H)*w;l.moveTo(r,m),l.quadraticCurveTo((r+P)/2+L(-1,1),(m+B)/2-w*.12,P,B)}},ce=(r,m,p,i,h,E)=>{const H=!h;h=h||{P:[],T:[],B:[],w:0};const w=Rt(r),P=p*(E?L(.3,.38):L(.19,.26)),B=[],j=[];for(let I=0,O=1+(ot()<.5?1:0);I<O;I++)j.push([L(-.5,.5),L(-.3,.5)]);const U=Math.round(K(7+p/22+ot()*3,7,16)),d=2+(ot()<.5?1:0);for(let I=0;I<U+d;I++){let O,Y,V;if(I===0)O=w*L(.02,.16),Y=L(-.45,-.15),V=L(.3,.38);else if(I>=U)O=(ot()<.5?1:-1)*L(.84,1),Y=L(-.5,.3),V=L(.12,.18);else if(O=ot()+ot()-1,Y=1-2*Math.pow(ot(),.75),V=.1+.2*Math.pow(ot(),1.6),j.some(A=>Math.hypot(A[0]-O,A[1]-Y)<.2))continue;O*=O*w>0?1.12:.88;const q=r+O*p*.46,tt=m+Y*P*Math.sqrt(Math.max(1-Math.min(O*O,1),.15))*.9,ct=Math.max(V*p*.5*L(.9,1.15),3),c=ct*L(.5,.72),g=Ut(q,tt,ct,c);if(h.P.push(g),!(I>=U||Math.hypot(O,Y*.8)>.55))continue;const b=Math.hypot(q-r,tt-m)||1,z=(q-r)/b,k=(tt-m)/b,M=K(p*.065,3.5,9);for(const A of g){const W=(A[0]-q)/ct,X=(A[1]-tt)/c,Q=Math.hypot(W,X)||1;if((W*z+X*k)/Q<.2||ot()>.6)continue;const x=X/Q>.5;h.B.push([A[0],A[1],x?Math.PI/2+W/Q*.6:Math.atan2(X/Q-.55,W/Q),M*(x?.5:L(.6,1.2)),x?3:4+Math.floor(ot()*3),i>0&&W*w>.3&&!x])}}for(let I=0,O=p<50?1:2+Math.floor(ot()*3);I<O;I++){const Y=L(-.75,.75),V=r+Y*p*.46,q=m+P*.5*Math.sqrt(1-Y*Y),tt=L(.025,.06)*p+2,ct=Math.PI/2+L(-.7,.7)+Y*.7;h.T.push([V,q-tt*.4,V+Math.cos(ct)*tt,q+Math.sin(ct)*tt])}h.w=Math.max(h.w,p),H&&ae(h,i)},ae=(r,m)=>{const p=r.P.length?Rt(r.P[0][0][0]):1,i=Math.max(1.3,r.w*.022);if(l.lineWidth=1.3,m>0){ut(It(1)),l.beginPath();for(const h of r.B)h[5]&&se(h[0],h[1],h[2],h[3],h[4]);l.stroke()}ut(m>0?It(m*L(.6,1)):Et),bt(r.P),l.fill(),ut(Et),m>0&&(l.save(),l.translate(-p*i*.9,i),bt(r.P),l.fill(),l.restore()),l.lineWidth=1.15,l.beginPath();for(const h of r.T)l.moveTo(h[0],h[1]),l.quadraticCurveTo((h[0]+h[2])/2+L(-3,3),(h[1]+h[3])/2,h[2],h[3]);l.stroke(),l.lineWidth=1.3,l.beginPath();for(const h of r.B)h[5]||se(h[0],h[1],h[2],h[3],h[4]);l.stroke()},Ae=r=>{o(),o();const m=2+Math.floor(o()*3),p=[22];for(let i=0;i<m;i++)o(),o(),o(),o(),o(),p.push(14);if(r>0)for(let i=0;i<=m;i++)o();for(const i of p)for(let h=0;h<i;h++){if(Math.sin(h/i*6.2832)>.45){if(o()<.5)for(let E=0;E<15;E++)o();continue}if(o()<.8){o();for(let E=0,H=3*(7+Math.floor(o()*4));E<H;E++)o()}}},dt=(r,m,p,i)=>{Ae(i),ce(r,m,p,i)},Wt=(r,m,p,i,h,E,H,w,P)=>{const B=[[r,m]],j=[];let U=0,d=r,I=m;for(;U<i-4;){const O=Math.min(y(40,80),i-U),Y=U/i,V=y(-.07,.07)*O,q=d+p*Math.cos(E)*O,tt=I-Math.sin(E)*O;B.push([(d+q)/2+Math.sin(E)*V*p,(I+tt)/2+Math.cos(E)*V],[q,tt]);const ct=h*(1-.72*Math.min((U+O*.5)/i,1))+.9;if(j.push(ct,ct),U+=O,d=q,I=tt,H!==null&&(p>0?d>H:d<H))break;P<1&&U<i*.8&&o()<.42&&Wt(d,I,p,(i-U)*y(.45,.75),ct*.65,E+y(.3,.6)*(o()<.5?1:-.6),H,w,P+1),E=K(E+(o()<.45+.4*Y?1:-1)*y(.26,.7),-.55,1.05),U>i-70&&(E=Math.max(E,.3))}return Pt(B,j),w.push([d,I,j[j.length-1]||h]),B},ie=(r,m=o)=>{const p=(d,I)=>d+(I-d)*m(),i=Math.floor(m()*400),h=Math.max(r.yb-r.yt,1),E=p(150,400),H=d=>{const I=(r.yb-d)/h;return r.x+r.lean*(r.yb-d)+r.sw*(r.sh?Math.sin(Math.PI*I)*(1-.35*I):I*I)},w=d=>{const I=K((r.yb-d)/h,0,1);return(r.w0+(r.w1-r.w0)*I)*(1+.06*lt((r.yb-d)/E,i))},P=[];for(let d=0,I=r.col||0;d<I;d++)P.push([r.yt+h*p(.15,.8),p(5,12),p(.06,.14),m()<.5?-1:1]);const B=[],j=[];for(let d=r.yb+(r.ext??24);d>=r.yt;d-=3){const I=K((r.yb-d)/h,0,1),O=r.w0*r.fl*Math.exp(-Math.max(r.yb-d,0)/(r.w0*.45)),Y=w(d);let V=O*(.7+.6*lt(3.1,i)),q=O*(.7+.6*lt(5.3,i));for(const c of P){const g=c[2]*Y*Math.exp(-(((d-c[0])/c[1])**2));c[3]<0?V+=g:q+=g}const tt=H(d),ct=Y*.015;B.push([tt-Y/2-V+ct*lt(d*.09,i+3),d]),j.push([tt+Y/2+q+ct*lt(d*.09,i+7),d])}const U=B.slice();for(let d=j.length-1;d>=0;d--)U.push(j[d]);if(ut(Et),Ot(U),l.fill(),r.rim){const d=Rt(r.x)>0?j:B,I=K(r.w0*p(.04,.08),1.1,6);l.save(),Ot(U),l.clip();for(const[O,Y]of[[3.2,.3],[2,.6],[1,1]])for(let V=1;V<=4;V++){ut(It(Y*V/4)),l.lineWidth=O*I,l.beginPath();let q=!1;for(const tt of d){const ct=.5+.55*lt(tt[1]*.02,i+21)+.3*lt(tt[1]*.09,i+23);Math.min(4,Math.floor(ct*4.5))>=V?(q?l.lineTo(tt[0],tt[1]):l.moveTo(tt[0],tt[1]),q=!0):q=!1}l.stroke()}l.restore(),ut(Et)}for(const d of P)if(m()<.5){const I=d[0],O=H(I),Y=w(I),V=d[3],q=p(18,60)*Math.sqrt(r.w0/40);Pt([[O+V*Y*.4,I],[O+V*(Y*.4+q*.55),I+q*.12],[O+V*(Y*.4+q),I+q*p(.3,.6)]],[Math.max(1.5,Y*.12),Math.max(1.1,Y*.06)])}return{cxAt:H,wAt:w}},Ze=(r,m,p,i,h,E)=>{const H=L(.6,.78),w=2+(ot()<.5?1:0),P=[[r,m]],B=[];let j=r,U=m,d=E;for(let V=0;V<w;V++){const q=i*H/w*L(.8,1.2);d=K(d+L(-.3,.35),-.5,1),j+=p*Math.cos(d)*q,U-=Math.sin(d)*q,P.push([j,U]),B.push(Math.max(1.3,h*Math.pow(1-(V+.5)/w*.8,1.6)))}Pt(P,B);const I=[],O=2+Math.floor(ot()*3),Y=Math.max(1.1,B[w-1]*.55);for(let V=0;V<O;V++){const q=d+.12+(V/(O-1)-.5)*L(.9,1.5)+L(-.15,.15),tt=i*(1-H)*L(.6,1.1)+6,ct=j+p*Math.cos(q)*tt,c=U-Math.sin(q)*tt;Pt([[j,U],[(j+ct)/2+L(-2,2),(U+c)/2+L(-2,2)],[ct,c]],[Y,Y*.7]),I.push([ct,c])}return{fork:[j,U],mid:P[1],tips:I}},le=(r,m,p,i,h,E,H)=>{const w=Rt(m),P=i*(1-h),B=p-i*h,j=p-i,U=K(E/250,.5,1.2),d=[],I=()=>(26+150*Math.pow(ot(),1.8))*U;for(let M=0,A=1+(ot()<.55?1:0);M<A;M++){const W=B+L(.03,.16)*i*(M+.5),X=ot()<.5?1:-1,Q=r.cxAt(W),x=L(22,55)*U,F=Math.max(1.4,r.wAt(W)*L(.3,.4)),st=[Q+X*x,W+x*L(.3,.55)];Pt([[Q,W],[Q+X*x*.5,W+x*L(.04,.14)],st],[F,F*.5]),Pt([[st[0]-X*x*.3,st[1]-x*.2],[st[0]-X*x*.1,st[1]+x*L(.15,.3)]],[Math.max(1.1,F*.4)])}const O=3+Math.floor(ot()*3+(H?1:0)),Y=[];let V=L(0,.05),q=0;for(let M=0;M<O;M++){Y.push(V);let A;do A=ot()<.42?L(.03,.07):L(.13,.27);while(Math.abs(A-q)<.3*Math.max(A,q));q=A,V+=A}const tt=L(.6,.74)/Y[O-1];let ct=null;for(let M=0;M<O;M++){const A=Y[M]*tt,W=B-A*P,X=ot()<.62?w:-w,Q=r.cxAt(W),x=E*.5*L(.62,.95)*(X===w?L(1.15,1.35):L(.72,.85))*(1-.5*A/.74),F=Ze(Q,W,X,x,r.wAt(W)*L(.55,.7),L(-.1,.2)+.5*A);d.push([F.fork[0],F.fork[1]-2,I()]),ot()<.6&&d.push([F.mid[0],F.mid[1]-2,I()*.8]);for(const st of F.tips)d.push([st[0],st[1]-1,Math.max(I()*.7,34*U)]);ct=F.fork}const c=r.cxAt(j+P*.12)+w*E*L(.03,.08),g=j+P*L(.12,.18),b=Math.max(...d.map(M=>M[2])),z=Math.min(Math.max(b*L(1.05,1.2),70*U),175*U);for(let M=g+z*L(.2,.3);ct&&M<ct[1]-6;M+=z*L(.2,.3)){const A=I()*.6+34*U;d.push([r.cxAt(M)+w*L(-.1,.25)*A,M,A])}const k={P:[],T:[],B:[],w:0};for(const M of d)ce(M[0],M[1],M[2],.55,k);ce(c,g,z,.55,k,1),ae(k,.55)},nt=[],Xt=(r,m,p)=>{const i=Rt(r);let h=i*y(m,p);for(let E=0;E<40&&nt.some(H=>Math.abs(H-h)<.032);E++)h=i*y(m,p);return nt.push(h),h},Gt=(r,m,p)=>p<xt-25?null:m>0?r<vt?vt-12:null:r>D?D+12:null;{const r=S>500?1:-1,m=r>0?y(60,210):y(790,940),p=y(60,90),i=(c,g,b,z)=>!(Math.abs(c-S)<150+g/2)&&!(Math.abs(c-m)<p/2+g*.3+b)&&!z.some(k=>Math.abs(k.x-c)<(k.w+g)*.45+b*3),h=(c,g,b,z)=>{for(let k=0;k<60;k++){const M=y(-10,1010);if(i(M,c,g,b)&&!(z&&Nt(M,c,0)))return M}return-1},E=[];for(let c=0,g=2+(o()<.6?1:0)+(o()<.3?1:0);c<g;c++){const b=y(180,420),z=y(.46,.58),k=b*(1-z)*y(1.25,1.6);let M=h(k*.8,20,E,!0);M<0&&(M=h(k*.8,20,E,!1)),M>=0&&E.push({x:M,w:k*.8,H:b,c0:z,CWd:k})}const H=[];for(const c of E){if(E.some(M=>M!==c&&Math.abs(M.x-c.x)<200))continue;const g=c.H*L(.6,.78),b=L(.42,.52),z=g*(1-b)*L(1.25,1.6),k=c.x-Rt(c.x)*(c.CWd+z)*L(.26,.34);k>-30&&k<1030&&Math.abs(k-S)>150+z*.4&&Math.abs(k-m)>p/2+z*.4?H.push({x:k,H:g,c0:b,CWd:z,of:c}):c.full=1}for(const c of[-1,1]){const g=E.filter(x=>x.x<S==c<0);if(!g.length)continue;const b=c<0?Math.max(...g.map(x=>x.x)):Math.min(...g.map(x=>x.x)),z=Math.max(...g.map(x=>x.H))/y(10,13)+8,k=c<0?Math.max(Math.min(b+y(40,110),vt>60?vt:1e9,S-120),b+30):Math.min(Math.max(b-y(40,110),D<940?D:-1e9,S+120),b-30),M=c<0?-80:1080,A=Math.floor(o()*400),W=x=>{const F=K((x-k)/(M-k),0,1);return kt+5+(z-5)*Math.pow(F,.7)+4*zt(x*.02,A)*F},X=[],Q=[];for(let x=M;c<0?x<=k:x>=k;x+=c<0?4:-4){const F=W(x);X.push([x,F]),Q.push([x,F+2+7*K((x-k)/(M-k),0,1)])}X.push([k-c*8,kt+6]);for(let x=Q.length-1;x>=0;x--)X.push(Q[x]);Ot(X),l.fill(),ge(X,2,.35,-Rt(k)*2);for(const x of g)x.yb=W(x.x)+2;for(const x of H)g.includes(x.of)&&(x.yb=W(x.x)+2)}for(const c of H){const g=K(c.H*L(.028,.04),6,13),b=ie({x:c.x,yb:c.yb,yt:c.yb-c.H*.9,w0:g,w1:g*.45,lean:Rt(c.x)*L(0,.08),sw:L(.02,.06)*c.H*(ot()<.5?1:-1),sh:ot()<.5,fl:.35,rim:1,col:1+Math.floor(ot()*2),ext:2},ot);le(b,c.x,c.yb,c.H,c.c0,c.CWd,!0)}for(const c of E){const g=K(c.H*y(.028,.04),7,16),b=Xt(c.x,-.02,.12),z=c.H,k=c.yb-z*c.c0,M=z*(1-c.c0),A=y(.05,.12),W=o()<.5?1:-1,X=ie({x:c.x,yb:c.yb,yt:c.yb-z*.9,w0:g,w1:g*.45,lean:b,sw:(g<14?.02+(A-.05)/.07*.04:A)*z*W,sh:o()<.5,fl:.35,rim:1,col:1+Math.floor(o()*2),ext:2});at(()=>{const Q=[],x=4+Math.floor(o()*4);let F=o()<.5?1:-1;for(let st=1;st<x;st++){F=o()<.7?-F:Rt(c.x);const Dt=k-M*.7*(st-1)/Math.max(x-2,1)-y(0,M*.08),Ft=X.cxAt(Dt),Zt=c.CWd/2*y(.5,1);Wt(Ft,Dt,F,Zt,g*.4,y(.15,.6),null,Q,Zt>70?0:1)}y(.45,.62),Ae(.55);for(const st of Q)y(.4,.6),Ae(.55)}),le(X,c.x,c.yb,z,c.full?.4:c.c0,c.CWd,c.full)}const w=Math.floor(o()*400),P=K(Math.abs(S-m)>330?S+y(-100,100):m+r*y(330,420),240,760),B=kt+y(250,285),j=kt+y(355,410),U=kt+y(305,355),d=r>0?[[-80,B+y(10,40)],[m,B],[P,j],[1080,U]]:[[-80,U],[P,j],[m,B],[1080,B+y(10,40)]],I=c=>{let g=0;for(;g<d.length-2&&c>d[g+1][0];)g++;const b=d[g],z=d[g+1],k=K((c-b[0])/(z[0]-b[0]),0,1);return b[1]+(z[1]-b[1])*(.5-.5*Math.cos(Math.PI*k))},O=c=>I(c)+16*zt(c*.006,w)+5*zt(c*.04,w+7)+1.5*lt(c*.3,w+13),Y=[[-80,1100]];for(let c=-80;c<=1080;c+=3)Y.push([c,O(c)]);Y.push([1080,1100]),Ot(Y),l.fill();{const g=typeof OffscreenCanvas<"u"?new OffscreenCanvas(140,140):Object.assign(document.createElement("canvas"),{width:140,height:140}),b=g.getContext("2d"),z=b.createImageData(140,140),k=1120/140,M=(A,W,X)=>{const Q=Math.floor(W),x=W-Q,F=x*x*(3-2*x);return lt(A,X+Q*57)*(1-F)+lt(A,X+Q*57+57)*F};for(let A=0;A<140;A++)for(let W=0;W<140;W++){const X=-60+(W+.5)*k,Q=-60+(A+.5)*k,x=Q-O(X),F=300/Math.max(Q-kt,60),st=.5+.5*(M(X*.011*F,9*F,w+51)*.65+M(X*.03*F,25*F,w+77)*.35),Dt=x<-4?0:Math.pow(K((st-.4)*2.1,0,1),1.3)*.75*K(1-x/330,0,1)*(Math.abs(X-m)<p*1.4?.3:1),Ft=4*(A*140+W);z.data[Ft]=255,z.data[Ft+1]=Math.round(255*K(Dt,0,1)),z.data[Ft+2]=0,z.data[Ft+3]=255}b.putImageData(z,0,0),l.save(),Ot(Y),l.clip(),l.imageSmoothingEnabled=!0,l.drawImage(g,-60,-60,1120,1120),l.restore(),ut(Et)}{const c=[];let g=[];for(let b=-40;b<=1044;b+=4){const z=lt(b*.011,w+91)+.5*lt(b*.043,w+97);z>-.1?g.push([b,O(b)-1,3+5*K(z+.1,0,1)]):g.length&&(c.push(g),g=[])}g.length&&c.push(g),l.save(),Ot(Y),l.clip(),ut(It(1)),l.beginPath();for(const b of c)if(b.length>1){l.moveTo(b[0][0],b[0][1]);for(const z of b)l.lineTo(z[0],z[1]);for(let z=b.length-1;z>=0;z--)l.lineTo(b[z][0],b[z][1]+b[z][2]);l.closePath()}l.fill(),l.restore(),ut(Et)}const V=[],q=(c,g,b,z,k)=>V.push([c,g,b,z,k]),tt=()=>{if(V.length){l.save(),Ot(Y),l.clip(),ut(Et);for(const[c,g]of[[1.5,.4],[1.15,.5],[.8,.7]]){l.globalAlpha=g,l.beginPath();for(const[b,z,k,M,A]of V){let W=b-S,X=z-kt;const Q=Math.hypot(W,X)||1;W/=Q,X/=Q;const x=A||(1080-z)/Math.max(X,.2),F=b+W*x,st=z+X*x,Dt=-X,Ft=W,Zt=k*c/2,Ct=k*M*c/2;l.moveTo(b+Dt*Zt,z+Ft*Zt),l.lineTo(F+Dt*Ct,st+Ft*Ct),l.lineTo(F-Dt*Ct,st-Ft*Ct),l.lineTo(b-Dt*Zt,z-Ft*Zt),l.closePath()}l.fill()}l.restore(),ut(Et),V.length=0}};for(let c=0,g=2+(o()<.5?1:0);c<g;c++){const b=P+y(-260,260),z=y(22,62),k=z*y(.45,.8),M=O(b)+k*.25,A=Mt(b,M,z,k,y(.3,.55),.6,18,.16).map(W=>[W[0]+(W[1]-M)*y(-.2,.2),W[1]]);q(b,M+k*.3,z*1.3,L(1.6,2.4),k*L(2.5,4)),Ot(A),l.fill(),ge(A,Math.max(3,k*.2),.5,-Rt(b)*k*.12)}for(let c=0,g=3+Math.floor(o()*3);c<g;c++){const b=y(-20,1020),z=y(50,140),k=O(b)+4;q(b,k+2,z*.55,L(1.4,2),L(25,55));for(let M=0,A=3+Math.floor(o()*4);M<A;M++)dt(b+y(-.5,.5)*z,k-y(4,z*.25),y(22,50),.4)}l.lineWidth=1.3,l.beginPath();for(let c=-40;c<1040;c+=y(2,9)){const g=.5+.5*lt(c*.02,w+41);if(o()>.35+.65*g)continue;const b=O(c)+2,z=2+Math.floor(o()*5*g);for(let k=0;k<z;k++){const M=y(3,9+13*g),A=-Math.PI/2+(o()-.5)*1.3;l.moveTo(c+k*.7,b),l.quadraticCurveTo(c+Math.cos(A)*M*.5,b+Math.sin(A)*M*.6,c+Math.cos(A)*M+(o()-.5)*3,b+Math.sin(A)*M)}}l.stroke();const ct=[];if(o(),tt(),o()<.55){const c=y(30,42),g=h(c+80,30,ct,!0);if(g>=0){const b=O(g)-y(4,16),z=Xt(g,.05,.16);q(g,b,c,L(3,5)),tt();const k=ie({x:g,yb:b,yt:-70,w0:c,w1:c*.7,lean:z,sw:y(30,80)*(o()<.5?1:-1),sh:o()<.5,fl:.55,rim:1,col:2});for(let A=0;A<3;A++){const W=A===0?-1:A===1?1:o()<.5?-1:1,X=k.cxAt(b)+W*c*y(.3,.6),Q=[[X,b-4],[X+W*y(10,26),b+y(5,12)],[X+W*y(22,50),b+y(15,34)]];Pt(Q,[c*.2,c*.1]),ut(It(.5)),Pt(Q.map(x=>[x[0],x[1]-c*.05]),[c*.07,c*.035]),ut(Et)}const M=[];for(let A=0,W=1+(o()<.6?1:0);A<W;A++){const X=y(50,200),Q=A?Rt(g):-Rt(g),x=k.cxAt(X)+Q*c*.3;Wt(x,X,Q,y(100,220),y(5,8),y(.05,.45),Gt(x,Q,X+50),M,0)}for(const A of M)dt(A[0],A[1]-4,y(55,110),.5);ct.push({x:g,w:c})}}{const c=ie({x:m,yb:1060,yt:-70,w0:p,w1:p*.8,lean:Xt(m,.05,.16),sw:y(40,120)*(o()<.5?1:-1),sh:o()<.5,fl:.3,rim:1,col:1+Math.floor(o()*3)}),g=[];for(let b=0,z=2+Math.floor(o()*3);b<z;b++){const k=b?y(-70,150):y(-30,60),M=o()<.8?r:-r,A=c.cxAt(k)+M*c.wAt(k)*.35;Wt(A,k,M,y(110,300),y(6,10),y(-.1,.4),Gt(A,M,k+40),g,0)}for(const b of g)dt(b[0],b[1]-2,y(55,120),.45);if(o()<.5){const b=r>0?y(880,1080):y(-80,120),z=-r,k=y(-40,40),M=[];Wt(b,k,z,y(120,260),y(5,9),y(-.2,.2),Gt(b,z,k+60),M,0);for(const A of M)dt(A[0],A[1]-2,y(55,120),.45)}}}return Z}function ja(o){if(o.__c533)return o.__c533;const ht=!!o.getExtension("EXT_color_buffer_float")||!!o.getExtension("EXT_color_buffer_half_float");o.getExtension("KHR_parallel_shader_compile");const N=(i,h)=>{const E=o.createShader(i);return o.shaderSource(E,h),o.compileShader(E),E},Z=N(o.VERTEX_SHADER,Sa),l=N(o.VERTEX_SHADER,Wa),y=!!o.getExtension("EXT_color_buffer_float"),Vt=!(y||o.getExtension("EXT_color_buffer_half_float")),lt=i=>Vt?i.replace(Yt,Yt+`#define NEAR8
`):i,zt={den:[Z,Ba],base:[Z,Ia],near:[Z,lt(Ga)],comp:[Z,lt(qa)]},kt={lv:[Z,Pa],resp:[Z,Ua],seg:[l,Xa]},S={};for(const i in zt){const h=o.createProgram(),E=N(o.FRAGMENT_SHADER,zt[i][1]);o.attachShader(h,zt[i][0]),o.attachShader(h,E),o.linkProgram(h),S[i]={p:h,f:E,v:zt[i][0]}}o.flush();let vt=2654435769;const D=()=>(vt=Math.imul(vt^vt>>>15,739982445),vt=Math.imul(vt^vt>>>12,695872825),vt^=vt>>>15,vt&255),xt=new Uint8Array(64*64*64);for(let i=0;i<xt.length;i++)xt[i]=D();const Nt=new Uint8Array(256*256*4);for(let i=0;i<Nt.length;i++)Nt[i]=D();const Et=(i,h,E,H,w,P,B,j)=>{const U=o.createTexture();return o.bindTexture(o.TEXTURE_2D,U),o.texImage2D(o.TEXTURE_2D,0,E,i,h,0,H,w,j||null),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,P),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,P===o.NEAREST?o.NEAREST:o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,B),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,B),U},It=(i,h,E,H,w,P,B,j)=>{const U=o.createTexture();o.bindTexture(o.TEXTURE_3D,U),o.texImage3D(o.TEXTURE_3D,0,H,i,h,E,0,w,P,j||null),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(const d of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,d,B);return U},ut=i=>{const h=o.createFramebuffer();return o.bindFramebuffer(o.FRAMEBUFFER,h),i&&o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,i,0),h};o.pixelStorei(o.UNPACK_ALIGNMENT,1);const Rt=It(64,64,64,o.R8,o.RED,o.UNSIGNED_BYTE,o.REPEAT,xt),Pt=Et(256,256,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,o.LINEAR,o.REPEAT,Nt),Ot=It(re[0],re[1],re[2],o.RG8,o.RG,o.UNSIGNED_BYTE,o.CLAMP_TO_EDGE,null),ge=Et(8,1,o.RGBA32F,o.RGBA,o.FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,null),Mt=128,te=new Uint8Array(Mt*Mt*4),pt=new Float32Array(Mt*Mt),oe=new Float32Array(Mt*Mt);for(let i=0;i<28;i++){const h=D()/255,E=D()/255,H=D()/255,w=D()/255,P=D()/255,B=2+26*Math.pow(h,1.6),j=(E-.5)*2.2+(H<.12?Math.PI/2:0);let U=Math.round(Math.cos(j)*B),d=Math.round(Math.sin(j)*B);!U&&!d&&(U=3);const I=.06*Math.pow(Math.hypot(U,d),-1.25)*(.6+.8*w),O=P*6.2832;for(let Y=0;Y<Mt;Y++)for(let V=0;V<Mt;V++){const q=Math.cos(6.2832*(U*V+d*Y)/Mt+O)*I*6.2832,tt=Y*Mt+V;pt[tt]+=q*U,oe[tt]+=q*d}}for(let i=0;i<Mt*Mt;i++)te[i*4]=Math.max(0,Math.min(255,(pt[i]*.09+.5)*255)),te[i*4+1]=Math.max(0,Math.min(255,(oe[i]*.09+.5)*255)),te[i*4+3]=255;const at=Et(Mt,Mt,o.RGBA8,o.RGBA,o.UNSIGNED_BYTE,o.LINEAR_MIPMAP_LINEAR,o.REPEAT,te);o.generateMipmap(o.TEXTURE_2D);const Kt={uN3:0,uDen:1,uLV:2,uBase:3,uN:4,uSrc:5,uFl:6,uBolt:7,uMW:8,uProf:9,uWN:10,uReed:11,uNear:12,uMask:13},ot=i=>{for(const h in i){const E=i[h].p;if(!o.getProgramParameter(E,o.LINK_STATUS))throw new Error("533 "+h+": "+o.getShaderInfoLog(i[h].f)+" "+o.getShaderInfoLog(i[h].v)+" "+o.getProgramInfoLog(E));const H={p:E};i[h]=H;const w=o.getProgramParameter(E,o.ACTIVE_UNIFORMS);for(let P=0;P<w;P++){const B=o.getActiveUniform(E,P).name.replace("[0]","");H[B]=o.getUniformLocation(E,B)}o.useProgram(E);for(const P in Kt)H[P]&&o.uniform1i(H[P],Kt[P])}};let L=!1;const bt=()=>{L||(L=!0,ot(S))};let Ut={},se=0;const ce=Object.keys(kt),ae=i=>{if(!(S.lv||se>=ce.length)){do{const h=ce[se++],E=o.createProgram(),H=N(o.FRAGMENT_SHADER,kt[h][1]);o.attachShader(E,kt[h][0]),o.attachShader(E,H),o.linkProgram(E),Ut[h]={p:E,f:H,v:kt[h][0]}}while(i&&se<ce.length);o.flush()}},Ae=()=>{S.lv||(ae(!0),ot(Ut),Object.assign(S,Ut),Ut=null)},dt=o.createVertexArray(),Wt=o.createBuffer(),ie=o.createVertexArray();o.bindVertexArray(ie),o.bindBuffer(o.ARRAY_BUFFER,Wt),o.bufferData(o.ARRAY_BUFFER,1024*32,o.DYNAMIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,4,o.FLOAT,!1,32,0),o.vertexAttribDivisor(0,1),o.enableVertexAttribArray(1),o.vertexAttribPointer(1,4,o.FLOAT,!1,32,16),o.vertexAttribDivisor(1,1),o.bindVertexArray(null);const Ze=ut(null);o.bindFramebuffer(o.FRAMEBUFFER,null);const le={},nt=i=>{let h=le[i];if(!h){const E=Et(i,i,Vt?o.RGBA8:o.RGBA16F,o.RGBA,Vt?o.UNSIGNED_BYTE:o.HALF_FLOAT,o.NEAREST,o.CLAMP_TO_EDGE,null);h=le[i]={t:E,f:ut(E),sz:i}}return h},Xt=o.getExtension("KHR_parallel_shader_compile");let Gt=null;const p={nearT:le,nearFor:nt,ready:bt,lazy:Ae,prelink:ae,ov:()=>{if(!S.ov&&!Gt){const i=o.createProgram(),h=N(o.FRAGMENT_SHADER,lt(Ha));o.attachShader(i,Z),o.attachShader(i,h),o.linkProgram(i),o.flush(),Gt={ov:{p:i,f:h,v:Z}}}},ovOK:()=>S.ov?!0:!Gt||Xt&&!o.getProgramParameter(Gt.ov.p,Xt.COMPLETION_STATUS_KHR)?!1:(ot(Gt),S.ov=Gt.ov,Gt=null,!0),P:S,vao:dt,segBuf:Wt,segVao:ie,tN3:Rt,tN:Pt,tLV:Ot,tSrc:ge,tWN:at,fbLV:Ze,tex2:Et,tex3:It,fbo:ut,hf:ht,UNIT:Kt};return o.__c533=p,p}const jo=new Float32Array(1),Va=new Uint32Array(jo.buffer),jt=o=>{jo[0]=o;const t=Va[0],ht=t>>>16&32768,N=(t>>>23&255)-112,Z=t&8388607;return N<=0?ht:N>=31?ht|31743:ht|N<<10|Z>>>13};Xo.add({num:533,name:"Heat Lightning",fam:"Vistas",recipe:"A calm lake at night with a storm way across the water lighting up from inside, mirrored in the lake under the stars. What the storm looks like, how far off it is and the flash colour change every mint. Tap the cloud or its reflection and the next flashes come from there, drag across the lake to ruffle the reflection, or hold to build the storm until it flashes fast and crawls along the top.",interactive:"Tap the cloud or its reflection and the next burst of flashes comes from there (under the anvil it crawls as spider lightning); drag across the lake to send a breeze that breaks the mirror into streaks; hold and the storm builds, flashing faster and crawling along the anvil, and eases when you let go.",music:!0,gl:!0,fps:30,seed:0,make(o){const t=o.gl,ht=o.size,N=ja(t),Z=N.P,l=N.UNIT;t.pixelStorei(t.UNPACK_ALIGNMENT,1);const y=o.hash.slice(2).padEnd(64,"0");let Vt=parseInt(y.slice(0,8),16)>>>0,lt=parseInt(y.slice(8,16),16)>>>0,zt=parseInt(y.slice(16,24),16)>>>0,kt=parseInt(y.slice(24,32),16)>>>0;const S=()=>{const e=(Vt+lt|0)+kt|0;return kt=kt+1|0,Vt=lt^lt>>>9,lt=zt+(zt<<3)|0,zt=zt<<21|zt>>>11,zt=zt+e|0,(e>>>0)/4294967296};for(let e=0;e<16;e++)S();let vt=(parseInt(y.slice(32,40),16)^1540483477)>>>0;const D=()=>{vt=vt+1831565813|0;let e=Math.imul(vt^vt>>>15,1|vt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},xt=!!o.home,Nt=(e,a)=>{let n=0;for(const v of e)n+=v[1];let s=S()*n,f=e[e.length-1];for(const v of e)if(s-=v[1],s<0){f=v;break}return xt?e[a]:f},Et=(e,a,n)=>{const s=Nt(a,n);return o.trait(e,s[0]),s[2]},It=Nt([["24 km",2,24],["34 km",5,34],["46 km",3,46]],1),ut=Nt([["Classic anvil",5,0],["Overshooting top",3,1],["Twin cells",2,2],["Mammatus",1,3]],0)[2],Rt=Nt([["Pink-white",5,[1,.76,.9]],["Violet-white",3,[.84,.78,1]],["Smoky amber",1,[1,.66,.46]]],0),Pt=Nt([["Lazy",3,0],["Restless",5,1],["Spider crawlers",1,2]],1),Ot=Nt([["Milky Way core",5,0],["Milky Way overhead",3,1],["Airglow waves",1,2],["Perseids",1,3]],0),ge=Nt([["Glass",4,0],["Ripple line",4,1]],1),Mt=Nt([["One window",5,1],["Dark shore",2,0],["Two lights",1,2]],0);Nt([["Oak and birch",5,0],["Mixed pine",3,1]],0);let te=(parseInt(y.slice(40,48),16)^739982445)>>>0;const pt=()=>{te=te+1831565813|0;let e=Math.imul(te^te>>>15,1|te);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let oe=(parseInt(y.slice(48,56),16)^2135587861)>>>0;const at=()=>{oe=oe+1831565813|0;let e=Math.imul(oe^oe>>>15,1|oe);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Kt=e=>{let a=0;for(const s of e)a+=s[1];let n=at()*a;for(const s of e)if(n-=s[1],n<0)return s;return e[e.length-1]},ot=[["Lone tower",0],["Overshooting top",1],["Multicell cluster",2],["Mammatus",3],["Squall line",4],["Distant anvil",5]],L=Kt([[0,40],[2,22],[4,22],[5,16]].map(e=>[e[0],e[1],e[0]]))[2];let bt=xt?0:ut===0?L:ut===1?1:ut===2?2:3;const Ut=xt||at()<.5?1:-1;let se=(parseInt(y.slice(56,64),16)^461845907)>>>0,ce=(se^1759714724)>>>0;const ae=e=>()=>{e.v=e.v+1831565813|0;let a=Math.imul(e.v^e.v>>>15,1|e.v);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Ae=ae({v:se}),dt=ae({v:ce}),Wt=ae({v:(parseInt(y.slice(32,40),16)^4064682829)>>>0}),ie=Wt(),Ze=Wt(),le=Kt([["Moonless",6,0],["Late twilight",2,1],["Moonrise",2,2],["Old moon",1,3]]),nt=xt?0:le[2],Xt=!xt&&nt===0&&Ze<.22,Gt=bt;Xt&&(bt=5);const r=Ot[2],m=Rt[2],p=Pt[2],i=ge[2],h=Mt[2],E=xt?1:.94+.12*S(),H=Gt===5?at():0,w=Xt?250+80*Wt():bt===5?82+30*H:It[2]*E;o.trait("Distance",Xt?Math.round(w/10)*10+" km":bt===5?Math.round(w/5)*5+" km":It[0]),o.trait("Storm",Xt?"Below the horizon":ot[bt][0]),o.trait("Flash colour",Rt[0]),o.trait("Rhythm",Pt[0]),o.trait("Sky",Ot[0]),o.trait("Lake",ge[0]),o.trait("Cabin",Mt[0]),o.trait("Night",xt?"Moonless":le[0]);const P=[["From the dock",5,0],["Under the stars",2,1],["Into the mirror",2,2],["Storm at the edge",2,3]];let B=0;{let e=0;for(const n of P)e+=n[1];let a=pt()*e;for(const n of P)if(a-=n[1],a<0){B=n[2];break}}xt&&(B=0);const j=xt||!(B===0||B===3)||bt===5?0:ie<.17?1:0;o.trait("View",j?"Through the pines":P[B][0]);const U=w*w/12742,d=.85+.35*S(),I=9.2+.8*S(),O=12.2+.8*S(),Y=S(),V=bt===1?O+2.4+.6*Y:0,q=3.5+.9*S(),tt=.1+.1*S(),ct=17+4*S(),c=4.6+1.4*S(),g=2+Math.floor(S()*1.99),b=.6+.4*S(),z=.1+.25*S(),k=[S()*40,S()*40,S()*40],M=xt?.15:(S()-.5)*.5,A=[Ut*Math.cos(M),Ut*Math.sin(M)],W=[Math.sin(M),-Math.cos(M)],X=B===3?M-.36-.05*pt():B===1?(pt()-.5)*.3:B===2?M+.14+.1*pt():0,Q=B===1?.34+.06*pt():B===2?-.4-.04*pt():B===3?.04:0,x=[];let F=[-1,z],st=ct,Dt=c,Ft=.36,Zt=q*1.25,Ct=I;if(bt===4){const e=5+(at()<.5?1:0),a=-24+3*at(),n=9-2*at();for(let s=0;s<e;s++)x.push([a+(n-a)*(s+.2+.6*at())/e,-4+2.5*(at()-.5)+.8*Math.sin(s*1.7),2.4+1.1*at(),s===2||s===3?O-.4:8.4+3*at()]);F=[-.3,1],st=9+3*at(),Dt=(n-a)*.55,Ft=.12,Zt=2.5,Ct=I-.8}else if(bt===2){x.push([0,0,q*.85,O-.4]);const e=3+(at()<.5?1:0),a=[[-12,5],[7,-5],[-6,-7],[11,4],[-17,-3]];for(let n=0;n<e;n++){const s=a[(n+Math.floor(at()*5))%5];x.push([s[0]+2.5*(at()-.5),s[1]+2.5*(at()-.5),1.9+1.3*at(),d+(O-d)*(.4+.45*at())])}st=9+4*at(),Dt=3.6,Ft=.3}else{x.push([0,0,q,O-.3]);for(let e=0;e<g+(bt===5?0:1);e++)x.push([q*.9+1.6+e*2.5,-1.1-e*1.3+.8*Math.sin(e*2.1+k[2]),2.1-e*.35,d+(Ct-d)*(.6-e*.14)]);bt===5&&(st=ct+4,Dt=c+1),bt===1&&(st-=3)}{const e=Math.hypot(F[0],F[1]);F=[F[0]/e,F[1]/e]}const de=[-F[1],F[0]],$t=(e,a)=>tt*Math.max(a-d,0)*(e[3]/12),At=bt===4?[x.reduce((e,a)=>e+a[0],0)/x.length,x.reduce((e,a)=>e+a[1],0)/x.length]:[F[0]*$t(x[0],O),F[1]*$t(x[0],O)],$e=(e,a)=>(e-At[0])*F[0]+(a-At[1])*F[1],Se=e=>{const a=K(e/st,0,1);return Ct+(O-.55-Ct)*Math.pow(a,.7)},Ka=(e,a,n,s)=>{const f=F[0]*$t(e,n),v=F[1]*$t(e,n),u=e[3]-d,T=K((n-d)/u,0,1),R=e[2]*(1.3-.35*ee(0,.4,T)-.3*ee(.8,1,T)),C=e[3]-e[2]*.55,G=a-e[0]-f,rt=s-e[1]-v;return Math.min(n<C?R-Math.hypot(G,rt):R-Math.hypot(G,rt,(n-C)*1.6),n-d)},Be=(e,a,n)=>{let s=-9;for(const it of x)s=Math.max(s,Ka(it,e,a,n));const f=e-At[0],v=n-At[1],u=f*F[0]+v*F[1],T=f*de[0]+v*de[1],R=K(u/st,0,1),C=Dt+Ft*Math.max(u,0),G=O+.3*(1-R)-.8*R*R,rt=Se(u),_=(st-Zt)/2,et=(st+Zt)/2,J=(1-Math.hypot((u-_)/et,T/C))*Math.min(C,et)*.35;return Math.max(s,Math.min(G-a,a-rt,J))};let me=9,Re=-9,Ie=0;const ze=[];for(let e=0;e<=30;e++)for(let a=0;a<=18;a++)for(let n=0;n<=18;n++){const s=Te[0]+Ke[0]*e/30,f=Te[1]+Ke[1]*a/18,v=Te[2]+Ke[2]*n/18,u=Be(s,f,v);if(u>-2.2||f<d&&x.some(T=>Math.hypot(s-T[0],v-T[1])<T[2]*1.3)){const T=Math.atan2(s,v+w),R=Math.atan2(f-U,Math.hypot(s,v+w));T<me&&(me=T),T>Re&&(Re=T),R>Ie&&(Ie=R),u>-.6&&R<.45&&ze.push(T,R)}}me-=.06*34/w,Re+=.06*34/w,Ie+=.05*34/w;const ao=-.006,wo=(e,a,n,s,f)=>[(Math.atan2(e,n+w)-me)/(Re-me)*s,(Math.atan2(a-U,Math.hypot(e,n+w))-ao)/(Ie-ao)*f],ke=N.hf?{i4:t.RGBA16F,i2:t.RG16F,f2:t.RG,ty:t.HALF_FLOAT}:{i4:t.RGBA8,i2:t.RGBA8,f2:t.RGBA,ty:t.UNSIGNED_BYTE},Vo=o.hash+(o.home?"h":""),no=N.shOK||(N.shOK=new Map),go=e=>{const a=e.deref();return!!a&&t.isTexture(a)};for(const[e,a]of no)(!go(a.den)||!go(a.base)||!go(a.mw))&&no.delete(e);const Pe=no.get(Vo),Ko=Pe&&Pe.den.deref(),Zo=Pe&&Pe.base.deref(),$o=Pe&&Pe.mw.deref(),De=!!(Ko&&Zo&&$o),ro=De?Ko:N.tex3(Le[0],Le[1],Le[2],t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.CLAMP_TO_EDGE,null),so=De?Zo:N.tex2(Ne,Oe,ke.i4,t.RGBA,ke.ty,t.LINEAR,t.CLAMP_TO_EDGE,null),Qo=De?null:N.fbo(so),Jo=N.tex2(Ne,Oe,ke.i4,t.RGBA,ke.ty,t.LINEAR,t.CLAMP_TO_EDGE,null),ta=N.fbo(Jo),Qe=o.tile?qo/2:qo,Je=o.tile?Ho/2:Ho,Za=o.tile?.5:1,ea=N.tex2(Qe,Je,ke.i2,ke.f2,ke.ty,t.LINEAR,t.CLAMP_TO_EDGE,null),oa=N.fbo(ea),Ao=De?$o:N.tex2(2048,448,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.CLAMP_TO_EDGE,null),aa=De?null:N.fbo(Ao);t.bindFramebuffer(t.FRAMEBUFFER,ta),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,oa),t.clear(t.COLOR_BUFFER_BIT);const na=De?null:N.fbo(null),co=xt?-.3:-.36+.2*S(),io=.42,$a=-36.5,Qa=4.4,Ro=.56,xe=[Math.cos(co),Math.sin(co)],ve=[Math.sin(co),-Math.cos(co)],lo=Math.atan2(-ve[0],ve[1]),Nn=(e,a)=>Math.atan2(e,-a),zo=e=>{for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},pe=[[-180,36],[-155,37],[-132,52],[-112,120],[-92,250],[-70,420],[-48,1100],[-30,1650],[-14,3600],[0,4600],[16,5200],[34,3500],[55,1350],[78,720],[100,520],[122,210],[145,58],[165,40],[180,36]],ra=pe.map(()=>.85+.3*S()),ko=e=>{const a=zo(e-lo+Math.PI)*180/Math.PI;let n=0;for(;n<pe.length-2&&pe[n+1][0]<a;)n++;const s=K((a-pe[n][0])/(pe[n+1][0]-pe[n][0]),0,1),f=s*s*(3-2*s);return Math.exp(Math.log(pe[n][1]*ra[n])*(1-f)+Math.log(pe[n+1][1]*ra[n+1])*f)},to=(e,a)=>{let n=Math.imul((e|0)^668265261,374761393)^Math.imul(a+77,2654435761)^Vt;return n=Math.imul(n^n>>>15,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),((n^n>>>16)>>>0)/4294967296},Ja=.08,fo=(e,a,n,s,f)=>{const v=Math.floor(e/f);let u=0;for(let T=-3;T<=3;T++){const R=v+T,C=to(R,a),G=to(R,a+1),rt=to(R,a+2);if(to(R,a+3)<.06)continue;const et=(R+.5+(C-.5)*.9)*f,J=n+(s-n)*G,it=e-et;let mt=-20;if(rt<Ja){const wt=f*(.35+.25*C),gt=Math.abs(it)/wt;gt<1&&(mt=J-J*.8*Math.pow(gt,1.15)-.6*Math.exp(-gt*12)*0+.4*Math.sin(e*4.1+R))}else{const wt=f*(.75+.55*C),gt=Math.min(wt*(1.1+.5*rt),J*.7),Lt=it/wt,St=Math.abs(Lt);St<1?mt=J-gt+gt*Math.sqrt(1-Lt*Lt)+.45*Math.sin(e*2.3+R*1.7)*Math.sqrt(1-Lt*Lt):St<1.6&&(mt=J-gt-(St-1)*gt*1.6)}u+=Math.exp(mt/1.2)}return Math.max(n*.35+.8*Math.sin(e*.37+a),1.2*Math.log(u+1e-9))},Do=(e,a,n)=>{let s=0,f=1,v=1;for(let u=0;u<4;u++)s+=v*Math.sin(e*f*3+to(u,a)*6.28),f*=2.1,v*=.48;return n*(.55+.32*s)},qt=new Uint16Array(Ce*3*4);for(let e=0;e<Ce;e++){const a=(e+.5)/Ce*2*Math.PI-Math.PI,n=Math.abs(zo(a-lo)),s=Math.abs(zo(a-(lo+Math.PI))),f=ko(a);let v,u=3.2,T=1;const R=n<.36;if(f<1400){const gt=fo(a*f,11,7,16,7.5),Lt=R?0:1,St=a*f;v=.9+Lt*gt+(1-Lt)*(.9+.5*Math.sin(St*.9)+.4*Math.sin(St*2.3+1)+.3*Math.sin(St*5.1)),R&&(u=.5)}else v=12+Do(a,21,45)+fo(a*f,13,9,16,9)*.6,u=4;let C=Math.max(f+70,900+1400*(.5+.5*Math.sin(a*1.7+1))),G=30+Do(a,31,120)+fo(a*C,17,10,18,10),rt=3;R&&(C=f+38+12*Math.sin(a*9),G=fo(a*C,23,11,21,8),rt=2.4),G=s<.5?-10:G*ee(.5,.85,s)-2*(1-ee(.5,.85,s));let _=5200+1800*Math.sin(a*2.3),et=140+Do(a,41,260),J=6;et=s<.45?-10:et*ee(.45,.8,s)-2*(1-ee(.45,.8,s));const it=e*4;qt[it]=jt(f),qt[it+1]=jt(v),qt[it+2]=jt(u),qt[it+3]=jt(T);const mt=(Ce+e)*4;qt[mt]=jt(C),qt[mt+1]=jt(G),qt[mt+2]=jt(rt),qt[mt+3]=jt(.85);const wt=(2*Ce+e)*4;qt[wt]=jt(_),qt[wt+1]=jt(et),qt[wt+2]=jt(J),qt[wt+3]=jt(.7)}const Fo=t.createTexture();t.bindTexture(t.TEXTURE_2D,Fo),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,Ce,3,0,t.RGBA,t.HALF_FLOAT,qt),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const sa=[[-2.7,7.6,1.1,1.45],[-3.6,-15,1.3,1.7],[3.4,-19,1.6,1.8],[-5.5,-24,2.4,1.9],[6.5,-26,2.6,2],[-11,-28,3.2,2.1],[12,-30,3.4,2],[-1.9,-30.5,.9,1.7],[2.3,-32,1.2,1.9],[17,-33,3,1.9]],Bt=new Float32Array(16*2*4);sa.forEach((e,a)=>{const n=e[0]-io,s=e[1];Bt[a*4]=n*xe[0]+s*ve[0],Bt[a*4+1]=n*xe[1]+s*ve[1],Bt[a*4+2]=e[2]*(.85+.3*S()),Bt[a*4+3]=e[3]*(.9+.2*S());const f=(16+a)*4;Bt[f]=Math.floor(S()*5e3),Bt[f+1]=.028+.02*S(),Bt[f+2]=.5+.5*S()});const ca=e=>{let a=0,n=0;e.forEach(v=>{a+=Bt[v*4],n+=Bt[v*4+1]}),a/=e.length,n/=e.length;let s=0,f=0;return e.forEach(v=>{s=Math.max(s,Math.hypot(Bt[v*4]-a,Bt[v*4+1]-n)+Bt[v*4+2]+.5),f=Math.max(f,Bt[v*4+3]*1.1)}),[a,n,s,f]},tn=ca([0]),en=ca([1,2,3,4,5,6,7,8,9]),on=N.tex2(16,2,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,t.CLAMP_TO_EDGE,Bt),_o=xt?-.47:-.6+.3*S(),ia=ko(_o)-25,an=h?[Math.sin(_o)*ia,3.4,-Math.cos(_o)*ia,1.6]:[0,0,0,0],Lo=.7+.5*S(),la=ko(Lo)-30,nn=h===2?[Math.sin(Lo)*la,6,-Math.cos(Lo)*la,1.1]:[0,0,0,0],ne=(e,a)=>[Math.sin(e)*Math.cos(a),Math.sin(a),-Math.cos(e)*Math.cos(a)],fa=(e,a)=>[e[1]*a[2]-e[2]*a[1],e[2]*a[0]-e[0]*a[2],e[0]*a[1]-e[1]*a[0]],fe=e=>{const a=Math.hypot(e[0],e[1],e[2]);return[e[0]/a,e[1]/a,e[2]/a]},Ue=xt?0:1,eo=r===1?ne(-1.1+.3*S()*Ue,-.3):ne(-.42+(S()-.5)*.3*Ue,.16+.08*S()*Ue),rn=r===1?ne(2.2+.4*S()*Ue,1.2):ne(.9+.6*S()*Ue,.95+.2*S()*Ue),ho=fe(fa(eo,rn)),No=fe(fa(ho,eo)),sn=xt?.6:.25+.7*S(),ha=xt?1:at(),ua=Ae(),da=xt||bt===5||ua<.38?0:ua<.66?1:2,We=ne(.9+.9*at(),.5+.25*at());let uo=K(M-Ut*(.3+.2*at()),X-.42,X+.42),mo=nt===2?.035+.07*at():.07+.1*at();if(nt===3){mo=.087+.7*(mo-.07);const e=(u,T)=>{const R=Ut*(u-M),C=Math.cos(T);let G=9;for(let rt=0;rt<ze.length;rt+=2){const _=(R-ze[rt])*C,et=T-ze[rt+1];G=Math.min(G,_*_+et*et)}return Math.sqrt(G)},a=[];let n=0;for(let u=-46;u<=46;u++){const T=X+u*.01,R=e(T,mo);a.push([T,R]),n=Math.max(n,R)}const s=Math.min(n,.14);let f=a[0],v=9;for(const u of a)u[1]>=s-1e-6&&Math.abs(u[0]-uo)<v&&(v=Math.abs(u[0]-uo),f=u);uo=f[0]}const Qt=ne(uo,mo),Xe=nt===2?.45+.4*at():2.25+.35*at(),Oo=fe([Qt[0]*Qt[1],Qt[1]*Qt[1]-1,Qt[2]*Qt[1]]),cn=fe([-Qt[0]*Math.cos(Xe)+Oo[0]*Math.sin(Xe),-Qt[1]*Math.cos(Xe)+Oo[1]*Math.sin(Xe),-Qt[2]*Math.cos(Xe)+Oo[2]*Math.sin(Xe)]),ma=nt===2?1:nt===3?.15:0,Co=M+Ut*(.1+.5*at()),ln=nt===1?1:0,xa=e=>[e[0]*A[0]+e[2]*A[1],e[1],e[0]*W[0]+e[2]*W[1]],va=nt>=2?[...xa(Qt),nt===3?.4:ma]:nt===1?[...xa(ne(Co,.04)),.5]:[0,1,0,0],fn=nt>=2?[.62,.68,.8]:nt===1?[.8,.6,.66]:[.55,.6,.78],So=(e,a,n)=>e.map((s,f)=>s+(a[f]-s)*K(n,0,1)),hn=w<=34?So([.86,.95,1.12],[1,.97,.97],(w-24)/10):w<=46?So([1,.97,.97],[1.05,.84,.82],(w-34)/12):So([1.05,.84,.82],[1.12,.68,.4],(w-46)/50),un=m[0]<.9?[.92,.52,.78]:m[2]<.6?[1,.46,.22]:[1,.5,.42];N.ready(),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(N.vao),t.activeTexture(t.TEXTURE0+l.uN3),t.bindTexture(t.TEXTURE_3D,N.tN3),t.activeTexture(t.TEXTURE0+l.uN),t.bindTexture(t.TEXTURE_2D,N.tN);const dn=S()*200,mn=S()*200,xn=14,vn=.45,pn=.0028,pa=new Float32Array([me,Re,ao,Ie,w,xn,vn,d,O,U,pn,va[3]]);if(!De){t.useProgram(Z.den.p),t.uniform4fv(Z.den.uS,[d,Ct,O,V,st,Dt,Ft,Zt,bt===3?1:0,x.length,b,tt,k[0],k[1],k[2],0,At[0],At[1],F[0],F[1]]);{const e=new Float32Array(32);x.forEach((a,n)=>e.set(a,n*4)),t.activeTexture(t.TEXTURE0+l.uSrc),t.bindTexture(t.TEXTURE_2D,N.tSrc),t.texSubImage2D(t.TEXTURE_2D,0,0,0,8,1,t.RGBA,t.FLOAT,e)}t.bindFramebuffer(t.FRAMEBUFFER,na),t.viewport(0,0,Le[0],Le[1]);for(let e=0;e<Le[2];e++)t.framebufferTextureLayer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,ro,0,e),t.uniform1f(Z.den.uLayer,e),t.drawArrays(t.TRIANGLES,0,3);t.useProgram(Z.base.p),t.uniform1f(Z.base.uMode,1),t.uniform1f(Z.base.uK,6),t.uniform4f(Z.base.uM,dn,mn,r===2?.35:.45,.9),t.bindFramebuffer(t.FRAMEBUFFER,aa),t.viewport(0,0,2048,448),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(Z.base.p),t.uniform1f(Z.base.uMode,0),t.uniform4fv(Z.base.uW,pa),t.uniform4fv(Z.base.uMo,va),t.activeTexture(t.TEXTURE0+l.uDen),t.bindTexture(t.TEXTURE_3D,ro),t.bindFramebuffer(t.FRAMEBUFFER,Qo),t.viewport(0,0,Ne,Oe),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null);for(const e of[na,aa,Qo])t.deleteFramebuffer(e);no.set(Vo,{den:new WeakRef(ro),base:new WeakRef(so),mw:new WeakRef(Ao)})}const Bo=new Float32Array(32),bn=(e,a)=>{N.lazy(),Bo.fill(0),a.forEach((u,T)=>{Bo.set(u,T*4)}),t.activeTexture(t.TEXTURE0+l.uSrc),t.bindTexture(t.TEXTURE_2D,N.tSrc),t.texSubImage2D(t.TEXTURE_2D,0,0,0,8,1,t.RGBA,t.FLOAT,Bo),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(N.vao),t.activeTexture(t.TEXTURE0+l.uDen),t.bindTexture(t.TEXTURE_3D,ro),t.activeTexture(t.TEXTURE0+l.uN3),t.bindTexture(t.TEXTURE_3D,N.tN3),t.useProgram(Z.lv.p),t.uniform4f(Z.lv.uL,a.length,1.45,1.35,.008),t.bindFramebuffer(t.FRAMEBUFFER,N.fbLV),t.viewport(0,0,re[0],re[1]);for(let u=0;u<re[2];u++)t.framebufferTextureLayer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,N.tLV,0,u),t.uniform1f(Z.lv.uLayer,u),t.drawArrays(t.TRIANGLES,0,3);t.activeTexture(t.TEXTURE0+l.uLV),t.bindTexture(t.TEXTURE_3D,N.tLV),t.activeTexture(t.TEXTURE0+l.uBase),t.bindTexture(t.TEXTURE_2D,so);let n=0,s=0,f=0,v=0;for(const u of a)n+=u[0]*u[3],s+=u[1]*u[3],f+=u[2]*u[3],v+=u[3];t.useProgram(Z.resp.p),t.uniform4fv(Z.resp.uW,pa),t.uniform4f(Z.resp.uLc,n/v,s/v,f/v,3),t.bindFramebuffer(t.FRAMEBUFFER,ta),t.viewport(0,0,Ne,Oe),t.colorMask(e===0,e===0,e===1,e===1),t.drawArrays(t.TRIANGLES,0,3),t.colorMask(!0,!0,!0,!0)},ba=new Float32Array(1024*8),yn=(e,a)=>{if(N.lazy(),t.bindFramebuffer(t.FRAMEBUFFER,oa),t.viewport(0,0,Qe,Je),t.colorMask(e===0,e===1,!1,!1),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),a&&a.length){const n=Math.min(1024,a.length);for(let s=0;s<n;s++){const f=a[s],v=wo(f[0],f[1],f[2],Qe,Je),u=wo(f[3],f[4],f[5],Qe,Je);ba.set([v[0],v[1],u[0],u[1],f[6]*Za,f[7],0,0],s*8)}t.bindBuffer(t.ARRAY_BUFFER,N.segBuf),t.bufferSubData(t.ARRAY_BUFFER,0,ba,0,n*8),t.useProgram(Z.seg.p),t.uniform2f(Z.seg.uRes,Qe,Je),t.bindVertexArray(N.segVao),t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE),t.drawArraysInstanced(t.TRIANGLES,0,6,n),t.disable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.bindVertexArray(N.vao)}t.colorMask(!0,!0,!0,!0)},ya=e=>Math.hypot(e[0],e[2]+w),Ea=(e,a,n,s,f)=>{const v=[];let u=0;const T=e+Math.floor(D()*a);for(let R=0;R<T;R++)v.push([u,R?.45+.55*D():1,f+.07*D()]),u+=n+s*D();return[v,u]},xo=(e,a)=>{const n=[];let s=e[0],f=e[1],v=e[2],u=D()*6.283,T=null;for(let G=0;G<8;G++){n.push([s,f,v,1]),G===3&&D()<.7&&(T=[s,f,v,u+(D()<.5?-1:1)*(.7+.7*D())]),T&&G>=5&&(s=T[0],f=T[1],v=T[2],u=T[3],T=null),u+=(D()-.5)*1.2;const rt=.8+.9*D(),_=K(f+(D()-.45)*.9,d+.6,O-.3);for(let et=0;et<4;et++){const J=s+Math.cos(u)*rt,it=v+Math.sin(u)*rt;if(Be(J,_,it)>.5){s=J,f=_,v=it;break}u+=1.7}}n.forEach(G=>{G[3]=1/n.length});const[R,C]=Ea(2,4,.1,.13,.07);return{src:n,strokes:R,cc:.3+.25*D(),ccDur:C+.25,gain:a*(.75+.5*D()),segs:null,bolt:0,dist:ya(e)}},Ma=()=>{if(D()<.2){const u=D()*st*.3;return[At[0]+F[0]*u,Ct-.3,At[1]+F[1]*u]}let e=0;for(const u of x)e+=u[2]*u[3];let a=D()*e,n=x[0];for(const u of x)if(a-=u[2]*u[3],a<0){n=u;break}const s=d+1.2+D()*(n[3]-d-2.4),f=-Math.PI/2+(D()-.5)*2.4,v=n[2]*(.1+.35*D());return[n[0]+F[0]*$t(n,s)+Math.cos(f)*v,s,n[1]+F[1]*$t(n,s)+Math.sin(f)*v]},Io=(e,a,n)=>{const s=[],f=[],v=(R,C,G,rt,_,et,J)=>{for(let it=0;it<rt;it++){G+=(D()-.5)*.7;const mt=.28+.2*D(),wt=Math.cos(G),gt=Math.sin(G),Lt=R+(F[0]*wt+de[0]*gt)*mt,St=C+(F[1]*wt+de[1]*gt)*mt,Me=$e(R,C),Ca=$e(Lt,St);if(Be(Lt,Se(Ca)+.3,St)<-.5)break;s.push([R,Se(Me)-.1,C,Lt,Se(Ca)-.1,St,et,_*(1-.5*it/rt)]),J<2&&D()<.2&&v(Lt,St,G+(D()<.5?-1:1)*(.6+.6*D()),3+Math.floor(D()*8),_*.55,et*.75,J+1),R=Lt,C=St,J===0&&it%Math.max(1,Math.floor(rt/4))===0&&f.length<6&&f.push([R,Se($e(R,C))+.35,C,0])}};v(e,a,(D()-.5)*.8,18+Math.floor(D()*26),.85,1.2,0),f.length||f.push([e,Se($e(e,a))+.35,a,0]),f.forEach(R=>{R[3]=1/f.length});const[u,T]=Ea(2,3,.12,.16,.1);return{src:f,strokes:u,cc:.45+.2*D(),ccDur:T+.45,gain:n*(.8+.4*D()),segs:s,bolt:.9,dist:ya([e,0,a])}},En=()=>{const e=q*.4+D()*st*.35,a=(D()-.5)*Dt;return Io(At[0]+F[0]*e+de[0]*a,At[1]+F[1]*e+de[1]*a,1)},Mn=()=>{const e=x[bt===4?2:0],a=d+(e[3]-d)*.45,n=d+(e[3]-d)*.8,s=xo([e[0]+e[2]*.25,a,e[1]-e[2]*.45],1.6),f=T=>[e[0]+F[0]*$t(e,T),e[1]+F[1]*$t(e,T)],v=f(a),u=f(n);if(s.src=[[v[0]+e[2]*.3,a-.4,v[1]-e[2]*.55,.16],[v[0]+e[2]*.1,a+.5,v[1]-e[2]*.5,.16],[v[0]-e[2]*.15,a+1.6,v[1]-e[2]*.3,.16],[u[0]-e[2]*.15,n,u[1]-e[2]*.3,.14],[At[0]+F[0]*q*.9,Ct+.3,At[1]+F[1]*q*.9-.5,.14],[At[0]+F[0]*q*1.9,Ct+.2,At[1]+F[1]*q*1.9,.12],[v[0]+e[2]*.6,a-1.2,v[1]-e[2]*.2,.12]],s.src.forEach(T=>{T[2]+=e[2]*.3}),ha<.3?s.src.forEach(T=>{const R=T[2]+e[2]*.75,C=T[0]+e[2]*.15;Be(C,T[1],R)>.4&&(T[0]=C,T[2]=R)}):ha<.55&&s.src.forEach((T,R)=>{const C=q*(.4+R*.5);T[0]=At[0]+F[0]*C+de[0]*(R%2-.5),T[1]=Ct+.25,T[2]=At[1]+F[1]*C+de[1]*(R%2-.5)-1}),da===2){let T=null;for(const R of x.slice(1))R[3]>d+3&&R[1]>(T?T[1]:e[1]+1.5)&&(T=R);s.src.forEach((R,C)=>{if(T){const G=d+(T[3]-d)*(.3+.08*C);R[0]=T[0]+F[0]*$t(T,G)+T[2]*.3*Math.cos(C*2.1),R[1]=G,R[2]=T[1]+F[1]*$t(T,G)+T[2]*(.2+.25*Math.sin(C*1.7))}else{const G=R[2]+e[2]*1.15,rt=R[0]-e[2]*.1;Be(rt,R[1],G)>.3&&(R[0]=rt,R[2]=G)}})}return s.strokes=[[0,1,.1],[.13,.7,.09],[.26,.85,.1],[.355,1,.12]],s.cc=.4,s.ccDur=.7,s},Tn=(e,a)=>e<0?0:(1-Math.exp(-e/.012))*Math.exp(-e/a),Ge=(e,a,n)=>{if(!e||a<0)return 0;let s=0;for(const f of e.strokes)s+=f[1]*Tn(a-f[0],n?f[2]*.55:f[2]);return s+=e.cc*(n?.25:1)*ee(0,.06,a)*(1-ee(e.ccDur*.55,e.ccDur,a)),s*e.gain},yt=[{ev:null,t0:-99},{ev:null,t0:-99}],vo=[],wn=(e,a)=>{const n=Ge(yt[0].ev,a-yt[0].t0,!1),s=Ge(yt[1].ev,a-yt[1].t0,!1),f=n<=s?0:1;yt[f]={ev:e,t0:a},bn(f,e.src),yn(f,e.segs)},he=Math.tan(31*Math.PI/180),Ta=.05,ft={e:[0,Ro+1.55,0],f:[0,0,-1],r:[1,0,0],u:[0,1,0]},gn=()=>{const e=o.view||Go,a=X+(e.yaw||0),n=Ta+K(Q+(e.pitch||0),-1.25,1.25),s=Math.cos(a),f=Math.sin(a),v=Math.cos(n),u=Math.sin(n);ft.f=[f*v,u,-s*v],ft.r=[s,0,f],ft.u=[-f*u,v,s*u];const T=e.x||0,R=e.z||0,C=K(io+T*xe[0]+R*xe[1],-.7,.7)-io,G=K(T*ve[0]+R*ve[1],-30,3.8);ft.e=[C*xe[0]+G*ve[0],Ro+1.55+K(e.y||0,-.6,.3),C*xe[1]+G*ve[1]]},wa=(e,a)=>{const n=(e*2-1)*he,s=(1-a*2)*he;return fe([ft.f[0]+n*ft.r[0]+s*ft.u[0],ft.f[1]+n*ft.r[1]+s*ft.u[1],ft.f[2]+n*ft.r[2]+s*ft.u[2]])},ga=j>0||nt===3||Xt,be=Ta+K(Q,-1.25,1.25),po=[Math.sin(X)*Math.cos(be),Math.sin(be),-Math.cos(X)*Math.cos(be)],bo=[Math.cos(X),0,Math.sin(X)],yo=[-Math.sin(X)*Math.sin(be),Math.cos(be),Math.cos(X)*Math.sin(be)],Aa=1024,Ra=he*1.12;let qe=null;if(ga&&(N.ov(),j)){const e=N.mkM||(N.mkM=new Map);for(const[a,n]of e)(!n.deref()||!t.isTexture(n.deref()))&&e.delete(a);if(qe=e.get(o.hash)&&e.get(o.hash).deref(),!qe){const a=C=>{const G=C[0]*po[0]+C[1]*po[1]+C[2]*po[2];return[500+500*(C[0]*bo[0]+C[1]*bo[1]+C[2]*bo[2])/G/he,500-500*(C[0]*yo[0]+C[1]*yo[1]+C[2]*yo[2])/G/he,G]};let n=1e9,s=-1e9,f=1e9;for(let C=0;C<ze.length;C+=2){const G=a(ne(M+Ut*ze[C],ze[C+1]));G[2]<.1||G[0]<-50||G[0]>1050||G[1]>1e3||(n=Math.min(n,G[0]),s=Math.max(s,G[0]),f=Math.min(f,G[1]))}const v=a(ne(M,Math.atan(((d+O)/2-U)/w))),u={hy:500+500*Math.tan(be)/he,cx:K(v[0],0,1e3),s0:K(n,0,1e3),s1:K(s,0,1e3),st:Math.max(f,0),pit:be,tanh:he},T=ae({v:Wt()*4294967296>>>0}),R=Ya(T,u,Aa,Aa/2/(500*Ra/he));qe=t.createTexture(),t.bindTexture(t.TEXTURE_2D,qe),t.texImage2D(t.TEXTURE_2D,0,t.RG8,t.RG,t.UNSIGNED_BYTE,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),e.set(o.hash,new WeakRef(qe))}}const He=new Float32Array(32),An=1.2,Rn=(nt===0?[4,5,11]:nt===1?[8,5,10]:[6,7,12]).map(e=>e/255),zn=(nt===0?[8,10,16]:nt===1?[12,10,14]:[10,12,16]).map(e=>e/255);let Po=0;const za=(e,a)=>{const n=wa(e,a);if(n[1]>-.004)return null;const s=ft.e[1]/-n[1];return s<400?[ft.e[0]+n[0]*s,ft.e[2]+n[2]*s,s]:null};let Jt=null;const kn=e=>{const a=[e[0]*A[0]+e[2]*A[1],Math.abs(e[1]),e[0]*W[0]+e[2]*W[1]];let n=-99,s=w,f=-1;for(let T=8;T<w+40;T+=.25*w/34){const R=a[0]*T,C=U+a[1]*T,G=a[2]*T-w;if(C>17||G>14)break;const rt=Be(R,C,G);if(rt>.2){f=T;break}rt>n&&(n=rt,s=T)}const v=f>0?f+1.1:s;let u=[a[0]*v,K(U+a[1]*v,d+.6,O-.4),a[2]*v-w];u=[K(u[0],Te[0]+1,Te[0]+Ke[0]-1),u[1],K(u[2],Te[2]+1,Te[2]+Ke[2]-1)],Jt={p:u,n:2+Math.floor(D()*2),spider:u[1]>Ct-.9&&$e(u[0],u[2])>q*.7}},$=new Float32Array(40*4),Dn=17+14*at(),Ye=[.3,p===0?-1:1.85,3.62];let ue=0,ye=99,Fe=0,_t=null,oo=0,Uo=0,je=Math.cos(.4),Ve=Math.sin(.4),Wo=0,ka=-9;const Ee=[];let Ht=null,Da=r===3?3.4+.4*S():6+S()*6;const Eo=()=>K(oo/3,0,1),Fn=()=>(p===1?3+Math.floor(D()*4):2+Math.floor(D()*3))+Math.floor(Eo()*4),Fa=()=>(p===0?13+15*D():p===1?5+9*D():8+10*D())*(1-.93*Eo()),_n=()=>(.18+1.5*D()*D())*(1-.4*Eo()),_a=()=>{if(Jt&&Jt.n>0){Jt.n--;const e=Jt.p,a=Jt.spider;return Jt.n||(Jt=null),a?Io(e[0]+(D()-.5)*2,e[2]+(D()-.5)*2,1.1):xo([e[0]+(D()-.5)*1.6,e[1],e[2]+(D()-.5)*1.6],1.1)}return D()<(p===2?.55:.16)+.4*Eo()?En():xo(Ma(),.6+.7*D())},Tt={u:.5,v:.3,r:.02,a:0,t0:-9,dur:.2,next:.9+dt()*.6},La=(e,a)=>{const n=wo(e[0],e[1],e[2],1,1),s=x.reduce((f,v)=>Math.hypot(e[0]-v[0],e[2]-v[1])<Math.hypot(e[0]-f[0],e[2]-f[1])?v:f,x[0]);Tt.u=n[0],Tt.v=n[1],Tt.r=s[2]*(.45+.3*dt())/w/(Re-me),Tt.a=a,Tt.dur=.2+.45*dt()*dt()},Na=()=>{let e=0;for(const u of x)e+=u[2]*u[3];let a=dt()*e,n=x[0];for(const u of x)if(a-=u[2]*u[3],a<0){n=u;break}const s=d+1+dt()*(n[3]-d-2),f=dt()*6.283,v=n[2]*.35*dt();return[n[0]+F[0]*$t(n,s)+Math.cos(f)*v,s,n[1]+F[1]*$t(n,s)+Math.sin(f)*v+n[2]*.3]};let _e=Na();const Oa=(e,a)=>{a=Math.min(a||0,.1),Uo++,Uo>2&&Uo<6&&N.prelink(!1),gn();const n=o.input,s=n&&n.taps?n.taps():[];for(const _ of s)_t={x:_.x,y:_.y,t:e,moved:!1,prev:za(_.x,_.y)},kn(wa(_.x,_.y)),La(Jt.p,.16),Tt.t0=e,Tt.dur=.35,_e=Jt.p,Tt.next=e+.5,ue>=Ye.length&&ye-e>1.6&&(ye=e+.5+1.1*D(),Fe=Math.max(Fe,Jt.n));if(_t)if(n.down)if(Math.hypot(n.x-_t.x,n.y-_t.y)>.02&&(_t.moved||(Jt=null),_t.moved=!0),_t.moved){const _=za(n.x,n.y);if(_&&_t.prev){const et=_[0]-_t.prev[0],J=_[1]-_t.prev[1],it=Math.hypot(et,J);if(it>.05){je+=(et/it-je)*.3,Ve+=(J/it-Ve)*.3;const mt=Math.hypot(je,Ve)||1;je/=mt,Ve/=mt,Ee.length>=6&&Ee.shift(),Ee.push({x:_[0],z:_[1],r:3+_[2]*.18,a0:.055+Math.min(.05,it*.01),age:0,vx:je*2.4,vz:Ve*2.4}),_t.prev=_,e-ka>.35&&o.sound&&(ka=e,o.sound.hit("noise",.1,{cutoff:2600,dur:.5}))}}else _&&(_t.prev=_)}else e-_t.t>.3&&(oo+=a);else _t=null;for((!_t||!n.down||_t.moved)&&(oo=Math.max(0,oo-a*.8));ue<Ye.length&&e>=Ye[ue];)Ye[ue]>=0&&vo.push(ue===2?p===2||da===1?Io(At[0]+F[0]*q*.8,At[1]+F[1]*q*.8,p===2?1.3:1.6):Mn():ue===0?xo(Ma(),1):_a()),ue++,ue===Ye.length&&(ye=e+.9+D()*.8,Fe=1+Math.floor(D()*2));oo>.05&&Fe===0&&(ye=Math.min(ye,e+Fa())),ue>=Ye.length&&e>=ye&&(vo.push(_a()),Fe>0?(Fe--,ye=e+_n()):(ye=e+Fa(),Fe=Fn()-1)),vo.length&&wn(vo.shift(),e),Wo=0;for(const _ of Ee)_.age+=a,_.x+=_.vx*a,_.z+=_.vz*a,_.r+=1.3*a,Wo+=_.a0*Math.exp(-_.age/3.5);for(;Ee.length&&Ee[0].age>14;)Ee.shift();if(r===3&&e>Da){const _=D()<.8?X+(D()-.5)*1.1:D()*6.28,et=(B===1?.5:.3)+.35*D(),J=ne(_,et),it=J[0]*We[0]+J[1]*We[1]+J[2]*We[2],mt=fe([J[0]-We[0]*it,J[1]-We[1]*it,J[2]-We[2]*it]),wt=.15+.25*D(),gt=fe([J[0]+mt[0]*wt,J[1]+mt[1]*wt,J[2]+mt[2]*wt]);Ht={a:J,b:gt,t0:e,dur:.4+.5*D(),br:1.2+2.8*D()*D()},Da=e+14+30*D()*(.5+D())}e>=Tt.next&&(dt()<.35?_e=Na():_e=[_e[0]+(dt()-.5)*2.4,K(_e[1]+(dt()-.5)*1.6,d+.8,O-1),_e[2]+(dt()-.5)*1.2],La(_e,(.07+.13*dt()*dt())*(p===0?.8:1)),Tt.t0=e,Tt.next=e+.1+(dt()<.2?.9*dt():.35*dt()));const f=Ge(yt[0].ev,e-yt[0].t0,!1),v=Ge(yt[1].ev,e-yt[1].t0,!1),u=yt[0].ev&&yt[0].ev.segs?Ge(yt[0].ev,e-yt[0].t0,!0)*yt[0].ev.bolt:0,T=yt[1].ev&&yt[1].ev.segs?Ge(yt[1].ev,e-yt[1].t0,!0)*yt[1].ev.bolt:0,R=4.2;$.set([e,ht,he,.03*(f+v)],0),$.set([ft.e[0],ft.e[1],ft.e[2],1.25],4),$.set([ft.r[0],ft.r[1],ft.r[2],0],8),$.set([ft.u[0],ft.u[1],ft.u[2],Wo*10],12),$.set([ft.f[0],ft.f[1],ft.f[2],0],16),$.set([A[0],A[1],W[0],W[1]],20),$.set([me,Re,ao,Ie],24),$.set([f*R,v*R,u*6,T*6],28),$.set([m[0],m[1],m[2],0],32),$.set([eo[0],eo[1],eo[2],(r===1?.065:.08)*(nt===2?.35:nt===1?.3:nt===3?.75:1)],36),$.set([No[0],No[1],No[2],r===2?2:1],40),$.set([ho[0],ho[1],ho[2],sn],44),$.set([je,Ve,.0035,i===1?Dn:2e3],48);for(let _=0;_<6;_++){const et=Ee[_];et?$.set([et.x,et.z,et.r,et.a0*Math.exp(-et.age/3.5)*ee(0,.25,et.age)],52+_*4):$.set([0,0,1,0],52+_*4)}$.set([xe[0],xe[1],j?5e3:io,sa.length],76),$.set(an,80);const C=fe([W[0]*w,7,W[1]*w]);$.set([C[0],C[1],C[2],nt===2?.45:nt===3?.8:nt===1?.4:1],84);const G=lo+2.4;$.set([Math.sin(G),-Math.cos(G),i===2?.8:0,nt===3?.016:nt?.028:.01],88),$.set([1.6*(.9+.1*m[0]),1.5*m[1]+.3,1.6*m[2]+.2,0],92),$.set([...Qt,ma],128),$.set([...cn,.007],132),$.set([Math.sin(Co),-Math.cos(Co),ln,0],136),$.set([...un,0],140),$.set([...fn,0],144),$.set([...hn,0],148);{const _=e-Tt.t0,et=_<0||_>Tt.dur*3?0:(1-Math.exp(-_/.015))*Math.exp(-_/Tt.dur)*(.75+.25*Math.sin(_*61+Tt.t0));$.set([Tt.u,Tt.v,Tt.r,Tt.a*et*Math.max(0,1-3*(f+v))],152)}if(Ht&&e-Ht.t0<Ht.dur){const _=(e-Ht.t0)/Ht.dur;$.set([Ht.a[0],Ht.a[1],Ht.a[2],_],96),$.set([Ht.b[0],Ht.b[1],Ht.b[2],Ht.br*Math.sin(Math.PI*_)],100)}else $.set([0,1,0,0,0,1,0,0],96);$.set([$a,Qa,Ro,2],104),$.set(nn,108),$.set(tn,120),$.set(en,124);for(let _=0;_<2;_++){const et=yt[_],J=et.ev,it=_?v:f;if(J&&it>.001){if(!J.hd){let mt=0,wt=0,gt=0;for(const Me of J.src)mt+=Me[0]*Me[3],wt+=Me[1]*Me[3],gt+=Me[2]*Me[3];const Lt=mt*A[0]+(gt+w)*W[0],St=mt*A[1]+(gt+w)*W[1];J.hd=fe([Lt,wt,St])}$.set([J.hd[0],J.hd[1],J.hd[2],it*R],112+_*4)}else $.set([0,1,0,0],112+_*4)}const rt=N.nearFor(ht);if(t.activeTexture(t.TEXTURE0+l.uNear),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,rt.f),t.viewport(0,0,ht,ht),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(N.vao),t.useProgram(Z.near.p),t.uniform4fv(Z.near.uC,$),t.activeTexture(t.TEXTURE0+l.uProf),t.bindTexture(t.TEXTURE_2D,Fo),t.activeTexture(t.TEXTURE0+l.uN),t.bindTexture(t.TEXTURE_2D,N.tN),t.activeTexture(t.TEXTURE0+l.uWN),t.bindTexture(t.TEXTURE_2D,N.tWN),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,ht,ht),t.useProgram(Z.comp.p),t.uniform4fv(Z.comp.uC,$),t.activeTexture(t.TEXTURE0+l.uNear),t.bindTexture(t.TEXTURE_2D,rt.t),t.activeTexture(t.TEXTURE0+l.uBase),t.bindTexture(t.TEXTURE_2D,so),t.activeTexture(t.TEXTURE0+l.uFl),t.bindTexture(t.TEXTURE_2D,Jo),t.activeTexture(t.TEXTURE0+l.uBolt),t.bindTexture(t.TEXTURE_2D,ea),t.activeTexture(t.TEXTURE0+l.uMW),t.bindTexture(t.TEXTURE_2D,Ao),t.activeTexture(t.TEXTURE0+l.uProf),t.bindTexture(t.TEXTURE_2D,Fo),t.activeTexture(t.TEXTURE0+l.uN),t.bindTexture(t.TEXTURE_2D,N.tN),t.activeTexture(t.TEXTURE0+l.uWN),t.bindTexture(t.TEXTURE_2D,N.tWN),t.activeTexture(t.TEXTURE0+l.uReed),t.bindTexture(t.TEXTURE_2D,on),t.bindVertexArray(N.vao),t.drawArrays(t.TRIANGLES,0,3),ga&&N.ovOK()){const _=o.view||Go,et=Math.hypot(_.yaw||0,_.pitch||0)+.3*Math.hypot(_.x||0,_.z||0);He.set([...Rn,.22*Math.min(1,.5*(f+v)),nt===3?An:0,0,0,i===1?.075:.04,...zn,nt===3&&Qt[1]>0?1:0],0),Xt?(Po=Math.max(Math.min(1.8,.55*(f+v)),Po*Math.exp(-a/.8)),He.set([Math.sin(M),-Math.cos(M),Po,.36],12)):He.set([0,0,0,1],12),He.set([.62+.2*m[0],.36+.1*m[1],.3+.12*m[2],0],16),He.set([...po,Ra,...bo,0,...yo,j?1-ee(.12,.45,et):0],20),t.useProgram(Z.ov.p),t.uniform4fv(Z.ov.uC,$),t.uniform4fv(Z.ov.uO,He),t.activeTexture(t.TEXTURE0+l.uMask),t.bindTexture(t.TEXTURE_2D,qe||N.tN),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND),t.activeTexture(t.TEXTURE0+l.uMask),t.bindTexture(t.TEXTURE_2D,null)}t.activeTexture(t.TEXTURE0+l.uNear),t.bindTexture(t.TEXTURE_2D,null)};return o.tile&&N.prelink(!0),Oa(0,0),Oa}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
