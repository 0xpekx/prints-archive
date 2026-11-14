// Shaking Dish: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/121.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(wt){wt&&function(){"use strict";const Mt=new WeakMap,te=.8,ee=.7,oe=1,ae=.6,re=4e-4,Z0=[.9,.96,1],ne=10,se=[.74,.81,.95,.034],j=`
`,Z="#version 300 es"+j+"precision highp float;"+j+"precision highp int;"+j+"precision highp sampler2D;"+j,Et=Z+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",bt=`
#ifdef ENC8
vec2 S(ivec2 c){ vec4 t = texelFetch(uS, c, 0); return (vec2(t.r * 65280.0 + t.g * 255.0, t.b * 65280.0 + t.a * 255.0) / 65535.0) * 5.0 - 2.5; }
vec4 E(vec2 s){ vec2 q = floor(clamp((s + 2.5) / 5.0, 0.0, 1.0) * 65535.0 + 0.5); vec2 hi = floor(q / 256.0); vec2 lo = q - hi * 256.0; return vec4(hi.x, lo.x, hi.y, lo.y) / 255.0; }
#else
vec2 S(ivec2 c){ return texelFetch(uS, c, 0).xy; }
vec4 E(vec2 s){ return vec4(s, 0.0, 1.0); }
#endif
`,ce=Z+`uniform sampler2D uS; uniform sampler2D uM;
uniform vec4 uP[16]; uniform ivec4 uI;
out vec4 o;
const float B8[9] = float[9](1.0, 8.0, 28.0, 56.0, 70.0, 56.0, 28.0, 8.0, 1.0);
const float B4[9] = float[9](0.0, 0.0, 1.0, 4.0, 6.0, 4.0, 1.0, 0.0, 0.0);
${bt}
float hsh(ivec2 c, int s){ uint x = uint(c.x) * 1973u + uint(c.y) * 9277u + uint(s) * 26699u + 7u; x = (x ^ (x >> 15)) * 0x2c1b3c6du; x = (x ^ (x >> 12)) * 0x297a2d39u; x ^= x >> 15; return float(x) * (1.0 / 4294967295.0); }
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  vec4 m = texelFetch(uM, c, 0);
  if (m.r < 0.5) { o = E(vec2(0.0)); return; }
  vec2 g1 = vec2(0.0), g2 = vec2(0.0);
  int R = uI.x;
  for (int j = -R; j <= R; j++) {
    float a8 = B8[j + 4], a4 = B4[j + 4];
    for (int i = -R; i <= R; i++) {
      vec2 s = S(c + ivec2(i, j));
      g2 += (B8[i + 4] * a8) * s;
      g1 += (B4[i + 4] * a4) * s;
    }
  }
  float qf = uP[1].y;
  vec2 s0 = S(c) * qf;
  g1 *= qf / 256.0; g2 *= qf / 65536.0;
  float U = s0.x, V = s0.y, W = U + V;
  vec2 D1 = 2.0 * (g1 - s0), D2 = 4.0 * (g2 - 2.0 * g1 + s0);
  float Lu = -(U + uP[2].x * D1.x + uP[2].y * D2.x);
  float Lv = -(V + uP[2].z * D1.y + uP[2].w * D2.y);
  float nu = uP[0].z * U * U + 2.0 * uP[0].w * U * V - U * U * U - U * V * V;
  float nv = uP[0].w * U * U - V * V * V - U * U * V;
  float nl = uP[1].w * W * W - W * W * W;
  float dt = uP[1].z;
  float fu = uP[0].x * U + Lu + mix(nu, nl, uP[1].x);
  float fv = uP[0].y * V + Lv + mix(nv, nl, uP[1].x);
  float d = m.g * 64.0;
  // the wall: the meniscus, shaken at the drive, forces rolls parallel to it, and holds the lattice off it (the lattice
  // proper begins about two wavelengths in, after one row of squeezed cells)
  float wd = uP[14].x * exp(-d / uP[14].y);
  fu += uP[3].x * cos(uP[3].y * d) * exp(-d / uP[3].z) - wd * U;
  fv -= wd * V;
  float un = U + dt * fu + uP[3].w * (hsh(c, uI.w) - 0.5);
  float vn = V + dt * fv;
  vec2 pc = vec2(c) + 0.5;
  for (int k = 0; k < uI.y; k++) { vec4 I = uP[6 + k]; vec2 dd = pc - I.xy; un += I.z * exp(-dot(dd, dd) / (2.0 * I.w * I.w)); }
  for (int k = 0; k < uI.z; k++) { float th = uP[5].x + float(k) * uP[5].y; un += uP[4].x * cos(uP[4].y * dot(pc - uP[4].zw, vec2(cos(th), sin(th)))); }
  o = E(clamp(vec2(un, vn), -2.2, 2.2));
}`,Tt=`
vec3 gelC(float a){ float s = fract(a) * 3.0; float i = floor(s), f = s - i;
  vec3 c0 = i < 0.5 ? uL[4].rgb : i < 1.5 ? uL[5].rgb : uL[6].rgb; vec3 c1 = i < 0.5 ? uL[5].rgb : i < 1.5 ? uL[6].rgb : uL[4].rgb;
  return mix(c0, c1, smoothstep(0.8, 1.0, f)); }
vec3 env(vec3 p, vec3 r, float rough, float foot){
  float kind = uL[3].x;
  vec3 col = uL[3].z * vec3(0.55, 0.57, 0.62) * (0.12 + 0.88 * clamp(r.z, 0.0, 1.0));
  col += uL[3].z * 4.0 * vec3(0.9, 0.85, 0.75) * exp(-14.0 * dot(r.xy - vec2(-0.55, 0.45), r.xy - vec2(-0.55, 0.45))) * step(0.0, r.z);
  if (r.z <= 0.02) return col;
  float t = (uL[0].z - p.z) / r.z;
  vec2 q = p.xy + r.xy * t;
  float sp = rough * t + foot;
  if (kind < 0.5 || kind > 1.5) {
    vec2 dq = q - uL[0].xy; float d = length(dq) - uL[0].w;
    float w = uL[3].y, we2 = w * w + sp * sp;
    float an = atan(dq.y, dq.x);
    float I = w * inversesqrt(we2) * exp(-0.5 * d * d / we2)
            + 0.012 * exp(-0.5 * d * d / (0.0036 + we2)) + 0.003 * exp(-0.5 * d * d / (0.03 + we2));
    vec3 lc = kind > 1.5 ? gelC(an * 0.1591549 + 0.08) : uL[1].rgb;
    col += lc * (uL[1].w * I);
  } else {
    float R = uL[2].w, d = length(q - uL[2].xy) - R;
    float we = sqrt(0.0001 + sp * sp);
    float I = (R * R / (R * R + sp * sp)) * smoothstep(we + uL[2].z, -we - uL[2].z, d) + 0.006 * exp(-max(d, 0.0) * 12.0);
    col += uL[7].rgb * (uL[7].w * I);
  }
  return col;
}
vec3 irr(vec3 p, vec3 n, int nr){
  vec3 e = vec3(0.0); float kind = uL[3].x;
  if (kind > 0.5 && kind < 1.5) { vec3 L = vec3(uL[2].xy, uL[0].z) - p; float d2 = dot(L, L); e = uL[7].rgb * (max(dot(n, L * inversesqrt(d2)), 0.0) * uL[0].z * uL[0].z / d2); }
  else for (int k = 0; k < nr; k++) {
    float a = float(k) / float(nr);
    vec3 L = vec3(uL[0].xy + uL[0].w * vec2(cos(a * 6.2831853), sin(a * 6.2831853)), uL[0].z) - p; float d2 = dot(L, L);
    vec3 lc = kind > 1.5 ? gelC(a + 0.08) : uL[1].rgb;
    e += lc * (max(dot(n, L * inversesqrt(d2)), 0.0) * uL[0].z * uL[0].z / d2 / float(nr));
  }
  return e * uL[3].w + uL[3].z * 0.35;
}
vec3 tone(vec3 c, float ex){ c = 1.0 - exp(-max(c, vec3(0.0)) * ex); return pow(c, vec3(0.4545)); }
`,Lt=`
float sd2(vec2 p, float sq){ if (sq < 0.5) return length(p) - 1.0; vec2 d = abs(p) - vec2(0.7); return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.18; }
vec2 sdN(vec2 p, float sq){ if (sq < 0.5) return p / max(length(p), 1e-4); vec2 d = abs(p) - vec2(0.7); vec2 g = d.x > 0.0 && d.y > 0.0 ? normalize(d) : (d.x > d.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0)); return g * sign(p + 1e-6); }
`,ie=Z+`uniform vec4 uB[8]; uniform vec4 uL[8]; uniform ivec4 uI; uniform sampler2D uD; uniform sampler2D uF;
out vec4 o;
${Tt}
${Lt}
float zc(float r){ return -0.07 + 0.42 * (r - 1.0); }
float map(vec3 p, out float id){
  float sq = uB[4].x, hw = uB[4].z, T = 0.055, ZB = -0.14;
  float s = sd2(p.xy, sq);
  vec2 q = vec2(s - 0.5 * T, p.z - 0.5 * (hw + ZB));
  vec2 dq = abs(q) - vec2(0.5 * T, 0.5 * (hw - ZB)) + 0.02;
  float wall = length(max(dq, 0.0)) + min(max(dq.x, dq.y), 0.0) - 0.02;
  float liq = max(s, p.z);
  float r = length(p.xy);
  float cone = (p.z - zc(r)) * 0.92;
  float zs = zc(1.47);
  float tor = length(vec2(r - 1.565, p.z - zs)) - 0.095;
  float fr = max(abs(r - 1.95) - 0.29, abs(p.z - zs) - 0.022) - 0.006;
  float sec = 0.7853982, an = atan(p.y, p.x), a2 = mod(an + 0.5 * sec, sec) - 0.5 * sec;
  float scr = length(vec3(r * cos(a2) - 1.82, r * sin(a2), (p.z - zs - 0.02) * 1.8)) - 0.032;
  float tab = p.z + 0.45;
  float d = wall; id = 1.0;
  if (liq < d) { d = liq; id = 2.0; }
  if (cone < d) { d = cone; id = 3.0; }
  if (tor < d) { d = tor; id = 4.0; }
  if (fr < d) { d = fr; id = 5.0; }
  if (scr < d) { d = scr; id = 6.0; }
  if (tab < d) { d = tab; id = 7.0; }
  return d;
}
void main(){
  vec2 sp = gl_FragCoord.xy / uB[1].w * 2.0 - 1.0;
  vec3 ro = uB[0].xyz, rd = normalize(uB[3].xyz + (sp.x * uB[1].xyz + sp.y * uB[2].xyz) * uB[0].w);
  float t = (ro.z - 0.42) / -rd.z, id = 7.0;
  for (int i = 0; i < uI.x; i++) { float d = map(ro + rd * t, id); if (d < 0.0003 * t) break; t += d; if (t > 30.0) break; }
  vec3 p = ro + rd * t;
  vec3 n = vec3(0.0);
  for (int k = 0; k < uI.y; k++) { vec3 e = 0.5773 * (2.0 * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.0); float dm; n += e * map(p + e * 0.0012, dm); }
  n = normalize(n);
  float r = length(p.xy), an = atan(p.y, p.x), sq = uB[4].x;
  vec3 alb; float F0, rough, top = 0.0, fw = 0.0;
  // the speaker's wear: radial fibre, tonal mottle and dust, from a map baked once (turned per mint)
  vec2 rp = mat2(uB[5].y, uB[5].z, -uB[5].z, uB[5].y) * p.xy;
  vec4 dd = texture(uD, rp * 0.25 + 0.5);
  float pxw = 2.0 * uB[0].w * t / uB[1].w;
  if (id < 1.5) {
    int dm = int(uB[4].y + 0.5);
    alb = dm == 0 ? vec3(0.010, 0.010, 0.012) : dm == 1 ? vec3(0.80, 0.78, 0.74) : vec3(0.30, 0.31, 0.33);
    F0 = dm == 2 ? 0.35 : 0.045; rough = dm == 0 ? 0.002 : dm == 1 ? 0.012 : 0.05;
    // the top edge is ground, not polished: a soft grey band instead of a hairline
    top = smoothstep(0.75, 0.97, n.z);
    // the rounded corners turn the normal a long way inside one pixel: spread the ring's image over that turn
    fw = 250.0 * pxw * 4.0 * n.z * n.z * (1.0 - n.z * n.z);
    alb = mix(alb, dm == 2 ? alb : vec3(0.03, 0.03, 0.032) + alb * 0.8, top); rough = mix(rough, 0.45, top); F0 = mix(F0, 0.008, top);
  } else if (id < 2.5) { o = vec4(0.0, 0.0, 0.0, 1.0); return; }
  else if (id < 3.5) {
    // pressed paper (radial fibre), filled polypropylene, or a woven fibre cone
    float fb = texture(uF, vec2(an * 0.1591549 + 0.5 + uB[5].w, (r - 0.9) * 0.8)).r;
    alb = uB[6].rgb * (1.0 + uB[7].z * (fb * 2.0 - 1.0)); F0 = uB[7].x; rough = uB[7].y;
    if (uB[6].w > 0.5) {
      vec2 w = p.xy * 70.0, fw = fract(w) - 0.5; float par = mod(floor(w.x) + floor(w.y), 2.0);
      float yarn = par > 0.5 ? cos(3.14159 * fw.y) : cos(3.14159 * fw.x);
      alb *= mix(1.0, 0.5 + 0.65 * yarn, clamp(1.6 - 2.2 * pxw * 70.0, 0.0, 1.0));
    }
    // the bead of glue that holds the dish on the cone
    // squeezed out unevenly: wide here, a thread there; a rounded bead, so it carries a thin glint of the lamp
    float gs = sd2(p.xy, sq) - 0.055, bw = 0.006 + uB[2].w * 0.03 * smoothstep(0.3, 0.75, dd.b) + (1.0 - uB[2].w) * 0.022 * dd.b;
    float gw = 1.0 - smoothstep(0.004, 0.006 + bw, gs);
    alb = mix(alb, uB[2].w > 0.5 ? vec3(0.21, 0.19, 0.145) : vec3(0.20, 0.19, 0.17), 0.7 * gw); rough = mix(rough, 0.05 - 0.03 * uB[2].w, gw); F0 = mix(F0, 0.04, gw);
    n = normalize(n + uB[2].w * gw * 0.9 * (1.0 - smoothstep(0.0, 0.006 + bw, gs)) * vec3(sdN(p.xy, sq), 0.0));
  } else if (id < 4.5) { alb = vec3(0.022, 0.022, 0.024); F0 = 0.025; rough = 0.08; }
  else if (id < 5.5) { alb = vec3(0.035, 0.035, 0.037); F0 = 0.1; rough = 0.06; }
  else if (id < 6.5) { alb = vec3(0.10); F0 = 0.55; rough = 0.02; }
  else { alb = vec3(0.004); F0 = 0.01; rough = 0.6; }
  if (id > 2.5 && id < 5.5) { alb = alb * (0.8 + 0.4 * dd.b) + uB[7].w * dd.g * vec3(0.32, 0.31, 0.29); rough = mix(rough, 0.6, dd.g); }
  float cosv = max(dot(-rd, n), 0.0);
  float F = F0 + (1.0 - F0) * pow(1.0 - cosv, 5.0);
  vec3 col = alb * irr(p, n, uI.z) + F * env(p, reflect(rd, n), rough, fw);
  if (id > 2.5 && id < 3.5) { float sd = sd2(p.xy, sq); col *= 0.4 + 0.6 * smoothstep(0.0, 0.16, sd); }
  if (id > 3.5 && id < 4.5) col *= 0.75 + 0.25 * smoothstep(-0.05, 0.08, n.z);
  col *= mix(1.0, 0.35, smoothstep(1.05, 1.9, r));
  // one cold-white ring lamp overhead: the paper is a warm black that cools toward the surround; the dish's glass a
  // blue-black, its ground cut edge the one faint green (not under a gel)
  if (uB[2].w > 0.5) col *= id > 2.5 ? mix(vec3(1.26, 1.0, 0.78), vec3(0.92, 1.0, 1.1), smoothstep(1.05, 1.75, r)) : id < 1.5 && uB[4].y < 0.5 ? mix(vec3(0.8, 1.0, 1.32), vec3(1.05, 1.08, 0.92), top) : vec3(1.0);
  o = vec4(tone(col, uB[5].x), 0.0);
}`,fe=Z+`uniform sampler2D uS; uniform sampler2D uBG; uniform vec4 uC[32]; uniform vec4 uL[8]; uniform ivec4 uI;
out vec4 o;
${bt}
${Tt}
${Lt}
float Wt(ivec2 c){ vec2 s = S(clamp(c, ivec2(0), ivec2(191))); return s.x + s.y; }
void main(){
  float SZ = uC[1].w, sq = uC[5].y;
  vec2 sp = gl_FragCoord.xy / SZ * 2.0 - 1.0;
  vec3 ro = uC[0].xyz, rd = normalize(uC[3].xyz + (sp.x * uC[1].xyz + sp.y * uC[2].xyz) * uC[0].w);
  float tp = -ro.z / rd.z; vec3 p = ro + rd * tp;
  vec3 pt = ro + rd * ((uC[5].w - ro.z) / rd.z);
  float px = 2.0 * uC[0].w * tp / SZ;
  float s = sd2(p.xy, sq), st = sd2(pt.xy, sq);
  float a = clamp(0.5 - s / px, 0.0, 1.0) * clamp(0.5 - st / px, 0.0, 1.0);
  // the surface: a B-spline through the grid, with its slope and curvature
  vec2 x = clamp(p.xy * 92.0 + 96.0, vec2(3.0), vec2(189.0)) - 0.5;
  vec2 ib = floor(x), f = x - ib, g = 1.0 - f;
  vec4 wx = vec4(g.x * g.x * g.x, 3.0 * f.x * f.x * f.x - 6.0 * f.x * f.x + 4.0, -3.0 * f.x * f.x * f.x + 3.0 * f.x * f.x + 3.0 * f.x + 1.0, f.x * f.x * f.x) / 6.0;
  vec4 wy = vec4(g.y * g.y * g.y, 3.0 * f.y * f.y * f.y - 6.0 * f.y * f.y + 4.0, -3.0 * f.y * f.y * f.y + 3.0 * f.y * f.y + 3.0 * f.y + 1.0, f.y * f.y * f.y) / 6.0;
  vec4 dx = vec4(-0.5 * g.x * g.x, 1.5 * f.x * f.x - 2.0 * f.x, -1.5 * f.x * f.x + f.x + 0.5, 0.5 * f.x * f.x);
  vec4 dy = vec4(-0.5 * g.y * g.y, 1.5 * f.y * f.y - 2.0 * f.y, -1.5 * f.y * f.y + f.y + 0.5, 0.5 * f.y * f.y);
  vec4 ddx = vec4(g.x, 3.0 * f.x - 2.0, 1.0 - 3.0 * f.x, f.x), ddy = vec4(g.y, 3.0 * f.y - 2.0, 1.0 - 3.0 * f.y, f.y);
  vec2 dw = vec2(0.0); vec3 hh = vec3(0.0);
  ivec2 i0 = ivec2(ib) - 1;
  for (int b = 0; b < 4; b++) for (int k = 0; k < 4; k++) {
    float v = Wt(i0 + ivec2(k, b));
    dw += vec2(dx[k] * wy[b], wx[k] * dy[b]) * v;
    hh += vec3(ddx[k] * wy[b], wx[k] * ddy[b], dx[k] * dy[b]) * v;
  }
  // the model's field goes to rest over the last two cells at the wall (its mask is a staircase of cells)
  float dd = max(-s, 0.0); vec2 no = sdN(p.xy, sq);
  float Af = uC[4].x * uC[3].w * smoothstep(0.006, 0.026, dd);
  vec2 grad = (Af * 92.0) * dw; vec3 hes = (Af * 8464.0) * hh;
  // the meniscus climbing the wall, and the small harmonic ripples it sends inward
  float em = exp(-dd / uC[4].z);
  float er = exp(-dd / 0.15), ph = uC[5].z * dd - uC[14].x;
  grad += ((uC[4].y / uC[4].z) * em + uC[4].w * uC[5].z * sin(ph) * er) * no;
  float hn = (uC[4].y / (uC[4].z * uC[4].z)) * em - uC[4].w * uC[5].z * uC[5].z * cos(ph) * er;
  hes += hn * vec3(no.x * no.x, no.y * no.y, no.x * no.y);
  vec3 n = normalize(vec3(-grad, 1.0));
  vec3 r = reflect(rd, n);
  // the blur of the reflected light over one pixel, from the curvature (smooth across the 2 x 2 quads, unlike fwidth)
  float foot = min(0.6, 0.6 * uL[0].z * 2.8 * px * length(vec3(hes.x, hes.y, 1.4142 * hes.z)) / max(r.z, 0.08));
  float cosv = max(dot(-rd, n), 0.0);
  float F = uC[6].x + (1.0 - uC[6].x) * pow(1.0 - cosv, 5.0);
  vec3 spec = env(p, r, uC[9].z, foot);
  vec3 liq;
  bool clear = uC[7].w < 0.5;
  vec3 tr = refract(rd, n, 1.0 / uC[6].y);
  vec3 b = p + tr * ((-uC[6].z - p.z) / min(tr.z, -0.05));
  vec3 E = irr(clear ? b : p, clear ? vec3(0.0, 0.0, 1.0) : n, uI.y);
  if (clear) {
    float Dc = uC[6].w;
    float det = (1.0 - Dc * hes.x) * (1.0 - Dc * hes.y) - Dc * Dc * hes.z * hes.z;
    float Ic = min(inversesqrt(det * det + 0.015), 6.0);
    float ao = 0.45 + 0.55 * smoothstep(0.0, 0.12, -sd2(b.xy, sq));
    vec3 fl = uC[8].rgb * E * mix(1.0, Ic, uC[8].w) * ao;
    fl += uC[9].w * env(b, reflect(tr, vec3(0.0, 0.0, 1.0)), 0.003, foot) * ao;
    liq = F * spec + (1.0 - F) * fl * uC[7].rgb;
  } else {
    // opaque: no floor, only the surface's own body: domes lit, hollows in a soft cool shade
    float cav = clamp(1.0 - uC[10].w * (hes.x + hes.y), 0.25, 1.5);
    liq = F * spec + (1.0 - F) * uC[7].rgb * (E * 0.8 + 0.2 * uL[3].w * 0.8) * cav * mix(uC[10].rgb, vec3(1.0), clamp(cav, 0.0, 1.0));
  }
  // droplets: falling, bouncing walkers, ejecta
  float tS = 1e9, da = 0.0; vec3 dc = vec3(0.0);
  for (int k = 0; k < uI.x; k++) {
    vec4 D = uC[16 + k];
    vec2 dxy = p.xy - D.xy; float sh = exp(-dot(dxy, dxy) / (D.w * D.w * 2.2)) * clamp(1.0 - (D.z - D.w) * 6.0, 0.0, 1.0);
    liq *= 1.0 - 0.55 * sh * (clear ? 1.0 : 0.6);
    liq += (clear ? 1.0 : 0.0) * 2.5 * uL[3].w * exp(-dot(dxy, dxy) / (D.w * D.w * 0.12)) * clamp(1.0 - (D.z - D.w) * 6.0, 0.0, 1.0) * uC[8].rgb;
    vec3 oc = ro - D.xyz; float bq = dot(oc, rd), cq = dot(oc, oc) - bq * bq;
    float dp = sqrt(max(cq, 0.0));
    if (dp < D.w * 1.2) {
      float hq = D.w * D.w - cq, tt = -bq - sqrt(max(hq, 0.0));
      if (tt < tS) {
        tS = tt;
        vec3 q = ro + rd * tt, nd = normalize(q - D.xyz);
        float Fd = uC[6].x + (1.0 - uC[6].x) * pow(1.0 - max(dot(-rd, nd), 0.0), 5.0);
        vec3 rv = reflect(rd, nd), Lq = normalize(uL[0].xyz + vec3(-0.6, 0.6, 0.0) * uL[0].w * 0.0 - q);
        vec3 rf = (uL[1].w * uL[1].rgb + uL[7].w * uL[7].rgb) * 0.004 * pow(max(dot(rv, Lq), 0.0), 60.0) + uL[3].z * 0.5;
        vec3 body = clear ? uC[8].rgb * uL[3].w * (0.25 + 0.9 * pow(max(-nd.z * 0.5 + 0.5 + dot(nd.xy, -rd.xy) * 0.3, 0.0), 3.0)) * uC[7].rgb
                          : uC[7].rgb * uL[3].w * (0.15 + 0.85 * max(dot(nd, normalize(uL[0].xyz - q)), 0.0));
        dc = Fd * rf + (1.0 - Fd) * body;
        da = clamp((D.w - dp) / (2.0 * uC[0].w * tt / SZ) + 0.5, 0.0, 1.0);
      }
    }
  }
  vec3 bg = texture(uBG, gl_FragCoord.xy / SZ).rgb;
  vec3 col = mix(bg, tone(liq, uC[14].w), a);
  col = mix(col, tone(dc, uC[14].w), da);
  float gr = fract(sin(dot(gl_FragCoord.xy + uC[14].z * vec2(17.13, 5.71), vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  col += gr * (0.006 + 0.02 * col.g);
  o = vec4(col, 1.0);
}`;function ue(e){let r=Mt.get(e);if(r)return r;e.getExtension("EXT_color_buffer_float"),e.getExtension("EXT_color_buffer_half_float");const E=e.createTexture();e.bindTexture(e.TEXTURE_2D,E),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,4,4,0,e.RGBA,e.HALF_FLOAT,null);const l=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,l),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,E,0);const v=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(l),e.deleteTexture(E);const f=v?"":"#define ENC8"+j,p={step:Z+f+ce.slice(Z.length),comp:Z+f+fe.slice(Z.length),bake:ie},d=[],y={},N=e.createShader(e.VERTEX_SHADER);e.shaderSource(N,Et),e.compileShader(N),d.push([N,Et]);for(const i in p){const u=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(u,p[i]),e.compileShader(u),d.push([u,p[i]]);const x=e.createProgram();e.attachShader(x,N),e.attachShader(x,u),e.linkProgram(x),y[i]=x}e.flush();const _=le(e),h=de(e);for(const i in y)if(!e.getProgramParameter(y[i],e.LINK_STATUS)){let u=i+": "+e.getProgramInfoLog(y[i]);for(const[x,b]of d){const L=e.getShaderInfoLog(x);L&&(u+=j+L+j+b.split(j).map((A,z)=>z+1+": "+A).join(j))}throw new Error("121 shader: "+u)}const m={};for(const i in y){const u=y[i],x={},b=e.getProgramParameter(u,e.ACTIVE_UNIFORMS);for(let L=0;L<b;L++){const A=e.getActiveUniform(u,L);x[A.name.replace("[0]","")]=e.getUniformLocation(u,A.name)}m[i]=x}return e.useProgram(y.step),e.uniform1i(m.step.uS,0),e.uniform1i(m.step.uM,1),e.useProgram(y.comp),e.uniform1i(m.comp.uS,0),e.uniform1i(m.comp.uBG,2),e.useProgram(y.bake),e.uniform1i(m.bake.uD,3),e.uniform1i(m.bake.uF,4),r={progs:y,U:m,half:v,TD:_,TF:h,vao:e.createVertexArray()},Mt.set(e,r),r}function le(e){const E=new Uint8Array(1048576);let l=625341585;const v=()=>(l^=l<<13,l^=l>>>17,l^=l<<5,(l>>>0)/4294967296),f=17,p=new Float32Array(f*f),d=new Float32Array(f*f);for(let i=0;i<f*f;i++)p[i]=v(),d[i]=v();const y=(i,u,x)=>{const b=Math.min(f-2,u|0),L=Math.min(f-2,x|0),A=u-b,z=x-L,C=A*A*(3-2*A),I=z*z*(3-2*z),D=i[L*f+b],$=i[L*f+b+1],J=i[(L+1)*f+b],l0=i[(L+1)*f+b+1];return D+($-D)*C+(J-D+(D-$+l0-J)*C)*I},N=new Float32Array(512*512);for(let i=0;i<1300;i++){const u=v()*512,x=v()*512,b=.2+.6*v()*v()*v(),L=v()<.9?.6:1.2;for(let A=-2;A<=2;A++)for(let z=-2;z<=2;z++){const C=(u|0)+z,I=(x|0)+A;if(C<0||I<0||C>=512||I>=512)continue;const D=Math.hypot(C+.5-u,I+.5-x)/L;D<1.5&&(N[I*512+C]=Math.max(N[I*512+C],b*Math.exp(-D*D*1.6)))}}const _=128,h=new Float32Array(_*_);for(let i=0;i<_;i++)for(let u=0;u<_;u++){const x=(u+.5)/_*4,b=(i+.5)/_*4;h[i*_+u]=.55*y(p,x*4,b*4)+.45*y(d,x*1.6+3,b*1.6+3)}for(let i=0;i<512;i++)for(let u=0;u<512;u++){const x=(i*512+u)*4;E[x]=128,E[x+1]=Math.round(Math.min(1,N[i*512+u])*255),E[x+2]=Math.round(h[(i>>2)*_+(u>>2)]*255),E[x+3]=255}const m=e.createTexture();return e.bindTexture(e.TEXTURE_2D,m),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,512,512,0,e.RGBA,e.UNSIGNED_BYTE,E),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),m}function de(e){const l=new Uint8Array(65536);let v=1799596469;const f=()=>(v^=v<<13,v^=v>>>17,v^=v<<5,(v>>>0)/4294967296),p=new Float32Array(2048),d=new Float32Array(2048/8),y=new Float32Array(2048/32*5);for(let h=0;h<2048;h++)p[h]=f()-.5;for(let h=0;h<d.length;h++)d[h]=f()-.5;for(let h=0;h<y.length;h++)y[h]=f();const N=(h,m)=>{const i=h.length,u=Math.floor(m),x=m-u,b=x*x*(3-2*x);return h[(u%i+i)%i]*(1-b)+h[((u+1)%i+i)%i]*b};for(let h=0;h<32;h++)for(let m=0;m<2048;m++){const u=m/32,x=u|0,b=(x+1)%64,L=u-x,A=L*L*(3-2*L),z=h/8,C=Math.min(4,z|0),I=Math.min(4,C+1),D=z-(z|0),$=(y[C*64+x]*(1-A)+y[C*64+b]*A)*(1-D)+(y[I*64+x]*(1-A)+y[I*64+b]*A)*D,J=(p[m]*.9+N(d,m/8+h*.04)*.9)*(.3+1.1*$);l[h*2048+m]=Math.max(0,Math.min(255,Math.round(128+190*J)))}const _=e.createTexture();return e.bindTexture(e.TEXTURE_2D,_),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,e.R8,2048,32,0,e.RED,e.UNSIGNED_BYTE,l),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),_}function Oe(e){const r=Math.abs(e);if(r<8){const f=e*e;return(57568490574+f*(-13362590354+f*(6516196407e-1+f*(-1121442418e-2+f*(77392.33017+f*-184.9052456)))))/(57568490411+f*(1029532985+f*(9494680718e-3+f*(59272.64853+f*(267.8532712+f)))))}const E=8/r,l=E*E,v=r-.785398164;return Math.sqrt(.636619772/r)*(Math.cos(v)*(1+l*(-.001098628627+l*(2734510407e-14+l*(-2073370639e-15+l*2093887211e-16))))-E*Math.sin(v)*(-.01562499995+l*(.0001430488765+l*(-6911393771e-15+l*(7621095161e-16-l*934935152e-16)))))}function he(e){const r=Math.abs(e);if(r<8){const p=e*e;return e*(72362614232+p*(-7895059235+p*(2423968531e-1+p*(-2972611439e-3+p*(15704.4826+p*-30.16036606)))))/(144725228442+p*(2300535178+p*(1858330474e-2+p*(99447.43394+p*(376.9991397+p)))))}const E=8/r,l=E*E,v=r-2.356194491,f=Math.sqrt(.636619772/r)*(Math.cos(v)*(1+l*(.00183105+l*(-3516396496e-14+l*(2457520174e-15+l*-240337019e-15))))-E*Math.sin(v)*(.04687499995+l*(-.0002002690873+l*(8449199096e-15+l*(-88228987e-14+l*105787412e-15)))));return e<0?-f:f}wt.add({num:121,name:"Shaking Dish",fam:"Worlds",recipe:"A shallow dish of liquid on a speaker cone, shaking up and down. Past a point the surface breaks into glittering standing waves in stripes, squares and hexagons, then chaos. The liquid changes every mint, and rare ones have droplets that walk around on their own waves. Drag up or down to turn the shaking up or down, drag sideways to change the pitch, or tap to drop a droplet.",interactive:"Drag up or down to turn the drive amplitude up or down (each pattern takes over at its threshold); drag sideways to change the pitch, which sets the wavelength; tap to drop a droplet (on walker mints it bounces and walks, steered by its own waves).",music:!0,gl:!0,fps:30,seed:0,make(e){const r=e.gl,E=e.size,l=ue(r),v=l.progs,f=l.U,p=(o,a,t)=>o<a?a:o>t?t:o,d=Math.PI*2,y=Math.SQRT2,N=2*Math.cos(Math.PI/12),_=(e.hash||"0x0").slice(2).padEnd(64,"0"),h=o=>parseInt(_.slice(o*8,o*8+8),16)>>>0,m=o=>{let a=o>>>0;return()=>{a=a+1831565813|0;let t=Math.imul(a^a>>>15,1|a);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}},i=m((h(0)^Math.imul(h(3),739982445)^304063917)>>>0),u=(o,a)=>{let t=0;for(const s of a)t+=s;let n=i()*t,c=0;for(;n>=a[c]&&c<a.length-1;)n-=a[c++];return o[c]},x=["Water","Silicone oil","Milk","Ferrofluid"],b=["Black glass","White porcelain","Square tray"],L=["Ring light","Single lamp","Coloured gel"],A=["Stripes","Squares","Hexagons","Quasi-crystal","Chaos"],z=["Low","Middle","High"],C=["None","Walker","Walker pair"];let I=u(x,[40,28,22,10]),D=u(b,[48,40,12]),$=u(L,[50,36,14]),J=u(A,[17,24,34,9,16]),l0=u(z,[30,40,30]),$0=u(C,[90,7,3]);const d0=i()*d,h0=i(),x0=i(),L0=i();e.home&&(I="Water",D="Black glass",$="Ring light",J="Hexagons",l0="Middle",$0="None");const a0=x.indexOf(I),r0=b.indexOf(D),t0=L.indexOf($),xe=z.indexOf(l0),S=C.indexOf($0);let e0=A.indexOf(J)+1;S>0&&(e0=0),e.trait("Liquid",I),e.trait("Dish",D),e.trait("Light",$);const pe=m((h(6)^Math.imul(h(1),374761393)^303762005)>>>0),At=!e.home&&S===0&&pe()<.16;At&&(l0="Deep bass"),e.trait("Mode at mint",S>0?"Below threshold":J),e.trait("Pitch",l0),e.trait("Walkers",$0);const ve=["Overhead","Low oblique","Close in"],J0=m((h(7)^Math.imul(h(5),668265261)^303866859)>>>0),Rt=J0()*100,me=J0(),Ft=J0();let _0=Rt<50?0:Rt<82?1:2;(S>0||e.home)&&(_0=0),e.trait("Camera",ve[_0]);const ye=["Black paper","Grey poly","Brown paper","Woven fibre"],gt=m((h(2)^Math.imul(h(4),2246822507)^303828574)>>>0),tt=gt()*100,et=gt()*d,zt=e.home||tt<46?0:tt<70?1:tt<91?2:3;e.trait("Cone",ye[zt]);const we=[[.016,.0155,.015,0,.0015,.5,.5,.7],[.07,.071,.075,0,.018,.24,.08,.5],[.13,.082,.045,0,.004,.5,.38,.7],[.26,.17,.04,1,.035,.28,.1,.5]][zt],q=[{sig:73e-6,rate:1,F0:.02,ior:1.333,op:0,col:[.97,.99,1]},{sig:215e-7,rate:.62,F0:.028,ior:1.4,op:0,col:[1,.92,.74]},{sig:46e-6,rate:.9,F0:.024,ior:1.35,op:1,col:[.56,.55,.51]},{sig:26e-6,rate:.7,F0:.055,ior:1.5,op:1,col:[.01,.0075,.006]}][a0],Pt=.004,ot=90/92,_t=o=>{const a=d/(o*.001);return Math.sqrt((9.81*a+q.sig*a*a*a)*Math.tanh(a*Pt))/Math.PI},at=o=>{let a=1,t=40;for(let n=0;n<30;n++){const c=.5*(a+t),s=d/(c*.001);Math.sqrt((9.81*s+q.sig*s*s*s)*Math.tanh(s*Pt))>o?a=c:t=c}return .5*(a+t)},C0=_t(9.6),Ct=_t(5.9),Me=o=>Math.pow(Math.cos(o*.9238795/2),4)*Math.pow(Math.cos(o*.3826834/2),4),D0=o=>2*(1-Me(d/o)),k0=[[-.1,-1,0,0,0,0,y,.002],[.12,-1,0,0,0,0,y,.004],[.1,0,0,0,1,1,y,.008],[.05,-1,1.2,0,0,0,y,.012],[.1,.04,0,0,1,.8,N,.008],[.4,.3,0,0,1,.8,1.6,.05]],Ee=[.14,.3,.47,.64,.8],be=o=>{let a=0;for(;a<5&&o>=Ee[a];)a++;return a};let p0=[.07,.22,.385,.555,.72,.9][e0],n0=At?-1.15:[.18,.5,.82][xe];const Te=Math.min(0,n0);let P=e0,G=22*Math.PI/180,s0=5,c0=.24,o0=[0,.035,0],X=[o0[0],o0[1]-s0*Math.sin(G),o0[2]+s0*Math.cos(G)],W=[0,Math.sin(G),-Math.cos(G)],O=[1,0,0],H=[0,Math.cos(G),Math.sin(G)];if(_0>0){const o=(me<.5?-1:1)*(.25+.35*Ft),a=Math.cos(o),t=Math.sin(o);if(_0===1)G=50*Math.PI/180,s0=4.6,c0=.22,o0=[.12*a,.12*t,0];else{G=30*Math.PI/180,s0=2.9,c0=.24;const s=o+(Ft<.5?2.2:-2.2);o0=[.42*Math.cos(s),.42*Math.sin(s),0]}const n=Math.sin(G),c=Math.cos(G);X=[o0[0]+s0*n*t,o0[1]-s0*n*a,o0[2]+s0*c],W=[-n*t,n*a,-c],O=[a,t,0],H=[-c*t,c*a,n]}const Dt=.075,I0=r0===2?1:0,A0=(o,a)=>{if(!I0)return Math.hypot(o,a)-1;const t=Math.abs(o)-.7,n=Math.abs(a)-.7;return Math.hypot(Math.max(t,0),Math.max(n,0))+Math.min(Math.max(t,n),0)-.18},kt=(o,a)=>{const t=[W[0]+(o*O[0]+a*H[0])*c0,W[1]+(o*O[1]+a*H[1])*c0,W[2]+(o*O[2]+a*H[2])*c0],n=-X[2]/t[2];return[X[0]+t[0]*n,X[1]+t[1]*n]},k=new Float32Array(32),rt=[[1,.25,.55],[1,.62,.12],[.15,.6,1]];t0===1?k.set([0,.25,2.6,1.2,1,.97,.92,0,-.75,.95,0,.14,1,.012,.003,1.15]):k.set([0,.25,2.6,1.25,t0===2?1:Z0[0],t0===2?1:Z0[1],t0===2?1:Z0[2],900,0,0,0,0,t0,.012,.003,1]),k.set(rt[0],16),k.set(rt[1],20),k.set(rt[2],24),k.set([1,.9,.76,700],28),S>0&&a0!==2&&(t0===1?(k[8]=-2,k[9]=1.03,k[10]=.35,k[11]=.8,k[31]*=.4):(k[1]=1.03,k[3]=I0?1.95:1.68));const It=t0===1?1.05:.95,w=192,S0=(o,a,t,n,c,s,M)=>{const T=r.createTexture();return r.bindTexture(r.TEXTURE_2D,T),r.texImage2D(r.TEXTURE_2D,0,t,o,a,0,n,c,M||null),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),T},St=o=>{const a=r.createFramebuffer();return r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0),a};r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_ALIGNMENT,1);const v0=new Uint8Array(w*w*4);for(let o=0;o<w;o++)for(let a=0;a<w;a++){const t=(a+.5-96)/92,n=(o+.5-96)/92,c=A0(t,n),s=(o*w+a)*4;v0[s]=c<-.004?255:0,v0[s+1]=Math.round(p(-c*92/64,0,1)*255),v0[s+3]=255}const Le=S0(w,w,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.NEAREST,v0),i0=at(Math.PI*(C0*Math.pow(Ct/C0,n0)))/ot,nt=d/i0,Ut=new Float32Array(1),Ae=new Uint32Array(Ut.buffer),Re=o=>{Ut[0]=o;const a=Ae[0],t=(a>>>23&255)-112,n=a>>>16&32768;return t<=0?n:t>=31?n|31744:n|t<<10|(a&8388607)>>>13},st=[0,1,2,3,6,3][e0],Fe=e0===3||e0===5?d/3:Math.PI/st,ge=[0,.55,.45,.5,.2,.5][e0],ze=96+(h0-.5)*40,Pe=96+(x0-.5)*40,Nt=[],Bt=[],qt=[],Gt=[];for(let o=0;o<st;o++){const a=d0+o*Fe,t=Math.cos(a),n=Math.sin(a),c=new Float32Array(w),s=new Float32Array(w),M=new Float32Array(w),T=new Float32Array(w);for(let R=0;R<w;R++){const b0=nt*(R+.5-ze)*t,T0=nt*(R+.5-Pe)*n;c[R]=Math.cos(b0),s[R]=Math.sin(b0),M[R]=Math.cos(T0),T[R]=Math.sin(T0)}Nt.push(c),Bt.push(s),qt.push(M),Gt.push(T)}let U=(h(6)|1)>>>0;const F=()=>(U^=U<<13,U^=U>>>17,U^=U<<5,(U>>>0)/4294967296),V=l.half?new Uint16Array(w*w*4):new Uint8Array(w*w*4);for(let o=0;o<w;o++)for(let a=0;a<w;a++){const t=(o*w+a)*4;let n=0;if(v0[t]){for(let s=0;s<st;s++)n+=Nt[s][a]*qt[s][o]-Bt[s][a]*Gt[s][o];const c=v0[t+1]/255*64;n=n*ge*p(c/6,0,1)*p((c-.6*i0)/i0,.15,1)+.3*Math.cos(nt*c)*Math.exp(-c/i0)+(F()-.5)*.04}if(l.half)V[t]=Re(n),V[t+1]=0,V[t+2]=0,V[t+3]=15360;else{const c=Math.round(p((n+2.5)/5,0,1)*65535),s=Math.round(.5*65535);V[t]=c>>8,V[t+1]=c&255,V[t+2]=s>>8,V[t+3]=s&255}}const ct=[0,1].map(o=>l.half?S0(w,w,r.RGBA16F,r.RGBA,r.HALF_FLOAT,r.NEAREST,o?null:V):S0(w,w,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.NEAREST,o?null:V)),_e=ct.map(St);let U0=0;const R0=Math.min(1024,E),Xt=S0(R0,R0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,r.LINEAR),Ce=St(Xt);r.bindFramebuffer(r.FRAMEBUFFER,null);const m0=(o,a)=>{r.activeTexture(r.TEXTURE0+o),r.bindTexture(r.TEXTURE_2D,a)},N0=()=>{r.disable(r.DEPTH_TEST),r.disable(r.CULL_FACE),r.disable(r.BLEND),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.colorMask(!0,!0,!0,!0),r.depthMask(!1),r.bindVertexArray(l.vao)};N0(),r.useProgram(v.bake);const F0=new Float32Array(32);F0.set([X[0],X[1],X[2],c0,O[0],O[1],O[2],R0,H[0],H[1],H[2],0,W[0],W[1],W[2],0,I0,r0,Dt,0,It,Math.cos(et),Math.sin(et),0]),F0.set(we,24),F0[23]=et/d,F0[11]=t0===2?0:1,m0(3,l.TD),m0(4,l.TF),r.uniform4fv(f.bake.uB,F0),r.uniform4fv(f.bake.uL,k),r.uniform4i(f.bake.uI,110,4,12,0),r.bindFramebuffer(r.FRAMEBUFFER,Ce),r.viewport(0,0,R0,R0),r.drawArrays(r.TRIANGLES,0,3);const f0=new Float32Array(64);let Y=i0,g0=D0(i0),B0=D0(i0/k0[e0][6]),q0=.1,G0=0,it=0,Wt=0,ft=1,y0=0,X0=6,w0=0,Ot=0;const K=[];function ut(){G0=C0*Math.pow(Ct/C0,n0),Y=at(Math.PI*G0)/ot;const o=k0[P][6];g0=D0(Y),B0=D0(Y/o);const a=Math.pow(1-2/g0,2);q0=Math.min(.16,1.2/(a+1+Math.abs(k0[P][0]))),it=d/(Y/92),Wt=d/(at(d*G0)/ot/92)}ut();function De(o){const a=k0[P],t=S>0&&P===0?-.013:a[0];f0.fill(0),f0.set([t,a[1],a[2],a[3],a[4],o?ft:1,q0,a[5],2/g0,1/(g0*g0),2/B0,1/(B0*B0),te*(S>0?.04:1)*(.3+p0),d/Y,Y*ee,(a[7]*(P===5?1:.4)+w0*.06)*Math.sqrt(q0)]);let n=0;if(f0[56]=oe,f0[57]=Y*ae,o){for(const c of K){if(n>=8)break;f0.set(c,24+n*4),n++}y0>0&&f0.set([y0,d/Y,96+(L0-.5)*50,96+(h0-.5)*50,d0+Ot*.37,X0===2?Math.PI/2:Math.PI/6],16)}r.useProgram(v.step),r.uniform4fv(f.step.uP,f0),r.uniform4i(f.step.uI,4,n,o&&y0>0?X0:0,Ot++&65535),m0(0,ct[U0]),m0(1,Le),r.bindFramebuffer(r.FRAMEBUFFER,_e[U0^1]),r.viewport(0,0,w,w),r.drawArrays(r.TRIANGLES,0,3),U0^=1,o&&(K.length=0,ft=1,y0=0)}function ke(o){if(o===P)return;const a=P;P=o,ut(),o>0&&a>0&&(ft=.25,w0=1),o===4&&(y0=.08,X0=6),o===2&&(y0=.1,X0=2)}const u0=[],Q=[],M0=[],W0=64,lt=.05,Ie=1.25,dt=4,ht=(o,a,t,n)=>{Q.length>=4&&Q.shift(),Q.push({x:o,y:a,vx:t,vy:n,r:.013,hist:new Float32Array(3*W0),hn:0,acc:0})},O0=(o,a)=>[o*92+96,a*92+96];let H0=0;function Se(o){const a=dt*.12*.12*lt/.904;for(const t of Q)for(t.acc+=o;t.acc>=lt;){t.acc-=lt;const n=t.hn%W0*3;if(t.hist[n]=t.x,t.hist[n+1]=t.y,t.hist[n+2]=H0,t.hn++,K.length<8){const[c,s]=O0(t.x,t.y);K.push([c,s,P===0?.5:.3,1.6])}}for(const t of Q){let n=0,c=0;for(const T of Q){const R=Math.min(T.hn,W0);for(let b0=0;b0<R;b0++){const T0=b0*3,We=H0-T.hist[T0+2],Zt=t.x-T.hist[T0],$t=t.y-T.hist[T0+1],yt=Math.hypot(Zt,$t);if(yt<1e-5)continue;const Jt=it*he(it*yt)*Math.exp(-We/Ie)/yt;n+=Jt*Zt,c+=Jt*$t}}t.vx+=o*(a*n-dt*t.vx),t.vy+=o*(a*c-dt*t.vy);const s=A0(t.x,t.y);if(s>-.08){const T=Math.hypot(t.x,t.y)||1,R=(s+.08)*30;t.vx-=o*R*t.x/T,t.vy-=o*R*t.y/T}P>0&&(t.vx+=(F()-.5)*o*.8*P,t.vy+=(F()-.5)*o*.8*P);const M=Math.hypot(t.vx,t.vy);M>.4&&(t.vx*=.4/M,t.vy*=.4/M),t.x+=o*t.vx,t.y+=o*t.vy}}function xt(o,a,t){A0(o,a)>-.03||(u0.length>=4&&u0.shift(),u0.push({x:o,y:a,z:.55,vz:-.4,r:.011,walk:S>0}),t||(Q0=0))}function Ue(o){for(let a=u0.length-1;a>=0;a--){const t=u0[a];if(t.vz-=9*o,t.z+=t.vz*o,t.z<=t.r*.6){const[n,c]=O0(t.x,t.y);t.walk?(ht(t.x,t.y,(F()-.5)*.05,(F()-.5)*.05),K.push([n,c,-.35,1.8])):K.push([n,c,-1.4,2.4]),jt.plip(t.x),u0.splice(a,1)}}if(P===5){const a=Math.min(6,8-K.length);for(let t=0;t<a;t++){const n=F()*d,c=Math.sqrt(F())*.93,s=Math.cos(n)*c,M=Math.sin(n)*c;if(A0(s,M)>-.04)continue;const[T,R]=O0(s,M);K.push([T,R,2.2*(F()-.3),2.4])}if(M0.length<5&&F()<o*9){const t=F()*d,n=Math.sqrt(F())*.85,c=F()*d;M0.push({x:Math.cos(t)*n,y:Math.sin(t)*n,z:.005,vx:Math.cos(c)*.12,vy:Math.sin(c)*.12,vz:.55+F()*.5,r:.004+F()*.005})}}for(let a=M0.length-1;a>=0;a--){const t=M0[a];if(t.vz-=9*o,t.x+=t.vx*o,t.y+=t.vy*o,t.z+=t.vz*o,t.z<0){if(M0.splice(a,1),A0(t.x,t.y)<-.03&&K.length<8){const[n,c]=O0(t.x,t.y);K.push([n,c,-.8,1.6])}F()<.4&&jt.tick(t.x)}}}const B=new Float32Array(32*4),pt=r0===0?[.012,.012,.014]:r0===1?[.82,.8,.76]:[.42,.43,.45],Ne=[2.2,1.9,0,0][a0],V0=(o,a,t,n)=>o*(Math.sin(a*(n-4)+t)-Math.sin(t));function Ht(o){const a=o/3.4+.22*Math.sin(.23*(o-4))+V0(.13,.071,1.3,o)+V0(.077,.65,.4+5*h0,o)+V0(.098,.41,2.1+5*x0,o)+V0(.091,.263,4+5*L0,o);return Math.cos(Math.PI*(a-Math.sin(d*a)/d))}let K0=0;function Vt(o){N0(),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,E,E),m0(0,ct[U0]),m0(2,Xt),r.useProgram(v.comp),B.fill(0);const a=.42/(92*(d/Y))*(S>0?a0===2?3:ne:1);B.set([X[0],X[1],X[2],c0,O[0],O[1],O[2],E,H[0],H[1],H[2],o,W[0],W[1],W[2],Ht(o)],0),B.set([a,.011,.026,re*(.2+p0),a0,I0,Wt,Dt],16),B.set([q.F0,q.ior,.045,.045*(1-1/q.ior)*Ne],24),B.set([q.col[0],q.col[1],q.col[2],q.op],28),B.set(a0===2?se:[1,1,1,.022],40),B.set([pt[0],pt[1],pt[2],r0===0?.15:1],32),B.set([0,0,a0===3?.0015:5e-4,r0===0?0:r0===2?.01:.004],36),B.set([o*d*.6,P===5?1:0,0,It],56);let t=0;const n=(s,M,T,R)=>{t>=12||(B.set([s,M,T,R],64+t*4),t++)};for(const s of u0)n(s.x,s.y,s.z,s.r);const c=.5+.5*Ht(o*1.7+.3);for(const s of Q)n(s.x,s.y,s.r*(1.1+.9*c),s.r);for(const s of M0)n(s.x,s.y,s.z,s.r);r.uniform4fv(f.comp.uC,B),r.uniform4fv(f.comp.uL,k),r.uniform4i(f.comp.uI,t,12,0,0),r.drawArrays(r.TRIANGLES,0,3),K0++}const j0=8e3,Kt=new Float32Array(4096);let Y0=0,z0=0,E0=0,P0=0,vt=0,Ve=0;function Be(o){if(!e.sound.on)return;const a=Math.min(4096,Math.round(o*j0));if(a<8)return;const t=G0,n=.06+.25*p0,c=P>0?1:0;E0||(E0=t);for(let s=0;s<a;s++){E0+=(t-E0)*.0015,P0+=(n-P0)*.001,Y0+=E0/j0,Y0>1&&(Y0-=1),z0+=.5*E0/j0,z0>1&&(z0-=1);const M=Y0*d;let T=Math.sin(M)+.42*Math.sin(2*M)+.22*Math.sin(3*M)+.1*Math.sin(4*M)+.05*Math.sin(5*M);if(T=T*P0*.5+c*.12*P0*Math.sin(z0*d)*(1+.6*Math.sin(2*z0*d+1)),P===5){U^=U<<13,U^=U>>>17,U^=U<<5;const R=(U>>>0)/2147483648-1;vt+=(R-vt)*.2,T+=vt*.05*P0}Kt[s]=T}e.sound.pcm(Kt.subarray(0,a),j0,{vel:.6})}const jt={plip(o){e.sound.note(86+Math.round(F()*5),{dur:.09,vel:.32,wave:"sine",pan:p(o,-.8,.8)}),e.sound.hit("click",.12,{pan:o})},tick(o){e.sound.note(96+Math.round(F()*6),{dur:.03,vel:.08,wave:"sine",pan:p(o,-.8,.8)})}};let g=null,Q0=0,mt=4+5*x0;function qe(o){const a=e.input,t=a.taps(),n=a.x,c=a.y;if(a.down&&a.inside!==!1&&!g&&(g={x:n,y:c,px:n,py:c,t:0,drag:!1}),g)if(Q0=0,a.down){if(g.t+=o,!g.drag&&Math.hypot(n-g.x,c-g.y)>.018&&(g.drag=!0),g.drag){p0=p(p0-(c-g.py)*1.15,0,1);const s=n0;n0=p(n0+(n-g.px)*.95,Te,1),Math.abs(n0-s)>1e-4&&(ut(),w0=Math.max(w0,.7))}g.px=n,g.py=c}else{if(!g.drag){const[s,M]=kt(g.x*2-1,1-g.y*2);xt(s,M)}g=null}else if(Q0+=o,t.length&&!a.down){const[s,M]=kt(t[0].x*2-1,1-t[0].y*2);xt(s,M)}ke(be(p0))}function Ge(o){if(mt-=o,mt<0&&Q0>6&&(mt=(S>0?14:9)+6*((K0*.618+L0)%1),S===0||Q.length<3)){const a=(K0*.37+h0)%1*d,t=.07*Math.sqrt((K0*.71+x0)%1),n=L0*d,c=.2+.35*x0;xt(Math.cos(n)*c+Math.cos(a)*t,Math.sin(n)*c+Math.sin(a)*t,!0)}}let Yt=0,Xe=34*q.rate;function Qt(o){w0=Math.max(0,w0-o*.8),Ue(o),Se(o);const a=p(Math.ceil(Xe*o/q0),1,8);for(let t=0;t<a;t++)De(t===0);H0+=o}N0(),S>0&&(ht(-.25+.5*h0,-.2+.4*x0,.08*Math.cos(d0),.08*Math.sin(d0)),S===2&&ht(.3-.5*L0,.25-.3*h0,-.08*Math.cos(d0),-.08*Math.sin(d0)));for(let o=0,a=S>0?70:40;o<a;o++)Qt(1/20);H0=0;for(const o of Q)for(let a=0;a<W0;a++)o.hist[a*3+2]-=2;return Vt(0),(o,a)=>{a=Math.min(.25,Math.max(.001,a||o-Yt)),Yt=o,qe(a),Ge(a),N0(),Qt(a),Vt(o),Be(a)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
