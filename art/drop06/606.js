// Flooded Cistern: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/606.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Fe){Fe&&function(){"use strict";const Je={yaw:0,pitch:0,x:0,y:0,z:0},$e=0,ge=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,et="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",qe=`
uniform vec4 uP[20];
uniform sampler2D uD;
uniform sampler3D uN;
#ifdef GTW
out uvec4 oU;
#else
out vec4 oC;
#endif
#define CS uP[4].x
#define HS uP[4].y
#define VR uP[4].z
#define DP uP[4].w
#define XW uP[5].x
#define WH uP[5].y
#define DK uP[5].z
#define TH uP[5].w
#define LC uP[6].rgb
#define SIG uP[7].x
#define REACH uP[7].y
#define LY uP[15].x
#define TT uP[15].y
#define YM uP[15].z
#define NI int(uP[15].w)
#define AW .62
#define AD .15
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)*.0625)
vec4 cl(ivec2 c,int k){return texelFetch(uD,ivec2((c.x&63)*4+k,c.y&63),0);}
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float sat(float x){return clamp(x,0.,1.);}
// column centre (shear with height is applied by the caller)
vec2 colC(ivec2 c,vec4 a){return vec2(c)*CS+(a.rg-.5)*.3;}
float colR(vec4 a){return (.26+.22*a.b)*(TT>.5?.7:1.);}
vec3 lampP(ivec2 c,vec4 a,vec4 b){float an=b.g*6.2832;float r=colR(a)+.38;vec2 x=colC(c,a)+vec2(cos(an),sin(an))*r;return vec3(x.x,LY,x.y);}
`,tt=qe+`
// the column's kind: K = (capital order, base kind, pedestal, drum joint height), all from its data
// profile at height y over the floor: x = radius, y = how square the section is (0 round, 1 square)
vec2 prof(float y,float rs,vec4 K){
  float H=HS+DP,yI=H-.46,yA=yI-.11,ck=K.x;
  // the orders as a table: Corinthian, Ionic, plain block, Doric: (height, flare, its power, abacus)
  float o1=step(.55,ck),o2=step(.72,ck),o3=step(.9,ck);
  vec4 cp=mix(mix(mix(vec4(.74,.36,1.5,1.62),vec4(.34,.44,1.2,1.5),o1),vec4(.56,.5,2.,1.42),o2),vec4(.24,.45,.5,1.52),o3);
  float yC=yA-cp.x,u=sat((y-yC)/cp.x);
  float pb=K.y<.45?0.:K.y<.75?.5:.9+K.z*.7;
  vec2 r=vec2(rs,0.);
  // (the abacus, the impost and the pedestal are blocks of their own in colD, so their faces are true)
  if(y>yC)r=vec2(rs*(1.03+cp.y*pow(u,cp.z)+.09*(1.-o1)*(smoothstep(.22,.44,u)*smoothstep(.58,.44,u)+smoothstep(.66,.84,u)*smoothstep(1.,.84,u))),mix(smoothstep(.72,1.,u)*.75,u,o1)*(1.-o3));
  else if(y<pb+.3){u=(y-pb)/.3;r.x=rs*(1.+.24*smoothstep(.5,.05,u)+.11*smoothstep(.9,.68,u)*smoothstep(.5,.68,u));}
  else{
    r.x=rs*(1.-.05*sat((y-pb)/(yC-pb))+.07*smoothstep(.035,.0,abs(y-yC+.07)));
    // two-tier halls: the lower shaft's capital, a stone collar, the upper shaft's base
    float v=y-YM;
    if(TT>.5&&abs(v)<.42)r=v<-.12?vec2(rs*(1.+.4*smoothstep(-.42,-.12,v)),smoothstep(-.3,-.12,v)):v<.14?vec2(rs*1.48,1.):vec2(rs*(1.+.16*smoothstep(.34,.18,v)),0.);
  }
  return r;
}
float colD(vec2 q,float y,float rs,vec4 K,vec2 sh){
  float H=HS+DP;
  if(y>K.w)q-=sh;
  vec2 pr=prof(y,rs,K);
  if(K.x>=.55&&K.x<.72&&y>H-.91&&y<H-.46)q.x*=.8;
  vec2 a=abs(q);float rd=length(q),sq=max(a.x,a.y),s93=mix(rd,sq,.93),yI=H-.46,yA=yI-.11;
  float o1=step(.55,K.x),o2=step(.72,K.x),o3=step(.9,K.x),cw=mix(mix(mix(1.62,1.5,o1),1.42,o2),1.52,o3);
  float dd=max(mix(rd,sq,pr.y)-pr.x,y-yA-.01);
  dd=min(dd,max(max(s93-(rs*1.18+.16)*(.9+.1*sat((y-yI)/.46)),y-H),yI-y));
  dd=min(dd,max(max(s93-rs*cw,y-yI),yA-y));
  float pb=K.y<.45?-1.:K.y<.75?.5:.9+K.z*.7;
  return min(dd,max(mix(rd,sq,.92)-rs*1.34,y-pb));
}
int gV;
float vaultHit(vec3 o,vec3 d,float tm){
  if(d.y<=.0015)return 1e9;
  float ts=max((HS-o.y)/d.y,0.);
  if(ts>=tm)return 1e9;
  vec3 q=o+d*ts;vec2 di=d.xz+vec2(1e-6);
  vec2 b=floor(q.xz/CS),st=sign(di),dd=CS/abs(di);
  vec2 tn=((b+max(st,vec2(0.)))*CS-q.xz)/di;
  float VA=VR-AD,ab=CS*.5-AW;
  for(int i=0;i<NI-10;i++){
    vec2 cen=(b+.5)*CS;vec3 p=q-vec3(cen.x,HS,cen.y);
    float a1=d.y*d.y+d.z*d.z,b1=p.y*d.y+p.z*d.z,c1=p.y*p.y+p.z*p.z;
    float a2=d.y*d.y+d.x*d.x,b2=p.y*d.y+p.x*d.x,c2=p.y*p.y+p.x*p.x;
    float tA=(-b1+sqrt(max(b1*b1-a1*(c1-VR*VR),0.)))/a1,tB=(-b2+sqrt(max(b2*b2-a2*(c2-VR*VR),0.)))/a2;
    // the arches: over each line of columns the soffit drops by a ring of brick
    float tA2=(-b1+sqrt(max(b1*b1-a1*(c1-VA*VA),0.)))/a1,tB2=(-b2+sqrt(max(b2*b2-a2*(c2-VA*VA),0.)))/a2;
    int kA=0,kB=0;
    if(abs(p.x+d.x*tA2)>ab){tA=tA2;kA=2;}
    if(abs(p.z+d.z*tB2)>ab){tB=tB2;kB=2;}
    float t=max(tA,tB),nx=min(tn.x,tn.y);
    if(t<nx){gV=tA>tB?1+kA:2+kB;return ts+t;}
    if(tn.x<tn.y){b.x+=st.x;tn.x+=dd.x;}else{b.y+=st.y;tn.y+=dd.y;}
  }
  return 1e9;
}
int gW;vec3 gWN;
float walkHit(vec3 o,vec3 d){
  float best=1e9;gW=0;
  vec3 di=d+vec3(1e-6);
  vec3 ti=(vec3(XW-WH,DK-.12,-1e4)-o)/di,tj=(vec3(XW+WH,DK,1e4)-o)/di,a=min(ti,tj),b=max(ti,tj);
  float t0=max(max(a.x,a.y),a.z),t1=min(min(b.x,b.y),b.z);
  if(t1>=t0&&t0>0.){best=t0;gW=1;gWN=t0==a.y?vec3(0.,-sign(d.y),0.):t0==a.x?vec3(-sign(d.x),0.,0.):vec3(0.,0.,-sign(d.z));}
  for(int i=0;i<NI/12;i++){
    float xr=XW+(i==0?-1.:1.)*(WH-.05);
    // square posts every 2.1 m
    float tp=(xr-o.x)/di.x;float zc=floor((o.z+d.z*tp)/2.1+.5)*2.1;
    vec3 u1=(vec3(xr-.022,DK,zc-.022)-o)/di,u2=(vec3(xr+.022,DK+1.05,zc+.022)-o)/di,mn=min(u1,u2),mx=max(u1,u2);
    float ta=max(max(mn.x,mn.y),mn.z),tb=min(min(mx.x,mx.y),mx.z);
    if(tb>=ta&&ta>.02&&ta<best){best=ta;gW=2;gWN=ta==mn.x?vec3(-sign(d.x),0.,0.):ta==mn.z?vec3(0.,0.,-sign(d.z)):vec3(0.,1.,0.);}
    // the hand rail and a lower rail
    vec2 p=o.xy-vec2(xr,DK+1.06);float aa=dot(d.xy,d.xy),bb=dot(p,d.xy),h=bb*bb-aa*(dot(p,p)-.00018);
    if(h>0.){float t=(-bb-sqrt(h))/aa;if(t>.02&&t<best){best=t;gW=3;gWN=vec3((p+d.xy*t)/.0134,0);}}
  }
  return best;
}
void main(){
  vec2 ndc=(gl_FragCoord.xy+uP[12].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){
    d.y=-min(d.y,-.0035);o.y=-o.y;d=normalize(d);
    t0=-o.y/d.y;
  }
  float tw=(m<.5&&d.y<-1e-4)?-o.y/d.y:1e9;
  float tEnd=min(4000.,tw);
  gV=0;
  float tv=vaultHit(o,d,tEnd);
  if(tv<tEnd)tEnd=tv;else gV=0;
  float tk=walkHit(o,d);
  int kw=gW;
  if(tk<tEnd){tEnd=tk;gV=0;}else kw=0;
  vec2 di=d.xz+vec2(1e-6);
  vec3 p0=o+d*t0;
  vec2 b=floor(p0.xz/CS+.5),st=sign(di),dd=CS/abs(di);
  vec2 tn=((b+.5*st)*CS-o.xz)/di;
  float tSeg=t0,tHit=-1.,tau=SIG*t0*.8;
  float acc=0.;
  bool lh=false;vec3 cN=vec3(0,1,0),hN=vec3(0,1,0);
  float haze=uP[6].w;
  for(int i=0;i<NI*3;i++){
    float nx=min(tn.x,tn.y),e=min(nx,tEnd),tCol=1e9;
    ivec2 c=ivec2(b);
    vec4 a=cl(c,0),be=cl(c,1),ee=cl(c,2),ff=cl(c,3);
    float rs=colR(a);
    vec2 cen=colC(c,a);
    // this column's kind, its drum joint and the joint's shift
    vec4 K=vec4(be.r,ee.a,ff.g,ee.b>.5?mix(1.5,HS+DP-2.4,fract(ee.b*3.7)):99.);
    vec2 sh=ee.b>.5?vec2(cos(ff.b*6.2832),sin(ff.b*6.2832))*(.02+.03*fract(ee.b*7.3)):vec2(0.);
    // the column: bounding circle in sheared space, then a short march on the profile
    vec2 tilt=(ee.rg-.5)*.03;
    vec2 q0=o.xz-cen-tilt*o.y,dq=d.xz-tilt*d.y;
    float aa=dot(dq,dq),bb=dot(q0,dq),rb=rs*1.7+.3,cc=dot(q0,q0)-rb*rb,h=bb*bb-aa*cc;
    if(h>0.&&aa>1e-9){
      h=sqrt(h);float t1=(-bb-h)/aa,t2=(-bb+h)/aa;
      float tc=max(t1,tSeg);t2=min(t2,e);
      float sd=1.;int nk=-1;vec3 g=vec3(0),pp=vec3(0);
      // march to the surface, then the same call gives the normal from four taps round the hit
      if(tc<t2)for(int k=0;k<NI+4;k++){
        vec3 e4=.5773*(2.*vec3(float(((nk+3)>>1)&1),float((nk>>1)&1),float(nk&1))-1.);
        vec3 p=nk<0?o+d*tc:pp+e4*.004;
        float v=colD(p.xz-cen-tilt*p.y,p.y+DP,rs,K,sh);
        if(nk<0){sd=v;if(sd<.0018*tc){tCol=tc;pp=p;nk=0;}else{tc+=sd*.66;if(tc>=t2)break;}}
        else{g+=e4*v;nk++;if(nk>3)break;}
      }
      if(tCol>1e8&&sd<.07&&tc<t2){tCol=tc;vec2 q=o.xz+d.xz*tc-cen;g=vec3(q.x,0.,q.y);}
      cN=normalize(g+vec3(1e-9));
    }
    // the lamp at the column's foot: a small dark hood with a hot lens; its glow is tight in the damp air
    vec3 L=vec3(0);float bl=0.,c2=1e9;
    if(a.a>.01){L=lampP(c,a,be);vec3 ol=L-o;bl=dot(ol,d);vec3 cr=ol-d*bl;c2=dot(cr,cr);
      if(c2<.0036&&LY>0.){float tl=bl-sqrt(.0036-c2);if(tl>tSeg&&tl<min(e,tCol)){tCol=tl;lh=true;}}}
    float end=min(e,tCol);
    float seg=max(end-tSeg,0.);
    vec3 pm=o+d*min(.5*(tSeg+end),120.);float dn=NS(pm*vec3(1,2.,1),7.);float dens=SIG*(.45+1.1*dn);
    float tm=.5*(tSeg+end);
    acc+=haze*(.5+.9*dn)*dens*seg*exp(-tau-.5*dens*seg)*exp(-tm*uP[7].y);
    if(a.a>.01&&LY>0.){
      float r2=CS*.5-colR(a)-.54;r2=r2*r2;
      if(c2<r2){
        float s2=c2+.012,s=sqrt(s2);
        float integ=(atan((end-bl)/s)-atan((tSeg-bl)/s))/s;
        float w=(1.-c2/r2);w=w*w;
        // the hood sends the light up the shaft: the air glows in the beam above the lamp, hardly round it
        vec2 tc=normalize(colC(c,a)-L.xz);vec3 pc=o+d*bl-L;
        w*=.12+.88*smoothstep(-.15,.75,dot(pc,normalize(vec3(tc.x*.4,1.,tc.y*.4)))*inversesqrt(dot(pc,pc)+.004));
        float s0=sqrt(c2+.0006);float core=(atan((end-bl)/s0)-atan((tSeg-bl)/s0))/s0;
        acc+=a.a*(integ*uP[11].z*.6+core*.0018)*w*exp(-SIG*max(bl,0.)*.95)*exp(-max(bl,0.)*REACH*.6)*smoothstep(.6,3.,bl);
      }
    }
    tau+=dens*seg;
    if(tCol<1e8){tHit=tCol;hN=cN;break;}
    if(nx>=tEnd)break;
    tSeg=nx;
    if(tn.x<tn.y){b.x+=st.x;tn.x+=dd.x;}else{b.y+=st.y;tn.y+=dd.y;}
  }
  float tFar=tHit>0.?tHit:tEnd;
  if(tHit<0.&&tEnd-tSeg>.5)tau+=SIG*(tEnd-tSeg);
  float code=tHit>0.?(lh?9.:1.):gV>0?1.+float(gV):kw>0?5.+float(kw):(tw<1e8&&tFar>=tw-1e-3)?10.:0.;
  float T=exp(-tau)*exp(-tFar*REACH*.55),Ah=acc/(1.+acc);
  // one target: the distance, and the hit's kind, the light let through and the glow of the air packed in one float
#ifdef GTW
  oU=floatBitsToUint(vec4(tFar,code*1048576.+floor(T*255.+.5)*4096.+floor(Ah*4095.+.5),hN.x,hN.z+(hN.y<0.?4.:0.)));
#else
  oC=vec4(tFar,code*1048576.+floor(T*255.+.5)*4096.+floor(Ah*4095.+.5),hN.x,hN.z+(hN.y<0.?4.:0.));
#endif
}
`,De=qe+`
float at2(float y,float x){float a=atan(y/(abs(x)+1e-5));return x<0.?(y<0.?-3.14159-a:3.14159-a):a;}
// the lamps near p: diffuse light, and in gSp each lamp's own image in a wet or polished surface (v: the view ray)
vec3 gSp;
vec3 lamps(vec3 p,vec3 n,float wrap,float fall,vec3 v,float gl,ivec2 sk){
  vec3 s=vec3(0);gSp=vec3(0);ivec2 c0=ivec2(floor(p.xz/CS+.5));
  int nl=NI/24;
  for(int j=-nl;j<=nl;j++)for(int i=-nl;i<=nl;i++){
    ivec2 c=c0+ivec2(i,j);vec4 a=cl(c,0);
    // (a shaft's own lamp lights it through its fan alone)
    if(a.a>.01&&c!=sk){vec3 L=lampP(c,a,cl(c,1))-p;float d2=dot(L,L);vec3 l=L*inversesqrt(d2);float dl=dot(n,l),nl=(dl+wrap)/(1.+wrap);
      float e=a.a/(d2+.22);
      s+=e*max(nl,0.);
      // and the bounce from its lit fan a man's height up its shaft, which lets an unlit neighbour be read
      vec3 Lb=L+vec3(0.,1.7,0.);float db=dot(Lb,Lb);
      s+=a.a*.45*max(dot(n,Lb)*inversesqrt(db)+.25,0.)/(db+1.5);
      gSp+=e*pow(max(dot(n,normalize(l-v)),0.),gl)*sat(dl*4.);}
  }
  float fo=exp(-max(p.y-.4,0.)*fall);
  s*=LC*fo;gSp*=LC*fo;
  // a shaft of daylight from an opening in the vault (rare)
  // (and the bright patch where it lands throws its light back up onto the nearest shafts)
  if(uP[14].w>0.){vec3 v=p-uP[13].xyz;float al=dot(v,uP[14].xyz);vec3 pr=v-uP[14].xyz*al;
    s+=vec3(.6,.76,1.)*uP[14].w*smoothstep(1.,.15,length(pr)/(uP[13].w*(.7+.045*al)))*max(dot(n,-uP[14].xyz)+.15,0.)*2.;
    vec3 Lw=uP[18].xyz+vec3(0.,.15,0.)-p;float dw=dot(Lw,Lw);
    s+=vec3(.6,.76,1.)*uP[14].w*1.6*max(dot(n,Lw)*inversesqrt(dw),0.)/(dw+1.2);}
  return s;
}
// the shade is two programs that compile side by side: PC 1 the columns and lamps, PC 0 the rest and the air
#if PC
vec3 shadeCol(vec3 p,float t,ivec2 c,vec4 a,vec4 b,vec4 f,vec4 K,float rs,vec2 q,vec3 n,vec3 E,vec3 d){
  float y=p.y,H=HS+DP,yf=y+DP,ck=K.x;
  float o1=step(.55,ck),o2=step(.72,ck),o3=step(.9,ck);
  float cH=mix(mix(mix(.74,.34,o1),.56,o2),.24,o3),yA=H-.57,yC=yA-cH;
  float pb=K.y<.45?0.:K.y<.75?.5:.9+K.z*.7;
  vec2 qn=normalize(n.xz+vec2(1e-4));
  float ang=at2(q.y,q.x);
  float isCap=step(yC,yf),shaft=(1.-isCap)*step(pb+.3,yf)*(TT>.5?step(.42,abs(yf-YM)):1.);
  n.xz+=qn.yx*vec2(1,-1)*sin(ang*12.)*.3*step(.82,b.b)*shaft;
  vec2 su=vec2(ang*rs,yf);
  // stone: this shaft's marble, or a grey granite one; bands run level or slanting across it, never up it
  float gran=step(f.a,.13)*shaft;
  vec3 st=mix(mix(uP[8].rgb,uP[9].rgb,step(.8,b.a)),vec3(.4,.39,.4),gran)*(.8+.4*b.a);
  float mic=NS(p*vec3(1,.6,1),.11);
  float bw=(yf+dot(q,vec2(cos(f.a*40.),sin(f.a*40.)))*(f.a*1.2-.6))*1.4+1.7*NS(p*vec3(1.,.4,1.)+b.a*7.,1.3);
  // broad soft bands a hand to a forearm wide, blue-grey in the white; a faint fine vein between
  float vl=fract(bw),vl2=fract(bw*3.3+.8*mic),nf=sat(1.6-t/7.);
  float vein=max(smoothstep(.3,.04,min(vl,1.-vl)),.35*nf*smoothstep(.04,.008,min(vl2,1.-vl2)))*uP[8].w*(1.-gran);
  vec3 alb=st*(.86+.26*n3(vec3(floor(bw)*.37,b.a,.5)))*(.92+.16*mic);
  // rose granite is speckled with black and white crystal; limewash is thin here and there and the stone shows
  float sm=uP[16].w,sk=n3(p*4.3+b.a);
  alb*=1.+step(.5,sm)*step(sm,1.5)*(.5*smoothstep(.6,.68,sk)-.55*smoothstep(.4,.32,sk))*(1.-gran);
  alb=mix(alb,vec3(.42,.3,.24),step(2.5,sm)*smoothstep(.5,.72,NS(p*vec3(1.,.5,1.)+b.a,.5))*.55*(1.-gran));
  alb=mix(alb,alb*uP[16].rgb,vein);
  // the worked skin, in relief so the lamp below shades it: claw-chisel strokes, pits, a rough grain (near only)
  float ch=sin(yf*150.+9.*NS(vec3(su*vec2(2.,.5),b.a*5.),.2)),pit=smoothstep(.68,.76,n3(p*3.1+b.a*3.))*nf;
  vec3 rg=vec3(n3(p*2.3+.31),0.,n3(p*2.3+.77))-.5;
  n=normalize(n+(vec3(0.,.07*cos(yf*150.)*smoothstep(.2,1.,ch),0.)+rg*.5+vec3(0.,-.5,0.)*pit)*nf*nf*shaft);
  alb*=(1.-.04*smoothstep(.4,1.,ch)*nf*nf*shaft)*(1.-.3*pit);
  // drum joint: a dark gap a finger wide, its lips broken in shell-shaped chips of every size
  float cw=.006+.02*smoothstep(.45,.85,n3(vec3(su.x*1.9,K.w,b.a*7.)))+.008*smoothstep(.5,.8,n3(vec3(su.x*6.,K.w*2.,b.a)));
  float jd=abs(yf-K.w),jt=smoothstep(cw,cw*.4,jd);
  alb=mix(alb,vec3(.06,.055,.05),jt*.9);
  n=normalize(n+vec3(0.,-.7*sign(yf-K.w),0.)*smoothstep(cw*2.2,cw,jd)*(1.-jt));
  // rust from an old clamp, broken by the stone; a long crack on some shafts
  float ra=ang-f.b*6.2832;ra=abs(ra-6.2832*floor(ra/6.2832+.5))*rs;
  alb=mix(alb,vec3(.3,.17,.09),sat(exp(-ra*ra/.0005)*smoothstep(K.w+.03,K.w-.06,yf)*smoothstep(K.w-1.2,K.w,yf)*smoothstep(.35,.65,mic))*.45);
  float ca=abs(ra-rs*(.35+yf*.09+.025*sin(yf*5.)+.01*sin(yf*19.)+.012*(mic-.5)));
  alb*=1.-.35*smoothstep(.0025+t*.0014,.0005,ca)*step(.55,f.g)*smoothstep(.9,.5,abs(yf-K.w+.5))*shaft;
  // drip tracks from the vault, narrow and dark
  alb*=1.-.28*smoothstep(.62,.85,n3(vec3(su.x*1.7,yf*.05,b.a*3.)))*smoothstep(H-.8,H-3.,yf);
  alb=mix(alb,vec3(.74,.72,.64),smoothstep(.7,.86,n3(vec3(su.x*1.7+.5,yf*.04,b.a*3.+.3)))*smoothstep(H-4.5,H-.9,yf)*.5*shaft);
  // the rare carved shaft: rows of tear-shaped eyes
  if(f.r>.5&&shaft>.5){
    vec2 hc=vec2(ang/6.2832*floor(6.2832*rs/.17),yf/.23);hc.x+=.5*floor(hc.y);
    vec2 hl=fract(hc)-.5;
    float td=length(vec2(hl.x,(hl.y+.1)*.95))-(.27-.6*max(hl.y+.06,0.));
    alb*=(1.+.14*step(td,0.))*(1.-.6*smoothstep(.05,.0,abs(td)))*(1.-.45*smoothstep(.02,.0,abs(length(hl-vec2(0.,-.1))-.06)));
    n.xz+=qn*.4*smoothstep(.05,.0,abs(td))*sign(td);
  }
  // Corinthian capitals: acanthus in two rings with drilled shadows, scrolls at the corners
  float tip=0.;
  if(isCap*(1.-o1)>.5&&yf<yA){
    float u=sat((yf-yC)/cH),s8=ang*1.2732;
    vec2 L1=vec2(fract(s8)-.5,u/.58),L2=vec2(fract(s8+.5)-.5,(u-.3)/.56);
    vec2 w=.46*sin(3.1416*pow(clamp(vec2(L1.y,L2.y),0.,1.),vec2(.7)))*(1.+.22*sin(vec2(L1.y,L2.y)*24.));
    float m1=smoothstep(.03,-.03,abs(L1.x)-w.x)*step(0.,L1.y)*step(L1.y,1.),m2=smoothstep(.03,-.03,abs(L2.x)-w.y)*step(0.,L2.y)*step(L2.y,1.);
    vec2 L=m1>.5?L1:L2;float lm=max(m1,m2);
    tip=smoothstep(.72,1.,L.y)*lm;
    float vr=length(vec2(abs(fract(ang*.6366+.5)-.5)*5.,(u-.86)*6.)),vol=step(vr,.9)*smoothstep(.75,1.,u);
    alb*=mix(.3,1.08,max(lm,vol))*(1.-.4*smoothstep(.04,.0,abs(L.x))*lm)*(1.-.5*vol*smoothstep(.25,.0,abs(fract(vr*2.6)-.5)-.12));
    n.xz+=qn*(lm-.5)*.5;n.y-=tip*.7;
  }
  // square stones (block capital, abacus, impost, pedestal): a drafted margin round each face, a pitched field,
  // chamfered corners broken here and there
  float pe=step(yf,pb),sqP=max(max(step(yA,yf),isCap*o2*(1.-o3)),pe);
  if(sqP>.5){
    vec2 aq=abs(q);float ce=max(aq.x,aq.y)-min(aq.x,aq.y);
    vec2 lh=yf>H-.46?vec2(H-.46,H):yf>yA?vec2(yA,H-.46):pe>.5?vec2(-9.,pb):vec2(yC,yA);
    float dE=min(yf-lh.x,lh.y-yf),mg=max(smoothstep(.055,.035,ce),smoothstep(.05,.032,dE));
    float chip=smoothstep(.62,.72,n3(p*1.3+b.a*5.))*smoothstep(.07,.0,min(ce,dE*1.4));
    alb*=mix(.86+.12*mic,1.05,mg)*(1.-.45*chip)*(1.-.2*smoothstep(.012,.0,abs(ce-.045))*nf);
    n.xz=mix(n.xz,sign(q)*.7071,smoothstep(.022,.0,ce)*.6);
    n.y-=smoothstep(.02,.0,dE)*.5*sign(yf-.5*(lh.x+lh.y));
    n=normalize(n);
  }
  // lime from the vault on the impost; the damp line: dark and wet below it, a lime crust at its edge, algae
  float dn=NS(p*vec3(1.,2.5,1.)+2.,.3);
  alb=mix(alb,vec3(.7,.68,.6),smoothstep(H-.9,H,yf)*smoothstep(.45,.75,dn)*.6);
  float ty=TH+.1*(mic-.5)+(a.r-.5)*.12;
  float wet=smoothstep(ty+.08,ty-.28,y),damp=smoothstep(ty+1.5,ty,y);
  alb*=mix(1.,.55,damp)*mix(1.,.32,wet);
  alb=mix(alb,vec3(.78,.75,.68),sat(exp(-(y-ty)*(y-ty)/.0032)*(.55+.9*dn))*.62);
  alb=mix(alb,alb*vec3(.55,.75,.5),damp*smoothstep(.5,.7,dn)*.7);
  // light: near lamps, and the bounce from the lit water up the foot of the shaft
  E*=1.+uP[7].z*smoothstep(4.,.0,y);
  // this column's lamp: a shaped fan of light up the shaft, its edge scalloped by the beam
  vec3 Lp=lampP(c,a,b);
  vec2 tc=normalize(colC(c,a)-Lp.xz);
  vec3 lv=p-Lp;float ld2=dot(lv,lv);vec3 ln=lv*inversesqrt(ld2);
  float cone=smoothstep(.74,.88,dot(ln,normalize(vec3(tc.x*.4,1.,tc.y*.4))));
  // the fan: gold at the foot, turning orange and red-brown as it climbs, gone before the capital
  float fh=sat((y-.15)/(3.4*uP[17].y));
  vec3 fan=a.a*LC*uP[9].w*uP[17].x*(cone+.04)*max(dot(n,-ln),0.)*4./(ld2+.3)*step(0.,LY)*vec3(1.,1.-.32*fh,1.-.6*fh);
  E+=fan*(1.+.3*(mic-.5)+2.*tip);
  E+=a.a*LC*smoothstep(yC-.6,H-.4,yf)*sat(-n.y*1.3+.3)*uP[9].w*.3;
  // capitals and imposts are lit from below: the underside is the brightest face, the top is lost
  E*=1.+isCap*(.9*sat(-n.y)-.55*sat(n.y));
  vec3 c0=alb*E*(.78+.22*mic)*.8+alb*LC*uP[7].w*(.5+.5*exp(-y*.7));
  // the glow of the hall behind rims both edges; the wet stone shows the nearest lamps as upright streaks
  float fr=1.-sat(dot(n,-d));
  c0+=alb*LC*uP[17].w*fr*fr*fr*fr*1.8*(.35+.65*smoothstep(9.,1.,y));
  c0+=gSp*(.12+.45*wet)*(.6+.4*mic)*(1.-.6*gran);
  // the water line: a hair of light where the stone stands in the water
  c0+=(E+LC*.15)*.3*smoothstep(.035,.004,abs(y-.012));
  return c0;
}
#else
vec3 vaultN(vec3 p,int id){
  vec2 b=floor(p.xz/CS),cen=(b+.5)*CS;vec3 r=vec3(p.x-cen.x,p.y-HS,p.z-cen.y);
  return (id&1)==1?-normalize(vec3(0,r.y,r.z)):-normalize(vec3(r.x,r.y,0));
}
float gPd=0.;
vec3 shadeVault(vec3 p,float t,int id,vec3 E0){
  vec2 b=floor(p.xz/CS);vec2 cen=(b+.5)*CS;
  vec3 r=vec3(p.x-cen.x,p.y-HS,p.z-cen.y);
  bool bA=(id&1)==1,arch=id>2;
  float ax=bA?r.x:r.z,arc=(bA?at2(r.z,r.y):at2(r.x,r.y))*VR;
  float side=arch?0.:step(CS*.5-AW,abs(ax));
  float fade=sat(1.4-t/(uP[3].w*.034));
  float fr,fb,row,bc;
  if(arch){
    // the arch: bricks set on edge, thin courses across the soffit, joints nearly as thick as the bricks
    float cr=arc/.078;row=floor(cr);fr=cr-row;
    float bx=(ax+.17*fract(row*.5))/.34;bc=floor(bx);fb=bx-bc;
  }else{
    // the bays: thin bricks in curving courses round the crown; at each groin the two webs' courses
    // interleave, every other course running through, in a herringbone seam
    vec2 ar=abs(r.xz);float r0=floor(max(ar.x,ar.y)/.075);
    bool wa=ar.x-ar.y+(mod(r0,2.)-.5)*.11>0.;
    float sq=wa?ar.x:ar.y,mn=wa?ar.y:ar.x;
    float cr=(sq+.22*mn*mn/CS)/.075;row=floor(cr);fr=cr-row;
    float bx=(mn+.15*fract(row*.5))/.3;bc=floor(bx);fb=bx-bc;
  }
  float mortar=max(smoothstep(.52,.62,fr)*smoothstep(1.,.93,fr),smoothstep(.08,.0,min(fb,1.-fb)))*fade;
  float hb=mix(.5,h21(vec2(bc,row)+vec2(float(id),b.x*3.+b.y*7.)),fade);
  vec3 alb=uP[10].rgb*(.62+.8*hb)*vec3(1.+.14*(hb-.5),1.,1.-.2*(hb-.5));
  // lime mortar, paler than the brick and nearly as thick
  alb=mix(alb,vec3(.5,.45,.38),mortar*.85);
  // lime stains and mineral streaks follow the fall line; black damp at the crowns
  vec3 lp=vec3(ax*3.5+b.x*5.1,arc*.65+b.y*3.3,1.7);
  float st=NS(lp,1.9),st2=NS(lp*vec3(1.6,.5,1)+3.,.6);
  alb=mix(alb,vec3(.68,.66,.58),smoothstep(.56,.74,st*.62+st2*.48)*uP[10].w*.75);
  float crown=1.-sat((-r.y)/VR*1.6);
  alb*=mix(1.,.45,smoothstep(.62,.38,NS(vec3(p.x*.6,arc*.6,p.z*.6),3.2))*(.4+.6*crown));
  alb*=.8+.4*NS(vec3(p.xz*1.4,arc*2.),.5);
  // green where the drips start
  alb=mix(alb,alb*vec3(.6,.85,.55),smoothstep(.6,.75,st2)*.5);
  vec3 E=E0*uP[11].x;
  float h=sat((p.y-HS)/VR);
  // lit only by what climbs the shafts: warm at the springing, dark in the crown; arch rings catch it on their lower edge
  E*=mix(1.4,.3,smoothstep(.05,.9,h))*(arch?1.7:1.)*(1.-.6*side);
  vec3 c0=alb*E+alb*LC*uP[11].y*(.6+.4*h);
  // the rare opening to the day: a blown-out square of sky in its lit brick reveal
  if(uP[14].w>0.){vec2 oq=abs(p.xz-uP[13].xz-uP[14].xz*(p.y-HS)/uP[14].y);float om=max(oq.x,oq.y)/uP[13].w;
    c0=mix(c0,vec3(.8,.9,1.)*uP[14].w*2.2,smoothstep(.62,.55,om))+alb*vec3(.6,.76,1.)*uP[14].w*.9*smoothstep(1.1,.6,om)*step(.55,om);}
  return c0;
}
// the lamps seen in a polished surface: where the mirrored ray comes down to the lamps' height, how near it passes each
float glint(vec3 p,vec3 r,float sz){
  if(r.y>-.02)return 0.;
  vec3 q=p+r*((LY-p.y)/r.y);
  ivec2 c0=ivec2(floor(q.xz/CS));
  float g=0.;
  for(int j=0;j<2;j++)for(int i=0;i<2;i++){ivec2 c=c0+ivec2(i,j);vec4 a=cl(c,0);
    if(a.a>.01){vec3 L=lampP(c,a,cl(c,1))-p;float t=max(dot(L,r),0.);vec3 e=L-r*t;g+=a.a*exp(-dot(e,e)/(sz*sz))/(1.+t*t*.004);}}
  return g;
}
vec3 shadeWalk(vec3 p,vec3 d,int kind,vec3 n,vec3 E0){
  if(kind==1){
    // wet timber boards across the walk: grain, gaps, worn tops shining under the lamps
    float cross=fract((p.z+1.)/.19);
    float gap=smoothstep(.0,.06,cross)*smoothstep(1.,.94,cross);
    float bId=floor((p.z+1.)/.19),hb=h21(vec2(bId,3.)),hb2=h21(vec2(bId,8.));
    float grain=n3(vec3(p.x*.6+bId*.37,bId*.13,cross*2.5));
    vec3 alb=vec3(.2,.14,.09)*(.6+.8*hb)*(.85+.3*grain);
    // feet have worn a darker, smoother path down the middle
    float wm=smoothstep(.6,.15,abs(p.x-XW)/WH);
    alb*=mix(1.,.7,wm)*mix(.05,1.,gap);
    // the low boards hold a thin puddle that mirrors a lamp
    float pud=step(.8,hb2)*smoothstep(.5,.62,n3(vec3(p.x*.9+bId*.31,cross*.4+bId*.17,.6)))*gap;gPd=pud;
    float fz=pow(sat(1.-abs(d.y)),4.);
    return alb*(E0*.3+LC*.05)*(1.-.5*pud)+gSp*(.015+.12*wm+1.1*pud)+fz*(.3+pud)*LC*.04;
  }
  vec3 alb=kind==3?vec3(.06,.05,.04):vec3(.06,.05,.042);
  // dark wet steel: each lamp it passes is its own small glint along it
  return alb*(E0*.6+LC*.04)+gSp*(kind==3?2.:.1)+(kind==3?LC*glint(p,reflect(d,n),.32)*.8:vec3(0));
}
#endif
#ifdef GU
uniform highp usampler2D uG;
#else
uniform sampler2D uG;
#endif
#ifdef E8
void mainS(){
#else
void main(){
#endif
  vec2 ndc=(gl_FragCoord.xy+uP[12].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){d.y=-min(d.y,-.0035);o.y=-o.y;d=normalize(d);t0=-o.y/d.y;}
#ifdef GU
  vec4 g=uintBitsToFloat(texelFetch(uG,ivec2(gl_FragCoord.xy),0));
#else
  vec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
#endif
  float tFar=g.r,code=floor(g.g/1048576.+1e-4),rem=g.g-code*1048576.,Tq=floor(rem/4096.+1e-4),Ah=(rem-Tq*4096.)/4095.;
  int id=int(code+.5);
#if PC
  if(id!=1&&id!=9){oC=vec4(0);return;}
  vec3 acc=vec3(0);
#else
  if(id==1||id==9)id=0;
  vec3 acc=LC*Ah/max(1.-Ah,1e-3);
#endif
  vec3 ph=o+d*tFar,sn=vec3(0,1,0),sp=ph;float wr=.15,fl=0.;
  // the hit's cell, and everything known about its column and lamp
  ivec2 hc=ivec2(floor(ph.xz/CS+.5));
  vec4 ha=cl(hc,0),hb=cl(hc,1),he=cl(hc,2),hf=cl(hc,3);
  float rs=colR(ha);vec2 tilt=(he.rg-.5)*.03,cen=colC(hc,ha);
  vec4 K=vec4(hb.r,he.a,hf.g,he.b>.5?mix(1.5,HS+DP-2.4,fract(he.b*3.7)):99.);
  vec2 sh=he.b>.5?vec2(cos(hf.b*6.2832),sin(hf.b*6.2832))*(.02+.03*fract(he.b*7.3)):vec2(0.);
  vec3 LL=lampP(hc,ha,hb),wn=vec3(0,1,0);float gl=26.;
  float xr=XW+sign(ph.x-XW)*(WH-.05);
  if(id==1){
    float nz=g.a>2.?g.a-4.:g.a;
    sn=normalize(vec3(g.b,(g.a>2.?-1.:1.)*sqrt(max(1.-g.b*g.b-nz*nz,0.)),nz));wr=.12;fl=.5;
  }else if(id==9){sn=normalize(ph-LL);wr=.18;fl=.3;}
#if PC==0
  else if(id>=2&&id<=5){sn=vaultN(ph,id-1);wr=.8;}
  else if(id==6){sp=ph+vec3(0,.3,0);wr=.5;gl=420.;}
  else if(id==7||id==8){
    if(id==8)wn=vec3(normalize(ph.xy-vec2(xr,DK+1.06)),0.);
    else if(ph.y<DK+1.015){vec2 lq=vec2(ph.x-xr,ph.z-floor(ph.z/2.1+.5)*2.1);wn=abs(lq.x)>abs(lq.y)?vec3(sign(lq.x),0.,0.):vec3(0.,0.,sign(lq.y));}
    sn=id==8?wn:normalize(wn+vec3(0,.3,0));wr=.3;gl=id==8?140.:20.;
  }else if(id==10)sp=ph+d*(DP/max(-d.y,.05));
#endif
  vec3 Eg=lamps(sp,sn,wr,fl,d,gl,id==1?hc:ivec2(-999));
  vec3 col=vec3(0);
#if PC
  if(id==9){
    vec2 tc=normalize(cen-LL.xz);
    float lens=smoothstep(.62,.86,dot(sn,normalize(vec3(tc.x*1.5,1.,tc.y*1.5))));
    col=mix(vec3(.022,.019,.016)+Eg*.02,LC*2.6*ha.a,lens);
  }else if(id==1){
    col=shadeCol(ph,tFar,hc,ha,hb,hf,K,rs,ph.xz-cen-tilt*ph.y,sn,Eg,d);
  }
  oC=vec4(col*Tq/255.*(m>.5?1.:uP[12].z),0.);
#else
  if(id>=2&&id<=5){
    col=shadeVault(ph,tFar,id-1,Eg);
  }else if(id>=6&&id<=8){
    col=shadeWalk(ph,d,id-5,wn,Eg);
  }else if(id==10){
    // under the surface: paving and silt lit by the lamps, seen through the water; reflection is added in the composite
    vec3 pf=sp;
    float sl=NS(vec3(pf.x,pf.z,1.),.9),sl2=NS(vec3(pf.x,pf.z,4.),.25);
    float jx=abs(fract(pf.x/.92+.5)-.5)*.92,jz=abs(fract(pf.z/1.31+.5)-.5)*1.31;
    vec3 alb=vec3(.36,.3,.22)*(.5+.8*sl)*(.75+.5*sl2)*(1.-.6*smoothstep(.025,.0,min(jx,jz)));
    alb=mix(alb,vec3(.2,.18,.12),smoothstep(.45,.7,sl2)*.6);
    col=alb*Eg*exp(-DP*3./max(-d.y,.06))*(1.+uP[11].w)*(1.-.04/max(-d.y,.05));
    // where the day lands, the water itself is lit
    if(uP[14].w>0.){vec2 lq=ph.xz-uP[18].xz;col+=vec3(.6,.76,1.)*uP[14].w*.35*exp(-dot(lq,lq)/(uP[18].w*uP[18].w));}
  }
  // the rare shaft of daylight: its beam in the damp air
  if(uP[14].w>0.){
    vec3 bd=uP[14].xyz,ob=o-uP[13].xyz;
    vec3 dp=d-bd*dot(d,bd),op=ob-bd*dot(ob,bd);
    float qa=dot(dp,dp),qb=dot(op,dp),qc=dot(op,op)-uP[13].w*uP[13].w,qh=qb*qb-qa*qc;
    float Rb=uP[13].w*1.9;qc=dot(op,op)-Rb*Rb;qh=qb*qb-qa*qc;
    if(qh>0.){qh=sqrt(qh);float ta=max((-qb-qh)/qa,t0),tb=min((-qb+qh)/qa,tFar);
      // a soft column, narrowest and brightest at the opening, widening as it falls, full of slow dust
      if(tb>ta){float tm=clamp(-qb/qa,ta,tb);vec3 pm=o+d*tm;float al=dot(pm-uP[13].xyz,bd);
        float rr=uP[13].w*(.55+.04*max(al,0.)),rm=dot(op+dp*tm,op+dp*tm)/(rr*rr);
        float ch=min(tb-ta,rr*1.4/sqrt(qa));
        acc+=vec3(.6,.76,1.)*uP[14].w*ch*SIG*4.*exp(-SIG*ta)*exp(-rm*1.8)*smoothstep(-.4,.6,al)*(1.25-.6*sat(al/HS))*(.55+.9*NS(pm*vec3(1.,.3,1.),.8));}}
  }
  vec3 c1=col*Tq/255.+acc*(m>.5?.38:1.);
  if(m>.5){oC=vec4(c1,tFar);return;}
  oC=vec4(c1*uP[12].z,(id==10?1.:id==6?max(gPd*.62,sat(acc.r*3.)*.48):sat(acc.r*3.)*.48)*uP[12].z);
#endif
}
#ifdef E8
uniform sampler2D uQ;
void main(){mainS();vec4 q=texelFetch(uQ,ivec2(gl_FragCoord.xy),0);q.rgb*=q.rgb;vec3 v=q.rgb/max(1.-q.rgb,1e-5)+max(oC.rgb,0.);oC=vec4(sqrt(v/(v+1.)),q.a+oC.a);}
#endif
`,at=`
uniform sampler2D uW,uD;uniform vec4 uS[3];
out vec4 oC;
vec4 cl(ivec2 c,int k){return texelFetch(uD,ivec2((c.x&63)*4+k,c.y&63),0);}
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uW,c,0);
  float hl=texelFetch(uW,c-ivec2(1,0),0).r,hr=texelFetch(uW,c+ivec2(1,0),0).r,hd=texelFetch(uW,c-ivec2(0,1),0).r,hu=texelFetch(uW,c+ivec2(0,1),0).r;
  float l=hl+hr+hd+hu-4.*s.r;
  float v=(s.g+.235*l)*.9968;
  float h=s.r+v;
  vec2 uv=(vec2(c)+.5)/uS[0].x;
  vec2 w=uv*uS[0].y+uS[0].zw;
  // two drops may land per step (drips from the vault, or a fish rising)
  for(int i=1;i<3;i++){vec2 q=w-uS[i].xy;float d2=dot(q,q);if(d2<.5)h-=uS[i].z*exp(-d2/.07);}
  // columns stand in the water; waves wrap around them
  float cs=uS[1].w;ivec2 ci=ivec2(floor(w/cs+.5));vec4 a=cl(ci,0);
  vec2 cn=vec2(ci)*cs+(a.rg-.5)*.3;
  float rr=(.26+.22*a.b)*uS[2].w+.08;
  if(dot(w-cn,w-cn)<rr*rr){h=0.;v=0.;}
  // the sim's edge dissolves
  vec2 e=min(uv,1.-uv);h*=smoothstep(0.,.06,min(e.x,e.y));
  oC=vec4(h,v,(hr-hl)*.5,(hu-hd)*.5);
}
`,ot=`
uniform vec4 uP[20];uniform vec4 uC[4];
uniform sampler2D uA,uR,uW;uniform sampler3D uN;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uC[0].y;
  vec4 a=texture(uA,uv);
#ifdef E8
  a.rgb*=a.rgb;a.rgb/=max(1.-a.rgb,1e-5);
#endif
  vec3 col=a.rgb;
  float t=uC[0].z;
  vec2 ndc=uv*2.-1.;
  float wat=smoothstep(.55,.95,a.a);
  if(wat>0.){
    vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
    vec3 o=uP[0].xyz;
    float tw=-o.y/min(d.y,-1e-3);
    vec3 P=o+d*tw;
    vec2 suv=(P.xz-uC[1].zw)/uC[1].y;
    vec4 w=texture(uW,suv);
    vec2 edge=min(suv,1.-suv);
    float inside=step(0.,min(edge.x,edge.y));
    vec2 gr=w.ba*inside*uC[2].x;gr/=1.+length(gr)*6.;
    // the barest surface movement everywhere, so distant water never sits as a flat mirror
    float dist=length(P-o);
    vec3 nq=vec3(P.x*.42,P.z*.42,t*.05);
    vec2 mic=vec2(textureLod(uN,nq,0.).r-.5,textureLod(uN,nq.yxz+.37,0.).r-.5)*(.006+.00035*dist*uC[2].y);
    vec3 n=normalize(vec3(-gr.x-mic.x,1.,-gr.y-mic.y));
    // bend the mirror image: project the point the reflected ray reaches
    vec3 r=reflect(d,n);
    vec3 Pt=P+r*14.;
    vec3 v=Pt-vec3(o.x,-o.y,o.z);v.y=-v.y;
    float fz=max(dot(v,uP[1].xyz),.1);
    vec2 uv2=vec2(dot(v,uP[2].xyz),dot(v,uP[3].xyz))/(fz*uP[1].w)*.5+.5;
    vec3 rc=texture(uR,uv2).rgb;
#ifdef E8
    rc*=rc;rc/=max(1.-rc,1e-5);
#endif
    // each lamp's image is drawn out into an upright streak, broken into dashes by the least ripple
    float sl=uC[1].x*(1.+3.*length(gr)),dash=smoothstep(.38,.62,textureLod(uN,vec3(P.x*.05,P.z*.45,t*.015),0.).r);
    vec3 hl=vec3(0);
#ifdef E8
    for(int i=-1;i<4;i++)if(i!=0){vec3 e=texture(uR,uv2+vec2(0.,float(i)*sl)).rgb;e*=e;hl+=max(e/max(1.-e,1e-5)-.5,0.)*(1.-abs(float(i))*.2);}
#else
    for(int i=-1;i<4;i++)if(i!=0)hl+=max(texture(uR,uv2+vec2(0.,float(i)*sl)).rgb-.5,0.)*(1.-abs(float(i))*.2);
#endif
    rc=(rc+hl*dash*.45)*smoothstep(175.,70.,dist);
    float F=uC[2].z+(1.-uC[2].z)*pow(1.-max(dot(-d,n),0.),3.)*.8;
    // drained: wet paving, a mirror only where puddles stand
    if(uC[3].x>0.)F*=mix(.12,1.,smoothstep(.5,.58,textureLod(uN,vec3(P.xz*.045,.31),0.).r));
    float hf=1.-exp(-dist*uC[0].w*2.2);
    col+=wat*rc*F*uC[2].w*(1.-hf*.6);
  }
  // exposure, soft shoulder, deep soft blacks, a still grain of a level or two
  col*=uC[0].x;
  col=col/(1.+col*.55)*1.28;
  col=pow(max(col,vec3(0.)),vec3(1./2.2));
  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)*.012;
  col=mix(col*col*(3.-2.*col),col,.65);
  oC=vec4(col,1.);
}
`;function st(a){if(a.__c606)return a.__c606;a.getExtension("KHR_parallel_shader_compile");const e=!!a.getExtension("EXT_color_buffer_float"),i=e||!!a.getExtension("EXT_color_buffer_half_float");a.getExtension("OES_texture_float_linear");const l=(d,T)=>{const g=a.createShader(d);return a.shaderSource(g,T),a.compileShader(g),g},q=l(a.VERTEX_SHADER,ge+et),b={},u=(d,T,g)=>{const X=l(a.FRAGMENT_SHADER,ge+T),J=g?l(a.VERTEX_SHADER,ge+g):q,L=a.createProgram();a.attachShader(L,J),a.attachShader(L,X),a.linkProgram(L),a.flush(),b[d]={p:L,v:J,f:X}},m=e?"":`#define GTW 1
`,_=e?"":i?`#define GU 1
`:`#define GU 1
#define E8 1
`,R=i?"":`#define E8 1
`;u("trace",m+tt),u("shadeC",_+`#define PC 1
`+De),u("shadeR",_+`#define PC 0
`+De),u("sim",at),u("comp",R+ot);let U=1617591054;const w=64,z=new Float32Array(w*w*w),A=new Float32Array(w*w*w);for(let d=0;d<z.length;d++){U=U+1831565813|0;let T=Math.imul(U^U>>>15,1|U);T=T+Math.imul(T^T>>>7,61|T)^T,z[d]=((T^T>>>14)>>>0)/4294967296}const ve=[.25,.5,.25],W=(d,T,g,X,J)=>{for(let L=0;L<w;L++)for(let D=0;D<w;D++)for(let k=0;k<w;k++){let $=0;for(let H=-1;H<=1;H++)$+=ve[H+1]*d[(k+H*g&63)+64*((D+H*X&63)+64*(L+H*J&63))];T[k+64*(D+64*L)]=$}};W(z,A,1,0,0),W(A,z,0,1,0),W(z,A,0,0,1);let j=1e9,I=-1e9;for(let d=0;d<A.length;d++)A[d]<j&&(j=A[d]),A[d]>I&&(I=A[d]);const O=new Uint8Array(w*w*w),h=255/(I-j);for(let d=0;d<A.length;d++)O[d]=(A[d]-j)*h;const ne={P:b,flt:i,f32:e,vao:a.createVertexArray(),tN:null,linked:!1,u8:O};return a.__c606=ne}function rt(a,e){if(e.linked)return;const i=e.P,l=e.flt?["uN","uD","uW","uA","uR","uG"]:["uN","uD","uW","uA","uR","uG","uQ"];for(const b in i){const{p:u,v:m,f:_}=i[b];if(!a.getProgramParameter(u,a.LINK_STATUS))throw new Error("606 "+b+": "+(a.getShaderInfoLog(m)||"")+(a.getShaderInfoLog(_)||"")+a.getProgramInfoLog(u));a.useProgram(u),l.forEach((R,U)=>{const w=a.getUniformLocation(u,R);w&&a.uniform1i(w,U)}),i[b]={p:u,uP:a.getUniformLocation(u,"uP"),uC:a.getUniformLocation(u,"uC"),uS:a.getUniformLocation(u,"uS")}}const q=a.createTexture();a.bindTexture(a.TEXTURE_3D,q),a.pixelStorei(a.UNPACK_ALIGNMENT,1),a.texImage3D(a.TEXTURE_3D,0,a.R8,64,64,64,0,a.RED,a.UNSIGNED_BYTE,e.u8),a.texParameteri(a.TEXTURE_3D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_3D,a.TEXTURE_MAG_FILTER,a.LINEAR);for(const b of[a.TEXTURE_WRAP_S,a.TEXTURE_WRAP_T,a.TEXTURE_WRAP_R])a.texParameteri(a.TEXTURE_3D,b,a.REPEAT);a.pixelStorei(a.UNPACK_ALIGNMENT,4),e.tN=q,e.u8=null,e.linked=!0}function ie(a,e,i,l,q,b){const u=a.createTexture();a.bindTexture(a.TEXTURE_2D,u),q&&e.flt?a.texImage2D(a.TEXTURE_2D,0,a.RGBA16F,i,l,0,a.RGBA,a.HALF_FLOAT,null):a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,i,l,0,a.RGBA,a.UNSIGNED_BYTE,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,b),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);const m=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,m),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,u,0),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.bindFramebuffer(a.FRAMEBUFFER,null),{tex:u,fb:m,w:i,h:l}}Fe.add({num:606,name:"Flooded Cistern",fam:"Vistas",recipe:"A low walkway in a vast old underground cistern, with hundreds of mismatched marble columns standing in still water under brick arches, each with a hooded lamp at its foot, and drips breaking the mirror now and then. Where you stand, the lamps and the water level change every mint, and rare ones have a shaft of daylight. No controls, just look.",gl:!0,fps:30,seed:0,make(a){const e=a.gl,i=a.size,l=st(e);let q=parseInt(a.hash.slice(2,10),16)|0;const b=()=>{q=q+1831565813|0;let t=Math.imul(q^q>>>15,1|q);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},u=t=>{let r=0;for(const o of t)r+=o[1];let s=b()*r;for(const o of t)if(s-=o[1],s<=0)return o[0];return t[0][0]},m=a.home,_=$e&&typeof window<"u"&&window.F606||{},R=(t,r)=>_[t]!==void 0?_[t]:r,U=R("lamp",m?"Amber":u([["Amber",5],["Copper",3],["Candle",3],["Verdigris",1],["Ember",1]])),w={Amber:[1,.56,.19],Copper:[1,.36,.09],Candle:[1,.72,.38],Verdigris:[.66,.88,.62],Ember:[1,.26,.07]}[U],z=R("water",m?"Ankle":u([["Ankle",5],["Shallow",2],["Flooded",2]])),A=R("reach",m?"Long":u([["Long",5],["Near dark",2],["Far",2]])),ve=R("stone",m?"Proconnesian":u([["Proconnesian",5],["Rose granite",2],["Verd antique",2],["Limewashed",1]])),W=R("bay",m?"Standard":u([["Standard",5],["Close-set",2],["Wide",2]])),j=R("lit",m?"A few out":u([["A few out",5],["All burning",2],["Half dark",2]])),I=R("haze",m?"Damp":u([["Damp",5],["Clear",2],["Mist",2]]));let O=parseInt(a.hash.slice(2,10),16)^2978930175|0;const h=()=>{O=O+1831565813|0;let t=Math.imul(O^O>>>15,1|O);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ne=t=>{let r=0;for(const o of t)r+=o[1];let s=h()*r;for(const o of t)if(s-=o[1],s<=0)return o[0];return t[0][0]},d=R("view",m?"Along the walk":ne([["Along the walk",3],["Down the walk",3],["Across the hall",2],["At the water's edge",3],["From the stair",3],["At a column's foot",2]])),T=R("hall",m?"One tier":ne([["One tier",4],["Two tiers",1]])),g=R("ev",m?0:ne([[0,70],[1,13],[2,9],[3,8]]));let X=parseInt(a.hash.slice(2,10),16)^1013904242|0;const J=()=>{X=X+1831565813|0;let t=Math.imul(X^X>>>15,1|X);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},L=J(),D=J();let k=R("state",m?"Standing":L<.1?"Drained":L<.18?"Low water after rain":L<.26?"Lamps being lit":"Standing");(k==="Drained"&&g===2||k==="Low water after rain"&&z==="Flooded"||k==="Lamps being lit"&&g!==0)&&(k="Standing");const $=k==="Drained",H=k==="Low water after rain",Ue=k==="Lamps being lit",Pe=!m&&D<.5&&d==="Down the walk"?"Crouched on the walk":!m&&D<.5&&d==="Across the hall"?"Across on the diagonal":d,ct=["","One group lit","Lamps under water","A shaft of day"][g]||(Ue?"Lamps being lit":j);a.trait("Lamps",U),a.trait("Water",$||H?k:z),a.trait("Reach",A),a.trait("Stone",ve),a.trait("Bays",W),a.trait("Lit",ct),a.trait("Air",I),a.trait("Standpoint",Pe),a.trait("Hall",T);const le=T==="Two tiers",p=(W==="Close-set"?3.7:W==="Wide"?5.6:4.6)*(le?.82:1),fe=z==="Flooded"?1.9:z==="Shallow"?.1:.24,oe=$?.015:H?Math.min(fe,.08):fe,ee=(W==="Wide"?8.6:W==="Close-set"?6.9:8)+(le?3.4:0)-(z==="Flooded"?1.5:0)+fe-oe,it=p*.5*1.012,nt=(z==="Flooded"?.2:z==="Shallow"?.42:.62)+fe-oe,Re=(z==="Flooded"?.32:z==="Shallow"?.62:.46)+fe-oe,Ne=I==="Clear"?.009:I==="Mist"?.03:.018,lt=A==="Near dark"?1/24:A==="Far"?1/95:1/52,se=p*.5,be=Re+1.52,ze=[se+(m?.45:.1+b()*.3),be,-.3],ft=(()=>{let t=.5,r=-1,s=.38+b()*.3;for(let o=0;o<8;o++){const c=s+o*.07;let v=9;for(let x=-1;x<3;x++)for(let P=-1;P<3;P++){const F=x*p-ze[0],M=P*p-ze[2],B=Math.hypot(F,M);if(B>9||M*Math.cos(c)+F*Math.sin(c)<.5)continue;let V=Math.abs(Math.atan2(F,M)-c);v=Math.min(v,V/(1.4/B+.12))}v>r&&(r=v,t=c)}return t})();let f=ze,E=m?.62:ft,Y=m?.04:-.01+b()*.07,Q=null;const Ae=t=>(t+.5)*p,Me=(t,r,s)=>{let o=r,c=-1;for(let v=0;v<13;v++){const x=r+(v/12-.5)*s;let P=9;for(let F=-3;F<6;F++)for(let M=-3;M<6;M++){const B=F*p-t[0],V=M*p-t[2],ce=Math.hypot(B,V);if(ce>12||V*Math.cos(x)+B*Math.sin(x)<.5)continue;let Z=Math.abs(Math.atan2(B,V)-x);Z=Math.min(Z,6.2832-Z),P=Math.min(P,Z/(1.4/ce+.12))}P>c&&(c=P,o=x)}return o};if(d==="Down the walk")f=[se+(h()-.5)*.3,be,3.5],E=(h()-.5)*.1,Y=-.05+h()*.04;else if(d==="Across the hall")f=[se-.5,be,Ae(0)+(h()-.5)*.8],E=1.5708+(h()-.5)*.35,Y=-.03+h()*.05;else if(d==="At the water's edge")f=[se+p,.38,Ae(1)+(h()-.5)*.8],E=Me(f,.25+h()*.55,1.1),Y=.02+h()*.05;else if(d==="From the stair")f=[se,Math.min(4.6,ee-2.4),Ae(-1)],E=.15+h()*.45,Y=-.26-h()*.12;else if(d==="At a column's foot"){Q=[1,1];const t=3.93+(h()-.5)*.5;f=[p+Math.sin(t)*1.9,be,p+Math.cos(t)*1.9],Y=.3+h()*.12}Pe==="Crouched on the walk"&&(f[1]=Re+.5+D*.3,E=(D<.25?1:-1)*(.42+D%.25*1.6),Y=.02+D*.06),Pe==="Across on the diagonal"&&(E=Me(f,.72+D*.3,.35)),_.cam&&(f=[_.cam[0],_.cam[4]||f[1],_.cam[1]],E=_.cam[2],Y=_.cam[3]);const n=new Uint8Array(64*4*64*4),dt=j==="All burning"?.02:j==="Half dark"?.45:.12;for(let t=0;t<64;t++)for(let r=0;r<64;r++){const s=(r*4+t*64*4)*4,o=()=>b()*255;n[s]=o(),n[s+1]=o(),n[s+2]=255*Math.pow(b(),1.3),n[s+3]=b()<dt?0:150+b()*105,n[s+4]=b()*255,n[s+5]=o(),n[s+6]=o(),n[s+7]=o();const c=r>31?r-64:r,v=t>31?t-64:t;{const x=c*p-f[0],P=v*p-f[2];Math.hypot(x,P)<(m?7:3.6)&&(n[s+5]=((Math.atan2(-P,-x)+(Q?.5:1))/6.2832+2)%1*255,!Q&&!m&&(n[s+3]*=.7))}n[s+8]=128+(b()-.5)*130,n[s+9]=128+(b()-.5)*130,n[s+10]=o(),n[s+11]=o(),n[s+12]=0,n[s+13]=h()*255,n[s+14]=h()*255,n[s+15]=h()*255,le&&(n[s+4]=n[s+4]<128?190:240,n[s+11]=40)}const de=(t,r)=>((t+64&63)*4+(r+64&63)*64*4)*4;if(m){const t=de(1,1);n[t+10]=144,n[t+13]=200,n[t+14]=148,n[t+15]=120}const yt=Math.sin(E),wt=Math.cos(E);if(!m&&h()<.3){const t=4+h()*5,r=E+(h()-.5)*.35;n[de(Math.round((f[0]+Math.sin(r)*t)/p),Math.round((f[2]+Math.cos(r)*t)/p))+12]=255}if(g===1){const t=11+h()*8,r=E+(h()-.5)*.3,s=f[0]+Math.sin(r)*t,o=f[2]+Math.cos(r)*t;for(let c=-32;c<32;c++)for(let v=-32;v<32;v++){const x=de(v,c),P=Math.hypot(v*p-s,c*p-o);n[x+3]=P<p*2.1?255:0}}if(Ue){const t=f[0]+Math.sin(E)*p*.9,r=f[2]+Math.cos(E)*p*.9;for(let s=-32;s<32;s++)for(let o=-32;o<32;o++){const c=de(o,s);Math.hypot(o*p-t,s*p-r)>p*1.45?n[c+3]=0:n[c+3]=Math.max(n[c+3],200)}}if(Q){const t=de(Q[0],Q[1]);n[t+3]=255;const r=Q[0]*p+(n[t]/255-.5)*.3,s=Q[1]*p+(n[t+1]/255-.5)*.3;E=Math.atan2(r-f[0],s-f[2])-.2}rt(e,l);const Ce=e.createTexture();e.bindTexture(e.TEXTURE_2D,Ce),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,64*4,64,0,e.RGBA,e.UNSIGNED_BYTE,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Se=ie(e,l,i,i,!0,e.LINEAR),Ie=ie(e,l,i,i,!0,e.LINEAR),te=512,_e=[ie(e,l,te,te,!0,e.LINEAR),ie(e,l,te,te,!0,e.LINEAR)],Xe=l.flt?null:ie(e,l,i,i,!1,e.NEAREST),ht=Math.tan(33*Math.PI/180),xe=50,He=f[0]-xe*.5,Be=f[2]-xe*.5,C=new Float32Array(20*4),y=(t,r,s,o,c)=>{C[t*4]=r,C[t*4+1]=s,C[t*4+2]=o,C[t*4+3]=c},Le=I==="Mist"?1.15:1;y(4,p,ee,it,oe),y(5,se,.78,Re,nt),y(6,w[0]*Le,w[1]*Le,w[2]*Le,I==="Mist"?.13:I==="Clear"?.04:.075),y(7,Ne,lt,2.2,.02);const N={Proconnesian:[[.66,.64,.6],[.74,.71,.66],.55,[.6,.65,.74],0],"Rose granite":[[.72,.44,.4],[.6,.44,.42],.3,[.8,.7,.72],1],"Verd antique":[[.17,.3,.22],[.3,.4,.33],.5,[1.9,1.85,1.6],2],Limewashed:[[.9,.89,.85],[.86,.85,.8],.15,[.95,.93,.9],3]}[ve],ye={Amber:[1,1,.18,1.66],Copper:[1.05,.95,.18,1.55],Candle:[.8,.62,.14,1.38],Verdigris:[1,1,.18,1.66],Ember:[1.1,.85,.2,1.55]}[U];if(y(8,N[0][0],N[0][1],N[0][2],N[2]),y(9,N[1][0],N[1][1],N[1][2],1.05),y(16,N[3][0],N[3][1],N[3][2],N[4]),y(17,ye[0],ye[1],0,ye[2]),y(10,.4,.23,.15,1),y(11,3,.024,.12,g===2?5:0),g===3){const t=6+h()*5,r=E+(h()-.5)*.3,s=(h()<.5?-1:1)*(.45+h()*.35),o=(h()-.5)*.5,c=Math.hypot(s,1,o);y(13,f[0]+Math.sin(r)*t,ee,f[2]+Math.cos(r)*t,.85),y(14,s/c,-1/c,o/c,1.6),y(18,C[52]+s*ee,0,C[54]+o*ee,.85*(.55+.04*ee*c)*1.3)}y(15,g===2?-oe+.06:$?.09:.13,le?1:0,(ee+oe)*.42,24);let We=1e9,Ge=1e9,Ke=1e9,Ve=1e9,je=1e9,he=99;const Oe=[[.125,.375],[-.375,.125],[.375,-.125],[-.125,-.375]];function mt(){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,l.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Ce)}let re=null;const ut=()=>{const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),l.f32?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,i,i,0,e.RGBA,e.FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA32UI,i,i,0,e.RGBA_INTEGER,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const r=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),{tex:t,fb:r}};function Ye(t,r){const s=l.P.trace;if(e.useProgram(s.p),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,re.fb),e.viewport(0,0,i,i),e.uniform4fv(s.uP,C),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,re.tex),Xe){e.disable(e.BLEND),r||(e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));let o=t,c=Xe;for(const v of[l.P.shadeC,l.P.shadeR]){e.useProgram(v.p),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,i,i),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,o.tex),e.uniform4fv(v.uP,C),e.drawArrays(e.TRIANGLES,0,3);const x=o;o=c,c=x}e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE5);return}e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.viewport(0,0,i,i);for(const o of[l.P.shadeC,l.P.shadeR])e.useProgram(o.p),r||o===l.P.shadeR?(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE)):e.disable(e.BLEND),e.uniform4fv(o.uP,C),e.drawArrays(e.TRIANGLES,0,3);e.disable(e.BLEND)}function pt(t){re=ut(),e.bindVertexArray(l.vao),mt(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,Se.fb),e.viewport(0,0,i,i),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),C[0*4+3]=0,C[3*4+3]=i;for(let r=0;r<t;r++)y(12,Oe[r][0],Oe[r][1],1/t,4),Ye(Se,!0);C[0*4+3]=1,y(12,0,0,1,4),Ye(Ie,!1),C[0*4+3]=0,e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.deleteFramebuffer(re.fb),e.deleteTexture(re.tex),re=null}let me=parseInt(a.hash.slice(2,10),16)^1909639587|0;const G=()=>{me=me+1831565813|0;let t=Math.imul(me^me>>>15,1|me);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ae=[];let ue=parseInt(a.hash.slice(2,10),16)^2135587861|0;const we=()=>{ue=ue+1831565813|0;let t=Math.imul(ue^ue>>>15,1|ue);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let pe=null;function vt(){const t=E+(G()-.5)*1.5,r=1.5+Math.pow(G(),1.6)*22,s=f[0]+Math.sin(t)*r,o=f[2]+Math.cos(t)*r,c=G();if(c<.045?(ae.push({x:s,z:o,s:.03+G()*.06}),G()<.3&&(pe={x:s,z:o+(G()-.5)*.1,s:.02+G()*.03,n:5+(G()*24|0)})):c>.9965&&ae.push({x:s,z:o,s:.014+G()*.012}),pe&&--pe.n<=0&&(ae.push(pe),pe=null),H&&ae.length<2&&we()<.8){const v=E+(we()-.5)*1.6,x=1+Math.pow(we(),1.3)*20;ae.push({x:f[0]+Math.sin(v)*x,z:f[2]+Math.cos(v)*x,s:.015+we()*.03})}}let Ee=0,Te=0,bt=0;const K=new Float32Array(3*4),S=new Float32Array(4*4),xt=le?.7:1;function ke(){vt();const t=l.P.sim,r=_e[Ee],s=_e[Ee^1];e.useProgram(t.p),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,s.fb),e.viewport(0,0,te,te),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Ce),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,r.tex),K[0]=te,K[1]=xe,K[2]=He,K[3]=Be;for(let o=0;o<2;o++){const c=ae[o];K[4+o*4]=c?c.x:-1e3,K[5+o*4]=c?c.z:-1e3,K[6+o*4]=c?c.s:0,K[7+o*4]=o?xt:p}ae.splice(0,2),e.uniform4fv(t.uS,K),e.drawArrays(e.TRIANGLES,0,3),Ee^=1}function Qe(t,r){const s=a.view||Je,o=E+(s.yaw||0),c=Y+(s.pitch||0),v=f[0]+(s.x||0),x=f[1]+(s.y||0),P=f[2]+(s.z||0),F=o!==We||c!==Ge||v!==Ke||x!==Ve||P!==je;if(F||he===6){F&&(We=o,Ge=c,Ke=v,Ve=x,je=P);const B=Math.cos(c),V=Math.sin(c),ce=Math.cos(o),Z=Math.sin(o);y(0,v,x,P,0),y(1,Z*B,V,ce*B,ht),y(2,ce,0,-Z,0),y(3,-Z*V,B,-ce*V,i);const Ze=F&&he>0&&t>0?1:4;pt(Ze),he=F&&Ze===1?0:7}else he<7&&he++;for(Te=Math.min(Te+r,.1);Te>=1/30;)ke(),Te-=1/30;bt++===0&&r===0&&ke();const M=l.P.comp;e.useProgram(M.p),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,l.tN),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,_e[Ee].tex),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Se.tex),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Ie.tex),S[0]=ye[3],S[1]=1/i,S[2]=t,S[3]=Ne,S[4]=2.2/i,S[5]=xe,S[6]=He,S[7]=Be,S[8]=7.5,S[9]=1,S[10]=g===2?.22:.045,S[11]=1.15,S[12]=$?1:0,e.uniform4fv(M.uC,S),e.uniform4fv(M.uP,C),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}for(let t=0;t<75;t++)ke();return Qe(0,0),Qe}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
