// Paper Boats: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/052.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ta){ta&&function(){"use strict";const ea=new WeakMap,Ot=Math.PI*2,i0=Math.PI/180,Y=(s,e,v)=>s<e?e:s>v?v:s,I0=(s,e,v)=>s+(e-s)*v,ae=(s,e,v)=>{const E=Y((v-s)/(e-s),0,1);return E*E*(3-2*E)},I=64,ot=160,xt=.0125,we=-.2,J=.25,ho=we+I*xt,Fe=J+ot*xt,oa=1024,aa=1024,r0=128,V0=256,c0=.02,f0=40,gs=640,G0=640,mo=14,Ht={"Kerb height":{home:1,eye:[.05,.15,0],yaw:-6,pitch:18,fov:15.5,za:.12,zr:5.6,kx:1.05,zo:.12,rot:0},"Looking upstream":{eye:[.08,.15,.45],yaw:188,pitch:18,fov:15.5,za:.12,zr:5.6,kx:1.05,zo:.12,rot:1,fd:1}};Ht["Looking down"]={eye:[.08,.62,.46],yaw:-7,pitch:62,fov:15.5,za:.4,zr:1.25,kx:.74,zo:.12,rot:0,fd:1.7};const bs=s=>{const e=s.eye,v=s.yaw*i0,E=s.pitch*i0,p=Math.tan(s.fov*i0),F=s.rot?v:0,z=Math.cos(F),j=Math.sin(F),m=s.rot?e[0]*j+e[2]*z:0,U=s.za+m,c=s.zr,wt=s.kx,b=s.zo-m,P=s.rot?e[0]*z-e[2]*j:e[0],h=Math.tan(F-v),M=s.rot?(D,_)=>{const V=D*z-_*j,ut=D*j+_*z,u0=Math.sqrt(Math.max(ut-U,0)/c);return[.5+(V-P+h*ut)/(wt*(ut+b)),u0]}:(D,_)=>{const V=Math.sqrt(Math.max(_-U,0)/c);return[.5+(D-e[0]+h*_)/(wt*(_+b)),V]},g=s.rot?(D,_)=>{const V=U+c*_*_,ut=P-h*V+(D-.5)*wt*(V+b);return[ut*z+V*j,V*z-ut*j]}:(D,_)=>{const V=U+c*_*_;return[e[0]-h*V+(D-.5)*wt*(V+b),V]},w=s.home?null:new Float32Array([U,c,wt,b,P,h,z,j,-9,0,0,0]),d=[Math.sin(v)*Math.cos(E),-Math.sin(E),Math.cos(v)*Math.cos(E)],x=(()=>{const D=Math.hypot(d[2],d[0]);return[d[2]/D,0,-d[0]/D]})(),k=[d[1]*x[2]-d[2]*x[1],d[2]*x[0]-d[0]*x[2],d[0]*x[1]-d[1]*x[0]],S=(()=>{const D=c0,_=f0,V=1/p,ut=[x[0],k[0],-d[0],0,x[1],k[1],-d[1],0,x[2],k[2],-d[2],0,-(x[0]*e[0]+x[1]*e[1]+x[2]*e[2]),-(k[0]*e[0]+k[1]*e[1]+k[2]*e[2]),d[0]*e[0]+d[1]*e[1]+d[2]*e[2],1],u0=[V,0,0,0,0,V,0,0,0,0,(_+D)/(D-_),-1,0,0,2*_*D/(D-_),0],dt=new Float32Array(16);for(let ze=0;ze<4;ze++)for(let Pt=0;Pt<4;Pt++){let Oe=0;for(let se=0;se<4;se++)Oe+=u0[se*4+Pt]*ut[ze*4+se];dt[ze*4+Pt]=Oe}return dt})();return{EYE:e,TANF:p,CF:d,CR:x,CU:k,VP:S,rayDir:(D,_)=>{const V=D*2-1,ut=1-_*2;return[d[0]+V*p*x[0]+ut*p*k[0],d[1]+V*p*x[1]+ut*p*k[1],d[2]+V*p*x[2]+ut*p*k[2]]},toUVj:M,fromUVj:g,W:w}},Ve=(()=>{const s=-6*i0;return{ZA:.12.toFixed(3),ZR:5.6.toFixed(3),KX:1.05.toFixed(3),ZO:.12.toFixed(3),XE:.05.toFixed(4),TY:Math.tan(-s).toFixed(6)}})(),Ps=`const float ZA=${Ve.ZA},ZR=${Ve.ZR},KX=${Ve.KX},ZO=${Ve.ZO},XE=${Ve.XE},TY=${Ve.TY};`,ks=`#define GEN
uniform vec4 uW[3];   // ZA, ZR, KX, ZO | XE, TY, cos and sin of the map's yaw | water level upstream of the sim
#define ZA uW[0].x
#define ZR uW[0].y
#define KX uW[0].z
#define ZO uW[0].w
#define XE uW[1].x
#define TY uW[1].y
vec2 rotW(vec2 p){ return vec2(p.x*uW[1].z-p.y*uW[1].w,p.x*uW[1].w+p.y*uW[1].z); }
vec2 unrotW(vec2 p){ return vec2(p.x*uW[1].z+p.y*uW[1].w,p.y*uW[1].z-p.x*uW[1].w); }`,sa=(s,e)=>`const int NX=${I},NZ=${ot}; const float CL=${xt},SX0=${we},SZ0=${J};
const vec2 SDS=vec2(${(I*xt).toFixed(4)},${(ot*xt).toFixed(4)});
${s}
vec2 toUV(vec2 p){ ${e?"p=rotW(p); ":""}return vec2(.5+(p.x-XE+TY*p.y)/(KX*(p.y+ZO)),sqrt(max(p.y-ZA,0.)/ZR)); }
vec2 fromUV(vec2 uv){ float z=ZA+ZR*uv.y*uv.y; return ${e?"unrotW(":""}vec2(XE-TY*z+(uv.x-.5)*KX*(z+ZO),z)${e?")":""}; }
vec2 simUV(vec2 p){ return (p-vec2(SX0,SZ0))/SDS; }
float hs1(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
vec2 hs2(vec2 p){ vec3 q=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973)); q+=dot(q,q.yzx+33.33); return fract((q.xx+q.yz)*q.zy); }
`,Ct=sa(Ps,0),po=sa(ks,1),bt=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,As=`#version 300 es
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
}`,Ms=`
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
}`,na=s=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uM,uN;
in vec2 vUv; out vec4 o;
${s}
${Ms}
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
void main(){ o=F(fromUV(vUv)); }`,ia=s=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uA; uniform vec3 uL; uniform float uSoft; uniform vec4 uGeo[12]; uniform int uOne;
in vec2 vUv; out vec4 o;
${s}
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
}`,Fs=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF,uB;
uniform vec4 uP[3];  // dt, fric, vort, - | push x,z,r,s | push dx,dz
uniform vec4 uBt[36]; uniform int uNB; // hulls: x,z,cos,sin | 1/a2,1/b2,head,- | vx,vz,-,-
uniform vec4 uSt[9];   // stones: x,z,r,amplitude
uniform int uOne;
out vec4 o;
${Ct}
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
}`,Rs=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF,uB;
uniform vec4 uP[12]; // dt, inflow, rain, erosion | stamps x,z,r,amount (8) | time
uniform int uOne;
out vec4 o;
${Ct}
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
}`,ra=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uB; uniform int uRB,uOne;
out vec4 o;
${Ct}
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
}`,Es=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uV;
in vec2 vUv; out vec4 o;
const vec2 sz=vec2(${I}.,${ot}.);
void main(){
  vec2 st=vUv*sz-.5, f=fract(st), i=st-f, f2=f*f, f3=f2*f;
  vec2 w0=(1.-3.*f+3.*f2-f3)/6., w1=(4.-6.*f2+3.*f3)/6., w2=(1.+3.*f+3.*f2-3.*f3)/6., w3=f3/6.;
  vec2 g0=w0+w1, g1=w2+w3, h0=(i+.5+w1/g0-1.)/sz, h1=(i+.5+w3/g1+1.)/sz;
  o=g0.x*g0.y*texture(uV,h0)+g1.x*g0.y*texture(uV,vec2(h1.x,h0.y))+g0.x*g1.y*texture(uV,vec2(h0.x,h1.y))+g1.x*g1.y*texture(uV,h1);
}`,Ss=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uV,uFm,uB; uniform vec4 uP; uniform vec4 uBt[36]; uniform int uNB; // uP: dt, decay foam, decay stir, boost
in vec2 vUv; out vec4 o;
${Ct}
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
}`,ca="float atn(float y,float x){ float a=atan(y/(abs(x)+1e-5)); return x>=0.?a:(y>=0.?3.1416-a:-3.1416-a); }",Bs=`#version 300 es
precision highp sampler2D; precision highp float; precision highp int;
uniform sampler2D uN; uniform vec4 uP[24];
in vec2 vUv; out vec4 o;
float hs1(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
${ca}

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
}`,l0=s=>`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uA,uB,uV,uN,uRT,uSM,uFm,uSky; uniform int uOne;
uniform vec4 uP[24];
in vec2 vUv; out vec4 o;
${s}
${ca}
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
  gl_FragDepth=clamp(.5*(${((f0+c0)/(f0-c0)).toFixed(6)}-${(2*f0*c0/(f0-c0)).toFixed(6)}/zv)+.5,0.,1.);
  o=vec4(col,tt2/16.);
}`,xo=s=>l0(s).split("if(uP[7].w>0.)").join("if(false)").replace("if(uP[18].w>1.5&&uP[18].w<2.5)","if(false)").replace("if(uP[13].z>1.5&&","if(false&&").replace("if(uP[13].z>.5&&uP[13].z<1.5)","if(false)").replace("if((mat==2||mat==7)&&ks>.5)","if(false)").replace("if(uP[19].w>.0)","if(false)"),Ns=`#version 300 es
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
}`,Ts=`#version 300 es
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
}`,qs=`#version 300 es
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
}`,fa=`
vec4 fU(highp usampler2D s,ivec2 q,int l){return uintBitsToFloat(texelFetch(s,q,l));}
`,yo=`
vec4 tU(highp usampler2D s,vec2 uv){vec2 z=vec2(textureSize(s,0)),p=uv*z-.5,f=fract(p);ivec2 i=ivec2(floor(p)),m=ivec2(z)-1;
vec4 a=uintBitsToFloat(texelFetch(s,clamp(i,ivec2(0),m),0)),b=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(1,0),ivec2(0),m),0)),c=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(0,1),ivec2(0),m),0)),d=uintBitsToFloat(texelFetch(s,clamp(i+ivec2(1),ivec2(0),m),0));
return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
vec4 tU(highp usampler2D s,vec2 uv,float l){return tU(s,uv);}
`,O0=`
const float KE=.25,KI=4.;
`;function H0(s,e){const v=(F,z,j)=>{if(F.indexOf(z)<0)throw new Error("052 NH "+s+" "+z);return F.split(z).join(j)},E=(F,z)=>v(F,"void main(){",`void main0();
void main(){main0();`+z+`}
void main0(){`),p=F=>E(v(F,"out vec4 o;","out uvec4 oU; vec4 o;"),"oU=floatBitsToUint(o);");if(s==="flux"||s==="state")return p(v(v(v(e,"uniform highp sampler2D uS,uF,uB;","uniform highp usampler2D uS,uF; uniform highp sampler2D uB;"+fa),"texelFetch(uS,","fU(uS,"),"texelFetch(uF,","fU(uF,"));if(s==="vis"||s==="visR"){const F=v(v(e,"uniform highp sampler2D uS,uB;","uniform highp usampler2D uS; uniform highp sampler2D uB;"+fa),"texelFetch(uS,","fU(uS,");return s==="vis"?p(F):F}return s==="surf"?p(v(v(e,"uniform sampler2D uV;","uniform highp usampler2D uV;"+yo),"texture(uV,","tU(uV,")):s==="foam"?v(v(e,"uniform sampler2D uV,uFm,uB;","uniform highp usampler2D uV; uniform sampler2D uFm,uB;"+yo),"texture(uV,","tU(uV,"):s==="bakeA"||s==="bakeB"?p(e):s==="comp"?v(v(v(v(v(e,"uniform sampler2D uA,uB,uV,uN,uRT,uSM,uFm,uSky;","uniform sampler2D uA,uB,uN,uRT,uSM,uFm,uSky; uniform highp usampler2D uV;"+yo+O0),"texture(uV,","tU(uV,"),"textureLod(uV,","tU(uV,"),"textureLod(uSky,","KI*textureLod(uSky,"),"o=vec4(col,tt2/16.);","o=vec4(col*KE,sqrt(max(tt2,0.)/16.));"):s==="skyb"?E(v(e,"out vec4 o;","out vec4 o;"+O0),"o.rgb*=KE;"):s==="mesh"?v(v(v(v(e,"out vec4 o;","out vec4 o;"+O0),"o=vec4(col,.6*(","o=vec4(col*KE,.6*("),"o=vec4(col,cov); return; }","o=vec4(col*KE,cov); return; }"),"o=vec4(col,length(uP[6].xyz-vW)/16.);","o=vec4(col*KE,sqrt(length(uP[6].xyz-vW)/16.));"):s==="fin"?v(v(e,"texture(uH,","dH("),"uniform sampler2D uH,uN;","uniform sampler2D uH,uN;"+O0+`vec4 dH(vec2 uv){vec4 c=texture(uH,uv);return vec4(c.rgb*KI,c.a*c.a);}
`):e}function yt(s,e,v){const E=(j,m)=>{const U=s.createShader(j);return s.shaderSource(U,m),s.compileShader(U),U},p=s.createProgram(),F=E(s.VERTEX_SHADER,e),z=E(s.FRAGMENT_SHADER,v);return s.attachShader(p,F),s.attachShader(p,z),s.linkProgram(p),s.flush(),{p,sh:[F,z],u:null}}function W0(s,e,v){if(!s.getProgramParameter(e.p,s.LINK_STATUS))throw new Error("052 "+v+": "+s.getProgramInfoLog(e.p)+" "+s.getShaderInfoLog(e.sh[0])+" "+s.getShaderInfoLog(e.sh[1]));e.u={};const E=s.getProgramParameter(e.p,s.ACTIVE_UNIFORMS);for(let p=0;p<E;p++){const F=s.getActiveUniform(e.p,p),z=F.name.replace(/\[0\]$/,"");e.u[z]=s.getUniformLocation(e.p,F.name)}}const la=["skyb","noise","bakeA","bakeB","flux","state","vis","surf","foam","mesh","fin"],Ge={skyb:{uN:3},noise:{},bakeA:{uM:0,uN:1},bakeB:{uA:0},flux:{uS:0,uF:1,uB:2},state:{uS:0,uF:1,uB:2},vis:{uS:0,uB:2},surf:{uV:0},foam:{uV:0,uFm:1,uB:2},comp:{uA:0,uB:1,uV:2,uN:3,uRT:4,uSM:5,uFm:6,uSky:7},mesh:{uMesh:0,uN:3},fin:{uH:0,uN:3}};function Ds(s,e){let v=ea.get(s);if(v)return v;const E=!!s.getExtension("EXT_color_buffer_float"),p=!!s.getExtension("OES_texture_float_linear"),F=E||!!s.getExtension("EXT_color_buffer_half_float"),z=F?(m,U)=>U:H0,j={};return e!==null&&(j[e?"h":"g"]=yt(s,bt,z("comp",e?xo(Ct):l0(Ct)))),v={ck:j,skyb:yt(s,bt,z("skyb",Bs)),noise:yt(s,bt,As),bakeA:yt(s,bt,z("bakeA",na(Ct))),bakeB:yt(s,bt,z("bakeB",ia(Ct))),flux:yt(s,bt,z("flux",Fs)),state:yt(s,bt,z("state",Rs)),vis:yt(s,bt,z("vis",ra)),surf:yt(s,bt,z("surf",Es)),foam:yt(s,bt,z("foam",Ss)),mesh:yt(s,Ns,z("mesh",Ts)),fin:yt(s,bt,z("fin",qs)),vao0:s.createVertexArray(),ok:!1},F||(v.visR=yt(s,bt,H0("visR",ra))),v.cbf=E,v.lin=p,v.hbf=F,ea.set(s,v),v}function Ls(s,e,v){const E=v?"h":"g",p=e.ck[E]||(e.ck[E]=yt(s,bt,e.hbf?v?xo(Ct):l0(Ct):H0("comp",v?xo(Ct):l0(Ct))));if(!p.u){W0(s,p,"comp"),s.useProgram(p.p);for(const F in Ge.comp)p.u[F]&&s.uniform1i(p.u[F],Ge.comp[F]);p.u.uOne&&s.uniform1i(p.u.uOne,1)}return p}function Us(s,e,v){if(v)return e;if(!e.gen){const E=e.hbf?(F,z)=>z:H0,p={bakeA:yt(s,bt,E("bakeA",na(po))),bakeB:yt(s,bt,E("bakeB",ia(po))),comp:yt(s,bt,E("comp",l0(po)))};for(const F in p){W0(s,p[F],F),s.useProgram(p[F].p);for(const z in Ge[F])p[F].u[z]&&s.uniform1i(p[F].u[z],Ge[F][z]);p[F].u.uOne&&s.uniform1i(p[F].u.uOne,1)}e.gen=p}return e.gen}function wo(s,e,v,E,p,F,z,j,m){const U=s.createTexture();return s.bindTexture(s.TEXTURE_2D,U),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_ALIGNMENT,1),s.texImage2D(s.TEXTURE_2D,0,E,e,v,0,p,F,m||null),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,z),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,z===s.NEAREST?s.NEAREST:s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,j||s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,j||s.CLAMP_TO_EDGE),U}function ua(s,e,v){const E=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,E),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,e,0),v&&s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,v),E}const va=typeof FinalizationRegistry=="function"?new FinalizationRegistry(s=>{try{s.tex.forEach(e=>s.gl.deleteTexture(e)),s.fbo.forEach(e=>s.gl.deleteFramebuffer(e)),s.buf.forEach(e=>s.gl.deleteBuffer(e)),s.vao.forEach(e=>s.gl.deleteVertexArray(e)),s.rb.forEach(e=>s.gl.deleteRenderbuffer(e))}catch{}}):null,ha=new Float32Array(1),_s=new Uint32Array(ha.buffer),Cs=s=>{ha[0]=s;const e=_s[0],v=e>>>16&32768;let E=(e>>>23&255)-112,p=e&8388607;return E<=0?v:E>=31?v|31743:v|E<<10|p>>>13},j0=(s,e,v)=>{let E=s*374761393+e*668265263+v*1442695041|0;return E=Math.imul(E^E>>>13,1274126177),E^=E>>>16,(E>>>0)/4294967296},Is=(s,e,v)=>{const E=Math.floor(s),p=Math.floor(e),F=s-E,z=e-p,j=F*F*(3-2*F),m=z*z*(3-2*z),U=j0(E,p,v),c=j0(E+1,p,v),wt=j0(E,p+1,v),b=j0(E+1,p+1,v);return U+(c-U)*j+(wt-U)*m+(U-c-wt+b)*j*m},Vs=(s,e,v,E)=>{let p=0,F=.5,z=1,j=0;for(let m=0;m<v;m++)p+=F*Is(s*z,e*z,E+m*7),j+=F,F*=.5,z*=2.03;return p/j};function Gs(){const s=new Float32Array(G0*mo*2*4),e=new Int32Array(mo);let v=[];const E=(b,P,h)=>{const M=Math.hypot(b,P,h)||1;return[b/M,P/M,h/M]},p=(b,P,h)=>v.push(b[0],b[1],b[2],h,P[0],P[1],P[2]),F=(b,P,h,M)=>{const g=[P[0]-b[0],P[1]-b[1],P[2]-b[2]],w=[h[0]-b[0],h[1]-b[1],h[2]-b[2]],d=E(g[1]*w[2]-g[2]*w[1],g[2]*w[0]-g[0]*w[2],g[0]*w[1]-g[1]*w[0]);p(b,d,M),p(P,d,M),p(h,d,M)},z=(b,P,h,M,g)=>{F(b,P,h,g),F(b,h,M,g)},j=(b,P,h,M,g)=>{const w=(d,x)=>{const k=Math.PI*d/g,S=Ot*x/M,L=[Math.sin(k)*Math.cos(S),Math.cos(k),Math.sin(k)*Math.sin(S)];return[[b[0]+P[0]*L[0],b[1]+P[1]*L[1],b[2]+P[2]*L[2]],E(L[0]/P[0],L[1]/P[1],L[2]/P[2])]};for(let d=0;d<g;d++)for(let x=0;x<M;x++){const k=w(d,x),S=w(d+1,x),L=w(d+1,x+1),D=w(d,x+1);p(k[0],k[1],h),p(S[0],S[1],h),p(L[0],L[1],h),p(k[0],k[1],h),p(L[0],L[1],h),p(D[0],D[1],h)}},m=b=>{const P=v.length/7;e[b]=P;for(let h=0;h<P;h++){const M=(b*2*G0+h)*4,g=((b*2+1)*G0+h)*4;for(let w=0;w<4;w++)s[M+w]=v[h*7+w];for(let w=0;w<3;w++)s[g+w]=v[h*7+4+w]}v=[]},U=(b,P,h,M)=>{const g=(w,d)=>{const k=b(Math.min(1,w+.004),d),S=b(Math.max(0,w-.004),d),L=b(w,Math.min(1,d+.004)),D=b(w,Math.max(0,d-.004)),_=[k[0]-S[0],k[1]-S[1],k[2]-S[2]],V=[L[0]-D[0],L[1]-D[1],L[2]-D[2]];return E(_[1]*V[2]-_[2]*V[1],_[2]*V[0]-_[0]*V[2],_[0]*V[1]-_[1]*V[0])};for(let w=0;w<P;w++)for(let d=0;d<h;d++){const x=w/P,k=(w+1)/P,S=d/h,L=(d+1)/h,D=(_,V)=>p(b(_,V),g(_,V),M);D(x,S),D(k,S),D(k,L),D(x,S),D(k,L),D(x,L)}},c=(b,P,h,M,g,w,d)=>{const x=[P[0]-b[0],P[1]-b[1],P[2]-b[2]],k=[h[0]-b[0],h[1]-b[1],h[2]-b[2]],S=E(x[1]*k[2]-x[2]*k[1],x[2]*k[0]-x[0]*k[2],x[0]*k[1]-x[1]*k[0]);U((L,D)=>{const _=Math.max(L,.04),V=g*Math.sin(Math.PI*_)*(.35+.65*Math.sin(Math.PI*D));return[b[0]+_*(x[0]*(1-D)+k[0]*D)+S[0]*V,b[1]+_*(x[1]*(1-D)+k[1]*D)+S[1]*V,b[2]+_*(x[2]*(1-D)+k[2]*D)+S[2]*V]},w,d,M)};{const b=k=>-.5+k,P=k=>.215*Math.pow(Math.max(0,1-(2*k)**2),.62),h=k=>.17+.2*Math.abs(2*k)**2.2,M=k=>.06*Math.max(0,1-(k/.44)**2),g=k=>.02+.2*Math.max(0,Math.abs(2*k)-.5)**1.6;for(const k of[-1,1])U((S,L)=>{const D=b(S),_=M(D)+(P(D)-M(D))*Math.pow(L,.85),V=g(D)+(h(D)-g(D))*L;return[k*(_+.018*Math.sin(Math.PI*L)),V,D]},12,2,0);U((k,S)=>{const L=b(k)*.92;return[M(L)*(2*S-1),g(L),L]},8,1,2);const w=[.012,.5,.015],d=[0,.215,.31],x=[0,.215,-.31];for(const k of[-1,1]){const S=[k*.1,.155,0];c(w,d,S,1,.01,3,2),c(w,S,x,1,.01,3,2)}for(const k of[-1,1])U((S,L)=>{const D=-.32+.64*S,_=P(D);return[k*(_+.012-.02*L),h(D)+.005-.075*L-.03*Math.abs(D)*L,D]},6,1,2);m(0)}{for(const h of[-1,1])U((M,g)=>{const w=(M-.5)*2,d=w*.5*(1-g),x=.56*g;return[h*(.13*(1-g)+.012*Math.sin(Math.PI*g)*(1-w*w)),x,d]},6,3,0),U((M,g)=>{const x=(M-.5)*2,k=x*(.5+.03-(.5+.03-.405)*g),S=-.005+(.14+.005)*g;return[h*(.15-.035*g+.012*Math.sin(Math.PI*M)),S,k]},6,2,2);for(const h of[-1,1])U((M,g)=>{const w=(M-.5)*.26*(1-g),d=.56*g;return[w,d,h*(.5*(1-g)+0)]},2,3,0);m(1)}{const b=[0,.07,.2],P=[0,.07,-.2],h=[0,.17,0],M=[-.09,.06,0],g=[.09,.06,0],w=[0,0,0],d=.012;c(b,h,g,0,d,3,1),c(b,M,h,0,d,3,1),c(P,g,h,0,d,3,1),c(P,h,M,0,d,3,1),c(b,g,w,0,d,3,1),c(b,w,M,0,d,3,1),c(P,w,g,0,d,3,1),c(P,M,w,0,d,3,1);for(const x of[-1,1])c([0,.16,-.12],[0,.16,.12],[x*.56,.33,-.05],1,.02*x,5,2),c([0,.16,-.12],[x*.56,.33,-.05],[x*.22,.2,-.2],1,.016*x,5,2);for(const x of[-1,1])c([x*.014,.08,.12],[0,.06,.23],[0,.5,.42],2,.006*x,3,1),c([x*.014,.08,-.12],[0,.06,-.23],[0,.47,-.46],2,.006*x,3,1),c([0,.5,.42],[x*.012,.47,.42],[0,.42,.53],2,.002,3,1);m(2)}{for(const w of[-1,1])U((d,x)=>{const k=-.5+1*d,S=Math.abs(2*k),L=Math.max(0,S-.72)/.28,D=.19*(1-.32*L*L)*(.9+.1*x),_=x*.2+.11*L*L*L;return[w*D*(.72+.28*x),_,k]},12,2,0);U((w,d)=>{const x=-.5+1*w,k=Math.abs(2*x),S=Math.max(0,k-.72)/.28;return[.19*.72*(1-.32*S*S)*(2*d-1),.11*S*S*S,x]},10,1,2);for(const w of[-1,1])U((d,x)=>{const k=.1292*(.72+.28*x)*(2*d-1),S=w*(.5-.14*0);return[k,.11+x*(.2+0),S+w*.14*x*.25]},3,2,0);const g=.2;for(let w=0;w<2;w++){const d=(w?-1:1)*.16;U((x,k)=>[.1406*(2*x-1),.2*.86+.01*Math.sin(Math.PI*x),d-.03+.06*k],3,1,2)}m(3)}{for(let P=0;P<7;P++)for(let h=0;h<12;h++){const M=(w,d)=>{const x=w/7*Math.PI*.5,k=d/12*Ot,S=.32*(1+.09*Math.sin(k*5+w)*Math.sin(w*1.7)),L=[Math.sin(x)*Math.cos(k),-Math.cos(x),Math.sin(x)*Math.sin(k)];return[[S*L[0],.27+S*.82*L[1],S*1.14*L[2]],L]},g=[M(P,h),M(P+1,h),M(P+1,h+1),M(P,h+1)];p(g[0][0],g[0][1],8),p(g[1][0],g[1][1],8),p(g[2][0],g[2][1],8),p(g[0][0],g[0][1],8),p(g[2][0],g[2][1],8),p(g[3][0],g[3][1],8)}const b=(P,h,M,g)=>{z(P,h,M,g,9)};b([-.015,.2,0],[.015,.2,0],[.012,.86,0],[-.012,.86,0]),b([0,.2,-.015],[0,.2,.015],[0,.86,.012],[0,.86,-.012]),F([.01,.84,0],[.01,.34,0],[.27,.42,.06],1),F([.01,.84,0],[.27,.42,.06],[.2,.7,-.02],1),m(4)}const wt=(b,P,h,M)=>{for(let g=0;g<b;g++)for(let w=0;w<P;w++){const d=(x,k)=>{const S=-.5+x/b,L=-.5+k/P;return[S,h(S,L),L]};z(d(g,w),d(g+1,w),d(g+1,w+1),d(g,w+1),M)}};U((b,P)=>{const h=-.36+.72*b,M=-.5+P;return[h,.34*h*h+.13*h+.3*Math.max(0,M-.15)**2-.1*Math.max(0,-M-.2)+.05*Math.sin(M*7)*h,M]},6,8,3),m(5),wt(2,2,(b,P)=>.14*(b*b+P*P),4),m(6),U((b,P)=>{const h=b-.5,M=P-.5;return[h,.05*(h*h+M*M),M]},3,3,6),m(12),m(13);{const b=(P,h,M,g,w,d)=>{const x=[[P,M,w],[h,M,w],[h,g,w],[P,g,w],[P,M,d],[h,M,d],[h,g,d],[P,g,d]],k=[[0,1,2,3],[5,4,7,6],[4,0,3,7],[1,5,6,2],[3,2,6,7],[4,5,1,0]];for(const S of k)z(x[S[0]],x[S[1]],x[S[2]],x[S[3]],5)};b(-.025,.025,0,.045,-.5,.5),b(0,.2,.005,.035,.1,.13),b(-.16,0,.005,.03,-.22,-.2),m(7)}wt(2,3,(b,P)=>.03*b,6),m(8);{for(let P=0;P<21;P++){const h=Ot*P/21,M=Ot*(P+1)/21,g=.5+.035*Math.cos(h*21),w=.5+.035*Math.cos(M*21);z([Math.cos(h)*g,0,Math.sin(h)*g],[Math.cos(M)*w,0,Math.sin(M)*w],[Math.cos(M)*.46,.2,Math.sin(M)*.46],[Math.cos(h)*.46,.2,Math.sin(h)*.46],7),F([Math.cos(h)*.46,.2,Math.sin(h)*.46],[Math.cos(M)*.46,.2,Math.sin(M)*.46],[0,.21,0],7)}m(9)}return{data:s,counts:e}}function Os(s,e){if(e.ok)return;e.ok=!0;const v=Gs();for(const p of la)W0(s,e[p],p);for(const p of la){const F=e[p];s.useProgram(F.p);for(const z in Ge[p])F.u[z]&&s.uniform1i(F.u[z],Ge[p][z]);F.u.uOne&&s.uniform1i(F.u.uOne,1)}if(e.visR){const p=e.visR;W0(s,p,"visR"),s.useProgram(p.p),s.uniform1i(p.u.uS,0),s.uniform1i(p.u.uB,2),p.u.uOne&&s.uniform1i(p.u.uOne,1)}e.noiseT=wo(s,256,256,s.RGBA8,s.RGBA,s.UNSIGNED_BYTE,s.LINEAR,s.REPEAT);const E=ua(s,e.noiseT);s.viewport(0,0,256,256),s.disable(s.BLEND),s.disable(s.DEPTH_TEST),s.disable(s.SCISSOR_TEST),s.disable(s.CULL_FACE),s.useProgram(e.noise.p),s.bindVertexArray(e.vao0),s.drawArrays(s.TRIANGLES,0,3),s.bindFramebuffer(s.FRAMEBUFFER,null),s.deleteFramebuffer(E),s.bindTexture(s.TEXTURE_2D,e.noiseT),s.generateMipmap(s.TEXTURE_2D),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR_MIPMAP_LINEAR),e.meshT=wo(s,G0,mo*2,s.RGBA32F,s.RGBA,s.FLOAT,s.NEAREST,0,v.data),e.counts=v.counts}const Hs={"Newspaper grey":0,White:1,"Coloured origami":2,"Gold foil":3,"Brown wrapping paper":4,"Squared exercise paper":5},ma=[[.72,.1,.08],[.1,.28,.68],[.9,.66,.1],[.12,.46,.22],[.88,.42,.52],[.92,.42,.08],[.45,.2,.55]];ta.add({num:52,name:"Paper Boats",fam:"Worlds",recipe:"Kerb height in a stone gutter after a summer rain, where the water flows round the stones to the drain. Paper boats float on it, spin, run aground and sink, and pile up on the drain until a surge floats them over. Tap to set a boat on the water, drag slowly to build a leaf dam, drag fast to send a wave, or hold for rain.",interactive:"Tap to set a paper boat on the water, drag slowly across the gutter to pile a dam of leaves, drag fast to sweep the water and send a wave down it (it carries the boats). Hold to bring a shower back.",music:!0,gl:!0,fps:30,seed:0,make(s){const e=s.gl,v=s.size,E=s.hash.slice(2),p=t=>{let o=parseInt(E.slice(t,t+8),16)>>>0,a=parseInt(E.slice(t+8,t+16),16)>>>0,r=parseInt(E.slice(t+16,t+24),16)>>>0,n=2654435769;const i=()=>{o>>>=0,a>>>=0,r>>>=0,n=n+1831565813|0;const f=o+a+n|0;return o=a^a>>>9,a=r+(r<<3)|0,r=(r<<21|r>>>11)+f|0,(f>>>0)/4294967296};for(let f=0;f<12;f++)i();return i},F=p(0),z=p(16),j=p(32),m=p(40),U=(t,o=F)=>{let a=0;for(const n of t)a+=n[1];let r=o()*a;for(const n of t)if(r-=n[1],r<=0)return n[0];return t[t.length-1][0]},c=(t,o,a=F)=>t+(o-t)*a();let wt=U([["Old cobbles",26],["Granite setts",20],["Brick lane",18],["Stone channel in a garden",12],["Asphalt with a painted line",24]]),b=U([["White",24],["Newspaper grey",22],["Coloured origami",24],["Brown wrapping paper",14],["Squared exercise paper",10],["Gold foil",6]]);const P=(()=>{let t=(parseInt(E.slice(46,54),16)^461845907)>>>0;return()=>{t=t+1831565813>>>0;let o=t;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})(),h=s.home?"Summer":U([["Summer",30],["Autumn",30],["Winter thaw",18],["Spring",22]],P);let M=U(h==="Winter thaw"?[["Grey after-rain",55],["Blue evening, streetlamp",25],["Golden late sun",20]]:[["Golden late sun",34],["Grey after-rain",20],["Blue evening, streetlamp",16],["Hard noon, dappled shade",16],["Neon sign at night",14]]),g=h==="Autumn"?"Autumn leaves":U(h==="Winter thaw"?[["Ice and slush",70],["Seeds and twigs",30]]:h==="Spring"?[["Cherry petals",70],["Seeds and twigs",30]]:[["Autumn leaves",25],["Cherry petals",25],["Seeds and twigs",50]]),w=U([["Iron grate",52],["Stone spout",28],["Culvert pipe",20]]),d=U([["Classic boats",34],["Boats and hats",24],["A crane among them",14],["Flat-bottomed punts",18],["A walnut-shell fleet",10]]),x=U([["None",70],["A toy duck",12],["A frog",10],["A fleet from upstream",8]]);(x==="A toy duck"||x==="A frog")&&(x="None"),wt==="Stone channel in a garden"&&w==="Stone spout"&&(w="Culvert pipe");let k=U([["A trickle",18],["Running",40],["In spate",22],["Slow and deep",20]],P),S=U([["A few stones",34],["Clear run",16],["Rubble and half-bricks",24],["A line of stepping stones",14],["Downspout pouring in",12]],P),L=U([["Weathered stone",40],["Painted yellow",22],["Black and white blocks",16],["Old and mossy",22]],P);s.home&&(wt="Old cobbles",b="White",M="Golden late sun",g="Autumn leaves",w="Iron grate",d="Classic boats",x="None",k="Running",S="A few stones",L="Weathered stone"),wt==="Stone channel in a garden"&&(L="Old and mossy");const D=(()=>{let t=(parseInt(E.slice(22,30),16)^2135587861)>>>0;return()=>{t=t+1831565813>>>0;let o=t;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})(),_=!s.home&&D()<.2?.55:0;s.trait("Street",wt),s.trait("Paper",b),s.trait("Light",_?{"Golden late sun":"Sun shower","Grey after-rain":"Grey, still raining"}[M]||M+", still raining":M),s.trait("Folds",d),s.trait("Season",h),s.trait("Water",k),s.trait("Layout",S);const V=(()=>{let t=(parseInt(E.slice(6,14),16)^739982445)>>>0;return()=>{t=t+1831565813>>>0;let o=t;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})();let ut=U([["A few",40],["A flotilla",42],["One big boat",18]],V);s.home&&(ut="A few"),s.trait("Boats",x==="A fleet from upstream"?"A fleet from upstream":ut);const u0=(()=>{let t=(parseInt(E.slice(30,38),16)^1374496523)>>>0;return()=>{t=t+1831565813>>>0;let o=t;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}})();let dt=U([["Kerb height",46],["Looking upstream",30],["Looking down",24]],u0);s.home&&(dt="Kerb height");const ze=dt==="Looking upstream";s.trait("View",dt);const Pt=ut==="One big boat",Oe=Pt?3:ut==="A flotilla"?.28:1,se={"Old cobbles":0,"Granite setts":1,"Brick lane":2,"Stone channel in a garden":3,"Asphalt with a painted line":4}[wt],vt={"Iron grate":0,"Stone spout":1,"Culvert pipe":2}[w],kt={"Golden late sun":0,"Grey after-rain":1,"Blue evening, streetlamp":2,"Hard noon, dappled shade":3,"Neon sign at night":4}[M],It=kt===2||kt===4,X0={Summer:0,Autumn:1,"Winter thaw":2,Spring:3}[h],pa={"Weathered stone":0,"Painted yellow":1,"Black and white blocks":2,"Old and mossy":3}[L],xa=!It&&X0!==2&&vt===0&&pa===0&&kt!==3,K=Ds(e,Ht[dt].home?xa:null),Re={"A trickle":0,Running:1,"In spate":2,"Slow and deep":3}[k],Ee=Hs[b],Bt=se===3,B=Bt?-.11:-.13,Se=Bt?0:c(.095,.112,z),ht=(Bt?.22:.26)*(Re===0&&!Bt?.8:1),v0=c(.01,.014,z)*[.9,1,1.5,.4][Re],ne=c(.86,1,z),h0=c(.012,.02,z),X=vt===2?c(1.62,1.75,z):c(1.4,1.55,z),Z0=Bt?.03:c(.01,.014,z),da=c(.025,.04,z),ie=Bt?B+ht*.5:B+.07,zo=z()*1e6|0,Rt=[];if(S==="A few stones"){const t=2+Math.floor(z()*3);for(let o=0;o<t;o++){const a=o%2===0,r=a?c(.42,ne-.1,z):c(ne+.12,X-.24,z),n=c(B+.03,B+ht-.06,z);Rt.some(i=>Math.hypot(i[0]-n,i[1]-r)<.09)||Rt.push([n,r,c(.022,.036,z),c(.02,.03,z)])}}else if(S==="Rubble and half-bricks"){const t=6+Math.floor(z()*3);for(let o=0,a=0;o<t&&a<40;a++){const r=c(.4,X-.2,z),n=c(B+.02,B+ht-.04,z);if(Rt.some(f=>Math.hypot(f[0]-n,f[1]-r)<.075))continue;const i=z()<.55;Rt.push([n,r,c(.02,.034,z),(i?-1:1)*c(.016,.028,z)]),o++}}else if(S==="A line of stepping stones"){const t=c(.55,.8,z),o=4,a=ht/o;for(let r=0;r<o;r++)Rt.push([B+a*(r+.5)+c(-.008,.008,z),t+c(-.015,.015,z),c(.024,.03,z),c(.018,.025,z)])}S==="Downspout pouring in"&&z()<.5&&Rt.push([B+.05,ne-.2,.028,.024]),s.home&&(Rt.length=0,Rt.push([B+.1,.72,.03,.03],[B+.17,1.18,.026,.026],[B+.05,.9,.022,.024]));const m0=ie,Ws=-v0*(X-.25)-Z0-h0+.045,ya=(t,o)=>{let a=-v0*(o-.25);if(t>=B&&t<B+ht){const r=t<ie?(t-ie)/(ie-B):(t-ie)/(B+ht-ie);a-=Z0*(Bt?1-r**6:1-r*r)}else t>=B+ht?a+=Bt?Math.min(.02,(t-B-ht)*.4)+.005:da*(t-B-ht):a+=Bt?Math.min(.03,(B-t)*.4)+.008:.02*Math.min(B-t,1);return a+=(Vs(t*4.5,o*3.5,3,zo)-.5)*(t>B?.006:.002),a},js=(t,o)=>{let a=0;Se>0&&(a+=Se*ae(B+.002,B-.007,t));const r=ae(B-.01,B+.003,t)*ae(B+ht+.06,B+ht-.01,t);a-=h0*ae(ne-.004,ne+.004,o)*r;for(const n of Rt){const i=(t-n[0])/n[2],f=(o-n[1])/n[2];if(n[3]<0){const u=Math.cos(n[0]*37),l=Math.sin(n[0]*37),A=Math.abs(i*u+f*l)/1.55,y=Math.abs(-i*l+f*u)/.78,N=1-Math.max(A,y);N>0&&(a+=-n[3]*ae(0,.32,N))}else{const u=1-i*i-f*f;if(u>0){let l=Y(u/.8,0,1);l=1-(1-l)*(1-l),a+=n[3]*l}}}if(vt===0)Math.abs(t-B-.1)<.095&&Math.abs(o-X)<.16&&(a-=.004);else if(vt===1){const n=ae(.17,.13,Math.abs(o-X));a-=.007*n*ae(B+.12,B,t)}else a+=.13*ae(X-.003,X+.003,o);return a},Be=(t,o)=>ya(t,o)+js(t,o),Xs=ze?{...Ht[dt],eye:[Ht[dt].eye[0],Ht[dt].eye[1],ne+Ht[dt].eye[2]]}:Ht[dt],{EYE:Yt,TANF:Zs,CF:go,CR:bo,CU:Po,VP:Ks,rayDir:Ys,toUVj:Gn,fromUVj:$s,W:$t}=bs(Xs),re=Us(e,K,!$t),mt=I*ot,zt=new Float32Array(mt),Ne=new Float32Array(mt*4),ko=t=>t>B+.004&&t<B+ht;for(let t=0;t<ot;t++)for(let o=0;o<I;o++){const a=t*I+o,r=we+(o+.5)*xt,n=J+(t+.5)*xt,i=Be(r,n);zt[a]=i;let f=0;if(vt===0){const u=Math.abs(r-B-.1),l=Math.abs(n-X);u<.08&&l<.145&&(f=-7)}else vt===1?r<B+.02&&r>B-.004&&Math.abs(n-X)<.13&&(f=12):n<X&&n>X-.05&&Math.abs(r-m0)<.065&&(f=14);Ne[a*4]=i,Ne[a*4+1]=f,Ne[a*4+2]=t<3&&ko(r)?1:0,S==="Downspout pouring in"&&!Bt&&Math.hypot(r-(B+.035),n-(ne-.32))<.03&&(Ne[a*4+2]=12)}const Ao=new Float32Array(mt*4),wa=new Float32Array(mt);{const t=new Float32Array(mt).fill(1e9),o=new Uint8Array(mt),a=[],r=(i,f)=>{a.push([f,i]);let u=a.length-1;for(;u>0;){const l=u-1>>1;if(a[l][0]<=a[u][0])break;[a[l],a[u]]=[a[u],a[l]],u=l}},n=()=>{const i=a[0],f=a.pop();if(a.length){a[0]=f;let u=0;for(;;){const l=u*2+1,A=l+1;let y=u;if(l<a.length&&a[l][0]<a[y][0]&&(y=l),A<a.length&&a[A][0]<a[y][0]&&(y=A),y===u)break;[a[y],a[u]]=[a[u],a[y]],u=y}}return i};for(let i=0;i<ot;i++)for(let f=0;f<I;f++)if(f===0||f===I-1||i===0||i===ot-1){const u=i*I+f;o[u]=1,t[u]=zt[u],r(u,zt[u])}for(;a.length;){const[i,f]=n(),u=f%I,l=f/I|0;for(let A=0;A<4;A++){const y=u+(A===0?-1:A===1?1:0),N=l+(A===2?-1:A===3?1:0);if(y<0||y>=I||N<0||N>=ot)continue;const C=N*I+y;o[C]||(o[C]=1,t[C]=Math.max(zt[C],i),r(C,t[C]))}}for(let i=0;i<ot;i++){let f=1e9;for(let l=0;l<I;l++){const A=we+(l+.5)*xt;ko(A)&&(f=Math.min(f,zt[i*I+l]))}const u=f+[.0045,.011,.019,.022][Re];for(let l=0;l<I;l++){const A=i*I+l,y=we+(l+.5)*xt;let N=Math.max(0,t[A]-4e-4-zt[A]);y>B&&y<B+ht+.15&&(N=Math.max(N,u-zt[A])),N=Math.min(N,.038),Ne[A*4+1]!==0&&(N*=.4),Ao[A*4+1]=N,wa[A]=N}}}const R={L:[0,1,0],sunC:[0,0,0],skyZ:[0,0,0],skyH:[0,0,0],skyS:[0,0,0],amb:[0,0,0],expo:1,cover:.5,lampP:[0,0,0],lampI:0,lampC:[1,.6,.3],win:0},za=j()<.8?c(.2,.85,j):c(-.5,-.2,j),Mo=(kt===0?c(7,11,j):kt===3?c(48,60,j):34)*i0,ga=ze?za+Math.PI:za,Qs=[Math.sin(ga)*Math.cos(Mo),Math.sin(Mo),Math.cos(ga)*Math.cos(Mo)],He=[c(.55,.9,j),3.6,c(2.6,3.6,j)];ze&&(He[2]=Yt[2]-He[2]);const ba=It?(()=>{const t=[He[0]-.05,He[1],He[2]-1],o=Math.hypot(...t);return t.map(a=>a/o)})():Qs,Wt=[{sunC:[1,.7,.42],sunI:3.3,skyZ:[.3,.42,.66],skyH:[.92,.74,.58],skyS:[1,.58,.28],amb:[.2,.22,.27],expo:1,cover:c(.4,.6,j)},{sunC:[.92,.92,.95],sunI:.45,skyZ:[.56,.59,.63],skyH:[.74,.75,.77],skyS:[.8,.79,.76],amb:[.42,.44,.48],expo:1.2,cover:.9},{sunC:[0,0,0],sunI:0,skyZ:[.04,.075,.2],skyH:[.17,.2,.33],skyS:[.32,.22,.28],amb:[.035,.05,.1],expo:2.6,cover:.45},{sunC:[1,.94,.84],sunI:4.4,skyZ:[.28,.46,.8],skyH:[.72,.74,.72],skyS:[.5,.48,.4],amb:[.3,.34,.4],expo:.78,cover:.3},{sunC:[0,0,0],sunI:0,skyZ:[.02,.03,.08],skyH:[.1,.09,.2],skyS:[.3,.1,.3],amb:[.022,.03,.08],expo:2.9,cover:.5}][kt],Js=[[.95,.2,.5],[.15,.85,.9],[.95,.35,.12],[.5,.3,.98]][Math.floor(j()*4)];X0===2&&kt===1&&(Wt.skyZ=[.6,.66,.74],Wt.skyH=[.82,.84,.88]),X0===1&&kt===1&&(Wt.amb=[.42,.4,.38]);const Fo=j()*100;let tt=_,K0=_,p0=kt===1?.95:c(.75,.92,m),We=1;const Pa=t=>{const o=.5+.5*Math.sin(t*.05+Fo)*Math.sin(t*.031+Fo*1.7);We=kt===0?Y(.35+.9*ae(.25,.6,o),0,1):1,s.home&&t<30&&(We=Math.max(We,.95)),We*=1-.88*tt;const a=Wt.sunI;R.L=ba,R.sunC=Wt.sunC.map(n=>n*a);const r=[.55,.58,.62];R.skyZ=Wt.skyZ.map((n,i)=>I0(n,r[i]*(It?.25:1),tt*.7)),R.skyH=Wt.skyH.map((n,i)=>I0(n,r[i]*1.1*(It?.3:1),tt*.7)),R.skyS=Wt.skyS.map(n=>n*(1-tt*.8)),R.amb=Wt.amb.map((n,i)=>I0(n,r[i]*.55*(It?.25:1),tt*.5)),R.cover=I0(Wt.cover,1,tt),R.expo=Wt.expo*(1+tt*.25),R.lampI=kt===4?16:It?12:0,R.lampP=He,R.win=It?1:0,kt===4&&(R.lampC=Js)};Pa(0),Os(e,K);let ka=null;const Te={gl:e,tex:[],fbo:[],buf:[],vao:[],rb:[]},Et=(t,o,a,r,n,i,f,u)=>{const l=wo(e,t,o,a,r,n,i,f,u);return Te.tex.push(l),l},Dt=(t,o)=>{const a=ua(e,t,o);return Te.fbo.push(a),a},Aa=(t,o)=>{const a=e.createRenderbuffer();return e.bindRenderbuffer(e.RENDERBUFFER,a),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,t,o),Te.rb.push(a),a},At=!K.hbf,x0=!0,Ma=K.cbf?e.RGBA32F:e.RGBA16F,ge=v>300?oa:oa*5/8,qe=v>300?aa:aa*5/8,Fa=new Uint16Array(r0*V0);for(let t=0;t<V0;t++)for(let o=0;o<r0;o++){const a=$s((o+.5)/r0,(t+.5)/V0);Fa[t*r0+o]=Cs(ya(a[0],a[1]))}const tn=Et(r0,V0,e.R16F,e.RED,e.HALF_FLOAT,e.LINEAR,0,Fa),Y0=K.hbf?e.RGBA16F:e.RGBA8,d0=K.hbf?e.HALF_FLOAT:e.UNSIGNED_BYTE,Ra=At?e.RGBA16F:Y0,Ea=At?e.HALF_FLOAT:d0,Sa=At?e.SRGB8_ALPHA8:Y0,y0=(t,o,a)=>Et(t,o,e.RGBA32UI,e.RGBA_INTEGER,e.UNSIGNED_INT,e.NEAREST,0,a),$0=Et(ge,qe,Ra,e.RGBA,Ea,e.LINEAR),Ro=Et(ge,qe,Ra,e.RGBA,Ea,e.LINEAR),Q0=Et(I,ot,e.RGBA32F,e.RGBA,e.FLOAT,e.NEAREST,0,Ne),J0=[0,1].map(()=>At?y0(I,ot,new Uint32Array(Ao.buffer)):Et(I,ot,Ma,e.RGBA,e.FLOAT,e.NEAREST,0,Ao)),Eo=[0,1].map(()=>At?y0(I,ot,new Uint32Array(mt*4)):Et(I,ot,Ma,e.RGBA,e.FLOAT,e.NEAREST,0,new Float32Array(mt*4))),Ba=At?y0(I,ot):Et(I,ot,Y0,e.RGBA,d0,e.LINEAR),Na=4,So=I*Na,Bo=ot*Na,No=At?y0(So,Bo):Et(So,Bo,Y0,e.RGBA,d0,e.LINEAR),Ta=I*2,qa=ot*2,To=[0,1].map(()=>Et(Ta,qa,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),en=Et(I,ot,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST),Da=Et(v,v,Sa,e.RGBA,d0,e.LINEAR),on=Aa(v,v),je=Math.ceil(v/2),La=Et(je,je,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),an=Aa(je,je),qo=v>300?512:256,Ua=qo*3/4,_a=Et(qo,Ua,Sa,e.RGBA,d0,e.LINEAR,e.REPEAT),sn=Dt(_a),to=Math.ceil(v/3),Ca=Et(to,to,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),nn=At?null:Dt($0),rn=At?null:Dt(Ro),cn=J0.map(t=>Dt(t)),fn=Eo.map(t=>Dt(t)),ln=Dt(Ba),un=Dt(No),vn=To.map(t=>Dt(t)),Ia=Dt(en),hn=Dt(Da,on),mn=Dt(La,an),pn=Dt(Ca);e.bindFramebuffer(e.FRAMEBUFFER,null);const w0=e.createBuffer();Te.buf.push(w0),e.bindBuffer(e.PIXEL_PACK_BUFFER,w0),e.bufferData(e.PIXEL_PACK_BUFFER,mt*4,e.STREAM_READ),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const eo=e.createBuffer();Te.buf.push(eo);const Do=e.createVertexArray();Te.vao.push(Do),e.bindVertexArray(Do),e.bindBuffer(e.ARRAY_BUFFER,eo),e.bufferData(e.ARRAY_BUFFER,160*64,e.DYNAMIC_DRAW);for(let t=0;t<4;t++)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,4,e.FLOAT,!1,64,t*16),e.vertexAttribDivisor(t,1);e.bindVertexArray(null);const $=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},Qt=()=>{e.bindVertexArray(K.vao0),e.drawArrays(e.TRIANGLES,0,3)},Xe=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.colorMask(!0,!0,!0,!0),e.depthMask(!1)},oo=new Float32Array(48);oo.set([B,Se,ht,v0,ne,h0,vt,X,se,Z0,da,zo%1e3]),Rt.length=Math.min(Rt.length,9),Rt.forEach((t,o)=>oo.set(t,12+o*4)),Xe();const Va=At?y0(ge,qe):null,Lo=At?Dt(Va):null,Ga=At?new Uint32Array(ge*qe*4):null,Oa=t=>{e.readPixels(0,0,ge,qe,e.RGBA_INTEGER,e.UNSIGNED_INT,Ga),e.bindTexture(e.TEXTURE_2D,t),e.texSubImage2D(e.TEXTURE_2D,0,0,0,ge,qe,e.RGBA,e.FLOAT,new Float32Array(Ga.buffer))};e.bindFramebuffer(e.FRAMEBUFFER,At?Lo:nn),e.viewport(0,0,ge,qe),e.useProgram(re.bakeA.p),$(0,tn),$(1,K.noiseT),e.uniform4fv(re.bakeA.u.uGeo,oo),$t&&e.uniform4fv(re.bakeA.u.uW,$t),Qt(),At&&Oa($0),e.bindFramebuffer(e.FRAMEBUFFER,At?Lo:rn),e.useProgram(re.bakeB.p),$(0,$0),$t&&e.uniform4fv(re.bakeB.u.uW,$t),e.uniform3fv(re.bakeB.u.uL,ba),e.uniform1f(re.bakeB.u.uSoft,kt===1?.9:It?.15:.06),e.uniform4fv(re.bakeB.u.uGeo,oo),Qt(),At&&(Oa(Ro),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(Lo),e.deleteTexture(Va));let Ze=0,z0=0,g0=0,Ke=0;const De=1/60,jt=new Float32Array(12),be=new Float32Array(48),rt=new Float32Array(144);let ce=0;const Ha=new Float32Array(36);Rt.slice(0,9).forEach((t,o)=>Ha.set([t[0],t[1],t[2],1.1],o*4));const b0=[],Lt={x:0,z:0,r:.05,s:0,dx:0,dz:0},xn=c(.05,.07,m)*(s.home?1.1:1)*[.3,1,2.1,1.05][Re],dn=[.042,.022,.012,.04][Re],yn=5,Wa=.9,ja=t=>{if(Xe(),e.viewport(0,0,I,ot),e.bindFramebuffer(e.FRAMEBUFFER,fn[1-z0]),e.useProgram(K.flux.p),$(0,J0[Ze]),$(1,Eo[z0]),$(2,Q0),jt[0]=De,jt[1]=dn,jt[2]=yn,jt[3]=Ke,jt[4]=Lt.x,jt[5]=Lt.z,jt[6]=Lt.r,jt[7]=Lt.s,jt[8]=Lt.dx,jt[9]=Lt.dz,e.uniform4fv(K.flux.u.uP,jt),e.uniform4fv(K.flux.u.uBt,rt),e.uniform1i(K.flux.u.uNB,ce),e.uniform4fv(K.flux.u.uSt,Ha),Qt(),z0=1-z0,e.bindFramebuffer(e.FRAMEBUFFER,cn[1-Ze]),e.useProgram(K.state.p),$(0,J0[Ze]),$(1,Eo[z0]),$(2,Q0),be.fill(0),be[0]=De,be[1]=xn*(1+2.2*Math.max(0,tt-_)),be[2]=Math.max(0,tt-_)*25e-5,be[3]=1,be[36]=Ke,Ke+=De,t)for(let o=0;o<Math.min(8,b0.length);o++)be.set(b0[o],4+o*4);e.uniform4fv(K.state.u.uP,be),Qt(),Ze=1-Ze},ao=t=>{Xe(),e.viewport(0,0,I,ot),e.bindFramebuffer(e.FRAMEBUFFER,t?Ia:ln);const o=t&&K.visR||K.vis;e.useProgram(o.p),$(0,J0[Ze]),$(2,Q0),e.uniform1i(o.u.uRB,t?1:0),Qt()},Xa=()=>{Xe(),e.bindFramebuffer(e.FRAMEBUFFER,un),e.viewport(0,0,So,Bo),e.useProgram(K.surf.p),$(0,Ba),Qt()};let P0=0;const k0=new Float32Array(4),Za=(t,o)=>{Xe(),e.bindFramebuffer(e.FRAMEBUFFER,vn[1-P0]),e.viewport(0,0,Ta,qa),e.useProgram(K.foam.p),$(0,No),$(1,To[P0]),$(2,Q0),k0[0]=t,k0[1]=1.1,k0[2]=.55,k0[3]=o,e.uniform4fv(K.foam.u.uP,k0),e.uniform4fv(K.foam.u.uBt,rt),e.uniform1i(K.foam.u.uNB,ce),Qt(),P0=1-P0},St=new Float32Array(mt),Xt=new Float32Array(mt),Nt=new Float32Array(mt),Tt=new Float32Array(mt),Le=new Uint8Array(mt*4);St.set(wa);let Pe=null,Uo=0;const Ye=new Float32Array(mt),$e=new Float32Array(mt),Qe=new Float32Array(mt);let _o=0,Co=0,A0=0,Ka=0,Je=null;const Ya=()=>{Ye.set(St),$e.set(Nt),Qe.set(Tt),Co=A0,A0=_o;for(const t of ft)t.tqA=t.tqB||null,t.tqB=t.tqR||null},$a=new Float32Array(256).map((t,o)=>o/255*.06),Qa=new Float32Array(256).map((t,o)=>(o/255-.5)*2),Io=()=>{for(let t=0,o=0;t<mt;t++,o+=4)St[t]=$a[Le[o]],Xt[t]=$a[Le[o+1]],Nt[t]=Qa[Le[o+2]],Tt[t]=Qa[Le[o+3]]},wn=()=>{if(!Pe){ao(!0),e.bindBuffer(e.PIXEL_PACK_BUFFER,w0),e.readPixels(0,0,I,ot,e.RGBA,e.UNSIGNED_BYTE,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),Pe=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),_o=Ke;for(const t of ft)t.tqR=t.tq0||null}},zn=()=>{if(!Pe)return;if(++Uo>6){e.deleteSync(Pe),Pe=null,Uo=0,e.bindBuffer(e.PIXEL_PACK_BUFFER,w0),e.bufferData(e.PIXEL_PACK_BUFFER,mt*4,e.STREAM_READ),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,Ia),e.readPixels(0,0,I,ot,e.RGBA,e.UNSIGNED_BYTE,Le),Ya(),Io();return}const t=e.clientWaitSync(Pe,0,0);t===e.TIMEOUT_EXPIRED||t===e.WAIT_FAILED||(e.deleteSync(Pe),Pe=null,Uo=0,e.bindBuffer(e.PIXEL_PACK_BUFFER,w0),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,Le),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),Ya(),Io())};if(x0){for(let t=0;t<120;t++)ja(!1);ao(!0),e.readPixels(0,0,I,ot,e.RGBA,e.UNSIGNED_BYTE,Le),Io()}if(Ye.set(St),$e.set(Nt),Qe.set(Tt),Co=A0=_o=Ke,$t&&x0){let t=0,o=0;for(let a=3;a<7;a++)for(let r=0;r<I;r++){const n=a*I+r;St[n]>.001&&ko(we+(r+.5)*xt)&&(t+=zt[n]+Xt[n]+St[n]+v0*(J+(a+.5)*xt-.25),o++)}o&&($t[8]=t/o)}let Vo=0,Go=0;const Ja=(t,o)=>{Vo=Y((t-we)/xt-.5,0,I-1.001),Go=Y((o-J)/xt-.5,0,ot-1.001)},t0=(t,o,a)=>{Ja(o,a);const r=Vo,n=Go,i=r|0,f=n|0,u=r-i,l=n-f,A=f*I+i;return(t[A]*(1-u)+t[A+1]*u)*(1-l)+(t[A+I]*(1-u)+t[A+I+1]*u)*l},ct={d:0,e:0,u:0,v:0,b:0},et=(t,o)=>{o<J+.08&&o>=J-.2&&(o=J+.08),Ja(t,o);const a=Vo,r=Go,n=a|0,i=r|0,f=a-n,u=r-i,l=i*I+n,A=(1-f)*(1-u),y=f*(1-u),N=(1-f)*u,C=f*u,W=l+1,T=l+I,H=l+I+1,Z=Ka,Q=Math.max(0,St[l]+(St[l]-Ye[l])*Z),q=Math.max(0,St[W]+(St[W]-Ye[W])*Z),G=Math.max(0,St[T]+(St[T]-Ye[T])*Z),at=Math.max(0,St[H]+(St[H]-Ye[H])*Z);ct.d=Q*A+q*y+G*N+at*C,ct.u=(Nt[l]+(Nt[l]-$e[l])*Z)*A+(Nt[W]+(Nt[W]-$e[W])*Z)*y+(Nt[T]+(Nt[T]-$e[T])*Z)*N+(Nt[H]+(Nt[H]-$e[H])*Z)*C,ct.v=(Tt[l]+(Tt[l]-Qe[l])*Z)*A+(Tt[W]+(Tt[W]-Qe[W])*Z)*y+(Tt[T]+(Tt[T]-Qe[T])*Z)*N+(Tt[H]+(Tt[H]-Qe[H])*Z)*C,ct.b=(zt[l]+Xt[l])*A+(zt[W]+Xt[W])*y+(zt[T]+Xt[T])*N+(zt[H]+Xt[H])*C;let nt=0,it=0;if(Q>8e-4&&(nt+=(zt[l]+Xt[l]+Q)*A,it+=A),q>8e-4&&(nt+=(zt[W]+Xt[W]+q)*y,it+=y),G>8e-4&&(nt+=(zt[T]+Xt[T]+G)*N,it+=N),at>8e-4&&(nt+=(zt[H]+Xt[H]+at)*C,it+=C),ct.e=it>.05?nt/it:ct.b+ct.d,Je&&ct.d>8e-4){const O=Oo(Je.tqB,t,o,ct.d)*(1+Z)-Oo(Je.tqA,t,o,ct.d)*Z-Oo(Je.tqN,t,o,ct.d);ct.d=Math.max(0,ct.d+O),ct.e+=O}return(t<we||t>ho||o<J-.2||o>Fe)&&(ct.d=0,ct.u=0,ct.v=0,ct.b=Be(t,o),ct.e=ct.b),ct},Oo=(t,o,a,r)=>{if(!t)return 0;const n=o-t[0],i=a-t[1],f=n*t[3]+i*t[2],u=n*t[2]-i*t[3],l=f*f*t[4]+u*u*t[5];return l>9?0:t[6]*Math.exp(-l)*Math.min(1,r/.007)},gn=t=>Ee===0?[.6,.59,.56]:Ee===1?[.88,.87,.84]:Ee===3?[.92,.6,.17]:Ee===4?[.55,.38,.2]:Ee===5?[.92,.92,.9]:ma[t%ma.length],ts=[.011,.008,.007,.0022,.013,.009][Ee],Jt=d==="Classic boats"?[0,0,0]:d==="Boats and hats"?[0,1,0,1,1]:d==="Flat-bottomed punts"?[3,3,3,0]:d==="A walnut-shell fleet"?[4,4,4,4,0]:[0,2,1,0,2],bn=[.075,.066,.07,.082,.05],ft=[];let M0=0,Pn=Math.floor(m()*7),kn=0;const F0=(t,o,a,r={})=>{if(ft.length>=22){let f=0,u=-1;ft.forEach((l,A)=>{const y=(l.out?50+l.z:0)+l.sunk*2+l.age*.01;y>u&&(u=y,f=A)}),ft.splice(f,1)}const n=et(o,a),i={ty:t,x:o,z:a,y:r.y??n.e-.004,vx:r.vx||n.u,vz:r.vz||n.v,yaw:r.yaw??c(-.6,.6,m),w:0,roll:0,pitch:0,rv:0,pv:0,vy:0,wet:r.wet||0,flood:0,sx:0,sz:0,svx:0,svz:0,sunk:0,lost:0,sc:bn[t]*(r.sc||1)*c(.92,1.08,m),col:r.col||gn(Pn++),seed:kn++*.618%1,age:0,cd:0,pin:0,eta:n.e,mode:0};return ft.push(i),i},es=g==="Ice and slush"?[[.85,.9,.97],[.9,.94,1],[.75,.84,.95]]:g==="Autumn leaves"?[[.55,.2,.04],[.72,.42,.07],[.4,.13,.04],[.78,.3,.05],[.42,.33,.1]]:g==="Cherry petals"?[[.96,.74,.8],[.98,.86,.88],[.9,.6,.7],[.97,.8,.84]]:[[.62,.46,.25],[.5,.36,.2],[.3,.2,.12],[.36,.26,.16]],An=g==="Autumn leaves"?[[.32,.14,.04],[.5,.3,.07]]:g==="Ice and slush"?[[.7,.75,.85],[.8,.85,.92]]:g==="Cherry petals"?[[.8,.58,.62],[.3,.2,.12]]:[[.3,.22,.13],[.2,.15,.1]],e0=()=>g==="Ice and slush"?12:g==="Autumn leaves"?5:g==="Cherry petals"?6:m()<.55?8:7,Mn=t=>t===12?c(.025,.06,m):t===5?c(.035,.06,m):t===6?c(.012,.017,m):t===8?c(.03,.04,m):c(.04,.08,m),Vt=[],fe=(t,o,a,r,n={})=>{if(Vt.length>=90){const f=Vt.findIndex(u=>u.st==="float"||u.st==="sunk");if(f<0)return null;Vt.splice(f,1)}const i={ty:t,x:o,z:a,y:0,yaw:c(0,Ot,m),roll:c(-.2,.2,m),pitch:c(-.15,.15,m),vx:0,vz:0,w:c(-.4,.4,m),sc:n.sc||Mn(t),col:n.col||(t===7?[[.24,.16,.1],[.3,.22,.14],[.2,.15,.11]][Math.floor(m()*3)]:es[Math.floor(m()*es.length)]),st:r,eta:-9,seed:m(),lost:0,age:0};return Vt.push(i),i},te=t=>{let o=ie,a=-1;for(let r=0;r<9;r++){const n=B+.02+(ht-.05)*r/8,i=et(n,t);i.d>a&&(a=i.d,o=n)}return o};for(let t=0;t<16;t++){const o=c(.3,2.6,m),a=m(),r=a<.35&&Se>0?c(B-.28,B-.02,m):a<.5&&Bt?c(B-.3,B-.02,m):c(B+ht+.01,B+ht+.6,m),n=e0(),i=fe(n,r,o,"dry");if(i){const f=et(r,o);f.d>.002&&o<Fe&&(i.st="sunk"),i.y=(f.d>.002?f.b:Be(r,o))+.001}}for(let t=0;t<9;t++){const o=c(.3,X-.1,m),a=te(o)+c(-.04,.04,m);fe(e0(),a,o,m()<.3?"sunk":"float")}const le=fe(9,B+ht+c(0,.05,m),c(.55,1.2,m),"dry",{sc:.03,col:m()<.5?[.34,.34,.36]:[.42,.32,.15]});le&&(le.roll=0,le.pitch=0,et(le.x,le.z).d>.004&&(le.st="float"),le.y=Be(le.x,le.z));const Fn=s.home?3:2+Math.floor(m()*2),Rn=s.home?[.42,.56,.72]:[c(.42,.52,m),c(.56,.72,m),c(.76,.98,m)];for(let t=0;t<(Pt?1:Fn);t++){const o=Pt?c(.5,.62,m):Rn[t],a=te(o)+(Pt?0:c(-.05,.05,m)),r=s.home?[0,0,0][t]:Pt?0:Jt[M0++%Jt.length],n=et(a,o);F0(r,a,o,{y:n.e-.006,wet:s.home?[.05,.25,.5][t]:c(0,.6,m),yaw:c(-.8,.8,m)+(t===1&&s.home?.9:0),sc:Pt?1.75:void 0})}if(ut==="A flotilla"){const t=6+Math.floor(V()*4);let o=0;for(const a of[.5,.8,1.1])o+=et(te(a),a).v*1.1/3;for(let a=0;a<t;a++){const r=.42+(X-.7)*Math.pow((a+.2+V()*.6)/t,1.2),n=B+.03+(ht-.06)*(.15+.7*V()),i=et(n,r),f=F0(Jt[M0++%Jt.length],n,r,{y:i.e-.006,wet:V()*.5,yaw:(V()-.5)*1.8});if(o>.03){const u=r-o*3.3;if(u>=J+.08){const l=et(n,u);f.z=u,f.y=l.e-.006,f.vx=l.u,f.vz=l.v}else f.in=1,f.inT=(J-.13-u)/Math.max(o,.14),f.z=J-.13,f.vx=0,f.vz=Math.max(o,.14)}}}let ee=0;if(dt==="Looking down"){for(const t of[.4,.6,.8])ee+=et(te(t),t).v*1.1/3;if(ee>.04&&ee<=.16){const t=Math.max(J+.09,.84-ee*4),o=te(t)+c(-.03,.03,m),a=et(o,t);if(Pt&&ft[0]){const r=ft[0];r.x=o,r.z=t,r.y=a.e-.006,r.vx=a.u,r.vz=a.v}else F0(Jt[M0++%Jt.length],o,t,{y:a.e-.006,wet:c(0,.4,m),yaw:c(-.5,.5,m)})}if(ee>.04)for(let t=0;t<6;t++){const o=Math.max(J+.04,.8+c(-.16,.16,m)-ee*c(3,5,m)),a=te(o)+c(-.05,.05,m),r=fe(e0(),a,o,"float");if(r){const n=et(a,o);r.vx=n.u,r.vz=n.v}}}if(s.home&&fe(5,B+.1,.672,"float"),dt!=="Looking down")for(const t of[1,1.9,2.7,3.3]){const o=fe(e0(),te(.3)+c(-.05,.05,m),J+.03,"float");if(o){const a=et(o.x,o.z);o.vx=0,o.vz=Math.max(a.v,.08),o.z=J+.04-o.vz*t,o.in=1}}const Zt=(()=>{const o=[];let a=12345+(zo&1023),r=0,n=0,i=0,f=0,u=0,l=0,A=0,y=0,N=c(6,14,m);const C=()=>(a=a*1103515245+12345&2147483647,a/1073741823-1),W=()=>{const T=[];let H=0;const Z=4+Math.floor(F()*4),Q=c(1500,2100);for(let G=0;G<Z;G++){const at=c(.09,.3);T.push([H,at,Q*c(.8,1.45),Q*c(.75,1.5),c(5,9)]),H+=at+c(.04,.12)}const q=2+Math.floor(F()*5);for(let G=0;G<q;G++)T.push([H,.035,c(3400,4800),c(3e3,5200),0]),H+=.05;return{k:"bird",t:0,notes:T,dur:H+.1,ph:0,v:.5,pan:c(-.7,.7)}};return{ev(T,H,Z,Q){!s.sound.on||o.length>16||o.push(T==="bird"?W():{k:T,t:0,v:H||.5,pan:Z||0,f:Q||1,ph:0,b1:0})},set(T,H,Z){u=T,A=H,y=Z},run(T){if(!s.sound.on){o.length=0;return}N-=T*(tt>.2?0:1),N<0&&(N=c(14,34),(!It||F()<.3)&&this.ev("bird")),F()<A*T&&this.ev("bub",c(.2,.5),c(-.5,.5),c(.7,1.6)),F()<y*T&&this.ev("glug",c(.4,.8),-.3,c(.8,1.25));const H=Math.round(T*16e3);if(H<=0)return;const Z=new Float32Array(H);for(let Q=0;Q<H;Q++){f+=(u-f)*4e-4,l+=(tt-l)*4e-4;const q=C();r+=(q-r)*.3,n+=(r-n)*.3;const G=r-n;i+=(q-i)*.08;let at=G*f*.5*(.7+.3*Math.sin(Q*.002+i*3));l>.02&&(C()>1-l*.06&&(at+=C()*.25*l),at+=(q-r)*l*.05),Z[Q]=at}for(let Q=o.length-1;Q>=0;Q--){const q=o[Q];let G=.2;for(let at=0;at<H;at++){const nt=q.t+at/16e3;let it=0;if(q.k==="bub"){G=.05/q.f;const O=nt/G,lt=520*q.f*(1+.9*O);q.ph+=lt/16e3,it=Math.sin(q.ph*Ot)*Math.exp(-O*4)*.22*Math.min(1,O*20)}else if(q.k==="glug"){G=.22;const O=nt/G,lt=(O<.45?170:240)*q.f*(1+.4*(O%.45));q.ph+=lt/16e3,it=Math.sin(q.ph*Ot)*Math.exp(-(O%.45)*6)*.3+C()*Math.exp(-O*9)*.03}else if(q.k==="plop"){G=.14;const O=nt/G;q.ph+=(650-380*O)/16e3,it=Math.sin(q.ph*Ot)*Math.exp(-O*5)*.22+C()*Math.exp(-O*14)*.05}else if(q.k==="pat"){G=.05;const O=nt/G;q.b1+=(C()-q.b1)*.4,it=q.b1*Math.exp(-O*8)*.3}else if(q.k==="splash"){G=.35;const O=nt/G;q.b1+=(C()-q.b1)*.25,it=q.b1*Math.exp(-O*5)*Math.min(1,O*30)*.4}else if(q.k==="bird"){G=q.dur;let O=0,lt=0;for(const Mt of q.notes)if(nt>=Mt[0]&&nt<Mt[0]+Mt[1]){const he=(nt-Mt[0])/Mt[1];O=Mt[2]+(Mt[3]-Mt[2])*he+(Mt[4]?Math.sin(nt*Ot*Mt[4])*40:0),lt=Math.sin(Math.PI*he)**.7;break}q.ph+=O/16e3,it=(Math.sin(q.ph*Ot)+.12*Math.sin(q.ph*Ot*2))*lt*.09}Z[at]+=it*q.v}q.t+=H/16e3,q.t>G&&o.splice(Q,1)}s.sound.pcm(Z,16e3,{vel:1})}}})();let Ue=(s.home?1.5:c(2,6,m))*(Oe>1?6:Oe<1?.3:1),so=0,R0=c(70,110,m),os=-99,no=0;ee>.16&&(Ue=Math.max(.2,3.9-.7/ee));const En=(Pt?2:ut==="A flotilla"?10:6)-(vt===2&&!Pt?1:0)+(Ht[dt].home?0:Pt?1:4),Sn=Pt?1:ut==="A flotilla"?4:3,Ho=Ht[dt].home?5.2:Fe-.03,as=t=>{const o=J+.08,a=te(.3)+c(-.03,.03,m),r=x==="A fleet from upstream"&&t?0:Jt[M0++%Jt.length],n=et(a,o),i=F0(r,a,o,{y:n.e-.004,sc:t||1,yaw:c(-.4,.4,m)});i.vz=Math.max(n.v,.14),i.vx=0,i.z=J-.13,i.in=1},Wo=[[0,.46,.12],[0,-.46,.12],[-.19,.2,.12],[.19,.2,.12],[-.19,-.2,.12],[.19,-.2,.12],[0,0,.28]],Bn=(t,o)=>{if(vt===0){if(Math.abs(t.x-B-.1)<.085&&Math.abs(t.z-X)<.15)return 1}else if(vt===1){if(t.x<B+.035&&Math.abs(t.z-X)<.13)return 2}else if(t.z>X-.05&&Math.abs(t.x-m0)<.075)return 3;return 0};let jo=.06;const io=(t,o,a,r,n,i,f,u)=>{const l=Math.min(i*.85,.0015);t.x+=r*l,t.z+=n*l;const A=t.vx+t.w*a,y=t.vz-t.w*o,N=A*r+y*n;if(N>=0)return 0;const C=a*r-o*n,W=-1.18*N/(1+C*C/u),T=Math.min(W,jo);t.vx+=T*r,t.vz+=T*n,t.w+=T*C/u;const H=-n,Z=r,Q=a*H-o*Z,q=A*H+y*Z,G=Y(-q/(1+Q*Q/u),-f*T,f*T);return t.vx+=G*H,t.vz+=G*Z,t.w+=G*Q/u,t.hc>0||W<.05?0:(t.hc=.25,W)},ss=1.18,Nn=(t,o)=>{if(t.age+=o,t.cd-=o,t.hc=(t.hc||0)-o,t.in){if(t.inT>0){t.inT-=o;return}const st=et(t.x,J+.08);t.z+=t.vz*o,t.y=st.e-t.sc*.046*(1+t.wet*.45),t.eta=st.e,t.z>=J-.125&&(t.in=0,t.arr=1);return}if(t.out){t.z+=t.vz*o,t.x+=(ie+.02-t.x)*o*.15,t.y+=(Be(t.x,t.z)+.003-t.y)*Math.min(1,o*4),t.eta=t.y-.002,t.yaw+=t.w*o,t.w*=.98,t.pitch*=.97,t.mode!==2&&(t.roll*=.99);return}const a=t.sc,r=Math.cos(t.yaw),n=Math.sin(t.yaw);if(t.mode===2){const st=et(t.x,t.z);t.vx+=(st.u*.15-t.vx)*o*2,t.vz+=(st.v*.15-t.vz)*o*2,t.x+=t.vx*o,t.z+=t.vz*o,t.y+=(st.b+.001-t.y)*Math.min(1,o*3),t.eta=st.e,t.pitch*=.98,t.roll*=.98,vt===2?t.go?(t.x+=(m0-t.x)*o*2,t.z+=o*.04,t.z>X-.004&&(t.gone=1)):t.z>X-.03&&(t.z=X-.03,t.vz=0):(t.go||t.z>X+.16)&&(t.vz=Math.max(t.vz,.07)),(Se>0||Bt)&&t.x<B+.3*a&&(t.x=B+.3*a);return}const i=Math.sin(t.pitch),f=Math.sin(t.roll);t.tqN=[t.x,t.z,r,n,1/(.5*a)**2,1/(.22*a)**2,t.tq0?Wa*a*.055*(1+t.wet*.45+t.flood*3)*(1-t.sunk):0],Je=t;const u=a*.046,l=1+t.wet*.45+t.flood*3,A=u*l,y=a*.17,N=(.3*a)**2,C=(.17*a)**2;let W=0,T=0,H=0,Z=0,Q=0,q=0,G=0,at=0,nt=-9,it=0,O=0,lt=0,Mt=0,he=0,T0=0,q0=0,D0=0;for(let st=0;st<7;st++){const Ut=Wo[st][0]*a,Ft=Wo[st][1]*a,pt=Wo[st][2],pe=Ut*r+Ft*n,xe=-Ut*n+Ft*r,_t=et(t.x+pe,t.z+xe),de=t.y-Ft*i+Ut*f,ye=t.vx+t.w*xe,s0=t.vz-t.w*pe;nt=Math.max(nt,_t.b),_t.d>8e-4&&(G+=_t.e,at++);const Kt=_t.d>8e-4?Y(_t.e-de,0,y):0,n0=9.81*pt*Kt/A;Z+=n0,Q-=n0*Ft,q+=n0*Ut,Kt>0&&(he+=pt);let Ie=0,vo=0;if(Kt>2e-4){const Ae=_t.u*ss-ye,Me=_t.v*ss-s0,_0=n*Ae+r*Me,Jo=r*Ae-n*Me,C0=Math.hypot(Ae,Me),ds=Math.min(1.2,Kt/(A*.8)),ys=1.1*(.2+C0)*ds,ws=11*(.2+C0)*ds;Ie=(n*ys*_0+r*ws*Jo)*pt,vo=(r*ys*_0-n*ws*Jo)*pt,lt=Math.max(lt,C0),Mt+=Jo*pt;const zs=Kt+C0*C0/19.6;zs>y*.58&&(it+=pt*(zs-y*.58))}const xs=_t.b+6e-4-de;if(xs>0){O++;const Ae=Math.min(40,xs*5200)*pt;Z+=Ae,Q-=Ae*Ft,q+=Ae*Ut,T0+=pt,q0+=pt*Ft*Ft,D0+=pt*Ut*Ut;const Me=Math.hypot(ye,s0),_0=Math.min((_t.d>.0015?.14:.55)*Ae,Me*34*pt);Me>1e-4&&(Ie-=ye/Me*_0,vo-=s0/Me*_0)}W+=Ie,T+=vo,H+=xe*Ie-pe*vo}Je=null;const Ko=et(t.x,t.z).e,co=et(t.x+n*.4*a,t.z+r*.4*a).e,fo=et(t.x-n*.4*a,t.z-r*.4*a).e,L0=et(t.x+r*.2*a,t.z-n*.2*a).e,U0=et(t.x-r*.2*a,t.z+n*.2*a).e,lo=Y((co-fo)/(.8*a),-.6,.6),uo=Y((L0-U0)/(.4*a),-.6,.6);W-=9.81*.5*(lo*n+uo*r),T-=9.81*.5*(lo*r-uo*n),t.vx+=W/l*o,t.vz+=T/l*o,t.w+=H/(N*l)*o,t.w*=Math.exp(-o*(1.2+O*1.5)),t.w=Y(t.w,-9,9);const ke=Math.hypot(t.vx,t.vz);ke>1.4&&(t.vx*=1.4/ke,t.vz*=1.4/ke),t.x+=t.vx*o,t.z+=t.vz*o,t.yaw+=t.w*o,t.z<J+.05?(t.arr||(t.z=J+.05),t.vz=Math.max(t.vz,.08)):t.arr=0,t.flood>.01&&(t.svx+=(-f*26-t.sx*34-t.svx*3.2)*o,t.sx=Y(t.sx+t.svx*o,-1,1),t.svz+=(i*16-t.sz*24-t.svz*2.6)*o,t.sz=Y(t.sz+t.svz*o,-1,1),q-=t.sx*9.81*t.flood*.5*.2*a,Q+=t.sz*9.81*t.flood*.4*.35*a),t.held=Math.max(0,(t.held||0)-o),(O||t.held>0)&&(q-=Y(Mt*.8,-.28,.28));const Gt=1+4*Math.min(1,he),Yo=Math.sqrt(9.81/(A*Gt))*Math.min(1,he)*1.4,$o=400/Gt;t.vy=(t.vy+(Z-9.81)/Gt*o)/(1+(Yo+(O?13:0)+$o*T0)*o),t.y+=t.vy*o,t.y<nt-.004&&(t.y=nt-.004,t.vy=Math.max(t.vy,0)),t.pv=(t.pv+Q/(N*Gt)*o)/(1+(Yo*.88+O*3+$o*q0/N)*o),t.pitch=Y(t.pitch+t.pv*o,-1,1),t.rv=(t.rv+q/(C*Gt)*o)/(1+(Yo*.77+O*3+$o*D0/C)*o),t.roll=Y(t.roll+t.rv*o,-1.25,1.25),(t.pitch===1||t.pitch===-1)&&(t.pv=0),Math.abs(t.roll)>=1.25&&(t.rv=0,t.flood=Math.min(1,t.flood+o*.8),t.wet=Math.min(1,t.wet+o*.4));const In=at?G/at:nt;t.eta=In,(Math.abs(t.pv)>3||it>8e-4)&&t.cd<=0&&(t.cd=.7,Zt.ev("splash",.2+Math.min(.4,Math.abs(t.pv)*.05+it*60),Y((t.x-.05)*3,-.8,.8)));for(let st=-1;st<=1;st++){const Ut=st*.33*a,Ft=(st?.13:.2)*a,pt=Ut*n,pe=Ut*r,xe=t.x+pt,_t=t.z+pe;if(Se>0||Bt){const de=B+.006+Ft-xe;if(de>0){const ye=io(t,pt,pe,1,0,de,.25,N);ye>.05&&Zt.ev("pat",Math.min(.5,ye*2),-.6)}}xe>ho-Ft&&io(t,pt,pe,-1,0,xe-ho+Ft,.2,N),vt===2&&_t>X-.018-Ft&&io(t,pt,pe,0,-1,_t-X+.018+Ft,.3,N);for(const de of Rt){const ye=xe-de[0],s0=_t-de[1],Kt=Math.hypot(ye,s0),n0=Ft+de[2]*.9;if(Kt<n0&&Kt>1e-4){t.held=.25;const Ie=io(t,pt,pe,ye/Kt,s0/Kt,n0-Kt,.35,N);Ie>.08&&Zt.ev("pat",Math.min(.6,Ie*2.5),Y((xe-.05)*3,-.8,.8))}}}t.wet=Math.min(1,t.wet+o*ts*(1+tt*2.5+Math.min(2,Math.abs(t.rv)*.25)+t.flood*3)),t.flood=Math.min(1,t.flood+o*(it*62+tt*.045+(t.wet>.6?(t.wet-.6)*.1:0)+lt*lt*.012)),(A>y*.92||t.flood>.86)&&(t.sunk=Math.min(1,t.sunk+o*.22),t.sunk>=1&&(t.mode=2,Zt.ev("glug",.3,0,1.4))),t.free=Math.max(0,(t.free||0)-o);let me=0,Qo=1;if(t.free<=0&&!t.go){const st=et(t.x,t.z);vt===0?Math.abs(t.x-B-.1)<.1+.15*a&&t.z>X-.16-.2*a&&t.z<X+.17&&(me=Y(1-(st.d-.005)/.007,0,1)):vt===1?t.x<B+.035+.3*a&&Math.abs(t.z-X)<.13&&(me=Y(-st.u/.05,0,1)*Y(1.7-Math.abs(st.v)/.3,0,1),Qo=0):t.z>X-.03-.55*a&&(me=Y(1.5-Math.abs(t.x-m0)/.1,.25,1))}if(me>.02){t.lodge=(t.lodge||0)+o*me;const st=Math.exp(-o*7*me);t.vx*=st,t.vz*=st;const Ut=t.seed>.5?1:-1,Ft=t.seed*7.31%1<.38?1:0,pt=Math.min(1,t.lodge*.3);t.w+=o*me*((Qo?2.4:-2.4)*Math.sin(2*t.yaw)+.25*Ut*(1-pt)),t.roll+=(Ut*(Ft?1.12:.2)*pt-t.roll)*(1-Math.exp(-o*1.6*me)),t.wet=Math.min(1,t.wet+o*ts*3*me),t.wet>.85&&(t.sag=Math.min(.8,(t.sag||0)+o*.07)),!Qo&&t.lodge>9+30*(t.seed*3.71%1)&&(t.free=5,t.lodge=0)}else t.lodge>1&&t.free<=0&&!t.go?(t.free=3,t.lodge=0):!t.go&&t.free<=0&&(t.lodge=0);vt!==2&&(t.go||t.z>X+.16)&&(t.vz=Math.max(t.vz,.07),t.go&&(t.sag=Math.min(.8,(t.sag||0)+o*.1)))},Tn=(t,o)=>{const a=t.sc,r=o.sc,n=Math.cos(t.yaw),i=Math.sin(t.yaw),f=Math.cos(o.yaw),u=Math.sin(o.yaw);for(let l=-1;l<=1;l++)for(let A=-1;A<=1;A++){const y=l*.33*a,N=A*.33*r,C=(l?.13:.2)*a,W=(A?.13:.2)*r,T=t.x+y*i,H=t.z+y*n,Z=o.x+N*u,Q=o.z+N*f;let q=Z-T,G=Q-H,at=Math.hypot(q,G),nt=C+W;if(at>=nt||at<1e-5)continue;q/=at,G/=at;const it=Math.min((nt-at)*.5,75e-5),O=1+t.flood*3,lt=1+o.flood*3,Mt=lt/(O+lt),he=O/(O+lt);t.x-=q*it*Mt*2,t.z-=G*it*Mt*2,o.x+=q*it*he*2,o.z+=G*it*he*2;const T0=y*i,q0=y*n,D0=N*u,Ko=N*f,co=(.3*a)**2,fo=(.3*r)**2,L0=q0*q-T0*G,U0=Ko*q-D0*G,lo=(t.vx+t.w*q0)*q+(t.vz-t.w*T0)*G,uo=(o.vx+o.w*Ko)*q+(o.vz-o.w*D0)*G,ke=uo-lo;if(ke<0){const Gt=Math.min(-1.2*ke/(1/O+1/lt+L0*L0/(co*O)+U0*U0/(fo*lt)),jo*Math.min(O,lt));t.vx-=Gt*q/O,t.vz-=Gt*G/O,t.w-=Gt*L0/(co*O),o.vx+=Gt*q/lt,o.vz+=Gt*G/lt,o.w+=Gt*U0/(fo*lt),-ke>.08&&Zt.ev("pat",Math.min(.5,-ke),Y((t.x-.05)*3,-.8,.8))}}},qn=(t,o)=>{if(t.st==="dry")return;if(t.in){const r=et(t.x,J+.04);t.z+=t.vz*o,t.y=Math.max(r.e,r.b)+3e-4,t.eta=r.e,t.dep=r.d,t.z>=J+.04&&(t.in=0);return}const a=et(t.x,t.z);if(t.age+=o,t.st==="dam")if(t.age>.6&&(a.b-t0(zt,t.x,t.z)<.003||t0(Xt,t.x,t.z)<.0025))t.st="float";else{t.y=a.b+.001,t.eta=-9;return}if(t.st==="float"){a.d<.0012?(t.vx*=Math.exp(-o*8),t.vz*=Math.exp(-o*8)):(t.vx+=(a.u-t.vx)*o*3,t.vz+=(a.v-t.vz)*o*3);let r=0;if(t.ty!==6)for(const i of Rt){const f=t.x-i[0],u=t.z-i[1],l=f*f+u*u,A=i[2]*.85+t.sc*.3;if(l<A*A&&l>1e-8){const y=Math.sqrt(l),N=f/y,C=u/y,W=t.vx*N+t.vz*C;t.x+=N*(A-y),t.z+=C*(A-y),W<0&&(t.vx-=W*N,t.vz-=W*C);const T=Math.exp(-o*5);t.vx*=T,t.vz*=T,r=1}}t.snag=r&&a.d>.002&&Math.hypot(a.u-t.vx,a.v-t.vz)>.04?Math.min(1,(t.snag||0)+o*2):Math.max(0,(t.snag||0)-o*2);const n=(t0(Tt,t.x+xt,t.z)-t0(Tt,t.x-xt,t.z)-t0(Nt,t.x,t.z+xt)+t0(Nt,t.x,t.z-xt))/(2*xt);t.x+=t.vx*o,t.z+=t.vz*o,t.yaw+=(t.w*(.3+Math.hypot(t.vx,t.vz)*3)+n*.45)*o,t.x<B+.01&&(t.x=B+.01,t.vx=Math.abs(t.vx)*.3),t.y=Math.max(a.e,a.b)+(t.ty===9?-.002:t.ty===5?3e-4:-5e-4),t.eta=a.e,t.dep=a.d,t.roll*=.995,t.pitch*=.995,tt>.3&&m()<o*.02*tt&&t.ty!==9&&(t.st="sunk")}else t.st==="sunk"&&(t.vx+=(a.u*.12-t.vx)*o,t.vz+=(a.v*.12-t.vz)*o,t.x+=t.vx*o,t.z+=t.vz*o,t.y=a.b+8e-4,t.eta=a.e);t.ty===5||t.ty===9||t.ty===12?vt===2?t.z>X-.022&&(t.z=X-.022,t.vz=Math.min(t.vz,0)):t.st==="float"&&(t.go||t.z>X+.16)&&(t.vz=Math.max(t.vz,.07)):Bn(t,o)&&(t.lost+=o*.6),t.lost>0&&(t.lost+=o*.5,t.y-=o*.04)},ns=()=>{ce=0;for(const t of ft){if(t.tq0=null,ce>=12||t.mode===2||t.out||t.in)continue;const o=ce*12,a=Math.cos(t.yaw),r=Math.sin(t.yaw),n=t.sc,i=(.5*n)**2,f=(.22*n)**2;rt[o]=t.x,rt[o+1]=t.z,rt[o+2]=a,rt[o+3]=r,rt[o+4]=1/i,rt[o+5]=1/f,rt[o+6]=Wa*n*.055*(1+t.wet*.45+t.flood*3)*(1-t.sunk),rt[o+8]=t.vx,rt[o+9]=t.vz,ce++,t.tq0=[t.x,t.z,a,r,1/i,1/f,rt[o+6]]}for(const t of Vt){if(ce>=12)break;if(t.st!=="float"||!(t.snag>.2))continue;const o=ce*12,a=(t.sc*.5)**2;rt[o]=t.x,rt[o+1]=t.z,rt[o+2]=Math.cos(t.yaw),rt[o+3]=Math.sin(t.yaw),rt[o+4]=1/a,rt[o+5]=2.2/a,rt[o+6]=.0016*t.snag,rt[o+8]=0,rt[o+9]=0,ce++}},is=t=>{const o=Math.min(6,Math.max(1,Math.ceil(t/.016666666666666666-.01))),a=t/o;ns();for(let n=0;n<o;n++){jo=3.6*a,Ka=Y((Ke-t+(n+1)*a-A0)/Math.max(A0-Co,De),0,1);for(const i of ft)Nn(i,a);for(let i=0;i<ft.length;i++)for(let f=i+1;f<ft.length;f++){const u=ft[i],l=ft[f];if(u.mode===2||l.mode===2||u.out||l.out||u.in||l.in)continue;const A=l.x-u.x,y=l.z-u.z;A*A+y*y<(u.sc+l.sc)**2&&Tn(u,l)}for(const i of Vt)if(qn(i,a),i.st==="float")for(const f of ft){if(f.mode===2)continue;const u=i.x-f.x,l=i.z-f.z,A=f.sc*.42,y=u*u+l*l;if(y<A*A&&y>1e-6){const N=Math.sqrt(y);i.x+=u/N*(A-N),i.z+=l/N*(A-N),i.vx+=u/N*a*2+(f.vx-i.vx)*a*2,i.vz+=l/N*a*2+(f.vz-i.vz)*a*2}}}for(let n=ft.length-1;n>=0;n--){const i=ft[n];!i.out&&i.z>Fe-.03&&Ho>Fe&&(i.out=1,i.vz=Math.max(i.vz,.2)),(i.gone||i.z>Ho||i.z<J-.2)&&ft.splice(n,1)}for(let n=Vt.length-1;n>=0;n--){const i=Vt[n];(i.lost>=1||i.z>(i.ty===5||i.ty===9||i.ty===12?Ho:Fe)+.05)&&Vt.splice(n,1)}{let n=0,i=null,f=0,u=null;for(const y of ft)y.out||y.go||(y.mode===2?Math.abs(y.z-X)<.3&&(vt===2?(f++,(!u||y.age>u.age)&&(u=y)):(n++,(!i||y.age>i.age)&&(i=y))):y.lodge>1.5&&(n++,(!i||y.age>i.age)&&(i=y)));vt!==2&&n>Sn&&i&&(i.go=1,i.lodge=0),f>5&&u&&(u.go=1);let l=0,A=null;if(vt===0)for(const y of Vt)y.st!=="float"||y.go||y.in||!(y.ty===5||y.ty===9||y.ty===12)||Math.abs(y.z-X)<.2&&y.vz<.02&&Math.abs(y.x-B-.1)<.12&&(l++,(!A||y.age>A.age)&&(A=y));l>4&&A&&(A.go=1)}let r=0;for(const n of Vt)n.st==="float"&&r++;if(r<(ee>.04?11:7)&&m()<t*(ee>.04?1.5:.6)){const n=fe(e0(),te(.3)+c(-.05,.05,m),J+.03,"float");if(n){const i=et(n.x,n.z);n.vx=0,n.vz=Math.max(i.v,.08),n.z=J-.11,n.in=1}}};let E0=!1,qt=null,S0=0,ue=[0,0],rs=[0,0],Xo=!1,_e=null;const B0=(t,o)=>{const a=Ys(t,o);let r=-.01,n=0,i=0;for(let f=0;f<4;f++){const u=(Yt[1]-r)/Math.max(-a[1],.01);n=Yt[0]+a[0]*u,i=Yt[2]+a[2]*u;const l=et(n,i);r=Math.max(l.e,l.b)}return[n,i]},cs=(t,o)=>{let[a,r]=B0(t,o);r=Y(r,J+.05,Fe-.1),(et(a,r).d<.003||a<B)&&(a=te(r));const i=Jt[M0++%Jt.length],f=F0(i,a,r,{yaw:c(-.5,.5,m)});f.vx=0,f.vz=0,Zt.ev("plop",.5,Y((a-.05)*3,-.8,.8))},Dn=(t,o)=>{const a=s.input,r=a.taps?a.taps():[];if(Lt.s=0,b0.length=0,a.down&&a.inside)if(os=t,!E0)E0=!0,qt=null,S0=t,ue=[a.x,a.y],rs=[a.x,a.y],Xo=!0,_e=B0(a.x,a.y);else{if(qt!=="hold"&&Math.hypot(a.x-ue[0],a.y-ue[1])>.03&&!qt){const n=B0(ue[0],ue[1]),i=B0(a.x,a.y);qt=!(Math.hypot(i[0]-n[0],i[1]-n[1])/Math.max(t-S0,.02)>.32||Math.hypot(a.x-ue[0],a.y-ue[1])/Math.max(t-S0,.02)>1.1)&&Math.abs(i[0]-n[0])>Math.abs(i[1]-n[1])*.7?"dam":"carve",_e=n}if(!qt&&t-S0>.35&&(qt="hold"),qt==="dam"||qt==="carve"){const n=B0(a.x,a.y),i=n[0]-_e[0],f=n[1]-_e[1],u=Math.hypot(i,f),l=Math.min(8,Math.floor(u/.012));if(l>0){for(let A=1;A<=l;A++){const y=_e[0]+i*A/l,N=_e[1]+f*A/l;if(qt==="dam"){b0.push([y,N,.024,.016]);for(let C=0;C<2;C++){const W=fe(e0(),y+c(-.012,.012,m),N+c(-.012,.012,m),"dam");W&&(W.y=Be(W.x,W.z)+.02)}if(m()<.3){const C=fe(7,y,N,"dam",{sc:c(.04,.08,m)});C&&(C.y=Be(C.x,C.z)+.02,C.yaw=Math.atan2(i,f)+Math.PI/2+c(-.5,.5,m))}}else b0.push([y,N,.017,-.012])}qt==="carve"&&u>.002&&(Lt.x=n[0],Lt.z=n[1],Lt.r=.05,Lt.dx=i/u,Lt.dz=f/u,Lt.s=.0045*Math.min(1.4,u/o/.5)),_e=n,qt==="dam"&&(t*10|0)%2===0&&Zt.ev("pat",.2,0)}}qt==="hold"&&(K0=1),rs=[a.x,a.y]}else if(E0)!qt&&t-S0<.4&&cs(ue[0],ue[1]),E0=!1,qt=null,K0=_;else if(r.length&&!Xo)for(const n of r)cs(n.x,n.y);if(a.down||(Xo=!1),Ue-=o,Ue<0){let n=0;for(const i of ft)!i.out&&i.mode!==2&&n++;n>=En&&(Ue=c(1.5,4,m))}if(Ue<0)if(x==="A fleet from upstream")so<=0&&(so=3+Math.floor(m()*4)),as(.55),so--,Ue=so>0?c(.5,1.1,m):c(6,11,m);else{as();const n=m();Ue=(2.5+19*n*n)*Oe}t-os>25&&!E0&&(R0-=o,R0<0&&(K0=R0>-7?.8:_,R0<-7&&(R0=c(80,130,m)))),tt+=Y(K0-tt,-o*.12,o*.5),tt>.05?p0=Math.min(1,p0+o*tt*.2):p0=Math.max(.3,p0-o*.0025*(kt===1?.3:1)),no>.4&&tt<.1&&(Zt.ev("bird"),no=0),no=Math.max(no,tt)},gt=new Float32Array(160*16);let oe=0,Zo=0,o0=0;const fs=(t,o,a,r,n,i,f,u,l,A,y,N,C,W)=>{if(oe>=160)return;const T=oe*16;gt[T]=t,gt[T+1]=o,gt[T+2]=a,gt[T+3]=r,gt[T+4]=n,gt[T+5]=i,gt[T+6]=f,gt[T+7]=u,gt[T+8]=l[0],gt[T+9]=l[1],gt[T+10]=l[2],gt[T+11]=A,gt[T+12]=y,gt[T+13]=N,gt[T+14]=C,gt[T+15]=W,oe++},Ln=()=>{oe=0;for(const t of ft)fs(t.x,t.y,t.z,t.yaw,t.roll,t.pitch,t.sc,Math.min(t.wet,1)*.99+Math.floor((t.sag||0)*100),t.col,t.ty,t.eta,t.mode===2?1:t.sunk,t.seed,Ee);o0=oe;for(const t of Vt)fs(t.x,t.y,t.z,t.yaw,t.roll,t.pitch,t.sc,.495,t.col,t.ty,t.st==="float"||t.st==="sunk"?t.eta:-9,t.st==="sunk"?1:0,t.seed,t.dep||0);Zo=oe},Un=288,Ce=new Float32Array(32),ls=new Float32Array(32),_n=new Float32Array(96),us=new Float32Array(16);Ce.set(Ks,0),Ce.set([Yt[0],Yt[1],Yt[2],0],24);const N0=t=>{const o=K.mesh;if(Ce[16]=R.L[0],Ce[17]=R.L[1],Ce[18]=R.L[2],Ce[20]=t,e.useProgram(o.p),e.uniform4fv(o.u.uP,Ce),e.uniform4fv(o.u.uQ,ls),$(0,K.meshT),$(3,K.noiseT),e.bindVertexArray(Do),e.bindBuffer(e.ARRAY_BUFFER,eo),o0&&t!==4){for(let a=0;a<4;a++)e.vertexAttribPointer(a,4,e.FLOAT,!1,64,a*16);e.drawArraysInstanced(e.TRIANGLES,0,gs,o0)}if(Zo>o0){for(let a=0;a<4;a++)e.vertexAttribPointer(a,4,e.FLOAT,!1,64,o0*64+a*16);e.drawArraysInstanced(e.TRIANGLES,0,Un,Zo-o0)}},a0=An,ve=[[[.3,.28,.25],[.34,.33,.31],[.23,.225,.22]],[[.34,.33,.32],[.36,.35,.34],[.28,.27,.26]],[[.4,.17,.1],[.36,.16,.1],[.3,.3,.32]],[[.36,.33,.28],[.5,.43,.32],[.5,.43,.32]],[[.1,.098,.105],[.34,.32,.29],[.3,.29,.28]]][se],ro=[[.22,.2,.16,.2],[.3,.24,.16,.25],[.42,.28,.14,.75],[.2,.26,.26,.08]][Re],Cn=(s.home?.95:c(.8,1.15,m))*(Ht[dt].fd||1),vs=[.7,1,1.8,.6][Re],hs=t=>{Ln(),e.bindBuffer(e.ARRAY_BUFFER,eo),e.bufferData(e.ARRAY_BUFFER,gt.subarray(0,Math.max(1,oe)*16),e.DYNAMIC_DRAW),ls.set([R.sunC[0],R.sunC[1],R.sunC[2],We,R.amb[0],R.amb[1],R.amb[2],0,R.skyH[0],R.skyH[1],R.skyH[2],0,R.skyZ[0],R.skyZ[1],R.skyZ[2],0,R.lampP[0],R.lampP[1],R.lampP[2],R.lampI,R.lampC[0],R.lampC[1],R.lampC[2],It?1:0]),Xe(),e.bindFramebuffer(e.FRAMEBUFFER,pn),e.viewport(0,0,to,to),e.clearColor(1,1,1,1),e.clear(e.COLOR_BUFFER_BIT),oe&&!It&&(e.enable(e.BLEND),e.blendEquation(e.MIN),e.blendFunc(e.ONE,e.ONE),N0(2),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND)),e.bindFramebuffer(e.FRAMEBUFFER,mn),e.viewport(0,0,je,je),e.clearColor(0,0,0,0),e.depthMask(!0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),oe&&(e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),N0(1),e.disable(e.DEPTH_TEST)),e.depthMask(!1);const o=ka||re.comp,a=_n;a.set([Yt[0],Yt[1],Yt[2],Zs,go[0],go[1],go[2],t,bo[0],bo[1],bo[2],$t?1:0,Po[0],Po[1],Po[2],tt,R.L[0],R.L[1],R.L[2],We,R.sunC[0],R.sunC[1],R.sunC[2],p0,R.skyZ[0],R.skyZ[1],R.skyZ[2],R.cover,R.skyH[0],R.skyH[1],R.skyH[2],It?1:0,R.skyS[0],R.skyS[1],R.skyS[2],se,R.amb[0],R.amb[1],R.amb[2],0,R.lampP[0],R.lampP[1],R.lampP[2],R.lampI,R.lampC[0],R.lampC[1],R.lampC[2],R.win,B,Se,ht,v0,ne,h0,vt,X,a0[0][0],a0[0][1],a0[0][2],0,a0[1][0],a0[1][1],a0[1][2],v>520?40:30,ro[0],ro[1],ro[2],ro[3]+Math.max(0,tt-_*.7)*.5+(kt===1?.2:0),ve[0][0],ve[0][1],ve[0][2],pa,ve[1][0],ve[1][1],ve[1][2],X0,ve[2][0],ve[2][1],ve[2][2],kt===3?.85:0,t*.004+Fo,t*.0017,Bt?1:0,ge,ie,-Z0-h0+.0035,m0,Ws]),$(7,null),e.bindFramebuffer(e.FRAMEBUFFER,sn),e.viewport(0,0,qo,Ua),e.useProgram(K.skyb.p),$(3,K.noiseT),e.uniform4fv(K.skyb.u.uP,a),Qt(),e.bindFramebuffer(e.FRAMEBUFFER,hn),e.viewport(0,0,v,v),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.depthMask(!0),e.useProgram(o.p),$(0,$0),$(1,Ro),$(2,No),$(3,K.noiseT),$(4,La),$(5,Ca),$(6,To[P0]),$(7,_a),e.uniform4fv(o.u.uP,a),$t&&e.uniform4fv(o.u.uW,$t),Qt(),e.depthFunc(e.LEQUAL),oe&&(e.depthMask(!1),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.disable(e.DEPTH_TEST),N0(3),e.enable(e.DEPTH_TEST),N0(4),e.disable(e.BLEND),e.depthMask(!0),N0(0)),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,v,v),e.useProgram(K.fin.p),$(0,Da),$(3,K.noiseT),us.set([v,Cn,9*v/1e3,R.expo,tt,t,.14,v>520?12:9,R.skyH[0]*.6+R.amb[0],R.skyH[1]*.6+R.amb[1],R.skyH[2]*.6+R.amb[2],0]),e.uniform4fv(K.fin.u.uP,us),Qt(),e.bindVertexArray(null)};let ms=0;const ps=(t,o)=>{if(o=Y(o||1/30,0,.25),Dn(t,o),zn(),x0){g0+=o;let a=0;for(;g0>=De&&a<6;)ja(a===0),g0-=De,a++;g0>De*6&&(g0=0),ao(!1),Xa(),Za(o,vs),wn()}if(is(o),Pa(t),hs(t),s.sound.on&&!(ms&3)){let a=0,r=0,n=0;for(let i=0;i<mt;i+=3){const f=St[i];if(f>.002){const u=Math.hypot(Nt[i],Tt[i]);a+=f*u,u>.32&&r++,Ne[i*4+1]!==0&&(n+=f)}}Zt.set(Y(a*8,0,1),2+r*.6+tt*6,Y(n*25,0,4)),tt>.1&&F()<tt*.5&&Zt.ev("pat",.2+tt*.2,c(-.8,.8))}Zt.run(o),ms++};if(x0&&(ao(!1),Xa()),is(1/30),ns(),x0)for(let t=0;t<12;t++)Za(.05,vs);return Ht[dt].home&&(ka=Ls(e,K,xa)),hs(0),va&&va.register(ps,Te),ps}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
