// Hurricane Eye: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/358.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(rt){rt&&function(){"use strict";const X=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Et=X+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",k=512,Q=`uint hu(uvec3 v) { v = v * 1664525u + 1013904223u; v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y; return v.x ^ v.y ^ v.z; }
`,gt=X+`uniform vec4 cb; out vec4 o;
`+Q+`
float hp(ivec2 c, int n, uint s) { ivec2 w = (c % n + n) % n; return float(hu(uvec3(uvec2(w), s)) >> 8) / 16777216.; }
float vnp(vec2 x, int n, uint s) { vec2 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); ivec2 c = ivec2(i);
  return mix(mix(hp(c, n, s), hp(c + ivec2(1, 0), n, s), f.x), mix(hp(c + ivec2(0, 1), n, s), hp(c + ivec2(1, 1), n, s), f.x), f.y); }
float fbm(vec2 uv, int n0, uint s) { float a = 0., w = .5, z = 0.; int n = n0; int K = int(cb.x);
  for (int i = 0; i < K; i++) { a += w * vnp(uv * float(n), n, s + uint(i) * 13u); z += w; n *= 2; w *= .5; } return a / z; }
vec2 vor(vec2 x, int n, uint s, float wj) {
  vec2 f = fract(x); ivec2 c = ivec2(floor(x)); float F1 = 1e9, F2 = 1e9; int K = int(cb.y);
  for (int k = 0; k < K; k++) {
    ivec2 of = ivec2(k % 3 - 1, k / 3 - 1); ivec2 cc = c + of;
    vec2 dd = vec2(of) + .5 + .9 * (vec2(hp(cc, n, s), hp(cc, n, s + 17u)) - .5) - f;
    float d = dot(dd, dd) - wj * hp(cc, n, s + 31u);
    if (d < F1) { F2 = F1; F1 = d; } else if (d < F2) { F2 = d; }
  }
  return vec2(F1, F2);
}
void main() {
  vec2 uv = gl_FragCoord.xy / ${k}.;
  vec2 w1 = vec2(0.); vec4 fo = vec4(0.);
  int K6 = int(cb.z) + 6;
  for (int i = 0; i < K6; i++) {
    int n0 = i == 2 ? 64 : i < 2 ? 4 : 4 << (i - 3);
    uint s = i < 2 ? uint(i + 1) : uint(10 * i);
    float v = fbm(uv, n0, s);
    if (i == 0) w1.x = v; else if (i == 1) w1.y = v; else if (i == 2) fo.x = v; else if (i == 3) fo.y = v; else if (i == 4) fo.z = v; else fo.w = v;
  }
  w1 -= .5;
  vec2 a = vec2(0.), b = vec2(0.);
  for (int i = 0; i < int(cb.w) + 2; i++) {
    bool f = i == 0; vec2 v = vor(uv * (f ? 10. : 32.) + w1 * (f ? 3.2 : 9.), f ? 10 : 32, f ? 7u : 9u, .25);
    if (i == 0) a = v; else b = v;
  }
  float dome = sqrt(max(0., 1. - 2.1 * max(a.x, 0.))) * smoothstep(0., .12, a.y - a.x);
  float lump = sqrt(max(0., 1. - 2.3 * max(b.x, 0.)));
  float R = clamp(.62 * dome + .3 * lump + .2 * fo.x - .06, 0., 1.);
  o = vec4(R, fo.yzw);
}`,Mt=X+`uniform sampler2D uT; uniform vec4 u[14]; out vec4 o;
`+Q+`
float rn(int j, uint k, uint sd) { return float(hu(uvec3(uint(j), sd, k)) >> 8) / 16777216.; }
vec4 rn4(int j, uvec4 z, uint sd) { uvec4 x = uvec4(uint(j)) * 1664525u + 1013904223u, y = uvec4(sd) * 1664525u + 1013904223u; z = z * 1664525u + 1013904223u;
  x += y * z; y += z * x; z += x * y; x ^= x >> 16u; y ^= y >> 16u; z ^= z >> 16u;
  x += y * z; y += z * x; z += x * y; return vec4((x ^ y ^ z) >> 8) / 16777216.; }
float ang(vec2 d) { float ax = abs(d.x), ay = abs(d.y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-9));
  a = ay > ax ? 1.5707963 - a : a; a = d.x < 0. ? 3.1415927 - a : a; return d.y < 0. ? -a : a; }
vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
vec4 tx2(vec2 X1, vec2 o1, vec2 X2, vec2 o2, float sc, float w) {
  vec4 a = texture(uT, X1 / sc + o1), b = texture(uT, X2 / sc + o2);
  return .5 + ((a - .5) * (1. - w) + (b - .5) * w) * inversesqrt((1. - w) * (1. - w) + w * w);
}
void main() {
  vec2 p = u[0].xy + gl_FragCoord.xy * u[0].z;
  float t = u[0].w, S = u[1].w, Rb = u[1].x, tanS = u[1].y, Htop = u[1].z;
  vec2 tilt = u[4].xy;
  float r = length(p);
  vec2 pm = p - .5 * tilt;
  float th = ang(pm);
  vec2 cs = vec2(cos(th), sin(th));
  float ps = S * .006 * t;
  float rag = textureLod(uT, cs * .41 + u[11].xy, 0.).g - .5;
  float Re = Rb * (1. + u[2].x * cos(2. * th - u[2].y - ps) + u[2].z * cos(3. * th - u[2].w - .7 * ps)
    + u[3].y * cos(u[3].x * (th - u[3].z - .8 * ps)) + u[3].w * rag * 2.5);
  // the stadium: a trumpet (steep at the foot, flaring outward with height into the canopy), tilted downshear, solved
  // for the height where it meets this column
  float z = 0.;
  for (int i = 0; i < 3; i++) { float y = 1. - max((length(p - tilt * clamp(z / Htop, 0., 1.)) - Re) * tanS / (1.25 * Htop), 0.);
    z = Htop * (1. - y * y * (y > 0. ? 1. : -3.)); }

  // the swirling wind, back-traced: two staggered ages so the shear winds cells into spirals but never past a bound
  float P = u[12].z, A0 = u[7].x, rate = u[7].y;
  float t1 = mod(t, P), t2 = mod(t + .5 * P, P);
  float wb = abs(1. - 2. * t1 / P);
  float Rm = Rb * 1.15 + 5.;
  float wr = pow(1. + pow(r / Rm, 4.), -.4);
  vec2 X1 = rot(p, -S * (A0 + rate * t1) * wr), X2 = rot(p, -S * (A0 + rate * t2) * wr);
  vec2 o1 = u[11].zw + floor(t / P) * vec2(.123, .457), o2 = u[11].zw + floor(t / P + .5) * vec2(.291, .173) + .5;
  vec4 A = tx2(X1, o1, X2, o2, u[12].x, wb);
  vec4 B = tx2(X1, o1 + .31, X2, o2 + .31, u[12].y, wb);
  vec4 M = tx2(X1, o1 + .67, X2, o2 + .67, 230., wb);

  // outflow cirrus streaks, sampled along log spirals (whole tile periods around the circle)
  float lr = log(max(r, 1.) / Rb);
  float fpx = u[0].z * ${k}. / max(r, 1.);
  float lq = max(lr, 0.);
  float str = textureLod(uT, vec2((th / 6.2831853 + S * .012 * lq * lq - S * .0012 * t) * 12., lr * .16) + u[11].yx, max(0., 1. + log2(fpx * 1.95))).a;
  float fib = textureLod(uT, vec2((th / 6.2831853 + S * .012 * lq * lq - S * .0012 * t) * 36., lr * .07) + u[11].xw, max(0., log2(fpx * 5.9))).a;

  // spiral rain bands: logarithmic spirals of convective cells, stronger on one side
  float as = dot(cs, u[5].xy);
  float psi = th + S * u[6].y * lr + u[6].z + S * .004 * t;
  float bw = .5 + .5 * cos(u[6].x * psi + 5.5 * (M.g - .5));
  float band = bw * bw;
  float bAmp = u[5].w * (.5 + .5 * as) * smoothstep(1.6 * Rb, 3.6 * Rb, r) * (1. - smoothstep(.5, 1., r / u[6].w));
  float bx = .95 * band * bAmp + 1.5 * (A.b - .5) + .8 * (A.a - .5) + .25 * (M.b - .5) + .1;
  float bc = smoothstep(.5, .76, bx), bk = smoothstep(.5, 1.2, bx);
  float hb = mix(1.8, 4.2 + 4.5 * smoothstep(.1, .85, band * bAmp) + 1.6 * (A.a - .5) + .8 * (B.b - .5) + .8 * (A.b - .5) + 1.2 * (B.r - .5) + .8 * (A.r - .5), bk);

  // the central dense overcast: a smooth canopy sloping down outward, bumpy over the eyewall turrets
  float Rc = u[4].w * (1. + u[5].z * .4 * as + .2 * (M.g - .5));
  // the shield's edge: cirrus thinning outward, cut back into slots between the bands where they leave it
  float cdo = 1. - smoothstep(.5, 1.4, r / Rc + (.16 - .08 * step(u[5].w, .01)) * (.35 + 1.3 * M.b) * (str - .5) + .08 * (fib - .5)
    + .8 * min(u[5].w, 1.) * (.6 + .4 * as) * (.45 - bw) * smoothstep(.5, .85, r / Rc));
  float edge = smoothstep(.3 * Rc, .95 * Rc, r);
  // the canopy is the outflow, 15 km up: it is not wound by the low-level wind (A and B are not used here). Its relief:
  // cauliflower domes 6 to 10 km across, crowded over the wall's ring (Dm, turning slowly with the core), fibres running
  // outward (str, fib), broad swells, the bands faint beneath, ripple arcs from the towers and across the fibres
  float Dm = textureLod(uT, rot(p, -S * .004 * t) / 80. + u[11].yx, max(0., log2(u[0].z * 6.4)) + 2.5).b;
  float rO = length(p - .9 * tilt) - Re - .94 * Htop / tanS;
  float ring = exp(-pow((rO - 9.) / (.4 * Rb + 12.), 2.)) * smoothstep(3., 7., rO);
  float hc = u[4].z - 3.4 * smoothstep(Rb, 1.3 * Rc, r) + .5 * as * u[5].z
    + (.4 + .8 * ring) * smoothstep(.45, .7, M.b + .5 * ring) * smoothstep(.42, .8, Dm) * smoothstep(1., 4., rO) + .7 * (M.g - .5) + .5 * (M.b - .5)
    + (.15 + .7 * edge) * smoothstep(1., 2.4, rO * tanS / Htop) * (str - .5) + .35 * (fib - .5) * smoothstep(.3 * Rc, .8 * Rc, r)
    + .45 * (bw - .5) * smoothstep(1.4 * Rb, .5 * Rc, r);
  hc += 2.5 * u[9].w * sin(r * .85 + 20. * (M.a - .5) + 2. * cos(2. * th + 6. * M.g)) * smoothstep(.62, .8, M.b) * smoothstep(.15, .4, r / Rc) * (1. - smoothstep(.6, .9, r / Rc));

  // overshooting tops: domes that rise and collapse, carried by the wind, ringing the canopy with gravity waves
  float tw = 0., gr = 0.;
  int nt = int(u[9].x); uint sd = uint(u[9].y); float ta = u[9].z;
  float rw0 = Rb + .75 * Htop / tanS, Rcs = u[4].w;
  for (int j = 0; j < nt; j++) {
    vec4 ra = rn4(j, uvec4(1u, 2u, 3u, 4u), sd), rb = rn4(j, uvec4(5u, 6u, 7u, 7u), sd);
    float inW = step(ra.x, .6);
    float rj = mix(mix(1.7 * rw0, 1.05 * Rcs, ra.y), rw0 + 5.6 + 12. * ra.y, inW);
    float per = 30. + 25. * ra.w;
    float lf = ra.z + t / per, cy = floor(lf); lf -= cy;
    float env = smoothstep(0., .3, lf) * (1. - smoothstep(.55, 1., lf));
    float aj = 6.2831853 * rb.x + 2.4 * cy + S * (A0 + rate * t) * pow(1. + pow(rj / Rm, 4.), -.4);
    vec2 d = p - .9 * tilt - rj * vec2(cos(aj), sin(aj));
    float d0 = length(d), dd = d0 * (1. + .7 * (B.g - .5) + .5 * (A.g - .5)), W = 3.5 + 3.5 * rb.y, am = ta * (.52 + .35 * rb.z) * env;
    float dm = max(0., 1. - dd * dd / (W * W));
    tw = max(tw, am * dm * sqrt(dm) * (.8 + .3 * B.r));
    gr += .15 * am * sin(1.05 * d0 - 2.2 * u[13].x + 5. * (B.g - .5)) * exp(-d0 / (2.5 * W + 6.)) * smoothstep(1.3 * W, 2.4 * W, d0) * smoothstep(-.4, .5, dot(d, p) / (d0 * r + .01));
  }
  hc += tw + gr;
  hb += .8 * tw + .4 * gr;

  float hHi = mix(hb, hc, max(cdo / max(cdo + bc * (1. - cdo), .25), smoothstep(.1, .5, cdo)));
  float tHi = 70. * cdo * cdo * mix(smoothstep(.25, .7, fib), 1., cdo) + (16. + 40. * bk) * bc * (1. - cdo);
  // thin cirrus spreading from the bands and the canopy edge
  float ci = u[13].z * smoothstep(.15, .9, .4 * str + .9 * band * bAmp + .3 * M.g - .25) * (1. - cdo) * (1. - bc) * smoothstep(.4, .75, str) * (1. - smoothstep(1., 1.7, r / Rc));
  hHi = mix(hHi, 10.5 + 1.5 * str, ci);
  tHi += 3.2 * ci * (.25 + 1.5 * str);

  // the wall: the stadium, smooth and tiered (a few soft level bands climbing round it in a slow spiral, broken here
  // and there), with broad wound lumps for buttresses, turning over into the canopy in a round shoulder. Nothing on it
  // runs straight down the slope.
  float zf = smoothstep(0., 4., z) * (1. - smoothstep(Htop - 2., Htop, z));
  float zw = z + zf * (.05 * (B.r - .5) + .9 * (A.b - .5) + .5 * (A.g - .5)
    + .2 * smoothstep(.2, .6, B.g + .4 * (M.g - .5)) * sin(1.9 * z + S * th + 6. * (M.g - .5)));
  // concentric eyewalls: the moat is a shallow, round, soft trough of lower cloud in the shield (a ring of shade)
  if (u[10].x > 0.) {
    float rr = length(pm);
    float r2v = u[10].x * (1. + .05 * as + .03 * cos(2. * th + 4. * M.g) + .12 * rag);
    float ri = Re + Htop / tanS, wm = .3 * (r2v - ri) + 3.;
    float inM = exp(-pow((rr - .5 * (ri + r2v)) / wm, 2.));
    hHi -= (2.2 + 1.4 * B.r + .6 * (A.b - .5)) * inM;
    tHi *= 1. - .4 * inM * smoothstep(.45, .75, B.r + .35 * (M.b - .5));
  }
  float hq = clamp(.5 + .5 * (zw - hHi) / 1.6, 0., 1.), hTop = mix(zw, hHi, hq) - 1.6 * hq * (1. - hq);

  // the eye floor: low cloud rotating with the eye, wound by a ring of mesovortices
  vec2 Y = rot(p, -S * (A0 + rate * t));
  float star = 0.;
  vec4 E = vec4(.5), Ef = vec4(.5);
  if (r < 2.2 * Rb) {
    int nm = int(u[8].x); float Rv = u[8].y * Rb, mph = u[8].z, ms = u[8].w;
    for (int j = 0; j < nm; j++) {
      vec2 re = rn4(j, uvec4(11u, 12u, 11u, 12u), sd).xy;
      float a = mph + 6.2831853 * (float(j) + .3 * (re.x - .5)) / float(nm);
      vec2 cj = Rv * (1. + .2 * (re.y - .5)) * vec2(cos(a), sin(a));
      vec2 d = Y - cj; float e = exp(-dot(d, d) / (.07 * Rb * Rb));
      Y = cj + rot(d, S * ms * (1.9 + .5 * sin(.023 * t + 2.4 * float(j))) * e);
      star += e;
    }
    E = textureLod(uT, Y / u[13].w + u[11].xy, max(0., log2(u[0].z * 51.2)) + 1.);
    Ef = textureLod(uT, Y / (2.6 * Rb + 8.) + u[11].zw, max(0., log2(u[0].z * 512. / (2.6 * Rb + 8.))) + 2.5);
  }
  // clumps a few km across (Ef.r) carry the floor's curls and commas; the fine domes (E.r) break their edges
  float ecov = smoothstep(u[7].z - .2, u[7].z + .3, .3 * Ef.r + .06 * E.r + .55 * Ef.b + .15 * Ef.g + .2 * min(star, 1.) * u[8].w / 3. - .1 * smoothstep(.75, .3, r / Rb) * step(u[7].w, 2.) + .25 * smoothstep(.7, 1., r / Re) - .1);
  float hE = u[7].w + .35 * E.r + .9 * ecov * (.3 + Ef.r);
  // low cumulus: streets of puffs of mixed size along the inflow, spiralling in with the storm, cleared in the moats
  // beside the bands and in whole sectors of sinking air. Cover stays a smooth quantity here (it rises over several
  // texels); the picture pass takes the edge from the filtered value, so no rim is stepped.
  float mo = bAmp * (1. - smoothstep(.05, .45, band));
  float sl = (.5 + .5 * cos(42. * (th + S * 2.4 * lr) + 11. * (A.g - .5) + 5. * (M.a - .5) + 4. * (B.g - .5))) * smoothstep(.25, .75, A.b + .6 * (B.b - .5));
  float sect = smoothstep(.43, .67, M.b + .45 * (A.a - .5) + .3 * band * bAmp - .5 * mo * smoothstep(1.05, 1.3, r / Rc));
  float pf = .8 * B.r + .3 * A.r * A.r + .1;
  float lcov = u[10].z * sect * smoothstep(.5, .92, pf * (.3 + .85 * sl) + .1 * sect);
  float k = smoothstep(1.1, 1.6, r / Re);
  float cL = mix(ecov, lcov, k);
  float hL = mix(hE * smoothstep(0., .25, cL), .2 + 2.6 * lcov * (.45 + B.r), k);
  float tL = cL * mix(u[13].y * (.55 + .9 * E.r), 34. * cL, k);

  // the wall's foot stands in the floor cloud: it rises out of the floor's top, so no gap or rim lies between them
  hTop += (1. - k) * hL * (1. - smoothstep(0., hL + 3., hTop));
  float tT = tHi * smoothstep(hL, hL + 3.2, hTop);
  float hT = mix(hL, max(hTop, hL), smoothstep(0., .6, tT));
  // a cirrus veil drawn across a weak eye
  float vl = u[10].w * smoothstep(.45, .8, M.g + .4 * (str - .5)) * (1. - smoothstep(Htop - 5., Htop - 1.5, hTop));
  hT = mix(hT, 12.8, min(1., 3. * vl) * (1. - smoothstep(.1, .6, tT)));
  tT += 3. * vl;
  float aL = tL > .05 ? tL : 0.;
  o = u[12].w > .5 ? vec4(hT / 18., min(tT, 80.) / 80., hL / 18., aL > 0. ? .5 + .5 * min(aL, 80.) / 80. : .5) : vec4(hT, tT, hL, aL);
}`,zt=X+`uniform sampler2D uH; uniform vec4 q[11]; out vec4 o;
`+Q+`
float enc;
vec4 H(vec2 uv) { vec4 v = textureLod(uH, uv, 0.); return enc > .5 ? vec4(v.r * 18., v.g * 80., v.b * 18., v.a > .5 ? (v.a - .5) * 160. : (v.a - .5) * 2.) : v; }
float Hr(vec2 uv) { return textureLod(uH, uv, 0.).r * (enc > .5 ? 18. : 1.); }
vec3 sunAt(float h, float sz, float aer) { return exp(-(vec3(.03, .055, .1) * exp(-h / 14.) + aer * vec3(.04, .055, .075) * exp(-h / 3.)) / (max(sz, 0.) + .025)); }
void main() {
  enc = q[7].w;
  vec2 uv = q[0].xy + gl_FragCoord.xy * q[0].z;
  // oblique view (a long lens from orbit): ground stretched along the screen's vertical, cloud tops shifted toward
  // the camera by their height (fixed-point parallax; the stadium walls are less steep than the line of sight)
  float tA = q[8].w, sec = sqrt(1. + tA * tA), hz = sec;
  if (tA > 0.) {
    hz = sec * (1. + .6 * (uv.y - q[8].y) * 1.32 * sec);
    uv.y = q[8].y + (uv.y - q[8].y) * sec;
    float hv = 0., kp = tA / q[8].z;
    int NP = int(q[6].y * .25 + 1.);
    for (int i = 0; i < NP; i++) { vec4 Cp = H(uv - vec2(0., hv * kp)); hv = Cp.g / (Cp.g + 6.5) > .4 ? Cp.r : Cp.b; }
    uv.y -= hv * kp;
  }
  vec4 C = H(uv);
  float e = q[6].z, kmT = q[0].w;
  vec2 g = vec2(Hr(uv + vec2(e, 0.)) - Hr(uv - vec2(e, 0.)), Hr(uv + vec2(0., e)) - Hr(uv - vec2(0., e)));
  vec3 sun = q[1].xyz; float tE = q[1].w;
  float tT = C.g, tL = max(C.a, 0.);
  vec3 n = normalize(vec3(-g * mix(1., q[9].x, smoothstep(45., 70., tT)), 3. * kmT));
  vec2 sd2 = normalize(sun.xy + 1e-6);
  // the sun's height drifts across a wide frame (the terminator's dusk lies on the down-sun side at last light)
  float szl = sun.z + q[9].y * dot(uv - q[8].xy, sd2);
  float Rt = tT / (tT + 6.5);
  float h0 = mix(C.b, C.r, max(smoothstep(.15, .5, Rt), 1. - smoothstep(.5, 1.5, C.r - C.b))) + .12;
  float dmax = clamp((17.6 - h0) / tE, 0., q[6].x);
  float tr = 1.;
  int N = int(q[6].y);
  float jt = float(hu(uvec3(uvec2(gl_FragCoord.xy), 7u)) >> 8) / 16777216.;
  // march toward the sun in true kilometres (fixed sample spacing: no per-pixel jitter, so shadow edges are lines, not stipple)
  vec2 sdir = sd2 / q[8].z;
  for (int i = 0; i < N; i++) {
    float f = (float(i) + .5) / float(N);
    float d = dmax * f * f + .15;
    vec4 Hs = H(uv + sdir * d);
    tr *= 1. - smoothstep(-.15, .45 + .08 * d * tE + .03 * d, Hs.r - h0 - d * tE) * (1. - exp(-.012 * Hs.g * Hs.g - .22 * max(Hs.a, 0.)));
  }
  float wr = .55;
  float flatI = (sun.z + wr) / (1. + wr);
  float cz = smoothstep(7., 13., C.r);
  float Ls = max(mix(1., max(0., dot(n, sun) + wr) / (1. + wr) / flatI, smoothstep(1.5, 16., tT + 2. * tL)), .45 * cz);
  vec3 L = q[2].rgb * q[2].w, amb = q[3].rgb;
  float aer = q[3].w;
  // light thrown back by sunlit walls on the far side (the stadium fills the eye with it)
  float hw = max(Hr(uv - sdir * 16.), Hr(uv - sdir * 40.));
  float bowl = smoothstep(3., 11., hw - h0), sk = mix(.12, .45, cz), trT = mix(tr, 1., (1. - smoothstep(.25, .65, Rt)) * smoothstep(7., 9., C.r));
  vec3 bnc = .15 * bowl * sunAt(9., szl, aer) * L;
  vec3 top = Rt * (sunAt(C.r, szl, aer) * L * Ls * (sk + (1. - sk) * trT) + amb * (.65 + .55 * n.z) + bnc);
  float Rl = tL / (tL + 6.5);
  vec3 sL = sunAt(6. + .5 * C.b, szl, aer) * L;
  vec3 low = Rl * (.88 * sL * mix(.15 + .85 * tr, .06 + .94 * tr, bowl) * mix(1., Ls, (1. - .5 * Rt) * (1. - smoothstep(.05, .5, C.r - C.b))) + amb * (.5 + .4 * n.z) + bnc);
  vec2 pk = (uv - q[8].xy) * q[8].z;
  vec3 v = normalize(vec3(-pk.x, -pk.y - tA * q[7].y, q[7].y));
  vec3 hv = normalize(v + sun);
  float gl = q[6].w * exp(-dot(hv.xy, hv.xy) / (hv.z * hv.z) / q[9].w);
  vec3 sea = q[9].z * vec3(.011, .032, .06) * (sL * (.25 + .75 * tr) + amb * .6 + bnc) + gl * sL * tr
    + bnc * mix(vec3(.4, .58, .88), vec3(1., 1.45, 2.2), 1. - smoothstep(1.2, 1.8, length(uv - q[10].xy) / q[10].z)) * (.65 + .35 * tr);
  vec3 col = top + (1. - Rt) * (1. - Rt) * (low + (1. - Rl) * (1. - Rl) * sea) / (1. - Rt * Rl * (1. - smoothstep(1., 3., C.r - C.b)));
  float hE = mix(C.b, C.r, Rt);
  vec3 tau = vec3(.05, .11, .24) * exp(-hE / 8.) * hz;
  col = col * exp(-tau) + vec3(.40, .62, 1.) * tau * .28 * L * mix(vec3(1.), sunAt(4., szl, aer), .6);
  vec2 f1 = (uv - q[4].xy) / q[4].z, f2 = (uv - q[5].xy) / q[5].z;
  col += vec3(.78, .82, 1.) * (q[4].w * exp(-dot(f1, f1)) + q[5].w * exp(-dot(f2, f2))) * (.25 + Rt);
  col = mix(col, vec3(dot(col, vec3(.3, .5, .2))) * vec3(.8, .9, 1.15), q[7].z * .55);
  vec3 x = col * q[7].x;
  x = x * (2.51 * x + .03) / (x * (2.43 * x + .59) + .14);
  o = vec4(pow(clamp(x, 0., 1.), vec3(1. / 2.2)) + (jt - .5) / 255., 1.);
}`;function At(t,e){const a=e.map(i=>{const l=t.createProgram();for(const[o,p]of[[t.VERTEX_SHADER,Et],[t.FRAGMENT_SHADER,i]]){const f=t.createShader(o);t.shaderSource(f,p),t.compileShader(f),t.attachShader(l,f)}return t.linkProgram(l),l});return a.forEach(i=>{if(!t.getProgramParameter(i,t.LINK_STATUS)){const l=t.getAttachedShaders(i);throw new Error("358 link: "+t.getProgramInfoLog(i)+l.map(o=>t.getShaderInfoLog(o)).join(`
`))}}),a}function nt(t,e){const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a}function Y(t,e,a,i,l,o){t.useProgram(a),t.bindVertexArray(e.vao),t.bindFramebuffer(t.FRAMEBUFFER,i),t.viewport(0,0,l,o),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0)}function Lt(t){if(t.__c358)return t.__c358;const e={};e.flt=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),[e.pTile,e.pHF,e.pComp]=At(t,[gt,Mt,zt]),e.vao=t.createVertexArray(),e.uU=t.getUniformLocation(e.pHF,"u"),e.uUT=t.getUniformLocation(e.pHF,"uT"),e.uQ=t.getUniformLocation(e.pComp,"q"),e.uQH=t.getUniformLocation(e.pComp,"uH");const a=t.createTexture();t.bindTexture(t.TEXTURE_2D,a),t.texStorage2D(t.TEXTURE_2D,10,t.RGBA8,k,k),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const i=nt(t,a);return Y(t,e,e.pTile,i,k,k),t.uniform4f(t.getUniformLocation(e.pTile,"cb"),5,9,0,0),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,a),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(i),e.tile=a,e.tgt={},t.__c358=e,e}function Ht(t,e,a){let i=e.tgt[a];if(!i){const l=t.createTexture();t.bindTexture(t.TEXTURE_2D,l),t.texStorage2D(t.TEXTURE_2D,1,e.flt?t.RGBA16F:t.RGBA8,a,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),i=e.tgt[a]={t:l,f:nt(t,l)}}return i}function j(t){let e=t|0;return()=>{e=e+1831565813|0;let a=Math.imul(e^e>>>15,1|e);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}}function L(t,e){let a=t()*e.reduce((i,l)=>i+l.w,0);for(const i of e)if(a-=i.w,a<=0)return i;return e[e.length-1]}const $=Math.PI/180;function _t(t,e,a){const i=[.03,.055,.1],l=[.04,.055,.075],o=1/(Math.max(e,0)+.025);return i.map((p,f)=>Math.exp(-(p*Math.exp(-t/14)+a*l[f]*Math.exp(-t/3))*o))}rt.add({num:358,name:"Hurricane Eye",fam:"Worlds",recipe:"A satellite looking straight down into the eye of a hurricane, with the stadium of cloud around the eye and the spiral bands all lit and shadowed by the sun. How strong it is and the kind of eye change every mint. Drag to pan across the storm, tap to run it on to the next pass, or hold to bring the sun down so the shadows stretch.",interactive:"Drag to pan across the storm, tap to run the storm forward to the next satellite pass, hold to lower the sun",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,a=Lt(e),i=t.hash,l=parseInt(i.slice(2,10),16)^Math.imul(parseInt(i.slice(10,18),16),7)^parseInt(i.slice(50,58),16),o=j(l),p=!!t.home,f=p?{n:"Category 5",k:5}:L(o,[{n:"Category 5",k:5,w:30},{n:"Category 4",k:4,w:22},{n:"Category 3, ragged eye",k:3,w:20},{n:"Double eyewall",k:2,w:13},{n:"Annular",k:1,w:12},{n:"Category 5, pinhole eye",k:6,w:9}]),M=p?{n:"Late afternoon",el:24}:L(o,[{n:"Late afternoon",el:22,w:38},{n:"Mid afternoon",el:40,w:20},{n:"High noon",el:81,w:12},{n:"Last light",el:7,w:16},{n:"Moonlit night",el:34,w:10}]),it=p?{n:"Northern",s:1}:L(o,[{n:"Northern",s:1,w:68},{n:"Southern",s:-1,w:32}]),F=p?{n:"Inner core",W:230}:L(o,[{n:"Inner core",W:230,w:40},{n:"Eye close",W:135,w:28},{n:"Whole storm",W:560,w:30}]),E=p?{n:"Mesovortices",m:2}:L(o,[{n:"Low cloud swirls",m:1,w:48},{n:"Mesovortices",m:2,w:18},{n:"Clear to the sea",m:0,w:34}]),I=p?{n:"Moderate",a:.5,tl:5}:L(o,[{n:"Light",a:.2,tl:2,w:45},{n:"Moderate",a:.5,tl:5,w:40},{n:"Strong",a:.85,tl:9,w:15}]),N=p?{n:"Many",nt:11,am:2.3,gw:.1}:L(o,[{n:"Few",nt:5,am:1.9,gw:.06,w:40},{n:"Many",nt:11,am:2.3,gw:.1,w:45},{n:"Erupting",nt:16,am:3,gw:.16,w:15}]),B=E.m===0&&M.n==="Last light"&&F.n==="Eye close"&&f.k!==3&&f.k!==6,kt=f.k===3?"Cloud-filled":f.k===6&&M.el<60?"Deep in shadow":B?"Low cloud swirls":E.n;t.trait("Intensity",f.n),t.trait("Light",M.n),t.trait("Hemisphere",it.n),t.trait("Scale",F.n),t.trait("Eye floor",kt),t.trait("Shear",I.n),t.trait("Hot towers",N.n);const ct=j(l^56142622),S=!p&&ct()<.3,J=S?Math.tan((38+10*ct())*$):0,St=Math.sqrt(1+J*J);t.trait("View",S?"Oblique, from orbit":"Straight down");const W=it.s,Z=M.n==="Moonlit night",s={Rb:13,tanS:.85,Htop:16.2,Hcan:15.2,e2:.08,e3:.03,rag:.025,Rc:110,bs:1,veil:0,eyeThr:.5,eyeH:1,eyeTau:24,r2:0,low:.8,cir:1};f.k===5?Object.assign(s,{Rb:11+5*o(),e2:.05+.06*o(),e3:.02+.03*o(),Rc:150+80*o()}):f.k===4?Object.assign(s,{Rb:15+6*o(),tanS:.8,Htop:15.8,Hcan:14.8,e2:.08+.08*o(),e3:.04,rag:.035,Rc:150+80*o(),bs:1.1}):f.k===3?Object.assign(s,{Rb:18+7*o(),tanS:.62,Htop:15,Hcan:14,e2:.14+.08*o(),e3:.06,rag:.07,Rc:130+70*o(),bs:1.25,veil:.7,eyeThr:.22,eyeH:3.5,eyeTau:30}):f.k===6?Object.assign(s,{Rb:4.5+1.5*o(),tanS:1.05,Htop:16.4,Hcan:15.6,e2:.03,e3:.01,rag:.01,Rc:120+50*o()}):f.k===2?Object.assign(s,{Rb:8+3*o(),tanS:.95,Htop:16,Hcan:15,e2:.04,Rc:150+80*o(),bs:.9}):Object.assign(s,{Rb:18+4*o(),tanS:.9,Htop:16,Hcan:15.4,e2:.04+.03*o(),rag:.005,Rc:120+50*o(),bs:0,low:1,cir:.35}),f.k===2&&(s.r2=s.Rb*3+13+6*o()),E.m===0&&f.k!==3&&!B&&(s.eyeThr=.74);const lt=E.m===2?5+(o()<.5?1:0):E.m===1?3+(o()<.5?1:0):B?3+(l&1):2,qt=E.m===2?1.9:E.m===1||B?1.1:.7,Ft=E.m===2?lt:4+Math.floor(o()*3),Ct=E.m===2?.045:.015+.01*o(),tt=o()<.6?2:3,ht=3+1.4*o(),x=F.W,ut=o()<.5?1:-1,Pt=.5-ut*(F.W>400?.1:F.W<200?.15:.17),Dt=.38+.24*o(),ft=[(Pt-.5)*x,(.5-Dt)*x];let et=Math.atan2((o()-.5)*1.2,ut)+(o()-.5)*.5;const mt=[Math.cos(et),Math.sin(et)],vt=et+(o()-.5)*.8,pt=[Math.cos(vt)*I.tl,Math.sin(vt)*I.tl];let O;M.n==="High noon"?O=(S&&W>0?270:90)+(o()-.5)*30:Z?O=S?o()*360:20+o()*140:O=(W>0?S?205:25:155)+(o()-.5)*22;const dt=M.el+(p?0:(o()-.5)*6),xt=M.n==="Last light"?1.2:.6,g={"Late afternoon":{lc:[.95,.9,.815],amb:[.14,.19,.31],ex:.34,gl:.22,ro:.09,sea:2.3,dk:1},"Mid afternoon":{lc:[1,.98,.95],amb:[.15,.23,.37],ex:.31,gl:.35,ro:.02,sea:1.6,dk:1},"High noon":{lc:[1,.99,.96],amb:[.17,.23,.34],ex:.29,gl:.7,ro:.004,sea:1.45,dk:1},"Last light":{lc:[.9,.72,.54],amb:[.085,.105,.18],ex:.46,gl:.4,ro:.05,sea:.75,dk:2.6},"Moonlit night":{lc:[.5,.62,.86],amb:[.012,.018,.034],ex:.285,gl:.5,ro:.03,sea:.5,dk:1}}[M.n],Ut=[o(),o(),o(),o()],Xt=Math.floor(o()*1e6),jt=o()*6.283,C=t.size>=600?1024:512,h=new Float32Array(56),w=new Float32Array(44);let G=0,K=0,H=0,b=[-ft[0],-ft[1]];const It=j(l^Math.imul(1,2654435761)),z=[];for(let c=0;c<10;c++)z.push(It());const q=(c,m)=>Math.sin(c*(1.3+.37*m)+6.283*z[m])-Math.sin(6.283*z[m]);function wt(c){h.set([s.Rb*(1+.05*q(c,0)),s.tanS,s.Htop,W],4),h.set([s.e2*(1+.35*q(c,1)),z[2]*6.283+.9*c,s.e3,z[3]*6.283-.6*c],8),h.set([Ft,Ct*(1+.3*q(c,4)),z[5]*6.283+.5*c,s.rag],12),h.set([pt[0],pt[1],s.Hcan,s.Rc],16),h.set([mt[0],mt[1],I.a,s.bs],20),h.set([tt,ht,jt+c*.7,650],24),h.set([1.4,.035,s.eyeThr,s.eyeH],28),h.set([lt,.6+.08*(z[6]-.5)+.03*q(c,6),z[7]*6.283+1.1*c,qt*(1+.25*q(c,8))],32),h.set([N.nt,Xt,N.am,N.gw],36),h.set([s.r2*(1+.05*q(c,9)),4,s.low,s.veil],40),h.set(Ut,44),h.set([Math.max(55,x*.27),Math.min(x/13,24),48,a.flt?0:1],48),h.set([0,s.eyeTau,s.cir,10],52)}wt(0);const d=j(l^5369127),P=[];let bt=.6+d()*1.2;function Nt(c){let m,n,r;if(d()<.4){r=s.Rb+8+10*d();const y=d()*6.283;m=r*Math.cos(y),n=r*Math.sin(y)}else{r=s.Rb*3+d()*200;const y=Math.log(r/s.Rb),T=2*Math.PI*Math.floor(d()*tt)/tt-W*ht*y-h[26]+(d()-.5)*.5;m=r*Math.cos(T),n=r*Math.sin(T)}P.push({x:m,y:n,r:5+7*d(),t0:c,st:[0,.07+.1*d(),.25+.2*d()],a:.6+.8*d()}),t.sound.hit("noise",.15+.2*d(),{cutoff:240,dur:1.6})}let R=0,V=0,D=dt,u=null;function yt(){const c=Math.max(1.5,D)*$,m=O*$,n=[Math.cos(c)*Math.cos(m),Math.cos(c)*Math.sin(m),Math.sin(c)],r=x*1.32*St,y=x*.13/Math.max(1e-6,Math.hypot(n[0],n[1])),T=[b[0]+n[0]*y,b[1]+n[1]*y],v=[T[0]-r/2,T[1]-r/2],_=r/C;h[0]=v[0],h[1]=v[1],h[2]=_,h[3]=V,h[52]=R;const Rt=Ht(e,a,C);Y(e,a,a.pHF,Rt.f,C,C),e.uniform4fv(a.uU,h),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.tile),e.uniform1i(a.uUT,0),e.drawArrays(e.TRIANGLES,0,3),e.flush();const ot=_t(14,n[2],xt),Bt=.3*ot[0]+.5*ot[1]+.2*ot[2],at=g.lc;w.set([(b[0]-x/2-v[0])/r,(b[1]-x/2-v[1])/r,x/t.size/r,_],0),w.set([n[0],n[1],n[2],Math.tan(c)],4),w.set([at[0],at[1],at[2],1/Bt],8),w.set([g.amb[0],g.amb[1],g.amb[2],xt],12);for(let U=0;U<2;U++){const A=P[U];if(!A){w.set([0,0,1,0],16+U*4);continue}const Wt=R-A.t0;let Tt=0;for(const Ot of A.st){const st=Wt-Ot;st>0&&(Tt+=Math.exp(-st/.09)*Math.min(1,st/.015))}w.set([(A.x-v[0])/r,(A.y-v[1])/r,A.r/r,Tt*A.a*(.6+.4*Math.min(1,.75*r/(A.r*40)))],16+U*4)}w.set([Math.min(r*.7,140),S?16:22,1.5/C,g.gl],24),w.set([g.ex,700,Z?.6:0,a.flt?0:1],28),w.set([(b[0]-v[0])/r,(b[1]-v[1])/r,r,J],32),w.set([1+Math.min(1,n[2]/.4),g.dk*r/6371*Math.cos(c),g.sea,g.ro],36),w.set([-v[0]/r,-v[1]/r,s.Rb/r,0],40),Y(e,a,a.pComp,null,t.size,t.size),e.uniform4fv(a.uQ,w),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,Rt.t),e.uniform1i(a.uQH,0),e.drawArrays(e.TRIANGLES,0,3)}return yt(),(c,m)=>{if(m=Math.min(Math.max(m||1/30,0),.1),R+=m,V+=m,H>0){const T=1-Math.exp(-m*3),v=H*T;H-=v,V+=v,K+=(G-K)*T,H<.02&&(V+=H,H=0,K=G),wt(K)}const n=t.input,r=n.taps();let y=!1;if(n.down)if(!u)u={t0:R,x:n.x,y:n.y,lx:n.x,ly:n.y,mv:0,hold:!1};else{const T=n.x-u.lx,v=n.y-u.ly;if(u.mv=Math.max(u.mv,Math.hypot(n.x-u.x,n.y-u.y)),u.mv>.025){b[0]-=T*x,b[1]+=v*x;const _=Math.max(x*.9,260);b[0]=Math.max(-_,Math.min(_,b[0])),b[1]=Math.max(-_,Math.min(_,b[1]))}else R-u.t0>.35&&(u.hold||(u.hold=!0,t.sound.note(45,{dur:3,vel:.08,wave:"triangle",cutoff:600})),D=Math.max(2,D-m*5.5));u.lx=n.x,u.ly=n.y}else u?(R-u.t0<.35&&u.mv<.025&&(y=!0),u=null):r.length&&(y=!0);if(y&&(G++,H+=30,t.sound.hit("noise",.3,{cutoff:520,dur:1.3}),t.sound.note(38+G%3*5,{dur:2.4,vel:.1,wave:"sine"})),u&&u.hold||(D+=(dt-D)*Math.min(1,m*.25)),Z)for(R>bt&&(Nt(R),bt=R+.5+d()*2.2);P.length&&R-P[0].t0>1.2;)P.shift();yt()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
