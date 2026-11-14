// Striped Arches: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/639.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Qe){Qe&&function(){"use strict";const Pt={yaw:0,pitch:0,x:0,y:0,z:0},_e=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,kt="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",Ne=`
uniform vec4 uP[17];
uniform sampler2D uD;
uniform sampler3D uN;
out vec4 oC;
int L1,L0;
#define NW uP[4].x
#define BS uP[4].y
#define HC uP[4].z
#define ZD uP[4].w
#define YI uP[5].x
#define YL uP[5].y
#define RI uP[5].z
#define RO uP[5].w
#define YU uP[6].x
#define RU uP[6].y
#define RUO uP[6].z
#define WH uP[6].w
#define LC uP[7].rgb
#define HAZE uP[7].w
#define SIG uP[8].x
#define REACH uP[8].y
#define AMB uP[8].z
#define LP uP[8].w
#define SC uP[9].rgb
#define POL uP[9].w
#define SR uP[10].rgb
#define REP uP[10].w
#define SD uP[11].xyz
#define DCX uP[11].w
#define DW uP[12].x
#define DH uP[12].y
#define SUNG uP[12].z
#define LH uP[12].w
#define SUNC uP[13].rgb
#define WORN uP[13].w
#define AMBC uP[15].rgb
#define HALL uP[15].w
#define LANE uP[16].x
#define DPER uP[16].z
#define HZ uP[16].y
#define DAYG uP[16].w
// x from the nearest open door's axis (with several doors open, one every DPER)
float dxp(float x){return DPER>0.?mod(x-DCX+DPER*.5,DPER)-DPER*.5:x-DCX;}
const float PI=3.14159265;
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)*.0625)
vec4 cl(ivec2 c,int k){return texelFetch(uD,ivec2((c.x&63)*3+k,c.y&63),0);}
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float sat(float x){return clamp(x,0.,1.);}
// coverage of a line of half-width w at distance dd, for a pixel footprint fp (thin lines fade instead of breaking up)
float cv(float dd,float w,float fp){return sat((w-dd)/fp+.5)*min(1.,2.*w/fp);}
float at2(float y,float x){float a=atan(y/(abs(x)+1e-5));return x<0.?(y<0.?-PI-a:PI-a):a;}
vec2 slab(float A,float B,float lo,float hi){float t1=(lo-A)/B,t2=(hi-A)/B;return abs(B)<1e-6?(A>lo&&A<hi?vec2(-1e9,1e9):vec2(1e9,-1e9)):vec2(min(t1,t2),max(t1,t2));}
vec2 cellC(ivec2 c){return vec2(c)*vec2(NW,BS);}
// the lamp hangs in the nave on the +x side of its column line
vec3 lampP(ivec2 c,vec4 a,vec4 b){
  vec2 cc=cellC(c);
  return vec3(cc.x+NW*.5-.22-b.g*.55,LH+fract(a.a*37.)*.9,cc.y+(b.b-.5)*BS*.78);
}
// section of one arcade in the cell: q=(z from column, y). <0 solid. gS: 1 lower ring, 2 pier, 3 upper wall, 4 upper ring
int gS;
float sec(float zc,float y){
  float az=abs(zc),u=BS*.5-az;
  vec2 q=vec2(u,y-YL);float l=length(q);
  float dR=max(max(l-RO,RI-l),YI-y);
  float ph=BS*.5-sqrt(max(RI*RI-(YL-YI)*(YL-YI),.01));
  float dP=max(az-ph+.02,max(YI-y,y-YU-.02));
  vec2 q2=vec2(u,y-YU);float l2=length(q2);
  float dU=max(RU-l2,YU-y);
  float d=dR;gS=1;
  if(dP<d){d=dP;gS=2;}
  if(dU<d){d=dU;gS=l2<RUO?4:3;}
  return d;
}
// one column: a single stone shaft with a faint swell, a necking ring, a capital of one of three hands (two rows of
// acanthus with corner scrolls; four smooth broad leaves; a plain cushion), then an abacus block that flares out to
// carry the pier. gLv returns the leaf relief for shading.
float gLv;
float colSD(vec3 p,vec2 cen,vec4 a,vec4 be,vec4 ee){
  vec2 q=p.xz-cen;float y=p.y,l=length(q);
  float rs=.155+.075*a.b,tcap=YI-(.44+.2*ee.g),tab=YI-.17;
  float r=rs*(1.+.035*sin(sat(y/tcap)*3.1416)-.03*y/YI);
  r+=.016*sat(1.-abs(y-tcap+.015)/.03);
  float yc=sat((y-tcap)/(tab-tcap));
  float c=q.x/max(l,1e-4),cc=c*c,c4=8.*cc*cc-8.*cc+1.,c8=2.*c4*c4-1.;
  float ck=floor(be.r*2.99),lv=0.;
  float bell=(.012+.15*yc*yc)*(.9+.3*be.g);
  if(ck<.5){
    float r1=smoothstep(0.,.12,yc)*smoothstep(.62,.42,yc)*(.5+.5*c8)*(.4+yc*1.4);
    float r2=smoothstep(.22,.4,yc)*smoothstep(.98,.8,yc)*(.5-.5*c8)*(.3+yc);
    float vo=smoothstep(.62,.9,yc)*pow(max(.5-.5*c4,0.),3.);
    lv=.055*r1+.09*r2+.105*vo;
  }else if(ck<1.5){
    lv=.06*smoothstep(0.,.2,yc)*smoothstep(1.,.7,yc)*pow(max(.5+.5*c4,0.),1.5)*(.3+yc);
  }else{
    bell=.17*sqrt(yc)*(.8+.3*be.g);lv=.012*sat(1.-abs(yc-.18)/.08);
  }
  gLv=lv;
  if(y>tcap)r+=bell+lv;
  float dcap=max(l-r,y-tab);
  if(ee.a>.45){
    // a turned base, short and crisp (at most 19 cm): a round plinth with a bevelled top edge, a fat ring, a hollow drawn
    // back to 1.08 of the shaft, a thinner ring and a fillet; every band level, so each takes a lit top and a dark under
    // side. (The other shafts go straight into the paving, the floor raised round them.)
    float hb=.78+.12*fract(ee.a*5.3),P=.075*hb,t1=.03*hb,t2=.017*hb,c1=P+t1,c2=c1+t1+.03*hb+t2;
    float db=max(max(l-1.3*rs,y-P),(l-1.3*rs+y-P+.012)*.7071);
    db=min(db,length(vec2(l-1.24*rs+t1,y-c1))-t1);
    db=min(db,max(l-1.08*rs,y-c2));
    db=min(db,length(vec2(l-1.15*rs+t2,y-c2))-t2);
    db=min(db,max(l-1.05*rs,y-c2-t2-.012*hb));
    dcap=min(dcap,db);
  }
  vec2 aq=abs(q);float sq=max(aq.x,aq.y),mn=min(aq.x,aq.y)/max(sq,1e-4);
  float hw=rs+.15+.05*be.r+.075*smoothstep(tab,YI,y)*smoothstep(tab,YI,y)-.022*(1.-mn*mn);
  float dbk=max(sq-hw,tab-y);
  return max(min(dcap,dbk),max(y-YI,-y));
}
`,zt=Ne+`
void main(){
  L0=int(uP[14].w);L1=1+L0;
  vec2 ndc=(gl_FragCoord.xy+uP[14].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){d.y=max(-d.y,.0035);o.y=-o.y;d=normalize(d);t0=-o.y/d.y;}
  float tF=d.y<-1e-4&&m<.5?-o.y/d.y:1e9;
  float tC=d.y>1e-4?(HC-o.y)/d.y:1e9;
  float tZ=d.z>1e-4?(ZD-o.z)/d.z:1e9;
  float tEnd=min(min(tF,tC),min(tZ,420.));
  vec2 sz=vec2(NW,BS),di=d.xz+vec2(1e-6);
  vec3 p0=o+d*t0;
  vec2 b=floor(p0.xz/sz+.5),st=sign(di),dd=sz/abs(di);
  vec2 tn=((b+.5*st)*sz-o.xz)/di;
  float tSeg=t0,tHit=-1.;int kind=0,hS=0;
  for(int i=0;i<72+L0;i++){
    float nx=min(tn.x,tn.y),e=min(nx,tEnd);
    ivec2 c=ivec2(b);
    vec4 a=cl(c,0),be=cl(c,1),ee=cl(c,2);
    vec2 cc=cellC(c),cen=cc+(a.rg-.5)*.08;
    // the part of this step inside the column's bounding cylinder or the arcade's slab: one march over both
    vec2 q0=o.xz-cen;
    float aa=dot(d.xz,d.xz)+1e-9,bb=dot(q0,d.xz),h=bb*bb-aa*(dot(q0,q0)-.5776),t1=1e9,t2=-1e9;
    if(h>0.){h=sqrt(h);t1=(-bb-h)/aa;t2=(-bb+h)/aa;}
    float ta=(cc.x-st.x*WH-o.x)/di.x,tb=(cc.x+st.x*WH-o.x)/di.x;
    float tS=max(min(t1,ta),tSeg),tE=min(max(t2,tb),e);
    if(tS<tE){
      float tc=tS;
      for(int k=0;k<48+L0;k++){
        vec3 p=o+d*tc;
        float dw=max(abs(p.x-cc.x)-WH,sec(p.z-cc.y,p.y));int s=gS;
        float dc=colSD(p,cen,a,be,ee),sd=min(dw,dc);
        if(sd<.0012*tc+.0004){tHit=tc;kind=dc<dw?1:2;hS=s;break;}
        tc+=max(sd*.85,.003);
        if(tc>tE)break;
      }
    }
    if(tHit>0.||nx>=tEnd)break;
    tSeg=nx;
    if(tn.x<tn.y){b.x+=st.x;tn.x+=dd.x;}else{b.y+=st.y;tn.y+=dd.y;}
  }
  uint u=uint(clamp((tHit>0.?tHit:tEnd)/512.,0.,1.)*16777215.);
  oC=vec4(float(u>>16u),float((u>>8u)&255u),float(u&255u),float(kind*8+hS))/255.;
}
`,Dt=Ne+`
float gSpec;
vec3 lamps(vec3 p,vec3 n,vec3 nS,vec3 v,float wrap,float shin,float isF){
  vec3 s=vec3(0);gSpec=0.;
  ivec2 c0=ivec2(floor(p.xz/vec2(NW,BS)+.5));
  float nk=floor(p.x/NW);
  for(int j=-2*L1;j<=2*L1;j++)for(int i=-L1;i<=L1;i++){
    ivec2 c=c0+ivec2(i,j);vec4 a=cl(c,0);
    if(a.a<.02)continue;
    vec4 b=cl(c,1);
    vec3 L=lampP(c,a,b);vec3 ld=L-p;float d2=dot(ld,ld),dd=sqrt(d2);ld/=dd;
    float nl=max((dot(n,ld)+wrap)/(1.+wrap),0.);
    float att=a.a*(1./(d2*.72+.6)*exp(-d2*.035)+.32*exp(-d2*.22));
    // an arcade between the point and the lamp: light only gets under the arches
    float kl=floor(L.x/NW);
    if(kl!=nk){float xp=NW*max(kl,nk);float f=(xp-p.x)/(L.x-p.x+1e-4);float yc=mix(p.y,L.y,sat(f));att*=mix(1.,.14,smoothstep(YI-.3,YI+.5,yc));}
    if(isF>.5){
      // the column beside the point throws a soft shadow across the floor
      vec2 s1=vec2(c0)*vec2(NW,BS),dl=L.xz-p.xz;float tt=sat(dot(s1-p.xz,dl)/dot(dl,dl));
      vec2 pq=p.xz+dl*tt-s1;float dq=length(pq);float w=.05+.45*tt;att*=mix(.28,1.,smoothstep(.28-w*.4,.28+w,dq));
    }
    s+=att*nl;
    if(shin>0.){vec3 h=normalize(ld+v);gSpec+=att*pow(max(dot(nS,h),0.),shin)*sat(dot(nS,v)*5.);}
  }
  return s*LC*LP;
}
// the doorway: a horseshoe arch, the opening widest at two thirds of its height (its circle's centre above the springing)
float doorD(float x,float y){
  float hw=DW*.5,R=hw*1.16,yc=DH-R,ys=yc-sqrt(R*R-hw*hw);
  // the box runs on up inside the circle (not cut at the springing, where the two halves' distances both fell to 0 and
  // drew a dark hairline across every opening)
  float box=max(x-hw,max(y-2.*yc+ys,-y));
  float cap=max(length(vec2(x,y-yc))-R,ys-y);
  return min(box,cap);
}
uniform sampler2D uW;
// through the doorway: the reveal (a wall .9 m deep, one side in sun, the other in shade with its leaf folded back),
// then the court: sunlit paving, a row of trees with a torn top and trunks, the court's far arcade, a pale sky
vec3 court(vec3 o,vec3 d,vec3 ph){
  float tw=.9/max(d.z,1e-3),hw=DW*.5,R=hw*1.16,yc=DH-R,ys=yc-sqrt(R*R-hw*hw);
  // where the ray meets the reveal inside the wall, in closed form: the jamb planes, then the head's cylinder
  float x0=dxp(ph.x),tb=1e9;
  if(abs(d.x)>1e-5){float tj=((d.x>0.?hw:-hw)-x0)/d.x;if(ph.y+d.y*tj<ys)tb=tj;}
  vec2 hq=vec2(x0,ph.y-yc),hd=d.xy;float qa=dot(hd,hd)+1e-9,qb=dot(hq,hd),qc=dot(hq,hq)-R*R,qh=qb*qb-qa*qc;
  if(qh>0.){float tc=(-qb+sqrt(qh))/qa;if(ph.y+d.y*tc>=ys)tb=min(tb,tc);}
  if(tb<tw){
    vec3 pr=ph+d*max(tb,0.);float xr=x0+d.x*max(tb,0.),dz=(pr.z-ZD)/.9;
    bool lit=xr*(.001-SD.x)>0.&&pr.y<ys+.2;
    // the jamb: four tall courses through the wall's depth, their joints staggered, drawn as lines at any range
    float fpr=length(pr-o)*1.45/uP[3].w,ch=max(ys,1.)*.27,cy=pr.y/ch,cr=floor(cy),zj=mod(cr,2.)<.5?.38:.66;
    float jd=min(min(fract(cy),1.-fract(cy))*ch,min(abs(dz-zj)*.9,dz*.9));
    vec3 st=SC*(.86+.2*h21(vec2(cr,dz<zj?1.:2.)))*(1.-.45*cv(jd,.006,fpr));
    if(lit)return st*vec3(1.08,1.,.9)*(1.6+.5*dz)*(.85+.15*smoothstep(.0,.4,pr.y));
    // the shaded reveal: the leaf folded back against it, dark boards with iron bands
    float bd=smoothstep(.0,.03,abs(fract(dz*5.)-.5)-.38);
    float ib=smoothstep(.04,.02,abs(fract(pr.y/1.15)-.5)-.4);
    vec3 wd=vec3(.16,.1,.06)*(.8+.4*h21(vec2(floor(dz*5.),3.)))*(1.-.35*bd);
    wd=mix(wd,vec3(.05,.05,.05),ib*.8);
    return mix(st*.42*(.7+.3*dz),wd,pr.y<ys?.85:0.)*(.5+.6*dz);
  }
  // outside: an orange-tree court in sun. Paving cut by two water channels, two ruled rows of separate trees (one to a
  // 3.4 m bay, each a dark ball on a short trunk with its shade pooled under it), the far arcade in ochre with dark
  // openings, a strip of pale blue sky; all kept inside the picture's range (the opening's exposure lift stays)
  float tP=d.y<-1e-4?-o.y/d.y:1e9;
  vec3 c=vec3(0);
#ifndef CRT
  // the mints that see the court only far off (lamp-lit, the door sixty metres away) compile a light version of it: the
  // same paving, arcade and sky, the trees one dark row
  float tA0=(ZD+28.-o.z)/d.z;
  if(tP<tA0){vec3 pp=o+d*tP;c=vec3(1.18,1.08,.93)*(.92+.1*h21(floor(pp.xz/.9)));return c*mix(1.,.45,smoothstep(ZD+6.,ZD+9.,pp.z)*smoothstep(ZD+19.,ZD+16.,pp.z));}
  vec3 pA0=o+d*tA0;
  float tt=3.3+.45*sin(pA0.x*1.85)+.3*sin(pA0.x*4.1+1.);
  if(pA0.y<tt)return mix(vec3(.05,.08,.04),vec3(.22,.32,.15),sat((pA0.y-tt+1.6)/1.6))*(pA0.y<1.2?.6:1.);
  if(pA0.y<5.6)return vec3(1.,.84,.6)*(pA0.y>5.05?.45:1.);
  return vec3(.6,.74,.9);
#else
  float hit=0.;
  for(int r=0;r<2;r++){
    float zr=ZD+(r==0?9.:16.5),off=r==0?0.:1.7,t=(zr-o.z)/d.z;
    if(tP<t||hit>0.)break;
    vec3 p=o+d*t;
    float bi=floor((p.x-off)/3.4),hb=h21(vec2(bi,zr)),rr=1.05+.4*fract(hb*7.3),cx=(bi+.5)*3.4+off+(hb-.5)*.5,cy=1.45+rr*.9;
    vec2 q=vec2(p.x-cx,p.y-cy);
    // (no noise lookups here: a few sines make the crowns' ragged edge and their clumps, cheap to compile)
    float nz=.5+.3*sin(q.x*7.+hb*20.)*sin(q.y*6.3+hb*9.)+.2*sin((q.x+q.y)*13.+hb*5.),ql=length(q)/rr;
    if(ql<.86+.24*nz){
      // a ball of glossy leaves: lit to the upper left, dark beneath, clumps of leaves across it
      float lt=sat(dot(q/rr,vec2(-.45,.89))*.7+.45),cl=.5+.25*sin(p.x*17.+sin(p.y*13.)*2.)*sin(p.y*15.+p.x*5.)+.25*h21(floor(p.xy*11.));
      c=mix(vec3(.05,.08,.04),vec3(.25,.36,.17),lt)*(.6+.8*cl)*(1.-.35*smoothstep(.6,1.,ql)*(1.-lt));hit=1.;
    }else if(abs(q.x+.04*sin(p.y*3.))<.075&&p.y<cy-rr*.45){c=vec3(.13,.1,.08)*(.8+.4*sat(-q.x*8.));hit=1.;}
  }
  if(hit>0.)return c;
  float tA=(ZD+28.-o.z)/d.z;
  if(tP<tA){
    vec3 pp=o+d*tP;
    float fp=tP*1.45/uP[3].w;
    vec2 g=pp.xz/.9,gf=fract(g);float jd=min(min(gf.x,1.-gf.x),min(gf.y,1.-gf.y))*.9;
    c=vec3(1.18,1.08,.93)*(.92+.1*h21(floor(g)))*(1.-.25*cv(jd,.008,fp));
    // the trees' shade, an ellipse under each, drawn a little toward the hall
    float sh=1.;
    for(int r=0;r<2;r++){
      float zr=ZD+(r==0?9.:16.5),off=r==0?0.:1.7,bi=floor((pp.x-off)/3.4),hb=h21(vec2(bi,zr)),rr=1.05+.4*fract(hb*7.3),cx=(bi+.5)*3.4+off+(hb-.5)*.5;
      vec2 e=vec2((pp.x-cx)/(rr*1.05),(pp.z-zr+rr*.9)/(rr*1.9));
      sh=min(sh,mix(.38,1.,smoothstep(.8,1.15,length(e)+.06*sin(pp.x*5.+pp.z*3.)*sin(pp.z*4.1))));
    }
    c*=sh;
    // two water channels across the court, dark with the sky in them
    float wc=min(abs(pp.z-ZD-5.),abs(pp.z-ZD-13.));
    c=mix(c,vec3(.3,.37,.45),cv(wc,.18,fp));
    return c;
  }
  vec3 pA=o+d*tA;
  if(pA.y<5.6){
    // the far arcade: ochre piers with a shaded side, dark openings, the roof's eave on top
    float ax=(fract(pA.x/3.4)-.5)*3.4,inO=step(abs(ax),1.2)*step(pA.y,2.6+sqrt(max(1.44-ax*ax,0.)));
    c=vec3(1.,.84,.6)*(.92+.08*h21(floor(pA.xy*vec2(2.,4.))));
    c*=mix(1.,.62,smoothstep(.9,1.25,-ax)*step(abs(ax),1.45));
    c=mix(c,vec3(.3,.24,.18)*(.8+.4*smoothstep(0.,2.,pA.y)),inO);
    if(pA.y>5.05)c=vec3(.42,.27,.2)*(.85+.25*smoothstep(5.05,5.6,pA.y));
    return c;
  }
  return vec3(.6,.74,.9)*(1.-.12*sat((pA.y-5.6)/14.));
#endif
}
// is the sun getting to this point through the door, past the columns and arcades of the two column lines beside it
float sunTo(vec3 p){
  if(SD.z<1e-3)return 0.;
  float s=(ZD-p.z)/SD.z;
  if(s<0.)return 0.;
  vec3 q=p+SD*s;
  // the sun is a disc: the patch's edge is sharp at the door and widens with every metre from it
  float soft=.03+.012*s;
  float v=1.-smoothstep(-soft,soft,doorD(abs(dxp(q.x)),q.y));
  if(v<.004)return 0.;
  vec2 s2=SD.xz;float ls=length(s2),k=floor(p.x/NW);
  for(int i=0;i<2+L0;i++){
    float X=NW*(k+float(i));
    float lam=abs(s2.x)>1e-5?(X-p.x)/s2.x:-1.;
    float zc=p.z+s2.y*clamp(lam,0.,s),zn=floor(zc/BS+.5)*BS;
    vec2 r=vec2(X,zn)-p.xz;float dl=abs(r.x*s2.y-r.y*s2.x)/ls,rd=dot(r,s2)/ls;
    // a column's shadow, its penumbra widening with the distance behind it
    float pw=.02+.012*max(rd,0.);
    if(rd>0.)v*=smoothstep(.16-pw,.2+pw,dl);
    // the arcade's wall over the column line, soft-edged the same way
    float pw2=.015+.012*max(lam,0.);
    if(lam>0.&&lam<s)v*=smoothstep(-pw2,pw2,sec(zc-zn,p.y+SD.y*lam)-.02);
  }
  return v;
}
// the light the sunlit floor throws back up: strongest just beside the stripe, onto whatever faces it (amber, the
// colour of the stone it comes off)
vec3 bounce(vec3 p,vec3 n){
  if(SUNG<=0.||SD.z<1e-3)return vec3(0);
  float s=(ZD-p.z)/SD.z;
  if(s<0.)return vec3(0);
  float xd=dxp(p.x+SD.x*s),sg=xd<0.?-1.:1.,ex=max(abs(xd)-DW*.5,0.);
  float len=sat(1.2-s*SD.y/DH);
  vec3 w=vec3(-sg*ex,-max(p.y,.25),0.);
  float f=sat(dot(n,normalize(w))*.75+.25);
  return vec3(.62,.48,.32)*SUNG*SD.y*len*f/(1.+dot(w,w)*.3);
}
#ifdef LANT
// the lantern (a drum and a ribbed dome over one bay of a nave): daylight let down from the roof, cool, at any hour.
// uLn: its centre x, z, the pool's radius, its strength. In closed form: the opening as a disc of sky (its area over the
// squared distance, the cosine at the point and at the opening), plus the light straight down it as a round pool on
// the floor whose edge softens with the depth below the opening, the nearest column's shadow fanning out from the pool,
// and the pool's own light thrown back up onto what faces it
uniform vec4 uLn;
const vec3 LNC=vec3(.5,.67,1.);
vec3 lantern(vec3 p,vec3 n,float isF,float isW){
  vec3 C=vec3(uLn.x,HC,uLn.y),lv=C-p;float d2=dot(lv,lv);lv*=inversesqrt(d2);
  float rh=length(p.xz-uLn.xy),pw=.12+.035*(HC-p.y);
  float pool=1.-smoothstep(uLn.z-pw,uLn.z+pw,rh);
  // (the walls see the opening past the drum's sides only from well below it, never at a grazing angle)
  float e=2.56*max(dot(n,lv),0.)*lv.y/d2*(isF>.5?10.*exp(-max(rh-uLn.z,0.)*.18):isW>.5?6.*smoothstep(.5,.85,lv.y):40.)+pool*max(n.y,0.)*.62;
  // up off the pool: onto the soffits and the undersides that look down into it
  vec3 lp=vec3(uLn.x,0.,uLn.y)-p;float b2=dot(lp,lp);lp*=inversesqrt(b2);
  float eb=5.3*max(dot(n,lp),0.)*max(-lp.y,0.)/(b2+4.)*.9;
  // the arcade between the point and the opening: the light gets in under the arches only
  float kl=floor(C.x/NW),nk=floor(p.x/NW);
  if(kl!=nk){float xp=NW*max(kl,nk),f=(xp-p.x)/(C.x-p.x+1e-4),yc=mix(p.y,C.y,sat(f));float k=mix(1.,.1,smoothstep(YI-.3,YI+.5,yc));e*=k;eb*=k;}
  if(isF>.5){
    // the column beside the point: its shadow, soft and widening away from the pool
    ivec2 c0=ivec2(floor(p.xz/vec2(NW,BS)+.5));
    vec2 s1=vec2(c0)*vec2(NW,BS),dl=C.xz-p.xz;float tt=sat(dot(s1-p.xz,dl)/dot(dl,dl));
    float dq=length(p.xz+dl*tt-s1),w=.05+.45*tt;e*=mix(.12,1.,smoothstep(.28-w*.4,.28+w,dq));
  }
  // (on the shafts a paler daylight, so white marble reads pale cool grey and not lavender; on the walls less of it and
  // nearer white, so the warm stone still shows and the bay's piers do not come out as pale grey slabs)
  // (what the pool throws back up has the floor's warm marble in it)
  return ((isF>.5?LNC:isW>.5?vec3(.31,.3,.29):vec3(.6,.66,.78))*e+(isW>.5?vec3(.3,.27,.22):vec3(.62,.6,.55))*eb)*uLn.w;
}
#endif
// the voussoirs: a fan of wedges round the arch centre, every joint a straight hairline pointing at it; cream wedges are
// single blocks of limestone, red ones four thin bricks on edge with pale mortar between; one arch's wedges all near
// one tone, with soot at the crown and a darker lower third
vec3 colorRing(float zc,float y,float wsz,ivec2 c,float t,bool isUp,out vec4 wi){
  float side=zc>0.?1.:-1.;
  float aid=float(c.y)+(side>0.?.0:-1.);
  float a=zc-BS*.5*side;
  float cy=isUp?YU:YL,r0=isUp?RU:RI,r1=isUp?RUO:RO;
  float ang=at2(y-cy,-a);
  float hA=h21(vec2(float(c.x)*1.7+aid*3.31,aid*.37+float(c.x)));
  float nv=isUp?15.:17.;
  float w=(ang+.72)*nv/(PI+1.44);
  float k=floor(w),fr=w-k;
  float hv=h21(vec2(k+hA*91.,aid*2.1+(isUp?5.:0.)));
  bool red=mod(k+floor(hA*2.),2.)<.5;
  float rr=max(length(vec2(a,y-cy)),r0);
  float fpx=t*1.45/uP[3].w,ww=(PI+1.44)/nv*rr;
  float mot=NS(vec3(wsz*2.1+float(c.x)*5.,y*2.,float(c.x)*1.3+aid),.9);
  vec3 alb;
  if(HALL>.5&&HALL<1.5){
    // a later bay: the stripes painted on plaster, flatter and brighter
    alb=(red?SR*1.2:SC*1.1)*(.97+.06*hv)*(.95+.1*mot);
    fr=fract(w);
  }else if(red){
    float bf=fract(fr*4.);
    alb=SR*(.93+.14*hv)*(.86+.28*mot);
    alb=mix(alb,SC*.78,.65*cv(min(bf,1.-bf)*ww*.25,.005,fpx));
    // bricks on edge are a hand long: the head joints of each course fall half a brick from the next one's
    float rj=fract((rr-r0)/.23+.5*mod(floor(fr*4.),2.)+hv);
    alb=mix(alb,SC*.72,.55*cv(min(rj,1.-rj)*.23,.004,fpx));
    alb*=.9+.2*h21(vec2(floor(fr*4.)+k*5.,floor((rr-r0)/.23+.5*mod(floor(fr*4.),2.)+hv)));
  }else{
    // each pale wedge is one dressed block, a little lighter on one side than the other
    alb=SC*(.94+.12*hv)*(.88+.24*mot)*(.9+.2*mix(fr,1.-fr,step(.5,fract(hv*7.))));
  }
  alb*=1.-.5*cv(min(fr,1.-fr)*ww,.008,fpx);
  // some arches have been limewashed again, and it has begun to flake
  float rp=h21(vec2(aid*11.,float(c.x)*3.));
  if(rp<REP){
    float flake=smoothstep(.4,.6,NS(vec3(wsz,y,float(c.x))*3.,.42)+.2*(mot-.5));
    alb=mix(alb,red?SR*vec3(1.3,.95,.85):SC*vec3(1.12,1.07,.95),flake*.7);
  }
  float crown=smoothstep(.75,1.57,ang)*smoothstep(2.4,1.57,ang);
  alb*=mix(1.,.6+.25*mot,crown*.55);
  alb*=mix(.78,1.,smoothstep(-.4,.5,ang));
  alb*=.86+.2*h21(vec2(aid*17.,float(c.x)*7.+1.));
  wi=vec4(hv,fr,red?1.:0.,ww);
  return alb;
}
vec3 plaster(vec3 p,ivec2 c,float t,float hB){
  float g=NS(p*vec3(1.,.5,1.)+float(c.x)*3.,1.1),g2=NS(p*vec3(1.,.35,1.)+4.,.24);
  vec3 a=mix(SC*.74,SC*vec3(.95,.82,.66),.5*hB+.3*g);
  a*=.6+.55*g;a*=.8+.3*g2;
  float streak=NS(vec3(p.x*1.2,p.y*.12,p.z*1.2)+7.,.5);
  a*=mix(.62,1.05,smoothstep(.25,.72,streak));
  // limewash patches, each generation a little different
  float pat=smoothstep(.45,.7,NS(p*vec3(.4,.8,.4)+11.,2.1));
  a=mix(a,a*vec3(1.12,1.05,.95),pat*.5);
  // plaster mended and limewashed in patches, hard-edged where one generation stops
  float mend=NS(p*vec3(.45,.3,.45)+float(c.y)*.3,1.6);
  float mE=smoothstep(.5,.515,mend);
  a=mix(a,a*mix(vec3(.84,.8,.7),vec3(1.06,1.,.88),hB),mE*.3);
  // where it has flaked, the courses of the wall show through
  return a;
}
// the shafts were taken from older buildings, and each stone shows its own figure: a cream limestone, a pink breccia of
// broken pieces in white veins, a speckled grey granite, a green marble, a black marble with a gold seam
vec3 shaftStone(float kind,vec3 p,float ang,vec4 a,vec4 b,float fpx){
  // the figure is sampled at one scale round and along the shaft (no stretch, so no vertical grain)
  vec3 sp=vec3(cos(ang)*.9+a.r*17.,p.y*.85+b.a*9.,sin(ang)*.9+a.g*11.);
  float fk=smoothstep(.009,.003,fpx);
  float v=NS(sp,1.3),v2=NS(sp+7.1,.3);
  // (the base was turned from a clear block: no seam or vein runs round it as a loop)
  float lo=smoothstep(.2,.26,p.y),vn=pow(1.-abs(2.*v-1.),18.)*lo;
  vec3 alb;
  if(HALL>1.5||kind>=4.){
    // black marble: a few gold seams running aslant
    float vs=fract(v*1.6+sp.y*.12);
    alb=vec3(.085,.078,.07)*(.85+.3*v2);
    alb=mix(alb,vec3(.62,.46,.2),pow(1.-abs(2.*vs-1.),44.)*.7*lo);
  }else if(kind<1.){
    alb=vec3(.62,.57,.48)*(.8+.4*smoothstep(.3,.7,v2))*(.86+.28*v);alb=mix(alb,alb*.55,vn*.5);
  }else if(kind<2.){
    // breccia: angular pale and wine clasts in a net of veins, no direction
    float cl=NS(sp*1.7+3.,.5),cq=floor(cl*5.+.5*v2)/5.;
    alb=mix(vec3(.74,.52,.46),vec3(.5,.24,.22),cq)*(.88+.24*v2);
    alb=mix(alb,vec3(.86,.8,.72),(pow(1.-abs(2.*fract(cl*5.+.5*v2)-1.),8.)*.55*fk+.12*(1.-fk))*lo);
  }else if(kind<3.){
    // granite: an even grey with a soft mottle; its fleck only close to (faded to its mean by its size in pixels)
    float sk=NS(vec3(cos(ang)*3.,p.y,sin(ang)*3.)+a.r*9.,.028);
    alb=vec3(.48,.47,.46)*(.9+.2*v2);
    alb*=1.-.55*fk*smoothstep(.56,.64,sk);alb=mix(alb,vec3(.8,.78,.74),smoothstep(.4,.33,sk)*.7*fk);
  }else{
    // cipollino: wavy green bands crossing the shaft aslant
    float bw=sin((p.y*2.4+cos(ang+a.r*6.)*1.4+v*3.)*2.6);
    alb=mix(vec3(.28,.34,.29),vec3(.5,.55,.48),smoothstep(-.3,.6,bw))*(.85+.3*v2);alb=mix(alb,vec3(.72,.76,.7),vn*.5);
  }
  return alb*(.85+.25*b.r);
}
uniform sampler2D uT,uK;
#ifdef E8
void mainS(){
#else
void main(){
#endif
  L0=int(uP[14].w);L1=1+L0;
  vec2 ndc=(gl_FragCoord.xy+uP[14].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){d.y=max(-d.y,.0035);o.y=-o.y;d=normalize(d);t0=-o.y/d.y;}
  float tF=d.y<-1e-4&&m<.5?-o.y/d.y:1e9;
  float tC=d.y>1e-4?(HC-o.y)/d.y:1e9;
  float tZ=d.z>1e-4?(ZD-o.z)/d.z:1e9;
  float tEnd=min(min(tF,tC),min(tZ,420.));
  // the hit, from the trace pass
  uvec4 tx=uvec4(texelFetch(uT,ivec2(gl_FragCoord.xy),0)*255.+.5);
  float tFar=float((tx.r<<16u)|(tx.g<<8u)|tx.b)/16777215.*512.;
  int kind=int(tx.a)>>3,hS=int(tx.a)&7;
  if(kind==0)tFar=tEnd;
  // five shade programs that compile side by side (D3D's compile time grows faster than a program's size): PART 1 the
  // arch rings, 4 the piers and upper walls, 2 the columns, 3 the floor, 5 the ceiling, the far wall and anything unhit
  bool fl=tFar>=tF-1e-3&&tFar<1e8&&tF<tC&&tF<=tZ,isR=hS==1||hS==4;
  bool mine=PART==2?kind==1:PART==1?kind==2&&isR:PART==4?kind==2&&!isR:PART==3?kind==0&&fl:kind==0&&!fl;
#ifdef E8
  if(!mine){oC=vec4(0);return;}
#else
  if(!mine)discard;
#endif
  vec3 acc=vec3(0);
  vec3 ph0=o+d*tFar;
  ivec2 hitC=ivec2(floor(ph0.xz/vec2(NW,BS)+.5));
  vec4 hA=cl(hitC,0),hB=cl(hitC,1),hE=cl(hitC,2);
  vec3 ph=o+d*tFar;
  vec3 col=vec3(0),n=vec3(0,1,0),alb=vec3(.4);
  float rough=.5,wrap=.2,shin=0.,isF=0.,ao=1.,csh=1.,dimU=1.,shinF=0.,sp2=1.;
  bool isFloor=false;vec3 spN=n;
  vec3 V=-d;
  int mat=0;float y=ph.y;
#if PART==2
  {
    // a column: one stone shaft, a capital, an abacus block
    mat=1;
    vec4 a=hA,be=hB,ee=hE;
    vec2 cen=cellC(hitC)+(a.rg-.5)*.08;
    vec2 q=ph.xz-cen;
    // the normal from the shape itself: four taps in one loop
    n=vec3(0);float hn=.0015+.0005*tFar;
    for(int k=0;k<4+L0;k++){vec3 e=2.*vec3(float(((k+3)>>1)&1),float((k>>1)&1),float(k&1))-1.;n+=e*colSD(ph+e*hn,cen,a,be,ee);}
    n=normalize(n);
    float lv=gLv,tcap=YI-(.44+.2*ee.g),ck=floor(be.r*2.99);
    float ang=at2(q.y,q.x);
    float kind_=mod(floor(a.b*7.+be.a*3.),5.);
    float fpx=tFar*1.45/uP[3].w;
    alb=shaftStone(kind_,ph,ang,a,be,fpx);
    // every shaft was turned and polished; hands have left a duller, greyer band between hip and shoulder
    float hand=smoothstep(.85,1.15,y)*smoothstep(1.85,1.55,y);
    alb=mix(alb,vec3(dot(alb,vec3(.33))),hand*.35)*mix(1.,.9,hand);shin=mix(60.,16.,hand);
    if(y>tcap-.03){
      // the capitals in a honey stone, a step under the lit arch stone
      alb=mix(vec3(.52,.44,.32),vec3(.45,.38,.27),fract(be.r*3.7))*(.75+.5*NS(ph+5.,.13));
      // the leaves stand out from a bell in deep shadow; their tips catch the light
      if(ck<1.5){ao=.3+.7*sat(lv/.03);alb*=.8+.35*sat(lv/.045);}
      shin=0.;
      // the carving (one lookup of the baked map): it tilts the normal by its slope and darkens the drilled eyes, the
      // hollows under the curled tips and the abacus's moulding
      float tab=YI-.17,vb=y<tab?(.5+35.*sat((y-tcap)/(tab-tcap)))/48.:(36.5+11.*sat((y-tab)/.17))/48.;
      vec4 km=textureLod(uK,vec2(ang*.63662,(ck+vb)/3.),0.);
      vec3 tq=vec3(-q.y,0.,q.x)/max(length(q),1e-4);
      n=normalize(n-(tq*(km.g-.5)+vec3(0,1,0)*(km.b-.5))*4.);
      ao*=(1.-.82*km.a)*(.7+.3*km.r);
    }
    alb*=mix(1.,.9+.2*NS(ph+4.,.05),smoothstep(.012,.004,fpx));
    // some shafts are fluted, some carved in a spiral
    vec3 n0=n;
    float fig=fract(a.g*13.7+be.b*5.3);
    if(y<tcap-.06&&y>.4&&fig<.36){
      vec3 tq=vec3(-q.y,0.,q.x)/max(length(q),1e-4);
      if(fig<.22){n=normalize(n+tq*sin(ang*20.)*.7);alb*=.9+.1*cos(ang*40.);}
      else n=normalize(n+tq*sin(ang*6.+y*6.)*.5);
    }
    wrap=.15;
    // the highlight follows the turned form, not the flutes
    spN=n0;
    ao*=mix(.6,1.,smoothstep(.0,.4,y))*mix(.78,1.,smoothstep(YI,YI-.8,y));
    // a shaft with no base meets the paving in a dark joint a centimetre high
    if(ee.a<=.45)ao*=mix(.3,1.,smoothstep(.0,.012,y));
  }
#elif PART==3||PART==5
#if PART==3
  {
    // the polished floor (diffuse here; the reflection is added in the resolve pass)
    isFloor=true;mat=3;isF=1.;wrap=0.;
    float wet=LANE>-99.?smoothstep(1.4,1.,abs(ph.x-LANE)):0.;
    vec3 p=ph;
    float sx=.62,sz2=.86;
    vec2 g=vec2(p.x/sx,p.z/sz2+.5*mod(floor(p.x/sx),2.));
    vec2 id=floor(g),fg=g-id;
    float hS2=h21(id*vec2(1.,3.));
    float mot=NS(p*.7+vec3(id,0.),.6),mot2=NS(p*1.4+vec3(id.y,3.,id.x),.14);
    // one marble, the slabs within a few per cent of each other; the variety is in the veins and mends inside them
    alb=mix(vec3(.55,.49,.39),vec3(.59,.53,.43),hS2)*(.9+.16*mot)*(.95+.1*mot2);
    float jf=sat(1.1-tFar/(uP[3].w*.03));
    float vn2=fract(mot*1.7+mot2*.6);
    alb=mix(alb,alb*vec3(.74,.74,.78),pow(1.-abs(2.*vn2-1.),16.)*.7*jf);
    float rp2=h21(id*vec2(2.3,.7)+5.);if(rp2>.93)alb=alb*vec3(1.06,1.05,1.02);else if(rp2<.05)alb*=vec3(.93,.91,.9);
    float jd=min(min(fg.x,1.-fg.x)*sx,min(fg.y,1.-fg.y)*sz2);
    alb*=mix(1.,smoothstep(.0,.006,jd)*.25+.75,jf);
    alb*=1.-.45*wet;
    vec2 cq=mod(p.xz+vec2(NW,BS)*.5,vec2(NW,BS))-vec2(NW,BS)*.5;float ca=length(cq);alb*=mix(.42,1.,smoothstep(.16,.8,ca));
    rough=sat(mix(.05,.3,mot)+WORN*.5+.05*hS2);
    sp2=(.89+.22*hS2)*(.93+.14*mot);
  }
#else
  if(tFar>=tC-1e-3&&tC<tF&&tC<=tZ&&tC<1e8){
    // the timber ceiling: boards, beams across the nave, a little old paint
    mat=4;wrap=.5;n=vec3(0,-1,0);
    vec3 p=ph;
    float bz=fract(p.z/.82+.12*sin(floor(p.z/.82)*2.7));float bd=smoothstep(.34,.3,abs(bz-.5))*smoothstep(.03,.06,bz)*smoothstep(.97,.94,bz);
    float wd=NS(vec3(p.x*.4,p.z*4.,p.z),.6);
    float bid=floor(p.z/.82);alb=vec3(.12,.078,.046)*(.5+.9*wd)*(.65+.5*NS(p*1.3,.16))*mix(.62,1.15,bd)*(.72+.56*h21(vec2(bid,3.)));
    // the beams' undersides were painted in red, gold and blue, now faded; a band down each, a run of lozenges along it
    float ph3=h21(vec2(bid,7.)),bx=fract(p.x/.9+.5*fract(bid*.5));
    vec3 pc=ph3<.4?vec3(.42,.1,.06):ph3<.75?vec3(.46,.33,.1):vec3(.12,.17,.3);
    float lz=smoothstep(.36,.3,abs(bx-.5)+abs(bz-.5)*1.2);
    alb=mix(alb,pc*(.6+.5*wd),bd*(.25+.45*lz)*smoothstep(.2,.55,NS(p*.8+2.,.7)));
    ao=.7+.3*bd;
  } else if(tZ<1e8&&tFar>=tZ-1e-3&&tZ<=tF&&tZ<=tC){
    // the far wall: one bay of it baked at make (coursed ashlar; round the door the horseshoe's voussoirs in the hall's
    // two stones, a moulded frame, the sill), read once
    mat=5;n=vec3(0,0,-1);wrap=.3;
    float xd=dxp(ph.x),xm=mod(ph.x-DCX+NW*.5,NW)-NW*.5;
    vec4 wm=texture(uW,vec2((abs(xd)<NW*.5?.25:.75)+xm/(NW*2.),ph.y/HC));
    // the map holds distances: joints and wedge edges thresholded by the pixel's width, so they stay lines
    float fw=tFar*1.45/uP[3].w;
    float rd=sat((wm.g-.5)*.16/max(fw,1e-4)+.5);
    alb=mix(SC,SR,rd)*wm.b*1.25*1.25*(.85+.3*NS(ph*vec3(.3,.8,.3),1.2));ao=wm.a*1.1;
    alb*=1.-.42*cv(wm.r*.12,.006,fw);
  }
#endif
#else
  {
    // the wall: arch rings, pier, upper wall
    mat=2;
    vec2 cc=cellC(hitC);
    float zc=ph.z-cc.y,slx=ph.x-cc.x;
    // (the trace stops short of a surface by up to .0012 of the distance, so a face hit far off lies that far OUTSIDE the
    // face plane: a fixed .012 gave faces seen square-on through a long lens the soffit's or the pier side's normal, in
    // slabs and wedges. Soffit and pier-side hits lie inside the plane, so the inside margin stays .012)
    float fe=abs(slx)-WH;
    bool face=fe>-.012&&fe<.012+.0012*tFar;
    wrap=.25;
    if(face)n=vec3(sign(slx),0.,0.);
    float q0=zc>0.?1.:-1.,ca=zc-q0*BS*.5;
#if PART==1
    {
      bool up=hS==4;vec4 wi;
      alb=colorRing(zc,y,ph.z,hitC,tFar,up,wi);
      float af=wi.x,cy=up?YU:YL;vec2 q=vec2(ca,y-cy);float r=length(q);
      float inner=up?RU:RI,outer=up?RUO:RO;
      // the ring's own frame: radial out, and along the ring the way the wedges count
      vec3 rad=vec3(0.,q.y,q.x)/r,tg=vec3(0.,-q.x,q.y)/r;
      float ej=min(wi.y,1.-wi.y)*wi.w,sj=wi.y<.5?-1.:1.;
      bool red=wi.z>.5;
      if(face){
        // the pale blocks stand proud of the brick with worn, rounded arrises that take a line of light; the brick is set
        // back a finger's depth, in the blocks' shadow along its edges; both round over into the soffit
        float ei=min(r-inner,outer-r);
        if(!red)n=normalize(n+tg*sj*smoothstep(.07,.0,ej)*1.1+rad*(r-inner<outer-r?-1.:1.)*smoothstep(.06,.0,ei)*1.1);
        else{alb*=mix(.55,1.,smoothstep(.0,.06,ej));n=normalize(n-tg*sj*smoothstep(.03,.0,ej)*.5);}
      } else {
        // the intrados is the same stone seen from underneath: curved, and darker than the face
        if(abs(r-inner)<abs(r-outer)){n=-rad;wrap=.4;}
        else n=rad;
        alb*=.72;
        if(red)alb*=mix(.6,1.,smoothstep(.0,.05,ej));
      }
      float nb=NS(ph*3.5,.5)-.5,nb2=NS(ph*9.+3.,.5)-.5;
      n=normalize(n+vec3((af-.5)*.05+nb2*.06,nb*.07,(fract(af*7.)-.5)*.04+nb2*.05)*(red?1.6:.8));
      if(hS==1){float ph0=BS*.5-sqrt(max(RI*RI-(YL-YI)*(YL-YI),.01));csh=mix(.65,1.,smoothstep(.0,.35,y-YI))*mix(.8,1.,smoothstep(ph0-.05,ph0+.3,abs(zc)));}
    }
#else
    {
      float hB=h21(vec2(float(hitC.x)*3.3,float(hitC.y)*.77));
      alb=plaster(ph,hitC,tFar,hB);
      // the piers are laid in stone and brick courses; the bands where the arches spring are darker stone
      float bandT=smoothstep(YI+.09,YI+.04,y)+smoothstep(.0,.05,y-YU)*smoothstep(.13,.08,y-YU);
      {
        // the piers and the wall over the arches: coursed ashlar, the courses of different heights, every block its own
        // tone, the odd one replaced in a paler or a warmer stone
        float u=face?zc:slx,cy=(y-YI)*2.4+hB*2.;cy+=.38*sin(cy*1.9+hB*6.);
        float row=floor(cy),fr=cy-row;
        float ux=u*1.55+h21(vec2(row,hB*9.))*2.,col=floor(ux),fu=ux-col;
        float hr=h21(vec2(row*1.3+col*7.1,float(hitC.x)+float(hitC.y)*2.));
        vec3 st=SC*mix(.74,1.,hr)*(.88+.24*NS(ph*1.1+2.,.4));
        if(hr>.92)st*=vec3(1.1,1.06,.98);else if(hr<.06)st*=vec3(1.04,.9,.8);
        alb=mix(alb,st,hS==2?.85:.7);
        float fp=tFar*1.45/uP[3].w;
        alb*=1.-.32*max(cv(min(fr,1.-fr)/2.4,.005,fp),cv(min(fu,1.-fu)/1.55,.005,fp));
      }
      alb=mix(alb,SC*.62*(.7+.5*NS(ph+1.,.3)),sat(bandT)*.7);
      if(HALL>.5&&HALL<1.5&&y>YI+.1){
        // a later bay: piers and upper wall limewashed pale over the courses, a painted band under the ceiling
        alb=mix(alb,SC*vec3(1.1,1.06,.96)*(.9+.12*NS(ph*.8,.6)),.82);
        alb=mix(alb,SR*.95,smoothstep(.03,0.,abs(y-HC+.5)-.16));
      }
      if(!face){
        if(hS==2)n=vec3(0.,0.,sign(zc));
        else {vec2 q=vec2(ca,y-YU);n=normalize(vec3(0,-q.y,-q.x));wrap=.4;}
      }
    }
#endif
    dimU=mix(1.,.55,smoothstep(YI,HC,y));
    float gf=sat(1.8-tFar/(uP[3].w*.02));
    float g1=NS(ph,.075),g2=NS(ph+9.,.03);
    alb*=mix(1.,(.68+.64*g1)*(.8+.4*g2),gf);
    alb*=1.-.32*gf*smoothstep(.36,.2,g2);
    alb*=mix(.84,1.04,smoothstep(.26,.72,NS(vec3(ph.x*2.6,ph.y*.2,ph.z*2.6),.6)));
    n=normalize(n+(vec3(g1,g2,g1+g2-1.)-.5)*.34*gf);
  }
#endif
  // the sun at the hit point (i<0), then along the view ray inside the prism the door cuts from the low sun (the
  // shaft: a faint even wedge in the air): one loop, so sunTo is compiled once
  float sv=0.,beam=0.,ta=0.,tb=-1.;
  if(SUNG>0.&&SD.z>1e-3){
    float kz=(ZD-o.z)/SD.z,kd=d.z/SD.z;
    vec2 ix=slab(o.x+SD.x*kz-DCX,d.x-SD.x*kd,-DW*.5,DW*.5),iy=slab(o.y+SD.y*kz,d.y-SD.y*kd,0.,DH),iz=slab(o.z,d.z,ZD-70.,ZD);
    ta=max(max(ix.x,iy.x),max(iz.x,0.));tb=min(min(ix.y,iy.y),min(iz.y,tFar));
  }
  float dth=(tb-ta)/8.;int nb=tb>ta?7+L1:0;
  for(int i=-1;i<nb;i++){
    vec3 q=i<0?ph:o+d*(ta+dth*(float(i)+.5));
    float v=sunTo(q);
    if(i<0)sv=v;else beam+=v*exp(-.04*(ZD-q.z));
  }
  if(mat==0)sv=0.;
  {float bs=beam*dth*SUNG*.00022;bs=bs/(1.+bs*2.);acc+=SUNC*bs;}
  vec3 SUNH=mix(SUNC,SUNC*vec3(1.05,.86,.62),sat(tFar/40.))*exp(-tFar*.025);
  vec3 E=vec3(0);float spec=0.;
  if(mat>0){E=lamps(ph,n,spN,V,wrap,shin,isF);spec=gSpec;}
#ifdef LANT
  if(mat>0&&mat<5)E+=lantern(ph,n,isF,mat==2?1.:0.);
  {
    // the lit air in the lantern's column, from the ceiling to the pool, a little wider low down: the view ray's chord
    // through it (closed form, no march), fading to its edge
    vec2 oq=o.xz-uLn.xy;float qa=dot(d.xz,d.xz)+1e-9,qb=dot(oq,d.xz),ts=-qb/qa;
    float rr=uLn.z*(.82+.18*sat(1.-(o.y+d.y*ts)/HC)),qh=qb*qb-qa*(dot(oq,oq)-rr*rr);
    if(qh>0.){
      qh=sqrt(qh);vec2 ty=slab(o.y,d.y,0.,HC);
      float ta2=max(max((-qb-qh)/qa,ty.x),t0),tb2=min(min((-qb+qh)/qa,ty.y),tFar),ch=2.*qh/qa;
      if(tb2>ta2)acc+=LNC*uLn.w*.013*(tb2-ta2)*min(ch/(2.*rr),1.)*(.3+.7*sat((o.y+d.y*(ta2+tb2)*.5)/HC))*exp(-SIG*ta2*.5)*exp(-ta2*REACH);
    }
  }
#endif
  vec3 Bn=mat>0&&mat!=3?bounce(ph,n):vec3(0);
#ifdef DAY
  // by day the bars throw back twice as much, warm, onto the shafts and the soffits low over them
  Bn*=1.4*(.45+.55*exp(-max(y-.3,0.)/2.5));
#endif
  if(PART==2&&mat==1){
    col=alb*E*ao+alb*AMBC*AMB*(.5+.5*exp(-y*.3)+sat(1.-y*.4)*.6);
    // a polished shaft carries the lamps as a long soft highlight down the side that faces them
    // (not on the base's torus, where a lamp's highlight ran round it as a bright ring)
    if(shin>0.)col+=LC*LP*spec*(.06+.14*sat(1.-.15*y))*(shin>30.?1.:.4)*smoothstep(.2,.6,y);
#ifdef DAY
    // (by day the base's moulding in the bar no longer catches it as a bright ring)
    {
      // the bar of sun on the floor is a low, wide lamp: a polished shaft carries it as a soft streak up the side that
      // faces it, and the side away from it stays dark, so the shaft turns
      float s=(ZD-ph.z)/SD.z,xd=dxp(ph.x+SD.x*s),ex=max(abs(xd)-DW*.5,0.);
      vec3 wb=normalize(vec3((xd<0.?1.:-1.)*ex,-max(y,.3),0.));
      float lb=sat(1.2-s*SD.y/DH)*step(0.,s)/(1.+ex*ex*.25);
      // direct sun, the bars' bounce and the streak share one shoulder (light, before the stone's albedo), as the floor's
      // bar has: a pale shaft standing in a bar stays under the bar's own value and keeps its figure and its turn
      // the bars lie to one side of a shaft beside them: their bounce turns round it, the far side left to the lamps
      vec3 X=SUNH*SUNG*sv*sat(dot(n,SD)*.8+.2)*.3*smoothstep(.12,.45,y)+Bn*mix(1.,sat(n.x*(xd<0.?1.:-1.)*.6+.45),sat(ex*1.5)*smoothstep(1.8,.6,y));
      // (a knee: under it the light is untouched, so only the shafts' feet in and beside the bars change)
      float lx=dot(X,vec3(.3,.55,.15)),sh=lx>.6?(.6+(lx-.6)/(1.+(lx-.6)*3.5))/lx:1.;
      col+=(alb*X+SUNC*SUNG*SD.y*.025*lb*pow(max(dot(reflect(d,spN),wb),0.),5.)*(shin>30.?1.:.4)*exp(-max(y-.5,0.)/2.5)*smoothstep(.12,.45,y))*sh;
      col*=mix(1.,.8+.2*sat(dot(n,wb)*.7+.5),lb*exp(-tFar/14.));
    }
#else
    col+=alb*SUNH*SUNG*sv*sat(dot(n,SD)*.8+.2)*.3+alb*Bn;
#endif
  } else if((PART==1||PART==4)&&mat==2){
    col=(alb*E*dimU+alb*AMBC*AMB*(.55+.45*exp(-(y-YI)*.2)))*csh;
    col+=alb*SUNH*SUNG*sv*max(dot(n,SD),0.)*.3+alb*Bn*.8*csh;
  } else if(PART==3&&mat==3){
    float sl=SUNG*sv*max(SD.y,0.)*.5;
#ifdef DAY
    // by day the bar is the brightest thing in the hall and still a floor: a shoulder on it, the slabs' tones kept
    sl=sl/(1.+sl*.1)*sp2;
#endif
    col=alb*(E*.8+AMBC*AMB*1.2)+alb*SUNC*vec3(1.,.95,.87)*sl;
    // beside the stripe the floor takes a little of its light back off the columns it has lit
    {float s=(ZD-ph.z)/SD.z,ex=max(abs(dxp(ph.x+SD.x*s))-DW*.5,0.);
    col+=alb*vec3(.62,.48,.32)*SUNG*SD.y*.05*sat(1.2-s*SD.y/DH)*exp(-ex*.9)*step(0.,s)*step(1e-3,SD.z);}
  } else if(PART==5&&mat==4){
    col=alb*(E*1.05+AMBC*AMB*.25+Bn*.3)*ao;
#ifdef LANT
    {
      // the lantern seen from below: a square opening into a pale drum, the dome's eight ribs dark against it, its eye
      // brightest; a dark frame of beams round it
      vec2 lq=abs(ph.xz-uLn.xy);float sq=max(lq.x,lq.y),rl=length(lq),fw=tFar*1.45/uP[3].w;
      // the dome's eye brightest, its shell falling off toward the drum; the drum a darker band pierced by windows, two
      // to a side
      vec3 dr=LNC*uLn.w*(.1+.75*exp(-rl*rl*1.3));
      float rib=max(cv(min(lq.x,lq.y),.03+.02*rl,fw),cv(abs(lq.x-lq.y)*.7071,.03+.02*rl,fw))*smoothstep(.25,.7,rl);
      dr*=1.-.7*rib*step(sq,1.45);
      float wt=abs(fract(min(lq.x,lq.y)/.8)-.5),win=cv(abs(sq-1.66),.13,fw)*cv(wt,.16,fw);
      dr=mix(dr,LNC*uLn.w*(.06+.6*win),cv(abs(sq-1.7),.25,fw));
      float fr=cv(abs(sq-1.95),.07,fw);
      col=mix(mix(col,dr,sat((1.95-sq)/fw+.5)),col*.4,fr);
    }
#endif
  } else if(PART==5&&mat==5){
    float dA=doorD(abs(dxp(ph.x)),ph.y);
    // the day's glare spreads a little onto the wall round the opening
    col=alb*(E+AMBC*AMB)*ao+alb*SUNC*SUNG*.0015*(1.+5.*exp(-max(dA,0.)*1.8));
#ifdef SHUT
    col=alb*(E+AMBC*AMB)*ao;
    if(dA<0.){
      // shut: two studded leaves in their reveal, a hairline of day at the sill and between them
      float xl=abs(dxp(ph.x));
      vec3 wd=vec3(.13,.08,.05)*(.7+.6*NS(ph*vec3(.3,4.,.3),.4))*(1.-.4*smoothstep(.0,.02,abs(fract(xl/.32)-.5)-.44));
      wd*=1.-.6*smoothstep(.05,.03,abs(fract(ph.y/1.2)-.5)-.4);
      col=wd*(E+AMBC*AMB)+SUNC*.05*(smoothstep(.03,.0,ph.y)+smoothstep(.02,.0,xl))*smoothstep(.0,-.02,dA);
    }
#else
    if(dA<0.){
      // through the opening the day, overexposed but not blank, brighter than the haze of sixty metres would let it be
      float Td=exp(-SIG*tFar*.5)*exp(-tFar*REACH);
      vec3 cv3=court(o,d,ph)*SUNC*SUNG*.019*min(pow(max(Td,1e-3),-.72),7.);
      col=mix(col,cv3,smoothstep(.0,.03,-dA));
    }
#endif
  }
#ifdef DAY
  // by day: the open doors are a row of bright openings along the wall; their light falls off into the hall and lies
  // on whatever faces them
  if(mat>0&&mat<5)col+=alb*SUNC*DAYG*exp(-(ZD-ph.z)*.06)*(.2+.8*sat(.5-.5*dot(n,vec3(0,0,-1))+.3*n.y))*ao*(mat==4?.35:1.);
#endif
  float T=exp(-SIG*tFar*.5)*exp(-tFar*REACH);
  vec3 c1=col*T+acc+mix(LC,AMBC,sat(AMB*15.))*HZ*(1.-T)*(.15+2.5*T)*(m>.5?.4:1.);
  if(m>.5){oC=vec4(c1,tFar);return;}
  oC=vec4(c1,isFloor?1.:0.)*uP[14].z;
}
#ifdef E8
uniform sampler2D uPv;
void main(){mainS();vec4 q=texelFetch(uPv,ivec2(gl_FragCoord.xy),0);q.rgb*=q.rgb;vec3 v=q.rgb/max(1.-q.rgb,1e-5)+max(oC.rgb,0.);float a=q.a/max(1.-q.a,1e-5)+max(oC.a,0.);oC=vec4(sqrt(v/(v+1.)),a/(a+1.));}
#endif
`,Ut=`uniform vec4 uP[17];
layout(location=0) in vec4 aL;
layout(location=1) in float aR;
out vec4 vL;out float vR;
void main(){
  int v=gl_VertexID;float u=(v&1)==1?1.:-1.,w=(v&2)==2?1.:0.;
  vec3 P=aL.xyz+uP[2].xyz*u*.5+vec3(0.,mix(-.32,uP[4].z-aL.y,w),0.);
  if(uP[0].w>.5)P.y=-P.y;
  vec3 r=P-uP[0].xyz;
  gl_Position=vec4(dot(r,uP[2].xyz)/uP[1].w,dot(r,uP[3].xyz)/uP[1].w,0.,dot(r,uP[1].xyz));
  vL=aL;vR=aR;
}`,Mt=Ne+`
uniform sampler2D uT;
in vec4 vL;in float vR;
void main(){
  vec2 ndc=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz,L=vL.xyz;float sg=1.;
  if(uP[0].w>.5){L.y=-L.y;sg=-1.;}
  uvec4 tx=uvec4(texelFetch(uT,ivec2(gl_FragCoord.xy),0)*255.+.5);
  float tS=float((tx.r<<16u)|(tx.g<<8u)|tx.b)/16777215.*512.;
  vec3 ol=L-o;float bl=dot(ol,d);
  vec3 cr=ol-d*bl;float c2=dot(cr,cr);
  float ex=exp(-SIG*max(bl,0.))*exp(-max(bl,0.)*REACH*1.1);
  float fp=max(bl,.1)*1.45/uP[3].w,br=vL.w;
  vec3 em=vec3(0);float al=0.;
  if(bl>0.&&bl<tS){
    // a dark brass ring (a polycandelon) carrying eight glass cups, each with a small flame, on three chains to a hook
    vec3 ex3=normalize(vec3(d.z,0.,-d.x)+1e-5),ey3=cross(d,ex3);
    vec2 w2=-vec2(dot(cr,ex3),dot(cr,ey3));
    float cy3=sqrt(max(1.-d.y*d.y,0.))*sg,ra=.3,rb=ra*abs(d.y)+.004,rot=vR;
    vec2 e2=w2/vec2(ra,rb);
    float dr=abs(dot(e2,e2)-1.)/(2.*length(w2/vec2(ra*ra,rb*rb))+1e-4);
    float ring=cv(dr,.016,fp);
    float th=at2(e2.y,e2.x)-rot,kk=floor(th/.7854+.5)*.7854+rot;
    vec2 cp=vec2(ra*cos(kk),rb*sin(kk)-.035*cy3);
    float glass=cv(length((w2-cp)*vec2(1.,.8)),.034,fp);
    float fl=cv(length((w2-cp-vec2(0.,.03*cy3))*vec2(1.5,.8)),.011,fp);
    float hk=.72*cy3,chn=0.;
    for(int k=0;k<3+L0;k++){
      float a3=rot+float(k)*2.094+1.;vec2 a0=vec2(ra*cos(a3),rb*sin(a3)),ab=vec2(0.,hk)-a0;
      float h=sat(dot(w2-a0,ab)/dot(ab,ab));chn=max(chn,cv(length(w2-a0-ab*h),.004,fp));
    }
    al=max(ring*.9,chn*.75)*(1.-glass);
    em=LC*br*ex*((.05+.06*sat(-w2.y*sg/.1+.5))*ring*(1.-glass)+glass*.5*vec3(1.,.9,.8)+fl*vec3(1.4,1.25,1.1)*3.);
    // the air round the flames: a halo no wider than a hand
    em+=LC*br*ex*.0018/(c2+.006)*exp(-c2*7.);
  }
  // the chain it hangs from, up into the dark
  vec2 ol2=L.xz-o.xz,d2=d.xz;float dd2=dot(d2,d2)+1e-8,tc=dot(ol2,d2)/dd2;
  float yc=(o.y+d.y*tc)*sg,ly=L.y*sg;
  if(yc>ly+.72&&yc<HC&&tc>0.&&tc<tS){
    float dl=abs(ol2.x*d2.y-ol2.y*d2.x)/sqrt(dd2);
    al=max(al,.7*cv(dl,.006,tc*1.45/uP[3].w)*sat(1.5-bl/24.));
  }
#ifdef E8
  vec3 ev=max(em,0.);oC=vec4(sqrt(ev/(ev+1.)),al);
#else
  oC=vec4(em,al);
#endif
}
`,Lt=`
uniform sampler2D uPv,uLt;
out vec4 oC;
void main(){ivec2 c=ivec2(gl_FragCoord.xy);vec4 q=texelFetch(uPv,c,0),l=texelFetch(uLt,c,0);q.rgb*=q.rgb;l.rgb*=l.rgb;vec3 v=q.rgb/max(1.-q.rgb,1e-5)*(1.-l.a)+l.rgb/max(1.-l.rgb,1e-5);oC=vec4(sqrt(v/(v+1.)),q.a);}
`,Ft=`
uniform sampler2D uA,uR;uniform vec4 uQ[5];
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
#ifdef E8
vec3 dE(vec3 e){e*=e;return e/max(1.-e,1e-5);}
#endif
void main(){
  vec2 uv=gl_FragCoord.xy*uQ[0].x;
  vec4 a=texture(uA,uv);
#ifdef E8
  a.rgb=dE(a.rgb);a.a/=max(1.-a.a,1e-5);
#endif
  vec3 col=a.rgb;
  float cov=clamp(a.a,0.,1.);
  if(cov>.001){
    vec2 ndc=uv*2.-1.;
    vec3 d=normalize(uQ[1].xyz+(ndc.x*uQ[2].xyz+ndc.y*uQ[3].xyz)*uQ[1].w);
    float tf=uQ[0].y/max(-d.y,.002);
    // wear: duller lanes down the middle of each nave, where the feet go
    vec2 fq=uQ[4].xy+d.xz*tf;
    float fx=fq.x,lane=smoothstep(1.5,.3,abs(mod(fx,6.4)-3.2));
    float wet=smoothstep(1.4,1.,abs(fx-uQ[4].w));
    // the slab under the pixel (the shade pass's grid): its own polish and a hair of tilt, so the image breaks at joints
    vec2 g=vec2(fq.x/.62,fq.y/.86+.5*mod(floor(fq.x/.62),2.)),id=floor(g),fg=g-id;
    float hs=fract(sin(dot(id,vec2(12.9898,78.233)))*43758.5453);
    // the blur comes from the surface: near a mirror on clean slab, dull in the lane
    float rough=mix(clamp(.006+.012*hs+uQ[4].z*.5+lane*(.2+uQ[4].z),.003,.9),.004,wet);
    vec2 jw=max(fwidth(g),vec2(1e-5));
    vec2 jp=min(fg,1.-fg)/jw,wp=vec2(.0035/.62,.0035/.86)/jw;
    float jc=max(sat(wp.x-jp.x+.5)*min(1.,2.*wp.x),sat(wp.y-jp.y+.5)*min(1.,2.*wp.y));
    vec2 tilt=(vec2(fract(hs*7.13),fract(hs*3.71))-.5)*2.2*uQ[0].x;
    vec3 s=vec3(0);float W=0.;
    // a spiral of taps, stretched along the view ray's plane (glossy reflections streak toward the viewer)
#ifdef E8
    float ra=texture(uR,uv).a;ra/=max(1.-ra,1e-5);float tr=max(ra-tf,0.);
#else
    float tr=max(texture(uR,uv).a-tf,0.);
#endif
    float blur=rough*tr/(tr+tf+1.)*.075+.0006;
    float gx=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))))*6.2832;
    for(int i=0;i<14;i++){
      float fi=float(i)+.5;float r=sqrt(fi/14.);float an=fi*2.39996+gx;
      vec2 o=vec2(cos(an)*.6,sin(an)*1.4)*r*blur;
      vec4 q=texture(uR,uv+tilt+o);
#ifdef E8
      q.rgb=dE(q.rgb);
#endif
      float w=1.-r*r*.5;
      s+=q.rgb*w;W+=w;
    }
    vec3 rc=s/W;rc/=1.+max(rc.r,max(rc.g,rc.b))*.15;
    float cosv=max(-d.y,0.);
    float F=uQ[0].z+(1.-uQ[0].z)*pow(1.-cosv,4.);
    F*=mix(1.,.55,sat(rough*3.))*(1.-.3*lane*(1.-wet));
    col=col*(1.-cov*F*.5)+rc*F*uQ[0].w*(1.+.6*wet)*cov;
    col*=1.-.4*jc*cov;
  }
#ifdef E8
  col=max(col,0.);oC=vec4(sqrt(col/(col+1.)),1.);
#else
  oC=vec4(col,1.);
#endif
}
`,_t=`
uniform vec4 uC[3];
uniform sampler2D uF;uniform sampler3D uN;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uC[0].y;
  vec4 a=texture(uF,uv);
#ifdef E8
  a.rgb*=a.rgb;a.rgb/=max(1.-a.rgb,1e-5);
#endif
  vec3 col=a.rgb;
  float t=uC[0].z;
  // the flames waver a little, each lamp on its own uneven clock: two drifts through the noise at unrelated rates, so
  // nothing ever comes round
  // only the flames and their glass: bright and warm (the door's light is cool and stays still)
  float fm=smoothstep(.45,1.4,dot(col,vec3(.3,.55,.15)))*clamp((col.r-col.b*1.7)/max(col.r,1e-3)*2.,0.,1.);
  if(fm>.001){
    float f=texture(uN,vec3(uv*.35+vec2(t*.0131,t*.0077),t*.0293)).r+texture(uN,vec3(uv*.9-vec2(t*.0089,0.),t*.0617+.4)).r-1.;
    col*=1.+fm*f*.3;
  }
  vec2 vg=uv-.5;col*=1.-.12*dot(vg,vg);
  col*=uC[0].x;
  col=col/(1.+col*.3)*1.15;
  col=pow(max(col,vec3(0.)),vec3(1./2.2));
  col=mix(col,col*col*(3.-2.*col),.25);
  float gg=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(gg-.5)*.0055;
  oC=vec4(col,1.);
}
`,Ke=[["shadeW",1],["shadeP",4],["shadeO",2],["shadeF",3],["shadeC",5]];function Nt(t){if(t.__c639)return t.__c639;t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear");const l=(f,S)=>{const E=t.createShader(f);return t.shaderSource(E,S),t.compileShader(E),E},n=l(t.VERTEX_SHADER,_e+kt),A={},p={},z=(f,S,E)=>{const i=l(t.FRAGMENT_SHADER,_e+(e?"":`#define E8
`)+S),G=E?l(t.VERTEX_SHADER,_e+E):n,R=t.createProgram();t.attachShader(R,G),t.attachShader(R,i),t.linkProgram(R),t.flush(),A[f]={p:R,v:G,f:i}};return z("trace",zt),z("lamp",Mt,Ut),z("resolve",Ft),z("comp",_t),e||z("merge",Lt),p.mk=z,p.mkNoise=()=>{let f=1671068430;const S=64,E=new Float32Array(S*S*S),i=new Float32Array(S*S*S);for(let h=0;h<E.length;h++){f=f+1831565813|0;let s=Math.imul(f^f>>>15,1|f);s=s+Math.imul(s^s>>>7,61|s)^s,E[h]=((s^s>>>14)>>>0)/4294967296}const G=[.25,.5,.25],R=(h,s,d,U,I)=>{for(let X=0;X<S;X++)for(let W=0;W<S;W++)for(let O=0;O<S;O++){let Z=0;for(let H=-1;H<=1;H++)Z+=G[H+1]*h[(O+H*d&63)+64*((W+H*U&63)+64*(X+H*I&63))];s[O+64*(W+64*X)]=Z}};R(E,i,1,0,0),R(i,E,0,1,0),R(E,i,0,0,1);let u=1e9,g=-1e9;for(let h=0;h<i.length;h++)i[h]<u&&(u=i[h]),i[h]>g&&(g=i[h]);const v=new Uint8Array(S*S*S),b=255/(g-u);for(let h=0;h<i.length;h++)v[h]=(i[h]-u)*b;return v},Object.assign(p,{P:A,flt:e,vao:t.createVertexArray(),tN:null,linked:!1}),t.__c639=p}function qt(t,e,l){if(!e.P["shadeF"+l]){for(const[n,A]of Ke)e.mk(n+l,"#define PART "+A+`
`+l+Dt);e.linked=!1}}function Ct(t,e){if(e.linked)return;const l=e.P;if(!e.tN){const A=t.createTexture();t.bindTexture(t.TEXTURE_3D,A),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,e.mkNoise()),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const p of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,p,t.REPEAT);t.pixelStorei(t.UNPACK_ALIGNMENT,4),e.tN=A,e.tK=Bt(t)}const n=e.flt?["uN","uD","uA","uR","uF","uB","uT","uW","uK"]:["uN","uD","uA","uR","uF","uB","uT","uPv","uLt","uW","uK"];e.wU=n.indexOf("uW"),e.kU=n.indexOf("uK");for(const A in l){if(!l[A].f)continue;const{p,f:z}=l[A];if(!t.getProgramParameter(p,t.LINK_STATUS))throw new Error("639 "+A+": "+(t.getShaderInfoLog(z)||"")+(t.getShaderInfoLog(l[A].v)||"")+t.getProgramInfoLog(p));t.useProgram(p),n.forEach((f,S)=>{const E=t.getUniformLocation(p,f);E&&t.uniform1i(E,S)}),l[A]={p,uP:t.getUniformLocation(p,"uP"),uC:t.getUniformLocation(p,"uC"),uQ:t.getUniformLocation(p,"uQ"),uL:t.getUniformLocation(p,"uLn")}}e.linked=!0}function Bt(t){const n=new Uint8Array(36864),A=new Float32Array(64*48),p=new Float32Array(64*48),z=R=>(R=R-Math.floor(R),Math.min(R,1-R)),f=Math.exp,S=Math.PI,E=(R,u,g,v,b,h,s,d)=>{const U=(u-v)/(b-v);if(U<0||U>1.06)return;const I=z(R-g);if(I>h+.05)return;const X=Math.min(U,1);let W=h*Math.sqrt(Math.sin(S*(X*.9+.1)));if(s&&(W*=.76+.24*Math.abs(Math.sin(X*S*4.5))),I>W){if(s){const H=Math.round(X*4.5)/4.5;d.o=Math.max(d.o,.85*f(-(((I-W)/.018)**2)-((U-H)/.035)**2))}return}const O=I/W;let Z=.45+.35*Math.sqrt(1-O*O)+.22*f(-((I/.011)**2))-.16*f(-(((I-.032)/.013)**2));s&&(Z-=.12*Math.abs(Math.sin(O*S*2.5))*(1-O*.5)),U>.8&&(Z+=.55*(U-.8)/.26),Z>d.h&&(d.h=Z,d.o=Math.min(d.o,s?.05:0),U>.64&&U<.8&&O<.7&&(d.o=Math.max(d.o,.55*(1-Math.abs(U-.74)/.1))))},i={h:0,o:0};for(let R=0;R<3;R++){for(let u=0;u<48;u++)for(let g=0;g<64;g++){const v=(g+.5)/64;if(i.h=0,i.o=.38,u<36){const b=u/35;if(R===0){E(v,b,0,-.02,.56,.22,1,i),E(v,b,.5,-.02,.56,.22,1,i),E(v,b,.25,.2,.86,.2,1,i),E(v,b,.75,.2,.86,.2,1,i);const h=z(v-.5)/.13,s=(b-.8)/.15,d=Math.hypot(h,s);if(d<1){const U=Math.atan2(s,h)/(2*S);i.h=.75+.25*Math.cos(2*S*(d*2.6-U)),i.o=.7*f(-d*d/.02)+.3*Math.max(0,-Math.cos(2*S*(d*2.6-U)))*d}}else if(R===1)E(v,b,0,-.02,.8,.4,0,i),E(v,b,.5,.3,.92,.17,0,i);else if(i.h=.6,i.o=.1,b>.1&&b<.9){const h=v*11,s=b*9,d=Math.floor(s),U=d%2?.5:0,I=Math.floor(h-U)+.5+U,X=Math.abs(h-I),W=Math.abs(s-d-.5),O=Math.max(X*.87+W*.5,W),Z=Math.min(1,Math.min(b-.1,.9-b)/.05),H=(1-Math.min(1,Math.max(0,(O-.26)/.08)))*Z;i.h=.6+.3*Math.min(1,(O-.3)/.2)*Z-.5*H,i.o=.1+.8*H}}else{const b=(u-36)/11;if(b<.18)i.h=.9,i.o=0;else if(b<.5){const s=(b-.18)/.32;i.h=.25+.65*s*s,i.o=.45*(1-s)}else b<.6?(i.h=1,i.o=0):(i.h=.7,i.o=.05);const h=Math.hypot(z(v)/.05,(b-.8)/.18);if(h<1){const s=Math.atan2((b-.8)/.18,z(v)/.05*(v-Math.round(v)<0?-1:1));i.h=.7+.3*(1-h)*(.6+.4*Math.cos(6*s)),i.o=h<.25?.5:.15*(1-Math.cos(6*s))*(1-h)}}A[g+u*64]=i.h,p[g+u*64]=i.o}for(let u=0;u<48;u++)for(let g=0;g<64;g++){const v=u>=36,b=v?.012:.03,h=v?36:0,s=v?47:35,d=(A[(g+1)%64+u*64]-A[(g+64-1)%64+u*64])*64/2/(v?.8:.39)*b,U=(A[g+Math.min(u+1,s)*64]-A[g+Math.max(u-1,h)*64])/((Math.min(u+1,s)-Math.max(u-1,h))/(v?11:35))/(v?.17:.35)*b,I=(g+(u+R*48)*64)*4,X=W=>Math.max(0,Math.min(255,Math.round(W*255)));n[I]=X(A[g+u*64]),n[I+1]=X(d/4+.5),n[I+2]=X(U/4+.5),n[I+3]=X(p[g+u*64])}}const G=t.createTexture();return t.bindTexture(t.TEXTURE_2D,G),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,64,48*3,0,t.RGBA,t.UNSIGNED_BYTE,n),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.bindTexture(t.TEXTURE_2D,null),G}function fe(t,e,l,n,A,p){const z=t.createTexture();t.bindTexture(t.TEXTURE_2D,z),A&&e.flt?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,l,n,0,t.RGBA,t.HALF_FLOAT,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,l,n,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,p),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,p),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const f=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,f),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,z,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:z,fb:f,w:l,h:n}}Qe.add({num:639,name:"Striped Arches",fam:"Vistas",recipe:"A great hall of slender mismatched columns carrying two tiers of striped horseshoe arches, rank behind rank into the dark, over a pale polished floor. The lamp colour, the stone, the doors (one open, a row open on a sunny courtyard, or all shut), where you stand and how the bays are built change every mint. No controls, just look.",music:!1,gl:!0,fps:30,seed:0,make(t){const e=t.gl,l=t.size,n=Nt(e);let A=parseInt(t.hash.slice(2,10),16)|0;const p=()=>{A=A+1831565813|0;let a=Math.imul(A^A>>>15,1|A);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},z=a=>{let c=0;for(const r of a)c+=r[1];let o=p()*c;for(const r of a)if(o-=r[1],o<=0)return r[0];return a[0][0]},f=t.home,S=f?"Oil amber":z([["Oil amber",5],["Beeswax",3],["Copper",2],["Pale wick",2],["Ember",1]]),E=f?"Long dark":z([["Long dark",5],["Close dark",2],["Deep reach",3]]),i=f?"Oxblood and cream":z([["Oxblood and cream",5],["Terracotta and ivory",3],["Ochre and limestone",2],["Whitewashed",1]]),G=f?"One door":z([["One door",5],["Wide morning",3],["Ajar",2]]),R=f?"Polished":z([["Polished",5],["Mirror wax",3],["Worn",2]]),u=f?"Diagonal":z([["Diagonal",4],["Down the nave",3],["Across the ranks",3]]);let g=f?"Many":z([["Many",5],["Few",2],["All lit",2]]),v=parseInt(t.hash.slice(10,18),16)^1369899022|0;const b=()=>{v=v+1831565813|0;let a=Math.imul(v^v>>>15,1|v);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},h=a=>{let c=0;for(const r of a)c+=r[1];let o=b()*c;for(const r of a)if(o-=r[1],o<=0)return r[0];return a[0][0]},s=f?"Standing":h([["Standing",3],["Long lens",2],["Low",2],["Looking up",1.5],["At a shaft",1.5],["On the axis",1.5]]);let d=f?"Lamps":h([["Lamps",5],["One lamp",1.4],["Doors open",2],["First light",1.6]]);const U=f?"Brick and stone":h([["Brick and stone",6],["Painted bays",2],["Dark shafts",2]]),I=!f&&b()<.14;d==="First light"&&(d="Lamps",g="Few");const X=b(),W=b(),O=b();let Z=parseInt(t.hash.slice(18,26),16)^1671171555|0;const H=()=>{Z=Z+1831565813|0;let a=Math.imul(Z^Z>>>15,1|Z);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};let Q=f?"":(a=>{let c=0;for(const r of a)c+=r[1];let o=H()*c;for(const r of a)if(o-=r[1],o<=0)return r[0];return a[0][0]})([["",56],["Looking back",12],["Up among the arches",10],["By the doors",14],["By the doors",8]]);const It=H();Q==="Up among the arches"&&d==="One lamp"&&(d="Lamps");const ee=d==="Doors open",ue=!f&&H()<.12&&!ee&&Q!=="By the doors",be=H(),ve=H(),Je=H(),ye=!f&&It<.23&&!ee&&(Q===""||Q==="Looking back")&&s!=="Looking up";t.trait("Lamps",S),t.trait("Dark",E),t.trait("Stone",i),t.trait("Shaft",ue?"Shut":ee?"Open to the court":G),t.trait("Floor",I?"Washed lane":R),t.trait("Stand",Q||(s==="Standing"?u:s)),t.trait("Light",ue?g==="Few"||d==="One lamp"?"Shut, few lamps":"Shut, lamps":ee?"By day":d!=="Lamps"?d:g==="Many"?"Many lamps":g==="Few"?"Few lamps":"Every lamp"),t.trait("Hall",ye?"Lantern bay":U);const $e=(ee?`#define DAY
`:"")+(ue?`#define SHUT
`:"")+(ee||Q==="By the doors"?`#define CRT
`:"")+(ye?`#define LANT
`:"");qt(e,n,$e);const ie={"Oil amber":[1,.54,.2],Beeswax:[1,.62,.27],Copper:[1,.42,.14],"Pale wick":[1,.74,.46],Ember:[1,.3,.1]}[S],le={"Oxblood and cream":[[.82,.68,.46],[.46,.13,.08],.22],"Terracotta and ivory":[[.88,.76,.55],[.58,.24,.12],.3],"Ochre and limestone":[[.76,.66,.46],[.5,.32,.12],.2],Whitewashed:[[.9,.84,.7],[.5,.2,.13],.78]}[i],F=6.4,V=3,et=3.35,Xt=et+.62,Wt=1.25,Ot=1.72,Ht=6.05,jt=1.2,Yt=1.62,tt=9.7,Gt=.28,ca=64,qe=F*.5,Zt=E==="Close dark"?.03:E==="Deep reach"?.008:.016,Vt=E==="Close dark"?1/19:E==="Deep reach"?1/150:1/46,at=(E==="Close dark"?1.35:1)*(g==="Few"?1.5:g==="All lit"?.86:1)*(d==="First light"?.8:d==="One lamp"?2.1:d==="Doors open"?.8:1),Qt=ue?0:20*(G==="Wide morning"?1.3:G==="Ajar"?.8:1)*(s==="On the axis"?.72:1)*(d==="First light"?.5:1),Ce=G==="Wide morning"?3.4:G==="Ajar"?1.1:2.6,Pe=G==="Wide morning"?6.4:G==="Ajar"?5.2:6.3,ot=R==="Mirror wax"?1.25:R==="Worn"?.55:1,Be=R==="Worn"?.4:R==="Mirror wax"?-.14:0,Ie=s==="On the axis"?.125:G==="Wide morning"?.14:.11,rt=s==="On the axis"?0:d==="Doors open"?-.09:-.068,Xe=[Math.sin(rt)*Math.cos(Ie),Math.sin(Ie),Math.cos(rt)*Math.cos(Ie)];let J=u==="Across the ranks"?1.12+p()*.36:u==="Down the nave"?.06+p()*.17:f?.48:.34+p()*.4;const Kt=u==="Across the ranks"?.1:.13,x=[F*.5+(f?-.55:-1.5+p()*2.6),1.58,f?-1.3:-1.5+p()*2.9];ee&&!Q&&(x[2]+=22+be*18);const ke=Q==="By the doors"?63.2:64;if(!f){let a=J,c=-1;for(let o=0;o<9;o++){const r=J+(o-4)*.05;let m=9;for(let w=-1;w<3;w++)for(let k=-2;k<4;k++){const P=w*F-x[0],N=k*V-x[2],M=Math.hypot(P,N);M>9||N*Math.cos(r)+P*Math.sin(r)<.4||(m=Math.min(m,Math.abs(Math.atan2(P,N)-r)/(1.5/M+.1)))}m>c&&(c=m,a=r)}J=a}let oe=-99,ae=Kt,he=Math.tan(36*Math.PI/180);if(s==="Long lens")J=Math.PI/2+(X-.5)*.1,ae=.2+W*.05,he=Math.tan(11*Math.PI/180),x[0]=F*.5+(O-.5)*2,x[2]=(Math.round(x[2]/V)+.5)*V+(O-.5)*.5;else if(s==="Low")x[1]=.3,ae=.12;else if(s==="Looking up")ae=.42+W*.16,he=Math.tan(40*Math.PI/180);else if(s==="At a shaft"){oe=1+Math.floor(X*2);const a=V*oe,c=2.5+W*.7;x[0]=F+Math.cos(c)*2.1,x[2]=a-Math.sin(c)*2.1*(O<.5?1:-1),J=Math.atan2(F-x[0],a-x[2])-.22,ae=.36}else s==="On the axis"&&(x[0]=qe,J=0,ae=.07);if(Q==="Looking back")J+=Math.PI;else if(Q==="Up among the arches")x[0]=F*.5+(be-.5)*1.4,x[1]=6.2+ve*.6,x[2]=(Je-.5)*2,ae=-.12-ve*.08,he=Math.tan(38*Math.PI/180),oe=-99;else if(Q==="By the doors"){const a=be<.5?1:-1;x[0]=F*.5+(ve-.5)*1.6,x[1]=1.58,x[2]=ke-7-Je*5,J=a*(.96+ve*.44),ae=.06,he=Math.tan(36*Math.PI/180),oe=-99}ye&&s==="Long lens"&&(ae=.03);const st=I?qe+F*(O<.5?0:1):-999,re=new Float32Array(4);if(ye){const a=s==="Long lens",c=a?14+be*8:8+be*10,o=a?26:18,r=Math.floor(x[0]/F),m=Math.round(x[2]/V);let w=-1e9,k=Math.atan(he)*.6;for(let P=0;P<2&&w<-1e8;P++,k*=1.6)for(let N=-5;N<=5;N++)for(let M=-9;M<=9;M++){const j=(r+N+.5)*F,C=(m+M+.5)*V,B=j-x[0],L=C-x[2],T=Math.hypot(B,L);if(T<8||T>o||C>ke-6)continue;const Y=Math.abs(((Math.atan2(B,L)-J)%6.2832+9.4248)%6.2832-3.1416);if(Y>k)continue;let de=1.2;for(let ce=-5;ce<=5;ce++)for(let Te=-9;Te<=9;Te++){const se=(r+ce)*F-x[0],me=(m+Te)*V-x[2],te=(se*B+me*L)/(T*T);te>0&&te<1-2.6/T&&(de=Math.min(de,Math.abs(se*L-me*B)/T))}const Me=de-.5*Y/k-.02*Math.abs(T-c);Me>w&&(w=Me,re[0]=j,re[1]=C)}re[2]=2.3,re[3]=w>-1e9?1.45:0}const nt=s==="At a shaft"?2.2:s==="Long lens"?14:6.5,Jt=x[0]+Math.sin(J)*nt,$t=x[2]+Math.cos(J)*nt,ea=oe>-99?0:Math.floor(Jt/F),ta=oe>-99?oe:Math.round($t/V),D=new Uint8Array(64*3*64*4),it=Math.round(x[2]/V)||0,lt=Q==="Looking back",aa=(g==="Few"?.22:g==="All lit"?.7:.42)*(ee?.25:1);for(let a=0;a<64;a++)for(let c=0;c<64;c++){const o=(c*3+a*64*3)*4,r=()=>p()*255;D[o]=r(),D[o+1]=r(),D[o+2]=255*Math.pow(p(),1.2),D[o+3]=p()<aa?130+p()*125:0,D[o+4]=r(),D[o+5]=r(),D[o+6]=r(),D[o+7]=r(),D[o+8]=r(),D[o+9]=r(),D[o+10]=r(),D[o+11]=r();const m=c>31?c-64:c,w=a>31?a-64:a;m===0&&Math.abs(w*V-x[2])<3.2&&(D[o+3]=0),m===0&&(w===it+(lt?-2:2)||w===it+(lt?3:-3))&&(D[o+3]=190),m===0&&w===oe&&(D[o+3]=230),d==="One lamp"&&(D[o+3]=m===ea&&w===ta?255:0),ye&&Math.hypot(m*F+F*.5-.22-D[o+5]/255*.55-re[0],w*V+(D[o+6]/255-.5)*V*.78-re[1])<5&&(D[o+3]=0)}const ct=e.createTexture();e.bindTexture(e.TEXTURE_2D,ct),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,64*3,64,0,e.RGBA,e.UNSIGNED_BYTE,D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const ft=Ce+","+Pe;n.wT=n.wT||{};let ze=n.wT[ft];if(!ze){ze=n.wT[ft]=e.createTexture();const a=256,c=192,o=new Uint8Array(a*c*4),r=Ce*.5,m=r*1.16,w=Pe-m,k=w-Math.sqrt(m*m-r*r),P=(L,T)=>{let Y=Math.imul(L*73856093^T*19349663,1540483477);return Y^=Y>>>13,Y=Math.imul(Y,1540483477),((Y^Y>>>15)>>>0)/4294967296},N=Pe+.55+.25,M=m+.55+.3,j=21,C=(Math.PI+3.8)/j,B=a>>1;for(let L=0;L<c;L++){const T=(L+.5)/c*tt,Y=Math.floor(T/.47),de=T/.47-Y,Me=3.2+Y%2*.55+P(Y,7)*.4,ce=Y%3===0?1.3:1.05,Te=Math.min(de,1-de)*.47;for(let se=0;se<a;se++){const me=se<B?0:1,te=(se%B+.5)/B*F-F*.5,gt=(te+Me)/ce,Ye=Math.floor(gt),Le=gt-Ye;let pe=.7+.22*P(Y*31+Ye,me),Re=-.08,Ae=1,Se=Math.min(Te,Math.min(Le,1-Le)*ce);if(T<.32&&(pe=.58+.06*P(Ye,3),Ae=.85,Se=Math.min(Math.abs(T-.32),Math.min(Le,1-Le)*ce)),me===0&&Math.abs(te)<M+.02&&T>k-.52&&T<N+.02){const xe=Math.abs(te),ne=Math.sqrt(te*te+(T-w)*(T-w)),Tt=xe<M&&T>k-.5&&T<N,$=Math.min(M-xe,N-T);if(Tt&&$<.32?(pe=.86,Ae=$<.05?1.08:$<.12?.62+.3*Math.abs($-.085)/.035:$<.19?1.02:$<.26?.8:.66,Se=Math.min($,Math.abs($-.05),Math.abs($-.12),Math.abs($-.19),Math.abs($-.26),Math.abs($-.32))):Tt&&(pe=.78+.06*P(Y,11)),ne>m-.01&&ne<m+.56&&T>k-.3){const ia=Math.atan2(T-w,te),Rt=(ia+1.9)/C,Ge=Math.floor(Rt),Ze=Rt-Ge,At=Ge%2!==0,Ve=Math.min(Ze,1-Ze)*C*ne;if(pe=(At?.9:1.02)*(.9+.1*P(Ge,5)),Ae=1,Se=Math.min(Ve,Math.abs(ne-m),Math.abs(m+.55-ne)),At){const St=Ze*4%1;Re=Math.min(Ve,Math.min(St,1-St)*C*ne*.25-.005)}else Re=-Ve;(ne<m||ne>m+.55)&&(Re=-.08)}}if(me===0&&T<.32&&Math.abs(te)<r+.3){const xe=Math.abs(te);pe=.82-.1*Math.exp(-xe*xe),Ae=1,Re=-.08,Se=Math.min(Math.abs(T-.32),r+.3-xe)}const Fe=(se+L*a)*4;o[Fe]=Math.min(255,Se/.12*255),o[Fe+1]=Math.max(0,Math.min(255,(.5+Re/.16)*255)),o[Fe+2]=Math.min(255,pe/1.25*255),o[Fe+3]=Math.min(255,Ae/1.1*255)}}e.bindTexture(e.TEXTURE_2D,ze),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,a,c,0,e.RGBA,e.UNSIGNED_BYTE,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}const we=s==="Low"||R==="Mirror wax"?l:l>>1,De=fe(e,n,l,l,!1,e.NEAREST),Ee=fe(e,n,l,l,!0,e.LINEAR),We=fe(e,n,we,we,!0,e.LINEAR),ht=fe(e,n,l,l,!0,e.LINEAR),dt=n.flt?null:fe(e,n,l,l,!1,e.NEAREST),mt=n.flt?null:fe(e,n,l,l,!1,e.NEAREST),oa=he,y=new Float32Array(17*4),q=(a,c,o,r,m)=>{y[a*4]=c,y[a*4+1]=o,y[a*4+2]=r,y[a*4+3]=m};q(4,F,V,tt,ke),q(5,et,Xt,Wt,Ot),q(6,Ht,jt,Yt,Gt),q(7,ie[0],ie[1],ie[2],.008),q(8,Zt,Vt,.0034,3.2*at),q(9,le[0][0],le[0][1],le[0][2],ot),q(10,le[1][0],le[1][1],le[1][2],le[2]),q(11,Xe[0],Xe[1],Xe[2],qe),q(12,Ce,Pe,Qt,2.55),ee?q(13,.8,.9,1.12,Be):q(13,.9,.95,1.06,Be);const Oe=ie;q(15,Oe[0],Oe[1],Oe[2],U==="Painted bays"?1:U==="Dark shafts"?2:0);const ra=ee||Q==="By the doors"?F*(ve<.5?1:2):0;q(16,st,.006*at*(E==="Close dark"?.7:1),ra,ee?.12:0),d==="One lamp"&&(y[8*4+2]=.0028),ue&&(y[8*4+2]*=.7),Ct(e,n);const pt=Ke.map(([a])=>n.P[a+$e]),_=new Float32Array(5*4),K=new Float32Array(3*4);let xt=1e9,ut=1e9,bt=1e9,vt=1e9,yt=1e9,ge=99;const Ue=[[.125,.375],[-.375,.125],[.375,-.125],[-.125,-.375]],He=[];for(let a=-26;a<=21;a++)for(let c=-12;c<=12;c++){const o=((c&63)*3+(a&63)*64*3)*4;if(D[o+3]<5)continue;const r=D[o+3]/255,m=c*F+F*.5-.22-D[o+5]/255*.55,w=a*V+(D[o+6]/255-.5)*V*.78;w>ke-.5||Math.hypot(m-x[0],w-x[2])>80||He.push(m,2.55+r*37%1*.9,w,r,D[o]/255*13%1*6.283)}const wt=He.length/5,je=e.createVertexArray(),sa=e.createBuffer();e.bindVertexArray(je),e.bindBuffer(e.ARRAY_BUFFER,sa),e.bufferData(e.ARRAY_BUFFER,new Float32Array(He),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,20,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,1,e.FLOAT,!1,20,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null),e.bindBuffer(e.ARRAY_BUFFER,null);function na(a){const c=n.P.trace,o=n.P.lamp;e.bindVertexArray(n.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,n.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,ct),e.activeTexture(e.TEXTURE0+n.wU),e.bindTexture(e.TEXTURE_2D,ze),e.activeTexture(e.TEXTURE0+n.kU),e.bindTexture(e.TEXTURE_2D,n.tK),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND);const r=(k,P,N)=>{const M=k.w,j=k.h;let C=k,B=dt;e.disable(e.BLEND),N||(e.bindFramebuffer(e.FRAMEBUFFER,k.fb),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT));for(let L=0;L<P;L++){q(14,P>1?Ue[L][0]:0,P>1?Ue[L][1]:0,1/P,0),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,De.fb),e.viewport(0,0,M,j),e.useProgram(c.p),e.uniform4fv(c.uP,y),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,De.tex);for(const T of pt){e.bindFramebuffer(e.FRAMEBUFFER,B.fb),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,C.tex),e.useProgram(T.p),e.uniform4fv(T.uP,y),T.uL&&e.uniform4fv(T.uL,re),e.drawArrays(e.TRIANGLES,0,3);const Y=C;C=B,B=Y}}e.bindFramebuffer(e.FRAMEBUFFER,mt.fb),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(o.p),e.uniform4fv(o.uP,y),e.bindVertexArray(je),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,wt),e.bindVertexArray(n.vao),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,B.fb),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,C.tex),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,mt.tex),e.useProgram(n.P.merge.p),e.drawArrays(e.TRIANGLES,0,3);{const L=C;C=B,B=L}C!==k&&(e.bindFramebuffer(e.READ_FRAMEBUFFER,C.fb),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,k.fb),e.blitFramebuffer(0,0,M,j,0,0,M,j,e.COLOR_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,null)),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,k.fb),e.viewport(0,0,M,j)},m=(k,P,N)=>{if(dt)return r(k===Ee.fb?Ee:We,P,N);for(let M=0;M<P;M++){q(14,P>1?Ue[M][0]:0,P>1?Ue[M][1]:0,1/P,0),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,null),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,De.fb),e.useProgram(c.p),e.uniform4fv(c.uP,y),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,De.tex),e.bindFramebuffer(e.FRAMEBUFFER,k),N&&(e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE));for(const j of pt)e.useProgram(j.p),e.uniform4fv(j.uP,y),j.uL&&e.uniform4fv(j.uL,re),e.drawArrays(e.TRIANGLES,0,3)}e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.useProgram(o.p),e.uniform4fv(o.uP,y),e.bindVertexArray(je),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,wt),e.bindVertexArray(n.vao),e.disable(e.BLEND)};e.bindFramebuffer(e.FRAMEBUFFER,Ee.fb),e.viewport(0,0,l,l),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),y[0*4+3]=0,y[3*4+3]=l,m(Ee.fb,a,!0),y[0*4+3]=1,q(14,0,0,1,0),y[3*4+3]=we,e.viewport(0,0,we,we),m(We.fb,1,!1),y[0*4+3]=0,y[3*4+3]=l;const w=n.P.resolve;e.useProgram(w.p),e.bindFramebuffer(e.FRAMEBUFFER,ht.fb),e.viewport(0,0,l,l),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Ee.tex),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,We.tex),_[0]=1/l,_[1]=y[1],_[2]=.1,_[3]=1.3*ot,_[4]=y[4],_[5]=y[5],_[6]=y[6],_[7]=y[7],_[8]=y[8],_[9]=y[9],_[10]=y[10],_[11]=0,_[12]=y[12],_[13]=y[13],_[14]=y[14],_[15]=0,_[16]=y[0],_[17]=y[2],_[18]=Be,_[19]=st,e.uniform4fv(w.uQ,_),e.drawArrays(e.TRIANGLES,0,3)}function Et(a,c){const o=t.view||Pt,r=J+(o.yaw||0),m=ae+(o.pitch||0),w=x[0]+(o.x||0),k=x[1]+(o.y||0),P=x[2]+(o.z||0),N=r!==xt||m!==ut||w!==bt||k!==vt||P!==yt;if(N||ge===6){N&&(xt=r,ut=m,bt=w,vt=k,yt=P);const j=Math.cos(m),C=Math.sin(m),B=Math.cos(r),L=Math.sin(r);q(0,w,k,P,0),q(1,L*j,C,B*j,oa),q(2,B,0,-L,0),q(3,-L*C,j,-B*C,l),na(N&&ge>0&&a>0?1:4),ge=N?0:7}else ge<7&&ge++;const M=n.P.comp;e.useProgram(M.p),e.bindVertexArray(n.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,l,l),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,n.tN),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,ht.tex),K[0]=1.54,K[1]=1/l,K[2]=a,K[3]=0,K[4]=1,K[5]=0,K[6]=0,K[7]=0,K[8]=ie[0],K[9]=ie[1],K[10]=ie[2],K[11]=0,e.uniform4fv(M.uC,K),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}return Et(0,0),Et}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
