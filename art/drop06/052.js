// Paper Boats: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/052.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ta){ta&&function(){"use strict";const oa=new WeakMap,Ge=Math.PI*2,r0=Math.PI/180,ee=(a,t,c)=>a<t?t:a>c?c:a,V0=(a,t,c)=>a+(t-a)*c,st=(a,t,c)=>{const E=ee((c-a)/(t-a),0,1);return E*E*(3-2*E)},H=64,se=160,xe=.0125,wt=-.2,te=.25,po=wt+H*xe,Ft=te+se*xe,aa=1024,sa=1024,c0=128,G0=256,f0=.02,l0=40,gs=640,O0=640,xo=14,Oe={"Kerb height":{home:1,eye:[.05,.15,0],yaw:-6,pitch:18,fov:15.5,za:.12,zr:5.6,kx:1.05,zo:.12,rot:0},"Looking upstream":{eye:[.08,.15,.45],yaw:188,pitch:18,fov:15.5,za:.12,zr:5.6,kx:1.05,zo:.12,rot:1,fd:1}};Oe["Looking down"]={eye:[.08,.62,.46],yaw:-7,pitch:62,fov:15.5,za:.4,zr:1.25,kx:.74,zo:.12,rot:0,fd:1.7};const Ps=a=>{const t=a.eye,c=a.yaw*r0,E=a.pitch*r0,w=Math.tan(a.fov*r0),T=a.rot?c:0,k=Math.cos(T),K=Math.sin(T),m=a.rot?t[0]*K+t[2]*k:0,V=a.za+m,f=a.zr,we=a.kx,z=a.zo-m,g=a.rot?t[0]*k-t[2]*K:t[0],h=Math.tan(T-c),F=a.rot?(L,G)=>{const W=L*k-G*K,ve=L*K+G*k,v0=Math.sqrt(Math.max(ve-V,0)/f);return[.5+(W-g+h*ve)/(we*(ve+z)),v0]}:(L,G)=>{const W=Math.sqrt(Math.max(G-V,0)/f);return[.5+(L-t[0]+h*G)/(we*(G+z)),W]},y=a.rot?(L,G)=>{const W=V+f*G*G,ve=g-h*W+(L-.5)*we*(W+z);return[ve*k+W*K,W*k-ve*K]}:(L,G)=>{const W=V+f*G*G;return[t[0]-h*W+(L-.5)*we*(W+z),W]},d=a.home?null:new Float32Array([V,f,we,z,g,h,k,K,-9,0,0,0]),x=[Math.sin(c)*Math.cos(E),-Math.sin(E),Math.cos(c)*Math.cos(E)],p=(()=>{const L=Math.hypot(x[2],x[0]);return[x[2]/L,0,-x[0]/L]})(),A=[x[1]*p[2]-x[2]*p[1],x[2]*p[0]-x[0]*p[2],x[0]*p[1]-x[1]*p[0]],B=(()=>{const L=f0,G=l0,W=1/w,ve=[p[0],A[0],-x[0],0,p[1],A[1],-x[1],0,p[2],A[2],-x[2],0,-(p[0]*t[0]+p[1]*t[1]+p[2]*t[2]),-(A[0]*t[0]+A[1]*t[1]+A[2]*t[2]),x[0]*t[0]+x[1]*t[1]+x[2]*t[2],1],v0=[W,0,0,0,0,W,0,0,0,0,(G+L)/(L-G),-1,0,0,2*G*L/(L-G),0],de=new Float32Array(16);for(let zt=0;zt<4;zt++)for(let ge=0;ge<4;ge++){let Ot=0;for(let nt=0;nt<4;nt++)Ot+=v0[nt*4+ge]*ve[zt*4+nt];de[zt*4+ge]=Ot}return de})();return{EYE:t,TANF:w,CF:x,CR:p,CU:A,VP:B,rayDir:(L,G)=>{const W=L*2-1,ve=1-G*2;return[x[0]+W*w*p[0]+ve*w*A[0],x[1]+W*w*p[1]+ve*w*A[1],x[2]+W*w*p[2]+ve*w*A[2]]},toUVj:F,fromUVj:y,W:d}},Vt=(()=>{const a=-6*r0;return{ZA:.12.toFixed(3),ZR:5.6.toFixed(3),KX:1.05.toFixed(3),ZO:.12.toFixed(3),XE:.05.toFixed(4),TY:Math.tan(-a).toFixed(6)}})(),ks=`const float ZA=${Vt.ZA},ZR=${Vt.ZR},KX=${Vt.KX},ZO=${Vt.ZO},XE=${Vt.XE},TY=${Vt.TY};`,As=`#define GEN
uniform vec4 uW[3];   // ZA, ZR, KX, ZO | XE, TY, cos and sin of the map's yaw | water level upstream of the sim
#define ZA uW[0].x
#define ZR uW[0].y
#define KX uW[0].z
#define ZO uW[0].w
#define XE uW[1].x
#define TY uW[1].y
vec2 rotW(vec2 p){ return vec2(p.x*uW[1].z-p.y*uW[1].w,p.x*uW[1].w+p.y*uW[1].z); }
vec2 unrotW(vec2 p){ return vec2(p.x*uW[1].z+p.y*uW[1].w,p.y*uW[1].z-p.x*uW[1].w); }`,na=(a,t)=>`const int NX=${H},NZ=${se}; const float CL=${xe},SX0=${wt},SZ0=${te};
const vec2 SDS=vec2(${(H*xe).toFixed(4)},${(se*xe).toFixed(4)});
${a}
vec2 toUV(vec2 p){ ${t?"p=rotW(p); ":""}return vec2(.5+(p.x-XE+TY*p.y)/(KX*(p.y+ZO)),sqrt(max(p.y-ZA,0.)/ZR)); }
vec2 fromUV(vec2 uv){ float z=ZA+ZR*uv.y*uv.y; return ${t?"unrotW(":""}vec2(XE-TY*z+(uv.x-.5)*KX*(z+ZO),z)${t?")":""}; }
vec2 simUV(vec2 p){ return (p-vec2(SX0,SZ0))/SDS; }
float hs1(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
vec2 hs2(vec2 p){ vec3 q=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); q+=dot(q,q.yzx+33.33); return fract((q.xx+q.yz)*q.zy); }
`,_e=na(ks,0),yo=na(As,1),be=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,Ms=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform int uOne;   // always 1: bounds the loops so the driver can't unroll them (compile time)
in vec2 vUv; out vec4 o;
float hs(vec2 p,float P){ p=mod(p,P); return fract(sin(dot(p,vec2(127.1,311.7))+P*.137)*43758.5453); }
float vn(vec2 x,float P){ vec2 i=floor(x),f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(hs(i,P),hs(i+vec2(1.,0.),P),f.x),mix(hs(i+vec2(0.,1.),P),hs(i+vec2(1.),P),f.x),f.y); }
vec2 fb2(vec2 u){ vec2 t=vec2(0.); float a=.5,s=0.,P=4.; for(int k=0;k<5*uOne;k++){ t+=a*vec2(vn(u*P,P),vn(u*P*2.+17.,P*2.)); s+=a; a*=.5; P*=2.; } return t/s; }
void main(){
  vec2 u=vUv;
  vec2 c=u*16.; vec2 ci=floor(c); float f1=9.,f2=9.;
  for(int j=-uOne;j<=uOne;j++) for(int i=-uOne;i<=uOne;i++){ vec2 g=ci+vec2(float(i),float(j)); vec2 pp=g+.15+.7*vec2(hs(g,16.),hs(g+31.,16.)); float d=length(pp-c); if(d<f1){f2=f1;f1=d;} else if(d<f2) f2=d; }
  float e=clamp((f2-f1)*1.6,0.,1.);
  vec2 fb=fb2(u);
  o=vec4(e,fb.x,fb.y,vn(u*128.,128.)*.6+hs(floor(u*256.),256.)*.4);
}`,Fs=`
uniform vec4 uGeo[12]; uniform int uOne;
float sharp(vec2 p){
  float xk=uGeo[0].x, kh=uGeo[0].y, chW=uGeo[0].z, h=0.;
  if(kh>0.) h+=kh*smoothstep(xk+.002,xk-.007,p.x);
  float cm=smoothstep(xk-.01,xk+.003,p.x)*smoothstep(xk+chW+.06,xk+chW-.01,p.x);
  h-=uGeo[1].y*smoothstep(uGeo[1].x-.004,uGeo[1].x+.004,p.y)*cm;
  for(int i=3;i<12*uOne;i++){ vec4 s=uGeo[i]; if(s.z<=0.) continue; vec2 d=(p-s.xy)/s.z;
    if(s.w<0.){ float ca=cos(s.x*37.),sa=sin(s.x*37.); vec2 l=abs(vec2(d.x*ca+d.y*sa,-d.x*sa+d.y*ca))/vec2(1.55,.78); float q=1.-max(l.x,l.y); if(q>0.) h+=-s.w*smoothstep(0.,.32,q); }
    else { float nn=textureLod(uN,p*vec2(9.,11.)+s.xy*7.,1.).g-.5; float q=1.-dot(d,d)+.5*nn; if(q>0.){ float t=clamp(q/.8,0.,1.); t=1.-(1.-t)*(1.-t); h+=s.w*t*(1.+.5*nn); } } }
  int dk=int(uGeo[1].z+.5); float zd=uGeo[1].w;
  if(dk==0){ vec2 q=abs(p-vec2(xk+.1,zd)); if(q.x<.095&&q.y<.16) h-=.004; }
  else if(dk==1){ float m=smoothstep(.17,.13,abs(p.y-zd)); h-=.007*m*smoothstep(xk+.12,xk,p.x); }
  else { h+=.13*smoothstep(zd-.003,zd+.003,p.y); }
  return h;
}`,ia=a=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uM,uN;
in vec2 vUv; out vec4 o;
${a}
${Fs}
vec3 vor(vec2 q){ vec2 i=floor(q), f=fract(q); float d1=9.,d2=9.; vec2 id=vec2(0.);
  for(int y=-uOne;y<=uOne;y++) for(int x=-uOne;x<=uOne;x++){ vec2 g=vec2(float(x),float(y)); vec2 r=g+.12+.76*hs2(i+g)-f; float d=dot(r,r); if(d<d1){ d2=d1; d1=d; id=i+g; } else if(d<d2) d2=d; }
  return vec3((sqrt(d2)-sqrt(d1))*.5,hs1(id),sqrt(d1)); }
// rectangular units of size s, rows offset by off; returns (edge distance m, id, local tilt)
vec3 rect(vec2 p,vec2 s,float off,float jit){ float row=floor(p.y/s.y); float sx=s.x*(1.+jit*(hs1(vec2(row,7.))-.5)); vec2 q=vec2(p.x/sx+off*row+hs1(vec2(row,3.))*jit,p.y/s.y); vec2 c=floor(q), f=fract(q);
  vec2 e=min(f,1.-f)*vec2(sx,s.y); return vec3(min(e.x,e.y),hs1(c+vec2(row*.37,1.)),0.); }
// h, joint, id, material: 0 street 1 channel 2 kerb 3 pavement 4 iron 5 moss 6 gravel 7 wall 8 hole
vec4 F(vec2 p){
  float xk=uGeo[0].x, kh=uGeo[0].y, chW=uGeo[0].z; int sk=int(uGeo[2].x+.5);
  float h=texture(uM,toUV(p)).r+sharp(p);
  float nz=texture(uN,p*1.7).g-.5, nf=texture(uN,p*6.1).b-.5;
  float joint=0., id=0., mat=0., m=0.;
  vec3 rK=rect(p.yx,p.x>xk-.3?vec2(.9,.3):vec2(.6,.5),p.x>xk-.3?0.:.5,p.x>xk-.3?.3:.4);
  vec3 rC=rect(p.yx-vec2(0.,xk),sk==2?vec2(.215,.069):sk==4?vec2(1.5,.26):vec2(.14,.088),sk==4?0.:.5,sk==2||sk==4?0.:.4);
  vec3 rS=rect(p,sk==1?vec2(.11,.095):vec2(.215,.069),.5,sk==1?.35:0.);
  vec3 vv=vor(p/(sk==0?vec2(.064,.054):vec2(.019)));   // one call site: cobbles or gravel, per mint
  bool kerbSide=p.x<xk+.003, chan=!kerbSide&&p.x<xk+chW;
  if(kerbSide){
    if(sk==3){ mat=5.; id=texture(uN,p*.9).b; m=.004*nz+.0025*nf+.0015*(texture(uN,p*14.).a-.5); joint=0.; }
    else if(p.x>xk-.3){ vec3 r=rK; mat=2.; id=r.y; joint=1.-smoothstep(.0015,.004,r.x); m=-.003*joint+.0012*nf; m-=.006*(1.-smoothstep(0.,.012,xk-p.x)); }
    else { vec3 r=rK; mat=3.; id=r.y; joint=1.-smoothstep(.002,.005,r.x); m=-.004*joint+.0015*nf+.002*(r.y-.5); }
  } else if(chan){
    mat=1.;
    if(sk==3){ float z=p.y/.45; float e=min(fract(z),1.-fract(z))*.45; id=hs1(vec2(floor(z),5.)); joint=1.-smoothstep(.002,.005,e); m=-.003*joint+.0018*nf+.001*nz; }
    else if(sk==2){ vec3 r=rC; id=r.y; joint=1.-smoothstep(.003,.007,r.x); m=.003*smoothstep(0.,.01,r.x)-.002+.001*nf; }
    else if(sk==4){ vec3 r=rC; id=.4+.2*r.y; joint=1.-smoothstep(.0015,.004,r.x); m=-.003*joint+.0012*nf+.0006*nz; }
    else { vec3 r=rC; id=r.y; joint=1.-smoothstep(.0015,.005,r.x); m=.004*smoothstep(0.,.012,r.x)-.003+.002*(r.y-.5)+.001*nf; }
  } else {
    if(sk==0){ vec3 v=vv; id=v.y; float e=v.x*.059; joint=1.-smoothstep(.0015,.005,e); float dm=1.-pow(1.-clamp(e/(.016+.01*id),0.,1.),2.); m=.008*dm*(.7+.6*fract(id*13.7))+.002*(id-.5)-.005+.001*nf; }
    else if(sk==1){ vec3 r=rS; id=r.y; joint=1.-smoothstep(.002,.006,r.x); m=.006*smoothstep(0.,.015,r.x)-.003+.002*(id-.5)+.0012*nf; }
    else if(sk==2){ vec3 r=rS; id=r.y; joint=1.-smoothstep(.003,.007,r.x); m=.003*smoothstep(0.,.01,r.x)-.002+.001*nf+.0012*(id-.5); }
    else if(sk==4){ id=texture(uN,p*37.).a; joint=0.; m=.0005*nf+.0009*(texture(uN,p*61.).a-.5); float pl=abs(abs(p.x-(xk+chW+.075))-.028); if(pl<.018){ mat=10.; id=texture(uN,p*5.).b; m+=.0007; } }
    else { vec3 v=vv; id=v.y; mat=6.; joint=1.-smoothstep(.0,.25,v.x); m=.004*sqrt(clamp(v.x*3.,0.,1.))+.002*(id-.5); float ms=smoothstep(.05,.15,nz+.08-(p.x-xk-chW)*.6); if(ms>.5){ mat=5.; m=m*.4+.004*nf; } }
  }
  for(int i=3;i<12*uOne;i++){ vec4 s=uGeo[i]; if(s.z<=0.) continue; vec2 d=(p-s.xy)/s.z; float r=length(d);
    if(s.w<0.){ float ca=cos(s.x*37.),sa=sin(s.x*37.); vec2 l=abs(vec2(d.x*ca+d.y*sa,-d.x*sa+d.y*ca))/vec2(1.55,.78); if(max(l.x,l.y)<1.){ mat=11.; id=fract(s.x*91.7+s.y*13.1); joint=0.; m=.0016*nf+.001*(nz); } }
    else { float nn=textureLod(uN,p*vec2(9.,11.)+s.xy*7.,1.).g-.5; r=r-.32*nn; if(r<1.){ mat=9.; id=fract(s.x*91.7+s.y*13.1); joint=0.; m=.002*nf+.0014*(textureLod(uN,p*34.,1.).a-.5); } else if(r<1.2) joint=max(joint,.25); } }
  int dk=int(uGeo[1].z+.5); float zd=uGeo[1].w;
  if(dk==0){ vec2 q=p-vec2(xk+.1,zd); vec2 a=abs(q); if(a.x<.095&&a.y<.16){ mat=4.; joint=0.; id=.5; m=.0006*nf;
      if(a.x<.077&&a.y<.142){ float b=fract(q.x/.026+.5); if(abs(b-.5)<.24){ mat=8.; m=-.05; } } } }
  else { if(p.y>zd-.001){ if(p.y<zd+.004){ mat=7.; id=hs1(floor(vec2(p.x/.3,0.))); } else { mat=6.; id=vv.y; m=.003*sqrt(clamp(vv.x*3.,0.,1.)); } } }
  return vec4(h+m,joint,id,mat/16.);
}
void main(){ o=F(fromUV(vUv)); }`,ra=a=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uA; uniform vec3 uL; uniform float uSoft; uniform vec4 uGeo[12]; uniform int uOne;
in vec2 vUv; out vec4 o;
${a}
float H(vec2 p){ return textureLod(uA,toUV(p),0.).r; }
void main(){
  vec2 px=1./vec2(textureSize(uA,0));
  vec2 P=fromUV(vUv);
  vec2 pu=fromUV(vUv+vec2(px.x,0.))-fromUV(vUv-vec2(px.x,0.)), pv=fromUV(vUv+vec2(0.,px.y))-fromUV(vUv-vec2(0.,px.y));
  float a=texture(uA,vUv+vec2(px.x,0.)).r-texture(uA,vUv-vec2(px.x,0.)).r, b=texture(uA,vUv+vec2(0.,px.y)).r-texture(uA,vUv-vec2(0.,px.y)).r;
  float det=pu.x*pv.y-pu.y*pv.x; vec2 g=vec2(a*pv.y-b*pu.y,b*pu.x-a*pv.x)/det;
  g=clamp(g,-30.,30.);
  float h0=texture(uA,vUv).r;
  float av=0.; for(int i=0;i<6*uOne;i++){ float an=float(i)*1.0472; av+=H(P+vec2(cos(an),sin(an))*.012)+H(P+vec2(cos(an+.5),sin(an+.5))*.04)*.5; }
  float cav=clamp((av/9.-h0)*28.,-1.,1.);
  vec2 ld=normalize(uL.xz); float te=uL.y/max(length(uL.xz),1e-4);
  float occ=0., t=.002, us=uSoft*(length(g)>2.5?7.:1.);
  for(int i=0;i<22*uOne;i++){ float dh=H(P+ld*t)-h0-t*te; occ=max(occ,dh/(t*us+.0015)); t*=1.3; }
  // the stones and bricks stand on thin footprints that the geometric march steps over: walk the chord across each one
  for(int i=3;i<12*uOne;i++){ vec4 s=uGeo[i]; if(s.z<=0.) continue; vec2 c=P-s.xy; float R=s.z*1.75, bq=dot(c,ld), dq=bq*bq-dot(c,c)+R*R; if(dq<=0.) continue;
    float sq=sqrt(dq), t0=max(-bq-sq,.0015), t1=-bq+sq; if(t1<=t0) continue;
    for(int k=0;k<14*uOne;k++){ float tk=t0+(t1-t0)*(float(k)+.5)/14., dh=H(P+ld*tk)-h0-tk*te; occ=max(occ,dh/(tk*us+.0015)); } }
  o=vec4(g,.5+.5*cav,1.-clamp(occ,0.,1.));
}`,Rs=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF,uB;
uniform vec4 uP[3];  // dt, fric, vort, - | push x,z,r,s | push dx,dz
uniform vec4 uBt[36]; uniform int uNB; // hulls: x,z,cos,sin | 1/a2,1/b2,head,- | vx,vz,-,-
uniform vec4 uSt[9];   // stones: x,z,r,amplitude
uniform int uOne;
out vec4 o;
${_e}
float eta(ivec2 q){ vec4 s=texelFetch(uS,q,0); return texelFetch(uB,q,0).r+s.x+s.y; }
vec4 Sa(ivec2 q){ return texelFetch(uS,clamp(q,ivec2(0),ivec2(NX-1,NZ-1)),0); }
float cu(ivec2 q){ return Sa(q+ivec2(1,0)).a-Sa(q-ivec2(1,0)).a-Sa(q+ivec2(0,1)).b+Sa(q-ivec2(0,1)).b; }
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uS,p,0); float bd=texelFetch(uB,p,0).r;
  float dt=uP[0].x;
  float e=bd+s.x+s.y;
  float eL=p.x>0?eta(p+ivec2(-1,0)):e+1., eR=p.x<NX-1?eta(p+ivec2(1,0)):e+1., eB=p.y>0?eta(p+ivec2(0,-1)):e+1.;
  float eT=p.y<NZ-1?eta(p+ivec2(0,1)):bd+s.x-.004;
  vec4 f=texelFetch(uF,p,0);
  float dmp=1./(1.+dt*uP[0].y*(.3+length(s.zw)/.35)/(s.y+.0015));
  float k=dt*9.81*CL;
  vec4 nf=max(f*dmp+k*vec4(e-eL,e-eR,e-eB,e-eT),0.);
  // momentum: the flow carries its own velocity along (semi-Lagrangian, on the cell-centred velocity so it stays smooth).
  // Without this the pipes are potential flow: no separation behind a stone, no eddies, no standing waves.
  if(s.y>.0008){
    vec2 bt=clamp(vec2(p)-s.zw*dt/CL,vec2(0.),vec2(float(NX-1),float(NZ-1))); ivec2 b0=ivec2(bt), b1=min(b0+1,ivec2(NX-1,NZ-1)); vec2 fr=bt-vec2(b0);
    vec2 ua=mix(mix(Sa(b0).zw,Sa(ivec2(b1.x,b0.y)).zw,fr.x),mix(Sa(ivec2(b0.x,b1.y)).zw,Sa(b1).zw,fr.x),fr.y);
    vec2 du=clamp(ua-s.zw,-.05,.05);
    nf=max(nf+s.y*CL*vec4(max(-du.x,0.),max(du.x,0.),max(-du.y,0.),max(du.y,0.))-s.y*CL*vec4(max(du.x,0.),max(-du.x,0.),max(du.y,0.),max(-du.y,0.)),0.);
  }
  vec2 w=SDS*(vec2(p)+.5)/vec2(float(NX),float(NZ))+vec2(SX0,SZ0); vec2 dw=w-uP[1].xy;
  float g=exp(-dot(dw,dw)/(uP[1].z*uP[1].z))*uP[1].w*min(1.,s.y/.003);
  nf=max(nf+dt*g*vec4(-uP[2].x,uP[2].x,-uP[2].y,uP[2].y),0.);
  // vorticity confinement: the coarse grid would otherwise smear the eddies away
  if(s.y>.0015){ float w0=cu(p); vec2 gw=vec2(abs(cu(p+ivec2(1,0)))-abs(cu(p-ivec2(1,0))),abs(cu(p+ivec2(0,1)))-abs(cu(p-ivec2(0,1)))); gw/=length(gw)+1e-5;
    vec2 ac=uP[0].z*w0*vec2(gw.y,-gw.x); nf=max(nf+dt*s.y*CL*vec4(-ac.x,ac.x,-ac.y,ac.y),0.); }
  // a stone's wake on this grid is too coarse to shed vortices by itself (2-3 cells across): a side force at the Strouhal
  // frequency behind each stone starts them, the flow carries the street of eddies away
  for(int i=0;i<9*uOne;i++){ vec4 q=uSt[i]; if(q.z<=0.) continue; vec2 d=w-q.xy; d.y-=q.z*1.7; float eg=dot(d,d)/(q.z*q.z*2.); if(eg>4.) continue;
    float us=length(s.zw), om=6.2832*.2*max(us,.1)/(2.*q.z), ph=uP[0].w*om+q.x*57.+q.y*91.; float amp=q.w*exp(-eg)*sin(ph)*min(us/.12,1.);
    nf=max(nf+dt*s.y*CL*amp*vec4(-1.,1.,0.,0.),0.); }
  // the hulls: a moving patch of pressure (it pushes water aside: bow wave, wake, the trough along the hull) and skin drag toward the hull's own velocity
  float cov=0.; vec2 hv=vec2(0.), gp=vec2(0.);
  for(int i=0;i<uNB;i++){ vec4 A=uBt[i*3], B=uBt[i*3+1], C=uBt[i*3+2]; vec2 d=w-A.xy;
    if(abs(d.x)>.14||abs(d.y)>.14) continue;
    float lz=d.x*A.w+d.y*A.z, lx=d.x*A.z-d.y*A.w, q=lz*lz*B.x+lx*lx*B.y; if(q>9.) continue;
    float g2=exp(-q), hd=B.z*g2*clamp(s.y/.007,0.,1.);
    float dqx=2.*(lz*B.x*A.w+lx*B.y*A.z), dqz=2.*(lz*B.x*A.z-lx*B.y*A.w);
    gp+=-hd*vec2(dqx,dqz); hv=mix(hv,C.xy,g2); cov=max(cov,g2); }
  if(uNB>0){ vec4 tq=vec4(max(-hv.x,0.),max(hv.x,0.),max(-hv.y,0.),max(hv.y,0.))*max(s.y,.0008)*CL;
    nf=max(mix(nf+k*CL*vec4(gp.x,-gp.x,gp.y,-gp.y),tq,min(.8,cov*dt*14.)),0.); }
  if(p.x==0) nf.x=0.; if(p.x==NX-1) nf.y=0.; if(p.y==0) nf.z=0.;
  float ou=nf.x+nf.y+nf.z+nf.w;
  nf*=min(1.,s.y*CL*CL/(ou*dt+1e-12));
  o=nf;
}`,Es=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF,uB;
uniform vec4 uP[12]; // dt, inflow, rain, erosion | stamps x,z,r,amount (8) | time
uniform int uOne;
out vec4 o;
${_e}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uS,p,0), f=texelFetch(uF,p,0), B=texelFetch(uB,p,0);
  float dt=uP[0].x;
  vec4 fl=p.x>0?texelFetch(uF,p+ivec2(-1,0),0):vec4(0.), fr=p.x<NX-1?texelFetch(uF,p+ivec2(1,0),0):vec4(0.);
  vec4 fb=p.y>0?texelFetch(uF,p+ivec2(0,-1),0):vec4(0.), ft=p.y<NZ-1?texelFetch(uF,p+ivec2(0,1),0):vec4(0.);
  float fin=fl.y+fr.x+fb.w+ft.z, fo=f.x+f.y+f.z+f.w;
  float d1=max(0.,s.y+dt*(fin-fo)/(CL*CL));
  float wx=.5*(fl.y-f.x+f.y-fr.x), wz=.5*(fb.w-f.z+f.w-ft.z);
  float dm=max(.5*(s.y+d1),.0008);
  vec2 u=vec2(wx,wz)/(CL*dm);
  float ul=length(u); if(ul>1.1) u*=1.1/ul;
  if(d1<.0004) u*=d1/.0004;
  // sources: inflow from up the street, rain; sinks: the drain
  d1+=dt*(B.b*uP[0].y*(1.+.35*sin(uP[9].x*1.7+float(p.x)*.31)*sin(uP[9].x*.63+float(p.x)*.07+1.3)+.18*sin(uP[9].x*.37+float(p.x)*.11))+uP[0].z);
  { float g=abs(B.g), tk=d1*(1.-exp(-dt*g)); d1-=B.g<0.?min(tk,dt*g*.0032):tk; }   // a negative rate marks a drain with a capacity (the grate)
  // debris: washed off where the water runs fast over it or floats it (a dam holds until it is overtopped)
  float db=s.x;
  if(db>0.){ float sp=length(u); float er=uP[0].w*(max(sp-.1,0.)*.06+max(d1-.003,0.)*.6*smoothstep(.04,.12,sp))+.000004; db=max(0.,db-dt*er); }
  vec2 w=SDS*(vec2(p)+.5)/vec2(float(NX),float(NZ))+vec2(SX0,SZ0);
  for(int k=1;k<9*uOne;k++){ vec4 q=uP[k]; if(q.w==0.) continue; vec2 dd=w-q.xy; float g=exp(-dot(dd,dd)/(q.z*q.z));
    if(q.w>0.) db=min(max(db,.0)+q.w*g,.036); else db=max(0.,db+q.w*g); }
  o=vec4(db,d1,u);
}`,ca=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uB; uniform int uRB,uOne;
out vec4 o;
${_e}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uS,p,0); float b=texelFetch(uB,p,0).r+s.x;
  if(uRB==1){ o=vec4(clamp(s.y/.06,0.,1.),clamp(s.x/.06,0.,1.),clamp(s.zw*.5+.5,0.,1.)); return; }
  float e=b+s.y;
  // dry cells carry the water surface on from their wet neighbours (a wide, distance-weighted average), so the surface
  // stays smooth across kerbs and stones and the 1 mm street map, not the 12 mm cells, decides where the water ends
  if(s.y<.0015){ float m=0.,n=0.; for(int j=-2*uOne;j<=2*uOne;j++) for(int i=-2*uOne;i<=2*uOne;i++){ ivec2 q=clamp(p+ivec2(i,j),ivec2(0),ivec2(NX-1,NZ-1)); vec4 t=texelFetch(uS,q,0); if(t.y>.0015){ float wg=1./(1.+float(i*i+j*j)); m+=wg*(texelFetch(uB,q,0).r+t.x+t.y); n+=wg; } }
    e=n>0.?min(m/n,b-.0006):b-.012; }
  o=vec4(e,s.x,s.zw);
}`,Ss=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uV;
in vec2 vUv; out vec4 o;
const vec2 sz=vec2(${H}.,${se}.);
void main(){
  vec2 st=vUv*sz-.5, f=fract(st), i=st-f, f2=f*f, f3=f2*f;
  vec2 w0=(1.-3.*f+3.*f2-f3)/6., w1=(4.-6.*f2+3.*f3)/6., w2=(1.+3.*f+3.*f2-3.*f3)/6., w3=f3/6.;
  vec2 g0=w0+w1, g1=w2+w3, h0=(i+.5+w1/g0-1.)/sz, h1=(i+.5+w3/g1+1.)/sz;
  o=g0.x*g0.y*texture(uV,h0)+g1.x*g0.y*texture(uV,vec2(h1.x,h0.y))+g0.x*g1.y*texture(uV,vec2(h0.x,h1.y))+g1.x*g1.y*texture(uV,h1);
}`,Bs=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uV,uFm,uB; uniform vec4 uP; uniform vec4 uBt[36]; uniform int uNB; // uP: dt, decay foam, decay stir, boost
in vec2 vUv; out vec4 o;
${_e}
void main(){
  vec4 v=texture(uV,vUv); vec2 vel=v.ba; float dt=uP.x;
  vec4 pv=texture(uFm,vUv-vel*dt/SDS);
  vec2 ex=vec2(CL/SDS.x,0.), ez=vec2(0.,CL/SDS.y);
  vec4 a=texture(uV,vUv+ex), b=texture(uV,vUv-ex), c=texture(uV,vUv+ez), d=texture(uV,vUv-ez);
  float curl=abs((a.a-b.a)-(c.b-d.b))/(2.*CL), dv=-((a.b-b.b)+(c.a-d.a))/(2.*CL), sl=length(vec2(a.r-b.r,c.r-d.r))/(2.*CL), sp=length(vel);
  float dw=v.r-texture(uB,vUv).r-v.g, wetm=smoothstep(.0008,.003,dw);
  float src=(smoothstep(8.,24.,curl)*1.1+smoothstep(4.,16.,dv)*1.6+smoothstep(.55,1.,sp)*.9+smoothstep(.22,.55,sl)*1.6)*uP.w;
  float stir=(smoothstep(2.,16.,curl)*.9+smoothstep(2.,12.,abs(dv))*.7+smoothstep(.35,.85,sp)*.5)*uP.w;
  vec2 w=SDS*vUv+vec2(SX0,SZ0);
  for(int i=0;i<uNB;i++){ vec4 A=uBt[i*3], B=uBt[i*3+1], C=uBt[i*3+2]; vec2 dd=w-A.xy; if(abs(dd.x)>.16||abs(dd.y)>.16) continue;
    float lz=dd.x*A.w+dd.y*A.z, lx=dd.x*A.z-dd.y*A.w, q=lz*lz*B.x+lx*lx*B.y; if(q>16.) continue;
    float rim=exp(-(q-1.1)*(q-1.1)*1.6), rv=length(C.xy-vel);
    // the bow throws it up, the stern lays it down: more foam behind the hull, in the direction it left water at
    float sn=lz*sqrt(B.x)/max(sqrt(q),.2), hsp=length(C.xy);
    src+=rim*(.5+.5*max(-sn,0.))*smoothstep(.05,.3,hsp+rv)*(.5+1.6*rv);
    stir+=rim*smoothstep(.02,.3,hsp+rv)*1.4; }
  float fo=(pv.r+dt*src)*exp(-dt*uP.y), st=(pv.g+dt*stir)*exp(-dt*uP.z);
  fo*=mix(.9,1.,wetm); st*=mix(.9,1.,wetm);
  o=vec4(clamp(fo,0.,1.),clamp(st,0.,1.),0.,1.);
}`,fa="float atn(float y,float x){ float a=atan(y/(abs(x)+1e-5)); return x>=0.?a:(y>=0.?3.1416-a:-3.1416-a); }",Ns=`#version 300 es
precision highp sampler2D; precision highp float; precision highp int;
uniform sampler2D uN; uniform vec4 uP[24];
in vec2 vUv; out vec4 o;
float hs1(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
${fa}

vec3 sky(vec3 r,float rough){
  float e=max(r.y,0.);
  vec3 L=uP[4].xyz;
  vec3 c=mix(uP[7].xyz,uP[6].xyz,pow(e,.55));
  float mu=max(dot(r,L),0.);
  c+=uP[8].xyz*(pow(mu,6.)*.8+pow(mu,60.)*1.5)*(1.-uP[6].w*.6);
  vec2 cp=r.xz/(e+.09)*.07+uP[20].xy;
  float n=texture(uN,cp,rough*5.).g*.65+texture(uN,cp*2.7+.31,rough*5.).b*.35;
  float cov=uP[6].w;
  float cl=smoothstep(.62-cov*.5,.82-cov*.45,n);
  vec3 cc=mix(uP[7].xyz*.8,uP[7].xyz*1.1+uP[8].xyz*.6*pow(mu,3.),smoothstep(.5,.9,n))*(.75+.4*(1.-n));
  c=mix(c,cc,cl*smoothstep(0.,.08,e));
  // the street: rooftops (or tree crowns in the garden) against the sky
  float az=atn(r.x,r.z), el=r.y/max(length(r.xz),1e-3);
  float side=abs(az-.05), near=smoothstep(.06,.7,side);
  if(uP[2].w>.5){ side=min(side,abs(abs(az)-3.09)); near=smoothstep(.06,.7,side); }   // the street opens both ways (seen looking upstream)
  float hb=mix(.035,.62,near);
  float hh, kid=az*mix(3.,9.,near), id=floor(kid), f=fract(kid), bw=clamp(.05+rough*1.8,.05,.5), ek=smoothstep(1.-bw,1.,f)*.5, el2=(1.-smoothstep(0.,bw,f))*.5;
  float rv=mix(mix(hs1(vec2(id,4.)),hs1(vec2(id+1.,4.)),ek),hs1(vec2(id-1.,4.)),el2);
  if(uP[20].z>.5){ hh=hb*(.55+.75*texture(uN,vec2(az*.35,.3),rough*3.).g)+.04*texture(uN,vec2(az*2.,el*2.)).b; }
  else { hh=hb*(.75+.5*mix(mix(hs1(vec2(id,2.)),hs1(vec2(id+1.,2.)),ek),hs1(vec2(id-1.,2.)),el2));
    float pk=hb*.22*(1.-abs(f*2.-1.))*step(hs1(vec2(id,5.)),.55); hh+=pk; }
  float se=.006+rough*.3;
  if(el<hh+se){
    vec3 fc=uP[9].xyz*(.35+.3*rv)+uP[5].xyz*uP[4].w*.12*max(-sin(az)*L.x,0.);
    if(uP[20].z<.5) fc+=uP[11].xyz*uP[11].w*.12*smoothstep(hh,hh*.3,el)*(.5+.5*hs1(vec2(id,8.)));
    else fc*=.6;
    c=mix(c,fc,smoothstep(hh+se,hh-se,el));
  }
  if(uP[7].w>0.){ vec3 ld=normalize(uP[10].xyz-vec3(0.,0.,1.2)); float m2=max(dot(r,ld),0.); c+=uP[11].xyz*(pow(m2,40.)*.25+pow(m2,6.)*.08)*uP[10].w*.06; }
  return c;
}
void main(){
  float k=floor(vUv.y*3.), v=fract(vUv.y*3.), az=(vUv.x-.5)*6.2831853, y=v*v, c=sqrt(1.-y*y);
  o=vec4(sky(vec3(sin(az)*c,y,cos(az)*c),k<.5?.03:(k<1.5?.2:.6)),1.);
}`,u0=a=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uA,uB,uV,uN,uRT,uSM,uFm,uSky; uniform int uOne;
uniform vec4 uP[24];
in vec2 vUv; out vec4 o;
${a}
${fa}
vec3 sky(vec3 r,float rough){
  float v=clamp(sqrt(max(r.y,0.)),.008,.992), k=step(.2,rough), f=k>.5?clamp((rough-.2)/.4,0.,1.):clamp((rough-.03)/.17,0.,1.);
  vec2 uv=vec2(atn(r.x,r.z)/6.2831853+.5,(v+k)/3.);
  vec3 c=mix(textureLod(uSky,uv,0.).rgb,textureLod(uSky,uv+vec2(0.,.33333333),0.).rgb,f);
  // the sun's disc and the lamp's point are too small for the map: added here, on smooth water only
  float gate=smoothstep(.04,.012,rough);
  c+=uP[5].xyz*uP[4].w*pow(max(dot(r,uP[4].xyz),0.),1800.)*60.*(1.-uP[6].w)*gate;
  if(uP[7].w>0.) c+=uP[11].xyz*pow(max(dot(r,normalize(uP[10].xyz-vec3(0.,0.,1.2))),0.),2000.)*2.4*gate*uP[10].w;
  return c;
}
float ggx(vec3 N,vec3 V,vec3 L,float r){
  vec3 H=normalize(V+L); float a=r*r, nh=max(dot(N,H),0.), dd=nh*nh*(a*a-1.)+1.;
  return a*a/(3.1416*dd*dd)*max(dot(N,L),0.)/(4.*max(dot(N,V),.15));
}
// the kerb seen in a reflection: its colour, and how much of the reflected ray it catches (soft at the top and at grazing angles)
vec4 kerbR(vec3 Po,vec3 r,float rs){
  if(uP[12].y<=0.||r.x>-.015) return vec4(0.);
  float tt=(uP[12].x-Po.x)/r.x; if(tt>3.6) return vec4(0.); vec3 q=Po+r*tt; float top=uP[12].y-uP[12].w*(q.z-.25)-.004, se=.003+rs*(.012+tt*.18);
  float n=texture(uN,vec2(q.z*2.3,q.y*3.)).g, j=smoothstep(.004,.0,abs(fract(q.z/.9+.37)-.5)*.9-.445);
  vec3 a=uP[19].xyz*(.75+.5*n)*mix(.45,.8,smoothstep(.005,.03,q.y-top+uP[12].y))*(1.-.5*j);
  return vec4(a*(uP[5].xyz*max(uP[4].x,0.)*uP[4].w+uP[9].xyz*.9),smoothstep(top+se,top-se,q.y)*smoothstep(-.015,-.06,r.x)*smoothstep(3.6,2.6,tt));
}
bool inS(vec2 p){ return p.x>SX0&&p.x<SX0+SDS.x&&p.y>SZ0&&p.y<SZ0+SDS.y; }
vec2 vwp(vec2 p){ return simUV(p+(texture(uN,p*5.3).gb-.5)*.008); }
float Hs(vec2 p){ float h=textureLod(uA,toUV(p),0.).r; if(inS(p)) h+=textureLod(uV,simUV(p),0.).g; return h; }
void main(){
  vec2 ndc=vUv*2.-1.;
  vec3 E=uP[0].xyz; float tf=uP[0].w, T=uP[1].w;
  vec3 d=normalize(uP[1].xyz+ndc.x*tf*uP[2].xyz+ndc.y*tf*uP[3].xyz);
  float xk=uP[12].x, chW=uP[12].z, zd=uP[13].w;
  // march the street heightfield
  float t0=(E.y-.15)/-d.y, t1=min((E.y+.065)/-d.y,14.);
  int N=int(uP[15].w); float st=(t1-t0)/float(N);
  float t=t0, tp=t0;
  for(int i=0;i<N;i++){ t+=st; vec3 Q=E+d*t; if(Q.y<texture(uA,toUV(Q.xz)).r) break; tp=t; }
  // the debris layer (dams) sits on top: back up by its height and refine against both
  { vec3 Q=E+d*tp; if(inS(Q.xz)){ float dh=texture(uV,simUV(Q.xz)).g; if(dh>.0003){ tp=max(t0,tp-(dh+.004)/-d.y); } } }
  float a=tp,b=t; for(int i=0;i<7*uOne;i++){ float m=.5*(a+b); vec3 Q=E+d*m; if(Q.y<Hs(Q.xz)) b=m; else a=m; }
  t=b; vec3 P=E+d*t;
  // water over this point?
  bool sim=inS(P.xz);
  vec2 pe=P.xz; if(uP[12].y>0.) pe.x=max(pe.x,xk+.014);
  vec2 su=vwp(pe);
  vec4 Vv=texture(uV,su);
  float eta=sim?Vv.r:(P.x>xk&&P.x<xk+chW&&P.z>SZ0+SDS.y-.02&&uP[13].z<1.5?uP[21].y-uP[12].w*(P.z-.25):-9.);
#ifdef GEN
  if(!sim&&P.x>xk&&P.x<xk+chW&&P.z<SZ0+.02) eta=uW[2].x-uP[12].w*(P.z-.25);   // the gutter goes on upstream (the views that see it)
#endif
  float hb=P.y;
  float tw=t; vec3 Pw=P; bool wat=eta>hb+.00005;
  if(wat){ tw=(E.y-eta)/-d.y; Pw=E+d*tw; if(inS(Pw.xz)){ Vv=texture(uV,vwp(Pw.xz)); eta=max(Vv.r,hb); tw=(E.y-eta)/-d.y; Pw=E+d*tw; } }
  float dw=max(eta-hb,0.);
  // water surface: slope from the sim, ripples carried by the flow, rain rings
  vec2 vel=sim?Vv.ba:vec2(0.,.15);
  vec2 gs=vec2(0.); float curl=0., lap=0., dvg=0.; vec2 fmv=vec2(0.);
  if(wat&&sim){ vec2 e=vec2(CL/SDS.x,0.), f=vec2(0.,CL/SDS.y); vec2 q=simUV(Pw.xz);
    vec4 a1=texture(uV,q+e), a2=texture(uV,q-e), a3=texture(uV,q+f), a4=texture(uV,q-f);
    gs=vec2(a1.r-a2.r,a3.r-a4.r)/(2.*CL); gs=clamp(gs,-.6,.6); curl=(a1.a-a2.a-a3.b+a4.b)/(2.*CL);
    lap=(a1.r+a2.r+a3.r+a4.r-4.*Vv.r)/(CL*CL); dvg=(a1.b-a2.b+a3.a-a4.a)/(2.*CL);
    fmv=texture(uFm,simUV(Pw.xz+vec2(.003,.0017)*sin(T*vec2(1.3,.9)+Pw.zx*11.))).rg; }
  float ph=fract(T*.55), bl=abs(1.-2.*ph);
  vec2 q0=Pw.xz*2.6;
  vec2 wn0=(texture(uN,q0-vel*ph*1.5).gb-.5)*(1.-bl)+(texture(uN,q0-vel*fract(ph+.5)*1.5+.5).gb-.5)*bl;
  float sp=length(vel);
  float ph3=fract(T*1.9), bl3=abs(1.-2.*ph3), ph4=fract(ph3+.5);
  vec2 wf=((texture(uN,Pw.xz*15.-vel*ph3*4.7).gb-.5)*(1.-bl3)+(texture(uN,Pw.xz*15.-vel*ph4*4.7+.37).gb-.5)*bl3
    +((texture(uN,Pw.xz*41.-vel*ph3*13.).gb-.5)*(1.-bl3)+(texture(uN,Pw.xz*41.-vel*ph4*13.+.61).gb-.5)*bl3)*.55)*inversesqrt(bl3*bl3+(1.-bl3)*(1.-bl3));
  float wa=(.1+1.3*sp+.014*abs(curl)+.55*fmv.g)*smoothstep(0.,.004,dw);
  float wfa=(.05+1.5*sp+.5*fmv.g)*smoothstep(0.,.003,dw);
  vec2 fl0=vel/max(sp,.03);
  float sw=smoothstep(2.,9.,abs(dvg)+.4*abs(curl))*smoothstep(.06,.2,sp)*smoothstep(2.6,1.2,tw);
  vec2 wn=wn0*.45+wf*(wfa/max(wa,.01))+fl0*cos(dot(Pw.xz,fl0)*480.+wn0.x*16.)*sw*.2/max(wa,.01);
  vec2 rr=vec2(0.); float rain=uP[3].w;
  if(rain>.01&&wat){ vec2 rp=Pw.xz/.03-.5, ri=floor(rp);
    for(int j=0;j<2*uOne;j++) for(int i=0;i<2*uOne;i++){ vec2 c=ri+vec2(float(i),float(j)); vec2 h=hs2(c); float cyc=T*1.3*(.7+.6*h.x)+h.y; float tt=fract(cyc);
      if(hs1(c+floor(cyc)*.37)<rain*.85){ vec2 dv=rp-(c+.5+.3*(h-.5)); float dd=length(dv), r=tt*1.1; float w=sin((dd-r)*24.)*exp(-pow((dd-r)*5.,2.))*(1.-tt)*(1.-tt); rr+=dv/max(dd,.01)*w*.3; } } }
  gs*=2.4;
  vec3 Nw=normalize(vec3(-gs.x-wn.x*wa-rr.x,1.,-gs.y-wn.y*wa-rr.y));
  // the street at the bed (shifted a little by refraction)
  vec2 Pb=wat?P.xz+Nw.xz*min(dw,.02)*.5:P.xz;
  vec2 uvA=toUV(Pb);
  vec4 A=texture(uA,uvA), B=texture(uB,uvA);
  int mat=int(texelFetch(uA,ivec2(uvA*uP[20].w),0).a*16.+.5); float id=A.b, jn=A.g;
  float deb=sim?texture(uV,simUV(Pb)).g:0.;
  vec2 Pt=length(B.xy)>2.5?vec2(Pb.y+Pb.x*.4,P.y*1.4):Pb;
  vec4 n1=texture(uN,Pt*3.3), n2=texture(uN,Pt*13.7+.3), n3=texture(uN,Pt*41.+.7);
  vec3 alb; float rough=.7, metal=0.;
  int sk=int(uP[8].w+.5);
  if(mat==1){ alb=uP[18].xyz*(.75+.5*id); }
  else if(mat==2||mat==7){ alb=uP[19].xyz*(.85+.3*id); }
  else if(mat==3){ alb=uP[19].xyz*vec3(1.,.96,.88)*(.78+.3*id); }
  else if(mat==4){ alb=vec3(.07,.055,.045)*(.7+.6*n2.g); alb=mix(alb,vec3(.22,.1,.04),smoothstep(.55,.75,n1.b)*.6); rough=.45; metal=1.; }
  else if(mat==5){ alb=mix(vec3(.05,.1,.025),vec3(.12,.15,.05),n1.b)*(.55+.9*n2.g)*(.7+.6*n3.a); alb=mix(alb,vec3(.16,.13,.09),smoothstep(.6,.75,n1.g)*.7); rough=.9; }
  else if(mat==6){ alb=vec3(.36,.33,.28)*(.6+.7*id); }
  else if(mat==8){ alb=vec3(.01); }
  else if(mat==9){ alb=mix(vec3(.66,.6,.5),vec3(.58,.54,.48),id)*(.72+.55*n2.g)*(.85+.3*smoothstep(.0,.03,hb-eta)); alb=mix(alb,vec3(.3,.33,.17),smoothstep(.55,.7,n1.b+.1*n2.a)*.7); rough=.55; }
  else if(mat==11){ alb=vec3(.5,.22,.12)*(.75+.5*n2.g)*(.8+.4*id); rough=.7; }
  else if(mat==10){ float wr=smoothstep(.56,.34,id+.2*n3.a-.1*n2.g); alb=mix(uP[17].xyz,vec3(.88,.62,.08),wr); }
  else { alb=uP[17].xyz*(.7+.6*id); if(sk==0) alb*=mix(vec3(1.),vec3(.85,.95,1.08),step(.7,fract(id*7.3))); }
  if(sk==4&&mat==0){ float ag=n3.a; alb=vec3(.1,.098,.105)*(.75+.5*ag)+.05*step(.9,fract(ag*91.+n2.a*13.)); }
  if(sk==1||mat==2||mat==7){ float s=n3.a; alb*=.85+.3*smoothstep(.45,.6,s); alb=mix(alb,vec3(.03),step(.82,fract(n3.a*53.+n2.g*7.))*.5); }
  alb*=.82+.36*n1.g;
  // the kerb's finish
  { float ks=uP[17].w; if((mat==2||mat==7)&&ks>.5){ if(ks<1.5){ float wr=smoothstep(.62,.4,n2.b+.15*n3.a); alb=mix(vec3(.88,.62,.1)*(.8+.3*n2.a),alb,1.-wr); } else if(ks<2.5){ float bl=step(.5,fract(P.z/1.2)); float wr=smoothstep(.75,.55,n3.a*.6+n1.b*.4); alb=mix(alb,bl>.5?vec3(.05):vec3(.86,.84,.8),wr); } else { float ms=smoothstep(.45,.68,n1.b+.2*n2.g); alb=mix(alb,vec3(.08,.13,.04)*(.7+.6*n3.a),ms*.85); } } }
  alb=mix(alb,(sk==2&&mat!=2?vec3(.42,.4,.36):vec3(.12,.1,.08)),jn*(mat==4||mat==8?0.:.5));
  if((sk==3||sk==0)&&mat!=2) alb=mix(alb,vec3(.05,.1,.02),jn*smoothstep(.45,.7,n1.b)*.8);
  // leaf litter and grit (the debris layer)
  float dbm=smoothstep(.0005,.0035,deb);
  if(dbm>0.){ vec3 l1=uP[14].xyz, l2=uP[15].xyz; float cel=texture(uN,Pb*5.).r, lv=texture(uN,Pb*7.+.2).g;
    vec3 lit=mix(l1,l2,smoothstep(.35,.65,lv))*(.75+.5*n2.a); lit=mix(lit*.5,lit,smoothstep(.05,.25,cel));
    vec3 grit=vec3(.16,.14,.11)*(.7+.6*n3.a);
    alb=mix(alb,mix(grit,lit,smoothstep(.004,.012,deb)),dbm); rough=mix(rough,.85,dbm); }
  // normal
  vec2 g=(length(B.xy)>2.5?normalize(B.xy)*8.:B.xy)+(n2.gb-.5)*.18*(mat==5?2.:1.)+(n3.gb-.5)*.08;
  if(dbm>0.&&sim){ vec2 e=vec2(CL/SDS.x,0.), f=vec2(0.,CL/SDS.y); vec2 q=simUV(Pb); g+=vec2(texture(uV,q+e).g-texture(uV,q-e).g,texture(uV,q+f).g-texture(uV,q-f).g)/(2.*CL)+(texture(uN,Pb*9.).gb-.5)*.9*dbm; }
  vec3 Nn=normalize(vec3(-g.x,1.,-g.y));
  float cav=(B.z-.5)*2.;
  float ao=clamp(.88+.5*cav,.5,1.1);
  // wetness: joints and hollows stay wet longest; the bed under water is soaked
  float wG=uP[5].w;
  float wet=clamp(wG*1.7-.55+cav*1.2+jn*.5-(n1.b-.5)*.8,0.,1.);
  wet=max(wet,smoothstep(.0,.004,dw+.0012*float(sim)*step(-.003,eta-hb)));
  if(mat==8||mat==5) wet=max(wet,.5);
  if(mat==9) wet=min(wet,.45);
  if(mat==2&&length(B.xy)>2.5){ float hh=P.y+uP[12].w*(P.z-.25);
    float st=texture(uN,vec2(P.z*1.3,P.y*.3)).g; alb*=(.8+.4*texture(uN,vec2(P.z*.7,P.y*.9)).b)*mix(.68,1.05,smoothstep(.38,.62,st));
    // weather on the face: dark streaks under the arris, pitting, a stained foot with moss, a wet tide band
    float drip=smoothstep(.5,.72,texture(uN,vec2(P.z*7.1,.27)).g)*smoothstep(.0,.05,hh)*smoothstep(.1,.02,hh); alb*=1.-.45*drip;
    alb*=.82+.28*smoothstep(.3,.55,texture(uN,vec2(P.z*43.,hh*57.)).a);
    float foot=smoothstep(.05,.0,hh+.01*(texture(uN,vec2(P.z*4.,.6)).g-.5)); alb=mix(alb,vec3(.1,.11,.05)*(.8+.6*n2.g),foot*.65); wet=max(wet,foot*.7);
    // the arris: a chipped, paler top edge
    alb*=mix(.5,1.,smoothstep(-.005,.03,hh)); wet=max(wet,smoothstep(.02,-.002,hh));
    if(uP[13].z>.5&&uP[13].z<1.5){ float dz=abs(P.z-zd)/.13; if(dz<1.){ float top=-uP[13].y-.007+.042*sqrt(1.-dz*dz); if(hh<top){ alb=vec3(.006); wet=1.; } else if(hh<top+.01) alb*=.6; } }
  }
  if(mat==9||mat==11) wet=max(wet,smoothstep(.022,-.002,P.y-eta));
  // snow: lies where it's dry and thaws around the water
  if(uP[18].w>1.5&&uP[18].w<2.5){ float sn=smoothstep(.5,.72,n1.g*.7+n2.b*.3+.1*(mat==2||mat==7||mat==3?1.:0.)-.5*wet); sn*=1.-step(.0008,eta-hb); sn*=smoothstep(.1,.5,Nn.y+.5*(mat==2?1.:0.)); alb=mix(alb,vec3(.93,.95,.98)*(.85+.25*n2.a),sn); rough=mix(rough,.8,sn); wet*=1.-sn; }
  vec3 albW=alb*mix(1.,.42,wet)*mix(vec3(1.),vec3(.95,.97,1.05),wet);
  albW=mix(albW,alb*.8,dbm*.7);
  // light
  vec3 L=uP[4].xyz, V=-d;
  vec2 so=vec2(.0016,.0007); float sm=(texture(uSM,vUv+so).r+texture(uSM,vUv-so).r+texture(uSM,vUv+so.yx*vec2(-1.,1.)).r+texture(uSM,vUv-so.yx*vec2(-1.,1.)).r)*.25;
  // kerb faces span only a few map texels, so the baked shadow there would be stair-stepped: they take the sun directly
  float sh=(mat==2&&length(B.xy)>2.5?1.:B.w*sm)*uP[4].w;
  if(uP[19].w>.0) sh*=mix(1.,smoothstep(.42,.62,texture(uN,P.xz*.7+T*vec2(.0023,.0017)).g*.7+texture(uN,P.xz*1.9-T*.003).b*.3),uP[19].w);
  float ndl=max(dot(Nn,L),0.);
  vec3 amb=uP[9].xyz*(.5+.5*Nn.y)*ao*((mat==9||mat==11)?1.7:1.);
  vec3 dif=albW*(uP[5].xyz*ndl*sh+amb)*(1.-metal*.6);
  float Fs=.04+.96*pow(1.-max(dot(Nn,V),0.),5.);
  vec3 Rv=reflect(d,Nn); Rv.y=abs(Rv.y);
  float rf=mix(rough,.06,wet*wet);
  float flt=smoothstep(.35,.8,Nn.y);
  vec3 Rw=reflect(d,Nw); Rw.y=abs(Rw.y)+.004;
  // the reflection's blur follows how rough the water is here, so every silhouette in it (rooftops, kerb) is continuous
  float srough=wat?clamp(.05+wa*.2+wfa*.08+length(gs)*.14+fmv.g*.12,0.,.65):rf;
  vec3 Ro=wat?Rw:Rv; vec3 skyR=sky(Ro,srough); vec4 kr0=kerbR(wat?Pw:vec3(Pb.x,hb,Pb.y),Ro,srough); skyR=mix(skyR,kr0.rgb,kr0.a);
  vec3 env=skyR*Fs*ao*(.25+.75*wet)*(.08+.92*flt);
  vec3 spc=uP[5].xyz*sh*(ggx(Nn,V,L,rough)*Fs*.6+ggx(Nn,V,L,.13)*Fs*wet*wet*.5*flt*smoothstep(.3,.7,n2.b));
  vec3 lampC=vec3(0.);
  if(uP[7].w>0.){ vec3 lv=uP[10].xyz-vec3(Pb.x,hb,Pb.y); float ld2=dot(lv,lv); vec3 ln=lv*inversesqrt(ld2); float li=uP[10].w/ld2;
    lampC=uP[11].xyz*li*(albW*max(dot(Nn,ln),0.)*B.w+(ggx(Nn,V,ln,max(rf,.05))*(.04+.96*pow(1.-max(dot(Nn,V),0.),5.)))*(wet*.9+.1)); }
  vec3 ground=dif+env+spc+lampC;
  if(mat==9||mat==11) ground+=uP[5].xyz*sh*pow(max(1.-dot(Nn,V),0.),3.)*.35*alb;
  if(mat==8) ground*=.25;
  // culvert mouth in the headwall
  if(uP[13].z>1.5&&abs(P.z-zd)<.008&&P.y>-.02){ vec2 mq=vec2(P.x,P.y)-uP[21].zw; float mr=length(mq);
    if(mr<.062){ ground=vec3(.004)+uP[9].xyz*.03*smoothstep(.04,.062,mr); } else if(mr<.075) ground*=.55+.45*smoothstep(.062,.075,mr); }
  vec3 col=ground;
  if(wat){
    float cw=smoothstep(0.,.0012,dw);
    float cosv=max(dot(V,Nw),0.);
    float Fw=.02+.98*pow(1.-cosv,5.);
    vec3 refl=skyR;
    // the mirror of the boats and debris: soft taps along the view, moved by the surface
    vec2 dsp=(gs*.5+wn0*wa*.7)*vec2(.018,.05)-Nw.xz*vec2(.005,.016); float span=.0025+.012*clamp(srough*3.,0.,1.); vec4 rt=vec4(0.);
    for(int i=0;i<5*uOne;i++){ float v5=float(i)-2.; rt+=textureLod(uRT,vUv+dsp+vec2(v5*.22*span,v5*span),0.)*(1.-.18*abs(v5)); }
    rt/=3.92; refl=mix(refl,rt.rgb*2./max(rt.a,.02),min(rt.a,1.));
    vec3 tint=uP[16].xyz; float turb=uP[16].w;
    // sediment in spate water: plumes drawn along the flow, boiling up from the tracer
    if(turb>.35){ vec2 fdir=vel/max(sp,.08), fp=vec2(-fdir.y,fdir.x), wq=Pw.xz+(texture(uN,Pw.xz*1.3+T*vec2(.01,.03)).gb-.5)*.12; vec2 sq=vec2(dot(wq,fp),dot(wq,fdir));
      float pl0=texture(uN,sq*vec2(11.,1.4)-vec2(0.,T*sp*.7)).g, pl1=texture(uN,sq*vec2(4.,.8)+vec2(T*.015,-T*sp*.4)).b;
      turb*=mix(.8,1.2,smoothstep(.3,.7,pl1)); tint*=mix(.86,1.18,smoothstep(.34,.66,pl0*.5+pl1*.5))*(1.+fmv.g*.3); }
    vec3 ab=exp(-dw*vec3(7.,9.,14.)*(1.+turb*turb*14.));
    // caustics: the sun focused by the surface. Strongest where the crest curvature is, faint lace only where the water
    // is shallow and moving, nothing over dead water or deep water
    float cdep=smoothstep(.0025,.009,dw)*(1.-smoothstep(.016,.05,dw));
    float cs=texture(uN,Pb*5.3+wn0*.8+T*vec2(.03,.07)).r, patch1=smoothstep(.35,.7,texture(uN,Pb*.8+T*vec2(.006,.011)).g);
    float caus=(pow(1.-cs,6.)*.3*patch1*clamp(.08+sp*2.6+length(wn0)*wa*2.,0.,1.)+clamp(-lap*.028,-.2,.75)+(pow(clamp(1.-abs(wf.x+wf.y*.6)*4.5,0.,1.),5.)*1.4-.2)*clamp(wfa*2.5,0.,1.))*cdep*sh;
    vec3 bedc=albW*(uP[5].xyz*(ndl*.8+.2)*sh*(1.+caus)+amb)+lampC*.6;
    if(mat==8) bedc*=.15;
    vec3 under=bedc*ab+tint*(uP[9].xyz+uP[5].xyz*sh*.15)*(1.-ab)*.6;
    // sun glitter: a soft warm band where the mirror angle is close, and tiny sparks on the fine ripples, never a blown flame
    vec2 spq=Pw.xz*15.-vel*T*.35+T*vec2(.09,.13); float spk=smoothstep(.64,.9,texture(uN,spq).a)*smoothstep(.56,.88,texture(uN,Pw.xz*37.+T*vec2(-.13,.07)).a);
    float g0=ggx(Nw,V,L,.07);
    vec3 glint=uP[5].xyz*sh*Fw*(min(g0,2.)*.35+min(g0,70.)*spk*.42);
    if(uP[7].w>0.){ vec3 lv=uP[10].xyz-Pw; float ld2=dot(lv,lv); float g1=ggx(Nw,V,lv*inversesqrt(ld2),.07); glint+=uP[11].xyz*uP[10].w/ld2*Fw*(min(g1,2.)*.22+min(g1,70.)*spk*.2); }
    vec3 water=mix(under,refl,Fw)+glint;
    { float sl=clamp(dot(gs,normalize(d.xz+vec2(1e-4)))*1.7,-.32,.55); water*=1.+sl; water*=1.+clamp(dot(Nw.xz,normalize(L.xz+vec2(1e-4)))*2.2,-.28,.3)*smoothstep(.0,.006,dw)*(.3+.7*sh); }
    // foam and bubbles where the flow is fast, turns, or falls over the step
    float fz=clamp(fmv.r*1.9,0.,1.2)+smoothstep(.7,1.5,length(gs))*.4;
    vec2 fq=Pw.xz-vel*ph*.25; vec2 fq2=Pw.xz-vel*fract(ph+.5)*.25; vec2 fl=sp>.06?vel/sp:vec2(0.,1.), fpr=vec2(-fl.y,fl.x);
    fq=vec2(dot(fq,fpr),dot(fq,fl)); fq2=vec2(dot(fq2,fpr),dot(fq2,fl));
    float fe=mix(texture(uN,fq*vec2(9.,4.5)).g*.62+texture(uN,fq*vec2(29.,13.)+.3).b*.38,texture(uN,fq2*vec2(9.,4.5)+.5).g*.62+texture(uN,fq2*vec2(29.,13.)+.8).b*.38,bl);
    float fm=smoothstep(.635-.34*fz,.79-.27*fz,fe)*smoothstep(.15,.5,fz)*(.6+.6*texture(uN,Pw.xz*31.).a);
    vec3 fc=uP[5].xyz*sh*max(L.y,.15)*1.2+uP[9].xyz*1.2+lampC*.3;
    water=mix(water,fc,fm*.8);
    col=mix(ground,water,cw);
  }
  // haze far away
  float tt2=wat?tw:t;
  col=mix(col,uP[7].xyz*.9+uP[9].xyz*.3,1.-exp(-tt2*.035));
  float zv=tt2*dot(d,uP[1].xyz);
  gl_FragDepth=clamp(.5*(${((l0+f0)/(l0-f0)).toFixed(6)}-${(2*l0*f0/(l0-f0)).toFixed(6)}/zv)+.5,0.,1.);
  o=vec4(col,tt2/16.);
}`,wo=a=>u0(a).split("if(uP[7].w>0.)").join("if(false)").replace("if(uP[18].w>1.5&&uP[18].w<2.5)","if(false)").replace("if(uP[13].z>1.5&&","if(false&&").replace("if(uP[13].z>.5&&uP[13].z<1.5)","if(false)").replace("if((mat==2||mat==7)&&ks>.5)","if(false)").replace("if(uP[19].w>.0)","if(false)"),Ts=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uMesh; uniform vec4 uP[8];   // VP rows 0..3 (column-major columns), L, mode/time, eye
layout(location=0) in vec4 iA; layout(location=1) in vec4 iB; layout(location=2) in vec4 iC; layout(location=3) in vec4 iD;
out vec3 vW; out vec3 vN; out vec3 vLoc; flat out vec4 vC; flat out vec4 vD; flat out vec4 vB; flat out float vPart; flat out vec3 vAx;
void main(){
  int ty=int(iC.w+.5), mode=int(uP[5].x+.5);
  bool cut=ty==5||ty==6||ty==8||ty==12;
  vW=vec3(0.); vN=vec3(0.,1.,0.); vLoc=vec3(0.); vPart=0.; vC=iC; vD=iD; vB=iB; vAx=vec3(1.,0.,0.);
  if((cut&&(mode==0||mode==1))||(!cut&&mode==4)){ gl_Position=vec4(2.,2.,2.,1.); return; }
  vec4 a=texelFetch(uMesh,ivec2(gl_VertexID,ty*2),0), b=texelFetch(uMesh,ivec2(gl_VertexID,ty*2+1),0);
  vec3 p=a.xyz, n=b.xyz; float part=a.w;
  vLoc=p; vPart=part;
  float wet=fract(iB.w)/.99, lost=floor(iB.w)*.01;   // the drain's pull rides in the whole part
  if(ty<=4){ float gn=sin(p.x*17.+iD.z*40.)*sin(p.z*11.-iD.z*23.)*sin(p.y*13.+iD.z*9.); p+=n*gn*.008; }
  if(ty<=3){ float sl=wet*wet; float up=smoothstep(.1,.6,p.y);
    p.y*=1.-.42*sl*(.4+.6*up); p.x*=1.+.25*sl*up; if(part>.5&&part<1.5){ p.x+=sl*.18*p.y*sign(iD.z-.5); }
    p.y*=1.-.6*smoothstep(.15,.9,lost); }
  // each leaf curls its own amount, and to its own side
  if(ty==5){ float ys=.45+1.4*fract(iD.z*7.3); p.y*=ys; n=normalize(vec3(n.x*ys,n.y,n.z*ys)); if(fract(iD.z*3.7)>.5){ p.x=-p.x; n.x=-n.x; } }
  p*=iB.z;
  float cy=cos(iA.w), sy=sin(iA.w), cr=cos(iB.x), sr=sin(iB.x), cp=cos(iB.y), spt=sin(iB.y);
  mat3 Ry=mat3(cy,0.,-sy, 0.,1.,0., sy,0.,cy);
  mat3 Rx=mat3(1.,0.,0., 0.,cp,spt, 0.,-spt,cp);
  mat3 Rz=mat3(cr,sr,0., -sr,cr,0., 0.,0.,1.);
  mat3 R=Ry*Rx*Rz;
  vec3 w=iA.xyz+R*p; vec3 wn=R*n; vAx=R[0];
  if(mode==1){ if(iD.x<-1.){ gl_Position=vec4(2.,2.,2.,1.); return; } w.y=2.*iD.x-w.y; wn.y=-wn.y; }
  if(mode==2){ vec3 L=uP[4].xyz;
    if(cut&&iD.x>-1.&&iD.y<.5){
      // afloat: the shadow falls through the water onto the bed just beside it, and is seen back up through the water
      float dep=iD.w; vec3 Lr=refract(-L,vec3(0.,1.,0.),.75); w+=Lr*((w.y-iD.x+dep)/max(-Lr.y,.3));
      vec3 ev=w-uP[6].xyz; float hl=length(ev.xz), si=.75*hl/length(ev); w.xz-=ev.xz/max(hl,1e-4)*dep*si/sqrt(1.-si*si); w.y=iD.x; }
    else { float pl=iD.x>-1.?iD.x:iA.y; float k=(w.y-pl)/max(L.y,.05); w-=L*k; w.y=pl; } }
  vW=w; vN=wn;
  mat4 VP=mat4(uP[0],uP[1],uP[2],uP[3]);
  gl_Position=VP*vec4(w,1.);
  if(mode==0||mode==4) gl_Position.z-=.0004*gl_Position.w;
}`,qs=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uN; uniform vec4 uP[8]; uniform vec4 uQ[8];  // sunC/sunVis, amb, skyH, skyZ, lampPos/I, lampC/on, expo
in vec3 vW; in vec3 vN; in vec3 vLoc; flat in vec4 vC; flat in vec4 vD; flat in vec4 vB; flat in float vPart; flat in vec3 vAx;
out vec4 o;
float ggx(vec3 N,vec3 V,vec3 L,float r){
  vec3 H=normalize(V+L); float a=r*r, nh=max(dot(N,H),0.), dd=nh*nh*(a*a-1.)+1.;
  return a*a/(3.1416*dd*dd)*max(dot(N,L),0.)/(4.*max(dot(N,V),.15));
}
void main(){
  int ty=int(vC.w+.5), mode=int(uP[5].x+.5);
  vec3 lp=vLoc; vec2 q=lp.xz*2.;
  // cut-out shapes: leaves, petals, seeds, ice. e is the distance inside the outline
  float e=1., lt=0.;
  if(ty==5){ lt=clamp((q.y+.8)/1.75,0.,1.); float sk=fract(vD.z*5.3);   // 0 where the stalk joins, 1 at the tip; narrow to broad
    float w=(.78+.45*sk)*pow(lt,.6)*pow(1.-lt,.8); w*=1.-.1*fract(lt*(9.+6.*sk))*step(.1,lt);   // small teeth leaning to the tip
    e=max(w-abs(q.x),q.y<-.75?.022-abs(q.x):-1.); }
  else if(ty==6){ vec2 g=vec2(q.x,q.y+.1); e=min(.8-length(g*vec2(1.25,1.)),max(.55-g.y,abs(g.x)-.12)); }
  else if(ty==8){ float w=.36*sin(clamp((q.y+1.)*1.5708,0.,3.1416))*(q.y<-.4?1.6:1.); e=w-abs(q.x-.1*q.y); }
  else if(ty==12){ e=.9-length(q)-(texture(uN,lp.xz*3.+vD.z*9.).g-.5)*.5; }
  float cov=1., fw=fwidth(e);
  if(mode>=3){ cov=clamp(e/(fw*1.3+1e-5)+.5,0.,1.); if(cov<.01) discard; } else if(e<0.) discard;
  float wy=vW.y, eta=vD.x;
  if(mode==3&&wy>eta+.0008) discard;
  if(mode==2){ o=vec4(vec3((ty==5?.42:.25)+.75*smoothstep(.0,.6,vD.y)),1.); return; }
  if((mode==0||mode==4)&&wy<eta-.0004&&vD.y<.5) discard;
  float wcon=smoothstep(.006,.0005,wy-eta)*step(eta,wy+.0004);
  vec3 V=normalize(uP[6].xyz-vW);
  vec3 N=normalize(vN); bool back=dot(N,V)<0.; if(back) N=-N;
  vec3 L=uP[4].xyz;
  vec3 base=vC.rgb, tw=vec3(1.); float wet=fract(vB.w)/.99; float rough=.8, metal=0., trans=.25;
  float pk=vD.w;
  vec2 tq=(ty>=5||abs(vN.y)>.7?lp.xz:abs(vN.x)>.5?lp.zy:lp.xy);
  float fib=texture(uN,tq*3.+vD.z*7.).a, fib2=texture(uN,tq*.9+vD.z*3.).g;
  if(ty<=4&&(ty!=4||vPart<8.)){
    // creases: lines where the folds run, the sheet a touch lighter on the ridge and darker in the valley
    float cr=0.; if(ty<=3){ cr=(1.-smoothstep(.0,.012,abs(lp.x)))*step(.6,lp.y);
      if(ty==0&&vPart>.5&&vPart<1.5) cr=1.-smoothstep(.0,.012,min(abs(lp.x),abs(lp.z-.01)));
      cr+=(1.-smoothstep(.0,.009,abs(abs(lp.z)-.5+.14*(lp.y-.2))))*step(lp.y,.24)*.5; }
    // the inside of a hull sees less of the sky than the outside
    float ins=(ty==0||ty==3)&&vPart<.5?step(dot(N,vAx)*lp.x,0.):0.;
    N=normalize(N+(vec3(texture(uN,tq*7.).g,0.,texture(uN,tq*7.+.4).b)-vec3(.5,0.,.5))*.18);
    if(pk<.5){ float band=step(.5,fract(tq.y*9.+.25))*step(.15,fract(tq.x*3.1)); base*=.88+.12*fib2-.09*band*(.6+.4*fib); }
    else if(pk<1.5){ base*=.95+.07*fib; }
    else if(pk>3.5&&pk<4.5){ base*=.86+.2*fib2; }
    else if(pk>4.5){ float gl=step(.93,fract(tq.x*14.))+step(.93,fract(tq.y*14.)); base=mix(base*(.94+.08*fib),vec3(.3,.42,.74),min(gl,1.)*.55); }
    else if(pk<2.5){ if(back) base=vec3(.86,.85,.82); base*=.94+.08*fib; }
    else if(pk<3.5){ metal=back?0.:.75; rough=back?.8:.3+.25*fib2; if(back) base=vec3(.86,.85,.82); }
    // water creeps up the sheet from the waterline: a darker soaked band with a ragged top, higher the longer it has floated
    float soak=(1.-smoothstep(-.0012,.0012,wy-eta-.0025-.02*wet-(fib2-.5)*.007))*step(-1.,eta);
    trans=.35+.4*wet+.2*soak; if(vPart>.5&&vPart<1.5) trans+=.2;
    base*=mix(1.,.8,wet)*mix(1.,.7,soak); rough=mix(rough,.35,max(wet,soak)*(1.-metal));
    if(vPart>1.5&&vPart<2.5) base*=.93;
    base*=(1.-.3*cr)*(1.-.28*ins);
    tw=vec3(1.1,.92,.7);   // sunlight coming through the sheet is warmer
  } else if(ty==5){
    // a fallen leaf: bleached and wine-dark blotches, some green-gold left by the midrib, the margin browned; midrib and side veins paler
    float ax=abs(q.x), rim=smoothstep(.0,.13,e-.04*fib);
    float mid=1.-smoothstep(.0,.012+.03*(1.-lt),ax);
    float sv=abs(fract(lt*7.5-ax*1.7+.5*step(q.x,0.))-.5);
    float vn=max(mid,(1.-smoothstep(.0,.08,sv))*smoothstep(.0,.05,ax)*.6);
    vec3 c=mix(base*vec3(1.3,1.2,.75),base*vec3(.62,.45,.4),smoothstep(.3,.72,fib2));
    c=mix(c,vec3(.34,.33,.06)*(.5+base.g*2.),(1.-smoothstep(.0,.3,ax+.35*lt))*.45*step(.5,fract(vD.z*9.1)));
    c=mix(vec3(.15,.085,.04),c,.22+.78*rim);
    c=mix(c,c*1.45+.03,vn*.85)*(.86+.14*smoothstep(.0,.3,sv));
    base=c; trans=.55; rough=.5; if(back) base*=.8;
  } else if(ty==6||ty==8){ base*=.8+.4*fib2; trans=.5; rough=.6; if(back) base*=.85; }
  else if(ty==4){ base=vPart<8.5?vec3(.32,.2,.1)*(.7+.6*fib2)*(.7+.3*smoothstep(.1,.3,lp.y)):vPart<9.5?vec3(.42,.3,.17):vec3(.5,.34,.1)*(.8+.4*fib2); rough=.65; trans=vPart>9.5?.5:0.; }
  else if(ty==7){ base*=.7+.6*fib2; rough=.9; trans=0.; }
  else if(ty==12){ base=mix(vec3(.82,.88,.95),vec3(.97),fib2); rough=.5; trans=.7; }
  else if(ty==9){ metal=1.; rough=.25+.2*fib; trans=0.; }
  if(mode==3){ base*=.85; trans=.6; }
  vec3 sunC=uQ[0].xyz*uQ[0].w, amb=uQ[1].xyz;
  float ndl=dot(N,L);
  vec3 dif=base*(sunC*(max(ndl,0.)+tw*(trans*max(-ndl,0.)*.8))+amb*(.6+.4*N.y)+uQ[2].xyz*.08*(1.-N.y))*(1.-metal*.85);
  float F=.04+.96*pow(1.-max(dot(N,V),0.),5.);
  vec3 sp=sunC*ggx(N,V,L,rough)*(metal>.5?base*base*2.2:vec3(F*(.3+wet)));
  vec3 Rr=reflect(-V,N); vec3 skyc=mix(uQ[2].xyz,uQ[3].xyz,clamp(Rr.y*1.4,0.,1.));
  vec3 env=skyc*(metal>.5?base*(1.6-rough*.6)+uQ[1].xyz*base*2.:vec3(F*(.2+.8*wet)));
  vec3 lc=vec3(0.);
  if(uQ[5].w>0.){ vec3 lv=uQ[4].xyz-vW; float l2=dot(lv,lv); vec3 ln=lv*inversesqrt(l2); float li=uQ[4].w/l2; float nl=dot(N,ln);
    lc=uQ[5].xyz*li*(base*(max(nl,0.)+trans*max(-nl,0.)*.6)*(1.-metal*.8)+ggx(N,V,ln,rough)*(metal>.5?base:vec3(F))); }
  vec3 col=dif+sp+env+lc;
  if(mode==0&&ty<=4) col*=1.-.4*wcon;
  if(mode==0) col*=mix(1.,.72+.28*smoothstep(.0,.05,vLoc.y*1.),float(ty<=4)*.4);
  if(mode==3){ float dep=max(eta-wy,0.); vec3 ab=exp(-dep*vec3(18.,21.,30.)); col=col*ab+uQ[1].xyz*vec3(.3,.25,.18)*(1.-ab); o=vec4(col,.6*(1.-smoothstep(.025,.06,dep))*cov); return; }
  if(mode==1){ o=vec4(col*.5,1.); return; }
  if(mode==4){
    // where the edge lies in the water the surface climbs it: a thin line of sky
    if(eta>-1.){ float men=(1.-smoothstep(.0,.05,e))*smoothstep(.0018,.0003,wy-eta); col=mix(col,(uQ[2].xyz+uQ[3].xyz)*.6+sunC*.2,men*.85); }
    o=vec4(col,cov); return; }
  o=vec4(col,length(uP[6].xyz-vW)/16.);
}`,Ds=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uH,uN; uniform vec4 uP[4];   // S, focus, max coc px, exposure | rain, time, near k, taps | lift rgb
in vec2 vUv; out vec4 o;
float coc(float t){ float f=uP[0].y; float c=t>f?(1.-f/t):(f/t-1.)*uP[1].z; return clamp(c,0.,1.)*uP[0].z; }
void main(){
  vec2 px=1./uP[0].xx;
  vec4 c0=texture(uH,vUv); float t0=c0.a*16., k0=coc(t0);
  float jr=texture(uN,gl_FragCoord.xy/256.).a*6.2832;
  vec3 c0c=min(c0.rgb,vec3(8.)); float w0=1./(1.+dot(c0c,vec3(.3,.5,.2))*.35); vec3 acc=c0c*w0; float ws=w0;
  int NT=int(uP[1].w);
  float R=uP[0].z;
  for(int i=0;i<NT;i++){ float fi=float(i); float r=sqrt((fi+.5)/float(NT))*R; float an=fi*2.39996;
    an+=jr; vec4 s=texture(uH,vUv+vec2(cos(an),sin(an))*r*px); float ts=s.a*16.; float ks=coc(ts); if(ts>t0) ks=min(ks,k0*1.2+.5);
    vec3 sc=min(s.rgb,vec3(8.)); float w=clamp(ks-r+1.,0.,1.)/(1.+dot(sc,vec3(.3,.5,.2))*.35); acc+=sc*w; ws+=w; }
  vec3 col=acc/ws;
  // rain in the air, out of focus
  float rn=uP[1].x;
  if(rn>.01){ float T=uP[1].y; for(int l=0;l<2;l++){ float sc=l==0?60.:110.; vec2 q=vec2(vUv.x*sc+vUv.y*sc*.08,vUv.y*sc*.12+T*(l==0?2.6:3.4)); vec2 qi=floor(q); float h=fract(sin(dot(qi,vec2(12.9898,78.233)))*43758.5453);
    float s=step(1.-rn*.12,h)*smoothstep(.0,.3,fract(q.y))*(1.-smoothstep(.3,.9,fract(q.y)))*(1.-smoothstep(.03,.12,abs(fract(q.x)-.5))); col+=uP[2].xyz*s*(l==0?.07:.045); } }
  col*=uP[0].w;
  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14);
  vec2 vq=vUv-.5; col*=1.-dot(vq,vq)*.55;
  col=pow(clamp(col,0.,1.),vec3(1./2.2));
  col+=(texture(uN,vUv*uP[0].x/256.+fract(uP[1].y*vec2(.37,.71))).a-.5)*.025;
  o=vec4(col,1.);
}`,la=`
vec4 fU(highp usampler2D s,ivec2 q,int l){return uintBitsToFloat(texelFetch(s,q,l));}
`,zo=`
vec4 tU(highp usampler2D s,vec2 uv){vec2 z=vec2(textureSize(s,0)),p=uv*z-.5,f=fract(p);ivec2 i=ivec2(floor(p)),m=ivec2(z)-1;
vec4 a=uintBitsToFloat(texelFetch(s,clamp(i,ivec2(0),m),0)),b=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(1,0),ivec2(0),m),0)),c=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(0,1),ivec2(0),m),0)),d=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(1),ivec2(0),m),0));
return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
vec4 tU(highp usampler2D s,vec2 uv,float l){return tU(s,uv);}
`,H0=`
const float KE=.25,KI=4.;
`;function W0(a,t){const c=(T,k,K)=>{if(T.indexOf(k)<0)throw new Error("052 NH "+a+" "+k);return T.split(k).join(K)},E=(T,k)=>c(T,"void main(){",`void main0();
void main(){main0();`+k+`}
void main0(){`),w=T=>E(c(T,"out vec4 o;","out uvec4 oU; vec4 o;"),"oU=floatBitsToUint(o);");if(a==="flux"||a==="state")return w(c(c(c(t,"uniform highp sampler2D uS,uF,uB;","uniform highp usampler2D uS,uF; uniform highp sampler2D uB;"+la),"texelFetch(uS,","fU(uS,"),"texelFetch(uF,","fU(uF,"));if(a==="vis"||a==="visR"){const T=c(c(t,"uniform highp sampler2D uS,uB;","uniform highp usampler2D uS; uniform highp sampler2D uB;"+la),"texelFetch(uS,","fU(uS,");return a==="vis"?w(T):T}return a==="surf"?w(c(c(t,"uniform sampler2D uV;","uniform highp usampler2D uV;"+zo),"texture(uV,","tU(uV,")):a==="foam"?c(c(t,"uniform sampler2D uV,uFm,uB;","uniform highp usampler2D uV; uniform sampler2D uFm,uB;"+zo),"texture(uV,","tU(uV,"):a==="bakeA"||a==="bakeB"?w(t):a==="comp"?c(c(c(c(c(t,"uniform sampler2D uA,uB,uV,uN,uRT,uSM,uFm,uSky;","uniform sampler2D uA,uB,uN,uRT,uSM,uFm,uSky; uniform highp usampler2D uV;"+zo+H0),"texture(uV,","tU(uV,"),"textureLod(uV,","tU(uV,"),"textureLod(uSky,","KI*textureLod(uSky,"),"o=vec4(col,tt2/16.);","o=vec4(col*KE,sqrt(max(tt2,0.)/16.));"):a==="skyb"?E(c(t,"out vec4 o;","out vec4 o;"+H0),"o.rgb*=KE;"):a==="mesh"?c(c(c(c(t,"out vec4 o;","out vec4 o;"+H0),"o=vec4(col,.6*(","o=vec4(col*KE,.6*("),"o=vec4(col,cov); return; }","o=vec4(col*KE,cov); return; }"),"o=vec4(col,length(uP[6].xyz-vW)/16.);","o=vec4(col*KE,sqrt(length(uP[6].xyz-vW)/16.));"):a==="fin"?c(c(t,"texture(uH,","dH("),"uniform sampler2D uH,uN;","uniform sampler2D uH,uN;"+H0+`vec4 dH(vec2 uv){vec4 c=texture(uH,uv);return vec4(c.rgb*KI,c.a*c.a);}
`):t}function ye(a,t,c){const E=(K,m)=>{const V=a.createShader(K);return a.shaderSource(V,m),a.compileShader(V),V},w=a.createProgram(),T=E(a.VERTEX_SHADER,t),k=E(a.FRAGMENT_SHADER,c);return a.attachShader(w,T),a.attachShader(w,k),a.linkProgram(w),a.flush(),{p:w,sh:[T,k],u:null}}function j0(a,t,c){if(!a.getProgramParameter(t.p,a.LINK_STATUS))throw new Error("052 "+c+": "+a.getProgramInfoLog(t.p)+" "+a.getShaderInfoLog(t.sh[0])+" "+a.getShaderInfoLog(t.sh[1]));t.u={};const E=a.getProgramParameter(t.p,a.ACTIVE_UNIFORMS);for(let w=0;w<E;w++){const T=a.getActiveUniform(t.p,w),k=T.name.replace(/\[0\]$/,"");t.u[k]=a.getUniformLocation(t.p,T.name)}}const ua=["skyb","noise","bakeA","bakeB","flux","state","vis","surf","foam","mesh","fin"],Gt={skyb:{uN:3},noise:{},bakeA:{uM:0,uN:1},bakeB:{uA:0},flux:{uS:0,uF:1,uB:2},state:{uS:0,uF:1,uB:2},vis:{uS:0,uB:2},surf:{uV:0},foam:{uV:0,uFm:1,uB:2},comp:{uA:0,uB:1,uV:2,uN:3,uRT:4,uSM:5,uFm:6,uSky:7},mesh:{uMesh:0,uN:3},fin:{uH:0,uN:3}};function Ls(a,t){let c=oa.get(a);if(c)return c;const E=!!a.getExtension("EXT_color_buffer_float"),w=!!a.getExtension("OES_texture_float_linear"),T=E||!!a.getExtension("EXT_color_buffer_half_float"),k=T?(m,V)=>V:W0,K={};return t!==null&&(K[t?"h":"g"]=ye(a,be,k("comp",t?wo(_e):u0(_e)))),c={ck:K,skyb:ye(a,be,k("skyb",Ns)),noise:ye(a,be,Ms),bakeA:ye(a,be,k("bakeA",ia(_e))),bakeB:ye(a,be,k("bakeB",ra(_e))),flux:ye(a,be,k("flux",Rs)),state:ye(a,be,k("state",Es)),vis:ye(a,be,k("vis",ca)),surf:ye(a,be,k("surf",Ss)),foam:ye(a,be,k("foam",Bs)),mesh:ye(a,Ts,k("mesh",qs)),fin:ye(a,be,k("fin",Ds)),vao0:a.createVertexArray(),ok:!1},T||(c.visR=ye(a,be,W0("visR",ca))),c.cbf=E,c.lin=w,c.hbf=T,oa.set(a,c),c}function Us(a,t,c){const E=c?"h":"g",w=t.ck[E]||(t.ck[E]=ye(a,be,t.hbf?c?wo(_e):u0(_e):W0("comp",c?wo(_e):u0(_e))));if(!w.u){j0(a,w,"comp"),a.useProgram(w.p);for(const T in Gt.comp)w.u[T]&&a.uniform1i(w.u[T],Gt.comp[T]);w.u.uOne&&a.uniform1i(w.u.uOne,1)}return w}function _s(a,t,c){if(c)return t;if(!t.gen){const E=t.hbf?(w,T)=>T:W0;t.gen={bakeA:ye(a,be,E("bakeA",ia(yo))),bakeB:ye(a,be,E("bakeB",ra(yo))),comp:ye(a,be,E("comp",u0(yo)))}}return t.gen}function Cs(a,t){for(const c of["bakeA","bakeB","comp"])if(!t[c].u){j0(a,t[c],c),a.useProgram(t[c].p);for(const E in Gt[c])t[c].u[E]&&a.uniform1i(t[c].u[E],Gt[c][E]);t[c].u.uOne&&a.uniform1i(t[c].u.uOne,1)}}function bo(a,t,c,E,w,T,k,K,m){const V=a.createTexture();return a.bindTexture(a.TEXTURE_2D,V),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage2D(a.TEXTURE_2D,0,E,t,c,0,w,T,m||null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,k),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,k===a.NEAREST?a.NEAREST:a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,K||a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,K||a.CLAMP_TO_EDGE),V}function va(a,t,c){const E=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,E),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t,0),c&&a.framebufferRenderbuffer(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.RENDERBUFFER,c),E}const ha=typeof FinalizationRegistry=="function"?new FinalizationRegistry(a=>{const t=a();try{t.tex.forEach(c=>t.gl.deleteTexture(c)),t.fbo.forEach(c=>t.gl.deleteFramebuffer(c)),t.buf.forEach(c=>t.gl.deleteBuffer(c)),t.vao.forEach(c=>t.gl.deleteVertexArray(c)),t.rb.forEach(c=>t.gl.deleteRenderbuffer(c))}catch{}}):null,ma=new Float32Array(1),Is=new Uint32Array(ma.buffer),Vs=a=>{ma[0]=a;const t=Is[0],c=t>>>16&32768;let E=(t>>>23&255)-112,w=t&8388607;return E<=0?c:E>=31?c|31743:c|E<<10|w>>>13},X0=(a,t,c)=>{let E=a*374761393+t*668265263+c*1442695041|0;return E=Math.imul(E^E>>>13,1274126177),E^=E>>>16,(E>>>0)/4294967296},Gs=(a,t,c)=>{const E=Math.floor(a),w=Math.floor(t),T=a-E,k=t-w,K=T*T*(3-2*T),m=k*k*(3-2*k),V=X0(E,w,c),f=X0(E+1,w,c),we=X0(E,w+1,c),z=X0(E+1,w+1,c);return V+(f-V)*K+(we-V)*m+(V-f-we+z)*K*m},Os=(a,t,c,E)=>{let w=0,T=.5,k=1,K=0;for(let m=0;m<c;m++)w+=T*Gs(a*k,t*k,E+m*7),K+=T,T*=.5,k*=2.03;return w/K};function Hs(){const a=new Float32Array(O0*xo*2*4),t=new Int32Array(xo);let c=[];const E=(z,g,h)=>{const F=Math.hypot(z,g,h)||1;return[z/F,g/F,h/F]},w=(z,g,h)=>c.push(z[0],z[1],z[2],h,g[0],g[1],g[2]),T=(z,g,h,F)=>{const y=[g[0]-z[0],g[1]-z[1],g[2]-z[2]],d=[h[0]-z[0],h[1]-z[1],h[2]-z[2]],x=E(y[1]*d[2]-y[2]*d[1],y[2]*d[0]-y[0]*d[2],y[0]*d[1]-y[1]*d[0]);w(z,x,F),w(g,x,F),w(h,x,F)},k=(z,g,h,F,y)=>{T(z,g,h,y),T(z,h,F,y)},K=(z,g,h,F,y)=>{const d=(x,p)=>{const A=Math.PI*x/y,B=Ge*p/F,C=[Math.sin(A)*Math.cos(B),Math.cos(A),Math.sin(A)*Math.sin(B)];return[[z[0]+g[0]*C[0],z[1]+g[1]*C[1],z[2]+g[2]*C[2]],E(C[0]/g[0],C[1]/g[1],C[2]/g[2])]};for(let x=0;x<y;x++)for(let p=0;p<F;p++){const A=d(x,p),B=d(x+1,p),C=d(x+1,p+1),L=d(x,p+1);w(A[0],A[1],h),w(B[0],B[1],h),w(C[0],C[1],h),w(A[0],A[1],h),w(C[0],C[1],h),w(L[0],L[1],h)}},m=z=>{const g=c.length/7;t[z]=g;for(let h=0;h<g;h++){const F=(z*2*O0+h)*4,y=((z*2+1)*O0+h)*4;for(let d=0;d<4;d++)a[F+d]=c[h*7+d];for(let d=0;d<3;d++)a[y+d]=c[h*7+4+d]}c=[]},V=(z,g,h,F)=>{const y=(d,x)=>{const A=z(Math.min(1,d+.004),x),B=z(Math.max(0,d-.004),x),C=z(d,Math.min(1,x+.004)),L=z(d,Math.max(0,x-.004)),G=[A[0]-B[0],A[1]-B[1],A[2]-B[2]],W=[C[0]-L[0],C[1]-L[1],C[2]-L[2]];return E(G[1]*W[2]-G[2]*W[1],G[2]*W[0]-G[0]*W[2],G[0]*W[1]-G[1]*W[0])};for(let d=0;d<g;d++)for(let x=0;x<h;x++){const p=d/g,A=(d+1)/g,B=x/h,C=(x+1)/h,L=(G,W)=>w(z(G,W),y(G,W),F);L(p,B),L(A,B),L(A,C),L(p,B),L(A,C),L(p,C)}},f=(z,g,h,F,y,d,x)=>{const p=[g[0]-z[0],g[1]-z[1],g[2]-z[2]],A=[h[0]-z[0],h[1]-z[1],h[2]-z[2]],B=E(p[1]*A[2]-p[2]*A[1],p[2]*A[0]-p[0]*A[2],p[0]*A[1]-p[1]*A[0]);V((C,L)=>{const G=Math.max(C,.04),W=y*Math.sin(Math.PI*G)*(.35+.65*Math.sin(Math.PI*L));return[z[0]+G*(p[0]*(1-L)+A[0]*L)+B[0]*W,z[1]+G*(p[1]*(1-L)+A[1]*L)+B[1]*W,z[2]+G*(p[2]*(1-L)+A[2]*L)+B[2]*W]},d,x,F)};{const z=A=>-.5+A,g=A=>.215*Math.pow(Math.max(0,1-(2*A)**2),.62),h=A=>.17+.2*Math.abs(2*A)**2.2,F=A=>.06*Math.max(0,1-(A/.44)**2),y=A=>.02+.2*Math.max(0,Math.abs(2*A)-.5)**1.6;for(const A of[-1,1])V((B,C)=>{const L=z(B),G=F(L)+(g(L)-F(L))*Math.pow(C,.85),W=y(L)+(h(L)-y(L))*C;return[A*(G+.018*Math.sin(Math.PI*C)),W,L]},12,2,0);V((A,B)=>{const C=z(A)*.92;return[F(C)*(2*B-1),y(C),C]},8,1,2);const d=[.012,.5,.015],x=[0,.215,.31],p=[0,.215,-.31];for(const A of[-1,1]){const B=[A*.1,.155,0];f(d,x,B,1,.01,3,2),f(d,B,p,1,.01,3,2)}for(const A of[-1,1])V((B,C)=>{const L=-.32+.64*B,G=g(L);return[A*(G+.012-.02*C),h(L)+.005-.075*C-.03*Math.abs(L)*C,L]},6,1,2);m(0)}{for(const h of[-1,1])V((F,y)=>{const d=(F-.5)*2,x=d*.5*(1-y),p=.56*y;return[h*(.13*(1-y)+.012*Math.sin(Math.PI*y)*(1-d*d)),p,x]},6,3,0),V((F,y)=>{const p=(F-.5)*2,A=p*(.5+.03-(.5+.03-.405)*y),B=-.005+(.14+.005)*y;return[h*(.15-.035*y+.012*Math.sin(Math.PI*F)),B,A]},6,2,2);for(const h of[-1,1])V((F,y)=>{const d=(F-.5)*.26*(1-y),x=.56*y;return[d,x,h*(.5*(1-y)+0)]},2,3,0);m(1)}{const z=[0,.07,.2],g=[0,.07,-.2],h=[0,.17,0],F=[-.09,.06,0],y=[.09,.06,0],d=[0,0,0],x=.012;f(z,h,y,0,x,3,1),f(z,F,h,0,x,3,1),f(g,y,h,0,x,3,1),f(g,h,F,0,x,3,1),f(z,y,d,0,x,3,1),f(z,d,F,0,x,3,1),f(g,d,y,0,x,3,1),f(g,F,d,0,x,3,1);for(const p of[-1,1])f([0,.16,-.12],[0,.16,.12],[p*.56,.33,-.05],1,.02*p,5,2),f([0,.16,-.12],[p*.56,.33,-.05],[p*.22,.2,-.2],1,.016*p,5,2);for(const p of[-1,1])f([p*.014,.08,.12],[0,.06,.23],[0,.5,.42],2,.006*p,3,1),f([p*.014,.08,-.12],[0,.06,-.23],[0,.47,-.46],2,.006*p,3,1),f([0,.5,.42],[p*.012,.47,.42],[0,.42,.53],2,.002,3,1);m(2)}{for(const d of[-1,1])V((x,p)=>{const A=-.5+1*x,B=Math.abs(2*A),C=Math.max(0,B-.72)/.28,L=.19*(1-.32*C*C)*(.9+.1*p),G=p*.2+.11*C*C*C;return[d*L*(.72+.28*p),G,A]},12,2,0);V((d,x)=>{const p=-.5+1*d,A=Math.abs(2*p),B=Math.max(0,A-.72)/.28;return[.19*.72*(1-.32*B*B)*(2*x-1),.11*B*B*B,p]},10,1,2);for(const d of[-1,1])V((x,p)=>{const A=.1292*(.72+.28*p)*(2*x-1),B=d*(.5-.14*0);return[A,.11+p*(.2+0),B+d*.14*p*.25]},3,2,0);const y=.2;for(let d=0;d<2;d++){const x=(d?-1:1)*.16;V((p,A)=>[.1406*(2*p-1),.2*.86+.01*Math.sin(Math.PI*p),x-.03+.06*A],3,1,2)}m(3)}{for(let g=0;g<7;g++)for(let h=0;h<12;h++){const F=(d,x)=>{const p=d/7*Math.PI*.5,A=x/12*Ge,B=.32*(1+.09*Math.sin(A*5+d)*Math.sin(d*1.7)),C=[Math.sin(p)*Math.cos(A),-Math.cos(p),Math.sin(p)*Math.sin(A)];return[[B*C[0],.27+B*.82*C[1],B*1.14*C[2]],C]},y=[F(g,h),F(g+1,h),F(g+1,h+1),F(g,h+1)];w(y[0][0],y[0][1],8),w(y[1][0],y[1][1],8),w(y[2][0],y[2][1],8),w(y[0][0],y[0][1],8),w(y[2][0],y[2][1],8),w(y[3][0],y[3][1],8)}const z=(g,h,F,y)=>{k(g,h,F,y,9)};z([-.015,.2,0],[.015,.2,0],[.012,.86,0],[-.012,.86,0]),z([0,.2,-.015],[0,.2,.015],[0,.86,.012],[0,.86,-.012]),T([.01,.84,0],[.01,.34,0],[.27,.42,.06],1),T([.01,.84,0],[.27,.42,.06],[.2,.7,-.02],1),m(4)}const we=(z,g,h,F)=>{for(let y=0;y<z;y++)for(let d=0;d<g;d++){const x=(p,A)=>{const B=-.5+p/z,C=-.5+A/g;return[B,h(B,C),C]};k(x(y,d),x(y+1,d),x(y+1,d+1),x(y,d+1),F)}};V((z,g)=>{const h=-.36+.72*z,F=-.5+g;return[h,.34*h*h+.13*h+.3*Math.max(0,F-.15)**2-.1*Math.max(0,-F-.2)+.05*Math.sin(F*7)*h,F]},6,8,3),m(5),we(2,2,(z,g)=>.14*(z*z+g*g),4),m(6),V((z,g)=>{const h=z-.5,F=g-.5;return[h,.05*(h*h+F*F),F]},3,3,6),m(12),m(13);{const z=(g,h,F,y,d,x)=>{const p=[[g,F,d],[h,F,d],[h,y,d],[g,y,d],[g,F,x],[h,F,x],[h,y,x],[g,y,x]],A=[[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[3,2,6,7],[4,5,1,0]];for(const B of A)k(p[B[0]],p[B[1]],p[B[2]],p[B[3]],5)};z(-.025,.025,0,.045,-.5,.5),z(0,.2,.005,.035,.1,.13),z(-.16,0,.005,.03,-.22,-.2),m(7)}we(2,3,(z,g)=>.03*z,6),m(8);{for(let g=0;g<21;g++){const h=Ge*g/21,F=Ge*(g+1)/21,y=.5+.035*Math.cos(h*21),d=.5+.035*Math.cos(F*21);k([Math.cos(h)*y,0,Math.sin(h)*y],[Math.cos(F)*d,0,Math.sin(F)*d],[Math.cos(F)*.46,.2,Math.sin(F)*.46],[Math.cos(h)*.46,.2,Math.sin(h)*.46],7),T([Math.cos(h)*.46,.2,Math.sin(h)*.46],[Math.cos(F)*.46,.2,Math.sin(F)*.46],[0,.21,0],7)}m(9)}return{data:a,counts:t}}function Ws(a,t){if(t.ok)return;t.ok=!0;const c=Hs();for(const w of ua)j0(a,t[w],w);for(const w of ua){const T=t[w];a.useProgram(T.p);for(const k in Gt[w])T.u[k]&&a.uniform1i(T.u[k],Gt[w][k]);T.u.uOne&&a.uniform1i(T.u.uOne,1)}if(t.visR){const w=t.visR;j0(a,w,"visR"),a.useProgram(w.p),a.uniform1i(w.u.uS,0),a.uniform1i(w.u.uB,2),w.u.uOne&&a.uniform1i(w.u.uOne,1)}t.noiseT=bo(a,256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR,a.REPEAT);const E=va(a,t.noiseT);a.viewport(0,0,256,256),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.useProgram(t.noise.p),a.bindVertexArray(t.vao0),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,null),a.deleteFramebuffer(E),a.bindTexture(a.TEXTURE_2D,t.noiseT),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR),t.meshT=bo(a,O0,xo*2,a.RGBA32F,a.RGBA,a.FLOAT,a.NEAREST,0,c.data),t.counts=c.counts}const js={"Newspaper grey":0,White:1,"Coloured origami":2,"Gold foil":3,"Brown wrapping paper":4,"Squared exercise paper":5},pa=[[.72,.1,.08],[.1,.28,.68],[.9,.66,.1],[.12,.46,.22],[.88,.42,.52],[.92,.42,.08],[.45,.2,.55]];ta.add({num:52,name:"Paper Boats",fam:"Worlds",recipe:"Kerb height in a stone gutter after a summer rain, where the water flows round the stones to the drain. Paper boats float on it, spin, run aground and sink, and pile up on the drain until a surge floats them over. Tap to set a boat on the water, drag slowly to build a leaf dam, drag fast to send a wave, or hold for rain.",interactive:"Tap to set a paper boat on the water, drag slowly across the gutter to pile a dam of leaves, drag fast to sweep the water and send a wave down it (it carries the boats). Hold to bring a shower back.",music:!0,gl:!0,fps:30,seed:0,make(a){const t=a.gl,c=a.size,E=a.hash.slice(2),w=e=>{let o=parseInt(E.slice(e,e+8),16)>>>0,s=parseInt(E.slice(e+8,e+16),16)>>>0,r=parseInt(E.slice(e+16,e+24),16)>>>0,n=2654435769;const i=()=>{o>>>=0,s>>>=0,r>>>=0,n=n+1831565813|0;const u=o+s+n|0;return o=s^s>>>9,s=r+(r<<3)|0,r=(r<<21|r>>>11)+u|0,(u>>>0)/4294967296};for(let u=0;u<12;u++)i();return i},T=w(0),k=w(16),K=w(32),m=w(40),V=(e,o=T)=>{let s=0;for(const n of e)s+=n[1];let r=o()*s;for(const n of e)if(r-=n[1],r<=0)return n[0];return e[e.length-1][0]},f=(e,o,s=T)=>e+(o-e)*s();let we=V([["Old cobbles",26],["Granite setts",20],["Brick lane",18],["Stone channel in a garden",12],["Asphalt with a painted line",24]]),z=V([["White",24],["Newspaper grey",22],["Coloured origami",24],["Brown wrapping paper",14],["Squared exercise paper",10],["Gold foil",6]]);const g=(()=>{let e=(parseInt(E.slice(46,54),16)^461845907)>>>0;return()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})(),h=a.home?"Summer":V([["Summer",30],["Autumn",30],["Winter thaw",18],["Spring",22]],g);let F=V(h==="Winter thaw"?[["Grey after-rain",55],["Blue evening, streetlamp",25],["Golden late sun",20]]:[["Golden late sun",34],["Grey after-rain",20],["Blue evening, streetlamp",16],["Hard noon, dappled shade",16],["Neon sign at night",14]]),y=h==="Autumn"?"Autumn leaves":V(h==="Winter thaw"?[["Ice and slush",70],["Seeds and twigs",30]]:h==="Spring"?[["Cherry petals",70],["Seeds and twigs",30]]:[["Autumn leaves",25],["Cherry petals",25],["Seeds and twigs",50]]),d=V([["Iron grate",52],["Stone spout",28],["Culvert pipe",20]]),x=V([["Classic boats",34],["Boats and hats",24],["A crane among them",14],["Flat-bottomed punts",18],["A walnut-shell fleet",10]]),p=V([["None",70],["A toy duck",12],["A frog",10],["A fleet from upstream",8]]);(p==="A toy duck"||p==="A frog")&&(p="None"),we==="Stone channel in a garden"&&d==="Stone spout"&&(d="Culvert pipe");let A=V([["A trickle",18],["Running",40],["In spate",22],["Slow and deep",20]],g),B=V([["A few stones",34],["Clear run",16],["Rubble and half-bricks",24],["A line of stepping stones",14],["Downspout pouring in",12]],g),C=V([["Weathered stone",40],["Painted yellow",22],["Black and white blocks",16],["Old and mossy",22]],g);a.home&&(we="Old cobbles",z="White",F="Golden late sun",y="Autumn leaves",d="Iron grate",x="Classic boats",p="None",A="Running",B="A few stones",C="Weathered stone"),we==="Stone channel in a garden"&&(C="Old and mossy");const L=(()=>{let e=(parseInt(E.slice(22,30),16)^2135587861)>>>0;return()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})(),G=!a.home&&L()<.2?.55:0;a.trait("Street",we),a.trait("Paper",z),a.trait("Light",G?{"Golden late sun":"Sun shower","Grey after-rain":"Grey, still raining"}[F]||F+", still raining":F),a.trait("Folds",x),a.trait("Season",h),a.trait("Water",A),a.trait("Layout",B);const W=(()=>{let e=(parseInt(E.slice(6,14),16)^739982445)>>>0;return()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})();let ve=V([["A few",40],["A flotilla",42],["One big boat",18]],W);a.home&&(ve="A few"),a.trait("Boats",p==="A fleet from upstream"?"A fleet from upstream":ve);const v0=(()=>{let e=(parseInt(E.slice(30,38),16)^1374496523)>>>0;return()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})();let de=V([["Kerb height",46],["Looking upstream",30],["Looking down",24]],v0);a.home&&(de="Kerb height");const zt=de==="Looking upstream";a.trait("View",de);const ge=ve==="One big boat",Ot=ge?3:ve==="A flotilla"?.28:1,nt={"Old cobbles":0,"Granite setts":1,"Brick lane":2,"Stone channel in a garden":3,"Asphalt with a painted line":4}[we],he={"Iron grate":0,"Stone spout":1,"Culvert pipe":2}[d],Pe={"Golden late sun":0,"Grey after-rain":1,"Blue evening, streetlamp":2,"Hard noon, dappled shade":3,"Neon sign at night":4}[F],Ce=Pe===2||Pe===4,Z0={Summer:0,Autumn:1,"Winter thaw":2,Spring:3}[h],xa={"Weathered stone":0,"Painted yellow":1,"Black and white blocks":2,"Old and mossy":3}[C],da=!Ce&&Z0!==2&&he===0&&xa===0&&Pe!==3,Y=Ls(t,Oe[de].home?da:null),Rt={"A trickle":0,Running:1,"In spate":2,"Slow and deep":3}[A],Et=js[z],Se=nt===3,N=Se?-.11:-.13,St=Se?0:f(.095,.112,k),me=(Se?.22:.26)*(Rt===0&&!Se?.8:1),h0=f(.01,.014,k)*[.9,1,1.5,.4][Rt],it=f(.86,1,k),m0=f(.012,.02,k),$=he===2?f(1.62,1.75,k):f(1.4,1.55,k),K0=Se?.03:f(.01,.014,k),ya=f(.025,.04,k),rt=Se?N+me*.5:N+.07,go=k()*1e6|0,Fe=[];if(B==="A few stones"){const e=2+Math.floor(k()*3);for(let o=0;o<e;o++){const s=o%2===0,r=s?f(.42,it-.1,k):f(it+.12,$-.24,k),n=f(N+.03,N+me-.06,k);Fe.some(i=>Math.hypot(i[0]-n,i[1]-r)<.09)||Fe.push([n,r,f(.022,.036,k),f(.02,.03,k)])}}else if(B==="Rubble and half-bricks"){const e=6+Math.floor(k()*3);for(let o=0,s=0;o<e&&s<40;s++){const r=f(.4,$-.2,k),n=f(N+.02,N+me-.04,k);if(Fe.some(u=>Math.hypot(u[0]-n,u[1]-r)<.075))continue;const i=k()<.55;Fe.push([n,r,f(.02,.034,k),(i?-1:1)*f(.016,.028,k)]),o++}}else if(B==="A line of stepping stones"){const e=f(.55,.8,k),o=4,s=me/o;for(let r=0;r<o;r++)Fe.push([N+s*(r+.5)+f(-.008,.008,k),e+f(-.015,.015,k),f(.024,.03,k),f(.018,.025,k)])}B==="Downspout pouring in"&&k()<.5&&Fe.push([N+.05,it-.2,.028,.024]),a.home&&(Fe.length=0,Fe.push([N+.1,.72,.03,.03],[N+.17,1.18,.026,.026],[N+.05,.9,.022,.024]));const p0=rt,Xs=-h0*($-.25)-K0-m0+.045,wa=(e,o)=>{let s=-h0*(o-.25);if(e>=N&&e<N+me){const r=e<rt?(e-rt)/(rt-N):(e-rt)/(N+me-rt);s-=K0*(Se?1-r**6:1-r*r)}else e>=N+me?s+=Se?Math.min(.02,(e-N-me)*.4)+.005:ya*(e-N-me):s+=Se?Math.min(.03,(N-e)*.4)+.008:.02*Math.min(N-e,1);return s+=(Os(e*4.5,o*3.5,3,go)-.5)*(e>N?.006:.002),s},Zs=(e,o)=>{let s=0;St>0&&(s+=St*st(N+.002,N-.007,e));const r=st(N-.01,N+.003,e)*st(N+me+.06,N+me-.01,e);s-=m0*st(it-.004,it+.004,o)*r;for(const n of Fe){const i=(e-n[0])/n[2],u=(o-n[1])/n[2];if(n[3]<0){const v=Math.cos(n[0]*37),l=Math.sin(n[0]*37),R=Math.abs(i*v+u*l)/1.55,M=Math.abs(-i*l+u*v)/.78,_=1-Math.max(R,M);_>0&&(s+=-n[3]*st(0,.32,_))}else{const v=1-i*i-u*u;if(v>0){let l=ee(v/.8,0,1);l=1-(1-l)*(1-l),s+=n[3]*l}}}if(he===0)Math.abs(e-N-.1)<.095&&Math.abs(o-$)<.16&&(s-=.004);else if(he===1){const n=st(.17,.13,Math.abs(o-$));s-=.007*n*st(N+.12,N,e)}else s+=.13*st($-.003,$+.003,o);return s},Bt=(e,o)=>wa(e,o)+Zs(e,o),Ks=zt?{...Oe[de],eye:[Oe[de].eye[0],Oe[de].eye[1],it+Oe[de].eye[2]]}:Oe[de],{EYE:Ye,TANF:Ys,CF:Po,CR:ko,CU:Ao,VP:$s,rayDir:Qs,toUVj:jn,fromUVj:Js,W:He}=Ps(Ks),$e=_s(t,Y,!He),re=H*se,Mo=e=>e>N+.004&&e<N+me,Nt=Y.jc||(Y.jc=new Map),Y0=a.hash;let Ht=Nt.get(Y0);if(Ht)Nt.delete(Y0),Nt.set(Y0,Ht);else{const e=new Float32Array(re),o=new Float32Array(re*4);for(let i=0;i<se;i++)for(let u=0;u<H;u++){const v=i*H+u,l=wt+(u+.5)*xe,R=te+(i+.5)*xe,M=Bt(l,R);e[v]=M;let _=0;if(he===0){const O=Math.abs(l-N-.1),j=Math.abs(R-$);O<.08&&j<.145&&(_=-7)}else he===1?l<N+.02&&l>N-.004&&Math.abs(R-$)<.13&&(_=12):R<$&&R>$-.05&&Math.abs(l-p0)<.065&&(_=14);o[v*4]=M,o[v*4+1]=_,o[v*4+2]=i<3&&Mo(l)?1:0,B==="Downspout pouring in"&&!Se&&Math.hypot(l-(N+.035),R-(it-.32))<.03&&(o[v*4+2]=12)}const s=new Float32Array(re*4),r=new Float32Array(re);{const i=new Float32Array(re).fill(1e9),u=new Uint8Array(re),v=new Float64Array(re),l=new Int32Array(re);let R=0,M=0,_=0;const O=(b,U)=>{let q=R++;for(v[q]=U,l[q]=b;q>0;){const D=q-1>>1;if(v[D]<=v[q])break;const P=v[D],I=l[D];v[D]=v[q],l[D]=l[q],v[q]=P,l[q]=I,q=D}},j=()=>{if(M=v[0],_=l[0],R--,R){v[0]=v[R],l[0]=l[R];let b=0;for(;;){const U=b*2+1,q=U+1;let D=b;if(U<R&&v[U]<v[D]&&(D=U),q<R&&v[q]<v[D]&&(D=q),D===b)break;const P=v[D],I=l[D];v[D]=v[b],l[D]=l[b],v[b]=P,l[b]=I,b=D}}};for(let b=0;b<se;b++)for(let U=0;U<H;U++)if(U===0||U===H-1||b===0||b===se-1){const q=b*H+U;u[q]=1,i[q]=e[q],O(q,e[q])}for(;R;){j();const b=M,U=_,q=U%H,D=U/H|0;for(let P=0;P<4;P++){const I=q+(P===0?-1:P===1?1:0),Z=D+(P===2?-1:P===3?1:0);if(I<0||I>=H||Z<0||Z>=se)continue;const Q=Z*H+I;u[Q]||(u[Q]=1,i[Q]=Math.max(e[Q],b),O(Q,i[Q]))}}for(let b=0;b<se;b++){let U=1e9;for(let D=0;D<H;D++){const P=wt+(D+.5)*xe;Mo(P)&&(U=Math.min(U,e[b*H+D]))}const q=U+[.0045,.011,.019,.022][Rt];for(let D=0;D<H;D++){const P=b*H+D,I=wt+(D+.5)*xe;let Z=Math.max(0,i[P]-4e-4-e[P]);I>N&&I<N+me+.15&&(Z=Math.max(Z,q-e[P])),Z=Math.min(Z,.038),o[P*4+1]!==0&&(Z*=.4),s[P*4+1]=Z,r[P]=Z}}}const n=new Uint16Array(c0*G0);for(let i=0;i<G0;i++)for(let u=0;u<c0;u++){const v=Js((u+.5)/c0,(i+.5)/G0);n[i*c0+u]=Vs(wa(v[0],v[1]))}Ht={BED:e,bedTx:o,init:s,depth0:r,mac:n},Nt.set(Y0,Ht),Nt.size>6&&Nt.delete(Nt.keys().next().value)}const{BED:Qe,bedTx:za,init:ba,depth0:en}=Ht,S={L:[0,1,0],sunC:[0,0,0],skyZ:[0,0,0],skyH:[0,0,0],skyS:[0,0,0],amb:[0,0,0],expo:1,cover:.5,lampP:[0,0,0],lampI:0,lampC:[1,.6,.3],win:0},ga=K()<.8?f(.2,.85,K):f(-.5,-.2,K),Fo=(Pe===0?f(7,11,K):Pe===3?f(48,60,K):34)*r0,Pa=zt?ga+Math.PI:ga,tn=[Math.sin(Pa)*Math.cos(Fo),Math.sin(Fo),Math.cos(Pa)*Math.cos(Fo)],Wt=[f(.55,.9,K),3.6,f(2.6,3.6,K)];zt&&(Wt[2]=Ye[2]-Wt[2]);const ka=Ce?(()=>{const e=[Wt[0]-.05,Wt[1],Wt[2]-1],o=Math.hypot(...e);return e.map(s=>s/o)})():tn,We=[{sunC:[1,.7,.42],sunI:3.3,skyZ:[.3,.42,.66],skyH:[.92,.74,.58],skyS:[1,.58,.28],amb:[.2,.22,.27],expo:1,cover:f(.4,.6,K)},{sunC:[.92,.92,.95],sunI:.45,skyZ:[.56,.59,.63],skyH:[.74,.75,.77],skyS:[.8,.79,.76],amb:[.42,.44,.48],expo:1.2,cover:.9},{sunC:[0,0,0],sunI:0,skyZ:[.04,.075,.2],skyH:[.17,.2,.33],skyS:[.32,.22,.28],amb:[.035,.05,.1],expo:2.6,cover:.45},{sunC:[1,.94,.84],sunI:4.4,skyZ:[.28,.46,.8],skyH:[.72,.74,.72],skyS:[.5,.48,.4],amb:[.3,.34,.4],expo:.78,cover:.3},{sunC:[0,0,0],sunI:0,skyZ:[.02,.03,.08],skyH:[.1,.09,.2],skyS:[.3,.1,.3],amb:[.022,.03,.08],expo:2.9,cover:.5}][Pe],on=[[.95,.2,.5],[.15,.85,.9],[.95,.35,.12],[.5,.3,.98]][Math.floor(K()*4)];Z0===2&&Pe===1&&(We.skyZ=[.6,.66,.74],We.skyH=[.82,.84,.88]),Z0===1&&Pe===1&&(We.amb=[.42,.4,.38]);const Ro=K()*100;let oe=G,$0=G,x0=Pe===1?.95:f(.75,.92,m),jt=1;const Aa=e=>{const o=.5+.5*Math.sin(e*.05+Ro)*Math.sin(e*.031+Ro*1.7);jt=Pe===0?ee(.35+.9*st(.25,.6,o),0,1):1,a.home&&e<30&&(jt=Math.max(jt,.95)),jt*=1-.88*oe;const s=We.sunI;S.L=ka,S.sunC=We.sunC.map(n=>n*s);const r=[.55,.58,.62];S.skyZ=We.skyZ.map((n,i)=>V0(n,r[i]*(Ce?.25:1),oe*.7)),S.skyH=We.skyH.map((n,i)=>V0(n,r[i]*1.1*(Ce?.3:1),oe*.7)),S.skyS=We.skyS.map(n=>n*(1-oe*.8)),S.amb=We.amb.map((n,i)=>V0(n,r[i]*.55*(Ce?.25:1),oe*.5)),S.cover=V0(We.cover,1,oe),S.expo=We.expo*(1+oe*.25),S.lampI=Pe===4?16:Ce?12:0,S.lampP=Wt,S.win=Ce?1:0,Pe===4&&(S.lampC=on)};Aa(0),Ws(t,Y);let Ma=null;const Tt={gl:t,tex:[],fbo:[],buf:[],vao:[],rb:[]},Re=(e,o,s,r,n,i,u,v)=>{const l=bo(t,e,o,s,r,n,i,u,v);return Tt.tex.push(l),l},qe=(e,o)=>{const s=va(t,e,o);return Tt.fbo.push(s),s},Fa=(e,o)=>{const s=t.createRenderbuffer();return t.bindRenderbuffer(t.RENDERBUFFER,s),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,e,o),t.bindRenderbuffer(t.RENDERBUFFER,null),Tt.rb.push(s),s},ke=!Y.hbf,d0=!0,Ra=Y.cbf?t.RGBA32F:t.RGBA16F,bt=c>300?aa:aa*5/8,qt=c>300?sa:sa*5/8,an=Ht.mac,sn=Re(c0,G0,t.R16F,t.RED,t.HALF_FLOAT,t.LINEAR,0,an),Q0=Y.hbf?t.RGBA16F:t.RGBA8,y0=Y.hbf?t.HALF_FLOAT:t.UNSIGNED_BYTE,Ea=ke?t.RGBA16F:Q0,Sa=ke?t.HALF_FLOAT:y0,Ba=ke?t.SRGB8_ALPHA8:Q0,w0=(e,o,s)=>Re(e,o,t.RGBA32UI,t.RGBA_INTEGER,t.UNSIGNED_INT,t.NEAREST,0,s),J0=Re(bt,qt,Ea,t.RGBA,Sa,t.LINEAR),Eo=Re(bt,qt,Ea,t.RGBA,Sa,t.LINEAR),eo=Re(H,se,t.RGBA32F,t.RGBA,t.FLOAT,t.NEAREST,0,za),to=[0,1].map(()=>ke?w0(H,se,new Uint32Array(ba.buffer)):Re(H,se,Ra,t.RGBA,t.FLOAT,t.NEAREST,0,ba)),So=[0,1].map(()=>ke?w0(H,se,new Uint32Array(re*4)):Re(H,se,Ra,t.RGBA,t.FLOAT,t.NEAREST,0,new Float32Array(re*4))),Na=ke?w0(H,se):Re(H,se,Q0,t.RGBA,y0,t.LINEAR),Ta=4,Bo=H*Ta,No=se*Ta,To=ke?w0(Bo,No):Re(Bo,No,Q0,t.RGBA,y0,t.LINEAR),qa=H*2,Da=se*2,qo=[0,1].map(()=>Re(qa,Da,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR)),nn=Re(H,se,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST),La=Re(c,c,Ba,t.RGBA,y0,t.LINEAR),rn=Fa(c,c),Xt=Math.ceil(c/2),Ua=Re(Xt,Xt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),cn=Fa(Xt,Xt),Do=c>300?512:256,_a=Do*3/4,Ca=Re(Do,_a,Ba,t.RGBA,y0,t.LINEAR,t.REPEAT),fn=qe(Ca),oo=Math.ceil(c/3),Ia=Re(oo,oo,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),ln=ke?null:qe(J0),un=ke?null:qe(Eo),vn=to.map(e=>qe(e)),hn=So.map(e=>qe(e)),mn=qe(Na),pn=qe(To),xn=qo.map(e=>qe(e)),Va=qe(nn),dn=qe(La,rn),yn=qe(Ua,cn),wn=qe(Ia);t.bindFramebuffer(t.FRAMEBUFFER,null);const z0=t.createBuffer();Tt.buf.push(z0),t.bindBuffer(t.PIXEL_PACK_BUFFER,z0),t.bufferData(t.PIXEL_PACK_BUFFER,re*4,t.STREAM_READ),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const ao=t.createBuffer();Tt.buf.push(ao);const Lo=t.createVertexArray();Tt.vao.push(Lo),t.bindVertexArray(Lo),t.bindBuffer(t.ARRAY_BUFFER,ao),t.bufferData(t.ARRAY_BUFFER,160*64,t.DYNAMIC_DRAW);for(let e=0;e<4;e++)t.enableVertexAttribArray(e),t.vertexAttribPointer(e,4,t.FLOAT,!1,64,e*16),t.vertexAttribDivisor(e,1);t.bindVertexArray(null);const J=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},Je=()=>{t.bindVertexArray(Y.vao0),t.drawArrays(t.TRIANGLES,0,3)},Zt=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.depthMask(!1)},so=new Float32Array(48);so.set([N,St,me,h0,it,m0,he,$,nt,K0,ya,go%1e3]),Fe.length=Math.min(Fe.length,9),Fe.forEach((e,o)=>so.set(e,12+o*4)),Zt();const Ga=ke?w0(bt,qt):null,Uo=ke?qe(Ga):null,Oa=ke?new Uint32Array(bt*qt*4):null,Ha=e=>{t.readPixels(0,0,bt,qt,t.RGBA_INTEGER,t.UNSIGNED_INT,Oa),t.bindTexture(t.TEXTURE_2D,e),t.texSubImage2D(t.TEXTURE_2D,0,0,0,bt,qt,t.RGBA,t.FLOAT,new Float32Array(Oa.buffer))};t.bindFramebuffer(t.FRAMEBUFFER,ke?Uo:ln),t.viewport(0,0,bt,qt),He&&Cs(t,$e),t.useProgram($e.bakeA.p),J(0,sn),J(1,Y.noiseT),t.uniform4fv($e.bakeA.u.uGeo,so),He&&t.uniform4fv($e.bakeA.u.uW,He),Je(),ke&&Ha(J0),t.bindFramebuffer(t.FRAMEBUFFER,ke?Uo:un),t.useProgram($e.bakeB.p),J(0,J0),He&&t.uniform4fv($e.bakeB.u.uW,He),t.uniform3fv($e.bakeB.u.uL,ka),t.uniform1f($e.bakeB.u.uSoft,Pe===1?.9:Ce?.15:.06),t.uniform4fv($e.bakeB.u.uGeo,so),Je(),ke&&(Ha(Eo),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(Uo),t.deleteTexture(Ga));let Kt=0,b0=0,g0=0,Yt=0;const Dt=1/60,je=new Float32Array(12),gt=new Float32Array(48),ce=new Float32Array(144);let ct=0;const Wa=new Float32Array(36);Fe.slice(0,9).forEach((e,o)=>Wa.set([e[0],e[1],e[2],1.1],o*4));const P0=[],De={x:0,z:0,r:.05,s:0,dx:0,dz:0},zn=f(.05,.07,m)*(a.home?1.1:1)*[.3,1,2.1,1.05][Rt],bn=[.042,.022,.012,.04][Rt],gn=5,ja=.9,Xa=e=>{if(Zt(),t.viewport(0,0,H,se),t.bindFramebuffer(t.FRAMEBUFFER,hn[1-b0]),t.useProgram(Y.flux.p),J(0,to[Kt]),J(1,So[b0]),J(2,eo),je[0]=Dt,je[1]=bn,je[2]=gn,je[3]=Yt,je[4]=De.x,je[5]=De.z,je[6]=De.r,je[7]=De.s,je[8]=De.dx,je[9]=De.dz,t.uniform4fv(Y.flux.u.uP,je),t.uniform4fv(Y.flux.u.uBt,ce),t.uniform1i(Y.flux.u.uNB,ct),t.uniform4fv(Y.flux.u.uSt,Wa),Je(),b0=1-b0,t.bindFramebuffer(t.FRAMEBUFFER,vn[1-Kt]),t.useProgram(Y.state.p),J(0,to[Kt]),J(1,So[b0]),J(2,eo),gt.fill(0),gt[0]=Dt,gt[1]=zn*(1+2.2*Math.max(0,oe-G)),gt[2]=Math.max(0,oe-G)*25e-5,gt[3]=1,gt[36]=Yt,Yt+=Dt,e)for(let o=0;o<Math.min(8,P0.length);o++)gt.set(P0[o],4+o*4);t.uniform4fv(Y.state.u.uP,gt),Je(),Kt=1-Kt},no=e=>{Zt(),t.viewport(0,0,H,se),t.bindFramebuffer(t.FRAMEBUFFER,e?Va:mn);const o=e&&Y.visR||Y.vis;t.useProgram(o.p),J(0,to[Kt]),J(2,eo),t.uniform1i(o.u.uRB,e?1:0),Je()},Za=()=>{Zt(),t.bindFramebuffer(t.FRAMEBUFFER,pn),t.viewport(0,0,Bo,No),t.useProgram(Y.surf.p),J(0,Na),Je()};let k0=0;const A0=new Float32Array(4),Ka=(e,o)=>{Zt(),t.bindFramebuffer(t.FRAMEBUFFER,xn[1-k0]),t.viewport(0,0,qa,Da),t.useProgram(Y.foam.p),J(0,To),J(1,qo[k0]),J(2,eo),A0[0]=e,A0[1]=1.1,A0[2]=.55,A0[3]=o,t.uniform4fv(Y.foam.u.uP,A0),t.uniform4fv(Y.foam.u.uBt,ce),t.uniform1i(Y.foam.u.uNB,ct),Je(),k0=1-k0},Ee=new Float32Array(re),Xe=new Float32Array(re),Be=new Float32Array(re),Ne=new Float32Array(re),Lt=new Uint8Array(re*4);Ee.set(en);let Pt=null,_o=0;const $t=new Float32Array(re),Qt=new Float32Array(re),Jt=new Float32Array(re);let Co=0,Io=0,M0=0,Ya=0,e0=null;const $a=()=>{$t.set(Ee),Qt.set(Be),Jt.set(Ne),Io=M0,M0=Co;for(const e of le)e.tqA=e.tqB||null,e.tqB=e.tqR||null},Qa=new Float32Array(256).map((e,o)=>o/255*.06),Ja=new Float32Array(256).map((e,o)=>(o/255-.5)*2),Vo=()=>{for(let e=0,o=0;e<re;e++,o+=4)Ee[e]=Qa[Lt[o]],Xe[e]=Qa[Lt[o+1]],Be[e]=Ja[Lt[o+2]],Ne[e]=Ja[Lt[o+3]]},Pn=()=>{if(!Pt){no(!0),t.bindBuffer(t.PIXEL_PACK_BUFFER,z0),t.readPixels(0,0,H,se,t.RGBA,t.UNSIGNED_BYTE,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),Pt=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0),Co=Yt;for(const e of le)e.tqR=e.tq0||null}},kn=()=>{if(!Pt)return;if(++_o>6){t.deleteSync(Pt),Pt=null,_o=0,t.bindBuffer(t.PIXEL_PACK_BUFFER,z0),t.bufferData(t.PIXEL_PACK_BUFFER,re*4,t.STREAM_READ),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),t.bindFramebuffer(t.FRAMEBUFFER,Va),t.readPixels(0,0,H,se,t.RGBA,t.UNSIGNED_BYTE,Lt),$a(),Vo();return}const e=t.clientWaitSync(Pt,0,0);e===t.TIMEOUT_EXPIRED||e===t.WAIT_FAILED||(t.deleteSync(Pt),Pt=null,_o=0,t.bindBuffer(t.PIXEL_PACK_BUFFER,z0),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,Lt),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),$a(),Vo())};if(d0){for(let e=0;e<120;e++)Xa(!1);no(!0),t.readPixels(0,0,H,se,t.RGBA,t.UNSIGNED_BYTE,Lt),Vo()}if($t.set(Ee),Qt.set(Be),Jt.set(Ne),Io=M0=Co=Yt,He&&d0){let e=0,o=0;for(let s=3;s<7;s++)for(let r=0;r<H;r++){const n=s*H+r;Ee[n]>.001&&Mo(wt+(r+.5)*xe)&&(e+=Qe[n]+Xe[n]+Ee[n]+h0*(te+(s+.5)*xe-.25),o++)}o&&(He[8]=e/o)}let Go=0,Oo=0;const es=(e,o)=>{Go=ee((e-wt)/xe-.5,0,H-1.001),Oo=ee((o-te)/xe-.5,0,se-1.001)},t0=(e,o,s)=>{es(o,s);const r=Go,n=Oo,i=r|0,u=n|0,v=r-i,l=n-u,R=u*H+i;return(e[R]*(1-v)+e[R+1]*v)*(1-l)+(e[R+H]*(1-v)+e[R+H+1]*v)*l},fe={d:0,e:0,u:0,v:0,b:0},ae=(e,o)=>{o<te+.08&&o>=te-.2&&(o=te+.08),es(e,o);const s=Go,r=Oo,n=s|0,i=r|0,u=s-n,v=r-i,l=i*H+n,R=(1-u)*(1-v),M=u*(1-v),_=(1-u)*v,O=u*v,j=l+1,b=l+H,U=l+H+1,q=Ya,D=Math.max(0,Ee[l]+(Ee[l]-$t[l])*q),P=Math.max(0,Ee[j]+(Ee[j]-$t[j])*q),I=Math.max(0,Ee[b]+(Ee[b]-$t[b])*q),Z=Math.max(0,Ee[U]+(Ee[U]-$t[U])*q);fe.d=D*R+P*M+I*_+Z*O,fe.u=(Be[l]+(Be[l]-Qt[l])*q)*R+(Be[j]+(Be[j]-Qt[j])*q)*M+(Be[b]+(Be[b]-Qt[b])*q)*_+(Be[U]+(Be[U]-Qt[U])*q)*O,fe.v=(Ne[l]+(Ne[l]-Jt[l])*q)*R+(Ne[j]+(Ne[j]-Jt[j])*q)*M+(Ne[b]+(Ne[b]-Jt[b])*q)*_+(Ne[U]+(Ne[U]-Jt[U])*q)*O,fe.b=(Qe[l]+Xe[l])*R+(Qe[j]+Xe[j])*M+(Qe[b]+Xe[b])*_+(Qe[U]+Xe[U])*O;let Q=0,ie=0;if(D>8e-4&&(Q+=(Qe[l]+Xe[l]+D)*R,ie+=R),P>8e-4&&(Q+=(Qe[j]+Xe[j]+P)*M,ie+=M),I>8e-4&&(Q+=(Qe[b]+Xe[b]+I)*_,ie+=_),Z>8e-4&&(Q+=(Qe[U]+Xe[U]+Z)*O,ie+=O),fe.e=ie>.05?Q/ie:fe.b+fe.d,e0&&fe.d>8e-4){const X=Ho(e0.tqB,e,o,fe.d)*(1+q)-Ho(e0.tqA,e,o,fe.d)*q-Ho(e0.tqN,e,o,fe.d);fe.d=Math.max(0,fe.d+X),fe.e+=X}return(e<wt||e>po||o<te-.2||o>Ft)&&(fe.d=0,fe.u=0,fe.v=0,fe.b=Bt(e,o),fe.e=fe.b),fe},Ho=(e,o,s,r)=>{if(!e)return 0;const n=o-e[0],i=s-e[1],u=n*e[3]+i*e[2],v=n*e[2]-i*e[3],l=u*u*e[4]+v*v*e[5];return l>9?0:e[6]*Math.exp(-l)*Math.min(1,r/.007)},An=e=>Et===0?[.6,.59,.56]:Et===1?[.88,.87,.84]:Et===3?[.92,.6,.17]:Et===4?[.55,.38,.2]:Et===5?[.92,.92,.9]:pa[e%pa.length],ts=[.011,.008,.007,.0022,.013,.009][Et],et=x==="Classic boats"?[0,0,0]:x==="Boats and hats"?[0,1,0,1,1]:x==="Flat-bottomed punts"?[3,3,3,0]:x==="A walnut-shell fleet"?[4,4,4,4,0]:[0,2,1,0,2],Mn=[.075,.066,.07,.082,.05],le=[];let F0=0,Fn=Math.floor(m()*7),Rn=0;const R0=(e,o,s,r={})=>{if(le.length>=22){let u=0,v=-1;le.forEach((l,R)=>{const M=(l.out?50+l.z:0)+l.sunk*2+l.age*.01;M>v&&(v=M,u=R)}),le.splice(u,1)}const n=ae(o,s),i={ty:e,x:o,z:s,y:r.y??n.e-.004,vx:r.vx||n.u,vz:r.vz||n.v,yaw:r.yaw??f(-.6,.6,m),w:0,roll:0,pitch:0,rv:0,pv:0,vy:0,wet:r.wet||0,flood:0,sx:0,sz:0,svx:0,svz:0,sunk:0,lost:0,sc:Mn[e]*(r.sc||1)*f(.92,1.08,m),col:r.col||An(Fn++),seed:Rn++*.618%1,age:0,cd:0,pin:0,eta:n.e,mode:0};return le.push(i),i},os=y==="Ice and slush"?[[.85,.9,.97],[.9,.94,1],[.75,.84,.95]]:y==="Autumn leaves"?[[.55,.2,.04],[.72,.42,.07],[.4,.13,.04],[.78,.3,.05],[.42,.33,.1]]:y==="Cherry petals"?[[.96,.74,.8],[.98,.86,.88],[.9,.6,.7],[.97,.8,.84]]:[[.62,.46,.25],[.5,.36,.2],[.3,.2,.12],[.36,.26,.16]],En=y==="Autumn leaves"?[[.32,.14,.04],[.5,.3,.07]]:y==="Ice and slush"?[[.7,.75,.85],[.8,.85,.92]]:y==="Cherry petals"?[[.8,.58,.62],[.3,.2,.12]]:[[.3,.22,.13],[.2,.15,.1]],o0=()=>y==="Ice and slush"?12:y==="Autumn leaves"?5:y==="Cherry petals"?6:m()<.55?8:7,Sn=e=>e===12?f(.025,.06,m):e===5?f(.035,.06,m):e===6?f(.012,.017,m):e===8?f(.03,.04,m):f(.04,.08,m),Ie=[],ft=(e,o,s,r,n={})=>{if(Ie.length>=90){const u=Ie.findIndex(v=>v.st==="float"||v.st==="sunk");if(u<0)return null;Ie.splice(u,1)}const i={ty:e,x:o,z:s,y:0,yaw:f(0,Ge,m),roll:f(-.2,.2,m),pitch:f(-.15,.15,m),vx:0,vz:0,w:f(-.4,.4,m),sc:n.sc||Sn(e),col:n.col||(e===7?[[.24,.16,.1],[.3,.22,.14],[.2,.15,.11]][Math.floor(m()*3)]:os[Math.floor(m()*os.length)]),st:r,eta:-9,seed:m(),lost:0,age:0};return Ie.push(i),i},tt=e=>{let o=rt,s=-1;for(let r=0;r<9;r++){const n=N+.02+(me-.05)*r/8,i=ae(n,e);i.d>s&&(s=i.d,o=n)}return o};for(let e=0;e<16;e++){const o=f(.3,2.6,m),s=m(),r=s<.35&&St>0?f(N-.28,N-.02,m):s<.5&&Se?f(N-.3,N-.02,m):f(N+me+.01,N+me+.6,m),n=o0(),i=ft(n,r,o,"dry");if(i){const u=ae(r,o);u.d>.002&&o<Ft&&(i.st="sunk"),i.y=(u.d>.002?u.b:Bt(r,o))+.001}}for(let e=0;e<9;e++){const o=f(.3,$-.1,m),s=tt(o)+f(-.04,.04,m);ft(o0(),s,o,m()<.3?"sunk":"float")}const lt=ft(9,N+me+f(0,.05,m),f(.55,1.2,m),"dry",{sc:.03,col:m()<.5?[.34,.34,.36]:[.42,.32,.15]});lt&&(lt.roll=0,lt.pitch=0,ae(lt.x,lt.z).d>.004&&(lt.st="float"),lt.y=Bt(lt.x,lt.z));const Bn=a.home?3:2+Math.floor(m()*2),Nn=a.home?[.42,.56,.72]:[f(.42,.52,m),f(.56,.72,m),f(.76,.98,m)];for(let e=0;e<(ge?1:Bn);e++){const o=ge?f(.5,.62,m):Nn[e],s=tt(o)+(ge?0:f(-.05,.05,m)),r=a.home?[0,0,0][e]:ge?0:et[F0++%et.length],n=ae(s,o);R0(r,s,o,{y:n.e-.006,wet:a.home?[.05,.25,.5][e]:f(0,.6,m),yaw:f(-.8,.8,m)+(e===1&&a.home?.9:0),sc:ge?1.75:void 0})}if(ve==="A flotilla"){const e=6+Math.floor(W()*4);let o=0;for(const s of[.5,.8,1.1])o+=ae(tt(s),s).v*1.1/3;for(let s=0;s<e;s++){const r=.42+($-.7)*Math.pow((s+.2+W()*.6)/e,1.2),n=N+.03+(me-.06)*(.15+.7*W()),i=ae(n,r),u=R0(et[F0++%et.length],n,r,{y:i.e-.006,wet:W()*.5,yaw:(W()-.5)*1.8});if(o>.03){const v=r-o*3.3;if(v>=te+.08){const l=ae(n,v);u.z=v,u.y=l.e-.006,u.vx=l.u,u.vz=l.v}else u.in=1,u.inT=(te-.13-v)/Math.max(o,.14),u.z=te-.13,u.vx=0,u.vz=Math.max(o,.14)}}}let ot=0;if(de==="Looking down"){for(const e of[.4,.6,.8])ot+=ae(tt(e),e).v*1.1/3;if(ot>.04&&ot<=.16){const e=Math.max(te+.09,.84-ot*4),o=tt(e)+f(-.03,.03,m),s=ae(o,e);if(ge&&le[0]){const r=le[0];r.x=o,r.z=e,r.y=s.e-.006,r.vx=s.u,r.vz=s.v}else R0(et[F0++%et.length],o,e,{y:s.e-.006,wet:f(0,.4,m),yaw:f(-.5,.5,m)})}if(ot>.04)for(let e=0;e<6;e++){const o=Math.max(te+.04,.8+f(-.16,.16,m)-ot*f(3,5,m)),s=tt(o)+f(-.05,.05,m),r=ft(o0(),s,o,"float");if(r){const n=ae(s,o);r.vx=n.u,r.vz=n.v}}}if(a.home&&ft(5,N+.1,.672,"float"),de!=="Looking down")for(const e of[1,1.9,2.7,3.3]){const o=ft(o0(),tt(.3)+f(-.05,.05,m),te+.03,"float");if(o){const s=ae(o.x,o.z);o.vx=0,o.vz=Math.max(s.v,.08),o.z=te+.04-o.vz*e,o.in=1}}const Ze=(()=>{const o=[];let s=12345+(go&1023),r=0,n=0,i=0,u=0,v=0,l=0,R=0,M=0,_=f(6,14,m);const O=()=>(s=s*1103515245+12345&2147483647,s/1073741823-1),j=()=>{const b=[];let U=0;const q=4+Math.floor(T()*4),D=f(1500,2100);for(let I=0;I<q;I++){const Z=f(.09,.3);b.push([U,Z,D*f(.8,1.45),D*f(.75,1.5),f(5,9)]),U+=Z+f(.04,.12)}const P=2+Math.floor(T()*5);for(let I=0;I<P;I++)b.push([U,.035,f(3400,4800),f(3e3,5200),0]),U+=.05;return{k:"bird",t:0,notes:b,dur:U+.1,ph:0,v:.5,pan:f(-.7,.7)}};return{ev(b,U,q,D){!a.sound.on||o.length>16||o.push(b==="bird"?j():{k:b,t:0,v:U||.5,pan:q||0,f:D||1,ph:0,b1:0})},set(b,U,q){v=b,R=U,M=q},run(b){if(!a.sound.on){o.length=0;return}_-=b*(oe>.2?0:1),_<0&&(_=f(14,34),(!Ce||T()<.3)&&this.ev("bird")),T()<R*b&&this.ev("bub",f(.2,.5),f(-.5,.5),f(.7,1.6)),T()<M*b&&this.ev("glug",f(.4,.8),-.3,f(.8,1.25));const U=Math.round(b*16e3);if(U<=0)return;const q=new Float32Array(U);for(let D=0;D<U;D++){u+=(v-u)*4e-4,l+=(oe-l)*4e-4;const P=O();r+=(P-r)*.3,n+=(r-n)*.3;const I=r-n;i+=(P-i)*.08;let Z=I*u*.5*(.7+.3*Math.sin(D*.002+i*3));l>.02&&(O()>1-l*.06&&(Z+=O()*.25*l),Z+=(P-r)*l*.05),q[D]=Z}for(let D=o.length-1;D>=0;D--){const P=o[D];let I=.2;for(let Z=0;Z<U;Z++){const Q=P.t+Z/16e3;let ie=0;if(P.k==="bub"){I=.05/P.f;const X=Q/I,ue=520*P.f*(1+.9*X);P.ph+=ue/16e3,ie=Math.sin(P.ph*Ge)*Math.exp(-X*4)*.22*Math.min(1,X*20)}else if(P.k==="glug"){I=.22;const X=Q/I,ue=(X<.45?170:240)*P.f*(1+.4*(X%.45));P.ph+=ue/16e3,ie=Math.sin(P.ph*Ge)*Math.exp(-(X%.45)*6)*.3+O()*Math.exp(-X*9)*.03}else if(P.k==="plop"){I=.14;const X=Q/I;P.ph+=(650-380*X)/16e3,ie=Math.sin(P.ph*Ge)*Math.exp(-X*5)*.22+O()*Math.exp(-X*14)*.05}else if(P.k==="pat"){I=.05;const X=Q/I;P.b1+=(O()-P.b1)*.4,ie=P.b1*Math.exp(-X*8)*.3}else if(P.k==="splash"){I=.35;const X=Q/I;P.b1+=(O()-P.b1)*.25,ie=P.b1*Math.exp(-X*5)*Math.min(1,X*30)*.4}else if(P.k==="bird"){I=P.dur;let X=0,ue=0;for(const Ae of P.notes)if(Q>=Ae[0]&&Q<Ae[0]+Ae[1]){const ht=(Q-Ae[0])/Ae[1];X=Ae[2]+(Ae[3]-Ae[2])*ht+(Ae[4]?Math.sin(Q*Ge*Ae[4])*40:0),ue=Math.sin(Math.PI*ht)**.7;break}P.ph+=X/16e3,ie=(Math.sin(P.ph*Ge)+.12*Math.sin(P.ph*Ge*2))*ue*.09}q[Z]+=ie*P.v}P.t+=U/16e3,P.t>I&&o.splice(D,1)}a.sound.pcm(q,16e3,{vel:1})}}})();let Ut=(a.home?1.5:f(2,6,m))*(Ot>1?6:Ot<1?.3:1),io=0,E0=f(70,110,m),as=-99,ro=0;ot>.16&&(Ut=Math.max(.2,3.9-.7/ot));const Tn=(ge?2:ve==="A flotilla"?10:6)-(he===2&&!ge?1:0)+(Oe[de].home?0:ge?1:4),qn=ge?1:ve==="A flotilla"?4:3,Wo=Oe[de].home?5.2:Ft-.03,ss=e=>{const o=te+.08,s=tt(.3)+f(-.03,.03,m),r=p==="A fleet from upstream"&&e?0:et[F0++%et.length],n=ae(s,o),i=R0(r,s,o,{y:n.e-.004,sc:e||1,yaw:f(-.4,.4,m)});i.vz=Math.max(n.v,.14),i.vx=0,i.z=te-.13,i.in=1},jo=[[0,.46,.12],[0,-.46,.12],[-.19,.2,.12],[.19,.2,.12],[-.19,-.2,.12],[.19,-.2,.12],[0,0,.28]],Dn=(e,o)=>{if(he===0){if(Math.abs(e.x-N-.1)<.085&&Math.abs(e.z-$)<.15)return 1}else if(he===1){if(e.x<N+.035&&Math.abs(e.z-$)<.13)return 2}else if(e.z>$-.05&&Math.abs(e.x-p0)<.075)return 3;return 0};let Xo=.06;const co=(e,o,s,r,n,i,u,v)=>{const l=Math.min(i*.85,.0015);e.x+=r*l,e.z+=n*l;const R=e.vx+e.w*s,M=e.vz-e.w*o,_=R*r+M*n;if(_>=0)return 0;const O=s*r-o*n,j=-1.18*_/(1+O*O/v),b=Math.min(j,Xo);e.vx+=b*r,e.vz+=b*n,e.w+=b*O/v;const U=-n,q=r,D=s*U-o*q,P=R*U+M*q,I=ee(-P/(1+D*D/v),-u*b,u*b);return e.vx+=I*U,e.vz+=I*q,e.w+=I*D/v,e.hc>0||j<.05?0:(e.hc=.25,j)},ns=1.18,Ln=(e,o)=>{if(e.age+=o,e.cd-=o,e.hc=(e.hc||0)-o,e.in){if(e.inT>0){e.inT-=o;return}const ne=ae(e.x,te+.08);e.z+=e.vz*o,e.y=ne.e-e.sc*.046*(1+e.wet*.45),e.eta=ne.e,e.z>=te-.125&&(e.in=0,e.arr=1);return}if(e.out){e.z+=e.vz*o,e.x+=(rt+.02-e.x)*o*.15,e.y+=(Bt(e.x,e.z)+.003-e.y)*Math.min(1,o*4),e.eta=e.y-.002,e.yaw+=e.w*o,e.w*=.98,e.pitch*=.97,e.mode!==2&&(e.roll*=.99);return}const s=e.sc,r=Math.cos(e.yaw),n=Math.sin(e.yaw);if(e.mode===2){const ne=ae(e.x,e.z);e.vx+=(ne.u*.15-e.vx)*o*2,e.vz+=(ne.v*.15-e.vz)*o*2,e.x+=e.vx*o,e.z+=e.vz*o,e.y+=(ne.b+.001-e.y)*Math.min(1,o*3),e.eta=ne.e,e.pitch*=.98,e.roll*=.98,he===2?e.go?(e.x+=(p0-e.x)*o*2,e.z+=o*.04,e.z>$-.004&&(e.gone=1)):e.z>$-.03&&(e.z=$-.03,e.vz=0):(e.go||e.z>$+.16)&&(e.vz=Math.max(e.vz,.07)),(St>0||Se)&&e.x<N+.3*s&&(e.x=N+.3*s);return}const i=Math.sin(e.pitch),u=Math.sin(e.roll);e.tqN=[e.x,e.z,r,n,1/(.5*s)**2,1/(.22*s)**2,e.tq0?ja*s*.055*(1+e.wet*.45+e.flood*3)*(1-e.sunk):0],e0=e;const v=s*.046,l=1+e.wet*.45+e.flood*3,R=v*l,M=s*.17,_=(.3*s)**2,O=(.17*s)**2;let j=0,b=0,U=0,q=0,D=0,P=0,I=0,Z=0,Q=-9,ie=0,X=0,ue=0,Ae=0,ht=0,q0=0,D0=0,L0=0;for(let ne=0;ne<7;ne++){const Le=jo[ne][0]*s,Me=jo[ne][1]*s,pe=jo[ne][2],pt=Le*r+Me*n,xt=-Le*n+Me*r,Ue=ae(e.x+pt,e.z+xt),dt=e.y-Me*i+Le*u,yt=e.vx+e.w*xt,n0=e.vz-e.w*pt;Q=Math.max(Q,Ue.b),Ue.d>8e-4&&(I+=Ue.e,Z++);const Ke=Ue.d>8e-4?ee(Ue.e-dt,0,M):0,i0=9.81*pe*Ke/R;q+=i0,D-=i0*Me,P+=i0*Le,Ke>0&&(ht+=pe);let It=0,mo=0;if(Ke>2e-4){const At=Ue.u*ns-yt,Mt=Ue.v*ns-n0,C0=n*At+r*Mt,ea=r*At-n*Mt,I0=Math.hypot(At,Mt),ys=Math.min(1.2,Ke/(R*.8)),ws=1.1*(.2+I0)*ys,zs=11*(.2+I0)*ys;It=(n*ws*C0+r*zs*ea)*pe,mo=(r*ws*C0-n*zs*ea)*pe,ue=Math.max(ue,I0),Ae+=ea*pe;const bs=Ke+I0*I0/19.6;bs>M*.58&&(ie+=pe*(bs-M*.58))}const ds=Ue.b+6e-4-dt;if(ds>0){X++;const At=Math.min(40,ds*5200)*pe;q+=At,D-=At*Me,P+=At*Le,q0+=pe,D0+=pe*Me*Me,L0+=pe*Le*Le;const Mt=Math.hypot(yt,n0),C0=Math.min((Ue.d>.0015?.14:.55)*At,Mt*34*pe);Mt>1e-4&&(It-=yt/Mt*C0,mo-=n0/Mt*C0)}j+=It,b+=mo,U+=xt*It-pt*mo}e0=null;const Yo=ae(e.x,e.z).e,lo=ae(e.x+n*.4*s,e.z+r*.4*s).e,uo=ae(e.x-n*.4*s,e.z-r*.4*s).e,U0=ae(e.x+r*.2*s,e.z-n*.2*s).e,_0=ae(e.x-r*.2*s,e.z+n*.2*s).e,vo=ee((lo-uo)/(.8*s),-.6,.6),ho=ee((U0-_0)/(.4*s),-.6,.6);j-=9.81*.5*(vo*n+ho*r),b-=9.81*.5*(vo*r-ho*n),e.vx+=j/l*o,e.vz+=b/l*o,e.w+=U/(_*l)*o,e.w*=Math.exp(-o*(1.2+X*1.5)),e.w=ee(e.w,-9,9);const kt=Math.hypot(e.vx,e.vz);kt>1.4&&(e.vx*=1.4/kt,e.vz*=1.4/kt),e.x+=e.vx*o,e.z+=e.vz*o,e.yaw+=e.w*o,e.z<te+.05?(e.arr||(e.z=te+.05),e.vz=Math.max(e.vz,.08)):e.arr=0,e.flood>.01&&(e.svx+=(-u*26-e.sx*34-e.svx*3.2)*o,e.sx=ee(e.sx+e.svx*o,-1,1),e.svz+=(i*16-e.sz*24-e.svz*2.6)*o,e.sz=ee(e.sz+e.svz*o,-1,1),P-=e.sx*9.81*e.flood*.5*.2*s,D+=e.sz*9.81*e.flood*.4*.35*s),e.held=Math.max(0,(e.held||0)-o),(X||e.held>0)&&(P-=ee(Ae*.8,-.28,.28));const Ve=1+4*Math.min(1,ht),$o=Math.sqrt(9.81/(R*Ve))*Math.min(1,ht)*1.4,Qo=400/Ve;e.vy=(e.vy+(q-9.81)/Ve*o)/(1+($o+(X?13:0)+Qo*q0)*o),e.y+=e.vy*o,e.y<Q-.004&&(e.y=Q-.004,e.vy=Math.max(e.vy,0)),e.pv=(e.pv+D/(_*Ve)*o)/(1+($o*.88+X*3+Qo*D0/_)*o),e.pitch=ee(e.pitch+e.pv*o,-1,1),e.rv=(e.rv+P/(O*Ve)*o)/(1+($o*.77+X*3+Qo*L0/O)*o),e.roll=ee(e.roll+e.rv*o,-1.25,1.25),(e.pitch===1||e.pitch===-1)&&(e.pv=0),Math.abs(e.roll)>=1.25&&(e.rv=0,e.flood=Math.min(1,e.flood+o*.8),e.wet=Math.min(1,e.wet+o*.4));const Hn=Z?I/Z:Q;e.eta=Hn,(Math.abs(e.pv)>3||ie>8e-4)&&e.cd<=0&&(e.cd=.7,Ze.ev("splash",.2+Math.min(.4,Math.abs(e.pv)*.05+ie*60),ee((e.x-.05)*3,-.8,.8)));for(let ne=-1;ne<=1;ne++){const Le=ne*.33*s,Me=(ne?.13:.2)*s,pe=Le*n,pt=Le*r,xt=e.x+pe,Ue=e.z+pt;if(St>0||Se){const dt=N+.006+Me-xt;if(dt>0){const yt=co(e,pe,pt,1,0,dt,.25,_);yt>.05&&Ze.ev("pat",Math.min(.5,yt*2),-.6)}}xt>po-Me&&co(e,pe,pt,-1,0,xt-po+Me,.2,_),he===2&&Ue>$-.018-Me&&co(e,pe,pt,0,-1,Ue-$+.018+Me,.3,_);for(const dt of Fe){const yt=xt-dt[0],n0=Ue-dt[1],Ke=Math.hypot(yt,n0),i0=Me+dt[2]*.9;if(Ke<i0&&Ke>1e-4){e.held=.25;const It=co(e,pe,pt,yt/Ke,n0/Ke,i0-Ke,.35,_);It>.08&&Ze.ev("pat",Math.min(.6,It*2.5),ee((xt-.05)*3,-.8,.8))}}}e.wet=Math.min(1,e.wet+o*ts*(1+oe*2.5+Math.min(2,Math.abs(e.rv)*.25)+e.flood*3)),e.flood=Math.min(1,e.flood+o*(ie*62+oe*.045+(e.wet>.6?(e.wet-.6)*.1:0)+ue*ue*.012)),(R>M*.92||e.flood>.86)&&(e.sunk=Math.min(1,e.sunk+o*.22),e.sunk>=1&&(e.mode=2,Ze.ev("glug",.3,0,1.4))),e.free=Math.max(0,(e.free||0)-o);let mt=0,Jo=1;if(e.free<=0&&!e.go){const ne=ae(e.x,e.z);he===0?Math.abs(e.x-N-.1)<.1+.15*s&&e.z>$-.16-.2*s&&e.z<$+.17&&(mt=ee(1-(ne.d-.005)/.007,0,1)):he===1?e.x<N+.035+.3*s&&Math.abs(e.z-$)<.13&&(mt=ee(-ne.u/.05,0,1)*ee(1.7-Math.abs(ne.v)/.3,0,1),Jo=0):e.z>$-.03-.55*s&&(mt=ee(1.5-Math.abs(e.x-p0)/.1,.25,1))}if(mt>.02){e.lodge=(e.lodge||0)+o*mt;const ne=Math.exp(-o*7*mt);e.vx*=ne,e.vz*=ne;const Le=e.seed>.5?1:-1,Me=e.seed*7.31%1<.38?1:0,pe=Math.min(1,e.lodge*.3);e.w+=o*mt*((Jo?2.4:-2.4)*Math.sin(2*e.yaw)+.25*Le*(1-pe)),e.roll+=(Le*(Me?1.12:.2)*pe-e.roll)*(1-Math.exp(-o*1.6*mt)),e.wet=Math.min(1,e.wet+o*ts*3*mt),e.wet>.85&&(e.sag=Math.min(.8,(e.sag||0)+o*.07)),!Jo&&e.lodge>9+30*(e.seed*3.71%1)&&(e.free=5,e.lodge=0)}else e.lodge>1&&e.free<=0&&!e.go?(e.free=3,e.lodge=0):!e.go&&e.free<=0&&(e.lodge=0);he!==2&&(e.go||e.z>$+.16)&&(e.vz=Math.max(e.vz,.07),e.go&&(e.sag=Math.min(.8,(e.sag||0)+o*.1)))},Un=(e,o)=>{const s=e.sc,r=o.sc,n=Math.cos(e.yaw),i=Math.sin(e.yaw),u=Math.cos(o.yaw),v=Math.sin(o.yaw);for(let l=-1;l<=1;l++)for(let R=-1;R<=1;R++){const M=l*.33*s,_=R*.33*r,O=(l?.13:.2)*s,j=(R?.13:.2)*r,b=e.x+M*i,U=e.z+M*n,q=o.x+_*v,D=o.z+_*u;let P=q-b,I=D-U,Z=Math.hypot(P,I),Q=O+j;if(Z>=Q||Z<1e-5)continue;P/=Z,I/=Z;const ie=Math.min((Q-Z)*.5,75e-5),X=1+e.flood*3,ue=1+o.flood*3,Ae=ue/(X+ue),ht=X/(X+ue);e.x-=P*ie*Ae*2,e.z-=I*ie*Ae*2,o.x+=P*ie*ht*2,o.z+=I*ie*ht*2;const q0=M*i,D0=M*n,L0=_*v,Yo=_*u,lo=(.3*s)**2,uo=(.3*r)**2,U0=D0*P-q0*I,_0=Yo*P-L0*I,vo=(e.vx+e.w*D0)*P+(e.vz-e.w*q0)*I,ho=(o.vx+o.w*Yo)*P+(o.vz-o.w*L0)*I,kt=ho-vo;if(kt<0){const Ve=Math.min(-1.2*kt/(1/X+1/ue+U0*U0/(lo*X)+_0*_0/(uo*ue)),Xo*Math.min(X,ue));e.vx-=Ve*P/X,e.vz-=Ve*I/X,e.w-=Ve*U0/(lo*X),o.vx+=Ve*P/ue,o.vz+=Ve*I/ue,o.w+=Ve*_0/(uo*ue),-kt>.08&&Ze.ev("pat",Math.min(.5,-kt),ee((e.x-.05)*3,-.8,.8))}}},_n=(e,o)=>{if(e.st==="dry")return;if(e.in){const r=ae(e.x,te+.04);e.z+=e.vz*o,e.y=Math.max(r.e,r.b)+3e-4,e.eta=r.e,e.dep=r.d,e.z>=te+.04&&(e.in=0);return}const s=ae(e.x,e.z);if(e.age+=o,e.st==="dam")if(e.age>.6&&(s.b-t0(Qe,e.x,e.z)<.003||t0(Xe,e.x,e.z)<.0025))e.st="float";else{e.y=s.b+.001,e.eta=-9;return}if(e.st==="float"){s.d<.0012?(e.vx*=Math.exp(-o*8),e.vz*=Math.exp(-o*8)):(e.vx+=(s.u-e.vx)*o*3,e.vz+=(s.v-e.vz)*o*3);let r=0;if(e.ty!==6)for(const i of Fe){const u=e.x-i[0],v=e.z-i[1],l=u*u+v*v,R=i[2]*.85+e.sc*.3;if(l<R*R&&l>1e-8){const M=Math.sqrt(l),_=u/M,O=v/M,j=e.vx*_+e.vz*O;e.x+=_*(R-M),e.z+=O*(R-M),j<0&&(e.vx-=j*_,e.vz-=j*O);const b=Math.exp(-o*5);e.vx*=b,e.vz*=b,r=1}}e.snag=r&&s.d>.002&&Math.hypot(s.u-e.vx,s.v-e.vz)>.04?Math.min(1,(e.snag||0)+o*2):Math.max(0,(e.snag||0)-o*2);const n=(t0(Ne,e.x+xe,e.z)-t0(Ne,e.x-xe,e.z)-t0(Be,e.x,e.z+xe)+t0(Be,e.x,e.z-xe))/(2*xe);e.x+=e.vx*o,e.z+=e.vz*o,e.yaw+=(e.w*(.3+Math.hypot(e.vx,e.vz)*3)+n*.45)*o,e.x<N+.01&&(e.x=N+.01,e.vx=Math.abs(e.vx)*.3),e.y=Math.max(s.e,s.b)+(e.ty===9?-.002:e.ty===5?3e-4:-5e-4),e.eta=s.e,e.dep=s.d,e.roll*=.995,e.pitch*=.995,oe>.3&&m()<o*.02*oe&&e.ty!==9&&(e.st="sunk")}else e.st==="sunk"&&(e.vx+=(s.u*.12-e.vx)*o,e.vz+=(s.v*.12-e.vz)*o,e.x+=e.vx*o,e.z+=e.vz*o,e.y=s.b+8e-4,e.eta=s.e);e.ty===5||e.ty===9||e.ty===12?he===2?e.z>$-.022&&(e.z=$-.022,e.vz=Math.min(e.vz,0)):e.st==="float"&&(e.go||e.z>$+.16)&&(e.vz=Math.max(e.vz,.07)):Dn(e,o)&&(e.lost+=o*.6),e.lost>0&&(e.lost+=o*.5,e.y-=o*.04)},is=()=>{ct=0;for(const e of le){if(e.tq0=null,ct>=12||e.mode===2||e.out||e.in)continue;const o=ct*12,s=Math.cos(e.yaw),r=Math.sin(e.yaw),n=e.sc,i=(.5*n)**2,u=(.22*n)**2;ce[o]=e.x,ce[o+1]=e.z,ce[o+2]=s,ce[o+3]=r,ce[o+4]=1/i,ce[o+5]=1/u,ce[o+6]=ja*n*.055*(1+e.wet*.45+e.flood*3)*(1-e.sunk),ce[o+8]=e.vx,ce[o+9]=e.vz,ct++,e.tq0=[e.x,e.z,s,r,1/i,1/u,ce[o+6]]}for(const e of Ie){if(ct>=12)break;if(e.st!=="float"||!(e.snag>.2))continue;const o=ct*12,s=(e.sc*.5)**2;ce[o]=e.x,ce[o+1]=e.z,ce[o+2]=Math.cos(e.yaw),ce[o+3]=Math.sin(e.yaw),ce[o+4]=1/s,ce[o+5]=2.2/s,ce[o+6]=.0016*e.snag,ce[o+8]=0,ce[o+9]=0,ct++}},rs=e=>{const o=Math.min(6,Math.max(1,Math.ceil(e/.016666666666666666-.01))),s=e/o;is();for(let n=0;n<o;n++){Xo=3.6*s,Ya=ee((Yt-e+(n+1)*s-M0)/Math.max(M0-Io,Dt),0,1);for(const i of le)Ln(i,s);for(let i=0;i<le.length;i++)for(let u=i+1;u<le.length;u++){const v=le[i],l=le[u];if(v.mode===2||l.mode===2||v.out||l.out||v.in||l.in)continue;const R=l.x-v.x,M=l.z-v.z;R*R+M*M<(v.sc+l.sc)**2&&Un(v,l)}for(const i of Ie)if(_n(i,s),i.st==="float")for(const u of le){if(u.mode===2)continue;const v=i.x-u.x,l=i.z-u.z,R=u.sc*.42,M=v*v+l*l;if(M<R*R&&M>1e-6){const _=Math.sqrt(M);i.x+=v/_*(R-_),i.z+=l/_*(R-_),i.vx+=v/_*s*2+(u.vx-i.vx)*s*2,i.vz+=l/_*s*2+(u.vz-i.vz)*s*2}}}for(let n=le.length-1;n>=0;n--){const i=le[n];!i.out&&i.z>Ft-.03&&Wo>Ft&&(i.out=1,i.vz=Math.max(i.vz,.2)),(i.gone||i.z>Wo||i.z<te-.2)&&le.splice(n,1)}for(let n=Ie.length-1;n>=0;n--){const i=Ie[n];(i.lost>=1||i.z>(i.ty===5||i.ty===9||i.ty===12?Wo:Ft)+.05)&&Ie.splice(n,1)}{let n=0,i=null,u=0,v=null;for(const M of le)M.out||M.go||(M.mode===2?Math.abs(M.z-$)<.3&&(he===2?(u++,(!v||M.age>v.age)&&(v=M)):(n++,(!i||M.age>i.age)&&(i=M))):M.lodge>1.5&&(n++,(!i||M.age>i.age)&&(i=M)));he!==2&&n>qn&&i&&(i.go=1,i.lodge=0),u>5&&v&&(v.go=1);let l=0,R=null;if(he===0)for(const M of Ie)M.st!=="float"||M.go||M.in||!(M.ty===5||M.ty===9||M.ty===12)||Math.abs(M.z-$)<.2&&M.vz<.02&&Math.abs(M.x-N-.1)<.12&&(l++,(!R||M.age>R.age)&&(R=M));l>4&&R&&(R.go=1)}let r=0;for(const n of Ie)n.st==="float"&&r++;if(r<(ot>.04?11:7)&&m()<e*(ot>.04?1.5:.6)){const n=ft(o0(),tt(.3)+f(-.05,.05,m),te+.03,"float");if(n){const i=ae(n.x,n.z);n.vx=0,n.vz=Math.max(i.v,.08),n.z=te-.11,n.in=1}}};let S0=!1,Te=null,B0=0,ut=[0,0],cs=[0,0],Zo=!1,_t=null;const N0=(e,o)=>{const s=Qs(e,o);let r=-.01,n=0,i=0;for(let u=0;u<4;u++){const v=(Ye[1]-r)/Math.max(-s[1],.01);n=Ye[0]+s[0]*v,i=Ye[2]+s[2]*v;const l=ae(n,i);r=Math.max(l.e,l.b)}return[n,i]},fs=(e,o)=>{let[s,r]=N0(e,o);r=ee(r,te+.05,Ft-.1),(ae(s,r).d<.003||s<N)&&(s=tt(r));const i=et[F0++%et.length],u=R0(i,s,r,{yaw:f(-.5,.5,m)});u.vx=0,u.vz=0,Ze.ev("plop",.5,ee((s-.05)*3,-.8,.8))},Cn=(e,o)=>{const s=a.input,r=s.taps?s.taps():[];if(De.s=0,P0.length=0,s.down&&s.inside)if(as=e,!S0)S0=!0,Te=null,B0=e,ut=[s.x,s.y],cs=[s.x,s.y],Zo=!0,_t=N0(s.x,s.y);else{if(Te!=="hold"&&Math.hypot(s.x-ut[0],s.y-ut[1])>.03&&!Te){const n=N0(ut[0],ut[1]),i=N0(s.x,s.y);Te=!(Math.hypot(i[0]-n[0],i[1]-n[1])/Math.max(e-B0,.02)>.32||Math.hypot(s.x-ut[0],s.y-ut[1])/Math.max(e-B0,.02)>1.1)&&Math.abs(i[0]-n[0])>Math.abs(i[1]-n[1])*.7?"dam":"carve",_t=n}if(!Te&&e-B0>.35&&(Te="hold"),Te==="dam"||Te==="carve"){const n=N0(s.x,s.y),i=n[0]-_t[0],u=n[1]-_t[1],v=Math.hypot(i,u),l=Math.min(8,Math.floor(v/.012));if(l>0){for(let R=1;R<=l;R++){const M=_t[0]+i*R/l,_=_t[1]+u*R/l;if(Te==="dam"){P0.push([M,_,.024,.016]);for(let O=0;O<2;O++){const j=ft(o0(),M+f(-.012,.012,m),_+f(-.012,.012,m),"dam");j&&(j.y=Bt(j.x,j.z)+.02)}if(m()<.3){const O=ft(7,M,_,"dam",{sc:f(.04,.08,m)});O&&(O.y=Bt(O.x,O.z)+.02,O.yaw=Math.atan2(i,u)+Math.PI/2+f(-.5,.5,m))}}else P0.push([M,_,.017,-.012])}Te==="carve"&&v>.002&&(De.x=n[0],De.z=n[1],De.r=.05,De.dx=i/v,De.dz=u/v,De.s=.0045*Math.min(1.4,v/o/.5)),_t=n,Te==="dam"&&(e*10|0)%2===0&&Ze.ev("pat",.2,0)}}Te==="hold"&&($0=1),cs=[s.x,s.y]}else if(S0)!Te&&e-B0<.4&&fs(ut[0],ut[1]),S0=!1,Te=null,$0=G;else if(r.length&&!Zo)for(const n of r)fs(n.x,n.y);if(s.down||(Zo=!1),Ut-=o,Ut<0){let n=0;for(const i of le)!i.out&&i.mode!==2&&n++;n>=Tn&&(Ut=f(1.5,4,m))}if(Ut<0)if(p==="A fleet from upstream")io<=0&&(io=3+Math.floor(m()*4)),ss(.55),io--,Ut=io>0?f(.5,1.1,m):f(6,11,m);else{ss();const n=m();Ut=(2.5+19*n*n)*Ot}e-as>25&&!S0&&(E0-=o,E0<0&&($0=E0>-7?.8:G,E0<-7&&(E0=f(80,130,m)))),oe+=ee($0-oe,-o*.12,o*.5),oe>.05?x0=Math.min(1,x0+o*oe*.2):x0=Math.max(.3,x0-o*.0025*(Pe===1?.3:1)),ro>.4&&oe<.1&&(Ze.ev("bird"),ro=0),ro=Math.max(ro,oe)},ze=new Float32Array(160*16);let at=0,Ko=0,a0=0;const ls=(e,o,s,r,n,i,u,v,l,R,M,_,O,j)=>{if(at>=160)return;const b=at*16;ze[b]=e,ze[b+1]=o,ze[b+2]=s,ze[b+3]=r,ze[b+4]=n,ze[b+5]=i,ze[b+6]=u,ze[b+7]=v,ze[b+8]=l[0],ze[b+9]=l[1],ze[b+10]=l[2],ze[b+11]=R,ze[b+12]=M,ze[b+13]=_,ze[b+14]=O,ze[b+15]=j,at++},In=()=>{at=0;for(const e of le)ls(e.x,e.y,e.z,e.yaw,e.roll,e.pitch,e.sc,Math.min(e.wet,1)*.99+Math.floor((e.sag||0)*100),e.col,e.ty,e.eta,e.mode===2?1:e.sunk,e.seed,Et);a0=at;for(const e of Ie)ls(e.x,e.y,e.z,e.yaw,e.roll,e.pitch,e.sc,.495,e.col,e.ty,e.st==="float"||e.st==="sunk"?e.eta:-9,e.st==="sunk"?1:0,e.seed,e.dep||0);Ko=at},Vn=288,Ct=new Float32Array(32),us=new Float32Array(32),Gn=new Float32Array(96),vs=new Float32Array(16);Ct.set($s,0),Ct.set([Ye[0],Ye[1],Ye[2],0],24);const T0=e=>{const o=Y.mesh;if(Ct[16]=S.L[0],Ct[17]=S.L[1],Ct[18]=S.L[2],Ct[20]=e,t.useProgram(o.p),t.uniform4fv(o.u.uP,Ct),t.uniform4fv(o.u.uQ,us),J(0,Y.meshT),J(3,Y.noiseT),t.bindVertexArray(Lo),t.bindBuffer(t.ARRAY_BUFFER,ao),a0&&e!==4){for(let s=0;s<4;s++)t.vertexAttribPointer(s,4,t.FLOAT,!1,64,s*16);t.drawArraysInstanced(t.TRIANGLES,0,gs,a0)}if(Ko>a0){for(let s=0;s<4;s++)t.vertexAttribPointer(s,4,t.FLOAT,!1,64,a0*64+s*16);t.drawArraysInstanced(t.TRIANGLES,0,Vn,Ko-a0)}},s0=En,vt=[[[.3,.28,.25],[.34,.33,.31],[.23,.225,.22]],[[.34,.33,.32],[.36,.35,.34],[.28,.27,.26]],[[.4,.17,.1],[.36,.16,.1],[.3,.3,.32]],[[.36,.33,.28],[.5,.43,.32],[.5,.43,.32]],[[.1,.098,.105],[.34,.32,.29],[.3,.29,.28]]][nt],fo=[[.22,.2,.16,.2],[.3,.24,.16,.25],[.42,.28,.14,.75],[.2,.26,.26,.08]][Rt],On=(a.home?.95:f(.8,1.15,m))*(Oe[de].fd||1),hs=[.7,1,1.8,.6][Rt],ms=e=>{In(),t.bindBuffer(t.ARRAY_BUFFER,ao),t.bufferData(t.ARRAY_BUFFER,ze.subarray(0,Math.max(1,at)*16),t.DYNAMIC_DRAW),us.set([S.sunC[0],S.sunC[1],S.sunC[2],jt,S.amb[0],S.amb[1],S.amb[2],0,S.skyH[0],S.skyH[1],S.skyH[2],0,S.skyZ[0],S.skyZ[1],S.skyZ[2],0,S.lampP[0],S.lampP[1],S.lampP[2],S.lampI,S.lampC[0],S.lampC[1],S.lampC[2],Ce?1:0]),Zt(),t.bindFramebuffer(t.FRAMEBUFFER,wn),t.viewport(0,0,oo,oo),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),at&&!Ce&&(t.enable(t.BLEND),t.blendEquation(t.MIN),t.blendFunc(t.ONE,t.ONE),T0(2),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND)),t.bindFramebuffer(t.FRAMEBUFFER,yn),t.viewport(0,0,Xt,Xt),t.clearColor(0,0,0,0),t.depthMask(!0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),at&&(t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),T0(1),t.disable(t.DEPTH_TEST)),t.depthMask(!1);const o=Ma||$e.comp,s=Gn;s.set([Ye[0],Ye[1],Ye[2],Ys,Po[0],Po[1],Po[2],e,ko[0],ko[1],ko[2],He?1:0,Ao[0],Ao[1],Ao[2],oe,S.L[0],S.L[1],S.L[2],jt,S.sunC[0],S.sunC[1],S.sunC[2],x0,S.skyZ[0],S.skyZ[1],S.skyZ[2],S.cover,S.skyH[0],S.skyH[1],S.skyH[2],Ce?1:0,S.skyS[0],S.skyS[1],S.skyS[2],nt,S.amb[0],S.amb[1],S.amb[2],0,S.lampP[0],S.lampP[1],S.lampP[2],S.lampI,S.lampC[0],S.lampC[1],S.lampC[2],S.win,N,St,me,h0,it,m0,he,$,s0[0][0],s0[0][1],s0[0][2],0,s0[1][0],s0[1][1],s0[1][2],c>520?40:30,fo[0],fo[1],fo[2],fo[3]+Math.max(0,oe-G*.7)*.5+(Pe===1?.2:0),vt[0][0],vt[0][1],vt[0][2],xa,vt[1][0],vt[1][1],vt[1][2],Z0,vt[2][0],vt[2][1],vt[2][2],Pe===3?.85:0,e*.004+Ro,e*.0017,Se?1:0,bt,rt,-K0-m0+.0035,p0,Xs]),J(7,null),t.bindFramebuffer(t.FRAMEBUFFER,fn),t.viewport(0,0,Do,_a),t.useProgram(Y.skyb.p),J(3,Y.noiseT),t.uniform4fv(Y.skyb.u.uP,s),Je(),t.bindFramebuffer(t.FRAMEBUFFER,dn),t.viewport(0,0,c,c),t.enable(t.DEPTH_TEST),t.depthFunc(t.ALWAYS),t.depthMask(!0),t.useProgram(o.p),J(0,J0),J(1,Eo),J(2,To),J(3,Y.noiseT),J(4,Ua),J(5,Ia),J(6,qo[k0]),J(7,Ca),t.uniform4fv(o.u.uP,s),He&&t.uniform4fv(o.u.uW,He),Je(),t.depthFunc(t.LEQUAL),at&&(t.depthMask(!1),t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),t.disable(t.DEPTH_TEST),T0(3),t.enable(t.DEPTH_TEST),T0(4),t.disable(t.BLEND),t.depthMask(!0),T0(0)),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,c,c),t.useProgram(Y.fin.p),J(0,La),J(3,Y.noiseT),vs.set([c,On,9*c/1e3,S.expo,oe,e,.14,c>520?12:9,S.skyH[0]*.6+S.amb[0],S.skyH[1]*.6+S.amb[1],S.skyH[2]*.6+S.amb[2],0]),t.uniform4fv(Y.fin.u.uP,vs),Je(),t.bindVertexArray(null);for(let r=7;r>=0;r--)J(r,null)};let ps=0;const xs=(e,o)=>{if(o=ee(o||1/30,0,.25),Cn(e,o),kn(),d0){g0+=o;let s=0;for(;g0>=Dt&&s<6;)Xa(s===0),g0-=Dt,s++;g0>Dt*6&&(g0=0),no(!1),Za(),Ka(o,hs),Pn()}if(rs(o),Aa(e),ms(e),a.sound.on&&!(ps&3)){let s=0,r=0,n=0;for(let i=0;i<re;i+=3){const u=Ee[i];if(u>.002){const v=Math.hypot(Be[i],Ne[i]);s+=u*v,v>.32&&r++,za[i*4+1]!==0&&(n+=u)}}Ze.set(ee(s*8,0,1),2+r*.6+oe*6,ee(n*25,0,4)),oe>.1&&T()<oe*.5&&Ze.ev("pat",.2+oe*.2,f(-.8,.8))}Ze.run(o),ps++};if(d0&&(no(!1),Za()),rs(1/30),is(),d0)for(let e=0;e<12;e++)Ka(.05,hs);return Oe[de].home&&(Ma=Us(t,Y,da)),ms(0),ha&&ha.register(xs,()=>Tt),xs}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
