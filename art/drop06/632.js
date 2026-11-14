// Reading Room: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/632.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(De){De&&function(){"use strict";const tt={yaw:0,pitch:0,x:0,y:0,z:0},Ee=0,ve=Ee?{"0x8544974f":["","Most On","","Last Light","","Under The Dome","Clear"],"0xaaf0bce1":["","All On","","Last Light","","By A Window","Clear"],"0xb3660038":["","Most On","","Snow Light","","Across The Lamps","Clear"],"0xcaa835cd":["","Most On","","Blue Hour","","By A Window","Rain On The Glass"],"0xb1ef7d27":["","All On","","Last Light","","On The Landing","Clear"]}:null,Re=(e,a,o)=>e<a?a:e>o?o:e;let he=null;function at(){if(he)return;let e=1663793681;const a=64,o=new Float32Array(a*a*a),n=new Float32Array(a*a*a);for(let y=0;y<o.length;y++){e=e+1831565813|0;let v=Math.imul(e^e>>>15,1|e);v=v+Math.imul(v^v>>>7,61|v)^v,o[y]=((v^v>>>14)>>>0)/4294967296}const g=[1/16,4/16,6/16,4/16,1/16],w=(y,v,I,X,E)=>{for(let D=0;D<a;D++)for(let N=0;N<a;N++)for(let A=0;A<a;A++){let h=0;for(let F=-2;F<=2;F++)h+=g[F+2]*y[(A+F*I&63)+64*((N+F*X&63)+64*(D+F*E&63))];v[A+64*(N+64*D)]=h}};w(o,n,1,0,0),w(n,o,0,1,0),w(o,n,0,0,1),he=new Uint16Array(a*a*a);const b=new Float32Array(1),i=new Uint32Array(b.buffer);for(let y=0;y<n.length;y++){b[0]=Re(.5+(n[y]-.5)*3.2,0,1);const v=i[0],I=(v>>>23&255)-112;he[y]=I<=0?0:I<<10|(v&8388607)>>>13}}const ke=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Fe=`
uniform vec4 uP[17];
uniform sampler3D uN;
#ifdef E8
uniform sampler2D uGv,uI,uR,uGl,uLt,uBk;
uniform highp usampler2D uT,uTr,uGb;
#ifdef PPT
uniform highp usampler2D uA;
#else
uniform sampler2D uA;
#endif
vec4 uk(uvec4 u){return vec4(unpackHalf2x16(u.x).x,unpackHalf2x16(u.y).x,unpackHalf2x16(u.z).x,unpackHalf2x16(u.w).x);}
uvec4 pk(vec4 v){return uvec4(packHalf2x16(vec2(v.x,0.)),packHalf2x16(vec2(v.y,0.)),packHalf2x16(vec2(v.z,0.)),packHalf2x16(vec2(v.w,0.)));}
vec3 dE(vec3 e){e*=e;return e/max(1.-e,1e-5);}
vec3 eN(vec3 v){v=max(v,0.);return sqrt(v/(v+1.));}
#else
uniform sampler2D uGv,uT,uTr,uA,uI,uR,uGl,uLt,uBk,uGb;
#endif
#define PI 3.14159265
#define TAU 6.2831853
#define RW 21.
#define Ys 18.
#define HD 13.
#define Ro 2.6
#define H .95
#define LA .56
#define GH 3.75
#define NB 24.
#define DA (PI/4.)
#define BW (TAU*RW/NB)
#define TMAX 90.
#define SPc 3.
#define NKm 5.
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)/16.)
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float box2(vec2 p,vec2 b){vec2 q=abs(p)-b;return length(max(q,vec2(0)))+min(max(q.x,q.y),0.);}
float box3(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,vec3(0)))+min(max(q.x,max(q.y,q.z)),0.);}
float ang(vec2 v){float a=atan(v.x/(abs(v.y)+1e-5));return v.y<0.?(v.x>0.?PI-a:-PI-a):a;}
vec3 octD(vec2 e){e=e*2.-1.;vec3 n=vec3(e,1.-abs(e.x)-abs(e.y));if(n.z<0.)n.xy=(1.-abs(n.yx))*vec2(n.x>=0.?1.:-1.,n.y>=0.?1.:-1.);return normalize(n);}
vec3 skyC(vec3 d){float y=max(d.y,0.);return mix(uP[7].rgb+uP[16].rgb*dot(normalize(d.xz+1e-5),uP[15].xy),uP[6].rgb,sqrt(y))*uP[6].w;}
float rkf(float k,float a){return k>4.5&&abs(a)<LA+.03?19.4:2.2+k*SPc;}
float gId,gW;
// per-mint lamp table, baked in JS: r = lit, g = falter seed (0 = steady), b = brightness, a = glass tint
vec4 lampT(float k,float Rk,float fl,float nL){return texelFetch(uLt,ivec2(int(mod(fl,nL)),Rk>19.?6:int(k)),0);}
vec3 lamps(vec3 p,vec3 n,int nr){
  gId=0.;gW=0.;
  vec3 sum=vec3(0);
  float r=length(p.xz),a=ang(p.xz),kc=clamp(floor((r-2.2)/SPc+.5),0.,NKm);
  int nu=int(uP[13].z);
  for(int i=-nu;i<=nu;i++){
    float k=kc+float(i);
    if(k>=0.&&k<=NKm){
    float Rk=rkf(k,a),nL=floor(TAU*Rk/2.35+.5),f0=floor(a/TAU*nL);
    for(int j=-nu;j<=nu;j++){
      float fl=f0+float(j),ca=(fl+.5)/nL*TAU;
      float gc=abs(fract(ca/DA+.5)-.5)*DA*Rk;
      bool ok=!(k>.5&&gc<1.15);
      float deck=0.;
      if(k>4.5&&abs(ca)<LA){if(abs(ca)<.16)ok=false;deck=H;}
      vec4 lt=ok?lampT(k,Rk,fl,nL):vec4(0);
      if(lt.r>=.5){
      float sd=1.-2.*mod(fl,2.);
      vec2 er=vec2(sin(ca),cos(ca)),et=vec2(cos(ca),-sin(ca));
      vec3 L=vec3(er.x*Rk,deck+1.17,er.y*Rk);
      L.xz+=er*sd*.11;
      vec3 v=L-p;
      bool op=uP[4].z>.5;
      if(v.y>=.02||op){
      float hu=dot(v.xz,et),hv=dot(v.xz,er);
      float wu=.27+.62*v.y,wv=.2+.52*v.y;
      float cone=op?.55+.45*smoothstep(1.3,.4,length(vec2(hu/wu,hv/wv))):smoothstep(1.08,.5,length(vec2(hu/wu,hv/wv)))*smoothstep(.36*v.y+.05,.3*v.y+.01,hv*sd);
      float d2=dot(v,v),d=sqrt(d2);
      vec3 Ld=v/d;
      float nl=max(dot(n,Ld),0.)*(op?.6:pow(max(Ld.y,0.),1.3));
      float block=1.,topY=deck+.767;
      if(p.y<topY-.03){
        float s=(L.y-topY)/(L.y-p.y);
        vec2 xc=L.xz-v.xz*s;
        block=smoothstep(.58,.68,abs(length(xc)-Rk));
      }
      float E=uP[4].w*(.6+.3*lt.b)*cone*nl*block/(d2+.28);
      sum+=E*uP[5].rgb;
      if(E>gW){gW=E;gId=lt.g;}
      }}
    }}
  }
  return sum;
}
// the cove lights at the dome's foot: a gold wash up the dome and down the drum
vec3 cove(vec3 p,vec3 n){
  vec2 er=p.xz/max(length(p.xz),.01);
  vec3 c=vec3(er.x*(RW-.9),Ys-.4,er.y*(RW-.9));
  vec3 v=c-p;float d2=dot(v,v),d=sqrt(d2);
  vec3 e=uP[9].w*uP[5].rgb*max(dot(n,v/d),0.)/(d2*.6+1.)*vec3(1.,.82,.55);
  for(int j=0;j<int(uP[13].z)+1;j++){
    vec3 Lc=vec3(j==0?-2.05:2.05,H+3.45,20.5);
    vec3 w=Lc-p;float dd=dot(w,w);
    e+=uP[5].rgb*3.4*max(dot(n,w/sqrt(dd)),0.)/(dd+.8);
  }
  return e;
}
ivec3 gn(){return ivec3(uP[8].xyz);}
#ifdef E8
vec3 giF(ivec3 c,int f){ivec3 n=gn();c.x=clamp(c.x,0,n.x-1);c.y=clamp(c.y,0,n.y-1);c.z=(c.z+n.z*2)%n.z;return dE(texelFetch(uGv,ivec2(c.x+c.z*n.x,c.y+f*n.y),0).rgb);}
#else
vec3 giF(ivec3 c,int f){ivec3 n=gn();c.x=clamp(c.x,0,n.x-1);c.y=clamp(c.y,0,n.y-1);c.z=(c.z+n.z*2)%n.z;return texelFetch(uGv,ivec2(c.x+c.z*n.x,c.y+f*n.y),0).rgb;}
#endif
vec3 giCube(ivec3 c,vec3 n){vec3 s=n*n;return s.x*giF(c,n.x>0.?0:1)+s.y*giF(c,n.y>0.?2:3)+s.z*giF(c,n.z>0.?4:5);}
vec3 giEval(vec3 p,vec3 n){
  vec3 N=vec3(gn());
  float r=length(p.xz),a=ang(p.xz);
  vec2 er=vec2(sin(a),cos(a));
  vec3 nc=vec3(dot(n.xz,er),n.y,dot(n.xz,vec2(er.y,-er.x))),w=nc*nc;
  vec3 v=vec3(r/23.,(p.y+.5)/33.,a/TAU+.5)*N-.5;
  v.xy=clamp(v.xy,vec2(0),N.xy-1.);
  float z0=floor(v.z),fz=v.z-z0;
  vec2 z=mod(vec2(z0,z0+1.)+N.z,N.z)*N.x+v.x+.5;
  vec2 W=vec2(N.x*N.z,N.y*6.);
  vec3 fy=vec3(nc.x>0.?0.:1.,nc.y>0.?2.:3.,nc.z>0.?4.:5.)*N.y+v.y+.5;
  vec3 s=vec3(0);
  for(int i=0;i<3;i++){
    float y=fy[i]/W.y;
#ifdef E8
    s+=w[i]*mix(dE(textureLod(uGv,vec2(z.x/W.x,y),0.).rgb),dE(textureLod(uGv,vec2(z.y/W.x,y),0.).rgb),fz);
#else
    s+=w[i]*mix(textureLod(uGv,vec2(z.x/W.x,y),0.).rgb,textureLod(uGv,vec2(z.y/W.x,y),0.).rgb,fz);
#endif
  }
  return s;
}
bool reflRay(ivec2 c,out vec3 ro,out vec3 rd){
  float S=uP[3].w;
  vec2 uv=(vec2(c)+.5)/floor(S*.5)*2.-1.;
  vec3 rd0=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz));
#ifdef E8
  float t0=uk(texelFetch(uT,c*2,0)).r;
#else
  float t0=texelFetch(uT,c*2,0).r;
#endif
  vec3 p0=uP[0].xyz+rd0*t0;
  if(t0>=TMAX*.98||(p0.y>.03&&abs(p0.y-H)>.03))return false;
  ro=p0+vec3(0,.02,0);
  vec3 dn=vec3(NS(vec3(p0.xz,.3),1.6)-.5,0.,NS(vec3(p0.xz,1.7),1.6)-.5)*.018;
  rd=reflect(rd0,normalize(vec3(0,1,0)+dn));
  return true;
}
`,ot="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",re=`
float gM;
#ifdef MATS
#define UN(a,id) {float t_=a;if(t_<res){res=t_;gM=id;}}
#else
#define UN(a,id) res=min(res,a);
#endif
float rings(vec3 p,float r,float a){
  float res=1e3;
  float k=clamp(floor((r-2.2)/SPc+.5),0.,NKm),Rk=rkf(k,a),v=r-Rk;
  float deck=k>4.5&&abs(a)<LA+.03?H:0.,yy=p.y-deck;
  if(k>4.5&&abs(a)<.14)return 1e3;
  if(abs(v)>1.3||yy>1.75)return max(abs(v)-1.2,yy-1.65)+.02;
  float gapA=k>.5?abs(fract(a/DA+.5)-.5)*DA*r-.75:1.;
#ifdef PROXY
  float dk=box2(vec2(v,yy-.4),vec2(.55,.4));
  UN(max(dk,-gapA),2.);
  return res;
#else
  float nL=floor(TAU*Rk/2.35+.5),ds=TAU*Rk/nL,na=a/TAU*nL,fl=floor(na),u=(na-fl-.5)*ds;
  float tp=box2(vec2(v,yy-.745),vec2(.55,.022))-.012;
  float ap=box2(vec2(v,yy-.66),vec2(.43,.06))-.012;
  float ped=box2(vec2(v,yy-.34),vec2(.2,.34));
  float rail=box2(vec2(v,yy-.81),vec2(.03,.05))-.008;
  float dk=min(min(tp,rail),min(ap,ped));
  UN(max(dk,-gapA),2.);
  float ca=(fl+.5)/nL*TAU,gc=abs(fract(ca/DA+.5)-.5)*DA*Rk;
  bool cellOK=k<.5||gc>1.15;
  if(k>4.5&&abs(ca)<.19)cellOK=false;
  if(cellOK){
    float hs=h21(vec2(fl,k+1.3)),lm=uP[13].w,th1=lm<.5?.96:lm<1.5?.55:.33,th0=lm<.5?.9:lm<1.5?.3:.17;
    if(abs(k-uP[11].z)<.5&&abs(mod(fl,nL)-uP[11].x)<.5){hs=uP[14].w;th0=0.;th1=1.;}
    // two chairs, pushed in or pulled out a little
    float side=v>0.?1.:-1.;
    if(k<3.5||side<0.||abs(a)>LA+.08){
      float hc=h21(vec2(fl,k+side*3.+7.3));
      float vs=side*(.72+.28*hc*hc)+.0,dv=(v-vs)*side;
      float ru=u+.05*(hc-.5);
      vec2 rq=vec2(ru+(hc-.5)*.2*dv,dv-(hc-.5)*.2*ru);
      float seat=box3(vec3(rq.x,yy-.46,rq.y),vec3(.21,.028,.21))-.02;
      float back=box3(vec3(rq.x,yy-.74,rq.y-.22-.04*(yy-.5)),vec3(.2,.2,.02))-.018;
      float leg=box2(vec2(abs(rq.x)-.2,rq.y),vec2(.03,.21));leg=max(leg,yy-.45);
      float ch=min(min(seat,back),leg);
      UN(ch,4.);
    }
    // left on some desks: a stack of one to four books, or a book open on a slanted rest against the divider
    if(hs>th1){
      float bs=hs>.8?-1.:1.,bz=(v-.27*bs)*bs;
      float rt=(hs-.7)*4.,cr=cos(rt),sr=sin(rt);
      vec2 bq=vec2(cr*(u-.12)+sr*bz,-sr*(u-.12)+cr*bz);
      float nb=1.+floor(fract(hs*13.7)*(lm>1.5?7.:4.)),yb=yy-.767,bi=clamp(floor(yb/.034),0.,nb-1.);
      float hb=h21(vec2(fl+bi*7.,k));
      float bo=(hb-.5)*.03,rr=(hb-.5)*.35,c2=cos(rr),s2=sin(rr);
      vec2 b2=vec2(c2*(bq.x-bo)+s2*bq.y,-s2*(bq.x-bo)+c2*bq.y);
      UN(box3(vec3(b2.x,yb-(bi+.5)*.034,b2.y),vec3(.1+.035*hb,.0145,.075+.025*fract(hb*7.)))-.002,7.);
    } else if(hs>th0){
      float bs=hs>.42?-1.:1.;
      vec2 rq=vec2(u-.2,(v-bs*.13)*bs);
      float ct=.766,st=.643,ax=abs(rq.x);
      vec2 rp=vec2(st*rq.y+ct*(yy-.85),-ct*rq.y+st*(yy-.85));
      UN(box3(vec3(rq.x,rp.x,rp.y),vec3(.165,.005,.112))-.002,15.);
      float pc=-.009*(1.-smoothstep(.0,.05,ax))-.006*ax*ax/.0225;
      UN(box3(vec3(rq.x,rp.x-.012-pc,rp.y+.004),vec3(.152,.008,.104))-.002,14.);
    }
    float qy=yy-.767,sd=1.-2.*mod(fl,2.);
    vec3 q=vec3(u,qy,v);
    float bd=box3(q-vec3(0.,.26,0.),vec3(.3,.35,.32));
    if(bd<.3){
      // a banker's lamp: oval brass foot, stem and arm, and a long trough of cased glass tipped to the reader
      float base=max(length(q.xz*vec2(.75,1.))-.062,abs(q.y-.012)-.012)-.008;
      base=min(base,max(length(q.xz)-.024,abs(q.y-.04)-.03));
      float stem=max(length(q.xz)-.0095,abs(q.y-.2)-.18);
      vec3 q2=q-vec3(0.,.41,sd*.11);
      float arm=length(vec3(q.x,q.y-.38,clamp(q.z,min(0.,sd*.11),max(0.,sd*.11))-q.z))-.009;
      q2.y+=q2.z*sd*.2;
      float sh=uP[4].z>.5?max(length(q2*vec3(.9,1.15,1.))-.105,-q2.y-.035)
        :max(abs(max(max(length(q2.yz)-.078-.012*smoothstep(.02,-.01,q2.y),-q2.y-.006),abs(q2.x)-.165))-.0045,-q2.y);
      UN(sh,6.);
      UN(min(base,min(stem,arm)),5.);
    } else res=min(res,bd);
  }
  return res;
#endif
}
float map(vec3 p){
  float res=1e3;gM=0.;
  float r=length(p.xz),a=ang(p.xz);
  float yy=p.y;
#ifndef GRINGS
  float air=max(r-RW,yy-Ys);
  float dome=(length(vec3(p.x,(yy-Ys)*RW/HD,p.z))-RW)*HD/RW;
  air=min(air,max(dome,Ys-yy-.3));
  // the oculus and its short lantern shaft
  air=min(air,max(r-Ro,Ys+HD-1.3-yy));
  float ba=a/TAU*NB+.5,bi=floor(ba),bu=(ba-bi-.5)*BW;
  // windows in the drum
  float W=1.05,yTop=17.35-W,y0=11.85;
  vec2 w2=vec2(abs(bu),yy-yTop);
  float win=max(yy>yTop?length(w2)-W:w2.x-W,y0-yy);
  float wv=max(win,abs(r-RW-.7)-1.0);
  air=min(air,wv);
#ifndef PROXY
  // door niche behind the landing
  float dn=max(max(abs(a)*r-1.75,abs(r-RW-.6)-.9),max(yy-(H+5.9),H-yy-.05));
  float dArch=length(vec2(abs(a)*r,yy-(H+4.15)))-1.75;
  dn=max(dn,yy>H+4.15?dArch:-1e3);
  air=min(air,dn);
#endif
#ifndef FAST
  // coffers
  if(yy>Ys-.5&&dome<.6){
    float la=atan(length(vec2(r/RW,0.))/max((yy-Ys)/HD,.01));
    float row=la/(PI/2.)*9.,fr=fract(row)-.5;
    float rib=max(smoothstep(.36,.46,abs(fr)),smoothstep(.34,.45,abs(fract(ba)-.5)));
    if(row>1.)air-=.28*(1.-rib);
  }
#endif
  UN(-air,20.);
#endif
  UN(p.y,1.);
  // landing: deck and a low step around its front, solid to the wall
  float land=max(max(16.6-r,(abs(a)-LA)*r),yy-H);
  UN(land,12.);
  UN(max(max(16.05-r,(abs(a)-LA-.025)*r),yy-H*.5),13.);
#if !defined(PROXY) && !defined(GRINGS)
  float pu=BW*.5-abs(bu);
  // pilasters between the bays, floor to cornice
  UN(max(box2(vec2(pu,r-(RW-.2)),vec2(.42,.22))-.04,yy-Ys),8.);
  // galleries (three tiers of book galleries)
  float gy=clamp(floor(yy/GH+.5),1.,3.)*GH;
  float slab=box2(vec2(r-(RW-.62),yy-gy),vec2(.66,.09));
  float bq=(fract(a*r/.16)-.5)*.16;
  float par=max(box2(vec2(r-(RW-1.23),yy-gy-.53),vec2(.018,.48)),abs(bq)-.011);
  par=min(par,box2(vec2(r-(RW-1.23),yy-gy-.14),vec2(.03,.035)));
  float top=box2(vec2(r-(RW-1.23),yy-gy-1.05),vec2(.1,.05))-.02;
  float gal=min(slab,min(par,top));
  gal=max(gal,-max(abs(a)*r-(1.75+.28),yy-(H+6.2)));
  UN(gal,10.);
  // cornice at the dome's spring
  UN(box2(vec2(r-(RW-.5),yy-(Ys-.2)),vec2(.62,.26))-.03,9.);
  // sconces flanking the doors
  if(abs(a)<.25&&abs(yy-(H+3.45))<1.&&r>RW-1.){
    float sc=length(vec3(abs(p.x)-2.05,(yy-(H+3.45))*.8,p.z-20.5))-.16;
    UN(sc,22.);
    UN(max(length(vec2(abs(p.x)-2.05,yy-(H+3.2)))-.03,abs(p.z-20.72)-.26),5.);
  }
  // door leaves
  UN(max(abs(r-(RW+.42))-.05,abs(a)*r-1.85),21.);
  // the oculus glazing
  if(r<Ro+.6&&yy>Ys+HD-1.5){
    float s8=abs(fract(ba/3.+.5)-.5)*(TAU*r/8.)-.06;
    float rg=min(abs(r-Ro*.52)-.07,abs(r-Ro*.98)-.08);
    float gz=max(min(s8,rg),abs(yy-(Ys+HD+.05))-.1);
    UN(gz,11.);
  }
#endif
#ifndef GSHELL
  if(r<RW-1.&&yy<4.){float pm=gM;float rg=rings(p,r,a);if(rg<res)res=rg;else gM=pm;}
#endif
  return res;
}
`,rt=`
out vec4 oC;
vec3 lookupPrev(vec3 q,vec3 n){
  ivec3 N=gn();
  float r=length(q.xz),a=ang(q.xz);
  vec2 er=vec2(sin(a),cos(a));
  vec3 nc=vec3(dot(n.xz,er),n.y,dot(n.xz,vec2(er.y,-er.x)));
  vec3 v=vec3(r/23.,(q.y+.5)/33.,a/TAU+.5)*vec3(N)-.5;
  return giCube(ivec3(floor(v+.5)),nc);
}
vec3 prAlb(vec3 q){
  float r=length(q.xz);
  if(q.y<.04)return uP[10].rgb;
  if(r<RW-1.4&&q.y<2.)return vec3(.15,.1,.07);
  if(q.y>Ys-.2)return uP[9].rgb;
  if(q.y>GH*3.+.1)return vec3(.4,.36,.3);
  return vec3(.11,.085,.065);
}
vec3 shadeHit(vec3 q,vec3 n){
  float lf=uP[7].w>=0.?.5:uP[5].w;
  float rk=abs(fract((length(q.xz)-2.2)/SPc+.5)-.5)*SPc;
  vec3 E=cove(q,n);
  if(n.y>.5)E+=uP[5].rgb*uP[4].w*1.05*smoothstep(.75,.55,rk)*lf*smoothstep(.7,.95,q.y)*step(q.y,1.8);
  else E+=uP[5].rgb*.2*lf;
  if(uP[2].w>.5)E+=lookupPrev(q+n*.3,n);
  return prAlb(q)*E/3.14159;
}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
  ivec3 N=gn();
  int ix=c.x%N.x,iz=c.x/N.x,iy=c.y%N.y,f=c.y/N.y;
  float r=(float(ix)+.5)/float(N.x)*23.,y=(float(iy)+.5)/float(N.y)*33.-.5,th=(float(iz)+.5)/float(N.z)*TAU-PI;
  vec3 er=vec3(sin(th),0.,cos(th)),et=vec3(er.z,0.,-er.x);
  vec3 p=er*r+vec3(0,y,0);
  vec3 a=f==0?er:f==1?-er:f==2?vec3(0,1,0):f==3?vec3(0,-1,0):f==4?et:-et;
  vec3 T=normalize(abs(a.y)>.5?vec3(1,0,0):cross(a,vec3(0,1,0)));
  vec3 B=cross(a,T);
  float jit=h21(vec2(float(ix+iy*37+iz*113)+float(f)*7.13,.7));
  int M=int(uP[8].w),L=M*40+12;
  int ph=0,st=0,k=0;
  float t=.05,m0=0.;
  vec3 g=vec3(0),d=vec3(0,1,0),q0=vec3(0),ng=vec3(0),sum=vec3(0);
  for(int it=0;it<L&&k<M;it++){
    vec3 q=p,kv=vec3(0);
    int j=st%4;
    if(ph==0){if(j>0)q[j-1]+=.25;}
    else if(ph==1)q=p+d*t;
    else{kv=vec3(float((st+3)&2)-1.,float((st+2)&2)-1.,float(st&2)-1.);q=q0+kv*.1;}
    float m=map(q);
    bool next=false;
    if(ph==0){
      if(j==0)m0=m;else g[j-1]=m-m0;
      bool clear=j==3&&m0>.35;
      if(j==3&&!clear)p+=normalize(g+1e-4)*(.42-m0);
      st++;
      if(clear||st>=12)next=true;
    }else if(ph==1){
      if(m<.01+.004*t){ph=2;st=0;q0=p+d*t;ng=vec3(0);}
      else{t+=m;st++;
        if(st>=34||t>60.||q.y>Ys+HD+.9||length(q.xz)>RW+1.3){sum+=skyC(d)*step(0.,d.y);k++;next=true;}}
    }else{
      ng+=kv*m;st++;
      if(st>=4){vec3 n=normalize(ng);sum+=shadeHit(q0+n*.05,n);k++;next=true;}
    }
    if(next){
      ph=1;st=0;t=.05;
      float u=(float(k)+.5)/float(M),v=fract(float(k)*.618034+jit);
      float s0=sqrt(u),c0=sqrt(max(1.-u,0.)),a0=6.28318*v;
      d=normalize(T*cos(a0)*s0+B*sin(a0)*s0+a*c0);
    }
  }
  oC=vec4(sum/float(M)*3.1416,1.);
}
#ifdef E8
void main(){mainS();oC.rgb=eN(oC.rgb);}
#endif
`,me=`
#ifdef E8
vec4 oC;out highp uvec4 oU;
#else
out vec4 oC;
#endif
vec2 octE(vec3 n){n/=abs(n.x)+abs(n.y)+abs(n.z);vec2 e=n.xy;if(n.z<0.)e=(1.-abs(e.yx))*vec2(e.x>=0.?1.:-1.,e.y>=0.?1.:-1.);return e*.5+.5;}
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
  float mode=uP[2].w,S=uP[3].w;
  vec3 ro,rd;float t=.02;
  if(mode<.5){
    vec2 uv=gl_FragCoord.xy/S*2.-1.;
    ro=uP[0].xyz;rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz));
  }else{if(!reflRay(c,ro,rd)){oC=vec4(0);return;}t=.05;}
  int NM=mode<.5?120:64,ph=0,k=1,it=0;
  float mat=0.,ao=1.,nE=.0035;
  vec3 p=ro,gN=vec3(0);
#ifdef GPART
  // Direct3D: the march (MONLY) and the shell's and desks' normals (GSHELL, GRINGS) are three programs, so each compiles alone
  t=mode<.5?texelFetch(uT,c,0).r:texelFetch(uTr,c,0).r;
  p=ro+rd*t;
  float r0=length(p.xz);
  bool inR=t>0.&&t<TMAX*.99&&p.y<H+2.2&&(r0<RW-1.5||(p.z>0.&&abs(p.x)<.63*r0&&r0<RW-.9));
#ifdef GRINGS
  if(!inR)discard;
#else
  if(inR)discard;
  if(t<=0.||t>=TMAX*.99){oC=vec4(0);return;}
#endif
  ph=1;k=0;nE=max(.0035,t*uP[1].w*2./S*1.3);
#endif
  for(int i=0;i<int(uP[11].w);i++){
    vec3 kv=vec3(0),q=ro+rd*t;float e=.8;
    if(ph==1){
      kv=k<=4?2.*vec3(float(((k+2)>>1)&1),float(((k-1)>>1)&1),float((k-1)&1))-1.:vec3(0);
      e=k==5?.12:.8;
      q=k<=4?p+kv*nE:p+normalize(gN)*e;
    }
    float d=map(q);
    if(ph==0){
      if(d<.0014+t*.0009||it>=NM){if(d>.02&&length(q.xz)>RW+.1&&q.y>11.&&uP[16].w>.5){t=TMAX;break;}ph=1;p=q;mat=gM;nE=max(.0035,t*uP[1].w*2./S*1.3);}
      else{t+=d*.93;it++;float rq=length(q.xz);if(t>TMAX||q.y>Ys+HD+.9||rq>RW+1.3||(rq>RW+.35&&q.y>11.&&uP[16].w>.5)){t=TMAX;break;}}
#ifdef MONLY
      if(ph==1)break;
#endif
    }else{
      if(k==0)mat=gM;else if(k<=4)gN+=kv*d;else{float v=clamp(d/e,0.,1.);ao*=k==5?v:sqrt(v);}
      k++;if(k>6)break;
    }
  }
#ifdef MONLY
  oC=vec4(t,0,0,1);return;
#endif
  if(t>=TMAX||ph==0){oC=vec4(TMAX,0,0,0);return;}
  float r=length(p.xz);
  // the desks' region: its floor and landing carry their own ids so the desk program shades them
  if(p.y<H+2.2&&(r<RW-1.5||(p.z>0.&&abs(p.x)<.63*r&&r<RW-.9)))mat=mat==1.?16.:mat==12.?17.:mat==13.?18.:mat;
  oC=vec4(t,octE(normalize(gN)),(mat*8.+floor(clamp(ao,0.,1.)*7.+.5))/255.);
}
#ifdef E8
void main(){mainS();oU=pk(oC);}
#endif
`,Pe=`
out vec4 oC;
#if defined(SRING) && !defined(SSHELL)
#define OUT0 discard;
#else
#define OUT0 {oC=vec4(0);return;}
#endif
#ifdef E8
void mainS(){
#else
void main(){
#endif
  ivec2 c=ivec2(gl_FragCoord.xy);
  float mode=uP[2].w,S=uP[3].w;
  vec3 ro,rd;float t;
  if(mode<1.5){
    vec2 uv=gl_FragCoord.xy/S*2.-1.;
    ro=uP[0].xyz;rd=normalize(uP[1].xyz+uP[1].w*(uv.x*uP[2].xyz+uv.y*uP[3].xyz));
#ifdef E8
    t=uk(texelFetch(uT,c,0)).r;
#else
    t=texelFetch(uT,c,0).r;
#endif
  }else{
    if(!reflRay(c,ro,rd)){OUT0}
#ifdef E8
    t=uk(texelFetch(uTr,c,0)).r;
#else
    t=texelFetch(uTr,c,0).r;
#endif
    if(t<=0.){OUT0}
  }
#if defined(SRING) && !defined(SSHELL)
  if(t>=TMAX*.99||(mode>.5&&mode<1.5))discard;
#else
  if(t>=TMAX*.99){
    vec3 s=skyC(rd);
    // panes of old glass: each its own faint tint, read where the ray crosses the window plane
    if(rd.y<.7){
      float ra=max(dot(rd.xz,rd.xz),1e-4),rb=dot(ro.xz,rd.xz),tw=uP[16].w>.5?(sqrt(max(rb*rb-ra*(dot(ro.xz,ro.xz)-(RW+.3)*(RW+.3)),0.))-rb)/ra:(RW+.3-length(ro.xz))/max(length(rd.xz),.01);
      vec3 q=ro+rd*tw;
      float aq=ang(q.xz),a=aq/TAU*NB,wy=clamp((q.y-11.85)/5.5,0.,1.);
      float wz=dot(normalize(q.xz),uP[15].xy);
      s=mix(mix(uP[7].rgb+uP[16].rgb*wz*1.6,uP[6].rgb,.35)*1.1,uP[6].rgb*.85,pow(wy,.8))*uP[6].w;
      s*=.85+.3*(.5+.5*wz)*(1.-.5*wy);
      vec2 pc=vec2(a*18.,q.y/.62),pn=floor(pc);
      float hp=h21(pn),rip=NS(vec3(pc*vec2(2.,1.3),hp*5.),.45);
      s*=(.84+.3*hp)*(.88+.24*rip);
      s=mix(s,dot(s,vec3(.3,.59,.11))*vec3(.9,1.,.97),.05+.12*fract(hp*7.));
      s+=uP[5].rgb*(.02+.03*rip)*uP[5].w*(1.-wy);
      s=mix(vec3(dot(s,vec3(.3,.59,.11))),s,.8)*.78*(1.-.65*uP[15].w);
      float wx=uP[12].z;
      if(wx>.5&&wx<1.5)s=mix(s,vec3(dot(s,vec3(.3,.59,.11)))*vec3(.95,.98,1.08),.35)*1.1;
      else if(wx>1.5&&wx<2.5){
        float dr=smoothstep(.82,.97,h21(floor(vec2(a*260.,q.y*34.)))),st=smoothstep(.7,.95,h21(vec2(floor(a*150.),3.1)))*(.6+.4*fract(q.y*.37+h21(vec2(floor(a*150.),.4))));
        s=s*(.55+.35*st+.4*dr)+uP[5].rgb*uP[5].w*.5*step(.992,h21(floor(pc*vec2(1.,1.5))+.5))*(1.-wy);
      } else if(wx>2.5&&wx<3.5)s=mix(s,vec3(.42,.44,.47)*(.8+.3*wy)*uP[6].w*1.6,.82);
      float bw=(fract(a+.5)-.5)*BW,pxw=tw*uP[1].w*2./uP[3].w/max(abs(dot(normalize(rd.xz),normalize(q.xz))),.12),hb=.011+pxw*.35,yS=16.3;
      float bv=abs(fract(bw/.525+.5)-.5)*.525,bh=abs(fract((q.y-11.85)/.7+.5)-.5)*.7;
      vec2 ah=vec2(bw,q.y-yS);float ar=length(ah),af=atan(ah.x/max(ah.y,.002));
      float fan=abs(fract(af/(PI/6.)+.5)-.5)*(PI/6.)*ar;
      float dB=q.y<yS?min(bv,bh):min(min(fan,abs(ar-.55)),ar<.1?0.:1.);
      // bars finer than about a pixel and a half (far or at a slant) become their mean shade, not a moire
      float bf=smoothstep(.03,.09,pxw);
      s=mix(s,vec3(.016,.013,.01)+s*.1,smoothstep(hb+pxw,hb,dB)*.94*(1.-bf))*(1.-.2*bf);
    } else s=mix(vec3(dot(s,vec3(.3,.59,.11))),s,.7)*.5*(.75+.25*NS(rd*7.,.7));
    oC=mode<.5||mode>1.5?vec4(s,1.):vec4(0.);return;
  }
#endif
  vec3 p=ro+rd*t;
#ifdef SSHELL
  if(mode>.5&&mode<1.5){
    float r1=length(p.xz),a1=ang(p.xz),kc1=clamp(floor((r1-2.2)/SPc+.5),0.,NKm),Rk1=rkf(kc1,a1),nL1=floor(TAU*Rk1/2.35+.5),f1=floor(a1/TAU*nL1);
    float ca1=(f1+.5)/nL1*TAU;
    vec2 L1=vec2(sin(ca1),cos(ca1))*Rk1;
    float dL=dot(p.xz-L1,p.xz-L1);
    vec4 lt1=lampT(kc1,Rk1,f1,nL1);
    gId=lt1.g;gW=lt1.r>.5?exp(-dL*1.7):0.;
    float F=.05+.95*pow(1.-max(-rd.y,0.),3.6);
    bool pol=p.y<.03||(abs(p.y-H)<.03&&length(p.xz)>16.3);
    float polish=0.;
    if(pol){
      float r2=length(p.xz),a2=ang(p.xz)*r2,flK=uP[11].y,jn,gs;
      if(p.y>.5){vec2 g2=p.xz/vec2(1.4,1.1);vec2 fg=abs(fract(g2)-.5)*vec2(1.4,1.1);jn=min(.7-fg.x,.55-fg.y);gs=h21(floor(g2));}
      else if(flK<.5){float rw=floor(r2/.55),of=h21(vec2(rw,1.))*5.,fa=fract(a2/.8+of),fr2=fract(r2/.55);
        jn=min(min(fr2,1.-fr2)*.55,min(fa,1.-fa)*.8);gs=h21(vec2(rw,floor(a2/.8+of)));}
      else{vec2 g2=p.xz/1.2;vec2 fg=abs(fract(g2)-.5)*1.2;jn=.6-max(fg.x,fg.y);gs=h21(floor(g2)+3.);}
      polish=uP[10].w*1.25*(.5+.55*gs)*(.75+.5*NS(vec3(p.xz,.5),1.8))*mix(.1,1.,smoothstep(.0,.014,jn));
    }
    oC=vec4(gId,gW,clamp(F*polish,0.,1.),1.);return;
  }
#endif
#ifdef E8
  vec4 gb=uk(texelFetch(uGb,c,0));
#else
  vec4 gb=texelFetch(uGb,c,0);
#endif
  vec3 n=octD(gb.gb);
  float m8=floor(gb.a*255.+.5),mat=floor(m8/8.),ao=mix(.4,1.,clamp((m8-mat*8.)/7.,0.,1.));
  // the desks' pixels (their floor and landing carry their own ids) are shaded by the other program
  bool ringR=(mat>1.5&&mat<7.5)||(mat>13.5&&mat<18.5);
#if defined(SRING) && defined(SSHELL)
  mat=mat==16.?1.:mat==17.?12.:mat==18.?13.:mat;
#elif defined(SRING)
  if(!ringR)discard;
  mat=mat==16.?1.:mat==17.?12.:mat==18.?13.:mat;
#else
  if(ringR)discard;
#endif
  float px=t*uP[1].w*2./S;
  float r=length(p.xz),a=ang(p.xz);
  vec3 alb=vec3(.1),emi=vec3(0);float gilt=0.,shn=0.;
  float k=clamp(floor((r-2.2)/SPc+.5),0.,NKm),Rk=rkf(k,a),v=r-Rk;
  float deck=(k>4.5&&abs(a)<LA+.03)?H:0.,yy=p.y-deck;
  float nL=floor(TAU*Rk/2.35+.5),fl=floor(a/TAU*nL),ds=TAU*Rk/nL,u=(a/TAU*nL-fl-.5)*ds;
  float ca=(fl+.5)/nL*TAU;
  float sd=1.-2.*mod(fl,2.);
  float hs=h21(vec2(fl,k+1.3));
  if(mat<-1.){}
#ifdef SRING
  else if(mat==2.){
    // desk: dark walnut with a leather inset on the top
    bool top=n.y>.7&&yy>.74&&yy<.79;
    vec3 wood=mix(vec3(.05,.028,.015),vec3(.15,.085,.04),NS(vec3(u*5.+k*9.,yy*8.,v*.5),.24));
    wood*=.65+.7*NS(vec3(u*1.1,yy,k),.8);
    if(top){
      float inset=max(abs(v)-.485,abs(u)-ds*.5+.06);
      vec3 lth=uP[14].rgb*(.72+.5*NS(vec3(p.xz*9.,k),.4));
      float scuff=smoothstep(.45,.72,NS(vec3(p.xz*3.,k+2.),1.1)+.15*(NS(vec3(p.xz,.3),.1)-.5));
      lth=mix(lth,lth*1.5+vec3(.03,.018,.01),scuff*.45);
      float tool=smoothstep(.006,.002,abs(inset+.018))*.25;
      lth=mix(lth,vec3(.32,.22,.09),tool);
      alb=mix(lth,wood,smoothstep(-.002,.002,inset));
      shn=.022*(1.-smoothstep(-.002,.002,inset));
      // left behind at some places: a call slip and a pencil
      float hsl=h21(vec2(fl,k+5.5));
      if(hsl>(uP[13].w<.5?.93:.55)){
        float sv=hsl>.78?1.:-1.,ro=(fract(hsl*31.)-.5)*1.4,cr=cos(ro),sr=sin(ro);
        vec2 sq=vec2(u+.25-.5*fract(hsl*9.),v-sv*.3),rq=vec2(cr*sq.x+sr*sq.y,-sr*sq.x+cr*sq.y);
        alb=mix(alb,vec3(.46,.43,.35)*(.9+.2*fract(hsl*53.)),step(abs(rq.x),.045)*step(abs(rq.y),.065)*step(inset,0.));
        alb=mix(alb,vec3(.3,.19,.05),step(abs(rq.x-.085),.0035)*step(abs(rq.y+.01),.07)*step(.7,fract(hsl*17.)));
      }
    } else alb=wood;
    // the seat's small brass number plate on the divider (no figures at this distance)
    if(abs(n.y)<.3&&abs(abs(v)-.038)<.012&&abs(yy-.83)<.016&&abs(abs(u)-.26)<.022)alb=vec3(.42,.3,.11);
  }
#endif
  else if(mat==1.){
    float flK=uP[11].y;
    float a2=a*r,rw=floor(r/.55),of=h21(vec2(rw,1.))*5.,aw=floor(a2/.8+of),fa=fract(a2/.8+of),fr2=fract(r/.55);
    float hp=h21(vec2(rw,aw)),j0=min(min(fr2,1.-fr2)*.55,min(fa,1.-fa)*.8);
    float nA=NS(vec3(a2,rw*2.,r*7.),.3),nB=NS(vec3(p.xz,2.),2.4);
    vec3 fv=flK<.5?mix(vec3(.07,.04,.02),vec3(.17,.1,.05),nA)*mix(.55,1.,smoothstep(.0,.006,j0))*(.75+.5*hp):flK<1.5?mix(vec3(.02,.02,.025),vec3(.17,.15,.14),smoothstep(.016,.0,abs(nB-.5))*.5):mix(vec3(.13,.11,.09),vec3(.22,.2,.17),nA);
    alb=fv*(.7+.55*nB);
  }
#ifdef SRING
  else if(mat==4.){
    float hc=h21(vec2(fl,k+7.3));
    alb=(n.y>.5&&yy>.45&&yy<.52)?vec3(.1,.04,.03)*(.7+.6*NS(p,.1)):mix(vec3(.05,.03,.018),vec3(.13,.075,.04),NS(p,.2));
    alb*=.8+.4*hc;
  } else if(mat==5.){
    alb=mix(vec3(.32,.2,.07),vec3(.55,.38,.14),NS(p,.05))*.22;
    vec3 rf=reflect(rd,n),Lb=vec3(sin(ca)*(Rk+sd*.11),deck+1.15,cos(ca)*(Rk+sd*.11));
    emi=uP[5].rgb*uP[4].w*(.09*pow(max(dot(rf,normalize(Lb-p)),0.),110.)+.008*pow(max(-rf.y,0.),6.))*.7+vec3(.5,.45,.35)*.012*pow(max(rf.y,0.),3.);
  } else if(mat==6.){
    // cased glass: dark bottle green outside, showing only a sheen and the room; the light leaves from the open
    // underside and through the thin lower lip, a bright emerald line; the inside is white-hot, seen only from below
    vec4 lt=lampT(k,Rk,fl,nL);
    vec3 glass=uP[4].rgb*(.85+.3*lt.a);
    bool lit=lt.r>.5,op=uP[4].z>.5;
    vec3 q2=vec3(u,yy-.767-.41,v-sd*.11);
    q2.y+=q2.z*sd*.2;
    float ht=clamp(q2.y/.085,0.,1.),ex=abs(q2.x)/.165,fc=max(dot(n,-rd),0.);
    bool inner=length(q2.yz)<.078+.012*smoothstep(.02,-.01,q2.y)&&abs(q2.x)<.158;
    // the lip is about 6 mm; far off it widens to a pixel and keeps about the same light; the floor's reflection
    // leaves it out (the rippled boards broke it into a column of bright dots)
    float lw=max(.006,px*1.3),lip=smoothstep(lw,lw*.25,q2.y)*sqrt(.006/lw)*(1.-.6*pow(ex,6.))*(mode>1.5?0.:1.);
    vec3 glow=op?glass*(.025+.05*smoothstep(.9,.0,ht)):glass*(2.1*lip+.006+.01*(1.-ht))+vec3(.16,.12,.05)*lip;
    vec3 hot=mix(uP[5].rgb,vec3(1.),.45)*uP[4].w*.16;
    emi=lit?(inner&&!op?hot:glow*(.75+.4*lt.b)):vec3(0);
    alb=inner?vec3(.45,.43,.38):op?glass*.15:glass*.05+.004;
    vec3 rf=reflect(rd,n);
    float fr=.04+.96*pow(1.-fc,5.);
    emi+=min(fr,.6)*(skyC(rf)*.07+uP[9].rgb*.025*uP[9].w)*(op?vec3(1):vec3(.75,1.1,.85));
    // the glass is glossy: the drum's blue windows and the warm room show in it as soft streaks
    emi+=(.045*uP[6].w*uP[6].rgb*smoothstep(.25,.42,rf.y)*smoothstep(.75,.55,rf.y)+.035*uP[5].rgb*max(-rf.y,0.))*(inner?0.:1.);
  }
#endif
#ifdef SSHELL
  else if(mat==22.){
    alb=vec3(.06);emi=vec3(1.,.74,.42)*(.3+.4*pow(max(dot(n,-rd),0.),1.5));
  }
#endif
#ifdef SRING
  else if(mat==7.){
    // each book in a stack its own binding; the page block shows on the long sides
    float bi=floor((yy-.767)/.034),hb=h21(vec2(fl+bi*7.,k)),hb2=h21(vec2(fl*1.3+bi,k+5.));
    alb=hb2<.22?vec3(.2,.045,.035):hb2<.4?vec3(.04,.075,.05):hb2<.56?vec3(.05,.06,.12):hb2<.72?vec3(.24,.15,.07):hb2<.84?vec3(.06,.05,.04):vec3(.34,.28,.18);
    float yc=fract((yy-.767)/.034);
    if(n.y<.5&&abs(yc-.5)<.33&&fract(hb*5.)>.3)alb=vec3(.3,.27,.2);
    alb*=.8+.4*NS(p,.05);
  } else if(mat==14.){
    float gx=u-.2,ln=fract((yy-.85)/.0075);
    alb=vec3(.56,.46,.31)*(.88+.24*NS(p,.03))*mix(.45,1.,smoothstep(.0,.035,abs(gx)));
    if(abs(dot(n,vec3(cos(ca),0.,-sin(ca))))>.6)alb=vec3(.4,.33,.22)*(.8+.2*sin(yy*2400.));
    alb*=1.-.28*smoothstep(.3,.5,ln)*smoothstep(.75,.55,ln)*step(.018,abs(gx))*step(abs(gx),.135)*step(.5,NS(vec3(u*90.,yy*40.,1.),.2)+.25);
  } else if(mat==15.){
    float hc=h21(vec2(fl,k+9.1));
    alb=(hc<.4?vec3(.15,.035,.025):hc<.7?vec3(.03,.065,.04):vec3(.12,.065,.03))*(.75+.5*NS(vec3(p.xz*14.,p.y*14.),.3));
  }
#endif
#ifdef SSHELL
  else if(mat==8.){
    alb=mix(vec3(.17,.14,.11),vec3(.28,.22,.17),NS(p,.6))*(.7+.5*NS(p,.1));
    alb=mix(alb,vec3(.34,.25,.1),smoothstep(.8,1.,NS(p+3.,.14))*.4);
  } else if(mat==9.){
    alb=mix(vec3(.3,.22,.1),vec3(.52,.38,.16),NS(p,.2))*(.7+.5*NS(p,.5));
  } else if(mat==10.){
    float pa=mod(a*r,1.05)-.52;
    alb=mix(vec3(.06,.05,.04),vec3(.13,.11,.09),NS(p,.2));
    alb=mix(alb,vec3(.35,.25,.1),smoothstep(.45,.4,abs(pa))*.14);
    if(n.y>.5)alb=vec3(.14,.09,.05)*(.7+.5*NS(p,.1));
    float gy=clamp(floor(p.y/GH+.5),1.,3.)*GH,ly=p.y-gy;
    // the rails: far off a gilt line; at arm's length dark polished wood with a grain along its length
    float nr=smoothstep(1.5,4.,t);
    if(abs(r-(RW-1.23))<.09&&ly>.1)alb=mix(vec3(.09,.055,.03),vec3(.3,.21,.08),nr)*(.7+.5*NS(nr>.99?p:vec3(a*r*.3,ly*25.,r*25.),.2));
  } else if(mat==11.){
    // glazing bars: dark paint, the sky catching their sides and tops
    alb=vec3(.07,.06,.05);
    emi=mix(uP[7].rgb,uP[6].rgb,.4)*uP[6].w*.8*(max(dot(n.xz,vec2(cos(a),-sin(a))),0.)+.5*max(n.y,0.));
  }
#endif
  else if(mat==12.||mat==13.){
    alb=mix(uP[10].rgb*1.4,vec3(.23,.2,.17),.45)*(.7+.5*NS(p,.8));
    alb*=.82+.3*h21(floor(p.xz/vec2(1.4,1.1)));
    float jr=min(min(fract(p.x/1.4),1.-fract(p.x/1.4))*1.4,min(fract(p.z/1.1),1.-fract(p.z/1.1))*1.1);
    alb*=mix(.6,1.,smoothstep(.0,.008,jr));
    if(mat==13.)alb*=.9;
  }
#ifdef SSHELL
  else {
    // the shell: dome, drum, book walls, door
    float y0=p.y;
    if(r>RW+.32&&abs(a)<.14&&y0<H+6.){
      float dpu=abs(a)*r,dy=y0-H,leaf=step(dpu,.012)*0.;
      float pn=max(abs(fract(y0/1.05)-.5)-.4,abs(fract(dpu/.72+.5)-.5)-.38);
      float rec=smoothstep(.04,.0,pn);
      alb=mix(vec3(.035,.02,.012),vec3(.11,.065,.035),NS(vec3(p.x*7.,y0*.35,p.z),.35))*(.45+.5*rec)*mix(.25,1.,step(.012,dpu));
      if(abs(dy-3.)<.08&&dpu>.05&&dpu<.32)alb=vec3(.42,.3,.12);
    } else if(y0>Ys-.25&&r<RW-.03){
      float la=atan(length(vec2(r/RW,0.))/max((y0-Ys)/HD,.01));
      float row=la/(PI/2.)*9.,ba=a/TAU*NB+.5;
      float rib=max(smoothstep(.36,.46,abs(fract(row)-.5)),smoothstep(.34,.45,abs(fract(ba)-.5)));
      vec3 dc=uP[9].rgb;
      vec3 infill=dc*(.42+.55*NS(vec3(p.xz,y0)*.2,.8));
      vec3 ribc=mix(dc*1.15,vec3(.36,.26,.12),.4)*(.55+.7*NS(p,.5));
      infill*=mix(.75,1.,smoothstep(.1,.42,abs(fract(row)-.5)));
      alb=mix(infill,ribc,rib);
      alb*=mix(.55,1.1,smoothstep(.35,.7,NS(vec3(p.xz,y0)*vec3(1.,.5,1.),5.5)));
      alb*=1.-.45*smoothstep(4.,1.,row);
      if(uP[13].x>.5)alb=mix(mix(vec3(.02,.03,.08),vec3(.5,.4,.2),step(.992,h21(floor(p.xz*2.)))),ribc,rib);
    } else if(y0>GH*3.+.15){
      alb=mix(vec3(.2,.17,.13),vec3(.31,.26,.2),NS(p,.5))*(.7+.5*NS(p,.1));
      alb*=mix(.6,1.05,smoothstep(.3,.7,NS(vec3(a*r*.6,y0*.25,2.),1.6)+.3*(NS(vec3(a*r*2.,y0*.3,.5),.35)-.5)));
      float rv=smoothstep(RW+.02,RW+1.4,r);
      emi=mix(uP[7].rgb,uP[6].rgb,.5)*uP[6].w*uP[12].x*.16*rv*(.4+.6*abs(dot(n.xz,vec2(cos(a),-sin(a))))+.6*max(n.y,0.));
      if(uP[12].z>.5&&uP[12].z<1.5&&n.y>.7&&rv>.05)alb=vec3(.55,.56,.6);
    } else {
      // the book walls: a map baked once (sets of bindings, gilt bands, shelf edges), three tiers, each offset
      float ti=clamp(floor(y0/GH),0.,2.);
      vec4 bk=textureLod(uBk,vec2(a*r*(45.5/2048.)+ti*.371,(ti+clamp((y0-ti*GH)/GH,.002,.998))/3.),log2(max(px*45.5,1.)));
      alb=bk.rgb;gilt=bk.a;
    }
  }
#endif
  // lighting
  vec3 Eg=giEval(p+n*.25,n);
#if defined(SRING) && defined(SSHELL)
  vec3 Ed=ringR?lamps(p,n,1):vec3(0);
#elif defined(SRING)
  vec3 Ed=lamps(p,n,1);
#else
  vec3 Ed=vec3(0);
#endif
  float id0=gId;
  // the sea of lamps below, as a warm rising wash on everything facing the room
  float lf=uP[7].w>=0.?.5:uP[5].w;
  float lit0=mix(.26,1.,smoothstep(.0,1.,lf));
  float rise=exp(-p.y/7.5)*(.55+.45*max(n.y,0.)+.4*max(-dot(n.xz,p.xz)/max(r,.1),0.));
  vec3 E=Eg*1.4+Ed+cove(p,n)*1.1+uP[5].rgb*.34*lit0*rise*(1.-uP[15].w);
  E+=uP[15].w*uP[6].w*mix(uP[7].rgb,uP[6].rgb,.5)*(.04+.12*max(dot(n,normalize(vec3(-p.x,14.6-p.y,-p.z))),0.))*smoothstep(-4.,17.,p.y);
  float L=dot(E,vec3(.3,.59,.11));
  float skyF=clamp((E.b-.85*E.r)/max(E.b,1e-3)*1.1,0.,1.);
  vec3 col=alb*E/3.14159*ao+emi+Ed*shn*ao;
  // a little soft sheen on the leather near its own lamp
  // air: faint warm depth haze
  float hz=exp(-t*.014);
  vec3 fogC=uP[5].rgb*(.015+.06*exp(-p.y/6.)*lit0)*(.6+.4*smoothstep(0.,1.,L))*(1.-uP[15].w);
  col=mix(fogC,col,hz);
  oC=vec4(col,skyF);
}
#ifdef E8
void main(){mainS();if(abs(uP[2].w-1.)>.5)oC.rgb=eN(oC.rgb);}
#endif
`,st=`
out vec4 oC;
vec3 binding(float h){
  return h<.16?vec3(.17,.04,.035):h<.3?vec3(.04,.085,.05):h<.42?vec3(.04,.05,.11):h<.54?vec3(.24,.14,.07):h<.66?vec3(.12,.07,.035)
    :h<.74?vec3(.03,.028,.025):h<.82?vec3(.28,.1,.06):h<.88?vec3(.38,.32,.22):h<.94?vec3(.12,.11,.05):vec3(.16,.05,.07);
}
void main(){
  vec2 f=gl_FragCoord.xy;
  float x=f.x/45.5,band=f.y/(512./3.),ti=floor(band),yy=fract(band)*GH;
  vec3 col=vec3(.03,.02,.013);float g=0.;
  if(yy>.2&&yy<GH-.09){
    float rowF=(yy-.2)/.385,row=floor(rowF)+ti*10.,v=fract(rowF);
    float xr=x+h21(vec2(row,3.7))*9.;
    // sets: jittered cells split in two, each set its own binding, width, height and tooling
    float ci=floor(xr/.62),cf=xr/.62-ci,sp=.2+.6*h21(vec2(ci,row+.5));
    float set=ci*2.+step(sp,cf),s0=(cf<sp?ci:ci+sp)*.62;
    float hs=h21(vec2(set,row+1.9)),hc=h21(vec2(set+.3,row+4.1)),hg=h21(vec2(set+.7,row+8.3));
    float w=.02+.045*hs*hs+.012*hc;
    float bx=(xr-s0)/w,bi=floor(bx),bu=fract(bx);
    float hb=h21(vec2(bi+set*31.,row+2.2)),hb2=h21(vec2(bi+set*17.,row+6.6));
    float top=mix(.56,.93,hg)+.05*(hb-.5)*(hs>.6?2.5:1.);
    vec3 bc=binding(hb2<.04?hb:hc)*(.8+.4*hb);
    float gap=step(.965,hb2);
    float rnd=1.-pow(abs(2.*bu-1.),3.);
    bc*=.5+.6*rnd;
    // gilt: bands near the head and tail and a label, per set, catching the light
    float gt=step(.35,hg),y1=top-.065,gb=smoothstep(.016,.006,abs(v-y1))+smoothstep(.014,.005,abs(v-.13))*step(.6,hg)
      +step(abs(v-(top-.17)),.035)*step(.7,hc)*.8;
    gb*=gt*step(.12,bu)*step(bu,.88);
    bc=mix(bc,vec3(.5,.38,.16)*(.75+.5*rnd),clamp(gb,0.,1.));
    float isB=step(.05,v)*step(v,top)*(1.-gap);
    col=mix(vec3(.012,.009,.007)*(1.+v),bc,isB);
    g=clamp(gb,0.,1.)*isB*(.5+.5*rnd);
    // seam between books, and the shelf board's front edge under each row
    col*=mix(1.,.55,isB*smoothstep(.12,.0,min(bu,1.-bu)));
    float edge=smoothstep(.055,.035,v);
    col=mix(col,vec3(.1,.068,.04)*(1.+1.2*smoothstep(.03,.05,v)),edge);
  } else if(yy<=.2) col=vec3(.07,.045,.028)*(yy>.17?1.5:1.);
  col*=.8+.4*NS(vec3(x*.5,yy*.3,ti),1.);
  oC=vec4(col,g);
}`,nt=`
out vec4 oC;
#ifdef E8
void mainS(){
#else
void main(){
#endif
  float mo=uP[2].w;
  ivec2 c=ivec2(gl_FragCoord.xy);
  if(mo>2.5){oC=texelFetch(uA,c,0);return;}
  if(mo>1.5){
    ivec3 N=gn();
    int ix=c.x%N.x,iz=c.x/N.x,iy=c.y%N.y,f=c.y/N.y;
    vec3 s=giF(ivec3(ix,iy,iz),f)*2.;float w=2.;
    for(int k=0;k<6;k++){ivec3 o=k==0?ivec3(1,0,0):k==1?ivec3(-1,0,0):k==2?ivec3(0,1,0):k==3?ivec3(0,-1,0):k==4?ivec3(0,0,1):ivec3(0,0,-1);
      ivec3 q=ivec3(ix,iy,iz)+o;
      if(q.x<0||q.y<0||q.x>=N.x||q.y>=N.y)continue;
      s+=giF(q,f);w+=1.;}
    oC=vec4(s/w,1.);return;
  }
  vec3 s=vec3(0);float w=0.;
  if(mo>.5){
    float S=uP[13].y;vec2 u=gl_FragCoord.xy/S;
#ifdef E8
    for(int i=-5;i<=5;i++){float g=float(i),k=exp(-g*g/11.);s+=k*dE(texture(uR,u+vec2((float(abs(i)%3)-1.)*1.4,3.*g)/S).rgb);w+=k;}
#else
    for(int i=-5;i<=5;i++){float g=float(i),k=exp(-g*g/11.);s+=k*texture(uR,u+vec2((float(abs(i)%3)-1.)*1.4,3.*g)/S).rgb;w+=k;}
#endif
  }else{
    vec2 uv=gl_FragCoord.xy/128.;
    for(int y=-3;y<=3;y++)for(int x=-3;x<=3;x++){vec2 d=vec2(float(x),float(y));float k=exp(-dot(d,d)/6.);
#ifdef E8
      vec3 a=dE(texture(uA,uv+d*1.3/128.).rgb);s+=k*max(a-1.,vec3(0));w+=k;}
#else
      vec3 a=texture(uA,uv+d*1.3/128.).rgb;s+=k*max(a-1.,vec3(0));w+=k;}
#endif
  }
  oC=vec4(s/w,1.);
}
#ifdef E8
void main(){mainS();if(uP[2].w<2.5)oC.rgb=eN(oC.rgb);}
#endif
`,ct=`
out vec4 oC;
vec3 aces(vec3 x){return clamp(x*(2.51*x+.03)/(x*(2.43*x+.59)+.14),0.,1.);}
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
  float S=uP[3].w,tm=uP[0].w;
  vec2 u=gl_FragCoord.xy/S;
  vec4 A=texelFetch(uA,c,0),I=texelFetch(uI,c,0);
#ifdef E8
  A.rgb=dE(A.rgb);
#endif
  float sky=uP[12].x;
  vec3 col=A.rgb*(1.-A.a*(1.-sky));
  float h=I.r,fw=I.g;
  if(h>.1){
    float per=7.+11.*h,ph=tm/per+h*13.,n=floor(ph),e=fract(ph)*per-h21(vec2(n,h*37.))*(per-1.6);
    if(h21(vec2(n,h*91.))>.8&&e>0.&&e<1.4){
      float sb=e*5.,s0=floor(sb),dip=mix(h21(vec2(s0+n*13.,h*7.)),h21(vec2(s0+1.+n*13.,h*7.)),smoothstep(0.,1.,sb-s0));
      col*=1.-fw*.7*smoothstep(.3,.85,dip)*smoothstep(0.,.15,e)*smoothstep(1.4,1.1,e);
    }
  }
  vec2 rt=vec2(.5/S);
#ifdef E8
  vec3 rf=.5*dE(texture(uR,u).rgb)+.25*(dE(texture(uR,u+rt).rgb)+dE(texture(uR,u-rt).rgb));
#else
  vec3 rf=.5*texture(uR,u).rgb+.25*(texture(uR,u+rt).rgb+texture(uR,u-rt).rgb);
#endif
  col+=rf*I.b;
#ifdef E8
  col+=dE(texture(uGl,u).rgb)*.3;
#else
  col+=texture(uGl,u).rgb*.3;
#endif
  col*=uP[12].y;
  col=aces(col);
  col=pow(col,vec3(.4545));
  col+=(h21(vec2(c))-.5)*.006;
  oC=vec4(col,1.);
}`,it=`
out vec3 vC;
out float vS;
void main(){
  int id=gl_VertexID;
  float a=h21(vec2(float(id),1.3)),b=h21(vec2(float(id),2.1)),c=h21(vec2(float(id),3.7)),d=h21(vec2(float(id),5.9));
  float tt=uP[0].w;
  vec3 eye=uP[0].xyz,fw=uP[1].xyz,p;
  float bright;
  if(id>=900){
    // snow falling past the drum's windows, outside the glass
    float fa=a*TAU,fr=RW+.9+1.8*c;
    p=vec3(sin(fa)*fr,18.2-mod(tt*(.3+.25*d)+b*7.,7.),cos(fa)*fr);
    p.x+=.25*sin(tt*.6+d*30.);p.z+=.25*cos(tt*.5+c*30.);
    vC=mix(uP[6].rgb*uP[6].w*2.2,vec3(.8,.82,.88),.45)*uP[12].x;bright=.75;
  }else{
    p=eye+fw*(.6+7.*c*c)+uP[2].xyz*(-5.+10.*a)*(.25+c)+uP[3].xyz*(-3.+6.*b)*(.25+c);
    p.x+=.24*sin(tt*.05+d*20.);p.y+=.12*sin(tt*.03+a*30.)+.3*fract(tt*.009+b);p.z+=.2*sin(tt*.04+b*20.);
    // dust shows only in the cone under a lit shade
    float r=length(p.xz),an=ang(p.xz),k=clamp(floor((r-2.2)/SPc+.5),0.,NKm),Rk=rkf(k,an),nL=floor(TAU*Rk/2.35+.5),fl=floor(an/TAU*nL);
    float ca=(fl+.5)/nL*TAU,deck=k>4.5&&abs(an)<LA+.03?H:0.;
    vec3 L=vec3(sin(ca)*(Rk+.11*(1.-2.*mod(fl,2.))),deck+1.15,cos(ca)*(Rk+.11*(1.-2.*mod(fl,2.))));
    vec3 v=L-p;
    float cone=v.y>.02?smoothstep(.45+.6*v.y,.2+.3*v.y,length(v.xz))*smoothstep(.0,.08,v.y)*step(deck+.79,p.y):0.;
    vC=uP[5].rgb;bright=cone*lampT(k,Rk,fl,nL).r*.5;
  }
  vec3 w=p-eye;
  float zv=dot(w,fw);
  vec3 cs=vec3(dot(w,uP[2].xyz),dot(w,uP[3].xyz),zv);
  float S=uP[3].w;
  float px=(cs.x/zv/uP[1].w)*.5+.5,py=(cs.y/zv/uP[1].w)*.5+.5;
#ifdef PPT
  float dep=uk(texelFetch(uA,ivec2(clamp(vec2(px,py),vec2(.001),vec2(.999))*S),0)).r;
#else
  float dep=texelFetch(uA,ivec2(clamp(vec2(px,py),vec2(.001),vec2(.999))*S),0).r;
#endif
  if(zv<.3||length(w)>dep||bright<.01){gl_Position=vec4(2,2,2,1);gl_PointSize=1.;vS=0.;return;}
  float sz=(.008+.02*d*d)/zv/uP[1].w*S*(id>=900?1.6:1.);
  gl_PointSize=clamp(sz,.8,2.6)+.2;
  vS=bright;
  gl_Position=vec4(cs.x/zv/uP[1].w,cs.y/zv/uP[1].w,0.,1.);
}`,ft="in vec3 vC;in float vS;out vec4 oC;void main(){vec2 d=gl_PointCoord-.5;float r=dot(d,d);if(r>.25)discard;oC=vec4(vC*vS*(1.-r*4.),1.);}";function lt(e){if(e.__c632)return e.__c632;e.getExtension("KHR_parallel_shader_compile");const a=!!e.getExtension("EXT_color_buffer_float"),o=!a&&!!e.getExtension("EXT_color_buffer_half_float");e.getExtension("OES_texture_float_linear");const n=(E,D)=>{const N=e.createShader(E);return e.shaderSource(N,D),e.compileShader(N),N},g=n(e.VERTEX_SHADER,ke+ot),w=e.getExtension("WEBGL_debug_renderer_info"),b=/Direct3D|D3D1/i.test(String(e.getParameter(w?w.UNMASKED_RENDERER_WEBGL:e.RENDERER)||"")),i={gi:[`#define FAST
#define PROXY
`+re+rt]};b?Object.assign(i,{m:[`#define FAST
#define MONLY
`+re+me],ga:[`#define MATS
#define GPART
#define GSHELL
`+re+me],gb:[`#define MATS
#define GPART
#define GRINGS
`+re+me]}):i.g=[`#define MATS
`+re+me],b?Object.assign(i,{sa:[`#define SSHELL
`+Pe],sb:[`#define SRING
`+Pe]}):i.s=[`#define SSHELL
#define SRING
`+Pe],Object.assign(i,{l:[nt],c:[ct],p:[ft,it],b:[st]});const y=b?["sb","sa","m","gb","gi","ga","b","p","l","c"]:["gi","g","s","l","c","p","b"],v={},I=!a&&!o&&!b,X=E=>I?`#define E8
`+(E==="p"?`#define PPT
`:""):"";for(const E of y){const D=n(e.FRAGMENT_SHADER,ke+X(E)+Fe+i[E][0]),N=i[E][1]?n(e.VERTEX_SHADER,ke+X(E)+Fe+i[E][1]):g,A=e.createProgram();e.attachShader(A,N),e.attachShader(A,D),e.linkProgram(A),v[E]={p:A,v:N,f:D},e.flush()}return at(),e.__c632={P:v,d3d:b,flt:a,half:o,e8:I,vEmpty:e.createVertexArray(),tN:null,linked:!1,pool:new Map}}function dt(e,a){if(a.linked)return;const o=a.P;for(const b in o){const{p:i,v:y,f:v}=o[b];if(!e.getProgramParameter(i,e.LINK_STATUS))throw new Error("632 "+b+": "+(e.getShaderInfoLog(y)||"")+(e.getShaderInfoLog(v)||"")+e.getProgramInfoLog(i));e.useProgram(i),["uN","uGv","uT","uTr","uA","uI","uR","uGl","uLt","uBk","uGb"].forEach((I,X)=>{const E=e.getUniformLocation(i,I);E&&e.uniform1i(E,X)}),o[b]={p:i,uP:e.getUniformLocation(i,"uP")}}const n=e.createTexture();e.bindTexture(e.TEXTURE_3D,n),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage3D(e.TEXTURE_3D,0,e.R16F,64,64,64,0,e.RED,e.HALF_FLOAT,he),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_3D,e.TEXTURE_MAG_FILTER,e.LINEAR);for(const b of[e.TEXTURE_WRAP_S,e.TEXTURE_WRAP_T,e.TEXTURE_WRAP_R])e.texParameteri(e.TEXTURE_3D,b,e.REPEAT);e.pixelStorei(e.UNPACK_ALIGNMENT,4),a.tN=n,a.linked=!0;const g=e.createTexture();e.bindTexture(e.TEXTURE_2D,g),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,2048,512,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const w=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,w),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,g,0),e.viewport(0,0,2048,512),e.useProgram(o.b.p),e.bindVertexArray(a.vEmpty),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,n),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,g),e.generateMipmap(e.TEXTURE_2D),a.bk=g}function M(e,a,o,n,g){const w=e.createTexture();e.bindTexture(e.TEXTURE_2D,w),a.e8&&g==="g"?e.texImage2D(e.TEXTURE_2D,0,e.RGBA16UI,o,n,0,e.RGBA_INTEGER,e.UNSIGNED_SHORT,null):g==="g"?e.texImage2D(e.TEXTURE_2D,0,a.flt||a.half?e.RGBA16F:e.RGBA8,o,n,0,e.RGBA,a.flt||a.half?e.HALF_FLOAT:e.UNSIGNED_BYTE,null):g==="r32"?e.texImage2D(e.TEXTURE_2D,0,a.flt?e.R32F:a.half?e.R16F:e.RGBA8,o,n,0,a.flt||a.half?e.RED:e.RGBA,a.flt?e.FLOAT:a.half?e.HALF_FLOAT:e.UNSIGNED_BYTE,null):g==="f"?e.texImage2D(e.TEXTURE_2D,0,a.flt||a.half?e.RGBA16F:e.RGBA8,o,n,0,e.RGBA,a.flt||a.half?e.HALF_FLOAT:e.UNSIGNED_BYTE,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,o,n,0,e.RGBA,e.UNSIGNED_BYTE,null);const b=g==="r32"||g==="g"?e.NEAREST:e.LINEAR;e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const i=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,w,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{tex:w,fb:i,w:o,h:n}}De.add({num:632,name:"Reading Room",fam:"Vistas",recipe:"A great domed reading room through a winter afternoon and evening, with curved rows of desks, shaded lamps, books up to the galleries and a ring of tall windows. The lamps and how many are lit, the hour, where you sit or stand and what readers left behind change every mint. It's a quiet room with nothing to press: dust hangs in the lamplight, a lamp sometimes falters and the windows slowly darken.",interactive:"None: a quiet room. Dust hangs in the lamplight under the shades, a lamp now and then falters, snow drifts past the windows on snowy nights and the windows go slowly darker.",music:!1,gl:!0,fps:30,seed:0,make(e){const a=e.gl,o=e.size,n=lt(a);let g=parseInt(e.hash.slice(2,10),16)|0;const w=()=>{g=g+1831565813|0;let t=Math.imul(g^g>>>15,1|g);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},b=t=>{let s=0;for(const c of t)s+=c[1];let r=w()*s;for(const c of t)if(r-=c[1],r<=0)return c[0];return t[0][0]},i=e.home;let y=103981342;for(let t=2;t<66;t+=8)y=Math.imul(y^parseInt(e.hash.slice(t,t+8),16),668265263)^y>>>15;const v=()=>{y=y+1831565813|0;let t=Math.imul(y^y>>>15,1|y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},I=v(),X=v(),E=v(),D=v(),N=v();let A=i?"Banker Green":b([["Banker Green",6],["Amber Glass",3],["Opal Glass",2]]),h=i?"Most On":b([["All On",7],["Most On",7],["Half The Room",2],["Scattered",1],["One Row",1]]),F=i?"Dim Gold":b([["Dim Gold",6],["Night Blue",3],["Bare Plaster",2]]),G=i?"Blue Hour":b([["Blue Hour",5],["Deep Night",3],["Snow Light",3],["Last Light",2]]),J=i?"Parquet":b([["Parquet",5],["Black Marble",3],["Terrazzo",2]]);!i&&I<.07&&(h="One Lamp");const vt=i?"Centre Landing":b([["Centre Landing",4],["Left Of The Landing",3],["Right Of The Landing",3]]);let j=103989954;for(let t=2;t<66;t+=8)j=Math.imul(j^parseInt(e.hash.slice(t,t+8),16),739982445)^j>>>13;const K=()=>{j=j+1831565813|0;let t=Math.imul(j^j>>>15,1|j);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},se=(t,s)=>{let r=0;for(const u of t)r+=u[1];let c=s*r;for(const u of t)if(c-=u[1],c<=0)return u[0];return t[0][0]},ht=K(),Q=K(),Z=K(),xe=K(),mt=K(),xt=K(),Ae=K();let f=i?"On The Landing":X<.17?"Upper Gallery":se([["At A Desk",15],["On The Landing",15],["Along The Aisle",20],["Under The Gallery",15],["Centre Desk",10],["Into The Dome",4]],ht),ne=i?"Clear":se([["Clear",60],["Snow Falling",20],["Rain On The Glass",12],["Fog",8]],mt),ue=i?"Books And Slips":se([["Bare Desks",25],["Books And Slips",50],["Folios Heaped",25]],xt);if(Ee&&ve[e.hash.slice(0,10)]){const t=ve[e.hash.slice(0,10)];[A,h,F,G,J,f,ne,ue]=[t[0]||A,t[1]||h,t[2]||F,t[3]||G,t[4]||J,t[5]||f,t[6]||ne,t[7]||ue]}h==="One Lamp"&&G==="Deep Night"&&(G="Blue Hour"),h==="One Lamp"&&f!=="Upper Gallery"&&(f="At A Desk"),h==="One Row"&&(f==="Along The Aisle"||f==="Under The Gallery"||f==="Centre Desk")&&(f="At A Desk");let Y=103994597;for(let t=2;t<66;t+=8)Y=Math.imul(Y^parseInt(e.hash.slice(t,t+8),16),461845907)^Y>>>14;const O=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ut=O(),Ge=O(),bt=O(),pt=O(),Oe=O(),P=[O(),O(),O(),O(),O()];let ze="Round Drum";if(i||(ut<.3?f=se([["From The Lantern",7],["By A Window",8],["Across The Lamps",10],["Under The Dome",5]],Ge):f==="Into The Dome"&&Ge<.5&&(f="Under The Dome"),bt<.18&&(G="Winter Afternoon"),ze=se([["Round Drum",74],["Skylit Dome",14],["Tall Windows",12]],pt)),Ee&&ve[e.hash.slice(0,10)]){const t=ve[e.hash.slice(0,10)];G=t[3]||G,f=t[5]||f,ze=t[8]||ze}(h==="One Lamp"||h==="Scattered")&&(f==="From The Lantern"||f==="Across The Lamps")&&(f="Under The Dome");const ce=G==="Winter Afternoon"?1:0;ce&&(h=h==="One Lamp"||h==="One Row"||h==="Scattered"?"Scattered":"Not Yet Lit"),e.trait("Lamp Glass",A),e.trait("Lit",h),e.trait("Dome",F),e.trait("Hour",G),e.trait("Floor",J),e.trait("Standing",f),e.trait("Outside",ne),e.trait("Left On The Desks",ue);const Se={"Banker Green":[.06,.48,.17],"Amber Glass":[1,.52,.13],"Opal Glass":[.95,.93,.82]}[A],Ne={"Banker Green":[1,.75,.43],"Amber Glass":[1,.62,.3],"Opal Glass":[1,.82,.6]}[A],yt={"Banker Green":5.5,"Amber Glass":5.8,"Opal Glass":6.5}[A]*(h==="One Lamp"?1.5:h==="Scattered"||h==="One Row"?1.3:1),Tt=w()*6.28,ie={"Dim Gold":{c:[.46,.32,.13],cove:3.1,star:0},"Night Blue":{c:[.05,.07,.15],cove:1.7,star:1},"Bare Plaster":{c:[.3,.28,.25],cove:1.3,star:0}}[F],B={"Blue Hour":{zen:[.1,.18,.58],hor:[.22,.24,.55],k:.55,x:1.32,end:.78,sw:[.06,.1,.02]},"Deep Night":{zen:[.025,.05,.15],hor:[.05,.06,.13],k:.6,x:1.5,end:.75},"Snow Light":{zen:[.42,.5,.72],hor:[.72,.7,.72],k:.42,x:1.2,end:.82},"Last Light":{zen:[.2,.22,.55],hor:[.6,.38,.45],k:.55,x:1.25,end:.7,sw:[.5,.15,-.24]},"Winter Afternoon":{zen:[.55,.62,.75],hor:[.78,.8,.84],k:5,x:1.4,end:.92}}[G],gt={Parquet:0,"Black Marble":1,Terrazzo:2}[J],Le={Parquet:[.13,.08,.04],"Black Marble":[.05,.05,.055],Terrazzo:[.18,.16,.13]}[J],wt={Parquet:.9,"Black Marble":1,Terrazzo:.55}[J],Me=[[.03,.04,.024],[.14,.055,.03],[.1,.065,.04]][i?0:Math.floor(w()*3)],d=new Float32Array(17*4),z=(t,s,r,c,u)=>{d[t*4]=s,d[t*4+1]=r,d[t*4+2]=c,d[t*4+3]=u};z(4,Se[0],Se[1],Se[2],yt),z(5,Ne[0],Ne[1],Ne[2],0),z(6,B.zen[0],B.zen[1],B.zen[2],B.k),z(7,B.hor[0],B.hor[1],B.hor[2],-1),z(9,ie.c[0],ie.c[1],ie.c[2],ce?0:ie.cove),z(10,Le[0],Le[1],Le[2],wt),z(11,0,gt,0,128),z(12,1,B.x*(f==="From The Lantern"?1.3:f==="Across The Lamps"?1.15:1)*(i?1.08:h==="All On"?1.36:h==="Most On"?1.18:h==="One Lamp"?1.5:1.4),0,0),z(13,ie.star,o>>1,1,8),z(14,Me[0],Me[1],Me[2],0);const $=[14,12,16];z(8,$[0],$[1],$[2],ce?24:9),dt(a,n);const S=n.P,be=$[0]*$[2],pe=$[1]*6,ye=M(a,n,be,pe,"f"),Te=M(a,n,be,pe,"f");for(const t of[Te])a.bindTexture(a.TEXTURE_2D,t.tex),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE);const _=t=>{for(const s of t)a.activeTexture(a.TEXTURE0+s[0]),a.bindTexture(s[2]?a.TEXTURE_3D:a.TEXTURE_2D,s[1])},L=(t,s,r,c)=>{a.bindFramebuffer(a.FRAMEBUFFER,s),a.viewport(0,0,r,c),a.useProgram(t.p),a.uniform4fv(t.uP,d),a.bindVertexArray(n.vEmpty)},ge=Math.tan(34*Math.PI/180),p=(()=>{if(i)return{ex:-.6,ey:2.6,ez:18.1,yaw:Math.PI+.14,pitch:.11,tan:ge};const t=f==="Left Of The Landing"?-3.1:f==="Right Of The Landing"?2.4:-.6;return{ex:t+(w()-.5)*1.1,ey:2.6,ez:17.6+w()*.5,yaw:Math.PI-t*.1+(w()-.5)*.22,pitch:.12+w()*.05,tan:ge}})();if(f==="On The Landing"&&!i){const t=(xe-.5)*4.6;Object.assign(p,{ex:t,yaw:Math.PI-t*.07+(Q-.5)*.5,pitch:.06+Z*.13})}if(f==="Upper Gallery"){const t=Math.round((E<.5?-1:1)*(1.15+E%.5*2.2)/(Math.PI/12))*Math.PI/12,s=20.75;Object.assign(p,{ex:Math.sin(t)*s,ey:3.75+.09+1.82,ez:Math.cos(t)*s,yaw:t+Math.PI+(D-.5)*.5,pitch:-.1})}const ee=[];for(let t=0;t<7;t++){const s=Math.min(t,5),r=t<6?2.2+3*t:19.4,c=Math.floor(2*Math.PI*r/2.35+.5);for(let u=0;u<c;u++){const x=u<c/2?u:u-c,l=(x+.5)/c*2*Math.PI,m=Math.abs(l),T=l/(Math.PI/4)+.5,q=Math.abs(T-Math.floor(T)-.5)*Math.PI/4*r;s>.5&&q<1.15||(t===6?m>=.56||m<.19:s===5&&m<.59)||ee.push({kk:t,i:u,ca:l,Rk:r,sd:1-2*((x%2+2)%2),x:Math.sin(l)*r,z:Math.cos(l)*r})}}const _e=f==="Under The Gallery"?5:f==="Along The Aisle"?3:f==="Centre Desk"?1+Math.floor(N*2):2+Math.floor(N*3),Be=(t,s,r,c,u,x)=>{const l=c-t,m=u-s,T=x-r;return{yaw:Math.atan2(l,T),pitch:Math.atan2(m,Math.hypot(l,T))}},Et=(t,s)=>{let r=t-s;for(;r>Math.PI;)r-=2*Math.PI;for(;r<-Math.PI;)r+=2*Math.PI;return r};let H=null;const He=Math.PI/4;if(f==="At A Desk"){const t=h==="One Row"?_e:2+Math.floor(Q*3),s=ee.filter(oe=>oe.kk===t&&Math.abs(oe.ca)>.7);H=s[Math.floor(Z*s.length)];const r=H,c=[Math.sin(r.ca),Math.cos(r.ca)],u=[Math.cos(r.ca),-Math.sin(r.ca)],x=xe<.5?-1:1,l=Ae<.4?0:Ae<.7?1:2,m=.3+.55*(Ae*7.3%1),T=r.Rk+r.sd*(l===1?1.95:1.04),q=r.ca-x*(l===2?2.1/T:l===1?.3/T:.48/T),W=Math.sin(q)*T,k=Math.cos(q)*T,U=l===1?1.66:l===2?1.3:1.25,le=c[0]*(r.Rk+r.sd*.11),de=c[1]*(r.Rk+r.sd*.11),te=r.ca+x*(l===2?m*.6:m),C=Be(W,U,k,le,1.05,de),we=Be(W,U,k,Math.sin(te)*r.Rk,1,Math.cos(te)*r.Rk),ae=l===2?.3:.4;Object.assign(p,{ex:W,ey:U,ez:k,yaw:C.yaw+Re(Et(we.yaw,C.yaw),-ae,ae),pitch:l===1?C.pitch*.35+.04:l===2?C.pitch*.4:-.05})}else if(f==="Along The Aisle"){const t=Math.floor(Q*8)*He,s=[Math.sin(t),Math.cos(t)],r=[Math.cos(t),-Math.sin(t)],c=(Z-.5)*1.1;Object.assign(p,{ex:s[0]*12.5+r[0]*c,ey:1.65,ez:s[1]*12.5+r[1]*c,yaw:t+Math.PI-c*.25+(xe-.5)*.2,pitch:-.27})}else if(f==="Under The Gallery"){const t=.75+Q*(2*Math.PI-1.5),s=Z<.5?-1:1,r=[Math.sin(t),Math.cos(t)],c=[Math.cos(t),-Math.sin(t)],u=r[0]*19.95,x=r[1]*19.95,l=[-r[0]*.8+c[0]*s*.6,-r[1]*.8+c[1]*s*.6];Object.assign(p,{ex:u,ey:1.6,ez:x,yaw:Math.atan2(l[0],l[1])+(xe-.5)*.15,pitch:-.03})}else if(f==="Centre Desk"){const t=Math.floor(Q*8)*He,s=[Math.sin(t),Math.cos(t)];Object.assign(p,{ex:s[0]*.9,ey:1.3,ez:s[1]*.9,yaw:t+(Z-.5)*.3,pitch:-.04})}else if(f==="Into The Dome"){const t=Q*2*Math.PI;Object.assign(p,{ex:Math.sin(t)*3.7,ey:1.6,ez:Math.cos(t)*3.7,yaw:t+Math.PI+(Z-.5)*.4,pitch:.93})}else if(f==="From The Lantern"){const t=P[0]*2*Math.PI,s=P[1]*1.3;Object.assign(p,{ex:Math.sin(t)*s,ey:26+2*P[2],ez:Math.cos(t)*s,yaw:P[3]*2*Math.PI,pitch:-1.45-.12*P[4]})}else if(f==="By A Window"){const t=P[0]<.5?-1:1,s=(Math.floor(P[1]*20)+2)*Math.PI/12,r=20.25,c=s-t*(.1+.04*P[2]);Object.assign(p,{ex:Math.sin(c)*r,ey:12.96,ez:Math.cos(c)*r,yaw:c+t*(Math.PI/2+.03+.1*P[3]),pitch:.1+.08*P[4]})}else if(f==="Across The Lamps"){const t=Math.tan((13+3*P[0])*Math.PI/180),s=(P[2]-.5)*4;Object.assign(p,{ex:s,ey:2.6,ez:17.9,yaw:Math.PI-s*.05+(P[3]-.5)*.7,pitch:-.12-.09*P[4],tan:t})}else if(f==="Under The Dome"){const t=P[0]*2*Math.PI,s=4+2*P[1];Object.assign(p,{ex:Math.sin(t)*s,ey:1.6,ez:Math.cos(t)*s,yaw:t+Math.PI,pitch:1.3+.1*P[2],tan:1.43})}const Ce=i?2.3:p.yaw+(Oe<.5?-1:1)*(.6+.9*(Oe*2%1)),qe=!i&&B.sw||[0,0,0];z(15,Math.sin(Ce),Math.cos(Ce),0,ce),z(16,qe[0],qe[1],qe[2],i?0:1);const fe=new Uint8Array(64*7*4);{const t=Math.cos(p.yaw),s=Math.sin(p.yaw),r=x=>{const l=x.x-p.ex,m=x.z-p.ez,T=l*s+m*t,q=l*t-m*s;return{f:T,ang:Math.abs(q/Math.max(T,.01)),d:Math.hypot(l,m)}};let c=-1;if(h==="One Lamp"){const x=p.ey>4?[7,17]:[2.2,6],l=ee.map((m,T)=>[T,r(m)]).filter(([,m])=>m.f>0&&m.ang<.38*p.tan/ge&&m.d>x[0]&&m.d<x[1]);c=l.length?l[Math.floor(v()*l.length)][0]:0}H&&h==="One Lamp"&&(c=ee.indexOf(H));let u=0;ee.forEach((x,l)=>{const m=v(),T=v(),q=v(),W=v();let k;h==="All On"?k=!0:h==="Most On"?k=m<.82:h==="Half The Room"?k=m<(Math.cos(x.ca-Tt)>-.15?.9:.05):h==="Scattered"?k=m<.06:h==="One Row"?k=x.kk===_e||_e===5&&x.kk===6?m<.94:m<.02:k=l===c,x===H&&!ce&&(k=!0),k&&u++;const U=(x.kk*64+x.i)*4;fe[U]=k?255:0,fe[U+1]=k&&q<.05&&x!==H?40+Math.floor(v()*215):0,fe[U+2]=Math.floor((T<.08?.1:.4+.6*T)*255),fe[U+3]=Math.floor(W*255)}),d[5*4+3]=Math.max(u/ee.length,.02)}H?(d[11*4]=H.i,d[11*4+2]=Math.min(H.kk,5),d[14*4+3]=H.sd>0?.36:.46):d[11*4+2]=-1,d[13*4+3]={"Bare Desks":0,"Books And Slips":1,"Folios Heaped":2}[ue],z(12,1,d[12*4+1],{Clear:0,"Snow Falling":1,"Rain On The Glass":2,Fog:3}[ne],0);const We=a.createTexture();a.activeTexture(a.TEXTURE8),a.bindTexture(a.TEXTURE_2D,We),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,64,7,0,a.RGBA,a.UNSIGNED_BYTE,fe),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let t=0;t<2;t++)d[2*4+3]=t,_([[0,n.tN,!0],[1,(t%2===0?Te:ye).tex]]),L(S.gi,(t%2===0?ye:Te).fb,be,pe),a.drawArrays(a.TRIANGLES,0,3);_([[0,n.tN,!0],[1,Te.tex]]),d[2*4+3]=2,L(S.l,ye.fb,be,pe),a.drawArrays(a.TRIANGLES,0,3);const Rt=ye;let R=n.pool.get(o);R||(R={T:M(a,n,o,o,"g"),Tr:M(a,n,o>>1,o>>1,"g")},n.d3d&&(R.Gb=M(a,n,o,o,"b"),R.Gbr=M(a,n,o>>1,o>>1,"b")),n.pool.set(o,R));const Ue=M(a,n,o,o,"f"),Xe=M(a,n,o,o,"b"),je=M(a,n,o>>1,o>>1,"f"),Ye=M(a,n,o>>1,o>>1,"f"),Ke=M(a,n,128,128,"f"),Ie=M(a,n,o,o,"b"),kt=900+(ne==="Snow Falling"?1400:0);let Ve=1e9,Je=1e9,Qe=1e9,Ze=1e9,$e=1e9;const Pt=p.tan||ge,At=B.end;function et(t,s){const r=e.view||tt,c=p.yaw+(r.yaw||0),u=p.pitch+(r.pitch||0),x=p.ex+(r.x||0),l=p.ey+(r.y||0),m=p.ez+(r.z||0),T=c!==Ve||u!==Je||x!==Qe||l!==$e||m!==Ze;T&&(Ve=c,Je=u,Qe=x,$e=l,Ze=m);const q=Math.cos(u),W=Math.sin(u),k=Math.cos(c),U=Math.sin(c),le=[U*q,W,k*q],de=[-k,0,U],te=[U*-W,q,k*-W];d[0]=x,d[1]=l,d[2]=m,d[3]=t,z(1,le[0],le[1],le[2],Pt),d[8]=de[0],d[9]=de[1],d[10]=de[2],z(3,te[0],te[1],te[2],o),d[12*4]=Re(1-(1-At)*Math.min(t/240,1),0,1),a.disable(a.SCISSOR_TEST);const C=[[0,n.tN,!0],[1,Rt.tex],[8,We],[9,n.bk],[10,null]];if(T){d[2*4+3]=0;const we=n.d3d?S.m:S.g;_([...C,[2,null],[3,null]]),L(we,R.T.fb,o,o),a.drawArrays(a.TRIANGLES,0,3),_([...C,[2,R.T.tex],[3,null]]),d[2*4+3]=1,L(we,R.Tr.fb,o>>1,o>>1),a.drawArrays(a.TRIANGLES,0,3);const ae=[...C,[2,R.T.tex],[3,R.Tr.tex]];if(_(ae),n.d3d){for(const V of[S.ga,S.gb])d[2*4+3]=0,L(V,R.Gb.fb,o,o),a.drawArrays(a.TRIANGLES,0,3);for(const V of[S.ga,S.gb])d[2*4+3]=1,L(V,R.Gbr.fb,o>>1,o>>1),a.drawArrays(a.TRIANGLES,0,3)}_([[10,n.d3d?R.Gb.tex:R.T.tex]]);const oe=n.d3d?[S.sa,S.sb]:[S.s];for(const V of oe)d[2*4+3]=0,L(V,Ue.fb,o,o),a.drawArrays(a.TRIANGLES,0,3);d[2*4+3]=1,L(oe[0],Xe.fb,o,o),a.drawArrays(a.TRIANGLES,0,3),_([[10,n.d3d?R.Gbr.tex:R.Tr.tex]]);for(const V of oe)d[2*4+3]=2,L(V,je.fb,o>>1,o>>1),a.drawArrays(a.TRIANGLES,0,3);_([[10,null]]),_([...ae,[6,je.tex]]),d[2*4+3]=1,L(S.l,Ye.fb,o>>1,o>>1),a.drawArrays(a.TRIANGLES,0,3),_([...ae,[4,Ue.tex]]),d[2*4+3]=0,L(S.l,Ke.fb,128,128),a.drawArrays(a.TRIANGLES,0,3),d[2*4+3]=0}_([...C,[4,Ue.tex],[5,Xe.tex],[6,Ye.tex],[7,Ke.tex],[2,R.T.tex]]),d[2*4+3]=0,L(S.c,Ie.fb,o,o),a.drawArrays(a.TRIANGLES,0,3),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),_([...C,[4,R.T.tex]]),L(S.p,Ie.fb,o,o),a.drawArrays(a.POINTS,0,kt),a.disable(a.BLEND),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,Ie.tex),d[2*4+3]=3,L(S.l,null,o,o),a.drawArrays(a.TRIANGLES,0,3),a.bindVertexArray(null)}return et(0,0),et}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
