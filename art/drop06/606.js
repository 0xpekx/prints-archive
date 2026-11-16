// Flooded Cistern: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/606.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ke){ke&&function(){"use strict";const et={yaw:0,pitch:0,x:0,y:0,z:0},tt=0,Pe=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,at="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",De=`
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
`,ot=De+`
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
`,Me=De+`
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
`,rt=`
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
`,st=`
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
`;function it(t){if(t.__c606)return t.__c606;t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float"),i=e||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear");const l=(h,z)=>{const A=t.createShader(h);return t.shaderSource(A,z),t.compileShader(A),A},v=l(t.VERTEX_SHADER,Pe+at),F={},y=(h,z,A)=>{const W=l(t.FRAGMENT_SHADER,Pe+z),J=A?l(t.VERTEX_SHADER,Pe+A):v,D=t.createProgram();t.attachShader(D,J),t.attachShader(D,W),t.linkProgram(D),t.flush(),F[h]={p:D,v:J,f:W}},m=e?"":`#define GTW 1
`,C=e?"":i?`#define GU 1
`:`#define GU 1
#define E8 1
`,R=i?"":`#define E8 1
`;y("trace",m+ot),y("shadeC",C+`#define PC 1
`+Me),y("shadeR",C+`#define PC 0
`+Me),y("sim",rt),y("comp",R+st);let T=1617591054;const x=64,f=new Float32Array(x*x*x),o=new Float32Array(x*x*x);for(let h=0;h<f.length;h++){T=T+1831565813|0;let z=Math.imul(T^T>>>15,1|T);z=z+Math.imul(z^z>>>7,61|z)^z,f[h]=((z^z>>>14)>>>0)/4294967296}const re=[.25,.5,.25],I=(h,z,A,W,J)=>{for(let D=0;D<x;D++)for(let U=0;U<x;U++)for(let M=0;M<x;M++){let $=0;for(let G=-1;G<=1;G++)$+=re[G+1]*h[(M+G*A&63)+64*((U+G*W&63)+64*(D+G*J&63))];z[M+64*(U+64*D)]=$}};I(f,o,1,0,0),I(o,f,0,1,0),I(f,o,0,0,1);let g=1e9,k=-1e9;for(let h=0;h<o.length;h++)o[h]<g&&(g=o[h]),o[h]>k&&(k=o[h]);const X=new Uint8Array(x*x*x),u=255/(k-g);for(let h=0;h<o.length;h++)X[h]=(o[h]-g)*u;const fe={P:F,flt:i,f32:e,vao:t.createVertexArray(),tN:null,u8:X};return t.__c606=fe}function ct(t,e){if(e.tN)return;const i=t.createTexture();t.bindTexture(t.TEXTURE_3D,i),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,e.u8),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const l of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,l,t.REPEAT);t.pixelStorei(t.UNPACK_ALIGNMENT,4),e.tN=i,e.u8=null}function ne(t,e,i){const l=e.P[i];if(l.ok)return l;const{p:v,v:F,f:y}=l;if(!t.getProgramParameter(v,t.LINK_STATUS))throw new Error("606 "+i+": "+(t.getShaderInfoLog(F)||"")+(t.getShaderInfoLog(y)||"")+t.getProgramInfoLog(v));return t.useProgram(v),(e.flt?["uN","uD","uW","uA","uR","uG"]:["uN","uD","uW","uA","uR","uG","uQ"]).forEach((C,R)=>{const T=t.getUniformLocation(v,C);T&&t.uniform1i(T,R)}),e.P[i]={ok:!0,p:v,uP:t.getUniformLocation(v,"uP"),uC:t.getUniformLocation(v,"uC"),uS:t.getUniformLocation(v,"uS")}}function le(t,e,i,l,v,F){const y=t.createTexture();t.bindTexture(t.TEXTURE_2D,y),v&&e.flt?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,i,l,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,i,l,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,F),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const m=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,m),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,y,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:y,fb:m,w:i,h:l}}function nt(t,e,i,l,v,F,y,m,C,R){for(let T=0;T<64;T++)for(let x=0;x<64;x++){const f=(x*4+T*64*4)*4;let o;e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f]=((o^o>>>14)>>>0)/4294967296*255,e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+1]=((o^o>>>14)>>>0)/4294967296*255,e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+2]=255*Math.pow(((o^o>>>14)>>>0)/4294967296,1.3),e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296<l?t[f+3]=0:(e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+3]=150+((o^o>>>14)>>>0)/4294967296*105);for(let g=4;g<8;g++)e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+g]=((o^o>>>14)>>>0)/4294967296*255;const re=x>31?x-64:x,I=T>31?T-64:T;{const g=re*v-F,k=I*v-y;Math.hypot(g,k)<(m?7:3.6)&&(t[f+5]=((Math.atan2(-k,-g)+(C?.5:1))/6.2832+2)%1*255,!C&&!m&&(t[f+3]*=.7))}e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+8]=128+(((o^o>>>14)>>>0)/4294967296-.5)*130,e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+9]=128+(((o^o>>>14)>>>0)/4294967296-.5)*130,e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+10]=((o^o>>>14)>>>0)/4294967296*255,e=e+1831565813|0,o=Math.imul(e^e>>>15,1|e),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+11]=((o^o>>>14)>>>0)/4294967296*255,t[f+12]=0;for(let g=13;g<16;g++)i=i+1831565813|0,o=Math.imul(i^i>>>15,1|i),o=o+Math.imul(o^o>>>7,61|o)^o,t[f+g]=((o^o>>>14)>>>0)/4294967296*255;R&&(t[f+4]=t[f+4]<128?190:240,t[f+11]=40)}return[e,i]}ke.add({num:606,name:"Flooded Cistern",fam:"Vistas",recipe:"A low walkway in a vast old underground cistern, with hundreds of mismatched marble columns standing in still water under brick arches, each with a hooded lamp at its foot, and drips breaking the mirror now and then. Where you stand, the lamps and the water level change every mint, and rare ones have a shaft of daylight. No controls, just look.",gl:!0,fps:30,seed:0,make(t){const e=t.gl,i=t.size,l=it(e);let v=parseInt(t.hash.slice(2,10),16)|0;const F=()=>{v=v+1831565813|0;let a=Math.imul(v^v>>>15,1|v);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},y=a=>{let s=0;for(const r of a)s+=r[1];let n=F()*s;for(const r of a)if(n-=r[1],n<=0)return r[0];return a[0][0]},m=t.home,C=tt&&typeof window<"u"&&window.F606||{},R=(a,s)=>C[a]!==void 0?C[a]:s,T=R("lamp",m?"Amber":y([["Amber",5],["Copper",3],["Candle",3],["Verdigris",1],["Ember",1]])),x={Amber:[1,.56,.19],Copper:[1,.36,.09],Candle:[1,.72,.38],Verdigris:[.66,.88,.62],Ember:[1,.26,.07]}[T],f=R("water",m?"Ankle":y([["Ankle",5],["Shallow",2],["Flooded",2]])),o=R("reach",m?"Long":y([["Long",5],["Near dark",2],["Far",2]])),re=R("stone",m?"Proconnesian":y([["Proconnesian",5],["Rose granite",2],["Verd antique",2],["Limewashed",1]])),I=R("bay",m?"Standard":y([["Standard",5],["Close-set",2],["Wide",2]])),g=R("lit",m?"A few out":y([["A few out",5],["All burning",2],["Half dark",2]])),k=R("haze",m?"Damp":y([["Damp",5],["Clear",2],["Mist",2]]));let X=parseInt(t.hash.slice(2,10),16)^2978930175|0;const u=()=>{X=X+1831565813|0;let a=Math.imul(X^X>>>15,1|X);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},fe=a=>{let s=0;for(const r of a)s+=r[1];let n=u()*s;for(const r of a)if(n-=r[1],n<=0)return r[0];return a[0][0]},h=R("view",m?"Along the walk":fe([["Along the walk",3],["Down the walk",3],["Across the hall",2],["At the water's edge",3],["From the stair",3],["At a column's foot",2]])),z=R("hall",m?"One tier":fe([["One tier",4],["Two tiers",1]])),A=R("ev",m?0:fe([[0,70],[1,13],[2,9],[3,8]]));let W=parseInt(t.hash.slice(2,10),16)^1013904242|0;const J=()=>{W=W+1831565813|0;let a=Math.imul(W^W>>>15,1|W);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},D=J(),U=J();let M=R("state",m?"Standing":D<.1?"Drained":D<.18?"Low water after rain":D<.26?"Lamps being lit":"Standing");(M==="Drained"&&A===2||M==="Low water after rain"&&f==="Flooded"||M==="Lamps being lit"&&A!==0)&&(M="Standing");const $=M==="Drained",G=M==="Low water after rain",Ue=M==="Lamps being lit",Re=!m&&U<.5&&h==="Down the walk"?"Crouched on the walk":!m&&U<.5&&h==="Across the hall"?"Across on the diagonal":h,lt=["","One group lit","Lamps under water","A shaft of day"][A]||(Ue?"Lamps being lit":g);t.trait("Lamps",T),t.trait("Water",$||G?M:f),t.trait("Reach",o),t.trait("Stone",re),t.trait("Bays",I),t.trait("Lit",lt),t.trait("Air",k),t.trait("Standpoint",Re),t.trait("Hall",z);const de=z==="Two tiers",p=(I==="Close-set"?3.7:I==="Wide"?5.6:4.6)*(de?.82:1),he=f==="Flooded"?1.9:f==="Shallow"?.1:.24,se=$?.015:G?Math.min(he,.08):he,ee=(I==="Wide"?8.6:I==="Close-set"?6.9:8)+(de?3.4:0)-(f==="Flooded"?1.5:0)+he-se,ft=p*.5*1.012,dt=(f==="Flooded"?.2:f==="Shallow"?.42:.62)+he-se,ze=(f==="Flooded"?.32:f==="Shallow"?.62:.46)+he-se,Ne=k==="Clear"?.009:k==="Mist"?.03:.018,ht=o==="Near dark"?1/24:o==="Far"?1/95:1/52,ie=p*.5,be=ze+1.52,Ae=[ie+(m?.45:.1+F()*.3),be,-.3],mt=(()=>{let a=.5,s=-1,n=.38+F()*.3;for(let r=0;r<8;r++){const c=n+r*.07;let b=9;for(let E=-1;E<3;E++)for(let S=-1;S<3;S++){const N=E*p-Ae[0],B=S*p-Ae[2],K=Math.hypot(N,B);if(K>9||B*Math.cos(c)+N*Math.sin(c)<.5)continue;let O=Math.abs(Math.atan2(N,B)-c);b=Math.min(b,O/(1.4/K+.12))}b>s&&(s=b,a=c)}return a})();let d=Ae,P=m?.62:mt,Y=m?.04:-.01+F()*.07,te=null;const Ce=a=>(a+.5)*p,Ie=(a,s,n)=>{let r=s,c=-1;for(let b=0;b<13;b++){const E=s+(b/12-.5)*n;let S=9;for(let N=-3;N<6;N++)for(let B=-3;B<6;B++){const K=N*p-a[0],O=B*p-a[2],ce=Math.hypot(K,O);if(ce>12||O*Math.cos(E)+K*Math.sin(E)<.5)continue;let Z=Math.abs(Math.atan2(K,O)-E);Z=Math.min(Z,6.2832-Z),S=Math.min(S,Z/(1.4/ce+.12))}S>c&&(c=S,r=E)}return r};if(h==="Down the walk")d=[ie+(u()-.5)*.3,be,3.5],P=(u()-.5)*.1,Y=-.05+u()*.04;else if(h==="Across the hall")d=[ie-.5,be,Ce(0)+(u()-.5)*.8],P=1.5708+(u()-.5)*.35,Y=-.03+u()*.05;else if(h==="At the water's edge")d=[ie+p,.38,Ce(1)+(u()-.5)*.8],P=Ie(d,.25+u()*.55,1.1),Y=.02+u()*.05;else if(h==="From the stair")d=[ie,Math.min(4.6,ee-2.4),Ce(-1)],P=.15+u()*.45,Y=-.26-u()*.12;else if(h==="At a column's foot"){te=[1,1];const a=3.93+(u()-.5)*.5;d=[p+Math.sin(a)*1.9,be,p+Math.cos(a)*1.9],Y=.3+u()*.12}Re==="Crouched on the walk"&&(d[1]=ze+.5+U*.3,P=(U<.25?1:-1)*(.42+U%.25*1.6),Y=.02+U*.06),Re==="Across on the diagonal"&&(P=Ie(d,.72+U*.3,.35)),C.cam&&(d=[C.cam[0],C.cam[4]||d[1],C.cam[1]],P=C.cam[2],Y=C.cam[3]);const _=new Uint8Array(64*4*64*4),ut=g==="All burning"?.02:g==="Half dark"?.45:.12;{const a=nt(_,v,X,ut,p,d[0],d[2],m,!!te,de);v=a[0],X=a[1]}const me=(a,s)=>((a+64&63)*4+(s+64&63)*64*4)*4;if(m){const a=me(1,1);_[a+10]=144,_[a+13]=200,_[a+14]=148,_[a+15]=120}const Et=Math.sin(P),Tt=Math.cos(P);if(!m&&u()<.3){const a=4+u()*5,s=P+(u()-.5)*.35;_[me(Math.round((d[0]+Math.sin(s)*a)/p),Math.round((d[2]+Math.cos(s)*a)/p))+12]=255}if(A===1){const a=11+u()*8,s=P+(u()-.5)*.3,n=d[0]+Math.sin(s)*a,r=d[2]+Math.cos(s)*a;for(let c=-32;c<32;c++)for(let b=-32;b<32;b++){const E=me(b,c),S=Math.hypot(b*p-n,c*p-r);_[E+3]=S<p*2.1?255:0}}if(Ue){const a=d[0]+Math.sin(P)*p*.9,s=d[2]+Math.cos(P)*p*.9;for(let n=-32;n<32;n++)for(let r=-32;r<32;r++){const c=me(r,n);Math.hypot(r*p-a,n*p-s)>p*1.45?_[c+3]=0:_[c+3]=Math.max(_[c+3],200)}}if(te){const a=me(te[0],te[1]);_[a+3]=255;const s=te[0]*p+(_[a]/255-.5)*.3,n=te[1]*p+(_[a+1]/255-.5)*.3;P=Math.atan2(s-d[0],n-d[2])-.2}const Se=e.createTexture();e.bindTexture(e.TEXTURE_2D,Se),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,64*4,64,0,e.RGBA,e.UNSIGNED_BYTE,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Fe=le(e,l,i,i,!0,e.LINEAR),Xe=le(e,l,i,i,!0,e.LINEAR),ae=512,_e=[le(e,l,ae,ae,!0,e.LINEAR),le(e,l,ae,ae,!0,e.LINEAR)],He=l.flt?null:le(e,l,i,i,!1,e.NEAREST),pt=Math.tan(33*Math.PI/180),ye=50,Be=d[0]-ye*.5,We=d[2]-ye*.5,L=new Float32Array(20*4),w=(a,s,n,r,c)=>{L[a*4]=s,L[a*4+1]=n,L[a*4+2]=r,L[a*4+3]=c},Le=k==="Mist"?1.15:1;w(4,p,ee,ft,se),w(5,ie,.78,ze,dt),w(6,x[0]*Le,x[1]*Le,x[2]*Le,k==="Mist"?.13:k==="Clear"?.04:.075),w(7,Ne,ht,2.2,.02);const H={Proconnesian:[[.66,.64,.6],[.74,.71,.66],.55,[.6,.65,.74],0],"Rose granite":[[.72,.44,.4],[.6,.44,.42],.3,[.8,.7,.72],1],"Verd antique":[[.17,.3,.22],[.3,.4,.33],.5,[1.9,1.85,1.6],2],Limewashed:[[.9,.89,.85],[.86,.85,.8],.15,[.95,.93,.9],3]}[re],we={Amber:[1,1,.18,1.66],Copper:[1.05,.95,.18,1.55],Candle:[.8,.62,.14,1.38],Verdigris:[1,1,.18,1.66],Ember:[1.1,.85,.2,1.55]}[T];if(w(8,H[0][0],H[0][1],H[0][2],H[2]),w(9,H[1][0],H[1][1],H[1][2],1.05),w(16,H[3][0],H[3][1],H[3][2],H[4]),w(17,we[0],we[1],0,we[2]),w(10,.4,.23,.15,1),w(11,3,.024,.12,A===2?5:0),A===3){const a=6+u()*5,s=P+(u()-.5)*.3,n=(u()<.5?-1:1)*(.45+u()*.35),r=(u()-.5)*.5,c=Math.hypot(n,1,r);w(13,d[0]+Math.sin(s)*a,ee,d[2]+Math.cos(s)*a,.85),w(14,n/c,-1/c,r/c,1.6),w(18,L[52]+n*ee,0,L[54]+r*ee,.85*(.55+.04*ee*c)*1.3)}w(15,A===2?-se+.06:$?.09:.13,de?1:0,(ee+se)*.42,24);let Ge=1e9,Ke=1e9,Ve=1e9,je=1e9,Oe=1e9,ue=99;const Ye=[[.125,.375],[-.375,.125],[.375,-.125],[-.125,-.375]];function vt(){e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,l.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Se)}let Q=null;const Qe=()=>{const a=e.createTexture();e.bindTexture(e.TEXTURE_2D,a),l.f32?e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,i,i,0,e.RGBA,e.FLOAT,null):e.texImage2D(e.TEXTURE_2D,0,e.RGBA32UI,i,i,0,e.RGBA_INTEGER,e.UNSIGNED_INT,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const s=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a,0),{tex:a,fb:s}};Q=Qe(),e.bindFramebuffer(e.FRAMEBUFFER,null),ct(e,l);function Ze(a,s){const n=ne(e,l,"trace");if(e.useProgram(n.p),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,Q.fb),e.viewport(0,0,i,i),e.uniform4fv(n.uP,L),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,Q.tex),He){e.disable(e.BLEND),s||(e.bindFramebuffer(e.FRAMEBUFFER,a.fb),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));let r=a,c=He;for(const b of["shadeC","shadeR"]){const E=ne(e,l,b);e.useProgram(E.p),e.bindFramebuffer(e.FRAMEBUFFER,c.fb),e.viewport(0,0,i,i),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,r.tex),e.uniform4fv(E.uP,L),e.drawArrays(e.TRIANGLES,0,3);const S=r;r=c,c=S}e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE5);return}e.bindFramebuffer(e.FRAMEBUFFER,a.fb),e.viewport(0,0,i,i);for(const r of["shadeC","shadeR"]){const c=ne(e,l,r);e.useProgram(c.p),s||r==="shadeR"?(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE)):e.disable(e.BLEND),e.uniform4fv(c.uP,L),e.drawArrays(e.TRIANGLES,0,3)}e.disable(e.BLEND)}function xt(a){Q||(Q=Qe()),e.bindVertexArray(l.vao),vt(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,Fe.fb),e.viewport(0,0,i,i),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),L[0*4+3]=0,L[3*4+3]=i;for(let s=0;s<a;s++)w(12,Ye[s][0],Ye[s][1],1/a,4),Ze(Fe,!0);L[0*4+3]=1,w(12,0,0,1,4),Ze(Xe,!1),L[0*4+3]=0,e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,null),e.deleteFramebuffer(Q.fb),e.deleteTexture(Q.tex),Q=null}let pe=parseInt(t.hash.slice(2,10),16)^1909639587|0;const V=()=>{pe=pe+1831565813|0;let a=Math.imul(pe^pe>>>15,1|pe);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},oe=[];let ve=parseInt(t.hash.slice(2,10),16)^2135587861|0;const Ee=()=>{ve=ve+1831565813|0;let a=Math.imul(ve^ve>>>15,1|ve);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};let xe=null;function bt(){const a=P+(V()-.5)*1.5,s=1.5+Math.pow(V(),1.6)*22,n=d[0]+Math.sin(a)*s,r=d[2]+Math.cos(a)*s,c=V();if(c<.045?(oe.push({x:n,z:r,s:.03+V()*.06}),V()<.3&&(xe={x:n,z:r+(V()-.5)*.1,s:.02+V()*.03,n:5+(V()*24|0)})):c>.9965&&oe.push({x:n,z:r,s:.014+V()*.012}),xe&&--xe.n<=0&&(oe.push(xe),xe=null),G&&oe.length<2&&Ee()<.8){const b=P+(Ee()-.5)*1.6,E=1+Math.pow(Ee(),1.3)*20;oe.push({x:d[0]+Math.sin(b)*E,z:d[2]+Math.cos(b)*E,s:.015+Ee()*.03})}}let Te=0,ge=0,yt=0;const j=new Float32Array(3*4),q=new Float32Array(4*4),wt=de?.7:1;function qe(){bt();const a=ne(e,l,"sim"),s=_e[Te],n=_e[Te^1];e.useProgram(a.p),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,n.fb),e.viewport(0,0,ae,ae),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Se),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,s.tex),j[0]=ae,j[1]=ye,j[2]=Be,j[3]=We;for(let r=0;r<2;r++){const c=oe[r];j[4+r*4]=c?c.x:-1e3,j[5+r*4]=c?c.z:-1e3,j[6+r*4]=c?c.s:0,j[7+r*4]=r?wt:p}oe.splice(0,2),e.uniform4fv(a.uS,j),e.drawArrays(e.TRIANGLES,0,3),Te^=1}function Je(a,s){const n=t.view||et,r=P+(n.yaw||0),c=Y+(n.pitch||0),b=d[0]+(n.x||0),E=d[1]+(n.y||0),S=d[2]+(n.z||0),N=r!==Ge||c!==Ke||b!==Ve||E!==je||S!==Oe;if(N||ue===6){N&&(Ge=r,Ke=c,Ve=b,je=E,Oe=S);const K=Math.cos(c),O=Math.sin(c),ce=Math.cos(r),Z=Math.sin(r);w(0,b,E,S,0),w(1,Z*K,O,ce*K,pt),w(2,ce,0,-Z,0),w(3,-Z*O,K,-ce*O,i);const $e=N&&ue>0&&a>0?1:4;xt($e),ue=N&&$e===1?0:7}else ue<7&&ue++;for(ge=Math.min(ge+s,.1);ge>=1/30;)qe(),ge-=1/30;yt++===0&&s===0&&qe();const B=ne(e,l,"comp");e.useProgram(B.p),e.bindVertexArray(l.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,l.tN),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,_e[Te].tex),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Fe.tex),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,Xe.tex),q[0]=we[3],q[1]=1/i,q[2]=a,q[3]=Ne,q[4]=2.2/i,q[5]=ye,q[6]=Be,q[7]=We,q[8]=7.5,q[9]=1,q[10]=A===2?.22:.045,q[11]=1.15,q[12]=$?1:0,e.uniform4fv(B.uC,q),e.uniform4fv(B.uP,L),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}for(let a=0;a<75;a++)qe();return Je(0,0),Je}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
