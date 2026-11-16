// Low Tide: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/042.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(N0){N0&&function(){"use strict";const _0=new WeakMap,M=Math.PI*2,ge=Math.PI/180,q=(a,t,l)=>a<t?t:a>l?l:a,Ae=(a,t,l)=>a+(t-a)*l,Pe=(a,t,l)=>{const u=q((l-a)/(t-a),0,1);return u*u*(3-2*u)},N=192,W=160,ve=.02,Le=-1.92,Se=.3,xt=Le+N*ve,ce=Se+W*ve,le=1024,Z=48,ne=40,So=[0,.6,0],zo=32*ge,Do=25*ge,Lt=.01,o0=a=>-Lt*(a-1.2),ze=`const int NX=${N},NZ=${W}; const float CL=${ve},X0=${Le},Z0=${Se}; const vec2 DS=vec2(${N*ve},${W*ve}),TS=vec2(${N}.,${W}.);
vec2 wpos(ivec2 p){ return vec2(X0,Z0)+(vec2(p)+.5)*CL; }
`,De=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,Eo=`#version 300 es
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
}`,Fo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uN; uniform vec4 uP; uniform vec4 uDef[6]; uniform float uKind; uniform int uZ;   // uZ: never set (0)
in vec2 vUv; out vec4 o;
${ze}
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
  // the five taps in one rolled loop (one call site compiles once; P+(-e) is P-e exactly)
  float r[5];
  for(int j=0;j<5+uZ;j++) r[j]=rip(P+vec2(j==1?e:j==2?-e:0.,j==3?e:j==4?-e:0.));
  float h=r[0], hx=r[1]-r[2], hz=r[3]-r[4];
  vec2 g=vec2(hx,hz)/(2.*e);
  float lam=pow(1.-clamp(h,0.,1.),2.)*smoothstep(.45,.75,texture(uN,P*1.7+uP.z).g);
  lam=max(lam,smoothstep(.8,.95,texture(uN,P*vec2(.4,3.2)+uP.w).b)*.6);
  o=vec4(clamp(h*.8+.1,0.,1.),clamp(g/120.*.8+.5,0.,1.),lam);
}`,Ro=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF;
uniform float uDt,uSea,uT,uFric;
uniform vec4 uSw;
uniform vec4 uPush; uniform vec2 uPD;
uniform vec4 uObs[16]; uniform int uNO;
out vec4 o;
${ze}
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
}`,ko=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS,uF;
uniform float uDt,uKs,uUc,uDif,uInf;
uniform vec4 uSt[8]; uniform int uNS;
out vec4 o;
${ze}
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
}`,Mo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE,uN; uniform float uDt,uDry;
out vec4 o;
${ze}
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
}`,To=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform vec3 uL; uniform float uSoft; uniform int uN;
out vec4 o;
${ze}
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
}`,Po=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform sampler2D uD; uniform highp sampler2D uS; uniform float uDt;
out vec4 o;
${ze}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy); vec2 uv=(vec2(p)+.5)/${le}.;
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
}`,Lo=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
layout(location=0) in vec2 aQ; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
out vec2 vQ; flat out vec4 vB;
${ze}
void main(){
  vQ=aQ; vB=aB;
  float c=cos(aA.z), s=sin(aA.z);
  vec2 l=aQ*aA.w*1.25;
  vec2 w=aA.xy+vec2(l.x*c+l.y*s,-l.x*s+l.y*c);
  gl_Position=vec4((w-vec2(X0,Z0))/DS*2.-1.,0.,1.);
}`,Bo=`#version 300 es
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
}`,No=`#version 300 es
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE;
out vec4 o;
${ze}
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy)*4;
  float d=0.,b=0.; vec2 u=vec2(0.);
  for(int j=0;j<4;j+=1) for(int i=0;i<4;i+=1){ ivec2 q=p+ivec2(i,j); vec4 s=texelFetch(uS,q,0); d+=s.y; b+=s.x; u+=s.zw; }
  o=vec4(clamp(d/16./.04,0.,1.),clamp((b/16.+.04)/.08,0.,1.),clamp(u/16./1.2+.5,0.,1.));
}`,C0=`
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
}`,q0=a=>`#version 300 es
${a&4?`#define BIO
`:""}${a&8?`#define LOWV
`:""}${a&16?`#define LOWSKY
`:""}${a&32?`#define JEL
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
${ze}
${C0}
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
  float tt=uT-P.x*uSea.w+(P.y-${ce.toFixed(3)})/.55; tt+=uSea.z*(.45*sin(tt/uSea.z*.83+1.3)+.25*sin(tt/uSea.z*.37+2.9));
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
  float em=min(min(P.x-X0,${xt.toFixed(3)}-P.x),min(P.z-Z0,${ce.toFixed(3)}-P.z));
  float inD=smoothstep(.0,.12,em);
  float sw0=0.,sw1=0.; for(int i=0;i<2+uZ0;i++){ float w=swash(P.xz+vec2(0.,.02*float(i))); if(i==0) sw0=w; else sw1=w; }
  float bF=${Lt}*(1.2-P.z), dF=max(uSea.x+sw0-bF,0.);
#ifdef LOWV
  // beyond the patch: a sheet of water at the tide's edge, then the far bar of wet sand (just over mid tide, its long hollows
  // holding sheets of water), then the sea; the bores die out over the sheet
  float zf=P.z-${ce.toFixed(3)};
  float fn=texture(uN,P.xz*vec2(.011,.034)+.17).g, fn2=texture(uN,P.xz*vec2(.045,.12)+.53).b;
  bF=mix(bF,mix(-.0018,uSea.x,.6)+.0075-.017*smoothstep(.44,.41,fn)+(fn-.5)*.008+(fn2-.5)*.002,smoothstep(.8,6.,zf));
  bF=mix(bF,-.06,smoothstep(150.,190.,P.z));
  sw0*=exp(-max(zf,0.)*.3); sw1*=exp(-max(zf,0.)*.3);
  dF=max(uSea.x+sw0-bF,0.);
#endif
  float b=mix(bF,sv.x,inD), dep=mix(dF,sv.y,inD);
  vec2 gb=mix(vec2(0.,-${Lt}),vec2(sgx.x,sgz.x)/CL,inD);
  float swz=(sw1-sw0)/.02;
  vec2 gd=mix(vec2(0.,swz),vec2(sgx.y,sgz.y)/CL,inD);
  vec2 vel=sv.zw*inD;
  vec4 E=texture(uE,uv); float wet=mix(1.,E.y,inD), foam=E.x*inD;
#ifdef LOWV
  wet=mix(wet,.42,smoothstep(2.,7.,P.z-${ce.toFixed(3)}));   // the far bar is damp, matt sand: only its sheets of water are mirrors
#endif
  vec4 S2=texture(uSh,uv); float sh=mix(1.,S2.r,inD), cav=mix(.5,S2.g,inD);
  // detail: decals (central differences keep the slope continuous) and ripples
  vec4 n1=texture(uN,P.xz*.37), n2=texture(uN,P.xz*1.9+.21);
  float tx=1./${le}.;
  vec4 D=texture(uD,uv);
  float Dxp=dH(texture(uD,uv+vec2(tx,0.))), Dxm=dH(texture(uD,uv-vec2(tx,0.))), Dzp=dH(texture(uD,uv+vec2(0.,tx))), Dzm=dH(texture(uD,uv-vec2(0.,tx)));
  float hdc=dH(D)*inD; vec2 gdc=vec2(Dxp-Dxm,Dzp-Dzm)/(2.*tx*DS)*inD;
  vec4 R=texture(uR,uv);
  float amp=uRip.x*(1.-D.b*inD);
#ifdef LOWV
  amp*=1.-smoothstep(.5,5.,P.z-${ce.toFixed(3)});   // far out the ripples are only a sheen: their mip-averaged slopes would draw contour lines
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
  rs=mix(rs,1.,smoothstep(.3,3.,P.z-${ce.toFixed(3)}));   // the ripples' shadows fetched at a fixed level alias far out: the far flat has none
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
  wa=mix(wa,.012,smoothstep(.5,4.,P.z-${ce.toFixed(3)}));   // the far sheets are still: mip-averaged wavelets would draw grain in the mirror
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
}`,_o=`#version 300 es
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
}`,Co=a=>`#version 300 es
${a&1?`#define STAR
`:""}${a&2?`#define DOL
`:""}${a&4?`#define BIO
`:""}precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
precision highp float; precision highp int;
uniform highp sampler2D uS; uniform sampler2D uE,uSh,uN;
uniform vec3 uEye,uAmb,uFogC,uWatC; uniform mat4 uVP; uniform int uMode,uSteps,uSSteps,uZero; uniform float uT,uMist,uShadK;
uniform vec3 uShT; uniform float uExpo,uSize;
in vec3 vW; flat in vec4 vA,vB,vC,vD,vE; out vec4 o;
${ze}
${C0}
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
}`;function fe(a,t,l){const u=(f,I)=>{const X=a.createShader(f);return a.shaderSource(X,I),a.compileShader(X),X},g=a.createProgram(),S=u(a.VERTEX_SHADER,t),w=u(a.FRAGMENT_SHADER,l);return a.attachShader(g,S),a.attachShader(g,w),a.linkProgram(g),{p:g,sh:[S,w],u:null}}function Bt(a,t,l){if(!a.getProgramParameter(t.p,a.LINK_STATUS))throw new Error("042 "+l+": "+a.getProgramInfoLog(t.p)+" "+a.getShaderInfoLog(t.sh[0])+" "+a.getShaderInfoLog(t.sh[1]));t.u={};const u=a.getProgramParameter(t.p,a.ACTIVE_UNIFORMS);for(let g=0;g<u;g++){const S=a.getActiveUniform(t.p,g),w=S.name.replace(/\[0\]$/,"");t.u[w]=a.getUniformLocation(t.p,S.name)}}const qo=["noise","rip","flux","state","efs","shad","du","dst","down"],Io=(a,t,l)=>{for(const u in t.var)if((u&l)===l&&(u&8)===(l&8))return t.var[u];return t.var[l]={comp:fe(a,De,q0(l)),objO:fe(a,_o,Co(l)),sky:l&8?fe(a,De,q0(l|16)):null}};function Oo(a){let t=_0.get(a);return t||(t={var:{},vao0:a.createVertexArray(),ok:!1},t.cbf=!!a.getExtension("EXT_color_buffer_float"),t.lin=!!a.getExtension("OES_texture_float_linear"),t.hbf=t.cbf||!!a.getExtension("EXT_color_buffer_half_float"),t.quad=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,t.quad),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),a.STATIC_DRAW),_0.set(a,t),t)}function Uo(a,t){t.noise||Object.assign(t,{noise:fe(a,De,Eo),rip:fe(a,De,Fo),flux:fe(a,De,Ro),state:fe(a,De,ko),efs:fe(a,De,Mo),shad:fe(a,De,To),du:fe(a,De,Po),dst:fe(a,Lo,Bo),down:fe(a,De,No)})}function jo(a,t){if(t.ok)return;t.ok=!0;for(const u of qo)Bt(a,t[u],u);t.noiseT=I0(a,256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR,a.REPEAT);const l=O0(a,t.noiseT);a.viewport(0,0,256,256),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.useProgram(t.noise.p),a.bindVertexArray(t.vao0),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,null),a.deleteFramebuffer(l),a.bindTexture(a.TEXTURE_2D,t.noiseT),a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR_MIPMAP_LINEAR)}function I0(a,t,l,u,g,S,w,f,I){const X=a.createTexture();return a.bindTexture(a.TEXTURE_2D,X),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_ALIGNMENT,1),typeof I=="number"?a.texStorage2D(a.TEXTURE_2D,I,u,t,l):a.texImage2D(a.TEXTURE_2D,0,u,t,l,0,g,S,I||null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,w),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,w===a.NEAREST?a.NEAREST:a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,f||a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,f||a.CLAMP_TO_EDGE),X}function O0(a,t){const l=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,l),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,t,0),l}const U0=typeof FinalizationRegistry=="function"?new FinalizationRegistry(a=>{const t=a();try{t.tex.forEach(l=>t.gl.deleteTexture(l)),t.fbo.forEach(l=>t.gl.deleteFramebuffer(l)),t.buf.forEach(l=>t.gl.deleteBuffer(l)),t.vao.forEach(l=>t.gl.deleteVertexArray(l))}catch{}}):null,Nt=(a,t,l)=>{let u=a*374761393+t*668265263+l*1442695041|0;return u=Math.imul(u^u>>>13,1274126177),u^=u>>>16,(u>>>0)/4294967296},Go=(a,t,l)=>{const u=Math.floor(a),g=Math.floor(t),S=a-u,w=t-g,f=S*S*(3-2*S),I=w*w*(3-2*w),X=Nt(u,g,l),J=Nt(u+1,g,l),c=Nt(u,g+1,l),j=Nt(u+1,g+1,l);return X+(J-X)*f+(c-X)*I+(X-J-c+j)*f*I},je=(a,t,l,u)=>{let g=0,S=.5,w=1,f=0;for(let I=0;I<l;I++)g+=S*Go(a*w,t*w,u+I*7),f+=S,S*=.5,w*=2.03;return g/f},_t=(a,t,l)=>{const u=[0,-Math.sin(t),Math.cos(t)],g=[0,Math.cos(t),Math.sin(t)],S=[1,0,0],w=Math.tan(l),f=(()=>{const U=1/w,F=[S[0],g[0],-u[0],0,S[1],g[1],-u[1],0,S[2],g[2],-u[2],0,-(S[0]*a[0]+S[1]*a[1]+S[2]*a[2]),-(g[0]*a[0]+g[1]*a[1]+g[2]*a[2]),u[0]*a[0]+u[1]*a[1]+u[2]*a[2],1],C=[U,0,0,0,0,U,0,0,0,0,(30+.03)/(.03-30),-1,0,0,2*30*.03/(.03-30),0],xe=new Float32Array(16);for(let Be=0;Be<4;Be++)for(let ue=0;ue<4;ue++){let he=0;for(let Ee=0;Ee<4;Ee++)he+=C[Ee*4+ue]*F[Be*4+Ee];xe[Be*4+ue]=he}return xe})(),I=(c,j,U)=>{const F=f,C=F[3]*c+F[7]*j+F[11]*U+F[15];return[(F[0]*c+F[4]*j+F[8]*U+F[12])/C,(F[1]*c+F[5]*j+F[9]*U+F[13])/C]};return{EYE:a,CF:u,CU:g,CR:S,TANF:w,VP:f,proj:I,toGround:(c,j)=>{const U=c*2-1,F=1-j*2,C=[u[0]+U*w*S[0]+F*w*g[0],u[1]+U*w*S[1]+F*w*g[1],u[2]+U*w*S[2]+F*w*g[2]],xe=a[1]/Math.max(-C[1],.02);return[a[0]+C[0]*xe,a[2]+C[2]*xe]},halfW:c=>{const j=I(1,0,c);return .88/Math.max(Math.abs(j[0]),.001)}}};N0.add({num:42,name:"Low Tide",fam:"Worlds",recipe:"A patch of tidal sand in low sun, where the water floods the ripples, drains back through channels it cuts and wipes out the tracks birds and crabs left behind. What lives there and the tide change every mint. Drag down to push the tide in or up to let it go out, tap to drop a shell or pebble, or hold to bring the sun down through gold to pink.",interactive:"Drag down toward you to push the flood tide in, drag up to let it ebb; the water also follows your stroke. Tap to drop a shell or pebble and the water scours round it. Hold to bring the sun down through gold to pink.",music:!0,gl:!0,fps:30,seed:0,make(a){const t=a.gl,l=a.size,u=Oo(t),g=a.hash.slice(2),S=e=>{let o=parseInt(g.slice(e,e+8),16)>>>0,s=parseInt(g.slice(e+8,e+16),16)>>>0,n=parseInt(g.slice(e+16,e+24),16)>>>0,r=2654435769;const i=()=>{o>>>=0,s>>>=0,n>>>=0,r=r+1831565813|0;const m=o+s+r|0;return o=s^s>>>9,s=n+(n<<3)|0,n=(n<<21|n>>>11)+m|0,(m>>>0)/4294967296};for(let m=0;m<12;m++)i();return i},w=S(0),f=S(16),I=S(32),X=S(40),J=(e,o=w)=>{let s=0;for(const r of e)s+=r[1];let n=o()*s;for(const r of e)if(n-=r[1],n<=0)return r[0];return e[e.length-1][0]},c=(e,o,s=w)=>e+(o-e)*s();let j=J([["Golden quartz",40],["Grey estuary mud",26],["Dark volcanic",20],["Pink shell sand",14]]),U=J([["Current ripples",48],["Interference ladders",30],["Smooth, rill-marked",22]]),F=J([["Braided channels",32],["Runnel and ridge",26],["Open flat",22],["Pools in the hollows",20]]),C=J([["Lugworms and cockles",36],["Crab burrows",30],["Razor shells",18],["Sand dollars",16]]),xe=J([["Oystercatchers",36],["Sanderlings",34],["A grey heron",20],["A flock of godwits",10]]),Be=J([["Golden evening",46],["Pink dusk",32],["Misty morning",22]]),ue=J([["None",70],["A starfish",14],["A stranded moon jelly",10],["Bioluminescent night tide",6]]);a.home&&(j="Golden quartz",U="Current ripples",F="Braided channels",C="Lugworms and cockles",xe="Oystercatchers",Be="Golden evening",ue="None");const he=ue==="Bioluminescent night tide";let Ee=parseInt(g.slice(48,56),16)^4378626|0;const _=()=>{Ee=Ee+1831565813|0;let e=Math.imul(Ee^Ee>>>15,1|Ee);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Vo=_(),j0=_(),s0=F;a.home||(F=j0<.17?"A tidal creek":j0<.32?"Sand bars and troughs":F),a.trait("Sand",j),a.trait("Ripples",U),a.trait("Flat",F),a.trait("Life",C),a.trait("Birds",he?"Only their prints":xe),a.trait("Light",he?"Moonlit night":Be),a.trait("Find",ue);let wt=parseInt(g.slice(32,40),16)^parseInt(g.slice(40,48),16)|0;const H=()=>{wt=wt+1831565813|0;let e=Math.imul(wt^wt>>>15,1|wt);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},G0="";let bt=G0||(a.home?"Kneeling, looking down":J([["Kneeling, looking down",58],["Standing, looking down",27],["Straight down on the ripples",15]],H));!a.home&&!G0&&Vo<.2&&!he&&(bt="Low along the flat");const yt=bt==="Low along the flat";a.trait("View",bt);const Wo="",V0=Wo||(a.home||H()<.7?"Low water":"Flooding in"),a0=V0==="Flooding in"?.0062+.004*H():0;a.trait("Tide",V0);const Fe=Io(t,u,(ue==="A starfish"?1:0)+(C==="Sand dollars"?2:0)+(he?4:0)+(yt?8:0)+(ue==="A stranded moon jelly"?32:0));Uo(t,u),t.flush();const{EYE:W0,CF:gt,CU:At,CR:St,TANF:Re,VP:Xo,proj:Ns,toGround:n0,halfW:Ne}=bt==="Standing, looking down"?_t([0,1.4,0],50*ge,25*ge):yt?_t([0,.75,0],9*ge,25*ge):bt==="Straight down on the ripples"?_t([0,.72,.6],63*ge,25*ge):_t(So,zo,Do),ke={"Golden quartz":{a:[.46,.33,.18],b:[.38,.27,.15],w:[.42,.4,.38],lam:.32,spk:.5,mud:0,shells:.006,amp:1},"Grey estuary mud":{a:[.24,.22,.19],b:[.19,.18,.16],w:[.55,.55,.57],lam:.05,spk:.05,mud:1,shells:.002,amp:.65},"Dark volcanic":{a:[.11,.1,.095],b:[.075,.07,.07],w:[.62,.62,.64],lam:0,spk:1,mud:0,shells:.004,amp:1},"Pink shell sand":{a:[.56,.4,.34],b:[.48,.33,.29],w:[.5,.45,.45],lam:.12,spk:.3,mud:0,shells:.03,amp:.9}}[j],Ho=(U==="Smooth, rill-marked"?.0028:U==="Interference ladders"?.0042:.0048)*ke.amp,X0=a.hash+(a.home?"h":""),Ge=u.bk||(u.bk=[]);let pe=null;for(let e=0;e<Ge.length;e++)if(Ge[e].k===X0){pe=Ge[e],Ge.splice(e,1),Ge.push(pe);break}const _e=N*W,Ye=pe?pe.bed:new Float32Array(_e),r0=w()*1e6|0,Je=[];if(s0==="Braided channels"){const e=2+Math.floor(w()*2);for(let s=0;s<e;s++)Je.push({x0:c(-1.1,1.1),z0:c(.5,1.4),a:c(.08,.25),f:c(1.2,2.6),p:c(0,M),w:c(.05,.09),dep:c(.006,.011)});const o=Je.length;for(let s=0;s<o;s++)if(w()<.8){const n=Je[s],r=c(n.z0+.4,2.4);Je.push({par:n,zb:r,x0:0,z0:r,a:c(.1,.3),f:c(1.5,3),p:c(0,M),w:n.w*.8,dep:n.dep*.8,sgn:w()<.5?-1:1})}}const H0=(e,o)=>e.par?H0(e.par,e.zb)+e.sgn*(o-e.zb)*.35+e.a*Math.sin(e.f*(o-e.zb)*2+e.p)*Math.min(1,(o-e.zb)*2):e.x0+e.a*Math.sin(e.f*o+e.p)+.12*Math.sin(e.f*2.3*o+e.p*1.7),Ct=[];if(s0==="Pools in the hollows"){const e=4+Math.floor(w()*4);for(let o=0;o<e;o++)Ct.push([c(-1.2,1.2),c(.7,2.7),c(.12,.3),c(.006,.012),c(.6,1.4)]);Ct.push([(H()-.5)*.7,1+H()*.45,.32+H()*.14,.012+H()*.004,.65+H()*.4])}const i0={z:c(1.7,2.3),ph:c(0,M),cut:c(-.9,.9)};F!==s0&&(Je.length=0,Ct.length=0);const O=F==="A tidal creek"?{xm:(_()-.5)*.24,zm:1.1,sl:(.16+.2*_())*(_()<.5?-1:1),a:.35+.25*_(),f:.9+.5*_(),p:_()*M,a2:.1+.07*_(),f2:2.6+1.2*_(),p2:_()*M,w:.13+.05*_(),dep:.02+.006*_(),sd:_()*1e5|0}:null,K0=e=>O.sl*(e-O.zm)+O.a*Pe(.9,2.6,e)*Math.sin(O.f*e+O.p)+O.a2*Math.sin(O.f2*e+O.p2),qt=O?(()=>{const e=O.xm-K0(O.zm);return o=>K0(o)+e})():null,$0=e=>O.w*(.85+.3*je(e*1.3,3.7,2,O.sd)),Ko=(e,o,s)=>!!O&&Math.abs(e-qt(o))<$0(o)*s,we=F==="Sand bars and troughs"?{lam:.7+.3*_(),A:.02+.015*_(),th:(15+20*_())*ge*(_()<.5?-1:1),ph:_(),dx:(_()-.5)*2.4,dz:1.2+1.6*_(),dg:_()<.5?-1:1,sd:_()*1e5|0}:null,c0=Je.length,Z0=new Float64Array(c0),Y0=new Float64Array(c0),J0=new Float64Array(c0);if(!pe)for(let e=0;e<W;e++){const o=Se+(e+.5)*ve;let s=0;for(const p of Je){if(o<p.z0)continue;const v=Math.min(1,(o-p.z0)/.35);Y0[s]=H0(p,o),J0[s]=p.w*(.6+.25*(o-p.z0)),Z0[s]=p.dep*v*(.7+.15*(o-p.z0)),s++}let n=0,r=0,i=0,m=0,h=0,b=0,A=0;if(O){n=qt(o),r=$0(o);const p=(qt(o+.1)-2*n+qt(o-.1))/.01;i=q(Math.abs(p)/1.2,0,1),m=p>0?-1:1;const v=Pe(Se-.2,Se+.25,o);h=.85+.3*je(o*1.6,1.3,2,O.sd+5),b=.75+.25*v,A=1+.5*Pe(1.5,3.4,o)}for(let p=0;p<N;p++){const v=Le+(p+.5)*ve;let x=o0(o);if(x+=(je(v*1.1,o*1.1,4,r0)-.5)*.011+(je(v*3.2,o*3.2,2,r0+50)-.5)*.003,F==="Runnel and ridge"){const y=i0.z+.18*Math.sin(v*1.3+i0.ph),d=1-.85*Math.exp(-(((v-i0.cut)/.16)**2));x+=.009*Math.exp(-(((o-y)/.22)**2))*d,x-=.011*Math.exp(-(((o-y+.42)/.17)**2))}if(F==="Open flat"&&(x+=.004*Math.sin(v*2.1+o*.7+r0)*Math.exp(-((o-1.8)**2))),we){let d=(o*Math.cos(we.th)+v*Math.sin(we.th))/we.lam+we.ph+(je(v*.32,o*.32,3,we.sd)-.5)*2.2+we.dg*Math.atan2(o-we.dz,v-we.dx)/M;const D=d-Math.floor(d),$=D<.34?Pe(0,.34,D):1-Pe(.34,1,D),me=we.A*(.8+.4*je(v*.7,o*.7,2,we.sd+9));x+=me*($-.5)+Lt*.8*(o-1.2)}if(O){const y=(v-n)/r,d=i,D=m,$=y-D*d*.35,ae=$*D>0?1-Pe(.5,.95+.12*(je(o*9,v*9,2,O.sd+3)-.5),Math.abs($)):(1-Pe(0,1.9,Math.abs($)))**1.4,V=1-Pe(.45,1.15,Math.abs(y)),ye=Ae(V,ae,d);x-=O.dep*ye*h*b*A}for(const y of Ct){const d=Math.hypot((v-y[0])*y[4],o-y[1])/y[2];x-=y[3]*Pe(1.25,.45,d)}let k=0;for(let y=0;y<s;y++){const d=v-Y0[y],D=(d/J0[y])**2;D<800&&(k=Math.max(k,Z0[y]*Math.exp(-D)))}Ye[e*N+p]=x-k}}const Y=he?"night":Be==="Golden evening"?"gold":Be==="Pink dusk"?"pink":"mist",Q0=c(-.75,-.3,I)*(I()<.3?-1:1)*(yt?.38:1),It={gold:8.5,pink:2.6,mist:7,night:22}[Y],zt=[16,9,4,1,-1.5,-5],$o=[[1,.88,.7,3.4],[1,.72,.45,3],[1,.52,.27,2.3],[1,.36,.2,1.2],[.8,.3,.25,.25],[0,0,0,0]],Zo=[[.26,.42,.74],[.3,.42,.7],[.36,.38,.62],[.38,.32,.55],[.26,.22,.42],[.08,.08,.17]],Yo=[[.78,.76,.74],[.85,.7,.6],[.9,.58,.55],[.82,.46,.52],[.55,.32,.45],[.14,.12,.22]],Jo=[[.8,.7,.5],[1,.62,.32],[1,.45,.24],[.95,.35,.3],[.6,.2,.25],[.12,.05,.1]],Ot=(e,o)=>{let s=0;for(;s<zt.length-2&&o<zt[s+1];)s++;const n=q((zt[s]-o)/(zt[s]-zt[s+1]),0,1);return e[s].map((r,i)=>Ae(r,e[s+1][i],n))},E={sunC:[0,0,0],skyZ:[0,0,0],skyH:[0,0,0],skyS:[0,0,0],amb:[0,0,0],fog:[0,0,0],shT:[0,0,0],L:[0,1,0],mist:0,expo:1},eo=e=>{const o=Math.max(e,.6)*ge;E.L=[Math.sin(Q0)*Math.cos(o),Math.sin(o),Math.cos(Q0)*Math.cos(o)];let s=Ot($o,e),n=Ot(Zo,e),r=Ot(Yo,e),i=Ot(Jo,e);if(Y==="pink"&&(n=[n[0]*1.08,n[1]*.85,n[2]*1.02],r=[r[0]*1.05,r[1]*.82,r[2]*1],i=[i[0],i[1]*.8,i[2]*1.15]),Y==="mist"){const h=[.58,.58,.58];n=n.map((b,A)=>Ae(b,h[A],.5)),r=r.map((b,A)=>Ae(b,h[A]*1.05,.55)),i=i.map((b,A)=>Ae(b,h[A],.2)),s=[s[0],Ae(s[1],.8,.3),Ae(s[2],.6,.3),s[3]*.8]}Y==="night"&&(s=[.55,.65,.85,.5*q((e+2)/6,0,1)],n=[.03,.04,.085],r=[.06,.075,.13],i=[.06,.07,.11]),E.sunC=[s[0]*s[3],s[1]*s[3],s[2]*s[3]],E.skyZ=n,E.skyH=r,E.skyS=i,E.amb=[n[0]*.38+r[0]*.22,n[1]*.38+r[1]*.22,n[2]*.38+r[2]*.22],E.fog=Y==="mist"?[r[0]*.8,r[1]*.82,r[2]*.85]:[r[0]*.8,r[1]*.8,r[2]*.8],E.mist=yt?Y==="mist"?.032:.0025:Y==="mist"?.085:Y==="night"?.02:.03;const m=Math.max(Math.sin(o),.02);for(let h=0;h<3;h++)E.shT[h]=q((E.amb[h]*.8+.02)/(E.amb[h]*.8+E.sunC[h]*m*1.6+.02),0,1);E.expo=Y==="night"?2.6:Y==="mist"?1.12:1.3+q((4-e)*.12,0,.7)};let Ve=It,Dt=-1;eo(Ve);const rt={gl:t,tex:[],fbo:[],buf:[],vao:[]},We=(e,o,s,n,r,i,m,h)=>{const b=I0(t,e,o,s,n,r,i,m,h);return rt.tex.push(b),b},Xe=e=>{const o=O0(t,e);return rt.fbo.push(o),o},l0=u.hbf,Ut=u.cbf&&u.lin?t.RGBA32F:t.RGBA16F,_s=Ut===t.RGBA32F?t.FLOAT:t.HALF_FLOAT,jt=pe?pe.init:new Float32Array(_e*4),Qo=-.0075+a0*(O?.3:yt?0:1),es=.011,ts=72,f0=a.home?Math.PI/2-.35:(w()<.5?1:-1)*Math.acos(q(c(-1,1)*.9+c(-.15,.15),-1,1))*(a0?0:1)+(a0?-.5:0),it=e=>Qo+es*(Math.sin(M*e/ts+f0+Math.PI*.5)+.35*(Math.sin(M*e/41.3+f0*1.7)-Math.sin(f0*1.7)));let Q=it(0),Qe=Q,Gt=0;const Cs=Math.max(Q+.012,.012);if(!pe){const e=new Float32Array(_e).fill(1e9),o=new Uint8Array(_e),s=new Float64Array(_e),n=new Int32Array(_e);let r=0;const i=(p,v)=>{let x=r++;for(s[x]=v,n[x]=p;x>0;){const k=x-1>>1;if(s[k]<=s[x])break;const y=s[k],d=n[k];s[k]=s[x],n[k]=n[x],s[x]=y,n[x]=d,x=k}};let m=0,h=0;const b=()=>{if(m=s[0],h=n[0],r--,r){s[0]=s[r],n[0]=n[r];let p=0;for(;;){const v=p*2+1,x=v+1;let k=p;if(v<r&&s[v]<s[k]&&(k=v),x<r&&s[x]<s[k]&&(k=x),k===p)break;const y=s[k],d=n[k];s[k]=s[p],n[k]=n[p],s[p]=y,n[p]=d,p=k}}},A=it(0);for(let p=0;p<N;p++){const v=(W-1)*N+p;o[v]=1,e[v]=Math.max(Ye[v],A),i(v,e[v])}for(;r;){b();const p=m,v=h,x=v%N,k=v/N|0;for(let y=0;y<4;y++){const d=x+(y===0?-1:y===1?1:0),D=k+(y===2?-1:y===3?1:0);if(d<0||d>=N||D<0||D>=W)continue;const $=D*N+d;o[$]||(o[$]=1,e[$]=Math.max(Ye[$],p),i($,e[$]))}}for(let p=0;p<_e;p++)jt[p*4]=Ye[p],jt[p*4+1]=Math.max(0,Math.max(e[p]-4e-4,A)-Ye[p])}const os=e=>e,Ce=[0,1].map(()=>We(N,W,Ut,t.RGBA,t.FLOAT,u.lin||Ut!==t.RGBA32F?t.LINEAR:t.NEAREST,0,os(jt))),u0=[0,1].map(()=>We(N,W,Ut,t.RGBA,t.FLOAT,t.NEAREST,0,new Float32Array(_e*4))),h0=pe?pe.einit:new Float32Array(_e*4);if(!pe)for(let e=0;e<W;e++)for(let o=0;o<N;o++){const s=e*N+o,n=Le+(o+.5)*ve,r=Se+(e+.5)*ve;h0[s*4+1]=q(1-(Ye[s]-Q-.002)*120+(je(n*4,r*4,2,9)-.5)*.8,.05,1)}pe||(Ge.push({k:X0,bed:Ye,init:jt,einit:h0}),Ge.length>4&&Ge.shift());const Et=[0,1].map(()=>We(N,W,u.hbf?t.RGBA16F:t.RGBA8,t.RGBA,u.hbf?t.FLOAT:t.UNSIGNED_BYTE,t.LINEAR,0,u.hbf?h0:null)),p0=We(N*2,W*2,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),d0=[0,1].map(()=>We(le,le,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,0,1)),m0=We(1024,1024,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR,t.MIRRORED_REPEAT,11),ss=We(Z,ne,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.NEAREST),Vt=Math.ceil(l/3),to=We(Vt,Vt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),as=Ce.map(Xe),ns=u0.map(Xe),rs=Et.map(Xe),is=Xe(p0),Wt=d0.map(Xe),cs=Xe(m0),ls=Xe(ss),fs=Xe(to);t.bindFramebuffer(t.FRAMEBUFFER,null);for(const e of Wt)t.bindFramebuffer(t.FRAMEBUFFER,e),t.viewport(0,0,le,le),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);t.bindFramebuffer(t.FRAMEBUFFER,null);const Xt=t.createBuffer();rt.buf.push(Xt),t.bindBuffer(t.PIXEL_PACK_BUFFER,Xt),t.bufferData(t.PIXEL_PACK_BUFFER,Z*ne*4,t.STREAM_READ),t.bindBuffer(t.PIXEL_PACK_BUFFER,null);const Ht=t.createBuffer(),v0=t.createBuffer();rt.buf.push(Ht,v0);const Kt=t.createVertexArray(),x0=t.createVertexArray();rt.vao.push(Kt,x0),t.bindVertexArray(Kt),t.bindBuffer(t.ARRAY_BUFFER,u.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,Ht),t.bufferData(t.ARRAY_BUFFER,160*80,t.DYNAMIC_DRAW);for(let e=1;e<=5;e++)t.enableVertexAttribArray(e),t.vertexAttribPointer(e,4,t.FLOAT,!1,80,(e-1)*16),t.vertexAttribDivisor(e,1);t.bindVertexArray(x0),t.bindBuffer(t.ARRAY_BUFFER,u.quad),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.vertexAttribDivisor(0,0),t.bindBuffer(t.ARRAY_BUFFER,v0),t.bufferData(t.ARRAY_BUFFER,2048*4,t.DYNAMIC_DRAW);for(let e=1;e<=2;e++)t.enableVertexAttribArray(e),t.vertexAttribPointer(e,4,t.FLOAT,!1,32,(e-1)*16),t.vertexAttribDivisor(e,1);t.bindVertexArray(null),jo(t,u),Fe.comp.u||(Bt(t,Fe.comp,"comp"),Bt(t,Fe.objO,"objO"),Fe.sky&&Bt(t,Fe.sky,"sky"));let oo=l,w0=l;if(Fe.sky){const e=n=>{const r=(n+.5)/l*2-1;let i=!1,m=!0;for(const h of[0,1]){const b=gt[0]+h*Re*St[0]+r*Re*At[0],A=gt[1]+h*Re*St[1]+r*Re*At[1],p=gt[2]+h*Re*St[2]+r*Re*At[2],v=A/Math.hypot(b,A,p)>-4e-4;i=i||v,m=m&&v}return[i,m]};let o=-1,s=l;for(let n=0;n<l;n++){const[r,i]=e(n);i||(o=n),r&&s===l&&(s=n)}oo=Math.min(l,o+4),w0=Math.max(0,s-3)}const ee=u,so={},de=(e,o)=>e===o&&(e!==0||1/e===1/o),Ft=e=>{t.useProgram(e.p),e.who!==so&&(e.who=so,e.uc={})},z=(e,o,s)=>{const n=e.uc;o in n&&de(n[o],s)||(n[o]=s,t.uniform1i(e.u[o],s))},P=(e,o,s)=>{const n=e.uc;o in n&&de(n[o],s)||(n[o]=s,t.uniform1f(e.u[o],s))},us=(e,o,s,n)=>{const r=e.uc;let i=r[o];i&&de(i[0],s)&&de(i[1],n)||(i||(i=r[o]=[0,0]),i[0]=s,i[1]=n,t.uniform2f(e.u[o],s,n))},Me=(e,o,s,n,r,i)=>{const m=e.uc;let h=m[o];h&&de(h[0],s)&&de(h[1],n)&&de(h[2],r)&&de(h[3],i)||(h||(h=m[o]=[0,0,0,0]),h[0]=s,h[1]=n,h[2]=r,h[3]=i,t.uniform4f(e.u[o],s,n,r,i))},L=(e,o,s)=>{const n=e.uc;let r=n[o];r&&de(r[0],s[0])&&de(r[1],s[1])&&de(r[2],s[2])||(r||(r=n[o]=[0,0,0]),r[0]=s[0],r[1]=s[1],r[2]=s[2],t.uniform3fv(e.u[o],s))},b0=(e,o,s)=>{const n=e.uc,r=n[o];if(r&&r.length===s.length){let i=0;for(;i<s.length&&de(r[i],s[i]);)i++;if(i===s.length)return;for(i=0;i<s.length;i++)r[i]=s[i]}else n[o]=Array.from(s);t.uniform4fv(e.u[o],s)},hs=(e,o,s)=>{const n=e.uc;n[o]!==s&&(n[o]=s,t.uniformMatrix4fv(e.u[o],!1,s))},B=(e,o)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,o)},qs=(e,o)=>e.u[o],et=(e,o,s,n)=>{t.bindFramebuffer(t.FRAMEBUFFER,o),t.viewport(0,0,s,n),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),Ft(e),t.bindVertexArray(ee.vao0)},Te=()=>t.drawArrays(t.TRIANGLES,0,3);{const e=ee.rip;et(e,cs,1024,1024),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),B(0,ee.noiseT),z(e,"uN",0);const o=U==="Interference ladders"?c(.11,.14):c(.12,.16);Me(e,"uP",o,c(-.35,.35),c(0,10),c(0,10));const s=new Float32Array(24);for(let n=0;n<6;n++)s[n*4]=c(Le+.3,xt-.3),s[n*4+1]=c(Se+.2,ce-.3),s[n*4+2]=U==="Smooth, rill-marked"?0:w()<.5?-1:1;b0(e,"uDef",s),P(e,"uKind",U==="Current ripples"?0:U==="Interference ladders"?1:2),Te(),t.bindTexture(t.TEXTURE_2D,m0),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR)}const qe=1/60;let ao=1,te=0,tt=0,ot=0,y0=0,Rt=0;const He=new Float32Array(64);let ct=0;const no=new Float32Array(32);let kt=0;const re={x:0,z:0,r:.25,s:0,dx:0,dz:0},st={amp:c(.0035,.0065,X),per:c(5.5,8,X),obl:c(-.5,.5,X),seed:c(0,100,X)},at={Ks:6e-4,Uc:.045,Dif:3e-5,Inf:9e-5,Fric:.0045,Dry:.022},ro=(e,o)=>{let s=ee.flux;et(s,ns[1-te],N,W),B(0,Ce[te]),B(1,u0[te]),z(s,"uS",0),z(s,"uF",1),P(s,"uDt",e),P(s,"uSea",Q),P(s,"uT",y0),P(s,"uFric",at.Fric),Me(s,"uSw",st.amp,st.per,st.obl,st.seed),Me(s,"uPush",re.x,re.z,re.r,re.s),us(s,"uPD",re.dx,re.dz),b0(s,"uObs",He),z(s,"uNO",ct),Te(),s=ee.state,et(s,as[1-te],N,W),B(0,Ce[te]),B(1,u0[1-te]),z(s,"uS",0),z(s,"uF",1),P(s,"uDt",e),P(s,"uKs",o),P(s,"uUc",at.Uc),P(s,"uDif",at.Dif),P(s,"uInf",at.Inf*ao),b0(s,"uSt",no),z(s,"uNS",kt),Te(),kt=0,te=1-te,y0+=e},io=e=>{const o=ee.efs;et(o,rs[1-tt],N,W),B(0,Ce[te]),B(1,Et[tt]),B(2,ee.noiseT),z(o,"uS",0),z(o,"uE",1),z(o,"uN",2),P(o,"uDt",e),P(o,"uDry",at.Dry*(ke.mud?.45:1)),Te(),tt=1-tt},$t=()=>{const e=ee.shad;et(e,is,N*2,W*2),B(0,Ce[te]),z(e,"uS",0),L(e,"uL",E.L),P(e,"uSoft",Y==="mist"?.25:.035),z(e,"uN",16),Te()},co=e=>{const o=ee.du;et(o,Wt[1-ot],le,le),B(0,d0[ot]),B(1,Ce[te]),z(o,"uD",0),z(o,"uS",1),P(o,"uDt",e),Te(),ot=1-ot},Ie=new Float32Array(2048);let nt=0;const G=(e,o,s,n,r,i,m=0,h=0)=>{nt>=255&&g0();const b=nt*8;Ie[b]=e,Ie[b+1]=o,Ie[b+2]=s,Ie[b+3]=n,Ie[b+4]=r,Ie[b+5]=i,Ie[b+6]=m,Ie[b+7]=h,nt++},g0=()=>{if(!nt)return;const e=ee.dst;t.bindFramebuffer(t.FRAMEBUFFER,Wt[ot]),t.viewport(0,0,le,le),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE),Ft(e),t.bindVertexArray(x0),t.bindBuffer(t.ARRAY_BUFFER,v0),t.bufferData(t.ARRAY_BUFFER,Ie.subarray(0,nt*8),t.DYNAMIC_DRAW),t.drawArraysInstanced(t.TRIANGLES,0,6,nt),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND),t.bindVertexArray(null),nt=0},lt=new Uint8Array(Z*ne*4),A0=new Float32Array(Z*ne),lo=new Float32Array(Z*ne),S0=new Float32Array(Z*ne),z0=new Float32Array(Z*ne);let ft=null;const fo=()=>{for(let e=0;e<Z*ne;e++)A0[e]=lt[e*4]/255*.04,lo[e]=lt[e*4+1]/255*.08-.04,S0[e]=(lt[e*4+2]/255-.5)*1.2,z0[e]=(lt[e*4+3]/255-.5)*1.2},uo=()=>{const e=ee.down;et(e,ls,Z,ne),B(0,Ce[te]),B(1,Et[tt]),z(e,"uS",0),z(e,"uE",1),Te()},ps=()=>{uo(),t.readPixels(0,0,Z,ne,t.RGBA,t.UNSIGNED_BYTE,lt),t.bindFramebuffer(t.FRAMEBUFFER,null),fo()},ds=()=>{ft||(uo(),t.bindBuffer(t.PIXEL_PACK_BUFFER,Xt),t.readPixels(0,0,Z,ne,t.RGBA,t.UNSIGNED_BYTE,0),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),t.bindFramebuffer(t.FRAMEBUFFER,null),ft=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0))},ms=()=>{if(!ft)return;const e=t.clientWaitSync(ft,0,0);(e===t.ALREADY_SIGNALED||e===t.CONDITION_SATISFIED)&&(t.deleteSync(ft),ft=null,t.bindBuffer(t.PIXEL_PACK_BUFFER,Xt),t.getBufferSubData(t.PIXEL_PACK_BUFFER,0,lt),t.bindBuffer(t.PIXEL_PACK_BUFFER,null),fo())},Zt=(e,o,s)=>{const n=q((o-Le)/(4*ve)-.5,0,Z-1.001),r=q((s-Se)/(4*ve)-.5,0,ne-1.001),i=n|0,m=r|0,h=n-i,b=r-m,A=m*Z+i;return Ae(Ae(e[A],e[A+1],h),Ae(e[A+Z],e[A+Z+1],h),b)},ie=(e,o)=>e<Le||e>xt||o>ce?Math.max(0,Q-o0(o)):Zt(A0,e,o),Yt=(e,o)=>e<Le||e>xt||o>ce?o0(o):Zt(lo,e,o);if(l0){Q=it(-2.4);for(let e=0;e<144;e++)Q=it(-2.4+e*qe),ro(qe,at.Ks),e%4===3&&io(qe*4);Q=it(0),y0=0,ps()}const Oe=[],ho=e=>{ct<16?(He[ct*4]=e.x,He[ct*4+1]=e.z,He[ct*4+2]=e.s*.9,ct++):(He.copyWithin(0,4),He[60]=e.x,He[61]=e.z,He[62]=e.s*.9)},ut=(e,o,s,n=0,r=!0)=>{for(let i=0;i<20;i++){const m=c(.7,2.9,f),h=c(-.85,.85,f)*Ne(m);if(Oe.some(A=>Math.hypot(A.x-h,A.z-m)<.12)||Ko(h,m,1.5))continue;const b={x:h,z:m,kind:e,s:o,hd:c(0,M,f),sink:s,v:n,drop:0,scour:0,anim:c(0,M,f)};return Oe.push(b),r&&o>.012&&ho(b),b}return null},vs=3+Math.floor(f()*4)+(j==="Pink shell sand"?4:0);for(let e=0;e<vs;e++){const o=J([[0,50],[1,j==="Dark volcanic"?10:22],[2,j==="Dark volcanic"?40:20]],f);ut(o,o===2?c(.012,.028,f):c(.012,.02,f),o===2?c(.002,.008,f):c(0,.003,f),f()<.5?1:0)}if(C==="Razor shells")for(let e=0;e<5+f()*4;e++)ut(3,c(.05,.075,f),c(.001,.003,f),0,!1);const xs=[];if(C==="Sand dollars")for(let e=0;e<7+f()*6;e++){const o=ut(4,c(.025,.038,f),c(.001,.004,f),f()<.55?1:0,!1);o&&o.v&&xs.push(o)}ue==="A starfish"&&(ut(5,c(.05,.075,f),0,0,!1),f()<.4&&ut(5,c(.035,.05,f),0,0,!1));for(const e of Oe)if(e.kind===4){const o=(e.anim/M-.5)*.4,s=o>0?-1:1;G(e.x+s*Math.sin(e.hd)*e.s*.9,e.z+s*Math.cos(e.hd)*e.s*.9,0,e.s*.75,3,.2)}let ht=null;ue==="A stranded moon jelly"&&(ht=ut(6,c(.07,.1,f),.004,0,!0));const ws={Oystercatchers:2+Math.floor(f()*3),Sanderlings:4+Math.floor(f()*4),"A grey heron":1,"A flock of godwits":9+Math.floor(f()*5)}[xe],D0={Oystercatchers:0,Sanderlings:1,"A grey heron":2,"A flock of godwits":3}[xe];for(let e=0;e<ws*9;e++)f();const E0=[],bs=C==="Crab burrows"?4+Math.floor(f()*3):f()<.35?1:0;for(let e=0;e<bs;e++){const o=c(.6,2.2,f);E0.push({x:c(-.7,.7,f)*Ne(o),z:o,hd:c(0,M,f),open:0,t:c(0,4,f),g:0,j:null,sz:c(.8,1.25,f),dry:c(0,6,f)})}const Jt=[],Qt=[],ys=C==="Lugworms and cockles"?9+Math.floor(f()*8):2+Math.floor(f()*3);for(let e=0;e<ys;e++){const o=c(.45,2.9,f);Jt.push({x:c(-.9,.9,f)*Ne(o),z:o,g:c(.2,1,f),t:c(0,2,f),fx:c(-1,1,f),fz:c(-1,1,f),s:c(.018,.03,f),rot:c(0,1,f),dry:0})}if(C==="Lugworms and cockles")for(let e=0,o=14+Math.floor(H()*12);e<o;e++){const s=.45+2.45*H();Jt.push({x:(H()*1.8-.9)*Ne(s),z:s,g:.2+.8*H(),t:2*H(),fx:H()*2-1,fz:H()*2-1,s:.016+.012*H(),rot:H(),dry:0})}const gs=C==="Lugworms and cockles"?12+Math.floor(f()*10):C==="Razor shells"?8+Math.floor(f()*6):0;for(let e=0;e<gs;e++){const o=c(.45,2.6,f);Qt.push({x:c(-.9,.9,f)*Ne(o),z:o,t:c(1,12,f),razor:C==="Razor shells",dry:0,hole:0})}const Ke=[],As=(e,o,s,n)=>{for(let r=0;r<s&&Ke.length<40;r++){const i=w()*M,m=w()*.25*n;Ke.push({x:e,y:Yt(e,o)+.003,z:o,vx:Math.cos(i)*m,vy:n*(.8+w()*.5),vz:Math.sin(i)*m,r:.0012+w()*.0016})}pt.ev("squirt",.4,e)};for(const e of Jt)ie(e.x,e.z)<5e-4&&(G(e.x,e.z,e.rot*M,e.s,1,.6+.4*e.g,e.rot),G(e.x+e.fx*.07,e.z+e.fz*.07,0,.012,2,.6));for(const e of Qt)ie(e.x,e.z)<5e-4&&(G(e.x,e.z,0,e.razor?.007:.004,2,.8),e.razor&&G(e.x+.008,e.z,0,.006,2,.7));const be=S(8),R=(e,o)=>e+(o-e)*be(),K=[{step:.14,ft:.028,wide:.022,nT:3,n:26,wob:.5,probe:.09,ph:.006,bill:.075,grp:0},{step:.06,ft:.019,wide:.011,am:.8,nT:11,n:30,wob:1.1,probe:.3,ph:.0034,bill:.03,grp:.22},{step:.4,ft:.08,wide:.045,nT:1,n:16,wob:.07,probe:.04,ph:.0075,bill:.16,grp:0},{step:.12,ft:.03,wide:.022,nT:5,n:26,wob:.6,probe:.4,ph:.0055,bill:.1,grp:.45}][D0];let F0=0,po=0,mo=0;K.grp&&(F0=R(1.1,2.1),po=R(-.5,.5)*Ne(F0),mo=R(0,M));for(let e=0;e<K.nT;e++){let o=R(.5,2.7),s=R(-1,1)*Ne(o),n=R(0,M);K.grp&&(o=F0+R(-1,1)*K.grp,s=po+R(-1,1)*K.grp*2,n=mo+R(-.35,.35)),D0===2&&(o=R(.6,1.2),s=R(-.6,.6)*Ne(o),n=R(-.5,.5));const r=[1,.62,.85,.5,.75][e%5];for(let i=0;i<K.n;i++){if(n+=(be()-.5)*K.wob,s+=Math.sin(n)*K.step,o+=Math.cos(n)*K.step,o<Se+.1||o>ce-.3){n=Math.PI-n;continue}const m=i%2?1:-1,h=s+Math.cos(n)*m*K.wide,b=o-Math.sin(n)*m*K.wide;if(Math.abs(h)<Ne(b)*1.2&&ie(h,b)<.0018&&G(h,b,n+(be()-.5)*.3+m*.18,K.ft*(.92+.04*((i*7+e*3)%5)),0,R(.5,.75)*(K.am||1)*r,D0===2?1:0),be()<K.probe)for(let A=0,p=1+Math.floor(be()*3);A<p;A++){const v=s+Math.sin(n)*K.bill+(be()-.5)*.02,x=o+Math.cos(n)*K.bill+(be()-.5)*.02;ie(v,x)<.0018&&G(v,x,0,K.ph*R(.7,1.2),2,R(.45,.8)*r)}}}const vo=(e,o)=>{for(let s=0;s<3;s++)G(e.x+e.j[s*2],e.z+e.j[s*2+1],0,.0095*e.sz*e.j[6+s],2,o*e.j[9+s]*.55);G(e.x+.002,e.z-.002,0,.019*e.sz,2,.2*o)};for(const e of E0){if(e.j=[R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(-.003,.003),R(.8,1.15),R(.8,1.15),R(.8,1.15),R(.55,.8),R(.55,.8),R(.55,.8)],ie(e.x,e.z)>=.0012)continue;e.open=1,e.g=1,vo(e,1);let o=e.x,s=e.z,n=e.hd+R(-1,1);for(let r=0;r<18+be()*12;r++){n+=(be()-.5)*.7,o+=Math.sin(n)*.022*e.sz,s+=Math.cos(n)*.022*e.sz;for(let i=0;i<2;i++){const m=i?1:-1,h=o+Math.cos(n)*m*.024*e.sz+(be()-.5)*.004,b=s-Math.sin(n)*m*.024*e.sz+(be()-.5)*.004;ie(h,b)<.0018&&G(h,b,0,.0028*e.sz,2,R(.3,.55))}}}const pt=(()=>{const o=[];let s=0,n=0,r=0,i=0,m=0,h=0,b=6+w()*8,A=12345;const p=()=>(A=A*1103515245+12345&2147483647,A/1073741823-1);return{ev(v,x,k){!a.sound.on||o.length>14||o.push({k:v,t:0,v:x||.5,pan:q((k||0)*.6,-.8,.8),n:1+Math.floor(w()*4),f:0,ph:0,b1:0,b2:0})},set(v,x){n=v,r=x},run(v){if(!a.sound.on){o.length=0;return}b-=v,b<0&&(b=9+w()*16,this.ev("gull",.25+w()*.2,w()*2-1));const x=Math.round(v*16e3);if(x<=0)return;const k=new Float32Array(x);for(let y=0;y<x;y++){s+=(n-s)*6e-4;const d=p();h=d-i,i+=(d-i)*.35,m+=(h-m)*.6;let D=m*s*.22;r>0&&p()>1-r*.004&&(D+=(p()*.5+.5)*.18*r),k[y]=D}for(let y=o.length-1;y>=0;y--){const d=o[y];let D=.4;for(let $=0;$<x;$++){const me=d.t+$/16e3;let ae=0,V=0,ye=0;if(d.k==="pip"){D=d.n*.17;const T=me%.17/.12;T<1&&(ae=3300-900*T,V=Math.sin(T*Math.PI)**.6),d.ph+=ae/16e3,ye=(Math.sin(d.ph*M)+.25*Math.sin(d.ph*M*2))*V*.2}else if(d.k==="twk"){D=d.n*.09;const T=me%.09/.045;T<1&&(ae=4800-1200*T,V=Math.sin(T*Math.PI)),d.ph+=ae/16e3,ye=Math.sin(d.ph*M)*V*.12}else if(d.k==="kek"){D=d.n*.13;const T=me%.13/.07;T<1&&(ae=1500-200*T,V=Math.sin(T*Math.PI)),d.ph+=ae/16e3,ye=(d.ph%1<.35?1:-.5)*V*.07}else if(d.k==="croak"){D=.55;const T=me/D;ae=330-80*T,V=Math.sin(Math.PI*Math.min(1,T*1.2))**.5,d.ph+=ae*(1+.15*p())/16e3,ye=(d.ph%1*2-1)*V*.12}else if(d.k==="gull"){D=.75;const T=me/D;ae=T<.25?1300+900*T/.25:2200-1100*(T-.25)/.75,V=Math.sin(Math.PI*T)**.8,d.ph+=ae*(1+.012*Math.sin(me*40))/16e3;const B0=d.ph*M;ye=(Math.sin(B0)+.5*Math.sin(B0*2)+.25*Math.sin(B0*3))*V*.05}else if(d.k==="plop"){D=.16;const T=me/D;ae=700-450*T,V=Math.exp(-T*5),d.ph+=ae/16e3,ye=Math.sin(d.ph*M)*V*.3+p()*Math.exp(-T*12)*.08}else if(d.k==="thud"){D=.08;const T=me/D;V=Math.exp(-T*6),d.b1+=(p()-d.b1)*.15,ye=d.b1*V*.5}else if(d.k==="squirt"){D=.07;const T=me/D;V=Math.exp(-T*4)*(1-Math.exp(-T*40)),d.b1+=(p()-d.b1)*.5,ye=(p()-d.b1)*V*.12}k[$]+=ye*d.v}d.t+=x/16e3,d.t>D&&o.splice(y,1)}a.sound.pcm(k,16e3,{vel:1})}}})(),oe=new Float32Array(160*20);let $e=0,e0=0,xo=0;const wo=(e,o,s,n,r,i,m,h,b,A,p,v)=>{if($e>=160)return;const x=$e*20;oe[x]=e,oe[x+1]=o,oe[x+2]=s,oe[x+3]=n,oe[x+4]=r,oe[x+5]=i,oe[x+6]=m,oe[x+7]=h,oe[x+8]=b,oe[x+9]=A,oe[x+10]=p,oe[x+11]=v,oe.fill(0,x+12,x+20),$e++};let dt=0;const Ss=()=>{$e=0;for(const e of Oe){if(e.kind===6)continue;const o=Yt(e.x,e.z)+e.drop;wo(e.x,o,e.z,e.kind===3?e.s*1.1:e.s*1.1+.01,e.hd,2,e.kind,0,e.s,e.sink,e.v,e.kind===4?(e.anim/M-.5)*.4:0)}e0=$e;for(const e of Ke)wo(e.x,e.y,e.z,e.r*2,0,3,0,0,e.r,0,0,0);xo=$e},zs=(e,o,s,n)=>{if(!(n<=0)){Ft(e),Fs(e),z(e,"uMode",o);for(let r=1;r<=5;r++)t.vertexAttribPointer(r,4,t.FLOAT,!1,80,s*80+(r-1)*16);t.drawArraysInstanced(t.TRIANGLES,0,6,n)}},R0=e=>{zs(Fe.objO,e,0,e===0?xo:e0)},k0=e=>{L(e,"uL",E.L),L(e,"uSunC",E.sunC),L(e,"uSkyZ",E.skyZ),L(e,"uSkyH",E.skyH),L(e,"uSkyS",E.skyS),Me(e,"uCl",Ds,dt*.004+Es,dt*.0015,Y==="mist"?1:0),P(e,"uNight",Y==="night"?1:0)},Ds=Y==="mist"?.15:c(.25,.6,I),Es=c(0,10,I),bo=j==="Grey estuary mud"?[55,38,30]:[42,22,18],yo=()=>{Ss(),t.bindVertexArray(Kt),t.bindBuffer(t.ARRAY_BUFFER,Ht),t.bufferData(t.ARRAY_BUFFER,oe.subarray(0,Math.max(1,$e)*20),t.DYNAMIC_DRAW),t.bindFramebuffer(t.FRAMEBUFFER,fs),t.viewport(0,0,Vt,Vt),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.depthMask(!1),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT),e0&&(t.enable(t.BLEND),t.blendEquation(t.MIN),t.blendFunc(t.ONE,t.ONE),R0(1),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND));const e=Fe.comp;if(t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,l,l),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.colorMask(!0,!0,!0,!0),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.depthMask(!1),Ft(e),t.bindVertexArray(ee.vao0),B(0,Ce[te]),B(1,Et[tt]),B(2,p0),B(3,m0),B(4,d0[ot]),B(5,ee.noiseT),B(6,to),z(e,"uS",0),z(e,"uE",1),z(e,"uSh",2),z(e,"uR",3),z(e,"uD",4),z(e,"uN",5),z(e,"uOsh",6),L(e,"uEye",W0),L(e,"uF",gt),L(e,"uRt",St),L(e,"uUp",At),P(e,"uTan",Re),P(e,"uPix",2*Re/l),P(e,"uT",dt),k0(e),L(e,"uAlb",ke.a),L(e,"uAlb2",ke.b),L(e,"uWetT",ke.w),L(e,"uFogC",E.fog),L(e,"uAmb",E.amb),L(e,"uWatC",bo),Me(e,"uRip",Ho,ke.lam,ke.spk,ke.mud),Me(e,"uSea",Q,st.amp,st.per,st.obl),Me(e,"uMood",E.mist,he?1:0,E.expo,ke.shells),ht?Me(e,"uJel",ht.x,ht.z,ht.s,.1+.9*ht.anim/M):Me(e,"uJel",0,0,1,0),P(e,"uShN",l>400?6:3),Fe.sky){t.enable(t.SCISSOR_TEST),t.scissor(0,0,l,oo),Te();const o=Fe.sky;Ft(o),z(o,"uN",5),L(o,"uF",gt),L(o,"uRt",St),L(o,"uUp",At),P(o,"uTan",Re),k0(o),Me(o,"uMood",E.mist,he?1:0,E.expo,ke.shells),t.scissor(0,w0,l,l-w0),Te(),t.disable(t.SCISSOR_TEST)}else Te();$e&&(t.bindVertexArray(Kt),t.bindBuffer(t.ARRAY_BUFFER,Ht),e0&&(t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),R0(2)),t.disable(t.BLEND),t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.depthMask(!0),t.enable(t.SAMPLE_ALPHA_TO_COVERAGE),R0(0),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.bindVertexArray(null))},Fs=e=>{B(0,Ce[te]),B(1,Et[tt]),B(2,p0),B(3,ee.noiseT),z(e,"uS",0),z(e,"uE",1),z(e,"uSh",2),z(e,"uN",3),hs(e,"uVP",Xo),L(e,"uEye",W0),k0(e),L(e,"uAmb",E.amb),L(e,"uFogC",E.fog),L(e,"uWatC",bo),L(e,"uShT",E.shT),P(e,"uT",dt),P(e,"uMist",E.mist),P(e,"uShadK",Y==="mist"?9:28),P(e,"uExpo",E.expo),P(e,"uSize",l),z(e,"uSteps",l>400?64:40),z(e,"uSSteps",l>400?40:28),z(e,"uZero",0)};let mt=0,M0=-99,Mt=!1,Ue=null,T0=0,Tt=[0,0],Pt=[0,0],P0=!1;const go=(e,o)=>{const[s,n]=n0(e,o);if(s<Le+.05||s>xt-.05||n<Se+.05||n>ce-.1)return;const r=J([[0,40],[1,20],[2,30],[3,C==="Razor shells"?20:3]]),i={x:s,z:n,kind:r,s:r===3?c(.05,.07):r===2?c(.014,.026):c(.013,.02),hd:w()*M,sink:0,v:w()<.5?1:0,drop:.22,scour:0,anim:0,falling:!0};Oe.push(i),Oe.length>40&&Oe.splice(Oe.findIndex(m=>!m.falling&&m.kind<=3),1)},Rs=e=>{e.falling=!1,e.drop=0;const o=ie(e.x,e.z);if(e.kind!==3&&ho(e),o>.001){kt<8&&(no.set([e.x,e.z,.035,.0025],kt*4),kt++),pt.ev("plop",.6,e.x);for(let s=0;s<6;s++){const n=w()*M,r=.2+w()*.3;Ke.length<40&&Ke.push({x:e.x,y:Yt(e.x,e.z)+o,z:e.z,vx:Math.cos(n)*r,vy:.6+w()*.6,vz:Math.sin(n)*r,r:.0015+w()*.002})}}else pt.ev("thud",.5,e.x),G(e.x,e.z,0,e.s*1.4,3,.15);for(const s of Qt)Math.hypot(s.x-e.x,s.z-e.z)<.25&&ie(s.x,s.z)<.001&&w()<.6&&(s.t=w()*.6)},ks={Oystercatchers:{D:78,v:12,call:"pip"},Sanderlings:{D:64,v:14,call:"twk"},"A grey heron":{D:150,v:7.5,call:"croak"},"A flock of godwits":{D:95,v:16,call:"kek"}},vt=S(24),Ze=(e,o)=>e+(o-e)*vt(),t0=ks[xe],se={t:-Ze(1.2,3.5),dir:vt()<.5?-1:1,v0:Ze(.62,.94),sl:Ze(-.05,.05),ph:vt()*M,gap:0,callT:Ze(.2,1.2)},L0=()=>t0.D*Re*1.2,Ms=()=>2*L0()/t0.v,Ts=e=>{if(he)return;se.t+=e;const o=Ms();if(se.t>o&&(se.t=-Ze(16,42),se.dir=vt()<.5?-1:1,se.v0=Ze(.62,.94),se.sl=Ze(-.05,.05),se.ph=vt()*M),se.t>0&&se.t<o&&(se.callT-=e,se.callT<0)){se.callT=Ze(.5,2.6);const s=(-L0()+t0.v*se.t)*se.dir;pt.ev(t0.call,.22+vt()*.18,q(s/L0(),-1,1))}},Ps=e=>{Ts(e);for(const o of E0){if(ie(o.x,o.z)>.0012){o.dry=0,o.open=0,o.g=0;continue}if(o.dry+=e,!o.open){o.dry>3+(o.x*7%1+1)*3&&(o.open=1,o.g=0);continue}o.g<1&&(o.g=Math.min(1,o.g+e*.5),vo(o,o.g))}for(const o of Jt){if(ie(o.x,o.z)>.001){o.dry=0,o.g=0;continue}o.dry+=e,!(o.dry<4)&&(o.t-=e,o.t<0&&(o.t=c(1.5,3.5),o.g=Math.min(1,o.g+.1),G(o.x,o.z,o.rot*M,o.s*(.6+.4*o.g),1,.25+.75*o.g,o.rot),o.g<.15&&G(o.x+o.fx*.07,o.z+o.fz*.07,0,.012,2,.6)))}for(const o of Qt){if(ie(o.x,o.z)>.001){o.dry=0,o.hole=0;continue}o.dry+=e,!o.hole&&o.dry>2&&(o.hole=1,G(o.x,o.z,0,o.razor?.007:.004,2,.8),o.razor&&G(o.x+.008,o.z,0,.006,2,.7)),o.t-=e,o.t<0&&o.dry>1&&(o.t=c(6,25),As(o.x,o.z,o.razor?9:5,o.razor?1.4:1))}for(let o=Ke.length-1;o>=0;o--){const s=Ke[o];s.vy-=9.81*e,s.x+=s.vx*e,s.y+=s.vy*e,s.z+=s.vz*e,s.y<Yt(s.x,s.z)&&s.vy<0&&(Ke.splice(o,1),ie(s.x,s.z)<8e-4&&G(s.x,s.z,0,.003,2,.4))}for(const o of Oe){if(o.falling){o.drop-=e*1.6,o.drop<=0&&Rs(o);continue}const s=ie(o.x,o.z);if(o.kind<=2||o.kind===6){const n=Zt(S0,o.x,o.z),r=Zt(z0,o.x,o.z),i=Math.hypot(n,r);i>.05&&s>8e-4&&(o.scour+=e*i,o.scour>.08&&(o.scour=0,G(o.x-n/i*o.s*.6,o.z-r/i*o.s*.6,Math.atan2(-n,-r),o.s*2.6,4,.5))),o.kind===6&&i>.08&&s>.004&&(o.x+=n*e*.25,o.z+=r*e*.25)}o.kind===4&&o.v&&s>.002&&(o.x+=Math.sin(o.hd)*.006*e,o.z+=Math.cos(o.hd)*.006*e,o.hd+=Math.sin(dt*.1+o.anim)*e*.1,o.scour+=e,o.scour>.8&&(o.scour=0,G(o.x-Math.sin(o.hd)*o.s,o.z-Math.cos(o.hd)*o.s,o.hd,o.s*.9,5,.6))),o.kind===5&&s>.003&&(o.x+=Math.sin(o.hd)*.004*e,o.z+=Math.cos(o.hd)*.004*e)}},Ls=(e,o)=>{const s=a.input,n=s.taps?s.taps():[];if(re.s=0,s.down&&s.inside)if(M0=e,!Mt)Mt=!0,Ue=null,T0=e,Tt=[s.x,s.y],Pt=[s.x,s.y],P0=!0;else{if(Ue!=="hold"&&Math.hypot(s.x-Tt[0],s.y-Tt[1])>.025&&(Ue="drag"),!Ue&&e-T0>.32&&(Ue="hold",Ve<=-4.5?Dt=1:Ve>=It+6&&(Dt=-1)),Ue==="drag"){const r=s.y-Pt[1];Gt=q(Gt+r*.075,-.03,.03);const[i,m]=n0(Pt[0],Pt[1]),[h,b]=n0(s.x,s.y),A=(h-i)/Math.max(o,.001),p=(b-m)/Math.max(o,.001),v=Math.hypot(A,p);v>.05&&(re.x=h,re.z=b,re.r=q(.18+b*.06,.18,.4),re.dx=A/v,re.dz=p/v,re.s=35e-5*Math.min(1,v/1.5))}Ue==="hold"&&(Ve=q(Ve+Dt*o*2.4,-5,It+6),(Ve<=-5||Ve>=It+6)&&(Dt=-Dt)),Pt=[s.x,s.y]}else if(Mt)!Ue&&e-T0<.4&&go(Tt[0],Tt[1]),Mt=!1,Ue=null;else if(n.length&&!P0)for(const r of n)go(r.x,r.y);s.down||(P0=!1),e-M0>14&&(Gt*=Math.exp(-o*.05)),Qe=it(e)+Gt,Qe=q(Qe,-.024,.02),Q+=q(Qe-Q,-.011*o,.0055*o)};let Bs=0;const Ao=(e,o)=>{if(o=q(o||1/30,0,.25),dt=e,Ls(e,o),ms(),l0){const s=Q>Qe+.0015&&e-M0<8;ao=s?7:1;const n=Mt||s||Math.abs(Qe-Q)>.0025?2:1;Rt+=o*n;let r=0;for(;Rt>=qe&&r<4*n;)ro(qe,at.Ks),Rt-=qe,r++;Rt>qe*8&&(Rt=0),io(r*qe||qe*.5),mt&1||$t(),mt&3||co(4/30),mt%3===1&&ds()}else mt===0&&$t();if(Ps(o),g0(),eo(Ve),yo(),a.sound.on&&!(mt&3)){let s=0,n=0;for(let r=0;r<Z*ne;r+=3){const i=A0[r],m=Math.hypot(S0[r],z0[r]);i>4e-4&&i<.008&&(s+=Math.min(m,.5)),i<.0012&&i>1e-4&&n++}pt.set(q(s/60,0,1),q(n/80,0,1)*(Q<Qe?.3:1))}pt.run(o),mt++,Bs=e};return l0?($t(),co(.01)):$t(),g0(),he&&(t.bindFramebuffer(t.FRAMEBUFFER,Wt[ot]),t.viewport(0,0,le,le),t.colorMask(!1,!1,!1,!0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.colorMask(!0,!0,!0,!0),t.bindFramebuffer(t.FRAMEBUFFER,null)),yo(),U0&&U0.register(Ao,()=>rt),Ao}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
