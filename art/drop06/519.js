// Waterspout: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/519.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fe){Fe&&function(){"use strict";const eo={yaw:0,pitch:0,x:0,y:0,z:0},ct=(e,a,d)=>e<a?a:e>d?d:e,xt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,ee=`
uniform vec4 uP[20];
uniform sampler2D uN2;
uniform sampler2D uM;
#define TIME uP[0].x
#define SUN uP[1].xyz
#define COT uP[1].w
#define HB uP[2].z
#define ENC uP[9].w
#define IZ int(uP[19].w)
#define RK 5.
float at2(vec2 v) {
  float ax = abs(v.x), ay = abs(v.y);
  float a = atan(min(ax, ay) / max(max(ax, ay), 1e-7));
  a = ay > ax ? 1.5707963 - a : a;
  a = v.x < 0. ? 3.1415927 - a : a;
  return v.y < 0. ? -a : a;
}
float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hg(float c, float g) { float g2 = g * g; return (1. - g2) / pow(max(1. + g2 - 2. * g * c, 1e-4), 1.5); }
vec4 mapAt(vec2 xz) {
  vec2 uv = (xz - uP[2].xy) / 64. + .5;
  vec4 m = textureLod(uM, uv, 0.);
  float e = 1. - smoothstep(.44, .5, max(abs(uv.x - .5), abs(uv.y - .5)));
  return vec4(m.rgb * e, mix(1., m.a, e));
}
float shAt(vec3 p) { return mapAt(p.xz + normalize(SUN.xz + vec2(1e-5, 0.)) * COT * max(HB - p.y, 0.)).a; }
vec3 skyCol(vec3 d) {
  vec3 L = SUN;
  float e = max(d.y, 0.);
  vec2 dh = normalize(d.xz + vec2(1e-6, 0.)), lh = normalize(L.xz + vec2(1e-6, 0.));
  float ca = dot(dh, lh) * .5 + .5;
  float cs = max(dot(d, L), 0.);
  vec3 hor = mix(uP[11].rgb, uP[10].rgb, ca * ca * ca);
  vec3 c = mix(hor, uP[9].rgb, pow(smoothstep(0., .95, e), .5));
  c += uP[8].rgb * (pow(cs, 40.) * .16 + pow(cs, 6.) * .05) * (.4 + .6 * exp(-e * 2.));
  return c;
}
`,bt=xt+"void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",oo=xt+ee+`
uniform sampler3D uN3;
out vec4 oC;
float n3(vec3 p) { return textureLod(uN3, p, 0.).r; }
// x cloud, y rain, z column top (km above base, 0 = clear)
vec3 dens(vec3 p, bool full) {
  float below = max(HB - p.y, 0.);
  // rain falls on the slant and its foot is dragged on by the outflow near the sea
  vec2 pm = p.xz + uP[17].xy * (below + .45 * smoothstep(.35, 0., p.y));
  if (full) pm += (textureLod(uN2, p.xz * .16 + p.y * .05, 0.).rb - .5) * .9;
  vec4 m = mapAt(pm);
  float top = m.r * 6.;
  float yb = HB - m.b * .2;
  float y = p.y - yb;
  float c = 0.;
  if (top > .01 && y > -.3 && y < top + .5) {
    float nL = n3(p * .23 + vec3(.0, .0, TIME * .0004));
    float nF = full ? n3(p * .95 + vec3(3.1, 1.7, TIME * .0015)) : .5;
    float nM = full ? n3(p * .47 + vec3(.6, 2.3, TIME * .0008)) : .5;
    float yp = max(y, 0.);
    float hgt = top * (.6 + .8 * nL);
    float side = hgt - y + (nM - .5) * (.3 + .4 * yp) + (nF - .5) * (.12 + .2 * yp);
    float bot = y + (nL - .5) * .09 + (nF - .5) * .05;
    c = smoothstep(0., .12, side) * smoothstep(-.02, .14, bot) * smoothstep(0., .08, top);
    if (y < .03) {
      float ns = full ? n3(vec3(p.x * 1.4 + TIME * .004, p.y * 3.5, p.z * 1.4)) : .4;
      float sc = (m.b * .9 + m.g * .5) * smoothstep(.52, .74, ns) * smoothstep(-.26, -.06, y + (ns - .5) * .1);
      c = max(c, sc);
    }
  }
  float r = 0.;
  if (m.g > .01 && y < .06) {
    // a soft curtain, darker at its core, not combed streaks
    float nr = n3(vec3(pm.x * 1.1, p.y * .3 - TIME * .03, pm.y * 1.1));
    float nr2 = n3(vec3(pm.x * .45 + .3, p.y * .05, pm.y * .45));
    r = m.g * (.25 + 1.2 * smoothstep(.3, .78, nr * .4 + nr2 * .6)) * smoothstep(.06, -.1, y) * (1. - .35 * smoothstep(.25, 0., p.y));
  }
  return vec3(c, r, top);
}
void main() {
  // one draw does both: the screen volume's half rows in the bottom uP[17].w rows, the 360 env above them
  // (so the two long marches run side by side instead of one after the other)
  bool env = gl_FragCoord.y > uP[17].w;
  vec2 fc;
  vec3 d;
  if (env) {
    fc = vec2(gl_FragCoord.x, gl_FragCoord.y - uP[17].w);
    if (fc.x > uP[19].x) discard;
    float az = (fc.x / uP[19].x - .5) * 6.2831853, v = fc.y / uP[19].y, y = v * v, cc = sqrt(max(1. - y * y, 0.));
    d = vec3(sin(az) * cc, y, cos(az) * cc);
  } else {
    if (gl_FragCoord.x > uP[4].w) discard;
    fc = vec2(gl_FragCoord.x, floor(gl_FragCoord.y) * 2. + uP[7].x + .5);
    vec2 uv = fc / uP[4].w;
    d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
    // the composite reads this target (bilinear) only where the view ray is at or above the horizon, so a row whose
    // texel 2.5 rows up still looks below it is never read: skip its march
    if (uP[4].y + ((uv.y + 2.5 / uP[4].w) * 2. - 1.) * uP[6].y * uP[3].w < 0.) { oC = vec4(skyCol(normalize(vec3(d.x, .0006, d.z))) * ENC, 1.); return; }
  }
  vec3 o = uP[3].xyz;
  vec3 dd = d; dd.y = max(dd.y, .0006); dd = normalize(dd);
  vec3 L = SUN;
  float cosT = dot(dd, L);
  float phC = .13 * min(hg(cosT, .62), 5.5) + .82 * hg(cosT, -.1);
  float phA = .3 * hg(cosT, .72) + .7;
  vec3 sunC = uP[8].rgb;
  float jit = fract(52.9829189 * fract(dot(fc, vec2(.06711056, .00583715))) + uP[7].z);
  vec3 haze = skyCol(normalize(vec3(dd.x, .02, dd.z)));
  float hz = uP[10].w;
  vec3 ambAir = uP[12].rgb * 1.6 + haze * .08;
  vec3 E = vec3(0.); float T = 1.;
  // A: the air under the deck, out to 40 km: rain shafts and sun shafts
  float tA = min((HB - .3 - o.y) / dd.y, 40.);
  const float NA = 18.;
  float shSum = 0.;
  for (int i = 0; i < 18; i++) {
    float f0 = (float(i) + jit) / NA, f1 = (float(i) + 1. + jit) / NA;
    float t0 = tA * pow(f0, 1.7), dt = tA * (pow(f1, 1.7) - pow(f0, 1.7));
    vec3 p = o + dd * t0;
    vec3 D = dens(p, true);
    float sh = shAt(p);
    float sig = hz + RK * D.y;
    vec3 Lc = (hz * (sunC * sh * phA * .1 + ambAir) + RK * D.y * vec3(.9, .92, .95) * (sunC * sh * phA * .06 + ambAir * 1.2 + uP[10].rgb * .12)) / sig;
    shSum += sh;
    float Tt = exp(-sig * dt);
    E += T * (1. - Tt) * Lc;
    T *= Tt;
  }
  // B: the deck itself, hazed by the shaded air under it
  haze = ambAir + sunC * phA * .1 * shSum / NA;
  if (tA < 39.9 && T > .02) {
    float t = tA, tEnd = min((HB + 6.4 - o.y) / dd.y, 70.);
    float dt = .1; bool inside = false;
    int NS = int(env ? uP[13].w : uP[7].w);
    t += (.07 + t * .006) * jit;
    vec3 fp = uP[15].xyz; float fI = uP[0].w;
    for (int i = 0; i < 140; i++) {
      if (i >= NS || t >= tEnd || T < .015) break;
      vec3 p = o + dd * t;
      vec3 D = vec3(0.); float od = 0.;
      for (int k = 0; k < 4; k++) {
        float off = k == 0 ? 0. : k == 1 ? .07 : k == 2 ? .28 : .8;
        vec3 G = dens(p + L * off, k < 2);
        if (k == 0) { D = G; if (G.x + G.y < .004 || !inside || 30. * G.x + RK * G.y <= .05) break; }
        else od += G.x * (k == 1 ? .07 : k == 2 ? .21 : .52);
      }
      float sig = 30. * D.x + RK * D.y;
      if (sig > .05 && !inside) { inside = true; t = max(t - (.07 + t * .006), tA); continue; }
      if (sig > .05) {
        dt = .035 + t * .004;
        float y = p.y - HB;
        float Ts = exp(-od * 30.);
        float ms = Ts * .8 + .12 * exp(-od * 5.);
        float shB = y < .05 ? shAt(p) : 1.;
        vec3 sunL = sunC * ms * shB;
        vec3 amb = mix(uP[12].rgb * (.55 + .9 * textureLod(uN2, p.xz * .31 + .2, 0.).g) * (.75 + .5 * textureLod(uN2, p.xz * .07, 0.).r), uP[13].rgb, smoothstep(-.02, 1.6, y));
        if (y < .4) amb += sunC * uP[12].w * shAt(vec3(p.x, 0., p.z)) * (1. - smoothstep(0., .4, y));
        amb += vec3(.75, .8, 1.) * fI / (1. + dot(p - fp, p - fp) * 1.6);
        vec3 Lc = ((sunL * phC + amb) * 30. * D.x + (sunL * phA * .06 + amb * 1.2 + uP[10].rgb * .12) * vec3(.9, .92, .95) * RK * D.y) / sig;
        float Tt = exp(-sig * dt);
        float fog = exp(-t * hz * .9);
        E += T * (1. - Tt) * mix(haze, Lc, fog);
        T *= Tt;
      } else {
        dt = inside ? .05 + t * .005 : D.z < .01 ? .3 + t * .02 : .09 + t * .008;
      }
      t += dt;
    }
  }
  vec4 r = vec4((E + T * skyCol(dd)) * ENC, T);
  bool bad = !(r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. && r.r < 6e4 && r.g < 6e4 && r.b < 6e4 && r.a <= 1.01);
  oC = bad ? vec4(skyCol(dd) * ENC, 1.) : r;
}
`,ao=xt+ee+`
uniform sampler2D uC;
uniform sampler2D uD;
out vec4 oC;
// the funnels and their spray along a ray (km), front to back, premultiplied. Each funnel is a solid of revolution
// round a curved axis (one bow from the foot up to the top): the ray's nearest pass to the axis is found at the height
// where it passes (a few fixed-point steps), so the tube foreshortens and is shaded by its true normal
vec4 spout1(int i, vec3 o, vec3 d, float tMax, vec3 bg, vec4 acc) {
  vec2 dh = d.xz; float l2 = max(dot(dh, dh), 1e-6), il = inversesqrt(l2);
  vec2 dn = dh * il, perp = vec2(-dn.y, dn.x);
  vec3 L = SUN;
  float cs = dot(d, L);
  vec2 sH = normalize(L.xz + vec2(1e-5, 0.));
  vec4 A = texelFetch(uD, ivec2(0, i), 0), B = texelFetch(uD, ivec2(1, i), 0), C = texelFetch(uD, ivec2(2, i), 0), D4 = texelFetch(uD, ivec2(3, i), 0);
  float rope = B.y, st = B.x;
  float t = dot((A.xy + A.zw) * .5 - o.xz, dh) / l2;
  vec2 cen = A.zw; float u = 0.;
  for (int k = 0; k < 3 + IZ; k++) {
    u = (o.y + d.y * t) / HB;
    float uc = clamp(u, 0., 1.);
    // one bow: the top hangs near upright under the cloud, the foot trails out downwind; a slow small turn of the
    // axis, and the contortion of roping out
    float g = mix(uc, uc * (2. - uc), .6);
    float wa = u * 5. + TIME * .12 + B.w;
    cen = mix(A.zw, A.xy, g) + (vec2(cos(B.w * 3.), sin(B.w * 3.)) * HB * .07 + vec2(cos(wa), sin(wa)) * B.z * .1 + vec2(sin(u * 7. + B.w + TIME * .15), cos(u * 5.3 + B.w)) * rope * .05) * sin(3.1416 * uc);
    t = dot(cen - o.xz, dh) / l2;
  }
  vec3 P = o + d * t;
  float dl = dot(P.xz - cen, perp);
  if (t > .02 && t < tMax && u > -.02 && u < 1.12) {
    float uc = clamp(u, 0., 1.);
    // a forming funnel is a short cone under the base with a round tip, lengthening down to the sea
    float tip = 1. - st * (.55 + .45 * st);
    float Rb = B.z * (.9 + .18 * uc) * (1. + D4.x * pow(uc, 1.5)) * (1. - .72 * rope);
    // the collar: the cloud itself drawn down into a smooth cone about three times the tube's width
    float cu = smoothstep(.6, 1.05, u);
    float R = Rb * (1. + 2.6 / (1. + D4.x * .6) * cu * cu * cu) * sqrt(clamp((u - tip) / .07, 0., 1.));
    float pw = uP[19].z * t;
    float Rm = max(R, pw * .7);
    if (D4.y > 0. && u < .42) {
      // a sheathed vortex: the spray climbs the lower third of the tube as a wider translucent outer wall
      float rs = Rb * (3.6 - 4. * u), qs = abs(dl) / rs;
      float nS = textureLod(uN2, vec2(dl / rs * .25 + B.w - TIME * .04, u * 1.6 - TIME * .08), 0.).g;
      float as = D4.y * (1. - exp(-1.3 * sqrt(max(1. - qs * qs, 0.)))) * smoothstep(.36, .1, u + (nS - .5) * .25) * (.45 + .8 * nS);
      vec3 cS = uP[12].rgb * 3.4 + uP[10].rgb * .16 + uP[8].rgb * shAt(P) * .13;
      acc.rgb += (1. - acc.a) * cS * as; acc.a += (1. - acc.a) * as;
    }
    float nE = rope > 0. ? textureLod(uN2, vec2(sign(dl) * .13 + B.w + TIME * .01, P.y * .7 - TIME * .01), 0.).r : .5;
    float rho = abs(dl) / Rm + (nE - .5) * .3 * rope;
    if (rho < 1. + pw / Rm && u > tip - .01) {
      float rc = min(rho, 1.);
      float ch = sqrt(1. - rc * rc);
      // the wall facing you (its true normal: the collar faces down)
      vec3 nr = normalize(vec3(perp * (dl / Rm) - dn * ch, 0.).xzy - vec3(0., .7 * cu, 0.));
      // path through a hollow condensation shell (inner radius .78): longest at the walls; dense, so the middle
      // still hides most of what is behind it
      float shell = ch - sqrt(max(.6 - rc * rc, 0.));
      float a = 1. - exp(-shell * (12. - 6. * rope) * (R / Rm));
      a *= smoothstep(1. + pw / Rm, 1. - pw / Rm, rho);
      // the tube thins out just above the water into its spray, and a roping funnel comes apart
      a *= (1. - smoothstep(.55, .95, rope) * smoothstep(.22, .02, abs(u - .42 - .15 * sin(B.w * 3.))));
      vec3 Pi = P - d * (ch * Rm * il);
      float sh = shAt(Pi);
      // light on the wall: the under-base grey from above, the gap's level light on the side toward the sun, the
      // sea's bounce from below, the sun itself on its sunward face; a thread of forward-scattered light on the limb
      float gp = dot(nr.xz, sH);
      vec3 lit = uP[12].rgb * (1.9 + .9 * nr.y) + uP[10].rgb * (.035 + .4 * pow(max(gp * .75 + .25, 0.), 2.) + .03 * (1. - nr.y)) + uP[8].rgb * sh * (.2 * max(dot(nr, L), 0.) + .01);
      lit += uP[8].rgb * sh * hg(cs, .8) * .03 * pow(rc, 4.) * smoothstep(-.3, .4, gp);
      // faint fine lines winding slowly up it, near the cloud only; a slow glassy sheen down its length
      float ang = rc * (1.5708 - .5708 * (1. - rc)) * sign(dl);
      float hel = ang * 2. + P.y / max(B.z, .002) * .5 - TIME * .25 + B.w * 5.;
      float n2 = textureLod(uN2, vec2(B.w * .3 + ang * .03, u * 1.3 - TIME * .006), 0.).r;
      // fine condensation streaks down its length
      float fs = textureLod(uN2, vec2(ang * .035 + B.w, u * .35 - TIME * .003), 0.).g;
      // denser and thinner reaches of condensation down its length; at the foot it thins out into its spray
      a *= (.8 + .2 * n2) * smoothstep(-.02, .2, u + (fs - .5) * .12);
      vec3 col = lit * uP[6].w * (.84 + .34 * n2) * (1. + (.08 * sin(hel) + .35 * (fs - .5)) * (.35 + .65 * smoothstep(.5, .85, u)));
      // a thick trunk is a dark barrel of cloud and spray
      col *= 1. - .45 * D4.z;
      // the collar is the base's own slate where they meet, its edge lost in the cloud; a young stub too
      col = mix(col, bg * (.86 + .14 * (1. - st)), clamp(smoothstep(.66, 1.0, u) + (1. - st) * 1.6, 0., 1.));
      a *= smoothstep(1., .995 - .6 * cu * cu, rho) * (1. - smoothstep(.96, 1.1, u));
      acc.rgb += (1. - acc.a) * col * a; acc.a += (1. - acc.a) * a;
    }
  }
  if (C.y > .001) {
    // the spray vortex: a low hollow bowl of spray round the foot, brightest at its rim, its top torn off downwind
    float tf = dot(A.zw - o.xz, dh) / l2;
    vec3 Q = o + d * tf;
    float yy = max(Q.y, 0.) / C.z;
    if (tf > .02 && tf < tMax + .1 && yy < 2.2) {
      float b = dot(Q.xz - A.zw, perp);
      float wpp = dot(uP[14].xy, perp);
      float nA = textureLod(uN2, vec2(b / C.w * .22 - TIME * .07 + B.w, yy * .3 - TIME * .05), 0.).g;
      float nB = textureLod(uN2, vec2(b / C.w * .45 + TIME * .06 + B.w * .7, yy * .5 - TIME * .16), 0.).g;
      float bx = (b - wpp * C.w * .8 * yy * yy) / C.w;
      float rw = .55 + .5 * min(yy, 1.2) + (nA - .5) * .3;
      float sw = sqrt(max(rw * rw - bx * bx, 0.)) - sqrt(max(rw * rw * .4 - bx * bx, 0.));
      float top = 1. + (nB - .5) * .9 + (nA - .5) * .5;
      float sd = sw * smoothstep(top, top - .45, yy) * (1.25 - .55 * min(yy, 1.)) * (.6 + .8 * nB);
      // the plume torn off downwind, and a low skirt of mist out over the water
      float px = (b - wpp * C.w * (.5 + 1.5 * yy)) / (C.w * (.45 + .35 * yy));
      sd += .5 * exp(-px * px) * smoothstep(.35, .8, yy) * smoothstep(2.1, .9, yy) * nA * (.5 + nB);
      sd += .35 * smoothstep(.25, 0., yy + (nB - .5) * .1) * smoothstep(2.6, 1., abs(bx));
      float a = 1. - exp(-sd * 5. * C.y);
      float shS = shAt(vec3(A.z, 0., A.w));
      float ph = .6 * hg(cs, .78) + .4;
      vec3 col = uP[12].rgb * 3.4 + uP[10].rgb * (.1 + .1 * yy) + uP[8].rgb * shS * min(ph, 1.8) * (.1 + .1 * (1. - a));
      col *= .8 + .35 * nA;
      acc.rgb += (1. - acc.a) * col * a; acc.a += (1. - acc.a) * a;
    }
  }
  return acc;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uP[5].w;
  vec3 d = normalize(uP[4].xyz + ((uv.x * 2. - 1.) * uP[5].xyz + (uv.y * 2. - 1.) * uP[6].xyz) * uP[3].w);
  // the base behind (the composite darkens it round each funnel's top the same way)
  vec3 bg = textureLod(uC, uv, 0.).rgb / ENC;
  vec4 s = vec4(0.);
  int NFs = min(int(uP[15].w), 4 + IZ);
  for (int i = 0; i < NFs; i++) s = spout1(i, uP[3].xyz, d, d.y < 0. ? uP[3].y / -d.y : 1e9, bg, s);
  oC = s;
}
`,ro=xt+ee+`
uniform sampler2D uC;
uniform sampler2D uE;
uniform sampler2D uW;
uniform sampler2D uD;
uniform sampler2D uSp;
out vec4 oC;
void main() {
  float S = uP[5].w;
  vec2 uv = gl_FragCoord.xy / S;
  vec3 FW = uP[4].xyz, RT = uP[5].xyz, UP = uP[6].xyz;
  float tanH = uP[3].w;
  vec3 d = normalize(FW + ((uv.x * 2. - 1.) * RT + (uv.y * 2. - 1.) * UP) * tanH);
  vec3 L = SUN;
  vec3 sunC = uP[8].rgb;
  vec3 eyeK = uP[3].xyz;
  vec3 col;
  bool sea = d.y < 0.;
  float tS = 0., F = 0.;
  vec3 Pk = vec3(0.), r = vec3(0., 1., 0.), refl = vec3(0.);
  float rB = 1.;
  if (!sea) {
    vec4 cs = texture(uC, uv);
    col = cs.rgb / ENC;
    // the base seen from beneath: a slow quilting of darker and lighter hollows on the flat ceiling
    float tb = (HB - eyeK.y) / max(d.y, .03);
    vec2 bxz = eyeK.xz + d.xz * tb;
    float qn = texture(uN2, bxz * .3 + vec2(TIME * .0015, 0.)).g * .65 + texture(uN2, bxz * .8 + .41).a * .35;
    col *= mix(1., .7 + .6 * qn, (1. - cs.a) * smoothstep(.03, .2, d.y));
    // the deck's sunlit far edge rolls off into cream instead of clipping to a white band
    float lm = dot(col, vec3(.3, .5, .2));
    col *= 2. / (2. + max(lm - 1.3, 0.));
    // each funnel hangs from a lowered, darker patch of the base
    int NL = min(int(uP[15].w), 4 + IZ);
    float low = 0.;
    for (int i = 0; i < NL; i++) {
      vec4 A = texelFetch(uD, ivec2(0, i), 0), B = texelFetch(uD, ivec2(1, i), 0);
      vec2 q = (bxz - A.xy) / (B.z * (2.5 + texelFetch(uD, ivec2(3, i), 0).x) * 4.);
      low = max(low, exp(-dot(q, q) * (.8 + .5 * qn)) * smoothstep(0., .4, B.x) * (1. - B.y));
    }
    col *= 1. - .24 * low * (1. - cs.a) * smoothstep(.02, .08, d.y);
    if (uP[18].y > .5 && d.y < .03) {
      // a far coast: a headland and islands as low blue shapes on the horizon
      float az = at2(d.xz) * .1591549;
      float hc = max(texture(uN2, vec2(az * 1.3 + uP[18].z, .21)).r - .5, 0.) * .07 + max(texture(uN2, vec2(az * 4.1 + uP[18].z, .63)).b - .66, 0.) * .035;
      col = mix(col, col * .6 + uP[11].rgb * .02, smoothstep(hc + .0005, hc - .0005, d.y) * step(.0003, hc));
    }
    float cd = dot(d, L);
    float cdF = dot(normalize(vec3(d.x, L.y + (d.y - L.y) * 1.25, d.z)), L);
    col += sunC * uP[2].w * (sunC * .16 * smoothstep(.99986, .99991, cdF) + .5 * pow(max(cd, 0.), 2500.) + .1 * pow(max(cd, 0.), 250.)) * cs.a;
  } else {
    float eyeM = eyeK.y * 1000.;
    tS = eyeM / -d.y;
    vec2 xz = eyeK.xz * 1000. + d.xz * tS;
    Pk = vec3(xz * .001, 0.);
    Pk = vec3(Pk.x, 0., Pk.y);
    vec2 wd = uP[14].xy, wp = vec2(-wd.y, wd.x);
    float pixA = uP[19].z;
    float fpm = tS * pixA / max(-d.y, .015);
    float gp = smoothstep(.36, .8, texture(uN2, (xz - wd * TIME * 2.6) * .0016).r * .65 + texture(uN2, (xz - wd * TIME * 3.4) * .0062 + .37).b * .35);
    vec4 mS = mapAt(Pk.xz);
    float glass = uP[11].w;
    float amp = uP[0].z * mix(.3 + .4 * glass, 1.25, gp) * (1. + .8 * mS.g);
    vec2 wq = vec2(dot(xz, wd), dot(xz, wp));
    vec4 w1 = texture(uW, wq / 8.7 - vec2(TIME * .14, TIME * .01));
    vec4 w2 = texture(uW, vec2(wq.x * .8 + wq.y * .6, -wq.x * .6 + wq.y * .8) / 3.1 + vec2(TIME * .23, TIME * .05));
    vec4 w3 = texture(uW, wq / 29. + vec2(-TIME * .045, .31));
    // near the eye, small sharp wavelets ride on the swell
    vec4 w4 = texture(uW, vec2(wq.x * .6 - wq.y * .8, wq.x * .8 + wq.y * .6) / 1.15 + vec2(TIME * .41, -TIME * .07));
    vec2 s = ((w1.rg - .5) * .85 + (w2.ba - .5) * .6 + (w3.rg - .5) * .55 + (w4.rg - .5) * .75 * exp(-tS / 90.)) * 2. * uP[14].z * amp * .8;
    vec2 sl = s.x * wd + s.y * wp;
    float sw = exp(-tS / 900.);
    vec2 K1 = vec2(.083, .1), K2 = vec2(-.05, .118);
    sl += (K1 * .16 * cos(dot(K1, xz) - TIME * .95) + K2 * .1 * cos(dot(K2, xz) - TIME * 1.1 + 1.3)) * sw;
    vec3 n = normalize(vec3(-sl.x, 1., -sl.y));
    float unres = clamp(log2(max(fpm / .04, 1.)) / 7., 0., 1.);
    float m0 = mix(.03, .012, glass) + .02 * mS.g;
    float mr = sqrt(m0 * m0 + unres * pow(uP[14].z * amp * .55, 2.));
    vec3 V = -d;
    r = reflect(d, n); r.y = abs(r.y) + .002; r = normalize(r);
    // two taps spread up and down the sky: the deck's edge reflects as a soft wavering line, not torn flakes
    float eAz = at2(vec2(r.z, r.x)) * .1591549 + .5, eDy = .015 + mr * .75;
    refl = (textureLod(uE, vec2(eAz, sqrt(clamp(r.y + eDy, 0., 1.))), 0.).rgb + textureLod(uE, vec2(eAz, sqrt(clamp(r.y - eDy, 0., 1.))), 0.).rgb) * .5 / ENC;
    float nv = max(dot(n, V), 0.);
    F = .02 + .98 * pow(1. - nv, 5.);
    float shS = shAt(Pk);
    vec3 H = normalize(L + V);
    float NH = max(dot(n, H), 1e-3), NH2 = NH * NH;
    float Dm = exp(-(1. - NH2) / (NH2 * mr * mr)) / (3.1416 * mr * mr * NH2 * NH2);
    float FH = .02 + .98 * pow(1. - max(dot(H, V), 0.), 5.);
    float spark = texture(uN2, xz * .43 + TIME * vec2(.031, .047)).a;
    spark = mix(.45 + 2.2 * pow(spark, 4.), .1 + 9. * pow(spark, 6.), smoothstep(.05, .5, unres));
    float sD = Dm * FH / (4. * max(nv, .06));
    vec3 spec = sunC * vec3(1., .86, .66) * shS * smoothstep(.02, .08, shS) * sD / (1. + sD * .7) * spark * step(0., L.y);
    vec3 lw = uP[12].rgb * 3. + uP[13].rgb * .3 + sunC * shS * max(L.y, 0.) * .5;
    vec3 body = uP[16].rgb * lw;
    if (uP[18].x > .5) {
      // shallows: sand and seagrass seen through clear green water
      float pat = texture(uN2, xz * .0021 + .17).r * .65 + texture(uN2, xz * .011).g * .35;
      vec3 flo = mix(vec3(.5, .47, .34), vec3(.08, .12, .06), smoothstep(.46, .56, pat));
      body = mix(body, flo * vec3(.16, .62, .56) * lw * 1.6, exp(-tS / 2500.) * .85);
    }
    // rain on the water: a grey stippled roughness
    float rn = mS.g * (.6 + .4 * hash12(floor(xz * 3.) + floor(TIME * 9.)));
    refl = mix(refl, refl * .7 + uP[12].rgb * 2. + uP[10].rgb * .08, clamp(rn * 1.2, 0., .8));
    col = F * refl + (1. - F) * body + spec;
    // whitecaps on a cold or windy sea, long foam lines down the wind on a wind-streaked one
    if (uP[16].w + uP[18].w > 0.) {
      // (far off, where a pixel spans many caps, the sea only greys by their share)
      float far = smoothstep(.4, 2., tS * pixA);
      float wc = mix(smoothstep(.58, .66, textureLod(uN2, wq * .0035 + vec2(TIME * .004, .3), 0.).a * .75 + w2.g * .25) * (.35 + gp), .14, far) * uP[16].w;
      float ln = mix(smoothstep(.53, .6, textureLod(uN2, vec2(wq.x * .00022, wq.y * .006), 0.).a), .16, far) * smoothstep(.3, .7, textureLod(uN2, wq * .0013 + .5, 0.).g) * uP[18].w;
      col = mix(col, max(col * 1.2, uP[12].rgb * 4. + uP[10].rgb * .22 + sunC * shS * .2), clamp(wc + ln * .6, 0., 1.) * .8);
    }
    // the water round each foot: a dark roughened disc a few spray-widths across, pale foam arms winding into it
    int NF = min(int(uP[15].w), 4 + IZ);
    for (int i = 0; i < NF; i++) {
      vec4 A = texelFetch(uD, ivec2(0, i), 0), B = texelFetch(uD, ivec2(1, i), 0), C = texelFetch(uD, ivec2(2, i), 0);
      vec2 q = Pk.xz - A.zw;
      float rr = length(q) / max(C.w * 3.2, .005);
      if (rr <= 1.6) {
      float live = smoothstep(.0, .35, B.x) * (1. - B.y);
      float arm = sin(at2(q) * 2. + log(rr + .03) * 5. - TIME * 1.1 + B.w * 7.);
      float spot = live * smoothstep(1.05, .35, rr);
      float foam = smoothstep(.55, .95, arm) * smoothstep(.12, .3, rr) * smoothstep(1.2, .5, rr) * (.4 + .6 * live) + exp(-pow((rr - .3) * 9., 2.)) * C.y * .8;
      foam *= .6 + .6 * textureLod(uN2, q * 2.3 + B.w, 0.).a;
      col = mix(col, uP[18].x > .5 ? col * 1.15 + uP[10].rgb * .01 : col * .3 + uP[12].rgb * .1, spot * .8);
      col += (uP[12].rgb * 3. + uP[10].rgb * .12 + sunC * shS * .2) * foam * .7;
      }
    }
    // the funnels' image breaks on the wave rows and is lost a few rows below the horizon (on glass it holds)
    rB = mix(smoothstep(.42, .62, w2.r * .6 + w1.g * .4) * exp(-max(-d.y - .006, 0.) / .03), smoothstep(.3, .55, w3.g * .5 + w1.r * .5), glass);
    // haze: toward the horizon sky above this point
    vec3 hd = normalize(vec3(d.x, .003, d.z));
    float hzz = dot(hd, FW);
    vec2 uvh = vec2(dot(hd, RT), dot(hd, UP)) / (hzz * tanH) * .5 + .5;
    vec3 hzC = (hzz > .05 && uvh.x > 0. && uvh.x < 1. && uvh.y > 0. && uvh.y < 1.) ? texture(uC, uvh).rgb / ENC : refl;
    col = mix(col, hzC * .85, 1. - exp(-tS / 6000.));
  }
  // the funnels in the water: their layer seen along the reflected ray (from the sea point that ray is the eye's own
  // mirrored ray, so the layer's pixel in that direction is the image), then the funnels themselves
  if (sea) {
    float zr = dot(r, FW);
    vec2 uvr = vec2(dot(r, RT), dot(r, UP)) / (max(zr, .05) * tanH) * .5 + .5;
    vec4 sr = zr > .05 && uvr.x > 0. && uvr.x < 1. && uvr.y > 0. && uvr.y < 1. ? textureLod(uSp, uvr, 0.) : vec4(0.);
    col += F * (sr.rgb - refl * sr.a) * exp(-tS / 6000.) * rB;
  }
  vec4 sp = texelFetch(uSp, ivec2(gl_FragCoord.xy), 0);
  col = col * (1. - sp.a) + sp.rgb;
  col = max(col, vec3(0.));
  // rain falling past you
  float rh = uP[14].w;
  if (rh > .01) {
    vec2 g = gl_FragCoord.xy / S;
    for (int k = 0; k < 2 + IZ; k++) {
      float fk = float(k);
      float cw = (3. + 2. * fk) / S;
      float cx = floor((g.x + g.y * (.06 + uP[17].x * .2)) / cw);
      float h = hash12(vec2(cx, fk * 7.1));
      float yy = fract(g.y * (1.2 + fk) + TIME * (2.2 + h + fk) + h * 9.);
      float x0 = fract((g.x + g.y * (.06 + uP[17].x * .2)) / cw) - .5;
      float st = smoothstep(.12, 0., yy) * smoothstep(.5, .1, abs(x0)) * step(.55, h);
      col += (uP[12].rgb * 2.5 + uP[10].rgb * .1) * st * rh * (.2 - .07 * fk);
    }
  }
  col += vec3(.7, .75, .9) * uP[0].w * .015;
  col *= uP[8].w;
  col = (col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14);
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  col += (hash12(gl_FragCoord.xy) - .5) / 255.;
  oC = vec4(col, 1.);
}
`,so=xt+`
uniform vec4 uP[20];
uniform sampler2D uS;
out vec4 oC;
void main() { oC = texelFetch(uS, ivec2(gl_FragCoord.xy) + ivec2(0, int(uP[17].w)), 0); }
`,no=xt+`
uniform vec4 uP[20];
uniform sampler2D uS;
out vec4 oC;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  if ((p.y & 1) != int(uP[7].x) && uP[7].y < .5) discard;
  float yy = (float(p.y) - uP[7].x) * .5;
  float H2 = uP[17].w;
  vec4 r = texture(uS, vec2((float(p.x) + .5) / max(uP[4].w, uP[19].x), clamp(yy + .5, .5, H2 - .5) / (H2 + uP[19].y)));
  oC = r.r >= 0. && r.g >= 0. && r.b >= 0. && r.a >= 0. ? r : vec4(0., 0., 0., 1.);
}
`;function co(e){const d=new Float32Array(262144);for(const[l,v]of[[4,.42],[8,.3],[16,.18],[32,.1]]){const z=new Float32Array(l*l*l);for(let y=0;y<z.length;y++)z[y]=e();const S=64/l,H=new Int32Array(64),w=new Int32Array(64),b=new Float32Array(64);for(let y=0;y<64;y++){const P=y/S,R=Math.floor(P),N=P-R;H[y]=R%l,w[y]=(R+1)%l,b[y]=N*N*(3-2*N)}const T=new Float32Array(l*l*64);for(let y=0;y<l;y++)for(let P=0;P<l;P++){const R=(y*l+P)*l,N=(y*l+P)*64;for(let E=0;E<64;E++){const q=z[R+H[E]];T[N+E]=q+(z[R+w[E]]-q)*b[E]}}for(let y=0;y<64;y++){const P=H[y]*l,R=w[y]*l,N=b[y];for(let E=0;E<64;E++){const q=H[E],O=w[E],Y=b[E],G=(P+q)*64,tt=(P+O)*64,A=(R+q)*64,F=(R+O)*64,j=(y*64+E)*64;for(let k=0;k<64;k++){const C=T[G+k]+(T[tt+k]-T[G+k])*Y,Z=T[A+k]+(T[F+k]-T[A+k])*Y;d[j+k]+=(C+(Z-C)*N)*v}}}}let f=1e9,M=-1e9;for(let l=0;l<d.length;l++){const v=d[l];v<f&&(f=v),v>M&&(M=v)}const n=new Uint8Array(d.length),U=255/(M-f);for(let l=0;l<d.length;l++)n[l]=(d[l]-f)*U;return n}function io(e){const d=new Uint8Array(262144),f=v=>{const z=new Float32Array(65536);for(const[w,b]of v){const T=new Float32Array(w*w);for(let P=0;P<T.length;P++)T[P]=e();const y=256/w;for(let P=0;P<256;P++){const R=P/y,N=Math.floor(R),E=R-N,q=E*E*(3-2*E),O=N%w,Y=(N+1)%w;for(let G=0;G<256;G++){const tt=G/y,A=Math.floor(tt),F=tt-A,j=F*F*(3-2*F),k=A%w,C=(A+1)%w,Z=T[O*w+k]+(T[O*w+C]-T[O*w+k])*j,Pt=T[Y*w+k]+(T[Y*w+C]-T[Y*w+k])*j;z[P*256+G]+=(Z+(Pt-Z)*q)*b}}}let S=1e9,H=-1e9;for(const w of z)w<S&&(S=w),w>H&&(H=w);for(let w=0;w<z.length;w++)z[w]=(z[w]-S)/(H-S);return z},M=f([[4,.45],[8,.28],[16,.17],[32,.1]]),n=f([[8,.5],[16,.3],[32,.2]]),U=f([[32,.45],[64,.35],[128,.2]]),l=f([[16,.5],[32,.3],[64,.2]]);for(let v=0;v<256*256;v++)d[v*4]=M[v]*255,d[v*4+1]=l[v]*255,d[v*4+2]=n[v]*255,d[v*4+3]=U[v]*255;return d}function ho(e){const d=new Uint8Array(65536),f=new Float32Array(128*128),M=new Float32Array(128*128),n=(U,l,v,z,S,H)=>{f.fill(0),M.fill(0);const w=new Float32Array(128),b=new Float32Array(128),T=new Float32Array(128),y=new Float32Array(128);for(let R=0;R<U;R++){let N,E,q;do{const A=l+(v-l)*Math.pow(e(),1.6),F=(e()-.5)*2*z*(e()<.15?2.2:1);N=Math.round(Math.cos(F)*A),E=Math.round(Math.sin(F)*A),q=Math.hypot(N,E)}while(q<1);const O=Math.pow(q,-S)*(.6+.8*e()),Y=e()*6.2832;for(let A=0;A<128;A++){const F=6.2832*N*A/128+Y,j=6.2832*E*A/128;w[A]=Math.cos(F),b[A]=Math.sin(F),T[A]=Math.cos(j),y[A]=Math.sin(j)}const G=-O*N,tt=-O*E;for(let A=0;A<128;A++){const F=T[A],j=y[A],k=A*128;for(let C=0;C<128;C++){const Z=b[C]*F+w[C]*j;f[k+C]+=G*Z,M[k+C]+=tt*Z}}}let P=0;for(let R=0;R<128*128;R++)P=Math.max(P,Math.abs(f[R]),Math.abs(M[R]));for(let R=0;R<128*128;R++)d[R*4+H]=ct(128+f[R]/P*127,0,255),d[R*4+H+1]=ct(128+M[R]/P*127,0,255)};return n(44,2,26,.55,.55,0),n(36,6,40,1.1,.5,2),d}function lo(e){if(e.__c519)return e.__c519;e.getExtension("KHR_parallel_shader_compile");const a=(b,T)=>{const y=e.createShader(b);return e.shaderSource(y,T),e.compileShader(y),y},d={cloud:[bt,oo],comp:[bt,ro],spout:[bt,ao],copy:[bt,no],ecopy:[bt,so]},f={};for(const b in d){const T=e.createProgram(),y=a(e.VERTEX_SHADER,d[b][0]),P=a(e.FRAGMENT_SHADER,d[b][1]);e.attachShader(T,y),e.attachShader(T,P),e.linkProgram(T),f[b]={p:T,v:y,f:P}}e.flush();let M=99538201;const n=()=>{M=M+1831565813|0;let b=Math.imul(M^M>>>15,1|M);return b=b+Math.imul(b^b>>>7,61|b)^b,((b^b>>>14)>>>0)/4294967296};e.pixelStorei(e.UNPACK_ALIGNMENT,1);const U=e.createTexture();e.bindTexture(e.TEXTURE_3D,U),e.texImage3D(e.TEXTURE_3D,0,e.R8,64,64,64,0,e.RED,e.UNSIGNED_BYTE,co(n)),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const b of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,b,e.REPEAT);const l=(b,T,y,P)=>{const R=e.createTexture();return e.bindTexture(e.TEXTURE_2D,R),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,b,T,0,e.RGBA,e.UNSIGNED_BYTE,y),P&&e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,P?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),R},v=l(256,256,io(n),!0),z=l(128,128,ho(n),!0);e.pixelStorei(e.UNPACK_ALIGNMENT,4);const S=e.createVertexArray(),H=!!(e.getExtension("EXT_color_buffer_float")||e.getExtension("EXT_color_buffer_half_float")),w=e.createTexture();return e.bindTexture(e.TEXTURE_2D,w),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,4,12,0,e.RGBA,e.FLOAT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.__c519={P:null,pend:f,n3:U,n2:v,wv:z,vEmpty:S,half:H,dTex:w}}function uo(e,a){if(a.P)return;const d=a.pend;for(const f in d){const{p:M,v:n,f:U}=d[f];if(!e.getProgramParameter(M,e.LINK_STATUS))throw new Error("519 "+f+": "+(e.getShaderInfoLog(n)||"")+(e.getShaderInfoLog(U)||"")+e.getProgramInfoLog(M));const l={};for(const v of["uP","uN2","uN3","uM","uC","uE","uW","uD","uS","uSp"])l[v]=e.getUniformLocation(M,v);d[f]={p:M,...l}}a.P=d}function fo(e,a,d){const f=e.createTexture();return e.bindTexture(e.TEXTURE_2D,f),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),{mapTex:f,rtC:It(e,a,d,d)}}function It(e,a,d,f){const M=e.createTexture();e.bindTexture(e.TEXTURE_2D,M),a.half?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,d,f,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,d,f,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,M,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:M,fb:n,w:d,h:f}}Fe.add({num:519,name:"Waterspout",fam:"Vistas",recipe:"A flat grey sea, usually in the late afternoon, under a dark line of cloud, with a pale waterspout bending down to a ring of spray and rain falling nearby. How many spouts there are, the light and the rain change every mint. Tap the cloud base or the sea under it and a funnel tends to form near there a bit later, drag to shift the wind so the spouts lean and break up, or hold to bring the squall closer with its rain hissing over the water.",interactive:"Tap the cloud base (or the sea under it) to feed the rotation there: a funnel tends to form near that spot a little later, in its own time, as they also do unasked. Drag to shift the surface wind: the spouts lean, drift and rope out. Hold to let the squall line come closer, its rain hissing across the water toward you.",music:!0,gl:!0,fps:30,seed:0,make(e){const a=e.gl,d=e.size,f=lo(a);let M=0;for(let t=2;t<66;t+=8)M=Math.imul(M^parseInt(e.hash.slice(t,t+8),16),2654435761)+2135587861|0;const n=()=>{M=M+1831565813|0;let t=Math.imul(M^M>>>15,1|M);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},U=t=>{let o=n(),r=0;for(const[s,c]of t)if(r+=c,o<r)return s;return t[t.length-1][0]},l=e.home;let v=1305;for(let t=2;t<66;t+=8)v=Math.imul(v^parseInt(e.hash.slice(t,t+8),16),2246822507)+461845907|0;const z=()=>{v=v+1831565813|0;let t=Math.imul(v^v>>>15,1|v);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let S=l?"Two, one forming":U([["One",.42],["Two, one forming",.44],["A family of three",.14]]);S==="One"&&z()<.35&&(S="One, roping out");const H=S==="One, roping out",w=l?"Gold gap under the deck":U([["Gold gap under the deck",.5],["Overcast",.2],["Sunset behind the funnel",.3]]),b=l?"Light chop":U([["Light chop",.62],["Glass",.38]]),T=l?"Shafts nearby":U([["Shafts nearby",.58],["Heavy squall curtain",.27],["Dry line",.15]]),y=l?"None":U([["None",.85],["Lightning in the line",.15]]),P=l?"None":U([["None",.88],["A far sail",.12]]),R=l?"Frigatebirds":U([["Frigatebirds",.66],["None",.34]]);let N=20883;for(let t=2;t<66;t+=8)N=Math.imul(N^parseInt(e.hash.slice(t,t+8),16),3266489909)+668265263|0;const E=()=>{N=N+1831565813|0;let t=Math.imul(N^N>>>15,1|N);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},q=t=>{let o=E(),r=0;for(const[s,c]of t)if(r+=c,o<r)return s;return t[t.length-1][0]},O=!l&&b!=="Glass"&&E()<.35;e.trait("Spouts",S),e.trait("Light",w),e.trait("Sea",O?"Wind-streaked":b),e.trait("Rain",T),e.trait("Lightning",y);const Y=(()=>{const t=z();return l||t<.58?"Under the deck":"Close to the spout"})();e.trait("View",Y);const G=l?"Slender":q([["Needle",.28],["Slender",.4],["Broad cone",.32]]),tt=l?"Leaning":q([["Upright",.35],["Leaning",.45],["Bowed far over",.2]]),A=l?"Mid":q([["Low and close",.3],["Mid",.4],["High and far",.3]]);e.trait("Funnel",G),e.trait("Lean",tt),e.trait("Cloud base",A);let F=20884;for(let t=2;t<66;t+=8)F=Math.imul(F^parseInt(e.hash.slice(t,t+8),16),668265263)+374761393|0;const j=()=>{F=F+1831565813|0;let t=Math.imul(F^F>>>15,1|F);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},k=t=>{let o=j(),r=0;for(const[s,c]of t)if(r+=c,o<r)return s;return t[t.length-1][0]},C=l?"Open sea":k([["Open sea",.55],["Turquoise shallows",.25],["Steel-grey cold sea",.12],["Off a far coast",.08]]),Z=!l&&j()<.22,Pt=l?"Ordinary":k([["Ordinary",.91],["Sheathed",.05],["Thick trunk",.04]]),po=j()*6.2832,ke=k([[1,.35],[0,.4],[2,.25]]);e.trait("Waters",C),e.trait("Vortex",Pt),Z&&e.trait("Light","High sun");const Le=C==="Turquoise shallows",oe=C.startsWith("Steel"),mo=C.startsWith("Off"),Ue=w.startsWith("Gold"),yt=w==="Overcast",J=w.startsWith("Sunset"),ae=b==="Glass",xo=O?1.9:1,re=S.startsWith("One")?1:S.startsWith("Two")?2:3,it=l?.62:(A==="Low and close"?.44:A==="Mid"?.56:.72)+n()*.1,et=(n()-.5)*.3,wt=et-(J?.03:.3+n()*.12),Rt=l?1.15:(A==="Low and close"?.75:A==="Mid"?1.05:1.7)+n()*.8;let ot=(J?2.6+n()*1.2:yt?24:l?15:13+n()*5)*Math.PI/180,ht=1/Math.tan(ot);const Q=[Math.sin(et),Math.cos(et)];let Bt=[Q[0]*Math.cos(ot),Math.sin(ot),Q[1]*Math.cos(ot)];const se=l?.6:.5+n()*.3,V=[Math.sin(et+se),Math.cos(et+se)],at=[-V[1],V[0]],yo=(J?2.6+n()*.6:it*ht+.3+n()*.25)*Math.cos(se),At=yt?13:2.6+n()*1.1,h=256,$=64,ft=$/h,W=new Float32Array(h*h),Xt=new Float32Array(h*h),ne=new Float32Array(h*h),Ht=(t,o,r,s,c,m,u=.55)=>{const i=n()*6.28,x=n()*6.28,g=n()*6.28,mt=.12+n()*.1,kt=.08+n()*.08,Qe=.05,go=mt*Math.cos(i),_o=mt*Math.sin(i),Do=kt*Math.cos(x),Fo=kt*Math.sin(x),ko=Qe*Math.cos(g),Lo=Qe*Math.sin(g),Re=(t/$+.5)*h,Ae=(o/$+.5)*h,Qt=r/ft,Uo=Math.max(0,Math.floor(Re-Qt)),So=Math.min(h-1,Math.ceil(Re+Qt)),Co=Math.max(0,Math.floor(Ae-Qt)),Io=Math.min(h-1,Math.ceil(Ae+Qt));for(let Jt=Co;Jt<=Io;Jt++)for(let $t=Uo;$t<=So;$t++){const ze=($t+.5-Re)*ft,Ne=(Jt+.5-Ae)*ft,ge=ze*ze+Ne*Ne;if(ge>=r*r*1.5)continue;const Je=Math.sqrt(ge)||1,Lt=ze/Je,Ut=Ne/Je,St=Lt*Lt-Ut*Ut,Ct=2*Lt*Ut,_e=St*Lt-Ct*Ut,De=Ct*Lt+St*Ut,Bo=_e*St-De*Ct,Xo=De*St+_e*Ct,$e=r*(1+Ct*go+St*_o+De*Do+_e*Fo+Xo*ko+Bo*Lo),te=ge/($e*$e);if(te>=1)continue;const Mt=Jt*h+$t,to=s*Math.pow(1-te,u);to>W[Mt]&&(W[Mt]=to),c&&(Xt[Mt]=Math.max(Xt[Mt],c*Math.pow(Math.max(0,1-Math.sqrt(te)/.7),1.4))),m&&(ne[Mt]=Math.max(ne[Mt],m*(1-te)))}},ce=(t,o)=>[V[0]*o+at[0]*t,V[1]*o+at[1]*t],ie=(t,o)=>{const r=Math.floor((t/$+.5)*h),s=Math.floor((o/$+.5)*h);return r<0||s<0||r>=h||s>=h?0:W[s*h+r]},zt=yo-At;Z&&(ot=(48+j()*14)*Math.PI/180,ht=1/Math.tan(ot),Bt=[Q[0]*Math.cos(ot),Math.sin(ot),Q[1]*Math.cos(ot)]);const vt=[];for(let t=-34;t<34;){const o=1.1+n()*1.2,r=yt?7:4;for(let s=0;s<r;s++){const c=r===1?0:s/(r-1),m=.9+n()*1.1,u=zt-At+m*.55+c*(2*At-m*1.1)+(n()-.5)*.5,i=1-Math.abs(c-.5)*2,x=yt?.7+n()*1.6:.9+n()*1.2+i*(1.2+n()*2.8),g=ce(t+(n()-.5)*o,u);Ht(g[0],g[1],m,x,0,n()<.25?.4*n():0)}t+=o}const he=J?et-.12:wt+.17,qt=T.startsWith("Heavy"),wo=T==="Dry line"?1:qt?4:2+Math.floor(n()*2);for(let t=0;t<wo;t++){const o=T==="Dry line"?he-1.3:(t===0?he+.34:he-.36-(t-1)*.22)+(n()-.5)*.12;let r=1.5;for(;r<14&&(ie(Math.sin(o)*r,Math.cos(o)*r)>.3||ie(Math.sin(o)*(r+.6),Math.cos(o)*(r+.6))>.3);)r+=.25;const s=T==="Dry line"?14:qt&&t===0?3.2:Math.max(2.5,r-1.4-n()*1.6),c=[Math.sin(o)*s,Math.cos(o)*s];Ht(c[0],c[1],(qt?1.6:1.1)+n()*.8,2.6+n()*2.2,qt?.9+n()*.1:.65+n()*.35,.8),vt.push(c)}for(let t=0;t<h;t++)for(let o=0;o<h;o++){const r=(o+.5)*ft-$/2,s=(t+.5)*ft-$/2,c=r*V[0]+s*V[1],m=At-1.1-Math.abs(c-zt);m>0&&(W[t*h+o]=Math.max(W[t*h+o],(yt?.55:.28)*Math.min(1,m/1.2)))}{const t=new Float32Array(h*h);for(let o=0;o<2;o++){for(let r=0;r<h;r++)for(let s=0;s<h;s++){const c=r*h+s;t[c]=(W[c]*2+W[r*h+Math.max(0,s-1)]+W[r*h+Math.min(h-1,s+1)])*.25}for(let r=0;r<h;r++)for(let s=0;s<h;s++){const c=r*h+s;W[c]=(t[c]*2+t[Math.max(0,r-1)*h+s]+t[Math.min(h-1,r+1)*h+s])*.25}}}for(let t=0;t<70;t++){const o=(n()-.5)*60,r=(n()-.5)*60,s=o*V[0]+r*V[1];if(Math.abs(s-zt)<At+1.2||Math.hypot(o,r)<6.5)continue;{const i=Math.atan2(o,r)-et;if(Math.abs(Math.atan2(Math.sin(i),Math.cos(i)))<.85)continue}if(J){const i=Math.atan2(o,r)-et;if(Math.abs(Math.atan2(Math.sin(i),Math.cos(i)))<.25)continue}const c=.5+n()*.6,m=c*(.6+n()*.8)*(n()<.25?1.5:1),u=3+Math.floor(n()*4);for(let i=0;i<u;i++){const x=n()*6.28,g=c*(i?.5+n()*.6:0);Ht(o+Math.cos(x)*g,r+Math.sin(x)*g,c*(i?.45+n()*.4:1),m*(i?.5+n()*.6:1),0,0,1.15)}}{const t=new Float32Array(h*h);for(let o=0;o<h;o++)for(let r=0;r<h;r++){const s=o*h+r;t[s]=(W[s]*2+W[o*h+Math.max(0,r-1)]+W[o*h+Math.min(h-1,r+1)])*.25}for(let o=0;o<h;o++)for(let r=0;r<h;r++){const s=o*h+r;W[s]=(t[s]*2+t[Math.max(0,o-1)*h+r]+t[Math.min(h-1,o+1)*h+r])*.25}}const Se=[],Ce=[];for(let t=0;t<16;t++)Se.push(5.4*Math.pow((t+.5)/16,1.8)),Ce.push(5.4*(Math.pow((t+1)/16,1.8)-Math.pow(t/16,1.8)));const vo=(t,o)=>{let r=0;for(let s=0;s<16;s++){const c=Se[s],m=t+Q[0]*c*ht,u=o+Q[1]*c*ht,i=ie(m,u);i>c-.1&&(r+=Math.min(1,(i-c+.1)*4)*Ce[s])}return Math.exp(-r/Math.sin(ot)*4.5)};if(!J){const t=it*ht+.25;Ht(Q[0]*t,Q[1]*t,1.15,2.4+n(),0,0)}const le=new Float32Array(h*h);for(let t=0;t<h;t++)for(let o=0;o<h;o++)le[t*h+o]=vo((o+.5)*ft-$/2,(t+.5)*ft-$/2);const Nt=new Uint8Array(h*h*4);for(let t=0;t<h;t++)for(let o=0;o<h;o++){const r=t*h+o;let s=0,c=0;for(let m=-1;m<=1;m++)for(let u=-1;u<=1;u++){const i=t+m,x=o+u;i>=0&&x>=0&&i<h&&x<h&&(s+=le[i*h+x],c++)}Nt[r*4]=ct(W[r]/6*255,0,255),Nt[r*4+1]=Xt[r]*255,Nt[r*4+2]=ne[r]*255,Nt[r*4+3]=s/c*255}const Tt=Math.min(328,d),ue=fo(a,f,Tt);a.bindTexture(a.TEXTURE_2D,ue.mapTex),a.texSubImage2D(a.TEXTURE_2D,0,0,0,h,h,a.RGBA,a.UNSIGNED_BYTE,Nt);const lt=[0,0],fe=(t,o,r)=>{const s=Math.floor(((o-lt[0])/$+.5)*h),c=Math.floor(((r-lt[1])/$+.5)*h);return s<0||c<0||s>=h||c>=h?0:t[c*h+s]};let Ie=vt.length?vt.reduce((t,o)=>Math.hypot(o[0],o[1])<Math.hypot(t[0],t[1])?o:t):ce(5,zt);const Gt=[-Ie[0]*1.05,-Ie[1]*1.05],Be=[at[0]*-.0022,at[1]*-.0022],_=[],Wt=(t,o)=>fe(W,t,o)>.35,Ot=(t,o)=>{for(let r=0;r<40;r++){const s=Math.sin(t)*o,c=Math.cos(t)*o;if(Wt(s,c))return[s,c];o*=.93}return[Math.sin(t)*o,Math.cos(t)*o]},Et=(t,o,r,s,c)=>{const m=.008+n()*.008;_.push({top:[t,o],foot:[t+(n()-.5)*.08,o+(n()-.5)*.08],st:r,rate:s,rope:0,ropeRate:0,R0:m,ph:n()*6.28,life:c,age:0,sprayH:.035+n()*.035,sprayR:.03+n()*.025,wob:.006+n()*.01,taper:.3})},Xe=(t,o)=>fe(le,t+Q[0]*it*ht,o+Q[1]*it*ht);let pe=null;if(Ue||Z)for(const t of[0,.05,.1])for(let o=Rt;o<Rt+.5&&!pe;o+=.05){const r=Math.sin(wt+t)*o,s=Math.cos(wt+t)*o;Wt(r,s)&&Xe(r,s)>.45&&Xe(r+Q[0]*.2,s+Q[1]*.2)>.45&&(pe=[r,s])}{const t=pe||Ot(wt,Rt);Et(t[0],t[1],1,0,200+n()*200),_[0].foot=[t[0]-.05-n()*.06,t[1]+(n()-.5)*.05];const o=_[0];o.R0=l?.0105:G==="Needle"?.006+E()*.002:G==="Slender"?.009+E()*.004:.016+E()*.008,o.sprayR=l?.055:.03+o.R0*2.4+E()*.015,o.sprayH=l?.06:.04+o.R0*1.5+E()*.02,o.taper=G==="Broad cone"?2.6:G==="Needle"?.15:.35,Pt==="Sheathed"&&(o.sheath=1,o.sprayR=Math.max(o.sprayR,o.R0*4.5)),Pt==="Thick trunk"&&(o.R0=it*.075,o.taper=.1,o.dark=1,o.sprayR=o.R0*4,o.sprayH=o.sprayR*.75);const r=E()*6.2832,s=tt==="Upright"?.02+E()*.03:tt==="Leaning"?.08+E()*.08:.2+E()*.12;l||(o.foot=[t[0]+Math.cos(r)*s,t[1]+Math.sin(r)*s])}if(re>=2){const t=Ot(et+.2+n()*.2,Rt*(1.1+n()*.3));Et(t[0],t[1],.4,1/110,300)}if(re>=3){const t=Ot(wt-.4-n()*.25,Rt*(1.3+n()*.5));Et(t[0],t[1],1,0,160+n()*100),_[_.length-1].R0*=.6,_[_.length-1].foot[0]+=.15}let jt=30+n()*20,Vt=null,rt=null;if(H){const t=_[0],o=Math.hypot(t.top[0],t.top[1])||1,r=z()<.5?-1:1,s=.16+z()*.12;t.foot=[t.top[0]+t.top[1]/o*s*r,t.top[1]-t.top[0]/o*s*r],t.rope=.36+z()*.1,t.ropeRate=1/(70+z()*30)}const st=[0,0];let de=null,He=.15;{const t=_[0].foot,o=t[0],r=t[1];if(Y==="Close to the spout"){const s=Math.hypot(o,r)||1,c=z()<.5?-1:1,m=.5+z()*.2,u=c*(.25+z()*.2),i=o/s,x=r/s,g=i*Math.cos(u)-x*Math.sin(u),mt=i*Math.sin(u)+x*Math.cos(u);st[0]=o-g*m,st[1]=r-mt*m,de=Math.atan2(o-st[0],r-st[1])+c*(.16+z()*.06),He=.3+z()*.04}}if(Y==="Close to the spout"&&(_[0].taper=Math.min(_[0].taper,1.3)),R==="Frigatebirds"){const t=3+Math.floor(n()*4);for(let o=0;o<t*9;o++)n()}P==="A far sail"&&(n(),n(),n());const I=Z?{sun:[3.6,3.45,3.1],zen:[.05,.16,.48],hs:[.62,.8,.98],ha:[.34,.5,.74],base:[.03,.036,.046],top:[.4,.46,.56],water:[.012,.085,.075],bounce:.05,haze:.04,exp:.9}:Ue?{sun:[4.4,2.65,1.1],zen:[.07,.17,.42],hs:[.92,.55,.22],ha:[.32,.42,.6],base:[.026,.034,.048],top:[.3,.37,.5],water:[.05,.09,.1],bounce:.022,haze:.05,exp:.95}:J?{sun:[4.2,1.9,.65],zen:[.05,.09,.22],hs:[1.9,.85,.34],ha:[.26,.26,.36],base:[.035,.03,.036],top:[.25,.22,.3],water:[.05,.07,.08],bounce:.06,haze:.028,exp:1.15}:{sun:[1.6,1.6,1.45],zen:[.2,.25,.25],hs:[.66,.74,.66],ha:[.52,.6,.57],base:[.048,.056,.054],top:[.33,.37,.36],water:[.045,.08,.068],bounce:0,haze:.04,exp:1};J&&ke===1&&Object.assign(I,{sun:[4,1.55,1.05],zen:[.05,.06,.19],hs:[1.5,.62,.58],ha:[.3,.24,.38],base:[.034,.027,.042],top:[.25,.2,.33]}),J&&ke===2&&Object.assign(I,{sun:[4.6,1.45,.38],zen:[.035,.045,.13],hs:[2.2,.62,.2],ha:[.3,.17,.19],base:[.042,.024,.024],top:[.27,.16,.16]}),Le&&(I.water=[.012,.1,.095]),oe&&(I.water=[.04,.055,.066],I.hs=I.hs.map((t,o)=>t*.55+[.5,.52,.55][o]*.45));let me=J?et-.12:wt+.17+(l?0:(n()-.5)*.1),To=He,qe=2.2;de!==null&&(me=de);const pt=Math.tan(33*Math.PI/180),p={eye:[st[0]*1e3,qe,st[1]*1e3],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},Ge=()=>{const t=e.view||eo,o=me+(t.yaw||0),r=ct(To+(t.pitch||0),-1.35,1.45);let s=t.x||0,c=t.z||0;const m=Math.hypot(s,c);m>30&&(s*=30/m,c*=30/m),p.eye=[st[0]*1e3+s,ct(qe+(t.y||0),.8,6),st[1]*1e3+c];const u=Math.cos(r);p.fw=[Math.sin(o)*u,Math.sin(r),Math.cos(o)*u],p.rt=[Math.cos(o),0,-Math.sin(o)];const i=p.fw,x=p.rt;p.up=[i[1]*x[2]-i[2]*x[1],i[2]*x[0]-i[0]*x[2],i[0]*x[1]-i[1]*x[0]]},Eo=(t,o)=>{const r=t*2-1,s=1-o*2,c=[0,1,2].map(u=>p.fw[u]+(r*p.rt[u]+s*p.up[u])*pt),m=Math.hypot(c[0],c[1],c[2]);return c.map(u=>u/m)},Ho=t=>{const o=[t[0]-p.eye[0],t[1]-p.eye[1],t[2]-p.eye[2]],r=o[0]*p.fw[0]+o[1]*p.fw[1]+o[2]*p.fw[2];return r<.5?null:[.5+(o[0]*p.rt[0]+o[1]*p.rt[1]+o[2]*p.rt[2])/(r*pt)*.5,.5+(o[0]*p.up[0]+o[1]*p.up[1]+o[2]*p.up[2])/(r*pt)*.5,r]},qo=(t,o)=>[(t[0]*p.rt[0]+t[1]*p.rt[1]+t[2]*p.rt[2])/(o*pt)*.5,(t[0]*p.up[0]+t[1]*p.up[1]+t[2]*p.up[2])/(o*pt)*.5],Kt=256,gt=64,xe=Tt>>1,We=Math.max(Tt,Kt),ye=ue.rtC,we=It(a,f,We,xe+gt),Oe=It(a,f,Kt,gt),je=It(a,f,d,d),Mo=f.half?1:.25,K=new Float32Array(20*4),ve=new Float32Array(4*12*4);let Ve=0,bo=0,nt=0,B=0,_t=0,dt=0,Yt=[0,-9,0],Ke=3.3+n()*.5;const X=[0,0],ut=[0,0];{const t=at[0]*.6+V[0]*.3,o=at[1]*.6+V[1]*.3,r=Math.hypot(t,o)||1;ut[0]=t/r,ut[1]=o/r}let D=null,Dt=null,Te=!1,Zt=0,Ee=0,Me=0;const Ft=[],L=(t,o,r,s,c)=>{K[t*4]=o,K[t*4+1]=r,K[t*4+2]=s,K[t*4+3]=c},Ye=()=>{const t=Math.hypot(X[0],X[1]),o=[at[0]*.6+V[0]*.3+X[0]*30,at[1]*.6+V[1]*.3+X[1]*30],r=Math.hypot(o[0],o[1])||1,s=(ae?.25:xo*(oe?1.5:1))*(1+B*1.4+t*4);L(0,nt,B,s,dt),L(1,Bt[0],Bt[1],Bt[2],ht),L(2,lt[0],lt[1],it,J?1:0),L(3,p.eye[0]*.001,p.eye[1]*.001,p.eye[2]*.001,pt),L(4,p.fw[0],p.fw[1],p.fw[2],Tt),L(5,p.rt[0],p.rt[1],p.rt[2],d),L(6,p.up[0],p.up[1],p.up[2],yt?2.3:1),L(7,0,0,0,d<=256?46:58),L(8,...I.sun,I.exp),L(9,...I.zen,Mo),L(10,...I.hs,I.haze*(1+B)),L(11,...I.ha,ae?1:0),L(12,...I.base,I.bounce),L(13,...I.top,40),L(14,o[0]/r,o[1]/r,.16,_t),L(15,...Yt,_.length),L(16,...I.water,oe?1:O?.4:0);{const c=at[0]*.6+V[0]*.3+X[0]*5,m=at[1]*.6+V[1]*.3+X[1]*5,u=Math.hypot(c,m)||1;ut[0]+=(c/u-ut[0])*.03,ut[1]+=(m/u-ut[1])*.03}L(17,ut[0]*(.25+.3*B),ut[1]*(.25+.3*B),0,xe),L(18,Le?1:0,mo?1:0,po,O?1:0),L(19,Kt,gt,2*pt/d,0),ve.fill(0),_.forEach((c,m)=>{if(m>3)return;const u=m*16;ve.set([c.top[0],c.top[1],c.foot[0],c.foot[1],c.st,c.rope,c.R0,c.ph,c.wob+c.rope*.06+Math.hypot(c.top[0]-c.foot[0],c.top[1]-c.foot[1])*.08,ct((c.st-.08)/.4,0,1)*(1-ct(c.rope*2.2,0,1)),Math.min(c.sprayH,c.sprayR*.75),c.sprayR,c.taper||.3,c.sheath||0,c.dark||0,0],u)})},be=t=>{a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,f.n2),a.uniform1i(t.uN2,0),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,ue.mapTex),a.uniform1i(t.uM,1)},Pe=t=>{K[7*4+2]=(bo++>>1)*.618034%1,K[7*4]=Ve,K[7*4+1]=dt>.02?1:0,a.disable(a.DEPTH_TEST),a.disable(a.BLEND),a.disable(a.CULL_FACE),a.bindVertexArray(f.vEmpty);const o=f.P.cloud;a.useProgram(o.p),be(o),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_3D,f.n3),a.uniform1i(o.uN3,2),a.uniform4fv(o.uP,K),a.bindFramebuffer(a.FRAMEBUFFER,we.fb),a.viewport(0,0,We,xe+gt),a.drawArrays(a.TRIANGLES,0,3),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,we.tex),a.bindFramebuffer(a.FRAMEBUFFER,Oe.fb),a.viewport(0,0,Kt,gt),a.useProgram(f.P.ecopy.p),a.uniform4fv(f.P.ecopy.uP,K),a.uniform1i(f.P.ecopy.uS,3),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,ye.fb),a.viewport(0,0,Tt,Tt),!t&&K[7*4+1]<.5&&(a.enable(a.BLEND),a.blendFunc(a.CONSTANT_ALPHA,a.ONE_MINUS_CONSTANT_ALPHA),a.blendColor(0,0,0,.5)),a.useProgram(f.P.copy.p),a.uniform4fv(f.P.copy.uP,K),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,we.tex),a.uniform1i(f.P.copy.uS,3),a.drawArrays(a.TRIANGLES,0,3),a.disable(a.BLEND),Ve^=1},Ze=()=>{a.bindTexture(a.TEXTURE_2D,f.dTex),a.texSubImage2D(a.TEXTURE_2D,0,0,0,4,12,a.RGBA,a.FLOAT,ve),a.flush(),a.disable(a.DEPTH_TEST),a.disable(a.BLEND),a.disable(a.CULL_FACE),a.bindVertexArray(f.vEmpty);const t=f.P.spout;a.bindFramebuffer(a.FRAMEBUFFER,je.fb),a.viewport(0,0,d,d),a.useProgram(t.p),a.uniform4fv(t.uP,K),be(t),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,ye.tex),a.uniform1i(t.uC,2),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,f.dTex),a.uniform1i(t.uD,5),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,d,d);const o=f.P.comp;a.useProgram(o.p),a.uniform4fv(o.uP,K),be(o),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,ye.tex),a.uniform1i(o.uC,2),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,Oe.tex),a.uniform1i(o.uE,3),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,f.wv),a.uniform1i(o.uW,4),a.activeTexture(a.TEXTURE5),a.bindTexture(a.TEXTURE_2D,f.dTex),a.uniform1i(o.uD,5),a.activeTexture(a.TEXTURE6),a.bindTexture(a.TEXTURE_2D,je.tex),a.uniform1i(o.uSp,6),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null)},Po=(t,o)=>{const r=Eo(t,o),s=p.eye.map(x=>x*.001);let c,m;if(r[1]>.004){const x=Math.min((it-s[1])/r[1],9);c=s[0]+r[0]*x,m=s[2]+r[2]*x}else if(r[1]<-4e-4){const x=Math.min(s[1]/-r[1],6);c=s[0]+r[0]*x,m=s[2]+r[2]*x}else{const x=Math.hypot(r[0],r[2]);c=s[0]+r[0]/x*4,m=s[2]+r[2]/x*4}let u=null;const i=Math.max(.3,Math.hypot(c-s[0],m-s[2]));for(let x=0;x<50&&!u;x++){const g=Math.pow(.95,x),mt=s[0]+(c-s[0])*g,kt=s[2]+(m-s[2])*g;if(i*g<.25)break;Wt(mt,kt)&&(u=[mt,kt])}if(!u){e.sound.hit("noise",.04,{cutoff:700,dur:.3});return}rt=rt&&Math.hypot(rt.p[0]-u[0],rt.p[1]-u[1])<.6?{p:u,n:rt.n+1}:{p:u,n:1},jt=Math.min(jt,nt+Math.max(3,16-rt.n*4)+n()*6),e.sound.hit("noise",.06,{cutoff:260,dur:1.2}),e.sound.note(38,{dur:1.6,vel:.12,wave:"sine"})},Ro=t=>{const o=e.input;if(o.down&&o.inside!==!1){D||(D={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,moved:0}),D.t+=t;const s=o.x-D.lx,c=o.y-D.ly;if(D.moved=Math.max(D.moved,Math.hypot(o.x-D.x0,o.y-D.y0)),D.moved>.025&&Math.hypot(s,c)>.001){const m=Math.hypot(p.fw[0],p.fw[2])||1,u=s*p.rt[0]-c*p.fw[0]/m,i=s*p.rt[2]-c*p.fw[2]/m;X[0]+=u*.16,X[1]+=i*.16;const x=Math.hypot(X[0],X[1]);x>.09&&(X[0]*=.09/x,X[1]*=.09/x),Zt<=.3&&e.sound.hit("noise",.05+Math.min(.12,Math.hypot(s,c)*2),{cutoff:500+2e3*Math.hypot(s,c),dur:.5})}D.moved<.025&&D.t>.35&&(B=Math.min(1,B+t*.15)),D.lx=o.x,D.ly=o.y}else D&&(Te=D.t>.3||D.moved>.025,D=null);const r=o.taps();r.length&&(Dt=r[r.length-1]),Dt&&!D&&(Te||Po(Dt.x,Dt.y),Dt=null,Te=!1)},Ao=t=>{const o=e.input.down&&D&&D.moved<.025&&D.t>.35,r=B;o||(B=Math.max(0,B-t*.008));const s=B-r;lt[0]+=Gt[0]*s,lt[1]+=Gt[1]*s;const c=Math.exp(-t/14);X[0]*=c,X[1]*=c;for(let u=_.length-1;u>=0;u--){const i=_[u];i.age+=t;for(const g of[i.top,i.foot])g[0]+=Gt[0]*s+Be[0]*t,g[1]+=Gt[1]*s+Be[1]*t;if(i.foot[0]+=X[0]*t,i.foot[1]+=X[1]*t,i.rope===0){const g=t/45;i.foot[0]+=(i.top[0]-i.foot[0])*g*.3,i.foot[1]+=(i.top[1]-i.foot[1])*g*.3}i.st=Math.min(1,i.st+i.rate*t),(Math.hypot(i.top[0]-i.foot[0],i.top[1]-i.foot[1])>it*.95||i.age>i.life||!Wt(i.top[0],i.top[1]))&&(i.ropeRate=Math.max(i.ropeRate,1/9)),i.ropeRate>0&&(i.rope=Math.min(1,i.rope+i.ropeRate*t)),i.rope>=1&&_.splice(u,1)}if(Vt&&_.length<4&&(Vt(),Vt=null),nt>jt){if(jt=nt+35+n()*40,rt){const u=[rt.p[0]+(n()-.5)*.15,rt.p[1]+(n()-.5)*.15];if(rt=null,_.length>=4){const i=_.reduce((x,g)=>g.age>x.age?g:x);i.ropeRate=Math.max(i.ropeRate,.2),Vt=()=>Et(u[0],u[1],0,1/(18+n()*12),120+n()*120)}else Et(u[0],u[1],0,1/(18+n()*12),120+n()*120)}else if(_.filter(u=>u.rope===0).length<Math.max(1,re-(nt>60?0:1))){const u=Ot(me+(n()-.5)*.9,1+n()*2.2);_.length<4&&Et(u[0],u[1],0,1/(25+n()*20),120+n()*120)}}const m=fe(Xt,p.eye[0]*.001,p.eye[2]*.001);if(_t+=(m-_t)*Math.min(1,t*1.5),y!=="None"&&nt>Ke){const u=vt.length?vt[Math.floor(n()*vt.length)]:ce(3,zt);Yt=[u[0]+lt[0]+(n()-.5),it+.6+n()*2.5,u[1]+lt[1]+(n()-.5)],dt=2.2+n()*2.5,Ke=nt+4+n()*10/(1+B);const i=Math.hypot(Yt[0],Yt[2]);Ft.push({at:nt+i*2.9,v:ct(1/(1+i/3),.1,1),dist:i})}dt*=Math.exp(-t*(dt>1.5?9:5)),dt<.01&&(dt=0)},zo=t=>{if(Zt-=t,Ee-=t,Me-=t,Zt<=0&&(Zt=.5+n()*.3,e.sound.hit("noise",.02+.025*(ae?.3:1)+.08*B,{cutoff:380+900*B,dur:1.1})),Ee<=0&&(_t>.04||B>.25)&&(Ee=.09+n()*.08,e.sound.hit("hat",.06+_t*.5+B*.15)),Me<=0){Me=.7;let o=0;for(const r of _){const s=ct((r.st-.08)/.4,0,1)*(1-r.rope);o+=s/(1+Math.hypot(r.foot[0]-st[0],r.foot[1]-st[1])*2)}o>.02&&e.sound.hit("noise",Math.min(.2,o*.22),{cutoff:150+120*o,dur:1.4})}for(let o=Ft.length-1;o>=0;o--)if(nt>=Ft[o].at){const r=Ft[o];Ft.splice(o,1),r.dist<3&&e.sound.hit("kick",r.v),e.sound.hit("noise",r.v*.7,{cutoff:90+300/(1+r.dist),dur:2.4+Math.min(3,r.dist*.25)})}},No=(t,o)=>{o=Math.min(Math.max(o||0,0),.25),nt=t,Ge(),Ro(o),Ao(o),zo(o),Ye(),Pe(!1),Ze()};return uo(a,f),Ge(),Ye(),Pe(!0),Pe(!0),Ze(),No}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
