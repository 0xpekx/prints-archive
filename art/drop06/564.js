// Red Dune: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/564.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(H0){H0&&H0.add({num:564,name:"Red Dune",fam:"Vistas",recipe:"A cracked white clay pan with camelthorn trees that died centuries ago, in front of a red dune whose top burns orange while the rest sits in blue shadow. The dune, the trees and the hour change every mint, and rare ones get a single tree or a gale smoking off the crests. Tap a crest to blow a glowing plume of sand off it, drag left or right to move the sun so the shadow slides down the dune, or hold for full morning, when the pan glares white and the trees turn bleached grey.",interactive:"Tap a dune crest to send a gust that streams sand off it in a glowing plume; drag left or right to move the sun along its path, so the shadow line sweeps down the dune and the tree shadows swing across the pan; hold and full morning comes: the shadow drains off the dune, the pan glares white and the trees turn from black silhouettes to bleached grey wood",music:!0,gl:!0,fps:30,seed:0,make(P){const t=P.gl,q=P.size,M=!!P.home,at=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D; precision highp usampler2D;
`,Wo=at+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",lt=`
uniform vec4 uU[40]; uniform ivec4 uLp; uniform highp sampler3D uN;
#define CAM uU[0].xyz
#define TANH uU[0].w
#define FW uU[1].xyz
#define PXA uU[1].w
#define RT uU[2].xyz
#define TT uU[2].w
#define UPV uU[3].xyz
#define SZF uU[3].w
#define SUN uU[4].xyz
#define SMN uU[4].w
#define SUNC uU[5].rgb
#define EXPO uU[5].w
#define ZEN uU[6].rgb
#define SAZ uU[6].w
#define HORS uU[7].rgb
#define STAN uU[7].w
#define HORA uU[8].rgb
#define BELTK uU[8].w
#define AMB uU[9].rgb
#define HAZEK uU[9].w
#define PANC uU[10].xy
#define PANR uU[10].zw
#define FFD uU[11].xy
#define FFH uU[11].z
#define FFP uU[11].w
#define COR0 uU[12].xy
#define CORD uU[12].zw
#define HZ0 uU[13].xy
#define HZS uU[13].z
#define AZ0 uU[13].w
#define AZD uU[14].x
#define SM0 uU[14].yz
#define SMS uU[14].w
#define WIND uU[15].xyz
#define WSPD uU[15].w
#define FOOT uU[16]
#define TRK0 uU[17]
#define TRK1 uU[18]
#define TRK2 uU[19]
#define MOON uU[20]
#define SANDA uU[21].rgb
#define NTREE uU[21].w
#define CLAYA uU[22].rgb
#define FOOTL uU[22].w
#define SILTA uU[23].rgb
#define NCR uU[23].w
#define HAS uU[24]
#define GLOWC uU[31].rgb
#define SPIN uU[31].w
#define PANL uU[32].rgb
#define NPL uU[32].w
uint hu(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf1(uint x){ return float(hu(x) >> 8) / 16777216.; }
vec2 h22(vec2 p){ uvec2 q = uvec2(ivec2(p) + 32768); uint a = hu(q.x * 1597334677u ^ hu(q.y + 40503u)); return vec2(float(a >> 8), float(hu(a) >> 8)) / 16777216.; }
float smax(float a, float b, float k){ float h = max(k - abs(a - b), 0.) / k; return max(a, b) + h * h * k * .25; }
float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) * (1. / 64.), 0.).r; }
vec3 ray(vec2 fc){ vec2 q = fc / SZF * 2. - 1.; return normalize(FW + (q.x * RT + q.y * UPV) * TANH); }
float dEnc(float t){ return log2(t + 1.) / log2(30001.); }
float dDec(float d){ return exp2(d * log2(30001.)) - 1.; }
vec2 octE(vec3 n){ n /= abs(n.x) + abs(n.y) + abs(n.z); vec2 e = n.y >= 0. ? n.xz : (1. - abs(n.zx)) * (step(0., n.xz) * 2. - 1.); return e * .5 + .5; }
vec3 octD(vec2 e){ e = e * 2. - 1.; vec3 n = vec3(e.x, 1. - abs(e.x) - abs(e.y), e.y); if (n.y < 0.) n.xz = (1. - abs(n.zx)) * (step(0., n.xz) * 2. - 1.); return normalize(n); }
`,Vo=`
uniform sampler2D uS;
float spineH(vec2 p, int i){
  vec4 A = texelFetch(uS, ivec2(i * 3, 0), 0), B = texelFetch(uS, ivec2(i * 3 + 1, 0), 0), C = texelFetch(uS, ivec2(i * 3 + 2, 0), 0);
  vec2 q = p - A.xy;
  float u = dot(q, A.zw), v = dot(q, vec2(-A.w, A.z));
  float uc = clamp(u, 0., B.x);
  float off = B.w * (sin(uc * C.x + C.y) + .45 * sin(uc * C.x * 2.37 + C.y * 1.9) + .24 * sin(uc * C.x * 5.3 + C.y * .7));
  float ue = sqrt(uc * uc + 4900.) - 70.;   // a rounded summit: the height law had a cusp at the spine's head (a pyramid apex)
  float hc = B.y * (1. - pow(ue / B.x, C.z)) * (.9 + .075 * sin(uc * C.x * .61 + C.y * 2.7) + .05 * sin(uc * C.x * 2.9 + C.y * 1.3) + .022 * sin(uc * C.x * 7.1 + C.y * 4.1));
  float d = (v - off) * B.z;
  return hc - smax(d * .64, -d * C.w, 2.) - max(max(-u, u - B.x), 0.) * .45;
}
float corrD(vec2 p){ vec2 q = p - COR0; return length(q - CORD * max(dot(q, CORD), 0.)); }
float terrainK(vec2 p, out float pan, out float kc){
  vec2 e = (p - PANC) / PANR;
  float rr = length(e) + .22 * (n3(vec3(p * .006, 3.)) - .5) + .08 * (n3(vec3(p * .03, 4.)) - .5);
  pan = smoothstep(1.04, .9, rr);
  float fl = mix(1. + 4.5 * n3(vec3(p * .003, 7.)), -.3, pan);
  kc = smoothstep(70., 300., corrD(p));
  float m = -1e4;
  for (int i = 0; i < uLp.z; i++) { float h = spineH(p, i); m = smax(m, h, clamp(30. - m * .09, 1.5, 30.)); }
  float h = smax(fl, m * kc + (kc - 1.) * 40., 18.);
  vec2 r = vec2(dot(p, FFD), dot(p, vec2(-FFD.y, FFD.x)));
  float y = r.y + 260. * sin(r.x * .00093 + 1.3) + 80. * sin(r.x * .0027 + 4.);
  float i0 = floor(y / FFP), d0 = y - i0 * FFP, d1 = d0 - FFP;
  float fh = max(FFH * (.2 + 1.1 * n3(vec3(i0 * 5.3, r.x * .0024, 11.))) - smax(d0 * .62, -d0 * .21, 3.),
                 FFH * (.2 + 1.1 * n3(vec3(i0 * 5.3 + 5.3, r.x * .0024, 11.))) - smax(d1 * .62, -d1 * .21, 3.));
  fh = fh * kc + (kc - 1.) * 40.;
  h = smax(h, mix(-100., fh, smoothstep(900., 1900., length(p - PANC))), 26.);
  float sk = smoothstep(.5, 8., h);
  h += sk * (5.5 * n3(vec3(p * .0065, 1.)) + 1.5 * n3(vec3(p * .024, 2.)) - 3.5);
  return h;
}
float terrain(vec2 p){ float a, b; return terrainK(p, a, b); }
`,I0=at+lt+`
uniform highp usampler2D uHF;
out vec4 o;
float hf(vec2 g){
  vec2 q = g * float(uLp.y) - .5, f = fract(q); ivec2 i = ivec2(floor(q)), N = ivec2(uLp.y - 1);
  float a = uintBitsToFloat(texelFetch(uHF, clamp(i, ivec2(0), N), 0).x), b = uintBitsToFloat(texelFetch(uHF, clamp(i + ivec2(1, 0), ivec2(0), N), 0).x);
  float c = uintBitsToFloat(texelFetch(uHF, clamp(i + ivec2(0, 1), ivec2(0), N), 0).x), d = uintBitsToFloat(texelFetch(uHF, clamp(i + ivec2(1, 1), ivec2(0), N), 0).x);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
void main(){
  vec2 uv = gl_FragCoord.xy / float(uLp.y);
  vec2 p = HZ0 + uv * HZS;
  float h0 = hf(uv) + .4, dt = HZS / float(uLp.y);
  vec4 r = vec4(-1.);
  for (int k = 0; k < uLp.z; k++) {
    float az = AZ0 + AZD * float(k);
    vec2 d = vec2(sin(az), cos(az));
    float m = -1., t = dt * .9;
    for (int i = 0; i < uLp.x; i++) {
      vec2 u2 = (p + d * t - HZ0) / HZS;
      if (u2.x < 0. || u2.y < 0. || u2.x > 1. || u2.y > 1.) break;
      m = max(m, (hf(u2) - h0) / t);
      t = t * 1.085 + dt * .25;
    }
    if (k == 0) r.x = m; else if (k == 1) r.y = m; else if (k == 2) r.z = m; else r.w = m;
  }
  o = r;
}`,jo=at+lt+Vo+`
uniform sampler2D uT;
out uvec4 o;
void main(){
  bool bk = uLp.y > 0;
  vec3 rd = ray(gl_FragCoord.xy), ro = CAM;
  float t = .05, tp = .05, h = 1e9, ba = 0., bb = 0.; bool hit = false, esc = false, br = false; int nb = 0;
  float lh = length(rd.xz);
  // crest anti-aliasing: the march keeps its least clearance in pixels (dm) and the steps either side of it (tm0, tm1); a ray
  // that escapes within 6 px of a crest walks that stretch again in twelfths (rw > 0), through the same terrain() call. That
  // finds a crest the coarse step jumped over (the ray turns into a hit) or the true least clearance, which gives the pixel
  // its terrain coverage (the edge is drawn half a pixel wide outside the old hard silhouette)
  float dm = 1e9, tmn = 0., tm0 = 0., tm1 = 0.; int rw = 0;
  // one terrain() call site for the march and for the four height samples of the gradient after it (gk >= 0), so the
  // terrain is compiled once; 'dn' ends a march step, and the next pass resolves the march as the loop's end used to
  int gk = -1; bool dn = false;
  float cov = 1., fp = 0., e = 0.; vec3 p = vec3(0.); vec2 du = vec2(0.), dv = vec2(0.);
  float hs[4];
  for (int i = 0; i < uLp.x + 30; i++) {
    vec2 q;
    float py = 0., tt = 0.;
    if (gk < 0) {
      bool fin = dn || (rw == 0 && i >= uLp.x);
      if (!fin) {
        tt = br ? .5 * (ba + bb) : t;
        vec3 pm = ro + rd * tt;
        if (!br && rw == 0 && ((rd.y > 0. && pm.y > 520.) || tt > 30000.)) {
          esc = true;
          if (bk || dm > 6.) fin = true;
          else { rw = 1; tp = tm0; t = tm0 + (tm1 - tm0) / 12.; continue; }
        }
        q = pm.xz; py = pm.y;
      }
      if (fin) {
        if (br) t = bb;
        if (!hit && !esc && h < 60.) hit = true;
        if (!hit && !bk) {
          cov = esc ? clamp(1. - dm, 0., 1.) : 0.;
          if (cov < .008) { o = uvec4(0u); return; }
          t = tmn;
        }
        p = bk ? vec3(HZ0 + gl_FragCoord.xy / float(uLp.y) * HZS, 0.).xzy : ro + rd * t;
        fp = t * PXA; e = max(.05, fp * 1.2);
        du = -normalize(rd.xz + 1e-6); dv = vec2(-du.y, du.x);
        gk = 0;
      }
    }
    if (gk >= 0) q = p.xz + (gk == 1 ? du : (gk == 2 ? dv : -dv)) * (gk == 0 ? 0. : e);
    float th = terrain(q);
    if (gk >= 0) { hs[gk] = th; gk++; if (gk >= 4 || bk) break; continue; }
    float hh = py - th;
    if (br) { if (hh < 0.) bb = tt; else ba = tt; nb++; if (nb >= 8) dn = true; }
    else if (hh < .00015 * tt) { hit = true; br = true; esc = false; ba = tp; bb = tt; }
    else if (rw > 0) { float c = hh / (tt * PXA); if (c < dm) { dm = c; tmn = tt; } tp = tt; t += (tm1 - tm0) / 12.; if (++rw >= 12) dn = true; }
    else {
      float c = hh / (tt * PXA); bool mn = c < dm; if (mn) { dm = c; tmn = tt; tm0 = tp; }
      h = hh; tp = tt; t += max(hh * .92 / max(.68 * lh - rd.y, .12), (tt > 1500. ? .0022 : .0014) * tt + .015);
      if (mn) tm1 = t;
    }
  }
  if (bk) { o = uvec4(floatBitsToUint(hs[0]), 0u, 0u, 0u); return; }
  float h0 = hs[0];
  vec2 pe = (p.xz - PANC) / PANR;
  float pan = smoothstep(1.04, .9, length(pe) + .22 * (n3(vec3(p.xz * .006, 3.)) - .5) + .08 * (n3(vec3(p.xz * .03, 4.)) - .5)), kc = smoothstep(70., 300., corrD(p.xz));
  float gu = (hs[1] - h0) / e, gv = (hs[2] - hs[3]) / (2. * e);
  vec2 gg = du * gu + dv * gv;
  vec3 n = normalize(vec3(-gg.x, 1., -gg.y));
  uint mat = 1u; float alb = 1.;
  if (pan > .5 && h0 < .1) {
    mat = 2u;
  } else if (kc < .5 && h0 < 9.) {
    mat = 3u;
    alb *= .8 + .35 * n3(vec3(p.xz * .02, 6.)) + .12 * n3(vec3(p.xz * .2, 2.));
  } else {
    float steep = smoothstep(.93, .78, n.y);
    vec2 fd = normalize(-n.xz + 1e-5), pr = vec2(fd.y, -fd.x);
    float fa = dot(p.xz, fd), fb = dot(p.xz, pr);
    float st = n3(vec3(fb * .14, fa * .011, 5.)) + .5 * n3(vec3(fb * .45, fa * .035, 8.));
    float sv = smoothstep(4., 1., fp);
    n.xz += pr * (st - .75) * .06 * steep * sv + pr * (n3(vec3(fb * 1.3, fa * .1, 9.)) - .5) * .08 * steep * smoothstep(1., .3, fp);
    float lam = 1.1, ph = dot(p.xz, WIND.xz) / lam + 3. * n3(vec3(p.xz * .025, 3.)) + 2.2 * n3(vec3(p.xz * .13, 16.));
    float rk = smoothstep(lam * .3, lam * .12, fp) * (1. - steep) * .7;
    float fr = fract(ph);
    n.xz += WIND.xz * (fr < .7 ? -fr / .7 : (fr - .7) / .3 - 1.) * .1 * rk;
    n = normalize(n);
    alb *= .95 + .12 * (st - .75) * steep + .1 * n3(vec3(p.xz * .004, 12.)) + .06 * n3(vec3(p.xz * .03, 13.)) + .1 * (n3(vec3(dot(p.xz, WIND.xz) * .004, dot(p.xz, vec2(-WIND.z, WIND.x)) * .05, 15.)) - .5) + .08 * smoothstep(.9, .99, n.y) * (n3(vec3(p.xz * .1, 14.)) - .5);
  }
  if (h0 < 2.5 && mat != 2u) {
    for (int i = 0; i < int(NTREE); i++) {
      vec4 tb = texelFetch(uT, ivec2(i, 0), 0);
      float d = length(p.xz - tb.xy);
      alb *= 1. - tb.w * .3 * exp(-max(d - tb.z, 0.) * 2.2);
    }
  }
  vec2 oc = octE(n);
  uint dz = uint(clamp(dEnc(t), 0., 1.) * 16777215.);
  // the clay's pixels carry their exact depth to the clay pass (CL_FS), which shades them; 16-bit halves for the RGBA16UI target
  uint ox = (dz << 8) | (uint(cov * 63. + .5) << 2) | mat, oy = mat == 2u ? floatBitsToUint(t) : (uint(oc.x * 4095. + .5) << 20) | (uint(oc.y * 4095. + .5) << 8) | uint(clamp(alb / 1.4, 0., 1.) * 255. + .5);
  o = uvec4(ox & 65535u, ox >> 16, oy & 65535u, oy >> 16);
}`,Ko=at+lt+`
uniform sampler2D uT; uniform highp usampler2D uB;
out uvec4 o;
float crack(vec2 x, float cs, out vec2 toC, out float cid){
  vec2 y = x / cs, n = floor(y), f = fract(y), mg = vec2(0.), mr = vec2(0.);
  float md = 8.;
  for (int j = -uLp.w; j <= uLp.w; j++) for (int i = -uLp.w; i <= uLp.w; i++) {
    vec2 g = vec2(float(i), float(j)), r = g + h22(n + g) * .9 + .05 - f; float d = dot(r, r);
    if (d < md) { md = d; mr = r; mg = g; }
  }
  md = 8.;
  for (int j = -uLp.w - 1; j <= uLp.w + 1; j++) for (int i = -uLp.w - 1; i <= uLp.w + 1; i++) {
    vec2 g = mg + vec2(float(i), float(j)), r = g + h22(n + g) * .9 + .05 - f, dr = r - mr;
    if (dot(dr, dr) > 1e-5) md = min(md, dot(.5 * (mr + r), normalize(dr)));
  }
  toC = mr; cid = h22(n + mg + 17.).x;
  return md * cs;
}
float n3r(vec2 q, float z){ return n3(vec3(q, z + dot(q, vec2(.4137, .2871)))); }
// a shoe print (l: across, along; metres from the heel)
float sole(vec2 l){ vec2 h = vec2(0., .045), f = vec2(.012, .2), ba = f - h; float s = clamp(dot(l - h, ba) / dot(ba, ba), 0., 1.); return length(l - h - ba * s) - mix(.041, .05, s); }
float hoof(vec2 l){ return min(length((l - vec2(-.016, 0.)) / vec2(.015, .03)), length((l - vec2(.016, 0.)) / vec2(.015, .03))) - 1.; }
float track(vec2 p, vec4 tk, float fp, inout vec2 dn){
  vec2 d = vec2(sin(tk.z), cos(tk.z)), q = p - tk.xy;
  float s = dot(q, d), lat = dot(q, vec2(d.y, -d.x)) - 1.6 * sin(s * .045 + tk.w) - .7 * sin(s * .11 + tk.w * 2.);
  if (abs(lat) > .4 || s < 0. || s > 600.) return 1.;
  float k = floor(s / .46 + .5), sd = mod(k, 2.) * 2. - 1.;
  vec2 l = vec2(lat - sd * .1, s - k * .46 - .02 * sd);
  float hd = hoof(l), vis = smoothstep(.05, .012, fp);
  float in_ = smoothstep(.25, -.35, hd) * vis;
  dn += normalize(l + 1e-4) * smoothstep(.6, 0., abs(hd)) * .35 * vis * sign(hd);
  return 1. - .32 * in_;
}
float feet(vec2 p, float fp, inout vec2 dn){
  if (fp > .03) return 1.;
  vec2 d = FOOT.zw, q = p - FOOT.xy;
  float s = dot(q, d), lat = dot(q, vec2(d.y, -d.x)) - .3 * sin(s * .21);
  if (abs(lat) > .5 || s < -.5 || s > FOOTL + .4) return 1.;
  float k = min(floor(s / .37 + .5), floor(FOOTL / .37)), sd = mod(k, 2.) * 2. - 1.;
  vec2 l = vec2(lat - sd * .11, s - k * .37 + .12);
  float lr = sole(vec2(l.x * sd, l.y));
  if (s > FOOTL - .3) { vec2 l2 = vec2(lat + sd * .11, s - FOOTL + .12); lr = min(lr, sole(vec2(-l2.x * sd, l2.y))); }
  float vis = smoothstep(.03, .008, fp);
  float in_ = smoothstep(.004, -.004, lr) * vis;
  float tread = .5 + .5 * sin(l.y * 140.) * sin(l.x * 90. + l.y * 30.);
  dn += vec2(sin(l.y * 140.), 0.) * in_ * .08 + normalize(l + 1e-4) * smoothstep(.012, 0., abs(lr)) * .5 * vis * sign(lr);
  return 1. - in_ * (.14 + .1 * tread) + smoothstep(.012, 0., abs(lr - .006)) * .06 * vis;
}
void main(){
  uvec4 b = texelFetch(uB, ivec2(gl_FragCoord.xy), 0);
  uint ox = b.x | (b.y << 16), oy = b.z | (b.w << 16);
  if ((ox & 3u) != 2u) { o = uvec4(ox, oy, 0u, 0u); return; }
  float t = uintBitsToFloat(oy);
  vec3 rd = ray(gl_FragCoord.xy), ro = CAM;
  vec3 p = ro + rd * t, n;
  float fp = t * PXA, alb = 1.;
    vec2 dn = vec2(0.), toC, toC2; float cid, cid2, e1, e2;
    // the noise volume repeats every 64 cells, so the clay's detail is read on tilted slices (n3r) that never line up again,
    // and a plate-scale warp (2 m) stretches and squeezes the polygons so their sizes vary instead of reading as one tile
    vec2 wp = p.xz + (vec2(n3r(p.xz * 2.3, 1.), n3r(p.xz * 2.3, 8.)) - .5) * .16 + (vec2(n3r(p.xz * 9., 2.), n3r(p.xz * 9., 6.)) - .5) * .03
            + (vec2(n3r(p.xz * .5, 42.), n3r(p.xz * .5, 43.)) - .5) * .5;
    float mk1 = smoothstep(.22, .5, n3(vec3(p.xz * .11, 30.))), mk2 = smoothstep(.3, .6, n3(vec3(p.xz * .23, 31.)));
    for (int k = 0; k < 2 * uLp.w; k++) {   // both crack scales through one call site (uLp.w is always 1)
      vec2 tq; float cq, eq = crack(k == 0 ? wp + vec2(31.7, 12.1) : wp * 1.07 + vec2(5.3, 77.), k == 0 ? .34 : .085, tq, cq);
      if (k == 0) { e1 = eq; toC = tq; cid = cq; } else { e2 = eq; toC2 = tq; cid2 = cq; }
    }
    float v1 = smoothstep(.11, .012, fp) * (.35 + .65 * mk1);
    float w1 = (.0045 + .012 * cid * cid) * (.5 + 1.2 * n3r(wp * 6., 3.));
    // a crack narrower than the pixel is drawn a pixel wide at its true share of darkness (it was sampled into dots)
    float hw1 = max(w1 * .5, fp * .6);
    float cr1 = (1. - smoothstep(hw1, hw1 + fp * .9, e1)) * (w1 * .5 / hw1);
    float lip = smoothstep(w1 * .5, w1 * .5 + .004 + fp, e1) * smoothstep(w1 * .5 + .012 + fp, w1 * .5 + .004 + fp, e1);
    float sh1 = smoothstep(w1 * .5 + .03, w1 * .5, e1) * (1. - cr1);
    alb *= mix(1., .32 + .25 * smoothstep(.012, 0., w1), cr1 * v1) * (1. + (lip * (.02 + .1 * fract(cid * 7.13)) - sh1 * .06 + (cid - .5) * .07) * v1);
    dn += normalize(toC + 1e-5) * smoothstep(.04, .0, e1) * .35 * v1 * (.4 + cid) + (h22(vec2(cid * 917., cid * 311.)) - .5) * .12 * v1;
    float v2 = smoothstep(.016, .004, fp) * mk2;
    float w2 = .0008 + .0018 * cid2;
    float hw2 = max(w2, fp * .6);
    alb *= mix(1., .62, (1. - smoothstep(hw2, hw2 + fp * .9, e2)) * (w2 / hw2) * v2 * step(.3, cid2) * step(.08, e1));
    dn += normalize(toC2 + 1e-5) * smoothstep(.012, .0, e2) * .18 * v2;
    alb *= mix(1., .95, smoothstep(.012, .07, fp));
    float pt = n3(vec3(p.xz * .012, 21.)), pt2 = n3(vec3(p.xz * .07, 22.));
    alb *= .9 + .2 * smoothstep(.3, .75, pt) - .08 * smoothstep(.55, .8, pt2);
    vec2 pq = p.xz + vec2(cid * 61.7, cid * 23.3);   // each plate's own grain
    float fl = smoothstep(.62, .7, n3r(wp * 3.5, 23.)) * smoothstep(.02, .005, fp);
    alb *= 1. - .07 * fl;
    alb *= .9 + .16 * n3(vec3(p.xz * .045, 9.)) + .06 * n3(vec3(p.xz * .5, 4.)) + .06 * (n3r(pq * 14., 2.) - .5) * smoothstep(.01, .003, fp);
    float grit = smoothstep(.82, .9, n3r(pq * 160., 3.)) * smoothstep(.004, .0015, fp);
    alb *= 1. - .25 * grit;
    dn += (vec2(n3r(pq * 45., 1.), n3r(pq * 45., 5.)) - .5) * .35 * smoothstep(.005, .0015, fp);
    float tkm = 1.;
    for (int k = 0; k < 3 * uLp.w; k++) tkm *= track(p.xz, k == 0 ? TRK0 : (k == 1 ? TRK1 : TRK2), fp, dn);
    alb *= tkm * feet(p.xz, fp, dn);
    float edge = smoothstep(.75, .97, length((p.xz - PANC) / PANR));
    alb *= 1. - .1 * edge;
    n = normalize(vec3(dn.x, 1., dn.y));
  {
    for (int i = 0; i < int(NTREE); i++) {
      vec4 tb = texelFetch(uT, ivec2(i, 0), 0);
      float d = length(p.xz - tb.xy);
      alb *= 1. - tb.w * .3 * exp(-max(d - tb.z, 0.) * 2.2);
    }
  }
  vec2 oc = octE(n);
  o = uvec4(ox, (uint(oc.x * 4095. + .5) << 20) | (uint(oc.y * 4095. + .5) << 8) | uint(clamp(alb / 1.4, 0., 1.) * 255. + .5), 0u, 0u);
}`,Qo=at+lt+`
layout(location = 0) in vec4 aA; layout(location = 1) in vec4 aB; layout(location = 2) in vec4 aM; layout(location = 3) in vec4 aN;
flat out vec4 vA; flat out vec4 vB; flat out vec4 vM; flat out vec4 vN;
void main(){
  vA = aA; vB = aB; vM = aM; vN = aN;
  int k = gl_VertexID;
  vec2 cr = vec2((k == 1 || k == 2 || k == 4) ? 1. : -1., (k == 2 || k == 4 || k == 5) ? 1. : -1.);
  vec3 a = aA.xyz - CAM, b = aB.xyz - CAM;
  float za = dot(a, FW), zb = dot(b, FW), NR = .06;
  if (za < NR && zb < NR) { gl_Position = vec4(2., 2., 2., 1.); return; }
  if (za < NR) { a = mix(a, b, (NR - za) / (zb - za)); za = NR; }
  if (zb < NR) { b = mix(b, a, (NR - zb) / (za - zb)); zb = NR; }
  vec2 sa = vec2(dot(a, RT), dot(a, UPV)) / (za * TANH), sb = vec2(dot(b, RT), dot(b, UPV)) / (zb * TANH);
  float pr = 2. / SZF;
  float ea = 1.25 + .4 * dot(sa, sa), eb = 1.25 + .4 * dot(sb, sb);
  float Ra = aA.w / (za * TANH) * ea + 2. * pr, Rb = aB.w / (zb * TANH) * eb + 2. * pr;
  vec2 ax = sb - sa; float L = length(ax);
  vec2 dx = L > 1e-7 ? ax / L : vec2(1., 0.), dy = vec2(-dx.y, dx.x);
  vec2 P = cr.x < 0. ? sa - dx * Ra : sb + dx * Rb;
  P += dy * cr.y * max(Ra, Rb);
  gl_Position = vec4(P, .5, 1.);
}`,Yo=at+lt+`
uniform highp usampler2D uA;
flat in vec4 vA; flat in vec4 vB; flat in vec4 vM; flat in vec4 vN;
out uvec4 o;
vec4 iRC(vec3 ro, vec3 rd, vec3 pa, vec3 pb, float ra, float rb){
  vec3 ba = pb - pa, oa = ro - pa, ob = ro - pb;
  float rr = ra - rb, m0 = dot(ba, ba), m1 = dot(ba, oa), m2 = dot(ba, rd), m3 = dot(rd, oa), m5 = dot(oa, oa), m6 = dot(ob, rd), m7 = dot(ob, ob);
  float d2 = m0 - rr * rr, k2 = d2 - m2 * m2, k1 = d2 * m3 - m1 * m2 + m2 * rr * ra, k0 = d2 * m5 - m1 * m1 + m1 * rr * ra * 2. - m0 * ra * ra;
  float h = k1 * k1 - k0 * k2;
  vec4 res = vec4(-1.);
  if (h >= 0.) {
    float t = (-sqrt(h) - k1) / k2, y = m1 - ra * rr + t * m2;
    if (y > 0. && y < d2) res = vec4(t, normalize(d2 * (oa + t * rd) - ba * y));
    else {
      float h1 = m3 * m3 - m5 + ra * ra, h2 = m6 * m6 - m7 + rb * rb;
      vec4 r = vec4(1e20);
      if (h1 > 0.) { t = -m3 - sqrt(h1); r = vec4(t, (oa + t * rd) / ra); }
      if (h2 > 0.) { t = -m6 - sqrt(h2); if (t < r.x) r = vec4(t, (ob + t * rd) / rb); }
      if (r.x < 1e19) res = r;
    }
  }
  return res;
}
void main(){
  vec3 rd = ray(gl_FragCoord.xy), ro = CAM, pa = vA.xyz, pb = vB.xyz;
  float ra = vA.w, rb = vB.w;
  vec3 ba = pb - pa, w0 = ro - pa;
  float b = dot(rd, ba), cc = dot(ba, ba), d = dot(rd, w0), e = dot(ba, w0);
  float s = clamp((e - b * d) / max(cc - b * b, 1e-9), 0., 1.);
  float tc = b * s - d;
  vec3 cp = ro + rd * tc, sp = pa + ba * s;
  float dm = length(cp - sp), rs = mix(ra, rb, s), fp = max(tc, .05) * PXA;
  if (.5 + (rs * 1.1 - dm) / fp < .004 || tc < .05) discard;
  vec4 ht = iRC(ro, rd, pa, pb, ra, rb);
  float t = tc; vec3 n = normalize(cp - sp + 1e-6);
  if (ht.x > 0.) { t = ht.x; n = ht.yzw; }
  uint ax = texelFetch(uA, ivec2(gl_FragCoord.xy), 0).x;
  float tT = (ax & 252u) != 252u ? 1e9 : dDec(float(ax >> 8) / 16777215.);
  if (t > tT) discard;
  // the wood's grain in the limb's own frame (u is carried along the limb in JS, sa is the arc length): split lengthwise
  // into fissures a few cm apart that twist slowly round the limb; each scale fades where a pixel covers it
  vec3 P = ro + rd * t, axd = normalize(ba + 1e-6);
  vec3 u = normalize(vN.xyz - axd * dot(vN.xyz, axd) + 1e-6), v = cross(axd, u);
  float L = max(length(ba), 1e-4), sl = dot(P - pa, axd), sa = vM.z + sl * (vM.w - vM.z) / L;
  vec3 w = P - pa - axd * sl;
  float tw = sa * (.3 + .4 * fract(vN.w * 7.31)) + vN.w, rc = max(rs, .1);
  vec2 cs = normalize(vec2(dot(w, u), dot(w, v)) + 1e-6);
  cs = vec2(cs.x * cos(tw) - cs.y * sin(tw), cs.x * sin(tw) + cs.y * cos(tw));
  vec2 cs2 = cs + vec2(-cs.y, cs.x) * (.18 / (rc * 12.));
  float w1 = smoothstep(.07, .022, fp), w2 = smoothstep(.022, .008, fp);
  float g1 = n3(vec3(cs * rc * 12., sa * .6 + vN.w)), g1b = n3(vec3(cs2 * rc * 12., sa * .6 + vN.w)), g2 = n3(vec3(cs * rc * 34., sa * 1.8 + vN.w * 1.7));
  // fissures are the noise's mid-level lines: long, narrow, dark grooves (the plain noise value only made soft blotches)
  float f1 = abs(g1 - .5), fis = smoothstep(.07, 0., f1) * w1, fis2 = smoothstep(.06, 0., abs(g2 - .5)) * w2;
  float cov = clamp(.5 + (rs * (1. - .12 * fis + .1 * (g2 - .5) * w2) - dm) / fp, 0., 1.);
  if (cov < .004) discard;
  float bark = clamp(.62 + .3 * (g1 - .5) * w1 + .45 * (g2 - .5) * w2 - .6 * fis - .3 * fis2, 0., 1.);
  if (vM.x > 1.5) bark = .5 + .3 * (g2 - .5);
  vec3 tg = normalize(cross(axd, n) + 1e-6);
  n = normalize(n + tg * ((abs(g1b - .5) - f1) / .18 * .8 * w1 + (g2 - .5) * .9 * w2) * step(vM.x, 1.5));
  vec2 oc = octE(n);
  // a soft edge loses the depth test to solid wood close behind it (a limb's edge over the next piece at a joint, a twig
  // over a limb): the stage keeps one coverage per pixel, and the edge's would let the dune show through the wood
  gl_FragDepth = dEnc(t + (1. - cov) * (2. * rs + 2. * fp));
  o = uvec4(uint(clamp(dEnc(t), 0., 1.) * 65535.), (uint(oc.x * 255. + .5) << 8) | uint(oc.y * 255. + .5), (uint(cov * 255. + .5) << 8) | uint(bark * 255. + .5), uint(vM.x + .5) | (uint(clamp(vM.y, 0., 1.) * 15. + .5) << 4));
}`,Jo=at+lt+`
layout(location = 0) in vec4 aA; layout(location = 1) in vec4 aB; layout(location = 2) in vec4 aM;
flat out vec4 vA; flat out vec4 vB; out vec2 vG;
void main(){
  vA = aA; vB = aB;
  int k = gl_VertexID;
  vec2 cr = vec2((k == 1 || k == 2 || k == 4) ? 1. : -1., (k == 2 || k == 4 || k == 5) ? 1. : -1.);
  vec2 sl = SUN.xz / SUN.y, lh = normalize(SUN.xz + 1e-6);
  vec2 ga = aA.xz - aA.y * sl, gb = aB.xz - aB.y * sl;
  float r = max(aA.w, aB.w) * 1.15 + SMS / SMN * 1.5, ra = min(r / max(SUN.y, .04), 40.);
  vec2 ex = vec2(sqrt(ra * ra * lh.x * lh.x + r * r * lh.y * lh.y), sqrt(ra * ra * lh.y * lh.y + r * r * lh.x * lh.x));
  vec2 lo = min(ga, gb) - ex, hi = max(ga, gb) + ex;
  vG = mix(lo, hi, cr * .5 + .5);
  gl_Position = vec4((vG - SM0) / SMS * 2. - 1., .5, 1.);
}`,$o=at+lt+`
flat in vec4 vA; flat in vec4 vB; in vec2 vG;
void main(){
  vec3 ro = vec3(vG.x, 0., vG.y), rd = SUN, pa = vA.xyz, ba = vB.xyz - vA.xyz, w0 = ro - pa;
  float b = dot(rd, ba), cc = dot(ba, ba), d = dot(rd, w0), e = dot(ba, w0);
  float s = clamp((e - b * d) / max(cc - b * b, 1e-9), 0., 1.);
  float tc = max(b * s - d, 0.);
  vec3 cp = ro + rd * tc, sp = pa + ba * s;
  if (length(cp - sp) > max(mix(vA.w, vB.w, s), SMS / SMN * .4)) discard;
  gl_FragDepth = 1. - clamp((cp.y + 1.) / 41., 0., 1.);
}`,q0=at+lt+`
uniform sampler2D uC; uniform sampler2D uHZ; uniform highp usampler2D uHF;
out vec4 vC; out vec2 vQ; out float vT;
#define PL0 uU[25]
#define PL1 uU[26]
#define PL2 uU[27]
#define PD0 uU[28]
#define PD1 uU[29]
#define PD2 uU[30]
float hzS(vec3 p){
  if (HAS.x < .5) return 1.;
  vec2 uv = (p.xz - HZ0) / HZS;
  if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) return 1.;
  vec4 hz = textureLod(uHZ, uv, 0.);
  float a = clamp((SAZ - AZ0) / AZD, 0., 3.);
  float h = a < 1. ? mix(hz.x, hz.y, a) : (a < 2. ? mix(hz.y, hz.z, a - 1.) : mix(hz.z, hz.w, a - 2.));
  float hg = uintBitsToFloat(texelFetch(uHF, ivec2(uv * 512.), 0).x);
  return smoothstep(-.01, .01, STAN - h + .01 + max(p.y - hg, 0.) * .004);
}
void main(){
  int id = gl_InstanceID, k = gl_VertexID;
  vec2 cr = vec2((k == 1 || k == 2 || k == 4) ? 1. : -1., (k == 2 || k == 4 || k == 5) ? 1. : -1.);
  uint ui = uint(id);
  float h1 = hf1(ui * 4u + 1u), h2 = hf1(ui * 4u + 2u), h3 = hf1(ui * 4u + 3u), h4 = hf1(ui * 4u + 4u);
  vec3 pos = vec3(0.), vel = vec3(0.); float size = 1., a = 0.;
  int np = int(NPL);
  if (id < np * 3) {
    int pk = id / np;
    vec4 P0 = pk == 0 ? PL0 : (pk == 1 ? PL1 : PL2), PD = pk == 0 ? PD0 : (pk == 1 ? PD1 : PD2);
    float gr = PD.w;
    float age = TT - P0.w - h1 * (gr > .5 ? .6 : 2.8), life = (gr > .5 ? 3.5 : 2.5) + 3.5 * h2 * h2;
    if (PD.z > 0. && age > 0. && age < life) {
      vec3 tg = vec3(PD.x, 0., PD.y);
      vec3 x0 = P0.xyz + tg * (h3 - .5) * (gr > .5 ? 3. : 190.) * (.3 + .7 * h4) + vec3(0., gr > .5 ? .05 : -.6, 0.);
      float g0 = smoothstep(0., .4, TT - P0.w) * smoothstep(4.5, 1.5, TT - P0.w);
      vec3 U = WIND * (gr > .5 ? 2.5 : 18. + 14. * h4 * h4) + vec3(0., gr > .5 ? 1.4 : -.6 + 1.6 * h2 * h2, 0.);
      vec3 v0 = vec3(0., (gr > .5 ? 1.5 : 2.) + 6. * h2 * h2, 0.);
      float tau = gr > .5 ? .6 : 1.2, ex = exp(-age / tau);
      vec3 nq = x0 * (gr > .5 ? .6 : .045) + vec3(0., h3 * 2., age * .5);
      vec3 tb = vec3(n3(nq + vec3(0., 0., 1.)), n3(nq + vec3(7., 0., 3.)), n3(nq + vec3(0., 9., 5.))) - .5;
      float ts = gr > .5 ? 2.5 : 9.;
      float sv = gr > .5 ? .45 : 1.1;
      pos = x0 + U * age + (v0 - U) * tau * (1. - ex) - vec3(0., sv * age, 0.) + tb * ts * age;
      vel = U + (v0 - U) * ex - vec3(0., sv, 0.) + tb * ts;
      size = (gr > .5 ? .12 + .45 * age : .5 + 1.1 * age) * (.6 + .8 * h3);
      a = PD.z * smoothstep(0., .5, age) * pow(1. - age / life, .8) * (gr > .5 ? .5 : .07) * (.5 + .5 * g0);
    }
  } else if (SPIN > 0.) {
    int j = (id - np * 3) % int(NCR);
    vec4 C = texelFetch(uC, ivec2(j, 0), 0);
    float life = 3. + 2. * h2, age = mod(TT * (.8 + .4 * h3) + h1 * life, life);
    vec3 tg = vec3(sin(C.w), 0., cos(C.w));
    vec3 x0 = C.xyz + tg * (h4 - .5) * 34.;
    float gate = smoothstep(.38, .62, n3(vec3(x0.xz * .008, TT * .15)));
    vec3 U = WIND * (6. + 5. * h4) * (.6 + .6 * SPIN) + vec3(0., .9, 0.);
    vec3 v0 = vec3(0., 1. + 2. * h2, 0.);
    float ex = exp(-age / .8);
    vec3 nq = x0 * .03 + vec3(0., 0., TT * .2);
    vec3 tb = vec3(n3(nq), n3(nq + 7.), n3(nq + 13.)) - .5;
    pos = x0 + U * age + (v0 - U) * .8 * (1. - ex) - vec3(0., .4 * age, 0.) + tb * 6. * age;
    vel = U + (v0 - U) * ex + tb * 6.;
    size = (.5 + 1.1 * age) * (.7 + .6 * h3);
    a = SPIN * gate * smoothstep(0., .5, age) * pow(1. - age / life, 1.5) * .32;
  }
  vec3 v = pos - CAM; float z = dot(v, FW);
  if (a <= 0. || z < 1.) { gl_Position = vec4(2., 2., 2., 1.); vC = vec4(0.); vQ = vec2(0.); vT = 0.; return; }
  vec3 v2 = v + vel * .35; float z2 = max(dot(v2, FW), 1.);
  vec2 sc = vec2(dot(v, RT), dot(v, UPV)) / (z * TANH), sc2 = vec2(dot(v2, RT), dot(v2, UPV)) / (z2 * TANH);
  float R = size / (z * TANH), pm = 2.5 / SZF, grow = max(R, pm);
  vec2 ax = sc2 - sc; float L = length(ax); vec2 dx = L > 1e-6 ? ax / L : vec2(1., 0.), dy = vec2(-dx.y, dx.x);
  float hl = .5 * L + grow;
  a *= R * R / (grow * grow) * grow / hl;
  gl_Position = vec4((sc + sc2) * .5 + dx * cr.x * hl + dy * cr.y * grow, .5, 1.);
  vQ = cr; vT = length(v);
  vec3 vd = v / vT;
  float mu = dot(vd, SUN), g = .65;
  float ph = .35 + 2.4 * (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5) * .25;
  vec3 col = vec3(.72, .42, .2) * (SUNC * hzS(pos) * ph * 1.4 + AMB * .8 + GLOWC * 2.) + vec3(.012, .006, .003);
  vC = vec4(col * a, a);
}`,ta=at+lt+`
uniform highp usampler2D uA; uniform highp usampler2D uB;
in vec4 vC; in vec2 vQ; in float vT;
out vec4 o;
void main(){
  float r2 = dot(vQ, vQ); if (r2 > 1.) discard;
  float w = (exp(-r2 * 3.) - .05) / .95;
  ivec2 fc = ivec2(gl_FragCoord.xy * 2.);
  uint ax = texelFetch(uA, fc, 0).x;
  float tT = ax == 0u ? 1e9 : dDec(float(ax >> 8) / 16777215.);
  float occ = smoothstep(0., 12., tT - vT);   // a crest edge pixel hides the spindrift behind the crest, as a full one did
  uvec4 bx = texelFetch(uB, fc, 0);
  float cov = float((bx.z >> 8) & 255u) / 255.;
  if (cov > 0. && dDec(float(bx.x) / 65535.) < vT) occ *= 1. - cov;
  o = vC * w * occ;
}`,G0=at+lt+`
uniform highp usampler2D uA; uniform highp usampler2D uB; uniform sampler2D uHZ; uniform sampler2D uSM; uniform sampler2D uPB;
out vec4 o;
vec3 skyC(vec3 rd){
  float mu = dot(rd, SUN), yy = max(rd.y, 0.);
  vec3 c = mix(HORA, ZEN, pow(clamp(yy * 1.5, 0., 1.), .5));
  float side = pow(clamp(.5 + .5 * mu, 0., 1.), 3.);
  c = mix(c, HORS, side * exp(-yy * 5.5));
  c = mix(c, mix(HORA, HORS, .55) * 1.05, exp(-yy * 22.) * .6);   // dust on the horizon
  float anti = clamp(-mu, 0., 1.);
  c += vec3(.16, .06, .1) * BELTK * anti * smoothstep(.0, .05, yy) * smoothstep(.2, .07, yy);
  c *= mix(1., .82, BELTK * anti * smoothstep(.06, 0., yy));
  float g = .8, mie = (1. - g * g) / pow(1. + g * g - 2. * g * mu, 1.5);
  c += SUNC * mie * .006 * exp(-yy * 1.5);
  c += SUNC * 30. * smoothstep(.999982, .999990, mu);
  if (MOON.w > 0.) {
    float mm = dot(rd, MOON.xyz);
    float md = smoothstep(.999955, .999965, mm);
    c = mix(c, vec3(.75, .72, .7) * (.85 + .3 * n3(rd * 1800.)) * MOON.w + c * .3, md);
    c += vec3(.03, .035, .05) * MOON.w * exp((mm - 1.) * 3000.);
  }
  return c;
}
float hzSh(vec3 p, float lift){
  if (HAS.x < .5) return 1.;
  vec2 uv = (p.xz - HZ0) / HZS;
  if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) return 1.;
  vec4 hz = textureLod(uHZ, uv, 0.);
  float a = clamp((SAZ - AZ0) / AZD, 0., 3.);
  float h = a < 1. ? mix(hz.x, hz.y, a) : (a < 2. ? mix(hz.y, hz.z, a - 1.) : mix(hz.z, hz.w, a - 2.));
  return smoothstep(-.005, .005, STAN - h + lift);
}
float smSh(vec3 p){
  if (HAS.y < .5) return 1.;
  vec2 g = p.xz - p.y * SUN.xz / SUN.y, uv = (g - SM0) / SMS;
  if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) return 1.;
  vec2 tc = uv * SMN - .5, f = fract(tc); ivec2 i0 = ivec2(floor(tc)); int N = int(SMN) - 1;
  float lim = p.y + .07 + .02 * p.y, s = 0.;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    float d = texelFetch(uSM, clamp(i0 + ivec2(i, j), ivec2(0), ivec2(N)), 0).r;
    float v = (1. - d) * 41. - 1. > lim ? 0. : 1.;
    s += v * (i == 0 ? 1. - f.x : f.x) * (j == 0 ? 1. - f.y : f.y);
  }
  return s;
}
vec3 HC, DC;
vec3 hazeOf(vec3 col, float t, float py){
  float k = t * HAZEK;
  col = mix(col, HC, 1. - exp(-k));
  return mix(col, DC, (1. - exp(-k * 5.)) * exp(-max(py, 0.) * .022));
}
void main(){
  ivec2 fc = ivec2(gl_FragCoord.xy);
  vec3 rd = ray(gl_FragCoord.xy), col;
  uvec4 A = texelFetch(uA, fc, 0);
  vec3 sky = vec3(0.);
  for (int k = 0; k <= uLp.w; k++) {   // one skyC call site for the haze colour and the sky (D3D compiles each call site again)
    vec3 sc = skyC(k == 0 ? normalize(vec3(rd.x, max(rd.y, 0.) * .4 + .015, rd.z)) : rd);
    if (k == 0) HC = sc * .92; else sky = sc;
  }
  DC = HC * .6 + PANL * vec3(.66, .57, .48);
  vec3 gdir = normalize(vec3(-SUN.x, .3, -SUN.z));
  uint cq = (A.x >> 2) & 63u;
  // a crest edge pixel (part terrain, part sky) and the top full row under it take their surface from the full terrain pixel
  // below: their own samples sit on the rounded ridge line, which faces up and away from a low sun (a dark one-pixel rim)
  if (A.x != 0u && (cq < 63u || (texelFetch(uA, fc + ivec2(0, 1), 0).x & 252u) != 252u)) { uvec4 A2 = texelFetch(uA, fc - ivec2(0, 1), 0); if ((A2.x & 252u) == 252u) { A.x = (A2.x & ~252u) | (cq << 2); A.y = A2.y; } }
  if (A.x == 0u) col = sky;
  else {
    uint mat = A.x & 3u;
    float t = dDec(float(A.x >> 8) / 16777215.);
    vec3 n = octD(vec2(float(A.y >> 20) / 4095., float((A.y >> 8) & 4095u) / 4095.));
    float det = float(A.y & 255u) / 255. * 1.4;
    vec3 p = CAM + rd * t;
    vec3 alb = (mat == 2u ? CLAYA : (mat == 3u ? SILTA : SANDA)) * det;
    float ndl = dot(n, SUN);
    float sh = ndl > 0. ? hzSh(p, 0.) : 0., ts = 1.;
    if (sh > 0. && mat != 1u) { ts = smSh(p); sh *= ts; }
    vec3 E = SUNC * max(ndl, 0.) * sh + AMB * (.55 + .45 * n.y) * (.52 + .48 * ts) + GLOWC * clamp(dot(n, gdir) * .6 + .4, 0., 1.) * (mat == 1u ? .12 : 1.);
    if (mat == 2u) {
      E = mix(vec3(dot(E, vec3(.3, .5, .2))), E, .4) * vec3(1.13, 1.09, 1.04);
      alb = mix(alb, vec3(.72, .55, .36) * det, smoothstep(.5, 1.02, length((p.xz - PANC) / PANR)) * .55);   // sand drifted over the clay toward the rim
    } else {
      E -= AMB * (.55 + .45 * n.y) * .4 * smoothstep(220., 0., p.y);
      E += PANL * vec3(.34, .26, .2) * exp(-max(p.y, 0.) * .011);   // light off the pan on the dunes' lower slopes
      alb *= mix(vec3(1.1, 1.16, 1.3), vec3(1.), smoothstep(0., 110., p.y));   // paler, yellower sand on the apron
    }
    col = alb * E;
    if (mat == 2u) { vec3 hv = normalize(SUN - rd); col += SUNC * pow(max(dot(n, hv), 0.), 24.) * .015 * sh * det; }
    col = hazeOf(col, t, p.y);
    if (cq < 63u) col = mix(sky, col, float(cq) / 63.);
  }
  uvec4 B = texelFetch(uB, fc, 0);
  float cov = float((B.z >> 8) & 255u) / 255.;
  if (cov > 0.) {
    float t = dDec(float(B.x) / 65535.);
    if (cov < .98) {
      for (int k = 0; k < 4; k++) {
        ivec2 o2 = fc + (k == 0 ? ivec2(1, 0) : (k == 1 ? ivec2(-1, 0) : (k == 2 ? ivec2(0, 1) : ivec2(0, -1))));
        uvec4 B2 = texelFetch(uB, o2, 0);
        if (float((B2.z >> 8) & 255u) > 245. && dDec(float(B2.x) / 65535.) > t * 1.004 + .05) cov = 1.;
      }
    }
    vec3 n = octD(vec2(float(B.y >> 8) / 255., float(B.y & 255u) / 255.));
    float bark = float(B.z & 255u) / 255.;
    uint mat = B.w & 15u; float tone = float(B.w >> 4) / 15.;
    vec3 p = CAM + rd * t;
    vec3 alb = mat == 2u ? vec3(.46, .4, .34) : (mat == 3u ? vec3(.05, .075, .03) : mix(vec3(.06, .047, .038), vec3(.12, .115, .108), tone));
    alb *= .15 + 1.9 * bark * bark;
    float ndl = dot(n, SUN);
    float sh = ndl > 0. ? hzSh(p, p.y * .0018) * smSh(p) : 0.;
    float fr = pow(1. - abs(dot(n, rd)), 3.);
    vec3 E = SUNC * max(ndl, 0.) * sh + AMB * (.3 + .35 * n.y) + PANL * clamp(.5 - .5 * n.y, 0., 1.) * .7 + GLOWC * 2.2 * pow(max(dot(n, gdir), 0.), 2.) * (.08 + .2 * fr * fr);
    vec3 tc = hazeOf(alb * E, t, p.y);
    col = mix(col, tc, cov);
  }
  vec4 pb = textureLod(uPB, gl_FragCoord.xy / SZF, 0.);
  float tr = exp(-pb.a * 1.6);
  col = col * tr + pb.rgb / max(pb.a, 1e-4) * (1. - tr);
  col *= EXPO;
  col = clamp((col * (2.51 * col + .03)) / (col * (2.43 * col + .59) + .14), 0., 1.);
  col = pow(col, vec3(1. / 2.2));
  vec2 q = gl_FragCoord.xy / SZF - .5;
  col *= 1. - .22 * dot(q, q);
  col += (hf1(uint(fc.x) * 7919u + uint(fc.y) * 104729u + uint(TT * 30.) * 31u) - .5) * .016;
  o = vec4(col, 1.);
}`,Z0=e=>{if(e.split("uniform sampler2D uHZ;").length!==2||e.split("textureLod(uHZ, uv, 0.)").length!==2)throw new Error("564 hzU");return e.replace("uniform sampler2D uHZ;",`uniform highp usampler2D uHZ;
vec4 hzF(vec2 g){
  vec2 q = g * 512. - .5, f = fract(q); ivec2 i = ivec2(floor(q)), N = ivec2(511);
  vec4 a = uintBitsToFloat(texelFetch(uHZ, clamp(i, ivec2(0), N), 0)), b = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(1, 0), ivec2(0), N), 0));
  vec4 c = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(0, 1), ivec2(0), N), 0)), d = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(1, 1), ivec2(0), N), 0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`).replace("textureLod(uHZ, uv, 0.)","hzF(uv)")};let A=t.__c564,me=null;const ne=(e,o)=>{const a=t.createShader(o);return t.shaderSource(a,e),t.compileShader(a),a},W0=(e,o)=>{if(!t.getProgramParameter(o.p,t.LINK_STATUS))throw new Error("564 "+e+": "+t.getShaderInfoLog(o.f)+t.getShaderInfoLog(o.v)+t.getProgramInfoLog(o.p));const a={p:o.p};return a.uU=t.getUniformLocation(o.p,"uU"),a.uLp=t.getUniformLocation(o.p,"uLp"),t.useProgram(o.p),[["uN",0],["uS",1],["uT",2],["uA",3],["uB",4],["uHZ",5],["uSM",6],["uPB",7],["uHF",8],["uC",9]].forEach(([n,r])=>{const c=t.getUniformLocation(o.p,n);c&&t.uniform1i(c,r)}),a},V0=[2,2,3,4,4,5],xe=(e=6)=>{if(A.lz||(A.lz={},A.lzN=0),!(A.lzN>=e)){for(;A.lzN<e;){const o=A.lzN++,a=o/3|0,[n,r,c]=a?["pt",A.hf2?q0:Z0(q0),ta]:["sm",Jo,$o],s=A.lz[n]||(A.lz[n]={});o%3===0?s.v=ne(r,t.VERTEX_SHADER):o%3===1?s.f=ne(c,t.FRAGMENT_SHADER):(s.p=t.createProgram(),t.attachShader(s.p,s.v),t.attachShader(s.p,s.f),t.linkProgram(s.p))}t.flush()}},j0=()=>{if(!(!A.lz||A.lzDone)){xe();for(const e in A.lz)A.P[e]=W0(e,A.lz[e]);A.lzDone=!0}};if(!A){t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float"),o=e||!!t.getExtension("EXT_color_buffer_half_float"),a=ne(Wo,t.VERTEX_SHADER),n={};for(const[r,c,s]of[["st",null,jo],["cl",null,Ko],["cp",null,o?G0:Z0(G0)],["tr",Qo,Yo],["hz",null,o?I0:I0.replace(`
out vec4 o;
`,`
out uvec4 o;
`).replace(`  o = r;
}`,`  o = floatBitsToUint(r);
}`)]]){const i=t.createProgram(),h=c?ne(c,t.VERTEX_SHADER):a,p=ne(s,t.FRAGMENT_SHADER);t.attachShader(i,h),t.attachShader(i,p),t.linkProgram(i),n[r]={p:i,f:p,v:h}}t.flush(),me={P:n,fl:e,hf2:o}}let Mt=90493413;for(let e=2;e<66;e+=8)Mt=Math.imul(Mt^parseInt(P.hash.slice(e,e+8),16),2246822507)^Mt>>>13;const l=()=>{Mt=Mt+1831565813|0;let e=Math.imul(Mt^Mt>>>15,1|Mt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},yt=e=>{let o=0;for(const n in e)o+=e[n];let a=l()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]},O=Math.PI*2,G=Math.PI/180,K=(e,o,a)=>{const n=Math.min(1,Math.max(0,(a-e)/(o-e)));return n*n*(3-2*n)},se=(e,o,a)=>e.map((n,r)=>n+(o[r]-n)*a),Zt=(e,o,a)=>{const n=Math.max(a-Math.abs(e-o),0)/a;return Math.max(e,o)+n*n*a*.25},B=e=>{const o=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/o,e[1]/o,e[2]/o]},Z=(e,o)=>[e[0]+o[0],e[1]+o[1],e[2]+o[2]];let wt=31807051;for(let e=2;e<66;e+=8)wt=Math.imul(wt^parseInt(P.hash.slice(e,e+8),16),2654435761)^wt>>>15;const Te=()=>{wt=wt+1831565813|0;let e=Math.imul(wt^wt>>>15,1|wt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let Rt=164979755;for(let e=2;e<66;e+=8)Rt=Math.imul(Rt^parseInt(P.hash.slice(e,e+8),16),3266489909)^Rt>>>14;const _t=()=>{Rt=Rt+1831565813|0;let e=Math.imul(Rt^Rt>>>15,1|Rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ea=_t(),oa=_t(),K0=_t();let re=(M?!1:Te()<.25)?"Long lens":"Eye level";const L=(e,o)=>[e[0]*o,e[1]*o,e[2]*o],ce=(e,o)=>[e[1]*o[2]-e[2]*o[1],e[2]*o[0]-e[0]*o[2],e[0]*o[1]-e[1]*o[0]];let zt=M?"First light":yt({"First light":50,"Low sun on the pan":34,"Crest fire":16});!M&&zt==="First light"&&ea<.32&&(zt="Sun reaching the pan"),P.trait("Light",zt);const At=P.trait("Dune",M?"Star dune":yt({"Star dune":45,"Long wall":33,"Twin summits":22})),W=P.trait("Trees",M?"Scattered grove":yt({"Scattered grove":46,"Few giants":26,"Dense stand":20,"One alone":8})),Ze=P.trait("Wind",M?"Crests smoking":yt({"Crests smoking":50,Still:34,"Berg wind":16})),Q0=M?"One far off":yt({"One far off":50,None:30,"Three crossing":20}),Y0=P.trait("Sand",M||K0<.5?"Red":K0<.78?"Apricot":"Deep rust"),J0=P.trait("Tracks",M?"Oryx tracks":yt({"Oryx tracks":55,"Clean clay":25,"Many trails":20})),aa=P.trait("Moon",M?"None":yt({None:88,"Setting over the dune":12})),We=P.trait("Facing",M?"The wall":yt({"The wall":55,"Across the vlei":30,"Down the arm":15})),ft=A?A.nd:(()=>{const o=new Uint8Array(262144);let a=2654435769;for(let n=0;n<o.length;n++)a=Math.imul(a^a>>>15,739982445),a=Math.imul(a^a>>>12,695872825),a^=a>>>15,o[n]=a&255;return o})(),Pt=(e,o,a)=>{const n=Math.floor(e),r=Math.floor(o),c=Math.floor(a);let s=e-n,i=o-r,h=a-c;s=s*s*(3-2*s),i=i*i*(3-2*i),h=h*h*(3-2*h);const p=n&63,u=n+1&63,f=(r&63)<<6,g=(r+1&63)<<6,v=(c&63)<<12,x=(c+1&63)<<12,d=(m,y,z)=>m+(y-m)*z;return d(d(d(ft[p+f+v],ft[u+f+v],s),d(ft[p+g+v],ft[u+g+v],s),i),d(d(ft[p+f+x],ft[u+f+x],s),d(ft[p+g+x],ft[u+g+x],s),i),h)/255},Ct=[],C=(e,o,a,n,r,c,s,i,h,p)=>{Ct.push([e,o,Math.sin(a),Math.cos(a),n,r,c,s,p||.004+.003*l(),l()*O,i,h])},S=(e,o)=>e+(l()-.5)*2*o,ht=S(40,M?0:120),nt=S(800,M?0:60),ut=S(335,M?0:25);if(At==="Twin summits"){const e=ht-330-80*l();C(e,nt+40,-1.9,1200,ut*.93,1,40,.95,.22),C(e,nt+40,1.5,420,ut*.93,-1,15,1,.3),C(ht+120,nt-20,1.9,1300,ut,-1,45,1,.22),C(ht+120,nt-20,-1.62,420,ut,1,15,1,.3)}else C(ht,nt,-1.95,1200,ut,1,At==="Long wall"?25:40,At==="Long wall"?3.2:.9,.22),C(ht,nt,1.88,1300,ut,-1,At==="Long wall"?30:48,At==="Long wall"?3:1,.22),C(ht+330+S(0,60),nt-50,Math.PI+.22+S(0,.15),440,ut*.83,1,8,.85,.42,.012),C(ht+720+S(0,80),nt-150,Math.PI+.38+S(0,.15),360,ut*.66,1,8,.85,.42,.012),C(ht-470+S(0,60),nt-170,Math.PI+.05+S(0,.15),330,ut*.62,1,8,.85,.42,.012);if(At!=="Long wall"){const e=At==="Twin summits"?ht+120:ht,o=At==="Twin summits"?nt-20:nt;C(e,o,Math.atan2(-270,-450)+(M?0:(l()-.5)*.3),560,ut,1,10,.95,.45,.01)}const Ve=S(-250,M?0:120),je=S(-720,M?0:60),Ke=S(210,M?0:25);C(Ve,je,.15+S(0,.2),430,Ke,1,8,.95,.45,.012),C(Ve,je,1.52,1250,Ke,1,50,1,.2),C(Ve,je,-1.82,900,Ke,-1,45,1,.2);const Qe=S(420,M?0:120),Ye=S(-1180,M?0:80),Je=S(275,M?0:30);C(Qe,Ye,-.585,620,Je,1,10,.95,.45,.01),C(Qe,Ye,1.877,1e3,Je,1,45,1,.2),C(Qe,Ye,-2.03,900,Je,-1,45,1,.2);const $e=S(220,M?0:80),t0=S(255,M?0:30);C(-920,$e,2.89,1100,t0,1,50,1,.22),C(-920,$e,-.2,900,t0*.9,-1,40,1,.22),C(-920,$e,1.77,450,t0,1,8,.95,.45,.012);const e0=S(430,M?0:60),o0=S(240,M?0:25);C(1020,e0,3.04,720,o0,-1,40,1,.22),C(1020,e0,-.2,900,o0*.92,1,45,1,.22),C(1020,e0,-1.42,480,o0,1,8,.95,.45,.012);const dt=Ct.length,pt=[30,100],Wt=[330,235],Vt=(()=>{const e=.3+(l()-.5)*.3;return[Math.sin(e),Math.cos(e)]})(),a0=230,ge=1350,jt=[470,-170],vt=(()=>{const e=1.98+(l()-.5)*.15;return[Math.sin(e),Math.cos(e)]})(),n0=(e,o)=>e[7]*(Math.sin(o*e[8]+e[9])+.45*Math.sin(o*e[8]*2.37+e[9]*1.9)+.24*Math.sin(o*e[8]*5.3+e[9]*.7)),$0=(e,o,a)=>{const n=e-a[0],r=o-a[1],c=n*a[2]+r*a[3],s=-n*a[3]+r*a[2],i=Math.min(Math.max(c,0),a[4]),h=n0(a,i),p=Math.sqrt(i*i+4900)-70,u=a[5]*(1-Math.pow(p/a[4],a[10]))*(.9+.075*Math.sin(i*a[8]*.61+a[9]*2.7)+.05*Math.sin(i*a[8]*2.9+a[9]*1.3)+.022*Math.sin(i*a[8]*7.1+a[9]*4.1)),f=(s-h)*a[6];return u-Zt(f*.64,-f*a[11],2)-Math.max(Math.max(-c,c-a[4]),0)*.45},na=(e,o)=>{const a=e-jt[0],n=o-jt[1],r=Math.max(a*vt[0]+n*vt[1],0);return Math.hypot(a-vt[0]*r,n-vt[1]*r)},Bt=(e,o)=>{const a=(e-pt[0])/Wt[0],n=(o-pt[1])/Wt[1],r=Math.hypot(a,n)+.22*(Pt(e*.006,o*.006,3)-.5)+.08*(Pt(e*.03,o*.03,4)-.5),c=K(1.04,.9,r),s=(1+4.5*Pt(e*.003,o*.003,7))*(1-c)-.3*c,i=K(70,300,na(e,o));let h=-1e4;for(let k=0;k<dt;k++){const w=$0(e,o,Ct[k]);h=Zt(h,w,Math.min(30,Math.max(1.5,30-h*.09)))}let p=Zt(s,h*i+(i-1)*40,18);const u=e*Vt[0]+o*Vt[1],g=-e*Vt[1]+o*Vt[0]+260*Math.sin(u*93e-5+1.3)+80*Math.sin(u*.0027+4),v=Math.floor(g/ge),x=g-v*ge,d=x-ge;let m=Math.max(a0*(.2+1.1*Pt(v*5.3,u*.0024,11))-Zt(x*.62,-x*.21,3),a0*(.2+1.1*Pt(v*5.3+5.3,u*.0024,11))-Zt(d*.62,-d*.21,3));m=m*i+(i-1)*40;const y=K(900,1900,Math.hypot(e-pt[0],o-pt[1]));p=Zt(p,-100+(m+100)*y,26);const z=K(.5,8,p);return p+z*(5.5*Pt(e*.0065,o*.0065,1)+1.5*Pt(e*.024,o*.024,2)-3.5)},to=(238+(M?0:(l()-.5)*16))*G,eo=36*G,sa=e=>(.7+46*Math.pow(Math.max(e,0),1.45))*G,be=e=>Math.pow(Math.max(e-.7,0)/46,1/1.45),Kt=zt==="Crest fire"?be(1+.4*l()):zt==="Low sun on the pan"?be(19+3*l()):zt==="Sun reaching the pan"?(l(),be(9+2.4*oa)):be(M?2.3:2+.8*l()),ra=e=>{const o=sa(e),a=to+eo*e;return{el:o,az:a,d:[Math.sin(a)*Math.cos(o),Math.sin(o),Math.cos(a)*Math.cos(o)]}};let bt=(We==="Across the vlei"?-.42:We==="Down the arm"?-.2:.03)+(M?0:(l()-.5)*.08),s0=(We==="Down the arm"?3:5)*G,mt=Math.tan(30*G);const ca={yaw:0,pitch:0,x:0,y:0,z:0},R={yaw:bt,pitch:s0,x:0,y:1.3,z:0};let oo="";const r0=()=>{const e=P.view||ca;R.yaw=bt+(e.yaw||0),R.pitch=Math.max(-1.3,Math.min(1.3,s0+(e.pitch||0)));const o=e.x||0,a=e.z||0,n=Math.hypot(o,a),r=n>8?8/n:1;R.x=o*r,R.z=a*r,R.y=-.3+Math.max(.4,Math.min(4,1.6+(e.y||0)));const c=R.yaw.toFixed(5)+R.pitch.toFixed(5)+R.x.toFixed(3)+R.z.toFixed(3)+R.y.toFixed(3),s=c!==oo;return oo=c,s};r0();const c0=()=>{const e=Math.cos(R.pitch),o=[Math.sin(R.yaw)*e,Math.sin(R.pitch),Math.cos(R.yaw)*e],a=[Math.cos(R.yaw),0,-Math.sin(R.yaw)];return{fw:o,rt:a,up:ce(o,a)}},ia=(e,o)=>{const{fw:a,rt:n,up:r}=c0(),c=e*2-1,s=1-o*2;return B([0,1,2].map(i=>a[i]+(c*n[i]+s*r[i])*mt))},ao=(e,o,a)=>{const{fw:n,rt:r,up:c}=c0(),s=[e-R.x,o-R.y,a-R.z],i=s[0]*n[0]+s[1]*n[1]+s[2]*n[2];return i<.2?null:[(s[0]*r[0]+s[1]*r[1]+s[2]*r[2])/i/mt,(s[0]*c[0]+s[1]*c[1]+s[2]*c[2])/i/mt]},ie=[],Ee=[],Me=[];let i0=0,ye=0,l0=!1,no=!0;const $=(e,o,a,n,r,c,s)=>{if(!l0){if(ye>=i0)return!1;ye++}return no||ie.push(e[0],e[1],e[2],a,o[0],o[1],o[2],n,r,c,0,0,0,1,0,s),!0},Lt=(e,o)=>{const a=B(ce(e,Math.abs(e[1])<.9?[0,1,0]:[1,0,0])),n=ce(e,a),r=l()*O,c=[0,1,2].map(s=>a[s]*Math.cos(r)+n[s]*Math.sin(r));return B([0,1,2].map(s=>e[s]*Math.cos(o)+c[s]*Math.sin(o)))};let so=!1;const la=(e,o,a,n,r,c)=>{const s=o[0]-e[0],i=o[1]-e[1],h=o[2]-e[2],p=Math.hypot(s,i,h);if(!so||p<.28)return $(e,o,a,n,1,r,c);const u=.35+.3*_t(),f=.2*p,g=[e[0]+s*u+(_t()-.5)*f,e[1]+i*u+(_t()-.5)*f,e[2]+h*u+(_t()-.5)*f],v=a+(n-a)*u;return $(e,g,a,v,1,r,c)?(l0=!0,$(g,o,v,n,1,r,c),l0=!1,!0):!1},we=(e,o,a,n,r,c,s,i)=>{const h=Math.max(1,Math.round(n/(.42+.35*l()))),p=Math.max(.018,a*(r>=2?.45:.62));let u=e,f=o,g=a;for(let v=0;v<h;v++){const x=n/h*(.6+.8*l());f=Lt(f,(l()<.08?.6:.16+.34*l())*(v===0?.5:1)),f=B([f[0],f[1]+s,f[2]]);const d=a+(p-a)*(v+1)/h,m=Z(u,L(f,x));if(m[1]<.15+d&&(m[1]=.15+d,f=B([f[0],.3,f[2]])),!la(u,m,g*(1+.12*(l()-.3)),d,c,i))return;if(r<4&&v<h-1&&l()<[.5,.5,.42,.3][r])we(m,Lt(f,.6+.5*l()),d*(.45+.25*l()),n*(.35+.3*l()),r+1,c,s*.85,i);else if(l()<.22&&d>.04){const y=Lt(f,.8+.5*l());$(m,Z(m,L(y,.1+.3*l())),d*.66,d*.55,1,c,i)}u=m,g=d}if(r<4&&g>.024&&l()<(r<2?.85:.55)){const v=l()<.35?3:2;for(let x=0;x<v;x++)we(u,Lt(f,.3+.45*l()),g*(.62+.15*l()),n*(.42+.3*l()),r+1,c,s*.8,i)}},f0=(e,o,a,n,r,c)=>{Me.push({x:e,z:o,sc:a,kind:n,tone:r,id:c}),so=Math.hypot(e,o)<45,i0=ye+(n==="hero"?520:260);const s=(.17+.1*l())*a*(n==="hero"?1.2:1),i=l()*O,h=n==="leaner"?.5:.08+.25*l(),p=[e,-.75,o],u=n==="hero"||n==="broken"?1:l()<.22?2:1;for(let f=0;f<u;f++){const g=i+f*1.3*(l()-.3);let v=B([Math.sin(g)*(h+.2*f),1,Math.cos(g)*(h+.2*f)]),x=s*(f?.75:1),d=Z(p,L(v,.7));$(p,d,x*1.75,x*1.15,1,r,c);for(let w=0;w<2+(l()<.6?1:0);w++){const X=i*3+w*2.2+l();$(Z(p,[0,.5,0]),[e+Math.cos(X)*x*2.3,-.52,o+Math.sin(X)*x*2.3],x*.5,x*.2,1,r,c)}const m=(n==="broken"?1.4+1.4*l():.5+1.1*l())*a,y=2+(l()<.5?1:0);x*=1.15;for(let w=0;w<y;w++){v=Lt(v,.15+.3*l()),v=B([v[0],v[1]+.2,v[2]]);const X=Z(d,L(v,m/y)),N=x*.88;$(d,X,x,N,1,r,c),d=X,x=N}if(n==="broken"){$(d,Z(d,L(Lt(v,.4),.3)),x,x*.85,1,r,c);for(let w=0;w<1+(l()<.6?1:0);w++)we(d,Lt(v,.9+.4*l()),x*.5,(.9+1.4*l())*a,2,r,.08,c);continue}const z=n==="hero"?4:2+Math.floor(l()*2.4),k=l()*O;for(let w=0;w<z;w++){const X=k+(w+(l()-.5)*.7)*O/z,N=(30+34*l())*G,D=B([Math.sin(X)*Math.cos(N)+v[0]*.3,Math.sin(N),Math.cos(X)*Math.cos(N)+v[2]*.3]);we(d,D,x*(.6+.2*l()),(2.6+2.4*l())*a*(n==="hero"?1.15:1),0,r,.16+.12*l(),c)}}if(l()<.45){const f=l()*O,g=(1.5+2.5*l())*a,v=s*(.35+.3*l());let x=[e+Math.cos(f)*(1.5+2.5*l()),v-.31,o+Math.sin(f)*(1.5+2.5*l())],d=[Math.sin(f+1.4),0,Math.cos(f+1.4)],m=v;for(let y=0;y<6;y++){d=B([d[0]+(l()-.5)*.9,0,d[2]+(l()-.5)*.9]);const z=m*.86,k=Z(x,L(d,g/6));if(k[1]=z-.31,$(x,k,m,z,1,r,c),l()<.35){const w=B([d[2]*(l()<.5?1:-1)+d[0]*.5,.35+.4*l(),-d[0]+d[2]*.5]);$(k,Z(k,L(w,.3+.6*l())),z*.55,z*.25,1,r,c)}x=k,m=z}}},fa=W==="Dense stand"?46:W==="Few giants"?10:W==="One alone"?1:26,st=[],ro=(e,o,a)=>Math.hypot((e-pt[0])/(Wt[0]-a),(o-pt[1])/(Wt[1]-a))<1;if(W==="One alone"){const e=S(4,3),o=S(26,4);f0(e,o,1.35,"hero",.3+.4*l(),0),st.push([e,o])}else{const e=M?-4.6:S(-5,3)*(l()<.3?-1:1),o=M?13.5:S(15,3);f0(e,o,W==="Few giants"?1.3:1.12,"hero",.25+.4*l(),0),st.push([e,o]);let a=0;for(;st.length<fa&&a++<900;){const n=l()<.62,r=n?bt+(l()-.5)*1.3:l()*O,c=11+Math.pow(l(),n?1.25:.8)*230,s=Math.sin(r)*c,i=Math.cos(r)*c;if(!ro(s,i,25)||Math.hypot(s,i)<9||Bt(s,i)>0)continue;const h=W==="Dense stand"?9:W==="Few giants"?26:14;if(st.some(g=>Math.hypot(g[0]-s,g[1]-i)<h))continue;const p=ao(s,3,i);if(p&&Math.abs(p[0]-.15)<.12&&Math.hypot(s,i)<45)continue;const u=l(),f=u<.12?"broken":u<.28?"leaner":"spread";f0(s,i,(W==="Few giants"?1.15:.75)+.5*l(),f,l(),st.length),st.push([s,i,f])}}let Ot=null;if(re==="Long lens"){const e=zt==="First light"||zt==="Crest fire",o=Te()<.5?-1:1,a=(e?.8:.62)+.1*Te(),n=i=>Math.atan2(i[0],i[1]),r=i=>{const h=Math.hypot(i[0],i[1]),p=e?.21:Math.min(.2,Math.max(.07,5.8/(.9*h)));for(const u of[o,-o]){const f=n(i)-u*Math.atan(.34*p);let g=!0;for(const v of st){const x=Math.hypot(v[0],v[1]);if(v===i||x>.72*h)continue;const d=Math.tan(n(v)-f)/p;if(Math.abs(d)<1.1+1.5/Math.max(x,1)/p&&Math.cos(n(v)-f)>0){g=!1;break}}if(g)return{d:h,th:p,yw:f,q:i,sd:u}}return null},c=st.filter(i=>{const h=Math.hypot(i[0],i[1]);return i[2]!=="broken"&&h>20&&h<140&&Math.abs(n(i)-bt)<.5}).map(r).filter(i=>i),s=c.length?c[Math.floor(Te()*c.length)]:null;Ot=s,s?(mt=s.th*(e?.75:.62),bt=n(s.q)-s.sd*Math.atan(.34*mt),s0=-Math.atan(1.3/s.d)+Math.atan(a*mt)):re="Eye level",r0()}P.trait("Lens",re);const Et=-.3;let Re=63268007,rt=0;for(let e=2;e<66;e+=8)Re=Math.imul(Re^parseInt(P.hash.slice(e,e+8),16),668265263)^Re>>>13;const T=()=>{rt=rt+1831565813|0;let e=Math.imul(rt^rt>>>15,1|rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ze=e=>{rt=Math.imul(Re^Math.imul(e+7,2654435761),2246822507),rt^=rt>>>13,T()},b=(e,o)=>e+(o-e)*T(),co=e=>{let o=0;for(const n in e)o+=e[n];let a=T()*o;for(const n in e)if(a-=e[n],a<0)return n;return Object.keys(e)[0]},ha=(e,o)=>e[0]*o[0]+e[1]*o[1]+e[2]*o[2],ua=(e,o)=>[e[0]-o[0],e[1]-o[1],e[2]-o[2]],Ae=e=>B(ce(e,Math.abs(e[1])<.9?[0,1,0]:[1,0,0])),io=e=>{const o=Ae(e),a=ce(e,o),n=T()*O;return Z(L(o,Math.cos(n)),L(a,Math.sin(n)))},lo=(e,o)=>B(Z(L(e,Math.cos(o)),L(io(e),Math.sin(o))));let Fe=.001,fo=.09,ho=0,uo=0;const h0=(e,o,a,n,r,c,s)=>{ie.push(e[0],e[1],e[2],a,o[0],o[1],o[2],n,1,ho,r,c,s[0],s[1],s[2],uo)},Ft=(e,o,a,n,r,c,s)=>{const i=Math.max(3,Math.ceil(n/Math.max(.035,Math.min(.12,Fe)))),h=n/i,p=s.s0||0,u=T()*O,f=1.5+3*T(),g=Fe>.03?.9:.45,v=(s.bend||.5)*1.6,x=1-h*2.5,d=v*Math.sqrt(h),m=B(o),y=s.dt||m,z=B(ua(a,L(m,ha(a,m))));let k=e[0],w=e[1],X=e[2],N=m[0],D=m[1],E=m[2],_=y[0],H=y[1],I=y[2],ct=z[0],Tt=z[1],V=z[2],Jt=0,F0=0,U0=0,_o=0,Po=0,Co=0,qt=0,Bo=s.up||0,N0=0,Lo=e.slice(),Oo=r,S0=p,k0=0,Xe=0,D0=0;const _0=()=>{let et,j,J;Math.abs(D)<.9?(et=-E,j=0,J=N):(et=0,j=E,J=-D);const Dt=Math.hypot(et,j,J)||1;et/=Dt,j/=Dt,J/=Dt;const $t=D*J-E*j,te=E*et-N*J,ee=N*j-D*et,oe=T()*O,gt=Math.cos(oe),it=Math.sin(oe);k0=et*gt+$t*it,Xe=j*gt+te*it,D0=J*gt+ee*it},Xo=[{p:e.slice(),d:m,u:z,r,s:p}];for(let et=1;et<=i;et++){const j=et/i,J=p+j*n;if(_0(),Jt=Jt*x+k0*d,F0=F0*x+Xe*d,U0=U0*x+D0*d,qt<=0&&T()<(s.dog||0)*h){qt=.1+.15*T(),_0();let F=k0,ot=Xe,He=D0;_0(),ot-=.6*Xe;const C0=Math.hypot(F,ot,He)||1;F/=C0,ot/=C0,He/=C0;const Ie=.3+.5*T(),B0=Math.tan(Ie*.7);_o=F*Ie/qt,Po=ot*Ie/qt,Co=He*Ie/qt,_+=F*B0,H+=ot*B0,I+=He*B0;const L0=Math.hypot(_,H,I)||1;_/=L0,H/=L0,I/=L0;const O0=Math.hypot(y[0],y[2]),ve=Math.hypot(_,I);if(O0>.2&&ve>.001){const qe=y[0]/O0,Ge=y[2]/O0,Io=_/ve,qo=I/ve,ka=qe*Io+Ge*qo,X0=Math.cos(1.22);if(ka<X0){const Go=qe*qo-Ge*Io<0?-1:1,Zo=Math.sin(1.22);_=(qe*X0-Go*Ge*Zo)*ve,I=(Ge*X0+Go*qe*Zo)*ve}}}H+=Bo*h*(1-H),s.ceil!==void 0&&w>s.ceil&&(H-=Math.min(w-s.ceil,1)*3*h);{const F=Math.hypot(_,H,I)||1;_/=F,H/=F,I/=F}const Dt=s.minUp===void 0?s.ceil!==void 0?.12:.3:s.minUp;if(s.lie===void 0&&H<Dt){const F=Math.hypot(_,I)||1,ot=Math.sqrt(1-Dt*Dt);_=_/F*ot,H=Dt,I=I/F*ot}let $t=Jt+(_-N)*2.2,te=F0+(H-D)*2.2,ee=U0+(I-E)*2.2;qt>0&&($t+=_o,te+=Po,ee+=Co,qt-=h);const oe=$t*N+te*D+ee*E;$t-=N*oe,te-=D*oe,ee-=E*oe;let gt=N+$t*h,it=D+te*h,ae=E+ee*h;{const F=Math.hypot(gt,it,ae)||1;gt/=F,it/=F,ae/=F}let Gt=(r+(c-r)*Math.pow(j,s.tp||.8))*(1+.06*Math.sin(J*f+u))*(1+(s.flare||0)*Math.exp(-Math.max(j*n-(s.fo||0),0)*4.5));if(s.tip&&j>1-s.tip&&(Gt*=1-.6*(j-1+s.tip)/s.tip),s.lie!==void 0){it=(Et+Gt*s.lie-w)*2;const F=Math.hypot(gt,it,ae)||1;gt/=F,it/=F,ae/=F}const Sa=Math.acos(Math.min(1,gt*N+it*D+ae*E));if(N=gt,D=it,E=ae,k+=N*h,w+=D*h,X+=E*h,s.lie===void 0&&!s.under&&w<Et+Gt*.6){if(w=Et+Gt*.6,D<.12){D=.12;const F=Math.hypot(N,D,E)||1;N/=F,D/=F,E/=F}if(s.rebound){Bo=s.rebound,s.minUp=.3,H=Math.max(H,.6);const F=Math.hypot(_,H,I)||1;_/=F,H/=F,I/=F}}s.under&&j*n>(s.fo||0)&&(s.under=!1);{const F=ct*N+Tt*D+V*E;ct-=N*F,Tt-=D*F,V-=E*F;const ot=Math.hypot(ct,Tt,V)||1;ct/=ot,Tt/=ot,V/=ot}N0+=Sa;const P0=[k,w,X],Ho=[ct,Tt,V];(N0>fo||J-S0>g||et===i)&&(h0(Lo,P0,Oo,Gt,S0,J,Ho),Lo=P0,Oo=Gt,S0=J,N0=0),Xo.push({p:P0,d:[N,D,E],u:Ho,r:Gt,s:J})}return Xo},le=(e,o,a)=>{const n=lo(e,o);return B([n[0],Math.max(n[1]+a,.3),n[2]])};let Ue=0;const Xt=(e,o,a,n,r,c,s)=>{const i=T()*4294967296|0,h=rt;rt=i,da(e,o,a,n,r,c,s),rt=h},da=(e,o,a,n,r,c,s)=>{const i=Math.max(.011,.8*Fe);if(r<i||n<.06)return;const h=Math.max(r*(c===0?.6+.15*T():.48+.2*T()),i),p=Ft(e,o,a,n,r,h,s),u=p.length-1,f=p[u];let g=!1;if(c<s.lv){const v=c===0?1+Math.floor(T()*(s.lv>2?3:2)):T()<.6?1:0;for(let x=0;x<v;x++){const d=.28+.5*T(),m=p[Math.round(d*u)];Xt(m.p,le(m.d,(20+26*T())*G,s.rise),m.u,n*(1-d)*(.55+.45*T()),m.r*(.6+.2*T()),c+1,{...s,up:s.up*.8,rebound:void 0,minUp:void 0,dt:void 0,s0:m.s})}if(T()<s.fork){g=!0;const x=io(f.d),d=(14+18*T())*G,m=(20+22*T())*G,y=B(Z(L(f.d,Math.cos(d)),L(x,Math.sin(d)))),z=B(Z(L(f.d,Math.cos(m)),L(x,-Math.sin(m)))),k={...s,rebound:void 0,minUp:void 0,dt:void 0,s0:f.s};Xt(f.p,y,f.u,n*(.3+.3*T()),h*.9,c+1,k),Xt(f.p,z,f.u,n*(.2+.3*T()),h*.72,c+1,{...k,s0:f.s+3})}}if(!g){Ue++;const v=h*(.8+1.6*T()),x=Z(f.p,L(f.d,v));h0(f.p,x,h,h*(.35+.3*T()),f.s,f.s+v,f.u)}if(c>=1||s.stubs)for(let v=.15+.5*T();v<n;v+=.35+.9*T()){const x=p[Math.min(u,Math.round(v/n*u))],d=x.r*(.35+.25*T());if(d<i)continue;const m=le(x.d,(40+40*T())*G,.2),y=(.04+.26*T())*(c>=2?1:.7);h0(x.p,Z(x.p,L(m,y)),d,d*.6,x.s+7,x.s+7+y,x.u),Ue++}},pa=(e,o,a,n,r,c)=>{for(let s=0;s<r;s++){const i=c+(s+.6*(T()-.5))*O/r,h=[Math.sin(i),0,Math.cos(i)];Ft([e+h[0]*a*.5,Et,o+h[2]*a*.5],h,[0,1,0],b(.35,1.2)*n/5,a*b(.3,.5),a*.07,{bend:.9,dog:1.2,lie:b(.25,.65),tp:.6})}},po=(ze(9001),T()*O),va=0,ma=(e,o,a)=>{const{x:n,z:r}=e,c=Math.max(3,Math.hypot(n-R.x,r-R.z));Fe=c*2*mt/1e3,fo=(c<60?5:10)*G,ho=e.tone,uo=T()*64,Ue=0;const s=Math.min(.3,a*b(.032,.046))*(o==="snag"||o==="stump"?1.2:1),i=T()*O;if(o==="fallen"){const d=T()*O,m=[Math.sin(d),0,Math.cos(d)],y=a*b(.7,1.1),z=Ft([n,Et,r],m,[0,1,0],y,s,s*.45,{bend:.6,dog:.8,lie:b(.1,.4)}),k=5+Math.floor(T()*4);for(let X=0;X<k;X++){const N=(X/(k-1)-.5)*2.6+(T()-.5)*.4,D=Ae(m),E=B(Z(Z(L([0,1,0],Math.cos(N)),L([D[0],0,D[2]],Math.sin(N))),L(m,-.35)));Ft([n,Et+s*.4,r],E,m,b(.3,.9)*s*4,s*b(.35,.55),s*.1,{bend:1.1,dog:1.5,under:!0,fo:0})}const w=z[Math.round(z.length*b(.55,.8))];Xt(w.p,le(w.d,b(.5,.9),.5),w.u,a*b(.3,.55),w.r*.7,1,{bend:.6,dog:1,up:.1,lv:2,fork:.4,rise:.2,s0:w.s}),Ee.push([n+m[0]*y*.5,r+m[2]*y*.5,s*2,.5]);return}pa(n,r,s,a,3+Math.floor(T()*3),i),Ee.push([n,r,s*1.6,1]);let h=o==="leaner"?b(.3,.5):o==="flagged"?b(.15,.3):b(0,.13);const p=o==="flagged"?po:i,u=B([Math.sin(p)*Math.sin(h),Math.cos(h),Math.cos(p)*Math.sin(h)]),f=e.kind==="hero",g={bend:.5,dog:.9,up:.3,lv:f?3:2,fork:.55,rise:.25};if(o==="snag"||o==="stump"){const d=o==="snag"?b(1.3,2.4):b(.3,.8),m=Ft([n,Et-.35,r],u,Ae(u),d+.35,s,s*.8,{bend:.4,dog:.6,up:.1,flare:.5,fo:.35,under:!0}),y=m[m.length-1];for(let z=0,k=2+Math.floor(T()*2);z<k;z++)Ft(y.p,lo(y.d,b(.05,.35)),y.u,b(.08,.4),s*.8*b(.3,.55),s*.1,{bend:.6,tip:.7,s0:y.s+z});if(o==="snag"){const z=m[Math.round(m.length*b(.55,.85))];Xt(z.p,le(z.d,b(.6,1.1),.2),z.u,b(.8,2),z.r*.6,1,{...g,lv:2,s0:z.s})}return}const v=o==="twins"?2:1,x=T()*O;for(let d=0;d<v;d++){let m=u,y=s;if(v===2){const E=b(.2,.42),_=i+d*Math.PI+b(-.4,.4);m=B([Math.sin(_)*Math.sin(E),Math.cos(E),Math.cos(_)*Math.sin(E)]),y=s*(d?.68:.8)}const z=v===2?b(1.2,2.2):o==="parasol"?b(.5,1.1):b(.6,1.5),k=Ft([n,Et-.35,r],m,Ae(m),z+.35,y,y*.76,{bend:.35,dog:.5,up:.15,flare:d?0:.45,fo:.3,under:!0,s0:d*5}),w=v===2?2:o==="parasol"?3+(T()<.5?1:0):o==="flagged"?3:T()<(f?0:.3)?2:T()<.6?3:4,X=[];let N=0;for(let E=0;E<w;E++)X.push(E===0?1:.45+.5*T()),N+=X[E];const D=o==="crouch"?1:-1;for(let E=0;E<w;E++){const _=k[Math.max(1,k.length-1-Math.round(E*k.length*.1))],H=E===0?_.r:_.r*Math.sqrt(X[E]/N)*1.3;let I=o==="flagged"&&E!==w-1?po+(T()-.5)*1.4:v===2?i+d*Math.PI+(E-.5)*b(1,2):x+(E+(T()-.5)*.6)*O/w,ct=(o==="parasol"?b(38,62):o==="flagged"?b(28,55):v===2?b(10,30):f?b(18,44):b(12,36))*G,Tt=(a-z)/Math.cos(ct)*(E===0?b(.88,1.02):b(.68,.95));const V={...g,s0:_.s+(E?E*2:0)};o==="parasol"&&(V.ceil=a-.4,V.up=.12,Tt*=1.25,V.rise=.12),o==="flagged"&&(V.up=.12,E===w-1&&(Tt*=.45)),E===D&&(ct=b(68,80)*G,V.up=-.6,V.minUp=-.7,V.rebound=1.4,Tt=a*b(.65,.85));const Jt=B([Math.sin(I)*Math.sin(ct)+m[0]*.3,Math.cos(ct),Math.cos(I)*Math.sin(ct)+m[2]*.3]);E===0&&(V.dt=Jt),Xt(_.p,E===0?_.d:Jt,_.u,Tt,H,0,V)}}};{const e=re==="Long lens"&&Ot?Ot.q:null,o=Me[0];if(!M&&re==="Eye level"){ze(4242);const a=W==="One alone",n=T(),r=a?n<.3?-1:n<.6?1:0:n<.45?-1:n<.75?1:0;for(let c=0;c<6;c++){const s=r===0||a?b(12,26):6+19*Math.pow(T(),1.3),i=r<0?b(-.62,a?-.3:-.5):r>0?b(a?.3:.36,.58):b(-.06,.06),h=bt+Math.atan(i*mt),p=Math.sin(h)*s,u=Math.cos(h)*s;if(ro(p,u,25)&&Bt(p,u)<=0&&!st.some((f,g)=>g>0&&Math.hypot(f[0]-p,f[1]-u)<6)){o.x=p,o.z=u,st[0]=[p,u];break}}}for(let a=0;a<Me.length;a++){const n=Me[a];ze(n.id*31+1+(M?va:0));let r;n.kind==="hero"?r=M?"spread":co(W==="Few giants"?{parasol:60,spread:25,twins:15}:W==="One alone"?{parasol:40,spread:35,twins:25}:{spread:30,parasol:22,flagged:14,twins:14,crouch:12,leaner:8}):n.kind==="broken"?r=T()<.7?"snag":"stump":n.kind==="leaner"?r=T()<.6?"leaner":"flagged":r=co(W==="Few giants"?{parasol:55,spread:30,twins:15}:W==="Dense stand"?{spread:30,snag:20,stump:10,twins:10,flagged:10,fallen:8,parasol:6,crouch:6}:{spread:32,parasol:16,flagged:10,twins:10,crouch:8,snag:8,fallen:9,stump:7}),e&&st[a]===e&&!/spread|parasol|flagged|twins|leaner/.test(r)&&(r="spread");const c=n.kind==="hero"?M?5.8:W==="One alone"?b(6,6.8):b(5,6.5):4*n.sc*(W==="Dense stand"?.85:1)*b(.9,1.1);if(ma(n,r,c),n.k2=r,n.ends=Ue,ze(n.id*31+17),T()<.3&&r!=="fallen"){const s=T()*O,i=1.5+3*T(),h=[Math.sin(s+1.2+T()),0,Math.cos(s+1.2+T())],p=c*b(.012,.025),u=Ft([n.x+Math.sin(s)*i,Et,n.z+Math.cos(s)*i],h,[0,1,0],c*b(.3,.55),p,p*.5,{bend:1.3,dog:2.5,lie:b(.05,.3)});for(let f=0,g=1+Math.floor(T()*3);f<g;f++){const v=u[Math.round((u.length-1)*b(.15,.95))];Xt(v.p,le(v.d,b(.7,1.3),.4),v.u,b(.25,.9),v.r*b(.45,.7),2,{bend:.8,dog:1.5,up:.2,lv:3,fork:.5,rise:.3,s0:v.s+f})}}}}const xa=Q0==="None"?0:Q0==="Three crossing"?3:1,_a=M?27:S(10,90),Pa=M?185:S(190,40),Ca=l()<.5?1.45:-1.6;for(let e=0;e<xa;e++)l(),l(),l();const Ta=ie.length/16;no=!1;for(let e=0;e<9;e++){const o=380+e*160+120*l(),a=(l()-.5)*110,n=jt[0]+vt[0]*o-vt[1]*a,r=jt[1]+vt[1]*o+vt[0]*a;i0=ye+8;const c=3+2.5*l(),s=3+3*l(),i=Bt(n,r)-.3;$([n,i,r],[n+.3,i+c,r],.3,.22,3,0,91);for(let h=0;h<3;h++){const p=l()*O,u=s*(.4+.25*l());$([n+Math.sin(p)*u,i+c+.8*l(),r+Math.cos(p)*u],[n-Math.sin(p)*u*.6,i+c+.6+.8*l(),r-Math.cos(p)*u*.6],s*.42,s*.38,3,0,91)}}const ga=ie.length/16,ba=new Float32Array(ie),fe=[],Ea=J0==="Clean clay"?0:J0==="Many trails"?3:2;for(let e=0;e<3;e++){if(e>=Ea){fe.push([0,-9999,0,0]);continue}const o=(e===0?1.1:-1.2+l()*.8)+(l()-.5)*.5,a=e===0?6+4*l():14+30*l(),n=-Math.cos(o)*60+(l()-.5)*10,r=a+Math.sin(o)*60;fe.push([n-Math.sin(o)*120,r-Math.cos(o)*120,o,l()*O])}const Ne=Math.PI+.5*(l()-.5),u0=22,Ma=[Math.sin(Ne)*u0+.2,Math.cos(Ne)*u0+1.25,-Math.sin(Ne),-Math.cos(Ne)],vo=(M?1.9:1.6+.6*l())+(l()<.35&&!M?Math.PI:0),d0=[Math.sin(vo),0,Math.cos(vo)],Se=Ze==="Still"?0:Ze==="Berg wind"?1:.45,ke=[];for(let e=0;e<dt&&ke.length<160;e++){const o=Ct[e];if(!(o[5]<150))for(let a=0;a<24;a++){const n=o[4]*(.03+.6*(a+l())/24);let r=-1e9,c=0,s=0;const i=n0(o,n);for(let h=-4;h<=4;h++){const p=i+h*3,u=o[0]+o[2]*n-o[3]*p,f=o[1]+o[3]*n+o[2]*p,g=Bt(u,f);g>r&&(r=g,c=u,s=f)}r>60&&ke.push([c,r+.5,s,Math.atan2(o[2],o[3])])}}const ya=Math.max(1,Math.min(160,ke.length)),xt=512,he=1536,p0=5600,Ut=(e,o,a,n,r,c)=>{const s=t.createTexture();return t.bindTexture(t.TEXTURE_2D,s),t.texImage2D(t.TEXTURE_2D,0,a,e,o,0,n,r,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),s},v0=(e,o)=>{const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,o?t.DEPTH_ATTACHMENT:t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),a},mo=e=>{const o=Ut(64,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),a=Ut(64,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),n=Ut(160,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),r=Ut(xt,xt,t.R32UI,t.RED_INTEGER,t.UNSIGNED_INT,t.NEAREST),c={t:r,f:v0(r)},s=e?Ut(xt,xt,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR):Ut(xt,xt,t.RGBA32UI,t.RGBA_INTEGER,t.UNSIGNED_INT,t.NEAREST),i={t:s,f:v0(s)},h=t.createBuffer(),p=t.createVertexArray();t.bindVertexArray(p),t.bindBuffer(t.ARRAY_BUFFER,h);for(let u=0;u<4;u++)t.enableVertexAttribArray(u),t.vertexAttribPointer(u,4,t.FLOAT,!1,64,u*16),t.vertexAttribDivisor(u,1);return t.bindVertexArray(null),{tS:o,tT:a,tC:n,hf:c,hz:i,sm:null,vbo:h,vaoT:p}};let U=null;if(!A){const e=me.P,o=W0,a=me.fl,n=me.hf2,r=t.createTexture();t.bindTexture(t.TEXTURE_3D,r),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,ft),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const s of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,s,t.REPEAT);U=mo(n);const c={};for(const s in e)c[s]=o(s,e[s]);A=t.__c564={P:c,nd:ft,tN:r,vao:t.createVertexArray(),hf2:n,fl:a}}U||(U=mo(A.hf2));const Q=A.P,m0=Ut,wa=()=>{const e=Math.ceil(q/2),o=m0(e,e,A.fl?t.RGBA16F:t.RGBA8,t.RGBA,A.fl?t.HALF_FLOAT:t.UNSIGNED_BYTE,t.LINEAR),a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),{t:o,f:a,w:e}},xo=(()=>{const e=m0(q,q,t.RG32UI,t.RG_INTEGER,t.UNSIGNED_INT,t.NEAREST),o=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0);const a=m0(q,q,t.RGBA16UI,t.RGBA_INTEGER,t.UNSIGNED_SHORT,t.NEAREST),n=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,n),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,q,q);const r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,n),{a:{t:e,f:o},b:{t:a,f:r},rb:n}})(),tt={a:xo.a,b:xo.b,p:wa()},To=new Float32Array(64*4);Ct.forEach((e,o)=>To.set([e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11]],o*12));const go=Math.min(64,Ee.length),bo=new Float32Array(64*4);for(let e=0;e<go;e++)bo.set(Ee[e],e*4);const Eo=new Float32Array(160*4);ke.slice(0,160).forEach((e,o)=>Eo.set(e,o*4)),(()=>{t.bindTexture(t.TEXTURE_2D,U.tS),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,1,t.RGBA,t.FLOAT,To),t.bindTexture(t.TEXTURE_2D,U.tT),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,1,t.RGBA,t.FLOAT,bo),t.bindTexture(t.TEXTURE_2D,U.tC),t.texSubImage2D(t.TEXTURE_2D,0,0,0,160,1,t.RGBA,t.FLOAT,Eo),t.bindBuffer(t.ARRAY_BUFFER,U.vbo),t.bufferData(t.ARRAY_BUFFER,ba,t.STATIC_DRAW)})();const Nt=new Float32Array(160),Ra=aa==="None"?0:1,Mo=bt+.25+(l()-.5)*.3,x0=(8+5*l())*G,T0=[Math.sin(Mo)*Math.cos(x0),Math.sin(x0),Math.cos(Mo)*Math.cos(x0)],De=Y0==="Apricot"?[.76,.35,.12]:Y0==="Deep rust"?[.57,.15,.052]:[.68,.22,.07],_e=[.8,.75,.66],g0=[.42,.36,.3],yo=e=>{const o=ra(e),a=o.el/G,n=K(16,1.2,a),r=K(1.5,40,a),c=se([2.25,.98,.36],[2.9,2.6,2.15],r).map((d,m)=>d*(.75+.25*K(.4,3,a))),s=se([.012,.034,.16],[.04,.12,.4],r),i=se([1.1,.6,.3],[.62,.72,.85],K(1,22,a)),h=se([.18,.22,.38],[.42,.55,.78],r),p=se([.06,.088,.3],[.3,.4,.62],r),u=K(.2,3,a)*(.7+.3*K(4,25,a)),f=De.map((d,m)=>d*c[m]*.17*u),g=K(9,14,a),v=_e.map((d,m)=>d*(p[m]*.9+c[m]*Math.sin(o.el)*g*.8+f[m])),x=.95/(.55+.45*r*2.1)*(1+.25*n);return{sn:o,sunC:c,zen:s,horS:i,horA:h,amb:p,glow:f,panL:v,expo:x,belt:n*K(-1,1.5,a),hz:1/(6500+16e3*r)}},Pe=(e,o)=>{const{fw:a,rt:n,up:r}=c0(),c=e.sn;Nt.set([R.x,R.y,R.z,mt,a[0],a[1],a[2],2*mt/q,n[0],n[1],n[2],Y,r[0],r[1],r[2],q,c.d[0],c.d[1],c.d[2],he,e.sunC[0],e.sunC[1],e.sunC[2],e.expo,e.zen[0],e.zen[1],e.zen[2],c.az,e.horS[0],e.horS[1],e.horS[2],Math.tan(c.el),e.horA[0],e.horA[1],e.horA[2],e.belt,e.amb[0],e.amb[1],e.amb[2],e.hz,pt[0],pt[1],Wt[0],Wt[1],Vt[0],Vt[1],a0,ge,jt[0],jt[1],vt[0],vt[1],wo[0],wo[1],p0,to,eo/3,zo[0],zo[1],b0,d0[0],d0[1],d0[2],8,...Ma,...fe[0],...fe[1],...fe[2],T0[0],T0[1],T0[2],Ra,De[0],De[1],De[2],go,_e[0],_e[1],_e[2],u0,g0[0],g0[1],g0[2],ya,U.hz?1:0,E0?1:0,0,0],0);for(let s=0;s<3;s++){const i=Qt[s];Nt.set(i?[i.x,i.y,i.z,i.t0]:[0,-1e4,0,-1e4],(25+s)*4),Nt.set(i?[i.tx,i.tz,i.str,i.ground]:[1,0,0,0],(28+s)*4)}Nt.set([e.glow[0],e.glow[1],e.glow[2],Se*K(0,2,Y-y0)+Ce,e.panL[0],e.panL[1],e.panL[2],Ao],31*4)},wo=[pt[0]-p0/2,pt[1]-p0/2],Ro=Ot?[Ot.q[0],Ot.q[1]]:[R.x+Math.sin(bt)*70,R.z+Math.cos(bt)*70],b0=Ot?110:200,zo=[Ro[0]-b0/2,Ro[1]-b0/2],Ao=3200,za=Ze==="Berg wind"?3200:2e3;let Y=0,E0=!1,Ce=0,M0=0,ue=-1,y0=A.P.pt?-9:-1;const Qt=[null,null,null],de=e=>{t.bindVertexArray(e||A.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.depthMask(!0),t.colorMask(!0,!0,!0,!0)},Aa=()=>{t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,A.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,U.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,U.tT),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,tt.a.t),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,tt.b.t),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,U.hz?U.hz.t:null),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,U.sm?U.sm.t:null),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,tt.p.t),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,U.hf?U.hf.t:null),t.activeTexture(t.TEXTURE9),t.bindTexture(t.TEXTURE_2D,U.tC)},St=(e,o)=>{t.useProgram(e.p),t.uniform4fv(e.uU,Nt),t.uniform4i(e.uLp,o[0],o[1],o[2],o[3])};let Yt=yo(Kt);const Fa=()=>{U.hz&&(de(),Pe(Yt),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,A.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,U.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,U.tT),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,U.hf.f),t.viewport(0,0,xt,xt),St(Q.st,[0,xt,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,U.hz.f),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,U.hf.t),St(Q.hz,[64,xt,4,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null))},Fo=()=>{de(),Pe(Yt),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,A.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,U.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,U.tT),t.bindFramebuffer(t.FRAMEBUFFER,tt.b.f),t.viewport(0,0,q,q),St(Q.st,[q>400?1400:900,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,tt.a.f),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,tt.b.t),St(Q.cl,[0,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,tt.b.f),t.viewport(0,0,q,q),t.clearBufferuiv(t.COLOR,0,new Uint32Array([0,0,0,0])),t.clearBufferfv(t.DEPTH,0,new Float32Array([1])),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,tt.a.t),de(U.vaoT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),St(Q.tr,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,ga),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()};let Be=-1;const Uo=e=>{if(E0=e.sn.d[1]>.1&&!!Q.sm,!E0){Q.sm||(Be=-1);return}if(!U.sm){const o=Ut(he,he,t.DEPTH_COMPONENT16,t.DEPTH_COMPONENT,t.UNSIGNED_SHORT,t.NEAREST);U.sm={t:o,f:v0(o,!0)},t.drawBuffers([t.NONE]),t.readBuffer(t.NONE)}de(U.vaoT),Pe(e),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,U.sm.f),t.viewport(0,0,he,he),t.clearBufferfv(t.DEPTH,0,new Float32Array([1])),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.colorMask(!1,!1,!1,!1),St(Q.sm,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,Ta),t.colorMask(!0,!0,!0,!0),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,null)},No=e=>{de(),Pe(e),Aa(),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,tt.p.f),t.viewport(0,0,tt.p.w,tt.p.w),t.clearBufferfv(t.COLOR,0,new Float32Array([0,0,0,0]));const o=Ao*3+(Se>0||Ce>0?za:0);if(Q.pt&&(Qt.some(a=>a)||Se>0||Ce>0)){t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);const a=Nt[31*4+3];Se===0&&(Nt[31*4+3]=Ce),St(Q.pt,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,o),Nt[31*4+3]=a,t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,q,q),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,tt.p.t),St(Q.cp,[0,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3)};Yt.sn.el>6*G&&(xe(),j0()),Fa(),Fo(),Uo(Yt),Q.sm&&(Be=Kt),No(Yt);const So=(e,o)=>{const a=ia(e,o);let n=0;for(let r=.5;r<6e3;r+=Math.max(.3,r*.008)){const c=R.x+a[0]*r,s=R.y+a[1]*r,i=R.z+a[2]*r;if(a[1]>0&&s>500)break;const h=Bt(c,i);if(s<h){let p=n,u=r;for(let f=0;f<10;f++){const g=(p+u)/2;R.y+a[1]*g<Bt(R.x+a[0]*g,R.z+a[2]*g)?u=g:p=g}return{x:R.x+a[0]*u,y:R.y+a[1]*u,z:R.z+a[2]*u,t:u,h}}n=r}return null},Ua=e=>{let o=0,a=-1e9;for(let f=0;f<dt;f++){const g=$0(e.x,e.z,Ct[f]);g>a&&(a=g,o=f)}const n=Ct[o],r=e.x-n[0],c=e.z-n[1],s=Math.min(Math.max(r*n[2]+c*n[3],0),n[4]),i=n0(n,s);let h=-1e9,p=0,u=0;for(let f=-6;f<=6;f++){const g=i+f*2.5,v=n[0]+n[2]*s-n[3]*g,x=n[1]+n[3]*s+n[2]*g,d=Bt(v,x);d>h&&(h=d,p=v,u=x)}return{x:p,y:h,z:u,tx:n[2],tz:n[3]}};let w0=0;const Na=(e,o)=>{let a=So(e,o);for(let r=1;r<8&&!a;r++)a=So(e,o+r*.012);if(!a)return;const n=r=>Math.max(-1,Math.min(1,r));if(a.y>25){const r=Ua(a);Qt[w0]={x:r.x,y:r.y,z:r.z,t0:Y,tx:r.tx,tz:r.tz,str:1,ground:0};const c=ao(r.x,r.y,r.z);P.sound.hit("noise",.5,{cutoff:700,dur:3.2,pan:n(c?c[0]:0)}),P.sound.hit("noise",.25,{cutoff:2600,dur:2.2,pan:n(c?c[0]:0),at:.3}),P.sound.note(45,{dur:3,vel:.12,wave:"sine",attack:.6})}else return;w0=(w0+1)%3};let Ht=Kt,It=Kt,Le=0,ko=0,R0=0,z0=0,Oe=0,Do=!1,kt=null,pe=!1,A0=-1;return(e,o)=>{o=Math.min(Math.max(o||1/30,0),.1),Y+=o,A.lzDone||(++M0>=2&&ue<0?(xe(V0.lastIndexOf(M0)+1),ue=Y):ue>=0&&A.lzN<6&&xe(V0.lastIndexOf(M0)+1),ue>=0&&Y-ue>.3&&j0()),y0===-1&&Q.pt&&(y0=Y),r0()&&Fo();const a=P.input;for(const c of a.taps())kt={x:c.x,y:c.y,t:Y};if(a.down){Do||(ko=Y,R0=a.x,z0=a.y,Oe=0,pe=!1);const c=a.x-R0,s=a.y-z0,i=Math.hypot(c,s);Oe+=i,Oe>.03?(kt=null,It=Math.max(0,Math.min(.62,It+c*.75)),Le=0):Y-ko>.4&&(pe=!0,kt=null),R0=a.x,z0=a.y}else kt&&Y-kt.t>.02&&(Na(kt.x,kt.y),kt=null);Do=a.down,a.down||(pe=!1),pe&&(It=Math.min(1,It+o/6.5),Le=0),Le+=o,Le>14&&(It+=(Kt+.045*(1-Math.exp(-Y/150))-It)*Math.min(1,o/25)),Ht+=(It-Ht)*Math.min(1,o*3);const n=Math.floor(Ht*14);n!==A0&&(A0>=0&&(pe||Oe>.03)&&P.sound.note([57,60,62,64,67,69,72,74,76,79,81,84,86,88,91][Math.max(0,Math.min(14,n))],{dur:2.2,vel:.12,wave:"sine",attack:.3}),A0=n);for(let c=0;c<3;c++)Qt[c]&&Y-Qt[c].t0>15&&(Qt[c]=null);const r=Math.abs(Ht-Kt)<1e-5?Yt:yo(Ht);Math.abs(Ht-Be)>2e-4&&(Uo(r),Be=Ht),No(r)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
