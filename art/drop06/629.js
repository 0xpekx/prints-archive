// Brine Pool: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/629.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Yt){Yt&&function(){"use strict";const de={yaw:0,pitch:0,x:0,y:0,z:0},Lt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,me="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",Ut=`
uniform sampler3D uN;
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)*.0625)
float sat(float x){return clamp(x,0.,1.);}
`,xe=Ut+`
uniform vec4 uC[5];
out vec4 oC;
#define W uC[0].x
#define AX uC[3].x
#define L1 uC[1].x
#define L2 uC[1].y
#define P1 uC[1].z
#define P2 uC[1].w
float at(float y,float x){float a=atan(y/(abs(x)+1e-5));return x<0.?(y<0.?-3.14159-a:3.14159-a):a;}
float fb(vec2 p,float m){float a=0.,w=.5,t=0.;for(int i=0;i<4;i++){a+=w*NS(vec3(p,float(i)*3.7),m);t+=w;m*=.5;w*=.5;}return a/t;}
float poolD(vec2 p,vec2 C,float R){
  vec2 q=p-C;q.x/=AX;q+=(fb(p+7.,9.)-.5)*5.*smoothstep(0.,9.,length(p));
  float r=length(q),a=at(q.y,q.x);
  float rp=R*(1.+L1*sin(a*2.+P1)+L2*sin(a*3.+P2)+.05*sin(a*7.+P1*3.));
  return r-rp;
}
void main(){
  vec2 uv=gl_FragCoord.xy*uC[3].y;
  vec2 p=(uv*2.-1.)*W;
  float d=poolD(p,uC[0].yz,uC[0].w);
  if(uC[3].z>0.){float d2=poolD(p,uC[2].xy,uC[3].z);float k=.7;float hh=sat(.5+.5*(d2-d)/k);d=mix(d2,d,hh)-k*hh*(1.-hh);}
  d+=(fb(p+31.,2.6)-.5)*1.2*(.3+.7*smoothstep(0.,6.,length(p)));
  float h;
  if(d>0.){
    float mound=uC[2].z*(1.-exp(-d/2.1))*smoothstep(12.,3.5,d)*(.55+fb(p+4.,3.2));
    float base=(fb(p+9.,12.)-.5)*1.9*smoothstep(0.,8.,d);
    float up=uC[2].w*max(d-3.,0.)*(.7+fb(p+19.,16.)*.6);
    h=mound+base+up+(fb(p+15.,1.1)-.5)*.1*smoothstep(0.,1.,d);
  }else{
    h=-1.4*(1.-exp(d/2.4));
  }
  float BW=uC[4].x,PA=uC[4].y,PF=uC[4].z;
  float bw=BW+(fb(p+50.,5.)-.5)*BW*.9;
  float m=smoothstep(.3,.62,d)*smoothstep(bw,bw-1.4,d);
  float patchy=smoothstep(PA-.08,PA+.08,fb(p+3.,2.8));
  m*=mix(1.,patchy,sat(smoothstep(0.,bw*.75,d)*PF));
  oC=vec4(h*uC[4].w,m,clamp(d,-30.,30.)*uC[4].w,fb(p+77.,1.4));
}
`,pe=`
uniform sampler2D uH,uLT;uniform vec4 uC;
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
float H(vec2 q){return texture(uH,(q/uC.x+1.)*.5).r/uC.z;}
void main(){
  vec2 ic=gl_FragCoord.xy;
  vec2 p=(ic*uC.y*2.-1.)*uC.x;
  vec3 P=vec3(p.x,H(p)+.05,p.y);
  vec4 o=vec4(0);
  // your own spot, tested once outside the loop (the loop is unrolled on Windows)
  vec4 sd=texelFetch(uLT,ivec2(3,3),0),sp=texelFetch(uLT,ivec2(3,2),0);
  float s3=sp.y*smoothstep(sd.w,sd.w+sp.x,dot(normalize(P-texelFetch(uLT,ivec2(0,3),0).xyz),sd.xyz));
  for(int i=0;i<4;i++){
    vec4 a=texelFetch(uLT,ivec2(0,i),0),b=texelFetch(uLT,ivec2(1,i),0);
    vec3 L=a.xyz-P;float r=length(L);L/=r;
    float spot=smoothstep(b.w,b.w+a.w,dot(-L,b.xyz));
    spot+=i==3?s3:0.;
    float v=1.;
    if(spot>0.){
      float dt=r/22.;
      for(int k=0;k<22;k++){float s=(float(k)+.7)*dt;vec3 q=P+L*s;v=min(v,sat((q.y-H(q.xz))/(.02+.05*s)+.5));}
    }
    o[i]=spot*v/(r*r+(i==3?7.:3.))*uC.w;
  }
  oC=o;
}
`,Te=Ut+`
uniform vec4 uP[9];uniform vec4 uHC,uHR;
uniform sampler2D uH,uL,uT,uLT;
out vec4 oC;
#define W uP[4].x
#define TL uP[4].y
#define SIG uP[4].w
#define AT uP[5].rgb
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
vec4 hf(vec2 xz){return texture(uH,(xz/W+1.)*.5);}
float hAt(vec2 xz,float t){vec4 a=hf(xz);float h=a.r/uP[6].w;if(t<9.&&a.g>.03)h+=a.g*(textureLod(uT,xz/TL,.5+t*.5).a-.35)*.032;return h;}
vec3 lp[4],ld[4],lc[4];float lco[4],lso[4],lsw[4];
void main(){
  vec2 ndc=(gl_FragCoord.xy+uP[8].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){d.y=-min(d.y,-.0035);o.y=-o.y;d=normalize(d);t0=-o.y/d.y;}
  for(int i=0;i<4;i++){vec4 a=texelFetch(uLT,ivec2(0,i),0),b=texelFetch(uLT,ivec2(1,i),0),c=texelFetch(uLT,ivec2(2,i),0);lp[i]=a.xyz;lso[i]=a.w;ld[i]=b.xyz;lco[i]=b.w;lc[i]=c.rgb;lsw[i]=c.a;}
  vec4 spD=texelFetch(uLT,ivec2(3,3),0),spF=texelFetch(uLT,ivec2(3,2),0);
  float tw=(m<.5&&d.y<-1e-4)?-o.y/d.y:1e9;
  float tEnd=min(tw,78.),t=t0,lt=t0;bool hit=false;
  for(int i=0;i<96&&t<tEnd;i++){
    vec3 q=o+d*t;float dy=q.y-hAt(q.xz,t);
    if(dy<0.){hit=true;break;}
    lt=t;t+=clamp(dy*.6,.007+.008*t,.6+.04*t);
  }
  if(hit){for(int i=0;i<6;i++){float mid=.5*(lt+t);vec3 q=o+d*mid;if(q.y<hAt(q.xz,mid))t=mid;else lt=mid;}}
  int kind=hit?1:(tw<78.?2:0);
  float tFar=hit?t:(kind==2?tw:78.);
  // what the beams light along the way: lamps' cones with a forward-peaked phase, a little hanging haze on the interface
  vec3 acc=vec3(0);
  float tA=t0,tB=min(tFar,70.);
  float j=fract(h21(gl_FragCoord.xy)+float(int(uP[8].z*4.))*.618);
  int NL=int(uP[2].w),NK=NL*3+2;
  for(int i=0;i<NL;i++){
    vec3 ol=lp[i]-o;float bl=dot(ol,d);vec3 cr=ol-d*bl;float D2=dot(cr,cr)+.03,Dd=sqrt(D2);
    float tha=atan((tA-bl)/Dd),thb=atan((tB-bl)/Dd),dth=thb-tha;
    for(int k=0;k<NK;k++){
      float th=tha+dth*(float(k)+j)/14.;
      float tk=bl+Dd*tan(th);
      vec3 x=o+d*tk;
      vec3 v=lp[i]-x;float r2=dot(v,v),r=sqrt(r2);v/=r;
      float s=smoothstep(lco[i],lco[i]+lso[i],dot(-v,ld[i]));
      s=i==3?s*s*s*spF.w+spF.z*smoothstep(spD.w,spD.w+spF.x,dot(-v,spD.xyz)):s*s;
      if(s<=0.)continue;
      float nz=NS(x*vec3(1,1.6,1),2.6);
      float dens=SIG*(.55+.9*nz);
      float hz=x.y>0.?uP[6].r*exp(-x.y/uP[5].w)*(.35+1.3*NS(x*vec3(1,3,1),.9)):0.;
      float ca=dot(v,d);
      float ph=.035+.14/pow(1.31-.8*ca,1.5);
      float wg=dth/(Dd*14.)*r2;
      vec3 lci=i==3?lc[i]*vec3(.5,.86,1.):lc[i];
      acc+=lci*lsw[i]*s*(dens*ph+hz*.05)*wg/(r2+1.8)*exp(-AT*2.4*(r+tk));
    }
  }
  vec3 col=vec3(0);float wat=0.;
  // the lamps themselves, tiny and very bright, a little soft
  float occl=hit?t:1e9;
  for(int i=0;i<3;i++){
    vec3 v=lp[i]-o;float r=length(v);v/=r;
    if(occl>r){float ca=1.-dot(v,d);col+=lc[i]*(.006*exp(-ca/3e-6)+(.0004*exp(-ca/4e-5)+.00003*exp(-ca/4e-4)+.000004*exp(-ca/3e-3))*vec3(.7,.9,1.15))*exp(-AT*r);}
  }
  if(kind>0){
    vec3 P=o+d*tFar;
    float tM=tFar,inB=0.;
    if(kind==2){
      // into the brine: the bed under the surface, seen through brown murk (brine bends light very little)
      float dp=max(-hf(P.xz).r/uP[6].w,0.);
      inB=min(dp/max(-d.y,.03),4.);
      P+=d*inB;tM+=inB;
    }
    vec3 N=vec3(0,1,0);
    vec4 a=hf(P.xz);
    float maskM=0.;
    vec3 alb=vec3(0),rough;
    float wet=0.,cav=1.,gl=0.;
    // (deep in the brine the bed is lost in the murk: skip its material there)
    if(inB<.7){
      float e=.09;
      float hL=hf(P.xz-vec2(e,0)).r/uP[6].w,hR=hf(P.xz+vec2(e,0)).r/uP[6].w,hD=hf(P.xz-vec2(0,e)).r/uP[6].w,hU=hf(P.xz+vec2(0,e)).r/uP[6].w;
      N=normalize(vec3(hL-hR,2.*e,hD-hU));
      float m0=a.g,dw=a.b/uP[6].w;
      float lod=max(0.,log2(tM*uP[8].w+1e-4));
      vec4 tt=textureLod(uT,P.xz/TL,lod);
      vec2 sl=(tt.rg-.5)*2.;
      // the floor: fine grey-brown mud, pocked with burrow holes, each with a small raised lip
      vec3 pf=vec3(P.x,0,P.z);
      float n1=NS(pf,.55),n2=NS(pf+3.,.14),nf=NS(pf+7.,.05);
      float sf=1./(1.+tM*.16);
      vec3 silt=mix(vec3(.16,.15,.135),vec3(.21,.2,.18),mix(.5,n1,sf))*(1.+(.3*n2-.15)*sf)*(1.+(.3*nf-.15)*sf);
      float pn=NS(pf+vec3(40.,0,17.),.045);
      float pit=smoothstep(.7,.73,pn)*sf,lip=(smoothstep(.62,.69,pn)-pit)*sf;
      silt*=1.-.75*pit+.18*lip;
      vec3 g=vec3(NS(pf+vec3(.04,0,0),.14)-n2,0.,NS(pf+vec3(0,0,.04),.14)-n2)/.04;
      vec3 Ns=normalize(N+vec3(-g.x,0,-g.z)*.018);
      // the dark shore: wet black mud where the brine has stained the sediment, with pale bacterial mats on it
      float shore=smoothstep(uP[7].x+.3,0.,dw+(n1-.5)*.8);
      vec3 rim=vec3(.035,.032,.028)*(.6+.8*n2);
      float matN=NS(pf+vec3(21.,0,4.),.42)+.35*(nf-.5);
      rim=mix(rim,mix(vec3(.1,.098,.085),vec3(.13,.11,.065),n1),smoothstep(.6,.72,matN)*smoothstep(.1,.5,shore)*.6);
      rim=mix(rim,vec3(.12,.06,.03)*(.7+.5*nf),smoothstep(.72,.76,NS(pf+5.,.6))*.7);
      silt=mix(silt,rim,sat(shore));
      wet=max(shore*.8,0.);
      // mussels: plump brown shells packed shoulder to shoulder, worn to chalk on the backs of the old ones, a few gaping
      float tb=tt.b;
      vec3 musA=mix(vec3(.03,.022,.016),vec3(.13,.062,.03),sat(tb/.12));
      musA=mix(musA,vec3(.39,.25,.125),sat((tb-.12)/.43));
      musA=mix(musA,vec3(.43,.4,.35),sat((tb-.55)/.05));
      musA=mix(musA,vec3(.5,.38,.27),sat((tb-.75)/.05));
      musA=mix(musA,vec3(.62,.6,.56),sat((tb-.86)/.04));
      musA*=.85+.3*NS(pf+vec3(11.,0,3.),.9);
      musA=mix(musA,uP[7].gba,uP[6].b);
      cav=mix(1.,smoothstep(.08,.5,tt.a)*.94+.06,m0);
      vec3 musN=normalize(N+vec3(sl.x,0,sl.y)*.85);
      alb=mix(silt,musA,m0);
      N=normalize(mix(Ns,musN,m0));
      gl=m0*sat((tb-.12)*8.)*sat((.55-tb)*20.);
      wet=max(wet,m0*.5);
      maskM=m0;
    }
    // light from each lamp (the light map carries spot, falloff and shadow), a soft wet sheen on the shells' skin
    vec2 luv=(P.xz/W+1.)*.5;
    vec4 lmv=textureLod(uL,luv,0.);
    vec3 E=vec3(0),S=vec3(0);
    vec3 Vw=normalize(o-P);
    for(int i=0;i<4;i++){
      vec3 v=lp[i]-P;float r=length(v);v/=r;
      vec3 li=lc[i]*lmv[i]/uP[4].z*exp(-AT*(r+tM));
      float nl=max(dot(N,v),0.);
      E+=li*max((nl+.12)/1.12,0.);
      if(wet>.01&&nl>0.){float sp=pow(max(dot(N,normalize(v+Vw)),0.),24.);S+=li*sp;}
    }
    E+=uP[6].g*vec3(.6,.75,.9)*exp(-tM*.06);
    vec3 c0=alb*E*cav+wet*S*(.03+.2*gl)*cav;
    if(kind==2){
      // the murk: brown-green, lit where the lamps reach into it, swallowing the bed within a hand's breadth
      float tr=exp(-inB*7.);
      vec3 murk=(vec3(.034,.027,.014)*E+vec3(.0026,.0024,.0016))*(.3+.7*exp(-inB*.8));
      col+=mix(murk,c0,tr);
      wat=1.;
    }else col+=c0;
  }
  vec3 c1=col+acc;
  if(m>.5){oC=vec4(c1,1.);return;}
  oC=vec4(c1*uP[8].z,(wat>.5?1.:0.)*uP[8].z);
}
`,Ee=`
uniform vec4 uP[4];uniform vec4 uF[3];uniform sampler2D uH,uLT;
out vec2 vP;flat out vec3 vC;flat out vec4 vS;
float sat(float x){return clamp(x,0.,1.);}
float hs(int id,float k){return fract(sin(float(id)*12.9898+k*78.233)*43758.5453);}
vec2 q[4]=vec2[4](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(1,1));
void main(){
  int id=gl_InstanceID;
  vec3 ec=uP[0].xyz;
  bool nearOne=id<int(uF[0].z);
  // two clouds of flakes: one round the eye, in your own lamps; one round the far vehicle's beams
  float B=nearOne?10.:18.,Hh=nearOne?6.:7.;
  float t=uF[0].x;
  float vy=.012+.03*hs(id,3.);
  float a=hs(id,5.)*6.28+t*(.1+.12*hs(id,8.));
  // all of it slides the same way on the slow bottom current while it sinks, each flake tumbling a little on its own
  vec3 p=vec3(hs(id,1.)*B+t*uF[1].w,hs(id,2.)*Hh-t*vy,hs(id,4.)*B+t*uF[1].w*.45)+vec3(sin(a),.4*sin(a*1.7),cos(a*1.3))*.06;
  vec3 bc=ec;if(nearOne){bc.xz+=normalize(uP[1].xz+1e-4)*B*.42;}else bc.xz=uF[2].zw;
  p.xz=mod(p.xz-bc.xz+B*.5,B)-B*.5+bc.xz;
  p.y=nearOne?mod(p.y-ec.y+Hh*.5,Hh)+ec.y-Hh*.5:mod(p.y,Hh);
  float h=texture(uH,(p.xz/uF[0].y+1.)*.5).r/uF[0].w;
  vec3 v=p-ec;
  float vz=dot(v,uP[1].xyz);
  if(p.y<max(h,0.)||vz<.25){gl_Position=vec4(2.,2.,0.,1.);vC=vec3(0);vP=vec2(0);vS=vec4(1,0,1,0);return;}
  vec3 col=vec3(0);
  vec3 ve=-normalize(v);
  vec4 spD=texelFetch(uLT,ivec2(3,3),0),spF=texelFetch(uLT,ivec2(3,2),0);
  for(int i=0;i<4;i++){
    vec4 aa=texelFetch(uLT,ivec2(0,i),0),b=texelFetch(uLT,ivec2(1,i),0),cc=texelFetch(uLT,ivec2(2,i),0);
    vec3 L=aa.xyz-p;float r2=dot(L,L),r=sqrt(r2);L/=r;
    float s=smoothstep(b.w,b.w+aa.w,dot(-L,b.xyz));
    // your own lamps: the spot lights its cone, the flood only what is close to the bank
    if(i==3)s=s*s*s*spF.w*.05+spF.z*.6*smoothstep(spD.w,spD.w+spF.x,dot(-L,spD.xyz));
    else if(nearOne)s*=.15;
    if(s<=0.)continue;
    float ca=dot(L,-ve);
    float ph=.08+.45/pow(1.25-.75*ca,1.5);
    col+=cc.rgb*s*ph*(.03+.035*hs(id,6.))/(r2+3.)*exp(-uF[1].rgb*(r+vz));
  }
  // clouds of denser snow drift through and thin again (no period: two slow fields at unrelated rates)
  float cl=sin(dot(p,vec3(.31,.17,.23))+t*.041)*sin(dot(p,vec3(-.19,.29,.13))-t*.029+1.3);
  col*=(.55+.9*sat(.5+cl))*(nearOne?1.:.09);
  float px=uF[2].y/(vz*uP[1].w);
  // flakes from dust to tufts; the near ones out of focus as wide soft blurs
  float h7=hs(id,7.);
  float ri=(nearOne?.0024:.0026)+.011*h7*h7*h7;
  float coc=min(uF[2].y*.0125*abs(1./vz-1./3.4),uF[2].y*.028);
  float rp=max(max(ri*px,coc),.9);
  float sz=ri*px*ri*px/(rp*rp);
  col=min(col*min(1.,sz+.1+.25*sat(coc/rp-.5))*uF[2].x*2.5,vec3(.9));
  // the flake's own shape: a ragged clot or a string, turned any way
  float e=1.35+2.4*pow(hs(id,9.),1.6),an=hs(id,10.)*6.28+t*.05*(hs(id,11.)-.5);
  vS=vec4(cos(an),sin(an),e,hs(id,12.));
  rp*=1.9-.6*sat(coc/rp);
  vec2 o=q[gl_VertexID];
  vP=o;vC=col*2.7/e;
  vec2 c0=vec2(dot(v,uP[2].xyz),dot(v,uP[3].xyz))/(vz*uP[1].w);
  gl_Position=vec4(c0+o*rp*2./uF[2].y,0.,1.);
}
`,we=`
in vec2 vP;flat in vec3 vC;flat in vec4 vS;
out vec4 oC;
void main(){
  float d=dot(vP,vP);if(d>1.)discard;
  vec2 p=mat2(vS.x,-vS.y,vS.y,vS.x)*vP;p.x/=vS.z;
  float h=vS.w;
  vec2 c1=vec2(fract(h*7.13)-.5,fract(h*3.71)-.5)*1.1,c2=vec2(fract(h*5.29)-.5,fract(h*9.17)-.5)*1.2;
  float a=exp(-dot(p,p)*9.)+.6*exp(-dot(p-c1,p-c1)*24.)+.4*exp(-dot(p-c2,p-c2)*34.);
  a*=(1.-d)*(1.-d);
  oC=vec4(vC*a,1.);
}
`,be=Ut+`
uniform vec4 uP[4];uniform vec4 uC[6];
uniform sampler2D uA,uR,uSn;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uC[0].y;
  vec4 a=texture(uA,uv);
  vec3 col=a.rgb;
  float t=uC[0].z;
  vec2 ndc=uv*2.-1.;
  float wat=smoothstep(.2,.8,a.a);
  if(wat>0.){
    vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
    vec3 o=uP[0].xyz;
    float tw=-o.y/min(d.y,-1e-3);
    vec3 P=o+d*tw;
    // slow heavy waves: long crests, low reduced gravity
    vec2 g=vec2(0);
    for(int i=0;i<int(uC[0].w);i++){
      float q=float(i);
      float ang=.7+q*2.399;
      vec2 dr=vec2(cos(ang),sin(ang));
      float lam=(3.+q*1.7)*uC[2].w,k=6.2832/lam;
      float om=sqrt(k*uC[1].z)+.02*q;
      float ph=dot(P.xz,dr)*k-om*t+q*1.3;
      float env=smoothstep(.3,.72,textureLod(uN,vec3(P.xz*(.035+.01*q)+q*.31,q*.17+t*.0015),0.).r);
      g+=dr*cos(ph)*k*uC[1].x*(1./(1.+q*.6))*env*1.7;
    }
    vec3 q1=vec3(P.x*.21,P.z*.21,t*.018);
    g+=(vec2(textureLod(uN,q1,0.).r,textureLod(uN,q1.yxz+.37,0.).r)-.5)*uC[1].y;
    float dist=length(P-o);
    vec3 n=normalize(vec3(-g.x,1.,-g.y));
    float D=uC[2].x;
    vec3 r=reflect(d,n);
    vec3 Pt=P+r*D;
    vec3 O2=vec3(o.x,-o.y,o.z);
    vec3 v=Pt-O2;v.y=-v.y;
    float fz=max(dot(v,uP[1].xyz),.1);
    vec2 uv2=vec2(dot(v,uP[2].xyz),dot(v,uP[3].xyz))/(fz*uP[1].w)*.5+.5;
    // the mirror only at a flat angle and softly: the lamps stand in it as one blurred column the swell bends
    vec3 rc=vec3(0);float wt=0.;
    for(int i=-2;i<=2;i++){float w=1./(1.+float(i*i)*.3);rc+=textureLod(uR,uv2+vec2(0.,float(i)*uC[0].y*9.),2.2).rgb*w;wt+=w;}
    rc/=wt;
    float ld=max(dot(r,uC[3].xyz),0.);
    float gl=pow(ld,300.)*uC[3].w*.012;
    float cosv=max(dot(-d,n),0.);
    float F=.03+.97*pow(1.-cosv,uC[2].y);
    vec2 tl=normalize(uC[5].xz-P.xz);
    col*=1.+wat*clamp(dot(g,tl)*uC[5].w*.3,-.5,.6);
    col=col*(1.-wat*F)+wat*(rc+uC[4].rgb*gl)*F*uC[2].z;
  }
  // a thin layer where brine and sea mix over the far shore: what is seen through it wavers
  if(wat<.01&&texture(uA,uv-vec2(0.,uC[0].y*14.)).a>.5){
    vec2 wv=(textureLod(uN,vec3(uv*vec2(5.,26.),t*.11),0.).r-.5)*vec2(5.,2.)*uC[0].y;
    col=texture(uA,uv+wv).rgb;
  }
  col*=uC[0].x;
  col=col/(1.+col*.42)*1.18;
  col=pow(max(col,vec3(0.)),vec3(1./2.2));
  vec3 sn=texture(uSn,uv).rgb;
  col=1.-(1.-col)*(1.-min(sn,vec3(1.)));
  float gg=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(gg-.5)*.008;
  col=mix(col*col*(3.-2.*col),col,.72);
  oC=vec4(col,1.);
}
`;function Re(e){if(e.__c629)return e.__c629;e.getExtension("KHR_parallel_shader_compile");const t=!!e.getExtension("EXT_color_buffer_float")||!!e.getExtension("EXT_color_buffer_half_float");e.getExtension("OES_texture_float_linear");const i=(r,f)=>{const d=e.createShader(r);return e.shaderSource(d,f),e.compileShader(d),d},n=i(e.VERTEX_SHADER,Lt+me),y={},u=(r,f,d)=>{const P=i(e.FRAGMENT_SHADER,Lt+f),M=d?i(e.VERTEX_SHADER,Lt+d):n,p=e.createProgram();e.attachShader(p,M),e.attachShader(p,P),e.linkProgram(p),e.flush(),y[r]={p,v:M,f:P}};u("h",xe),u("l",pe),u("s",Te),u("snow",we,Ee),u("c",be);let v=1654291214;const a=64,F=new Float32Array(a*a*a),m=new Float32Array(a*a*a);for(let r=0;r<F.length;r++){v=v+1831565813|0;let f=Math.imul(v^v>>>15,1|v);f=f+Math.imul(f^f>>>7,61|f)^f,F[r]=((f^f>>>14)>>>0)/4294967296}const R=[.25,.5,.25],s=(r,f,d,P,M)=>{for(let p=0;p<a;p++)for(let q=0;q<a;q++)for(let k=0;k<a;k++){let B=0;for(let g=-1;g<=1;g++)B+=R[g+1]*r[(k+g*d&63)+64*((q+g*P&63)+64*(p+g*M&63))];f[k+64*(q+64*p)]=B}};s(F,m,1,0,0),s(m,F,0,1,0),s(F,m,0,0,1);let l=1e9,x=-1e9;for(let r=0;r<m.length;r++)m[r]<l&&(l=m[r]),m[r]>x&&(x=m[r]);const N=new Uint8Array(a*a*a),j=255/(x-l);for(let r=0;r<m.length;r++)N[r]=(m[r]-l)*j;const I=512,L=ye(I);return e.__c629={P:y,flt:t,vao:e.createVertexArray(),tN:null,tT:null,linked:!1,u8:N,tile:L,TN:I}}function ye(e){let t=1653956145;const i=()=>{t=t+1831565813|0;let s=Math.imul(t^t>>>15,1|t);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296},n=new Float32Array(e*e),y=new Float32Array(e*e).fill(.04),u=2800,v=6.28318/e;for(let s=0;s<u;s++){const l=i()*e,x=i()*e,N=.5+.25*Math.sin(l*v*3+1.7)*Math.sin(x*v*2+.4)+.25*Math.sin((l+x)*v*5+2.1)*Math.cos((l-x)*v*3),j=1.2+2.1*Math.sin(l*v*2+.6)*Math.cos(x*v*3+2.2)+(i()-.5)*2.4,I=i(),L=I>.96,r=!L&&I>.78,f=9+i()*i()*11,d=1.7+i()*.6,P=f/d,M=Math.min(1,(f-9)/11*.8+i()*.45),p=N*.28+i()*.16,q=L?.32:.62,k=Math.cos(j),B=Math.sin(j),g=.14+.38*i(),ot=Math.ceil(Math.abs(k)*f+Math.abs(B)*P)+1,wt=Math.ceil(Math.abs(B)*f+Math.abs(k)*P)+1,X=Math.floor(l),Q=Math.floor(x),bt=i()*6.28;for(let $=-wt;$<=wt;$++)for(let tt=-ot;tt<=ot;tt++){const at=X+tt+.5-l,lt=Q+$+.5-x,z=(at*k+lt*B)/f;if(z<=-1||z>=1)continue;const zt=(-at*B+lt*k)/P,Dt=Math.sqrt(1-z*z)*(.86+.14*z),ut=zt/Math.max(Dt,.001),ft=ut*ut;if(ft>=1)continue;const V=Math.sqrt(1-ft)*Math.pow(1-z*z,.22);let nt,K;if(L)nt=p+q*(.35+.65*Math.pow(1-V,1.5)),K=ft>.8?.3:.9+.06*V;else{nt=p+q*V*(.72+.28*(z+1)*.5);const ht=.93+.07*Math.sin((z+1)*f*1.3+bt);K=g*ht*(.85+.15*V);const st=(z-(1-M*.8))*3+(V-.8)*5+.5*Math.sin(at*1.7+lt*2.3+bt);if(M>.5&&st>0&&(K=.6+.1*Math.min(1,st)),r&&z>-.55&&z<.65){const Rt=Math.abs(ut);Rt<.1?K=.02:Rt<.22&&(K=.8)}}const H=(X+tt+e)%e,Y=(Q+$+e)%e,_=H+Y*e;nt>n[_]&&(n[_]=nt,y[_]=Math.min(.99,Math.max(0,K)))}}for(let s=0;s<n.length;s++)n[s]+=(i()-.5)*.01,n[s]<=.02&&(y[s]=.03+.04*i());let a=1e9,F=-1e9;for(let s=0;s<n.length;s++)n[s]<a&&(a=n[s]),n[s]>F&&(F=n[s]);for(let s=0;s<n.length;s++)n[s]=(n[s]-a)/(F-a);const m=new Uint8Array(e*e*4),R=5;for(let s=0;s<e;s++)for(let l=0;l<e;l++){const x=l+s*e,N=(l-1+e)%e+s*e,j=(l+1)%e+s*e,I=l+(s-1+e)%e*e,L=l+(s+1)%e*e,r=(n[N]-n[j])*R,f=(n[I]-n[L])*R;m[x*4]=Math.max(0,Math.min(255,127.5+r*127.5)),m[x*4+1]=Math.max(0,Math.min(255,127.5+f*127.5)),m[x*4+2]=y[x]*255,m[x*4+3]=n[x]*255}return m}function Pe(e,t){if(t.linked)return;const i=t.P,n=["uN","uT","uH","uL","uLT","uA","uR","uB","uSn"];for(const v in i){const{p:a,v:F,f:m}=i[v];if(!e.getProgramParameter(a,e.LINK_STATUS))throw new Error("629 "+v+": "+(e.getShaderInfoLog(F)||"")+(e.getShaderInfoLog(m)||"")+e.getProgramInfoLog(a));e.useProgram(a),n.forEach((R,s)=>{const l=e.getUniformLocation(a,R);l&&e.uniform1i(l,s)}),i[v]={p:a,uHC:e.getUniformLocation(a,"uHC"),uHR:e.getUniformLocation(a,"uHR"),uP:e.getUniformLocation(a,"uP"),uC:e.getUniformLocation(a,"uC"),uQ:e.getUniformLocation(a,"uQ"),uF:e.getUniformLocation(a,"uF")}}const y=e.createTexture();e.bindTexture(e.TEXTURE_3D,y),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.R8,64,64,64,0,e.RED,e.UNSIGNED_BYTE,t.u8),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const v of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,v,e.REPEAT);e.pixelStorei(e.UNPACK_ALIGNMENT,4),t.tN=y,t.u8=null;const u=e.createTexture();e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t.TN,t.TN,0,e.RGBA,e.UNSIGNED_BYTE,t.tile),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),t.tT=u,t.tile=null,t.linked=!0}function ct(e,t,i,n,y,u){const v=e.createTexture();e.bindTexture(e.TEXTURE_2D,v),y&&t.flt?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,i,n,0,e.RGBA,e.HALF_FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,i,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,u),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v,0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:v,fb:a,w:i,h:n}}Yt.add({num:629,name:"Brine Pool",fam:"Vistas",recipe:"The floor of the Gulf of Mexico seen from your own little sub, with a pool of brine so heavy it sits there like a lake, ringed by brown mussels, marine snow drifting through your lamps and another sub's lights across the water. The lamp colours, the size of the pool, the shore, the snow, where you are and the state of the brine change every mint. No controls, just look.",music:!1,gl:!0,fps:30,seed:0,make(e){const t=e.gl,i=e.size,n=Re(t);let y=parseInt(e.hash.slice(2,10),16)|0;const u=()=>{y=y+1831565813|0;let o=Math.imul(y^y>>>15,1|y);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},v=o=>{let h=0;for(const w of o)h+=w[1];let E=u()*h;for(const w of o)if(E-=w[1],E<=0)return w[0];return o[0][0]},a=e.home,F=a?"Cold LED":v([["Cold LED",5],["Daylight HMI",3],["Old halogen",3],["Blue survey lamp",1]]),m=a?"Lake":v([["Lake",5],["Cove",3],["Long water",3],["Twin pools",1]]),R=a?"Mussel bank":v([["Mussel bank",5],["Black mud shore",2],["White bank",2],["Broken mussels",2]]),s=a?"Steady":v([["Steady",5],["Sparse",2],["Heavy",2],["Whiteout",1]]),l=a?"Three beams":v([["Three beams",5],["Wide floods",3],["One hard beam",2]]),x=a?"At the edge":v([["At the edge",5],["Low over the bank",3],["Up the slope",2]]);let N=parseInt(e.hash.slice(2,10),16)^1653973443|0;const j=()=>{N=N+1831565813|0;let o=Math.imul(N^N>>>15,1|N);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},I=o=>{let h=0;for(const w of o)h+=w[1];let E=j()*h;for(const w of o)if(E-=w[1],E<=0)return w[0];return o[0][0]};let L=a?"Across the pool":I([["Across the pool",45],["Down at the edge",20],["Over the brine",18],["Skimming the brine",17]]);const r=a?"Far lamps":I([["Far lamps",56],["Into the glare",18],["Own lamps only",12]]),f=a?"Slow waves":I([["Slow waves",45],["Dead calm",25],["Long swell",20],["Silt cloud",10]]);L==="Over the brine"&&r==="Own lamps only"&&(L="Down at the edge"),e.trait("Lamps",F),e.trait("Pool",m),e.trait("Shore",R),e.trait("Snow",s),e.trait("Beams",l),e.trait("Standoff",x),e.trait("View",L),e.trait("Light",r),e.trait("Brine",f);const d=m==="Cove"?7.5:m==="Long water"?14:m==="Twin pools"?6:10.5,P=m==="Long water"?1.55:m==="Cove"?.9:1.2,M=a?3.6:3.2+u()*1.3,p=a?1.5:(u()-.5)*4-(m==="Twin pools"?4.5:0),q=a?.16:.08+u()*.16,k=a?.12:.05+u()*.13,B=a?1.1:u()*6.28,g=a?4.2:u()*6.28,ot=Math.atan2(-(M+d),-p/P),wt=d*(1+q*Math.sin(ot*2+B)+k*Math.sin(ot*3+g)+.05*Math.sin(ot*7+B*3)),X=M+wt,Q=m==="Twin pools",bt=Q&&u()<.5,$=Q?p+d*P*1.75+2.4:0,tt=Q?X+(bt?4:1.5):0,at=Q?d*.8:0,lt=R==="White bank"?.28:R==="Black mud shore"?.14:.22,z=R==="Black mud shore"?2.4:R==="White bank"?6.2:7,zt=R==="Broken mussels"?.52:.46,Dt=R==="Broken mussels"?1:.45,ut=.2+(a?.03:u()*.1),ft=R==="Black mud shore"?2:R==="White bank"?.7:1.25,V=R==="White bank"?[.42,.4,.35]:[.8,.74,.6],nt=R==="White bank"?.6:0,K=a?.42:(.28+u()*.34)*(u()<.28?-1:1),H=p+Math.sin(K)*d*P*1.04,Y=X+Math.cos(K)*d*1.04,_={"Cold LED":[.8,.93,1],"Daylight HMI":[1,.97,.9],"Old halogen":[1,.78,.52],"Blue survey lamp":[.42,.66,1]}[F],ht=(o,h,E)=>{const w=Math.hypot(o,h,E);return[o/w,h/w,E/w]},st=1.7+(a?.15:u()*.4),Rt=l==="Wide floods"?[.62,.86]:l==="One hard beam"?[.93,.975]:[.82,.95],_e=l==="Wide floods"?[.84,.97]:[.935,.985],Ae=[p-d*P*.6+(a?0:u()*2),.15,X+d*.55],Fe=a?-1.2:(u()-.5)*5,Ye=[H+d*.95,.1,X-d*.25],Le=[H-2.2+Fe*.3,.15,Y-4],C=[[H-.85,st,Y+.05],[H+.15,st+.5,Y-.15],[H+1.25,st+.1,Y+.25]],et=(o,h)=>ht(h[0]-o[0],h[1]-o[1],h[2]-o[2]),vt=[et(C[0],Ae),et(C[1],Le),et(C[2],[H+.6,0,Y-2.6])];let U=[2400,1500,110];l==="One hard beam"&&(U=[1e-4,1500,110],vt[1]=et(C[1],[p-d*P*.35,.1,M+d*.45])),l==="Wide floods"&&(U=[600,600,100]),F==="Blue survey lamp"&&(U=U.map(o=>o*1.2));{const o=Math.min(1.4,Math.pow(d/10.5,1.6));U=U.map(h=>h*o)}r==="Own lamps only"&&(U=[0,0,0]);const Ue=x==="Low over the bank"?1.15:x==="Up the slope"?3.1:1.65,ze=x==="Up the slope"?-3.4:0,c=[a?0:(u()-.5)*1.4,Ue,ze],dt=C[1][0],Mt=C[1][2],Zt=Math.atan2(dt-c[0],Mt-c[2]);let Z=a?Zt-.2:Zt-.24+u()*.3,mt=x==="Up the slope"?-.27:-.2+(a?0:(u()-.5)*.03);Q&&(c[1]+=1.3,mt-=.1,Z=Math.atan2((p+d*P+$-at*P)*.5-c[0],(X+tt)*.5-c[2]));const Ct=x==="Low over the bank"?-.25:x==="Up the slope"?.7:0,St=(o,h)=>Math.atan2(o-c[0],h-c[2]);L==="Down at the edge"?(c[0]=c[0]*.5+(p-c[0])*.12,c[1]=1.5+Ct,c[2]=M-2.1,Z=St(p*.6+(dt-p)*.35,X)-.1,mt=-.6-Ct*.1):L==="Over the brine"?(c[0]=p+(dt-p)*.3,c[1]=1.3+Ct*.4,c[2]=Math.max(X-d*.38,X+d-8),Z=St(dt,Mt)-.1,mt=-.12):L==="Skimming the brine"&&(c[0]=p*.55,c[1]=.3,c[2]=M+Math.min(2.4,d*.28),Z=St(dt,Mt)-.14,mt=-.035);const it=[Math.sin(Z),0,Math.cos(Z)],W=[Math.cos(Z),0,-Math.sin(Z)];let xt=parseInt(e.hash.slice(2,10),16)^1013092731|0;const Nt=()=>{xt=xt+1831565813|0;let o=Math.imul(xt^xt>>>15,1|xt);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},De=a?1:Nt()<.42?-1:1,Me=a?.5:.1+Nt()*.7,jt=a?1.6:-.5+Nt()*3.5;De<0&&(W[0]=-W[0],W[2]=-W[2]);const pt=[c[0]-2.1*W[0]+.45*it[0],c[1]+Me,c[2]-2.1*W[2]+.45*it[2]],Ce=ht(it[0]+.3*W[0],-.5,it[2]+.3*W[2]);r==="Into the glare"&&(vt[0]=et(C[0],[c[0]-2.5,c[1]+.4,c[2]+1.5]),vt[1]=et(C[1],[c[0]+1.2,c[1]+.2,c[2]+2.5]),U[0]*=1.6,U[1]*=1.6);const Qt=r==="Own lamps only"?300:220,yt=r==="Own lamps only"?4.5:1,Se=R==="White bank"?.5:.78,Ne=l==="Wide floods"?.7:1.7,ke=l==="One hard beam"?1.5:.4,b=new Float32Array(4*4*4),kt=(o,h,E,w,G,Et)=>{const A=o*16;b[A]=h[0],b[A+1]=h[1],b[A+2]=h[2],b[A+3]=w[1]-w[0],b[A+4]=E[0],b[A+5]=E[1],b[A+6]=E[2],b[A+7]=w[0],b[A+8]=G[0],b[A+9]=G[1],b[A+10]=G[2],b[A+11]=Et};for(let o=0;o<2;o++)kt(o,C[o],vt[o],r==="Into the glare"?[.8,.97]:o===0?_e:Rt,[_[0]*U[o],_[1]*U[o],_[2]*U[o]],o===0?Ne:ke);kt(2,C[2],vt[2],[.18,.72],[_[0]*U[2]*2.6,_[1]*U[2]*2.6,_[2]*U[2]*2.6],.22);const Xe=[_[0]*.75+.3,_[1]*.75+.26,_[2]*.75+.2].map(o=>o*Se*(x==="Up the slope"?10:16.5)*yt);kt(3,pt,Ce,[-.15,.8],Xe,1);{const o=[c[0]+it[0]*12+W[0]*jt,.3,c[2]+it[2]*12+W[2]*jt],h=et(pt,o);b[60]=h[0],b[61]=h[1],b[62]=h[2],b[63]=.968,b[44]=.022,b[45]=(r==="Own lamps only"?1.6:2.2)/yt/14,b[46]=Qt*1.2/yt,b[47]=Qt*.0016/yt}Pe(t,n);const Pt=t.createTexture();t.bindTexture(t.TEXTURE_2D,Pt),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,4,4,0,t.RGBA,t.FLOAT,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const J=768,_t=54,At=ct(t,n,J,J,!0,t.LINEAR),Jt=ct(t,n,J,J,!0,t.LINEAR),Ft=n.flt?1:.08,$t=n.flt?1:3;t.useProgram(n.P.h.p),t.bindVertexArray(n.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,n.tN),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Pt);const te=new Float32Array(5*4);te.set([_t,p,X,d,q,k,B,g,$,tt,lt,ut,P,1/J,at,0,z,zt,Dt,Ft]),t.uniform4fv(n.P.h.uC,te),t.bindFramebuffer(t.FRAMEBUFFER,At.fb),t.viewport(0,0,J,J),t.drawArrays(t.TRIANGLES,0,3),t.useProgram(n.P.l.p),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,At.tex),t.uniform4f(n.P.l.uC,_t,1/J,Ft,$t),t.bindFramebuffer(t.FRAMEBUFFER,Jt.fb),t.drawArrays(t.TRIANGLES,0,3);const ee=ct(t,n,i,i,!0,t.LINEAR),Xt=ct(t,n,i>>1,i>>1,!0,t.LINEAR),oe=ct(t,n,i,i,!1,t.LINEAR),ae=Math.tan(33*Math.PI/180),rt=[.062,.047,.04],Ie=l==="Wide floods"?.0035:.0028,D=new Float32Array(9*4),O=(o,h,E,w,G)=>{D[o*4]=h,D[o*4+1]=E,D[o*4+2]=w,D[o*4+3]=G};O(4,_t,1.55,$t,Ie),O(5,rt[0],rt[1],rt[2],f==="Silt cloud"?.6:.16),O(6,f==="Silt cloud"?.085:s==="Whiteout"?.03:.012,4e-4,nt,Ft),O(7,ft,V[0],V[1],V[2]);let ne=1e9,se=1e9,ie=1e9,re=1e9,ce=1e9,Tt=99;const le=[[.125,.375],[-.375,.125],[.375,-.125],[-.125,-.375]],It=2/i/ae*(n.TN/1.55)*.5;O(8,0,0,1,It);function Be(){t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,n.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,n.tT),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,At.tex),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Jt.tex),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Pt)}function ge(o){const h=n.P.s;t.useProgram(h.p),t.bindVertexArray(n.vao),Be(),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,ee.fb),t.viewport(0,0,i,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),D[0*4+3]=0;for(let E=0;E<o;E++)O(8,le[E][0],le[E][1],1/o,It),D[3*4+3]=i,t.uniform4fv(h.uP,D),t.drawArrays(t.TRIANGLES,0,3);t.disable(t.BLEND),D[0*4+3]=1,O(8,0,0,1,It*2),D[3*4+3]=i>>1,t.bindFramebuffer(t.FRAMEBUFFER,Xt.fb),t.viewport(0,0,i>>1,i>>1),t.uniform4fv(h.uP,D),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindTexture(t.TEXTURE_2D,Xt.tex),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),D[0*4+3]=0,D[3*4+3]=i}const ue=s==="Sparse"?2200:s==="Heavy"?6400:s==="Whiteout"?9600:4e3,fe=Math.round(ue*1.05),Oe=fe+Math.round(ue*.65),qe=s==="Whiteout"?1.2:1,He=(f==="Dead calm"?0:f==="Long swell"?2.3:1)*(L==="Skimming the brine"?1.6:1),We=f==="Long swell"?2.7:1,Ge=H+(c[0]-H)*.15,Ve=Y+(c[2]-Y)*.15,S=new Float32Array(3*4),T=new Float32Array(6*4),Bt=ht(C[1][0],C[1][1],C[1][2]),Ke=r==="Own lamps only"?0:.6;function he(o,h){const E=e.view||de,w=Z+(E.yaw||0),G=mt+(E.pitch||0),Et=c[0]+(E.x||0),A=c[1]+(E.y||0),gt=c[2]+(E.z||0),Ot=w!==ne||G!==se||Et!==ie||A!==re||gt!==ce;if(Ot||Tt===6){Ot&&(ne=w,se=G,ie=Et,re=A,ce=gt);const Wt=Math.cos(G),Gt=Math.sin(G),Vt=Math.cos(w),Kt=Math.sin(w);O(0,Et,A,gt,0),O(1,Kt*Wt,Gt,Vt*Wt,ae),O(2,Vt,0,-Kt,4),O(3,-Kt*Gt,Wt,-Vt*Gt,i);const ve=Ot&&Tt>0&&o>0;ge(ve?1:4),Tt=ve?0:7}else Tt<7&&Tt++;const qt=n.P.snow;t.useProgram(qt.p),t.bindVertexArray(n.vao),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.bindFramebuffer(t.FRAMEBUFFER,oe.fb),t.viewport(0,0,i,i),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,At.tex),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,Pt),S[0]=o+60,S[1]=_t,S[2]=fe,S[3]=Ft,S[4]=rt[0],S[5]=rt[1],S[6]=rt[2],S[7]=.028,S[8]=qe,S[9]=i*.5,S[10]=Ge,S[11]=Ve,t.uniform4fv(qt.uP,D.subarray(0,16)),t.uniform4fv(qt.uF,S),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,Oe),t.disable(t.BLEND);const Ht=n.P.c;t.useProgram(Ht.p),t.bindVertexArray(n.vao),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,i,i),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_3D,n.tN),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,ee.tex),t.activeTexture(t.TEXTURE6),t.bindTexture(t.TEXTURE_2D,Xt.tex),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,oe.tex),T[0]=1.25,T[1]=1/i,T[2]=o,T[3]=5,T[4]=.0115*He,T[5]=.004*(f==="Dead calm"?0:1),T[6]=1.9,T[7]=.75,T[8]=16,T[9]=2.8,T[10]=1.6,T[11]=We,T[12]=Bt[0],T[13]=Bt[1],T[14]=Bt[2],T[15]=Ke,T[16]=_[0],T[17]=_[1],T[18]=_[2],T[19]=0,T[20]=pt[0],T[21]=pt[1],T[22]=pt[2],T[23]=9,t.uniform4fv(Ht.uC,T),t.uniform4fv(Ht.uP,D.subarray(0,16)),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}return he(0,0),he}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
