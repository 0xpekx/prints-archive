// Wind Tunnel: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/091.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ot){ot&&function(){"use strict";ot.add({num:91,name:"Wind Tunnel",fam:"Worlds",recipe:"A small smoke tunnel on a lab bench, with lines of smoke flowing round a model and rolling up into real swirls behind it as the fan speeds up. The model changes every mint. Drag up or down to set the fan, tap the model to swap it, drag it to move it or near its tip to tilt it, or hold for a thick puff of smoke.",interactive:"Drag up or down to speed the fan up or slow it down; tap the model to swap it (cylinder, airfoil, flat plate, sphere, square bar, and the bird wing or the row of rods where a mint has one; a body on the floor swaps between hump, fence and block); drag the model to move it (a body on the floor slides along it), or drag near its tip to turn it and stall the airfoil; hold for a dense puff of smoke.",music:!0,gl:!0,fps:30,seed:0,make(m){const e=m.gl,_=m.size,T=Math.PI,I=`
`,k=(t,o,a)=>t<o?o:t>a?a:t,uo=e.getExtension("EXT_color_buffer_float"),F0=!!(e.getExtension("EXT_color_buffer_half_float")||uo),fo=(m.hash||"0x0").slice(2).padEnd(64,"0"),o0=t=>parseInt(fo.slice(t*8,t*8+8),16)>>>0,vo=.5,Re=t=>{let o=t>>>0;return()=>{o=o+1831565813|0;let a=Math.imul(o^o>>>15,1|o);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},z0=Re((o0(0)^Math.imul(o0(6),739982445)^152543518)>>>0),a0=(t,o)=>{let a=0;for(const c of o)a+=c;let n=z0()*a,s=0;for(;n>=o[s]&&s<o.length-1;)n-=o[s++];return t[s]},at=["Cylinder","Airfoil","Flat plate","Sphere","Bird wing"],nt=["Glass benchtop","Old wooden","Water channel"],ge=["Smoke rake","Smoke wire","Three filaments","Ink dye","Hydrogen bubbles","Two-colour dye"],rt=["Green laser sheet","White light sheet","Cold light sheet"],st=["Small","Standard","Large"],ct=["Blackout","Night lab","Workshop lamp"],lt=["None","Tandem cylinders","Spinning cylinder","Locked street"];let E=a0(at,[32,25,18,18,7]),W0=a0(nt,[42,33,25]),f0=W0==="Water channel"?a0(ge.slice(3),[50,30,20]):a0(ge.slice(0,3),[55,28,17]),Fe=a0(rt,[35,45,20]),G0=a0(st,[30,45,25]),q0=a0(ct,[30,40,30]),v0=a0(lt,[82,6,6,6]);const mo=z0(),Te=z0(),Y0=z0();m.home&&(E="Cylinder",W0="Glass benchtop",f0="Smoke rake",Fe="White light sheet",G0="Standard",q0="Night lab",v0="None"),v0!=="None"&&(E="Cylinder");const O0=Re((o0(4)^Math.imul(o0(1),2654435761)^596878)>>>0),po=O0(),xo=O0(),ho=O0(),it=(O0()+vo)%1,Ee=!m.home&&xo<.5&&f0==="Smoke wire";!m.home&&v0==="None"&&f0!=="Three filaments"&&(E==="Cylinder"||E==="Sphere"||E==="Flat plate")&&ho<.19&&(E="Row of rods");const ut=["Hump on the floor","Fence on the floor","Block on the floor"],R=!m.home&&v0==="None"&&f0!=="Three filaments"&&(E==="Cylinder"||E==="Sphere"||E==="Flat plate")&&it<.45;R&&(E=ut[Math.min(2,Math.floor(it/.15))]),m.trait("Model",E),m.trait("Smoke",Ee?"Pulsed smoke wire":f0),m.trait("Tunnel",W0),m.trait("Light",Fe),m.trait("Model size",G0),m.trait("Room",q0),m.trait("Rare",v0);const yo=Re((o0(2)^Math.imul(o0(5),625341585)^1592590481)>>>0),ft=(t,o)=>{let a=0;for(const c of o)a+=c;let n=yo()*a,s=0;for(;n>=o[s]&&s<o.length-1;)n-=o[s++];return t[s]},vt=["Standing back","Test section","Close on the wake"],Ae=["Vortex street","Steady wake","Turbulent"];let m0=ft(vt,[30,30,40]),K0=ft(Ae,[60,28,12]);m.home?(m0="Test section",K0="Vortex street"):m0!=="Close on the wake"&&v0!=="Tandem cylinders"&&f0!=="Three filaments"&&po<(q0==="Blackout"?.55:.3)&&(m0="Through the glass");const p0=m0==="Through the glass";m.trait("View",m0),m.trait("Flow",R?["Billowing bubble","Steady bubble","Turbulent"][Ae.indexOf(K0)]:K0);const M=new Float32Array(p0?[.2148,.367,.3285]:[[.02,.2,.78],[.04,.225,.64],[.2,.28,.5]][vt.indexOf(m0)]);R&&(p0||m0==="Close on the wake")&&(M[1]=.344-.065*M[2]);const T0=[[.68,.27,.05,.3,.98],[.3,.08,.03,.18,.42],[.92,.05,.03,.85,1]][Ae.indexOf(K0)],ke=nt.indexOf(W0),d=ge.indexOf(f0),X0=rt.indexOf(Fe),H0=ct.indexOf(q0),Se=lt.indexOf(v0),E0=ke===2,A=256,z=96,L=512,bo=48,mt=22,W=.07,V=.93,n0=.37,r0=.37+.86*96/256,pt=E0?r0+.032:r0,la=.026,V0=.31,Me=.778,xt=(V0-W)/(V-W)*A,ht=(Me-n0)/(r0-n0)*z,r=[12,16,20][st.indexOf(G0)]*(R&&E!=="Fence on the floor"?1.6:1),b0=R?[0,2,4]:[0,1,2,3,4];E==="Bird wing"&&b0.push(5),E==="Row of rods"&&b0.push(6);const D=r===20?3.4:.21*r,j0=19.2;let l=E==="Row of rods"?6:R?[0,2,4][ut.indexOf(E)]:[0,1,2,3,5][at.indexOf(E)];const dt=p0?46:14,yt=p0?138:130,Le=[0,6,90,0,0,7,0].map(t=>t*T/180);let y=R?p0?64:52:70,g=R?0:48,w0=y,A0=g,G=Le[l],x0=G;const Ne=Se===1,Ue=Se===2,k0=Se===3;let bt=0,Be=0,j=0,wt=0,S,Z,q,Q;d===0?(S=17,Z=5,q=86/16,Q=!0):d===1?(S=44,Z=3.2,q=89.6/43,Q=!1):d===2?(S=3,Z=48-1.25*r+.09*r,q=1.25*r,Q=!0):d===3?(S=9,Z=8,q=10,Q=!0):d===4?(S=40,Z=3.2,q=89.6/39,Q=!1):(S=10,Z=7,q=82/9,Q=!0);const S0=S+(Q?2:0),wo=.22,Ro=1.25,go=2,N=d===4,Fo=M[2]/(V-W)*A,To=Math.min(A,(M[0]+M[2]-W)/(V-W)*A),M0=N?k(Math.round(Fo/12/.55),10,40):20,Eo=N?Math.LN2/Math.max(.1,(To-7.5)/.55/512):0,b=new Float32Array(bo*4),Rt=7.5;for(let t=0;t<S;t++){const o=Z+t*q;b[t*4]=Rt,b[t*4+1]=o,b[t*4+2]=d===5?o>48?0:1:0}const J=[[.3,1,.36],[1,.95,.86],[.84,.92,1]][X0],gt=[.62,1,.3],Ft=[1,.4,.3];let Y,$;E0?d===3?(Y=mo<.55?gt:Ft,$=Y):d===4?(Y=[.8*J[0]+.15,.8*J[1]+.15,.8*J[2]+.18],$=Y):(Y=Ft,$=gt):(Y=J,$=J);const Ao=Y.map(t=>Math.min(1.4,t*1.25));function Tt(t){return t===1?3.2*r:t===5?3.4*r:t===2?2*r:r}function Ie(t){const o=Tt(t);if(R){const a=t===2?2:.5*r;return[-a,a,0,t===2?r:.5*r]}return t===0?[-r/2,r/2+(Ne?3.6*r:0),-r/2,r/2]:t===6?[-D,D,-D,D]:t===3?[-.42*r,.42*r,-.42*r,.42*r]:t===1?[-.25*o,.75*o,-.07*o,.09*o]:t===5?[-.25*o,.75*o,-.06*o,.13*o]:t===2?[-r,r,-1.6,1.6]:[-.5*r,.5*r,-.5*r,.5*r]}const s0=(t,o)=>{const a=Math.cos(G),n=Math.sin(G);return[y+t*a+o*n,g+j-t*n+o*a]};function Z0(){if(!Q&&!N)return;let t,o;const a=Tt(l);if(R){const s=l===2?r:.5*r;t=[y-(l===2?2.5:.25*r),s+2.1],o=[y-(l===2?3.5:.5*r+2.5),1.2]}else if(l===0)t=[y-.1*r,g+j+r/2+2.1],o=[y-.1*r,g+j-r/2-2.1];else if(l===6)t=[y-.2*D,g+D+2.1],o=[y-.2*D,g-D-2.1];else if(l===3)t=[y-.1*r,g+.42*r+2.1],o=[y-.1*r,g-.42*r-2.1];else if(l===1)t=s0(-.2*a,.048*a+2.1),o=s0(-.2*a,-.036*a-2.1);else if(l===5)t=s0(-.19*a,.11*a+2),o=s0(-.2*a,-.03*a-2.1);else if(l===2){if(t=s0(-r-1.5,0),o=s0(r+1.5,0),o[1]>t[1]){const s=t;t=o,o=s}}else if(t=s0(-.2*r,.5*r+2.1),o=s0(-.2*r,-.5*r-2.1),o[1]>t[1]){const s=t;t=o,o=s}const n=S*4;b[n]=t[0]-1.2,b[n+1]=t[1],b[n+2]=d===5?0:2,b[n+3]=1,b[n+7]=1,b[n+4]=o[0]-1.2,b[n+5]=o[1],b[n+6]=d===5?1:2}Z0();const K="#version 300 es"+I+"precision highp float;"+I+"precision highp int;"+I+"precision highp usampler2D;"+I,ko=K+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Et=`
vec2 st(ivec2 q){ q = clamp(q, ivec2(0), ivec2(255, 95)); uvec2 s = texelFetch(uS, q, 0).xy; return vec2(uintBitsToFloat(s.x), uintBitsToFloat(s.y)); }
vec2 vel(vec2 p){ vec2 f = p - 0.5; vec2 fl = floor(f); ivec2 i = ivec2(fl); vec2 a = f - fl;
  return mix(mix(st(i), st(i + ivec2(1, 0)), a.x), mix(st(i + ivec2(0, 1)), st(i + ivec2(1, 1)), a.x), a.y); }`,So=K+`uniform usampler2D uS; uniform sampler2D uM;
uniform vec4 uA; uniform vec4 uB; uniform ivec4 uI;
out uvec4 o;
const ivec2 E[9] = ivec2[9](ivec2(0,0), ivec2(1,0), ivec2(0,1), ivec2(-1,0), ivec2(0,-1), ivec2(1,1), ivec2(-1,1), ivec2(-1,-1), ivec2(1,-1));
const float WT[9] = float[9](0.444444, 0.111111, 0.111111, 0.111111, 0.111111, 0.0277778, 0.0277778, 0.0277778, 0.0277778);
const int OPP[9] = int[9](0, 3, 4, 1, 2, 7, 8, 5, 6);
const int MY[9] = int[9](0, 1, 4, 3, 2, 8, 7, 6, 5);
vec2 wallU(vec2 p){ vec2 r = p - uB.xy; return vec2(-uB.z * r.y, uB.w + uB.z * r.x); }
uvec4 enc(float dr, vec2 u, vec3 P){ return uvec4(floatBitsToUint(u.x), floatBitsToUint(u.y), packHalf2x16(vec2(dr, P.x)), packHalf2x16(P.yz)); }
void main(){
  ivec2 p = ivec2(gl_FragCoord.xy);
  if (texelFetch(uM, p, 0).r > 0.5) { o = enc(0.0, wallU(vec2(p) + 0.5), vec3(0.0)); return; }
  if (p.x == 0) { o = enc(0.0, uA.xy, vec3(0.0)); return; }
  if (p.x >= uI.x - 1) { o = texelFetch(uS, p - ivec2(1, 0), 0); return; }
  uvec4 self = texelFetch(uS, p, 0);
  float rho = 0.0; vec2 j = vec2(0.0); vec3 P = vec3(0.0);
  for (int i = 0; i < uI.z; i++) {
    ivec2 e = E[i]; ivec2 q = p - e; int k = i; bool bb = false;
    if (q.y < 0 || q.y >= uI.y) { q = ivec2(p.x - e.x, p.y); k = MY[i]; }
    if (texelFetch(uM, q, 0).r > 0.5) { q = p; k = OPP[i]; bb = true; }
    uvec4 s = texelFetch(uS, q, 0);
    vec2 u = vec2(uintBitsToFloat(s.x), uintBitsToFloat(s.y));
    vec2 a = unpackHalf2x16(s.z), b = unpackHalf2x16(s.w);
    float r = 1.0 + a.x; vec3 Pn = vec3(a.y, b.x, b.y);
    float spg = max(0.0, float(q.x) - float(uI.w));
    float t0 = uA.z + spg * spg * 0.0007;
    float Q = sqrt(Pn.x * Pn.x + Pn.y * Pn.y + 2.0 * Pn.z * Pn.z);
    float tau = 0.5 * (t0 + sqrt(t0 * t0 + 25.46 * uA.w * Q / r));
    vec2 ek = vec2(E[k]);
    float eu = dot(ek, u), uu = dot(u, u);
    float f = WT[k] * (r * (1.0 + 3.0 * eu + 4.5 * eu * eu - 1.5 * uu) + (1.0 - 1.0 / tau) * 4.5 * ((ek.x * ek.x - 0.333333) * Pn.x + (ek.y * ek.y - 0.333333) * Pn.y + 2.0 * ek.x * ek.y * Pn.z));
    if (bb) f += 6.0 * WT[i] * dot(vec2(e), wallU(vec2(p) + 0.5 - 0.5 * vec2(e)));
    vec2 ef = vec2(e);
    rho += f; j += f * ef; P += f * vec3(ef.x * ef.x, ef.y * ef.y, ef.x * ef.y);
  }
  vec2 u = j / rho;
  float ul = length(u); if (ul > 0.3) u *= 0.3 / ul;
  vec3 Pn = P - rho * vec3(u.x * u.x + 0.333333, u.y * u.y + 0.333333, u.x * u.y);
  o = enc(clamp(rho - 1.0, -0.3, 0.3), u, clamp(Pn, vec3(-0.2), vec3(0.2)));
}`,Mo=K+`uniform sampler2D uM; uniform vec4 uA; uniform vec4 uB; uniform int uNV;
out uvec4 o;
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy); vec2 p = vec2(c) + 0.5;
  vec2 u = vec2(uA.x, 0.0); float D = uA.y;
  float wk = smoothstep(uA.z, uA.z + D, p.x) * exp(-pow((p.y - uA.w) / (0.8 * D), 2.0));
  u.x -= 0.3 * uA.x * wk * uB.x;
  for (int k = 0; k < uNV; k++) {
    float sg = (k - (k / 2) * 2 == 0) ? 1.0 : -1.0;
    vec2 r = p - vec2(uA.z + 1.7 * D + float(k) * uB.y * 0.5, uA.w + sg * uB.z * 0.5);
    float r2 = dot(r, r) + 0.01;
    u += (-sg * uB.w) * (1.0 - exp(-r2 / (0.16 * D * D))) / (6.2832 * r2) * vec2(-r.y, r.x);
  }
  if (texelFetch(uM, c, 0).r > 0.5) u = vec2(0.0);
  o = uvec4(floatBitsToUint(u.x), floatBitsToUint(u.y), packHalf2x16(vec2(0.0)), packHalf2x16(vec2(0.0)));
}`,Lo=K+`uniform vec4 uO; uniform vec4 uO2; uniform vec2 uRes;
out vec4 o;
float sdBox(vec2 p, vec2 b){ vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float smin(float a, float b, float k){ float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0); return mix(b, a, h) - k * h * (1.0 - h); }
float sdFoil(vec2 p, float c, float t, float m, float ser){
  float x = clamp(p.x / c, 0.0005, 1.0);
  float yt = 5.0 * t * c * (0.2969 * sqrt(x) - 0.1260 * x - 0.3516 * x * x + 0.2843 * x * x * x - 0.1036 * x * x * x * x);
  yt += ser * c * smoothstep(0.55, 1.0, x) * (0.5 - abs(fract(x * 22.0) - 0.5));
  float sl = 5.0 * t * (0.14845 / sqrt(x) - 0.1260 - 0.7032 * x + 0.8529 * x * x - 0.4144 * x * x * x);
  float yc = m * c * (x < 0.4 ? (0.8 * x - x * x) / 0.16 : (0.2 + 0.8 * x - x * x) / 0.36);
  float dy = (abs(p.y - yc) - yt) / sqrt(1.0 + sl * sl);
  float dx = max(-p.x, p.x - c);
  return dx > 0.0 ? length(vec2(dx, max(dy, 0.0))) : dy;
}
void main(){
  vec2 w = gl_FragCoord.xy / uRes * vec2(256.0, 96.0);
  float D = uO2.x; int sh = int(uO.x + 0.5);
  vec2 r = w - uO.yz; float ca = cos(uO.w), sa = sin(uO.w);
  vec2 l = vec2(r.x * ca - r.y * sa, r.x * sa + r.y * ca);
  float d, tag = 0.0;
  if (sh == 0) { d = length(r) - 0.5 * D; if (uO2.y > 0.0) d = min(d, length(r - vec2(uO2.y, -uO2.z)) - 0.5 * D); }
  else if (sh == 1) { float c = 3.2 * D; d = sdFoil(l + vec2(0.25 * c, 0.0), c, 0.12, 0.02, 0.0); tag = clamp((l.x + 0.25 * c) / c, 0.0, 1.0); }
  else if (sh == 2) { float th = max(0.06 * D, 0.9); d = sdBox(l, vec2(D, th)) - 0.35; tag = clamp(l.x / (2.0 * D) + 0.5, 0.0, 1.0);
    if (uO2.z > 0.5) d = max(d, (r.y - D + r.x + th) * 0.7071); } // a fence on the floor: its top bevelled to a sharp upstream edge
  else if (sh == 3) { d = length(r) - 0.42 * D; }
  else if (sh == 4) { d = sdBox(l, vec2(0.5 * D - 0.6)) - 0.6;
  } else if (sh == 6) { d = length(vec2(l.x, mod(l.y + 9.6, 19.2) - 9.6)) - uO2.w;
  } else {
    float c = 3.4 * D; vec2 q = l + vec2(0.25 * c, 0.0);
    float mem = sdFoil(q, c, 0.035, 0.085, 0.006);
    float lead = length((q - vec2(0.075 * c, 0.05 * c)) * vec2(0.8, 1.0)) - 0.045 * c;
    d = smin(mem, lead, 0.03 * c);
    tag = clamp(q.x / c, 0.0, 1.0);
  }
  float pxs = 256.0 / uRes.x;
  vec2 g = vec2(dFdx(d), dFdy(d));
  o = vec4(clamp(0.5 - d / pxs, 0.0, 1.0), tag, clamp(-d / (0.5 * D), 0.0, 1.0), atan(g.y, g.x + 1e-7) / 6.2832 + 0.5);
}`,No=K+`uniform sampler2D uM; uniform vec4 uL; uniform int uN;
out vec4 o;
void main(){
  vec2 p = gl_FragCoord.xy;
  vec2 dv = uL.xy - p; float len = length(dv); vec2 dir = dv / len;
  float an = atan(dir.x, dir.y);
  float fan = exp(-an * an / (uL.z * uL.z));
  float tm = (96.0 - p.y) / max(dir.y, 0.05);
  float T = 1.0;
  for (int i = 0; i < uN; i++) { vec2 q = p + dir * ((float(i) + 0.5) / float(uN) * tm); T *= 1.0 - 0.9 * texture(uM, q / vec2(256.0, 96.0)).r; }
  T = 0.32 + 0.68 * T;
  float I = fan * (0.8 + 0.2 * clamp(1.0 - len / 220.0, 0.0, 1.0));
  o = vec4(I * T, T, fan, 1.0);
}`,Uo=K+`uniform usampler2D uP; uniform usampler2D uS; uniform sampler2D uM;
uniform vec4 uE[48]; uniform vec4 uK; uniform vec4 uV; uniform ivec4 uI;
out uvec4 o;`+Et+`
uint hsh(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
void main(){
  ivec2 c = ivec2(gl_FragCoord.xy);
  int head = int(uK.x), K = int(uK.y);
  int m = c.x - head; if (m < 0) m += uI.x; m += 1;
  if (m <= K) {
    vec4 e = uE[c.y];
    vec2 ve = vel(e.xy);
    vec2 p = e.xy + ve * (max(0.0, uK.z - float(m) * uK.w) / max(uV.w, 1e-3));
    uint idx = uint(uI.w + m - 1) & 0xFFFFFFu;
    o = uvec4(floatBitsToUint(p.x), floatBitsToUint(p.y), floatBitsToUint(uK.w), idx | (uint(uI.z) << 24));
    return;
  }
  uvec4 s = texelFetch(uP, c, 0);
  float sp0 = uintBitsToFloat(s.z);
  if (!(sp0 > 0.0)) { o = s; return; }
  vec2 p = vec2(uintBitsToFloat(s.x), uintBitsToFloat(s.y));
  float h = uV.x / float(uI.y);
  vec2 v1 = vec2(0.0), vv = vec2(0.0);
  for (int i = 0; i < 2 * uI.y; i++) {
    bool md = (i - (i / 2) * 2) == 1;
    vec2 v = vel(md ? p + 0.5 * h * v1 : p);
    if (md) { p += h * v; vv = v; } else v1 = v;
  }
  if (uV.y > 0.0) {
    // unresolved small eddies: a smooth, slowly changing displacement field, strongest in the wake
    vec3 q = vec3(p / 5.0, uV.z);
    vec3 fq = floor(q), aq = q - fq; aq = aq * aq * (3.0 - 2.0 * aq);
    vec2 g = vec2(0.0);
    for (int k = 0; k < 8; k++) {
      vec3 o3 = vec3(float(k & 1), float((k >> 1) & 1), float((k >> 2) & 1));
      uvec3 iq = uvec3(ivec3(fq + o3) + 4096);
      uint r = hsh(iq.x * 73856093u ^ iq.y * 19349663u ^ iq.z * 83492791u);
      vec2 rv = vec2(float(r & 0xFFFFu), float(r >> 16)) / 65535.0 - 0.5;
      vec3 w3 = mix(1.0 - aq, aq, o3);
      g += rv * w3.x * w3.y * w3.z;
    }
    float wk = clamp((abs(vv.y) + max(0.0, uV.w - vv.x)) / max(uV.w, 1e-3), 0.0, 1.0);
    p += g * uV.y * uV.x * uV.w * 2.0 * wk;
  }
  p.y = clamp(p.y, 0.35, 95.65);
  bool dead = p.x < 0.0 || p.x > 254.5 || texture(uM, p / vec2(256.0, 96.0)).r > 0.9;
  o = uvec4(floatBitsToUint(p.x), floatBitsToUint(p.y), dead ? 0u : s.z, s.w);
}`,At=K+`uniform sampler2D uD; uniform usampler2D uS; uniform sampler2D uM;
uniform vec4 uH; uniform vec4 uR; uniform vec4 uPt; uniform vec4 uQ;
out vec4 o;`+Et+`
void main(){
  vec2 p = gl_FragCoord.xy * 0.5;
  vec2 v = vel(p);
  vec4 d = texture(uD, (p - v * uH.x) / vec2(256.0, 96.0)) * uH.y;
  float wx = exp(-pow((p.x - uR.x) / 1.5, 2.0));
  float inj = 0.0;
  if (uQ.z > 0.5) { float kk = clamp(floor((p.y - uR.y) / uR.z + 0.5), 0.0, uR.w - 1.0); float dy = p.y - (uR.y + kk * uR.z); inj += wx * exp(-dy * dy / 0.7); }
  float gp = 0.0;
  if (uQ.x > 0.5) { vec2 a = p - uPt.xy, b = p - uPt.zw; gp = exp(-dot(a, a) / 1.0) + exp(-dot(b, b) / 1.0); if (uQ.x < 1.5) inj += 1.3 * gp; }
  float kp = clamp(floor((p.y - uR.y) / uR.z + 0.5), 0.0, uR.w - 1.0); float dp = p.y - (uR.y + kp * uR.z);
  float ph = uQ.z > 0.5 ? kp * 2.4 : p.y * 0.31;
  float pf = uH.z * exp(-pow((p.x - uR.x - 1.5) / 2.2, 2.0)) * exp(-dp * dp / (uQ.z > 0.5 ? 3.2 : 30.0)) * (0.5 + 0.5 * sin(ph + uQ.w) * sin(ph * 0.37 - uQ.w * 0.63));
  if (uQ.x > 1.5) { // drawn along this frame's travel, so the steady feed lies as an unbroken sheet, not a row of beads
    vec2 sv = v * uH.x, a = p - uPt.xy, b = p - uPt.zw; float ss = max(dot(sv, sv), 1e-4);
    a -= sv * clamp(dot(a, sv) / ss, 0.0, 1.0); b -= sv * clamp(dot(b, sv) / ss, 0.0, 1.0);
    gp = (exp(-dot(a, a)) + exp(-dot(b, b))) / (1.0 + 0.56 * sqrt(ss)); }
  float a = inj * uH.w + pf + gp * max(0.0, uQ.x - 2.0); // uQ.x 2 and over: the body's own steady feed (bubbles: the second electrode), not pulsed
  if (uQ.y > 0.5) { if (p.y > 48.0) d.r += a; else d.g += a; } else d.r += a;
  if (texture(uM, p / vec2(256.0, 96.0)).r > 0.5) d = vec4(0.0);
  o = min(d, vec4(3.0));
}`,Ce=K+`uniform sampler2D uN; uniform vec2 uRes; uniform vec3 uZ; uniform int RM, TU, SK, LI;
uniform vec3 LC, KEY, AMB, CA, CB; uniform vec2 KD; uniform vec4 uW; uniform float WYT;
out vec4 o;
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float N1(vec2 p){ return texture(uN, p).r; }
float N2(vec2 p){ return texture(uN, p).g; }
float rr(vec2 p, vec4 r, float rad, float px){ vec2 c = (r.xy + r.zw) * 0.5, h = (r.zw - r.xy) * 0.5 - rad; vec2 d = abs(p - c) - h; float s = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - rad; return clamp(0.5 - s / px, 0.0, 1.0); }
float circ(vec2 p, vec2 c, float r, float px){ return clamp(0.5 - (length(p - c) - r) / px, 0.0, 1.0); }
vec4 A = vec4(0.0);
void lay(vec3 c, float a){ A.rgb = c * a + A.rgb * (1.0 - a); A.a = a + A.a * (1.0 - a); }
`,Bo=Ce+`
void main(){
  vec2 uv = uZ.xy + gl_FragCoord.xy / uRes * uZ.z; float px = 1.4 / uRes.y * uZ.z;
  vec3 c; const float BY = 0.30; float fold = 1.0;
  if (uv.y >= BY) {
    if (RM == 0) {
      // black cloth hung behind the tunnel: uneven plumb folds, narrow ridges and deep troughs
      fold = 0.15 + 0.85 * pow(0.5 + 0.5 * sin(uv.x * 78.0 + 14.0 * N1(vec2(uv.x * 0.5, 0.2))), 2.5);
      c = vec3(0.060, 0.055, 0.066) * fold * (0.6 + 0.7 * N1(uv * vec2(1.5, 0.4)));
    } else if (RM == 1) {
      c = vec3(0.046, 0.054, 0.076) * (0.75 + 0.4 * N2(uv * vec2(4.0, 3.0))) * (0.8 + 0.3 * N1(uv * vec2(0.7, 1.1)));
      vec4 wr = vec4(0.015, 0.79, 0.30, 1.05);
      float iw = rr(uv, wr, 0.003, px);
      vec2 wp = (uv - wr.xy) / (wr.zw - wr.xy);
      vec3 sky = mix(vec3(0.020, 0.034, 0.075), vec3(0.008, 0.012, 0.032), clamp(wp.y * 1.3, 0.0, 1.0));
      float sh = 0.80 + 0.035 * floor(N1(vec2(uv.x * 0.9, 0.37)) * 5.0) / 5.0 + 0.02 * step(0.7, N1(vec2(uv.x * 3.0, 0.6)));
      vec2 g = uv * vec2(260.0, 160.0); vec2 gi = floor(g); float hr = h12(gi);
      float lamp = step(0.86, hr) * smoothstep(0.45, 0.1, length(fract(g) - 0.5)) * step(uv.y, sh - 0.004);
      vec3 w = uv.y < sh ? vec3(0.005, 0.006, 0.011) + vec3(0.55, 0.36, 0.16) * lamp * (0.3 + 0.7 * h12(gi + 3.1)) : sky;
      float mul = max(1.0 - smoothstep(0.0, px * 1.5, abs(uv.x - 0.158) - 0.004), 1.0 - smoothstep(0.0, px * 1.5, abs(uv.y - 0.925) - 0.004));
      w = mix(w, vec3(0.02, 0.022, 0.028), mul);
      c = mix(c, w, iw);
      c = mix(c, vec3(0.04, 0.042, 0.048), rr(uv, vec4(0.005, 0.782, 0.31, 0.792), 0.002, px));
      // a shelf of glassware on the right
      c = mix(c, vec3(0.040, 0.036, 0.032) * (1.0 + 0.6 * smoothstep(0.877, 0.873, uv.y)), rr(uv, vec4(0.56, 0.862, 1.05, 0.877), 0.0015, px));
      for (int i = 0; i < 6; i++) {
        float fi = float(i), bx = 0.61 + fi * 0.068 + 0.012 * h12(vec2(fi, 1.0)), bh = 0.035 + 0.04 * h12(vec2(fi, 3.0)), bw = 0.010 + 0.012 * h12(vec2(fi, 7.0));
        float b = max(rr(uv, vec4(bx - bw, 0.877, bx + bw, 0.877 + bh), 0.005, px), rr(uv, vec4(bx - 0.004, 0.877 + bh - 0.004, bx + 0.004, 0.877 + bh + 0.02), 0.0015, px));
        float rim = smoothstep(0.6, 1.0, abs(uv.x - bx) / bw);
        c = mix(c, vec3(0.020, 0.026, 0.030) + vec3(0.05, 0.07, 0.08) * rim, b * 0.85);
      }
    } else {
      vec3 wall = vec3(0.040, 0.029, 0.020) * (0.85 + 0.3 * N1(uv * vec2(3.0, 6.0)));
      vec2 lp = vec2(0.80, 0.985); vec2 dq = (uv - lp) * vec2(1.0, 1.25);
      float pool = exp(-dot(dq, dq) * 7.0);
      float ipb = rr(uv, vec4(0.47, 0.74, 1.05, 1.05), 0.003, px);
      vec2 hp = fract(uv * 58.0) - 0.5; float hole = smoothstep(0.2, 0.12, length(hp * vec2(1.0, uRes.y / uRes.x)));
      wall = mix(wall, vec3(0.085, 0.060, 0.036) * (0.9 + 0.2 * N2(uv * 8.0)) * (1.0 - 0.7 * hole), ipb);
      // hanging tools on the pegboard
      float tl = 0.0;
      tl = max(tl, rr(uv, vec4(0.535, 0.80, 0.545, 0.93), 0.004, px));
      tl = max(tl, circ(uv, vec2(0.54, 0.80), 0.014, px) * (1.0 - circ(uv, vec2(0.54, 0.795), 0.007, px)));
      tl = max(tl, rr(uv, vec4(0.60, 0.79, 0.66, 0.925), 0.01, px) * (1.0 - rr(uv, vec4(0.61, 0.80, 0.65, 0.915), 0.008, px)));
      tl = max(tl, rr(uv, vec4(0.70, 0.83, 0.71, 0.94), 0.003, px));
      tl = max(tl, rr(uv, vec4(0.69, 0.80, 0.72, 0.835), 0.006, px));
      wall = mix(wall, vec3(0.02, 0.018, 0.017) + vec3(0.06, 0.05, 0.04) * smoothstep(0.5, 1.0, N1(uv * 20.0)), tl);
      c = wall * (0.5 + 2.6 * pool);
      // the lamp shade
      float shd = rr(uv, vec4(0.765, 0.975, 0.835, 1.06), 0.01, px) * step(uv.y, 0.975 + (abs(uv.x - 0.8) < 0.035 ? 0.2 : 0.0));
      float shade = clamp((uv.y - 0.968) / 0.06, 0.0, 1.0);
      float sk = clamp(1.0 - (abs(uv.x - 0.80) - (0.035 - 0.012 * (uv.y - 0.97) / 0.03)) / px, 0.0, 1.0) * step(0.968, uv.y);
      c = mix(c, vec3(0.06, 0.05, 0.04) * (0.6 + shade), sk);
      c += vec3(1.0, 0.75, 0.45) * 0.9 * rr(uv, vec4(0.772, 0.966, 0.828, 0.972), 0.003, px);
    }
    if (RM == 0) {
      // the only light in a blackout is the sheet and the smoke it lights: the fold ridges catch it, strongest just above the tunnel
      float sb = exp(-pow(max(0.0, uv.y - 0.70) / 0.26, 2.0)) * exp(-pow((uv.x - 0.45) / 0.75, 2.0)) * (0.55 + 0.45 * smoothstep(0.30, 0.36, uv.y));
      c += LC * fold * (0.19 * sb * (0.7 + 0.6 * N1(uv * vec2(2.0, 1.3))) + 0.05 * exp(-pow((uv.x - SRCU() - 0.03) / 0.035, 2.0) - pow((uv.y - 0.86) / 0.035, 2.0)));
    } else {
      float sg = exp(-pow(max(0.0, abs(uv.y - 0.53) - 0.19) / 0.17, 2.0)) * exp(-pow((uv.x - 0.45) / 0.6, 2.0));
      c += (min(c, vec3(0.06)) * 2.4 + 0.008) * LC * sg;
    }
  } else {
    float dz = (BY - uv.y) / BY;
    vec2 bp = vec2((uv.x - 0.5) / (0.8 + 0.4 * dz) + 0.5, dz);
    vec3 m; float gloss;
    if (TU == 1) {
      float g = N1(vec2(bp.x * 0.9, bp.y * 7.0)), g2 = N2(vec2(bp.x * 3.0, bp.y * 40.0));
      m = vec3(0.17, 0.10, 0.05) * (0.65 + 0.55 * g + 0.25 * g2);
      float seam = smoothstep(0.012, 0.0, abs(fract(bp.y * 3.2 + 0.3) - 0.5) - 0.488);
      m *= 1.0 - 0.5 * seam; gloss = 0.5;
    } else if (TU == 0) { m = vec3(0.07, 0.074, 0.08) * (0.85 + 0.3 * N2(bp * vec2(3.0, 2.0))); gloss = 1.0; }
    else { m = vec3(0.085, 0.09, 0.095) * (0.8 + 0.3 * N2(vec2(bp.x * 50.0, bp.y * 1.5))); gloss = 0.7; }
    vec3 key = RM == 2 ? KEY * 3.0 * exp(-pow((uv.x - 0.78) * 2.2, 2.0)) * (0.5 + dz) : KEY * (0.8 + 0.4 * dz) * (RM == 1 ? 1.0 - 0.5 * uv.x : 1.0);
    float shadow = 1.0 - 0.55 * exp(-pow((dz - 0.13) / 0.09, 2.0)) * smoothstep(0.0, 0.05, uv.x) * smoothstep(1.0, 0.95, uv.x);
    c = m * (AMB * 4.0 + key) * shadow;
    // the window's glow reflected in the bench top
    float rf = exp(-dz * 6.0) * smoothstep(WX0m(), WX0m() + 0.1, uv.x) * smoothstep(0.92, 0.8, uv.x);
    c += LC * (RM == 0 ? 0.26 * gloss + (TU == 1 ? 0.14 : 0.0) : 0.13 * gloss) * rf * (0.6 + 0.5 * N2(vec2(uv.x * 30.0, dz * 4.0))) * (0.75 + 0.25 * sin(uv.x * 37.0 + 3.0 * N1(vec2(uv.x * 2.0, 0.7))));
    c += (m + 0.02) * LC * 0.9 * exp(-dz * 2.5) * exp(-pow((uv.x - SRCU()) / 0.38, 2.0));
    // the bench's front edge
    float fe = smoothstep(0.036, 0.032, uv.y);
    c = mix(c, m * 0.35 * (AMB * 4.0 + key), fe);
    c += (AMB * 2.0 + key * 0.6) * 0.25 * exp(-pow((uv.y - 0.035) / 0.0018, 2.0));
  }
  o = vec4(c, 1.0);
}`.replace(/WX0m\(\)/g,"0.06").replace(/SRCU\(\)/g,V0.toFixed(4)),kt=Ce+`uniform vec4 uRk;
float BRU = 1.0;
vec3 mat(int which, vec2 uv, float ny){
  vec3 b;
  if (TU == 0) b = which == 0 ? vec3(0.30, 0.31, 0.33) : vec3(0.16, 0.165, 0.17);
  else if (TU == 1) { float g = N1(vec2(uv.x * 1.5, uv.y * 30.0 + N2(uv * 3.0) * 3.0)); b = (which == 0 ? vec3(0.23, 0.095, 0.04) : vec3(0.17, 0.075, 0.035)) * (0.7 + 0.6 * g); }
  else b = which == 0 ? vec3(0.09, 0.12, 0.14) : vec3(0.07, 0.085, 0.095);
  b *= BRU;
  float l = 0.55 + 0.45 * ny;
  return b * (AMB * 5.0 + KEY * 1.2 * l) + b * LC * 0.05 * l;
}
float bar(float v, float a, float b){ return clamp(((v - a) / (b - a)) * 2.0 - 1.0, -1.0, 1.0); }
void main(){
  vec2 uv = uZ.xy + gl_FragCoord.xy / uRes * uZ.z; float px = 1.4 / uRes.y * uZ.z;
  float WX0 = uW.x, WY0 = uW.y, WX1 = uW.z, WY1 = uW.w, FR = 0.026;
  float x0f = WX0 - 0.016, x1f = WX1 + 0.016, ybt = WY0 - FR, ytp = WYT + FR;
  if (TU != 1) BRU = 0.78 + 0.4 * N2(vec2(uv.x * 1.7, uv.y * 75.0)) + 0.12 * (N1(uv * vec2(9.0, 5.0)) - 0.5);
  // stand: a base beam and posts
  vec3 stl = vec3(0.07, 0.073, 0.08) * (AMB * 6.0 + KEY * 1.4) * (0.8 + 0.4 * N2(vec2(uv.x * 60.0, uv.y * 2.0)));
#ifdef T1
  lay(stl * 0.8, rr(uv, vec4(0.02, 0.252, 0.98, 0.268), 0.002, px));
  for (int i = 0; i < 4; i++) { float x = 0.05 + float(i) * 0.3; lay(stl * (0.8 + 0.4 * smoothstep(x + 0.006, x - 0.006, uv.x)), rr(uv, vec4(x - 0.007, 0.26, x + 0.007, 0.38), 0.002, px)); }
  // contraction (left) and diffuser (right)
  if (uv.x < x0f + 0.001) {
    float b = pow(smoothstep(x0f, -0.09, uv.x), 1.5);
    float top = WYT + FR + 0.13 * b, bot = WY0 - FR - 0.11 * b;
    float cov = clamp((top - uv.y) / px, 0.0, 1.0) * clamp((uv.y - bot) / px, 0.0, 1.0) * clamp((x0f - uv.x) / px + 1.0, 0.0, 1.0);
    float ny = bar(uv.y, bot, top);
    vec3 m = mat(1, uv, 0.4 + 0.6 * ny);
    m *= 1.0 - 0.35 * smoothstep(0.004, 0.0, abs(uv.y - mix(bot, top, 0.5)) - 0.0005) * 0.0;
    m += (KEY + AMB) * 0.6 * exp(-pow((top - uv.y) / 0.003, 2.0)) * 0.5;
    m *= 1.0 - 0.5 * exp(-pow((uv.y - bot) / 0.006, 2.0));
    lay(m, cov);
  }
  if (uv.x > x1f - 0.001) {
    float k = (uv.x - x1f) / 0.1;
    float top = WYT + FR + 0.035 * k, bot = WY0 - FR - 0.03 * k;
    float cov = clamp((top - uv.y) / px, 0.0, 1.0) * clamp((uv.y - bot) / px, 0.0, 1.0) * clamp((uv.x - x1f) / px + 1.0, 0.0, 1.0);
    vec3 m = mat(1, uv, 0.4 + 0.6 * bar(uv.y, bot, top));
    m += (KEY + AMB) * 0.3 * exp(-pow((top - uv.y) / 0.003, 2.0));
    lay(m, cov);
  }
  // the window: the black back wall (and the water)
  float inw = rr(uv, vec4(WX0, WY0, WX1, WYT), 0.0005, px);
  if (inw > 0.0) {
    vec2 sp = (uv - uW.xy) / (uW.zw - uW.xy);
    vec3 bk = TU == 2 ? vec3(0.004, 0.008, 0.012) : vec3(0.006, 0.006, 0.007);
    bk *= 0.8 + 0.4 * N2(uv * vec2(9.0, 5.0));
    if (TU == 2 && uv.y > WY1) bk = vec3(0.007, 0.007, 0.008) * (0.8 + 0.4 * N2(uv * 6.0));
    float ao = smoothstep(0.0, 0.02, uv.y - WY0) * smoothstep(0.0, 0.02, WYT - uv.y) * smoothstep(0.0, 0.02, uv.x - WX0) * smoothstep(0.0, 0.03, WX1 - uv.x);
    bk *= 0.5 + 0.5 * ao;
    lay(bk, inw);
    // the smoke rake: a manifold and its comb of nozzles, or a fine wire
    vec2 sm = sp * vec2(256.0, 96.0); float cpx = 256.0 / ((WX1 - WX0) * uRes.x) * 1.2 * uZ.z;
    vec3 tb = TU == 1 ? vec3(0.42, 0.30, 0.12) : vec3(0.42, 0.44, 0.47);
    vec3 tl = (AMB * 5.0 + KEY + LC * 0.25);
    if (uRk.w < 0.5) {
      float best = 1e9, ny = 0.0;
      float kk = clamp(floor((sm.y - uRk.x) / uRk.y + 0.5), 0.0, uRk.z - 1.0);
      float dy = sm.y - (uRk.x + kk * uRk.y);
      float tube = clamp(0.5 - (abs(dy) - 0.6) / cpx, 0.0, 1.0) * clamp((7.4 - sm.x) / cpx, 0.0, 1.0);
      float clr = clamp(0.5 - (abs(dy) - 1.0) / cpx, 0.0, 1.0) * clamp((3.0 - sm.x) / cpx, 0.0, 1.0);
      float man = clamp((2.0 - sm.x) / cpx, 0.0, 1.0) * clamp(0.5 - (max(uRk.x - 1.6 - sm.y, sm.y - (uRk.x + (uRk.z - 1.0) * uRk.y + 1.6))) / cpx, 0.0, 1.0);
      float t = max(max(tube, clr), man);
      float ty = clamp(dy / (clr > tube ? 1.0 : 0.6), -1.0, 1.0);
      float sh = man > 0.5 ? 0.3 + 0.9 * exp(-pow((sm.x - 1.1) / 0.45, 2.0)) : 0.22 + 0.3 * (0.5 + 0.5 * ty) + 1.2 * exp(-pow((ty - 0.4) / 0.3, 2.0));
      sh *= 1.0 - 0.8 * smoothstep(6.7, 7.3, sm.x) * (1.0 - smoothstep(0.15, 0.45, abs(dy)));
      sh *= 1.0 - 0.45 * exp(-pow((sm.x - 3.3) / 0.4, 2.0)) * (1.0 - man);
      lay(tb * tl * sh * (0.85 + 0.3 * N2(vec2(sm.x * 0.02, kk * 0.17))), t);
    } else {
      float wr = clamp(0.5 - (abs(sm.x - 7.4) - 0.22) / cpx, 0.0, 1.0);
      float gli = smoothstep(0.85, 1.0, N2(vec2(0.3, sm.y * 0.15)));
      lay(tb * tl * (0.6 + 1.5 * gli), wr * 0.9);
      lay(tb * tl * 0.7, max(rr(sm, vec4(5.6, -2.0, 9.2, 1.4), 0.4, cpx), rr(sm, vec4(5.6, 94.6, 9.2, 98.0), 0.4, cpx)));
    }
  }
  // rails, flanges and bolts
  float rb = rr(uv, vec4(WX0 - 0.002, ybt, WX1 + 0.002, WY0), 0.0008, px);
  float rt = rr(uv, vec4(WX0 - 0.002, WYT, WX1 + 0.002, ytp), 0.0008, px);
  if (rb > 0.0) {
    float ny = bar(uv.y, ybt, WY0);
    vec3 m = mat(0, uv, 0.5 + 0.5 * ny);
    if (TU == 0) m *= 1.0 - 0.55 * smoothstep(0.0015, 0.0005, abs(uv.y - (ybt + FR * 0.5)));
    float fanx = exp(-pow((uv.x - SRCU()) / 0.4, 2.0));
    m += (KEY * 0.6 + AMB * 2.0 + LC * 0.25 * fanx) * exp(-pow((WY0 - uv.y) / 0.0014, 2.0));
    m += LC * 0.035 * fanx * (0.5 + 0.5 * ny);
    lay(m, rb);
  }
  if (rt > 0.0) {
    float ny = bar(uv.y, WYT, ytp);
    vec3 m = mat(0, uv, 0.5 + 0.5 * ny);
    if (TU == 0) m *= 1.0 - 0.55 * smoothstep(0.0015, 0.0005, abs(uv.y - (WYT + FR * 0.5)));
    m += (KEY * 0.8 + AMB * 2.0) * exp(-pow((ytp - uv.y) / 0.0015, 2.0)) * 0.6;
    // the slot that lets the light sheet in
    float sl = rr(uv, vec4(SRCU() - 0.022, WYT - 0.001, SRCU() + 0.022, ytp + 0.001), 0.001, px);
    m = mix(m, vec3(0.004), sl * 0.9);
    lay(m, rt);
  }
#else
  for (int s = 0; s < 2; s++) {
    float xa = s == 0 ? x0f : WX1 - 0.002, xb = xa + 0.018;
    float fl = rr(uv, vec4(xa, ybt - 0.012, xb, ytp + 0.012), 0.002, px);
    if (fl > 0.0) {
      float nx = bar(uv.x, xa, xb);
      vec3 m = mat(0, uv + 0.3, 0.6 + 0.3 * nx);
      m += (KEY * 0.5 + AMB) * exp(-pow((uv.x - xa) / 0.0015, 2.0)) * 0.6;
      for (int k = 0; k < 6; k++) {
        vec2 bc = vec2((xa + xb) * 0.5, mix(ybt - 0.004, ytp + 0.004, float(k) / 5.0));
        float bo = circ(uv, bc, 0.0042, px);
        vec3 bcol = (TU == 1 ? vec3(0.45, 0.33, 0.14) : vec3(0.28, 0.29, 0.30)) * (AMB * 5.0 + KEY * (0.6 + 0.8 * clamp(dot(normalize(uv - bc + 1e-5), KD), 0.0, 1.0)));
        m = mix(m, bcol, bo);
        m *= 1.0 - 0.4 * circ(uv, bc + vec2(0.001, -0.0015), 0.0046, px) * (1.0 - bo);
      }
      lay(m, fl);
    }
  }
  for (int k = 0; k < 11; k++) {
    float x = mix(WX0 + 0.03, WX1 - 0.03, float(k) / 10.0);
    for (int r = 0; r < 2; r++) {
      vec2 bc = vec2(x, r == 0 ? ybt + FR * 0.5 : WYT + FR * 0.5);
      if (abs(bc.x - SRCU()) < 0.03 && r == 1) continue;
      float bo = circ(uv, bc, 0.0032, px);
      vec3 bcol = (TU == 1 ? vec3(0.45, 0.33, 0.14) : vec3(0.26, 0.27, 0.28)) * (AMB * 5.0 + KEY * (0.5 + 0.9 * clamp(dot(normalize(uv - bc + 1e-5), KD), 0.0, 1.0)));
      lay(vec3(0.0), circ(uv, bc + vec2(0.0008, -0.0012), 0.0036, px) * 0.4);
      lay(bcol, bo);
    }
  }
  // the light sheet's lamp on its bracket above the slot
  vec3 hc = LI == 0 ? vec3(0.05, 0.05, 0.055) : LI == 1 ? vec3(0.10, 0.10, 0.095) : vec3(0.07, 0.07, 0.075);
  vec3 hl = AMB * 5.0 + KEY * 1.3;
  for (int i = 0; i < 2; i++) { float x = i == 0 ? SRCU() - 0.037 : SRCU() + 0.037; lay(stl * (0.9 + 0.5 * smoothstep(x + 0.003, x - 0.003, uv.x)), rr(uv, vec4(x - 0.003, ytp - 0.002, x + 0.003, 0.80), 0.001, px)); }
  vec4 hb = LI == 1 ? vec4(SRCU() - 0.05, 0.782, SRCU() + 0.05, 0.85) : vec4(SRCU() - 0.05, 0.782, SRCU() + 0.05, 0.842);
  float hous = rr(uv, hb, LI == 1 ? 0.012 : 0.006, px);
  if (hous > 0.0) {
    float ny = bar(uv.y, hb.y, hb.w);
    vec3 m = hc * hl * (0.9 + 1.5 * ny) * (0.85 + 0.3 * N2(uv * vec2(40.0, 6.0))) + hl * 0.05 * exp(-pow((ny - 0.45) / 0.3, 2.0));
    m *= 1.0 - 0.55 * step(0.5, fract(uv.y * 210.0)) * step(abs(uv.x - (SRCU() + 0.027)), 0.013) * step(0.2, ny) * step(ny, 0.75);
    if (LI == 0) m *= 0.75 + 0.25 * step(0.5, fract(uv.x * 260.0));
    if (LI == 2) m += vec3(0.25, 0.26, 0.27) * hl * rr(uv, vec4(SRCU() - 0.035, 0.79, SRCU() + 0.035, 0.83), 0.02, px) * (0.4 + 0.6 * ny);
    m += hl * 0.25 * exp(-pow((hb.w - uv.y) / 0.002, 2.0));
    lay(m, hous);
  }
  lay(hc * hl * 0.6, rr(uv, vec4(SRCU() - 0.018, SRCV(), SRCU() + 0.018, hb.y + 0.002), 0.002, px));
  lay(LC * 0.6, rr(uv, vec4(SRCU() - 0.014, SRCV() - 0.0015, SRCU() + 0.014, SRCV() + 0.001), 0.0008, px));
  if (LI == 0) lay(vec3(0.2, 1.0, 0.3), circ(uv, vec2(SRCU() + 0.04, 0.832), 0.0022, px));
  // its power cable sagging away to the right
  { float x = uv.x; float y = 0.81 - 0.07 * sin(clamp((x - SRCU() - 0.05) / 0.6, 0.0, 1.0) * 3.1416) * 0.6 - 0.02 * (x - SRCU() - 0.05);
    float cb = clamp(0.5 - (abs(uv.y - y) - 0.0025) / px, 0.0, 1.0) * step(SRCU() + 0.05, x);
    lay(vec3(0.01) + KEY * 0.08 * smoothstep(0.0025, -0.0025, uv.y - y - 0.001), cb); }
#endif
  o = A;
}`.replace(/SRCV\(\)/g,Me.toFixed(4)).replace(/SRCU\(\)/g,V0.toFixed(4)),Io=Ce+`
vec2 qb(vec2 a, vec2 b, vec2 c, float t){ return mix(mix(a, b, t), mix(b, c, t), t); }
float hose(vec2 uv, vec2 a, vec2 b, vec2 c, float r, float px, out float nrm){
  float best = 1e9; vec2 bp = a; vec2 pr = a;
  for (int i = 1; i <= 16; i++) { vec2 q = qb(a, b, c, float(i) / 16.0); vec2 pa = uv - pr, ba = q - pr; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); vec2 d = pa - ba * h; float l = length(d); if (l < best) { best = l; bp = normalize(vec2(-ba.y, ba.x)); nrm = dot(d, bp) / r; } pr = q; }
  return clamp(0.5 - (best - r) / px, 0.0, 1.0);
}
void main(){
  vec2 uv = uZ.xy + gl_FragCoord.xy / uRes * uZ.z; float px = 1.4 / uRes.y * uZ.z;
  vec3 kl = AMB * 5.0 + KEY * 1.2;
  // what feeds the rake comes up from the bench: a smoke hose, the bubble wire's two leads, or dye tubes
  int n = (SK == 4 || SK == 5) ? 2 : 1;
  for (int i = 0; i < n; i++) {
    float fi = float(i), nr = 0.0;
    float hs = hose(uv, vec2(0.15 - 0.035 * fi, 0.12), vec2(0.16 - 0.03 * fi, 0.31), vec2(0.045 + 0.008 * fi, 0.33), SK < 3 ? 0.0065 : 0.0028, px, nr);
    vec3 hc = SK < 3 ? vec3(0.07) : SK == 4 ? (i == 0 ? vec3(0.5, 0.06, 0.05) : vec3(0.07)) : (i == 0 ? CA : CB) * 0.5 + 0.03;
    lay(hc * kl * (0.3 + 0.7 * (1.0 - abs(nr))) + KEY * (SK < 3 ? 0.25 : 0.08) * smoothstep(0.3, 0.8, -nr), hs);
  }
  o = A;
}`,St=K+`uniform sampler2D uBG, uDy, uMk, uIl, uN, uLt;
uniform vec4 uC[9]; uniform vec2 uRes; uniform vec3 uZ; uniform int TU, SK, LI, RM; uniform vec3 KEY, AMB; uniform vec2 KD;
out vec4 o;
void main(){
  vec2 suv = gl_FragCoord.xy / uRes;
  vec3 col = texture(uBG, suv).rgb;
  vec2 uv = uZ.xy + suv * uZ.z;
  float t = uC[0].x, L = uC[0].y, spd = uC[0].z, rot = uC[0].w;
  vec2 oc = uC[1].xy; float D = uC[1].z; int sh = int(uC[1].w + 0.5);
  vec3 lc = uC[2].rgb; vec3 cA = uC[3].rgb, cB = uC[4].rgb; float pfg = uC[3].w;
  vec4 wr = uC[5]; vec2 src = uC[6].xy; float knob = uC[6].z; float wyt = uC[6].w;
  vec4 ex = uC[7];
  vec2 sp = (uv - wr.xy) / (wr.zw - wr.xy); vec2 sim = sp * vec2(256.0, 96.0);
  float px = 1.0 / uRes.y * uZ.z;
  // the sheet seen in the room's haze above the tunnel
  vec2 su = vec2(`+V0.toFixed(4)+", "+Me.toFixed(4)+`);
  if (uv.y > wyt + 0.026 && uv.y < su.y) {
    vec2 d = uv - su; float an = atan(d.x, -d.y);
    float fan = exp(-an * an / 0.5) * smoothstep(0.0, 0.02, su.y - uv.y);
    float hz = 0.5 + 0.7 * texture(uN, uv * vec2(2.0, 1.2) + vec2(t * 0.004, 0.0)).r;
    col += lc * L * fan * hz * (LI == 0 ? 0.06 : 0.025);
  }
  // the slot glow where the sheet enters
  col += lc * L * 0.9 * exp(-pow((uv.x - su.x) / 0.016, 2.0) - pow((uv.y - (wyt + 0.013)) / 0.008, 2.0)) * 0.35;
  if (sp.x > 0.0 && sp.x < 1.0 && sp.y > 0.0 && sp.y < 1.0) {
    vec4 il = texture(uIl, sp); float I = il.r * L;
    vec2 e = vec2(1.7 / 256.0, 1.7 / 96.0);
    vec2 dy = textureLod(uDy, sp, 0.0).rg * 0.8 + (textureLod(uDy, sp + e, 0.0).rg + textureLod(uDy, sp - e, 0.0).rg + textureLod(uDy, sp + vec2(e.x, -e.y), 0.0).rg + textureLod(uDy, sp + vec2(-e.x, e.y), 0.0).rg) * 0.07;
    // wisps: the smoke is never even at the small scale
    dy *= 0.72 + 0.56 * textureLod(uN, sim * vec2(0.011, 0.017) + vec2(-t * 0.013 * (0.5 + spd), t * 0.002), 0.0).r;
    vec3 sm = (TU == 2 ? dy.r * cA + dy.g * cB : lc * (dy.r + dy.g)) * I + textureLod(uLt, vec2(suv.x, sp.y), 0.0).rgb;
    col += 1.0 - exp(-sm * 1.25);
    float grain = 0.75 + 0.5 * texture(uN, sp * vec2(5.0, 2.0) + vec2(-t * 0.02, 0.0)).g;
    col += lc * I * (TU == 2 ? 0.022 : 0.010) * grain;
    // where the sheet lands on the tunnel floor
    col += lc * I * 0.55 * exp(-sim.y * 1.2) * (0.8 + 0.2 * texture(uN, vec2(sim.x * 0.02, 0.5)).b);
    // the model
    vec4 mk = texture(uMk, sp);
    if (mk.r > 0.002) {
      float an = (mk.a - 0.5) * 6.2832; vec2 n = vec2(cos(an), sin(an));
      if (sh == 6) n = normalize(vec2(sim.x - oc.x, mod(sim.y - oc.y + 9.6, 19.2) - 9.6) + 1e-4); // round rods: the filtered angle wraps on their left
      vec2 toS = normalize(src - sim);
      float lit = max(0.0, dot(n, toS));
      float Io = texture(uIl, (sim + n * 2.5) / vec2(256.0, 96.0)).r * L;
      float dep = mk.b;
      float hq = uC[8].x; // 1: a big body seen close (the collar quieter, the mark a short scribe at the rim), 2: no pivot (a body on the floor)
      bool fb = hq > 1.5 && (sh == 2 || sh == 4); // a fence or a block on the floor: matt dark anodised metal, sharp machined edges, no bevel
      float rim = Io * pow(lit, 0.6) * (exp(-dep * 16.0) + 0.1 * exp(-dep * 3.5));
      if (fb) { // lit from the water over its top, the same across the face (no mitres where the mask's normal turns); the block's
        // rim held to its top edge, the fence's to its sharp top
        float ty = sh == 2 ? D : 0.5 * D; Io = texture(uIl, vec2(sim.x, ty + 2.5) / vec2(256.0, 96.0)).r * L;
        rim = 0.45 * Io * (sh == 4 ? pow(max(0.0, toS.y), 0.6) * exp(-(ty - sim.y) * 3.5) : pow(lit, 0.6) * smoothstep(0.3, 0.6, n.y) * exp(-dep * 30.0)); // the fence: on its top only
      }
      vec3 base = fb ? vec3(0.17, 0.17, 0.18) : TU == 0 ? vec3(0.36, 0.37, 0.39) : TU == 1 ? vec3(0.40, 0.28, 0.12) : vec3(0.62, 0.62, 0.60);
      vec3 kl = AMB * 5.0 + KEY * 1.3;
      vec3 oc3;
      vec2 q = (sim - oc) / D;
      if (sh == 6) q = vec2(sim.x - oc.x, mod(sim.y - oc.y + 9.6, 19.2) - 9.6) / (2.0 * ex.w);
      if (sh == 3) {
        vec2 qs = q / 0.42; float z = sqrt(max(0.0, 1.0 - dot(qs, qs)));
        vec3 n3 = normalize(vec3(qs, z + 0.02));
        vec3 kd = normalize(vec3(KD, 0.8));
        float df = max(0.0, dot(n3, kd));
        float spc = pow(max(0.0, dot(reflect(vec3(0.0, 0.0, -1.0), n3), kd)), 40.0);
        oc3 = base * (AMB * 4.0 + KEY * 1.4 * df) + KEY * 1.2 * spc + base * lc * Io * 0.25 * max(0.0, dot(n3.xy, toS));
        oc3 += lc * rim * 1.2;
      } else {
        float br = 0.72 + 0.3 * texture(uN, vec2(sim.x * 0.004 + sim.y * 0.15, 0.3)).g + 0.14 * (textureLod(uN, sim * 0.035, 0.0).r - 0.5);
        if (sh == 0) br *= 0.93 + 0.07 * sin(length(q) * 150.0);
        oc3 = base * kl * 0.5 * br * (0.8 + 0.4 * smoothstep(-0.6, 0.6, dot(q, KD)));
        float bev = exp(-dep * 14.0);
        if (fb) oc3 = oc3 * 0.6 * (0.85 + 0.15 * clamp(q.y / (sh == 2 ? 1.0 : 0.5), 0.0, 1.0)) + base * lc * Io * 0.5; // darker toward the foot; the face lit faintly by the lit water beside it
        else oc3 += base * kl * 0.9 * bev * max(0.0, dot(n, KD));
        if (sh == 5) {
          float bar = 0.5 + 0.5 * sin(mk.g * 160.0 + q.y * 12.0);
          oc3 = mix(vec3(0.30, 0.22, 0.14), vec3(0.12, 0.10, 0.09), smoothstep(0.1, 0.7, mk.g)) * kl * (0.6 + 0.4 * bar) * (0.7 + 0.6 * bev);
        }
        if (sh == 1) oc3 *= 0.85 + 0.15 * smoothstep(0.02, 0.0, abs(mk.g - 0.3));
        // the pivot pin, with a scribed mark that turns with the model
        vec2 pv = (sim - oc);
        if (sh == 0 && ex.x > 0.0) pv = sim - oc - vec2(0.0, ex.y);
        float pr = length(pv) / D;
        if (sh != 6 && hq < 1.5) {
          // the pivot: a collar with a socket screw, its slot turning with the model
          float col1 = smoothstep(0.125, 0.112, pr) * (hq > 0.5 ? 0.6 : 1.0);
          vec2 pn = normalize(pv + 1e-4);
          vec3 brass = (TU == 1 ? vec3(0.50, 0.36, 0.15) : vec3(0.46, 0.47, 0.50)) * kl;
          oc3 *= 1.0 - (hq > 0.5 ? 0.3 : 0.5) * exp(-pow((pr - 0.135) / 0.02, 2.0));
          oc3 = mix(oc3, brass * (0.45 + 0.9 * max(0.0, dot(pn, KD)) * smoothstep(0.06, 0.12, pr)), col1);
          float ra = sh == 0 ? rot : -ex.z; vec2 md = vec2(cos(ra), sin(ra));
          float pe = abs(pv.x * md.y - pv.y * md.x) / D;
          oc3 = mix(oc3, brass * 0.12, smoothstep(0.075, 0.065, pr) * (0.45 + 0.55 * smoothstep(0.02, 0.012, pe)) * (hq > 0.5 ? 0.6 : 1.0));
          oc3 += kl * (hq > 0.5 ? 0.3 : 0.5) * exp(-pow((pr - 0.07) / 0.008, 2.0)) * max(0.0, dot(pn, -KD));
          if (sh == 0) { float al = dot(pv, md) / D; oc3 *= 1.0 - 0.5 * smoothstep(0.02, 0.01, pe) * (hq > 0.5 ? step(0.40, al) * step(al, 0.49) : step(0.16, al) * step(al, 0.44)); }
        }
      }
      oc3 += lc * rim * 1.9;
      col = mix(col, oc3, mk.r);
    }
    // the water: its tint in the sheet, drifting motes, the surface line
    if (TU == 2) {
      col += vec3(0.003, 0.010, 0.014) * (0.4 + 1.2 * I);
      float mt = texture(uN, sp * vec2(2.2, 0.9) + vec2(-t * 0.012 * (0.4 + spd), 0.0)).b;
      col += lc * I * 0.35 * smoothstep(0.993, 1.0, mt);
      col += lc * L * 0.22 * exp(-pow((96.0 - sim.y) / 0.5, 2.0)) * il.b;
    }
    // the front glass: a faint reflection band and lit dust
    // the front glass: the room in it, wipe smears, the pane's edge, and dust that the sheet picks out
    float gd = sp.x * 0.8 + sp.y * 0.5;
    float band = smoothstep(0.15, 0.23, gd) * smoothstep(0.47, 0.33, gd) + 0.6 * smoothstep(0.62, 0.66, gd) * smoothstep(0.74, 0.69, gd);
    float smr = textureLod(uN, vec2(sp.x * 1.3 + sp.y * 0.4, sp.y * 0.5 - sp.x * 0.25), 0.0).r;
    float sm2 = textureLod(uN, sp * vec2(3.1, 1.2) + 0.37, 0.0).g;
    col += (KEY * 0.1 + AMB * 0.4) * (band * (0.3 + 0.55 * smr) + 0.3 * smoothstep(0.5, 0.85, smr * sm2 * 2.0));
    float de = min(min(sim.x, 256.0 - sim.x), min(sim.y, 96.0 - sim.y));
    col += (KEY * 0.22 + lc * I * 0.1) * exp(-pow(de / 0.5, 2.0));
    float ds = texture(uN, uv * uRes / 256.0 * 0.5).b;
    float dcl = textureLod(uN, sp * vec2(2.0, 0.8) + 0.11, 0.0).r;
    col += (lc * I * 0.3 + KEY * 0.07) * smoothstep(0.994 - 0.022 * dcl, 1.0, ds);
  }
  vec2 q = suv - vec2(0.5, 0.52); col *= 1.0 - 0.28 * dot(q, q);
  col += (texture(uN, gl_FragCoord.xy / 256.0 + vec2(fract(t * 7.13), fract(t * 3.71))).b - 0.5) * 0.010;
  o = vec4(col, 1.0);
}`,Co=K+`uniform usampler2D uP; uniform sampler2D uIl;
uniform vec4 uE[48]; uniform vec4 uLn[5]; uniform vec3 uCol[3]; uniform vec3 uZ;
out vec3 vC; out vec4 vG;
float hn(uint x){ x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return float(x & 0xFFFFu) / 65535.0; }
void main(){
  int NP = int(uLn[0].y); int id = gl_InstanceID; int l = id / NP; int j = id - l * NP;
  bool tl = uLn[3].z > 0.5; // a time line: this instant on line l joined to the same instant on line l + 1
  int j2 = j + 1; if (j2 >= NP) j2 = 0;
  int l2 = l; if (tl) { j2 = j; l2 = l + 1; }
  uvec4 a = texelFetch(uP, ivec2(j, l), 0), b = texelFetch(uP, ivec2(j2, l2), 0);
  float sa = uintBitsToFloat(a.z), sb = uintBitsToFloat(b.z);
  vec2 pa = vec2(uintBitsToFloat(a.x), uintBitsToFloat(a.y)), pb = vec2(uintBitsToFloat(b.x), uintBitsToFloat(b.y));
  float len = length(pb - pa);
  bool bad = j == int(uLn[0].x) || !(sa > 0.0) || !(sb > 0.0) || len > uLn[3].w;
  uint ia = a.w & 0xFFFFFFu, pu = uint(uLn[4].y + 0.5), ip = ia - (ia / pu) * pu;
  if (tl) bad = l2 >= int(uLn[3].z) || !(sa > 0.0) || !(sb > 0.0) || len > uLn[3].w || ip != 0u; // torn where it is drawn out
  else if (uLn[3].x > 0.5) { if (ip > uint(uLn[4].z + 0.5)) bad = true; }
  if (bad) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); vC = vec3(0.0); vG = vec4(0.0); return; }
  vec4 wr = uLn[1]; float S = uLn[2].x;
  float k = (wr.z - wr.x) / 256.0 / uZ.z * S;
  vec2 off = vec2((wr.x - uZ.x) / uZ.z * S, 0.0);
  vec2 A = off + pa * k, B = off + pb * k;
  vec2 dS = B - A; float lS = length(dS); vec2 dir = lS > 1e-4 ? dS / lS : vec2(1.0, 0.0); vec2 nr = vec2(-dir.y, dir.x);
  int m = int(uLn[0].x) - j; if (m < 0) m += NP;
  float age = float(m) / float(NP);
  float pf = float(a.w >> 24) / 255.0;
  float r = (tl ? uLn[2].w : sa) / max(len, 1e-3);
  // the generator never feeds evenly: the smoke's density wanders along each streak, and travels with it
  float u = float(ia) / (uE[l].w > 0.5 ? 420.0 : 31.0) + float(l) * 7.31; float fu = floor(u), fr = u - fu; fr = fr * fr * (3.0 - 2.0 * fr);
  float dn = mix(hn(uint(fu)), hn(uint(fu) + 1u), fr);
  // a ribbon of smoke: it spreads with age, fattens where the flow gathers it and thins where it is drawn out
  float grow = 1.0 + uLn[3].y * age + 1.3 * pf;
  float gth = pow(clamp(r, 1.0, 6.0), 0.5);
  float c = max(uLn[0].w, uLn[0].z * grow * gth * (0.85 + 0.3 * dn));
  float hw = 2.4 * c;
  int v = gl_VertexID; float al = float(v & 1); float sd = v < 2 ? -1.0 : 1.0;
  float along = al * lS + (al * 2.0 - 1.0) * hw;
  vec2 P = A + dir * along + nr * sd * hw;
  gl_Position = vec4(P.x / S * 2.0 - 1.0, P.y / uLn[2].z * 2.0 - 1.0, 0.0, 1.0);
  float I = texture(uIl, (pa + pb) * 0.5 / vec2(256.0, 96.0)).r;
  float amp = pow(clamp(r, 0.03, 1.0), 0.8) * (0.5 + 0.85 * dn) * (1.0 + 0.5 * pf) / (sqrt(grow) * gth) * min(1.0, uLn[0].z * grow * gth / c) * exp(-uLn[4].x * age);
  vC = uCol[int(uE[l].z + 0.5)] * I * uLn[2].y * amp;
  vG = vec4(sd * hw, along, lS, 1.0 / c);
}`,Mt=K+`in vec3 vC; in vec4 vG; out vec4 o;
void main(){
  float x = vG.x * vG.w;
  float e = 0.5 * (tanh(clamp(1.2 * vG.y * vG.w, -4.0, 4.0)) - tanh(clamp(1.2 * (vG.y - vG.z) * vG.w, -4.0, 4.0)));
  o = vec4(vC * exp(-x * x) * e, 1.0);
}`,c0=(t,o,a)=>{if(t.indexOf(o)<0)throw new Error("091 NF "+o);return t.split(o).join(a)},Lt=`vec4 dyF(ivec2 c, ivec2 sz){ uvec4 u = texelFetch(uDH, clamp(c, ivec2(0), sz - 1), 0); return vec4(unpackHalf2x16(u.r).x, unpackHalf2x16(u.g).x, unpackHalf2x16(u.b).x, unpackHalf2x16(u.a).x); }
vec4 dyT(vec2 uv){ ivec2 sz = textureSize(uDH, 0); vec2 q = uv * vec2(sz) - 0.5, f = fract(q); ivec2 i = ivec2(floor(q));
  return mix(mix(dyF(i, sz), dyF(i + ivec2(1, 0), sz), f.x), mix(dyF(i + ivec2(0, 1), sz), dyF(i + ivec2(1, 1), sz), f.x), f.y); }
vec4 dyL(vec2 uv, float l){ return dyT(uv); }
`,Do=t=>(t=c0(t,"texture(uD, ","dyT("),t=c0(t,"uniform sampler2D uD; ","uniform usampler2D uD; "),t=c0(t,"out vec4 o;","out uvec4 oU; vec4 o;"+I+Lt.split("uDH").join("uD")),t=c0(t,"void main(){","void main0(){"),t+I+"uint hb16(float v){ return packHalf2x16(vec2(v, 0.0)); }"+I+"void main(){ main0(); oU = uvec4(hb16(o.r), hb16(o.g), hb16(o.b), hb16(o.a)); }"),Po=t=>(t=c0(t,"textureLod(uDy, ","dyL("),t=c0(t,"textureLod(uLt, vec2(suv.x, sp.y), 0.0).rgb","(textureLod(uLt, vec2(suv.x, sp.y), 0.0).rgb * 4.0)"),c0(t,"uniform sampler2D uBG, uDy, uMk, uIl, uN, uLt;","uniform sampler2D uBG, uMk, uIl, uN, uLt; uniform usampler2D uDy;"+I+Lt.split("uDH").join("uDy"))),_o=t=>c0(t,"o = vec4(vC * exp(-x * x) * e, 1.0);","o = vec4(vC * exp(-x * x) * e * 0.25, 1.0);");let U=e.__p091;if(!U||!U.ready){const t=[],o=(c,i)=>{const f=e.createShader(c);return e.shaderSource(f,i),e.compileShader(f),t.push([f,i]),f},a=(c,i)=>{const f=e.createProgram();return e.attachShader(f,c),e.attachShader(f,i),f},n=o(e.VERTEX_SHADER,ko),s=[So,Mo,Lo,No,Uo,F0?At:Do(At),Bo,kt.replace("uniform vec4 uRk;","#define T1"+I+"uniform vec4 uRk;"),Io,F0?St:Po(St)].map(c=>a(n,o(e.FRAGMENT_SHADER,c)));s.push(a(o(e.VERTEX_SHADER,Co),o(e.FRAGMENT_SHADER,F0?Mt:_o(Mt)))),s.push(a(n,o(e.FRAGMENT_SHADER,kt.replace("uniform vec4 uRk;",I+"uniform vec4 uRk;"))));for(const c of s)e.linkProgram(c);e.flush(),U={ready:!1,progs:s,shaders:t,own:{}}}const[Q0,Nt,zo,De,J0,$0,Ut,Bt,It,l0,Pe,Ct]=U.progs,Dt=U.progs,F=256,ee=new Uint8Array(F*F*4);{let t=(o0(1)|1)>>>0;const o=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)/4294967296),a=new Float32Array(F*F),n=new Int32Array(F),s=new Int32Array(F),c=new Float32Array(F);for(let i=0;i<2;i++){a.fill(0);const f=i===0?8:32;for(let u=0,p=f,B=.5;u<3;u++,p*=2,B*=.5){const h=new Float32Array(p*p);for(let x=0;x<h.length;x++)h[x]=o();const P=p/F;for(let x=0;x<F;x++){const u0=x*P,t0=u0|0,_0=u0-t0;n[x]=t0,s[x]=(t0+1)%p,c[x]=_0*_0*(3-2*_0)}for(let x=0;x<F;x++){const u0=n[x]*p,t0=s[x]*p,_0=c[x],sa=x*F;for(let g0=0;g0<F;g0++){const we=n[g0],co=s[g0],lo=c[g0],io=h[u0+we]+(h[u0+co]-h[u0+we])*lo,ca=h[t0+we]+(h[t0+co]-h[t0+we])*lo;a[sa+g0]+=B*(io+(ca-io)*_0)}}}for(let u=0;u<F*F;u++)ee[u*4+i]=k(Math.round((a[u]/.875-.5)*1.6*255+128),0,255)}for(let i=0;i<F*F;i++)ee[i*4+2]=o()*256|0,ee[i*4+3]=255}const L0=.55,_e=new Uint32Array(L*S0*4),ze=new Float32Array(_e.buffer);let te=1e5;for(let t=0;t<S0;t++)for(let o=0;o<L;o++){const a=L-1-o,n=(t*L+o)*4,s=b[t*4]+(a+.5)*L0,c=b[t*4+1],i=t>=S;ze[n]=s,ze[n+1]=c,ze[n+2]=s<254&&!i?L0:0,_e[n+3]=te-a&16777215}if(!U.ready){for(const p of Dt)if(!e.getProgramParameter(p,e.LINK_STATUS)){let B=e.getProgramInfoLog(p);for(const[h,P]of U.shaders){const x=e.getShaderInfoLog(h);x&&(B+=I+x+I+P.split(I).map((u0,t0)=>t0+1+": "+u0).join(I))}throw new Error("091 shader: "+B)}const t=p=>{const B={},h=e.getProgramParameter(p,e.ACTIVE_UNIFORMS);for(let P=0;P<h;P++){const x=e.getActiveUniform(p,P);B[x.name.replace("[0]","")]=e.getUniformLocation(p,x.name)}return B};U.U=Dt.map(t);const[o,a,,n,s,c,,,,i,f]=U.U,u=(p,B,h,P)=>{e.useProgram(p),B[h]&&e.uniform1i(B[h],P)};u(Q0,o,"uS",0),u(Q0,o,"uM",1),u(Nt,a,"uM",1),u(De,n,"uM",1),u(J0,s,"uP",2),u(J0,s,"uS",0),u(J0,s,"uM",1),u($0,c,"uD",3),u($0,c,"uS",0),u($0,c,"uM",1),u(l0,i,"uBG",5),u(l0,i,"uDy",3),u(l0,i,"uMk",6),u(l0,i,"uIl",7),u(l0,i,"uN",4),u(l0,i,"uLt",8),u(Pe,f,"uP",2),u(Pe,f,"uIl",7),e.useProgram(De),e.uniform4f(n.uL,xt,ht,1.2,0),e.uniform1i(n.uN,56),e.useProgram(Q0),e.uniform4i(o.uI,A,z,9,A-30),U.shaders=null,U.ready=!0,e.__p091=U}const[Pt,We,oe,ia,ae,ne,_t,zt,Wt,re,N0,Gt]=U.U,qt={};e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1);const X=(t,o,a,n,s,c,i,f)=>{const u=e.createTexture();return e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,n,s,c),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,f||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,f||e.CLAMP_TO_EDGE),u},Yt=X(F,F,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,ee,e.LINEAR,e.REPEAT);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.generateMipmap(e.TEXTURE_2D);const se=[0,1].map(()=>X(A,z,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,null,e.NEAREST)),ce=[0,1].map(t=>X(L,S0,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,t===0?_e:null,e.NEAREST)),Ge=512,qe=192,Ye=[0,1].map(()=>F0?X(Ge,qe,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.LINEAR):X(Ge,qe,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,null,e.NEAREST)),U0=X(A,z,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),le=Math.min(2048,Math.max(128,Math.round((V-W)*_/M[2]))),Oe=Math.round(le*z/A),Ot=X(le,Oe,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),Kt=X(A,z,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),Xt=(V-W)*_/(A*M[2]),O=Math.min(1024,_),Ht=X(O,O,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),ie=Math.max(8,Math.round((r0-n0)*_/M[2])),Vt=F0?X(_,ie,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.LINEAR):X(_,ie,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),i0=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},jt=se.map(i0),Wo=ce.map(i0),Go=Ye.map(i0),qo=i0(U0),Yo=i0(Ot),Oo=i0(Kt),Ko=i0(Ht),Xo=i0(Vt);e.bindFramebuffer(e.FRAMEBUFFER,null);const B0=e.createVertexArray(),w=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},I0=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},Ho=[[.1,.1,.115],[.27,.31,.42],[.58,.4,.23]][H0],Vo=[[.012,.012,.015],[.03,.034,.05],[.036,.028,.019]][H0],jo=[[-.5,.86],[-.7,.7],[.55,.83]][H0],Zo=new Float32Array([...Y,...$,...Ao]),Zt=(t,o)=>{const a=(s,c)=>{o[s]&&e.uniform1i(o[s],c)},n=(s,c)=>{o[s]&&e.uniform3fv(o[s],c)};a("uN",4),a("RM",H0),a("TU",ke),a("SK",d),a("LI",X0),n("LC",J),n("KEY",Ho),n("AMB",Vo),n("CA",Y),n("CB",$),o.KD&&e.uniform2fv(o.KD,jo),o.uW&&e.uniform4f(o.uW,W,n0,V,r0),o.WYT&&e.uniform1f(o.WYT,pt),o.uRk&&e.uniform4f(o.uRk,Z,q,S,d===1||d===4?1:0)},Ke=(t,o)=>{e.useProgram(o),U.own[t]!==qt&&(U.own[t]=qt,t===9?(Zt(l0,re),e.uniform2f(re.uRes,_,_),e.uniform3fv(re.uZ,M)):t===5?e.uniform4f(ne.uR,Rt,Z,N?q/2:q,N?2*S-1:S):t===10&&(e.uniform3fv(N0.uCol,Zo),e.uniform3fv(N0.uZ,M)))};for(const[t,o]of[[Ut,_t],[Bt,zt],[It,Wt],[Ct,Gt]])e.useProgram(t),Zt(t,o),e.uniform3fv(o.uZ,M);I0(),e.bindVertexArray(B0),w(4,Yt),e.bindFramebuffer(e.FRAMEBUFFER,Ko),e.viewport(0,0,O,O),e.useProgram(Ut),e.uniform2f(_t.uRes,O,O),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(It),e.uniform2f(Wt.uRes,O,O),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(Bt),e.uniform2f(zt.uRes,O,O),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(Ct),e.uniform2f(Gt.uRes,O,O),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND);let C0=!0;function Qt(){I0(),e.bindVertexArray(B0),e.useProgram(zo);const t=Ne?3.6*r:0;e.uniform4f(oe.uO,l,y,g+j,G),e.uniform4f(oe.uO2,r,l===0?t:0,R&&l===2?1:0,D),e.bindFramebuffer(e.FRAMEBUFFER,qo),e.viewport(0,0,A,z),e.uniform2f(oe.uRes,A,z),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Yo),e.viewport(0,0,le,Oe),e.uniform2f(oe.uRes,le,Oe),e.drawArrays(e.TRIANGLES,0,3),w(1,U0),e.useProgram(De),e.bindFramebuffer(e.FRAMEBUFFER,Oo),e.viewport(0,0,A,z),e.drawArrays(e.TRIANGLES,0,3),C0=!1}Qt();let C=0,h0=0,R0=0,D0=0,ue=0,fe=0,Jt=0,ve=0,Xe=0,me=0;const pe=()=>{const t=.03+.07*C,o=5*Math.pow(80,C),a=t*(l===6?2*D:r)/o,n=Math.max(.5045,3*a+.5);return{Uin:t,Re:o,tau:n}},$t=t=>k(T0[0]+T0[1]*Math.sin(2*T*(t/96+Te))+T0[2]*Math.sin(2*T*(t/23+Y0)),T0[3],T0[4]);C=h0=m.home?.68:$t(((.15+.2*Y0-Te)%1+1)%1*96);function Qo(){const t=pe();I0(),e.bindVertexArray(B0),e.useProgram(Nt);const o=t.Re>50&&(l===0||l===2||l===3||l===4)&&!Ue&&!R,a=l===2?2*r*Math.abs(Math.sin(G))+2:l===3?.84*r:r;e.uniform4f(We.uA,t.Uin,a,y,g),e.uniform4f(We.uB,o?1:0,4.6*a,1.15*a,2.3*t.Uin*a),e.uniform1i(We.uNV,o?12:0),w(1,U0),e.bindFramebuffer(e.FRAMEBUFFER,jt[0]),e.viewport(0,0,A,z),e.drawArrays(e.TRIANGLES,0,3),R0=0}Qo();function eo(t){C0&&Qt();const o=pe();fe+=Math.min(t,.25)*30*(9+9*C);let a=Math.floor(fe);if(fe-=a,a>mt&&(a=mt,fe=0),I0(),e.bindVertexArray(B0),w(1,U0),a>0){e.useProgram(Q0);const c=Ue&&l===0?1.7*o.Uin/(r/2):0;e.uniform4f(Pt.uA,o.Uin,0,o.tau,.022),e.uniform4f(Pt.uB,y,g+j,c,k0&&l===0?wt:0),e.viewport(0,0,A,z);for(let i=0;i<a;i++)e.bindFramebuffer(e.FRAMEBUFFER,jt[R0^1]),w(0,se[R0]),e.drawArrays(e.TRIANGLES,0,3),R0^=1;c&&(bt-=c*a)}if(w(0,se[R0]),me+=a,me>0){const c=me;me=0;const i=Jt+o.Uin*c;let f=Math.floor(i/L0);f>L/4&&(f=L/4),e.useProgram(J0),e.uniform4fv(ae.uE,b),e.uniform4f(ae.uK,ve,f,i,L0),e.uniform4f(ae.uV,c,o.Re>160?k((o.Re-160)/240,0,1)*(N||R?.3:1):0,Xe*.05,o.Uin),e.uniform4i(ae.uI,L,c*o.Uin>1?2:1,Math.round(k(H,0,1)*255),te),e.bindFramebuffer(e.FRAMEBUFFER,Wo[D0^1]),e.viewport(0,0,L,S0),w(2,ce[D0]),e.drawArrays(e.TRIANGLES,0,3),D0^=1,Jt=i-f*L0,te+=f,ve=(ve+f)%L}w(2,ce[D0]),Ke(5,$0);const n=o.Uin*a/1.2;e.uniform4f(ne.uH,a,Math.pow(.9975,a/10),H*.17*n,(d===2?.4:N?Jo():E0?.36:.3)*n),e.uniform4f(ne.uQ,Q?1:N?2+Ro*n:0,d===5?1:0,d===1?0:1,Xe*.37);const s=S*4;return e.uniform4f(ne.uPt,b[s],b[s+1],b[s+4],b[s+5]),e.bindFramebuffer(e.FRAMEBUFFER,Go[ue^1]),e.viewport(0,0,Ge,qe),w(3,Ye[ue]),e.drawArrays(e.TRIANGLES,0,3),ue^=1,Xe++,a}function Jo(){const t=((te-5)%M0+M0)%M0,o=Math.min(t,M0-t);return wo*Math.exp(-o*o/1.5)}const to=new Float32Array(36),e0=new Float32Array(20),$o=R?2:G0==="Large"&&p0?1:0;let He=1,H=0,oo=0;function ao(t){I0(),e.bindVertexArray(B0),w(0,se[R0]),w(1,U0),w(2,ce[D0]),w(3,Ye[ue]),w(4,Yt),w(5,Ht),w(6,Ot),w(7,Kt),w(8,null),e.bindFramebuffer(e.FRAMEBUFFER,Xo),e.viewport(0,0,_,ie),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),Ke(10,Pe);const o=(ve-1+L)%L,a=d===1||d===4,n=(a?.5:d===2?1.15:.9)*(E0?1.1:1)*He;e0.set([o,L,(a?.2:d===2?.5:E0?.46:.38)*Xt,.62,W,n0,V,r0,_,n*(Ee?.45:N?.3:1),ie,0,N?1:0,a?.7:1.3,0,a?2.5:16,Eo,M0,2,0]),e.uniform4fv(N0.uLn,e0),e.uniform4fv(N0.uE,b),N||e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,S0*L),(Ee||N)&&(e0[9]=n*2.4,e0[11]=q,e0[14]=S,e0[15]=N?1.5*q:Math.min(16,70/Xt),N&&(e0[2]*=1.8,e0[9]=n*go),e.uniform4fv(N0.uLn,e0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,(S-1)*L)),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,_,_),w(8,Vt),Ke(9,l0),to.set([t,He,C,bt,y,g+j,r,l,J[0],J[1],J[2],X0===0?1:0,Y[0],Y[1],Y[2],oo,$[0],$[1],$[2],ke,W,n0,V,r0,xt,ht,h0,pt,Ne&&l===0?1:0,0,G,D,$o,0,0,0]),e.uniform4fv(re.uC,to),e.drawArrays(e.TRIANGLES,0,3)}const P0=11025,no=new Float32Array(4096);let d0=0,xe=0,he=0,Ve=0,je=0,y0=(o0(7)|1)>>>0,Ze=0,Qe=0,Je=0,de=40,$e=400;function ea(t){return Ue&&l===0?.25:k0&&l===0?1.2*k((t.Re-40)/30,0,1):l===1||l===5?k((Math.abs(G)*180/T-12)/6,0,1)*k((t.Re-40)/40,0,1)*.8:k((t.Re-45)/30,0,1)*(1-.6*k((t.Re-220)/180,0,1))}function ta(t){if(!m.sound.on)return;const o=Math.min(4096,Math.round(t*P0));if(o<8)return;const a=pe(),n=.3*(.25+C),s=.55*C*C+H*.5,c=.16*ea(a),i=32+70*C,f=300+760*C;for(let u=0;u<o;u++){Ze+=(n-Ze)*.0015,Qe+=(s-Qe)*.0015,Je+=(c-Je)*.0015,de+=(i-de)*.0015,$e+=(f-$e)*.0015,d0+=de/P0,d0>1&&(d0-=1),xe+=de*4.03/P0,xe>1&&(xe-=1),he+=$e*(1+.004*Math.sin(d0*6.283))/P0,he>1&&(he-=1),y0^=y0<<13,y0^=y0>>>17,y0^=y0<<5;const B=(y0>>>0)/2147483648-1,h=.05+.25*C;Ve+=(B-Ve)*h,je+=(Ve-je)*h;const P=Math.sin(d0*6.2832)*.6+Math.sin(d0*12.566)*.25+Math.sin(d0*18.85)*.12+Math.sin(xe*6.2832)*.06;no[u]=Ze*P+Qe*je*2.2+Je*Math.sin(he*6.2832)}m.sound.pcm(no.subarray(0,o),P0,{vel:.6})}let v=null,et=99,ye=99,oa=0;const ro=(t,o)=>[(M[0]+t*M[2]-W)/(V-W)*A,(M[1]+(1-o)*M[2]-n0)/(r0-n0)*z];function aa(t,o){const a=Ie(l),n=Math.cos(G),s=Math.sin(G),c=t-y,i=o-(g+j),f=l===0?c:c*n-i*s,u=l===0?i:c*s+i*n,p=10;if(R){const h=l===2?2:.5*r,P=l===2?r:.5*r;return Math.abs(c)<h+p&&o<P+p?1:0}if(l===6){const h=(i%j0+1.5*j0)%j0-.5*j0;return Math.abs(c)<D+6&&Math.abs(h)<D+6?1:0}if(f<a[0]-p||f>a[1]+p||u<a[2]-p||u>a[3]+p)return 0;if(l===0||l===3)return 1;const B=l===4?.3*r:Math.max(6,.28*(a[1]-a[0])/2);return Math.abs(f)<B?1:2}function na(){Le[l]=x0;const t=b0.indexOf(l);l=b0[(t+1)%b0.length],G=x0=Le[l];const o=Ie(l);w0=k(w0,dt-o[0],Math.min(120,yt-o[1])),y=w0,l===6&&(A0=48),R&&(A0=g=0),j=0,C0=!0,Z0(),oa=.25,m.sound.hit("click",.5),m.sound.note(72+b0.indexOf(l)*2,{dur:.12,vel:.2,wave:"sine"})}function ra(t){const o=m.input;if(o.taps(),o.down&&o.inside!==!1&&!v){const[a,n]=ro(o.x,o.y),s=aa(a,n);v={x:o.x,y:o.y,t:0,mode:0,om:s,sx:a,sy:n,ox:w0,oy:A0,a0:Math.atan2(n-g,a-y),ang0:x0,s0:h0}}if(v)if(et=0,o.down){v.t+=t;const a=Math.hypot(o.x-v.x,o.y-v.y);v.mode===0&&a>.015?v.mode=v.om===1?2:v.om===2?3:1:v.mode===0&&v.t>.32&&(v.mode=4,m.sound.hit("noise",.45,{cutoff:900,dur:.7}));const[n,s]=ro(o.x,o.y);if(v.mode===1)h0=k(v.s0+(v.y-o.y)*1.5,0,1);else if(v.mode===2){ye=0;const c=Ie(l);w0=k(v.ox+n-v.sx,dt-c[0],p0?yt-c[1]:130),A0=l===6?48:R?0:k(v.oy+s-v.sy,8-c[2]+(k0?.3*r:0),88-c[3]-(k0?.3*r:0))}else if(v.mode===3){ye=0;let i=Math.atan2(s-g,n-y)-v.a0;for(;i>T;)i-=2*T;for(;i<-T;)i+=2*T;const f=l===2?[-T/2,T/2]:l===4?[-T/4,T/4]:[-.5,.62];x0=k(v.ang0-i,f[0],f[1])}else v.mode===4&&(H=Math.min(1,H+t*4))}else v.mode===0&&(v.om?na():(H=Math.max(H,.7),m.sound.hit("noise",.3,{cutoff:700,dur:.4}))),v=null;else et+=t}let be=((.15+.2*Y0-Te)%1+1)%1*96,so=0;function tt(t,o){ra(t),ye+=t,be+=t,et>8&&(h0+=($t(be)-h0)*Math.min(1,t*.5)),C+=(h0-C)*Math.min(1,t*1.2),ye>10&&!v&&!R&&(l===1||l===5?x0=(8+9*Math.sin(2*T*(be/41+Y0)))*T/180:l===2&&(x0=(78+12*Math.sin(2*T*be/53))*T/180));const a=x0-G,n=w0-y,s=A0-g;if(Math.abs(a)>1e-4||Math.abs(n)>.01||Math.abs(s)>.01){const c=Math.min(1,t*6);G+=a*c,y+=n*c,g+=s*c,C0=!0,Z0()}if(k0&&l===0){const c=pe(),i=Math.min(t,.25)*30*(9+9*C),f=2*T*.2*c.Uin/r,u=.28*r*k((c.Re-35)/30,0,1);Be+=f*i,j=u*Math.sin(Be),wt=u*f*Math.cos(Be),C0=!0,Z0()}He=X0===0?1+.03*(.6*Math.sin(o*4.3)+.4*Math.sin(o*2.9)):1,oo=H*.25,v&&v.mode===4||(H=Math.max(0,H-t*2.2))}for(let t=0,o=N?150:70;t<o;t++)tt(1/30,0),eo(1/30);return tt(0,0),ao(0),(t,o)=>{o=Math.min(.25,Math.max(.001,o||t-so)),so=t,tt(o,t),eo(o),ao(t),ta(o)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
