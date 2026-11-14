// Desert Arch: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/539.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Te){Te&&function(){"use strict";const mo={yaw:0,pitch:0,x:0,y:0,z:0},_t=0,w=Math.PI*2,tt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,vo=tt+"void main() { gl_Position = vec4(gl_VertexID == 1 ? 3. : -1., gl_VertexID == 2 ? 3. : -1., 0., 1.); }",qt=`
uniform sampler2D uN;
uniform sampler3D uN3;
uint hu(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hf(uint x) { return float(hu(x) >> 8) * (1. / 16777216.); }
float n2(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN, (i + f + .5) / 256., 0.).r; }
float n3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f); return textureLod(uN3, (i + f + .5) / 64., 0.).r; }
float at2(float y, float x) { float ax = abs(x), ay = abs(y); float a = atan(min(ax, ay) / max(max(ax, ay), 1e-20)); a = ay > ax ? 1.5707963 - a : a; a = x < 0. ? 3.1415927 - a : a; return y < 0. ? -a : a; }
float sq(float x) { return x * x; }
`,Ee=tt+qt+`
uniform vec4 uM, uM2;   // uM: noise offset xy, dust, width; uM2: height, warp S, lat max, atan(pi/S)
out vec4 o;
float fbm(vec2 p, int n) { float s = 0., a = .5, w = 0.; for (int i = 0; i < n; i++) { s += a * n2(p); w += a; p = mat2(1.6, 1.2, -1.2, 1.6) * p + 13.7; a *= .5; } return s / w; }
void main() {
  vec2 uv = gl_FragCoord.xy / vec2(uM.w, uM2.x);
  float l = uM2.y * tan((uv.x - .5) * 2. * uM2.w);
  float b = (uv.y - .5) * 2. * uM2.z;
  vec2 p = vec2(l, b) * 16. + uM.xy;
  float F[8];
  int nk = int(uM.w * 0. + uM2.x * 0.) + 8;
  for (int k = 0; k < nk; k++) {
    float fk = float(k);
    float sc = k == 0 ? .45 : k == 1 ? 1.7 : k == 2 ? 5.3 : k == 3 ? .8 : k == 4 ? 2.6 : k == 5 ? 7.1 : k == 6 ? .3 : .55;
    vec2 pp = k == 6 ? vec2(l * 5., 3.) : k == 7 ? vec2(l * 9., 7.) : p * sc + fk * 17.3;
    F[k] = clamp((fbm(pp, k < 2 ? 5 : k == 3 ? 6 : 4) - .5) * 2.7 + .5, 0., 1.);
  }
  float cl = F[0], cl2 = F[1], cl3 = F[2];
  float hw = .05 + .065 * exp(-l * l / .3);
  float disc = exp(-abs(b + .012 * sin(l * 1.3)) / hw);
  float lonF = .12 + .7 * exp(-l * l / .6) + .25 * exp(-sq(l - 1.35) / .15);
  float bul = exp(-1.7 * pow(pow(abs(l) / .21, 2.4) + pow(abs(b) / .15, 2.4), 1. / 2.4));
  float gn = .78 + .44 * n2(p * 23. + 71.) * n2(p * 9. + 5.) * 1.6;
  float I = gn * disc * lonF * (.3 + 1.3 * cl * cl + .45 * cl2 * cl2) * (.75 + .5 * cl3) + bul * (3.4 + 1.2 * cl) + .9 * exp(-(l * l / .1 + b * b / .025)) * (.6 + .8 * cl2);
  I += .8 * exp(-(sq(l - .47) / .005 + sq(b + .04) / .0015)) * (.5 + .9 * cl2);
  I += 1. * exp(-(sq(l - .03) / .007 + sq(b + .075) / .0025)) * (.5 + .9 * cl2);
  I += .5 * exp(-(sq(l - .21) / .0009 + sq(b + .017) / .0004));
  float r1 = 1. - abs(2. * F[3] - 1.); r1 *= r1;
  float r2 = smoothstep(.35, .95, 1. - abs(2. * F[4] - 1.)) * smoothstep(.3, .6, F[3]);
  float r3 = smoothstep(.5, .85, F[5]) * (.4 + .6 * smoothstep(.4, .7, F[1]));
  float b0 = .022 * smoothstep(-.1, .35, l) + .01 * sin(l * 2.3) + .035 * (F[6] - .5);
  float lw = (.02 + .04 * smoothstep(0., 1.3, l)) * (.45 + 1.1 * F[7]);
  float env = exp(-sq((b - b0 + .016 * (F[5] - .5) + .01 * (F[2] - .5)) / lw)) * smoothstep(-.2, .02, l) * (1. - smoothstep(1.5, 2.1, l));
  float patchy = smoothstep(.3, .78, F[3] + .4 * (F[4] - .5));
  float tau = uM.z * (env * (2.4 * patchy + .9 * r2 + .5 * r3) + exp(-abs(b - b0 * .6) / .07) * (.35 * patchy + 1.1 * r2 + .8 * r3) * (.3 + .7 * exp(-l * l / 1.2)));
  tau += uM.z * 1.7 * exp(-(sq(l + .03) / .0012 + sq(b - .085) / .0005)) * (.5 + r2);
  tau += uM.z * 1.3 * exp(-sq((b - .085 + (l + .03) * 1.6) / .012)) * step(l, -.03) * step(-.2, l) * (.4 + r2);
  tau += uM.z * 1.1 * exp(-(sq(l + .1) / .004 + sq(b - .23) / .003)) * (.4 + 1.2 * r1);
  vec3 sc = mix(vec3(.78, .85, 1.), vec3(1., .9, .76), exp(-l * l / 1.2));
  sc = mix(sc, vec3(1., .76, .52), clamp(bul * 1.2, 0., 1.));
  vec3 col = sc * I * exp(-tau * vec3(.72, 1., 1.4));
  float neb = exp(-(sq(l - .105) / .00012 + sq(b + .023) / .00006)) + .6 * exp(-(sq(l - .122) / .00005 + sq(b + .005) / .00004)) + .7 * exp(-(sq(l - .263) / .0001 + sq(b + .012) / .00005));
  col += vec3(1., .32, .42) * neb * .2 * (.6 + .8 * cl3) * exp(-tau * .5);
  col += vec3(1., .72, .38) * .09 * exp(-(sq(l + .141) / .002 + sq(b - .264) / .002));
  float edge = smoothstep(uM2.z, uM2.z * .8, abs(b));
  col *= edge;
  float dens = clamp((disc * lonF * (.3 + cl) + bul) * exp(-tau * .9), 0., 1.) * edge;
  o = vec4(sqrt(clamp(col * .2, 0., 1.)), dens);
}`,ae=`
uniform vec4 uC[48];
#define CAM uC[0]
#define FW uC[1]
#define RT uC[2]
#define UPV uC[3]
#define TIME uC[2].w
#define PA uC[3].w
#define TOWN uC[10]
#define DAWN uC[11]
#define AGL uC[12]
#define CNT uC[13]
#define TORCH uC[14]
#define MLIT uC[15]
#define RCOL uC[16]
#define GCOL uC[17]
#define ROCKP uC[18]
#define MWD uC[19]
#ifdef NO_K
#define COMET vec4(0.)
#else
#define COMET uC[26]
#endif
#define COMT uC[27]
#define TOWN2 uC[29]
#define FIN uC[30]
#define FB uC[31]
#define FP uC[32]
#define FT uC[33]
#define G0 uC[34]
#define BENCH uC[35]
#define W2 uC[36]
#define PD uC[37]
#define PD2 uC[38]
#define JNT uC[40]
#define RIP uC[44]
#ifdef NO_M
#define MOON vec4(0.)
#else
#define MOON uC[45]
#endif
#ifdef NO_Z
#define ZB vec4(0.)
#else
#define ZB uC[46]
#endif
#define ZU uC[47]
#ifdef NO_B
#define BH 0.
#else
#define BH uC[47].w
#endif
#define HAZE uC[42].z
#ifdef NO_C
#define CLD 0.
#else
#define CLD uC[42].w
#endif
#ifdef NO_F
#define FDW 0.
#else
#define FDW uC[39].w
#endif
`,ze=tt+qt+ae+`
out vec4 o;
float smax(float a, float b, float k) { float h = clamp(.5 + .5 * (a - b) / k, 0., 1.); return mix(b, a, h) + k * h * (1. - h); }
float smin(float a, float b, float k) { float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float gBase(vec2 q) {
  float h = .55 * sin(.11 * q.x + G0.x) * sin(.09 * q.y + G0.y) + .32 * sin(.23 * q.x - .17 * q.y + G0.z) + .16 * sin(.41 * q.y + .33 * q.x + G0.w) + .07 * sin(.87 * q.x - .61 * q.y + 2. * G0.x);
  vec2 r = q - FIN.xy;
  float u = dot(r, FIN.zw), w = dot(r, vec2(-FIN.w, FIN.z));
  h += 1.2 * exp(-w * w / 40.) * exp(-u * u / 500.);
  float R = length(q) + 1e-3, cs = q.x / R, sn = q.y / R;
  float s3 = 3. * sn - 4. * sn * sn * sn, c3 = 4. * cs * cs * cs - 3. * cs;
  float R0 = BENCH.x + 8. * (s3 * cos(BENCH.z) + c3 * sin(BENCH.z));
  return h - BENCH.y * smoothstep(R0, R0 + 16., R);
}
float rimR(vec2 q, vec4 P) { return P.z * (1. + .22 * (n2(q * 1.9 + P.xy * 7.) - .5) + .1 * (n2(q * 5.3 + 3.) - .5)); }
float hole(vec2 q, float h, vec4 P, float dep) {
  vec2 dq = q - P.xy;
  float L = length(dq);
  if (P.z > 0. && L < P.z * 1.7) {
    float qq = L / rimR(q, P);
    h = mix(h, P.w + .045, smoothstep(1.32, 1.03, qq));
    h -= dep * (1. - smoothstep(.66, 1., qq)) * (1. + .2 * (n2(q * 3.1) - .5));
  }
  return h;
}
float gH(vec2 q) {
  float h = gBase(q) + .24 * (n2(q * .31 + 40.) - .5) + .08 * (n2(q * 1.13 + 7.) - .5) + .025 * (n2(q * 3.7 + 1.) - .5);
  int nh = int(uC[41].z);
  for (int k = 0; k < nh; k++) {
    vec4 P = k == 0 ? uC[20] : k == 1 ? uC[21] : k == 2 ? uC[22] : k == 3 ? uC[23] : k == 4 ? uC[24] : uC[25];
    h = hole(q, h, P, k == 0 ? PD.x : k == 1 ? PD.y : k == 2 ? PD.z : k == 3 ? PD.w : k == 4 ? PD2.x : PD2.y);
  }
  return h;
}
float archD(vec3 p) {
  vec2 r = p.xz - FIN.xy;
  float u = dot(r, FIN.zw), w = dot(r, vec2(-FIN.w, FIN.z));
  float v = p.y - FB.x, uu = u - FB.w;
  float bound = max(max(abs(w) - 9., abs(uu) - 24.), v - FP.y - 3.);
  if (bound > 1.5) return bound;
  float legW = (uu < 0. ? FP.z : FP.w) * (1. + 1.1 * exp(-max(v, 0.) / 2.2) - .22 * exp(-sq((v - FB.z * .38) / 2.6))) + .35 * sin(v * .31 + FT.w);
  float Ao = FB.y + legW, sT = FP.y - FB.z;
  float hCo = min(FB.z * .6, FB.y * 1.05) + sT * (1.2 + .3 * sin(uu * .3 + FT.z) - .22 * clamp(uu / FB.y, -1., 1.));
  vec2 qo = vec2((uu - FP.x * v * .7) / Ao, max(v - (FP.y - hCo), 0.) / hCo);
  float outr = (length(qo) - 1.) * min(Ao, hCo) * .9;
  float T = FT.x * (1. + .6 * exp(-max(v, 0.) / 2.6)) * (.88 + .24 * sin(u * .21 + FT.z));
  float wc = FT.y * sin(u * .13 + FT.z) + .05 * v;
  float d = smax(abs(w - wc) - T, outr, 1.4);
  float hA = FB.y * (1. + .07 * sin(v * .55 + FT.w) - .1 * exp(-max(v, 0.) / 1.5) + (uu < FP.x * v ? .08 : -.1) * smoothstep(2., 9., v));
  float hC = min(FB.z * .6, FB.y * 1.05);
  vec2 hq = vec2((uu - FP.x * v) / hA, max(v - FB.z + hC, 0.) / hC);
  float hd = (length(hq) - 1.) * hA * .85;
  d = smax(d, -hd, 1.);
  if (W2.w > 0.) {
    vec2 q2 = vec2((uu - W2.x) / W2.z, (v - W2.y) / W2.w);
    d = smax(d, -(length(q2) - 1.) * W2.z * .8, .5);
  }
  d += .9 * (n3(p * .15 + FT.w) - .5) + .34 * (n3(p * .52 + 3.) - .5) + .1 * (n3(p * 1.7) - .5);
  d += .11 * smoothstep(.45, .55, n3(p * vec3(.33, .9, .33) + 11.)) + .045 * smoothstep(.42, .58, n3(p * vec3(.8, 2.2, .8) + 23.));
  float lay = v + .6 * (n3(p * .09 + 9.) - .5);
  float li = floor(lay / 1.7);
  uint lh = hu(uint(int(li) + 1077) * 2654435761u);
  float f = abs(fract(lay / 1.7) - .3 - .4 * hf(lh)) * 1.7;
  d += (.08 + .22 * hf(lh + 1u)) * smoothstep(.22 + .3 * hf(lh + 2u), 0., f) * step(.55, hf(lh + 3u)) * smoothstep(.3, .7, n3(p * .12 + 4.));
  return d;
}
float scene(vec3 p, out float ar) {
  float da = archD(p);
  float dg = (p.y - gH(p.xz)) * .6;
  ar = clamp(.5 + (dg - da) / 2.6, 0., 1.);
  return smin(da * .8, dg, 1.3);
}
float sc1(vec3 p) { float a; return scene(p, a); }
vec2 octE(vec3 n) { n /= abs(n.x) + abs(n.y) + abs(n.z); vec2 q = n.xz; if (n.y < 0.) q = (1. - abs(q.yx)) * vec2(q.x >= 0. ? 1. : -1., q.y >= 0. ? 1. : -1.); return q; }
void main() {
  vec2 sc = gl_FragCoord.xy / FW.w * 2. - 1.;
  vec3 rd = normalize(FW.xyz + sc.x * CAM.w * RT.xyz + sc.y * CAM.w * UPV.xyz);
  vec3 ro = CAM.xyz;
  if (rd.y > .06) {
    vec2 r0 = ro.xz - FIN.xy;
    vec3 lo = vec3(dot(r0, FIN.zw) - FB.w, ro.y - FB.x, dot(r0, vec2(-FIN.w, FIN.z)));
    vec3 ld = vec3(dot(rd.xz, FIN.zw), rd.y, dot(rd.xz, vec2(-FIN.w, FIN.z)));
    vec3 bmin = vec3(-26., -30., -11.), bmax = vec3(26., FP.y + 4., 11.);
    vec3 inv = 1. / (ld + vec3(ld.x >= 0. ? 1e-9 : -1e-9, 0., ld.z >= 0. ? 1e-9 : -1e-9));
    vec3 ta = (bmin - lo) * inv, tb = (bmax - lo) * inv;
    vec3 t1 = min(ta, tb), t2 = max(ta, tb);
    float tn = max(max(t1.x, t1.y), t1.z), tf = min(min(t2.x, t2.y), t2.z);
    if (tf < max(tn, 0.)) { o = vec4(0.); return; }
  }
  float t = .05, ar = 0., tw = 1e9, wi = -1., mn = 1e9;
  bool hit = false, isW = false;
  // the pools' water planes first, so the march stops at the water and the edge coverage counts only what lies before it
  if (rd.y < 0.) {
    int nh = int(uC[41].z);
    for (int k = 0; k < nh; k++) {
      vec4 P = k == 0 ? uC[20] : k == 1 ? uC[21] : k == 2 ? uC[22] : k == 3 ? uC[23] : k == 4 ? uC[24] : uC[25];
      float tt = (P.w - ro.y) / rd.y;
      vec2 qq = ro.xz + rd.xz * tt;
      if (P.z > 0. && tt > 0. && tt < tw && length(qq - P.xy) < .9 * rimR(qq, P)) { tw = tt; wi = float(k); }
    }
  }
  int NM = int(uC[42].x), ph = 0, NS = 0, j = 0;
  vec3 p = ro, rr = vec3(rd.x, -rd.y, rd.z), nacc = vec3(0.), n = vec3(0., 1., 0.), up = n;
  float e = .01, s = .05, occ = 0., od = 0., ao = 1., sca = 1., vis = 1.;
  for (int i = 0; i < NM; i++) {
    vec3 tv = vec3(j == 0 || j == 3 ? 1. : -1., j == 2 || j == 3 ? 1. : -1., j == 1 || j == 3 ? 1. : -1.);
    float hh = .08 + .45 * float(j - 4);
    vec3 q = ph == 0 ? ro + rd * t : isW ? p + rr * s : j < 4 ? p + tv * e : j < 9 ? p + n * hh : p + up * s;
    float a0;
    float d = scene(q, a0);
    if (ph == 0) {
      bool stop = false;
      float th = .0008 * t + .0006;
      if (d < th) { hit = true; ar = a0; stop = true; }
      else {
        // how near the ray passed the surface, in pixels: a miss that grazed rock is a partly covered pixel
        mn = min(mn, (d - th) / (PA * t));
        t += d < 0. ? d : max(d * .85, .0012 * t);
        stop = t > min(170., tw) || (q.y > 32. && rd.y > 0.) || i > NM - 130;
      }
      if (stop) {
        isW = tw < 1e8 && (!hit || tw < t);
        if (!isW && !hit) break;
        p = isW ? ro + rd * tw + vec3(0., .01, 0.) : ro + rd * t;
        e = .006 + .0012 * t;
        ph = 1; NS = isW ? 90 : MOON.w > 0. ? 72 : 23; j = 0;
      }
    } else {
      if (isW) {
        occ = max(occ, clamp(1. - d / (.0035 * s + .004), 0., 1.));
        if (d < .002 * s) { od = s; break; }
        s += max(d * .9, .02);
        if (s > 70. || q.y > 30.) break;
      } else if (j < 4) {
        nacc += tv * d;
        if (j == 3) { n = normalize(nacc); up = MOON.w > 0. ? MOON.xyz : normalize(n + vec3(0., 1.6, 0.)); }
      } else if (j < 9) {
        ao -= (hh - d) * sca * .7; sca *= .62;
        if (j == 8) s = .3;
      } else if (MOON.w > 0.) {
        // the moon's shadow: a march of its own toward the moon, far enough to find the span, a narrow penumbra
        vis = min(vis, 12. * d / s); s += max(d, .04 * s);
        if (q.y > FB.x + FP.y + 3. || s > 160. || vis < .01) break;
      } else {
        vis = min(vis, 3.5 * d / s); s += max(d, .5);
        if (s > 25.) break;
      }
      j++;
      if (j >= NS) break;
    }
  }
  float cov = clamp(.5 - 1.2 * mn, 0., .49);
  if (!isW && !hit) { o = vec4(cov, 0., 0., 0.); return; }
  if (isW) { o = vec4(occ, od, wi + cov, -tw); return; }
  // moonlit: the AO and the moon's shadow packed apart (5 bits each) so the shadow falls on the moon's light alone
  float az = MOON.w > 0. ? floor(clamp(ao, 0., 1.) * 31.) * 32. + floor(clamp(vis, 0., 1.) * 31. + .5) : floor(clamp(ao, 0., 1.) * (.35 + .65 * clamp(vis, 0., 1.)) * 100.);
  o = vec4(octE(n), az + min(ar, .999), t);
}`,Fe=tt+qt+ae+`
uniform sampler2D uG, uMW, uHz, uD, uS;
#ifdef NO_W
uniform sampler2D uS2;
#endif
out vec4 o;
vec3 skyBase(vec3 d, float el) {
  float e = max(d.y, 0.);
  float vr = 1. / sqrt(1. - .95 * (1. - e * e));
  vec3 c = mix(vec3(.0046, .0058, .0088), vec3(.0026, .0033, .0062), smoothstep(0., .9, e));
  vec2 pp = d.xz / (e + .09);
  float wv = .62 + .38 * sin(dot(pp, vec2(1.7, .6)) * 1.25 + AGL.z + 2.6 * n2(pp * .55 + 9.));
  float wv2 = .6 + .7 * n2(pp * .22 + 30.);
  float ext = .35 + .65 * exp(-.05 / (e + .015));
  c += vec3(.0012, .0052, .0019) * AGL.x * vr * wv * wv2 * ext * exp(-sq(max(el - .05, 0.) / .16)) * .55;
  c += vec3(.0042, .0011, .0006) * AGL.y * vr * (.5 + .6 * n2(pp * .3 + 3.)) * ext * smoothstep(0., .2, el) * exp(-el / .7);
  vec2 hd = normalize(d.xz + 1e-6);
  float t1 = max(dot(hd, TOWN.xy), 0.), t2 = max(dot(hd, TOWN2.xy), 0.), ee = max(el, 0.);
  c += vec3(.03, .015, .006) * (TOWN.z * pow(t1, 9.) + TOWN.w * pow(t2, 22.)) * exp(-ee / .065) + vec3(.008, .0045, .002) * (TOWN.z * pow(t1, 30.) + TOWN.w * pow(t2, 60.)) * exp(-ee / .02);
  c += vec3(.0018, .0012, .0007) * TOWN.z * t1 * t1 * exp(-ee / .4);
  // blue hour: a deepening blue dome; away from the sunset the Earth's shadow lies slate-blue on the horizon under a
  // dusky rose band; the sunset's last warmth low in the west (opposite the dawn)
  float wst = max(-dot(hd, DAWN.yz), 0.), est = .5 + .5 * dot(hd, DAWN.yz);
  c += BH * (vec3(.0032, .0072, .021) * (.45 + .55 * exp(-e / .5)) + vec3(.017, .0075, .0085) * exp(-sq((ee - .105) / .055)) * (.45 + .55 * est)
       + vec3(.0028, .0052, .0105) * exp(-ee / .04) * (.4 + .6 * est) + vec3(.022, .01, .0035) * wst * wst * exp(-ee / .07));
  // moonlight scattered in the air: a blue sky, brightest low and round the moon; the moon itself a burnt-out disc
  if (MOON.w > 0.) {
    float mx = max(1. - dot(d, MOON.xyz), 0.);
    c += MOON.w * (vec3(.0016, .0046, .0165) * (.45 + .55 * exp(-e / .35)) + vec3(.006, .009, .016) * exp(-sqrt(mx) / .12)
         + vec3(.25, .26, .27) * exp(-mx / 5e-5) + vec3(6., 5.8, 5.4) * smoothstep(1.7e-5, 1e-5, mx));
  }
  // zodiacal light: a narrow smooth wedge leaning up from the horizon beside the arch, tapering to nothing
  if (ZB.w > 0.) {
    float zx = dot(d, ZB.xyz), zy = dot(d, ZU.xyz), zp = dot(d, normalize(cross(ZB.xyz, ZU.xyz)));
    float za = atan(zy / max(zx, 1e-3));
    c += ZB.w * vec3(.0062, .0058, .005) * exp(-sq(zp / (.026 + .12 * max(1. - za / 1.15, 0.)))) * smoothstep(1.2, .2, za) * smoothstep(0., .25, zx) * smoothstep(0., .1, ee);
  }
  // smoke haze: the low sky brown
  c += HAZE * vec3(.0075, .0048, .0026) * exp(-ee / .2);
  float dw = max(dot(hd, DAWN.yz), 0.);
  c += DAWN.x * (vec3(.1, .036, .009) * pow(dw, 1.4) * exp(-ee / .05) + vec3(.02, .011, .005) * pow(dw, 2.5) * exp(-ee / .16) + vec3(.0006, .0011, .0026) * dw * dw * exp(-ee / .4));
  // first dawn: the whole dome gone dark blue-green, a band along a third of the horizon, orange under pale yellow-green
  // under teal, highest toward the sun and thinning away from it
  if (FDW > 0.) {
    float dW = .5 + .5 * dot(hd, DAWN.yz), dW2 = dW * dW;
    c += FDW * (vec3(.05, .017, .004) * dW2 * dW2 * exp(-ee / (.025 + .03 * dW)) + vec3(.013, .015, .006) * dW2 * dW * exp(-ee / (.05 + .07 * dW))
         + vec3(.0028, .0062, .0075) * dW2 * exp(-ee / .25) + vec3(.0012, .0022, .003) * (.6 + .4 * dW));
  }
  return c;
}
vec3 starL(vec3 q, float N, float prob, vec2 lim, uint salt, float pa, float dens) {
  vec3 a = abs(q);
  float m = max(a.x, max(a.y, a.z));
  bool bx = a.x >= m, by = !bx && a.y >= m;
  vec2 uv = (bx ? q.zy : by ? q.xz : q.xy) / m;
  uint face = (bx ? 0u : by ? 2u : 4u) + ((bx ? q.x : by ? q.y : q.z) > 0. ? 0u : 1u);
  vec2 g = (uv * .5 + .5) * N, ci = floor(g);
  uint h = hu(uint(ci.x) * 73856093u ^ uint(ci.y) * 19349663u ^ face * 83492791u ^ salt);
  float on = step(hf(h), prob * (1. + dens));
  uint h2 = hu(h ^ 0x9e3779b9u);
  vec4 r = vec4(uvec4(h2, h2 >> 8u, h2 >> 16u, h2 >> 24u) & 255u) / 255.;
  vec2 sp = ci + .27 + .46 * r.xy;
  float ang = length(g - sp) * (2. / N) / (1. + .5 * dot(uv, uv));
  // N(>b) ~ 1/b over the four layers without a break: each layer's faintest meets the next layer's brightest
  float b = max(1. / mix(lim.x, lim.y, r.z) - uC[43].x, 0.) * pow(min(1., .0013 / pa), .8);
  float sg = pa * (.62 + .12 * min(b, 3.));
  // tiles: a star stays a point (sigma about half a pixel) and its brightness, softly capped, carries the magnitude
  if (uC[42].y > 0.) { sg = pa * .55; b = b / (1. + .8 * b) * 1.5; }
  vec3 sc = r.w < .1 ? vec3(.74, .85, 1.18) : r.w < .55 ? vec3(1., .99, .97) : r.w < .86 ? vec3(1.08, .96, .84) : vec3(1.2, .86, .6);
  return on * sc * b * (exp(-ang * ang / (2. * sg * sg)) + .018 * exp(-ang / (sg * 3.5)));
}
vec3 celestial(vec3 d, float el, float pa) {
  float am = 1. / (max(d.y, 0.) + .028);
  vec3 ext = exp(-(.085 + .3 * HAZE) * am * vec3(.55, .8, 1.35 + .4 * HAZE)) * smoothstep(-.006, .01, d.y);
  vec3 g = vec3(dot(d, uC[7].xyz), dot(d, uC[8].xyz), dot(d, uC[9].xyz));
  float lat = asin(clamp(g.z, -1., 1.)), lon = at2(g.y, g.x);
  vec4 m = vec4(0.);
  if (abs(lat) < MWD.z) {
    m = textureLod(uMW, vec2(atan(lon / MWD.x) / (2. * MWD.y) + .5, lat / (2. * MWD.z) + .5), 0.);
    m.rgb = m.rgb * m.rgb * .26;
  }
  vec3 c = m.rgb * AGL.w * (.9 + .2 * hf(uint(gl_FragCoord.x) * 7u + uint(gl_FragCoord.y) * 7919u));
  vec3 q = vec3(dot(d, uC[4].xyz), dot(d, uC[5].xyz), dot(d, uC[6].xyz));
  float pf = pow(min(1., .0013 / pa), .9);
  vec3 s = vec3(0.);
  int nl = int(uC[41].x);
  for (int i = 0; i < nl; i++) {
    float fi = float(i);
    vec2 lim = i == 0 ? vec2(.4, 3.03) : i == 1 ? vec2(3.03, 25.) : i == 2 ? vec2(25., 128.7) : vec2(128.7, 603.);
    s += starL(q, 36. * pow(2.36, fi), (i == 0 ? .22 : .38) - .05 * fi, lim, uint(i) * 977u + 11u, pa, m.a * 1.2 * fi) * pow(pf, min(fi, 2.));
  }
  int ns = int(CNT.w);
  for (int i = 0; i < ns; i++) {
    {
      vec4 a = texelFetch(uD, ivec2(i, 5), 0), b = texelFetch(uD, ivec2(i, 6), 0);
      float x = 2. * max(1. - dot(q, a.xyz), 0.);
      float aw = max(a.w - uC[43].x * pow(min(1., .0013 / pa), .6), 0.), sg = pa * (.72 + .2 * log(1. + aw));
      if (uC[42].y > 0.) { sg = pa * .6; aw = aw / (1. + .8 * aw) * 1.5; }
      s += b.rgb * aw * (exp(-x / (2. * sg * sg)) + .03 * exp(-sqrt(x) / (sg * 4.)));
    }
  }
  c += s * CNT.x;
  if (COMET.w > 0.) {
    vec3 v = q - COMET.xyz;
    float al = dot(v, COMT.xyz);
    vec3 pv = v - COMT.xyz * al;
    float pr = length(pv - cross(COMET.xyz, COMT.xyz) * al * al * 1.4);
    float cw = .0025 + .09 * max(al, 0.);
    c += COMET.w * (vec3(.55, 1., .8) * (.5 * exp(-dot(v, v) / max(6e-6, 1.3 * pa * pa)) + .07 * exp(-length(v) / max(.005, 1.2 * pa))) + vec3(1., .96, .86) * .1 * step(0., al) * exp(-al / COMT.w) * exp(-pr * pr / (2. * cw * cw)) * (.7 + .3 * n2(vec2(al * 300., pr * 900.)))
           + vec3(.55, .75, 1.) * .05 * step(0., al) * exp(-al / (COMT.w * 1.6)) * exp(-sq(length(pv)) / (2. * sq(.0015 + .012 * al))));
  }
  c *= ext;
  // meteors (world frame: they burn in the air)
  int nm = int(CNT.z);
  for (int i = 0; i < nm; i++) {
    {
      vec4 a = texelFetch(uD, ivec2(i, 2), 0), b = texelFetch(uD, ivec2(i, 3), 0), e = texelFetch(uD, ivec2(i, 4), 0);
      float tau = (TIME - a.w) / b.w;
      if (tau > 0. && tau < 4.5) {
        float off = dot(d, cross(a.xyz, b.xyz));
        float x = dot(d, a.xyz), y = dot(d, b.xyz);
        float an = atan(y / max(x, 1e-3));
        float L = e.x, tc = min(tau, 1.);
        float hd = L * tc * (1.18 - .18 * tc);
        float life = tau < 1. ? pow(sin(3.1416 * tau), .6) * (1. + 1.6 * e.z * exp(-sq((tau - .74) / .07))) : 0.;
        float tl = .05 + .14 * L;
        float al = smoothstep(hd - tl, hd, an) * step(an, hd + pa) * step(0., an);
        float sg = pa * .75 + .0002 * (1. + e.z);
        vec3 mc = mix(vec3(1., .72, .5), vec3(.8, 1., .84), smoothstep(hd - tl, hd, an));
        c += mc * e.y * life * al * al * exp(-off * off / (2. * sg * sg)) * step(0., x);
        float since = tau - clamp(an / max(L, 1e-3), 0., 1.);
        float trw = .0012 + .006 * max(since, 0.) * (.6 + .8 * n2(vec2(an * 300., e.x * 50.)));
        off += .004 * max(since, 0.) * (n2(vec2(an * 40., 3.)) - .5);
        c += vec3(.3, 1., .5) * e.y * e.z * .05 * step(0., since) * exp(-since * 2.2) * (.4 + .6 * n2(vec2(an * 220., 9.))) * step(0., an) * step(an, hd) * exp(-off * off / (2. * trw * trw)) * (sg / trw) * step(0., x);
        vec3 hp = a.xyz * cos(hd) + b.xyz * sin(hd);
        float hx = max(1. - dot(d, hp), 0.);
        c += vec3(.55, 1., .72) * e.y * life * (.003 * exp(-hx / .015) + .0007 * (1. + e.z) * exp(-hx / .35));
      }
    }
  }
  return c;
}
vec3 sky(vec3 d, float pa) {
  float el = asin(clamp(d.y, -1., 1.)), az = at2(d.x, d.z);
  vec4 h = textureLod(uHz, vec2(az * .15915494 + .5, .5), 0.);
  float top = max(max(h.x, h.y), max(h.z, h.w));
  vec3 c = skyBase(d, el);
  vec3 c0 = c;
  if (el > top - pa) {
    vec3 cs = celestial(d, el, pa) * (1. - .6 * DAWN.x);
    if (CLD > 0.) {
      vec2 pp = d.xz / (max(d.y, 0.) + .12), wv = vec2(cos(uC[41].w), sin(uC[41].w)), wp = vec2(-wv.y, wv.x);
      vec2 qc = vec2(dot(pp, wv), dot(pp, wp)) * vec2(.35, 1.6) + vec2(TIME * .004, 0.);
      float y0 = dot(uC[39].xz / (max(uC[39].y, 0.) + .12), wp) * 1.6 + .32;
      float nn = n2(qc * 1.3 + 17.) * .65 + n2(qc * 3.7) * .35 + .2 * exp(-sq((qc.y - y0) / .22)) * (.4 + n2(qc * 2.3 + 8.));
      float cd = CLD * smoothstep(.47, .68, nn) * (.5 + .5 * n2(qc * 7. + 3.)) * smoothstep(.0, .12, d.y) * smoothstep(.97, .75, d.y);
      float op = 1. - exp(-3.2 * cd);
      vec2 hd = normalize(d.xz + 1e-6);
      vec3 gl = vec3(.012, .0058, .0024) * (TOWN.z * pow(max(dot(hd, TOWN.xy), 0.), 2.) + TOWN.w * pow(max(dot(hd, TOWN2.xy), 0.), 3.)) + BH * vec3(.012, .009, .011)
              + MOON.w * vec3(.006, .0065, .0072) + FDW * vec3(.008, .0045, .002) * pow(.5 + .5 * dot(hd, DAWN.yz), 3.);
      cs *= 1. - op;
      c = c * (1. - .4 * op) + op * gl;
    }
    c += cs;
  }
  if (el < top + pa) {
    vec3 hb = c0 * vec3(1.05, .9, 1.);
    c = mix(c, hb * .6 + vec3(.0005, .0006, .0009), clamp((h.w - el) / pa + .5, 0., 1.));
    c = mix(c, hb * (.2 + .16 * exp(-max(h.z - el, 0.) / .005)), clamp((h.z - el) / pa + .5, 0., 1.));
    c = mix(c, hb * (.13 + .15 * exp(-max(h.y - el, 0.) / .005)), clamp((h.y - el) / pa + .5, 0., 1.));
    c = mix(c, hb * .085 + vec3(.0003, .0003, .0004) * smoothstep(h.x - .02, h.x, el), clamp((h.x - el) / pa + .5, 0., 1.));
  }
  return c;
}
vec3 octD(vec2 p) { vec3 n = vec3(p.x, 1. - abs(p.x) - abs(p.y), p.y); if (n.y < 0.) n.xz = (1. - abs(n.zx)) * vec2(n.x >= 0. ? 1. : -1., n.z >= 0. ? 1. : -1.); return normalize(n); }
float torchE(vec3 P, out vec3 l, out float dl) {
  vec3 L = P - TORCH.xyz;
  dl = length(L); l = L / dl;
  float E = 0.;
  int n = int(CNT.y);
  for (int i = 0; i < n; i++) {
    {
      vec4 a = texelFetch(uD, ivec2(i, 0), 0), b = texelFetch(uD, ivec2(i, 1), 0);
      float fd = 1. - smoothstep(1.3, 4.2, TIME - a.w);
      vec3 ab = b.xyz - a.xyz;
      float h = clamp(dot(l - a.xyz, ab) / max(dot(ab, ab), 1e-9), 0., 1.);
      vec3 q = a.xyz + ab * h;
      float x = 2. * max(1. - dot(l, q) / length(q), 0.);
      E += b.w * fd * (.72 * exp(-x / .0072) + .28 * exp(-x / .045));
    }
  }
  return E;
}
vec3 rockLit(vec3 P, vec3 N, vec3 alb, float pk, float varn, float ao, float msh, float ar, float t, vec3 rd, float E, vec3 l, float dl) {
  float vert = 1. - abs(N.y);
  // light
  float gr = 1. - ar, cv = max(dot(N, -rd), 0.);
  vec3 amb = (vec3(.003, .0037, .0055) * (.3 + .7 * max(N.y, 0.)) * (1. + 1.5 * gr) + vec3(.0009, .0017, .0009) * AGL.x * (.5 + .5 * vert)) * ao;
  // pale stone turned up to the whole dome: a cool sheen on the swells, strongest where they turn away at grazing
  amb += vec3(.0026, .003, .0042) * gr * max(N.y, 0.) * (.15 + 1.6 * pow(1. - cv, 4.)) * ao;
  vec3 Lc = uC[7].xyz;
  float ce = smoothstep(-.08, .25, Lc.y) * AGL.w;
  Lc = normalize(Lc + vec3(0., .12, 0.));
  vec3 td = normalize(vec3(TOWN.x, .07, TOWN.y)), td2 = normalize(vec3(TOWN2.x, .05, TOWN2.y));
  vec3 lit = amb + vec3(.0034, .003, .0024) * ce * max(dot(N, Lc), 0.) * (.3 + .7 * ao) * (1. + 2.5 * ar * pow(1. - cv, 2.));
  lit += vec3(.019, .009, .0034) * (TOWN.z * pow(max(dot(N, td), 0.), 1.5) + TOWN.w * .6 * max(dot(N, td2), 0.)) * sqrt(ao);
  vec3 dwd = normalize(vec3(DAWN.y, .08, DAWN.z));
  lit += DAWN.x * (vec3(.012, .006, .003) * max(dot(N, dwd), 0.) + vec3(.001, .0016, .003) * (.5 + .5 * N.y) * ao);
  // the moon: a near-neutral key from over one shoulder, its own shadow with no floor, and the blue sky as the fill
  lit += MOON.w * (vec3(.034, .032, .029) * max(dot(N, MOON.xyz), 0.) * msh + vec3(.0007, .0012, .0027) * (.3 + .7 * max(N.y, 0.)) * ao);
  // blue hour: the afterglow behind you lights the land flat and soft, still in its own colour
  lit += BH * vec3(.016, .018, .024) * (.45 + .55 * max(N.y, 0.)) * ao;
  lit += MLIT.w * vec3(.55, 1., .7) * .0018 * max(dot(N, MLIT.xyz), 0.) * (.4 + .6 * ao);
  vec3 col = alb * lit;
  if (E > 0.) {
    float irr = TORCH.w * E * max(dot(N, -l), 0.) / max(dl * dl, 4.);
    vec3 tc = vec3(1., .64, .36);
    col += alb * tc * irr * (1. - .3 * pk);
    vec3 hh = normalize(-l - rd);
    col += tc * irr * varn * .1 * pow(max(dot(N, hh), 0.), 18.);
  }
  return mix(col, vec3(.0016, .0019, .0024), 1. - exp(-t / 140.));
}
vec4 gAt(ivec2 p) { return texelFetch(uG, p, 0); }
void main() {
  vec2 sc = gl_FragCoord.xy / FW.w * 2. - 1.;
  vec3 rd = normalize(FW.xyz + sc.x * CAM.w * RT.xyz + sc.y * CAM.w * UPV.xyz);
  ivec2 ip = ivec2(gl_FragCoord.xy);
  vec4 g = uC[41].y > 0. ? vec4(0.) : gAt(ip);
  float pa = PA;
  // a sky or water pixel that the rock partly covers (from the G pass) is shaded as its rock neighbour too and blended
  float cov = g.w < 0. ? fract(g.z) : g.w == 0. ? g.x : 0.;
  vec4 gr = g; ivec2 ir = ip;
  if (cov > .01) {
    for (int k = 0; k < 4; k++) {
      ivec2 q = ip + ivec2(k == 0 ? 1 : k == 1 ? -1 : 0, k == 2 ? 1 : k == 3 ? -1 : 0);
      vec4 gn = gAt(q);
      if (gn.w > 0. && gr.w <= 0.) { gr = gn; ir = q; }
    }
    if (gr.w <= 0.) cov = 0.;
  }
  vec3 colR = vec3(0.), colS = vec3(0.);
  vec2 sr = (vec2(ir) + .5) / FW.w * 2. - 1.;
  vec3 rr = normalize(FW.xyz + sr.x * CAM.w * RT.xyz + sr.y * CAM.w * UPV.xyz);
  // the torch at one point per pixel (one call site): the water's surface, or the rock (its own or its neighbour's)
  float E = 0., dl = 1.;
  vec3 l = vec3(0., -1., 0.);
  if (CNT.y > 0. && (g.w != 0. || gr.w > 0.)) E = torchE(g.w < 0. ? CAM.xyz + rd * -g.w - vec3(0., .25, 0.) : CAM.xyz + rr * gr.w, l, dl);
  if (gr.w > 0.) {
    vec3 P = CAM.xyz + rr * gr.w;
    float aoI = floor(gr.z), ao = aoI / 100., msh = 1.;
    if (MOON.w > 0.) { float a32 = floor(aoI / 32.); msh = (aoI - a32 * 32.) / 31.; ao = a32 / 31.; }
#ifdef NO_W
    vec4 sa = texelFetch(uS, ir, 0), sb = texelFetch(uS2, ir, 0);
#else
    vec4 sa = texelFetch(uS, ir, 0), sb = texelFetch(uS, ir + ivec2(int(FW.w), 0), 0);
#endif
    colR = rockLit(P, octD(sa.xy * 2. - 1.), sb.rgb * sb.rgb, sa.z, sa.w, ao, msh, gr.z - aoI, gr.w, rr, E, l, dl);
  }
  if (g.w <= 0.) {
    float tt = abs(g.w);
    vec3 P = CAM.xyz + rd * tt;
    vec3 dir = rd;
    if (g.w < 0.) {
      vec2 rp = (vec2(n2(P.xz * 9. + TIME * .15), n2(P.xz * 9. + 40. - TIME * .12)) - .5) * .0025;
      // a grain of grit dropped by a tap: one ring runs out and the mirrored stars break and come together again
      float ra = TIME - RIP.z;
      if (ra > 0. && ra < 4.) {
        vec2 rv = P.xz - RIP.xy;
        float rr = length(rv) + 1e-4, ph = rr - .32 * ra;
        rp += rv / rr * RIP.w * sin(ph * 42.) * exp(-ph * ph / .004) * exp(-ra * 1.1) / (1. + rr * 3.);
      }
      dir = normalize(vec3(rd.x, -rd.y, rd.z) + vec3(rp.x, 0., rp.y));
    }
    colS = sky(dir, pa);
    if (g.w < 0.) {
      float F = .02 + .98 * pow(1. - clamp(-rd.y, 0., 1.), 5.);
      vec3 rk = vec3(.0016, .0015, .0016) + vec3(.008, .004, .0016) * TOWN.z * .5 + MLIT.w * vec3(.55, 1., .7) * .006 + MOON.w * vec3(.002, .0024, .003) + BH * vec3(.004, .0045, .006);
      // the bed: silt in two tones, darker toward the middle, seen only where light reaches it
      int wk = int(g.z);
      vec4 Pq = wk == 0 ? uC[20] : wk == 1 ? uC[21] : wk == 2 ? uC[22] : wk == 3 ? uC[23] : wk == 4 ? uC[24] : uC[25];
      float rq = length(P.xz - Pq.xy) / max(Pq.z, .1);
      vec3 bed = mix(vec3(.075, .048, .028), vec3(.042, .03, .02), smoothstep(.3, .75, n2(P.xz * 2.3 + 5.) * .7 + n2(P.xz * 7.1) * .3)) * (.55 + .45 * smoothstep(.15, .85, rq));
      vec3 bot = bed * (vec3(.004, .005, .007) + MLIT.w * vec3(.55, 1., .7) * .02) + bed * 1.5 * vec3(1., .64, .36) * TORCH.w * E / max(dl * dl, 4.);
      colS = F * mix(colS, rk, g.x) + (1. - F) * bot;
    }
  }
  vec3 col = g.w > 0. ? colR : mix(colS, colR, cov);
  col *= DAWN.w;
  float L = dot(col, vec3(.2126, .7152, .0722));
  float Lt = L * (1. + L / 9.) / (1. + L);
  col *= Lt / max(L, 1e-7);
  col = mix(col, vec3(Lt), smoothstep(.6, 2., L) * .5);
  col *= 1. - .05 * dot(sc, sc);
  float gn = hf(uint(gl_FragCoord.x) * 1973u + uint(gl_FragCoord.y) * 9277u + 7u) - .5;
  col = max(col * (1. + gn * .05) + gn * .0007, 0.);
  col = mix(12.92 * col, 1.055 * pow(col, vec3(1. / 2.4)) - .055, step(.0031308, col));
  col += (hf(uint(gl_FragCoord.x) * 7717u + uint(gl_FragCoord.y) * 3343u + 1u) - .5) / 255.;
  o = vec4(clamp(col, 0., 1.), 1.);
}`,ge=tt+qt+ae+`
uniform sampler2D uG;
#ifdef NO_W
layout(location = 0) out vec4 o;
layout(location = 1) out vec4 o2;
#else
out vec4 o;
#endif
vec3 octD(vec2 p) { vec3 n = vec3(p.x, 1. - abs(p.x) - abs(p.y), p.y); if (n.y < 0.) n.xz = (1. - abs(n.zx)) * vec2(n.x >= 0. ? 1. : -1., n.z >= 0. ? 1. : -1.); return normalize(n); }
vec2 octE(vec3 n) { n /= abs(n.x) + abs(n.y) + abs(n.z); vec2 q = n.xz; if (n.y < 0.) q = (1. - abs(q.yx)) * vec2(q.x >= 0. ? 1. : -1., q.y >= 0. ? 1. : -1.); return q; }
vec2 potholeRing(vec3 P, vec4 Q) { if (Q.z <= 0.) return vec2(0.); float L = length(P.xz - Q.xy) / Q.z, h = P.y - Q.w; return vec2(smoothstep(1.3, 1.02, L) * smoothstep(.07, .015, h), smoothstep(1.55, 1.2, L) * smoothstep(.025, .05, h) * smoothstep(.17, .1, h)); }
void rockSurf(vec3 P, vec3 N0, vec3 rd, float ao, float ar, float t, float pa, out vec3 alb, out vec3 N, out float pk, out float varn) {
  // the pixel's footprint on the surface: wider by the slant, so patterns on rock seen at a glance let go in time
  float fp = t * pa * 1.2 / max(abs(dot(N0, rd)), .12);
  float SH = mix(ROCKP.y, ROCKP.x, ar);
  float yy = P.y + .8 * (n3(P * .05 + 3.1) - .5) + .22 * (n3(P * .21 + 7.) - .5);
  float ys = yy / SH, ks = floor(ys), fy = fract(ys);
  uint kh = hu(uint(int(ks) + 1000) * 747796405u ^ uint(ROCKP.w));
  float dipA = hf(kh) * 6.2832, dip = .18 + .5 * hf(kh + 1u), sp = .011 + .026 * hf(kh + 2u);
  vec2 dd = vec2(cos(dipA), sin(dipA));
  float tr = .5 * dip * sin(dot(P.xz, vec2(-dd.y, dd.x)) * (.35 + .3 * hf(kh + 5u)) + hf(kh + 6u) * 6.28);
  float s = fy * SH + dip * dot(P.xz, dd) + tr + .05 * (n3(P * .7) - .5);
  float ph = s / sp, lf = fract(ph);
  uint lh = hu(uint(int(floor(ph)) + 65536) ^ kh);
  float aaL = clamp(2. - 4. * fp / sp, 0., 1.);
  float lp = .5 + .5 * sin(6.2832 * ph + 1.3 * sin(ph * .37));
  float li = .7 + .6 * hf(lh);
  float lam = mix(.55, mix(.55, lp, .55) * li, aaL);
  float bsd = min(fy, 1. - fy) * SH;
  float bnd = smoothstep(.035 + fp, 0., bsd) * (.25 + .75 * hf(kh + 10u)) * smoothstep(.25, .65, n3(P * .6 + 2.));
  vec3 base = mix(GCOL.rgb, RCOL.rgb, ar);
  float sv = hf(kh + 3u);
  base *= vec3(1. + .08 * (sv - .5), 1. + .13 * (sv - .5), 1. + .16 * (sv - .5)) * (.92 + .16 * hf(kh + 4u));
  if (hf(kh + 7u) < .15) base = mix(base, vec3(.56, .43, .31), .25);
  if (ROCKP.z > 0. && P.y > ROCKP.z + .5 * (n3(P * .2) - .5)) base = mix(base, vec3(.6, .54, .45), .75);
  float mot = n3(P * 1.7 + 11.);
  float mot2 = n3(P * .4 + 2.);
  base *= (.86 + .28 * mot) * (.85 + .3 * mot2);
  alb = base * (.86 + .28 * lam) * (1. - .14 * bnd);
  alb *= 1. + .14 * (n3(P * 55.) - .5) * clamp(1.5 - fp * 90., 0., 1.);
  // face-plane coordinates
  float vert = 1. - abs(N0.y);
  vec2 hv = normalize(vec2(-N0.z, N0.x) + 1e-5);
  float hc = dot(P.xz, hv);
  // pocks (honeycomb weathering) in soft sets on steep faces
  vec3 nb = vec3(0.);
  float pockM = step(hf(kh + 8u), .55) * smoothstep(.3, .7, vert);
  pk = 0.;
  if (pockM > 0.) {
    vec2 wp = vec2(hc, P.y) * (5. + 4. * hf(kh + 9u));
    vec2 wi = floor(wp), wf = fract(wp), dv = vec2(0.);
    float d1 = 9.;
    int n9 = int(uC[41].x) + 5;
    for (int k = 0; k < n9; k++) {
      int i = k % 3 - 1, j = k / 3 - 1;
      vec2 gg = vec2(float(i), float(j));
      uint h = hu(uint(int(wi.x) + i + 40000) * 1973u ^ uint(int(wi.y) + j + 40000) * 9277u ^ kh);
      vec2 r = gg + vec2(hf(h), hf(h + 7u)) * .8 + .1 - wf;
      float q = dot(r, r);
      if (q < d1) { d1 = q; dv = r; }
    }
    pk = smoothstep(.3, .04, d1) * pockM * smoothstep(.3, .6, n3(P * .8 + 5.)) * clamp(1.6 - fp * 25., 0., 1.);
    nb += (vec3(hv.x, 0., hv.y) * dv.x + vec3(0., 1., 0.) * dv.y) * pk * 1.4;
    alb *= 1. - .45 * pk;
  }
  // desert varnish streaks hanging down steep faces
  float st = n2(vec2(hc * 2.1, P.y * .13) + 11.) * .6 + n2(vec2(hc * 8.5, P.y * .45) + 4.) * .4;
  varn = smoothstep(.5, .7, st + .2 * (n3(P * .3) - .5)) * smoothstep(.35, .85, vert) * RCOL.w * (.5 + .5 * smoothstep(.2, .8, ar));
  alb = mix(alb, vec3(.07, .045, .035) * (.8 + .4 * n2(vec2(hc * 30., P.y * 3.)) * clamp(1.5 - fp * 50., 0., 1.)), varn * .82);
  // joints and sand on the slickrock
  float gr = 1. - ar;
  float j1 = abs(fract(dot(P.xz, JNT.xy) / JNT.z + .3 * n2(P.xz * .21)) - .5) * JNT.z;
  float j2 = abs(fract(dot(P.xz, vec2(-JNT.y, JNT.x)) / (JNT.z * 1.6) + .3 * n2(P.xz * .17 + 5.)) - .5) * JNT.z * 1.6;
  float cr = smoothstep(.025 + fp, .003, min(j1, j2) - .012 * n2(P.xz * 6.)) * gr * smoothstep(.25, .6, n2(P.xz * .7 + 13.));
  alb *= 1. - .45 * cr;
  float sand = smoothstep(.62, .76, n2(P.xz * .45 + 3.)) * smoothstep(.75, .95, N0.y) * gr * smoothstep(.4, .9, ao);
  alb = mix(alb, vec3(.55, .33, .19) * (.9 + .2 * (n2(P.xz * 40.) - .5) * clamp(1.5 - fp * 60., 0., 1.) + .1), sand * .85);
  // lichen and black crust on up-facing rock
  float up = smoothstep(.2, .7, N0.y) * (1. - sand);
  // the fine octaves give way to their mean as they near a pixel, the edge widens with the footprint, and the whole
  // pattern is gone by the time a patch is two pixels; the black crust is a dark grey-brown stain, not a hole
  float f37 = clamp(1.5 - fp * 37. * 1.5, 0., 1.), f91 = clamp(1.5 - fp * 91. * 1.5, 0., 1.);
  float lc = n2(P.xz * 12.3 + 5.) * .55 + mix(.15, n2(P.xz * 37. + 1.) * .3, f37) + mix(.075, n2(P.xz * 91.) * .15, f91);
  float lw = .03 + fp * 3.;
  float lm = smoothstep(.67 - lw, .67 + lw, lc) * smoothstep(.38, .62, n2(P.xz * .9 + 21.)) * up * GCOL.w * clamp(2. - fp * 40., 0., 1.);
  float sel = n2(P.xz * 1.3 + 77.);
  vec3 lcol = sel < .45 ? vec3(.11, .095, .08) : sel < .62 ? vec3(.32, .34, .27) : sel < .72 ? vec3(.46, .45, .13) : vec3(.6, .27, .06);
  alb = mix(alb, lcol * (.75 + .5 * mix(.5, n2(P.xz * 90.), f91)), lm * (sel < .45 ? .7 : .9));
  // pothole rims: wet dark band and organic crust
  vec2 wet = vec2(0.);
  int nh = int(uC[41].z);
  for (int k = 0; k < nh; k++) wet = max(wet, potholeRing(P, k == 0 ? uC[20] : k == 1 ? uC[21] : k == 2 ? uC[22] : k == 3 ? uC[23] : k == 4 ? uC[24] : uC[25]));
  alb = mix(alb * (1. - .6 * wet.x), vec3(.62, .58, .52), wet.y * .45 * (1. - wet.x));
  // relief: laminae, bounding notch, pocks, crack lips, medium noise
  vec3 gs = vec3(dip * dd.x, 1., dip * dd.y) / sp;
  nb += gs * cos(6.2832 * ph) * .0016 * aaL * li;
  nb += vec3(0., 1., 0.) * (fy < .5 ? -1. : 1.) * bnd * .5;
  int no = int(uC[41].x) - 1;
  for (int k = 0; k < no; k++) {
    float fk = float(k), sc = .9 * pow(2.9, fk), ee = .05;
    vec3 Q = P * sc + fk * 7.7;
    float g0 = n3(Q), gx = n3(Q + vec3(ee, 0., 0.)), gy = n3(Q + vec3(0., ee, 0.)), gz = n3(Q + vec3(0., 0., ee));
    nb += vec3(gx - g0, gy - g0, gz - g0) / ee * (k == 0 ? .2 : k == 1 ? .13 : .08) * clamp(1.5 - fp * sc * 2.5, 0., 1.);
  }
  N = normalize(N0 - (nb - N0 * dot(nb, N0)));
}
void main() {
#ifdef NO_W
  ivec2 ip = ivec2(gl_FragCoord.xy);
#else
  int W = int(FW.w), X = int(gl_FragCoord.x);
  bool R = X >= W;
  ivec2 ip = ivec2(R ? X - W : X, int(gl_FragCoord.y));
#endif
  vec4 g = texelFetch(uG, ip, 0);
#ifdef NO_W
  if (g.w <= 0.) { o = vec4(.5, .5, 0., 0.); o2 = o; return; }
#else
  if (g.w <= 0.) { o = vec4(.5, .5, 0., 0.); return; }
#endif
  vec2 sc = (vec2(ip) + .5) / FW.w * 2. - 1.;
  vec3 rd = normalize(FW.xyz + sc.x * CAM.w * RT.xyz + sc.y * CAM.w * UPV.xyz);
  float aoI = floor(g.z), ao = MOON.w > 0. ? floor(aoI / 32.) / 31. : aoI / 100.;
  vec3 alb, N; float pk, varn;
  rockSurf(CAM.xyz + rd * g.w, octD(g.xy), rd, ao, g.z - aoI, g.w, PA, alb, N, pk, varn);
#ifdef NO_W
  o = vec4(octE(N) * .5 + .5, pk, clamp(varn, 0., 1.)); o2 = vec4(sqrt(clamp(alb, 0., 1.)), 1.);
#else
  o = R ? vec4(sqrt(clamp(alb, 0., 1.)), 1.) : vec4(octE(N) * .5 + .5, pk, clamp(varn, 0., 1.));
#endif
}`,Re=[[11.062,61.75,1.79,1.07],[11.031,56.38,2.37,-.02],[11.897,53.69,2.44,.04],[12.257,57.03,3.31,.08],[12.9,55.96,1.77,-.02],[13.399,54.93,2.23,.02],[13.42,54.99,4,.16],[13.792,49.31,1.86,-.19],[2.53,89.26,1.98,.6],[14.261,19.18,-.05,1.23],[18.616,38.78,.03,0],[20.69,45.28,1.25,.09],[19.846,8.87,.77,.22],[16.49,-26.43,1.06,1.83],[13.42,-11.16,.97,-.23],[17.56,-37.1,1.62,-.22],[17.622,-43,1.86,.4],[18.403,-34.38,1.85,-.03],[18.921,-26.3,2.05,-.13],[18.35,-29.83,2.7,1.38],[18.466,-25.42,2.81,1.02],[19.043,-29.88,2.6,.08],[16.006,-22.62,2.29,-.12],[16.091,-19.81,2.62,-.07],[17.512,-37.3,2.7,-.22],[17.582,12.56,2.08,.15],[16.836,-34.29,2.29,1.15],[18.229,-21.06,3.86,1.1],[17.708,-39.03,2.41,.51],[17.793,-40.13,3.03,-.18],[16.354,-25.59,2.89,.13],[16.598,-28.22,2.82,-.2],[15.578,26.71,2.23,-.02],[17.244,14.39,3.1,1.16],[19.512,27.96,3.05,1.13],[20.37,40.26,2.23,.67],[19.749,45.13,2.86,-.03],[20.77,33.97,2.48,1.03],[18.982,32.69,3.24,-.05],[16.619,-10.57,2.56,.02]],Ae=s=>{const e=Math.max(-.3,Math.min(1.9,s));return[Math.min(1.25,.82+.3*(e+.3)),.86+.14*Math.cos((e-.45)*1.6),Math.max(.48,1.22-.4*(e+.3))]},ne=[[-.0548755604,-.8734370902,-.4838350155],[.4941094279,-.44482963,.7469822445],[-.867666149,-.1980763734,.4559837762]],vt=38.6*Math.PI/180,Ce=17.761,se=-29.008*Math.PI/180,Ne=new Float32Array(1),wo=new Uint32Array(Ne.buffer),ke=s=>{Ne[0]=s;const e=wo[0],d=e>>>16&32768,C=(e>>>23&255)-112,et=e&8388607;return C<=0?d:C>=31?d|31743:d|C<<10|et>>>13},wt=(s,e,d)=>{const C=Math.max(0,Math.min(1,(d-s)/(e-s)));return C*C*(3-2*C)},P=(s,e,d)=>Math.max(e,Math.min(d,s));function Mo(s,e){if(s.__c539)return s.__c539.want(e),s.__c539;const d=!!s.getExtension("EXT_color_buffer_float"),C=d||!!s.getExtension("EXT_color_buffer_half_float");s.getExtension("KHR_parallel_shader_compile");const et=(x,z)=>{const v=s.createShader(x);return s.shaderSource(v,z),s.compileShader(v),v},ot=et(s.VERTEX_SHADER,vo),V=!C,at=V?{mw:Ee,g:ze.replace("out vec4 o;","out uvec4 o;").replace(/o = vec4\(([^;]*)\);/g,"o = floatBitsToUint(vec4($1));"),s:ge.replace("uniform sampler2D uG;","uniform highp usampler2D uG;").replace("texelFetch(uG, ip, 0)","uintBitsToFloat(texelFetch(uG, ip, 0))"),comp:Fe.replace("uniform sampler2D uG, uMW",`uniform highp usampler2D uG;
uniform sampler2D uMW`).replace("texelFetch(uG, p, 0)","uintBitsToFloat(texelFetch(uG, p, 0))")}:{mw:Ee,g:ze,s:ge,comp:Fe},u=at.comp;delete at.comp;const Z={},f={};for(const x in at){const z=s.createProgram(),v=et(s.FRAGMENT_SHADER,at[x]);s.attachShader(z,ot),s.attachShader(z,v),s.linkProgram(z),Z[x]={p:z,f:v}}const D=x=>{if(f[x])return!1;const z=s.createProgram(),v=et(s.FRAGMENT_SHADER,u.replace(tt,tt+x.split("").map(O=>"#define NO_"+O+`
`).join("")));if(s.attachShader(z,ot),s.attachShader(z,v),s.linkProgram(z),f[x]={p:z,f:v,ready:!1},x.includes("W")&&!f.s){const O=s.createProgram(),st=et(s.FRAGMENT_SHADER,at.s.replace(tt,tt+`#define NO_W
`));s.attachShader(O,ot),s.attachShader(O,st),s.linkProgram(O),f.s={p:O,f:st,ready:!1}}return!0};D(e),s.flush();let I=625341585;const gt=()=>(I=Math.imul(I^I>>>15,739982445),I=Math.imul(I^I>>>12,695872825),I^=I>>>15,I&255),Rt=new Uint8Array(64*64*64);for(let x=0;x<Rt.length;x++)Rt[x]=gt();const At=new Uint8Array(256*256*4);for(let x=0;x<At.length;x++)At[x]=gt();s.pixelStorei(s.UNPACK_ALIGNMENT,1);const Mt=(x,z,v,O,st,S,R,ct)=>{const Ct=s.createTexture();return s.bindTexture(s.TEXTURE_2D,Ct),s.texImage2D(s.TEXTURE_2D,0,v,x,z,0,O,st,ct||null),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,S),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,S),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,R),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,R),Ct},It=Mt(256,256,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.LINEAR,s.REPEAT,At),Q=s.createTexture();s.bindTexture(s.TEXTURE_3D,Q),s.texImage3D(s.TEXTURE_3D,0,s.R8,64,64,64,0,s.RED,s.UNSIGNED_BYTE,Rt),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_3D,s.TEXTURE_MAG_FILTER,s.LINEAR);for(const x of[s.TEXTURE_WRAP_S,s.TEXTURE_WRAP_T,s.TEXTURE_WRAP_R])s.texParameteri(s.TEXTURE_3D,x,s.REPEAT);const nt={uN:0,uN3:1,uG:2,uMW:3,uHz:4,uD:5,uS:6,uS2:7};let Wt=!1;const yt=(x,z=Z)=>{const v=z[x].p;if(!s.getProgramParameter(v,s.LINK_STATUS))throw new Error("539 "+x+": "+s.getShaderInfoLog(z[x].f)+" "+s.getShaderInfoLog(ot)+" "+s.getProgramInfoLog(v));const O={p:v,ready:!0};z[x]=O;const st=s.getProgramParameter(v,s.ACTIVE_UNIFORMS);for(let S=0;S<st;S++){const R=s.getActiveUniform(v,S).name.replace("[0]","");O[R]=s.getUniformLocation(v,R)}s.useProgram(v);for(const S in nt)O[S]&&s.uniform1i(O[S],nt[S])},lt=x=>{if(!Wt){Wt=!0;for(const z in Z)yt(z)}return f[x].ready||yt(x,f),x.includes("W")&&!f.s.ready&&yt("s",f),f[x]},X=s.createVertexArray(),bt={P:Z,V:f,ready:lt,want:x=>{D(x)&&s.flush()},tN:It,tN3:Q,vao:X,tex2:Mt,fl:d,hf:C,ui:V,UNIT:nt,pool:{},tick:0};return s.__c539=bt,bt}Te.add({num:539,name:"Desert Arch",fam:"Vistas",recipe:"A sandstone arch framing the middle of the Milky Way over far mesas, with little pools in the rock reflecting the stars. The arch, where you stand, the moon and the hour change every mint. Drag to sweep a warm torch beam over the rock, tap a pool to break up its stars or tap the rock to blink the torch, or hold to run the night forward so the Milky Way swings up toward dawn.",interactive:"Drag to paint the rock with a warm torch beam (it reveals the cross-bedded sandstone, varnish and lichen, then fades); tap a pool to drop a grain of grit in it and break the mirrored stars, or tap the rock for one blink of the torch; hold to run the night slowly forward so the Milky Way wheels up through the arch toward the first dawn.",music:!0,gl:!0,fps:30,seed:0,make(s){const e=s.gl,d=s.size,C=s.hash.slice(2).padEnd(64,"0");let et=parseInt(C.slice(0,8),16)>>>0,ot=parseInt(C.slice(8,16),16)>>>0,V=parseInt(C.slice(16,24),16)>>>0,at=parseInt(C.slice(24,32),16)>>>0;const u=()=>{const t=(et+ot|0)+at|0;return at=at+1|0,et=ot^ot>>>9,ot=V+(V<<3)|0,V=V<<21|V>>>11,V=V+t|0,(t>>>0)/4294967296};for(let t=0;t<16;t++)u();let Z=(parseInt(C.slice(32,40),16)^1540483477)>>>0;const f=()=>{Z=Z+1831565813|0;let t=Math.imul(Z^Z>>>15,1|Z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},D=!!s.home,I=(t,o,a,n)=>{let r=0;for(const c of o)r+=c[1];let i=u()*r,l=o[o.length-1];for(const c of o)if(i-=c[1],i<0){l=c;break}return D&&(l=o[a]),n||s.trait(t,l[0]),l[2]},gt=I("Arch",[["Ribbon span",5,0],["Tall window",3,1],["Broad span",3,2],["Double window",1,3]],0),Rt=I("Core",[["Rising",3,9],["Climbing",5,15],["High in the south",2,21]],1),At=I("Airglow",[["Green bands",5,0],["Faint",3,1],["Red and green",1,2]],0),Mt=I("Town glow",[["Faint town",5,0],["Two towns",2,1],["Dark sky",1,2]],0),It=I("Water",[["Potholes",5,0],["Scattered",3,1],["After rain",1,2]],0);let Q=I("Visitor",[["Shooting stars",6,0],["Satellite train",3,1],["Comet",1,2],["Fireball",1,3]],0,!0),nt=(parseInt(C.slice(48,56),16)^2654435769)>>>0;const Wt=()=>{nt=nt+1831565813|0;let t=Math.imul(nt^nt>>>15,1|nt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};{const t=Wt();(Q===1||t>=[0,0,.23,.21][Q])&&(Q=0)}s.trait("Visitor",["None","","Comet","Fireball"][Q]);const yt=I("Sandstone",[["Entrada red",5,0],["Navajo buff",3,1],["White cap",1,2]],0);let lt=(parseInt(C.slice(40,48),16)^1013904242)>>>0;const X=()=>{lt=lt+1831565813|0;let t=Math.imul(lt^lt>>>15,1|lt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},bt=[["Before the arch",45],["From the flank",30],["Close beneath",17],["Under the span",8]];let x=0;{let t=X()*100;for(let o=0;o<bt.length;o++)if(t-=bt[o][1],t<0){x=o;break}}D&&(x=0),s.trait("Standpoint",bt[x][0]);let z=(parseInt(C.slice(56,64),16)^2246822507)>>>0;const v=()=>{z=z+1831565813|0;let t=Math.imul(z^z>>>15,1|z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},O=t=>{let o=v()*100;for(let a=0;a<t.length;a++)if(o-=t[a][1],o<0)return a;return 0},st=[["Moonless",60],["Moonlit",16],["Blue hour",12],["First dawn",10],["Zodiacal light",2]],S=[["Clear",78],["High cloud",13],["Smoke haze",9]];let R=O(st),ct=O(S);D&&(R=ct=0),s.trait("Light",st[R][0]),s.trait("Weather",S[ct][0]);const Ct=e.getParameter(e.MAX_TEXTURE_SIZE)|0,ft=d*2>Ct,Pe=(R!==1?"M":"")+(R!==4?"Z":"")+(R!==2?"B":"")+(ct!==1?"C":"")+(R!==3?"F":"")+(Q!==2?"K":"")+(ft?"W":""),A=Mo(e,Pe),Tt=A.P,De=[{A:4.8,B:12,top:14.8,lL:2.7,lR:2.3,T:1.4,skew:.04,fz:16.5,fx:-.6,yaw:.24},{A:3.4,B:13,top:15.8,lL:3,lR:2.8,T:1.6,skew:.03,fz:16,fx:-.3,yaw:.16},{A:6.4,B:10,top:12.6,lL:2.6,lR:2.2,T:1.3,skew:.06,fz:18,fx:-.4,yaw:.28},{A:4.6,B:11.8,top:14.6,lL:2.7,lR:5.4,T:1.4,skew:.04,fz:16.5,fx:-1.4,yaw:.22}][gt],B=t=>(u()-.5)*t,y={...De};y.A*=1+B(.12),y.B*=1+B(.1),y.top=y.B+(y.top-y.B)*(1+B(.25)),y.fz+=B(1.4),y.fx+=B(1.2),y.yaw+=B(.14),y.skew+=B(.05),D&&Object.assign(y,De);const b=new Float32Array(48*4),m=(t,o,a,n,r)=>{b[t*4]=o,b[t*4+1]=a,b[t*4+2]=n,b[t*4+3]=r},J=[u()*w,u()*w,u()*w,u()*w];D&&(J[0]=1.3,J[1]=4.1,J[2]=2.2,J[3]=5);const N=[y.fx,y.fz,Math.cos(y.yaw),Math.sin(y.yaw)],ht=[52+u()*10,26,u()*w],Ot=(t,o)=>{let a=.55*Math.sin(.11*t+J[0])*Math.sin(.09*o+J[1])+.32*Math.sin(.23*t-.17*o+J[2])+.16*Math.sin(.41*o+.33*t+J[3])+.07*Math.sin(.87*t-.61*o+2*J[0]);const n=t-N[0],r=o-N[1],i=n*N[2]+r*N[3],l=-n*N[3]+r*N[2];a+=1.2*Math.exp(-l*l/40)*Math.exp(-i*i/500);const c=Math.hypot(t,o)+.001,h=t/c,p=o/c,T=3*p-4*p*p*p,k=4*h*h*h-3*h,q=ht[0]+8*(T*Math.cos(ht[2])+k*Math.sin(ht[2]));return a-ht[1]*wt(q,q+16,c)},_e=Ot(y.fx,y.fz)-.4,M={x:0,z:0,eye:1.6,yaw:0,pitch:.2,core:0,r:3,sg:1};if(x){const t=X()<.5?-1:1,o=X(),a=X(),n=X();M.sg=t;const r=(h,p)=>[N[0]+h*N[2]-p*N[3],N[1]+h*N[3]+p*N[2]],i=(h,p)=>Math.atan2(p[0]-h[0],p[1]-h[1]),l=-y.yaw;let c;if(x===1){const h=(38+14*o)*Math.PI/180,p=15+14*a;c=r(-t*p*Math.sin(h),-p*Math.cos(h));const T=i(c,r(0,0));Object.assign(M,{yaw:T+t*(.06+.24*n)*(p/22),pitch:.22,core:T+t*.02})}else x===2?(c=r(-t*(1+.8*o),-(6+1.5*a)),Object.assign(M,{yaw:l+t*(.3+.1*n),pitch:.55,core:l-t*.05,r:2})):(c=r(-t*(.6+.8*o),-(2.8+.8*a)),Object.assign(M,{eye:.7,yaw:l+t*(.2+.12*n),pitch:.92,core:l-t*.1,r:1.2}));M.x=c[0],M.z=c[1]}m(30,...N),m(31,_e,y.A,y.B,0),m(32,y.skew,y.top,y.lL,y.lR),m(33,y.T,.5+u()*.5,u()*w,u()*50),m(34,...J),m(35,ht[0],ht[1],ht[2],0),gt===3&&m(36,y.A+y.lR*.42,4.4+u(),.8+u()*.25,1.6+u()*.5);const L=[],yo=(t,o)=>{const a=t-N[0],n=o-N[1];return[a*N[2]+n*N[3],-a*N[3]+n*N[2]]},Nt=(t,o,a)=>{const[n,r]=yo(t,o);if(Math.abs(r)<y.T*2.2+a+.6&&Math.abs(n)>y.A-a-.4||Math.hypot(t-M.x,o-M.z)<a+1)return!1;for(const i of L)if(Math.hypot(i[0]-t,i[1]-o)<i[2]+a+.7)return!1;return L.push([t,o,a,Ot(t,o)-.02,.3+u()*.5]),!0};if(D||It===0){const t=D?[[.6,5,1],[3.4,8.2,1.4],[-1.3,2.8,.4],[y.fx+.4,y.fz+.2,1.4],[-3.4,9.6,.8]]:null;if(t)for(const o of t)Nt(...o);else for(let o=0;o<40&&L.length<5;o++)Nt(-4.5+u()*9,2.6+u()*15,.4+u()*1.2)}else if(It===1)for(let t=0;t<60&&L.length<6;t++)Nt(-5+u()*10,2.4+u()*15,.25+u()*.55);else{Nt(.4+B(1),5.6+B(1),2.6+u()*.6);for(let t=0;t<40&&L.length<3;t++)Nt(-4.5+u()*9,3+u()*14,.6+u()*1.4)}{const t=Ot(M.x,M.z)+M.eye;for(let o=L.length-1;o>=0;o--){const a=L[o],n=(a[0]-M.x)**2+(a[1]-M.z)**2;784*2*a[2]*Math.max(t-a[3],0)/Math.max(n,1)<6&&L.splice(o,1)}}for(let t=0;t<6;t++){const o=L[t];m(20+t,o?o[0]:0,o?o[1]:0,o?o[2]:0,o?o[3]:-99)}m(37,...[0,1,2,3].map(t=>L[t]?L[t][4]:0)),m(38,L[4]?L[4][4]:0,L[5]?L[5][4]:0,0,0);const qe=u()*w;m(40,Math.cos(qe),Math.sin(qe),4+u()*4,0),m(41,4,_t===1?1:0,L.length,0),m(42,370,d<600?1:0,0,0),m(44,0,0,-99,0);const Ie=[[[.44,.18,.085],[.5,.29,.16]],[[.52,.32,.18],[.56,.38,.24]],[[.44,.18,.085],[.5,.29,.16]]][yt];m(16,...Ie[0],.85+u()*.3),m(17,...Ie[1],.8+u()*.4),m(18,1.1+u()*.5,1.9+u()*1.2,yt===2?_e+y.top-2.6:0,u()*65535|0);const bo=Rt*Math.PI/180,To=(Math.sin(bo)-Math.sin(vt)*Math.sin(se))/(Math.cos(vt)*Math.cos(se)),Eo=-Math.acos(P(To,-1,1))*12/Math.PI,Et=Ce+Eo+(D?0:B(.15)),Lt=[0,Math.cos(vt),-Math.sin(vt)],Bt=[-1,0,0],We=[0,Math.sin(vt),Math.cos(vt)],zo=(t,o)=>{const a=t*Math.PI/12,n=Math.cos(a),r=Math.sin(a),i=[0,1,2].map(c=>n*Lt[c]+r*Bt[c]),l=[0,1,2].map(c=>r*Lt[c]-n*Bt[c]);return[0,1,2].map(c=>o[0]*i[c]+o[1]*l[c]+o[2]*We[c])},Oe=(t,o)=>{const a=t*Math.PI/12,n=o;return[Math.cos(n)*Math.cos(a),Math.cos(n)*Math.sin(a),Math.sin(n)]},Le=zo(Et,Oe(Ce,se)),Fo=Math.atan2(Le[0],Le[2]),go=-.1+(D?0:B(.1))+(x?M.core+.1:0),ce=Fo-go,Be=Math.cos(ce),Ue=Math.sin(ce),Ro=t=>t-ce,Ut=t=>{const o=t*Math.PI/12,a=Math.cos(o),n=Math.sin(o),r=[0,1,2].map(c=>a*Lt[c]+n*Bt[c]),i=[0,1,2].map(c=>n*Lt[c]-a*Bt[c]),l=[r,i,We].map(c=>[c[0]*Be-c[2]*Ue,c[1],c[0]*Ue+c[2]*Be]);for(let c=0;c<3;c++)m(4+c,l[c][0],l[c][1],l[c][2],0);for(let c=0;c<3;c++){const h=[0,1,2].map(p=>ne[c][0]*l[0][p]+ne[c][1]*l[1][p]+ne[c][2]*l[2][p]);m(7+c,h[0],h[1],h[2],0)}},Se=D?1.95:(u()<.5?1:-1)*(1.7+u()*1.3),St=u(),Ge=[[1.15,0],[1,1.3],[0,0]][Mt];m(10,Math.sin(Se),Math.cos(Se),Ge[0],Ge[1]);const Xe=Ro(95*Math.PI/180),Ao=Mt===2?2.7:2.45;m(11,0,Math.sin(Xe),Math.cos(Xe),Ao);const He=[[1,.25],[.45,.12],[1.25,1.25]][At];m(12,He[0],He[1],u()*w,(1.05+u()*.15)*[1,.22,.05,.55,1][R]*(ct===2?.8:1));const re=d>=600?2048:1024,ie=d>=600?1024:512,Gt=1,je=.55;if(m(19,Gt,Math.atan(Math.PI/Gt),je,0),D||u(),Q===2){let t=-.42+B(.2),o=.26+u()*.1;const a=X()<.5?-1:1,n=[[a*.72,.6],[M.sg*.55,.5],[-M.sg*.55,-.1],[a*.5,-.45]][x];{const E=Math.tan(32.5*Math.PI/180),ee=Math.cos(M.pitch),xt=[Math.sin(M.yaw)*ee,Math.sin(M.pitch),Math.cos(M.yaw)*ee],mt=[Math.cos(M.yaw),0,-Math.sin(M.yaw)],Lo=[xt[1]*mt[2]-xt[2]*mt[1],xt[2]*mt[0]-xt[0]*mt[2],xt[0]*mt[1]-xt[1]*mt[0]],oe=[0,1,2].map(be=>xt[be]+(n[0]*mt[be]+n[1]*Lo[be])*E),Bo=Math.hypot(...oe);t=Math.atan2(oe[0],oe[2]),o=Math.max(.1,Math.asin(oe[1]/Bo))}const r=[Math.sin(t)*Math.cos(o),Math.sin(o),Math.cos(t)*Math.cos(o)];Ut(Et);const i=[0,1,2].map(E=>b[(4+E)*4]*r[0]+b[(4+E)*4+1]*r[1]+b[(4+E)*4+2]*r[2]),l=t+(n[0]<0?-.5:.5),c=Math.min(o+.3,1.45),h=[Math.sin(l)*Math.cos(c),Math.sin(c),Math.cos(l)*Math.cos(c)],p=[0,1,2].map(E=>b[(4+E)*4]*h[0]+b[(4+E)*4+1]*h[1]+b[(4+E)*4+2]*h[2]),T=p[0]*i[0]+p[1]*i[1]+p[2]*i[2];let k=p.map((E,ee)=>E-i[ee]*T);const q=Math.hypot(...k);k=k.map(E=>E/q),m(26,...i,1.3+u()*.5),m(27,...k,.12+u()*.07)}const W=4096,zt=new Float32Array(W*4),it=t=>t-w*Math.round(t/w),le=t=>{const o=new Float32Array(t);for(let a=0;a<t;a++)o[a]=f();return a=>{const n=(a%t+t)%t,r=Math.floor(n),i=n-r,l=i*i*(3-2*i);return o[r]*(1-l)+o[(r+1)%t]*l}},Xt=le(256),fe=le(512),pt=le(1024),Co=-.12+f()*.2,No=.45+f()*.2,Ke=[];for(let t=0;t<11;t++)Ke.push([f()*w-Math.PI,.06+f()*.3,.009+f()*.014,.01+f()*.03]);const Ve=[];for(let t=0;t<5;t++){let o=f()*w-Math.PI;Math.abs(o)<.35&&t>0&&(o+=o>0?.5:-.5),Ve.push([o,.025+f()*.05,.018+f()*.026,.006+f()*.01])}const Ze=[];for(let t=0;t<9;t++){let o=.8+f()*(w-1.6);o=it(o),Ze.push([o,.08+f()*.25,.025+f()*.06])}const ko=Math.PI+B(.6),Qe=[];for(let t=0;t<13;t++)Qe.push([ko+(f()-.5)*1.1,.006+f()*.02,.035+f()*.08,(f()-.5)*.9,.15+f()*.5]);const Je=(f()<.5?1:-1)*(1.2+f()*.6),Ye=[];for(let t=0;t<40;t++)Ye.push([f()*w-Math.PI,.0015+f()*.003,.002+f()*.004]);const he=t=>(t+.5)/W*w-Math.PI,Ft=(t,o,a)=>{const n=Math.floor((t-o+Math.PI)/w*W-.5),r=Math.ceil((t+o+Math.PI)/w*W-.5);for(let i=n;i<=r;i++){const l=(i%W+W)%W;a(l,he(l))}},Y=new Float64Array(W),Ht=new Float64Array(W),jt=new Float64Array(W),$e=new Float64Array(W),pe=new Float64Array(W);for(let t=0;t<W;t++){const o=he(t),a=it(o-Co)/No;let n=-.2;if(Math.abs(a)<1){const r=.55*pt(o*28/w)+.3*fe(o*70/w+5)+.15*Xt(o*160/w+2),i=P(r*1.6-.25,0,.999)*3,l=Math.floor(i),c=i-l;n=(.008+.045*((l+wt(.55,.8,c)+.25*wt(0,.55,c)*(1-wt(.55,.8,c)))/3)+.0012*pt(o*2400/w))*Math.pow(Math.cos(a*Math.PI/2),.5)+.002}$e[t]=n,jt[t]=.003+.002*fe(o*512/w*3),Ht[t]=Math.max(-.2,8e-4*pt(o*500/w+9)-.001),Y[t]=-.035,pe[t]=wt(.55,.85,Math.abs(o))}for(const t of Ke)Ft(t[0],t[1]+t[3],(o,a)=>{const n=Math.abs(it(a-t[0])),r=P((t[1]+t[3]-n)/t[3],0,1),i=P((t[1]-n)/.004,0,1);jt[o]=Math.max(jt[o],t[2]*(.5*r+.5*i)+5e-4*pt(a*600/w))});for(const t of Ve)Ft(t[0],t[1]*2.6,(o,a)=>{const n=Math.abs(it(a-t[0])),r=P(1-n/(t[1]*2.6),0,1),i=P((t[1]-n)/.003,0,1);Ht[o]=Math.max(Ht[o],t[2]*(.38*r*r+.62*i)+8e-4*pt(a*500/w+9)-.001)});for(const t of Ze)Ft(t[0],t[1],(o,a)=>{const n=it(a-t[0])/t[1];if(Math.abs(n)<1){const r=Math.pow(1-n*n,.45+.3*Xt(t[0]*40))*(1+.12*(Xt(a*1300/w+t[0]*9)-.5)),i=Math.floor(r*5+.3*fe(a*900/w))/5;Y[o]=Math.max(Y[o],t[2]*(.75*r+.25*i)*pe[o]-.01)}});for(const t of Qe)Ft(t[0],t[1]*3,(o,a)=>{const n=it(a-t[0])/t[1];if(Math.abs(n)<3){const r=n+t[3]*.6,i=t[2]*(1+t[3]*n*.25+.06*Math.sin(n*7+t[0]*50));Y[o]=Math.max(Y[o],Math.abs(r)<1?i*Math.pow(1-Math.pow(Math.abs(r),2+6*t[4]),t[4])-.005:-1,t[2]*.3*(1-Math.abs(n)/3))}});Ft(Je,.06,(t,o)=>{const a=it(o-Je);if(Math.abs(a)<.06){let n=Math.max(Y[t],.035*P(1-Math.abs(a)/.06,0,1)*pe[t]);Math.abs(a)<.009&&(n=Math.max(n,.062)),Math.abs(a+.003)<.019&&n>=.062&&(n=Math.max(n,.062+.02*Math.sqrt(Math.max(0,1-((a+.003)/.019)**2)))),Y[t]=n}});const Po=Y.map(t=>t>0?1:0);for(const t of Ye)Ft(t[0],t[1]*1.6,(o,a)=>{if(!Po[o])return;const n=it(a-t[0])/t[1];Math.abs(n)<1.6&&(Y[o]+=t[2]*Math.max(0,1-n*n*.7)*(.6+.4*pt(a*9e3/w+t[0]*99)))});for(let t=0;t<W;t++){const o=he(t);zt[t*4]=Y[t]+.0015*(Xt(o*256/w*8)-.5)+5e-4*pt(o*1024/w*2),zt[t*4+1]=Ht[t],zt[t*4+2]=jt[t],zt[t*4+3]=$e[t]}let rt=W;for(;rt>Ct&&rt>1;)rt>>=1;const Kt=new Uint16Array(rt*4);if(rt===W)for(let t=0;t<Kt.length;t++)Kt[t]=ke(zt[t]);else{const t=W/rt;for(let o=0;o<rt;o++)for(let a=0;a<4;a++){let n=0;for(let r=0;r<t;r++)n+=zt[(o*t+r)*4+a];Kt[o*4+a]=ke(n/t)}}const G=96,$=new Float32Array(G*8*4),Vt=[],ue=[],de=[];for(let t=0;t<Re.length;t++){const o=Re[t],a=Oe(o[0],o[1]*Math.PI/180),n=Math.pow(10,-.4*(o[2]-1))*1.1*Math.pow(Math.min(1,.0013/(2*Math.tan(32.5*Math.PI/180)/d)),.6),r=Ae(o[3]);Vt.push(a),ue.push([a[0],a[1],a[2],n]),de.push([r[0],r[1],r[2],0])}const xe=s.hash+"|"+d+"|"+(D?1:0),to={};let F=null,Zt=null;const Do=()=>{const t=A.pool[d]||(A.pool[d]=[]);let o=t.find(a=>a.key===xe);if(!o){if(t.length<(d>=600?2:4)){const a=A.fl?[e.RGBA32F,e.RGBA,e.FLOAT]:A.hf?[e.RGBA16F,e.RGBA,e.FLOAT]:[e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT];o={tG:A.tex2(d,d,a[0],a[1],a[2],e.NEAREST,e.CLAMP_TO_EDGE,null),fbG:e.createFramebuffer(),tMW:A.tex2(re,ie,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE,null),fbMW:e.createFramebuffer(),tHz:A.tex2(rt,1,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.REPEAT,null),tD:A.tex2(G,8,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,e.CLAMP_TO_EDGE,null),tS:A.tex2(ft?d:d*2,d,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE,null),fbS:e.createFramebuffer()},e.bindFramebuffer(e.FRAMEBUFFER,o.fbS),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o.tS,0),ft&&(o.tS2=A.tex2(d,d,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST,e.CLAMP_TO_EDGE,null),e.bindFramebuffer(e.FRAMEBUFFER,o.fbS),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,o.tS2,0),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1])),e.bindFramebuffer(e.FRAMEBUFFER,o.fbG),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o.tG,0),e.bindFramebuffer(e.FRAMEBUFFER,o.fbMW),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,o.tMW,0),e.bindFramebuffer(e.FRAMEBUFFER,null),t.push(o)}else o=t.reduce((a,n)=>a.use<=n.use?a:n);o.key=xe,o.mw=!1,o.g=""}o.owner=null,F=o},kt=Math.tan(32.5*Math.PI/180);let H=D?0:B(.06),Qt=.2+(D?0:B(.04));x&&(H+=M.yaw,Qt+=M.pitch-.2);{Ut(Et);const t=H+(v()-.5)*.3;if(R===1){const a=v(),n=t+(a<.5?-1:1)*(100+25*(a<.5?2*a:2*a-1))*Math.PI/180,r=(9+9*v())*Math.PI/180;m(45,Math.sin(n)*Math.cos(r),Math.sin(r),Math.cos(n)*Math.cos(r),.8+.4*v())}if(R===4){const a=v();v();const n=(58+15*v())*Math.PI/180;x||v();const r=[b[32],b[33],b[34]],i=[Math.cos(H),0,-Math.sin(H)],l=(r[0]*i[0]+r[2]*i[2])*r[1]>0?-1:1,c=H+l*(22+6*a)*Math.PI/180,h=[Math.sin(c),0,Math.cos(c)],p=[-Math.cos(c)*l,0,Math.sin(c)*l];m(46,...h,1.2+.4*v()),m(47,...[0,1,2].map(T=>p[T]*Math.cos(n)+(T===1?Math.sin(n):0)),0)}R===2&&(b[47*4+3]=.85+.3*v()),b[42*4+2]=ct===2?.7+.5*v():0,b[42*4+3]=ct===1?.8+.5*v():0,b[41*4+3]=v()*w;const o=H+(St<.5?-1:1)*(20+12*(St<.5?2*St:2*St-1))*Math.PI/180;if(m(29,Math.sin(o),Math.cos(o),0,0),m(39,b[28],b[29],b[30],R===3?1:0),m(43,[0,.05,.3,.1,0][R],0,0,0),R===2){const a=[[.3,.5],[M.sg*.3,.4],[-M.sg*.3,-.05],[.3,-.35]][x],n=kt,r=Math.cos(Qt),i=[Math.sin(H)*r,Math.sin(Qt),Math.cos(H)*r],l=[Math.cos(H),0,-Math.sin(H)],c=[i[1]*l[2]-i[2]*l[1],i[2]*l[0]-i[0]*l[2],i[0]*l[1]-i[1]*l[0]],h=[0,1,2].map(E=>i[E]+(a[0]*l[E]+a[1]*c[E])*n),p=Math.hypot(...h),T=h.map(E=>E/p),k=[0,1,2].map(E=>b[(4+E)*4]*T[0]+b[(4+E)*4+1]*T[1]+b[(4+E)*4+2]*T[2]),q=Ae(.7);Vt.push(k),ue.push([...k,14*Math.pow(Math.min(1,.0013/(2*kt/d)),.6)]),de.push([q[0],q[1],q[2],0])}}const g={p:[0,0,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]};let Jt="";const eo=()=>{const t=s.view||mo,o=M.x+P(t.x||0,-M.r,M.r),a=M.z+P(t.z||0,-M.r,M.r);g.p=[o,Ot(o,a)+P(M.eye+(t.y||0),.4,3),a];const n=H+(t.yaw||0),r=P(Qt+(t.pitch||0),-1.35,1.35),i=Math.cos(r);g.fw=[Math.sin(n)*i,Math.sin(r),Math.cos(n)*i],g.rt=[Math.cos(n),0,-Math.sin(n)];const l=g.fw,c=g.rt;g.up=[l[1]*c[2]-l[2]*c[1],l[2]*c[0]-l[0]*c[2],l[0]*c[1]-l[1]*c[0]],m(0,...g.p,kt),m(1,...g.fw,d),m(2,...g.rt,0),m(3,...g.up,2*kt/d);const h=g.p.join()+g.fw.join(),p=h!==Jt;return Jt=h,p},Pt=(t,o)=>{const a=t*2-1,n=1-o*2,r=[0,1,2].map(l=>g.fw[l]+(a*g.rt[l]+n*g.up[l])*kt),i=Math.hypot(...r);return r.map(l=>l/i)},_o=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,A.tN3),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,F.tG),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,F.tMW),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,F.tHz),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,F.tD),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,F.tS),ft&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,F.tS2))},me=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(A.vao)},qo=()=>{e.bindFramebuffer(e.FRAMEBUFFER,F.fbMW),e.viewport(0,0,re,ie),me(),e.useProgram(Tt.mw.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.tN),e.uniform4f(Tt.mw.uM,Zt[0],Zt[1],Zt[2],re),e.uniform4f(Tt.mw.uM2,ie,Gt,je,Math.atan(Math.PI/Gt)),e.drawArrays(e.TRIANGLES,0,3),F.mw=!0},Io=()=>{F.g=Jt,e.bindFramebuffer(e.FRAMEBUFFER,F.fbG),e.viewport(0,0,d,d),me(),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,null),e.useProgram(Tt.g.p),e.uniform4fv(Tt.g.uC,b),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_3D,A.tN3),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),ft&&(e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null)),e.bindFramebuffer(e.FRAMEBUFFER,F.fbS),e.viewport(0,0,ft?d:d*2,d);const t=ft?A.V.s:Tt.s;e.useProgram(t.p),e.uniform4fv(t.uC,b),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,F.tG),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush()};let ut=Et,oo=0;const ve=Et+1.7,j=[];let _=null,U=null,Yt=!1,Dt=!0;const we=[];let $t=9+f()*50,Me=0,Wo=0,te=0,K=Q===3?{dur:.9+X()*.3,sx:.15+.7*X(),sy:.12+.2*X(),br:2.2+.6*X()}:null;K&&(K.t0=4-.6*K.dur,$t=Math.max($t,K.t0+5));const ao=(()=>{const t=f()*w,o=.6+f()*.6;return[Math.sin(t)*Math.cos(o),Math.sin(o),Math.cos(t)*Math.cos(o)]})(),dt=t=>{const o=Math.hypot(...t);return t.map(a=>a/o)},ye=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],no=(t,o,a,n,r)=>{let i=ao.map((k,q)=>-(k-t[q]*ye(ao,t)));Math.hypot(...i)<.001&&(i=[1,0,0]),i=dt(i);const l=a?.3+f()*.2:.1+f()*.22,c=.45*l,h=dt(t.map((k,q)=>k*Math.cos(c)-i[q]*Math.sin(c))),p=dt(t.map((k,q)=>k*Math.sin(c)+i[q]*Math.cos(c))),T={s0:h,T:p,t0:o,dur:a?.8+f()*.5:.35+f()*.5,L:l,br:a?3.2+f()*1.5:.4+f()*.9,fl:a?1:f()<.3?.6:0};n&&(T.dur=n,T.br=r),we[Me]=T,Me=(Me+1)%8,Dt=!0,s.sound&&s.sound.note(a?86+Math.floor(f()*5):93+Math.floor(f()*6),{dur:a?2.6:1.4,vel:a?.2:.08,wave:"sine",pan:P(ye(t,g.rt)*1.5,-1,1)})},so=(t,o,a)=>{const n=new Float32Array(4*a);e.bindFramebuffer(e.FRAMEBUFFER,F.fbG);try{A.ui?e.readPixels(t,o,1,a,e.RGBA_INTEGER,e.UNSIGNED_INT,new Uint32Array(n.buffer)):e.readPixels(t,o,1,a,e.RGBA,e.FLOAT,n)}catch{n.fill(0)}return e.bindFramebuffer(e.FRAMEBUFFER,null),n},co=(t,o,a)=>{const n=P(Math.floor(t*d),0,d-1),r=P(Math.floor((1-o)*d),0,d-1),i=so(n,r,1);if(i[3]<0){const l=Pt(t,o),c=l.map((h,p)=>g.p[p]-h*i[3]);m(44,c[0],c[2],a,.05),s.sound&&s.sound.note(84+Math.floor(f()*6),{dur:.9,vel:.05,wave:"sine",pan:P((t-.5)*2,-1,1)})}else if(i[3]>0){const l=io(t,o);j.push({a:l,b:l,t:a,w:.5,dt:0}),Dt=!0,s.sound&&s.sound.hit("click",.12)}},ro=()=>[0,1,2].map(t=>g.p[t]+g.rt[t]*1.5+g.up[t]*.35-g.fw[t]*.4),Oo=.06,io=(t,o)=>{const a=P(Math.floor(t*d),0,d-1),n=P(Math.floor((1-o)*d),0,d-1),r=so(a,n,1),i=Pt(t,o),l=r[3]>0?r[3]:r[3]<0?-r[3]:60,c=i.map((p,T)=>g.p[T]+p*l),h=ro();return dt(c.map((p,T)=>p-h[T]))},lo=(t,o)=>Math.acos(P(ye(t,o),-1,1)),fo=t=>{const o=j.filter(a=>t-a.t<4.3||_t===2);j.length=0,j.push(...o.slice(-G));for(let a=0;a<j.length;a++){const n=j[a];$.set([n.a[0],n.a[1],n.a[2],n.t],a*4),$.set([n.b[0],n.b[1],n.b[2],n.w],(G+a)*4)}te=0;for(const a of we){if(!a||t-a.t0>a.dur*4.5)continue;const n=te++;$.set([...a.s0,a.t0],(2*G+n)*4),$.set([...a.T,a.dur],(3*G+n)*4),$.set([a.L,a.br,a.fl,0],(4*G+n)*4)}e.bindTexture(e.TEXTURE_2D,F.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,G,5,e.RGBA,e.FLOAT,$)},ho=()=>{e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,d,d),me(),e.useProgram(xo.p),e.uniform4fv(xo.uC,b),_o(),e.drawArrays(e.TRIANGLES,0,3)},po=t=>{Ut(ut),oo=wt(ve-.9,ve+.4,ut),b[11*4]=Math.max(oo,R===3?.55:0),b[2*4+3]=t;let o=0,a=[0,1,0];for(const c of we){if(!c)continue;const h=(t-c.t0)/c.dur;if(h<=0||h>=1)continue;const p=Math.pow(Math.sin(Math.PI*h),.6)*(1+1.6*c.fl*Math.exp(-(((h-.74)/.07)**2)))*c.br;if(p>o){o=p;const T=c.L*h*(1.18-.18*h);a=c.s0.map((k,q)=>k*Math.cos(T)+c.T[q]*Math.sin(T))}}m(15,a[0],a[1],a[2],o*o*.5);const n=ro(),r=j.filter(c=>t-c.t<4.3||_t===2).length;m(14,n[0],n[1],n[2],170);let i=0;const l=Math.cos(1.05);for(let c=0;c<Vt.length;c++){const h=Vt[c],p=[0,1,2].map(E=>b[4*4+E]*h[0]+b[5*4+E]*h[1]+b[6*4+E]*h[2]),T=g.fw,k=p[0]*T[0]+p[1]*T[1]+p[2]*T[2],q=p[0]*T[0]-p[1]*T[1]+p[2]*T[2];p[1]>-.02&&(k>l||q>l)&&($.set(ue[c],(5*G+i)*4),$.set(de[c],(6*G+i)*4),i++)}e.bindTexture(e.TEXTURE_2D,F.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,5,G,2,e.RGBA,e.FLOAT,$,5*G*4),m(13,(Mt===2?1.2:1)*[1,.9,.9,1,1][R]*(ct===2?.7:1),r,te,i)},uo=()=>{(!F||F.key!==xe)&&Do(),F.use=++A.tick,F.mw||qo(),F.g!==Jt&&Io(),F.owner!==to&&(F.owner=to,e.bindTexture(e.TEXTURE_2D,F.tHz),e.texSubImage2D(e.TEXTURE_2D,0,0,0,rt,1,e.RGBA,e.HALF_FLOAT,Kt),e.bindTexture(e.TEXTURE_2D,F.tD),e.texSubImage2D(e.TEXTURE_2D,0,0,0,G,8,e.RGBA,e.FLOAT,$))},xo=A.ready(Pe);eo(),Ut(Et);{const t=u()*200,o=u()*200;Zt=[t,o,D?1.05:.85+u()*.35]}if(uo(),_t===2)for(let t=0;t<6;t++){const o=Pt(.12+t*.03,.62-t*.07),a=Pt(.15+t*.03,.55-t*.07);j.push({a:o,b:a,t:3.6,w:.16,dt:.3})}return po(0),fo(0),ho(),(t,o)=>{o=Math.min(o||1/30,.1);const a=s.input,n=a.taps?a.taps():[];if(eo(),uo(),a.down&&!Yt&&(U={x:a.x,y:a.y,t,mode:0},_=null),a.down&&U){if(U.mode||(Math.hypot(a.x-U.x,a.y-U.y)>.015?(U.mode=1,s.sound&&s.sound.hit("click",.2)):t-U.t>.32&&(U.mode=2)),U.mode===1){const r=io(a.x,a.y);if(!_)_={a:r,b:r,t,w:0,dt:0},j.push(_);else{const i=_.b.map((h,p)=>h-_.a[p]),c=Math.hypot(...i)>1e-4?lo(dt(i),dt(r.map((h,p)=>h-_.a[p]))):0;if(_.dt>.22||c>.12){const h={a:_.b,b:r,t,w:0,dt:0};j.push(h),_=h}else _.b=r}_.dt+=o,_.t=t,_.w=Math.min(1.6,_.dt*Math.min(1,2.5*Oo/Math.max(lo(_.a,_.b),1e-4))),Dt=!0}else if(U.mode===2){const r=ut;ut=Math.min(ve-.25,ut+o*.14),Math.floor(r*6)!==Math.floor(ut*6)&&s.sound&&s.sound.note(45+Math.floor(ut*2%5)*2,{dur:2.2,vel:.07,wave:"triangle"})}}if(!a.down&&Yt&&U&&(U.mode||co(U.x,U.y,t),U=null,_=null),!a.down&&!Yt&&n.length)for(const r of n)co(r.x,r.y,t);if(Yt=a.down,K&&t>=K.t0){const r=Pt(K.sx,K.sy);no(r[1]<.08?dt([r[0],.08,r[2]]):r,t,!0,K.dur,K.br),K=null}if(t>=$t){const r=f()*w,i=.15+f()*.9,l=f();no([Math.sin(r)*Math.cos(i),Math.sin(i),Math.cos(r)*Math.cos(i)],t,!1,.25+.35*l,.25+.7*l*l),$t=t+30+90*f()*f()+30*f()}(Dt||j.length||te)&&(fo(t),Dt=!1),Wo=t,po(t),ho()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
