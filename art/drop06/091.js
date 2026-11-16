// Wind Tunnel: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/091.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(bt){bt&&function(){"use strict";const g0=new Map,xo=(u,e,M)=>u<e?e:u>M?M:u;function ho(u){let e=g0.get(u);if(e)return g0.delete(u),g0.set(u,e),e;e=new Uint8Array(256*256*4);const M=xo;let p=(u|1)>>>0;const k=()=>(p^=p<<13,p^=p>>>17,p^=p<<5,(p>>>0)/4294967296),g=new Float32Array(256*256),Q0=new Int32Array(256),$=new Int32Array(256),J0=new Float32Array(256);for(let A=0;A<2;A++){g.fill(0);const Ke=A===0?8:32;for(let Z=0,q=Ke,j=.5;Z<3;Z++,q*=2,j*=.5){const Q=new Float32Array(q*q);for(let d=0;d<Q.length;d++)Q[d]=k();const pe=q/256;for(let d=0;d<256;d++){const o0=d*pe,e0=o0|0,m0=o0-e0;Q0[d]=e0,$[d]=(e0+1)%q,J0[d]=m0*m0*(3-2*m0)}for(let d=0;d<256;d++){const o0=Q0[d]*q,e0=$[d]*q,m0=J0[d],xe=d*256;for(let x=0;x<256;x++){const a0=Q0[x],t0=$[x],_0=J0[x],F0=Q[o0+a0]+(Q[o0+t0]-Q[o0+a0])*_0,z0=Q[e0+a0]+(Q[e0+t0]-Q[e0+a0])*_0;g[xe+x]+=j*(F0+(z0-F0)*m0)}}}for(let Z=0;Z<256*256;Z++)e[Z*4+A]=M(Math.round((g[Z]/.875-.5)*1.6*255+128),0,255)}for(let A=0;A<256*256;A++)e[A*4+2]=k()*256|0,e[A*4+3]=255;return g0.set(u,e),g0.size>4&&g0.delete(g0.keys().next().value),e}bt.add({num:91,name:"Wind Tunnel",fam:"Worlds",recipe:"A small smoke tunnel on a lab bench, with lines of smoke flowing round a model and rolling up into real swirls behind it as the fan speeds up. The model changes every mint. Drag up or down to set the fan, tap the model to swap it, drag it to move it or near its tip to tilt it, or hold for a thick puff of smoke.",interactive:"Drag up or down to speed the fan up or slow it down; tap the model to swap it (cylinder, airfoil, flat plate, sphere, square bar, and the bird wing or the row of rods where a mint has one; a body on the floor swaps between hump, fence and block); drag the model to move it (a body on the floor slides along it), or drag near its tip to turn it and stall the airfoil; hold for a dense puff of smoke.",music:!0,gl:!0,fps:30,seed:0,make(u){const e=u.gl,M=u.size,p=Math.PI,k=`
`,g=(t,o,a)=>t<o?o:t>a?a:t,Q0=e.getExtension("EXT_color_buffer_float"),$=!!(e.getExtension("EXT_color_buffer_half_float")||Q0),J0=(u.hash||"0x0").slice(2).padEnd(64,"0"),A=t=>parseInt(J0.slice(t*8,t*8+8),16)>>>0,Ke=.5,Z=t=>{let o=t>>>0;return()=>{o=o+1831565813|0;let a=Math.imul(o^o>>>15,1|o);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296}},q=Z((A(0)^Math.imul(A(6),739982445)^152543518)>>>0),j=(t,o)=>{let a=0;for(const r of o)a+=r;let n=q()*a,l=0;for(;n>=o[l]&&l<o.length-1;)n-=o[l++];return t[l]},Q=["Cylinder","Airfoil","Flat plate","Sphere","Bird wing"],pe=["Glass benchtop","Old wooden","Water channel"],d=["Smoke rake","Smoke wire","Three filaments","Ink dye","Hydrogen bubbles","Two-colour dye"],o0=["Green laser sheet","White light sheet","Cold light sheet"],e0=["Small","Standard","Large"],m0=["Blackout","Night lab","Workshop lamp"],xe=["None","Tandem cylinders","Spinning cylinder","Locked street"];let x=j(Q,[32,25,18,18,7]),a0=j(pe,[42,33,25]),t0=a0==="Water channel"?j(d.slice(3),[50,30,20]):j(d.slice(0,3),[55,28,17]),_0=j(o0,[35,45,20]),F0=j(e0,[30,45,25]),z0=j(m0,[30,40,30]),E0=j(xe,[82,6,6,6]);const yo=q(),Xe=q(),he=q();u.home&&(x="Cylinder",a0="Glass benchtop",t0="Smoke rake",_0="White light sheet",F0="Standard",z0="Night lab",E0="None"),E0!=="None"&&(x="Cylinder");const de=Z((A(4)^Math.imul(A(1),2654435761)^596878)>>>0),bo=de(),Ro=de(),wo=de(),Rt=(de()+Ke)%1,He=!u.home&&Ro<.5&&t0==="Smoke wire";!u.home&&E0==="None"&&t0!=="Three filaments"&&(x==="Cylinder"||x==="Sphere"||x==="Flat plate")&&wo<.19&&(x="Row of rods");const wt=["Hump on the floor","Fence on the floor","Block on the floor"],F=!u.home&&E0==="None"&&t0!=="Three filaments"&&(x==="Cylinder"||x==="Sphere"||x==="Flat plate")&&Rt<.45;F&&(x=wt[Math.min(2,Math.floor(Rt/.15))]),u.trait("Model",x),u.trait("Smoke",He?"Pulsed smoke wire":t0),u.trait("Tunnel",a0),u.trait("Light",_0),u.trait("Model size",F0),u.trait("Room",z0),u.trait("Rare",E0);const go=Z((A(2)^Math.imul(A(5),625341585)^1592590481)>>>0),gt=(t,o)=>{let a=0;for(const r of o)a+=r;let n=go()*a,l=0;for(;n>=o[l]&&l<o.length-1;)n-=o[l++];return t[l]},Ft=["Standing back","Test section","Close on the wake"],Ve=["Vortex street","Steady wake","Turbulent"];let T0=gt(Ft,[30,30,40]),ye=gt(Ve,[60,28,12]);u.home?(T0="Test section",ye="Vortex street"):T0!=="Close on the wake"&&E0!=="Tandem cylinders"&&t0!=="Three filaments"&&bo<(z0==="Blackout"?.55:.3)&&(T0="Through the glass");const A0=T0==="Through the glass";u.trait("View",T0),u.trait("Flow",F?["Billowing bubble","Steady bubble","Turbulent"][Ve.indexOf(ye)]:ye);const D=new Float32Array(A0?[.2148,.367,.3285]:[[.02,.2,.78],[.04,.225,.64],[.2,.28,.5]][Ft.indexOf(T0)]);F&&(A0||T0==="Close on the wake")&&(D[1]=.344-.065*D[2]);const $0=[[.68,.27,.05,.3,.98],[.3,.08,.03,.18,.42],[.92,.05,.03,.85,1]][Ve.indexOf(ye)],Ze=pe.indexOf(a0),y=d.indexOf(t0),be=o0.indexOf(_0),Re=m0.indexOf(z0),je=xe.indexOf(E0),ee=Ze===2,w=256,C=96,S=512,Et=48,Tt=22,O=.07,n0=.93,p0=.37,x0=.37+.86*96/256,At=ee?x0+.032:x0,fa=.026,we=.31,Qe=.778,St=(we-O)/(n0-O)*w,Mt=(Qe-p0)/(x0-p0)*C,s=[12,16,20][e0.indexOf(F0)]*(F&&x!=="Fence on the floor"?1.6:1),G0=F?[0,2,4]:[0,1,2,3,4];x==="Bird wing"&&G0.push(5),x==="Row of rods"&&G0.push(6);const W=s===20?3.4:.21*s,ge=19.2;let c=x==="Row of rods"?6:F?[0,2,4][wt.indexOf(x)]:[0,1,2,3,5][Q.indexOf(x)];const kt=A0?46:14,Nt=A0?138:130,W0=[0,6,90,0,0,7,0].map(t=>t*p/180);let h=F?A0?64:52:70,b=F?0:48,h0=h,S0=b,L=W0[c],s0=L;const Je=je===1,$e=je===2,te=je===3;let Fe=0,oe=0,Y=0,Ee=0,U,r0,K,c0;y===0?(U=17,r0=5,K=86/16,c0=!0):y===1?(U=44,r0=3.2,K=89.6/43,c0=!1):y===2?(U=3,r0=48-1.25*s+.09*s,K=1.25*s,c0=!0):y===3?(U=9,r0=8,K=10,c0=!0):y===4?(U=40,r0=3.2,K=89.6/39,c0=!1):(U=10,r0=7,K=82/9,c0=!0);const M0=U+(c0?2:0),Fo=.22,Eo=1.25,To=2,P=y===4,Ao=D[2]/(n0-O)*w,So=Math.min(w,(D[0]+D[2]-O)/(n0-O)*w),ae=P?g(Math.round(Ao/12/.55),10,40):20,Mo=P?Math.LN2/Math.max(.1,(So-7.5)/.55/512):0,R=new Float32Array(Et*4),Lt=7.5;for(let t=0;t<U;t++){const o=r0+t*K;R[t*4]=Lt,R[t*4+1]=o,R[t*4+2]=y===5?o>48?0:1:0}const l0=[[.3,1,.36],[1,.95,.86],[.84,.92,1]][be],Ut=[.62,1,.3],Bt=[1,.4,.3];let X,i0;ee?y===3?(X=yo<.55?Ut:Bt,i0=X):y===4?(X=[.8*l0[0]+.15,.8*l0[1]+.15,.8*l0[2]+.18],i0=X):(X=Bt,i0=Ut):(X=l0,i0=l0);const ko=X.map(t=>Math.min(1.4,t*1.25));function It(t){return t===1?3.2*s:t===5?3.4*s:t===2?2*s:s}function Te(t){const o=It(t);if(F){const a=t===2?2:.5*s;return[-a,a,0,t===2?s:.5*s]}return t===0?[-s/2,s/2+(Je?3.6*s:0),-s/2,s/2]:t===6?[-W,W,-W,W]:t===3?[-.42*s,.42*s,-.42*s,.42*s]:t===1?[-.25*o,.75*o,-.07*o,.09*o]:t===5?[-.25*o,.75*o,-.06*o,.13*o]:t===2?[-s,s,-1.6,1.6]:[-.5*s,.5*s,-.5*s,.5*s]}const d0=(t,o)=>{const a=Math.cos(L),n=Math.sin(L);return[h+t*a+o*n,b+Y-t*n+o*a]};function Ae(){if(!c0&&!P)return;let t,o;const a=It(c);if(F){const l=c===2?s:.5*s;t=[h-(c===2?2.5:.25*s),l+2.1],o=[h-(c===2?3.5:.5*s+2.5),1.2]}else if(c===0)t=[h-.1*s,b+Y+s/2+2.1],o=[h-.1*s,b+Y-s/2-2.1];else if(c===6)t=[h-.2*W,b+W+2.1],o=[h-.2*W,b-W-2.1];else if(c===3)t=[h-.1*s,b+.42*s+2.1],o=[h-.1*s,b-.42*s-2.1];else if(c===1)t=d0(-.2*a,.048*a+2.1),o=d0(-.2*a,-.036*a-2.1);else if(c===5)t=d0(-.19*a,.11*a+2),o=d0(-.2*a,-.03*a-2.1);else if(c===2){if(t=d0(-s-1.5,0),o=d0(s+1.5,0),o[1]>t[1]){const l=t;t=o,o=l}}else if(t=d0(-.2*s,.5*s+2.1),o=d0(-.2*s,-.5*s-2.1),o[1]>t[1]){const l=t;t=o,o=l}const n=U*4;R[n]=t[0]-1.2,R[n+1]=t[1],R[n+2]=y===5?0:2,R[n+3]=1,R[n+7]=1,R[n+4]=o[0]-1.2,R[n+5]=o[1],R[n+6]=y===5?1:2}Ae();const J="#version 300 es"+k+"precision highp float;"+k+"precision highp int;"+k+"precision highp usampler2D;"+k,No=J+"void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0); }",Dt=`
vec2 st(ivec2 q){ q = clamp(q, ivec2(0), ivec2(255, 95)); uvec2 s = texelFetch(uS, q, 0).xy; return vec2(uintBitsToFloat(s.x), uintBitsToFloat(s.y)); }
vec2 vel(vec2 p){ vec2 f = p - 0.5; vec2 fl = floor(f); ivec2 i = ivec2(fl); vec2 a = f - fl;
  return mix(mix(st(i), st(i + ivec2(1, 0)), a.x), mix(st(i + ivec2(0, 1)), st(i + ivec2(1, 1)), a.x), a.y); }`,Lo=J+`uniform usampler2D uS; uniform sampler2D uM;
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
}`,Uo=J+`uniform sampler2D uM; uniform vec4 uA; uniform vec4 uB; uniform int uNV;
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
}`,Bo=J+`uniform vec4 uO; uniform vec4 uO2; uniform vec2 uRes;
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
}`,Io=J+`uniform sampler2D uM; uniform vec4 uL; uniform int uN;
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
}`,Do=J+`uniform usampler2D uP; uniform usampler2D uS; uniform sampler2D uM;
uniform vec4 uE[48]; uniform vec4 uK; uniform vec4 uV; uniform ivec4 uI;
out uvec4 o;`+Dt+`
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
}`,Ct=J+`uniform sampler2D uD; uniform usampler2D uS; uniform sampler2D uM;
uniform vec4 uH; uniform vec4 uR; uniform vec4 uPt; uniform vec4 uQ;
out vec4 o;`+Dt+`
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
}`,et=J+`uniform sampler2D uN; uniform vec2 uRes; uniform vec3 uZ; uniform int RM, TU, SK, LI;
uniform vec3 LC, KEY, AMB, CA, CB; uniform vec2 KD; uniform vec4 uW; uniform float WYT;
out vec4 o;
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float N1(vec2 p){ return texture(uN, p).r; }
float N2(vec2 p){ return texture(uN, p).g; }
float rr(vec2 p, vec4 r, float rad, float px){ vec2 c = (r.xy + r.zw) * 0.5, h = (r.zw - r.xy) * 0.5 - rad; vec2 d = abs(p - c) - h; float s = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - rad; return clamp(0.5 - s / px, 0.0, 1.0); }
float circ(vec2 p, vec2 c, float r, float px){ return clamp(0.5 - (length(p - c) - r) / px, 0.0, 1.0); }
vec4 A = vec4(0.0);
void lay(vec3 c, float a){ A.rgb = c * a + A.rgb * (1.0 - a); A.a = a + A.a * (1.0 - a); }
`,Co=et+`
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
}`.replace(/WX0m\(\)/g,"0.06").replace(/SRCU\(\)/g,we.toFixed(4)),Pt=et+`uniform vec4 uRk;
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
}`.replace(/SRCV\(\)/g,Qe.toFixed(4)).replace(/SRCU\(\)/g,we.toFixed(4)),Po=et+`
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
}`,_t=J+`uniform sampler2D uBG, uDy, uMk, uIl, uN, uLt;
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
  vec2 su = vec2(`+we.toFixed(4)+", "+Qe.toFixed(4)+`);
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
}`,_o=J+`uniform usampler2D uP; uniform sampler2D uIl;
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
}`,zt=J+`in vec3 vC; in vec4 vG; out vec4 o;
void main(){
  float x = vG.x * vG.w;
  float e = 0.5 * (tanh(clamp(1.2 * vG.y * vG.w, -4.0, 4.0)) - tanh(clamp(1.2 * (vG.y - vG.z) * vG.w, -4.0, 4.0)));
  o = vec4(vC * exp(-x * x) * e, 1.0);
}`,y0=(t,o,a)=>{if(t.indexOf(o)<0)throw new Error("091 NF "+o);return t.split(o).join(a)},Gt=`vec4 dyF(ivec2 c, ivec2 sz){ uvec4 u = texelFetch(uDH, clamp(c, ivec2(0), sz - 1), 0); return vec4(unpackHalf2x16(u.r).x, unpackHalf2x16(u.g).x, unpackHalf2x16(u.b).x, unpackHalf2x16(u.a).x); }
vec4 dyT(vec2 uv){ ivec2 sz = textureSize(uDH, 0); vec2 q = uv * vec2(sz) - 0.5, f = fract(q); ivec2 i = ivec2(floor(q));
  return mix(mix(dyF(i, sz), dyF(i + ivec2(1, 0), sz), f.x), mix(dyF(i + ivec2(0, 1), sz), dyF(i + ivec2(1, 1), sz), f.x), f.y); }
vec4 dyL(vec2 uv, float l){ return dyT(uv); }
`,zo=t=>(t=y0(t,"texture(uD, ","dyT("),t=y0(t,"uniform sampler2D uD; ","uniform usampler2D uD; "),t=y0(t,"out vec4 o;","out uvec4 oU; vec4 o;"+k+Gt.split("uDH").join("uD")),t=y0(t,"void main(){","void main0(){"),t+k+"uint hb16(float v){ return packHalf2x16(vec2(v, 0.0)); }"+k+"void main(){ main0(); oU = uvec4(hb16(o.r), hb16(o.g), hb16(o.b), hb16(o.a)); }"),Go=t=>(t=y0(t,"textureLod(uDy, ","dyL("),t=y0(t,"textureLod(uLt, vec2(suv.x, sp.y), 0.0).rgb","(textureLod(uLt, vec2(suv.x, sp.y), 0.0).rgb * 4.0)"),y0(t,"uniform sampler2D uBG, uDy, uMk, uIl, uN, uLt;","uniform sampler2D uBG, uMk, uIl, uN, uLt; uniform usampler2D uDy;"+k+Gt.split("uDH").join("uDy"))),Wo=t=>y0(t,"o = vec4(vC * exp(-x * x) * e, 1.0);","o = vec4(vC * exp(-x * x) * e * 0.25, 1.0);");let N=e.__p091;if(!N||!N.ready){const t=[],o=(r,i)=>{const f=e.createShader(r);return e.shaderSource(f,i),e.compileShader(f),t.push([f,i]),f},a=(r,i)=>{const f=e.createProgram();return e.attachShader(f,r),e.attachShader(f,i),f},n=o(e.VERTEX_SHADER,No),l=[Lo,Uo,Bo,Io,Do,$?Ct:zo(Ct),Co,Pt.replace("uniform vec4 uRk;","#define T1"+k+"uniform vec4 uRk;"),Po,$?_t:Go(_t)].map(r=>a(n,o(e.FRAGMENT_SHADER,r)));l.push(a(o(e.VERTEX_SHADER,_o),o(e.FRAGMENT_SHADER,$?zt:Wo(zt)))),l.push(a(n,o(e.FRAGMENT_SHADER,Pt.replace("uniform vec4 uRk;",k+"uniform vec4 uRk;"))));for(const r of l)e.linkProgram(r);e.flush(),N={ready:!1,progs:l,shaders:t,own:{}}}const[Se,Wt,qo,tt,Me,ke,qt,Ot,Yt,b0,ot,Kt]=N.progs,Xt=N.progs,Oo=ho(A(1)),ne=.55,at=new Uint32Array(S*M0*4),nt=new Float32Array(at.buffer);let q0=1e5;for(let t=0;t<M0;t++)for(let o=0;o<S;o++){const a=S-1-o,n=(t*S+o)*4,l=R[t*4]+(a+.5)*ne,r=R[t*4+1],i=t>=U;nt[n]=l,nt[n+1]=r,nt[n+2]=l<254&&!i?ne:0,at[n+3]=q0-a&16777215}if(!N.ready){for(const T of Xt)if(!e.getProgramParameter(T,e.LINK_STATUS)){let z=e.getProgramInfoLog(T);for(const[I,G]of N.shaders){const w0=e.getShaderInfoLog(I);w0&&(z+=k+w0+k+G.split(k).map((Ye,ia)=>ia+1+": "+Ye).join(k))}throw new Error("091 shader: "+z)}const t=T=>{const z={},I=e.getProgramParameter(T,e.ACTIVE_UNIFORMS);for(let G=0;G<I;G++){const w0=e.getActiveUniform(T,G);z[w0.name.replace("[0]","")]=e.getUniformLocation(T,w0.name)}return z};N.U=Xt.map(t);const[o,a,,n,l,r,,,,i,f]=N.U,v=(T,z,I,G)=>{e.useProgram(T),z[I]&&e.uniform1i(z[I],G)};v(Se,o,"uS",0),v(Se,o,"uM",1),v(Wt,a,"uM",1),v(tt,n,"uM",1),v(Me,l,"uP",2),v(Me,l,"uS",0),v(Me,l,"uM",1),v(ke,r,"uD",3),v(ke,r,"uS",0),v(ke,r,"uM",1),v(b0,i,"uBG",5),v(b0,i,"uDy",3),v(b0,i,"uMk",6),v(b0,i,"uIl",7),v(b0,i,"uN",4),v(b0,i,"uLt",8),v(ot,f,"uP",2),v(ot,f,"uIl",7),e.useProgram(tt),e.uniform4f(n.uL,St,Mt,1.2,0),e.uniform1i(n.uN,56),e.useProgram(Se),e.uniform4i(o.uI,w,C,9,w-30),N.shaders=null,N.ready=!0,e.__p091=N}const[Ht,st,Ne,va,Le,Ue,Vt,Zt,jt,Be,se,Qt]=N.U,Jt={};e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_ALIGNMENT,1);const _=(t,o,a,n,l,r,i,f)=>{const v=e.createTexture();return e.bindTexture(e.TEXTURE_2D,v),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,n,l,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,f||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,f||e.CLAMP_TO_EDGE),v},$t=_(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,Oo,e.LINEAR,e.REPEAT);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.generateMipmap(e.TEXTURE_2D);const Ie=[0,1].map(()=>_(w,C,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,null,e.NEAREST)),De=[0,1].map(t=>_(S,M0,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,t===0?at:null,e.NEAREST)),k0=512,N0=192,rt=[0,1].map(()=>$?_(k0,N0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.LINEAR):_(k0,N0,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,null,e.NEAREST)),re=_(w,C,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),L0=Math.min(2048,Math.max(128,Math.round((n0-O)*M/D[2]))),ce=Math.round(L0*C/w),eo=_(L0,ce,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),to=_(w,C,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),oo=(n0-O)*M/(w*D[2]),H=Math.min(1024,M),ao=_(H,H,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),Ce=Math.max(8,Math.round((x0-p0)*M/D[2])),no=$?_(M,Ce,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.LINEAR):_(M,Ce,e.SRGB8_ALPHA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR),u0=t=>{const o=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),o},Pe=Ie.map(u0),ct=De.map(u0),lt=rt.map(u0),Yo=u0(re),Ko=u0(eo),Xo=u0(to),Ho=u0(ao),Vo=u0(no);e.bindFramebuffer(e.FRAMEBUFFER,null);const le=e.createVertexArray(),E=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},U0=()=>{e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},Zo=[[.1,.1,.115],[.27,.31,.42],[.58,.4,.23]][Re],jo=[[.012,.012,.015],[.03,.034,.05],[.036,.028,.019]][Re],Qo=[[-.5,.86],[-.7,.7],[.55,.83]][Re],Jo=new Float32Array([...X,...i0,...ko]),so=(t,o)=>{const a=(l,r)=>{o[l]&&e.uniform1i(o[l],r)},n=(l,r)=>{o[l]&&e.uniform3fv(o[l],r)};a("uN",4),a("RM",Re),a("TU",Ze),a("SK",y),a("LI",be),n("LC",l0),n("KEY",Zo),n("AMB",jo),n("CA",X),n("CB",i0),o.KD&&e.uniform2fv(o.KD,Qo),o.uW&&e.uniform4f(o.uW,O,p0,n0,x0),o.WYT&&e.uniform1f(o.WYT,At),o.uRk&&e.uniform4f(o.uRk,r0,K,U,y===1||y===4?1:0)},it=(t,o)=>{e.useProgram(o),N.own[t]!==Jt&&(N.own[t]=Jt,t===9?(so(b0,Be),e.uniform2f(Be.uRes,M,M),e.uniform3fv(Be.uZ,D)):t===5?e.uniform4f(Ue.uR,Lt,r0,P?K/2:K,P?2*U-1:U):t===10&&(e.uniform3fv(se.uCol,Jo),e.uniform3fv(se.uZ,D)))};for(const[t,o]of[[qt,Vt],[Ot,Zt],[Yt,jt],[Kt,Qt]])e.useProgram(t),so(t,o),e.uniform3fv(o.uZ,D);U0(),e.bindVertexArray(le),E(4,$t),e.bindFramebuffer(e.FRAMEBUFFER,Ho),e.viewport(0,0,H,H),e.useProgram(qt),e.uniform2f(Vt.uRes,H,H),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(Yt),e.uniform2f(jt.uRes,H,H),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(Ot),e.uniform2f(Zt.uRes,H,H),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(Kt),e.uniform2f(Qt.uRes,H,H),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND);let ie=!0,O0=null;const $o=()=>{if(F||c===6)return null;const t=Te(c),o=1+3*256/L0,a=Math.cos(L),n=Math.sin(L),l=b+Y;let r=1e9,i=-1e9,f=1e9,v=-1e9;for(const I of[t[0]-o,t[1]+o])for(const G of[t[2]-o,t[3]+o]){const w0=h+I*a+G*n,Ye=l-I*n+G*a;r=Math.min(r,w0),i=Math.max(i,w0),f=Math.min(f,Ye),v=Math.max(v,Ye)}const T=L0/256,z=ce/96;return[Math.max(0,Math.floor(r*T)-2&-2),Math.max(0,Math.floor(f*z)-2&-2),Math.min(L0,Math.ceil(i*T)+3&-2),Math.min(ce,Math.ceil(v*z)+3&-2)]};function ut(){U0(),e.bindVertexArray(le),e.useProgram(qo);const t=Je?3.6*s:0;e.uniform4f(Ne.uO,c,h,b+Y,L),e.uniform4f(Ne.uO2,s,c===0?t:0,F&&c===2?1:0,W),e.bindFramebuffer(e.FRAMEBUFFER,Yo),e.viewport(0,0,w,C),e.uniform2f(Ne.uRes,w,C),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,Ko),e.viewport(0,0,L0,ce),e.uniform2f(Ne.uRes,L0,ce);const o=$o();if(o&&O0){const a=Math.min(o[0],O0[0]),n=Math.min(o[1],O0[1]),l=Math.max(o[2],O0[2]),r=Math.max(o[3],O0[3]);e.enable(e.SCISSOR_TEST),e.scissor(a,n,l-a,r-n),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.SCISSOR_TEST)}else e.drawArrays(e.TRIANGLES,0,3);O0=o,E(1,re),e.useProgram(tt),e.bindFramebuffer(e.FRAMEBUFFER,Xo),e.viewport(0,0,w,C),e.drawArrays(e.TRIANGLES,0,3),ie=!1}ut();let B=0,f0=0,R0=0,B0=0,Y0=0,K0=0,_e=0,X0=0,ue=0,H0=0;const ze=()=>{const t=.03+.07*B,o=5*Math.pow(80,B),a=t*(c===6?2*W:s)/o,n=Math.max(.5045,3*a+.5);return{Uin:t,Re:o,tau:n}},ro=t=>g($0[0]+$0[1]*Math.sin(2*p*(t/96+Xe))+$0[2]*Math.sin(2*p*(t/23+he)),$0[3],$0[4]);B=f0=u.home?.68:ro(((.15+.2*he-Xe)%1+1)%1*96);function ea(){const t=ze();U0(),e.bindVertexArray(le),e.useProgram(Wt);const o=t.Re>50&&(c===0||c===2||c===3||c===4)&&!$e&&!F,a=c===2?2*s*Math.abs(Math.sin(L))+2:c===3?.84*s:s;e.uniform4f(st.uA,t.Uin,a,h,b),e.uniform4f(st.uB,o?1:0,4.6*a,1.15*a,2.3*t.Uin*a),e.uniform1i(st.uNV,o?12:0),E(1,re),e.bindFramebuffer(e.FRAMEBUFFER,Pe[0]),e.viewport(0,0,w,C),e.drawArrays(e.TRIANGLES,0,3),R0=0}ea();function co(t){ie&&ut();const o=ze();K0+=Math.min(t,.25)*30*(9+9*B);let a=Math.floor(K0);if(K0-=a,a>Tt&&(a=Tt,K0=0),U0(),e.bindVertexArray(le),E(1,re),a>0){e.useProgram(Se);const r=$e&&c===0?1.7*o.Uin/(s/2):0;e.uniform4f(Ht.uA,o.Uin,0,o.tau,.022),e.uniform4f(Ht.uB,h,b+Y,r,te&&c===0?Ee:0),e.viewport(0,0,w,C);for(let i=0;i<a;i++)e.bindFramebuffer(e.FRAMEBUFFER,Pe[R0^1]),E(0,Ie[R0]),e.drawArrays(e.TRIANGLES,0,3),R0^=1;r&&(Fe-=r*a)}if(E(0,Ie[R0]),H0+=a,H0>0){const r=H0;H0=0;const i=_e+o.Uin*r;let f=Math.floor(i/ne);f>S/4&&(f=S/4),e.useProgram(Me),e.uniform4fv(Le.uE,R),e.uniform4f(Le.uK,X0,f,i,ne),e.uniform4f(Le.uV,r,o.Re>160?g((o.Re-160)/240,0,1)*(P||F?.3:1):0,ue*.05,o.Uin),e.uniform4i(Le.uI,S,r*o.Uin>1?2:1,Math.round(g(V,0,1)*255),q0),e.bindFramebuffer(e.FRAMEBUFFER,ct[B0^1]),e.viewport(0,0,S,M0),E(2,De[B0]),e.drawArrays(e.TRIANGLES,0,3),B0^=1,_e=i-f*ne,q0+=f,X0=(X0+f)%S}E(2,De[B0]),it(5,ke);const n=o.Uin*a/1.2;e.uniform4f(Ue.uH,a,Math.pow(.9975,a/10),V*.17*n,(y===2?.4:P?ta():ee?.36:.3)*n),e.uniform4f(Ue.uQ,c0?1:P?2+Eo*n:0,y===5?1:0,y===1?0:1,ue*.37);const l=U*4;return e.uniform4f(Ue.uPt,R[l],R[l+1],R[l+4],R[l+5]),e.bindFramebuffer(e.FRAMEBUFFER,lt[Y0^1]),e.viewport(0,0,k0,N0),E(3,rt[Y0]),e.drawArrays(e.TRIANGLES,0,3),Y0^=1,ue++,a}function ta(){const t=((q0-5)%ae+ae)%ae,o=Math.min(t,ae-t);return Fo*Math.exp(-o*o/1.5)}const lo=new Float32Array(36),v0=new Float32Array(20),oa=F?2:F0==="Large"&&A0?1:0;let fe=1,V=0,Ge=0;function io(t){U0(),e.bindVertexArray(le),E(0,Ie[R0]),E(1,re),E(2,De[B0]),E(3,rt[Y0]),E(4,$t),E(5,ao),E(6,eo),E(7,to),E(8,null),e.bindFramebuffer(e.FRAMEBUFFER,Vo),e.viewport(0,0,M,Ce),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),it(10,ot);const o=(X0-1+S)%S,a=y===1||y===4,n=(a?.5:y===2?1.15:.9)*(ee?1.1:1)*fe;v0.set([o,S,(a?.2:y===2?.5:ee?.46:.38)*oo,.62,O,p0,n0,x0,M,n*(He?.45:P?.3:1),Ce,0,P?1:0,a?.7:1.3,0,a?2.5:16,Mo,ae,2,0]),e.uniform4fv(se.uLn,v0),e.uniform4fv(se.uE,R),P||e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,M0*S),(He||P)&&(v0[9]=n*2.4,v0[11]=K,v0[14]=U,v0[15]=P?1.5*K:Math.min(16,70/oo),P&&(v0[2]*=1.8,v0[9]=n*To),e.uniform4fv(se.uLn,v0),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,(U-1)*S)),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,M,M),E(8,no),it(9,b0),lo.set([t,fe,B,Fe,h,b+Y,s,c,l0[0],l0[1],l0[2],be===0?1:0,X[0],X[1],X[2],Ge,i0[0],i0[1],i0[2],Ze,O,p0,n0,x0,St,Mt,f0,At,Je&&c===0?1:0,0,L,W,oa,0,0,0]),e.uniform4fv(Be.uC,lo),e.drawArrays(e.TRIANGLES,0,3)}const ve=11025,uo=new Float32Array(4096);let I0=0,We=0,qe=0,ft=0,vt=0,D0=(A(7)|1)>>>0,mt=0,pt=0,xt=0,Oe=40,ht=400;function aa(t){return $e&&c===0?.25:te&&c===0?1.2*g((t.Re-40)/30,0,1):c===1||c===5?g((Math.abs(L)*180/p-12)/6,0,1)*g((t.Re-40)/40,0,1)*.8:g((t.Re-45)/30,0,1)*(1-.6*g((t.Re-220)/180,0,1))}function na(t){if(!u.sound.on)return;const o=Math.min(4096,Math.round(t*ve));if(o<8)return;const a=ze(),n=.3*(.25+B),l=.55*B*B+V*.5,r=.16*aa(a),i=32+70*B,f=300+760*B;for(let v=0;v<o;v++){mt+=(n-mt)*.0015,pt+=(l-pt)*.0015,xt+=(r-xt)*.0015,Oe+=(i-Oe)*.0015,ht+=(f-ht)*.0015,I0+=Oe/ve,I0>1&&(I0-=1),We+=Oe*4.03/ve,We>1&&(We-=1),qe+=ht*(1+.004*Math.sin(I0*6.283))/ve,qe>1&&(qe-=1),D0^=D0<<13,D0^=D0>>>17,D0^=D0<<5;const z=(D0>>>0)/2147483648-1,I=.05+.25*B;ft+=(z-ft)*I,vt+=(ft-vt)*I;const G=Math.sin(I0*6.2832)*.6+Math.sin(I0*12.566)*.25+Math.sin(I0*18.85)*.12+Math.sin(We*6.2832)*.06;uo[v]=mt*G+pt*vt*2.2+xt*Math.sin(qe*6.2832)}u.sound.pcm(uo.subarray(0,o),ve,{vel:.6})}let m=null,me=99,V0=99,sa=0;const fo=(t,o)=>[(D[0]+t*D[2]-O)/(n0-O)*w,(D[1]+(1-o)*D[2]-p0)/(x0-p0)*C];function ra(t,o){const a=Te(c),n=Math.cos(L),l=Math.sin(L),r=t-h,i=o-(b+Y),f=c===0?r:r*n-i*l,v=c===0?i:r*l+i*n,T=10;if(F){const I=c===2?2:.5*s,G=c===2?s:.5*s;return Math.abs(r)<I+T&&o<G+T?1:0}if(c===6){const I=(i%ge+1.5*ge)%ge-.5*ge;return Math.abs(r)<W+6&&Math.abs(I)<W+6?1:0}if(f<a[0]-T||f>a[1]+T||v<a[2]-T||v>a[3]+T)return 0;if(c===0||c===3)return 1;const z=c===4?.3*s:Math.max(6,.28*(a[1]-a[0])/2);return Math.abs(f)<z?1:2}function ca(){W0[c]=s0;const t=G0.indexOf(c);c=G0[(t+1)%G0.length],L=s0=W0[c];const o=Te(c);h0=g(h0,kt-o[0],Math.min(120,Nt-o[1])),h=h0,c===6&&(S0=48),F&&(S0=b=0),Y=0,ie=!0,Ae(),sa=.25,u.sound.hit("click",.5),u.sound.note(72+G0.indexOf(c)*2,{dur:.12,vel:.2,wave:"sine"})}function la(t){const o=u.input;if(o.taps(),o.down&&o.inside!==!1&&!m){const[a,n]=fo(o.x,o.y),l=ra(a,n);m={x:o.x,y:o.y,t:0,mode:0,om:l,sx:a,sy:n,ox:h0,oy:S0,a0:Math.atan2(n-b,a-h),ang0:s0,s0:f0}}if(m)if(me=0,o.down){m.t+=t;const a=Math.hypot(o.x-m.x,o.y-m.y);m.mode===0&&a>.015?m.mode=m.om===1?2:m.om===2?3:1:m.mode===0&&m.t>.32&&(m.mode=4,u.sound.hit("noise",.45,{cutoff:900,dur:.7}));const[n,l]=fo(o.x,o.y);if(m.mode===1)f0=g(m.s0+(m.y-o.y)*1.5,0,1);else if(m.mode===2){V0=0;const r=Te(c);h0=g(m.ox+n-m.sx,kt-r[0],A0?Nt-r[1]:130),S0=c===6?48:F?0:g(m.oy+l-m.sy,8-r[2]+(te?.3*s:0),88-r[3]-(te?.3*s:0))}else if(m.mode===3){V0=0;let i=Math.atan2(l-b,n-h)-m.a0;for(;i>p;)i-=2*p;for(;i<-p;)i+=2*p;const f=c===2?[-p/2,p/2]:c===4?[-p/4,p/4]:[-.5,.62];s0=g(m.ang0-i,f[0],f[1])}else m.mode===4&&(V=Math.min(1,V+t*4))}else m.mode===0&&(m.om?ca():(V=Math.max(V,.7),u.sound.hit("noise",.3,{cutoff:700,dur:.4}))),m=null;else me+=t}let Z0=((.15+.2*he-Xe)%1+1)%1*96,vo=0;function dt(t,o){la(t),V0+=t,Z0+=t,me>8&&(f0+=(ro(Z0)-f0)*Math.min(1,t*.5)),B+=(f0-B)*Math.min(1,t*1.2),V0>10&&!m&&!F&&(c===1||c===5?s0=(8+9*Math.sin(2*p*(Z0/41+he)))*p/180:c===2&&(s0=(78+12*Math.sin(2*p*Z0/53))*p/180));const a=s0-L,n=h0-h,l=S0-b;if(Math.abs(a)>1e-4||Math.abs(n)>.01||Math.abs(l)>.01){const r=Math.min(1,t*6);L+=a*r,h+=n*r,b+=l*r,ie=!0,Ae()}if(te&&c===0){const r=ze(),i=Math.min(t,.25)*30*(9+9*B),f=2*p*.2*r.Uin/s,v=.28*s*g((r.Re-35)/30,0,1);oe+=f*i,Y=v*Math.sin(oe),Ee=v*f*Math.cos(oe),ie=!0,Ae()}fe=be===0?1+.03*(.6*Math.sin(o*4.3)+.4*Math.sin(o*2.9)):1,Ge=V*.25,m&&m.mode===4||(V=Math.max(0,V-t*2.2))}const mo=u.hash+(u.home?":h":""),yt=u.input,po=!(yt&&yt.down&&yt.inside!==!1),C0=N.sims||(N.sims=[]),P0=po?C0.find(t=>t.key===mo):null,j0=(t,o,a,n)=>{e.bindFramebuffer(e.READ_FRAMEBUFFER,t),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,o),e.blitFramebuffer(0,0,a,n,0,0,a,n,e.COLOR_BUFFER_BIT,e.NEAREST)};if(P0){C0.splice(C0.indexOf(P0),1),C0.push(P0),U0(),j0(P0.f[0],Pe[0],w,C),j0(P0.f[1],ct[0],S,M0),j0(P0.f[2],lt[0],k0,N0),e.bindFramebuffer(e.FRAMEBUFFER,null);const t=P0.js;[B,f0,K0,_e,X0,ue,H0,q0,Fe,oe,Y,Ee,L,s0,h,b,h0,S0,me,V0,Z0,V,Ge,fe,c]=t,R.set(t[25]);for(let o=0;o<W0.length;o++)W0[o]=t[26][o];R0=B0=Y0=0,ut()}else{for(let t=0,o=P?150:70;t<o;t++)dt(1/30,0),co(1/30);if(po){let t=C0.length>=2?C0.shift():null;if(!t){const o=[_(w,C,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,null,e.NEAREST),_(S,Et,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,null,e.NEAREST),$?_(k0,N0,e.RGBA16F,e.RGBA,e.HALF_FLOAT,null,e.NEAREST):_(k0,N0,e.RGBA16UI,e.RGBA_INTEGER,e.UNSIGNED_SHORT,null,e.NEAREST)];t={t:o,f:o.map(u0)}}U0(),j0(Pe[R0],t.f[0],w,C),j0(ct[B0],t.f[1],S,M0),j0(lt[Y0],t.f[2],k0,N0),e.bindFramebuffer(e.FRAMEBUFFER,null),t.key=mo,t.js=[B,f0,K0,_e,X0,ue,H0,q0,Fe,oe,Y,Ee,L,s0,h,b,h0,S0,me,V0,Z0,V,Ge,fe,c,R.slice(),W0.slice()],C0.push(t)}}return dt(0,0),io(0),(t,o)=>{o=Math.min(.25,Math.max(.001,o||t-vo)),vo=t,dt(o,t),co(o),io(t),na(o)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
