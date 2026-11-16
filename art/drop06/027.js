// Snowy Street: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/027.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(B1){B1&&function(){"use strict";const I1=new WeakMap,Jt=new Map,rr=v=>{const n=Jt.get(v);return n&&(Jt.delete(v),Jt.set(v,n)),n},fr=(v,n)=>{for(Jt.delete(v),Jt.set(v,n);Jt.size>4;)Jt.delete(Jt.keys().next().value)},S0=Math.PI*2,O=(v,n,j)=>v<n?n:v>j?j:v,wt=(v,n,j)=>v+(n-v)*j,Tt=(v,n,j)=>{const D=O((j-v)/(n-v),0,1);return D*D*(3-2*D)},T0=(v,n)=>[v[0]+n[0],v[1]+n[1],v[2]+n[2]],to=(v,n)=>[v[0]-n[0],v[1]-n[1],v[2]-n[2]],d0=(v,n)=>[v[0]*n,v[1]*n,v[2]*n],Nt=(v,n)=>v[0]*n[0]+v[1]*n[1]+v[2]*n[2],oo=(v,n)=>[v[1]*n[2]-v[2]*n[1],v[2]*n[0]-v[0]*n[2],v[0]*n[1]-v[1]*n[0]],X0=v=>{const n=Math.hypot(v[0],v[1],v[2])||1;return[v[0]/n,v[1]/n,v[2]/n]},eo=(v,n,j)=>[v[0]+(n[0]-v[0])*j,v[1]+(n[1]-v[1])*j,v[2]+(n[2]-v[2])*j],lr=(v,n,j)=>Math.round(O(v,0,1)*255)*65536+Math.round(O(n,0,1)*255)*256+Math.round(O(j,0,1)*255),h0=128,Do=128,mt=128,pt=56,Vt=-13,Bo=13,bo=.5,W1=95,Bn=Math.log((W1+3)/(bo+3)),ar=v=>Math.log((Math.max(v,bo)+3)/(bo+3))/Bn,cr=v=>(bo+3)*Math.exp(v*Bn)-3,vt=v=>Number.isInteger(v)?v+".0":String(v),ve=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,Ce=`
float unpackD(vec4 e) { return dot(e, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0)); }
vec3 unpackC(float f) { float r = floor(f / 65536.0 + 0.00001); float g = floor((f - r * 65536.0) / 256.0 + 0.00001); return vec3(r, g, f - r * 65536.0 - g * 256.0) / 255.0; }
float h21(vec2 p) { p = fract(p * vec2(0.1031, 0.1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
float at2(float y, float x) { return x > 0.0 ? atan(y / x) : x < 0.0 ? atan(y / x) + (y >= 0.0 ? 3.14159265 : -3.14159265) : (y > 0.0 ? 1.57079633 : -1.57079633); }
`,V1=`
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
`,ir=`#version 300 es
layout(location = 0) in vec3 aP;
layout(location = 3) in vec4 aM;
uniform int uK; uniform mat4 uM; uniform vec3 uL, uA, uU, uV; uniform float uR;
out vec3 vD; flat out float vMat;
void main() {
  vMat = aM.x;
  if (uK == 0) { vec4 q = uM * vec4(aP, 1.0); gl_Position = q; vD = vec3(q.z * 0.5 + 0.5, 0.0, 0.0); }
  else { vec3 d = aP - uL; float za = dot(d, uA); float n = 0.05, f = uR;
    gl_Position = vec4(dot(d, uU), dot(d, uV), za * (f + n) / (f - n) - 2.0 * f * n / (f - n), za); vD = d; }
}`,ur=`#version 300 es
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
}`,q1=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform int uMode; uniform float uMir;
uniform sampler2D uNz;
uniform vec3 uEye, uFwd, uRt, uUp; uniform float uTan;
uniform vec3 uSkyZ, uSkyH, uCld, uMtn, uMoonD, uFogC;
uniform vec4 uSk;
uniform vec4 uMo;
${Ce}
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
}`,no=`#version 300 es
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
}`,hr=`#version 300 es
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
${Ce}
${V1}
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
  float ze = log((max(P.z, ${vt(bo)}) + 3.0) / ${vt(bo+3)}) / ${vt(Bn)};
  return vec2(clamp((P.x - (${vt(Vt)})) / ${vt(Bo-Vt)} * ${vt(mt)}, 0.5, ${vt(mt-.5)}), clamp(ze * ${vt(pt)}, 0.5, ${vt(pt-.5)})) / vec2(${vt(h0)}, ${vt(Do)});
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
    if (fl > 1.5) at = groundAt(vW); else if (fl > 0.5) at = vS.xy / vec2(${vt(h0)}, ${vt(Do)});
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
}`,O1=`#version 300 es
precision highp float;
precision highp int;
in vec2 vUv; out vec4 o;
uniform sampler2D uI, uNz;
uniform vec3 uEye, uFwd, uRt, uUp; uniform float uTan;
uniform int uNS;
${Ce}
${V1}
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
}`,mr=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform sampler2D uR; uniform float uSp;
void main() {
  vec2 uv = vUv;
  vec3 c = textureLod(uR, uv, 1.5).rgb * 0.3 + (textureLod(uR, uv + vec2(0.0, uSp), 2.0).rgb + textureLod(uR, uv - vec2(0.0, uSp), 2.0).rgb) * 0.2
    + (textureLod(uR, uv + vec2(0.0, uSp * 2.6), 3.0).rgb + textureLod(uR, uv - vec2(0.0, uSp * 2.6), 3.0).rgb) * 0.12 + (textureLod(uR, uv + vec2(0.0, uSp * 5.0), 3.5).rgb + textureLod(uR, uv - vec2(0.0, uSp * 5.0), 3.5).rgb) * 0.03;
  o = vec4(c, 1.0);
}`,G1=`#version 300 es
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
${Ce}
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
}`,pr=`#version 300 es
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
}`,H1=`#version 300 es
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
}`;function ot(v,n,j){const D=(N0,m0)=>{const n0=v.createShader(N0);return v.shaderSource(n0,m0),v.compileShader(n0),n0},e0=v.createProgram(),Y=D(v.VERTEX_SHADER,n),et=D(v.FRAGMENT_SHADER,j);return v.attachShader(e0,Y),v.attachShader(e0,et),v.linkProgram(e0),v.flush(),{p:e0,u:{},sh:[Y,et]}}const In=["shd","sky","scn0","scn1","scn2","scn3","vol","cmp","flk","blr"],X1=[[0],[1,2,3,4],[5,6,8,9,12,15,16,17],[7,10,11,13,14]],j1=[];X1.forEach((v,n)=>v.forEach(j=>{j1[j]=n}));const so=v=>hr.replace(`#version 300 es
`,`#version 300 es
`+X1[v].map(n=>"#define M"+n+`
`).join("")),ro=(v,n)=>{const j=(e0,Y,et)=>{if(e0.indexOf(Y)<0)throw new Error("027 NF "+v+" "+Y);return e0.split(Y).join(et)},D=`vec4 dHf(uvec4 u) { return vec4(unpackHalf2x16(u.x | (u.y << 16)), unpackHalf2x16(u.z | (u.w << 16))); }
`;return v==="out"?j(j(n,"out vec4 o;",`out uvec4 oU; vec4 o;
uvec4 eHf(vec4 v) { uint a = packHalf2x16(v.xy), b = packHalf2x16(v.zw); return uvec4(a & 65535u, a >> 16, b & 65535u, b >> 16); }`),`
void main() {`,`
void main0();
void main() { main0(); oU = eHf(o); }
void main0() {`):v==="vol"?j(j(j(n,"o = vec4(acc * dt * rl, 1.0);","o = vec4(acc * dt * rl, 1.0); o.rgb = o.rgb / (o.rgb + 4.0);"),"uniform sampler2D uI, uNz;",`uniform highp usampler2D uI; uniform sampler2D uNz;
`+D),"textureLod(uI, vUv, 0.0).b","dHf(texelFetch(uI, clamp(ivec2(vUv * vec2(textureSize(uI, 0))), ivec2(0), textureSize(uI, 0) - 1), 0)).b"):v==="flk"?j(j(n,"uniform sampler2D tI, tN;",`uniform highp usampler2D tI; uniform sampler2D tN;
`+D),"texelFetch(tI, clamp(ivec2(gl_FragCoord.xy * uBR), ivec2(0), bs - 1), 0).b","dHf(texelFetch(tI, clamp(ivec2(gl_FragCoord.xy * uBR), ivec2(0), bs - 1), 0)).b"):v==="cmp"?j(j(j(j(n,"uniform sampler2D tC, tS, tI, tR, tV, tA, tN;",`uniform sampler2D tC, tS, tR, tV, tA, tN; uniform highp usampler2D tI;
`+D),"texelFetch(tI, ip, 0)","dHf(texelFetch(tI, ip, 0))"),"texelFetch(tI, q, 0)","dHf(texelFetch(tI, q, 0))"),"texture(tV, uv).rgb","dV(texture(tV, uv).rgb)").replace(`uniform highp usampler2D tI;
`,`uniform highp usampler2D tI;
vec3 dV(vec3 x) { return x * 4.0 / max(1.0 - x, vec3(0.002)); }
`):n};function vr(v){let n=I1.get(v);if(n)return n;const j=!!(v.getExtension("EXT_color_buffer_float")||v.getExtension("EXT_color_buffer_half_float"));v.getExtension("OES_texture_float_linear"),n={shd:ot(v,ir,ur),sky:ot(v,ve,q1),scn0:ot(v,no,so(0)),scn1:ot(v,no,so(1)),scn2:ot(v,no,so(2)),scn3:ot(v,no,so(3)),vol:ot(v,ve,j?O1:ro("vol",O1)),blr:ot(v,ve,mr),cmp:ot(v,ve,j?G1:ro("cmp",G1)),flk:ot(v,pr,j?H1:ro("flk",H1)),vao0:v.createVertexArray(),ok:!1,owner:null},j||(Object.assign(n,{skyU:ot(v,ve,ro("out",q1)),scn0U:ot(v,no,ro("out",so(0))),scn1U:ot(v,no,ro("out",so(1))),scn2U:ot(v,no,ro("out",so(2))),scn3U:ot(v,no,ro("out",so(3)))}),n.progs=In.concat(["skyU","scn0U","scn1U","scn2U","scn3U"]));const D=128,e0=(m0,n0,u0,P)=>{m0=(m0%u0+u0)%u0,n0=(n0%u0+u0)%u0;let A0=m0*374761393+n0*668265263+P*2246822519|0;return A0=Math.imul(A0^A0>>>13,1274126177),A0^=A0>>>16,(A0>>>0)/4294967296},Y=(m0,n0,u0,P)=>{const A0=Math.floor(m0),nt=Math.floor(n0),L=m0-A0,_=n0-nt,G0=L*L*(3-2*L),Q=_*_*(3-2*_),z=e0(A0,nt,u0,P),bt=e0(A0+1,nt,u0,P),p0=e0(A0,nt+1,u0,P),lt=e0(A0+1,nt+1,u0,P);return z+(bt-z)*G0+(p0-z)*Q+(z-bt-p0+lt)*G0*Q},et=(m0,n0,u0,P,A0)=>{let nt=0,L=.5,_=u0,G0=0;for(let Q=0;Q<P;Q++)nt+=L*Y(m0*_/D,n0*_/D,_,A0+Q),G0+=L,L*=.5,_*=2;return nt/G0},N0=new Uint8Array(D*D*4);for(let m0=0;m0<D;m0++)for(let n0=0;n0<D;n0++){const u0=(m0*D+n0)*4;N0[u0]=et(n0,m0,4,4,11)*255,N0[u0+1]=et(n0,m0,8,3,23)*255,N0[u0+2]=(Y(n0*32/D,m0*32/D,32,41)*.55+Y(n0*64/D,m0*64/D,64,43)*.25+e0(n0,m0,128,47)*.2)*255,N0[u0+3]=et(n0,m0,16,2,77)*255}for(let m0=0;m0<4;m0++){let n0=255,u0=0;for(let P=m0;P<N0.length;P+=4)n0=Math.min(n0,N0[P]),u0=Math.max(u0,N0[P]);for(let P=m0;P<N0.length;P+=4)N0[P]=(N0[P]-n0)*255/Math.max(1,u0-n0)}return n.nd=N0,n.noise=v.createTexture(),v.bindTexture(v.TEXTURE_2D,n.noise),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,!1),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),v.pixelStorei(v.UNPACK_ALIGNMENT,1),v.texImage2D(v.TEXTURE_2D,0,v.RGBA8,D,D,0,v.RGBA,v.UNSIGNED_BYTE,N0),v.generateMipmap(v.TEXTURE_2D),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_MIN_FILTER,v.LINEAR_MIPMAP_LINEAR),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_MAG_FILTER,v.LINEAR),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_WRAP_S,v.REPEAT),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_WRAP_T,v.REPEAT),n.half=j,I1.set(v,n),n}function dr(v,n){if(n.ok)return;const j=[];for(const D of n.progs||In){const e0=n[D];v.getProgramParameter(e0.p,v.LINK_STATUS)||j.push("027 link "+D+": "+v.getProgramInfoLog(e0.p)+" "+v.getShaderInfoLog(e0.sh[0])+" "+v.getShaderInfoLog(e0.sh[1]))}if(j.length)throw new Error(j.join(" || "));for(const D of n.progs||In){const e0=n[D],Y=v.getProgramParameter(e0.p,v.ACTIVE_UNIFORMS);for(let et=0;et<Y;et++){const N0=v.getActiveUniform(e0.p,et);e0.u[N0.name.replace(/\[0\]$/,"")]=v.getUniformLocation(e0.p,N0.name)}}n.ok=!0}B1.add({num:27,name:"Snowy Street",fam:"Worlds",recipe:"A small town street at night during the first snow of the year, and the snow builds up on roofs, rails, branches, bikes and parked cars. The road goes from wet to slushy to white. The town and how deep it's got change every mint. Drag to blow the snow around, hold to make it snow harder, or tap a branch, gutter, rail or the lamp to knock its snow off.",interactive:"Drag to blow the snow along your stroke: flakes swirl, drifts pile against the fence, roofs and rails are stripped. Hold to make it snow harder. Tap a branch, a gutter, a rail or the lamp to knock its snow down.",music:!0,gl:!0,fps:30,seed:0,make(v){const n=v.gl,j=v.size,D=vr(n),e0=D.half,Y=Math.min(j,1024),et=Y/j,N0={},m0=v.hash+(v.home?"|h":""),n0=rr(m0),u0=!!(n0&&n0.ex),P=[];for(let o=0;o<8;o++)P.push(parseInt(v.hash.slice(2+o*8,10+o*8),16)>>>0);const A0=(o,t,e,s)=>{const l=new Int32Array([o,t,e,s]),f=()=>{let r=l[0],a=l[1],c=l[2],u=l[3],p=r+a|0;return r=a^a>>>9,a=c+(c<<3)|0,c=c<<21|c>>>11,u=u+1|0,p=p+u|0,c=c+p|0,l[0]=r,l[1]=a,l[2]=c,l[3]=u,(p>>>0)/4294967296};for(let r=0;r<12;r++)f();return f},nt=A0(P[0],P[1],P[2],P[3]),L=A0(P[4],P[5],P[6],P[7]),_=A0(P[1]^P[6],P[3]^P[4],P[5]^1540483477,P[0]^2654435769),G0=(o,t)=>{let e=0;for(const l of t)e+=l[1];let s=o()*e;for(const l of t)if(s-=l[1],s<0)return l[0];return t[t.length-1][0]},Q=(o,t)=>o+(t-o)*L();let z=G0(nt,[["village",27],["mill",25],["harbour",23],["town",25]]),bt=G0(nt,[["sodium",38],["white",30],["moon",18],["dusk",14]]),p0=G0(nt,[["powder",40],["wet",35],["blizzard",25]]),lt=nt()<.2,de=G0(nt,[["shop",40],["snowman",35],["fox",25]]),qt=G0(nt,[["none",86],["aurora",7],["plough",7]]);qt==="aurora"&&p0==="blizzard"&&(p0="powder"),v.home&&(z="town",bt="sodium",p0="wet",lt=!1,de="shop",qt="none");const xr=A0(P[2]^668265261,P[7]^374761393,P[5]^P[0],P[3]^2246822507);let at=v.home?"street":G0(xr,[["street",58],["across",42]]);const fo=A0(P[6]^3207904532,P[0]^2644812840,P[4]^P[2],P[1]^23811768),Mr=fo(),wr=fo(),br=fo(),gr=fo(),K1=!v.home&&Mr<.5;!v.home&&wr<(at==="across"?1/3:1/6)&&(at="walk");const lo=!v.home&&!lt&&qt!=="plough"&&br<.3,Io=!v.home&&at!=="across"&&gr<.22;lo&&p0==="blizzard"&&(p0="powder"),v.trait("Town",{village:"Wooden mountain village",mill:"Brick mill town",harbour:"Harbour lane",town:"Narrow old townhouses"}[z]),v.trait("Light",{sodium:"Sodium orange lamps",white:"Cool white lamps",moon:"Full moon breaking through",dusk:"Blue-hour dusk"}[bt]),v.trait("Snowfall",{powder:"Fine powder",wet:"Big wet flakes",blizzard:"Wind-driven blizzard"}[p0]),v.trait("Moment",lt?"Rare deep snow":lo?"An hour in":"First dusting"),v.trait("Detail",{shop:"Lit shop window",snowman:"A snowman someone left",fox:"Fox tracks across the street"}[de]),v.trait("Rare",{none:"None",aurora:"Aurora",plough:"Road just ploughed"}[qt]);const f0=A0(P[3]^625341585,P[6]^1664525,P[1]^P[7],P[4]^1013904242);v.trait("Viewpoint",{street:"Looking down the street",across:"Turned to the houses across",walk:"On the pavement by the lamp"}[at]),v.trait("Next door",Io?"An empty lot":"A house behind the fence");const x0={};{const o=e0?n.RGBA16F:n.SRGB8_ALPHA8,t=Math.max(128,Y>>1);x0.sky=_t(512,512,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),x0.moon=bt==="moon"?_t(2048,2048,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1):null,x0.lamp=_t(1536,1024,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),x0.C=_t(Y,Y,o,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,Math.floor(Math.log2(Y))+1),x0.S=_t(Y,Y,o,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1),x0.I=_t(Y,Y,e0?o:n.RGBA16UI,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.NEAREST,1),x0.R=_t(t,t,o,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,Math.floor(Math.log2(t))+1),x0.R2=_t(t,t,o,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1),x0.V=_t(t,t,o,n.RGBA,e0?n.HALF_FLOAT:n.UNSIGNED_BYTE,n.LINEAR,1);const e=n.createFramebuffer(),s=new Uint32Array(4);n.bindFramebuffer(n.FRAMEBUFFER,e),n.disable(n.SCISSOR_TEST),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0);for(const[l,f,r,a,c]of[[x0.C,Y,Y,Math.floor(Math.log2(Y))+1],[x0.S,Y,Y,1],[x0.I,Y,Y,1,!e0],[x0.R,t,t,Math.floor(Math.log2(t))+1],[x0.R2,t,t,1],[x0.V,t,t,1],[x0.lamp,1536,1024,1],[x0.sky,512,512,1],[x0.moon,2048,2048,1]])if(l)for(let u=0;u<a;u++)n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,l,u),n.viewport(0,0,Math.max(1,f>>u),Math.max(1,r>>u)),c?n.clearBufferuiv(n.COLOR,0,s):n.clear(n.COLOR_BUFFER_BIT);n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteFramebuffer(e),n.flush()}const q={village:3,mill:3.7,harbour:2.7,town:3.3}[z],L0={village:0,mill:2,harbour:1.3,town:1.9}[z],Wn={village:0,mill:.14,harbour:.1,town:.13}[z],Y1={village:2,mill:0,harbour:1,town:L()<.6?1:0}[z],gt=z==="harbour"?50:1e4,I0=q+L0+.25,W0=at==="walk"?[z==="village"?q-1.5:z==="harbour"?q-.3:I0-1,1.62,z==="mill"?0:4]:[(z==="harbour"?.9:1.2)+(at==="across"?.5:0),3.25,0],De=at==="walk"?.5*Math.atan((q+.4-W0[0])/(12.2-W0[2])):at==="across"?-.38:-.03,Vn=at==="walk"?z==="mill"?.08:z==="village"?.05:.03:at==="across"?-.06:-.11,V0=Math.tan(27*Math.PI/180),ct=[Math.sin(De)*Math.cos(Vn),Math.sin(Vn),Math.cos(De)*Math.cos(Vn)],P0=[Math.cos(De),0,-Math.sin(De)],dt=oo(ct,P0),Z1=K1?-1:1,$1=Io?Math.min(I0+9,12.6):0;K1&&(P0[0]=-P0[0],P0[2]=-P0[2]);const go=o=>{const t=to(o,W0),e=Nt(t,ct);return[.5+Nt(t,P0)/(e*V0)*.5,.5+Nt(t,dt)/(e*V0)*.5,e]},Be=.1,Ie=800,Q1=(Ie+Be)/(Ie-Be),yr=-2*Ie*Be/(Ie-Be),Wo=new Float32Array(16);{const o=[[...d0(P0,1/V0),-Nt(P0,W0)/V0],[...d0(dt,1/V0),-Nt(dt,W0)/V0],[...d0(ct,Q1),-Nt(ct,W0)*Q1+yr],[...ct,-Nt(ct,W0)]];for(let t=0;t<4;t++)for(let e=0;e<4;e++)Wo[e*4+t]=o[t][e]}const We=L()<.5?1:-1,qn={powder:.5,wet:.25,blizzard:4.5}[p0],J1={powder:.75,wet:1.3,blizzard:.9}[p0],yo=We*qn*.95,xe=qn*(L()*.6-.3),ts=Math.hypot(yo,xe)||1,Vo=yo/ts,qo=xe/ts,R0=h0*Do,C=new Float32Array(R0),st=new Float32Array(R0),Ot=new Float32Array(R0),Lt=new Float32Array(R0),ao=new Float32Array(R0),Z0=new Uint8Array(R0),Ao=new Uint8Array(R0),yt=new Uint8Array(R0),b0=new Float32Array(R0),Gt=new Float32Array(R0),k0=new Float32Array(R0),Ve=new Float32Array(R0),qe=new Float32Array(R0),On=new Float32Array(R0),Oe=new Int16Array(R0).fill(-1),ko=1,Me=2,At=3,Oo=4,Ge=5,co=6,Eo=[];let Go=0,Ho=pt,Xo=0;function M0(o,t,e,s,l){if(Go+o>h0&&(Go=0,Ho+=Xo,Xo=0),Ho+t>Do)return null;const f=Object.assign({x:Go,y:Ho,w:o,h:t,kind:e,cells:[],id:Eo.length},l||{});Go+=o,Xo=Math.max(Xo,t);for(let r=0;r<t;r++)for(let a=0;a<o;a++){const c=(f.y+r)*h0+f.x+a,u=s(o>1?a/(o-1):.5,t>1?r/(t-1):.5);b0[c]=u[0],Gt[c]=u[1],k0[c]=u[2],Z0[c]=e,Oe[c]=f.id,ao[c]=f.cap||1,f.cells.push(c)}return Eo.push(f),f}const Ct=(o,t,e,s)=>(l,f)=>eo(eo(o,t,l),eo(s,e,l),f),Z=(o,t,e)=>[o.x+.5+t*(o.w-1),o.y+.5+e*(o.h-1)],He=o=>[Z(o,0,0),Z(o,1,0),Z(o,1,1),Z(o,0,1)];for(let o=0;o<pt;o++){const t=cr((o+.5)/pt);for(let e=0;e<mt;e++){const s=Vt+(e+.5)/mt*(Bo-Vt),l=o*h0+e,f=Math.abs(s);b0[l]=s,Gt[l]=0,k0[l]=t,Z0[l]=ko,ao[l]=2,Ao[l]=t>gt?4:f<q?1:f<q+L0?2:3}}const Xe=(o,t)=>o<Vt||o>Bo||t<bo||t>W1?-1:O(Math.floor(ar(t)*pt),0,pt-1)*h0+O(Math.floor((o-Vt)/(Bo-Vt)*mt),0,mt-1),jo=[],Gn=u0?new Float32Array(n0.peak.reduce((o,t)=>o+t,0)*16):null,je=u0?n0.peak.map((o,t)=>o?Gn.subarray(n0.peak.slice(0,t).reduce((e,s)=>e+s,0)*16,n0.peak.slice(0,t+1).reduce((e,s)=>e+s,0)*16):new Float32Array(16)):[new Float32Array(1<<18),new Float32Array(1<<20),new Float32Array(1<<20),new Float32Array(1<<18)],Pt=[0,0,0,0],we=[0,0,0,0];let Ko=0;const F0=[0,0,0,0];function g0(o,t,e,s,l){const f=j1[s[0]]||0;let r=je[f];if((Pt[f]+1)*16>r.length){const c=new Float32Array(r.length*2);c.set(r),r=je[f]=c}const a=Pt[f]*16;Pt[f]++,r[a]=o[0],r[a+1]=o[1],r[a+2]=o[2],r[a+3]=t[0],r[a+4]=t[1],r[a+5]=t[2],r[a+6]=e[0],r[a+7]=e[1],r[a+8]=s[0],r[a+9]=s[1],r[a+10]=s[2],r[a+11]=s[3],r[a+12]=l[0],r[a+13]=l[1],r[a+14]=l[2],r[a+15]=l[3],Ko++}function i0(o,t,e,s,l){const f=t||X0(oo(to(o[1],o[0]),to(o[3],o[0]))),r=s||[[0,0],[1,0],[1,1],[0,1]],a=l||[F0,F0,F0,F0];g0(o[0],f,r[0],e,a[0]),g0(o[1],f,r[1],e,a[1]),g0(o[2],f,r[2],e,a[2]),g0(o[0],f,r[0],e,a[0]),g0(o[2],f,r[2],e,a[2]),g0(o[3],f,r[3],e,a[3])}function Yo(o,t,e,s,l){g0(o[0],t[0],s[0],e,l[0]),g0(o[1],t[1],s[1],e,l[1]),g0(o[2],t[2],s[2],e,l[2]),g0(o[0],t[0],s[0],e,l[0]),g0(o[2],t[2],s[2],e,l[2]),g0(o[3],t[3],s[3],e,l[3])}function Ro(o,t,e,s,l){const f=t||X0(oo(to(o[1],o[0]),to(o[2],o[0]))),r=l||[F0,F0,F0];g0(o[0],f,s[0],e,r[0]),g0(o[1],f,s[1],e,r[1]),g0(o[2],f,s[2],e,r[2])}const q0={f:(o,t,e)=>[o,t,e],n:(o,t,e)=>[o,t,e]},Hn=(o,t)=>({f:(e,s,l)=>[o*(t+l),s,e],n:(e,s,l)=>[o*l,s,e]}),Ar=o=>({f:(t,e,s)=>[t,e,o+s],n:(t,e,s)=>[t,e,s]}),kr=(o,t)=>{const e=Math.cos(t),s=Math.sin(t);return{f:(l,f,r)=>[o[0]+l*e+r*s,o[1]+f,o[2]-l*s+r*e],n:(l,f,r)=>[l*e+r*s,f,-l*s+r*e]}};function G(o,t,e,s,l,f,r,a,c,u){const p=(h,d,w)=>o.f(h,d,w),m=c?c==="g"?2:1:0,g=(h,d)=>c&&c!=="g"?Z(c.r,wt(c.u0,c.u1,(h-t)/(e-t||1)),wt(c.v0,c.v1,(d-f)/(r-f||1))):[0,0],b=(h,d)=>{const w=g(h,d);return[w[0],w[1],m,l]},i=u&&u.ty!==void 0?u.ty:0;i0([p(t,l,f),p(e,l,f),p(e,l,r),p(t,l,r)],o.n(0,1,0),a,[[t,f],[e,f],[e,r],[t,r]],[b(t,f),b(e,f),b(e,r),b(t,r)]),i0([p(t,s,f),p(e,s,f),p(e,l,f),p(t,l,f)],o.n(0,0,-1),a,[[t,s+i],[e,s+i],[e,l+i],[t,l+i]],[b(t,f),b(e,f),b(e,f),b(t,f)]),i0([p(t,s,f),p(t,s,r),p(t,l,r),p(t,l,f)],o.n(-1,0,0),a,[[f,s+i],[r,s+i],[r,l+i],[f,l+i]],[b(t,f),b(t,r),b(t,r),b(t,f)]),u&&u.noBack||(i0([p(t,s,r),p(e,s,r),p(e,l,r),p(t,l,r)],o.n(0,0,1),a,[[t,s+i],[e,s+i],[e,l+i],[t,l+i]],[b(t,r),b(e,r),b(e,r),b(t,r)]),i0([p(e,s,f),p(e,s,r),p(e,l,r),p(e,l,f)],o.n(1,0,0),a,[[f,s+i],[r,s+i],[r,l+i],[f,l+i]],[b(e,f),b(e,r),b(e,r),b(e,f)])),u&&u.bottom&&i0([p(t,s,f),p(e,s,f),p(e,s,r),p(t,s,r)],o.n(0,-1,0),a,null,null)}function W(o,t,e,s,l,f,r,a,c){const u=X0(to(t,o)),p=Math.hypot(t[0]-o[0],t[1]-o[1],t[2]-o[2]),m=Math.abs(u[1])>.95?[1,0,0]:[0,1,0],g=X0(oo(u,m)),b=oo(g,u),i=(e-s)/Math.max(p,1e-4),h=r&&(c||i>.3||Math.abs(u[1])<.55)?1:0,d=(w,R,A)=>{const S=w/l*S0,F=Math.cos(S),N=Math.sin(S),H=T0(d0(g,F),d0(b,N));return{p:T0(A,d0(H,R)),n:X0(T0(H,d0(u,i))),top:A[1]+R}};for(let w=0;w<l;w++){const R=d(w,e,o),A=d(w+1,e,o),S=d(w+1,s,t),F=d(w,s,t),N=w/l*S0*Math.max(e,.01),H=(w+1)/l*S0*Math.max(e,.01),V=r?[r[0],r[1],h,R.top]:F0,B=r?[r[0],r[1],h,A.top]:F0,r0=a?[a[0],a[1],h,S.top]:F0,t0=a?[a[0],a[1],h,F.top]:F0;if(g0(R.p,R.n,[N,0],f,V),g0(A.p,A.n,[H,0],f,B),g0(S.p,S.n,[H,p],f,r0),g0(R.p,R.n,[N,0],f,V),g0(S.p,S.n,[H,p],f,r0),g0(F.p,F.n,[N,p],f,t0),c&&s>0){const U0=a?[a[0],a[1],h,t[1]]:F0;g0(t,u,[0,0],f,U0),g0(F.p,u,[0,0],f,U0),g0(S.p,u,[0,0],f,U0)}}}function io(o,t,e,s,l,f,r){const a=r?1:0;for(let c=0;c<l;c++)for(let u=0;u<l*2;u++){const p=[],m=[];for(const[b,i]of[[0,0],[1,0],[1,1],[0,1]]){const h=(c+i)/l*Math.PI,d=(u+b)/(l*2)*S0,w=[Math.sin(h)*Math.cos(d),Math.cos(h),Math.sin(h)*Math.sin(d)];m.push(X0([w[0]/t,w[1]/e,w[2]/s])),p.push([o[0]+w[0]*t,o[1]+w[1]*e,o[2]+w[2]*s])}const g=r?[r[0],r[1],a,o[1]+e]:F0;for(const b of[0,1,2,0,2,3])g0(p[b],m[b],[u/l,c/l],f,g)}}const kt=[],Ut=[],E0=[],$0=[],xt=[],E=(o,t,e)=>lr(o,t,e),Ke={village:[[.2,.12,.07],[.33,.21,.12],[.24,.22,.2],[.27,.16,.09]],mill:[[.36,.13,.08],[.28,.14,.09],[.21,.1,.07],[.5,.45,.36],[.33,.16,.1]],harbour:[[.42,.08,.06],[.6,.42,.14],[.16,.26,.38],[.74,.73,.69],[.21,.33,.26],[.36,.4,.45]],town:[[.66,.6,.48],[.62,.48,.3],[.5,.5,.48],[.5,.56,.6],[.62,.48,.44],[.7,.69,.64]]}[z],Ye={village:[[.3,.07,.05],[.1,.18,.11],[.16,.16,.17],[.22,.17,.13]],mill:[[.1,.1,.11],[.14,.12,.1]],harbour:[[.12,.12,.13],[.32,.08,.05],[.15,.16,.18]],town:[[.13,.14,.16],[.17,.18,.2],[.36,.17,.1]]}[z],z0=o=>o[Math.floor(L()*o.length)],Er={village:.55,mill:.42,harbour:.6,town:.5}[z];function Ze(o,t){const{a0:e,a1:s,d:l,h:f}=t,r=s-e,a=[t.wall[0],t.wall[1],t.wall[2],t.wall[3]||0],c=[6,t.trim,0,0],u=t.recess?.16:0,p=o.n(0,0,-1),m=(i,h,d,w,R,A,S,F)=>i0([o.f(...i),o.f(...h),o.f(...d),o.f(...w)],R?o.n(...R):null,A,S,F),g=M0(Math.max(1,t.cols),Math.max(1,t.floors),At,(i,h)=>o.f(e+r*(Math.round(i*(t.cols-1))+.5)/t.cols,t.sill+Math.round(h*(t.floors-1))*t.fh,-.03),{cap:.07});for(let i=0;i<t.floors;i++){const h=i*t.fh,d=i===t.floors-1?f:(i+1)*t.fh,w=[];if(i===0&&t.shop){const A=t.door>=0?t.door:-1,S=A>=0?e+r*(A+.5)/t.cols:-99;A>=0&&w.push({cL:S-.55,cR:S+.55,y0:0,y1:2.2,kind:"door"});const F=A===0?S+.85:e+.5,N=A===t.cols-1?S-.85:s-.5;A>0&&A<t.cols-1?(w.push({cL:e+.5,cR:S-.85,y0:.5,y1:2.6,kind:"shop"}),w.push({cL:S+.85,cR:s-.5,y0:.5,y1:2.6,kind:"shop"})):w.push({cL:F,cR:N,y0:.5,y1:2.6,kind:"shop"})}else for(let A=0;A<t.cols;A++){const S=e+r*(A+.5)/t.cols;i===0&&A===t.door?w.push({cL:S-.55,cR:S+.55,y0:0,y1:2.2,kind:"door"}):t.blind&&t.blind(i,A)||w.push({cL:S-t.ww/2,cR:S+t.ww/2,y0:h+t.sill,y1:h+t.sill+t.wh,kind:"win",k:A,f:i})}w.sort((A,S)=>A.cL-S.cL);let R=e;for(const A of w){A.cL>R+.001&&m([R,h,0],[A.cL,h,0],[A.cL,d,0],[R,d,0],[0,0,-1],a,[[R,h],[A.cL,h],[A.cL,d],[R,d]]),A.y0>h+.001&&m([A.cL,h,0],[A.cR,h,0],[A.cR,A.y0,0],[A.cL,A.y0,0],[0,0,-1],a,[[A.cL,h],[A.cR,h],[A.cR,A.y0],[A.cL,A.y0]]),A.y1<d-.001&&m([A.cL,A.y1,0],[A.cR,A.y1,0],[A.cR,d,0],[A.cL,d,0],[0,0,-1],a,[[A.cL,A.y1],[A.cR,A.y1],[A.cR,d],[A.cL,d]]),R=A.cR;const S=A.kind==="door"?.2:A.kind==="shop"?.28:Math.max(u,.02),{cL:F,cR:N,y0:H,y1:V}=A,B=A.kind==="win"&&g?Z(g,t.cols>1?A.k/(t.cols-1):0,t.floors>1?A.f/(t.floors-1):0):null,r0=B?[B[0],B[1],1,H]:F0;m([F,H,0],[F,H,S],[F,V,S],[F,V,0],[1,0,0],a,[[F,H],[F+S,H],[F+S,V],[F,V]]),m([N,H,0],[N,H,S],[N,V,S],[N,V,0],[-1,0,0],a,[[N,H],[N+S,H],[N+S,V],[N,V]]),m([F,V,0],[N,V,0],[N,V,S],[F,V,S],[0,-1,0],a,[[F,V],[N,V],[N,V+S],[F,V+S]]),A.kind!=="door"&&m([F,H,0],[N,H,0],[N,H,S],[F,H,S],[0,1,0],c,[[F,0],[N,0],[N,S],[F,S]],[r0,r0,r0,r0]);const t0=[[F,H,S],[N,H,S],[N,V,S],[F,V,S]],U0=o.f((F+N)/2,(H+V)/2,0);if(A.kind==="door"){if(m(...t0,[0,0,-1],[13,t.doorC,0,0]),G(o,F-.25,N+.25,0,t.stoop?.18:.12,-.45,0,[4,E(.3,.29,.27),0,0],"g"),t.stoop&&(G(o,F-.2,N+.2,0,.36,-.75,-.45,[4,E(.3,.29,.27),0,0],"g"),G(o,F-.15,N+.15,0,.54,-.45,0,[4,E(.3,.29,.27),0,0],"g")),t.canopy){const _0=M0(3,2,At,Ct(o.f(F-.3,2.62,-.75),o.f(N+.3,2.62,-.75),o.f(N+.3,2.62,0),o.f(F-.3,2.62,0)),{cap:.12});G(o,F-.3,N+.3,2.5,2.62,-.75,0,c,_0?{r:_0,u0:0,u1:1,v0:0,v1:1}:null),_0&&E0.push({kind:"ledge",r:_0,p:[o.f(F-.3,2.56,-.75),o.f(N+.3,2.56,-.75)]})}if(L()<.7){const _0=.5+L()*.4,$=[(F+N)/2,2.35];m([F+.1,2.22,S-.01],[N-.1,2.22,S-.01],[N-.1,2.45,S-.01],[F+.1,2.45,S-.01],[0,0,-1],[7,t.trim,_0,L()],[[0,0],[1,0],[1,1],[0,1]])}}else{const _0=A.kind==="shop",$=_0?1:L()<(i===0?t.lit+.1:t.lit)?.55+L()*.75:0;if(m(...t0,[0,0,-1],_0?[14,t.trim,1,0]:[7,t.trim,$,L()],[[0,0],[1,0],[1,1],[0,1]]),$>0){const K=(N-F)*(V-H);Ut.push({p:T0(U0,d0(p,.45)),n:p,I:$*K*(_0?2.2:.55),soft:.35+K*.25,shop:_0})}if(!_0)G(o,F-.07,N+.07,H-.07,H,-.07,.01,c,g?{r:g,u0:g.w>1?A.k/(g.w-1):0,u1:g.w>1?A.k/(g.w-1):0,v0:g.h>1?A.f/(g.h-1):0,v1:g.h>1?A.f/(g.h-1):0}:null,{noBack:!0}),t.lintel&&G(o,F-.08,N+.08,V,V+.16,-.025,0,[4,E(.42,.4,.36),0,0],null,{noBack:!0}),t.shutters&&(G(o,F-(N-F)*.5-.03,F-.03,H,V,-.05,-.01,[6,t.shutters,0,0],null),G(o,N+.03,N+(N-F)*.5+.03,H,V,-.05,-.01,[6,t.shutters,0,0],null));else if(G(o,F-.05,N+.05,.38,.5,-.06,.02,c,null,{noBack:!0}),t.awning){const K=M0(8,2,At,Ct(o.f(F-.2,2.55,-1.2),o.f(N+.2,2.55,-1.2),o.f(N+.2,3.05,0),o.f(F-.2,3.05,0)),{cap:.15}),I=K?He(K).map(a0=>[a0[0],a0[1],1,0]):null;I&&(I[0][3]=I[1][3]=2.55,I[2][3]=I[3][3]=3.05),m([F-.2,2.55,-1.2],[N+.2,2.55,-1.2],[N+.2,3.05,0],[F-.2,3.05,0],[0,.92,-.39],[16,t.awning,0,0],[[0,0],[1,0],[1,1],[0,1]],I);const w0=K?[[...Z(K,0,0),1,2.55],[...Z(K,1,0),1,2.55],[...Z(K,1,0),1,2.55],[...Z(K,0,0),1,2.55]]:null;m([F-.2,2.3,-1.2],[N+.2,2.3,-1.2],[N+.2,2.55,-1.2],[F-.2,2.55,-1.2],[0,0,-1],[16,t.awning,0,0],null,w0),K&&E0.push({kind:"ledge",r:K,p:[o.f(F-.2,2.5,-1.2),o.f(N+.2,2.5,-1.2)]})}}}R<s-.001&&m([R,h,0],[s,h,0],[s,d,0],[R,d,0],[0,0,-1],a,[[R,h],[s,h],[s,d],[R,d]])}if(m([e,0,0],[e,0,l],[e,f,l],[e,f,0],[-1,0,0],a,[[0,0],[l,0],[l,f],[0,f]]),t.sideWin)for(let i=0;i<t.floors;i++)for(let h=0;h<2;h++){const d=l*(h+1)/3,w=i*t.fh+t.sill,R=L()<t.lit*.7?.5+L()*.6:0;m([e-.02,w,d-.4],[e-.02,w,d+.4],[e-.02,w+t.wh*.85,d+.4],[e-.02,w+t.wh*.85,d-.4],[-1,0,0],[7,t.trim,R,L()],[[0,0],[1,0],[1,1],[0,1]])}jo.push([o.f(e,0,0),o.f(s,0,l)]);const b=Math.tan(t.pitch);if(t.roof==="sg"){const i=t.ov,h=Math.min(i,.35),d=f-i*b,w=f+l/2*b,R=(l/2+i)/Math.cos(t.pitch),A=[e-h,d,-i],S=[s+h,d,-i],F=[s+h,w,l/2],N=[e-h,w,l/2],H=[0,Math.cos(t.pitch),-Math.sin(t.pitch)],V=O(Math.round(r/.7),4,14),B=O(Math.round(R/.7),3,8),r0=M0(V,B,Me,Ct(o.f(...A),o.f(...S),o.f(...F),o.f(...N)),{cap:.8}),t0=r0?He(r0).map(($,K)=>[$[0],$[1],1,K<2?d:w]):null;m(A,S,F,N,H,[5,t.roofM[1],t.roofM[2],0],[[e-h,0],[s+h,0],[s+h,R],[e-h,R]],t0),m([e-h,d,l+i],[s+h,d,l+i],F,N,[0,Math.cos(t.pitch),Math.sin(t.pitch)],[5,t.roofM[1],t.roofM[2],0],[[e-h,0],[s+h,0],[s+h,R],[e-h,R]]);const U0=r0?[[...Z(r0,0,0),1,d],[...Z(r0,1,0),1,d],[...Z(r0,1,0),1,d],[...Z(r0,0,0),1,d]]:null;m([e-h,d-.2,-i],[s+h,d-.2,-i],[s+h,d,-i],[e-h,d,-i],[0,0,-1],c,[[e,d-.2],[s,d-.2],[s,d],[e,d]],U0),m([e-h,d-.2,-i],[s+h,d-.2,-i],[s+h,f-.1,0],[e-h,f-.1,0],[0,-1,0],[6,E(.08,.07,.06),0,0]);const _0=r0?[[...Z(r0,0,0),1,d],[...Z(r0,0,1),1,w],[...Z(r0,0,1),1,w],[...Z(r0,0,0),1,d]]:null;if(m([e-h,d-.2,-i],[e-h,w-.2,l/2],[e-h,w,l/2],[e-h,d,-i],[-1,0,0],c,[[0,0],[1,0],[1,1],[0,1]],_0),Ro([o.f(e,f,0),o.f(e,f,l),o.f(e,w,l/2)],o.n(-1,0,0),a,[[0,f],[l,f],[l/2,w]]),r0&&($0.push({r:r0,out:o.n(0,0,-1),pitch:t.pitch,metal:t.roofM[2]===1,eave:[o.f(e-h,d,-i),o.f(s+h,d,-i)]}),E0.push({kind:"roof",roof:$0[$0.length-1],p:[o.f(e-h,d-.1,-i),o.f(s+h,d-.1,-i)]})),t.chimney){const $=e+r*(.2+.6*L()),K=l*.35,I=M0(1,1,At,()=>o.f($,w+.8,K),{cap:.15});G(o,$-.3,$+.3,f,w+.8,K-.3,K+.3,[2,E(.3,.14,.1),0,0],I?{r:I,u0:0,u1:0,v0:0,v1:0}:null)}if(t.dormers){const $=Math.max(1,Math.floor(r/3));for(let K=0;K<$;K++){const I=e+r*(K+.5)/$,w0=.75,a0=.9,Rt=d+(a0+i)*b,Q0=Rt+1.2,D0=Q0+.45;G(o,I-w0,I+w0,Rt-.4,Q0,a0,a0+1.6,a,null,{noBack:!0});const Ft=L()<t.lit?.6+L()*.5:0;m([I-.4,Rt+.05,a0-.02],[I+.4,Rt+.05,a0-.02],[I+.4,Q0-.15,a0-.02],[I-.4,Q0-.15,a0-.02],[0,0,-1],[7,t.trim,Ft,L()]);const ze=M0(2,3,Me,Ct(o.f(I-w0-.1,Q0,a0-.15),o.f(I,D0,a0-.15),o.f(I,D0,a0+1.6),o.f(I-w0-.1,Q0,a0+1.6)),{cap:.3}),Nn=ze?He(ze).map((Ln,Pn)=>[Ln[0],Ln[1],1,Pn===0||Pn===3?Q0:D0]):null;m([I-w0-.1,Q0,a0-.15],[I,D0,a0-.15],[I,D0,a0+1.6],[I-w0-.1,Q0,a0+1.6],null,[5,t.roofM[1],t.roofM[2],0],[[0,0],[1,0],[1,1],[0,1]],Nn),m([I+w0+.1,Q0,a0-.15],[I,D0,a0-.15],[I,D0,a0+1.6],[I+w0+.1,Q0,a0+1.6],null,[5,t.roofM[1],t.roofM[2],0],[[0,0],[1,0],[1,1],[0,1]],Nn),Ro([o.f(I-w0,Q0,a0),o.f(I+w0,Q0,a0),o.f(I,D0-.05,a0)],o.n(0,0,-1),a,[[0,0],[1,0],[.5,1]])}}}else if(t.roof==="gf"){const i=t.ov,h=i,d=(e+s)/2,w=f-h*b,R=f+r/2*b,A=(r/2+h)/Math.cos(t.pitch),S=[-Math.sin(t.pitch),Math.cos(t.pitch),0],F=O(Math.round((l+.6)/.8),4,12),N=O(Math.round(A/.7),3,8),H=[e-h,w,-.6],V=[e-h,w,l],B=[d,R,l],r0=[d,R,-.6],t0=M0(F,N,Me,Ct(o.f(...H),o.f(...V),o.f(...B),o.f(...r0)),{cap:.8}),U0=t0?He(t0).map(($,K)=>[$[0],$[1],1,K<2?w:R]):null;m(H,V,B,r0,S,[5,t.roofM[1],t.roofM[2],0],[[-.6,0],[l,0],[l,A],[-.6,A]],U0),m([s+h,w,-.6],[s+h,w,l],B,r0,[Math.sin(t.pitch),Math.cos(t.pitch),0],[5,t.roofM[1],t.roofM[2],0],[[-.6,0],[l,0],[l,A],[-.6,A]],U0);const _0=t0?[[...Z(t0,0,0),1,w],[...Z(t0,1,0),1,w],[...Z(t0,1,0),1,w],[...Z(t0,0,0),1,w]]:null;m([e-h,w-.2,-.6],[e-h,w-.2,l],[e-h,w,l],[e-h,w,-.6],[-1,0,0],c,null,_0);for(const $ of[-1,1]){const K=$<0?e-h:s+h,I=t0?[[...Z(t0,0,0),1,w],[...Z(t0,0,1),1,R],[...Z(t0,0,1),1,R],[...Z(t0,0,0),1,w]]:null;m([K,w-.22,-.62],[d,R-.22,-.62],[d,R,-.62],[K,w,-.62],[0,0,-1],c,null,I),m([K,w-.22,-.62],[d,R-.22,-.62],[d,R-.22,0],[K,w-.22,0],[0,-1,0],[6,E(.08,.07,.06),0,0])}if(Ro([o.f(e,f,0),o.f(s,f,0),o.f(d,R,0)],p,a,[[e,f],[s,f],[d,R]]),R-f>1.5){const $=f+.35,K=L()<t.lit?.6+L()*.5:0;m([d-.35,$,-.02],[d+.35,$,-.02],[d+.35,$+.85,-.02],[d-.35,$+.85,-.02],[0,0,-1],[7,t.trim,K,L()])}if(t0&&($0.push({r:t0,out:o.n(-1,0,0),pitch:t.pitch,metal:t.roofM[2]===1,eave:[o.f(e-h,w,-.6),o.f(e-h,w,l)]}),E0.push({kind:"roof",roof:$0[$0.length-1],p:[o.f(e-h,w-.1,-.6),o.f(e-h,w-.1,l)]})),t.balcony){const $=e+r*.18,K=s-r*.18,I=t.fh,w0=M0(6,2,At,Ct(o.f($,I,-1),o.f(K,I,-1),o.f(K,I,0),o.f($,I,0)),{cap:.2});G(o,$,K,I-.16,I,-1,0,[1,t.wall[1],1,0],w0?{r:w0,u0:0,u1:1,v0:0,v1:1}:null);const a0=M0(6,1,At,Ct(o.f($,I+.95,-.98),o.f(K,I+.95,-.98),o.f(K,I+.95,-.98),o.f($,I+.95,-.98)),{cap:.06});G(o,$,K,I+.88,I+.95,-1,-.93,[1,t.wall[1],1,0],a0?{r:a0,u0:0,u1:1,v0:0,v1:0}:null);for(let Rt=$+.06;Rt<K;Rt+=.16)G(o,Rt-.035,Rt+.035,I,I+.88,-.99,-.95,[1,t.wall[1],1,0],null);a0&&E0.push({kind:"ledge",r:a0,p:[o.f($,I+.9,-1),o.f(K,I+.9,-1)]})}}else{const i=M0(O(Math.round(r/.8),3,12),1,At,Ct(o.f(e,f+.55,.15),o.f(s,f+.55,.15),o.f(s,f+.55,.15),o.f(e,f+.55,.15)),{cap:.18});G(o,e,s,f,f+.55,0,.3,t.parapetM||a,i?{r:i,u0:0,u1:1,v0:0,v1:0}:null,{noBack:!0});const h=M0(O(Math.round(r/.8),3,12),1,At,Ct(o.f(e,f-.18,-.13),o.f(s,f-.18,-.13),o.f(s,f-.18,-.13),o.f(e,f-.18,-.13)),{cap:.1});if(G(o,e-.05,s+.05,f-.4,f-.18,-.28,0,[4,E(.4,.38,.34),0,0],h?{r:h,u0:0,u1:1,v0:0,v1:0}:null,{noBack:!0}),m([e,f,.3],[s,f,.3],[s,f,l],[e,f,l],[0,1,0],[6,E(.1,.1,.1),0,0]),i&&E0.push({kind:"ledge",r:i,p:[o.f(e,f+.5,0),o.f(s,f+.5,0)]}),h&&E0.push({kind:"ledge",r:h,p:[o.f(e,f-.25,-.25),o.f(s,f-.25,-.25)]}),t.chimney){const d=e+r*(.25+.5*L()),w=l*.6;G(o,d-.35,d+.35,f,f+1.6,w-.35,w+.35,[2,E(.3,.14,.1),0,0],null)}}}const os=[];function Xn(o,t,e){const s={a0:t,sill:.95,recess:!0,lit:Er,trim:E(.8,.78,.72),doorC:E(.2,.08,.05),door:-1,shop:!1,chimney:L()<.5};if(z==="village"){const l=Q(7.5,10);Object.assign(s,{a1:t+l,d:Q(8,11),xs:(o>0?I0:q)+Q(2.5,5),floors:2,fh:2.6,h:5.2+Q(-.2,.6),roof:L()<.65?"gf":"sg",pitch:Q(.42,.56),ov:Q(.9,1.3),wall:[1,E(...z0(Ke)),L()<.5?1:2,1],roofM:[5,E(...z0(Ye)),L()<.7?1:4],cols:3,ww:.85,wh:1.05,door:Math.floor(L()*3)===1?1:L()<.5?0:2,shutters:L()<.55?E(...z0([[.32,.1,.06],[.12,.22,.14],[.6,.55,.45]])):0,balcony:L()<.6,gap:Q(2.5,6),fence:!0,trim:E(.75,.7,.6),doorC:E(.22,.13,.07),canopy:!1})}else if(z==="mill"){const l=Q(6,9.5),f=L()<.5?2:3;Object.assign(s,{a1:t+l,d:12,xs:q+L0,floors:f,fh:3.2,h:f*3.2+.4,roof:L()<.65?"flat":"sg",pitch:Q(.55,.65),ov:.3,wall:[2,E(...z0(Ke)),0,0],roofM:[5,E(...z0(Ye)),0],cols:l>8?4:3,ww:.95,wh:1.65,door:Math.floor(L()*3),shop:!1,lintel:!0,gap:L()<.2?Q(2,3.5):0,trim:E(...z0([[.42,.4,.35],[.12,.2,.15],[.7,.68,.6]])),canopy:L()<.4,awning:0})}else if(z==="harbour"){const l=Q(5,7.2);Object.assign(s,{a1:t+l,d:8,xs:q+L0,floors:2,fh:2.7,h:5.4,roof:"gf",pitch:Q(.75,.92),ov:.3,wall:[L()<.75?1:3,E(...z0(Ke)),0,0],roofM:[5,E(...z0(Ye)),L()<.5?1:3],cols:l>6?3:2,ww:.85,wh:1.25,door:Math.floor(L()*2),shutters:0,gap:L()<.5?0:Q(.3,1.2),trim:E(.82,.8,.75),doorC:E(...z0([[.1,.2,.3],[.35,.05,.04],[.15,.25,.15]])),canopy:L()<.3})}else{const l=Q(4.6,6.4),f=L()<.6?3:4;Object.assign(s,{a1:t+l,d:11,xs:q+L0,floors:f,fh:3,h:f*3+.3,roof:"sg",pitch:Q(.86,.98),ov:.28,wall:[L()<.8?3:2,E(...z0(Ke)),0,L()<.6?.9:0],roofM:[5,E(...z0(Ye)),3],cols:l>5.6?3:2,ww:.95,wh:1.7,door:Math.floor(L()*2),stoop:L()<.6,sill:1,lintel:L()<.5,dormers:L()<.6,chimney:L()<.7,gap:0,trim:E(.82,.8,.74),doorC:E(...z0([[.08,.1,.14],[.3,.05,.05],[.12,.2,.15],[.22,.13,.07]])),canopy:L()<.25})}return s}let es=de!=="shop",Fo=null,$e=null;function Rr(o){const t={nv:Ko,NVS:Pt.slice(),shX:Go,shY:Ho,shH:Xo,reg:Eo.length,w:Ut.length,k:E0.length,r:$0.length,b:jo.length};o();for(let e=0;e<4;e++)we[e]=Math.max(we[e],Pt[e]);for(let e=t.reg;e<Eo.length;e++)for(const s of Eo[e].cells)Z0[s]=0,Oe[s]=-1,ao[s]=0;Eo.length=t.reg,Ko=t.nv;for(let e=0;e<4;e++)Pt[e]=t.NVS[e];Go=t.shX,Ho=t.shY,Xo=t.shH,Ut.length=t.w,E0.length=t.k,$0.length=t.r,jo.length=t.b}const So=43,Zo=51.5,uo=z==="harbour"?0:z==="village"?64:70,$o=z==="harbour"?gt-1.5:uo-3;for(const o of[-1,1]){let t=o<0?5:21.5;if(o>0){const e=Xn(1,6.5,!0);Object.assign(e,{a0:6.5,a1:19.5,xs:I0+5.6,door:1,cols:3,shop:!1,roof:z==="mill"?"sg":e.roof,sideWin:!0,h:Math.min(e.h,7.5),floors:Math.min(e.floors,2)}),e.roof==="flat"&&(e.roof="sg"),Io?Rr(()=>Ze(Hn(1,e.xs),e)):Ze(Hn(1,e.xs),e)}for(;t<$o;){if(t>So-3&&t<Zo){t=Zo;continue}const e=Xn(o,t,t<30);e.a1>$o+2&&(e.a1=Math.max(t+3.5,$o+2)),e.a1>So&&e.a0<So&&(e.a1=Math.max(e.a0+3.5,So)),!es&&o<0&&t>12&&(e.shop=!0,e.awning=E(...z0([[.45,.05,.05],[.1,.25,.15],[.12,.15,.3]])),e.door=0,es=!0,$e=[t,e.a1],e.lit=Math.max(e.lit,.6)),e.sideWin=e.gap>1.5||o>0&&t===21.5,Ze(Hn(o,e.xs),e),o>0&&t===21.5&&(Fo=e),e.fence&&os.push([o,e.a0-.5,e.a1+.5]),t=e.a1+e.gap}}if(uo>0){let o=-18;for(;o<18;){const t=Xn(1,o,!1);Object.assign(t,{a1:o+(t.a1-t.a0),shop:!1,gap:Math.min(t.gap,1.5)}),t.roof==="gf"&&z!=="village"&&(t.roof="sg"),Ze(Ar(uo+(z==="village"?6:0)),t),o=t.a1+t.gap}}if(i0([[-80,0,-5],[80,0,-5],[80,0,500],[-80,0,500]],[0,1,0],[0,0,0,0],[[0,0],[1,0],[1,1],[0,1]],[[0,0,2,0],[0,0,2,0],[0,0,2,0],[0,0,2,0]]),Wn>0)for(const o of[-1,1]){const t=z==="harbour"?gt:uo;for(const[e,s]of[[-2,So-3],[Zo,t]])G(q0,o*q-.08,o*q+.08,0,Wn,e,s,[4,E(.24,.235,.22),0,0],"g"),G(q0,Math.min(o*(q+.08),o*(q+L0)),Math.max(o*(q+.08),o*(q+L0)),0,Wn*.8,e,s,[0,0,0,0],"g")}if(z==="harbour"){G(q0,-30,30,-.6,.05,gt-.4,gt,[4,E(.3,.29,.27),0,0],"g");for(let e=-q-L0+.4;e<q+L0;e+=2.4){const s=M0(1,1,co,()=>[e,.62,gt-.8],{cap:.08});W([e,0,gt-.8],[e,.55,gt-.8],.14,.12,10,[8,E(.05,.05,.05),0,0],null,null),W([e,.55,gt-.8],[e,.62,gt-.8],.17,.17,10,[8,E(.05,.05,.05),0,0],s?Z(s,0,0):null,s?Z(s,0,0):null,!0)}for(let e=0;e<4;e++){const s=Q(-9,9),l=gt+6+e*5+Q(0,3),f=Q(6,9),r=Q(-.4,.4),a=kr([s,0,l],Math.PI/2+r),c=E(...z0([[.6,.6,.58],[.15,.22,.35],[.45,.1,.07],[.12,.25,.18]]));G(a,-f/2,f/2,-.3,.8,-1.1,1.1,[6,c,0,0],null);const u=M0(4,1,co,Ct(a.f(-f*.3,1.9,0),a.f(f*.1,1.9,0),a.f(f*.1,1.9,0),a.f(-f*.3,1.9,0)),{cap:.1});G(a,-f*.32,f*.12,.8,1.9,-.8,.8,[6,E(.75,.74,.7),0,0],u?{r:u,u0:0,u1:1,v0:0,v1:0}:null);const p=a.f(f*.1+.6,.8,0),m=Q(6,9);W(p,T0(p,[0,m,0]),.06,.04,6,[6,E(.6,.58,.55),0,0],null,null),W(T0(p,[0,m,0]),a.f(-f/2,1,0),.008,.008,3,[8,E(.2,.2,.2),0,0],null,null)}const o=-32,t=150;W([o,0,t],[o,18,t],2,1.5,12,[3,E(.75,.74,.7),0,0],null,null),W([o,18,t],[o,20.5,t],1.2,1.2,12,[11,0,1.5,0],null,null),W([o,20.5,t],[o,22,t],1.5,.2,12,[8,E(.12,.05,.04),0,0],null,null)}if(z==="town"||z==="village"){const o=Q(-5,6),t=uo+26,e=z==="village"?2.2:3,s=z==="village"?16:24;G(q0,o-e,o+e,0,s,t-e,t+e,[4,E(...z==="village"?[.6,.58,.52]:[.42,.4,.36]),0,0],null),G(q0,o-.5,o+.5,s-4,s-1.8,t-e-.02,t-e,[16,E(.01,.01,.012),0,0],null),i0([[o-.7,s-6.6,t-e-.03],[o+.7,s-6.6,t-e-.03],[o+.7,s-5.2,t-e-.03],[o-.7,s-5.2,t-e-.03]],[0,0,-1],[11,0,.12,0]),z==="village"?(W([o,s,t],[o,s+1.2,t],e*.8,e*.9,12,[8,E(.1,.12,.1),0,0],null,null),io([o,s+2.4,t],e*.95,1.6,e*.95,8,[8,E(.1,.13,.11),0,0],null),W([o,s+3.6,t],[o,s+7,t],.4,.02,8,[8,E(.1,.13,.11),0,0],null,null)):W([o,s,t],[o,s+13,t],e*1.35,.05,4,[5,E(.13,.15,.17),3,0],null,null),G(q0,o-e-3,o+e+9,0,9,t+2,t+22,[4,E(.4,.38,.34),0,0],null)}if(z==="mill"){const o=Q(4,10),t=uo+30;W([o,0,t],[o,34,t],1.5,1,12,[2,E(.32,.13,.08),0,0],null,null),W([o,33,t],[o,34.5,t],1.15,1.15,12,[4,E(.3,.29,.26),0,0],null,null),G(q0,o-22,o+6,0,14,t+3,t+25,[2,E(.3,.13,.09),0,0],null);const e=Q(-12,-5),s=uo+22,l=17;for(const[r,a]of[[-2,-2],[2,-2],[-2,2],[2,2]])W([e+r*1.3,0,s+a*1.3],[e+r*.9,l,s+a*.9],.15,.12,5,[8,E(.12,.11,.1),0,0],null,null);W([e,l,s],[e,l+4.5,s],3.2,3.2,16,[1,E(.33,.22,.14),1,0],null,null);const f=M0(1,1,co,()=>[e,l+6,s],{cap:.3});W([e,l+4.5,s],[e,l+6.6,s],3.5,.1,16,[5,E(.12,.12,.12),1,0],f?Z(f,0,0):null,f?Z(f,0,0):null)}const ns=18.6,ss=19.8,Fr=7,Sr=21.2;function jn(o,t,e,s,l){const f=s-e,r=O(Math.round(f/.5),4,40),a=M0(r,1,At,i=>[t,.98,e+f*i],{cap:.07}),c=M0(r,1,At,i=>[t,.33,e+f*i],{cap:.05}),u=q0,p=a?{r:a,u0:0,u1:0,v0:0,v1:0}:null,m=i=>(i-e)/f,g=l==="iron"?[8,E(.03,.03,.035),0,0]:[6,l==="paint"?E(.72,.7,.64):E(.36,.3,.24),0,0],b=(i,h)=>i?{r:i,u0:0,u1:1,v0:0,v1:0}:null;if(l==="iron"){G(u,t-.02,t+.02,.92,.96,e,s,g,b(a,0),{}),G(u,t-.02,t+.02,.12,.15,e,s,g,b(c,0),{});for(let i=e+.06;i<s;i+=.12)W([t,0,i],[t,1.02,i],.011,.011,4,g,null,null),W([t,1.02,i],[t,1.1,i],.02,0,4,g,null,null);for(let i=e;i<=s+.01;i+=2.4)G(u,t-.05,t+.05,0,1.15,i-.05,i+.05,g,a?{r:a,u0:m(i),u1:m(i),v0:0,v1:0}:null)}else{for(const[i,h,d]of[[.85,.93,a],[.28,.36,c]]){const w=A=>{const S=d?Z(d,m(A),0):[0,0];return[S[0],S[1],d?1:0,h+.02]},R=(A,S,F)=>[F,S,A];i0([R(e,h+.02,t-.06),R(s,h+.02,t-.06),R(s,h+.02,t-.02),R(e,h+.02,t-.02)],[0,1,0],g,null,[w(e),w(s),w(s),w(e)]),i0([R(e,i,t-.06),R(s,i,t-.06),R(s,h+.02,t-.06),R(e,h+.02,t-.06)],[-1,0,0],g,[[e,i],[s,i],[s,h],[e,h]],[w(e),w(s),w(s),w(e)])}for(let i=e+.06;i<s;i+=.13){const h=.98+.02*Math.sin(i*7),d=a?Z(a,m(i),0):null;G(u,t-.02,t+0,0,h,i-.038,i+.038,g,d?{r:a,u0:m(i),u1:m(i),v0:0,v1:0}:null,{ty:0}),Ro([[t-.02,h,i-.038],[t-.02,h,i+.038],[t-.02,h+.06,i]],[-1,0,0],g,[[0,0],[1,0],[.5,1]],d?[[d[0],d[1],1,h+.06],[d[0],d[1],1,h+.06],[d[0],d[1],1,h+.06]]:null)}for(let i=e;i<=s+.01;i+=2)G(u,t-.02,t+.07,0,1.08,i-.045,i+.045,g,a?{r:a,u0:m(i),u1:m(i),v0:0,v1:0}:null)}for(let i=0;i<pt;i++)for(let h=0;h<mt;h++){const d=i*h0+h;Math.abs(b0[d]-t)<(Bo-Vt)/mt*.75&&k0[d]>e&&k0[d]<s&&(yt[d]|=1)}a&&E0.push({kind:"ledge",r:a,p:[[t,.95,e],[t,.95,s]]})}const Qe=z==="town"?"iron":z==="village"?"wood":"paint";if(jn(1,I0,Fr,ns,Qe),jn(1,I0,ss,Sr,Qe),z==="village")for(const o of os)o[0]<0&&o[1]>10&&o[1]<40&&jn(-1,-q-.6,o[1],Math.min(o[2],o[1]+9),"wood");if(Io){const o=$1,t=1.5,e=21.42,s=e-t,l=[6,Qe==="wood"?E(.3,.23,.16):Qe==="iron"?E(.22,.18,.14):E(.46,.44,.4),0,0],f=M0(O(Math.round(s/.5),4,40),1,At,c=>[o,1.84,t+s*c],{cap:.06}),r=c=>O((c-t)/s,0,1),a=t+s*(.3+.4*fo());for(let c=t+.08;c<e;c+=.155){const u=1.78+(fo()-.5)*.07+.03*Math.sin(c*1.7),p=(fo()-.5)*.03;if(Math.abs(c-a)<.08){G(q0,o-1.75,o-.05,0,.03,c-.07,c+.07,l,"g");continue}G(q0,o+p,o+p+.025,0,u,c-.07,c+.07,l,f?{r:f,u0:r(c),u1:r(c),v0:0,v1:0}:null)}for(let c=t;c<=e;c+=2.4)G(q0,o+.03,o+.12,0,1.88,c-.05,c+.05,l,null);for(let c=0;c<pt;c++)for(let u=0;u<mt;u++){const p=c*h0+u;Math.abs(b0[p]-o)<(Bo-Vt)/mt*.75&&k0[p]>t&&k0[p]<e&&(yt[p]|=1)}if(f&&E0.push({kind:"ledge",r:f,p:[[o,1.8,t],[o,1.8,e]]}),Fo){const c=Math.max(I0+1,Fo.xs+.4),u=Math.min(o-.3,Fo.xs+Fo.d-.4),p=21.49;if(u-c>3){const m=Math.min(3.3,Fo.h-1.4),g=Math.min(m+(u-c)*.4,Fo.h-.4),b=[4,E(.36,.34,.31),0,0];i0([[c,0,p],[u,0,p],[u,m,p],[c,m,p]],[0,0,-1],b,[[0,0],[1,0],[1,1],[0,1]]),Ro([[c,m,p],[u,m,p],[(c+u)/2,g,p]],[0,0,-1],b,[[0,0],[1,0],[.5,1]])}}}Io||G(q0,I0+.1,I0+5.6,0,.03,ns+.05,ss-.05,[4,E(.22,.21,.2),0,0],"g");function rs(o,t,e,s,l,f){const r=A0(P[2]^l,P[5]^l*7919,l*31337,P[7]^4660),a=[9,0,0,0];function c(u,p,m,g,b,i,h){let d=null;if(b>=1&&b<=2){const F=b===1?5:3,N=u,H=p;if(d=M0(F,1,Oo,V=>T0(T0(N,d0(H,m*V)),[0,g+.02,0]),{cap:b===1?.06:.04}),d){const V={r:d,depth:b,parent:i,kids:[],p0:u,p1:T0(u,d0(p,m)),cap:(b===1?.035:.025)*(.7+.7*r()),below:[]};d.br=V,xt.push(V),i&&i.kids.push(V),d.bb=V}}const w=d?d.bb:i,R=b<4?3:2;let A=u,S=p;for(let F=0;F<R;F++){const N=m/R,H=b>2?.5:.32;S=X0(T0(S,[(r()-.5)*H,b>1?.2:-.05*b,(r()-.5)*H]));const V=T0(A,d0(S,N)),B=g*(1-F/R*.5),r0=g*(1-(F+1)/R*.5),t0=w?Z(w.r,w===(d&&d.bb)?F/R:h,0):null,U0=w?Z(w.r,w===(d&&d.bb)?(F+1)/R:h,0):null;if(W(A,V,Math.max(B,.004),Math.max(r0,.003),B>.05?8:B>.015?5:3,a,b>=1?t0:null,b>=1?U0:null),b<f){const _0=b===0?F===R-1?4:1:(b<3,2);for(let $=0;$<_0;$++){if((b===0||b>=2&&R>2)&&F<1)continue;const K=r()*S0,I=b===0?.35+r()*.4:.1+r()*.45;let w0=X0(T0(d0(S,b===0?.55:1.05),[Math.cos(K)*(1-I),I,Math.sin(K)*(1-I)]));b===0&&(w0=X0(T0(w0,[s[0]*.8,0,s[1]*.8])));const a0=w===(d&&d.bb)?(F+1)/R:h;c(V,w0,m*(b===0?e:(b>=2?.54:.68)+r()*.12),r0*(b===0?.72:.8),b+1,w,a0)}}A=V}}c(o,X0([s[0]*.15,1,s[1]*.15]),t,t*.035,0,null,0)}const fs=xt.length;rs([I0+2.1,0,10.5],4.2,.95,[-.75,-.15],1,4),z!=="village"&&rs([Tr(),0,Q(31,38)],3,.8,[0,0],2,3);function Tr(){return(L()<.5?-1:1)*(q+.7)}for(let o=fs;o<xt.length;o++)for(let t=fs;t<xt.length;t++){if(o===t)continue;const e=xt[o],s=xt[t],l=eo(e.p0,e.p1,.5),f=eo(s.p0,s.p1,.5);f[1]<l[1]-.2&&Math.hypot(l[0]-f[0],l[2]-f[2])<.9&&e.below.push(s)}for(const o of xt)E0.push({kind:"branch",br:o,p:[o.p0,o.p1]});function Je(o,t,e){const l=M0(6,1,Oo,f=>[o,e*(.25+.7*f),t],{cap:.08});W([o,0,t],[o,e*.3,t],.15,.12,6,[9,0,0,0],null,null);for(let f=0;f<6;f++){const r=f/5,a=e*(.18+.68*r),c=e*.32*(1-r*.8),u=e*.24,p=l?Z(l,r,0):null;W([o,a,t],[o,a+u,t],c,.05,9,[16,E(.05,.085,.055),0,0],p,p)}if(l){const f={r:l,depth:1,kids:[],p0:[o-.5,e*.5,t],p1:[o+.5,e*.9,t],cap:.06,below:[]};xt.push(f),E0.push({kind:"branch",br:f,p:[[o,e*.3,t],[o,e,t]]})}}z==="village"&&(Je(I0+3.6,25,7.5),Je(-q-3.5,Q(24,30),8),Je(I0+3,Q(34,40),9),Je(-q-4,Q(52,58),10));const y0=A0(P[5]^1240909634,P[2]^3035945132,P[7]^P[1],P[0]^1042826200),tn=o=>o[Math.floor(y0()*o.length)],Nr=A0(P[3]^2050082281,P[6]^462302535,P[4]^P[0],P[2]^1544552161),Qo=[{col:E(...z0([[.08,.16,.12],[.35,.05,.04],[.12,.14,.2],[.55,.52,.45]])),basket:L()<.6}];Qo.push({col:E(...z0([[.04,.04,.05],[.4,.33,.12],[.15,.3,.38]])),basket:L()<.3});const on=[[.5,.05,.04],[.06,.12,.2],[.5,.5,.48],[.08,.08,.09],[.12,.22,.16],[.55,.42,.18]],Et=[];{const o=L()<.5?1:-1;Et.push({side:-1,z:13.2,flip:o,col:E(...z0(on))})}if(z!=="harbour"){const o=Q(31,37),t=L()<.5?1:-1;Et.push({side:1,z:o,flip:t,col:E(...z0(on))})}if(L()<.6){const o=Q(55,60)>$o?$o-5:Q(55,60);Et.push({side:-1,z:o,flip:1,col:E(...z0(on))})}const ls=()=>E(...z0([[.08,.2,.1],[.07,.07,.08],[.1,.15,.3]])),en=[{x:-(q+L0)+.5,z:Q(20,26),col:ls()}];if(L()<.7){const o=Q(24,30);en.push({x:q+L0-.5,z:o,col:ls()})}function nn(o,t,e,s,l,f){f=f||.2;const r=f>1,a=r?.06:0,c={f:(h,d,w)=>{const R=w*Math.cos(f)+d*Math.sin(f),A=d*Math.cos(f)-w*Math.sin(f);return[o+R,A+a,t+h*e]},n:(h,d,w)=>[w*Math.cos(f)+d*Math.sin(f),d*Math.cos(f)-w*Math.sin(f),h*e]},u=M0(6,1,co,h=>c.f(-.62+1.24*h,.9,0),{cap:.05}),p=h=>u?Z(u,O((h+.62)/1.24,0,1),0):null,m=[8,s,0,0],g=[8,E(.03,.03,.03),0,0],b=(h,d)=>c.f(h,d,0);for(const h of[-.52,.52]){for(let w=0;w<16;w++){const R=w/16*S0,A=(w+1)/16*S0,S=b(h+Math.cos(R)*.33,.34+Math.sin(R)*.33),F=b(h+Math.cos(A)*.33,.34+Math.sin(A)*.33),N=r||Math.sin((R+A)/2)>.5;W(S,F,.02,.02,4,[15,0,0,0],N?p(h):null,N?p(h):null)}for(let w=0;w<6;w++){const R=w/6*Math.PI;W(b(h-Math.cos(R)*.31,.34-Math.sin(R)*.31),b(h+Math.cos(R)*.31,.34+Math.sin(R)*.31),.002,.002,3,[8,E(.5,.5,.5),0,0],null,null)}}const i=(h,d,w,R,A)=>W(b(...h),b(...d),w,w,5,R||m,A||r?p(h[0]):null,A||r?p(d[0]):null);i([-.52,.34],[0,.28],.013),i([-.52,.34],[-.17,.78],.012),i([0,.28],[-.18,.8],.017),i([-.18,.78],[.38,.84],.017,null,!0),i([0,.28],[.41,.7],.02),i([.41,.68],[.52,.34],.014),i([.39,.86],[.37,1],.014),i([-.19,.8],[-.2,.92],.012,g),W(c.f(.33,1,-.26),c.f(.33,1,.26),.012,.012,5,m,p(.33),p(.33)),G({f:(h,d,w)=>c.f(h,d,w),n:c.n},-.33,-.08,.92,.97,-.06,.06,[16,E(.04,.03,.03),0,0],u?{r:u,u0:.24,u1:.44,v0:0,v1:0}:null),G({f:(h,d,w)=>c.f(h,d,w),n:c.n},-.62,-.3,.7,.72,-.08,.08,g,u?{r:u,u0:0,u1:.25,v0:0,v1:0}:null),l&&G({f:(h,d,w)=>c.f(h,d,w),n:c.n},.42,.72,.78,1,-.16,.16,[8,E(.15,.13,.1),0,0],u?{r:u,u0:.85,u1:1,v0:0,v1:0}:null),u&&E0.push({kind:"ledge",r:u,p:[b(-.6,.8),b(.6,.8)]})}const ho={saloon:{L:4.3,hw:.85,bot:.3,wr:.32,belt:.93,tk:1,wh:[.8,3.5],bon:3.3,gl:[[.95,1.45],[2.75,3.3]],TP:[[0,.7],[.2,.9],[.95,.96],[1.45,1.42],[2.1,1.47],[2.75,1.44],[3.3,1],[4.1,.88],[4.3,.6]],US:[0,.05,.2,.55,.95,1.2,1.45,1.8,2.4,2.75,3.02,3.3,3.7,4.1,4.25,4.3]},hatch:{L:3.75,hw:.83,bot:.3,wr:.31,belt:.93,tk:1,wh:[.62,3.05],bon:2.6,gl:[[.06,.5],[2.05,2.6]],TP:[[0,.72],[.06,.98],[.3,1.34],[.5,1.43],[1.2,1.46],[2.05,1.42],[2.6,.98],[3.5,.86],[3.75,.62]],tx:[[0,.85],[.55,1.45],[2.05,2.75]]},estate:{L:4.5,hw:.86,bot:.3,wr:.32,belt:.93,tk:1,wh:[.85,3.7],bon:3.5,gl:[[.08,.45],[2.95,3.5]],TP:[[0,.72],[.08,.96],[.22,1.36],[.45,1.44],[1.8,1.46],[2.95,1.44],[3.5,1],[4.3,.88],[4.5,.62]],tx:[[0,.9],[.4,1.3],[2.95,2.75]]},van:{L:4.9,hw:.93,bot:.36,wr:.34,belt:1.1,gT:1.72,tk:.35,wh:[.9,4.1],bon:4.45,gl:[[3.92,4.45]],hi:3.41,TP:[[0,1.86],[.06,1.93],[.2,1.95],[3.8,1.95],[3.92,1.9],[4.45,1.15],[4.8,1],[4.9,.72]],tx:[[0,4.4],[3.38,4],[3.44,2.1],[4.42,2.75],[4.9,3.1]],rl:[.55,.92,.8,.06]},pickup:{L:5,hw:.9,bot:.38,wr:.36,belt:1.08,gT:1.72,tk:.6,wh:[.95,4.1],bon:3.75,gl:[[2.33,2.45],[3.2,3.75]],hi:2.38,bed:2.3,TP:[[0,.95],[.05,1.05],[2.3,1.05],[2.33,1.42],[2.36,1.78],[2.45,1.85],[3.2,1.85],[3.75,1.15],[4.75,1.04],[5,.75]],tx:[[0,.5],[2.3,.5],[2.4,2.1],[3.75,2.98],[5,3.6]],rl:[.62,.98,.78,.06]}};for(const o in ho){const t=ho[o];t.ar=t.wr+.09;const e=t.wh.flatMap(s=>[-1,-.87,-.5,0,.5,.87,1].map(l=>s+l*t.ar));if(t.US)t.US=[...new Set(t.US.concat(e).map(s=>Math.round(s*1e3)/1e3))].sort((s,l)=>s-l).filter((s,l,f)=>l===0||s-f[l-1]>.004);else{let s=[0,.05,t.L-.15,t.L].concat(t.TP.map(f=>f[0]),(t.tx||[]).map(f=>f[0]),e);s=[...new Set(s.map(f=>Math.round(O(f,0,t.L)*1e3)/1e3))].sort((f,r)=>f-r);const l=[s[0]];for(let f=1;f<s.length;f++){const r=s[f]-s[f-1],a=Math.ceil(r/.5);for(let c=1;c<=a;c++)l.push(s[f-1]+r*c/a)}t.US=l.filter((f,r)=>r===0||f-l[r-1]>.004)}}const mo=[];function Lr(o,t,e,s,l,f){const r=ho[l||"saloon"],a=r.L,c=r.hw,u=r.bot,p=r.TP,m={f:(x,M,y)=>[o+y,M,t+(x-a/2)*e],n:(x,M,y)=>[y,M,x*e]},g=x=>{if(x<=0)return p[0][1];for(let M=0;M<p.length-1;M++)if(x<=p[M+1][0]){const y=p[M],k=p[M+1];return wt(y[1],k[1],(x-y[0])/(k[0]-y[0]))}return p[p.length-1][1]},b=Math.max(...p.map(x=>x[1])),i=Math.max(9,Math.round(a/.43)),h=M0(i,4,Ge,(x,M)=>M>.8?m.f(x*a,g(x*a)+.02,0):m.f(x*a,l==="saloon"||!l?1.45:g(x*a)+.02,(M*1.5-.5)*2*c),{cap:.3}),d=(x,M)=>h?Z(h,O(x/a,0,1),O(M/(2*c)+.5,0,1)*2/3):[0,0],w=x=>h?Z(h,O(x/a,0,1),1):[0,0],R=new Float32Array(i);if(h)for(let x=0;x<i;x++){const M=x/(i-1)*a;let y=0;r.gl.forEach((k,T)=>{const U=T===r.gl.length-1?k[1]:k[0];y=Math.max(y,O(1-Math.abs(M-U)/Math.max(k[1]-k[0],.3),0,1))}),R[x]=.3*(.55+.6*y),ao[(h.y+3)*h0+h.x+x]=.002+.008*y}const A=[10,s,0,0],S=x=>{const M=r.tx;if(!M)return x;if(x<=M[0][0])return M[0][1];for(let T=0;T<M.length-1;T++)if(x<=M[T+1][0])return wt(M[T][1],M[T+1][1],(x-M[T][0])/(M[T+1][0]-M[T][0]));const y=M[M.length-2],k=M[M.length-1];return k[1]+(x-k[0])*(k[1]-y[1])/(k[0]-y[0])},F=(1.37-.93)/((r.gT||1.37)-r.belt),N=(x,M)=>M<=r.belt?M*.93/r.belt:.93+(M-r.belt)*(r.hi&&x<r.hi?Math.min(F,.03/Math.max(b-r.belt,.01)):F),H=x=>{const M=g(x),y=c-.13*(1-Tt(0,.5,Math.min(x,a-x))),k=O((M-r.belt-.07)/.4,0,1)*r.tk,T=Math.min(M-.04,r.belt);let U=0;for(const o0 of r.wh){const s0=x-o0;Math.abs(s0)<r.ar&&(U=Math.max(U,Math.sqrt(r.ar*r.ar-s0*s0)))}const l0=u+U,X=Tt(0,.12,U);return[[y-.045*(1-O(U/(.6-u),0,1))+.012*X,l0],[y+.006*X,Math.max(.6,l0+.05)],[y-.012,T-.07],[y-.06,T],[y-.07-k*.09,Math.max(T,M-.07)],[y-.15-k*.1,M]]},V=[];for(const[x,M,y,k]of[[-.055,.07,.09,.035],[-.028,.025,.03,.01]])V.push({u:x,base:0,dy:M,dw:y,dwb:k});for(const x of r.US)V.push({u:x,base:x});for(const[x,M,y,k]of[[.028,.025,.03,.01],[.055,.07,.09,.035]])V.push({u:a+x,base:a,dy:M,dw:y,dwb:k});const B=V.map(x=>{let M=H(x.base);x.dy&&(M=M.map(k=>{const T=Tt(.6,.78,k[1]);return[k[0]*(1-wt(x.dwb,x.dw,T)),k[1]-x.dy*T]}));const y=x.u;return M.concat(M.map(k=>[-k[0],k[1]]).reverse()).map((k,T)=>({u:y,w:k[0],y:k[1],p:m.f(y,k[1],k[0]),t:[S(y),N(y,k[1])],s:h?[...d(y,k[0]),1,k[1]]:F0,g:h?[...w(y),1,k[1]]:F0}))});for(let x=0;x<B.length;x++)for(let M=0;M<12;M++){const y=B[x][M],k=to(B[Math.min(x+1,B.length-1)][M].p,B[Math.max(x-1,0)][M].p),T=to(B[x][Math.min(M+1,11)].p,B[x][Math.max(M-1,0)].p);let U=X0(oo(k,T));const l0=m.n(y.u<0?-1:y.u>a?1:0,y.y-.75,y.w);Nt(U,l0)<0&&(U=d0(U,-1)),y.n=U}const r0=.03+.03*(Math.abs(o*3.7+t*1.3)%1);for(let x=0;x<B.length-1;x++)for(let M=0;M<11;M++){const y=B[x][M],k=B[x+1][M],T=B[x+1][M+1],U=B[x][M+1],l0=(y.u+k.u)/2,X=M===5?r.gl.findIndex(Dn=>l0>Dn[0]&&l0<Dn[1]):-1,J=M===5?X>=0?1:r.bed&&l0<r.bed?4:2:M===4||M===6?2:0,o0=Math.abs(B[x+1][5].y-B[x][5].y)/Math.max(B[x+1][5].u-B[x][5].u,.001),s0=h&&M>=3&&M<=7&&(M===5?o0<1.2:o0<.5&&x>=2&&x<B.length-3),v0=[10,s,J,0],B0=[y.p,k.p,T.p,U.p],St=[y.n,k.n,T.n,U.n],pe=[y.t,k.t,T.t,U.t];if(X<0){Yo(B0,St,v0,pe,s0?[y.s,k.s,T.s,U.s]:[F0,F0,F0,F0]);continue}const zn=r.gl[X],Cn=X===r.gl.length-1,nr=Cn?zn[0]:zn[1],D1=nr+(Cn?r0:-r0);if(D1<=y.u+.005||D1>=k.u-.005||Math.abs(nr-(Cn?y.u:k.u))>.01){Yo(B0,St,v0,pe,[y.g,k.g,T.g,U.g]);continue}const cf=(D1-y.u)/(k.u-y.u),Wt=(Dn,uf)=>Dn.map((sr,hf)=>sr+(uf[hf]-sr)*cf),J0={p:Wt(y.p,k.p),n:X0(Wt(y.n,k.n)),t:Wt(y.t,k.t),s:Wt(y.s,k.s),g:Wt(y.g,k.g)},tt={p:Wt(U.p,T.p),n:X0(Wt(U.n,T.n)),t:Wt(U.t,T.t),s:Wt(U.s,T.s),g:Wt(U.g,T.g)};Cn?(Yo([y.p,J0.p,tt.p,U.p],[y.n,J0.n,tt.n,U.n],v0,[y.t,J0.t,tt.t,U.t],[y.s,J0.s,tt.s,U.s]),Yo([J0.p,k.p,T.p,tt.p],[J0.n,k.n,T.n,tt.n],v0,[J0.t,k.t,T.t,tt.t],[J0.g,k.g,T.g,tt.g])):(Yo([y.p,J0.p,tt.p,U.p],[y.n,J0.n,tt.n,U.n],v0,[y.t,J0.t,tt.t,U.t],[y.g,J0.g,tt.g,U.g]),Yo([J0.p,k.p,T.p,tt.p],[J0.n,k.n,T.n,tt.n],v0,[J0.t,k.t,T.t,tt.t],[J0.s,k.s,T.s,tt.s]))}for(const x of[0,B.length-1])for(let M=0;M<5;M++){const y=B[x];i0([y[M].p,y[M+1].p,y[10-M].p,y[11-M].p],m.n(x?1:-1,0,0),A,[y[M].t,y[M+1].t,y[10-M].t,y[11-M].t],M>=3&&h?[y[M].s,y[M+1].s,y[10-M].s,y[11-M].s]:null)}if(h){const x=r.gl[r.gl.length-1][1],M=H(x)[5][0]-.02,y=Math.min(x+.18,a-.3),k=[16,E(.02,.02,.021),0,0],T=[[x-.035,g(x-.035)+.002],[x-.008,g(x)+.03],[x+.022,g(x)+.035],[x+.055,g(x+.055)+.002]],U=T[2][1],l0=X=>[...d(y,X),1,U];for(let X=0;X<3;X++){const J=T[X],o0=T[X+1];i0([m.f(J[0],J[1],-M),m.f(o0[0],o0[1],-M),m.f(o0[0],o0[1],M),m.f(J[0],J[1],M)],null,k,null,[l0(-M),l0(-M),l0(M),l0(M)])}for(const X of[-M,M])i0(T.map(J=>m.f(J[0],J[1],X)),m.n(0,0,Math.sign(X)),k)}const t0=B[0][0].u,U0=B[B.length-1][0].u;i0([m.f(t0,u,.25-c),m.f(U0,u,.25-c),m.f(U0,u,c-.25),m.f(t0,u,c-.25)],[0,-1,0],[10,s,4,0]);const _0=(s>>16&255)/255,$=(s>>8&255)/255,K=(s&255)/255,I=.299*_0+.587*$+.114*K,w0=O(I*.55,.075,.22),a0=Math.floor(Math.abs(o*7.3+t*2.9))%3===0&&I*.5>.075,Rt=[16,E(.008,.008,.009),0,0],Q0=[16,E(.04,.04,.042),0,0],D0=r.wr,Ft=D0*.56,ze=[16,a0?E(_0*.5,$*.5,K*.5):E(w0,w0,w0*1.02),0,0],Nn=[16,E(Math.min(.3,w0*1.4),Math.min(.3,w0*1.4),Math.min(.31,w0*1.45)),0,0],Ln=[16,E(.03,.03,.032),0,0],Pn=[8,E(.5,.5,.51),0,0],Un=(x,M,y,k,T,U,l0)=>{for(let X=0;X<T;X++){const J=X/T*S0,o0=(X+1)/T*S0,s0=(v0,B0)=>m.f(x+Math.cos(v0)*B0,D0+Math.sin(v0)*B0,M);y>0?i0([s0(J,y),s0(o0,y),s0(o0,k),s0(J,k)],m.n(0,0,l0),U):Ro([s0(J,0),s0(o0,k),s0(J,k)],m.n(0,0,l0),U,[[0,0],[0,0],[0,0]])}};for(const x of r.wh)for(const M of[-1,1]){const y=M>0?0:11,k=M*(c-.25),T=B.filter(X=>Math.abs(X[y].u-x)<=r.ar+1e-4);for(let X=0;X<T.length-1;X++){const J=T[X][y],o0=T[X+1][y];i0([J.p,o0.p,m.f(o0.u,o0.y,k),m.f(J.u,J.y,k)],X0(m.n(x-(J.u+o0.u)/2,u-(J.y+o0.y)/2,0)),Rt)}i0([m.f(x-r.ar,u,k),m.f(x+r.ar,u,k),m.f(x+r.ar,u+r.ar+.03,k),m.f(x-r.ar,u+r.ar+.03,k)],m.n(0,0,M),Rt);const U=M*(c-.035),l0=M*(c-.05);W(m.f(x,D0,M*(c-.2)),m.f(x,D0,U),D0,D0,14,Q0,null,null),Un(x,U,Ft,D0,14,Q0,M),W(m.f(x,D0,U),m.f(x,D0,l0),Ft,Ft,12,ze,null,null),Un(x,l0,0,Ft*.9,12,ze,M),Un(x,l0,Ft*.9,Ft,12,Nn,M),Un(x,l0+M*.004,Ft*.5,Ft*.72,12,Ln,M);{const X=l0+M*.008,J=m.f(x,D0,X+M*.012),o0=s0=>m.f(x+Math.cos(s0)*Ft*.42,D0+Math.sin(s0)*Ft*.42,X);for(let s0=0;s0<12;s0++)Ro([J,o0(s0/12*S0),o0((s0+1)/12*S0)],null,Pn,[[0,0],[0,0],[0,0]])}}const ie=(x,M)=>{for(let y=0;y<5;y++){const k=x[y],T=x[y+1];if((M-k[1])*(M-T[1])<=0)return wt(k[0],T[0],(M-k[1])/(T[1]-k[1]||1))}return M<x[0][1]?x[0][0]:x[5][0]},Js=x=>x.slice(0,6).map(M=>[M.w,M.y]),_1=Js(B[0]),tr=Js(B[B.length-1]),_n=B[0][5].y,lf=B[B.length-1][5].y,ue=c*.59,af=t0-.004,z1=U0+.004,Mf=[-1,1],or=(x,M,y,k,T,U,l0)=>{const X=Math.min(y+k,ie(M,T)-.03),J=Math.min(y+k,ie(M,U)-.03);for(const o0 of[-1,1])i0([m.f(x,T,o0*(X-2*k)),m.f(x,T,o0*X),m.f(x,U,o0*J),m.f(x,U,o0*(J-2*k))],m.n(x<a/2?-1:1,0,0),l0)};{const x=r.rl,M=x?x[0]:Math.max(.5,_n-.12);or(af,_1,x?x[2]:ue,x?x[3]:.14,M,x?x[1]:M+.09,[16,E(.3,.02,.02),0,0])}const he=Math.max(u+.12,lf-.13);or(z1,tr,ue,.13,he,he+.1,[16,E(.6,.6,.55),0,0]);const zt=[16,E(.025,.025,.027),0,0],Co=.007,wo=(x,M,y,k,T,U)=>i0([m.f(x,k,M),m.f(x,k,y),m.f(x,T,y),m.f(x,T,M)],m.n(x<a/2?-1:1,0,0),U);for(const[x,M,y]of[[t0,_1,-1],[U0,tr,1]]){const k=ie(M,u+.1)+.01,T=u+.03,U=u+.15,l0=x+y*.06,X=x+y*.012,J=m.n(0,1,0),o0=[[X,-k],[l0,.05-k],[l0,k-.05],[X,k]];for(let s0=0;s0<3;s0++){const v0=o0[s0],B0=o0[s0+1];i0([m.f(v0[0],T,v0[1]),m.f(B0[0],T,B0[1]),m.f(B0[0],U,B0[1]),m.f(v0[0],U,v0[1])],X0(m.n(y*(B0[1]-v0[1]),0,-y*(B0[0]-v0[0])*6)),zt);const St=pe=>h?[...d(y>0?a-.05:.05,pe),1,U]:F0;i0([m.f(v0[0],U,v0[1]),m.f(B0[0],U,B0[1]),m.f(x,U,B0[1]),m.f(x,U,v0[1])],J,zt,null,[St(v0[1]),St(B0[1]),St(B0[1]),St(v0[1])])}if(y>0){wo(l0+Co,-.26,.26,T+.005,T+.115,[16,E(.5,.5,.47),0,0]),wo(z1,.14-ue,ue-.14,he,he+.1,zt);for(const s0 of[he+.033,he+.066])wo(z1+.002,.15-ue,ue-.15,s0-.006,s0+.006,[16,E(.3,.3,.3),0,0])}else wo(t0-Co,-.26,.26,U+.03,U+.14,[16,E(.55,.46,.17),0,0])}{const x=l==="van"||l==="pickup",M=r.gl[r.gl.length-1][1]-.1,y=Math.min(g(M)-.04,r.belt),k=ie(H(M),y+.02),T=x?zt:[16,s,0,0],U=l==="van"?.28:.11,l0=y+(l==="van"?.1:.03);for(const X of[-1,1]){const J={f:(o0,s0,v0)=>m.f(M+o0,s0,X*(k+v0)),n:(o0,s0,v0)=>m.n(o0,s0,X*v0)};G(J,-.015,.015,l0+U*.3,l0+U*.3+.025,-.01,.07,zt,null,{noBack:!0}),G(J,-.03,.03,l0,l0+U,.06,.22,T,h?{r:h,u0:M/a,u1:M/a,v0:X>0?2/3:0,v1:X>0?2/3:0}:null)}}const me=(x,M,y,k,T,U,l0)=>{const X=[x,...r.US.filter(J=>J>x&&J<M),M];for(let J=0;J<X.length-1;J++){const o0=X[J],s0=X[J+1],v0=H(o0),B0=H(s0),St=(pe,zn)=>T*(ie(pe,zn)+(l0||Co));i0([m.f(o0,y,St(v0,y)),m.f(s0,y,St(B0,y)),m.f(s0,k,St(B0,k)),m.f(o0,k,St(v0,k))],m.n(0,0,T),U)}},C1=x=>[16,E((s>>16&255)/255*x,(s>>8&255)/255*x,(s&255)/255*x),0,0];if(l==="van"){const x=r.hi-.08,M=C1(.6),y=Nr()<.67;for(const k of[-1,1]){for(const T of[1.28,1.58])me(.25,x-.05,T-.012,T+.012,k,M);me(.08,3.86,1.835,1.86,k,C1(.55),.012);for(const T of[2.25,x])me(T-.008,T+.008,.44,1.74,k,zt);me(2.25,x,1.732,1.748,k,zt),me(.3,2.25,1.11,1.124,k,zt)}wo(t0-Co,-.008,.008,u+.31,_n-.04,zt),wo(t0-Co,.035,.15,1.02,1.045,[16,E(.22,.22,.23),0,0]);for(const k of[-1,1])wo(t0-Co,k*.06,k*.5,_n-.47,_n-.12,y?[10,s,1,0]:C1(.86))}else if(l==="pickup"){for(const M of[-1,1])me(.06,r.bed-.03,.99,1.02,M,zt,.01);const x=ie(_1,u+.165)-.05;wo(t0-Co,-x,x,u+.158,u+.172,zt)}const er=l&&l!=="saloon"?b*.83:1.2;h&&E0.push({kind:"ledge",r:h,p:[m.f(.5,er,0),m.f(a-.5,er,0)]}),jo.push([[o-c,0,t-a/2],[o+c,0,t+a/2]]),mo.push({r:h,pm:R,K:r,kind:l||"saloon",state:f||"day",z:t,flip:e,side:Math.sign(o),samp:x=>{for(let M=0;M<=a;M+=.05){const y=g(M);for(let k=-c;k<=c;k+=.05)x(m.f(M,y,k))}}})}const as=on.concat([[.3,.31,.33],[.22,.08,.06],[.58,.58,.55],[.18,.2,.22]]),Kn=[["saloon",26],["hatch",24],["estate",18],["van",16],["pickup",16]],rt=[];let Jo="quiet";if(v.home)for(const o of Et)rt.push(Object.assign({kind:"saloon",state:"day"},o));else{const o=y0();Jo=o<.35?"quiet":o<.75?"parked":"both",Jo==="both"&&z==="harbour"&&(Jo="parked");const t=()=>{const a=y0();return a<.24?"home":a<.4&&(lo||lt)?"left":"day"},e=G0(y0,[["saloon",45],["hatch",20],["estate",15],["van",10],["pickup",10]]);rt.push(Object.assign({},Et[0],{kind:e,state:y0()<.2?"home":"day"}));const s=(a,c,u,p,m)=>{const g=1+Math.floor(y0()*Math.max(1,u-1));for(let b=1;b<u;b++){const i=G0(y0,Kn),h=ho[i].L,d=b===g?3.9+y0()*1.1:.6+y0()*1.9,w=c+d+h/2;if(w+h/2>m)break;rt.push({side:a,z:w,flip:y0()<.85?p:-p,col:E(...tn(as)),kind:i,state:t()}),c=w+h/2}};if(Jo==="quiet"){const a=Et.slice(1),c=y0();if(a.length&&c<.6){const u=a[Math.floor(y0()*a.length)];rt.push(Object.assign({},u,{kind:G0(y0,Kn),state:t()}))}}else if(Jo==="parked"){s(-1,13.2+ho[e].L/2,3+Math.floor(y0()*3),Et[0].flip,40);const a=Et[Et.length-1];Et.length>1&&a.side<0&&rt.push(Object.assign({},a,{kind:G0(y0,Kn),state:t()}))}else s(-1,13.2+ho[e].L/2,2+Math.floor(y0()*2),Et[0].flip,40),s(1,15+y0()*6,3+Math.floor(y0()*2),-Et[0].flip,42);const l=a=>Math.hypot(a.side*(q-1)-W0[0],a.z-W0[2]),f=a=>a.kind==="van"||a.kind==="pickup";let r=null;for(const a of rt)a.state!=="left"&&(!r||l(a)<l(r))&&(r=a);for(const a of rt)f(a)&&at!=="street"&&a===r&&(a.kind="estate"),f(a)&&$e&&a.side<0&&a.z+2.6>$e[0]-1&&a.z-2.6<$e[1]+1&&(a.kind="estate");for(let a=rt.length-1;a>0;a--){const c=rt[a],u=ho[c.kind].L;(at==="walk"&&c.side>0&&c.z<26||z!=="harbour"&&c.z+u/2>So-1.5&&c.z-u/2<Zo+1||c.z+u/2>$o+2.2||z==="village"&&en.some(p=>Math.sign(p.x)===c.side&&Math.abs(p.z-c.z)<u/2+1.4))&&rt.splice(a,1)}for(let a=1;a<rt.length;a++){const c=rt[a-1],u=rt[a];for(let p=0;p<4&&c.side===u.side&&c.kind===u.kind&&c.col===u.col;p++)u.col=E(...tn(as))}}for(const o of rt){const t=o.side*(q-1);if(o.state==="left"){const e=ho[o.kind];jo.push([[t-e.hw,0,o.z-e.L/2],[t+e.hw,0,o.z+e.L/2]]),mo.push({r:null,K:e,kind:o.kind,state:"left",z:o.z,flip:o.flip,side:o.side})}}if(v.home)nn(I0-.3,14,1,Qo[0].col,Qo[0].basket),nn(I0-.3,15.6,-1,Qo[1].col,Qo[1].basket);else{const o=G0(y0,[[0,18],[1,30],[2,34],[3,18]]),t=y0()<0;let e=12+y0()*(z==="harbour"?8:6.4);for(let s=0;s<o;s++){const l=s<2?Qo[s]:{col:E(...tn([[.3,.3,.32],[.05,.12,.25],[.45,.4,.3]])),basket:y0()<.3};t&&s===o-1?nn(I0-1.35,e+.3,s%2?-1:1,l.col,l.basket,1.45):nn(I0-.3,e,s%2?-1:1,l.col,l.basket),e+=1.45+y0()*.4}}for(const o of rt)o.state!=="left"&&Lr(o.side*(q-1),o.z,o.flip,o.col,o.kind,o.state);function cs(o,t,e){const s=M0(1,1,co,()=>[o,1.06,t],{cap:.1});G(q0,o-.3,o+.3,0,.98,t-.35,t+.35,[8,e,0,0],null),G(q0,o-.33,o+.33,.98,1.06,t-.38,t+.38,[8,e,0,0],s?{r:s,u0:0,u1:0,v0:0,v1:0}:null),s&&E0.push({kind:"ledge",r:s,p:[[o-.3,1,t],[o+.3,1,t]]})}function Pr(o,t,e,s){const l={f:(g,b,i)=>[o+g*s,b,t+i],n:(g,b,i)=>[g*s,b,i]},f=M0(1,1,co,()=>l.f(0,1.07,0),{cap:.1}),r=f?[...Z(f,0,0),1,1.08]:F0,a=[8,e,0,0],c=(g,b,i)=>l.f(b,g,i),u=[[-.25,-.24],[.21,-.24],[.21,.24],[-.25,.24]],p=[[-.3,-.29],[.28,-.29],[.28,.29],[-.3,.29]];for(let g=0;g<4;g++){const b=g,i=(g+1)%4;i0([c(.04,...u[b]),c(.04,...u[i]),c(.98,...p[i]),c(.98,...p[b])],null,a)}G(l,-.3,.28,.93,.98,-.3,.3,a,null);const m=[c(1.08,-.34,-.31),c(1.03,.33,-.31),c(1.03,.33,.31),c(1.08,-.34,.31)];i0(m,l.n(.07,1,0),a,[[0,0],[1,0],[1,1],[0,1]],[r,r,r,r]),i0([c(1.03,.33,-.31),c(.97,.34,-.31),c(.97,.34,.31),c(1.03,.33,.31)],l.n(1,0,0),a);for(const g of[-1,1])i0([c(1.08,-.34,g*.31),c(1.03,.33,g*.31),c(.99,.33,g*.31),c(1.02,-.34,g*.31)],l.n(0,0,g),a);W(l.f(-.36,.96,-.2),l.f(-.36,.96,.2),.018,.018,5,a,null,null);for(const g of[-1,1])W(l.f(-.28,.1,g*.2),l.f(-.28,.1,g*.3),.1,.1,10,[16,E(.02,.02,.02),0,0],null,null,!0);f&&E0.push({kind:"ledge",r:f,p:[l.f(-.3,1,0),l.f(.3,1,0)]})}if(v.home)for(const o of en)cs(o.x,o.z,o.col);else{const o=y0()<.78,t=G0(y0,[[1,58],[2,28],[3,14]]);for(const[e,s]of en.entries()){const l=s.x,f=e?1:t;for(let r=0;r<f;r++){const a=r?E(...tn([[.08,.2,.1],[.07,.07,.08],[.1,.15,.3],[.2,.12,.07],[.25,.26,.27]])):s.col,c=s.z+(r-(f-1)/2)*.68;o?Pr(l,c,a,-Math.sign(s.x)):cs(l,c,a)}}}if(z!=="harbour"){const t=I0-.45,e=M0(5,1,At,f=>[t,.47,23.5-.8+1.6*f],{cap:.1}),s=[6,E(.3,.2,.12),0,0],l=[8,E(.03,.03,.03),0,0];for(let f=0;f<3;f++)G(q0,t-.22+f*.15,t-.1+f*.15,.42,.47,23.5-.8,23.5+.8,s,e?{r:e,u0:0,u1:1,v0:0,v1:0}:null);G(q0,t+.2,t+.25,.55,.85,23.5-.8,23.5+.8,s,null);for(const f of[-.7,.7])G(q0,t-.22,t+.25,0,.42,23.5+f-.03,23.5+f+.03,l,null);e&&E0.push({kind:"ledge",r:e,p:[[t,.45,23.5-.8],[t,.45,23.5+.8]]})}function To(o,t,e,s){const l=[8,E(.035,.035,.04),0,0];let f;const r=M0(3,1,co,c=>[o-s*c*.3,4.5,t],{cap:.09}),a=r?Z(r,.5,0):null;if(e==="lantern"){W([o,0,t],[o,.5,t],.12,.09,8,l,null,null),W([o,.5,t],[o,3.7,t],.06,.05,8,l,null,null),W([o,3.7,t],[o,3.7+.08,t],.12,.17,8,l,null,null);const u=3.7+.08,p=3.7+.62;for(let m=0;m<4;m++){const g=m/4*S0+.785,b=(m+1)/4*S0+.785,i=.17,h=.24;i0([[o+Math.cos(g)*i,u,t+Math.sin(g)*i],[o+Math.cos(b)*i,u,t+Math.sin(b)*i],[o+Math.cos(b)*h,p,t+Math.sin(b)*h],[o+Math.cos(g)*h,p,t+Math.sin(g)*h]],null,[11,0,1,0]),W([o+Math.cos(g)*i,u,t+Math.sin(g)*i],[o+Math.cos(g)*h,p,t+Math.sin(g)*h],.012,.012,3,l,null,null)}W([o,p,t],[o,p+.06,t],.3,.3,4,l,a,a),W([o,p+.06,t],[o,p+.3,t],.3,.03,4,l,a,a),io([o,p+.34,t],.04,.04,.04,4,l,null),f=[o,(u+p)/2,t],r&&E0.push({kind:"ledge",r,p:[[o,.5,t],[o,p+.3,t]]}),kt.push({p:f,side:.22,hp:[o,(u+p)/2,t],size:.3})}else if(e==="cobra"){const u=o-s*1.7;W([o,0,t],[o,6.6,t],.1,.07,8,[8,E(.25,.25,.26),0,0],null,null),W([o,6.6-.05,t],[u,6.6+.25,t],.05,.04,6,[8,E(.25,.25,.26),0,0],null,null),G(q0,Math.min(u,u-s*.7),Math.max(u,u-s*.7),6.6+.12,6.6+.34,t-.18,t+.18,[8,E(.3,.3,.31),0,0],r?{r,u0:0,u1:1,v0:0,v1:0}:null),i0([[u-s*.05,6.6+.11,t-.13],[u-s*.6,6.6+.11,t-.13],[u-s*.6,6.6+.11,t+.13],[u-s*.05,6.6+.11,t+.13]],[0,-1,0],[11,0,1.4,0]),f=[u-s*.33,6.6+.02,t],r&&E0.push({kind:"ledge",r,p:[[o,1,t],[u-s*.6,6.6+.3,t]]}),kt.push({p:f,side:.12,hp:f,size:.35})}else if(e==="wall"){const u=o;W([u,3.6,t],[u-s*.7,3.6+.15,t],.03,.025,5,l,null,null),W([u-s*.7,3.6+.15,t],[u-s*.7,3.6-.05,t],.02,.02,4,l,null,null);const p=u-s*.7,m=3.6-.62,g=3.6-.1;for(let b=0;b<6;b++){const i=b/6*S0,h=(b+1)/6*S0;i0([[p+Math.cos(i)*.14,m,t+Math.sin(i)*.14],[p+Math.cos(h)*.14,m,t+Math.sin(h)*.14],[p+Math.cos(h)*.2,g,t+Math.sin(h)*.2],[p+Math.cos(i)*.2,g,t+Math.sin(i)*.2]],null,[11,0,1,0])}W([p,g,t],[p,g+.2,t],.26,.02,6,l,a,a),W([p,m-.06,t],[p,m,t],.08,.15,6,l,null,null),f=[p,(m+g)/2,t],r&&E0.push({kind:"ledge",r,p:[[p,m,t],[p,g+.2,t]]}),kt.push({p:f,side:.28,hp:f,size:.25})}else{const u=o-s*1.1;W([o,0,t],[o,5.6,t],.11,.09,7,[9,0,0,0],null,null),W([o,5.6-.2,t],[u,5.6,t],.04,.035,5,l,null,null),W([u,5.6,t],[u,5.6-.35,t],.05,.36,12,[8,E(.05,.1,.07),0,0],a,a),io([u,5.6-.38,t],.07,.07,.07,5,[11,0,1.6,0],null),f=[u,5.6-.4,t],r&&E0.push({kind:"ledge",r,p:[[o,1,t],[u,5.6,t]]}),kt.push({p:f,side:.15,hp:f,size:.3})}}const Yn={village:"pole",mill:"cobra",harbour:"lantern",town:"lantern"}[z];To(q+.4,12.2,z==="mill"?"cobra":z==="village"?"pole":"lantern",1),z==="town"?(To(-(q+L0),29,"wall",-1),To(q+L0,40.5,"wall",1),To(-(q+L0),57,"wall",-1)):(To(-q-.4,30,Yn,-1),To(q+.4,41,Yn,1),To(-q-.4,z==="harbour"?47:58,Yn,-1));let Ur=null;if(de==="snowman"){const o=I0+1.5,t=15.4,e=M0(2,1,co,a=>[o,1.62+a*.1,t],{cap:.06}),s=e?Z(e,0,0):null,l=e?Z(e,1,0):null,f=[12,0,0,0];io([o,.34,t],.4,.36,.4,10,f,s),io([o+.02,.92,t-.02],.29,.27,.29,10,f,s),io([o+.03,1.36,t-.03],.2,.19,.2,9,f,s);const r=t-.22;W([o+.03,1.53,t-.03],[o+.03,1.55,t-.03],.21,.21,12,[16,E(.02,.02,.02),0,0],l,l,!0),W([o+.03,1.55,t-.03],[o+.03,1.74,t-.03],.13,.12,12,[16,E(.02,.02,.02),0,0],l,l,!0),W([o-.02,1.35,r],[o-.12,1.33,r-.17],.028,.002,6,[16,E(.75,.25,.03),0,0],null,null);for(const a of[-.07,.06])io([o+a,1.42,r+.02],.022,.022,.022,4,[16,E(.01,.01,.01),0,0],null);for(const a of[.82,.95,1.07])io([o-.02,a,t-.3],.025,.025,.025,4,[16,E(.01,.01,.01),0,0],null);W([o+.03,1.18,t-.03],[o+.03,1.24,t-.03],.22,.22,12,[16,E(.5,.05,.05),0,0],null,null),W([o-.1,1.2,r+.02],[o-.16,.95,r-.05],.03,.03,5,[16,E(.5,.05,.05),0,0],null,null);for(const a of[-1,1]){const c=[o,1,t+a*.25],u=T0(c,[-.1,.35,a*.45]);W(c,u,.016,.008,4,[9,0,0,0],null,null),W(eo(c,u,.75),T0(eo(c,u,.75),[.05,.15,a*.05]),.008,.004,3,[9,0,0,0],null,null)}Ur={r:e},e&&E0.push({kind:"ledge",r:e,p:[[o,.9,t],[o,1.7,t]]})}if(z==="mill"||z==="village"){const o=-(q+L0)+.35,t=[];for(let e=21;e<(uo||60)-4;e+=22)e>So-3&&e<Zo&&(e=Zo+1),t.push(e),W([o,0,e],[o,8.5,e],.14,.11,7,[9,0,0,0],null,null),G(q0,o-1,o+1,7.9,8.05,e-.06,e+.06,[9,0,0,0],null);for(let e=0;e+1<t.length;e++)for(const s of[-.85,-.3,.3,.85]){const l=t[e],f=t[e+1],r=8.05,a=.55,c=10;for(let u=0;u<c;u++){const p=u/c,m=(u+1)/c;W([o+s,r-a*4*p*(1-p),wt(l,f,p)],[o+s,r-a*4*m*(1-m),wt(l,f,m)],.009,.009,3,[8,E(.02,.02,.02),0,0],null,null)}}if(t.length){const e=t[0]+12,s=q+L0+.3;for(let l=0;l<10;l++){const f=l/10,r=(l+1)/10;W([wt(o,s,f),7.9-1.2*Math.sin(f*Math.PI)-f*1.2,e],[wt(o,s,r),7.9-1.2*Math.sin(r*Math.PI)-r*1.2,e],.008,.008,3,[8,E(.02,.02,.02),0,0],null,null)}}}const c0={sodium:{lc:[1,.46,.12],li:13,wc:[1,.58,.28],sky:[.022,.016,.014],gnd:[.014,.01,.008],moon:[.004,.005,.007],mv:0,cover:.97,cld:[.07,.038,.022],sz:[.022,.015,.012],shz:[.08,.045,.026],fog:[.036,.021,.013],stars:0,env:[.05,.03,.02],expo:1.35},white:{lc:[.78,.88,1],li:12,wc:[1,.6,.3],sky:[.018,.02,.026],gnd:[.011,.012,.014],moon:[.005,.006,.008],mv:0,cover:.95,cld:[.04,.042,.05],sz:[.013,.015,.021],shz:[.045,.048,.058],fog:[.024,.027,.034],stars:0,env:[.03,.034,.042],expo:1.35},moon:{lc:[1,.64,.34],li:10,wc:[1,.6,.3],sky:[.03,.04,.066],gnd:[.012,.014,.02],moon:[.11,.13,.17],mv:1,cover:.42,cld:[.05,.056,.075],sz:[.008,.015,.035],shz:[.032,.042,.068],fog:[.03,.037,.055],stars:1,env:[.03,.04,.06],expo:1.25},dusk:{lc:[1,.62,.32],li:10,wc:[1,.62,.32],sky:[.07,.1,.18],gnd:[.02,.025,.04],moon:[0,0,0],mv:0,cover:.55,cld:[.07,.08,.12],sz:[.025,.06,.17],shz:[.17,.19,.3],fog:[.075,.095,.15],stars:.25,env:[.08,.1,.16],expo:1}}[bt];qt==="aurora"&&(c0.cover=Math.min(c0.cover,.5),c0.stars=Math.max(c0.stars,.7)),p0==="blizzard"&&(c0.cover=Math.max(c0.cover,.9));const Zn=.2,is=-.3+L()*.25,$n=[Math.sin(is)*Math.cos(Zn),Math.sin(Zn),Math.cos(is)*Math.cos(Zn)];kt.forEach((o,t)=>{o.c=d0(c0.lc,c0.li*(t===0?1.1:.85+.25*L()))});const te=Math.min(4,kt.length),sn=new Float32Array(16),rn=new Float32Array(16);for(let o=0;o<te;o++)sn.set([...kt[o].p,45],o*4),rn.set([...kt[o].c,kt[o].side],o*4);Ut.forEach(o=>{const t=Math.max(0,o.p[2]-8);o.score=o.I/(1+t*.12)/(1+t*.12)*(o.shop?3:1)}),Ut.sort((o,t)=>t.score-o.score);const us=Math.min(16,Ut.length),hs=new Float32Array(64),ms=new Float32Array(64);for(let o=0;o<us;o++)hs.set([...Ut[o].p,Ut[o].soft],o*4),ms.set([...Ut[o].n,Ut[o].I*.9],o*4);dr(n,D);const ps=n.createBuffer(),fn=n.createVertexArray(),vs=u0&&Pt.every((o,t)=>o===n0.peak[t]&&(!o||je[t].buffer===Gn.buffer)),ds=vs?Gn:new Float32Array(Ko*16),ln=[];{let o=0;for(let t=0;t<4;t++)vs||ds.set(je[t].subarray(0,Pt[t]*16),o*16),ln.push([o,Pt[t]]),o+=Pt[t]}n.bindVertexArray(fn),n.bindBuffer(n.ARRAY_BUFFER,ps),n.bufferData(n.ARRAY_BUFFER,ds,n.STATIC_DRAW),[[0,3],[12,3],[24,2],[32,4],[48,4]].forEach(([o,t],e)=>{n.enableVertexAttribArray(e),n.vertexAttribPointer(e,t,n.FLOAT,!1,64,o),n.vertexAttribDivisor(e,0)}),n.bindVertexArray(null);const xs=()=>{n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.colorMask(!0,!0,!0,!0),n.depthMask(!0)};xs();function _t(o,t,e,s,l,f,r){const a=n.createTexture();return n.bindTexture(n.TEXTURE_2D,a),n.texStorage2D(n.TEXTURE_2D,r||1,e,o,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r>1?n.LINEAR_MIPMAP_LINEAR:f),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,f),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),a}const Ms=e0?n.RGBA16F:n.SRGB8_ALPHA8;function oe(o,t,e,s){const l=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,l),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0);let f=null;return s&&(f=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,f),n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_COMPONENT24,o,t),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,f)),{fb:l,rb:f,del(){n.deleteFramebuffer(l),f&&n.deleteRenderbuffer(f)}}}const Mt=D.shd,_r=D.sky;function ws(o){const t=X0(o),e=X0(oo(t,Math.abs(t[1])>.9?[0,0,1]:[0,1,0])),s=oo(e,t);let l=[1e9,1e9,1e9],f=[-1e9,-1e9,-1e9];for(const p of[-24,24])for(const m of[-1,48])for(const g of[-4,100]){const b=[p,m,g],i=[Nt(b,e),Nt(b,s),Nt(b,t)];for(let h=0;h<3;h++)l[h]=Math.min(l[h],i[h]),f[h]=Math.max(f[h],i[h])}const r=[0,1,2].map(p=>(l[p]+f[p])/2),a=[0,1,2].map(p=>(f[p]-l[p])/2+.5),c=[[...d0(e,1/a[0]),-r[0]/a[0]],[...d0(s,1/a[1]),-r[1]/a[1]],[...d0(t,1/a[2]),-r[2]/a[2]],[0,0,0,1]],u=new Float32Array(16);for(let p=0;p<4;p++)for(let m=0;m<4;m++)u[m*4+p]=c[p][m];return{M:u,ha:a[2]}}const Qn=()=>{n.bindVertexArray(fn),n.drawArrays(n.TRIANGLES,0,Ko)};function Jn(o,t,e){n.bindFramebuffer(n.FRAMEBUFFER,o.fb),n.viewport(0,0,t[0],t[1]),n.clearColor(1,1,1,1),n.clearDepth(1),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.enable(n.DEPTH_TEST),n.depthFunc(n.LESS),n.useProgram(Mt.p),e()}const an=Math.min(.9,qn/J1*.45),be=ws([Vo*an,-1,qo*an]),H0=512,cn=x0.sky,bs=oe(H0,H0,cn,!0);Jn(bs,[H0,H0],()=>{n.uniform1i(Mt.u.uNB,1),n.uniform1i(Mt.u.uK,0),n.uniformMatrix4fv(Mt.u.uM,!1,be.M),Qn()});const t1=p0==="blizzard"&&mo.some(o=>o.samp);let it=null,un=null;if(u0)t1&&(it=n0.sky.slice());else{it=new Uint8Array(H0*H0*4),n.readPixels(0,0,H0,H0,n.RGBA,n.UNSIGNED_BYTE,it);for(let o=0;o<4;o++)we[o]=Math.max(we[o],Pt[o]);un={sky:t1?it.slice():null,peak:we,ex:null}}if(t1){const o=be.M,t=[Vo*an,-1,qo*an],e=s=>(o[2]*s[0]+o[6]*s[1]+o[10]*s[2]+o[14])*.5+.5;for(const s of mo)s.samp&&s.samp(l=>{const f=(o[0]*l[0]+o[4]*l[1]+o[8]*l[2]+o[12])*.5+.5,r=(o[1]*l[0]+o[5]*l[1]+o[9]*l[2]+o[13])*.5+.5;if(f<0||r<0||f>=1||r>=1)return;const a=(Math.floor(r*H0)*H0+Math.floor(f*H0))*4,c=l[1]-.3;let u=e([l[0]+t[0]*c,.3,l[2]+t[2]*c]);if(!(u<=it[a]/255+it[a+1]/65025+it[a+2]/16581375+it[a+3]/4228250625||u>=1))for(let p=0;p<4;p++){u*=255;const m=Math.min(255,Math.floor(u));it[a+p]=m,u-=m}});n.bindTexture(n.TEXTURE_2D,cn),n.texSubImage2D(n.TEXTURE_2D,0,0,0,H0,H0,n.RGBA,n.UNSIGNED_BYTE,it),n.bindTexture(n.TEXTURE_2D,null)}const o1=bt==="moon",e1=ws(d0($n,-1)),ee=o1?2048:4,n1=x0.moon||_t(ee,ee,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.NEAREST,1),gs=oe(ee,ee,n1,!0);Jn(gs,[ee,ee],()=>{n.uniform1i(Mt.u.uNB,0),n.uniform1i(Mt.u.uK,0),n.uniformMatrix4fv(Mt.u.uM,!1,e1.M),o1&&Qn()});const hn=x0.lamp,ys=oe(1536,1024,hn,!0),s1=[[[1,0,0],[0,0,-1],[0,1,0]],[[-1,0,0],[0,0,1],[0,1,0]],[[0,1,0],[1,0,0],[0,0,-1]],[[0,-1,0],[1,0,0],[0,0,1]],[[0,0,1],[1,0,0],[0,1,0]],[[0,0,-1],[-1,0,0],[0,1,0]]];Jn(ys,[1536,1024],()=>{n.uniform1i(Mt.u.uK,1),n.uniform1f(Mt.u.uR,45);for(let o=0;o<te;o++)for(let t=0;t<6;t++)n.viewport(t*256,o*256,256,256),n.uniform3fv(Mt.u.uL,kt[o].p),n.uniform3fv(Mt.u.uA,s1[t][0]),n.uniform3fv(Mt.u.uU,s1[t][1]),n.uniform3fv(Mt.u.uV,s1[t][2]),Qn()});const vf=Math.floor(Math.log2(Y))+1,r1=x0.C,As=x0.S,mn=x0.I,Dt=Math.max(128,Y>>1),f1=x0.R,ks=x0.R2,Es=x0.V,zr=()=>{n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,D.noise),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,n1),n.activeTexture(n.TEXTURE2),n.bindTexture(n.TEXTURE_2D,cn),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,hn)},Rs=L()*7;function Cr(o,t){const e=o===2&&!e0?D.skyU:_r,s=e.u;n.useProgram(e.p),n.uniform1i(s.uMode,o),n.uniform1f(s.uMir,t),n.uniform1i(s.uNz,0),n.uniform3fv(s.uEye,W0),n.uniform3fv(s.uFwd,ct),n.uniform3fv(s.uRt,P0),n.uniform3fv(s.uUp,dt),n.uniform1f(s.uTan,V0),n.uniform3fv(s.uSkyZ,c0.sz),n.uniform3fv(s.uSkyH,c0.shz),n.uniform3fv(s.uCld,c0.cld),n.uniform3fv(s.uMtn,d0(T0(c0.sky,c0.moon),2.2)),n.uniform3fv(s.uMoonD,$n),n.uniform3fv(s.uFogC,c0.fog),n.uniform4f(s.uSk,c0.cover,c0.stars,z==="village"?1:0,Rs),n.uniform4f(s.uMo,c0.mv,.022,1,z==="harbour"?1:0)}const Fs=.3/(2*be.ha),Ss=bt==="sodium"||bt==="white"?d0(c0.cld,2.2):null;function Dr(o,t,e,s,l){const f=o.u;n.useProgram(o.p),n.uniform1i(f.uMode,t),n.uniform1f(f.uMir,e),n.uniformMatrix4fv(f.uVP,!1,s),n.uniform1i(f.uNz,0),n.uniform1i(f.uShM,1),n.uniform1i(f.uShS,2),n.uniform1i(f.uShL,3),n.uniformMatrix4fv(f.uMoonM,!1,e1.M),n.uniformMatrix4fv(f.uSkyM,!1,be.M),n.uniform4fv(f.uLP,sn),n.uniform4fv(f.uLC,rn),n.uniform1i(f.uNL,te),n.uniform4fv(f.uWP,hs),n.uniform4fv(f.uWN,ms),n.uniform1i(f.uNW,us),n.uniform3fv(f.uWC,c0.wc),n.uniform3fv(f.uMoonD,$n),n.uniform3fv(f.uMoonC,c0.moon),n.uniform3fv(f.uSkyA,t===1&&l===2&&Ss?Ss:c0.sky),n.uniform3fv(f.uGndA,c0.gnd),n.uniform3fv(f.uEye,W0),n.uniform3fv(f.uFwd,ct),n.uniform3fv(f.uEnv,c0.env),n.uniform3fv(f.uLampE,d0(c0.lc,9)),n.uniform4f(f.uSt,q,q+L0,Y1,gt),n.uniform4f(f.uSd,Rs,Vo,qo,o1?1:0),n.uniform4f(f.uBi,Fs,3,.15/(2*e1.ha),0)}zr();const pn=Math.min(4,n.getParameter(n.MAX_SAMPLES)||0);let Bt=null;if(pn>1){const o=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,o),n.renderbufferStorageMultisample(n.RENDERBUFFER,pn,Ms,Y,Y);const t=n.createRenderbuffer();n.bindRenderbuffer(n.RENDERBUFFER,t),n.renderbufferStorageMultisample(n.RENDERBUFFER,pn,n.DEPTH_COMPONENT24,Y,Y);const e=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,e),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,o),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,t);const s=pn+"|"+Ms+"|"+Y;(D.msOk||(D.msOk={}))[s]||n.checkFramebufferStatus(n.FRAMEBUFFER)===n.FRAMEBUFFER_COMPLETE?(Bt={fb:e,rbc:o,rbd:t},D.msOk[s]=!0):(n.deleteFramebuffer(e),n.deleteRenderbuffer(o),n.deleteRenderbuffer(t))}function vn(o,t,e,s,l,f,r){const a=oe(t,e,o,!r||!Bt);n.bindFramebuffer(n.FRAMEBUFFER,r&&Bt?Bt.fb:a.fb),n.viewport(0,0,t,e),n.clearColor(0,0,0,0),n.clearDepth(1),s===2&&!e0?(n.clearBufferuiv(n.COLOR,0,new Uint32Array(4)),n.clear(n.DEPTH_BUFFER_BIT)):n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.disable(n.DEPTH_TEST),n.depthMask(!1),Cr(s,l),n.bindVertexArray(D.vao0),n.drawArrays(n.TRIANGLES,0,3),n.enable(n.DEPTH_TEST),n.depthMask(!0),n.depthFunc(n.LESS),n.bindVertexArray(fn);for(let c=0;c<4;c++)ln[c][1]&&(Dr(D["scn"+c+(s===2&&!e0?"U":"")],s,l,f,c),n.drawArrays(n.TRIANGLES,ln[c][0],ln[c][1]));r&&Bt&&(n.bindFramebuffer(n.READ_FRAMEBUFFER,Bt.fb),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,a.fb),n.blitFramebuffer(0,0,t,e,0,0,t,e,n.COLOR_BUFFER_BIT,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null)),a.del()}vn(r1,Y,Y,0,0,Wo,!0),vn(As,Y,Y,1,0,Wo,!0),vn(mn,Y,Y,2,0,Wo,!1),vn(f1,Dt,Dt,0,1,Wo,!1),n.disable(n.DEPTH_TEST),Bt&&(n.deleteFramebuffer(Bt.fb),n.deleteRenderbuffer(Bt.rbc),n.deleteRenderbuffer(Bt.rbd)),n.bindTexture(n.TEXTURE_2D,r1),n.generateMipmap(n.TEXTURE_2D),n.bindTexture(n.TEXTURE_2D,f1),n.generateMipmap(n.TEXTURE_2D);{const o=oe(Dt,Dt,ks,!1);n.viewport(0,0,Dt,Dt),n.useProgram(D.blr.p),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,f1),n.uniform1i(D.blr.u.uR,0),n.uniform1f(D.blr.u.uSp,.009),n.bindVertexArray(D.vao0),n.drawArrays(n.TRIANGLES,0,3),o.del()}{const o=oe(Dt,Dt,Es,!1);n.viewport(0,0,Dt,Dt);const t=D.vol.u;n.useProgram(D.vol.p),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,D.noise),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,mn),n.activeTexture(n.TEXTURE3),n.bindTexture(n.TEXTURE_2D,hn),n.uniform1i(t.uNz,0),n.uniform1i(t.uI,1),n.uniform1i(t.uShL,3),n.uniform3fv(t.uEye,W0),n.uniform3fv(t.uFwd,ct),n.uniform3fv(t.uRt,P0),n.uniform3fv(t.uUp,dt),n.uniform1f(t.uTan,V0),n.uniform4fv(t.uLP,sn),n.uniform4fv(t.uLC,rn),n.uniform1i(t.uNL,te),n.uniform1i(t.uNS,40),n.bindVertexArray(D.vao0),n.drawArrays(n.TRIANGLES,0,3),o.del()}n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindVertexArray(null),n.deleteBuffer(ps),n.deleteVertexArray(fn),bs.del(),gs.del(),ys.del(),n.deleteTexture(cn),n.deleteTexture(n1),n.deleteTexture(hn);const Br=(o,t,e)=>{const s=be.M,l=[s[0]*o+s[4]*t+s[8]*e+s[12],s[1]*o+s[5]*t+s[9]*e+s[13],s[2]*o+s[6]*t+s[10]*e+s[14]],f=l[0]*.5+.5,r=l[1]*.5+.5,a=l[2]*.5+.5-Fs;if(f<0||r<0||f>1||r>1)return 1;let c=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const m=O(Math.floor(f*H0)+p,0,H0-1),g=O(Math.floor(r*H0)+u,0,H0-1),b=(g*H0+m)*4,i=it[b]/255+it[b+1]/65025+it[b+2]/16581375+it[b+3]/4228250625;a<=i&&c++}return c/9};for(const o of jo){const t=Math.min(o[0][0],o[1][0]),e=Math.max(o[0][0],o[1][0]),s=Math.min(o[0][2],o[1][2]),l=Math.max(o[0][2],o[1][2]),f=[];for(let r=0;r<mt;r++)b0[r]>t+.1&&b0[r]<e-.1&&f.push(r);if(f.length)for(let r=0;r<pt;r++){const a=r*h0;if(k0[a]>s+.1&&k0[a]<l-.1)for(const c of f)yt[a+c]|=2}}const l1=u0?n0.ex:new Float32Array(R0),ge=[];for(let o=0;o<R0;o++){if(!Z0[o])continue;if(Z0[o]===ko&&yt[o]&2){Lt[o]=0;continue}u0?Lt[o]=l1[o]:l1[o]=Lt[o]=Br(b0[o],Gt[o]+.03,k0[o]),Z0[o]===Ge&&(Lt[o]=Math.max(Lt[o],p0==="blizzard"?.6:.45));const t=go([b0[o],Gt[o],k0[o]]);Ve[o]=t[0],qe[o]=t[1],On[o]=t[2],ge.push(o)}un&&(un.ex=l1,fr(m0,un));const a1=new Int16Array(R0).fill(-1);for(const o of ge)Ve[o]>-.02&&Ve[o]<1.02&&qe[o]>-.02&&qe[o]<1.02&&(a1[o]=O(Math.floor(qe[o]*20),0,19)*20+O(Math.floor(Ve[o]*20),0,19));const Ht=Int32Array.from(ge),ut=Int32Array.from(ge.filter(o=>Z0[o]===ko)),dn=Int32Array.from(ge.filter(o=>Z0[o]!==ko));for(const o of $0){const t=o.pitch;o.Lc=wt(.3,.05,Tt(.35,.98,t))*(o.metal?.6:1)*(p0==="wet"?.75:1)*(.8+.5*_()),o.slide=null,o.mul=1-.55*Tt(.7,1.05,t)}for(const o of xt)o.cd=0;const Xt=new Float32Array(R0),xn=new Float32Array(R0).fill(1),ne=(o,t,e)=>{let s=Math.imul(o,374761393)+Math.imul(t,668265263)+e|0;return s=Math.imul(s^s>>>13,1274126177),((s^s>>>16)>>>0)/4294967296},Mn=(o,t,e)=>{const s=Math.floor(o),l=Math.floor(t),f=o-s,r=t-l,a=f*f*(3-2*f),c=r*r*(3-2*r),u=ne(s,l,e),p=ne(s+1,l,e),m=ne(s,l+1,e),g=ne(s+1,l+1,e);return u+(p-u)*a+(m-u)*c+(u-p-m+g)*a*c};function Ts(){const o=f0()*1e9|0;for(let t=0;t<Ht.length;t++){const e=Ht[t],s=b0[e],l=k0[e],f=Mn(s*.33,l*.33,o),r=Mn(s*1.3,l*1.3,o+7),a=Mn((Vo*s+qo*l)*.2,(-qo*s+Vo*l)*1.1,o+19);Xt[e]=O(Math.pow((f*.55+r*.25+a*.2)*2,2.3),Z0[e]===Ge?.65:.12,Z0[e]===Ge?1.4:2.4),Z0[e]===ko&&(xn[e]=O(.7+(f-.5)*.9+(r-.5)*.3-.3*Tt(.55,1,Math.abs(s)/q),.15,1))}}Ts();const ye=(lt?11e-5:16e-5)*{powder:1,wet:1.25,blizzard:1.5}[p0],No=new Float32Array(R0).fill(1),Ns=D.nd,Ir=(o,t)=>{if(!Ns)return 0;const e=o*.017*128-.5,s=(.31+t*.37)*128-.5,l=Math.floor(e),f=Math.floor(s),r=e-l,a=s-f,c=(u,p)=>Ns[((p&127)*128+(u&127))*4]/255;return((c(l,f)*(1-r)+c(l+1,f)*r)*(1-a)+(c(l,f+1)*(1-r)+c(l+1,f+1)*r)*a-.5)*.55};for(const o of $0)for(const t of o.r.cells)No[t]=o.mul;for(const o of mo)if(o.r)for(let t=0;t<o.r.w;t++)No[(o.r.y+3)*h0+o.r.x+t]=o.pm[t];for(const o of mo)if(o.state==="home"&&o.r)for(let t=0;t<o.r.h;t++)for(let e=0;e<o.r.w;e++)e/(o.r.w-1)*o.K.L>o.K.bon-.2&&(No[(o.r.y+t)*h0+o.r.x+e]=.03);for(let o=0;o<Ht.length;o++){const t=Ht[o],e=Lt[t]*No[t],s=Xt[t];if(Z0[t]===ko){const l=Ao[t];if(l===4)continue;if(lt){if(C[t]=(.11+.03*Math.sin(b0[t]*.7+k0[t]*.31)*Math.sin(k0[t]*.5))*Math.max(e,.15)*O(s,.7,1.3),l===1){const f=Math.abs(Math.abs(b0[t])-q*.5);(Math.abs(f-.8)<.25||Math.abs(f+.8-q)<.25)&&(C[t]*=.3),st[t]=.25}}else if(lo){const f=O((s-.3)/1.4,0,1),r=O(e*1.15,.1,1);if(l===1){const a=b0[t]>=0?1:0,c=Math.abs(Math.abs(b0[t]-Ir(k0[t],a))-q*.5),u=Tt(.36,.14,Math.abs(c-.74)+(s-1)*.05)*Tt(.18,.42,Mn(b0[t]*.5,k0[t]*.22,911));C[t]=(.025+.025*f)*(1-u*.67)*r,st[t]=.6,Ot[t]=.2}else l===2?(C[t]=(.04+.02*f)*r,st[t]=.35,Ot[t]=.08):C[t]=(.06+.02*f)*r}else l===1?(Ot[t]=.8*xn[t],st[t]=1,C[t]=ye*34*e*s*Tt(.68,1,Math.abs(b0[t])/q)):l===2?(Ot[t]=.4,st[t]=.75,C[t]=ye*70*e*s):C[t]=ye*150*e*s}else if(C[t]=Math.min(ao[t]*.85,lt?.13*e*O(s,.7,1.3):lo?.06*e*s:ye*150*e*s),Z0[t]===Oo){const l=xt.find(f=>f.r.id===Oe[t]);C[t]=Math.min(C[t],l?l.cap*(lo?.4:.65):.02)}}if(qt==="plough"){for(let o=0;o<ut.length;o++){const t=ut[o],e=Ao[t],s=Math.abs(b0[t]);if(e!==4)if(e===1){const l=Tt(q-1.3,q-.75,s);C[t]=l*(.1+.07*Xt[t])*Math.max(Lt[t],.4)+(1-l)*.0012*Xt[t],Ot[t]=(1-l)*.55*xn[t],st[t]=1}else lt||(C[t]=Math.max(C[t],.055*Lt[t]*O(Xt[t],.6,1.4)))}if(!lt)for(let o=0;o<dn.length;o++){const t=dn[o];Z0[t]!==Oo&&(C[t]=Math.min(ao[t]*.85,Math.max(C[t],.055*Lt[t]*No[t]*O(Xt[t],.7,1.3))))}}if(Io)for(let o=0;o<ut.length;o++){const t=ut[o];b0[t]>I0+.15&&b0[t]<$1&&k0[t]>1.5&&k0[t]<21.3&&(C[t]*=1.4)}function Ls(o){for(const t of $0){const e=t.r,s=fo()<1/3,l=Math.min(2,e.h-2);for(let f=0;f<e.h;f++)for(let r=0;r<e.w;r++){const a=(e.y+f)*h0+e.x+r;let c=Math.min(C[a],t.Lc*o)*(.12+.88*Tt(.25,.8,Xt[a]));f===e.h-1&&(c*=.12+.3*ne(r,e.id,5)),s&&f<l&&(c*=.05+.08*ne(r,f+e.id*7,9)),C[a]=c}}}if(lt)Ls(.7);else if(lo)Ls(.5);else if(qt==="plough")for(const o of $0)for(const t of o.r.cells)C[t]=Math.min(C[t],o.Lc*.7);for(const o of mo)if(o.state==="home"&&o.r)for(const t of o.r.cells)C[t]*=No[t]<.5?0:.34;const Ps=_t(h0,Do,n.RG8,n.RG,n.UNSIGNED_BYTE,n.LINEAR,1),c1=new Uint8Array(R0*2),ht=Math.round({powder:3200,wet:2800,blizzard:3800}[p0]*(j<500?.6:1)),j0=700,Wr=4+j0+ht,It=new Float32Array(Wr*8),Us=n.createBuffer(),_s=n.createVertexArray();n.bindVertexArray(_s),n.bindBuffer(n.ARRAY_BUFFER,Us),n.bufferData(n.ARRAY_BUFFER,It.byteLength,n.DYNAMIC_DRAW),n.enableVertexAttribArray(0),n.vertexAttribPointer(0,4,n.FLOAT,!1,32,0),n.vertexAttribDivisor(0,1),n.enableVertexAttribArray(1),n.vertexAttribPointer(1,4,n.FLOAT,!1,32,16),n.vertexAttribDivisor(1,1),n.bindVertexArray(null);const se=new Float32Array(ht),Ae=new Float32Array(ht),re=new Float32Array(ht),ke=new Float32Array(ht),fe=new Float32Array(ht),Ee=new Float32Array(ht),zs=new Float32Array(ht),Cs=new Float32Array(ht),wn=new Float32Array(ht),Re={powder:[.0085,.42],wet:[.024,.5],blizzard:[.0075,.4]}[p0],Ds=1,Bs=19;function i1(o,t){const e=Ds+(Bs-Ds)*Math.pow(_(),1.15),s=_()*1.24-.12,l=t?1.05+_()*.06:_()*1.2-.1,f=e*V0*2,r=T0(T0(W0,d0(ct,e)),T0(d0(P0,(s-.5)*f),d0(dt,(l-.5)*f)));se[o]=r[0],Ae[o]=r[1],re[o]=r[2];const a=Math.sqrt(-2*Math.log(_()+1e-6))*Math.cos(S0*_()),c=O(Re[0]*Math.exp(Re[1]*a),Re[0]*.3,Re[0]*2.3);zs[o]=c,wn[o]=J1*(.6+.4*Math.sqrt(c/Re[0]))*(.8+_()*.4),ke[o]=yo,fe[o]=-wn[o],Ee[o]=xe,Cs[o]=.001+_()*.99}for(let o=0;o<ht;o++)i1(o,!1);const O0=20,jt=new Float32Array(O0*O0),Kt=new Float32Array(O0*O0);let po=0;const K0=12,Is=new Float32Array(K0*K0),u1=new Float32Array(K0*K0),Ws=[];for(let o=0;o<4;o++)Ws.push([(1.6+f0()*3.4)*(f0()<.5?-1:1),(1.4+f0()*2.8)*(f0()<.5?-1:1),(.11+f0()*.31)*(f0()<.5?-1:1),f0()*S0]);const Vs={powder:.34,wet:.2,blizzard:.9}[p0];let Vr=0;function qr(o){if(!(++Vr&1))for(let t=0;t<K0;t++)for(let e=0;e<K0;e++){const s=(e+.5)/K0,l=(t+.5)/K0;let f=0,r=0;for(let a=0;a<4;a++){const c=Ws[a],u=s*c[0]*6.283+l*c[1]*6.283+o*c[2]*6.283+c[3];f+=Math.sin(u),r+=Math.cos(u*.73+c[3])}Is[t*K0+e]=f*.5*Vs,u1[t*K0+e]=r*.34*Vs}}const vo=new Float32Array(j0),le=new Float32Array(j0),xo=new Float32Array(j0),Yt=new Float32Array(j0),Mo=new Float32Array(j0),Zt=new Float32Array(j0),Fe=new Float32Array(j0),Lo=new Float32Array(j0),qs=new Float32Array(j0),h1=new Uint8Array(j0),m1=new Float32Array(j0);let p1=0;function Po(o,t,e,s,l,f){let r=-1;for(let a=0;a<j0;a++){const c=(p1+a)%j0;if(Lo[c]<=0){r=c;break}}r<0&&(r=p1),p1=(r+1)%j0,vo[r]=t[0],le[r]=t[1],xo[r]=t[2],Yt[r]=e[0],Mo[r]=e[1],Zt[r]=e[2],Fe[r]=s,Lo[r]=qs[r]=l,h1[r]=o,m1[r]=f||0}const Y0=.05;let Uo=.34+f0()*.1,Os=Uo,v1=14+f0()*30,Se=1,Gs=1,d1=2+f0()*7,Hs=(lt?300:lo?255:210)+f0()*260,bn=0,Te=0,gn=1,Xs=0,x1=!0,Ne=0,Or=0,yn=0,$t=0,An=0,Le=0,M1=0,w1=0;const ft=v.sound,ae=new Float32Array(pt*h0),xf=(o,t)=>{const e=O(Math.floor(o*O0),0,O0-1);return O(Math.floor(t*O0),0,O0-1)*O0+e};function js(o,t,e){let s=0,l=0,f=0,r=0,a=0;for(const c of o){const u=C[c];if(u<.003)continue;C[c]=0,s+=u,l+=b0[c],f+=Gt[c],r+=k0[c],a++;const p=O(2+Math.floor(u*90),2,5),m=Xe(b0[c],k0[c]);for(let g=0;g<p;g++)Po(1,[b0[c]+(_()-.5)*.3,Gt[c]+_()*.05,k0[c]+(_()-.5)*.3],[(_()-.5)*.7*t+yo*.2,-_()*.6,(_()-.5)*.7*t],.035+u*1.5*_()+.04*_(),4,m>=0?u/p*.6:0);e&&Po(2,[b0[c],Gt[c],k0[c]],[(_()-.5)*.4+yo*.3,-.35,(_()-.5)*.4],.3+_()*.4,1.4+_(),0)}return{tot:s,n:a,c:a?[l/a,f/a,r/a]:null}}function kn(o,t){const e=js(o.r.cells,t,!0);if(e.tot>.004){for(const s of o.below)for(const l of s.r.cells)C[l]+=e.tot/Math.max(1,o.r.cells.length)*.35;if(ft.on&&w1<=0){const s=e.c?O((go(e.c)[0]-.5)*1.6,-1,1):0;ft.hit("noise",.12+Math.min(.3,e.tot*2),{cutoff:900,dur:.45,pan:s}),w1=.15}}o.cd=1.5}function Ks(o,t){if(o.slide)return;let e=0;for(const s of o.r.cells)e+=C[s];e/o.r.cells.length<(t?.008:o.Lc)||(o.slide={v:t?2:.6,t:0,top:t?Math.max(1,Math.floor(o.r.h*.5)):_()<.5?o.r.h-1:Math.max(1,Math.floor(o.r.h*(.5+_()*.4))),tot0:e,landed:!1})}function Gr(o){const t=o.slide,e=o.r;t.t+=Y0,t.v=Math.min(10,t.v+Y0*7);let s=t.v*Y0;for(;s>0;){const f=Math.min(1,s);s-=f;for(let r=0;r<e.w;r++){const a=e.y*h0+e.x+r,c=C[a]*f;if(c>.0015){const u=o.eave[0],p=o.eave[1],m=e.w>1?r/(e.w-1):.5,g=eo(u,p,m),b=o.out,i=c>.02?2:1,h=Xe(g[0]+b[0]*.8,g[2]+b[2]*.8);for(let d=0;d<i;d++)Po(1,[g[0]+b[0]*.1+(_()-.5)*.3,g[1],g[2]+b[2]*.1+(_()-.5)*.3],[b[0]*(.8+t.v*.15),-.3-_()*.5,b[2]*(.8+t.v*.15)],.05+c*2+_()*.06,4,h>=0?c/i*1.5:0);_()<.4&&Po(2,g,[b[0]*.8,-.4,b[2]*.8],.4+_()*.5,1.5,0)}for(let u=0;u<=t.top;u++){const p=(e.y+u)*h0+e.x+r,m=u+1<=t.top?C[p+h0]:0;C[p]=C[p]*(1-f)+m*f}}}let l=0;for(const f of e.cells)l+=C[f];(l<t.tot0*.08||t.t>5)&&(o.slide=null)}function Hr(){if(Or+=Y0,x1=!0,v1-=Y0,v1<=0){const r=f0();Os=r<.26?.06+f0()*.16:r<.78?.32+f0()*.26:.72+f0()*.28,v1=12+f0()*f0()*95}Uo+=(Os-Uo)*Y0*.16,d1-=Y0,d1<=0&&(Gs=.45+f0()*f0()*1.5,d1=1.6+f0()*9),Se+=(Gs-Se)*Y0*.55;let o=0;if(Te>0){if(bn+=Y0,o=bn/Te,bn>=Te&&(Te=0,Hs=(lt?260:190)+f0()*280,gn>.6))for(let r=0;r<ut.length;r++){const a=ut[r];Ao[a]===1&&(Ot[a]=Math.max(Ot[a],.6*xn[a]),st[a]=1)}}else(Hs-=Y0)<=0&&(bn=0,Te=16+f0()*40,gn=.3+f0()*.7,Ts());const t=ye*(1+5*$t)*(.34+1.45*Uo)*(o>0?Math.max(0,1-o*4):1);Le=o>0?Math.min(1,o*3)*(.45+.55*gn):Math.max(0,Le-Y0*.01);const e=o>0?(.0012+o*.004)*gn:0,s=(++Xs&1)===0,l=Y0*2;for(let r=0;s&&r<Ht.length;r++){const a=Ht[r],c=Z0[a],u=t*Lt[a]*Xt[a]*l;if(c===ko){const p=Ao[a];if(p===4)continue;if(p<=2){const m=Ot[a];C[a]+=u*(1-m),st[a]=Math.min(1.1,st[a]+u*m*50),Ot[a]=Math.max(0,m-u*(p===1?20:35)),st[a]-=l*st[a]*(C[a]>.03?.03:.002)}else C[a]+=u;if(e>0){const m=Math.min(C[a],e*l*1.3*O(2.1-Xt[a],.35,1.9));C[a]-=m,p<=2&&(st[a]=Math.min(1.1,st[a]+m*40))}}else C[a]+=u*No[a],C[a]>ao[a]&&(C[a]=ao[a]),e>0&&(C[a]=Math.max(0,C[a]-e*l*(c===Me?.8:2)))}for(const r of $0){if(r.slide){Gr(r);continue}if(_()<.012*(o>0?4:1)){let a=0;for(const c of r.r.cells)a+=C[c];a/r.r.cells.length>r.Lc*(o>0?.3:1)&&Ks(r,!1)}}for(const r of xt){if(r.cd-=Y0,r.cd>0)continue;let a=0;for(const c of r.r.cells)a+=C[c];a/r.r.cells.length>r.cap*(o>0?.4:1)&&_()<.08&&kn(r,.5)}const f=p0==="blizzard"?.25:0;(po>.15||f>0&&Xs%4===0)&&jr(po>.15?f:f*4),po>.2&&Kr()}let Xr=0;function jr(o){let t=!1;ae.fill(0);for(let e=0;e<ut.length;e++){const s=ut[e];if(C[s]<.002||Ao[s]===4)continue;let l=Vo*o,f=qo*o,r=o;const a=a1[s];if(a>=0&&(jt[a]>.15||jt[a]<-.15||Kt[a]>.15||Kt[a]<-.15)){const d=jt[a],w=Kt[a],R=Math.hypot(d,w);if(R>.15){const A=On[s],S=Z1*d*2*V0*Math.min(A,12),F=w*2*V0*A*A/Math.max(.5,W0[1]-Gt[s]),N=Math.hypot(S,F)||1;l+=S/N*R,f+=F/N*R,r=Math.hypot(l,f)}}if(r<.15)continue;t=!0;const c=Math.min(.22,(r-.12)*1.4*Y0)*(r===o?.15:1),u=C[s]*c,p=Math.abs(l)/(Math.abs(l)+Math.abs(f)+1e-6),m=s%h0,g=s/h0|0,b=l>0?m+1:m-1,i=f>0?g+1:g-1;let h=0;if(b>=0&&b<mt){const d=g*h0+b;!(yt[d]&3)&&!(yt[s]&1&&!1)&&(ae[d]+=u*p,h+=u*p)}if(i>=0&&i<pt){const d=i*h0+m;yt[d]&3||(ae[d]+=u*(1-p),h+=u*(1-p))}ae[s]-=h,r>.4&&_()<u*120+.004&&Po(2,[b0[s],.1,k0[s]],[l*1.2,.3,f*1.2],.3+_()*.4,1+_()*.6,0)}if(t){for(let e=0;e<ut.length;e++){const s=ut[e];ae[s]!==0&&(C[s]=Math.max(0,C[s]+ae[s]))}if(!(++Xr%4))for(let e=0;e<ut.length;e++){const s=ut[e],l=s%h0;for(let f=0;f<2;f++){const r=f===0?l+1<mt?s+1:-1:s+h0<pt*h0?s+h0:-1;if(r<0||yt[r]&2||(yt[r]|yt[s])&1)continue;const a=C[s]-C[r];if(a>.06||a<-.06){const c=(a>0?a-.06:a+.06)*.25;C[s]-=c,C[r]+=c}}}}}function Kr(){for(let o=0;o<dn.length;o++){const t=dn[o],e=a1[t];if(e<0||C[t]<.002)continue;const s=jt[e],l=Kt[e];if(s<.25&&s>-.25&&l<.25&&l>-.25)continue;const f=Math.hypot(s,l);if(f<.25)continue;const r=Z0[t],a=C[t]*Math.min(.5,(f-.2)*(r===Oo?2.5:r===Me?.6:1.4)*Y0);C[t]-=a;const c=On[t],u=Z1*s*2*V0*Math.min(c,10),p=l*.5,m=Xe(b0[t]+u*.8,k0[t]+p);if(m>=0&&!(yt[m]&2)&&(C[m]+=a*.7),_()<a*220&&Po(2,[b0[t],Gt[t]+.05,k0[t]],[u*1.5,.2+l*2,p*.5],.2+_()*.35,.9+_()*.8,0),r===Oo&&f>.9){const g=xt.find(b=>b.r.id===Oe[t]);g&&g.cd<=0&&_()<.05&&kn(g,1)}}}let En=!1,b1=0,g1=0,Rn=0,Fn=0,Pe=null,y1=30;function A1(o,t,e,s,l,f){for(let r=0;r<O0;r++)for(let a=0;a<O0;a++){const c=(a+.5)/O0,u=(r+.5)/O0,p=(c-o)*(c-o)+(u-t)*(u-t);if(p>l*l*4)continue;const m=Math.exp(-p/(l*l))*f,g=r*O0+a;jt[g]+=(e-jt[g])*m,Kt[g]+=(s-Kt[g])*m}}const Yr=(o,t,e,s)=>{const l=s[0]-e[0],f=s[1]-e[1],r=l*l+f*f||1e-9,a=O(((o-e[0])*l+(t-e[1])*f)/r,0,1);return Math.hypot(o-e[0]-l*a,t-e[1]-f*a)},k1=E0.map(o=>{const t=go(o.p[0]),e=go(o.p[1]);return Object.assign(o,{sa:t,sb:e,zz:Math.min(t[2],e[2])})}).filter(o=>o.zz>.5);function Ys(o,t){const e=o,s=1-t;let l=null,f=1e9;for(const r of k1){const a=Yr(e,s,r.sa,r.sb),c=O(.5/r.zz,.018,.05);a<c&&a/c<f&&(f=a/c,l=r)}if(ft.on&&(ft.hit("click",.35,{pan:(e-.5)*1.4}),ft.note(38+Math.floor(_()*4),{dur:.08,wave:"triangle",vel:.25,cutoff:500,pan:(e-.5)*1.4})),!l){for(let r=0;r<8;r++){const a=r/8*S0;A1(e+Math.cos(a)*.03,s+Math.sin(a)*.03,Math.cos(a)*.9,Math.sin(a)*.9,.04,.6)}return}if(l.kind==="branch"){kn(l.br,1.2);for(const r of l.br.kids)_()<.7&&kn(r,1)}else if(l.kind==="roof")Ks(l.roof,!0);else{const r=js(l.r.cells,1,!0);ft.on&&r.tot>.003&&ft.hit("noise",.15+Math.min(.3,r.tot*3),{cutoff:1100,dur:.3,pan:(e-.5)*1.4})}}const Ue=[0,0,0,0];if(de==="fox"){const o=q+L0*.5+.7,t=6.3+f0()*2.5+(at==="walk"?5:0),e=-(o+q+L0*.5+1),s=11,l=Math.hypot(e,s);Ue[0]=o,Ue[1]=t,Ue[2]=e/l,Ue[3]=s/l}qt==="plough"&&f0();const E1=16e3;let Sn=new Float32Array(2048),R1=0,F1=0,S1=0,ce=0,_o=12345,T1=6+_()*10,N1=20+_()*30,zo=0;const Zr=[55,52,57,50][Math.floor(_()*4)];function $r(o){Sn.length<o&&(Sn=new Float32Array(o));const t=bt==="sodium"?.006:.0035;for(let e=0;e<o;e++){_o^=_o<<13,_o^=_o>>>17,_o^=_o<<5;const s=(_o>>>0)/4294967296*2-1;R1+=(s-R1)*.03,F1+=(R1-F1)*.05,S1+=(s-S1)*(.04+.2*zo),ce+=S0*100/E1,ce>S0&&(ce-=S0);let l=F1*.9+S1*zo*.5+(Math.sin(ce)*.7+Math.sin(ce*2)*.35+Math.sin(ce*3)*.12)*t;Sn[e]=l}return Sn.subarray(0,o)}const Zs=D.cmp,$s=D.flk,Tn=new Float32Array(24),L1=new Float32Array(18);let Qt=0;for(let o=0;o<te&&Qt<6;o++){const t=go(kt[o].hp);t[2]<.5||(Tn.set([t[0],t[1],1,O(kt[o].size*.9/t[2],.004,.06)],Qt*4),L1.set(d0(c0.lc,.5),Qt*3),Qt++)}let P1=-1;if(z==="harbour"){const o=go([-32,19.2,150]);o[2]>0&&(P1=Qt,Tn.set([o[0],o[1],0,.012],Qt*4),L1.set([1,.9,.7],Qt*3),Qt++)}const Qr={powder:.85,wet:.95,blizzard:.75}[p0],Jr={powder:.35,wet:.5,blizzard:.15}[p0],tf={powder:2.5,wet:1.4,blizzard:3.5}[p0],of=(p0==="blizzard"?.013:.008)+(bt==="dusk"?.004:0),ef=q*.5,nf=L0>.5?(q+L0*.55)*((f0()<.5?1:-1)*(at==="walk"?0:1)||-1):0,sf=[r1,As,mn,ks,Es,Ps,D.noise];let _e=0;function U1(o,t,e,s,l,f,r,a){const c=_e*8;It[c]=o,It[c+1]=t,It[c+2]=e,It[c+3]=s,It[c+4]=l,It[c+5]=f,It[c+6]=r,It[c+7]=a,_e++}function Qs(o){if(x1){x1=!1,Ne=0;for(let r=0;r<Ht.length;r++){const a=Ht[r],c=a*2,u=C[a];u>Ne&&Lt[a]>.2&&(Ne=u),c1[c]=u>0?Math.min(255,Math.sqrt(u*1.6667)*255+.5):0,c1[c+1]=Math.min(255,st[a]*212+.5)}n.bindTexture(n.TEXTURE_2D,Ps),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texSubImage2D(n.TEXTURE_2D,0,0,0,h0,Do,n.RG,n.UNSIGNED_BYTE,c1)}n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,j,j),xs(),n.disable(n.DEPTH_TEST),n.useProgram(Zs.p);const t=Zs.u;for(let r=0;r<7;r++)n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,sf[r]);const e=.035*(p0==="blizzard"?1.25:1)*(.72+.62*Uo)*(1+2.2*$t)*(1-.7*Le);D.owner!==N0&&(n.uniform1i(t.tC,0),n.uniform1i(t.tS,1),n.uniform1i(t.tI,2),n.uniform1i(t.tR,3),n.uniform1i(t.tV,4),n.uniform1i(t.tA,5),n.uniform1i(t.tN,6),n.uniform3fv(t.uFogC,c0.fog),n.uniform3fv(t.uEye,W0),n.uniform3fv(t.uFwd,ct),n.uniform3fv(t.uRt,P0),n.uniform3fv(t.uUp,dt),n.uniform1f(t.uTan,V0),n.uniform3fv(t.uHC,L1),n.uniform1i(t.uNH,Qt),n.uniform4fv(t.uFx,Ue),n.uniform4f(t.uSn,.93,.96,1,p0==="blizzard"?.85:0),n.uniform4f(t.uTr,ef,q,Y1,nf)),P1>=0&&(Tn[P1*4+2]=Math.pow(Math.max(0,Math.sin(o*1.4)),12)*2.5),n.uniform4fv(t.uH,Tn),n.uniform4f(t.uA,o,e,Math.min(1,$t*1.2+(p0==="blizzard"?.2:0)),c0.expo),n.uniform4f(t.uB,of+.02*$t,et,j,Le*.8),n.uniform4f(t.uAu,qt==="aurora"?1:0,o,0,0);{const r=O(Math.ceil(Ne/.05)+1,2,6);n.uniform1i(t.uCapN,r),n.uniform1f(t.uCapS,Math.max(.012,Math.min(.05,(Ne+.01)/r)))}n.bindVertexArray(D.vao0),n.drawArrays(n.TRIANGLES,0,3),_e=0;for(let r=0;r<j0;r++){if(Lo[r]<=0)continue;const a=Lo[r]/qs[r];h1[r]===2?U1(vo[r],le[r],xo[r],Fe[r]*(1.6-a*.8),Yt[r],Mo[r],Zt[r],2+Math.min(.999,a*.9)):U1(vo[r],le[r],xo[r],Fe[r],Yt[r],Mo[r],Zt[r],1.999)}const s=Math.floor(ht*O(.22+.74*Uo+.45*$t,0,1)*(1-.85*Le)),l=1+.7*$t;for(let r=0;r<s;r++)U1(se[r],Ae[r],re[r],zs[r]*l,ke[r],fe[r],Ee[r],Cs[r]);n.bindBuffer(n.ARRAY_BUFFER,Us),n.bufferSubData(n.ARRAY_BUFFER,0,It.subarray(0,_e*8)),n.enable(n.BLEND),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ONE_MINUS_SRC_ALPHA),n.useProgram($s.p);const f=$s.u;n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,mn),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,D.noise),D.owner!==N0&&(n.uniform1i(f.tI,0),n.uniform1i(f.tN,1),n.uniform1f(f.uBR,et),n.uniformMatrix4fv(f.uVP,!1,Wo),n.uniform3fv(f.uAmb,d0(T0(T0(c0.sky,c0.fog),c0.moon),2)),n.uniform3fv(f.uFogF,d0(c0.fog,4)),n.uniform3fv(f.uEye,W0),n.uniform3fv(f.uRt,P0),n.uniform4fv(f.uLP,sn),n.uniform4fv(f.uLC,rn),n.uniform1i(f.uNL,te),D.owner=N0),n.uniform4f(f.uC,j,V0,o,c0.expo),n.uniform4f(f.uFoc,9,13,Qr,Jr*.9),n.bindVertexArray(_s),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,_e),n.bindVertexArray(null),n.disable(n.BLEND)}let rf=!1;const C0={t:-(6+f0()*18),dur:6,s:.5,v:.5,dy:0,dir:-We},ff=(o,t)=>{t=Math.min(t,.25);const e=v.input,s=e.taps();if(e.inside&&e.down){En||(En=!0,Rn=0,Fn=0,b1=e.x,g1=e.y,Pe=s.length?s[s.length-1]:{x:e.x,y:e.y});const i=e.x-b1,h=e.y-g1,d=Math.hypot(i,h);if(Fn+=d,Rn+=t,d>8e-4&&t>0){const w=Math.min(3.5,d/t)/(d/t);A1(e.x,1-e.y,i/t*w*1.6,-h/t*w*1.6,.085,.6),zo=Math.min(1,zo+d*6)}Fn<.03&&Rn>.3&&(An+=t),b1=e.x,g1=e.y,y1=0}else{if(En)En=!1,Fn<.03&&Rn<.3&&Pe&&Ys(Pe.x,Pe.y),Pe=null;else for(const i of s)Ys(i.x,i.y);An=0,y1+=t}if(rf=e.inside,$t+=((An>0?1:0)-$t)*Math.min(1,t*(An>0?.9:.35)),y1>12)if(C0.t<0)C0.t+=t,C0.t>=0&&(C0.dur=3.5+f0()*7,C0.s=.3+f0()*.55,C0.v=.32+f0()*.5,C0.dy=(f0()-.5)*.22,C0.dir=f0()<.8?-We:We);else{C0.t+=t;const i=C0.t/C0.dur;i>=1?C0.t=-(16+f0()*f0()*60):(A1(wt(C0.dir>0?-.1:1.1,C0.dir>0?1.1:-.1,i),C0.v+C0.dy*i,C0.dir*C0.s,.05+C0.dy,.12,.15*t*10),zo=Math.max(zo,C0.s*.45*Math.sin(i*Math.PI)))}const l=Math.exp(-t*1.1);po=0;for(let i=0;i<O0*O0;i++){jt[i]*=l,Kt[i]*=l;const h=Math.abs(jt[i])+Math.abs(Kt[i]);h>po&&(po=h)}zo*=Math.exp(-t*1.5),yn+=t;let f=0;for(;yn>=Y0&&f<6;)yn-=Y0,f++,Hr();f>=6&&(yn=0);const r=Math.floor(ht*O(.22+.74*Uo+.45*$t,0,1));qr(o);const a=W0[0],c=W0[1],u=W0[2],p=yo*(p0==="blizzard"?Se*1.05:.55+.45*Se),m=xe*(.5+.5*Se),g=Math.min(1,t*tf),b=Math.min(1,t*5);for(let i=0;i<r;i++){const h=se[i]-a,d=Ae[i]-c,w=re[i]-u,R=h*ct[0]+d*ct[1]+w*ct[2];if(R<.3||R>Bs+3){i1(i,!1);continue}const A=.5+(h*P0[0]+w*P0[2])/(R*V0)*.5,S=.5+(h*dt[0]+d*dt[1]+w*dt[2])/(R*V0)*.5;if(Ae[i]<0||S<-.12){i1(i,!0);continue}if(A<-.15){const B=R*V0*2*1.28;se[i]+=P0[0]*B,re[i]+=P0[2]*B;continue}if(A>1.15){const B=R*V0*2*1.28;se[i]-=P0[0]*B,re[i]-=P0[2]*B;continue}S>1.25&&(fe[i]=-wn[i]);let F=p,N=-wn[i],H=m;if(A>0&&A<1&&S>0&&S<1){const B=((S*K0|0)*K0+(A*K0|0)+(i&3)*53)%(K0*K0);F+=Is[B],N+=u1[B],H+=u1[(B+67)%(K0*K0)]*.7}if(po>.05&&A>0&&A<1&&S>0&&S<1){const B=(S*O0|0)*O0+(A*O0|0),r0=jt[B],t0=Kt[B];if(r0!==0||t0!==0){const U0=2*V0*Math.min(R,9);F+=(r0*P0[0]+t0*dt[0])*U0,N+=t0*dt[1]*U0,H+=(r0*P0[2]+t0*dt[2])*U0}}const V=po>.3?b:g;ke[i]+=(F-ke[i])*V,fe[i]+=(N-fe[i])*V,Ee[i]+=(H-Ee[i])*V,se[i]+=ke[i]*t,Ae[i]+=fe[i]*t,re[i]+=Ee[i]*t}for(let i=0;i<j0;i++)if(!(Lo[i]<=0))if(Lo[i]-=t,h1[i]===1){Mo[i]-=9.8*t*.8;const h=Math.exp(-t*.8);if(Yt[i]*=h,Zt[i]*=h,vo[i]+=Yt[i]*t,le[i]+=Mo[i]*t,xo[i]+=Zt[i]*t,le[i]<=.02){const d=Xe(vo[i],xo[i]);d>=0&&m1[i]>0&&!(yt[d]&2)&&(C[d]+=m1[i]),_()<.5&&Po(2,[vo[i],.05,xo[i]],[Yt[i]*.2,.25,Zt[i]*.2],.15+Fe[i]*2,.8,0),Lo[i]=0,ft.on&&M1<=0&&Fe[i]>.08&&(ft.hit("kick",.25,{pan:O((go([vo[i],0,xo[i]])[0]-.5)*1.6,-1,1)}),ft.hit("noise",.18,{cutoff:450,dur:.6}),M1=.6)}}else Yt[i]+=(yo*.3-Yt[i])*t*.8,Mo[i]+=(-.15-Mo[i])*t*.8,Zt[i]+=(xe*.3-Zt[i])*t*.8,vo[i]+=Yt[i]*t,le[i]+=Mo[i]*t,xo[i]+=Zt[i]*t;if(M1-=t,w1-=t,ft.on){if(T1-=t,T1<0){const h=_()<.3?3:1;for(let d=0;d<h;d++){const w=d*2.4,R=.09;for(const[A,S,F]of[[-12,.5,4],[0,1,3.5],[3,.55,3],[7,.4,2.5],[12,.6,2.2],[19,.2,1.4],[24,.15,1]])ft.note(Zr+A,{dur:F,vel:R*S,wave:"sine",pan:-.2,at:w,attack:.004})}T1=28+_()*30}if(N1-=t,N1<0){const h=_()<.5?-.75:.75,d=2+Math.floor(_()*2);for(let w=0;w<d;w++){const R=w*(.22+_()*.1);ft.note(52+Math.floor(_()*3),{dur:.07,wave:"sawtooth",vel:.05,cutoff:650,pan:h,at:R}),ft.hit("noise",.05,{cutoff:700,dur:.06,pan:h,at:R})}N1=40+_()*50}const i=Math.round(Math.min(t,.2)*E1);i>0&&ft.pcm($r(i),E1,{vel:.55})}Qs(o)};return v.dbg&&(v.dbg.get=()=>{let o=0,t=0,e=0,s=0,l=0,f=0;for(const r of $0)for(const a of r.r.cells)o+=C[a],t++;for(let r=0;r<ut.length;r++){const a=ut[r];Ao[a]===1?(e+=C[a],s++,l+=st[a]):f++}return{roof:o/Math.max(1,t),street:e/Math.max(1,s),wet:l/Math.max(1,s),cells:Ht.length,verts:Ko,regions:Eo.length,branches:xt.length,roofs:$0.length,wins:Ut.length,knock:k1.length,slides:$0.filter(r=>r.slide).length,shY:Ho,NF:ht,park:Jo,veh:mo.map(r=>r.kind+":"+r.state+":"+(r.side<0?"L":"R")+r.z.toFixed(0)+(r.flip<0?"<":">")+(r.r||r.state==="left"?"":":NOREGION")),kn:k1.map(r=>[r.kind,((r.sa[0]+r.sb[0])/2).toFixed(2),(1-(r.sa[1]+r.sb[1])/2).toFixed(2),r.zz.toFixed(1)])}}),Qs(0),ff}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
