// Low Tide: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/042.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(E0){E0&&function(){"use strict";const F0=new WeakMap,M=Math.PI*2,xe=Math.PI/180,_=(n,e,d)=>n<e?e:n>d?d:n,we=(n,e,d)=>n+(e-n)*d,Fe=(n,e,d)=>{const h=_((d-n)/(e-n),0,1);return h*h*(3-2*h)},L=192,j=160,he=.02,Re=-1.92,be=.3,ut=Re+L*he,ie=be+j*he,re=1024,K=48,se=40,ho=[0,.6,0],po=32*xe,mo=25*xe,Et=.01,Kt=n=>-Et*(n-1.2),ye=`const int NX=${L},NZ=${j}; const float CL=${he},X0=${Re},Z0=${be}; const vec2 DS=vec2(${L*he},${j*he}),TS=vec2(${L}.,${j}.);
vec2 wpos(ivec2 p){ return vec2(X0,Z0)+(vec2(p)+.5)*CL; }
`,ge=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,vo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
in vec2 vUv; out vec4 o;
float hs(vec2 p,float P){ p=mod(p,P); return fract(sin(dot(p,vec2(127.1,311.7))+P*.137)*43758.5453); }
float vn(vec2 x,float P){ vec2 i=floor(x),f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(hs(i,P),hs(i+vec2(1.,0.),P),f.x),mix(hs(i+vec2(0.,1.),P),hs(i+vec2(1.),P),f.x),f.y); }
float fb(vec2 u,float P,float sd){ float t=0.,a=.5,s=0.; for(int k=0;k<5;k++){ t+=a*vn(u*P+sd,P); s+=a; a*=.5; P*=2.; } return t/s; }
void main(){
  vec2 u=vUv;
  vec2 c=u*16.; vec2 ci=floor(c); float f1=9.,f2=9.;
  for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ vec2 g=ci+vec2(float(i),float(j)); vec2 pp=g+.15+.7*vec2(hs(g,16.),hs(g+31.,16.)); float d=length(pp-c); if(d<f1){f2=f1;f1=d;} else if(d<f2) f2=d; }
  float e=clamp((f2-f1)*1.6,0.,1.);
  o=vec4(e,fb(u,4.,0.),fb(u,8.,17.),vn(u*128.,128.)*.6+hs(floor(u*256.),256.)*.4);
}`,xo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uN; uniform vec4 uP; uniform vec4 uDef[6]; uniform float uKind;
in vec2 vUv; out vec4 o;
${ye}
float rip(vec2 P){
  float a=uP.y; vec2 k=vec2(sin(a),cos(a)), kp=vec2(k.y,-k.x);
  float w=(texture(uN,P*.23+uP.z).g-.5)*1.1+(texture(uN,P*.9+uP.z*1.7).b-.5)*.4;
  float ph=dot(P,k)/uP.x+w*1.3;
  for(int i=0;i<6;i++){ vec2 q=P-uDef[i].xy; ph+=uDef[i].z*atan(q.y,q.x)*.159155; }
  float s=fract(ph);
  float h=s<.7?smoothstep(0.,.7,s):1.-smoothstep(.7,1.,s);
  h=pow(h,1.25);
  float am=.65+.7*texture(uN,P*.37+uP.z*2.3).b;
  if(uKind>.5&&uKind<1.5){
    float w2=(texture(uN,P*.5+uP.z*.7).g-.5)*.8;
    float h2=.5+.5*cos(6.2832*(dot(P,kp)/(uP.x*.62)+w2));
    h=h*.85+h2*.28*(1.-h);
  } else if(uKind>1.5){
    float r1=1.-abs(texture(uN,P*.8+uP.z).g*2.-1.);
    h=.18*h+.35*pow(r1,6.)+.12*texture(uN,P*2.1).b;
  }
  return h*am;
}
void main(){
  vec2 P=vec2(X0,Z0)+vUv*DS;
  float e=.0025;
  float h=rip(P), hx=rip(P+vec2(e,0.))-rip(P-vec2(e,0.)), hz=rip(P+vec2(0.,e))-rip(P-vec2(0.,e));
  vec2 g=vec2(hx,hz)/(2.*e);
  float lam=pow(1.-clamp(h,0.,1.),2.)*smoothstep(.45,.75,texture(uN,P*1.7+uP.z).g);
  lam=max(lam,smoothstep(.8,.95,texture(uN,P*vec2(.4,3.2)+uP.w).b)*.6);
  o=vec4(clamp(h*.8+.1,0.,1.),clamp(g/120.*.8+.5,0.,1.),lam);
}`,wo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF;
uniform float uDt,uSea,uT,uFric;
uniform vec4 uSw;
uniform vec4 uPush; uniform vec2 uPD;
uniform vec4 uObs[16]; uniform int uNO;
out vec4 o;
${ye}
float h1(float n){ return fract(sin(n*12.9898)*43758.5453); }
float seaLv(float x){
  float tt=uT-x*uSw.z; tt+=uSw.y*(.45*sin(tt/uSw.y*.83+1.3)+.25*sin(tt/uSw.y*.37+2.9));   // bores come unevenly
  float k=floor(tt/uSw.y), f=fract(tt/uSw.y);
  float a=uSw.x*(.4+1.1*h1(k+uSw.w));
  return uSea+a*(smoothstep(0.,.06,f)*exp(-f*4.)-.2);
}
bool ob(ivec2 p){ vec2 w=wpos(p); for(int k=0;k<uNO;k++){ vec4 b=uObs[k]; if(length(w-b.xy)<b.z) return true; } return false; }
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uS,p,0);
  float eta=s.x+s.y;
  float eL=eta,eR=eta,eB=eta,eT=eta;
  if(p.x>0){ vec4 q=texelFetch(uS,p+ivec2(-1,0),0); eL=q.x+q.y; }
  if(p.x<NX-1){ vec4 q=texelFetch(uS,p+ivec2(1,0),0); eR=q.x+q.y; }
  if(p.y>0){ vec4 q=texelFetch(uS,p+ivec2(0,-1),0); eB=q.x+q.y; }
  if(p.y<NZ-1){ vec4 q=texelFetch(uS,p+ivec2(0,1),0); eT=q.x+q.y; }
  vec4 f=texelFetch(uF,p,0);
  float dmp=1./(1.+uDt*uFric/(s.y+.0012));
  float k=uDt*9.81*CL;
  vec4 nf=f*dmp+k*vec4(eta-eL,eta-eR,eta-eB,eta-eT);
  vec2 w=wpos(p); vec2 dw=w-uPush.xy;
  float g=exp(-dot(dw,dw)/(uPush.z*uPush.z))*uPush.w*min(1.,s.y/.003);
  nf+=uDt*g*vec4(-uPD.x,uPD.x,-uPD.y,uPD.y);
  float top=f.w*dmp+k*(eta-seaLv(w.x));
  nf=max(nf,0.);
  if(p.x==0) nf.x=0.; if(p.x==NX-1) nf.y=0.; if(p.y==0) nf.z=0.;
  if(p.y==NZ-1) nf.w=top;
  if(uNO>0){
    if(ob(p)) nf=vec4(0.);
    else { if(ob(p+ivec2(-1,0))) nf.x=0.; if(ob(p+ivec2(1,0))) nf.y=0.; if(ob(p+ivec2(0,-1))) nf.z=0.; if(p.y<NZ-1&&ob(p+ivec2(0,1))) nf.w=0.; }
  }
  float ou=nf.x+nf.y+nf.z+max(nf.w,0.);
  float K=min(1.,s.y*CL*CL/(ou*uDt+1e-12));
  nf.xyz*=K; if(nf.w>0.) nf.w*=K;
  o=nf;
}`,bo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF;
uniform float uDt,uKs,uUc,uDif,uInf;
uniform vec4 uSt[8]; uniform int uNS;
out vec4 o;
${ye}
float qs(float f,float d){ float u=f/(CL*max(d,.0006)); u=min(u,1.2); float e=max(u-uUc,0.); return uKs*CL*e*e; }
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uS,p,0), f=texelFetch(uF,p,0);
  vec4 fl=vec4(0.),fr=vec4(0.),fb=vec4(0.),ft=vec4(0.);
  vec4 sl=s,sr=s,sb=s,st=s;
  if(p.x>0){ fl=texelFetch(uF,p+ivec2(-1,0),0); sl=texelFetch(uS,p+ivec2(-1,0),0); }
  if(p.x<NX-1){ fr=texelFetch(uF,p+ivec2(1,0),0); sr=texelFetch(uS,p+ivec2(1,0),0); }
  if(p.y>0){ fb=texelFetch(uF,p+ivec2(0,-1),0); sb=texelFetch(uS,p+ivec2(0,-1),0); }
  if(p.y<NZ-1){ ft=texelFetch(uF,p+ivec2(0,1),0); st=texelFetch(uS,p+ivec2(0,1),0); }
  bool top=p.y==NZ-1;
  float fin=fl.y+fr.x+fb.w+ft.z, fo=f.x+f.y+f.z+max(f.w,0.);
  if(top) fin+=max(-f.w,0.);
  float d1=max(0.,s.y+uDt*(fin-fo)/(CL*CL));
  float wx=.5*(fl.y-f.x+f.y-fr.x), wz=.5*(fb.w-f.z+f.w-ft.z);
  float dm=max(.5*(s.y+d1),.0005);
  vec2 u=vec2(wx,wz)/(CL*dm);
  float ul=length(u); if(ul>.9) u*=.9/ul;
  if(d1<.0002) u*=d1/.0002;
  // Exner: sand rides the water fluxes out of and into this cell
  float qo=qs(f.x,s.y)+qs(f.y,s.y)+qs(f.z,s.y)+qs(max(f.w,0.),s.y);
  float qi=qs(fl.y,sl.y)+qs(fr.x,sr.y)+qs(fb.w,sb.y)+qs(ft.z,st.y);
  float b=s.x+uDt*(qi-qo)/(CL*CL);
  float wet=smoothstep(.0002,.001,d1);
  float lap=sl.x+sr.x+sb.x+st.x-4.*s.x;
  float D=uDif*(wet*(.25+6.*length(u))+.02);
  float steep=max(max(abs(sl.x-s.x),abs(sr.x-s.x)),max(abs(sb.x-s.x),abs(st.x-s.x)))/CL;
  D+=uDif*8.*smoothstep(.35,.7,steep);
  b+=uDt*min(D/(CL*CL),.2/uDt)*lap;
  d1=max(0.,d1-uDt*uInf*(1.-smoothstep(.0,.004,d1)*.7));
  vec2 w=wpos(p);
  for(int k=0;k<uNS;k++){ vec4 q=uSt[k]; vec2 dd=w-q.xy; float r2=dot(dd,dd)/(q.z*q.z);
    if(q.w>0.) d1+=q.w*exp(-r2); else b+=q.w*exp(-r2); }
  o=vec4(b,d1,u);
}`,yo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE,uN; uniform float uDt,uDry;
out vec4 o;
${ye}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy); vec2 uv=(vec2(p)+.5)/TS;
  vec4 s=texelFetch(uS,p,0), e0=texelFetch(uE,p,0);
  vec2 u=s.zw; float d=s.y, sp=length(u);
  vec4 ea=texture(uE,uv-u*uDt/DS);
  bool wt=d>.0003;
  float foam=wt?ea.x:e0.x;
  float src=smoothstep(.08,.35,sp)*(1.-smoothstep(.002,.01,d))*smoothstep(.0002,.0008,d)*(.15+.85*smoothstep(.02,.15,-u.y));
  float conv=0.;
  if(p.x>0&&p.x<NX-1&&p.y>0&&p.y<NZ-1){
    vec2 ul=texelFetch(uS,p+ivec2(-1,0),0).zw, ur=texelFetch(uS,p+ivec2(1,0),0).zw, ub=texelFetch(uS,p+ivec2(0,-1),0).zw, ut=texelFetch(uS,p+ivec2(0,1),0).zw;
    conv=max(0.,-((ur.x-ul.x)+(ut.y-ub.y))-.1)*.8+max(abs((ur.y-ul.y)-(ut.x-ub.x))-.15,0.)*.4;
  }
  src+=clamp(conv,0.,.6)*smoothstep(.0003,.002,d)*(1.-smoothstep(.01,.03,d));
  src*=smoothstep(.03,.08,sp);   // only a moving front makes foam: a pool that fills or drains quietly gets none
  foam=clamp(foam*(1.-uDt*(wt?.7:.5))+src*uDt*1.1,0.,1.);
  float w=e0.y;
  if(d>.0004) w=1.; else w=max(0.,w-uDt*uDry*(.35+1.3*texture(uN,uv*1.7).g));
  float gl=max(e0.z*(1.-uDt*1.4),clamp(src*2.+smoothstep(.15,.45,sp)*.15,0.,1.)*smoothstep(.0002,.001,d));
  o=vec4(foam,w,gl,1.);
}`,go=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform vec3 uL; uniform float uSoft; uniform int uN;
out vec4 o;
${ye}
void main(){
  vec2 uv=gl_FragCoord.xy/(TS*2.);
  vec2 ld=normalize(uL.xz); float te=uL.y/max(length(uL.xz),1e-4);
  vec4 s=texture(uS,uv); float h0=s.x+s.y;
  float occ=0., t=.012;
  for(int i=0;i<uN;i++){ vec4 q=textureLod(uS,uv+ld*t/DS,0.); float dh=q.x+q.y-h0-t*te; occ=max(occ,dh/(t*uSoft+.001)); t*=1.22; }
  float av=0.;
  for(int i=0;i<6;i++){ float a=float(i)*1.0472; vec4 q=textureLod(uS,uv+vec2(cos(a),sin(a))*.07/DS,0.); av+=q.x; }
  float cav=clamp((av/6.-s.x)*90.,-1.,1.);
  o=vec4(1.-clamp(occ,0.,1.),.5+.5*cav,0.,1.);
}`,Ao=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uD; uniform highp sampler2D uS; uniform float uDt;
out vec4 o;
${ye}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy); vec2 uv=(vec2(p)+.5)/${re}.;
  vec4 D=texelFetch(uD,p,0), s=texture(uS,uv);
  float sp=length(s.zw), d=s.y;
  float wash=smoothstep(.02,.1,sp)*smoothstep(.0003,.0015,d);
  float k=uDt*7.5;
  D.r=max(0.,D.r-(D.r*.3+.006)*wash*k);
  D.g=max(0.,D.g-(D.g*.35+.007)*wash*k-step(.002,d)*.0006*k);
  D.a=max(0.,D.a-k*(.05+.08*wash+.01*step(.0005,d)));
  float fl=smoothstep(.16,.38,sp)*step(.0008,d);
  float rg=smoothstep(.03,.1,sp)*(1.-smoothstep(.16,.28,sp))*step(.0008,d);
  D.b=clamp(D.b+(1.-D.b)*fl*.12*k-max(D.b*.02,.0045)*rg*k,0.,1.);
  o=D;
}`,So=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
layout(location=0) in vec2 aQ; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
out vec2 vQ; flat out vec4 vB;
${ye}
void main(){
  vQ=aQ; vB=aB;
  float c=cos(aA.z), s=sin(aA.z);
  vec2 l=aQ*aA.w*1.25;
  vec2 w=aA.xy+vec2(l.x*c+l.y*s,-l.x*s+l.y*c);
  gl_Position=vec4((w-vec2(X0,Z0))/DS*2.-1.,0.,1.);
}`,zo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
in vec2 vQ; flat in vec4 vB; out vec4 o;
float sg(vec2 p,vec2 a,vec2 b){ vec2 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h); }
float hs(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*15731.7); }
void main(){
  vec2 q=vQ*1.25; float r=length(q); int ty=int(vB.x+.5); float am=vB.y;
  vec4 c=vec4(0.);
  if(ty==0){
    vec2 h=vec2(0.,-.45);
    // three slender toes splayed wide (a heron's has a hind toe), pressed a millimetre or two: a shallow V groove, deepest at the heel
    float d=min(sg(q,h,h+vec2(.04,1.2)),min(sg(q,h,h+vec2(-.7,.86)),sg(q,h,h+vec2(.68,.9))));
    if(vB.z>.5) d=min(d,sg(q,h,h+vec2(.05,-.45)));
    float s=1.-smoothstep(0.,.14-.05*clamp(q.y,0.,1.),d);
    c=vec4(0.,s*am*(.55-.15*clamp(q.y+.45,0.,1.)),0.,s*.55);
  } else if(ty==1){
    // a lugworm cast: a heap of coiled sand rope, the coils thick and wandering, not rings
    float th=atan(q.y,q.x)+vB.z*6.2832;
    float env=max(0.,1.-r*(1.+.18*sin(th*2.+vB.z*17.))); env=sqrt(env)*env;
    float w=th*.159155+.3*sin(r*9.+vB.z*31.)+.18*sin(th*3.+r*6.+vB.z*9.);
    float coil=.5+.5*cos(6.2832*(r*2.5-w));
    float str=smoothstep(.2,.9,coil);
    float h=env*(.2+.8*str)*am*(.9+.2*hs(floor(q*5.)));
    c=vec4(h,0.,0.,step(r,1.)*.8);
  } else if(ty==2){
    float s=1.-smoothstep(.15,1.,r); c=vec4(0.,s*s*am,0.,s*.6);
  } else if(ty==3){
    float s=1.-smoothstep(.25,1.,r+.15*(hs(floor(q*7.))-.5)); c=vec4(s*am,0.,0.,s);
  } else if(ty==4){
    float pit=(1.-smoothstep(.2,.75,length(q*vec2(1.,1.6)-vec2(0.,.25))));
    float tail=(1.-smoothstep(.1,.5,abs(q.x)+max(0.,-q.y)*.1))*step(q.y,.2)*(1.-smoothstep(.6,1.,-q.y));
    c=vec4(0.,pit*am,max(tail,pit)*.9,0.);
  } else if(ty==5){
    float s=1.-smoothstep(.2,1.,abs(q.x)); s*=1.-smoothstep(.8,1.,abs(q.y)); c=vec4(0.,s*am,0.,s*.25);
  }
  o=c;
}`,Do=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE;
out vec4 o;
${ye}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy)*4;
  float d=0.,b=0.; vec2 u=vec2(0.);
  for(int j=0;j<4;j+=1) for(int i=0;i<4;i+=1){ ivec2 q=p+ivec2(i,j); vec4 s=texelFetch(uS,q,0); d+=s.y; b+=s.x; u+=s.zw; }
  o=vec4(clamp(d/16./.04,0.,1.),clamp((b/16.+.04)/.08,0.,1.),clamp(u/16./1.2+.5,0.,1.));
}`,R0=`
uniform vec3 uL,uSunC,uSkyZ,uSkyH,uSkyS; uniform vec4 uCl; uniform float uNight;
vec3 sky(vec3 r,float rough){
  float e=max(r.y,0.);
  vec2 sd=normalize(uL.xz); vec2 rh=r.xz/max(length(r.xz),1e-4);
  float ca=dot(rh,sd)*.5+.5, mu=dot(r,uL);
#ifdef LOWV
  // seen straight on, one ramp: the bright band on the horizon, a darker, cooler step above it (the mist mints stay pale)
  float m6=pow(max(mu,0.),6.);
  vec3 c=mix(uSkyH*mix(.78,1.,uCl.w),uSkyZ*mix(.6,.9,uCl.w),pow(min(e/.3,1.),mix(.5,.6,uCl.w)));
  c+=uSkyS*(m6*m6*m6*m6*.55+m6*.12+exp(-e*mix(13.,6.,uCl.w))*ca*ca*.5);
  c*=mix(.68,1.,uCl.w);   // kept in the mid-tones, where the evening's colour shows
  c=max(mix(vec3(dot(c,vec3(.3,.59,.11))),c,mix(1.55,1.,uCl.w)),0.);   // and its colour kept: a warm band under a cool step
#else
  vec3 c=mix(uSkyH,uSkyZ,pow(e,.6));
  c+=uSkyS*(pow(max(mu,0.),5.)*.9+exp(-e*5.)*ca*ca*.7);
#endif
#ifdef LOWV
  vec2 cp=vec2(rh.x*.8+uCl.y,e*7.5+uCl.z*3.);
  float n=texture(uN,cp,rough*4.).g*.62+texture(uN,cp*vec2(2.1,3.7)+.3,rough*4.).b*.38;
  float cl=smoothstep(1.-uCl.x*.75,1.18-uCl.x*.75,n)*smoothstep(.015,.05,e)*(1.-smoothstep(.09,.24,e))*(1.-uCl.w);
#else
  vec2 cp=r.xz/(e+.12)*.11+uCl.yz;
  float n=texture(uN,cp,rough*4.).g*.62+texture(uN,cp*2.9+.3,rough*4.).b*.38;
  float cl=smoothstep(1.-uCl.x,1.25-uCl.x,n)*smoothstep(.02,.2,e);
#endif
  vec3 cc=mix(uSkyH*1.05+uSkyS*.25*ca,uSkyZ*.7+uSkyS*.15,.35)*(.85+.4*n);
  c=mix(c,cc,cl*.85);
#ifdef BIO
  if(uNight>.5){ float st=texture(uN,r.xz/(e+.05)*1.7).a; c+=vec3(.6,.7,1.)*smoothstep(.9,.97,st)*.12*(1.-rough)*(1.-cl); }
#endif
  return c;
}`,k0=n=>`#version 300 es
${n&4?`#define BIO
`:""}${n&8?`#define LOWV
`:""}${n&16?`#define LOWSKY
`:""}${n&32?`#define JEL
`:""}precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE,uSh,uR,uD,uN,uOsh;
uniform vec3 uEye,uF,uRt,uUp; uniform float uTan,uPix,uT;
uniform vec3 uAlb,uAlb2,uWetT,uFogC,uAmb,uWatC;
uniform vec4 uRip;   // ripple amp (m), laminae, sparkle, mud sheen
uniform vec4 uSea;   // level, swash amp, period, obliq
uniform vec4 uMood;  // mist, bio, exposure, shells in sand
uniform vec4 uJel;   // a stranded moon jelly: x, z, radius, seed (0: none)
uniform float uShN; uniform int uZ0;
in vec2 vUv; out vec4 o;
${ye}
${R0}
vec4 T(vec2 c){ return texture(uS,c/TS); }
void bsp(vec2 uv,out vec4 v,out vec4 gx,out vec4 gz){
  vec2 st=uv*TS-.5, i=floor(st), f=st-i, f2=f*f, f3=f2*f, g=1.-f;
  vec2 w0=g*g*g/6., w1=(4.-6.*f2+3.*f3)/6., w2=(1.+3.*f+3.*f2-3.*f3)/6., w3=f3/6.;
  vec2 d0=-.5*g*g, d1=1.5*f2-2.*f, d2=-1.5*f2+f+.5, d3=.5*f2;
  vec2 sA=w0+w1, sB=w2+w3, oA=i-.5+w1/sA, oB=i+1.5+w3/sB;
  vec2 tA=d0+d1, tB=d2+d3, qA=i-.5+d1/tA, qB=i+1.5+d3/tB;
  v=sA.y*(sA.x*T(vec2(oA.x,oA.y))+sB.x*T(vec2(oB.x,oA.y)))+sB.y*(sA.x*T(vec2(oA.x,oB.y))+sB.x*T(vec2(oB.x,oB.y)));
  gx=sA.y*(tA.x*T(vec2(qA.x,oA.y))+tB.x*T(vec2(qB.x,oA.y)))+sB.y*(tA.x*T(vec2(qA.x,oB.y))+tB.x*T(vec2(qB.x,oB.y)));
  gz=tA.y*(sA.x*T(vec2(oA.x,qA.y))+sB.x*T(vec2(oB.x,qA.y)))+tB.y*(sA.x*T(vec2(oA.x,qB.y))+sB.x*T(vec2(oB.x,qB.y)));
}
float h1(float n){ return fract(sin(n*12.9898)*43758.5453); }
float swash(vec2 P){
  float tt=uT-P.x*uSea.w+(P.y-${ie.toFixed(3)})/.55; tt+=uSea.z*(.45*sin(tt/uSea.z*.83+1.3)+.25*sin(tt/uSea.z*.37+2.9));
  float k=floor(tt/uSea.z), f=fract(tt/uSea.z);
  return uSea.y*(.4+1.1*h1(k+7.))*(smoothstep(0.,.06,f)*exp(-f*4.)-.2);
}
float ggx(vec3 N,vec3 V,vec3 L,float r){
  vec3 H=normalize(V+L); float a=r*r, nh=max(dot(N,H),0.), dd=nh*nh*(a*a-1.)+1.;
  return a*a/(3.1416*dd*dd)*max(dot(N,L),0.)/(4.*max(dot(N,V),.2));
}
vec3 tm(vec3 x){ x*=uMood.z; x=(x*(2.51*x+.03))/(x*(2.43*x+.59)+.14); return pow(clamp(x,0.,1.),vec3(1./2.2)); }
float dH(vec4 D){ return D.r*.012-D.g*.006; }
#ifdef LOWV
vec3 hzn(vec3 d){ vec2 sd=normalize(uL.xz), rh=normalize(d.xz); float ca=dot(rh,sd)*.5+.5, mu=dot(vec3(rh.x,0.,rh.y),uL);
  return uSkyH+uSkyS*(pow(max(mu,0.),5.)*.9+ca*ca*.7); }
#endif
void main(){
  vec2 ndc=vUv*2.-1.;
  vec3 d=normalize(uF+ndc.x*uTan*uRt+ndc.y*uTan*uUp);
#ifdef LOWV
  // low along the flat: the sky over the horizon; the sun's disc, dimmed through mist; no line at all in mist
  vec3 hz=hzn(d);
#endif
#ifdef LOWSKY
  // its own small program, drawn over the rows above the horizon (the ground program is scissored to the rows below)
  if(!(d.y>-.0004)) discard;
  float mu=dot(d,uL), e=max(d.y,0.);
  vec3 cs=sky(d,0.)+uSunC*(smoothstep(.999982,.999992,mu)*mix(2.5,.35,uCl.w)+pow(max(mu,0.),2600.)*.3*(1.-.5*uCl.w));
  cs=mix(cs,hz,uCl.w*exp(-e*9.));
  vec2 vs=vUv-.5; cs*=1.-dot(vs,vs)*.45;
  o=vec4(tm(cs),1.);
#else
#ifdef LOWV
  if(d.y>-.0004){ o=vec4(0.,0.,0.,1.); return; }   // drawn over by the sky program
#endif
  float t=uEye.y/-d.y; vec3 P=uEye+d*t;
  vec2 uv=(P.xz-vec2(X0,Z0))/DS;
  float hg=texture(uS,uv).x; t=(uEye.y-hg)/-d.y; P=uEye+d*t; uv=(P.xz-vec2(X0,Z0))/DS;
  float pf=t*uPix;
  // the moon jelly is a clear lens: the sand under it is seen magnified, and it is shaded below as a dome of clear water
#ifdef JEL
  vec2 jq=(P.xz-uJel.xy)/max(uJel.z,1e-3); float jr=length(jq)*(1.+.05*sin(jq.x*5.+jq.y*3.+uJel.w*9.)), jin=uJel.w>0.?1.-smoothstep(.96,1.,jr):0.;
  if(jin>0.){ P.xz=uJel.xy+(P.xz-uJel.xy)*(.8+.2*jr*jr); uv=(P.xz-vec2(X0,Z0))/DS; }
#else
  const float jin=0.;   // no jelly on this mint
#endif
  vec4 sv,sgx,sgz; bsp(uv,sv,sgx,sgz);
  float em=min(min(P.x-X0,${ut.toFixed(3)}-P.x),min(P.z-Z0,${ie.toFixed(3)}-P.z));
  float inD=smoothstep(.0,.12,em);
  float sw0=0.,sw1=0.; for(int i=0;i<2+uZ0;i++){ float w=swash(P.xz+vec2(0.,.02*float(i))); if(i==0) sw0=w; else sw1=w; }
  float bF=${Et}*(1.2-P.z), dF=max(uSea.x+sw0-bF,0.);
#ifdef LOWV
  // beyond the patch: a sheet of water at the tide's edge, then the far bar of wet sand (just over mid tide, its long hollows
  // holding sheets of water), then the sea; the bores die out over the sheet
  float zf=P.z-${ie.toFixed(3)};
  float fn=texture(uN,P.xz*vec2(.011,.034)+.17).g, fn2=texture(uN,P.xz*vec2(.045,.12)+.53).b;
  bF=mix(bF,mix(-.0018,uSea.x,.6)+.0075-.017*smoothstep(.44,.41,fn)+(fn-.5)*.008+(fn2-.5)*.002,smoothstep(.8,6.,zf));
  bF=mix(bF,-.06,smoothstep(150.,190.,P.z));
  sw0*=exp(-max(zf,0.)*.3); sw1*=exp(-max(zf,0.)*.3);
  dF=max(uSea.x+sw0-bF,0.);
#endif
  float b=mix(bF,sv.x,inD), dep=mix(dF,sv.y,inD);
  vec2 gb=mix(vec2(0.,-${Et}),vec2(sgx.x,sgz.x)/CL,inD);
  float swz=(sw1-sw0)/.02;
  vec2 gd=mix(vec2(0.,swz),vec2(sgx.y,sgz.y)/CL,inD);
  vec2 vel=sv.zw*inD;
  vec4 E=texture(uE,uv); float wet=mix(1.,E.y,inD), foam=E.x*inD;
#ifdef LOWV
  wet=mix(wet,.42,smoothstep(2.,7.,P.z-${ie.toFixed(3)}));   // the far bar is damp, matt sand: only its sheets of water are mirrors
#endif
  vec4 S2=texture(uSh,uv); float sh=mix(1.,S2.r,inD), cav=mix(.5,S2.g,inD);
  // detail: decals (central differences keep the slope continuous) and ripples
  vec4 n1=texture(uN,P.xz*.37), n2=texture(uN,P.xz*1.9+.21);
  float tx=1./${re}.;
  vec4 D=texture(uD,uv);
  float Dxp=dH(texture(uD,uv+vec2(tx,0.))), Dxm=dH(texture(uD,uv-vec2(tx,0.))), Dzp=dH(texture(uD,uv+vec2(0.,tx))), Dzm=dH(texture(uD,uv-vec2(0.,tx)));
  float hdc=dH(D)*inD; vec2 gdc=vec2(Dxp-Dxm,Dzp-Dzm)/(2.*tx*DS)*inD;
  vec4 R=texture(uR,uv);
  float amp=uRip.x*(1.-D.b*inD);
#ifdef LOWV
  amp*=1.-smoothstep(.5,5.,P.z-${ie.toFixed(3)});   // far out the ripples are only a sheen: their mip-averaged slopes would draw contour lines
#endif
  float hr=((R.r-.1)/.8-.5)*amp; vec2 gr=(R.gb-.5)/.8*120.*amp;
  float hd=hr+hdc; vec2 gt=gb+gr+gdc;
  // grain
  float nf=1.-smoothstep(.0012,.006,pf);
  vec4 G1=texture(uN,P.xz*7.3), G2=texture(uN,mat2(.8,-.6,.6,.8)*P.xz*17.+.37);
  vec2 gg=(vec2(G1.a,G2.a)-.5)*.5*nf;
  vec3 N=normalize(vec3(-gt.x-gg.x,1.,-gt.y-gg.y));
  // ripple and decal shadows from the raking sun
  vec2 ld=normalize(uL.xz); float te=uL.y/max(length(uL.xz),1e-4);
  float rs=1.;
  int ns=int(uShN);
  for(int i=1;i<=ns;i++){ float dd=float(i)*float(i)*.0022+.002; vec2 q=uv+ld*dd/DS; vec4 Dq=textureLod(uD,q,0.);
    float hq=((textureLod(uR,q,1.).r-.1)/.8-.5)*uRip.x*(1.-Dq.b*inD)+dH(Dq)*inD; rs=min(rs,clamp(1.-(hq-hd-dd*te)/(.0004+dd*.05),0.,1.)); }
#ifdef LOWV
  rs=mix(rs,1.,smoothstep(.3,3.,P.z-${ie.toFixed(3)}));   // the ripples' shadows fetched at a fixed level alias far out: the far flat has none
#endif
  sh*=rs*texture(uOsh,vUv).r;
  // water over the sand: the sim depth less the detail, so troughs fill before crests; saturated troughs hold a film
  float ha=amp*.5+.0004;
  float dv=max(dep,inD*smoothstep(.9,1.,wet)*smoothstep(.35,.75,n2.g)*.0005);
  float lvl=dv>=ha?dv:-ha+2.*sqrt(ha*dv);
  float dw=lvl-hd;
#ifdef JEL
  float jt=uJel.z*.17*pow(max(1.-jr*jr,.002),.6)*jin; vec2 jg=jq/max(length(jq),1e-3)*(-.204*jr*pow(max(1.-jr*jr,.03),-.4))*jin;
#else
  const float jt=0.; const vec2 jg=vec2(0.);
#endif
  dw=max(dw,jt);
  float waa=max(.00012,length(gt)*pf*.7);
  float cw=smoothstep(-waa,waa,dw);
  // sand colour
  vec3 alb=mix(uAlb,uAlb2,smoothstep(.3,.72,n1.g))*(.86+.28*n2.b);
  alb*=1.-uRip.y*R.a;
  alb*=.78+.44*mix(.5,G1.a,nf);
  float hq=fract(G2.a*137.31+G1.g*17.7); float shell=step(1.-uMood.w,hq)*nf; alb=mix(alb,vec3(.8,.74,.66)*(.7+.5*G1.g),shell*(.2+.55*fract(hq*913.7)));
  alb*=1.-.1*D.a*inD;
  float crest=clamp(hr/max(amp,.0005)+.5,0.,1.);
  float wv=clamp((wet-.15-.55*crest*.4-.35*(n2.g-.5)-.2*(1.-cav))*3.2,0.,1.);
#ifdef JEL
  wv=max(max(wv,cw),uJel.w>0.?1.-smoothstep(1.,1.45,jr):0.);
#else
  wv=max(max(wv,cw),0.);
#endif
  vec3 albW=alb*mix(vec3(1.),uWetT,wv);
  albW*=1.-.28*smoothstep(-.0011,-.0001,dw)*(1.-cw)*inD;   // a finger-wide band of soaked sand at the water's edge
  // light
  vec3 V=-d;
  float ndl=max(dot(N,uL),0.);
  float ao=clamp(.65+.7*(cav-.5),.3,1.1)*(1.-.35*clamp(-hd/max(amp,.001),0.,1.)*amp*120.);
  vec3 amb=uAmb*(.55+.45*N.y)*ao;
  vec3 dif=albW*(uSunC*pow(ndl,.85)*sh+amb);
  vec3 sand=vec3(0.);
  if(cw<1.){ // dry or part-wet sand only (fully under water it is mixed away)
  float rough=mix(mix(.65,.32,uRip.w),.1,wv);
  vec3 Rv=reflect(d,N);
  float F=.02+.98*pow(1.-max(dot(N,V),0.),5.);
  vec3 env=sky(Rv,rough);
#ifdef LOWV
  float shn=.45;   // against the sun the grains on every crest catch it: the sun's path, broken on the ripples
#else
  float shn=0.;
#endif
  sand=dif+env*F*(wv*.9+uRip.w*.25)*(1.-rough*.5)+uSunC*ggx(N,V,uL,max(rough,.08))*F*sh*(wv+.15*uRip.w+shn);
  // grain glints: many strengths, crowding toward the sun's mirror direction, twinkling where the film drains
  float hz=fract(G1.a*91.7+G2.g*53.1), th=.0012*(1.+3.*uRip.z)*(1.+1.5*wv), st=fract(hz*731.3);
  float spk=step(1.-th,hz)*nf*nf*sh*st*st, mr=max(dot(reflect(-uL,N),V),0.), m2=mr*mr;
  sand+=uSunC*spk*(1.+5.*wv*step(.5,fract(st*7.+uT*.6)))*(m2*m2*2.4+.12*mr)*uRip.z*.55;
  }
  // water surface
  vec3 water=vec3(0.); vec2 wn=vec2(0.);
  if(cw>0.||foam>.04){
  float ph=fract(uT*.4); vec2 o1=vel*ph*.5, o2=vel*fract(ph+.5)*.5; float bl=abs(1.-2.*ph);
  wn=(texture(uN,P.xz*3.1-o1).gb-.5)*(1.-bl)+(texture(uN,P.xz*3.1-o2+.5).gb-.5)*bl;
  wn+=(texture(uN,P.xz*8.3+uT*vec2(.021,.043)).gb-.5)*.55;
  }
  if(cw>0.){
  float wa=(.035+.9*length(vel))*smoothstep(0.,.005,dw)+.05*(1.-inD);
#ifdef LOWV
  wa=mix(wa,.012,smoothstep(.5,4.,P.z-${ie.toFixed(3)}));   // the far sheets are still: mip-averaged wavelets would draw grain in the mirror
#endif
  vec2 ge=gb+gd+jg;
  vec3 Nw=normalize(vec3(-ge.x-wn.x*wa,1.,-ge.y-wn.y*wa));
  float Fw=.02+.98*pow(1.-max(dot(Nw,V),0.),5.);
  vec3 envW=sky(reflect(d,Nw),0.);
  float gn=texture(uN,P.xz*9.+wn*.7+uT*vec2(.05,-.03)).a;
  vec3 rw=reflect(d,Nw); float gm=max(dot(rw,uL),0.); gm*=gm; gm*=gm; gm*=gm;
  vec3 glint=uSunC*(min(ggx(Nw,V,uL,.07),60.)*1.2+gm*gm*smoothstep(.7,.95,gn)*14.)*Fw*sh;
  vec3 ab=exp(-max(dw-jt*.85,0.)*uWatC*(1.+.5*uMood.x));
  float cs=texture(uN,P.xz*2.3+wn*.25+uT*vec2(.03,.05)).r;
  float caus=pow(1.-cs,6.)*2.2*smoothstep(0.,.006,dw)*sh*(1.-jin);
  vec3 bedc=alb*uWetT*(uSunC*(ndl*.8+.2)*sh*(1.+caus)+amb);
#ifdef JEL
  if(jin>0.){ vec2 jf=abs(mat2(.8,-.6,.6,.8)*jq)-.212; float gon=(1.-smoothstep(.025,.055,abs(length(jf)-.12)))*smoothstep(.09,-.03,(jf.x+jf.y)*.707);
#ifdef LOWV
    gon*=.3;   // seen this low the four rings would read as marks on a pebble
#endif
    bedc=bedc*mix(vec3(.84,.87,.9),vec3(1.5,1.12,1.25),gon*.8)+vec3(.06,.03,.045)*gon*(uSunC*.3+uAmb); }
#endif
  vec3 scat=(uAmb*.6+uSunC*.05)*vec3(.35,.42,.38)*.35;
  water=mix(bedc*ab+scat*(1.-ab),envW,Fw)+glint;
  // the edge is no line: where the meniscus curves up the bank it only catches the sun, on the side toward it
  float me=smoothstep(0.,.0001,dw)*(1.-smoothstep(.0001,.0005,dw));
  vec2 gq=gb+gr; vec3 Nm=normalize(vec3(-gq.x,0.,-gq.y)*(.6*inversesqrt(dot(gq,gq)+1e-6))+vec3(0.,1.,0.));
  float gmn=max(dot(reflect(d,Nm),uL),0.); gmn*=gmn; gmn*=gmn; gmn*=gmn;
  water+=uSunC*me*gmn*sh*inD*.14*smoothstep(.45,.62,texture(uN,P.xz*5.+.61).g);
  }
  vec3 col=mix(sand,water,cw);
  // foam: lacy lines carried by the flow, stranded bubbles where it dried
  float fm=0.;
  if(foam>.04){
  vec2 fq=P.xz+wn*.05; float fe=min(texture(uN,vec2(fq.x*1.3,fq.y*9.)).r*1.3,texture(uN,fq*5.3).r*1.8), fe2=texture(uN,vec2(fq.x*3.1,fq.y*21.)+.5).r;
  float fw=.03+.22*foam;
  fm=max(1.-smoothstep(fw*.4,fw,fe),.6*(1.-smoothstep(fw*.3,fw*.8,fe2)))*smoothstep(.04,.3,foam)*(.55+.45*texture(uN,P.xz*31.).a);
  // never a solid line: a 1-3 cm breakup takes half of it even at full foam, and stranded foam on drained sand is only specks
  fm*=smoothstep(.44,.58,texture(uN,P.xz*14.+.13).g)*mix(smoothstep(.6,.72,texture(uN,P.xz*60.+.29).b),1.,cw);
  vec3 fc=(uSunC*max(uL.y*2.5,.12)*sh+uAmb*1.1)*.95;
  col=mix(col,fc,fm*.7);
  }
  // night tide: agitated water and fresh disturbances glow
  // night tide: cold sparks only where the water is disturbed (swash fronts, round obstacles) and in fresh prints, fading fast
#ifdef BIO
  if(uMood.y>0.){ float pk=smoothstep(.97,.997,fract(fract(G1.a*91.7+G2.g*53.1)*23.+floor(uT*5.+G1.r*3.)*.37))*(.3+.7*nf);
    float gw=((max(E.z-.25,0.)*cw*1.3+fm*.15)*(.025+3.*pk)+max(E.z-.05,0.)*cw*pk*4.+D.a*inD*(.03+2.5*pk))*inD+(1.-inD)*(.12+.9*pk)*smoothstep(.0062,.0095,sw0+.004); col+=vec3(.12,.6,.8)*min(gw,1.5)*uMood.y; }
#endif
#ifdef LOWV
  // the far surf: a broken thread where the bar meets the sea
  float fz=t*uPix/max(-d.y,1e-4);
  float th=(1.-smoothstep(.6*fz,1.8*fz,abs(P.z-171.)))*smoothstep(.38,.62,texture(uN,vec2(P.x*.025+uT*.003,.37)).g);
  col=mix(col,(uSunC*max(uL.y*2.5,.12)+uAmb*1.1)*.9,th*.8);
  col=mix(col,hz,1.-exp(-t*uMood.x));
#else
  col=mix(col,uFogC,1.-exp(-t*uMood.x));
#endif
  vec2 vq=vUv-.5; col*=1.-dot(vq,vq)*.45;
  o=vec4(tm(col),1.);
#endif
}`,Eo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
layout(location=0) in vec2 aQ; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB; layout(location=3) in vec4 aC; layout(location=4) in vec4 aD; layout(location=5) in vec4 aE;
uniform mat4 uVP; uniform vec3 uEye,uL; uniform int uMode;
out vec3 vW; flat out vec4 vA,vB,vC,vD,vE;
void main(){
  vA=aA; vB=aB; vC=aC; vD=aD; vE=aE;
  float R=aA.w; vec3 c=vec3(aA.x,aA.y+aB.w,aA.z);
  vec3 w;
  if(uMode==1){
    vec2 sd=normalize(uL.xz), sp=vec2(-sd.y,sd.x);
    float te=uL.y/max(length(uL.xz),1e-3);
    float len=min((aB.w+R)/max(te,.02),4.5);
    float a=mix(-R*1.2,len+R,aQ.x*.5+.5);
    vec2 q=aA.xz-sd*a+sp*aQ.y*R*1.15;
    w=vec3(q.x,aA.y,q.y);
  } else {
    if(uMode==2) c.y=2.*aA.y-c.y;
    vec3 fw=normalize(c-uEye), rt=normalize(cross(fw,vec3(0.,1.,0.))), up=cross(rt,fw);
    w=c+(rt*aQ.x+up*aQ.y)*R*1.3;
  }
  vW=w; gl_Position=uVP*vec4(w,1.);
}`,Fo=n=>`#version 300 es
${n&1?`#define STAR
`:""}${n&2?`#define DOL
`:""}${n&4?`#define BIO
`:""}precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE,uSh,uN;
uniform vec3 uEye,uAmb,uFogC,uWatC; uniform mat4 uVP; uniform int uMode,uSteps,uSSteps,uZero; uniform float uT,uMist,uShadK;
uniform vec3 uShT; uniform float uExpo,uSize;
in vec3 vW; flat in vec4 vA,vB,vC,vD,vE; out vec4 o;
${ye}
${R0}
float sdE(vec3 p,vec3 r){ float k0=length(p/r), k1=length(p/(r*r)); return k0*(k0-1.)/max(k1,1e-6); }
float sdC(vec3 p,vec3 a,vec3 b,float r){ vec3 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h)-r; }
float sdC2(vec3 p,vec3 a,vec3 b,float ra,float rb){ vec3 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h)-mix(ra,rb,h); }
float ggx(vec3 N,vec3 V,vec3 L,float r){
  vec3 H=normalize(V+L); float a=r*r, nh=max(dot(N,H),0.), dd=nh*nh*(a*a-1.)+1.;
  return a*a/(3.1416*dd*dd)*max(dot(N,L),0.)/(4.*max(dot(N,V),.2));
}
vec3 tm(vec3 x){ x*=uExpo; x=(x*(2.51*x+.03))/(x*(2.43*x+.59)+.14); return pow(clamp(x,0.,1.),vec3(1./2.2)); }
float smin(float a,float b,float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
float M;   // material id of the last map
float blob(vec3 p,int kd,vec4 pz){
  float s=pz.x; p.y+=pz.y; float d; M=float(kd);
  if(kd==0){ float r=length(p.xz); float rib=sin(atan(p.x,p.z+s*.9)*26.)*.0005*smoothstep(.2*s,.6*s,r);
    d=max(sdE(p,vec3(s,s*.5,s*.88))-rib,-p.y); }
  else if(kd==1){ d=max(sdE(p,vec3(s*.42,s*.32,s)),-p.y-.001); }
  else if(kd==2){ float bm=(textureLod(uN,p.xz*3.+pz.z,0.).g-.5)*s*.25; d=sdE(p,vec3(s,s*.55,s*.8))-bm; }
  else if(kd==3){ // a razor shell: two long, gently curved valves, oval in section, squared-off rounded ends
    vec3 q=p; q.x-=s*.06*(q.z*q.z/(s*s)-.35);
    float e=(length(vec2(q.x/(s*.1),q.y/(s*.042)))-1.)*s*.042; vec2 w=vec2(e,abs(q.z)-s);
    d=max(min(max(w.x,w.y),0.)+length(max(w,0.))-s*.012,-p.y-.001); }
#ifdef DOL
  else if(kd==4){ // a sand dollar: a thin disc, domed on top, lying at a slight tilt, half buried
    vec3 q=p; float c=cos(pz.w), sn=sin(pz.w); q.yz=vec2(c*q.y-sn*q.z,sn*q.y+c*q.z);
    q.y+=s*.03; d=max(sdE(q,vec3(s,s*.11,s)),-q.y-s*.015); }
#endif
#ifdef STAR
  else if(kd==5){ // a starfish: five tapering arms, rounded in section, a little curled, with a raised centre and a pimpled skin
    float r=length(p.xz), a=atan(p.x,p.z)+.22*sin(r/s*3.+pz.z*7.+vA.x*13.)*r/s;
    float b=mod(a+.6283,1.2566)-.6283; vec2 q=r*vec2(sin(b),cos(b));
    d=sdC2(vec3(q.x,p.y*1.7,q.y),vec3(0.),vec3(0.,0.,s),.21*s,.035*s)/1.7;
    d=smin(d,sdE(p,vec3(.3*s,.17*s,.3*s)),.03*s)-(textureLod(uN,p.xz*9./s,0.).a-.5)*s*.03;
    d=max(d,-p.y-.001); }
#endif
  else { d=length(p)-s; }
  return d;
}
float mapO(vec3 p){
  int ty=int(vB.y+.5);
  if(ty==2) return blob(p,int(vB.z+.5),vC);
  M=9.; return length(p)-vC.x;
}
vec3 toL(vec3 w){ vec3 p=w-vec3(vA.x,vA.y,vA.z); float c=cos(vB.x), s=sin(vB.x); return vec3(p.x*c-p.z*s,p.y,p.x*s+p.z*c); }
vec3 dirL(vec3 w){ float c=cos(vB.x), s=sin(vB.x); return vec3(w.x*c-w.z*s,w.y,w.x*s+w.z*c); }
vec3 dirW(vec3 l){ float c=cos(vB.x), s=sin(vB.x); return vec3(l.x*c+l.z*s,l.y,-l.x*s+l.z*c); }
vec2 sph(vec3 ro,vec3 rd,vec3 c,float r){ vec3 oc=ro-c; float b=dot(oc,rd), cc=dot(oc,oc)-r*r, h=b*b-cc; if(h<0.) return vec2(-1.); h=sqrt(h); return vec2(-b-h,-b+h); }
vec3 albedo(int ty,int sp,vec3 lp,vec3 pw,float m){
  float n=texture(uN,pw.xz*23.+pw.y*9.).g, n2=texture(uN,lp.xz*61.+lp.y*40.).a;
  if(ty==2){ int kd=int(m+.5);
    if(kd==0) return mix(vec3(.82,.76,.66),vec3(.6,.5,.42),smoothstep(.3,.8,n))*(.85+.25*sin(length(lp.xz)*700.));
    if(kd==1) return mix(vec3(.04,.05,.08),vec3(.18,.22,.3),smoothstep(.0,.006,lp.y)*.4);
    if(kd==2) return mix(vec3(.38,.36,.33),vec3(.55,.5,.44),n)*(vC.z>.5?.6:1.);
    if(kd==3){ float s=vC.x, bd=smoothstep(-.15,.15,lp.x/(s*.1)+lp.z/s*.9-.2); return mix(vec3(.3,.26,.15),vec3(.6,.52,.4),bd)*(.85+.15*sin(length(lp.xz-vec2(s*.3,-s))*900.+n*2.))*(.85+.3*n2); }
#ifdef DOL
    if(kd==4){ // the five-petal flower etched on top: each petal outlined by a double row of pores
      float a=atan(lp.x,lp.z), r=length(lp.xz)/vC.x, b=abs(fract(a*.7958)-.5)*1.2566*r, w=.13*sin(3.1416*clamp((r-.07)/.55,0.,1.));
      float pet=(1.-smoothstep(.0,.022,abs(b-w)))*step(.07,r)*step(r,.62)*(.6+.4*sin(r*140.));
      float live=step(.5,vC.z);
      vec3 c=mix(vec3(.74,.72,.66)*(.88+.18*n2),vec3(.3,.23,.29)*(.8+.4*n2),live);
      return mix(c,c*vec3(.6,.58,.56),pet*(1.-.5*live))*(1.-.12*smoothstep(.8,1.,r)); }
#endif
#ifdef STAR
    if(kd==5) return mix(mix(vec3(.72,.26,.08),vec3(.9,.48,.2),n)*(.8+.3*n2),vec3(.93,.66,.42),smoothstep(.75,.92,n2)*.35);
#endif
    return vec3(.75,.82,.9);
  }
  return vec3(.9);
}
void main(){
  int ty=int(vB.y+.5), sp=int(vB.z+.5);
  float R=vA.w; vec3 cw=vec3(vA.x,vA.y+vB.w,vA.z);
  vec3 ro=uEye, rd=normalize(vW-uEye);
  float refl=1.;
  if(uMode==1){ ro=vW; rd=uL; }
  if(uMode==2){
    float tg=(uEye.y-vA.y)/-rd.y; vec3 pg=uEye+rd*tg; vec2 gu=(pg.xz-vec2(X0,Z0))/DS;
    vec4 s=texture(uS,gu); vec4 e=texture(uE,gu);
    float wat=smoothstep(.0002,.002,s.y), wt=max(e.y,wat);
    vec3 nn=vec3(0.,1.,0.);
    if(wat>0.){ vec2 wn=texture(uN,pg.xz*3.1+uT*.04).gb-.5; float tl=.06; nn=normalize(vec3(wn.x*tl,1.,wn.y*tl)); }
    float Fr=.02+.98*pow(1.-max(-rd.y,0.),5.);
    refl=mix(wt*wt*.35*Fr*4.,Fr*1.6+.06,wat);
    if(refl<.01) discard;
    ro=pg; rd=reflect(rd,nn);
  }
  vec2 h=sph(ro,rd,cw,R); if(h.y<0.) discard;
  float t=max(h.x,0.), res=1.; bool hit=false; int nk=0;
  vec3 rl=toL(ro), dl=dirL(rd), pl=vec3(0.), nl=vec3(0.); float m=0.;
  int n=(uMode==1?uSSteps:uSteps)+4;
  // one loop, one map call: march (or the soft shadow), then the four normal taps
  for(int i=0;i<n;i++){
    vec3 e=.57735*(2.*vec3(float(((nk+3)>>1)&1),float((nk>>1)&1),float(nk&1))-1.);
    vec3 p=hit?pl+e*.0004:rl+dl*t;
    float dd=mapO(p);
    if(hit){ nl+=e*dd; nk++; if(nk==4) break; continue; }
    if(uMode==1){ res=min(res,uShadK*dd/max(t,.001)); if(res<.02) break; t+=clamp(dd,.002,.08); if(t>h.y) break; continue; }
    if(dd<.00025+t*.0004){ hit=true; pl=p; m=M; continue; }
    t+=dd*.9; if(t>h.y) break;
  }
  if(uMode==1){
    float oc=(1.-clamp(res,0.,1.))*(uShadK<10.?.55:1.);
    if(oc<.01) discard;
    o=vec4(vec3(1.-oc),1.); return;
  }
  if(!hit||nk<4) discard;
  if(pl.y<-.0015&&uMode==0) discard;
  nl=normalize(nl);
  vec3 N=dirW(nl), P=ro+rd*t;
  vec2 uvp=(vec2(vA.x,vA.z)-vec2(X0,Z0))/DS;
  float shd=texture(uSh,uvp).r;
  vec3 a=albedo(ty,sp,pl,P,m);
  float ndl=dot(N,uL);
  float wrap=.1;
  vec3 col=a*(uSunC*max((ndl+wrap)/(1.+wrap),0.)*shd+uAmb*(.6+.4*N.y)*(.6+.4*smoothstep(0.,.05,pl.y)));
  vec3 V=-rd; float Fs=.04+.96*pow(1.-max(dot(N,V),0.),5.);
  float gl=ty==2?(sp==1?.9:sp==4?(vC.z>.5?.12:.3):.5):(ty==3?1.:.12);
  vec4 sw=texture(uS,uvp); vec4 ew=texture(uE,uvp);
  float wetO=max(ew.y,smoothstep(.0002,.002,sw.y));
  gl=max(gl,wetO*.6);
  vec3 env=sky(reflect(rd,N),.3);
  col+=env*Fs*gl+uSunC*ggx(N,V,uL,.18)*Fs*gl*2.*shd;
  float rim=pow(1.-max(dot(N,V),0.),3.)*max(dot(-V,uL)*.5+.5,0.)*.3;
  col+=uSunC*rim*a*.8*shd;
  float al=1.;
  if(ty==3){ col=env*.6+uSunC*ggx(N,V,uL,.05)*3.+uAmb*.2; }
  float wl=sw.y-pl.y;
  if(wl>0.&&ty!=3){ vec3 ab=exp(-wl*uWatC); col=col*ab+(uAmb*.25)*(1.-ab); col=mix(col,uSkyH,.12*smoothstep(0.,.003,wl)); }
  col=mix(col,uFogC,1.-exp(-length(P-uEye)*uMist));
  vec2 vq=gl_FragCoord.xy/uSize-.5; col*=1.-dot(vq,vq)*.45;
  col=tm(col);
  if(uMode==2){ o=vec4(col,refl*al); return; }
  vec4 cp=uVP*vec4(P,1.); gl_FragDepth=clamp(cp.z/cp.w*.5+.5,0.,1.);
  o=vec4(col,al);
}`;function fe(n,e,d){const h=(l,I)=>{const V=n.createShader(l);return n.shaderSource(V,I),n.compileShader(V),V},A=n.createProgram(),z=h(n.VERTEX_SHADER,e),w=h(n.FRAGMENT_SHADER,d);return n.attachShader(A,z),n.attachShader(A,w),n.linkProgram(A),{p:A,sh:[z,w],u:null}}function Ft(n,e,d){if(!n.getProgramParameter(e.p,n.LINK_STATUS))throw new Error("042 "+d+": "+n.getProgramInfoLog(e.p)+" "+n.getShaderInfoLog(e.sh[0])+" "+n.getShaderInfoLog(e.sh[1]));e.u={};const h=n.getProgramParameter(e.p,n.ACTIVE_UNIFORMS);for(let A=0;A<h;A++){const z=n.getActiveUniform(e.p,A),w=z.name.replace(/\[0\]$/,"");e.u[w]=n.getUniformLocation(e.p,z.name)}}const Ro=["noise","rip","flux","state","efs","shad","du","dst","down"],ko=(n,e,d)=>{for(const h in e.var)if((h&d)===d&&(h&8)===(d&8))return e.var[h];return e.var[d]={comp:fe(n,ge,k0(d)),objO:fe(n,Eo,Fo(d)),sky:d&8?fe(n,ge,k0(d|16)):null}};function Mo(n){let e=F0.get(n);return e||(e={var:{},vao0:n.createVertexArray(),ok:!1},e.cbf=!!n.getExtension("EXT_color_buffer_float"),e.lin=!!n.getExtension("OES_texture_float_linear"),e.hbf=e.cbf||!!n.getExtension("EXT_color_buffer_half_float"),e.quad=n.createBuffer(),n.bindBuffer(n.ARRAY_BUFFER,e.quad),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),n.STATIC_DRAW),F0.set(n,e),e)}function To(n,e){e.noise||Object.assign(e,{noise:fe(n,ge,vo),rip:fe(n,ge,xo),flux:fe(n,ge,wo),state:fe(n,ge,bo),efs:fe(n,ge,yo),shad:fe(n,ge,go),du:fe(n,ge,Ao),dst:fe(n,So,zo),down:fe(n,ge,Do)})}function Po(n,e){if(e.ok)return;e.ok=!0;for(const h of Ro)Ft(n,e[h],h);e.noiseT=M0(n,256,256,n.RGBA8,n.RGBA,n.UNSIGNED_BYTE,n.LINEAR,n.REPEAT);const d=T0(n,e.noiseT);n.viewport(0,0,256,256),n.disable(n.BLEND),n.disable(n.DEPTH_TEST),n.disable(n.SCISSOR_TEST),n.disable(n.CULL_FACE),n.useProgram(e.noise.p),n.bindVertexArray(e.vao0),n.drawArrays(n.TRIANGLES,0,3),n.bindFramebuffer(n.FRAMEBUFFER,null),n.deleteFramebuffer(d),n.bindTexture(n.TEXTURE_2D,e.noiseT),n.generateMipmap(n.TEXTURE_2D),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR_MIPMAP_LINEAR)}function M0(n,e,d,h,A,z,w,l,I){const V=n.createTexture();return n.bindTexture(n.TEXTURE_2D,V),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_ALIGNMENT,1),n.texImage2D(n.TEXTURE_2D,0,h,e,d,0,A,z,I||null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,w),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,w===n.NEAREST?n.NEAREST:n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,l||n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,l||n.CLAMP_TO_EDGE),V}function T0(n,e){const d=n.createFramebuffer();return n.bindFramebuffer(n.FRAMEBUFFER,d),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,e,0),d}const P0=typeof FinalizationRegistry=="function"?new FinalizationRegistry(n=>{try{n.tex.forEach(e=>n.gl.deleteTexture(e)),n.fbo.forEach(e=>n.gl.deleteFramebuffer(e)),n.buf.forEach(e=>n.gl.deleteBuffer(e)),n.vao.forEach(e=>n.gl.deleteVertexArray(e))}catch{}}):null,Rt=(n,e,d)=>{let h=n*374761393+e*668265263+d*1442695041|0;return h=Math.imul(h^h>>>13,1274126177),h^=h>>>16,(h>>>0)/4294967296},Lo=(n,e,d)=>{const h=Math.floor(n),A=Math.floor(e),z=n-h,w=e-A,l=z*z*(3-2*z),I=w*w*(3-2*w),V=Rt(h,A,d),Z=Rt(h+1,A,d),f=Rt(h,A+1,d),O=Rt(h+1,A+1,d);return V+(Z-V)*l+(f-V)*I+(V-Z-f+O)*l*I},Ce=(n,e,d,h)=>{let A=0,z=.5,w=1,l=0;for(let I=0;I<d;I++)A+=z*Lo(n*w,e*w,h+I*7),l+=z,z*=.5,w*=2.03;return A/l},kt=(n,e,d)=>{const h=[0,-Math.sin(e),Math.cos(e)],A=[0,Math.cos(e),Math.sin(e)],z=[1,0,0],w=Math.tan(d),l=(()=>{const q=1/w,F=[z[0],A[0],-h[0],0,z[1],A[1],-h[1],0,z[2],A[2],-h[2],0,-(z[0]*n[0]+z[1]*n[1]+z[2]*n[2]),-(A[0]*n[0]+A[1]*n[1]+A[2]*n[2]),h[0]*n[0]+h[1]*n[1]+h[2]*n[2],1],N=[q,0,0,0,0,q,0,0,0,0,(30+.03)/(.03-30),-1,0,0,2*30*.03/(.03-30),0],pe=new Float32Array(16);for(let ke=0;ke<4;ke++)for(let ce=0;ce<4;ce++){let le=0;for(let Ae=0;Ae<4;Ae++)le+=N[Ae*4+ce]*F[ke*4+Ae];pe[ke*4+ce]=le}return pe})(),I=(f,O,q)=>{const F=l,N=F[3]*f+F[7]*O+F[11]*q+F[15];return[(F[0]*f+F[4]*O+F[8]*q+F[12])/N,(F[1]*f+F[5]*O+F[9]*q+F[13])/N]};return{EYE:n,CF:h,CU:A,CR:z,TANF:w,VP:l,proj:I,toGround:(f,O)=>{const q=f*2-1,F=1-O*2,N=[h[0]+q*w*z[0]+F*w*A[0],h[1]+q*w*z[1]+F*w*A[1],h[2]+q*w*z[2]+F*w*A[2]],pe=n[1]/Math.max(-N[1],.02);return[n[0]+N[0]*pe,n[2]+N[2]*pe]},halfW:f=>{const O=I(1,0,f);return .88/Math.max(Math.abs(O[0]),.001)}}};E0.add({num:42,name:"Low Tide",fam:"Worlds",recipe:"A patch of tidal sand in low sun, where the water floods the ripples, drains back through channels it cuts and wipes out the tracks birds and crabs left behind. What lives there and the tide change every mint. Drag down to push the tide in or up to let it go out, tap to drop a shell or pebble, or hold to bring the sun down through gold to pink.",interactive:"Drag down toward you to push the flood tide in, drag up to let it ebb; the water also follows your stroke. Tap to drop a shell or pebble and the water scours round it. Hold to bring the sun down through gold to pink.",music:!0,gl:!0,fps:30,seed:0,make(n){const e=n.gl,d=n.size,h=Mo(e),A=n.hash.slice(2),z=t=>{let o=parseInt(A.slice(t,t+8),16)>>>0,s=parseInt(A.slice(t+8,t+16),16)>>>0,a=parseInt(A.slice(t+16,t+24),16)>>>0,i=2654435769;const c=()=>{o>>>=0,s>>>=0,a>>>=0,i=i+1831565813|0;const x=o+s+i|0;return o=s^s>>>9,s=a+(a<<3)|0,a=(a<<21|a>>>11)+x|0,(x>>>0)/4294967296};for(let x=0;x<12;x++)c();return c},w=z(0),l=z(16),I=z(32),V=z(40),Z=(t,o=w)=>{let s=0;for(const i of t)s+=i[1];let a=o()*s;for(const i of t)if(a-=i[1],a<=0)return i[0];return t[t.length-1][0]},f=(t,o,s=w)=>t+(o-t)*s();let O=Z([["Golden quartz",40],["Grey estuary mud",26],["Dark volcanic",20],["Pink shell sand",14]]),q=Z([["Current ripples",48],["Interference ladders",30],["Smooth, rill-marked",22]]),F=Z([["Braided channels",32],["Runnel and ridge",26],["Open flat",22],["Pools in the hollows",20]]),N=Z([["Lugworms and cockles",36],["Crab burrows",30],["Razor shells",18],["Sand dollars",16]]),pe=Z([["Oystercatchers",36],["Sanderlings",34],["A grey heron",20],["A flock of godwits",10]]),ke=Z([["Golden evening",46],["Pink dusk",32],["Misty morning",22]]),ce=Z([["None",70],["A starfish",14],["A stranded moon jelly",10],["Bioluminescent night tide",6]]);n.home&&(O="Golden quartz",q="Current ripples",F="Braided channels",N="Lugworms and cockles",pe="Oystercatchers",ke="Golden evening",ce="None");const le=ce==="Bioluminescent night tide";let Ae=parseInt(A.slice(48,56),16)^4378626|0;const B=()=>{Ae=Ae+1831565813|0;let t=Math.imul(Ae^Ae>>>15,1|Ae);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Bo=B(),L0=B(),$t=F;n.home||(F=L0<.17?"A tidal creek":L0<.32?"Sand bars and troughs":F),n.trait("Sand",O),n.trait("Ripples",q),n.trait("Flat",F),n.trait("Life",N),n.trait("Birds",le?"Only their prints":pe),n.trait("Light",le?"Moonlit night":ke),n.trait("Find",ce);let ht=parseInt(A.slice(32,40),16)^parseInt(A.slice(40,48),16)|0;const W=()=>{ht=ht+1831565813|0;let t=Math.imul(ht^ht>>>15,1|ht);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},B0="";let pt=B0||(n.home?"Kneeling, looking down":Z([["Kneeling, looking down",58],["Standing, looking down",27],["Straight down on the ripples",15]],W));!n.home&&!B0&&Bo<.2&&!le&&(pt="Low along the flat");const dt=pt==="Low along the flat";n.trait("View",pt);const No="",N0=No||(n.home||W()<.7?"Low water":"Flooding in"),Zt=N0==="Flooding in"?.0062+.004*W():0;n.trait("Tide",N0);const Se=ko(e,h,(ce==="A starfish"?1:0)+(N==="Sand dollars"?2:0)+(le?4:0)+(dt?8:0)+(ce==="A stranded moon jelly"?32:0));To(e,h);const{EYE:_0,CF:mt,CU:vt,CR:xt,TANF:ze,VP:_o,proj:Ss,toGround:Yt,halfW:Me}=pt==="Standing, looking down"?kt([0,1.4,0],50*xe,25*xe):dt?kt([0,.75,0],9*xe,25*xe):pt==="Straight down on the ripples"?kt([0,.72,.6],63*xe,25*xe):kt(ho,po,mo),De={"Golden quartz":{a:[.46,.33,.18],b:[.38,.27,.15],w:[.42,.4,.38],lam:.32,spk:.5,mud:0,shells:.006,amp:1},"Grey estuary mud":{a:[.24,.22,.19],b:[.19,.18,.16],w:[.55,.55,.57],lam:.05,spk:.05,mud:1,shells:.002,amp:.65},"Dark volcanic":{a:[.11,.1,.095],b:[.075,.07,.07],w:[.62,.62,.64],lam:0,spk:1,mud:0,shells:.004,amp:1},"Pink shell sand":{a:[.56,.4,.34],b:[.48,.33,.29],w:[.5,.45,.45],lam:.12,spk:.3,mud:0,shells:.03,amp:.9}}[O],Co=(q==="Smooth, rill-marked"?.0028:q==="Interference ladders"?.0042:.0048)*De.amp,Te=L*j,Qe=new Float32Array(Te),Jt=w()*1e6|0,We=[];if($t==="Braided channels"){const t=2+Math.floor(w()*2);for(let s=0;s<t;s++)We.push({x0:f(-1.1,1.1),z0:f(.5,1.4),a:f(.08,.25),f:f(1.2,2.6),p:f(0,M),w:f(.05,.09),dep:f(.006,.011)});const o=We.length;for(let s=0;s<o;s++)if(w()<.8){const a=We[s],i=f(a.z0+.4,2.4);We.push({par:a,zb:i,x0:0,z0:i,a:f(.1,.3),f:f(1.5,3),p:f(0,M),w:a.w*.8,dep:a.dep*.8,sgn:w()<.5?-1:1})}}const C0=(t,o)=>t.par?C0(t.par,t.zb)+t.sgn*(o-t.zb)*.35+t.a*Math.sin(t.f*(o-t.zb)*2+t.p)*Math.min(1,(o-t.zb)*2):t.x0+t.a*Math.sin(t.f*o+t.p)+.12*Math.sin(t.f*2.3*o+t.p*1.7),Mt=[];if($t==="Pools in the hollows"){const t=4+Math.floor(w()*4);for(let o=0;o<t;o++)Mt.push([f(-1.2,1.2),f(.7,2.7),f(.12,.3),f(.006,.012),f(.6,1.4)]);Mt.push([(W()-.5)*.7,1+W()*.45,.32+W()*.14,.012+W()*.004,.65+W()*.4])}const Qt={z:f(1.7,2.3),ph:f(0,M),cut:f(-.9,.9)};F!==$t&&(We.length=0,Mt.length=0);const C=F==="A tidal creek"?{xm:(B()-.5)*.24,zm:1.1,sl:(.16+.2*B())*(B()<.5?-1:1),a:.35+.25*B(),f:.9+.5*B(),p:B()*M,a2:.1+.07*B(),f2:2.6+1.2*B(),p2:B()*M,w:.13+.05*B(),dep:.02+.006*B(),sd:B()*1e5|0}:null,q0=t=>C.sl*(t-C.zm)+C.a*Fe(.9,2.6,t)*Math.sin(C.f*t+C.p)+C.a2*Math.sin(C.f2*t+C.p2),Tt=C?(()=>{const t=C.xm-q0(C.zm);return o=>q0(o)+t})():null,I0=t=>C.w*(.85+.3*Ce(t*1.3,3.7,2,C.sd)),qo=(t,o,s)=>!!C&&Math.abs(t-Tt(o))<I0(o)*s,de=F==="Sand bars and troughs"?{lam:.7+.3*B(),A:.02+.015*B(),th:(15+20*B())*xe*(B()<.5?-1:1),ph:B(),dx:(B()-.5)*2.4,dz:1.2+1.6*B(),dg:B()<.5?-1:1,sd:B()*1e5|0}:null,e0=We.length,O0=new Float64Array(e0),U0=new Float64Array(e0),G0=new Float64Array(e0);for(let t=0;t<j;t++){const o=be+(t+.5)*he;let s=0;for(const u of We){if(o<u.z0)continue;const m=Math.min(1,(o-u.z0)/.35);U0[s]=C0(u,o),G0[s]=u.w*(.6+.25*(o-u.z0)),O0[s]=u.dep*m*(.7+.15*(o-u.z0)),s++}let a=0,i=0,c=0,x=0,b=0,y=0,S=0;if(C){a=Tt(o),i=I0(o);const u=(Tt(o+.1)-2*a+Tt(o-.1))/.01;c=_(Math.abs(u)/1.2,0,1),x=u>0?-1:1;const m=Fe(be-.2,be+.25,o);b=.85+.3*Ce(o*1.6,1.3,2,C.sd+5),y=.75+.25*m,S=1+.5*Fe(1.5,3.4,o)}for(let u=0;u<L;u++){const m=Re+(u+.5)*he;let v=Kt(o);if(v+=(Ce(m*1.1,o*1.1,4,Jt)-.5)*.011+(Ce(m*3.2,o*3.2,2,Jt+50)-.5)*.003,F==="Runnel and ridge"){const g=Qt.z+.18*Math.sin(m*1.3+Qt.ph),p=1-.85*Math.exp(-(((m-Qt.cut)/.16)**2));v+=.009*Math.exp(-(((o-g)/.22)**2))*p,v-=.011*Math.exp(-(((o-g+.42)/.17)**2))}if(F==="Open flat"&&(v+=.004*Math.sin(m*2.1+o*.7+Jt)*Math.exp(-((o-1.8)**2))),de){let p=(o*Math.cos(de.th)+m*Math.sin(de.th))/de.lam+de.ph+(Ce(m*.32,o*.32,3,de.sd)-.5)*2.2+de.dg*Math.atan2(o-de.dz,m-de.dx)/M;const D=p-Math.floor(p),H=D<.34?Fe(0,.34,D):1-Fe(.34,1,D),ue=de.A*(.8+.4*Ce(m*.7,o*.7,2,de.sd+9));v+=ue*(H-.5)+Et*.8*(o-1.2)}if(C){const g=(m-a)/i,p=c,D=x,H=g-D*p*.35,oe=H*D>0?1-Fe(.5,.95+.12*(Ce(o*9,m*9,2,C.sd+3)-.5),Math.abs(H)):(1-Fe(0,1.9,Math.abs(H)))**1.4,G=1-Fe(.45,1.15,Math.abs(g)),ve=we(G,oe,p);v-=C.dep*ve*b*y*S}for(const g of Mt){const p=Math.hypot((m-g[0])*g[4],o-g[1])/g[2];v-=g[3]*Fe(1.25,.45,p)}let k=0;for(let g=0;g<s;g++){const p=m-U0[g],D=(p/G0[g])**2;D<800&&(k=Math.max(k,O0[g]*Math.exp(-D)))}Qe[t*L+u]=v-k}}const $=le?"night":ke==="Golden evening"?"gold":ke==="Pink dusk"?"pink":"mist",j0=f(-.75,-.3,I)*(I()<.3?-1:1)*(dt?.38:1),Pt={gold:8.5,pink:2.6,mist:7,night:22}[$],wt=[16,9,4,1,-1.5,-5],Io=[[1,.88,.7,3.4],[1,.72,.45,3],[1,.52,.27,2.3],[1,.36,.2,1.2],[.8,.3,.25,.25],[0,0,0,0]],Oo=[[.26,.42,.74],[.3,.42,.7],[.36,.38,.62],[.38,.32,.55],[.26,.22,.42],[.08,.08,.17]],Uo=[[.78,.76,.74],[.85,.7,.6],[.9,.58,.55],[.82,.46,.52],[.55,.32,.45],[.14,.12,.22]],Go=[[.8,.7,.5],[1,.62,.32],[1,.45,.24],[.95,.35,.3],[.6,.2,.25],[.12,.05,.1]],Lt=(t,o)=>{let s=0;for(;s<wt.length-2&&o<wt[s+1];)s++;const a=_((wt[s]-o)/(wt[s]-wt[s+1]),0,1);return t[s].map((i,c)=>we(i,t[s+1][c],a))},E={sunC:[0,0,0],skyZ:[0,0,0],skyH:[0,0,0],skyS:[0,0,0],amb:[0,0,0],fog:[0,0,0],shT:[0,0,0],L:[0,1,0],mist:0,expo:1},V0=t=>{const o=Math.max(t,.6)*xe;E.L=[Math.sin(j0)*Math.cos(o),Math.sin(o),Math.cos(j0)*Math.cos(o)];let s=Lt(Io,t),a=Lt(Oo,t),i=Lt(Uo,t),c=Lt(Go,t);if($==="pink"&&(a=[a[0]*1.08,a[1]*.85,a[2]*1.02],i=[i[0]*1.05,i[1]*.82,i[2]*1],c=[c[0],c[1]*.8,c[2]*1.15]),$==="mist"){const b=[.58,.58,.58];a=a.map((y,S)=>we(y,b[S],.5)),i=i.map((y,S)=>we(y,b[S]*1.05,.55)),c=c.map((y,S)=>we(y,b[S],.2)),s=[s[0],we(s[1],.8,.3),we(s[2],.6,.3),s[3]*.8]}$==="night"&&(s=[.55,.65,.85,.5*_((t+2)/6,0,1)],a=[.03,.04,.085],i=[.06,.075,.13],c=[.06,.07,.11]),E.sunC=[s[0]*s[3],s[1]*s[3],s[2]*s[3]],E.skyZ=a,E.skyH=i,E.skyS=c,E.amb=[a[0]*.38+i[0]*.22,a[1]*.38+i[1]*.22,a[2]*.38+i[2]*.22],E.fog=$==="mist"?[i[0]*.8,i[1]*.82,i[2]*.85]:[i[0]*.8,i[1]*.8,i[2]*.8],E.mist=dt?$==="mist"?.032:.0025:$==="mist"?.085:$==="night"?.02:.03;const x=Math.max(Math.sin(o),.02);for(let b=0;b<3;b++)E.shT[b]=_((E.amb[b]*.8+.02)/(E.amb[b]*.8+E.sunC[b]*x*1.6+.02),0,1);E.expo=$==="night"?2.6:$==="mist"?1.12:1.3+_((4-t)*.12,0,.7)};let qe=Pt,bt=-1;V0(qe);const et={gl:e,tex:[],fbo:[],buf:[],vao:[]},Ie=(t,o,s,a,i,c,x,b)=>{const y=M0(e,t,o,s,a,i,c,x,b);return et.tex.push(y),y},Oe=t=>{const o=T0(e,t);return et.fbo.push(o),o},t0=h.hbf,Bt=h.cbf&&h.lin?e.RGBA32F:e.RGBA16F,zs=Bt===e.RGBA32F?e.FLOAT:e.HALF_FLOAT,o0=new Float32Array(Te*4),jo=-.0075+Zt*(C?.3:dt?0:1),Vo=.011,Wo=72,s0=n.home?Math.PI/2-.35:(w()<.5?1:-1)*Math.acos(_(f(-1,1)*.9+f(-.15,.15),-1,1))*(Zt?0:1)+(Zt?-.5:0),tt=t=>jo+Vo*(Math.sin(M*t/Wo+s0+Math.PI*.5)+.35*(Math.sin(M*t/41.3+s0*1.7)-Math.sin(s0*1.7)));let Y=tt(0),Xe=Y,Nt=0;const Ds=Math.max(Y+.012,.012);{const t=new Float32Array(Te).fill(1e9),o=new Uint8Array(Te),s=new Float64Array(Te),a=new Int32Array(Te);let i=0;const c=(u,m)=>{let v=i++;for(s[v]=m,a[v]=u;v>0;){const k=v-1>>1;if(s[k]<=s[v])break;const g=s[k],p=a[k];s[k]=s[v],a[k]=a[v],s[v]=g,a[v]=p,v=k}};let x=0,b=0;const y=()=>{if(x=s[0],b=a[0],i--,i){s[0]=s[i],a[0]=a[i];let u=0;for(;;){const m=u*2+1,v=m+1;let k=u;if(m<i&&s[m]<s[k]&&(k=m),v<i&&s[v]<s[k]&&(k=v),k===u)break;const g=s[k],p=a[k];s[k]=s[u],a[k]=a[u],s[u]=g,a[u]=p,u=k}}},S=tt(0);for(let u=0;u<L;u++){const m=(j-1)*L+u;o[m]=1,t[m]=Math.max(Qe[m],S),c(m,t[m])}for(;i;){y();const u=x,m=b,v=m%L,k=m/L|0;for(let g=0;g<4;g++){const p=v+(g===0?-1:g===1?1:0),D=k+(g===2?-1:g===3?1:0);if(p<0||p>=L||D<0||D>=j)continue;const H=D*L+p;o[H]||(o[H]=1,t[H]=Math.max(Qe[H],u),c(H,t[H]))}}for(let u=0;u<Te;u++)o0[u*4]=Qe[u],o0[u*4+1]=Math.max(0,Math.max(t[u]-4e-4,S)-Qe[u])}const Xo=t=>t,Pe=[0,1].map(()=>Ie(L,j,Bt,e.RGBA,e.FLOAT,h.lin||Bt!==e.RGBA32F?e.LINEAR:e.NEAREST,0,Xo(o0))),n0=[0,1].map(()=>Ie(L,j,Bt,e.RGBA,e.FLOAT,e.NEAREST,0,new Float32Array(Te*4))),W0=new Float32Array(Te*4);for(let t=0;t<j;t++)for(let o=0;o<L;o++){const s=t*L+o,a=Re+(o+.5)*he,i=be+(t+.5)*he;W0[s*4+1]=_(1-(Qe[s]-Y-.002)*120+(Ce(a*4,i*4,2,9)-.5)*.8,.05,1)}const yt=[0,1].map(()=>Ie(L,j,h.hbf?e.RGBA16F:e.RGBA8,e.RGBA,h.hbf?e.FLOAT:e.UNSIGNED_BYTE,e.LINEAR,0,h.hbf?W0:null)),a0=Ie(L*2,j*2,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),i0=[0,1].map(()=>Ie(re,re,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR)),r0=Ie(1024,1024,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.MIRRORED_REPEAT),Ho=Ie(K,se,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.NEAREST),_t=Math.ceil(d/3),X0=Ie(_t,_t,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR),Ko=Pe.map(Oe),$o=n0.map(Oe),Zo=yt.map(Oe),Yo=Oe(a0),Ct=i0.map(Oe),Jo=Oe(r0),Qo=Oe(Ho),es=Oe(X0);e.bindFramebuffer(e.FRAMEBUFFER,null);for(const t of Ct)e.bindFramebuffer(e.FRAMEBUFFER,t),e.viewport(0,0,re,re),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);e.bindFramebuffer(e.FRAMEBUFFER,null);const qt=e.createBuffer();et.buf.push(qt),e.bindBuffer(e.PIXEL_PACK_BUFFER,qt),e.bufferData(e.PIXEL_PACK_BUFFER,K*se*4,e.STREAM_READ),e.bindBuffer(e.PIXEL_PACK_BUFFER,null);const It=e.createBuffer(),f0=e.createBuffer();et.buf.push(It,f0);const Ot=e.createVertexArray(),c0=e.createVertexArray();et.vao.push(Ot,c0),e.bindVertexArray(Ot),e.bindBuffer(e.ARRAY_BUFFER,h.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,0),e.bindBuffer(e.ARRAY_BUFFER,It),e.bufferData(e.ARRAY_BUFFER,160*80,e.DYNAMIC_DRAW);for(let t=1;t<=5;t++)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,4,e.FLOAT,!1,80,(t-1)*16),e.vertexAttribDivisor(t,1);e.bindVertexArray(c0),e.bindBuffer(e.ARRAY_BUFFER,h.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.vertexAttribDivisor(0,0),e.bindBuffer(e.ARRAY_BUFFER,f0),e.bufferData(e.ARRAY_BUFFER,2048*4,e.DYNAMIC_DRAW);for(let t=1;t<=2;t++)e.enableVertexAttribArray(t),e.vertexAttribPointer(t,4,e.FLOAT,!1,32,(t-1)*16),e.vertexAttribDivisor(t,1);e.bindVertexArray(null),Po(e,h),Se.comp.u||(Ft(e,Se.comp,"comp"),Ft(e,Se.objO,"objO"),Se.sky&&Ft(e,Se.sky,"sky"));let H0=d,l0=d;if(Se.sky){const t=a=>{const i=(a+.5)/d*2-1;let c=!1,x=!0;for(const b of[0,1]){const y=mt[0]+b*ze*xt[0]+i*ze*vt[0],S=mt[1]+b*ze*xt[1]+i*ze*vt[1],u=mt[2]+b*ze*xt[2]+i*ze*vt[2],m=S/Math.hypot(y,S,u)>-4e-4;c=c||m,x=x&&m}return[c,x]};let o=-1,s=d;for(let a=0;a<d;a++){const[i,c]=t(a);c||(o=a),i&&s===d&&(s=a)}H0=Math.min(d,o+4),l0=Math.max(0,s-3)}const J=h,P=(t,o)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,o)},r=(t,o)=>t.u[o],He=(t,o,s,a)=>{e.bindFramebuffer(e.FRAMEBUFFER,o),e.viewport(0,0,s,a),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.useProgram(t.p),e.bindVertexArray(J.vao0)},Ee=()=>e.drawArrays(e.TRIANGLES,0,3);{const t=J.rip;He(t,Jo,1024,1024),P(0,J.noiseT),e.uniform1i(r(t,"uN"),0);const o=q==="Interference ladders"?f(.11,.14):f(.12,.16);e.uniform4f(r(t,"uP"),o,f(-.35,.35),f(0,10),f(0,10));const s=new Float32Array(24);for(let a=0;a<6;a++)s[a*4]=f(Re+.3,ut-.3),s[a*4+1]=f(be+.2,ie-.3),s[a*4+2]=q==="Smooth, rill-marked"?0:w()<.5?-1:1;e.uniform4fv(r(t,"uDef"),s),e.uniform1f(r(t,"uKind"),q==="Current ripples"?0:q==="Interference ladders"?1:2),Ee(),e.bindTexture(e.TEXTURE_2D,r0),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR)}const Le=1/60;let K0=1,Q=0,Ke=0,$e=0,u0=0,gt=0;const Ue=new Float32Array(64);let ot=0;const $0=new Float32Array(32);let At=0;const ne={x:0,z:0,r:.25,s:0,dx:0,dz:0},Ze={amp:f(.0035,.0065,V),per:f(5.5,8,V),obl:f(-.5,.5,V),seed:f(0,100,V)},Ye={Ks:6e-4,Uc:.045,Dif:3e-5,Inf:9e-5,Fric:.0045,Dry:.022},Z0=(t,o)=>{let s=J.flux;He(s,$o[1-Q],L,j),P(0,Pe[Q]),P(1,n0[Q]),e.uniform1i(r(s,"uS"),0),e.uniform1i(r(s,"uF"),1),e.uniform1f(r(s,"uDt"),t),e.uniform1f(r(s,"uSea"),Y),e.uniform1f(r(s,"uT"),u0),e.uniform1f(r(s,"uFric"),Ye.Fric),e.uniform4f(r(s,"uSw"),Ze.amp,Ze.per,Ze.obl,Ze.seed),e.uniform4f(r(s,"uPush"),ne.x,ne.z,ne.r,ne.s),e.uniform2f(r(s,"uPD"),ne.dx,ne.dz),e.uniform4fv(r(s,"uObs"),Ue),e.uniform1i(r(s,"uNO"),ot),Ee(),s=J.state,He(s,Ko[1-Q],L,j),P(0,Pe[Q]),P(1,n0[1-Q]),e.uniform1i(r(s,"uS"),0),e.uniform1i(r(s,"uF"),1),e.uniform1f(r(s,"uDt"),t),e.uniform1f(r(s,"uKs"),o),e.uniform1f(r(s,"uUc"),Ye.Uc),e.uniform1f(r(s,"uDif"),Ye.Dif),e.uniform1f(r(s,"uInf"),Ye.Inf*K0),e.uniform4fv(r(s,"uSt"),$0),e.uniform1i(r(s,"uNS"),At),Ee(),At=0,Q=1-Q,u0+=t},Y0=t=>{const o=J.efs;He(o,Zo[1-Ke],L,j),P(0,Pe[Q]),P(1,yt[Ke]),P(2,J.noiseT),e.uniform1i(r(o,"uS"),0),e.uniform1i(r(o,"uE"),1),e.uniform1i(r(o,"uN"),2),e.uniform1f(r(o,"uDt"),t),e.uniform1f(r(o,"uDry"),Ye.Dry*(De.mud?.45:1)),Ee(),Ke=1-Ke},Ut=()=>{const t=J.shad;He(t,Yo,L*2,j*2),P(0,Pe[Q]),e.uniform1i(r(t,"uS"),0),e.uniform3fv(r(t,"uL"),E.L),e.uniform1f(r(t,"uSoft"),$==="mist"?.25:.035),e.uniform1i(r(t,"uN"),16),Ee()},J0=t=>{const o=J.du;He(o,Ct[1-$e],re,re),P(0,i0[$e]),P(1,Pe[Q]),e.uniform1i(r(o,"uD"),0),e.uniform1i(r(o,"uS"),1),e.uniform1f(r(o,"uDt"),t),Ee(),$e=1-$e},Be=new Float32Array(2048);let Je=0;const U=(t,o,s,a,i,c,x=0,b=0)=>{Je>=255&&h0();const y=Je*8;Be[y]=t,Be[y+1]=o,Be[y+2]=s,Be[y+3]=a,Be[y+4]=i,Be[y+5]=c,Be[y+6]=x,Be[y+7]=b,Je++},h0=()=>{if(!Je)return;const t=J.dst;e.bindFramebuffer(e.FRAMEBUFFER,Ct[$e]),e.viewport(0,0,re,re),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.enable(e.BLEND),e.blendEquation(e.MAX),e.blendFunc(e.ONE,e.ONE),e.useProgram(t.p),e.bindVertexArray(c0),e.bindBuffer(e.ARRAY_BUFFER,f0),e.bufferData(e.ARRAY_BUFFER,Be.subarray(0,Je*8),e.DYNAMIC_DRAW),e.drawArraysInstanced(e.TRIANGLES,0,6,Je),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND),e.bindVertexArray(null),Je=0},st=new Uint8Array(K*se*4),p0=new Float32Array(K*se),Q0=new Float32Array(K*se),d0=new Float32Array(K*se),m0=new Float32Array(K*se);let nt=null;const eo=()=>{for(let t=0;t<K*se;t++)p0[t]=st[t*4]/255*.04,Q0[t]=st[t*4+1]/255*.08-.04,d0[t]=(st[t*4+2]/255-.5)*1.2,m0[t]=(st[t*4+3]/255-.5)*1.2},to=()=>{const t=J.down;He(t,Qo,K,se),P(0,Pe[Q]),P(1,yt[Ke]),e.uniform1i(r(t,"uS"),0),e.uniform1i(r(t,"uE"),1),Ee()},ts=()=>{to(),e.readPixels(0,0,K,se,e.RGBA,e.UNSIGNED_BYTE,st),e.bindFramebuffer(e.FRAMEBUFFER,null),eo()},os=()=>{nt||(to(),e.bindBuffer(e.PIXEL_PACK_BUFFER,qt),e.readPixels(0,0,K,se,e.RGBA,e.UNSIGNED_BYTE,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.bindFramebuffer(e.FRAMEBUFFER,null),nt=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0))},ss=()=>{if(!nt)return;const t=e.clientWaitSync(nt,0,0);(t===e.ALREADY_SIGNALED||t===e.CONDITION_SATISFIED)&&(e.deleteSync(nt),nt=null,e.bindBuffer(e.PIXEL_PACK_BUFFER,qt),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,st),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),eo())},Gt=(t,o,s)=>{const a=_((o-Re)/(4*he)-.5,0,K-1.001),i=_((s-be)/(4*he)-.5,0,se-1.001),c=a|0,x=i|0,b=a-c,y=i-x,S=x*K+c;return we(we(t[S],t[S+1],b),we(t[S+K],t[S+K+1],b),y)},ae=(t,o)=>t<Re||t>ut||o>ie?Math.max(0,Y-Kt(o)):Gt(p0,t,o),jt=(t,o)=>t<Re||t>ut||o>ie?Kt(o):Gt(Q0,t,o);if(t0){Y=tt(-2.4);for(let t=0;t<144;t++)Y=tt(-2.4+t*Le),Z0(Le,Ye.Ks),t%4===3&&Y0(Le*4);Y=tt(0),u0=0,ts()}const Ne=[],oo=t=>{ot<16?(Ue[ot*4]=t.x,Ue[ot*4+1]=t.z,Ue[ot*4+2]=t.s*.9,ot++):(Ue.copyWithin(0,4),Ue[60]=t.x,Ue[61]=t.z,Ue[62]=t.s*.9)},at=(t,o,s,a=0,i=!0)=>{for(let c=0;c<20;c++){const x=f(.7,2.9,l),b=f(-.85,.85,l)*Me(x);if(Ne.some(S=>Math.hypot(S.x-b,S.z-x)<.12)||qo(b,x,1.5))continue;const y={x:b,z:x,kind:t,s:o,hd:f(0,M,l),sink:s,v:a,drop:0,scour:0,anim:f(0,M,l)};return Ne.push(y),i&&o>.012&&oo(y),y}return null},ns=3+Math.floor(l()*4)+(O==="Pink shell sand"?4:0);for(let t=0;t<ns;t++){const o=Z([[0,50],[1,O==="Dark volcanic"?10:22],[2,O==="Dark volcanic"?40:20]],l);at(o,o===2?f(.012,.028,l):f(.012,.02,l),o===2?f(.002,.008,l):f(0,.003,l),l()<.5?1:0)}if(N==="Razor shells")for(let t=0;t<5+l()*4;t++)at(3,f(.05,.075,l),f(.001,.003,l),0,!1);const as=[];if(N==="Sand dollars")for(let t=0;t<7+l()*6;t++){const o=at(4,f(.025,.038,l),f(.001,.004,l),l()<.55?1:0,!1);o&&o.v&&as.push(o)}ce==="A starfish"&&(at(5,f(.05,.075,l),0,0,!1),l()<.4&&at(5,f(.035,.05,l),0,0,!1));for(const t of Ne)if(t.kind===4){const o=(t.anim/M-.5)*.4,s=o>0?-1:1;U(t.x+s*Math.sin(t.hd)*t.s*.9,t.z+s*Math.cos(t.hd)*t.s*.9,0,t.s*.75,3,.2)}let it=null;ce==="A stranded moon jelly"&&(it=at(6,f(.07,.1,l),.004,0,!0));const is={Oystercatchers:2+Math.floor(l()*3),Sanderlings:4+Math.floor(l()*4),"A grey heron":1,"A flock of godwits":9+Math.floor(l()*5)}[pe],v0={Oystercatchers:0,Sanderlings:1,"A grey heron":2,"A flock of godwits":3}[pe];for(let t=0;t<is*9;t++)l();const x0=[],rs=N==="Crab burrows"?4+Math.floor(l()*3):l()<.35?1:0;for(let t=0;t<rs;t++){const o=f(.6,2.2,l);x0.push({x:f(-.7,.7,l)*Me(o),z:o,hd:f(0,M,l),open:0,t:f(0,4,l),g:0,j:null,sz:f(.8,1.25,l),dry:f(0,6,l)})}const Vt=[],Wt=[],fs=N==="Lugworms and cockles"?9+Math.floor(l()*8):2+Math.floor(l()*3);for(let t=0;t<fs;t++){const o=f(.45,2.9,l);Vt.push({x:f(-.9,.9,l)*Me(o),z:o,g:f(.2,1,l),t:f(0,2,l),fx:f(-1,1,l),fz:f(-1,1,l),s:f(.018,.03,l),rot:f(0,1,l),dry:0})}if(N==="Lugworms and cockles")for(let t=0,o=14+Math.floor(W()*12);t<o;t++){const s=.45+2.45*W();Vt.push({x:(W()*1.8-.9)*Me(s),z:s,g:.2+.8*W(),t:2*W(),fx:W()*2-1,fz:W()*2-1,s:.016+.012*W(),rot:W(),dry:0})}const cs=N==="Lugworms and cockles"?12+Math.floor(l()*10):N==="Razor shells"?8+Math.floor(l()*6):0;for(let t=0;t<cs;t++){const o=f(.45,2.6,l);Wt.push({x:f(-.9,.9,l)*Me(o),z:o,t:f(1,12,l),razor:N==="Razor shells",dry:0,hole:0})}const Ge=[],ls=(t,o,s,a)=>{for(let i=0;i<s&&Ge.length<40;i++){const c=w()*M,x=w()*.25*a;Ge.push({x:t,y:jt(t,o)+.003,z:o,vx:Math.cos(c)*x,vy:a*(.8+w()*.5),vz:Math.sin(c)*x,r:.0012+w()*.0016})}rt.ev("squirt",.4,t)};for(const t of Vt)ae(t.x,t.z)<5e-4&&(U(t.x,t.z,t.rot*M,t.s,1,.6+.4*t.g,t.rot),U(t.x+t.fx*.07,t.z+t.fz*.07,0,.012,2,.6));for(const t of Wt)ae(t.x,t.z)<5e-4&&(U(t.x,t.z,0,t.razor?.007:.004,2,.8),t.razor&&U(t.x+.008,t.z,0,.006,2,.7));const me=z(8),R=(t,o)=>t+(o-t)*me(),X=[{step:.14,ft:.028,wide:.022,nT:3,n:26,wob:.5,probe:.09,ph:.006,bill:.075,grp:0},{step:.06,ft:.019,wide:.011,am:.8,nT:11,n:30,wob:1.1,probe:.3,ph:.0034,bill:.03,grp:.22},{step:.4,ft:.08,wide:.045,nT:1,n:16,wob:.07,probe:.04,ph:.0075,bill:.16,grp:0},{step:.12,ft:.03,wide:.022,nT:5,n:26,wob:.6,probe:.4,ph:.0055,bill:.1,grp:.45}][v0];let w0=0,so=0,no=0;X.grp&&(w0=R(1.1,2.1),so=R(-.5,.5)*Me(w0),no=R(0,M));for(let t=0;t<X.nT;t++){let o=R(.5,2.7),s=R(-1,1)*Me(o),a=R(0,M);X.grp&&(o=w0+R(-1,1)*X.grp,s=so+R(-1,1)*X.grp*2,a=no+R(-.35,.35)),v0===2&&(o=R(.6,1.2),s=R(-.6,.6)*Me(o),a=R(-.5,.5));const i=[1,.62,.85,.5,.75][t%5];for(let c=0;c<X.n;c++){if(a+=(me()-.5)*X.wob,s+=Math.sin(a)*X.step,o+=Math.cos(a)*X.step,o<be+.1||o>ie-.3){a=Math.PI-a;continue}const x=c%2?1:-1,b=s+Math.cos(a)*x*X.wide,y=o-Math.sin(a)*x*X.wide;if(Math.abs(b)<Me(y)*1.2&&ae(b,y)<.0018&&U(b,y,a+(me()-.5)*.3+x*.18,X.ft*(.92+.04*((c*7+t*3)%5)),0,R(.5,.75)*(X.am||1)*i,v0===2?1:0),me()<X.probe)for(let S=0,u=1+Math.floor(me()*3);S<u;S++){const m=s+Math.sin(a)*X.bill+(me()-.5)*.02,v=o+Math.cos(a)*X.bill+(me()-.5)*.02;ae(m,v)<.0018&&U(m,v,0,X.ph*R(.7,1.2),2,R(.45,.8)*i)}}}const ao=(t,o)=>{for(let s=0;s<3;s++)U(t.x+t.j[s*2],t.z+t.j[s*2+1],0,.0095*t.sz*t.j[6+s],2,o*t.j[9+s]*.55);U(t.x+.002,t.z-.002,0,.019*t.sz,2,.2*o)};for(const t of x0){if(t.j=[R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(.8,1.15),R(.8,1.15),R(.8,1.15),R(.55,.8),R(.55,.8),R(.55,.8)],ae(t.x,t.z)>=.0012)continue;t.open=1,t.g=1,ao(t,1);let o=t.x,s=t.z,a=t.hd+R(-1,1);for(let i=0;i<18+me()*12;i++){a+=(me()-.5)*.7,o+=Math.sin(a)*.022*t.sz,s+=Math.cos(a)*.022*t.sz;for(let c=0;c<2;c++){const x=c?1:-1,b=o+Math.cos(a)*x*.024*t.sz+(me()-.5)*.004,y=s-Math.sin(a)*x*.024*t.sz+(me()-.5)*.004;ae(b,y)<.0018&&U(b,y,0,.0028*t.sz,2,R(.3,.55))}}}const rt=(()=>{const o=[];let s=0,a=0,i=0,c=0,x=0,b=0,y=6+w()*8,S=12345;const u=()=>(S=S*1103515245+12345&2147483647,S/1073741823-1);return{ev(m,v,k){!n.sound.on||o.length>14||o.push({k:m,t:0,v:v||.5,pan:_((k||0)*.6,-.8,.8),n:1+Math.floor(w()*4),f:0,ph:0,b1:0,b2:0})},set(m,v){a=m,i=v},run(m){if(!n.sound.on){o.length=0;return}y-=m,y<0&&(y=9+w()*16,this.ev("gull",.25+w()*.2,w()*2-1));const v=Math.round(m*16e3);if(v<=0)return;const k=new Float32Array(v);for(let g=0;g<v;g++){s+=(a-s)*6e-4;const p=u();b=p-c,c+=(p-c)*.35,x+=(b-x)*.6;let D=x*s*.22;i>0&&u()>1-i*.004&&(D+=(u()*.5+.5)*.18*i),k[g]=D}for(let g=o.length-1;g>=0;g--){const p=o[g];let D=.4;for(let H=0;H<v;H++){const ue=p.t+H/16e3;let oe=0,G=0,ve=0;if(p.k==="pip"){D=p.n*.17;const T=ue%.17/.12;T<1&&(oe=3300-900*T,G=Math.sin(T*Math.PI)**.6),p.ph+=oe/16e3,ve=(Math.sin(p.ph*M)+.25*Math.sin(p.ph*M*2))*G*.2}else if(p.k==="twk"){D=p.n*.09;const T=ue%.09/.045;T<1&&(oe=4800-1200*T,G=Math.sin(T*Math.PI)),p.ph+=oe/16e3,ve=Math.sin(p.ph*M)*G*.12}else if(p.k==="kek"){D=p.n*.13;const T=ue%.13/.07;T<1&&(oe=1500-200*T,G=Math.sin(T*Math.PI)),p.ph+=oe/16e3,ve=(p.ph%1<.35?1:-.5)*G*.07}else if(p.k==="croak"){D=.55;const T=ue/D;oe=330-80*T,G=Math.sin(Math.PI*Math.min(1,T*1.2))**.5,p.ph+=oe*(1+.15*u())/16e3,ve=(p.ph%1*2-1)*G*.12}else if(p.k==="gull"){D=.75;const T=ue/D;oe=T<.25?1300+900*T/.25:2200-1100*(T-.25)/.75,G=Math.sin(Math.PI*T)**.8,p.ph+=oe*(1+.012*Math.sin(ue*40))/16e3;const D0=p.ph*M;ve=(Math.sin(D0)+.5*Math.sin(D0*2)+.25*Math.sin(D0*3))*G*.05}else if(p.k==="plop"){D=.16;const T=ue/D;oe=700-450*T,G=Math.exp(-T*5),p.ph+=oe/16e3,ve=Math.sin(p.ph*M)*G*.3+u()*Math.exp(-T*12)*.08}else if(p.k==="thud"){D=.08;const T=ue/D;G=Math.exp(-T*6),p.b1+=(u()-p.b1)*.15,ve=p.b1*G*.5}else if(p.k==="squirt"){D=.07;const T=ue/D;G=Math.exp(-T*4)*(1-Math.exp(-T*40)),p.b1+=(u()-p.b1)*.5,ve=(u()-p.b1)*G*.12}k[H]+=ve*p.v}p.t+=v/16e3,p.t>D&&o.splice(g,1)}n.sound.pcm(k,16e3,{vel:1})}}})(),ee=new Float32Array(160*20);let je=0,Xt=0,io=0;const ro=(t,o,s,a,i,c,x,b,y,S,u,m)=>{if(je>=160)return;const v=je*20;ee[v]=t,ee[v+1]=o,ee[v+2]=s,ee[v+3]=a,ee[v+4]=i,ee[v+5]=c,ee[v+6]=x,ee[v+7]=b,ee[v+8]=y,ee[v+9]=S,ee[v+10]=u,ee[v+11]=m,ee.fill(0,v+12,v+20),je++};let ft=0;const us=()=>{je=0;for(const t of Ne){if(t.kind===6)continue;const o=jt(t.x,t.z)+t.drop;ro(t.x,o,t.z,t.kind===3?t.s*1.1:t.s*1.1+.01,t.hd,2,t.kind,0,t.s,t.sink,t.v,t.kind===4?(t.anim/M-.5)*.4:0)}Xt=je;for(const t of Ge)ro(t.x,t.y,t.z,t.r*2,0,3,0,0,t.r,0,0,0);io=je},hs=(t,o,s,a)=>{if(!(a<=0)){e.useProgram(t.p),ms(t),e.uniform1i(r(t,"uMode"),o);for(let i=1;i<=5;i++)e.vertexAttribPointer(i,4,e.FLOAT,!1,80,s*80+(i-1)*16);e.drawArraysInstanced(e.TRIANGLES,0,6,a)}},b0=t=>{hs(Se.objO,t,0,t===0?io:Xt)},y0=t=>{e.uniform3fv(r(t,"uL"),E.L),e.uniform3fv(r(t,"uSunC"),E.sunC),e.uniform3fv(r(t,"uSkyZ"),E.skyZ),e.uniform3fv(r(t,"uSkyH"),E.skyH),e.uniform3fv(r(t,"uSkyS"),E.skyS),e.uniform4f(r(t,"uCl"),ps,ft*.004+ds,ft*.0015,$==="mist"?1:0),e.uniform1f(r(t,"uNight"),$==="night"?1:0)},ps=$==="mist"?.15:f(.25,.6,I),ds=f(0,10,I),fo=O==="Grey estuary mud"?[55,38,30]:[42,22,18],co=()=>{us(),e.bindVertexArray(Ot),e.bindBuffer(e.ARRAY_BUFFER,It),e.bufferData(e.ARRAY_BUFFER,ee.subarray(0,Math.max(1,je)*20),e.DYNAMIC_DRAW),e.bindFramebuffer(e.FRAMEBUFFER,es),e.viewport(0,0,_t,_t),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.clearColor(1,1,1,1),e.clear(e.COLOR_BUFFER_BIT),Xt&&(e.enable(e.BLEND),e.blendEquation(e.MIN),e.blendFunc(e.ONE,e.ONE),b0(1),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND));const t=Se.comp;if(e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,d,d),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),e.depthMask(!1),e.useProgram(t.p),e.bindVertexArray(J.vao0),P(0,Pe[Q]),P(1,yt[Ke]),P(2,a0),P(3,r0),P(4,i0[$e]),P(5,J.noiseT),P(6,X0),e.uniform1i(r(t,"uS"),0),e.uniform1i(r(t,"uE"),1),e.uniform1i(r(t,"uSh"),2),e.uniform1i(r(t,"uR"),3),e.uniform1i(r(t,"uD"),4),e.uniform1i(r(t,"uN"),5),e.uniform1i(r(t,"uOsh"),6),e.uniform3fv(r(t,"uEye"),_0),e.uniform3fv(r(t,"uF"),mt),e.uniform3fv(r(t,"uRt"),xt),e.uniform3fv(r(t,"uUp"),vt),e.uniform1f(r(t,"uTan"),ze),e.uniform1f(r(t,"uPix"),2*ze/d),e.uniform1f(r(t,"uT"),ft),y0(t),e.uniform3fv(r(t,"uAlb"),De.a),e.uniform3fv(r(t,"uAlb2"),De.b),e.uniform3fv(r(t,"uWetT"),De.w),e.uniform3fv(r(t,"uFogC"),E.fog),e.uniform3fv(r(t,"uAmb"),E.amb),e.uniform3fv(r(t,"uWatC"),fo),e.uniform4f(r(t,"uRip"),Co,De.lam,De.spk,De.mud),e.uniform4f(r(t,"uSea"),Y,Ze.amp,Ze.per,Ze.obl),e.uniform4f(r(t,"uMood"),E.mist,le?1:0,E.expo,De.shells),it?e.uniform4f(r(t,"uJel"),it.x,it.z,it.s,.1+.9*it.anim/M):e.uniform4f(r(t,"uJel"),0,0,1,0),e.uniform1f(r(t,"uShN"),d>400?6:3),Se.sky){e.enable(e.SCISSOR_TEST),e.scissor(0,0,d,H0),Ee();const o=Se.sky;e.useProgram(o.p),e.uniform1i(r(o,"uN"),5),e.uniform3fv(r(o,"uF"),mt),e.uniform3fv(r(o,"uRt"),xt),e.uniform3fv(r(o,"uUp"),vt),e.uniform1f(r(o,"uTan"),ze),y0(o),e.uniform4f(r(o,"uMood"),E.mist,le?1:0,E.expo,De.shells),e.scissor(0,l0,d,d-l0),Ee(),e.disable(e.SCISSOR_TEST)}else Ee();je&&(e.bindVertexArray(Ot),e.bindBuffer(e.ARRAY_BUFFER,It),Xt&&(e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),b0(2)),e.disable(e.BLEND),e.enable(e.DEPTH_TEST),e.depthFunc(e.LESS),e.depthMask(!0),e.enable(e.SAMPLE_ALPHA_TO_COVERAGE),b0(0),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.disable(e.DEPTH_TEST),e.depthMask(!1),e.bindVertexArray(null))},ms=t=>{P(0,Pe[Q]),P(1,yt[Ke]),P(2,a0),P(3,J.noiseT),e.uniform1i(r(t,"uS"),0),e.uniform1i(r(t,"uE"),1),e.uniform1i(r(t,"uSh"),2),e.uniform1i(r(t,"uN"),3),e.uniformMatrix4fv(r(t,"uVP"),!1,_o),e.uniform3fv(r(t,"uEye"),_0),y0(t),e.uniform3fv(r(t,"uAmb"),E.amb),e.uniform3fv(r(t,"uFogC"),E.fog),e.uniform3fv(r(t,"uWatC"),fo),e.uniform3fv(r(t,"uShT"),E.shT),e.uniform1f(r(t,"uT"),ft),e.uniform1f(r(t,"uMist"),E.mist),e.uniform1f(r(t,"uShadK"),$==="mist"?9:28),e.uniform1f(r(t,"uExpo"),E.expo),e.uniform1f(r(t,"uSize"),d),e.uniform1i(r(t,"uSteps"),d>400?64:40),e.uniform1i(r(t,"uSSteps"),d>400?40:28),e.uniform1i(r(t,"uZero"),0)};let ct=0,g0=-99,St=!1,_e=null,A0=0,zt=[0,0],Dt=[0,0],S0=!1;const lo=(t,o)=>{const[s,a]=Yt(t,o);if(s<Re+.05||s>ut-.05||a<be+.05||a>ie-.1)return;const i=Z([[0,40],[1,20],[2,30],[3,N==="Razor shells"?20:3]]),c={x:s,z:a,kind:i,s:i===3?f(.05,.07):i===2?f(.014,.026):f(.013,.02),hd:w()*M,sink:0,v:w()<.5?1:0,drop:.22,scour:0,anim:0,falling:!0};Ne.push(c),Ne.length>40&&Ne.splice(Ne.findIndex(x=>!x.falling&&x.kind<=3),1)},vs=t=>{t.falling=!1,t.drop=0;const o=ae(t.x,t.z);if(t.kind!==3&&oo(t),o>.001){At<8&&($0.set([t.x,t.z,.035,.0025],At*4),At++),rt.ev("plop",.6,t.x);for(let s=0;s<6;s++){const a=w()*M,i=.2+w()*.3;Ge.length<40&&Ge.push({x:t.x,y:jt(t.x,t.z)+o,z:t.z,vx:Math.cos(a)*i,vy:.6+w()*.6,vz:Math.sin(a)*i,r:.0015+w()*.002})}}else rt.ev("thud",.5,t.x),U(t.x,t.z,0,t.s*1.4,3,.15);for(const s of Wt)Math.hypot(s.x-t.x,s.z-t.z)<.25&&ae(s.x,s.z)<.001&&w()<.6&&(s.t=w()*.6)},xs={Oystercatchers:{D:78,v:12,call:"pip"},Sanderlings:{D:64,v:14,call:"twk"},"A grey heron":{D:150,v:7.5,call:"croak"},"A flock of godwits":{D:95,v:16,call:"kek"}},lt=z(24),Ve=(t,o)=>t+(o-t)*lt(),Ht=xs[pe],te={t:-Ve(1.2,3.5),dir:lt()<.5?-1:1,v0:Ve(.62,.94),sl:Ve(-.05,.05),ph:lt()*M,gap:0,callT:Ve(.2,1.2)},z0=()=>Ht.D*ze*1.2,ws=()=>2*z0()/Ht.v,bs=t=>{if(le)return;te.t+=t;const o=ws();if(te.t>o&&(te.t=-Ve(16,42),te.dir=lt()<.5?-1:1,te.v0=Ve(.62,.94),te.sl=Ve(-.05,.05),te.ph=lt()*M),te.t>0&&te.t<o&&(te.callT-=t,te.callT<0)){te.callT=Ve(.5,2.6);const s=(-z0()+Ht.v*te.t)*te.dir;rt.ev(Ht.call,.22+lt()*.18,_(s/z0(),-1,1))}},ys=t=>{bs(t);for(const o of x0){if(ae(o.x,o.z)>.0012){o.dry=0,o.open=0,o.g=0;continue}if(o.dry+=t,!o.open){o.dry>3+(o.x*7%1+1)*3&&(o.open=1,o.g=0);continue}o.g<1&&(o.g=Math.min(1,o.g+t*.5),ao(o,o.g))}for(const o of Vt){if(ae(o.x,o.z)>.001){o.dry=0,o.g=0;continue}o.dry+=t,!(o.dry<4)&&(o.t-=t,o.t<0&&(o.t=f(1.5,3.5),o.g=Math.min(1,o.g+.1),U(o.x,o.z,o.rot*M,o.s*(.6+.4*o.g),1,.25+.75*o.g,o.rot),o.g<.15&&U(o.x+o.fx*.07,o.z+o.fz*.07,0,.012,2,.6)))}for(const o of Wt){if(ae(o.x,o.z)>.001){o.dry=0,o.hole=0;continue}o.dry+=t,!o.hole&&o.dry>2&&(o.hole=1,U(o.x,o.z,0,o.razor?.007:.004,2,.8),o.razor&&U(o.x+.008,o.z,0,.006,2,.7)),o.t-=t,o.t<0&&o.dry>1&&(o.t=f(6,25),ls(o.x,o.z,o.razor?9:5,o.razor?1.4:1))}for(let o=Ge.length-1;o>=0;o--){const s=Ge[o];s.vy-=9.81*t,s.x+=s.vx*t,s.y+=s.vy*t,s.z+=s.vz*t,s.y<jt(s.x,s.z)&&s.vy<0&&(Ge.splice(o,1),ae(s.x,s.z)<8e-4&&U(s.x,s.z,0,.003,2,.4))}for(const o of Ne){if(o.falling){o.drop-=t*1.6,o.drop<=0&&vs(o);continue}const s=ae(o.x,o.z);if(o.kind<=2||o.kind===6){const a=Gt(d0,o.x,o.z),i=Gt(m0,o.x,o.z),c=Math.hypot(a,i);c>.05&&s>8e-4&&(o.scour+=t*c,o.scour>.08&&(o.scour=0,U(o.x-a/c*o.s*.6,o.z-i/c*o.s*.6,Math.atan2(-a,-i),o.s*2.6,4,.5))),o.kind===6&&c>.08&&s>.004&&(o.x+=a*t*.25,o.z+=i*t*.25)}o.kind===4&&o.v&&s>.002&&(o.x+=Math.sin(o.hd)*.006*t,o.z+=Math.cos(o.hd)*.006*t,o.hd+=Math.sin(ft*.1+o.anim)*t*.1,o.scour+=t,o.scour>.8&&(o.scour=0,U(o.x-Math.sin(o.hd)*o.s,o.z-Math.cos(o.hd)*o.s,o.hd,o.s*.9,5,.6))),o.kind===5&&s>.003&&(o.x+=Math.sin(o.hd)*.004*t,o.z+=Math.cos(o.hd)*.004*t)}},gs=(t,o)=>{const s=n.input,a=s.taps?s.taps():[];if(ne.s=0,s.down&&s.inside)if(g0=t,!St)St=!0,_e=null,A0=t,zt=[s.x,s.y],Dt=[s.x,s.y],S0=!0;else{if(_e!=="hold"&&Math.hypot(s.x-zt[0],s.y-zt[1])>.025&&(_e="drag"),!_e&&t-A0>.32&&(_e="hold",qe<=-4.5?bt=1:qe>=Pt+6&&(bt=-1)),_e==="drag"){const i=s.y-Dt[1];Nt=_(Nt+i*.075,-.03,.03);const[c,x]=Yt(Dt[0],Dt[1]),[b,y]=Yt(s.x,s.y),S=(b-c)/Math.max(o,.001),u=(y-x)/Math.max(o,.001),m=Math.hypot(S,u);m>.05&&(ne.x=b,ne.z=y,ne.r=_(.18+y*.06,.18,.4),ne.dx=S/m,ne.dz=u/m,ne.s=35e-5*Math.min(1,m/1.5))}_e==="hold"&&(qe=_(qe+bt*o*2.4,-5,Pt+6),(qe<=-5||qe>=Pt+6)&&(bt=-bt)),Dt=[s.x,s.y]}else if(St)!_e&&t-A0<.4&&lo(zt[0],zt[1]),St=!1,_e=null;else if(a.length&&!S0)for(const i of a)lo(i.x,i.y);s.down||(S0=!1),t-g0>14&&(Nt*=Math.exp(-o*.05)),Xe=tt(t)+Nt,Xe=_(Xe,-.024,.02),Y+=_(Xe-Y,-.011*o,.0055*o)};let As=0;const uo=(t,o)=>{if(o=_(o||1/30,0,.25),ft=t,gs(t,o),ss(),t0){const s=Y>Xe+.0015&&t-g0<8;K0=s?7:1;const a=St||s||Math.abs(Xe-Y)>.0025?2:1;gt+=o*a;let i=0;for(;gt>=Le&&i<4*a;)Z0(Le,Ye.Ks),gt-=Le,i++;gt>Le*8&&(gt=0),Y0(i*Le||Le*.5),ct&1||Ut(),ct&3||J0(4/30),ct%3===1&&os()}else ct===0&&Ut();if(ys(o),h0(),V0(qe),co(),n.sound.on&&!(ct&3)){let s=0,a=0;for(let i=0;i<K*se;i+=3){const c=p0[i],x=Math.hypot(d0[i],m0[i]);c>4e-4&&c<.008&&(s+=Math.min(x,.5)),c<.0012&&c>1e-4&&a++}rt.set(_(s/60,0,1),_(a/80,0,1)*(Y<Xe?.3:1))}rt.run(o),ct++,As=t};return t0?(Ut(),J0(.01)):Ut(),h0(),le&&(e.bindFramebuffer(e.FRAMEBUFFER,Ct[$e]),e.viewport(0,0,re,re),e.colorMask(!1,!1,!1,!0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.colorMask(!0,!0,!0,!0),e.bindFramebuffer(e.FRAMEBUFFER,null)),co(),P0&&P0.register(uo,et),uo}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
