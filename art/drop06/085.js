// Blob Lamp: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/085.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Et){Et&&function(){"use strict";const Ft=new WeakMap,j0=Math.PI*2,X=(t,o,s)=>t<o?o:t>s?s:t,qt=16*Math.PI/180,d0=Math.cos(qt),Z0=Math.sin(qt),Q0=96,$0=1/60,Pt=[{yb:.3,yg:.86,yt:1,wall:.006,hf:.56,cy:.43,cx:.11},{yb:.2,yg:.97,yt:1.05,wall:.005,hf:.585,cy:.46,cx:.12},{yb:.24,yg:.67,yt:.715,wall:.007,hf:.43,cy:.31,cx:.1}],re=(t,o,s)=>{const i=Math.max(s-Math.abs(t-o),0)/s;return Math.min(t,o)-i*i*s*.25};function A0(t,o){if(t===0){if(o<.3)return .152-.2533*o;if(o<.86){const p=(o-.3)/.56;return re(.069+.12*p,.105-.0843*(p-.3),.012)}const i=(o-.86)/.14;return(.05-.028*i)*Math.sqrt(X((1-i)/.18,0,1))}if(t===1){if(o<.2)return .078-.02*o;if(o<.97)return .056+.006*Math.sin(Math.PI*(o-.2)/.77);const i=(o-.97)/.08;return .061*Math.sqrt(X((1-i)/.45,0,1))}if(o<.24)return .105+.045*Math.pow(1-o/.24,1.5);if(o<.67)return Math.sqrt(Math.max(.055225-(o-.45)*(o-.45),0));const s=(o-.67)/.045;return .09*Math.sqrt(Math.max(1-s*s,0))}const le=[`#define YB 0.30
#define YG 0.86
#define YT 1.0
#define WALL 0.006
float profR(float y) {
  if (y < 0.30) return 0.152 - 0.2533 * y;
  if (y < 0.86) { float u = (y - 0.30) / 0.56; return smin(0.069 + 0.12 * u, 0.105 - 0.0843 * (u - 0.3), 0.012); }
  float v = (y - 0.86) / 0.14; return (0.05 - 0.028 * v) * sqrt(clamp((1.0 - v) / 0.18, 0.0, 1.0));
}`,`#define YB 0.20
#define YG 0.97
#define YT 1.05
#define WALL 0.005
float profR(float y) {
  if (y < 0.20) return 0.078 - 0.02 * y;
  if (y < 0.97) return 0.056 + 0.006 * sin(3.14159265 * (y - 0.2) / 0.77);
  float v = (y - 0.97) / 0.08; return 0.061 * sqrt(clamp((1.0 - v) / 0.45, 0.0, 1.0));
}`,`#define YB 0.24
#define YG 0.67
#define YT 0.715
#define WALL 0.007
float profR(float y) {
  if (y < 0.24) return 0.105 + 0.045 * pow(1.0 - y / 0.24, 1.5);
  if (y < 0.67) return sqrt(max(0.055225 - (y - 0.45) * (y - 0.45), 0.0));
  float v = (y - 0.67) / 0.045; return 0.09 * sqrt(max(1.0 - v * v, 0.0));
}`];function se(t){const o=Pt[t.shape],s=o.yg-o.yb,i=s-.014,p=n=>A0(t.shape,n+o.yb)-o.wall;let R=0,b=0;for(let n=0;n<=200;n++)R=Math.max(R,p(s*n/200));for(let n=0;n<200;n++)b+=2*p(s*(n+.5)/200)*s/200;const P=t.form===1,L=t.form===2,c=L?Q0:t.few?54:88,h=Math.sqrt(b*(t.shape===2?.2:.19)*(L?.62:1)/c/.866)*.5,F=h*3.4,S=h*3,U=S*S,n0=(h*2.7)**2,A=new Float32Array(c),w=new Float32Array(c),N=new Float32Array(c),_=new Float32Array(c),B=new Float32Array(c),h0=new Float32Array(c),T=new Float32Array(c),$=new Float32Array(c),p0=new Float32Array(c),J=new Float32Array(c),Q=new Float32Array(c),z0=new Uint8Array(c),l0=new Uint8Array(c),t0=new Uint8Array(c),D=new Int16Array(c),V=new Int16Array(c).fill(-1),v0=new Int16Array(c),T0=new Int16Array(c),W={on:!0,H:1,power:t.hot?1.3:1,boost:0,tilt:0,spin:0},G=new Float32Array(Q0*4),O=t.rnd,ot=P?.09:L?.022:t.few?.055:.05,x0=P?.22:L?.5:t.few?.3:.35,b0=.56,I=t.hot?.56:.5,M0=t.hot?.52:.4;let s0=0;const i0={N:c,rp:h,RK:F,Hg:s,RM:R,rin:p,x:A,y:w,T,sc:$,id:t0,ctl:W,onMerge:null};function q0(n,v){let m=0;for(let x=0;m<n;x++){const M=h*(1+x*1.732),z=p(M)-h*1.1,u=Math.max(1,Math.floor(z/h));for(let q=0;q<u&&m<n;q++)A[m]=-z+(q+.5+x%2*.5)*(z*2/u)-h*.5*(x%2)+(O()-.5)*h*.2,w[m]=M,T[m]=v,N[m]=_[m]=0,m++}return m}function D0(n,v,m,x,M){for(let z=0;z<v;z++){const u=z*2.39996,q=h*2*Math.sqrt(z)*.95;A[n]=m+q*Math.cos(u),w[n]=x+q*Math.sin(u)*1.05,T[n]=M+(O()-.5)*.04,N[n]=_[n]=0,n++}return n}const B0=()=>{t.two&&Array.from({length:c},(v,m)=>m).sort((v,m)=>A[v]-A[m]).forEach((v,m)=>{t0[v]=m<c/2?0:1})};i0.coldStart=n=>{q0(c,.12),B0(),W.on=!1,W.H=0;for(let v=0;v<90;v++)f0(1/30);if(n){W.on=!0;for(let v=0;v<n;v++)f0(1/30)}},i0.prewarm=()=>{if(P||L){let x=q0(Math.floor(c*(P?.4:.3)),.75);if(P){const M=i*(.3+O()*.08),z=(p(M)-h*2)*.8,u=c-x;for(let q=0;q<u;q++){const g=q*2.39996,c0=Math.sqrt((q+.5)/u);A[x]=z*c0*Math.cos(g),w[x]=M+z*1.25*c0*Math.sin(g),T[x]=.64+(O()-.5)*.04,N[x]=_[x]=0,x++}}else{const z=c-x;for(let u=0;u<11;u++){const q=u===10?c-x:Math.floor(z/11),g=.05+(u+.5+(O()-.5)*.6)/11*(i-.1);x=D0(x,q,(O()*2-1)*(p(g)-h*3)*.75,g,u%2?.88:.3)}}B0(),W.on=!0,W.H=1;for(let M=0;M<160;M++)f0(1/40);return}let n=q0(Math.floor(c*.34),.75);const v=t.few?3:5,m=c-n;for(let x=0;x<v;x++){const M=x===v-1?c-n:Math.floor(m/v*(.7+.6*O())),z=(x+.6+O()*.3)/(v+.4),u=.06+z*(i-.12),q=(O()*2-1)*(p(u)-h*4)*.6;n=D0(n,M,q,u,x%2?.85:.35)}B0(),W.on=!0,W.H=1;for(let x=0;x<160;x++)f0(1/40)};function P0(n){for(;v0[n]!==n;)v0[n]=v0[v0[n]],n=v0[n];return n}function H0(){for(let n=0;n<c;n++)v0[n]=n;for(let n=0;n<c;n++)for(let v=n+1;v<c;v++){if(t.two&&t0[n]!==t0[v])continue;const m=A[v]-A[n],x=w[v]-w[n];if(m*m+x*x<n0){const M=P0(n),z=P0(v);M!==z&&(v0[M]=z)}}T0.fill(0);for(let n=0;n<c;n++)D[n]=P0(n),T0[D[n]]++;for(let n=0;n<c;n++){if(T0[n]<6)continue;let v=-1,m=-1,x=0,M=0;for(let z=0;z<c;z++)D[z]===n&&V[z]>=0&&(v<0||V[z]===v?(v=V[z],x++):(m<0||V[z]===m)&&(m=V[z],M++));if(m>=0&&x>=3&&M>=3&&i0.onMerge){let z=0;for(let u=0;u<c;u++)D[u]===n&&(z+=w[u]);i0.onMerge(T0[n],z/T0[n]/s)}}for(let n=0;n<c;n++)V[n]=T0[D[n]]>=3?D[n]:-1}function f0(n){s0++,W.H+=((W.on?1+.35*W.boost:0)-W.H)*n/(W.on?12:20);const v=W.H,m=-Math.sin(W.tilt),x=Math.cos(W.tilt),M=Math.exp(-3.2*n),z=W.on?W.power*(1+1.6*W.boost):0,u=s*.5,q=W.spin;let g=0;const c0=R*.35*Math.sin(s0*.0021)*Math.sin(s0*77e-5+1),G0=h*2.6;for(let a=0;a<c;a++)if(w[a]<G0){const H=1-w[a]/G0,y=A[a]-c0;Q[a]=H*H*Math.exp(-y*y/(R*R*.25)),g+=Q[a]}else Q[a]=0;const at=z*(.25+.75*Math.min(v,1))*5*Math.min(1,c*.35/Math.max(g,.001));for(let a=0;a<c;a++){const H=X(w[a]/i,0,1),y=v*(M0+(I-M0)*Math.exp(-w[a]/.035)-.12*H)+(1-Math.min(v,1))*.08,k=X(1-z0[a]/6.5,.12,1);T[a]+=(y-T[a])*n*.18*k,T[a]+=at*Q[a]*n*(T[a]>.3&&T[a]<.5?.3:1),T[a]=X(T[a],0,1.15),$[a]=.9+.2*X(T[a],0,1.2);const e0=1.1*(T[a]-b0)+.8*Math.max(T[a]-.8,0);if(N[a]=N[a]*M+(e0*m-q*(w[a]-u)*.8)*n,_[a]=_[a]*M+(e0*x+q*A[a]*.8)*n,T[a]>b0){const o0=(T[a]-b0)*x0*h;N[a]+=(O()-.5)*o0,_[a]+=(O()-.5)*o0}B[a]=A[a],h0[a]=w[a],A[a]+=N[a]*n,w[a]+=_[a]*n,p0[a]=0,J[a]=0,Q[a]=0,l0[a]=z0[a],z0[a]=0}for(let a=0;a<c;a++){const H=T[a];for(let y=a+1;y<c;y++){const k=A[y]-A[a],e0=w[y]-w[a],o0=k*k+e0*e0;if(o0>U)continue;const u0=Math.sqrt(o0)+1e-7,L0=h*($[a]+$[y]),C0=!t.two||t0[a]===t0[y],N0=X(((H-T[y])*Math.sign(e0)-.03)/.12,0,1)*X((Math.min(H,T[y])-.36)/.1,0,1);let a0;if(u0<L0)a0=(L0-u0)*.45*(1-.95*N0);else if(C0){const vt=X((.32-Math.min(H,T[y]))/.2,0,1);a0=-(u0-L0)*(ot+.25*vt)*(1-(u0-L0)/(S-L0))*Math.min(1,5/(l0[a]+l0[y]+1))*(1-N0)}else continue;const K=k/u0,Y0=e0/u0;if(A[a]-=K*a0,w[a]-=Y0*a0,A[y]+=K*a0,w[y]+=Y0*a0,!C0)continue;const r0=(1-u0/S)*(1-N0);u0<h*2.6&&(z0[a]++,z0[y]++);const k0=(T[y]-H)*r0*n*.3;T[a]+=k0,T[y]-=k0,p0[a]+=(N[y]-N[a])*r0,J[a]+=(_[y]-_[a])*r0,Q[a]+=r0,p0[y]+=(N[a]-N[y])*r0,J[y]+=(_[a]-_[y])*r0,Q[y]+=r0}}for(let a=0;a<c;a++){const H=h*$[a];w[a]<H*.95&&(w[a]=H*.95),w[a]>i-H&&(w[a]=i-H);const y=p(w[a])-H*.95;if(A[a]>y?A[a]=y:A[a]<-y&&(A[a]=-y),N[a]=(A[a]-B[a])/n,_[a]=(w[a]-h0[a])/n,Q[a]>0){const k=X((.32-T[a])/.2,0,1),e0=(.06+.5*k)/(1+Q[a]*.15);N[a]+=p0[a]*e0,_[a]+=J[a]*e0}}s0%12===0&&H0()}return i0.step=f0,i0.pack=()=>{for(let n=0;n<c;n++)G[n*4]=A[n],G[n*4+1]=w[n],G[n*4+2]=F*$[n],G[n*4+3]=t0[n]+Math.min(T[n],.99);return G},i0}const ie=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,fe=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform vec4 uP[${Q0}];
uniform vec4 uF[2];
void main() {
  vec2 q = uF[0].xy + vUv * uF[0].zw;
  float f = 0.0, fx = 0.0, fy = 0.0, ft = 0.0;
  int n = int(uF[1].x + 0.5);
  for (int i = 0; i < n; i++) {
    vec4 P = uP[i];
    vec2 d = q - P.xy;
    float r2 = P.z * P.z * uF[1].y, u = dot(d, d) / r2;
    if (u < 1.0) { float a = 1.0 - u, w = a * a * a, g = -6.0 * a * a / r2; f += w; fx += g * d.x; fy += g * d.y; ft += w * fract(P.w); }
  }
  o = vec4(f, fx, fy, ft / max(f, 1e-4));
}`,ue=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform vec4 uP[${Q0}];
uniform vec4 uF[2];
void main() {
  vec2 q = uF[0].xy + vUv * uF[0].zw;
  vec2 b = vec2(0.0, uF[1].y);
  vec2 v = q - b; float L = length(v); vec2 dir = v / L;
  float tau = 0.0, fb = 0.0, wm = 0.0, ws = 1e-4;
  int n = int(uF[1].x + 0.5);
  for (int i = 0; i < n; i++) {
    vec4 P = uP[i];
    vec2 c = P.xy - b;
    float s = dot(c, dir), pp = c.x * dir.y - c.y * dir.x;
    float rho = P.z * uF[1].w, ch = rho * rho - pp * pp;
    if (ch > 0.0) tau += sqrt(ch) * smoothstep(-rho, rho, L - s);
    vec2 d = q - P.xy; float u = dot(d, d) / (P.z * P.z * 3.0);
    if (u < 1.0) { float a = 1.0 - u, w = a * a * a; fb += w; wm += w * floor(P.w); ws += w; }
  }
  o = vec4(exp(-tau * uF[1].z), wm / ws, fb, 0.0);
}`,St=`
uniform sampler2D uN;
uniform vec4 uR[96];
vec3 RO, RD;
float PX, XL, YS;
vec2 UV;
#define CTH uR[0].z
#define NFD int(uR[94].w + 0.5)
#if LAYER < 9
#define LY LAYER
#else
#define LY int(uR[15].x + 0.5)
#endif
#define STH uR[0].w
float h21(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float comp(vec4 v, int j) { return dot(v, vec4(equal(ivec4(j), ivec4(0, 1, 2, 3)))); }
float coc(float z) { return max(uR[18].w * abs(z - uR[19].x), PX * 0.7); }
float lampR(float y) {
  float f = clamp(y / uR[2].z, 0.0, 1.0) * 23.0;
  int i = int(min(floor(f), 22.0)), j = i + 1;
  return mix(comp(uR[20 + i / 4], i - (i / 4) * 4), comp(uR[20 + j / 4], j - (j / 4) * 4), f - float(i));
}
vec3 hitY(float h) { return RO + RD * ((RO.y - h) / STH); }
vec3 hitZ(float z) { return RO + RD * ((RO.z - z) / CTH); }
float box2(vec2 p, vec2 lo, vec2 hi, float c) { vec2 d = max(lo - p, p - hi); return smoothstep(c, -c, max(d.x, d.y)); }
float sdRB(vec2 p, vec2 c, vec2 b, float r) { vec2 q = abs(p - c) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float sdEll(vec2 p, vec2 r) { return (length(p / r) - 1.0) * min(r.x, r.y); }
float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
float sminf(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }

// what blocks the lamp's light: its own base (for the table round it), the books, and the glass of water
float shade(vec3 p, vec3 q) {
  float s = 1.0, yb = uR[2].x;

  if (p.y < yb) {
    float t = (yb * 0.92 - p.y) / (q.y - p.y);
    if (t > 0.0 && t < 1.0) s *= smoothstep(uR[18].x - 0.004, uR[18].x + 0.025, length(mix(p.xz, q.xz, t)));
    t = (yb * 0.45 - p.y) / (q.y - p.y);
    if (t > 0.0 && t < 1.0) s *= smoothstep(uR[18].y - 0.004, uR[18].y + 0.025, length(mix(p.xz, q.xz, t)));
  }
  int nbk = int(uR[94].y + 0.5);
  for (int k = 0; k < nbk; k++) {
    vec4 A = uR[9 + 2 * k], B = uR[10 + 2 * k];
    if (A.w <= 0.0) continue;
    vec3 c = vec3(A.x, B.z + B.y * 0.5, A.y), a0 = p - c, d0 = q - p;
    float cs = cos(A.z), sn = sin(A.z);
    vec3 ro = vec3(cs * a0.x - sn * a0.z, a0.y, sn * a0.x + cs * a0.z), rd = vec3(cs * d0.x - sn * d0.z, d0.y, sn * d0.x + cs * d0.z) + 1e-6;
    vec3 hb = vec3(A.w, B.y, B.x) * 0.5, iv = 1.0 / rd, t1 = (-hb - ro) * iv, t2 = (hb - ro) * iv, tn = min(t1, t2), tx = max(t1, t2);
    float a = max(max(tn.x, tn.y), tn.z), b = min(min(tx.x, tx.y), tx.z);
    if (b > max(a, 0.0) && a < 1.0 && b > 0.002) s *= 0.1;
  }
  vec4 G = uR[13];
  if (G.z > 0.0 && p.y < G.w) {
    vec2 a = p.xz, d = q.xz - p.xz;
    float tt = dot(G.xy - a, d) / max(dot(d, d), 1e-6);
    if (tt > 0.0 && tt < 1.0 && mix(p.y, q.y, tt) < G.w) {
      float bb = length(a + d * tt - G.xy) / G.z, far = length(a - G.xy) / G.z;
      float caus = exp(-bb * bb * 16.0) * smoothstep(1.3, 3.0, far) * 2.4;
      s *= mix(1.0, 0.45 + caus, smoothstep(1.05, 0.9, bb));
    }
  }
  return s;
}
// light from the lamp: band 0 is the bright seam where the glass meets the base, 1-3 the low, middle, high glass
void lampLight(vec3 p, vec3 n, float gl, out vec4 D, out vec4 S) {
  D = vec4(0.0); S = vec4(0.0);
  vec3 R = reflect(RD, n);
  p += n * 0.004;
  vec2 hd = p.xz; float hl = length(hd); hd = hl > 1e-4 ? hd / hl : vec2(0.0, 1.0);
  int nl = int(uR[2].w + 0.5);
  float yb = uR[2].x, yg = uR[2].y;
  for (int i = 0; i < nl; i++) {
    float y, rad, ar; int band;
    if (i == 0) { y = yb + 0.004; rad = lampR(yb) + 0.002; ar = 0.004; band = 0; }
    else { float fy = (float(i) - 0.5) / float(nl - 1); y = mix(yb, yg, fy); rad = lampR(y) * 0.85; ar = (yg - yb) / float(nl - 1) * 2.0 * rad; band = 1 + min((i - 1) * 3 / (nl - 1), 2); }
    vec3 q = vec3(hd.x * rad, y, hd.y * rad);
    vec3 l = q - p; float d2 = dot(l, l) + 0.0015; l *= inversesqrt(d2);
    float em = i == 0 ? 1.0 : 0.45 + 0.55 * max(-dot(l, vec3(hd.x, 0.0, hd.y)), 0.0);
    float k = ar * em * shade(p, q) / d2;
    vec4 m = vec4(equal(ivec4(band), ivec4(0, 1, 2, 3)));
    D += m * (max(dot(n, l), 0.0) * k);
    S += m * (pow(max(dot(R, l), 0.0), gl) * (gl + 2.0) * 0.05 * k);
  }
}
vec3 nightLight(vec3 p, vec3 n) {
  vec3 c = uR[8].rgb * (0.55 + 0.3 * n.y + 0.25 * n.z);
  vec4 W = uR[6];
  vec3 wc = vec3(0.5 * (W.x + W.y), 0.5 * (W.z + W.w), uR[3].z);
  vec3 l = wc - p; float d2 = dot(l, l); l *= inversesqrt(d2);
  return c + uR[37].rgb * uR[8].w * max(dot(n, l) * 0.8 + 0.2, 0.0) / (0.3 + d2);
}
// the night outside the window: sky and out-of-focus lights (cat's-eye clipped toward the frame's edges)
vec3 outside(vec2 uv) {
  vec3 c = mix(uR[7].rgb, uR[36].rgb, clamp((uv.y - 0.3) * 1.6, 0.0, 1.0));
  c *= 0.8 + 0.4 * textureLod(uN, uv * 0.6 + 0.3, 2.5).g;
  int nb = int(uR[7].w + 0.5);
  for (int i = 0; i < nb; i++) {
    vec4 B = uR[38 + 2 * i], C = uR[39 + 2 * i];
    vec2 d = uv - B.xy; float r = B.z, d1 = length(d);
    if (d1 > r * 1.25) continue;
    float d2 = length(d + (B.xy - 0.5) * 0.9 * r), e = r * 0.07 + 0.0015;
    float m = smoothstep(r, r - e, d1) * smoothstep(r * 1.03, r * 1.03 - e, d2);
    float tex = 0.88 + 0.24 * textureLod(uN, d / r * 0.12 + B.xy * 3.1, 0.0).b;
    c += C.rgb * m * (0.75 + 0.4 * smoothstep(0.5 * r, r, d1) * C.w) * tex;
  }
  return c;
}
vec2 bez(float t) { vec2 p0 = uR[16].xy, p1 = uR[16].zw, p2 = uR[17].xy, p3 = uR[17].zw; float s = 1.0 - t; return s * s * s * p0 + 3.0 * s * s * t * p1 + 3.0 * s * t * t * p2 + t * t * t * p3; }
float propSD(vec2 p) {
#if ROOM == 0
  return min(sdRB(p, vec2(0.6, 0.13), vec2(0.25, 0.1), 0.09), sdRB(p, vec2(0.86, 0.2), vec2(0.22, 0.12), 0.1));
#else
  return min(sdRB(p, vec2(0.78, 0.12), vec2(0.6, 0.3), 0.12), sdRB(p, vec2(0.22, -0.1), vec2(0.1, 0.26), 0.08));
#endif
}

// one layer of the room at this pixel: coverage a, transmission tr (1 = it only adds), surface, gloss, spec weight,
// own light em, a mask (window / switch) and direct per-band spec Sx
bool layer(int L, out float a, out vec3 tr, out vec3 p, out vec3 n, out vec3 alb, out float gl, out float sw, out vec3 em, out float mk, out vec4 Sx) {
  a = 0.0; tr = vec3(0.0); p = vec3(0.0); n = vec3(0.0, 0.0, 1.0); alb = vec3(0.0); gl = 8.0; sw = 0.0; em = vec3(0.0); mk = 0.0; Sx = vec4(0.0);
#if LAYER == 0 || defined(G0)
  if (LY == 0) {
    // the wall, the window and the night beyond it
    float zw = uR[3].z;
    p = hitZ(zw); a = 1.0;
    float c = coc(zw), lod = clamp(log2(c * 300.0), 0.0, 6.0);
    vec4 W = uR[6];
    alb = uR[4].rgb * (0.9 + 0.2 * textureLod(uN, p.xy * 1.3, lod).r);
#if ROOM == 1
    float row = floor(p.y / 0.2), bx = fract(p.x / 0.4 + 0.5 * mod(row, 2.0)), by = fract(p.y / 0.2);
    float mort = smoothstep(0.006 + c, 0.0, min(min(bx, 1.0 - bx) * 0.4, min(by, 1.0 - by) * 0.2));
    alb *= (1.0 - 0.28 * mort) * (0.92 + 0.16 * textureLod(uN, p.xy * 7.0, lod).b);
    // a corkboard with a few pinned cards
    float cb = box2(p.xy, vec2(0.16, 0.3), vec2(0.7, 0.84), c), ci = box2(p.xy, vec2(0.185, 0.325), vec2(0.675, 0.815), c);
    vec3 cork = vec3(0.3, 0.19, 0.1) * (0.75 + 0.5 * textureLod(uN, p.xy * 9.0, lod).g);
    alb = mix(alb, vec3(0.22, 0.13, 0.07), cb - ci);
    alb = mix(alb, cork, ci);
    int ncd = int(uR[95].z + 0.5);
    for (int k = 0; k < ncd; k++) {
      float fk = float(k);
      vec2 cc = vec2(0.26 + 0.2 * mod(fk, 2.0) + 0.06 * h21(vec2(fk, 1.0)), 0.42 + 0.22 * floor(fk / 2.0) + 0.05 * h21(vec2(fk, 2.0)));
      vec2 hs = vec2(0.055 + 0.03 * h21(vec2(fk, 3.0)), 0.07 + 0.02 * h21(vec2(fk, 4.0)));
      float m = box2(p.xy, cc - hs, cc + hs, c) * ci;
      vec3 pc = fk < 0.5 ? vec3(0.55, 0.5, 0.25) : fk < 1.5 ? vec3(0.5, 0.5, 0.48) : fk < 2.5 ? vec3(0.25, 0.4, 0.5) : vec3(0.55, 0.32, 0.35);
      alb = mix(alb, pc, m);
    }
#endif
#if ROOM == 0
    {
      vec2 f0 = vec2(0.2, 0.4), f1 = vec2(0.66, 0.88);
      float fo = box2(p.xy, f0, f1, c), fi = box2(p.xy, f0 + 0.026, f1 - 0.026, c), pi = box2(p.xy, f0 + 0.07, f1 - 0.07, c);
      vec2 pq = (p.xy - f0 - 0.07) / (f1 - f0 - 0.14);
      vec3 art = mix(vec3(0.08, 0.12, 0.16), vec3(0.28, 0.24, 0.2), smoothstep(0.35, 0.75, pq.y + 0.1 * sin(pq.x * 7.0)));
      art = mix(art, vec3(0.5, 0.42, 0.3), smoothstep(0.1, 0.07, length(pq - vec2(0.68, 0.72))));
      art = mix(art, vec3(0.04, 0.06, 0.07), smoothstep(0.3, 0.26, pq.y + 0.06 * sin(pq.x * 11.0 + 1.0)));
      alb = mix(alb, vec3(0.05, 0.035, 0.025), fo - fi);
      alb = mix(alb, vec3(0.48, 0.46, 0.42), fi - pi);
      alb = mix(alb, art, pi);
    }
#endif
    float fw = 0.04;
    float outer = box2(p.xy, W.xz, W.yw, c), open = box2(p.xy, W.xz + fw, W.yw - fw, c);
#if ROOM == 3
    float mul = smoothstep(c, -c, abs(p.x + 0.44) - 0.03) + smoothstep(c, -c, p.y - 0.06);
#else
    float mul = smoothstep(c, -c, abs(p.x - 0.5 * (W.x + W.y)) - 0.018) + smoothstep(c, -c, abs(p.y - mix(W.z, W.w, 0.58)) - 0.018);
#endif
    open *= 1.0 - clamp(mul, 0.0, 1.0);
    alb = mix(alb, uR[37].w > 0.5 ? vec3(0.06, 0.045, 0.035) : vec3(0.5, 0.49, 0.46), clamp(outer - open, 0.0, 1.0));
    vec2 ouv = UV;
    float od = 1.0;
#if ROOM == 3
    // rain on the pane: each drop is a little lens showing the lights upside down
    vec2 g = p.xy * vec2(17.0, 13.0); vec2 gi = floor(g), gf = fract(g) - 0.5;
    float hh = h21(gi);
    vec2 oo = (vec2(h21(gi + 3.1), h21(gi + 7.3)) - 0.5) * 0.45;
    float rr = 0.1 + 0.22 * hh * hh, dd = length((gf - oo) * vec2(1.0, 0.8));
    float drop = smoothstep(rr + 0.1, rr - 0.06, dd) * step(0.45, hh);
    ouv -= (gf - oo) / vec2(17.0, 13.0) * drop * 1.6;
    od = 1.0 - drop * 0.15 * smoothstep(rr * 0.3, rr + 0.05, dd);
#endif
    vec3 ot = outside(ouv) * od;
#if ROOM == 1
    // blinds, tilted half open
    float sl = fract(p.y / 0.048), slat = smoothstep(0.62 + c * 12.0, 0.6, sl) * smoothstep(0.0, 0.04 + c * 12.0, sl);
    slat = mix(slat, 0.55, clamp(c * 25.0, 0.0, 0.8));
    float bl = box2(p.xy, W.xz + vec2(0.02, 0.08), W.yw - vec2(0.02, 0.0), c);
    alb = mix(alb, vec3(0.42, 0.42, 0.4) * (0.8 + 0.3 * sl), bl * slat);
    open *= 1.0 - bl * slat;
#endif
#if ROOM == 0
    // a heavy curtain drawn over the window's outer edge, its folds catching the lamp
    float cm = box2(p.xy, vec2(W.x - 0.5, W.z - 0.35), vec2(W.x + 0.15 + 0.03 * sin(p.y * 7.0), 3.0), c);
    float fold = sin(p.x * 48.0 + 2.0 * sin(p.x * 13.0 + p.y * 2.0));
    alb = mix(alb, uR[4].w > 0.5 ? vec3(0.08, 0.1, 0.16) : vec3(0.18, 0.1, 0.08), cm) * (1.0 - cm * 0.25 * (1.0 - fold));
    n = normalize(mix(n, vec3(fold * 0.55, 0.0, 1.0), cm));
    open *= 1.0 - cm;
#endif
    em = ot * open;
    alb *= 1.0 - open;
    mk = open;
    return true;
  }
#endif
#if LAYER == 1 || defined(G1)
  if (LY == 1) {
#if ROOM == 0 || ROOM == 2
#if ROOM == 0
    float zp = uR[3].z + 0.18;
#else
    float zp = -0.85;
#endif
    p = hitZ(zp);
    float c = coc(zp), s0 = 0.0, sx = 0.0, sy = 0.0;
    for (int k = 0; k < NFD; k++) { float v = propSD(p.xy + (k == 1 ? vec2(0.004, 0.0) : k == 2 ? vec2(0.0, 0.004) : vec2(0.0))); if (k == 0) s0 = v; else if (k == 1) sx = v; else sy = v; }
    a = smoothstep(c, -c, s0);
    if (a <= 0.0) return false;
    vec2 gr = vec2(sx - s0, sy - s0) / 0.004;
    float dep = clamp(-s0 / 0.08, 0.0, 1.0);
    n = normalize(vec3(gr * (1.0 - dep) * 1.3, 0.3 + dep));
    float cr = textureLod(uN, p.xy * vec2(2.0, 3.5), clamp(log2(c * 200.0), 0.0, 6.0)).r;
#if ROOM == 0
    alb = uR[12].w > 0.5 ? vec3(0.42, 0.44, 0.47) : vec3(0.5, 0.47, 0.42);
    alb *= 0.82 + 0.3 * cr;
#else
    alb = vec3(0.2, 0.15, 0.12) * (0.8 + 0.4 * cr);
#endif
    return true;
#else
    return false;
#endif
  }
#endif
#if LAYER == 2 || defined(G2)
  if (LY == 2) {
    // the table top and its front edge
    vec3 pt = hitY(0.0);
    float zf = uR[3].w, zb = uR[19].w;
    bool top = pt.z <= zf;
    if (top) { if (pt.z < zb - 0.05) return false; p = pt; n = vec3(0.0, 1.0, 0.0); }
    else { p = hitZ(zf); }
    float c = coc(p.z);
    a = smoothstep(-c, c, p.x - uR[19].y) * smoothstep(c, -c, p.x - uR[19].z);
    if (top && zb > uR[3].z + 0.02) a *= smoothstep(-c * 3.0, c * 3.0, (p.z - zb) * STH);
    if (a <= 0.0) return false;
    float kind = uR[4].w, lod = clamp(log2(c * 220.0), 0.0, 6.0);
    vec2 tq = top ? p.xz : vec2(p.x, zf + p.y * 0.3);
    float f1 = textureLod(uN, tq * vec2(0.22, 2.4), lod).r, f2 = textureLod(uN, tq * vec2(1.1, 8.0), lod).g, f3 = textureLod(uN, tq * 3.0, lod).b;
    float grain = mix(0.5, 0.5 + 0.5 * sin((tq.y + f1 * 0.3) * 75.0), exp(-lod * 0.7));
    vec3 ta = uR[5].rgb;
    if (kind < 0.5 || (kind > 1.5 && kind < 2.5)) alb = ta * (0.62 + 0.45 * grain * (0.6 + 0.6 * f2) + 0.25 * f1);
    else if (kind < 1.5) alb = ta * (0.93 + 0.1 * f3);
    else if (kind < 3.5) alb = ta * (0.94 + 0.1 * f1);
    else alb = ta * (0.6 + 0.6 * f3 * f2 + 0.2 * f1);
    gl = uR[5].w; sw = kind > 3.5 ? 0.0 : top ? 1.0 : 0.3;
    if (!top) { alb *= 0.7; gl = 6.0; if (kind > 0.5 && kind < 1.5) alb *= 0.9; }
    if (top) {
      // contact shadows round the lamp's base, the books and the glass, and where the table meets the wall
      float rb = lampR(0.0);
      float ao = 1.0 - 0.6 * exp(-max(length(p.xz) - rb, 0.0) / 0.016);
      vec4 G = uR[13];
      if (G.z > 0.0) ao *= 1.0 - 0.45 * exp(-max(length(p.xz - G.xy) - G.z, 0.0) / 0.012);
      int nbk = int(uR[94].y + 0.5);
      for (int k = 0; k < nbk; k++) {
        vec4 A = uR[9 + 2 * k], B = uR[10 + 2 * k];
        if (A.w <= 0.0 || B.z > 0.01) continue;
        vec2 bq = p.xz - A.xy; float cs = cos(A.z), sn = sin(A.z);
        bq = vec2(cs * bq.x - sn * bq.y, sn * bq.x + cs * bq.y);
        vec2 e = abs(bq) - vec2(A.w, B.x) * 0.5;
        ao *= 1.0 - 0.5 * exp(-max(length(max(e, 0.0)) + min(max(e.x, e.y), 0.0), 0.0) / 0.01);
      }
      if (zb < uR[3].z + 0.02) ao *= 1.0 - 0.35 * exp(-(p.z - uR[3].z) / 0.05);
      alb *= ao;
      float ed = smoothstep(zf - 0.012, zf, p.z);
      n = normalize(mix(n, vec3(0.0, 0.55, 0.85), ed));
    }
    return true;
  }
#endif
#if LAYER == 4 || defined(G4)
  if (LY == 4) {
    // a glass of water
    vec4 G = uR[13];
    if (G.z <= 0.0) return false;
    float gx = G.x, gz = G.y, rg = G.z, c = coc(gz);
    float u = (XL - gx) / rg, sq = sqrt(max(1.0 - u * u, 0.0)), ell = sq * rg * STH;
    float yb = -gz * STH, yt = G.w * CTH - gz * STH;
    float sd = max(abs(XL - gx) - rg, max((yb - ell) - YS, YS - (yt + ell)));
    a = smoothstep(c, -c, sd);
    if (a <= 0.0) return false;
    float zf = gz + rg * sq, yf = (YS + zf * STH) / CTH;
    p = vec3(XL, clamp(yf, 0.0, G.w), zf);
    n = normalize(vec3(u, 0.0, max(sq, 0.15)));
    float wl = uR[14].x, ysw = wl * CTH - gz * STH;
    bool water = YS < ysw + ell * 0.0 + (YS < ysw ? 0.0 : 0.0) && yf < wl;
    tr = water ? vec3(0.6, 0.68, 0.7) : vec3(0.82, 0.85, 0.85);
    gl = 70.0; sw = 0.3 + 0.9 * smoothstep(0.55, 0.97, abs(u));
    float s = sign(-gx);
    float stripe = exp(-pow((u + 0.5 * s) / 0.2, 2.0)) * (water ? 1.0 : 0.2);
    float lip = smoothstep(0.005 + c, 0.0, abs(abs(YS - yt) - ell)) * step(abs(u), 1.0);
    float men = smoothstep(0.004 + c, 0.0, abs(abs(YS - ysw) - ell)) * step(abs(u), 1.0);
    float surf = smoothstep(ell, ell * 0.7, abs(YS - ysw)) * step(abs(u), 1.0);
    float base = smoothstep(0.016, 0.0, yf) * (0.5 + 0.5 * sq);
    float rim = smoothstep(0.8, 0.97, abs(u)) * smoothstep(1.0, 0.97, abs(u));
    float lit = 0.5 + 0.5 * clamp(-u * s, 0.0, 1.0);
    Sx = vec4(0.01, 0.16, 0.05, 0.0) * stripe + vec4(0.008, 0.02, 0.012, 0.006) * (lip + men * 0.6) + vec4(0.01, 0.05, 0.02, 0.005) * rim * lit + vec4(0.005, 0.02, 0.005, 0.0) * (surf * 0.4 + base);
    em = uR[8].rgb * (lip * 0.5 + rim) * 1.5;
    return true;
  }
#endif
#if LAYER == 5 || defined(G5)
  if (LY == 5) {
    // the books: screen-space coverage from their projected outline, shading from the box they are
    int k = int(uR[95].w + 0.5);
    vec4 A = uR[9 + 2 * k], B = uR[10 + 2 * k];
    if (A.w <= 0.0) return false;
    vec2 sp = vec2(XL, YS);
    float sd = -1e9;
    int ned = int(uR[95].x + 0.5);
    for (int e = 0; e < ned; e++) {
      int e1 = e + 1 - (e + 1) / 6 * 6;
      vec4 va = uR[30 + 3 * k + e / 2], vb = uR[30 + 3 * k + e1 / 2];
      vec2 a0 = e - (e / 2) * 2 == 0 ? va.xy : va.zw, b0 = e1 - (e1 / 2) * 2 == 0 ? vb.xy : vb.zw;
      vec2 ed = b0 - a0; float l = length(ed);
      if (l < 1e-5) continue;
      sd = max(sd, dot(sp - a0, vec2(ed.y, -ed.x) / l));
    }
    float c = coc(A.y);
    a = smoothstep(c, -c, sd);
    if (a <= 0.0) return false;
    vec3 cen = vec3(A.x, B.z + B.y * 0.5, A.y), a0 = RO - cen;
    float cs = cos(A.z), sn = sin(A.z);
    vec3 ro = vec3(cs * a0.x - sn * a0.z, a0.y, sn * a0.x + cs * a0.z), rd = vec3(cs * RD.x - sn * RD.z, RD.y, sn * RD.x + cs * RD.z) + 1e-6;
    vec3 hb = vec3(A.w, B.y, B.x) * 0.5 + c, iv = 1.0 / rd, t1 = (-hb - ro) * iv, t2 = (hb - ro) * iv, tn = min(t1, t2);
    float tN = max(max(tn.x, tn.y), tn.z);
    vec3 lp = ro + rd * tN;
    vec3 nl = tN == tn.x ? vec3(-sign(rd.x), 0.0, 0.0) : tN == tn.y ? vec3(0.0, -sign(rd.y), 0.0) : vec3(0.0, 0.0, -sign(rd.z));
    hb -= c;
    p = cen + vec3(cs * lp.x + sn * lp.z, lp.y, -sn * lp.x + cs * lp.z);
    n = vec3(cs * nl.x + sn * nl.z, nl.y, -sn * nl.x + cs * nl.z);
    float ci = B.w;
    vec3 cov = ci < 0.5 ? vec3(0.3, 0.05, 0.04) : ci < 1.5 ? vec3(0.05, 0.07, 0.17) : ci < 2.5 ? vec3(0.05, 0.13, 0.07) : vec3(0.4, 0.25, 0.07);
    float lod = clamp(log2(c * 250.0), 0.0, 6.0);
    float cloth = 0.85 + 0.3 * textureLod(uN, lp.xz * 6.0 + float(k), lod).b;
    if (nl.y > 0.5) {
      alb = cov * cloth; gl = 14.0; sw = 0.35;
      float emb = box2(lp.xz, -hb.xz + 0.03, hb.xz - 0.03, 0.002) - box2(lp.xz, -hb.xz + 0.034, hb.xz - 0.034, 0.002);
      alb *= 1.0 - 0.25 * emb;
    } else if (nl.x < -0.5) {
      alb = cov * cloth * 0.9; gl = 10.0; sw = 0.25;
      n = normalize(n + vec3(0.0, lp.y / hb.y * 0.5, 0.0));
    } else {
      float board = smoothstep(hb.y - 0.007, hb.y - 0.005, abs(lp.y));
      float pages = 0.82 + 0.18 * textureLod(uN, vec2((nl.x != 0.0 ? lp.z : lp.x) * 1.5, lp.y * 90.0), lod).g;
      alb = mix(vec3(0.62, 0.57, 0.47) * pages * (0.85 + 0.15 * smoothstep(hb.y, 0.0, abs(lp.y))), cov * cloth, board);
      gl = 6.0; sw = 0.1;
    }
    return true;
  }
#endif
#if LAYER == 7 || defined(G7)
  if (LY == 7) {
    // the cord across the table, with its switch
    if (uR[14].z < 0.5) return false;
    float cr = 0.0055;
    vec3 pc = hitY(cr);
    float best = 1e9; vec2 bo = vec2(0.0);
    vec2 a0 = bez(0.0);
    int ncs = int(uR[94].z + 0.5);
    for (int i = 1; i <= ncs; i++) {
      vec2 a1 = bez(float(i) / float(ncs)), e = a1 - a0;
      vec2 oo = pc.xz - a0 - e * clamp(dot(pc.xz - a0, e) / dot(e, e), 0.0, 1.0);
      float dd = length(vec2(oo.x, oo.y * STH));
      if (dd < best) { best = dd; bo = oo; }
      a0 = a1;
    }
    float c = coc(pc.z);
    float ac = smoothstep(cr + c, cr - c, best) * step(pc.z, uR[3].w);
    vec2 sc = bez(uR[18].z), tg = normalize(bez(uR[18].z + 0.01) - sc);
    vec3 pT = hitY(0.022), pB = hitY(0.0);
    vec2 lT = vec2(dot(pT.xz - sc, tg), dot(pT.xz - sc, vec2(-tg.y, tg.x))), lB = vec2(dot(pB.xz - sc, tg), dot(pB.xz - sc, vec2(-tg.y, tg.x)));
    float topm = smoothstep(c, -c, max(abs(lT.x) - 0.034, (abs(lT.y) - 0.016) * STH));
    float sidem = smoothstep(c, -c, max(abs(lB.x) - 0.034, (abs(lB.y) - 0.016) * STH)) * (1.0 - topm);
    a = max(ac, max(topm, sidem));
    if (a <= 0.0) return false;
    if (topm + sidem > ac) {
      p = topm > sidem ? pT : vec3(pB.x, 0.011, pB.z);
      n = topm > sidem ? normalize(vec3(-tg.y * 0.0, 1.0, 0.0) + vec3(tg.x, 0.0, tg.y) * 0.18 * sign(lT.x) * uR[18].z * 0.0) : vec3(0.0, 0.25, 0.97);
      alb = uR[4].w > 0.5 && uR[4].w < 1.5 ? vec3(0.04) : vec3(0.42, 0.41, 0.39);
      gl = 30.0; sw = 0.4;
      mk = topm * (lT.x > 0.0 ? 1.0 : -1.0) * smoothstep(0.0, 0.004, abs(lT.x));
      alb *= 1.0 - 0.5 * smoothstep(0.003, 0.0, abs(lT.x)) * topm;
    } else {
      p = vec3(pc.x, cr, pc.z);
      n = normalize(vec3(bo.x, sqrt(max(cr * cr - best * best, 0.0)) + 0.002, bo.y * STH));
      alb = uR[4].w > 0.5 && uR[4].w < 1.5 ? vec3(0.03) : vec3(0.4, 0.39, 0.37);
      gl = 20.0; sw = 0.3;
    }
    return true;
  }
#endif
  return false;
}

void main() {
  UV = gl_FragCoord.xy / uR[0].x;
  PX = 2.0 * uR[1].z / uR[0].x;
  XL = uR[1].x + (UV.x * 2.0 - 1.0) * uR[1].z * uR[1].w;
  YS = uR[1].y + (UV.y * 2.0 - 1.0) * uR[1].z;
  RD = vec3(0.0, -STH, -CTH);
  RO = vec3(XL, YS * CTH, -YS * STH) - RD * 20.0;
  int sel = int(uR[0].y + 0.5);
#if LAYER == 8
  // the lamp itself hides the room's specular; its bloom lies over everything
  float ly = YS / CTH;
  float lm = smoothstep(PX, -PX, abs(XL) - lampR(ly)) * step(0.0, ly) * step(ly, uR[2].z);
  vec4 bl = vec4(0.0);
  int nbl = int(uR[95].y + 0.5);
  for (int k = 0; k < nbl; k++) {
    vec4 Bb = uR[26 + k];
    vec2 dd = max(abs(vec2(XL, YS - 0.5 * (Bb.x + Bb.y))) - vec2(Bb.z, 0.5 * (Bb.y - Bb.x)), 0.0);
    float d = length(dd);
    bl += vec4(equal(ivec4(k), ivec4(0, 1, 2, 3))) * Bb.w * (0.03 * exp(-d / 0.014) + 0.008 * exp(-d / 0.06) + 0.0016 * exp(-d / 0.25));
  }
  o = sel == 4 ? vec4(bl.yzw, lm) : vec4(0.0, bl.x, 0.0, lm);
#else
  float a, gl, sw, mk; vec3 tr, p, n, alb, em; vec4 Sx;
  if (!layer(0, a, tr, p, n, alb, gl, sw, em, mk, Sx) || a <= 0.0) discard;
  vec4 D, S;
  lampLight(p, n, gl, D, S);
  float kp = dot(1.0 - a + a * tr, vec3(0.3333));
  D *= step(0.001, alb.r + alb.g + alb.b);
  S = S * sw + Sx;
  vec3 v;
  if (sel == 0) v = alb * nightLight(p, n) + em;
  else if (sel == 1) v = alb;
  else if (sel == 2) v = D.xyz;
  else if (sel == 3) v = vec3(D.w, LY == 0 ? mk : 0.0, 0.0);
  else if (sel == 4) v = S.yzw;
  else v = vec3(LY == 7 ? mk : 0.0, S.x, 0.0);
  o = vec4(a * v, 1.0 - kp);
#endif
}`,he=`
uniform sampler2D uT0, uT1, uT2, uT3, uT4, uT5, uFA, uFB, uFC, uN;
uniform vec4 uA[24];
float h21(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
vec3 roomAt(vec2 uv, out vec3 spec, out float win) {
  vec3 a = texture(uT0, uv).rgb, b = texture(uT1, uv).rgb, c = texture(uT2, uv).rgb, d = texture(uT3, uv).rgb, e = texture(uT4, uv).rgb, m = texture(uT5, uv).rgb;
  vec3 L = c.x * uA[10].rgb + c.y * uA[11].rgb + c.z * uA[12].rgb + d.x * uA[13].rgb;
  spec = e.x * uA[11].rgb + e.y * uA[12].rgb + e.z * uA[13].rgb + m.y * uA[10].rgb;
  vec3 col = a + b * L;
  col *= 1.0 + m.x * uA[12].w * 0.6;
  win = d.y;
  return col;
}
vec3 env(vec3 R, float rough) {
  vec3 c = uA[14].rgb * 0.3 * (0.4 + 0.6 * clamp(R.y + 0.3, 0.0, 1.0));
  vec3 wd = normalize(vec3(uA[15].x, 0.3, -0.8));
  c += uA[15].yzw * pow(max(dot(R, wd), 0.0), mix(50.0, 6.0, rough)) * mix(1.0, 0.3, rough);
  float sx = R.x - uA[16].w;
  c += uA[16].rgb * exp(-sx * sx / mix(0.002, 0.04, rough)) * smoothstep(-0.3, 0.4, R.y) * smoothstep(0.1, 0.5, R.z) * mix(1.0, 0.3, rough);
  c += (uA[11].rgb + uA[12].rgb) * 0.025 * smoothstep(0.45, 0.95, abs(R.x)) * smoothstep(0.6, 0.0, R.z);
  float tb = smoothstep(0.05, -0.2, R.y);
  return mix(c, uA[19].rgb * (uA[11].rgb * 0.12 + uA[10].rgb * 0.08) + uA[14].rgb * 0.3, tb);
}
vec2 fuv(vec2 g) { return (g - uA[4].xy) / uA[4].zw; }
float liquidGlow(vec2 g, float Lt) {
  vec2 d = g - vec2(0.0, uA[3].y);
  float fall = 1.0 / (1.0 + dot(d, d) * 10.0);
  // brightest just over the bulb and falling off upward; the wax's shadows only soften it, they cast no shafts
  float low = exp(-g.y / 0.07) * (1.0 - 0.5 * smoothstep(0.0, 0.01, g.x * g.x));
  return uA[7].w * (fall * mix(Lt, 1.0, 0.55) * (0.55 + 0.9 * low) + 0.035) + uA[20].w * (0.6 + 0.4 * Lt);
}
vec3 metal(vec3 P, vec3 N, vec3 V) {
  vec3 R = reflect(V, N);
  float ci = clamp(-dot(V, N), 0.0, 1.0);
  vec3 F0 = uA[9].rgb, F = F0 + (1.0 - F0) * pow(1.0 - ci, 5.0);
  float br = textureLod(uN, vec2(atan(P.x / max(P.z, 1e-4)) * 0.2, P.y * 16.0), 0.0).b;
  // spun metal: fine turning rings, faded out where a pixel is wider than they are
  br += 0.25 * sin(P.y * 1900.0 + br * 5.0) * clamp((uA[0].x - 350.0) / 650.0, 0.0, 1.0);
  vec3 c = env(R, uA[9].w) * F * (0.8 + 0.4 * br);
  bool base = P.y < 0.5 * (YB + YG);   // (it is also blended a pixel past the seam, so not P.y < YB)
  float nr = base ? exp(-max(YB - P.y, 0.0) / 0.05) : exp(-max(P.y - YG, 0.0) / 0.03);
  float face = clamp((base ? N.y : -N.y) * 1.6 + 0.2, 0.0, 1.0);
  c += (base ? uA[11].rgb : uA[13].rgb) * nr * face * (F0 * 0.22 + 0.02) * (0.8 + 0.4 * br);
  if (base) c += mix(uA[10].rgb, uA[6].rgb, 0.45) * 0.2 * exp(-max(YB - P.y, 0.0) / 0.004) * (0.5 + 0.5 * N.z);
  else c += uA[13].rgb * 0.3 * exp(-max(P.y - YG, 0.0) / 0.003);
  // the lamp-lit table seen in the foot of the base
  if (base) c += uA[19].rgb * uA[11].rgb * (F0 * 0.3 + 0.03) * exp(-P.y / 0.025) * smoothstep(-0.2, 0.6, N.z);
  return c;
}
vec3 glassShade(vec3 P, vec3 N, vec3 V, float r, vec2 uv) {
  float ci = clamp(-dot(V, N), 0.0, 1.0), F = 0.04 + 0.96 * pow(1.0 - ci, 5.0);
  vec3 refl = env(reflect(V, N), 0.0);
  float gy = P.y - YB, ri = r - WALL, bulb = uA[7].w;
  vec3 Lq = uA[6].rgb, inner;
  if (abs(P.x) > ri) {
    inner = Lq * liquidGlow(vec2(P.x * 0.9, gy), texture(uFB, fuv(vec2(P.x * 0.9, gy))).r) * 0.45 * uA[6].w;
  } else {
    vec3 D = refract(V, N, 0.714);
    float t0 = -P.z / D.z;
    vec3 Q = P + D * t0;
    vec2 g = vec2(Q.x, Q.y - YB);
    vec4 A = texture(uFA, fuv(g)), B = texture(uFB, fuv(g)), C = texture(uFC, fuv(g));
    float tau = uA[5].x, tl = 2.0 * t0;
    vec3 back;
    if (gy > uA[3].w) {
      // the little air space under the cap
      inner = Lq * bulb * 0.05 + vec3(0.002);
      inner += Lq * bulb * 0.25 * smoothstep(0.004, 0.0, abs(gy - uA[3].w));
      return mix(inner, refl, F);
    }
    float wax = 0.0, h = 0.0;
    vec3 nW = vec3(0.0, 0.0, 1.0);
    // antialiased edge: the field's own gradient says how far one pixel reaches across the threshold
    float gw = length(A.gb) * uA[1].z / uA[0].x * 2.6 + 0.01;
    wax = smoothstep(tau - gw, tau + gw, A.r);
    if (wax > 0.0) {
      float fe = max(A.r - tau + gw, 0.0);
      h = uA[5].y * sqrt(fe) + uA[5].z * max(C.r - uA[5].w, 0.0);
      // the liquid behind the wax drops out of the path only as the wax covers the pixel (no dark seam at the edge)
      tl = mix(tl, max(t0 - h / max(-D.z, 0.3), 0.004), wax);
      vec2 gh = uA[5].y * A.gb / (2.0 * sqrt(fe + 0.02)) + uA[5].z * smoothstep(uA[5].w, uA[5].w + 0.6, C.r) * C.gb;
      nW = normalize(vec3(-gh, 1.0));
    }
    float Lt = B.r, gl = liquidGlow(g, Lt);
    vec3 ab = exp(-tl * uA[18].rgb);
    vec3 ins = Lq * gl * (1.0 - exp(-uA[18].w * tl)) * uA[6].w * (1.0 - 0.6 * wax);
    if (wax > 0.0) {
      // the wax is a translucent, strongly scattering body lit from the coil below: its thick middle glows lighter
      // and brighter, its rim and thin parts are deeper and more saturated, its underside (facing the bulb) is hottest
      vec3 Wc = mix(uA[7].rgb, uA[8].rgb, B.g * uA[8].w);
      vec3 lv = vec3(0.0, uA[3].y, 0.0) - vec3(g, h); float ld = length(lv); lv /= ld;
      float fall = 1.0 / (1.0 + ld * ld * 7.0);
      float Ls = mix(Lt, 1.0, 0.45);
      float nz = clamp(nW.z, 0.0, 1.0);
      float core = smoothstep(0.15, 1.0, h / max(uA[5].y, 1e-3)) * (0.35 + 0.65 * nz * nz);
      float under = smoothstep(-0.1, 0.9, dot(nW, lv)) * (1.0 - 0.5 * core);
      vec3 Wl = mix(pow(Wc, vec3(0.85)), vec3(1.0, 0.85, 0.6), 0.12 * under), Wd = Wc * Wc;
      float E = bulb * fall * Ls;
      vec3 wc = mix(Wd, Wl, clamp(0.15 + core * 0.55 + under * 0.5, 0.0, 1.0)) * E * (0.6 + 1.0 * core + 1.4 * under);
      wc += Wc * Lq * gl * 0.12 + Wc * uA[20].w * 0.8;
      wc *= 0.85 + 0.3 * C.a;
      vec3 Rw = reflect(D, nW);
      wc += env(Rw, 0.4) * 0.35 * pow(1.0 - nz, 3.0);
      // the thin rim lets the liquid's glow through, so the edge melts into it instead of outlining the blob
      wc = mix(Lq * gl * 0.3 * uA[6].w + Wc * E * 0.4, wc, smoothstep(0.0, 0.3, h / uA[5].y));
      back = wc;
    } else {
      back = Lq * gl * 0.25 * uA[6].w;
      {
        // the room behind, squeezed and reversed through the liquid (clear liquid shows it plainly, coloured faintly)
        vec3 sp; float wn;
        vec2 ru = vec2(uA[1].w - (uv.x - uA[1].w) * 1.7, uv.y + 0.01);
        back += roomAt(ru, sp, wn) * (uA[3].z > 0.5 ? vec3(0.8) : Lq * 0.3);
      }
      // the coil lying on the bottom
      if (gy < 0.03) {
        float k = 0.0;
        int nco = int(uA[21].x + 0.5);
        for (int i = 1; i <= nco; i++) { float rr = float(i) * 0.016; float yy = 0.009 + sqrt(max(1.0 - g.x * g.x / (rr * rr), 0.0)) * rr * 0.28; k = max(k, smoothstep(0.0022, 0.0008, abs(g.y - yy)) * step(abs(g.x), rr)); }
        back = mix(back, back * 0.15 + vec3(0.02) * bulb, k);
      }
    }
    inner = mix(back * ab + ins, back * ab + ins, wax);
    if (wax < 1.0 && wax > 0.0) { vec3 nb = Lq * gl * 0.25 * uA[6].w; inner = mix(nb * ab + ins, inner, wax); }
    // glitter
    if (uA[14].w > 0.5) {
      int ngl = int(uA[20].z + 0.5);
      for (int L = 0; L < ngl; L++) {
        vec2 cg = (g + vec2(0.37 * float(L), uA[0].y * (0.006 + 0.004 * float(L)))) * (190.0 + 70.0 * float(L));
        vec2 cc = floor(cg), cf = fract(cg) - 0.5;
        float hh = h21(cc + float(L) * 17.0);
        vec2 oo = (vec2(h21(cc + 3.3), h21(cc + 9.1)) - 0.5) * 0.6;
        float tw = pow(0.5 + 0.5 * sin(uA[0].y * (2.0 + 4.0 * hh) + hh * 60.0), 14.0);
        inner += vec3(1.0, 0.95, 0.9) * smoothstep(0.14, 0.0, length(cf - oo)) * tw * gl * 2.5 * step(0.55, hh) * (1.0 - wax * 0.8);
      }
    }
  }
  float ex = abs(P.x) / r;
  inner *= 0.55 + 0.45 * smoothstep(0.99, 0.82, ex);
  inner += Lq * liquidGlow(vec2(0.0, gy), 1.0) * uA[6].w * 0.35 * smoothstep(0.93, 0.995, ex);
  // the window's long soft highlight down one side of the glass and a narrower one opposite
  float sg = uA[16].w > 0.0 ? 1.0 : -1.0;
  float hl = exp(-pow((N.x + 0.42 * sg) / 0.11, 2.0)) + 0.5 * exp(-pow((N.x - 0.7 * sg) / 0.045, 2.0));
  return mix(inner, refl, F) + refl * (0.04 + 0.35 * hl) + uA[15].yzw * (0.03 * pow(1.0 - abs(N.z), 3.0) + 0.12 * hl);
}
void main() {
  vec2 uv = gl_FragCoord.xy / uA[0].x;
  float hf = uA[1].z, px = 2.0 * hf / uA[0].x;
  float Xw = uA[1].x + (uv.x * 2.0 - 1.0) * hf, Ys = uA[1].y + (uv.y * 2.0 - 1.0) * hf;
  vec3 spec; float win;
  vec3 col = roomAt(uv, spec, win);
  // rain running down the pane
  if (uA[13].w > 0.5 && win > 0.01) {
    vec2 ru = (uv - uA[17].xz) / (uA[17].yw - uA[17].xz);
    float cx = floor(ru.x * 18.0), hh = h21(vec2(cx, 7.0));
    float sp = 0.05 + 0.08 * hh;
    float yy = 1.0 - fract(uA[0].y * sp * (0.6 + 0.4 * sin(uA[0].y * 0.7 + hh * 9.0)) + hh * 5.0);
    vec2 dc = vec2((fract(ru.x * 18.0) - 0.5 - (hh - 0.5) * 0.4) / 18.0 * (uA[17].y - uA[17].x), (ru.y - yy) * (uA[17].w - uA[17].z));
    float dr = 0.006 + 0.004 * hh;
    float m = smoothstep(dr, dr * 0.6, length(dc * vec2(1.0, 0.75)));
    float trail = smoothstep(0.0025, 0.001, abs(dc.x)) * step(0.0, dc.y) * exp(-dc.y / 0.06) * 0.5;
    vec3 s2; float w2;
    vec3 lens = roomAt(uv - dc * 3.0, s2, w2);
    col = mix(col, lens * 1.1 + 0.004, max(m, trail) * win);
  }
  // the lamp: undo its tilt about the pivot, then solve for the front of the surface of revolution
  vec2 q = vec2(Xw - uA[3].x, Ys);
  q = vec2(uA[2].z * q.x - uA[2].w * q.y, uA[2].w * q.x + uA[2].z * q.y);
  float X = q.x + uA[3].x, Y = q.y, cth = uA[2].x, sth = uA[2].y;
  float y = Y / cth, r = 0.0, z = 0.0;
  int nfp = int(uA[20].y + 0.5);
  for (int i = 0; i < nfp; i++) { r = profR(clamp(y, 0.0, YT)); z = sqrt(max(r * r - X * X, 0.0)); y = mix(y, (Y + z * sth) / cth, 0.8); }
  r = profR(clamp(y, 0.0, YT));
  float cov = clamp((r - abs(X)) / px + 0.5, 0.0, 1.0) * step(0.0, y) * step(y, YT);
  if (cov > 0.0) {
    float dr = (profR(clamp(y + 0.002, 0.0, YT)) - profR(clamp(y - 0.002, 0.0, YT))) / 0.004;
    z = sqrt(max(r * r - X * X, 1e-6));
    vec3 P = vec3(X, y, z), N = normalize(vec3(X, -r * dr, z)), V = vec3(0.0, -sth, -cth);
    // metal everywhere on the lamp, the glass blended in over it with a pixel-wide edge where it meets the base
    float wg = clamp((y - YB) * cth / px + 0.5, 0.0, 1.0) * step(y, YG);
    vec3 lc = vec3(0.0);
    if (wg < 1.0) lc = metal(P, N, V) * (1.0 - wg);
    if (wg > 0.0) lc += glassShade(P, N, V, r, uv) * wg;
    col = mix(col, lc, cov);
  }
  col += spec;
  // film: exposure, a soft shoulder, a gentle falloff, dither
  col *= uA[0].z;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  vec2 vq = uv - 0.5;
  col *= 1.0 - 0.3 * dot(vq, vq);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
  float gr = h21(gl_FragCoord.xy + fract(uA[0].y * 7.13) * 317.0);
  col += (gr - 0.5) * uA[0].w;
  o = vec4(col, 1.0);
}`,pt=`#version 300 es
precision highp float;
out vec4 o;
float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
`;function _t(t,o){const s=(b,P)=>{const L=t.createShader(b);return t.shaderSource(L,P),t.compileShader(L),L},i=t.createProgram(),p=s(t.VERTEX_SHADER,ie),R=s(t.FRAGMENT_SHADER,o);return t.attachShader(i,p),t.attachShader(i,R),t.linkProgram(i),{p:i,u:{},sh:[p,R],ok:!1}}const pe={uT0:0,uT1:1,uT2:2,uT3:3,uT4:4,uT5:5,uFA:6,uFB:7,uN:8,uFC:9};function J0(t,o,s){const i=o[s];if(i.ok)return i;if(!t.getProgramParameter(i.p,t.LINK_STATUS))throw new Error("085 link "+s+": "+t.getProgramInfoLog(i.p)+" "+t.getShaderInfoLog(i.sh[1]));const p=t.getProgramParameter(i.p,t.ACTIVE_UNIFORMS);for(let b=0;b<p;b++){const P=t.getActiveUniform(i.p,b);i.u[P.name.replace(/\[0\]$/,"")]=t.getUniformLocation(i.p,P.name)}t.useProgram(i.p);const R=s[0]==="c"?pe:{uN:0};for(const b in R)i.u[b]&&t.uniform1i(i.u[b],R[b]);return i.ok=!0,i}const Bt="--0-10-1",ve=[`#define G2
#define G5
`,`#define G4
#define G7
`];function me(t,o){let s=Ft.get(t);if(s){let c=!1;for(const h of o)s[h]||(s[h]=_t(t,s.src(h)),c=!0);return c&&t.flush(),s}t.getExtension("EXT_color_buffer_float"),t.getExtension("EXT_color_buffer_half_float"),t.getExtension("OES_texture_float_linear"),t.getExtension("KHR_parallel_shader_compile"),s={vao:t.createVertexArray()};const i=c=>c==="fa"?fe:c==="fb"?ue:c[0]==="G"?pt+`#define LAYER 9
#define ROOM 0
`+ve[+c[1]]+St:c[0]==="L"?pt+"#define LAYER "+c[1]+`
#define ROOM `+(c[2]||"0")+`
`+St:pt+le[+c[1]]+`
`+he;for(const c of["fa","fb",...o])s[c]=_t(t,i(c));t.flush(),s.src=i;const p=128,R=(c,h,F,S)=>{c=(c%F+F)%F,h=(h%F+F)%F;let U=c*374761393+h*668265263+S*2246822519|0;return U=Math.imul(U^U>>>13,1274126177),U^=U>>>16,(U>>>0)/4294967296},b=(c,h,F,S)=>{const U=Math.floor(c),n0=Math.floor(h),A=c-U,w=h-n0,N=A*A*(3-2*A),_=w*w*(3-2*w),B=R(U,n0,F,S),h0=R(U+1,n0,F,S),T=R(U,n0+1,F,S),$=R(U+1,n0+1,F,S);return B+(h0-B)*N+(T-B)*_+(B-h0-T+$)*N*_},P=(c,h,F,S,U)=>{let n0=0,A=.5,w=F,N=0;for(let _=0;_<S;_++)n0+=A*b(c*w/p,h*w/p,w,U+_),N+=A,A*=.5,w*=2;return n0/N},L=new Uint8Array(p*p*4);for(let c=0;c<p;c++)for(let h=0;h<p;h++){const F=(c*p+h)*4;L[F]=P(h,c,4,4,11)*255,L[F+1]=P(h,c,8,3,23)*255,L[F+2]=(b(h*32/p,c*32/p,32,41)*.7+b(h*64/p,c*64/p,64,43)*.3)*255,L[F+3]=P(h,c,16,2,77)*255}for(let c=0;c<4;c++){let h=255,F=0;for(let S=c;S<L.length;S+=4)h=Math.min(h,L[S]),F=Math.max(F,L[S]);for(let S=c;S<L.length;S+=4)L[S]=(L[S]-h)*255/Math.max(1,F-h)}return s.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,s.noise),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,p,p,0,t.RGBA,t.UNSIGNED_BYTE,L),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),Ft.set(t,s),s}function tt(t,o,s,i){const p=t.createTexture();return t.bindTexture(t.TEXTURE_2D,p),i=i||[t.RGBA16F,t.RGBA,t.HALF_FLOAT],t.texImage2D(t.TEXTURE_2D,0,i[0],o,s,0,i[1],i[2],null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),p}function et(t,o){const s=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),s}function de(t){t.sort((R,b)=>R[0]-b[0]||R[1]-b[1]);const o=(R,b,P)=>(b[0]-R[0])*(P[1]-R[1])-(b[1]-R[1])*(P[0]-R[0]),s=[],i=[];for(const R of t){for(;s.length>=2&&o(s[s.length-2],s[s.length-1],R)<=0;)s.pop();s.push(R)}for(let R=t.length-1;R>=0;R--){const b=t[R];for(;i.length>=2&&o(i[i.length-2],i[i.length-1],b)<=0;)i.pop();i.push(b)}const p=s.slice(0,-1).concat(i.slice(0,-1));for(;p.length<6;)p.push(p[p.length-1]);return p.slice(0,6)}Et.add({num:85,name:"Blob Lamp",fam:"Worlds",recipe:"A lava lamp on a bedside table at night where the wax heats at the bottom, rises in blobs that stretch and pinch off, cools at the top and sinks again. The colours and the size of the blobs change every mint. Tap to flip the switch and watch it warm up from a cold lump, drag sideways to tip it so the blobs slosh, or hold to turn up the heat.",interactive:"Tap to flip the switch: off, the glow dies and the wax slowly sinks into a lump; on, it takes a while to soften before the first blob swells and lifts. Drag sideways to tip the lamp a little and make the blobs drift and slosh. Hold to turn the heat up: more, livelier blobs.",music:!0,gl:!0,fps:30,seed:0,make(t){const o=t.gl,s=t.size,i=t.hash.slice(2),p=e=>{let r=parseInt(i.slice(e,e+8),16)>>>0,f=parseInt(i.slice(e+8,e+16),16)>>>0,l=parseInt(i.slice(e+16,e+24),16)>>>0,d=parseInt(i.slice(e+24,e+32),16)>>>0;const Y=()=>{r>>>=0,f>>>=0,l>>>=0,d>>>=0;let Z=r+f|0;return r=f^f>>>9,f=l+(l<<3)|0,l=l<<21|l>>>11,d=d+1|0,Z=Z+d|0,l=l+Z|0,(Z>>>0)/4294967296};for(let Z=0;Z<15;Z++)Y();return Y},R=p(0),b=p(16),P=p(32),L=(e,r)=>{r=r||R;let f=0;for(const d of e)f+=d[1];let l=r()*f;for(let d=0;d<e.length;d++)if(l-=e[d][1],l<=0)return d;return e.length-1},c=(e,r,f)=>e+(r-e)*(f||b)(),h=[["Orange in yellow",34],["Purple in blue",24],["Green in clear",18],["Red in purple",18],["Glitter",6]],F=[["Rocket",46],["Tall column",26],["Globe",20],["Giant floor lamp",8]],S=[["Bedroom",38],["Dorm desk",28],["Living room",26],["Rainy window",8]],U=[["A few big blobs",52],["Many small blobs",48]],n0=[["Brushed silver",44],["Black satin",28],["Copper",20],["Gold",8]],A=[["City lights",45],["Quiet street",35],["Full moon",20]],w=[["None",76],["Two-colour wax",9],["Overheated",7],["Cat watching",8]];let N=L(h),_=L(F),B=L(S),h0=L(U),T=L(n0),$=L(A),p0=L(w);t.home&&(N=0,_=0,B=0,h0=0,T=0,$=0,p0=0),t.trait("Colours",h[N][0]),t.trait("Lamp",F[_][0]),t.trait("Room",S[B][0]);let J=2166136261;for(let e=0;e<i.length;e++)J=Math.imul(J^i.charCodeAt(e),16777619)>>>0;J=(J^140120526)>>>0;const Q=()=>{J=J+1831565813|0;let e=Math.imul(J^J>>>15,1|J);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},z0=[["Close on the wax",34],["Wide, off to one side",26],["Whole lamp",40]];let l0=L(z0,Q),t0=0;{const e=Q();t0=e<.09?1:e<.25?2:0}t.home&&(l0=2,t0=0),t.trait("Wax",t0===1?"One huge blob":t0===2?"A swarm of droplets":U[h0][0]),t.trait("Base",n0[T][0]),t.trait("Outside",A[$][0]),t.trait("Rare",w[p0===3?0:p0][0]),t.trait("Framing",z0[l0][0]);const D=_===3?0:_,V=_===3,v0=p0===1,T0=p0===2,W=!1,G=Pt[D],O=[["L0"+B,0]];B===2&&O.push(["L1"+B,0]),O.push(["L2",0]),O.push(["L4",0],["L5",0]),B===1&&O.push(["L5",1]),B!==3&&!V&&O.push(["L7",0]),O.push(["L8",0]);const ot=e=>e==="L8"||Bt[+e[1]]==="-"?e:"G"+Bt[+e[1]],x0=me(o,["c"+D,...new Set(O.map(e=>ot(e[0])))]),b0=b()<.5?1:-1,I=se({shape:D,few:h0===0,two:v0,hot:T0,rnd:P,form:t0}),M0=!t.home&&P()<.22&&!t0;M0?I.coldStart(300):I.prewarm(),t.trait("Stage",M0?"Warming up, the lump softening":"Warm and flowing");const s0=I.Hg,i0=I.RM,q0=l0===0?.46:l0===1?1.42:1,D0=Q()<.5?1:-1,B0=.0026*Math.min(1,q0*1.3),P0=Math.round(2*(i0+.01)/B0),H0=Math.round((s0+.01)/B0),f0=Math.max(8,Math.round(P0/2)),n=Math.max(8,Math.round(H0/2)),v=[-(i0+.01),-.005,2*(i0+.01),s0+.01],m=[{W:[1,.22,.02],L:[1,.6,.08],ab:[.5,1.8,12],cl:0,gg:1,W2:[.95,.06,.1]},{W:[.45,.07,.6],L:[.12,.36,1],ab:[10,3.5,.8],cl:0,gg:1,W2:[1,.28,.58]},{W:[.3,.85,.08],L:[.9,.86,.74],ab:[.5,.4,.9],cl:1,gg:.35,W2:[.08,.35,1]},{W:[.95,.05,.04],L:[.55,.14,.85],ab:[2.5,11,1.5],cl:0,gg:1,W2:[1,.5,.03]},{W:[1,.22,.5],L:[.5,.7,1],ab:[3,1.5,.7],cl:0,gg:.7,W2:[.92,.9,.95]}][N],x=[[.6,.6,.62,.32],[.045,.045,.05,.45],[.86,.5,.32,.28],[.95,.72,.32,.2]][T],M=V?.42:1,u=[{zw:-.62,zb:-.62,zf:.4,tx:[-2,2],win:[-1.1,-.26,.3,1.3],wall:[.4,.36,.32],table:[.3,.16,.08],kind:0,gloss:26,book:[-.36,.14,.32,.3,.21,.045],book2:null,glass:[-.2,-.3],cord:!0,frame:0},{zw:-.5,zb:-.5,zf:.38,tx:[-2,2],win:[-1.05,-.28,.28,1.2],wall:[.5,.48,.42],table:[.55,.55,.52],kind:1,gloss:14,book:[-.37,.12,.12,.31,.23,.05],book2:[-.35,.11,-.18,.26,.19,.035],glass:[.23,-.26],cord:!0,frame:1},{zw:-1.35,zb:-.4,zf:.36,tx:[-.62,.55],win:[-1.5,-.4,-.1,1.6],wall:[.3,.25,.21],table:[.13,.065,.035],kind:2,gloss:45,book:[-.34,.12,-.25,.29,.21,.045],book2:null,glass:[-.21,-.22],cord:!0,frame:1},{zw:-.3,zb:-.3,zf:.34,tx:[-2,2],win:[-2.5,2.5,0,2.5],wall:[.45,.44,.42],table:[.5,.49,.47],kind:3,gloss:10,book:[.27,.15,-.3,.28,.2,.04],book2:null,glass:[-.2,-.15],cord:!1,frame:0}][B],q=new Float32Array(96*4),g=(e,r,f,l,d)=>{q[e*4]=r,q[e*4+1]=f,q[e*4+2]=l,q[e*4+3]=d},c0=G.hf*q0,G0=l0===0?(G.yb+(G.yg-G.yb)*(.36+.1*Q()))*d0:l0===1?G.cy+c0*.24:G.cy+.03,at=l0===0?c0*D0*(.08+.16*Q()):l0===1?c0*D0*.38:-G.cx,a=at*b0;g(0,s,0,d0,Z0),g(1,at,G0,c0,b0),g(2,G.yb,G.yg,G.yt,10),g(3,B,M,u.zw,V?3:u.zf);const H=B===0?[[.4,.36,.32],[.34,.36,.38],[.42,.33,.3]][Math.floor(b()*3)]:u.wall;g(4,H[0],H[1],H[2],V?4:u.kind);const y=V?[.2,.15,.12]:u.table;g(5,y[0],y[1],y[2],V?2:u.gloss),g(6,u.win[0],u.win[1],u.win[2],u.win[3]);const k=[{lo:[.014,.011,.013],hi:[.004,.005,.011],fill:[.0035,.0038,.005],wl:[.03,.028,.03]},{lo:[.006,.006,.01],hi:[.002,.003,.008],fill:[.004,.0032,.0026],wl:[.045,.028,.012]},{lo:[.006,.01,.022],hi:[.003,.005,.014],fill:[.003,.004,.007],wl:[.02,.028,.05]}][$],e0=(e,r,f)=>[(e*b0-a)/(2*c0)+.5,(r*d0-f*Z0-G0)/(2*c0)+.5],o0=[e0(u.win[0],u.win[2],u.zw),e0(u.win[1],u.win[3],u.zw)],u0=Math.min(o0[0][0],o0[1][0]),L0=Math.max(o0[0][0],o0[1][0]),C0=Math.min(o0[0][1],o0[1][1]),N0=Math.max(o0[0][1],o0[1][1]),a0=[],K=[Math.max(u0,-.05),Math.min(L0,1.05),Math.max(C0,-.05),Math.min(N0,1.05)],Y0=()=>c(K[0]-.02,K[1]+.02),r0=(e,r)=>c(K[2]+(K[3]-K[2])*e,K[2]+(K[3]-K[2])*r),k0=(B===2?.75:B===3?1.1:1)*Math.pow(1/q0,.6);if($===0){const e=B===3?26:20;for(let r=0;r<e;r++){const f=b(),l=f<.5?[1,.68,.32]:f<.75?[1,.5,.12]:f<.9?[.7,.8,1]:b()<.5?[1,.12,.08]:[.2,1,.45],d=c(.05,.3)*(f>.9?1.4:1)*(r%3===2?0:.55);a0.push([Y0(),r0(0,.75),(.034+.004*b())*k0,l.map(Y=>Y*d),1])}}else if($===1){const e=4+Math.floor(b()*3),r=r0(.15,.45),f=c(-.25,.25);for(let l=0;l<e;l++){const d=K[0]+(K[1]-K[0])*(l+.3+b()*.4)/e;a0.push([d,r+f*(d-.5)+c(-.03,.03),(.056+.006*b())*k0,[1,.52,.14].map(Y=>Y*c(.25,.5)),1])}for(let l=0;l<6;l++)a0.push([Y0(),r0(0,.5),(.04+.004*b())*k0,[1,.75,.45].map(d=>d*c(.03,.09)),1])}else{a0.push([c(K[0]+.05,K[1]-.03),r0(.62,.85),.075*k0,[.85,.92,1].map(e=>e*.85),.4]);for(let e=0;e<6;e++)a0.push([Y0(),r0(0,.4),(.036+.004*b())*k0,[.6,.75,1].map(r=>r*c(.03,.1)),1])}g(7,k.lo[0],k.lo[1],k.lo[2],Math.min(a0.length,28)),g(8,k.fill[0],k.fill[1],k.fill[2],B===3?1.6:B===2?.5:1),g(36,k.hi[0],k.hi[1],k.hi[2],0),g(37,k.wl[0],k.wl[1],k.wl[2],u.frame),a0.slice(0,28).forEach((e,r)=>{g(38+2*r,e[0],e[1],e[2],0),g(39+2*r,e[3][0],e[3][1],e[3][2],e[4])});const vt=[u.book,u.book2],Gt=u.glass;vt.forEach((e,r)=>{if(!e){g(11,0,0,0,0);return}const f=r===1?u.book[5]*M:0,l=e[3]*M,d=e[4]*M,Y=e[5]*M,Z=r===0?Math.floor(b()*4):(Math.floor(b()*3)+1)%4;g(9+2*r,e[0],e[1],e[2],l),g(10+2*r,d,Y,f,Z);const F0=Math.cos(e[2]),oe=Math.sin(e[2]),ae=[];for(const R0 of[-1,1])for(const Te of[0,1])for(const Me of[-1,1]){const ne=R0*l/2,ce=Me*d/2,Le=e[0]+F0*ne+oe*ce,ke=e[1]-oe*ne+F0*ce,Ee=f+Te*Y;ae.push([Le,Ee*d0-ke*Z0])}const ht=de(ae);for(let R0=0;R0<3;R0++)g(30+3*r+R0,ht[2*R0][0],ht[2*R0][1],ht[2*R0+1][0],ht[2*R0+1][1])}),g(13,Gt[0],Gt[1],.046*M,.19*M),g(14,.12*M,0,u.cord&&!V?1:0,0);const E0=[[.1,-.06],[.32,-.02],[.2,.3],[.55,.47]];g(16,E0[0][0],E0[0][1],E0[1][0],E0[1][1]),g(17,E0[2][0],E0[2][1],E0[3][0],E0[3][1]),g(18,A0(D,G.yb*.92),A0(D,G.yb*.45),.6,.055),g(19,0,u.tx[0],u.tx[1],u.zb);for(let e=0;e<24;e++)q[80+e]=A0(D,G.yt*e/23);g(94,8,2,24,3),g(95,6,4,4,0);const Nt=e=>G.yb+(G.yg-G.yb)*e/3;g(26,G.yb*d0-.01,G.yb*d0+.01,A0(D,G.yb)*.9,.75);for(let e=0;e<3;e++){const r=Nt(e),f=Nt(e+1),l=A0(D,(r+f)/2);g(27+e,r*d0,f*d0,l*.8,.7)}const xe=!!o.getExtension("EXT_color_buffer_float"),Yt=[o.RGBA16F,o.RGBA,o.HALF_FLOAT],mt=xe?[o.R11F_G11F_B10F,o.RGB,o.HALF_FLOAT]:Yt,Wt=[mt,[o.SRGB8_ALPHA8,o.RGBA,o.UNSIGNED_BYTE],mt,Yt,mt,[o.RG16F,o.RG,o.HALF_FLOAT]].map(e=>tt(o,s,s,e)),Ot=Wt.map(e=>et(o,e)),Ut=tt(o,P0,H0),be=et(o,Ut),Dt=tt(o,f0,n),ye=et(o,Dt),Ht=tt(o,f0,n),we=et(o,Ht),Ct=J0(o,x0,"c"+D),nt=J0(o,x0,"fa"),dt=J0(o,x0,"fb"),W0=(e,r)=>{o.activeTexture(o.TEXTURE0+e),o.bindTexture(o.TEXTURE_2D,r)},xt=()=>{o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.colorMask(!0,!0,!0,!0),o.bindVertexArray(x0.vao)};xt();for(const e of Ot)o.bindFramebuffer(o.FRAMEBUFFER,e),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE),W0(0,x0.noise),o.viewport(0,0,s,s);for(const[e,r]of O){const f=J0(o,x0,ot(e));o.useProgram(f.p),q[383]=r,q[60]=+e[1];for(let l=0;l<6;l++)e==="L8"&&l<4||(q[1]=l,o.bindFramebuffer(o.FRAMEBUFFER,Ot[l]),o.uniform4fv(f.u.uR,q),o.drawArrays(o.TRIANGLES,0,3))}o.disable(o.BLEND);const m0=I.ctl;let y0=1,S0=!0,bt=99,X0=0,yt=c(60,95,P),ct=0;M0&&(m0.on=!0);let j=0,w0=0,Xt=0,It=0,rt=0,lt=c(2,5,P),Vt=1,Kt=0,qe=0,jt=0;const E={down:!1,t:0,sx:0,sy:0,px:0,py:0,moved:0,kind:""};let st=null;const g0=t.sound;I.onMerge=(e,r)=>{if(wt-Kt<.7||!g0.on)return;Kt=wt;const f=31+Math.round(X(22-e*.35,0,14))+[0,0,3,5,7][Math.floor(P()*5)];g0.note(f,{dur:2.6,vel:.16+.1*X(e/40,0,1),wave:"sine",pan:0,cutoff:500}),g0.note(f+12,{dur:1.6,vel:.05,wave:"sine",cutoff:900,at:.02})};let wt=0;function gt(){S0=!S0,m0.on=S0,g0.hit("click",.55),g0.hit("click",.25,{at:.04})}const O0=new Float32Array(8),_0=new Float32Array(24*4),C=(e,r,f,l,d)=>{_0[e*4]=r,_0[e*4+1]=f,_0[e*4+2]=l,_0[e*4+3]=d},Zt=[0,0,0];for(let e=0;e<3;e++){const r=s0*e/3,f=s0*(e+1)/3;let l=0;for(let d=0;d<20;d++)l+=2*I.rin(r+(f-r)*(d+.5)/20)*(f-r)/20;Zt[e]=l}const I0=[0,0,0],it=m.L,ft=m.W,Qt=(V?1.25:1)*(D===2?1.15:1),$t=2.2;function ge(e){I0[0]=I0[1]=I0[2]=0;for(let l=0;l<I.N;l++){const d=X(Math.floor(I.y[l]/s0*3),0,2),Y=I.rp*I.sc[l]*1.15;I0[d]+=Math.PI*Y*Y}const r=m.cl?[1,.82,.6]:it;let f=1;for(let l=0;l<3;l++){const d=X(I0[l]/Zt[l],0,1),Y=[1.55,1,.68][l]*f*y0*Qt*.55,Z=[0,1,2].map(F0=>Y*((1-d)*r[F0]*(m.cl?.75:1)+d*ft[F0]*.85));C(11+l,Z[0],Z[1],Z[2],l===0?0:l===1?S0?1:-1:B===3?1:0),f*=Math.exp(-1.1*d)}C(10,y0*1,y0*.74,y0*.45,0),C(0,s,e,V?1.7:1.8,.006),C(1,a,G0,c0,(0-a)/(2*c0)+.5),C(2,d0,Z0,Math.cos(j),Math.sin(j)),C(3,j>=0?A0(D,0):-A0(D,0),-.05,m.cl,s0-.012),C(4,v[0],v[1],v[2],v[3]),C(5,1.05*(1+($t-1)*.5),.024*(h0===0?1:.8),.022,1.2),C(6,it[0],it[1],it[2],m.gg*.85),C(7,ft[0],ft[1],ft[2],y0*Qt),C(8,m.W2[0],m.W2[1],m.W2[2],v0?1:0),C(9,x[0],x[1],x[2],x[3]),C(14,k.fill[0]*3,k.fill[1]*3,k.fill[2]*3,N===4?1:0),C(15,-.6*b0,k.wl[0]*6,k.wl[1]*6,k.wl[2]*6),C(16,.06,.048,.034,.3*b0),C(17,u0,L0,Math.max(C0,e0(0,.06,u.zw)[1]),N0),C(18,m.ab[0],m.ab[1],m.ab[2],6),C(19,y[0],y[1],y[2],1/f0),C(20,1/n,5,2,3),_0[83]=(k.fill[0]+k.fill[1]+k.fill[2])*1.2,_0[84]=3}function Jt(){const e=I.pack();xt(),O0.set([v[0],v[1],v[2],v[3],I.N,$t,0,0]),o.bindFramebuffer(o.FRAMEBUFFER,be),o.viewport(0,0,P0,H0),o.useProgram(nt.p),o.uniform4fv(nt.u.uP,e),o.uniform4fv(nt.u.uF,O0),o.drawArrays(o.TRIANGLES,0,3),O0.set([I.N,4,0,0],4),o.bindFramebuffer(o.FRAMEBUFFER,we),o.viewport(0,0,f0,n),o.uniform4fv(nt.u.uF,O0),o.drawArrays(o.TRIANGLES,0,3),O0.set([I.N,-.05,22,.42],4),o.bindFramebuffer(o.FRAMEBUFFER,ye),o.viewport(0,0,f0,n),o.useProgram(dt.p),o.uniform4fv(dt.u.uP,e),o.uniform4fv(dt.u.uF,O0),o.drawArrays(o.TRIANGLES,0,3)}function te(e){ge(e),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,s,s),xt(),o.useProgram(Ct.p);for(let r=0;r<6;r++)W0(r,Wt[r]);W0(6,Ut),W0(7,Dt),W0(8,x0.noise),W0(9,Ht),o.uniform4fv(Ct.u.uA,_0),o.drawArrays(o.TRIANGLES,0,3)}function Re(e){const r=t.input,f=r.taps?r.taps():[];f.length&&(st=f[f.length-1]);const l=r.x,d=r.y;if(rt=0,r.down&&r.inside){if(bt=0,E.down?E.t+=e:(E.down=!0,E.t=0,E.sx=l,E.sy=d,E.px=l,E.py=d,E.moved=0,E.kind="press",st=null),E.moved+=Math.hypot(l-E.px,d-E.py),E.kind==="press"&&E.moved>.03&&(E.kind="drag"),E.kind==="press"&&E.t>.3&&(E.kind="hold",g0.hit("click",.15)),E.kind==="drag"){const Y=X((l-E.sx)*.45,-.085,.085);w0+=((Y-j)*120-w0*18)*e}E.kind==="hold"&&(rt=1),E.px=l,E.py=d}else E.down?(E.kind==="press"&&gt(),E.down=!1):st&&gt(),st=null,bt+=e}function Ae(e){if(E.down&&E.kind==="drag")j+=w0*e;else{w0+=(-j*70-w0*5)*e;const f=j+w0*e;j!==0&&Math.sign(f)!==Math.sign(j)?(Math.abs(w0)>.08&&g0.hit("kick",X(Math.abs(w0)*.25,.04,.2)),w0*=-.25,j=0):j=f}j=X(j,-.1,.1);const r=e>0?(j-Xt)/e:0;m0.spin=X(m0.spin-(r-It)*.9,-1.5,1.5)*Math.exp(-e/1.4),Xt=j,It=r,m0.tilt=j,m0.boost+=(rt-m0.boost)*(1-Math.exp(-e/(rt?1.2:4))),y0+=((S0?1+.12*m0.boost:0)-y0)*(1-Math.exp(-e/(S0?.12:.35))),bt>40||!t.input.inside?(X0+=e,X0>yt&&(gt(),X0=0,yt=S0?c(70,110,P):c(14,24,P))):X0=Math.min(X0,yt-5),lt-=e,lt<0&&(Vt=0,lt<-.16&&(Vt=1,lt=c(2.5,7,P)))}const V0=11025,ee=new Float32Array(4096);let U0=0,Rt=0,At=12345,K0=0,zt=0,Tt=0,Mt=0,Lt=0,kt=0,ut=0,Pe=0;function ze(e){if(!g0.on)return;Rt+=e*V0;const r=Math.min(4096,Math.floor(Rt));if(Rt-=r,r<=0)return;const f=y0*(.05+.06*m0.boost);for(let l=0;l<r;l++){Mt+=(f-Mt)*.002,U0+=j0*120/V0,U0>j0&&(U0-=j0);const d=Math.sin(U0)+.5*Math.sin(2*U0+.3)+.25*Math.sin(3*U0+1.1);At=At*1103515245+12345&2147483647;const Y=At/1073741823-1;K0+=(Y-K0)*.05,zt+=(Y-zt)*.4,Tt+=(K0-Tt)*.02,Lt+=1/V0,Lt>=1&&(Lt-=1,jt^=1,ut=1,kt=0);let Z=0;ut>.001&&(kt+=j0*(jt?2900:2300)/V0,Z=Math.sin(kt)*ut*(.6+.4*Y),ut*=.9);let F0=d*Mt*.25+(K0-Tt)*.05+Z*.05;B===3&&(F0+=(zt-K0)*.12+(Y>.9985?Y*.25:0)),ee[l]=F0}g0.pcm(ee.subarray(0,r),V0,{vel:.7})}return M0&&(y0=1,m0.on=!0),Jt(),te(0),(e,r)=>{r=Math.min(Math.max(r,0),.15),Re(r),Ae(r),ct+=r;let f=Math.floor(ct/$0);f>8?(f=8,ct=0):ct-=f*$0;for(let l=0;l<f;l++)I.step($0),wt+=$0;Jt(),te(e),ze(r)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
