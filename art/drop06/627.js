// Old Baths: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/627.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(He){He&&function(){"use strict";const ht={yaw:0,pitch:0,x:0,y:0,z:0},xt=3,Ze=0,oe=[{hash:"0x278216377922098c1723a6016452ba595a0eb487edfcb7bfaee9eaa0f70139df"},{hash:"0x8a34a30feb6fe87c69d6d2413068c636991280f721787451b701379564c34748"},{hash:"0x512782533603ef8fc59c683f10fc037984413b222620408ccda1edcedc747252"},{hash:"0x4699e35a0a84ee9dda2b013a34764c3a8438b9076f3f5fb98fc623303c7156fb"},{hash:"0xca3bad3ea5e04130bc84ddc4f507477759248ac9873b397fa6265738ee89fef2"},{hash:"0x47db6e1da8545fd2f62fbe7da1f1c494271ccc71de17b28509da7dc87fd7ae4f"},{hash:"0x18b8dd04e10d039544141c2a7be125e3384cd82d1d78684c57db96e94a90a740"},{hash:"0xbb6b5776a19fa455c488b2b92d87425c8a67f7858f4dc7cf9b3382e89eea1e51"},{hash:"0x2349359c03145e2a18f59b461a35a6e055af38b67b6ea40a197bd94587645073"},{hash:"0x570f5592f6bb996ccaefb71356e547bd1d485f181974224b809c0d095351360b"},{hash:"0xf7a375e1ee8553832642796eb93e6af1ab88464dfd82a59d477f14f3bfd0545f"},{hash:"0x0e456c47e5df26bf72f8976ab440cfa45c0ed92fd2c86807066d306762111915"},{hash:"0xc524e4321f51bce45a914ba4b814338a41ffeb5095cad7372bd81f434dcf7c62"},{hash:"0x7a5d912a9eeb4baf2ac77bf73a0194bcb3b42c24a09fa076acb82caaba8a4587"},{hash:"0x4617ab55049740cd20166f3cf381877f2733f01585cfb94509eadac84ddbb55f"}];let Xe=0;const Ye=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,mt="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",ae=`
#define HW 8.4
#define CF 7.0
#define GF 6.72
#define PW 5.2
#define ZL 27.
#define ZB 14.
#define Z0 (-8.)
#define Z1 31.
#define SY 7.25
#define RC 9.6
#define CY 2.6
#define BAY 3.
#define CW 1.05
#define ARC 10.23
`,Te=`
#define NX 14
#define NY 11
#define NZ 20
#define GMIN vec3(-HW,-3.2,Z0)
#define GMAX vec3(HW,13.,Z1)
#ifdef E8
vec3 giFetch(ivec3 c,int f){c=clamp(c,ivec3(0),ivec3(NX,NY,NZ)-1);return uk(texelFetch(uGI,ivec2(c.x+c.y*NX,c.z+f*NZ),0)).rgb;}
#else
vec3 giFetch(ivec3 c,int f){c=clamp(c,ivec3(0),ivec3(NX,NY,NZ)-1);return texelFetch(uGI,ivec2(c.x+c.y*NX,c.z+f*NZ),0).rgb;}
#endif
vec3 giCube(ivec3 c,vec3 n){vec3 s=n*n;return s.x*giFetch(c,n.x>0.?0:1)+s.y*giFetch(c,n.y>0.?2:3)+s.z*giFetch(c,n.z>0.?4:5);}
vec3 roofRad(vec2 uv,float l){vec3 c=textureLod(uRoof,uv,l).rgb;return c*c*4.;}
vec2 roofUV(vec3 q){return vec2(asin(clamp(q.x/RC,-1.,1.))*RC/(2.*ARC)+.5,(q.z-Z0)/(Z1-Z0));}
float roofT(vec3 o,vec3 d,float R){vec2 oc=o.xy-vec2(0.,CY);float a=dot(d.xy,d.xy),b=dot(oc,d.xy),c=dot(oc,oc)-R*R,h=b*b-a*c;return h<0.?-1.:(-b+sqrt(h))/a;}
`,pt=`
uniform vec4 uP[16]; uniform sampler2D uN; uniform vec2 uR; out vec4 oC;
float n2(vec2 p){return texture(uN,p).r;}
vec4 h42(vec2 p){vec4 q=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));q+=dot(q,q.wzxy+33.33);return fract((q.xxyz+q.yzzw)*q.zywx);}
// the sky over the roof by hour (uP[15].x: 0 grey deck, 1 white morning, 2 last of the light, 3 blue hour, 4 clear, 5 moon)
vec3 skyB(vec2 wp,float ux,float mg){
  float k=uP[15].x,f3=n2(wp*1.4+vec2(.7,.1)),fb=n2(wp*.17+uP[8].zy*.03)*.55+n2(wp*.5+vec2(.2,.6))*.3+f3*.15,cr=1.-abs(ux-.5)*2.;
  vec3 b=uP[6].rgb;
  if(k<.5)return b*mix(.16,.72,smoothstep(.22,.8,fb))*mix(vec3(.94,.97,1.04),vec3(1.03,1.02,.98),fb);
  if(k<1.5)return b*mix(.36,.58,fb);
  if(k<2.5)return b*mix(vec3(1.32,.86,.62),vec3(.86,.98,1.18),smoothstep(.2,.9,ux))*mix(.62,.2,smoothstep(.5,.72,n2(vec2(wp.x*.1,wp.y*.9)+uP[8].zy*.02)));
  if(k<3.5)return b*mix(.4,.62,fb);
  if(k<4.5)return mix(b*mix(vec3(.62,.6,.55),vec3(.24,.36,.62),smoothstep(.0,.8,cr)),vec3(dot(b,vec3(.4)))*.75,smoothstep(.6,.78,fb)*.9);
  // the moon's night: a dark sky, cloud darker still away from the moon, one bright soft patch where the moon is behind
  // thin cloud, and the cloud's edges lit around it
  float cl=smoothstep(.36,.7,fb-.1*f3),rim=cl*(1.-cl)*4.;
  vec3 sk=b*mix(vec3(.5,.5,.48),vec3(.3,.36,.5),smoothstep(.0,.8,cr))*.95;
  sk=mix(sk,vec3(dot(b,vec3(.24)))*(.42+3.*mg),cl*.9);
  return sk+b*(16.*mg*mg*mg*(1.-.6*cl)+3.*mg*rim);
}
void main(){
  vec2 uv=gl_FragCoord.xy/uR;
  float s=(uv.x-.5)*2.*ARC,z=mix(Z0,Z1,uv.y),dmg=uP[8].w;
  // long narrow panes: glazing bars run up the curve, seven to a bay; across the slope each pane laps over the one below,
  // and the lap's place differs column by column (panes cut to different lengths, some slipped), so no lap runs straight
  const float W=BAY/7.;
  float zq=(z-Z0)/W,col=floor(zq),fz=zq-col;
  vec4 hc=h42(vec2(col,5.)+uP[8].yz);
  float sq=(s+ARC)/1.28+hc.x*.33,row=floor(sq),fs=sq-row;
  vec2 id=vec2(row,col);
  float eb=min(fz,1.-fz)*W,el=min(fs,1.-fs)*1.28;
  vec4 h=h42(id+uP[8].yz),h2=h42(id*1.7+uP[8].zy+31.);
  vec2 wp=vec2(s,z)/41.;
  float clus=n2(wp*.11+uP[8].yz*.01);
  // the state of the roof as form: Missing Bays loses three or four whole bays (glass and glazing bars), their neighbours
  // broken in runs; Bare Ribs keeps only a ragged fringe of panes along one gutter
  float bi=floor((z-Z0)/BAY),zin=z-Z0-bi*BAY,dEnd=min(zin,BAY-zin)-.13;
  bool mb=dmg>.55&&dmg<.8,br=dmg>.9;
  float bay=mb?step(fract(bi*.618034+uP[8].y*.137),.26):(br?1.:0.);
  if(br&&(ARC-s*(fract(uP[8].z*.37)<.5?-1.:1.))/1.28<1.+2.4*h42(vec2(col,7.)).x)bay=0.;
  float nb=mb?max(step(fract((bi-1.)*.618034+uP[8].y*.137),.26),step(fract((bi+1.)*.618034+uP[8].y*.137),.26))*(1.-bay):0.;
  float mp=dmg<.5?.13*dmg*2.:(br?.3:.06+.55*nb);
  // panes go in runs where the glass is weakest (a run: two columns, three panes down the slope); the rest stay whole
  vec4 hr=h42(vec2(floor(col*.5+hc.z),floor(sq/3.+hc.w))+uP[8].zy*.7+17.);
  float wk=smoothstep(.42,.68,clus);
  float rp=mb?(.02+.7*wk*wk)*nb+.05*wk:mp*(.1+1.6*wk)*(.75+dmg);
  float run_=step(hr.x,rp)*step(h.w,.88),hole=max(run_,step(h.w,mp*.08));
  if(abs(z-uP[13].w)<1.45&&abs(s+1.5)<5.5-1.5*n2(vec2(z*.07,.3)))hole=1.;
  float crown=1.-abs(uv.x-.5)*2.;
  // dirt by place, not by pane: a grime cloud metres across, streaks running down the slope from every lap and purlin,
  // thick and green along the gutters and against the ribs, thinner toward the crown where the rain washes it
  float grime=n2(wp*.07+uP[8].yz*.013)*.6+n2(wp*.3+vec2(.4,.1))*.4;
  float sr=smoothstep(.38,.64,n2(vec2(z*.13,s*.012)+uP[8].zy*.05));
  float up=s<0.?1.:-1.,dTop=(up>0.?1.-fs:fs)*1.28;
  float pp=fract((s+ARC)/5.12),dP=(up>0.?1.-pp:pp)*5.12;
  float runs=sr*(.5*exp(-dTop*3.)+.35*exp(-dP*.9))+.4*sr*sr;
  float lap=smoothstep(.026,.008,el);
  float gut=smoothstep(.4,.0,crown),rib=smoothstep(.55,.0,dEnd);
  float rep=step(h2.x,1./12.);
  float T=.56*mix(.52,1.08,smoothstep(.3,.7,grime))*(1.-.42*runs)*(1.-.35*lap)*(1.-.42*gut)*(1.-.3*rib);
  T*=mix(1.,1.3,rep)*(mb||br?.45:1.)*(uP[15].x>4.5?2.1:1.);
  vec3 tint=mix(vec3(.82,.86,.83),vec3(.46,.55,.42),clamp(smoothstep(.42,.82,n2(wp*1.6+vec2(.3,.8)))*.5+gut*.45+rib*.25,0.,1.)*(1.-.7*rep));
  tint=mix(tint,vec3(.42,.5,.34),lap*.6);
  // a cracked pane still in place: one straight crack across, one side slipped a little
  vec2 pl=vec2(fz*W,fs*1.28)-vec2(W*.5,.64);
  float ca=h.z*3.14,cd=dot(pl,vec2(cos(ca),sin(ca)))-(h.x-.5)*.2;
  float crk=step(.86,h.y)*(1.-hole);
  T*=1.-crk*(.5*smoothstep(.014,.0,abs(cd))+.08*step(.0,cd));
  float mg=0.;
  if(uP[15].x>4.5){vec2 dm=vec2(s,z)-uP[15].zw;mg=exp(-dot(dm,dm)/7.);}
  float cloud=n2(wp*.16+uP[8].zy*.03)*.6+n2(wp*.45)*.4;
  vec3 skyr=uP[6].rgb*(.72+.6*cloud+5.*mg*mg+mg)*mix(vec3(1.),mix(vec3(1.32,.86,.62),vec3(.86,.98,1.18),smoothstep(.2,.9,uv.x)),uP[5].w);
  vec3 c=skyr*T*tint;
  // a broken pane: two in three simply gone; the third keeps a straight-edged piece at the bars, a triangle in a corner
  // or a tooth along one bar
  float u0=h.y<.5?fz*W:(1.-fz)*W,v0=fract(h.x*7.)<.5?fs*1.28:(1.-fs)*1.28;
  float tri=(u0/(W*(.45+.5*h2.w))+v0/(.3+.6*h.x)-1.)*.22;
  float vc=.2+.88*h2.w,tw=W*(.22+.4*h.z)*(1.-abs(fs*1.28-vc)/(.18+.3*h.y))-u0;
  float gd=h2.z<.67?tri:-tw;
  float part=hole*step(h2.y,run_>.5?.08:.333);
  float gl=part*smoothstep(.004,-.004,gd);
  float open_=hole*(1.-gl);
  float edge=part*smoothstep(.02,.0,abs(gd))*step(.02,eb);
  float sn=uP[14].x;
  c=mix(c,skyr*.32*mix(.9,1.06,n2(wp*3.+vec2(.6,.2)))*vec3(.98,1.,1.03),sn*(1.-bay));
  // where glass is gone the sky itself, at full strength and with its own form
  vec3 skf=skyB(wp,uv.x,mg)*(mb?1.3:1.);
  c=mix(c,skf,max(open_,bay));
  c+=skyr*.12*edge;
  // glazing bars and purlins: dark hair-lines; the iron takes its colour from the sky and the hall's own light, so at night
  // it is the darkest thing up there
  float bar=smoothstep(.012,.034,eb);
  float pur2=smoothstep(.06,.14,min(pp,1.-pp)*5.12);
  vec3 ironc=uP[6].rgb*.05+.014*dot(uP[6].rgb,vec3(1./3.));
  bar=mix(bar,1.,bay);
  // bent ends of the fallen glazing bars, 20 to 60 cm, hanging from the ribs at each end of an open bay
  float gx=(s+ARC)/1.28,xb=floor(gx+.5);vec4 hb=h42(vec2(xb,bi*2.+step(1.5,zin)));float Lb=.2+.4*hb.x,ben=(dEnd/Lb)*(dEnd/Lb)*.24*(hb.y-.5);
  float stub=bay*step(dEnd,Lb)*step(.3,hb.z)*smoothstep(.035,.018,abs((gx-xb)*1.28-ben));
  // buddleia rooted in the gutters, bare for winter: dark twigs over the glass
  if(uP[14].y>.5){float ds=ARC-abs(s),sd=s<0.?-1.:1.,zi=floor(z/4.3);vec4 hb=h42(vec2(zi,sd*5.));
    if(hb.x<.6&&ds<3.){vec2 b=vec2(-.1,zi*4.3+2.15+(hb.y-.5)*2.),qp=vec2(ds,z);float bud=0.;
      for(int k=0;k<8;k++){vec4 hk=h42(vec2(float(k)*3.1+hb.z*9.,hb.w*7.));float a=(hk.x-.5)*2.2,L=.6+2.*hk.y;vec2 dr=vec2(cos(a),sin(a)),q=qp-b;float tt=clamp(dot(q,dr),0.,L);
        bud=max(bud,smoothstep(.05*(1.-.6*tt/L),.01,length(q-dr*tt)));
        vec2 b2=b+dr*L*(.4+.3*hk.w),d2=vec2(cos(a+(hk.z-.5)*1.6),sin(a+(hk.z-.5)*1.6));q=qp-b2;tt=clamp(dot(q,d2),0.,L*.45);bud=max(bud,smoothstep(.03,.005,length(q-d2*tt)));}
      c=mix(c,ironc*.7,bud*.9);}}
  c=mix(ironc,c,bar);
  c=mix(ironc*.8,c,pur2);
  c=mix(c,ironc*.9,stub);
  oC=vec4(sqrt(clamp(c/4.,0.,1.)),1.);
}`,bt=`
#ifdef E8
uniform vec4 uP[16]; uniform sampler2D uRoof; uniform highp usampler2D uGI; vec4 oC; out highp uvec4 oU;
#else
uniform vec4 uP[16]; uniform sampler2D uRoof,uGI; out vec4 oC;
#endif
${Te}
vec3 hA;bool hS;
float prox(vec3 o,vec3 d,out vec3 n){
  float tm=1e9,t;n=vec3(0,1,0);hS=false;
  t=d.z>0.?(Z1-o.z)/d.z:(Z0-o.z)/d.z; if(t>0.){tm=t;n=vec3(0.,0.,-sign(d.z));hA=uP[4].rgb*.7;
    vec3 q=o+d*t; if(length(q.xy-vec2(0.,CY))<RC-.3&&q.y>6.6)hS=true;}
  float sx=d.x>0.?1.:-1.; t=(sx*HW-o.x)/d.x;
  if(t>0.&&t<tm){vec3 q=o+d*t; if(q.y<SY){tm=t;n=vec3(-sx,0,0);hA=uP[4].rgb*.72;hS=false;
      if(q.y>4.25&&q.y<6.9&&abs(mod(q.z-Z0,BAY)-1.5)<.85)hS=true;}}
  t=roofT(o,d,RC); if(t>0.&&t<tm){vec3 q=o+d*t; if(q.y>=SY){tm=t;hS=true;}}
  // cubicle fronts, gallery soffit and parapet (thin plates)
  if(abs(o.x)<CF){t=(sx*CF-o.x)/d.x; if(t>0.&&t<tm){vec3 q=o+d*t; if(q.y>0.&&q.y<2.3){tm=t;n=vec3(-sx,0,0);hA=vec3(.2,.26,.22);hS=false;}}}
  if(abs(o.x)<GF){t=(sx*GF-o.x)/d.x; if(t>0.&&t<tm){vec3 q=o+d*t; if(q.y>2.95&&q.y<4.05){tm=t;n=vec3(-sx,0,0);hA=vec3(.1,.13,.11);hS=false;}}}
  t=(2.95-o.y)/d.y; if(t>0.&&t<tm){vec3 q=o+d*t; if(abs(q.x)>GF){tm=t;n=vec3(0.,-sign(d.y),0.);hA=vec3(.3,.28,.24);hS=false;}}
  // floor and tank
  float inx=abs(o.x)<PW&&o.z>0.&&o.z<ZL&&o.y<0.?1.:0.;
  if(d.y<0.||inx>.5){
    t=-o.y/min(d.y,-1e-5); vec3 q=o+d*t;
    bool intank=abs(q.x)<PW&&q.z>0.&&q.z<ZL;
    if(inx>.5)intank=true;
    if(intank){
      float tx=(sign(d.x)*PW-o.x)/d.x;
      float tz=d.z>0.?(ZL-o.z)/d.z:(0.-o.z)/d.z;
      float te=min(tx,tz);
      float tf=d.y<0.?(-1.5-o.y)/d.y:1e9;
      if(d.y<0.&&tf<te&&tf>0.&&tf<tm){tm=tf;n=vec3(0,1,0);hA=uP[4].rgb*.85;hS=false;}
      else if(te>0.&&te<tm&&(o+d*te).y<0.){tm=te;n=tx<tz?vec3(-sign(d.x),0.,0.):vec3(0.,0.,-sign(d.z));hA=uP[4].rgb*.8;hS=false;}
    } else if(t>0.&&t<tm){tm=t;n=vec3(0,1,0);hA=uP[4].rgb*.65;hS=false;}
  }
  return tm;
}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 px=ivec2(gl_FragCoord.xy);
  int f=px.y/NZ;
  ivec3 c=ivec3(px.x%NX,px.x/NX,px.y%NZ);
  vec3 N=vec3(0);N[f/2]=f%2==0?1.:-1.;
  vec3 U=abs(N.y)>.5?vec3(1,0,0):vec3(0,1,0),V=cross(N,U);
  vec3 o=GMIN+(GMAX-GMIN)*(vec3(c)+.5)/vec3(NX,NY,NZ);
  vec3 L=vec3(0);
  for(int k=0;k<int(uP[11].w);k++){
    float u1=(float(k)+.5)/20.,u2=fract(float(k)*.618034+.13);
    float r=sqrt(u1),a=6.2832*u2;
    vec3 d=normalize(U*r*cos(a)+V*r*sin(a)+N*sqrt(1.-u1));
    vec3 n; float t=prox(o+N*.02,d,n);
    if(t>1e8)continue;
    vec3 q=o+N*.02+d*t;
    if(hS){
      vec3 e=q;
      if(q.y>=SY&&length(q.xy-vec2(0.,CY))>RC-.5)L+=roofRad(roofUV(e),3.5);
      else L+=uP[6].rgb*.62;
    }else{
      vec3 bn=vec3(0);
      if(uP[8].x>.5){vec3 w=(q+n*.15-GMIN)/(GMAX-GMIN)*vec3(NX,NY,NZ)-.5;bn=giCube(ivec3(floor(w+.5)),n);}
      // the sun on the surface this ray found, once bounced
      vec3 Ls=uP[12].xyz;float nl=dot(n,Ls);
      if(uP[13].r>0.&&nl>0.){float ts=roofT(q,Ls,RC);vec3 e=q+Ls*ts;float tr=0.;
        if(e.y>=SY)tr=min(dot(roofRad(roofUV(e),4.),vec3(1))/dot(uP[6].rgb,vec3(1)),1.)*.9;
        else{ts=(sign(Ls.x)*HW-q.x)/Ls.x;e=q+Ls*ts;tr=e.y>4.5&&e.y<6.9?.3:0.;}
        if(abs(q.x)>GF&&q.y<2.95&&Ls.x*q.x>0.)tr=0.;
        bn+=uP[13].rgb*nl*tr;}
      L+=hA*bn;
    }
  }
  oC=vec4(L/20.,1.);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,Ee=`
#ifdef TRW
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
uniform vec4 uP[16];
#define WL uP[0].w
#define MODE uP[2].w
float gT,gFw,gPx,gT0=0.,gGo=1.,gVar=1.; int gI; vec3 gN; vec3 gA,gNs; float gS,gR;
vec4 h42(vec2 p){vec4 q=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));q+=dot(q,q.wzxy+33.33);return fract((q.xxyz+q.yzzw)*q.zywx);}
#define DECK 1
#define TANK 2
#define TFLOOR 3
#define DOOR 4
#define INNER 5
#define WALL 6
#define SOFFIT 7
#define PARAP 8
#define COLUMN 9
#define RIB 10
#define ROOF 11
#define END 12
#define WATER 13
#define LADDER 14
// a cubicle door: x 0 gone, 1 swung in, 2 dropped on its hinge, 3 shut; y swing; z drop; w top
vec4 doorS(float ci,float sx){vec4 h=h42(vec2(ci,sx*3.7));float st=h.x<.07?0.:(h.x<.3?1.:(h.x<.42?2.:3.));
  return vec4(st,.3+1.05*h.z,st==2.?.03+.06*h.y:0.,2.02-(h.y>.8?h.z*.05:0.));}
float fy(float z){return z<ZB?mix(-1.02,-1.42,clamp(z/ZB,0.,1.)):mix(-1.42,-3.05,clamp((z-ZB)/(ZL-ZB),0.,1.));}
bool rays(out vec3 ro,out vec3 rd){
  float res=uP[3].w;
  gPx=2.*uP[1].w/res;
  vec2 q=gl_FragCoord.xy/res*2.-1.;
  ro=uP[0].xyz;rd=normalize(uP[1].xyz+uP[2].xyz*q.x*uP[1].w+uP[3].xyz*q.y*uP[1].w);
  if(MODE>.5){
    if(rd.y>=-1e-4)return false;
    float tw=(WL-ro.y)/rd.y;vec3 s=ro+rd*tw;
    if(abs(s.x)>PW||s.z<0.||s.z>ZL||tw<0.||s.y<fy(s.z))return false;
    ro=s;
    rd=MODE<1.5?reflect(rd,vec3(0,1,0)):refract(rd,vec3(0,1,0),.75);
    gT0=tw;gFw=0.;
  }
  return true;
}
`,gt=Ee+`
float roofT(vec3 o,vec3 d,float R){vec2 oc=o.xy-vec2(0.,CY);float a=dot(d.xy,d.xy),b=dot(oc,d.xy),c=dot(oc,oc)-R*R,h=b*b-a*c;return h<0.?-1.:(-b+sqrt(h))/a;}
const vec3 LA[10]=vec3[10](vec3(-5.92,.03,-.26),vec3(-5.86,.86,-.26),vec3(-5.1,.74,-.26),vec3(-5.92,.03,.26),vec3(-5.86,.86,.26),vec3(-5.1,.74,.26),vec3(-5.02,.32,-.26),vec3(-5.02,.02,-.26),vec3(-5.02,-.28,-.26),vec3(-5.02,-.58,-.26));
const vec3 LB[10]=vec3[10](vec3(-5.86,.86,-.26),vec3(-5.1,.74,-.26),vec3(-5.04,-3.2,-.26),vec3(-5.86,.86,.26),vec3(-5.1,.74,.26),vec3(-5.04,-3.2,.26),vec3(-5.02,.32,.26),vec3(-5.02,.02,.26),vec3(-5.02,-.28,.26),vec3(-5.02,-.58,.26));
void cand(float t,int i,vec3 n){if(t>1e-3&&t<gT){gT=t;gI=i;gN=n;}}
float capT(vec3 ro,vec3 rd,vec3 a,vec3 b,float r){vec3 ba=b-a,oa=ro-a;float bb=dot(ba,ba),bd=dot(ba,rd),bo=dot(ba,oa),A=bb-bd*bd,B=bb*dot(oa,rd)-bo*bd,C=bb*dot(oa,oa)-bo*bo-r*r*bb,h=B*B-A*C;
  if(h<0.)return -1.;float t=(-B-sqrt(h))/A,y=bo+t*bd;if(y>0.&&y<bb)return t;vec3 oc=y<=0.?oa:ro-b;float bq=dot(rd,oc),cq=dot(oc,oc)-r*r;h=bq*bq-cq;return h>0.?-bq-sqrt(h):-1.;}
float xzEx(vec3 o,vec3 d){float tx=(sign(d.x)*PW-o.x)/d.x;float tz=d.z>0.?(ZL-o.z)/d.z:(0.-o.z)/d.z;return min(tx,tz);}
vec3 xzN(vec3 o,vec3 d){float tx=(sign(d.x)*PW-o.x)/d.x;float tz=d.z>0.?(ZL-o.z)/d.z:(0.-o.z)/d.z;return tx<tz?vec3(-sign(d.x),0.,0.):vec3(0.,0.,-sign(d.z));}
void tankTest(vec3 ro,vec3 rd){
  float t0,te,tf;
  if(ro.y>0.){if(rd.y>=0.)return;t0=-ro.y/rd.y;vec3 q=ro+rd*t0;if(abs(q.x)>=PW||q.z<=0.||q.z>=ZL)return;te=t0+xzEx(q,rd);}
  else{t0=0.;te=xzEx(ro,rd);}
  vec3 n=xzN(ro+rd*max(t0,0.)+vec3(0.),rd);
  if(ro.y+rd.y*te<0.)cand(te,TANK,n);
  if(rd.y<0.){
    float zb=ZB,y0=-1.02,y1=-1.42,z1=ZL;
    float s=(y1-y0)/zb; tf=(y0+s*ro.z-ro.y)/(rd.y-s*rd.z); vec3 q=ro+rd*tf; if(tf>0.&&q.z<=zb)cand(tf,TFLOOR,vec3(0,1,0));
    s=(-3.05-y1)/(z1-zb); tf=(y1+s*(ro.z-zb)-ro.y)/(rd.y-s*rd.z); q=ro+rd*tf; if(tf>0.&&q.z>zb)cand(tf,TFLOOR,normalize(vec3(0,1,-s)));
    if(MODE<1.5){float tw=(WL-ro.y)/rd.y;if(tw>0.)cand(tw,WATER,vec3(0,1,0));}
  }
}
void trace(vec3 ro,vec3 rd){
  gT=1e9;gI=0;gN=vec3(0,1,0);
  float t;
#if TP!=2
  // ladder
  for(int k=0;k<int(uP[10].z);k++){vec3 lz=vec3(0.,0.,uP[10].x);float r=k<6?.027:.021;t=capT(ro,rd,LA[k]+lz,LB[k]+lz,r);if(t>1e-3&&t<gT){vec3 q=ro+rd*t;vec3 ba=LB[k]-LA[k];float h=clamp(dot(q-LA[k]-lz,ba)/dot(ba,ba),0.,1.);gT=t;gI=LADDER;gN=normalize(q-(LA[k]+lz+ba*h));}}
  // a fallen bay of the roof: its glazing frame lies tilted in the tank
  if(uP[13].w>0.){vec3 Nf=normalize(vec3(.06,1.,.1)),P0=vec3(-.6,fy(uP[13].w)+.09,uP[13].w),Uf=normalize(cross(Nf,vec3(0,0,1))),Vf=cross(Uf,Nf);
    float dn=dot(rd,Nf);if(abs(dn)>1e-4){t=dot(P0-ro,Nf)/dn;vec3 q=ro+rd*t-P0;float u=dot(q,Uf),v=dot(q,Vf);vec2 ce=floor(vec2(u/1.2,v/.43));vec4 hc=h42(ce+9.);
      if(t>1e-3&&t<gT&&abs(u)<2.4&&abs(v)<1.5&&((abs(u)<.05&&hc.y>.2)||(abs(fract(v/.43)-.5)*.43<.025&&hc.z>.3)||(abs(u)>2.33&&hc.w>.2)||abs(v)>1.43)){gT=t;gI=LADDER;gN=Nf*-sign(dn);}}}
  if(MODE>1.5){tankTest(ro,rd);return;}
  tankTest(ro,rd);
  // floor deck
  if(rd.y<0.&&ro.y>=0.){t=-ro.y/rd.y;vec3 q=ro+rd*t;if(abs(q.x)<CF&&q.z>Z0&&q.z<Z1&&(abs(q.x)>=PW||q.z<=0.||q.z>=ZL))cand(t,DECK,vec3(0,1,0));}
  // end walls
  t=rd.z>0.?(Z1-ro.z)/rd.z:(Z0-ro.z)/rd.z;
  cand(t,END,vec3(0.,0.,-sign(rd.z)));
  // roof
  t=roofT(ro,rd,RC);
  if(t>0.){vec3 q=ro+rd*t;if(q.y>=SY)cand(t,ROOF,normalize(vec3(-q.x,CY-q.y,0.)));}
  // ribs: front faces of the bay arches
  float tin=roofT(ro,rd,RC-.44);
  if(tin>0.){vec3 q=ro+rd*tin;if(q.y>SY-.1&&mod(q.z-Z0+.13,BAY)<.26)cand(tin,RIB,normalize(vec3(-q.x,CY-q.y,0.)));}
  if(abs(rd.z)>1e-4){
    float sz=sign(rd.z);
    float k0=floor((ro.z-Z0)/BAY);
    for(int k=0;k<int(uP[10].w);k++){
      float zr=Z0+BAY*(k0+(sz>0.?1.:0.)+sz*float(k))-sz*.13;
      if(zr<Z0-.2||zr>Z1+.2)break;
      float tr=(zr-ro.z)/rd.z;
      if(tr>0.&&tr<gT){
        vec3 q=ro+rd*tr;
        float r=length(q.xy-vec2(0.,CY)),ax=abs(q.x),dep=.44+.55*smoothstep(4.6,8.3,ax);
        if(r<RC&&r>RC-dep&&q.y>SY-.1&&(r>RC-.075||r<RC-dep+.075)){gT=tr;gI=RIB;gN=vec3(0,0,-sz);break;}
        // the web, a thin plate on the bay line, cut with a row of round holes; the bracket spandrel over the column
        float tw=tr+sz*.13/rd.z;
        if(tw>0.&&tw<gT){
          q=ro+rd*tw;r=length(q.xy-vec2(0.,CY));ax=abs(q.x);dep=.44+.55*smoothstep(4.6,8.3,ax);
          float bk=ax<GF+.05?1.25*smoothstep(GF-1.35,GF,ax):0.,wh=dep-.15,rm=RC-.075-wh*.5;
          float sa=asin(clamp(q.x/r,-1.,1.))*rm,cl=wh*1.15;
          vec2 hq=vec2((fract(sa/cl)-.5)*cl,r-rm);
          vec2 bq=vec2(ax-(GF-.5),q.y-(SY-.55));
          bool hole=(dot(hq,hq)<wh*wh*.13&&bk<.05)||(bk>.05&&(dot(bq,bq)<.09||(r<RC-dep-.06&&r>RC-dep-bk+.06&&abs(dot(bq,bq)-.2)<.06)));
          if(r<RC&&r>RC-dep-bk&&q.y>SY-.1-bk*1.3&&!hole){gT=tw;gI=RIB;gN=vec3(0,0,-sz);break;}
        }
      }
    }
  }
#endif
#if TP!=1
#if TP==2
  if(MODE>1.5)return;
#endif
  // side walls and everything that hangs on them
  if(abs(rd.x)>1e-5){
    float sx=sign(rd.x);
    t=(sx*HW-ro.x)/rd.x;
    if(t>0.){vec3 q=ro+rd*t;if(q.y<SY)cand(t,WALL,vec3(-sx,0,0));}
    if(rd.y<0.&&ro.y>3.){t=(3.-ro.y)/rd.y;vec3 q=ro+rd*t;if(abs(q.x)>GF&&abs(q.x)<HW&&q.z>Z0&&q.z<Z1)cand(t,SOFFIT,vec3(0,1,0));}
    for(int j=0;j<2;j++){
      float px=j==0?sx:-sx;
      t=(px*GF-ro.x)/rd.x;
      if(t>0.){vec3 q=ro+rd*t;
        float zc=mod(q.z-Z0,.75)-.375,yc=q.y-3.48;vec2 a=abs(vec2(zc,yc));
        bool pierce=a.x<.3&&a.y<.4&&(length(a-vec2(.13,.17))<.1||length(a-vec2(0.,.27))<.08||length(a-vec2(.2,0.))<.07||length(a)<.09||(a.x>.24&&a.y<.3)||(a.y>.34&&a.x<.22));
        if(q.y>2.95&&q.y<4.0&&q.z>Z0&&q.z<Z1&&!pierce)cand(t,PARAP,vec3(-sx,0,0));}
      // the rail: a rounded timber on top
      vec2 oc=ro.xy-vec2(px*GF,4.04);float ra=dot(rd.xy,rd.xy),rb=dot(oc,rd.xy),rcc=dot(oc,oc)-.0036,rh=rb*rb-ra*rcc;
      if(rh>0.){t=(-rb-sqrt(rh))/ra;vec3 q=ro+rd*t;if(t>0.&&q.z>Z0&&q.z<Z1)cand(t,PARAP,normalize(vec3(q.xy-vec2(px*GF,4.04),0.)));}
    }
    // gallery soffit
    if(rd.y>0.&&ro.y<2.95){t=(2.95-ro.y)/rd.y;vec3 q=ro+rd*t;if(abs(q.x)>GF&&q.z>Z0&&q.z<Z1)cand(t,SOFFIT,vec3(0,-1,0));}
    // cubicle fronts
#ifdef CUB
    if((abs(ro.x)<CF||ro.x*sx<0.)&&sx!=uP[12].w){
#else
    if(abs(ro.x)<CF&&sx!=uP[12].w){
#endif
      t=(sx*CF-ro.x)/rd.x;
      if(t>0.&&t<gT){
        vec3 q=ro+rd*t;
        if(q.y>0.&&q.y<2.3&&q.z>Z0+.5&&q.z<Z1-.5){
          float cz=q.z/CW,ci=floor(cz),fz=cz-ci;
          vec4 ds=doorS(ci,sx);
          float bot=.17+h42(vec2(ci,sx*3.7)).w*.06;
          bool post=fz<.055||fz>.945;
          float lu=(fz-.06)*CW,lv=ds.w-q.y,cs=cos(ds.z),sn=sin(ds.z);
          vec2 lq=vec2(lu*cs+lv*sn,lv*cs-lu*sn);
          bool door=ds.x>1.5&&lq.x>0.&&lq.x<.88*CW&&lq.y>0.&&lq.y<ds.w-bot;
          bool head=q.y>=2.12;
          if(post||door||head){
            cand(t,DOOR,vec3(-sx,0,0));
          }else{
            float tb=(sx*HW-ro.x)/rd.x;
            float zg=(ci+(rd.z>0.?1.:0.))*CW-sign(rd.z)*.025;
            float tp=abs(rd.z)>1e-5?(zg-ro.z)/rd.z:1e9;
            float tc=rd.y>0.?(2.95-ro.y)/rd.y:1e9,tg=rd.y<0.?-ro.y/rd.y:1e9;
            float te=min(tb,min(tp,min(tc,tg)));
            vec3 nn=te==tb?vec3(-sx,0,0):te==tp?vec3(0.,0.,-sign(rd.z)):te==tc?vec3(0,-1,0):vec3(0,1,0);
            int ii=INNER;
            // the bench along the back
            if(rd.y<0.){float tbn=(.46-ro.y)/rd.y;vec3 qb=ro+rd*tbn;if(tbn>t&&tbn<te&&abs(qb.x)>HW-.4){te=tbn;nn=vec3(0,1,0);}}
            // a door swung in on its hinge
            if(ds.x>.5&&ds.x<1.5){vec2 D=vec2(sx*sin(ds.y),cos(ds.y)),Nd=vec2(D.y,-D.x),H=vec2(sx*CF,(ci+.06)*CW);
              float dn=dot(rd.xz,Nd);
              if(abs(dn)>1e-5){float tl=dot(H-ro.xz,Nd)/dn;vec3 ql=ro+rd*tl;float lw=dot(ql.xz-H,D);
                if(tl>t&&tl<te&&lw>0.&&lw<.88*CW&&ql.y>bot&&ql.y<ds.w){te=tl;nn=vec3(Nd.x,0.,Nd.y)*-sign(dn);ii=DOOR;}}}
            cand(te,ii,nn);
          }
        }
      }
    }
#ifdef CUB
    // standing inside a cubicle (From a Cubicle): its partitions, its floor and bench, the inside of its doorway
    if(abs(ro.x)>CF&&ro.y<2.95){
      float so=ro.x>0.?1.:-1.,ci=floor(ro.z/CW);vec3 q;
      if(abs(rd.z)>1e-5){float tp=((rd.z>0.?(ci+1.)*CW-.025:ci*CW+.025)-ro.z)/rd.z;q=ro+rd*tp;if(tp>0.&&q.x*so>CF&&q.y<2.95&&q.y>0.)cand(tp,INNER,vec3(0.,0.,-sign(rd.z)));}
      if(rd.y<0.){float tg=-ro.y/rd.y;q=ro+rd*tg;if(q.x*so>CF&&abs(q.z/CW-ci-.5)<.5)cand(tg,DECK,vec3(0,1,0));
        tg=(.46-ro.y)/rd.y;q=ro+rd*tg;if(q.x*so>HW-.4&&abs(q.z/CW-ci-.5)<.5)cand(tg,INNER,vec3(0,1,0));}
      if(rd.x*so<0.){float tf=(so*CF-ro.x)/rd.x;q=ro+rd*tf;float fz=q.z/CW-ci;
        if(tf>0.&&q.y>0.&&q.y<2.95&&(fz<.055||fz>.945||q.y>=2.12))cand(tf,DOOR,vec3(so,0.,0.));}
    }
#endif
    // columns on the gallery line
    for(int j=0;j<(abs(ro.x)>GF?2:1);j++){
    float dx=(j==0?sx:-sx)*GF;
    for(int k=0;k<int(uP[10].w);k++){
      vec2 oc=ro.xz-vec2(dx,Z0+BAY*float(k));
      float b=dot(oc,rd.xz),a=dot(rd.xz,rd.xz),c=dot(oc,oc)-.0121,h=b*b-a*c;
      if(h>0.&&a>1e-6){t=(-b-sqrt(h))/a;if(t>1e-3&&t<gT){float y=ro.y+rd.y*t;if(y>-.1&&y<8.6){gT=t;gI=COLUMN;vec3 q=ro+rd*t;gN=normalize(vec3(q.x-dx,0.,q.z-(Z0+BAY*float(k))));}}}
      c=dot(oc,oc)-.0361;h=b*b-a*c;
      if(h>0.&&a>1e-6){t=(-b-sqrt(h))/a;if(t>1e-3&&t<gT){float y=ro.y+rd.y*t;if((y>-.1&&y<.58)||(y>2.86&&y<3.08)||(y>6.9&&y<7.5)){gT=t;gI=COLUMN;vec3 q=ro+rd*t;gN=normalize(vec3(q.x-dx,0.,q.z-(Z0+BAY*float(k))));}}}
    }}
  }
#endif
}
vec2 octE(vec3 n){vec2 p=n.xy/(abs(n.x)+abs(n.y)+abs(n.z));if(n.z<0.)p=(1.-abs(p.yx))*vec2(p.x>=0.?1.:-1.,p.y>=0.?1.:-1.);return p;}
#ifdef TRW
void mainS(){
#else
void main(){
#endif
  vec3 ro,rd;
#if TP
  if(!rays(ro,rd)){oC=vec4(0);gl_FragDepth=1.;return;}
  trace(ro,rd);
  gl_FragDepth=min(gT*.00390625,1.);
#else
  if(!rays(ro,rd)){oC=vec4(0);return;}
  trace(ro,rd);
#endif
  oC=vec4(gT,float(gI),octE(gN));
}
#ifdef TRW
void main(){mainS();oU=pk(oC);}
#endif
`,Ve=`float sunTr(vec3 p){
  vec3 L=uP[12].xyz;
  if(p.y<0.){float t0=-p.y/L.y;vec3 e=p+L*t0;if(abs(e.x)>PW||e.z<0.||e.z>ZL)return 0.;}
  // a half-degree sun: the lattice's shadow softens with the throw (the roof read coarser, the bars and ribs wider)
  float t=roofT(p,L,RC);vec3 q=p+L*t;float tr=0.,ww=.012+t*.0045;
  if(q.y>=SY){vec3 rr=roofRad(roofUV(q),clamp(log2(t*.35+1.),1.,4.5));tr=min(dot(rr,vec3(1))/dot(uP[6].rgb,vec3(1)),1.1)*1.25*smoothstep(.15-ww,.15+ww,abs(mod(q.z-Z0+1.5,BAY)-1.5));}
  else{float tw=(sign(L.x)*HW-p.x)/L.x;vec3 w=p+L*tw;float zc=mod(w.z-Z0,BAY)-1.5,wd=w.y<6.05?abs(zc)-.82:length(vec2(zc,w.y-6.05))-.82;ww=.012+tw*.0045;
    if(wd<ww&&w.y>4.5)tr=.6*smoothstep(ww,-ww,wd)*smoothstep(.03-ww,.03+ww,abs(fract(zc/.41)-.5)*.41)*smoothstep(.03-ww,.03+ww,abs(fract((w.y-4.5)/.55)-.5)*.55);}
  if(abs(p.x)>GF&&p.y<2.95&&L.x*p.x>0.)tr=0.;
  return tr;
}
`,je="vec3 octD(vec2 p){vec3 n=vec3(p,1.-abs(p.x)-abs(p.y));if(n.z<0.)n.xy=(1.-abs(n.yx))*vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.);return normalize(n);}",yt=Ee+`
uniform sampler2D uN,uRoof,uGI,uG;
${Te}
${Ve}${je}
void main(){
  vec3 ro,rd;
  vec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  if(!rays(ro,rd)){oC=vec4(0);return;}
  gT=g.x;gN=octD(g.zw);
  vec3 p=ro+rd*gT;
  oC=vec4(sunTr(p+gN*.02),0.,0.,1.);
}`,zt=Ee+`
#ifdef E8
uniform sampler2D uN,uRoof;uniform highp usampler2D uGI,uG;
#else
uniform sampler2D uN,uRoof,uGI,uG;
#endif
${Te}
vec3 giEval(vec3 p,vec3 n){vec3 v=(p-GMIN)/(GMAX-GMIN)*vec3(NX,NY,NZ)-.5;v=clamp(v,vec3(0),vec3(NX,NY,NZ)-1.001);ivec3 i=ivec3(floor(v));vec3 f=v-vec3(i),s=vec3(0);for(int k=0;k<int(uP[10].y);k++){ivec3 o=ivec3(k&1,(k>>1)&1,(k>>2)&1);vec3 w=mix(1.-f,f,vec3(o));s+=w.x*w.y*w.z*giCube(i+o,n);}return s;}
float gLf;
float at2(float y,float x){float r=atan(abs(y)/max(abs(x),1e-6));r=x<0.?3.14159-r:r;return y<0.?-r:r;}
#define nz(p,m) textureLod(uN,(p)/((m)*128.),max(gLf-log2(m),0.)).r
#define ng(p,m) textureLod(uN,(p)/((m)*128.),max(gLf-log2(m),0.)).g
#if PROG<2
// glazed tile. Output gA,gNs,gS,gR
void tile(vec2 uv,vec2 sz,float brick,vec3 cA,vec3 cB,float bnd,vec3 U,vec3 V,vec3 n){
  vec2 g=uv/sz;
  float rowi=floor(g.y);
  g.x+=brick*.5*mod(rowi,2.);
  vec2 id=floor(g),f=g-id;
  vec2 e=min(f,1.-f)*sz;
  float gd=min(e.x,e.y);
  vec4 h=h42(id+vec2(bnd*3.1,bnd*7.7));
  float fade=clamp(gFw/min(sz.x,sz.y)*1.2,0.,1.);
  // tiles that have fallen away
  float cl=nz(uv+uP[8].yz,1.2);
  float gone=step(.985-.05*gGo*uP[4].w+(h.w-.5)*.1-.25*smoothstep(1.2,.1,uv.y)*V.y*gGo+.1*smoothstep(1.2,2.4,uv.y)*V.y,cl)*step(fade,.75);
  float rg=smoothstep(.002+.6*fade*min(sz.x,sz.y),.0045+.6*fade*min(sz.x,sz.y),gd);
  rg=mix(rg,.9,fade);
  vec3 base=mix(cA,cB,step(.5,bnd));
  base*=1.+gVar*(1.-fade)*(mix(.86,1.1,h.x)*mix(.95,1.05,h.y)-1.);
  if(fade<.5&&h.y>.965)base*=vec3(1.05,1.0,.86);
  if(fade<.5&&h.z>.97)base*=vec3(.82,.86,.74);
  float cr1=abs(nz(uv*3.1,.08)*2.-1.),cr2=abs(ng(uv*5.7+h.xy,.05)*2.-1.);
  float craze=max(smoothstep(.05,.0,cr1),.75*smoothstep(.035,.0,cr2));
  craze*=(1.-fade)*mix(.25,1.,h.y)*(.45+uP[4].w*.6);
  vec3 ca=mix(base,base*vec3(.55,.45,.3),.55*craze*.9);
  vec2 tilt=(h.xy-.5)*vec2(.09,.11)*(1.-.5*fade)+(f-.5)*.03*(1.-fade);
  float wob=(nz(uv*1.7+h.zw*3.,.35)-.5)*.02;
  vec3 nt=normalize(n+U*(tilt.x+wob)+V*(tilt.y+wob*.7));
  if(gone>.5){
    float mv=nz(uv*2.,.16),mv2=ng(uv*6.,.04);
    gA=mix(vec3(.46,.43,.37),vec3(.62,.58,.5),mv)*mix(.8,1.08,mv2);
    gNs=normalize(n+U*(mv2-.5)*.5+V*(mv-.5)*.5);
    gS=0.;gR=.7;
    float ed=smoothstep(.0,.05,gd*.5+(.3-mv)*.03);
    gA*=mix(.5,1.,ed);
  }else{
    gA=mix(ca*.62,ca,rg);
    gNs=mix(n,nt,rg);
    gS=mix(.02,1.,rg);gR=.05+craze*.1;
  }
  // grout has aged darker than the glaze
  if(gone<.5){vec3 grout=mix(vec3(.42,.38,.31),cA*.6,.5);gA=mix(grout,gA,rg);}
}
#endif
#if PROG==3
float nzs(vec2 p,float m){vec2 x=p/(m*128.)*256.+.5,i=floor(x),f=x-i;f=f*f*f*(f*(f*6.-15.)+10.);return textureLod(uN,(i+f-.5)/256.,max(gLf-log2(m),0.)).r;}
#endif
#if PROG==2
void iron(vec3 p,vec2 uv,vec3 base){
  float fl=nz(uv,.33),flb=ng(uv*2.6,.05),fi=ng(uv*6.,.017);
  float pit=smoothstep(.6,.66,fl+.22*(flb-.5));
  float chip=smoothstep(.66,.7,fi+.5*(fl-.5))*(1.-pit);
  float m=max(pit*(.45+.55*smoothstep(.45,.65,flb)),chip);
  vec3 rust=mix(vec3(.24,.1,.04),vec3(.5,.22,.08),flb);
  gA=mix(base*(.72+.5*flb),rust,m);
  float dg=nz(uv*.5,.8);gA*=mix(.78,1.1,dg);
  gS=m*.18;gR=.3;
}
#endif
#ifdef SUN
#ifdef SUNT
uniform highp sampler2D uST;
float sunTr(vec3 p){return texelFetch(uST,ivec2(gl_FragCoord.xy),0).r;}
#else
${Ve}#endif
vec3 sunL(vec3 p,vec3 n){
  vec3 L=uP[12].xyz;float nl=dot(n,L);
  if(nl<=0.||uP[13].r<=0.)return vec3(0);
  return uP[13].rgb*nl*sunTr(p);
}
#endif
vec3 skyEnv(vec3 p,vec3 r,float bl){
  float t=roofT(p,r,RC);
  if(t>0.){vec3 q=p+r*t;if(q.y>=SY-.3){
    // the ribs hang under the glass: a reflected ray that crosses a rib's line between the inner flange and the glass sees iron
    return roofRad(roofUV(q),bl);}}
  return uP[6].rgb*.32;
}
vec3 shade(vec3 ro,vec3 rd){
  float t=gT; vec3 p=ro+rd*t; int id=IDV; vec3 n=gN;
  float cv=max(-dot(n,rd),.04);
  gFw=(t+gT0)*gPx/cv;
  gLf=log2(gFw+1e-6)+1.;
  gA=vec3(.5);gNs=n;gS=0.;gR=.5;
  vec3 TA=uP[4].rgb,TB=uP[5].rgb;
  vec3 U=abs(n.y)>.5?vec3(1,0,0):vec3(0,1,0),V=cross(n,U);
  if(id==ROOF){return .72*roofRad(roofUV(p),clamp(log2(gFw/.03),0.,7.));}
  float ao=1.,streak=0.;
  vec3 dF=vec3(1.);
#if PROG==0
  float d=max(max(abs(p.x)-PW,-p.z),p.z-ZL),lm=0.,ax=abs(n.x)>.5?p.z:p.x;
  vec2 tuv=p.xz,tsz=vec2(.15);vec3 tcA=TA,tcB=TB;float tbnd;
  if(id==DECK){tsz=d<.14?vec2(.15):vec2(.1);tbnd=step(d,.28)-step(d,.14);gGo=.25;}
  else if(id==TFLOOR){U=vec3(1,0,0);V=vec3(0,0,1);
    float lane=abs(mod(p.x+5.2,3.45)-1.725);
    float lb=step(lane,.16)*step(.8,p.z)*step(p.z,ZL-.8);
    float crossl=step(abs(p.z-1.05),.11)*step(lane,.42);
    float crossr=step(abs(p.z-(ZL-1.05)),.11)*step(lane,.42);
    lm=max(lb,max(crossl,crossr));gVar=.4;tsz=vec2(.18);tcA=mix(TA,vec3(.06),lm);tcB=vec3(.05,.06,.06);tbnd=lm;gGo=.12;}
  else{U=abs(n.x)>.5?vec3(0,0,1):vec3(1,0,0);V=vec3(0,1,0);tuv=vec2(ax,p.y);tbnd=step(-.26,p.y)-step(-.06,p.y);}
  tile(tuv,tsz,0.,tcA,tcB,tbnd,U,V,n);
#if PART!=2
  if(id==DECK){
    if(d<.14){gA=mix(gA,TA*1.22,.8);}
    gA*=.88;
    vec4 th=h42(floor(p.xz/tsz.x)+vec2(5.,9.));
    float wf=nz(p.xz,1.6)+.45*ng(p.xz,.45)-.25+.18*smoothstep(1.2,.0,d)+(th.x-.5)*.06,wet=smoothstep(.42,.58,wf),pud=smoothstep(.765,.775,wf);
    gA*=mix(.85,.62,wet);gS=mix(gS*.3,.2,wet);gR=mix(.2,.35,wet);
    gNs=mix(gNs,n,wet);
    float rim=smoothstep(.62,.76,wf)*(1.-pud),dl=smoothstep(.012,.0,abs(wf-.6))*.3;
    gA*=(1.-.4*rim)*(1.-dl*.5);
    gA*=1.-.65*pud;gS=mix(gS,1.,pud);gR*=1.-pud;
    if(wet>.15){gA*=mix(1.,.9,wet);}
    { // fallen panes lie where they broke
      vec2 cc=floor(p.xz/2.3);vec4 hh=h42(cc+vec2(11.3,4.2));
      if(hh.x<.34+.5*uP[8].w){vec2 c0=(cc+.25+hh.yz*.5)*2.3,q=p.xz-c0;float a=hh.w*6.28,ca=cos(a),sa=sin(a);q=vec2(q.x*ca+q.y*sa,q.y*ca-q.x*sa);
        float e=max(abs(q.x)-.3-.16*hh.x,abs(q.y)-.22);
        if(e<0.){float crk=clamp(smoothstep(.018,.004,abs(fract((q.x+q.y*hh.y)*2.1+hh.z)-.5)*.48)+smoothstep(.015,.004,abs(fract((q.y-q.x*.6)*1.7+hh.y*3.)-.5)*.58),0.,1.);gA=mix(gA*vec3(.62,.7,.66),vec3(.08),crk*.5);gA+=vec3(.12,.14,.13)*smoothstep(-.008,-.002,e);gS=.3*(1.-.4*crk);gR=.04;gNs=normalize(n+vec3(.02*(hh.y-.5),0.,.02*(hh.z-.5)));}
        else ao*=.9+.1*smoothstep(.0,.04,e);}
    }
    { // flakes of door paint on the deck under the cubicles
      float dd=CF-abs(p.x);vec2 fc=floor(p.xz/.045);vec4 fh=h42(fc+vec2(77.,13.));
      vec2 fq=(fract(p.xz/.045)-.5-(fh.zw-.5)*.4)*vec2(1.,1.5);
      if(dd>0.&&fh.x<.55*exp(-dd*5.5)&&length(fq)<.13+.14*fh.y){gA=mix(uP[9].rgb*1.1,vec3(.55,.52,.42),step(.7,fh.y));gS=.02;gNs=n;ao*=.9;}
    }
    if(uP[14].x>.5){float sw=smoothstep(.7,.76,nz(p.xz,1.1)+.3*ng(p.xz,.2));gA=mix(gA,vec3(.8,.82,.84),sw);gS*=1.-sw;gNs=mix(gNs,n,sw);}
    float ej=nz(p.xz,.5)*ng(p.xz,.11);
    float grit=smoothstep(.28,.42,ej);
    gA=mix(gA,gA*vec3(.62,.54,.42),grit*.55);
    gA*=mix(.68,1.,smoothstep(.0,.6,nz(p.xz,.9)));
    gA=mix(gA,gA*vec3(.72,.66,.54)+vec3(.05,.045,.035),smoothstep(.45,.75,nz(p.xz,2.2)+.25*ng(p.xz,.5)-.1));
    ao=mix(.72,1.,smoothstep(.0,.9,CF-abs(p.x)));
  }else
#endif
  if(id==TANK||id==TFLOOR){
    if(id==TFLOOR){
      gA=mix(gA,mix(TA,vec3(.05),lm)*.9,.34);
      float sv=nz(p.xz+vec2(0.,p.z*.1),1.4),silt=smoothstep(.2,.55,sv+.3*ng(p.xz,.3)-.1)*(1.-.75*lm);
      float crk=smoothstep(.04,.0,abs(ng(p.xz*1.3,.09)-.5))*smoothstep(.35,.6,sv);
      vec3 sc=mix(vec3(.3,.27,.2),vec3(.4,.37,.3),smoothstep(.4,.75,sv))*(1.-.45*crk);
      gA=mix(gA,sc,silt*.85);gS*=1.-silt*(1.-crk*.3);gNs=mix(gNs,n,silt*.8);
      // sunk patches where the drift of old paint gathers on the slope
      gA*=mix(.82,1.,smoothstep(.35,.7,nz(p.xz*.5,1.2)));
    }else{
      float dw=p.y-WL;
      // scum channel under the coping
      float tide=smoothstep(.1,.015,abs(dw-.05));
      float tid2=smoothstep(.09,.02,abs(dw-.27-.05*nz(vec2(ax,1.),.8)))*.5;
      float scum=smoothstep(.7,.0,dw)*.6;
      vec3 fil=mix(vec3(.2,.16,.1),vec3(.34,.32,.2),nz(vec2(ax,p.y*3.),.35));
      if(MODE<1.5){gA=mix(gA,fil,max(tide*.85,max(tid2,scum*.55)));gS*=1.-.8*max(tide,scum);gNs=normalize(gNs+(nz(vec2(ax,p.y*4.),.05)-.5)*.2*V*tide);}
      float chan=step(abs(p.y+.47),.11);
      gA=mix(gA,vec3(.05,.06,.05),chan*.85);gS*=1.-chan*.7;
      if(p.y>-.05){gA=mix(gA,TA*1.25,smoothstep(-.05,-.02,p.y));}
      if(p.y<WL){gA=mix(gA,gA*vec3(.65,.85,.6)*.9,.65);}
      ao=mix(.55,1.,smoothstep(.0,.5,dw+.1));
      streak=nz(vec2(ax,p.y*.14+ax*.1),.45)*.7+.3*nz(vec2(ax*3.,p.y*.2),.2);
    }
  }
#endif
#if PROG==1
  if(id==WALL||id==END||id==INNER){
    float ax=abs(n.x)>.5?p.z:p.x;
    U=abs(n.x)>.5?vec3(0,0,1):vec3(1,0,0);V=vec3(0,1,0);
    float y=p.y;
    bool upper=id==WALL&&y>3.0;
    float band=y<1.16?1.:(y<1.25?1.:(y>2.42&&y<2.72?1.:(y>4.2&&y<4.33?1.:0.)));
    if(id==END&&y<6.55&&abs(mod(p.x+.75,3.)-1.5)<.22&&y>1.25)band=1.;
    tile(vec2(ax,y),id==INNER?vec2(.15):vec2(.152,.076),id==INNER?0.:1.,TA,TB,band,U,V,n);
    if(id==END||upper){
      // tall tiled wall: lunette window in the arch above, a framed tiled ground below, and a clock and arch at the shallow end
      vec2 qq=vec2(p.x,y);
#if PART!=2
      if(id==END){
        float rr=length(qq-vec2(0.,CY));
        bool lun=y>7.1&&rr<RC-.32;
        if(lun){
          float a=atan((p.x)/max(y-CY,.001));
          float af=abs(fract(a*4.6)-.5)/4.6*rr;
          float ar=abs(fract((RC-.32-rr)/1.5)-.5)*1.5;
          float bb=smoothstep(.012,.04,min(af,ar)-.0);
          float panes=step(.5,fract(floor(a*4.6)*.37+floor((RC-.32-rr)/1.5)*.13));
          vec2 pid=vec2(floor(a*4.6),floor((RC-.32-rr)/1.5));
          vec4 ph=h42(pid+vec2(id==END&&p.z>0.?3.:7.));
          vec3 sk=uP[6].rgb*(.9+.5*nz(p.xy,3.5));
          // a film of dirt heavier at the foot of each pane and of the whole window, in runs down the glass
          float fr=fract((RC-.32-rr)/1.5);
          vec3 g2=sk*mix(.57,.66,ph.x)*(1.-.35*fr*fr)*mix(.84,1.04,nz(vec2(p.x*4.,y*.3),.5))*mix(.72,1.,smoothstep(7.1,10.5,y));
          if(ph.y>.97-uP[8].w*.08)g2=sk*.8;
          return mix(uP[6].rgb*.05,g2,bb);
        }
        float zs=p.z<0.?1.:-1.;
        {
          vec2 ac=qq-vec2(zs>0.?-2.4:0.,0.);
          float ad=length(ac-vec2(0.,2.6));
          bool arch=y<2.6?abs(ac.x)<1.45:ad<1.45;
          float ring=y<2.6?abs(ac.x)-1.45:ad-1.45;
          if(arch){
            // a dark passage beyond the arch: walls fall away into the gloom towards a far dim door
            vec3 d=rd*vec3(1.,1.,zs),o=p;float zd=-5.2,tb=(zd-0.)/min(d.z,-1e-3);
            float sg=sign(d.x);float ts=(sg*1.42-ac.x)/d.x;
            float tt=min(tb,min(ts,(y<3.3&&d.y>0.?(3.45-y)/max(d.y,1e-3):1e9)));
            float tf=d.y<0.?-y/d.y:1e9;
            tt=min(tt,tf);
            vec3 hp=vec3(ac.x,y,0.)+d*tt;
            float dep=clamp(-hp.z/5.2,0.,1.);
            vec3 wc=uP[6].rgb*.1;
            float gl=exp(-dep*3.4)+.12;
            vec3 wall=TA*vec3(.8,.85,.8)*(.55+.45*nz(hp.zy+vec2(1.,0.),.5))*gl*wc;
            if(tt==tf)wall=vec3(.16,.15,.12)*wc*gl*(.7+.4*nz(hp.xz,.3));
            float de=max(abs(hp.x)-.62,hp.y-2.3);
            if(tt==tb)wall+=uP[6].rgb*.045*smoothstep(.0,-.09,de)*mix(.65,1.,hp.y/2.3);
            float rim=smoothstep(.0,.5,dep);
            return wall*mix(1.,.7,rim)+vec3(.012);
          }
          if(ring<.42&&ring>0.){gA=mix(gA,TB*.85,.9);gNs=normalize(gNs+U*sign(ac.x)*.1*(ring/.42-.5));}
          float cd=zs>0.?length(qq-vec2(-2.4,5.25)):9.;
          if(cd<.62){
            gS=.0;gR=.5;
            vec2 cq=(qq-vec2(-2.4,5.25));
            float ca=at2(cq.x,cq.y);
            gA=mix(vec3(.63,.58,.46),vec3(.5,.45,.34),nz(cq,.2));
            float tk=step(abs(fract(ca*1.9099+.5)-.5)*.5236*cd,.025)*step(cd,.5)*step(.42,cd);
            gA=mix(gA,vec3(.1),tk*.85);
            float h1=abs(cq.x*cos(1.05)-cq.y*sin(1.05)),l1=cq.x*sin(1.05)+cq.y*cos(1.05);
            float h2=abs(cq.x*cos(-.5)-cq.y*sin(-.5)),l2=cq.x*sin(-.5)+cq.y*cos(-.5);
            gA=mix(gA,vec3(.05),step(h1,.011)*step(0.,l1)*step(l1,.42));
            gA=mix(gA,vec3(.05),step(h2,.014)*step(0.,l2)*step(l2,.29));
            float rim=step(.56,cd);
            gA=mix(gA,vec3(.13,.11,.08),rim);gNs=normalize(n+vec3(cq,0.)*.4);
            streak=.2;
          }
        }
      }else
#endif
      {
        // upper wall with arched windows in each bay
        float zc=mod(p.z-Z0,BAY)-1.5;
        float wd=y<6.05?abs(zc)-.82:length(vec2(zc,y-6.05))-.82;
        bool win=wd<0.&&y>4.5;
        if(win){
          float pd=min(abs(fract(zc/.41)-.5)*.41,abs(fract((y-4.5)/.55)-.5)*.55);
          // every window its own: the bay's number in the hash, a film of dirt heavier at the foot of each pane and of
          // the window, in runs down the glass; a few panes out, clustered in a few windows, one in forty boarded
          float wb=floor((p.z-Z0)/BAY),fyP=fract((y-4.5)/.55),fyW=clamp((y-4.5)/2.4,0.,1.);
          vec4 ph=h42(vec2(floor(zc/.41)+wb*5.3,floor((y-4.5)/.55)+sign(p.x)*11.)),hw=h42(vec2(wb,sign(p.x)*3.+1.)+uP[8].yz);
          float bb=smoothstep(.0,.07,pd),nv=nz(vec2(p.z*12.,y*.5)+hw.yz*50.,1.5);
          vec3 sk=uP[6].rgb*(.9+.3*nv);
          vec3 g2=sk*mix(.95,1.12,ph.x)*(1.-.24*(1.-fyP)*(1.-fyP))*(1.-.34*(1.-fyW))*(1.-.42*smoothstep(.38,.68,nv)*(1.-.5*fyW))*vec3(.95,1.,.92);
          if(ph.y<(hw.x<.3?.2:.004))g2=sk*1.35;
          else if(ph.z>.975)g2=uP[6].rgb*vec3(.07,.06,.05);
          vec3 cc=mix(uP[6].rgb*.04,g2,bb);
          return cc*smoothstep(.0,.05,-wd);
        }
        if(wd<.26&&y>4.3){gA=mix(gA,TB*.9,.9);gNs=normalize(gNs-U*.07*sign(zc));}
      }
    }
    streak=nz(vec2(ax,y*.15+ax*.1),.45)*.7+.3*nz(vec2(ax*3.,y*.2),.2);
    ao=(id==INNER?.55:mix(.8,1.,smoothstep(.0,.5,y)));
    if(id==INNER)gS*=.2;
    // rust run down the upper wall from each rib's foot
    if(id==WALL&&p.y>3.){float zr=mod(p.z-Z0+.13,BAY);zr=min(zr,BAY-zr);float dy=SY+.1-p.y,w=.04+.07*dy,z2=abs(zr-.22-.03*dy);
      float run=exp(-z2*z2/(w*w))*exp(-dy*.26)*(.6+.7*nz(vec2(p.z*3.,p.y*.25),.15))*step(.0,dy);
      gA=mix(gA,gA*vec3(.95,.47,.2),clamp(run,0.,1.)*.92);}
  }
#endif
#if PROG==2
  if(id==PARAP||id==COLUMN||id==RIB){
    float rr=length(p.xy-vec2(0.,CY));
    vec2 iu=id==PARAP?vec2(p.z,p.y*1.3):(id==COLUMN?vec2(at2(n.x,n.z)*.14,p.y):vec2(asin(clamp(p.x/rr,-1.,1.))*rr*.7,p.z*2.5+rr));
    iron(p,iu,id==PARAP?vec3(.05,.066,.052):(id==COLUMN?uP[9].rgb*.42:uP[9].rgb*.3+.008));
  }
  if(id==SOFFIT){
    gA=vec3(.26,.22,.17)*mix(.7,1.05,nz(p.xz*vec2(.6,4.),.5));
    if(n.y>.5){float bf=fract(p.x/.13);vec4 bh=h42(vec2(floor(p.x/.13),floor(p.z/2.9+fract(p.x*3.7))));gA=vec3(.3,.25,.19)*mix(.6,1.1,bh.x)*mix(.8,1.1,nz(vec2(p.x*8.,p.z*.4),.08));gA*=1.-.6*smoothstep(.06,.0,min(bf,1.-bf));gA=mix(gA,vec3(.18,.17,.14),smoothstep(.55,.75,nz(p.xz,.6))*.6);}
    if(nz(p.xz,.9)>.55)gA*=vec3(.68,.58,.42);
    ao=.75;
  }else if(id==PARAP){
    float zc=mod(p.z-Z0,.75)/.75;
    float pf=min(min(zc,1.-zc)*.75,min(p.y-2.95,4.05-p.y));
    float bz=length(vec2((zc-.5)*.75,p.y-3.5));
    float rose=smoothstep(.2,.17,bz)*(.6+.4*sin(at2(zc-.5,(p.y-3.5)/.75)*8.));
    float ribs=smoothstep(.03,.1,pf);
    vec3 tn=vec3(0.);
    tn+=U*sign(zc-.5)*(1.-ribs)*.25;
    if(p.y<3.15||p.y>3.92)tn+=V*sign(p.y-3.5)*.25;
    tn+=V*(p.y-3.5)*rose*1.2;
    gNs=normalize(n+tn);
    gA*=mix(.75,1.,ribs);
    if(p.y>3.99){gA=vec3(.2,.13,.08)*mix(.6,1.1,nz(vec2(p.z*.5,p.y*20.),.1));gS=.12;gR=.25;gNs=n;}
    streak=nz(vec2(p.z,p.y*.15),.45)*.7+.3*nz(vec2(p.z*3.,p.y*.2),.2);
  }else if(id==COLUMN){
    float fl=sin(at2(n.x,n.z)*14.)*.5+.5;
    gNs=normalize(n+vec3(n.z,0.,-n.x)*(fl-.5)*.25);
    if(p.y<.5){gA*=.7;}
    gA*=mix(.72,1.,smoothstep(8.,2.5,p.y));
    gS=.08;
  }else if(id==RIB){
    float rr=length(p.xy-vec2(0.,CY)),sa=asin(clamp(p.x/rr,-1.,1.))*rr;
    gA*=mix(.62,1.,nz(p.xy*vec2(.3,.3),1.3));
    float fl=step(RC-.075,rr)+step(rr,RC-.44-.55*smoothstep(4.6,8.3,abs(p.x))+.075);
    vec2 rv=vec2((fract(sa/.09)-.5)*.09,abs(n.z)>.5?fract((RC-rr)/.075+.5)-.5:p.z-floor(p.z/BAY+.5)*BAY-Z0+Z0);
    float riv=fl*smoothstep(.013,.008,length(vec2(rv.x,abs(n.z)>.5?rv.y*.075:0.)));
    gA=mix(gA,gA*1.5+.015,riv);gNs=normalize(gNs+vec3(rv.x,0.,0.)*riv*8.);
  }else if(id==LADDER){
    // once chrome, now a dull grey tube; rust blooms where the treads meet the rails, at the bend and at the flange
    gA=vec3(.2,.205,.195)*mix(.85,1.08,nz(p.xy*2.+p.z*1.7,.3));
    float jy=min(min(abs(p.y-.32),abs(p.y-.02)),min(abs(p.y+.28),abs(p.y+.58))),jz=abs(abs(p.z-uP[10].x)-.26);
    float jt=max(smoothstep(.07,.01,max(jy,jz)),max(smoothstep(.09,.0,abs(p.y-.8)),smoothstep(.12,.0,p.y-.03)*step(p.x,-5.4)));
    float rs=jt*smoothstep(.3,.62,nz(p.yz*5.+p.x,.04)+jt*.25);
    gA=mix(gA,mix(vec3(.24,.1,.04),vec3(.36,.17,.07),nz(p.yz*9.,.03)),rs);
    gS=.3*(1.-rs);gR=.22;
  }
#endif
#if PROG==3
  if(id==DOOR){
    float sx=sign(p.x),cz=p.z/CW,ci=floor(cz),fz=cz-ci;
    vec4 h=h42(vec2(ci,sx*3.7)),h2=h42(vec2(ci*1.7+5.,sx*9.1)),ds=doorS(ci,sx);
    float bot=.17+h.w*.06,W=.88*CW,Ht=ds.w-bot;
    bool onf=abs(abs(p.x)-CF)<.006;
    vec2 buv=vec2(p.z*1.1,p.y);
    vec3 wood=mix(vec3(.3,.25,.19),vec3(.42,.34,.24),nz(vec2(p.y*3.,p.z*30.),.06));
    if(onf&&(fz<.055||fz>.945||p.y>=2.12||!(ds.x>1.5))){
      // frame posts and head: painted long ago, the cream undercoat and the wood through it
      float fw=nz(buv,.12);vec3 cr=mix(TA*.86,TA*.55,smoothstep(.4,.7,ng(buv,.4)));gA=mix(cr,wood*.9,smoothstep(.62,.72,fw+.3*(ng(buv,.05)-.5)));
      ao=mix(.72,1.,smoothstep(2.3,1.8,p.y));gS=0.;gR=.4;
    }else{
      // the leaf: its own frame (in the front, or swung in)
      float lu,ly;
      if(onf){float u=(fz-.06)*CW,v=ds.w-p.y,cs=cos(ds.z),sn=sin(ds.z);lu=u*cs+v*sn;ly=Ht-(v*cs-u*sn);}
      else{vec2 D=vec2(sx*sin(ds.y),cos(ds.y));lu=dot(p.xz-vec2(sx*CF,(ci+.06)*CW),D);ly=p.y-bot;U=vec3(D.x,0.,D.y);}
      float nb=floor(W/.105+.5),bw=W/nb,bu=lu/bw,bf=fract(bu);
      float rl=.14,inr=step(rl,ly)*step(ly,Ht-rl);
      float jd=mix(min(abs(ly-rl),abs(ly-(Ht-rl))),min(min(bf,1.-bf)*bw,min(abs(ly-rl),abs(ly-(Ht-rl)))),inr);
      jd=min(jd,min(lu,W-lu));
      vec3 paint=uP[9].rgb*mix(.8,1.12,h.y);
      if(h2.x<.2)paint=mix(paint,vec3(.5,.5,.41),.5);else if(h2.x>.84)paint=mix(paint,vec3(.3,.34,.31),.55);
      // many coats letting go from the foot up and along the joints; three reads: here, just above, just below
      float Lb=mix(-.16,.14,h2.y);vec3 fv;
      for(int k=0;k<int(uP[9].w);k++){float yy=ly+(k==1?.011:(k==2?-.008:0.));vec2 qq=vec2(lu*1.15,yy)+h2.zw*37.;
        fv[k]=nzs(qq,.22)*.62+nzs(qq*1.9+3.1,.075)*.38+.36*smoothstep(.85,.0,yy)+.13*smoothstep(.03,.0,jd)+Lb;}
      float thr=.7,bare=step(thr,fv.x),ring=step(thr-.03,fv.x)*(1.-bare);
      vec3 gw=mix(vec3(.2,.19,.16),vec3(.33,.3,.25),nz(vec2(lu*24.+bu*5.,ly*.7),.07))*mix(.85,1.08,nz(vec2(lu*6.,ly*.2),.2));
      float pshade=mix(.88,1.06,nz(vec2(lu,ly)*vec2(.5,.2)+h2.xy*9.,.6));
      gA=mix(paint*pshade,gw,bare);
      gA=mix(gA,mix(vec3(.62,.58,.46),TA,.3)*.95,ring);
      float lip=(1.-bare)*(1.-ring)*step(thr,fv.z),sh=bare*(1.-step(thr,fv.y));
      gA*=1.+.3*lip;gA*=1.-.5*sh;
      // V-joints with a bead beside them, the rails across top and foot
      float gr=smoothstep(.0045,.0015,jd),bd=smoothstep(.004,.007,jd)*smoothstep(.011,.007,jd);
      gA*=(1.-.55*gr)*(1.+.1*bd);
      gNs=normalize(n+U*sign(bf-.5)*gr*.4*inr);
      // a turn latch on the free edge and a plate
      vec2 lt=vec2(lu-(W-.075),ly+bot-1.05);
      float latch=step(abs(lt.x),.022)*step(abs(lt.y),.05),knob=step(length(lt-vec2(-.035,.0)),.017);
      vec2 pl=vec2((lu-W*.5)/.06,(ly+bot-1.62)/.038);float plate=step(dot(pl,pl),1.);
      gS=.04*(1.-bare);gR=.3;
      if(plate>.5){gA=vec3(.36,.29,.15)*mix(.6,1.1,nz(pl,.3))*mix(.55,1.,step(dot(pl,pl),.7));gS=.25;gR=.15;}
      if(latch+knob>.5){gA=vec3(.07,.065,.055)*mix(.8,1.4,nz(lt*9.,.2));gS=.3;gR=.2;}
      // the foot black with rot
      float rot=smoothstep(.2,.05,ly+.08*(nz(vec2(lu*3.,ly),.15)-.5));
      gA=mix(gA,vec3(.06,.055,.04)*(.7+nz(vec2(lu,ly)*vec2(2.,4.),.12)),rot*.85);
      ao=mix(.75,1.,smoothstep(.0,.25,ly))*(onf?1.:.8);
    }
    streak=.0;
  }
#endif
  if(id!=ROOF){
    vec3 E=giEval(p+n*.22,gNs);
    if(id==END||id==WALL||id==TANK||id==INNER||id==PARAP){
      float bk=.3*nz(vec2(p.x+p.z,p.y*.4)*3.1,.05)+.7*ng(vec2(p.x+p.z,p.y*.11)*1.4,.11);
      float s1=smoothstep(.54,.74,streak+.32*(bk-.5)),s2=smoothstep(.66,.84,streak+.32*(bk-.5)+.2*nz(vec2(p.x+p.z,p.y*.3),.5));
      float head=id==WALL&&p.y>3.?smoothstep(3.,5.,p.y):(id==END?(p.y<4.25?exp(-(4.25-p.y)*.5):exp(-max(7.1-p.y,0.)*.5)):1.);
      vec3 sc=mix(vec3(.3,.2,.12),vec3(.14,.14,.12),.6);
      gA=mix(gA,gA*sc*1.6,s1*.42*head);gA=mix(gA,gA*.65+vec3(.09,.08,.06)*.35,s2*.34);
      gS*=1.-.7*s1;
      float sal=smoothstep(.7,.85,nz(vec2(p.x+p.z,p.y*.7),.4))*.3*(1.-s1);
      gA=mix(gA,vec3(.6,.58,.5),sal);
      if(id==END||id==WALL){float td=p.y-(.3+.6*streak);gA=mix(gA,gA*vec3(.5,.52,.44),smoothstep(.12,-.12,td));gA=mix(gA,vec3(.66,.64,.58),smoothstep(.06,.0,abs(td-.1))*.4);}
    }
    // under the galleries the skylight is cut off by the floor above: three stops down, toward the green-black ambient
    float ax2=abs(p.x),gsh=smoothstep(GF-.25,GF+.35,ax2)*smoothstep(3.05,2.6,p.y)*(id==SOFFIT?.6:(id==DOOR?.12:1.));
    gsh=max(gsh,id==INNER?.75:0.);
    E*=.66*mix(vec3(1.),vec3(.16,.2,.18),gsh);
#ifdef SUN
    vec3 c=gA*(E*ao*(.8+.2*(1.-exp(-.5*t)))+sunL(p+n*.02,gNs));
#else
    vec3 c=gA*E*ao*(.8+.2*(1.-exp(-.5*t)));
#endif
    if(gS>.001){
      vec3 r=reflect(rd,gNs);
      float fr=.08+.92*pow(1.-clamp(dot(-rd,gNs),0.,1.),5.);
      float bl=mix(.8,4.,clamp(gR*6.,0.,1.))+clamp(log2(gFw/.04),0.,2.);
      vec3 sp=r.y>.03?skyEnv(p+n*.02,r,bl):giCube(ivec3(floor((p-GMIN)/(GMAX-GMIN)*vec3(NX,NY,NZ))),r)*.8;
      if(r.y>.03&&p.y<2.9&&abs(p.x+r.x*(2.95-p.y)/r.y)>GF)sp=vec3(.03,.035,.03);
      c+=gS*fr*min(sp,vec3(1.9))*(id==DECK?.8:.95);
    }
    return c;
  }
  return vec3(0);
}
// haze along a ray from height ya to yb: plain distance haze kept off the near third; a thaw fog lies low and thins upward
float hzOD(float ya,float yb,float t){float H=uP[14].w;if(H<=0.)return max(t-7.,0.)*uP[6].w;
  ya=max(ya,0.);yb=max(yb,0.);float d=yb-ya,m=abs(d)<.05?exp(-ya/H):H*(exp(-ya/H)-exp(-yb/H))/d;return max(t-2.5,0.)*uP[6].w*m*1.5;}
${je}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  vec3 ro,rd;
#ifdef E8
  vec4 g=uk(texelFetch(uG,ivec2(gl_FragCoord.xy),0));
#else
  vec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
#endif
  gI=int(g.y+.5);
#if PROG==0&&PART==1
  if(!(gI==DECK||gI==0||gI==WATER))discard;
#elif PROG==0&&PART==2
  if(gI!=TANK&&gI!=TFLOOR)discard;
#elif PROG==0
  if(!(gI==DECK||gI==TANK||gI==TFLOOR||gI==0||gI==WATER))discard;
#elif PROG==1&&PART==1
  if(gI!=END)discard;
#elif PROG==1&&PART==2
  if(gI!=WALL&&gI!=INNER)discard;
#elif PROG==1
  if(gI!=WALL&&gI!=END&&gI!=INNER)discard;
#elif PROG==2
  if(gI!=SOFFIT&&gI!=PARAP&&gI!=COLUMN&&gI!=RIB&&gI!=LADDER&&gI!=ROOF)discard;
#else
  if(gI!=DOOR)discard;
#endif
  if(!rays(ro,rd)||gI==0){oC=vec4(0,0,0,1);return;}
  if(gI==WATER){oC=vec4(0.,0.,0.,-1.);return;}
  gT=g.x;gN=octD(g.zw);
  vec3 c=shade(ro,rd);
  float t=gT;
  if(MODE>1.5){
    vec3 ab=exp(-uP[7].rgb*t*(1.+uP[7].w*.35));
    float sc=1.-exp(-t*(.085+uP[7].w*.11));c=c*ab+uP[11].rgb*sc*(.65+uP[7].w*.3);
  }
  float hz=1.-exp(-hzOD(ro.y,ro.y+rd.y*t,t));
  c=mix(c,uP[6].rgb*(.3+uP[14].z),hz);
  oC=vec4(min(c,vec3(8.)),t);
}
#ifdef E8
void main(){mainS();vec3 v=max(oC.rgb,0.);oC=vec4(sqrt(v/(v+1.)),oC.a<-.5?0.:1.);}
#endif
`,wt=`
#ifdef E8
uniform highp usampler2D uH; uniform vec4 uD[4]; uniform vec2 uR; vec4 oC; out highp uvec4 oU;
#else
uniform sampler2D uH; uniform vec4 uD[4]; uniform vec2 uR; out vec4 oC;
#endif
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 p=ivec2(gl_FragCoord.xy);
  vec2 t=1./uR,uv=gl_FragCoord.xy*t;
#ifdef E8
  vec2 c=uk(texelFetch(uH,p,0)).rg;
  float l=uk(texelFetch(uH,p+ivec2(-1,0),0)).r,r=uk(texelFetch(uH,p+ivec2(1,0),0)).r,d=uk(texelFetch(uH,p+ivec2(0,-1),0)).r,u=uk(texelFetch(uH,p+ivec2(0,1),0)).r;
#else
  vec2 c=texelFetch(uH,p,0).rg;
  float l=texelFetch(uH,p+ivec2(-1,0),0).r,r=texelFetch(uH,p+ivec2(1,0),0).r,d=texelFetch(uH,p+ivec2(0,-1),0).r,u=texelFetch(uH,p+ivec2(0,1),0).r;
#endif
  if(p.x==0)l=c.r; if(p.y==0)d=c.r; if(p.x==int(uR.x)-1)r=c.r; if(p.y==int(uR.y)-1)u=c.r;
  float h=2.*c.r-c.g+.42*(l+r+u+d-4.*c.r);
  h=mix(h,c.r,.012)*.988;
  for(int k=0;k<4;k++){vec2 q=(uv-uD[k].xy)*vec2(.4,1.);float q2=dot(q,q)/(uD[k].z*uD[k].z);h+=uD[k].w*exp(-q2);}
  oC=vec4(h,c.r,0.,1.);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,Rt=`
uniform vec4 uP[16]; uniform sampler2D uRoof,uA; uniform vec2 uR; out vec4 oC;
float roofT(vec3 o,vec3 d,float R){vec2 oc=o.xy-vec2(0.,CY);float a=dot(d.xy,d.xy),b=dot(oc,d.xy),c=dot(oc,oc)-R*R,h=b*b-a*c;return h<0.?-1.:(-b+sqrt(h))/a;}
void main(){
  vec2 uv=gl_FragCoord.xy/uR,q=uv*2.-1.;
  vec3 ro=uP[0].xyz,rd=normalize(uP[1].xyz+uP[2].xyz*q.x*uP[1].w+uP[3].xyz*q.y*uP[1].w),L=uP[12].xyz;
#ifdef E8
  float T=texture(uA,uv).a<.5?-1.:25.;
#else
  float T=texture(uA,uv).a;
#endif
  if(T<0.)T=(uP[0].w-ro.y)/min(rd.y,-1e-4);T=clamp(T,0.,40.);
  vec3 sq=fract(vec3(gl_FragCoord.xyx)*.1031);sq+=dot(sq,sq.yzx+33.33);float j=fract((sq.x+sq.y)*sq.z),acc=0.;
  for(int k=0;k<14;k++){vec3 p=ro+rd*(T*(float(k)+j)/14.);
    float t=roofT(p,L,RC);vec3 e=p+L*t;float tr=0.;
    if(e.y>=SY){vec3 rr=textureLod(uRoof,vec2(asin(clamp(e.x/RC,-1.,1.))*RC/(2.*ARC)+.5,(e.z-Z0)/(Z1-Z0)),2.5).rgb;
      tr=min(dot(rr*rr*4.,vec3(1))/dot(uP[6].rgb,vec3(1)),1.)*smoothstep(.1,.3,abs(mod(e.z-Z0+1.5,BAY)-1.5));}
    if(p.y<0.||(abs(p.x)>GF&&p.y<2.95))tr=0.;
    acc+=tr;}
  // seen against the sun the beams are brightest; a dusty winter hall
  float ph=.35+.65*pow(max(dot(rd,L)*.5+.5,0.),3.);
  oC=vec4(sqrt(clamp(acc/14.*T*ph/40.,0.,1.)),0.,0.,1.);
}`,At=`
#ifdef E8
uniform vec4 uP[16]; uniform sampler2D uA,uR,uU,uN,uB; uniform highp usampler2D uH; uniform vec4 uL; uniform vec2 uRes; out vec4 oC;
vec3 dE(vec3 e){e*=e;return e/max(1.-e,1e-5);}
#else
uniform vec4 uP[16]; uniform sampler2D uA,uR,uU,uH,uN,uB; uniform vec4 uL; uniform vec2 uRes; out vec4 oC;
#endif
#define PW 5.2
#define ZL 27.
// haze along a ray from height ya to yb: plain distance haze kept off the near third; a thaw fog lies low and thins upward
float hzOD(float ya,float yb,float t){float H=uP[14].w;if(H<=0.)return max(t-7.,0.)*uP[6].w;
  ya=max(ya,0.);yb=max(yb,0.);float d=yb-ya,m=abs(d)<.05?exp(-ya/H):H*(exp(-ya/H)-exp(-yb/H))/d;return max(t-2.5,0.)*uP[6].w*m*1.5;}
#ifdef E8
float hs(vec2 u){vec2 x=u*vec2(128.,336.)+.5,i=floor(x),f=x-i;f=f*f*(3.-2.*f);ivec2 b=ivec2(i)-1,m=ivec2(127,335);
  float h00=uk(texelFetch(uH,clamp(b,ivec2(0),m),0)).r,h10=uk(texelFetch(uH,clamp(b+ivec2(1,0),ivec2(0),m),0)).r,h01=uk(texelFetch(uH,clamp(b+ivec2(0,1),ivec2(0),m),0)).r,h11=uk(texelFetch(uH,clamp(b+1,ivec2(0),m),0)).r;
  return mix(mix(h00,h10,f.x),mix(h01,h11,f.x),f.y);}
#else
float hs(vec2 u){vec2 x=u*vec2(128.,336.)+.5,i=floor(x),f=x-i;f=f*f*(3.-2.*f);return texture(uH,(i+f-.5)/vec2(128.,336.)).r;}
#endif
vec3 film(vec3 c){c=max(c-.004,0.);return (c*(6.2*c+.5))/(c*(6.2*c+1.7)+.06);}
float h12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec4 a=texture(uA,uv);
#ifdef E8
  a=vec4(dE(a.rgb),a.a<.5?-1.:1.);
#endif
  vec2 q=uv*2.-1.;
  vec3 ro=uP[0].xyz,rd=normalize(uP[1].xyz+uP[2].xyz*q.x*uP[1].w+uP[3].xyz*q.y*uP[1].w);
  vec3 c;float z;
  float wf=step(a.a,-.5);
  if(wf>.5){
    float tw=(uP[0].w-ro.y)/rd.y;
    vec3 s=ro+rd*tw;
    z=s.z;
    vec2 wuv=vec2(s.x/(2.*PW)+.5,s.z/ZL);
    vec2 tx=vec2(1.6/128.,1.6/336.);
    float hL=hs(wuv-vec2(tx.x,0.)),hR=hs(wuv+vec2(tx.x,0.)),hD=hs(wuv-vec2(0.,tx.y)),hU=hs(wuv+vec2(0.,tx.y));
    float dhx=(hR-hL)*5.,dhz=(hU-hD)*5.;
    // a barely moving skin, so the mirror is alive between drips
    vec2 mo=vec2(uL.w*.02,uL.w*.013);
    float m1=texture(uN,s.xz*.031+mo).g-.5,m2=texture(uN,s.xz*.083-mo*1.4).b-.5;
    float gz=smoothstep(.03,.22,-rd.y);
    dhx+=m1*.012*gz;dhz+=m2*.012*gz;
    vec3 n=normalize(vec3(-dhx,1.,-dhz));
    float dis=clamp(tw*.018,.6,1.6);
    vec2 off=vec2(dhx,dhz)*dis*.75*mix(.35,1.,gz);
    vec3 rc=texture(uR,clamp(uv+off*vec2(.08,.11),.002,.998)).rgb;
    vec3 uc=texture(uU,clamp(uv-off*vec2(.05,.05),.002,.998)).rgb;
#ifdef E8
    rc=dE(rc);uc=dE(uc);
#endif
    float cs=clamp(dot(-rd,n),0.,1.);
    float fr=.02+.98*pow(1.-cs,5.);
    c=mix(uc,rc,fr);
    // the thin grey skin of dust on standing water
    float dust=texture(uN,s.xz*.2+vec2(.3,.1)).r;
    c+=uP[6].rgb*.012*smoothstep(.45,.75,dust);
    float skin=smoothstep(.52,.68,texture(uN,s.xz*.043+vec2(.7,.2)+mo*.25).b);
    vec3 rs=texture(uR,clamp(uv+off*vec2(.08,.11)+(vec2(m1,m2)*.05+vec2(0.,.006))*skin*gz,.002,.998)).rgb;
#ifdef E8
    rs=dE(rs);
#endif
    c=mix(c,mix(uc,rs,fr)*.97+uP[6].rgb*.012,skin*.7);
#ifdef E8
    if(uP[14].x>.5){vec3 rb=(dE(texture(uR,uv+vec2(.012,.02)).rgb)+dE(texture(uR,uv-vec2(.012,.02)).rgb)+dE(texture(uR,uv+vec2(-.02,.01)).rgb)+dE(texture(uR,uv+vec2(.02,-.01)).rgb))*.25;
#else
    if(uP[14].x>.5){vec3 rb=(texture(uR,uv+vec2(.012,.02)).rgb+texture(uR,uv-vec2(.012,.02)).rgb+texture(uR,uv+vec2(-.02,.01)).rgb+texture(uR,uv+vec2(.02,-.01)).rgb)*.25;
#endif
      c=mix(vec3(.4,.43,.45),vec3(.56,.58,.6),dust)*dot(uP[6].rgb,vec3(.33))*.42*mix(.8,1.1,texture(uN,s.xz*.05).g)+rb*.22;}
    c=mix(c,uP[6].rgb*(.3+uP[14].z),1.-exp(-hzOD(ro.y,uP[0].w,tw)));
    c*=1.;
    a.a=tw;
  }else{
    vec3 hit=ro+rd*max(a.a,0.);
    z=hit.z;
    c=a.rgb;
  }
  // the sun's beams in the dusty air (zero where there is no sun)
  float bm=texture(uB,uv).r;c+=uP[13].rgb*bm*bm*uP[15].y;
  // cloud thickening and thinning over the glass: the whole hall at once, slow and uneven
  c*=1.13*(1.+uL.x)*uL.y;
  // photographic curve: contrast about the mid grey in linear (a real toe), the darks leaning green-black
  c=.2*pow(max(c*1.55,0.)/.2,vec3(1.3));
  vec3 f=film(c);
  float lum=dot(f,vec3(.3,.59,.11));
  f=mix(vec3(lum),f,.9);
  f*=vec3(.975,1.,1.015);
  f*=mix(vec3(.8,1.,.98),vec3(1.),smoothstep(.0,.45,lum));
  vec2 vq=uv-.5;
  f*=1.-.085*smoothstep(.15,.65,dot(vq,vq)*1.2);
  oC=vec4(f,sqrt(dot(f,vec3(.3,.59,.11))));
}`,Tt=`
uniform sampler2D uC; uniform vec2 uRes; out vec4 oC;
float lu(vec2 p){return textureLod(uC,p,0.).a;}
float h12(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
void main(){
  vec2 rp=1./uRes,uv=gl_FragCoord.xy*rp;
  vec4 cc=textureLod(uC,uv,0.);
  float lM=cc.a,lN=lu(uv+vec2(0.,rp.y)),lS=lu(uv-vec2(0.,rp.y)),lE=lu(uv+vec2(rp.x,0.)),lW=lu(uv-vec2(rp.x,0.));
  float mx=max(lM,max(max(lN,lS),max(lE,lW))),mn=min(lM,min(min(lN,lS),min(lE,lW))),rg=mx-mn;
  vec3 col=cc.rgb;
  if(rg>max(.025,mx*.1)){
    float lNE=lu(uv+rp),lSW=lu(uv-rp),lNW=lu(uv+vec2(-rp.x,rp.y)),lSE=lu(uv+vec2(rp.x,-rp.y));
    float eH=abs(lNW+lNE-2.*lN)+2.*abs(lW+lE-2.*lM)+abs(lSW+lSE-2.*lS);
    float eV=abs(lNW+lSW-2.*lW)+2.*abs(lN+lS-2.*lM)+abs(lNE+lSE-2.*lE);
    bool hor=eH>=eV;
    float l1=hor?lS:lW,l2=hor?lN:lE,g1=abs(l1-lM),g2=abs(l2-lM),st=hor?rp.y:rp.x,lA,gs;
    if(g1>=g2){st=-st;lA=.5*(l1+lM);gs=g1;}else{lA=.5*(l2+lM);gs=g2;}
    vec2 cu=uv+(hor?vec2(0.,st*.5):vec2(st*.5,0.)),of=hor?vec2(rp.x,0.):vec2(0.,rp.y);
    vec2 u1=cu-of,u2=cu+of;
    float e1=lu(u1)-lA,e2=lu(u2)-lA;bool d1=abs(e1)>=gs*.25,d2=abs(e2)>=gs*.25;
    for(int i=0;i<10;i++){
      if(!(d1&&d2)){float q=i<3?1.:(i<6?1.5:(i<8?2.:4.));
      if(!d1){u1-=of*q;e1=lu(u1)-lA;d1=abs(e1)>=gs*.25;}
      if(!d2){u2+=of*q;e2=lu(u2)-lA;d2=abs(e2)>=gs*.25;}}
    }
    float dd1=hor?uv.x-u1.x:uv.y-u1.y,dd2=hor?u2.x-uv.x:u2.y-uv.y;
    bool n1=dd1<dd2;float po=.5-min(dd1,dd2)/(dd1+dd2);
    float fo=(((n1?e1:e2)<0.)!=(lM<lA))?po:0.;
    float la=(2.*(lN+lS+lE+lW)+lNE+lNW+lSE+lSW)/12.;
    float sb=clamp(abs(la-lM)/rg,0.,1.);sb=(-2.*sb+3.)*sb*sb;
    fo=max(fo,sb*sb*.75);
    col=textureLod(uC,uv+(hor?vec2(0.,fo*st):vec2(fo*st,0.)),0.).rgb;
  }
  float lum=cc.a*cc.a,gr=h12(floor(gl_FragCoord.xy)+7.)-.5;
  oC=vec4(col+gr*(.011+.007*(1.-lum)),1.);
}`,Et=(t,e)=>t==="sunt"?ae+yt:t==="roof"?ae+pt:t==="gi"?ae+bt:t.startsWith("trace")?(t[5]==="C"?`#define CUB
`:"")+"#define TP "+(+t.slice(-1)||0)+`
`+ae+gt:t==="sim"?wt:t==="comp"?At:t==="aa"?Tt:t==="air"?ae+Rt:qt(t,e),qt=(t,e)=>{const r=/^scene(S?)(\d)([ab]?)$/.exec(t),s=+r[2],v=r[3]==="a"?1:r[3]==="b"?2:0,b=v===1?s?"END":"DECK":s===3?"DOOR":"gI";return"#define PROG "+s+`
#define PART `+v+`
#define IDV `+b+`
`+(r[1]?`#define SUN
`+(e&&e.flt?`#define SUNT
`:""):"")+ae+zt},Ke=["0a","0b","1a","1b",2,3];function $e(t,e,r){if(r==="sunt"&&!e.flt)return;const s=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(s,Ye+(e.e8?`#define E8
`+(r.startsWith("trace")?`#define TRW
`:"")+Ft:"")+Et(r,e)),t.compileShader(s);const v=t.createProgram();t.attachShader(v,e.vs),t.attachShader(v,s),t.linkProgram(v),e.P[r]={p:v,v:e.vs,f:s}}function Pt(t,e){if(t.__c627){const n=t.__c627;let x=0;for(const a of e)!n.P[a]&&(a!=="sunt"||n.flt)&&($e(t,n,a),x++);return x&&t.flush(),n}t.getExtension("KHR_parallel_shader_compile");const r=!!t.getExtension("EXT_color_buffer_float"),s=!r&&!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear");const v=!r&&!s,b=t.createShader(t.VERTEX_SHADER);t.shaderSource(b,Ye+mt),t.compileShader(b);const M={},u={P:M,e8:v,flt:r,vs:b};for(const n of["roof","gi",...e.filter(x=>x[0]==="t"),...e.filter(x=>x[0]==="s"&&x[1]==="c"),"sim","comp","aa",...e.filter(x=>x==="air"||x==="sunt")])$e(t,u,n);t.flush();const m=256,A=new Uint8Array(m*m*4);let k=1652199875;const Y=()=>{k=k+1831565813|0;let n=Math.imul(k^k>>>15,1|k);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296},G=new Float32Array(m*m*4);for(let n=0;n<G.length;n++)G[n]=Y();const V=[1,4,6,4,1],j=new Float32Array(m*m*4);for(let n=0;n<4;n++){for(let x=0;x<m;x++)for(let a=0;a<m;a++){let h=0;for(let N=-2;N<=2;N++)h+=V[N+2]*G[((a+N&255)+x*m)*4+n];j[(a+x*m)*4+n]=h/16}for(let x=0;x<m;x++)for(let a=0;a<m;a++){let h=0;for(let i=-2;i<=2;i++)h+=V[i+2]*j[(a+(x+i&255)*m)*4+n];const N=.5+(h/16-.5)*3.5;A[(a+x*m)*4+n]=Math.max(0,Math.min(255,N*255))}}return t.__c627={P:M,vs:b,flt:r,half:s,e8:v,vEmpty:t.createVertexArray(),tN:null,nd:A,linked:!1}}function Nt(t,e){for(const s in e.P){const v=e.P[s];if(v.u)continue;if(!t.getProgramParameter(v.p,t.LINK_STATUS)){const u=t.getProgramInfoLog(v.p)+" FS: "+t.getShaderInfoLog(v.f);throw new Error("627 "+s+": "+u)}const b={},M=t.getProgramParameter(v.p,t.ACTIVE_UNIFORMS);for(let u=0;u<M;u++){const m=t.getActiveUniform(v.p,u),A=m.name.replace("[0]","");b[A]=t.getUniformLocation(v.p,m.name)}v.u=b}if(e.linked)return;const r=t.createTexture();t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,e.nd),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),e.tN=r,e.nd=null,e.linked=!0}const Ft=`uvec4 pk(vec4 v){return uvec4(packHalf2x16(vec2(v.x,0.)),packHalf2x16(vec2(v.y,0.)),packHalf2x16(vec2(v.z,0.)),packHalf2x16(vec2(v.w,0.)));}
vec4 uk(uvec4 u){return vec4(unpackHalf2x16(u.x).x,unpackHalf2x16(u.y).x,unpackHalf2x16(u.z).x,unpackHalf2x16(u.w).x);}
`;function W(t,e,r,s,v){const b=t.createTexture();t.bindTexture(t.TEXTURE_2D,b);const M=v==="f"&&(e.flt||e.half);v==="u"?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16UI,r,s,0,t.RGBA_INTEGER,t.UNSIGNED_SHORT,null):M?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,r,s,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,r,s,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,v==="u"?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,v==="u"?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const u=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,u),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,b,0),{tex:b,fb:u,w:r,h:s}}He.add({num:627,name:"Old Baths",fam:"Vistas",recipe:"Inside a closed-down public baths in winter, with a pool of still pale-green water, cracked cream and green tiles and flaking cubicle doors, some swung open or hanging off. The hour, how much water is left, the light and how much of the roof is left change every mint. No controls, just look.",gl:!0,music:!1,fps:30,seed:0,make(t){const e=t.gl,r=t.size,s=t.home,v=Ze&&!s&&oe.length?oe[Xe%oe.length]:null,b=v&&v.hash||t.hash;let M=parseInt(b.slice(2,10),16)|0;const u=()=>{M=M+1831565813|0;let o=Math.imul(M^M>>>15,1|M);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},m=o=>{let c=0;for(const l of o)c+=l[1];let f=u()*c;for(const l of o)if(f-=l[1],f<=0)return l[0];return o[0][0]};let A=s?"Grey Afternoon":m([["Grey Afternoon",5],["White Morning",3],["Last of the Light",3],["Blue Hour",1]]),k=s?"Half Full":m([["Half Full",5],["Low Water",3],["Brimming",2],["Drained",2]]),Y=s?"Cream and Bottle":m([["Cream and Bottle",4],["White and Oxblood",3],["Ivory and Sea Blue",3],["Buff and Black",1]]),G=s?"Failing":m([["Failing",5],["Sound",3],["Missing Bays",3],["Bare Ribs",1]]),V=s?"Pale Green":m([["Pale Green",5],["Milky Jade",3],["Peat",2],["Clear",1]]),j=parseInt(b.slice(-8),16)^1652238967|0;const n=()=>{j=j+1831565813|0;let o=Math.imul(j^j>>>15,1|j);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},x=o=>{let c=0;for(const l of o)c+=l[1];let f=n()*c;for(const l of o)if(f-=l[1],f<=0)return l[0];return o[0][0]};let a=x([["The Shallow Corner",26],["Down the Middle",17],["From the Gallery",15],["At the Waterline",12],["Along the Cubicles",14],["Straight Up",6],["Down in the Tank",10]]),h=x([["Overcast",63],["Low Sun",20],["Thaw Fog",12],["Snow on the Glass",5]]),N=x([["As Left",52],["Cubicles Gone",16],["Buddleia in the Gutters",18],["A Fallen Bay",14]]);const i=[n(),n(),n(),n(),n()];let he=parseInt(b.slice(34,42)||"7",16)^1652308762|0;const J=()=>{he=he+1831565813|0;let o=Math.imul(he^he>>>15,1|he);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},S=[J(),J(),J(),J(),J(),J(),J()];if(h==="Overcast"){const o=S[0]*63;h=o<13?"Clear and Cold":o<22?"Moonlight":h}const Je={"The Shallow Corner":10/26,"Down the Middle":5/17,"Along the Cubicles":3/14}[a];Je&&S[1]<Je&&(a=S[2]<11/18?"Across the Hall":"From a Cubicle");let xe=parseInt(b.slice(50,58)||"9",16)^1652378669|0;const K=()=>{xe=xe+1831565813|0;let o=Math.imul(xe^xe>>>15,1|xe);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},I=[K(),K(),K(),K(),K(),K(),K(),K()];if((a==="The Shallow Corner"||a==="Down the Middle"||a==="At the Waterline")&&I[0]<.44&&(a=I[1]<.56?"The Doors":"Under the Ribs"),s&&(a="The Shallow Corner",h="Overcast",N="As Left"),Ze&&!s&&oe.length){const o=oe[Xe++%oe.length];A=o.h||A,k=o.w||k,Y=o.t||Y,G=o.r||G,V=o.c||V,a=o.s||a,h=o.l||h,N=o.x||N}k==="Drained"&&a==="At the Waterline"&&(a="Down in the Tank"),k!=="Drained"&&a==="Down in the Tank"&&(a="At the Waterline"),h==="Low Sun"&&A==="Blue Hour"&&(h="Overcast"),h==="Snow on the Glass"&&G==="Bare Ribs"&&(h="Overcast"),(a==="From a Cubicle"||a==="The Doors")&&N==="Cubicles Gone"&&(a="Across the Hall");const H=h==="Clear and Cold",O=h==="Moonlight";t.trait("Hour",H?"Midday":O?"Night":A),t.trait("Water",k),t.trait("Tile",Y),t.trait("Roof",G),t.trait("Water Colour",k==="Drained"?"Silt":V),t.trait("Standpoint",a),t.trait("Light",h),t.trait("State",N);const re=H?[1,1.16,1.42]:O?[.009,.011,.016]:{"Grey Afternoon":[1.25,1.3,1.36],"White Morning":[1.55,1.56,1.55],"Last of the Light":[1,1,1.1],"Blue Hour":[.7,.82,1.1]}[A],Qe=H?.0055:O?.006:{"Grey Afternoon":.0065,"White Morning":.0085,"Last of the Light":.009,"Blue Hour":.007}[A],Ct=H?4:O?5:{"Grey Afternoon":0,"White Morning":1,"Last of the Light":2,"Blue Hour":3}[A],qe={"Cream and Bottle":[.74,.66,.44],"White and Oxblood":[.78,.75,.68],"Ivory and Sea Blue":[.76,.71,.55],"Buff and Black":[.68,.55,.33]}[Y],Pe={"Cream and Bottle":[.05,.16,.11],"White and Oxblood":[.22,.05,.05],"Ivory and Sea Blue":[.07,.21,.25],"Buff and Black":[.05,.05,.05]}[Y],Ne={"Cream and Bottle":[.1,.22,.16],"White and Oxblood":[.27,.07,.06],"Ivory and Sea Blue":[.13,.27,.3],"Buff and Black":[.16,.15,.11]}[Y],me={"Half Full":-.7,"Low Water":-1.6,Brimming:-.22,Drained:-2.55}[k]+(s?0:(u()-.5)*.06),we={"Pale Green":[.55,.2,.28,.95],"Milky Jade":[.45,.2,.26,2.3],Peat:[.38,.5,.75,.55],Clear:[.3,.13,.17,.25]}[V],kt={Failing:.34,Sound:.07,"Missing Bays":.7,"Bare Ribs":1}[G],St=s?.8:.45+u()*.55,et=s?1.15:1.1+u()*3.5;let F=s?-3.1:-2.3-u()*1.8,E=s?-3.15:-4.2+u()*1.9,_=1.5+(s?0:u()*.25),R=s?.17:.03+u()*.26,B=s?.045:0+u()*.09;const y=i[0]<.5?-1:1,Lt=7;if(a==="Down the Middle")E=(i[1]-.5)*.3,F=-.45-i[2]*.8,_=1.62,R=(i[3]-.5)*.04,B=.03+i[4]*.05;else if(a==="From the Gallery")E=y*7.25,F=-4.75+i[1]*.3,_=4.62,R=-y*(.56+i[2]*.1),B=-.06-i[3]*.08;else if(a==="At the Waterline")E=y*(4.55-i[1]*.4),F=et+.7+i[2],_=me+.4,R=-y*(.1+i[3]*.14),B=.07+i[4]*.06;else if(a==="The Doors")E=y*(Lt-2.6-I[2]*.4),F=-.5+(I[3]-.5)*.4,_=1.45+I[4]*.2,R=y*Math.PI/2+(I[5]-.5)*.08,B=-.06+I[6]*.05;else if(a==="Under the Ribs")E=y*(7+I[2]*.4),F=-8+3*(3+Math.floor(I[3]*6))-2.3-I[4]*.6,_=4.62,R=-y*(.12+I[5]*.18),B=.44+I[6]*.17;else if(a==="The Shallow Corner"&&!s&&y>0)E=-E,R=-R;else if(a==="Down in the Tank")E=y*(.6+i[1]*2.2),F=20.4+i[2]*.8,_=-2.3+1.6-(F-20.4)*.125,R=Math.PI+y*(.08+i[3]*.14),B=.3+i[4]*.14;else if(a==="Along the Cubicles")E=y*(5.75+i[1]*.3),F=-1+i[2]*8,_=1.58,R=y*(.06+i[3]*.08),B=0+i[4]*.05;else if(a==="Across the Hall"){const o=S[3]<.3333333333333333;E=y*(o?7.25:6.05+S[4]*.3),F=-8+3*(3.5+Math.floor(S[5]*6)),_=o?4.62:1.6,R=-y*Math.PI/2+(S[6]-.5)*.3,B=.05+S[4]*.09}else if(a==="From a Cubicle"){const o=2+Math.floor(S[5]*20),c=S[3]<.5?1:-1,f=.5+S[4]*.4;E=y*(7.6+S[6]*.4),F=(o+(c>0?.14:.86))*1.05,_=1.6,R=c>0?-y*f:-y*(Math.PI-f),B=.05+S[6]*.08}else a==="Straight Up"&&(E=y*(5.8+i[1]*.5),F=2+i[2]*12,_=1.6,R=-y*(1.1+i[3]*.4),B=.78+i[4]*.14);a==="At the Waterline"&&(c=>c<14?-1.02-.4*Math.max(0,c/14):-1.42-1.63*Math.min(1,(c-14)/13))(F)>me-.1&&(F=14+Math.min(1,(-1.42-(me-.2))/1.63)*13,R=Math.PI-R,E=-E);const tt=parseInt(b.slice(10,14),16)/65536*200,Dt=parseInt(b.slice(14,18),16)/65536*200,z=new Float32Array(16*4),q=(o,c,f,l,T)=>{z[o*4]=c,z[o*4+1]=f,z[o*4+2]=l,z[o*4+3]=T};q(4,qe[0],qe[1],qe[2],St),q(5,Pe[0],Pe[1],Pe[2],A==="Last of the Light"&&!H&&!O?1:0),q(6,re[0],re[1],re[2],Qe),q(7,we[0],we[1],we[2],we[3]),q(8,0,tt,Dt,kt),q(9,Ne[0],Ne[1],Ne[2],3),q(10,et,8,10,14);const Z=h==="Low Sun"||A==="Last of the Light"&&h==="Overcast"||H||O,Fe=H?.45+i[2]*.25:O?.5+i[2]*.4:A==="Last of the Light"?.07+i[1]*.06:.3+i[2]*.14,ot=Math.sin(R),Mt=Math.cos(R),at=-(Mt<0?-1:1)*(.15+i[3]*.45),It=Math.abs(ot)>.25?ot>0?-1:1:i[4]<.5?-1:1,Ce=H?[3.3,3.05,2.6]:O?[.25,.288,.363]:{"Grey Afternoon":[2.9,2,1],"White Morning":[2.8,2.15,1.25],"Last of the Light":[3.9,1.8,.6],"Blue Hour":[0,0,0]}[A];if(q(12,It*Math.cos(Fe)*Math.cos(at),Math.sin(Fe),Math.cos(Fe)*Math.sin(at),N==="Cubicles Gone"?i[3]<.5?-1:1:0),q(13,Z?Ce[0]:0,Z?Ce[1]:0,Z?Ce[2]:0,N==="A Fallen Bay"?5.5+Math.floor(i[2]*5)*xt:0),q(15,Ct,Z?40*Qe*1.3:0,0,-99),O){const o=B+(a==="Straight Up"?.1:.42),c=Math.cos(o),f=Math.sin(R)*c,l=Math.sin(o),T=Math.cos(R)*c,p=E,P=_-2.6,L=f*f+l*l,Q=p*f+P*l,ze=p*p+P*P-9.6*9.6,ue=(-Q+Math.sqrt(Math.max(0,Q*Q-L*ze)))/Math.max(L,1e-4);let U=Math.min(30,Math.max(-7,F+T*ue));const ee=Math.asin(Math.max(-1,Math.min(1,(p+f*ue)/9.6)))*9.6;if(G==="Missing Bays"){let D=99;for(let te=0;te<13;te++){const X=-8+(te+.5)*3;(te*.618034+tt*.137)%1<.26&&Math.abs(X-U)<Math.abs(D-U)&&(D=X)}Math.abs(D-U)<4.6&&(U=D)}z[15*4+2]=ee,z[15*4+3]=U}q(14,h==="Snow on the Glass"?1:0,N==="Buddleia in the Gutters"?1:0,h==="Thaw Fog"?.14:0,0),h==="Thaw Fog"&&(z[6*4+3]=.05,z[14*4+3]=3.2),h==="Snow on the Glass"&&(z[6*4]*=.85,z[6*4+1]*=.87,z[6*4+2]*=.9);const ke={"Pale Green":[.34,.56,.43],"Milky Jade":[.3,.44,.37],Peat:[.14,.11,.06],Clear:[.2,.36,.32]}[V];q(11,re[0]*ke[0],re[1]*ke[1],re[2]*ke[2],20),z[3]=me;const g=Pt(e,Ke.map(o=>(Z?"sceneS":"scene")+o).concat(Z?["air","sunt"]:[],a==="From a Cubicle"?["trace1","traceC2"]:["trace1","trace2"]));Nt(e,g);const d=g.P,Se=g.vEmpty;e.bindVertexArray(Se),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE);const w=(o,c,f,l)=>{e.activeTexture(e.TEXTURE0+f),e.bindTexture(e.TEXTURE_2D,l),e.uniform1i(o.u[c],f)},$=(o,c)=>{e.bindFramebuffer(e.FRAMEBUFFER,c?c.fb:null),e.viewport(0,0,c?c.w:r,c?c.h:r),e.useProgram(o.p),o.u.uP&&e.uniform4fv(o.u.uP,z)},ce=W(e,g,720,1024,"8");$(d.roof,ce),w(d.roof,"uN",0,g.tN),e.uniform2f(d.roof.u.uR,720,1024),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,ce.tex),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR);const _t=14,Bt=11,Ut=20,rt=_t*Bt,ct=Ut*6,pe=g.e8?"u":"f";let be=W(e,g,rt,ct,pe),Re=W(e,g,rt,ct,pe);for(const o of[be,Re])e.bindTexture(e.TEXTURE_2D,o.tex),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<4;o++){z[8*4]=o===0?0:1,$(d.gi,Re),w(d.gi,"uRoof",0,ce.tex),w(d.gi,"uGI",1,be.tex),e.drawArrays(e.TRIANGLES,0,3);const c=be;be=Re,Re=c}const st=d.trace1,it=a==="From a Cubicle"?d.traceC2:d.trace2,se=Z?d.air:null,ie=Z&&g.flt?d.sunt:null,Wt=Ke.map(o=>d[(Z?"sceneS":"scene")+o]),fe=Math.min(r,800),Ae=Math.max(r>>1,1),Le=se?W(e,g,Ae,Ae,"8"):null,De=W(e,g,r,r,pe),Me=W(e,g,r,r,"f"),ft=W(e,g,fe,fe,"f"),nt=W(e,g,fe,fe,"f"),lt=W(e,g,r,r,"8");let dt="";function Ot(o){const c=R+o.yaw,f=Gt(B+o.pitch),l=Math.tan(36*Math.PI/180),T=Math.cos(f),p=[Math.sin(c)*T,Math.sin(f),Math.cos(c)*T],P=[Math.cos(c),0,-Math.sin(c)],L=[p[1]*P[2]-p[2]*P[1],p[2]*P[0]-p[0]*P[2],p[0]*P[1]-p[1]*P[0]];L[1]<0&&(L[0]=-L[0],L[1]=-L[1],L[2]=-L[2]),q(0,E+o.x,_+o.y,F+o.z,me),q(1,p[0],p[1],p[2],l),q(2,P[0],P[1],P[2],0),q(3,L[0],L[1],L[2],r),e.disable(e.BLEND),e.bindVertexArray(Se);const Q=(ee,D,te)=>{z[2*4+3]=te,z[3*4+3]=D,e.bindFramebuffer(e.FRAMEBUFFER,ze),e.viewport(0,0,D,D),e.enable(e.DEPTH_TEST),e.depthMask(!0),e.depthFunc(e.ALWAYS),e.useProgram(st.p),e.uniform4fv(st.u.uP,z),e.drawArrays(e.TRIANGLES,0,3),te<2&&(e.depthFunc(e.LESS),e.useProgram(it.p),e.uniform4fv(it.u.uP,z),e.drawArrays(e.TRIANGLES,0,3)),e.disable(e.DEPTH_TEST),e.flush(),ie&&(e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,null),$(ie,U),e.viewport(0,0,D,D),w(ie,"uRoof",1,ce.tex),w(ie,"uG",3,De.tex),e.drawArrays(e.TRIANGLES,0,3));for(const X of Wt)$(X,ee),w(X,"uN",0,g.tN),w(X,"uRoof",1,ce.tex),w(X,"uGI",2,be.tex),w(X,"uG",3,De.tex),ie&&w(X,"uST",4,U.tex),e.drawArrays(e.TRIANGLES,0,3)},ze=e.createFramebuffer(),ue=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,ue),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT32F,r,r),e.bindFramebuffer(e.FRAMEBUFFER,ze),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,De.tex,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,ue);let U=null;if(ie){const ee=e.createTexture();e.bindTexture(e.TEXTURE_2D,ee),e.texStorage2D(e.TEXTURE_2D,1,e.R32F,r,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const D=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,D),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ee,0),U={tex:ee,fb:D,w:r,h:r}}Q(Me,r,0),e.flush(),se&&($(se,Le),w(se,"uRoof",0,ce.tex),w(se,"uA",1,Me.tex),e.uniform2f(se.u.uR,Ae,Ae),e.drawArrays(e.TRIANGLES,0,3)),Q(ft,fe,1),e.flush(),Q(nt,fe,2),e.flush(),e.deleteFramebuffer(ze),e.deleteRenderbuffer(ue),U&&(e.deleteFramebuffer(U.fb),e.deleteTexture(U.tex)),z[2*4+3]=0,z[3*4+3]=r}const Gt=o=>o<-1.35?-1.35:o>1.35?1.35:o,Ie=128,_e=336;let ne=W(e,g,Ie,_e,pe),ge=W(e,g,Ie,_e,pe);if(g.e8)for(const o of[ne,ge])e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.clearBufferuiv(e.COLOR,0,new Uint32Array(4));else for(const o of[ne,ge])e.bindFramebuffer(e.FRAMEBUFFER,o.fb),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT);const le=[],Ht=5+(u()*3|0);for(let o=0;o<Ht;o++)le.push({u:.15+u()*.7,v:.12+u()*.8,w:.3+u(),str:.007+u()*.01});let ye=parseInt(b.slice(18,26)||"1",16)^5369127|0;const C=()=>{ye=ye+1831565813|0;let o=Math.imul(ye^ye>>>15,1|ye);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};let vt=0;for(const o of le)vt+=o.w;let Be=.2+C()*.8,Ue=-1,We=1e9;const de=[],Zt=o=>{for(;o>=Be;){let c,f,l;if(C()<.78){let T=C()*vt,p=le[0];for(const P of le)if(T-=P.w,T<=0){p=P;break}c=p.u+(C()-.5)*.02,f=p.v+(C()-.5)*.01,l=p.str*(.6+C()*.7),C()<.3&&(Ue=le.indexOf(p),We=Be+.35+C()*.9)}else c=.1+C()*.8,f=.06+C()*.88,l=.004+C()*.006;de.push(c,f,l),Be+=.5+3.6*-Math.log(1-C()*.97)}if(o>=We&&Ue>=0){const c=le[Ue];de.push(c.u+(C()-.5)*.01,c.v+(C()-.5)*.006,c.str*.45),We=1e9}},ve=new Float32Array(16);let Oe=0,Vt=-1;const Xt=(o,c)=>{Oe+=Math.min(c,.1);const f=1/30;let l=0;for(;Oe>f&&l<2;){Oe-=f,l++;let T=0;for(ve.fill(0),Zt(o);de.length&&T<4;)ve[T*4]=de.shift(),ve[T*4+1]=de.shift(),ve[T*4+2]=.014,ve[T*4+3]=-de.shift()*.75,T++;$(d.sim,ge),w(d.sim,"uH",0,ne.tex),e.uniform2f(d.sim.u.uR,Ie,_e),e.uniform4fv(d.sim.u.uD,ve),e.drawArrays(e.TRIANGLES,0,3);const p=ne;ne=ge,ge=p}},Ge=u()*40,Yt=(a==="Straight Up"?.7:a==="The Doors"&&!O?h==="Low Sun"||H?1.15:A==="Last of the Light"||A==="Blue Hour"?2.3:1.6:1)*(O?6:1),ut=(o,c)=>{const f=t.view||ht,l=f.yaw+","+f.pitch+","+f.x+","+f.y+","+f.z;e.bindVertexArray(Se),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),l!==dt&&(dt=l,Ot(f)),Xt(o,c),$(d.comp,lt),w(d.comp,"uA",0,Me.tex),w(d.comp,"uR",1,ft.tex),w(d.comp,"uU",2,nt.tex),w(d.comp,"uH",3,ne.tex),w(d.comp,"uN",5,g.tN),w(d.comp,"uB",6,Le?Le.tex:g.tN),e.uniform2f(d.comp.u.uRes,r,r);const T=.035*Math.sin(o*.113+Ge)+.025*Math.sin(o*.0471+Ge*2.1)+.015*Math.sin(o*.29+Ge*.7);e.uniform4f(d.comp.u.uL,T,Yt,0,o),e.drawArrays(e.TRIANGLES,0,3),$(d.aa,null),w(d.aa,"uC",0,lt.tex),e.uniform2f(d.aa.u.uRes,r,r),e.drawArrays(e.TRIANGLES,0,3)};return ut(0,1/30),ut}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
