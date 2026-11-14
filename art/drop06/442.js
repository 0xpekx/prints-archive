// Stream Table: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/442.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ne){Ne&&function(){"use strict";const ct=.005555555555555556,gt=8,_=`#version 300 es
out vec2 vUv;
void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,tt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
layout(std140) uniform U { vec4 u[64]; };
#define NX 192
#define NY 384
const float DX = ${.25.toFixed(3)};
ivec2 cl(ivec2 c) { return clamp(c, ivec2(0), ivec2(NX - 1, NY - 1)); }
float stoneShape(vec2 p, vec4 a, vec4 b) {
  vec2 q = p - a.xy;
  float res = -1e3;
  if (dot(q, q) < a.z * a.z * 1.6) {
    float cs = cos(a.w), sn = sin(a.w);
    q = vec2(cs * q.x + sn * q.y, -sn * q.x + cs * q.y);
    q.y *= 1.45;
    float l = length(q) + 1e-5; vec2 n = q / l;
    float s1 = sin(b.z * 7.1), s2 = sin(b.z * 3.7 + 1.), s3 = sin(b.z * 5.3 + 2.);
    float c2 = n.x * n.x - n.y * n.y, sn2 = 2. * n.x * n.y, c3 = n.x * (4. * n.x * n.x - 3.), s3t = n.y * (3. - 4. * n.y * n.y);
    float c5 = n.x * (16. * n.x * n.x * n.x * n.x - 20. * n.x * n.x + 5.);
    float Rr = a.z * (1. + .09 * s1 * c2 + .07 * s2 * sn2 + .06 * s3 * c3 + .05 * s1 * s3t + .025 * s2 * c5);
    float rr = l / Rr;
    float prof = sqrt(max(0., 1. - pow(min(rr, 1.), 2.)));
    float h = b.x - b.y + b.y * prof + 0.1 * b.y * (q.x * s2 + q.y * s3) / a.z * prof;
    // just outside the stone: far below any surface, but it tells the picture a stone is beside it
    res = rr < 1. ? h : -500. - rr;
  }
  return res;
}
uniform sampler2D tST;
vec4 stoneB(int i) { return vec4(texelFetch(tST, ivec2(i, 0), 0).x, u[15 + i].yzw); }
float stoneTop(vec2 p) {
  float h = -1e3; int n = int(u[6].w);
  for (int i = 0; i < n; i++) h = max(h, stoneShape(p, u[7 + i], stoneB(i)));
  return h;
}
vec4 bil(sampler2D t, vec2 g) {
  vec2 f = fract(g); ivec2 i = ivec2(floor(g));
  return mix(mix(texelFetch(t, cl(i), 0), texelFetch(t, cl(i + ivec2(1, 0)), 0), f.x),
             mix(texelFetch(t, cl(i + ivec2(0, 1)), 0), texelFetch(t, cl(i + ivec2(1, 1)), 0), f.x), f.y);
}
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hcell(ivec2 c, uint s) { return float(hh(uint(c.x) * 73856093u ^ uint(c.y) * 19349663u ^ s) & 0xffffu) / 65535.; }
uint blk(ivec2 c) {
  vec2 g = vec2(c) + vec2(hcell(c / 3, 41u), hcell(c / 3, 43u)) * 3.;
  ivec2 b = ivec2(floor(g / 6.));
  return hh(uint(b.x) * 7919u + uint(b.y) * 104729u);
}
float hsm(ivec2 c, uint s) {
  vec2 g = vec2(c) / 5.; ivec2 i = ivec2(floor(g)); vec2 f = fract(g); f = f * f * (3. - 2. * f);
  return mix(mix(hcell(i, s), hcell(i + ivec2(1, 0), s), f.x), mix(hcell(i + ivec2(0, 1), s), hcell(i + ivec2(1, 1), s), f.x), f.y) * 0.75 + hcell(c, s + 1u) * 0.25;
}
`,h0=tt+`
uniform sampler2D tA, tF, tSM;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float dt = u[0].x, g = u[0].z, Cf = u[4].x;
  vec2 p = (vec2(c) + .5) * DX;
  vec4 a = texelFetch(tA, c, 0);
  vec4 aL = texelFetch(tA, cl(c - ivec2(1, 0)), 0), aR = texelFetch(tA, cl(c + ivec2(1, 0)), 0);
  vec4 aT = texelFetch(tA, cl(c - ivec2(0, 1)), 0), aB = texelFetch(tA, cl(c + ivec2(0, 1)), 0);
  float Hc = max(a.x, texelFetch(tSM, c, 0).x) + a.y;
  float HL = max(aL.x, texelFetch(tSM, cl(c - ivec2(1, 0)), 0).x) + aL.y, HR = max(aR.x, texelFetch(tSM, cl(c + ivec2(1, 0)), 0).x) + aR.y;
  float HT = max(aT.x, texelFetch(tSM, cl(c - ivec2(0, 1)), 0).x) + aT.y, HB = max(aB.x, texelFetch(tSM, cl(c + ivec2(0, 1)), 0).x) + aB.y;
  vec4 f = texelFetch(tF, c, 0);
  vec4 fl = texelFetch(tF, cl(c - ivec2(1, 0)), 0), fr = texelFetch(tF, cl(c + ivec2(1, 0)), 0);
  vec4 ft = texelFetch(tF, cl(c - ivec2(0, 1)), 0), fb = texelFetch(tF, cl(c + ivec2(0, 1)), 0);
  float dm = max(a.y, 0.03);
  vec2 v = vec2(fl.y - f.x + f.y - fr.x, ft.w - f.z + f.w - fb.z) * 0.5 / (DX * dm);
  float sp = length(v); if (sp > 45.) { v *= 45. / sp; sp = 45.; }
  vec4 fa = bil(tF, vec2(c) - v * dt / DX);
  vec4 nf = (fa + dt * g * DX * vec4(Hc - HL, Hc - HR, Hc - HT, Hc - HB)) / (1. + dt * Cf * sp / max(a.y, 0.012));
  nf = clamp(nf, vec4(0.), vec4(48. * a.y * DX));
  if (any(isnan(nf)) || any(isinf(nf))) nf = vec4(0.);
  if (c.x == 0) nf.x = 0.; if (c.x == NX - 1) nf.y = 0.; if (c.y == 0) nf.z = 0.; if (c.y == NY - 1) nf.w = 0.;
  float sum = nf.x + nf.y + nf.z + nf.w;
  o = nf * min(1., a.y * DX * DX / (sum * dt + 1e-9));
}`,x0=tt+`
uniform sampler2D tA, tF, tM;
uniform int uSub;
out vec4 o;
float thr(vec4 a, vec4 m, float coh) {
  float t = mix(u[3].y, u[3].x * coh, smoothstep(0.15, 0.6, m.x));
  t = mix(t, u[3].z, smoothstep(0.03, 0.12, a.y));
  return t * DX;
}
float ex(float bs, float bn, float ts, float tn) { float df = bs - bn; return sign(df) * max(0., abs(df) - (df > 0. ? ts : tn)); }
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float dt = u[0].x, MF = u[0].y;
  vec2 p = (vec2(c) + .5) * DX;
  ivec2 cL = cl(c - ivec2(1, 0)), cR = cl(c + ivec2(1, 0)), cT = cl(c - ivec2(0, 1)), cB = cl(c + ivec2(0, 1));
  vec4 a = texelFetch(tA, c, 0), aL = texelFetch(tA, cL, 0), aR = texelFetch(tA, cR, 0), aT = texelFetch(tA, cT, 0), aB = texelFetch(tA, cB, 0);
  vec4 f = texelFetch(tF, c, 0), fl = texelFetch(tF, cL, 0), fr = texelFetch(tF, cR, 0), ft = texelFetch(tF, cT, 0), fb = texelFetch(tF, cB, 0);
  vec4 m = texelFetch(tM, c, 0), mL = texelFetch(tM, cL, 0), mR = texelFetch(tM, cR, 0), mT = texelFetch(tM, cT, 0), mB = texelFetch(tM, cB, 0);
  float inflow = fl.y + fr.x + ft.w + fb.z, outflow = f.x + f.y + f.z + f.w;
  float d1 = a.y + dt * (inflow - outflow) / (DX * DX);
  vec2 sq = (p - u[1].yz) / u[1].w;
  float srcRate = u[1].x * exp(-2. * dot(sq, sq)) / (1.5708 * u[1].w * u[1].w);
  d1 += dt * srcRate;
  // thin sheets soak into the sand
  d1 = max(d1 - dt * 0.02 * smoothstep(0.16, 0.02, d1), 0.);
  // an isolated puddle drains into the sand around it
  if (max(max(aL.y, aR.y), max(aT.y, aB.y)) < 0.01) d1 = max(d1 - dt * 0.25, 0.);
  float dm = max(0.5 * (a.y + d1), 0.03);
  vec2 v = vec2(fl.y - f.x + f.y - fr.x, ft.w - f.z + f.w - fb.z) * 0.5 / (DX * dm);
  float sp = min(length(v), 70.);
  if (length(v) > 70.) v *= 70. / length(v);
  // suspended sand rides the flow
  float s = bil(tA, vec2(c) - v * dt / DX).z + dt * srcRate * u[4].y;
  float b = a.x;
  float cap = min(u[2].y * pow(max(sp - u[2].x, 0.), 1.8) * smoothstep(0.01, 0.12, d1) * min(d1 / 0.45, 1.5), 0.01);
  if (s < cap) { float e = min(u[2].z * (cap - s) * dt, 0.008 / MF); b -= e * MF; s += e; }
  else { float e = u[2].w * (s - cap) * dt; b += e * MF; s -= e; }
  if (d1 < 0.006) { b += s * MF; s = 0.; }
  // transverse/downslope bed transport under moving water
  float lap = aL.x + aR.x + aT.x + aB.x - 4. * a.x;
  b += clamp(dt * MF * min(u[4].z * cap, 0.005) * lap / (DX * DX), -0.002, 0.002);
  // banks: cohesive damp sand stands steep until undercut, then slumps; the weak spots go first
  float coh = m.a;
  float ts = thr(a, m, coh);
  float tL = thr(aL, mL, mL.a), tR = thr(aR, mR, mR.a);
  float tT = thr(aT, mT, mT.a), tB = thr(aB, mB, mB.a);
  float eL = ex(a.x, aL.x, ts, tL), eR = ex(a.x, aR.x, ts, tR), eT = ex(a.x, aT.x, ts, tT), eB = ex(a.x, aB.x, ts, tB);
  if (c.x == 0) eL = 0.; if (c.x == NX - 1) eR = 0.; if (c.y == 0) eT = 0.; if (c.y == NY - 1) eB = 0.;
  float sl = u[3].w * (eL + eR + eT + eB);
  b -= sl;
  // recent slumping, for the picture (fresh clods at the toe)
  float fail = max(a.w - dt * 1.2, clamp(abs(sl) * 60., 0., 1.));
  // a finger drawn through the sand: the smoothed stroke of the last few frames (u[49..62]: x, z, how far it has sunk
  // in), cut as a shape with min (cutting it again changes nothing) and one continuous lip
  // beside it with max, never across its ends; a small pile where the finger lifted (u[63], u[46].y)
  if (uSub == 0 && (u[6].z > 1.5 || u[46].y > 0.)) {
    float r = u[6].x, D = u[6].y, base = u[4].w + u[38].z * (u[38].y - p.y);
    int np = int(u[6].z);
    float cut = 1e3, raise = -1e3;
    // the lip's height wanders along a hand's length, on a field not square to the tray
    vec2 lq = mat2(0.8, 0.6, -0.6, 0.8) * p / 3.1 + 40.;
    vec2 li = floor(lq), lf = fract(lq); lf = lf * lf * (3. - 2. * lf); ivec2 lc = ivec2(li);
    float var = 0.76 + 0.34 * mix(mix(hcell(lc, 51u), hcell(lc + ivec2(1, 0), 51u), lf.x), mix(hcell(lc + ivec2(0, 1), 51u), hcell(lc + ivec2(1, 1), 51u), lf.x), lf.y);
    float Tr = base;
    for (int i = 0; i < np - 1; i++) {
      vec4 A = u[49 + i], B = u[50 + i];
      vec2 ab = B.xy - A.xy;
      float l = max(length(ab), 1e-4);
      vec2 dn = ab / l;
      float al = dot(p - A.xy, dn), tt = clamp(al / l, 0., 1.);
      vec2 dv = p - A.xy - ab * tt;
      float dd = length(dv);
      if (dd < 2.6 * r) {
        // the sand's own level here, read beside the stroke (clear of the furrow and its lips): the floor runs level
        // down the tray where it can, so water follows a groove, but never less than 0.3 nor more than 0.65 under the
        // sand, so a stroke over bumps and hollows is one furrow, not a row of pits on the bumps
        vec2 sv = vec2(-dn.y, dn.x) * 2.6 * r;
        float hA = texelFetch(tA, cl(ivec2((A.xy + sv) / DX)), 0).x + texelFetch(tA, cl(ivec2((A.xy - sv) / DX)), 0).x;
        float hB = texelFetch(tA, cl(ivec2((B.xy + sv) / DX)), 0).x + texelFetch(tA, cl(ivec2((B.xy - sv) / DX)), 0).x;
        float e = mix(A.z, B.z, tt), T = 0.5 * mix(hA, hB, tt);
        float F = clamp(base - D, T - D - 0.15, T - 0.3), x = dd / (1.5 * r), g = 1. - smoothstep(0.33, 1., x);
        // the floor: a smooth U, with faint lines along the stroke where grains were dragged
        float so = dn.x * dv.y - dn.y * dv.x;
        float st = D * 0.05 * (0.6 * sin(so * 7.3) + 0.4 * sin(so * 11.9 + 1.3));
        cut = min(cut, T - (T - F - st) * e * g + 6. * max(x - 1., 0.));
        // the lip fades out over the last bit before the window's two ends, so none is thrown across the path
        float ov = i == 0 ? -al : i == np - 2 ? al - l : -1.;
        float w = 1. - smoothstep(-0.7 * r, 0., ov);
        if (i == 0 && i == np - 2) w = min(w, 1. - smoothstep(-0.7 * r, 0., al - l));
        raise = max(raise, T + 0.36 * D * e * w * var * exp(-pow((dd - 1.6 * r) / (0.5 * r), 2.)));
        Tr = T;
      }
    }
    // where the finger lifted: a small crescent of sand pushed ahead of it
    if (u[46].y > 0.) {
      vec2 q = p - u[63].xy, dr = u[63].zw;
      float al = dot(q, dr), sd = dr.x * q.y - dr.y * q.x;
      al -= 0.3 * sd * sd / r;
      raise = max(raise, base + 0.45 * D * u[46].y * var * exp(-pow((al - 1.15 * r) / (0.5 * r), 2.) - pow(sd / (1.3 * r), 2.)));
    }
    // pushed-up sand never lands in the water or on the furrow already cut
    float b0 = b;
    b = max(b, mix(b, raise, smoothstep(Tr - 0.3 * D, Tr - 0.05, b)));
    if (b > b0 + 0.01) fail = max(fail, 0.3);
    b = min(b, cut);
  }
  // a pebble just dropped (u[46].z its slot): a dimple under it and a low collar, more on one side than the other
  if (uSub == 0 && u[46].z > -0.5) {
    int k = int(u[46].z + 0.5);
    vec4 A = u[7 + k], B = u[15 + k];
    vec2 q = p - A.xy; float cs = cos(A.w), sn = sin(A.w);
    q = vec2(cs * q.x + sn * q.y, (-sn * q.x + cs * q.y) * 1.45);
    float d = length(q) / A.z;
    if (d < 2.4) {
      vec2 n = q / max(length(q), 1e-4);
      float ph = B.z * 2.3, ph2 = B.z * 1.7;
      float lobe = 0.55 + 0.45 * (0.6 * dot(n, vec2(cos(ph), sin(ph))) + 0.4 * ((n.x * n.x - n.y * n.y) * cos(ph2) + 2. * n.x * n.y * sin(ph2)));
      float rr = 1.35 * (1. + 0.15 * dot(n, vec2(sin(ph2 + 1.), cos(ph2 + 1.))));
      // u[46].w is this frame's share of the whole, so the shares add up to one dimple and one collar
      float de = u[46].w;
      b += B.y * de * (0.1 * lobe * exp(-pow((d - rr) / 0.3, 2.)) - 0.25 * (1. - smoothstep(0.3, 1.25, d)));
    }
  }
  // the outlet: a fixed sill and a sink at the downstream end
  if (c.y >= NY - 3) { d1 *= 0.7; s *= 0.7; b = mix(b, u[4].w - 1.4, 0.1); }
  b = clamp(b, 0.05, 6.);
  d1 = clamp(d1, 0., 5.); s = clamp(s, 0., 0.5);
  if (isnan(b) || isnan(d1) || isnan(s)) { b = isnan(a.x) ? u[4].w : a.x; d1 = 0.; s = 0.; }
  o = vec4(b, d1, s, fail);
}`,u0=tt+`
uniform sampler2D tA0, tA, tF, tM;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float dt = u[0].x * u[46].x;
  vec4 a0 = texelFetch(tA0, c, 0), a = texelFetch(tA, c, 0), m = texelFetch(tM, c, 0);
  ivec2 cL = cl(c - ivec2(1, 0)), cR = cl(c + ivec2(1, 0)), cT = cl(c - ivec2(0, 1)), cB = cl(c + ivec2(0, 1));
  vec4 mL = texelFetch(tM, cL, 0), mR = texelFetch(tM, cR, 0), mT = texelFetch(tM, cT, 0), mB = texelFetch(tM, cB, 0);
  float bL = texelFetch(tA, cL, 0).x, bR = texelFetch(tA, cR, 0).x, bT = texelFetch(tA, cT, 0).x, bB = texelFetch(tA, cB, 0).x;
  vec4 f = texelFetch(tF, c, 0), fl = texelFetch(tF, cL, 0), ft = texelFetch(tF, cT, 0);
  vec4 fr = texelFetch(tF, cR, 0), fb = texelFetch(tF, cB, 0);
  vec2 v = vec2(fl.y - f.x + f.y - fr.x, ft.w - f.z + f.w - fb.z) * 0.5 / (DX * max(a.y, 0.03));
  float sp = min(length(v), 70.);
  // capillary wetness: a halo from the water, thinning up the banks; slow drying
  float wn = max(max(mL.x * exp(-max(a.x - bL, 0.) * 0.25), mR.x * exp(-max(a.x - bR, 0.) * 0.25)),
                 max(mT.x * exp(-max(a.x - bT, 0.) * 0.25), mB.x * exp(-max(a.x - bB, 0.) * 0.25))) * exp(-DX / 4.);
  float z = (float(c.y) + .5) * DX;
  float table = clamp(0.5 - (a.x - (u[4].w + u[38].z * (u[38].y - z))) * 1.3, 0.12, 0.45);
  float wet = a.y > 0.015 ? 1. : max(max(m.x - dt * 0.006, min(wn, 0.985)), table);
  // grain sorting: erosion leaves the heavy lag, slow water lays down pale fines, fast water coarse
  float db = (a.x - a0.x) * u[46].x;
  float cs = m.y;
  if (db < 0.) cs += (-db / 0.06) * (1. - cs) * 0.5;
  else {
    float tgt = a.w > 0.3 ? 0.18 : mix(0.04, 0.7, smoothstep(6., 22., sp));
    cs = mix(cs, tgt, min(1., db / 0.05));
  }
  float fresh = max(m.z - dt * 0.12, clamp(abs(db) * 9. * step(0.3, a.w), 0., 1.));
  if (a.y > 0.05) fresh = max(fresh - dt * 0.6, 0.);
  o = vec4(clamp(wet, 0., 1.), clamp(cs, 0., 1.), fresh, m.a);
}`,d0=tt+`
uniform int uZ;
uniform sampler2D tA;
out vec4 o;
void main() {
  int i = int(gl_FragCoord.x);
  vec4 a = u[7 + i], bb = u[15 + i];
  float top = texelFetch(tST, ivec2(i, 0), 0).x, m = 0.;
  for (int k = 0; k < 8 + uZ; k++) {
    float an = float(k) * 0.785 + a.w;
    vec2 p = a.xy + vec2(cos(an), sin(an) / 1.45) * a.z * 0.95;
    m += texelFetch(tA, cl(ivec2(p / DX)), 0).x;
  }
  float tgt = m / 8. + bb.y * 0.84;
  // bb.x: how far an old pebble sinks into the sand in this settle (the ninth pebble's slot)
  o = vec4(max(min(top, mix(top, tgt, u[0].w)), bb.w) - bb.x, 0., 0., 0.);
}`,m0=tt+`
out vec4 o;
void main() { o = vec4(stoneTop((gl_FragCoord.xy) * DX), 0., 0., 0.); }`,v0=tt+`
uniform sampler2D tA, tM;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 a = texelFetch(tA, c, 0);
  float bL = texelFetch(tA, cl(c - ivec2(1, 0)), 0).x, bR = texelFetch(tA, cl(c + ivec2(1, 0)), 0).x;
  float bT = texelFetch(tA, cl(c - ivec2(0, 1)), 0).x, bB = texelFetch(tA, cl(c + ivec2(0, 1)), 0).x;
  // the water level, carried a cell past the waterline so the shore is where the two surfaces cross
  float acc = 0., n = 0., bs = 0.;
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
    vec4 q = texelFetch(tA, cl(c + ivec2(i, j)), 0);
    bs += q.x * float((2 - abs(i)) * (2 - abs(j)));
    if (q.y > 0.003) { float wgt = (i == 0 && j == 0) ? 2. : (i == 0 || j == 0) ? 1. : 0.6; acc += (q.x + q.y) * wgt; n += wgt; }
  }
  float sw = n > 0. ? acc / n : a.x - 0.25;
  if (a.y > 0.003) sw = mix(a.x + a.y, sw, 0.5); else sw = min(sw, a.x - 0.004);
  // the bed a touch softened so a cliff running across the grid does not show the grid's stairs
  o = vec4(mix(a.x, bs / 16., 0.7), sw, texelFetch(tM, c, 0).x, a.z / (a.y + 0.05));
}`,p0=tt+`
uniform sampler2D tV0;
out vec4 o;
vec2 bsp(vec2 g) {
  vec2 st = g - 0.5, i = floor(st), f = st - i;
  vec2 f2 = f * f, f3 = f2 * f;
  vec2 w0 = (1. - 3. * f + 3. * f2 - f3) / 6., w1 = (4. - 6. * f2 + 3. * f3) / 6., w2 = (1. + 3. * f + 3. * f2 - 3. * f3) / 6., w3 = f3 / 6.;
  vec2 g0 = w0 + w1, g1 = w2 + w3;
  vec2 h0 = (i - 0.5 + w1 / g0) / vec2(NX, NY), h1 = (i + 1.5 + w3 / g1) / vec2(NX, NY);
  return g0.y * (g0.x * textureLod(tV0, h0, 0.).xy + g1.x * textureLod(tV0, vec2(h1.x, h0.y), 0.).xy)
       + g1.y * (g0.x * textureLod(tV0, vec2(h0.x, h1.y), 0.).xy + g1.x * textureLod(tV0, h1, 0.).xy);
}
void main() {
  vec2 g = gl_FragCoord.xy * 0.5;
  vec2 c = bsp(g);
  // the tray's walls: the outermost texels stand at the wall's top, and the clamped edge carries it on past the sand
  ivec2 fc = ivec2(gl_FragCoord.xy);
  if (fc.x < 1 || fc.y < 1 || fc.x > 2 * NX - 2 || fc.y > 2 * NY - 2) c = vec2(u[38].w + u[38].z * u[38].y + 2.6);
  float e = 0.8;
  float gx = (bsp(g + vec2(e, 0.)).x - bsp(g - vec2(e, 0.)).x) / (2. * e * DX);
  float gz = (bsp(g + vec2(0., e)).x - bsp(g - vec2(0., e)).x) / (2. * e * DX);
  o = vec4(c, gx, gz);
}`,b0=tt+`
uniform sampler2D tA, tF, tM;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 a = texelFetch(tA, c, 0), m = texelFetch(tM, c, 0);
  vec4 f = texelFetch(tF, c, 0), fl = texelFetch(tF, cl(c - ivec2(1, 0)), 0), fr = texelFetch(tF, cl(c + ivec2(1, 0)), 0);
  vec4 ft = texelFetch(tF, cl(c - ivec2(0, 1)), 0), fb = texelFetch(tF, cl(c + ivec2(0, 1)), 0);
  vec2 v = vec2(fl.y - f.x + f.y - fr.x, ft.w - f.z + f.w - fb.z) * 0.5 / (DX * max(a.y, 0.03));
  if (length(v) > 60.) v *= 60. / length(v);
  o = vec4(v, m.y, max(m.z, a.w * 0.5));
}`,w0=`#version 300 es
precision highp float; precision highp int;
in vec2 vUv; out vec4 o; uniform int uZ;
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
vec3 h3(ivec2 c) { uint a = hh(uint(c.x) * 1597u + uint(c.y) * 51749u + 13u); return vec3(float(a & 1023u), float((a >> 10) & 1023u), float((a >> 20) & 1023u)) / 1023.; }
const float G = 48.;
void main() {
  vec2 p = gl_FragCoord.xy / 512.;
  vec2 g = p * G; ivec2 i = ivec2(floor(g)); vec2 f = fract(g);
  float d1 = 9., d2 = 9., id = 0.; vec2 dv = vec2(0.);
  for (int y = -1; y <= 1 + uZ; y++) for (int x = -1; x <= 1 + uZ; x++) {
    ivec2 cc = i + ivec2(x, y); ivec2 w = ivec2(int(mod(float(cc.x), G)), int(mod(float(cc.y), G)));
    vec3 r = h3(w);
    vec2 d = vec2(x, y) + 0.1 + r.xy * 0.8 - f;
    float dd = length(d) / (0.75 + 0.5 * r.z);
    if (dd < d1) { d2 = d1; d1 = dd; id = fract(r.z * 7.31 + r.x * 3.7); dv = d / (0.75 + 0.5 * r.z); } else if (dd < d2) d2 = dd;
  }
  float q = max(1e-3, 1. - d1 * d1 * 1.4), edge = smoothstep(0.0, 0.22, d2 - d1);
  float hgt = sqrt(q) * edge;
  vec2 grd = dv * 1.4 / sqrt(q) * edge * 0.12;
  o = vec4(id, hgt, clamp(0.5 + grd.x, 0., 1.), clamp(0.5 + grd.y, 0., 1.));
}`,g0=`#version 300 es
precision highp float; precision highp int;
in vec2 vUv; out vec4 o; uniform int uZ;
uint hh(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float h1(ivec2 c, int P, uint s) { c = ivec2(int(mod(float(c.x), float(P))), int(mod(float(c.y), float(P)))); return float(hh(uint(c.x) * 73856093u ^ uint(c.y) * 19349663u ^ s) & 65535u) / 65535.; }
float vn(vec2 p, int P, uint s) {
  vec2 i = floor(p), f = fract(p); f = f * f * f * (f * (f * 6. - 15.) + 10.);
  ivec2 c = ivec2(i);
  return mix(mix(h1(c, P, s), h1(c + ivec2(1, 0), P, s), f.x), mix(h1(c + ivec2(0, 1), P, s), h1(c + ivec2(1, 1), P, s), f.x), f.y);
}
void main() {
  vec2 p = gl_FragCoord.xy / 256.;
  vec4 r = vec4(0.);
  for (int k = 0; k < 10 + uZ; k++) {
    // octaves for channels r and g, two ridged layers for b, a broad layer for a
    int ch = k < 3 ? 0 : k < 6 ? 1 : k < 8 ? 2 : 3;
    int j = k < 3 ? k : k < 6 ? k - 3 : k < 8 ? k - 6 : k - 8;
    float P = ch < 2 ? 32. * exp2(float(j)) : ch == 2 ? 24. : 8. * exp2(float(j));
    float w = ch < 2 ? (j == 0 ? 0.6 : j == 1 ? 0.28 : 0.12) : ch == 2 ? 0.6 : (j == 0 ? 0.65 : 0.35);
    vec2 q = (p + (ch == 1 ? 0.37 : 0.) ) * P + (ch == 2 ? float(j) * 7.1 : 0.);
    float v = vn(q, int(P), uint(k * 7 + 1));
    if (ch == 2) v = pow(1. - abs(2. * v - 1.), 7.);
    r[ch] += v * w;
  }
  o = r;
}`,y0=tt+`
uniform sampler2D tV1;
in vec2 vUv; out uvec4 o;
vec2 uvOf(vec2 xz) { return xz / u[38].xy; }
void main() {
  vec2 ndc = vUv * 2. - 1.;
  vec3 ro = u[24].xyz;
  vec3 rd = normalize(u[25].xyz * u[24].w + u[26].xyz * ndc.x + u[27].xyz * ndc.y);
  float sl = u[38].z, A0 = u[38].w + 1.3;
  float t = max((A0 + sl * (u[38].y - ro.z) - ro.y) / (rd.y + sl * rd.z), 0.);
  float tPrev = t, hit = 0.;
  float horiz = sqrt(max(1. - rd.y * rd.y, 0.));
  float ta = t, tb = t;
  // one loop and one call site of the surface (bed, water, pebbles) for the march, the pebble under the hit
  // (its height and two slopes) and the shadow ray: phase 0 march, 1 pebble, 2-3 its slopes, 4 shadow, 5 done
  vec3 p = ro, sP = ro, sL = u[28].xyz;
  vec4 si = vec4(-1e3, 0., 0., 0.);
  float sres = 1., ss = 0.1, sk = u[28].w;
  int nst = int(u[6].w), nsh = int(u[45].x), ph = 0, bi = 0, ns = 0;
  for (int it = 0; it < 73 + nsh && ph < 5; it++) {
    float tm = hit > 0.5 ? 0.5 * (ta + tb) : t;
    vec3 q = ph == 0 ? ro + rd * tm : ph == 4 ? sP + sL * ss : p;
    vec2 xz = q.xz + (ph == 2 ? vec2(0.06, 0.) : ph == 3 ? vec2(0., 0.06) : vec2(0.));
    bool one = ph == 2 || ph == 3;
    int i0 = one ? bi : 0, i1 = one ? bi + 1 : nst;
    float hs = -1e3; int hb = -1;
    for (int i = i0; i < i1; i++) { float h = stoneShape(xz, u[7 + i], stoneB(i)); if (h > hs) { hs = h; hb = i; } }
    vec2 v = textureLod(tV1, uvOf(xz), 0.).rg;
    float sh = max(max(v.x, v.y), hs);
    if (ph == 0) {
      float gap = q.y - sh;
      bool fin = false;
      if (hit < 0.5) {
        if (gap < 0.) { hit = 1.; ta = tPrev; tb = t; }
        else { tPrev = t; t += max(gap / (-rd.y + 0.8 * horiz), 0.01); }
      } else {
        if (gap < 0.) tb = tm; else ta = tm;
        fin = tb - ta < 0.002;
      }
      if (fin || it == 69) { t = hit > 0.5 ? 0.5 * (ta + tb) : t; p = ro + rd * t; sP = p + vec3(0., 0.035, 0.); ph = 1; }
    } else if (ph == 1) {
      if (hb >= 0) { si = vec4(hs, 0., 0., u[15 + hb].z); bi = hb; ph = 2; } else ph = 4;
    } else if (one) {
      if (ph == 2) si.y = clamp(si.x - hs, -0.12, 0.12); else si.z = clamp(si.x - hs, -0.12, 0.12);
      ph++;
    } else {
      sres = min(sres, sk * (q.y - sh) / ss);
      ss *= 1.8; ns++;
      if (ns >= nsh) ph = 5;
    }
  }
  // to the shading pass: t as float bits; the light visibility as float bits with its low 4 bits holding the pebble
  // under the hit (index + 1, 0 = none)
  o = uvec4(floatBitsToUint(t), (floatBitsToUint(clamp(sres, 0., 1.)) & ~15u) | uint(si.x > -999. ? bi + 1 : 0), 0u, 0u);
}`,F0=tt+`
uniform sampler2D tV0, tV1, tV3, tGrain, tNoise, tW; uniform highp usampler2D tG;
in vec2 vUv; out vec4 o;
vec2 uvOf(vec2 xz) { return xz / u[38].xy; }
float at2(float y, float x) { float r = atan(y / (abs(x) < 1e-7 ? 1e-7 : x)); return x < 0. ? r + (y >= 0. ? 3.14159265 : -3.14159265) : r; }
vec3 env(vec3 d, float soft, float fdim) {
  vec3 c = mix(u[30].rgb, u[31].rgb, smoothstep(-0.25, 0.95, d.y)) * (0.4 + 0.6 * u[47].x);
  float az = at2(d.x, -d.z), el = asin(clamp(d.y, -1., 1.));
  vec4 wq = u[36];
  vec2 q = vec2((az - wq.x) / wq.z, (el - wq.y) / wq.w);
  float e = 0.03 + soft;
  float ins = smoothstep(1. + e, 1. - e, abs(q.x)) * smoothstep(1. + e, 1. - e, abs(q.y));
  float nm = u[37].w;
  float mx = abs(fract((q.x * 0.5 + 0.5) * nm) - 0.5) * 2.;
  float bar = max(smoothstep(0.88 - soft * 3., 0.95, mx), smoothstep(0.05 + soft, 0.02, abs(q.y - 0.32)));
  float bl = u[29].w > 0.5 ? smoothstep(0.35, 0.65, abs(fract(q.y * 7.) - 0.5) * 2.) * (1. - soft * 3.) : 0.;
  vec3 outside = u[37].rgb * mix(0.8, 1.15, q.y * 0.5 + 0.5) * mix(vec3(0.85, 0.92, 0.8), vec3(1.), smoothstep(-0.6, 0.2, q.y));
  c = mix(c, outside, ins * (1. - max(bar * 0.92, bl * 0.85)));
  // ceiling fixtures: long diffuser panels across the room, seen only in reflections
  float fx = 0.;
  for (int k = 0; k < 2; k++) {
    float e0 = u[44].x + float(k) * u[44].y, hw = u[44].w * (1. - 0.25 * float(k));
    fx += smoothstep(hw + 0.01 + soft, hw - 0.004, abs(el - e0)) * smoothstep(1.25, 1.0, abs(az + 0.15 * float(k)));
  }
  c += vec3(1.0, 0.98, 0.93) * u[44].z * fx * 9. * fdim;
  float ld = dot(d, u[41].xyz);
  c += u[29].rgb * u[41].w * 26. * smoothstep(0.9993 - soft * 0.006, 0.99985, ld);
  return c;
}
// albedo of the sand surface at xz
vec3 sandAlb(vec2 xz, float lod, float coarse, float fresh, float wet, out vec3 bump) {
  float lf = smoothstep(2.4, 4.4, lod);
  vec4 g1 = textureLod(tGrain, xz / 1.6, lod);
  vec4 g2 = textureLod(tGrain, mat2(0.8, 0.6, -0.6, 0.8) * xz / 1.25 + 0.31, lod + 0.38);
  vec4 nz = texture(tNoise, xz / 37.);
  float pd = mix(0.015, 0.07, coarse) * (0.6 + 0.8 * nz.a);
  float w = 0.02 + lf * 0.1;
  // the heavy lag: a fine film combed along the flow, with only the odd single dark grain
  float stk = textureLod(tNoise, vec2(xz.x / 3., xz.y / 14.) + 0.13, max(lod - 2., 0.)).g;
  float film = smoothstep(0.12, 0.8, coarse) * smoothstep(0.3, 0.7, stk + coarse * 0.3);
  float dark = max(mix(smoothstep(pd + w, pd - w, g1.r), pd, lf), film * 0.65);
  float alt = mix(smoothstep(u[33].w + w, u[33].w - w, g2.r), u[33].w, lf);
  // each grain its own shade: clear quartz, milky, stained, and the odd dark lithic
  float gi = fract(g1.r * 13.37), gj = fract(g1.r * 7.13 + 0.3);
  vec3 gv = mix(vec3(0.62 + 0.75 * gi) * mix(vec3(1.), vec3(1.08, 0.97, 0.86), gj), vec3(1.), lf);
  vec3 col = mix(u[32].rgb, u[33].rgb, alt) * gv * mix(0.45 + 0.75 * g1.g, 0.86, lf);
  col *= 0.9 + 0.2 * nz.r;
  col = mix(col, u[34].rgb * (0.85 + 0.3 * g2.g), dark);
  // fresh clods: paler, lumpy
  vec4 ck = texture(tNoise, xz / 0.9 + 0.2);
  float cl = fresh * smoothstep(0.3, 0.75, ck.g);
  col = mix(col, col * 1.06, cl * 0.5);
  bump = vec3(g1.z - 0.5, 0., g1.w - 0.5) * 1.5 * (1. - lf) + vec3(ck.r - 0.5, 0., ck.g - 0.5) * cl * 2.2;
  // moisture: damp sand darkens fast, saturated sand is darkest
  float lob = textureLod(tNoise, xz / 40. + 0.4, 0.).r - 0.5;
  float wd = (smoothstep(0.15, 0.6, wet) * 0.28 + smoothstep(-0.2, 0.16, wet + lob * 0.4 - 0.74) * 0.47 + smoothstep(0.92, 1., wet) * 0.25) * u[35].y;
  col = mix(col, pow(col, vec3(1.3)) * 0.55, wd);
  return col;
}
vec3 ambient(vec3 n) { return mix(u[30].rgb, u[31].rgb, n.y * 0.4 + 0.6) * u[47].x; }
vec3 keyLight(vec3 p) {
  vec3 k = u[29].rgb;
  if (u[42].w > 0.) {
    float xi = dot(p.xz, u[42].xy) / u[42].z;
    k *= mix(0.35, 1., smoothstep(0.15, 0.55, abs(fract(xi + 0.35 * sin(p.x * 0.05 + p.z * 0.03)) - 0.5) * 2.));
  }
  // a lamp lights a pool, with the tray falling off into the room's shade round it
  if (u[48].w > 0.) k *= 0.1 + 0.9 * smoothstep(u[48].z, 0., length(p.xz - u[48].xy));
  return k;
}
// lit ground (sand or pebble) at xz; vis = light visibility; uw = under water factor
vec3 gR; float gW, gS;
vec3 ground(vec2 xz, float hgt, vec3 rd, float lod, float vis, float uw, float caust, vec4 si) {
  vec4 v1 = texture(tV1, uvOf(xz)), v2 = texture(tV0, uvOf(xz)).zzzw, v3 = texture(tV3, uvOf(xz));
  vec3 Ld = u[28].xyz;
  float st = si.x;
  vec3 alb, n, nr; float dif, cA, aoA, f0, f1, fa, fb;
  if (st > v1.r) {
    n = normalize(vec3(si.y, 0.06, si.z));
    float sd = si.w;
    vec4 nz = texture(tNoise, xz / 2.7 + sd);
    vec4 gr = textureLod(tGrain, xz / 4. + sd, max(lod - 1.3, 0.));
    n = normalize(n + vec3(nz.r - 0.5, 0., nz.g - 0.5) * 0.22 + vec3(gr.z - 0.5, 0., gr.w - 0.5) * 0.12);
    // granite-like: grey ground mass, dark mica flecks, a few pale and pink feldspars; or fine dark basalt
    float fid = gr.r;
    alb = u[39].rgb * (0.85 + 0.3 * nz.a) * mix(vec3(1.), vec3(1.07, 1.0, 0.93), fract(sd * 3.3));
    alb = mix(alb, vec3(0.13, 0.13, 0.135), smoothstep(0.22, 0.18, fid) * u[39].w);
    alb = mix(alb, vec3(0.62, 0.6, 0.57), smoothstep(0.86, 0.9, fid) * u[39].w);
    alb = mix(alb, vec3(0.55, 0.40, 0.34), smoothstep(0.7, 0.73, fid) * smoothstep(0.78, 0.75, fid) * u[39].w);
    alb *= 0.85 + 0.3 * gr.g;
    // its foot sits in the sand: a damp band round the bottom, darkest in the crevice; matt where dry
    float eh = smoothstep(0.02, 0.22, st - v1.r);
    float wetS = max(max(uw, smoothstep(0.03, 0.0, st - v1.g)), 0.8 - 0.8 * eh);
    alb *= mix(1., 0.7, max(wetS, 0.5 * v2.b));
    dif = (max(dot(n, Ld) * 0.8 + 0.12, 0.) + 0.1 * (1. - n.y)) * (0.5 + 0.5 * eh) * (0.55 + 0.45 * n.y);
    cA = 1.; aoA = 0.7 + 0.4 * eh; nr = n; f0 = 0.03; f1 = 0.45; fa = mix(0.04, 0.35, wetS) * (0.2 + 0.8 * eh); fb = 1. - uw; gS = 0.3;
  } else {
    vec3 bump;
    // a steep face: the plan texture would smear down it, so it keeps only its mean, and it is wetter
    float steep = smoothstep(0.7, 2.2, length(v1.ba));
    // the wet front from a softened field, so its edge follows the ground in lobes, not the grid
    vec2 tx = vec2(0.8 * DX) / u[38].xy, uu = uvOf(xz);
    float wb = 0.125 * (textureLod(tV0, uu + tx, 0.).z + textureLod(tV0, uu - tx, 0.).z + textureLod(tV0, uu + vec2(tx.x, -tx.y), 0.).z + textureLod(tV0, uu - vec2(tx.x, -tx.y), 0.).z) + 0.5 * v2.b;
    // a damp ring in the sand round a pebble's foot
    float ring = st > -600. ? smoothstep(1.25, 1.02, -500. - st) : 0.;
    float wet = max(max(max(wb, uw), min(wb + 0.2 * steep, 0.97)), 0.93 * ring);
    alb = sandAlb(xz, lod + steep * 2.5, v3.b, v3.a, wet, bump);
    // current ripples on the bed where the flow moves sand, crests across the flow, creeping downstream
    float spd = length(v3.xy);
    float ra = uw * smoothstep(6., 13., spd) * (1. - smoothstep(24., 36., spd)) * 0.035 * smoothstep(0.15, 0.6, texture(tNoise, xz / 17. + 0.6).a + 0.1);
    // their slopes come from the water's map, made once a frame
    vec2 rg = (texture(tW, uvOf(xz)).ba - 0.5) * (ra / 0.035 / 1.2);
    vec4 mr = texture(tNoise, xz / 1.4);
    vec4 mr2 = texture(tNoise, xz / 0.37 + 0.5);
    vec2 micro = (1. - steep) * ((vec2(mr.r, mr.g) - 0.5) * (0.14 - 0.08 * uw) + (mr2.rg - 0.5) * 0.08 * (1. - smoothstep(1.5, 3.5, lod)) * (1. - uw * 0.7));
    n = normalize(vec3(-v1.b - rg.x, 1., -v1.a - rg.y) + bump * 0.9 + vec3(micro.x, 0., micro.y));
    // contact darkening round pebbles and in hollows
    float hc = v1.r, ao = 0.;
    vec2 o1 = vec2(0.7, 0.2), o2 = vec2(-0.2, 0.7);
    ao += max(texture(tV1, uvOf(xz + o1)).r - hc - 0.05, 0.) + max(texture(tV1, uvOf(xz - o1)).r - hc - 0.05, 0.) + max(texture(tV1, uvOf(xz + o2)).r - hc - 0.05, 0.) + max(texture(tV1, uvOf(xz - o2)).r - hc - 0.05, 0.);
    ao += max(st - hc, 0.) * 0.6;
    ao = (1. - clamp(ao * 0.4, 0., 0.45)) * (1. - 0.35 * ring);
    dif = max(dot(n, Ld) * 0.9 + 0.1, 0.);
    cA = caust; aoA = ao;
    // the sheen of saturated sand just above the water
    float sat = smoothstep(0.88, 1., wet) * (1. - uw);
    nr = normalize(vec3(-v1.b, 1., -v1.a) + bump * 0.25); f0 = 0.02; f1 = 0.98; fa = sat; fb = 0.5; gS = 0.25;
  }
  vec3 col = alb * (keyLight(vec3(xz.x, hgt, xz.y)) * dif * vis * cA + ambient(n) * aoA);
  float fr = f0 + f1 * pow(1. - max(dot(-rd, n), 0.), 5.);
  gR = reflect(rd, nr); gW = fr * fa * fb;
  return col;
}
void main() {
  vec2 ndc = vUv * 2. - 1.;
  vec3 ro = u[24].xyz;
  vec3 rd = normalize(u[25].xyz * u[24].w + u[26].xyz * ndc.x + u[27].xyz * ndc.y);
  uvec2 gh = texelFetch(tG, ivec2(gl_FragCoord.xy), 0).xy;
  int code = int(gh.y & 15u);
  float t = uintBitsToFloat(gh.x), sres = uintBitsToFloat(gh.y & ~15u);
  vec3 p = ro + rd * t;
  // the pebble under the hit: its height, two slopes and seed, as the march found them
  vec4 si = vec4(-1e3, 0., 0., 0.);
  int bi = code - 1;
  if (code > 0) for (int k = 0; k < 3 + int(u[45].z); k++) {
    float h = stoneShape(p.xz + (k == 1 ? vec2(0.06, 0.) : k == 2 ? vec2(0., 0.06) : vec2(0.)), u[7 + bi], stoneB(bi));
    if (k == 0) si.x = h; else if (k == 1) si.y = clamp(si.x - h, -0.12, 0.12); else si.z = clamp(si.x - h, -0.12, 0.12);
  }
  if (code > 0) si.w = u[15 + bi].z;
  vec2 uv = uvOf(p.xz);
  vec4 v1 = texture(tV1, uv), v2 = texture(tV0, uv).zzzw, v3 = texture(tV3, uv);
  float st = si.x;
  float wd = v1.g - max(v1.r, st);
  float px = t * 2. / (u[24].w * u[40].x);
  float lod = log2(max(px * inversesqrt(max(-rd.y, 0.2)) * 512. / 1.6, 1e-3));
  float vis = clamp(sres, 0., 1.);
  float time = u[35].x;
  // the water film: ripples carried by the real flow, Fresnel reflection of the room, refraction to the bed
  float wth = 0.006 + 0.03 * smoothstep(0.35, 0.75, textureLod(tNoise, p.xz / 40. + 0.7, 0.).a);
  float wq = min(min(p.z, u[38].y - p.z), min(p.x, u[38].x - p.x));
  bool isW = wd > wth && wq > 0.13;
  vec2 vel = v3.xy;
  float spd = length(vel);
  vec3 n = vec3(0., 1., 0.), refl = vec3(0.), rf = rd;
  float fr = 0., rip = 0., men = 0.;
  vec2 q = p.xz;
  float hq = p.y;
  if (isW) {
    // the surface: a standing diamond mesh over the fast thread, long streaks where it is slow, fine travelling ripples
    float dm = smoothstep(0.004, 0.08, wd);
    vec2 gr = (textureLod(tW, uv, 0.).rg - 0.5) * 0.4;
    vec2 cq = (p.xz - vel * 0.1) / 18.;
    rip = pow(max(1. - abs(textureLod(tNoise, cq + vec2(time * 0.004, -time * 0.003), 0.).r - textureLod(tNoise, cq * 1.3 + vec2(0.31 - time * 0.003, time * 0.002), 0.).g), 0.), 14.);
    gr *= dm * (0.3 + 0.7 * smoothstep(0.08, 0.45, -rd.y));
    vec2 ee = DX / u[38].xy;
    float sgx = (texture(tV0, uv + vec2(ee.x, 0.)).g - texture(tV0, uv - vec2(ee.x, 0.)).g) / (2. * DX), sgz = (texture(tV0, uv + vec2(0., ee.y)).g - texture(tV0, uv - vec2(0., ee.y)).g) / (2. * DX);
    // the meniscus: the film climbs the bank and bends up, a bright hairline along each shore
    men = smoothstep(0.035, 0.008, wd) * smoothstep(0.15, 0.6, length(v1.ba));
    vec2 sg = clamp(vec2(sgx, sgz), -0.12, 0.12);
    n = normalize(vec3(-sg.x - gr.x, 1., -sg.y - gr.y) + vec3(-v1.b, 0., -v1.a) * men * 1.4);
    float cosI = max(dot(-rd, n), 0.);
    fr = 0.02 + 0.98 * pow(1. - cosI, 5.) + men * 0.12;
    refl = reflect(rd, n);
    rf = refract(rd, n, 0.75);
    q = p.xz + rf.xz * (wd / max(-rf.y, 0.25));
    hq = texture(tV1, uvOf(q)).r;
  }
  float caust = isW ? 1. + (rip * 1.1 - 0.1) * u[47].y * smoothstep(0.03, 0.3, wd) * (1. - smoothstep(3., 4.6, lod)) : 1.;
  gW = 0.;
  vec3 col = ground(q, hq, rf, lod, vis, isW ? smoothstep(wth, wth + 0.05, wd) : 0., caust, si);
  bool off = wq < -2.5;
  // close below the eye the ripples would draw the ceiling panels as white scratches: there the room is seen blurred and dim
  float stp = isW ? smoothstep(0.15, 0.5, -rd.y) * (1. - smoothstep(6., 14., t)) : 0.;
  vec3 envc = env(off ? rd : isW ? refl : gR, isW ? 0.07 + 0.25 * stp : off ? 0.2 : gS, 1. / (1. + 3. * stp));
  if (!isW) col += envc * gW;
  if (isW) {
    float turb = clamp(v2.a * 18., 0., 1.);
    vec3 tr = exp(-wd * (vec3(0.22, 0.12, 0.09) + turb * 1.2));
    vec3 silt = mix(u[32].rgb, u[33].rgb, 0.4) * 0.7 * (keyLight(p) * 0.35 * vis + ambient(vec3(0., 1., 0.)));
    col = mix(col * tr, silt, (1. - exp(-wd * turb * 3.)) * 0.8);
    float rw = min(fr * max(smoothstep(wth, wth + 0.08, wd), men * 0.8), 1.) * (si.x > -600. ? 0.3 : 1.);
    col = col * (1. - rw) + min(envc * rw, vec3(1.2));
    col *= mix(0.9, 1., smoothstep(0.0, 0.03, wd));
  }
  if (wq < 0.13) {
    // pale acrylic in the room's shade, its top edge in the light, a tide mark where the water once stood
    float wt = u[38].w + u[38].z * u[38].y + 2.6;
    col = off ? envc : vec3(0.62, 0.61, 0.58) * (ambient(vec3(0., 0.3, 1.)) * (1.2 - 0.5 * smoothstep(0.9, 0.3, abs(p.y - wt + 1.9))) + u[29].rgb * 0.5 * smoothstep(wt - 0.06, wt, p.y));
  }
  col = min(col, vec3(7.));
  o = vec4(col, t);
}`,M0=`#version 300 es
precision highp float;
layout(std140) uniform U { vec4 u[64]; };
uniform sampler2D tV1, tV3, tNoise;
out vec4 o;
void main() {
  vec2 g = gl_FragCoord.xy / vec2(${2*192}., ${2*384}.), pz = g * u[38].xy;
  vec2 vel = textureLod(tV3, g, 0.).xy;
  float spd = length(vel), time = u[35].x;
  float fast = smoothstep(5., 20., spd);
  vec4 pn = textureLod(tNoise, pz / 96. + 0.21, 0.);
  vec2 k1 = vec2(0.56, 0.83) * 9. / (0.8 + 0.25 * pn.r), k2 = vec2(-0.56, 0.83) * 9. / (0.8 + 0.25 * pn.r);
  float ph1 = dot(pz, k1) + pn.g * 6. + time * 0.7, ph2 = dot(pz, k2) + pn.b * 6. - time * 0.6;
  vec2 dg = (k1 * sin(ph1) + k2 * sin(ph2)) * 0.006 * fast * smoothstep(0.3, 0.6, pn.a + fast * 0.2);
  // the diamond mesh fades where the picture's pixel grows past it
  vec3 P = vec3(pz.x, textureLod(tV1, g, 0.).r, pz.y) - u[24].xyz;
  float tt = length(P);
  dg *= 1. - smoothstep(2.4, 4.2, log2(max(tt * 2. / (u[24].w * u[40].x) * inversesqrt(max(-P.y / tt, 0.2)) * 512. / 1.6, 1e-3)));
  // current ripples on the bed: crests across the flow, creeping downstream (scaled by the picture where they show)
  vec2 rg = vec2(0.);
  if (spd > 6. && spd < 36.) {
    vec2 fd = vel / spd;
    float wn = texture(tNoise, pz / 9.).a;
    for (int k = 0; k < 3; k++) {
      float an = (float(k) - 1.) * 0.7;
      vec2 dk = vec2(sin(an), cos(an));
      float wk = max(dot(fd, dk) - 0.45, 0.);
      float lam = 1.15 + 0.2 * float(k);
      float sph = dot(pz, dk) / lam + (wn - 0.5) * 3.2 + texture(tNoise, pz / 7. + float(k) * .3).r * 2.4 - time * 0.05 * spd / 10.;
      float x = fract(sph);
      float dp = x < 0.72 ? 1. / 0.72 : -1. / 0.28;
      dp *= smoothstep(0., 0.08, x) * smoothstep(1., 0.93, x) + 0.25;
      rg += dk * dp / lam * wk;
    }
    rg *= 0.035 / 0.55;
  }
  vec2 sq = vec2(pz.x / 6., (pz.y - time * min(spd, 20.) * 0.5) / 22.);
  float e = 1. / 256.;
  float s0 = textureLod(tNoise, sq, 0.).g, s1 = textureLod(tNoise, sq + vec2(e, 0.), 0.).g;
  vec2 st = vec2((s1 - s0) / (e * 6.) * 0.004 * (1. - fast * 0.6), 0.);
  vec4 cp = textureLod(tNoise, (pz - vel * 0.3 * fract(time * 0.5)) / 19. + time * 0.004, 0.);
  st += (cp.rg - 0.5) * 0.045 * (0.4 + fast);
  o = clamp(vec4((dg + st) * 2.5, rg * 1.2) + 0.5, 0., 1.);
}`,z0=`#version 300 es
precision highp float;
layout(std140) uniform U { vec4 u[64]; };
uniform sampler2D tS;
in vec2 vUv; out vec4 o;
float coc(float t) { return clamp(u[35].z * abs(1. - u[43].x / t), 0., u[40].z); }
void main() {
  vec2 px = 1. / vec2(u[40].x);
  vec4 c0 = texture(tS, vUv);
  float k0 = coc(c0.a);
  vec3 acc = c0.rgb; float ws = 1.;
  float R = u[40].z;
  int nt = int(u[45].y);
  for (int i = 0; i < nt; i++) {
    float fi = float(i) + 0.5;
    float r = sqrt(fi / u[45].y) * R;
    float an = fi * 2.39996;
    vec2 off = vec2(cos(an), sin(an)) * r;
    vec4 s = textureLod(tS, vUv + off * px, 0.);
    float ks = coc(s.a);
    float kk = s.a > c0.a ? min(ks, k0 * 1.2 + 0.5) : ks;
    float w = smoothstep(r - 0.5, r + 1.0, kk) / max(kk * kk * 0.08 + 1., 1.);
    acc += min(s.rgb, vec3(4.)) * w; ws += w;
  }
  vec3 col = acc / ws * u[35].w;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  vec2 q = vUv - 0.5;
  col *= 1. - dot(q, q) * 0.1;
  col = pow(clamp(col, 0., 1.), vec3(1. / 2.2));
  uint h = uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u;
  h ^= h >> 13; h *= 0x5bd1e995u; h ^= h >> 15;
  col += (float(h & 1023u) / 1023. - 0.5) * 0.008;
  o = vec4(col, 1.);
}`;function B(e,o,w){const d=e.createProgram();for(const[v,m]of[[e.VERTEX_SHADER,o],[e.FRAGMENT_SHADER,w]]){const p=e.createShader(v);e.shaderSource(p,m),e.compileShader(p),e.attachShader(d,p),d["_"+v]=p}return d}function A0(e,o){for(const w in o){const d=o[w];if(!e.getProgramParameter(d.p,e.LINK_STATUS))throw new Error("442 "+w+": "+e.getProgramInfoLog(d.p)+" "+e.getShaderInfoLog(d.p["_"+e.FRAGMENT_SHADER]));e.useProgram(d.p),d.u={};const v=e.getProgramParameter(d.p,e.ACTIVE_UNIFORMS);let m=0;for(let f=0;f<v;f++){const M=e.getActiveUniform(d.p,f),z=e.getUniformLocation(d.p,M.name);z&&(d.u[M.name]=z,(M.type===e.SAMPLER_2D||M.type===e.UNSIGNED_INT_SAMPLER_2D)&&(e.uniform1i(z,m),d.u[M.name+"#"]=m++))}const p=e.getUniformBlockIndex(d.p,"U");p!==e.INVALID_INDEX&&e.uniformBlockBinding(d.p,p,0)}}function et(e,o,w,d,v,m,p){const f=e.createTexture();e.bindTexture(e.TEXTURE_2D,f),e.texStorage2D(e.TEXTURE_2D,p||1,d,o,w),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,v),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,v===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,m||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,m||e.CLAMP_TO_EDGE);const M=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,M),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f,0),{t:f,f:M,w:o,h:w}}const k0=(()=>{const e=new Float32Array(1),o=new Uint32Array(e.buffer);return w=>{e[0]=w;const d=o[0],v=d>>>16&32768,m=(d>>>23&255)-112,p=d&8388607;return m<=0?v:m>=31?v|31743:v|m<<10|p>>>13}})();function Ee(e){const o={flux:{p:B(e,_,h0)},bed:{p:B(e,_,x0)},mix:{p:B(e,_,u0)},v0:{p:B(e,_,v0)},v1:{p:B(e,_,p0)},settle:{p:B(e,_,d0)},stmap:{p:B(e,_,m0)},v3:{p:B(e,_,b0)},geo:{p:B(e,_,y0)},shade:{p:B(e,_,F0)},post:{p:B(e,_,z0)},wave:{p:B(e,_,M0)},grain:{p:B(e,_,w0)},noise:{p:B(e,_,g0)}};for(const w in o)e.linkProgram(o[w].p);return e.flush(),o}function T0(e,o){if(e.__c442)return e.__c442;const w=!!e.getExtension("EXT_color_buffer_float"),d=w||!!e.getExtension("EXT_color_buffer_half_float"),v=o||Ee(e);A0(e,v);const m={P:v,floatOK:w,halfOK:d,vao:e.createVertexArray()};m.ub=e.createBuffer(),e.bindBuffer(e.UNIFORM_BUFFER,m.ub),e.bufferData(e.UNIFORM_BUFFER,64*16,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(m.vao),m.grain=et(e,512,512,e.RGBA8,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,10),e.bindFramebuffer(e.FRAMEBUFFER,m.grain.f),e.viewport(0,0,512,512),e.useProgram(v.grain.p),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,m.grain.t),e.generateMipmap(e.TEXTURE_2D);const p=e.getExtension("EXT_texture_filter_anisotropic");return p&&e.texParameterf(e.TEXTURE_2D,p.TEXTURE_MAX_ANISOTROPY_EXT,4),m.noise=et(e,256,256,e.RGBA8,e.LINEAR_MIPMAP_LINEAR,e.REPEAT,9),e.bindFramebuffer(e.FRAMEBUFFER,m.noise.f),e.viewport(0,0,256,256),e.useProgram(v.noise.p),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,m.noise.t),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),e.__c442=m,m}function yt(e,o){const w=e.slice(2).padEnd(64,"0"),d=z=>parseInt(w.slice(z*8,z*8+8),16)>>>0;let v=(d(0)^Math.imul(o,2654435761)^Math.imul(d(4),2246822507))>>>0,m=(d(1)^Math.imul(d(5),3266489909))>>>0,p=(d(2)+o^Math.imul(d(6),668265263))>>>0,f=(d(3)^Math.imul(d(7),374761393))>>>0;const M=()=>{v>>>=0,m>>>=0,p>>>=0,f>>>=0;let z=v+m|0;return v=m^m>>>9,m=p+(p<<3)|0,p=p<<21|p>>>11,f=f+1|0,z=z+f|0,p=p+z|0,(z>>>0)/4294967296};for(let z=0;z<20;z++)M();return M}function Y(e,o,w){const d=Math.max(0,Math.min(1,(w-e)/(o-e)));return d*d*(3-2*d)}function R0(e,o,w){const d={nv:e,I0:new Int32Array(192),I1:new Int32Array(192),WX:new Float64Array(192),J0:new Int32Array(384),J1:new Int32Array(384),WY:new Float64Array(384)};for(let v=0;v<192;v++){const m=o((v+.5)*.25),p=Math.floor(m),f=m-p;d.WX[v]=f*f*(3-2*f),d.I0[v]=p&63,d.I1[v]=p+1&63}for(let v=0;v<384;v++){const m=w((v+.5)*.25),p=Math.floor(m),f=m-p;d.WY[v]=f*f*(3-2*f),d.J0[v]=(p&63)*64,d.J1[v]=(p+1&63)*64}return d}function q(e,o,w){const d=e.nv,v=e.I0[o],m=e.I1[o],p=e.J0[w],f=e.J1[w],M=e.WX[o],z=e.WY[w];return(d[p+v]*(1-M)+d[p+m]*M)*(1-z)+(d[f+v]*(1-M)+d[f+m]*M)*z}const rt=(e,o)=>{let w=0;for(const v of o)w+=v.w;let d=e()*w;for(const v of o)if(d-=v.w,d<0)return v;return o[o.length-1]},De=[{n:"Quartz and Black Sand",w:40,a:[.56,.48,.37],b:[.51,.4,.3],alt:.3,heavy:[.05,.05,.06],wetD:.95},{n:"Garnet Sand",w:22,a:[.55,.44,.42],b:[.5,.38,.38],alt:.25,heavy:[.33,.09,.12],wetD:.92},{n:"Pale Silica",w:20,a:[.55,.53,.48],b:[.51,.48,.42],alt:.2,heavy:[.36,.33,.28],wetD:1.05},{n:"Olivine Grit",w:10,a:[.29,.34,.22],b:[.38,.41,.3],alt:.25,heavy:[.04,.05,.045],wetD:.9},{n:"Iron Red",w:8,a:[.52,.32,.24],b:[.58,.42,.34],alt:.3,heavy:[.07,.05,.05],wetD:1}],Xe=[{n:"North Window",w:44,az:-.42,el:.24,col:[.95,.98,1.04],I:3,soft:7,fill:1.15,hard:.55,lo:[.05,.043,.036],hi:[.15,.135,.12],win:[-.42,.12,.5,.2],wc:[2.4,2.5,2.65],mull:4,lamp:0,exp:.6,fix:[.74,.32,.55,.075]},{n:"Bench Lamp",w:26,az:.55,el:.3,col:[1,.8,.6],I:4.4,soft:12,fill:.45,hard:.9,lo:[.035,.035,.04],hi:[.1,.1,.11],win:[-1.6,.3,.25,.2],wc:[.18,.2,.24],mull:2,lamp:1,exp:.95,fix:[.9,.3,.06,.03]},{n:"Skylight",w:22,az:-.25,el:.85,col:[.96,.98,1],I:1.45,soft:2.5,fill:1.1,hard:.6,lo:[.045,.043,.04],hi:[.15,.15,.16],win:[-.15,1.05,.7,.32],wc:[1.6,1.65,1.75],mull:4,lamp:0,exp:.5,fix:[.62,.3,.4,.05]},{n:"Low Sun Through Blinds",w:8,az:-.85,el:.24,col:[1,.82,.62],I:4.4,soft:12,fill:1,hard:.9,lo:[.04,.045,.06],hi:[.12,.13,.16],win:[-.85,.3,.32,.26],wc:[.9,.85,.8],mull:2,lamp:1,exp:.9,blinds:1,fix:[.8,.3,.1,.03]}],Se=[{n:"Gentle",w:50,s:.01,amp:1.2,D:1,W:.95},{n:"Moderate",w:35,s:.016,amp:.95,D:1,W:1.05},{n:"Steep",w:15,s:.026,amp:.5,D:.72,W:1.3,alt:1}],Le=[{n:"Trickle",w:25,q:13,pulse:0,fill:.32},{n:"Steady",w:50,q:20,pulse:0,fill:.5},{n:"Pulsing",w:25,q:19,pulse:1,fill:.58}],_e=[{n:"Pilot Meander",w:50},{n:"Straight Cut",w:28},{n:"Two Arms",w:22}],Be=[{n:"Firm",w:45,tw:2.1,pwo:5,pwi:2.2,W:.85,D:1,blk:.4},{n:"Crumbly",w:40,tw:1.45,pwo:4,pwi:2,W:1.05,D:1,blk:.8},{n:"Loose",w:15,tw:1,pwo:1.7,pwi:1.4,W:1.55,D:.62,blk:0,alt:1}],qe=[{n:"Low and Close",w:55},{n:"Straight Down",w:20},{n:"At the Water",w:15},{n:"From the Header",w:10}],Ue=[{n:"None",w:40,k:0},{n:"One Pebble",w:40,k:1},{n:"Three Pebbles",w:20,k:3}];Ne.add({num:442,name:"Stream Table",fam:"Worlds",recipe:"A lab tray of wet sand in a dim room with a tiny river that actually carves bends, drops sand on the inside of turns and undercuts banks until they slump. The sand, the tilt, the flow and where you're looking from change every mint. Tap to drop a pebble in, drag to draw a groove with your finger, or hold still to open the tap and flood the table.",interactive:"Tap to drop a pebble in; drag to draw a groove with your finger; hold still to open the tap and flood the table.",music:!0,gl:!0,fps:30,seed:0,make(e){const o=e.gl,w=e.size,d=o.__c442?null:Ee(o),v=yt(e.hash,1),m=yt(e.hash,2);let p=rt(v,De),f=rt(v,Xe),M=rt(v,Se),z=rt(v,Le),Ft=rt(v,_e),K=rt(v,Be),Jt=rt(v,Ue);e.home&&(p=De[0],f=Xe[0],M=Se[0],z=Le[1],Ft=_e[0],K=Be[0],Jt=Ue[1]),e.trait("Sand",p.n),e.trait("Light",f.n),e.trait("Tilt",M.n),e.trait("Flow",z.n);const $t=e.home?qe[0]:rt(yt(e.hash,23),qe);e.trait("Start",Ft.n),e.trait("Banks",K.n),e.trait("Pebbles",Jt.n),e.trait("View",$t.n);const Ie=M.s,we=2,Et=t=>we+Ie*(96-t),Qt=64,Mt=new Float32Array(Qt*Qt);for(let t=0;t<Mt.length;t++)Mt[t]=m();const N0=(t,a)=>{const n=Math.floor(t),i=Math.floor(a);let s=t-n,l=a-i;s=s*s*(3-2*s),l=l*l*(3-2*l);const h=n&63,c=n+1&63,x=(i&63)*Qt,u=(i+1&63)*Qt;return(Mt[x+h]*(1-s)+Mt[x+c]*s)*(1-l)+(Mt[u+h]*(1-s)+Mt[u+c]*s)*l},te=48/2+(m()-.5)*3,Dt=[],ot=[],Pe=[],Xt=t=>(m()-.5)*t;let ge;if(Ft.n==="Straight Cut"){const t=te-7+Xt(5),a=te+3+Xt(4);ge=n=>t+(a-t)*(n-18)/62}else{const t=e.home||m()<.5?1:-1,a=[-1,-2,-5,6,-6,3,0,0,0],n=e.home?1:M.amp;ge=(i,s)=>te+t*a[s]*n+(e.home?0:Xt(4)*Math.min(1,s/3)*n)}for(let t=0;t<9;t++){const a=-18+18*t+(t>1&&t<7?Xt(4):0);Dt.push(a),ot.push(ge(a,t))}const st=(t,a)=>{let n=0;for(;n<Dt.length-2&&a>Dt[n+1];)n++;const i=Math.max(0,Math.min(1,(a-Dt[n])/(Dt[n+1]-Dt[n]))),s=t[Math.max(n-1,0)],l=t[n],h=t[n+1],c=t[Math.min(n+2,t.length-1)];return .5*(2*l+(-s+h)*i+(2*s-5*l+4*h-c)*i*i+(-s+3*l-3*h+c)*i*i*i)},at=yt(e.hash,13),St=e.home?1:.6+.4*at(),E0=!e.home&&at()<.22,Ve=()=>({l:15+9*at(),p:at()*6.283}),Oe=M.W*K.W,We=M.D*K.D,lt=[];if(lt.push({xs:ot,hw:(z.q<15?1.8:2.2)*Oe,D:1*We,alt:M.alt||K.alt||Ft.n==="Straight Cut"?Ve():null}),Ft.n==="Two Arms"){for(let t=0;t<9;t++)Pe.push(ot[t]+(t>=2&&t<=5?t%2?6:-5:0));lt.push({xs:Pe,hw:1.6*Oe,D:.8*We,alt:M.alt||K.alt?Ve():null})}if(Ft.n==="Pilot Meander"||Ft.n==="Straight Cut"){const t=[],a=e.home||m()<.5?1:-1;for(let n=0;n<9;n++)t.push(ot[n]+a*(9+4*Math.sin(n*1.7+m()*2))+Xt(3));E0||lt.push({xs:t,hw:1.7,D:.32,dry:1})}const Ye=2,D0=lt.map(()=>{const t=[];for(let a=0;a<100;a++)t.push({on:at()<K.blk*St*.45,u:at(),s:.3+.35*at(),h:.2+.3*at(),n0:.7+.25*at(),r:at()*1.5});for(const a of t)a.cr=Math.cos(a.r),a.sr=Math.sin(a.r);return t}),U=(t,a)=>R0(Mt,t,a),X0=U(t=>t/11,t=>t/11),S0=U(t=>t/1.2+40,t=>t/1.2),L0=U(t=>t/1.5+61,t=>t/4),_0=U(t=>t/2.2+70,t=>t/2.2+30),B0=U(t=>t*2.6+90,t=>t/2.2+11),q0=U(t=>t/2,t=>t/2),U0=U(t=>t/3+20,t=>t/3),I0=U(t=>t*3+50,t=>t*3),P0=U(t=>t/3,t=>t/3),V0=U(t=>t/4,t=>t/30),O0=U(t=>t/5+33,t=>t/7),W0=U(t=>t/5,t=>t/5+20),Y0=U(t=>t/6+3,t=>t/6),G0=U(t=>t/6+9,t=>t/9),X=new Float32Array(192*384*4),ft=new Float32Array(192*384*4),C0=st(ot,5);for(let t=0;t<384;t++){const a=(t+.5)*.25,n=Et(a),i=lt.map(s=>{const l=st(s.xs,a),h=st(s.xs,a-1.5),c=st(s.xs,a+1.5),x=(h+c-2*l)/(1.5*1.5);return{x:l,k:x,sl:(c-h)/3,hw:s.hw*(.9+.25*N0(a/14+lt.indexOf(s)*7,3))}});for(let s=0;s<192;s++){const l=(s+.5)*.25,h=(t*192+s)*4;let c=n+(q(X0,s,t)-.5)*.16+(q(U0,s,t)-.5)*.06+(q(S0,s,t)-.5)*.04;c+=Math.sin(l*2.3+q(V0,s,t)*9)*.02*(.6+.8*q(G0,s,t))-.016*Y(.8,.95,q(L0,s,t));const x=Math.min(l,48-l);if(x<9){const vt=Y(.35,.6,q(O0,s,t));vt>0&&(c+=.035*Math.sin(Math.hypot(x-9,a%13-6.5)*1.6)*Y(9,4,x)*vt)}let u=0,F=-1,k=0,r=99,b=0,T=0,S=0,D=0,W=0;for(let vt=0;vt<lt.length;vt++){const N=lt[vt],P=i[vt],pe=P.hw,ze=(l-P.x)/Math.sqrt(1+P.sl*P.sl),pt=Math.min(1,Math.abs(P.k)*18),n0=-Math.sign(P.k)*pt*.38,it=ze/pe-n0;if(Math.abs(it)>2.2){N.dry||(r=Math.min(r,Math.abs(ze)-pe));continue}const be=Math.sign(it)===-Math.sign(P.k)&&Math.abs(P.k)>.004,Ae=Math.sign(it)===-Math.sign(P.k)?Y(.002,.008,Math.abs(P.k)):0,Q0=1+(1-Ae)*(.35+.35*pt*St),Vt=Math.abs(it)/Q0,to=N.dry?2+3*Ae:K.pwi+(K.pwo-K.pwi)*Ae,Zt=Math.max(0,1-Math.pow(Vt,to));let Ot=N.D*Zt*(be&&!N.dry?1+.15*pt*St*(1-Vt):1),Wt=0;if(!N.dry){if(be||(Wt=.45*pt*St*Y(.05,.75,Vt)),N.alt){const bt=Math.sin(a*6.283/N.alt.l+N.alt.p),Nt=.55*Math.pow(Math.abs(bt),.6)*(1-pt)*St*Y(-.2,.55,Math.sign(bt)*it);Nt>Wt&&(Wt=Nt),-Math.sign(bt)*it>.1&&Math.abs(bt)>.3&&Zt>.2&&(D=Math.max(D,Math.abs(bt)*(1-pt)*Zt))}if(Ot=Math.max(0,Ot-N.D*Wt),Wt>.08&&Zt>0&&(T=Math.max(T,Wt/.45),S=Vt),be&&Vt<.85&&Zt>.1&&(D=Math.max(D,pt*(1-Vt))),(be||N.alt)&&Math.abs(it)>.3&&Math.abs(it)<1.5){const bt=Math.floor(a/Ye);for(let Nt=bt-1;Nt<=bt+1;Nt++){const wt=D0[vt][(Nt%100+100)%100];if(!wt.on||!N.alt&&pt<.2)continue;const i0=(Nt+wt.u)*Ye,eo=N.alt?Math.sin(i0*6.283/N.alt.l+N.alt.p)>0?-1:1:-Math.sign(P.k),c0=(l-P.x)/Math.sqrt(1+P.sl*P.sl)-(eo*wt.n0+n0)*pe,r0=a-i0,l0=wt.cr,f0=wt.sr,oo=(l0*c0+f0*r0)/wt.s,ao=(-f0*c0+l0*r0)/(wt.s*1.3),ke=Math.abs(oo),Te=Math.abs(ao),Re=Math.cbrt(ke*ke*ke+Te*Te*Te);Re<1&&(W=Math.max(W,wt.h*N.D*(1-Re*Re)*(.8+.4*q(I0,s,t))))}}}Ot>u&&(u=Ot),Math.abs(it)<1.1&&a>1&&!N.dry&&(k=1,F=Math.max(F,n-N.D+z.fill*N.D)),N.dry?Ot>.05&&(b=Math.max(b,Ot/N.D)):r=Math.min(r,Math.abs(ze)-pe)}c-=u,r>0&&r<5&&(c-=.05*(Y(3.2,2.9,r)+Y(1.6,1.35,r))*(.5+q(Y0,s,t))),c=Math.max(c,Math.min(c+W,n-.08));const Pt=k?Math.max(0,F-c):0;X[h]=c,X[h+1]=Pt,X[h+2]=0,X[h+3]=W>.02?.6:0;const Kt=Math.min(.45,Math.max(.12,.5-(c-n)*1.3));ft[h]=r>8.5?Kt:Math.max(Kt,Math.exp(-Math.max(0,r)/4));const ve=q(B0,s,t);let nt=b>0?.12+.35*b*q(q0,s,t):u>.2?.3:.07+.08*q(W0,s,t);D>.05&&(nt=Math.max(nt,(.3+.5*D*St)*(.55+.45*Y(.2,.8,ve+D*.2)))),T>.2&&(nt=Math.min(nt,.03+.08*(.5+.5*Math.sin(S*15+q(P0,s,t)*4)))),W>.02&&(nt=.15),ft[h+1]=nt,ft[h+2]=W>.02?.8:0,ft[h+3]=.55+.9*(.94*q(_0,s,t)+.06*m())}}const Yt=(t,a)=>{const n=Math.max(0,Math.min(191,Math.floor(t/.25))),i=Math.max(0,Math.min(383,Math.floor(a/.25)));return X[(i*192+n)*4]},V=[],Gt=[],Z=[];let ee=0;const Ge=(t,a,n,i,s)=>{const l=i*(.46+.14*m()),h=ee;if(ee=(ee+1)%gt,V[h]={x:t,z:a,r:i,ang:m()*6.283,top:n+l*.86,thick:l,seed:m()*10,floor:n+l*.62,sink:-1,sunk:0},s){const x=V[h];x.top1=x.top,x.top0=n+l*1.04,x.top=x.top0;for(let u=Z.length-1;u>=0;u--)Z[u].k===h&&Z.splice(u,1);Z.push({k:h,t:0,done:0})}Gt.push(h);const c=V[ee];V.length===gt&&c&&c.sink<0&&(c.sink=0,c.floor=-9)};if(Jt.k>0){const t=[64,70,46];for(let a=0;a<Jt.k;a++){const n=t[a]+(e.home?0:Xt(6)),i=st(ot,n),s=a===1?-1:1,l=e.home?i-1.1:i+s*(.8+m()*1.4);Ge(l,n,Yt(l,n),.8+m()*.6)}for(const a of V){const n=Math.cos(a.ang),i=Math.sin(a.ang),s=a.r*2.2,l=a.seed*2.3,h=a.seed*1.7;for(let c=Math.max(0,Math.floor((a.z-s)/.25));c<=Math.min(383,Math.ceil((a.z+s)/.25));c++)for(let x=Math.max(0,Math.floor((a.x-s)/.25));x<=Math.min(191,Math.ceil((a.x+s)/.25));x++){const u=(x+.5)*.25-a.x,F=(c+.5)*.25-a.z,k=n*u+i*F,r=(-i*u+n*F)*1.45,b=Math.hypot(k,r)+1e-5,T=b/a.r,S=k/b,D=r/b,W=.55+.45*(.6*(S*Math.cos(l)+D*Math.sin(l))+.4*((S*S-D*D)*Math.cos(h)+2*S*D*Math.sin(h))),Pt=1.1*(1+.15*(S*Math.sin(h+1)+D*Math.cos(h+1)));T<2.2&&(X[(c*192+x)*4]+=a.thick*.2*(.45+.9*W)*Math.exp(-(((T-Pt)/.45)**2))*Y(.2,-.9,F/a.r))}}}const R=T0(o,d),L=R.P,Lt=R.floatOK?o.RGBA32F:o.RGBA16F,zt=R.halfOK,ht=(t,a)=>et(o,192,384,t,a||o.NEAREST),J=[ht(Lt),ht(Lt)],_t=[ht(Lt),ht(Lt)],Bt=[ht(o.RGBA16F),ht(o.RGBA16F)],oe=ht(o.RGBA16F,o.LINEAR),Ct=et(o,192*2,384*2,o.RGBA16F,o.LINEAR),ae=ht(o.RGBA16F,o.LINEAR),Ce=et(o,192*2,384*2,R.halfOK?o.RGBA16F:o.RGBA8,o.LINEAR),je=et(o,w,w,zt?o.RGBA16F:o.RGBA8,o.LINEAR);(!R.gt||R.gt.w<w)&&(R.gt&&(o.deleteFramebuffer(R.gt.f),o.deleteTexture(R.gt.t)),R.gt=et(o,w,w,o.RG32UI,o.NEAREST));const xt=[et(o,gt,1,Lt,o.NEAREST),et(o,gt,1,Lt,o.NEAREST)];let $=0;const He=et(o,192,384,o.RGBA16F,o.NEAREST),ye=()=>O(L.stmap,He.f,{tST:xt[$].t},192,384),Ke=()=>{for(const t of Gt){const a=V[t].top;for(const n of xt)o.bindTexture(o.TEXTURE_2D,n.t),R.floatOK?o.texSubImage2D(o.TEXTURE_2D,0,t,0,1,1,o.RGBA,o.FLOAT,new Float32Array([a,0,0,0])):o.texSubImage2D(o.TEXTURE_2D,0,t,0,1,1,o.RGBA,o.HALF_FLOAT,new Uint16Array([k0(a),0,0,0]))}Gt.length=0};Ke();const Ze=(t,a)=>{o.bindTexture(o.TEXTURE_2D,t),o.texSubImage2D(o.TEXTURE_2D,0,0,0,192,384,o.RGBA,o.FLOAT,a)};Ze(J[0].t,X),Ze(Bt[0].t,ft);const j0=new Float32Array(4);zt&&(o.bindFramebuffer(o.FRAMEBUFFER,_t[0].f),o.clearBufferfv(o.COLOR,0,j0));let G=0,At=0,kt=0;const qt=new Float32Array(64*4),g=(t,a,n,i,s)=>{qt[t*4]=a,qt[t*4+1]=n,qt[t*4+2]=i,qt[t*4+3]=s},H0=K.tw;let Ut=.4,Tt=.05,ut=95,E=[te,Et(ut)+15,ut],se=24,ne=52,Je=1;if($t.n==="Straight Down")Ut=1.5,Tt=0,ut=52,E=[st(ot,52)+2,Et(52)+50,ut],se=49,Je=.86;else if($t.n==="At the Water"){Ut=.24,Tt=.08,ut=93;const t=st(ot,93)+1.4;E=[t,Yt(t,93)+3.6,ut],se=20,ne=72}else $t.n==="From the Header"&&(Ut=.5,Tt=Math.PI-.04,ut=3,E=[st(ot,10),Et(3)+15,ut],se=26,ne=34);const C=[Math.sin(Tt)*Math.cos(Ut),-Math.sin(Ut),-Math.cos(Tt)*Math.cos(Ut)],j=[Math.cos(Tt),0,Math.sin(Tt)],It=[j[1]*C[2]-j[2]*C[1],j[2]*C[0]-j[0]*C[2],j[0]*C[1]-j[1]*C[0]],ie=1/Math.tan(.297),dt=[Math.sin(f.az)*Math.cos(f.el),Math.sin(f.el),-Math.cos(f.az)*Math.cos(f.el)],$e=[[.44,.47,.42,.4],[.58,.44,.33,.3],[.72,.7,.66,.15],[.5,.48,.45,.55],[.32,.315,.31,.3]];m();const ce=e.home?$e[3]:$e[Math.floor(yt(e.hash,21)()*5)];(()=>{if(g(24,E[0],E[1],E[2],ie),g(25,C[0],C[1],C[2],0),g(26,j[0],j[1],j[2],0),g(27,It[0],It[1],It[2],0),g(28,dt[0],dt[1],dt[2],f.soft),g(29,f.col[0]*f.I,f.col[1]*f.I,f.col[2]*f.I,f.blinds?1:0),g(30,f.lo[0],f.lo[1],f.lo[2],0),g(31,f.hi[0],f.hi[1],f.hi[2],0),g(32,p.a[0],p.a[1],p.a[2],0),g(33,p.b[0],p.b[1],p.b[2],p.alt),g(34,p.heavy[0],p.heavy[1],p.heavy[2],0),g(36,f.win[0],f.win[1],f.win[2],f.win[3]),g(37,f.wc[0],f.wc[1],f.wc[2],f.mull),g(38,48,96,Ie,we),g(39,ce[0],ce[1],ce[2],ce[3]),g(41,dt[0],dt[1],dt[2],f.lamp),g(44,f.fix[0],f.fix[1],f.fix[2],f.fix[3]),g(45,6,6,0,0),g(47,f.fill,f.hard,0,0),g(48,st(ot,ne)+7,ne-6,34,f.lamp&&!f.blinds?1:0),f.blinds){const t=dt[0],a=dt[2],n=Math.hypot(t,a);g(42,t/n,a/n,2.6,1)}else g(42,0,0,1,0);g(2,7.5,65e-6,4,3),g(3,H0,.75,.6,.12),g(4,.022,0,2.5,we)})();let re=z.q,le=0,fe=0,he=0,xe=0;const mt=yt(e.hash,14),Rt=[{t0:-6,r:3,f:7,h:.75}];let ue=-6;const K0=t=>{for(;ue<t+60;){ue+=8+32*mt()*mt()+(mt()<.15?25:0);const n=mt()<.18;Rt.push(n?{t0:ue,r:5,f:18+15*mt(),h:-.3}:{t0:ue,r:1.5+3*mt(),f:4+9*mt(),h:.3+.7*mt()})}for(;Rt.length>1&&Rt[0].t0+Rt[0].r+Rt[0].f*6<t;)Rt.shift();let a=-.2;for(const n of Rt){const i=t-n.t0;i>0&&(a+=n.h*(i<n.r?i/n.r*(i/n.r)*(3-2*i/n.r):Math.exp(-(i-n.r)/n.f)))}return Math.max(-.5,a)};let de=[];const jt=(t,a,n)=>{g(0,t,a,981,n||0),g(1,re,C0,5,1.4),g(6,.55,.5,de.length,V.length);for(let i=0;i<14;i++){const s=de[i];s&&g(49+i,s.x,s.z,s.age>=2?1:(s.age+1)/3,0)}for(let i=0;i<gt;i++){const s=V[i];s?(g(7+i,s.x,s.z,s.r,s.ang),g(15+i,s.sunk,s.thick,s.seed,s.floor)):(g(7+i,-99,-99,.01,0),g(15+i,0,0,0,0))}g(35,fe,p.wetD,2.3*w/1e3,f.exp*Je),g(43,se,0,0,0),g(40,w,xe,2*w/1e3,0),o.bindBuffer(o.UNIFORM_BUFFER,R.ub),o.bufferSubData(o.UNIFORM_BUFFER,0,qt),o.bindBufferBase(o.UNIFORM_BUFFER,0,R.ub)},O=(t,a,n,i,s)=>{o.bindFramebuffer(o.FRAMEBUFFER,a),o.viewport(0,0,i,s),o.useProgram(t.p);for(const l in n)o.activeTexture(o.TEXTURE0+t.u[l+"#"]),o.bindTexture(o.TEXTURE_2D,n[l]);o.drawArrays(o.TRIANGLES,0,3)},Qe=()=>{o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.SCISSOR_TEST),o.disable(o.CULL_FACE),o.disable(o.STENCIL_TEST),o.colorMask(!0,!0,!0,!0),o.bindVertexArray(R.vao)},t0=(t,a)=>{O(L.flux,_t[1-At].f,{tA:J[G].t,tF:_t[At].t,tSM:He.t},192,384),At=1-At,o.useProgram(L.bed.p),o.uniform1i(L.bed.u.uSub,t),O(L.bed,J[1-G].f,{tA:J[G].t,tF:_t[At].t,tM:Bt[kt].t},192,384),a&&(O(L.mix,Bt[1-kt].f,{tA0:J[G].t,tA:J[1-G].t,tF:_t[At].t,tM:Bt[kt].t},192,384),kt=1-kt),G=1-G};if(!zt){const t=new Float32Array(294912),a=new Float32Array(192*384*16),n=new Float32Array(192*384*4),i=(s,l)=>(Math.max(0,Math.min(383,l))*192+Math.max(0,Math.min(191,s)))*4;for(let s=0;s<384;s++)for(let l=0;l<192;l++){const h=i(l,s);let c=0,x=0,u=0;for(let k=-1;k<=1;k++)for(let r=-1;r<=1;r++){const b=i(l+r,s+k);u+=X[b]*(2-Math.abs(r))*(2-Math.abs(k)),X[b+1]>.003&&(c+=X[b]+X[b+1],x++)}let F=x?c/x:X[h]-.25;F=X[h+1]>.003?.5*(X[h]+X[h+1]+F):Math.min(F,X[h]-.004),t[h]=X[h]*.3+.7*u/16,t[h+1]=F,t[h+2]=ft[h],n[h+2]=ft[h+1],n[h+3]=Math.max(ft[h+2],X[h+3]*.5)}for(let s=0;s<384*2;s++)for(let l=0;l<192*2;l++){const h=l*.5-.25,c=s*.5-.25,x=Math.floor(h),u=Math.floor(c),F=h-x,k=c-u,r=(s*192*2+l)*4;for(let b=0;b<2;b++)a[r+b]=(t[i(x,u)+b]*(1-F)+t[i(x+1,u)+b]*F)*(1-k)+(t[i(x,u+1)+b]*(1-F)+t[i(x+1,u+1)+b]*F)*k;a[r+2]=(t[i(x+1,u)]-t[i(x-1,u)])/(2*.25),a[r+3]=(t[i(x,u+1)]-t[i(x,u-1)])/(2*.25)}for(const[s,l,h,c]of[[oe,t,192,384],[Ct,a,192*2,384*2],[ae,n,192,384]])o.bindTexture(o.TEXTURE_2D,s.t),o.texSubImage2D(o.TEXTURE_2D,0,0,0,h,c,o.RGBA,o.FLOAT,l)}const e0=()=>{zt&&(O(L.v0,oe.f,{tA:J[G].t,tM:Bt[kt].t},192,384),O(L.v1,Ct.f,{tV0:oe.t},192*2,384*2),O(L.v3,ae.f,{tA:J[G].t,tF:_t[At].t,tM:Bt[kt].t},192,384)),O(L.wave,Ce.f,{tV1:Ct.t,tV3:ae.t,tNoise:R.noise.t},192*2,384*2),O(L.geo,R.gt.f,{tV1:Ct.t,tST:xt[$].t},w,w),O(L.shade,je.f,{tV0:oe.t,tV1:Ct.t,tV3:ae.t,tGrain:R.grain.t,tNoise:R.noise.t,tST:xt[$].t,tW:Ce.t,tG:R.gt.t},w,w),o.flush(),O(L.post,null,{tS:je.t},w,w)};if(Qe(),zt){jt(ct,14,.3),ye(),g(46,1,0,0,0),o.bindBuffer(o.UNIFORM_BUFFER,R.ub),o.bufferSubData(o.UNIFORM_BUFFER,0,qt);for(let t=0;t<150;t++)t0(1,!0),t%30===29&&V.length&&(O(L.settle,xt[1-$].f,{tA:J[G].t,tST:xt[$].t},gt,1),$=1-$,ye());jt(ct,14)}else jt(ct,14);e0();const Fe=(t,a)=>{const n=t*2-1,i=1-a*2,s=[C[0]*ie+j[0]*n+It[0]*i,C[1]*ie+j[1]*n+It[1]*i,C[2]*ie+j[2]*n+It[2]*i],l=Math.hypot(s[0],s[1],s[2]);let h=0,c=.2;for(let F=0;F<400&&c<400;F++){if(E[1]+s[1]/l*c<Yt(E[0]+s[0]/l*c,E[2]+s[2]/l*c)){for(let k=0;k<8;k++){const r=.5*(h+c);E[1]+s[1]/l*r<Yt(E[0]+s[0]/l*r,E[2]+s[2]/l*r)?c=r:h=r}return[E[0]+s[0]/l*c,E[2]+s[2]/l*c]}h=c,c+=Math.max(.08,c*.015)}let x=0,u=Et(E[2]-20);for(let F=0;F<3;F++){x=(u-E[1])/s[1];const k=E[2]+s[2]*x;u=Et(k)-.2}return[E[0]+s[0]*x,E[2]+s[2]*x]},Z0=(t,a)=>{let n=Yt(t,a);if(R.floatOK){try{const i=new Float32Array(4);o.bindFramebuffer(o.FRAMEBUFFER,J[G].f),o.readPixels(Math.max(0,Math.min(191,Math.floor(t/.25))),Math.max(0,Math.min(383,Math.floor(a/.25))),1,1,o.RGBA,o.FLOAT,i),isFinite(i[0])&&i[0]>0&&(n=i[0])}catch{}o.bindFramebuffer(o.FRAMEBUFFER,null)}return n},me=yt(e.hash,9),H={lp:0,lp2:0,bub:[]},J0=t=>{if(e.sound.on===!1)return;const a=Math.min(900,Math.round(t*8e3));if(a<8)return;const n=new Float32Array(a),i=.22*Math.sqrt(re/20),s=7*re/20;for(let l=0;l<a;l++){const h=me()*2-1;H.lp+=(h-H.lp)*.32,H.lp2+=(H.lp-H.lp2)*.08;let c=(H.lp-H.lp2)*i;me()<s/8e3&&H.bub.length<6&&H.bub.push({f:500+me()*1300,ph:0,a:.08+me()*.12,t:0});for(let x=H.bub.length-1;x>=0;x--){const u=H.bub[x];u.t+=1/8e3,u.ph+=u.f*(1+u.t*12)/8e3,c+=Math.sin(u.ph*6.2832)*u.a*Math.exp(-u.t*70)*Math.min(1,u.t*2e3),u.t>.08&&H.bub.splice(x,1)}n[l]=c}e.sound.pcm(n,8e3,{vel:.6})},Ht=2/.045,y=[];let I=null,Q=null;const o0=(t,a)=>{const n={x:t,z:a,age:0},i=y[y.length-1];let s=0;for(const l of y)l.age<=2&&s++;s>=13&&i&&i.age===0?y[y.length-1]=n:y.push(n)},$0=t=>{const a=I,n=a.p[0]-a.tg[0],i=a.p[1]-a.tg[1],s=Math.exp(-Ht*t),l=a.v[0]+Ht*n,h=a.v[1]+Ht*i,c=[a.tg[0]+(n+l*t)*s,a.tg[1]+(i+h*t)*s],x=[(a.v[0]-Ht*l*t)*s,(a.v[1]-Ht*h*t)*s],u=y[y.length-1],F=Math.hypot(c[0]-u.x,c[1]-u.z);if(F>.06){const k=Math.min(4,Math.max(1,Math.ceil(F/.28))),r=a.p,b=a.v;for(let T=1;T<=k;T++){const S=T/k,D=S*S,W=D*S,Pt=2*W-3*D+1,Kt=(W-2*D+S)*t,ve=3*D-2*W,nt=(W-D)*t;o0(Pt*r[0]+Kt*b[0]+ve*c[0]+nt*x[0],Pt*r[1]+Kt*b[1]+ve*c[1]+nt*x[1])}}a.p=c,a.v=x},a0=()=>{const t=y.length;if(t>=2){const a=y[Math.max(0,t-4)],n=y[t-1],i=Math.hypot(n.x-a.x,n.z-a.z);i>.2&&(Q={x:n.x,z:n.z,dx:(n.x-a.x)/i,dz:(n.z-a.z)/i,age:0})}I=null};let A=null,s0=0,Me=0;return(t,a)=>{a=Math.min(Math.max(a||0,0),.25),xe++;const n=e.input,i=n.taps(),s=(c,x)=>{const u=Fe(c,x);u[0]<1||u[0]>47||u[1]<1||u[1]>92||(Ge(u[0],u[1],Z0(u[0],u[1]),.7+m()*.55,zt),e.sound.hit("kick",.45),e.sound.hit("noise",.3,{cutoff:2400,dur:.18}))};if(n.down){A||(A={x:n.x,y:n.y,t:0,mode:"press"}),A.t+=a;const c=Math.hypot(n.x-A.x,n.y-A.y);if(A.mode==="press"&&c>.025||A.mode==="hold"&&c>.05){A.mode="drag",I&&a0();const x=Fe(A.x,A.y);y.length=0,I={p:x,v:[0,0],tg:x,up:0},o0(x[0],x[1])}A.mode==="press"&&(A.t>.35&&c<.012||A.t>.8)&&(A.mode="hold"),A.mode==="drag"&&(I.tg=Fe(n.x,n.y))}else A&&A.mode==="drag"&&I&&(I.up=1),A&&A.mode==="press"?s(A.x,A.y):!A&&i.length&&s(i[i.length-1].x,i[i.length-1].y),A=null;const l=A&&A.mode==="hold";le+=((l?1:0)-le)*Math.min(1,a*(l?.9:.35));const h=z.pulse?K0(fe):0;if(re=z.q*(1+h+le*2.4),Qe(),zt){he+=a;let c=Math.floor(he/ct);if(he-=c*ct,c>6&&(c=6,he=0),fe+=c*ct,I){const r=y.length;$0(a);let b=0;for(let T=Math.max(1,r);T<y.length;T++)b+=Math.hypot(y[T].x-y[T-1].x,y[T].z-y[T-1].z);Me+=b,Me>.9&&t-s0>.04&&(e.sound.hit("noise",Math.min(.3,.12+b*.08),{cutoff:700+Math.min(900,b*500),dur:.1}),s0=t,Me=0),I.up&&Math.hypot(I.p[0]-I.tg[0],I.p[1]-I.tg[1])<.05&&a0()}if(de=[],c>0){let r=y.findIndex(b=>b.age<=2);r>=0&&(de=y.slice(Math.max(0,r-1)))}let x=-1,u=0;for(let r=Z.length-1;r>=0;r--){const b=Z[r],T=V[b.k];b.t+=a;const S=Math.min(1,b.t/.12);T.top=T.top0+(T.top1-T.top0)*S*S,Gt.push(b.k)}if(c>0&&Z.length){const r=Z[xe%Z.length],b=Math.min(1,r.t/.12);x=r.k,u=b-r.done,r.done=b,b>=1&&Z.splice(Z.indexOf(r),1)}let F=!1;for(const r of V)if(r&&r.sink>=0&&r.sink<1){const b=r.sink;r.sink=Math.min(1,r.sink+a),r.sunk+=r.thick*1.2*(Y(0,1,r.sink)-Y(0,1,b)),F=!0}g(46,Math.max(c,1),c>0&&Q?(Q.age+1)/3:0,x,u),Q&&g(63,Q.x,Q.z,Q.dx,Q.dz);const k=Gt.length>0;if(jt(ct,12+le*6,1-Math.exp(-a*(k?.8:3.2))),Ke(),V.length&&c>0&&(k||F||xe%4===0)){O(L.settle,xt[1-$].f,{tA:J[G].t,tST:xt[$].t},gt,1),$=1-$,ye();for(const r of V)r&&(r.sunk=0)}for(let r=0;r<c;r++)t0(r,r===c-1);if(c>0){for(const b of y)b.age++;let r=y.findIndex(b=>b.age<=2);r<0&&(r=y.length),r>1&&y.splice(0,r-1),!I&&r>=y.length-1&&y.length&&y[y.length-1].age>2&&(y.length=0),Q&&++Q.age>2&&(Q=null)}}else fe+=a,jt(ct,12);e0(),J0(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
