// Pond Water: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/205.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Eo){Eo&&function(){"use strict";const Po=new WeakMap,Nt=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
layout(std140) uniform U { vec4 uA; vec4 uB; vec4 uC; vec4 uD; vec4 uE; vec4 uF; vec4 uG; };
float Q2(float x){ return x*x; }
float Q4(float x){ x*=x; return x*x; }
`,no=Nt+`
out vec2 vP;
void main(){ vec2 p=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1)); vP=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,ro=Nt+`
layout(location=0) in vec2 a;
layout(location=1) in vec4 i0;
layout(location=2) in vec4 i1;
layout(location=3) in vec4 i2;
layout(location=4) in vec4 i3;
out vec2 vP; flat out vec4 v1; flat out vec4 v2; flat out vec4 v3; flat out vec2 vR;
void main(){
  vec2 e=a*i1.xy; vR=i0.zw;
  vec2 w=vec2(e.x*i0.z-e.y*i0.w,e.x*i0.w+e.y*i0.z)+i0.xy;
  gl_Position=vec4(w.x*2.,-w.y*2.,0.,1.);
  vP=e/i1.z; v1=i1; v2=i2; v3=i3;
}`,Uo=Nt+`
layout(location=0) in vec4 a;
layout(location=1) in vec4 b;
out vec4 vA; out vec4 vB;
void main(){ gl_Position=vec4(a.x*2.,-a.y*2.,0.,1.); vA=vec4(a.zw,0.,0.); vB=b; }`,Co=Nt+`
layout(location=0) in vec4 a;
layout(location=1) in vec4 i0;
layout(location=2) in vec4 i1;
layout(location=3) in vec4 i2;
out vec3 vC; out float vB;
void main(){
  bool dau=a.w>=1.; float sd=fract(a.w);
  vec3 q=i1.xyz, r=a.xyz+2.*cross(q,cross(q,a.xyz)+i1.w*a.xyz);
  vec3 P=r*i0.w;
  float z=i0.z+P.z-uD.x;
  float bl=uD.z*abs(z);
  float R0=i0.w*(dau?.0075:.0122*i2.z)*(.72+.62*sd);
  float pix=1./uA.x;
  float rad=sqrt(R0*R0+bl*bl+.36*pix*pix);
  float len=length(a.xyz);
  float nz=dau?.5:r.z;
  // the condenser's hollow cone comes in a little from the upper left; the limb of the ball stacks up
  float lit=(.72+.28*dot(r.xy,normalize(vec2(-.6,-.8))))*(dau?1.:(.62+.5*pow(max(1.-nz*nz,0.),2.)));
  float eng=i2.x*lit*(R0*R0+.1*pix*pix)/(rad*rad);
  if(!dau) eng*=smoothstep(i2.y+.03,i2.y-.03,a.y+.04*sin(a.x*13.)+.04*sin(a.z*17.));
  // a few cells are gold-green and catch more light
  vec3 c=mix(vec3(.26,.74,.30),vec3(.62,.82,.24),smoothstep(.55,1.,sd));
  if(dau) c=mix(vec3(.30,.86,.20),vec3(.74,.92,.26),sd);
  vC=c*eng*(dau?1.5:1.9)*(.5+1.*fract(sd*17.3));
  vB=smoothstep(1.2,4.5,bl*uA.x)*.65;
  vec2 xy=i0.xy+P.xy;
  gl_Position=vec4(xy.x*2.,-xy.y*2.,0.,1.);
  gl_PointSize=2.*rad*uA.x*1.5;
}`,No=Nt+`
layout(location=0) in vec4 a;
uniform sampler2D uW;
#ifdef EDGE
uniform vec3 uEd;
#endif
out vec3 vC; out float vB;
void main(){
  float W=uA.w, s=a.w, sz=mix(.0009,.0034,s*s*s);
  float hue=fract(s*37.7), row=fract(s*91.3);
  int r=int(row*64.)&63;
  bool swim=r>=46;
  float tt=uA.y*7.+s*2000.;
  int i0=int(floor(tt))&255;
  vec2 w=mix(texelFetch(uW,ivec2(i0,r),0).xy,texelFetch(uW,ivec2((i0+1)&255,r),0).xy,fract(tt));
  float mob=(swim?.0052:.00000155/sz)*uA.z;
  vec2 p=mod(a.xy*W+w*mob-uB.xy+W*.5,W)-W*.5;
  float zz=a.z*abs(a.z);
  p+=uB.zw*(.72+.28*a.z);
  vec2 dq=p-uC.xy; float dd=dot(dq,dq);
  p+=dq/sqrt(dd+.0006)*uC.w*exp(-dd/.07);
  float z=zz*.42;
  float R0=sz*sqrt(uA.z);
  float bl=uD.z*abs(z);
  float pix=1./uA.x;
  float rad=sqrt(R0*R0+bl*bl+.3*pix*pix);
  float eng=(R0*R0+.08*pix*pix)/(rad*rad);
  vec3 c=vec3(.62,.72,.86);
  if(hue>.86) c=vec3(.95,.72,.42); else if(hue>.74) c=vec3(.5,.86,.62); else if(hue>.66) c=vec3(.9,.86,.8);
  vC=c*eng*(swim?1.25:1.7);
#ifdef EDGE
  if(length(p-uEd.xy)>uEd.z) vC=vec3(0.);
#endif
  vB=smoothstep(1.2,4.5,bl*uA.x)*.7;
  gl_Position=vec4(p.x*2.,-p.y*2.,0.,1.);
  gl_PointSize=2.*rad*uA.x*1.5;
}`,Wo=Nt+`
layout(location=0) in vec4 a;
out vec3 vC; out float vB;
void main(){
  float pix=1./uA.x, R0=a.z*sqrt(uA.z), rad=sqrt(R0*R0+.3*pix*pix);
  vC=mix(vec3(.72,.82,.92),vec3(.95,.8,.5),fract(a.w*7.))*a.w*(R0*R0+.08*pix*pix)/(rad*rad)*2.2;
  vB=0.;
  gl_Position=vec4(a.x*2.,-a.y*2.,0.,1.);
  gl_PointSize=2.*rad*uA.x*1.5;
}`,Ge=Nt+`
in vec3 vC; in float vB; out vec4 o;
void main(){
  vec2 d=gl_PointCoord*2.-1.; float r2=dot(d,d);
  float k=mix(exp(-r2*4.2)*smoothstep(1.,.55,r2),(1.-smoothstep(.2,1.,r2))*(.46+.2*r2),vB);
  o=vec4(vC*k*uD.w,1.);
}`,Xo=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o;
uniform sampler2D uN; uniform sampler2D uT;
vec2 oct(vec3 n){
  n/=abs(n.x)+abs(n.y)+abs(n.z);
  vec2 s=vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.);
  vec2 p=n.z<0.?(1.-abs(n.yx))*s:n.xy;
  return p*.5+.5;
}
vec3 rotc(vec4 q,vec3 p){ vec3 u=-q.xyz; return p+2.*cross(u,cross(u,p)+q.w*p); }
void main(){
  float R=v1.z, blur=v1.w, net=v3.x, br=v3.y;
  float r2=dot(vP,vP), r=sqrt(r2);
  float pix=1./(R*uA.x);
  float e=max(pix*.9,blur/R+.004);
  float lit=.68+.32*dot(vP,normalize(vec2(-.6,-.8)));
  e=min(e,.16);
  float rim=(exp(-(r-1.)*(r-1.)/(e*e))*.30+exp(-(r-.984)*(r-.984)/(e*e*2.))*.07)*min(1.,(pix*.9+.006)/e);
  float tear=1.;
  vec3 c=vec3(.66,.92,.7)*rim*lit;
  if(net>.5) c*=smoothstep(v3.z+.05,v3.z-.05,rotc(v2,vec3(vP/max(r,.001),0.)).y);
  if(r<1.){
    float z=sqrt(1.-r2);
    float hz=pow(max(1.-z,0.),2.2);
    tear=net>.5?smoothstep(v3.z+.03,v3.z-.03,rotc(v2,vec3(vP,z)).y):1.;
    c+=vec3(.22,.50,.30)*(.012+.085*hz)*lit;
    if(net>.5){
      float lod=max(0.,log2(512./(3.1*R*uA.x)));
      float f=textureLod(uT,oct(rotc(v2,vec3(vP,z))),lod).r;
      float b=textureLod(uT,oct(rotc(v2,vec3(vP,-z))),lod+1.6).r;
      c+=vec3(.42,.86,.5)*(f*f*.27*(.5+.8*hz)*tear+b*.05);
    }
  } else if(net>.5){
    // flagella in the limb: a shimmer that travels with the roll
    float a=atan(vP.y,vP.x);
    vec4 n=textureLod(uN,vec2(a*2.3,r*2.+uA.y*.9)+v3.w,0.);
    float m=textureLod(uN,vec2(a*7.1,uA.y*1.7+v3.w),0.).r;
    float out1=exp(-(r-1.)/.026);
    c+=vec3(.6,.86,.66)*out1*(.05+.34*m*n.g)*lit;
  }
  o=vec4(c*br*uD.w,1.);
}`,Oo=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o;
uniform sampler2D uN;
float hs(float x){ return fract(sin(x*127.1)*43758.5453); }
void main(){
  float x=vP.x,y=vP.y,W=v2.x,roll=v2.y,cph=v2.w,flash=v3.x,sgn=v3.y,vph=v3.z,sd=v3.w;
  float L=v1.z*uA.x, px=1./L, cr=cos(roll), sr=sin(roll);
  float xc=clamp(x,-1.,1.);
  // it lies at a slant in the drop: one end can be sharper than the other
  float blur=abs(v2.z+v1.w*xc);
  // a slipper: blunt nose, tapered tail, and a flat oral side that swings round as it rolls
  // blunt rounded front, widest behind the middle, drawn to a blunt cone behind; the oral groove is a shallow notch
  // on one side that comes and goes as it rolls
  float bow=W*.22*sr*(1.-xc*xc)*(.45+.55*xc)-W*.1*cr*xc*xc;
  float sdS=y-bow>0.?1.:-1.;
  float notch=.27*smoothstep(-.3,.8,sr*sdS)*exp(-Q2((xc-.2)/.32));
  float wid=W*(.92-.14*xc-.1*xc*xc)*(1.-notch);
  float t0=(y-bow)/wid;
  float ax=abs(x), ke=x>0.?2.2:1.5;
  float xk=pow(ax,ke), s2=xk+t0*t0, s=sqrt(s2);
  vec2 gv=vec2(.5*ke*xk/max(ax,.001)*sign(x),t0/wid);
  float g=length(gv)/max(s,.001);
  float d=(s-1.)/g;
  float e=max(px*.85,blur+.0052);
  float dtl=1./(1.+blur*90.);
  vec3 cool=vec3(.72,.86,1.), warm=vec3(1.,.82,.58);
  // the edge takes the oblique cone unevenly, and is never a clean line
  vec2 nrm=normalize(gv+.0001); nrm=vec2(nrm.x*vR.x-nrm.y*vR.y,nrm.x*vR.y+nrm.y*vR.x);
  float lit=.64+.5*dot(nrm,vec2(-.6,-.8));
  float ph=atan(t0,x);
  float rimN=.62+.76*texture(uN,vec2(ph*.31,sd)).g;
  vec3 c=cool*exp(-d*d/(e*e))*.46*lit*rimN;
  float arc=ph*(1.+W)*.5-(1.-W)*sin(2.*ph)*.25;
  float tail=smoothstep(-.72,-.98,x);
  // cilia: a hair per spacing, leaning with the travelling wave; the wave reverses when the cilia do
  if(d>-.01){
    float K=62.;
    float wav=sin(arc*13.-cph)*.5+.5*sin(arc*7.3-cph*.7+1.);
    float q=arc*K+wav*(max(d,0.)/.09)*1.1*(.5+sgn*.5*wav);
    float i=floor(q+.5), f=q-i;
    float len=(.070+.034*hs(i))*(1.+.95*tail);
    float fw=clamp(K*2.*px,0.,1.);
    float li=mix(exp(-f*f/.07),.42,fw);
    float cil=li*smoothstep(len,len*.25,d)*smoothstep(-.012,.004,d)*dtl;
    c+=cool*cil*.40*(.62+.55*wav)*(.55+.6*lit);
    if(flash>.01){
      // discharged trichocysts: long straight needles from the pellicle
      float qq=arc*44.+sd*9.;
      float j=floor(qq+.5), ff=qq-j;
      float lj=(.2+.28*hs(j+3.))*smoothstep(0.,.25,flash);
      float nd=exp(-ff*ff/.012)*smoothstep(lj,lj*.8,d)*smoothstep(-.01,.01,d);
      c+=vec3(.85,.93,1.)*nd*.5*(.25+.75*flash);
    }
  }
  if(s<1.){
    float ins=smoothstep(1.,1.-max(e,.015),s);
    float h=sqrt(max(1.-s2,0.));
    float t=clamp(t0/sqrt(max(1.-xk,.02)),-1.,1.);
    float th=asin(t), pf=th+roll, pb=3.14159-th+roll;
    // cytoplasm in three slices that turn with the body: dense with granules, like frosted glass
    vec2 mn=vec2(x-.05,y*cr/W-.12*sr);
    float mm=exp(-dot(mn*vec2(2.6,1.6),mn*vec2(2.6,1.6)));
    float gran=0.,cloud=0.,bur=0.;
    float lo=clamp(log2(80./L),0.,4.);
    for(int k=0;k<3;k++){
      float zk=(float(k)-1.)*.62*wid*h;
      float yy=y*cr-zk*sr;
      vec4 n=textureLod(uN,vec2(x*.25,yy*.66)+sd+float(k)*.37,lo);
      vec4 m=textureLod(uN,vec2(x*.085,yy*.2)+sd*.7+float(k)*.21,lo);
      gran+=smoothstep(.55,.9,n.r)*(k==1?1.:.72)*(1.-.8*mm);
      cloud+=m.g*m.g;
      bur+=smoothstep(.5,.95,n.a);
    }
    float edgeHaze=pow(1.-h,1.7);
    vec3 grc=mix(warm,vec3(.42,.96,.36),uD.y);
    c+=ins*dtl*gran*grc*(.40+.12*uD.y)*(.45+.75*h);
    c+=ins*mix(cool,warm,.32)*(.012+.075*cloud)*(.7+.5*h);
    c+=ins*cool*edgeHaze*(.16*lit+.05);
    if(uD.y>.5) c+=ins*vec3(.3,.8,.26)*bur*bur*.11*dtl;
    // kineties: rows of cilia bases and trichocysts on the near and far pellicle
    if(L>38.){
      float rf=pow(max(.5+.5*cos(pf*19.+x*2.6),0.),5.)*(.6+.4*cos(x*150.+pf*7.))*(.25+1.3*texture(uN,vec2(x*.3,pf*.1)+sd).g);
      float rb=pow(max(.5+.5*cos(pb*19.+x*2.6),0.),5.);
      c+=ins*cool*dtl*(rf*.08*h+rb*.025*h)*smoothstep(38.,70.,L);
    }
    // oral groove and gullet, on one side, carried round by the roll
    float th0=-.6+(xc-.7)*1.15;
    float ga=sin((pf-th0)*.5), gb=sin((pb-th0)*.5);
    float gate=smoothstep(-.14,.0,xc)*smoothstep(.92,.7,xc);
    c+=ins*cool*gate*(exp(-ga*ga/.0054)*.20+exp(-gb*gb/.012)*.06)*(.8+.4*sin(x*90.-cph*2.));
    // macronucleus
    float mr=length(mn*vec2(2.6,1.6));
    c+=ins*mix(cool,warm,.4)*exp(-Q2((mr-1.)/.12))*.035*dtl;
    // food vacuoles circling with the cyclosis
    // bounded by the uniform (12), so it stays rolled on Windows
    int nv=int(uG.w);
    for(int k=0;k<nv;k++){
      float fk=float(k)+sd*7., a0=fk*2.399+vph;
      float px0=.66*cos(a0)-.08, zz=.55*sin(a0), yy0=.55*W*sin(fk*3.7);
      float y1=yy0*cr-zz*W*sr;
      float rv=.03+.05*hs(fk)*hs(fk+.5);
      vec2 dq=vec2(x-px0,y-y1);
      float dv=length(dq);
      float ring=exp(-(dv-rv)*(dv-rv)/(.00011+e*e*.25));
      float fill=smoothstep(rv,rv*.2,dv)*(.3+1.4*textureLod(uN,dq*.5+fk,lo).g);
      vec3 vc=mix(warm,vec3(.55,.86,.4),hs(fk+2.)*.8);
      c+=ins*dtl*(ring*vc*.16*(.5+.5*zz/.55+.5)+fill*vc*.09);
    }
    // two contractile vacuoles: they fill through a star of canals, then snap shut
    for(int k=0;k<2;k++){
      float xv=k==0?.46:-.5;
      float ang=(k==0?.5:2.2)+roll;
      float ph2=fract(vph*(k==0?1.45:1.18)+float(k)*.47+sd);
      float fillv=ph2<.86?ph2/.86:(1.-ph2)/.14;
      float rv=.018+.056*fillv*fillv;
      vec2 cv=vec2(x-xv,y-(bow+wid*.72*sin(ang)));
      float vis=.45+.55*cos(ang);
      float dv=length(cv);
      float ring=exp(-(dv-rv)*(dv-rv)/(.00012+e*e*.3));
      float a=atan(cv.y,cv.x);
      float star=pow(max(.5+.5*cos(a*7.+float(k)),0.),10.)*smoothstep(rv+.15,rv,dv)*smoothstep(rv*.9,rv*1.1,dv)*(1.-fillv)*(1.-fillv);
      float hole=smoothstep(rv,rv*.6,dv)*fillv;
      c*=1.-ins*hole*vis*.7;
      c+=ins*dtl*vis*(ring*cool*.34+star*cool*.30);
    }
  }
  o=vec4(c*uD.w,1.);
}`,jo=Nt+`
in vec4 vA; in vec4 vB; out vec4 o; uniform sampler2D uN;
void main(){
  float u=vA.x,v=vA.y,w=vB.x,cc=vB.z,beat=vB.w;
  float sd=floor(vB.y)*.0193, blur=fract(vB.y);
  float px=1./(uA.x*w);
  float e=max(px*.95,blur/w+.03);
  float dtl=1./(1.+blur*90.);
  vec3 cool=vec3(.8,.87,.95), amber=vec3(1.,.64,.24);
  // telescoping sleeves: short ones at the foot, long in the trunk; each narrows to its front joint, where the next
  // one starts wider, so the outline is stepped, and wrinkled where it has pulled in
  float sg=u*14.-3.*u*u+.18*v*v+sd*3.;
  float f=fract(sg);
  float saw=f<.86?f/.86:(1.-f)/.14;
  float amp=(.035+.08*cc)*(.55+.9*smoothstep(.55,.1,u))*smoothstep(.97,.88,u);
  float wr=cc*.035*(.5+.5*sin(u*97.+sd*40.))*smoothstep(.2,.5,u);
  float av=abs(v)/(1.-amp*saw-wr);
  float side=v>0.?.86:.14;
  float rimN=.42+1.05*texture(uN,vec2(u*.55+sd,side)).g;
  vec3 c=cool*exp(-(av-1.)*(av-1.)/(e*e))*.40*rimN;
  if(av<1.){
    float ins=smoothstep(1.,1.-max(e,.04),av);
    float h=sqrt(max(1.-av*av,0.));
    float rat=mix(11.,4.2,cc);
    // the folds where one sleeve slides into the next catch the light across the body
    float jn=exp(-Q2((1.-f)/.07))+.4*exp(-Q2(f/.05));
    c+=ins*cool*jn*(.06+.10*cc)*(.35+.65*(1.-h))*smoothstep(.95,.85,u)*dtl;
    vec4 tx=texture(uN,vec2(u*.8,v*.11)+sd);
    vec4 tz=texture(uN,vec2(u*2.4,v*.34)+.47+sd);
    // the body is a cloudy, granular volume
    c+=ins*mix(cool,vec3(.95,.84,.66),.4)*(.016+.06*tx.g*tx.g+.14*smoothstep(.72,.96,tz.r)*dtl*.6);
    c+=ins*cool*.15*pow(1.-h,2.);
    // the stomach: a lumpy yellow-brown mass in the trunk, with oil drops in it
    vec4 lu=texture(uN,vec2(u*.9-uA.y*.004,v*.16)+sd*1.7);
    float sr=length(vec2((u-.5+.03*cc)/.21,v/.58))+.55*(lu.g-.5)+.25*(lu.b-.5);
    float sto=smoothstep(1.,.78,sr);
    vec4 n=texture(uN,vec2(u*1.3-uA.y*.006,v*.12)+.31+sd);
    vec4 n2=texture(uN,vec2(u*2.9+uA.y*.004,v*.22)+.13+sd);
    float gran=smoothstep(.56,.92,n.r)+.7*smoothstep(.62,.95,n2.a);
    vec3 gc=mix(amber,vec3(.62,.70,.26),n.b*.8);
    c+=ins*sto*gc*(.05+.13*n.g+.26*gran)*dtl;
    vec2 gq=vec2(u*30.,v*3.2+.5);
    vec2 gi=floor(gq);
    vec4 hq=textureLod(uN,(gi+vec2(.5,17.5)+floor(sd*200.))/256.,0.);
    vec2 dq=(fract(gq)-.5-(hq.ga-.5)*.4)*vec2(1.,.95);
    float rd=.08+.2*hq.r*hq.r;
    float oil=step(.7,hq.a)*exp(-Q2((length(dq)-rd)/.07))*smoothstep(.95,.7,sr);
    c+=ins*vec3(1.,.92,.66)*oil*.30*dtl;
    // glands flanking the mastax
    float gl=exp(-Q2((u-.68)/.06))*exp(-Q2((av-.46)/.26));
    c+=ins*vec3(.9,.86,.7)*gl*(.04+.24*smoothstep(.6,.95,n2.r))*dtl;
    // the mastax: a heart-shaped bulb behind the head with two ridged jaws that clap
    vec2 m=vec2((u-.79)*rat,v);
    vec2 hb=vec2(m.x+.12*abs(m.y)*abs(m.y)*4.,abs(m.y)-.16)/vec2(.62,.5);
    float rc=length(hb);
    c+=ins*cool*exp(-(rc-1.)*(rc-1.)/.035)*.10*dtl;
    c+=ins*vec3(.9,.88,.8)*smoothstep(1.,.4,rc)*.035*dtl;
    // two curved, ribbed jaws, never meeting in an X: they open and shut like a pair of hands clapping
    float jo=.11+.13*sqrt(abs(sin(beat)));
    float jaw=exp(-Q2((abs(m.y)-jo-m.x*m.x*2.4)/.05))*exp(-Q2(m.x/.26));
    float rib=.6+.4*cos(m.x*26.+abs(m.y)*12.);
    c+=ins*vec3(1.,.95,.82)*jaw*rib*.36*dtl;
    // a pair of small dull eyespots far back on the neck
    vec2 ey=vec2((u-.9)*rat,av-.3);
    c+=ins*vec3(.8,.3,.22)*exp(-dot(ey,ey)/.004)*.14*dtl*(1.-cc);
    // the foot ends in two short toes, glued down
    c+=ins*cool*exp(-u/.025)*(.08+.06*smoothstep(.2,.8,av))*dtl;
    c+=ins*cool*exp(-Q2((av-.52)/.17))*smoothstep(.07,.0,u)*.22*dtl;
  }
  o=vec4(c*uD.w,1.);
}`,Vo=Nt+`
in vec4 vA; in vec4 vB; out vec4 o; uniform sampler2D uN;
void main(){
  float u=vA.x,v=vA.y,w=vB.x,blur=vB.y,cp=vB.z,sd=vB.w;
  // the third number carries the strand's kind, its ribbon count and its mean cell length
  float kd=floor(cp*.01), mf=floor(cp*.1)-kd*10., cl=cp-kd*100.-mf*10.;
  float px=1./(uA.x*w), av=abs(v);
  float e=max(px*.9,blur/w+.02);
  float dtl=1./(1.+blur*90.);
  // how far this stretch of the thread has dipped out of the focal plane
  float soft=smoothstep(.03,.3,blur/w);
  // a wall thrown out of focus spreads the same light wider: it does not gain any
  float en=max(px*.9,.02)/e;
  vec3 cool=vec3(.74,.92,.84);
  float side=v>0.?.72:.21;
  // the side walls shine as clean lines
  vec3 c=cool*exp(-(av-1.)*(av-1.)/(e*e))*.24*en*(.6+.8*texture(uN,vec2(u*.11,side+sd)).g);
  if(av<1.){
    float ins=smoothstep(1.,1.-max(e,.05),av);
    float h=sqrt(max(1.-v*v,0.));
    // cells of uneven length: the cell count runs on a coordinate warped by two slow waves
    float gx=u/cl, w1=gx*1.43+sd*40., w2=gx*3.1+sd*17.;
    float g=gx+.18*sin(w1)+.065*sin(w2), gd=1.+.26*cos(w1)+.2*cos(w2);
    float ci=floor(g), fu=fract(g), cc=cl/gd;
    float hsh=fract(sin(ci*91.7+sd*31.)*437.5), hs2=fract(sin(ci*47.3+sd*13.)*917.3), hs3=fract(hsh*7.13+hs2*3.1);
    float du=min(fu,1.-fu)*cc;
    // cross walls: one straight bright line each
    float ew=max(e*.5,.012);
    c+=cool*exp(-Q2(du/ew))*.17*min(1.,.012/ew+en*.3)*(.55+.45*h)*ins;
    vec4 cy=texture(uN,vec2(u*.7,v*.3)+sd);
    c+=vec3(.3,.62,.40)*ins*(.012+.04*pow(1.-h,2.))*(.5+cy.b);
    float th=asin(clamp(v,-.999,.999));
    // each cell its own: ribbons wound tight or slackened, a few let go into a lump, a few empty
    bool empty=kd>.5||hs3<.07, lump=!empty&&hs3<.18, slack=hs3>=.18&&hs3<.32;
    float m=max(1.,mf+(hs2<.22?-1.:hs2>.86?1.:0.)-(slack?1.:0.));
    float pit=m/(1.7+1.3*fract(sd*3.7))*mix(.52,1.6,hsh)*(slack?1.9:1.);
    float sp=pit/m, kq=6.283/(4.6*sp);
    float ph=(u+.42*sin(u*kq+hs2*6.283)/kq)*6.283/pit+hsh*20.+.12*sin(u*9.+ci);
    vec4 n=texture(uN,vec2(u*.5,v*.1)+sd);
    // a thin frilled band
    float rw=.42+.07*sin(u*41.+ci)+.04*sin(u*73.+1.)+.12*(cy.g-.5)+(slack?.06:0.);
    float c1=cos(m*(th-ph))*.5+.5, c2=cos(m*(3.14159-th-ph))*.5+.5;
    float r1=smoothstep(1.-rw*.95,1.-rw*.6,c1), r2=smoothstep(1.-rw*1.3,1.-rw*.2,c2);
    r1=mix(r1,rw*.55,soft*.8); r2=mix(r2,rw*.5,soft*.8);
    vec3 gr=mix(vec3(.26,.54,.19),vec3(.50,.64,.22),n.b);
    float tx=.5+.8*n.g+.6*smoothstep(.62,.9,n.r);
    float wg=smoothstep(.02,.07,du)*(empty||lump?0.:1.);
    c+=ins*wg*dtl*gr*(r1*.30*tx*(.5+.6*h)+r2*.055*tx);
    // the ribbon edges catch the light a little more than their middles
    c+=ins*wg*dtl*gr*exp(-Q2((c1-(1.-rw*.82))/.05))*.07*(.5+.6*h)*(1.-soft);
    // pyrenoids: bright beads along the middle of each near turn
    float bd=fract(u*2.9/pit*.5+hsh*3.+th*.2);
    float pb=exp(-Q2((bd-.5)/.12))*smoothstep(1.-rw*.25,1.,c1);
    c+=ins*wg*dtl*vec3(.82,1.,.66)*pb*.5*(.5+.6*h)*(1.-soft*.7);
    // a cell that has let go: its green drawn into a ragged lump in the middle
    vec2 lq=vec2((fu-.5)*cc/max(cc*.3,.6),v*1.15);
    float lr=length(lq)+.45*(n.g-.5)+.3*(cy.r-.5);
    c+=ins*dtl*gr*(lump?1.:0.)*smoothstep(.75,.35,lr)*(.10+.14*tx)*smoothstep(.02,.07,du);
    // an empty cell keeps only a few grains
    float gq=texture(uN,vec2(u*1.9,v*.6)+sd*.3+ci*.17).r;
    c+=ins*dtl*vec3(.62,.72,.56)*(empty?1.:0.)*smoothstep(.93,.99,gq)*.18;
    // the nucleus hangs in the middle of the cell
    vec2 nc=vec2((fu-.5)*cc,v*.9);
    c+=ins*wg*dtl*vec3(.8,.9,.8)*(exp(-Q2((length(nc)-.16)/.035))*.05+exp(-dot(nc,nc)/.008)*.03);
  }
  o=vec4(c*uD.w,1.);
}`,Go=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o;
uniform sampler2D uN;
void main(){
  vec2 q=vec2(vP.x*1.3,vP.y);
  float r=length(q), a=atan(q.y,q.x), ph=v2.x, open=v2.y, sdn=v2.z;
  float px=1./(v1.z*uA.x);
  // a lobe of clear jelly fringed with cilia beating too fast to resolve: a soft bright band broken into patches that
  // run round it with the metachronal wave (what makes it look like a turning wheel). Only the front and outer edge
  // carry the band, so the pair reads as a notched crown, never as two rings
  float lean=a+(r-.8)*1.4;
  float arc=smoothstep(-.15,.8,dot(q/max(r,.001),normalize(vec2(1.,.75*sdn))));
  float bw=max(.16,px*2.2)*mix(.75,1.,open);
  float band=exp(-Q2((r-.80-.05*open)/bw));
  float pt=textureLod(uN,vec2(lean*.06-ph*.013,r*.05+v3.w),0.).g;
  float pt2=textureLod(uN,vec2(lean*.13-ph*.021,.37+v3.w),0.).g;
  float wav=.5+.5*sin(lean*9.-ph);
  float sh=.2+1.1*smoothstep(.38,.75,pt)*(.65+.35*wav)+.35*smoothstep(.45,.8,pt2);
  // the lobe itself is as clear as the water, with a faint inner edge
  float edge=exp(-Q2((r-.72)/max(.06,px*1.8)))*.03;
  vec3 c=vec3(.86,.92,1.)*(band*sh*.42*arc+edge*arc);
  o=vec4(c*open*uD.w,1.);
}`,Qo=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o; uniform sampler2D uN;
void main(){
  float x=vP.x,y=vP.y,W=v2.x,blur=v2.y,sd=v2.z,kind=v2.w;
  float px=1./(v1.z*uA.x);
  bool des=kind>1.5;
  if(des) y-=.34*(x*x-.45);
  float xc=clamp(x,-1.,1.);
  float wx=W*pow(max(1.-xc*xc,0.),kind>1.5?.62:kind>.5?.42:.72);
  float dd=abs(y)-wx;
  float s=sqrt(x*x+(y/W)*(y/W));
  float d=max(dd,(abs(x)-1.)*.4);
  // a pennate frustule seen from the girdle side: a narrow glass box with rounded corners, not a sawn bar
  bool gir=kind>.5&&kind<1.5;
  if(gir) d=length(vec2(max(abs(x)-1.+W*1.4,0.),y))-W*mix(.75,1.,smoothstep(1.,1.-W*1.4,abs(x)));
  float pk=gir?0.:1.;
  float e=max(px*.8,blur+.006);
  float dtl=1./(1.+blur*70.);
  vec3 pr=.5+.5*cos(6.283*(x*.8+y*3.+sd+vec3(0.,.33,.67)));
  vec3 c=mix(vec3(.95,.92,.82),pr,.3*pk)*exp(-d*d/(e*e))*.40*(.5+1.1*texture(uN,vec2(x*.2,sign(y)*.2+sd)).g);
  c+=mix(vec3(.9,.85,.7),pr,.5*pk)*exp(-(d+W*.16)*(d+W*.16)/(e*e*1.5))*.07;
  if(des){
    c=vec3(.7,.92,.72)*exp(-d*d/(e*e))*.3*(.5+1.1*texture(uN,vec2(x*.2,sign(y)*.2+sd)).g);
    if(d<0.){
      float ins=smoothstep(0.,-max(e,.01),d);
      vec4 n=texture(uN,vec2(x*.3,y*.5)+sd);
      float t=clamp(y/max(wx,.001),-1.,1.);
      float body=smoothstep(.92,.76,abs(x))*smoothstep(.0,.1,abs(x));
      float ridge=.65+.35*cos(t*11.);
      c+=ins*mix(vec3(.2,.68,.22),vec3(.52,.82,.2),n.b)*body*ridge*(.24+.5*n.g+.7*smoothstep(.7,.95,n.r))*dtl;
      float py=exp(-Q2((fract(abs(x)*5.)-.5)/.2))*exp(-t*t/.05)*body;
      c+=ins*vec3(.8,1.,.66)*py*.3*dtl;
      vec2 ec=vec2(abs(x)-.86,y);
      float sv=exp(-dot(ec,ec)/.0016);
      vec2 jit=vec2(textureLod(uN,vec2(uA.y*.31+sd,.1),0.).g,textureLod(uN,vec2(uA.y*.37+sd,.6),0.).g)-.5;
      vec2 cr=ec+jit*.05;
      c+=ins*sv*.3*vec3(.8,.9,.9)+ins*exp(-dot(cr,cr)/.00016)*vec3(1.,1.,.9)*.8*dtl;
    }
  } else
  if(d<0.){
    float ins=smoothstep(0.,-max(e,.01),d);
    float st=pow(max(.5+.5*cos((x+y*y*.6/W)*118.),0.),3.);
    float fs=smoothstep(.0,.5,1./(px*60.));
    float t=clamp(y/max(wx,.001),-1.,1.);
    // golden plates lying against the glass, a pair of lobes each side of the centre
    vec4 n=texture(uN,vec2(x*.14,y*.34)+sd);
    float lobes=smoothstep(.08,.2,abs(y)/W)*exp(-Q4((abs(x)-.42)/.34))*smoothstep(1.,.74,abs(t));
    vec3 gold=mix(vec3(.82,.48,.12),vec3(.92,.72,.22),n.b);
    c+=ins*gold*lobes*(.18+.42*n.g+.6*smoothstep(.7,.95,n.r))*dtl;
    c+=ins*mix(vec3(.8,.85,.8),pr,.55*pk)*st*fs*.12*pk*dtl;
    c+=ins*vec3(.9,.85,.7)*exp(-y*y/(W*W*.004))*.20*pk*dtl;
    c+=ins*vec3(.9,.8,.6)*exp(-dot(vec2(x,y/W),vec2(x,y/W))/.012)*.16*dtl;
    c+=ins*vec3(.8,.7,.5)*.02;
  }
  o=vec4(c*v3.x*uD.w,1.);
}`,Yo=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o; uniform sampler2D uT;
void main(){
  vec2 uv=(v2.xy+(vP*.5+.5))*.25;
  vec3 s=textureLod(uT,uv,v2.z).rgb;
  // a round window, so a blurred sprite never shows its square tile
  o=vec4(s*s*v2.w*.74*uD.w*smoothstep(1.,.78,length(vP)),1.);
}`,Ho=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o; uniform sampler2D uN;
void main(){
  float S=v1.w>0.?v1.w:1., r0=length(vP), r=1.-(1.-r0)/S, a=atan(vP.y,vP.x)/S;
  float px=1./(v1.z*uA.x*S);
  float lit=.55+.45*dot(vP/max(r0,.001),normalize(vec2(-.6,-.8)));
  vec3 pr=.5+.5*cos(6.283*((r-.97)*30.+vec3(0.,.33,.67)));
  float ew=max(.008,px*1.2);
  float outer=exp(-Q2((r-.988)/ew))*smoothstep(1.002,.99,r)+exp(-Q2((r-.975)/(ew*2.2)))*.5;
  float inner=exp(-Q2((r-.935)/(ew*1.6)));
  vec3 c=mix(vec3(1.),pr,.35)*outer*.95*lit+vec3(.85,.9,1.)*inner*.22*(.6+.4*lit);
  c+=vec3(.6,.7,.85)*exp(-max(r-1.,0.)/.02)*step(1.,r)*.06;
  // specks caught at the rim
  float sp=textureLod(uN,vec2(a*.9,r*.04)+.37,0.).r;
  float band=exp(-Q2((r-1.012)/.012));
  c+=vec3(.9,.88,.8)*smoothstep(.9,.98,sp)*band*.7;
  o=vec4(c*uD.w,1.);
}`,To=Nt+`
in vec2 vP; flat in vec4 v1; flat in vec4 v2; flat in vec4 v3; flat in vec2 vR; out vec4 o; uniform sampler2D uN;
float H1(float n){ return fract(sin(n*12.9898+v3.w*7.13)*43758.55); }
void main(){
  float px=1./(v1.z*uA.x), bl=v1.w, r=length(vP);
  vec3 c=vec3(0.);
#ifdef SUN
  // a sun animalcule (Actinosphaerium): a froth of clear bubbles round a grainy core, bristling with stiff, hair-fine
  // arms of uneven length and spacing that taper outwards, a few bent or beaded. v2 roll, shrink, struck side, -
  float a=atan(vP.y,vP.x), ar=a-v2.x;
  float rb=1.+.045*sin(ar*3.+v3.w*5.)+.03*sin(ar*7.+v3.w*9.);
  float rn=r/rb;
  // the froth: three rows of bubbles packed round the rim, each its own size
  float fro=0.;
  for(int k=0;k<3;k++){
    float rw=.62+.14*float(k), nb=floor(40.*rw)+float(k)*3.;
    float u=ar/6.2832*nb+float(k)*.37, iu=floor(u);
    float im=mod(iu,nb), jx=H1(im+float(k)*61.)-.5, jy=H1(im+float(k)*61.+.5)-.5, br=.055+.035*H1(im*1.7+float(k)*13.);
    vec2 bc=vec2((iu+.5+jx*.5)/nb*6.2832+v2.x, rw+jy*.06);
    vec2 bp=vec2(cos(bc.x),sin(bc.x))*bc.y*rb;
    float d=length(vP-bp)-br, w=max(.012,px)+bl;
    fro+=(exp(-Q2(d/w))*(.012/w)*.6+smoothstep(.01,-.03,d)*.05)*(.3+.7*H1(im+9.));
  }
  // the core: fine grains and a few darker food balls, faint
  float gr=texture(uN,vP*.9+v3.w).r, core=smoothstep(.66,.25,rn)*(smoothstep(.7,.97,gr)*.55+.22*texture(uN,vP*.21+v3.w).g);
  float limb=exp(-Q2((rn-1.)/(max(.02,px*1.2)+bl)))*.8;
  c+=vec3(.86,.9,.94)*fro*.7*smoothstep(1.08,.95,rn)+vec3(.95,.82,.55)*core*(1.-bl*4.)+vec3(.9,.92,.95)*limb*(.6+.4*cos(a+2.2));
  c+=vec3(.5,.55,.6)*.05*smoothstep(1.,.5,rn);
  // the arms: about ninety slots by angle, some empty, each arm off its slot's centre, its own length; the struck side
  // draws its arms in
  float N=88., u=ar/6.2832*N, iu=floor(u);
  for(int k=-1;k<=1;k++){
    float i=iu+float(k), h=H1(mod(i,N)), h2=H1(mod(i,N)+.31), h3=H1(mod(i,N)+.67);
    float th=(i+.5+(h2-.5)*.8)/N*6.2832, L=1.+(.55+1.25*h3*h3)*(h<.25?.35:1.);
    L=1.+(L-1.)*(1.-v2.y*smoothstep(-.1,.8,cos(th+v2.x-v2.z))*.85);
    float t=r, ben=(h2>.86?(h-.5)*.12:0.)*Q2(t-1.);
    float d=r*sin(a-v2.x-th-ben);
    float f=clamp((t-.95)/(L-.95),0.,1.);
    float w0=mix(.018,.006,f), w=sqrt(w0*w0+px*px*.5+bl*bl);
    float g=step(.92,t)*smoothstep(L,L-.08,t)*step(0.,cos(a-v2.x-th-ben))*step(.12,h);
    float bead=h2>.6?smoothstep(.75,.95,sin((t-uA.y*.02*(h3-.5))*55.+h*30.)):0.;
    c+=vec3(.92,.9,.84)*exp(-Q2(d/w))*(w0/w)*g*(1.-.55*f)*(1.+bead*1.6);
  }
  c*=v3.x;
#endif
#ifdef BLOOM
  // v3.z kind: 0 an Oscillatoria thread, 1 a Dolichospermum coil, 2 a Microcystis cloud. Blue-green, never grass green
  vec3 bg=vec3(.40,.62,.54), kind=vec3(v3.z==0.?1.:0.,v3.z==1.?1.:0.,v3.z==2.?1.:0.);
  if(kind.x>0.){
    // a stiff thread gliding along its length, its tip swinging: v2 half width, bend, cell length, glide phase
    float x=vP.x, y=vP.y-v2.y*x*x-v2.y*.4*x*x*x, hw=v2.x;
    float dl=length(vec2(max(abs(x)-(1.-hw),0.),y));
    float w=max(hw*.3,px)+bl;
    float edge=exp(-Q2((dl-hw)/w))*(hw*.3/w)*1.1;
    float wall=smoothstep(.75,.98,cos((x/v2.z+v2.w)*6.2832))*step(dl,hw*.8)*.5;
    float fill=smoothstep(hw,hw*.4,dl)*(.75+.25*texture(uN,vec2(x*3.,v3.w)).g);
    c=(bg*(edge*.7+wall*.35+fill*.42)+vec3(.8,.85,.8)*edge*.12)*(1.-bl*8.);
  }
  if(kind.y>0.){
    // beads wound in a coil: v2 helix radius, beads per turn, pitch per turn, bend; heterocysts larger and clear
    float x=vP.x, y=vP.y-v2.w*x*x, R=v2.x, nt=v2.y, pt=v2.z, db=6.2832/nt, br=R*db*.55;
    float k0=floor((x+1.)/(pt/nt)), acc=0.;
    for(int j=-4;j<=4;j++){
      float k=k0+float(j), th=k*db+v3.y, bx=-1.+k*pt/nt;
      float het=step(.93,H1(k)), bz=cos(th), rr=br*(het>0.?1.35:1.);
      float d=length(vec2(x-bx,y-R*sin(th)))-rr*(het>0.?1.:.75), w=max(rr*.3,px)+bl;
      acc=max(acc,step(-1.,bx)*step(bx,1.)*(het>0.?exp(-Q2(d/w))*1.2:exp(-Q2(max(d,0.)/w))*(.62+.38*exp(-Q2(d/w))))*(.5+.5*bz));
    }
    c=bg*acc*(1.-bl*5.);
  }
  if(kind.z>0.){
    // a pale lobed cloud of tiny cells in clear jelly, with holes through it
    float lob=texture(uN,vec2(atan(vP.y,vP.x)*.16,.3)+v3.w).g, rim=.72+.35*lob;
    float hole=texture(uN,vP*.45+v3.w*1.3).g, cel=texture(uN,vP*v1.z*uA.x/180.+v3.w).r;
    float m=smoothstep(rim,rim-.12,r)*smoothstep(.36,.5,hole);
    float m2=smoothstep(rim,rim-.2,r)*(.55+.45*smoothstep(.3,.55,hole));
    c=bg*(m2*(.2+.08*texture(uN,vP*.9+v3.w).g)+m*.75*smoothstep(.6,.92,cel))*(1.-bl*5.);
  }
  c*=v3.x;
#endif
  o=vec4(c*uD.w,1.);
}`,Ko=Nt+`
in vec2 vP; out vec4 o; uniform sampler2D uT; uniform vec2 uX;
void main(){
  vec3 c=texture(uT,vP+uX*vec2(-1.,-1.)).rgb+texture(uT,vP+uX*vec2(1.,-1.)).rgb+texture(uT,vP+uX*vec2(-1.,1.)).rgb+texture(uT,vP+uX*vec2(1.,1.)).rgb;
  c*=.25;
  if(!(c.r+c.g+c.b<1e4)) c=vec3(0.);
  o=vec4(c,1.);
}`,co=Nt+`
in vec2 vP; out vec4 o; uniform sampler2D uT; uniform sampler2D uQ; uniform sampler2D uS; uniform sampler2D uN;
void main(){
  vec2 p=vP-.5; p.y=-p.y;
  vec2 pf=p-uG.xy;
  float r=length(pf)/uE.w, r2=r*r;
  vec2 uv=vec2(p.x,-p.y)+.5, dir=uv-.5;
  // an achromat's colour error: nothing in the middle, a soft fringe only in the outer fifth
  float ab=uF.w*.6*Q2(smoothstep(.8,1.04,r));
  vec3 s=vec3(texture(uT,.5+dir*(1.+ab)).r,texture(uT,uv).g,texture(uT,.5+dir*(1.-ab)).b);
  vec3 q=texture(uQ,uv).rgb, wide=texture(uS,uv).rgb;
  // the field flattens imperfectly: the outer zone softens
  float cv=smoothstep(.76,1.,r);
  s=mix(s,q,cv*cv*.34);
  s=s/uD.w; q/=uD.w; wide/=uD.w;
  vec2 wp=(vec2(p.x,-p.y)+uB.xy);
#if defined(BRIGHT) || defined(DIC)
  float cl=texture(uN,wp*.43/max(uA.z,.01)+.3).b;
  vec3 lw=vec3(.3,.6,.1), col;
#endif
#ifdef BRIGHT
  // bright-field: the lamp's light comes straight through and the scene is read as density. Brightness takes light out
  // evenly (edges, glass), and what a scatterer's colour lacks is taken out per channel, so a green body stays green;
  // the blurred copy becomes a soft shadow, not a glow
  vec3 sd=s*uE.rgb+q*.1;
  vec3 lack=max(vec3(max(sd.r,max(sd.g,sd.b)))-sd,0.);
  vec3 T=exp(-.95*dot(sd,lw)-2.1*lack);
  col=uF.rgb*(1.07-.3*r2)*(.95+.1*cl)*T;
#endif
#ifdef DIC
  // interference relief: an even grey, and every body seen by the slope of its optical path, bright on the flank toward
  // the shear and dark on the far one (the same sides on every body); what is off the focal plane is smooth, so it fades
  vec2 dd=vec2(-1.,-1.)*1.3/uA.x, dq=vec2(-1.,-1.)*.9/256.;
  float rel=dot(texture(uT,uv+dd).rgb-texture(uT,uv-dd).rgb,lw)/uD.w*.8+dot(texture(uQ,uv+dq).rgb-texture(uQ,uv-dq).rgb,lw)/uD.w*3.;
  rel=rel/(1.+abs(rel)*1.2);
  col=uF.rgb*(.97+.06*cl)*(1.+rel)+(s-vec3(dot(s,lw)))*uE.rgb*.3+s*.035;
#endif
#if !defined(BRIGHT) && !defined(DIC)
  s+=q*.075+wide*.085;
  // stray light from the condenser, a slow haze that belongs to the water
  float cl=texture(uN,wp*.43/max(uA.z,.01)+.3).b*.65+texture(uN,wp*.11/max(uA.z,.01)).g*.35;
  float cl2=texture(uN,wp*1.1+.7).g;
  vec3 g=uF.rgb*(.52+1.1*cl*cl+.28*cl2*cl)*(1.08-.42*r2);
  vec3 col=s*uE.rgb+g;
#endif
  // field stop: slightly different size per colour, soft from diffraction
  vec3 m=vec3(smoothstep(1.,.985,r*.996),smoothstep(1.,.985,r),smoothstep(1.,.982,r*1.004));
#if defined(BRIGHT) || defined(DIC)
  m=mix(m,vec3(m.g),.75);
#endif
  col*=m;
  col+=vec3(.012,.016,.03)*smoothstep(1.06,1.,r)*(1.-m.g);
  // film response
  col=1.-exp(-col*1.52);
  col=pow(col,vec3(.80));
  col=col*col*(3.-2.*col)*.35+col*.65;
  vec2 gp=vP*uA.x/256.;
  float n=texture(uN,gp+uG.z).r+texture(uN,gp*.73+uG.z*1.7).a-1.;
  float lum=dot(col,vec3(.3,.6,.1));
  col+=n*.006;
  // outside the stop the eyepiece is not a neutral black but the ground's own darkest tint
  col+=vec3(.008,.012,.02)*(1.-m.g);
  o=vec4(col,1.);
}`;function $o(e){let n=Po.get(e);if(n)return n;n={};const P=(u,b)=>{const A=e.createShader(u);return e.shaderSource(A,b),e.compileShader(A),A},qt={full:no,quad:ro,rib:Uo,cell:Co,speck:No,food:Wo},qe={};for(const u in qt)qe[u]=P(e.VERTEX_SHADER,qt[u]);const Tt={cell:["cell",Ge],speck:["speck",Ge],food:["food",Ge],shell:["quad",Xo],para:["quad",Oo],cor:["quad",Go],dia:["quad",Qo],clump:["quad",Yo],bub:["quad",Ho],rot:["rib",jo],fil:["rib",Vo],down:["full",Ko],comp:["full",co]},gt={},ke={};for(const u in Tt){const b=e.createProgram(),A=Tt[u][1],F=ke[A]||(ke[A]=P(e.FRAGMENT_SHADER,A));e.attachShader(b,qe[Tt[u][0]]),e.attachShader(b,F),e.linkProgram(b),gt[u]=b}e.flush(),n.ubo=e.createBuffer(),e.bindBuffer(e.UNIFORM_BUFFER,n.ubo),e.bufferData(e.UNIFORM_BUFFER,112,e.DYNAMIC_DRAW);let ae=1374496517;const L=()=>{ae=ae+1831565813|0;let u=Math.imul(ae^ae>>>15,1|ae);return u=u+Math.imul(u^u>>>7,61|u)^u,((u^u>>>14)>>>0)/4294967296},jt=256,V=new Uint8Array(jt*jt*4),se=u=>{const b=new Float32Array(u*u);for(let A=0;A<b.length;A++)b[A]=L();return b},Qe=se(32),f=se(8),st=se(64),we=u=>u*u*(3-2*u);for(let u=0,b=0;u<jt;u++)for(let A=0;A<jt;A++,b+=4){const F=(J,B)=>{const _=A/jt*B,Q=u/jt*B,j=_|0,Y=Q|0,U=we(_-j),w=we(Q-Y),ft=(j+1)%B,q=(Y+1)%B,ot=J[Y*B+j],xt=J[Y*B+ft],nt=J[q*B+j],ct=J[q*B+ft];return ot+(xt-ot)*U+(nt-ot)*w+(ot-xt-nt+ct)*U*w};V[b]=L()*255,V[b+3]=L()*255,V[b+1]=(F(Qe,32)*.65+F(st,64)*.35)*255,V[b+2]=(F(f,8)*.7+F(Qe,32)*.3)*255}const Vt=(u,b,A,F,J,B,_,Q)=>{const j=e.createTexture();return e.bindTexture(e.TEXTURE_2D,j),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,A,u,b,0,F,J,B),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,_===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,Q),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,Q),_===e.LINEAR_MIPMAP_LINEAR&&e.generateMipmap(e.TEXTURE_2D),j};n.mkTex=Vt,n.noise=Vt(jt,jt,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,V,e.LINEAR_MIPMAP_LINEAR,e.REPEAT);const vt=new Float32Array(256*64*2),fe=()=>Math.sqrt(-2*Math.log(L()+1e-6))*Math.cos(6.2832*L());for(let u=0;u<64;u++){let b=0,A=0,F=L()*6.2832,J=0;const B=u>=46;for(let j=0;j<256;j++)vt[(u*256+j)*2]=b,vt[(u*256+j)*2+1]=A,B?(J--<=0&&(F+=(L()-.5)*3.6,J=3+L()*16),b+=Math.cos(F)+fe()*.12,A+=Math.sin(F)+fe()*.12):(b+=fe(),A+=fe());const _=b/256,Q=A/256;for(let j=0;j<256;j++)vt[(u*256+j)*2]-=_*j,vt[(u*256+j)*2+1]-=Q*j}n.walk=Vt(256,64,e.RG32F,e.RG,e.FLOAT,vt,e.NEAREST,e.REPEAT);const It=new Float32Array(2600*4);for(let u=0;u<2600;u++)It[u*4]=L(),It[u*4+1]=L(),It[u*4+2]=L()*2-1,It[u*4+3]=L();const $=1400+10*130+420,kt=new Float32Array($*4),D=(u,b,A,F,J,B,_)=>{for(let Q=0;Q<b;Q++){const j=1-2*(Q+.5)/b,Y=Math.sqrt(1-j*j),U=Q*2.39996323,w=.027*(60/Math.sqrt(b));let ft=Y*Math.cos(U)+(L()-.5)*w,q=j+(L()-.5)*w,ot=Y*Math.sin(U)+(L()-.5)*w;const xt=Math.hypot(ft,q,ot);ft/=xt,q/=xt,ot/=xt,kt[(u+Q)*4]=A+ft*B,kt[(u+Q)*4+1]=F+q*B,kt[(u+Q)*4+2]=J+ot*B,kt[(u+Q)*4+3]=_+L()*.999}};D(0,1400,0,0,0,1,0),n.dPos=new Float32Array(10*4);for(let u=0,b=0;b<10&&u<900;u++){const A=L()*2-1,F=L()*6.2832,J=Math.sqrt(1-A*A),B=.4+L()*.3,_=J*Math.cos(F)*B,Q=A*B*.92+.08,j=J*Math.sin(F)*B,Y=.125+L()*.06;let U=Math.hypot(_,Q,j)+Y<.93;for(let w=0;w<b&&U;w++)Math.hypot(n.dPos[w*4]-_,n.dPos[w*4+1]-Q,n.dPos[w*4+2]-j)<n.dPos[w*4+3]+Y+.03&&(U=!1);U&&(n.dPos[b*4]=_,n.dPos[b*4+1]=Q,n.dPos[b*4+2]=j,n.dPos[b*4+3]=Y,D(1400+b*130,130,_,Q,j,Y,1),b++)}D(1400+10*130,420,0,0,0,1,0);const h=512,Ie=new Uint8Array(h*h),Ye=(u,b,A,F)=>{const J=Math.abs(u)+Math.abs(b)+Math.abs(A);let B=u/J,_=b/J;if(A<0){const U=(1-Math.abs(_))*(B>=0?1:-1),w=(1-Math.abs(B))*(_>=0?1:-1);B=U,_=w}const Q=(B*.5+.5)*h|0,j=(_*.5+.5)*h|0;if(Q<0||j<0||Q>=h||j>=h)return;const Y=j*h+Q;Ie[Y]<F&&(Ie[Y]=F)};for(let u=0;u<1400;u++){const b=kt[u*4],A=kt[u*4+1],F=kt[u*4+2],J=[-1,-1,-1,-1,-1,-1],B=[9,9,9,9,9,9];for(let _=Math.max(0,u-130);_<Math.min(1400,u+130);_++){if(_===u)continue;const Q=kt[_*4]-b,j=kt[_*4+1]-A,Y=kt[_*4+2]-F,U=Q*Q+j*j+Y*Y;let w=0;for(;w<5&&B[w]<U;)w++;if(w<5&&U<.03){for(let ft=4;ft>w;ft--)J[ft]=J[ft-1],B[ft]=B[ft-1];J[w]=_,B[w]=U}}for(let _=0;_<5;_++){const Q=J[_];if(Q<=u)continue;const j=kt[Q*4]-b,Y=kt[Q*4+1]-A,U=kt[Q*4+2]-F,w=14,ft=120+L()*135;for(let q=0;q<=w;q++){const ot=q/w;Ye(b+j*ot,A+Y*ot,F+U*ot,ft)}}Ye(b,A,F,255)}n.net=Vt(h,h,e.R8,e.RED,e.UNSIGNED_BYTE,Ie,e.LINEAR_MIPMAP_LINEAR,e.CLAMP_TO_EDGE);const Yt=768,Ht=192,O=Ht/256,Ct=new Float32Array(Yt*Yt*3),Kt=[[.82,.78,.66],[.86,.66,.36],[.66,.72,.78],[.72,.56,.32],[.5,.68,.38],[.9,.88,.84],[.62,.42,.26]];for(let u=0;u<16;u++){const b=u%4*Ht,A=(u>>2)*Ht,F=Ht/2,J=3+(L()*5|0),B=[],_=118*O;for(let Y=0;Y<J;Y++){const U=L()*6.2832,w=L()*48;B.push(F+Math.cos(U)*w*O,F+Math.sin(U)*w*O,(16+L()*26)*O)}const Q=170+(L()*190|0);for(let Y=0;Y<Q;Y++){const U=(L()*J|0)*3,w=B[U+2],ft=L()*6.2832,q=w*Math.sqrt(-Math.log(L()+.01))*.75,ot=B[U]+Math.cos(ft)*q,xt=B[U+1]+Math.sin(ft)*q,nt=L(),ct=(nt>.94?7+L()*9:nt>.5?2.4+L()*3.8:.9+L()*1.4)*O,Mt=Kt[L()*Kt.length|0],wt=.34+L()*.66,de=2+(L()*4|0),ut=L()*6.28,Et=.1+L()*.3,ye=Math.min(1,Math.max(0,(_-Math.hypot(ot-F,xt-F))/20));if(ye<=0)continue;const Wt=Math.max(0,ot-ct*1.5-1|0),ne=Math.min(Ht-1,ot+ct*1.5+2|0),re=Math.max(0,xt-ct*1.5-1|0),Pe=Math.min(Ht-1,xt+ct*1.5+2|0);for(let Me=re;Me<=Pe;Me++)for(let Ne=Wt;Ne<=ne;Ne++){const Le=Ne+.5-ot,We=Me+.5-xt,ce=Math.sqrt(Le*Le+We*We),Te=Math.atan2(We,Le),Bt=((ct<2.2?ct:ct*(1+Et*.22*Math.sin(Te*de+ut)+Et*.16*Math.sin(Te*(de+3)+ut*2.7)+.03*Math.sin(Te*7+ut*5.1)))-ce)/(ct<2.2?.8:Math.max(.8,ct*.5));if(Bt<-1)continue;const Ke=ct>2.2?Math.pow(Math.min(1,(Bt+1)/2.5),2)*(ct>6?.62:.45):Bt<0?(1+Bt)*(1+Bt):Math.exp(-Bt*Bt*.5)*.5+.3,$t=((A+Me)*Yt+b+Ne)*3,Ae=Ke*wt*ye*(ct>6?.26:.5);Ct[$t]+=Mt[0]*Ae,Ct[$t+1]+=Mt[1]*Ae,Ct[$t+2]+=Mt[2]*Ae}}const j=1+(L()*4|0);for(let Y=0;Y<j;Y++){let U=F+(L()-.5)*90*O,w=F+(L()-.5)*90*O,ft=L()*6.28;const q=(40+L()*120)*O,ot=.4+L()*.5,xt=Kt[L()*3|0];for(let nt=0;nt<q;nt++){ft+=(L()-.5)*.22,U+=Math.cos(ft),w+=Math.sin(ft);const ct=Math.min(1,Math.max(0,(_-Math.hypot(U-F,w-F))/16)),Mt=U|0,wt=w|0;if(Mt<1||wt<1||Mt>=Ht-1||wt>=Ht-1)continue;const de=U-Mt,ut=w-wt;for(let Et=0;Et<4;Et++){const ye=Mt+(Et&1),Wt=wt+(Et>>1),ne=(Et&1?de:1-de)*(Et>>1?ut:1-ut),re=((A+Wt)*Yt+b+ye)*3,Pe=ne*ot*ct;Ct[re]+=xt[0]*Pe,Ct[re+1]+=xt[1]*Pe,Ct[re+2]+=xt[2]*Pe}}}}const pe=new Uint8Array(Yt*Yt*4);for(let u=0,b=Yt*Yt;u<b;u++){const A=u*3,F=u*4,J=Ct[A],B=Ct[A+1],_=Ct[A+2];J+B+_>0&&(pe[F]=Math.sqrt(1-Math.exp(-J*1.15))*255,pe[F+1]=Math.sqrt(1-Math.exp(-B*1.15))*255,pe[F+2]=Math.sqrt(1-Math.exp(-_*1.15))*255),pe[F+3]=255}n.atlas=Vt(Yt,Yt,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,pe,e.LINEAR_MIPMAP_LINEAR,e.CLAMP_TO_EDGE);const Ee=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Ee),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const Gt=u=>{const b=e.createVertexArray(),A=e.createBuffer();e.bindVertexArray(b),e.bindBuffer(e.ARRAY_BUFFER,Ee),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,u*64,e.DYNAMIC_DRAW);for(let F=0;F<4;F++)e.enableVertexAttribArray(1+F),e.vertexAttribPointer(1+F,4,e.FLOAT,!1,64,F*16),e.vertexAttribDivisor(1+F,1);return{vao:b,vb:A}};n.vPara=Gt(18),n.vShell=Gt(90),n.vCor=Gt(24),n.vDia=Gt(160),n.vClump=Gt(80),n.vBub=Gt(3),n.vNew=Gt(48);const Ue=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Ue),e.bufferData(e.ARRAY_BUFFER,kt,e.STATIC_DRAW);const Ce=()=>{const u=e.createVertexArray(),b=e.createBuffer();e.bindVertexArray(u),e.bindBuffer(e.ARRAY_BUFFER,Ue),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,10*48,e.DYNAMIC_DRAW);for(let A=0;A<3;A++)e.enableVertexAttribArray(1+A),e.vertexAttribPointer(1+A,4,e.FLOAT,!1,48,A*16),e.vertexAttribDivisor(1+A,1);return{vao:u,vb:b}};n.vColA=Ce(),n.vColB=Ce();const be=(u,b)=>{const A=e.createVertexArray(),F=e.createBuffer();return e.bindVertexArray(A),e.bindBuffer(e.ARRAY_BUFFER,F),e.bufferData(e.ARRAY_BUFFER,u,b),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,0,0),{vao:A,vb:F}};n.vSpeck=be(It,e.STATIC_DRAW),n.vFood=be(180*16,e.DYNAMIC_DRAW);{const u=e.createVertexArray(),b=e.createBuffer();e.bindVertexArray(u),e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,4200*32,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),n.vRib={vao:u,vb:b}}n.vEmpty=e.createVertexArray(),e.bindVertexArray(null),n.hdr=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");for(const u in gt){const b=gt[u];e.getProgramParameter(b,e.LINK_STATUS)||console.error("205 "+u+": "+e.getProgramInfoLog(b));const A=e.getUniformBlockIndex(b,"U");A!==e.INVALID_INDEX&&A!==4294967295&&e.uniformBlockBinding(b,A,0),e.useProgram(b);const F=(J,B)=>{const _=e.getUniformLocation(b,J);_&&e.uniform1i(_,B)};F("uN",0),F("uT",1),F("uW",1),F("uQ",2),F("uS",3)}n.P=gt;const m={speckE:["speck",No,Ge,"EDGE"],sun:["quad",ro,To,"SUN"],bloom:["quad",ro,To,"BLOOM"],compB:["full",no,co,"BRIGHT"],compD:["full",no,co,"DIC"]},He={},he=new Map;return n.extra=u=>{if(He[u])return He[u];const[b,A,F,J]=m[u],B=j=>j.replace(`#version 300 es
`,`#version 300 es
#define `+J+`
`),_=e.createProgram();e.attachShader(_,A.includes("#ifdef "+J)?P(e.VERTEX_SHADER,B(A)):qe[b]),e.attachShader(_,F.includes("#ifdef "+J)?P(e.FRAGMENT_SHADER,B(F)):ke[F]),e.linkProgram(_),e.getProgramParameter(_,e.LINK_STATUS)||console.error("205 "+u+": "+e.getProgramInfoLog(_));const Q=e.getUniformBlockIndex(_,"U");Q!==e.INVALID_INDEX&&Q!==4294967295&&e.uniformBlockBinding(_,Q,0),e.useProgram(_);for(const[j,Y]of[["uN",0],["uT",1],["uW",1],["uQ",2],["uS",3]]){const U=e.getUniformLocation(_,j);U&&e.uniform1i(U,Y)}return He[u]=_},n.loc=(u,b)=>{let A=he.get(u);return A||he.set(u,A={}),b in A?A[b]:A[b]=e.getUniformLocation(u,b)},n.uX=e.getUniformLocation(gt.down,"uX"),n.targets={},n.mkTarget=u=>{const b=e.createTexture();e.bindTexture(e.TEXTURE_2D,b),n.hdr?e.texStorage2D(e.TEXTURE_2D,1,e.RGBA16F,u,u):e.texStorage2D(e.TEXTURE_2D,1,e.RGBA8,u,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const A=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,A),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,b,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{t:b,f:A,w:u}},n.q=n.mkTarget(256),n.w=n.mkTarget(64),Po.set(e,n),n}Eo.add({num:205,name:"Pond Water",fam:"Worlds",recipe:"A drop of pond water under a microscope, full of rolling green Volvox, paramecia that back away from what they bump, and rotifers feeding on their stalks. What's living in the water changes every mint, and so do the lens and the light. Tap to jolt the slide and they flinch, or drag to move around the drop.",interactive:"Tap to jolt the slide and glide it towards your finger; drag to move the stage",music:!0,gl:!0,fps:30,seed:0,make(e){const n=e.gl,P=$o(n),qt=e.size,qe=e.hash.slice(2),Tt=t=>(t=Math.imul(t^t>>>16,2246822507),t=Math.imul(t^t>>>13,3266489909),t^t>>>16),gt=t=>parseInt(qe.slice(t*8,t*8+8),16)|0;let ke=Tt(gt(0)^Tt(gt(4))),ae=Tt(gt(1)^Tt(gt(5))),L=Tt(gt(2)^Tt(gt(6))),jt=Tt(gt(3)^Tt(gt(7)))|1;const V=()=>{ke|=0,ae|=0,L|=0,jt|=0;const t=(ke+ae|0)+jt|0;return jt=jt+1|0,ke=ae^ae>>>9,ae=L+(L<<3)|0,L=L<<21|L>>>11,L=L+t|0,(t>>>0)/4294967296};for(let t=0;t<24;t++)V();const se=t=>{let o=0;for(const c in t)o+=t[c];let r=V()*o;for(const c in t)if(r-=t[c],r<0)return c;return Qe(t)},Qe=t=>Object.keys(t)[0],f=(t,o)=>t+(o-t)*V(),st=!!e.home;let we=Tt(gt(3)^Tt(gt(6)^33889541))|0;const Vt=()=>{we=we+1831565813|0;let t=Math.imul(we^we>>>15,1|we);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},vt=(t,o)=>t+(o-t)*Vt();let fe=Tt(gt(2)^Tt(gt(7)^2118594))|0;const It=()=>{fe=fe+1831565813|0;let t=Math.imul(fe^fe>>>15,1|fe);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},$=(t,o)=>t+(o-t)*It();let kt=Tt(gt(1)^Tt(gt(5)^33902098))|0;const D=()=>{kt=kt+1831565813|0;let t=Math.imul(kt^kt>>>15,1|kt);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},h=(t,o)=>t+(o-t)*D(),Ie=st?1:D(),Ye=st?1:D(),Yt=st?1:D(),Ht=(t,o)=>{let r=t*100;for(const c in o)if(r-=o[c],r<0)return c;return null};let O=st?"Volvox bloom":se({"Volvox bloom":30,"Rotifer garden":24,"Ciliate swarm":20,"Diatom ooze":14,"Spirogyra tangle":12});O!=="Spirogyra tangle"&&(O=Ht(Ie,{"Star plankton":9,"Blue-green bloom":8,"Sun animalcules":6})||O);const Ct=O==="Ciliate swarm"||O==="Star plankton"||O==="Blue-green bloom"||O==="Sun animalcules";let Kt=st?"Dark-field, cool white":se({"Dark-field, cool white":42,"Dark-field, tungsten":32,"Rheinberg, amber on blue":15,"Rheinberg, gold on violet":7,"Rheinberg, rose on green":4});Kt==="Rheinberg, rose on green"&&(O==="Volvox bloom"||O==="Spirogyra tangle"||O==="Blue-green bloom")&&(Kt="Dark-field, cool white"),Kt=Ht(Ye,{"Bright-field":12,"Nomarski relief":8})||Kt;const pe=st?"10x":se({"10x":58,"4x":26,"20x":16}),Ee=st?"Round field":se({"Round field":66,"Wide, cropped field":28,"Off-centre field":6});let Gt=st?"Clear":se({Clear:48,Silty:36,"Milky with bacteria":16});const Ue=st?"Paramecium caudatum":se({"Paramecium caudatum":86,"Paramecium bursaria (green)":14}),Ce=!st&&O==="Volvox bloom"&&V()<.16;let be=st||O==="Spirogyra tangle"?"Spirogyra":se({"Bare slide":48,Spirogyra:36,"Air bubble":16});O!=="Spirogyra tangle"&&(be=Ht(Yt,{"Edge of the drop":8})||be),O==="Blue-green bloom"&&Gt==="Silty"&&(Gt="Clear"),e.trait("Water",O),e.trait("Light",Kt),e.trait("Objective",pe),e.trait("Eyepiece",Ee),e.trait("Silt",Gt),e.trait("Ciliate",Ue),e.trait("Slide",be),e.trait("Volvox",O==="Volvox bloom"?Ce?"Daughters breaking out":"Mothers carrying daughters":Ct?"None":"Young colonies");const m=pe==="4x"?.62:pe==="20x"?1.55:1,he={"Dark-field, cool white":[[1,1,1.04],[.0072,.0098,.0165]],"Dark-field, tungsten":[[1.1,.94,.76],[.0098,.0078,.0072]],"Rheinberg, amber on blue":[[1.2,.9,.46],[.012,.03,.105]],"Rheinberg, gold on violet":[[1.18,1,.5],[.05,.014,.1]],"Rheinberg, rose on green":[[1.2,.6,.72],[.008,.065,.05]],"Bright-field":[[1,1,1],[.9,.85,.74]],"Nomarski relief":[[1,1,1],[.3,.3,.3]]}[Kt].map(t=>t.slice()),u=Kt==="Bright-field",b=Kt==="Nomarski relief";if(b){const t=h(-1,1);he[1]=[.3+.006*t,.3+.004*Math.abs(t),.3-.008*t]}const A=O==="Sun animalcules"?"sun":"bloom";(O==="Sun animalcules"||O==="Blue-green bloom")&&P.extra(A);const F=u?P.extra("compB"):b?P.extra("compD"):P.P.comp,J=Ee==="Wide, cropped field"?.63:.487,B=Ee==="Off-centre field"?[f(-.1,.1),f(-.1,.1)]:[0,0],_=Ee==="Off-centre field"?.56:J,Q=Gt==="Clear"?1e3:Gt==="Silty"?1700:2600,j=u?Q>>2:Q,Y=2,U=Y/2,w=t=>t-Y*Math.round(t/Y),ft=t=>(t%Y+Y)%Y,q=t=>U+t/m,ot=[],xt=[],nt=[],ct=[],Mt=[],wt=[],de=[],ut=[],Et=[],ye=(t,o,r)=>{for(let c=0;c<Et.length;c+=3)if(Math.hypot(t-Et[c],o-Et[c+1])<Et[c+2]+r)return!1;return!0},Wt=(t,o,r,c,x,d)=>{!x&&r>.095&&(r=f(.055,.095)),Math.abs(c)<.08&&Et.push(t,o,r*m);const l=f(0,6.283),i=V()-.5,s=V()-.5,g=V()-.5,v=V()-.5,M=Math.hypot(i,s,g,v)||1,R={x:q(t),y:q(o),z:c,R:r,a:l,q:[i/M,s/M,g/M,v/M],ang:0,v:f(.008,.018),w:f(.4,.62)*(r>.1?1:1.4),mature:x,br:d,wob:f(0,6.28),turn:0,cut:2,kw:0,kvx:0,kvy:0};return xt.push(R),R},ne=(t,o,r,c)=>{if(ot.length>=18)return null;const x=f(.082,.104),d={x:q(t),y:q(o),a:r,z:c,L:x,W:f(.235,.285),roll:f(0,6.28),v:0,v0:f(.09,.135),st:0,tm:0,piv:1,cph:0,sgn:1,fl:0,vph:f(0,6.28),sd:V(),n:f(0,9),hx:q(t*.6),hy:q(o*.6),hr:.46/m+.1},l=vt(.8,1.24);return d.L*=l,d.W*=vt(.93,1.08),d.zt=vt(0,6.28),d.zw=vt(.05,.14),d.za=vt(.015,.06),d.zz=c,d.tilt=0,ot.push(d),d},re=(t,o,r,c,x)=>{if(Mt.length>=80)return null;const d=f(0,6.28),l={x:q(t),y:q(o),r,z:c,ca:Math.cos(d),sa:Math.sin(d),cell:V()*16|0,br:x};return Mt.push(l),l},Pe=(t,o,r,c)=>{const x={x:t,y:o,a0:r,L:c,c:0,tc:0,hide:0,ph:f(0,9),ph2:f(0,9),wid:c*f(.088,.104),bend:f(-.7,.7),cor:f(0,6),beat:f(0,6),sway:f(.25,.5),z:f(-.015,.015),mx:0,my:0,dx:1,dy:0,nodes:new Float32Array(62),hw:new Float32Array(31),open:1,sk:0,mid:{x:0,y:0,r:c*.22},base:0,bt:0,dl:-1,ret:.5,tf:2,lat:.1,gut:0,jaw:9},d=vt(.74,1.12);x.L*=d,x.wid*=Math.sqrt(d),x.base=Vt()<.3?vt(.18,.42):vt(0,.08),x.bt=vt(4,14),x.ret=vt(.16,.5),x.tf=vt(1.3,3.1),x.lat=vt(.02,.22),x.gut=Vt(),x.jaw=vt(14,22),x.bend*=vt(.6,1.4);for(let l=0;l<26;l++)ut.push({x:t+f(-.2,.2),y:o+f(-.2,.2),s:f(.0011,.0024),b:f(.4,1),rt:nt.length});return nt.push(x),x},Me=(t,o,r,c,x)=>Pe(ft(q(o)),ft(q(r)),c,x),Ne=(t,o,r)=>{if(ct.length>=160)return null;const c=f(0,6.283);r!==1&&V()<(O==="Diatom ooze"?.32:.16)&&(r=2);const x={x:q(t),y:q(o),a:c,L:r===2?f(.06,.1):r?f(.05,.08):f(.028,.056),W:r===2?f(.09,.13):r?f(.1,.15):f(.2,.29),kind:r,v:f(.004,.013),dir:V()<.5?-1:1,tm:f(1,9),z:f(-.05,.03),sd:V()};return Vt()<.3&&(x.z=vt(-.17,-.08)),ct.push(x),x},Le=(t,o,r,c)=>{const x=new Float32Array(c*3),d=f(.021,.027);let l=q(t),i=q(o),s=f(-.1,.1),g=f(-.04,.04);const v=.05;let M=f(-.01,.01);const R=V()<.5?.75:1;for(let k=0;k<c;k++)x[k*3]=l,x[k*3+1]=i,x[k*3+2]=g,r+=s*v*6,s+=f(-.09,.09),s*=.96,M+=f(-.003,.003),M*=.97,g=Math.max(-.075,Math.min(.05,g+M)),l+=Math.cos(r)*v,i+=Math.sin(r)*v;wt.push({nodes:x,n:c,w:d,cl:f(3.2,5.2),sd:V(),step:v})},We=()=>{const t=xt[0],o=t?(t.x-U)*m:0,r=t?(t.y-U)*m:0,c=(Math.hypot(o,r)>.06?Math.atan2(-r,-o):h(0,6.283))+h(-.45,.45),x=h(.12,.2),d=Math.cos(c)*x,l=Math.sin(c)*x,i=D()<.45?3:2,s=9+(D()*6|0),g=D()<.34,v=.05*m,M=Math.min(.66,Math.max(J,.487+Math.hypot(B[0],B[1]))+.05),R=1.85*m,k=[];for(let N=0;N<i;N++)k.push(1);for(let N=i;N<s;N++)k[N===i?0:D()*i|0]++;const X=3+(D()<.5?1:0),G=[];for(let N=0;N<s;N++)G.push(N);for(let N=s-1;N>0;N--){const H=D()*(N+1)|0,at=G[N];G[N]=G[H],G[H]=at}const tt=[0,h(.65,1.05),-h(.6,1)];let it=0;for(let N=0;N<i;N++){const H=c-1.5708+tt[N]+h(-.15,.15),at=N===0?h(1.2,1.8):h(.5,1.5)*(D()<.5?-1:1),K=h(.22,.45),dt=h(3,6),C=h(0,6.28),te=d+Math.cos(H)*h(-.16,.16)+Math.cos(c)*h(-.06,.06),_e=l+Math.sin(H)*h(-.16,.16)+Math.sin(c)*h(-.06,.06),Ft=k[N];let ee=-(Ft-1)*.5*2.8*.023*m;for(let _t=0;_t<Ft;_t++,it++){ee+=h(1.5,4.6)*.023*m;const ie=(_t-(Ft-1)/2)*h(.05,.16),E=h(-.1,.35)*(D()<.5?-1:1),a=h(-.3,.3),S=h(.03,.07),T=h(6,11),y=h(0,6.28),z=G[it]<X,p=z?h(-.012,.012):D()<.75?-h(.17,.3):h(.14,.2),lt=z?.008:h(.02,.05),mt=h(2,5),W=h(0,6.28),I=g&&N===0&&_t===Ft>>1?h(-.25,.1):9,Dt=h(.16,.34)*(D()<.5?-1:1),Ut=h(2.4,5.5),bt=h(0,6.28),et=h(.05,.14),yt=h(7,12),Rt=D()<.17?h(.55,1.25)*(D()<.5?-1:1):0,St=h(-.45,.45),xe=pt=>H+Rt+(at*(Rt?.3:1)+a+St)*pt+Dt*Math.sin(pt*Ut+bt)+et*Math.sin(pt*yt+bt*1.7)+K*Math.sin(pt*dt+C)+S*Math.sin(pt*T+y)+ie*Math.max(0,Math.min(1,(pt*Math.sign(E||1)-Math.abs(E))/.3))+(pt>I?6.283*Math.min(1,(pt-I)/.5)*(.5-.5*Math.cos(Math.PI*Math.min(1,(pt-I)/.5)))/1:0),Be=te-Math.sin(H)*ee,Se=_e+Math.cos(H)*ee,le=pt=>{const Bo=[];let Ro=Be,go=Se,so=0,So=!1;for(let ko=0;ko<90&&so*pt<R;ko++){const qo=Math.hypot(Ro-B[0],go-B[1]);if(qo<M-.04&&(So=!0),Bo.push(Ro,go,so),qo>M&&(So||ko>30))break;const Io=xe(so);Ro+=Math.cos(Io)*v*pt,go+=Math.sin(Io)*v*pt,so+=v*pt}return Bo},oe=le(1),me=le(-1),ze=me.length/3+oe.length/3-1,Pt=new Float32Array(ze*3);let ge=0;for(let pt=me.length/3-1;pt>=1;pt--,ge++)Pt[ge*3]=q(me[pt*3]),Pt[ge*3+1]=q(me[pt*3+1]),Pt[ge*3+2]=p+lt*Math.sin(me[pt*3+2]*mt+W);for(let pt=0;pt<oe.length/3;pt++,ge++)Pt[ge*3]=q(oe[pt*3]),Pt[ge*3+1]=q(oe[pt*3+1]),Pt[ge*3+2]=p+lt*Math.sin(oe[pt*3+2]*mt+W);wt.push({nodes:Pt,n:ze,w:h(.019,.026),cl:h(3.2,5.2),sd:D(),step:.05,sub:!0})}}},ce=(t,o,r)=>{for(let c=0,x=0;x<t&&c<t*20;c++){const d=f(-1,1)*m,l=f(-1,1)*m;Math.hypot(d,l)<(r===void 0?.62:r)||!ye(d,l,.02)||(o(d,l),x++)}};if(O==="Volvox bloom"){const t=st?-.075:f(-.14,.14),o=st?-.085:f(-.14,.14),r=(st?.205:f(.17,.215))/Math.max(1,Math.sqrt(m)),c=Wt(t,o,r,0,!0,1);if(Ce){c.cut=.62;for(let i=0;i<4;i++){const s=f(0,6.28),g=r*f(1.15,1.6);Wt(t+Math.cos(s)*g,o+Math.sin(s)*g,f(.034,.045),f(-.03,.03),!1,1.1).w=1.3}}const x=st?-.56:f(0,6.28),d=st?.38:.47;Wt(t+Math.cos(x)*d,o+Math.sin(x)*d,r*.5,.015,st||V()<.5,.95);const l=x+(st?3.5:f(1.9,3));Wt(t+Math.cos(l)*.44,o+Math.sin(l)*.44,r*.66,-.3,!0,.72),ce(3,(i,s)=>Wt(i,s,f(.07,.19),f(-.15,.05),V()<.6,1))}else O==="Rotifer garden"?(Wt(f(-.32,.32),f(-.36,-.22),f(.05,.075),f(-.12,.02),!1,1),ce(3,(t,o)=>Wt(t,o,f(.06,.16),f(-.14,.05),V()<.5,1))):Ct||(Wt(f(-.3,.3),f(-.32,.32),f(.05,.085),f(-.14,.02),!1,1),ce(3,(t,o)=>Wt(t,o,f(.06,.17),f(-.14,.05),V()<.5,1)));if(m<1&&!Ct)for(let t=0;t<3;t++)for(let o=0;o<10;o++){const r=f(0,6.28),c=f(.12,.42),x=Math.cos(r)*c,d=Math.sin(r)*c,l=f(.07,.17);if(ye(x,d,l*m+.03)){Wt(x,d,l,f(-.14,.04),V()<.6,1);break}}const Te=()=>f(.27,.33);let ve=null;if(O==="Rotifer garden"){const t=f(0,6.28),o=f(.17,.36)/Math.sqrt(m),r=Math.cos(t)*o,c=Math.sin(t)*o;re(r,c,f(.1,.15),0,1);const x=2+(V()*4|0);for(let l=0;l<x;l++){const i=t+3.14+f(-1.75,1.75),s=Te()*f(.68,1.05)/Math.sqrt(m);Me(null,r+Math.cos(i)*.08*m,c+Math.sin(i)*.08*m,i,s),Et.push(r+Math.cos(i)*.2*m,c+Math.sin(i)*.2*m,.1)}const d=Math.min(nt.length,Vt()<.4?2:3);for(;nt.length>d;){const l=Vt()*nt.length|0;nt.splice(l,1);for(let i=ut.length-1;i>=0;i--)ut[i].rt===l?ut.splice(i,1):ut[i].rt>l&&ut[i].rt--}ve={bx:r,by:c,ba:t,keep:d}}else{const t=st?-.235:(V()<.5?-1:1)*f(.16,.28),o=st?.345:O==="Diatom ooze"?f(-.33,.33):f(.2,.34);re(t,o,st?.092:f(.07,.1),.004,1);const r=Math.atan2(-o,-t)+(st?.62:f(-.7,.7));if(!Ct){const c=Me(null,t+Math.cos(r)*.045*m,o+Math.sin(r)*.045*m,r-(st?.5:0),Te());st&&(c.bend=.95),Et.push(t+Math.cos(r)*.2*m,o+Math.sin(r)*.2*m,.11)}}ce(O==="Rotifer garden"?3:2,(t,o)=>{const r=re(t,o,f(.07,.12),f(-.04,.03),1);if(!r)return;const c=1+(V()*2|0);for(let x=0;x<c;x++){const d=f(0,6.28);Me(r,t+Math.cos(d)*.05*m,o+Math.sin(d)*.05*m,d,Te())}},.75),ce(13,(t,o)=>re(t,o,f(.03,.08),f(-.2,.06),f(.5,1)),.15);for(let t=0;t<3;t++){const o=f(0,6.28),r=f(.28,.46);re(Math.cos(o)*r,Math.sin(o)*r,f(.018,.04),f(-.14,.04),f(.45,.85))}if(O==="Ciliate swarm"){for(let t=0;t<11;t++){const o=f(0,6.28),r=f(.03,.42);ne(Math.cos(o)*r,Math.sin(o)*r,f(0,6.28),f(-.05,.03))}ce(4,(t,o)=>ne(t,o,f(0,6.28),f(-.05,.03)))}else if(st)ne(.42,-.22,2.2,.002).v0=.09,ne(.44,.2,-2.9,-.012).v0=.085,ce(3,(t,o)=>ne(t,o,f(0,6.28),f(-.05,.03)));else{const t=O==="Rotifer garden"?2:3;for(let o=0;o<t;o++)for(let r=0;r<12;r++){const c=f(0,6.28),x=f(.24,.4),d=Math.cos(c)*x,l=Math.sin(c)*x;if(ye(d,l,.1)||r===11){ne(d,l,f(0,6.28),f(-.05,.02)),Et.push(d,l,.06);break}}ce(3,(o,r)=>ne(o,r,f(0,6.28),f(-.05,.03)))}const Bt=[];if(O==="Star plankton"){const t=12+(D()*9|0),o=h(-.15,.15),r=h(-.15,.15);for(let c=0,x=0;c<t&&x<400;x++){const d=h(0,6.283),l=c<t*.75?Math.sqrt(D())*.5:h(.5,.95),i=o*(l<.5?1:0)+Math.cos(d)*l,s=r*(l<.5?1:0)+Math.sin(d)*l;let g=!1;for(const tt of Bt)Math.hypot((tt.x-U)*m-i,(tt.y-U)*m-s)<.11&&(g=!0);if(g)continue;const v=D(),M=c<3?c:v<.5?0:v<.78?1:2,R=D()<.34?-h(.1,.2):h(-.025,.02),k={x:q(i),y:q(s),a:h(0,6.283),w:h(.025,.09)*(D()<.5?-1:1),vx:h(-.006,.006),vy:h(-.004,.008),z:R,kind:M,rods:[],ph:h(0,6.28),rw:h(.06,.16)},X=D(),G=(M===0?h(.042,.056):M===1?h(.03,.04):h(.034,.046))/Math.sqrt(Math.max(1,m));if(M===0){const tt=Math.min(16,Math.max(4,Math.round(h(5,11))+(D()<.15?5:0))),it=D()*tt|0,N=h(.12,.35),H=6.283/(tt+(D()<.6?.8:0));let at=0;for(let K=0;K<tt;K++){const dt=G*h(.9,1.1),C=at+h(-.12,.12);k.rods.push({rx:Math.cos(C)*dt,ry:Math.sin(C)*dt,ra:C+N,L:dt,W:h(.06,.08)}),at+=H*(K===it?1.6:h(.8,1.15))}}else if(M===1){const tt=6+(D()*9|0),it=h(.7,1.2);let N=0,H=0,at=h(0,6.28);for(let K=0;K<tt;K++){const dt=at+(K&1?it:-it)*h(.6,1.25),C=G*h(.92,1.08);k.rods.push({rx:N+Math.cos(dt)*C,ry:H+Math.sin(dt)*C,ra:dt,L:C,W:h(.15,.2)}),N+=Math.cos(dt)*C*2,H+=Math.sin(dt)*C*2,at+=h(-.32,.32)}for(const K of k.rods)K.rx-=N*.5,K.ry-=H*.5}else{const tt=16+(D()*18|0),it=h(-.035,.035);k.tw=h(.06,.13),k.roll=h(.05,.12)*(D()<.5?-1:1);let N=0,H=0,at=0;for(let K=0;K<tt;K++){const dt=h(.085,.11),C=G*h(.95,1.05);N+=Math.cos(at)*dt*G*1.9,H+=Math.sin(at)*dt*G*1.9,k.rods.push({rx:N,ry:H,ra:at+1.5708,L:C,W:dt,k:K}),at+=it}for(const K of k.rods)K.rx-=N*.5,K.ry-=H*.5}for(const tt of k.rods){if(ct.length>=154)break;tt.d={x:k.x,y:k.y,a:0,L:tt.L,W:tt.W,kind:1,v:0,dir:1,tm:1e9,z:R+h(-.006,.006),sd:X+D()*.3},ct.push(tt.d)}Bt.push(k),c++}}const Ke=t=>{const o=Math.cos(t.a),r=Math.sin(t.a);for(const c of t.rods){if(!c.d)continue;let x=c.rx,d=c.ry,l=c.L;t.kind===2&&(l=c.L*Math.max(.1,Math.abs(Math.cos(t.ph+c.k*t.tw)))),c.d.x=t.x+x*o-d*r,c.d.y=t.y+x*r+d*o,c.d.a=c.ra+t.a,c.d.L=l}};for(const t of Bt)Ke(t);const $t=[],Ae=(t,o,r)=>{for(let c=0,x=0;c<t&&x<300;x++){const d=h(0,6.283),l=Math.sqrt(D())*.46,i=Math.cos(d)*l,s=Math.sin(d)*l,g=o(c);let v=!0;for(const R of $t)Math.hypot((R.x-U)*m-i,(R.y-U)*m-s)<(R.ext+g)*m*.8&&(v=!1);if(!v&&x<290)continue;const M=r(c,g);M.x=q(i),M.y=q(s),$t.push(M),Et.push(i,s,g*m*.6),c++}};if(O==="Sun animalcules"){const t=3+(D()*4|0);Ae(t,o=>(o<2||D()<.3?h(.055,.075):h(.03,.042))/Math.sqrt(Math.max(1,m)),(o,r)=>({k:3,R:r,ext:r*2.6,z:o>1&&D()<.4?-h(.08,.16):h(-.01,.01),roll:h(0,6.28),w:h(.015,.04)*(D()<.5?-1:1),vx:h(-.004,.004),vy:h(-.004,.004),sh:0,shT:0,side:0,sd:D()}))}else O==="Blue-green bloom"&&(Ae(3+(D()*3|0),()=>h(.05,.1),(t,o)=>({k:2,R:o,ext:o,z:h(-.12,.01),vx:h(-.003,.003),vy:h(-.003,.003),a:h(0,6.28),sd:D()})),Ae(6+(D()*5|0),()=>h(.08,.14),(t,o)=>({k:1,R:o,ext:o,z:D()<.3?-h(.06,.14):h(-.012,.012),a:h(0,6.28),w:h(-.05,.05),vx:h(-.004,.004),vy:h(-.004,.004),hr:h(.17,.28),nt:10+(D()*6|0),pt:h(.17,.27),bend:h(-.12,.12),ph:h(0,6.28),sd:D()})),Ae(11+(D()*7|0),()=>h(.1,.28),(t,o)=>({k:0,R:o,ext:o*.3,z:D()<.35?-h(.06,.16):h(-.012,.012),a:h(0,6.28),v:h(.004,.011)*(D()<.5?-1:1),tm:h(4,14),hw:h(.0026,.0036)/o,cl:h(.0028,.004)/o,b0:h(-.07,.07),b1:h(.02,.06),bw:h(.25,.6),ph:h(0,6.28),kick:0,sd:D()})));const Jo=O==="Diatom ooze"?15:st?3:O==="Star plankton"?0:4;for(let t=0;t<Jo;t++)for(let o=0;o<12;o++){const r=f(0,6.28),c=f(.12,.46),x=Math.cos(r)*c,d=Math.sin(r)*c;if(ye(x,d,.07)||o===11){Ne(x,d,V()<.35?1:0),Et.push(x,d,.03);break}}if(ce(O==="Diatom ooze"?12:O==="Star plankton"?4:10,(t,o)=>Ne(t,o,V()<.35?1:0)),be==="Spirogyra")if(st)Le(.56,-.02,2.42,26);else{const t=O==="Spirogyra tangle"?4:1+(V()*2|0);for(let o=0;o<t;o++){const r=f(0,6.28),c=f(.65,.9);Le(Math.cos(r)*c,Math.sin(r)*c,r+3.14+f(-.5,.5),28+(V()*12|0))}O==="Spirogyra tangle"&&(wt.length=0,We())}else if(be==="Air bubble"){const t=f(0,6.28),o=f(.13,.22);de.push({x:q(Math.cos(t)*f(.36,.52)),y:q(Math.sin(t)*f(.36,.52)),r:o})}if(ve){const o=It()<.34?0:It()<.5?1:2,r=5+(It()*5|0),c=(d,l,i,s)=>{const g={x:d,y:l,a0:i,L:s,c:0,tc:0,hide:0,ph:$(0,9),ph2:$(0,9),wid:s*$(.09,.11),bend:$(-.5,.5),cor:$(0,6),beat:$(0,6),sway:$(.25,.5),z:$(-.015,.015),mx:0,my:0,dx:1,dy:0,nodes:new Float32Array(62),hw:new Float32Array(31),open:1,sk:0,mid:{x:0,y:0,r:s*.22},base:It()<.34?$(.3,.5):$(0,.08),bt:$(6,16),dl:-1,ret:$(.16,.5),tf:$(1.3,3.1),lat:$(.02,.22),gut:It(),jaw:$(14,22)};g.c=g.tc=g.base;for(let v=0;v<10;v++)ut.push({x:d+$(-.2,.2),y:l+$(-.2,.2),s:$(.0011,.0024),b:$(.4,1),rt:nt.length});return nt.push(g),g},x=[];for(let d=0;d<r;d++)x.push($(.5,1.12)*.3/Math.sqrt(m));if(o===0)for(let d=ve.keep;d<r;d++){const l=ve.ba+3.14+$(-2.3,2.3);c(ft(q(ve.bx+Math.cos(l)*.075*m)),ft(q(ve.by+Math.sin(l)*.075*m)),l,x[d])}else{nt.splice(0,ve.keep);for(let C=ut.length-1;C>=0;C--)ut[C].rt<ve.keep?ut.splice(C,1):ut[C].rt-=ve.keep;Mt.splice(0,1);const d=$(0,6.283),l=$(.08,.24),i=Math.cos(d),s=Math.sin(d),g=-s,v=i,M=Math.ceil(1.5/(.05*m)),R=new Float32Array(M*3);let k=q(g*l-i*.75),X=q(v*l-s*.75),G=d,tt=0,it=$(-.02,.02),N=0;for(let C=0;C<M;C++)R[C*3]=k,R[C*3+1]=X,R[C*3+2]=it,G+=tt*.05*6,tt+=$(-.035,.035),tt*=.93,N+=$(-.002,.002),N*=.95,it=Math.max(-.05,Math.min(.03,it+N)),k+=Math.cos(G)*.05,X+=Math.sin(G)*.05;const H=o===1?$(.017,.022):$(.011,.015);wt.push({nodes:R,n:M,w:H,cl:o===1?$(3,4.6):$(4.5,7),sd:It(),step:.05,kind:o===1?0:1,sub:!0});const at=[];for(let C=1;C<M-1;C++)Math.hypot((R[C*3]-U)*m,(R[C*3+1]-U)*m)<.4&&at.push(C);const K=l>0?-1:1,dt=Math.max(4,Math.min(r,Math.floor((at.length-1)*.05*m/.085)));for(let C=0;C<dt&&at.length>2;C++){const te=Math.min(.999,Math.max(0,(C+.5+$(-.3,.3))/dt)),_e=at[0]+te*(at[at.length-1]-at[0]),Ft=_e|0,ee=_e-Ft,_t=R[Ft*3]+(R[Ft*3+3]-R[Ft*3])*ee,ie=R[Ft*3+1]+(R[Ft*3+4]-R[Ft*3+1])*ee,E=R[Ft*3+3]-R[Ft*3],a=R[Ft*3+4]-R[Ft*3+1],S=Math.hypot(E,a)||1,T=-a/S*K,y=E/S*K,z=Math.atan2(y,T)+$(-.5,.5);c(ft(_t+T*H*.8),ft(ie+y*H*.8),z,x[C])}}}{const t=[1,2,3,4];for(let o=3;o>0;o--){const r=It()*(o+1)|0,c=t[o];t[o]=t[r],t[r]=c}for(let o=0;o<wt.length;o++){const r=wt[o],c=r.n;r.sx=r.sy=r.svx=r.svy=0;const x=st?2+Math.floor(r.sd*7.31%1*2.6):t[o%4];r.cp=(r.kind||0)*100+x*10+r.cl*.75;const d=st?10:$(.2,.8)*c,l=st?5.5:$(.14,.24)*c,i=st?-.17:(It()<.5?-1:1)*$(.13,.2);if(!r.sub)for(let s=0;s<c;s++){const g=Math.max(0,1-Math.abs(s-d)/l);r.nodes[s*3+2]+=i*g*g*(3-2*g)}}}let At=null;if(be==="Edge of the drop"){const t=h(0,6.283),o=Math.cos(t),r=Math.sin(t),c=.487*h(.3,.55),x=h(1,2),d=B[0]+o*(c-x),l=B[1]+r*(c-x);At={x:q(d),y:q(l),R:x/m};const i=(v,M,R)=>Math.hypot(v-At.x,M-At.y)<At.R-R;for(const v of xt){const M=v.x-At.x,R=v.y-At.y,k=Math.hypot(M,R),X=At.R-v.R*1.1-.01;if(k>X){const G=Math.max(X*.5,2*X-k);v.x=At.x+M/k*G,v.y=At.y+R/k*G}}for(let v=ot.length-1;v>=0;v--)i(ot[v].x,ot[v].y,ot[v].L)||ot.splice(v,1);for(let v=ct.length-1;v>=0;v--)ct[v].tm<1e8&&!i(ct[v].x,ct[v].y,ct[v].L)&&ct.splice(v,1);for(let v=Mt.length-1;v>=0;v--)i(Mt[v].x,Mt[v].y,0)||Mt.splice(v,1);for(let v=wt.length-1;v>=0;v--){const M=wt[v];let R=!1;for(let k=0;k<M.n;k++)i(M.nodes[k*3],M.nodes[k*3+1],M.w)||(R=!0);R&&wt.splice(v,1)}for(let v=nt.length-1;v>=0;v--)if(!i(nt[v].x,nt[v].y,nt[v].L*.5)){nt.splice(v,1);for(let M=ut.length-1;M>=0;M--)ut[M].rt===v?ut.splice(M,1):ut[M].rt>v&&ut[M].rt--}const s=26+(D()*14|0),g=1.25/x;for(let v=0;v<s;v++){const M=t+(D()-.5)*g*(v<s*.6?.7:1.6),R=x-Math.pow(D(),1.8)*.08-.006;Mt.push({x:q(d+Math.cos(M)*R),y:q(l+Math.sin(M)*R),r:h(.014,.06)*(D()<.25?1.7:1),z:h(-.03,.02),ca:Math.cos(M*7),sa:Math.sin(M*7),cell:D()*16|0,br:h(.5,1)})}for(let v=0;v<5;v++){const M=t+(D()-.5)*g*1.3,R=x+h(.04,.3);Mt.push({x:q(d+Math.cos(M)*R),y:q(l+Math.sin(M)*R),r:h(.008,.018),z:0,ca:1,sa:0,cell:D()*16|0,br:h(.25,.45)})}}const $e=(t,o)=>{if(!At)return!1;const r=t.x-At.x,c=t.y-At.y,x=Math.hypot(r,c),d=At.R-o;return x<=d?!1:(t.x=At.x+r/x*d,t.y=At.y+c/x*d,!0)},Re=[];for(const t of xt)Math.abs(t.z)<.1&&Re.push(t);for(const t of Mt)t.r>.05&&Math.abs(t.z)<.07&&Re.push({x:t.x,y:t.y,R:t.r*.62});for(const t of de)Re.push({x:t.x,y:t.y,R:t.r});for(const t of nt)Re.push(t.mid);let Xe=0,Je=0,Fe=U,De=U,io=U,lo=U,fo=0,ho=0,vo=0,uo=0,xo=0,mo=0,Oe=!1,Fo=0,Do=0,po=0,bo=0,yo=0,Ze=0,wo=0,Mo=0,to=0,eo=0,Ma=U,Aa=U;const Ao=1/30,Zo=(t,o)=>{t.roll+=o*(t.st===1?-3.6:5.4);const r=t.st===1?-t.v0*.85:t.st===2?t.v0*.18:t.v0;if(t.v+=(r-t.v)*(1-Math.exp(-o*14)),t.sgn+=((t.st===1?-1:1)-t.sgn)*(1-Math.exp(-o*18)),t.cph+=o*15*t.sgn,t.vph+=o*.1,t.fl>0&&(t.fl=Math.max(0,t.fl-o*.11)),t.n+=o*.9,t.st===0){t.a+=o*(.22*Math.sin(t.n*1.37)+.13*Math.sin(t.n*2.91+1));const d=t.x+Math.cos(t.a)*t.L,l=t.y+Math.sin(t.a)*t.L;let i=!1;for(let R=0;R<Re.length&&!i;R++){const k=Re[R],X=w(d-k.x),G=w(l-k.y),tt=k.R+.012;X*X+G*G<tt*tt&&(i=!0)}for(let R=0;R<ot.length&&!i;R++){const k=ot[R];if(k===t)continue;const X=w(d-k.x),G=w(l-k.y),tt=k.L*.42;X*X+G*G<tt*tt&&(i=!0)}const s=w(t.x-t.hx),g=w(t.y-t.hy),v=Math.hypot(s,g),M=s*Math.cos(t.a)+g*Math.sin(t.a)>0&&v>t.hr;(i||M&&V()<o*2.6||V()<o*.05)&&(t.st=1,t.tm=f(.28,.75),i&&e.sound.hit("blip",.07,{freq:1500+V()*700}))}else if(t.st===1){if(t.tm-=o,t.tm<=0){t.st=2,t.tm=f(.45,1.1),t.piv=V()<.5?-1:1;const d=w(t.x-t.hx),l=w(t.y-t.hy);if(Math.hypot(d,l)>t.hr){const i=Math.atan2(-l,-d),s=Math.atan2(Math.sin(i-t.a),Math.cos(i-t.a));t.piv=s>0?1:-1,t.tm=Math.abs(s)/3.2+.1}}}else t.tm-=o,t.a+=o*t.piv*3.2,t.tm<=0&&(t.st=0);const c=t.st===2?.32:.17,x=t.a+c*Math.sin(t.roll);t.x+=Math.cos(x)*t.v*o,t.y+=Math.sin(x)*t.v*o;for(let d=0;d<Re.length;d++){const l=Re[d],i=w(t.x-l.x),s=w(t.y-l.y),g=l.R+t.L*t.W*1.1,v=i*i+s*s;if(v<g*g&&v>1e-8){const M=Math.sqrt(v),R=(g-M)/M*Math.min(1,o*8);t.x+=i*R,t.y+=s*R}}$e(t,t.L*.55)&&t.st===0&&(t.st=1,t.tm=f(.28,.6)),t.ax=x,t.zt+=o*t.zw,t.zz=t.z+t.za*Math.sin(t.zt),t.tilt=t.za*.55*Math.cos(t.zt)},ta=(t,o)=>{t.wob+=o*.33,t.a+=o*(.05*Math.sin(t.wob*1.3)+.03*Math.sin(t.wob*2.9));const r=.3*Math.sin(t.wob),c=Math.cos(r),x=Math.cos(t.a)*c,d=Math.sin(t.a)*c,l=Math.sin(r),i=(t.w+t.kw)*o,s=Math.sin(i*.5),g=Math.cos(i*.5),v=t.q,M=x*s,R=d*s,k=l*s,X=g*v[0]+M*v[3]+R*v[2]-k*v[1],G=g*v[1]-M*v[2]+R*v[3]+k*v[0],tt=g*v[2]+M*v[1]-R*v[0]+k*v[3],it=g*v[3]-M*v[0]-R*v[1]-k*v[2],N=1/Math.hypot(X,G,tt,it);if(v[0]=X*N,v[1]=G*N,v[2]=tt*N,v[3]=it*N,t.x+=x*t.v*o,t.y+=d*t.v*o,$e(t,t.R)&&(t.a+=o*2),t.kw||t.kvx||t.kvy){t.x+=t.kvx*o,t.y+=t.kvy*o;const H=Math.exp(-o*2.6);t.kvx*=H,t.kvy*=H,t.kw*=Math.exp(-o*1.4),Math.abs(t.kw)+Math.abs(t.kvx)+Math.abs(t.kvy)<1e-5&&(t.kw=t.kvx=t.kvy=0)}t.turn+=i,t.turn>6.283&&Math.abs(t.z)<.05&&(t.turn=0,e.sound.note(43+(t.R*40|0),{dur:2.4,vel:.05,wave:"sine",cutoff:500}))},ea=(t,o)=>{if(t.hide-=o,t.dl>=0&&(t.dl-=o,t.dl<0&&(t.tc=1,t.hide=vt(1.2,4.2),t.ret=vt(.4,.85),e.sound.hit("kick",.12))),t.bt-=o,t.bt<=0&&(t.bt=vt(5,16),t.base=Vt()<.3?vt(.16,.42):vt(0,.08)),t.hide<=0&&t.tc>t.base){const c=Math.max(0,Math.sin(t.sk*t.tf))*(.35+.65*Math.max(0,Math.sin(t.sk*t.tf*.37+t.ph2)));t.tc=Math.max(t.base,t.tc-o*t.ret*(.2+.8*c)*1.5)}else t.tc<t.base&&(t.tc=Math.min(t.base,t.tc+o*.12));const r=t.tc>t.c+.02?t.tc>.9?22:2.2:2.3;t.c+=(t.tc-t.c)*(1-Math.exp(-o*r)),t.open=Math.max(0,1-t.c*3.2),t.ph+=o*t.sway,t.ph2+=o*t.sway*2.31,t.cor+=o*(20+5*Math.sin(t.ph*1.7)),t.beat+=o*(t.jaw+4*Math.sin(t.ph2))*t.open,t.sk+=o},zo=t=>{const o=.36*Math.sin(t.ph)+.24*Math.sin(t.ph*2.3+1),r=.5*Math.sin(t.ph2)+.3*Math.sin(t.ph2*.47+2);let c=t.x,x=t.y,d=t.a0+o*.22;const l=30,i=t.L;for(let k=0;k<=l;k++){const X=k/l;t.nodes[k*2]=c,t.nodes[k*2+1]=x;const G=X*X*(3-2*X);d+=(o*.42*Math.sin(X*3.14)+r*.32*G*G+t.bend*.32*Math.sin(X*2.6))*(1/l)*4*(1-.75*t.c);const tt=1-t.c*(.34+.5*G),it=i/l*tt;c+=Math.cos(d)*it,x+=Math.sin(d)*it;let N;if(X<.1)N=.16+1.5*X;else if(X<.46){const K=(X-.1)/.36;N=.31+.69*K*K*(3-2*K)}else if(X<.8){const K=(X-.46)/.34;N=1-.5*K*K*(3-2*K)}else{const K=(X-.8)/.12;N=.5+.12*Math.min(1,K)}const H=Math.pow(Math.max(0,Math.sin(Math.min(1,X*1.02)*3.1416)),.55)*.92;N+=(H-N)*t.c*.85,N*=1+t.c*.42,N*=1-(.05-.02*t.c)*Math.pow(Math.abs(Math.cos(X*15*Math.PI)),8);const at=Math.sqrt(Math.max(0,1-Math.pow(Math.max(0,(X-.92)/.08),2)));t.hw[k]=t.wid*N*Math.max(.1,at)}const s=t.nodes[l*2],g=t.nodes[l*2+1],v=s-t.nodes[(l-2)*2],M=g-t.nodes[(l-2)*2+1],R=Math.hypot(v,M)||1;t.mx=s,t.my=g,t.dx=v/R,t.dy=M/R,t.mid.x=t.nodes[14*2],t.mid.y=t.nodes[14*2+1]},oa=t=>{for(let o=0;o<ut.length;o++){const r=ut[o],c=nt[r.rt];let x=w(r.x-c.mx),d=w(r.y-c.my);const l=x*x+d*d;let i=0,s=0;if(c.open>.3){const g=-c.dy,v=c.dx,M=c.wid*1.5,R=c.wid*.75,k=x-c.dx*R-g*M,X=d-c.dy*R-v*M,G=x-c.dx*R+g*M,tt=d-c.dy*R+v*M,it=k*k+X*X+9e-4,N=G*G+tt*tt+9e-4,H=.0048*c.open;i+=-H*X/it+H*tt/N,s+=H*k/it-H*G/N;const at=.0022*c.open/(l+.0012);if(i-=x*at,s-=d*at,l<16e-5){r.x=c.mx+c.dx*f(.1,.24)+(V()-.5)*.22,r.y=c.my+c.dy*f(.1,.24)+(V()-.5)*.22,e.sound.hit("click",.025);continue}}i+=(V()-.5)*.022,s+=(V()-.5)*.022,r.x+=i*t,r.y+=s*t,l>.1&&(r.x=c.mx+c.dx*f(.05,.24)+(V()-.5)*.3,r.y=c.my+c.dy*f(.05,.24)+(V()-.5)*.3)}},Lo=(t,o,r)=>{let c=0,x=0,d=0;for(let l=0;l<ot.length;l++){const i=ot[l],s=Math.hypot(w(i.x-t),w(i.y-o)),g=r*Math.exp(-s/.36);g>.18&&i.st!==1&&(i.st=1,i.tm=f(.35,.9)*(.7+g),c++),s<.17*(.6+r*.5)&&r>.5&&(i.fl<.4&&x++,i.fl=1)}for(let l=0;l<nt.length;l++){const i=nt[l],s=Math.hypot(w(i.mx-t),w(i.my-o)),g=r*Math.exp(-s/.42);g>.22&&i.dl<0&&i.tc<.9&&(d++,i.dl=i.lat+s*vt(.25,.9)*(1.2-g*.5))}for(let l=0;l<xt.length;l++){const i=xt[l],s=w(i.x-t),g=w(i.y-o),v=Math.hypot(s,g)+.01,M=r*Math.exp(-v/.4)*.09/(.09+i.R);i.kvx+=s/v*M*.07,i.kvy+=g/v*M*.07,i.kw+=M*(l&1?1.6:-1.6)}for(let l=0;l<Bt.length;l++){const i=Bt[l],s=Math.hypot(w(i.x-t),w(i.y-o));i.kw=(i.kw||0)+r*Math.exp(-s/.4)*(l&1?.5:-.5)}for(let l=0;l<$t.length;l++){const i=$t[l],s=t-i.x,g=o-i.y,v=r*Math.exp(-Math.hypot(w(s),w(g))/.4);i.k===3&&v>.15&&(i.shT=Math.min(1,Math.max(i.shT,v*1.3)),i.side=Math.atan2(w(g),w(s))),i.k===0&&(i.kick+=v*.06*(l&1?1:-1))}for(let l=0;l<wt.length;l++){const i=wt[l],s=r*.03;i.svx+=Math.cos(l*2.1+t*9)*s,i.svy+=Math.sin(l*2.1+o*9)*s}x?e.sound.hit("hat",.3):c&&e.sound.hit("blip",.08,{freq:900})};for(const t of nt)zo(t);const aa=t=>{Xe+=t;for(let i=0;i<ot.length;i++)Zo(ot[i],t);for(let i=0;i<xt.length;i++)ta(xt[i],t);for(let i=0;i<nt.length;i++)ea(nt[i],t),zo(nt[i]);oa(t);for(let i=0;i<wt.length;i++){const s=wt[i];s.svx+=(-s.sx*30-s.svx*3.2)*t,s.svy+=(-s.sy*30-s.svy*3.2)*t,s.sx+=s.svx*t,s.sy+=s.svy*t}for(let i=0;i<ct.length;i++){const s=ct[i];s.tm-=t,s.tm<=0&&(s.dir=-s.dir,s.tm=f(2.5,11)),s.x+=Math.cos(s.a)*s.v*s.dir*t,s.y+=Math.sin(s.a)*s.v*s.dir*t,$e(s,s.L)&&(s.dir=-s.dir)}for(let i=0;i<Bt.length;i++){const s=Bt[i];s.x+=s.vx*t,s.y+=s.vy*t,s.a+=s.w*t,s.roll&&(s.ph+=s.roll*t),s.kw&&(s.a+=s.kw*t,s.kw*=Math.exp(-t*1.4)),Ke(s)}for(let i=0;i<$t.length;i++){const s=$t[i];s.k===0?(s.tm-=t,s.tm<=0&&(s.v=-s.v,s.tm=f(4,14)),s.x+=Math.cos(s.a)*s.v*t,s.y+=Math.sin(s.a)*s.v*t,s.ph+=s.bw*t,s.kick*=Math.exp(-t*1.2)):(s.x+=s.vx*t,s.y+=s.vy*t,s.w&&(s.a+=s.w*t*.2,s.k===3?s.roll+=s.w*t:s.ph+=s.w*t*6)),s.k===3&&(s.sh+=(s.shT>s.sh,(s.shT-s.sh)*(1-Math.exp(-t*(s.shT>s.sh?14:.9)))),s.shT*=Math.exp(-t*1.5)),At&&$e(s,s.ext)}const o=Fe,r=De,c=Oe?30:4.6;Fe+=(io-Fe)*(1-Math.exp(-t*c)),De+=(lo-De)*(1-Math.exp(-t*c));const x=Fe-o,d=De-r;fo+=x*.17,ho+=d*.17,fo*=Math.exp(-t/.9),ho*=Math.exp(-t/.9),to+=(-wo*900-to*18)*t,eo+=(-Mo*900-eo*18)*t,wo+=to*t,Mo+=eo*t,vo+=t,uo*=Math.exp(-t*.85);const l=Math.hypot(x,d)/t;l>2.4&&Lo(Fe,De,Math.min(.5,l*.09))},zt=new Float32Array(18*16),rt=new Float32Array(90*16),Xt=new Float32Array(24*16),Ot=new Float32Array(160*16),Qt=new Float32Array(80*16),Lt=new Float32Array(48),Z=new Float32Array(48*16),oo=new Float32Array(3),Jt=new Float32Array(10*12),Zt=new Float32Array(10*12),je=new Float32Array(180*4),sa=new Float32Array(4200*8),ht=new Float32Array(28),ao=P.dPos,ue=.036,Ve=.05,_o=(t,o)=>{const r=e.input,c=r.taps();for(let E=0;E<c.length;E++){const a=c[E],S=Fe+(a.x-.5)/m,T=De+(a.y-.5)/m;Lo(S,T,1),xo=a.x-.5,mo=a.y-.5,vo=0,uo=.03,po=a.x,bo=a.y,yo=Xe,Ze=0;const y=Math.atan2(mo,xo);to+=Math.cos(y)*.13,eo+=Math.sin(y)*.13,e.sound.hit("click",.4),e.sound.hit("noise",.05,{cutoff:500,dur:.25})}if(r.down&&r.inside){if(Oe){const E=r.x-Fo,a=r.y-Do;io-=E/m,lo-=a/m,Ze+=Math.hypot(E,a)}else po=r.x,bo=r.y,yo=Xe,Ze=0;Fo=r.x,Do=r.y,Oe=!0}else Oe&&Ze<.02&&Xe-yo<.4&&(io+=(po-.5)/m*.55,lo+=(bo-.5)/m*.55,e.sound.note(38,{dur:.32,vel:.05,wave:"triangle",cutoff:400})),Oe=!1;Je+=Math.min(o,.25);let x=0;for(;Je>=Ao&&x++<8;)aa(Ao),Je-=Ao;x>=8&&(Je=0);const d=Fe+wo,l=De+Mo,i=.5+.34;let s=0,g=0,v=0,M=0,R=0,k=0,X=0,G=0,tt=0,it=0,N=0;const H=fo*m,at=ho*m;for(let E=0;E<Mt.length;E++){const a=Mt[E],S=w(a.x-d)*m,T=w(a.y-l)*m,y=a.r*m*1.25;if(Math.abs(S)>.5+y||Math.abs(T)>.5+y)continue;const z=ue*Math.abs(a.z*m-Ve*.2),p=R*16;Qt[p]=S,Qt[p+1]=T,Qt[p+2]=a.ca,Qt[p+3]=a.sa,Qt[p+4]=y,Qt[p+5]=y,Qt[p+6]=y,Qt[p+7]=z,Qt[p+8]=a.cell%4,Qt[p+9]=a.cell>>2,Qt[p+10]=Math.max(0,Math.log2(z*qt*1.4+1)+Math.log2(Math.max(.25,192/(2*y*qt)))),Qt[p+11]=a.br*1.3/(1+z*40),R++}for(let E=0;E<ct.length;E++){const a=ct[E],S=w(a.x-d)*m+H,T=w(a.y-l)*m+at,y=a.L*m;if(Math.abs(S)>.5+y*1.2||Math.abs(T)>.5+y*1.2)continue;const z=M*16,p=ue*Math.abs(a.z*m);Ot[z]=S,Ot[z+1]=T,Ot[z+2]=Math.cos(a.a),Ot[z+3]=Math.sin(a.a),Ot[z+4]=y*1.1,Ot[z+5]=y*(a.W+.03+(a.kind===2?.3:0)),Ot[z+6]=y,Ot[z+7]=0,Ot[z+8]=a.W,Ot[z+9]=p/y*.75,Ot[z+10]=a.sd,Ot[z+11]=a.kind,Ot[z+12]=Bt.length?1/(1+p*260):1,M++}let K=0;for(let E=0;E<$t.length&&K<48;E++){const a=$t[E],S=w(a.x-d)*m+H,T=w(a.y-l)*m+at,y=a.R*m,z=a.ext*m*1.15+.02;if(Math.abs(S)>.5+z||Math.abs(T)>.5+z)continue;const p=K*16,lt=ue*Math.abs(a.z*m)/y,mt=a.k===3?1:Math.cos(a.a),W=a.k===3?0:Math.sin(a.a);if(Z[p]=S,Z[p+1]=T,Z[p+2]=mt,Z[p+3]=W,Z[p+6]=y,Z[p+7]=lt,Z[p+12]=1/(1+lt*3),Z[p+13]=0,Z[p+14]=a.k,Z[p+15]=a.sd*9,a.k===3)Z[p+4]=Z[p+5]=y*3,Z[p+8]=a.roll,Z[p+9]=a.sh,Z[p+10]=a.side,Z[p+11]=0,Z[p+14]=0;else if(a.k===0){const I=a.b0+a.b1*Math.sin(a.ph)+a.kick;Z[p+4]=y*1.02,Z[p+5]=y*(a.hw+Math.abs(I)*1.5+.03),Z[p+8]=a.hw,Z[p+9]=I,Z[p+10]=a.cl,Z[p+11]=0}else a.k===1?(Z[p+4]=y*1.06,Z[p+5]=y*(a.hr*1.5+Math.abs(a.bend)+.06),Z[p+8]=a.hr,Z[p+9]=a.nt,Z[p+10]=a.pt,Z[p+11]=a.bend,Z[p+13]=a.ph):(Z[p+4]=Z[p+5]=y*1.15,Z[p+8]=Z[p+9]=Z[p+10]=Z[p+11]=0);K++}for(let E=0;E<xt.length;E++){const a=xt[E],S=w(a.x-d)*m+H,T=w(a.y-l)*m+at,y=a.R*m;if(Math.abs(S)>.5+y*1.2||Math.abs(T)>.5+y*1.2)continue;const z=a.z*m,p=a.q,lt=a.mature;if(lt){const I=k*12;Jt[I]=S,Jt[I+1]=T,Jt[I+2]=z,Jt[I+3]=y,Jt[I+4]=p[0],Jt[I+5]=p[1],Jt[I+6]=p[2],Jt[I+7]=p[3],Jt[I+8]=a.br,Jt[I+9]=a.cut,Jt[I+10]=1,k++}else{const I=X*12;Zt[I]=S,Zt[I+1]=T,Zt[I+2]=z,Zt[I+3]=y,Zt[I+4]=p[0],Zt[I+5]=p[1],Zt[I+6]=p[2],Zt[I+7]=p[3],Zt[I+8]=a.br*1.4,Zt[I+9]=2,Zt[I+10]=1.75,X++}const mt=ue*Math.abs(z-Ve);let W=g*16;if(rt[W]=S,rt[W+1]=T,rt[W+2]=1,rt[W+3]=0,rt[W+4]=y*1.2,rt[W+5]=y*1.2,rt[W+6]=y,rt[W+7]=mt,rt[W+8]=p[0],rt[W+9]=p[1],rt[W+10]=p[2],rt[W+11]=p[3],rt[W+12]=lt?1:0,rt[W+13]=a.br,rt[W+14]=a.cut,rt[W+15]=E*.37%1,g++,lt&&g+10<90)for(let I=0;I<10;I++){const Dt=ao[I*4],Ut=ao[I*4+1],bt=ao[I*4+2],et=ao[I*4+3];if(et<=0)continue;const yt=p[1]*bt-p[2]*Ut+p[3]*Dt,Rt=p[2]*Dt-p[0]*bt+p[3]*Ut,St=p[0]*Ut-p[1]*Dt+p[3]*bt,xe=Dt+2*(p[1]*St-p[2]*Rt),Be=Ut+2*(p[2]*yt-p[0]*St),Se=bt+2*(p[0]*Rt-p[1]*yt),le=et*y,oe=ue*Math.abs(z+Se*y-Ve);W=g*16,rt[W]=S+xe*y,rt[W+1]=T+Be*y,rt[W+2]=1,rt[W+3]=0,rt[W+4]=le*1.36,rt[W+5]=le*1.36,rt[W+6]=le,rt[W+7]=oe,rt[W+8]=0,rt[W+9]=0,rt[W+10]=0,rt[W+11]=1,rt[W+12]=0,rt[W+13]=a.br*.5,rt[W+14]=0,rt[W+15]=0,g++}}for(let E=0;E<ot.length;E++){const a=ot[E],S=w(a.x-d)*m+H,T=w(a.y-l)*m+at,y=a.L*m,z=a.fl>0?1.62:1.24;if(Math.abs(S)>.5+y*z||Math.abs(T)>.5+y*z)continue;const p=s*16,lt=ue*(a.zz-Ve*.1)*m/y,mt=a.ax===void 0?a.a:a.ax;zt[p]=S,zt[p+1]=T,zt[p+2]=Math.cos(mt),zt[p+3]=Math.sin(mt),zt[p+4]=y*z,zt[p+5]=y*(a.W*1.28+.13+(a.fl>0?.5:0)),zt[p+6]=y,zt[p+7]=ue*a.tilt*m/y,zt[p+8]=a.W,zt[p+9]=a.roll,zt[p+10]=lt,zt[p+11]=a.cph,zt[p+12]=a.fl,zt[p+13]=a.sgn,zt[p+14]=a.vph,zt[p+15]=a.sd,s++}const dt=sa;let C=0;const te=(E,a,S,T,y,z,p,lt)=>{const mt=C*8;dt[mt]=E,dt[mt+1]=a,dt[mt+2]=S,dt[mt+3]=T,dt[mt+4]=y,dt[mt+5]=z,dt[mt+6]=p,dt[mt+7]=lt,C++};for(let E=0;E<nt.length;E++){const a=nt[E],S=w(a.x-d)*m,T=w(a.y-l)*m;if(Math.abs(S)>.5+a.L*m*1.1||Math.abs(T)>.5+a.L*m*1.1)continue;const y=ue*Math.abs(a.z*m),z=Math.min(y,.99)+Math.floor(a.gut*50),p=C;for(let lt=0;lt<=30;lt++){const mt=lt===0?0:lt-1,W=lt===30?30:lt+1;let I=a.nodes[W*2]-a.nodes[mt*2],Dt=a.nodes[W*2+1]-a.nodes[mt*2+1];const Ut=Math.hypot(I,Dt)||1;I/=Ut,Dt/=Ut;const bt=(a.nodes[lt*2]-a.x)*m+S,et=(a.nodes[lt*2+1]-a.y)*m+T,yt=a.hw[lt]*m,Rt=1.14,St=lt/30;lt===0&&p>0&&te(bt-Dt*-yt*Rt,et+I*-yt*Rt,St,-Rt,yt,z,a.c,a.beat),te(bt-Dt*-yt*Rt,et+I*-yt*Rt,St,-Rt,yt,z,a.c,a.beat),te(bt-Dt*yt*Rt,et+I*yt*Rt,St,Rt,yt,z,a.c,a.beat),lt===30&&te(bt-Dt*yt*Rt,et+I*yt*Rt,St,Rt,yt,z,a.c,a.beat)}if(a.open>.02&&v+2<=24){const lt=(a.mx-a.x)*m+S,mt=(a.my-a.y)*m+T,W=a.wid*m*.9*(.4+.6*a.open),I=-a.dy,Dt=a.dx,Ut=a.wid*m*.6;for(let bt=-1;bt<=1;bt+=2){const et=v*16;Xt[et]=lt-a.dx*a.wid*m*.12*a.open+I*Ut*bt,Xt[et+1]=mt-a.dy*a.wid*m*.12*a.open+Dt*Ut*bt,Xt[et+2]=a.dx,Xt[et+3]=a.dy;const yt=W*1.72;Xt[et+4]=yt,Xt[et+5]=yt,Xt[et+6]=W,Xt[et+7]=y,Xt[et+8]=a.cor*bt+E,Xt[et+9]=a.open,Xt[et+10]=bt,Xt[et+11]=0,Xt[et+15]=E*.37+bt*.2,v++}}}it=C;for(let E=0;E<wt.length;E++){const a=wt[E],S=a.n,T=a.w*m,y=a.nodes,z=S>>1,p=w(y[z*3]-d)-(y[z*3]-d),lt=w(y[z*3+1]-l)-(y[z*3+1]-l),mt=S*a.step*.5;for(let W=-1;W<=1;W++)for(let I=-1;I<=1;I++){const Dt=p+I*Y,Ut=lt+W*Y;if((Math.abs(y[z*3]-d+Dt)-mt)*m>.56||(Math.abs(y[z*3+1]-l+Ut)-mt)*m>.56)continue;let bt=!0;for(let et=0;et<S;et++){const yt=et===0?0:et-1,Rt=et===S-1?S-1:et+1;let St=y[Rt*3]-y[yt*3],xe=y[Rt*3+1]-y[yt*3+1];const Be=Math.hypot(St,xe)||1;St/=Be,xe/=Be;const Se=Math.sin(3.1416*et/(S-1)),le=(y[et*3]-d+Dt+a.sx*Se)*m,oe=(y[et*3+1]-l+Ut+a.sy*Se)*m,me=et*a.step/(2*a.w),ze=ue*Math.abs(y[et*3+2]*m),Pt=1.18;if(C+4>=4200)break;bt&&C>it&&te(le+xe*T*Pt,oe-St*T*Pt,me,-Pt,T,ze,a.cp,a.sd),te(le+xe*T*Pt,oe-St*T*Pt,me,-Pt,T,ze,a.cp,a.sd),te(le-xe*T*Pt,oe+St*T*Pt,me,Pt,T,ze,a.cp,a.sd),et===S-1&&te(le-xe*T*Pt,oe+St*T*Pt,me,Pt,T,ze,a.cp,a.sd),bt=!1}}}for(let E=0;E<ut.length;E++){const a=ut[E],S=w(a.x-d)*m+H,T=w(a.y-l)*m+at;if(Math.abs(S)>.55||Math.abs(T)>.55||G>=180)continue;const y=G*4;je[y]=S,je[y+1]=T,je[y+2]=a.s,je[y+3]=a.b,G++}for(let E=0;E<de.length&&E<2;E++){const a=de[E],S=w(a.x-d)*m,T=w(a.y-l)*m,y=a.r*m;if(Math.abs(S)>.5+y*1.2||Math.abs(T)>.5+y*1.2)continue;const z=N*16;Lt[z]=S,Lt[z+1]=T,Lt[z+2]=1,Lt[z+3]=0,Lt[z+4]=y*1.16,Lt[z+5]=y*1.16,Lt[z+6]=y,Lt[z+7]=0,N++}if(At){const E=(At.x-d)*m,a=(At.y-l)*m,S=At.R*m,T=N*16;Lt[T]=E,Lt[T+1]=a,Lt[T+2]=1,Lt[T+3]=0,Lt[T+4]=S*1.03,Lt[T+5]=S*1.03,Lt[T+6]=S,Lt[T+7]=.2/S,N++,oo[0]=E,oo[1]=a,oo[2]=S}const _e=uo*Math.min(1,vo*14),Ft=P.hdr?1:.25;ht[0]=qt,ht[1]=Xe,ht[2]=m,ht[3]=Y*m,ht[4]=d*m,ht[5]=l*m,ht[6]=H,ht[7]=at,ht[8]=xo,ht[9]=mo,ht[10]=0,ht[11]=_e,ht[12]=Ve,ht[13]=Ue==="Paramecium bursaria (green)"?1:0,ht[14]=ue,ht[15]=Ft,ht[16]=he[0][0],ht[17]=he[0][1],ht[18]=he[0][2],ht[19]=_,ht[20]=he[1][0],ht[21]=he[1][1],ht[22]=he[1][2],ht[23]=.0062,ht[24]=B[0],ht[25]=B[1],ht[26]=.37,ht[27]=12,n.bindBuffer(n.UNIFORM_BUFFER,P.ubo),n.bufferSubData(n.UNIFORM_BUFFER,0,ht),n.bindBufferBase(n.UNIFORM_BUFFER,0,P.ubo);let ee=P.targets[qt];ee||(ee=P.targets[qt]=P.mkTarget(qt)),n.bindFramebuffer(n.FRAMEBUFFER,ee.f),n.viewport(0,0,qt,qt),n.disable(n.DEPTH_TEST),n.disable(n.CULL_FACE),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.disable(n.DITHER),n.colorMask(!0,!0,!0,!0),n.depthMask(!1),n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendFunc(n.ONE,n.ONE),n.blendEquation(n.FUNC_ADD);const _t=(E,a)=>{n.activeTexture(n.TEXTURE0+E),n.bindTexture(n.TEXTURE_2D,a)},ie=(E,a,S,T)=>{T&&(n.useProgram(E),n.bindVertexArray(a.vao),n.bindBuffer(n.ARRAY_BUFFER,a.vb),n.bufferSubData(n.ARRAY_BUFFER,0,S,0,T*16),n.drawArraysInstanced(n.TRIANGLE_STRIP,0,4,T))};if(_t(0,P.noise),_t(1,P.walk),At){const E=P.extra("speckE");n.useProgram(E),n.uniform3fv(P.loc(E,"uEd"),oo)}else n.useProgram(P.P.speck);n.bindVertexArray(P.vSpeck.vao),n.drawArrays(n.POINTS,0,j),_t(1,P.atlas),ie(P.P.clump,P.vClump,Qt,R),C>it&&(n.useProgram(P.P.fil),n.bindVertexArray(P.vRib.vao),n.bindBuffer(n.ARRAY_BUFFER,P.vRib.vb),n.bufferSubData(n.ARRAY_BUFFER,0,dt,0,C*8),n.drawArrays(n.TRIANGLE_STRIP,it,C-it)),ie(P.P.dia,P.vDia,Ot,M),N&&ie(P.P.bub,P.vBub,Lt,N),K&&ie(P.extra(A),P.vNew,Z,K),_t(1,P.net),ie(P.P.shell,P.vShell,rt,g),(k||X)&&(n.useProgram(P.P.cell),k&&(n.bindVertexArray(P.vColA.vao),n.bindBuffer(n.ARRAY_BUFFER,P.vColA.vb),n.bufferSubData(n.ARRAY_BUFFER,0,Jt,0,k*12),n.drawArraysInstanced(n.POINTS,0,1400+10*130,k)),X&&(n.bindVertexArray(P.vColB.vao),n.bindBuffer(n.ARRAY_BUFFER,P.vColB.vb),n.bufferSubData(n.ARRAY_BUFFER,0,Zt,0,X*12),n.drawArraysInstanced(n.POINTS,1400+10*130,420,X))),ie(P.P.para,P.vPara,zt,s),it>0&&(n.useProgram(P.P.rot),n.bindVertexArray(P.vRib.vao),n.bindBuffer(n.ARRAY_BUFFER,P.vRib.vb),C<=it&&n.bufferSubData(n.ARRAY_BUFFER,0,dt,0,C*8),n.drawArrays(n.TRIANGLE_STRIP,0,it)),ie(P.P.cor,P.vCor,Xt,v),G&&(n.useProgram(P.P.food),n.bindVertexArray(P.vFood.vao),n.bindBuffer(n.ARRAY_BUFFER,P.vFood.vb),n.bufferSubData(n.ARRAY_BUFFER,0,je,0,G*4),n.drawArrays(n.POINTS,0,G)),n.disable(n.BLEND),n.bindVertexArray(P.vEmpty),n.useProgram(P.P.down),n.bindFramebuffer(n.FRAMEBUFFER,P.q.f),n.viewport(0,0,256,256),_t(1,ee.t),n.uniform2f(P.uX,1.2/qt,1.2/qt),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindFramebuffer(n.FRAMEBUFFER,P.w.f),n.viewport(0,0,64,64),_t(1,P.q.t),n.uniform2f(P.uX,3/256,3/256),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.bindFramebuffer(n.FRAMEBUFFER,null),n.viewport(0,0,qt,qt),n.useProgram(F),_t(0,P.noise),_t(1,ee.t),_t(2,P.q.t),_t(3,P.w.t),n.drawArrays(n.TRIANGLE_STRIP,0,4),n.activeTexture(n.TEXTURE0)};return _o(0,0),_o}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
