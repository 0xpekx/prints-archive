// Skipping Stones: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/039.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ut){ut&&function(){"use strict";const dt=new WeakMap,ge=(a,t,y)=>a<t?t:a>y?y:a,a0=(a,t,y)=>a+(t-a)*y,J=Math.PI*2,K=Math.PI/180,fe=.4,He=(a,t)=>a[0]*t[0]+a[1]*t[1]+a[2]*t[2];function ht(a,t){const y=[0,-Math.sin(t),Math.cos(t)],m=[0,Math.cos(t),Math.sin(t)],W=[1,0,0],L=(()=>{const F=1.0000050000125,o=-2*2e4*.05/(2e4-.05),E=[W[0]/fe,W[1]/fe,W[2]/fe,-He(W,a)/fe],A=[m[0]/fe,m[1]/fe,m[2]/fe,-He(m,a)/fe],z=[y[0]*F,y[1]*F,y[2]*F,-He(y,a)*F+o],g=[y[0],y[1],y[2],-He(y,a)];return new Float32Array([E[0],A[0],z[0],g[0],E[1],A[1],z[1],g[1],E[2],A[2],z[2],g[2],E[3],A[3],z[3],g[3]])})();return{EYE:a,CF:y,CU:m,VP:L,toScreen:O=>{const x=[O[0]-a[0],O[1]-a[1],O[2]-a[2]],F=He(x,y);return[.5+.5*He(x,W)/(F*fe),.5-.5*He(x,m)/(F*fe),F]}}}const Yt=ht([0,1.5,0],6*K),Me=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,N0=`#version 300 es
layout(location=0) in vec2 aP; out vec2 vS;
void main(){ vS = aP * .5 + .5; gl_Position = vec4(aP, 0., 1.); }`,Te=`
uniform sampler2D uN;
uniform float uEnc; uniform int uOne;
uniform vec3 EYE, CF, CU;
#define EH EYE.y
#define EHB (EYE.y + uSlope * EYE.z)
const float TH = .4;
vec3 rayDir(vec2 uv){ vec2 n = uv * 2. - 1.; return normalize(CF + (vec3(n.x, 0., 0.) + CU * n.y) * TH); }
vec2 toUV(vec3 d){ float z = dot(d, CF); return .5 + .5 * vec2(d.x, dot(d, CU)) / (z * TH); }
vec4 enc(vec3 c, float a){ return uEnc > .5 ? vec4(sqrt(clamp(c / 8., 0., 1.)), a) : vec4(c, a); }
vec3 dec(vec3 c){ return uEnc > .5 ? c * c * 8. : c; }
`,xt=`
uniform vec4 uL0, uP0;
float dShore(float az){ return uL0.x * (1. + uP0.w * (texture(uN, vec2(az * .9, uP0.x + .5)).b - .5)); }
`,C0=`
uniform float uExp, uTw;
vec3 grade(vec3 c){
  c *= uExp * (1. - .62 * uTw);
  c = mix(c, c * vec3(.6, .78, 1.32), uTw * .75);
  c = (c * (2.51 * c + .03)) / (c * (2.43 * c + .59) + .14);
  return pow(clamp(c, 0., 1.), vec3(1. / 2.2));
}
`,Gt=Me+Te+xt+`
in vec2 vS; out vec4 o;
uniform vec4 uLs[5], uPs[5], uMoon, uFog, uCl, uGap;
uniform float uMir, uHz, uSnow, uRes; uniform int uNL;
uniform vec3 uSunD, uSunC, uZen, uHor, uHorS, uAmb, uFogC, uMoonC, uAlbT, uAlbH, uAlbR;
// the kinds of land a variant meets: K1 the sea loch's hills, K2 ridges (mountain and frozen lakes), K3 the mill pond's
// willows; an island mint (WM: mountain or frozen lake, WL: sea loch) compiles only its own (D3D compile time)
#if defined(WM)
#define K1 0
#define K2 1
#define K3 0
#elif defined(WL)
#define K1 1
#define K2 0
#define K3 0
#else
#define K1 1
#define K2 1
#define K3 1
#endif
// the noise texture at one mip level with smooth-stepped texel centres: no kinks when it is magnified into a skyline
vec4 sN(vec2 uv, float lod){ float s = 256. / exp2(lod); vec2 t = uv * s - .5, i = floor(t), f = t - i; f = f * f * (3. - 2. * f); return textureLod(uN, (i + .5 + f) / s, lod); }
float vn(float x, float row){
  float i = floor(x), f = x - i; f = f * f * (3. - 2. * f); int r = int(mod(row, 256.));
  return mix(texelFetch(uN, ivec2(int(mod(i, 256.)), r), 0).r, texelFetch(uN, ivec2(int(mod(i + 1., 256.)), r), 0).r, f);
}
#ifdef ISLE
// land out on the water (layer 0): a window in azimuth (centre, half width, raggedness, the width of its ends) whose
// ends are ragged by the layer's own noise, so the land sinks into the water in ledges over 10 to 20 m
uniform vec4 uIs; uniform vec3 uWatC;
#define SHK 1
float isleW(float az, float D, float sd){
  float row = floor(sd * 251.) + 173.;
  float r = (vn(az * D / 9., row) - .5) * 1.4 + (vn(az * D / 2.6, row + 31.) - .5) * .6;
  return smoothstep(0., 1., (1. - abs(az - uIs.x) / uIs.y + r * uIs.z) * uIs.y / uIs.w);
}
#else
#define SHK 0
#endif
// a stand of conifers: tx metres along the layer, hT the tallest tree, dn how much of the line is wooded. Tall spires
// and a lower, denser row in front of them (its top goes to fr); clumps, gaps, tiers of boughs, a veteran now and then.
float trees(float tx, float hT, float row, float dn, out float fr){
  float cl = vn(tx / (hT * 3.3), row + 91.) * .62 + vn(tx / (hT * .8) + 7., row + 57.) * .38;
  float top = 0.; fr = 0.;
  for (int s = 0; s <= uOne; s++) {
    float fs = float(s), w = hT * mix(.3, .2, fs), t = tx / w + fs * 31.7, c = floor(t), best = 0.;
    int rw = int(mod(row + fs * 41., 256.));
    for (int i = -1; i <= uOne; i++) {
      float cc = c + float(i);
      vec2 r = texelFetch(uN, ivec2(int(mod(cc, 256.)), rw), 0).rg;
      vec2 q = texelFetch(uN, ivec2(int(mod(cc + 97., 256.)), rw), 0).rg;
      float th = hT * mix(mix(.5, .84, r.x) + .2 * step(.9, q.x) * smoothstep(.4, .62, cl), mix(.26, .6, r.x), fs) * mix(.45, 1.1, smoothstep(.28, .66, cl));
      th *= step(1.05 - dn * .9 - (cl - .5) * .9 - fs * .12, r.y);
      float u = abs(t - cc - .5 - (r.y - .5) * .8) * w / (th * mix(.1, .19, q.y) + .01);
      if (u < 1.) { float st = u * 3., fl = floor(st); st = (fl + pow(st - fl, .45)) / 3.; best = max(best, th * (1. - pow(st, mix(.7, 1.3, q.x)))); }
    }
    top = max(top, best); fr = best;
  }
  return top;
}
// the skyline of a layer at an azimuth; hx gets the top of the front row of trees and the bare ground under them
float hProf(vec4 L, vec4 P, float az, float D, float dn, out vec2 hx){
  float x = az * P.y, h = L.y, row = floor(P.x * 251.);
  vec4 n = sN(vec2(x, P.x), 2.), m = sN(vec2(x * 2.7 + .3, P.x + .37), 2.);
  if (L.w < .5) h += L.z * n.b;
#if K1
  else if (L.w < 1.5) {
    h += L.z * pow(n.b, 1.5) * (.85 + .3 * m.a);
    if (uGap.y > 0.) h = mix(L.y * .3, h, smoothstep(0., uGap.y, abs(az - uGap.x)));
  }
#endif
#if K2
  else if (L.w < 2.5) {
    float r = 1. - abs(n.b * 2. - 1.), cr = 0., a = .5, xx = x * 40.;
    for (int k = 0; k <= uOne * 3; k++) { cr += a * (1. - abs(2. * vn(xx, row + float(k) * 19.) - 1.)); a *= .5; xx *= 2.13; }
    h += L.z * (.55 * pow(r, 1.6) + .45 * n.b * m.a + .045 * (cr - .5) * (.4 + r));
  }
#endif
#if K3
  else {
    float tx = az * D / 9., c = floor(tx), best = 0.;
    for (int i = -1; i <= uOne; i++) {
      float cc = c + float(i);
      vec2 r = texelFetch(uN, ivec2(int(mod(cc, 256.)), int(row)), 0).rg;
      vec2 q = texelFetch(uN, ivec2(int(mod(cc + 97., 256.)), int(row)), 0).rg;
      float th = P.z * (.4 + .75 * r.x * (.5 + .5 * q.x)) * step(.3, r.y);
      float u = (tx - cc - .5 - (r.y - .5) * .8) / (.4 + .55 * q.y);
      if (abs(u) < 1.) best = max(best, th * sqrt(1. - u * u));
    }
    h += L.z * n.b + best * (1. + .3 * (vn(az * D / 2.3, row + 5.) - .5) + .12 * (vn(az * D / .8, row + 9.) - .5));
  }
#endif
  hx = vec2(h);
  if (P.z > 0. && L.w < 2.5) { float fr; h += trees(az * D, P.z, row, dn, fr); hx.x += fr; }
  return h;
}
vec3 skyB(vec3 d){
  float e = max(d.y, 0.);
  vec2 dz = normalize(d.xz + vec2(1e-5)), sz = normalize(uSunD.xz + vec2(1e-5));
  float ca = dot(dz, sz) * .5 + .5;
  vec3 hor = mix(uHor, uHorS, pow(ca, 5.));
  vec3 col = mix(hor, uZen, pow(clamp(e * 3.6, 0., 1.), .6));
  float sa = acos(clamp(dot(d, uSunD), -1., 1.));
  col += uSunC * (.22 * exp(-sa * 4.) + .9 * exp(-sa * 17.));
  return col;
}
vec3 skyFull(vec3 d){
  vec3 col = skyB(d);
  if (d.y > 0.) {
    if (uCl.x > .5) {
      float t = 1. / (d.y + .03);
      vec2 q = d.xz * t * .02 + uCl.y;
      float n = uCl.x < 1.5 ? texture(uN, q * vec2(.22, 1.5)).b * .65 + texture(uN, q * vec2(.9, 4.5) + .3).a * .35
                             : texture(uN, q * .6).b * .5 + texture(uN, q * 2.4 + .5).a * .5;
      float th = smoothstep(uCl.z, uCl.z + .26, n);
      float dens = smoothstep(uCl.z, uCl.z + .2, n) * smoothstep(.0, .05, d.y) * (1. - smoothstep(.45, .9, d.y));
      vec2 dz = normalize(d.xz), sz = normalize(uSunD.xz);
      float ca = dot(dz, sz) * .5 + .5;
      // lit from below by the low sun: thin edges glow, thick cores stay dusky
      vec3 glow = uHorS * (.42 + 1.15 * pow(ca, 3.)) * (1. - .5 * smoothstep(.0, .4, d.y)) + uZen * .5;
      vec3 body = col * .7 + vec3(dot(uZen, vec3(.3333))) * .3;
      float edge = texture(uN, q * 4. + .7).a;
      col = mix(col, mix(glow, body, smoothstep(.2, .85, th + (edge - .5) * .3)), dens * uCl.w * .8);
    }
    if (uMoon.w > 0.) {
      float ma = acos(clamp(dot(d, uMoon.xyz), -1., 1.));
      col += uMoonC * (.012 * exp(-ma * 7.) + .035 * exp(-ma * 60.) + .25 * exp(-ma / uMoon.w * 3.));
      if (ma < uMoon.w * 1.05) {
        vec3 rt = normalize(cross(uMoon.xyz, vec3(0., 1., 0.))), up = cross(rt, uMoon.xyz);
        vec2 lp = vec2(dot(d, rt), dot(d, up)) / uMoon.w;
        float limb = sqrt(max(0., 1. - dot(lp, lp)));
        float mar = texture(uN, lp * .16 + .31).b;
        vec3 mc = uMoonC * 7. * (.62 + .38 * smoothstep(.3, .62, mar)) * (.65 + .35 * limb);
        col = mix(col, mc, smoothstep(1.03, .97, length(lp)));
      }
    }
    float sa = acos(clamp(dot(d, uSunD), -1., 1.));
    col += uSunC * 22. * smoothstep(.0052, .0044, sa) * step(-.006, uSunD.y);
  }
  col = mix(col, uFogC, uFog.w * exp(-max(d.y, 0.) * 14.));
  return col;
}
vec3 land(vec4 L, vec4 P, float az, float y, float H, vec2 hx, float D, vec3 d){
  float u = clamp(y / max(H, .5), 0., 1.);
  float sc = 1. / max(1., D * .002);
  vec2 q = vec2(az * D, y);
  float tp = D * 2. * TH / uRes * 256.;      // texels of the noise per pixel, per unit of lookup frequency
  float f1 = textureLod(uN, q * vec2(.012, .02) * sc + P.x, log2(max(1., tp * .02 * sc))).b;
  float f2 = textureLod(uN, q * vec2(.05, .07) * sc + P.x * 3., log2(max(1., tp * .07 * sc))).a;
  vec3 alb = uAlbT * (.5 + f2);
  float wood = 1.;
#if K3
  if (L.w > 2.5) alb *= (.62 + .7 * textureLod(uN, q * .06 + .3, log2(max(1., tp * .06))).a) * (1. + .6 * exp(-max(H - y, 0.) * .6));
  else
#endif
#if K1
  if (L.w > .5 && L.w < 1.5) { alb = uAlbH * (.55 + .9 * f1) * (.8 + .4 * f2); wood = step(hx.y, y); }
#endif
#if K1 && K2
  else
#endif
#if K2
  if (L.w > 1.5) {
    alb = uAlbR * (.5 + 1.6 * f1 * f2);
    float f3 = textureLod(uN, q * vec2(.05, .006) * sc + P.x * 5., log2(max(1., tp * .05 * sc))).b;
    float sl = mix(1.15, .45, uSnow) + (f1 - .5) * .3;
    float sn = smoothstep(sl, sl + .04, u + (f3 - .5) * .55);
    alb = mix(alb, vec3(.55, .57, .63), sn);
    wood = max(step(hx.y, y), .8 * (1. - sn));
  }
#endif
#ifndef ISLE
  if (uSnow > .5 && L.w > .5 && L.w < 1.5) alb = mix(alb, vec3(.58, .6, .65), smoothstep(.4, .55, f1 + f2 * .3));
#endif
  if (P.z > 0. && L.w > .5 && L.w < 2.5) alb = mix(alb, uAlbT * (.5 + f2), wood);
#if K2
  if (uSnow > .5 && L.w < .5) alb = mix(alb, vec3(.5, .52, .56), .3 * smoothstep(.5, .7, f2));
#endif
#ifdef ISLE
  // the island's own wood is near enough to show no dusting of snow but on the frozen lake; its rock is wet and dark
  if (L.w > .2 && L.w < .5) {
    alb = uAlbT * (.5 + f2);
    if (uSnow > .9) alb = mix(alb, vec3(.5, .52, .56), .3 * smoothstep(.5, .7, f2));
    if (y < hx.y + .25) alb = mix(uAlbR * (.4 + .9 * f1 * f2), vec3(.5, .52, .57), uSnow > .9 ? .6 * smoothstep(.35, .65, f2) : 0.);
  }
#endif
  vec3 li = uAmb * (.6 + .4 * u) + uHorS * .02 * u * u;
  vec3 col = alb * li;
  float toward = pow(max(dot(normalize(d.xz), normalize(uSunD.xz)), 0.), 6.);
#ifdef ISLE
  col += uSunC * toward * .45 * exp(-max(H - y, 0.) / (D * .002 + (L.w > .2 && L.w < .5 ? .02 : .25)));   // the island's rim: a hairline
#else
  col += uSunC * toward * .45 * exp(-max(H - y, 0.) / (D * .002 + .25));
#endif
  vec2 hdz = normalize(d.xz), hsz = normalize(uSunD.xz + vec2(1e-5));
  vec3 hz = mix(uHor, uHorS, pow(dot(hdz, hsz) * .5 + .5, 5.)) * .85;
  // haze: more of it toward the foot of each layer, where the evening air pools; the back row of a wood sits deeper in it
  float od = D * uHz * (1. + 2.4 * exp(-y / (H * .45 + 3.)));
  if (P.z > 0. && y > hx.x) od = od * 1.35 + .06;
  col = mix(col, hz, 1. - exp(-od));
  col = mix(col, uFogC, clamp(uFog.x * exp(-max(y, 0.) / uFog.y) * (1. - exp(-D / uFog.z)), 0., 1.));
  return col;
}
void main(){
  vec3 d = rayDir(vS);
  vec3 o3 = EYE; float oh = 0.;
  if (uMir > .5) {
    if (d.y < -1e-4) {
      float hd = length(d.xz), az = atan(d.x / d.z);
      float dw = min(EH * hd / -d.y, dShore(az) * .998);
      o3 = vec3(d.x / hd * dw, 0., d.z / hd * dw); oh = dw;
      o3.xz += EYE.xz;
    }
    d.y = abs(d.y);
  }
  float az = atan(d.x / d.z), hd = length(d.xz), sl = d.y / hd;
  vec3 col = skyFull(d);
  float fl = 0., pa = 2. * TH / uRes, da = pa * d.z * d.z / (hd * hd) * .25;
#ifdef ISLE
  float covI = 0.;
#endif
  // far to near, each layer laid over the last with an anti-aliased edge (two taps across the pixel, analytic up it)
  for (int k = uNL - 1; k >= 0; k--) {
    vec4 L = uLs[k], P = uPs[k];
    float D = k == SHK ? dShore(az) : L.x;
    float y = o3.y + (D - oh) * sl;
    if (L.w < 3.5 && D > oh && y >= 0.) {
      float cov = 0., H = 0.; vec2 hx = vec2(0.);
#ifdef ISLE
      // the island's window and the raggedness of its boughs, once per pixel (not per tap: one call site each)
      float wI = 1., wT = 1.;
      if (k == 0) { wI = isleW(az, D, P.x); wT = smoothstep(.45, .9, wI) * (1. + .24 * (vn(az * D / .45, 77.) - .5)); }
#endif
      for (int j = 0; j <= uOne; j++) {
        vec2 e; float h = hProf(L, P, az + (float(j) * 2. - 1.) * da, D, k == SHK ? uGap.z : P.w, e);
#ifdef ISLE
        // the island's rock follows the window down into the water; its trees stand back from the ends
        // (and near as it is, each tree's outline is ragged with its boughs)
        if (k == 0) { h = e.y * wI + (h - e.y) * wT - 1.5 * (1. - wI); e = vec2(e.y * wI + (e.x - e.y) * wT, e.y * wI) - 1.5 * (1. - wI); }
#endif
        cov += clamp((h - y) / (D * pa) + .5, 0., 1.); H += h; hx += e;
      }
      cov *= .5; H *= .5; hx *= .5;
#if K3
      if (L.w > 2.5) cov *= smoothstep(.3, .6, textureLod(uN, vec2(az * D, y) * .06 + P.x, log2(max(1., D * pa * 15.4))).a + (H - y) * .8 - .1);
#endif
      if (cov > 0.) { col = mix(col, land(L, P, az, y, H, hx, D, d), cov); if (cov > .5) fl = .02; }
#ifdef ISLE
      if (k == 0) covI = cov;
#endif
    }
  }
#ifdef ISLE
  // the water between the island and the far shore: program B leaves it to this pass (it would paint over the
  // island's foot), so mark it as water here, under whatever the island covers
  if (uMir < .5 && d.y < -1e-4 && EH * hd / -d.y < dShore(az)) { fl = max(1. - covI, .02); col = mix(col, uWatC, fl); }
#endif
  o = enc(col, fl);
}`,Xt=Me+Te+xt+`
in vec2 vS; out vec4 o;
uniform vec4 uSh, uSpit, uPeb, uWat;
uniform vec3 uWatC, uAmb, uZen, uHor, uHorS, uSunD, uSunC;
uniform float uSlope, uIce, uRes; uniform int uSS;
#ifdef ISLE
uniform vec4 uIs; uniform float uDi;
#endif
float zw(float x){ return uSh.x + uSh.y * sin(x * uSh.z + uSh.w) + .045 * min(x * x, 5.); }
// the sky a pebble mirrors: the glow along the horizon toward the sun, going over to the zenith
vec3 skyG(vec3 r){
  float ca = dot(normalize(r.xz + vec2(1e-5)), normalize(uSunD.xz + vec2(1e-5))) * .5 + .5;
  return mix(mix(uHor, uHorS, pow(ca, 5.) * .8), uZen, pow(clamp(r.y * 2.4, 0., 1.), .5)) * smoothstep(-.35, .05, r.y);
}
float vor(vec2 g, float an, out vec2 v1, out vec4 h1){
  vec2 ip = floor(g); float d1 = 9., d2 = 9.;
  v1 = vec2(0.); h1 = vec4(0.);
  for (int j = -1; j <= uOne; j++) for (int i = -1; i <= uOne; i++) {
    vec2 c = ip + vec2(i, j);
    vec4 h = texelFetch(uN, ivec2(mod(c, 256.)), 0);
    vec4 k = texelFetch(uN, ivec2(mod(c + vec2(119., 71.), 256.)), 0);
    vec2 v = c + .1 + .8 * h.rg - g;
    vec2 w = v;
    if (an > 0.) { float a = k.r * 6.283, ca = cos(a), sa = sin(a); w = mat2(ca, -sa, sa, ca) * v; w.y *= an; }
    float dd = length(w) / (.75 + .5 * k.g);
    if (dd < d1) { d2 = d1; d1 = dd; v1 = v; h1 = vec4(h.rg, k.rg); } else if (dd < d2) d2 = dd;
  }
  return d2 - d1;
}
// big: 1 on a cobble (a larger stone bedded among the pebbles), sh: the shade a cobble casts on the pebbles at its foot
vec3 beach(vec3 P, vec3 d, float e, vec2 v, vec4 h, float big, float sh){
  float kind = uPeb.y;
#ifdef DOWN
  // seen from above a stone of the bed is rounded, not a paving cell: its own ellipse cuts the cell's corners off, so
  // the stones lie in silt that shows between them
  if (P.y < 0.) {
    float a = h.z * 6.283, ca = cos(a), sa = sin(a);
    vec2 w = mat2(ca, -sa, sa, ca) * v; w.y *= kind < .5 ? 1.9 : 1.3;
    e = min(e, (.53 + .14 * h.x + .16 * (texture(uN, w * .3 + h.xy).b - .5) - length(w) / (.75 + .5 * h.w)) * .8);
  }
#endif
  float dome = sqrt(clamp(e * mix(2.2, 1.2, big), 0., 1.));
  float s = 2.2 * (1. - dome) + mix(.25, .7, big);
  vec3 n = normalize(vec3(-v.x * s, 1., -v.y * s));
  float ao = (.12 + .88 * smoothstep(0., .24, e)) * (1. - sh);
  float gap = smoothstep(.07, .02, e);
  float g1 = texture(uN, P.xz * 7.).r, g2 = texture(uN, P.xz * 19. + .5).g;
  float pt = texture(uN, P.xz * .23 + .4).b;
  vec3 alb;
  if (kind < .5) {
    alb = mix(vec3(.07, .075, .085), vec3(.17, .165, .155), h.z);
    alb = mix(alb, vec3(.16, .12, .09), step(.92, h.w));
    alb *= .8 + .35 * texture(uN, (P.xz + h.xy * 3.) * vec2(2., 24.)).b;
  } else if (kind < 1.5) {
    alb = mix(vec3(.22, .2, .19), vec3(.4, .36, .34), h.z);
    alb = mix(alb, vec3(.34, .23, .19), step(.78, h.w) * .7);
    alb *= .8 + .3 * g1;
    alb = mix(alb, vec3(.05), step(.9, g2) * .6);
  } else {
    float isP = step(.86, h.z) * step(.35, dome);
    vec3 sand = vec3(.3, .26, .2) * (.88 + .22 * g1);
    float rm = sin(P.z * 34. + P.x * 6. + texture(uN, P.xz * .35).b * 10.);
    vec3 ns = normalize(vec3(0., 1., rm * .04));
    alb = mix(sand, vec3(.2, .19, .18) * (.7 + .5 * h.w), isP);
    n = normalize(mix(ns, n, isP)); ao = mix(.95, ao, isP);
  }
  if (kind < 1.5) {
    alb = mix(alb, vec3(.3, .29, .27) * (.8 + .3 * g1), step(.955, h.x));             // a pale one now and then
    alb *= (.66 + .68 * pt) * (1. + big * .25 * (texture(uN, P.xz * 2.3).b - .4));       // sorted patches; mottled cobbles
  }
  alb = mix(alb, vec3(.05, .048, .045) * (.5 + texture(uN, P.xz * 31.).r), gap * step(kind, 1.5));
#ifdef DOWN
  if (P.y < 0.) {
    float sg = smoothstep(.1, .02, e) * step(kind, 1.5);
    alb *= .8 + .4 * texture(uN, P.xz * 1.3 + h.xy).r;                                        // the grain of each stone
    alb = mix(alb, vec3(.21, .19, .145) * (.55 + .6 * texture(uN, P.xz * 9.).r) * (.7 + .6 * pt), sg);
    alb = mix(alb, vec3(.12, .12, .08), .12) * 1.45;                                           // a film of silt, wet not dark
    ao = mix(ao, .75, sg); n = normalize(mix(n, vec3(0., 1., 0.), sg));
  }
#endif
  float wz = zw(P.x) - P.z;
  if (uPeb.w > 0.) alb = mix(alb, vec3(.045, .04, .02), uPeb.w * smoothstep(.13, .0, abs(wz - .7 - .25 * texture(uN, P.xz * .3).b)) * step(.42, texture(uN, P.xz * 1.7).b));
  // wet where the water has just been, damp and darker a little further up, with a ragged upper edge
  float wl = P.y - .014 * (texture(uN, P.xz * .9).b - .5) - .03 * (pt - .5);
  float wet = smoothstep(.024, .008, wl), damp = smoothstep(.085, .03, wl);
  alb *= 1. - .42 * max(damp * .8, wet);
  vec3 col = alb * (uAmb * (.5 + .5 * n.y) * ao + uSunC * .4 * max(dot(n, uSunD), 0.) * ao);
  vec3 r = reflect(d, n);
  float fr = .03 + .97 * pow(1. - max(dot(-d, n), 0.), 5.);
  col += (wet * .45 + damp * .1 + (kind < 1.5 ? .17 : .06)) * fr * skyG(r) * ao
#ifdef DOWN
    * step(0., P.y)                      // under the water a stone has no sheen of its own
#endif
  ;
  return col;
}
vec4 iceC(vec3 W, float e1){
  float dist = length(W.xz);
  float far = clamp(dist / 45., 0., 1.);
  float e2 = abs(texture(uN, W.xz * .21 + 3.).b - .5);
  float cr = (smoothstep(.02, .0, e1) * .55 + smoothstep(.012, .0, e2) * .35) * (1. - far) * (.4 + .6 * texture(uN, W.xz * .2).b);
  float bub = step(.975, texture(uN, W.xz * 5.).r) * (1. - far) * (.5 + .5 * texture(uN, W.xz * .4).b);
  vec3 c = vec3(.004, .009, .013) + uAmb * vec3(.04, .06, .07);
  c += uAmb * .6 * (cr + bub * .6) * vec3(.85, .92, 1.);
  float sn = 0.;
  float nb = texture(uN, W.xz * .09 + .2).b, nf = texture(uN, W.xz * .9).a;
  if (uIce < 1.5) sn = .12 + smoothstep(.62, .74, nb) * .6;
  else if (uIce < 2.5) sn = .5 + .25 * nf;
  else sn = .22 + smoothstep(.46, .58, nb + nf * .2 - .1) * .75;
  vec3 snow = uAmb * vec3(.9, .93, 1.) * (.8 + .3 * nf);
  return vec4(mix(c, snow, sn), 1. - sn);
}
vec4 ground(vec3 d){
  float tw = EH / max(-d.y, 1e-4);
  vec3 W = EYE + d * tw;
  float den = d.y + uSlope * d.z;
  int kind = 2; vec3 P = W; float edge = 1., st = 0.;
  if (den < 0.) {
    float t = (uSlope * zw(W.x) - EHB) / den;
    P = EYE + d * t;
    t = (uSlope * zw(P.x) - EHB) / den; P = EYE + d * t;
    if (P.y > 0.) kind = 0;
  }
  if (kind == 2 && uSpit.x != 0.) {
    vec2 s0 = vec2(uSpit.x * 1.3, zw(uSpit.x * 1.3) - .4);
    vec2 dir = vec2(sin(uSpit.w), cos(uSpit.w)), pp = vec2(dir.y, -dir.x);
    vec2 q = W.xz - s0;
    float along = dot(q, dir), across = dot(q, pp);
    st = along / uSpit.y;
    float wd = uSpit.z * sqrt(max(0., 1. - st * st)) * (.8 + .4 * texture(uN, vec2(along * .05, .7)).b);
    if (along > 0. && st < 1. && abs(across) < wd) { kind = 1; edge = 1. - abs(across) / wd; P = vec3(W.x, .025 * edge * (1. - st), W.z); }
  }
  vec3 B = W; float s = 0.;
  if (kind == 2 && uIce < .5) {
    vec3 dt = refract(d, vec3(0., 1., 0.), .75);
    s = uSlope * (zw(W.x) - W.z) / (dt.y + uSlope * dt.z);
    if (s <= 0. || s > 12.) return vec4(uWatC, 1.);
    B = W + dt * s;
  }
#ifdef DOWN
  // seen from above, the lake bed is the beach run on under the water: the same sorting, cobbles and tone
  bool bed = kind == 2 && uIce < .5;
  if (bed) { kind = 0; P = B; }
#endif
  vec2 g = kind < 2 ? P.xz / uPeb.x : (uIce > .5 ? W.xz * .33 : B.xz / uPeb.x);
  vec2 v; vec4 h;
  float e = 0., big = 0., sh = 0., an = kind == 2 && uIce > .5 ? 0. : (uPeb.y < .5 ? 1.9 : 1.3);
  // the beach in two sizes: cobbles on a coarse grid where its cell holds one, pebbles everywhere else
  for (int k = kind < 2 && uPeb.y < 1.5 ? 0 : uOne; k <= uOne; k++) {
    e = vor(k == 0 ? g * .36 + 5.3 : g, an, v, h);
    if (k == 0 && h.x > .6) { if (e > .2) { big = 1.; e = (e - .2) * 1.5; break; } sh = .55 * smoothstep(.05, .2, e); }
  }
  if (kind < 2) {
    vec3 bc = beach(P, d, e, v, h, big, sh);
#ifdef DOWN
    if (bed) { vec3 tb = exp(-uWat.rgb * s); return vec4(bc * tb * tb + uWatC * (1. - tb), 1.); }
#endif
    if (kind == 0) return vec4(bc, 0.);
    float w = smoothstep(0., .35, edge); return vec4(mix(uWatC, bc * (.6 + .3 * w), smoothstep(0., .12, edge)), 1. - smoothstep(0., .2, edge));
  }
  if (uIce > .5) return iceC(W, e);
  vec3 alb = (uPeb.y < 1.5 ? mix(vec3(.06, .065, .06), vec3(.18, .17, .14), h.z) * (.35 + .65 * smoothstep(0., .15, e)) : vec3(.26, .22, .16) * (.8 + .3 * texture(uN, B.xz * 5.).r));
  vec3 tr = exp(-uWat.rgb * s);
  return vec4(alb * uAmb * .9 * tr * tr + uWatC * (1. - tr), 1.);
}
void main(){
  vec3 d0 = rayDir(vS);
  if (d0.y > -.0002) discard;
  if (EH * length(d0.xz) / -d0.y > dShore(atan(d0.x / d0.z))) discard;
#ifdef ISLE
  if (abs(atan(d0.x / d0.z) - uIs.x) < uIs.y * (1. + uIs.z) + .01 && EH * length(d0.xz) / -d0.y > uDi) discard;   // behind the island: program A
#endif
  vec3 acc = vec3(0.); float wa = 0., n = 0.;
  for (int i = 0; i < uSS; i++) {
    vec2 off = (vec2(float(i & 1), float(i >> 1)) - .5) * (uSS > 1 ? .5 : 0.) / uRes;
    vec4 r = ground(rayDir(vS + off));
    acc += r.rgb; wa += r.a; n += 1.;
  }
  o = enc(acc / n, wa / n);
}`,Kt=Me+Te+`
layout(location=0) in vec2 aQ;
layout(location=1) in vec4 aA; layout(location=2) in vec4 aB; layout(location=3) in vec4 aM;
uniform mat4 uVP; uniform float uMir, uRes;
out vec3 vW, vSide, vToC; out float vX, vCov, vAl; out vec4 vM;
void main(){
  vec3 p0 = aA.xyz, p1 = aB.xyz;
  if (uMir > .5) { p0.y = -p0.y; p1.y = -p1.y; }
  vec3 ax = p1 - p0; float len = max(length(ax), 1e-4); vec3 an = ax / len;
  float ext = aM.z > .5 ? 0. : 1.;
  float s = aQ.x * (1. + 2. * ext * max(aA.w, aB.w) / len) - ext * max(aA.w, aB.w) / len;
  vec3 mid = p0 + ax * s;
  vec3 toC = normalize(EYE - mid);
  vec3 side = normalize(cross(an, toC));
  float r = mix(aA.w, aB.w, clamp(s, 0., 1.));
  float dc = max(dot(mid - EYE, CF), .1);
  float px = dc * 2. * TH / uRes;
  float rw = max(r, px * .75);
  vCov = r / rw;
  vec3 w = mid + side * aQ.y * rw;
  vW = w; vSide = side; vToC = toC; vX = aQ.y; vM = aM; vAl = s;
  gl_Position = uVP * vec4(w, 1.);
}`,jt=Me+Te+`
in vec3 vW, vSide, vToC; in float vX, vCov, vAl; in vec4 vM; out vec4 o;
uniform vec3 uAmb, uSunD, uSunC, uHorS, uFogC; uniform float uMir, uHz; uniform vec4 uFog;
void main(){
  float wy = uMir > .5 ? -vW.y : vW.y;
  if (wy < 0.) discard;
  float x = vX, m = vM.x, sd = vM.y, ed = 1.;
  // old timber is never a clean cylinder: a worn, uneven outline and a chipped, sloping top; a bulrush head is a spindle
  if (m < .5) {
    ed = 1. - .14 * texture(uN, vec2(sd * 7., wy * .3)).b - .07 * texture(uN, vec2(sd * 3. + .5, wy * 1.7)).a;
    if (vM.z > .5 && vAl > .985 - .05 * texture(uN, vec2(x * .3 + sd * 5., sd * 3.)).b) discard;
  } else if (m > 2.5 && m < 3.5) ed = pow(sin(3.1416 * clamp(vAl, .03, .97)), .45);
  float aa = clamp((ed - abs(x)) / max(fwidth(x), 1e-3) * .7, 0., 1.);
  float cov = vCov * aa;
  if (cov < .01) discard;
  x = clamp(x / ed, -1., 1.);
  vec3 n = normalize(vSide * x + vToC * sqrt(max(0., 1. - x * x)));
  if (uMir > .5) n.y = -n.y;
  float g = texture(uN, vec2(vAl * 3. + sd, x * .3 + sd * 2.)).b;
  vec3 alb;
  if (m < .5) {
    alb = vec3(.15, .125, .1) * (.55 + .8 * texture(uN, vec2(x * .4 + sd, wy * 1.6)).b);
    alb = mix(alb, vec3(.2, .19, .18), .4 * smoothstep(.3, .9, wy));                                    // bleached silver above
    alb *= 1. - .6 * smoothstep(.035, .0, abs(texture(uN, vec2(x * .22 + sd * 11., wy * .05)).a - .5));   // checks down the grain
    alb = mix(alb, vec3(.03, .04, .025), smoothstep(.35, .05, wy) * .85);                               // wet and green at the water
  }
  else if (m < 1.5) alb = vec3(.12, .11, .055) * (.75 + .5 * g);
  else if (m < 2.5) alb = vec3(.08, .1, .045) * (.75 + .5 * g);
  else if (m < 3.5) alb = vec3(.1, .055, .025) * (.8 + .4 * g);
  else alb = vec3(.3, .26, .17) * (.8 + .4 * g);
  vec3 col = alb * (uAmb * (.55 + .45 * n.y) + uSunC * .5 * max(dot(n, uSunD), 0.));
  float back = pow(max(dot(-vToC, uSunD), 0.), 3.);
  col += uSunC * alb * 2.5 * back * pow(abs(x), 4.);
  float dist = length(vW - EYE);
  col = mix(col, uFogC, clamp(uFog.x * .4 * (1. - exp(-dist / uFog.z * 3.)), 0., 1.));
  o = vec4(enc(col, cov).rgb, cov);
}`,Qt=Me+Te+C0+`
in vec2 vS; out vec4 o;
uniform sampler2D uScene, uRefl, uG;
uniform float uT, uRes, uIce, uStar, uSlope, uSpecP;
uniform vec4 uE[48]; uniform int uNE;
uniform vec4 uCalm, uFog, uSh, uFire, uFireS;
uniform vec3 uSpecD, uSpecC, uFogC, uFoamC;
uniform vec4 uShd[6];
uniform vec4 uTr[4];
float starF(vec3 d){
  vec2 g = vec2(atan(d.x / d.z), d.y) * 430.;
  vec2 c = floor(g);
  vec4 h = texelFetch(uN, ivec2(mod(c, 256.)), 0);
  vec4 k = texelFetch(uN, ivec2(mod(c + vec2(37., 151.), 256.)), 0);
  vec2 f = fract(g) - (.25 + .5 * h.rg);
  return smoothstep(.992, 1., k.r) * (.4 + 2.6 * k.g * k.g) * exp(-dot(f, f) * 30.);
}
void main(){
  vec4 s = texture(uScene, vS);
  vec3 base = dec(s.rgb);
  vec3 d = rayDir(vS);
  vec3 col = base;
  float pa = 2. * TH / uRes;
  if (s.a > .05 && d.y < 0.) {
    float tw = EH / max(-d.y, 2e-4);
    vec3 W = EYE + d * tw;
    float fpx = tw * pa, fpz = fpx / max(-d.y, .003);
    vec2 sl = vec2(0.);
    float still = 1. - .93 * uCalm.w;
    vec2 g1 = texture(uG, W.xz * .07 + uT * vec2(.0021, .0013)).rg - .5;
    vec2 g2 = texture(uG, W.xz * .31 + uT * vec2(-.006, .0075)).ba - .5;
    vec2 g3 = texture(uG, W.xz * .93 + uT * vec2(.011, -.008)).rg - .5;
    float cp = smoothstep(.52, .7, texture(uN, W.xz * .012 + uT * vec2(.0045, .0012)).b);
    float amp2 = uCalm.y + uCalm.z * cp;
    sl += g1 * uCalm.x * still + (g2 * .6 + g3 * .4) * amp2 * still;
    if (uIce > 0.) sl += (texture(uG, W.xz * .45).rg - .5) * .05 + (texture(uG, W.xz * 1.7 + .3).ba - .5) * .03;
    float foam = 0., frost = 0.;
    for (int i = 0; i < uNE; i++) {
      vec4 e = uE[i];
      vec2 dv = W.xz - e.xy;
      float r = length(dv) + 1e-4;
      float age = e.z;
      if (e.w < 0.) { frost += -e.w * exp(-r * r / .006) * (.4 + .6 * exp(-age * .5)); continue; }
      float R = .02 + .33 * age, w = .045 + .09 * sqrt(age);
      // the splash: a short flash where the stone touched, and a thin crown running out ahead of the rings
      float fp2 = fpx * fpz * 1.5, sg = .0025 + age * .02, sgf = sg + fp2;
      float Rc = .03 + .62 * age, wq = .0008 + age * .004, wqf = wq + fp2;
      foam += e.w * (exp(-r * r / sgf) * sqrt(sg / sgf) * max(0., 1. - age * (e.w > 1.35 ? 1.3 : 4.5))
                   + .8 * exp(-(r - Rc) * (r - Rc) / wqf) * sqrt(wq / wqf) * max(0., 1. - age * 2.4)) * (1. + .08 * tw);
      if (r > R + 3.5 * w + 2. * fpz || r < .6 * R - 3.5 * w - 2. * fpz) continue;
      vec2 rd = dv / r;
      float fpr = length(rd * vec2(fpx, fpz));
      float A = e.w * .0055 * exp(-age * .2) / sqrt(1. + 2.5 * r);
      float k1 = 6.283 / (.07 + .05 * sqrt(age)), k2 = k1 * 1.7;
      float x1 = r - R, x2 = r - .6 * R;
      float s1 = A * k1 * exp(-x1 * x1 / (w * w)) * cos(k1 * x1) * exp(-.5 * k1 * k1 * fpr * fpr);
      float s2 = .6 * A * k2 * exp(-x2 * x2 / (w * w * .6)) * cos(k2 * x2) * exp(-.5 * k2 * k2 * fpr * fpr);
      float s3 = -A * 1.4 * (1. + tw * .12) * x1 / (w * w) * exp(-x1 * x1 / (w * w));
      sl += rd * (s1 + s2 + s3);
    }
    if (uIce > 0.) {
      for (int i = 0; i <= uOne * 3; i++) {
        vec4 t = uTr[i];
        if (t.x == t.z && t.y == t.w) continue;
        vec2 ab = t.zw - t.xy, ap = W.xz - t.xy;
        float h = clamp(dot(ap, ab) / dot(ab, ab), 0., 1.);
        float dd = length(ap - ab * h);
        frost += .12 * smoothstep(.008 + fpx, 0., dd);
      }
    }
    float rough = amp2 * still * smoothstep(.02, .3, fpz);
    vec3 n = normalize(vec3(-sl.x, 1., -sl.y));
    vec3 r = reflect(d, n);
    r.y = max(r.y, .0015);
    vec2 ru = toUV(vec3(r.x, -r.y, r.z));
    vec3 refl; float rsky = 1.;
    if (uIce > 0.) {
      float bl = uIce > 1.5 && uIce < 2.5 ? .01 : .005;
      refl = (dec(texture(uRefl, ru + vec2(bl, 0.)).rgb) + dec(texture(uRefl, ru - vec2(bl, 0.)).rgb) + dec(texture(uRefl, ru + vec2(0., bl * 1.5)).rgb) + dec(texture(uRefl, ru - vec2(0., bl * 1.5)).rgb)) * .25;
    } else if (rough > .01) {
      vec2 o2 = vec2(.004, .012) * rough * 6.;
      ru.y -= rough * .05;
      refl = (dec(texture(uRefl, ru).rgb) * 2. + dec(texture(uRefl, ru - o2).rgb) + dec(texture(uRefl, ru + o2 * vec2(-1., .4)).rgb)) * .25 * (1. - rough * .5);
    } else refl = dec(texture(uRefl, ru).rgb);
    rsky = step(texture(uRefl, ru).a, .01);
    float cosT = clamp(-dot(d, n), 0., 1.);
    float F = .02 + .98 * pow(1. - cosT, 5.);
    if (uIce > 0.) F *= .45;
    vec3 wc = mix(base, refl, F);
    wc += uSpecC * pow(max(dot(r, uSpecD), 0.), uSpecP) * F;
    wc += starF(r) * uStar * F * exp(-dot(refl, vec3(.3, .5, .2)) * 40.) * rsky;
    wc += uFoamC * clamp(foam, 0., 1.5) * .6;
    wc += uFoamC * clamp(frost, 0., 1.) * .5;
    if (uFire.w > 0.) wc += vec3(1., .4, .08) * uFire.w * F * 3. * pow(max(dot(r, normalize(uFire.xyz - W)), 0.), 60000.);
    wc = mix(wc, uFogC, (1. - exp(-tw * uFog.z)) * uFog.w);
    col = mix(base, wc, s.a);
  } else if (d.y > 0. && s.a < .01) {
    col += starF(d) * uStar * exp(-dot(base, vec3(.3, .5, .2)) * 40.);
  }
  if (s.a < .01 && d.y < 0.) {
    float den = d.y + uSlope * d.z;
    if (den < 0.) {
      vec3 P = EYE + d * ((uSlope * uSh.x - EHB) / den);
      float sh = 0.;
      for (int i = 0; i <= uOne * 5; i++) {
        vec4 b = uShd[i];
        if (b.z <= 0.) continue;
        vec2 q = (P.xz - b.xy) / vec2(b.z, b.z * .8);
        sh = max(sh, b.w * exp(-dot(q, q) * 1.6));
      }
      col *= 1. - sh;
      // the lake lapping at the pebbles: a film of water that slides a hand's width up the beach and back
      if (uIce < .5) {
        vec3 Q = P;
        for (int i = 0; i <= uOne; i++) Q = EYE + d * ((uSlope * (uSh.x + uSh.y * sin(Q.x * uSh.z + uSh.w) + .045 * min(Q.x * Q.x, 5.)) - EHB) / den);
        float lap = .004 + .0075 * textureLod(uN, vec2(Q.x * .11 + uT * .013, uT * .021), 0.).b * (1. - .6 * uCalm.w);
        if (Q.y < lap + .004) {
          vec3 rf = dec(texture(uRefl, vS).rgb);
          float Ff = .02 + .98 * pow(1. + d.y, 5.);
          col = mix(col, col * .8 + rf * Ff * 1.1, smoothstep(lap, lap - .0035, Q.y));
          col += rf * .1 * smoothstep(.0028, 0., abs(Q.y - lap));
        }
      }
    }
  }
  if (uFire.w > 0.) { vec2 fq = (vS - uFireS.xy) * uRes / uFireS.z; float f2 = dot(fq, fq); col += vec3(1., .4, .08) * uFire.w * (1.7 * exp(-f2 * .55) + .06 * exp(-f2 * .028)); }
  col *= 1. + uTw * 1.1 * exp(-abs(d.y) * 10.);          // the afterglow along the horizon outlasts the rest of the light
  vec3 g = grade(col);
  vec2 vq = vS - .5; g *= 1. - .1 * dot(vq, vq) * 2.;
  float dn = texelFetch(uN, ivec2(mod(gl_FragCoord.xy, 256.)), 0).r - .5;
  o = vec4(g + dn * 1.6 / 255., 1.);
}`,Zt=Me+Te+`
layout(location=0) in vec3 aP;
layout(location=1) in vec4 iPos; layout(location=2) in vec4 iScl; layout(location=3) in vec4 iRot; layout(location=4) in vec4 iMat;
uniform mat4 uVP; uniform float uMir;
out vec3 vW, vN, vL; out vec4 vMat; out float vType, vSeed;
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c, 0., -s, 0., 1., 0., s, 0., c); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1., 0., 0., 0., c, s, 0., -s, c); }
void main(){
  vec3 p = aP;
  float ty = iScl.w;
  if (ty > 5.5) { vec3 a = abs(p); p = p / pow(a.x * a.x * a.x * a.x + a.y * a.y * a.y * a.y + a.z * a.z * a.z * a.z, .25); }
  float bump = textureLod(uN, aP.xz * .3 + aP.y * .17 + iRot.w, 0.).b - .5;
  float bump2 = textureLod(uN, aP.xz * .9 + aP.y * .5 + iRot.w * 3.1, 0.).a - .5;
  vec3 q = p * (1. + bump * .3 + bump2 * (ty > 5.5 ? .22 : .08));
  vec3 ln = normalize(q / iScl.xyz);
  if (ty > 5.5) {
    // a rock, not a cushion: one split face, and a flat, slightly tilted top for the stones to lie on
    vec3 n2 = normalize(vec3(cos(iRot.w * 23.), .3, sin(iRot.w * 23.)));
    float d2 = dot(q, n2) - .72; if (d2 > 0.) { q -= n2 * d2; ln = normalize(n2 / iScl.xyz); }
    vec3 n1 = normalize(vec3(.1 * sin(iRot.w * 40.), 1., .08 * cos(iRot.w * 31.)));
    float d1 = dot(q, n1) - .8; if (d1 > 0.) { q -= n1 * d1; ln = normalize(n1 / iScl.xyz); }
  }
  vec3 lp = q * iScl.xyz;
  mat3 R = rotY(iRot.x) * rotX(-iRot.y) * rotY(iRot.z);
  vec3 w = iPos.xyz + R * lp, n = R * ln;
  if (uMir > .5) { w.y = -w.y; n.y = -n.y; }
  vW = w; vN = n; vL = aP; vMat = iMat; vType = ty; vSeed = iRot.w;
  gl_Position = uVP * vec4(w, 1.);
}`,Jt=Me+Te+C0+`
in vec3 vW, vN, vL; in vec4 vMat; in float vType, vSeed; out vec4 o;
uniform vec3 uAmb, uSunD, uSunC, uZen, uHor, uHorS; uniform float uMir, uRes, uSlope; uniform vec4 uSh; uniform sampler2D uScene;
void main(){
  if (uMir < .5 && vW.y < -.0005 && vMat.y < .5) discard;
  // a rock is bedded in the beach: the pebbles in front of it hide its foot
  float hg = 1.;
  if (vType > 5.5) {
    hg = vW.y - uSlope * (uSh.x + uSh.y * sin(vW.x * uSh.z + uSh.w) + .045 * min(vW.x * vW.x, 5.) - vW.z) - .03 * texture(uN, vW.xz * 5.).b;
    if (hg < 0.) discard;
  }
  if (uMir > .5) { if (vW.y > .0005) discard; if (texture(uScene, gl_FragCoord.xy / uRes).a < .5) discard; }
  vec3 n = normalize(vN);
  float ty = vType; vec3 L = vL;
  float n1 = texture(uN, L.xz * .45 + L.y * .3 + vSeed).b;
  float n2 = texture(uN, L.xz * 1.9 + L.y * .7 + vSeed * 3.).a;
  float g = texture(uN, L.xz * 3.1 + L.y * 1.3 + vSeed).r;
  vec3 alb;
  if (ty < .5) alb = mix(vec3(.065, .072, .082), vec3(.15, .15, .15), n1) * (.85 + .15 * sin(L.y * 30. + n2 * 6.));
  else if (ty < 1.5) { alb = mix(vec3(.24, .21, .2), vec3(.42, .38, .36), n1); alb = mix(alb, vec3(.04), step(.84, g) * .8); }
  else if (ty < 2.5) alb = mix(vec3(.09, .085, .08), vec3(.2, .18, .16), n1 * n2 * 2.);
  else if (ty < 3.5) { alb = mix(vec3(.3, .28, .25), vec3(.42, .39, .35), n1); float band = smoothstep(.09, .03, abs(L.x * .8 + L.z * .6 + (n2 - .5) * .2)); alb = mix(alb, vec3(.8, .79, .76), band); }
  else if (ty < 4.5) alb = mix(vec3(.55, .53, .5), vec3(.8, .78, .74), n1);
  else if (ty < 5.5) alb = mix(vec3(.14, .14, .15), vec3(.36, .32, .28), fract(vSeed * 7.13)) * (.8 + .4 * n1);
  else {
    alb = mix(vec3(.09, .09, .095), vec3(.2, .195, .185), n1) * (.7 + .6 * n2);
    float li = smoothstep(.72, .78, texture(uN, L.xz * 2.6 + 3.).b) * smoothstep(.3, .7, n.y) * step(.5, texture(uN, L.xz * 9.).r * .4 + .4);
    alb = mix(alb, vec3(.26, .22, .12), li * .55);
    if (vMat.z < .5) alb *= vec3(.8, .86, .98) * (.82 + .3 * smoothstep(.3, .7, texture(uN, vec2(L.x * .2 + L.z * .15, L.y * 2.6 + n1 * .25)).a));   // slate: bluer, bedded
    else alb = mix(alb * 1.5, vec3(.03), step(.8, g) * .7);                                                                                // granite: paler, speckled
    alb *= .4 + .6 * smoothstep(0., .08, hg);
  }
  if (ty > 5.5) { float b1 = texture(uN, L.xz * 1.6 + 1.3).a - .5, b2 = texture(uN, L.xz * 1.6 + 2.7).a - .5; n = normalize(n + vec3(b1, 0., b2) * .22); float cr = smoothstep(.015, .0, abs(texture(uN, L.xz * .9 + .4).b - .5)); alb *= 1. - .6 * cr; }
  float wet = vMat.x;
  alb *= 1. - .5 * wet;
  vec3 V = normalize(EYE - vW);
  vec3 col = alb * (uAmb * (ty > 5.5 ? .28 + .72 * max(n.y, 0.) : .5 + .5 * n.y) + uSunC * .55 * max(dot(n, uSunD), 0.));
  vec3 r = reflect(-V, n);
  float fr = .04 + .96 * pow(1. - max(dot(V, n), 0.), 5.);
  float ca = dot(normalize(r.xz + vec2(1e-5)), normalize(uSunD.xz + vec2(1e-5))) * .5 + .5;
  col += (wet * .7 + (ty > 5.5 ? .12 : ty > 3.5 ? .3 : .07)) * fr * mix(mix(uHor, uHorS, pow(ca, 5.) * .8), uZen, clamp(r.y * 2., 0., 1.)) * smoothstep(-.3, .05, r.y);
  col += uSunC * alb * (ty > 5.5 ? .4 : 2.) * pow(max(dot(-V, uSunD), 0.), 3.) * pow(1. - max(dot(V, n), 0.), 3.);
  if (uMir > .5) col *= .6;
  o = vec4(grade(col), vMat.w);
}`,$t=Me+Te+`
layout(location=0) in vec4 iO; layout(location=1) in vec4 iV;
uniform mat4 uVP; uniform float uTime, uRes;
out float vA;
void main(){
  float age = uTime - iO.w;
  vec3 p = iO.xyz + iV.xyz * age + vec3(0., -4.9 * age * age, 0.);
  float live = (age >= 0. && age < 2.5 && p.y > -.005) ? 1. : 0.;
  vec4 c = uVP * vec4(p, 1.);
  float sz = iV.w / (max(c.w, .05) * TH) * uRes * .5;
  gl_PointSize = clamp(sz * 1.3, 1.6, 14.);
  vA = live * clamp(sz, .45, 1.) * (1. - smoothstep(.9, 1.6, age));
  gl_Position = live > 0. ? c : vec4(2., 2., 2., 1.);
}`,eo=Me+Te+C0+`
in float vA; out vec4 o;
uniform vec3 uDropC;
void main(){
  float r = length(gl_PointCoord - .5);
  if (r > .5) discard;
  o = vec4(grade(uDropC * (1.2 - r)), vA * smoothstep(.5, .25, r));
}`;function to(a,t){const y=t.map(([m,W])=>{const L=a.createProgram(),H=[[a.VERTEX_SHADER,m],[a.FRAGMENT_SHADER,W]].map(([O,x])=>{const F=a.createShader(O);return a.shaderSource(F,x),a.compileShader(F),a.attachShader(L,F),F});return{p:L,sh:H}});return y.forEach(m=>a.linkProgram(m.p)),y}function vt(a,t){return t.map(y=>{if(!a.getProgramParameter(y.p,a.LINK_STATUS))throw new Error("Skimming shader: "+y.sh.map(L=>a.getShaderInfoLog(L)).join(" | ")+a.getProgramInfoLog(y.p));const m={},W=a.getProgramParameter(y.p,a.ACTIVE_UNIFORMS);for(let L=0;L<W;L++){const H=a.getActiveUniform(y.p,L);m[H.name.replace("[0]","")]=a.getUniformLocation(y.p,H.name)}return{p:y.p,u:m}})}function pt(a,t,y,m,W,L,H,O,x,F){const o=a.createTexture();return a.bindTexture(a.TEXTURE_2D,o),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,m,t,y,0,W,L,H),F&&a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,F?a.LINEAR_MIPMAP_LINEAR:O),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,O),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,x),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,x),o}function oo(){const t=new Uint8Array(262144),y=new Uint8Array(256*256*4);let m=967295969;const W=()=>(m^=m<<13,m^=m>>>17,m^=m<<5,(m>>>0)/4294967296),L=new Float32Array(256*256);for(let z=0;z<256*256;z++)L[z]=W();const H=(z,g)=>{const N=new Float32Array(65536);let $=1;for(let P=0;P<g;P++){const j=z<<P,Q=new Float32Array(j*j),x0=256/j;for(let me=0;me<j*j;me++)Q[me]=W();for(let me=0;me<256;me++){const v0=me/x0,je=v0|0,qe=v0-je,Ee=qe*qe*(3-2*qe),n0=je%j*j,Re=(je+1)%j*j;for(let ue=0;ue<256;ue++){const xe=ue/x0,Qe=xe|0,G=xe-Qe,re=G*G*(3-2*G),i0=Qe%j,U=(Qe+1)%j;N[me*256+ue]+=((Q[n0+i0]*(1-re)+Q[n0+U]*re)*(1-Ee)+(Q[Re+i0]*(1-re)+Q[Re+U]*re)*Ee)*$}}$*=.5}let he=1e9,D=-1e9;for(let P=0;P<256*256;P++){const j=N[P];j<he&&(he=j),j>D&&(D=j)}for(let P=0;P<256*256;P++)N[P]=(N[P]-he)/(D-he);return N},O=H(8,5),x=H(4,6),F=new Float32Array(256*256*2),o=new Float32Array(256*256*2);let E=0,A=0;for(let z=0;z<256;z++)for(let g=0;g<256;g++){const N=z*256+g,$=z*256+(g+1&255),he=z*256+(g-1&255),D=(z+1&255)*256+g,P=(z-1&255)*256+g;F[N*2]=O[$]-O[he],F[N*2+1]=O[D]-O[P],o[N*2]=x[$]-x[he],o[N*2+1]=x[D]-x[P],E=Math.max(E,Math.abs(F[N*2]),Math.abs(F[N*2+1])),A=Math.max(A,Math.abs(o[N*2]),Math.abs(o[N*2+1]))}for(let z=0;z<256*256;z++){const g=z*4,N=z>>8,$=z&255;t[g]=L[z]*255,t[g+1]=L[(N+17&255)*256+($+37&255)]*255,t[g+2]=O[z]*255,t[g+3]=x[z]*255,y[g]=(F[z*2]/E*.5+.5)*255,y[g+1]=(F[z*2+1]/E*.5+.5)*255,y[g+2]=(o[z*2]/A*.5+.5)*255,y[g+3]=(o[z*2+1]/A*.5+.5)*255}return{out:t,grad:y}}const mt=(a,t)=>t?a.replace(`#version 300 es
`,`#version 300 es
`+t.split(" ").map(y=>"#define "+y+`
`).join("")):a;function ao(a,t,y){let m=dt.get(a);const W=[["A"+t,N0,mt(Gt,t)],["B"+y,N0,mt(Xt,y)],["C",Kt,jt],["D",N0,Qt],["E",Zt,Jt],["F",$t,eo]].filter(A=>!m||!m[A[0]]);if(!W.length)return m;const L=to(a,W.map(A=>[A[1],A[2]]));if(m)return vt(a,L).forEach((A,z)=>{m[W[z][0]]=A}),m;const H=oo();m={nd:H.out},vt(a,L).forEach((A,z)=>{m[W[z][0]]=A}),m.noise=pt(a,256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,H.out,a.LINEAR,a.REPEAT,!0),m.grad=pt(a,256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,H.grad,a.LINEAR,a.REPEAT,!0),m.vaoF=a.createVertexArray(),a.bindVertexArray(m.vaoF);const O=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,O),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),a.STATIC_DRAW),a.enableVertexAttribArray(0),a.vertexAttribPointer(0,2,a.FLOAT,!1,0,0),a.bindVertexArray(null),m.quad=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,m.quad),a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,-1,0,1,1,-1,1,1]),a.STATIC_DRAW);const x=24,F=14,o=[],E=[];for(let A=0;A<=F;A++)for(let z=0;z<=x;z++){const g=A/F*Math.PI,N=z/x*J;o.push(Math.sin(g)*Math.cos(N),Math.cos(g),Math.sin(g)*Math.sin(N))}for(let A=0;A<F;A++)for(let z=0;z<x;z++){const g=A*(x+1)+z,N=g+x+1;E.push(g,g+1,N,g+1,N+1,N)}return m.sph=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,m.sph),a.bufferData(a.ARRAY_BUFFER,new Float32Array(o),a.STATIC_DRAW),m.sphI=a.createBuffer(),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,m.sphI),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array(E),a.STATIC_DRAW),m.nSph=E.length,a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,null),m.hdr=!!a.getExtension("EXT_color_buffer_float"),dt.set(a,m),m}const Ue=[{a:.031,th:.008,m:.062,CL:1,CF:.04,wc:15,vmax:17,edge:.035,scl:[.032,.0048,.028],vt:0},{a:.028,th:.019,m:.085,CL:.62,CF:.08,wc:25,vmax:15,edge:.035,scl:[.028,.0115,.026],vt:1},{a:.042,th:.024,m:.25,CL:.85,CF:.06,wc:12,vmax:12,edge:.035,scl:[.042,.0155,.036],vt:2},{a:.032,th:.006,m:.058,CL:1.1,CF:.008,wc:12,vmax:21,edge:.09,scl:[.033,.0042,.03],vt:3}],bt=1e3,wt=9.81,yt=1.2,no=.8,io=.004;function ro(a,t){return t<=0?0:t>=2*a?Math.PI*a*a:a*a*Math.acos(1-t/a)-(a-t)*Math.sqrt(Math.max(0,2*a*t-t*t))}function so(a){const t=a.gl,y=a.size,m=a.hash.slice(2);let W=parseInt(m.slice(0,8),16)>>>0,L=parseInt(m.slice(8,16),16)>>>0,H=parseInt(m.slice(16,24),16)>>>0,O=parseInt(m.slice(24,32),16)>>>0;const x=()=>{W>>>=0,L>>>=0,H>>>=0,O>>>=0;let e=W+L|0;return W=L^L>>>9,L=H+(H<<3)|0,H=H<<21|H>>>11,O=O+1|0,e=e+O|0,H=H+e|0,(e>>>0)/4294967296};for(let e=0;e<12;e++)x();const F=e=>{let n=0;for(const l of e)n+=l;let i=x()*n;for(let l=0;l<e.length;l++)if(i-=e[l],i<0)return l;return e.length-1},o=(e,n)=>e+(n-e)*x();let E=F([34,30,28,8]),A=F([36,27,22,15]),z=F([40,38,22]),g=F([45,30,25]),N=F([40,25,35]),$=F([58,15,15,12]),he=F([34,40,26]);const D=x()<.5?-1:1;E===3&&$===2&&($=3),a.home&&(E=0,A=0,z=0,g=0,N=0,$=0,he=1);const P=E===3;let j=(parseInt(m.slice(56,64),16)^3784715)>>>0;const Q=()=>{j=j+1831565813>>>0;let e=j;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},x0=Q(),me=Q(),v0=Q(),je=!a.home&&A===0&&(E===1||E===2)&&v0<.4;a.trait("Water",["Mountain lake","Sea loch","Mill pond","Frozen lake"][E]),a.trait("Light",je?"Last sun":["Golden dusk","Blue hour","Misty dawn","Moonrise"][A]),a.trait("Shore",["Slate pebbles","Round granite","Sand spit"][z]),a.trait("Calm",P?["Black ice","Hoar frost","Snow drifts"][g]:["Glass","Light ripple","Cat's-paws"][g]),a.trait("Sky",A===2?"Mist":["Clear","High streaks","Broken cloud"][he]),a.trait("Near water",["A jetty post","An old jetty","A reed bed"][N]),a.trait("Something rare",["Nothing","A fire on the far shore","Trout rising","A lucky stone"][$]);let qe=(parseInt(m.slice(40,48),16)^parseInt(m.slice(16,24),16)^1831565813)>>>0;const Ee=()=>{qe=qe+1831565813>>>0;let e=qe;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296};Ee();const n0=Ee(),Re=!a.home&&Ee()<.5;let ue=n0<.4?0:n0<.72?1:2;a.home&&(ue=0),a.trait("Standing",["A few steps up the beach","High on a wide beach","At the water's edge"][ue]);let xe=625341585;for(let e=0;e<64;e+=8)xe=Math.imul(xe^parseInt(m.slice(e,e+8),16),2654435761)^xe>>>16;xe=Math.imul(xe^xe>>>15,2246822507),xe^=xe>>>13;const Qe=(xe>>>0)/4294967296;let G=Qe<.55?0:Qe<.85?1:2;!a.home&&G!==2&&!P&&x0<.22&&(G=3),a.home&&(G=0),a.trait("View",["Eye level","Crouched by the water","From the bank above","Looking down at the water"][G]);const re=!a.home&&G!==3&&E!==2?me<.18?1:me<.34?2:0:0;a.trait("Out on the water",["Open water","An island","A wooded point"][re]);const i0=re?E===1?"ISLE WL":"ISLE WM":"",U=ao(t,i0,re?"ISLE":G===3?"DOWN":"");let p0=(parseInt(m.slice(48,56),16)^Math.imul(parseInt(m.slice(8,16),16),2654435761)^1374496523)>>>0;const oe=()=>{p0=p0+1831565813>>>0;let e=p0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296};oe();const ye=D*-1*o(.1,.3),be=(e,n)=>[Math.sin(e)*Math.cos(n),Math.sin(n),Math.cos(e)*Math.cos(n)];let M;if(A===0)M={sun:be(ye,-.022),sunC:[.9,.38,.1],zen:[.045,.075,.19],hor:[.42,.3,.3],horS:[1.5,.62,.22],amb:[.14,.115,.125],hz:1/6500,fog:[0,20,400,0],fogC:[.5,.4,.38],moon:[0,0,1,0],moonC:[0,0,0],specD:be(ye,.03),specC:[.9,.35,.08],specP:90,star:0,exp:.8,drop:[.9,.6,.45]};else if(A===1){const e=D*o(.05,.2),n=o(.12,.2);M={sun:be(ye*1.6,-.1),sunC:[.06,.03,.02],zen:[.01,.022,.07],hor:[.075,.075,.15],horS:[.22,.12,.1],amb:[.035,.045,.08],hz:1/5e3,fog:[0,20,400,0],fogC:[.06,.07,.12],moon:[...be(e,n),.0011],moonC:[1.2,1.2,1.25],specD:be(e,n),specC:[2.5,2.5,2.8],specP:2e4,star:.5,exp:3,drop:[.2,.22,.35]}}else if(A===2)M={sun:be(ye,.035),sunC:[.75,.52,.3],zen:[.22,.26,.34],hor:[.62,.58,.54],horS:[1.15,.88,.62],amb:[.36,.34,.34],hz:1/2400,fog:[.8,8,420,.4],fogC:[.62,.6,.58],moon:[0,0,1,0],moonC:[0,0,0],specD:be(ye,.035),specC:[1.4,1,.6],specP:500,star:0,exp:.85,drop:[1.2,1.1,1]};else{const e=D*-1*o(.04,.22),n=E===0||E===3?o(.2,.26):o(.06,.1);M={sun:be(e,n),sunC:[.05,.042,.03],zen:[.0035,.006,.016],hor:[.02,.024,.04],horS:[.05,.04,.035],amb:[.0075,.0095,.017],hz:1/4500,fog:[0,20,400,0],fogC:[.02,.022,.03],moon:[...be(e,n),.0075],moonC:[1,.86,.62],specD:be(e,n),specC:[3,2.6,1.8],specP:3e4,star:1,exp:7,drop:[.05,.05,.06]}}let ne,ve,Fe,ze,Ze,Je,m0,b0,w0,zt=0,y0=[0,0,1,0];const pe=[],L0=x(),D0=x(),_0=x();if(E===0||E===3?(ne=[o(420,650),2,o(8,22),0],ve=[L0,o(.5,.9),o(12,18),.3],Fe=[o(1500,2100),30,o(200,320),2],ze=[D0,o(.25,.45),0,0],Ze=[o(4500,6e3),100,o(550,850),2],Je=[_0,o(.4,.7),0,0],m0=P?[.06,.07,.075]:[.022,.032,.026],b0=[.06,.06,.045],w0=[.075,.07,.068],zt=P?1:o(.35,.75),ze[2]=9+oe()*3,ze[3]=1,pe.push([ne,ve],[[ne[0]*1.5+140+oe()*160,6+oe()*8,24+oe()*22,0],[oe(),.6+oe()*.5,14+oe()*5,1]],[Fe,ze],[Ze,Je]),oe()<.65&&pe.push([[9500+oe()*4e3,150,650+oe()*500,2],[oe(),.5+oe()*.4,0,0]])):E===1?(ne=[o(700,1100),3,o(45,90),1],ve=[L0,o(1,1.5),0,.35],Fe=[o(2400,3e3),30,o(200,320),1],ze=[D0,o(.8,1.2),0,0],Ze=[o(6500,8e3),80,o(380,560),1],Je=[_0,o(.7,1),0,0],m0=[.03,.035,.025],b0=[.07,.058,.04],w0=[.07,.065,.06],y0=[D*o(.12,.3),o(.05,.1),.3+oe()*.3,0],ve[2]=9+oe()*4,pe.push([ne,ve],[Fe,ze],[Ze,Je])):(ne=[o(120,170),.8,2.6,3],ve=[L0,o(1,1.6),o(7,12),.15],Fe=[o(380,520),4,o(8,16),0],ze=[D0,o(1.2,1.8),o(12,16),0],Ze=[o(2200,3e3),15,o(60,110),1],Je=[_0,o(.8,1.2),0,0],m0=[.045,.055,.028],b0=[.06,.06,.035],w0=[.07,.065,.06],ze[3]=1,pe.push([ne,ve],[Fe,ze],[Ze,Je])),je){let e=.03;if(E===2){const c=U.nd,p=Math.floor(ve[0]*251),s=(v,f)=>c[(p*256+(v%256+256)%256)*4+f]/255;for(let v=ye-.014;v<=ye+.014;v+=.002){const f=v*ne[0]/9,d=Math.floor(f);let h=0;for(let R=-1;R<=1;R++){const b=d+R,T=ve[2]*(.4+.75*s(b,0)*(.5+.5*s(b+97,0)))*(s(b,1)>=.3?1:0),r=(f-b-.5-(s(b,1)-.5)*.8)/(.4+.55*s(b+97,1));Math.abs(r)<1&&(h=Math.max(h,T*Math.sqrt(1-r*r)))}e=Math.max(e,(ne[1]+ne[2]+h*1.21-1.5)/ne[0],(Fe[1]+Fe[2]+ze[2]*1.1)/Fe[0]*.8)}}const n=E===1?y0[0]+y0[1]*(Q()-.5)*.6:ye,i=(E===1?.034:e+.012)+.02*Q(),l=be(n,i);M={...M,sun:l,sunC:[.3,.015,.002],zen:[.055,.088,.2],hor:[.34,.22,.21],horS:[1.15,.42,.13],amb:[.15,.12,.125],specD:l,specC:[4,1.4,.25],specP:600+900*Q(),exp:.72}}G===3&&(M.exp*=1.8);let Ce=[0,1,0,1],Le=0;if(re){const e=Math.atan2(M.sun[0],M.sun[2]),n=[Q(),Q(),Q(),Q(),Q(),Q(),Q()];let i,l,c,p;if(re===1)Le=ne[0]*(.45+.15*n[0]),p=.07+.05*n[1],c=e+(n[2]-.5)*.24,E===1?(i=[Le,2+2*n[3],1.5+2*n[4],.3],l=[n[5],.7+.4*n[6],9+3*n[4],n[3]<.3?0:.1+.25*n[6]]):(i=[Le,1+1.5*n[3],1.5+1.5*n[4],.3],l=[n[5],.5+.4*n[6],12+5*n[3],.55+.3*n[4]]);else{Le=ne[0]*(.3+.15*n[0]),p=.6;const s=-D*(1-2*(.3+.15*n[1]));c=Math.atan(s*fe)-D*p,i=[Le,1+n[3],2+2*n[4],.3],l=[n[5],.6+.4*n[6],15+4*n[3],.95+.1*n[4]]}if(Ce=[c,p,re===1?.25+.2*n[2]:.05+.05*n[2],Math.min(15/Le,.35*p)],re===1&&l[3]>.3){const s=U.nd,v=(h,R)=>{const b=Math.floor(h),T=h-b,r=T*T*(3-2*T),w=(R%256+256)%256,S=q=>s[(w*256+(q%256+256)%256)*4]/255;return S(b)+(S(b+1)-S(b))*r},f=(h,R)=>{const b=Math.floor(h*251),T=R*Le;return v(T/(l[2]*3.3),b+91)*.62+v(T/(l[2]*.8)+7,b+57)*.38},d=h=>Math.min(f(h,c-p*.5),f(h,c),f(h,c+p*.5))>.52;for(let h=0;h<40&&!d(l[0]);h++)l[0]=Q()}pe.unshift([i,l]),pe.length>5&&pe.pop()}const At=new Float32Array(20),St=new Float32Array(20);for(let e=0;e<5;e++)At.set(pe[e]?pe[e][0]:[0,0,0,9],e*4),St.set(pe[e]?pe[e][1]:[0,0,0,0],e*4);const co=E===0?[.9,.35,.3]:E===1?[1.4,.9,1]:E===2?[1.6,.9,1.6]:[.9,.4,.3],gt=(E===0?[.012,.022,.024]:E===1?[.016,.014,.01]:E===2?[.014,.018,.009]:[.01,.015,.02]).map((e,n)=>e*(M.amb[n]/.15)),lo=A===2?[0,0,0,0]:[he,o(0,10),he===1?o(.46,.52):o(.47,.53),A===3?.6:1],ke=[o(4.3,4.6),o(.12,.28),o(.6,1.1),o(0,J)];ue===1?ke[0]+=2.4+Ee()*1.2:ue===2&&(ke[0]-=.75+Ee()*.15);const r0=e=>ke[0]+ke[1]*Math.sin(e*ke[2]+ke[3])+.045*Math.min(e*e,5),z0=.07,I0=(e,n)=>z0*(r0(e)-n);let B0=r0(0);for(let e=-.8;e<=.8;e+=.1)B0=Math.max(B0,r0(e)-.25);const Mt=[null,[[0,I0(0,0)+.42,0],-2.5*K],[[0,3.4,-3.2],13*K],[[0,1.55,B0-1.1],23*K]],{EYE:se,CF:W0,CU:H0,VP:U0,toScreen:Tt}=G?ht(Mt[G][0],Mt[G][1]):Yt,k={...U,A:U["A"+i0],B:U["B"+(re?"ISLE":G===3?"DOWN":"")]},A0=e=>{e.u.EYE!=null&&(t.uniform3fv(e.u.EYE,se),t.uniform3fv(e.u.CF,W0),t.uniform3fv(e.u.CU,H0))},fo=z===2?[D,o(9,14),o(.9,1.4),D*o(.25,.45)]:[0,0,0,0],uo=[z===0?.055:z===1?.06:.07,z,x(),E===1?1:0],q0=P?[0,0,0,0]:g===0?[.022,.006,0,0]:g===1?[.035,.3,0,0]:[.022,.01,.42,0],ho=P?0:g===0?.4*K:g===1?3.5*K:.5*K,De=[],_e=(e,n,i,l,c,p)=>De.push(e[0],e[1],e[2],i,n[0],n[1],n[2],l,c,x(),p?1:0,0),Et=(e,n,i,l)=>{const c=o(0,J),p=o(.02,.08)*(x()<.5?-1:1)+l*.25,s=x()<.1?2+(x()*2|0):99;let v=[e,-.2,n],f=l*.3;const d=5,h=i/d;for(let r=0;r<d;r++){f+=r===s?o(1.5,2.3)*Math.sign(p):p;const w=[v[0]+Math.sin(f)*h,v[1]+Math.cos(f)*h,v[2]+Math.sin(f)*h*Math.sin(c)*.3];if(_e(v,w,.0062-r*8e-4,.0062-(r+1)*8e-4,1,!1),r>0&&r<4&&r<s&&x()<.8){const S=x()<.5?-1:1,q=o(.3,.62)*Math.min(i,1.7)/4,Z=o(-.3,.3);let B=w,le=f+S*o(.15,.4);for(let ae=0;ae<4;ae++){const de=[B[0]+Math.sin(le)*q,B[1]+Math.cos(le)*q,B[2]+Z*q];_e(B,de,.0072-ae*.0017,.0072-(ae+1)*.0017,2,!1),B=de,le+=S*o(.28,.6)}}v=w}if(s<99)return;const R=x(),b=Math.sin(f),T=Math.cos(f);if(R<.3){const r=[v[0]+b*.17,v[1]+T*.17,v[2]];_e(v,r,.0125,.0125,3,!1),_e(r,[r[0]+b*.12,r[1]+T*.12,r[2]],.0026,8e-4,1,!1)}else if(R<.6)for(let r=0;r<5;r++){const w=f+Math.sign(p)*o(.1,1.1),S=o(.1,.2);_e(v,[v[0]+Math.sin(w)*S,v[1]+Math.cos(w)*S,v[2]+o(-.03,.03)],.0045,.001,4,!1)}};if(N===0){const e=D*o(1.1,2.1),n=o(9,14),i=o(-.06,.06);_e([e,-.4,n],[e+i,o(.8,1.3),n+o(-.05,.05)],.09,.08,0,!0)}else if(N===1){const e=D*o(1,1.6),n=7+(x()*4|0);for(let i=0;i<n;i++){const l=5.6+i*o(2,2.6),c=e+D*i*.12;for(const p of[-.85,.85]){if(x()<.18)continue;const s=x()<.3?o(.15,.5):o(.7,1.25),v=c+p+o(-.05,.05);_e([v,-.4,l],[v+o(-.08,.08),s,l+o(-.08,.08)],o(.08,.12),o(.07,.11),0,!0)}x()<.35&&_e([c-.92,o(.5,.7),l],[c+.92,o(.5,.7),l],.04,.04,0,!0)}}else for(let n=0;n<190;n++){const i=x(),l=4.9+i*i*14,c=D*(o(1.4,2)+i*o(1.5,3.5)+o(-.15,.3));Et(c,l,o(1.3,2.1),D*o(0,.1))}for(let e=0;e<16;e++)Et(-D*o(1.3,1.95),r0(-D*1.6)+o(.15,.9),o(.8,1.6),-D*o(-.03,.12));if(G===3)for(let e=De.length-12;e>=0;e-=12)De[e+8]===0&&De[e+2]<se[2]+2.6&&De.splice(e,12);const Rt=De.length/12,xo=U.hdr?t.RGBA16F:t.RGBA8,S0=U.hdr?0:1,Ft=()=>{const e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e),t.texStorage2D(t.TEXTURE_2D,1,xo,y,y),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const n=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,n),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),{t:e,f:n}},O0=Ft(),kt=Ft();t.bindFramebuffer(t.FRAMEBUFFER,null);const Pt=t.createVertexArray();t.bindVertexArray(Pt),t.bindBuffer(t.ARRAY_BUFFER,U.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0);const vo=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,vo),t.bufferData(t.ARRAY_BUFFER,new Float32Array(De.length?De:[0,0,0,0,0,0,0,0,0,0,0,0]),t.STATIC_DRAW);for(let e=0;e<3;e++)t.enableVertexAttribArray(1+e),t.vertexAttribPointer(1+e,4,t.FLOAT,!1,48,e*16),t.vertexAttribDivisor(1+e,1);const Nt=72,ee=new Float32Array(Nt*16),Ct=t.createVertexArray();t.bindVertexArray(Ct),t.bindBuffer(t.ARRAY_BUFFER,U.sph),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,3,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0);const Lt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Lt),t.bufferData(t.ARRAY_BUFFER,ee,t.DYNAMIC_DRAW);for(let e=0;e<4;e++)t.enableVertexAttribArray(1+e),t.vertexAttribPointer(1+e,4,t.FLOAT,!1,64,e*16),t.vertexAttribDivisor(1+e,1);t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,U.sphI);const g0=512,we=new Float32Array(g0*8);for(let e=0;e<g0;e++)we[e*8+3]=-100;const Dt=t.createVertexArray();t.bindVertexArray(Dt);const _t=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,_t),t.bufferData(t.ARRAY_BUFFER,we,t.DYNAMIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,32,0),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,16),t.bindVertexArray(null);let V0=0,Y0=!0;const u=(e,n,i)=>{const l=e.u[n];l!=null&&(typeof i=="number"?t.uniform1f(l,i):i.length===2?t.uniform2fv(l,i):i.length===3?t.uniform3fv(l,i):i.length===4?t.uniform4fv(l,i):i.length===16?t.uniformMatrix4fv(l,!1,i):t.uniform4fv(l,i))},Ie=(e,n,i,l)=>{const c=e.u[n];c!=null&&(t.activeTexture(t.TEXTURE0+i),t.bindTexture(t.TEXTURE_2D,l),t.uniform1i(c,i))},G0=e=>{A0(e),Ie(e,"uN",0,U.noise),u(e,"uEnc",S0),e.u.uOne!=null&&t.uniform1i(e.u.uOne,1),u(e,"uL0",ne),u(e,"uP0",ve),u(e,"uSunD",M.sun),u(e,"uSunC",M.sunC),u(e,"uZen",M.zen),u(e,"uHor",M.hor),u(e,"uHorS",M.horS),u(e,"uAmb",M.amb),u(e,"uFog",M.fog),u(e,"uFogC",M.fogC),u(e,"uHz",M.hz),u(e,"uRes",y)};function po(){t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.viewport(0,0,y,y);for(const e of[0,1])t.bindFramebuffer(t.FRAMEBUFFER,e?kt.f:O0.f),t.disable(t.BLEND),t.useProgram(k.A.p),G0(k.A),u(k.A,"uMir",e),t.uniform4fv(k.A.u.uLs,At),t.uniform4fv(k.A.u.uPs,St),t.uniform1i(k.A.u.uNL,pe.length),u(k.A,"uMoon",M.moon),u(k.A,"uMoonC",M.moonC),u(k.A,"uCl",lo),u(k.A,"uGap",y0),u(k.A,"uSnow",zt),u(k.A,"uAlbT",m0),u(k.A,"uAlbH",b0),u(k.A,"uAlbR",w0),u(k.A,"uIs",Ce),u(k.A,"uWatC",gt),t.bindVertexArray(U.vaoF),t.drawArrays(t.TRIANGLES,0,3),e||(t.useProgram(k.B.p),G0(k.B),u(k.B,"uSh",ke),u(k.B,"uSpit",fo),u(k.B,"uPeb",uo),u(k.B,"uWat",[...co,0]),u(k.B,"uWatC",gt),u(k.B,"uIs",Ce),u(k.B,"uDi",Le),u(k.B,"uSlope",z0),u(k.B,"uIce",P?g+1:0),t.uniform1i(k.B.u.uSS,y>=600?4:1),t.drawArrays(t.TRIANGLES,0,3)),Rt&&(t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.CONSTANT_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.blendColor(0,0,0,.02),t.useProgram(k.C.p),G0(k.C),u(k.C,"uVP",U0),u(k.C,"uMir",e),t.bindVertexArray(Pt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Rt),t.disable(t.BLEND));t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindVertexArray(null)}let _=0;const Ae=[],Pe=(e,n,i)=>{Ae.push({x:e,z:n,t0:_,amp:i}),Ae.length>48&&Ae.shift()},s0=(e,n,i,l,c,p,s,v)=>{const f=V0*8;V0=(V0+1)%g0,we[f]=e,we[f+1]=n,we[f+2]=i,we[f+3]=_+(v||0),we[f+4]=l,we[f+5]=c,we[f+6]=p,we[f+7]=s,Y0=!0},M0=[],$e=[],te=[];let Be=$===3?3:0;const e0=$===3?[0,1,2,3]:[0,1,2],V={x:-.86,z:3.22,rx:.5,ry:.15,rz:.36,yaw:.2,seed:.71};(ue>0||Re)&&(V.x=Re?.78:-.9,V.yaw=Re?-.25:.2,ue===1&&(V.z=3.6+Ee()*.6,V.x*=1.15)),V.y=I0(V.x,V.z)+.02;const X={x:.8,z:3.25,rx:.3,ry:.13,rz:.22,yaw:-.35,seed:.23};(ue>0||Re)&&(X.x=Re?-.72:.8,X.yaw=Re?.3:-.35,ue===2&&(X.z=3.12)),X.y=I0(X.x,X.z)+.02;const It=(e,n,i)=>{const l=.1*Math.sin(e.seed*40),c=.08*Math.cos(e.seed*31);return e.y+e.ry*(.8*Math.hypot(l,1,c)-l*n/e.rx-c*i/e.rz)},Bt=[[-.15,-.05],[0,.07],[.14,-.07],[.03,-.12]].map(([e,n],i)=>{const l=Math.cos(X.yaw),c=Math.sin(X.yaw);return{x:X.x+l*e+c*n,z:X.z-c*e+l*n,y:It(X,e,n),k:i,yaw:o(0,J),seed:x()}}),c0=Array.from({length:60},()=>x());let l0={n:0,at:[],fade:-1},We={n:0,at:[]},T0=-1,X0=!1;const Ne=22050,Oe=[];let Ve=625341585,K0=0,j0=0,Q0=o(.5,2),f0=0,Z0=0,J0=o(2,6),$0=o(20,60);const et=new Float32Array(Math.floor(Ne*.41));let E0=0;const Ye=()=>(Ve^=Ve<<13,Ve^=Ve>>>17,Ve^=Ve<<5,(Ve>>>0)/2147483648-1),ie=e=>{a.sound.on&&Oe.length<28&&(e.t=-(e.delay||0),e.ph=0,Oe.push(e))},R0=(e,n)=>1/(1+Math.hypot(e,n)/9);function mo(e,n){const i=new Float32Array(e),l=P?.3:g===0?.35:1;for(let p=0;p<e;p++){const s=Ye();K0+=(s-K0)*.08,j0+=(K0-j0)*.08,f0*=.99993,i[p]=j0*(.012+f0*.25)*l+(z!==2&&f0>.05&&Ye()>.9993?Ye()*.05*f0:0)}Q0-=n,Q0<0&&!P&&(f0=o(.35,.8),Q0=o(1.6,3.6));const c=new Float32Array(e);for(let p=Oe.length-1;p>=0;p--){const s=Oe[p];for(let v=0;v<e;v++){const f=s.t;if(s.t+=1/Ne,f<0)continue;let d=0;if(s.k===0)d=s.a*(Math.exp(-f/.011)*Math.sin(J*s.f*f)+.5*Ye()*Math.exp(-f/.0018));else if(s.k===1){const h=s.f*(1+.7*(1-Math.exp(-f/.05)));s.ph+=J*h/Ne,d=s.a*(Math.exp(-f/.08)*Math.sin(s.ph)*.8+.7*Math.sin(J*70*f)*Math.exp(-f/.05)+.4*Ye()*Math.exp(-f/.06))}else if(s.k===2){const h=s.f1+(s.f0-s.f1)*Math.exp(-f/.05);s.ph+=J*h/Ne,d=s.a*(Math.sin(s.ph)*Math.exp(-f/.2)+.25*Ye()*Math.exp(-f/.004))}else if(s.k===3)d=s.a*Math.exp(-f/.007)*(Math.sin(J*s.f*f)+.6*Math.sin(J*s.f*1.47*f));else if(s.k===4){const h=s.notes;let R=0,b=0;for(const T of h)if(f>=T[0]&&f<T[0]+T[1]){const r=(f-T[0])/T[1];R=T[2]+(T[3]-T[2])*r+T[4]*Math.sin(J*30*f),b=Math.min(1,r*12,(1-r)*8)}R>0&&(s.ph+=J*R/Ne,d=s.a*b*Math.sin(s.ph))}else if(s.k===5){const h=f/s.dur,R=h<.25?a0(620,1e3,h/.25):h<.7?1e3+18*Math.sin(J*5.5*f):a0(1e3,820,(h-.7)/.3);s.ph+=J*R/Ne,d=s.a*Math.min(1,h*10,(1-h)*5)*(Math.sin(s.ph)+.25*Math.sin(2*s.ph))}else if(s.k===7)d=s.a*Math.exp(-f/.4)*Ye();else if(s.k===8){const h=f/s.dur;s.ph+=J*390/Ne,d=s.a*Math.sin(Math.PI*Math.min(1,h))*Math.sin(s.ph)}(s.bus?c:i)[v]+=d}s.t>s.dur&&Oe.splice(p,1)}for(let p=0;p<e;p++){const s=et[E0],v=c[p]+s*.3;et[E0]=v,E0=(E0+1)%et.length,i[p]=Math.tanh((i[p]+c[p]+s*.45)*1.4)*.8}return i}const Wt=(e,n)=>{const i=.5*R0(e.x,e.z)*ge(n/10,.25,1);P?(ie({k:2,a:i*.8,f0:5200,f1:o(650,900),dur:.7}),ie({k:2,a:i*.35,f0:4200,f1:700,dur:.6,delay:.07}),ie({k:3,a:i*.6,f:2600,dur:.05})):ie({k:0,a:i,f:1100+2400*ge(1-n/16,0,1)+o(-80,80),dur:.09})},tt=(e,n)=>ie({k:1,a:.7*R0(e.x,e.z)*n,f:[520,430,300,540][e.k]*o(.9,1.1),dur:.4});function F0(e,n,i,l,c,p){const s=Ue[e],v={k:e,T:s,x:.22,z:G===3?se[2]+.5:.5,y:G===3?se[1]-1.05:.45,hx:Math.sin(c),hz:Math.cos(c),vs:n*Math.cos(-K),vy:n*Math.sin(-K),al:i,ald:0,spin:l,ang:0,inC:!1,cT:0,exitT:-1,t:0,mode:0,skips:0,slope:0,user:p,wet:0,sinkT:0,ringT:0,roll:0};return te.push(v),te.length>4&&te.shift(),l0={n:0,at:[],fade:_},p&&!X0&&(We={n:0,at:[]}),p&&(X0=!0),v}function Ht(e){e===te[te.length-1]&&(l0.n=e.skips,l0.at[e.skips-1]=_,ie({k:3,a:.14,f:2900+o(-200,300),dur:.04,delay:.22}))}function k0(e){e===te[te.length-1]&&(e.user||!X0)&&e.skips>We.n&&(We.n=e.skips,We.at=[],T0=_+.6)}function bo(e,n){const i=8+Math.min(18,n*1.3)|0;for(let l=0;l<i;l++){const c=o(.12,.5)*n,p=o(-.45,.45),s=Math.cos(p),v=Math.sin(p);s0(e.x,.004,e.z,(e.hx*s-e.hz*v)*c,o(.35,1.4)+n*.06,(e.hz*s+e.hx*v)*c,o(.004,.009))}}function ot(e,n){for(let i=0;i<16*n;i++)s0(e.x+o(-.02,.02),.01,e.z+o(-.02,.02),o(-.15,.15),o(1,2.2)*n,o(-.15,.15),o(.005,.011));for(let i=0;i<18*n;i++){const l=o(0,J),c=o(.5,1.2);s0(e.x,.01,e.z,Math.cos(l)*c,o(.6,1.3)*n,Math.sin(l)*c,o(.004,.008))}}function at(e,n){const i=e.T;let l=n;for(;l>1e-7&&e.mode<5;){const c=Math.min(l,e.y<.1?4e-4:.003);if(l-=c,e.t+=c,e.ang+=e.spin*c,e.mode===0){const p=e.al+(e.inC?e.slope:0),s=Math.sin(p),v=Math.cos(p),f=e.y-i.a*s-i.th*.5*v,d=e.vs*e.vs+e.vy*e.vy,h=Math.sqrt(d),R=2*i.a*i.th+Math.PI*i.a*i.a*Math.abs(Math.sin(p-Math.atan2(e.vy,e.vs)));let b=-.5*yt*.8*R*h*e.vs,T=-i.m*wt-.5*yt*.8*R*h*e.vy,r=0;if(f<0&&P){const w=-e.vy;if(w>0){const q=1.42*w;e.vy=.42*w,e.vs=Math.max(0,e.vs-.22*q),e.al*=.5,e.y=i.a*Math.sin(e.al)+i.th*.5*Math.cos(e.al)+1e-4,Pe(e.x,e.z,-ge(w/2,.3,1)),Wt(e,Math.hypot(e.vs,w));for(let Z=0;Z<4;Z++)s0(e.x,.004,e.z,e.hx*o(.5,2)+o(-.3,.3),o(.3,.8),e.hz*o(.5,2)+o(-.3,.3),.003);e.vy<.35?(e.mode=2,e.vy=0,e.al=0,e.y=i.th*.5,$e.push({x0:e.x,z0:e.z,x1:e.x,z1:e.z}),$e.length>4&&$e.shift()):(e.skips++,Ht(e))}}else if(f<0){if(!e.inC){e.inC=!0,e.cT=0;const Xe=e.t-e.exitT;if(e.exitT<0||Xe>.025){e.exitT>=0&&(e.skips++,Ht(e));const Ke=g===2?x()<.35?5*K:.6*K:ho;e.slope=(x()+x()+x()-1.5)*1.4*Ke;const C=e.al+e.slope,ft=Math.atan2(-e.vy,e.vs);if(Pe(e.x,e.z,ge(h/10,.35,1.3)),bo(e,h),Wt(e,h),e.wet=1,C<=.01||ft>C+i.edge||C>1){e.mode=3,e.sinkT=e.t,Pe(e.x+e.hx*.05,e.z+e.hz*.05,1.8),ot(e,C>1?1.3:1),tt(e,1),k0(e);continue}}}e.cT+=c;const w=-f,S=Math.max(Math.sin(e.al+e.slope),.02),q=Math.min(w/S,2*i.a),Z=ro(i.a,q),B=-Math.sin(e.al+e.slope),le=Math.cos(e.al+e.slope),ae=Math.cos(e.al+e.slope),de=Math.sin(e.al+e.slope),Ge=.5*bt*i.CL*d*Z*(e.vy<0?1:no),t0=e.vs*ae+e.vy*de,o0=.5*bt*i.CF*d*Z*Math.sign(t0);if(b+=Ge*B-o0*ae,T+=Ge*le-o0*de,r=-Ge*Math.max(0,i.a-.55*q)*io,e.cT>.08){e.mode=1,e.ringT=0,k0(e);continue}}else e.inC&&(e.inC=!1,e.exitT=e.t);e.vs+=b/i.m*c,e.vy+=T/i.m*c,e.ald+=r/(i.m*i.a*i.a/4)/(1+(e.spin/i.wc)**2)*c,e.inC||(e.ald*=Math.exp(-c*6)),e.al+=e.ald*c,e.x+=e.hx*e.vs*c,e.z+=e.hz*e.vs*c,e.y+=e.vy*c,e.al<-.15&&(e.mode=3,e.sinkT=e.t,Pe(e.x,e.z,1.4),ot(e,.8),tt(e,.8),k0(e))}else if(e.mode===1)e.vs=Math.max(0,e.vs-(3.5+.5*e.vs)*c),e.y=i.th*.3,e.al*=Math.exp(-c*3),e.x+=e.hx*e.vs*c,e.z+=e.hz*e.vs*c,e.ringT-=c,e.ringT<0&&(e.ringT=.06+.25/(1+e.vs),Pe(e.x,e.z,ge(e.vs/8,.15,.5)),x()<.5&&ie({k:0,a:.15*R0(e.x,e.z),f:2600+o(0,600),dur:.05})),e.vs<1&&(e.mode=3,e.sinkT=e.t,Pe(e.x,e.z,.6),tt(e,.35));else if(e.mode===2){e.vs=Math.max(0,e.vs-.06*wt*c),e.x+=e.hx*e.vs*c,e.z+=e.hz*e.vs*c;const p=$e[$e.length-1];p&&(p.x1=e.x,p.z1=e.z),e.vs<=.02&&(e.mode=5,k0(e),M0.push({x:e.x,z:e.z,k:e.k,yaw:Math.atan2(e.hx,e.hz),ang:e.ang}),M0.length>6&&M0.shift())}else e.mode===3&&(e.vs*=Math.exp(-c*8),e.y-=.25*c,e.x+=e.hx*e.vs*c,e.z+=e.hz*e.vs*c,e.t-e.sinkT>.8&&(e.mode=5))}e.mode===0&&e.wet>0&&(e.wet=Math.max(0,e.wet-n*.2))}let nt=1.5+x()*2+(G===3?3:0),u0=0;function wo(){const e=$===3&&x()<.35?3:x()<.7?0:e0[x()*3|0],n=Ue[e],i=x(),l=n.vmax*(i<.15?o(.35,.55):o(.65,1)),c=(i>.92?o(35,55):o(13,26))*K;F0(e,l,c,o(50,160),o(-.22,.22),!1)}{_=-9,F0(0,13,19*K,120,o(-.2,.2),!1);for(let e=0;e<6.4*30;e++){_+=1/30;for(const n of te)at(n,1/30)}F0($===3?3:0,o(13,16),o(15,21)*K,130,o(-.15,.15),!1);for(let e=0;e<2.6*30;e++){_+=1/30;for(const n of te)at(n,1/30)}_=0,Oe.length=0}const it=$===2;let ce=0,P0=it?o(.5,2):o(18,40),rt=!1;function st(e,n,i){if(Pe(e,n,i?1.6:.9),Ut(()=>Pe(e,n,.5),.4),i)ot({x:e,z:n},.7),Ut(()=>Pe(e+o(-.3,.3),n+o(-.3,.3),1.2),.55);else for(let l=0;l<6;l++){const c=o(0,J);s0(e,.01,n,Math.cos(c)*.3,o(.6,1.1),Math.sin(c)*.3,.005)}ie({k:1,a:(i?.45:.3)*R0(e,n),f:i?520:900,dur:.25})}let I=null;if($===1){let e=-D*(.03+oe()*.05);(A===0||A===2)&&Math.abs(e-ye)<.09&&(e=ye+D*.11);const n=(e*.9%1+1)%1*256-.5,i=(ve[0]+.5)%1*256-.5,l=Math.floor(n),c=Math.floor(i),p=n-l,s=i-c,v=(R,b)=>U.nd[((b%256+256)%256*256+(R%256+256)%256)*4+2]/255,f=ne[0]*(1+ve[3]*(a0(a0(v(l,c),v(l+1,c),p),a0(v(l,c+1),v(l+1,c+1),p),s)-.5))*1.004,d=[se[0]+Math.sin(e)*f,1.1,se[2]+Math.cos(e)*f],h=Tt(d);if(re){const R=Ce[1]*(1+Ce[2])+.03;Math.abs(e-Ce[0])<R&&(Ce[0]=e>Ce[0]?e-R:e+R)}I={pos:d,uv:[h[0],1-h[1]],px:ge(600/f,.9,2.6)*y/1e3,amp:(A===3?6:3.6)/M.exp,v:1,to:1,t:0,s:(p0^521288629)>>>0}}po();const d0=[];if(it)for(let e=0;e<5;e++){const n=x();Ae.push({x:o(-1,1)*(3+n*9),z:7+n*n*38,t0:-o(.5,11),amp:.9})}const Ut=(e,n)=>d0.push({at:_+n,f:e});let Y=null,Se=null;const yo=e=>Tt([e.x,e.y+.02,e.z]);function zo(e,n){n=Math.min(n||1/30,.15),_+=n;for(let s=d0.length-1;s>=0;s--)d0[s].at<=_&&(d0[s].f(),d0.splice(s,1));const i=a.input,l=i.taps();let c=null;if(i.down&&i.inside&&!Y&&(Y={x:i.x,y:i.y,t:_,pts:[]},Se="press"),Y&&i.down){Y.pts.push([i.x,i.y,_]),Y.pts.length>40&&Y.pts.shift();const s=Math.hypot(i.x-Y.x,i.y-Y.y);if(Se!=="drag"&&s>.035&&(Se="drag"),Se==="press"&&_-Y.t>.45&&(Se="hold"),Se==="drag"){const v=i.x-Y.x,f=i.y-Y.y,d=Math.hypot(v,f),h=Math.min(70*K,12*K+.9*Math.atan2(Math.abs(v),Math.abs(f)+1e-6)),R=Math.atan2(15*(Y.x-.5)*2*fe-.22,14.5);c={pull:Math.min(1,d/.3),alpha:h,head:R,px:Y.x}}u0=0}if(Y&&!i.down){if(Se==="drag"){const s=i.x-Y.x,v=i.y-Y.y,f=Math.hypot(s,v);if(f>.05){const d=Y.pts;let h=0;if(d.length>1){const S=d[d.length-1];let q=d[0];for(let Z=d.length-1;Z>=0&&(q=d[Z],!(S[2]-q[2]>=.1));Z--);h=Math.hypot(S[0]-q[0],S[1]-q[1])/Math.max(.001,S[2]-q[2])}const b=Ue[Be].vmax*Math.pow(Math.min(1,f/.3),.75),T=Math.min(70*K,12*K+.9*Math.atan2(Math.abs(s),Math.abs(v)+1e-6)),r=20+130*ge(h/1.6,0,1),w=Math.atan2(15*(Y.x-.5)*2*fe-.22,14.5);F0(Be,b,T,r,w,!0),ie({k:7,a:.05,dur:.15})}}else Se==="press"&&p(Y.x,Y.y);Y=null,Se=null,u0=0}else!Y&&l.length&&(p(l[0].x,l[0].y),u0=0);function p(s,v){let f=-1,d=.07;for(const h of Bt){if(!e0.includes(h.k))continue;const R=yo(h),b=Math.hypot(R[0]-s,R[1]-v);b<d&&(d=b,f=h.k)}if(f<0){const h=e0.indexOf(Be);f=e0[(h+1)%e0.length]}f!==Be&&(Be=f,ie({k:3,a:.25,f:2300,dur:.04}),ie({k:3,a:.18,f:3100,dur:.04,delay:.06}))}if(Se==="hold"?(ce=Math.min(1,ce+n/7),ce>.55&&!rt&&(rt=!0,P||st(o(-4,4),o(9,22)))):(ce=Math.max(0,ce-n/45),ce<.3&&(rt=!1)),P0-=n,P0<0)if(it){P0=o(1.2,5.5)/(1+ce);const s=x();st(o(-1,1)*(3+s*9),7+s*s*38,x()<.14)}else P0=o(22,50),P||st(o(-6,6),o(10,35));I&&(I.t-=n,I.t<0&&(I.s=Math.imul(I.s,1664525)+1013904223>>>0,I.to=.62+.6*(I.s/4294967296),I.s=Math.imul(I.s,1664525)+1013904223>>>0,I.t=.05+.22*(I.s/4294967296)),I.v+=(I.to-I.v)*Math.min(1,n*9)),u0+=n,nt-=n,nt<0&&(nt=o(4,8),(!i.inside||u0>12)&&wo());for(const s of te)at(s,n);for(let s=te.length-1;s>=0;s--)te[s].mode>=5&&te.length>1&&s<te.length-1&&te.splice(s,1);for(let s=Ae.length-1;s>=0;s--)_-Ae[s].t0>(Ae[s].amp<0?40:16)&&Ae.splice(s,1);if(a.sound.on){if(J0-=n,$0-=n,J0<0)if(J0=o(5,13)*(1+ce),A===3||A===1&&x()<.4)ie({k:8,a:.05,dur:.5,bus:1}),ie({k:8,a:.04,dur:.9,delay:.75,bus:1});else{const v=[];let f=0;const d=o(1900,3200);for(let h=0,R=4+(x()*5|0);h<R;h++){const b=o(.06,.2),T=d*o(.8,1.4);v.push([f,b,T,T*o(.8,1.25),x()<.3?o(80,200):0]),f+=b+o(.02,.09)}ie({k:4,a:.05,notes:v,dur:f+.1,bus:1})}$0<0&&($0=o(50,130),E<2&&A!==2&&ie({k:5,a:.07,dur:2.6,bus:1})),Z0+=n*Ne;const s=Math.floor(Z0);Z0-=s,s>0&&a.sound.pcm(mo(s,n),Ne,{vel:.9})}else Oe.length=0;Vt(c)}const qt=Math.cos(6*K),Ot=Math.sin(6*K),Ao=(e,n,i)=>{if(G!==3)return[se[0]+e,se[1]+n,se[2]+i];const l=i*qt-n*Ot,c=n*qt+i*Ot;return[se[0]+e,se[1]+W0[1]*l+H0[1]*c,se[2]+W0[2]*l+H0[2]*c]},h0=new Float32Array(48*4),ct=new Float32Array(6*4),lt=new Float32Array(4*4);function Vt(e){t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,y,y),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST);let n=0;const i=(r,w,S,q,Z,B,le,ae,de,Ge,t0,o0,Xe,Ke)=>{if(n>=Nt)return;const C=n++*16;ee[C]=r,ee[C+1]=w,ee[C+2]=S,ee[C+3]=0,ee[C+4]=Z,ee[C+5]=B,ee[C+6]=le,ee[C+7]=ae,ee[C+8]=de,ee[C+9]=Ge,ee[C+10]=t0,ee[C+11]=o0,ee[C+12]=Xe,ee[C+13]=Ke,ee[C+14]=z,ee[C+15]=q},l=[],c=(r,w)=>1+Math.min(Math.hypot(r-se[0],w-se[2]),40)/14;for(const r of te)if(r.mode<5){const w=r.T.scl,S=c(r.x,r.z),q=Math.atan2(r.hx,r.hz),Z=r.al+(r.inC?r.slope:0),B=.37+r.k*.11;if(l.push(n),i(r.x,r.y,r.z,1,w[0]*S,w[1]*S,w[2]*S,r.T.vt,q,Z,r.ang,B,r.wet,0),r.mode===0&&r.vs>2)for(let le=1;le<=3;le++){const ae=le/110;i(r.x-r.hx*r.vs*ae,r.y-r.vy*ae,r.z-r.hz*r.vs*ae,.44-le*.11,w[0]*S,w[1]*S,w[2]*S,r.T.vt,q,Z,r.ang,B,r.wet,0)}}const p=n;for(const r of M0){const w=Ue[r.k].scl,S=c(r.x,r.z);i(r.x,w[1]*.9*S,r.z,1,w[0]*S,w[1]*S,w[2]*S,Ue[r.k].vt,r.yaw,0,r.ang,.37+r.k*.11,0,1)}if(e){const r=Ue[Be],w=r.scl,S=Ao(.13+.28*(e.px-.5),-.36-.05*e.pull,.8-.22*e.pull);i(S[0],S[1],S[2],1,w[0],w[1],w[2],r.vt,e.head,e.alpha,_*3,.37+Be*.11,0,1)}i(V.x,V.y,V.z,1,V.rx,V.ry,V.rz,6,V.yaw,0,0,V.seed,0,1),i(X.x,X.y,X.z,1,X.rx,X.ry,X.rz,6,X.yaw,0,0,X.seed,0,1);for(const r of Bt){if(!e0.includes(r.k)||r.k===Be)continue;const w=Ue[r.k],S=w.scl;i(r.x,r.y+S[1]*.85,r.z,1,S[0],S[1],S[2],w.vt,r.yaw,0,0,.37+r.k*.11,0,1)}const s=Math.cos(V.yaw),v=Math.sin(V.yaw),f=(r,w,S,q,Z)=>{for(let B=0;B<Math.min(r,30);B++){const le=w[B]!==void 0?w[B]:-99;let ae=ge((_-le)/.25,0,1),de=1;if(Z>0&&(de=1-ge((_-Z)/.3,0,1)),de<=0)continue;const Ge=Math.floor(B/10),t0=B%10,o0=t0>=5?1:0,Xe=-.262+t0*.054+o0*.032+(c0[B]-.5)*.008,Ke=S+Ge*.066+(c0[B+15]-.5)*.014,C=.021+c0[B+30]*.005,ft=It(V,Xe,Ke)+C*.36+(1-ae)*(1-ae)*.08;i(V.x+s*Xe+v*Ke,ft,V.z-v*Xe+s*Ke,1,C*de,C*.4*de,C*.82*de,q,c0[B]*J,0,0,c0[B]*5,0,1)}};if(f(l0.n,l0.at,-.17,5,0),T0>0&&_>T0){for(let r=0;r<We.n;r++)We.at[r]=_+r*.08;T0=-1}f(We.n,We.at,.06,4,0);const d=k.D;t.useProgram(d.p),A0(d),Ie(d,"uScene",1,O0.t),Ie(d,"uRefl",2,kt.t),Ie(d,"uG",3,U.grad),Ie(d,"uN",0,U.noise),u(d,"uEnc",S0),u(d,"uT",_),u(d,"uRes",y),u(d,"uIce",P?g+1:0),u(d,"uStar",(M.star+ce*(A===2?.1:.6))*(G===3?.4:1)),u(d,"uSlope",z0),u(d,"uSh",ke),u(d,"uSpecP",M.specP),u(d,"uSpecD",M.specD),u(d,"uSpecC",M.specC),u(d,"uCalm",[q0[0],q0[1],q0[2],ce]),u(d,"uFog",[M.fog[0],M.fog[1],M.fog[2]>0&&A===2?1/130:0,A===2?.6:0]),u(d,"uFogC",M.fogC),u(d,"uFoamC",M.drop),u(d,"uExp",M.exp),u(d,"uTw",ce);let h=0;for(let r=Ae.length-1;r>=0&&h<48;r--){const w=Ae[r],S=_-w.t0;S<0||(h0[h*4]=w.x,h0[h*4+1]=w.z,h0[h*4+2]=S,h0[h*4+3]=w.amp,h++)}d.u.uE!=null&&t.uniform4fv(d.u.uE,h0),t.uniform1i(d.u.uNE,h),ct.fill(0);const R=[[V.x,V.z,.58,.55],[X.x,X.z,.36,.55]];for(const r of te)r.mode<5&&r.z<r0(r.x)&&R.push([r.x,r.z,.05+r.y*.2,.4/(1+r.y*6)]);R.slice(0,6).forEach((r,w)=>ct.set(r,w*4)),d.u.uShd!=null&&t.uniform4fv(d.u.uShd,ct),lt.fill(0),$e.slice(-4).forEach((r,w)=>lt.set([r.x0,r.z0,r.x1,r.z1],w*4)),d.u.uTr!=null&&t.uniform4fv(d.u.uTr,lt),I?(u(d,"uFire",[I.pos[0],I.pos[1],I.pos[2],I.amp*I.v*(1+1.5*ce)]),u(d,"uFireS",[I.uv[0],I.uv[1],I.px,0])):u(d,"uFire",[0,0,1,0]),t.bindVertexArray(U.vaoF),t.drawArrays(t.TRIANGLES,0,3);const b=k.E;t.useProgram(b.p),A0(b),Ie(b,"uN",0,U.noise),Ie(b,"uScene",1,O0.t),u(b,"uVP",U0),u(b,"uEnc",S0),u(b,"uRes",y),u(b,"uAmb",M.amb),u(b,"uSunD",M.sun),u(b,"uSunC",M.sunC),u(b,"uZen",M.zen),u(b,"uHor",M.hor),u(b,"uHorS",M.horS),u(b,"uSlope",z0),u(b,"uSh",ke),u(b,"uExp",M.exp),u(b,"uTw",ce),t.bindVertexArray(Ct),t.bindBuffer(t.ARRAY_BUFFER,Lt),t.bufferData(t.ARRAY_BUFFER,ee,t.DYNAMIC_DRAW),t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),p&&(u(b,"uMir",1),t.drawElementsInstanced(t.TRIANGLES,U.nSph,t.UNSIGNED_SHORT,0,p)),t.clear(t.DEPTH_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.depthMask(!0),u(b,"uMir",0),t.drawElementsInstanced(t.TRIANGLES,U.nSph,t.UNSIGNED_SHORT,0,n),t.disable(t.DEPTH_TEST);const T=k.F;t.useProgram(T.p),A0(T),u(T,"uVP",U0),u(T,"uTime",_),u(T,"uRes",y),u(T,"uDropC",M.drop),u(T,"uExp",M.exp),u(T,"uTw",ce),Ie(T,"uN",0,U.noise),u(T,"uEnc",S0),t.bindVertexArray(Dt),Y0&&(t.bindBuffer(t.ARRAY_BUFFER,_t),t.bufferData(t.ARRAY_BUFFER,we,t.DYNAMIC_DRAW),Y0=!1),t.blendFunc(t.SRC_ALPHA,t.ONE),t.drawArrays(t.POINTS,0,g0),t.disable(t.BLEND),t.bindVertexArray(null)}return Vt(null),zo}ut.add({num:39,name:"Skipping Stones",fam:"Worlds",recipe:"A pebble beach on a still lake at dusk where the stones skip by real physics, and every throw gets laid out in pebbles on a stone on the shore. The water, the light and the shore change every mint. Drag back and let go to throw (about 20 degrees of tilt skips best, and a fast flick spins it), tap to pick another stone, or hold to wait for dark.",interactive:"Drag back and release to throw: the stroke length is the speed, where you press is the aim, the stroke angle is the tilt (about 20 degrees skims best), a fast flick spins it. Tap to pick another stone, hold to wait for the dark.",music:!0,gl:!0,fps:30,seed:0,make:so})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
