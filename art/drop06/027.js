// Snowy Street: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/027.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(N1){N1&&function(){"use strict";const T1=new WeakMap,R0=Math.PI*2,G=(m,n,I)=>m<n?n:m>I?I:m,dt=(m,n,I)=>m+(n-m)*I,Et=(m,n,I)=>{const O=G((I-m)/(n-m),0,1);return O*O*(3-2*O)},F0=(m,n)=>[m[0]+n[0],m[1]+n[1],m[2]+n[2]],Kt=(m,n)=>[m[0]-n[0],m[1]-n[1],m[2]-n[2]],m0=(m,n)=>[m[0]*n,m[1]*n,m[2]*n],Rt=(m,n)=>m[0]*n[0]+m[1]*n[1]+m[2]*n[2],Yt=(m,n)=>[m[1]*n[2]-m[2]*n[1],m[2]*n[0]-m[0]*n[2],m[0]*n[1]-m[1]*n[0]],X0=m=>{const n=Math.hypot(m[0],m[1],m[2])||1;return[m[0]/n,m[1]/n,m[2]/n]},Zt=(m,n,I)=>[m[0]+(n[0]-m[0])*I,m[1]+(n[1]-m[1])*I,m[2]+(n[2]-m[2])*I],Ys=(m,n,I)=>Math.round(G(m,0,1)*255)*65536+Math.round(G(n,0,1)*255)*256+Math.round(G(I,0,1)*255),p0=128,Do=128,it=128,ut=56,Ct=-13,_o=13,mo=.5,L1=95,Tn=Math.log((L1+3)/(mo+3)),Zs=m=>Math.log((Math.max(m,mo)+3)/(mo+3))/Tn,$s=m=>(mo+3)*Math.exp(m*Tn)-3,ht=m=>Number.isInteger(m)?m+".0":String(m),xo=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Le=`
float unpackD(vec4 e) { return dot(e, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0)); }
vec3 unpackC(float f) { float r = floor(f / 65536.0 + 0.00001); float g = floor((f - r * 65536.0) / 256.0 + 0.00001); return vec3(r, g, f - r * 65536.0 - g * 256.0) / 255.0; }
float h21(vec2 p) { p = fract(p * vec2(0.1031, 0.1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
float at2(float y, float x) { return x > 0.0 ? atan(y / x) : x < 0.0 ? atan(y / x) + (y >= 0.0 ? 3.14159265 : -3.14159265) : (y > 0.0 ? 1.57079633 : -1.57079633); }
`,P1=`
uniform sampler2D uShL;
uniform vec4 uLP[4];
uniform vec4 uLC[4];
uniform int uNL;
float lampCone(int i, vec3 l) { float cd = l.y; return mix(uLC[i].w, 1.0, smoothstep(0.0, 0.55, cd)) * (0.22 + 0.78 * smoothstep(-0.45, 0.05, cd)); }
float lampSh(int i, vec3 P, int taps) {
  vec3 d = P - uLP[i].xyz; vec3 a = abs(d);
  float f; vec3 A, U, V;
  if (a.x >= a.y && a.x >= a.z) { V = vec3(0.0, 1.0, 0.0); if (d.x > 0.0) { f = 0.0; A = vec3(1.0, 0.0, 0.0); U = vec3(0.0, 0.0, -1.0); } else { f = 1.0; A = vec3(-1.0, 0.0, 0.0); U = vec3(0.0, 0.0, 1.0); } }
  else if (a.y >= a.z) { U = vec3(1.0, 0.0, 0.0); if (d.y > 0.0) { f = 2.0; A = vec3(0.0, 1.0, 0.0); V = vec3(0.0, 0.0, -1.0); } else { f = 3.0; A = vec3(0.0, -1.0, 0.0); V = vec3(0.0, 0.0, 1.0); } }
  else { V = vec3(0.0, 1.0, 0.0); if (d.z > 0.0) { f = 4.0; A = vec3(0.0, 0.0, 1.0); U = vec3(1.0, 0.0, 0.0); } else { f = 5.0; A = vec3(0.0, 0.0, -1.0); U = vec3(-1.0, 0.0, 0.0); } }
  float za = dot(d, A);
  vec2 st = clamp(vec2(dot(d, U), dot(d, V)) / za, -0.985, 0.985);
  vec2 uv = (vec2(f, float(i)) + st * 0.5 + 0.5) / vec2(6.0, 4.0);
  float L = length(d);
  float dist = (L - 0.03 - 0.012 * L) / uLP[i].w;
  if (taps < 2) return step(dist, unpackD(textureLod(uShL, uv, 0.0)));
  vec2 px = vec2(1.0 / 1536.0, 1.0 / 1024.0) * (taps > 4 ? 1.0 + 2.2 * smoothstep(1.0, 12.0, L) : 1.0);
  float s = 0.0;
  for (int k = 0; k < 4; k++) { vec2 o = vec2(float(k & 1), float(k >> 1)) - 0.5; s += step(dist, unpackD(textureLod(uShL, uv + o * px, 0.0))); }
  return s * 0.25;
}
`,Qs=`#version 300 es
layout(location = 0) in vec3 aP;
layout(location = 3) in vec4 aM;
uniform int uK; uniform mat4 uM; uniform vec3 uL, uA, uU, uV; uniform float uR;
out vec3 vD; flat out float vMat;
void main() {
  vMat = aM.x;
  if (uK == 0) { vec4 q = uM * vec4(aP, 1.0); gl_Position = q; vD = vec3(q.z * 0.5 + 0.5, 0.0, 0.0); }
  else { vec3 d = aP - uL; float za = dot(d, uA); float n = 0.05, f = uR;
    gl_Position = vec4(dot(d, uU), dot(d, uV), za * (f + n) / (f - n) - 2.0 * f * n / (f - n), za); vD = d; }
}`,Js=`#version 300 es
precision highp float;
precision highp int;
in vec3 vD; flat in float vMat; out vec4 o;
uniform int uK; uniform float uR; uniform int uNB;
void main() {
  if (uNB == 1 && abs(vMat - 9.0) < 0.5) discard;
  if (uK == 1 && length(vD) < 0.55) discard;
  float d = uK == 0 ? vD.x : length(vD) / uR;
  d = clamp(d, 0.0, 0.99999);
  vec4 e = fract(d * vec4(1.0, 255.0, 65025.0, 16581375.0)); e -= e.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0); o = e;
}`,z1=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform int uMode; uniform float uMir;
uniform sampler2D uNz;
uniform vec3 uEye, uFwd, uRt, uUp; uniform float uTan;
uniform vec3 uSkyZ, uSkyH, uCld, uMtn, uMoonD, uFogC;
uniform vec4 uSk;
uniform vec4 uMo;
${Le}
void main() {
  vec3 rd = normalize(uFwd + (vUv.x * 2.0 - 1.0) * uTan * uRt + (vUv.y * 2.0 - 1.0) * uTan * uUp);
  if (uMir > 0.5) rd.y = -rd.y;
  float el = rd.y, az = at2(rd.x, rd.z);
  vec3 sky = mix(uSkyH, uSkyZ, smoothstep(-0.05, 0.45, el));
  vec2 sp = vec2(az * 160.0, el * 160.0);
  vec2 ci = floor(sp), cf = fract(sp) - 0.5;
  float hs = h21(ci + uSk.w * 13.0), hb = h21(ci + 7.3);
  float star = step(0.986, hs) * (0.15 + pow(hb, 6.0) * 2.5) * smoothstep(0.3, 0.0, length(cf)) * smoothstep(0.02, 0.15, el);
  sky += vec3(0.8, 0.86, 1.0) * star * uSk.y * 0.6;
  float mc = clamp(dot(rd, uMoonD), -1.0, 1.0);
  float mr = acos(mc) / uMo.y;
  float disc = 1.0 - smoothstep(0.88, 1.0, mr);
  float mtx = 0.8 + 0.2 * texture(uNz, (rd.xy - uMoonD.xy) * 18.0 + 0.3).g;
  vec3 moonC = vec3(1.0, 0.97, 0.9) * uMo.x;
  sky += moonC * (disc * mtx * 7.0 + 0.3 * exp(-mr * 0.3) * uMo.z + 0.06 * exp(-mr * 0.05));
  vec2 cp = rd.xz / max(el + 0.07, 0.04) * 0.32 + uSk.w;
  float cn = texture(uNz, cp * 0.09).r * 0.55 + texture(uNz, cp * 0.31 + 0.2).g * 0.3 + texture(uNz, cp * 1.1 + 0.5).b * 0.15;
  float cov = smoothstep(1.0 - uSk.x - 0.14, 1.0 - uSk.x + 0.2, cn);
  vec3 cc = uCld * (0.55 + 0.9 * cn) * (1.0 + 1.6 * exp(-max(el, 0.0) * 8.0));
  cc += moonC * 0.35 * exp(-mr * 0.1) * (1.1 - cn);
  vec3 col = mix(sky, cc, cov);
  float clear = 1.0 - cov;
  col = mix(col, uFogC, exp(-max(el, 0.0) * 16.0) * 0.55);
  float far = 0.0;
  if (uSk.z > 0.5) {
    float ridge = 0.03 + 0.12 * texture(uNz, vec2(az * 0.33 + uSk.w, 0.31)).r + 0.035 * texture(uNz, vec2(az * 1.5 + uSk.w, 0.62)).g + 0.008 * texture(uNz, vec2(az * 6.0, 0.1)).b;
    if (el < ridge) {
      float hg = (ridge - el) / ridge;
      float sl = texture(uNz, vec2(az * 2.6, el * 7.0) + uSk.w).g;
      float gul = smoothstep(0.5, 0.7, texture(uNz, vec2(az * 5.0 + el * 2.0, el * 3.0)).b);
      vec3 mcol = uMtn * (0.55 + 0.6 * sl) * (1.0 - 0.45 * gul);
      float trees = smoothstep(0.42, 0.62, texture(uNz, vec2(az * 8.0, el * 26.0)).b + hg * 0.55);
      mcol = mix(mcol, uMtn * 0.12, trees * smoothstep(0.3, 0.7, hg));
      mcol = mix(mcol, uFogC * 1.1, 0.35 + 0.4 * hg);
      col = mcol; clear = 0.0; far = 1.0;
    }
  }
  if (uMo.w > 0.5) {
    float sh = 0.006 + 0.012 * texture(uNz, vec2(az * 1.1 + 0.3, 0.4)).r;
    if (el < sh) {
      col = mix(uFogC * 0.55, uFogC * 0.9, smoothstep(sh, sh * 0.2, el)); far = 1.0; clear = 0.0;
      vec2 lp = vec2(az * 700.0, el * 700.0); vec2 li = floor(lp);
      float lit = step(0.965, h21(li + 3.0)) * smoothstep(0.5, 0.1, length(fract(lp) - 0.5)) * step(el, sh * 0.8);
      col += vec3(1.0, 0.72, 0.38) * lit * 2.0;
    }
  }
  if (uMode == 0) o = vec4(col, clear);
  else if (uMode == 1) o = vec4(0.0);
  else o = vec4(0.0, 0.0, far > 0.5 ? 900.0 : 2000.0, far > 0.5 ? 6.0 : 0.0);
}`,$t=`#version 300 es
layout(location = 0) in vec3 aP;
layout(location = 1) in vec3 aN;
layout(location = 2) in vec2 aT;
layout(location = 3) in vec4 aM;
layout(location = 4) in vec4 aS;
uniform mat4 uVP; uniform float uMir;
out vec3 vW; out vec3 vN; out vec2 vT; flat out vec4 vM; out vec4 vS;
void main() {
  vW = aP; vN = aN; vT = aT; vM = aM; vS = aS;
  vec3 q = aP; if (uMir > 0.5) q.y = -q.y;
  gl_Position = uVP * vec4(q, 1.0);
}`,tr=`#version 300 es
precision highp float;
precision highp int;
in vec3 vW; in vec3 vN; in vec2 vT; flat in vec4 vM; in vec4 vS;
out vec4 o;
uniform int uMode; uniform float uMir;
uniform sampler2D uNz, uShM, uShS;
uniform mat4 uMoonM, uSkyM;
uniform vec4 uWP[16]; uniform vec4 uWN[16]; uniform int uNW;
uniform vec3 uWC, uMoonD, uMoonC, uSkyA, uGndA, uEye, uFwd, uEnv, uLampE;
uniform vec4 uSt, uSd, uBi;
${Le}
${P1}
float mapSh(sampler2D m, mat4 M, vec3 P, float bias, float rad) {
  vec4 q = M * vec4(P, 1.0);
  vec2 uv = q.xy * 0.5 + 0.5; float d = q.z * 0.5 + 0.5 - bias;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  vec2 ts = rad / vec2(textureSize(m, 0));
  float s = 0.0;
  s += step(d, unpackD(textureLod(m, uv, 0.0))) * 2.0;
  s += step(d, unpackD(textureLod(m, uv + vec2(ts.x, ts.y * 0.5), 0.0)));
  s += step(d, unpackD(textureLod(m, uv + vec2(-ts.x * 0.5, ts.y), 0.0)));
  s += step(d, unpackD(textureLod(m, uv + vec2(-ts.x, -ts.y * 0.5), 0.0)));
  s += step(d, unpackD(textureLod(m, uv + vec2(ts.x * 0.5, -ts.y), 0.0)));
  return s / 6.0;
}
vec2 groundAt(vec3 P) {
  float ze = log((max(P.z, ${ht(mo)}) + 3.0) / ${ht(mo+3)}) / ${ht(Tn)};
  return vec2(clamp((P.x - (${ht(Ct)})) / ${ht(_o-Ct)} * ${ht(it)}, 0.5, ${ht(it-.5)}), clamp(ze * ${ht(ut)}, 0.5, ${ht(ut-.5)})) / vec2(${ht(p0)}, ${ht(Do)});
}
vec4 nA, nB, nC, nD, nE, g1, g2, g3, g4; vec2 fwT, fwG;
void noiseAll() {
  nA = texture(uNz, vT * 0.07); nB = texture(uNz, vT * 0.9); nC = texture(uNz, vT * vec2(0.25, 2.0)); nD = texture(uNz, vT * vec2(2.5, 0.3)); nE = texture(uNz, vT * vec2(1.6, 0.05));
  g1 = texture(uNz, vW.xz * 0.31); g2 = texture(uNz, vW.xz * 1.7); g3 = texture(uNz, vW.xz * 0.021 + 0.4); g4 = texture(uNz, vW.xz * 0.035 + 0.7);
  fwT = fwidth(vT); fwG = fwidth(vW.xz);
}
float fadeW(float w) { return smoothstep(0.3, 0.85, w); }
vec3 stoneP(vec2 t, vec3 c) {
  float rh = 0.3, r = floor(t.y / rh);
  float bx = t.x / 0.52 + h21(vec2(r, 7.0));
  vec2 f = vec2(fract(bx), fract(t.y / rh)), id = vec2(floor(bx), r);
  float fw = fadeW(fwT.y / rh * 2.0);
  float mort = smoothstep(0.0, 0.06, f.y) * smoothstep(1.0, 0.94, f.y) * smoothstep(0.0, 0.035, f.x) * smoothstep(1.0, 0.965, f.x);
  vec3 s = c * (0.7 + 0.5 * h21(id)) * (0.8 + 0.4 * nB.b);
  return mix(mix(c * 0.6, s, mort), c * 0.9, fw);
}
vec3 brickP(vec2 t, vec3 c) {
  float r = floor(t.y / 0.077);
  float bx = t.x / 0.235 + mod(r, 2.0) * 0.5;
  vec2 f = vec2(fract(bx), fract(t.y / 0.077)), id = vec2(floor(bx), r);
  float fw = fadeW(fwT.y / 0.077);
  float mort = smoothstep(0.0, 0.13, f.y) * smoothstep(1.0, 0.87, f.y) * smoothstep(0.0, 0.035, f.x) * smoothstep(1.0, 0.965, f.x);
  vec3 b = c * (0.7 + 0.55 * h21(id)) * (0.85 + 0.3 * nB.b);
  b = mix(b, b * vec3(0.6, 0.62, 0.66), step(0.92, h21(id + 3.1)));
  vec3 mc = vec3(0.30, 0.28, 0.25);
  return mix(mix(mc, b, mort), mix(mc, c, 0.8), fw);
}
vec3 plasterP(vec2 t, vec3 c) {
  float n = nA.r, n2 = nB.b;
  float streak = nE.g;
  vec3 a = c * (0.8 + 0.34 * n) * (0.92 + 0.12 * n2) * (1.0 - 0.2 * smoothstep(0.55, 0.8, streak));
  return a * (1.0 - 0.25 * smoothstep(0.9, 0.0, t.y));
}
void surf(inout vec3 N, out vec3 alb, out vec3 em, out float gls, out float spk, out float rfl, out float cls) {
  int m = int(vM.x + 0.5);
  vec3 c = unpackC(vM.y);
  vec2 t = vT;
  alb = c; em = vec3(0.0); gls = 0.0; spk = 0.0; rfl = 0.0; cls = 3.0;
#ifdef M0
  if (m == 0) {
    vec2 g = vW.xz; float ax = abs(g.x);
    float w1 = fwG.y + fwG.x;
    float n2 = g1.g, n3 = g2.b;
    if (g.y > uSt.w && ax < 60.0) {
      alb = vec3(0.006, 0.008, 0.01); gls = 300.0; spk = 1.0; rfl = 0.6; cls = 5.0;
    } else if (ax < uSt.x) {
      cls = 1.0;
      if (uSt.z < 0.5) {
        alb = vec3(0.07, 0.068, 0.066) * (0.72 + 0.56 * n2) * (0.85 + 0.3 * n3);
        alb *= 1.0 - 0.28 * smoothstep(0.6, 0.64, g3.a);
        alb *= 1.0 - 0.45 * smoothstep(0.012, 0.0, abs(g4.r - 0.5)) * (1.0 - fadeW(w1 * 6.0));
        gls = 12.0; spk = 0.25;
      } else if (uSt.z < 1.5) {
        vec2 gw = g + (g1.rg - 0.5) * 0.16 + (g2.gb - 0.5) * 0.03;
        vec2 cc = vec2(gw.x / 0.13, gw.y / 0.1); float row = floor(cc.y); cc.x += mod(row, 2.0) * 0.5 + h21(vec2(row, 3.0)) * 0.3;
        vec2 f = fract(cc) - 0.5, id = floor(cc);
        float fw = fadeW(w1 * 7.0);
        float d = length(max(abs(f) - vec2(0.3, 0.27), 0.0)) - 0.13;
        float stn = 1.0 - smoothstep(-0.05, 0.04, d);
        vec3 sc = vec3(0.1, 0.096, 0.092) * (0.72 + 0.5 * h21(id)) * (0.75 + 0.5 * n2) * (0.85 + 0.3 * n3);
        alb = mix(mix(vec3(0.045, 0.042, 0.038), sc * (1.03 - dot(f, f) * 0.5), stn), vec3(0.08, 0.076, 0.072) * (0.75 + 0.5 * n2), fw);
        N = normalize(N + vec3(f.x, 0.0, f.y) * 0.6 * stn * (1.0 - fw));
        gls = 24.0; spk = 0.2;
      } else {
        float rut = smoothstep(0.35, 0.0, abs(abs(g.x) - 1.1));
        alb = vec3(0.12, 0.11, 0.1) * (0.65 + 0.7 * n2) * (0.8 + 0.4 * n3) * (1.0 - 0.3 * rut);
        gls = 6.0; spk = 0.15;
      }
      alb *= 1.0 - 0.25 * smoothstep(uSt.x - 0.5, uSt.x, ax);
    } else if (ax < uSt.y) {
      cls = 2.0;
      float jz = fract(g.y / 1.3), jx = fract((ax - uSt.x) / max(uSt.y - uSt.x, 0.1));
      float fw = fadeW(w1 * 5.0);
      float joint = (1.0 - smoothstep(0.0, 0.015, min(jz, 1.0 - jz))) * (1.0 - fw);
      alb = vec3(0.16, 0.155, 0.15) * (0.8 + 0.4 * n2) * (0.9 + 0.2 * n3) * (1.0 - 0.5 * joint);
      gls = 8.0; spk = 0.15;
    } else {
      float n1 = g3.r;
      alb = mix(vec3(0.045, 0.05, 0.025), vec3(0.08, 0.065, 0.04), n1) * (0.55 + 0.9 * n3);
      cls = 9.0;
    }
  }
#endif
#ifdef M1
  if (m == 1) {
    float s = vM.z;
    if (s < 0.5) {
      float f = fract(t.y / 0.17); float fw = fadeW(fwT.y / 0.17);
      float sh = mix(1.0 - 0.5 * smoothstep(0.8, 1.0, f) + 0.1 * smoothstep(0.12, 0.0, f), 0.9, fw);
      alb = c * sh * (0.88 + 0.24 * nC.g);
    } else if (s < 1.5) {
      float f = fract(t.x / 0.21); float fw = fadeW(fwT.x / 0.21);
      float sh = mix(1.0 - 0.5 * smoothstep(0.9, 1.0, f) - 0.15 * smoothstep(0.1, 0.0, f), 0.88, fw);
      alb = c * sh * (0.65 + 0.7 * nD.b);
    } else {
      float f = fract(t.y / 0.24); float fw = fadeW(fwT.y / 0.24);
      float sh = mix(0.4 + 0.8 * sin(f * 3.14159), 0.85, fw);
      N = normalize(N + vec3(0.0, (0.5 - f) * 1.4 * (1.0 - fw), 0.0));
      alb = c * sh * (0.75 + 0.5 * nC.g);
    }
    if (t.y < vM.w) alb = stoneP(t, vec3(0.3, 0.29, 0.27));
  }
#endif
#ifdef M2
  if (m == 2) {
    alb = brickP(t, c);
    if (t.y < vM.w) alb = stoneP(t, vec3(0.3, 0.29, 0.27));
  }
#endif
#ifdef M3
  if (m == 3) {
    alb = plasterP(t, c);
    if (t.y < vM.w) alb = stoneP(t, vec3(0.32, 0.31, 0.29));
  }
#endif
#ifdef M4
  if (m == 4) {
    alb = stoneP(t, c);
  }
#endif
#ifdef M5
  if (m == 5) {
    float s = vM.z;
    if (s < 0.5 || s > 2.5) {
      float rh = s < 0.5 ? 0.14 : s < 3.5 ? 0.11 : 0.19, tw = s < 0.5 ? 0.33 : s < 3.5 ? 0.24 : 0.17;
      float r = floor(t.y / rh), f = fract(t.y / rh);
      float cx = t.x / tw + mod(r, 2.0) * 0.5 + (s > 3.5 ? h21(vec2(r, 5.0)) * 0.6 : 0.0);
      float fx = fract(cx), fw = fadeW(fwT.y / rh);
      float sh = (0.6 + 0.4 * smoothstep(0.0, 0.9, f)) * (1.0 - 0.35 * smoothstep(0.07, 0.0, min(fx, 1.0 - fx)));
      sh = mix(sh, 0.8, fw);
      alb = c * sh * (0.78 + 0.44 * mix(h21(vec2(floor(cx), r)), 0.5, fw));
      gls = s > 2.5 && s < 3.5 ? 20.0 : 0.0; spk = 0.1;
    } else if (s < 1.5) {
      float f = fract(t.x / 0.45); float fw = fadeW(fwT.x / 0.45);
      float seam = smoothstep(0.035, 0.0, abs(f - 0.5)) * (1.0 - fw);
      alb = c * (0.85 + 0.2 * nA.g) * (1.0 + 0.5 * seam);
      gls = 40.0; spk = 0.4; rfl = 0.25;
    } else {
      float f = fract(t.x / 0.22), r = fract(t.y / 0.3); float fw = fadeW(fwT.y / 0.3);
      float sh = mix((0.55 + 0.45 * sin(f * 3.14159)) * (0.6 + 0.4 * smoothstep(0.0, 0.85, r)), 0.75, fw);
      alb = c * sh * (0.85 + 0.3 * nB.b);
      gls = 18.0; spk = 0.15;
    }
  }
#endif
#ifdef M6
  if (m == 6) {
    alb = c * (0.9 + 0.18 * nC.b);
    gls = 10.0; spk = 0.08;
  }
#endif
#ifdef M7
  if (m == 7) {
    float lit = vM.z, sd = vM.w;
    int st = int(fract(sd * 7.31) * 4.0);
    vec2 np = st == 0 ? vec2(2.0, 2.0) : st == 1 ? vec2(2.0, 3.0) : st == 2 ? vec2(1.0, 2.0) : vec2(2.0, 4.0);
    vec2 pf = fract(t * np);
    float dx = min(pf.x, 1.0 - pf.x) / np.x, dy = min(pf.y, 1.0 - pf.y) / np.y;
    float frame = 1.0 - smoothstep(0.016, 0.022, min(dx, dy));
    float h1 = h21(vec2(sd * 91.0, 1.7)), h2 = h21(vec2(sd * 37.0, 4.1)), h3 = h21(vec2(sd * 13.0, 9.2));
    vec3 inner = vec3(0.0);
    if (lit > 0.0) {
      vec3 wc = uWC * (0.75 + 0.5 * h1);
      if (h2 > 0.93) wc = vec3(0.32, 0.45, 0.85) * 0.7;
      float grad = 0.5 + 0.5 * t.y + 0.6 * exp(-((t.x - 0.5) * (t.x - 0.5) * 5.0 + (t.y - 1.05) * (t.y - 1.05) * 9.0));
      inner = wc * grad;
      float cw = 0.1 + 0.25 * h3;
      float curt = smoothstep(cw, cw - 0.04, t.x) + smoothstep(1.0 - cw, 1.0 - cw + 0.04, t.x);
      float fold = 0.7 + 0.3 * sin(t.x * 80.0 + h1 * 6.0);
      inner = mix(inner, wc * vec3(1.0, 0.75, 0.55) * 0.55 * fold, clamp(curt, 0.0, 1.0) * step(0.3, h1));
      float sil = step(t.y, 0.08 + 0.14 * h21(vec2(floor(t.x * 7.0), sd * 50.0))) * step(0.55, h2);
      inner *= 1.0 - 0.8 * sil;
      if (h1 < 0.2) inner *= 0.6 + 0.4 * step(0.4, fract(t.y * 16.0));
      if (h3 > 0.8) inner *= 1.0 - 0.7 * smoothstep(0.1, 0.0, abs(length((t - vec2(0.35, 0.4)) * vec2(1.0, 0.7)) - 0.18));
      inner *= lit;
    }
    alb = mix(vec3(0.015, 0.017, 0.02), c, frame);
    em = inner * (1.0 - frame);
    gls = (1.0 - frame) * 120.0; spk = (1.0 - frame) * 0.8; rfl = (1.0 - frame) * 0.9;
    cls = 4.0;
  }
#endif
#ifdef M8
  if (m == 8) {
    alb = c * (0.85 + 0.2 * nB.b);
    gls = 50.0; spk = 0.6; rfl = 0.15;
  }
#endif
#ifdef M9
  if (m == 9) {
    float n = nD.b, n2 = nE.g;
    alb = vec3(0.075, 0.068, 0.06) * (0.45 + 1.0 * n) * mix(vec3(1.0), vec3(0.9, 1.05, 0.85), smoothstep(0.55, 0.75, n2));
  }
#endif
#ifdef M10
  if (m == 10) {
    int part = int(vM.z + 0.5);
    bool glass = part == 1;
    if (part == 0) {
      float y = t.y, x = t.x;
      if (y > 1.0 && y < 1.37 && x > 1.08 + (y - 0.95) * 1.06 && x < 3.22 - (y - 1.0) * 1.22 && abs(x - 2.12) > 0.05) glass = true;
      alb = c * (1.0 - 0.5 * smoothstep(0.012, 0.0, abs(y - 0.98)));
      if (y > 0.42 && y < 1.02) alb *= 1.0 - 0.7 * smoothstep(0.014, 0.004, min(abs(x - 1.5), abs(x - 2.75)));
      alb = mix(alb, vec3(0.42), smoothstep(0.016, 0.006, abs(y - 0.74)) * 0.6);
      if (y < 0.42) alb = vec3(0.02);
    }
    if (part == 4) alb = vec3(0.02);
    gls = 90.0; spk = 1.0; rfl = 0.5;
    if (glass) { alb = vec3(0.01, 0.012, 0.014); gls = 200.0; spk = 1.0; rfl = 0.9; cls = 4.0; }
  }
#endif
#ifdef M11
  if (m == 11) {
    em = uLampE * vM.z; alb = vec3(0.3); cls = 7.0;
  }
#endif
#ifdef M12
  if (m == 12) {
    alb = vec3(0.78, 0.8, 0.84) * (0.9 + 0.2 * nB.b);
  }
#endif
#ifdef M13
  if (m == 13) {
    vec2 q = t;
    float pan = step(0.12, q.x) * step(q.x, 0.45) + step(0.55, q.x) * step(q.x, 0.88);
    pan *= step(0.08, q.y) * step(q.y, 0.45) + step(0.52, q.y) * step(q.y, 0.92);
    float edge = 1.0 - smoothstep(0.0, 0.025, min(min(abs(q.x - 0.12), abs(q.x - 0.45)), min(abs(q.x - 0.55), abs(q.x - 0.88))));
    alb = c * (0.8 + 0.25 * nD.b) * (1.0 - 0.3 * pan * edge);
    alb = mix(alb, vec3(0.5, 0.4, 0.15), step(length((q - vec2(0.85, 0.48)) * vec2(1.0, 2.2)), 0.025));
    gls = 20.0; spk = 0.2;
  }
#endif
#ifdef M14
  if (m == 14) {
    vec2 q = t;
    float sd = vM.y * 0.0007;
    // a low-lit room behind the glass: lamps toward the back, shelves of goods in silhouette, a table in the near dark
    vec3 inn = uWC * (0.025 + 0.05 * q.y);
    inn += uWC * 0.24 * exp(-((q.x - 0.32) * (q.x - 0.32) * 16.0 + (q.y - 0.86) * (q.y - 0.86) * 24.0));
    inn += uWC * 0.16 * exp(-((q.x - 0.78) * (q.x - 0.78) * 20.0 + (q.y - 0.8) * (q.y - 0.8) * 30.0));
    for (int k = 0; k < 3; k++) {
      float fk = float(k), sy = 0.3 + fk * 0.21;
      float id = floor(q.x * (13.0 + fk * 5.0) + fk * 3.1), gh = h21(vec2(id + sd, fk + 2.0));
      float box = step(sy, q.y) * step(q.y, sy + 0.035 + gh * 0.13) * step(0.32, gh);
      inn = mix(inn, inn * (0.45 + 0.9 * h21(vec2(id, fk))) * vec3(1.0, 0.85, 0.7), box * 0.8);
      inn = mix(inn, inn * 0.5, step(sy - 0.012, q.y) * step(q.y, sy));
    }
    inn = mix(inn, uWC * 0.03, smoothstep(0.17, 0.14, q.y + 0.06 * sin(q.x * 5.0)));
    inn *= 0.9 + 0.2 * nC.g;
    float fog = smoothstep(0.42, 0.0, q.y) * (0.5 + 0.5 * nB.b);
    inn = mix(inn, uWC * 0.12, fog * 0.22);
    float fr = 1.0 - smoothstep(0.008, 0.014, min(min(q.x, 1.0 - q.x), min(q.y, 1.0 - q.y)) * 0.5);
    alb = mix(vec3(0.0), c, fr); em = inn * (1.0 - fr);
    gls = 150.0 * (1.0 - fr); spk = 0.6; rfl = 0.5; cls = 4.0;
  }
#endif
#ifdef M15
  if (m == 15) {
    alb = vec3(0.018); gls = 8.0; spk = 0.15;
  }
#endif
#ifdef M16
  if (m == 16) {
    alb = c;
  }
#endif
#ifdef M17
  if (m == 17) alb = c * (0.9 + 0.2 * nA.g);
#endif
}
vec3 lightAt(vec3 P, vec3 N, vec3 V, float gls, inout vec3 spec) {
  float av = mapSh(uShS, uSkyM, P + N * 0.3, uBi.x, uBi.y);
  vec3 L = mix(uGndA, uSkyA, N.y * 0.5 + 0.5) * (0.18 + 0.82 * av);
  if (abs(N.y) < 0.6) L *= mix(0.5, 1.0, smoothstep(0.0, 1.4, P.y));
  float ms = uSd.w > 0.5 ? mapSh(uShM, uMoonM, P + N * 0.05, uBi.z, 1.0) : 1.0;
  L += uMoonC * max(dot(N, uMoonD), 0.0) * ms;
  if (gls > 0.0) { vec3 h = normalize(uMoonD + V); spec += uMoonC * ms * pow(max(dot(N, h), 0.0), gls) * (gls + 2.0) * 0.04; }
  for (int i = 0; i < uNL; i++) {
    vec3 d = uLP[i].xyz - P; float r2 = dot(d, d); vec3 l = d * inversesqrt(r2);
    float ndl = dot(N, l);
    if (ndl <= 0.0) continue;
    vec3 lc = uLC[i].rgb * lampCone(i, l) * lampSh(i, P + N * 0.04, uMode == 1 ? 8 : 4) / (r2 + 0.3);
    L += lc * ndl;
    if (gls > 0.0) { vec3 h = normalize(l + V); spec += lc * pow(max(dot(N, h), 0.0), gls) * (gls + 2.0) * 0.04; }
  }
  for (int i = 0; i < uNW; i++) {
    vec3 d = uWP[i].xyz - P; float r2 = dot(d, d); vec3 l = d * inversesqrt(r2);
    L += uWC * (uWN[i].w * max(dot(-l, uWN[i].xyz), 0.0) * max(dot(N, l), 0.0) / (r2 + uWP[i].w));
  }
  return L;
}
void main() {
  vec3 eye = uMir > 0.5 ? vec3(uEye.x, -uEye.y, uEye.z) : uEye;
  vec3 V = normalize(eye - vW);
  vec3 Ng = normalize(vN);
  if (dot(Ng, V) < 0.0) Ng = -Ng;
  int m = int(vM.x + 0.5);
  if (uMir > 0.5 && m == 0) discard;
  float fl = vS.z;
  noiseAll();
  vec3 N = Ng; vec3 alb, em; float gls, spk, rfl, cls;
  surf(N, alb, em, gls, spk, rfl, cls);
  if (uMode == 2) {
    vec2 at = vec2(0.0);
    if (fl > 1.5) at = groundAt(vW); else if (fl > 0.5) at = vS.xy / vec2(${ht(p0)}, ${ht(Do)});
    float fr = 0.0;
    if (fl > 0.5 && Ng.y <= 0.35) { cls = 8.0; fr = clamp(vS.w - vW.y, 0.0, 0.9); }
    else if (cls == 3.0 && abs(Ng.y) < 0.4) { fr = clamp(-dot(Ng.xz, uSd.yz), 0.0, 1.0) * (m == 9 || m == 8 || m == 6 ? 0.9 : 0.3); }
    o = vec4(at, dot(vW - uEye, uFwd), cls + fr);
    return;
  }
  vec3 P = vW; float e = 0.0;
  if (uMode == 1) {
    gls = 0.0; N = vec3(0.0, 1.0, 0.0);
    if (fl > 0.5) {
      if (Ng.y > 0.35) { N = normalize(Ng + vec3(0.0, 0.6, 0.0)); e = smoothstep(0.35, 0.8, Ng.y); }
      else P = vec3(vW.x, vS.w + 0.02, vW.z);
      e = (Ng.y > 0.35 ? e : 1.0) * mapSh(uShS, uSkyM, P + Ng * 0.03 * step(0.35, Ng.y), uBi.x, 1.6);
    }
  }
  vec3 spec = vec3(0.0);
  vec3 L = lightAt(P, N, V, gls, spec);
  if (uMode == 1) { o = vec4(L, e); return; }
  vec3 col = alb * L + spec * spk + em;
  if (rfl > 0.0) { float fr = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0); col += uEnv * fr * rfl; }
  o = vec4(col, 0.0);
}`,U1=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform sampler2D uI, uNz;
uniform vec3 uEye, uFwd, uRt, uUp; uniform float uTan;
uniform int uNS;
${Le}
${P1}
void main() {
  float z = textureLod(uI, vUv, 0.0).b;
  vec3 r = uFwd + (vUv.x * 2.0 - 1.0) * uTan * uRt + (vUv.y * 2.0 - 1.0) * uTan * uUp;
  float rl = length(r); vec3 rn = r / rl;
  float tEnd = min(z, 60.0);
  float j = textureLod(uNz, gl_FragCoord.xy / 128.0, 0.0).b;
  vec3 acc = vec3(0.0);
  float dt = tEnd / float(uNS);
  for (int s = 0; s < uNS; s++) {
    vec3 X = uEye + r * ((float(s) + j) * dt);
    for (int i = 0; i < uNL; i++) {
      vec3 d = uLP[i].xyz - X; float r2 = dot(d, d); vec3 l = d * inversesqrt(r2);
      float g = 0.3, c = dot(l, rn);
      float ph = (1.0 - g * g) / pow(1.0 + g * g + 2.0 * g * c, 1.5);
      acc += uLC[i].rgb * lampCone(i, l) * (0.08 + 0.92 * smoothstep(0.3, 0.8, l.y)) * lampSh(i, X, 4) * ph / (r2 + 0.6);
    }
  }
  o = vec4(acc * dt * rl, 1.0);
}`,or=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uR; uniform float uSp;
void main() {
  vec2 uv = vUv;
  vec3 c = textureLod(uR, uv, 1.5).rgb * 0.3 + (textureLod(uR, uv + vec2(0.0, uSp), 2.0).rgb + textureLod(uR, uv - vec2(0.0, uSp), 2.0).rgb) * 0.2
    + (textureLod(uR, uv + vec2(0.0, uSp * 2.6), 3.0).rgb + textureLod(uR, uv - vec2(0.0, uSp * 2.6), 3.0).rgb) * 0.12 + (textureLod(uR, uv + vec2(0.0, uSp * 5.0), 3.5).rgb + textureLod(uR, uv - vec2(0.0, uSp * 5.0), 3.5).rgb) * 0.03;
  o = vec4(c, 1.0);
}`,D1=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform sampler2D tC, tS, tI, tR, tV, tA, tN;
uniform vec4 uA;    // time, snowfall density, blizzard blur, exposure
uniform vec4 uB;    // fog k, bake/size ratio, size, thaw wet
uniform vec3 uFogC, uEye, uFwd, uRt, uUp;
uniform float uTan;
uniform vec4 uH[6]; uniform vec3 uHC[6]; uniform int uNH;
uniform vec4 uFx;   // fox trail: origin x z, direction x z (all 0 = none)
uniform vec4 uAu;
uniform vec4 uSn;   // snow tint, windward plaster
uniform vec4 uTr;   // tracks: lane offset, street half, street style, -
uniform int uCapN; uniform float uCapS;
${Le}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
void main() {
  vec2 uv = vUv;
  ivec2 bs = textureSize(tI, 0);
  ivec2 ip = clamp(ivec2(gl_FragCoord.xy * uB.y), ivec2(0), bs - 1);
  vec4 I = texelFetch(tI, ip, 0);
  float z = I.b, cls = floor(I.a + 0.002), fr = fract(I.a + 0.002);
  vec3 r = uFwd + (uv.x * 2.0 - 1.0) * uTan * uRt + (uv.y * 2.0 - 1.0) * uTan * uUp;
  vec3 rn = normalize(r);
  vec3 P = uEye + r * min(z, 400.0);
  vec4 C4 = texture(tC, uv);
  vec3 C = C4.rgb;
  float bl = uA.z * smoothstep(6.0, 40.0, z);
  if (bl > 0.01) C = mix(C, textureLod(tC, uv, 1.0 + 3.0 * bl).rgb, min(1.0, bl * 1.4));
  vec4 S = texture(tS, uv);
  vec2 Q = vec2(P.x + P.y * 0.7, P.z - P.y * 0.6);
  float nA = texture(tN, Q * 0.31).a, nB = texture(tN, Q * 2.3).b, nC = texture(tN, Q * 0.07).r;
  vec2 aUv = I.rg;
  if (cls < 2.5 || cls == 9.0) aUv += (vec2(nA, nB) - 0.5) * 0.013; // the sim's grid never shows as blocks
  vec2 A = texture(tA, aUv).rg;
  float D = A.r * A.r * 0.6, Wt = A.g * 1.2;
  // ---- the wet street: darker, mirror of the lamps and windows, streaked
  vec3 R = vec3(0.0); float fres = 0.0;
  if ((cls > 0.5 && cls < 2.5) || cls == 5.0) {
    float pud = smoothstep(0.42, 0.68, nC);
    vec2 rip = vec2((texture(tN, P.xz * vec2(0.6, 0.25) + uA.x * vec2(0.0, 0.03)).b - 0.5) * 0.006, 0.0);
    if (cls == 5.0) rip += vec2((texture(tN, P.xz * 0.15 + uA.x * 0.02).g - 0.5) * 0.008, 0.0);
    vec2 ru = uv + rip;
    R = texture(tR, ru).rgb;
    fres = 0.03 + 0.97 * pow(1.0 - clamp(-rn.y, 0.0, 1.0), 5.0);
    float wet = cls == 5.0 ? 1.0 : clamp(max(Wt, uB.w), 0.0, 1.0) * (cls < 1.5 ? 1.0 : 0.6) * mix(0.75, 1.0, pud);
    C = C * mix(1.0, 0.3, wet) + R * fres * wet * mix(0.9, 1.6, pud) * 1.3;
  }
  // ---- snow on this surface
  float cov = 0.0;
  // snow is grain and mottle at every scale (fine crystals, wind scoops, whole bare patches), never a flat tint
  if (cls != 8.0 && S.a > 0.01) {
    float nM = texture(tN, Q * 0.83 + 0.41).g;
    vec3 snowC = S.rgb * uSn.rgb * (0.66 + 0.5 * nM + 0.26 * (nB - 0.5));
    float th = 0.0009 + 0.011 * smoothstep(0.25, 0.85, nC * 0.45 + nA * 0.35 + nB * 0.2);
    if (cls == 2.0 && uTr.w != 0.0 && P.x * uTr.w > 0.0) {
      // someone walked down this pavement: prints broken by the new snow
      float stride = 0.78, kz = floor(P.z / stride), lr = mod(kz, 2.0) * 2.0 - 1.0;
      vec2 fq = vec2(abs(P.x) - abs(uTr.w) - sin(kz * 0.19 + uTr.y) * 0.18 - lr * 0.12, (fract(P.z / stride) - 0.5) * stride);
      float fp = smoothstep(1.05, 0.7, length(fq / vec2(0.075, 0.14)) + (nB - 0.5) * 0.55);
      D *= 1.0 - fp * (0.5 + 0.45 * h21(vec2(kz, 7.0)));
    }
    if (D > 0.002) {
      // relief from the sim's own depth: drifts and scoops catch the light on one side
      snowC *= 1.0 + clamp(A.r - texture(tA, aUv + vec2(1.0 / 128.0)).r, -0.2, 0.2) * 2.4;
    }
    float trk = 0.0;
    if (cls == 1.0) {
      // tyre lines: narrow, wandering a little, broken where the wheels ran over wetter ground; one lane more used than the other
      float ln = step(0.0, P.x), wob = (texture(tN, vec2(P.z * 0.017, 0.31 + ln * 0.37)).r - 0.5) * 0.55;
      float lx = abs(abs(P.x - wob) - uTr.x);
      trk = smoothstep(0.14, 0.04, abs(lx - 0.74) + (nB - 0.5) * 0.09) * smoothstep(0.22, 0.5, nA + 0.3 * nC) * mix(1.0, 0.5, ln);
      th += trk * 0.009;
    }
    if (uFx.z != 0.0 && (cls == 1.0 || cls == 2.0 || cls == 9.0)) {
      // a fox crossed a while ago: one neat line of small prints, filling in as the snow deepens
      vec2 rel = P.xz - uFx.xy;
      float al = dot(rel, uFx.zw), ac = dot(rel, vec2(uFx.w, -uFx.z)), kf = floor(al / 0.36);
      vec2 fq = vec2(ac - sin(kf * 0.23) * 0.22 - (mod(kf, 2.0) - 0.5) * 0.05, (fract(al / 0.36) - 0.5) * 0.36);
      D *= 1.0 - 0.85 * smoothstep(1.05, 0.65, length(fq / vec2(0.042, 0.06)) + (nB - 0.5) * 0.4) * step(0.0, al) * step(al, 17.0);
    }
    cov = S.a * smoothstep(th, th + 0.003 + 0.006 * nB, D);
    float slush = cls == 1.0 || cls == 2.0 ? clamp(Wt * 1.3, 0.0, 1.0) * (1.0 - smoothstep(0.02, 0.07, D)) : 0.0;
    snowC = mix(snowC, snowC * vec3(0.42, 0.42, 0.45) + R * fres * 0.5, slush);
    float gl = h21(floor(Q * 90.0)), spark = step(0.9968, gl) * (1.0 - slush) * step(0.003, D);
    snowC += S.rgb * spark * (0.5 + 2.2 * fract(gl * 613.7));
    C = mix(C, snowC, cov);
  }
  // windward plaster on thin things in a blizzard
  if (cls == 3.0 && fr > 0.0) C = mix(C, S.rgb * uSn.rgb * 0.8, fr * uSn.w * smoothstep(0.35, 0.65, nB + 0.3 * nA));
  // ---- snow thickness: a cap of snow rising above any snowy surface below this pixel (sills, rails, eaves, fence foot)
  float ppm = uB.z * 0.5 / (uTan * max(z, 0.3));
  float stepPx = uCapS * ppm;
  if (cls != 0.0 && cls != 8.0 && cls != 1.0 && cls != 2.0 && cls != 9.0 && cls != 5.0 && stepPx > 0.7 && cov < 0.95) {
    for (int k = 1; k <= uCapN; k++) {
      float off = float(k) * stepPx;
      ivec2 q = ip - ivec2(0, int(off * uB.y + 0.5));
      if (q.y < 0) break;
      vec4 Iq = texelFetch(tI, q, 0);
      float cq = floor(Iq.a + 0.002);
      if (Iq.b > z + 0.3 || cq == 0.0 || cq == 4.0 || cq == 7.0) continue;
      vec4 Sq = texelFetch(tS, q, 0);
      if (Sq.a < 0.2) continue;
      float Dq = textureLod(tA, Iq.rg, 0.0).r; Dq = Dq * Dq * 0.6;
      float base = cq == 8.0 ? fract(Iq.a + 0.002) : 0.0;
      float hq = (Dq * min(1.0, Sq.a * 1.4) + base) * uB.z * 0.5 / (uTan * Iq.b);
      if (Dq > 0.006 && hq > off - stepPx * 0.5) {
        float a = smoothstep(off - stepPx * 0.5, off + stepPx * 0.5, hq);
        vec3 capC = Sq.rgb * uSn.rgb * (0.82 + 0.25 * nB);
        C = mix(C, capC, a);
        break;
      }
    }
  }
  // ---- haze and the lamp light in it
  float zf = cls == 0.0 ? 140.0 : cls == 6.0 ? 110.0 : min(z, 160.0);
  float T = exp(-zf * uB.x);
  C = C * T + uFogC * (1.0 - T);
  C += texture(tV, uv).rgb * uA.y * 0.5;
  // ---- aurora in the clear parts of the sky
  if (uAu.x > 0.0 && (cls == 0.0)) {
    float el = rn.y, az = at2(rn.x, rn.z);
    float eb = 0.07 + 0.07 * texture(tN, vec2(az * 0.3 + uAu.y * 0.004, 0.2)).r;
    float ray = texture(tN, vec2(az * 5.0 + uAu.y * 0.015, 0.5)).b * 0.7 + texture(tN, vec2(az * 13.0 - uAu.y * 0.01, 0.8)).g * 0.5;
    float k = smoothstep(eb - 0.01, eb + 0.02, el) * exp(-(el - eb) * 3.5) * (0.25 + ray * ray * 1.4);
    vec3 ac = mix(vec3(0.05, 0.9, 0.35), vec3(0.5, 0.12, 0.55), smoothstep(0.08, 0.35, el - eb));
    C += ac * k * uAu.x * (0.35 + 0.65 * C4.a) * 0.22;
  }
  // ---- glows: lamp heads (stronger in thick snow), bloom from the bake's mips
  for (int i = 0; i < 6; i++) {
    if (i >= uNH) break;
    vec2 d = uv - uH[i].xy; float d2 = dot(d, d), w2 = uH[i].w * uH[i].w;
    C += uHC[i] * uH[i].z * (exp(-d2 / (w2 * 0.06)) * 0.6 + w2 / (d2 + w2) * 0.12 + exp(-d2 / (w2 * 9.0)) * 0.05) * (1.0 + uA.y * 10.0);
  }
  vec3 b1 = textureLod(tC, uv, 4.0).rgb, b2 = textureLod(tC, uv, 6.0).rgb;
  C += max(b1 - 0.5, 0.0) * 0.1 + max(b2 - 0.25, 0.0) * 0.18;
  // ---- film
  C *= uA.w;
  C = aces(C);
  C = pow(C, vec3(1.0 / 2.2));
  vec2 vc = uv - 0.5;
  C *= 1.0 - 0.22 * pow(dot(vc, vc) * 2.0, 1.4);
  C += (texture(tN, gl_FragCoord.xy / 128.0 + fract(uA.x * vec2(0.37, 0.71))).b - 0.5) * 0.03;
  o = vec4(C, 1.0);
}`,_1=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
layout(location = 0) in vec4 aA;
layout(location = 1) in vec4 aB;
uniform mat4 uVP;
uniform vec4 uC;     // size, tan, time, exposure
uniform vec4 uFoc;   // focus distance, coc scale, base alpha, -
uniform vec3 uAmb, uEye, uRt, uFogF;
uniform vec4 uLP[4]; uniform vec4 uLC[4]; uniform int uNL;
uniform sampler2D tN;
out vec2 vQ; out vec3 vCol; out float vA; out float vZ; out float vH; out float vPx; flat out float vT; flat out float vS;
float cone(int i, vec3 l) { float cd = l.y; return mix(uLC[i].w, 1.0, smoothstep(0.0, 0.55, cd)) * (0.22 + 0.78 * smoothstep(-0.45, 0.05, cd)); }
void main() {
  int k = gl_VertexID;
  vec2 c = vec2(float(k & 1), float(k >> 1)) * 2.0 - 1.0;
  float ty = floor(aB.w), al = fract(aB.w) * 1.0001;
  vT = ty; vS = aA.w;
  vec3 p = aA.xyz;
  float fp = al, den = 1.0; vec3 sway = vec3(0.0);
  if (ty == 0.0) {
    // each flake wanders on two unrelated sways (bigger flakes swing wider); curtains of denser snow drift through
    float f = 1.2 + fp * 2.6, ph = fp * 40.0, amp = mix(0.6, 1.35, smoothstep(0.006, 0.05, aA.w));
    float A = uFoc.w / f * amp, ph2 = ph * 2.7, ph3 = ph * 3.1, tf = uC.z * f;
    p += vec3(sin(tf + ph) + 0.55 * sin(tf * 0.37 + ph2), 0.0, cos(tf * 0.8 + ph) * 0.6 + 0.4 * cos(tf * 0.31 + ph3)) * A;
    sway = vec3(cos(tf + ph) + 0.2 * cos(tf * 0.37 + ph2), 0.0, -0.48 * sin(tf * 0.8 + ph) - 0.12 * sin(tf * 0.31 + ph3)) * A * f;
    al = 1.0;
    float dn = textureLod(tN, vec2(p.x * 0.05 + p.z * 0.021 + uC.z * 0.012, p.y * 0.075 + uC.z * 0.06), 0.0).r;
    den = mix(0.45, 1.0, smoothstep(0.32, 0.68, dn));
  }
  vec4 cp = uVP * vec4(p, 1.0);
  float z = cp.w;
  vZ = z;
  if (z < 0.25 || al <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vA = 0.0; return; }
  float ppm = uC.x * 0.5 / (uC.y * z);
  vec3 L = uAmb;
  for (int i = 0; i < 4; i++) {
    if (i >= uNL) break;
    vec3 d = uLP[i].xyz - p; float r2 = dot(d, d); vec3 l = d * inversesqrt(r2);
    float fw = 0.9 + 2.4 * pow(max(dot(-l, normalize(uEye - p)), 0.0), 3.0);
    L += uLC[i].rgb * cone(i, l) * fw / (r2 + 0.35);
  }
  if (ty < 2.5) L += uFogF;
  if (ty < 1.5) L /= 1.0 + 0.22 * max(L.r, max(L.g, L.b)); // a flake right beside a lamp stays a flake, not a white bead
  float r = aA.w * ppm * (ty == 1.0 ? 0.36 : 0.5);
  vec4 cq = uVP * vec4(p - (aB.xyz + sway) * (ty == 0.0 ? 0.018 : ty == 1.0 ? 0.03 : 0.011), 1.0);
  vec2 sv = (cp.xy / cp.w - cq.xy / cq.w) * 0.5 * uC.x;
  float coc = abs(1.0 / z - 1.0 / uFoc.x) * uFoc.y * uC.x / 1000.0;
  float re = min(max(max(r, coc), 0.65), 16.0 * uC.x / 1000.0);
  float a = clamp(r * r / (re * re), 0.0, 1.0) * (re > r + 0.5 ? 0.45 : 1.0);
  float sl = min(length(sv), 40.0);
  vec2 ax = sl > 0.01 ? sv / sl : vec2(0.0, 1.0);
  vec2 ay = vec2(-ax.y, ax.x);
  float hl = sl * 0.5;
  vec2 off = ax * c.x * (re + hl) + ay * c.y * re;
  gl_Position = vec4(cp.xy + off * 2.0 / uC.x * cp.w, cp.z, cp.w);
  vQ = vec2(c.x * (re + hl), c.y * re) / re; vH = hl / re; vPx = re;
  a *= re / (re + hl * 0.7);
  vA = a * al * (ty == 2.0 ? 0.13 : ty == 1.0 ? 0.72 : uFoc.z);
  if (ty == 0.0) vA *= den * (0.7 + 0.45 * fract(fp * 91.7)) * (0.2 + 0.8 * smoothstep(0.8, 2.4, z));
  vCol = L * 0.9 * uC.w * (ty == 2.0 ? 0.8 : 1.0);
}`,C1=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
in vec2 vQ; in vec3 vCol; in float vA; in float vZ; in float vH; in float vPx; flat in float vT; flat in float vS;
out vec4 o;
uniform sampler2D tI, tN;
uniform float uBR;
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
void main() {
  ivec2 bs = textureSize(tI, 0);
  float sz = texelFetch(tI, clamp(ivec2(gl_FragCoord.xy * uBR), ivec2(0), bs - 1), 0).b;
  if (sz < vZ - 0.15) discard;
  float d = length(vec2(max(abs(vQ.x) - vH, 0.0), vQ.y));
  float a;
  if (vT == 0.0) {
    // no clean discs: a broken edge on every flake, and a defocused near flake is a faint smudge
    if (vPx > 1.4) d += (texture(tN, vec2(vQ.y * 0.17 + vS * 61.0, vQ.x * 0.02 + vS * 97.0)).b - 0.5) * (vPx > 2.5 ? 0.7 : 0.45) / (1.0 + vH * 0.6); // across the flake only, so a streak never breaks into separate dots
    float e = 1.0 - smoothstep(0.0, 1.0, d);
    a = vPx > 2.5 ? pow(max(e, 0.0), 1.6) * 0.75 : 1.0 - smoothstep(0.2, 1.0, d);
    if (vH > 0.1) a *= 1.0 - 0.7 * smoothstep(0.0, 1.0, abs(vQ.x) / (vH + 1.0)); // a soft trail, not a dash
  }
  else if (vT == 2.0) a = exp(-d * d * 3.0) * (1.0 - smoothstep(0.7, 1.0, d));
  else a = 1.0 - smoothstep(0.25, 1.0, d);
  if (vT == 1.0) a = smoothstep(0.9, 0.3, d + (texture(tN, vQ * 0.4 + vS * 50.0).b - 0.5) * 0.8); // a falling clump is loose powder, already coming apart
  a *= vA;
  if (a < 0.003) discard;
  vec3 col = pow(aces(vCol), vec3(1.0 / 2.2));
  o = vec4(col * a, a);
}`;function H0(m,n,I){const O=(s0,P)=>{const e0=m.createShader(s0);return m.shaderSource(e0,P),m.compileShader(e0),e0},a0=m.createProgram(),c0=O(m.VERTEX_SHADER,n),y0=O(m.FRAGMENT_SHADER,I);return m.attachShader(a0,c0),m.attachShader(a0,y0),m.linkProgram(a0),m.flush(),{p:a0,u:{},sh:[c0,y0]}}const Ln=["shd","sky","scn0","scn1","scn2","scn3","vol","cmp","flk","blr"],B1=[[0],[1,2,3,4],[5,6,8,9,12,15,16,17],[7,10,11,13,14]],I1=[];B1.forEach((m,n)=>m.forEach(I=>{I1[I]=n}));const Qt=m=>tr.replace(`#version 300 es
`,`#version 300 es
`+B1[m].map(n=>"#define M"+n+`
`).join("")),Jt=(m,n)=>{const I=(a0,c0,y0)=>{if(a0.indexOf(c0)<0)throw new Error("027 NF "+m+" "+c0);return a0.split(c0).join(y0)},O=`vec4 dHf(uvec4 u) { return vec4(unpackHalf2x16(u.x | (u.y << 16)), unpackHalf2x16(u.z | (u.w << 16))); }
`;return m==="out"?I(I(n,"out vec4 o;",`out uvec4 oU; vec4 o;
uvec4 eHf(vec4 v) { uint a = packHalf2x16(v.xy), b = packHalf2x16(v.zw); return uvec4(a & 65535u, a >> 16, b & 65535u, b >> 16); }`),`
void main() {`,`
void main0();
void main() { main0(); oU = eHf(o); }
void main0() {`):m==="vol"?I(I(I(n,"o = vec4(acc * dt * rl, 1.0);","o = vec4(acc * dt * rl, 1.0); o.rgb = o.rgb / (o.rgb + 4.0);"),"uniform sampler2D uI, uNz;",`uniform highp usampler2D uI; uniform sampler2D uNz;
`+O),"textureLod(uI, vUv, 0.0).b","dHf(texelFetch(uI, clamp(ivec2(vUv * vec2(textureSize(uI, 0))), ivec2(0), textureSize(uI, 0) - 1), 0)).b"):m==="flk"?I(I(n,"uniform sampler2D tI, tN;",`uniform highp usampler2D tI; uniform sampler2D tN;
`+O),"texelFetch(tI, clamp(ivec2(gl_FragCoord.xy * uBR), ivec2(0), bs - 1), 0).b","dHf(texelFetch(tI, clamp(ivec2(gl_FragCoord.xy * uBR), ivec2(0), bs - 1), 0)).b"):m==="cmp"?I(I(I(I(n,"uniform sampler2D tC, tS, tI, tR, tV, tA, tN;",`uniform sampler2D tC, tS, tR, tV, tA, tN; uniform highp usampler2D tI;
`+O),"texelFetch(tI, ip, 0)","dHf(texelFetch(tI, ip, 0))"),"texelFetch(tI, q, 0)","dHf(texelFetch(tI, q, 0))"),"texture(tV, uv).rgb","dV(texture(tV, uv).rgb)").replace(`uniform highp usampler2D tI;
`,`uniform highp usampler2D tI;
vec3 dV(vec3 x) { return x * 4.0 / max(1.0 - x, vec3(0.002)); }
`):n};function er(m){let n=T1.get(m);if(n)return n;n={shd:H0(m,Qs,Js),sky:H0(m,xo,z1),scn0:H0(m,$t,Qt(0)),scn1:H0(m,$t,Qt(1)),scn2:H0(m,$t,Qt(2)),scn3:H0(m,$t,Qt(3)),vol:H0(m,xo,U1),blr:H0(m,xo,or),cmp:H0(m,xo,D1),flk:H0(m,_1,C1),vao0:m.createVertexArray(),ok:!1,owner:null};const I=128,O=(s0,P,e0,w0)=>{s0=(s0%e0+e0)%e0,P=(P%e0+e0)%e0;let T=s0*374761393+P*668265263+w0*2246822519|0;return T=Math.imul(T^T>>>13,1274126177),T^=T>>>16,(T>>>0)/4294967296},a0=(s0,P,e0,w0)=>{const T=Math.floor(s0),D=Math.floor(P),z0=s0-T,Z=P-D,U=z0*z0*(3-2*z0),ot=Z*Z*(3-2*Z),h0=O(T,D,e0,w0),et=O(T+1,D,e0,w0),to=O(T,D+1,e0,w0),Ft=O(T+1,D+1,e0,w0);return h0+(et-h0)*U+(to-h0)*ot+(h0-et-to+Ft)*U*ot},c0=(s0,P,e0,w0,T)=>{let D=0,z0=.5,Z=e0,U=0;for(let ot=0;ot<w0;ot++)D+=z0*a0(s0*Z/I,P*Z/I,Z,T+ot),U+=z0,z0*=.5,Z*=2;return D/U},y0=new Uint8Array(I*I*4);for(let s0=0;s0<I;s0++)for(let P=0;P<I;P++){const e0=(s0*I+P)*4;y0[e0]=c0(P,s0,4,4,11)*255,y0[e0+1]=c0(P,s0,8,3,23)*255,y0[e0+2]=(a0(P*32/I,s0*32/I,32,41)*.55+a0(P*64/I,s0*64/I,64,43)*.25+O(P,s0,128,47)*.2)*255,y0[e0+3]=c0(P,s0,16,2,77)*255}for(let s0=0;s0<4;s0++){let P=255,e0=0;for(let w0=s0;w0<y0.length;w0+=4)P=Math.min(P,y0[w0]),e0=Math.max(e0,y0[w0]);for(let w0=s0;w0<y0.length;w0+=4)y0[w0]=(y0[w0]-P)*255/Math.max(1,e0-P)}if(n.nd=y0,n.noise=m.createTexture(),m.bindTexture(m.TEXTURE_2D,n.noise),m.pixelStorei(m.UNPACK_FLIP_Y_WEBGL,!1),m.pixelStorei(m.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),m.pixelStorei(m.UNPACK_ALIGNMENT,1),m.texImage2D(m.TEXTURE_2D,0,m.RGBA8,I,I,0,m.RGBA,m.UNSIGNED_BYTE,y0),m.generateMipmap(m.TEXTURE_2D),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MIN_FILTER,m.LINEAR_MIPMAP_LINEAR),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MAG_FILTER,m.LINEAR),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_WRAP_S,m.REPEAT),m.texParameteri(m.TEXTURE_2D,m.TEXTURE_WRAP_T,m.REPEAT),n.half=!!(m.getExtension("EXT_color_buffer_float")||m.getExtension("EXT_color_buffer_half_float")),m.getExtension("OES_texture_float_linear"),!n.half){for(const s0 of["vol","cmp","flk"])m.deleteProgram(n[s0].p),n[s0].sh.forEach(P=>m.deleteShader(P));Object.assign(n,{skyU:H0(m,xo,Jt("out",z1)),scn0U:H0(m,$t,Jt("out",Qt(0))),scn1U:H0(m,$t,Jt("out",Qt(1))),scn2U:H0(m,$t,Jt("out",Qt(2))),scn3U:H0(m,$t,Jt("out",Qt(3))),vol:H0(m,xo,Jt("vol",U1)),cmp:H0(m,xo,Jt("cmp",D1)),flk:H0(m,_1,Jt("flk",C1))}),n.progs=Ln.concat(["skyU","scn0U","scn1U","scn2U","scn3U"])}return T1.set(m,n),n}function nr(m,n){if(n.ok)return;const I=[];for(const O of n.progs||Ln){const a0=n[O];m.getProgramParameter(a0.p,m.LINK_STATUS)||I.push("027 link "+O+": "+m.getProgramInfoLog(a0.p)+" "+m.getShaderInfoLog(a0.sh[0])+" "+m.getShaderInfoLog(a0.sh[1]))}if(I.length)throw new Error(I.join(" || "));for(const O of n.progs||Ln){const a0=n[O],c0=m.getProgramParameter(a0.p,m.ACTIVE_UNIFORMS);for(let y0=0;y0<c0;y0++){const s0=m.getActiveUniform(a0.p,y0);a0.u[s0.name.replace(/\[0\]$/,"")]=m.getUniformLocation(a0.p,s0.name)}}n.ok=!0}N1.add({num:27,name:"Snowy Street",fam:"Worlds",recipe:"A small town street at night during the first snow of the year, and the snow builds up on roofs, rails, branches, bikes and parked cars. The road goes from wet to slushy to white. The town and how deep it's got change every mint. Drag to blow the snow around, hold to make it snow harder, or tap a branch, gutter, rail or the lamp to knock its snow off.",interactive:"Drag to blow the snow along your stroke: flakes swirl, drifts pile against the fence, roofs and rails are stripped. Hold to make it snow harder. Tap a branch, a gutter, a rail or the lamp to knock its snow down.",music:!0,gl:!0,fps:30,seed:0,make(m){const n=m.gl,I=m.size,O=er(n),a0=O.half,c0=Math.min(I,1024),y0=c0/I,s0={},P=[];for(let o=0;o<8;o++)P.push(parseInt(m.hash.slice(2+o*8,10+o*8),16)>>>0);const e0=(o,t,e,s)=>{const l=new Int32Array([o,t,e,s]),f=()=>{let r=l[0],a=l[1],c=l[2],u=l[3],v=r+a|0;return r=a^a>>>9,a=c+(c<<3)|0,c=c<<21|c>>>11,u=u+1|0,v=v+u|0,c=c+v|0,l[0]=r,l[1]=a,l[2]=c,l[3]=u,(v>>>0)/4294967296};for(let r=0;r<12;r++)f();return f},w0=e0(P[0],P[1],P[2],P[3]),T=e0(P[4],P[5],P[6],P[7]),D=e0(P[1]^P[6],P[3]^P[4],P[5]^1540483477,P[0]^2654435769),z0=(o,t)=>{let e=0;for(const l of t)e+=l[1];let s=o()*e;for(const l of t)if(s-=l[1],s<0)return l[0];return t[t.length-1][0]},Z=(o,t)=>o+(t-o)*T();let U=z0(w0,[["village",27],["mill",25],["harbour",23],["town",25]]),ot=z0(w0,[["sodium",38],["white",30],["moon",18],["dusk",14]]),h0=z0(w0,[["powder",40],["wet",35],["blizzard",25]]),et=w0()<.2,to=z0(w0,[["shop",40],["snowman",35],["fox",25]]),Ft=z0(w0,[["none",86],["aurora",7],["plough",7]]);Ft==="aurora"&&h0==="blizzard"&&(h0="powder"),m.home&&(U="town",ot="sodium",h0="wet",et=!1,to="shop",Ft="none");const sr=e0(P[2]^668265261,P[7]^374761393,P[5]^P[0],P[3]^2246822507);let ft=m.home?"street":z0(sr,[["street",58],["across",42]]);const oo=e0(P[6]^3207904532,P[0]^2644812840,P[4]^P[2],P[1]^23811768),rr=oo(),fr=oo(),lr=oo(),ar=oo(),W1=!m.home&&rr<.5;!m.home&&fr<(ft==="across"?1/3:1/6)&&(ft="walk");const eo=!m.home&&!et&&Ft!=="plough"&&lr<.3,Co=!m.home&&ft!=="across"&&ar<.22;eo&&h0==="blizzard"&&(h0="powder"),m.trait("Town",{village:"Wooden mountain village",mill:"Brick mill town",harbour:"Harbour lane",town:"Narrow old townhouses"}[U]),m.trait("Light",{sodium:"Sodium orange lamps",white:"Cool white lamps",moon:"Full moon breaking through",dusk:"Blue-hour dusk"}[ot]),m.trait("Snowfall",{powder:"Fine powder",wet:"Big wet flakes",blizzard:"Wind-driven blizzard"}[h0]),m.trait("Moment",et?"Rare deep snow":eo?"An hour in":"First dusting"),m.trait("Detail",{shop:"Lit shop window",snowman:"A snowman someone left",fox:"Fox tracks across the street"}[to]),m.trait("Rare",{none:"None",aurora:"Aurora",plough:"Road just ploughed"}[Ft]);const r0=e0(P[3]^625341585,P[6]^1664525,P[1]^P[7],P[4]^1013904242);m.trait("Viewpoint",{street:"Looking down the street",across:"Turned to the houses across",walk:"On the pavement by the lamp"}[ft]),m.trait("Next door",Co?"An empty lot":"A house behind the fence");const V={village:3,mill:3.7,harbour:2.7,town:3.3}[U],S0={village:0,mill:2,harbour:1.3,town:1.9}[U],Pn={village:0,mill:.14,harbour:.1,town:.13}[U],q1={village:2,mill:0,harbour:1,town:T()<.6?1:0}[U],xt=U==="harbour"?50:1e4,I0=V+S0+.25,W0=ft==="walk"?[U==="village"?V-1.5:U==="harbour"?V-.3:I0-1,1.62,U==="mill"?0:4]:[(U==="harbour"?.9:1.2)+(ft==="across"?.5:0),3.25,0],Pe=ft==="walk"?.5*Math.atan((V+.4-W0[0])/(12.2-W0[2])):ft==="across"?-.38:-.03,zn=ft==="walk"?U==="mill"?.08:U==="village"?.05:.03:ft==="across"?-.06:-.11,q0=Math.tan(27*Math.PI/180),lt=[Math.sin(Pe)*Math.cos(zn),Math.sin(zn),Math.cos(Pe)*Math.cos(zn)],N0=[Math.cos(Pe),0,-Math.sin(Pe)],pt=Yt(lt,N0),V1=W1?-1:1,G1=Co?Math.min(I0+9,12.6):0;W1&&(N0[0]=-N0[0],N0[2]=-N0[2]);const wo=o=>{const t=Kt(o,W0),e=Rt(t,lt);return[.5+Rt(t,N0)/(e*q0)*.5,.5+Rt(t,pt)/(e*q0)*.5,e]},ze=.1,Ue=800,H1=(Ue+ze)/(Ue-ze),cr=-2*Ue*ze/(Ue-ze),Bo=new Float32Array(16);{const o=[[...m0(N0,1/q0),-Rt(N0,W0)/q0],[...m0(pt,1/q0),-Rt(pt,W0)/q0],[...m0(lt,H1),-Rt(lt,W0)*H1+cr],[...lt,-Rt(lt,W0)]];for(let t=0;t<4;t++)for(let e=0;e<4;e++)Bo[e*4+t]=o[t][e]}const De=T()<.5?1:-1,Un={powder:.5,wet:.25,blizzard:4.5}[h0],X1={powder:.75,wet:1.3,blizzard:.9}[h0],Mo=De*Un*.95,pe=Un*(T()*.6-.3),O1=Math.hypot(Mo,pe)||1,Io=Mo/O1,Wo=pe/O1,T0=p0*Do,_=new Float32Array(T0),nt=new Float32Array(T0),Bt=new Float32Array(T0),Lt=new Float32Array(T0),no=new Float32Array(T0),Z0=new Uint8Array(T0),bo=new Uint8Array(T0),wt=new Uint8Array(T0),M0=new Float32Array(T0),It=new Float32Array(T0),k0=new Float32Array(T0),_e=new Float32Array(T0),Ce=new Float32Array(T0),Dn=new Float32Array(T0),Be=new Int16Array(T0).fill(-1),go=1,ve=2,Mt=3,qo=4,Ie=5,so=6,yo=[];let Vo=0,Go=ut,Ho=0;function d0(o,t,e,s,l){if(Vo+o>p0&&(Vo=0,Go+=Ho,Ho=0),Go+t>Do)return null;const f=Object.assign({x:Vo,y:Go,w:o,h:t,kind:e,cells:[],id:yo.length},l||{});Vo+=o,Ho=Math.max(Ho,t);for(let r=0;r<t;r++)for(let a=0;a<o;a++){const c=(f.y+r)*p0+f.x+a,u=s(o>1?a/(o-1):.5,t>1?r/(t-1):.5);M0[c]=u[0],It[c]=u[1],k0[c]=u[2],Z0[c]=e,Be[c]=f.id,no[c]=f.cap||1,f.cells.push(c)}return yo.push(f),f}const Pt=(o,t,e,s)=>(l,f)=>Zt(Zt(o,t,l),Zt(s,e,l),f),Y=(o,t,e)=>[o.x+.5+t*(o.w-1),o.y+.5+e*(o.h-1)],We=o=>[Y(o,0,0),Y(o,1,0),Y(o,1,1),Y(o,0,1)];for(let o=0;o<ut;o++){const t=$s((o+.5)/ut);for(let e=0;e<it;e++){const s=Ct+(e+.5)/it*(_o-Ct),l=o*p0+e,f=Math.abs(s);M0[l]=s,It[l]=0,k0[l]=t,Z0[l]=go,no[l]=2,bo[l]=t>xt?4:f<V?1:f<V+S0?2:3}}const qe=(o,t)=>o<Ct||o>_o||t<mo||t>L1?-1:G(Math.floor(Zs(t)*ut),0,ut-1)*p0+G(Math.floor((o-Ct)/(_o-Ct)*it),0,it-1),Xo=[],_n=[new Float32Array(1<<18),new Float32Array(1<<20),new Float32Array(1<<20),new Float32Array(1<<18)],ro=[0,0,0,0];let Oo=0;const E0=[0,0,0,0];function b0(o,t,e,s,l){const f=I1[s[0]]||0;let r=_n[f];if((ro[f]+1)*16>r.length){const c=new Float32Array(r.length*2);c.set(r),r=_n[f]=c}const a=ro[f]*16;ro[f]++,r[a]=o[0],r[a+1]=o[1],r[a+2]=o[2],r[a+3]=t[0],r[a+4]=t[1],r[a+5]=t[2],r[a+6]=e[0],r[a+7]=e[1],r[a+8]=s[0],r[a+9]=s[1],r[a+10]=s[2],r[a+11]=s[3],r[a+12]=l[0],r[a+13]=l[1],r[a+14]=l[2],r[a+15]=l[3],Oo++}function u0(o,t,e,s,l){const f=t||X0(Yt(Kt(o[1],o[0]),Kt(o[3],o[0]))),r=s||[[0,0],[1,0],[1,1],[0,1]],a=l||[E0,E0,E0,E0];b0(o[0],f,r[0],e,a[0]),b0(o[1],f,r[1],e,a[1]),b0(o[2],f,r[2],e,a[2]),b0(o[0],f,r[0],e,a[0]),b0(o[2],f,r[2],e,a[2]),b0(o[3],f,r[3],e,a[3])}function jo(o,t,e,s,l){b0(o[0],t[0],s[0],e,l[0]),b0(o[1],t[1],s[1],e,l[1]),b0(o[2],t[2],s[2],e,l[2]),b0(o[0],t[0],s[0],e,l[0]),b0(o[2],t[2],s[2],e,l[2]),b0(o[3],t[3],s[3],e,l[3])}function ko(o,t,e,s,l){const f=t||X0(Yt(Kt(o[1],o[0]),Kt(o[2],o[0]))),r=l||[E0,E0,E0];b0(o[0],f,s[0],e,r[0]),b0(o[1],f,s[1],e,r[1]),b0(o[2],f,s[2],e,r[2])}const V0={f:(o,t,e)=>[o,t,e],n:(o,t,e)=>[o,t,e]},Cn=(o,t)=>({f:(e,s,l)=>[o*(t+l),s,e],n:(e,s,l)=>[o*l,s,e]}),ir=o=>({f:(t,e,s)=>[t,e,o+s],n:(t,e,s)=>[t,e,s]}),ur=(o,t)=>{const e=Math.cos(t),s=Math.sin(t);return{f:(l,f,r)=>[o[0]+l*e+r*s,o[1]+f,o[2]-l*s+r*e],n:(l,f,r)=>[l*e+r*s,f,-l*s+r*e]}};function H(o,t,e,s,l,f,r,a,c,u){const v=(h,d,M)=>o.f(h,d,M),p=c?c==="g"?2:1:0,g=(h,d)=>c&&c!=="g"?Y(c.r,dt(c.u0,c.u1,(h-t)/(e-t||1)),dt(c.v0,c.v1,(d-f)/(r-f||1))):[0,0],b=(h,d)=>{const M=g(h,d);return[M[0],M[1],p,l]},i=u&&u.ty!==void 0?u.ty:0;u0([v(t,l,f),v(e,l,f),v(e,l,r),v(t,l,r)],o.n(0,1,0),a,[[t,f],[e,f],[e,r],[t,r]],[b(t,f),b(e,f),b(e,r),b(t,r)]),u0([v(t,s,f),v(e,s,f),v(e,l,f),v(t,l,f)],o.n(0,0,-1),a,[[t,s+i],[e,s+i],[e,l+i],[t,l+i]],[b(t,f),b(e,f),b(e,f),b(t,f)]),u0([v(t,s,f),v(t,s,r),v(t,l,r),v(t,l,f)],o.n(-1,0,0),a,[[f,s+i],[r,s+i],[r,l+i],[f,l+i]],[b(t,f),b(t,r),b(t,r),b(t,f)]),u&&u.noBack||(u0([v(t,s,r),v(e,s,r),v(e,l,r),v(t,l,r)],o.n(0,0,1),a,[[t,s+i],[e,s+i],[e,l+i],[t,l+i]],[b(t,r),b(e,r),b(e,r),b(t,r)]),u0([v(e,s,f),v(e,s,r),v(e,l,r),v(e,l,f)],o.n(1,0,0),a,[[f,s+i],[r,s+i],[r,l+i],[f,l+i]],[b(e,f),b(e,r),b(e,r),b(e,f)])),u&&u.bottom&&u0([v(t,s,f),v(e,s,f),v(e,s,r),v(t,s,r)],o.n(0,-1,0),a,null,null)}function W(o,t,e,s,l,f,r,a,c){const u=X0(Kt(t,o)),v=Math.hypot(t[0]-o[0],t[1]-o[1],t[2]-o[2]),p=Math.abs(u[1])>.95?[1,0,0]:[0,1,0],g=X0(Yt(u,p)),b=Yt(g,u),i=(e-s)/Math.max(v,1e-4),h=r&&(c||i>.3||Math.abs(u[1])<.55)?1:0,d=(M,R,k)=>{const S=M/l*R0,F=Math.cos(S),L=Math.sin(S),X=F0(m0(g,F),m0(b,L));return{p:F0(k,m0(X,R)),n:X0(F0(X,m0(u,i))),top:k[1]+R}};for(let M=0;M<l;M++){const R=d(M,e,o),k=d(M+1,e,o),S=d(M+1,s,t),F=d(M,s,t),L=M/l*R0*Math.max(e,.01),X=(M+1)/l*R0*Math.max(e,.01),q=r?[r[0],r[1],h,R.top]:E0,C=r?[r[0],r[1],h,k.top]:E0,n0=a?[a[0],a[1],h,S.top]:E0,J=a?[a[0],a[1],h,F.top]:E0;if(b0(R.p,R.n,[L,0],f,q),b0(k.p,k.n,[X,0],f,C),b0(S.p,S.n,[X,v],f,n0),b0(R.p,R.n,[L,0],f,q),b0(S.p,S.n,[X,v],f,n0),b0(F.p,F.n,[L,v],f,J),c&&s>0){const L0=a?[a[0],a[1],h,t[1]]:E0;b0(t,u,[0,0],f,L0),b0(F.p,u,[0,0],f,L0),b0(S.p,u,[0,0],f,L0)}}}function fo(o,t,e,s,l,f,r){const a=r?1:0;for(let c=0;c<l;c++)for(let u=0;u<l*2;u++){const v=[],p=[];for(const[b,i]of[[0,0],[1,0],[1,1],[0,1]]){const h=(c+i)/l*Math.PI,d=(u+b)/(l*2)*R0,M=[Math.sin(h)*Math.cos(d),Math.cos(h),Math.sin(h)*Math.sin(d)];p.push(X0([M[0]/t,M[1]/e,M[2]/s])),v.push([o[0]+M[0]*t,o[1]+M[1]*e,o[2]+M[2]*s])}const g=r?[r[0],r[1],a,o[1]+e]:E0;for(const b of[0,1,2,0,2,3])b0(v[b],p[b],[u/l,c/l],f,g)}}const bt=[],St=[],A0=[],$0=[],vt=[],E=(o,t,e)=>Ys(o,t,e),Ve={village:[[.2,.12,.07],[.33,.21,.12],[.24,.22,.2],[.27,.16,.09]],mill:[[.36,.13,.08],[.28,.14,.09],[.21,.1,.07],[.5,.45,.36],[.33,.16,.1]],harbour:[[.42,.08,.06],[.6,.42,.14],[.16,.26,.38],[.74,.73,.69],[.21,.33,.26],[.36,.4,.45]],town:[[.66,.6,.48],[.62,.48,.3],[.5,.5,.48],[.5,.56,.6],[.62,.48,.44],[.7,.69,.64]]}[U],Ge={village:[[.3,.07,.05],[.1,.18,.11],[.16,.16,.17],[.22,.17,.13]],mill:[[.1,.1,.11],[.14,.12,.1]],harbour:[[.12,.12,.13],[.32,.08,.05],[.15,.16,.18]],town:[[.13,.14,.16],[.17,.18,.2],[.36,.17,.1]]}[U],U0=o=>o[Math.floor(T()*o.length)],hr={village:.55,mill:.42,harbour:.6,town:.5}[U];function He(o,t){const{a0:e,a1:s,d:l,h:f}=t,r=s-e,a=[t.wall[0],t.wall[1],t.wall[2],t.wall[3]||0],c=[6,t.trim,0,0],u=t.recess?.16:0,v=o.n(0,0,-1),p=(i,h,d,M,R,k,S,F)=>u0([o.f(...i),o.f(...h),o.f(...d),o.f(...M)],R?o.n(...R):null,k,S,F),g=d0(Math.max(1,t.cols),Math.max(1,t.floors),Mt,(i,h)=>o.f(e+r*(Math.round(i*(t.cols-1))+.5)/t.cols,t.sill+Math.round(h*(t.floors-1))*t.fh,-.03),{cap:.07});for(let i=0;i<t.floors;i++){const h=i*t.fh,d=i===t.floors-1?f:(i+1)*t.fh,M=[];if(i===0&&t.shop){const k=t.door>=0?t.door:-1,S=k>=0?e+r*(k+.5)/t.cols:-99;k>=0&&M.push({cL:S-.55,cR:S+.55,y0:0,y1:2.2,kind:"door"});const F=k===0?S+.85:e+.5,L=k===t.cols-1?S-.85:s-.5;k>0&&k<t.cols-1?(M.push({cL:e+.5,cR:S-.85,y0:.5,y1:2.6,kind:"shop"}),M.push({cL:S+.85,cR:s-.5,y0:.5,y1:2.6,kind:"shop"})):M.push({cL:F,cR:L,y0:.5,y1:2.6,kind:"shop"})}else for(let k=0;k<t.cols;k++){const S=e+r*(k+.5)/t.cols;i===0&&k===t.door?M.push({cL:S-.55,cR:S+.55,y0:0,y1:2.2,kind:"door"}):t.blind&&t.blind(i,k)||M.push({cL:S-t.ww/2,cR:S+t.ww/2,y0:h+t.sill,y1:h+t.sill+t.wh,kind:"win",k,f:i})}M.sort((k,S)=>k.cL-S.cL);let R=e;for(const k of M){k.cL>R+.001&&p([R,h,0],[k.cL,h,0],[k.cL,d,0],[R,d,0],[0,0,-1],a,[[R,h],[k.cL,h],[k.cL,d],[R,d]]),k.y0>h+.001&&p([k.cL,h,0],[k.cR,h,0],[k.cR,k.y0,0],[k.cL,k.y0,0],[0,0,-1],a,[[k.cL,h],[k.cR,h],[k.cR,k.y0],[k.cL,k.y0]]),k.y1<d-.001&&p([k.cL,k.y1,0],[k.cR,k.y1,0],[k.cR,d,0],[k.cL,d,0],[0,0,-1],a,[[k.cL,k.y1],[k.cR,k.y1],[k.cR,d],[k.cL,d]]),R=k.cR;const S=k.kind==="door"?.2:k.kind==="shop"?.28:Math.max(u,.02),{cL:F,cR:L,y0:X,y1:q}=k,C=k.kind==="win"&&g?Y(g,t.cols>1?k.k/(t.cols-1):0,t.floors>1?k.f/(t.floors-1):0):null,n0=C?[C[0],C[1],1,X]:E0;p([F,X,0],[F,X,S],[F,q,S],[F,q,0],[1,0,0],a,[[F,X],[F+S,X],[F+S,q],[F,q]]),p([L,X,0],[L,X,S],[L,q,S],[L,q,0],[-1,0,0],a,[[L,X],[L+S,X],[L+S,q],[L,q]]),p([F,q,0],[L,q,0],[L,q,S],[F,q,S],[0,-1,0],a,[[F,q],[L,q],[L,q+S],[F,q+S]]),k.kind!=="door"&&p([F,X,0],[L,X,0],[L,X,S],[F,X,S],[0,1,0],c,[[F,0],[L,0],[L,S],[F,S]],[n0,n0,n0,n0]);const J=[[F,X,S],[L,X,S],[L,q,S],[F,q,S]],L0=o.f((F+L)/2,(X+q)/2,0);if(k.kind==="door"){if(p(...J,[0,0,-1],[13,t.doorC,0,0]),H(o,F-.25,L+.25,0,t.stoop?.18:.12,-.45,0,[4,E(.3,.29,.27),0,0],"g"),t.stoop&&(H(o,F-.2,L+.2,0,.36,-.75,-.45,[4,E(.3,.29,.27),0,0],"g"),H(o,F-.15,L+.15,0,.54,-.45,0,[4,E(.3,.29,.27),0,0],"g")),t.canopy){const P0=d0(3,2,Mt,Pt(o.f(F-.3,2.62,-.75),o.f(L+.3,2.62,-.75),o.f(L+.3,2.62,0),o.f(F-.3,2.62,0)),{cap:.12});H(o,F-.3,L+.3,2.5,2.62,-.75,0,c,P0?{r:P0,u0:0,u1:1,v0:0,v1:1}:null),P0&&A0.push({kind:"ledge",r:P0,p:[o.f(F-.3,2.56,-.75),o.f(L+.3,2.56,-.75)]})}if(T()<.7){const P0=.5+T()*.4,$=[(F+L)/2,2.35];p([F+.1,2.22,S-.01],[L-.1,2.22,S-.01],[L-.1,2.45,S-.01],[F+.1,2.45,S-.01],[0,0,-1],[7,t.trim,P0,T()],[[0,0],[1,0],[1,1],[0,1]])}}else{const P0=k.kind==="shop",$=P0?1:T()<(i===0?t.lit+.1:t.lit)?.55+T()*.75:0;if(p(...J,[0,0,-1],P0?[14,t.trim,1,0]:[7,t.trim,$,T()],[[0,0],[1,0],[1,1],[0,1]]),$>0){const K=(L-F)*(q-X);St.push({p:F0(L0,m0(v,.45)),n:v,I:$*K*(P0?2.2:.55),soft:.35+K*.25,shop:P0})}if(!P0)H(o,F-.07,L+.07,X-.07,X,-.07,.01,c,g?{r:g,u0:g.w>1?k.k/(g.w-1):0,u1:g.w>1?k.k/(g.w-1):0,v0:g.h>1?k.f/(g.h-1):0,v1:g.h>1?k.f/(g.h-1):0}:null,{noBack:!0}),t.lintel&&H(o,F-.08,L+.08,q,q+.16,-.025,0,[4,E(.42,.4,.36),0,0],null,{noBack:!0}),t.shutters&&(H(o,F-(L-F)*.5-.03,F-.03,X,q,-.05,-.01,[6,t.shutters,0,0],null),H(o,L+.03,L+(L-F)*.5+.03,X,q,-.05,-.01,[6,t.shutters,0,0],null));else if(H(o,F-.05,L+.05,.38,.5,-.06,.02,c,null,{noBack:!0}),t.awning){const K=d0(8,2,Mt,Pt(o.f(F-.2,2.55,-1.2),o.f(L+.2,2.55,-1.2),o.f(L+.2,3.05,0),o.f(F-.2,3.05,0)),{cap:.15}),B=K?We(K).map(l0=>[l0[0],l0[1],1,0]):null;B&&(B[0][3]=B[1][3]=2.55,B[2][3]=B[3][3]=3.05),p([F-.2,2.55,-1.2],[L+.2,2.55,-1.2],[L+.2,3.05,0],[F-.2,3.05,0],[0,.92,-.39],[16,t.awning,0,0],[[0,0],[1,0],[1,1],[0,1]],B);const x0=K?[[...Y(K,0,0),1,2.55],[...Y(K,1,0),1,2.55],[...Y(K,1,0),1,2.55],[...Y(K,0,0),1,2.55]]:null;p([F-.2,2.3,-1.2],[L+.2,2.3,-1.2],[L+.2,2.55,-1.2],[F-.2,2.55,-1.2],[0,0,-1],[16,t.awning,0,0],null,x0),K&&A0.push({kind:"ledge",r:K,p:[o.f(F-.2,2.5,-1.2),o.f(L+.2,2.5,-1.2)]})}}}R<s-.001&&p([R,h,0],[s,h,0],[s,d,0],[R,d,0],[0,0,-1],a,[[R,h],[s,h],[s,d],[R,d]])}if(p([e,0,0],[e,0,l],[e,f,l],[e,f,0],[-1,0,0],a,[[0,0],[l,0],[l,f],[0,f]]),t.sideWin)for(let i=0;i<t.floors;i++)for(let h=0;h<2;h++){const d=l*(h+1)/3,M=i*t.fh+t.sill,R=T()<t.lit*.7?.5+T()*.6:0;p([e-.02,M,d-.4],[e-.02,M,d+.4],[e-.02,M+t.wh*.85,d+.4],[e-.02,M+t.wh*.85,d-.4],[-1,0,0],[7,t.trim,R,T()],[[0,0],[1,0],[1,1],[0,1]])}Xo.push([o.f(e,0,0),o.f(s,0,l)]);const b=Math.tan(t.pitch);if(t.roof==="sg"){const i=t.ov,h=Math.min(i,.35),d=f-i*b,M=f+l/2*b,R=(l/2+i)/Math.cos(t.pitch),k=[e-h,d,-i],S=[s+h,d,-i],F=[s+h,M,l/2],L=[e-h,M,l/2],X=[0,Math.cos(t.pitch),-Math.sin(t.pitch)],q=G(Math.round(r/.7),4,14),C=G(Math.round(R/.7),3,8),n0=d0(q,C,ve,Pt(o.f(...k),o.f(...S),o.f(...F),o.f(...L)),{cap:.8}),J=n0?We(n0).map(($,K)=>[$[0],$[1],1,K<2?d:M]):null;p(k,S,F,L,X,[5,t.roofM[1],t.roofM[2],0],[[e-h,0],[s+h,0],[s+h,R],[e-h,R]],J),p([e-h,d,l+i],[s+h,d,l+i],F,L,[0,Math.cos(t.pitch),Math.sin(t.pitch)],[5,t.roofM[1],t.roofM[2],0],[[e-h,0],[s+h,0],[s+h,R],[e-h,R]]);const L0=n0?[[...Y(n0,0,0),1,d],[...Y(n0,1,0),1,d],[...Y(n0,1,0),1,d],[...Y(n0,0,0),1,d]]:null;p([e-h,d-.2,-i],[s+h,d-.2,-i],[s+h,d,-i],[e-h,d,-i],[0,0,-1],c,[[e,d-.2],[s,d-.2],[s,d],[e,d]],L0),p([e-h,d-.2,-i],[s+h,d-.2,-i],[s+h,f-.1,0],[e-h,f-.1,0],[0,-1,0],[6,E(.08,.07,.06),0,0]);const P0=n0?[[...Y(n0,0,0),1,d],[...Y(n0,0,1),1,M],[...Y(n0,0,1),1,M],[...Y(n0,0,0),1,d]]:null;if(p([e-h,d-.2,-i],[e-h,M-.2,l/2],[e-h,M,l/2],[e-h,d,-i],[-1,0,0],c,[[0,0],[1,0],[1,1],[0,1]],P0),ko([o.f(e,f,0),o.f(e,f,l),o.f(e,M,l/2)],o.n(-1,0,0),a,[[0,f],[l,f],[l/2,M]]),n0&&($0.push({r:n0,out:o.n(0,0,-1),pitch:t.pitch,metal:t.roofM[2]===1,eave:[o.f(e-h,d,-i),o.f(s+h,d,-i)]}),A0.push({kind:"roof",roof:$0[$0.length-1],p:[o.f(e-h,d-.1,-i),o.f(s+h,d-.1,-i)]})),t.chimney){const $=e+r*(.2+.6*T()),K=l*.35,B=d0(1,1,Mt,()=>o.f($,M+.8,K),{cap:.15});H(o,$-.3,$+.3,f,M+.8,K-.3,K+.3,[2,E(.3,.14,.1),0,0],B?{r:B,u0:0,u1:0,v0:0,v1:0}:null)}if(t.dormers){const $=Math.max(1,Math.floor(r/3));for(let K=0;K<$;K++){const B=e+r*(K+.5)/$,x0=.75,l0=.9,yt=d+(l0+i)*b,Q0=yt+1.2,C0=Q0+.45;H(o,B-x0,B+x0,yt-.4,Q0,l0,l0+1.6,a,null,{noBack:!0});const kt=T()<t.lit?.6+T()*.5:0;p([B-.4,yt+.05,l0-.02],[B+.4,yt+.05,l0-.02],[B+.4,Q0-.15,l0-.02],[B-.4,Q0-.15,l0-.02],[0,0,-1],[7,t.trim,kt,T()]);const Te=d0(2,3,ve,Pt(o.f(B-x0-.1,Q0,l0-.15),o.f(B,C0,l0-.15),o.f(B,C0,l0+1.6),o.f(B-x0-.1,Q0,l0+1.6)),{cap:.3}),yn=Te?We(Te).map((kn,An)=>[kn[0],kn[1],1,An===0||An===3?Q0:C0]):null;p([B-x0-.1,Q0,l0-.15],[B,C0,l0-.15],[B,C0,l0+1.6],[B-x0-.1,Q0,l0+1.6],null,[5,t.roofM[1],t.roofM[2],0],[[0,0],[1,0],[1,1],[0,1]],yn),p([B+x0+.1,Q0,l0-.15],[B,C0,l0-.15],[B,C0,l0+1.6],[B+x0+.1,Q0,l0+1.6],null,[5,t.roofM[1],t.roofM[2],0],[[0,0],[1,0],[1,1],[0,1]],yn),ko([o.f(B-x0,Q0,l0),o.f(B+x0,Q0,l0),o.f(B,C0-.05,l0)],o.n(0,0,-1),a,[[0,0],[1,0],[.5,1]])}}}else if(t.roof==="gf"){const i=t.ov,h=i,d=(e+s)/2,M=f-h*b,R=f+r/2*b,k=(r/2+h)/Math.cos(t.pitch),S=[-Math.sin(t.pitch),Math.cos(t.pitch),0],F=G(Math.round((l+.6)/.8),4,12),L=G(Math.round(k/.7),3,8),X=[e-h,M,-.6],q=[e-h,M,l],C=[d,R,l],n0=[d,R,-.6],J=d0(F,L,ve,Pt(o.f(...X),o.f(...q),o.f(...C),o.f(...n0)),{cap:.8}),L0=J?We(J).map(($,K)=>[$[0],$[1],1,K<2?M:R]):null;p(X,q,C,n0,S,[5,t.roofM[1],t.roofM[2],0],[[-.6,0],[l,0],[l,k],[-.6,k]],L0),p([s+h,M,-.6],[s+h,M,l],C,n0,[Math.sin(t.pitch),Math.cos(t.pitch),0],[5,t.roofM[1],t.roofM[2],0],[[-.6,0],[l,0],[l,k],[-.6,k]],L0);const P0=J?[[...Y(J,0,0),1,M],[...Y(J,1,0),1,M],[...Y(J,1,0),1,M],[...Y(J,0,0),1,M]]:null;p([e-h,M-.2,-.6],[e-h,M-.2,l],[e-h,M,l],[e-h,M,-.6],[-1,0,0],c,null,P0);for(const $ of[-1,1]){const K=$<0?e-h:s+h,B=J?[[...Y(J,0,0),1,M],[...Y(J,0,1),1,R],[...Y(J,0,1),1,R],[...Y(J,0,0),1,M]]:null;p([K,M-.22,-.62],[d,R-.22,-.62],[d,R,-.62],[K,M,-.62],[0,0,-1],c,null,B),p([K,M-.22,-.62],[d,R-.22,-.62],[d,R-.22,0],[K,M-.22,0],[0,-1,0],[6,E(.08,.07,.06),0,0])}if(ko([o.f(e,f,0),o.f(s,f,0),o.f(d,R,0)],v,a,[[e,f],[s,f],[d,R]]),R-f>1.5){const $=f+.35,K=T()<t.lit?.6+T()*.5:0;p([d-.35,$,-.02],[d+.35,$,-.02],[d+.35,$+.85,-.02],[d-.35,$+.85,-.02],[0,0,-1],[7,t.trim,K,T()])}if(J&&($0.push({r:J,out:o.n(-1,0,0),pitch:t.pitch,metal:t.roofM[2]===1,eave:[o.f(e-h,M,-.6),o.f(e-h,M,l)]}),A0.push({kind:"roof",roof:$0[$0.length-1],p:[o.f(e-h,M-.1,-.6),o.f(e-h,M-.1,l)]})),t.balcony){const $=e+r*.18,K=s-r*.18,B=t.fh,x0=d0(6,2,Mt,Pt(o.f($,B,-1),o.f(K,B,-1),o.f(K,B,0),o.f($,B,0)),{cap:.2});H(o,$,K,B-.16,B,-1,0,[1,t.wall[1],1,0],x0?{r:x0,u0:0,u1:1,v0:0,v1:1}:null);const l0=d0(6,1,Mt,Pt(o.f($,B+.95,-.98),o.f(K,B+.95,-.98),o.f(K,B+.95,-.98),o.f($,B+.95,-.98)),{cap:.06});H(o,$,K,B+.88,B+.95,-1,-.93,[1,t.wall[1],1,0],l0?{r:l0,u0:0,u1:1,v0:0,v1:0}:null);for(let yt=$+.06;yt<K;yt+=.16)H(o,yt-.035,yt+.035,B,B+.88,-.99,-.95,[1,t.wall[1],1,0],null);l0&&A0.push({kind:"ledge",r:l0,p:[o.f($,B+.9,-1),o.f(K,B+.9,-1)]})}}else{const i=d0(G(Math.round(r/.8),3,12),1,Mt,Pt(o.f(e,f+.55,.15),o.f(s,f+.55,.15),o.f(s,f+.55,.15),o.f(e,f+.55,.15)),{cap:.18});H(o,e,s,f,f+.55,0,.3,t.parapetM||a,i?{r:i,u0:0,u1:1,v0:0,v1:0}:null,{noBack:!0});const h=d0(G(Math.round(r/.8),3,12),1,Mt,Pt(o.f(e,f-.18,-.13),o.f(s,f-.18,-.13),o.f(s,f-.18,-.13),o.f(e,f-.18,-.13)),{cap:.1});if(H(o,e-.05,s+.05,f-.4,f-.18,-.28,0,[4,E(.4,.38,.34),0,0],h?{r:h,u0:0,u1:1,v0:0,v1:0}:null,{noBack:!0}),p([e,f,.3],[s,f,.3],[s,f,l],[e,f,l],[0,1,0],[6,E(.1,.1,.1),0,0]),i&&A0.push({kind:"ledge",r:i,p:[o.f(e,f+.5,0),o.f(s,f+.5,0)]}),h&&A0.push({kind:"ledge",r:h,p:[o.f(e,f-.25,-.25),o.f(s,f-.25,-.25)]}),t.chimney){const d=e+r*(.25+.5*T()),M=l*.6;H(o,d-.35,d+.35,f,f+1.6,M-.35,M+.35,[2,E(.3,.14,.1),0,0],null)}}}const j1=[];function Bn(o,t,e){const s={a0:t,sill:.95,recess:!0,lit:hr,trim:E(.8,.78,.72),doorC:E(.2,.08,.05),door:-1,shop:!1,chimney:T()<.5};if(U==="village"){const l=Z(7.5,10);Object.assign(s,{a1:t+l,d:Z(8,11),xs:(o>0?I0:V)+Z(2.5,5),floors:2,fh:2.6,h:5.2+Z(-.2,.6),roof:T()<.65?"gf":"sg",pitch:Z(.42,.56),ov:Z(.9,1.3),wall:[1,E(...U0(Ve)),T()<.5?1:2,1],roofM:[5,E(...U0(Ge)),T()<.7?1:4],cols:3,ww:.85,wh:1.05,door:Math.floor(T()*3)===1?1:T()<.5?0:2,shutters:T()<.55?E(...U0([[.32,.1,.06],[.12,.22,.14],[.6,.55,.45]])):0,balcony:T()<.6,gap:Z(2.5,6),fence:!0,trim:E(.75,.7,.6),doorC:E(.22,.13,.07),canopy:!1})}else if(U==="mill"){const l=Z(6,9.5),f=T()<.5?2:3;Object.assign(s,{a1:t+l,d:12,xs:V+S0,floors:f,fh:3.2,h:f*3.2+.4,roof:T()<.65?"flat":"sg",pitch:Z(.55,.65),ov:.3,wall:[2,E(...U0(Ve)),0,0],roofM:[5,E(...U0(Ge)),0],cols:l>8?4:3,ww:.95,wh:1.65,door:Math.floor(T()*3),shop:!1,lintel:!0,gap:T()<.2?Z(2,3.5):0,trim:E(...U0([[.42,.4,.35],[.12,.2,.15],[.7,.68,.6]])),canopy:T()<.4,awning:0})}else if(U==="harbour"){const l=Z(5,7.2);Object.assign(s,{a1:t+l,d:8,xs:V+S0,floors:2,fh:2.7,h:5.4,roof:"gf",pitch:Z(.75,.92),ov:.3,wall:[T()<.75?1:3,E(...U0(Ve)),0,0],roofM:[5,E(...U0(Ge)),T()<.5?1:3],cols:l>6?3:2,ww:.85,wh:1.25,door:Math.floor(T()*2),shutters:0,gap:T()<.5?0:Z(.3,1.2),trim:E(.82,.8,.75),doorC:E(...U0([[.1,.2,.3],[.35,.05,.04],[.15,.25,.15]])),canopy:T()<.3})}else{const l=Z(4.6,6.4),f=T()<.6?3:4;Object.assign(s,{a1:t+l,d:11,xs:V+S0,floors:f,fh:3,h:f*3+.3,roof:"sg",pitch:Z(.86,.98),ov:.28,wall:[T()<.8?3:2,E(...U0(Ve)),0,T()<.6?.9:0],roofM:[5,E(...U0(Ge)),3],cols:l>5.6?3:2,ww:.95,wh:1.7,door:Math.floor(T()*2),stoop:T()<.6,sill:1,lintel:T()<.5,dormers:T()<.6,chimney:T()<.7,gap:0,trim:E(.82,.8,.74),doorC:E(...U0([[.08,.1,.14],[.3,.05,.05],[.12,.2,.15],[.22,.13,.07]])),canopy:T()<.25})}return s}let K1=to!=="shop",Ao=null,Xe=null;function pr(o){const t={nv:Oo,NVS:ro.slice(),shX:Vo,shY:Go,shH:Ho,reg:yo.length,w:St.length,k:A0.length,r:$0.length,b:Xo.length};o();for(let e=t.reg;e<yo.length;e++)for(const s of yo[e].cells)Z0[s]=0,Be[s]=-1,no[s]=0;yo.length=t.reg,Oo=t.nv;for(let e=0;e<4;e++)ro[e]=t.NVS[e];Vo=t.shX,Go=t.shY,Ho=t.shH,St.length=t.w,A0.length=t.k,$0.length=t.r,Xo.length=t.b}const Eo=43,Ko=51.5,lo=U==="harbour"?0:U==="village"?64:70,Yo=U==="harbour"?xt-1.5:lo-3;for(const o of[-1,1]){let t=o<0?5:21.5;if(o>0){const e=Bn(1,6.5,!0);Object.assign(e,{a0:6.5,a1:19.5,xs:I0+5.6,door:1,cols:3,shop:!1,roof:U==="mill"?"sg":e.roof,sideWin:!0,h:Math.min(e.h,7.5),floors:Math.min(e.floors,2)}),e.roof==="flat"&&(e.roof="sg"),Co?pr(()=>He(Cn(1,e.xs),e)):He(Cn(1,e.xs),e)}for(;t<Yo;){if(t>Eo-3&&t<Ko){t=Ko;continue}const e=Bn(o,t,t<30);e.a1>Yo+2&&(e.a1=Math.max(t+3.5,Yo+2)),e.a1>Eo&&e.a0<Eo&&(e.a1=Math.max(e.a0+3.5,Eo)),!K1&&o<0&&t>12&&(e.shop=!0,e.awning=E(...U0([[.45,.05,.05],[.1,.25,.15],[.12,.15,.3]])),e.door=0,K1=!0,Xe=[t,e.a1],e.lit=Math.max(e.lit,.6)),e.sideWin=e.gap>1.5||o>0&&t===21.5,He(Cn(o,e.xs),e),o>0&&t===21.5&&(Ao=e),e.fence&&j1.push([o,e.a0-.5,e.a1+.5]),t=e.a1+e.gap}}if(lo>0){let o=-18;for(;o<18;){const t=Bn(1,o,!1);Object.assign(t,{a1:o+(t.a1-t.a0),shop:!1,gap:Math.min(t.gap,1.5)}),t.roof==="gf"&&U!=="village"&&(t.roof="sg"),He(ir(lo+(U==="village"?6:0)),t),o=t.a1+t.gap}}if(u0([[-80,0,-5],[80,0,-5],[80,0,500],[-80,0,500]],[0,1,0],[0,0,0,0],[[0,0],[1,0],[1,1],[0,1]],[[0,0,2,0],[0,0,2,0],[0,0,2,0],[0,0,2,0]]),Pn>0)for(const o of[-1,1]){const t=U==="harbour"?xt:lo;for(const[e,s]of[[-2,Eo-3],[Ko,t]])H(V0,o*V-.08,o*V+.08,0,Pn,e,s,[4,E(.24,.235,.22),0,0],"g"),H(V0,Math.min(o*(V+.08),o*(V+S0)),Math.max(o*(V+.08),o*(V+S0)),0,Pn*.8,e,s,[0,0,0,0],"g")}if(U==="harbour"){H(V0,-30,30,-.6,.05,xt-.4,xt,[4,E(.3,.29,.27),0,0],"g");for(let e=-V-S0+.4;e<V+S0;e+=2.4){const s=d0(1,1,so,()=>[e,.62,xt-.8],{cap:.08});W([e,0,xt-.8],[e,.55,xt-.8],.14,.12,10,[8,E(.05,.05,.05),0,0],null,null),W([e,.55,xt-.8],[e,.62,xt-.8],.17,.17,10,[8,E(.05,.05,.05),0,0],s?Y(s,0,0):null,s?Y(s,0,0):null,!0)}for(let e=0;e<4;e++){const s=Z(-9,9),l=xt+6+e*5+Z(0,3),f=Z(6,9),r=Z(-.4,.4),a=ur([s,0,l],Math.PI/2+r),c=E(...U0([[.6,.6,.58],[.15,.22,.35],[.45,.1,.07],[.12,.25,.18]]));H(a,-f/2,f/2,-.3,.8,-1.1,1.1,[6,c,0,0],null);const u=d0(4,1,so,Pt(a.f(-f*.3,1.9,0),a.f(f*.1,1.9,0),a.f(f*.1,1.9,0),a.f(-f*.3,1.9,0)),{cap:.1});H(a,-f*.32,f*.12,.8,1.9,-.8,.8,[6,E(.75,.74,.7),0,0],u?{r:u,u0:0,u1:1,v0:0,v1:0}:null);const v=a.f(f*.1+.6,.8,0),p=Z(6,9);W(v,F0(v,[0,p,0]),.06,.04,6,[6,E(.6,.58,.55),0,0],null,null),W(F0(v,[0,p,0]),a.f(-f/2,1,0),.008,.008,3,[8,E(.2,.2,.2),0,0],null,null)}const o=-32,t=150;W([o,0,t],[o,18,t],2,1.5,12,[3,E(.75,.74,.7),0,0],null,null),W([o,18,t],[o,20.5,t],1.2,1.2,12,[11,0,1.5,0],null,null),W([o,20.5,t],[o,22,t],1.5,.2,12,[8,E(.12,.05,.04),0,0],null,null)}if(U==="town"||U==="village"){const o=Z(-5,6),t=lo+26,e=U==="village"?2.2:3,s=U==="village"?16:24;H(V0,o-e,o+e,0,s,t-e,t+e,[4,E(...U==="village"?[.6,.58,.52]:[.42,.4,.36]),0,0],null),H(V0,o-.5,o+.5,s-4,s-1.8,t-e-.02,t-e,[16,E(.01,.01,.012),0,0],null),u0([[o-.7,s-6.6,t-e-.03],[o+.7,s-6.6,t-e-.03],[o+.7,s-5.2,t-e-.03],[o-.7,s-5.2,t-e-.03]],[0,0,-1],[11,0,.12,0]),U==="village"?(W([o,s,t],[o,s+1.2,t],e*.8,e*.9,12,[8,E(.1,.12,.1),0,0],null,null),fo([o,s+2.4,t],e*.95,1.6,e*.95,8,[8,E(.1,.13,.11),0,0],null),W([o,s+3.6,t],[o,s+7,t],.4,.02,8,[8,E(.1,.13,.11),0,0],null,null)):W([o,s,t],[o,s+13,t],e*1.35,.05,4,[5,E(.13,.15,.17),3,0],null,null),H(V0,o-e-3,o+e+9,0,9,t+2,t+22,[4,E(.4,.38,.34),0,0],null)}if(U==="mill"){const o=Z(4,10),t=lo+30;W([o,0,t],[o,34,t],1.5,1,12,[2,E(.32,.13,.08),0,0],null,null),W([o,33,t],[o,34.5,t],1.15,1.15,12,[4,E(.3,.29,.26),0,0],null,null),H(V0,o-22,o+6,0,14,t+3,t+25,[2,E(.3,.13,.09),0,0],null);const e=Z(-12,-5),s=lo+22,l=17;for(const[r,a]of[[-2,-2],[2,-2],[-2,2],[2,2]])W([e+r*1.3,0,s+a*1.3],[e+r*.9,l,s+a*.9],.15,.12,5,[8,E(.12,.11,.1),0,0],null,null);W([e,l,s],[e,l+4.5,s],3.2,3.2,16,[1,E(.33,.22,.14),1,0],null,null);const f=d0(1,1,so,()=>[e,l+6,s],{cap:.3});W([e,l+4.5,s],[e,l+6.6,s],3.5,.1,16,[5,E(.12,.12,.12),1,0],f?Y(f,0,0):null,f?Y(f,0,0):null)}const Y1=18.6,Z1=19.8,vr=7,mr=21.2;function In(o,t,e,s,l){const f=s-e,r=G(Math.round(f/.5),4,40),a=d0(r,1,Mt,i=>[t,.98,e+f*i],{cap:.07}),c=d0(r,1,Mt,i=>[t,.33,e+f*i],{cap:.05}),u=V0,v=a?{r:a,u0:0,u1:0,v0:0,v1:0}:null,p=i=>(i-e)/f,g=l==="iron"?[8,E(.03,.03,.035),0,0]:[6,l==="paint"?E(.72,.7,.64):E(.36,.3,.24),0,0],b=(i,h)=>i?{r:i,u0:0,u1:1,v0:0,v1:0}:null;if(l==="iron"){H(u,t-.02,t+.02,.92,.96,e,s,g,b(a,0),{}),H(u,t-.02,t+.02,.12,.15,e,s,g,b(c,0),{});for(let i=e+.06;i<s;i+=.12)W([t,0,i],[t,1.02,i],.011,.011,4,g,null,null),W([t,1.02,i],[t,1.1,i],.02,0,4,g,null,null);for(let i=e;i<=s+.01;i+=2.4)H(u,t-.05,t+.05,0,1.15,i-.05,i+.05,g,a?{r:a,u0:p(i),u1:p(i),v0:0,v1:0}:null)}else{for(const[i,h,d]of[[.85,.93,a],[.28,.36,c]]){const M=k=>{const S=d?Y(d,p(k),0):[0,0];return[S[0],S[1],d?1:0,h+.02]},R=(k,S,F)=>[F,S,k];u0([R(e,h+.02,t-.06),R(s,h+.02,t-.06),R(s,h+.02,t-.02),R(e,h+.02,t-.02)],[0,1,0],g,null,[M(e),M(s),M(s),M(e)]),u0([R(e,i,t-.06),R(s,i,t-.06),R(s,h+.02,t-.06),R(e,h+.02,t-.06)],[-1,0,0],g,[[e,i],[s,i],[s,h],[e,h]],[M(e),M(s),M(s),M(e)])}for(let i=e+.06;i<s;i+=.13){const h=.98+.02*Math.sin(i*7),d=a?Y(a,p(i),0):null;H(u,t-.02,t+0,0,h,i-.038,i+.038,g,d?{r:a,u0:p(i),u1:p(i),v0:0,v1:0}:null,{ty:0}),ko([[t-.02,h,i-.038],[t-.02,h,i+.038],[t-.02,h+.06,i]],[-1,0,0],g,[[0,0],[1,0],[.5,1]],d?[[d[0],d[1],1,h+.06],[d[0],d[1],1,h+.06],[d[0],d[1],1,h+.06]]:null)}for(let i=e;i<=s+.01;i+=2)H(u,t-.02,t+.07,0,1.08,i-.045,i+.045,g,a?{r:a,u0:p(i),u1:p(i),v0:0,v1:0}:null)}for(let i=0;i<ut;i++)for(let h=0;h<it;h++){const d=i*p0+h;Math.abs(M0[d]-t)<(_o-Ct)/it*.75&&k0[d]>e&&k0[d]<s&&(wt[d]|=1)}a&&A0.push({kind:"ledge",r:a,p:[[t,.95,e],[t,.95,s]]})}const Oe=U==="town"?"iron":U==="village"?"wood":"paint";if(In(1,I0,vr,Y1,Oe),In(1,I0,Z1,mr,Oe),U==="village")for(const o of j1)o[0]<0&&o[1]>10&&o[1]<40&&In(-1,-V-.6,o[1],Math.min(o[2],o[1]+9),"wood");if(Co){const o=G1,t=1.5,e=21.42,s=e-t,l=[6,Oe==="wood"?E(.3,.23,.16):Oe==="iron"?E(.22,.18,.14):E(.46,.44,.4),0,0],f=d0(G(Math.round(s/.5),4,40),1,Mt,c=>[o,1.84,t+s*c],{cap:.06}),r=c=>G((c-t)/s,0,1),a=t+s*(.3+.4*oo());for(let c=t+.08;c<e;c+=.155){const u=1.78+(oo()-.5)*.07+.03*Math.sin(c*1.7),v=(oo()-.5)*.03;if(Math.abs(c-a)<.08){H(V0,o-1.75,o-.05,0,.03,c-.07,c+.07,l,"g");continue}H(V0,o+v,o+v+.025,0,u,c-.07,c+.07,l,f?{r:f,u0:r(c),u1:r(c),v0:0,v1:0}:null)}for(let c=t;c<=e;c+=2.4)H(V0,o+.03,o+.12,0,1.88,c-.05,c+.05,l,null);for(let c=0;c<ut;c++)for(let u=0;u<it;u++){const v=c*p0+u;Math.abs(M0[v]-o)<(_o-Ct)/it*.75&&k0[v]>t&&k0[v]<e&&(wt[v]|=1)}if(f&&A0.push({kind:"ledge",r:f,p:[[o,1.8,t],[o,1.8,e]]}),Ao){const c=Math.max(I0+1,Ao.xs+.4),u=Math.min(o-.3,Ao.xs+Ao.d-.4),v=21.49;if(u-c>3){const p=Math.min(3.3,Ao.h-1.4),g=Math.min(p+(u-c)*.4,Ao.h-.4),b=[4,E(.36,.34,.31),0,0];u0([[c,0,v],[u,0,v],[u,p,v],[c,p,v]],[0,0,-1],b,[[0,0],[1,0],[1,1],[0,1]]),ko([[c,p,v],[u,p,v],[(c+u)/2,g,v]],[0,0,-1],b,[[0,0],[1,0],[.5,1]])}}}Co||H(V0,I0+.1,I0+5.6,0,.03,Y1+.05,Z1-.05,[4,E(.22,.21,.2),0,0],"g");function $1(o,t,e,s,l,f){const r=e0(P[2]^l,P[5]^l*7919,l*31337,P[7]^4660),a=[9,0,0,0];function c(u,v,p,g,b,i,h){let d=null;if(b>=1&&b<=2){const F=b===1?5:3,L=u,X=v;if(d=d0(F,1,qo,q=>F0(F0(L,m0(X,p*q)),[0,g+.02,0]),{cap:b===1?.06:.04}),d){const q={r:d,depth:b,parent:i,kids:[],p0:u,p1:F0(u,m0(v,p)),cap:(b===1?.035:.025)*(.7+.7*r()),below:[]};d.br=q,vt.push(q),i&&i.kids.push(q),d.bb=q}}const M=d?d.bb:i,R=b<4?3:2;let k=u,S=v;for(let F=0;F<R;F++){const L=p/R,X=b>2?.5:.32;S=X0(F0(S,[(r()-.5)*X,b>1?.2:-.05*b,(r()-.5)*X]));const q=F0(k,m0(S,L)),C=g*(1-F/R*.5),n0=g*(1-(F+1)/R*.5),J=M?Y(M.r,M===(d&&d.bb)?F/R:h,0):null,L0=M?Y(M.r,M===(d&&d.bb)?(F+1)/R:h,0):null;if(W(k,q,Math.max(C,.004),Math.max(n0,.003),C>.05?8:C>.015?5:3,a,b>=1?J:null,b>=1?L0:null),b<f){const P0=b===0?F===R-1?4:1:(b<3,2);for(let $=0;$<P0;$++){if((b===0||b>=2&&R>2)&&F<1)continue;const K=r()*R0,B=b===0?.35+r()*.4:.1+r()*.45;let x0=X0(F0(m0(S,b===0?.55:1.05),[Math.cos(K)*(1-B),B,Math.sin(K)*(1-B)]));b===0&&(x0=X0(F0(x0,[s[0]*.8,0,s[1]*.8])));const l0=M===(d&&d.bb)?(F+1)/R:h;c(q,x0,p*(b===0?e:(b>=2?.54:.68)+r()*.12),n0*(b===0?.72:.8),b+1,M,l0)}}k=q}}c(o,X0([s[0]*.15,1,s[1]*.15]),t,t*.035,0,null,0)}const Q1=vt.length;$1([I0+2.1,0,10.5],4.2,.95,[-.75,-.15],1,4),U!=="village"&&$1([dr(),0,Z(31,38)],3,.8,[0,0],2,3);function dr(){return(T()<.5?-1:1)*(V+.7)}for(let o=Q1;o<vt.length;o++)for(let t=Q1;t<vt.length;t++){if(o===t)continue;const e=vt[o],s=vt[t],l=Zt(e.p0,e.p1,.5),f=Zt(s.p0,s.p1,.5);f[1]<l[1]-.2&&Math.hypot(l[0]-f[0],l[2]-f[2])<.9&&e.below.push(s)}for(const o of vt)A0.push({kind:"branch",br:o,p:[o.p0,o.p1]});function je(o,t,e){const l=d0(6,1,qo,f=>[o,e*(.25+.7*f),t],{cap:.08});W([o,0,t],[o,e*.3,t],.15,.12,6,[9,0,0,0],null,null);for(let f=0;f<6;f++){const r=f/5,a=e*(.18+.68*r),c=e*.32*(1-r*.8),u=e*.24,v=l?Y(l,r,0):null;W([o,a,t],[o,a+u,t],c,.05,9,[16,E(.05,.085,.055),0,0],v,v)}if(l){const f={r:l,depth:1,kids:[],p0:[o-.5,e*.5,t],p1:[o+.5,e*.9,t],cap:.06,below:[]};vt.push(f),A0.push({kind:"branch",br:f,p:[[o,e*.3,t],[o,e,t]]})}}U==="village"&&(je(I0+3.6,25,7.5),je(-V-3.5,Z(24,30),8),je(I0+3,Z(34,40),9),je(-V-4,Z(52,58),10));const g0=e0(P[5]^1240909634,P[2]^3035945132,P[7]^P[1],P[0]^1042826200),Ke=o=>o[Math.floor(g0()*o.length)],xr=e0(P[3]^2050082281,P[6]^462302535,P[4]^P[0],P[2]^1544552161),Zo=[{col:E(...U0([[.08,.16,.12],[.35,.05,.04],[.12,.14,.2],[.55,.52,.45]])),basket:T()<.6}];Zo.push({col:E(...U0([[.04,.04,.05],[.4,.33,.12],[.15,.3,.38]])),basket:T()<.3});const Ye=[[.5,.05,.04],[.06,.12,.2],[.5,.5,.48],[.08,.08,.09],[.12,.22,.16],[.55,.42,.18]],gt=[];{const o=T()<.5?1:-1;gt.push({side:-1,z:13.2,flip:o,col:E(...U0(Ye))})}if(U!=="harbour"){const o=Z(31,37),t=T()<.5?1:-1;gt.push({side:1,z:o,flip:t,col:E(...U0(Ye))})}if(T()<.6){const o=Z(55,60)>Yo?Yo-5:Z(55,60);gt.push({side:-1,z:o,flip:1,col:E(...U0(Ye))})}const J1=()=>E(...U0([[.08,.2,.1],[.07,.07,.08],[.1,.15,.3]])),Ze=[{x:-(V+S0)+.5,z:Z(20,26),col:J1()}];if(T()<.7){const o=Z(24,30);Ze.push({x:V+S0-.5,z:o,col:J1()})}function $e(o,t,e,s,l,f){f=f||.2;const r=f>1,a=r?.06:0,c={f:(h,d,M)=>{const R=M*Math.cos(f)+d*Math.sin(f),k=d*Math.cos(f)-M*Math.sin(f);return[o+R,k+a,t+h*e]},n:(h,d,M)=>[M*Math.cos(f)+d*Math.sin(f),d*Math.cos(f)-M*Math.sin(f),h*e]},u=d0(6,1,so,h=>c.f(-.62+1.24*h,.9,0),{cap:.05}),v=h=>u?Y(u,G((h+.62)/1.24,0,1),0):null,p=[8,s,0,0],g=[8,E(.03,.03,.03),0,0],b=(h,d)=>c.f(h,d,0);for(const h of[-.52,.52]){for(let M=0;M<16;M++){const R=M/16*R0,k=(M+1)/16*R0,S=b(h+Math.cos(R)*.33,.34+Math.sin(R)*.33),F=b(h+Math.cos(k)*.33,.34+Math.sin(k)*.33),L=r||Math.sin((R+k)/2)>.5;W(S,F,.02,.02,4,[15,0,0,0],L?v(h):null,L?v(h):null)}for(let M=0;M<6;M++){const R=M/6*Math.PI;W(b(h-Math.cos(R)*.31,.34-Math.sin(R)*.31),b(h+Math.cos(R)*.31,.34+Math.sin(R)*.31),.002,.002,3,[8,E(.5,.5,.5),0,0],null,null)}}const i=(h,d,M,R,k)=>W(b(...h),b(...d),M,M,5,R||p,k||r?v(h[0]):null,k||r?v(d[0]):null);i([-.52,.34],[0,.28],.013),i([-.52,.34],[-.17,.78],.012),i([0,.28],[-.18,.8],.017),i([-.18,.78],[.38,.84],.017,null,!0),i([0,.28],[.41,.7],.02),i([.41,.68],[.52,.34],.014),i([.39,.86],[.37,1],.014),i([-.19,.8],[-.2,.92],.012,g),W(c.f(.33,1,-.26),c.f(.33,1,.26),.012,.012,5,p,v(.33),v(.33)),H({f:(h,d,M)=>c.f(h,d,M),n:c.n},-.33,-.08,.92,.97,-.06,.06,[16,E(.04,.03,.03),0,0],u?{r:u,u0:.24,u1:.44,v0:0,v1:0}:null),H({f:(h,d,M)=>c.f(h,d,M),n:c.n},-.62,-.3,.7,.72,-.08,.08,g,u?{r:u,u0:0,u1:.25,v0:0,v1:0}:null),l&&H({f:(h,d,M)=>c.f(h,d,M),n:c.n},.42,.72,.78,1,-.16,.16,[8,E(.15,.13,.1),0,0],u?{r:u,u0:.85,u1:1,v0:0,v1:0}:null),u&&A0.push({kind:"ledge",r:u,p:[b(-.6,.8),b(.6,.8)]})}const ao={saloon:{L:4.3,hw:.85,bot:.3,wr:.32,belt:.93,tk:1,wh:[.8,3.5],bon:3.3,gl:[[.95,1.45],[2.75,3.3]],TP:[[0,.7],[.2,.9],[.95,.96],[1.45,1.42],[2.1,1.47],[2.75,1.44],[3.3,1],[4.1,.88],[4.3,.6]],US:[0,.05,.2,.55,.95,1.2,1.45,1.8,2.4,2.75,3.02,3.3,3.7,4.1,4.25,4.3]},hatch:{L:3.75,hw:.83,bot:.3,wr:.31,belt:.93,tk:1,wh:[.62,3.05],bon:2.6,gl:[[.06,.5],[2.05,2.6]],TP:[[0,.72],[.06,.98],[.3,1.34],[.5,1.43],[1.2,1.46],[2.05,1.42],[2.6,.98],[3.5,.86],[3.75,.62]],tx:[[0,.85],[.55,1.45],[2.05,2.75]]},estate:{L:4.5,hw:.86,bot:.3,wr:.32,belt:.93,tk:1,wh:[.85,3.7],bon:3.5,gl:[[.08,.45],[2.95,3.5]],TP:[[0,.72],[.08,.96],[.22,1.36],[.45,1.44],[1.8,1.46],[2.95,1.44],[3.5,1],[4.3,.88],[4.5,.62]],tx:[[0,.9],[.4,1.3],[2.95,2.75]]},van:{L:4.9,hw:.93,bot:.36,wr:.34,belt:1.1,gT:1.72,tk:.35,wh:[.9,4.1],bon:4.45,gl:[[3.92,4.45]],hi:3.41,TP:[[0,1.86],[.06,1.93],[.2,1.95],[3.8,1.95],[3.92,1.9],[4.45,1.15],[4.8,1],[4.9,.72]],tx:[[0,4.4],[3.38,4],[3.44,2.1],[4.42,2.75],[4.9,3.1]],rl:[.55,.92,.8,.06]},pickup:{L:5,hw:.9,bot:.38,wr:.36,belt:1.08,gT:1.72,tk:.6,wh:[.95,4.1],bon:3.75,gl:[[2.33,2.45],[3.2,3.75]],hi:2.38,bed:2.3,TP:[[0,.95],[.05,1.05],[2.3,1.05],[2.33,1.42],[2.36,1.78],[2.45,1.85],[3.2,1.85],[3.75,1.15],[4.75,1.04],[5,.75]],tx:[[0,.5],[2.3,.5],[2.4,2.1],[3.75,2.98],[5,3.6]],rl:[.62,.98,.78,.06]}};for(const o in ao){const t=ao[o];t.ar=t.wr+.09;const e=t.wh.flatMap(s=>[-1,-.87,-.5,0,.5,.87,1].map(l=>s+l*t.ar));if(t.US)t.US=[...new Set(t.US.concat(e).map(s=>Math.round(s*1e3)/1e3))].sort((s,l)=>s-l).filter((s,l,f)=>l===0||s-f[l-1]>.004);else{let s=[0,.05,t.L-.15,t.L].concat(t.TP.map(f=>f[0]),(t.tx||[]).map(f=>f[0]),e);s=[...new Set(s.map(f=>Math.round(G(f,0,t.L)*1e3)/1e3))].sort((f,r)=>f-r);const l=[s[0]];for(let f=1;f<s.length;f++){const r=s[f]-s[f-1],a=Math.ceil(r/.5);for(let c=1;c<=a;c++)l.push(s[f-1]+r*c/a)}t.US=l.filter((f,r)=>r===0||f-l[r-1]>.004)}}const co=[];function wr(o,t,e,s,l,f){const r=ao[l||"saloon"],a=r.L,c=r.hw,u=r.bot,v=r.TP,p={f:(x,w,y)=>[o+y,w,t+(x-a/2)*e],n:(x,w,y)=>[y,w,x*e]},g=x=>{if(x<=0)return v[0][1];for(let w=0;w<v.length-1;w++)if(x<=v[w+1][0]){const y=v[w],A=v[w+1];return dt(y[1],A[1],(x-y[0])/(A[0]-y[0]))}return v[v.length-1][1]},b=Math.max(...v.map(x=>x[1])),i=Math.max(9,Math.round(a/.43)),h=d0(i,4,Ie,(x,w)=>w>.8?p.f(x*a,g(x*a)+.02,0):p.f(x*a,l==="saloon"||!l?1.45:g(x*a)+.02,(w*1.5-.5)*2*c),{cap:.3}),d=(x,w)=>h?Y(h,G(x/a,0,1),G(w/(2*c)+.5,0,1)*2/3):[0,0],M=x=>h?Y(h,G(x/a,0,1),1):[0,0],R=new Float32Array(i);if(h)for(let x=0;x<i;x++){const w=x/(i-1)*a;let y=0;r.gl.forEach((A,N)=>{const z=N===r.gl.length-1?A[1]:A[0];y=Math.max(y,G(1-Math.abs(w-z)/Math.max(A[1]-A[0],.3),0,1))}),R[x]=.3*(.55+.6*y),no[(h.y+3)*p0+h.x+x]=.002+.008*y}const k=[10,s,0,0],S=x=>{const w=r.tx;if(!w)return x;if(x<=w[0][0])return w[0][1];for(let N=0;N<w.length-1;N++)if(x<=w[N+1][0])return dt(w[N][1],w[N+1][1],(x-w[N][0])/(w[N+1][0]-w[N][0]));const y=w[w.length-2],A=w[w.length-1];return A[1]+(x-A[0])*(A[1]-y[1])/(A[0]-y[0])},F=(1.37-.93)/((r.gT||1.37)-r.belt),L=(x,w)=>w<=r.belt?w*.93/r.belt:.93+(w-r.belt)*(r.hi&&x<r.hi?Math.min(F,.03/Math.max(b-r.belt,.01)):F),X=x=>{const w=g(x),y=c-.13*(1-Et(0,.5,Math.min(x,a-x))),A=G((w-r.belt-.07)/.4,0,1)*r.tk,N=Math.min(w-.04,r.belt);let z=0;for(const t0 of r.wh){const o0=x-t0;Math.abs(o0)<r.ar&&(z=Math.max(z,Math.sqrt(r.ar*r.ar-o0*o0)))}const f0=u+z,j=Et(0,.12,z);return[[y-.045*(1-G(z/(.6-u),0,1))+.012*j,f0],[y+.006*j,Math.max(.6,f0+.05)],[y-.012,N-.07],[y-.06,N],[y-.07-A*.09,Math.max(N,w-.07)],[y-.15-A*.1,w]]},q=[];for(const[x,w,y,A]of[[-.055,.07,.09,.035],[-.028,.025,.03,.01]])q.push({u:x,base:0,dy:w,dw:y,dwb:A});for(const x of r.US)q.push({u:x,base:x});for(const[x,w,y,A]of[[.028,.025,.03,.01],[.055,.07,.09,.035]])q.push({u:a+x,base:a,dy:w,dw:y,dwb:A});const C=q.map(x=>{let w=X(x.base);x.dy&&(w=w.map(A=>{const N=Et(.6,.78,A[1]);return[A[0]*(1-dt(x.dwb,x.dw,N)),A[1]-x.dy*N]}));const y=x.u;return w.concat(w.map(A=>[-A[0],A[1]]).reverse()).map((A,N)=>({u:y,w:A[0],y:A[1],p:p.f(y,A[1],A[0]),t:[S(y),L(y,A[1])],s:h?[...d(y,A[0]),1,A[1]]:E0,g:h?[...M(y),1,A[1]]:E0}))});for(let x=0;x<C.length;x++)for(let w=0;w<12;w++){const y=C[x][w],A=Kt(C[Math.min(x+1,C.length-1)][w].p,C[Math.max(x-1,0)][w].p),N=Kt(C[x][Math.min(w+1,11)].p,C[x][Math.max(w-1,0)].p);let z=X0(Yt(A,N));const f0=p.n(y.u<0?-1:y.u>a?1:0,y.y-.75,y.w);Rt(z,f0)<0&&(z=m0(z,-1)),y.n=z}const n0=.03+.03*(Math.abs(o*3.7+t*1.3)%1);for(let x=0;x<C.length-1;x++)for(let w=0;w<11;w++){const y=C[x][w],A=C[x+1][w],N=C[x+1][w+1],z=C[x][w+1],f0=(y.u+A.u)/2,j=w===5?r.gl.findIndex(Nn=>f0>Nn[0]&&f0<Nn[1]):-1,Q=w===5?j>=0?1:r.bed&&f0<r.bed?4:2:w===4||w===6?2:0,t0=Math.abs(C[x+1][5].y-C[x][5].y)/Math.max(C[x+1][5].u-C[x][5].u,.001),o0=h&&w>=3&&w<=7&&(w===5?t0<1.2:t0<.5&&x>=2&&x<C.length-3),v0=[10,s,Q,0],B0=[y.p,A.p,N.p,z.p],At=[y.n,A.n,N.n,z.n],he=[y.t,A.t,N.t,z.t];if(j<0){jo(B0,At,v0,he,o0?[y.s,A.s,N.s,z.s]:[E0,E0,E0,E0]);continue}const Fn=r.gl[j],Sn=j===r.gl.length-1,js=Sn?Fn[0]:Fn[1],S1=js+(Sn?n0:-n0);if(S1<=y.u+.005||S1>=A.u-.005||Math.abs(js-(Sn?y.u:A.u))>.01){jo(B0,At,v0,he,[y.g,A.g,N.g,z.g]);continue}const $r=(S1-y.u)/(A.u-y.u),_t=(Nn,Qr)=>Nn.map((Ks,Jr)=>Ks+(Qr[Jr]-Ks)*$r),J0={p:_t(y.p,A.p),n:X0(_t(y.n,A.n)),t:_t(y.t,A.t),s:_t(y.s,A.s),g:_t(y.g,A.g)},tt={p:_t(z.p,N.p),n:X0(_t(z.n,N.n)),t:_t(z.t,N.t),s:_t(z.s,N.s),g:_t(z.g,N.g)};Sn?(jo([y.p,J0.p,tt.p,z.p],[y.n,J0.n,tt.n,z.n],v0,[y.t,J0.t,tt.t,z.t],[y.s,J0.s,tt.s,z.s]),jo([J0.p,A.p,N.p,tt.p],[J0.n,A.n,N.n,tt.n],v0,[J0.t,A.t,N.t,tt.t],[J0.g,A.g,N.g,tt.g])):(jo([y.p,J0.p,tt.p,z.p],[y.n,J0.n,tt.n,z.n],v0,[y.t,J0.t,tt.t,z.t],[y.g,J0.g,tt.g,z.g]),jo([J0.p,A.p,N.p,tt.p],[J0.n,A.n,N.n,tt.n],v0,[J0.t,A.t,N.t,tt.t],[J0.s,A.s,N.s,tt.s]))}for(const x of[0,C.length-1])for(let w=0;w<5;w++){const y=C[x];u0([y[w].p,y[w+1].p,y[10-w].p,y[11-w].p],p.n(x?1:-1,0,0),k,[y[w].t,y[w+1].t,y[10-w].t,y[11-w].t],w>=3&&h?[y[w].s,y[w+1].s,y[10-w].s,y[11-w].s]:null)}if(h){const x=r.gl[r.gl.length-1][1],w=X(x)[5][0]-.02,y=Math.min(x+.18,a-.3),A=[16,E(.02,.02,.021),0,0],N=[[x-.035,g(x-.035)+.002],[x-.008,g(x)+.03],[x+.022,g(x)+.035],[x+.055,g(x+.055)+.002]],z=N[2][1],f0=j=>[...d(y,j),1,z];for(let j=0;j<3;j++){const Q=N[j],t0=N[j+1];u0([p.f(Q[0],Q[1],-w),p.f(t0[0],t0[1],-w),p.f(t0[0],t0[1],w),p.f(Q[0],Q[1],w)],null,A,null,[f0(-w),f0(-w),f0(w),f0(w)])}for(const j of[-w,w])u0(N.map(Q=>p.f(Q[0],Q[1],j)),p.n(0,0,Math.sign(j)),A)}const J=C[0][0].u,L0=C[C.length-1][0].u;u0([p.f(J,u,.25-c),p.f(L0,u,.25-c),p.f(L0,u,c-.25),p.f(J,u,c-.25)],[0,-1,0],[10,s,4,0]);const P0=(s>>16&255)/255,$=(s>>8&255)/255,K=(s&255)/255,B=.299*P0+.587*$+.114*K,x0=G(B*.55,.075,.22),l0=Math.floor(Math.abs(o*7.3+t*2.9))%3===0&&B*.5>.075,yt=[16,E(.008,.008,.009),0,0],Q0=[16,E(.04,.04,.042),0,0],C0=r.wr,kt=C0*.56,Te=[16,l0?E(P0*.5,$*.5,K*.5):E(x0,x0,x0*1.02),0,0],yn=[16,E(Math.min(.3,x0*1.4),Math.min(.3,x0*1.4),Math.min(.31,x0*1.45)),0,0],kn=[16,E(.03,.03,.032),0,0],An=[8,E(.5,.5,.51),0,0],En=(x,w,y,A,N,z,f0)=>{for(let j=0;j<N;j++){const Q=j/N*R0,t0=(j+1)/N*R0,o0=(v0,B0)=>p.f(x+Math.cos(v0)*B0,C0+Math.sin(v0)*B0,w);y>0?u0([o0(Q,y),o0(t0,y),o0(t0,A),o0(Q,A)],p.n(0,0,f0),z):ko([o0(Q,0),o0(t0,A),o0(Q,A)],p.n(0,0,f0),z,[[0,0],[0,0],[0,0]])}};for(const x of r.wh)for(const w of[-1,1]){const y=w>0?0:11,A=w*(c-.25),N=C.filter(j=>Math.abs(j[y].u-x)<=r.ar+1e-4);for(let j=0;j<N.length-1;j++){const Q=N[j][y],t0=N[j+1][y];u0([Q.p,t0.p,p.f(t0.u,t0.y,A),p.f(Q.u,Q.y,A)],X0(p.n(x-(Q.u+t0.u)/2,u-(Q.y+t0.y)/2,0)),yt)}u0([p.f(x-r.ar,u,A),p.f(x+r.ar,u,A),p.f(x+r.ar,u+r.ar+.03,A),p.f(x-r.ar,u+r.ar+.03,A)],p.n(0,0,w),yt);const z=w*(c-.035),f0=w*(c-.05);W(p.f(x,C0,w*(c-.2)),p.f(x,C0,z),C0,C0,14,Q0,null,null),En(x,z,kt,C0,14,Q0,w),W(p.f(x,C0,z),p.f(x,C0,f0),kt,kt,12,Te,null,null),En(x,f0,0,kt*.9,12,Te,w),En(x,f0,kt*.9,kt,12,yn,w),En(x,f0+w*.004,kt*.5,kt*.72,12,kn,w);{const j=f0+w*.008,Q=p.f(x,C0,j+w*.012),t0=o0=>p.f(x+Math.cos(o0)*kt*.42,C0+Math.sin(o0)*kt*.42,j);for(let o0=0;o0<12;o0++)ko([Q,t0(o0/12*R0),t0((o0+1)/12*R0)],null,An,[[0,0],[0,0],[0,0]])}}const ae=(x,w)=>{for(let y=0;y<5;y++){const A=x[y],N=x[y+1];if((w-A[1])*(w-N[1])<=0)return dt(A[0],N[0],(w-A[1])/(N[1]-A[1]||1))}return w<x[0][1]?x[0][0]:x[5][0]},Gs=x=>x.slice(0,6).map(w=>[w.w,w.y]),E1=Gs(C[0]),Hs=Gs(C[C.length-1]),Rn=C[0][5].y,Yr=C[C.length-1][5].y,ce=c*.59,Zr=J-.004,R1=L0+.004,sf=[-1,1],Xs=(x,w,y,A,N,z,f0)=>{const j=Math.min(y+A,ae(w,N)-.03),Q=Math.min(y+A,ae(w,z)-.03);for(const t0 of[-1,1])u0([p.f(x,N,t0*(j-2*A)),p.f(x,N,t0*j),p.f(x,z,t0*Q),p.f(x,z,t0*(Q-2*A))],p.n(x<a/2?-1:1,0,0),f0)};{const x=r.rl,w=x?x[0]:Math.max(.5,Rn-.12);Xs(Zr,E1,x?x[2]:ce,x?x[3]:.14,w,x?x[1]:w+.09,[16,E(.3,.02,.02),0,0])}const ie=Math.max(u+.12,Yr-.13);Xs(R1,Hs,ce,.13,ie,ie+.1,[16,E(.6,.6,.55),0,0]);const Tt=[16,E(.025,.025,.027),0,0],Uo=.007,vo=(x,w,y,A,N,z)=>u0([p.f(x,A,w),p.f(x,A,y),p.f(x,N,y),p.f(x,N,w)],p.n(x<a/2?-1:1,0,0),z);for(const[x,w,y]of[[J,E1,-1],[L0,Hs,1]]){const A=ae(w,u+.1)+.01,N=u+.03,z=u+.15,f0=x+y*.06,j=x+y*.012,Q=p.n(0,1,0),t0=[[j,-A],[f0,.05-A],[f0,A-.05],[j,A]];for(let o0=0;o0<3;o0++){const v0=t0[o0],B0=t0[o0+1];u0([p.f(v0[0],N,v0[1]),p.f(B0[0],N,B0[1]),p.f(B0[0],z,B0[1]),p.f(v0[0],z,v0[1])],X0(p.n(y*(B0[1]-v0[1]),0,-y*(B0[0]-v0[0])*6)),Tt);const At=he=>h?[...d(y>0?a-.05:.05,he),1,z]:E0;u0([p.f(v0[0],z,v0[1]),p.f(B0[0],z,B0[1]),p.f(x,z,B0[1]),p.f(x,z,v0[1])],Q,Tt,null,[At(v0[1]),At(B0[1]),At(B0[1]),At(v0[1])])}if(y>0){vo(f0+Uo,-.26,.26,N+.005,N+.115,[16,E(.5,.5,.47),0,0]),vo(R1,.14-ce,ce-.14,ie,ie+.1,Tt);for(const o0 of[ie+.033,ie+.066])vo(R1+.002,.15-ce,ce-.15,o0-.006,o0+.006,[16,E(.3,.3,.3),0,0])}else vo(J-Uo,-.26,.26,z+.03,z+.14,[16,E(.55,.46,.17),0,0])}{const x=l==="van"||l==="pickup",w=r.gl[r.gl.length-1][1]-.1,y=Math.min(g(w)-.04,r.belt),A=ae(X(w),y+.02),N=x?Tt:[16,s,0,0],z=l==="van"?.28:.11,f0=y+(l==="van"?.1:.03);for(const j of[-1,1]){const Q={f:(t0,o0,v0)=>p.f(w+t0,o0,j*(A+v0)),n:(t0,o0,v0)=>p.n(t0,o0,j*v0)};H(Q,-.015,.015,f0+z*.3,f0+z*.3+.025,-.01,.07,Tt,null,{noBack:!0}),H(Q,-.03,.03,f0,f0+z,.06,.22,N,h?{r:h,u0:w/a,u1:w/a,v0:j>0?2/3:0,v1:j>0?2/3:0}:null)}}const ue=(x,w,y,A,N,z,f0)=>{const j=[x,...r.US.filter(Q=>Q>x&&Q<w),w];for(let Q=0;Q<j.length-1;Q++){const t0=j[Q],o0=j[Q+1],v0=X(t0),B0=X(o0),At=(he,Fn)=>N*(ae(he,Fn)+(f0||Uo));u0([p.f(t0,y,At(v0,y)),p.f(o0,y,At(B0,y)),p.f(o0,A,At(B0,A)),p.f(t0,A,At(v0,A))],p.n(0,0,N),z)}},F1=x=>[16,E((s>>16&255)/255*x,(s>>8&255)/255*x,(s&255)/255*x),0,0];if(l==="van"){const x=r.hi-.08,w=F1(.6),y=xr()<.67;for(const A of[-1,1]){for(const N of[1.28,1.58])ue(.25,x-.05,N-.012,N+.012,A,w);ue(.08,3.86,1.835,1.86,A,F1(.55),.012);for(const N of[2.25,x])ue(N-.008,N+.008,.44,1.74,A,Tt);ue(2.25,x,1.732,1.748,A,Tt),ue(.3,2.25,1.11,1.124,A,Tt)}vo(J-Uo,-.008,.008,u+.31,Rn-.04,Tt),vo(J-Uo,.035,.15,1.02,1.045,[16,E(.22,.22,.23),0,0]);for(const A of[-1,1])vo(J-Uo,A*.06,A*.5,Rn-.47,Rn-.12,y?[10,s,1,0]:F1(.86))}else if(l==="pickup"){for(const w of[-1,1])ue(.06,r.bed-.03,.99,1.02,w,Tt,.01);const x=ae(E1,u+.165)-.05;vo(J-Uo,-x,x,u+.158,u+.172,Tt)}const Os=l&&l!=="saloon"?b*.83:1.2;h&&A0.push({kind:"ledge",r:h,p:[p.f(.5,Os,0),p.f(a-.5,Os,0)]}),Xo.push([[o-c,0,t-a/2],[o+c,0,t+a/2]]),co.push({r:h,pm:R,K:r,kind:l||"saloon",state:f||"day",z:t,flip:e,side:Math.sign(o),samp:x=>{for(let w=0;w<=a;w+=.05){const y=g(w);for(let A=-c;A<=c;A+=.05)x(p.f(w,y,A))}}})}const ts=Ye.concat([[.3,.31,.33],[.22,.08,.06],[.58,.58,.55],[.18,.2,.22]]),Wn=[["saloon",26],["hatch",24],["estate",18],["van",16],["pickup",16]],st=[];let $o="quiet";if(m.home)for(const o of gt)st.push(Object.assign({kind:"saloon",state:"day"},o));else{const o=g0();$o=o<.35?"quiet":o<.75?"parked":"both",$o==="both"&&U==="harbour"&&($o="parked");const t=()=>{const a=g0();return a<.24?"home":a<.4&&(eo||et)?"left":"day"},e=z0(g0,[["saloon",45],["hatch",20],["estate",15],["van",10],["pickup",10]]);st.push(Object.assign({},gt[0],{kind:e,state:g0()<.2?"home":"day"}));const s=(a,c,u,v,p)=>{const g=1+Math.floor(g0()*Math.max(1,u-1));for(let b=1;b<u;b++){const i=z0(g0,Wn),h=ao[i].L,d=b===g?3.9+g0()*1.1:.6+g0()*1.9,M=c+d+h/2;if(M+h/2>p)break;st.push({side:a,z:M,flip:g0()<.85?v:-v,col:E(...Ke(ts)),kind:i,state:t()}),c=M+h/2}};if($o==="quiet"){const a=gt.slice(1),c=g0();if(a.length&&c<.6){const u=a[Math.floor(g0()*a.length)];st.push(Object.assign({},u,{kind:z0(g0,Wn),state:t()}))}}else if($o==="parked"){s(-1,13.2+ao[e].L/2,3+Math.floor(g0()*3),gt[0].flip,40);const a=gt[gt.length-1];gt.length>1&&a.side<0&&st.push(Object.assign({},a,{kind:z0(g0,Wn),state:t()}))}else s(-1,13.2+ao[e].L/2,2+Math.floor(g0()*2),gt[0].flip,40),s(1,15+g0()*6,3+Math.floor(g0()*2),-gt[0].flip,42);const l=a=>Math.hypot(a.side*(V-1)-W0[0],a.z-W0[2]),f=a=>a.kind==="van"||a.kind==="pickup";let r=null;for(const a of st)a.state!=="left"&&(!r||l(a)<l(r))&&(r=a);for(const a of st)f(a)&&ft!=="street"&&a===r&&(a.kind="estate"),f(a)&&Xe&&a.side<0&&a.z+2.6>Xe[0]-1&&a.z-2.6<Xe[1]+1&&(a.kind="estate");for(let a=st.length-1;a>0;a--){const c=st[a],u=ao[c.kind].L;(ft==="walk"&&c.side>0&&c.z<26||U!=="harbour"&&c.z+u/2>Eo-1.5&&c.z-u/2<Ko+1||c.z+u/2>Yo+2.2||U==="village"&&Ze.some(v=>Math.sign(v.x)===c.side&&Math.abs(v.z-c.z)<u/2+1.4))&&st.splice(a,1)}for(let a=1;a<st.length;a++){const c=st[a-1],u=st[a];for(let v=0;v<4&&c.side===u.side&&c.kind===u.kind&&c.col===u.col;v++)u.col=E(...Ke(ts))}}for(const o of st){const t=o.side*(V-1);if(o.state==="left"){const e=ao[o.kind];Xo.push([[t-e.hw,0,o.z-e.L/2],[t+e.hw,0,o.z+e.L/2]]),co.push({r:null,K:e,kind:o.kind,state:"left",z:o.z,flip:o.flip,side:o.side})}}if(m.home)$e(I0-.3,14,1,Zo[0].col,Zo[0].basket),$e(I0-.3,15.6,-1,Zo[1].col,Zo[1].basket);else{const o=z0(g0,[[0,18],[1,30],[2,34],[3,18]]),t=g0()<0;let e=12+g0()*(U==="harbour"?8:6.4);for(let s=0;s<o;s++){const l=s<2?Zo[s]:{col:E(...Ke([[.3,.3,.32],[.05,.12,.25],[.45,.4,.3]])),basket:g0()<.3};t&&s===o-1?$e(I0-1.35,e+.3,s%2?-1:1,l.col,l.basket,1.45):$e(I0-.3,e,s%2?-1:1,l.col,l.basket),e+=1.45+g0()*.4}}for(const o of st)o.state!=="left"&&wr(o.side*(V-1),o.z,o.flip,o.col,o.kind,o.state);function os(o,t,e){const s=d0(1,1,so,()=>[o,1.06,t],{cap:.1});H(V0,o-.3,o+.3,0,.98,t-.35,t+.35,[8,e,0,0],null),H(V0,o-.33,o+.33,.98,1.06,t-.38,t+.38,[8,e,0,0],s?{r:s,u0:0,u1:0,v0:0,v1:0}:null),s&&A0.push({kind:"ledge",r:s,p:[[o-.3,1,t],[o+.3,1,t]]})}function Mr(o,t,e,s){const l={f:(g,b,i)=>[o+g*s,b,t+i],n:(g,b,i)=>[g*s,b,i]},f=d0(1,1,so,()=>l.f(0,1.07,0),{cap:.1}),r=f?[...Y(f,0,0),1,1.08]:E0,a=[8,e,0,0],c=(g,b,i)=>l.f(b,g,i),u=[[-.25,-.24],[.21,-.24],[.21,.24],[-.25,.24]],v=[[-.3,-.29],[.28,-.29],[.28,.29],[-.3,.29]];for(let g=0;g<4;g++){const b=g,i=(g+1)%4;u0([c(.04,...u[b]),c(.04,...u[i]),c(.98,...v[i]),c(.98,...v[b])],null,a)}H(l,-.3,.28,.93,.98,-.3,.3,a,null);const p=[c(1.08,-.34,-.31),c(1.03,.33,-.31),c(1.03,.33,.31),c(1.08,-.34,.31)];u0(p,l.n(.07,1,0),a,[[0,0],[1,0],[1,1],[0,1]],[r,r,r,r]),u0([c(1.03,.33,-.31),c(.97,.34,-.31),c(.97,.34,.31),c(1.03,.33,.31)],l.n(1,0,0),a);for(const g of[-1,1])u0([c(1.08,-.34,g*.31),c(1.03,.33,g*.31),c(.99,.33,g*.31),c(1.02,-.34,g*.31)],l.n(0,0,g),a);W(l.f(-.36,.96,-.2),l.f(-.36,.96,.2),.018,.018,5,a,null,null);for(const g of[-1,1])W(l.f(-.28,.1,g*.2),l.f(-.28,.1,g*.3),.1,.1,10,[16,E(.02,.02,.02),0,0],null,null,!0);f&&A0.push({kind:"ledge",r:f,p:[l.f(-.3,1,0),l.f(.3,1,0)]})}if(m.home)for(const o of Ze)os(o.x,o.z,o.col);else{const o=g0()<.78,t=z0(g0,[[1,58],[2,28],[3,14]]);for(const[e,s]of Ze.entries()){const l=s.x,f=e?1:t;for(let r=0;r<f;r++){const a=r?E(...Ke([[.08,.2,.1],[.07,.07,.08],[.1,.15,.3],[.2,.12,.07],[.25,.26,.27]])):s.col,c=s.z+(r-(f-1)/2)*.68;o?Mr(l,c,a,-Math.sign(s.x)):os(l,c,a)}}}if(U!=="harbour"){const t=I0-.45,e=d0(5,1,Mt,f=>[t,.47,23.5-.8+1.6*f],{cap:.1}),s=[6,E(.3,.2,.12),0,0],l=[8,E(.03,.03,.03),0,0];for(let f=0;f<3;f++)H(V0,t-.22+f*.15,t-.1+f*.15,.42,.47,23.5-.8,23.5+.8,s,e?{r:e,u0:0,u1:1,v0:0,v1:0}:null);H(V0,t+.2,t+.25,.55,.85,23.5-.8,23.5+.8,s,null);for(const f of[-.7,.7])H(V0,t-.22,t+.25,0,.42,23.5+f-.03,23.5+f+.03,l,null);e&&A0.push({kind:"ledge",r:e,p:[[t,.45,23.5-.8],[t,.45,23.5+.8]]})}function Ro(o,t,e,s){const l=[8,E(.035,.035,.04),0,0];let f;const r=d0(3,1,so,c=>[o-s*c*.3,4.5,t],{cap:.09}),a=r?Y(r,.5,0):null;if(e==="lantern"){W([o,0,t],[o,.5,t],.12,.09,8,l,null,null),W([o,.5,t],[o,3.7,t],.06,.05,8,l,null,null),W([o,3.7,t],[o,3.7+.08,t],.12,.17,8,l,null,null);const u=3.7+.08,v=3.7+.62;for(let p=0;p<4;p++){const g=p/4*R0+.785,b=(p+1)/4*R0+.785,i=.17,h=.24;u0([[o+Math.cos(g)*i,u,t+Math.sin(g)*i],[o+Math.cos(b)*i,u,t+Math.sin(b)*i],[o+Math.cos(b)*h,v,t+Math.sin(b)*h],[o+Math.cos(g)*h,v,t+Math.sin(g)*h]],null,[11,0,1,0]),W([o+Math.cos(g)*i,u,t+Math.sin(g)*i],[o+Math.cos(g)*h,v,t+Math.sin(g)*h],.012,.012,3,l,null,null)}W([o,v,t],[o,v+.06,t],.3,.3,4,l,a,a),W([o,v+.06,t],[o,v+.3,t],.3,.03,4,l,a,a),fo([o,v+.34,t],.04,.04,.04,4,l,null),f=[o,(u+v)/2,t],r&&A0.push({kind:"ledge",r,p:[[o,.5,t],[o,v+.3,t]]}),bt.push({p:f,side:.22,hp:[o,(u+v)/2,t],size:.3})}else if(e==="cobra"){const u=o-s*1.7;W([o,0,t],[o,6.6,t],.1,.07,8,[8,E(.25,.25,.26),0,0],null,null),W([o,6.6-.05,t],[u,6.6+.25,t],.05,.04,6,[8,E(.25,.25,.26),0,0],null,null),H(V0,Math.min(u,u-s*.7),Math.max(u,u-s*.7),6.6+.12,6.6+.34,t-.18,t+.18,[8,E(.3,.3,.31),0,0],r?{r,u0:0,u1:1,v0:0,v1:0}:null),u0([[u-s*.05,6.6+.11,t-.13],[u-s*.6,6.6+.11,t-.13],[u-s*.6,6.6+.11,t+.13],[u-s*.05,6.6+.11,t+.13]],[0,-1,0],[11,0,1.4,0]),f=[u-s*.33,6.6+.02,t],r&&A0.push({kind:"ledge",r,p:[[o,1,t],[u-s*.6,6.6+.3,t]]}),bt.push({p:f,side:.12,hp:f,size:.35})}else if(e==="wall"){const u=o;W([u,3.6,t],[u-s*.7,3.6+.15,t],.03,.025,5,l,null,null),W([u-s*.7,3.6+.15,t],[u-s*.7,3.6-.05,t],.02,.02,4,l,null,null);const v=u-s*.7,p=3.6-.62,g=3.6-.1;for(let b=0;b<6;b++){const i=b/6*R0,h=(b+1)/6*R0;u0([[v+Math.cos(i)*.14,p,t+Math.sin(i)*.14],[v+Math.cos(h)*.14,p,t+Math.sin(h)*.14],[v+Math.cos(h)*.2,g,t+Math.sin(h)*.2],[v+Math.cos(i)*.2,g,t+Math.sin(i)*.2]],null,[11,0,1,0])}W([v,g,t],[v,g+.2,t],.26,.02,6,l,a,a),W([v,p-.06,t],[v,p,t],.08,.15,6,l,null,null),f=[v,(p+g)/2,t],r&&A0.push({kind:"ledge",r,p:[[v,p,t],[v,g+.2,t]]}),bt.push({p:f,side:.28,hp:f,size:.25})}else{const u=o-s*1.1;W([o,0,t],[o,5.6,t],.11,.09,7,[9,0,0,0],null,null),W([o,5.6-.2,t],[u,5.6,t],.04,.035,5,l,null,null),W([u,5.6,t],[u,5.6-.35,t],.05,.36,12,[8,E(.05,.1,.07),0,0],a,a),fo([u,5.6-.38,t],.07,.07,.07,5,[11,0,1.6,0],null),f=[u,5.6-.4,t],r&&A0.push({kind:"ledge",r,p:[[o,1,t],[u,5.6,t]]}),bt.push({p:f,side:.15,hp:f,size:.3})}}const qn={village:"pole",mill:"cobra",harbour:"lantern",town:"lantern"}[U];Ro(V+.4,12.2,U==="mill"?"cobra":U==="village"?"pole":"lantern",1),U==="town"?(Ro(-(V+S0),29,"wall",-1),Ro(V+S0,40.5,"wall",1),Ro(-(V+S0),57,"wall",-1)):(Ro(-V-.4,30,qn,-1),Ro(V+.4,41,qn,1),Ro(-V-.4,U==="harbour"?47:58,qn,-1));let br=null;if(to==="snowman"){const o=I0+1.5,t=15.4,e=d0(2,1,so,a=>[o,1.62+a*.1,t],{cap:.06}),s=e?Y(e,0,0):null,l=e?Y(e,1,0):null,f=[12,0,0,0];fo([o,.34,t],.4,.36,.4,10,f,s),fo([o+.02,.92,t-.02],.29,.27,.29,10,f,s),fo([o+.03,1.36,t-.03],.2,.19,.2,9,f,s);const r=t-.22;W([o+.03,1.53,t-.03],[o+.03,1.55,t-.03],.21,.21,12,[16,E(.02,.02,.02),0,0],l,l,!0),W([o+.03,1.55,t-.03],[o+.03,1.74,t-.03],.13,.12,12,[16,E(.02,.02,.02),0,0],l,l,!0),W([o-.02,1.35,r],[o-.12,1.33,r-.17],.028,.002,6,[16,E(.75,.25,.03),0,0],null,null);for(const a of[-.07,.06])fo([o+a,1.42,r+.02],.022,.022,.022,4,[16,E(.01,.01,.01),0,0],null);for(const a of[.82,.95,1.07])fo([o-.02,a,t-.3],.025,.025,.025,4,[16,E(.01,.01,.01),0,0],null);W([o+.03,1.18,t-.03],[o+.03,1.24,t-.03],.22,.22,12,[16,E(.5,.05,.05),0,0],null,null),W([o-.1,1.2,r+.02],[o-.16,.95,r-.05],.03,.03,5,[16,E(.5,.05,.05),0,0],null,null);for(const a of[-1,1]){const c=[o,1,t+a*.25],u=F0(c,[-.1,.35,a*.45]);W(c,u,.016,.008,4,[9,0,0,0],null,null),W(Zt(c,u,.75),F0(Zt(c,u,.75),[.05,.15,a*.05]),.008,.004,3,[9,0,0,0],null,null)}br={r:e},e&&A0.push({kind:"ledge",r:e,p:[[o,.9,t],[o,1.7,t]]})}if(U==="mill"||U==="village"){const o=-(V+S0)+.35,t=[];for(let e=21;e<(lo||60)-4;e+=22)e>Eo-3&&e<Ko&&(e=Ko+1),t.push(e),W([o,0,e],[o,8.5,e],.14,.11,7,[9,0,0,0],null,null),H(V0,o-1,o+1,7.9,8.05,e-.06,e+.06,[9,0,0,0],null);for(let e=0;e+1<t.length;e++)for(const s of[-.85,-.3,.3,.85]){const l=t[e],f=t[e+1],r=8.05,a=.55,c=10;for(let u=0;u<c;u++){const v=u/c,p=(u+1)/c;W([o+s,r-a*4*v*(1-v),dt(l,f,v)],[o+s,r-a*4*p*(1-p),dt(l,f,p)],.009,.009,3,[8,E(.02,.02,.02),0,0],null,null)}}if(t.length){const e=t[0]+12,s=V+S0+.3;for(let l=0;l<10;l++){const f=l/10,r=(l+1)/10;W([dt(o,s,f),7.9-1.2*Math.sin(f*Math.PI)-f*1.2,e],[dt(o,s,r),7.9-1.2*Math.sin(r*Math.PI)-r*1.2,e],.008,.008,3,[8,E(.02,.02,.02),0,0],null,null)}}}const i0={sodium:{lc:[1,.46,.12],li:13,wc:[1,.58,.28],sky:[.022,.016,.014],gnd:[.014,.01,.008],moon:[.004,.005,.007],mv:0,cover:.97,cld:[.07,.038,.022],sz:[.022,.015,.012],shz:[.08,.045,.026],fog:[.036,.021,.013],stars:0,env:[.05,.03,.02],expo:1.35},white:{lc:[.78,.88,1],li:12,wc:[1,.6,.3],sky:[.018,.02,.026],gnd:[.011,.012,.014],moon:[.005,.006,.008],mv:0,cover:.95,cld:[.04,.042,.05],sz:[.013,.015,.021],shz:[.045,.048,.058],fog:[.024,.027,.034],stars:0,env:[.03,.034,.042],expo:1.35},moon:{lc:[1,.64,.34],li:10,wc:[1,.6,.3],sky:[.03,.04,.066],gnd:[.012,.014,.02],moon:[.11,.13,.17],mv:1,cover:.42,cld:[.05,.056,.075],sz:[.008,.015,.035],shz:[.032,.042,.068],fog:[.03,.037,.055],stars:1,env:[.03,.04,.06],expo:1.25},dusk:{lc:[1,.62,.32],li:10,wc:[1,.62,.32],sky:[.07,.1,.18],gnd:[.02,.025,.04],moon:[0,0,0],mv:0,cover:.55,cld:[.07,.08,.12],sz:[.025,.06,.17],shz:[.17,.19,.3],fog:[.075,.095,.15],stars:.25,env:[.08,.1,.16],expo:1}}[ot];Ft==="aurora"&&(i0.cover=Math.min(i0.cover,.5),i0.stars=Math.max(i0.stars,.7)),h0==="blizzard"&&(i0.cover=Math.max(i0.cover,.9));const Vn=.2,es=-.3+T()*.25,Gn=[Math.sin(es)*Math.cos(Vn),Math.sin(Vn),Math.cos(es)*Math.cos(Vn)];bt.forEach((o,t)=>{o.c=m0(i0.lc,i0.li*(t===0?1.1:.85+.25*T()))});const Qo=Math.min(4,bt.length),Qe=new Float32Array(16),Je=new Float32Array(16);for(let o=0;o<Qo;o++)Qe.set([...bt[o].p,45],o*4),Je.set([...bt[o].c,bt[o].side],o*4);St.forEach(o=>{const t=Math.max(0,o.p[2]-8);o.score=o.I/(1+t*.12)/(1+t*.12)*(o.shop?3:1)}),St.sort((o,t)=>t.score-o.score);const ns=Math.min(16,St.length),ss=new Float32Array(64),rs=new Float32Array(64);for(let o=0;o<ns;o++)ss.set([...St[o].p,St[o].soft],o*4),rs.set([...St[o].n,St[o].I*.9],o*4);nr(n,O);const fs=n.createBuffer(),tn=n.createVertexArray(),ls=new Float32Array(Oo*16),on=[];{let o=0;for(let t=0;t<4;t++)ls.set(_n[t].subarray(0,ro[t]*16),o*16),on.push([o,ro[t]]),o+=ro[t]}n.bindVertexArray(tn),n.bindBuffer(n.ARRAY_BUFFER,fs),n.bufferData(n.ARRAY_BUFFER,ls,n.STATIC_DRAW),[[0,3],[12,3],[24,2],[32,4],[48,4]].forEach(([o,t],e)=>{n.enableVertexAttribArray(e),n.vertexAttribPointer(e,t,n.FLOAT,!1,64,o),n.vertexAttribDivisor(e,0)}),n.bindVertexArray(null);const as=()=>{n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.colorMask(!0,!0,!0,!0),n.depthMask(!0)};as();function zt(o,t,e,s,l,f,r){const a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,r||1,e,o,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r>1?n.LINEAR_MIPMAP_LINEAR:f),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,f),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),a}const Fo=a0?n.RGBA16F:n.SRGB8_ALPHA8;function Jo(o,t,e,s){const l=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,l),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);let f=null;return s&&(f=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,f),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT24,o,t),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,f)),{fb:l,rb:f,del(){n.deleteFramebuffer(l),f&&n.deleteRenderbuffer(f)}}}const mt=O.shd,gr=O.sky;function cs(o){const t=X0(o),e=X0(Yt(t,Math.abs(t[1])>.9?[0,0,1]:[0,1,0])),s=Yt(e,t);let l=[1e9,1e9,1e9],f=[-1e9,-1e9,-1e9];for(const v of[-24,24])for(const p of[-1,48])for(const g of[-4,100]){const b=[v,p,g],i=[Rt(b,e),Rt(b,s),Rt(b,t)];for(let h=0;h<3;h++)l[h]=Math.min(l[h],i[h]),f[h]=Math.max(f[h],i[h])}const r=[0,1,2].map(v=>(l[v]+f[v])/2),a=[0,1,2].map(v=>(f[v]-l[v])/2+.5),c=[[...m0(e,1/a[0]),-r[0]/a[0]],[...m0(s,1/a[1]),-r[1]/a[1]],[...m0(t,1/a[2]),-r[2]/a[2]],[0,0,0,1]],u=new Float32Array(16);for(let v=0;v<4;v++)for(let p=0;p<4;p++)u[p*4+v]=c[v][p];return{M:u,ha:a[2]}}const Hn=()=>{n.bindVertexArray(tn),n.drawArrays(n.TRIANGLES,0,Oo)};function Xn(o,t,e){n.bindFramebuffer(n.FRAMEBUFFER,o.fb),n.viewport(0,0,t[0],t[1]),n.clearColor(1,1,1,1),n.clearDepth(1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.enable(n.DEPTH_TEST),n.depthFunc(n.LESS),n.useProgram(mt.p),e()}const en=Math.min(.9,Un/X1*.45),me=cs([Io*en,-1,Wo*en]),D0=512,nn=zt(D0,D0,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),is=Jo(D0,D0,nn,!0);Xn(is,[D0,D0],()=>{n.uniform1i(mt.u.uNB,1),n.uniform1i(mt.u.uK,0),n.uniformMatrix4fv(mt.u.uM,!1,me.M),Hn()});const Nt=new Uint8Array(D0*D0*4);if(n.readPixels(0,0,D0,D0,n.RGBA,n.UNSIGNED_BYTE,Nt),h0==="blizzard"&&co.some(o=>o.samp)){const o=me.M,t=[Io*en,-1,Wo*en],e=s=>(o[2]*s[0]+o[6]*s[1]+o[10]*s[2]+o[14])*.5+.5;for(const s of co)s.samp&&s.samp(l=>{const f=(o[0]*l[0]+o[4]*l[1]+o[8]*l[2]+o[12])*.5+.5,r=(o[1]*l[0]+o[5]*l[1]+o[9]*l[2]+o[13])*.5+.5;if(f<0||r<0||f>=1||r>=1)return;const a=(Math.floor(r*D0)*D0+Math.floor(f*D0))*4,c=l[1]-.3;let u=e([l[0]+t[0]*c,.3,l[2]+t[2]*c]);if(!(u<=Nt[a]/255+Nt[a+1]/65025+Nt[a+2]/16581375+Nt[a+3]/4228250625||u>=1))for(let v=0;v<4;v++){u*=255;const p=Math.min(255,Math.floor(u));Nt[a+v]=p,u-=p}});n.bindTexture(n.TEXTURE_2D,nn),n.texSubImage2D(n.TEXTURE_2D,0,0,0,D0,D0,n.RGBA,n.UNSIGNED_BYTE,Nt),n.bindTexture(n.TEXTURE_2D,null)}const On=ot==="moon",jn=cs(m0(Gn,-1)),te=On?2048:4,Kn=zt(te,te,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),us=Jo(te,te,Kn,!0);Xn(us,[te,te],()=>{n.uniform1i(mt.u.uNB,0),n.uniform1i(mt.u.uK,0),n.uniformMatrix4fv(mt.u.uM,!1,jn.M),On&&Hn()});const sn=zt(1536,1024,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),hs=Jo(1536,1024,sn,!0),Yn=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]];Xn(hs,[1536,1024],()=>{n.uniform1i(mt.u.uK,1),n.uniform1f(mt.u.uR,45);for(let o=0;o<Qo;o++)for(let t=0;t<6;t++)n.viewport(t*256,o*256,256,256),n.uniform3fv(mt.u.uL,bt[o].p),n.uniform3fv(mt.u.uA,Yn[t][0]),n.uniform3fv(mt.u.uU,Yn[t][1]),n.uniform3fv(mt.u.uV,Yn[t][2]),Hn()});const yr=Math.floor(Math.log2(c0))+1,Zn=zt(c0,c0,Fo,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,yr),ps=zt(c0,c0,Fo,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1),rn=zt(c0,c0,a0?Fo:n.RGBA16UI,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.NEAREST,1),O0=Math.max(128,c0>>1),$n=zt(O0,O0,Fo,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,Math.floor(Math.log2(O0))+1),vs=zt(O0,O0,Fo,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1),ms=zt(O0,O0,Fo,n.RGBA,a0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1),kr=()=>{n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,O.noise),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,Kn),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,nn),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,sn)},ds=T()*7;function Ar(o,t){const e=o===2&&!a0?O.skyU:gr,s=e.u;n.useProgram(e.p),n.uniform1i(s.uMode,o),n.uniform1f(s.uMir,t),n.uniform1i(s.uNz,0),n.uniform3fv(s.uEye,W0),n.uniform3fv(s.uFwd,lt),n.uniform3fv(s.uRt,N0),n.uniform3fv(s.uUp,pt),n.uniform1f(s.uTan,q0),n.uniform3fv(s.uSkyZ,i0.sz),n.uniform3fv(s.uSkyH,i0.shz),n.uniform3fv(s.uCld,i0.cld),n.uniform3fv(s.uMtn,m0(F0(i0.sky,i0.moon),2.2)),n.uniform3fv(s.uMoonD,Gn),n.uniform3fv(s.uFogC,i0.fog),n.uniform4f(s.uSk,i0.cover,i0.stars,U==="village"?1:0,ds),n.uniform4f(s.uMo,i0.mv,.022,1,U==="harbour"?1:0)}const xs=.3/(2*me.ha),ws=ot==="sodium"||ot==="white"?m0(i0.cld,2.2):null;function Er(o,t,e,s,l){const f=o.u;n.useProgram(o.p),n.uniform1i(f.uMode,t),n.uniform1f(f.uMir,e),n.uniformMatrix4fv(f.uVP,!1,s),n.uniform1i(f.uNz,0),n.uniform1i(f.uShM,1),n.uniform1i(f.uShS,2),n.uniform1i(f.uShL,3),n.uniformMatrix4fv(f.uMoonM,!1,jn.M),n.uniformMatrix4fv(f.uSkyM,!1,me.M),n.uniform4fv(f.uLP,Qe),n.uniform4fv(f.uLC,Je),n.uniform1i(f.uNL,Qo),n.uniform4fv(f.uWP,ss),n.uniform4fv(f.uWN,rs),n.uniform1i(f.uNW,ns),n.uniform3fv(f.uWC,i0.wc),n.uniform3fv(f.uMoonD,Gn),n.uniform3fv(f.uMoonC,i0.moon),n.uniform3fv(f.uSkyA,t===1&&l===2&&ws?ws:i0.sky),n.uniform3fv(f.uGndA,i0.gnd),n.uniform3fv(f.uEye,W0),n.uniform3fv(f.uFwd,lt),n.uniform3fv(f.uEnv,i0.env),n.uniform3fv(f.uLampE,m0(i0.lc,9)),n.uniform4f(f.uSt,V,V+S0,q1,xt),n.uniform4f(f.uSd,ds,Io,Wo,On?1:0),n.uniform4f(f.uBi,xs,3,.15/(2*jn.ha),0)}kr();const Qn=Math.min(4,n.getParameter(n.MAX_SAMPLES)||0);let Ut=null;if(Qn>1){const o=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,o),n.renderbufferStorageMultisample(n.RENDERBUFFER,Qn,Fo,c0,c0);const t=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,t),n.renderbufferStorageMultisample(n.RENDERBUFFER,Qn,n.DEPTH_COMPONENT24,c0,c0);const e=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,o),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,t),n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE?Ut={fb:e,rbc:o,rbd:t}:(n.deleteFramebuffer(e),n.deleteRenderbuffer(o),n.deleteRenderbuffer(t))}function fn(o,t,e,s,l,f,r){const a=Jo(t,e,o,!r||!Ut);n.bindFramebuffer(n.FRAMEBUFFER,r&&Ut?Ut.fb:a.fb),n.viewport(0,0,t,e),n.clearColor(0,0,0,0),n.clearDepth(1),s===2&&!a0?(n.clearBufferuiv(n.COLOR,0,new Uint32Array(4)),n.clear(n.DEPTH_BUFFER_BIT)):n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.disable(n.DEPTH_TEST),n.depthMask(!1),Ar(s,l),n.bindVertexArray(O.vao0),n.drawArrays(n.TRIANGLES,0,3),n.enable(n.DEPTH_TEST),n.depthMask(!0),n.depthFunc(n.LESS),n.bindVertexArray(tn);for(let c=0;c<4;c++)on[c][1]&&(Er(O["scn"+c+(s===2&&!a0?"U":"")],s,l,f,c),n.drawArrays(n.TRIANGLES,on[c][0],on[c][1]));r&&Ut&&(n.bindFramebuffer(n.READ_FRAMEBUFFER,Ut.fb),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,a.fb),n.blitFramebuffer(0,0,t,e,0,0,t,e,n.COLOR_BUFFER_BIT,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null)),a.del()}fn(Zn,c0,c0,0,0,Bo,!0),fn(ps,c0,c0,1,0,Bo,!0),fn(rn,c0,c0,2,0,Bo,!1),fn($n,O0,O0,0,1,Bo,!1),n.disable(n.DEPTH_TEST),Ut&&(n.deleteFramebuffer(Ut.fb),n.deleteRenderbuffer(Ut.rbc),n.deleteRenderbuffer(Ut.rbd)),n.bindTexture(n.TEXTURE_2D,Zn),n.generateMipmap(n.TEXTURE_2D),n.bindTexture(n.TEXTURE_2D,$n),n.generateMipmap(n.TEXTURE_2D);{const o=Jo(O0,O0,vs,!1);n.viewport(0,0,O0,O0),n.useProgram(O.blr.p),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,$n),n.uniform1i(O.blr.u.uR,0),n.uniform1f(O.blr.u.uSp,.009),n.bindVertexArray(O.vao0),n.drawArrays(n.TRIANGLES,0,3),o.del()}{const o=Jo(O0,O0,ms,!1);n.viewport(0,0,O0,O0);const t=O.vol.u;n.useProgram(O.vol.p),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,O.noise),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,rn),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,sn),n.uniform1i(t.uNz,0),n.uniform1i(t.uI,1),n.uniform1i(t.uShL,3),n.uniform3fv(t.uEye,W0),n.uniform3fv(t.uFwd,lt),n.uniform3fv(t.uRt,N0),n.uniform3fv(t.uUp,pt),n.uniform1f(t.uTan,q0),n.uniform4fv(t.uLP,Qe),n.uniform4fv(t.uLC,Je),n.uniform1i(t.uNL,Qo),n.uniform1i(t.uNS,40),n.bindVertexArray(O.vao0),n.drawArrays(n.TRIANGLES,0,3),o.del()}n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindVertexArray(null),n.deleteBuffer(fs),n.deleteVertexArray(tn),is.del(),us.del(),hs.del(),n.deleteTexture(nn),n.deleteTexture(Kn),n.deleteTexture(sn);const Rr=(o,t,e)=>{const s=me.M,l=[s[0]*o+s[4]*t+s[8]*e+s[12],s[1]*o+s[5]*t+s[9]*e+s[13],s[2]*o+s[6]*t+s[10]*e+s[14]],f=l[0]*.5+.5,r=l[1]*.5+.5,a=l[2]*.5+.5-xs;if(f<0||r<0||f>1||r>1)return 1;let c=0;for(let u=-1;u<=1;u++)for(let v=-1;v<=1;v++){const p=G(Math.floor(f*D0)+v,0,D0-1),g=G(Math.floor(r*D0)+u,0,D0-1),b=(g*D0+p)*4,i=Nt[b]/255+Nt[b+1]/65025+Nt[b+2]/16581375+Nt[b+3]/4228250625;a<=i&&c++}return c/9};for(const o of Xo){const t=Math.min(o[0][0],o[1][0]),e=Math.max(o[0][0],o[1][0]),s=Math.min(o[0][2],o[1][2]),l=Math.max(o[0][2],o[1][2]);for(let f=0;f<ut;f++)for(let r=0;r<it;r++){const a=f*p0+r;M0[a]>t+.1&&M0[a]<e-.1&&k0[a]>s+.1&&k0[a]<l-.1&&(wt[a]|=2)}}const de=[];for(let o=0;o<T0;o++){if(!Z0[o])continue;if(Z0[o]===go&&wt[o]&2){Lt[o]=0;continue}Lt[o]=Rr(M0[o],It[o]+.03,k0[o]),Z0[o]===Ie&&(Lt[o]=Math.max(Lt[o],h0==="blizzard"?.6:.45));const t=wo([M0[o],It[o],k0[o]]);_e[o]=t[0],Ce[o]=t[1],Dn[o]=t[2],de.push(o)}const Jn=new Int16Array(T0).fill(-1);for(const o of de)_e[o]>-.02&&_e[o]<1.02&&Ce[o]>-.02&&Ce[o]<1.02&&(Jn[o]=G(Math.floor(Ce[o]*20),0,19)*20+G(Math.floor(_e[o]*20),0,19));const Wt=Int32Array.from(de),at=Int32Array.from(de.filter(o=>Z0[o]===go)),ln=Int32Array.from(de.filter(o=>Z0[o]!==go));for(const o of $0){const t=o.pitch;o.Lc=dt(.3,.05,Et(.35,.98,t))*(o.metal?.6:1)*(h0==="wet"?.75:1)*(.8+.5*D()),o.slide=null,o.mul=1-.55*Et(.7,1.05,t)}for(const o of vt)o.cd=0;const qt=new Float32Array(T0),an=new Float32Array(T0).fill(1),oe=(o,t,e)=>{let s=Math.imul(o,374761393)+Math.imul(t,668265263)+e|0;return s=Math.imul(s^s>>>13,1274126177),((s^s>>>16)>>>0)/4294967296},cn=(o,t,e)=>{const s=Math.floor(o),l=Math.floor(t),f=o-s,r=t-l,a=f*f*(3-2*f),c=r*r*(3-2*r),u=oe(s,l,e),v=oe(s+1,l,e),p=oe(s,l+1,e),g=oe(s+1,l+1,e);return u+(v-u)*a+(p-u)*c+(u-v-p+g)*a*c};function Ms(){const o=r0()*1e9|0;for(let t=0;t<Wt.length;t++){const e=Wt[t],s=M0[e],l=k0[e],f=cn(s*.33,l*.33,o),r=cn(s*1.3,l*1.3,o+7),a=cn((Io*s+Wo*l)*.2,(-Wo*s+Io*l)*1.1,o+19);qt[e]=G(Math.pow((f*.55+r*.25+a*.2)*2,2.3),Z0[e]===Ie?.65:.12,Z0[e]===Ie?1.4:2.4),Z0[e]===go&&(an[e]=G(.7+(f-.5)*.9+(r-.5)*.3-.3*Et(.55,1,Math.abs(s)/V),.15,1))}}Ms();const xe=(et?11e-5:16e-5)*{powder:1,wet:1.25,blizzard:1.5}[h0],So=new Float32Array(T0).fill(1),bs=O.nd,Fr=(o,t)=>{if(!bs)return 0;const e=o*.017*128-.5,s=(.31+t*.37)*128-.5,l=Math.floor(e),f=Math.floor(s),r=e-l,a=s-f,c=(u,v)=>bs[((v&127)*128+(u&127))*4]/255;return((c(l,f)*(1-r)+c(l+1,f)*r)*(1-a)+(c(l,f+1)*(1-r)+c(l+1,f+1)*r)*a-.5)*.55};for(const o of $0)for(const t of o.r.cells)So[t]=o.mul;for(const o of co)if(o.r)for(let t=0;t<o.r.w;t++)So[(o.r.y+3)*p0+o.r.x+t]=o.pm[t];for(const o of co)if(o.state==="home"&&o.r)for(let t=0;t<o.r.h;t++)for(let e=0;e<o.r.w;e++)e/(o.r.w-1)*o.K.L>o.K.bon-.2&&(So[(o.r.y+t)*p0+o.r.x+e]=.03);for(let o=0;o<Wt.length;o++){const t=Wt[o],e=Lt[t]*So[t],s=qt[t];if(Z0[t]===go){const l=bo[t];if(l===4)continue;if(et){if(_[t]=(.11+.03*Math.sin(M0[t]*.7+k0[t]*.31)*Math.sin(k0[t]*.5))*Math.max(e,.15)*G(s,.7,1.3),l===1){const f=Math.abs(Math.abs(M0[t])-V*.5);(Math.abs(f-.8)<.25||Math.abs(f+.8-V)<.25)&&(_[t]*=.3),nt[t]=.25}}else if(eo){const f=G((s-.3)/1.4,0,1),r=G(e*1.15,.1,1);if(l===1){const a=M0[t]>=0?1:0,c=Math.abs(Math.abs(M0[t]-Fr(k0[t],a))-V*.5),u=Et(.36,.14,Math.abs(c-.74)+(s-1)*.05)*Et(.18,.42,cn(M0[t]*.5,k0[t]*.22,911));_[t]=(.025+.025*f)*(1-u*.67)*r,nt[t]=.6,Bt[t]=.2}else l===2?(_[t]=(.04+.02*f)*r,nt[t]=.35,Bt[t]=.08):_[t]=(.06+.02*f)*r}else l===1?(Bt[t]=.8*an[t],nt[t]=1,_[t]=xe*34*e*s*Et(.68,1,Math.abs(M0[t])/V)):l===2?(Bt[t]=.4,nt[t]=.75,_[t]=xe*70*e*s):_[t]=xe*150*e*s}else if(_[t]=Math.min(no[t]*.85,et?.13*e*G(s,.7,1.3):eo?.06*e*s:xe*150*e*s),Z0[t]===qo){const l=vt.find(f=>f.r.id===Be[t]);_[t]=Math.min(_[t],l?l.cap*(eo?.4:.65):.02)}}if(Ft==="plough"){for(let o=0;o<at.length;o++){const t=at[o],e=bo[t],s=Math.abs(M0[t]);if(e!==4)if(e===1){const l=Et(V-1.3,V-.75,s);_[t]=l*(.1+.07*qt[t])*Math.max(Lt[t],.4)+(1-l)*.0012*qt[t],Bt[t]=(1-l)*.55*an[t],nt[t]=1}else et||(_[t]=Math.max(_[t],.055*Lt[t]*G(qt[t],.6,1.4)))}if(!et)for(let o=0;o<ln.length;o++){const t=ln[o];Z0[t]!==qo&&(_[t]=Math.min(no[t]*.85,Math.max(_[t],.055*Lt[t]*So[t]*G(qt[t],.7,1.3))))}}if(Co)for(let o=0;o<at.length;o++){const t=at[o];M0[t]>I0+.15&&M0[t]<G1&&k0[t]>1.5&&k0[t]<21.3&&(_[t]*=1.4)}function gs(o){for(const t of $0){const e=t.r,s=oo()<1/3,l=Math.min(2,e.h-2);for(let f=0;f<e.h;f++)for(let r=0;r<e.w;r++){const a=(e.y+f)*p0+e.x+r;let c=Math.min(_[a],t.Lc*o)*(.12+.88*Et(.25,.8,qt[a]));f===e.h-1&&(c*=.12+.3*oe(r,e.id,5)),s&&f<l&&(c*=.05+.08*oe(r,f+e.id*7,9)),_[a]=c}}}if(et)gs(.7);else if(eo)gs(.5);else if(Ft==="plough")for(const o of $0)for(const t of o.r.cells)_[t]=Math.min(_[t],o.Lc*.7);for(const o of co)if(o.state==="home"&&o.r)for(const t of o.r.cells)_[t]*=So[t]<.5?0:.34;const ys=zt(p0,Do,n.RG8,n.RG,n.UNSIGNED_BYTE,n.LINEAR,1),t1=new Uint8Array(T0*2),ct=Math.round({powder:3200,wet:2800,blizzard:3800}[h0]*(I<500?.6:1)),j0=700,Sr=4+j0+ct,Dt=new Float32Array(Sr*8),ks=n.createBuffer(),As=n.createVertexArray();n.bindVertexArray(As),n.bindBuffer(n.ARRAY_BUFFER,ks),n.bufferData(n.ARRAY_BUFFER,Dt.byteLength,n.DYNAMIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,4,n.FLOAT,!1,32,0),n.vertexAttribDivisor(0,1),n.enableVertexAttribArray(1),n.vertexAttribPointer(1,4,n.FLOAT,!1,32,16),n.vertexAttribDivisor(1,1),n.bindVertexArray(null);const ee=new Float32Array(ct),we=new Float32Array(ct),ne=new Float32Array(ct),Me=new Float32Array(ct),se=new Float32Array(ct),be=new Float32Array(ct),Es=new Float32Array(ct),Rs=new Float32Array(ct),un=new Float32Array(ct),ge={powder:[.0085,.42],wet:[.024,.5],blizzard:[.0075,.4]}[h0],Fs=1,Ss=19;function o1(o,t){const e=Fs+(Ss-Fs)*Math.pow(D(),1.15),s=D()*1.24-.12,l=t?1.05+D()*.06:D()*1.2-.1,f=e*q0*2,r=F0(F0(W0,m0(lt,e)),F0(m0(N0,(s-.5)*f),m0(pt,(l-.5)*f)));ee[o]=r[0],we[o]=r[1],ne[o]=r[2];const a=Math.sqrt(-2*Math.log(D()+1e-6))*Math.cos(R0*D()),c=G(ge[0]*Math.exp(ge[1]*a),ge[0]*.3,ge[0]*2.3);Es[o]=c,un[o]=X1*(.6+.4*Math.sqrt(c/ge[0]))*(.8+D()*.4),Me[o]=Mo,se[o]=-un[o],be[o]=pe,Rs[o]=.001+D()*.99}for(let o=0;o<ct;o++)o1(o,!1);const G0=20,Vt=new Float32Array(G0*G0),Gt=new Float32Array(G0*G0);let io=0;const K0=12,Ns=new Float32Array(K0*K0),e1=new Float32Array(K0*K0),Ts=[];for(let o=0;o<4;o++)Ts.push([(1.6+r0()*3.4)*(r0()<.5?-1:1),(1.4+r0()*2.8)*(r0()<.5?-1:1),(.11+r0()*.31)*(r0()<.5?-1:1),r0()*R0]);const Ls={powder:.34,wet:.2,blizzard:.9}[h0];let Nr=0;function Tr(o){if(!(++Nr&1))for(let t=0;t<K0;t++)for(let e=0;e<K0;e++){const s=(e+.5)/K0,l=(t+.5)/K0;let f=0,r=0;for(let a=0;a<4;a++){const c=Ts[a],u=s*c[0]*6.283+l*c[1]*6.283+o*c[2]*6.283+c[3];f+=Math.sin(u),r+=Math.cos(u*.73+c[3])}Ns[t*K0+e]=f*.5*Ls,e1[t*K0+e]=r*.34*Ls}}const uo=new Float32Array(j0),re=new Float32Array(j0),ho=new Float32Array(j0),Ht=new Float32Array(j0),po=new Float32Array(j0),Xt=new Float32Array(j0),ye=new Float32Array(j0),No=new Float32Array(j0),Ps=new Float32Array(j0),n1=new Uint8Array(j0),s1=new Float32Array(j0);let r1=0;function To(o,t,e,s,l,f){let r=-1;for(let a=0;a<j0;a++){const c=(r1+a)%j0;if(No[c]<=0){r=c;break}}r<0&&(r=r1),r1=(r+1)%j0,uo[r]=t[0],re[r]=t[1],ho[r]=t[2],Ht[r]=e[0],po[r]=e[1],Xt[r]=e[2],ye[r]=s,No[r]=Ps[r]=l,n1[r]=o,s1[r]=f||0}const Y0=.05;let Lo=.34+r0()*.1,zs=Lo,f1=14+r0()*30,ke=1,Us=1,l1=2+r0()*7,Ds=(et?300:eo?255:210)+r0()*260,hn=0,Ae=0,pn=1,_s=0,a1=!0,Ee=0,Lr=0,vn=0,Ot=0,mn=0,Re=0,c1=0,i1=0;const rt=m.sound,fe=new Float32Array(ut*p0),nf=(o,t)=>{const e=G(Math.floor(o*G0),0,G0-1);return G(Math.floor(t*G0),0,G0-1)*G0+e};function Cs(o,t,e){let s=0,l=0,f=0,r=0,a=0;for(const c of o){const u=_[c];if(u<.003)continue;_[c]=0,s+=u,l+=M0[c],f+=It[c],r+=k0[c],a++;const v=G(2+Math.floor(u*90),2,5),p=qe(M0[c],k0[c]);for(let g=0;g<v;g++)To(1,[M0[c]+(D()-.5)*.3,It[c]+D()*.05,k0[c]+(D()-.5)*.3],[(D()-.5)*.7*t+Mo*.2,-D()*.6,(D()-.5)*.7*t],.035+u*1.5*D()+.04*D(),4,p>=0?u/v*.6:0);e&&To(2,[M0[c],It[c],k0[c]],[(D()-.5)*.4+Mo*.3,-.35,(D()-.5)*.4],.3+D()*.4,1.4+D(),0)}return{tot:s,n:a,c:a?[l/a,f/a,r/a]:null}}function dn(o,t){const e=Cs(o.r.cells,t,!0);if(e.tot>.004){for(const s of o.below)for(const l of s.r.cells)_[l]+=e.tot/Math.max(1,o.r.cells.length)*.35;if(rt.on&&i1<=0){const s=e.c?G((wo(e.c)[0]-.5)*1.6,-1,1):0;rt.hit("noise",.12+Math.min(.3,e.tot*2),{cutoff:900,dur:.45,pan:s}),i1=.15}}o.cd=1.5}function Bs(o,t){if(o.slide)return;let e=0;for(const s of o.r.cells)e+=_[s];e/o.r.cells.length<(t?.008:o.Lc)||(o.slide={v:t?2:.6,t:0,top:t?Math.max(1,Math.floor(o.r.h*.5)):D()<.5?o.r.h-1:Math.max(1,Math.floor(o.r.h*(.5+D()*.4))),tot0:e,landed:!1})}function Pr(o){const t=o.slide,e=o.r;t.t+=Y0,t.v=Math.min(10,t.v+Y0*7);let s=t.v*Y0;for(;s>0;){const f=Math.min(1,s);s-=f;for(let r=0;r<e.w;r++){const a=e.y*p0+e.x+r,c=_[a]*f;if(c>.0015){const u=o.eave[0],v=o.eave[1],p=e.w>1?r/(e.w-1):.5,g=Zt(u,v,p),b=o.out,i=c>.02?2:1,h=qe(g[0]+b[0]*.8,g[2]+b[2]*.8);for(let d=0;d<i;d++)To(1,[g[0]+b[0]*.1+(D()-.5)*.3,g[1],g[2]+b[2]*.1+(D()-.5)*.3],[b[0]*(.8+t.v*.15),-.3-D()*.5,b[2]*(.8+t.v*.15)],.05+c*2+D()*.06,4,h>=0?c/i*1.5:0);D()<.4&&To(2,g,[b[0]*.8,-.4,b[2]*.8],.4+D()*.5,1.5,0)}for(let u=0;u<=t.top;u++){const v=(e.y+u)*p0+e.x+r,p=u+1<=t.top?_[v+p0]:0;_[v]=_[v]*(1-f)+p*f}}}let l=0;for(const f of e.cells)l+=_[f];(l<t.tot0*.08||t.t>5)&&(o.slide=null)}function zr(){if(Lr+=Y0,a1=!0,f1-=Y0,f1<=0){const r=r0();zs=r<.26?.06+r0()*.16:r<.78?.32+r0()*.26:.72+r0()*.28,f1=12+r0()*r0()*95}Lo+=(zs-Lo)*Y0*.16,l1-=Y0,l1<=0&&(Us=.45+r0()*r0()*1.5,l1=1.6+r0()*9),ke+=(Us-ke)*Y0*.55;let o=0;if(Ae>0){if(hn+=Y0,o=hn/Ae,hn>=Ae&&(Ae=0,Ds=(et?260:190)+r0()*280,pn>.6))for(let r=0;r<at.length;r++){const a=at[r];bo[a]===1&&(Bt[a]=Math.max(Bt[a],.6*an[a]),nt[a]=1)}}else(Ds-=Y0)<=0&&(hn=0,Ae=16+r0()*40,pn=.3+r0()*.7,Ms());const t=xe*(1+5*Ot)*(.34+1.45*Lo)*(o>0?Math.max(0,1-o*4):1);Re=o>0?Math.min(1,o*3)*(.45+.55*pn):Math.max(0,Re-Y0*.01);const e=o>0?(.0012+o*.004)*pn:0,s=(++_s&1)===0,l=Y0*2;for(let r=0;s&&r<Wt.length;r++){const a=Wt[r],c=Z0[a],u=t*Lt[a]*qt[a]*l;if(c===go){const v=bo[a];if(v===4)continue;if(v<=2){const p=Bt[a];_[a]+=u*(1-p),nt[a]=Math.min(1.1,nt[a]+u*p*50),Bt[a]=Math.max(0,p-u*(v===1?20:35)),nt[a]-=l*nt[a]*(_[a]>.03?.03:.002)}else _[a]+=u;if(e>0){const p=Math.min(_[a],e*l*1.3*G(2.1-qt[a],.35,1.9));_[a]-=p,v<=2&&(nt[a]=Math.min(1.1,nt[a]+p*40))}}else _[a]+=u*So[a],_[a]>no[a]&&(_[a]=no[a]),e>0&&(_[a]=Math.max(0,_[a]-e*l*(c===ve?.8:2)))}for(const r of $0){if(r.slide){Pr(r);continue}if(D()<.012*(o>0?4:1)){let a=0;for(const c of r.r.cells)a+=_[c];a/r.r.cells.length>r.Lc*(o>0?.3:1)&&Bs(r,!1)}}for(const r of vt){if(r.cd-=Y0,r.cd>0)continue;let a=0;for(const c of r.r.cells)a+=_[c];a/r.r.cells.length>r.cap*(o>0?.4:1)&&D()<.08&&dn(r,.5)}const f=h0==="blizzard"?.25:0;(io>.15||f>0&&_s%4===0)&&Dr(io>.15?f:f*4),io>.2&&_r()}let Ur=0;function Dr(o){let t=!1;fe.fill(0);for(let e=0;e<at.length;e++){const s=at[e];if(_[s]<.002||bo[s]===4)continue;let l=Io*o,f=Wo*o,r=o;const a=Jn[s];if(a>=0&&(Vt[a]>.15||Vt[a]<-.15||Gt[a]>.15||Gt[a]<-.15)){const d=Vt[a],M=Gt[a],R=Math.hypot(d,M);if(R>.15){const k=Dn[s],S=V1*d*2*q0*Math.min(k,12),F=M*2*q0*k*k/Math.max(.5,W0[1]-It[s]),L=Math.hypot(S,F)||1;l+=S/L*R,f+=F/L*R,r=Math.hypot(l,f)}}if(r<.15)continue;t=!0;const c=Math.min(.22,(r-.12)*1.4*Y0)*(r===o?.15:1),u=_[s]*c,v=Math.abs(l)/(Math.abs(l)+Math.abs(f)+1e-6),p=s%p0,g=s/p0|0,b=l>0?p+1:p-1,i=f>0?g+1:g-1;let h=0;if(b>=0&&b<it){const d=g*p0+b;!(wt[d]&3)&&!(wt[s]&1&&!1)&&(fe[d]+=u*v,h+=u*v)}if(i>=0&&i<ut){const d=i*p0+p;wt[d]&3||(fe[d]+=u*(1-v),h+=u*(1-v))}fe[s]-=h,r>.4&&D()<u*120+.004&&To(2,[M0[s],.1,k0[s]],[l*1.2,.3,f*1.2],.3+D()*.4,1+D()*.6,0)}if(t){for(let e=0;e<at.length;e++){const s=at[e];fe[s]!==0&&(_[s]=Math.max(0,_[s]+fe[s]))}if(!(++Ur%4))for(let e=0;e<at.length;e++){const s=at[e],l=s%p0;for(let f=0;f<2;f++){const r=f===0?l+1<it?s+1:-1:s+p0<ut*p0?s+p0:-1;if(r<0||wt[r]&2||(wt[r]|wt[s])&1)continue;const a=_[s]-_[r];if(a>.06||a<-.06){const c=(a>0?a-.06:a+.06)*.25;_[s]-=c,_[r]+=c}}}}}function _r(){for(let o=0;o<ln.length;o++){const t=ln[o],e=Jn[t];if(e<0||_[t]<.002)continue;const s=Vt[e],l=Gt[e];if(s<.25&&s>-.25&&l<.25&&l>-.25)continue;const f=Math.hypot(s,l);if(f<.25)continue;const r=Z0[t],a=_[t]*Math.min(.5,(f-.2)*(r===qo?2.5:r===ve?.6:1.4)*Y0);_[t]-=a;const c=Dn[t],u=V1*s*2*q0*Math.min(c,10),v=l*.5,p=qe(M0[t]+u*.8,k0[t]+v);if(p>=0&&!(wt[p]&2)&&(_[p]+=a*.7),D()<a*220&&To(2,[M0[t],It[t]+.05,k0[t]],[u*1.5,.2+l*2,v*.5],.2+D()*.35,.9+D()*.8,0),r===qo&&f>.9){const g=vt.find(b=>b.r.id===Be[t]);g&&g.cd<=0&&D()<.05&&dn(g,1)}}}let xn=!1,u1=0,h1=0,wn=0,Mn=0,Fe=null,p1=30;function v1(o,t,e,s,l,f){for(let r=0;r<G0;r++)for(let a=0;a<G0;a++){const c=(a+.5)/G0,u=(r+.5)/G0,v=(c-o)*(c-o)+(u-t)*(u-t);if(v>l*l*4)continue;const p=Math.exp(-v/(l*l))*f,g=r*G0+a;Vt[g]+=(e-Vt[g])*p,Gt[g]+=(s-Gt[g])*p}}const Cr=(o,t,e,s)=>{const l=s[0]-e[0],f=s[1]-e[1],r=l*l+f*f||1e-9,a=G(((o-e[0])*l+(t-e[1])*f)/r,0,1);return Math.hypot(o-e[0]-l*a,t-e[1]-f*a)},m1=A0.map(o=>{const t=wo(o.p[0]),e=wo(o.p[1]);return Object.assign(o,{sa:t,sb:e,zz:Math.min(t[2],e[2])})}).filter(o=>o.zz>.5);function Is(o,t){const e=o,s=1-t;let l=null,f=1e9;for(const r of m1){const a=Cr(e,s,r.sa,r.sb),c=G(.5/r.zz,.018,.05);a<c&&a/c<f&&(f=a/c,l=r)}if(rt.on&&(rt.hit("click",.35,{pan:(e-.5)*1.4}),rt.note(38+Math.floor(D()*4),{dur:.08,wave:"triangle",vel:.25,cutoff:500,pan:(e-.5)*1.4})),!l){for(let r=0;r<8;r++){const a=r/8*R0;v1(e+Math.cos(a)*.03,s+Math.sin(a)*.03,Math.cos(a)*.9,Math.sin(a)*.9,.04,.6)}return}if(l.kind==="branch"){dn(l.br,1.2);for(const r of l.br.kids)D()<.7&&dn(r,1)}else if(l.kind==="roof")Bs(l.roof,!0);else{const r=Cs(l.r.cells,1,!0);rt.on&&r.tot>.003&&rt.hit("noise",.15+Math.min(.3,r.tot*3),{cutoff:1100,dur:.3,pan:(e-.5)*1.4})}}const Se=[0,0,0,0];if(to==="fox"){const o=V+S0*.5+.7,t=6.3+r0()*2.5+(ft==="walk"?5:0),e=-(o+V+S0*.5+1),s=11,l=Math.hypot(e,s);Se[0]=o,Se[1]=t,Se[2]=e/l,Se[3]=s/l}Ft==="plough"&&r0();const d1=16e3;let bn=new Float32Array(2048),x1=0,w1=0,M1=0,le=0,Po=12345,b1=6+D()*10,g1=20+D()*30,zo=0;const Br=[55,52,57,50][Math.floor(D()*4)];function Ir(o){bn.length<o&&(bn=new Float32Array(o));const t=ot==="sodium"?.006:.0035;for(let e=0;e<o;e++){Po^=Po<<13,Po^=Po>>>17,Po^=Po<<5;const s=(Po>>>0)/4294967296*2-1;x1+=(s-x1)*.03,w1+=(x1-w1)*.05,M1+=(s-M1)*(.04+.2*zo),le+=R0*100/d1,le>R0&&(le-=R0);let l=w1*.9+M1*zo*.5+(Math.sin(le)*.7+Math.sin(le*2)*.35+Math.sin(le*3)*.12)*t;bn[e]=l}return bn.subarray(0,o)}const Ws=O.cmp,qs=O.flk,gn=new Float32Array(24),y1=new Float32Array(18);let jt=0;for(let o=0;o<Qo&&jt<6;o++){const t=wo(bt[o].hp);t[2]<.5||(gn.set([t[0],t[1],1,G(bt[o].size*.9/t[2],.004,.06)],jt*4),y1.set(m0(i0.lc,.5),jt*3),jt++)}let k1=-1;if(U==="harbour"){const o=wo([-32,19.2,150]);o[2]>0&&(k1=jt,gn.set([o[0],o[1],0,.012],jt*4),y1.set([1,.9,.7],jt*3),jt++)}const Wr={powder:.85,wet:.95,blizzard:.75}[h0],qr={powder:.35,wet:.5,blizzard:.15}[h0],Vr={powder:2.5,wet:1.4,blizzard:3.5}[h0],Gr=(h0==="blizzard"?.013:.008)+(ot==="dusk"?.004:0),Hr=V*.5,Xr=S0>.5?(V+S0*.55)*((r0()<.5?1:-1)*(ft==="walk"?0:1)||-1):0,Or=[Zn,ps,rn,vs,ms,ys,O.noise];let Ne=0;function A1(o,t,e,s,l,f,r,a){const c=Ne*8;Dt[c]=o,Dt[c+1]=t,Dt[c+2]=e,Dt[c+3]=s,Dt[c+4]=l,Dt[c+5]=f,Dt[c+6]=r,Dt[c+7]=a,Ne++}function Vs(o){if(a1){a1=!1,Ee=0;for(let r=0;r<Wt.length;r++){const a=Wt[r],c=a*2,u=_[a];u>Ee&&Lt[a]>.2&&(Ee=u),t1[c]=u>0?Math.min(255,Math.sqrt(u*1.6667)*255+.5):0,t1[c+1]=Math.min(255,nt[a]*212+.5)}n.bindTexture(n.TEXTURE_2D,ys),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texSubImage2D(n.TEXTURE_2D,0,0,0,p0,Do,n.RG,n.UNSIGNED_BYTE,t1)}n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,I,I),as(),n.disable(n.DEPTH_TEST),n.useProgram(Ws.p);const t=Ws.u;for(let r=0;r<7;r++)n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,Or[r]);const e=.035*(h0==="blizzard"?1.25:1)*(.72+.62*Lo)*(1+2.2*Ot)*(1-.7*Re);O.owner!==s0&&(n.uniform1i(t.tC,0),n.uniform1i(t.tS,1),n.uniform1i(t.tI,2),n.uniform1i(t.tR,3),n.uniform1i(t.tV,4),n.uniform1i(t.tA,5),n.uniform1i(t.tN,6),n.uniform3fv(t.uFogC,i0.fog),n.uniform3fv(t.uEye,W0),n.uniform3fv(t.uFwd,lt),n.uniform3fv(t.uRt,N0),n.uniform3fv(t.uUp,pt),n.uniform1f(t.uTan,q0),n.uniform3fv(t.uHC,y1),n.uniform1i(t.uNH,jt),n.uniform4fv(t.uFx,Se),n.uniform4f(t.uSn,.93,.96,1,h0==="blizzard"?.85:0),n.uniform4f(t.uTr,Hr,V,q1,Xr)),k1>=0&&(gn[k1*4+2]=Math.pow(Math.max(0,Math.sin(o*1.4)),12)*2.5),n.uniform4fv(t.uH,gn),n.uniform4f(t.uA,o,e,Math.min(1,Ot*1.2+(h0==="blizzard"?.2:0)),i0.expo),n.uniform4f(t.uB,Gr+.02*Ot,y0,I,Re*.8),n.uniform4f(t.uAu,Ft==="aurora"?1:0,o,0,0);{const r=G(Math.ceil(Ee/.05)+1,2,6);n.uniform1i(t.uCapN,r),n.uniform1f(t.uCapS,Math.max(.012,Math.min(.05,(Ee+.01)/r)))}n.bindVertexArray(O.vao0),n.drawArrays(n.TRIANGLES,0,3),Ne=0;for(let r=0;r<j0;r++){if(No[r]<=0)continue;const a=No[r]/Ps[r];n1[r]===2?A1(uo[r],re[r],ho[r],ye[r]*(1.6-a*.8),Ht[r],po[r],Xt[r],2+Math.min(.999,a*.9)):A1(uo[r],re[r],ho[r],ye[r],Ht[r],po[r],Xt[r],1.999)}const s=Math.floor(ct*G(.22+.74*Lo+.45*Ot,0,1)*(1-.85*Re)),l=1+.7*Ot;for(let r=0;r<s;r++)A1(ee[r],we[r],ne[r],Es[r]*l,Me[r],se[r],be[r],Rs[r]);n.bindBuffer(n.ARRAY_BUFFER,ks),n.bufferSubData(n.ARRAY_BUFFER,0,Dt.subarray(0,Ne*8)),n.enable(n.BLEND),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.useProgram(qs.p);const f=qs.u;n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,rn),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,O.noise),O.owner!==s0&&(n.uniform1i(f.tI,0),n.uniform1i(f.tN,1),n.uniform1f(f.uBR,y0),n.uniformMatrix4fv(f.uVP,!1,Bo),n.uniform3fv(f.uAmb,m0(F0(F0(i0.sky,i0.fog),i0.moon),2)),n.uniform3fv(f.uFogF,m0(i0.fog,4)),n.uniform3fv(f.uEye,W0),n.uniform3fv(f.uRt,N0),n.uniform4fv(f.uLP,Qe),n.uniform4fv(f.uLC,Je),n.uniform1i(f.uNL,Qo),O.owner=s0),n.uniform4f(f.uC,I,q0,o,i0.expo),n.uniform4f(f.uFoc,9,13,Wr,qr*.9),n.bindVertexArray(As),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,Ne),n.bindVertexArray(null),n.disable(n.BLEND)}let jr=!1;const _0={t:-(6+r0()*18),dur:6,s:.5,v:.5,dy:0,dir:-De},Kr=(o,t)=>{t=Math.min(t,.25);const e=m.input,s=e.taps();if(e.inside&&e.down){xn||(xn=!0,wn=0,Mn=0,u1=e.x,h1=e.y,Fe=s.length?s[s.length-1]:{x:e.x,y:e.y});const i=e.x-u1,h=e.y-h1,d=Math.hypot(i,h);if(Mn+=d,wn+=t,d>8e-4&&t>0){const M=Math.min(3.5,d/t)/(d/t);v1(e.x,1-e.y,i/t*M*1.6,-h/t*M*1.6,.085,.6),zo=Math.min(1,zo+d*6)}Mn<.03&&wn>.3&&(mn+=t),u1=e.x,h1=e.y,p1=0}else{if(xn)xn=!1,Mn<.03&&wn<.3&&Fe&&Is(Fe.x,Fe.y),Fe=null;else for(const i of s)Is(i.x,i.y);mn=0,p1+=t}if(jr=e.inside,Ot+=((mn>0?1:0)-Ot)*Math.min(1,t*(mn>0?.9:.35)),p1>12)if(_0.t<0)_0.t+=t,_0.t>=0&&(_0.dur=3.5+r0()*7,_0.s=.3+r0()*.55,_0.v=.32+r0()*.5,_0.dy=(r0()-.5)*.22,_0.dir=r0()<.8?-De:De);else{_0.t+=t;const i=_0.t/_0.dur;i>=1?_0.t=-(16+r0()*r0()*60):(v1(dt(_0.dir>0?-.1:1.1,_0.dir>0?1.1:-.1,i),_0.v+_0.dy*i,_0.dir*_0.s,.05+_0.dy,.12,.15*t*10),zo=Math.max(zo,_0.s*.45*Math.sin(i*Math.PI)))}const l=Math.exp(-t*1.1);io=0;for(let i=0;i<G0*G0;i++){Vt[i]*=l,Gt[i]*=l;const h=Math.abs(Vt[i])+Math.abs(Gt[i]);h>io&&(io=h)}zo*=Math.exp(-t*1.5),vn+=t;let f=0;for(;vn>=Y0&&f<6;)vn-=Y0,f++,zr();f>=6&&(vn=0);const r=Math.floor(ct*G(.22+.74*Lo+.45*Ot,0,1));Tr(o);const a=W0[0],c=W0[1],u=W0[2],v=Mo*(h0==="blizzard"?ke*1.05:.55+.45*ke),p=pe*(.5+.5*ke),g=Math.min(1,t*Vr),b=Math.min(1,t*5);for(let i=0;i<r;i++){const h=ee[i]-a,d=we[i]-c,M=ne[i]-u,R=h*lt[0]+d*lt[1]+M*lt[2];if(R<.3||R>Ss+3){o1(i,!1);continue}const k=.5+(h*N0[0]+M*N0[2])/(R*q0)*.5,S=.5+(h*pt[0]+d*pt[1]+M*pt[2])/(R*q0)*.5;if(we[i]<0||S<-.12){o1(i,!0);continue}if(k<-.15){const C=R*q0*2*1.28;ee[i]+=N0[0]*C,ne[i]+=N0[2]*C;continue}if(k>1.15){const C=R*q0*2*1.28;ee[i]-=N0[0]*C,ne[i]-=N0[2]*C;continue}S>1.25&&(se[i]=-un[i]);let F=v,L=-un[i],X=p;if(k>0&&k<1&&S>0&&S<1){const C=((S*K0|0)*K0+(k*K0|0)+(i&3)*53)%(K0*K0);F+=Ns[C],L+=e1[C],X+=e1[(C+67)%(K0*K0)]*.7}if(io>.05&&k>0&&k<1&&S>0&&S<1){const C=(S*G0|0)*G0+(k*G0|0),n0=Vt[C],J=Gt[C];if(n0!==0||J!==0){const L0=2*q0*Math.min(R,9);F+=(n0*N0[0]+J*pt[0])*L0,L+=J*pt[1]*L0,X+=(n0*N0[2]+J*pt[2])*L0}}const q=io>.3?b:g;Me[i]+=(F-Me[i])*q,se[i]+=(L-se[i])*q,be[i]+=(X-be[i])*q,ee[i]+=Me[i]*t,we[i]+=se[i]*t,ne[i]+=be[i]*t}for(let i=0;i<j0;i++)if(!(No[i]<=0))if(No[i]-=t,n1[i]===1){po[i]-=9.8*t*.8;const h=Math.exp(-t*.8);if(Ht[i]*=h,Xt[i]*=h,uo[i]+=Ht[i]*t,re[i]+=po[i]*t,ho[i]+=Xt[i]*t,re[i]<=.02){const d=qe(uo[i],ho[i]);d>=0&&s1[i]>0&&!(wt[d]&2)&&(_[d]+=s1[i]),D()<.5&&To(2,[uo[i],.05,ho[i]],[Ht[i]*.2,.25,Xt[i]*.2],.15+ye[i]*2,.8,0),No[i]=0,rt.on&&c1<=0&&ye[i]>.08&&(rt.hit("kick",.25,{pan:G((wo([uo[i],0,ho[i]])[0]-.5)*1.6,-1,1)}),rt.hit("noise",.18,{cutoff:450,dur:.6}),c1=.6)}}else Ht[i]+=(Mo*.3-Ht[i])*t*.8,po[i]+=(-.15-po[i])*t*.8,Xt[i]+=(pe*.3-Xt[i])*t*.8,uo[i]+=Ht[i]*t,re[i]+=po[i]*t,ho[i]+=Xt[i]*t;if(c1-=t,i1-=t,rt.on){if(b1-=t,b1<0){const h=D()<.3?3:1;for(let d=0;d<h;d++){const M=d*2.4,R=.09;for(const[k,S,F]of[[-12,.5,4],[0,1,3.5],[3,.55,3],[7,.4,2.5],[12,.6,2.2],[19,.2,1.4],[24,.15,1]])rt.note(Br+k,{dur:F,vel:R*S,wave:"sine",pan:-.2,at:M,attack:.004})}b1=28+D()*30}if(g1-=t,g1<0){const h=D()<.5?-.75:.75,d=2+Math.floor(D()*2);for(let M=0;M<d;M++){const R=M*(.22+D()*.1);rt.note(52+Math.floor(D()*3),{dur:.07,wave:"sawtooth",vel:.05,cutoff:650,pan:h,at:R}),rt.hit("noise",.05,{cutoff:700,dur:.06,pan:h,at:R})}g1=40+D()*50}const i=Math.round(Math.min(t,.2)*d1);i>0&&rt.pcm(Ir(i),d1,{vel:.55})}Vs(o)};return m.dbg&&(m.dbg.get=()=>{let o=0,t=0,e=0,s=0,l=0,f=0;for(const r of $0)for(const a of r.r.cells)o+=_[a],t++;for(let r=0;r<at.length;r++){const a=at[r];bo[a]===1?(e+=_[a],s++,l+=nt[a]):f++}return{roof:o/Math.max(1,t),street:e/Math.max(1,s),wet:l/Math.max(1,s),cells:Wt.length,verts:Oo,regions:yo.length,branches:vt.length,roofs:$0.length,wins:St.length,knock:m1.length,slides:$0.filter(r=>r.slide).length,shY:Go,NF:ct,park:$o,veh:co.map(r=>r.kind+":"+r.state+":"+(r.side<0?"L":"R")+r.z.toFixed(0)+(r.flip<0?"<":">")+(r.r||r.state==="left"?"":":NOREGION")),kn:m1.map(r=>[r.kind,((r.sa[0]+r.sb[0])/2).toFixed(2),(1-(r.sa[1]+r.sb[1])/2).toFixed(2),r.zz.toFixed(1)])}}),Vs(0),Kr}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
