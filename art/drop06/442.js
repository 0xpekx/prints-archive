// Stream Table: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/442.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Se){Se&&function(){"use strict";const Rt=.005555555555555556,It=8,o0=`#version 300 es
out vec2 vUv;
void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }`,bt=`#version 300 es
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
`,a0=bt+`
uniform sampler2D tA, tF, tSM;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy);
  float dt = u[0].x, g = u[0].z, Cf = u[4].x;
  vec2 p = (vec2(c) + .5) * DX;
  vec4 a = texelFetch(tA, c, 0);
  // a dry cell sends nothing: the clamp below would cap every flux at 48 * 0 * DX
  if (a.y == 0.) { o = vec4(0.); return; }
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
}`,s0=bt+`
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
  // (still water, or none: the departure point is the cell itself, which bil would return exactly)
  float s = (v.x == 0. && v.y == 0. ? a.z : bil(tA, vec2(c) - v * dt / DX).z) + dt * srcRate * u[4].y;
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
}`,n0=bt+`
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
}`,c0=bt+`
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
}`,i0=bt+`
out vec4 o;
void main() { o = vec4(stoneTop((gl_FragCoord.xy) * DX), 0., 0., 0.); }`,r0=bt+`
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
}`,l0=bt+`
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
}`,f0=bt+`
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
}`,h0=`#version 300 es
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
}`,x0=`#version 300 es
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
}`,u0=bt+`
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
    // a pebble's own bound first (stoneShape's), so its data is fetched only when the point is over it
    for (int i = i0; i < i1; i++) { vec4 sa = u[7 + i]; vec2 dq = xz - sa.xy; if (dot(dq, dq) < sa.z * sa.z * 1.6) { float h = stoneShape(xz, sa, stoneB(i)); if (h > hs) { hs = h; hb = i; } } }
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
}`,d0=bt+`
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
}`,m0=`#version 300 es
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
}`,v0=`#version 300 es
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
}`;function et(t,e,c){const s=t.createProgram(),l=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(l,c),t.compileShader(l),t.attachShader(s,e),t.attachShader(s,l),s["_"+t.FRAGMENT_SHADER]=l,s}function Be(t,e,c){for(const s of c){const l=e[s];if(!t.getProgramParameter(l.p,t.LINK_STATUS))throw new Error("442 "+s+": "+t.getProgramInfoLog(l.p)+" "+t.getShaderInfoLog(l.p["_"+t.FRAGMENT_SHADER]));t.useProgram(l.p),l.u={};const f=t.getProgramParameter(l.p,t.ACTIVE_UNIFORMS);let u=0;for(let M=0;M<f;M++){const b=t.getActiveUniform(l.p,M),E=t.getUniformLocation(l.p,b.name);E&&(l.u[b.name]=E,(b.type===t.SAMPLER_2D||b.type===t.UNSIGNED_INT_SAMPLER_2D)&&(t.uniform1i(E,u),l.u[b.name+"#"]=u++))}const A=t.getUniformBlockIndex(l.p,"U");A!==t.INVALID_INDEX&&t.uniformBlockBinding(l.p,A,0)}}const p0=new Float32Array(4),b0=new Uint32Array(4);function wt(t,e,c,s,l,f,u,A){const M=t.createTexture();t.bindTexture(t.TEXTURE_2D,M),t.texStorage2D(t.TEXTURE_2D,u||1,s,e,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,l===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,f||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,f||t.CLAMP_TO_EDGE);const b=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,b),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,M,0),A===1?t.clearBufferfv(t.COLOR,0,p0):A===2&&t.clearBufferuiv(t.COLOR,0,b0),{t:M,f:b,w:e,h:c}}const w0=(()=>{const t=new Float32Array(1),e=new Uint32Array(t.buffer);return c=>{t[0]=c;const s=e[0],l=s>>>16&32768,f=(s>>>23&255)-112,u=s&8388607;return f<=0?l:f>=31?l|31743:l|f<<10|u>>>13}})();function Le(t){const e=t.createShader(t.VERTEX_SHADER);t.shaderSource(e,o0),t.compileShader(e);const c={grain:{p:et(t,e,h0)},noise:{p:et(t,e,x0)},flux:{p:et(t,e,a0)},bed:{p:et(t,e,s0)},mix:{p:et(t,e,n0)},settle:{p:et(t,e,c0)},stmap:{p:et(t,e,i0)},v0:{p:et(t,e,r0)},v1:{p:et(t,e,l0)},v3:{p:et(t,e,f0)},wave:{p:et(t,e,m0)},geo:{p:et(t,e,u0)},shade:{p:et(t,e,d0)},post:{p:et(t,e,v0)}};for(const s in c)t.linkProgram(c[s].p);return t.flush(),c}function y0(t,e,c,s){if(t.__c442)return t.__c442;const l=e||Le(t);Be(t,l,["grain","noise","flux","bed","mix","settle","stmap"]);const f={P:l,floatOK:c,halfOK:s,vao:t.createVertexArray(),trays:new Map,late:!0};f.ub=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,f.ub),t.bufferData(t.UNIFORM_BUFFER,64*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(f.vao),f.grain=wt(t,512,512,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,10),t.bindFramebuffer(t.FRAMEBUFFER,f.grain.f),t.viewport(0,0,512,512),t.useProgram(l.grain.p),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,f.grain.t),t.generateMipmap(t.TEXTURE_2D);const u=t.getExtension("EXT_texture_filter_anisotropic");return u&&t.texParameterf(t.TEXTURE_2D,u.TEXTURE_MAX_ANISOTROPY_EXT,4),f.noise=wt(t,256,256,t.RGBA8,t.LINEAR_MIPMAP_LINEAR,t.REPEAT,9),t.bindFramebuffer(t.FRAMEBUFFER,f.noise.f),t.viewport(0,0,256,256),t.useProgram(l.noise.p),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,f.noise.t),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.__c442=f,f}function Pt(t,e){const c=t.slice(2).padEnd(64,"0"),s=b=>parseInt(c.slice(b*8,b*8+8),16)>>>0;let l=(s(0)^Math.imul(e,2654435761)^Math.imul(s(4),2246822507))>>>0,f=(s(1)^Math.imul(s(5),3266489909))>>>0,u=(s(2)+e^Math.imul(s(6),668265263))>>>0,A=(s(3)^Math.imul(s(7),374761393))>>>0;const M=()=>{l>>>=0,f>>>=0,u>>>=0,A>>>=0;let b=l+f|0;return l=f^f>>>9,f=u+(u<<3)|0,u=u<<21|u>>>11,A=A+1|0,b=b+A|0,u=u+b|0,(b>>>0)/4294967296};for(let b=0;b<20;b++)M();return M.get=()=>[l,f,u,A],M.set=b=>{l=b[0],f=b[1],u=b[2],A=b[3]},M}function ft(t,e,c){const s=Math.max(0,Math.min(1,(c-t)/(e-t)));return s*s*(3-2*s)}function g0(t,e){const c={I0:new Int32Array(192),I1:new Int32Array(192),WX:new Float64Array(192),J0:new Int32Array(384),J1:new Int32Array(384),WY:new Float64Array(384)};for(let s=0;s<192;s++){const l=t((s+.5)*.25),f=Math.floor(l),u=l-f;c.WX[s]=u*u*(3-2*u),c.I0[s]=f&63,c.I1[s]=f+1&63}for(let s=0;s<384;s++){const l=e((s+.5)*.25),f=Math.floor(l),u=l-f;c.WY[s]=u*u*(3-2*u),c.J0[s]=(f&63)*64,c.J1[s]=(f+1&63)*64}return c}function Qt(t,e,c,s){const l=t.I0[c],f=t.I1[c],u=t.J0[s],A=t.J1[s],M=t.WX[c],b=t.WY[s];return(e[u+l]*(1-M)+e[u+f]*M)*(1-b)+(e[A+l]*(1-M)+e[A+f]*M)*b}function Et(t,e,c,s){const l=t.J0[c],f=t.J1[c],u=t.WY[c],A=t.I0,M=t.I1,b=t.WX;for(let E=0;E<192;E++){const C=A[E],st=M[E],H=b[E];s[E]=(e[l+C]*(1-H)+e[l+st]*H)*(1-u)+(e[f+C]*(1-H)+e[f+st]*H)*u}}let ie=null;const _e=t=>t<36?t:t-120;function F0(){if(ie)return ie;ie=new Float64Array(72*384);for(let t=0;t<384;t++){const e=(t+.5)*.25;for(let c=0;c<192;c++){const s=(c+.5)*.25,l=Math.min(s,48-s);l<9&&(ie[t*72+_e(c)]=.035*Math.sin(Math.hypot(l-9,e%13-6.5)*1.6)*ft(9,4,l))}}return ie}const M0=[[t=>t/11,t=>t/11],[t=>t/1.2+40,t=>t/1.2],[t=>t/1.5+61,t=>t/4],[t=>t/2.2+70,t=>t/2.2+30],[t=>t*2.6+90,t=>t/2.2+11],[t=>t/2,t=>t/2],[t=>t/3+20,t=>t/3],[t=>t*3+50,t=>t*3],[t=>t/3,t=>t/3],[t=>t/4,t=>t/30],[t=>t/5+33,t=>t/7],[t=>t/5,t=>t/5+20],[t=>t/6+3,t=>t/6],[t=>t/6+9,t=>t/9]];let qe=null;function Ne(t,e,c){let s=0;for(;s<t.length-2&&c>t[s+1];)s++;const l=Math.max(0,Math.min(1,(c-t[s])/(t[s+1]-t[s]))),f=e[Math.max(s-1,0)],u=e[s],A=e[s+1],M=e[Math.min(s+2,e.length-1)];return .5*(2*u+(-f+A)*l+(2*f-5*u+4*A-M)*l*l+(-f+3*u-3*A+M)*l*l*l)}function z0(t,e,c){const s=Math.floor(e),l=Math.floor(c);let f=e-s,u=c-l;f=f*f*(3-2*f),u=u*u*(3-2*u);const A=s&63,M=s+1&63,b=(l&63)*64,E=(l+1&63)*64;return(t[b+A]*(1-f)+t[b+M]*f)*(1-u)+(t[E+A]*(1-f)+t[E+M]*f)*u}function A0(t,e){const{nv:c,zs:s,channels:l,blocks:f,Wk:u,pwi:A,pwo:M,fill:b,base0:E,slope:C,A:st,M:H,gr:$t,nc:Xt,BL:Vt,VG:G,cX:re,cK:le,cHW:ut,cSQ:fe,cB:yt,cN:U,cO:K,cOK:w,cOB:dt,r0:gt,r6:Ft,r1:nt,r9:Ot,r13:Gt,r2:te,r4:Wt,r3:St,EG:me}=t,ct=(e+.5)*.25,kt=E+C*(96-ct);for(let g=0;g<Xt;g++){const B=l[g],ot=Ne(s,B.xs,ct),L=Ne(s,B.xs,ct-1.5),Yt=Ne(s,B.xs,ct+1.5),W=(L+Yt-2*ot)/(1.5*1.5),Y=(Yt-L)/3,Bt=Math.min(1,Math.abs(W)*18),Q=-Math.sign(W);re[g]=ot,le[g]=W,ut[g]=B.hw*(.9+.25*z0(c,ct/14+g*7,3)),fe[g]=Math.sqrt(1+Y*Y),yt[g]=Bt,U[g]=Q,K[g]=Q*Bt*.38,w[g]=Math.abs(W)>.004?1:0,dt[g]=ft(.002,.008,Math.abs(W))}Et(G[0],c,e,gt),Et(G[6],c,e,Ft),Et(G[1],c,e,nt),Et(G[9],c,e,Ot),Et(G[13],c,e,Gt),Et(G[2],c,e,te),Et(G[4],c,e,Wt),Et(G[3],c,e,St);for(let g=0;g<192;g++){const B=(g+.5)*.25,ot=(e*192+g)*4;let L=kt+(gt[g]-.5)*.16+(Ft[g]-.5)*.06+(nt[g]-.5)*.04;if(L+=Math.sin(B*2.3+Ot[g]*9)*.02*(.6+.8*Gt[g])-.016*ft(.8,.95,te[g]),Math.min(B,48-B)<9){const z=ft(.35,.6,Qt(G[10],c,g,e));z>0&&(L+=me[e*72+_e(g)]*z)}let W=0,Y=-1,Bt=0,Q=99,Ct=0,ee=0,he=0,it=0,Ht=0;for(let z=0;z<Xt;z++){const k=l[z],Mt=ut[z],zt=(B-re[z])/fe[z],X=yt[z],Lt=K[z],_=zt/Mt-Lt;if(Math.abs(_)>2.2){k.dry||(Q=Math.min(Q,Math.abs(zt)-Mt));continue}const Zt=Math.sign(_)===U[z],jt=Zt&&w[z]===1,q=Zt?dt[z]:0,P=1+(1-q)*(.35+.35*X*u),V=Math.abs(_)/P,xe=k.dry?2+3*q:A+(M-A)*q,_t=Math.max(0,1-Math.pow(V,xe));let Tt=k.D*_t*(jt&&!k.dry?1+.15*X*u*(1-V):1),I=0;if(!k.dry){if(jt||(I=.45*X*u*ft(.05,.75,V)),k.alt){const Z=Math.sin(ct*6.283/k.alt.l+k.alt.p),$=.55*Math.pow(Math.abs(Z),.6)*(1-X)*u*ft(-.2,.55,Math.sign(Z)*_);$>I&&(I=$),-Math.sign(Z)*_>.1&&Math.abs(Z)>.3&&_t>.2&&(it=Math.max(it,Math.abs(Z)*(1-X)*_t))}if(Tt=Math.max(0,Tt-k.D*I),I>.08&&_t>0&&(ee=Math.max(ee,I/.45),he=V),jt&&V<.85&&_t>.1&&(it=Math.max(it,X*(1-V))),(jt||k.alt)&&Math.abs(_)>.3&&Math.abs(_)<1.5){const Z=Math.floor(ct/Vt);for(let $=Z-1;$<=Z+1;$++){const tt=f[z][($%100+100)%100];if(!tt.on||!k.alt&&X<.2)continue;const y=($+tt.u)*Vt,Ee=k.alt?Math.sin(y*6.283/k.alt.l+k.alt.p)>0?-1:1:-Math.sign(le[z]),Nt=zt-(Ee*tt.n0+Lt)*Mt,At=ct-y,mt=tt.cr,D=tt.sr,oe=(mt*Nt+D*At)/tt.s,ae=(-D*Nt+mt*At)/(tt.s*1.3),se=Math.abs(oe),j=Math.abs(ae),J=Math.cbrt(se*se*se+j*j*j);J<1&&(Ht=Math.max(Ht,tt.h*k.D*(1-J*J)*(.8+.4*Qt(G[7],c,g,e))))}}}Tt>W&&(W=Tt),Math.abs(_)<1.1&&ct>1&&!k.dry&&(Bt=1,Y=Math.max(Y,kt-k.D+b*k.D)),k.dry?Tt>.05&&(Ct=Math.max(Ct,Tt/k.D)):Q=Math.min(Q,Math.abs(zt)-Mt)}L-=W,Q>0&&Q<5&&(L-=.05*(ft(3.2,2.9,Q)+ft(1.6,1.35,Q))*(.5+Qt(G[12],c,g,e))),L=Math.max(L,Math.min(L+Ht,kt-.08));const Re=Bt?Math.max(0,Y-L):0;st[ot]=L,st[ot+1]=Re,st[ot+2]=0,st[ot+3]=Ht>.02?.6:0;const ve=Math.min(.45,Math.max(.12,.5-(L-kt)*1.3));H[ot]=Q>8.5?ve:Math.max(ve,Math.exp(-Math.max(0,Q)/4));const Kt=Wt[g];let ht=Ct>0?.12+.35*Ct*Qt(G[5],c,g,e):W>.2?.3:.07+.08*Qt(G[11],c,g,e);it>.05&&(ht=Math.max(ht,(.3+.5*it*u)*(.55+.45*ft(.2,.8,Kt+it*.2)))),ee>.2&&(ht=Math.min(ht,.03+.08*(.5+.5*Math.sin(he*15+Qt(G[8],c,g,e)*4)))),Ht>.02&&(ht=.15),H[ot+1]=ht,H[ot+2]=Ht>.02?.8:0,H[ot+3]=.55+.9*(.94*St[g]+.06*$t())}}function k0(t){const e=t.channels.length,c=Object.assign({nc:e,BL:2,VG:qe||(qe=M0.map(s=>g0(s[0],s[1]))),EG:F0()},t);for(const s of["cX","cK","cHW","cSQ","cB","cN","cO","cOB"])c[s]=new Float64Array(e);c.cOK=new Int32Array(e);for(const s of["r0","r6","r1","r9","r13","r2","r4","r3"])c[s]=new Float64Array(192);for(let s=0;s<384;s++)A0(c,s)}const Dt=(t,e)=>{let c=0;for(const l of e)c+=l.w;let s=t()*c;for(const l of e)if(s-=l.w,s<0)return l;return e[e.length-1]},Ue=[{n:"Quartz and Black Sand",w:40,a:[.56,.48,.37],b:[.51,.4,.3],alt:.3,heavy:[.05,.05,.06],wetD:.95},{n:"Garnet Sand",w:22,a:[.55,.44,.42],b:[.5,.38,.38],alt:.25,heavy:[.33,.09,.12],wetD:.92},{n:"Pale Silica",w:20,a:[.55,.53,.48],b:[.51,.48,.42],alt:.2,heavy:[.36,.33,.28],wetD:1.05},{n:"Olivine Grit",w:10,a:[.29,.34,.22],b:[.38,.41,.3],alt:.25,heavy:[.04,.05,.045],wetD:.9},{n:"Iron Red",w:8,a:[.52,.32,.24],b:[.58,.42,.34],alt:.3,heavy:[.07,.05,.05],wetD:1}],Ie=[{n:"North Window",w:44,az:-.42,el:.24,col:[.95,.98,1.04],I:3,soft:7,fill:1.15,hard:.55,lo:[.05,.043,.036],hi:[.15,.135,.12],win:[-.42,.12,.5,.2],wc:[2.4,2.5,2.65],mull:4,lamp:0,exp:.6,fix:[.74,.32,.55,.075]},{n:"Bench Lamp",w:26,az:.55,el:.3,col:[1,.8,.6],I:4.4,soft:12,fill:.45,hard:.9,lo:[.035,.035,.04],hi:[.1,.1,.11],win:[-1.6,.3,.25,.2],wc:[.18,.2,.24],mull:2,lamp:1,exp:.95,fix:[.9,.3,.06,.03]},{n:"Skylight",w:22,az:-.25,el:.85,col:[.96,.98,1],I:1.45,soft:2.5,fill:1.1,hard:.6,lo:[.045,.043,.04],hi:[.15,.15,.16],win:[-.15,1.05,.7,.32],wc:[1.6,1.65,1.75],mull:4,lamp:0,exp:.5,fix:[.62,.3,.4,.05]},{n:"Low Sun Through Blinds",w:8,az:-.85,el:.24,col:[1,.82,.62],I:4.4,soft:12,fill:1,hard:.9,lo:[.04,.045,.06],hi:[.12,.13,.16],win:[-.85,.3,.32,.26],wc:[.9,.85,.8],mull:2,lamp:1,exp:.9,blinds:1,fix:[.8,.3,.1,.03]}],Pe=[{n:"Gentle",w:50,s:.01,amp:1.2,D:1,W:.95},{n:"Moderate",w:35,s:.016,amp:.95,D:1,W:1.05},{n:"Steep",w:15,s:.026,amp:.5,D:.72,W:1.3,alt:1}],Ve=[{n:"Trickle",w:25,q:13,pulse:0,fill:.32},{n:"Steady",w:50,q:20,pulse:0,fill:.5},{n:"Pulsing",w:25,q:19,pulse:1,fill:.58}],Oe=[{n:"Pilot Meander",w:50},{n:"Straight Cut",w:28},{n:"Two Arms",w:22}],Ge=[{n:"Firm",w:45,tw:2.1,pwo:5,pwi:2.2,W:.85,D:1,blk:.4},{n:"Crumbly",w:40,tw:1.45,pwo:4,pwi:2,W:1.05,D:1,blk:.8},{n:"Loose",w:15,tw:1,pwo:1.7,pwi:1.4,W:1.55,D:.62,blk:0,alt:1}],We=[{n:"Low and Close",w:55},{n:"Straight Down",w:20},{n:"At the Water",w:15},{n:"From the Header",w:10}],Ye=[{n:"None",w:40,k:0},{n:"One Pebble",w:40,k:1},{n:"Three Pebbles",w:20,k:3}];Se.add({num:442,name:"Stream Table",fam:"Worlds",recipe:"A lab tray of wet sand in a dim room with a tiny river that actually carves bends, drops sand on the inside of turns and undercuts banks until they slump. The sand, the tilt, the flow and where you're looking from change every mint. Tap to drop a pebble in, drag to draw a groove with your finger, or hold still to open the tap and flood the table.",interactive:"Tap to drop a pebble in; drag to draw a groove with your finger; hold still to open the tap and flood the table.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,c=t.size,s=e.__c442,l=s?s.floatOK:!!e.getExtension("EXT_color_buffer_float"),f=s?s.halfOK:l||!!e.getExtension("EXT_color_buffer_half_float"),u=s?null:Le(e),A=l?e.RGBA32F:e.RGBA16F,M=f,b=M?1:0,E=(o,a,n)=>wt(e,192,384,o,a||e.NEAREST,0,0,n),C=[E(A),E(A,0,b)],st=[E(A,0,b),E(A,0,b)],H=[E(e.RGBA16F),E(e.RGBA16F,0,b)],$t=E(e.RGBA16F,e.LINEAR,b),Xt=wt(e,192*2,384*2,e.RGBA16F,e.LINEAR,0,0,b),Vt=E(e.RGBA16F,e.LINEAR,b),G=wt(e,192*2,384*2,f?e.RGBA16F:e.RGBA8,e.LINEAR,0,0,1),re=wt(e,c,c,M?e.RGBA16F:e.RGBA8,e.LINEAR,0,0,1),le=wt(e,c,c,e.RG32UI,e.NEAREST,0,0,2),ut=[wt(e,It,1,A,e.NEAREST,0,0,b),wt(e,It,1,A,e.NEAREST,0,0,b)],fe=wt(e,192,384,e.RGBA16F,e.NEAREST,0,0,b);e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush();const yt=Pt(t.hash,1),U=Pt(t.hash,2);let K=Dt(yt,Ue),w=Dt(yt,Ie),dt=Dt(yt,Pe),gt=Dt(yt,Ve),Ft=Dt(yt,Oe),nt=Dt(yt,Ge),Ot=Dt(yt,Ye);t.home&&(K=Ue[0],w=Ie[0],dt=Pe[0],gt=Ve[1],Ft=Oe[0],nt=Ge[0],Ot=Ye[1]),t.trait("Sand",K.n),t.trait("Light",w.n),t.trait("Tilt",dt.n),t.trait("Flow",gt.n);const Gt=t.home?We[0]:Dt(Pt(t.hash,23),We);t.trait("Start",Ft.n),t.trait("Banks",nt.n),t.trait("Pebbles",Ot.n),t.trait("View",Gt.n);const te=dt.s,Wt=2,St=o=>Wt+te*(96-o),me=64,ct=new Float32Array(me*me);for(let o=0;o<ct.length;o++)ct[o]=U();const kt=48/2+(U()-.5)*3,g=[],B=[],ot=[],L=o=>(U()-.5)*o;let Yt;if(Ft.n==="Straight Cut"){const o=kt-7+L(5),a=kt+3+L(4);Yt=n=>o+(a-o)*(n-18)/62}else{const o=t.home||U()<.5?1:-1,a=[-1,-2,-5,6,-6,3,0,0,0],n=t.home?1:dt.amp;Yt=(i,r)=>kt+o*a[r]*n+(t.home?0:L(4)*Math.min(1,r/3)*n)}for(let o=0;o<9;o++){const a=-18+18*o+(o>1&&o<7?L(4):0);g.push(a),B.push(Yt(a,o))}const W=(o,a)=>{let n=0;for(;n<g.length-2&&a>g[n+1];)n++;const i=Math.max(0,Math.min(1,(a-g[n])/(g[n+1]-g[n]))),r=o[Math.max(n-1,0)],d=o[n],p=o[n+1],h=o[Math.min(n+2,o.length-1)];return .5*(2*d+(-r+p)*i+(2*r-5*d+4*p-h)*i*i+(-r+3*d-3*p+h)*i*i*i)},Y=Pt(t.hash,13),Bt=t.home?1:.6+.4*Y(),Q=!t.home&&Y()<.22,Ct=()=>({l:15+9*Y(),p:Y()*6.283}),ee=dt.W*nt.W,he=dt.D*nt.D,it=[];if(it.push({xs:B,hw:(gt.q<15?1.8:2.2)*ee,D:1*he,alt:dt.alt||nt.alt||Ft.n==="Straight Cut"?Ct():null}),Ft.n==="Two Arms"){for(let o=0;o<9;o++)ot.push(B[o]+(o>=2&&o<=5?o%2?6:-5:0));it.push({xs:ot,hw:1.6*ee,D:.8*he,alt:dt.alt||nt.alt?Ct():null})}if(Ft.n==="Pilot Meander"||Ft.n==="Straight Cut"){const o=[],a=t.home||U()<.5?1:-1;for(let n=0;n<9;n++)o.push(B[n]+a*(9+4*Math.sin(n*1.7+U()*2))+L(3));Q||it.push({xs:o,hw:1.7,D:.32,dry:1})}const Ht=2,Re=it.map(()=>{const o=[];for(let a=0;a<100;a++)o.push({on:Y()<nt.blk*Bt*.45,u:Y(),s:.3+.35*Y(),h:.2+.3*Y(),n0:.7+.25*Y(),r:Y()*1.5});for(const a of o)a.cr=Math.cos(a.r),a.sr=Math.sin(a.r);return o}),ve=W(B,5),Kt=t.hash+(t.home?"h":""),ht=s&&s.trays.get(Kt);let z,k,Mt=null;if(ht)s.trays.delete(Kt),s.trays.set(Kt,ht),z=ht.A.slice(),k=ht.M,U.set(ht.g);else{z=new Float32Array(192*384*4),k=new Float32Array(192*384*4);const o=it.map(a=>({xs:a.xs,hw:a.hw,D:a.D,alt:a.alt||null,dry:a.dry?1:0}));k0({nv:ct,zs:g,channels:o,blocks:Re,Wk:Bt,pwi:nt.pwi,pwo:nt.pwo,fill:gt.fill,base0:Wt,slope:te,A:z,M:k,gr:U}),Mt={A:z.slice(),M:k,g:U.get()},s&&(s.trays.set(Kt,Mt),s.trays.size>2&&s.trays.delete(s.trays.keys().next().value),Mt=null)}const zt=(o,a)=>{const n=Math.max(0,Math.min(191,Math.floor(o/.25))),i=Math.max(0,Math.min(383,Math.floor(a/.25)));return z[(i*192+n)*4]},X=[],Lt=[],_=[];let Zt=0;const jt=(o,a,n,i,r)=>{const d=i*(.46+.14*U()),p=Zt;if(Zt=(Zt+1)%It,X[p]={x:o,z:a,r:i,ang:U()*6.283,top:n+d*.86,thick:d,seed:U()*10,floor:n+d*.62,sink:-1,sunk:0},r){const m=X[p];m.top1=m.top,m.top0=n+d*1.04,m.top=m.top0;for(let v=_.length-1;v>=0;v--)_[v].k===p&&_.splice(v,1);_.push({k:p,t:0,done:0})}Lt.push(p);const h=X[Zt];X.length===It&&h&&h.sink<0&&(h.sink=0,h.floor=-9)};if(Ot.k>0){const o=[64,70,46];for(let a=0;a<Ot.k;a++){const n=o[a]+(t.home?0:L(6)),i=W(B,n),r=a===1?-1:1,d=t.home?i-1.1:i+r*(.8+U()*1.4);jt(d,n,zt(d,n),.8+U()*.6)}for(const a of X){const n=Math.cos(a.ang),i=Math.sin(a.ang),r=a.r*2.2,d=a.seed*2.3,p=a.seed*1.7;for(let h=Math.max(0,Math.floor((a.z-r)/.25));h<=Math.min(383,Math.ceil((a.z+r)/.25));h++)for(let m=Math.max(0,Math.floor((a.x-r)/.25));m<=Math.min(191,Math.ceil((a.x+r)/.25));m++){const v=(m+.5)*.25-a.x,R=(h+.5)*.25-a.z,S=n*v+i*R,x=(-i*v+n*R)*1.45,F=Math.hypot(S,x)+1e-5,O=F/a.r,lt=S/F,pt=x/F,ce=.55+.45*(.6*(lt*Math.cos(d)+pt*Math.sin(d))+.4*((lt*lt-pt*pt)*Math.cos(p)+2*lt*pt*Math.sin(p))),Te=1.1*(1+.15*(lt*Math.sin(p+1)+pt*Math.cos(p+1)));O<2.2&&(z[(h*192+m)*4]+=a.thick*.2*(.45+.9*ce)*Math.exp(-(((O-Te)/.45)**2))*ft(.2,-.9,R/a.r))}}}const q=y0(e,u,l,f),P=q.P;Mt&&(q.trays.set(Kt,Mt),q.trays.size>2&&q.trays.delete(q.trays.keys().next().value));let V=0;const xe=()=>rt(P.stmap,fe.f,{tST:ut[V].t},192,384),_t=()=>{for(const o of Lt){const a=X[o].top;for(const n of ut)e.bindTexture(e.TEXTURE_2D,n.t),q.floatOK?e.texSubImage2D(e.TEXTURE_2D,0,o,0,1,1,e.RGBA,e.FLOAT,new Float32Array([a,0,0,0])):e.texSubImage2D(e.TEXTURE_2D,0,o,0,1,1,e.RGBA,e.HALF_FLOAT,new Uint16Array([w0(a),0,0,0]))}Lt.length=0};_t();const Tt=(o,a)=>{e.bindTexture(e.TEXTURE_2D,o),e.texSubImage2D(e.TEXTURE_2D,0,0,0,192,384,e.RGBA,e.FLOAT,a)};Tt(C[0].t,z),Tt(H[0].t,k);let I=0,Z=0,$=0;const tt=new Float32Array(64*4),y=(o,a,n,i,r)=>{tt[o*4]=a,tt[o*4+1]=n,tt[o*4+2]=i,tt[o*4+3]=r},Ee=nt.tw;let Nt=.4,At=.05,mt=95,D=[kt,St(mt)+15,mt],oe=24,ae=52,se=1;if(Gt.n==="Straight Down")Nt=1.5,At=0,mt=52,D=[W(B,52)+2,St(52)+50,mt],oe=49,se=.86;else if(Gt.n==="At the Water"){Nt=.24,At=.08,mt=93;const o=W(B,93)+1.4;D=[o,zt(o,93)+3.6,mt],oe=20,ae=72}else Gt.n==="From the Header"&&(Nt=.5,At=Math.PI-.04,mt=3,D=[W(B,10),St(3)+15,mt],oe=26,ae=34);const j=[Math.sin(At)*Math.cos(Nt),-Math.sin(Nt),-Math.cos(At)*Math.cos(Nt)],J=[Math.cos(At),0,Math.sin(At)],ne=[J[1]*j[2]-J[2]*j[1],J[2]*j[0]-J[0]*j[2],J[0]*j[1]-J[1]*j[0]],pe=1/Math.tan(.297),qt=[Math.sin(w.az)*Math.cos(w.el),Math.sin(w.el),-Math.cos(w.az)*Math.cos(w.el)],Ce=[[.44,.47,.42,.4],[.58,.44,.33,.3],[.72,.7,.66,.15],[.5,.48,.45,.55],[.32,.315,.31,.3]];U();const be=t.home?Ce[3]:Ce[Math.floor(Pt(t.hash,21)()*5)];(()=>{if(y(24,D[0],D[1],D[2],pe),y(25,j[0],j[1],j[2],0),y(26,J[0],J[1],J[2],0),y(27,ne[0],ne[1],ne[2],0),y(28,qt[0],qt[1],qt[2],w.soft),y(29,w.col[0]*w.I,w.col[1]*w.I,w.col[2]*w.I,w.blinds?1:0),y(30,w.lo[0],w.lo[1],w.lo[2],0),y(31,w.hi[0],w.hi[1],w.hi[2],0),y(32,K.a[0],K.a[1],K.a[2],0),y(33,K.b[0],K.b[1],K.b[2],K.alt),y(34,K.heavy[0],K.heavy[1],K.heavy[2],0),y(36,w.win[0],w.win[1],w.win[2],w.win[3]),y(37,w.wc[0],w.wc[1],w.wc[2],w.mull),y(38,48,96,te,Wt),y(39,be[0],be[1],be[2],be[3]),y(41,qt[0],qt[1],qt[2],w.lamp),y(44,w.fix[0],w.fix[1],w.fix[2],w.fix[3]),y(45,6,6,0,0),y(47,w.fill,w.hard,0,0),y(48,W(B,ae)+7,ae-6,34,w.lamp&&!w.blinds?1:0),w.blinds){const o=qt[0],a=qt[2],n=Math.hypot(o,a);y(42,o/n,a/n,2.6,1)}else y(42,0,0,1,0);y(2,7.5,65e-6,4,3),y(3,Ee,.75,.6,.12),y(4,.022,0,2.5,Wt)})();let we=gt.q,ye=0,ge=0,Fe=0,Me=0;const Ut=Pt(t.hash,14),Jt=[{t0:-6,r:3,f:7,h:.75}];let ze=-6;const T0=o=>{for(;ze<o+60;){ze+=8+32*Ut()*Ut()+(Ut()<.15?25:0);const n=Ut()<.18;Jt.push(n?{t0:ze,r:5,f:18+15*Ut(),h:-.3}:{t0:ze,r:1.5+3*Ut(),f:4+9*Ut(),h:.3+.7*Ut()})}for(;Jt.length>1&&Jt[0].t0+Jt[0].r+Jt[0].f*6<o;)Jt.shift();let a=-.2;for(const n of Jt){const i=o-n.t0;i>0&&(a+=n.h*(i<n.r?i/n.r*(i/n.r)*(3-2*i/n.r):Math.exp(-(i-n.r)/n.f)))}return Math.max(-.5,a)};let Ae=[];const ue=(o,a,n)=>{y(0,o,a,981,n||0),y(1,we,ve,5,1.4),y(6,.55,.5,Ae.length,X.length);for(let i=0;i<14;i++){const r=Ae[i];r&&y(49+i,r.x,r.z,r.age>=2?1:(r.age+1)/3,0)}for(let i=0;i<It;i++){const r=X[i];r?(y(7+i,r.x,r.z,r.r,r.ang),y(15+i,r.sunk,r.thick,r.seed,r.floor)):(y(7+i,-99,-99,.01,0),y(15+i,0,0,0,0))}y(35,ge,K.wetD,2.3*c/1e3,w.exp*se),y(43,oe,0,0,0),y(40,c,Me,2*c/1e3,0),e.bindBuffer(e.UNIFORM_BUFFER,q.ub),e.bufferSubData(e.UNIFORM_BUFFER,0,tt),e.bindBufferBase(e.UNIFORM_BUFFER,0,q.ub)},rt=(o,a,n,i,r)=>{e.bindFramebuffer(e.FRAMEBUFFER,a),e.viewport(0,0,i,r),e.useProgram(o.p);for(const d in n)e.activeTexture(e.TEXTURE0+o.u[d+"#"]),e.bindTexture(e.TEXTURE_2D,n[d]);e.drawArrays(e.TRIANGLES,0,3)},He=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(q.vao)},Ke=(o,a)=>{rt(P.flux,st[1-Z].f,{tA:C[I].t,tF:st[Z].t,tSM:fe.t},192,384),Z=1-Z,e.useProgram(P.bed.p),e.uniform1i(P.bed.u.uSub,o),rt(P.bed,C[1-I].f,{tA:C[I].t,tF:st[Z].t,tM:H[$].t},192,384),a&&(rt(P.mix,H[1-$].f,{tA0:C[I].t,tA:C[1-I].t,tF:st[Z].t,tM:H[$].t},192,384),$=1-$),I=1-I};if(!M){const o=new Float32Array(294912),a=new Float32Array(192*384*16),n=new Float32Array(192*384*4),i=(r,d)=>(Math.max(0,Math.min(383,d))*192+Math.max(0,Math.min(191,r)))*4;for(let r=0;r<384;r++)for(let d=0;d<192;d++){const p=i(d,r);let h=0,m=0,v=0;for(let S=-1;S<=1;S++)for(let x=-1;x<=1;x++){const F=i(d+x,r+S);v+=z[F]*(2-Math.abs(x))*(2-Math.abs(S)),z[F+1]>.003&&(h+=z[F]+z[F+1],m++)}let R=m?h/m:z[p]-.25;R=z[p+1]>.003?.5*(z[p]+z[p+1]+R):Math.min(R,z[p]-.004),o[p]=z[p]*.3+.7*v/16,o[p+1]=R,o[p+2]=k[p],n[p+2]=k[p+1],n[p+3]=Math.max(k[p+2],z[p+3]*.5)}for(let r=0;r<384*2;r++)for(let d=0;d<192*2;d++){const p=d*.5-.25,h=r*.5-.25,m=Math.floor(p),v=Math.floor(h),R=p-m,S=h-v,x=(r*192*2+d)*4;for(let F=0;F<2;F++)a[x+F]=(o[i(m,v)+F]*(1-R)+o[i(m+1,v)+F]*R)*(1-S)+(o[i(m,v+1)+F]*(1-R)+o[i(m+1,v+1)+F]*R)*S;a[x+2]=(o[i(m+1,v)]-o[i(m-1,v)])/(2*.25),a[x+3]=(o[i(m,v+1)]-o[i(m,v-1)])/(2*.25)}for(const[r,d,p,h]of[[$t,o,192,384],[Xt,a,192*2,384*2],[Vt,n,192,384]])e.bindTexture(e.TEXTURE_2D,r.t),e.texSubImage2D(e.TEXTURE_2D,0,0,0,p,h,e.RGBA,e.FLOAT,d)}const Ze=()=>{M&&(rt(P.v0,$t.f,{tA:C[I].t,tM:H[$].t},192,384),rt(P.v1,Xt.f,{tV0:$t.t},192*2,384*2),rt(P.v3,Vt.f,{tA:C[I].t,tF:st[Z].t,tM:H[$].t},192,384)),rt(P.wave,G.f,{tV1:Xt.t,tV3:Vt.t,tNoise:q.noise.t},192*2,384*2),rt(P.geo,le.f,{tV1:Xt.t,tST:ut[V].t},c,c),rt(P.shade,re.f,{tV0:$t.t,tV1:Xt.t,tV3:Vt.t,tGrain:q.grain.t,tNoise:q.noise.t,tST:ut[V].t,tW:G.t,tG:le.t},c,c),e.flush(),rt(P.post,null,{tS:re.t},c,c)};if(He(),M){ue(Rt,14,.3),xe(),y(46,1,0,0,0),e.bindBuffer(e.UNIFORM_BUFFER,q.ub),e.bufferSubData(e.UNIFORM_BUFFER,0,tt);for(let o=0;o<150;o++)Ke(1,!0),o%30===29&&X.length&&(rt(P.settle,ut[1-V].f,{tA:C[I].t,tST:ut[V].t},It,1),V=1-V,xe());ue(Rt,14)}else ue(Rt,14);q.late&&(Be(e,P,["v0","v1","v3","wave","geo","shade","post"]),q.late=!1),Ze();const De=(o,a)=>{const n=o*2-1,i=1-a*2,r=[j[0]*pe+J[0]*n+ne[0]*i,j[1]*pe+J[1]*n+ne[1]*i,j[2]*pe+J[2]*n+ne[2]*i],d=Math.hypot(r[0],r[1],r[2]);let p=0,h=.2;for(let R=0;R<400&&h<400;R++){if(D[1]+r[1]/d*h<zt(D[0]+r[0]/d*h,D[2]+r[2]/d*h)){for(let S=0;S<8;S++){const x=.5*(p+h);D[1]+r[1]/d*x<zt(D[0]+r[0]/d*x,D[2]+r[2]/d*x)?h=x:p=x}return[D[0]+r[0]/d*h,D[2]+r[2]/d*h]}p=h,h+=Math.max(.08,h*.015)}let m=0,v=St(D[2]-20);for(let R=0;R<3;R++){m=(v-D[1])/r[1];const S=D[2]+r[2]*m;v=St(S)-.2}return[D[0]+r[0]*m,D[2]+r[2]*m]},N0=(o,a)=>{let n=zt(o,a);if(q.floatOK){try{const i=new Float32Array(4);e.bindFramebuffer(e.FRAMEBUFFER,C[I].f),e.readPixels(Math.max(0,Math.min(191,Math.floor(o/.25))),Math.max(0,Math.min(383,Math.floor(a/.25))),1,1,e.RGBA,e.FLOAT,i),isFinite(i[0])&&i[0]>0&&(n=i[0])}catch{}e.bindFramebuffer(e.FRAMEBUFFER,null)}return n},ke=Pt(t.hash,9),xt={lp:0,lp2:0,bub:[]},R0=o=>{if(t.sound.on===!1)return;const a=Math.min(900,Math.round(o*8e3));if(a<8)return;const n=new Float32Array(a),i=.22*Math.sqrt(we/20),r=7*we/20;for(let d=0;d<a;d++){const p=ke()*2-1;xt.lp+=(p-xt.lp)*.32,xt.lp2+=(xt.lp-xt.lp2)*.08;let h=(xt.lp-xt.lp2)*i;ke()<r/8e3&&xt.bub.length<6&&xt.bub.push({f:500+ke()*1300,ph:0,a:.08+ke()*.12,t:0});for(let m=xt.bub.length-1;m>=0;m--){const v=xt.bub[m];v.t+=1/8e3,v.ph+=v.f*(1+v.t*12)/8e3,h+=Math.sin(v.ph*6.2832)*v.a*Math.exp(-v.t*70)*Math.min(1,v.t*2e3),v.t>.08&&xt.bub.splice(m,1)}n[d]=h}t.sound.pcm(n,8e3,{vel:.6})},de=2/.045,T=[];let at=null,vt=null;const je=(o,a)=>{const n={x:o,z:a,age:0},i=T[T.length-1];let r=0;for(const d of T)d.age<=2&&r++;r>=13&&i&&i.age===0?T[T.length-1]=n:T.push(n)},E0=o=>{const a=at,n=a.p[0]-a.tg[0],i=a.p[1]-a.tg[1],r=Math.exp(-de*o),d=a.v[0]+de*n,p=a.v[1]+de*i,h=[a.tg[0]+(n+d*o)*r,a.tg[1]+(i+p*o)*r],m=[(a.v[0]-de*d*o)*r,(a.v[1]-de*p*o)*r],v=T[T.length-1],R=Math.hypot(h[0]-v.x,h[1]-v.z);if(R>.06){const S=Math.min(4,Math.max(1,Math.ceil(R/.28))),x=a.p,F=a.v;for(let O=1;O<=S;O++){const lt=O/S,pt=lt*lt,ce=pt*lt,Te=2*ce-3*pt+1,$e=(ce-2*pt+lt)*o,t0=3*pt-2*ce,e0=(ce-pt)*o;je(Te*x[0]+$e*F[0]+t0*h[0]+e0*m[0],Te*x[1]+$e*F[1]+t0*h[1]+e0*m[1])}}a.p=h,a.v=m},Je=()=>{const o=T.length;if(o>=2){const a=T[Math.max(0,o-4)],n=T[o-1],i=Math.hypot(n.x-a.x,n.z-a.z);i>.2&&(vt={x:n.x,z:n.z,dx:(n.x-a.x)/i,dz:(n.z-a.z)/i,age:0})}at=null};let N=null,Qe=0,Xe=0;return(o,a)=>{a=Math.min(Math.max(a||0,0),.25),Me++;const n=t.input,i=n.taps(),r=(h,m)=>{const v=De(h,m);v[0]<1||v[0]>47||v[1]<1||v[1]>92||(jt(v[0],v[1],N0(v[0],v[1]),.7+U()*.55,M),t.sound.hit("kick",.45),t.sound.hit("noise",.3,{cutoff:2400,dur:.18}))};if(n.down){N||(N={x:n.x,y:n.y,t:0,mode:"press"}),N.t+=a;const h=Math.hypot(n.x-N.x,n.y-N.y);if(N.mode==="press"&&h>.025||N.mode==="hold"&&h>.05){N.mode="drag",at&&Je();const m=De(N.x,N.y);T.length=0,at={p:m,v:[0,0],tg:m,up:0},je(m[0],m[1])}N.mode==="press"&&(N.t>.35&&h<.012||N.t>.8)&&(N.mode="hold"),N.mode==="drag"&&(at.tg=De(n.x,n.y))}else N&&N.mode==="drag"&&at&&(at.up=1),N&&N.mode==="press"?r(N.x,N.y):!N&&i.length&&r(i[i.length-1].x,i[i.length-1].y),N=null;const d=N&&N.mode==="hold";ye+=((d?1:0)-ye)*Math.min(1,a*(d?.9:.35));const p=gt.pulse?T0(ge):0;if(we=gt.q*(1+p+ye*2.4),He(),M){Fe+=a;let h=Math.floor(Fe/Rt);if(Fe-=h*Rt,h>6&&(h=6,Fe=0),ge+=h*Rt,at){const x=T.length;E0(a);let F=0;for(let O=Math.max(1,x);O<T.length;O++)F+=Math.hypot(T[O].x-T[O-1].x,T[O].z-T[O-1].z);Xe+=F,Xe>.9&&o-Qe>.04&&(t.sound.hit("noise",Math.min(.3,.12+F*.08),{cutoff:700+Math.min(900,F*500),dur:.1}),Qe=o,Xe=0),at.up&&Math.hypot(at.p[0]-at.tg[0],at.p[1]-at.tg[1])<.05&&Je()}if(Ae=[],h>0){let x=T.findIndex(F=>F.age<=2);x>=0&&(Ae=T.slice(Math.max(0,x-1)))}let m=-1,v=0;for(let x=_.length-1;x>=0;x--){const F=_[x],O=X[F.k];F.t+=a;const lt=Math.min(1,F.t/.12);O.top=O.top0+(O.top1-O.top0)*lt*lt,Lt.push(F.k)}if(h>0&&_.length){const x=_[Me%_.length],F=Math.min(1,x.t/.12);m=x.k,v=F-x.done,x.done=F,F>=1&&_.splice(_.indexOf(x),1)}let R=!1;for(const x of X)if(x&&x.sink>=0&&x.sink<1){const F=x.sink;x.sink=Math.min(1,x.sink+a),x.sunk+=x.thick*1.2*(ft(0,1,x.sink)-ft(0,1,F)),R=!0}y(46,Math.max(h,1),h>0&&vt?(vt.age+1)/3:0,m,v),vt&&y(63,vt.x,vt.z,vt.dx,vt.dz);const S=Lt.length>0;if(ue(Rt,12+ye*6,1-Math.exp(-a*(S?.8:3.2))),_t(),X.length&&h>0&&(S||R||Me%4===0)){rt(P.settle,ut[1-V].f,{tA:C[I].t,tST:ut[V].t},It,1),V=1-V,xe();for(const x of X)x&&(x.sunk=0)}for(let x=0;x<h;x++)Ke(x,x===h-1);if(h>0){for(const F of T)F.age++;let x=T.findIndex(F=>F.age<=2);x<0&&(x=T.length),x>1&&T.splice(0,x-1),!at&&x>=T.length-1&&T.length&&T[T.length-1].age>2&&(T.length=0),vt&&++vt.age>2&&(vt=null)}}else ge+=a,ue(Rt,12);Ze(),R0(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
