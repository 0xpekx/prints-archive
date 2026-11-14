// Milk Swirl: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/126.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(se){se&&function(){"use strict";const ie=new WeakMap,Ne=1,T=128,w0=24,_e=4,I0=4,Y=256,G0=1.04,Ue=10,N=Math.PI*2,ue=(o,a,i)=>o<a?a:o>i?i:o,C=o=>{const a=parseInt(o.slice(1),16);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255].map(i=>Math.pow(i,2.2))},C0=(o,a,i,l,x)=>{const m=o*Math.PI/180,y=a*Math.PI/180,D=[x[0]-i*Math.sin(y)*Math.cos(m),x[1]-i*Math.cos(y)*Math.cos(m),x[2]+i*Math.sin(m)],U=Math.tan(l*Math.PI/180),S=(R,h)=>R.map((_,K)=>_-h[K]),P=R=>{const h=Math.hypot(...R);return R.map(_=>_/h)},j=(R,h)=>[R[1]*h[2]-R[2]*h[1],R[2]*h[0]-R[0]*h[2],R[0]*h[1]-R[1]*h[0]],M=P(S(x,D)),Z=P(j(M,[0,0,1])),A=j(Z,M),w=[0,1,2].map(R=>M[R]-.24*U*A[R]),F=-D[2]/w[2]*Math.hypot(...w);return{E:D,F:M,R:Z,U:A,th:U,fd:F}},qe=C0(38,12,22,11.5,[.5,.5,0]),We=C0(34,12,25,12.5,[.5,1.5,0]),c0=[[0,-.78],[7.2,-.78],[10.5,.5],[13,.68],[13.5,.5]],O0=.17,le=-1.55,H=(()=>{const[o,a]=[c0[1],c0[2]],i=[a[0]-o[0],a[1]-o[1]],l=Math.hypot(...i),x=[i[0]/l,i[1]/l],m=[-x[1],x[0]],y=[o[0]+O0*m[0],o[1]+O0*m[1]];return y[0]+-y[1]/x[1]*x[0]})();function fe(o,a,i){const l=o*2-1,x=1-a*2,{E:m,F:y,R:D,U,th:S}=i,P=[0,1,2].map(M=>y[M]+l*S*D[M]+x*S*U[M]),j=-m[2]/P[2];return[m[0]+P[0]*j,m[1]+P[1]*j]}const de=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,r0=o=>`#version 300 es
precision highp float;
precision highp sampler2D;
${o?"#define Q8 1":""}
in vec2 vUv;
out vec4 o;
#ifdef Q8
vec4 decS(vec4 s) { return (s - vec4(0.5, 0.5, 0.0, 0.5)) * vec4(12.0, 12.0, 24.0, 16.0); }
vec4 encS(vec4 s) { return clamp(s / vec4(12.0, 12.0, 24.0, 16.0) + vec4(0.5, 0.5, 0.0, 0.5), 0.0, 1.0); }
vec4 decD(vec4 d) { return d * 12.0; }
vec4 encD(vec4 d) { return clamp(d / 12.0, 0.0, 1.0); }
#else
vec4 decS(vec4 s) { return s; }
vec4 encS(vec4 s) { return s; }
vec4 decD(vec4 d) { return d; }
vec4 encD(vec4 d) { return d; }
#endif
`,X0=`
uniform sampler2D uS;
uniform vec4 uP[16];
vec4 Sb(vec2 uv) { return decS(textureLod(uS, uv, 0.0)); }
vec4 Sf(ivec2 i) { return decS(texelFetch(uS, clamp(i, ivec2(0), ivec2(${T-1})), 0)); }
vec2 Up(vec2 uv) {
  float e = 1.0 / ${T}.0, h = 2.0 * uP[3].y / ${T}.0;
  vec2 g = vec2(Sb(uv + vec2(e, 0.0)).w - Sb(uv - vec2(e, 0.0)).w, Sb(uv + vec2(0.0, e)).w - Sb(uv - vec2(0.0, e)).w);
  return Sb(uv).xy - uP[0].y * g / (2.0 * h);
}
bool ins(ivec2 i) { vec2 p = ((vec2(i) + 0.5) / ${T}.0 * 2.0 - 1.0) * uP[3].y; return dot(p, p) < 1.0; }`,je=o=>r0(o)+X0+`
uniform sampler2D uD, uN;
float fs(float g) { return g / (g + uP[1].z); }
float cu(ivec2 i, float h) { vec4 a = Sf(i + ivec2(1, 0)), b = Sf(i - ivec2(1, 0)), c = Sf(i + ivec2(0, 1)), d = Sf(i - ivec2(0, 1)); return (a.y - b.y - c.x + d.x) / (2.0 * h); }
float psi(vec2 q, float T) { return textureLod(uN, q * 0.12 + vec2(T, -0.7 * T), 0.0).g + 0.4 * textureLod(uN, q * 0.25 - vec2(0.6 * T, T) + 0.37, 0.0).g; }
void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec2 uv = (vec2(ij) + 0.5) / ${T}.0;
  float Wd = uP[3].y, h = 2.0 * Wd / ${T}.0, dt = uP[0].x, al = uP[0].y;
  vec2 p = (uv * 2.0 - 1.0) * Wd;
  float r = length(p);
  vec4 c = Sf(ij);
  if (r > 1.0) {
    vec4 s = Sb((p / max(r, 1e-4) * (1.0 - 1.5 * h)) / Wd * 0.5 + 0.5);
    o = encS(vec4(0.0, 0.0, s.z, s.w));
    return;
  }
  vec2 u0 = Up(uv);
  vec2 um = Up(uv - 0.5 * dt * u0 / (2.0 * Wd));
  vec2 uvb = uv - dt * um / (2.0 * Wd);
  float G = Sb(uvb).z;
  vec2 u = Up(uvb);
  vec4 E = Sf(ij + ivec2(1, 0)), Wt = Sf(ij - ivec2(1, 0)), Nn = Sf(ij + ivec2(0, 1)), So = Sf(ij - ivec2(0, 1));
  float div = (E.x - Wt.x + Nn.y - So.y) / (2.0 * h) - al * (E.w + Wt.w + Nn.w + So.w - 4.0 * c.w) / (h * h);
  G *= exp(-dt * clamp(div, -12.0, 12.0));
  int ns = int(uP[0].w);
  for (int k = 0; k < ns; k++) {
    vec4 A = uP[4 + k], B = uP[8 + k];
    vec2 ab = A.zw - A.xy;
    float tt = clamp(dot(p - A.xy, ab) / max(dot(ab, ab), 1e-8), 0.0, 1.0);
    vec2 q = p - A.xy - ab * tt;
    float w = exp(-dot(q, q) / (B.y * B.y));
    G += B.x * w * max(0.0, 1.0 - G / uP[3].w);
    u += (dot(ab, ab) > 0.0 ? B.zw : q * (B.z / B.y)) * w;
  }
  G *= exp(-dt * uP[1].w);
  // Marangoni stress, from low to high surface tension
  vec2 gf = vec2(fs(E.z) - fs(Wt.z), fs(Nn.z) - fs(So.z)) / (2.0 * h);
  vec4 nz = textureLod(uN, uv * 0.9 + 0.17, 0.0);
  vec4 dy = decD(textureLod(uD, uv, 0.0));
  float mob = (1.0 + uP[2].z * (nz.g * 0.55 + nz.b * 0.45 - 0.5) * 2.0) / (1.0 + uP[2].w * (dot(dy.rgb, vec3(0.2)) + dy.a));
  u -= uP[1].x * mob * gf * dt;
  // vorticity confinement
  float wc = cu(ij, h);
  vec2 gw = vec2(abs(cu(ij + ivec2(1, 0), h)) - abs(cu(ij - ivec2(1, 0), h)), abs(cu(ij + ivec2(0, 1), h)) - abs(cu(ij - ivec2(0, 1), h)));
  float gwl = length(gw);
  if (gwl > 1e-4) { vec2 nv = gw / gwl; u += uP[2].x * h * vec2(nv.y, -nv.x) * wc * dt; }
  // slow soap-fat convection where the surface is partly soapy
  float f = fs(G), act = 4.0 * f * (1.0 - f);
  float T = uP[0].z * 0.035, e2 = 0.03;
  vec2 q = p * 1.6;
  vec2 st = vec2(psi(q + vec2(0.0, e2), T) - psi(q - vec2(0.0, e2), T), psi(q - vec2(e2, 0.0), T) - psi(q + vec2(e2, 0.0), T)) / (2.0 * e2);
  u += uP[2].y * act * st * dt;
  u *= exp(-dt * uP[1].y) * (1.0 - uP[3].x);
  u *= smoothstep(1.0, 1.0 - 2.5 * h, r);
  float sp = length(u);
  if (sp > 5.0) u *= 5.0 / sp;
  o = encS(vec4(u, clamp(G * (1.0 - uP[3].x), 0.0, uP[3].w * 1.2), c.w));
}`,Ie=o=>r0(o)+X0+`
void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy);
  vec4 c = Sf(ij);
  if (!ins(ij)) { o = encS(c); return; }
  float h = 2.0 * uP[3].y / ${T}.0;
  vec4 E = Sf(ij + ivec2(1, 0)), Wt = Sf(ij - ivec2(1, 0)), Nn = Sf(ij + ivec2(0, 1)), So = Sf(ij - ivec2(0, 1));
  bool ie = ins(ij + ivec2(1, 0)), iw = ins(ij - ivec2(1, 0)), in_ = ins(ij + ivec2(0, 1)), is = ins(ij - ivec2(0, 1));
  float pe = ie ? E.w : c.w, pw = iw ? Wt.w : c.w, pn = in_ ? Nn.w : c.w, ps = is ? So.w : c.w;
  float div = ((ie ? E.x : 0.0) - (iw ? Wt.x : 0.0) + (in_ ? Nn.y : 0.0) - (is ? So.y : 0.0)) / (2.0 * h);
  o = encS(vec4(c.xyz, (pe + pw + pn + ps - h * h * div) * 0.25 * 0.9995));
}`,Ge=o=>r0(o)+X0+`
uniform sampler2D uC, uN;
uniform vec4 uQ[${w0+1}];
uniform vec4 uPal[12];
vec4 crs(vec2 uv) {
  vec2 ts = vec2(uP[13].x);
  vec2 sp = uv * ts, tc = floor(sp - 0.5) + 0.5, f = sp - tc;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f)), w1 = 1.0 + f * f * (-2.5 + 1.5 * f), w2 = f * (0.5 + f * (2.0 - 1.5 * f)), w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2, t0 = (tc - 1.0) / ts, t3 = (tc + 2.0) / ts, t12 = (tc + w2 / w12) / ts;
  vec4 r = (textureLod(uC, vec2(t0.x, t0.y), 0.0) * w0.x + textureLod(uC, vec2(t12.x, t0.y), 0.0) * w12.x + textureLod(uC, vec2(t3.x, t0.y), 0.0) * w3.x) * w0.y
         + (textureLod(uC, vec2(t0.x, t12.y), 0.0) * w0.x + textureLod(uC, vec2(t12.x, t12.y), 0.0) * w12.x + textureLod(uC, vec2(t3.x, t12.y), 0.0) * w3.x) * w12.y
         + (textureLod(uC, vec2(t0.x, t3.y), 0.0) * w0.x + textureLod(uC, vec2(t12.x, t3.y), 0.0) * w12.x + textureLod(uC, vec2(t3.x, t3.y), 0.0) * w3.x) * w3.y;
  ivec2 b = clamp(ivec2(tc - 0.5), ivec2(0), ivec2(int(uP[13].x) - 2));
  vec4 a0 = texelFetch(uC, b, 0), a1 = texelFetch(uC, b + ivec2(1, 0), 0), a2 = texelFetch(uC, b + ivec2(0, 1), 0), a3 = texelFetch(uC, b + ivec2(1, 1), 0);
  return decD(clamp(r, min(min(a0, a1), min(a2, a3)), max(max(a0, a1), max(a2, a3))));
}
void main() {
  vec2 uv = vUv;
  float Wd = uP[3].y, dt = uP[0].x;
  vec4 d;
  vec2 p0 = (uv * 2.0 - 1.0) * Wd;
  float r0 = length(p0);
  if (r0 > 0.99) {
    // outside the milk: an extension of the edge, so nothing leaks out of the plate
    o = textureLod(uC, (p0 / r0 * 0.985) / Wd * 0.5 + 0.5, 0.0);
    return;
  }
  if (dt > 0.0) {
    vec2 um = Up(uv - 0.5 * dt * Up(uv) / (2.0 * Wd));
    vec2 uvb = uv - dt * um / (2.0 * Wd);
    // a firm touch (one that carries a push) clears a disc of plain milk round the bud's tip: the coarse flow grid
    // can't open one that clean on its own; the flow banks the colour up along its edge
    float clr = 0.0;
    for (int k = 0; k < int(uP[0].w); k++) {
      vec4 A = uP[4 + k], B = uP[8 + k];
      if (B.z > 0.0 && A.xy == A.zw) {
        vec2 q = p0 - A.xy; float lq = length(q), E = B.y * 2.6;
        clr += smoothstep(E * 0.85, E * 0.7, lq);
      }
    }
    vec2 pb = (uvb * 2.0 - 1.0) * Wd;
    float rb = length(pb);
    if (rb > 0.985) uvb = (pb / rb * 0.985) / Wd * 0.5 + 0.5;
    d = crs(uvb) * exp(-dt * 30.0 * clr);
    float e = 1.0 / ${T}.0, h = 2.0 * Wd / ${T}.0;
    vec4 a = Sb(uv + vec2(e, 0.0)), b = Sb(uv - vec2(e, 0.0)), c = Sb(uv + vec2(0.0, e)), dd = Sb(uv - vec2(0.0, e)), m = Sb(uv);
    float div = (a.x - b.x + c.y - dd.y) / (2.0 * h) - uP[0].y * (a.w + b.w + c.w + dd.w - 4.0 * m.w) / (h * h);
    float dv = clamp(div, -12.0, 12.0);
    d *= exp(-dt * dv * uP[12].w);
    float fx = uP[13].y;
    vec4 lap = decD(textureLod(uC, uvb + vec2(fx, 0.0), 0.0) + textureLod(uC, uvb - vec2(fx, 0.0), 0.0) + textureLod(uC, uvb + vec2(0.0, fx), 0.0) + textureLod(uC, uvb - vec2(0.0, fx), 0.0)) - 4.0 * d;
    float fat = textureLod(uN, uv * 3.0, 0.0).a * 0.6 + textureLod(uN, uv * 7.0, 0.0).b * 0.4;
    d = max(d + uP[12].x * (0.3 + 1.4 * fat) * lap, 0.0);
  } else d = decD(texelFetch(uC, ivec2(gl_FragCoord.xy), 0));
  d *= uP[12].y;
  vec2 p = (uv * 2.0 - 1.0) * Wd;
  int nd = int(uP[12].z);
  for (int i = 0; i < nd; i++) {
    vec4 D = uQ[i];
    vec2 q = p - D.xy;
    float rr = length(q);
    if (rr < D.z * 1.6 && D.w > 15.5) {
      // a drop as it lies on the milk: a hard round edge (a slow wobble, no teeth), deep in the middle, a pale ring
      // just outside where it has begun to creep
      vec4 col = uPal[int(D.w) - 16];
      float edge = D.z * (1.0 + 0.1 * (textureLod(uN, q * 0.3 + D.xy * 0.37, 0.0).b - 0.5));
      float aa = 4.0 * Wd * uP[13].y, x = clamp(rr / edge, 0.0, 1.0);
      float cov = smoothstep(edge + aa, edge - aa, rr);
      vec4 A = col * mix(2.4, 0.7, x * x);
      A.a = col.a * (0.6 + 0.6 * textureLod(uN, p * 9.0 + D.xy, 0.0).a);
      d = max(mix(d, max(d, A), cov), col * 0.28 * smoothstep(edge * 1.3, edge, rr));
    } else if (rr < D.z * 1.6) {
      vec4 col = uPal[int(D.w)];
      float nz = textureLod(uN, p * 1.7 + D.xy * 0.37, 0.0).b * 0.6 + textureLod(uN, p * 4.1 + D.xy, 0.0).a * 0.4;
      float edge = D.z * (0.84 + 0.32 * nz);
      float cov = smoothstep(edge, edge * 0.8, rr), halo = 0.16 * smoothstep(edge * 1.35, edge * 0.95, rr);
      vec4 A = col * (0.8 + 0.35 * smoothstep(edge, 0.0, rr));
      A.a *= 0.35 + 1.3 * textureLod(uN, p * 9.0 + D.xy, 0.0).a * textureLod(uN, p * 23.0, 0.0).a * 2.0;
      d = mix(d, max(d, A), max(cov, halo * (1.0 - cov)));
    }
  }
  float mx = max(max(d.r, d.g), d.b);
  if (mx > 12.0) d.rgb *= 12.0 / mx;
  o = encD(min(d, vec4(12.5)));
}`,Oe=o=>r0(o)+`
uniform sampler2D uC;
uniform float uK;
void main() { float f = uK; o = 0.25 * (textureLod(uC, vUv + vec2(-f, -f), 0.0) + textureLod(uC, vUv + vec2(f, -f), 0.0) + textureLod(uC, vUv + vec2(-f, f), 0.0) + textureLod(uC, vUv + vec2(f, f), 0.0)); }`,me=`
uniform vec4 uE[8];
vec3 env(vec3 P, vec3 R, float rough) {
  vec3 c = uE[5].rgb * (0.55 + 0.45 * clamp(R.z, 0.0, 1.0));
  if (R.z < 0.0) c = uE[6].rgb;
  if (R.y > 0.01) {
    float t = (uE[1].w - P.y) / R.y;
    vec3 Q = P + R * t;
    if (Q.z > uE[5].w) {
      vec4 W = uE[0];
      float s = 0.5 + rough * t;
      // a big soft window (diffused by a sheer): one smooth glossy band in the milk
      float a = smoothstep(-s, s, min(min(Q.x - W.x, W.y - Q.x), min(Q.z - W.z, W.w - Q.z)));
      vec2 wq = clamp((Q.xz - W.xz) / (W.yw - W.xz), 0.0, 1.0);
      vec3 sky = uE[1].rgb * mix(0.8, 1.08, wq.y) * (0.82 + 0.18 * sin(wq.x * 3.14159));
#ifdef ROOF
      sky *= uE[2].w;   // the window as the still milk mirrors it: the brightest thing in the frame
#endif
      // glazing bars: a mullion and a transom, painted wood
      float bw = min(abs(Q.x - W.x - 0.53 * (W.y - W.x)) - 1.1, abs(Q.z - W.z - 0.56 * (W.w - W.z)) - 0.9);
      a *= smoothstep(-s, s, bw);
      vec3 wall = uE[2].rgb * (0.7 + 0.3 * smoothstep(-10.0, 70.0, Q.z));
      c = mix(wall, sky, a);
    }
  }
#ifdef ROOF
  // seen from above: a roof light over the table, its glazing bars crisp in the still milk (the milk only: keeps the
  // room programs small for the Windows compiler)
  if (uE[7].w > 0.0 && R.z > 0.2) {
    float t = (uE[7].z - P.z) / R.z, s = 0.4 + rough * t;
    vec2 Q = P.xy + R.xy * t - uE[7].xy, hs = vec2(uE[6].w, uE[6].w * 0.68), e2 = hs - abs(Q);
    float a = smoothstep(-s, s, min(e2.x, e2.y)) * smoothstep(-s, s, min(abs(Q.x) - 1.3, abs(Q.y) - 1.3));
    c = mix(c, uE[1].rgb * uE[7].w * (0.9 + 0.1 * Q.y / hs.y), a);
  }
#endif
  if (uE[4].w > 0.0) {
    vec3 d = uE[3].xyz - P;
    float l = length(d), k = dot(R, d / l), ang = uE[3].w / l;
#ifdef ROOF
    // in the milk: the mouth of the shade seen from below, a flat disc squeezed by the low angle, the bulb hot in its
    // middle, the lit inside of the shade warm to its rim, a faint warm glow round it
    if (R.z > 0.02) {
      float tl = d.z / R.z, rh = length(P.xy + R.xy * tl - uE[3].xy) / (uE[3].w * 1.3), bl = 0.04 + rough * 3.0;
      float hot = smoothstep(0.66 + bl, 0.46 - bl, rh), sh = smoothstep(1.0 + bl, 1.0 - bl, rh);
      c += uE[4].rgb * (hot + (sh - hot) * vec3(0.3, 0.15, 0.03) * (1.3 - 0.6 * rh) + vec3(0.004, 0.0025, 0.001) * exp(-2.5 * max(rh - 1.0, 0.0))) / (1.0 + rough * 30.0);
    }
#else
    float cs = cos(ang), wd = (1.0 - cs) * 0.5 + rough * 0.0004;   // (widths in cosine: tiny numbers are wide in angle)
    c += uE[4].rgb * smoothstep(cs - wd, cs + 0.3 * wd, k) / (1.0 + rough * 30.0);
#endif
    c += uE[4].rgb * 0.0012 * pow(max(k, 0.0), 300.0);
  }
  return c;
}
vec3 tmap(vec3 c, float ex) { c = 1.0 - exp(-max(c, 0.0) * ex); c = pow(c, vec3(0.4545)); return mix(c, c * c * (3.0 - 2.0 * c), 0.22); }`,$0=(o,a)=>r0(!1)+`
#define G ${o}
#define PK ${a||0}
uniform vec4 uB[24];
uniform sampler2D uN;
${me}
const vec2 M0 = vec2(${c0[0]}), M1 = vec2(${c0[1]}), M2 = vec2(${c0[2]}), M3 = vec2(${c0[3]}), M4 = vec2(${c0[4]});
const float TH = ${O0}, ZT = ${le}, RM = ${H.toFixed(4)};
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h); }
float smn(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float sdPlate(vec3 P) {
  vec2 q = vec2(length(P.xy), P.z);
  // the profile's corners rounded off, as thrown china is
  float d = smn(smn(sdSeg(q, M0, M1), sdSeg(q, M1, M2), 0.9), smn(sdSeg(q, M2, M3), sdSeg(q, M3, M4), 0.5), 0.7) - TH;
  vec2 fq = abs(q - vec2(5.95, -1.2)) - vec2(0.3, 0.33);
  return min(d, length(max(fq, 0.0)) + min(max(fq.x, fq.y), 0.0) - 0.04);
}
float march(vec3 E, vec3 D) {
  if (D.z >= 0.0) return -1.0;
  float t = max((1.0 - E.z) / D.z, 0.0), t1 = (ZT - 0.05 - E.z) / D.z;
  int n = int(uB[19].x);
  for (int i = 0; i < n; i++) {
    if (t > t1) return -1.0;
    float d = sdPlate(E + D * t);
    if (d < 0.0015) return t;
    t += d * 0.92;
  }
  return -1.0;
}
vec3 nrm(vec3 P, out float ao) {
  vec3 n = vec3(0.0);
  int m = int(uB[19].w);
  for (int i = 0; i <= m; i++) {
    vec3 e = 0.5773 * (2.0 * vec3(float(((i + 3) >> 1) & 1), float((i >> 1) & 1), float(i & 1)) - 1.0);
    float d = sdPlate(i < m ? P + e * 0.003 : P + normalize(n) * 0.5);
    if (i < m) n += e * d; else ao = clamp(0.5 + 0.5 * d / 0.5, 0.0, 1.0);
  }
  return normalize(n);
}
float shadow(vec3 P, vec3 L, float k) {
  float res = 1.0, t = 0.04;
  for (int i = 0; i < int(uB[19].y); i++) {
    float h = sdPlate(P + L * t);
    res = min(res, k * h / t);
    t += clamp(h, 0.04, 1.2);
    if (res < 0.002 || t > 30.0) break;
  }
  return clamp(res, 0.0, 1.0);
}
vec3 keyDir(vec3 P) { return uB[4].w > 0.5 ? normalize(uB[4].xyz - P) : uB[4].xyz; }
vec3 keyRad(vec3 P) { if (uB[4].w < 0.5) return uB[11].rgb; float l = length(uB[4].xyz - P), l0 = length(uB[4].xyz); return uB[11].rgb * (l0 * l0) / (l * l); }
float shK() { return uB[4].w > 0.5 ? 9.0 : 3.2; }
#if G == 0
vec3 tableAlb(vec2 p, out float rough, out float spec) {
  int k = int(uB[5].y);
  vec3 a = uB[8].rgb, b = uB[9].rgb;
  float n1 = textureLod(uN, p * 0.012, 0.0).r, n2 = textureLod(uN, p * 0.05, 0.0).g, n3 = textureLod(uN, p * vec2(0.03, 0.6), 0.0).b, n4 = textureLod(uN, p * 0.4, 0.0).a;
  if (k == 1) {
    float pl = floor(p.y / 13.5 + 0.3), fy = fract(p.y / 13.5 + 0.3);
    float g = textureLod(uN, vec2(p.x * 0.008 + pl * 0.37, p.y * 0.09), 0.0).g;
    float ring = smoothstep(0.1, 0.95, sin((p.y + g * 26.0 + n3 * 3.0) * 2.4) * 0.5 + 0.5);
    vec3 c = mix(a, b, clamp(ring * 0.55 + n2 * 0.45, 0.0, 1.0)) * (0.82 + 0.3 * textureLod(uN, vec2(p.x * 0.05, p.y * 1.2) + pl, 0.0).a);
    c *= 1.0 - 0.6 * smoothstep(0.012, 0.0, min(fy, 1.0 - fy));
    rough = 0.12; spec = 0.5;
    return c;
  }
  if (k == 2) { rough = 0.2; spec = 0.35; return mix(a, b, n2 * 0.6 + n4 * 0.4) * (0.85 + 0.3 * n1); }
  // linen: slubbed weave and soft folds
  float wv = 0.5 + 0.25 * (sin(p.x * 26.0 + n4 * 3.0) * sin(p.y * 26.0 + n3 * 2.0));
  rough = 0.5; spec = 0.0;
  return mix(a, b, clamp(n1 * 0.5 + n4 * 0.3 + (wv - 0.5) * 0.25, 0.0, 1.0)) * (0.93 + 0.12 * n2);
}
float foldShade(vec2 p) { int k = int(uB[5].y); if (k != 0) return 1.0; float f = textureLod(uN, p * 0.018 + 0.5, 0.0).r; return 0.86 + 0.28 * smoothstep(0.2, 0.8, f); }
vec3 scene(vec3 E, vec3 D, out float tHit) {
  float tm = D.z < 0.0 ? -E.z / D.z : 1e9;
  vec3 Pm = E + D * tm;
  float tp = march(E, D);
  float tt = D.z < 0.0 ? (ZT - E.z) / D.z : 1e9;
  int kind;
  vec3 P, n = vec3(0.0, 0.0, 1.0), al;
  float rough = 0.5, F0 = 0.04, specW = 1.0, ao = 1.0, fold = 1.0;
  const int pk = PK;
  if (length(Pm.xy) < RM && (tp < 0.0 || tm < tp)) { kind = 0; tHit = tm; P = Pm; al = uB[10].rgb; specW = 0.0; }
  else if (tp > 0.0) {
    kind = 1; tHit = tp; P = E + D * tp; n = nrm(P, ao);
    al = uB[6].rgb; rough = uB[6].w; F0 = 0.045;
    float r = length(P.xy);
    if (pk == 1) {
      float sp = textureLod(uN, P.xy * 0.9, 0.0).a * textureLod(uN, P.xy * 2.3 + 0.4, 0.0).b;
      al = mix(al, vec3(0.75, 0.78, 0.82), smoothstep(0.42, 0.5, sp));
      float lip = smoothstep(13.0, 13.25, r);
      float chip = smoothstep(0.78, 0.82, textureLod(uN, P.xy * 0.15 + 0.3, 0.0).r) * lip;
      al = mix(mix(al, uB[7].rgb, lip), vec3(0.03, 0.028, 0.026), chip);
      rough = mix(rough, 0.25, chip);
    }
  }
  else if (D.z < 0.0 && (E + D * tt).y < uB[5].w) {
    kind = 2; tHit = tt; P = E + D * tt;
    float sp;
    al = tableAlb(P.xy, rough, sp); specW = sp; F0 = 0.03;
    float r = length(P.xy);
    ao = mix(0.4, 1.0, smoothstep(12.2, 17.5, r)) * mix(0.55, 1.0, smoothstep(0.0, 1.2, r - 13.5));
    fold = foldShade(P.xy);
  } else {
    tHit = (uB[5].w - E.y) / max(D.y, 1e-3);
    vec3 Pw = E + D * tHit;
    return uE[2].rgb * 0.5 * (0.8 + 0.2 * textureLod(uN, Pw.xz * 0.02, 0.0).g);
  }
  vec3 L = keyDir(P);
  float sh = shadow(P + n * 0.02, L, shK());
  if (kind == 2 && pk == 2) { float s0 = sh; sh = mix(0.45, 1.0, sh) + 0.5 * smoothstep(0.12, 0.5, s0) * smoothstep(0.85, 0.5, s0); }
  vec3 kr = keyRad(P);
  vec3 dif = al * (kr * max(dot(n, L), 0.0) * sh * fold + uB[12].rgb * (0.55 + 0.45 * n.z) * ao);
  if (kind == 0) return dif;
  vec3 Rr = reflect(D, n);
  float F = F0 + (1.0 - F0) * pow(1.0 - max(dot(-D, n), 0.0), 5.0);
  vec3 milkC = uB[10].rgb * (kr * 0.75 + uB[12].rgb);
  // the bright milk lights the plate's inner wall from below
  if (kind == 1 && length(P.xy) < 11.5) {
    dif += al * milkC * uB[13].z * clamp(0.6 - 0.8 * n.z + dot(n.xy, -normalize(P.xy)) * 0.6, 0.0, 1.0) * ao * exp(-max(P.z, 0.0) / uB[13].w);
    // the meniscus: a thin film of milk climbing the glaze, bright, just above the milk line
    dif = mix(dif, milkC * 1.05, exp(-max(P.z, 0.0) / 0.035) * step(-0.02, P.z) * 0.85);
  }
  vec3 spc = (kind == 1 && Rr.z < 0.0 && length(P.xy) < 10.8) ? milkC * 0.9 : env(P, Rr, rough);
  if (kind == 1 && pk == 2) {
    // glass: what lies behind, tinted by the path through it
    vec3 bh;
    vec3 Q = P + D * ((0.0 - P.z) / min(D.z, -0.05));
    if (length(Q.xy) < RM + 0.8 && P.z > -0.2) bh = milkC * 0.92;
    else { vec3 Pt = P + D * ((ZT - P.z) / min(D.z, -0.05)); bh = uB[8].rgb * (0.85 + 0.3 * textureLod(uN, Pt.xy * vec2(0.01, 0.1), 0.0).g) * (keyRad(Pt) * max(L.z, 0.0) * 0.7 + uB[12].rgb * 0.6); }
    vec3 tint = pow(uB[7].rgb, vec3(0.34 / max(abs(dot(n, D)), 0.12)));
    // clear glass is seen by its edges: the light's line along the rim, sharp
    return spc * F + bh * tint * (1.0 - F) + kr * sh * (0.05 * pow(max(dot(Rr, L), 0.0), 60.0) + 0.5 * pow(max(dot(Rr, L), 0.0), 700.0));
  }
  // glazed china and enamel: the room fills the shade, and the light draws one crisp line along the rim's crest
  if (kind == 1) dif += al * uB[12].rgb * uB[14].x * mix(0.5, 1.0, ao) + kr * sh * uB[14].y * pow(max(dot(Rr, L), 0.0), uB[14].z);
  return dif * (1.0 - F * min(specW, 1.0)) + spc * F * specW * mix(0.5, 1.0, ao);
}
#endif
void main() {
  vec3 E = uB[0].xyz; float th = uB[0].w, S = uB[20].x;
  vec2 px = gl_FragCoord.xy;
#if G == 0
  vec2 nd = (px + uB[21].xy) / S * 2.0 - 1.0;
  vec3 D = normalize(uB[1].xyz + nd.x * th * uB[2].xyz + nd.y * th * uB[3].xyz);
  float t;
  vec3 c = tmap(scene(E, D, t), uB[10].w);
  float coc = uB[20].y * abs(1.0 - uB[20].z / t);
  o = vec4(c, clamp(coc / uB[20].w, 0.0, 1.0)) * 0.25;
#else
  vec2 nd = px / S * 2.0 - 1.0;
  vec3 D = normalize(uB[1].xyz + nd.x * th * uB[2].xyz + nd.y * th * uB[3].xyz);
  float tm = D.z < 0.0 ? -E.z / D.z : 1e9;
  vec3 Pm = E + D * tm;
  float tp = march(E, D), mk = 0.0, vis = 1.0;
  if (tp < 0.0 || tm < tp + 0.05) {
    float fw = tm * 2.0 * th / S / max(-D.z, 0.15);
    mk = clamp((RM - length(Pm.xy)) / fw + 0.5, 0.0, 1.0);
    if (tp > 0.0 && tm > tp) mk = 0.0;
  }
  if (mk > 0.0) vis = shadow(Pm + vec3(0.0, 0.0, 0.01), keyDir(Pm), shK());
  o = vec4(mk, vis, 0.0, 1.0);
#endif
}`,Xe=r0(!1)+`
uniform sampler2D uA, uB;
uniform vec4 uF;
void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy), mx = ivec2(int(uF.y) - 1);
  vec4 c0 = texelFetch(uA, ij, 0);
  float m0 = texelFetch(uB, ij, 0).r;
  float R0 = max(c0.a * uF.x, 0.6);
  vec3 acc = c0.rgb * (1.0 - m0); float wa = 1.0 - m0, ma = m0, wt = 1.0;
  int n = int(uF.z);
  for (int i = 0; i < n; i++) {
    float fi = float(i) + 0.5, rr = sqrt(fi / float(n)) * R0, an = fi * 2.39996;
    vec2 off = vec2(cos(an), sin(an)) * rr;
    ivec2 q = clamp(ij + ivec2(floor(off + 0.5)), ivec2(0), mx);
    vec4 c = texelFetch(uA, q, 0);
    float m = texelFetch(uB, q, 0).r;
    float w = clamp(c.a * uF.x - rr + 1.0, 0.0, 1.0);
    acc += c.rgb * w * (1.0 - m); wa += w * (1.0 - m); ma += w * m; wt += w;
  }
  o = vec4(wa > 1e-4 ? acc / wa : c0.rgb, ma / wt);
}`,$e=o=>r0(o)+`
uniform sampler2D uBG, uAux, uDye, uBlur, uN, uSt;
uniform vec4 uC[24];
#define ROOF 1
${me}
vec3 raySeg(vec3 ro, vec3 rd, vec3 a, vec3 b) {
  vec3 ba = b - a, w0 = ro - a;
  float bb = dot(rd, ba), cc = dot(ba, ba), dd = dot(rd, w0), ee = dot(ba, w0);
  float den = cc - bb * bb;
  float s = den > 1e-6 ? clamp((ee - bb * dd) / den, 0.0, 1.0) : 0.0;
  float t = bb * s - dd;
  return vec3(length(w0 + rd * t - ba * s), t, s);
}
float h21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  ivec2 ij = ivec2(gl_FragCoord.xy);
  float S = uC[8].w;
  vec2 uv = (vec2(ij) + 0.5) / S;
  vec4 bg = texelFetch(uBG, ij, 0);
  vec3 col = bg.rgb;
  float m = bg.a;
  vec3 E = uC[0].xyz;
  vec2 nd = uv * 2.0 - 1.0;
  vec3 D = normalize(uC[1].xyz + nd.x * uC[0].w * uC[2].xyz + nd.y * uC[0].w * uC[3].xyz);
  vec3 L = uC[4].xyz;
  float pxw = 2.0 * uC[0].w / S;
  // the point on the milk (computed for every pixel so the screen derivatives of the dye lookup are defined)
  float t = -E.z / min(D.z, -1e-3);
  vec3 P = E + D * t;
  float Rm = uC[6].w;
  vec2 pp = P.xy;
  float r = length(pp);
  if (r > Rm - 0.03) { pp *= (Rm - 0.03) / r; r = Rm - 0.03; }
  vec2 duv = pp / (Rm * ${G0}) * 0.5 + 0.5;
  vec2 ux = dFdx(duv), uy = dFdy(duv);
  if (m > 0.002) {
    float coc = uC[8].z * abs(1.0 - uC[8].y / t);
    vec4 d0 = decD(textureLod(uDye, duv, 0.0)), d1 = decD(textureLod(uBlur, duv, 0.0));
    vec4 d = d0;
    if (coc > 0.7) {
      // depth of field on the colour: a disc gather in screen space, the coarse blur beyond
      float rr = min(coc, 12.0);
      vec4 acc = d0;
      for (int i = 0; i < 12; i++) {
        float fi = float(i) + 0.5, rad = sqrt(fi / 12.0) * rr, an = fi * 2.39996;
        acc += decD(textureLod(uDye, duv + ux * (cos(an) * rad) + uy * (sin(an) * rad), 0.0));
      }
      d = mix(acc / 13.0, d1, smoothstep(10.0, 22.0, coc));
    } else d = max(d0 + 0.25 * (d0 - d1), 0.0);
    // surface slope: the meniscus at the rim, ripples from landing drops, the film wetting the bud and the faint fat
    // texture; otherwise the milk is a still mirror, so the lamp and the window show crisp in it
    vec2 rh = pp / max(r, 1e-3);
    vec2 g = rh * (uC[9].x * exp(-(Rm - r) / 0.24) / 0.24);
    {
      vec2 fq = pp * 0.055;
      float f0 = textureLod(uN, fq, 0.0).a, fx = textureLod(uN, fq + vec2(0.004, 0.0), 0.0).a, fy = textureLod(uN, fq + vec2(0.0, 0.004), 0.0).a;
      g += vec2(fx - f0, fy - f0) * uC[22].z;
    }
    for (int i = 0; i < ${I0}; i++) {
      vec4 Rp = uC[14 + i];
      if (Rp.w > 0.0) {
        vec2 q = pp - Rp.xy; float dq = length(q), fr = 0.6 + 9.0 * Rp.z, x = dq - fr;
        float env1 = exp(-x * x / (0.12 + 0.9 * Rp.z)) * exp(-2.2 * Rp.z) * Rp.w;
        g += q / max(dq, 1e-3) * env1 * cos(x * 9.0) * 0.3;
      }
    }
    vec3 n = normalize(vec3(-g, 1.0));
    float vis = texelFetch(uAux, ij, 0).g;
    // the colour sits in the top film: a saturating response (thin streaks stay vivid, thick ones deep), and
    // overlapping colours keep their hue instead of summing to grey
    vec3 a = d.rgb;
    float ma = max(max(a.r, a.g), a.b);
    a *= uC[21].x * (1.0 - exp(-ma * uC[21].y / uC[21].x)) / max(ma, 1e-3);
    a *= smoothstep(0.02, 0.22, ma);   // the faint haze left behind reads as clean milk
    float an = min(min(a.r, a.g), a.b);
    a = (a - uC[21].z * an) / (1.0 + 0.35 * max(an - 0.6, 0.0));
    float fat = textureLod(uN, pp * 0.2, 0.0).b;
    vec3 alb = uC[7].rgb * exp(-a) * (1.0 + uC[22].z * 0.6 * (fat - 0.5));
    alb = mix(alb, uC[7].rgb * exp(-d1.rgb * 0.8), 0.06);
    // the lamp is near: its light falls off across the plate
    vec3 kr = uC[5].rgb;
    if (uE[4].w > 0.0) { vec3 dl = uE[3].xyz - P; float l2 = dot(dl, dl); L = dl * inversesqrt(l2); kr *= dot(uE[3].xyz, uE[3].xyz) / l2; }
    vec3 dif = alb * (kr * vis * (0.6 + 0.4 * max(dot(n, L), 0.0)) + uC[6].rgb);
    float F = 0.02 + 0.98 * pow(1.0 - clamp(dot(-D, n), 0.0, 1.0), 5.0);
    vec3 R = reflect(D, n);
    vec3 spec = env(P, R, uC[7].w);
    // the plate's own wall, mirrored near the far edge
    {
      float b = dot(pp, R.xy), a = dot(R.xy, R.xy), cR = dot(pp, pp) - 10.4 * 10.4;
      float s = (-b + sqrt(max(b * b - a * cR, 0.0))) / max(a, 1e-4);
      float zr = R.z * s;
      spec = mix(spec, uC[18].rgb, smoothstep(uC[18].w + 0.1, uC[18].w - 0.1, zr));
    }
    // a broad soft sheen of the key light on the cream
    spec += kr * vis * uC[22].x * pow(max(dot(R, L), 0.0), uC[22].y);
    vec3 mc = dif * (1.0 - F) + spec * F;
    // gold mica: metallic flakes carried in the dye
    if (uC[19].w > 0.0 && d.a > 0.005) {
      float M = clamp(d.a, 0.0, 1.5);
      float fl = textureLod(uN, duv * 37.0 + uC[8].x * 0.02, 0.0).g;
      vec3 metal = uC[19].rgb * (spec * (0.3 + 0.5 * fl) + uC[5].rgb * vis * (0.25 + 0.3 * fl) + uC[6].rgb * 0.3);
      float sp = max(d0.a - d1.a, 0.0) * smoothstep(0.55, 0.95, textureLod(uN, duv * 61.0 + vec2(uC[8].x * 0.013, 0.0), 0.0).a);
      mc = mix(mc, metal, clamp(M * 0.7, 0.0, 0.85)) + uC[19].rgb * sp * 6.0 * vis;
    }
    col = mix(col, tmap(mc, uC[5].w), m);
  }
  // a falling drop of colour
  if (uC[12].w > 0.0) {
    vec3 r = raySeg(E, D, uC[12].xyz, uC[12].xyz + vec3(0.0, 0.0, 0.2));
    float rad = 0.11, soft = r.y * pxw * 1.6 + 0.03;
    float cv = clamp((rad - r.x) / soft + 0.5, 0.0, 1.0) * uC[12].w;
    if (cv > 0.0) {
      vec3 dc = exp(-uC[13].rgb * 1.2) * (uC[5].rgb * 0.45 + uC[6].rgb) + uC[5].rgb * 0.6 * smoothstep(0.05, 0.0, length(vec2(r.x - 0.04, (r.z - 0.75) * 0.2)));
      col = mix(col, tmap(dc, uC[5].w), cv);
    }
  }
  col += (h21(gl_FragCoord.xy + fract(uC[8].x * 7.13) * 517.0) - 0.5) * uC[20].x;
  o = vec4(col, 1.0);
}`,he={adv:{uS:0,uD:1,uN:2},jac:{uS:0},dye:{uS:0,uC:1,uN:2},down:{uC:0},room00:{uN:0},room01:{uN:0},room02:{uN:0},room1:{uN:0},dof:{uA:0,uB:1},comp:{uBG:0,uAux:1,uDye:2,uBlur:3,uN:4,uSt:5}};function pe(o,a,i,l){const x=o.createShader(o.FRAGMENT_SHADER);o.shaderSource(x,l),o.compileShader(x),a.sh.push([x,l]);const m=o.createProgram();o.attachShader(m,a.vs),o.attachShader(m,x),o.linkProgram(m),a.P[i]={p:m,u:{}}}function ve(o,a,i){const l=a.P[i];if(!o.getProgramParameter(l.p,o.LINK_STATUS)){let m=i+": "+o.getProgramInfoLog(l.p);for(const[y,D]of a.sh){const U=o.getShaderInfoLog(y);U&&(m+=`
`+U+`
`+D.split(`
`).map((S,P)=>P+1+": "+S).join(`
`))}throw new Error("126 shader "+m)}const x=o.getProgramParameter(l.p,o.ACTIVE_UNIFORMS);for(let m=0;m<x;m++){const y=o.getActiveUniform(l.p,m);l.u[y.name.replace(/\[0\]$/,"")]=o.getUniformLocation(l.p,y.name)}o.useProgram(l.p);for(const m in he[i])l.u[m]&&o.uniform1i(l.u[m],he[i][m]);l.ok=1}function He(o,a,i){const l="room0"+i;return a.P[l]||pe(o,a,l,$0(0,i)),a.P[l].ok||ve(o,a,l),a.P[l]}function Qe(o,a){let i=ie.get(o);if(i)return i;o.getExtension("EXT_color_buffer_float"),o.getExtension("EXT_color_buffer_half_float");const l=o.createTexture();o.bindTexture(o.TEXTURE_2D,l),o.texImage2D(o.TEXTURE_2D,0,o.RGBA16F,4,4,0,o.RGBA,o.HALF_FLOAT,null);const x=o.createFramebuffer();o.bindFramebuffer(o.FRAMEBUFFER,x),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,l,0);const m=o.checkFramebufferStatus(o.FRAMEBUFFER)===o.FRAMEBUFFER_COMPLETE;o.bindFramebuffer(o.FRAMEBUFFER,null),o.deleteFramebuffer(x),o.deleteTexture(l);const y=!m,D={adv:je(y),jac:Ie(y),dye:Ge(y),down:Oe(y),["room0"+a]:$0(0,a),room1:$0(1),dof:Xe,comp:$e(y)},U=o.createShader(o.VERTEX_SHADER);o.shaderSource(U,de),o.compileShader(U);const S={};i={P:S,sh:[[U,de]],vs:U};for(const h in D)pe(o,i,h,D[h]);o.flush();const j=new Uint8Array(Y*Y*4);let M=309004887;const Z=()=>(M^=M<<13,M^=M>>>17,M^=M<<5,(M>>>0)/4294967296),A=(h,_)=>{const K=new Float32Array(h*h);for(let J=0;J<h*h;J++)K[J]=Z();for(let J=0;J<Y;J++){const Q=J*h/Y,d0=Q|0,k=Q-d0,A0=k*k*(3-2*k),E0=d0*h,t0=(d0+1)%h*h;for(let s0=0;s0<Y;s0++){const m0=s0*h/Y,o0=m0|0,g0=m0-o0,P0=g0*g0*(3-2*g0),h0=(o0+1)%h,z=K[E0+o0]+(K[E0+h0]-K[E0+o0])*P0,z0=K[t0+o0]+(K[t0+h0]-K[t0+o0])*P0;j[(J*Y+s0)*4+_]=Math.round((z+(z0-z)*A0)*255)}}};A(4,0),A(8,1),A(32,2),A(64,3),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_ALIGNMENT,1);const w=o.createTexture();o.bindTexture(o.TEXTURE_2D,w),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,Y,Y,0,o.RGBA,o.UNSIGNED_BYTE,j),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT);const F=[];let R=performance.now();for(const h in S){o.getProgramParameter(S[h].p,o.LINK_STATUS);const _=performance.now();F.push(h+" "+Math.round(_-R)),R=_}for(const h in S)ve(o,i,h);return Object.assign(i,{noise:w,f16:m,vao:o.createVertexArray(),dbg:F.join(" "),fc:0}),ie.set(o,i),i}const Ke=[{name:"Whole",alb:"#f4f0e6",rough:.05,M:.65,drag:1.1,decay:1/32,stir:.12,bloom:.6,soap:1,mobN:.26,eps:.6},{name:"Cream",alb:"#f5edd8",rough:.032,M:.6,drag:.9,decay:1/45,stir:.18,bloom:1.1,soap:1,mobN:.3,eps:.8},{name:"Skim",alb:"#eaeff1",rough:.06,M:.34,drag:1.5,decay:1/22,stir:.06,bloom:2,soap:.55,mobN:.2,eps:.5},{name:"Oat",alb:"#ebdfc8",rough:.13,M:.4,drag:1.8,decay:1/26,stir:.1,bloom:2.6,soap:.8,mobN:.45,eps:.5}],xe={Primary:["#c8122c","#f5b70c","#1a3fb0","#0d9150"],Pastel:["#ee8cb0","#b096e6","#86d9b4","#f4d77a","#8fbcef"],"Gold mica":["gold","#1b2c7a","#a3122a","gold","#0f6a4a"]},be=["#d41f2e","#ee6418","#f2c20e","#62b134","#12955c","#1298a8","#1d5ec4","#4932a8","#8d299d","#c81e72"],Ve=["White china","Blue enamel","Glass on wood"],Ye=["Linen","Oak","Slate"],Ze=["Ring","Cluster","Scattered","Rainbow ring"];se.add({num:126,name:"Milk Swirl",fam:"Worlds",recipe:"A low, close look across a plate of milk with drops of food colouring floating on it. Touch it with a bit of dish soap and the colours tear outward in swirls that slow down as the soap spreads. The colours change every mint. Tap to touch it with soap, drag to draw a soap line and push the colour in a wave, or hold to drip in more colour.",interactive:"Tap the milk to touch it with the soap: a burst. Drag to draw soap along a line and push the colour in a wave. Hold still to let drops of colour fall at that point instead (keep holding for more). A second touch on soapy milk does less; a fresh spot bursts again.",music:!0,gl:!0,fps:30,seed:0,make(o){const a=o.gl,i=o.size,l=e=>parseInt(o.hash.slice(2+e*8,10+e*8),16)>>>0,x=e=>()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},m=x(l(0)^l(5)),y=x(l(2)^l(7)^40503),D=(e,t)=>{let n=0;for(const s of t)n+=s;let c=e()*n;for(let s=0;s<t.length;s++)if(c-=t[s],c<0)return s;return t.length-1};let U=D(m,[44,24,24,8]),S=D(m,[55,35,10]),P=D(m,[45,33,22]),j=D(m,[62,38]),M=D(m,[34,30,28,8]),Z=P===2?1:D(m,[40,35,25]);o.home&&(U=0,S=0,P=0,j=Ne,M=1,Z=1);const A=Qe(a,P),w=A.P,F=Ke[U],R=Object.keys(xe)[S];o.trait("Milk",F.name),o.trait("Colours",R),o.trait("Plate",Ve[P]),o.trait("Table",Ye[Z]),o.trait("Light",j?"Warm lamp":"Window"),o.trait("Drops",Ze[M]);const h=x(l(6)^l(1)^5369127);let _=D(h,[58,33,9]);o.home&&(_=0);const K=["Low across the plate","From above","Straight down into the milk"];o.trait("View",K[_]);let Q=x(l(3)^l(6)^1206878)()<.28?1:0;o.home&&(Q=0),o.trait("Stage",Q?"Just touched":"Swirling");const d0=_===0?qe:_===1?C0(78+h()*6,h()*360,50+h()*6,13,[0,0,0]):C0(86,h()*360,30,13,[0,0,0]),k=_===0?We:d0,A0=i*.011,E0=x(l(1)^l(4)^75458),t0=_===1,s0=Q||t0?16:0,m0=C(F.alb),o0=(e,t)=>e==="gold"?[.06,.2,.75,1]:C(e).map((n,c)=>-Math.log(ue(n/Math.max(m0[c],.05),.012,1))*t).concat(0),g0=S===1?3.2:3.4;let P0=xe[R];M===3&&(P0=S===2?be.slice(0,8).flatMap((e,t)=>t%2?[e]:[e,"gold"]).slice(0,11):be.map(e=>e));const h0=P0.map(e=>o0(e,g0)),z=Math.min(12,h0.length),z0=new Float32Array(48);for(let e=0;e<z;e++)z0.set(h0[e],e*4);const Je=C("#d8b25a"),p0=(e,t,n,c,s,r)=>{const u=a.createTexture();return a.bindTexture(a.TEXTURE_2D,u),a.texImage2D(a.TEXTURE_2D,0,n,e,t,0,c,s,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,r),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),u},v0=e=>{const t=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,t),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),t},H0=A.f16?[a.RGBA16F,a.RGBA,a.HALF_FLOAT]:[a.RGBA8,a.RGBA,a.UNSIGNED_BYTE],M0=[0,1].map(()=>p0(T,T,...H0,a.LINEAR)),Q0=M0.map(v0),e0=i>=600?1024:512,L0=[0,1].map(()=>p0(e0,e0,...H0,a.LINEAR)),ye=L0.map(v0),K0=p0(T,T,...H0,a.LINEAR),we=v0(K0),B0=(e,t)=>{a.bindFramebuffer(a.FRAMEBUFFER,e),a.clearColor(t[0],t[1],t[2],t[3]),a.clear(a.COLOR_BUFFER_BIT)},et=A.f16?[0,0,0,0]:[.5,.5,0,.5];Q0.forEach(e=>B0(e,et)),ye.forEach(e=>B0(e,[0,0,0,0])),B0(we,[0,0,0,0]);const i0=(e,t,n,c)=>{a.bindFramebuffer(a.FRAMEBUFFER,t),a.viewport(0,0,n,c),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.CULL_FACE),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.colorMask(!0,!0,!0,!0),a.useProgram(e.p),a.bindVertexArray(A.vao)},L=(e,t)=>{a.activeTexture(a.TEXTURE0+e),a.bindTexture(a.TEXTURE_2D,t)},u0=()=>a.drawArrays(a.TRIANGLES,0,3),f=j===0?{L:[-.18,.82,.55],lamp:0,key:[2.55,2.48,2.3],amb:[.2,.215,.25],sky:[17,17.3,18],wall:[.5,.47,.43],room:[.36,.37,.4],exp:.64,lampC:[0,0,0],lp:[0,0,0,0],sheen:[0,1]}:{L:[9,50,28],lamp:1,key:[2.3,1.95,1.45],amb:[.13,.125,.13],sky:[.25,.33,.55],wall:[.2,.15,.11],room:[.16,.13,.11],exp:.82,lampC:[380,300,210],lp:[9,50,28,.9],sheen:[1.2,1500]};if(f.lamp&&!o.home){const e=x(l(7)^l(2)^107497),t=-30+60*e(),n=44+14*e(),c=23+12*e();f.L=[t,n,c],f.lp=[t,n,c,.9]}const tt=f.lamp?[-22,14,29,51]:[18,29,28,39];if(f.lamp||(f.L=[23.5,56,33.5]),!f.lamp){const e=Math.hypot(...f.L);f.L=f.L.map(t=>t/e)}const N0=[[C("#c9b79a"),C("#ad9a7c")],[C("#a4774a"),C("#6e4a2a")],[C("#43474c"),C("#2c2f33")]][Z],V0=[[C("#f1eee8"),C("#f1eee8"),.03],[C("#1f3f8a"),C("#141d36"),.06],[C("#f4f6f5"),C("#dfeee7"),.01]][P],Ee=N0[0].map((e,t)=>(e+N0[1][t])*.5*(j?.25:.7));let Y0=[0,0,0,0,0];if(_){const e=x(l(5)^l(1)^32271),t=k.E,n=e()*N,c=f.lamp?2.2+2.4*e():4.6+1.6*e(),s=[Math.cos(n)*c,Math.sin(n)*c],r=f.lamp?36+10*e():150,u=(t[2]+r)/t[2],d=[t[0]+(s[0]-t[0])*u,t[1]+(s[1]-t[1])*u];f.lamp?(f.L=[d[0],d[1],r],f.lp=[d[0],d[1],r,.9]):Y0=[d[0],d[1],r,3,2.1*u]}const ge=new Float32Array([...tt,...f.sky,56,...f.wall,f.lamp?1:2.6,...f.lp,...f.lampC,f.lamp,...f.room,le,...Ee,Y0[4],...Y0.slice(0,4)]),l0=new Float32Array(24*4);l0.set([...k.E,k.th,...k.F,0,...k.R,0,...k.U,0,...f.lamp?f.lp.slice(0,3):f.L,f.lamp,P,Z,0,60,...V0[0],V0[2],...V0[1],0,...N0[0],0,...N0[1],0,...m0,f.exp,...f.key,0,...f.amb,0],0);const Pe=30*i/1e3;l0.set([96,28,4,4],19*4),l0.set([0,0,.95,1.2,P===2?0:f.lamp?.9:3.2,P===2?0:f.lamp?1:.8,f.lamp?800:500,0],13*4),l0[23]=56,l0.set([i,A0,k.fd,Pe],20*4);{const e=p0(i,i,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST),t=v0(e);let n=0;var Z0=p0(i,i,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST);const c=v0(Z0);var Me=p0(i,i,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST);const s=v0(Me);B0(t,[0,0,0,0]);for(const r of[0,0,0,0,1]){const u=r?w.room1:He(a,A,P);i0(u,r?c:t,i,i),L(0,A.noise),r||(l0.set([((n&1)-.5)*.5,((n>>1)-.5)*.5],21*4),n++,a.enable(a.BLEND),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ONE)),a.uniform4fv(u.u.uB,l0),a.uniform4fv(u.u.uE,ge),u0()}a.disable(a.BLEND),i0(w.dof,s,i,i),L(0,e),L(1,Z0),a.uniform4f(w.dof.u.uF,Pe,i,56,0),u0(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.deleteFramebuffer(t),a.deleteTexture(e),a.deleteFramebuffer(c),a.deleteFramebuffer(s)}let V=0,x0=0,J0=0;const B=new Float32Array(16*4),ee=new Float32Array((w0+1)*4),X=[],b0=[],te=F.soap;B[13]=G0;function Te(e){let t=0;B.fill(0);for(const c of X){if(t>=_e)break;const s=c.once?c.rate:c.rate*e;B.set([c.a[0],c.a[1],c.b[0],c.b[1]],(4+t)*4),B.set([s,c.r,(c.sx||0)*e,(c.sy||0)*e],(8+t)*4),t++}B.set([e,.9,J0,t,F.M,F.drag,.3,F.decay*1.8,F.eps,F.stir,F.mobN,.6,0,G0,0,20],0),B.set([F.bloom*e*e0/512*(Se?1:.03),J0>7?Math.exp(-e/80):1,0,.5],12*4),i0(w.adv,Q0[1-V],T,T),L(0,M0[V]),L(1,K0),L(2,A.noise),a.uniform4fv(w.adv.u.uP,B),u0(),V=1-V,a.useProgram(w.jac.p),a.uniform4fv(w.jac.u.uP,B);for(let c=0;c<Ue;c++)i0(w.jac,Q0[1-V],T,T),L(0,M0[V]),u0(),V=1-V;let n=0;for(const c of b0){if(n>=w0)break;const s=c.age<0?c.R:c.R*Math.sqrt(1-Math.exp(-c.age/.11));ee.set([c.x,c.y,Math.max(s,.004),c.k+16],n*4),n++}B[12*4+2]=n,Re(e,n),J0+=e}function Re(e,t){B[0]=e,B[12*4+2]=t,B[52]=e0,B[53]=1/e0,i0(w.dye,ye[1-x0],e0,e0),L(0,M0[V]),L(1,L0[x0]),L(2,A.noise),a.uniform4fv(w.dye.u.uP,B),a.uniform4fv(w.dye.u.uQ,ee),a.uniform4fv(w.dye.u.uPal,z0),u0(),x0=1-x0,i0(w.down,we,T,T),L(0,L0[x0]),a.uniform1f(w.down.u.uK,e0/T/4/e0),u0()}const ot=x(l(3)^32586),E=(e,t,n)=>t+(n-t)*e(),_0=(e,t)=>q0(e,t);function U0(e,t,n,c,s,r,u,d,v,W,g){const O=[];for(let $=0;O.length<t&&$<600;$++){const ze=e()*N,Le=Math.sqrt(e()),k0=(g||_0)(n+Math.cos(ze)*Le*s,c+Math.sin(ze)*Le*r);if(Math.hypot(...k0)>.9)continue;const Be=E(e,d,v);O.every(re=>Math.hypot(re[0]-k0[0],re[1]-k0[1])>(re[2]+Be)*u)&&O.push([k0[0],k0[1],Be,(O.length+W)%z])}return O}function at(e,t){let n=[],c=[];const s=e()*z|0;if(t0){const r=(v,W)=>[Math.cos(v)*W,Math.sin(v)*W],u=(v,W)=>[v,W];if(t===0||t===3){const v=t===3?Math.min(z,10):10+(e()*3|0),W=e()*N,g=E(e,.4,.46);for(let $=0;$<v;$++)n.push([...r(W+$/v*N,g),E(e,.16,.19),t===3?$%z:($+s)%z]);const O=t===3?0:3+(e()*2|0);for(let $=0;$<O;$++)n.push([...r(W+($+.5)/O*N+.3,g*.5),E(e,.13,.16),($*2+s+1)%z])}else t===1?n=U0(e,26+(e()*5|0),0,0,.6,.6,.9,.13,.19,s,u):n=U0(e,32+(e()*5|0),0,0,.72,.72,.98,.115,.16,s,u);const d=e()*N;return c=[[...r(d,.04),0],[...r(d+2.2,.5),14],[...r(d-2.2,.52),26]],{ds:n,taps:c}}if(t===0||t===3){const r=t===3?Math.min(z,10):9+(e()*3|0),u=e()*N,d=_0(.5+E(e,-.04,.04),.56+E(e,-.04,.04)),v=E(e,.27,.33);for(let g=0;g<r;g++){const O=u+g/r*N;n.push([d[0]+Math.cos(O)*v,d[1]+Math.sin(O)*v,E(e,.11,.135)*(t===3?.9:1),t===3?g%z:(g+s)%z])}const W=t===3?0:2+(e()*2|0);for(let g=0;g<W;g++){const O=u+(g+.5)/W*N+.3;n.push([d[0]+Math.cos(O)*v*.45,d[1]+Math.sin(O)*v*.45,E(e,.09,.11),(g*2+s+1)%z])}{const g=e()*N;c=[[d[0]+Math.cos(g)*.08,d[1]+Math.sin(g)*.08,0]]}{const g=e()*N;c.push([d[0]+Math.cos(g)*v*1.3,d[1]+Math.sin(g)*v*1.3,12]),t===0&&c.push([d[0]-Math.cos(g)*v*1.2,d[1]-Math.sin(g)*v*1.2,24])}}else if(t===1){n=U0(e,18+(e()*5|0),.5,.56,.43,.41,.92,.085,.13,s);const r=e()*N,u=_0(.5,.56);c=[[u[0]+Math.cos(r)*.12,u[1]+Math.sin(r)*.12,0],[u[0]-Math.cos(r)*.36,u[1]-Math.sin(r)*.36,10],[u[0]+Math.cos(r+2)*.4,u[1]+Math.sin(r+2)*.4,22]]}else{n=U0(e,26+(e()*5|0),.5,.55,.52,.5,1.15,.08,.11,s);const r=e()*N;for(let u=0;u<4;u++){const d=r+u/4*N,v=_0(.5+Math.cos(d)*.26,.56+Math.sin(d)*.24);c.push([v[0],v[1],u*7])}}return{ds:n,taps:c}}function nt(e){for(let t=0;t<e.length;t+=w0){const n=e.slice(t,t+w0);n.forEach((c,s)=>ee.set(c,s*4)),B[12*4+1]=1,B[12*4+3]=.4,Re(0,n.length)}}const b={x:0,y:0,vis:0,down:0,hold:0},T0=[],a0=[],R0=[];let Se=!1,De=y()*z|0;const q0=(e,t)=>{const n=fe(e,t,d0);return[n[0]/H,n[1]/H]},S0=(e,t)=>{const n=fe(e,t,k);return[n[0]/H,n[1]/H]};function y0(e,t,n,c,s,r){X.push({a:[e,t],b:[e,t],rate:200*te*(n||1),t:s||.35,r:r||.072,sx:c||0}),Se=!0,b.x=e,b.y=t,b.hold=.55,b.slow=0,R0.push([e,t]),R0.length>5&&R0.shift(),o.sound.hit("click",.05,{pan:e*.6}),o.sound.hit("noise",.04,{cutoff:700,dur:.6,pan:e*.6})}function Fe(e,t,n){const c=Math.hypot(t[0]-e[0],t[1]-e[1]);if(c<1e-4)return;const s=[(t[0]-e[0])/Math.max(n,.001),(t[1]-e[1])/Math.max(n,.001)];X.push({a:e.slice(),b:t.slice(),rate:0,once:!0,t:.001,r:.04,sx:s[0]*.25,sy:s[1]*.25,amt:c*60*te});const r=X[X.length-1];r.rate=Math.min(5,c*90*te+1*n*30),b.x=t[0],b.y=t[1],b.hold=.3}function ke(e,t,n,c){T0.push({x:e,y:t,k:n,R:c||E(y,.085,.11),t:0,T:.16})}function ct(e){b0.push({x:e.x,y:e.y,R:e.R,k:e.k,age:0}),a0.push([e.x*H,e.y*H,0,1]),a0.length>I0&&a0.shift(),o.sound.hit("blip",.16,{freq:2300+e.R*4e3,pan:e.x*.6}),o.sound.hit("click",.06,{pan:e.x*.6})}const W0=at(ot,M);if(s0)for(const e of W0.ds)e[2]*=Q?.72+.6*E0():1,e[3]+=s0;nt(W0.ds),B[12*4+1]=1;{const e=t0&&!Q?64:40;for(let t=0;t<e;t++){if(!Q){for(const n of W0.taps)if(n[2]===t){const c=1.5/Math.min(1,F.soap*F.M/.65);t0?y0(n[0],n[1],c*(t?1.2:1.6),t?0:.8,t?.35:.9,t?.08:.085):y0(n[0],n[1],c)}}Te(1/30);for(const n of X)n.t-=1/30;for(let n=X.length-1;n>=0;n--)X[n].t<=0&&X.splice(n,1)}b.hold=.05}const I=x(l(4)^11132);let D0=0,n0=[],F0=99,j0=!1,oe=0;function rt(e){let t=null,n=-1;for(let c=0;c<14;c++){const[s,r]=q0(E(e,.16,.84),E(e,.28,.9)),u=Math.hypot(s,r),d=Math.min(...R0.map(v=>Math.hypot(v[0]-s,v[1]-r)),2)-.15*u;d>n&&(n=d,t=[s,r])}return t}function st(e,t){let n=null,c=-1e9;for(let s=0;s<24;s++){const[r,u]=t?q0(E(e,.33,.67),E(e,.4,.72)):q0(E(e,.15,.85),E(e,.3,.85));let d=0;for(const v of W0.ds){const W=Math.hypot(v[0]-r,v[1]-u);d+=Math.exp(-W*W/.06)}d-=2*Math.exp(-(Math.min(...R0.map(v=>Math.hypot(v[0]-r,v[1]-u)),2)**2)/.05),d>c&&(c=d,n=[r,u])}return n}function ae(){const e=[];let t=oe===0?6:E(I,.5,4);if(oe===0){const c=st(I,Q);e.push({at:Q?3:2.2,k:"burst",x:c[0],y:c[1],hold:Q?1.5:0})}const n=1+(I()*3|0);for(let c=0;c<n;c++){const s=rt(I),r=2+(I()*2|0);for(let u=0;u<r;u++){const d=I()*N,v=E(I,.1,.2);e.push({at:t,k:"drop",x:s[0]+Math.cos(d)*v,y:s[1]+Math.sin(d)*v,c:De++%z}),t+=E(I,.4,.8)}if(t+=E(I,.8,1.4),c>0&&I()<.45){const u=I()*N;e.push({at:t,k:"line",x:s[0]-Math.cos(u)*.18,y:s[1]-Math.sin(u)*.18,x2:s[0]+Math.cos(u)*.18,y2:s[1]+Math.sin(u)*.18,d:.7})}else e.push({at:t,k:"burst",x:s[0]+E(I,-.04,.04),y:s[1]+E(I,-.04,.04)});t+=E(I,3.5,10)}return e.push({at:t,k:"next"}),oe++,e}n0=ae();let G=null;function it(e){for(D0+=e;n0.length&&n0[0].at<=D0;){const n=n0.shift();n.k==="drop"?ke(n.x,n.y,n.c,n.R):n.k==="burst"?n.hold?(y0(n.x,n.y,1.6,2.2,.6,.09),b.hold=n.hold):y0(n.x,n.y,1):n.k==="line"?G={a:[n.x,n.y],b:[n.x2,n.y2],t:0,d:n.d,last:[n.x,n.y]}:n.k==="next"&&(D0=0,n0=ae())}const t=n0.find(n=>n.k==="burst");if(t&&t.at-D0<.7&&b.hold<.1&&(b.x=t.x,b.y=t.y,b.hold=.75,b.slow=1),G){G.t+=e;const n=Math.min(1,G.t/G.d),c=[G.a[0]+(G.b[0]-G.a[0])*n,G.a[1]+(G.b[1]-G.a[1])*n];Fe(G.last,c,e),G.last=c,n>=1&&(G=null)}}let p=null;function ut(e){const t=o.input,n=t.taps();if(t.down){if(p||(p={x0:t.x,y0:t.y,t:0,mode:0,nd:0,next:0},j0=!0),p.t+=e,F0=0,p.mode===0&&(Math.hypot(t.x-p.x0,t.y-p.y0)>.02?(p.mode=1,p.last=S0(p.x0,p.y0)):p.t>.24&&(p.mode=2,p.col=De++%z,p.next=0)),p.mode===1){const c=S0(t.x,t.y);Math.hypot(...c)<.97&&Math.hypot(...p.last)<.97&&Fe(p.last,c,e),p.last=c}if(p.mode===2){p.next-=e;const c=S0(p.x0,p.y0);if(p.next<=0&&p.nd<6&&Math.hypot(...c)<.92){const s=p.nd?.025:0;ke(c[0]+(y()-.5)*s,c[1]+(y()-.5)*s,p.col,p.nd?.075+.015*p.nd:.1),p.nd++,p.next=.5}}}else{if(p){if(p.mode===0){const c=S0(p.x0,p.y0);Math.hypot(...c)<.97&&y0(c[0],c[1],1,2)}p=null}else if(n.length){j0=!0,F0=0;const c=S0(n[0].x,n[0].y);Math.hypot(...c)<.97&&y0(c[0],c[1],1,2)}F0+=e}}const q=new Float32Array(24*4);q.set([...k.E,k.th,...k.F,0,...k.R,0,...k.U,0,...f.lamp?(()=>{const e=Math.hypot(...f.L);return f.L.map(t=>t/e)})():f.L,f.lamp,...f.key,f.exp,...f.amb,H,...m0,F.rough*(f.lamp?.35:.04),0,k.fd,A0,i],0);const lt=P===1?C("#1f3f8a").map(e=>e*.9):P===2?Ee.map(e=>e*1.2):C("#e6e2da").map((e,t)=>e*(f.key[t]*.6+f.amb[t]));q.set([...lt,.55],18*4),q.set([...Je,S===2?1:0],19*4),q.set([i>=600?.006:.004,0,0,0],20*4),q.set([S===1?5:13,S===1?.9:.85,.3,0],21*4),q.set([f.sheen[0],f.sheen[1],.012,0],22*4);const ft=(()=>{const e=[.3,-.42,1],t=Math.hypot(...e);return e.map(n=>n/t)})();q.set([...ft,0],11*4);function Ce(e){q[8*4]=e,q.set([.11,b.vis,0,0],9*4);const t=(1-b.down)*1.6;q.set([b.x*H,b.y*H,t,b.down*b.vis],10*4);const n=T0[0];if(n){const c=Math.min(1,n.t/n.T);q.set([n.x*H,n.y*H,1.6*(1-c*c)+.05,1],12*4),q.set([...h0[n.k].slice(0,3),0],13*4)}else q[12*4+3]=0;for(let c=0;c<I0;c++){const s=a0[c];q.set(s?[s[0],s[1],s[2],.35]:[0,0,0,0],(14+c)*4)}i0(w.comp,null,i,i),L(0,Me),L(1,Z0),L(2,L0[x0]),L(3,K0),L(4,A.noise),L(5,M0[V]),a.uniform4fv(w.comp.u.uC,q),a.uniform4fv(w.comp.u.uE,ge),u0()}Ce(0);let ne=0,ce=0,f0=2654435769^l(6);const Ae=new Float32Array(400);function dt(e){if(!o.sound.on)return;const t=Math.min(400,Math.round(e*8e3));for(let n=0;n<t;n++){f0^=f0<<13,f0^=f0>>>17,f0^=f0<<5;const c=(f0>>>0)/4294967296*2-1;ne=ne*.985+c*.015,ce=ce*.6+c*.4,Ae[n]=ne*3.2+ce*(j?.01:.025)}o.sound.pcm(Ae.subarray(0,t),8e3,{vel:.18})}return(e,t)=>{t=ue(t,0,.2),ut(t),(!j0||F0>12)&&(j0&&F0-t<=12&&(D0=0,n0=ae(),n0.forEach(r=>r.at-=4.5)),it(t));for(let r=T0.length-1;r>=0;r--){const u=T0[r];u.t+=t,u.t>=u.T&&(ct(u),T0.splice(r,1))}b.hold-=t;const n=b.hold>0?1:0;b.vis+=(n-b.vis)*Math.min(1,t*(n?14:5)),b.down+=(n-b.down)*Math.min(1,t*(n?b.slow?3.2:16:4));const c=t>.05?2:1,s=t/c;if(s>0)for(let r=0;r<c;r++){Te(s);for(const u of b0)u.age+=s}for(let r=X.length-1;r>=0;r--)X[r].t-=t,X[r].t<=0&&X.splice(r,1);for(let r=b0.length-1;r>=0;r--)b0[r].age>.7&&b0.splice(r,1);for(let r=a0.length-1;r>=0;r--)a0[r][2]+=t,a0[r][2]>1.6&&a0.splice(r,1);dt(t),Ce(e)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
