// Red Dune: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/564.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(q0){q0&&q0.add({num:564,name:"Red Dune",fam:"Vistas",recipe:"A cracked white clay pan with camelthorn trees that died centuries ago, in front of a red dune whose top burns orange while the rest sits in blue shadow. The dune, the trees and the hour change every mint, and rare ones get a single tree or a gale smoking off the crests. Tap a crest to blow a glowing plume of sand off it, drag left or right to move the sun so the shadow slides down the dune, or hold for full morning, when the pan glares white and the trees turn bleached grey.",interactive:"Tap a dune crest to send a gust that streams sand off it in a glowing plume; drag left or right to move the sun along its path, so the shadow line sweeps down the dune and the tree shadows swing across the pan; hold and full morning comes: the shadow drains off the dune, the pan glares white and the trees turn from black silhouettes to bleached grey wood",music:!0,gl:!0,fps:30,seed:0,make(C){const t=C.gl,N=C.size,w=!!C.home,ot=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D; precision highp usampler2D;
`,Ja=ot+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2. - 1., 0., 1.); }",lt=`
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
`,$a=`
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
`,G0=ot+lt+`
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
}`,to=ot+lt+$a+`
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
}`,eo=ot+lt+`
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
}`,ao=ot+lt+`
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
}`,oo=ot+lt+`
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
}`,no=ot+lt+`
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
}`,so=ot+lt+`
flat in vec4 vA; flat in vec4 vB; in vec2 vG;
void main(){
  vec3 ro = vec3(vG.x, 0., vG.y), rd = SUN, pa = vA.xyz, ba = vB.xyz - vA.xyz, w0 = ro - pa;
  float b = dot(rd, ba), cc = dot(ba, ba), d = dot(rd, w0), e = dot(ba, w0);
  float s = clamp((e - b * d) / max(cc - b * b, 1e-9), 0., 1.);
  float tc = max(b * s - d, 0.);
  vec3 cp = ro + rd * tc, sp = pa + ba * s;
  if (length(cp - sp) > max(mix(vA.w, vB.w, s), SMS / SMN * .4)) discard;
  gl_FragDepth = 1. - clamp((cp.y + 1.) / 41., 0., 1.);
}`,Z0=ot+lt+`
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
}`,ro=ot+lt+`
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
}`,W0=ot+lt+`
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
}`,V0=e=>{if(e.split("uniform sampler2D uHZ;").length!==2||e.split("textureLod(uHZ, uv, 0.)").length!==2)throw new Error("564 hzU");return e.replace("uniform sampler2D uHZ;",`uniform highp usampler2D uHZ;
vec4 hzF(vec2 g){
  vec2 q = g * 512. - .5, f = fract(q); ivec2 i = ivec2(floor(q)), N = ivec2(511);
  vec4 a = uintBitsToFloat(texelFetch(uHZ, clamp(i, ivec2(0), N), 0)), b = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(1, 0), ivec2(0), N), 0));
  vec4 c = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(0, 1), ivec2(0), N), 0)), d = uintBitsToFloat(texelFetch(uHZ, clamp(i + ivec2(1, 1), ivec2(0), N), 0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`).replace("textureLod(uHZ, uv, 0.)","hzF(uv)")};let T=t.__c564,ge=null;const ce=(e,a)=>{const o=t.createShader(a);return t.shaderSource(o,e),t.compileShader(o),o},K0=(e,a)=>{if(!t.getProgramParameter(a.p,t.LINK_STATUS))throw new Error("564 "+e+": "+t.getShaderInfoLog(a.f)+t.getShaderInfoLog(a.v)+t.getProgramInfoLog(a.p));const o={p:a.p};return o.uU=t.getUniformLocation(a.p,"uU"),o.uLp=t.getUniformLocation(a.p,"uLp"),t.useProgram(a.p),[["uN",0],["uS",1],["uT",2],["uA",3],["uB",4],["uHZ",5],["uSM",6],["uPB",7],["uHF",8],["uC",9]].forEach(([s,r])=>{const c=t.getUniformLocation(a.p,s);c&&t.uniform1i(c,r)}),o},j0=()=>{if(!T.lz){T.lz={};for(const[e,a,o]of[["sm",no,so],["pt",T.hf2?Z0:V0(Z0),ro]]){const s=t.createProgram(),r=ce(a,t.VERTEX_SHADER),c=ce(o,t.FRAGMENT_SHADER);t.attachShader(s,r),t.attachShader(s,c),t.linkProgram(s),T.lz[e]={p:s,f:c,v:r}}t.flush()}},Q0=()=>{if(!(!T.lz||T.lzDone)){for(const e in T.lz)T.P[e]=K0(e,T.lz[e]);T.lzDone=!0}};if(!T){t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float"),a=e||!!t.getExtension("EXT_color_buffer_half_float"),o=ce(Ja,t.VERTEX_SHADER),s={};for(const[r,c,n]of[["st",null,to],["cl",null,eo],["cp",null,a?W0:V0(W0)],["tr",ao,oo],["hz",null,a?G0:G0.replace(`
out vec4 o;
`,`
out uvec4 o;
`).replace(`  o = r;
}`,`  o = floatBitsToUint(r);
}`)]]){const i=t.createProgram(),f=c?ce(c,t.VERTEX_SHADER):o,d=ce(n,t.FRAGMENT_SHADER);t.attachShader(i,f),t.attachShader(i,d),t.linkProgram(i),s[r]={p:i,f:d,v:f}}t.flush(),ge={P:s,fl:e,hf2:a}}let yt=90493413;for(let e=2;e<66;e+=8)yt=Math.imul(yt^parseInt(C.hash.slice(e,e+8),16),2246822507)^yt>>>13;const l=()=>{yt=yt+1831565813|0;let e=Math.imul(yt^yt>>>15,1|yt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},wt=e=>{let a=0;for(const s in e)a+=e[s];let o=l()*a;for(const s in e)if(o-=e[s],o<0)return s;return Object.keys(e)[0]},X=Math.PI*2,G=Math.PI/180,Q=(e,a,o)=>{const s=Math.min(1,Math.max(0,(o-e)/(a-e)));return s*s*(3-2*s)},ie=(e,a,o)=>e.map((s,r)=>s+(a[r]-s)*o),Vt=(e,a,o)=>{const s=Math.max(o-Math.abs(e-a),0)/o;return Math.max(e,a)+s*s*o*.25},L=e=>{const a=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/a,e[1]/a,e[2]/a]},Z=(e,a)=>[e[0]+a[0],e[1]+a[1],e[2]+a[2]];let Rt=31807051;for(let e=2;e<66;e+=8)Rt=Math.imul(Rt^parseInt(C.hash.slice(e,e+8),16),2654435761)^Rt>>>15;const be=()=>{Rt=Rt+1831565813|0;let e=Math.imul(Rt^Rt>>>15,1|Rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};let At=164979755;for(let e=2;e<66;e+=8)At=Math.imul(At^parseInt(C.hash.slice(e,e+8),16),3266489909)^At>>>14;const Pt=()=>{At=At+1831565813|0;let e=Math.imul(At^At>>>15,1|At);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},co=Pt(),io=Pt(),Y0=Pt();let le=(w?!1:be()<.25)?"Long lens":"Eye level";const O=(e,a)=>[e[0]*a,e[1]*a,e[2]*a],fe=(e,a)=>[e[1]*a[2]-e[2]*a[1],e[2]*a[0]-e[0]*a[2],e[0]*a[1]-e[1]*a[0]];let zt=w?"First light":wt({"First light":50,"Low sun on the pan":34,"Crest fire":16});!w&&zt==="First light"&&co<.32&&(zt="Sun reaching the pan"),C.trait("Light",zt);const Ft=C.trait("Dune",w?"Star dune":wt({"Star dune":45,"Long wall":33,"Twin summits":22})),W=C.trait("Trees",w?"Scattered grove":wt({"Scattered grove":46,"Few giants":26,"Dense stand":20,"One alone":8})),Ve=C.trait("Wind",w?"Crests smoking":wt({"Crests smoking":50,Still:34,"Berg wind":16})),J0=w?"One far off":wt({"One far off":50,None:30,"Three crossing":20}),$0=C.trait("Sand",w||Y0<.5?"Red":Y0<.78?"Apricot":"Deep rust"),ta=C.trait("Tracks",w?"Oryx tracks":wt({"Oryx tracks":55,"Clean clay":25,"Many trails":20})),lo=C.trait("Moon",w?"None":wt({None:88,"Setting over the dune":12})),Ke=C.trait("Facing",w?"The wall":wt({"The wall":55,"Across the vlei":30,"Down the arm":15})),ft=T?T.nd:(()=>{const a=new Uint8Array(262144);let o=2654435769;for(let s=0;s<a.length;s++)o=Math.imul(o^o>>>15,739982445),o=Math.imul(o^o>>>12,695872825),o^=o>>>15,a[s]=o&255;return a})(),Ct=(e,a,o)=>{const s=Math.floor(e),r=Math.floor(a),c=Math.floor(o);let n=e-s,i=a-r,f=o-c;n=n*n*(3-2*n),i=i*i*(3-2*i),f=f*f*(3-2*f);const d=s&63,u=s+1&63,h=(r&63)<<6,b=(r+1&63)<<6,v=(c&63)<<12,x=(c+1&63)<<12,p=(m,R,F)=>m+(R-m)*F;return p(p(p(ft[d+h+v],ft[u+h+v],n),p(ft[d+b+v],ft[u+b+v],n),i),p(p(ft[d+h+x],ft[u+h+x],n),p(ft[d+b+x],ft[u+b+x],n),i),f)/255},Bt=[],B=(e,a,o,s,r,c,n,i,f,d)=>{Bt.push([e,a,Math.sin(o),Math.cos(o),s,r,c,n,d||.004+.003*l(),l()*X,i,f])},k=(e,a)=>e+(l()-.5)*2*a,ht=k(40,w?0:120),nt=k(800,w?0:60),ut=k(335,w?0:25);if(Ft==="Twin summits"){const e=ht-330-80*l();B(e,nt+40,-1.9,1200,ut*.93,1,40,.95,.22),B(e,nt+40,1.5,420,ut*.93,-1,15,1,.3),B(ht+120,nt-20,1.9,1300,ut,-1,45,1,.22),B(ht+120,nt-20,-1.62,420,ut,1,15,1,.3)}else B(ht,nt,-1.95,1200,ut,1,Ft==="Long wall"?25:40,Ft==="Long wall"?3.2:.9,.22),B(ht,nt,1.88,1300,ut,-1,Ft==="Long wall"?30:48,Ft==="Long wall"?3:1,.22),B(ht+330+k(0,60),nt-50,Math.PI+.22+k(0,.15),440,ut*.83,1,8,.85,.42,.012),B(ht+720+k(0,80),nt-150,Math.PI+.38+k(0,.15),360,ut*.66,1,8,.85,.42,.012),B(ht-470+k(0,60),nt-170,Math.PI+.05+k(0,.15),330,ut*.62,1,8,.85,.42,.012);if(Ft!=="Long wall"){const e=Ft==="Twin summits"?ht+120:ht,a=Ft==="Twin summits"?nt-20:nt;B(e,a,Math.atan2(-270,-450)+(w?0:(l()-.5)*.3),560,ut,1,10,.95,.45,.01)}const je=k(-250,w?0:120),Qe=k(-720,w?0:60),Ye=k(210,w?0:25);B(je,Qe,.15+k(0,.2),430,Ye,1,8,.95,.45,.012),B(je,Qe,1.52,1250,Ye,1,50,1,.2),B(je,Qe,-1.82,900,Ye,-1,45,1,.2);const Je=k(420,w?0:120),$e=k(-1180,w?0:80),t0=k(275,w?0:30);B(Je,$e,-.585,620,t0,1,10,.95,.45,.01),B(Je,$e,1.877,1e3,t0,1,45,1,.2),B(Je,$e,-2.03,900,t0,-1,45,1,.2);const e0=k(220,w?0:80),a0=k(255,w?0:30);B(-920,e0,2.89,1100,a0,1,50,1,.22),B(-920,e0,-.2,900,a0*.9,-1,40,1,.22),B(-920,e0,1.77,450,a0,1,8,.95,.45,.012);const o0=k(430,w?0:60),n0=k(240,w?0:25);B(1020,o0,3.04,720,n0,-1,40,1,.22),B(1020,o0,-.2,900,n0*.92,1,45,1,.22),B(1020,o0,-1.42,480,n0,1,8,.95,.45,.012);const dt=Bt.length,pt=[30,100],Kt=[330,235],jt=(()=>{const e=.3+(l()-.5)*.3;return[Math.sin(e),Math.cos(e)]})(),s0=230,Ee=1350,Qt=[470,-170],vt=(()=>{const e=1.98+(l()-.5)*.15;return[Math.sin(e),Math.cos(e)]})(),r0=(e,a)=>e[7]*(Math.sin(a*e[8]+e[9])+.45*Math.sin(a*e[8]*2.37+e[9]*1.9)+.24*Math.sin(a*e[8]*5.3+e[9]*.7)),ea=(e,a,o)=>{const s=e-o[0],r=a-o[1],c=s*o[2]+r*o[3],n=-s*o[3]+r*o[2],i=Math.min(Math.max(c,0),o[4]),f=r0(o,i),d=Math.sqrt(i*i+4900)-70,u=o[5]*(1-Math.pow(d/o[4],o[10]))*(.9+.075*Math.sin(i*o[8]*.61+o[9]*2.7)+.05*Math.sin(i*o[8]*2.9+o[9]*1.3)+.022*Math.sin(i*o[8]*7.1+o[9]*4.1)),h=(n-f)*o[6];return u-Vt(h*.64,-h*o[11],2)-Math.max(Math.max(-c,c-o[4]),0)*.45},fo=(e,a)=>{const o=e-Qt[0],s=a-Qt[1],r=Math.max(o*vt[0]+s*vt[1],0);return Math.hypot(o-vt[0]*r,s-vt[1]*r)},Lt=(e,a)=>{const o=(e-pt[0])/Kt[0],s=(a-pt[1])/Kt[1],r=Math.hypot(o,s)+.22*(Ct(e*.006,a*.006,3)-.5)+.08*(Ct(e*.03,a*.03,4)-.5),c=Q(1.04,.9,r),n=(1+4.5*Ct(e*.003,a*.003,7))*(1-c)-.3*c,i=Q(70,300,fo(e,a));let f=-1e4;for(let D=0;D<dt;D++){const A=ea(e,a,Bt[D]);f=Vt(f,A,Math.min(30,Math.max(1.5,30-f*.09)))}let d=Vt(n,f*i+(i-1)*40,18);const u=e*jt[0]+a*jt[1],b=-e*jt[1]+a*jt[0]+260*Math.sin(u*93e-5+1.3)+80*Math.sin(u*.0027+4),v=Math.floor(b/Ee),x=b-v*Ee,p=x-Ee;let m=Math.max(s0*(.2+1.1*Ct(v*5.3,u*.0024,11))-Vt(x*.62,-x*.21,3),s0*(.2+1.1*Ct(v*5.3+5.3,u*.0024,11))-Vt(p*.62,-p*.21,3));m=m*i+(i-1)*40;const R=Q(900,1900,Math.hypot(e-pt[0],a-pt[1]));d=Vt(d,-100+(m+100)*R,26);const F=Q(.5,8,d);return d+F*(5.5*Ct(e*.0065,a*.0065,1)+1.5*Ct(e*.024,a*.024,2)-3.5)},aa=(238+(w?0:(l()-.5)*16))*G,oa=36*G,ho=e=>(.7+46*Math.pow(Math.max(e,0),1.45))*G,Me=e=>Math.pow(Math.max(e-.7,0)/46,1/1.45),Yt=zt==="Crest fire"?Me(1+.4*l()):zt==="Low sun on the pan"?Me(19+3*l()):zt==="Sun reaching the pan"?(l(),Me(9+2.4*io)):Me(w?2.3:2+.8*l()),uo=e=>{const a=ho(e),o=aa+oa*e;return{el:a,az:o,d:[Math.sin(o)*Math.cos(a),Math.sin(a),Math.cos(o)*Math.cos(a)]}};let bt=(Ke==="Across the vlei"?-.42:Ke==="Down the arm"?-.2:.03)+(w?0:(l()-.5)*.08),c0=(Ke==="Down the arm"?3:5)*G,mt=Math.tan(30*G);const po={yaw:0,pitch:0,x:0,y:0,z:0},z={yaw:bt,pitch:c0,x:0,y:1.3,z:0};let na="";const i0=()=>{const e=C.view||po;z.yaw=bt+(e.yaw||0),z.pitch=Math.max(-1.3,Math.min(1.3,c0+(e.pitch||0)));const a=e.x||0,o=e.z||0,s=Math.hypot(a,o),r=s>8?8/s:1;z.x=a*r,z.z=o*r,z.y=-.3+Math.max(.4,Math.min(4,1.6+(e.y||0)));const c=z.yaw.toFixed(5)+z.pitch.toFixed(5)+z.x.toFixed(3)+z.z.toFixed(3)+z.y.toFixed(3),n=c!==na;return na=c,n};i0();const l0=()=>{const e=Math.cos(z.pitch),a=[Math.sin(z.yaw)*e,Math.sin(z.pitch),Math.cos(z.yaw)*e],o=[Math.cos(z.yaw),0,-Math.sin(z.yaw)];return{fw:a,rt:o,up:fe(a,o)}},vo=(e,a)=>{const{fw:o,rt:s,up:r}=l0(),c=e*2-1,n=1-a*2;return L([0,1,2].map(i=>o[i]+(c*s[i]+n*r[i])*mt))},sa=(e,a,o)=>{const{fw:s,rt:r,up:c}=l0(),n=[e-z.x,a-z.y,o-z.z],i=n[0]*s[0]+n[1]*s[1]+n[2]*s[2];return i<.2?null:[(n[0]*r[0]+n[1]*r[1]+n[2]*r[2])/i/mt,(n[0]*c[0]+n[1]*c[1]+n[2]*c[2])/i/mt]},he=[],ye=[],we=[];let f0=0,Re=0,h0=!1,ra=!0;const tt=(e,a,o,s,r,c,n)=>{if(!h0){if(Re>=f0)return!1;Re++}return ra||he.push(e[0],e[1],e[2],o,a[0],a[1],a[2],s,r,c,0,0,0,1,0,n),!0},Ot=(e,a)=>{const o=L(fe(e,Math.abs(e[1])<.9?[0,1,0]:[1,0,0])),s=fe(e,o),r=l()*X,c=[0,1,2].map(n=>o[n]*Math.cos(r)+s[n]*Math.sin(r));return L([0,1,2].map(n=>e[n]*Math.cos(a)+c[n]*Math.sin(a)))};let ca=!1;const mo=(e,a,o,s,r,c)=>{const n=a[0]-e[0],i=a[1]-e[1],f=a[2]-e[2],d=Math.hypot(n,i,f);if(!ca||d<.28)return tt(e,a,o,s,1,r,c);const u=.35+.3*Pt(),h=.2*d,b=[e[0]+n*u+(Pt()-.5)*h,e[1]+i*u+(Pt()-.5)*h,e[2]+f*u+(Pt()-.5)*h],v=o+(s-o)*u;return tt(e,b,o,v,1,r,c)?(h0=!0,tt(b,a,v,s,1,r,c),h0=!1,!0):!1},Ae=(e,a,o,s,r,c,n,i)=>{const f=Math.max(1,Math.round(s/(.42+.35*l()))),d=Math.max(.018,o*(r>=2?.45:.62));let u=e,h=a,b=o;for(let v=0;v<f;v++){const x=s/f*(.6+.8*l());h=Ot(h,(l()<.08?.6:.16+.34*l())*(v===0?.5:1)),h=L([h[0],h[1]+n,h[2]]);const p=o+(d-o)*(v+1)/f,m=Z(u,O(h,x));if(m[1]<.15+p&&(m[1]=.15+p,h=L([h[0],.3,h[2]])),!mo(u,m,b*(1+.12*(l()-.3)),p,c,i))return;if(r<4&&v<f-1&&l()<[.5,.5,.42,.3][r])Ae(m,Ot(h,.6+.5*l()),p*(.45+.25*l()),s*(.35+.3*l()),r+1,c,n*.85,i);else if(l()<.22&&p>.04){const R=Ot(h,.8+.5*l());tt(m,Z(m,O(R,.1+.3*l())),p*.66,p*.55,1,c,i)}u=m,b=p}if(r<4&&b>.024&&l()<(r<2?.85:.55)){const v=l()<.35?3:2;for(let x=0;x<v;x++)Ae(u,Ot(h,.3+.45*l()),b*(.62+.15*l()),s*(.42+.3*l()),r+1,c,n*.8,i)}},u0=(e,a,o,s,r,c)=>{we.push({x:e,z:a,sc:o,kind:s,tone:r,id:c}),ca=Math.hypot(e,a)<45,f0=Re+(s==="hero"?520:260);const n=(.17+.1*l())*o*(s==="hero"?1.2:1),i=l()*X,f=s==="leaner"?.5:.08+.25*l(),d=[e,-.75,a],u=s==="hero"||s==="broken"?1:l()<.22?2:1;for(let h=0;h<u;h++){const b=i+h*1.3*(l()-.3);let v=L([Math.sin(b)*(f+.2*h),1,Math.cos(b)*(f+.2*h)]),x=n*(h?.75:1),p=Z(d,O(v,.7));tt(d,p,x*1.75,x*1.15,1,r,c);for(let A=0;A<2+(l()<.6?1:0);A++){const H=i*3+A*2.2+l();tt(Z(d,[0,.5,0]),[e+Math.cos(H)*x*2.3,-.52,a+Math.sin(H)*x*2.3],x*.5,x*.2,1,r,c)}const m=(s==="broken"?1.4+1.4*l():.5+1.1*l())*o,R=2+(l()<.5?1:0);x*=1.15;for(let A=0;A<R;A++){v=Ot(v,.15+.3*l()),v=L([v[0],v[1]+.2,v[2]]);const H=Z(p,O(v,m/R)),S=x*.88;tt(p,H,x,S,1,r,c),p=H,x=S}if(s==="broken"){tt(p,Z(p,O(Ot(v,.4),.3)),x,x*.85,1,r,c);for(let A=0;A<1+(l()<.6?1:0);A++)Ae(p,Ot(v,.9+.4*l()),x*.5,(.9+1.4*l())*o,2,r,.08,c);continue}const F=s==="hero"?4:2+Math.floor(l()*2.4),D=l()*X;for(let A=0;A<F;A++){const H=D+(A+(l()-.5)*.7)*X/F,S=(30+34*l())*G,_=L([Math.sin(H)*Math.cos(S)+v[0]*.3,Math.sin(S),Math.cos(H)*Math.cos(S)+v[2]*.3]);Ae(p,_,x*(.6+.2*l()),(2.6+2.4*l())*o*(s==="hero"?1.15:1),0,r,.16+.12*l(),c)}}if(l()<.45){const h=l()*X,b=(1.5+2.5*l())*o,v=n*(.35+.3*l());let x=[e+Math.cos(h)*(1.5+2.5*l()),v-.31,a+Math.sin(h)*(1.5+2.5*l())],p=[Math.sin(h+1.4),0,Math.cos(h+1.4)],m=v;for(let R=0;R<6;R++){p=L([p[0]+(l()-.5)*.9,0,p[2]+(l()-.5)*.9]);const F=m*.86,D=Z(x,O(p,b/6));if(D[1]=F-.31,tt(x,D,m,F,1,r,c),l()<.35){const A=L([p[2]*(l()<.5?1:-1)+p[0]*.5,.35+.4*l(),-p[0]+p[2]*.5]);tt(D,Z(D,O(A,.3+.6*l())),F*.55,F*.25,1,r,c)}x=D,m=F}}},xo=W==="Dense stand"?46:W==="Few giants"?10:W==="One alone"?1:26,st=[],ia=(e,a,o)=>Math.hypot((e-pt[0])/(Kt[0]-o),(a-pt[1])/(Kt[1]-o))<1;if(W==="One alone"){const e=k(4,3),a=k(26,4);u0(e,a,1.35,"hero",.3+.4*l(),0),st.push([e,a])}else{const e=w?-4.6:k(-5,3)*(l()<.3?-1:1),a=w?13.5:k(15,3);u0(e,a,W==="Few giants"?1.3:1.12,"hero",.25+.4*l(),0),st.push([e,a]);let o=0;for(;st.length<xo&&o++<900;){const s=l()<.62,r=s?bt+(l()-.5)*1.3:l()*X,c=11+Math.pow(l(),s?1.25:.8)*230,n=Math.sin(r)*c,i=Math.cos(r)*c;if(!ia(n,i,25)||Math.hypot(n,i)<9||Lt(n,i)>0)continue;const f=W==="Dense stand"?9:W==="Few giants"?26:14;if(st.some(b=>Math.hypot(b[0]-n,b[1]-i)<f))continue;const d=sa(n,3,i);if(d&&Math.abs(d[0]-.15)<.12&&Math.hypot(n,i)<45)continue;const u=l(),h=u<.12?"broken":u<.28?"leaner":"spread";u0(n,i,(W==="Few giants"?1.15:.75)+.5*l(),h,l(),st.length),st.push([n,i,h])}}let Xt=null;if(le==="Long lens"){const e=zt==="First light"||zt==="Crest fire",a=be()<.5?-1:1,o=(e?.8:.62)+.1*be(),s=i=>Math.atan2(i[0],i[1]),r=i=>{const f=Math.hypot(i[0],i[1]),d=e?.21:Math.min(.2,Math.max(.07,5.8/(.9*f)));for(const u of[a,-a]){const h=s(i)-u*Math.atan(.34*d);let b=!0;for(const v of st){const x=Math.hypot(v[0],v[1]);if(v===i||x>.72*f)continue;const p=Math.tan(s(v)-h)/d;if(Math.abs(p)<1.1+1.5/Math.max(x,1)/d&&Math.cos(s(v)-h)>0){b=!1;break}}if(b)return{d:f,th:d,yw:h,q:i,sd:u}}return null},c=st.filter(i=>{const f=Math.hypot(i[0],i[1]);return i[2]!=="broken"&&f>20&&f<140&&Math.abs(s(i)-bt)<.5}).map(r).filter(i=>i),n=c.length?c[Math.floor(be()*c.length)]:null;Xt=n,n?(mt=n.th*(e?.75:.62),bt=s(n.q)-n.sd*Math.atan(.34*mt),c0=-Math.atan(1.3/n.d)+Math.atan(o*mt)):le="Eye level",i0()}C.trait("Lens",le);const Et=-.3;let ze=63268007,rt=0;for(let e=2;e<66;e+=8)ze=Math.imul(ze^parseInt(C.hash.slice(e,e+8),16),668265263)^ze>>>13;const g=()=>{rt=rt+1831565813|0;let e=Math.imul(rt^rt>>>15,1|rt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Fe=e=>{rt=Math.imul(ze^Math.imul(e+7,2654435761),2246822507),rt^=rt>>>13,g()},E=(e,a)=>e+(a-e)*g(),la=e=>{let a=0;for(const s in e)a+=e[s];let o=g()*a;for(const s in e)if(o-=e[s],o<0)return s;return Object.keys(e)[0]},To=(e,a)=>e[0]*a[0]+e[1]*a[1]+e[2]*a[2],go=(e,a)=>[e[0]-a[0],e[1]-a[1],e[2]-a[2]],Ue=e=>L(fe(e,Math.abs(e[1])<.9?[0,1,0]:[1,0,0])),fa=e=>{const a=Ue(e),o=fe(e,a),s=g()*X;return Z(O(a,Math.cos(s)),O(o,Math.sin(s)))},ha=(e,a)=>L(Z(O(e,Math.cos(a)),O(fa(e),Math.sin(a))));let Ne=.001,ua=.09,da=0,pa=0;const d0=(e,a,o,s,r,c,n)=>{he.push(e[0],e[1],e[2],o,a[0],a[1],a[2],s,1,da,r,c,n[0],n[1],n[2],pa)},Ut=(e,a,o,s,r,c,n)=>{const i=Math.max(3,Math.ceil(s/Math.max(.035,Math.min(.12,Ne)))),f=s/i,d=n.s0||0,u=g()*X,h=1.5+3*g(),b=Ne>.03?.9:.45,v=(n.bend||.5)*1.6,x=1-f*2.5,p=v*Math.sqrt(f),m=L(a),R=n.dt||m,F=L(go(o,O(m,To(o,m))));let D=e[0],A=e[1],H=e[2],S=m[0],_=m[1],M=m[2],P=R[0],I=R[1],q=R[2],ct=F[0],Tt=F[1],K=F[2],ee=0,N0=0,S0=0,Xa=0,Ha=0,Ia=0,Zt=0,qa=n.up||0,k0=0,Ga=e.slice(),Za=r,D0=d,_0=0,Ie=0,P0=0;const C0=()=>{let et,j,$;Math.abs(_)<.9?(et=-M,j=0,$=S):(et=0,j=M,$=-_);const _t=Math.hypot(et,j,$)||1;et/=_t,j/=_t,$/=_t;const ae=_*$-M*j,oe=M*et-S*$,ne=S*j-_*et,se=g()*X,gt=Math.cos(se),it=Math.sin(se);_0=et*gt+ae*it,Ie=j*gt+oe*it,P0=$*gt+ne*it},Wa=[{p:e.slice(),d:m,u:F,r,s:d}];for(let et=1;et<=i;et++){const j=et/i,$=d+j*s;if(C0(),ee=ee*x+_0*p,N0=N0*x+Ie*p,S0=S0*x+P0*p,Zt<=0&&g()<(n.dog||0)*f){Zt=.1+.15*g(),C0();let U=_0,at=Ie,qe=P0;C0(),at-=.6*Ie;const L0=Math.hypot(U,at,qe)||1;U/=L0,at/=L0,qe/=L0;const Ge=.3+.5*g(),O0=Math.tan(Ge*.7);Xa=U*Ge/Zt,Ha=at*Ge/Zt,Ia=qe*Ge/Zt,P+=U*O0,I+=at*O0,q+=qe*O0;const X0=Math.hypot(P,I,q)||1;P/=X0,I/=X0,q/=X0;const H0=Math.hypot(R[0],R[2]),Te=Math.hypot(P,q);if(H0>.2&&Te>.001){const Ze=R[0]/H0,We=R[2]/H0,Ka=P/Te,ja=q/Te,Oo=Ze*Ka+We*ja,I0=Math.cos(1.22);if(Oo<I0){const Qa=Ze*ja-We*Ka<0?-1:1,Ya=Math.sin(1.22);P=(Ze*I0-Qa*We*Ya)*Te,q=(We*I0+Qa*Ze*Ya)*Te}}}I+=qa*f*(1-I),n.ceil!==void 0&&A>n.ceil&&(I-=Math.min(A-n.ceil,1)*3*f);{const U=Math.hypot(P,I,q)||1;P/=U,I/=U,q/=U}const _t=n.minUp===void 0?n.ceil!==void 0?.12:.3:n.minUp;if(n.lie===void 0&&I<_t){const U=Math.hypot(P,q)||1,at=Math.sqrt(1-_t*_t);P=P/U*at,I=_t,q=q/U*at}let ae=ee+(P-S)*2.2,oe=N0+(I-_)*2.2,ne=S0+(q-M)*2.2;Zt>0&&(ae+=Xa,oe+=Ha,ne+=Ia,Zt-=f);const se=ae*S+oe*_+ne*M;ae-=S*se,oe-=_*se,ne-=M*se;let gt=S+ae*f,it=_+oe*f,re=M+ne*f;{const U=Math.hypot(gt,it,re)||1;gt/=U,it/=U,re/=U}let Wt=(r+(c-r)*Math.pow(j,n.tp||.8))*(1+.06*Math.sin($*h+u))*(1+(n.flare||0)*Math.exp(-Math.max(j*s-(n.fo||0),0)*4.5));if(n.tip&&j>1-n.tip&&(Wt*=1-.6*(j-1+n.tip)/n.tip),n.lie!==void 0){it=(Et+Wt*n.lie-A)*2;const U=Math.hypot(gt,it,re)||1;gt/=U,it/=U,re/=U}const Lo=Math.acos(Math.min(1,gt*S+it*_+re*M));if(S=gt,_=it,M=re,D+=S*f,A+=_*f,H+=M*f,n.lie===void 0&&!n.under&&A<Et+Wt*.6){if(A=Et+Wt*.6,_<.12){_=.12;const U=Math.hypot(S,_,M)||1;S/=U,_/=U,M/=U}if(n.rebound){qa=n.rebound,n.minUp=.3,I=Math.max(I,.6);const U=Math.hypot(P,I,q)||1;P/=U,I/=U,q/=U}}n.under&&j*s>(n.fo||0)&&(n.under=!1);{const U=ct*S+Tt*_+K*M;ct-=S*U,Tt-=_*U,K-=M*U;const at=Math.hypot(ct,Tt,K)||1;ct/=at,Tt/=at,K/=at}k0+=Lo;const B0=[D,A,H],Va=[ct,Tt,K];(k0>ua||$-D0>b||et===i)&&(d0(Ga,B0,Za,Wt,D0,$,Va),Ga=B0,Za=Wt,D0=$,k0=0),Wa.push({p:B0,d:[S,_,M],u:Va,r:Wt,s:$})}return Wa},ue=(e,a,o)=>{const s=ha(e,a);return L([s[0],Math.max(s[1]+o,.3),s[2]])};let Se=0;const Ht=(e,a,o,s,r,c,n)=>{const i=g()*4294967296|0,f=rt;rt=i,bo(e,a,o,s,r,c,n),rt=f},bo=(e,a,o,s,r,c,n)=>{const i=Math.max(.011,.8*Ne);if(r<i||s<.06)return;const f=Math.max(r*(c===0?.6+.15*g():.48+.2*g()),i),d=Ut(e,a,o,s,r,f,n),u=d.length-1,h=d[u];let b=!1;if(c<n.lv){const v=c===0?1+Math.floor(g()*(n.lv>2?3:2)):g()<.6?1:0;for(let x=0;x<v;x++){const p=.28+.5*g(),m=d[Math.round(p*u)];Ht(m.p,ue(m.d,(20+26*g())*G,n.rise),m.u,s*(1-p)*(.55+.45*g()),m.r*(.6+.2*g()),c+1,{...n,up:n.up*.8,rebound:void 0,minUp:void 0,dt:void 0,s0:m.s})}if(g()<n.fork){b=!0;const x=fa(h.d),p=(14+18*g())*G,m=(20+22*g())*G,R=L(Z(O(h.d,Math.cos(p)),O(x,Math.sin(p)))),F=L(Z(O(h.d,Math.cos(m)),O(x,-Math.sin(m)))),D={...n,rebound:void 0,minUp:void 0,dt:void 0,s0:h.s};Ht(h.p,R,h.u,s*(.3+.3*g()),f*.9,c+1,D),Ht(h.p,F,h.u,s*(.2+.3*g()),f*.72,c+1,{...D,s0:h.s+3})}}if(!b){Se++;const v=f*(.8+1.6*g()),x=Z(h.p,O(h.d,v));d0(h.p,x,f,f*(.35+.3*g()),h.s,h.s+v,h.u)}if(c>=1||n.stubs)for(let v=.15+.5*g();v<s;v+=.35+.9*g()){const x=d[Math.min(u,Math.round(v/s*u))],p=x.r*(.35+.25*g());if(p<i)continue;const m=ue(x.d,(40+40*g())*G,.2),R=(.04+.26*g())*(c>=2?1:.7);d0(x.p,Z(x.p,O(m,R)),p,p*.6,x.s+7,x.s+7+R,x.u),Se++}},Eo=(e,a,o,s,r,c)=>{for(let n=0;n<r;n++){const i=c+(n+.6*(g()-.5))*X/r,f=[Math.sin(i),0,Math.cos(i)];Ut([e+f[0]*o*.5,Et,a+f[2]*o*.5],f,[0,1,0],E(.35,1.2)*s/5,o*E(.3,.5),o*.07,{bend:.9,dog:1.2,lie:E(.25,.65),tp:.6})}},va=(Fe(9001),g()*X),Mo=0,yo=(e,a,o)=>{const{x:s,z:r}=e,c=Math.max(3,Math.hypot(s-z.x,r-z.z));Ne=c*2*mt/1e3,ua=(c<60?5:10)*G,da=e.tone,pa=g()*64,Se=0;const n=Math.min(.3,o*E(.032,.046))*(a==="snag"||a==="stump"?1.2:1),i=g()*X;if(a==="fallen"){const p=g()*X,m=[Math.sin(p),0,Math.cos(p)],R=o*E(.7,1.1),F=Ut([s,Et,r],m,[0,1,0],R,n,n*.45,{bend:.6,dog:.8,lie:E(.1,.4)}),D=5+Math.floor(g()*4);for(let H=0;H<D;H++){const S=(H/(D-1)-.5)*2.6+(g()-.5)*.4,_=Ue(m),M=L(Z(Z(O([0,1,0],Math.cos(S)),O([_[0],0,_[2]],Math.sin(S))),O(m,-.35)));Ut([s,Et+n*.4,r],M,m,E(.3,.9)*n*4,n*E(.35,.55),n*.1,{bend:1.1,dog:1.5,under:!0,fo:0})}const A=F[Math.round(F.length*E(.55,.8))];Ht(A.p,ue(A.d,E(.5,.9),.5),A.u,o*E(.3,.55),A.r*.7,1,{bend:.6,dog:1,up:.1,lv:2,fork:.4,rise:.2,s0:A.s}),ye.push([s+m[0]*R*.5,r+m[2]*R*.5,n*2,.5]);return}Eo(s,r,n,o,3+Math.floor(g()*3),i),ye.push([s,r,n*1.6,1]);let f=a==="leaner"?E(.3,.5):a==="flagged"?E(.15,.3):E(0,.13);const d=a==="flagged"?va:i,u=L([Math.sin(d)*Math.sin(f),Math.cos(f),Math.cos(d)*Math.sin(f)]),h=e.kind==="hero",b={bend:.5,dog:.9,up:.3,lv:h?3:2,fork:.55,rise:.25};if(a==="snag"||a==="stump"){const p=a==="snag"?E(1.3,2.4):E(.3,.8),m=Ut([s,Et-.35,r],u,Ue(u),p+.35,n,n*.8,{bend:.4,dog:.6,up:.1,flare:.5,fo:.35,under:!0}),R=m[m.length-1];for(let F=0,D=2+Math.floor(g()*2);F<D;F++)Ut(R.p,ha(R.d,E(.05,.35)),R.u,E(.08,.4),n*.8*E(.3,.55),n*.1,{bend:.6,tip:.7,s0:R.s+F});if(a==="snag"){const F=m[Math.round(m.length*E(.55,.85))];Ht(F.p,ue(F.d,E(.6,1.1),.2),F.u,E(.8,2),F.r*.6,1,{...b,lv:2,s0:F.s})}return}const v=a==="twins"?2:1,x=g()*X;for(let p=0;p<v;p++){let m=u,R=n;if(v===2){const M=E(.2,.42),P=i+p*Math.PI+E(-.4,.4);m=L([Math.sin(P)*Math.sin(M),Math.cos(M),Math.cos(P)*Math.sin(M)]),R=n*(p?.68:.8)}const F=v===2?E(1.2,2.2):a==="parasol"?E(.5,1.1):E(.6,1.5),D=Ut([s,Et-.35,r],m,Ue(m),F+.35,R,R*.76,{bend:.35,dog:.5,up:.15,flare:p?0:.45,fo:.3,under:!0,s0:p*5}),A=v===2?2:a==="parasol"?3+(g()<.5?1:0):a==="flagged"?3:g()<(h?0:.3)?2:g()<.6?3:4,H=[];let S=0;for(let M=0;M<A;M++)H.push(M===0?1:.45+.5*g()),S+=H[M];const _=a==="crouch"?1:-1;for(let M=0;M<A;M++){const P=D[Math.max(1,D.length-1-Math.round(M*D.length*.1))],I=M===0?P.r:P.r*Math.sqrt(H[M]/S)*1.3;let q=a==="flagged"&&M!==A-1?va+(g()-.5)*1.4:v===2?i+p*Math.PI+(M-.5)*E(1,2):x+(M+(g()-.5)*.6)*X/A,ct=(a==="parasol"?E(38,62):a==="flagged"?E(28,55):v===2?E(10,30):h?E(18,44):E(12,36))*G,Tt=(o-F)/Math.cos(ct)*(M===0?E(.88,1.02):E(.68,.95));const K={...b,s0:P.s+(M?M*2:0)};a==="parasol"&&(K.ceil=o-.4,K.up=.12,Tt*=1.25,K.rise=.12),a==="flagged"&&(K.up=.12,M===A-1&&(Tt*=.45)),M===_&&(ct=E(68,80)*G,K.up=-.6,K.minUp=-.7,K.rebound=1.4,Tt=o*E(.65,.85));const ee=L([Math.sin(q)*Math.sin(ct)+m[0]*.3,Math.cos(ct),Math.cos(q)*Math.sin(ct)+m[2]*.3]);M===0&&(K.dt=ee),Ht(P.p,M===0?P.d:ee,P.u,Tt,I,0,K)}}};{const e=le==="Long lens"&&Xt?Xt.q:null,a=we[0];if(!w&&le==="Eye level"){Fe(4242);const o=W==="One alone",s=g(),r=o?s<.3?-1:s<.6?1:0:s<.45?-1:s<.75?1:0;for(let c=0;c<6;c++){const n=r===0||o?E(12,26):6+19*Math.pow(g(),1.3),i=r<0?E(-.62,o?-.3:-.5):r>0?E(o?.3:.36,.58):E(-.06,.06),f=bt+Math.atan(i*mt),d=Math.sin(f)*n,u=Math.cos(f)*n;if(ia(d,u,25)&&Lt(d,u)<=0&&!st.some((h,b)=>b>0&&Math.hypot(h[0]-d,h[1]-u)<6)){a.x=d,a.z=u,st[0]=[d,u];break}}}for(let o=0;o<we.length;o++){const s=we[o];Fe(s.id*31+1+(w?Mo:0));let r;s.kind==="hero"?r=w?"spread":la(W==="Few giants"?{parasol:60,spread:25,twins:15}:W==="One alone"?{parasol:40,spread:35,twins:25}:{spread:30,parasol:22,flagged:14,twins:14,crouch:12,leaner:8}):s.kind==="broken"?r=g()<.7?"snag":"stump":s.kind==="leaner"?r=g()<.6?"leaner":"flagged":r=la(W==="Few giants"?{parasol:55,spread:30,twins:15}:W==="Dense stand"?{spread:30,snag:20,stump:10,twins:10,flagged:10,fallen:8,parasol:6,crouch:6}:{spread:32,parasol:16,flagged:10,twins:10,crouch:8,snag:8,fallen:9,stump:7}),e&&st[o]===e&&!/spread|parasol|flagged|twins|leaner/.test(r)&&(r="spread");const c=s.kind==="hero"?w?5.8:W==="One alone"?E(6,6.8):E(5,6.5):4*s.sc*(W==="Dense stand"?.85:1)*E(.9,1.1);if(yo(s,r,c),s.k2=r,s.ends=Se,Fe(s.id*31+17),g()<.3&&r!=="fallen"){const n=g()*X,i=1.5+3*g(),f=[Math.sin(n+1.2+g()),0,Math.cos(n+1.2+g())],d=c*E(.012,.025),u=Ut([s.x+Math.sin(n)*i,Et,s.z+Math.cos(n)*i],f,[0,1,0],c*E(.3,.55),d,d*.5,{bend:1.3,dog:2.5,lie:E(.05,.3)});for(let h=0,b=1+Math.floor(g()*3);h<b;h++){const v=u[Math.round((u.length-1)*E(.15,.95))];Ht(v.p,ue(v.d,E(.7,1.3),.4),v.u,E(.25,.9),v.r*E(.45,.7),2,{bend:.8,dog:1.5,up:.2,lv:3,fork:.5,rise:.3,s0:v.s+h})}}}}const wo=J0==="None"?0:J0==="Three crossing"?3:1,Ho=w?27:k(10,90),Io=w?185:k(190,40),qo=l()<.5?1.45:-1.6;for(let e=0;e<wo;e++)l(),l(),l();const Ro=he.length/16;ra=!1;for(let e=0;e<9;e++){const a=380+e*160+120*l(),o=(l()-.5)*110,s=Qt[0]+vt[0]*a-vt[1]*o,r=Qt[1]+vt[1]*a+vt[0]*o;f0=Re+8;const c=3+2.5*l(),n=3+3*l(),i=Lt(s,r)-.3;tt([s,i,r],[s+.3,i+c,r],.3,.22,3,0,91);for(let f=0;f<3;f++){const d=l()*X,u=n*(.4+.25*l());tt([s+Math.sin(d)*u,i+c+.8*l(),r+Math.cos(d)*u],[s-Math.sin(d)*u*.6,i+c+.6+.8*l(),r-Math.cos(d)*u*.6],n*.42,n*.38,3,0,91)}}const Ao=he.length/16,zo=new Float32Array(he),de=[],Fo=ta==="Clean clay"?0:ta==="Many trails"?3:2;for(let e=0;e<3;e++){if(e>=Fo){de.push([0,-9999,0,0]);continue}const a=(e===0?1.1:-1.2+l()*.8)+(l()-.5)*.5,o=e===0?6+4*l():14+30*l(),s=-Math.cos(a)*60+(l()-.5)*10,r=o+Math.sin(a)*60;de.push([s-Math.sin(a)*120,r-Math.cos(a)*120,a,l()*X])}const ke=Math.PI+.5*(l()-.5),p0=22,Uo=[Math.sin(ke)*p0+.2,Math.cos(ke)*p0+1.25,-Math.sin(ke),-Math.cos(ke)],ma=(w?1.9:1.6+.6*l())+(l()<.35&&!w?Math.PI:0),v0=[Math.sin(ma),0,Math.cos(ma)],De=Ve==="Still"?0:Ve==="Berg wind"?1:.45,_e=[];for(let e=0;e<dt&&_e.length<160;e++){const a=Bt[e];if(!(a[5]<150))for(let o=0;o<24;o++){const s=a[4]*(.03+.6*(o+l())/24);let r=-1e9,c=0,n=0;const i=r0(a,s);for(let f=-4;f<=4;f++){const d=i+f*3,u=a[0]+a[2]*s-a[3]*d,h=a[1]+a[3]*s+a[2]*d,b=Lt(u,h);b>r&&(r=b,c=u,n=h)}r>60&&_e.push([c,r+.5,n,Math.atan2(a[2],a[3])])}}const No=Math.max(1,Math.min(160,_e.length)),xt=512,pe=1536,m0=5600,Nt=(e,a,o,s,r,c)=>{const n=t.createTexture();return t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,o,e,a,0,s,r,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),n},x0=(e,a)=>{const o=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,a?t.DEPTH_ATTACHMENT:t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),o},xa=e=>{const a=Nt(64,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),o=Nt(64,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),s=Nt(160,1,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST),r=Nt(xt,xt,t.R32UI,t.RED_INTEGER,t.UNSIGNED_INT,t.NEAREST),c={t:r,f:x0(r)},n=e?Nt(xt,xt,t.RGBA16F,t.RGBA,t.HALF_FLOAT,t.LINEAR):Nt(xt,xt,t.RGBA32UI,t.RGBA_INTEGER,t.UNSIGNED_INT,t.NEAREST),i={t:n,f:x0(n)},f=t.createBuffer(),d=t.createVertexArray();t.bindVertexArray(d),t.bindBuffer(t.ARRAY_BUFFER,f);for(let u=0;u<4;u++)t.enableVertexAttribArray(u),t.vertexAttribPointer(u,4,t.FLOAT,!1,64,u*16),t.vertexAttribDivisor(u,1);return t.bindVertexArray(null),{tS:a,tT:o,tC:s,hf:c,hz:i,sm:null,vbo:f,vaoT:d}};let y;if(!T){const e=ge.P,a=K0,o=ge.fl,s=ge.hf2,r=t.createTexture();t.bindTexture(t.TEXTURE_3D,r),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,ft),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const n of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,n,t.REPEAT);y=xa(s);const c={};for(const n in e)c[n]=a(n,e[n]);T=t.__c564={P:c,nd:ft,tN:r,vao:t.createVertexArray(),hf2:s,fl:o,tg:{},sets:[],ab:{},allS:[y],allA:{},tick:0,reg:typeof FinalizationRegistry=="function"?new FinalizationRegistry(n=>{for(const[i,f,d,u]of[[n.s,n.K.sets,n.K.allS,n.K.delS],[n.a,n.K.ab[n.SZ],n.K.allA[n.SZ],n.K.delA]])i.own===n.me&&(i.own=null,f.length<2?f.push(i):(d.splice(d.indexOf(i),1),u(i)))}):null,delS:n=>{for(const i of[n.tS,n.tT,n.tC,n.hf.t,n.hz.t])t.deleteTexture(i);for(const i of[n.hf.f,n.hz.f])t.deleteFramebuffer(i);n.sm&&(t.deleteTexture(n.sm.t),t.deleteFramebuffer(n.sm.f)),t.deleteBuffer(n.vbo),t.deleteVertexArray(n.vaoT)},delA:n=>{t.deleteTexture(n.a.t),t.deleteTexture(n.b.t),t.deleteFramebuffer(n.a.f),t.deleteFramebuffer(n.b.f),t.deleteRenderbuffer(n.rb)}}}const It={},Ta=(e,a)=>{let o=null;for(const s of e)s.own!==It&&(!o||s.use<o.use)&&(o=s);return o&&(T.tick-o.use>64||e.length>=a)?o:null},ga=()=>{let e=T.sets.pop()||Ta(T.allS,16);return e||(e=xa(T.hf2),T.allS.push(e)),e};y||(y=ga()),y.own=It,y.use=T.tick;const Y=T.P,T0=Nt,ba=()=>{const e=Math.ceil(N/2),a=T0(e,e,T.fl?t.RGBA16F:t.RGBA8,t.RGBA,T.fl?t.HALF_FLOAT:t.UNSIGNED_BYTE,t.LINEAR),o=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,a,0),T.tg[N]={p:{t:a,f:o,w:e}},T.ab[N]=[],T.allA[N]=[]};T.tg[N]||ba();const So=()=>{const e=T0(N,N,t.RG32UI,t.RG_INTEGER,t.UNSIGNED_INT,t.NEAREST),a=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0);const o=T0(N,N,t.RGBA16UI,t.RGBA_INTEGER,t.UNSIGNED_SHORT,t.NEAREST),s=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,s),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,N,N);const r=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,r),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,s),{a:{t:e,f:a},b:{t:o,f:r},rb:s}},Ea=()=>{let e=T.ab[N].pop()||Ta(T.allA[N],Math.max(4,Math.min(16,Math.floor(160/(N*N*18/1048576)))));return e||(e=So(),T.allA[N].push(e)),e.own=It,e.use=T.tick,e};let Mt=Ea();const V={a:Mt.a,b:Mt.b,p:T.tg[N].p},Ma=new Float32Array(64*4);Bt.forEach((e,a)=>Ma.set([e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10],e[11]],a*12));const ya=Math.min(64,ye.length),wa=new Float32Array(64*4);for(let e=0;e<ya;e++)wa.set(ye[e],e*4);const Ra=new Float32Array(160*4);_e.slice(0,160).forEach((e,a)=>Ra.set(e,a*4));const Aa=()=>{t.bindTexture(t.TEXTURE_2D,y.tS),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,1,t.RGBA,t.FLOAT,Ma),t.bindTexture(t.TEXTURE_2D,y.tT),t.texSubImage2D(t.TEXTURE_2D,0,0,0,64,1,t.RGBA,t.FLOAT,wa),t.bindTexture(t.TEXTURE_2D,y.tC),t.texSubImage2D(t.TEXTURE_2D,0,0,0,160,1,t.RGBA,t.FLOAT,Ra),t.bindBuffer(t.ARRAY_BUFFER,y.vbo),t.bufferData(t.ARRAY_BUFFER,zo,t.STATIC_DRAW)};Aa();const St=new Float32Array(160),ko=lo==="None"?0:1,za=bt+.25+(l()-.5)*.3,g0=(8+5*l())*G,b0=[Math.sin(za)*Math.cos(g0),Math.sin(g0),Math.cos(za)*Math.cos(g0)],Pe=$0==="Apricot"?[.76,.35,.12]:$0==="Deep rust"?[.57,.15,.052]:[.68,.22,.07],Ce=[.8,.75,.66],E0=[.42,.36,.3],Fa=e=>{const a=uo(e),o=a.el/G,s=Q(16,1.2,o),r=Q(1.5,40,o),c=ie([2.25,.98,.36],[2.9,2.6,2.15],r).map((p,m)=>p*(.75+.25*Q(.4,3,o))),n=ie([.012,.034,.16],[.04,.12,.4],r),i=ie([1.1,.6,.3],[.62,.72,.85],Q(1,22,o)),f=ie([.18,.22,.38],[.42,.55,.78],r),d=ie([.06,.088,.3],[.3,.4,.62],r),u=Q(.2,3,o)*(.7+.3*Q(4,25,o)),h=Pe.map((p,m)=>p*c[m]*.17*u),b=Q(9,14,o),v=Ce.map((p,m)=>p*(d[m]*.9+c[m]*Math.sin(a.el)*b*.8+h[m])),x=.95/(.55+.45*r*2.1)*(1+.25*s);return{sn:a,sunC:c,zen:n,horS:i,horA:f,amb:d,glow:h,panL:v,expo:x,belt:s*Q(-1,1.5,o),hz:1/(6500+16e3*r)}},Be=(e,a)=>{const{fw:o,rt:s,up:r}=l0(),c=e.sn;St.set([z.x,z.y,z.z,mt,o[0],o[1],o[2],2*mt/N,s[0],s[1],s[2],J,r[0],r[1],r[2],N,c.d[0],c.d[1],c.d[2],pe,e.sunC[0],e.sunC[1],e.sunC[2],e.expo,e.zen[0],e.zen[1],e.zen[2],c.az,e.horS[0],e.horS[1],e.horS[2],Math.tan(c.el),e.horA[0],e.horA[1],e.horA[2],e.belt,e.amb[0],e.amb[1],e.amb[2],e.hz,pt[0],pt[1],Kt[0],Kt[1],jt[0],jt[1],s0,Ee,Qt[0],Qt[1],vt[0],vt[1],Ua[0],Ua[1],m0,aa,oa/3,Sa[0],Sa[1],M0,v0[0],v0[1],v0[2],8,...Uo,...de[0],...de[1],...de[2],b0[0],b0[1],b0[2],ko,Pe[0],Pe[1],Pe[2],ya,Ce[0],Ce[1],Ce[2],p0,E0[0],E0[1],E0[2],No,y.hz?1:0,y0?1:0,0,0],0);for(let n=0;n<3;n++){const i=Jt[n];St.set(i?[i.x,i.y,i.z,i.t0]:[0,-1e4,0,-1e4],(25+n)*4),St.set(i?[i.tx,i.tz,i.str,i.ground]:[1,0,0,0],(28+n)*4)}St.set([e.glow[0],e.glow[1],e.glow[2],De*Q(0,2,J-w0)+Le,e.panL[0],e.panL[1],e.panL[2],ka],31*4)},Ua=[pt[0]-m0/2,pt[1]-m0/2],Na=Xt?[Xt.q[0],Xt.q[1]]:[z.x+Math.sin(bt)*70,z.z+Math.cos(bt)*70],M0=Xt?110:200,Sa=[Na[0]-M0/2,Na[1]-M0/2],ka=3200,Do=Ve==="Berg wind"?3200:2e3;let J=0,y0=!1,Le=0,_o=0,Oe=-1,w0=T.P.pt?-9:-1;const Jt=[null,null,null],ve=e=>{t.bindVertexArray(e||T.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.depthMask(!0),t.colorMask(!0,!0,!0,!0)},Po=()=>{t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,T.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,y.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,y.tT),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,V.a.t),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,V.b.t),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,y.hz?y.hz.t:null),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,y.sm?y.sm.t:null),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,V.p.t),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,y.hf?y.hf.t:null),t.activeTexture(t.TEXTURE9),t.bindTexture(t.TEXTURE_2D,y.tC)},kt=(e,a)=>{t.useProgram(e.p),t.uniform4fv(e.uU,St),t.uniform4i(e.uLp,a[0],a[1],a[2],a[3])};let $t=Fa(Yt);const Da=()=>{y.hz&&(ve(),Be($t),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,T.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,y.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,y.tT),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,y.hf.f),t.viewport(0,0,xt,xt),kt(Y.st,[0,xt,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,y.hz.f),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,y.hf.t),kt(Y.hz,[64,xt,4,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null))},R0=()=>{ve(),Be($t),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,null),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,T.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,y.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,y.tT),t.bindFramebuffer(t.FRAMEBUFFER,V.b.f),t.viewport(0,0,N,N),kt(Y.st,[N>400?1400:900,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,V.a.f),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,V.b.t),kt(Y.cl,[0,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,null),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,V.b.f),t.viewport(0,0,N,N),t.clearBufferuiv(t.COLOR,0,new Uint32Array([0,0,0,0])),t.clearBufferfv(t.DEPTH,0,new Float32Array([1])),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,V.a.t),ve(y.vaoT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),kt(Y.tr,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,Ao),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()};let me=-1;const _a=e=>{if(y0=e.sn.d[1]>.1&&!!Y.sm,!y0){Y.sm||(me=-1);return}if(!y.sm){const a=Nt(pe,pe,t.DEPTH_COMPONENT16,t.DEPTH_COMPONENT,t.UNSIGNED_SHORT,t.NEAREST);y.sm={t:a,f:x0(a,!0)},t.drawBuffers([t.NONE]),t.readBuffer(t.NONE)}ve(y.vaoT),Be(e),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,y.sm.f),t.viewport(0,0,pe,pe),t.clearBufferfv(t.DEPTH,0,new Float32Array([1])),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.colorMask(!1,!1,!1,!1),kt(Y.sm,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,Ro),t.colorMask(!0,!0,!0,!0),t.disable(t.DEPTH_TEST),t.bindFramebuffer(t.FRAMEBUFFER,null)},Pa=e=>{ve(),Be(e),Po(),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,null),t.bindFramebuffer(t.FRAMEBUFFER,V.p.f),t.viewport(0,0,V.p.w,V.p.w),t.clearBufferfv(t.COLOR,0,new Float32Array([0,0,0,0]));const a=ka*3+(De>0||Le>0?Do:0);if(Y.pt&&(Jt.some(o=>o)||De>0||Le>0)){t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);const o=St[31*4+3];De===0&&(St[31*4+3]=Le),kt(Y.pt,[0,0,dt,1]),t.drawArraysInstanced(t.TRIANGLES,0,6,a),St[31*4+3]=o,t.disable(t.BLEND)}t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,N,N),t.activeTexture(t.TEXTURE7),t.bindTexture(t.TEXTURE_2D,V.p.t),kt(Y.cp,[0,0,dt,1]),t.drawArrays(t.TRIANGLES,0,3)};$t.sn.el>6*G&&(j0(),Q0()),Da(),R0(),_a($t),Y.sm&&(me=Yt),Pa($t);const Ca=(e,a)=>{const o=vo(e,a);let s=0;for(let r=.5;r<6e3;r+=Math.max(.3,r*.008)){const c=z.x+o[0]*r,n=z.y+o[1]*r,i=z.z+o[2]*r;if(o[1]>0&&n>500)break;const f=Lt(c,i);if(n<f){let d=s,u=r;for(let h=0;h<10;h++){const b=(d+u)/2;z.y+o[1]*b<Lt(z.x+o[0]*b,z.z+o[2]*b)?u=b:d=b}return{x:z.x+o[0]*u,y:z.y+o[1]*u,z:z.z+o[2]*u,t:u,h:f}}s=r}return null},Co=e=>{let a=0,o=-1e9;for(let h=0;h<dt;h++){const b=ea(e.x,e.z,Bt[h]);b>o&&(o=b,a=h)}const s=Bt[a],r=e.x-s[0],c=e.z-s[1],n=Math.min(Math.max(r*s[2]+c*s[3],0),s[4]),i=r0(s,n);let f=-1e9,d=0,u=0;for(let h=-6;h<=6;h++){const b=i+h*2.5,v=s[0]+s[2]*n-s[3]*b,x=s[1]+s[3]*n+s[2]*b,p=Lt(v,x);p>f&&(f=p,d=v,u=x)}return{x:d,y:f,z:u,tx:s[2],tz:s[3]}};let A0=0;const Bo=(e,a)=>{let o=Ca(e,a);for(let r=1;r<8&&!o;r++)o=Ca(e,a+r*.012);if(!o)return;const s=r=>Math.max(-1,Math.min(1,r));if(o.y>25){const r=Co(o);Jt[A0]={x:r.x,y:r.y,z:r.z,t0:J,tx:r.tx,tz:r.tz,str:1,ground:0};const c=sa(r.x,r.y,r.z);C.sound.hit("noise",.5,{cutoff:700,dur:3.2,pan:s(c?c[0]:0)}),C.sound.hit("noise",.25,{cutoff:2600,dur:2.2,pan:s(c?c[0]:0),at:.3}),C.sound.note(45,{dur:3,vel:.12,wave:"sine",attack:.6})}else return;A0=(A0+1)%3};let qt=Yt,Gt=Yt,Xe=0,Ba=0,z0=0,F0=0,He=0,La=!1,Dt=null,xe=!1,U0=-1;const Oa=(e,a)=>{if(a=Math.min(Math.max(a||1/30,0),.1),J+=a,y.own!==It&&(y=ga(),y.own=It,Aa(),Da(),me=-1,te&&(te.s=y)),N>400)T.bigAt=T.tick;else if(T.bigAt!==void 0&&T.tick-T.bigAt>60){for(const c in T.tg)if(+c>400){for(const n of T.allA[c])T.delA(n),n.own=null;t.deleteTexture(T.tg[c].p.t),t.deleteFramebuffer(T.tg[c].p.f),delete T.tg[c],delete T.ab[c],delete T.allA[c]}T.bigAt=void 0}T.tg[N]||(ba(),V.p=T.tg[N].p),Mt.own!==It&&(Mt=Ea(),V.a=Mt.a,V.b=Mt.b,R0(),te&&(te.a=Mt)),y.use=Mt.use=T.tick=T.tick+1,T.lzDone||(++_o>=2&&Oe<0&&(j0(),Oe=J),Oe>=0&&J-Oe>.3&&Q0()),w0===-1&&Y.pt&&(w0=J),i0()&&R0();const o=C.input;for(const c of o.taps())Dt={x:c.x,y:c.y,t:J};if(o.down){La||(Ba=J,z0=o.x,F0=o.y,He=0,xe=!1);const c=o.x-z0,n=o.y-F0,i=Math.hypot(c,n);He+=i,He>.03?(Dt=null,Gt=Math.max(0,Math.min(.62,Gt+c*.75)),Xe=0):J-Ba>.4&&(xe=!0,Dt=null),z0=o.x,F0=o.y}else Dt&&J-Dt.t>.02&&(Bo(Dt.x,Dt.y),Dt=null);La=o.down,o.down||(xe=!1),xe&&(Gt=Math.min(1,Gt+a/6.5),Xe=0),Xe+=a,Xe>14&&(Gt+=(Yt+.045*(1-Math.exp(-J/150))-Gt)*Math.min(1,a/25)),qt+=(Gt-qt)*Math.min(1,a*3);const s=Math.floor(qt*14);s!==U0&&(U0>=0&&(xe||He>.03)&&C.sound.note([57,60,62,64,67,69,72,74,76,79,81,84,86,88,91][Math.max(0,Math.min(14,s))],{dur:2.2,vel:.12,wave:"sine",attack:.3}),U0=s);for(let c=0;c<3;c++)Jt[c]&&J-Jt[c].t0>15&&(Jt[c]=null);const r=Math.abs(qt-Yt)<1e-5?$t:Fa(qt);Math.abs(qt-me)>2e-4&&(_a(r),me=qt),Pa(r)},te=T.reg?{K:T,SZ:N,me:It,s:y,a:Mt}:null;return te&&T.reg.register(Oa,te),Oa}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
