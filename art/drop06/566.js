// Narwhals: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/566.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(je){je&&je.add({num:566,name:"Narwhals",fam:"Vistas",recipe:"Standing at the edge of the sea ice in June, looking over a strip of still black water between the floes with a pod of narwhals milling in it, tusks lying along the water and calves beside their mums. The sun, the weather and what the pod is doing change every mint, and rare ones get males sparring with their tusks. Tap the water to drop a lump of snow in, drag to send a gust across the mirror, or hold to let the midnight sun dip and climb again without setting.",interactive:"Tap the water and a lump of snow drops in from the floe there with a splash and spreading rings; drag sends a cat's-paw of wind across the lead that breaks the mirror while the floes creak; hold and the midnight sun dips toward the horizon and climbs again without setting.",music:!0,gl:!0,fps:30,seed:0,make(g){const i=g.gl,D=g.size,K=!!g.home,se=D>400,V=Math.PI*2,nt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Eo=nt+"out vec2 vUv; void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }",ie=`
const float PI = 3.14159265;
uniform sampler2D uN;
uniform vec4 uL0, uL1, uL2, uL3;    // lead: c0 c1 c2 hw | wiggle a f p, - | width f1 p1 f2 p2 | close z, jag phase L, R, -
uniform vec3 uSun, uSunC, uZen, uHor;
uniform vec4 uW;                    // weather: overcast, sea smoke, snow, time
float at1(float x){ float x2 = x * x; return x * (.99997726 + x2 * (-.33262347 + x2 * (.19354346 + x2 * (-.11643287 + x2 * (.05265332 - .0117212 * x2))))); }
float atn(float y, float x){ float ax = abs(x), ay = abs(y); float a = at1(min(ax, ay) / max(max(ax, ay), 1e-9)); if (ay > ax) a = 1.5707963 - a; if (x < 0.) a = PI - a; return y < 0. ? -a : a; }
float nz(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); vec2 uv = i.xy + vec2(37., 17.) * i.z + f.xy; vec2 rg = textureLod(uN, (uv + .5) / 256., 0.).rg; return mix(rg.x, rg.y, f.z); }
uint hu(uvec2 c, uint s){ uint h = c.x * 1597334677u ^ c.y * 3812015801u ^ s * 2654435761u; h ^= h >> 15; h *= 0x2c1b3c6du; h ^= h >> 12; h *= 0x297a2d39u; h ^= h >> 15; return h; }
float hf(uint h){ return float(h & 0xffffffu) / 16777216.; }
float tri(float x){ return abs(fract(x) - .5) * 2. - .5; }
float leadC(float z){ return uL0.x + uL0.y * z + uL0.z * z * z / (1. + abs(z) / 300.) + uL1.x * sin(z * uL1.y + uL1.z); }
float leadD(float z){ float a = 1. + abs(z) / 300.; return uL0.y + uL0.z * (2. * z * a - z * abs(z) / 300.) / (a * a) + uL1.x * uL1.y * cos(z * uL1.y + uL1.z); }
float leadW(float z){ return uL0.w * (1. + .26 * sin(z * uL2.x + uL2.y) + .12 * sin(z * uL2.z + uL2.w)) * mix(.06, 1., smoothstep(uL3.x, uL3.x + 110., z)); }
float jag(float z, float s){ float ph = s > 0. ? uL3.z : uL3.y; return 1.6 * tri(z / 23.7 + ph) + .6 * tri(z / 9.3 + ph * 1.7) + .2 * tri(z / 3.9 + ph * 2.3) + .07 * tri(z / 1.3 + ph * 3.1) + .8 * sin(z / 6.1 + ph * 2.7) * sin(z / 2.3 + ph); }
// horizontal distance into the floe from the lead (+ inside the ice)
float edgeE(vec2 q){ float u = q.x - leadC(q.y), w = leadW(q.y), dc = leadD(q.y); return (abs(u) - w - jag(q.y, u) * min(1., w / 6.)) * inversesqrt(1. + dc * dc); }
vec3 skyCol(vec3 d){
  float y = max(d.y, 0.);
  vec3 dn = normalize(vec3(d.x, y, d.z));
  float mu = dot(dn, uSun), hz = pow(1. - y, 9.);
  vec3 c = mix(uZen, uHor, hz);
  float az = max(dot(normalize(dn.xz + 1e-5), normalize(uSun.xz)), 0.);
  c += uSunC * (.03 * pow(max(mu, 0.), 4.) * (.12 + hz) + .028 * exp((mu - 1.) * 16.) * (.25 + hz) + .03 * exp((mu - 1.) * 300.));
  c += uSunC * vec3(1., .55, .3) * .06 * pow(az, 5.) * exp(-y / .06);
  c += vec3(.8, .42, .55) * .2 * exp(-pow((y - .06) / .09, 2.)) * smoothstep(.3, -.7, mu);
  // faint high streaks of cirrus catching the light
  vec2 cp = dn.xz / (dn.y + .12);
  float cn = nz(cp * vec2(1.6, 8.) + 3.) * .65 + nz(cp * vec2(5., 11.)) * .35;
  float ci = smoothstep(.6, .95, cn) * smoothstep(.02, .2, y) * (1. - smoothstep(.5, .9, y));
  c += ci * (uSunC * .01 * (.3 + pow(max(mu, 0.), 3.)) + uHor * .05);
  // a low grey deck: soft rolls, lighter toward the horizon under its edge
  c = mix(c, mix(uHor * 1.08, uZen * 1.1, smoothstep(.0, .5, y)) * (.74 + .5 * nz(cp * .32 + 7.)), uW.x * smoothstep(-.01, .06, y));
  return c;
}
// sea smoke: a mist layer a few metres deep over the lead, in drifting wisps, lit by the sun behind it
vec3 smoke(vec3 col, vec3 eye, vec3 d, float t){
  if (uW.y <= 0.) return col;
  const float H = 3.5; t = min(t, 3000.);
  float dy = d.y, y1 = max(eye.y + dy * t, 0.);
  float od = abs(dy) > 1e-3 ? H / dy * (exp(-eye.y / H) - exp(-y1 / H)) : t * exp(-eye.y / H);
  vec3 pm = eye + d * min(t, 70.);
  od *= uW.y * .02 * (.45 + 1.1 * nz(pm.xz * .08 + uW.w * vec2(.03, .06)));
  float mu = dot(d, uSun);
  vec3 fc = mix(uHor, vec3(dot(uHor, vec3(.33))), .5) * 1.08 + uSunC * .01 * (1. + 5. * pow(max(mu, 0.), 6.));
  return mix(col, fc, smoothstep(.08, 1., 1. - exp(-od * 1.6)));
}
vec3 skyAmb(vec3 n){ return mix(uHor * .38, uZen * .95, .5 + .5 * n.y) * (1. + .9 * uW.x) + uSunC * .03 * max(dot(normalize(n.xz + 1e-4), normalize(uSun.xz)), 0.) * (1. - abs(n.y)); }
`,Re=ie+`
in vec2 vUv; out vec4 o;
uniform vec3 uEye, uF, uR, uU; uniform float uTh; uniform int uMode;
uniform vec4 uR0, uR1, uR2, uRW;   // ridges: x z angle height | widths, block size
uniform vec4 uE;                   // notch depth, foot width, draft, cake density
uniform vec4 uP;                   // pool threshold, hero x, hero z, hero strength
uniform vec4 uFar, uFar2;          // bergs, coast az, coast width, mirage | far ridge height, seed, pillar, -
uniform ivec4 uLB, uLB2;
uniform int uZ0;                   // never set (0): keeps the two-direction sky loops rolled
uniform sampler2D uS;
float rProf(vec2 q, vec4 R, float W){ vec2 d = vec2(sin(R.z), cos(R.z)), o = q - R.xy; float al = dot(o, d), ac = o.x * d.y - o.y * d.x; return R.w * (.45 + .55 * nz(vec2(al / 34., R.x * .1))) * exp(-ac * ac / (W * W)); }
float ridgeEnv(vec2 q){ return max(max(rProf(q, uR0, uRW.x), rProf(q, uR1, uRW.y)), rProf(q, uR2, uRW.z)); }
float blocks(vec2 q, float env){
  vec2 g = q / uRW.w, i = floor(g); float best = 1e9, h = 0.;
  for (int k = 0; k < uLB.x; k++) {
    vec2 c = i + vec2(float(k % 3 - 1), float(k / 3 - 1));
    uint hh = hu(uvec2(ivec2(c) + 8192), 19u);
    vec2 o = c + .15 + .7 * vec2(hf(hh), hf(hh * 7u));
    vec2 dv = g - o; float dd = dot(dv, dv);
    if (dd < best) { best = dd; h = env * (.3 + .8 * hf(hh * 13u)) + dot(dv, (vec2(hf(hh * 17u), hf(hh * 23u)) - .5) * 1.6) * uRW.w * min(env, 1.4); }
  }
  return max(h, 0.);
}
// cells (F1, F2): crack lines where they meet; the loop bound comes from a uniform (9) so it stays rolled
vec2 vor(vec2 q){
  vec2 i = floor(q), f = q - i; float a = 9., b = 9.;
  for (int k = 0; k < uLB.x; k++) {
    vec2 c = vec2(float(k % 3 - 1), float(k / 3 - 1)); uint h = hu(uvec2(ivec2(i + c) + 20000), 11u);
    vec2 o = c + .1 + .8 * vec2(hf(h), hf(h * 7u)) - f; float d = dot(o, o);
    if (d < a) { b = a; a = d; } else b = min(b, d);
  }
  return sqrt(vec2(a, b));
}
float poolM(vec2 q){ vec2 hd = q - uP.yz; return nz(q / 26. + 11.) * .62 + nz(q / 7.5 + 3.) * .38 + uP.w * exp(-dot(hd, hd) / 10.); }
// floe top: drifts, ridge blocks, meltpools (pool surface at .58)
float topH(vec2 q, out float pm, out float env){
  float b = .64 + .2 * (nz(q / 17.) - .5) + .07 * (nz(q / 4.3) - .5);
  env = ridgeEnv(q); pm = 0.;
  if (env > .06) b = max(b, .56 + blocks(q, env));
  else { pm = poolM(q); if (pm > uP.x) { b = mix(b, .45, smoothstep(uP.x, uP.x + .02, pm)); b = max(b, .58); } }
  return b;
}
vec2 cake(vec3 p){
  float cz = leadC(p.z); vec2 q = vec2(p.x - cz, p.z);
  vec2 g = floor(q / 11.); vec2 fq = q - g * 11.;
  float edge = max(min(min(fq.x, 11. - fq.x), min(fq.y, 11. - fq.y)) + .2, max(abs(q.x) - leadW(p.z) - 1., p.y - .5));
  uint h = hu(uvec2(ivec2(g) + 4096), 7u);
  float R = 1.2 + 2.4 * hf(h * 13u);
  vec2 o = (g + .5 + (vec2(hf(h * 3u), hf(h * 5u)) - .5) * .25) * 11.;
  if (hf(h) > uE.w || abs(o.x) > leadW(o.y) - R - 1.5 || abs(o.y) < 10.) return vec2(edge, 0.);
  vec2 dv = q - o; float a0 = hf(h * 29u) * 6.28, dp = -1e9;
  for (int k = 0; k < uLB2.x; k++) { float a = a0 + float(k) * 1.2566 + .4 * hf(h * uint(31 + k)); dp = max(dp, dot(dv, vec2(cos(a), sin(a))) - R * (.8 + .3 * hf(h * uint(41 + k)))); }
  float fb = .16 + .22 * hf(h * 37u) + .05 * nz(q * 1.3);
  return vec2(max(dp, max(p.y - fb, -p.y - 1.1)) * .85, fb);
}
float gPm, gEnv, gHt; vec2 gCk, gV0, gV1;   // what the last mapI saw, for shading the hit
float mapI(vec3 p){
  float e = edgeE(p.xz), pm, env;
  e += .4 * (n3(p * vec3(.9, 1.8, .9)) - .5) * smoothstep(9., 2., e);
  float y = p.y;
  float inset = uE.x * (.6 + .5 * nz(p.xz * .21)) * exp(-(y - .17) * (y - .17) / .05) + .1 * max(y - .3, 0.);
  float foot = abs(uE.y) * (.62 + .225 * cos(6.2832 * (p.z / 7.3 + uL3.y)) + .15 * cos(6.2832 * (p.z / 2.7 + uL3.z)) + .35 * (n3(p * .9) - .5)) * smoothstep(-.15, -2.8, y) * 1.6 * (1. - smoothstep(-2.9, -3.3, y));
  float dS = inset - foot - e;
  float ht = topH(p.xz, pm, env);
  float dT = (y - ht) * (env > .06 ? .45 : .8);
  float dB = -y - uE.z - 1.4 * smoothstep(0., -5., -e);
  float d = max(max(dT, dS), dB);
  vec2 ck = cake(p);
  gPm = pm; gEnv = env; gHt = ht; gCk = ck;
  return min(d, ck.x);
}
vec3 hazeC(vec3 d){ return skyCol(vec3(d.x, .015, d.z)) * .95; }
float angd(float a, float b){ return mod(a - b + PI, 2. * PI) - PI; }
vec3 shade(vec3 p, vec3 n, vec3 rd, float t, float sh, vec3 hz, vec3 sr){
  float pm = gPm, env = gEnv, ht = gHt; vec2 ck = gCk;
  bool isC = ck.x < .03 + t * .002;
  float below = (isC ? ck.y : ht) - p.y;
  vec3 ns = n;
  bool pool0 = !isC && env <= .06 && pm > uP.x + .02 && p.y < .592 + t * .0012 && n.y > .8;
  float fade = clamp(1. - t / 140., 0., 1.) * smoothstep(.5, .9, n.y) * (env > .06 ? .3 : 1.);
  if (fade > 0.) { mat2 rw = mat2(.8, .6, -.6, .8); vec2 gq = (texture(uS, rw * p.xz / 8.).rg - .5) * 2.2; gq += (texture(uS, rw * p.xz / 2.9 + .37).rg - .5) * .5; gq += (texture(uS, p.xz / .83 + .71).rg - .5) * .9 * clamp(1. - t / 22., 0., 1.); ns = normalize(n + vec3(-(gq * rw).x, 0., -(gq * rw).y) * fade); }
  ns = pool0 ? n : ns;
  float ndl = dot(ns, uSun);
  sh = mix(sh, .6 + .3 * sh, smoothstep(35., 160., t));
  vec3 amb = skyAmb(ns);
  vec3 col;
  bool pool = pool0;
  float F = .02 + .98 * pow(1. - max(dot(-rd, n), 0.), 5.);
  vec3 rr = reflect(rd, n);
  if (pool) {
    float dep = smoothstep(uP.x, uP.x + .07, pm);
    vec3 tq = mix(vec3(.5, .88, .9), vec3(.04, .46, .62), dep) * (.95 + .1 * nz(p.xz * 3.)); F *= .65;
    col = tq * (amb * .95 + uSunC * .06 * (.3 + .7 * sh)) * (1. - F);
    col += F * sr + uSunC * 40. * F * pow(max(dot(rr, uSun), 0.), 3000.) * sh;
  } else {
    float snow = smoothstep(.05, .16, n.y) * 0. + smoothstep(.34, .2, below + .1 * (n3(p * 3.) - .5)) * (isC ? 1. : 1.);
    snow = max(snow, smoothstep(.45, .8, n.y));
    // ice: cross-section of the slab, blue-white with growth bands; wet and darker near the waterline
    float band = (.5 + .5 * sin(p.y * 31. + 6. * n3(p * vec3(.4, 2., .4)))) * clamp(1. - t / 30., 0., 1.);
    vec3 ice = mix(vec3(.62, .82, .9), vec3(.82, .92, .95), band * .6) * (.8 + .3 * n3(p * 2.2));
    float wet = smoothstep(.3, .08, p.y);
    ice = mix(ice, vec3(.13, .2, .3), wet * .7);
    vec3 sn = vec3(.94, .95, .97) * (.86 + .1 * nz(p.xz * 1.7) + .08 * nz(p.xz * 6.3) + .04 * nz(p.xz * 23.));
    // wind-packed crust (a touch greyer and bluer) against soft drift
    float pk = smoothstep(.4, .72, nz(p.xz * .31 + 1.) * .7 + nz(p.xz * 1.4 + 9.) * .3);
    sn *= mix(vec3(1.), vec3(.84, .89, .96), pk * .85);
    // refrozen cracks across the floe top: thin blue-grey seams with a drift lip, sparse, fading with distance
    vec2 vc = gV0, vc2 = gV1;
    float cw = .04 + t * .0006;
    float crk = (1. - smoothstep(0., cw, vc.y - vc.x)) * smoothstep(.3, .45, nz(p.xz * .07 + 7.));
    crk = max(crk, (1. - smoothstep(0., cw * 1.4, vc2.y - vc2.x)) * smoothstep(.55, .7, nz(p.xz * .11 + 2.)) * .7);
    crk *= smoothstep(.8, .95, n.y) * clamp(1. - t / 70., 0., 1.) * (env > .06 ? 0. : 1.) * (pool ? 0. : 1.);
    float lip = (1. - smoothstep(cw, cw * 3.5, vc.y - vc.x)) * smoothstep(.3, .45, nz(p.xz * .07 + 7.)) * (1. - crk) * smoothstep(.8, .95, n.y) * clamp(1. - t / 70., 0., 1.);
    sn = mix(sn, vec3(.36, .55, .66), crk * .8) * (1. + .08 * lip);
    vec3 alb = mix(ice, sn, snow);
    col = alb * (uSunC * max(ndl, 0.) * sh + amb);
    // light through the ice: lips and thin edges glow when the sun is behind them
    col += (1. - snow) * uSunC * vec3(.06, .24, .42) * .045 * smoothstep(-.1, .7, dot(rd, uSun)) * smoothstep(.1, -.4, dot(n, uSun)) * (1. - wet * .6) * smoothstep(1.2, .3, below);
    col += snow * uSunC * vec3(.5, .7, .9) * .02;
    // snow glints
    vec2 gc = floor(p.xz * 45.); float gh = hf(hu(uvec2(ivec2(gc) + 30000), 3u));
    col += snow * step(.9965, gh) * (.5 + .5 * hf(hu(uvec2(ivec2(gc) + 31000), 5u))) * sh * uSunC * 1.6 * clamp(1. - t / 25., 0., 1.) * smoothstep(3., 7., t);
    // wet ice reflects the sky
    col = mix(col, sr, F * (.25 + .6 * wet) * (1. - snow));
    col += wet * (1. - snow) * uSunC * 6. * pow(max(dot(rr, uSun), 0.), 400.) * sh;
  }
  return mix(col, hz, 1. - exp(-t / 9000.));
}
// beyond the near field: far ice plane with its lead, ridge horizon, bergs, coast cliffs (all at least 400 m off)
vec4 farF(vec3 ro, vec3 d, vec3 hz, vec3 sky, out bool wat){
  wat = false;
  float hd = length(d.xz); vec2 dh = d.xz / hd;
  float el = d.y / hd, az = atn(dh.x, dh.y), elm = el;
  if (uFar.w > .5) { float b = el - .0024, W = .018; elm = abs(b) < W ? -.0004 + b * .085 + .0013 * sin(b * 900. + az * 3.) * smoothstep(W, W * .3, abs(b)) : el - (b > 0. ? 1. : -1.) * W * .87; }
  float drop = 1. / (2. * 6.371e6);
  // coast cliffs, 32 km
  vec3 col = vec3(0.); float tt = -1.;
  float cx = angd(az, uFar.y) / max(uFar.z, 1e-3);
  if (abs(cx) < 1.) {
    float D = 32000.;
    float hh = (180. + 520. * (nz(vec2(az * 9., 1.)) * .65 + nz(vec2(az * 41., 2.)) * .35)) * smoothstep(1., .75, abs(cx)) * (.4 + .6 * smoothstep(.2, .45, nz(vec2(az * 3.3, 7.))));
    float top = (hh - ro.y) / D - D * drop;
    if (elm < top) {
      float v = (top - elm) * D;   // metres below the crest
      float sn = smoothstep(.45, .62, nz(vec2(az * 900., v * .02)) * .7 + nz(vec2(az * 150., v * .006)) * .3);
      vec3 rock = vec3(.07, .09, .13) + sn * vec3(.7, .76, .84);
      vec3 nn = normalize(vec3(-dh.x, .25, -dh.y) + vec3(dh.y, 0., -dh.x) * (nz(vec2(az * 260., 3.)) - .5) * 2.);
      col = rock * (uSunC * max(dot(nn, uSun), 0.) * .8 + skyAmb(nn));
      col = mix(col, hz * vec3(.8, .88, 1.05), .55);
      tt = D;
    }
  }
  // bergs, 1.6 - 7 km
  for (int k = 0; k < uLB.w; k++) {
    uint h = hu(uvec2(k, 3), uint(uFar2.y));
    float a0 = k < 2 ? uFar2.w + (hf(h) - .5) * .9 : (hf(h) - .5) * 6.2832, D = 1600. + 5200. * hf(h * 7u), H = 14. + 34. * hf(h * 11u);
    float tab = step(.38, hf(h * 13u));
    float bw = mix(25. + 55. * hf(h * 17u), 70. + 240. * hf(h * 17u), tab);
    float x = angd(az, a0) * D;
    if (abs(x) < bw && (tt < 0. || D < tt)) {
      float u = x / bw;
      float prof = tab > .5 ? (1. - pow(abs(u), 10.)) * (.94 + .06 * nz(vec2(x * .04, float(k)))) : pow(max(1. - u * u, 0.), 1.2) * (.55 + .45 * nz(vec2(x * .05 + 9., float(k))));
      float top = (H * prof + .5 - ro.y) / D - D * drop;
      if (elm < top && elm > -ro.y / D - D * drop) {
        float v = (top - elm) * D;
        vec3 nn = normalize(vec3(-dh.x, 0., -dh.y) + vec3(dh.y, 0., -dh.x) * u * (1.6 - tab));
        if (v < .9 * tab + .2) nn = vec3(0., 1., 0.);
        float st = .8 + .3 * nz(vec2(x * .35, v * .05 + float(k) * 7.));
        vec3 alb = mix(vec3(.55, .76, .92), vec3(.92, .95, .98), smoothstep(-.1, .4, dot(nn, uSun))) * st;
        col = alb * (uSunC * max(dot(nn, uSun), 0.) + skyAmb(nn));
        col = mix(col, hz, 1. - exp(-D / 5200.));
        tt = D;
      }
    }
  }
  // a ragged horizon of far ridges, 700 m
  vec3 rC = vec3(0.); float rV = 0.;
  float sx = az * 46. + 1.3 * nz(vec2(az * 9., 4.)), si = floor(sx), sf = sx - si, sr = fract(sin(si * 91.7 + uFar2.y) * 4375.5);
  float h1 = uFar2.x * (pow(nz(vec2(az * 70., 5.)), 2.2) * 1.6 + .25 * sr * (1. - abs(sf - .5) * 1.4) + .06 * nz(vec2(az * 260., 9.)));
  float top1 = (h1 + .6 - ro.y) / 700., pxe = max(fwidth(elm), 1e-5);
  float cv = smoothstep(-pxe, pxe, top1 - elm) * smoothstep(.1, .35, h1);
  if (cv > 0. && (tt < 0. || tt > 700.)) {
    // each slab tilts one way: the face toward the sun warm, the other blue, both holding across the slab
    float tl = (sr - .5) * 2.2 + (sf - .5) * .6;
    vec3 nn = normalize(vec3(-dh.x, .55, -dh.y) + vec3(dh.y, 0., -dh.x) * tl);
    vec3 rc = vec3(.9, .94, .97) * (uSunC * max(dot(nn, uSun), 0.) + skyAmb(nn) * (.9 + .2 * sr));
    rc = mix(rc, hz, 1. - exp(-700. / 5000.));
    if (tt > 0.) { col = mix(col, rc, cv); if (cv > .5) tt = 700.; } else { rC = rc; rV = cv; if (cv > .5) { col = rc; tt = 700.; rV = 0.; } }
  }
  if (tt > 0.) return vec4(col, tt);
  if (d.y < -1e-5) {
    float tp = (ro.y - .6) / -d.y; vec3 p = ro + d * tp;
    float u = abs(p.x - leadC(p.z)) - leadW(p.z);
    if (u < 0. && tp < 6000.) { wat = true; return vec4(mix(vec3(.004, .012, .016), rC, rV), ro.y / -d.y); }
    float lines = smoothstep(.72, .8, nz(p.xz / vec2(55., 9.) + 4.)) * .5;
    vec3 nn = normalize(vec3((nz(p.xz * .02) - .5) * .3 + lines * dh.x * -.6, 1., (nz(p.xz * .02 + 5.) - .5) * .3 + lines * dh.y * -.6));
    float pm = poolM(p.xz);
    vec3 alb = mix(vec3(.93, .95, .97), vec3(.45, .72, .78), smoothstep(uP.x, uP.x + .1, pm) * .5);
    col = alb * (uSunC * max(dot(nn, uSun), 0.) + skyAmb(nn));
    return vec4(mix(mix(col, hz, 1. - exp(-tp / 2600.)), rC, rV), tp);
  }
  return vec4(mix(sky, rC, rV) + uFar2.z * uSunC * .1 * exp(-pow(dot(normalize(d.xz), vec2(uSun.z, -uSun.x) / length(uSun.xz)) / .006, 2.)) * exp(-abs(d.y - uSun.y) / .14), 0.);
}
#ifdef FARP
void main(){
  vec2 sp = vUv * 2. - 1.;
  vec3 d = normalize(uF + sp.x * uTh * uR + sp.y * uTh * uU);
  vec3 ro = uEye, rd = d;
  float tw = rd.y < -1e-5 ? ro.y / -rd.y : 1e9;
  bool rf = uMode == 1;
  if (rf) { ro = uEye + rd * min(tw, 1e4); rd.y = abs(rd.y); }
  vec3 hz = vec3(0.), sq = vec3(0.);
  for (int j = 0; j < 2 + uZ0; j++) { vec3 c = skyCol(j == 0 ? vec3(rd.x, .015, rd.z) : rd); if (j == 0) hz = c * .95; else sq = c; }
  if (rf && d.y > -1e-5) { o = vec4(hz / .95, 1.); return; }
  bool wat; vec4 f = farF(ro, rd, hz, sq, wat);
  if (rf) { o = vec4(f.rgb, 1.); return; }
  float q = f.a / (f.a + 30.);
  o = vec4(f.rgb, f.a <= 0. ? 0. : (wat ? .5 + .5 * q : max(.5 * q, .006)));
}
#elif defined(MARCH)
void main(){
  vec2 sp = vUv * 2. - 1.;
  vec3 d = normalize(uF + sp.x * uTh * uR + sp.y * uTh * uU);
  vec3 ro = uEye, rd = d;
  float tw = rd.y < -1e-5 ? ro.y / -rd.y : 1e9;
  bool rf = uMode == 1;
  if (rf) { ro = uEye + rd * min(tw, 1e4); rd.y = abs(rd.y); tw = 1e9; }
  vec3 hz = vec3(0.);
  if (rf && d.y > -1e-5) { o = vec4(-1., 0., 0., 0.); return; }
  const float NEAR = 360.;
  // one loop, one scene lookup: march (air, then under water), four normal taps and a capture at the hit, then the sun's shadow
  float t = rf ? .02 : .25, tmax = rf ? NEAR : min(tw, NEAR), hitT = -1., ls = 0., cap = 1e9, st = .06, sh = 1.;
  int ph = 0, hph = 0, k = 0; vec3 P0 = ro, hp = ro, nA = vec3(0.), n = vec3(0., 1., 0.); vec4 sM = vec4(0.); vec2 sC = vec2(9.);
  for (int i = 0; i <= uLB.y; i++) {
    vec3 s4 = vec3(k == 0 || k == 3 ? 1. : -1., k >= 2 ? 1. : -1., k == 1 || k == 3 ? 1. : -1.);
    vec3 p = ph <= 1 ? ro + rd * t : ph == 2 ? hp + (k < 4 ? s4 * (.005 + hitT * .0035) : vec3(0.)) : hp + n * .03 + uSun * st;
    float dd = mapI(p);
    if (i == uLB.y) { if (ph == 0 && t < tmax && t < 1e8) { hitT = t; hp = p; sM = vec4(gPm, gEnv, gHt, 0.); sC = gCk; } break; }   // out of steps while skimming the ice
    if (ph <= 1) {
      float ep = .002 + t * .0008;
      if (dd < ep) {
        if (dd > -ep || ls < .01) { hitT = t; hp = p; hph = ph; ph = 2; k = 0; }
        else { ls *= .5; t -= ls; cap = ls; }
      } else {
        ls = min(ph == 1 ? max(dd * .8, .03) : max(dd, .01 + t * (t > 50. ? .022 : .011)), cap);
        t += ls;
        if (t > tmax) {
          if (ph == 0 && !rf && tw < NEAR) { ph = 1; P0 = ro + rd * tw; ro = P0; rd = refract(rd, vec3(0., 1., 0.), .7519); t = .02; tmax = 9.; cap = 1e9; }
          else break;
        }
        if (ph == 0 && p.y > 8. && rd.y > 0.) { t = 1e9; break; }
      }
    } else if (ph == 2) {
      if (k < 4) { nA += s4 * dd; k++; }
      else { n = normalize(nA); sM = vec4(gPm, gEnv, gHt, 0.); sC = gCk; if (hph == 1 || dot(n, uSun) < -.05) { sh = 0.; break; } ph = 3; }
    } else {
      sh = min(sh, 10. * dd / st); st += clamp(dd, .06, 4.);
      if (sh < .02 || st > 110.) break;
    }
  }
  gPm = sM.x; gEnv = sM.y; gHt = sM.z; gCk = sC;
  sh = clamp(sh, 0., 1.);
  // packed for the shading pass: t (under water: -2 - t; -1 nothing near; 0 open water seen from below), the normal
  // (octahedral), and shadow + depth under the snow line (+ sign: a floating cake)
  if (hitT > 0.) {
    vec3 an = abs(n); vec2 oc = n.xy / (an.x + an.y + an.z); if (n.z < 0.) oc = (1. - abs(oc.yx)) * vec2(oc.x >= 0. ? 1. : -1., oc.y >= 0. ? 1. : -1.);
    bool isC = sC.x < .03 + hitT * .002;
    float bl = clamp((isC ? sC.y : sM.z) - hp.y, 0., 1.5);
    float qa = 1. + floor(sh * 31. + .5) + 32. * floor(bl * 40. + .5);
    o = vec4(hph == 1 ? -2. - hitT : hitT, oc, isC ? -qa : qa);
  } else o = vec4(ph == 1 ? 0. : -1., 0., 0., 0.);
}
#else
uniform sampler2D uC;
void main(){
  vec4 G = texelFetch(uC, ivec2(gl_FragCoord.xy), 0);
  if (G.r < -.5 && G.r > -1.5) discard;
  vec2 sp = vUv * 2. - 1.;
  vec3 d = normalize(uF + sp.x * uTh * uR + sp.y * uTh * uU);
  vec3 ro = uEye, rd = d;
  float tw = rd.y < -1e-5 ? ro.y / -rd.y : 1e9;
  bool rf = uMode == 1;
  if (rf) { ro = uEye + rd * min(tw, 1e4); rd.y = abs(rd.y); tw = 1e9; }
  if (rf && d.y > -1e-5) discard;
  int hph = G.r < -1.5 ? 1 : 0; bool deep = G.r > -.5 && G.r < 1e-4;
  float hitT = hph == 1 ? -2. - G.r : G.r;
  vec3 hp;
  if (hph == 1 || deep) { ro = ro + rd * tw; rd = refract(rd, vec3(0., 1., 0.), .7519); }
  hp = ro + rd * hitT;
  vec2 oc = G.gb; vec3 n = vec3(oc, 1. - abs(oc.x) - abs(oc.y)); if (n.z < 0.) n.xy = (1. - abs(n.yx)) * vec2(n.x >= 0. ? 1. : -1., n.y >= 0. ? 1. : -1.); n = normalize(n);
  float qa = abs(G.a) - 1., sh = mod(qa, 32.) / 31., bl = floor(qa / 32.) / 40.;
  bool isC = G.a < 0.;
  // the rest of the hit's state: ridge envelope and meltpool mask again, cake and snow line from the pack
  gEnv = ridgeEnv(hp.xz); gPm = gEnv > .06 ? 0. : poolM(hp.xz); gHt = bl + hp.y; gCk = vec2(isC ? 0. : 1., bl + hp.y);
  // the cell patterns, looked up once: crack lines on the floe top, or the plates of the foot under water
  vec2 wq = hp.xz + 1.6 * vec2(nz(hp.xz * .4 + 2.), nz(hp.xz * .4 + 8.)) + .5 * vec2(nz(hp.xz * 1.9), nz(hp.xz * 1.9 + 4.));
  vec2 vi0 = hph == 1 ? wq * .62 + 11. : hp.xz * .21 + 3., vi1 = hph == 1 ? wq * 2.1 + 4. : hp.xz * .7 + 17.;
  for (int j = 0; j < 2 + uZ0; j++) { vec2 v = vor(j == 0 ? vi0 : vi1); if (j == 0) gV0 = v; else gV1 = v; }
  vec3 hz = vec3(0.);
  // the sky, looked up once for two directions: the haze toward the horizon and the reflected (or open) view
  vec3 sq = vec3(0.);
  // a reflected ray heading below the horizon (undercut lips, the notch roof) meets the lead, not the sky: it sees the
  // mirrored sky by the water's Fresnel over the black water (skyCol clamps d.y at 0, i.e. the brightest sunward horizon)
  vec3 rq = hitT > 0. && hph == 0 ? reflect(rd, n) : rd; float fw = 1.;
  if (hitT > 0. && hph == 0 && rq.y < 0.) { fw = .02 + .98 * pow(clamp(1. + rq.y, 0., 1.), 5.); rq.y = -rq.y; }
  for (int j = 0; j < 2 + uZ0; j++) { vec3 c = skyCol(j == 0 ? vec3(rd.x, .015, rd.z) : rq); if (j == 0) hz = c * .95; else sq = c; }
  sq = mix(vec3(.004, .012, .016), sq, fw);
  vec3 col; float tOut; bool wat = false;
  if (!deep) {
    vec3 p = hp;
    if (hph == 1) {
      // under the water: the ice foot and slab sides, seen through cold clear water
      vec3 K = vec3(.55, .15, .11);
      float dep = -p.y;
      // rotten old ice: plates split by dark seams, pitted and blotched, paler on the shallow lip by the slab
      vec2 fv = gV0, fv2 = gV1;
      float seam = mix(1., smoothstep(.0, .12, fv.y - fv.x), .55 * smoothstep(.3, .6, nz(p.xz * .5 + 1.))) * (.8 + .2 * smoothstep(.0, .1, fv2.y - fv2.x));
      float blot = smoothstep(.35, .7, nz(p.xz * .33 + 5.) * .7 + nz(p.xz * 1.7) * .3);
      float pit = n3(p * 2.4) * n3(p * .7 + 3.);
      // where the floe above it is out of the frame (uE.y < 0) the foot is a dim milky ledge fading into the deep water,
      // so it never reads as a lit body under the animals; where the floe shows, its foot is the bright turquoise shelf
      float fd = uE.y < 0. ? 1. : 0.;
      vec3 alb = mix(mix(vec3(.66, .9, .9), vec3(.36, .64, .76), blot), mix(vec3(.56, .68, .64), vec3(.4, .52, .54), blot), fd) * (.4 + .85 * pit) * (1.3 - .3 * seam) * (.6 + .4 * max(n.y, 0.));
      alb *= mix(1. + .9 * smoothstep(-.7, -.2, p.y) + .25 * fv.x, (1. + .5 * smoothstep(-.7, -.2, p.y) + .25 * fv.x) * smoothstep(-2.6, -.5, p.y) * .8, fd);
      vec3 E = (skyAmb(vec3(0., 1., 0.)) * .55 + uSunC * .015) * mix(1., .12, smoothstep(8., 26., tw)) * (.08 + .92 * smoothstep(-3.1, -.5, p.y));
      col = alb * E * exp(-K * (hitT + dep * 2.2)) + vec3(.004, .016, .022) * (1. - exp(-hitT * .3));
      wat = true; tOut = tw;
    } else { col = shade(p, n, rd, hitT, sh, hz, sq); tOut = hitT + (rf ? tw : 0.); }
  } else { col = vec3(.004, .014, .02); wat = true; tOut = tw; }
  if (rf) { o = vec4(col, 1.); return; }
  float q = tOut / (tOut + 30.);
  o = vec4(col, tOut <= 0. ? 0. : (wat ? .5 + .5 * q : max(.5 * q, .006)));
}
#endif
`,So=nt+ie+`
in vec2 vUv; out vec4 o;
uniform sampler2D uSt, uRf, uD;
uniform vec3 uEye, uF, uR, uU; uniform float uTh, uT, uPx, uSc; uniform vec4 uG;   // grade: ice, sky, sun disc, -
uniform ivec4 uLB;
// one train of wind ripples (crests across the wind): its slope where a pixel resolves it, roughness where it doesn't
void rip(vec2 P, vec2 dir, float lam, float ph, float fpv, float amp, inout vec2 g, inout float ru){
  float k = 6.2832 / lam, w = sqrt(9.81 * k + 7.4e-5 * k * k * k), aa = clamp(lam / (5. * fpv) - .4, 0., 1.);
  g += dir * amp * cos(dot(P, dir) * k - w * uT + ph) * aa; ru += amp * (1. - aa) * 1.3;
}
void main(){
  vec4 s = texelFetch(uSt, ivec2(gl_FragCoord.xy), 0);
  vec2 sp = vUv * 2. - 1.;
  vec3 d = normalize(uF + sp.x * uTh * uR + sp.y * uTh * uU);
  vec3 col = s.rgb * uG.x;
  if (s.a < .004) {
    col = s.rgb * uG.y;
    vec3 dv = d - uSun; float dh = length(normalize(d.xz) - normalize(uSun.xz)), dy = (d.y - uSun.y) / .86;
    float a = sqrt(dh * dh + dy * dy);
    col += uSunC * (uG.z * smoothstep(.0052, .0042, a) + .7 * exp(-a / .006) + .1 * exp(-a / .03));
  } else if (s.a >= .5) {
    float t = uEye.y / max(-d.y, 1e-4);
    vec2 P = uEye.xz + d.xz * t;
    float fpv = t * uPx / max(-d.y, .015);
    vec2 g = .0035 * vec2(.8, .6) * cos(dot(P, vec2(.8, .6)) * .45 - uT * 2.1) + .0025 * vec2(-.5, .86) * cos(dot(P, vec2(-.5, .86)) * .7 - uT * 2.6 + 1.);
    g += .004 * (vec2(nz(P * .9 + uT * vec2(.2, .1)), nz(P * .9 + 40. - uT * vec2(.1, .2))) - .5) * clamp(.6 / fpv, 0., 1.);
    float rough = 0.;
    for (int i = 0; i < uLB.x; i++) {
      vec4 e = texelFetch(uD, ivec2(i, 0), 0);
      float age = uT - e.z;
      if (age > 0. && age < 9.) {
        vec2 dv = P - e.xy; float r = length(dv) + 1e-3;
        float lam = .42 + .5 * min(e.w, 1.5), k = 6.2832 / lam, w = sqrt(9.81 * k), cg = .5 * w / k;
        float rc = .15 + cg * age, sg = .3 + .22 * age;
        float env = exp(-(r - rc) * (r - rc) / (sg * sg)) * exp(-age * .28) / sqrt(1. + r * .8);
        float A = .014 * e.w * env * k;
        float aa = smoothstep(3., 6., lam / fpv);
        g += dv / r * A * cos(k * r - w * age) * aa;
        rough += A * (1. - aa) * 1.5;
      }
    }
    for (int i = 0; i < uLB.y; i++) {
      vec4 a = texelFetch(uD, ivec2(2 * i, 1), 0), b = texelFetch(uD, ivec2(2 * i + 1, 1), 0);
      if (a.w > .002) {
        vec2 v = normalize(b.xy + 1e-4), dv = P - a.xy;
        float al = dot(dv, v), ac = dv.x * v.y - dv.y * v.x;
        float m = exp(-al * al / (a.z * a.z * 1.8) - ac * ac / (a.z * a.z * .8));
        // ragged patches a metre or two across, drifting with the wind; the finest octave fades to its mean once a pixel spans it
        vec2 q = P * .55 - v * uT * 1.1;
        float o3 = clamp(1.4 - fpv * 1.6, 0., 1.);
        float pat = smoothstep(.42, .7, nz(q) * .5 + nz(q * 2.3 + 5.) * .3 + mix(.5, nz(q * 5.3 + 9.), o3) * .2);
        float w = a.w * m * (.06 + .94 * pat);
        // fine ripple trains a few centimetres to a third of a metre long, fanned about the wind, crests broken by a slow phase field
        vec2 v1 = vec2(v.x * .94 + v.y * .34, v.y * .94 - v.x * .34), v2 = vec2(v.x * .98 - v.y * .2, v.y * .98 + v.x * .2);
        float ph = 9. * nz(P * 1.3 + 17.);
        vec2 gr = vec2(0.); float ru = 0.;
        for (int j = 0; j < 3 + uLB.z; j++) {
          bool j0 = j == 0, j1 = j == 1;
          rip(P, j0 ? v1 : j1 ? v2 : v, j0 ? .07 : j1 ? .13 : .29, j0 ? ph : j1 ? ph * .7 + 2. : ph * .4 + 4., fpv, j0 ? .07 : j1 ? .06 : .05, gr, ru);
        }
        g += w * gr;
        rough += w * (.036 + ru * 1.2);
      }
    }
    rough = min(rough, 1.);
    vec3 n = normalize(vec3(-g.x, 1., -g.y));
    vec3 r = reflect(d, n); r.y = max(r.y, .002);
    vec3 r0 = vec3(d.x, -d.y, d.z), dr = r - r0, dd = vec3(dr.x, -dr.y, dr.z);
    vec2 uvR = vUv + vec2(dot(dd, uR), dot(dd, uU)) / (2. * uTh);
    vec3 refl = texture(uRf, clamp(uvR, vec2(.001), vec2(.999))).rgb * uG.x;
    vec3 ru = normalize(r + vec3(0., rough * .5, 0.));
    refl = mix(refl, skyCol(ru) * uG.y * .85, clamp(rough * 1.4, 0., .9));
    float F = .02 + .98 * pow(1. - max(dot(-d, n), 0.), 5.);
    vec4 su = texture(uSt, vUv - g * .035);
    vec3 under = (su.a >= .5 ? su.rgb : s.rgb) * uG.x;
    col = mix(under, refl, F);
    float sg = .0048 + rough * .085;
    vec3 dl = r - uSun;
    float lobe = exp(-dot(dl, dl) / (2. * sg * sg)) * (.0048 * .0048) / (sg * sg);
    float spark = mix(1., .2 + 4. * pow(nz(P * vec2(2.4, 6.5) + uT * vec2(1.1, -1.4)), 7.), clamp(rough * 6., 0., 1.));
    col += uSunC * uG.z * .9 * F * lobe * spark;
  }
  if (uW.y > 0.) { float qa = s.a < .004 ? 1. : s.a >= .5 ? (s.a - .5) * 2. : s.a * 2.; col = smoke(col, uEye, d, s.a < .004 ? 1e4 : 30. * qa / max(1. - qa, 1e-4)); }
  o = vec4(col * uSc, 1.);
}
`,wo=nt+`
uniform sampler2D uD; uniform vec3 uEye, uF, uR, uU; uniform float uTh; uniform int uNV;
out vec3 vW; flat out int vI; flat out float vM;
const int IDX[36] = int[36](0,1,3, 0,3,2, 4,6,7, 4,7,5, 0,4,5, 0,5,1, 2,3,7, 2,7,6, 0,2,6, 0,6,4, 1,5,7, 1,7,3);
void main(){
  int inst = gl_InstanceID; float mir = inst < uNV ? 1. : 0.; int wi = inst - (inst < uNV ? 0 : uNV);
  vec4 a = texelFetch(uD, ivec2(wi * 5, 2), 0), e = texelFetch(uD, ivec2(wi * 5 + 3, 2), 0), f = texelFetch(uD, ivec2(wi * 5 + 4, 2), 0);
  int c = IDX[gl_VertexID];
  vec3 l = vec3(c & 1, (c >> 1) & 1, (c >> 2) & 1);
  vec3 q = vec3(mix(e.z, e.w, l.x), mix(f.x, f.y, l.y), mix(-1.05, 1.05, l.z));
  vec3 fw = vec3(sin(a.z), 0., cos(a.z)), sd = vec3(cos(a.z), 0., -sin(a.z));
  vec3 W = vec3(a.x, 0., a.y) + fw * q.x + sd * q.z + vec3(0., q.y, 0.);
  if (mir > .5) W.y = -W.y;
  vW = W; vI = wi; vM = mir;
  vec3 v = W - uEye;
  gl_Position = vec4(dot(v, uR) / uTh, dot(v, uU) / uTh, 0., dot(v, uF));
}
`,Fo=nt+ie+`
in vec3 vW; flat in int vI; flat in float vM; out vec4 o;
uniform sampler2D uD, uSt, uM; uniform vec3 uEye; uniform float uPx, uSc, uT; uniform int uNK, uNS;
vec4 A, B, C, E, F4; vec2 TW;
float smax(float a, float b, float k){ float h = max(k - abs(a - b), 0.) / k; return max(a, b) + h * h * k * .25; }
// the spine's height along the path (head at x = A.w): rise, breathe, arch and dive; the forebody pitched up about a
// point 0.38 of the length back (C.y its slope: a little with each breath, steep while tusking), and the tail stock
// curving up in an arc as the animal sounds (F4.w)
float yc(float x){
  float a = x + C.x * .5, b = x - C.x * .5, y = B.y;
  if (a < 0.) y -= B.z * a * a;
  if (b > 0.) y -= B.w * b * b;
  float dx = x - A.w + .38 * B.x, tl = clamp((A.w - .45 * B.x - x) / (.55 * B.x), 0., 1.);
  return y + C.y * .5 * (dx + sqrt(dx * dx + .04)) + F4.w * tl * tl;
}
// girth along the body (s 0 snout .. 1 tail): blunt melon, a slight neck, a stout trunk, a slim keeled tail stock
float rad(float s){ return (.6 + .4 * smoothstep(0., .38, s) - .045 * exp(-pow((s - .16) / .05, 2.))) * (1. - .72 * pow(smoothstep(.5, 1., s), .8)); }
float sdW(vec3 q){
  float H = A.w, len = B.x, R = .115 * len;
  float s = clamp((H - q.x) / len, .05, 1.), x = H - s * len;
  float sq = 1. + max(s - .6, 0.) * 2.;
  // the spine's slope here, so a pitched or arched part keeps its girth across the spine, not straight up
  float ea = x + C.x * .5, eb = x - C.x * .5, ex = x - H + .38 * len, et = clamp((H - .45 * len - x) / (.55 * len), 0., 1.);
  float m = (ea < 0. ? -2. * B.z * ea : 0.) + (eb > 0. ? -2. * B.w * eb : 0.) + C.y * .5 * (1. + ex * inversesqrt(ex * ex + .04)) - F4.w * 2. * et / (.55 * len);
  vec3 dv = vec3(q.x - x, (q.y - yc(x)) * inversesqrt(1. + m * m), q.z * sq);
  float l = length(dv);
  // a low, nicked ridge along the back half instead of a fin
  float rg = .028 * len / 4.5 * smoothstep(.42, .55, s) * smoothstep(.85, .7, s) * (.55 + .45 * nz(vec2(s * 38., E.y))) * pow(max(dv.y / max(l, 1e-4), 0.), 18.);
  float d = (l - R * rad(s) - rg) * .8 / sq;
  // short flippers low on the sides, tips curling up
  float xf = H - .2 * len; vec3 fq = vec3(q.x - xf, q.y - yc(xf) + .5 * R, abs(q.z) - .78 * R);
  fq.x += fq.z * .6; fq.y -= fq.z * fq.z * .9;
  d = min(d, (length(fq / vec3(.075, .022, .2) * (4.5 / len)) - 1.) * .016 * len / 4.5);
  // flukes: a fan, the leading edge rounded and swept, the trailing edge bowed back in two lobes to a deep notch, the
  // tips rounded; a foil in section, thick at the leading edge; turned about the stock as it rises (TW)
  float xt = H - len, mt = (yc(xt + .25) - yc(xt)) / .25; vec2 td = normalize(vec2(-1., -mt));
  vec2 rq = vec2(q.x - xt, q.y - yc(xt)); float S = .14 * len;
  float u = dot(rq, td) / S, w0 = (rq.x * -td.y + rq.y * td.x) / S, z0 = q.z / S;
  float w = TW.x * w0 - TW.y * z0, v = abs(TW.y * w0 + TW.x * z0);
  float le = .55 * v * v + .12 * v - .06, tr = .58 + .34 * (1. - v * v) - .42 * exp(-v / .16);
  float cr = clamp((u - le) / max(tr - le, .05), 0., 1.);
  float f2 = smax(smax(le - u, u - tr, .14) * .65, abs(w) - .065 * (1. - .55 * v) * (1. - .8 * cr), .05) * S * .9;
  d = min(d, f2);
  return d;
}
// one tusk: an analytic spiral cone leaving the upper lip
vec4 tusk(vec3 ro, vec3 rd, vec3 tb0, vec3 ta3, float L, vec3 fw, vec3 sd, vec3 eye, vec3 d, inout float th, float cov, bool hit){
  vec3 w0 = ro - tb0; float b = dot(rd, ta3), dd0 = dot(rd, w0), e0 = dot(ta3, w0), den = 1. - b * b;
  float u = clamp((e0 - b * dd0) / max(den, 1e-5), 0., L), tr = max(dot(tb0 + ta3 * u - ro, rd), 0.);
  vec3 pc = ro + rd * tr, ax = tb0 + ta3 * u; float dist = length(pc - ax);
  float rr = mix(.046, .009, pow(u / L, .8)), pw = tr * uPx, re = max(rr, pw * .55);
  float cv = clamp((re - dist) / pw + .5, 0., 1.) * rr / re * smoothstep(L, L - .04, u);
  if (cv <= .01 || (hit && tr >= th)) return vec4(0.);
  vec3 b1 = normalize(cross(ta3, vec3(0., 0., 1.))), b2 = cross(ta3, b1);
  vec3 v = pc - ax; float tha = atn(dot(v, b2), dot(v, b1));
  float groove = .5 + .5 * sin(tha + u * 6.2832 / .07);
  vec3 nn = normalize(v + ta3 * .0001), nw = fw * nn.x + sd * nn.z + vec3(0., nn.y, 0.);
  // algae-dark grooves near the base, the last hand's breadth polished ivory
  vec3 alb = mix(vec3(.1, .1, .08), vec3(.34, .33, .28), smoothstep(.35, .85, u / L)) * (.75 + .35 * groove * clamp(rr / pw, 0., 1.) * clamp(.07 / pw * .25 - .5, 0., 1.));
  alb = mix(alb, vec3(.78, .75, .66), smoothstep(L - .3, L - .1, u));
  vec3 cl = alb * (uSunC * max(dot(nw, uSun), 0.) * .5 + skyAmb(nw) * .65) + uSunC * .1 * pow(max(dot(reflect(d, nw), uSun), 0.), 40.);
  vec3 pw3 = eye + d * tr;
  if (vM < .5 && pw3.y < 0.) { cl = cl * exp(-vec3(.6, .1, .14) * 3. * -pw3.y) * .7; cv *= exp(-7. * -pw3.y); }
  if (vM > .5 && pw3.y < 0.) cv = 0.;
  if (cv > cov) th = tr;
  return vec4(cl, cv);
}
void main(){
  A = texelFetch(uD, ivec2(vI * 5, 2), 0); B = texelFetch(uD, ivec2(vI * 5 + 1, 2), 0);
  C = texelFetch(uD, ivec2(vI * 5 + 2, 2), 0); E = texelFetch(uD, ivec2(vI * 5 + 3, 2), 0);
  F4 = texelFetch(uD, ivec2(vI * 5 + 4, 2), 0);
  vec4 st = texelFetch(uSt, ivec2(gl_FragCoord.xy), 0);
  bool sw = st.a >= .5;
  float qs = sw ? (st.a - .5) * 2. : st.a * 2.; float ts = st.a < .004 ? 1e9 : 30. * qs / max(1. - qs, 1e-4);
  vec3 eye = uEye, d = normalize(vW - uEye);
  float tw = d.y < 0. ? eye.y / -d.y : 1e9;
  if (vM > .5) { if (!sw) discard; eye.y = -eye.y; d.y = -d.y; }
  vec3 fw = vec3(sin(A.z), 0., cos(A.z)), sd = vec3(cos(A.z), 0., -sin(A.z));
  vec3 o3 = eye - vec3(A.x, 0., A.y);
  vec3 ro = vec3(dot(o3, fw), o3.y, dot(o3, sd)), rd = vec3(dot(d, fw), d.y, dot(d, sd));
  vec3 bmin = vec3(E.z, F4.x, -1.05), bmax = vec3(E.w, F4.y, 1.05);
  { vec2 ed = normalize(vec2(ro.x - A.w + B.x, ro.z) + 1e-5); ed *= ed.x < 0. ? -1. : 1.; ed.y = clamp(ed.y, -.88, .88); ed.x = sqrt(1. - ed.y * ed.y);
    TW = normalize(mix(vec2(1., 0.), ed, clamp(F4.w * 1.6, 0., 1.))); }
  vec3 iv = 1. / rd, t0 = (bmin - ro) * iv, t1 = (bmax - ro) * iv;
  vec3 tn = min(t0, t1), tf = max(t0, t1);
  float ta = max(max(tn.x, tn.y), max(tn.z, 0.)), tb = min(min(tf.x, tf.y), tf.z);
  float tfr = length(vW - uEye);
  if (tb < ta || abs(tfr - tb) > abs(tfr - ta) + .001) discard;   // shade once, on the far face
  if (vM > .5) ta = max(ta, tw);
  float t = ta, dm = 1e9, tm = ta; bool hit = false;
  for (int i = 0; i < uNS; i++) {
    float h = sdW(ro + rd * t);
    float pr = h / (t * uPx);
    if (pr < dm) { dm = pr; tm = t; }
    if (h < t * uPx * .3) { hit = true; break; }
    t += max(h, t * uPx * .5);
    if (t > tb) break;
  }
  float cov = hit ? 1. : clamp(.5 - dm, 0., 1.);
  float th = hit ? t : tm;
  // the tusk: from the left of the upper lip, in line with the head
  vec4 tk = vec4(0.);
  if (C.z > .1) {
    float H = A.w, sl = (yc(H) - yc(H - .35)) / .35, ang = atan(sl) + C.w;
    tk = tusk(ro, rd, vec3(H - .02 * B.x, yc(H) - .045 * B.x, -.075), normalize(vec3(cos(ang), sin(ang), -.03)), C.z, fw, sd, eye, d, th, cov, hit);
    // its mirror is the shaded underside, darker than the tusk, and broken by the animal's own ripples
    if (vM > .5) { vec2 wp = uEye.xz + normalize(vW - uEye).xz * tw - (vec2(A.x, A.y) + fw.xz * H); tk.rgb *= .5; tk.a *= .2 + .8 * smoothstep(.35, .75, .5 + .5 * sin(length(wp) * 5.6 - uT * 2. + E.y)); }
  }
  vec3 col = vec3(0.); float al = 0.;
  if (cov > .002) {
    vec3 p = ro + rd * th;
    vec3 n = vec3(0.);
    for (int j = 0; j < uNK; j++) { vec3 s4 = vec3(j == 0 || j == 3 ? 1. : -1., j >= 2 ? 1. : -1., j == 1 || j == 3 ? 1. : -1.); n += s4 * sdW(p + s4 * max(.01, th * uPx * .7)); }
    n = normalize(n);
    vec3 nw = fw * n.x + sd * n.z + vec3(0., n.y, 0.);
    vec3 pw3 = eye + d * th;
    // skin: a baked map of blotches read by place on the body, darkened along the back by age class
    float s = clamp((A.w - p.x) / B.x, 0., 1.), x = A.w - s * B.x;
    vec3 dv = vec3(0., p.y - yc(x), p.z); float up = dv.y / max(length(dv), 1e-4);
    vec4 sk = texture(uM, vec2(s * B.x / 4.6 + E.y * .37, atn(dv.z, dv.y) * .159 + E.y * .13));
    float k = E.x, bl = sk.r;
    float dk = k < 1. ? .0 : k < 2. ? .88 + .12 * bl
      : k < 3. ? clamp(bl * (.55 + .45 * smoothstep(-.4, .7, up)) * 1.25 + .5 * smoothstep(.4, .97, up) + .3 * smoothstep(.16, .05, s), 0., 1.) * smoothstep(-.8, -.25, up)
      : clamp(bl * .85 * (smoothstep(.7, .97, up) + smoothstep(.12, .04, s)) + .45 * bl * smoothstep(-.1, .7, up), 0., 1.);
    vec3 ground = k < 1. ? vec3(.075, .082, .095) * (.85 + .3 * sk.b) : k < 3. ? vec3(.23, .23, .22) : vec3(.34, .34, .33);
    vec3 alb = mix(ground * (.9 + .2 * sk.b), vec3(.02, .02, .022), dk);
    alb = mix(alb, vec3(.3, .3, .28), sk.g * .4 * step(2., k) * smoothstep(-.2, .6, up));   // old rake marks
    alb *= 1. - .5 * smoothstep(.12, 0., length(vec2(s - .085, up - .98) * vec2(20., 4.)));   // the blowhole
    // flukes one tone on both lobes; the skin at the waterline wet and dark, no pale flecks along it
    alb = mix(alb, vec3(.035, .035, .038), smoothstep(A.w - B.x + .05, A.w - B.x - .08, p.x));
    alb *= 1. - .55 * smoothstep(.07, .0, abs(pw3.y));
    alb *= 1. - .35 * smoothstep(.32, .12, s) * smoothstep(0., -.6, up);   // the throat greyer: no white bib when a male rears
    float wet = F4.z;
    vec3 rr = reflect(d, nw);
    float F = .03 + .97 * pow(1. - max(dot(-d, nw), 0.), 5.);
    col = alb * (uSunC * (.04 + .2 * max(dot(nw, uSun), 0.)) + skyAmb(nw) * 1.5);
    col += (F * .35 + .012) * mix(uHor, uZen, sqrt(clamp(rr.y, 0., 1.))) * (.6 + .4 * wet) + uSunC * (.8 * wet + .1) * pow(max(dot(rr, uSun), 0.), mix(500., 150., smoothstep(8., 40., th))) * mix(1., .2, smoothstep(8., 40., th));
    al = cov;
    if (vM < .5) {
      // under water the pale flanks glow a dim green, the whole length of the animal
      if (pw3.y < 0.) { float dp = -pw3.y + (th - tw) * .3, Fw = .02 + .98 * pow(1. - abs(d.y), 5.); col = col * exp(-vec3(.8, .16, .2) * dp * 3.) * .45 + vec3(.0, .012, .014); al *= exp(-dp * 1.8) * (1. - Fw) * smoothstep(-.6, -.02, pw3.y - .25 * dp) * .9 + (1. - smoothstep(-.06, 0., pw3.y)) * 0.; }
      else al *= smoothstep(-.005, .02, pw3.y) * .6 + .4;
      if (!sw && ts < th) al = 0.;
    } else if (pw3.y < .0) al = 0.;
  }
  if (tk.a > 0.) { if (tk.a >= al) { col = mix(col, tk.rgb, tk.a); al = max(al, tk.a); } else col = mix(col, tk.rgb, tk.a * .5); }
  col = smoke(col, uEye, normalize(vW - uEye), th);
  if (vM < .5 && !sw && st.a > .004 && ts < th) discard;
  if (vM > .5) { float F = .02 + .98 * pow(1. - abs(d.y), 5.); al *= F * .9; }
  if (al < .002) discard;
  o = vec4(col * al * uSc, al);
}
`,Ve=nt+`
uniform sampler2D uD; uniform vec3 uEye, uF, uR, uU; uniform float uTh; uniform int uNP;
out vec2 vQ; out vec3 vW; flat out vec4 vB; flat out float vM;
void main(){
  int inst = gl_InstanceID; float mir = inst >= uNP ? 1. : 0.; int pi = inst - (inst >= uNP ? uNP : 0);
  vec4 a = texelFetch(uD, ivec2(pi * 2, 4), 0), b = texelFetch(uD, ivec2(pi * 2 + 1, 4), 0);
  int k = gl_VertexID; vec2 q = vec2(k == 1 || k == 2 || k == 4 ? 1. : -1., k == 2 || k == 4 || k == 5 ? 1. : -1.);
  vec3 C = a.xyz; if (mir > .5) C.y = -C.y;
  vec3 W = C + (uR * q.x + uU * q.y) * a.w;
  vQ = q; vW = W; vB = vec4(b.xyz, length(C - uEye)); vM = mir;
  vec3 v = W - uEye;
  gl_Position = vec4(dot(v, uR) / uTh, dot(v, uU) / uTh, 0., dot(v, uF));
}
`,Xe=nt+ie+`
in vec2 vQ; in vec3 vW; flat in vec4 vB; flat in float vM; out vec4 o;
uniform sampler2D uSt; uniform vec3 uEye; uniform float uSc;
void main(){
  vec4 st = texelFetch(uSt, ivec2(gl_FragCoord.xy), 0);
  bool sw = st.a >= .5;
  float qs = sw ? (st.a - .5) * 2. : st.a * 2., ts = st.a < .004 ? 1e9 : 30. * qs / max(1. - qs, 1e-4);
  if (vM > .5 && !sw) discard;
  if (vM < .5 && !sw && ts < vB.w) discard;
  float r = length(vQ * vec2(.8, 1.2)), n1 = nz(vQ * 2.3 + vB.y * 17.), n2 = nz(vQ * 7.3 + vB.y * 5.);
  // a ragged little cloud, not a disc
  float den = smoothstep(1., .2, r + .6 * (n1 - .5) + .35 * (n2 - .5)) * (.25 + .9 * n1) * (.4 + .8 * n2);
  vec3 d = normalize(vW - uEye);
  // breath is lit by where the sun is: a gold spark against it, nearly nothing with the sun at your back
  float mu = dot(d, uSun), g = .78;
  float hg = (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5) * .012;
  vec3 col = vB.z > .5 ? skyAmb(vec3(0., 1., 0.)) * 1.3 + uSunC * (.04 + hg * .5) : skyAmb(vec3(0., 1., 0.)) * .75 + uSunC * (hg + .008);
  float al = clamp(den * vB.x, 0., 1.);
  if (vM > .5) al *= (.02 + .98 * pow(1. - abs(d.y), 5.)) * .8;
  o = vec4(col * al * uSc, al);
}
`,Ao=nt+`
in vec2 vUv; out vec4 o;
uniform sampler2D uC; uniform vec4 uK, uSn;   // exposure, scale, grain seed, warmth | snow, time, layers
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
void main(){
  vec3 c = texelFetch(uC, ivec2(gl_FragCoord.xy), 0).rgb / uK.y;
  c *= uK.x * mix(vec3(1.), vec3(1.06, .97, .9), uK.w);
  c = aces(c);
  float lm = dot(c, vec3(.3, .55, .15)); c = clamp(mix(vec3(lm), c, 1.14), 0., 1.);
  vec2 q = vUv - .5; c *= 1. - .075 * dot(q, q);
  for (int l = 0; l < int(uSn.z); l++) {
    if (uSn.x <= 0.) break;
    float fl = float(l), sc = 22. + fl * 26.;
    vec2 g = vUv * sc + vec2(0., uSn.y * (2.4 - fl * .5));
    g.x += .35 * sin(g.y * .45 + fl * 2.1 + uSn.y * .7);
    vec2 ci = floor(g), cf = g - ci;
    uint hs = uint(ci.x + 300.) * 1597334677u ^ uint(ci.y + 9000.) * 3812015801u ^ uint(l + 1) * 2654435761u; hs ^= hs >> 15; hs *= 0x2c1b3c6du; hs ^= hs >> 12;
    float h1 = float(hs & 1023u) / 1023., h2 = float((hs >> 10) & 1023u) / 1023., h3 = float((hs >> 20) & 1023u) / 1023.;
    float sz = (.022 + .05 * h3 * h3) * (1.2 - fl * .25), dd = length((cf - .2 - .6 * vec2(h1, h2)) * vec2(1., .5));
    c = mix(c, vec3(.9, .92, .95), uSn.x * smoothstep(sz, 0., dd) * step(.62, h2 + .3 * h1) * (.6 - fl * .14) * (.6 + .4 * h3));
  }
  c = pow(c, vec3(1. / 2.2));
  uvec2 p = uvec2(gl_FragCoord.xy); uint h = p.x * 1597334677u ^ p.y * 3812015801u ^ uint(uK.z) * 2654435761u; h ^= h >> 15; h *= 0x2c1b3c6du; h ^= h >> 12;
  c += (float(h & 255u) / 255. - .5) * .012;
  o = vec4(c, 1.);
}
`,Ee=(t,e)=>{const a=i.createShader(e);return i.shaderSource(a,t),i.compileShader(a),a},mt=(t,e)=>{const a=i.createProgram(),n=typeof t=="string"?Ee(t,i.VERTEX_SHADER):t,c=Ee(e,i.FRAGMENT_SHADER);return i.attachShader(a,n),i.attachShader(a,c),i.linkProgram(a),{p:a,vs:n,fs:c}},Po=(t,e)=>{const a=(c,o,s)=>{if(c.indexOf(o)<0)throw new Error("566 NF "+t+" "+o);return c.split(o).join(s)},n=(c,o)=>a(c,"void main(){",`void main0();
void main(){main0();`+o+`}
void main0(){`);return t==="march"?n(a(e,"in vec2 vUv; out vec4 o;",`in vec2 vUv; out uvec4 oU; vec4 o;
uvec4 eHf(vec4 v){uint a=packHalf2x16(v.xy),b=packHalf2x16(v.zw);return uvec4(a&65535u,a>>16,b&65535u,b>>16);}
`),"oU=eHf(o);"):t==="bake"?n(a(a(e,"uniform sampler2D uC;",`uniform highp usampler2D uC;
vec4 dHf(uvec4 u){return vec4(unpackHalf2x16(u.x|(u.y<<16)),unpackHalf2x16(u.z|(u.w<<16)));}
`),"texelFetch(uC, ivec2(gl_FragCoord.xy), 0)","dHf(texelFetch(uC, ivec2(gl_FragCoord.xy), 0))"),"o.rgb*=.25;"):t==="bakef"?n(e,"o.rgb*=.25;"):t==="comp"?a(a(a(a(e,"uniform sampler2D uSt, uRf, uD;",`uniform sampler2D uSt, uRf, uD;
vec4 dSt(vec4 v){return vec4(v.rgb*4.,v.a);}
`),"texelFetch(uSt, ivec2(gl_FragCoord.xy), 0)","dSt(texelFetch(uSt, ivec2(gl_FragCoord.xy), 0))"),"texture(uRf, clamp(uvR, vec2(.001), vec2(.999))).rgb","(texture(uRf, clamp(uvR, vec2(.001), vec2(.999))).rgb*4.)"),"texture(uSt, vUv - g * .035)","dSt(texture(uSt, vUv - g * .035))"):e};let Se=!1;const Ke=i.__c566?null:(()=>{i.getExtension("KHR_parallel_shader_compile"),Se=!!i.getExtension("EXT_color_buffer_float")||!!i.getExtension("EXT_color_buffer_half_float");const t=Se?(n,c)=>c:Po,e=Ee(Eo,i.VERTEX_SHADER),a={march:mt(e,t("march",nt+`#define MARCH
`+Re)),bake:mt(e,t("bake",nt+Re)),bakef:mt(e,t("bakef",nt+`#define FARP
`+Re)),comp:mt(e,t("comp",So)),wh:mt(wo,Fo),fin:mt(e,Ao)};return i.flush(),a})(),k=i.__c566||(i.__c566=(()=>{const t=Se,e=256,a=new Uint8Array(e*e*4);let n=1449857253;for(let d=0;d<e*e;d++)n=Math.imul(n^n>>>15,739982445),n=Math.imul(n^n>>>12,695872825),n^=n>>>15,a[d*4]=n&255,a[d*4+2]=n>>>8&255,a[d*4+3]=n>>>16&255;for(let d=0;d<e;d++)for(let v=0;v<e;v++)a[(d*e+v)*4+1]=a[((d+17&255)*e+(v+37&255))*4];const c=(d,v,T,F,z,w,A,P)=>{const C=i.createTexture();return i.bindTexture(i.TEXTURE_2D,C),i.texImage2D(i.TEXTURE_2D,0,T,d,v,0,F,z,P||null),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,w),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,w===i.NEAREST?w:i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,A),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,A),C},o=c(e,e,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,i.LINEAR,i.REPEAT,a),s=256,r=new Float32Array(s*s),f=(d,v,T,F)=>{const z=Math.floor(d),w=Math.floor(v);let A=d-z,P=v-w;A=A*A*(3-2*A),P=P*P*(3-2*P);const C=(wt,Ft)=>a[((Ft%F+F)%F*256+(wt%T+T)%T)*4]/255,q=C(z,w),X=C(z+1,w),at=C(z,w+1),St=C(z+1,w+1);return q+(X-q)*A+(at-q)*P+(q-X-at+St)*A*P};for(let d=0;d<s;d++)for(let v=0;v<s;v++){const T=v/s*8,F=d/s*8,z=f(T*.5,F*.5,4,4)*.9,w=f(T*.5+7,F*.5+3,4,4)*.5,A=f((T+z)*.5,(F+w)*2,4,16),P=Math.min(1,Math.max(0,(A-.3)/.55));r[d*s+v]=.06*P*P*(3-2*P)+.016*f(T*1.5,F*5.5,12,44)+.02*f(T*.75,F*.75,6,6)}const u=new Uint8Array(s*s*4),y=2*8/s;for(let d=0;d<s;d++)for(let v=0;v<s;v++){const T=(r[d*s+(v+1&255)]-r[d*s+(v+255&255)])/y,F=(r[(d+1&255)*s+v]-r[(d+255&255)*s+v])/y,z=(d*s+v)*4;u[z]=Math.max(0,Math.min(255,128+T/2.2*255)),u[z+1]=Math.max(0,Math.min(255,128+F/2.2*255)),u[z+2]=r[d*s+v]/.1*255,u[z+3]=255}const x=c(s,s,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,i.LINEAR_MIPMAP_LINEAR,i.REPEAT,u);i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.generateMipmap(i.TEXTURE_2D);const p=256,R=128,Y=new Float32Array(p*R),H=new Float32Array(p*R),L=new Uint8Array(p*R*4);let _=24225;const j=()=>(_=Math.imul(_^_>>>15,739982445),_=Math.imul(_^_>>>12,695872825),_^=_>>>15,(_>>>0)/4294967296),ae=(d,v,T,F)=>{const z=Math.floor(d),w=Math.floor(v);let A=d-z,P=v-w;A=A*A*(3-2*A),P=P*P*(3-2*P);const C=(wt,Ft)=>a[((Ft%F+F)%F*256+(wt%T+T)%T)*4+2]/255,q=C(z,w),X=C(z+1,w),at=C(z,w+1),St=C(z+1,w+1);return q+(X-q)*A+(at-q)*P+(q-X-at+St)*A*P};for(let d=0;d<5200;d++){const v=j()*p,T=j()*R,F=ae(v/32,T/32,8,4);if(j()>.25+F*1.1)continue;const z=1.1+4.6*Math.pow(j(),2.2),w=z*(1+.5*j()),A=z*.75,P=j()*6.28,C=Math.ceil(Math.max(w,A)+1);for(let q=-C;q<=C;q++)for(let X=-C;X<=C;X++){const at=((Math.floor(v)+X)%p+p)%p,St=((Math.floor(T)+q)%R+R)%R,wt=Math.floor(v)+X-v,Ft=Math.floor(T)+q-T,Te=Math.atan2(Ft,wt),Oe=Math.hypot(wt/w,Ft/A)/(1+.22*Math.sin(Te*3+P)+.12*Math.sin(Te*5+P*2));Y[St*p+at]+=Math.max(0,Math.min(1,(1.15-Oe)*3))}}for(let d=0;d<46;d++){const v=j()*p,T=j()*R,F=12+40*j(),z=(j()-.5)*.35,w=.45+.4*j(),A=2+Math.floor(j()*3),P=1.6+j();for(let C=0;C<A;C++)for(let q=0;q<F;q++){const X=T+q*z+C*P,at=Math.floor(X),St=X-at,wt=(Math.floor(v+q+C*1.3)%p+p)%p,Ft=w*Math.pow(Math.sin(Math.PI*q/F),.7)*(1-.25*C/A);for(const[Te,Oe]of[[at,1-St],[at+1,St]]){const Ro=(Te%R+R)%R*p+wt;H[Ro]=Math.max(H[Ro],Ft*Oe)}}}for(let d=0;d<p*R;d++){const v=d%p,T=d/p|0;L[d*4]=Math.min(255,Y[d]*255),L[d*4+1]=H[d]*255,L[d*4+2]=ae(v/16,T/16,16,8)*255,L[d*4+3]=255}const Ge=c(p,R,i.RGBA8,i.RGBA,i.UNSIGNED_BYTE,i.LINEAR_MIPMAP_LINEAR,i.REPEAT,L);i.generateMipmap(i.TEXTURE_2D);const ne={},jt=(d,v)=>{if(!i.getProgramParameter(v.p,i.LINK_STATUS))throw new Error("566 "+d+": "+i.getShaderInfoLog(v.vs)+i.getShaderInfoLog(v.fs)+i.getProgramInfoLog(v.p));const T={p:v.p},F=i.getProgramParameter(v.p,i.ACTIVE_UNIFORMS);for(let z=0;z<F;z++){const w=i.getActiveUniform(v.p,z).name.replace("[0]","");T[w]=i.getUniformLocation(v.p,w)}i.useProgram(v.p),["uN","uSt","uRf","uD","uC","uS","uM"].forEach((z,w)=>{T[z]&&i.uniform1i(T[z],w)}),ne[d]=T};for(const d in Ke)jt(d,Ke[d]);return{P:ne,prep:jt,blR:null,tN:o,tS:x,tM:Ge,tex:c,fbo:d=>{const v=i.createFramebuffer();return i.bindFramebuffer(i.FRAMEBUFFER,v),i.framebufferTexture2D(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,d,0),v},fl:t,vao:i.createVertexArray(),slots:{big:[],small:[],nb:0,ns:0},F:{}}})()),st=k.P,we=k.fl?i.RGBA16F:i.SRGB8_ALPHA8,Fe=k.fl?i.HALF_FLOAT:i.UNSIGNED_BYTE,ce=k.fl?1:.25;let pt=1449791981;for(let t=2;t<66;t+=8)pt=Math.imul(pt^parseInt(g.hash.slice(t,t+8),16),2246822507)^pt>>>13;const h=()=>{pt=pt+1831565813|0;let t=Math.imul(pt^pt>>>15,1|pt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},xt=t=>{let e=0;for(const n in t)e+=t[n];let a=h()*e;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]},_t=g.trait("Sun",K?"Down the lead":xt({"Down the lead":38,"Low gold":24,"Across the lead":20,"Behind you":11,"Sun pillar":7})),re=g.trait("Pod",K?"Small pod":xt({Pair:24,"Small pod":40,"Pod of ten":26,"Tusking males":10})),qo=g.trait("Lead",K?"Open":xt({Narrow:30,Open:45,Wide:25})),Ze=g.trait("Meltpools",K?"Scattered":xt({"Early, few":30,Scattered:45,"Many and joined":25})),Co=g.trait("Calls",K?"Fulmars and kittiwakes":xt({Fulmars:30,Kittiwakes:28,"Fulmars and kittiwakes":34,"Ivory gulls":8}));let It=g.trait("Horizon",K?"Bergs and coast":xt({"Bergs and coast":40,"Tabular bergs":26,"Open ice":22,"Fata Morgana":12}));const Qe=g.trait("Ridges",K?"Pressure ridge":xt({"Low ridges":35,"Pressure ridge":50,"Great ridge":15})),Lo=g.trait("View",K?"On the floe edge":xt({"On the floe edge":45,"Kneeling at the water":30,"Across the lead":25}));let yt=1450089479;for(let t=2;t<66;t+=8)yt=Math.imul(yt^parseInt(g.hash.slice(t,t+8),16),3266489909)^yt>>>15;const Do=()=>{yt=yt+1831565813|0;let t=Math.imul(yt^yt>>>15,1|yt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ho=t=>{let e=0;for(const n in t)e+=t[n];let a=Do()*e;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]},At=g.trait("Encounter",K?"Out in the lead":Ho({"Out in the lead":50,"Close to the edge":28,"Along the floe edge":14,"Tusks up close":8})),rt=At!=="Out in the lead",_o=rt?10:16;let bt=1450117603;for(let t=2;t<66;t+=8)bt=Math.imul(bt^parseInt(g.hash.slice(t,t+8),16),2654435761)^bt>>>12;const Ae=()=>{bt=bt+1831565813|0;let t=Math.imul(bt^bt>>>15,1|bt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Pe=Ae()*100,Io=g.trait("Weather",K||Pe<52?"Clear and still":Pe<68?"Sea smoke":Pe<86?"Low overcast":"Light snow");It==="Fata Morgana"&&Ae()>.3&&(It=g.trait("Horizon",Ae()<.5?"Tabular bergs":"Bergs and coast"));const Vt={"Clear and still":[0,0,0],"Sea smoke":[.15,1,0],"Low overcast":[1,0,0],"Light snow":[.8,.2,1]}[Io],Ye={Narrow:8.5,Open:14,Wide:21}[qo]*(.92+.16*h()),Pt=[-Ye-.5,.34+.05*h(),.0011+6e-4*h(),Ye],le=[4+3*h(),1/(60+30*h()),h()*V,0],Xt=[1/(45+25*h()),h()*V,1/(17+8*h()),h()*V],Kt=[-170-30*h(),h()*9,h()*9,0],B=t=>Pt[0]+Pt[1]*t+Pt[2]*t*t/(1+Math.abs(t)/300)+le[0]*Math.sin(t*le[1]+le[2]),qe=t=>B(t+.5)-B(t-.5),gt=(t,e,a)=>{const n=Math.min(1,Math.max(0,(a-t)/(e-t)));return n*n*(3-2*n)},Z=t=>Pt[3]*(1+.26*Math.sin(t*Xt[0]+Xt[1])+.12*Math.sin(t*Xt[2]+Xt[3]))*(.06+.94*gt(Kt[0],Kt[0]+110,t)),fe=t=>Math.abs(t-Math.floor(t)-.5)*2-.5,Je=(t,e)=>{const a=e>0?Kt[2]:Kt[1];return 1.6*fe(t/23.7+a)+.6*fe(t/9.3+a*1.7)+.2*fe(t/3.9+a*2.3)+.07*fe(t/1.3+a*3.1)+.8*Math.sin(t/6.1+a*2.7)*Math.sin(t/2.3+a)},Ce=t=>{const e=Z(t);return B(t)+e+Je(t,1)*Math.min(1,e/6)},qt=(t,e,a)=>{const n=t-B(e),c=Z(e);return Math.abs(n)<c+Je(e,n)*Math.min(1,c/6)-a},Zt={"On the floe edge":[1,2.2,-.3,-.11,1.1],"Kneeling at the water":[5,1.3,-.28,-.08,1],"Across the lead":[9,2.25,-.95,-.1,1.7]}[Lo],I=Zt[0],U=Ce(I)+Zt[4],$e=Zt[1],to=K?0:(h()-.5)*.1,Bo=Zt[3]-(rt?.05:0);let N=At==="Along the floe edge"?Math.atan2(B(I+30)+Z(I+30)-U,30)-.1+to:Zt[2]+to;const No=64*Math.PI/180,lt=Math.tan(No/2),he={"Down the lead":[3.4,[.11,.21,.44],[.66,.5,.5],0],"Low gold":[1.6,[.12,.18,.38],[.9,.52,.34],.45],"Across the lead":[7,[.09,.22,.5],[.6,.6,.7],0],"Behind you":[6,[.06,.16,.46],[.56,.65,.82],0],"Sun pillar":[1.9,[.1,.15,.34],[.82,.47,.44],.2]}[_t],Qt=he[0]*Math.PI/180;let Ct;if(_t==="Down the lead"||_t==="Low gold"||_t==="Sun pillar"){const t=$e/Math.tan(Qt);let e=1e9;Ct=.2;for(let a=Math.max(-.5,N-.42);a<=Math.min(.7,N+.42);a+=.01){const n=U+t*Math.sin(a),c=I+t*Math.cos(a),o=Math.abs(n-B(c));o<e&&(e=o,Ct=a)}Ct+=(h()-.5)*.06}else Ct=_t==="Across the lead"?-1.25+N:2.8+(h()-.5)*.3;const Wo=t=>{const e=Math.max(t*180/Math.PI,.2),a=Math.min(1,.36+e*.045),n=Math.min(1,.1+e*.035);return[1,a,n]},Bt=Vt[0],eo=(t,e,a)=>t.map((n,c)=>n+(e[c]-n)*a),Uo=eo(he[1],[.36,.38,.42],Bt),Go=eo(he[2],[.64,.64,.66],Bt),Oo=1-.85*Bt,jo=he[3]*(1-Bt),Le={"Low ridges":1.3,"Pressure ridge":2.6,"Great ridge":4.3}[Qe],ue=70+25*h(),Vo=[B(ue)-Z(ue)-30-25*h(),ue,Math.atan(Pt[1]+2*Pt[2]*ue*.8)+(h()-.5)*.3,Le],Xo=[U+5+10*h(),-42-20*h(),1.25+(h()-.5)*.4,Le*.75+.5],Ko=[U+45+30*h(),100+40*h(),-.6+(h()-.5)*.5,Le*.6+.3],Zo=[5.5+2*h(),4.5+2*h(),4+2*h(),1.25+.4*h()],de=[.42+.12*h(),2.2+.8*h(),1.8+.3*h(),.12+.08*h()],De=[{"Early, few":.73,Scattered:.63,"Many and joined":.56}[Ze],U+6.5+2*h(),I+10+3*h(),Ze==="Early, few"?0:.36];for(const t of[.3,.4,.48,.22]){let e=!1;for(const a of[6,7.5,9.5,12]){const n=U+Math.sin(N+t)*a,c=I+Math.cos(N+t)*a;if(n>Ce(c)+4.5){De[1]=n,De[2]=c,e=!0;break}}if(e)break}const oo={"Bergs and coast":7,"Tabular bergs":11,"Open ice":2,"Fata Morgana":8}[It],Qo=N-.5-.5*h(),Yo=It==="Open ice"?0:It==="Tabular bergs"?.5:1.3+.5*h(),Jo=[oo,Qo,Yo,It==="Fata Morgana"?1:0],ao=[{"Low ridges":1.2,"Pressure ridge":2.2,"Great ridge":3.6}[Qe],Math.floor(h()*6e4),_t==="Sun pillar"?1:0,N],$o=se?"big":"small",Nt=k.slots[$o];let S=Nt.find(t=>t.hash===g.hash&&t.sz===D);if(S||(Nt.length<(se?2:10)?(S={},Nt.push(S)):S=Nt[se?k.slots.nb++%Nt.length:k.slots.ns++%Nt.length],S.sz!==D&&(S.tSt&&(i.deleteTexture(S.tSt),i.deleteTexture(S.tRf),i.deleteFramebuffer(S.fSt),i.deleteFramebuffer(S.fRf)),S.tSt=k.tex(D,D,we,i.RGBA,Fe,i.LINEAR,i.CLAMP_TO_EDGE),S.fSt=k.fbo(S.tSt),S.rs=se?D:Math.max(64,D>>1),S.tRf=k.tex(S.rs,S.rs,we,i.RGBA,Fe,i.LINEAR,i.CLAMP_TO_EDGE),S.fRf=k.fbo(S.tRf),S.tD||(S.tD=k.tex(64,5,i.RGBA32F,i.RGBA,i.FLOAT,i.NEAREST,i.CLAMP_TO_EDGE)),S.sz=D),S.hash=g.hash,S.vk=""),!k.F[D]){const t=k.tex(D,D,we,i.RGBA,Fe,i.NEAREST,i.CLAMP_TO_EDGE);k.F[D]={t,f:k.fbo(t)}}const He=k.F[D];if(!k.fl&&!(k.MU&&k.MU.sz>=D)){k.MU&&(i.deleteTexture(k.MU.t),i.deleteFramebuffer(k.MU.f));const t=k.tex(D,D,i.RGBA16UI,i.RGBA_INTEGER,i.UNSIGNED_SHORT,i.NEAREST,i.CLAMP_TO_EDGE);k.MU={t,f:k.fbo(t),sz:D}}const ta={yaw:0,pitch:0,x:0,y:0,z:0},M={e:[0,0,0],F:[0,0,1],R:[1,0,0],U:[0,1,0]},ea=()=>{const t=g.view||ta,e=Math.max(-1.35,Math.min(1.35,Bo+(t.pitch||0))),a=N+(t.yaw||0);M.e=[U+(t.x||0),Math.max(.4,$e+(t.y||0)),I+(t.z||0)],M.F=[Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)],M.R=[Math.cos(a),0,-Math.sin(a)],M.U=[-Math.sin(a)*Math.sin(e),Math.cos(e),-Math.cos(a)*Math.sin(e)];let n=!1;for(let c=I-8;c<=I+60&&!n;c+=1.5)for(const o of[.4,3,8]){const s=[Ce(c)+o-M.e[0],.25-M.e[1],c-M.e[2]],r=s[0]*M.F[0]+s[1]*M.F[1]+s[2]*M.F[2];if(r>.3&&Math.abs(s[0]*M.R[0]+s[2]*M.R[2])<r*lt&&Math.abs(s[0]*M.U[0]+s[1]*M.U[1]+s[2]*M.U[2])<r*lt){n=!0;break}}return de[1]=n?Math.abs(de[1]):-Math.abs(de[1]),[a,e,M.e[0],M.e[1],M.e[2]].map(c=>c.toFixed(4)).join()},it=(t,e)=>{i.activeTexture(i.TEXTURE0+t),i.bindTexture(i.TEXTURE_2D,e)},no=()=>{i.bindVertexArray(k.vao),i.disable(i.BLEND),i.disable(i.DEPTH_TEST),i.disable(i.SCISSOR_TEST),i.disable(i.CULL_FACE),i.colorMask(!0,!0,!0,!0)},ve=t=>{i.uniform3fv(t.uEye,M.e),i.uniform3fv(t.uF,M.F),i.uniform3fv(t.uR,M.R),i.uniform3fv(t.uU,M.U),i.uniform1f(t.uTh,lt)};let me=Ct,pe=Qt;const xe=(t,e,a)=>{const n=Wo(e),c=20*Oo;t.uSun&&i.uniform3f(t.uSun,Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)),t.uSunC&&i.uniform3f(t.uSunC,n[0]*c,n[1]*c,n[2]*c),t.uZen&&i.uniform3fv(t.uZen,Uo),t.uHor&&i.uniform3fv(t.uHor,Go),t.uW&&i.uniform4f(t.uW,Vt[0],Vt[1],Vt[2],O),t.uL0&&(i.uniform4fv(t.uL0,Pt),i.uniform4fv(t.uL1,le),i.uniform4fv(t.uL2,Xt),i.uniform4fv(t.uL3,Kt))},oa=()=>{no(),it(0,k.tN),it(5,k.tS);const t=k.fl?He:k.MU;for(const e of[1,0])for(const a of[st.bakef,st.march,st.bake])it(4,a===st.bake?t.t:null),i.useProgram(a.p),ve(a),xe(a,Qt,Ct),a.uR0&&(i.uniform4fv(a.uR0,Vo),i.uniform4fv(a.uR1,Xo),i.uniform4fv(a.uR2,Ko),i.uniform4fv(a.uRW,Zo)),a.uE&&i.uniform4fv(a.uE,de),i.uniform4fv(a.uP,De),a.uFar&&(i.uniform4fv(a.uFar,Jo),i.uniform4fv(a.uFar2,ao)),i.uniform4i(a.uLB,9,280,30,oo),a.uLB2&&i.uniform4i(a.uLB2,5,4,3,0),i.uniform1i(a.uMode,e),i.bindFramebuffer(i.FRAMEBUFFER,a===st.march?t.f:e?S.fRf:S.fSt),i.viewport(0,0,e?S.rs:D,e?S.rs:D),i.drawArrays(i.TRIANGLES,0,3);i.flush()},so=t=>t.top+(t.bob||0)+(t.bt!==void 0?.125*gt(.5,2.7,t.bt)*(1-gt(2.9,5.2,t.bt)):0),ft=(t,e)=>{const a=e+t.L*.5,n=e-t.L*.5;let c=so(t);a<0&&(c-=t.kr*a*a),n>0&&(c-=t.kd*n*n);const o=e-t.H+.38*t.len,s=Math.min(1,Math.max(0,(t.H-.45*t.len-e)/(.55*t.len)));return c+t.raise*.5*(o+Math.sqrt(o*o+.04))+t.lift*s*s};let Mt=1449984213;for(let t=2;t<66;t+=8)Mt=Math.imul(Mt^parseInt(g.hash.slice(t,t+8),16),668265263)^Mt>>>14;const b=()=>{Mt=Mt+1831565813|0;let t=Math.imul(Mt^Mt>>>15,1|Mt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let zt=1449860693;for(let t=2;t<66;t+=8)zt=Math.imul(zt^parseInt(g.hash.slice(t,t+8),16),374761393)^zt>>>13;const E=()=>{zt=zt+1831565813|0;let t=Math.imul(zt^zt>>>15,1|zt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},io=(t=>{let e=0;for(const n in t)e+=t[n];let a=b()*e;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]})({Resting:32,Travelling:26,Diving:15,"Tusks raised":15,"Far up the lead":12}),G=g.trait("Pod is",K?"Resting":At==="Tusks up close"?"Tusks raised":rt&&io==="Far up the lead"?"Resting":io),kt={Pair:2,"Small pod":5,"Pod of ten":10,"Tusking males":6}[re],ya=re==="Tusking males"||G==="Tusks raised";let Q;if(K)Q=["male","female","calf","young","old"];else if(re==="Tusking males"||At==="Tusks up close")Q=Array.from({length:kt},(t,e)=>e<2?"male":b()<.3?"old":b()<.25?"young":"male");else if(re==="Pair"){const t=b();Q=t<.45?["male","female"]:t<.8?["female","calf"]:["male","male"]}else for(Q=[];Q.length<kt;){const t=b();t<.3?Q.push("male"):t<.62?(Q.push("female"),b()<.6&&Q.length<kt&&Q.push("calf")):t<.85?Q.push("young"):Q.push("old")}G==="Tusks raised"&&Q.filter(t=>t==="male"||t==="old").length<2&&(Q=["male","male"].concat(Q).slice(0,kt));const ye=.46,aa=!K&&b()<0,na=!K&&b()<.011,m=[];for(let t=0;t<kt;t++){const e=Q[t],a=e==="male"||e==="old",n={calf:1.6+.25*b(),young:3+.5*b(),female:3.8+.4*b(),male:4.4+.4*b(),old:4.6+.4*b()}[e];let c=e==="male"?1.3+1.3*b():e==="old"?2.2+.6*b():e==="young"&&b()<.4?.4+.5*b():0;const o=e==="female"&&na&&!m.some(r=>r.fem);o&&(c=.9+.4*b());const s=a&&aa&&!m.some(r=>r.dbl);m.push({i:t,k:e,len:n,R:.115*n,male:c>0,tusk:c,fem:o,dbl:s,skin:{calf:.5,young:1.5,female:2.5,male:2.5,old:3.5}[e],seed:b()*50,mom:e==="calf"?t-1:-1,st:0,tm:0,x:0,z:0,hd:0,H:0,top:-.5,kr:.12,kd:.18,L:2,raise:0,rt:0,tp:0,lift:0,fl:0,v:1.3,blew:0,emit:0,wet:0,up:0,br:0,rolls:0,dly:0,a:0,c:0})}{let t=0;const e=kt>6?2:1,a=Math.ceil(m.filter(c=>c.k!=="calf").length/e),n=1.9+.6*b();for(const c of m){if(c.k==="calf"){const r=m[c.mom];c.a=r.a-r.len*.45,c.c=r.c+(r.c>0?-1:1)*(r.R+c.R+.25);continue}const o=Math.floor(t/a),s=t%a;t++,c.a=-o*5.5+(b()-.5)*1.4,c.c=(s-(a-1)/2)*n*1.6+o*n*.8+(b()-.5)*.5}}const Wt=G==="Far up the lead",l={z:Wt?75+35*b():24+10*b(),u:(b()-.5)*.3,dir:b()<.5?1:-1,mode:"up",tm:0,v:0,z0:0,ca:0,cv:.05,ct:1,iv:0,ang:(b()<.5?1:-1)*(.45+.6*b())},Yt=t=>{const e=Math.atan2(B(t)+l.u*Z(t)-U,t-I)-N;return Math.abs(Math.atan2(Math.sin(e),Math.cos(e)))};if(Wt){let t=l.z,e=9;for(let a=70;a<=140;a+=5){const n=Yt(a);n<e-.05&&(e=n,t=a)}l.z=t+(l.z-75)*.2}else if(!rt&&Yt(l.z)>.4){let t=l.z,e=9;for(let a=I-10;a<=60;a+=2){const n=B(a)+l.u*Z(a)-U,c=Yt(a)+Math.abs(a-l.z)*.004+(Math.hypot(n,a-I)<11?9:0);c<e&&(e=c,t=a)}l.z=t}if(!rt&&G==="Travelling"&&(l.dir=Yt(l.z+4)<Yt(l.z-4)?1:-1),G==="Travelling")l.ang=0;else{const t=B(l.z)+l.u*Z(l.z),e=Math.atan2(t-U,l.z-I)+(b()<.5?1:-1)*(Math.PI/2+(b()-.5)*.6),a=e-Math.atan2(qe(l.z),1)-(l.dir<0?Math.PI:0);l.ang=Math.atan2(Math.sin(a),Math.cos(a))}l.z0=l.z;const ht=[],Jt=(t,e,a,n)=>{ht.push([t,e,n,a]),ht.length>48&&ht.shift()},Lt=[],ut=[],co=[(b()-.5)*.8,.2+.4*b()];let O=0;const sa=t=>{const e=qe(t);return Math.atan2(e,1)},Tt=(t,e)=>Math.hypot(t-M.e[0],e-M.e[2]),dt=(t,e)=>{const a=t-M.e[0],n=e-M.e[2],c=a*M.F[0]+n*M.F[2],o=a*M.R[0]+n*M.R[2];return Math.max(-1,Math.min(1,o/Math.max(Math.abs(c),1)*.8))},$t=(t,e,a)=>[t.x+Math.sin(t.hd)*e+Math.cos(t.hd)*a,t.z+Math.cos(t.hd)*e-Math.sin(t.hd)*a],be=()=>sa(l.z)+(l.dir<0?Math.PI:0)+l.ang,vt=t=>{const e=be();let n=B(l.z)+l.u*Z(l.z)+Math.sin(e)*(t.a+l.ca)+Math.cos(e)*t.c,c=l.z+Math.cos(e)*(t.a+l.ca)-Math.sin(e)*t.c;const o=n-B(c),s=Math.max(Z(c)-2.5,.5);n=B(c)+Math.max(-s,Math.min(s,o));const r=(t.len||4)+.5,f=()=>n-Math.sin(e)*r,u=()=>c-Math.cos(e)*r;for(let y=0;y<12&&!(qt(n,c,2)&&qt(f(),u(),1.5));y++){const x=(B(c)+B(u()))/2-(n+f())/2;n+=x*.25}return[n,c,e]},te=t=>{const e=vt(t);return[e[0],e[1],e[2]+(h()-.5)*.12]},_e=t=>{let e=1e9,a=null;for(const n of m){const c=vt(n),o=Math.sin(c[2]),s=Math.cos(c[2]);for(const r of[t,0,-n.len-.6,t?-n.len-3.5:0]){const f=Math.hypot(c[0]+o*r-U,c[1]+s*r-I);f<e&&(e=f,a=[n,c])}}return[e,a]},Ie=()=>{let t=0;const e=Math.sin(N),a=Math.cos(N);for(const n of m){const c=vt(n),o=c[0]-Math.sin(c[2])*n.len*.5-U,s=c[1]-Math.cos(c[2])*n.len*.5-I,r=o*e+s*a,f=o*a-s*e;r>2&&Math.abs(f/r)<lt*.85&&t++}return t},ge=t=>{let e=!1;const a=[[0,0,.8],[.7,0,0],[-.7,0,0],[0,1.2,0],[0,-1.2,0]];for(let n=0;n<80;n++){const c=_e(t)[0];if(c>=(t?11.6:12.2))break;e=!0;const o=l.z,s=l.u;let r=null;const f=([y,x,p])=>{for(const R of m)R.c+=y;if(x&&(l.z+=x),p){const R=B(l.z)+l.u*Z(l.z),Y=R-U,H=l.z-I,L=Math.hypot(Y,H)||1,_=l.z+H/L*p,j=R+Y/L*p;l.z=_,l.u=Math.max(-.6,Math.min(.6,(j-B(_))/Z(_)))}},u=([y])=>{for(const x of m)x.c-=y;l.z=o,l.u=s};for(const y of a){f(y);const x=_e(t)[0],p=Ie();x>c+.05&&(!r||p>r[1]||p===r[1]&&x>r[2])&&(r=[y,p,x]),u(y)}r||(r=[[0,l.z>=I?1.2:-1.2,0]]),f(r[0]),l.z0=l.z}return e},ro=()=>{if(Ie()>=Math.min(3,m.length))return;const t=G==="Travelling"||G==="Diving"?2.5:-.5;let e=0,a=0;for(const o of m){const s=vt(o);e+=s[0]+Math.sin(s[2])*(t-o.len*.5),a+=s[1]+Math.cos(s[2])*(t-o.len*.5)}const n=Math.atan2(e/m.length-U,a/m.length-I)-N,c=Math.atan2(Math.sin(n),Math.cos(n));Math.abs(c)>.22&&(N+=Math.max(-.3,Math.min(.3,c-(c>0?.22:-.22))),ao[3]=N)},tt=t=>t.L/2-.2,Be=(t,e)=>{t.L=e?t.len+1.2:1.4+1.2*h(),t.top=e?-t.R+.11:-t.R*.55,t.kr=.1+.05*h(),t.kd=e?.3+.15*h():.12+.06*h()},$=(t,e,a,n,c)=>{t.hd=n,t.x=e-Math.sin(n)*c,t.z=a-Math.cos(n)*c},lo=(t,e,a)=>{Be(t,e);const n=te(t),c=-t.L/2-Math.sqrt((t.R+.6)/t.kr);if($(t,n[0],n[1],n[2],tt(t)),t.H=c-(a||0),t.st=e?1:4,t.blew=0,t.up=0,t.lift=0,t.wet=0,e){const o=m[t.mom];t.k==="calf"&&o&&(o.st===1||o.st===2)?(ee(t),$(t,...ze(t,o),o.hd,tt(t)),t.H=c):t.pair||po(t,n,25)}},fo=(t,e)=>{const a=$t(t,t.H-.085*t.len,0),n=ft(t,t.H-.085*t.len)+t.R*.95,c=Math.min(1,t.len/4.2);Me(a[0],n,a[1],c,0);const o=Tt(a[0],a[1]),s=Math.min(1,16/o)*e*c;g.sound.hit("noise",.6*s,{cutoff:1400,dur:.28,pan:dt(a[0],a[1])}),g.sound.hit("noise",.25*s,{cutoff:500,dur:.6,at:.05,pan:dt(a[0],a[1])})};function Me(t,e,a,n,c,o){const s=c?5:6;for(let r=0;r<s;r++)Lt.push({x:t+(h()-.5)*.15,y:e,z:a+(h()-.5)*.15,vx:(h()-.5)*(c?.5:1.3),vy:(c?2.4:1.5+.8*h())*(.7+.3*n)*(1-r*.08),vz:(h()-.5)*(c?.5:1.3),r:.06,sz:n*(c?.5:1),age:(o||0)-r*.04,life:c?1.1+.4*h():6+3*h(),seed:h()*40,sp:c,al:0});for(;Lt.length>32;)Lt.shift()}const ho={Fulmars:[0],Kittiwakes:[1],"Fulmars and kittiwakes":[0,1],"Ivory gulls":[2,0]}[Co];let Ne=2+5*b();const uo=[];if(Wt||kt>=10)for(let t=0;t<(Wt?14:6);t++){const e=(Wt?130:90)+380*Math.pow(b(),.8);uo.push({z:e,u:(b()-.5)*1.4,tm:.3+(t<5?3:12)*b()})}const vo=t=>G==="Tusks raised"&&t.tusk>.9,W=Math.PI/180,Ut=t=>Math.atan2(Math.sin(t),Math.cos(t)),Rt=(t,e)=>Math.max(-e,Math.min(e,t)),et=t=>[t.x+Math.sin(t.hd)*t.H,t.z+Math.cos(t.hd)*t.H],mo=(t,e)=>{const a=t-U,n=e-I,c=a*Math.sin(N)+n*Math.cos(N),o=a*Math.cos(N)-n*Math.sin(N);return c>2&&Math.abs(o/c)<lt*.88},Et=(t,e,a,n)=>{const c=Math.sin(n),o=Math.cos(n);for(let s=0;s<=1;s+=.5)if(Math.hypot(e-c*s*t.len-U,a-o*s*t.len-I)<11.6)return!1;return!qt(e,a,2)||!qt(e-c*t.len,a-o*t.len,1.5)?!1:!t.inF||mo(e-c*t.len*.5,a-o*t.len*.5)},ee=t=>{t.sp=t.spT=E()<.67?.06+.22*E():.03*E(),t.spTm=2+8*E(),t.hdT=(E()*2-1)*30*W,t.hdTm=3+9*E(),t.sx=void 0,t.cuA=E()*V,t.cuW=(E()<.5?-1:1)*(.1+.12*E()),t.bobP===void 0&&(t.scP=E()*V,t.scA=0,t.bobP=5+2*E(),t.bobPh=E()*V,t.nodPh=E()*V)},We=(t,e,a,n)=>{t.inF=!1,t.inF=mo(e-Math.sin(n)*t.len*.5,a-Math.cos(n)*t.len*.5)},po=(t,e,a,n)=>{ee(t),We(t,e[0],e[1],e[2]);const c=typeof a=="number"?(E()*2-1)*a*W:a[0];for(let o=0;o<4;o++){const s=e[2]+c*(1-o/4),r=(n||0)*(1-o/3)*E(),f=E()*V,u=e[0]+r*Math.sin(f),y=e[1]+r*Math.cos(f);if(Et(t,u,y,s)){const x=t.H;$(t,u,y,s,tt(t)),t.H=x;return}}},ze=(t,e)=>{const a=e.st===1?tt(e):e.H,n=[e.x+Math.sin(e.hd)*a,e.z+Math.cos(e.hd)*a],c=t.side||1,o=-e.len*.45,s=c*(e.R+t.R+.25);return[n[0]+Math.sin(e.hd)*o+Math.cos(e.hd)*s,n[1]+Math.cos(e.hd)*o-Math.sin(e.hd)*s]},xo=(t,e,a,n,c)=>{Be(t,!0),c&&(t.kr=c),$(t,e,a,n,tt(t)),t.H=-t.L/2-Math.sqrt((t.R+.6)/t.kr),t.st=1,t.blew=0,t.up=0,t.lift=0,t.wet=0,t.dip=0},yo=t=>{t.st=3,t.fl=0,t.br=99,t.dip=1,t.sx=void 0};let bo=0;const ia=t=>{const e=vt(t);if(t.k==="calf"){const r=m[t.mom];if(!r||r.st!==2){t.dipT=.5;return}const f=ze(t,r);xo(t,f[0],f[1],r.hd,.4);return}const a=e[2]+Rt(Ut(t.hd+(E()*2-1)*40*W-e[2]),50*W),n=2+3*E();let c=e[0]+.5*t.dox+Math.sin(a)*n,o=e[1]+.5*t.doz+Math.cos(a)*n,s=a;We(t,e[0],e[1],e[2]),Et(t,c,o,s)||(c=e[0],o=e[1],Et(t,c,o,s)||(s=e[2])),xo(t,c,o,s)},go=t=>{if(t.pair||(t.foe&&(t.foe.foeOf=null,t.foe=null),!t.bon||t.st!==2))return;const e=et(t);let a=10;for(const n of m){if(n===t||n.st!==2||n.tusk<.9||n.pair||n.bon)continue;const c=et(n),o=Math.hypot(c[0]-e[0],c[1]-e[1]);o<a&&(a=o,t.foe=n)}t.foe&&(t.foe.foeOf=t,t.hd0b=t.hd,t.d0b=a)},ca=(t,e)=>{const a=vt(t),n=a[2];if(t.sx!==void 0){const x=a[0]-t.sx,p=a[1]-t.sz,R=et(t);Math.abs(x)+Math.abs(p)<.3&&(t.pair||Et(t,R[0]+x,R[1]+p,t.hd)||!Et(t,R[0],R[1],t.hd))&&(t.x+=x,t.z+=p)}if(t.sx=a[0],t.sz=a[1],t.pair){if(t.ax===void 0){const _=et(t);t.ax=_[0],t.az=_[1],t.ahd=t.hd}else t.ax+=t.x-t.px0,t.az+=t.z-t.pz0;const x=et(t.pair),p=O*V/3.3+(t.i&1)*2.1,R=x[0]-t.ax,Y=x[1]-t.az,H=Math.hypot(R,Y)||1,L=.12*Math.sin(p)+.08*Math.sin(p*.43+t.seed)+.1;$(t,t.ax+R/H*L,t.az+Y/H*L,t.ahd+2*W*(Math.sin(p*.8+1.3*t.i)+Math.sin(p*.31+t.seed)),t.H),t.px0=t.x,t.pz0=t.z;return}const c=et(t);let o=c[0],s=c[1],r=t.hd,f,u,y;if(t.k==="calf"&&m[t.mom]&&m[t.mom].st===2){const x=m[t.mom],p=ze(t,x),R=.3*Math.sin(O*.37+t.seed),Y=p[0]+Math.sin(x.hd)*R-o,H=p[1]+Math.cos(x.hd)*R-s,L=Math.hypot(Y,H),_=Math.min(.36,L*.7)*e;L>.01&&(o+=Y/L*_,s+=H/L*_),f=_/e,u=x.hd+6*W*Math.sin(O*.7+t.seed),y=Math.min(6*W,.5*f/t.len+.4*W)*e}else{(t.spTm-=e)<=0&&(t.spTm=6+9*E(),t.spT=E()<.25?.01+.03*E():.1+.25*E()),(t.hdTm-=e)<=0&&(t.hdTm=8+12*E(),t.hdT=Rt((E()*2-1)*35*W-.6*bo,35*W));const x=o-a[0],p=s-a[1],R=Math.hypot(x,p),Y=x*Math.sin(r)+p*Math.cos(r);let H=t.chx||0,L=t.chz||0,_=1;t.chx=t.chz=0;const j=Math.sin(r),ae=Math.cos(r);for(const d of m){if(d===t||d.st!==2&&d.st!==1||d===m[t.mom]||d.mom===t.i)continue;const v=et(d),T=Math.sin(d.hd),F=Math.cos(d.hd),z=t.R+d.R;for(let w=0;w<=1;w+=.5)for(let A=0;A<=1;A+=.5){const P=o-j*w*t.len-(v[0]-T*A*d.len),C=s-ae*w*t.len-(v[1]-F*A*d.len),q=Math.hypot(P,C)||.01;if(q<z+1.5){const X=.14*(1-q/(z+1.5))+(q<z+.4?.25*(1-q/(z+.4)):0);H+=P/q*X,L+=C/q*X,!w&&P*j+C*ae<0&&(_=Math.min(_,gt(z+.3,z+1.5,q)))}}}t.sp+=Rt(t.spT*(1-.8*gt(3,7,Y))*_-t.sp,(_<1?.3:.1)*e),f=t.sp,u=n+t.hdT;const Ge=x*Math.cos(r)-p*Math.sin(r);if(u-=Rt(Ge*.12,25*W),u=n+Rt(Ut(u-n),55*W),y=Math.min(6*W,.75*f/t.len+.7*W)*e,t.foe&&t.bon){const d=et(t.foe),v=d[0]-o,T=d[1]-s,F=Math.hypot(v,T);u=t.hd0b+Rt(Ut(Math.atan2(v,T)-t.hd0b),12*W),y=3*W*e,F>t.d0b-1&&F>t.R+t.foe.R+2.2&&(t.chx=v/F*.25,t.chz=T/F*.25)}else t.bon&&(u+=3*W*Math.sin(O*V/2.5+t.seed));if(t.foeOf&&t.foeOf.bon&&t.foeOf.foe===t){const d=et(t.foeOf);u=r+Rt(Ut(Math.atan2(d[0]-o,d[1]-s)-r),10*W),y=Math.max(y,2.5*W*e)}const ne=.1*gt(4,8,R);R>0&&(H-=x/R*ne,L-=p/R*ne),t.cuA+=e*t.cuW,H+=Math.sin(t.cuA)*.09,L+=Math.cos(t.cuA)*.09;const jt=Math.hypot(H,L);jt>.3&&(H*=.3/jt,L*=.3/jt),H+=Math.sin(r)*f,L+=Math.cos(r)*f;const ke=Math.hypot(H,L);ke>.36&&(H*=.36/ke,L*=.36/ke),o+=H*e,s+=L*e}r+=Rt(Ut(u-r),y),Et(t,o,s,r)||!Et(t,c[0],c[1],t.hd)?$(t,o,s,r,t.H):t.cuA!==void 0&&Et(t,c[0]-Math.sin(t.cuA)*.09*e,c[1]-Math.cos(t.cuA)*.09*e,t.hd)?($(t,c[0]-Math.sin(t.cuA)*.09*e,c[1]-Math.cos(t.cuA)*.09*e,t.hd,t.H),t.cuA+=Math.PI*.5,t.sp=0,t.hdT=-t.hdT):(t.sp=0,t.spT=.02,t.spTm=Math.min(t.spTm,3),t.hdT=-t.hdT)},ra=(t,e)=>{t.bobP===void 0&&ee(t),t.bob=.018*Math.sin(O*V/t.bobP+t.bobPh)-.005;const a=t.st===4?.5:t.st===2?Math.min(1,(t.sp||0)/.25):0;t.scA+=(.025+.065*a-t.scA)*Math.min(1,e*.8),t.scP+=e*V/(4.6-1.4*a),t.lift=-.03+t.scA*Math.sin(t.scP)};!rt&&ge(G==="Travelling"?4:0)&&ro();let la=0;for(const t of m){const e=(b()-.5)*.4;if(G==="Travelling")lo(t,!1,1.3*(1.6+e+(t.k==="calf"?.3:0))),t.rolls=3+Math.floor(h()*2);else{Be(t,!0);const a=te(t);$(t,a[0],a[1],a[2],tt(t)),t.H=tt(t),t.st=2,t.up=1,t.blew=1,t.wet=.5,t.raise=.07,t.tp=.1,t.br=5+12*b()+t.i*1.3,vo(t)&&(t.rt=1,t.bon=la++%2?0:1,t.btm=(t.bon?4.6:6)+3*(t.seed*7.13%1),t.bon&&(t.raise=ye,t.tp=.15))}}if(G==="Travelling"?l.v=1.25:l.v=.12,G==="Diving"){l.mode="dive";let t=null;m.forEach((e,a)=>{e.dly=.6+a*.55+b()*.4;const n=e.k==="calf"?1:b();e.fl=0,a>=2&&!t&&n<.13&&(t=e,e.fl=.7+1.5*n)})}else if(G!=="Travelling"){const t=m.find(a=>a.k!=="calf")||m[0];t.br=2.6,l.tm=50+40*b();const e=m.find(a=>a!==t&&a.k!=="calf");if(e){const a=$t(e,e.H-.085*e.len,0);Me(a[0],ft(e,e.H-.085*e.len)+e.R*.95,a[1],Math.min(1,e.len/4.2),0,1.2+b())}}else l.tm=0;if(rt){const t=At==="Tusks up close"?15:14;let e=N+.02;for(let s=0;s<=25;s++){const r=N+.02+(s&1?1:-1)*Math.ceil(s/2)*.02;if(qt(U+Math.sin(r)*t,I+Math.cos(r)*t,4.5)){e=r;break}}let a=U+Math.sin(e)*t,n=I+Math.cos(e)*t;if(l.z=n+2,l.u=Math.max(-.6,Math.min(.6,(a-B(n))/Z(n)-.1)),l.z0=l.z,G!=="Travelling"){const s=b()<.5?1:-1,r=e-N,u=N+(Math.abs(r)>.05?r>0?1:-1:s)*(Math.PI/2+(b()-.5)*.5)-Math.atan2(qe(l.z),1)-(l.dir<0?Math.PI:0);l.ang=Math.atan2(Math.sin(u),Math.cos(u))}const c=m.filter(s=>s.k!=="calf"),o=c.find(vo);if(At!=="Tusks up close"){const s=f=>{const u=te(f);return Math.hypot(u[0]-U,u[1]-I)},r=c.reduce((f,u)=>s(u)>s(f)?u:f,c[0]);o&&r!==o&&([r.a,o.a]=[o.a,r.a],[r.c,o.c]=[o.c,r.c]),c.forEach((f,u)=>{f.a+=(u%2?1:-1)*.9});for(const f of m)if(f.k==="calf"){const u=m[f.mom];f.a=u.a-u.len*.45,f.c=u.c+(u.c>0?-1:1)*(u.R+f.R+.25)}}ge(G==="Travelling"?4:0)&&ro();for(const s of m)if(s.st===2||s.st===4){const r=te(s);$(s,r[0],r[1],r[2],s.st===2?s.H:tt(s))}if(At==="Tusks up close"&&kt>=2){const s=m[0],r=m[1],f=te(s);s.c=0,r.c=1.2,r.a=3.6,$(s,f[0],f[1],f[2],s.H);const u=Math.sin(f[2]),y=Math.cos(f[2]);$(r,f[0]+u*(s.tusk*.55+1.2)+y*.9,f[1]+y*(s.tusk*.55+1.2)-u*.9,f[2]+Math.PI-.35,r.H),s.rt=r.rt=s.bon=r.bon=1,s.raise=r.raise=ye,s.btm=5.5,s.pair=r,r.pair=s}}if(G!=="Travelling"){const t=m.filter(n=>n.st===2&&n.k!=="calf"&&!n.pair),e=t.length,a=t.map((n,c)=>e>1?(-1+2*c/(e-1))*(e>2?24:14)*W:0);for(let n=e-1;n>0;n--){const c=Math.floor(E()*(n+1));[a[n],a[c]]=[a[c],a[n]]}t.forEach((n,c)=>{const o=et(n);po(n,[o[0],o[1],n.hd],[a[c]+(E()-.5)*8*W],1.2)});for(const n of m){const c=m[n.mom];if(n.k==="calf"&&c&&n.st===2){n.side=n.c>c.c?1:-1,ee(n);const o=ze(n,c);$(n,o[0],o[1],c.hd,n.H),We(n,o[0],o[1],c.hd),n.swT=6+12*E()}else n.st===2&&(n.pair||n.k==="calf")&&ee(n)}for(const n of m)n.bon&&go(n)}const fa=(t,e)=>{const a=Math.floor(8e3*t),n=new Float32Array(a);let c=0,o=0,s=0,r=0;const f=300+400*h(),u=2*Math.cos(V*f/8e3),y=.985;for(let x=0;x<a;x++){const p=x/a,R=22+55*p+18*Math.sin(p*7+f);c+=R/8e3,c>=1&&(c-=1,o=.6+.4*Math.sin(x*12.9898+f));const Y=o;o*=.2;const H=Y+u*y*s-y*y*r;r=s,s=H,n[x]=Math.max(-1,Math.min(1,H*.08*Math.sin(Math.PI*p)))}g.sound.pcm(n,8e3,{vel:e})},Dt=new Float32Array(64*5*4);let Gt=0,Ht=0;const ha=()=>{Dt.fill(0);for(let t=0;t<ht.length;t++)Dt.set(ht[t],t*4);for(let t=0;t<ut.length&&t<8;t++){const e=ut[t];Dt.set([e.x,e.z,e.r,e.s*Math.min(1,e.age/.4)*Math.max(0,1-e.age/e.life)],256+t*8),Dt.set([e.vx,e.vz,0,0],256+t*8+4)}Gt=0;for(const t of m.slice().sort((e,a)=>Tt(a.x,a.z)-Tt(e.x,e.z))){if(t.st===0)continue;let e=9,a=-9;for(let u=0;u<=8;u++){const y=t.H-t.len*u/8,x=ft(t,y);e=Math.min(e,x),a=Math.max(a,x)}const n=t.tusk,c=so(t),o=(ft(t,t.H)-ft(t,t.H-.35))/.35,s=Math.atan(o)+t.tp,r=ft(t,t.H)+Math.sin(s)*n;if(a=Math.max(a+t.R+.12+(t.lift>.01?.2*t.len:0),r+.1),e=Math.max(-1.6,e-t.R-.12),a<-1.2)continue;const f=512+Gt*20;if(Dt.set([t.x,t.z,t.hd,t.H,t.len,c,t.kr,t.kd,t.L,t.raise,n,t.tp,t.skin,t.seed,t.H-t.len*1.17-.1,t.H+.35+Math.max(0,Math.cos(s))*n,e,a,t.wet,t.lift],f),++Gt>=12)break}Ht=0;for(const t of Lt)t.age>0&&Ht<32&&(Dt.set([t.x,t.y,t.z,t.r,t.al,t.seed,t.sp?1:0,0],1024+Ht*8),Ht++);it(7,S.tD),i.texSubImage2D(i.TEXTURE_2D,0,0,0,64,5,i.RGBA,i.FLOAT,Dt)},Mo=t=>{O+=t;const e=be()-l.ang,a=Math.sin(e)*l.v*t,n=Math.cos(e)*l.v*t;l.z+=n;const c=m.every(o=>o.st===0);if(c&&(l.z-l.z0)*l.dir>(Wt?25:16)&&!rt&&(l.dir=-l.dir),rt&&(l.z+=(l.z0-l.z)*Math.min(1,t*.05)),l.tm-=t,G==="Travelling")l.tm<=0&&(l.rolls>0?(l.rolls--,l.deep=l.rolls===0,ge(4),m.forEach(o=>{o.pend=1,o.dly=(h()-.5)*.5+(o.k==="calf"?.35:0)+.3}),l.tm=5.2+.9*h()):(l.rolls=3+Math.floor(h()*2),l.tm=16+12*h()));else if(l.mode==="up"&&l.tm<=0){l.mode="dive";let o=0;m.forEach((s,r)=>{s.dly=r*.7+1.4*h(),s.fl=!o&&s.k!=="calf"&&h()<.2?(o=1,.65+.3*h()):0})}else l.mode==="dive"&&c?(l.mode="under",l.tm=22+20*h(),l.v=.5):l.mode==="under"&&l.tm<=0&&(ge(0),l.mode="up",l.tm=45+45*h(),l.v=.12,m.forEach(o=>{o.pend=1,o.dly=2.6*h()+(o.k==="calf"?.4:0)}));if(G!=="Travelling"){const o=be();let s=0,r=0;for(const f of m)f.st===2&&f.k!=="calf"&&!f.pair&&(s++,r+=Ut(f.hd-o));if(bo=s?r/s:0,l.dipT===void 0&&(l.dipT=7+9*E()),l.mode==="up"&&l.cv>0){if(!l.iv){const f=be(),u=vt(m[0]);Math.sin(f)*(u[0]-U)+Math.cos(f)*(u[1]-I)<0&&(l.cv=0)}if(l.ca+=l.cv*t,(l.ct-=t)<=0){l.ct=1;const f=Ie(),u=_e(0)[0];l.iv||(l.iv=f,l.nr=u);const y=f<l.iv?1:u<Math.min(12.2,l.nr-.2)?2:m.some(x=>{const p=vt(x);return!qt(p[0],p[1],2.6)})?3:0;y&&(l.cv=0,l.why=y)}}else l.mode==="under"&&(l.ca=0,l.cv=.05,l.iv=0);if(l.dipT-=t,l.mode==="up"&&l.dipT<=0&&!m.some(f=>f.dip&&f.k!=="calf")){const f=m.filter(u=>u.st===2&&u.k!=="calf"&&!u.pair&&!u.bon&&u.bt===void 0&&!m.some(y=>y.mom===u.i));if(f.length){const u=f[Math.floor(E()*f.length)],y=vt(u),x=et(u);u.dox=x[0]-y[0],u.doz=x[1]-y[1],u.foeOf&&(u.foeOf.foe=null,u.foeOf=null),yo(u),l.dipT=15+25*E()}else l.dipT=2}}for(const o of m){if(o.st===0&&o.dip&&(l.mode!=="up"?o.dip=0:(o.dipT-=t)<=0&&ia(o)),(o.st===1||o.st===2||o.st===4)&&ra(o,t),o.pend&&(o.dly-=t,o.dly<=0&&o.st===0&&(o.pend=0,lo(o,G!=="Travelling"),G==="Travelling"&&l.deep&&(o.kd=.3,o.fl=o.k!=="calf"&&!m.some(r=>r.fl>0)&&h()<.25?.6+.3*h():0))),o.st===0)continue;if(o.st===2){if(ca(o,t),o.k==="calf"&&l.mode==="up"&&m[o.mom]&&m[o.mom].st===2&&o.bt===void 0&&(o.swT=(o.swT===void 0?12:o.swT)-t)<=0){o.side=-(o.side||1),o.swT=15+15*E(),yo(o),o.kd=.9;continue}l.mode==="dive"&&(o.dly-=t,o.dly<=0&&(o.st=3,o.br=99)),o.br-=t,o.br<=0&&o.bt===void 0&&(o.bt=0),o.bt!==void 0&&(o.bt+=t,o.bt>.45&&!o.bb&&(o.bb=1,o.wet=1,fo(o,1)),o.bt>5.2&&(o.bt=void 0,o.bb=0,o.br=o.k==="calf"?.2+3.8*E():1+8*E()))}else{const r=o.st===1?1.05:o.st===3?1.25:1.5;if(o.H+=r*t,o.st===1&&o.H>=tt(o)&&(o.H=tt(o),o.st=2,o.br=4+10*h()),o.st===3){const f=(o.H-tt(o))/o.len;o.lift=o.fl?o.fl*gt(.35,.75,f)*(1-gt(.95,1.35,f)):o.lift*Math.max(0,1-t*2)}if(!o.blew&&ft(o,o.H-.085*o.len)+o.R*.8>.03&&(o.blew=1,o.wet=1,fo(o,1)),!o.up&&ft(o,o.H)+o.R*.8>0){o.up=1;const f=$t(o,o.H,0);Jt(f[0],f[1],.7*Math.min(1,o.len/4),O),g.sound.hit("noise",.18*Math.min(1,16/Tt(f[0],f[1])),{cutoff:450,dur:.3,pan:dt(f[0],f[1])})}if(o.st!==1&&o.H-o.len>o.L/2+Math.sqrt((o.top+1.4+o.R+o.fl)/o.kd)&&(o.st!==3||o.lift<.02)){const f=$t(o,o.H-o.len,0);Jt(f[0],f[1],.9+o.fl,O),g.sound.hit("noise",(.15+.2*o.fl)*Math.min(1,16/Tt(f[0],f[1])),{cutoff:380+300*o.fl,dur:.45,pan:dt(f[0],f[1])}),o.st=0,o.lift=0,o.fl=0,o.up=0,o.dip&&(o.dipT=o.k==="calf"?.8+.8*E():6+14*E())}}o.rt>0&&o.st===2&&(o.btm-=t,o.btm<=0&&(o.bon=!o.bon,o.btm=o.bon?3+5*h():4+8*h(),go(o)),o.pair&&o.i>o.pair.i&&(o.bon=o.pair.bon,o.btm=9));const s=o.st!==2?0:o.bon?ye-.02+.06*Math.sin(O*V/(2+o.seed%1)+o.seed):.07+.025*Math.sin(O*V/6+(o.nodPh||0))+(o.bt!==void 0?.2*Math.sin(Math.PI*Math.min(o.bt/1.8,1)):0);if(o.raise+=Math.max(-t*.6,Math.min(t*.9,s-o.raise)),o.tp=o.st===2?.1+.05*Math.min(1,o.raise/ye):o.st===1?.08:0,o.wet=Math.max(0,o.wet-t*.08),o.emit-=t,o.emit<=0){o.emit=o.st===2?1.6+h():.4+.2*h();let r=null;for(let f=0;f<=8;f++){const u=o.H-o.len*f/8;if(Math.abs(ft(o,u))<o.R*1.05){r=u;break}}if(r!==null){const f=$t(o,r,0);Jt(f[0],f[1],(o.st===2?.12:.35+.2*h())*Math.min(1,o.len/4),O)}}}for(const o of m)if(o.pair&&o.raise>.42&&o.pair.raise>.42&&o.i<o.pair.i&&(o.clk=(o.clk||2)-t,o.clk<=0)){o.clk=1.5+4*h();const s=Math.min(1,20/Tt(o.x,o.z));g.sound.hit("click",.5*s,{pan:dt(o.x,o.z)}),g.sound.hit("click",.3*s,{at:.06+.05*h(),pan:dt(o.x,o.z)})}for(const o of uo)o.tm-=t,o.tm<=0&&(o.tm=9+16*h(),Me(B(o.z)+o.u*Z(o.z),.4,o.z,1.4,0));if(Ne-=t,Ne<=0){Ne=6+16*h();const o=ho[Math.floor(h()*ho.length)],s=(h()-.5)*1.6,r=.15+.2*h();if(o===1)g.sound.note(88,{wave:"square",cutoff:2600,dur:.06,vel:r*.5,pan:s}),g.sound.note(90,{wave:"square",cutoff:2600,dur:.06,vel:r*.5,at:.1,pan:s}),g.sound.note(85,{wave:"square",cutoff:2200,dur:.3,vel:r*.6,at:.22,pan:s});else if(o===0){const f=5+Math.floor(h()*5);for(let u=0;u<f;u++)g.sound.note(62+Math.floor(h()*3),{wave:"sawtooth",cutoff:1200,dur:.05,vel:r*.4,at:u*.085,pan:s})}else g.sound.note(93,{wave:"triangle",cutoff:3e3,dur:.35,vel:r*.5,pan:s}),g.sound.note(91,{wave:"triangle",cutoff:3e3,dur:.25,vel:r*.4,at:.4,pan:s})}for(;ht.length&&O-ht[0][2]>9;)ht.shift();for(let o=Lt.length-1;o>=0;o--){const s=Lt[o];if(s.age+=t,s.age>s.life){Lt.splice(o,1);continue}if(s.age<0)continue;const r=Math.exp(-t*5),f=s.sp?r:Math.exp(-t*2.2);s.vy=s.vy*r-(s.sp?6*t:0),s.vx*=f,s.vz*=f,s.x+=(s.vx+(s.sp?0:co[0]*Math.min(1,s.age)))*t,s.y+=s.vy*t,s.z+=(s.vz+(s.sp?0:co[1]*Math.min(1,s.age)))*t,s.r=s.sz*(.06+.24*(1-Math.exp(-s.age*1.6))+.035*s.age),s.al=Math.min(1,s.age*9)*Math.pow(1-s.age/s.life,1.6)*(s.sp?.7:.5)}for(let o=ut.length-1;o>=0;o--){const s=ut[o];s.age+=t,s.x+=s.vx*t,s.z+=s.vz*t,s.r+=t*.9,s.age>s.life&&ut.splice(o,1)}};let ot=null,J=null,Ot=0,zo=0;const ko=(t,e)=>{const a=t*2-1,n=1-e*2,c=[0,1,2].map(s=>M.F[s]+a*lt*M.R[s]+n*lt*M.U[s]),o=Math.hypot(c[0],c[1],c[2]);return c.map(s=>s/o)},Ue=(t,e)=>{const a=ko(t,e);if(a[1]>-.002)return null;const n=Math.min(M.e[1]/-a[1],400);return[M.e[0]+a[0]*n,M.e[2]+a[2]*n,n]},ua=(t,e)=>{let a=Ue(t,e);if(!a){const r=ko(t,e);a=[M.e[0]+r[0]*60,M.e[2]+r[2]*60,60]}let n=a[0],c=a[1];if(!qt(n,c,2.5)){const r=n-B(c),f=Math.max(Z(c)-3,.5);n=B(c)+Math.max(-f,Math.min(f,r))}for(let r=0;r<8&&Tt(n,c)<_o-1;r++){const f=n-M.e[0],u=c-M.e[2],y=Math.hypot(f,u)||1;n+=f/y*2,c+=u/y*2;const x=n-B(c),p=Math.max(Z(c)-3,.5);n=B(c)+Math.max(-p,Math.min(p,x))}const o=Tt(n,c),s=Math.min(1,14/o);Me(n,.05,c,1,1),Jt(n,c,.45,O),Jt(n,c,.2,O+.35),g.sound.hit("noise",.5*s,{cutoff:900,dur:.18,pan:dt(n,c)}),g.sound.hit("noise",.25*s,{cutoff:2600,dur:.35,at:.03,pan:dt(n,c)}),g.sound.note(43+Math.floor(h()*4),{wave:"sine",dur:.25,vel:.2*s,at:.01})},da=t=>{const e=g.input,a=e.taps();if(a.length){const n=a[a.length-1];ot={x:n.x,y:n.y,t:0,x0:n.x,y0:n.y},J=null}if(ot&&(ot.t+=t,e.down?Math.hypot(e.x-ot.x0,e.y-ot.y0)>.03?(J={x:e.x,y:e.y,acc:0},ot=null):ot.t>.45&&(ot=null,Ot=1e-4):(ua(ot.x,ot.y),ot=null)),J)if(!e.down)J=null;else{const n=e.x-J.x,c=e.y-J.y;if(J.acc+=Math.hypot(n,c),J.acc>.04){J.acc=0;const o=Ue(J.x,J.y),s=Ue(e.x,e.y);if(o&&s){let r=s[0]-o[0],f=s[1]-o[1];const u=Math.hypot(r,f)||1,y=2.2+Math.min(4,u*1.5);for(r=r/u*y,f=f/u*y,ut.push({x:s[0],z:s[1],vx:r,vz:f,r:3+s[2]*.12,s:1,age:0,life:4.5+h()*2});ut.length>8;)ut.shift();g.sound.hit("noise",.12,{cutoff:3500,dur:.5,pan:dt(s[0],s[1])}),O-zo>1.1&&(zo=O,fa(.7+.6*h(),.55),g.sound.note(31+Math.floor(h()*5),{wave:"sawtooth",cutoff:180,dur:1.4,vel:.35}))}J.x=e.x,J.y=e.y}}Ot>0&&(e.down?Ot+=t:Ot=0)};let ct=0;const va=t=>{Ot>0?ct=Math.min(1,ct+t/8):ct>0&&(ct=ct>=1?0:Math.min(1,ct+t/8)),ct>=1&&(ct=Ot>0?1e-4:0);const e=Math.sin(Math.PI*ct);return pe=Math.max(.25*Math.PI/180,Qt-e*Math.min(Qt-.4*Math.PI/180,2.6*Math.PI/180)),me=Ct+.05*Math.sin(V*ct),e},To=t=>{const e=ea();e!==S.vk&&(oa(),S.vk=e),ha(),no();let a=st.comp;i.useProgram(a.p),it(0,k.tN),it(1,S.tSt),it(2,S.tRf),it(3,S.tD),i.uniform1f(a.uSc,ce),ve(a),xe(a,pe,me),i.uniform1f(a.uT,O),i.uniform1f(a.uPx,2*lt/D);const n=1-.1*t,c=1-.12*t;i.uniform4f(a.uG,n,c,24*(1-.3*t)*(1-Bt),0),i.uniform4i(a.uLB,ht.length,Math.min(8,ut.length),0,0),i.bindFramebuffer(i.FRAMEBUFFER,He.f),i.viewport(0,0,D,D),i.drawArrays(i.TRIANGLES,0,3),i.enable(i.BLEND),i.blendFunc(i.ONE,i.ONE_MINUS_SRC_ALPHA),Gt&&(a=st.wh,i.useProgram(a.p),it(6,k.tM),ve(a),xe(a,pe,me),i.uniform1i(a.uNV,Gt),i.uniform1i(a.uNK,4),i.uniform1i(a.uNS,56),i.uniform1f(a.uPx,2*lt/D),i.uniform1f(a.uSc,ce),i.uniform1f(a.uT,O),i.drawArraysInstanced(i.TRIANGLES,0,36,Gt*2)),Ht&&(st.bl||k.prep("bl",k.blR||(k.blR=mt(Ve,Xe))),a=st.bl,i.useProgram(a.p),ve(a),xe(a,pe,me),i.uniform1i(a.uNP,Ht),i.uniform1f(a.uSc,ce),i.drawArraysInstanced(i.TRIANGLES,0,6,Ht*2)),i.disable(i.BLEND),i.flush(),a=st.fin,i.useProgram(a.p),it(4,He.t),i.uniform4f(a.uK,.9*(1+.25*Bt),ce,7,jo+.5*t),i.uniform4f(a.uSn,Vt[2],O,4,0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.viewport(0,0,D,D),i.drawArrays(i.TRIANGLES,0,3)};Mo(1/60),To(0);let oe=0;return(t,e)=>{for(k.blR||(k.blR=mt(Ve,Xe),i.flush()),e=Math.min(Math.max(e||0,0),.25),da(e),oe+=e;oe>1/60;)Mo(1/60),oe-=1/60,oe>.2&&(oe=.2);const a=va(e);To(a)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
