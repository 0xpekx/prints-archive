// Ball Cradle: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/124.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(q0){q0&&function(){"use strict";const st="",I0=new WeakMap,Ke=Math.PI*2,it=2,lt=0,ft={"520123c7":"steel 5 chrome walnut lamp face","506dc005":"steel 5 wire walnut lamp down","465ef5b9":"steel 5 chrome walnut lamp above","586559c9":"steel 5 walnut walnut lamp end","7602df79":"steel 7 chrome walnut lamp low",71418733:"glass 5 chrome walnut candle face",b170baa5:"steel 5 chrome walnut candle end",f4afcfdc:"steel 5 chrome walnut candle low",d7e143c9:"steel 5 chrome walnut candle down","9ce4183d":"steel 5 chrome bench window above","816ec164":"steel 5 chrome walnut window down","8d8de807":"brass 5 chrome walnut candle low","5fa95503":"glass 5 chrome walnut window end","110c2295":"steel 5 chrome oxblood window face","4a376ec8":"steel 3 chrome green window close"},Te=(t,e,c)=>t<e?e:t>c?c:t,C0=(t,e,c)=>{const R=Te((c-t)/(e-t),0,1);return R*R*(3-2*R)};function Ge(t,e){const c=t.replace(/^0x/,"").padEnd(64,"0");let R=parseInt(c.slice(0,8),16)^e,i=parseInt(c.slice(8,16),16)^Math.imul(e,7919),w=parseInt(c.slice(16,24),16)^parseInt(c.slice(48,56),16),g=parseInt(c.slice(24,32),16)^parseInt(c.slice(32,40),16)^parseInt(c.slice(56,64),16);const C=()=>{R>>>=0,i>>>=0,w>>>=0,g>>>=0;let f=R+i|0;return R=i^i>>>9,i=w+(w<<3)|0,w=w<<21|w>>>11,g=g+1|0,f=f+g|0,w=w+f|0,(f>>>0)/4294967296};for(let f=0;f<20;f++)C();return C}const Pe=(t,e)=>{let c=0;for(const i of e)c+=i[1];let R=t()*c;for(const i of e)if(R-=i[1],R<0)return i[0];return e[e.length-1][0]};function ut(t){const e=t.n,c=t.L,R=9.81,i=new Float64Array(e),w=new Float64Array(e),g=new Float64Array(e),C=new Float64Array(e),f=new Float64Array(e),u=new Float64Array(e),m=new Float64Array(e),U=new Float64Array(e),D=new Float64Array(e),k=new Float64Array(e),W=new Float64Array(e),P=new Float64Array(e),B=new Uint8Array(e),Q=new Float64Array(e),E=new Float64Array(e),a=new Float64Array(e),h=new Float64Array(e),r=new Float64Array(e),s=new Uint8Array(e),p=new Float64Array(e);for(let v=0;v<e;v++)i[v]=t.r[v],w[v]=t.m[v],C[v]=t.z0[v];let M=0;for(let v=0;v<e;v++)v&&(M+=i[v-1]+i[v]+t.gap[v-1]),g[v]=M;const F=M/2;for(let v=0;v<e;v++)g[v]-=F;for(let v=0;v+1<e;v++){const A=i[v]*i[v+1]/(i[v]+i[v+1]);a[v]=4/3*t.Es*Math.sqrt(A),h[v]=w[v]*w[v+1]/(w[v]+w[v+1])}const S=R/c,T=R/t.Lz,q=t.air,O=t.visc,L=t.zd,y={n:e,r:i,m:w,px:g,th:f,om:u,z:m,vz:U,z0:C,lock:B,still:Q,LASTF:p,K:a,L:c,time:0,steps:0,force:0,on:null};return y.step=function(v){let A=v;for(let o=0;o<e;o++){const z=f[o];D[o]=Math.sin(z),k[o]=Math.cos(z),W[o]=0,P[o]=0}let _=0;for(let o=0;o+1<e;o++){const z=o+1,K=g[z]+c*D[z]-(g[o]+c*D[o]),G=c*(k[o]-k[z]),ze=C[z]+m[z]-(C[o]+m[o]),ve=Math.sqrt(K*K+G*G+ze*ze),De=K/ve,V=G/ve,ne=ze/ve,he=ve-i[o]-i[z],be=c*u[o],Ae=c*u[z],$=(be*k[o]-Ae*k[z])*De+(be*D[o]-Ae*D[z])*V+(U[o]-U[z])*ne;if(he<0){const ee=-he,pe=Math.sqrt(ee);s[o]||(s[o]=1,r[o]=Math.max($,1e-4));const me=r[o],Me=t.e0-t.e1*Math.pow(me,.2),b0=1+.75*(1-Me*Me)*$/me,xe=a[o]*ee*pe*Math.max(b0,0),ce=k[o]*De+D[o]*V,ge=k[z]*De+D[z]*V;W[o]-=xe*ce/w[o],W[z]+=xe*ge/w[z],P[o]-=xe*ne/w[o],P[z]+=xe*ne/w[z],xe>_&&(_=xe),p[o]=xe;const a0=$>0?$:0,m0=.5*h[o]*a0*a0+.4*a[o]*ee*ee*pe,We=Math.pow(2.5*m0/a[o],.4),Qe=Math.sqrt(h[o]/(1.5*a[o]*Math.sqrt(We)));.2*Qe<A&&(A=.2*Qe)}else if(s[o]&&(s[o]=0,y.on&&y.on(o,r[o])),p[o]=0,$>1e-6){const ee=he/$,pe=Math.pow(h[o]/a[o],.4)*Math.pow($>1e-4?$:1e-4,-.2)*.12,me=ee<pe?pe:ee;me<A&&(A=me)}}y.force=_;for(let o=0;o<e;o++){if(B[o])continue;let z=u[o];const K=c*(z<0?-z:z);z+=A*(W[o]/c-S*D[o]-O*z-q*K*z),Q[o]>0&&(z*=Math.exp(-A*Q[o])),u[o]=z,f[o]+=z*A;let G=U[o];G+=A*(P[o]-T*m[o]-L*G),Q[o]>0&&(G*=Math.exp(-A*Q[o])),U[o]=G,m[o]+=G*A}return y.time+=A,y.steps++,A},y.run=function(v,A){let _=v,o=A||4e3;for(;_>1e-9&&o-- >0;)_-=y.step(_<t.dtFree?_:t.dtFree)},y.ttc=function(){let v=1;for(let A=0;A+1<e;A++){const _=g[A+1]+c*Math.sin(f[A+1])-(g[A]+c*Math.sin(f[A]))-i[A]-i[A+1],o=c*(u[A]-u[A+1]);if(o>.001){const z=(_>0?_:0)/o;z<v&&(v=z)}}return v},y}function dt(t,e){const c=new Float32Array(16);for(let R=0;R<4;R++)for(let i=0;i<4;i++){let w=0;for(let g=0;g<4;g++)w+=t[g*4+i]*e[R*4+g];c[R*4+i]=w}return c}const ue=t=>{const e=Math.hypot(t[0],t[1],t[2]);return[t[0]/e,t[1]/e,t[2]/e]},_e=(t,e)=>[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]],ke=(t,e)=>t[0]*e[0]+t[1]*e[1]+t[2]*e[2],vt=`
layout(std140) uniform S { mat4 uVP; vec4 uE; vec4 uFw; vec4 uRt; vec4 uUp; vec4 uCam; vec4 uCoc; vec4 uLP; vec4 uLX; vec4 uLY; vec4 uLN; vec4 uLd; vec4 uLc; vec4 uAmb; vec4 uBase; vec4 uRail; vec4 uRow; vec4 uW1; vec4 uW0; vec4 uDesk; vec4 uTone; vec4 uF0[7]; vec4 uBm; };
`,Ce=`
layout(std140) uniform D { vec4 uB[7]; vec4 uA[7]; vec4 uT; vec4 uX; };
`,de=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
${vt}
// a desk lamp is a cone: one warm pool, the room beyond it left to the ambient
// (a pool on the desk with the cradle in it, the room beyond left dark; the open top throws a little up onto the ceiling)
float spotK(vec3 Q) { float c = dot(normalize(Q - uLP.xyz), -uLd.xyz); return abs(uLP.w - 1.0) < 0.5 ? 0.09 + 0.91 * smoothstep(0.88, 0.97, c) + 0.3 * smoothstep(-0.2, -0.6, c) : 1.0; }`,Ze=`
vec2 octEnc(vec3 d) { vec3 n = d.xzy / (abs(d.x) + abs(d.y) + abs(d.z)); vec2 p = n.xy; if (n.z < 0.0) p = (1.0 - abs(p.yx)) * vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0); return p * 0.5 + 0.5; }
`,Q0=`
// the light itself is a textured plane in the room, so every ball sees it from its own place, crisp
vec4 lightRad(vec3 P, vec3 R) {
  vec4 c = vec4(0.0);
  float dn = dot(R, uLN.xyz);
  if (dn < -1e-4) {
    float t = dot(uLP.xyz - P, uLN.xyz) / dn;
    vec3 Q = P + R * t - uLP.xyz;
    vec2 q = vec2(dot(Q, uLX.xyz) / uLX.w, dot(Q, uLY.xyz) / uLY.w);
    if (t > 0.0 && abs(q.x) < 1.0 && abs(q.y) < 1.0) c = textureLod(uLT, q * 0.5 + 0.5, 0.0);
  }
  return c;
}
`,Be=`#version 300 es
layout(location=0) in vec2 aP; out vec2 vU; void main() { vU = aP * 0.5 + 0.5; gl_Position = vec4(aP, 0.0, 1.0); }`,ht=`${de}
uniform sampler2D uN; in vec2 vU; out vec4 o;
void main() {
  vec2 q = vU * 2.0 - 1.0;
  vec3 c = vec3(0.0); float a = 0.0;
  float ty = uLP.w;
  if (ty < 0.5) {
    // a wide window: panes of bright sky over bare branches, backlit bars, soft curtains at the sides
    vec2 g = vec2(abs(fract(vU.x * 6.0) - 0.5) * 0.5, abs(fract(vU.y * 4.0) - 0.5) * 0.5);
    float bars = smoothstep(0.222, 0.232, 0.25 - g.x) * smoothstep(0.218, 0.228, 0.25 - g.y);
    // three tall sashes of two panes: glazing bars, not a grid
    bars = smoothstep(0.009, 0.015, abs(fract(vU.x * 3.0 + 0.5) - 0.5));
    float barh = smoothstep(0.011, 0.018, abs(fract((vU.y - 0.04) * 2.0 + 0.5) - 0.5));
    bars *= barh;
    float frame = smoothstep(0.955, 0.97, max(abs(q.x), abs(q.y)));
    float cl = texture(uN, vU * vec2(0.45, 0.2) + 0.17).r, cl2 = texture(uN, vU * vec2(1.3, 0.7) + 0.4).g;
    vec3 pane = mix(vec3(1.0, 0.97, 0.92) * 1.5, vec3(0.80, 0.90, 1.08) * 3.4, smoothstep(0.1, 1.0, vU.y + 0.25 * (cl - 0.5)));
    pane *= 0.62 + 1.1 * smoothstep(0.25, 0.75, cl2 * 0.5 + cl * 0.5);
    // branches: dark ridges of warped noise, thinning upward
    float b1 = texture(uN, vU * vec2(0.8, 0.34) + vec2(0.31, 0.07)).g, b2 = texture(uN, vU * vec2(2.3, 1.1) + 0.5).b;
    float br = smoothstep(0.016, 0.003, abs(b1 + 0.2 * b2 - 0.56)) * smoothstep(1.05, 0.25, vU.y);
    pane = mix(pane, vec3(0.10, 0.09, 0.07), br * 0.92);
    // far ground and hedge along the bottom
    pane = mix(vec3(0.20, 0.23, 0.13) * 1.8 * (0.6 + 0.8 * cl2), pane, smoothstep(0.17, 0.26, vU.y + 0.09 * (cl - 0.5)));
    c = pane * bars * (1.0 - frame) + vec3(0.13, 0.115, 0.095) * (1.0 - bars * (1.0 - frame));
    // the sill: a pale ledge catching the sky
    c = mix(c, vec3(0.62, 0.60, 0.57) * (0.8 + 0.3 * cl), smoothstep(0.085, 0.078, vU.y) * smoothstep(0.03, 0.04, vU.y));
    // curtains drawn over both sides
    float cu = max(smoothstep(-0.70, -0.82, q.x + 0.05 * sin(q.y * 9.0 + 2.0 * cl)), smoothstep(0.80, 0.90, q.x + 0.04 * sin(q.y * 7.0 + 1.0)));
    c = mix(c, vec3(1.0, 0.82, 0.62) * (0.8 + 0.55 * sin(q.x * 46.0 + 3.0 * sin(q.y * 3.0))), cu);
    a = 1.0;
  } else if (ty < 1.5) {
    // a desk lamp seen from below: a dark shade, a hot lining, and the bulb
    float r = length(q);
    float mouth = 1.0 - smoothstep(0.62, 0.65, r), lip = 1.0 - smoothstep(0.65, 0.72, r);
    float hot = exp(-r * r * 16.0);
    vec3 lin = vec3(1.0, 0.84, 0.60) * (5.0 + 8.0 * (1.0 - r / 0.65)) ;
    c = mix(vec3(0.05, 0.035, 0.02), lin + vec3(1.0, 0.9, 0.72) * hot * 70.0, mouth);
    a = lip;
  } else {
    // a candle: a flame above a pale stub
    vec2 f = vec2(q.x * 3.2, (q.y - 0.28) * 1.6);
    float w = 1.0 - 0.75 * clamp(f.y, -1.0, 1.0);
    float d = length(vec2(f.x / max(w * 0.48, 0.02), f.y + 0.1 * f.x * f.x));
    float fl = 1.0 - smoothstep(0.55, 0.98, d);
    vec3 fc = mix(vec3(1.0, 0.42, 0.10) * 9.0, vec3(1.0, 0.82, 0.50) * 42.0, smoothstep(0.1, 0.7, fl));
    fc = mix(fc, vec3(0.12, 0.22, 0.9) * 3.0, smoothstep(-0.55, -0.82, f.y) * 0.8);
    float wick = smoothstep(0.05, 0.02, abs(q.x)) * smoothstep(-0.28, -0.22, q.y) * smoothstep(-0.02, -0.1, q.y);
    fc = mix(fc, vec3(0.02), wick * 0.9);
    float stub = smoothstep(0.26, 0.24, abs(q.x)) * smoothstep(-0.26, -0.3, q.y);
    vec3 sc = vec3(1.0, 0.72, 0.38) * (2.2 * exp(-(q.y + 0.3) * (q.y + 0.3) * 5.0) + 0.25);
    c = fc * fl + sc * stub * (1.0 - fl);
    a = clamp(fl + stub, 0.0, 1.0);
  }
  o = vec4(c, a);
}`,X0=`
uniform sampler2D uN; uniform sampler2D uLT;
${Q0}
// the window as a beam: the bright sky through the glazing falls across the room as a soft cool patch, sash bars and all,
// its edge widening with the distance from the glass (uBm: the way back to the sky, and its strength)
vec3 beam(vec3 Q, vec3 N) {
  float cn = dot(N, uBm.xyz), dn = dot(uBm.xyz, uLN.xyz);
  if (uBm.w <= 0.0 || cn <= 0.0 || dn > -1e-4) return vec3(0.0);
  float t = dot(uLP.xyz - Q, uLN.xyz) / dn;
  vec3 W = Q + uBm.xyz * t - uLP.xyz;
  vec2 q = vec2(dot(W, uLX.xyz) / uLX.w, dot(W, uLY.xyz) / uLY.w);
  float pw = 0.02 + 0.03 * t;
  // the curtains cut the sides; the low panes see the hedge and the ground, so the desk gets less than the far wall
  float m = smoothstep(-pw, pw, 0.80 - abs(q.x - 0.05)) * smoothstep(-pw, pw, 0.73 - abs(q.y - 0.23)) * (0.4 + 0.6 * smoothstep(-0.3, 0.1, q.y));
  vec3 s = textureLod(uLT, clamp(q * 0.5 + 0.5, 0.0, 1.0), 1.5 + 1.2 * t).rgb;
  return s * vec3(0.72, 0.95, 1.17) * (m * cn * uBm.w);
}
vec3 octDec(vec2 u) { vec2 f = u * 2.0 - 1.0; vec3 n = vec3(f, 1.0 - abs(f.x) - abs(f.y)); float t = max(-n.z, 0.0); n.x += n.x >= 0.0 ? -t : t; n.y += n.y >= 0.0 ? -t : t; return normalize(n).xzy; }
vec3 lit(vec3 Q, vec3 N) {
  vec3 d = uLP.xyz - Q; float dd = dot(d, d); vec3 L = d * inversesqrt(dd);
  return uLc.rgb * max(dot(N, L), 0.0) * uLc.w / dd * spotK(Q) + uAmb.rgb + beam(Q, N);
}
vec3 deskAlb(vec2 q) {
  float n1 = texture(uN, q * vec2(0.5, 3.0)).r, n2 = texture(uN, q * vec2(1.3, 19.0)).g;
  // a leather-topped desk: the leather inlay, a walnut border
  bool off = abs(uDesk.w - 1.0) < 0.5 && max(abs(q.x) - 0.95, abs(q.y) - 0.5) > 0.0;
  vec3 a = (off ? vec3(0.22, 0.115, 0.06) : uDesk.rgb) * (0.65 + 0.7 * n1) * (0.82 + 0.36 * n2);
  if (uDesk.w > 1.5) a = mix(a, vec3(0.36, 0.33, 0.28), 0.3 + 0.35 * texture(uN, q * 2.1).b);
  return a;
}
vec3 shelf(vec2 p) {
  // books on shelves, soft and mostly brown, a few faded colours
  float row = floor(p.y * 3.1), fy = fract(p.y * 3.1);
  float colw = 24.0 + 9.0 * textureLod(uN, vec2(row * 0.17, 0.3), 0.0).r;
  float cell = floor(p.x * colw);
  vec4 r = textureLod(uN, vec2(cell * 0.0391, row * 0.0723 + 0.5), 0.0);
  float top = 0.58 + 0.32 * r.a / 1.0, gapb = smoothstep(0.0, 0.08, fract(p.x * colw)) * smoothstep(1.0, 0.92, fract(p.x * colw));
  vec3 c = 0.5 + 0.5 * cos(6.28 * (r.g * 3.1 + vec3(0.02, 0.33, 0.62)));
  c = mix(vec3(0.17, 0.10, 0.052), c * vec3(0.42, 0.30, 0.22), 0.06 + 0.2 * r.r * r.r) * (0.3 + 1.0 * r.b);
  c = fy < top ? c * gapb : vec3(0.008, 0.006, 0.004);
  if (fy < 0.04) c = vec3(0.075, 0.042, 0.022);
  return c;
}
vec3 roomCol(vec3 rd) {
  // each surface picks its albedo, normal and point; the light (and the window's beam) is then worked out once
  vec3 O = vec3(0.0, 0.05, 0.0);
  float dy = (-uBase.z - O.y) / rd.y;
  vec3 Qd = O + rd * dy;
  bool onDesk = rd.y < 0.0 && abs(Qd.x) < 1.25 && abs(Qd.z) < 0.68;
  vec3 b0 = vec3(-2.3, -0.75, -1.8), b1 = vec3(2.6, 1.75, 2.0);
  vec3 tm = max((b0 - O) / rd, (b1 - O) / rd);
  float t = min(tm.x, min(tm.y, tm.z));
  vec3 Q = O + rd * t;
  vec3 a = vec3(0.0), N = vec3(0.0, 1.0, 0.0), add = vec3(0.0);
  vec2 sp = vec2(0.0); float sk = 0.0;
  bool own = false;
  if (onDesk) {
    a = deskAlb(Qd.xz); Q = Qd;
  } else if (t == tm.y && rd.y > 0.0) {
    // a plain old ceiling with a slow water-stain unevenness and a darker beam
    float be = smoothstep(0.03, 0.05, abs(fract(Q.x * 0.55) - 0.5));
    a = vec3(0.36, 0.33, 0.29) * (0.8 + 0.4 * textureLod(uN, Q.xz * 0.2, 0.0).r) * (0.55 + 0.45 * be); N = vec3(0.0, -1.0, 0.0);
  } else if (t == tm.y) {
    float pl = textureLod(uN, Q.xz * vec2(0.08, 0.9), 0.0).r;
    a = vec3(0.10, 0.058, 0.034) * (0.6 + 0.8 * pl);
  } else if (t == tm.x && rd.x > 0.0) {
    // the wall behind the viewer: full shelves, the room's colour in every ball
    a = vec3(0.17, 0.15, 0.115); N = vec3(-1.0, 0.0, 0.0);
    if (Q.y > -0.25 && Q.y < 1.45 && Q.z > -1.45 && Q.z < 1.25) { sp = vec2(Q.z, Q.y); sk = 1.0; }
  } else if (t == tm.x) {
    // the wall past the far end of the row: dim shelves above, a small warm lamp and a faint second light
    a = vec3(0.055, 0.047, 0.036); N = vec3(1.0, 0.0, 0.0);
    if (Q.y < -0.25) a = vec3(0.055, 0.032, 0.018) * (0.8 + 0.4 * textureLod(uN, Q.zy * vec2(0.4, 2.0), 0.0).r);
    if (Q.y > 0.62 && Q.y < 1.36 && Q.z > -1.8 && Q.z < 0.2) { sp = vec2(Q.z * 0.9 + 5.0, Q.y); sk = 1.1; }
    vec2 gq = Q.zy - vec2(-1.40, 0.34);
    float g2 = dot(gq, gq);
    // the little lamp lights a hand of wall and the shelf edges round it, warm, gone within a hand or two
    add = uAmb.w * vec3(1.0, 0.58, 0.24) * (0.127 * exp(-g2 * 22.0) + 0.02 * exp(-g2 * 4.0) + 0.85 * (1.0 - smoothstep(0.02, 0.05, length(gq * vec2(1.0, 0.86)))));
    vec2 gp = Q.zy - vec2(-0.72, 0.12);
    add += uAmb.w * vec3(1.0, 0.72, 0.42) * 0.42 * (1.0 - smoothstep(0.022, 0.03, length(gp)));
  } else if (rd.z < 0.0) {
    // the far side wall, behind the row: a dark cabinet and a small warm lamp, all of it soft in the lens
    a = vec3(0.078, 0.056, 0.038); N = vec3(0.0, 0.0, 1.0);
    if (Q.y > 0.12 && Q.y < 1.2 && Q.x > -2.3 && Q.x < 0.75) { sp = vec2(Q.x * 0.9 + 3.0, Q.y); sk = 1.3; }
  } else {
    // the window's own wall, softly lit by the bounce off the room, with heavy curtains either side and a door beyond
    a = vec3(0.34, 0.30, 0.25);
    float cu = 0.65 + 0.35 * sin(Q.x * 19.0 + 3.0 * sin(Q.y * 2.0));
    if (abs(Q.x + 0.72) < 1.75) a = vec3(0.30, 0.15, 0.085) * cu;
    if (Q.x > 1.35 && Q.x < 2.15 && Q.y < 1.25) a = vec3(0.075, 0.052, 0.034) * (0.8 + 0.4 * textureLod(uN, Q.xy * vec2(0.7, 0.2), 0.0).g);
    float wain = smoothstep(-0.21, -0.2, -Q.y);
    a *= 0.72 + 0.28 * (1.0 - wain);
    own = true;
  }
  if (sk > 0.0) a = shelf(sp) * sk;
  return own ? a * (uAmb.rgb * 1.5 + uLc.rgb * uLc.w * 0.012) * 0.3183 : a * lit(Q, N) * 0.3183 + add;
}
`,bt=`${de}${X0}
uniform vec4 uMode; in vec2 vU; out vec4 o;
void main() {
  vec3 rd = octDec(vU);
  vec3 c = roomCol(rd);
  vec3 O = vec3(0.0, 0.05, 0.0);
  c += uLc.rgb * uLN.w * pow(max(dot(rd, uLd.xyz), 0.0), 7.0);
  // the base's sides and the desk under it are covered by the live plane test in the ball shader
  if (uMode.x > 0.5) { vec4 l = lightRad(O, rd); c = mix(c, l.rgb, l.a); }
  o = vec4(c, 1.0);
}`,mt=`${de}${Ze}
vec3 octDec(vec2 u) { vec2 f = u * 2.0 - 1.0; vec3 n = vec3(f, 1.0 - abs(f.x) - abs(f.y)); float t = max(-n.z, 0.0); n.x += n.x >= 0.0 ? -t : t; n.y += n.y >= 0.0 ? -t : t; return normalize(n).xzy; }
uniform sampler2D uEnv; uniform vec4 uMode; in vec2 vU; out vec4 o;
void main() {
  vec3 n = octDec(vU), t = normalize(abs(n.y) < 0.9 ? cross(n, vec3(0.0, 1.0, 0.0)) : cross(n, vec3(1.0, 0.0, 0.0))), b = cross(n, t);
  vec3 acc = vec3(0.0); float ws = 0.0;
  for (int i = 0; i < int(uMode.y); i++) {
    float fi = float(i) + 0.5, r = sqrt(fi / uMode.y) * uMode.x, a = fi * 2.39996;
    vec3 d = normalize(n + (t * cos(a) + b * sin(a)) * r);
    float w = 1.0 / (1.0 + 0.04 * r * r);
    acc += textureLod(uEnv, octEnc(d), 0.0).rgb * w; ws += w;
  }
  o = vec4(acc / ws, 1.0);
}`,xt=`${de}${Ze}${X0}
uniform sampler2D uEnv;
in vec2 vU; out vec4 o;
void main() {
  vec2 n = vU * 2.0 - 1.0;
  vec3 rd = normalize(uFw.xyz + (uRt.xyz * n.x + uUp.xyz * n.y) * uFw.w);
  vec3 c; float zv = 3.0;
  float t = (-uBase.z - uE.y) / rd.y;
  vec3 Q = uE.xyz + rd * t;
  if (rd.y < 0.0 && abs(Q.x) < 1.25 && abs(Q.z) < 0.68) {
    vec2 q = Q.xz; vec3 V = -rd; vec3 N = vec3(0.0, 1.0, 0.0);
    float gl = 0.5;
    vec3 alb;
    // walnut first: the walnut desk, and the desk round a leather blotter
    float w = texture(uN, vec2(q.x * 0.8, q.y * 2.3)).r, g = sin((q.y + (w - 0.5) * 0.07) * 240.0 + 4.0 * texture(uN, vec2(q.x * 2.0, q.y * 9.0)).g) * 0.5 + 0.5;
    alb = (uDesk.w < 0.5 ? uDesk.rgb : vec3(0.22, 0.115, 0.06)) * (0.55 + 0.75 * w) * (0.74 + 0.5 * g * g);
    N = normalize(N + vec3(0.0, 0.0, (texture(uN, vec2(q.x * 3.0, q.y * 60.0)).b - 0.5) * 0.05));
    vec2 eb = abs(q) - vec2(0.95, 0.5);
    float sdB = max(eb.x, eb.y);
    if (uDesk.w > 0.5 && uDesk.w < 1.5 && sdB < 0.0) {
      // the leather inlay: even colour, a fine pebble seen in the sheen, a tooled gold line and a rolled edge
      vec4 a = texture(uN, q * 19.0), b = texture(uN, q * 61.0);
      alb = uDesk.rgb * (0.84 + 0.3 * a.r) * (0.92 + 0.16 * b.g);
      N = normalize(vec3(0.0, 1.0, 0.0) + vec3(b.b - 0.5, 0.0, b.r - 0.5) * 0.14 + vec3(a.g - 0.5, 0.0, a.b - 0.5) * 0.05);
      float gold = (1.0 - smoothstep(0.0005, 0.0011, abs(sdB + 0.03))) * (0.75 + 0.25 * a.g);
      alb = mix(alb, vec3(0.50, 0.34, 0.11), gold * 0.9);
      alb *= 0.62 + 0.38 * smoothstep(0.0, 0.004, -sdB);
      gl = 0.3 + 0.6 * gold;
    } else if (uDesk.w > 1.5) {
      // a pale working bench: dust, fine scratches across the grain, plank joints, a clean ring where a mug stood
      float gap = abs(fract(q.y * 5.1 + (w - 0.5) * 0.05) - 0.5);
      alb = uDesk.rgb * (0.72 + 0.5 * w) * (0.84 + 0.32 * texture(uN, vec2(q.x * 1.2, q.y * 32.0)).g);
      alb *= 0.35 + 0.65 * smoothstep(0.0, 0.006, gap);
      float sc = texture(uN, vec2(q.x * 1.1 + q.y * 0.35, q.y * 70.0 - q.x * 2.0)).g, sc2 = texture(uN, vec2(q.x * 60.0 + q.y * 9.0, q.y * 0.9)).r;
      float scr = max(smoothstep(0.035, 0.0, abs(sc - 0.5)), smoothstep(0.03, 0.0, abs(sc2 - 0.5)) * 0.6) * smoothstep(0.3, 0.7, texture(uN, q * 3.1).r);
      float rd2 = length(q - vec2(uW1.w, uW0.w));
      float clean = 1.0 - smoothstep(0.029, 0.032, rd2);
      float dust = smoothstep(0.38, 0.72, texture(uN, q * 2.7).b + 0.25 * texture(uN, q * 37.0).g) * (1.0 - clean);
      alb = mix(alb, vec3(0.50, 0.46, 0.40), dust * 0.6);
      alb = mix(alb, vec3(0.70, 0.66, 0.58), scr * 0.55);
      alb *= 1.0 - 0.45 * exp(-pow((rd2 - 0.0305) / 0.0012, 2.0));
      gl = 0.12 + 0.2 * clean;
    }
    vec3 E = lit(Q, N);
    c = alb * E * 0.3183;
    float F = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    c += F * gl * textureLod(uEnv, octEnc(reflect(rd, N)), 0.0).rgb;
    // the base's soft contact shadow on the desk
    vec2 e = abs(Q.xz) - uBase.xy;
    float sd = length(max(e, 0.0)) + min(max(e.x, e.y), 0.0);
    c *= 0.28 + 0.72 * smoothstep(0.0, 0.05, sd - dot(uLd.xz, Q.xz) * 0.02);
    zv = dot(Q - uE.xyz, uFw.xyz);
  } else {
    c = textureLod(uEnv, octEnc(rd), 0.0).rgb;
    vec4 l = lightRad(uE.xyz, rd);
    // the candle seen straight on stands beyond the focus: a soft warm teardrop with the air round it lit, not a clipped bar
    // (the balls still mirror it at full strength)
    if (uLP.w > 1.5) {
      vec3 fc = uLP.xyz + uLY.xyz * 0.2 - uE.xyz; float fd = length(fc), ang = max(1.0 - dot(rd, fc / fd), 0.0) * fd * fd;
      l.rgb *= 0.05; c += uLc.rgb * (0.5 * exp(-ang * 1.4e4) + 0.05 * exp(-ang * 800.0));
    }
    c = mix(c, l.rgb, l.a);
  }
  o = vec4(c, zv);
}`,pt=`${de}
layout(location=0) in vec3 aP; layout(location=1) in vec3 aN; layout(location=2) in vec3 aU;
out vec3 vP; out vec3 vN; out vec3 vA;
void main() { vP = aP; vN = aN; vA = aU; gl_Position = uVP * vec4(aP, 1.0); }`,wt=`${de}${Ze}
uniform sampler2D uN; uniform sampler2D uEnv; uniform sampler2D uRough; uniform sampler2D uLT; ${Q0}
in vec3 vP; in vec3 vN; in vec3 vA; out vec4 o;
vec3 lit(vec3 Q, vec3 N) { vec3 d = uLP.xyz - Q; float dd = dot(d, d); return uLc.rgb * max(dot(N, d * inversesqrt(dd)), 0.0) * uLc.w / dd * spotK(Q) + uAmb.rgb + uBm.w * max(dot(N, uBm.xyz), 0.0) * vec3(0.95, 1.05, 1.2); }
vec3 wood(vec2 q) {
  // figure in broad soft patches, not long hairs: seen low along the row, long streaks read as motion
  float w = texture(uN, vec2(q.x * 2.6, q.y * 5.0)).r;
  float g = sin((q.y + (w - 0.5) * 0.007) * 2300.0 + 2.2 * texture(uN, vec2(q.x * 2.7, q.y * 23.0)).g) * 0.5 + 0.5;
  float fine = 0.5 + 0.45 * (texture(uN, vec2(q.x * 6.5, q.y * 170.0)).g - 0.5);
  float pore = texture(uN, vec2(q.x * 13.0, q.y * 310.0)).b;
  vec3 a = mix(uW0.rgb, uW1.rgb, clamp(0.3 + 0.75 * (w - 0.5) + 0.24 * g * g + 0.28 * (fine - 0.5), 0.0, 1.0));
  return a * (1.0 - 0.34 * smoothstep(0.6, 0.78, pore));
}
void main() {
  vec3 V = uE.xyz - vP; float d = length(V); V /= d;
  vec3 N = normalize(vN); float m = vA.z;
  float zv = dot(vP - uE.xyz, uFw.xyz);
  vec3 c;
  if (m < 0.5) {
    // chrome tube
    vec3 R = reflect(-V, N);
    float F = 0.62 + 0.3 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    vec4 l = lightRad(vP, R);
    c = F * mix(textureLod(uEnv, octEnc(R), 0.0).rgb, l.rgb * 0.3, l.a);
  } else if (m < 1.5) {
    // walnut bars: grain runs along each bar, a clear oil on top
    vec3 alb = wood(vec2(vA.x * 2.4, vA.y * 0.022 + vP.y * 0.3 + vP.x * 0.13));
    vec3 R = reflect(-V, N);
    float F = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
    c = alb * lit(vP, N) * 0.3183 + F * 0.8 * textureLod(uRough, octEnc(R), 0.0).rgb;
  } else if (m < 2.5) {
    // bent iron wire: dark, a little rust, hard highlight
    float ru = texture(uN, vec2(vA.x * 3.0, vA.y * 0.21)).r;
    vec3 R = reflect(-V, normalize(N + vec3(ru - 0.5) * 0.14));
    vec3 F0 = mix(vec3(0.44, 0.42, 0.40), vec3(0.22, 0.12, 0.07), smoothstep(0.55, 0.8, ru));
    c = F0 * textureLod(uRough, octEnc(R), 0.0).rgb + F0 * 0.5 * textureLod(uEnv, octEnc(R), 0.0).rgb;
  } else {
    // the base: dark oiled wood, its sheen a soft mirror of the room
    vec2 q = vP.xz;
    vec3 alb = wood(q);
    float pn = texture(uN, vec2(q.x * 5.5, q.y * 110.0)).g - 0.5;
    float pn2 = texture(uN, q * 37.0).g - 0.5;
    vec3 Nb = normalize(N + vec3(pn2 * 0.004, 0.0, pn * 0.012 + pn2 * 0.004));
    float F = 0.04 + 0.96 * pow(1.0 - max(dot(Nb, V), 0.0), 5.0);
    vec3 R = reflect(-V, Nb);
    vec3 refl = textureLod(uRough, octEnc(R), 0.0).rgb;
    float dust = smoothstep(0.82, 0.9, texture(uN, q * 113.0).a) * smoothstep(0.35, 0.7, texture(uN, q * 9.0).r);
    alb += vec3(0.22, 0.20, 0.17) * dust * 0.5;
    c = alb * lit(vP, Nb) * 0.3183 + F * refl * 0.8;
    // the posts' feet and the edges close off a little light
    vec2 e = uBase.xy - abs(q);
    c *= 0.82 + 0.18 * smoothstep(0.0, 0.01, min(e.x, e.y));
    if (N.y > 0.995 && vA.x > 0.5) zv = -zv;
  }
  o = vec4(c, zv);
}`,yt=`#version 300 es
precision highp float;
uniform sampler2D uC; uniform vec4 uD; uniform vec4 uG; in vec2 vU; out vec4 o;
float cocOf(float z) { return min(uD.z * abs(z - uD.w) / z, uG.x); }
void main() {
  vec4 c0 = textureLod(uC, vU, 0.0);
  float z0 = abs(c0.a), k0 = cocOf(z0);
  c0.rgb = min(c0.rgb, vec3(k0 * uG.z > 2.5 ? 2.4 : 60.0));
  vec3 acc = c0.rgb;
  float J = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) * 6.2832 * uG.w;
  int N = int(uG.y);
  float Rb = k0 > 2.5 ? min(uG.x, k0 * 1.15 + 1.5) : uG.x;
  for (int i = 0; i < N; i++) {
    float fi = float(i) + 0.5, r = sqrt(fi / uG.y) * Rb * uG.z, a = fi * 2.39996 + J;
    vec4 s = textureLod(uC, vU + vec2(cos(a), sin(a)) * r * uD.xy, 0.0);
    s.rgb = min(s.rgb, vec3(2.4));
    float zs = abs(s.a), ks = cocOf(zs) * uG.z;
    float w = zs < z0 - 0.002 ? clamp(ks - r + 1.0, 0.0, 1.0) : clamp(k0 * uG.z - r + 1.0, 0.0, 1.0);
    acc += w * s.rgb + (1.0 - w) * c0.rgb;
  }
  o = vec4(acc / (uG.y + 1.0), uG.w > 0.5 ? c0.a : (c0.a < 0.0 ? 1.0 : 0.0));
}`,Rt=`${de}${Ce}
in vec2 vU; out vec4 o;
void main() {
  vec3 Q = vec3((vU.x * 2.0 - 1.0) * uBase.x, 0.0, (vU.y * 2.0 - 1.0) * uBase.y);
  float sh = 1.0;
  int n = int(uRow.z);
  for (int i = 0; i < n; i++) {
    vec3 d = uB[i].xyz - Q; float dl = length(d); vec3 dn = d / dl;
    float ca = dot(dn, uLd.xyz), ar = uB[i].w / dl, sep = sqrt(max(1.0 - ca * ca, 0.0));
    float dir = (1.0 - smoothstep(ar - uLd.w, ar + uLd.w, sep)) * step(0.0, ca) * clamp(ar / uLd.w * 0.8, 0.0, 1.0);
    float am = ar * ar * max(dn.y, 0.0);
    sh *= (1.0 - 0.7 * dir) * (1.0 - 0.75 * am);
  }
  o = vec4(sh, sh, sh, 1.0);
}`,Et=`${de}${Ce}${Ze}
uniform sampler2D uBg; uniform sampler2D uSh; uniform sampler2D uRough; uniform sampler2D uN;
in vec2 vU; out vec4 o;
void main() {
  vec4 c = textureLod(uBg, vU, 0.0);
  vec3 col = c.rgb * uX.z;
  if (c.a > 0.5) {
    vec2 ndc = vU * 2.0 - 1.0;
    vec3 rd = normalize(uFw.xyz + (uRt.xyz * ndc.x + uUp.xyz * ndc.y) * uFw.w);
    vec3 P = uE.xyz - rd * (uE.y / rd.y);
    col *= textureLod(uSh, P.xz / (uBase.xy * 2.0) + 0.5, 0.0).r;
    vec3 Nb = vec3(0.0, 1.0, 0.0);
    vec3 R = reflect(rd, Nb);
    float best = 1e6, cov = 0.0; int hit = -1;
    int n = int(uRow.z);
    for (int i = 0; i < n; i++) {
      vec3 oc = P - uB[i].xyz; float b = dot(oc, R), cc = dot(oc, oc) - uB[i].w * uB[i].w, h = b * b - cc;
      float wd = max(-b, 0.002) * 0.2 + 0.0005;
      float e = clamp(h / (2.0 * uB[i].w) / wd + 0.5, 0.0, 1.0);
      if (e > 0.0 && -b > 0.0 && -b < best) { best = -b - sqrt(max(h, 0.0)); cov = e; hit = i; }
    }
    if (hit >= 0) {
      vec3 Q = P + R * best, N = normalize(Q - uB[hit].xyz);
      vec3 Rr = reflect(R, N);
      vec3 hc = uF0[hit].rgb * textureLod(uRough, octEnc(vec3(Rr.x, abs(Rr.y), Rr.z)), 0.0).rgb * (Rr.y < 0.0 ? 0.5 : 1.0);
      float F = 0.04 + 0.96 * pow(1.0 - max(dot(Nb, -rd), 0.0), 5.0);
      // lacquer seen this low is nearly a mirror: each ball stands on a darker image of itself that fades within its height
      col = mix(col, hc, cov * min(F * 4.0, 0.8) * exp(-best * 24.0));
    }
  }
  o = vec4(col, 1.0);
}`,At=`${de}${Ce}
layout(location=0) in vec2 aP; layout(location=1) in vec4 aC; layout(location=2) in vec2 aI;
out vec4 vC; flat out vec2 vI;
void main() {
  vC = aC; vI = aI;
  vec3 W = aC.xyz + (uRt.xyz * aP.x + uUp.xyz * aP.y) * aC.w * 1.42;
  gl_Position = uVP * vec4(W, 1.0);
  gl_Position.z = 0.0;
}`,Ft=`${de}${Ce}${Ze}
uniform sampler2D uEnv; uniform sampler2D uRough; uniform sampler2D uLT; uniform sampler2D uDet; uniform sampler2D uSh; uniform sampler2D uN; uniform sampler2D uEnvM;
in vec4 vC; flat in vec2 vI; out vec4 o;
vec3 fres(int i, float cs) { vec3 f = uF0[i].rgb; float k = pow(1.0 - clamp(cs, 0.0, 1.0), 5.0); return f + (1.0 - f) * k; }
void main() {
  vec2 ndc = gl_FragCoord.xy * uCam.y - 1.0;
  vec3 rd = normalize(uFw.xyz + (uRt.xyz * ndc.x + uUp.xyz * ndc.y) * uFw.w);
  int self = int(vI.x + 0.5);
  vec4 Ad = uA[self];
  vec3 C = vC.xyz; float r = vC.w, s = Ad.x;
  float sn = sin(Ad.w), cs = cos(Ad.w);
  vec3 up = vec3(-sn, cs, 0.0);
  // the primary hit: a sphere, squashed along the row only while a contact is being exaggerated
  vec3 sc = vec3(1.0 - s, 1.0 + 0.5 * s, 1.0 + 0.5 * s);
  vec3 oc = uE.xyz - C, ro = oc / sc, dr = rd / sc;
  float a = dot(dr, dr), b = dot(ro, dr), cc = dot(ro, ro) - r * r, h = b * b - a * cc;
  float pxw = length(oc) * uCam.x;
  float cov = clamp(h / a / (2.0 * r) / pxw + 0.5, 0.0, 1.0);
  float tb = (-b - sqrt(max(h, 0.0))) / a;
  vec3 lp = ro + dr * tb;
  vec3 n = normalize(lp / sc), P = C + lp * sc;
  // the little steel bead the threads tie to
  vec3 ec = C + up * (r + 0.0005); float er = 0.00125;
  vec3 oe = uE.xyz - ec; float be = dot(oe, rd), he = be * be - dot(oe, oe) + er * er;
  float cove = clamp(he / (2.0 * er) / pxw + 0.5, 0.0, 1.0);
  float te = -be - sqrt(max(he, 0.0));
  bool bead = false;
  if (cove > 0.0 && (cov <= 0.0 || te < tb)) { bead = true; n = normalize(uE.xyz + rd * te - ec); P = uE.xyz + rd * te; cov = max(cov, cove); }
  if (cov <= 0.002) discard;
  vec3 V = -rd;
  // detail: scratches (rg), smudge and prints (b), dust (a), in the ball's own frame so it turns with the swing
  vec3 Nn = n; float smudge = 0.0, dust = 0.0;
  if (!bead) {
    vec3 ln = vec3(cs * n.x + sn * n.y, -sn * n.x + cs * n.y, n.z);
    vec2 uv = octEnc(ln) + vec2(vI.x * 0.371 + 0.13, vI.x * 0.613 + uRow.w * 0.0);
    // the map is squeezed toward the rim: its footprint grows as the surface turns away, or the scratches hatch there
    float nv = max(dot(n, -rd), 0.06);
    float lod = max(log2(pxw / (r * 0.0058 * nv)), 0.0);
    vec4 dd = textureLod(uDet, uv, lod);
    vec3 tx = normalize(vec3(n.z, 0.0, -n.x) + vec3(1e-4)), ty = cross(n, tx);
    Nn = normalize(n + (tx * (dd.r - 0.5) + ty * (dd.g - 0.5)) * 0.045 * smoothstep(0.08, 0.35, nv));
    smudge = dd.b; dust = dd.a;
  }
  vec3 F = bead ? vec3(0.7) : fres(self, dot(n, V));
  vec3 T = F;
  // the bounces, the frame's lines and the desk's edge follow the true sphere; the scratches only stir the room and
  // the window they mirror (a scratch-bent ray broke every reflected bar into dashes and sawed the desk's horizon)
  vec3 Pr = P, R = reflect(rd, n);
  vec3 R0 = reflect(rd, Nn), Rd = R0 - R;
  // one flat loop over balls and bounces: the row of tests is restarted after each bounce, bound by a uniform
  float tbest = 1e6; int hi = -1, cur = self, k = 0, K = int(uRow.w);
  int jb = 0, nb = int(uRow.z);
  for (k = 0; k < K; k++) {
    if (jb < nb) {
      if (jb != cur) {
        vec3 oq = Pr - uB[jb].xyz; float bq = dot(oq, R), hq = bq * bq - dot(oq, oq) + uB[jb].w * uB[jb].w;
        if (hq > 0.0 && bq < 0.0) { float tq = -bq - sqrt(hq); if (tq > 0.0 && tq < tbest) { tbest = tq; hi = jb; } }
      }
      jb++;
    } else {
      if (hi < 0) break;
      Pr += R * tbest;
      vec3 Nh = normalize(Pr - uB[hi].xyz);
      T *= fres(hi, -dot(R, Nh));
      R = reflect(R, Nh);
      cur = hi; hi = -1; tbest = 1e6; jb = 0;
    }
  }
  // whatever the last ray sees: the base, the room, the light
  // the reflection's footprint per pixel, from the sphere itself (fwidth works on 2x2 quads and stair-stepped every line)
  float fw = clamp(2.0 * pxw / ((bead ? er : r) * max(dot(n, V), 0.1)), 0.0, 0.5);
  vec3 sky = vec3(0.0);
  vec3 Re = normalize(R + Rd);
  vec2 uvR = octEnc(Re);
  float pt = -Pr.y / R.y;
  vec3 Qb = Pr + R * pt;
  float kb = R.y < 0.0 ? clamp(min(uBase.x - abs(Qb.x), uBase.y - abs(Qb.z)) / max(pt * fw, 0.0016) + 0.5, 0.0, 1.0) : 0.0;
  if (kb > 0.0) {
    float sh = textureLod(uSh, Qb.xz / (uBase.xy * 2.0) + 0.5, 0.0).r;
    float g = textureLod(uN, vec2(Qb.x * 2.7, Qb.z * 23.0), max(1.6, log2(max(pt * fw * 5900.0 / max(-R.y, 0.04), 1.0)))).r;
    vec3 ld = uLP.xyz - Qb; float dd = dot(ld, ld);
    vec3 alb = uW0.rgb + (uW1.rgb - uW0.rgb) * (0.35 + 0.65 * g);
    float Fb = 0.04 + 0.96 * pow(1.0 + R.y, 5.0);
    vec3 refl = textureLod(uRough, octEnc(vec3(R.x, -R.y, R.z)), 0.0).rgb;
    sky = (alb * (uLc.rgb * max(ld.y * inversesqrt(dd), 0.0) * uLc.w / dd + uAmb.rgb + uBm.w * uBm.y * vec3(0.95, 1.05, 1.2)) * 0.3183 + refl * Fb * 0.42) * sh * kb;
  }
  if (kb < 1.0) {
    // the sharp room where a pixel sees little of it, a smaller copy where one pixel spans many books
    vec3 skyE = mix(textureLod(uEnv, uvR, 0.0).rgb, textureLod(uEnvM, uvR, 0.0).rgb, smoothstep(0.004, 0.02, fw));
    vec3 Rw = normalize(R + Rd * 0.5);
    float dn = dot(Rw, uLN.xyz);
    if (dn < -1e-4) {
      float tl = dot(uLP.xyz - Pr, uLN.xyz) / dn;
      vec3 Ql = Pr + Rw * tl - uLP.xyz;
      vec2 ql = vec2(dot(Ql, uLX.xyz) / uLX.w, dot(Ql, uLY.xyz) / uLY.w);
      ql.x -= uX.y * (ql.y + 0.6);
      if (tl > 0.0 && abs(ql.x) < 1.0 && abs(ql.y) < 1.0) { vec4 l = textureLod(uLT, ql * 0.5 + 0.5, log2(max(fw * uBase.w, 1.0))); skyE = skyE * (1.0 - l.a) + l.rgb * uX.x; }
    }
    sky += skyE * (1.0 - kb);
    // the frame, as thin curved lines on the ball: only the rail and post on the side the ray leans to can be hit
    vec2 pr = vec2(uRail.x - Pr.y, (R.z >= 0.0 ? uRail.y : -uRail.y) - Pr.z), dy2 = R.yz;
    float l2 = length(dy2); dy2 /= max(l2, 1e-4);
    float tr = dot(pr, dy2), perp = pr.x * dy2.y - pr.y * dy2.x;
    float xr = Pr.x + R.x * tr / max(l2, 1e-4);
    float eR = max(tr * fw * 0.9, 0.0006);
    float cr = (1.0 - smoothstep(uRail.z - eR, uRail.z + eR, abs(perp))) * step(0.0, tr) * step(abs(xr), uRow.x);
    vec2 pp = vec2((R.x >= 0.0 ? uRow.x : -uRow.x) - Pr.x, (R.z >= 0.0 ? uRail.y : -uRail.y) - Pr.z), dx2 = R.xz;
    float l3 = length(dx2); dx2 /= max(l3, 1e-4);
    float tp = dot(pp, dx2), pq = pp.x * dx2.y - pp.y * dx2.x;
    float yp = Pr.y + R.y * tp / max(l3, 1e-4);
    float eP = max(tp * fw * 0.9, 0.0006);
    float cp = (1.0 - smoothstep(uRail.z - eP, uRail.z + eP, abs(pq))) * step(0.0, tp) * step(yp, uRail.x) * step(0.0, yp);
    float cf = max(cr, cp);
    if (cf > 0.001) {
      vec3 fc;
      if (uRail.w < 0.5) {
        vec3 Nf;
        if (cr >= cp) { float hh = clamp(perp / uRail.z, -0.8, 0.8); vec2 m2 = -dy2 * sqrt(1.0 - hh * hh) - hh * vec2(dy2.y, -dy2.x); Nf = vec3(0.0, m2); }
        else { float hh = clamp(pq / uRail.z, -0.8, 0.8); vec2 m2 = -dx2 * sqrt(1.0 - hh * hh) - hh * vec2(dx2.y, -dx2.x); Nf = vec3(m2.x, 0.0, m2.y); }
        fc = min(textureLod(uRough, octEnc(reflect(R, Nf)), 0.0).rgb, vec3(0.9)) * 0.8;
      } else fc = uRail.w < 1.5 ? (uW1.rgb * 1.4) * (uAmb.rgb + uLc.rgb * 0.4) * 0.32 : vec3(0.012, 0.011, 0.01);
      sky += (fc - sky) * cf;
    }
  }
  // near the rim one pixel spans much of the room: let the mirror go soft there instead of speckling
  sky = mix(sky, textureLod(uRough, uvR, 0.0).rgb, smoothstep(0.06, 0.3, fw) * 0.85);
  vec3 col = T * sky;
  // a smudge is a tiny-scale roughness: part of the mirror goes to a blurred room
  vec3 hz = F * textureLod(uRough, octEnc(R0), 0.0).rgb;
  col = col + (hz - col) * smudge * 0.7;
  if (uF0[self].w > 0.5 && !bead) {
    // black glass: a little deep colour lives inside, near the far side from the light
    col += vec3(0.0022, 0.0018, 0.0034) * (1.0 + 2.0 * max(dot(n, -uLd.xyz), 0.0));
  }
  vec3 ld2 = uLP.xyz - P;
  vec3 lt = uLc.rgb * max(dot(n, ld2) * inversesqrt(dot(ld2, ld2)), 0.0) * uLc.w / dot(ld2, ld2) + uAmb.rgb;
  col += dust * 0.13 * vec3(0.8, 0.77, 0.72) * lt * (bead ? 0.0 : smoothstep(-0.1, 0.65, n.y));
  // the contact: while time is stretched, the highlight flashes where the force is
  float fl = pow(max(n.x, 0.0), 42.0) * Ad.z + pow(max(-n.x, 0.0), 42.0) * Ad.y;
  col += vec3(1.0, 0.92, 0.78) * fl * 3.5;
  float al = cov * vI.y;
  // depth for the lens and for thread occlusion
  float zv = dot(P - uE.xyz, uFw.xyz);
  gl_FragDepth = clamp(uCam.z + uCam.w / zv, 0.0, 1.0);
  o = vec4(col * al, al);
}`,Tt=`${de}${Ce}
layout(location=0) in vec2 aP; layout(location=1) in vec3 aA; layout(location=2) in vec4 aB;
out float vS; out float vW; out float vT; out float vE; out float vLen;
void main() {
  vec4 ca = uVP * vec4(aA, 1.0), cb = uVP * vec4(aB.xyz, 1.0);
  vec2 sa = ca.xy / ca.w, sb = cb.xy / cb.w;
  vec2 dr = normalize((sb - sa) * uCoc.w), nr = vec2(-dr.y, dr.x);
  float zA = ca.w, zB = max(cb.w, 0.001);
  float t = aP.x * 0.5 + 0.5;
  // interpolate in 1/w: the thread leaves the frame fast
  float z = 1.0 / (1.0 / zA * (1.0 - t) + 1.0 / zB * t);
  vec4 cc = ca + (cb - ca) * (z - zA) / (zB - zA);
  float pxR = 0.00007 / (z * uCam.x);
  float cc0 = min(uCoc.x * abs(z - uCoc.y) / z, uCoc.z * uCoc.w);
  float w = max(pxR, cc0) + 1.2;
  vS = aP.y * w; vW = w; vT = t; vE = aB.w * pxR / max(pxR, cc0 * 0.9 + 0.001); vLen = length(aB.xyz - aA);
  vec2 sp = cc.xy / cc.w + nr * aP.y * w * 2.0 / uCoc.w;
  gl_Position = vec4(sp, cc.z / cc.w, 1.0);
}`,Lt=`${de}${Ze}
uniform sampler2D uRough; uniform sampler2D uN;
in float vS; in float vW; in float vT; in float vE; in float vLen; out vec4 o;
void main() {
  float x = vS / vW;
  float cov = clamp((1.0 - abs(x)) * vW, 0.0, 1.0) * (vW > 3.0 ? (1.0 - x * x) * (1.0 - x * x) * 1.6 : 1.0);
  // a soft waxed cord: it catches the room, and its twist shows close up
  float along = vT * vLen;
  float tw = 0.86 + 0.14 * sin(along * 3100.0 + x * 2.4);
  float nw = 0.8 + 0.4 * textureLod(uN, vec2(along * 7.3, x * 0.02 + 0.3), 0.0).r;
  vec3 c = (uAmb.rgb * 0.55 + uLc.rgb * 0.02) * vec3(0.86, 0.82, 0.74) * tw * nw * (0.55 + 0.45 * sqrt(max(1.0 - x * x, 0.0)));
  c *= 1.0 + 0.8 * smoothstep(0.75, 0.0, abs(x + 0.35));
  float a = cov * min(vE, 1.0);
  o = vec4(c * a, a);
}`,O0=`
vec3 tone(vec3 c) {
  vec2 q = vU - 0.5;
  c *= uTone.x * (1.0 - dot(q, q) * uTone.z);
  c = c * (2.51 * c + 0.03) / (c * (2.43 * c + 0.59) + 0.14);
  c = pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2));
  float n = fract(52.9829189 * fract(dot(gl_FragCoord.xy + uT.x, vec2(0.06711056, 0.00583715))));
  return c + (n - 0.5) * uTone.y;
}`,zt=`${de}${Ce}
uniform sampler2D uH; uniform sampler2D uQ; in vec2 vU; out vec4 o;${O0}
void main() {
  vec3 c = textureLod(uH, vU, 0.0).rgb;
  vec2 e = uT.zw;
  vec3 g = textureLod(uQ, vU + e, 0.0).rgb + textureLod(uQ, vU - e, 0.0).rgb + textureLod(uQ, vU + vec2(e.x, -e.y), 0.0).rgb + textureLod(uQ, vU - vec2(e.x, -e.y), 0.0).rgb;
  c += max(g * 0.25 - 0.9, vec3(0.0)) * 0.11;
  o = vec4(tone(c), 1.0);
}`,Mt=`#version 300 es
layout(location=0) in vec2 aP; layout(location=1) in vec4 aR;
out vec2 vU; flat out float vK; void main() { vec2 p = aR.xy + aP * aR.z; vK = aR.w; vU = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`,Nt=`${de}${Ce}
uniform sampler2D uH; uniform sampler2D uZ; uniform sampler2D uQ; in vec2 vU; flat in float vK; out vec4 o;${O0}
float cocOf(float dp) { float z = uCam.w / min(dp - uCam.z, -1e-5); return dp > 0.9999 ? 0.0 : min(uCoc.x * abs(z - uCoc.y) / z, uCoc.z * uCoc.w); }
void main() {
  vec3 c0 = textureLod(uH, vU, 0.0).rgb;
  float d0 = textureLod(uZ, vU, 0.0).r, k0 = cocOf(d0);
  // a blurred pixel's own sample is clamped like every tap, or a bright point keeps a crisp core
  c0 = min(c0, vec3(k0 > 2.5 ? 2.5 : 60.0));
  vec3 acc = c0;
  int N = int(uT.y);
  float J = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  // a blurred pixel gathers over its own disc: taps past it would fall back to the sharp centre and leave it crisp
  float Rm = max(vK, 1.0);
  if (k0 > 2.5) Rm = min(Rm, k0 * 1.15 + 1.5);
  for (int i = 0; i < N; i++) {
    float fi = float(i) + J, r = sqrt(fi / uT.y) * Rm, a = fi * 2.39996 + J * 6.2832;
    vec2 q = vU + vec2(cos(a), sin(a)) * r / uCoc.w;
    vec3 cs = min(Rm > 4.0 ? textureLod(uQ, q, 0.0).rgb : textureLod(uH, q, 0.0).rgb, vec3(2.5));
    float ds = textureLod(uZ, q, 0.0).r;
    float ks = cocOf(ds);
    float w = ds < d0 - 1e-5 ? clamp(ks - r + 1.0, 0.0, 1.0) : clamp(k0 - r + 1.0, 0.0, 1.0);
    acc += w * cs + (1.0 - w) * c0;
  }
  o = vec4(tone(acc / (uT.y + 1.0)), 1.0);
}`,_t=`precision highp float; precision highp int; precision highp sampler2D;
vec3 nfD(vec3 e) { return e / max(1.0 - e, vec3(0.004)) * 0.5; }
vec3 nfE(vec3 v) { v = max(v, vec3(0.0)) * 2.0; return v / (1.0 + v); }
vec4 nfL(sampler2D s, vec2 u, float l) { vec4 v = textureLod(s, u, l); return vec4(nfD(v.rgb), v.a); }
float nfZE(float z, float zf) { float m = floor(clamp(zf / max(abs(z), 1e-6), 0.0, 2.0) * 63.5 + 0.5); return (z < 0.0 ? 127.0 - m : 128.0 + m) / 255.0; }
vec4 nfCd(vec4 v, float zf) { float q = floor(v.a * 255.0 + 0.5), m = q >= 128.0 ? q - 128.0 : 127.0 - q; return vec4(nfD(v.rgb), (q >= 128.0 ? 1.0 : -1.0) * zf / max(m / 63.5, 0.025)); }
#define nfC(s, u, l) nfCd(textureLod(s, u, l), uD.w)
#define NFS (uLP.w < 0.5 ? 8.0 : uLP.w < 1.5 ? 100.0 : 64.0)
#define nfLT(s, u, l) (textureLod(s, u, l) * vec4(vec3(NFS), 1.0))
`,h0="o.rgb = nfE(o.rgb);",V0="o.rgb = o.a > 0.0 ? nfE(o.rgb / o.a) * o.a : vec3(0.0);",G0="o.rgb = nfE(o.rgb); o.a = nfZE(o.a, uCoc.y);",Z0={light:"o.rgb = clamp(o.rgb / NFS, 0.0, 1.0);",env:h0,rough:h0,floor:h0,ball:V0,thread:V0,back:G0,mesh:G0,bakedof:"o.rgb = nfE(o.rgb); if (uG.w > 0.5) o.a = nfZE(o.a, uD.w);"};function gt(t,e){const c=`#version 300 es
`;if(e.indexOf(c)!==0||e.split("void main() {").length!==2)throw new Error("124 NF "+t);return e=c+_t+e.slice(c.length).replace(/textureLod\((uEnv|uEnvM|uRough|uBg|uH|uQ),/g,"nfL($1,").replace(/textureLod\(uLT,/g,"nfLT(uLT,").replace(/textureLod\(uC,/g,"nfC(uC,"),Z0[t]?e.replace("void main() {","void main0() {")+`
void main() { main0(); `+Z0[t]+" }":e}function Ut(t){const e={};e.hasFloat=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");const c=(f,u)=>{const m=t.createShader(f);return t.shaderSource(m,u+st),t.compileShader(m),m},R={light:[Be,ht],env:[Be,bt],rough:[Be,mt],back:[Be,xt],mesh:[pt,wt],bakedof:[Be,yt],shadow:[Be,Rt],floor:[Be,Et],ball:[At,Ft],thread:[Tt,Lt],comp:[Be,zt],gather:[Mt,Nt]};if(!e.hasFloat)for(const f in R)R[f]=[R[f][0],gt(f,R[f][1])];const i=[],w={};for(const f in R){const[u,m]=R[f],U=t.createProgram();w[u]||(w[u]=c(t.VERTEX_SHADER,u));const D=c(t.FRAGMENT_SHADER,m);t.attachShader(U,w[u]),t.attachShader(U,D),i.push([f,U,D,w[u]])}for(const f of i)t.linkProgram(f[1]);t.flush();{const u=new Uint8Array(262144),m=Ge("0x4e6577746f6e",77),U=[8,16,32,64],D=[.5,.27,.15,.08];for(let k=0;k<3;k++){const W=new Float32Array(65536);for(let P=0;P<4;P++){const B=U[P],Q=new Float32Array(B*B);for(let E=0;E<B*B;E++)Q[E]=m();for(let E=0;E<256;E++){const a=E/256*B,h=a|0;let r=a-h;r=r*r*(3-2*r);const s=h%B,p=(h+1)%B;for(let M=0;M<256;M++){const F=M/256*B,S=F|0;let T=F-S;T=T*T*(3-2*T);const q=S%B,O=(S+1)%B,L=Q[s*B+q],y=Q[s*B+O],v=Q[p*B+q],A=Q[p*B+O];W[E*256+M]+=D[P]*(L+(y-L)*T+(v-L)*r+(L-y-v+A)*T*r)}}}for(let P=0;P<256*256;P++)u[P*4+k]=Te((W[P]-.5)*2.2+.5,0,1)*255}for(let k=0;k<256*256;k++)u[k*4+3]=m()*255;e.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,u),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)}{const m=Ge("0x7363726174636865",5),U=new Float32Array(512*512),D=new Float32Array(512*512),k=new Float32Array(512*512),W=new Float32Array(512*512);for(let a=0;a<2200;a++){let h=m()*512,r=m()*512,s=m()*Ke,p=(m()-.5)*.008;const M=m(),F=10+m()*m()*150|0,S=(M>.975?.45:M>.75?.2:.09)*(m()<.5?-1:1);for(let T=0;T<F;T++){s+=p;const q=Math.cos(s),O=Math.sin(s);h+=q,r+=O;const L=((r|0)&511)*512+((h|0)&511),y=Math.sin(T/F*Math.PI);U[L]+=-O*S*y,D[L]+=q*S*y}}const P=16,B=new Float32Array(P*P);for(let a=0;a<P*P;a++)B[a]=m();for(let a=0;a<512;a++){const h=a/512*P,r=h|0;let s=h-r;s=s*s*(3-2*s);const p=r%P,M=(r+1)%P;for(let F=0;F<512;F++){const S=F/512*P,T=S|0;let q=S-T;q=q*q*(3-2*q);const O=T%P,L=(T+1)%P,y=B[p*P+O],v=B[p*P+L],A=B[M*P+O],_=B[M*P+L],o=y+(v-y)*q+(A-y)*s+(y-v-A+_)*q*s;k[a*512+F]=C0(.55,.85,o)*.22}}const Q=(()=>{const a=ue([.02,.42,.9]),h=Math.abs(a[0])+Math.abs(a[1])+Math.abs(a[2]),r=(a[0]/h*.5+.5+4*.371+.13)%1,s=(a[2]/h*.5+.5+4*.613)%1;return[r*512,s*512]})();for(let a=0;a<8;a++){const h=a?m()*512:Q[0],r=a?m()*512:Q[1],s=34+m()*16,p=46+m()*20,M=m()*Ke,F=Math.cos(M),S=Math.sin(M),T=m()*9,q=1+m(),O=a?.45+m()*.4:.7,L=(Math.max(s,p)|0)+1;for(let y=-L;y<=L;y++)for(let v=-L;v<=L;v++){const A=(v*F+y*S)/s,_=(-v*S+y*F)/p,o=A*A+_*_;if(o>=1)continue;const z=((r+y|0)&511)*512+((h+v|0)&511),K=Math.sqrt(A*A+(_+.25)*(_+.25)*.7)*15+.8*Math.sin(A*5*q+T)+.5*Math.sin(_*7+T*2),G=.5+.5*Math.sin(K*Ke*.85);k[z]=Math.max(k[z],O*(.3+.32*G*G)*(1-C0(.45,1,o)))}}for(let a=0;a<120;a++){const h=m()*512,r=m()*512,s=m(),p=.75+.7*s,M=.45+.55*m();for(let F=-3;F<=3;F++)for(let S=-3;S<=3;S++){const T=(h|0)+S+.5-h,q=(r|0)+F+.5-r,O=M*Math.exp(-(T*T+q*q)/(2*p*p));O>.01&&(W[((r|0)+F&511)*512+((h|0)+S&511)]+=O)}}for(let a=0;a<8;a++){let h=m()*512,r=m()*512,s=m()*Ke;const p=(m()-.5)*.3,M=10+m()*24;for(let F=0;F<M;F++)s+=p,h+=Math.cos(s),r+=Math.sin(s),W[((r|0)&511)*512+((h|0)&511)]+=.5}const E=new Uint8Array(512*512*4);for(let a=0;a<512*512;a++)E[a*4]=Te(.5+U[a],0,1)*255,E[a*4+1]=Te(.5+D[a],0,1)*255,E[a*4+2]=Te(k[a],0,1)*255,E[a*4+3]=Te(W[a],0,1)*255;e.det=t.createTexture(),t.bindTexture(t.TEXTURE_2D,e.det),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,512,512,0,t.RGBA,t.UNSIGNED_BYTE,E),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT)}e.P={};const g={uN:0,uEnv:1,uRough:2,uLT:3,uDet:4,uSh:5,uBg:6,uH:6,uC:6,uZ:7,uQ:8,uEnvM:9};for(const[f,u,m,U]of i){t.getProgramParameter(u,t.LINK_STATUS)||console.error("124 "+f+": "+t.getProgramInfoLog(u)+" "+t.getShaderInfoLog(m)+" "+t.getShaderInfoLog(U));const D={},k=t.getProgramParameter(u,t.ACTIVE_UNIFORMS);t.useProgram(u);for(let B=0;B<k;B++){const Q=t.getActiveUniform(u,B);if(Q.name.indexOf(".")>=0)continue;const E=t.getUniformLocation(u,Q.name);if(!E)continue;const a=Q.name.replace("[0]","");D[a]=E,g[a]!==void 0&&t.uniform1i(E,g[a])}const W=t.getUniformBlockIndex(u,"S"),P=t.getUniformBlockIndex(u,"D");W!==t.INVALID_INDEX&&t.uniformBlockBinding(u,W,0),P!==t.INVALID_INDEX&&t.uniformBlockBinding(u,P,1),e.P[f]={p:u,u:D}}e.tri=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.tri),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW),e.vaoTri=t.createVertexArray(),t.bindVertexArray(e.vaoTri),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),e.quad=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.quad),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW),e.inst=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.inst),t.bufferData(t.ARRAY_BUFFER,8192,t.DYNAMIC_DRAW),e.inst2=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.inst2),t.bufferData(t.ARRAY_BUFFER,8192,t.DYNAMIC_DRAW),e.inst3=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,e.inst3),t.bufferData(t.ARRAY_BUFFER,1024,t.DYNAMIC_DRAW);const C=(f,u,m)=>{const U=t.createVertexArray();t.bindVertexArray(U),t.bindBuffer(t.ARRAY_BUFFER,e.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,f);for(const[D,k,W]of u)t.enableVertexAttribArray(D),t.vertexAttribPointer(D,k,t.FLOAT,!1,m,W),t.vertexAttribDivisor(D,1);return U};return e.vaoBall=C(e.inst,[[1,4,0],[2,2,16]],24),e.vaoThread=C(e.inst2,[[1,3,0],[2,4,12]],28),e.vaoRect=C(e.inst3,[[1,4,0]],16),t.bindVertexArray(null),e.dynUbo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,e.dynUbo),t.bufferData(t.UNIFORM_BUFFER,256,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),e.sized={},e.lights={},e.rt=f=>{let u=e.sized[f];return u||(u={},u.h=Le(t,e,f,f,!0,t.LINEAR,!0),u.q2=Le(t,e,f>>1,f>>1,!1,t.LINEAR),u.q=Le(t,e,f>>2,f>>2,!1,t.LINEAR),e.sized[f]=u,u)},e.shadow=Le(t,e,192,96,!1,t.LINEAR,!1,!0),e}function Le(t,e,c,R,i,w,g,C){t.activeTexture(t.TEXTURE15);const f=t.createTexture();t.bindTexture(t.TEXTURE_2D,f);const u=g==="mip"?Math.floor(Math.log2(c))+1:1;C?t.texStorage2D(t.TEXTURE_2D,u,t.RGBA8,c,R):e.hasFloat?t.texStorage2D(t.TEXTURE_2D,u,t.RGBA16F,c,R):t.texStorage2D(t.TEXTURE_2D,u,t.SRGB8_ALPHA8,c,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,w),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,w),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const m=t.createFramebuffer();t.bindFramebuffer(t.FRAMEBUFFER,m),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,f,0);const U={t:f,f:m,w:c,h:R};if(i){const D=t.createTexture();t.bindTexture(t.TEXTURE_2D,D),t.texStorage2D(t.TEXTURE_2D,1,t.DEPTH_COMPONENT24,c,R),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,D,0),U.z=D}return t.bindFramebuffer(t.FRAMEBUFFER,null),U}function Pt(t){const e=new Float32Array(t.cap*9),c=new Uint32Array(t.cap*6);let R=0,i=0;const w=(E,a,h,r,s)=>{const p=R*9;return e[p]=E[0],e[p+1]=E[1],e[p+2]=E[2],e[p+3]=a[0],e[p+4]=a[1],e[p+5]=a[2],e[p+6]=h,e[p+7]=r,e[p+8]=s,R++},g=(E,a,h,r)=>{c[i++]=E,c[i++]=a,c[i++]=h,c[i++]=a,c[i++]=r,c[i++]=h},C=(E,a,h,r,s)=>{const p=E.length;let M=null,F=-1,S=0;for(let T=0;T<p;T++){const q=E[T>0?T-1:0],O=E[T<p-1?T+1:p-1],L=ue([O[0]-q[0],O[1]-q[1],O[2]-q[2]]);let y=ue(M?_e(_e(L,M),L):Math.abs(L[1])<.9?_e(L,[0,1,0]):_e(L,[1,0,0]));M=y;const v=_e(L,y);T&&(S+=Math.hypot(E[T][0]-E[T-1][0],E[T][1]-E[T-1][1],E[T][2]-E[T-1][2]));const A=R;for(let _=0;_<=s;_++){const o=_/s*Ke,z=Math.cos(o),K=Math.sin(o);let G=a,ze=z,ve=K;if(r===1){const V=Math.pow(Math.pow(Math.abs(z),6)+Math.pow(Math.abs(K),6),-.16666666666666666);G=a*V;const ne=Math.sign(z)*Math.pow(Math.abs(z),5),he=Math.sign(K)*Math.pow(Math.abs(K),5),be=Math.hypot(ne,he);ze=ne/be,ve=he/be}const De=[E[T][0]+(y[0]*z+v[0]*K)*G,E[T][1]+(y[1]*z+v[1]*K)*G,E[T][2]+(y[2]*z+v[2]*K)*G];w(De,[y[0]*ze+v[0]*ve,y[1]*ze+v[1]*ve,y[2]*ze+v[2]*ve],S,_/s*37+h*3.1,h)}if(T)for(let _=0;_<s;_++)g(F+_,F+_+1,A+_,A+_+1);F=A}},{X:f,H:u,w:m,rho:U,type:D,base:k,rng:W,n:P,px:B}=t;{const E=k[0],a=k[1],h=k[2],r=.009,s=.0018,p=[],M=[[E-r,a-r,0],[-E+r,a-r,1],[-E+r,-a+r,2],[E-r,-a+r,3]];for(const[L,y,v]of M)for(let A=0;A<=6;A++){const _=(v+A/6)*Math.PI/2;p.push([L+Math.cos(_)*r,y+Math.sin(_)*r,Math.cos(_),Math.sin(_)])}const F=p.length,S=[[-s,0,0,1],[-s*.3,-s*.3,.72,.72],[0,-s,1,.1],[0,-h,1,0]],T=R;for(const[L,y,v,A]of S)for(let _=0;_<=F;_++){const o=p[_%F];w([o[0]+o[2]*L,y,o[1]+o[3]*L],ue([o[2]*v,A,o[3]*v]),0,0,3)}for(let L=0;L<3;L++)for(let y=0;y<F;y++)g(T+L*(F+1)+y,T+L*(F+1)+y+1,T+(L+1)*(F+1)+y,T+(L+1)*(F+1)+y+1);const q=w([0,0,0],[0,1,0],1,0,3),O=R;for(let L=0;L<=F;L++){const y=p[L%F];w([y[0]-y[2]*s,0,y[1]-y[3]*s],[0,1,0],1,0,3)}for(let L=0;L<F;L++)c[i++]=q,c[i++]=O+L,c[i++]=O+L+1}const Q=(E,a,h,r,s,p,M)=>{for(let F=1;F<=7;F++){const S=h+(r-h)*F/7;M.push([E+Math.cos(S)*s,a+Math.sin(S)*s,p])}};for(const E of[1,-1]){const a=m*E;if(D===0){const r=[[f,-.001,a],[f,.02,a],[f,u-.016,a]];Q(f-.016,u-.016,0,Math.PI/2,.016,a,r);for(let s=1;s<12;s++)r.push([f-.016-(2*f-2*.016)*s/12,u,a]);r.push([-f+.016,u,a]),Q(-f+.016,u-.016,Math.PI/2,Math.PI,.016,a,r),r.push([-f,.02,a],[-f,-.001,a]),C(r,U,0,0,14);for(const s of[f,-f])C([[s,-5e-4,a],[s,.0016,a],[s,.0028,a],[s,.0034,a]],U*1.9,0,0,18)}else if(D===1)C([[f,-.001,a],[f,u+U,a]],U,1,1,24),C([[-f,-.001,a],[-f,u+U,a]],U,1,1,24),C([[f+U*1.2,u,a],[-f-U*1.2,u,a]],U,1,1,24);else{const h=(s,p)=>(W()-.5)*p*(.5+.5*Math.sin(s*.8)),r=[[f,-.001,a]];for(let s=1;s<=9;s++)r.push([f+h(s,.0016),u*s/10+h(s,.001),a+h(s,.0014)]);Q(f-.009,u-.009,.1,1.45,.009,a,r);for(let s=1;s<18;s++)r.push([f-.012-(2*f-.024)*s/18+h(s,.001),u+h(s+3,.0013),a+h(s,.0013)]);Q(-f+.009,u-.009,1.7,3.05,.009,a,r);for(let s=9;s>=1;s--)r.push([-f+h(s,.0016),u*s/10+h(s,.001),a+h(s,.0014)]);r.push([-f,-.001,a]),C(r,U,2,0,9)}for(let h=0;h<P;h++){const r=D===1?U+9e-4:U*1.25;C([[B[h]-.0017,u,a],[B[h]-.0013,u,a],[B[h]+.0013,u,a],[B[h]+.0017,u,a]],r,D===2?2:0,0,12)}}return{V:e.subarray(0,R*9),I:c.subarray(0,i),count:i}}q0.add({num:124,name:"Ball Cradle",fam:"Worlds",recipe:"Polished balls hanging on threads in a row. They really pass the knock along, one out and one out, until the clicks fade into the whole group swaying. How many there are changes every mint. Drag a ball out to lift it (slide along the row first to grab more), tap to catch and steady one, or hold to slow time and watch the knock pass through.",interactive:"Drag a ball out to lift it and any balls beyond it; slide along the row first to gather more. Tap to catch a ball and steady it. Hold to slow time and watch the wave pass through.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,c=t.size,R=Ge(t.hash,124);let i=I0.get(e);i||(i=Ut(e),I0.set(e,i));const w=i.P;let g=Pe(R,[["polished steel",54],["brass",26],["black glass",10],["one heavy ball",10]]),C=Pe(R,[[5,60],[7,32],[3,8]]),f=Pe(R,[["chrome",52],["walnut",34],["hand-bent wire",14]]),u=Pe(R,[["walnut",50],["leather",36],["dusty bench",14]]),m=Pe(R,[["window",54],["desk lamp",34],["candle",12]]),U=Pe(R,[["true",86],["one ball out of line",14]]);t.home&&(g="polished steel",C=5,f="chrome",u="walnut",m="window",U="true");const D=lt?ft[t.hash.slice(2,10)]:null,k=D?D.split(" "):null;k&&(g={steel:"polished steel",brass:"brass",glass:"black glass",heavy:"one heavy ball"}[k[0]],C=+k[1],f={chrome:"chrome",walnut:"walnut",wire:"hand-bent wire"}[k[2]],u={walnut:"walnut",oxblood:"leather",green:"leather",bench:"dusty bench"}[k[3]],m={window:"window",lamp:"desk lamp",candle:"candle"}[k[4]],U="true");const W=Ge(t.hash,9124),P=u==="walnut"?0:u==="leather"?1:2;let B=W()<.55;k&&P===1&&(B=k[3]==="green"),P===1&&(u=B?"green leather":"oxblood leather");const Q=[(W()-.5)*.16,.135+W()*.04];t.trait("Balls",g),t.trait("Count",String(C)),t.trait("Frame",f),t.trait("Desk",u),t.trait("Light",m),t.trait("Line",U);const E=Ge(t.hash,7124);let a=Pe(E,[["low along the row",46],["face on",24],["from above",18],["end on",8],["close on the click",4]]),h=Pe(E,[["one ball",54],["two balls",25],["both ends",14],["three balls",7]]);!t.home&&E()<.2&&(a="straight down"),t.home&&(a="low along the row",h="one ball"),k&&(a={low:"low along the row",face:"face on",above:"from above",down:"straight down",end:"end on",close:"close on the click"}[k[5]]),C===3&&h==="three balls"&&(h="two balls"),a==="close on the click"&&(h="one ball"),t.trait("Camera",a),t.trait("Release",h);const r=C,s=.0125,p=.1,M=.0205,F=M+p,S=.026,T=new Array(r).fill(s),q=new Array(r),O=new Array(r).fill(0),L=[],y=g==="black glass"?2500:g==="brass"?8500:7800,v=g==="one heavy ball"?(r>>1)+(r>3&&R()<.5?1:0):-1;for(let n=0;n<r;n++)q[n]=y*4/3*Math.PI*s*s*s;v>=0&&(T[v]=s*1.14,q[v]=3*q[v]);for(let n=0;n+1<r;n++)L.push(4e-6+R()*16e-6);const A=U!=="true"?r>3?1+(R()*(r-2)|0):1:-1;A>=0&&(O[A]=.0014*(R()<.5?-1:1));const o=ut({n:r,L:p,Lz:.07,r:T,m:q,gap:L,z0:O,Es:(g==="black glass"?7e10:g==="brass"?1e11:21e10)/(2*(1-.09)),e0:g==="brass"?.992:.997,e1:g==="brass"?.035:.025,air:.012,visc:.018,zd:1.2,dtFree:.001}),z=o.px[r-1],K=Math.max(z+.072,.116),G=f==="chrome"?0:f==="walnut"?1:2,ze=G===0?.0026:G===1?.0052:.0013,ve=[K+.024,.095,.017],De=o.px[r-1];let V=[De+.06,.0345,.09],ne=[De-.0455,.0365,-.006],he=20.5,be=[o.px[r-1],M,0];if(a==="face on"){he=14;const n=Math.max((z+s+.047)/.9,.07),d=n/Math.tan(he*Math.PI/180);V=[n*.32,.05,d],ne=[0,.031,0],be=[0,M,0]}else if(a==="from above")V=[.14,.25,.225],ne=[.004,.03,0],he=19,be=[0,M,0];else if(a==="straight down")V=[.052,.3,.08],ne=[-.004,.02,-.002],he=r>5?15:r<5?10.5:12,be=[0,M+s,0];else if(a==="end on")V=[K+.075,.07,.122],ne=[-.01,.045,-.004],he=17,be=[o.px[r-1],M,0];else if(a==="close on the click"){const n=r>>1;V=[o.px[n]+.022,M+.016,.105],ne=[o.px[n]-.004,M+.004,0],he=14,be=[o.px[n],M,s*.6]}const Ae=Math.tan(he*Math.PI/180),$=ue([ne[0]-V[0],ne[1]-V[1],ne[2]-V[2]]),ee=ue(_e($,[0,1,0])),pe=_e(ee,$),me=.012,Me=8,b0=new Float32Array([ee[0],pe[0],-$[0],0,ee[1],pe[1],-$[1],0,ee[2],pe[2],-$[2],0,-ke(ee,V),-ke(pe,V),ke($,V),1]),xe=new Float32Array(16);xe[0]=1/Ae,xe[5]=1/Ae,xe[10]=(Me+me)/(me-Me),xe[11]=-1,xe[14]=2*Me*me/(me-Me);const ce=dt(xe,b0),ge=(n,d,b)=>{const l=ce[3]*n+ce[7]*d+ce[11]*b+ce[15];return[(ce[0]*n+ce[4]*d+ce[8]*b+ce[12])/l*.5+.5,.5-(ce[1]*n+ce[5]*d+ce[9]*b+ce[13])/l*.5,l]},a0=.5+.5*(Me+me)/(Me-me),m0=-Me*me/(Me-me),We=ke([be[0]-V[0],be[1]-V[1],be[2]-V[2]],$)-s*.55,Qe=c*.027,x0=.026;let se,te,ie,Ye,He,je,r0,n0,le;const Se=[0,M,0];if(m==="window")le=0,se=[-.72,.74,1.98],Ye=[.92,.98,1.1],te=[1,0,0],ie=[0,1,0],te=[1.4,0,0],ie=[0,.86,0],He=[.118,.118,.12],je=.95,r0=1,n0=.17;else if(m==="desk lamp")le=1,se=[-.3,.34,.2],Ye=[1,.76,.48],te=ue([.55,0,-.3]),ie=ue([.15,.45,.3]),te=[te[0]*.115,te[1]*.115,te[2]*.115],ie=[ie[0]*.115,ie[1]*.115,ie[2]*.115],He=[.045,.032,.021],je=1.5,r0=.45,n0=.09;else{if(le=2,se=[-.015,.098,.235],Ye=[1,.64,.36],a!=="straight down"&&a!=="from above"){const d=a==="face on"?.62:a==="end on"?.5:a==="close on the click"?.3:.45,b=a==="face on"?-.55:-.62;se=[V[0]+$[0]*d+ee[0]*b*d*Ae,.049,V[2]+$[2]*d+ee[2]*b*d*Ae]}const n=ue([Se[0]-se[0],0,Se[2]-se[2]]);te=ue(_e([0,1,0],n)),ie=[0,1,0],te=[te[0]*.024,te[1]*.024,te[2]*.024],ie=[0,.066,0],He=[.085,.046,.024],je=1.75,r0=.16,n0=.07}le===0&&(a==="face on"||a==="close on the click")&&(je*=.78);const Xe=ue(_e(te,ie)),p0=[Se[0]-se[0],Se[1]-se[1],Se[2]-se[2]];ke(Xe,p0)<0&&(Xe[0]*=-1,Xe[1]*=-1,Xe[2]*=-1);const w0=ue([se[0]-Se[0],se[1]-Se[1],se[2]-Se[2]]),kt=ke(p0,p0),Bt=(le===0?2.3:le===1?3.6:2.6)*kt,Z=new Float32Array(128);Z.set(ce,0),Z.set([V[0],V[1],V[2],0],16),Z.set([$[0],$[1],$[2],Ae],20),Z.set([ee[0],ee[1],ee[2],0],24),Z.set([pe[0],pe[1],pe[2],0],28),Z.set([2*Ae/c,2/c,a0,m0],32),Z.set([Qe,We,x0,c],36),Z.set([se[0],se[1],se[2],le],40);const Dt=ke(te,te),St=ke(ie,ie);Z.set([te[0],te[1],te[2],Dt],44),Z.set([ie[0],ie[1],ie[2],St],48),Z.set([Xe[0],Xe[1],Xe[2],le===0?0:le===1?.07:.2],52),Z.set([w0[0],w0[1],w0[2],n0],56),Z.set([Ye[0],Ye[1],Ye[2],Bt],60),Z.set([He[0],He[1],He[2],r0],64),Z.set([ve[0],ve[1],ve[2],le===0?180:300],68),Z.set([F,S,ze,G],72);const qt=c>500?4:3;Z.set([K,M,r,(r+1)*qt],76),Z.set([.25,.135,.072,Q[0]],80),Z.set([.062,.031,.016,Q[1]],84);const y0=P===0?[.22,.115,.06]:P===1?B?[.04,.09,.058]:[.155,.043,.036]:[.36,.3,.235];Z.set([y0[0],y0[1],y0[2],P],88),Z.set([je,.018,.75,0],92);for(let n=0;n<r;n++){let d=[.66,.655,.64],b=0;g==="brass"?d=[.92,.72,.38]:g==="black glass"&&(d=[.055,.055,.058],b=1),n===v&&(d=[.42,.41,.43]),Z.set([d[0],d[1],d[2],b],96+n*4)}{const n=ue([0,.28,1]);Z.set([n[0],n[1],n[2],le===0?it:0],124)}const R0=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,R0),e.bufferData(e.UNIFORM_BUFFER,Z,e.STATIC_DRAW),e.bindBufferBase(e.UNIFORM_BUFFER,0,R0),e.bindBufferBase(e.UNIFORM_BUFFER,1,i.dynUbo);const W0=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0)},X=(n,d)=>{e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,d)};W0();const Y0=String(le);let Ue=i.lights[Y0];e.bindVertexArray(i.vaoTri),X(0,i.noise),Ue||(Ue=Le(e,i,le===0?512:256,le===0?512:256,!1,e.LINEAR,"mip"),e.bindFramebuffer(e.FRAMEBUFFER,Ue.f),e.viewport(0,0,Ue.w,Ue.h),e.useProgram(w.light.p),e.drawArrays(e.TRIANGLES,0,3),i.lights[Y0]=Ue,e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,Ue.t),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)),X(3,Ue.t);const c0=c>500?768:256,s0=Le(e,i,c0,c0,!1,e.LINEAR),i0=Le(e,i,96,96,!1,e.LINEAR);e.bindFramebuffer(e.FRAMEBUFFER,s0.f),e.viewport(0,0,c0,c0),e.useProgram(w.env.p),e.uniform4f(w.env.u.uMode,0,0,0,0),e.drawArrays(e.TRIANGLES,0,3);const E0=Le(e,i,160,160,!1,e.LINEAR);e.bindFramebuffer(e.FRAMEBUFFER,E0.f),e.viewport(0,0,160,160),e.drawArrays(e.TRIANGLES,0,3);const A0=Le(e,i,192,192,!1,e.LINEAR);e.bindFramebuffer(e.FRAMEBUFFER,A0.f),e.viewport(0,0,192,192),e.uniform4f(w.env.u.uMode,1,0,0,0),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(w.rough.p),X(1,A0.t),e.bindFramebuffer(e.FRAMEBUFFER,i0.f),e.viewport(0,0,96,96),e.uniform4f(w.rough.u.uMode,.42,48,0,0),e.drawArrays(e.TRIANGLES,0,3),X(1,s0.t),X(2,i0.t);const Ne=i.rt(c),F0=Le(e,i,c,c,!1,e.LINEAR),T0=Le(e,i,c,c,!0,e.NEAREST,!0),L0=Pt({cap:2e4,X:K,H:F,w:S,rho:ze,type:G,base:ve,rng:Ge(t.hash,811),n:r,px:o.px}),z0=e.createVertexArray(),H0=e.createBuffer(),$0=e.createBuffer();e.bindVertexArray(z0),e.bindBuffer(e.ARRAY_BUFFER,H0),e.bufferData(e.ARRAY_BUFFER,L0.V,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,$0),e.bufferData(e.ELEMENT_ARRAY_BUFFER,L0.I,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,36,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,3,e.FLOAT,!1,36,12),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,3,e.FLOAT,!1,36,24),e.bindFramebuffer(e.FRAMEBUFFER,T0.f),e.viewport(0,0,c,c),e.clear(e.DEPTH_BUFFER_BIT),e.bindVertexArray(i.vaoTri),e.useProgram(w.back.p),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.bindVertexArray(z0),e.useProgram(w.mesh.p),e.drawElements(e.TRIANGLES,L0.count,e.UNSIGNED_INT,0),e.disable(e.DEPTH_TEST),e.bindVertexArray(i.vaoTri),e.useProgram(w.bakedof.p),e.uniform4f(w.bakedof.u.uD,1/c,1/c,Qe,We);const K0=x0*c;X(6,T0.t),e.bindFramebuffer(e.FRAMEBUFFER,Ne.h.f),e.viewport(0,0,c,c),e.uniform4f(w.bakedof.u.uG,K0,56,1,1),e.drawArrays(e.TRIANGLES,0,3),X(6,Ne.h.t),e.bindFramebuffer(e.FRAMEBUFFER,F0.f),e.uniform4f(w.bakedof.u.uG,K0,16,.2,0),e.drawArrays(e.TRIANGLES,0,3),X(6,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindVertexArray(null);for(const n of[T0,A0])e.deleteFramebuffer(n.f),e.deleteTexture(n.t),n.z&&e.deleteTexture(n.z);e.deleteFramebuffer(s0.f),e.deleteFramebuffer(i0.f),e.deleteFramebuffer(E0.f),e.deleteFramebuffer(F0.f),e.deleteVertexArray(z0),e.deleteBuffer(H0),e.deleteBuffer($0);const Oe=new Float32Array(6*r*6),qe=new Float32Array(7*r*2*6),Je=new Float32Array(4*r),j=new Float32Array(64);let Fe=0,j0=-1,e0=0,J0=0,t0=0,$e=1,M0=0;const l0=new Float64Array(r),f0=new Float64Array(r),N0=new Float64Array(r),It=()=>{let n=0;for(let d=0;d<r;d++)n+=Math.abs(o.om[d]);return n};if(o.th[0]=-27*Math.PI/180,h==="two balls"||h==="three balls")for(let n=1;n<(h==="two balls"?2:3);n++)o.th[n]=o.th[0];h==="both ends"&&(o.th[r-1]=27*Math.PI/180);const x={on:!1,a:0,b:0,side:0,theta:0,target:0,t:0,dur:0,idle:!1},_0=(n,d)=>{for(let b=0;b<r;b++)o.lock[b]=b>=n&&b<=d?1:0,o.lock[b]&&(o.om[b]=0,o.vz[b]*=.2)},g0=()=>{for(let n=0;n<r;n++)o.lock[n]=0},u0=n=>{x.side<0&&x.b+1<r&&(n=Math.min(n,o.th[x.b+1])),x.side>0&&x.a>0&&(n=Math.max(n,o.th[x.a-1])),x.theta=n;for(let d=x.a;d<=x.b;d++)o.th[d]=n};let o0=15,jt=null;const I={mode:0,was:!1,t0:0,x0:0,y0:0,g:0},U0=n=>{const d=o.th[n];return[o.px[n]+p*Math.sin(d),F-p*Math.cos(d),o.z0[n]+o.z[n]]},P0=(n,d)=>{let b=1e9,l=0;for(let Y=0;Y<r;Y++){const J=U0(Y),ae=ge(J[0],J[1],J[2]),H=Math.hypot(ae[0]-n,ae[1]-d)-s/(ae[2]*Ae*2);H<b&&(b=H,l=Y)}return l},Ct=(n,d,b)=>{let l;if(n<(r-1)/2)l=-1;else if(n>(r-1)/2)l=1;else{const Y=ge(o.px[0],M,0),J=ge(o.px[r-1],M,0);l=(J[0]-Y[0])*d+(J[1]-Y[1])*b>=0?1:-1}x.on=!0,x.idle=!1,x.side=l,x.a=l<0?0:n,x.b=l<0?n:r-1,_0(x.a,x.b),u0(o.th[n]),I.g=n},Qt=(n,d)=>{const b=I.g,l=x.side;if(Math.abs(x.theta)<.14){const H=b-l;if(H>=0&&H<r){const we=U0(H),ye=ge(we[0],we[1],we[2]),re=U0(b),fe=ge(re[0],re[1],re[2]);Math.hypot(ye[0]-n,ye[1]-d)<Math.hypot(fe[0]-n,fe[1]-d)*.8&&(I.g=H,l<0?x.b=H:x.a=H,_0(x.a,x.b))}}const Y=I.g;let J=0,ae=1e9;for(let H=0;H<=22;H++){const we=l*H/22*1,ye=ge(o.px[Y]+p*Math.sin(we),F-p*Math.cos(we),0),re=Math.hypot(ye[0]-n,ye[1]-d);re<ae&&(ae=re,J=we)}x.target=J},Xt=()=>{x.on=!1,g0(),o0=Fe+15},k0=g==="brass"?[2150,3700,5600]:g==="black glass"?[4400,7100,10600]:[3200,5400,8100],Ot=G===1?170:G===0?640:410;let et=1;const d0=()=>(et=Math.imul(et,1664525)+1013904223>>>0)/4294967296,tt=(n,d,b)=>{const l=Te(Math.pow(n/.75,.75),0,1),Y=Te(o.px[d]/(z+.03),-1,1)*.55,J=b?.3:1,ae=b?3:1;t.sound.hit("click",.14+.8*l,{pan:Y}),l>.03&&t.sound.note(0,{freq:k0[0]*(.95+.1*d0())*J,dur:(.012+.06*l)*ae,vel:.05+.55*l,wave:"sine",attack:.001,pan:Y}),l>.08&&t.sound.note(0,{freq:k0[1]*(.93+.14*d0())*J,dur:(.008+.035*l)*ae,vel:.35*l,wave:"sine",attack:.001,pan:Y}),l>.2&&t.sound.note(0,{freq:k0[2]*(.9+.2*d0())*J,dur:.012*ae,vel:.2*l,wave:"triangle",attack:.001,pan:Y}),l>.12&&t.sound.note(0,{freq:Ot*(.97+.06*d0())*(b?.5:1),dur:(.03+.05*l)*ae,vel:.26*l,wave:"triangle",attack:.001,cutoff:1500,pan:Y*.4})};o.on=(n,d)=>{if(!(d<.006)){if(t0>.4){tt(d,n,!0);return}d>e0&&(e0=d,J0=n)}};const ot=()=>{j.fill(0);let n=0,d=0,b=0;for(let l=0;l<r;l++){const Y=o.th[l],J=o.px[l]+p*Math.sin(Y),ae=F-p*Math.cos(Y),H=o.z0[l]+o.z[l];j[l*4]=J,j[l*4+1]=ae,j[l*4+2]=H,j[l*4+3]=o.r[l],j[28+l*4]=N0[l],j[28+l*4+1]=l0[l],j[28+l*4+2]=f0[l],j[28+l*4+3]=Y;const we=o.lock[l]?0:o.om[l]*B0,ye=Math.abs(p*we);let re=ye<s*.05?1:Math.ceil(ye/(s*.16));re>6&&(re=6);for(let Ie=0;Ie<re;Ie++){const Ee=Y-we*(re>1?Ie/(re-1):0),Ve=o.px[l]+p*Math.sin(Ee),nt=F-p*Math.cos(Ee),ct=1/(Ie+1);Oe[n++]=Ve,Oe[n++]=nt,Oe[n++]=H,Oe[n++]=o.r[l],Oe[n++]=l,Oe[n++]=ct;const Wt=-Math.sin(Ee),Yt=Math.cos(Ee),Ht=Ve+Wt*(o.r[l]+.0015),$t=nt+Yt*(o.r[l]+.0015);for(let S0=0;S0<2;S0++)qe[d++]=Ht,qe[d++]=$t,qe[d++]=H,qe[d++]=o.px[l],qe[d++]=F,qe[d++]=S0?-S:S,qe[d++]=ct}const fe=ge(J,ae,H),D0=Qe*Math.abs(fe[2]-o.r[l]-We)/(fe[2]-o.r[l]),v0=Qe*Math.abs(fe[2]+o.r[l]-We)/(fe[2]+o.r[l]),N=Math.min(Math.max(D0,v0),x0*c),Re=o.r[l]/(fe[2]*Ae)*1.5+N*2.2/c+Math.abs(p*we)/(fe[2]*Ae);N>1&&(Je[b+0]=fe[0]*2-1,Je[b+1]=1-fe[1]*2,Je[b+2]=Re,Je[b+3]=N*1.05,b+=4)}if(M0=(M0+1.7)%97,j[56]=M0,j[57]=c>500?26:20,j[58]=6/c,j[59]=6/c,le===2){const l=Fe;j[60]=1+.16*Math.sin(l*5.3+.4)*Math.sin(l*1.37)+.08*Math.sin(l*8.9+2.1),j[61]=.07*Math.sin(l*1.13+.5)+.04*Math.sin(l*2.71+1.9)*Math.sin(l*.41),j[62]=1+.03*Math.sin(l*1.21+.2)+.02*Math.sin(l*2.93+1.3)*Math.sin(l*.53)}else j[60]=1,j[61]=0,j[62]=1;e.bindBuffer(e.UNIFORM_BUFFER,i.dynUbo),e.bufferSubData(e.UNIFORM_BUFFER,0,j),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,0,R0),e.bindBufferBase(e.UNIFORM_BUFFER,1,i.dynUbo),W0(),X(0,i.noise),X(1,s0.t),X(2,i0.t),X(3,Ue.t),X(4,i.det),X(5,i.shadow.t),X(9,E0.t),e.bindVertexArray(i.vaoTri),X(5,null),e.bindFramebuffer(e.FRAMEBUFFER,i.shadow.f),e.viewport(0,0,192,96),e.useProgram(w.shadow.p),e.drawArrays(e.TRIANGLES,0,3),X(5,i.shadow.t),X(6,F0.t),X(7,null),e.bindFramebuffer(e.FRAMEBUFFER,Ne.h.f),e.viewport(0,0,c,c),e.useProgram(w.floor.p),e.drawArrays(e.TRIANGLES,0,3),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.depthMask(!0),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.bindBuffer(e.ARRAY_BUFFER,i.inst),e.bufferData(e.ARRAY_BUFFER,Oe.subarray(0,n),e.DYNAMIC_DRAW),e.bindVertexArray(i.vaoBall),e.useProgram(w.ball.p),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,n/6),e.depthFunc(e.LEQUAL),e.depthMask(!1),e.bindBuffer(e.ARRAY_BUFFER,i.inst2),e.bufferData(e.ARRAY_BUFFER,qe.subarray(0,d),e.DYNAMIC_DRAW),e.bindVertexArray(i.vaoThread),e.useProgram(w.thread.p),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,d/7),e.disable(e.DEPTH_TEST),e.disable(e.BLEND),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,c,c),X(6,Ne.h.t),X(7,Ne.h.z),e.bindVertexArray(i.vaoTri),e.bindFramebuffer(e.READ_FRAMEBUFFER,Ne.h.f),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ne.q2.f),e.blitFramebuffer(0,0,c,c,0,0,c>>1,c>>1,e.COLOR_BUFFER_BIT,e.LINEAR),e.bindFramebuffer(e.READ_FRAMEBUFFER,Ne.q2.f),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ne.q.f),e.blitFramebuffer(0,0,c>>1,c>>1,0,0,c>>2,c>>2,e.COLOR_BUFFER_BIT,e.LINEAR),e.bindFramebuffer(e.FRAMEBUFFER,null),X(8,Ne.q.t),e.useProgram(w.comp.p),e.drawArrays(e.TRIANGLES,0,3),b&&(e.bindBuffer(e.ARRAY_BUFFER,i.inst3),e.bufferData(e.ARRAY_BUFFER,Vt(b),e.DYNAMIC_DRAW),e.bindVertexArray(i.vaoRect),e.useProgram(w.gather.p),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,b/4)),e.bindVertexArray(null),X(8,null),X(7,null),X(6,null),X(5,null)},at=new Float32Array(4*r),Vt=n=>{const d=n/4;for(let b=0;b<d;b++)for(let l=0;l<4;l++)at[b*4+l]=Je[(d-1-b)*4+l];return at.subarray(0,n)};let B0=0;const Gt=5,Zt=(n,d)=>{d>.25&&(d=.25),Fe+=d;const b=t.input,l=b.taps();if(b.down&&!I.was&&(I.mode=1,I.t0=Fe,I.x0=b.x,I.y0=b.y,$e=0,o0=Fe+15,x.idle&&(x.on=!1,g0(),x.idle=!1)),!b.down&&!I.was&&l.length){const N=P0(l[0].x,l[0].y);rt(N),$e=0}if(b.down&&I.mode===1){const N=b.x-I.x0,oe=b.y-I.y0;Math.hypot(N,oe)>.016?(I.mode=2,Ct(P0(I.x0,I.y0),N,oe)):Fe-I.t0>.24&&(I.mode=3)}if(I.mode===2&&b.down&&Qt(b.x,b.y),!b.down&&I.was&&(I.mode===1&&rt(P0(I.x0,I.y0)),I.mode===2&&Xt(),I.mode=0),I.was=b.down,x.on)if(x.idle){x.t+=d;const N=Te(x.t/x.dur,0,1),oe=N*N*(3-2*N);u0(x.from+(x.target-x.from)*oe),N>=1&&(x.on=!1,x.idle=!1,g0())}else{let N=x.target-x.theta;const oe=d*5;N>oe&&(N=oe),N<-oe&&(N=-oe),u0(x.theta+N*.75)}const Y=It()<.05&&I.mode===3;if(!x.on&&!b.down&&Fe>o0||!x.on&&Y){const N=R(),oe=r===3?N<.6?1:2:N<.5?1:N<.8?2:3,Re=R()<.6?-1:1;x.on=!0,x.idle=!0,x.side=Re,x.t=0,x.dur=.9,x.a=Re<0?0:r-oe,x.b=Re<0?oe-1:r-1,x.from=o.th[Re<0?x.b:x.a],_0(x.a,x.b),u0(x.from),x.target=Re*(.42+.2*R()),o0=Fe+17+R()*14}const J=I.mode===3?1:0;t0+=(J-t0)*Te(d*(J?5:3.5),0,1),Fe>Gt&&($e=Math.max(0,$e-d/1.4));let ae=1;if($e>0){const N=$e;ae=1/(1+59*N*N)}const H=t0>.02?o.ttc():1,we=H>.07?1/7:H<.012?1/30:1/30+(1/7-1/30)*(H-.012)/.058,ye=ae*(1+(we-1)*t0),re=ye<.3;let fe=d,D0=3500;for(;fe>1e-7&&D0-- >0;){const oe=re&&o.force>6?ye*.022:ye;let Re=fe*oe;Re>.001&&(Re=.001);const Ie=o.step(Re);if(fe-=Ie/oe,re){for(let Ee=0;Ee+1<r;Ee++)if(o.LASTF[Ee]>0){const Ve=Math.min(1,o.LASTF[Ee]/260);Ve>f0[Ee]&&(f0[Ee]=Ve),Ve>l0[Ee+1]&&(l0[Ee+1]=Ve)}}}const v0=Math.exp(-d*7);for(let N=0;N<r;N++){l0[N]*=v0,f0[N]*=v0;const oe=N?o.LASTF[N-1]:0,Re=N+1<r?o.LASTF[N]:0,Ie=re?Math.pow((oe+Re)/o.K[Math.min(N,r-2)],2/3)*1800:0;N0[N]+=(Math.min(Ie,.045)-N0[N])*Te(d*22,0,1),o.still[N]>0&&(o.still[N]-=d*28,o.still[N]<0&&(o.still[N]=0))}e0>0&&(Fe-j0>.045&&(tt(e0,J0,!1),j0=Fe),e0=0),B0=d*.3*ye,ot()};function rt(n){o.still[n]=34,n>0&&(o.still[n-1]=Math.max(o.still[n-1],14)),n+1<r&&(o.still[n+1]=Math.max(o.still[n+1],14)),o0=Fe+15}return B0=0,ot(),Zt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
