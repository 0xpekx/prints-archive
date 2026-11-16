// Blob Lamp: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/085.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pt){Pt&&function(){"use strict";const St=new WeakMap,J0=Math.PI*2,K=(t,o,s)=>t<o?o:t>s?s:t,_t=16*Math.PI/180,b0=Math.cos(_t),tt=Math.sin(_t),et=96,ot=1/60,Bt=[{yb:.3,yg:.86,yt:1,wall:.006,hf:.56,cy:.43,cx:.11},{yb:.2,yg:.97,yt:1.05,wall:.005,hf:.585,cy:.46,cx:.12},{yb:.24,yg:.67,yt:.715,wall:.007,hf:.43,cy:.31,cx:.1}],se=(t,o,s)=>{const i=Math.max(s-Math.abs(t-o),0)/s;return Math.min(t,o)-i*i*s*.25};function k0(t,o){if(t===0){if(o<.3)return .152-.2533*o;if(o<.86){const m=(o-.3)/.56;return se(.069+.12*m,.105-.0843*(m-.3),.012)}const i=(o-.86)/.14;return(.05-.028*i)*Math.sqrt(K((1-i)/.18,0,1))}if(t===1){if(o<.2)return .078-.02*o;if(o<.97)return .056+.006*Math.sin(Math.PI*(o-.2)/.77);const i=(o-.97)/.08;return .061*Math.sqrt(K((1-i)/.45,0,1))}if(o<.24)return .105+.045*Math.pow(1-o/.24,1.5);if(o<.67)return Math.sqrt(Math.max(.055225-(o-.45)*(o-.45),0));const s=(o-.67)/.045;return .09*Math.sqrt(Math.max(1-s*s,0))}const ie=[`#define YB 0.30
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
}`];function fe(t){const o=Bt[t.shape],s=o.yg-o.yb,i=s-.014,m=a=>k0(t.shape,a+o.yb)-o.wall;let A=0,d=0;for(let a=0;a<=200;a++)A=Math.max(A,m(s*a/200));for(let a=0;a<200;a++)d+=2*m(s*(a+.5)/200)*s/200;const F=t.form===1,L=t.form===2,c=L?et:t.few?54:88,u=Math.sqrt(d*(t.shape===2?.2:.19)*(L?.62:1)/c/.866)*.5,q=u*3.4,_=u*3,X=_*_,l0=(u*2.7)**2,z=new Float32Array(c),x=new Float32Array(c),G=new Float32Array(c),P=new Float32Array(c),B=new Float32Array(c),i0=new Float32Array(c),T=new Float32Array(c),e0=new Float32Array(c),f0=new Float32Array(c),o0=new Float32Array(c),J=new Float32Array(c),y0=new Uint8Array(c),r0=new Uint8Array(c),a0=new Uint8Array(c),D=new Int16Array(c),Z=new Int16Array(c).fill(-1),u0=new Int16Array(c),w0=new Int16Array(c),W={on:!0,H:1,power:t.hot?1.3:1,boost:0,tilt:0,spin:0},N=new Float32Array(et*4),H=t.rnd,lt=F?.09:L?.022:t.few?.055:.05,h0=F?.22:L?.5:t.few?.3:.35,g0=.56,C=t.hot?.56:.5,E0=t.hot?.52:.4;let p0=0;const Q={N:c,rp:u,RK:q,Hg:s,RM:A,rin:m,x:z,y:x,T,sc:e0,id:a0,ctl:W,onMerge:null};function F0(a,v){let b=0;for(let h=0;b<a;h++){const g=u*(1+h*1.732),y=m(g)-u*1.1,M=Math.max(1,Math.floor(y/u));for(let I=0;I<M&&b<a;I++)z[b]=-y+(I+.5+h%2*.5)*(y*2/M)-u*.5*(h%2)+(H()-.5)*u*.2,x[b]=g,T[b]=v,G[b]=P[b]=0,b++}return b}function R0(a,v,b,h,g){for(let y=0;y<v;y++){const M=y*2.39996,I=u*2*Math.sqrt(y)*.95;z[a]=b+I*Math.cos(M),x[a]=h+I*Math.sin(M)*1.05,T[a]=g+(H()-.5)*.04,G[a]=P[a]=0,a++}return a}const _0=()=>{t.two&&Array.from({length:c},(v,b)=>b).sort((v,b)=>z[v]-z[b]).forEach((v,b)=>{a0[v]=b<c/2?0:1})};Q.coldStart=a=>{F0(c,.12),_0(),W.on=!1,W.H=0;for(let v=0;v<90;v++)q0(1/30);if(a){W.on=!0;for(let v=0;v<a;v++)q0(1/30)}},Q.prewarm=()=>{if(F||L){let h=F0(Math.floor(c*(F?.4:.3)),.75);if(F){const g=i*(.3+H()*.08),y=(m(g)-u*2)*.8,M=c-h;for(let I=0;I<M;I++){const R=I*2.39996,n0=Math.sqrt((I+.5)/M);z[h]=y*n0*Math.cos(R),x[h]=g+y*1.25*n0*Math.sin(R),T[h]=.64+(H()-.5)*.04,G[h]=P[h]=0,h++}}else{const y=c-h;for(let M=0;M<11;M++){const I=M===10?c-h:Math.floor(y/11),R=.05+(M+.5+(H()-.5)*.6)/11*(i-.1);h=R0(h,I,(H()*2-1)*(m(R)-u*3)*.75,R,M%2?.88:.3)}}_0(),W.on=!0,W.H=1;for(let g=0;g<160;g++)q0(1/40);return}let a=F0(Math.floor(c*.34),.75);const v=t.few?3:5,b=c-a;for(let h=0;h<v;h++){const g=h===v-1?c-a:Math.floor(b/v*(.7+.6*H())),y=(h+.6+H()*.3)/(v+.4),M=.06+y*(i-.12),I=(H()*2-1)*(m(M)-u*4)*.6;a=R0(a,g,I,M,h%2?.85:.35)}_0(),W.on=!0,W.H=1;for(let h=0;h<160;h++)q0(1/40)};function B0(a){for(;u0[a]!==a;)u0[a]=u0[u0[a]],a=u0[a];return a}function rt(){for(let a=0;a<c;a++)u0[a]=a;for(let a=0;a<c;a++)for(let v=a+1;v<c;v++){if(t.two&&a0[a]!==a0[v])continue;const b=z[v]-z[a],h=x[v]-x[a];if(b*b+h*h<l0){const g=B0(a),y=B0(v);g!==y&&(u0[g]=y)}}w0.fill(0);for(let a=0;a<c;a++)D[a]=B0(a),w0[D[a]]++;for(let a=0;a<c;a++){if(w0[a]<6)continue;let v=-1,b=-1,h=0,g=0;for(let y=0;y<c;y++)D[y]===a&&Z[y]>=0&&(v<0||Z[y]===v?(v=Z[y],h++):(b<0||Z[y]===b)&&(b=Z[y],g++));if(b>=0&&h>=3&&g>=3&&Q.onMerge){let y=0;for(let M=0;M<c;M++)D[M]===a&&(y+=x[M]);Q.onMerge(w0[a],y/w0[a]/s)}}for(let a=0;a<c;a++)Z[a]=w0[D[a]]>=3?D[a]:-1}function q0(a){p0++,W.H+=((W.on?1+.35*W.boost:0)-W.H)*a/(W.on?12:20);const v=W.H,b=-Math.sin(W.tilt),h=Math.cos(W.tilt),g=Math.exp(-3.2*a),y=W.on?W.power*(1+1.6*W.boost):0,M=s*.5,I=W.spin;let R=0;const n0=A*.35*Math.sin(p0*.0021)*Math.sin(p0*77e-5+1),k=u*2.6;for(let n=0;n<c;n++)if(x[n]<k){const j=1-x[n]/k,w=z[n]-n0;J[n]=j*j*Math.exp(-w*w/(A*A*.25)),R+=J[n]}else J[n]=0;const v0=y*(.25+.75*Math.min(v,1))*5*Math.min(1,c*.35/Math.max(R,.001));for(let n=0;n<c;n++){const j=K(x[n]/i,0,1),w=v*(E0+(C-E0)*Math.exp(-x[n]/.035)-.12*j)+(1-Math.min(v,1))*.08,m0=K(1-y0[n]/6.5,.12,1);T[n]+=(w-T[n])*a*.18*m0,T[n]+=v0*J[n]*a*(T[n]>.3&&T[n]<.5?.3:1),T[n]=K(T[n],0,1.15),e0[n]=.9+.2*K(T[n],0,1.2);const $=1.1*(T[n]-g0)+.8*Math.max(T[n]-.8,0);if(G[n]=G[n]*g+($*b-I*(x[n]-M)*.8)*a,P[n]=P[n]*g+($*h+I*z[n]*.8)*a,T[n]>g0){const S=(T[n]-g0)*h0*u;G[n]+=(H()-.5)*S,P[n]+=(H()-.5)*S}B[n]=z[n],i0[n]=x[n],z[n]+=G[n]*a,x[n]+=P[n]*a,f0[n]=0,o0[n]=0,J[n]=0,r0[n]=y0[n],y0[n]=0}for(let n=0;n<c;n++){const j=T[n];for(let w=n+1;w<c;w++){const m0=z[w]-z[n],$=x[w]-x[n],S=m0*m0+$*$;if(S>X)continue;const s0=Math.sqrt(S)+1e-7,c0=u*(e0[n]+e0[w]),X0=!t.two||a0[n]===a0[w],O0=K(((j-T[w])*Math.sign($)-.03)/.12,0,1)*K((Math.min(j,T[w])-.36)/.1,0,1);let A0;if(s0<c0)A0=(c0-s0)*.45*(1-.95*O0);else if(X0){const G0=K((.32-Math.min(j,T[w]))/.2,0,1);A0=-(s0-c0)*(lt+.25*G0)*(1-(s0-c0)/(_-c0))*Math.min(1,5/(r0[n]+r0[w]+1))*(1-O0)}else continue;const I0=m0/s0,d0=$/s0;if(z[n]-=I0*A0,x[n]-=d0*A0,z[w]+=I0*A0,x[w]+=d0*A0,!X0)continue;const O=(1-s0/_)*(1-O0);s0<u*2.6&&(y0[n]++,y0[w]++);const U0=(T[w]-j)*O*a*.3;T[n]+=U0,T[w]-=U0,f0[n]+=(G[w]-G[n])*O,o0[n]+=(P[w]-P[n])*O,J[n]+=O,f0[w]+=(G[n]-G[w])*O,o0[w]+=(P[n]-P[w])*O,J[w]+=O}}for(let n=0;n<c;n++){const j=u*e0[n];x[n]<j*.95&&(x[n]=j*.95),x[n]>i-j&&(x[n]=i-j);const w=m(x[n])-j*.95;if(z[n]>w?z[n]=w:z[n]<-w&&(z[n]=-w),G[n]=(z[n]-B[n])/a,P[n]=(x[n]-i0[n])/a,J[n]>0){const m0=K((.32-T[n])/.2,0,1),$=(.06+.5*m0)/(1+J[n]*.15);G[n]+=f0[n]*$,P[n]+=o0[n]*$}}p0%12===0&&rt()}Q.step=q0;const W0=[z,x,G,P,B,i0,T,e0,f0,o0,J,y0,r0,a0,D,Z,u0,w0];return Q.save=()=>({a:W0.map(a=>a.slice()),n:p0,c:{...W}}),Q.load=a=>{W0.forEach((v,b)=>v.set(a.a[b])),p0=a.n,Object.assign(W,a.c)},Q.pack=()=>{for(let a=0;a<c;a++)N[a*4]=z[a],N[a*4+1]=x[a],N[a*4+2]=q*e0[a],N[a*4+3]=a0[a]+Math.min(T[a],.99);return N},Q}const ue=`#version 300 es
out vec2 vUv;
void main() { vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vUv = p; gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }`,he=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform vec4 uP[${et}];
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
}`,pe=`#version 300 es
precision highp float;
in vec2 vUv; out vec4 o;
uniform vec4 uP[${et}];
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
}`,Gt=`
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
}`,me=`
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
}`,xt=`#version 300 es
precision highp float;
out vec4 o;
float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
`;function Nt(t,o){const s=(d,F)=>{const L=t.createShader(d);return t.shaderSource(L,F),t.compileShader(L),L},i=t.createProgram(),m=s(t.VERTEX_SHADER,ue),A=s(t.FRAGMENT_SHADER,o);return t.attachShader(i,m),t.attachShader(i,A),t.linkProgram(i),{p:i,u:{},sh:[m,A],ok:!1}}const ve={uT0:0,uT1:1,uT2:2,uT3:3,uT4:4,uT5:5,uFA:6,uFB:7,uN:8,uFC:9};function at(t,o,s){const i=o[s];if(i.ok)return i;if(!t.getProgramParameter(i.p,t.LINK_STATUS))throw new Error("085 link "+s+": "+t.getProgramInfoLog(i.p)+" "+t.getShaderInfoLog(i.sh[1]));const m=t.getProgramParameter(i.p,t.ACTIVE_UNIFORMS);for(let d=0;d<m;d++){const F=t.getActiveUniform(i.p,d);i.u[F.name.replace(/\[0\]$/,"")]=t.getUniformLocation(i.p,F.name)}t.useProgram(i.p);const A=s[0]==="c"?ve:{uN:0};for(const d in A)i.u[d]&&t.uniform1i(i.u[d],A[d]);return i.ok=!0,i}const Yt="--0-10-1",de=[`#define G2
#define G5
`,`#define G4
#define G7
`];function xe(t,o){let s=St.get(t);if(s){let c=!1;for(const u of o)s[u]||(s[u]=Nt(t,s.src(u)),c=!0);return c&&t.flush(),s}t.getExtension("EXT_color_buffer_float"),t.getExtension("EXT_color_buffer_half_float"),t.getExtension("OES_texture_float_linear"),t.getExtension("KHR_parallel_shader_compile"),s={vao:t.createVertexArray()};const i=c=>c==="fa"?he:c==="fb"?pe:c[0]==="G"?xt+`#define LAYER 9
#define ROOM 0
`+de[+c[1]]+Gt:c[0]==="L"?xt+"#define LAYER "+c[1]+`
#define ROOM `+(c[2]||"0")+`
`+Gt:xt+ie[+c[1]]+`
`+me;for(const c of["fa","fb",...o])s[c]=Nt(t,i(c));t.flush(),s.src=i;const m=128,A=(c,u,q,_)=>{c=(c%q+q)%q,u=(u%q+q)%q;let X=c*374761393+u*668265263+_*2246822519|0;return X=Math.imul(X^X>>>13,1274126177),X^=X>>>16,(X>>>0)/4294967296},d=(c,u,q,_)=>{const X=Math.floor(c),l0=Math.floor(u),z=c-X,x=u-l0,G=z*z*(3-2*z),P=x*x*(3-2*x),B=A(X,l0,q,_),i0=A(X+1,l0,q,_),T=A(X,l0+1,q,_),e0=A(X+1,l0+1,q,_);return B+(i0-B)*G+(T-B)*P+(B-i0-T+e0)*G*P},F=(c,u,q,_,X)=>{let l0=0,z=.5,x=q,G=0;for(let P=0;P<_;P++)l0+=z*d(c*x/m,u*x/m,x,X+P),G+=z,z*=.5,x*=2;return l0/G},L=new Uint8Array(m*m*4);for(let c=0;c<m;c++)for(let u=0;u<m;u++){const q=(c*m+u)*4;L[q]=F(u,c,4,4,11)*255,L[q+1]=F(u,c,8,3,23)*255,L[q+2]=(d(u*32/m,c*32/m,32,41)*.7+d(u*64/m,c*64/m,64,43)*.3)*255,L[q+3]=F(u,c,16,2,77)*255}for(let c=0;c<4;c++){let u=255,q=0;for(let _=c;_<L.length;_+=4)u=Math.min(u,L[_]),q=Math.max(q,L[_]);for(let _=c;_<L.length;_+=4)L[_]=(L[_]-u)*255/Math.max(1,q-u)}return s.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,s.noise),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,m,m,0,t.RGBA,t.UNSIGNED_BYTE,L),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),St.set(t,s),s}function nt(t,o,s,i){const m=t.createTexture();return t.bindTexture(t.TEXTURE_2D,m),i=i||[t.RGBA16F,t.RGBA,t.HALF_FLOAT],t.texImage2D(t.TEXTURE_2D,0,i[0],o,s,0,i[1],i[2],null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),m}function ct(t,o){const s=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,o,0),s}function be(t){t.sort((A,d)=>A[0]-d[0]||A[1]-d[1]);const o=(A,d,F)=>(d[0]-A[0])*(F[1]-A[1])-(d[1]-A[1])*(F[0]-A[0]),s=[],i=[];for(const A of t){for(;s.length>=2&&o(s[s.length-2],s[s.length-1],A)<=0;)s.pop();s.push(A)}for(let A=t.length-1;A>=0;A--){const d=t[A];for(;i.length>=2&&o(i[i.length-2],i[i.length-1],d)<=0;)i.pop();i.push(d)}const m=s.slice(0,-1).concat(i.slice(0,-1));for(;m.length<6;)m.push(m[m.length-1]);return m.slice(0,6)}Pt.add({num:85,name:"Blob Lamp",fam:"Worlds",recipe:"A lava lamp on a bedside table at night where the wax heats at the bottom, rises in blobs that stretch and pinch off, cools at the top and sinks again. The colours and the size of the blobs change every mint. Tap to flip the switch and watch it warm up from a cold lump, drag sideways to tip it so the blobs slosh, or hold to turn up the heat.",interactive:"Tap to flip the switch: off, the glow dies and the wax slowly sinks into a lump; on, it takes a while to soften before the first blob swells and lifts. Drag sideways to tip the lamp a little and make the blobs drift and slosh. Hold to turn the heat up: more, livelier blobs.",music:!0,gl:!0,fps:30,seed:0,make(t){const o=t.gl,s=t.size,i=t.hash.slice(2),m=e=>{let l=parseInt(i.slice(e,e+8),16)>>>0,f=parseInt(i.slice(e+8,e+16),16)>>>0,r=parseInt(i.slice(e+16,e+24),16)>>>0,p=parseInt(i.slice(e+24,e+32),16)>>>0;const Y=()=>{l>>>=0,f>>>=0,r>>>=0,p>>>=0;let U=l+f|0;return l=f^f>>>9,f=r+(r<<3)|0,r=r<<21|r>>>11,p=p+1|0,U=U+p|0,r=r+U|0,(U>>>0)/4294967296};for(let U=0;U<15;U++)Y();return Y.st=()=>[l,f,r,p],Y.ld=U=>{l=U[0],f=U[1],r=U[2],p=U[3]},Y},A=m(0),d=m(16),F=m(32),L=(e,l)=>{l=l||A;let f=0;for(const p of e)f+=p[1];let r=l()*f;for(let p=0;p<e.length;p++)if(r-=e[p][1],r<=0)return p;return e.length-1},c=(e,l,f)=>e+(l-e)*(f||d)(),u=[["Orange in yellow",34],["Purple in blue",24],["Green in clear",18],["Red in purple",18],["Glitter",6]],q=[["Rocket",46],["Tall column",26],["Globe",20],["Giant floor lamp",8]],_=[["Bedroom",38],["Dorm desk",28],["Living room",26],["Rainy window",8]],X=[["A few big blobs",52],["Many small blobs",48]],l0=[["Brushed silver",44],["Black satin",28],["Copper",20],["Gold",8]],z=[["City lights",45],["Quiet street",35],["Full moon",20]],x=[["None",76],["Two-colour wax",9],["Overheated",7],["Cat watching",8]];let G=L(u),P=L(q),B=L(_),i0=L(X),T=L(l0),e0=L(z),f0=L(x);t.home&&(G=0,P=0,B=0,i0=0,T=0,e0=0,f0=0),t.trait("Colours",u[G][0]),t.trait("Lamp",q[P][0]),t.trait("Room",_[B][0]);let o0=2166136261;for(let e=0;e<i.length;e++)o0=Math.imul(o0^i.charCodeAt(e),16777619)>>>0;o0=(o0^140120526)>>>0;const J=()=>{o0=o0+1831565813|0;let e=Math.imul(o0^o0>>>15,1|o0);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},y0=[["Close on the wax",34],["Wide, off to one side",26],["Whole lamp",40]];let r0=L(y0,J),a0=0;{const e=J();a0=e<.09?1:e<.25?2:0}t.home&&(r0=2,a0=0),t.trait("Wax",a0===1?"One huge blob":a0===2?"A swarm of droplets":X[i0][0]),t.trait("Base",l0[T][0]),t.trait("Outside",z[e0][0]),t.trait("Rare",x[f0===3?0:f0][0]),t.trait("Framing",y0[r0][0]);const D=P===3?0:P,Z=P===3,u0=f0===1,w0=f0===2,W=!1,N=Bt[D],H=[["L0"+B,0]];B===2&&H.push(["L1"+B,0]),H.push(["L2",0]),H.push(["L4",0],["L5",0]),B===1&&H.push(["L5",1]),B!==3&&!Z&&H.push(["L7",0]),H.push(["L8",0]);const lt=e=>e==="L8"||Yt[+e[1]]==="-"?e:"G"+Yt[+e[1]],h0=xe(o,["c"+D,...new Set(H.map(e=>lt(e[0])))]),g0=d()<.5?1:-1,C=fe({shape:D,few:i0===0,two:u0,hot:w0,rnd:F,form:a0}),E0=!t.home&&F()<.22&&!a0,p0=t.hash+(t.home?"/h":""),Q=h0.memo||(h0.memo=new Map),F0=Q.get(p0);F0?(Q.delete(p0),Q.set(p0,F0),C.load(F0.sim),F.ld(F0.rs)):(E0?C.coldStart(300):C.prewarm(),Q.set(p0,{sim:C.save(),rs:F.st()}),Q.size>8&&Q.delete(Q.keys().next().value)),t.trait("Stage",E0?"Warming up, the lump softening":"Warm and flowing");const R0=C.Hg,_0=C.RM,B0=r0===0?.46:r0===1?1.42:1,rt=J()<.5?1:-1,q0=.0026*Math.min(1,B0*1.3),W0=Math.round(2*(_0+.01)/q0),a=Math.round((R0+.01)/q0),v=Math.max(8,Math.round(W0/2)),b=Math.max(8,Math.round(a/2)),h=[-(_0+.01),-.005,2*(_0+.01),R0+.01],g=[{W:[1,.22,.02],L:[1,.6,.08],ab:[.5,1.8,12],cl:0,gg:1,W2:[.95,.06,.1]},{W:[.45,.07,.6],L:[.12,.36,1],ab:[10,3.5,.8],cl:0,gg:1,W2:[1,.28,.58]},{W:[.3,.85,.08],L:[.9,.86,.74],ab:[.5,.4,.9],cl:1,gg:.35,W2:[.08,.35,1]},{W:[.95,.05,.04],L:[.55,.14,.85],ab:[2.5,11,1.5],cl:0,gg:1,W2:[1,.5,.03]},{W:[1,.22,.5],L:[.5,.7,1],ab:[3,1.5,.7],cl:0,gg:.7,W2:[.92,.9,.95]}][G],y=[[.6,.6,.62,.32],[.045,.045,.05,.45],[.86,.5,.32,.28],[.95,.72,.32,.2]][T],M=Z?.42:1,R=[{zw:-.62,zb:-.62,zf:.4,tx:[-2,2],win:[-1.1,-.26,.3,1.3],wall:[.4,.36,.32],table:[.3,.16,.08],kind:0,gloss:26,book:[-.36,.14,.32,.3,.21,.045],book2:null,glass:[-.2,-.3],cord:!0,frame:0},{zw:-.5,zb:-.5,zf:.38,tx:[-2,2],win:[-1.05,-.28,.28,1.2],wall:[.5,.48,.42],table:[.55,.55,.52],kind:1,gloss:14,book:[-.37,.12,.12,.31,.23,.05],book2:[-.35,.11,-.18,.26,.19,.035],glass:[.23,-.26],cord:!0,frame:1},{zw:-1.35,zb:-.4,zf:.36,tx:[-.62,.55],win:[-1.5,-.4,-.1,1.6],wall:[.3,.25,.21],table:[.13,.065,.035],kind:2,gloss:45,book:[-.34,.12,-.25,.29,.21,.045],book2:null,glass:[-.21,-.22],cord:!0,frame:1},{zw:-.3,zb:-.3,zf:.34,tx:[-2,2],win:[-2.5,2.5,0,2.5],wall:[.45,.44,.42],table:[.5,.49,.47],kind:3,gloss:10,book:[.27,.15,-.3,.28,.2,.04],book2:null,glass:[-.2,-.15],cord:!1,frame:0}][B],n0=new Float32Array(96*4),k=(e,l,f,r,p)=>{n0[e*4]=l,n0[e*4+1]=f,n0[e*4+2]=r,n0[e*4+3]=p},v0=N.hf*B0,n=r0===0?(N.yb+(N.yg-N.yb)*(.36+.1*J()))*b0:r0===1?N.cy+v0*.24:N.cy+.03,j=r0===0?v0*rt*(.08+.16*J()):r0===1?v0*rt*.38:-N.cx,w=j*g0;k(0,s,0,b0,tt),k(1,j,n,v0,g0),k(2,N.yb,N.yg,N.yt,10),k(3,B,M,R.zw,Z?3:R.zf);const m0=B===0?[[.4,.36,.32],[.34,.36,.38],[.42,.33,.3]][Math.floor(d()*3)]:R.wall;k(4,m0[0],m0[1],m0[2],Z?4:R.kind);const $=Z?[.2,.15,.12]:R.table;k(5,$[0],$[1],$[2],Z?2:R.gloss),k(6,R.win[0],R.win[1],R.win[2],R.win[3]);const S=[{lo:[.014,.011,.013],hi:[.004,.005,.011],fill:[.0035,.0038,.005],wl:[.03,.028,.03]},{lo:[.006,.006,.01],hi:[.002,.003,.008],fill:[.004,.0032,.0026],wl:[.045,.028,.012]},{lo:[.006,.01,.022],hi:[.003,.005,.014],fill:[.003,.004,.007],wl:[.02,.028,.05]}][e0],s0=(e,l,f)=>[(e*g0-w)/(2*v0)+.5,(l*b0-f*tt-n)/(2*v0)+.5],c0=[s0(R.win[0],R.win[2],R.zw),s0(R.win[1],R.win[3],R.zw)],X0=Math.min(c0[0][0],c0[1][0]),O0=Math.max(c0[0][0],c0[1][0]),A0=Math.min(c0[0][1],c0[1][1]),I0=Math.max(c0[0][1],c0[1][1]),d0=[],O=[Math.max(X0,-.05),Math.min(O0,1.05),Math.max(A0,-.05),Math.min(I0,1.05)],U0=()=>c(O[0]-.02,O[1]+.02),G0=(e,l)=>c(O[2]+(O[3]-O[2])*e,O[2]+(O[3]-O[2])*l),V0=(B===2?.75:B===3?1.1:1)*Math.pow(1/B0,.6);if(e0===0){const e=B===3?26:20;for(let l=0;l<e;l++){const f=d(),r=f<.5?[1,.68,.32]:f<.75?[1,.5,.12]:f<.9?[.7,.8,1]:d()<.5?[1,.12,.08]:[.2,1,.45],p=c(.05,.3)*(f>.9?1.4:1)*(l%3===2?0:.55);d0.push([U0(),G0(0,.75),(.034+.004*d())*V0,r.map(Y=>Y*p),1])}}else if(e0===1){const e=4+Math.floor(d()*3),l=G0(.15,.45),f=c(-.25,.25);for(let r=0;r<e;r++){const p=O[0]+(O[1]-O[0])*(r+.3+d()*.4)/e;d0.push([p,l+f*(p-.5)+c(-.03,.03),(.056+.006*d())*V0,[1,.52,.14].map(Y=>Y*c(.25,.5)),1])}for(let r=0;r<6;r++)d0.push([U0(),G0(0,.5),(.04+.004*d())*V0,[1,.75,.45].map(p=>p*c(.03,.09)),1])}else{d0.push([c(O[0]+.05,O[1]-.03),G0(.62,.85),.075*V0,[.85,.92,1].map(e=>e*.85),.4]);for(let e=0;e<6;e++)d0.push([U0(),G0(0,.4),(.036+.004*d())*V0,[.6,.75,1].map(l=>l*c(.03,.1)),1])}k(7,S.lo[0],S.lo[1],S.lo[2],Math.min(d0.length,28)),k(8,S.fill[0],S.fill[1],S.fill[2],B===3?1.6:B===2?.5:1),k(36,S.hi[0],S.hi[1],S.hi[2],0),k(37,S.wl[0],S.wl[1],S.wl[2],R.frame),d0.slice(0,28).forEach((e,l)=>{k(38+2*l,e[0],e[1],e[2],0),k(39+2*l,e[3][0],e[3][1],e[3][2],e[4])});const ye=[R.book,R.book2],Wt=R.glass;ye.forEach((e,l)=>{if(!e){k(11,0,0,0,0);return}const f=l===1?R.book[5]*M:0,r=e[3]*M,p=e[4]*M,Y=e[5]*M,U=l===0?Math.floor(d()*4):(Math.floor(d()*3)+1)%4;k(9+2*l,e[0],e[1],e[2],r),k(10+2*l,p,Y,f,U);const S0=Math.cos(e[2]),ne=Math.sin(e[2]),ce=[];for(const L0 of[-1,1])for(const ke of[0,1])for(const Ee of[-1,1]){const le=L0*r/2,re=Ee*p/2,Fe=e[0]+S0*le+ne*re,qe=e[1]-ne*le+S0*re,Pe=f+ke*Y;ce.push([Fe,Pe*b0-qe*tt])}const dt=be(ce);for(let L0=0;L0<3;L0++)k(30+3*l+L0,dt[2*L0][0],dt[2*L0][1],dt[2*L0+1][0],dt[2*L0+1][1])}),k(13,Wt[0],Wt[1],.046*M,.19*M),k(14,.12*M,0,R.cord&&!Z?1:0,0);const P0=[[.1,-.06],[.32,-.02],[.2,.3],[.55,.47]];k(16,P0[0][0],P0[0][1],P0[1][0],P0[1][1]),k(17,P0[2][0],P0[2][1],P0[3][0],P0[3][1]),k(18,k0(D,N.yb*.92),k0(D,N.yb*.45),.6,.055),k(19,0,R.tx[0],R.tx[1],R.zb);for(let e=0;e<24;e++)n0[80+e]=k0(D,N.yt*e/23);k(94,8,2,24,3),k(95,6,4,4,0);const Ot=e=>N.yb+(N.yg-N.yb)*e/3;k(26,N.yb*b0-.01,N.yb*b0+.01,k0(D,N.yb)*.9,.75);for(let e=0;e<3;e++){const l=Ot(e),f=Ot(e+1),r=k0(D,(l+f)/2);k(27+e,l*b0,f*b0,r*.8,.7)}const we=!!o.getExtension("EXT_color_buffer_float"),Ut=[o.RGBA16F,o.RGBA,o.HALF_FLOAT],bt=we?[o.R11F_G11F_B10F,o.RGB,o.HALF_FLOAT]:Ut,Dt=[bt,[o.SRGB8_ALPHA8,o.RGBA,o.UNSIGNED_BYTE],bt,Ut,bt,[o.RG16F,o.RG,o.HALF_FLOAT]].map(e=>nt(o,s,s,e)),Ht=Dt.map(e=>ct(o,e)),Ct=nt(o,W0,a),ge=ct(o,Ct),Xt=nt(o,v,b),Re=ct(o,Xt),It=nt(o,v,b),Ae=ct(o,It);let yt,K0,st;const D0=(e,l)=>{o.activeTexture(o.TEXTURE0+e),o.bindTexture(o.TEXTURE_2D,l)},wt=()=>{o.disable(o.BLEND),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.colorMask(!0,!0,!0,!0),o.bindVertexArray(h0.vao)};wt();for(const e of Ht)o.bindFramebuffer(o.FRAMEBUFFER,e),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);o.enable(o.BLEND),o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE),D0(0,h0.noise),o.viewport(0,0,s,s);for(const[e,l]of H){const f=at(o,h0,lt(e));o.useProgram(f.p),n0[383]=l,n0[60]=+e[1];for(let r=0;r<6;r++)e==="L8"&&r<4||(n0[1]=r,o.bindFramebuffer(o.FRAMEBUFFER,Ht[r]),o.uniform4fv(f.u.uR,n0),o.drawArrays(o.TRIANGLES,0,3))}o.disable(o.BLEND),yt=at(o,h0,"c"+D),K0=at(o,h0,"fa"),st=at(o,h0,"fb");const x0=C.ctl;let z0=1,N0=!0,gt=99,j0=0,Rt=c(60,95,F),it=0;E0&&(x0.on=!0);let t0=0,T0=0,Vt=0,Kt=0,ft=0,ut=c(2,5,F),jt=1,Zt=0,_e=0,Qt=0;const E={down:!1,t:0,sx:0,sy:0,px:0,py:0,moved:0,kind:""};let ht=null;const M0=t.sound;C.onMerge=(e,l)=>{if(At-Zt<.7||!M0.on)return;Zt=At;const f=31+Math.round(K(22-e*.35,0,14))+[0,0,3,5,7][Math.floor(F()*5)];M0.note(f,{dur:2.6,vel:.16+.1*K(e/40,0,1),wave:"sine",pan:0,cutoff:500}),M0.note(f+12,{dur:1.6,vel:.05,wave:"sine",cutoff:900,at:.02})};let At=0;function zt(){N0=!N0,x0.on=N0,M0.hit("click",.55),M0.hit("click",.25,{at:.04})}const H0=new Float32Array(8),Y0=new Float32Array(24*4),V=(e,l,f,r,p)=>{Y0[e*4]=l,Y0[e*4+1]=f,Y0[e*4+2]=r,Y0[e*4+3]=p},$t=[0,0,0];for(let e=0;e<3;e++){const l=R0*e/3,f=R0*(e+1)/3;let r=0;for(let p=0;p<20;p++)r+=2*C.rin(l+(f-l)*(p+.5)/20)*(f-l)/20;$t[e]=r}const Z0=[0,0,0],pt=g.L,mt=g.W,Jt=(Z?1.25:1)*(D===2?1.15:1),te=2.2;function ze(e){Z0[0]=Z0[1]=Z0[2]=0;for(let r=0;r<C.N;r++){const p=K(Math.floor(C.y[r]/R0*3),0,2),Y=C.rp*C.sc[r]*1.15;Z0[p]+=Math.PI*Y*Y}const l=g.cl?[1,.82,.6]:pt;let f=1;for(let r=0;r<3;r++){const p=K(Z0[r]/$t[r],0,1),Y=[1.55,1,.68][r]*f*z0*Jt*.55,U=[0,1,2].map(S0=>Y*((1-p)*l[S0]*(g.cl?.75:1)+p*mt[S0]*.85));V(11+r,U[0],U[1],U[2],r===0?0:r===1?N0?1:-1:B===3?1:0),f*=Math.exp(-1.1*p)}V(10,z0*1,z0*.74,z0*.45,0),V(0,s,e,Z?1.7:1.8,.006),V(1,w,n,v0,(0-w)/(2*v0)+.5),V(2,b0,tt,Math.cos(t0),Math.sin(t0)),V(3,t0>=0?k0(D,0):-k0(D,0),-.05,g.cl,R0-.012),V(4,h[0],h[1],h[2],h[3]),V(5,1.05*(1+(te-1)*.5),.024*(i0===0?1:.8),.022,1.2),V(6,pt[0],pt[1],pt[2],g.gg*.85),V(7,mt[0],mt[1],mt[2],z0*Jt),V(8,g.W2[0],g.W2[1],g.W2[2],u0?1:0),V(9,y[0],y[1],y[2],y[3]),V(14,S.fill[0]*3,S.fill[1]*3,S.fill[2]*3,G===4?1:0),V(15,-.6*g0,S.wl[0]*6,S.wl[1]*6,S.wl[2]*6),V(16,.06,.048,.034,.3*g0),V(17,X0,O0,Math.max(A0,s0(0,.06,R.zw)[1]),I0),V(18,g.ab[0],g.ab[1],g.ab[2],6),V(19,$[0],$[1],$[2],1/v),V(20,1/b,5,2,3),Y0[83]=(S.fill[0]+S.fill[1]+S.fill[2])*1.2,Y0[84]=3}function ee(){const e=C.pack();wt(),H0.set([h[0],h[1],h[2],h[3],C.N,te,0,0]),o.bindFramebuffer(o.FRAMEBUFFER,ge),o.viewport(0,0,W0,a),o.useProgram(K0.p),o.uniform4fv(K0.u.uP,e),o.uniform4fv(K0.u.uF,H0),o.drawArrays(o.TRIANGLES,0,3),H0.set([C.N,4,0,0],4),o.bindFramebuffer(o.FRAMEBUFFER,Ae),o.viewport(0,0,v,b),o.uniform4fv(K0.u.uF,H0),o.drawArrays(o.TRIANGLES,0,3),H0.set([C.N,-.05,22,.42],4),o.bindFramebuffer(o.FRAMEBUFFER,Re),o.viewport(0,0,v,b),o.useProgram(st.p),o.uniform4fv(st.u.uP,e),o.uniform4fv(st.u.uF,H0),o.drawArrays(o.TRIANGLES,0,3)}function oe(e){ze(e),o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,s,s),wt(),o.useProgram(yt.p);for(let l=0;l<6;l++)D0(l,Dt[l]);D0(6,Ct),D0(7,Xt),D0(8,h0.noise),D0(9,It),o.uniform4fv(yt.u.uA,Y0),o.drawArrays(o.TRIANGLES,0,3)}function Te(e){const l=t.input,f=l.taps?l.taps():[];f.length&&(ht=f[f.length-1]);const r=l.x,p=l.y;if(ft=0,l.down&&l.inside){if(gt=0,E.down?E.t+=e:(E.down=!0,E.t=0,E.sx=r,E.sy=p,E.px=r,E.py=p,E.moved=0,E.kind="press",ht=null),E.moved+=Math.hypot(r-E.px,p-E.py),E.kind==="press"&&E.moved>.03&&(E.kind="drag"),E.kind==="press"&&E.t>.3&&(E.kind="hold",M0.hit("click",.15)),E.kind==="drag"){const Y=K((r-E.sx)*.45,-.085,.085);T0+=((Y-t0)*120-T0*18)*e}E.kind==="hold"&&(ft=1),E.px=r,E.py=p}else E.down?(E.kind==="press"&&zt(),E.down=!1):ht&&zt(),ht=null,gt+=e}function Me(e){if(E.down&&E.kind==="drag")t0+=T0*e;else{T0+=(-t0*70-T0*5)*e;const f=t0+T0*e;t0!==0&&Math.sign(f)!==Math.sign(t0)?(Math.abs(T0)>.08&&M0.hit("kick",K(Math.abs(T0)*.25,.04,.2)),T0*=-.25,t0=0):t0=f}t0=K(t0,-.1,.1);const l=e>0?(t0-Vt)/e:0;x0.spin=K(x0.spin-(l-Kt)*.9,-1.5,1.5)*Math.exp(-e/1.4),Vt=t0,Kt=l,x0.tilt=t0,x0.boost+=(ft-x0.boost)*(1-Math.exp(-e/(ft?1.2:4))),z0+=((N0?1+.12*x0.boost:0)-z0)*(1-Math.exp(-e/(N0?.12:.35))),gt>40||!t.input.inside?(j0+=e,j0>Rt&&(zt(),j0=0,Rt=N0?c(70,110,F):c(14,24,F))):j0=Math.min(j0,Rt-5),ut-=e,ut<0&&(jt=0,ut<-.16&&(jt=1,ut=c(2.5,7,F)))}const Q0=11025,ae=new Float32Array(4096);let C0=0,Tt=0,Mt=12345,$0=0,Lt=0,kt=0,Et=0,Ft=0,qt=0,vt=0,Be=0;function Le(e){if(!M0.on)return;Tt+=e*Q0;const l=Math.min(4096,Math.floor(Tt));if(Tt-=l,l<=0)return;const f=z0*(.05+.06*x0.boost);for(let r=0;r<l;r++){Et+=(f-Et)*.002,C0+=J0*120/Q0,C0>J0&&(C0-=J0);const p=Math.sin(C0)+.5*Math.sin(2*C0+.3)+.25*Math.sin(3*C0+1.1);Mt=Mt*1103515245+12345&2147483647;const Y=Mt/1073741823-1;$0+=(Y-$0)*.05,Lt+=(Y-Lt)*.4,kt+=($0-kt)*.02,Ft+=1/Q0,Ft>=1&&(Ft-=1,Qt^=1,vt=1,qt=0);let U=0;vt>.001&&(qt+=J0*(Qt?2900:2300)/Q0,U=Math.sin(qt)*vt*(.6+.4*Y),vt*=.9);let S0=p*Et*.25+($0-kt)*.05+U*.05;B===3&&(S0+=(Lt-$0)*.12+(Y>.9985?Y*.25:0)),ae[r]=S0}M0.pcm(ae.subarray(0,l),Q0,{vel:.7})}return E0&&(z0=1,x0.on=!0),ee(),oe(0),(e,l)=>{l=Math.min(Math.max(l,0),.15),Te(l),Me(l),it+=l;let f=Math.floor(it/ot);f>8?(f=8,it=0):it-=f*ot;for(let r=0;r<f;r++)C.step(ot),At+=ot;ee(),oe(e),Le(l)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
