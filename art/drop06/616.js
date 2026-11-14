// Container Port: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/616.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(at){at&&function(){"use strict";const Bt={yaw:0,pitch:0,x:0,y:0,z:0},lt=0,ut=lt&&[{Standpoint:"Quay edge"},{Standpoint:"Quay edge",Ship:"Empty berth"},{Standpoint:"From the stack top"},{Standpoint:"From the stack top",Fog:"Thick"},{Standpoint:"Yard canyon",Fog:"Blue dawn",Stacks:"Towering"},{Standpoint:"Yard canyon",Fog:"Thick",Lamps:"Dying sodium"},{Fog:"Thick",Lamps:"White LED"},{Standpoint:"Under the cranes",Cranes:"Booms raised",Rain:"Steady rain"}],dt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp sampler3D;
`,Ht="void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));gl_Position=vec4(p*2.-1.,0.,1.);}",ot=`
uniform vec4 uP[25];
uniform vec4 uPal[8];
uniform sampler2D uD,uL,uM,uX,uG,uSp;
uniform sampler3D uN;
out vec4 oC;
#define CX uP[4].x
#define CZ uP[4].y
#define HT uP[4].z
#define CP uP[4].w
#define XH uP[5].x
#define HH uP[5].y
#define XQ uP[5].z
#define SIG uP[5].w
#define FOGC uP[6].rgb
#define FOGH uP[6].w
float n3(vec3 p){return textureLod(uN,p,0.).r;}
#define NS(p,m) n3((p)/(m)*.0625)
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float sat(float x){return clamp(x,0.,1.);}
`,Gt=`${ot}
// the noise with a smooth cell ramp, for outlines that must not show the texel grid (puddle edges)
float n3s(vec3 p){p=p*64.-.5;vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return textureLod(uN,(i+f+.5)/64.,0.).r;}
#define NSS(p,m) n3s((p)/(m)*.0625)
vec3 shadeGround(vec3 P,vec3 d,float t,out float pud){
  float x=P.x,z=P.z;
  // slabs
  float sw=6.1,sl=7.3;
  float jx=abs(fract(x/sw)-.5)*sw,jz=abs(fract((z+floor(x/sw)*1.7)/sl)-.5)*sl;
  float js=smoothstep(.03,.0,min(sw*.5-jx,sl*.5-jz))*sat(1.5-t/60.);
  vec2 off=uP[12].zw;float lo=NS(vec3(x+off.x,0,z+off.y)*.18,1.2),md=NS(vec3(x,1.,z)*.75,1.),hi=NS(vec3(x,3.,z)*3.2,1.);
  float slab=h21(floor(vec2(x/sw,(z+floor(x/sw)*1.7)/sl))*.37);
  float fine=NS(vec3(x,2.,z)*17.,1.);
  vec3 alb=vec3(.28,.285,.29)*(.62+.34*slab+.38*lo)*(.75+.5*md)*(.9+.2*hi)*(.82+.36*fine);
  alb*=1.-.7*js;
  // tyre-polished lanes and oil
  alb*=mix(1.,.72,smoothstep(.42,.72,NS(vec3(x*.45,2.,z*.08),.9)));
  // paint: worn lane lines, crane rail bed hatching
  float paint=0.;vec3 pc=vec3(.86,.62,.16);
  float wear=smoothstep(.34,.56,NS(vec3(x,5.,z)*1.1,.8))*smoothstep(.25,.5,hi);
  float lx=uP[7].y;
  vec2 lane=vec2(abs(x-lx)-.075,abs(fract(z/9.)-.5)*9.-2.6);
  // edge lines: solid yellow along the stack line and along the rail beds
  float sy=min(abs(x+7.1)-.09,min(abs(x-(uP[7].z))-.09,abs(x-(uP[7].w))-.09))+(md-.5)*.025;
  float dash=max(lane.x,-lane.y);
  float lanes=smoothstep(.03,.0,dash);
  float solid=smoothstep(.035,-.015,sy);
  // white centre dashes
  float wl=smoothstep(.03,.0,max(abs(x-(lx+6.))-.075,-(abs(fract(z/9.+.4)-.5)*9.-2.6)));
  // hatch across the crane leg beds
  float hb=min(abs(x-uP[8].z)-1.6,abs(x-uP[8].w)-1.6);
  float hatch=smoothstep(.02,0.,hb)*smoothstep(.3,.7,fract((x+z)/2.2))*step(.5,fract((x+z)/2.2+.0));
  hatch*=smoothstep(.02,.0,abs(fract((x+z)/2.2)-.5)-.28);
  paint=sat(lanes+solid+wl+hatch*.75);
  paint*=wear;
  if(hb<0.){pc=mix(pc,vec3(.85,.58,.12),.5);}
  alb=mix(alb,pc*(.7+.5*md),paint*.9);
  // rails in the bed: dark worn steel strips
  float rl=min(abs(x-uP[8].z),abs(x-uP[8].w));
  float rail=smoothstep(.05,.0,rl-.14),head=smoothstep(.02,.0,rl-.045);
  alb=mix(alb,vec3(.05,.045,.04),rail);
  alb=mix(alb,vec3(.3,.29,.28)*(.8+.4*hi),head);
  // tyre tracks along the lanes, a little polished
  float lc=x-lx-3.;float trk=smoothstep(.22,.0,abs(abs(fract(lc/6.)*6.-3.)-1.25)-.12)*smoothstep(.3,.7,NS(vec3(x*.3,4.,z*.04),.7));
  alb*=1.-.28*trk;
  // steel lids over lashing pits and drains, one in some slabs
  vec2 sc=vec2(x/sw,(z+floor(x/sw)*1.7)/sl);vec2 sf=abs(fract(sc)-.5)*vec2(sw,sl);
  float lid=step(.82,fract(slab*13.7))*smoothstep(.03,.0,max(sf.x,sf.y)-.36);
  float lrim=lid*smoothstep(.0,.04,.36-max(sf.x,sf.y))*smoothstep(.08,.04,.36-max(sf.x,sf.y));
  alb=mix(alb,vec3(.09,.085,.08)*(.8+.4*fine),lid);
  // bay numbers painted on the ground in front of the stack row, upright to drivers heading down the aisle
  float bay=floor((z-1.)/12.6);vec2 bq=vec2(x+6.55,z-1.-bay*12.6-5.4)/vec2(.92,1.1);
  float num=0.;
  if(abs(bq.x-.5)<.5&&abs(bq.y-.5)<.5&&t<70.){float dg=bq.x<.5?mod(floor(abs(bay*2.+40.)/10.),10.):mod(abs(bay*2.+40.),10.);
    num=textureLod(uX,vec2((dg*40.+2.+fract(bq.x*2.)*36.)/1024.,(642.+bq.y*60.)/704.),0.).b;}
  float nm=sat(num*wear*1.4);alb=mix(alb,vec3(.75,.73,.66)*(.7+.5*md),nm*.85);paint=max(paint,nm);
  // puddles: hollows in the slab, longest near lane centres and joints
  float wet=uP[9].x;
  // standing water lies in the slabs' shallow dishes and along the joints, with smooth simple outlines
  float p0=NSS(vec3((x+off.x)*.34,7.,(z+off.y)*.1),1.)*.85+NSS(vec3(x+off.y,9.,z+off.x)*.16,1.)*.15;
  float jd=min(sw*.5-jx,sl*.5-jz);
  float bias=.11*smoothstep(4.,.2,min(abs(x-lx-3.),abs(x-lx-9.)))+.09*smoothstep(.9,.05,jd);
  float pd=smoothstep(.645-wet,.7-wet,p0+bias)*step(0.,wet);
  pd*=1.-lid*.7;
  // paint keeps a thin film of water that shines
  float damp=smoothstep(.34-wet*.7,.62-wet*.7,NS(vec3((x+off.y)*.2,1.,(z-off.x)*.09),1.)+.2*NS(vec3(x,2.,z)*.45,1.))*.46+.05;
  pud=sat(max(damp,pd)+paint*.3+head*.6+lrim*.5+trk*.12)*(1.-.75*js*(1.-pd));
  // the crane rails' grooves stand full of water either side of the head: two bright lines to the vanishing point
  float grv=rail*(1.-head);pud=max(pud,grv*.98*step(-.05,wet));
  // wet darkens concrete and takes the colour down
  alb*=mix(.66,.3,pd);
  return alb;
}

// the ship's side: painted plating with seams, weeping rust, a rub line, draft marks near the stern
vec3 shadeHull(vec3 P,float t){
  float hn=NS(vec3(P.z,P.y,1.)*.24,1.);
  float streak=NS(vec3(P.z*2.,P.y*.1,3.),.8);
  vec3 alb=uP[13].yzw*(.7+.7*hn);
  float zm=mod(P.z-uP[12].x-.5*CP+6.,240.)-.5;
  if(abs(zm)<.5&&P.y>1.&&P.y<HH-2.){float fy=fract(P.y/2.)/.4;
    if(fy<1.){float g=textureLod(uX,vec2((mod(floor(P.y/2.)*2.,10.)*40.+2.+(.5-zm)*36.)/1024.,(642.+fy*60.)/704.),0.).b;alb=mix(alb,vec3(.55,.55,.52),g*.9);}}
  // boot-topping: red anti-fouling below the waterline band, a wide band when she rides high
  alb=mix(alb,vec3(.26,.05,.035)*(.7+.6*hn),smoothstep(uP[11].z+.06,uP[11].z-.06,P.y));
  alb=mix(alb,vec3(.03),smoothstep(.12,.0,abs(P.y-uP[11].z-.25)-.12));
  alb=mix(alb,vec3(.14,.08,.05),smoothstep(.45,.75,streak)*smoothstep(.0,3.,HH-P.y)*.5);
  float seamh=smoothstep(.02,.0,abs(fract(P.y/3.1)-.5)-.47);
  float seamv=smoothstep(.02,.0,abs(fract(P.z/11.7)-.5)-.48);
  alb*=1.-.55*max(seamh,seamv)*sat(1.8-t/110.);
  float wr=NS(vec3(P.z*2.2,P.y*.07,5.),.5)*.6+NS(vec3(P.z*5.,P.y*.2,1.),.3)*.4;
  alb=mix(alb,vec3(.12,.06,.04),smoothstep(.48,.72,wr)*.55);
  alb*=mix(1.,1.7,smoothstep(.03,.0,abs(P.y-7.)-.5)*smoothstep(.4,.6,hn));
  // the flare overhead catches the quay's light; dents show as soft patches in the plating
  alb*=mix(1.,1.6,smoothstep(HH-7.,HH-1.,P.y))*(.85+.3*NS(vec3(P.z*.5,P.y*.5,7.),1.));
  return mix(alb,vec3(.22,.2,.17),smoothstep(.6,.0,HH-P.y)*.4);
}
void main(){
  vec2 ndc=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  d+=vec3(1e-5,2e-5,-1.5e-5);
  float t=-o.y/min(d.y,-1e-4);
  // the hull where the ray meets the ship's side before the ground (the main pass decides what is nearest)
  float th=d.x>.0005&&XH>0.?(XH-o.x)/d.x:1e9;
  if(th<t||d.y>-1e-4){vec3 Q=o+d*th;oC=vec4(th<1e8&&Q.y<HH?shadeHull(Q,th):vec3(0.),1.);return;}
  vec3 P=o+d*t;
  float pud=0.;
  vec3 alb=shadeGround(P,d,t,pud);
  // the crane legs' shade on the slab round their feet
  float zz=abs(mod(P.z-uP[12].x,CP)-CP*.5);float lx0=min(abs(P.x-uP[7].z),abs(P.x-uP[7].w));
  float ld=length(vec2(max(lx0-2.5,0.),max(abs(zz-14.)-3.2,0.)));
  alb*=mix(.32,1.,smoothstep(.0,5.5,ld));
  // beyond the quay edge: the water between the ship and the wall, black
  if(P.x>XQ){alb=vec3(.0);pud=1.;}
  oC=vec4(alb,pud);
}
`,qt=`${ot}
void main(){
  vec2 ndc=gl_FragCoord.xy/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float t=-o.y/min(d.y,-1e-4);
  float th=d.x>.0005&&XH>0.?(XH-o.x)/d.x:1e9;
    // wet concrete and wet plate: each lamp's highlight stretched toward the eye on the ground, down the plate on the hull
    bool hl=th<t||d.y>-1e-4;vec3 P=o+d*min(th,t);vec3 sN=hl?vec3(-1,0,0):vec3(0,1,0);
    vec2 fh=normalize(d.xz+1e-6);vec3 ta=hl?vec3(0,1,0):vec3(fh.x,0.,fh.y),tb=cross(sN,ta);
    vec3 Sp=vec3(0);
    for(int i=0;i<int(uP[11].y);i++){
      vec4 lp=texelFetch(uL,ivec2(0,i),0),lc=texelFetch(uL,ivec2(1,i),0);
      vec3 L=lp.xyz-P;float d2=dot(L,L);L*=inversesqrt(d2);
      float rc=lc.a>.5?mix(.025,1.,smoothstep(.2+.2*(lc.a-1.),.95,L.y)):1.;
      vec3 Hh=L-d;float hn=dot(Hh,sN),ha=dot(Hh,ta)*.2,hb=dot(Hh,tb)*2.2;
      float nh=hn*max(hn,0.)/(hn*hn+ha*ha+hb*hb+1e-6);nh*=nh;nh*=nh;nh*=nh;nh*=nh;nh*=nh;nh*=nh;
      Sp+=lc.rgb/(d2+20.)*exp(-SIG*sqrt(d2)*1.4)*rc*nh;
    }
    oC=vec4(Sp*(th<1e8||!hl?1.:0.),1.);
}
`,Wt=`
${ot}// ray against a centred box: near t, far t, entry axis
vec3 box(vec3 ro,vec3 rd,vec3 b){
  vec3 m=1./rd,n=m*ro,k=abs(m)*b,a=-n-k,c=-n+k;
  float tn=max(max(a.x,a.y),a.z),tf=min(min(c.x,c.y),c.z);
  return vec3(tn,tf,tn==a.x?0.:(tn==a.y?1.:2.));
}
// deck boxes on the ship: a stepped skyline along the hull
float deckTop(float z){float b=floor(z/uP[8].x);float h=h21(vec2(b,3.1));return uP[8].y*(.45+.55*h)*step(.2,fract(h*7.3)+.3);}

vec3 shadeBox(vec3 P,vec3 N,float t,ivec2 cell,vec2 cen,float cs,float rs,inout vec3 E,out float rb){
  // which box in the column, its face coordinates, and its page in the baked box map (posts, rails, castings,
  // corrugation, doors and lock bars, codes and marks, grime and rust streaks)
  float tier=floor(P.y/HT),v=P.y/HT-tier;
  bool sx=abs(N.x)>.5;
  float s=h21(vec2(float(cell.x)+tier*17.3,float(cell.y)+cs*3.));
  float s2=h21(vec2(float(cell.y)+tier*7.1,float(cell.x)*1.7+rs));
  float along=sx?(P.z-cen.y+CZ*.5-.2)/(CZ-.4):(P.x-cen.x+CX*.5-.06)/(CX-.12);
  float au=fract(s*11.)>.5?1.-along:along;
  float vc=1.+clamp(v,0.,1.)*126.;
  vec2 uv;float tpm;
  if(sx){uv=vec2(au,(floor(fract(s*5.3)*4.)*128.+vc)/704.);tpm=84.;}
  else{float pg=floor(fract(s*7.7)*4.)+(s>.5?0.:4.);uv=vec2((pg*128.+1.+au*126.)/1024.,(512.+vc)/704.);tpm=52.;}
  float cv=max(abs(dot(N,normalize(P-uP[0].xyz))),.12);
  vec4 tx=textureLod(uX,uv,log2(max(tpm*t*1.35/uP[3].w/cv,1.)));
  rb=sat((tx.r-.47)*5.)*sat(1.3-t/60.);
  vec3 alb=uPal[int(fract(s*9.7)*8.)].rgb*(.6+.8*s2*s2);
  // bleached and sun-faded in big soft patches, per box
  float fade=NS(vec3(P.xz*.7+s*40.,P.y*.5),2.6);
  alb=mix(alb,alb*.5+vec3(.12,.11,.1)*(.7+.6*s2),smoothstep(.38,.74,fade)*.85);
  float dirt=NS(vec3(P.x*.5+P.z*.5,P.y*.35,s*30.),1.1);
  alb*=(.72+.56*dirt)*(.3+1.4*tx.r);
  alb=mix(alb,vec3(.66,.65,.6)*(.7+.35*dirt),tx.b*.8);
  alb*=1.-.5*tx.g;
  alb=mix(alb,vec3(.26,.13,.06)*(.6+.8*dirt),sat(tx.a*(uP[9].y*1.5+.5*s2)));
  // the hairline between stacked boxes
  float gap=smoothstep(.0,.008,v)*smoothstep(1.,.992,v);
  alb*=.2+.8*gap;
  E*=.6+.4*gap;
  return alb;
}

void main(){
  vec2 ndc=(gl_FragCoord.xy+uP[10].xy)/uP[3].w*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float m=uP[0].w,t0=0.;
  if(m>.5){
    d.y=-min(d.y,-.0035);o.y=-o.y;d=normalize(d);
    t0=-o.y/d.y;
  }
  d+=vec3(1e-5,2e-5,-1.5e-5);
  float best=m<.5?(d.y<-1e-4?-o.y/d.y:1e9):1e9;
  float tEnd=min(best,1400.);
  int kind=(m<.5&&d.y<-1e-4)?3:0; // 0 fog, 1 box, 2 crane, 3 ground, 4 hull, 5 deck box, 6 mast
  float rs=0.;
  // the ship's side, and deck boxes above it
  vec3 hN=vec3(0);
  if(d.x>.0005&&XH>0.){
    float th=(XH-o.x)/d.x;
    if(th>t0&&th<tEnd){
      vec3 p=o+d*th;
      if(p.y<HH){tEnd=th;kind=4;}
      else if(p.y<HH+deckTop(p.z)){tEnd=th;kind=5;}
    }
  }
  // the yard: a grid of box columns
  vec3 p0=o+d*t0;
  vec2 cs=vec2(CX,CZ);
  vec2 gc=floor(p0.xz/cs);
  vec2 st=sign(d.xz);
  vec2 dd=cs/abs(d.xz);
  vec2 tn=((gc+max(st,vec2(0.)))*cs-o.xz)/d.xz;
  vec3 N=vec3(0);
  ivec2 hc=ivec2(0);
  vec4 cd=vec4(0);
  int iters=int(uP[7].x);
  for(int i=0;i<iters;i++){
    float nx=min(tn.x,tn.y);
    float e=min(nx,tEnd);
    ivec2 c=ivec2(gc);
    vec4 dat=texelFetch(uD,ivec2(c.x&127,c.y&63),0);
    float H=dat.r*255.*HT;
    if(H>0.){
      vec2 cen=(vec2(gc)+.5)*cs+(dat.gb-.5)*vec2(.14,.36);
      vec3 ro=o-vec3(cen.x,H*.5,cen.y);
      vec3 b=vec3(CX*.5-.06,H*.5,CZ*.5-.2);
      vec3 r=box(ro,d,b);
      if(r.x<r.y&&r.x<e&&r.y>max(t0,0.)){
        float tb=max(r.x,t0);
        if(tb<tEnd){
          tEnd=tb;kind=1;hc=c;cd=dat;
          float ax=r.z;
          N=ax<.5?vec3(-sign(d.x),0.,0.):(ax<1.5?vec3(0.,-sign(d.y),0.):vec3(0.,0.,-sign(d.z)));
        }
        break;
      }
    }
    if(nx>=tEnd)break;
    if(tn.x<tn.y){gc.x+=st.x;tn.x+=dd.x;}else{gc.y+=st.y;tn.y+=dd.y;}
  }
  // the crane line: one cell per crane along the quay
  float cz0=floor((p0.z-uP[12].x)/CP),sz=sign(d.z);
  int nc=int(uP[12].y);
  vec3 mN=vec3(0);float mK=0.,mMat=0.;
  for(int k=0;k<nc;k++){
    float ci=cz0+float(k)*sz;
    float zC=(ci+.5)*CP+uP[12].x;
    float zt0=(zC-sz*36.-o.z)/d.z,zt1=(zC+sz*36.-o.z)/d.z;
    float zmin=min(zt0,zt1),zmax=max(zt0,zt1);
    if(zmin>tEnd)break;
    if(zmax<t0)continue;
    for(int j=0;j<int(uP[11].x);j++){
      vec4 m0=texelFetch(uM,ivec2(0,j),0),m1=texelFetch(uM,ivec2(1,j),0),m2=texelFetch(uM,ivec2(2,j),0);
      bool yz=m2.x>.5&&m2.x<1.5;
      bool on=m2.y<1.5||mod(ci-m2.z,m2.y)<.5;
      vec2 cc=vec2(m1.x,m1.y);
      vec3 q=o-(yz?vec3(m1.w,m0.y,zC+m0.x):vec3(m0.x,m0.y,zC+m1.w));
      vec3 e=d;
      if(yz){q=q.zyx;e=e.zyx;}
      vec2 qxy=vec2(q.x*cc.x+q.y*cc.y,-q.x*cc.y+q.y*cc.x);
      vec2 dxy=vec2(e.x*cc.x+e.y*cc.y,-e.x*cc.y+e.y*cc.x);
      vec3 r=box(vec3(qxy,q.z),vec3(dxy,e.z),vec3(m0.z,m0.w,m1.z));
      bool hit=on&&r.x<r.y&&r.x<tEnd&&r.y>t0;
      if(m2.x>1.5){if(!hit)j+=int(m2.w);}
      else if(hit){
        float tb=max(r.x,t0);
        if(tb<tEnd){
          tEnd=tb;kind=2;
          float ax=r.z;
          vec3 ln=ax<.5?vec3(-sign(dxy.x),0.,0.):(ax<1.5?vec3(0.,-sign(dxy.y),0.):vec3(0.,0.,-sign(e.z)));
          mN=vec3(ln.x*cc.x-ln.y*cc.y,ln.x*cc.y+ln.y*cc.x,ln.z);
          if(yz)mN=mN.zyx;
          mK=float(j);mMat=m2.w;
        }
      }
    }
  }
  // lamps: closed-form scatter along the ray, surface light at the hit, shaped by a down-facing cone
  vec3 P=o+d*tEnd;
  vec3 sN=kind==1?N:(kind==2?mN:(kind==4||kind==5?vec3(-1,0,0):vec3(0,1,0)));
  // the hull flares a touch outward near the deck and has a real sheen
  vec3 acc=vec3(0),E=vec3(0);
  float wrapA=kind==3?.1:.12;
  for(int i=0;i<int(uP[11].y);i++){
    vec4 lp=texelFetch(uL,ivec2(0,i),0),lc=texelFetch(uL,ivec2(1,i),0);
    vec3 ol=lp.xyz-o;
    float bl=dot(ol,d);
    vec3 cr=ol-d*bl;
    float c2=dot(cr,cr);
    float soft=lp.w;
    float s=sqrt(c2+soft);
    float t1=tEnd,t2=max(t0,0.);
    // the broad glow is the lit fog: it builds with distance, so the first metres of air stay clear
    float t2n=max(t2,min(t1*.6,12.));
    float ia=(t1-bl)/s,ib=(t2n-bl)/s,iq=1.+ia*ib;
    float integ=(atan((ia-ib)/iq)+(iq<0.?3.14159:0.))/s;
    float s0=sqrt(c2+soft*.018);
    // the glass's own glare: tight round the lamp as the eye sees it (the wide corona is the fog's, above)
    float core=3.14159/s0*sat((t1-bl)*.7)*sat((bl-t2)*.7+.5)*exp(-c2/max(bl*bl,1.)*(m>.5?500.:1800.));
    float bb=max(bl-t2,0.);
    float at=exp(-SIG*(bb+sqrt(c2)));
    // cone: floods aim down, the closest point of the ray to the lamp picks the weight
    float cone=1.;
    if(lc.a>.5){
      vec3 pc=o+d*clamp(bl,t2,t1);
      vec3 dv=normalize(pc-lp.xyz);
      float ck=lc.a-1.;
      cone=mix(.035-.02*ck,1.,smoothstep(.15+.3*ck,.92,-dv.y));
    }
    acc+=lc.rgb*(integ*uP[9].z*at*3.4+core*uP[9].w*at/(at+.02))*at*cone;
    if(kind>0){
      vec3 L=lp.xyz-P;float d2=dot(L,L),il=1./sqrt(d2);L*=il;
      float nl=(dot(sN,L)+wrapA)/(1.+wrapA);
      float rcone=1.;
      if(lc.a>.5)rcone=mix(.025,1.,smoothstep(.2+.2*(lc.a-1.),.95,L.y));
      vec3 li=lc.rgb/(d2+20.)*exp(-SIG*sqrt(d2)*1.4)*rcone;
      E+=li*max(nl,0.);
      // wet concrete: each lamp's highlight stretched toward the eye into a long soft streak
    }
  }
  E*=uP[10].z;
  // the lit air round a surface lights every face of it a little (the fog is the lamp's big soft second source)

  // ambient in fog: what the fog itself gives a surface
  float dn=NS(p0*vec3(.4,1.,.4)+d*30.,18.);
  float dens=SIG*(.86+.28*dn);
  // fog thickens with distance: the first metres from the eye carry almost none of it
  float t0c=max(t0,0.),Lf=max(tEnd-12.*(1.-exp(-tEnd/12.))-(t0c-12.*(1.-exp(-t0c/12.))),0.);
  float tau=dens*Lf;
  // the air above 14 m (thicker, or thinner when it clears): the part of the ray up there, from below or from a stack top
  {float ya=(14.-o.y)/(abs(d.y)>1e-4?d.y:1e-4);float lo=d.y>0.?max(ya,t0):t0,hi=d.y>0.?tEnd:min(tEnd,ya);tau+=dens*uP[13].x*max(hi-lo,0.);}
  float T=exp(-tau);
  // haze thins and darkens with height: closed form along the ray
  float aa=max(d.y,0.)/FOGH;
  float Iz=(1.-exp(-(dens+aa)*Lf))/(dens+aa);
  vec3 scat=FOGC*Iz*dens*(1.+.1*dn);
  // blue dawn: the sky is the lightest thing, a clear cold blue paling toward the sea
  scat+=uP[24].rgb*(1.-T)*sat(d.y*2.2+.35)*(1.+.5*sat(d.x));
  vec3 col=vec3(0);
  float pud=0.;
  // ambient light a surface gets
  vec3 Am=FOGC*uP[10].w*uP[14].w+uP[14].rgb;
  float tx0=0.;
  if(kind==1){
    float aoDown=.45+.55*smoothstep(0.,8.,P.y);
    vec3 alb=shadeBox(P,N,tEnd,hc,(vec2(hc)+.5)*vec2(CX,CZ)+(cd.gb-.5)*vec2(.14,.36),cd.r,cd.a*97.,E,tx0);
    // ribs of the corrugation catch the lamps as fine bright lines
    col=alb*(E*(1.2+1.6*tx0)+Am*1.3*aoDown*(sN.y>.5?1.:.8)*(.72+.28*sat(.5+sN.z*.5+sN.x*.3)));
  }else if(kind==2){
    // crane steel: painted plate in big flat fields, weld seams, stiffener ribs, rust run down from every seam;
    // the spreader yellow, the hanging box corrugated, masts galvanised, ropes and fenders black, lamp heads dark
    vec2 fc=abs(sN.x)>.5?vec2(P.z,P.y):(abs(sN.z)>.5?vec2(P.x,P.y):vec2(P.x,P.z));
    float pl=NS(vec3(P.x+P.z,P.y,P.x*.3)*.6,2.),wst=fract(pl*7.3+h21(floor(vec2(fc.x*1.7,mK)))*.6);
    float nr=sat(1.4-tEnd/110.);
    int mt=int(mMat+.5);
    // per material: albedo and how much plate detail it carries (one table, no branches)
    vec4 MC=uP[16+mt];
    float fy=fract(fc.y/2.9);
    vec3 alb=MC.rgb*(.72+.5*pl)*(1.+(.28*h21(floor(fc/vec2(2.3,2.9))+mK*11.)-.14)*nr*MC.w);
    alb=mix(alb,vec3(.2,.08,.035),smoothstep(.5,.8,wst)*(1.-fy)*.75*MC.w);
    alb=mix(alb,mix(vec3(.02),vec3(.55,.4,.05),step(.5,fract((fc.x+P.y)/1.2))),float(mt==1)*step(P.y,2.4));
    col=alb*(E*.95+Am*1.1*(.6+.4*sat(sN.y+.6)));
  }else if(kind==4){
    // the hull's paint comes from the ground pass in the main view; plain in the mirror
    // wet plate: every lamp that sees it runs down it as a vertical streak
    col=(m>.5?uP[13].yzw:texture(uG,(gl_FragCoord.xy+uP[10].xy)/uP[3].w).rgb)*(E*2.2+Am*.8+FOGC*(5.+14.*exp(-P.y*.16)))+(m>.5?vec3(0):texture(uSp,(gl_FragCoord.xy+uP[10].xy)/uP[3].w).rgb)*uP[10].z*2.;
  }else if(kind==5){
    float b=floor(P.z/2.5),t2=floor(P.y/2.6);
    vec3 alb=uPal[int(h21(vec2(b,t2+3.))*7.99)].rgb*.45;
    alb*=.25+.75*smoothstep(.0,.03,abs(fract(P.y/2.6)-.5)*2.6)*smoothstep(.0,.03,abs(fract(P.z/2.5)-.5)*2.5);
    col=alb*(E*2.2+Am*.5);
  }else if(kind==3){
    // the apron's albedo and wetness come from the ground pass, baked just before at the same view
    vec4 gg=texture(uG,(gl_FragCoord.xy+uP[10].xy)/uP[3].w);
    pud=gg.a;
    col=gg.rgb*(E*2.4+Am*1.7*(.7+.3*sat(1.-exp(-tEnd*.02))))+texture(uSp,(gl_FragCoord.xy+uP[10].xy)/uP[3].w).rgb*uP[10].z*(.2+.8*pud)*45.;
  }
  // near things keep their contrast: the lit air in front of a surface builds up only with its distance
  if(kind>0&&kind<4)acc*=mix(.1,1.,smoothstep(3.,50.,tEnd-t0c));
  if(kind>3){float kh=mix(.42,1.,smoothstep(28.,95.,tEnd));scat*=kh;acc*=mix(.55,1.,smoothstep(28.,95.,tEnd));}
  vec3 c1=col*T+scat+acc;
  if(m>.5){oC=vec4(c1,0.);return;}
  float a=kind==3?.54+.46*pud:(kind==0?0.:.5*T);
  oC=vec4(c1*uP[11].a,a*uP[11].a);
}
`,Ot=`
uniform sampler2D uW;uniform vec4 uS[3];
out vec4 oC;
float h21(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
void main(){
  ivec2 c=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uW,c,0);
  float hl=texelFetch(uW,c-ivec2(1,0),0).r,hr=texelFetch(uW,c+ivec2(1,0),0).r,hd=texelFetch(uW,c-ivec2(0,1),0).r,hu=texelFetch(uW,c+ivec2(0,1),0).r;
  float l=hl+hr+hd+hu-4.*s.r;
  float v=(s.g+.24*l)*.992;
  float h=s.r+v;
  vec2 uv=(vec2(c)+.5)/uS[0].x;
  vec2 w=uv*uS[0].y+uS[0].zw;
  // two named drips may land per step
  for(int i=1;i<3;i++){vec2 q=w-uS[i].xy;float d2=dot(q,q);if(d2<.5)h-=uS[i].z*exp(-d2/.05);}
  // rain: scattered pin drops
  if(uS[0].y>0.&&h21(vec2(c)+uS[1].w)>uS[2].w)h-=.05*fract(h21(vec2(c)*1.7+uS[1].w)*9.1);
  vec2 e=min(uv,1.-uv);h*=smoothstep(0.,.06,min(e.x,e.y));
  oC=vec4(h,v,(hr-hl)*.5,(hu-hd)*.5);
}
`,jt=`
uniform sampler2D uR;uniform vec4 uQ;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uQ.xy;
  vec3 s=vec3(0);float w=0.;
  for(int i=-14;i<=14;i++){float f=float(i)/14.;float g=exp(-f*f*3.);
    vec2 o=vec2(uQ.w*f*.25*(f>0.?1.:-1.)*sin(f*9.)*.2,uQ.z*f);
    s+=g*texture(uR,uv+o).rgb;w+=g;}
  oC=vec4(s/w,1.);
}
`,Qt=`
uniform sampler2D uA,uR;uniform vec4 uQ;
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uQ.xy;
  vec3 s=vec3(0);float w=0.;
  for(int j=-4;j<=4;j++)for(int i=-4;i<=4;i++){
    vec2 o=vec2(float(i),float(j))*uQ.z;float g=exp(-dot(o,o)/(uQ.w*uQ.w));
    vec4 a=texture(uA,uv+o);
    s+=g*a.rgb;w+=g;
  }
  oC=vec4(max(s/w-.12,vec3(0.)),1.);
}
`,Kt=`
uniform sampler2D uA;uniform vec4 uQ;uniform vec4 uK[4];
out vec4 oC;
void main(){
  vec2 uv=gl_FragCoord.xy*uQ.xy;
  float sh=0.;int nk=int(uQ.w);
  for(int i=0;i<nk;i++){
    vec4 k=uK[i];vec2 dl=k.xy-uv;
    float w=k.w/(1.+dot(dl,dl)/(uQ.z*uQ.z));
    float oc=0.;
    float jt=fract(52.98*fract(dot(gl_FragCoord.xy,vec2(.0671,.00584))));
    for(int j=1;j<24;j++){float a=texture(uA,uv+dl*((float(j)-jt)/24.)).a;oc+=step(.012,a)*step(a,.505)*step(exp(-k.z),a*2.);}
    sh+=w*oc/23.;
  }
  oC=vec4(1.-min(sh,.6),0.,0.,1.);
}
`,Zt=`
uniform vec4 uP[4];uniform vec4 uC[13];
uniform sampler2D uA,uR,uRB,uB,uW,uRn,uSh;uniform sampler3D uN;
out vec4 oC;
float sat(float x){return clamp(x,0.,1.);}
// one of the carrier's lamps: k0 screen position, its mirror's height, core size; k1 colour times fog, the lamp's
// optical depth (a nearer surface at its pixel hides the core)
vec3 carLamp(vec4 k0,vec4 k1,vec2 ndc,float wet){
  vec2 q=ndc-k0.xy;float r2=dot(q,q);
  float sa=texture(uA,k0.xy*.5+.5).a;
  float vis=sa>.505?1.:smoothstep(k1.a*.8,k1.a*.97,-log(max(sa*2.,1e-6)));
  float g=exp(-r2/(k0.w*k0.w))*vis*1.6;
  vec2 m=vec2(q.x,ndc.y-k0.z);
  g+=exp(-m.x*m.x/(k0.w*k0.w*2.5)-m.y*m.y/(k0.w*k0.w*400.))*wet*vis*.7;
  return k1.rgb*g;
}
void main(){
  vec2 uv=gl_FragCoord.xy*uC[0].y;
  vec4 a=texture(uA,uv);
  vec3 col=a.rgb;
  vec2 ndc=uv*2.-1.;
  vec3 d=normalize(uP[1].xyz+(ndc.x*uP[2].xyz+ndc.y*uP[3].xyz)*uP[1].w);
  vec3 o=uP[0].xyz;
  float t=uC[0].z;
  float sg=uC[0].w;
  float fogA=1.-a.a*2.,wet=0.;
  if(a.a>.51&&d.y<-1e-4){
    float tw=-o.y/d.y;
    vec3 P=o+d*tw;
    float T=exp(-sg*tw);
    fogA=1.-T;
    float pud=sat((a.a-.54)/.46);float shw=smoothstep(.55,.88,pud),rgw=smoothstep(.08,.62,pud)*(1.-shw*.72);
    vec2 suv=(P.xz-uC[2].xy)/uC[2].z;
    vec2 ee=min(suv,1.-suv);
    vec4 w=texture(uW,suv);
    float inside=smoothstep(0.,.05,min(ee.x,ee.y));
    vec2 gr=w.ba*inside*uC[3].x;gr/=1.+length(gr)*6.;
    vec2 nq=P.xz*.45;float nz=t*.05;
    float m1=textureLod(uN,vec3(nq,nz),0.).r-.5;
    float m2=textureLod(uN,vec3(nq.yx+.37,nz*.8),0.).r-.5;
    vec2 mic=vec2(m1,m2)*(.006+.00025*tw);
    vec3 n=normalize(vec3(-gr.x-mic.x,1.,-gr.y-mic.y));
    float cv=sat(dot(-d,n));
    float F=.03+.97*pow(1.-cv,4.6);
    float Fr=.015+.985*pow(1.-cv,3.6);
    vec2 off=(gr+mic*.12)*uC[3].y/max(tw*.06+.8,1.);
    vec3 sh=texture(uR,uv+vec2(off.x,-off.y*.4)*vec2(1.,.8)).rgb;
    vec3 rt=texture(uRB,uv).rgb;
    float rain=uC[3].w;
    rt*=1.+m1*1.2+m2*.5;
    col+=(sh*shw*(1.-.35*rain)*F+rt*rgw*uC[3].z*Fr*.5)*T;
    wet=smoothstep(.2,.8,pud)*T;
  }
  float dr=textureLod(uN,vec3(ndc*.32+vec2(t*.008,t*.005),t*.017),0.).r-.5;
  float dr2=textureLod(uN,vec3(ndc.yx*1.3-vec2(t*.016,-t*.009),t*.031),0.).r-.5;
  float mist=dr+dr2*.55;
  // the shafts sit in the air: they dim the lit fog, drifting a little with it
  col*=mix(1.,texture(uSh,uv+vec2(dr,dr2)*.006).r,a.a<.51?sat(fogA*1.3):0.);
  col*=1.+fogA*mist*.36;
  // bloom, the fog halo a lens adds
  col+=texture(uB,uv).rgb*uC[1].x;
  // a straddle carrier far down the lanes: its lamps in the fog and their streaks in the wet
  col+=carLamp(uC[5],uC[6],ndc,wet)+carLamp(uC[7],uC[8],ndc,wet)+carLamp(uC[9],uC[10],ndc,wet)+carLamp(uC[11],uC[12],ndc,wet);
  // rain streaks catch the lit fog
  float rain=uC[4].w;
  if(rain>0.){
    vec2 q=(ndc+vec2(ndc.y*.12,0.))*vec2(1.,.28);
    float a1=texture(uRn,q*vec2(1.3,1.2)+vec2(t*.05,t*1.6)).r;
    float a2=texture(uRn,q*vec2(2.7,2.1)+vec2(-t*.03,t*2.4)).r;
    float st=max(a1-.72,0.)*1.5+max(a2-.8,0.)*1.1;
    col+=st*rain*2.2*uC[4].rgb*smoothstep(.03,.25,col.r+col.g)*(col.r+col.g);
  }
  // exposure, soft shoulder that keeps the orange, deep blacks
  col*=uC[0].x;
  col=col*(1.+col/(uC[1].y*uC[1].y))/(1.+col);
  col=min(pow(max(col,vec3(0.)),vec3(1./2.2)),vec3(1.));
  col=mix(col,col*col*(3.-2.*col),.5);
  col*=mix(vec3(.9,.97,1.14),vec3(1.03,.97,.9),sat(dot(col,vec3(.3,.6,.1))*3.));
  oC=vec4(col,1.);
}
`,Yt={0:31599,1:11415,2:29671,3:29647,4:23497,5:31183,6:31215,7:29330,8:31727,9:31695,K:23861,V:23402,L:18727,U:23407,R:27565,H:23533,T:29842,Z:29351,N:24573,W:23549,E:31207,P:31716,G:31087,X:23213,C:31015};function Vt(t){const x=new Float32Array(720896).fill(.5),b=new Float32Array(720896),_=new Float32Array(720896),v=new Float32Array(720896);let d=t;const u=()=>{d=d+1831565813|0;let r=Math.imul(d^d>>>15,1|d);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296};let xe=0,W=0,g=1,U=1,Te=0,_e=0;const me=(r,f,n,T,P,h)=>{xe=r,W=f,Te=n,_e=T,g=n/P,U=T/h},E=(r,f,n,T,P,h,M)=>{const z=Math.max(0,Math.round(f*g)),B=Math.min(Te,Math.round(T*g)),re=Math.max(0,Math.round(n*U)),K=Math.min(_e,Math.round(P*U));for(let O=re;O<K;O++)for(let Ee=z;Ee<B;Ee++){const ue=xe+Ee+(W+O)*1024;r[ue]=M===1?Math.max(r[ue],h):M===2?r[ue]*h:h}},V=(r,f,n,T,P,h)=>{const M=Math.round(r*g),z=Math.round(n*g),B=Math.round(f*U),re=Math.round(T*U);for(let K=M;K<z;K++){const O=K/g/P%1,Ee=O<.25?1:O<.375?1-(O-.25)*8:O<.75?0:(O-.75)*8,ue=O>=.25&&O<.375?-1:O>=.875?1:0,N=.5+h*(Ee-.5)*.5+ue*h*.5;for(let Z=B;Z<re;Z++)x[xe+K+(W+Z)*1024]=N}},ve=(r,f,n,T)=>{const P=T/5;for(const h of r){const M=Yt[h];if(M!==void 0)for(let z=0;z<5;z++)for(let B=0;B<3;B++)M>>14-z*3-B&1&&E(_,f+B*P,n+(4-z)*P,f+(B+1)*P*.98,n+(5-z)*P*.98,1,1);f+=P*4}return f},A=(r,f,n)=>{const T="KVLRHTZNWEPGXC",P=()=>T[Math.floor(u()*T.length)];let h=ve(P()+P()+P()+"U",r,f,n)+n*.5,M="";for(let B=0;B<6;B++)M+=Math.floor(u()*10);h=ve(M,h,f,n)+n*.35;const z=n/5;E(_,h-z*.6,f-z*.6,h+z*3.6,f+n+z*.6,1,1),E(_,h-z*.1,f-z*.1,h+z*3.1,f+n+z*.1,0,0),ve(String(Math.floor(u()*10)),h,f,n),ve(["45G1","42G1","45R1","22G1"][Math.floor(u()*4)],r,f-n*1.5,n*.8)},y=(r,f,n,T,P,h)=>{for(let M=0;M<T;M++){const z=r+u()*(f-r),B=.15+Math.pow(u(),1.6)*P,re=(.6+u()*2.2)/g,K=(.25+u()*.75)*h,O=u()<.55?v:b,Ee=Math.round((z-re)*g),ue=Math.round((z+re)*g)+1,N=Math.round(n*U),Z=Math.max(0,Math.round((n-B)*U));for(let X=Z;X<N;X++){const j=(X-Z)/Math.max(1,N-Z);for(let D=Math.max(0,Ee);D<Math.min(Te,ue);D++){const ne=xe+D+(W+X)*1024;O[ne]=Math.min(1,O[ne]+K*j*j*(1-Math.abs((D/g-z)/(re*1.4))))}}}},C=(r,f,n,T,P)=>{const h=Math.max(0,Math.round((f-T)*g)),M=Math.min(Te,Math.round((f+T)*g)),z=Math.max(0,Math.round((n-T)*U)),B=Math.min(_e,Math.round((n+T)*U));for(let re=z;re<B;re++)for(let K=h;K<M;K++){const O=K/g-f,Ee=re/U-n,ue=Math.exp(-(O*O+Ee*Ee)/(T*T*.3)),N=xe+K+(W+re)*1024;r[N]=r===x?r[N]*(1-(1-P)*ue):Math.min(1,r[N]+P*ue)}},J=(r,f)=>{for(const n of[0,2.6-.12])E(x,r,n,r+f,n+.12,.34),E(x,r+f*.3,n+.03,r+f*.7,n+.08,.05),C(v,r+f*.5,n+.06,.22,.5)};for(let r=0;r<4;r++){me(0,r*128,1024,128,12.2,2.6);const f=r===1;V(.18,.16,12.02,2.42,.278,.26);for(const[n,T]of f?[[0,.18],[5.95,6.25],[12.02,12.2]]:[[0,.18],[12.02,12.2]])E(x,n,0,T,2.6,.7),E(x,n,.16,n+.03,2.42,.2),E(x,T-.04,.16,T,2.42,.22);if(E(x,0,2.42,12.2,2.6,.72),E(x,0,2.36,12.2,2.42,.16),E(x,0,0,12.2,.16,.4),E(x,0,.16,12.2,.2,.7),J(0,.18),J(12.02,.18),f){J(5.92,.18),J(6.1,.18);for(const n of[2.05,3.75,8.15,9.85])E(x,n,.02,n+.36,.13,.2)}if(A(f?3.6:9.6,2,.2),f&&A(9.7,2,.2),r===0){for(let n=0;n<6.283;n+=.01){const T=4.2+Math.cos(n)*.62,P=1.3+Math.sin(n)*.62*1;E(_,T-.07,P-.07,T+.07,P+.07,1,1)}E(_,3.2,1.25,7.9,1.37,1,1)}else if(r===2)for(let n=0;n<3;n++)for(let T=.5;T<2.1;T+=.01){const P=3+n*.45+(T-.5)*.5;E(_,P,T,P+.26,T+.012,1,1)}else r===3&&(E(x,2.4,.5,5.1,2,.44,0),C(x,7.6,1.1,.7,.78));for(let n=0;n<4;n++)C(x,.6+u()*11,.4+u()*1.8,.35+u()*.5,.86+u()*.1);y(.2,12,2.42,34,1.7,.9),y(.2,12,1.95,8,.6,.5);for(let n=0;n<30;n++)C(v,u()*12.2,.1,.08+u()*.3,.3+u()*.5)}for(let r=0;r<8;r++){me(r*128,512,128,128,2.44,2.6);const f=r<4;if(V(.15,.12,2.29,2.4,f?.31:.278,f?.16:.24),E(x,0,0,.15,2.6,.7),E(x,2.29,0,2.44,2.6,.7),E(x,.15,.12,.18,2.4,.22),E(x,2.26,.12,2.29,2.4,.22),E(x,0,2.4,2.44,2.6,.7),E(x,0,2.35,2.44,2.4,.16),E(x,0,0,2.44,.12,.45),J(0,.15),J(2.29,.15),f){E(x,1.205,.12,1.235,2.4,.1);for(const h of[.4,.8,1.62,2.02]){E(x,h,.12,h+.045,2.4,.78),E(x,h+.045,.12,h+.07,2.4,.26),E(x,h-.03,2.24,h+.08,2.36,.62),E(x,h-.03,.14,h+.08,.26,.62);const M=h<1.2?h+.05:h-.3;E(x,M,1+(h%.8>.3?.08:0),M+.27,1.06+(h%.8>.3?.08:0),.74),y(h-.02,h+.07,2.36,2,1.2,.6)}for(const h of[.35,.95,1.65,2.2])E(x,.15,h,.24,h+.1,.64),E(x,2.2,h,2.29,h+.1,.64);E(_,1.3,.8,1.52,.95,.8,1);const n=.085;let T=1.32;const P="KVLRHTZNWEPGXC";T=ve(P[Math.floor(u()*14)]+P[Math.floor(u()*14)]+P[Math.floor(u()*14)]+"U",T,2.02,n*1),ve(String(1e5+Math.floor(u()*899999)),1.32,1.86,n)}else ve(["K","V","R","T"][r-4]+"U "+Math.floor(u()*900+100),.5,2.08,.14);y(.16,2.28,2.36,10,1.6,.8)}me(0,640,1024,64,1024,64);for(let r=0;r<10;r++)ve(String(r),r*40+2,2,60);const pe=new Uint8Array(720896*4);for(let r=0;r<720896;r++)pe[r*4]=Math.min(255,x[r]*255),pe[r*4+1]=b[r]*255,pe[r*4+2]=_[r]*255,pe[r*4+3]=v[r]*255;return pe}const Jt=(t,e)=>{const m=(x,b,_)=>{if(x.indexOf(b)<0)throw new Error("616 NF "+t+" "+b);return x.split(b).join(_)},p=`vec4 dHf(uvec4 u){return vec4(unpackHalf2x16(u.x|(u.y<<16)),unpackHalf2x16(u.z|(u.w<<16)));}
`;return t==="sim"?m(m(m(m(e,"uniform sampler2D uW;",`uniform highp usampler2D uW;
`+p+`uvec4 eHf(vec4 v){uint a=packHalf2x16(v.xy),b=packHalf2x16(v.zw);return uvec4(a&65535u,a>>16,b&65535u,b>>16);}
`),"texelFetch(uW,","fW("),"void main(){",`vec4 fW(ivec2 c,int l){return dHf(texelFetch(uW,c,l));}
void main(){`),"oC=vec4(h,v,(hr-hl)*.5,(hu-hd)*.5);","oC=eHf(vec4(h,v,(hr-hl)*.5,(hu-hd)*.5));").replace("out vec4 oC;","out uvec4 oC;"):t==="comp"?m(m(e,"uniform sampler2D uA,uR,uRB,uB,uW,uRn,uSh;",`uniform sampler2D uA,uR,uRB,uB,uRn,uSh;uniform highp usampler2D uW;
`+p+`vec4 tW(vec2 uv){vec2 p=uv*256.-.5,f=fract(p);ivec2 i=ivec2(floor(p));vec4 a=dHf(texelFetch(uW,clamp(i,ivec2(0),ivec2(255)),0)),b=dHf(texelFetch(uW,clamp(i+ivec2(1,0),ivec2(0),ivec2(255)),0)),c=dHf(texelFetch(uW,clamp(i+ivec2(0,1),ivec2(0),ivec2(255)),0)),d=dHf(texelFetch(uW,clamp(i+ivec2(1),ivec2(0),ivec2(255)),0));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
`),"texture(uW,suv)","tW(suv)"):t==="streak"?m(e,"oC=vec4(Sp*(th<1e8||!hl?1.:0.),1.);","oC=vec4(Sp*(th<1e8||!hl?1.:0.),1.);oC.rgb=oC.rgb*64./(1.+oC.rgb*64.);"):t==="scene"?m(m(e,`uniform sampler3D uN;
`,`uniform sampler3D uN;
vec3 dSp(vec3 x){return x/max(1.-x,vec3(.002))*.015625;}
`),"texture(uSp,(gl_FragCoord.xy+uP[10].xy)/uP[3].w).rgb","dSp(texture(uSp,(gl_FragCoord.xy+uP[10].xy)/uP[3].w).rgb)"):e};function $t(t){if(t.__c616)return t.__c616;t.getExtension("KHR_parallel_shader_compile");const e=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float");t.getExtension("OES_texture_float_linear");const m=(A,y)=>{const C=t.createShader(A);return t.shaderSource(C,y),t.compileShader(C),C},p=m(t.VERTEX_SHADER,dt+Ht),x={},b=(A,y)=>{e||(y=Jt(A,y));const C=m(t.FRAGMENT_SHADER,dt+y),J=t.createProgram();t.attachShader(J,p),t.attachShader(J,C),t.linkProgram(J),t.flush(),x[A]={p:J,f:C}};b("scene",Wt),b("ground",Gt),b("sim",Ot),b("rough",jt),b("bloom",Qt),b("shaft",Kt),b("streak",qt),b("comp",Zt);let _=1634368270;const v=64,d=new Float32Array(v*v*v),u=new Float32Array(v*v*v);for(let A=0;A<d.length;A++){_=_+1831565813|0;let y=Math.imul(_^_>>>15,1|_);y=y+Math.imul(y^y>>>7,61|y)^y,d[A]=((y^y>>>14)>>>0)/4294967296}const xe=[.25,.5,.25],W=(A,y,C,J,pe)=>{for(let r=0;r<v;r++)for(let f=0;f<v;f++)for(let n=0;n<v;n++){let T=0;for(let P=-1;P<=1;P++)T+=xe[P+1]*A[(n+P*C&63)+64*((f+P*J&63)+64*(r+P*pe&63))];y[n+64*(f+64*r)]=T}};W(d,u,1,0,0),W(u,d,0,1,0),W(d,u,0,0,1);let g=1e9,U=-1e9;for(let A=0;A<u.length;A++)u[A]<g&&(g=u[A]),u[A]>U&&(U=u[A]);const Te=new Uint8Array(v*v*v),_e=255/(U-g);for(let A=0;A<u.length;A++)Te[A]=(u[A]-g)*_e;const me=128,E=256,V=new Uint8Array(me*E);for(let A=0;A<320;A++){_=_+1831565813|0;const y=(_^_>>>11)>>>0,C=y%me,J=(y>>>8)%E,pe=18+(y>>>20)%40,r=90+(y>>>24)%165;for(let f=0;f<pe;f++){const n=J+f&E-1,T=Math.sin(f/pe*3.14159);V[C+n*me]=Math.max(V[C+n*me],r*T)}}const ve={P:x,flt:e,vao:t.createVertexArray(),tN:null,tS:null,tX:null,linked:!1,u8:Te,rs:V,R:me,RH:E,bx:Vt(102150341)};return t.__c616=ve}function ea(t,e){if(e.linked)return;const m=e.P,p=["uN","uD","uW","uA","uR","uRB","uB","uL","uM","uRn","uX","uG","uSh","uSp"];for(const v in m){const{p:d,f:u}=m[v];if(!t.getProgramParameter(d,t.LINK_STATUS))throw new Error("616 "+v+": "+(t.getShaderInfoLog(u)||"")+t.getProgramInfoLog(d));t.useProgram(d),p.forEach((xe,W)=>{const g=t.getUniformLocation(d,xe);g&&t.uniform1i(g,W)}),m[v]={p:d,uP:t.getUniformLocation(d,"uP"),uPal:t.getUniformLocation(d,"uPal"),uC:t.getUniformLocation(d,"uC"),uS:t.getUniformLocation(d,"uS"),uQ:t.getUniformLocation(d,"uQ"),uK:t.getUniformLocation(d,"uK")}}const x=t.createTexture();t.bindTexture(t.TEXTURE_3D,x),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage3D(t.TEXTURE_3D,0,t.R8,64,64,64,0,t.RED,t.UNSIGNED_BYTE,e.u8),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_3D,t.TEXTURE_MAG_FILTER,t.LINEAR);for(const v of[t.TEXTURE_WRAP_S,t.TEXTURE_WRAP_T,t.TEXTURE_WRAP_R])t.texParameteri(t.TEXTURE_3D,v,t.REPEAT);const b=t.createTexture();t.bindTexture(t.TEXTURE_2D,b),t.texImage2D(t.TEXTURE_2D,0,t.R8,e.R,e.RH,0,t.RED,t.UNSIGNED_BYTE,e.rs),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),t.pixelStorei(t.UNPACK_ALIGNMENT,4);const _=t.createTexture();t.bindTexture(t.TEXTURE_2D,_),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,1024,704,0,t.RGBA,t.UNSIGNED_BYTE,e.bx),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),e.tN=x,e.tS=b,e.tX=_,e.u8=null,e.rs=null,e.bx=null,e.linked=!0}function Ae(t,e,m,p,x,b){const _=t.createTexture();t.bindTexture(t.TEXTURE_2D,_),x&&e.flt?t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,m,p,0,t.RGBA,t.HALF_FLOAT,null):x?t.texImage2D(t.TEXTURE_2D,0,t.SRGB8_ALPHA8,m,p,0,t.RGBA,t.UNSIGNED_BYTE,null):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,m,p,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,b),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const v=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,v),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,_,0),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:_,fb:v,w:m,h:p}}function ht(t,e){const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16UI,e,e,0,t.RGBA_INTEGER,t.UNSIGNED_SHORT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const p=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,p),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),t.clearBufferuiv(t.COLOR,0,new Uint32Array(4)),t.bindFramebuffer(t.FRAMEBUFFER,null),{tex:m,fb:p,w:e,h:e}}at.add({num:616,name:"Container Port",fam:"Vistas",recipe:"The wet concrete of a container terminal at night, with stacks of faded boxes disappearing into lamp-lit fog under a line of ship cranes, and the black wall of a docked ship on one side. Where you stand, the fog, the lamps, the stacks, the rain, the ship, the cranes and how wet the ground is change every mint. No controls, just look.",gl:!0,music:!1,fps:30,seed:0,make(t){const e=t.gl,m=t.size,p=$t(e);let x=parseInt(t.hash.slice(2,10),16)|0;const b=()=>{x=x+1831565813|0;let a=Math.imul(x^x>>>15,1|x);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},_=a=>{let o=0;for(const s of a)o+=s[1];let c=b()*o;for(const s of a)if(c-=s[1],c<=0)return s[0];return a[0][0]},v=t.home,d=lt&&ut&&ut[Array.from({length:16},(a,o)=>at.hashFor(615,1e3+o)).indexOf(t.hash)]||null;let u=v?"Sea fog":_([["Sea fog",5],["Thick",3],["Clearing",3],["Blue dawn",1]]);d&&d.Fog&&(u=d.Fog);let xe=v?"Sodium":_([["Sodium",5],["Mixed floods",3],["Old amber",2],["White LED",3],["Dying sodium",1]]);d&&d.Lamps&&(xe=d.Lamps);let W=v?"Mixed":_([["Mixed",5],["Towering",3],["Low",2],["Terraced",2]]);d&&d.Stacks&&(W=d.Stacks);let g=v?"Just stopped":_([["Just stopped",5],["Drizzle",3],["Steady rain",2]]);d&&d.Rain&&(g=d.Rain);let U=v?"Laden":_([["Laden",5],["Riding high",3],["Empty berth",1]]);d&&d.Ship&&(U=d.Ship);let Te=v?"Line":_([["Line",5],["Close-set",3],["Far apart",2],["Booms raised",1]]);d&&d.Cranes&&(Te=d.Cranes);let _e=v?"Puddled":_([["Puddled",5],["Awash",2],["Damp",2]]);d&&d.Apron&&(_e=d.Apron);let me=v?"Faded mixed":_([["Faded mixed",5],["Oxide",2],["Slate",2]]);d&&d.Boxes&&(me=d.Boxes);let E=parseInt(t.hash.slice(26,34)||"a5c3",16)^85949997|0;const V=()=>{E=E+1831565813|0;let a=Math.imul(E^E>>>15,1|E);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},ve=v?"Stack aisle":(()=>{const a=V()*10;return a<5?"Stack aisle":a<8?"Under the cranes":"Yard canyon"})();let A=parseInt(t.hash.slice(34,42)||"9e3b",16)^128182556|0;const y=()=>{A=A+1831565813|0;let a=Math.imul(A^A>>>15,1|A);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},C=v?[.06,.14,.3]:[[.06,.14,.3],[.46,.46,.43],[.28,.085,.045],[.46,.33,.045],[.13,.17,.15]][Math.floor(y()*5)],J=y(),pe=y();let r=ve==="Stack aisle"&&!v?pe<.24?"Quay edge":pe<.4?"From the stack top":ve:ve;d&&(r=d.Standpoint||r),t.trait("Standpoint",r),t.trait("Fog",u),t.trait("Lamps",xe),t.trait("Stacks",W),t.trait("Rain",g),t.trait("Ship",U),t.trait("Cranes",Te),t.trait("Apron",_e),t.trait("Boxes",me);const f=u==="Thick"?.03:u==="Clearing"?.0115:.0195,n=2.6,T=12.6,P=2.6,h=Te==="Close-set"?56:Te==="Far apart"?118:78,M={Sodium:{m:[1,.46,.09],f:[1,.53,.15]},"Mixed floods":{m:[1,.46,.1],f:[.74,.86,1]},"Old amber":{m:[1,.56,.17],f:[1,.66,.3]},"White LED":{m:[.66,.78,1],f:[.78,.86,1]},"Dying sodium":{m:[1,.3,.07],f:[1,.42,.12]}}[xe],z=(r==="From the stack top"?.72:1)*(u==="Thick"?1.9:u==="Clearing"?.75:u==="Blue dawn"?.7:1)*(xe==="White LED"?.8:1.5),B=128,re=64,K=new Uint8Array(B*re*4),O=W==="Towering"?5:W==="Low"||W==="Terraced"?2:3,Ee=W==="Towering"?8:W==="Low"?3:W==="Terraced"?7:6;for(let a=0;a<re;a++)for(let o=0;o<B;o++){const c=o<64?o:o-128,s=(o+a*B)*4,w=Math.floor((-c-4)/10),S=(-c-4)%10<8&&c<=-4,H=a%7===0;let G=0;if(c<=-4&&S&&!H){const oe=b();let Q;if(W==="Terraced"){const q=Math.floor(a/7),Pe=2+((q*7+w*11^q*3)&5);Q=Math.min(Pe+(oe<.25?1:0),Ee)}else Q=O+Math.floor(Math.pow(oe,1.25)*(Ee-O+1));b()<.08&&(Q=Math.max(0,Q-1-Math.floor(b()*3))),G=Math.min(Q,Ee)}K[s]=G,K[s+1]=128+(b()-.5)*220,K[s+2]=b()*255,K[s+3]=b()*255}if(r==="From the stack top")for(let a=2;a<=4;a++)for(const o of[123,124])K[(o+a*B)*4]=5;const ue=28,N=-7,Z=-19,X=11,j=28,D=19.5,ne=21,$=44,R=47,Fe=80,ee=14,Le=Te==="Booms raised",xt=U==="Riding high"?26:19,Xe=[];let ke=1,ge=0,L=0;const l=(a,o,c,s,w,S,H)=>{const G=c-a,oe=s-o,Q=Math.hypot(G,oe),q=G/Q,Pe=oe/Q;Xe.push((a+c)*.5,(o+s)*.5,Q*.5,w,q,Pe,H,S,0,ke,ge,L)},Ie=(a,o,c,s,w,S,H)=>{const G=c-a,oe=s-o,Q=Math.hypot(G,oe);Xe.push((a+c)*.5,(o+s)*.5,Q*.5,w,G/Q,oe/Q,H,S,1,ke,ge,L)},De=(a,o,c,s,w,S,H)=>{const G=Xe.length;Xe.push((a+s)*.5,(o+w)*.5,(s-a)*.5,(w-o)*.5,1,0,(S-c)*.5,(c+S)*.5,2,ke,ge,0),H(),Xe[G+11]=(Xe.length-G)/12-1};for(const a of[-ee,ee]){De(X-2,0,a-1.6,X+1.3,$+1.1,a+1.6,()=>{L=1,l(X,0,X,$+1,1.25,a,1.15),L=7,l(X-1.62,2.4,X-1.62,$-1.2,.36,a-.55,.36),L=4,l(X-1.35,.6,X-1.35,$-.4,.1,a+.6,.3),L=0}),De(j-1.3,0,a-1.2,j+1.3,$+1.1,a+1.2,()=>{L=1,l(j,0,j,$+1,1.25,a,1.15),L=0}),L=6;for(const o of[X+4.5,j-4.5])l(o-.45,ne-1.1,o+.45,ne-1.1,.17,a,.3);L=0,l(X-1.3,ne,j+1.3,ne,.95,a,1.05),l(X-1.3,$,j+1.3,$,1.15,a,1.2),l(X+1.1,ne+1.2,j-1.1,$-1.4,.5,a,.6);for(const o of[X,j])l(o-1,1.75,o+1,1.75,.38,a,4.6),l(o-.8,.7,o+.8,.7,.48,a-2.6,1.7),l(o-.8,.7,o+.8,.7,.48,a+2.6,1.7);l(X+.6,$+1,D,Fe,.85,a*.35,.8),l(j-.6,$+1,D-.6,Fe,.85,a*.35,.8)}for(const a of[X,j])Ie(-ee,ne,ee,ne,.8,a,.9),Ie(-ee,$,ee,$,1.1,a,1.1),Ie(a===X?-ee+1:ee-1,ne+1,a===X?ee-1:-ee+1,$-1.2,.4,a,.45);l(D-1.2,Fe,D+.6,Fe,1,0,ee*.35+.8),L=6,l(D-.5,$-1.4,D+.5,$-1.4,.17,2,.32),L=4,l(D,$-1.25,D,R-1.5,.06,2,.06),L=0;const de=3.6;if(De(-34,R-3.3,-de-1.6,Le?j+8:86,Fe+2,de+1.6,()=>{const a=Le?j+6:84;for(const o of[-de,de])l(-32,R,a,R,1.55,o,.75),l(D,Fe-1,-30,R+1.5,.32,o*.9,.32),Le||l(D,Fe-1,84,R+1.5,.32,o*.9,.32);for(let o=-29;o<a-2;o+=8.5)l(o,R-1.35,o+.45,R-1.35,.22,0,de);l(-24,R+2.6,-9,R+2.6,2.6,0,5.6),L=4;for(const o of[-de-1.1,de+1.1])for(const c of[2.1,2.65])l(-31,R+c,a-1,R+c,.035,o,.035);L=6,l(D-14.5,R-2.8,D-13.5,R-2.8,.17,0,.32),l(D+12.5,R-2.8,D+13.5,R-2.8,.17,1,.32),L=4,l(D-14,R-2.65,D-14,R-1.3,.05,0,.05),l(D+13,R-2.65,D+13,R-1.3,.05,1,.05),L=5,De(-31,R-3.1,-de+.9,a-4,R-1.4,-de+1.7,()=>{for(let o=-30;o<a-9;o+=5.6)l(o,R-1.6,o+2.8,R-2.85,.045,-de+1.3,.045),l(o+2.8,R-2.85,o+5.6,R-1.6,.045,-de+1.3,.045)}),L=0}),Le){const a=j+4;for(const o of[-de,de])l(a,R,a-11,R+92,1.3,o,.7),l(D,Fe-1,a-9,R+76,.3,o*.9,.3);for(let o=1;o<10;o++){const c=o/10;l(a-11*c-.3,R+92*c,a-11*c+.3,R+92*c,.22,0,de)}}const rt=(a,o,c)=>{l(a-4.4,R-2.3,a+4.4,R-2.3,.95,0,de+.4),l(a-3.6,R-4.6,a-1.4,R-4.6,1.3,-2.4,1.2),L=5;for(const s of[-.8,.8])for(const w of[-4.2,-3.6,3.6,4.2])l(a+s,o+.5,a+s,R-3.2,.04,w,.04);L=2,l(a-1.25,o,a+1.25,o,.32,0,6.15),L=3,c&&Ie(-6.1,o-1.62,6.1,o-1.62,1.3,a,1.22),L=0};Le?rt(-3,R-9,!1):(ke=2,ge=0,rt(19.5,17.5,!0),ge=1,rt(46,33,!1),ke=1,ge=0),De(X-4.4,0,-ee-1.4,X-1.2,ne+.4,-ee+1.4,()=>{const a=X-4.1,o=X-1.5,c=3.5;for(let s=0,w=0;s<ne-.1;s+=c,w++){const S=w&1?o:a,H=w&1?a:o;l(S,s+.1,H,s+c-.1,.14,-ee,.55),l(a-.2,s+c,o+.2,s+c,.07,-ee,.62)}for(const s of[a-.25,o+.25])l(s,0,s,ne+.3,.06,-ee-.6,.06)}),L=4,De(N-2.2,0,Z-2.2,N+2.2,32.6,Z+2.2,()=>{l(N,0,N,.7,.85,Z,.85),l(N,0,N,12,.42,Z,.42),l(N,12,N,23,.33,Z,.33),l(N,23,N,31.6,.24,Z,.24);for(const a of[-1,1])l(N-1.75,31.7,N+1.75,31.7,.09,Z+a*1.7,.09),l(N+a*1.7-.1,31.7,N+a*1.7+.1,31.7,.09,Z,1.75);for(let a=0;a<6;a++){const o=a*1.0472+.5,c=N+Math.cos(o)*1.7,s=Z+Math.sin(o)*1.7;l(c-.32,31.3,c+.32,31.1,.2,s,.34)}});const ce=-29.5;if(r==="Yard canyon")for(const a of[14,-24])De(ce-2.2,0,a-2.2,ce+2.2,32.6,a+2.2,()=>{l(ce,0,ce,.7,.85,a,.85),l(ce,0,ce,12,.42,a,.42),l(ce,12,ce,23,.33,a,.33),l(ce,23,ce,31.6,.24,a,.24);for(const o of[-1,1])l(ce-1.75,31.7,ce+1.75,31.7,.09,a+o*1.7,.09),l(ce+o*1.7-.1,31.7,ce+o*1.7+.1,31.7,.09,a,1.75)});L=5,U!=="Empty berth"&&(ke=Math.max(2,Math.round(250/h)),ge=0,De(28.4,0,-6,31,xt,36,()=>{for(const[a,o]of[[1,27],[7,27.4],[-4,33],[13,33.4]])Ie(a,xt-.4,o,1,.055,30,.055);for(const a of[27.2,33.2])l(29,0,29,.95,.42,a,.42)}),ke=1),L=0;const mt=Xe.length/12,vt=e.createTexture();e.bindTexture(e.TEXTURE_2D,vt);const ta=new Float32Array(Xe);e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,3,mt,0,e.RGBA,e.FLOAT,ta),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),ea(e,p);const Me=[],se=(a,o,c,s,w,S,H)=>{Me.push(a,o,c,s,w[0]*S,w[1]*S,w[2]*S,H)};for(let a=-2;a<=3;a++){const o=(a+.5)*h+ue;for(const c of[-1,1])se(X+4.5,ne-1.3,o+c*ee,1.4,M.f,11*z,1),se(j-4.5,ne-1.3,o+c*ee,1.4,M.f,11*z,1);se(D,$-1.6,o+2,2.2,M.f,18*z,1),se(D-14,R-3,o,2.4,M.f,24*z,1),se(D+13,R-3,o+1,2.4,M.f,20*z,1),se(D,Fe+1.3,o,.12,[1,.09,.05],4,0),Le?se(j-7,R+93,o,.1,[1,.09,.05],3,0):se(84,R+1.8,o,.1,[1,.09,.05],2.5,0)}const Et=N;for(let a=-3;a<=3;a++){const o=(a+.5)*h+ue+Z;if(se(Et,30.6,o,2.4,M.m,13*z,1.5),r==="Yard canyon")for(const c of[o-Z+14,o-Z-24]){se(ce,30.6,c,2.4,M.m,19*z,1.5);for(let s=0;s<4;s++){const w=s*1.5708+.4;se(ce+Math.cos(w)*1.7,30.9,c+Math.sin(w)*1.7,.45,M.m,4.5*z,2)}}for(let c=0;c<6;c++){const s=c*1.0472+.5;se(Et+Math.cos(s)*1.7,30.9,o+Math.sin(s)*1.7,.45,M.m,3.2*z,2)}}if(U!=="Empty berth"){const a=U==="Riding high"?26:19;for(let o=0;o<8;o++)se(30.8,a+1.2,-140+o*62+8*b(),.08,[1,.78,.46],1.1,0);for(let o=0;o<7;o++)se(30.6,a+3+b()*(U==="Laden"?16:9),-110+o*44+14*b(),.05,[1,.72,.4],.55,0)}if(U!=="Empty berth"){const a=U==="Riding high"?26:19;for(let o=0;o<6;o++)se(30.5,a+4+y()*4,-150+o*62+24*y(),3,[.68,.8,1],2.6*z,0)}else for(let a=0;a<14;a++)se(110+y()*60,3+y()*14,-260+a*42+20*y(),.06,a%3?M.m:[.8,.88,1],2.4,0);const nt=Me.length/8,Tt=e.createTexture();e.bindTexture(e.TEXTURE_2D,Tt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,2,nt,0,e.RGBA,e.FLOAT,new Float32Array(Me)),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const pt=e.createTexture();e.bindTexture(e.TEXTURE_2D,pt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,B,re,0,e.RGBA,e.UNSIGNED_BYTE,K),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const Be=Math.max(128,Math.round(m*.75)),Re=Math.max(96,m>>2),Ke=Ae(e,p,m,m,!0,e.LINEAR),bt=Ae(e,p,m,m,!0,e.LINEAR),ct=Ae(e,p,Be,Be,!0,e.LINEAR),yt=Ae(e,p,Re,Re,!0,e.LINEAR),Rt=Ae(e,p,128,128,!0,e.LINEAR),Pt=Ae(e,p,Re,Re,!1,e.LINEAR),He=Math.max(128,m>>1),wt=Ae(e,p,He,He,!0,e.LINEAR),Se=256,st=p.flt?[Ae(e,p,Se,Se,!0,e.LINEAR),Ae(e,p,Se,Se,!0,e.LINEAR)]:[ht(e,Se),ht(e,Se)],ae=[v?-2.4:-3.2+b()*1.8,1.15,6];let Ce=v?.1:-.06+b()*.22,Ge=v?.14:.1+b()*.1;if(r==="Quay edge")ae[0]=26.4+y()*.6,ae[1]=1.6,ae[2]=ue-14+5+y()*4,Ce=.2+y()*.1,Ge=.18+y()*.07,U==="Empty berth"&&(Ce=-.1+Ce*.3);else if(r==="From the stack top")ae[0]=-9.1,ae[1]=5*P+1.7,ae[2]=3*T+4+y()*4,Ce=1+y()*.25,Ge=.05+y()*.06;else if(r!=="Stack aisle")if(ae[2]=42-h*.5+(h-28)*(.12+V()*.12),r==="Under the cranes"){const a=V()<.5?-1:1;ae[0]=19.5-a*(2+V()*2.5),Ce=a*(.13+V()*.12),Ge=.15+V()*.06}else ae[0]=-31.6+V()*.8,ae[2]=5+V()*4,Ce=-.06+V()*.14,Ge=.13+V()*.07;const qe=Math.tan(34*Math.PI/180),i=new Float32Array(25*4),te=(a,o,c,s,w)=>{i[a*4]=o,i[a*4+1]=c,i[a*4+2]=s,i[a*4+3]=w},aa=U==="Empty berth"?-1:31,oa=U==="Riding high"?26:19,ra=U==="Laden"?24:0;te(4,n,T,P,h),te(5,aa,oa,29.6,f);const na=M.m;{const a=u==="Thick"?1.7:u==="Clearing"?.8:1,o=u==="Blue dawn"?[.3,.5,.92].map(w=>w*2.2):na;te(6,o[0]*.018*a,o[1]*.018*a,o[2]*.021*a,u==="Clearing"?22:34);const c=v?0:Math.floor(V()*4),s=[[.05,.055,.065],[.035,.06,.12],[.12,.04,.03],[.11,.12,.13]][c];te(13,u==="Clearing"?-.65:1.9,s[0],s[1],s[2])}te(7,96,-3.2,X,j),te(8,14.3,ra,X,j),te(9,_e==="Awash"?.32:_e==="Damp"?-.1:.08,me==="Oxide"?.75:.42,.042*(u==="Thick"?1.3:1),.016),te(10,0,0,1.2,u==="Blue dawn"?2.4:.95),te(15,C[0],C[1],C[2],J),u==="Blue dawn"&&te(24,.07,.13,.26,0),te(14,.0072,.0115,.03,u==="Blue dawn"?.8:.1),te(11,mt,nt,U==="Riding high"?5.5:.7,1),te(12,ue,7,v?3.1:b()*400,v?11:b()*400);const _t={"Faded mixed":[[.42,.12,.08],[.5,.17,.1],[.14,.24,.36],[.2,.34,.48],[.45,.45,.44],[.32,.33,.35],[.55,.38,.12],[.16,.36,.34]],Oxide:[[.4,.16,.08],[.33,.12,.08],[.5,.22,.1],[.27,.17,.13],[.4,.3,.22],[.36,.13,.07],[.52,.29,.12],[.3,.16,.1]],Slate:[[.3,.32,.35],[.24,.28,.33],[.42,.44,.46],[.18,.22,.28],[.26,.34,.4],[.5,.5,.5],[.2,.22,.24],[.36,.32,.28]]}[me],Ze=new Float32Array(32);_t.forEach((a,o)=>{Ze[o*4]=a[0],Ze[o*4+1]=a[1],Ze[o*4+2]=a[2]}),[[...C,1],[...C,1],[.55,.4,.05,.2],[..._t[Math.floor(J*7.99)],0],[.3,.31,.32,.3],[.03,.03,.035,0],[.05,.05,.055,0],[C[0]*.7,C[1]*.7,C[2]*.7,0]].forEach((a,o)=>te(16+o,a[0],a[1],a[2],a[3]));const zt=[[.125,.375],[-.375,.125],[.375,-.125],[-.125,-.375]];let At=1e9,Ft=1e9,Mt=1e9,St=1e9,Ut=1e9,We=99;const ca=()=>{e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,p.tN),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,pt),e.activeTexture(e.TEXTURE7),e.bindTexture(e.TEXTURE_2D,Tt),e.activeTexture(e.TEXTURE8),e.bindTexture(e.TEXTURE_2D,vt),e.activeTexture(e.TEXTURE10),e.bindTexture(e.TEXTURE_2D,p.tX)};function sa(a){e.bindVertexArray(p.vao),ca(),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND);const o=p.P.ground;e.useProgram(o.p),e.activeTexture(e.TEXTURE11),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,bt.fb),e.viewport(0,0,m,m),i[3]=0,i[3*4+3]=m,i[40]=0,i[41]=0,e.uniform4fv(o.uP,i),e.drawArrays(e.TRIANGLES,0,3);const c=p.P.streak;e.useProgram(c.p),e.bindFramebuffer(e.FRAMEBUFFER,wt.fb),e.viewport(0,0,He,He),i[15]=He,e.uniform4fv(c.uP,i),e.drawArrays(e.TRIANGLES,0,3),i[15]=m,e.activeTexture(e.TEXTURE11),e.bindTexture(e.TEXTURE_2D,bt.tex),e.activeTexture(e.TEXTURE13),e.bindTexture(e.TEXTURE_2D,wt.tex);const s=p.P.scene;e.useProgram(s.p),e.bindFramebuffer(e.FRAMEBUFFER,Ke.fb),e.viewport(0,0,m,m),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),i[3]=0,i[3*4+3]=m,e.uniform4fv(s.uPal,Ze);for(let k=0;k<a;k++)i[10*4]=zt[k][0],i[10*4+1]=zt[k][1],i[11*4+3]=1/a,e.uniform4fv(s.uP,i),e.drawArrays(e.TRIANGLES,0,3);e.disable(e.BLEND),i[3]=1,i[3*4+3]=Be,i[10*4]=0,i[10*4+1]=0,i[11*4+3]=1,e.bindFramebuffer(e.FRAMEBUFFER,ct.fb),e.viewport(0,0,Be,Be),e.uniform4fv(s.uP,i),e.drawArrays(e.TRIANGLES,0,3),i[3]=0,i[3*4+3]=m;const w=p.P.rough;e.useProgram(w.p),e.bindFramebuffer(e.FRAMEBUFFER,yt.fb),e.viewport(0,0,Re,Re),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,ct.tex),e.uniform4f(w.uQ,1/Re,1/Re,.11,.012),e.drawArrays(e.TRIANGLES,0,3);const S=p.P.bloom;e.useProgram(S.p),e.bindFramebuffer(e.FRAMEBUFFER,Rt.fb),e.viewport(0,0,128,128),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ke.tex),e.uniform4f(S.uQ,1/128,1/128,.012,.026),e.drawArrays(e.TRIANGLES,0,3);const H=p.P.shaft;e.useProgram(H.p),e.bindFramebuffer(e.FRAMEBUFFER,Pt.fb),e.viewport(0,0,Re,Re);const G=[i[4],i[5],i[6]],oe=[i[8],i[9],i[10]],Q=[i[12],i[13],i[14]],q=i[0],Pe=i[1],be=i[2],ie=[];for(let k=0;k<nt;k++){const fe=[Me[k*8]-q,Me[k*8+1]-Pe,Me[k*8+2]-be],ye=fe[0]*G[0]+fe[1]*G[1]+fe[2]*G[2];if(ye<2||Me[k*8+7]<.5)continue;const le=(fe[0]*oe[0]+fe[1]*oe[1]+fe[2]*oe[2])/ye/qe*.5+.5,we=(fe[0]*Q[0]+fe[1]*Q[1]+fe[2]*Q[2])/ye/qe*.5+.5;if(le<-.15||le>1.15||we<-.15||we>1.15)continue;const I=Math.hypot(fe[0],fe[1],fe[2]),Y=(Me[k*8+4]+Me[k*8+5])*Math.exp(-f*I*2)/(I+8);ie.push([Y,le,we,f*Math.max(I-12*(1-Math.exp(-I/12))-1.5,.02)])}ie.sort((k,fe)=>fe[0]-k[0]);const Ue=new Float32Array(16),Ne=Math.min(4,ie.length),tt=Ne?ie[0][0]:1;for(let k=0;k<Ne;k++)Ue[k*4]=ie[k][1],Ue[k*4+1]=ie[k][2],Ue[k*4+2]=ie[k][3],Ue[k*4+3]=1.15*Math.sqrt(ie[k][0]/tt);e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ke.tex),e.uniform4fv(H.uK,Ue),e.uniform4f(H.uQ,1/Re,1/Re,.17,Ne),e.drawArrays(e.TRIANGLES,0,3)}let Oe=parseInt(t.hash.slice(10,18),16)^2890557|0;const je=()=>{Oe=Oe+1831565813|0;let a=Math.imul(Oe^Oe>>>15,1|Oe);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},Xt=[];for(let a=0;a<22;a++){const o=b()*6.2832,c=1.2+Math.pow(b(),.7)*15;Xt.push({x:ae[0]+Math.cos(o)*c,z:ae[2]+6+Math.sin(o)*c,per:3.2+b()*8,next:b()*9,str:.05+b()*.06})}const Ye=32,Dt=ae[0]-Ye*.5,kt=ae[2]+6-Ye*.5,Qe=g==="Steady rain"?1:g==="Drizzle"?.4:0;let Ve=0,Je=0,$e=0;const et=[],ze=new Float32Array(12),F=new Float32Array(13*4);function gt(a){const o=p.P.sim,c=st[Ve],s=st[Ve^1];e.useProgram(o.p),e.bindVertexArray(p.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,s.fb),e.viewport(0,0,Se,Se),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,c.tex),ze[0]=Se,ze[1]=Ye,ze[2]=Dt,ze[3]=kt;for(let w=0;w<2;w++){const S=et[w];ze[4+w*4]=S?S.x:-1e3,ze[5+w*4]=S?S.z:-1e3,ze[6+w*4]=S?S.s:0}ze[7]=$e*1.37%91,ze[11]=1-.0011*Qe*Qe*(Qe>.5?1:.5),et.splice(0,2),e.uniform4fv(o.uS,ze),e.drawArrays(e.TRIANGLES,0,3),Ve^=1}const ia=je()*6.28,fa=je()*6.28,Ct=(r==="Under the cranes"?3.5:r==="Yard canyon"?-31.2:19.5)+(je()-.5)*(r==="Yard canyon"?.6:3),Nt=a=>225+95*Math.sin(.031*a+ia)+34*Math.sin(.0113*a+fa),he=new Float32Array(4*4);function Lt(a,o){const c=t.view||Bt,s=Ce+(c.yaw||0),w=Ge+(c.pitch||0),S=ae[0]+(c.x||0),H=ae[1]+(c.y||0),G=ae[2]+(c.z||0),oe=s!==At||w!==Ft||S!==Mt||H!==St||G!==Ut;if(oe||We===6){oe&&(At=s,Ft=w,Mt=S,St=H,Ut=G);const q=Math.cos(w),Pe=Math.sin(w),be=Math.cos(s),ie=Math.sin(s);te(0,S,H,G,0),te(1,ie*q,Pe,be*q,qe),te(2,be,0,-ie,0),te(3,-ie*Pe,q,-be*Pe,m),sa(oe&&We>0&&a>0?1:4),We=oe?0:7,he[0]=S,he[1]=H,he[2]=G,he[3]=0,he[4]=i[4],he[5]=i[5],he[6]=i[6],he[7]=i[7],he[8]=i[8],he[9]=i[9],he[10]=i[10],he[12]=i[12],he[13]=i[13],he[14]=i[14]}else We<7&&We++;for(const q of Xt)a>=q.next&&(a>0&&a-q.next<.5&&et.length<6&&et.push({x:q.x,z:q.z,s:q.str*(.6+.8*je())}),q.next=Math.max(q.next,a-1)+q.per*(.35+1.3*je()));for(Je=Math.min(Je+o,.1);Je>=1/30;)gt(a),Je-=1/30,$e++;$e===0&&o===0&&(gt(a),$e=1);const Q=p.P.comp;e.useProgram(Q.p),e.bindVertexArray(p.vao),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,m,m),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_3D,p.tN),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,st[Ve].tex),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,Ke.tex),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,ct.tex),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,yt.tex),e.activeTexture(e.TEXTURE6),e.bindTexture(e.TEXTURE_2D,Rt.tex),e.activeTexture(e.TEXTURE9),e.bindTexture(e.TEXTURE_2D,p.tS),e.activeTexture(e.TEXTURE12),e.bindTexture(e.TEXTURE_2D,Pt.tex),F[0]=1.6,F[1]=1/m,F[2]=a,F[3]=f,F[4]=.55,F[5]=1.9,F[6]=0,F[7]=0,F[8]=Dt,F[9]=kt,F[10]=Ye,F[11]=0,F[12]=2.2,F[13]=1.1,F[14]=.7,F[15]=Qe*.75,F[16]=M.f[0],F[17]=M.f[1],F[18]=M.f[2],F[19]=Qe;{const q=Nt(a),Pe=Nt(a+.5)-q,be=Math.min(1,Math.max(0,.5-Pe*2.5)),ie=[i[4],i[5],i[6]],Ue=[i[8],i[9],i[10]],Ne=[i[12],i[13],i[14]],tt=(ye,le,we)=>{const I=[ye-S,le-H,we-G],Y=I[0]*ie[0]+I[1]*ie[1]+I[2]*ie[2];return[(I[0]*Ue[0]+I[1]*Ue[1]+I[2]*Ue[2])/Y/qe,(I[0]*Ne[0]+I[1]*Ne[1]+I[2]*Ne[2])/Y/qe,Y]},k=(ye,le,we)=>{const I=tt(ye,le,we);return I[2]<1?null:[I[0],I[1],tt(ye,-le,we)[1]]},fe=[[-1.7,2.3,1],[1.7,2.3,1],[-2.3,14.4,0],[2.3,14.4,0]];for(let ye=0;ye<4;ye++){const le=fe[ye],we=q+(le[2]?be>.5?-4:4:0),I=k(Ct+le[0],le[1],we),Y=20+ye*8,It=Math.hypot(Ct+le[0]-S,le[1]-H,we-G),la=Math.exp(-f*It*.9),it=le[2]?[1*be+1*(1-be),.9*be+.1*(1-be),.75*be+.05*(1-be)]:[1,.5,.12],ft=(le[2]?0:.8)*Math.min(la,.05)*24;if(!I){F[Y+4]=0,F[Y+5]=0,F[Y+6]=0,F[Y+7]=1e9,F[Y]=9;continue}F[Y]=I[0],F[Y+1]=I[1],F[Y+2]=I[2],F[Y+3]=Math.max(.0022,1.6/m),F[Y+4]=it[0]*ft,F[Y+5]=it[1]*ft,F[Y+6]=it[2]*ft,F[Y+7]=f*.92*It}}e.uniform4fv(Q.uC,F),e.uniform4fv(Q.uP,he),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)}return Lt(0,0),Lt}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
