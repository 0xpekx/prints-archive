// Attic Beam: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/254.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ut){Ut&&function(){const Bt=new WeakMap,uo=1.2,fo=.8,lo=.1,vo=.8,mo=.14,ho=.92,Dt=[.4,.5],xo=1,Ct=.27,po=.27,qt=3.2,Rt=.8,It=[.55,.3],Ot=[1.2,.2],Vt=[2.1,.5],bo=.1,yo=1,wo=.6,Fo=[4.2,1.4,1.8,1.6,3.6,4.2],pt=80,Ae=256,be=128,He=256,Gt=64,ve=12,Xe=44,To=9,go=.09,Eo=[.6,.72,1],Ro=2.4,So=72,zo=[.004,.0068,.017,.006],Ao=[.15,.21,.4,1],O=`#version 300 es
out vec2 vF;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vF=p;gl_Position=vec4(p*2.-1.,0.,1.);}`,re=`
layout(std140) uniform W{
  vec4 uEye,uRt,uUp,uFw;
  vec4 uSO,uSU,uSV,uSN;
  vec4 uSun,uDom,uZr,uTm,uCfg,uPlm,uRoof,uSunC,uMt,uVw,uBd,uCh;
  vec4 uI[6];
  vec4 uAm,uGs;
};
#ifdef CHIM
#define GT uGs.rgb
#else
#define GT 1.
#endif
vec3 beamS(vec3 p){float tt=dot(uSO.xyz-p,uSN.xyz)*uSN.w;vec3 q=p+uSun.xyz*tt-uSO.xyz;return vec3(dot(q,uSU.xyz)*uSU.w,dot(q,uSV.xyz)*uSV.w,tt);}
vec2 toUV(vec2 p){return (p-uDom.xy)*uDom.zw;}
vec4 layerW(float z){float k=clamp((z-uZr.x)*uZr.y,0.,1.)*3.;return clamp(1.-abs(k-vec4(0.,1.,2.,3.)),0.,1.);}
`,Z=`#version 300 es
precision highp float;
precision highp sampler2D;
`,_o=Z+`
in vec2 vF;out vec4 o;
float h2(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float vn(vec2 p,float n){vec2 i=floor(p),f=p-i;f=f*f*f*(f*(f*6.-15.)+10.);
  float a=h2(mod(i,n)),b=h2(mod(i+vec2(1.,0.),n)),c=h2(mod(i+vec2(0.,1.),n)),d=h2(mod(i+vec2(1.,1.),n));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
uniform int uOct;
void main(){vec2 u=vF;
  // ten octaves from one call site: r four, g four, b two
  vec4 acc=vec4(0.);float a=h2(floor(u*256.)+.5);
  for(int i=0;i<uOct;i++){
    float fi=float(i);
    float grp=i<4?0.:(i<8?1.:2.);
    float st=i<4?fi:(i<8?fi-4.:fi-8.);
    float n=(grp<.5?8.:(grp<1.5?32.:96.))*pow(2.,st);
    vec2 q=u+(grp<.5?vec2(0.):(grp<1.5?vec2(.37):vec2(.11)));
    float v=vn(q*n+(grp<1.5?st*17.3:5.1+st*3.),n);
    float wg=grp<1.5?pow(.5,st+1.):(st<.5?.65:.35);
    if(grp<.5)acc.r+=v*wg;else if(grp<1.5)acc.g+=v*wg;else acc.b+=v*wg;
  }
  float r=acc.r/.9375,g=acc.g/.9375,b=acc.b;
  r=clamp((r-.5)*1.7+.5,0.,1.);g=clamp((g-.5)*1.7+.5,0.,1.);
  o=vec4(r,g,b,a);}`,Ht=e=>Z+"#define KIND "+e+`.

in vec2 vF;out vec4 o;
uniform sampler2D uN;
uniform vec4 uA;  // kind, seed, halfU m, halfV m
uniform int uZ;   // never set (0): keeps the constant loops rolled, which halves this bake's compile
float n1(vec2 p){return textureLod(uN,p,0.).r;}
float n2(vec2 p){return textureLod(uN,p,0.).g;}
float n3(vec2 p){return textureLod(uN,p,0.).b;}
float seg(vec2 p,vec2 a,vec2 b,float r){vec2 d=b-a;float h=clamp(dot(p-a,d)/dot(d,d),0.,1.);return length(p-a-d*h)-r;}
void main(){
  vec2 p=(vF*2.-1.)*uA.zw;      // metres on the roof: x along the crack, y across it
  float s=uA.y;
  float k=KIND,d;
  float g1=n2(p*vec2(.16,1.5)+s)-.5,g2=n3(p*vec2(.4,3.2)+s)-.5;
  if(k<.5){
    // a crack between two shrunk boards: a finger wide at most, a forearm long, pinched to nothing at both ends
    float tp=sqrt(max(1.-p.x*p.x*52.,0.));
    float w=(.0105+.0028*(n1(vec2(p.x*.22+s,s*.3))-.5)*2.+.0035*p.x/.128)*tp;
    d=max(abs(p.y+.0016*sin(p.x*7.+s))-w,abs(p.x)-.128-.016*n2(vec2(p.y*.9,s)));
    d+=g1*.0022+g2*.0011;
  }else if(k<1.5){
    // a slipped slate: a torn wedge, wide at one end
    float w=mix(.014,.056,smoothstep(-.13,.12,p.x));
    d=max(abs(p.y-.08*p.x)-w,abs(p.x)-.125);
    d+=g1*.012+g2*.005;
  }else if(k<2.5){
    // a knot gone from a board, and a little one beside it
    d=length(p*vec2(.85,1.15)-vec2(-.015,.0))-.06;
    d=min(d,length(p-vec2(.1,.02))-.013);
    d+=(n2(p*.8+s)-.5)*.012;
  }else if(k<3.5){
    // one board split: two parallel blades of light with a sliver between
    float a=abs(p.y-.05)-.019-.012*(n1(vec2(p.x*.3+s,.2))-.5),b=abs(p.y+.04)-.026-.012*(n1(vec2(p.x*.3+s*2.,.7))-.5);
    d=max(min(a,b),abs(p.x)-.13);
    d+=g1*.008;
  }else if(k<4.5){
    // shrunk slats: three narrow gaps between boards across the crack, each its own blade of light
    d=1.;
    for(int i=0;i<3+uZ;i++){float fi=float(i);
      float xc=(fi-1.)*.135+.012*(n1(vec2(fi*.37+s,.4))-.5);
      float w=.009+.006*fract(fi*.618+s*1.3)+.004*(n1(vec2(p.y*.3+s+fi,.6+fi*.2))-.5);
      float y0=.025*(fract(fi*.41+s*2.7)-.5);
      d=min(d,max(abs(p.x-xc-.06*p.y)-w,abs(p.y-y0)-.07-.02*fract(fi*.77+s)));}
    d+=g1*.005+g2*.003;
  }else{
    // nail holes and a knot: a scatter of small round openings, each a pinhole of the sun
    d=length((p-vec2(-.155,-.03))*vec2(.9,1.1))-.022;
    d=min(d,length(p-vec2(-.06,.045))-.015);
    d=min(d,length(p-vec2(.05,-.04))-.018);
    d=min(d,length(p-vec2(.15,.035))-.013);
    d=min(d,length(p-vec2(.1,.06))-.006);
    d+=(n2(p*.8+s)-.5)*.008;
  }
  float m=smoothstep(.0014,-.0014,d),m0=m;
  // the opening as seen from below (only the up view reads it): its two edges splintered, unevenly, and stored as a
  // soft ramp so the picture's own filtering draws a smooth outline, not the texels' steps
  float db=d+.0026*(n3(vec2(p.x*2.3,sign(p.y)*.31)+s*2.)-.5)*2.+.003*(n2(vec2(p.x*.9,sign(p.y)*.53)+s)-.5)*2.;
  float mB=smoothstep(.0042,-.0042,db);
  // splinters, a nail and old web across the opening take thin bites out of the light
  float sp=seg(p,vec2(-.13,.02+g1*.02),vec2(-.04,.008),.0024+.002*g2);
  sp=min(sp,seg(p,vec2(.13,-.028),vec2(.05,-.005+g1*.01),.002));
  sp=min(sp,seg(p,vec2(-.11,-.012+.005*sin(s*7.)),vec2(.12,-.004+.008*sin(s*3.)),.0011));
  sp=min(sp,length(p-vec2(.03+g1*.05,.02*sin(s*9.)))-.0035);
  m*=smoothstep(-.0005,.0014,sp);
  // what the eye sees in the slit: the clean opening, one splinter and a nail shank across it (G); the beam takes it all (R)
  float vis=m0*smoothstep(-.0004,.0012,min(seg(p,vec2(-.13,.02+g1*.02),vec2(-.06,.011),.002),seg(p,vec2(.034,-.07),vec2(.039,.07),.0021)));
  for(int i=0;i<7+uZ;i++){
    float fi=float(i),u0=(fract(fi*.618034+s*1.7)-.5)*.27,wd=.0012+.0036*fract(fi*.7548+s*3.1);
    float depth=.2+.28*fract(fi*.5698+s);
    float tilt=(fract(fi*.3819+s*2.3)-.5)*.5;
    float lim=step(abs(p.y-(fract(fi*.87+s)-.5)*.05),.03+.05*fract(fi*.41+s));
    float dist=abs(p.x-u0-p.y*tilt+g1*.006);
    m*=1.-depth*lim*smoothstep(wd+.0012,wd-.0006,dist);
  }
  // grime on what is left: the light through it is never even
  m*=.82+.18*smoothstep(.2,.7,n1(vec2(p.x*.42+s*.4,p.y*.09+s)));
  float web=seg(p,vec2(-.07,-.07),vec2(.012,.07),.0006);
  web=min(web,seg(p,vec2(.075,-.06),vec2(.03,.07),.0005));
  m*=mix(.5,1.,smoothstep(0.,.0014,web));
  o=vec4(m,vis,mB,1.);}`,St=`
layout(std140) uniform B{vec4 uP[${pt*4}];};
uniform int uCount,uRays,uMode;
uniform float uIrrRes;
uniform sampler2D uN,uMask,uIrr;
vec3 rayDir(vec2 f){return normalize(uFw.xyz+(f.x*2.-1.)*uRt.w*uRt.xyz+(f.y*2.-1.)*uRt.w*uUp.xyz);}
float R_(vec2 p){return textureLod(uN,p,0.).r;}
float G_(vec2 p){return textureLod(uN,p,0.).g;}
float B_(vec2 p){return textureLod(uN,p,0.).b;}
float maskAt(vec3 p,float lod){vec3 s=beamS(p);return textureLod(uMask,s.xy*.5+.5,lod).r;}
// what the eye sees open; from below and close (looking up the shaft) the clean opening, no hairlines across it
float maskV(vec3 p){vec3 s=beamS(p);vec2 m=textureLod(uMask,s.xy*.5+.5,0.).gb;return uUp.w<.5?m.y:m.x;}
// One loop, one call site: every ray of a pixel comes through here.
float isect(vec3 ro,vec3 rd,float tmax,bool holes,out int id,out vec3 lo,out vec3 ln){
  float best=tmax,holeT=-1.;id=-1;lo=vec3(0.);ln=vec3(0.,1.,0.);
  for(int i=0;i<uCount;i++){
    vec4 c=uP[i*4],hh=uP[i*4+1];vec3 ax=uP[i*4+2].xyz,ay=uP[i*4+3].xyz,az=cross(ax,ay);
    vec3 d=ro-c.xyz,o=vec3(dot(d,ax),dot(d,ay),dot(d,az)),v=vec3(dot(rd,ax),dot(rd,ay),dot(rd,az));
    float t=-1.;vec3 nn=vec3(0.,1.,0.);
    if(c.w<.5||c.w>2.5){
      vec3 iv=1./(v+vec3(equal(v,vec3(0.)))*1e-6),a=(-hh.xyz-o)*iv,b=(hh.xyz-o)*iv,mn=min(a,b),mxx=max(a,b);
      float t0=max(mn.x,max(mn.y,mn.z)),t1=min(mxx.x,min(mxx.y,mxx.z));
      if(t0<t1&&t1>0.&&t0>0.){
        t=t0;
        nn=vec3(0.);
        if(mn.x>=mn.y&&mn.x>=mn.z)nn.x=-sign(v.x);else if(mn.y>=mn.z)nn.y=-sign(v.y);else nn.z=-sign(v.z);
        if(holes&&c.w>2.5){if(maskV(ro+rd*t)>.5){holeT=t;t=-1.;}}
      }
    }else if(c.w<1.5){
      // elliptic cylinder along local x
      vec2 oo=o.yz/hh.yz,vv=v.yz/hh.yz;
      float A=dot(vv,vv),B=dot(oo,vv),C=dot(oo,oo)-1.,D=B*B-A*C;
      if(D>0.&&A>1e-8){
        float t0=(-B-sqrt(D))/A,xh=o.x+v.x*t0;
        if(t0>0.&&abs(xh)<hh.x){t=t0;vec2 q=(oo+vv*t0)/hh.yz;nn=normalize(vec3(0.,q));}
        else{
          float tc=(-sign(v.x)*hh.x-o.x)/(abs(v.x)>1e-6?v.x:1e-6);
          vec2 q=(oo+vv*tc);
          if(tc>0.&&dot(q,q)<1.){t=tc;nn=vec3(-sign(v.x),0.,0.);}
        }
      }
    }else{
      // ellipsoid
      vec3 oo=o/hh.xyz,vv=v/hh.xyz;
      float A=dot(vv,vv),B=dot(oo,vv),C=dot(oo,oo)-1.,D=B*B-A*C;
      if(D>0.){float t0=(-B-sqrt(D))/A;if(t0>0.){t=t0;nn=normalize((oo+vv*t0)/hh.xyz);}}
    }
    if(t>0.&&t<best){best=t;id=i;lo=o+v*t;ln=nn;}
  }
  if(holeT>0.&&best>holeT){best=tmax;id=-1;}
  return best;
}
float ign(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
`,Mo=`
float gFp=.001; // what one pixel covers on the surface, metres across
// how much of a pixel a line of half-width w at distance x covers (a box filter, so a thin joint never breaks into dashes)
float lineC(float x,float w){return clamp((min(x+gFp*.5,w)-max(x-gFp*.5,-w))/gFp,0.,1.);}
// Wood with the grain along g.x. Scales in metres: the tile holds 8 and 32 cell fbm.
float woodH(vec2 g,float sd){
  float big=R_(g*vec2(.33,2.1)+sd);
  float mid=G_(g*vec2(.34,4.4)+sd*3.1+big*.09);
  float fin=B_(g*vec2(.8,15.)+sd*7.3);
  float adz=R_(g*vec2(1.5,.35)+sd*1.7);
  float chk=smoothstep(.016,.0,abs(R_(g*vec2(.07,1.1)+sd*5.)-.5))*smoothstep(.34,.62,R_(g*vec2(.19,.5)+sd*9.));
  return big*.34+mid*.42+fin*.16+adz*.34-chk*.62;
}
// where material() reads the wood and where the bump reads its height: one woodH call site serves both (Windows inlines each)
void matPre(int m,float sd,vec3 lo,vec3 ln,vec3 P,out vec2 wq,out float ws,out vec2 fu){
  vec2 g=abs(ln.x)>.5?lo.yz*vec2(7.,7.):(abs(ln.y)>.5?lo.xz:lo.xy);
  float bw=m==2?.186:.148;
  float cx=m==2?P.x+.07:(abs(ln.y)>.5?lo.x:lo.y)+sd*3.+.31;
  float bs_=fract(floor(cx/bw)*(m==2?.7548776:.6180339)+(m==2?.21:0.));
  float al_=abs(ln.y)>.5?lo.z:lo.x;
  wq=m==0?vec2(al_+bs_*9.,cx):(m==2?vec2(P.z+bs_*17.,cx):g);
  ws=m==0?bs_*5.+sd:(m==2?bs_*7.+1.:sd);
#ifdef CHIM
  fu=m==0?vec2(al_,cx):(m==2?vec2(P.z,cx):(m==7?g*2.:(m>8?vec2(abs(ln.x)>.5?lo.z:lo.x,P.y):(m>7?P.xy:g))));
#else
  fu=m==0?vec2(al_,cx):(m==2?vec2(P.z,cx):(m==7?g*2.:(m>7?P.xy:g)));
#endif
}
void material(int m,float sd,float wd,vec3 lo,vec3 ln,vec3 hh,vec3 P,vec3 Ng,out vec3 alb,out vec2 fuv,out float spec,out float gl,out vec3 emi){
  alb=vec3(.1);spec=.02;gl=24.;emi=vec3(0.);
  // face coordinates: grain is along local x on the long faces
  vec2 g=abs(ln.x)>.5?lo.yz*vec2(7.,7.):(abs(ln.y)>.5?lo.xz:lo.xy);
  fuv=g;
  float up=max(Ng.y,0.);
  float dn=R_(P.xz*.21+P.y*.13);
  float dg=G_(P.xz*.6+P.y*.4+7.);
  // the boards and timbers share one wood lookup
  float bw=m==2?.186:.148;
  float cx=m==2?P.x+.07:(abs(ln.y)>.5?lo.x:lo.y)+sd*3.+.31;
  float bf=floor(cx/bw),bx=fract(cx/bw);
  float bs_=fract(bf*(m==2?.7548776:.6180339)+(m==2?.21:0.));
  float al_=abs(ln.y)>.5?lo.z:lo.x;
  if(m==0){
    // roof boards seen from below: rough sawn, grey with age
    float w=bw,x=cx,fb=bf,fx=bx,al=al_,bs=bs_;
    float gap=min(fx,1.-fx)*w;
    alb=mix(vec3(.098,.073,.052),vec3(.064,.047,.034),bs)*(.5+.95*wd);
    // the joint: a soft dark line, a little wider where a board has shrunk
    float jw=.0024+.0015*G_(vec2(al*.21+bs*5.,fb*.43));
    alb=mix(alb,vec3(.006),max(lineC(gap,jw),lineC(gap,jw*2.1)*.45));
    // daylight through the joint where a slate above has slipped: a few short slivers
    float lk=lineC(gap,.0009)*smoothstep(.86,.92,G_(vec2(al*.3+bs*3.,fb*.37+.5)));
    emi=vec3(1.,.93,.8)*GT*lk*uTm.z*.16;
    fuv=vec2(al,x);
  }else if(m==1){
    // hewn timber
    float t=fract(sd*7.77);
    alb=mix(vec3(.082,.054,.034),vec3(.125,.082,.05),t)*(.42+1.15*wd);
    if(uRoof.w>2.5){
      // lime wash, most of it still on
      alb=mix(alb,vec3(.46,.44,.38)*(.72+.5*wd),smoothstep(.34,.52,R_(g*vec2(.4,1.3)+sd)+.2*G_(g*2.)));
    }else if(uRoof.w>1.5){
      // tarred: nearly black with a thick shine
      alb*=.3;spec=.22;gl=44.;
    }else if(uRoof.w>.5){
      alb*=vec3(1.55,1.32,1.02);
    }
    // old lime wash splashes and worm holes
    alb*=1.-.75*smoothstep(.2,.1,B_(g*vec2(1.7,1.9)+sd*3.))*smoothstep(.58,.68,R_(g*.29+sd));
    alb=mix(alb,vec3(.21,.195,.17),smoothstep(.0,.5,up)*smoothstep(.34,.72,dn+.25*dg)*.8);
    if(uRoof.w<1.5||uRoof.w>2.5){spec=.03;gl=18.;}
  }else if(m==2){
    // floor boards along z, wide and old, with dust that was never swept
    float w=bw,x=cx,fx=bx,bs=bs_;
    float gap=min(fx,1.-fx)*w;
    float end=fract(P.z/2.7+bs*3.);
    gap=min(gap,abs(end-.5)*2.7+step(.6,bs)*9.);
    fuv=vec2(P.z,x);
    vec3 wood=mix(vec3(.15,.1,.062),vec3(.095,.062,.04),bs)*(.45+1.1*wd);
    float dust=smoothstep(.2,.8,dn*.9+dg*.32+.08);
    dust*=.78+.22*B_(P.xz*1.4);
    // scuffs dragged through the dust
    float sc=smoothstep(.024,.0,abs(R_(vec2(P.x*.17+P.z*.1,P.z*.03)+.3)-.47));
    dust*=1.-.65*sc;
    vec3 dc=vec3(.2,.183,.156)*(.82+.36*G_(P.xz*1.3));
    alb=mix(wood,dc,dust*.86);
    // dust packs into the gaps, then the gap itself
    alb=mix(alb,vec3(.012,.009,.007),smoothstep(.0052,.0016,gap));
    // nail heads over the joists
    float jz=abs(fract(P.z/.42+bs*.3)-.5)*.42;
    float nl=length(vec2(jz,(abs(fx-.5)-.38)*w));
    alb=mix(alb,vec3(.018,.016,.016),smoothstep(.0062,.0034,nl));
    spec=.03*(1.-dust);gl=30.;
  }else if(m==3){
    // trunk: leather gone dull, cracked, dust on top
    float cr=smoothstep(.02,.0,abs(G_(g*.9+sd)-.5));
    alb=mix(vec3(.15,.082,.042),vec3(.082,.046,.026),R_(g*.8+sd))*(1.-.5*cr)*(.72+.56*G_(g*2.1));
    alb=mix(alb,vec3(.28,.26,.225),smoothstep(.0,.6,up)*smoothstep(.2,.68,dn+.3*dg)*.88);
    spec=.05;gl=22.;
  }else if(m==4){
    // old tin and iron
    float rs=R_(P.xz*.9+P.y*1.1+sd)*.7+G_(P.xz*1.7+P.y*2.3)*.5;
    alb=mix(vec3(.15,.145,.13),vec3(.11,.066,.04),smoothstep(.42,.72,rs));
    alb=mix(alb,vec3(.22,.205,.18),up*.45);
    spec=.1*(1.-smoothstep(.4,.7,rs));gl=26.;
#ifdef CHIM
    if(sd>2.){
      // galvanised sheet gone dull: lead-grey, a faint spangle, white bloom in patches, rust only along the bottom seam
      alb=vec3(.155,.16,.16)*(.8+.4*dg)+vec3(.05)*smoothstep(.55,.8,rs);
      alb=mix(alb,vec3(.11,.066,.04),smoothstep(.12,.02,P.y-.15)*.8);
      alb=mix(alb,vec3(.22,.205,.18),up*.6);
      spec=.05;gl=9.;
    }
#endif
  }else if(m==5){
    // dark bottle glass
    alb=vec3(.016,.03,.016);spec=.9;gl=170.;
    alb=mix(alb,vec3(.2,.19,.16),smoothstep(.15,.85,up)*.75);
  }else if(m==6){
    // crate: pale pine, split slats
    alb=vec3(.135,.098,.06)*(.48+1.02*wd);
#ifdef CHIM
    if(sd>2.){
      // tea-chest plywood, pale as straw, its edges bound in tin gone dark
      alb=vec3(.3,.245,.16)*(.7+.5*wd);
      vec3 ee=hh-abs(lo);float e=min(min(abs(ln.x)>.5?9.:ee.x,abs(ln.y)>.5?9.:ee.y),abs(ln.z)>.5?9.:ee.z);
      alb=mix(alb,vec3(.07,.068,.062),smoothstep(.034,.026,e));
    }
#endif
    alb=mix(alb,vec3(.29,.27,.235),smoothstep(.0,.6,up)*smoothstep(.2,.7,dn+.3*dg)*.82);
  }else if(m==7){
    // woven cloth, faded rug, book boards: a fine weave
    float wv=B_(g*vec2(9.,9.)+sd)*.5+.5*B_(g.yx*vec2(11.,8.)+sd*2.);
    vec3 a=mix(vec3(.2,.075,.05),vec3(.09,.1,.11),fract(sd*3.3));
    float st=step(.5,fract(lo.x*5.5+.15*R_(g*.7+sd)));
    alb=mix(a,a*.48+vec3(.1,.085,.06),st)*(.55+.8*wv);
    alb=mix(alb,vec3(.26,.24,.21),smoothstep(.0,.6,up)*smoothstep(.2,.68,dn+.3*dg)*.82);
    fuv=g*vec2(2.);
  }else{
    // far gable: old brick under soot, very nearly gone. The chimney stack (9) is the same brick on its own faces, the
    // courses wandering a few millimetres, under a lime wash gone grey with soot up high and flaked off low down
#ifdef CHIM
    vec2 bp=m>8?vec2((abs(ln.x)>.5?lo.z:lo.x)+sd*3.,P.y+(dg-.5)*.016):P.xy;
#else
    vec2 bp=P.xy;
#endif
    float bh=.075,bw=.22,row=floor(bp.y/bh),ox=mod(row,2.)*.11;
    vec2 bq=vec2(fract((bp.x+ox)/bw)*bw,fract(bp.y/bh)*bh);
    float mor=min(min(bq.x,bw-bq.x),min(bq.y,bh-bq.y));
    alb=mix(vec3(.15,.09,.066),vec3(.09,.065,.052),R_(vec2(floor((bp.x+ox)/bw)*.31,row*.17)))*(.7+.55*G_(bp*1.3));
    alb=mix(alb,vec3(.1,.095,.085),smoothstep(.009,.003,mor));
    fuv=bp;
#ifdef CHIM
    if(m>8){
      // one lookup: the flakes from its coarse noise, their torn edges from its fine one, the wash's unevenness between
      vec4 nz=textureLod(uN,bp*vec2(1.6,2.4)+sd,0.);
      float fl=smoothstep(.8,.84,nz.r*.75+.22*nz.b+.4*smoothstep(.9,.0,P.y));
      vec3 wash=vec3(.28,.268,.244)*(.86+.24*nz.g);
      wash*=1.-.2*smoothstep(.007,.002,mor);
      float so=smoothstep(.7,1.9,P.y+.5*dn-.25)*.8;
      // one flue brick has worked loose: soot has streamed up the face from it
      so=max(so,smoothstep(.07,.0,abs(bp.x-sd*3.-.1+.03*sin(P.y*3.)))*smoothstep(.8,1.1,P.y)*.8);
      wash=mix(wash,vec3(.09,.083,.075),so*.75);
      alb=mix(mix(alb,vec3(dot(alb,vec3(.33))),.5)*.8,wash,1.-fl);
      // the faces the sun does not reach still see the boards it lit in front of the stack: a warm second bounce,
      // strongest low down
      emi=vec3(alb.r*.11*(1.-max(dot(Ng,normalize(uCh.xyz)),0.))*smoothstep(1.6,.1,P.y));
    }
#endif
  }
}
float heightAt(int m,float sd,vec2 u,vec3 P){
  float h;
  if(m==3||m==7){h=G_(u*.9+sd)*.4+B_(u*3.+sd)*.25;}
  else if(m==4){h=G_(u*1.4+sd)*.5+B_(u*3.+sd)*.15;}
  else if(m==5){h=0.;}
  else if(m>=8){h=G_(u*1.1)*.5+B_(u*2.)*.15;}
  else{h=woodH(u,sd);}
  return h;
}
`,zt=`
in vec2 vF;
#if SM==1
out uvec4 o;
#else
out vec4 o;
#endif
#if SM==0
uniform highp usampler2D uMat;
#endif
float encC(float v){return log2(1.+v*64.)*.1;}
void main(){
  vec3 rd0=rayDir(vF);
  vec3 P=vec3(0.),Ng=vec3(0.,1.,0.),Nb=Ng,alb=vec3(0.),emi=vec3(0.),V=-rd0,col=vec3(0.);
  float spec=0.,gls=8.,ao=0.,tHit=12.,sunV=0.,nearF=0.,sM=0.,tt=0.,NLs=0.;
  vec3 Epatch=vec3(0.),Ebeam=vec3(0.),Esky=vec3(0.),Sp=vec3(0.);
  bool hitAny=false;
  int id0=-1;vec3 lo0=vec3(0.),ln0=vec3(0.,1.,0.);
  vec4 wn=textureLod(uN,gl_FragCoord.xy/256.,0.),wm=textureLod(uN,gl_FragCoord.yx/256.+.37,0.);
  float jit=wn.a,j2=wm.a;
  vec3 L=uSun.xyz;
  // where the shaft lands: the floor, or a chimney's face (uCh: its normal and how far down the shaft it stands)
#ifdef CHIM
  float floorT=uCh.w;
#else
  float floorT=uSO.y/L.y;
#endif
  vec3 Pc=uSO.xyz-L*floorT;
#if SM==1
  const int nR=1;
#else
  int nR=uRays;
#endif
  for(int r=0;r<nR;r++){
    vec3 ro=uEye.xyz,rd=rd0;float tm=12.;
    vec3 tg=vec3(0.);
    if(r>0){
      if(!hitAny)break;
      ro=P+Ng*.0035;
      float ang=(jit+float(r)*.618)*6.2832,rad=sqrt(fract(j2+float(r)*.37));
      if(r==1){rd=L;tm=(sM>.002&&dot(Ng,L)>0.)?tt-.012:-1.;}
#if SM==2
      else{
        if(r<4)tg=uSO.xyz+uSU.xyz*(rad*cos(ang))*.11+uSV.xyz*(rad*sin(ang))*.04;
        else if(r<10){
          tg=uSU.xyz*(rad*cos(ang))*.13+uSV.xyz*(rad*sin(ang))*.06;
#ifdef CHIM
          vec3 cn=normalize(uCh.xyz);tg+=cn*(.025-dot(tg,cn));
#endif
          tg+=Pc;
        }
        else if(r<14)tg=uSO.xyz-L*floorT*((float(r-10)+fract(j2+float(r)*.61))*.25)+uSU.xyz*(rad*sin(ang))*.1;
        else{
          vec3 h=normalize(abs(Ng.y)<.9?cross(Ng,vec3(0.,1.,0.)):cross(Ng,vec3(1.,0.,0.))),b=cross(Ng,h);
          float a2=(jit+float(r)*.381966)*6.2832,rr=sqrt(fract(j2+float(r)*.7548));
          tg=P+normalize(h*cos(a2)*rr+b*sin(a2)*rr+Ng*sqrt(max(1.-rr*rr,0.)))*.62;
        }
        vec3 dv=tg-ro;tm=length(dv);rd=dv/tm;tm-=.012;
      }
#endif
    }
    int id;vec3 lo,ln;
    float th=isect(ro,rd,tm,r==0,id,lo,ln);
    if(r==0){
      if(id>=0){
        hitAny=true;tHit=th;
        vec4 c=uP[id*4],hh=uP[id*4+1];vec3 ax=uP[id*4+2].xyz,ay=uP[id*4+3].xyz,az=cross(ax,ay);
        float sd=uP[id*4+2].w;
        nearF=uP[id*4+3].w;
        int m=int(hh.w+.5);
        Ng=normalize(ax*ln.x+ay*ln.y+az*ln.z);
        P=ro+rd*th;
        id0=id;lo0=lo;ln0=ln;
#if SM==0
        vec3 s=beamS(P);tt=s.z;
        float inR=step(abs(s.x),1.)*step(abs(s.y),1.)*step(0.,tt);
        sM=inR*textureLod(uMask,s.xy*.5+.5,log2(max(tt*uZr.z,1.))).r;
#endif
      }else{
        // through the gap: bright sky, the torn edge of the slates against it
        float dn=max(abs(dot(rd0,uSN.xyz)),.15);
        float t0=dot(uSO.xyz-ro,uSN.xyz)/dot(rd0,uSN.xyz);
        tHit=t0+.05;
      }
    }else{
      float vis=id<0?1.:0.;
      if(r==1){
        sunV=(tm>0.?vis:0.)*sM;
      }
#if SM==2
      else if(r<4){
        vec3 dv=tg-P;float d2=dot(dv,dv);vec3 dd=dv/sqrt(d2);
        float a=max(dot(dd,-uSN.xyz),0.)*.6+.4;
        Esky+=vis*vec3(.5,.62,.84)*max(dot(Ng,dd),0.)*a/(d2+.02)*.5;
      }else if(r<10){
        vec3 dv=tg-P;float d2=dot(dv,dv);vec3 dd=dv/sqrt(d2);
#ifdef CHIM
        Epatch+=vis*max(dot(Ng,dd),0.)*max(-dot(dd,uCh.xyz),.0)/(d2+.05)*.333;
#else
        Epatch+=vis*max(dot(Ng,dd),0.)*max(-dd.y,.0)/(d2+.05)*.333;
#endif
      }else if(r<14){
        vec3 dv=tg-P;float d2=dot(dv,dv);vec3 dd=dv/sqrt(d2);
        Ebeam+=vis*max(dot(Ng,dd),0.)/(d2+.03)*.5;
      }else ao+=vis;
#endif
    }
  }
  ao/=6.;
  float specS=0.,sb2f=0.,lean=1.,emiS=0.;
#if SM==1
  if(hitAny){
    // the hit's material and bump, in their own program (it compiles beside the picture pass)
    vec4 c=uP[id0*4],hh=uP[id0*4+1];vec3 ax=uP[id0*4+2].xyz,ay=uP[id0*4+3].xyz,az=cross(ax,ay);
    float sd=uP[id0*4+2].w;
    int m=int(hh.w+.5);
        vec2 fu,wq,f2;float ws;
        matPre(m,sd,lo0,ln0,P,wq,ws,fu);
        float h0=0.,hu=0.,hv=0.,wd=0.;
        float ep=abs(ln0.x)>.5&&m!=0&&m!=2&&m<8?.024:.0035;
        for(int k=-1;k<int(uBd.w);k++){
          vec2 uo=k<0?wq:fu+(k==1?vec2(ep,0.):(k==2?vec2(0.,ep):vec2(0.)));
          float hv_=heightAt(k<0?0:m,k<0?ws:sd,uo,P);
          if(k<0)wd=hv_;else if(k==0)h0=hv_;else if(k==1)hu=hv_;else hv=hv_;
        }
        gFp=max(tHit*2.*uRt.w/uVw.w/max(abs(dot(rd0,Ng)),.05),.0004);
        material(m,sd,wd,lo0,ln0,hh.xyz,P,Ng,alb,f2,spec,gls,emi);
        // bevel: every sawn edge is worn: tilt the normal near the box edges, light the wear
        vec3 N0=Ng;
        if(c.w<.5||c.w>2.5){
          vec3 e=(hh.xyz-abs(lo0))/min(.022,min(hh.x,min(hh.y,hh.z))*.3);
          vec3 tl=sign(lo0)*(1.-clamp(e,0.,1.))*(1.-abs(ln0));
          tl*=tl*sign(tl);
          vec3 tw=normalize(ln0+tl*.8);
          N0=normalize(ax*tw.x+ay*tw.y+az*tw.z);
          float wr=max(max(tl.x*sign(tl.x),tl.y*sign(tl.y)),tl.z*sign(tl.z));
          alb*=1.+wr*.75;
        }
        // bump from the same height function, one call site in a loop
        vec3 Tu,Tv;
        if(m==0){Tu=abs(ln0.y)>.5?az:ax;Tv=abs(ln0.y)>.5?ax:ay;}
        else if(m==2){Tu=vec3(0.,0.,1.);Tv=vec3(1.,0.,0.);}
        else if(m==8){Tu=vec3(1.,0.,0.);Tv=vec3(0.,1.,0.);}
#ifdef CHIM
        else if(m>8){Tu=abs(ln0.x)>.5?az:ax;Tv=ay;}
#endif
        else if(abs(ln0.x)>.5){Tu=ay;Tv=az;}
        else if(abs(ln0.y)>.5){Tu=ax;Tv=az;}
        else{Tu=ax;Tv=ay;}
        float bs=m==2?.0026:(m==0?.0034:(m>=8?.003:.0052));
        if(abs(ln0.x)>.5&&m!=0&&m!=2&&m<8)bs*=.14;
        Nb=normalize(N0-(Tu*(hu-h0)+Tv*(hv-h0))*bs/ep);
    NLs=max(dot(Nb,L),0.);
    // everything the picture needs from the bumped normal, as numbers
    specS=spec*pow(max(dot(Nb,normalize(L+V)),0.),gls);
    vec3 Sh=normalize(uSO.xyz-P);
    sb2f=spec*.4*pow(max(dot(Nb,normalize(Sh+V)),0.),gls)/(.4+dot(uSO.xyz-P,uSO.xyz-P));
    vec3 bd=normalize(Pc+vec3(0.,.2,0.)-P);
    lean=clamp(1.+(dot(Nb,bd)-dot(Ng,bd))*1.6,.45,1.7);
    emiS=emi.r;
  }
  o=uvec4(packHalf2x16(alb.rg),packHalf2x16(vec2(alb.b,NLs)),packHalf2x16(vec2(specS,sb2f)),packHalf2x16(vec2(lean,emiS)));
#endif
#if SM==0
  if(hitAny){
    uvec4 q=texelFetch(uMat,uMode!=1?ivec2(gl_FragCoord.xy):ivec2(gl_FragCoord.xy)*2,0);
    vec2 q0=unpackHalf2x16(q.x),q1=unpackHalf2x16(q.y),q2=unpackHalf2x16(q.z),q3=unpackHalf2x16(q.w);
    alb=vec3(q0,q1.x);NLs=q1.y;specS=q2.x;sb2f=q2.y;lean=q3.x;emi=vec3(1.,.93,.8)*q3.y;
  }else{
    float dn=max(abs(dot(rd0,uSN.xyz)),.15);
    float t0=dot(uSO.xyz-uEye.xyz,uSN.xyz)/dot(rd0,uSN.xyz);
        vec3 p1=uEye.xyz+rd0*(t0+.009/dn),p2=uEye.xyz+rd0*(t0+.05/dn);
        // the far face of the board: where it is shut, the eye is on the board's own sawn edge, lit edge-on by the sun on one
        // side of the slit and in its own shadow on the other
        float m1=maskV(p1);
        float sk=R_(p2.xz*2.1);
        vec3 sky=mix(vec3(9.,8.4,7.6),vec3(13.,12.,10.5),sk);
        // through the widest part, a breath of sky blue; it still burns out
        sky=mix(sky,vec3(5.2,6.6,9.),smoothstep(.55,.95,maskAt(p2,2.6))*.55);
        float gv=maskV(p1+uSV.xyz*.012)-maskV(p1-uSV.xyz*.012);
        float lit=clamp(dot(uSV.xyz*sign(gv),uSun.xyz)*3.,0.,1.);
        float gr=G_(vec2(dot(p1,uSU.xyz)*3.,dot(p1,uSN.xyz)*18.));
        vec3 edge=mix(vec3(.04,.025,.015),vec3(1.5,.56,.17),lit)*(.4+.9*gr);
        emi=mix(sky,edge,smoothstep(.75,.05,m1))*GT;
        // from below and close, the crack is its two splintered edges lit along their length and the sky between them,
        // brightest in the middle: only the core burns out
        if(uUp.w<.5)emi=mix(vec3(1.5,.6,.2)*(.6+1.2*gr),sky*.3,smoothstep(.62,.95,textureLod(uMask,beamS(p1).xy*.5+.5,0.).b))*GT;
  }
#endif
  vec3 Lc=uSunC.rgb;
#if SM==1
#elif SM==2
  if(hitAny){
    vec3 amb=(uAm.rgb+vec3(.0062,.0075,.0098)*uCfg.w*nearF*7.)*(.3+.7*ao);
    // (the sky's weight is per mint only in the variant programs: as a uniform in the plain one it cost Windows ~50 ms)
#ifdef CHIM
    vec3 fill=(Esky*uAm.w+Lc*Epatch*.52+Lc*Ebeam*.12)*(.4+.6*ao)+amb;
#else
    vec3 fill=(Esky*.042+Lc*Epatch*.52+Lc*Ebeam*.12)*(.4+.6*ao)+amb;
#endif
    o=vec4(encC(fill.r),encC(fill.g),encC(fill.b),tHit/12.);
  }else o=vec4(0.,0.,0.,tHit/12.);
#else
  if(hitAny){
    vec3 Ss=alb*Lc*sunV*NLs*uTm.w;
    vec3 Sp2=vec3(0.);
    if(sunV>0.){Sp2=Lc*sunV*specS*uTm.w*1.6;}
    vec3 amb=(uAm.rgb+vec3(.0062,.0075,.0098)*uCfg.w*nearF*7.)*(.3+.7*ao);
    vec3 fill;
    {
      // the soft light was traced at low res with many rays: fetch it, minding depth
      vec2 f=vF*uIrrRes-.5,fl=floor(f),fr=f-fl;
      vec3 sm=vec3(0.);float sw=1e-4;
      for(int k=0;k<4;k++){
        vec2 of=vec2(float(k&1),float(k>>1));
        vec4 si=textureLod(uIrr,(fl+of+.5)/uIrrRes,0.);
        vec2 bl=mix(1.-fr,fr,of);
        float wg=bl.x*bl.y*exp(-abs(si.a*12.-tHit)*26.)+1e-4*bl.x*bl.y;
        sm+=si.rgb*wg;sw+=wg;
      }
      fill=(exp(sm/sw*6.931472)-1.)/64.;
      // the bump still reads under soft light: lean it toward the main bounce
      fill*=lean;
    }
    // a little shine off the gap's own light so glass and tin read
    vec3 Sb2=Lc*sb2f;
    col=alb*(amb+fill)+Ss+Sp2+Sb2+emi;
    // the rim of the crack, seen close from below: the board thins to a lit splinter before it opens
    if(uUp.w<.5&&uP[id0*4].w>2.5)col+=vec3(1.,.9,.76)*GT*1.1*smoothstep(.08,.5,maskV(P));
    // light bleeding round the gap onto the boards it was cut in
    float glow=maskAt(P,5.2);
    if(tHit>0.)col+=alb*vec3(1.1,1.,.86)*glow*2.2*step(.97,dot(Ng,-uSN.xyz));
    sM=(Ss.g+Sp2.g)/max(col.g,1e-4);
  }else{
    col=emi;sM=0.;
  }
  // the slit is too bright to look at: it burns out into a veil over whatever is round it, in its own shape
  if(uMode!=1){
    float tv=dot(uSO.xyz-uEye.xyz,uSN.xyz)/dot(rd0,uSN.xyz);
    vec3 pv=uEye.xyz+rd0*max(tv,0.);
    float vl=(maskAt(pv,3.3)*.8+maskAt(pv,5.)*.7)*step(0.,tv);
    col+=vec3(1.,.87,.7)*GT*vl*uTm.w*.1;
  }
  col=min(col,vec3(16.));
  if(uMode!=1){
    // mode 2 (half floats): a timber the beam's depth leaves out (near and soft) is marked by a negative depth
    o=vec4(encC(col.r),encC(col.g),encC(col.b),tHit/12.*(uMode==2&&nearF>.5?-1.:1.));
  }else{
    o=vec4(tHit/12.,sM,nearF,1.);
  }
#endif
}`,Xt=Z+`#define SM 0
`+re+St+zt,Wt=Z+`#define SM 2
`+re+St+zt,Kt=Z+`#define SM 1
`+re+St+Mo+zt,Lo=Z+re+`
in vec2 vF;out vec4 o;
uniform sampler2D uSrc;
uniform vec4 uG;  // aperture, 1/size, glare x y
uniform vec4 uG2;
uniform int uZ,uK;
vec3 dec(vec3 e){return (exp(e*6.931472)-1.)/64.;}
vec3 enc(vec3 v){return log2(1.+v*64.)*.1;}
float cocOf(float t){return clamp(uG.x*abs(1./max(t,.02)-1./uFw.w),0.,.03);}
void main(){
  if(uK==0){
  vec4 c0=textureLod(uSrc,vF,0.);
  float t0=abs(c0.a)*12.,cc=cocOf(t0);
  // a sliver of softness everywhere: glass is never a perfect pinhole
  vec3 sum=dec(c0.rgb);float w=1.;
  float mx=.03;
  float nT=uBd.z;
  for(int i=0;i<int(nT);i++){
    float fi=float(i)+.5,r=sqrt(fi/nT),a=fi*2.3999632;
    vec2 d=vec2(cos(a),sin(a))*r;
    vec2 q=vF+d*mx;
    vec4 s=textureLod(uSrc,q,0.);
    float ts=abs(s.a)*12.,cs=cocOf(ts);
    float rr=r*mx,wg=0.;
    // a sample counts if its own blur reaches here, or if mine reaches it and it is not in front of me
    float reachS=smoothstep(rr-uG.y*1.1,rr+uG.y*.6,cs);
    float reachM=smoothstep(rr-uG.y*1.1,rr+uG.y*.6,cc)*step(t0-.05,ts);
    wg=max(reachS*step(ts,t0+.05),reachM);
    // always a whisper of softening within a pixel or so
    wg=max(wg,smoothstep(uG.y*1.3,uG.y*.5,rr)*.8);
    sum+=dec(s.rgb)*wg;w+=wg;
  }
  vec3 col=sum/w;
  // the lens's own veil around the blown out gap: a tight core, a wide faint skirt
  vec2 dg=(vF-uG.zw);float r2=dot(dg,dg);
  vec3 gl=vec3(1.,.9,.76)*(uG2.x)*(.26/(1.+r2*1900.)+.03/(1.+r2*120.));
  col+=gl;
  float n=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  o=vec4(enc(col)+(n-.5)/1023.,c0.a);
  }else if(uK==1){
  vec4 c=textureLod(uSrc,vF,0.);
  vec3 sum=c.rgb;float w=1.;
  for(int i=0;i<18+uZ;i++){
    float fi=float(i)+.5,r=sqrt(fi/18.),a=fi*2.3999632;
    vec4 s=textureLod(uSrc,vF+vec2(cos(a),sin(a))*r*.016,0.);
    float wg=exp(-abs(s.a-c.a)*12.*22.)*(1.-r*.6);
    sum+=s.rgb*wg;w+=wg;
  }
  o=vec4(sum/w,c.a);
  }else{
  vec4 c=textureLod(uSrc,vF,0.);
  float cov=0.,w=0.;
  float nT=uBd.z*.6;
  for(int i=0;i<int(nT);i++){
    float fi=float(i)+.5,r=sqrt(fi/nT),a=fi*2.3999632;
    vec2 q=vF+vec2(cos(a),sin(a))*r*.03;
    vec4 s=textureLod(uSrc,q,0.);
    float cs=cocOf(s.r*12.);
    cov+=s.b*smoothstep(r*.03-.0025,r*.03+.0025,cs);w+=1.;
  }
  cov=clamp(max(cov/w*1.9,c.b*.8),0.,1.);
  o=vec4(c.b>.5?1.:c.r,c.g,cov,1.);
  }
}`,jt=`
float capD(vec2 p,vec2 a,vec2 b,out float hh){vec2 d=b-a;float dd=dot(d,d);hh=dd>1e-9?clamp(dot(p-a,d)/dd,0.,1.):0.;return length(p-a-d*hh);}
`,ko=Z+re+jt+`
in vec2 vF;out vec4 o;
uniform sampler2D uVel,uDye,uN;
void main(){
  float h=uTm.y,tx=1./${be}.;
  vec2 u0=texture(uVel,vF).xy;
  vec2 back=vF-u0*h*uDom.zw;
  vec4 s=texture(uVel,back);
  vec2 u=s.xy;
  // curl from the neighbours; confinement from the curl stored last step
  vec4 L=texture(uVel,vF-vec2(tx,0.)),R=texture(uVel,vF+vec2(tx,0.)),D=texture(uVel,vF-vec2(0.,tx)),T=texture(uVel,vF+vec2(0.,tx));
  float dx=tx/uDom.z;
  float w=(R.y-L.y-T.x+D.x)*.5/dx;
  vec2 gw=vec2(abs(T.z)-abs(D.z),abs(R.z)-abs(L.z));
  float gl=length(gw);
  u+=(gl>1e-5?gw/gl:vec2(0.))*vec2(1.,-1.)*w*dx*uMt.w*h;
  // dust is heavier than clear air, so clouds slump and spread along the floor
  vec4 dy=texture(uDye,vF);
  float ds=dot(dy,vec4(.25));
  u.y-=max(ds-uTm.z,0.)*.055*h;
  // the sunlit boards warm the air over them
  vec2 pd=(vF-uPlm.xy)/uPlm.z;
  u.y+=uCfg.z*exp(-dot(pd,pd))*(.7+.6*textureLod(uN,vec2(vF.x*.7,uTm.x*.021),0.).r)*h;
  // the draught finding its way in round the eaves: large, slow, never periodic
  vec2 nq=vF*.31+vec2(uTm.x*.0071,-uTm.x*.0043);
  vec2 fn=vec2(textureLod(uN,nq,0.).r,textureLod(uN,nq+.37,0.).r)-.5;
  float ga=textureLod(uN,vec2(uTm.x*.0093,.31),0.).r;
  ga=smoothstep(.45,.8,ga);
  u+=(uCfg.xy*(.55+ga*1.2)+fn*length(uCfg.xy)*2.4)*h;
  // strokes and puffs
  for(int i=0;i<int(uBd.w);i++){
    vec4 a=uI[i*2],b=uI[i*2+1];
    if(b.w>0.){
      float hh;float d=capD(vF,a.xy,a.zw,hh);
      float g=exp(-d*d/(b.z*b.z));
      vec2 rad=(vF-mix(a.xy,a.zw,hh));
      float rl=length(rad)+1e-4;
      u+=(b.xy+rad/rl*b.w*step(b.w,3.)*(d/b.z)*2.)*g;
      // a flapping cloth sheds vortices of every size: curl of a rough field, scaled by the stroke
      vec2 cq=vF*2.3+a.xy*5.+uTm.x*.37,ce=vec2(.012,0.);
      vec2 cn=vec2(textureLod(uN,cq+ce.yx,0.).r-textureLod(uN,cq-ce.yx,0.).r,textureLod(uN,cq-ce,0.).r-textureLod(uN,cq+ce,0.).r);
      u+=cn*(length(b.xy)*5.5+.5*step(3.,b.w))*g;
      vec2 cq2=vF*1.15+a.yx*3.+uTm.x*.61;
      vec2 cg=vec2(textureLod(uN,cq2+ce.yx*.4,0.).g-textureLod(uN,cq2-ce.yx*.4,0.).g,textureLod(uN,cq2-ce*.4,0.).g-textureLod(uN,cq2+ce*.4,0.).g);
      u+=cg*(length(b.xy)*2.6+.25*step(3.,b.w))*g;
    }
  }
  u*=exp(-uPlm.w*h);
  // floor and roof: nothing goes through
  vec2 wp=vF/uDom.zw+uDom.xy;
  float roof=dot(uRoof.xy,wp)+uRoof.z;
  float solid=max(step(wp.y,0.),step(roof,0.));
  u*=1.-solid;
  // domain edge eases out
  vec2 e=min(vF,1.-vF);
  u*=smoothstep(0.,.03,min(e.x,e.y));
  u=clamp(u,vec2(-5.),vec2(5.));
  o=vec4(u,w,1.);
}`,No=Z+`
in vec2 vF;out vec4 o;
uniform sampler2D uVel,uPr;
uniform int uK;
void main(){float t=1./${be}.;
  if(uK==0){
    float d=texture(uVel,vF+vec2(t,0.)).x-texture(uVel,vF-vec2(t,0.)).x+texture(uVel,vF+vec2(0.,t)).y-texture(uVel,vF-vec2(0.,t)).y;
    o=vec4(texture(uPr,vF).r*.9,d*.5,0.,1.);
  }else if(uK==1){
    vec2 c=texture(uPr,vF).rg;
    float p=texture(uPr,vF-vec2(t,0.)).r+texture(uPr,vF+vec2(t,0.)).r+texture(uPr,vF-vec2(0.,t)).r+texture(uPr,vF+vec2(0.,t)).r;
    o=vec4((p-c.g)*.25,c.g,0.,1.);
  }else{
    vec4 v=texture(uVel,vF);
    vec2 g=vec2(texture(uPr,vF+vec2(t,0.)).r-texture(uPr,vF-vec2(t,0.)).r,texture(uPr,vF+vec2(0.,t)).r-texture(uPr,vF-vec2(0.,t)).r)*.5;
    o=vec4(v.xy-g,v.z,1.);
  }
}`,Po=Z+re+jt+`
in vec2 vF;out vec4 o;
uniform sampler2D uVel,uDye,uN;
const vec2 LO=vec2(.021,-.013);
void main(){
  float h=uTm.y;
  vec4 d=vec4(0.);
  vec2 setl=vec2(0.,uCfg.y*0.+.018);
  for(int i=0;i<int(uBd.w)+1;i++){
    vec2 off=LO*(float(i)-1.5);
    vec4 sl=vec4(equal(ivec4(i),ivec4(0,1,2,3)));
    vec2 v=texture(uVel,vF+off).xy-vec2(0.,.012);
    vec2 q=(vF-v*h*uDom.zw)*${He}.,c=floor(q-.5)+.5,f=q-c;
    vec2 w0=f*(-.5+f*(1.-.5*f)),w1=1.+f*f*(-2.5+1.5*f),w2=f*(.5+f*(2.-1.5*f)),w3=f*f*(-.5+.5*f),w12=w1+w2;
    vec2 t0=(c-1.)/${He}.,t3=(c+2.)/${He}.,t12=(c+w2/w12)/${He}.;
    float sa=dot(textureLod(uDye,vec2(t12.x,t0.y),0.),sl)*w12.x*w0.y+dot(textureLod(uDye,vec2(t0.x,t12.y),0.),sl)*w0.x*w12.y
      +dot(textureLod(uDye,t12,0.),sl)*w12.x*w12.y+dot(textureLod(uDye,vec2(t3.x,t12.y),0.),sl)*w3.x*w12.y+dot(textureLod(uDye,vec2(t12.x,t3.y),0.),sl)*w12.x*w3.y;
    float sw=w12.x*w0.y+w0.x*w12.y+w12.x*w12.y+w3.x*w12.y+w12.x*w3.y;
    d+=sl*max(sa/sw,0.);
  }
  // what is above the background settles out slowly, and what has settled is stirred back in slowly
  float base=uTm.z;
  vec4 nz=vec4(textureLod(uN,vF*1.25+uTm.x*vec2(.0023,.0016),2.6).r,textureLod(uN,vF*1.05+.31+uTm.x*vec2(-.0019,.0021),2.6).r,textureLod(uN,vF*1.35+.67+uTm.x*vec2(.0017,-.0023),2.6).r,textureLod(uN,vF*.95+.13+uTm.x*vec2(-.0021,-.0015),2.6).r);
  vec4 tg=base*max(.92+2.6*(nz-.5),vec4(.1));
  vec4 k=mix(vec4(.06),vec4(.014),step(tg,d));
  d+=(tg-d)*(1.-exp(-k*h));
  // strokes and puffs carry dust
  for(int i=0;i<int(uBd.w);i++){
    vec4 a=uI[i*2],b=uI[i*2+1];
    if(b.w>0.){
      float hh;float dd=capD(vF,a.xy,a.zw,hh);
      float rr=b.z*1.05;
      float g=exp(-dd*dd/(rr*rr));
      // rags of it, not a smooth blob
      float rg=textureLod(uN,vF*1.7+a.xy*3.+uTm.x*.13,0.).r*.6+textureLod(uN,vF*1.3+a.yx*2.+uTm.x*.19,0.).g*.4;
      g*=smoothstep(.3,.62,rg+g*.12);
      d+=vec4(b.w>3.?b.w-3.:b.w)*g*(vec4(.85,1.,1.,.8)+vec4(sin(uTm.x*3.7),cos(uTm.x*2.9),sin(uTm.x*5.1),cos(uTm.x*4.3))*.25);
    }
  }
  vec2 wp=vF/uDom.zw+uDom.xy;
  float roof=dot(uRoof.xy,wp)+uRoof.z;
  d*=1.-max(step(wp.y,-.01),step(roof,-.02));
  vec2 e=min(vF,1.-vF);
  d*=smoothstep(0.,.02,min(e.x,e.y));
  o=clamp(d,vec4(0.),vec4(7.));
}`,At=`
vec4 h4(vec4 p){p=fract(p*vec4(.1031,.1030,.0973,.1099));p+=dot(p,p.wzxy+33.33);return fract((p.xxyz+p.yzzw)*p.zywx);}
`,Zt=Z+re+At+`
in vec2 vF;out vec4 o;
uniform sampler2D uPt,uVel,uN;
void main(){
  ivec2 ij=ivec2(gl_FragCoord.xy);
  vec4 st=texelFetch(uPt,ij,0);
  vec3 p=st.xyz;
  float h=uTm.y;
  vec4 sd=h4(vec4(vec2(ij),1.,7.));
  float sz=pow(sd.x,5.);                 // most are tiny, a few are big
  // the air here
  float lz=clamp((p.z-uZr.x)*uZr.y,0.,1.)*3.;
  vec2 uv=toUV(p.xy)+vec2(.021,-.013)*(lz-1.5);
  vec4 v=texture(uVel,uv);
  // unresolved eddies: stronger where the resolved air is working hard
  vec2 nq=p.xy*.47+vec2(p.z*.53,uTm.x*.023);
  vec4 nn=textureLod(uN,nq,0.);
  vec2 sub=(nn.gb-.5)*(.018+length(v.xy)*.55);
  float ws=(textureLod(uN,nq.yx*1.3+.3,0.).g-.5)*(.032+length(v.xy)*.5);
  // true Brownian walk: a fresh gaussian each step, sized by sqrt(dt)
  vec4 r=h4(vec4(vec2(ij),uTm.x*31.7,uTm.x*7.3+3.));
  vec3 gn=sqrt(-2.*log(max(r.x,1e-4)))*vec3(cos(6.2832*r.y),sin(6.2832*r.y),cos(6.2832*r.z));
  float D=mix(uMt.z,uMt.z*.1,sz);
  p+=gn*sqrt(2.*D*h);
  // Stokes settling grows with size squared
  float vs=mix(.0035,.1,sz)*uMt.x;
  p+=vec3(v.xy+sub,ws)*h;
  p.y-=vs*h;
  // spin with half the local vorticity, plus its own tumble
  float tum=st.w+h*(v.z*.5+(sd.y-.5)*1.8);
  // wrap in beam space, so the neighbourhood of the shaft stays stocked and the seams stay outside the light
  vec3 s=beamS(p);
  float A=uVw.x,Bb=uVw.y;
  bool out_=p.y<.004||s.z<.0||s.z>uSun.w;
#ifdef CHIM
  out_=out_||dot(p-uSO.xyz+uSun.xyz*uCh.w,uCh.xyz)<0.;
#endif
  float aa=s.x,bb=s.y,tt=s.z;
  if(aa>A)aa-=2.*A;else if(aa<-A)aa+=2.*A;
  if(bb>Bb)bb-=2.*Bb;else if(bb<-Bb)bb+=2.*Bb;
  if(out_){
    // fallen out or risen out: come back beside the light, never inside it
    vec4 q=h4(vec4(vec2(ij),uTm.x*11.3,5.));
    float sgn=q.x<.5?-1.:1.;
    bb=sgn*mix(uBd.y*1.02,Bb,q.y);
    aa=(q.z*2.-1.)*A;
    tt=q.w*min(uSun.w,uSO.y/uSun.y)*.97;
  }
  p=uSO.xyz+uSU.xyz*(aa/uSU.w)+uSV.xyz*(bb/uSV.w)-uSun.xyz*tt+uSun.xyz*0.;
  o=vec4(p,tum);
}`,Uo=Z+re+At+`
in vec2 vF;out vec4 o;
uniform sampler2D uN;
uniform vec4 uA;
uniform int uK;
float psi(vec2 p){return textureLod(uN,p*.45+.13,0.).r*1.+textureLod(uN,p*.9+.41,0.).r*.5;}
void main(){
  if(uK==0){
    vec4 q=h4(vec4(gl_FragCoord.xy,3.,11.));
    float A=uVw.x,Bb=uVw.y;
    float tt=q.z*min(uSun.w,uSO.y/uSun.y)*.97;
    vec3 p=uSO.xyz+uSU.xyz*((q.x*2.-1.)*A/uSU.w)+uSV.xyz*((q.y*2.-1.)*Bb/uSV.w)-uSun.xyz*tt;
    o=vec4(p,q.w*6.28);
  }else if(uK==1){
    // first air and first dust: the room as if someone walked through a moment ago
    float e=.006;
    float a=psi(vF+vec2(0.,e))-psi(vF-vec2(0.,e)),b=psi(vF+vec2(e,0.))-psi(vF-vec2(e,0.));
    o=vec4(vec2(a,-b)/(2.*e)*.1*uCfg.w,0.,1.);
  }else{
    vec4 n=textureLod(uN,vF*1.25+.2,2.6).rgrg;
    vec4 m=textureLod(uN,vF*.73+vec2(.51,.07),1.5).rrgg;
    vec4 d=uTm.z*max(.92+2.6*(n.rrrr-.5)*vec4(1.,.8,1.1,.9),vec4(.1));
    // one loose cloud left hanging: the first thing to catch the light
    vec2 q=(vF-uA.xy)/uA.z;
    float blob=exp(-dot(q,q))*smoothstep(.28,.72,m.r+.25);
    o=d+blob*uA.w*vec4(.8,1.,1.,.7)*(.5+.9*n.g);
  }
}`,Bo=Z+re+`
in vec2 vF;out vec4 o;
uniform sampler2D uDye;
void main(){
  vec3 O=uSO.xyz+uSU.xyz*((vF.x*2.-1.)/uSU.w);
  float len=vF.y*uSun.w,sum=0.;
  float nS=uBd.z*.25;
  for(int i=0;i<int(nS);i++){
    vec3 p=O-uSun.xyz*(len*(float(i)+.5)/nS);
    sum+=dot(textureLod(uDye,toUV(p.xy),0.),layerW(p.z));
  }
  o=vec4(exp(-sum*len/nS*uMt.y),0.,0.,1.);
}`,Yt=`#version 300 es
in vec2 aP;
out vec2 vF;
void main(){vF=aP;gl_Position=vec4(aP*2.-1.,0.,1.);}`,$t=Z+re+`
in vec2 vF;out vec4 o;
uniform sampler2D uMask,uDye,uT,uAux,uN,uVel;
void main(){
  vec3 rd=normalize(uFw.xyz+(vF.x*2.-1.)*uRt.w*uRt.xyz+(vF.y*2.-1.)*uRt.w*uUp.xyz);
  vec3 ro=uEye.xyz;
  vec3 s0=beamS(ro),s1=beamS(ro+rd);
  vec3 ds=s1-s0;
  // slab: inside the rectangle of the mask, below the roof
  vec2 idv=1./(abs(ds.xy)+1e-5)*sign(ds.xy+1e-7);
  vec2 a=(-uBd.xy-s0.xy)*idv,b=(uBd.xy-s0.xy)*idv,mn=min(a,b),mx=max(a,b);
  float lo=max(max(mn.x,mn.y),.05),hi=min(mx.x,mx.y);
  float tRoof=-s0.z/(ds.z-1e-6);
  if(ds.z<0.)hi=min(hi,tRoof);else lo=max(lo,tRoof);
  float tS=textureLod(uAux,vF,0.).r*12.;
  hi=min(hi,tS);
  float acc=0.;
  if(hi>lo){
    float j=textureLod(uN,gl_FragCoord.xy/256.,0.).a;
    float nS=uBd.z*.3;
    float dl=(hi-lo)/nS;
    for(int i=0;i<int(nS);i++){
      float l=lo+dl*(float(i)+j);
      vec3 p=ro+rd*l;
      vec3 s=beamS(p);
      float tt=max(s.z,.0);
      float m=textureLod(uMask,s.xy*.5+.5,log2(max(tt*uZr.z,1.))).r;
      // a chimney stack takes the light on its face: nothing lit past it
#ifdef CHIM
      if(dot(p-uSO.xyz+uSun.xyz*uCh.w,uCh.xyz)<0.)m=0.;
#endif
      if(m>.003){
        vec2 uv=toUV(p.xy);
        float rho=dot(textureLod(uDye,uv,0.),layerW(p.z));
        // what the coarse grid cannot hold: fine filaments, which strengthen with the dust
        vec2 vl=textureLod(uVel,uv,0.).xy;
        float p1=fract(uTm.x*.45),p2=fract(uTm.x*.45+.5);
        vec2 qq=p.xy*.37+p.z*.17;
        float f1=textureLod(uN,qq-vl*p1*2.2*.37,0.).g,f2=textureLod(uN,qq+.37-vl*p2*2.2*.37,0.).g;
        float fin=mix(f1,f2,abs(2.*p1-1.));
        float ca=clamp((rho-.6)*.34,.08,.5);
        rho*=max(1.+ca*(fin-.5)*2.5,.05);
        float T=textureLod(uT,vec2(s.x*.5+.5,tt/uSun.w),0.).r;
        acc+=m*(rho+.05)*T;
      }
    }
    acc*=dl;
    // forward peak: a smoky shaft is brighter as you look up it toward the sun
    float g=.62,cs=dot(rd,uSun.xyz);
    float ph=(1.-g*g)/pow(1.+g*g-2.*g*cs,1.5);
    acc*=.34+ph*.5;
  }
  o=vec4(acc,0.,0.,1.);
}`,Do=Z+`
in vec2 vF;out vec4 o;
uniform sampler2D uSrc;
uniform vec4 uA;
void main(){
  vec4 s=vec4(0.);
  for(int i=0;i<12;i++){
    float fi=float(i)+.5,r=sqrt(fi/12.),a=fi*2.39996+uA.z;
    s+=textureLod(uSrc,vF+vec2(cos(a),sin(a))*r*uA.xy,0.);
  }
  o=s/12.;
}`,Co=`#version 300 es
precision highp float;
precision highp sampler2D;
`+re+At+`
uniform sampler2D uPt,uMask,uDye,uT,uAux,uVel,uN;
out vec4 vC;
void main(){
  ivec2 ij=ivec2(gl_VertexID%${Ae},gl_VertexID/${Ae});
  vec4 st=texelFetch(uPt,ij,0);
  vec3 p=st.xyz;
  gl_Position=vec4(2.,2.,2.,1.);gl_PointSize=1.;vC=vec4(0.);
  vec3 s=beamS(p);
  if(abs(s.x)<uBd.x&&abs(s.y)<uBd.y&&s.z>0.){
    float m=textureLod(uMask,s.xy*.5+.5,log2(max(s.z*uZr.z,1.))).r;
    if(m>.02){
      vec4 sd=h4(vec4(vec2(ij),1.,7.));
      vec3 d=p-uEye.xyz;
      float zv=dot(d,uFw.xyz);
      vec2 ndc=vec2(dot(d,uRt.xyz),dot(d,uUp.xyz))/(zv*uRt.w);
      vec2 uv=ndc*.5+.5;
      float tS=textureLod(uAux,uv,0.).r*12.;
      // visible only while the dust here is thick enough for this one: count follows concentration
      float rho=dot(textureLod(uDye,toUV(p.xy),0.),layerW(p.z));
      // and they hang in sheets and curls carried on the air (the same drifting filaments the haze has), not evenly
      vec2 vl=textureLod(uVel,toUV(p.xy),0.).xy;
      float p1=fract(uTm.x*.45),p2=fract(uTm.x*.45+.5);
      vec2 qq=p.xy*.37+p.z*.17;
      float fin=mix(textureLod(uN,qq-vl*p1*.81,0.).g,textureLod(uN,qq+.37-vl*p2*.81,0.).g,abs(2.*p1-1.));
      float pres=smoothstep(sd.w*.6,sd.w*.6+.25,rho*.8+.25)*smoothstep(.2,.5,fin+(sd.z-.5)*.16);
      float dist=length(d);
      if(dist<tS+.02&&pres>.01){
        float T=textureLod(uT,vec2(s.x*.5+.5,s.z/uSun.w),0.).r;
        float sz=pow(sd.x,5.);
        // a flake flashes as its face tumbles past the mirror angle; a fibre is steadier
        float fibre=step(sd.z,uMt.y*0.+uVw.z);
        float cs=cos(st.w*1.+sd.y*6.28);
        float flash=fibre>.5?.45+.4*cs*cs:.22+.78*pow(abs(cs),5.);
        // lens blur: in pixels at 1000
        float px=uVw.w/1000.;
        float coc=abs(1./dist-1./uFw.w)*uZr.w;
        float core=mix(.44,1.5,pow(sz,.5))+(fibre>.5?.9+2.3*sd.y:0.);
        float rad=sqrt(core*core+coc*coc);
        float g=m*T*pres*flash*(.09+.9*pow(sz,.7))*(fibre>.5?.42:1.);
        g*=core*core/(rad*rad);
        float sizePx=max(rad*3.2*px,1.5);
        // pixels below one: spend the brightness rather than stipple
        float shrink=1.;
        gl_PointSize=sizePx;
        gl_Position=vec4(ndc,0.,1.);
        vC=vec4(g*min(1.,(rad*3.2*px)*(rad*3.2*px)/2.25)*shrink,fibre,st.w+sd.y*3.14,coc/(coc+core+1e-3));
      }
    }
  }
}`,qo=Z+`
in vec4 vC;out vec4 o;
void main(){
  vec2 q=gl_PointCoord*2.-1.;
  float g;
  if(vC.y>.5){
    float c=cos(vC.z),s=sin(vC.z);
    vec2 r=vec2(c*q.x+s*q.y,-s*q.x+c*q.y);
    r.y+=r.x*r.x*.35*sin(vC.z*3.);
    r*=mix(vec2(1.,4.5),vec2(1.,1.),vC.w);
    g=exp(-dot(r,r)*4.2);
  }else{
    float d=dot(q,q);
    g=exp(-d*mix(4.6,2.4,vC.w));
    g*=smoothstep(1.,.72,d);
  }
  o=vec4(g*vC.x,0.,0.,1.);
}`,Io=Z+re+`
in vec2 vF;out vec4 o;
uniform sampler2D uTh,uRest,uVel;
void main(){
  ivec2 ij=ivec2(gl_FragCoord.xy);
  vec4 s=texelFetch(uTh,ij,0);
  if(ij.x==0||ij.x==${ve-1}){o=vec4(0.);}
  else{
    vec3 r=texelFetch(uRest,ij,0).xyz;
    vec2 v=texture(uVel,toUV(r.xy)).xy;
    vec2 nb=texelFetch(uTh,ij-ivec2(1,0),0).xy+texelFetch(uTh,ij+ivec2(1,0),0).xy;
    float h=min(uTm.y,.05);
    // a damped loaded string in moving air
    vec2 acc=(nb-2.*s.xy)*150.-s.xy*34.+(v*.55-s.zw)*13.;
    vec2 w=s.zw+acc*h;
    vec2 d=s.xy+w*h;
    float L=length(d);
    if(L>.09){d*=.09/L;w*=.5;}
    o=vec4(d,w);
  }
}`,Oo=`#version 300 es
precision highp float;
precision highp sampler2D;
`+re+`
uniform sampler2D uTh,uRest,uAux;
out vec3 vP;out vec2 vA;
void main(){
  int seg=gl_VertexID/6,cn=gl_VertexID%6;
  int row=seg/${ve-1},col=seg%${ve-1};
  vec4 r0=texelFetch(uRest,ivec2(col,row),0),r1=texelFetch(uRest,ivec2(col+1,row),0);
  vec2 d0=texelFetch(uTh,ivec2(col,row),0).xy,d1=texelFetch(uTh,ivec2(col+1,row),0).xy;
  vec3 p0=r0.xyz+vec3(d0,d0.x*.3),p1=r1.xyz+vec3(d1,d1.x*.3);
  vec3 e0=p0-uEye.xyz,e1=p1-uEye.xyz;
  vec2 a=vec2(dot(e0,uRt.xyz),dot(e0,uUp.xyz))/(dot(e0,uFw.xyz)*uRt.w);
  vec2 b=vec2(dot(e1,uRt.xyz),dot(e1,uUp.xyz))/(dot(e1,uFw.xyz)*uRt.w);
  vec2 dr=b-a;float ld=length(dr)+1e-6;
  vec2 nr=vec2(-dr.y,dr.x)/ld;
  bool end=(cn==1||cn==2||cn==4);
  bool sd_=(cn==2||cn==4||cn==5);
  vec2 q=end?b:a;
  vec3 pw=end?p1:p0;
  float w=1.5*(1000./uVw.w)*2./1000.;
  q+=nr*(sd_?w:-w);
  vP=pw;vA=vec2(sd_?1.:-1.,r0.w);
  float tS=textureLod(uAux,q*.5+.5,0.).r*12.;
  gl_Position=vec4(q,0.,1.);
  if(length(e0)>tS+.1&&length(e1)>tS+.1)vA.y=0.;
}`,Vo=Z+re+`
in vec3 vP;in vec2 vA;out vec4 o;
uniform sampler2D uMask,uT;
void main(){
  vec3 s=beamS(vP);
  float inr=step(abs(s.x),uBd.x)*step(abs(s.y),uBd.y)*step(0.,s.z);
  float m=inr*textureLod(uMask,s.xy*.5+.5,log2(max(s.z*uZr.z,1.))).r;
  float T=textureLod(uT,vec2(s.x*.5+.5,s.z/uSun.w),0.).r;
  float g=exp(-vA.x*vA.x*5.2);
  o=vec4((m*T*.32*min(uVw.w/800.,1.)+.003)*g*vA.y,0.,0.,1.);
}`,Go=`#version 300 es
precision highp float;
precision highp sampler2D;
`+re+`
uniform sampler2D uT,uGlow;
out vec2 vQ;flat out vec3 vK;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vQ=p;gl_Position=vec4(p*2.-1.,0.,1.);
  // light left at the floor, and how much the shaft is throwing into the room
  float tf=textureLod(uT,vec2(.5,clamp(uSO.y/uSun.y/uSun.w,0.,1.)),0.).r;
  float tf2=textureLod(uT,vec2(.3,clamp(uSO.y/uSun.y/uSun.w,0.,1.)),0.).r,tf3=textureLod(uT,vec2(.7,clamp(uSO.y/uSun.y/uSun.w,0.,1.)),0.).r;
  float gl=textureLod(uGlow,vec2(.5),0.).r;
  vK=vec3((tf+tf2+tf3)/3.,gl,0.);
}`,Ho=Z+re+`
in vec2 vQ;flat in vec3 vK;out vec4 o;
uniform sampler2D uSc,uAux,uVol,uGlow,uMo,uDye,uN;
vec3 dec(vec3 e){return (exp(e*6.931472)-1.)/64.;}
vec3 tone(vec3 x){return x*(2.51*x+.03)/(x*(2.43*x+.59)+.14);}
void main(){
  // a mirrored mint is the same room seen from the other side: every layer is read flipped
  vec2 vF=vec2(uEye.w<0.?1.-vQ.x:vQ.x,vQ.y);
  vec4 sA=textureLod(uSc,vF,0.);
  vec3 sc=dec(sA.rgb);
  vec4 ax=textureLod(uAux,vF,0.);
  float cld=uSunC.w;
  float tau=vK.x*cld;
  // direct sun on things dims with what the dust took out of the ray; the bounce with it, a little less
  vec3 col=sc*(1.+ax.g*(tau-1.));
  float room=mix(.6,1.,tau)+vK.y*.32;
  col*=mix(room,1.,ax.g);
  // dust in the view veils what is behind it
  vec3 ww=uFw.xyz+(vF.x*2.-1.)*uRt.w*uRt.xyz+(vF.y*2.-1.)*uRt.w*uUp.xyz;
  vec2 wxy=uEye.xy+ww.xy*uCfg.x*0.+ww.xy*uVw.z*0.+ww.xy*uPlm.w*0.;
  // read on the plane through the shaft
  wxy=uEye.xy+ww.xy*(uZr.x+.5/uZr.y-uEye.z)/ww.z;
  vec4 dy=textureLod(uDye,toUV(wxy),0.);
  float d=dot(dy,vec4(.25));
  float cov=ax.b;
  float ve=exp(-max(d,0.)*.15*(1.-cov));
  col*=ve;
  float g=textureLod(uGlow,vF,0.).r;
  // the shaft is marched on a smaller grid: join it to this picture along the picture's own depth, so a timber in front
  // cuts it with its own clean edge, not the grid's stairs
  vec2 vz=vec2(textureSize(uVol,0)),vf=vF*vz,vc=floor(vf)+.5;
  float tF=abs(sA.a)*12.,v=0.,vw=1e-5;
  for(int k=0;k<9;k++){
    vec2 q=vc+vec2(float(k%3-1),float(k/3-1)),dq=max(1.5-abs(q-vf),0.);
    q/=vz;
    float wg=dq.x*dq.y*(exp(-abs(textureLod(uAux,q,0.).r*12.-tF)*40./max(tF,.3))+.002);
    v+=textureLod(uVol,q,0.).r*wg;vw+=wg;
  }
  // a near timber's cover, known on the small grid, takes its edge from this picture's own pixels
  float cvF=sA.a<0.?max(cov,.93):cov*cov;
  v=v/vw*(1.-cvF);
  float mo=textureLod(uMo,vF,0.).r*(1.-cvF);
  vec3 Lc=uSunC.rgb;
  // first scatter in the shaft; the same light scattered again by dust in the air round it. Sunlit dust is thin: the
  // light is added and what is behind shows through; only a real cloud of it piles up toward a soft ceiling
  v*=uUp.w;
  v=v*uSO.w/(1.+v*.07);
  vec3 scat=Lc*cld*(v+g*(.03+d*.36)*(1.-cov));
  // specks are whiter than the air: they are lit by the sun itself, not by the haze
  scat+=mix(Lc,vec3(1.,.97,.92),.5)*cld*mo*2.2;
  col+=scat;
  col=tone(col*1.05);
  col=pow(max(col,vec3(0.)),vec3(1./2.2));
  // a still dither against banding in the dark, nothing that moves
  float gr=textureLod(uN,gl_FragCoord.xy/256.,0.).a-.5;
  col+=gr*(.012-.008*col.g);
  o=vec4(col,1.);
}`,Qt={uVel:0,uPr:1,uDye:2,uPt:3,uN:4,uMask:5,uT:6,uVol:7,uGlow:8,uMo:9,uSc:10,uAux:11,uTh:12,uRest:13,uSrc:14,uIrr:15,uMat:14};function _t(e,t,o,a,i){e.getProgramParameter(o,e.LINK_STATUS)||console.error("254 "+t+": "+e.getProgramInfoLog(o)+" "+e.getShaderInfoLog(i)+" "+e.getShaderInfoLog(a)),e.useProgram(o);for(const E in Qt){const p=e.getUniformLocation(o,E);p&&e.uniform1i(p,Qt[E])}const c=e.getUniformBlockIndex(o,"W");c!==e.INVALID_INDEX&&e.uniformBlockBinding(o,c,0);const n=e.getUniformBlockIndex(o,"B");return n!==e.INVALID_INDEX&&e.uniformBlockBinding(o,n,1),e.deleteShader(a),e.deleteShader(i),o}function Mt(e,t,o,a){const i=e.createProgram(),c=e.createShader(e.VERTEX_SHADER);e.shaderSource(c,o),e.compileShader(c);const n=e.createShader(e.FRAGMENT_SHADER);return e.shaderSource(n,a),e.compileShader(n),e.attachShader(i,c),e.attachShader(i,n),e.bindAttribLocation(i,0,"aP"),[t,i,c,n]}function Xo(e,t,o){if(!t.maskP[o]){const a=Mt(e,"mask"+o,O,Ht(o));e.linkProgram(a[1]),_t(e,...a),t.maskP[o]={p:a[1],a:e.getUniformLocation(a[1],"uA")}}return t.maskP[o]}const Jt=e=>e.replace(`#version 300 es
`,`#version 300 es
#define CHIM
`),Lt=(e,t)=>({countI:e.getUniformLocation(t.shadeI,"uCount"),countM:e.getUniformLocation(t.shadeM,"uCount"),raysI:e.getUniformLocation(t.shadeI,"uRays"),count:e.getUniformLocation(t.shade,"uCount"),rays:e.getUniformLocation(t.shade,"uRays"),mode:e.getUniformLocation(t.shade,"uMode"),irrR:e.getUniformLocation(t.shade,"uIrrRes")});function Wo(e,t,o){if(o?t.PC:t.P)return o?t.PC:t.P;const a={shadeI:[O,Wt],shadeM:[O,Kt],shade:[O,Xt],vol:[Yt,$t],pt:[O,Zt]},i=[];for(const n in a)i.push(Mt(e,n,a[n][0],o?Jt(a[n][1]):a[n][1]));for(const n of i)e.linkProgram(n[1]);const c=Object.assign({},o?t.P:t.PC);for(const n of i)c[n[0]]=_t(e,...n);return o?(t.PC=c,t.UC=Object.assign({},t.U,Lt(e,c))):(t.P=c,t.U=Object.assign({},t.UC,Lt(e,c))),c}function Ko(e,t,o){let a=Bt.get(e);if(a&&a.U)return a;a={bakes:new Map,order:[],maskP:{}},Bt.set(e,a);const i={noise:[O,_o],mask:[O,Ht(t)],shadeI:[O,Wt],shadeM:[O,Kt],shade:[O,Xt],post:[O,Lo],vel:[O,ko],pres:[O,No],dye:[O,Po],pt:[O,Zt],init:[O,Uo],tr:[O,Bo],vol:[Yt,$t],blur:[O,Do],mote:[Co,qo],th:[O,Io],web:[Oo,Vo],comp:[Go,Ho]};e.getExtension("KHR_parallel_shader_compile");const c=[];for(const p in i)c.push(Mt(e,p,i[p][0],o&&/^(shadeI|shadeM|shade|vol|pt)$/.test(p)?Jt(i[p][1]):i[p][1]));for(const p of c)e.linkProgram(p[1]);const n={};for(const p of c)n[p[0]]=_t(e,...p);o?a.PC=n:a.P=n,a.maskP[t]={p:n.mask,a:e.getUniformLocation(n.mask,"uA")},a.U={...Lt(e,n),postG:e.getUniformLocation(n.post,"uG"),postG2:e.getUniformLocation(n.post,"uG2"),postK:e.getUniformLocation(n.post,"uK"),presK:e.getUniformLocation(n.pres,"uK"),initK:e.getUniformLocation(n.init,"uK"),d0A:e.getUniformLocation(n.init,"uA"),blurA:e.getUniformLocation(n.blur,"uA")},o&&(a.UC=a.U),a.vao=e.createVertexArray(),a.fl32=!!e.getExtension("EXT_color_buffer_float"),a.fl16=a.fl32||!!e.getExtension("EXT_color_buffer_half_float"),e.getExtension("EXT_float_blend"),a.noise=ut(e,256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.REPEAT,e.LINEAR_MIPMAP_LINEAR,9);const E=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,E),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,a.noise,0),e.viewport(0,0,256,256),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.useProgram(n.noise),e.uniform1i(e.getUniformLocation(n.noise,"uOct"),10),e.bindVertexArray(a.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(E),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.noise),e.generateMipmap(e.TEXTURE_2D),a}function ut(e,t,o,a,i,c,n,E,p){const f=e.createTexture();return e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,f),e.texStorage2D(e.TEXTURE_2D,p||1,a,t,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,E),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,E===e.NEAREST?e.NEAREST:e.LINEAR),f}function C(e,t,o,a,i){const c=ut(e,t,o,a,0,0,e.CLAMP_TO_EDGE,i||e.LINEAR),n=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0),{t:c,f:n,w:t,h:o}}function ft(e,t){e.deleteFramebuffer(t.f),e.deleteTexture(t.t)}const eo=typeof FinalizationRegistry=="function"?new FinalizationRegistry(e=>e()):null,jo=(e,t,o,a,i)=>()=>{for(const c of t)ft(e,c);for(const c of o)e.deleteTexture(c);for(const c of a)e.deleteBuffer(c);for(const c of i)e.deleteVertexArray(c)},Ce=(e,t,o)=>{if(o!==void 0)return t[o][0];let a=0;for(const c of t)a+=c[1];let i=e()*a;for(const c of t)if(i-=c[1],i<=0)return c[0];return t[0][0]},r={add:(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],sub:(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],mul:(e,t)=>[e[0]*t,e[1]*t,e[2]*t],dot:(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],cross:(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],norm:e=>{const t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]}};function Zo(e){let t=-2128831035;for(let s=2;s<e.hash.length;s++)t=Math.imul(t^parseInt(e.hash[s],16),16777619),t^=t>>>13;let o=t>>>0;const a=()=>{o=o+1831565813|0;let s=Math.imul(o^o>>>15,1|o);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296};for(let s=0;s<9;s++)a();const i=e.home;let c=Ce(a,[["Board Gap",56],["Slipped Slate",30],["Split Board",9],["Knot Hole",5]],i?0:void 0),n=(Math.imul(t^739982445,695872825)^5369127)>>>0;const E=()=>{n=n+1831565813|0;let s=Math.imul(n^n>>>15,1|n);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296},p=E();!i&&p<.36&&(c=p<.23?"Shrunk Slats":"Nail Holes");let f=Ce(a,[["Morning",52],["High Noon",30],["Late Gold",14],["Winter Low",4]],i?0:void 0);const u=Ce(a,[["Lived In",46],["Neglected",34],["Just Swept",14],["A Century",6]],i?1:void 0),R=Ce(a,[["Trunk And Bottles",30],["Crates",26],["Chair And Books",26],["Rolled Rugs",13],["Bare Boards",5]],i?0:void 0),V=Ce(a,[["Faint Draught",50],["Still",22],["Through Draught",22],["Gusting Eaves",6]],i?0:void 0),G=Ce(a,[["Oak Pegged",44],["Pine Rafters",34],["Tarred Black",15],["Lime Washed",7]],i?0:void 0),Y=Ce(a,[["Old Threads",60],["A Few Threads",32],["Shrouded",8]],i?0:void 0),$=Ce(a,[["Wool Lint",46],["Soot And Skin",32],["Hay Chaff",17],["Feather Down",5]],i?0:void 0),me=Ce(a,[["Clear",78],["Passing Cloud",22]],i?0:void 0),We=E();!i&&We<.14&&(f="Low Evening");const ye=E();let ee=!i&&f!=="Low Evening"&&ye<.16,we=(Math.imul(t^1779033750,795561021)^3960563)>>>0;const q=()=>{we=we+1831565813|0;let s=Math.imul(we^we>>>15,1|we);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296},H=[q(),q(),q(),q(),q(),q(),q(),q(),q(),q(),q(),q()],g=Array.from({length:20},q);let he=(Math.imul(t^528734635,843314857)^8342140)>>>0;const qe=(()=>{he=he+1831565813|0;let s=Math.imul(he^he>>>15,1|he);return s=s+Math.imul(s^s>>>7,61|s)^s,((s^s>>>14)>>>0)/4294967296})(),fe=!i&&!ee&&(f==="Morning"||f==="High Noon"||f==="Late Gold")&&H[1]<.3,Ke=!i&&H[2]<.45,Q=!i&&!ee&&f!=="Low Evening"&&H[6]<.19,Re=!i&&!ee&&!Q&&f!=="Low Evening"&&H[7]<.17,Fe=!i&&me==="Clear"&&f!=="Low Evening"&&qe<go,Te=!i&&!ee&&!Re&&f!=="Low Evening"?g[0]<.14?"Water Tank":g[0]>.86?"Tea Chests":"":"";let de=Re?"Chimney Breast":Te||R;e.trait("Gap",c),e.trait("Sun",(Fe?"Full Moon":f)+(ee?", looking up the shaft":"")),e.trait("Dust",u),e.trait("Floor",de),e.trait("Air",V),e.trait("Timber",G),e.trait("Webs",Y),e.trait("Motes",$),e.trait("Sky",Fe?"Clear night":me),e.trait("Reach",fe?"By the ridge":"Low gap"),e.trait("Standing",Q?"Down the attic":ee?"Up the shaft":"Beside the shaft");const te=(a()-.5)*.05,_=.72+(a()-.5)*.06,oe=[Math.cos(_),Math.sin(_),0],L=[-Math.sin(_),Math.cos(_),0],ne=[0,0,1],D=[.95,2.95,0],_e=s=>[D[0]-oe[0]*s,D[1]-oe[1]*s],je={Morning:{L:[-.44,.82,.36],C:[1,.75,.45],I:5.4},"High Noon":{L:[-.24,.94,.23],C:[1,.97,.9],I:6.2},"Late Gold":{L:[-.66,.66,.36],C:[1,.6,.27],I:5.1},"Winter Low":{L:[-.76,.56,.32],C:[1,.92,.72],I:3.8},"Low Evening":{L:[-.8,.45,.4],C:[1.8,.8,.3],I:4.45}},dt={Morning:[1,1,1,1],"High Noon":[2,2.5,3,2.5],"Late Gold":[.6,.5,.4,.5],"Winter Low":[3.1,5.4,8,2.5],"Low Evening":[2.4,2.1,2.9,.5]},Me=Fe?{L:je[f].L,C:Eo,I:Ro}:je[f],N=r.norm([Me.L[0]+(a()-.5)*.05,Me.L[1],Me.L[2]+(a()-.5)*.08]);let A=2.62+(a()-.5)*.08;fe&&(A=.62+H[3]*.36);const at=_e(A),Le=.62+(a()-.5)*.03,se=-.82+(a()-.5)*.04,I=[at[0],at[1],se-.13],Ie=.05+(a()-.5)*.1,bt=r.add(r.mul(oe,Math.cos(Ie)),r.mul(ne,Math.sin(Ie))),kt=r.add(r.mul(oe,-Math.sin(Ie)),r.mul(ne,Math.cos(Ie))),yt=L,Se=.3,et=.18,X=I[1]/N[1],ae=r.sub(I,r.mul(N,X)),Ze=r.sub(I,r.mul(N,X*.5)),Ye=f==="Low Evening",rt=Ye?uo:fe?1.62+H[4]*.1:1,ke=Ye?r.sub(I,r.mul(N,X*fo)):Ze;let P=[ke[0]+.54*rt+(a()-.5)*.08,(Ye?.34:.66)+(a()-.5)*.04,ke[2]+1.84*rt+(a()-.5)*.08],tt=[ke[0]-.03+te,ke[1]-.03+(Ye?.22:fe?.1:0),ke[2]];if(ee){const s=r.norm(r.cross(N,[0,1,0])),l=s[2]>0?s:r.mul(s,-1);P=r.add(r.add(ae,r.mul(N,X*lo)),r.add(r.mul(l,vo),[.12+P[0]-ke[0]-.54,P[1]-.46,0])),tt=r.sub(I,r.mul(N,X*mo))}Q&&(P=[D[0]+(Ze[0]-D[0])*It[0]+(H[8]-.5)*It[1],Ot[0]+H[9]*Ot[1],ae[2]+Vt[0]+H[5]*Vt[1]+(fe?.7:0)],tt=[Ze[0]+(D[0]-Ze[0])*bo,P[1]-(fe?.05:.3),Ze[2]-yo]);const Oe=r.norm(r.sub(tt,P)),nt=r.norm(r.cross(Oe,[0,1,0])),wt=r.cross(nt,Oe),lt=Q?wo:.5,it=ee?r.dot(r.sub(I,P),Oe)*ho:r.dot(r.sub(r.add(I,r.mul(N,-X*.55)),P),Oe)*1.02,J={"Oak Pegged":.42,"Pine Rafters":.61,"Tarred Black":.08,"Lime Washed":.91}[G],Ne=[],b=(s,l,v,d,m,h,x,T)=>{Ne.length<pt&&Ne.push({ty:s,ce:l,hh:v,ax:d,ay:m,mat:h,seed:x,near:T?1:0})},vt=1,ie=1,y=s=>(a()-.5)*s,U=_e(2.3),xe=Q?2.05:1.8,ce=[D[0]+oe[0]*xe,D[1]-oe[1]*xe];b(3,[U[0]+L[0]*.02,U[1]+L[1]*.02,-1],[2.4,.02,8],oe,L,0,.17);const S=[Math.cos(_),-Math.sin(_),0],M=[Math.sin(_),Math.cos(_),0];b(0,[ce[0]+M[0]*.02,ce[1]+M[1]*.02,-1],[Q?2.48:2.2,.02,8],[S[0],S[1],0],[M[0],M[1],0],0,.63);const Pe=s=>[D[0]+S[0]*s,D[1]+S[1]*s];b(0,[0,-.05,-1],[7,.05,9],[1,0,0],[0,1,0],2,.2),b(0,[0,2,-6.4],[6,3,.1],[1,0,0],[0,1,0],8,.4),b(0,[0,2,5.5],[6,3,.1],[1,0,0],[0,1,0],8,.8);const Ue=Math.max(2,Math.ceil((P[2]-se)/Le-1));for(let s=Ue-10;s<=Ue;s++){const l=se+Le*(s+.5)+y(.018),v=G==="Oak Pegged"?1.12:G==="Pine Rafters"?.78:1,d=(.042+y(.007))*v,m=(.078+y(.012))*v,h=2.05,x=_e(h);if(b(0,[x[0]-L[0]*m,x[1]-L[1]*m,l],[h+.05,m,d],oe,L,vt,J+s*.071+y(.05),l>P[2]-.85),Q){const T=Pe(h);b(0,[T[0]-M[0]*m,T[1]-M[1]*m,l+.02],[h+.05,m,d],[S[0],S[1],0],M,vt,J+s*.13,l>P[2]-.85)}else if(s%2===0||s>Ue-7){const T=[D[0]+S[0]*1.5,D[1]+S[1]*1.5];b(0,[T[0]-M[0]*m,T[1]-M[1]*m,l+.02],[1.55,m,d],[S[0],S[1],0],M,vt,J+s*.13)}}const le=_e(1.92);b(0,[le[0]-L[0]*.25,le[1]-L[1]*.25,-1.5],[6,.095,.07],ne,L,ie,J+.31);const Ve=_e(3.42);if(b(0,[Ve[0]-L[0]*.12,Ve[1]-L[1]*.12,-1.5],[6,.08,.07],ne,L,ie,J+.41),b(0,[Ve[0]-.06,.36,-1.5],[6,.36,.02],ne,[0,1,0],0,.29),Q){const s=Pe(1.92),l=Pe(3.42);b(0,[s[0]-M[0]*.25,s[1]-M[1]*.25,-1.5],[6,.095,.07],ne,M,ie,J+.35),b(0,[l[0]-M[0]*.12,l[1]-M[1]*.12,-1.5],[6,.08,.07],ne,M,ie,J+.45),b(0,[l[0]+.06,.36,-1.5],[6,.36,.02],ne,[0,1,0],0,.33)}b(0,[D[0]-0,D[1]-.1,-1.5],[6,.1,.025],ne,[0,1,0],ie,J+.77);const Be=r.add(r.add(P,r.mul(Oe,.8)),r.mul(nt,(Q?.62:.42)+y(.03))),Ge=Be[2],$e=r.norm([-.72,.69,0]);!ee&&!Q&&(b(0,[Be[0],1.4,Ge],[1.5,.07,.062],[0,1,0],[0,0,1],ie,J+.13,!0),b(0,[Be[0]+$e[0]*.36,Be[1]+.32+$e[1]*.36,Ge+.02],[.5,.05,.045],$e,[$e[1],-$e[0],0],ie,J+.59,!0));const Qe=-3.05+y(.06);Q?b(0,[D[0],1.72,Qe],[(D[1]-1.72)/Math.tan(_)+.08,.1,.075],[1,0,0],[0,1,0],ie,J+.22):b(0,[.42,1.72,Qe],[1.8,.1,.075],[1,0,0],[0,1,0],ie,J+.22),b(0,[.62,.86,Qe],[.88,.08,.07],[0,1,0],[0,0,1],ie,J+.27);const ot=r.norm([.6,.8,0]);b(0,[.28,1.02,Qe+.02],[.62,.05,.05],ot,[-ot[1],ot[0],0],ie,J+.29),b(0,[.42,.2,Qe-.06],[1.9,.08,.06],[1,0,0],[0,1,0],ie,J+.24),b(0,[-1.15,.55,-1.92],[.6,.065,.06],[0,1,0],[0,0,1],ie,J+.86);const ue=(s,l,v,d,m,h,x,T,B,F)=>{const w=[Math.cos(x),0,Math.sin(x)];b(F||0,[s,l+m,v],[d,m,h],w,[0,1,0],T,B)},De=(s,l,v,d,m,h,x)=>b(1,[s,l+m,v],[m,d,d],[0,1,0],[0,0,1],h,x),W=ae[0],K=ae[2],Ft=(s,l,v)=>[s*Math.cos(v)-l*Math.sin(v),s*Math.sin(v)+l*Math.cos(v)];let ct=X,mt=[0,1,0,X],ge=ae;if(Re){const s=Dt[0]+H[10]*Dt[1],l=(I[1]-s)/N[1],v=r.sub(I,r.mul(N,l)),d=r.norm([P[0]-v[0],0,P[2]-v[2]]),m=r.norm(r.add(r.norm([N[0],0,N[2]]),r.mul(d,xo))),h=[m[2],0,-m[0]],x=r.add(r.sub(v,r.mul(m,Ct)),r.mul(h,(H[11]-.5)*.16));b(0,[x[0],qt*.5,x[2]],[po,qt*.5,Ct],h,[0,1,0],9,H[11]),ct=l+.3,mt=[m[0]*Rt,m[1]*Rt,m[2]*Rt,l],ge=v}else if(Te){const s=Te==="Water Tank",l=s?.85:1,v=(I[1]-l+(s?.22:.16))/N[1],d=r.sub(I,r.mul(N,v)),m=r.norm([P[0]-d[0],0,P[2]-d[2]]),h=r.norm(r.add(r.norm([N[0],0,N[2]]),r.mul(m,.8))),x=[h[2],0,-h[0]],T=Math.atan2(x[2],x[0]),B=(w,k)=>[d[0]+x[0]*w-h[0]*k,d[2]+x[2]*w-h[2]*k];if(s){const pe=(g[2]-.5)*.2,Ee=B(pe,.3);for(const Je of[-.3,.3]){const gt=B(pe+Je,.3);b(0,[gt[0],.075,gt[1]],[.05,.075,.3+.06],x,[0,1,0],6,.4+Je)}b(0,[Ee[0],.15+.35,Ee[1]],[.45,.35,.3],x,[0,1,0],4,2.2+g[3]*.3);const j=B(pe-.12+g[4]*.1,.3+.04);ue(j[0],.85,j[1],.26,.011,.3+.05,T+(g[5]-.5)*.2,6,3.3+g[5]);const ze=B(pe+.45*.6,.3*1.6);b(1,[ze[0],1.25,ze[1]],[.4,.028,.028],[0,1,0],[0,0,1],7,.35)}else{const w=(Ee,j,ze,Je,gt,cs)=>{const co=B(Ee,j),Et=.24+Je*.03;return ue(co[0],ze,co[1],Et,Et*1.04,Et,T+gt,6,cs),Et*2.08},k=w(-.05,.26,0,g[6],(g[7]-.5)*.12,2.1);w(.02+(g[8]-.5)*.06,.28,k,g[8],(g[9]-.5)*.3,2.4);const pe=w(.5,.95,0,g[10],.2+(g[11]-.5)*.2,2.7);w(.52,.97,pe,g[12],.1+(g[13]-.5)*.3,2.55),w(-.62,.62,0,g[14],-.4+(g[15]-.5)*.3,2.85)}ct=v+.12,ge=d;const F=r.norm(r.add(h,[0,1,0]));mt=[F[0]*.7,F[1]*.7,F[2]*.7,v]}else if(de==="Trunk And Bottles"){const s=.28+y(.1),l=W-.74,v=K-.36;ue(l,0,v,.38,.135,.2,s,3,.31),b(1,[l,.27,v],[.385,.06,.2],[Math.cos(s),0,Math.sin(s)],[0,1,0],3,.63);const d=(F,w)=>{const k=Ft(F,w,s);return[l+k[0],v+k[1]]};for(const F of[-.23,.23]){const w=d(F,0);ue(w[0],-0,w[1],.022,.14,.203,s,3,.7),b(1,[w[0],.27,w[1]],[.022,.063,.203],[Math.cos(s),0,Math.sin(s)],[0,1,0],3,.73)}for(const F of[-1,1])for(const w of[-1,1]){const k=d(F*.365,w*.185);ue(k[0],0,k[1],.022,.142,.022,s,4,.4)}const m=d(0,.204);ue(m[0],.22,m[1],.036,.022,.005,s,4,.9);const h=W+.3,x=K-.03;De(h,0,x,.042,.115,5,.3),b(2,[h,.232,x],[.042,.03,.042],[1,0,0],[0,1,0],5,.31),De(h,.25,x,.0155,.045,5,.32),De(h+.13,0,x-.11,.036,.09,5,.5),b(2,[h+.13,.185,x-.11],[.036,.025,.036],[1,0,0],[0,1,0],5,.51),De(h+.13,.2,x-.11,.014,.035,5,.52),De(h-.28,0,x-.46,.082,.1,4,.71);const T=W-1.12,B=K+.78;ue(T,0,B,.13,.018,.095,.4,7,.21),ue(T+.006,.036,B+.004,.12,.016,.088,.3,7,.46),ue(T-.004,.068,B,.115,.014,.082,.52,7,.77)}else if(de==="Crates"){const s=(l,v,d,m,h,x,T,B)=>{const F=[Math.cos(T),0,Math.sin(T)],w=[-Math.sin(T),0,Math.cos(T)];b(0,[l,v+h,d],[m*.94,h*.94,x*.94],F,[0,1,0],8,.5);for(let k=0;k<4;k++){const Ee=v+h*(.25+k*.5)+y(.006);for(const j of[-1,1])b(0,[l+w[0]*x*j,Ee,d+w[2]*x*j],[m,h*.2,.007],F,[0,1,0],6,B+k*.11+j*.03),b(0,[l+F[0]*m*j,Ee,d+F[2]*m*j],[x,h*.2,.007],w,[0,1,0],6,B+k*.17+j*.05)}};s(W-.62,0,K-.22,.25,.2,.2,.26+y(.14),.13),Ne.length<So-18&&s(W-.55,.4,K-.3,.17,.13,.15,.5+y(.12),.47),De(W+.42,0,K-.35,.11,.14,4,.33)}else if(de==="Chair And Books"){const s=W-.36,l=K-.36,v=.5+y(.4),d=[Math.cos(v),0,Math.sin(v)],m=[-Math.sin(v),0,Math.cos(v)],h=(F,w)=>[s+d[0]*F+m[0]*w,l+d[2]*F+m[2]*w];for(const F of[[-.19,-.19,.86],[.19,-.19,.86],[-.19,.19,.43],[.19,.19,.43]]){const w=h(F[0],F[1]);b(0,[w[0],F[2]*.5,w[1]],[F[2]*.5,.016,.016],[0,1,0],[d[0],0,d[2]],6,.3+F[0])}const x=h(0,0);ue(x[0],.425,x[1],.215,.014,.215,v,6,.61);const T=h(0,-.19);for(const F of[.6,.7,.8])ue(T[0],F,T[1],.19,.022,.007,v,6,.2+F);const B=(F,w,k,pe)=>{let Ee=pe;for(let j=0;j<k;j++){const ze=.012+a()*.012;ue(F+y(.015),Ee,w+y(.015),.1+a()*.035,ze,.075+a()*.02,.1+a()*.6,7,a()),Ee+=ze*2}};B(W+.34,K+.02,6,0),B(W-1.04,K+.68,4,0)}else if(de==="Rolled Rugs"){const s=.15+y(.2),l=[Math.cos(s),0,Math.sin(s)];b(1,[W-.55,.085,K-.32],[.8,.085,.085],l,[0,1,0],7,.12),b(1,[W-.46,.085,K-.52],[.72,.08,.08],l,[0,1,0],7,.39),b(1,[W-.51,.225,K-.43],[.7,.078,.078],l,[0,1,0],7,.71),De(W+.45,0,K-.25,.1,.16,4,.71)}else De(W+.38,0,K-.44,.1,.13,4,.55);if(!i&&de!=="Bare Boards"){const s=Ve[0]-.06,l=3+Math.floor(g[16]*4),v=[[ae[0],ae[2],.5],[W-.6,K-.3,.38],[-1.15,-1.92,.16]];de==="Trunk And Bottles"&&v.push([W-1.1,K+.78,.25]),(Te||Re)&&v.push([ge[0],ge[2],Te==="Tea Chests"?1:.8]);for(let d=0,m=ae[2]+.25;d<l&&Ne.length<pt;d++){const h=(d*.618+g[17])%1,x=(d*.382+g[18])%1,T=d?.14+h*.2:.13+h*.08,B=.1+x*(d?.25:.1),F=.12+(1-h)*.1;let w=d?s+.15+T+x*.2:Math.max(s+.2+T,ae[0]-1.1),k=d?m:ae[2]-.15,pe=0;for(;pe<5&&v.some(Je=>Math.hypot(w-Je[0],k-Je[1])<Je[2]+T);pe++)k-=.25;if(pe===5)continue;d&&(m=k-.38-F-x*.25);const Ee=.7+(w-T-Ve[0])*Math.tan(_)-.06,j=Math.min(B,Ee*.5),ze=[3,7,6,3,4,7][(d+Math.floor(g[19]*6))%6];ze===7?b(1,[w,Math.min(F,j),k],[T+.06,Math.min(F,j),Math.min(F,j)],[Math.cos(.1*d),0,Math.sin(.1*d)],[0,1,0],7,h):ue(w,0,k,T,j,F,(h-.5)*.5,ze,ze===6?3.1+x:x)}}const st=Y==="A Few Threads"?9:Y==="Shrouded"?Xe:19,ht=new Float32Array(ve*Xe*4),xt=(s,l)=>{const v=_e(l);return[v[0]-L[0]*.14,v[1]-L[1]*.14,s]},Pt=(s,l,v,d,m)=>{for(let h=0;h<ve;h++){const x=h/(ve-1),T=l[0]+(v[0]-l[0])*x,B=l[1]+(v[1]-l[1])*x-d*4*x*(1-x),F=l[2]+(v[2]-l[2])*x,w=(s*ve+h)*4;ht[w]=T,ht[w+1]=B,ht[w+2]=F,ht[w+3]=m}},Qo=se+Le*.5,Jo=se-Le*.5;for(let s=0;s<st;s++){const l=a(),v=.28+a()*a()*.9;if(s<st*.34){const d=A-.22+a()*.5,m=d+(a()-.5)*.22;Pt(s,xt(Jo+.036,d),xt(Qo-.036,m),.012+a()*.05,v)}else if(s<st*.6){const d=.08+a()*.4,m=r.sub(I,r.mul(N,X*d)),h=xt(m[2]+(a()-.5)*.5,A+.55+a()*.32),x=r.norm([.82,.22+a()*.3,(a()<.5?-1:1)*(.2+a()*.42)]),T=.36+a()*.45,B=r.add(m,r.mul(x,T));Pt(s,h,B,.03+a()*.13,v*.8)}else{const d=se+Le*(-1.5-Math.floor(a()*3)),m=A+a()*.9-.35;Pt(s,xt(d,m),xt(d+Le-.08,m+(a()-.5)*.3),.01+a()*.05,v*.7)}}const ao=new Float32Array(pt*16);Ne.forEach((s,l)=>{const v=l*16;ao.set([s.ce[0],s.ce[1],s.ce[2],s.ty,s.hh[0],s.hh[1],s.hh[2],s.mat,s.ax[0],s.ax[1],s.ax[2],s.seed,s.ay[0],s.ay[1],s.ay[2],s.near],v)});const es={"Board Gap":0,"Slipped Slate":1,"Knot Hole":2,"Split Board":3,"Shrunk Slats":4,"Nail Holes":5}[c],ts={"Just Swept":.3,"Lived In":.6,Neglected:.92,"A Century":1.5}[u],os={Still:[0,0,.03,.4],"Faint Draught":[.018,-.004,.05,.3],"Through Draught":[.05,-.008,.05,.2],"Gusting Eaves":[.075,.012,.06,.16]}[V],ss={"Wool Lint":{fib:.06,set:1,D:18e-5,sz:1},"Soot And Skin":{fib:.012,set:.8,D:24e-5,sz:.85},"Hay Chaff":{fib:.24,set:1.7,D:11e-5,sz:1.3},"Feather Down":{fib:.13,set:.55,D:14e-5,sz:1.6}}[$],ro=r.sub(I,r.mul(N,X*.5)),Tt=Math.max(3,Math.abs(I[0]-ae[0])+.9),no=ro[0]-Tt*.5,io=-.14,as=[(ge[0]-no)/Tt,(ge[1]+.15-io)/Tt,.085],rs=Math.min(I[2],ae[2])-.75,ns=Math.max(I[2],ae[2])+.75,is=e.home;return{rng:a,gap:c,kind:es,seedF:(t>>>8)%97/97+.13,hoard:de,data:ao,count:Ne.length,rest:ht,nTh:st,eye:P,fw:Oe,rt:nt,up:wt,tanH:lt,L:N,SO:I,SU:bt,SV:kt,SN:yt,Hu:Se,Hv:et,focus:it,C:Me.C,I:Me.I,dustB:ts,AIR:os,MOTES:ss,floorT:X,Pc:ae,domW:Tt,X0:no,Y0:io,plume:as,zMin:rs,zMax:ns,roofN:[L[0],L[1]],roofC:0,lint:$,air:V,weather:me,ridge:D,mid:ro,home:is,wood:G,slope:_,upV:ee,sun:f,mir:Ke,ridgeG:fe,down:Q,chim:Re,shaftT:ct,chimN:mt,moon:Fe,big:Te,cold:Fe?[0,0,0,0]:dt[f],vx:Re||!!Te||Fe,amb:G==="Lime Washed"?1.5:G==="Tarred Black"?.7:1}}const to=.62,oo=.66;function Yo(e,t){const o=new Float32Array(112),a=(u,R,V)=>{o[u*4]=R[0],o[u*4+1]=R[1],o[u*4+2]=R[2],o[u*4+3]=V};a(0,e.eye,e.mir?-1:1),a(1,e.rt,e.tanH),a(2,e.up,e.upV?.42:1),a(3,e.fw,e.focus),a(4,e.SO,Fo[e.kind]),a(5,e.SU,1/e.Hu),a(6,e.SV,1/e.Hv),a(7,e.SN,1/r.dot(e.L,e.SN)),a(8,e.L,e.shaftT*1.06),o[9*4]=e.X0,o[9*4+1]=e.Y0,o[9*4+2]=1/e.domW,o[9*4+3]=1/e.domW;const i=2*e.Hu/256;o[10*4]=e.zMin,o[10*4+1]=1/(e.zMax-e.zMin),o[10*4+2]=.0093/i,o[10*4+3]=17,o[11*4+2]=e.dustB*.62,o[11*4+3]=e.I,o[12*4]=e.AIR[0],o[12*4+1]=e.AIR[1],o[12*4+2]=e.AIR[2],o[12*4+3]=e.amb,o[13*4]=e.plume[0],o[13*4+1]=e.plume[1],o[13*4+2]=e.plume[2],o[13*4+3]=e.AIR[3];const c=-(e.roofN[0]*e.SO[0]+e.roofN[1]*e.SO[1]);o[14*4]=-e.roofN[0],o[14*4+1]=-e.roofN[1],o[14*4+2]=-c,o[14*4+3]={"Oak Pegged":0,"Pine Rafters":1,"Tarred Black":2,"Lime Washed":3}[e.wood],o[15*4]=e.C[0],o[15*4+1]=e.C[1],o[15*4+2]=e.C[2],o[15*4+3]=1,o[16*4]=e.MOTES.set,o[16*4+1]=.2,o[16*4+2]=e.MOTES.D,o[16*4+3]=20;const n=.36/e.Hu,E=.2/e.Hv;o[17*4]=n,o[17*4+1]=E,o[17*4+2]=e.MOTES.fib,o[17*4+3]=t,o[18*4]=to,o[18*4+1]=e.kind===0?.36:oo,o[18*4+2]=40,o[18*4+3]=3,o.set(e.chimN,19*4);const p=e.moon?[1,1,1,1]:e.cold.map((u,R)=>R<3?(e.amb>1?1+(u-1)*.35:u)*e.amb:u),f=e.moon?zo:[.0062,.0075,.0098,.042];for(let u=0;u<4;u++)o[26*4+u]=f[u]*p[u];return o.set(e.moon?Ao:[1,1,1,0],27*4),o}function so(e,t,o,a,i){const c=o.keyHash+"|"+i;let n=t.bakes.get(c);if(n)return t.order.splice(t.order.indexOf(c),1),t.order.push(c),n;const E=o.vx?t.PC:t.P,p=o.vx?t.UC:t.U,f=i>512?1024:512,u=f>>1;e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.depthMask(!1),e.bindVertexArray(t.vao),e.bindBufferBase(e.UNIFORM_BUFFER,0,a);const R=ut(e,256,128,e.RGBA8,0,0,e.CLAMP_TO_EDGE,e.LINEAR_MIPMAP_LINEAR,8),V=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,V),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,R,0),e.viewport(0,0,256,128),e.activeTexture(e.TEXTURE4),e.bindTexture(e.TEXTURE_2D,t.noise);const G=Xo(e,t,o.kind);e.bindFramebuffer(e.FRAMEBUFFER,V),e.viewport(0,0,256,128),e.useProgram(G.p),e.uniform4f(G.a,o.kind,o.seedF,o.Hu,o.Hv),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE5),e.bindTexture(e.TEXTURE_2D,R),e.generateMipmap(e.TEXTURE_2D);const Y=e.createBuffer();e.bindBuffer(e.UNIFORM_BUFFER,Y),e.bufferData(e.UNIFORM_BUFFER,o.data,e.STATIC_DRAW),e.bindBufferBase(e.UNIFORM_BUFFER,1,Y);const $=t.fl16?e.RGBA16F:e.RGBA8,me=C(e,f,f,$,e.LINEAR),We=C(e,u,u,$,e.LINEAR),ye=f>512?384:256,ee=C(e,ye,ye,$,e.NEAREST),we=C(e,ye,ye,$,e.NEAREST);e.useProgram(E.shadeI),e.uniform1i(p.countI,o.count),e.uniform1i(p.raysI,20),e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,ee.f),e.viewport(0,0,ye,ye),e.drawArrays(e.TRIANGLES,0,3),e.flush(),e.useProgram(E.post),e.uniform1i(p.postK,1),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,ee.t),e.bindFramebuffer(e.FRAMEBUFFER,we.f),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,we.t);const q=ut(e,f,f,e.RGBA32UI,0,0,e.CLAMP_TO_EDGE,e.NEAREST),H=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,H),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,q,0),e.viewport(0,0,f,f),e.useProgram(E.shadeM),e.uniform1i(p.countM,o.count);const g=8;e.enable(e.SCISSOR_TEST);for(let te=0;te<g;te++)e.scissor(0,te*f/g|0,f,(f/g|0)+1),e.drawArrays(e.TRIANGLES,0,3),e.flush();e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,q),e.useProgram(E.shade),e.uniform1i(p.count,o.count),e.uniform1f(p.irrR,ye),e.uniform1i(p.mode,t.fl16?2:0),e.uniform1i(p.rays,2),e.bindFramebuffer(e.FRAMEBUFFER,me.f),e.viewport(0,0,f,f);for(let te=0;te<g;te++)e.scissor(0,te*f/g|0,f,(f/g|0)+1),e.drawArrays(e.TRIANGLES,0,3),e.flush();e.disable(e.SCISSOR_TEST),e.uniform1i(p.mode,1),e.uniform1i(p.rays,2),e.bindFramebuffer(e.FRAMEBUFFER,We.f),e.viewport(0,0,u,u),e.drawArrays(e.TRIANGLES,0,3),e.deleteBuffer(Y),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,null),e.deleteFramebuffer(H),e.deleteTexture(q);const he=.0175,qe=C(e,f,f,t.fl16?e.RGBA16F:e.RGB10_A2,e.LINEAR);e.useProgram(E.post),e.uniform1i(p.postK,0);const fe=r.sub(o.SO,o.eye),Ke=r.dot(fe,o.fw),Q=r.dot(fe,o.rt)/(Ke*o.tanH)*.5+.5,Re=r.dot(fe,o.up)/(Ke*o.tanH)*.5+.5;e.uniform4f(p.postG,he,1/f,Q,Re),e.uniform4f(p.postG2,o.I/5.4*(o.kind===2?.5:1),0,0,0),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,me.t),e.bindFramebuffer(e.FRAMEBUFFER,qe.f),e.viewport(0,0,f,f),e.drawArrays(e.TRIANGLES,0,3);const Fe=C(e,u,u,$,e.LINEAR);e.uniform1i(p.postK,2),e.uniform4f(p.postG,he,1/u,0,0),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,We.t),e.bindFramebuffer(e.FRAMEBUFFER,Fe.f),e.viewport(0,0,u,u),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE14),e.bindTexture(e.TEXTURE_2D,null),e.deleteFramebuffer(V),e.activeTexture(e.TEXTURE15),e.bindTexture(e.TEXTURE_2D,null),ft(e,me),ft(e,We),ft(e,ee),ft(e,we),n={scene:qe.t,sceneF:qe.f,aux:Fe.t,auxF:Fe.f,mask:R},t.bakes.set(c,n),t.order.push(c);const Te=i>512?3:12;let de=0;for(const te of t.order)te.endsWith("|"+i)&&de++;if(de>Te){const te=t.order.find(oe=>oe.endsWith("|"+i)),_=t.bakes.get(te);e.deleteTexture(_.scene),e.deleteFramebuffer(_.sceneF),e.deleteTexture(_.aux),e.deleteFramebuffer(_.auxF),e.deleteTexture(_.mask),_.dead=!0,t.bakes.delete(te),t.order.splice(t.order.indexOf(te),1)}return n}function $o(e){const t=[];for(const u of[-1,1])for(const R of[-1,1])for(const V of[0,e.shaftT*1.06]){const G=r.sub(r.add(r.add(e.SO,r.mul(e.SU,u*e.Hu*to)),r.mul(e.SV,R*e.Hv*oo)),r.mul(e.L,V)),Y=r.sub(G,e.eye),$=Math.max(r.dot(Y,e.fw),.25);t.push([r.dot(Y,e.rt)/($*e.tanH)*.5+.5+0,r.dot(Y,e.up)/($*e.tanH)*.5+.5])}t.sort((u,R)=>u[0]-R[0]||u[1]-R[1]);const a=(u,R,V)=>(R[0]-u[0])*(V[1]-u[1])-(R[1]-u[1])*(V[0]-u[0]),i=[],c=[];for(const u of t){for(;i.length>=2&&a(i[i.length-2],i[i.length-1],u)<=0;)i.pop();i.push(u)}for(let u=t.length-1;u>=0;u--){const R=t[u];for(;c.length>=2&&a(c[c.length-2],c[c.length-1],R)<=0;)c.pop();c.push(R)}const n=i.slice(0,-1).concat(c.slice(0,-1)),E=n.reduce((u,R)=>u+R[0],0)/n.length,p=n.reduce((u,R)=>u+R[1],0)/n.length,f=[];for(let u=0;u<n.length;u++){const R=n[u],V=n[(u+1)%n.length],G=me=>[E+(me[0]-E)*(1+.03),p+(me[1]-p)*(1+.03)],Y=G(R),$=G(V);f.push(E,p,Y[0],Y[1],$[0],$[1])}return new Float32Array(f)}Ut.add({num:254,name:"Attic Beam",fam:"Worlds",recipe:"A dark attic with a shaft of light through a gap in the roof, and thousands of dust specks drifting on real air currents that only show where they cross it. The gap, the light and what's stored up there change every mint. Drag to shake out a cloth full of dust, harder for a storm, or tap for a puff.",interactive:"Drag to shake a cloth full of dust into the air, harder for a storm. Tap for a puff.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,o=Zo(e),a=Ko(t,o.kind,o.vx),i=Wo(t,a,o.vx),c=e.size;o.keyHash=e.hash;const n=Yo(o,c),E=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,n,t.DYNAMIC_DRAW);let p=so(t,a,o,E,c);const f=a.fl16,u=f?t.RGBA16F:t.RGBA8,R=c>512?512:256,V=C(t,be,be,u),G=C(t,be,be,u),Y=C(t,be,be,f?t.RG16F:t.RGBA8),$=C(t,be,be,f?t.RG16F:t.RGBA8),me=C(t,He,He,u),We=C(t,He,He,u),ye=a.fl32?t.RGBA32F:u,ee=C(t,Ae,Ae,ye,t.NEAREST),we=C(t,Ae,Ae,ye,t.NEAREST),q=C(t,ve,Xe,u,t.NEAREST),H=C(t,ve,Xe,u,t.NEAREST),g=C(t,Gt,Gt,f?t.RG16F:t.RGBA8),he=C(t,R,R,f?t.RG16F:t.RGBA8),qe=C(t,128,128,f?t.RG16F:t.RGBA8),fe=C(t,128,128,f?t.RG16F:t.RGBA8),Ke=C(t,c,c,f?t.RG16F:t.RGBA8),Q=ut(t,ve,Xe,t.RGBA32F,0,0,t.CLAMP_TO_EDGE,t.NEAREST);t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Q),t.texSubImage2D(t.TEXTURE_2D,0,0,0,ve,Xe,t.RGBA,t.FLOAT,o.rest);const Re=$o(o),Fe=Re.length/2,Te=t.createBuffer(),de=t.createVertexArray();t.bindVertexArray(de),t.bindBuffer(t.ARRAY_BUFFER,Te),t.bufferData(t.ARRAY_BUFFER,Re,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null);const te=(ve-1)*Xe*6;let _=V,oe=G,L=Y,ne=$,D=me,_e=We,je=ee,dt=we,Me=q,N=H;const A=(y,z)=>{t.activeTexture(t.TEXTURE0+y),t.bindTexture(t.TEXTURE_2D,z)},at=()=>{A(0,_.t),A(1,L.t),A(2,D.t),A(3,je.t),A(4,a.noise),A(5,p.mask),A(6,g.t),A(7,he.t),A(8,fe.t),A(9,Ke.t),A(10,p.scene),A(11,p.aux),A(12,Me.t),A(13,Q)},Le=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.depthMask(!1),t.colorMask(!0,!0,!0,!0)},se=(y,z)=>{t.bindFramebuffer(t.FRAMEBUFFER,z.f),t.viewport(0,0,z.w,z.h),t.useProgram(y),t.drawArrays(t.TRIANGLES,0,3)},I=20*4;let Ie=0;const bt=y=>{n[11*4]=Ie,n[11*4+1]=y,t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferSubData(t.UNIFORM_BUFFER,0,n),se(i.vel,oe);{const z=_;_=oe,oe=z}A(0,_.t),t.useProgram(i.pres),t.uniform1i(a.U.presK,0),se(i.pres,ne);{const z=L;L=ne,ne=z}A(1,L.t),t.uniform1i(a.U.presK,1);for(let z=0;z<To;z++){t.bindFramebuffer(t.FRAMEBUFFER,ne.f),t.drawArrays(t.TRIANGLES,0,3);const U=L;L=ne,ne=U,t.bindTexture(t.TEXTURE_2D,L.t)}t.uniform1i(a.U.presK,2),se(i.pres,oe);{const z=_;_=oe,oe=z}A(0,_.t),se(i.dye,_e);{const z=D;D=_e,_e=z}A(2,D.t),se(i.pt,dt);{const z=je;je=dt,dt=z}A(3,je.t),se(i.th,N);{const z=Me;Me=N,N=z}A(12,Me.t)};if(t.bindVertexArray(a.vao),Le(),t.bindBufferBase(t.UNIFORM_BUFFER,0,E),at(),t.useProgram(i.init),t.uniform1i(a.U.initK,2),t.uniform4f(a.U.d0A,(o.mid[0]+.1-o.X0)/o.domW,(o.mid[1]+.08-o.Y0)/o.domW,.13,o.dustB*3),se(i.init,D),f){t.uniform1i(a.U.initK,0),se(i.init,je),t.uniform1i(a.U.initK,1),se(i.init,_),t.bindFramebuffer(t.FRAMEBUFFER,q.f),t.viewport(0,0,ve,Xe),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,H.f),t.clear(t.COLOR_BUFFER_BIT),t.bindFramebuffer(t.FRAMEBUFFER,Y.f),t.viewport(0,0,be,be),t.clear(t.COLOR_BUFFER_BIT);const y=o.seedF*7.31%1<.5?1:-1,z=.02+o.seedF*3.17%1*.22,U=S=>(S-o.X0)/o.domW,xe=S=>(S-o.Y0)/o.domW,ce=20*4;n.set([U(o.mid[0]-y*.5),xe(o.mid[1]-z),U(o.mid[0]-y*.12),xe(o.mid[1]-z+.1),y*.3,.05,.11,.3],ce);for(let S=0;S<18;S++)Ie+=.05,S===9&&(n[ce+7]=0),bt(.05)}const kt=()=>{p.dead&&(p=so(t,a,o,E,c),t.bindVertexArray(a.vao),Le())},yt=()=>{f?se(i.tr,g):(t.bindFramebuffer(t.FRAMEBUFFER,g.f),t.clearColor(1,1,1,1),t.clear(t.COLOR_BUFFER_BIT)),t.bindFramebuffer(t.FRAMEBUFFER,he.f),t.viewport(0,0,R,R),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(i.vol),t.bindVertexArray(de),t.drawArrays(t.TRIANGLES,0,Fe),t.bindVertexArray(a.vao),A(14,he.t),t.useProgram(i.blur),t.uniform4f(a.U.blurA,.018,.018,0,0),t.bindFramebuffer(t.FRAMEBUFFER,qe.f),t.viewport(0,0,128,128),t.drawArrays(t.TRIANGLES,0,3),A(14,qe.t),t.uniform4f(a.U.blurA,.07,.07,1.1,0),t.bindFramebuffer(t.FRAMEBUFFER,fe.f),t.drawArrays(t.TRIANGLES,0,3),A(14,null),t.bindFramebuffer(t.FRAMEBUFFER,Ke.f),t.viewport(0,0,c,c),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),f&&(t.useProgram(i.mote),t.drawArrays(t.POINTS,0,o.moon?Ae*Ae/3|0:Ae*Ae),t.useProgram(i.web),t.drawArrays(t.TRIANGLES,0,te)),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush(),t.viewport(0,0,c,c),t.useProgram(i.comp),t.drawArrays(t.TRIANGLES,0,3)};at(),yt();const Se=o.rng,et=e.sound,X=e.input;let ae=0,Ze=0,Ye=!1,rt=0,ke=0,P=0,tt=0,Oe=0,nt=0,wt=7+Se()*14,lt=1,it=1,Nt=6+Se()*10;const J=o.mid[2],Ne=(y,z)=>{o.mir&&(y=1-y);const U=(y*2-1)*o.tanH,xe=(1-z*2)*o.tanH,ce=[o.fw[0]+o.rt[0]*U+o.up[0]*xe,o.fw[1]+o.rt[1]*U+o.up[1]*xe,o.fw[2]+o.rt[2]*U+o.up[2]*xe],S=(J-o.eye[2])/ce[2];return[(o.eye[0]+ce[0]*S-o.X0)/o.domW,(o.eye[1]+ce[1]*S-o.Y0)/o.domW]},b=(y,z,U,xe,ce,S,M,Pe,Ue)=>{const le=I+y*8;n[le]=z,n[le+1]=U,n[le+2]=xe,n[le+3]=ce,n[le+4]=S,n[le+5]=M,n[le+6]=Pe,n[le+7]=Ue},vt=()=>{for(let y=0;y<3;y++)n[I+y*8+7]=0},ie=(y,z)=>{kt();const U=Math.min(Math.max(z,1/90),.1);if(Ie=y+.9,vt(),X){const xe=X.taps?X.taps():[];let ce=0;for(const S of xe){if(ce>1)break;const M=Ne(S.x,S.y);b(ce++,M[0],M[1],M[0],M[1],0,.12,.085,3+2.2/(1+P*.2)),P+=.35,et.hit("noise",.24,{cutoff:620,dur:.34,pan:S.x*2-1})}if(X.down&&X.inside){const S=X.x,M=X.y;if(Ye){const Pe=Ne(ae,Ze),Ue=Ne(S,M),le=Ue[0]-Pe[0],Ve=Ue[1]-Pe[1],Be=Math.hypot(le,Ve),Ge=Be/U;if(Be>1e-4){nt+=Be;const $e=le*o.domW/U,Qe=Ve*o.domW/U,ot=Math.min(Ge/.9,1.8),ue=.58,De=3,W=Math.hypot($e,Qe)||1,K=Math.min(W,De)/W,Ft=le/Be,ct=Ve/Be,mt=rt*Ft+ke*ct;let ge=0;mt<-.1&&Ge>.28&&(ge=Math.min(1,Ge*.9),et.hit("noise",.25+ge*.4,{cutoff:900+ge*900,dur:.22,pan:S*2-1}),et.hit("kick",.18+ge*.3,{pan:S*2-1})),rt=Ft,ke=ct;const st=(ot*ot*.7+ge*2.4+.12)*(U*30)*.42/(1+P*.06);b(ce>2?2:ce++,Pe[0],Pe[1],Ue[0],Ue[1],$e*K*ue,Qe*K*ue,.08+ot*.018,Math.min(st,2.9)),P+=st*.25,tt-=U,tt<=0&&Ge>.12&&(et.hit("noise",Math.min(.05+Ge*.1,.22),{cutoff:1500+Ge*1400,dur:.13,pan:S*2-1}),tt=.09+Se()*.07)}Oe+=U}else Oe=0,nt=0,rt=ke=0;ae=S,Ze=M,Ye=!0}else Ye=!1}P*=Math.exp(-U*.11),o.weather==="Passing Cloud"&&(y>Nt&&(it=it>.8?.22+Se()*.3:1,Nt=y+(it>.8?8+Se()*12:4+Se()*6)),lt+=(it-lt)*(1-Math.exp(-U*.55)),n[15*4+3]=lt),y>wt&&(et.hit("click",.08+Se()*.14,{pan:-.5+Se()*.4}),wt=y+8+Se()*22),t.bindVertexArray(a.vao),Le(),t.bindBufferBase(t.UNIFORM_BUFFER,0,E),at(),f?bt(U):(n[11*4]=Ie,t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferSubData(t.UNIFORM_BUFFER,0,n)),yt()};if(eo){const y=[V,G,Y,$,me,We,ee,we,q,H,g,he,qe,fe,Ke];eo.register(ie,jo(t,y,[Q],[Te,E],[de]))}return ie}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
