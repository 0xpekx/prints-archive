// Light Rings: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/212.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(De){De&&function(){"use strict";const Be=new WeakMap,Fo=0,Ft=1024,Ot=1024,vt=12,jt=.589,bt=(t,s,x)=>t<s?s:t>x?x:t,Rt=`#version 300 es
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); gl_Position=vec4(p,0.,1.); }`,Ge=`#version 300 es
  precision highp float;
  uniform float Z0; uniform vec4 U[10]; uniform vec4 Gr[${vt}]; uniform sampler2D tN; out vec4 o;
  #define CAM U[0].xyz
  #define WW U[0].w
  #define FW U[1].xyz
  #define DD U[1].w
  #define UP U[2].xyz
  #define ZF U[2].w
  #define RF U[3].x
  #define RO U[3].y
  #define ZC U[3].z
  #define TF U[3].w
  #define LC U[4].xyz
  #define TUBES U[4].w
  #define BENCH U[5].x
  #define CELL U[5].y
  #define COCK U[5].z
  #define NG int(U[5].w)
  #define TGT U[6].xyz
  const float E=1.0; float LK=1.,LB=.72;
  float at2(float y,float x){ float a=atan(y/(abs(x)+1e-7)); return x<0.?(y>=0.?3.14159265-a:-3.14159265-a):a; }
  float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<4+int(Z0);i++){ s+=a*textureLod(tN,p,0.).b; p=p*2.03+.37; a*=.5; } return s; }
  float lamp(vec3 ro,vec3 rd,float soft){
    vec3 n=normalize(LC-TGT); float dn=dot(rd,n); float r=.018;
    if(dn>.01){ float t=dot(LC-ro,n)/dn; vec3 h=ro+rd*t-LC; vec3 ex=vec3(1.,0.,0.),ey=normalize(cross(n,ex));
      float u=dot(h,ex),v=dot(h,ey),hu=U[6].w*LK,hv=U[7].x*LK;
      vec2 bx=abs(vec2(u,v))-vec2(hu,hv)+7.; float sd=length(max(bx,0.))+min(max(bx.x,bx.y),0.)-7.; float s=smoothstep(soft,-soft,sd);
      float tube=mix(1.,.62+.38*cos(u/hu*7.2+.6),TUBES);
      r+=s*tube*(LB+.62*exp(-(u*u+v*v)/(U[6].w*U[7].x*.9))); }
    return r; }
  vec2 lamp2(vec3 ro,vec3 rd,vec2 soft,vec2 lb){
    vec3 n=normalize(LC-TGT); float dn=dot(rd,n); vec2 r=vec2(.018);
    if(dn>.01){ float t=dot(LC-ro,n)/dn; vec3 h=ro+rd*t-LC; vec3 ex=vec3(1.,0.,0.),ey=normalize(cross(n,ex));
      float u=dot(h,ex),v=dot(h,ey),hu=U[6].w*LK,hv=U[7].x*LK;
      vec2 bx=abs(vec2(u,v))-vec2(hu,hv)+7.; float sd=length(max(bx,0.))+min(max(bx.x,bx.y),0.)-7.; vec2 s=vec2(smoothstep(soft.x,-soft.x,sd),smoothstep(soft.y,-soft.y,sd));
      float tube=mix(1.,.62+.38*cos(u/hu*7.2+.6),TUBES);
      r+=s*tube*(lb+.62*exp(-(u*u+v*v)/(U[6].w*U[7].x*.9))); }
    return r; }
  void main(){
    vec2 ndc=gl_FragCoord.xy/${Ft}.*2.-1.;
    vec3 ro=CAM, rd=normalize(FW*DD+vec3(1.,0.,0.)*ndc.x*WW+UP*ndc.y*WW);
    vec3 l=normalize(LC-TGT);
    float t=-ro.z/rd.z; int id=0;
    float rI=RF+.2;
    // cell outer wall, top, inner wall, flat
    { vec2 ox=ro.xy; float a=dot(rd.xy,rd.xy),b=dot(ox,rd.xy),c=dot(ox,ox)-RO*RO,d=b*b-a*c;
      float tTop=(ZC-ro.z)/rd.z; vec2 pT=ro.xy+rd.xy*tTop; float rT=length(pT);
      if(rT<RO){
        if(rT>=rI){ t=tTop; id=2; }
        else { float tFl=(ZF-ro.z)/rd.z; vec2 pF=ro.xy+rd.xy*tFl;
          if(length(pF)<rI){ t=tFl; id=4; }
          else { float b2=dot(ox,rd.xy),c2=dot(ox,ox)-rI*rI,d2=b2*b2-a*c2; t=(-b2+sqrt(max(d2,0.)))/a; id=3; } }
      } else if(d>0.){ float tc=(-b-sqrt(d))/a; float z=ro.z+rd.z*tc; if(tc>0.&&z>0.&&z<ZC&&tc<t){ t=tc; id=1; } }
    }
    vec3 h=ro+rd*t; vec2 p=h.xy; float rr=length(p);
    // the diffuser seen in the flat is wider than the lens, so the film is lit round it
    LK=2.; vec2 pl=lamp2(vec3(p,ZF),reflect(rd,vec3(0.,0.,1.)),vec2(9.,3.6),vec2(LB,.22)); float L=0.,ptc=pl.x; LK=1.;
    // Lr: what a work light over the bench would give (only the work-light mints read it, from the third channel)
    float Lr=0.;
    if(id==0){
      vec3 N=vec3(0.,0.,1.);
      float big=fbm(p/90.), med=fbm(p/21.), g=textureLod(tN,p/21.,0.).r, g2=textureLod(tN,p/9.,0.).g;
      vec2 hc=mod(p+12.5,25.)-12.5; float dh=length(hc);
      float alb=.3; float gloss=.32, soft=70.;
      float brush=fbm(vec2(p.x/150.+.1*big,p.y/1.6));
      float wear=fbm(p/47.+7.); wear=smoothstep(.42,.68,wear);
      if(BENCH<.5){ alb=.3+.09*(big-.5)+.11*(g-.5)+.05*(g2-.5)+.12*(brush-.5); gloss=.45+.22*wear+.3*(brush-.5); }
      else if(BENCH<1.5){ alb=.06+.022*g+.03*(brush-.5); gloss=.6+.5*wear+.3*(brush-.5); soft=46.; }
      else { float lay=fbm(vec2(p.x/70.+big,p.y/9.)); alb=.05+.15*lay*lay+.06*(g-.5); gloss=.16+.14*wear; soft=60.; }
      // the odd long scratch
      for(int i=0;i<6+int(Z0);i++){ float an=float(i)*2.4+.9; vec2 dr=vec2(cos(an),sin(an)); vec2 c=p-vec2(sin(float(i)*5.1)*48.,18.+cos(float(i)*3.7)*48.); float al=dot(c,dr); float ac=abs(dot(c,vec2(-dr.y,dr.x))+.004*al*al);
        alb+=(.05+.05*g2)*smoothstep(.09,.0,ac)*smoothstep(26.,8.,abs(al)); }
      // chamfer of the tapped hole, worn bright on the side facing the lamp
      float hr=3.2; float ch=smoothstep(hr+.85,hr+.05,dh)*step(hr,dh); if(ch>0.){ N=normalize(vec3(-hc/dh*.8*ch,1.)); }
      vec3 Rf=reflect(rd,N); float lmb=max(dot(N,l),0.);
      // a soft shadow from the cell, thrown toward the camera
      vec2 sv=-l.xy/l.z*ZC; float sa=clamp(dot(p,sv)/dot(sv,sv),0.,1.); float ds=length(p-sv*sa)-RO;
      float sh=smoothstep(-5.,11.,ds);
      float ao=1.-.55*exp(-max(rr-RO,0.)/5.);
      vec2 fc=(p-vec2(LC.x*.6-12.,4.))/vec2(100.,43.);
      float fall=.19+1.18*exp(-dot(fc,fc));
      float dif=alb*lmb*1.9*sh*fall;
      // the room's own dim light: the bench under the cell's shadow is tinted dark, never black
      L=dif*ao+gloss*.55*lamp(h,Rf,soft+18.)*mix(.7,1.,g2)*sh*fall+alb*.07*(.5+.5*ao);
      L*=1.+ch*1.1*smoothstep(-1.,1.,-hc.y);
      if(dh<hr){ float yw=sqrt(max(hr*hr-hc.x*hc.x,0.)); float dpt=yw-hc.y; float thr=.5+.5*sin(dpt*7.4); thr=thr*thr;
        L=.016+(.04+.2*thr)*exp(-dpt/1.7)*sh*fall; }
      L+=smoothstep(.993,1.,textureLod(tN,p/31.,0.).g)*.2*sh*fall;
      // the work light: a broad cool panel overhead, so the bench shows its own grain and gloss; the holes stay dark
      Lr=(alb*.62+gloss*.06*(.7+.6*g2))*(.5+.5*ao)*(dh<hr?.12:1.+ch*.5);
    } else if(id==1){
      // knurled outer wall of the cell, away from the lamp
      float a=at2(p.y,p.x), z=h.z;
      float ku=a*22.6+z*.72, kv=a*22.6-z*.72; vec2 ff=fract(vec2(ku,kv))-.5;
      float band=smoothstep(1.,1.5,z)*smoothstep(ZC-.9,ZC-1.5,z);
      float ht=min(abs(ff.x),abs(ff.y))*2.;
      vec3 N=normalize(vec3(p/rr,0.)); vec3 tg=vec3(-N.y,N.x,0.);
      vec3 Nk=normalize(N+band*(tg*.8*sign(ff.x+ff.y)*smoothstep(.0,.2,abs(ff.x+ff.y))+vec3(0.,0.,.8)*sign(ff.x-ff.y)*smoothstep(.0,.2,abs(ff.x-ff.y))));
      float alb=CELL<.5?.62:(CELL<1.5?.07:.55);
      float fill=.1+.14*max(Nk.z,0.)+.5*pow(max(abs(Nk.x)*.9+max(Nk.z,0.)*.4,0.),6.);
      float grazing=pow(max(dot(Nk,normalize(l+vec3(0.,-.55,-.1))),0.),5.);
      L=alb*(fill+.8*grazing)*mix(.45,1.,smoothstep(.0,.25,ht)*band+(1.-band)*.8);
      L*=.45+.55*smoothstep(0.,5.,z);
      L*=.72+.56*textureLod(tN,p/31.+z*.05,0.).b;
      L+=band*alb*.5*smoothstep(.992,1.,textureLod(tN,vec2(a*7.,z*.11),0.).r);
      Lr=L/max(fill+.8*grazing,.05)*(.16+.55*pow(max(Nk.z*.75+abs(Nk.x)*.25,0.),3.));
    } else if(id==2){
      // the cell's top face: turned brass with a chamfer, graduations and clamping screws
      float wid=RO-rI; float u=(rr-rI)/wid; vec2 er=p/rr;
      float tiltr=(smoothstep(.1,0.,u)*-.75+smoothstep(.87,1.,u)*.85);
      float a=at2(p.y,p.x);
      vec3 N=normalize(vec3(er*(tiltr+.012*sin(rr*38.+3.*fbm(p/18.))+.008*sin(rr*91.)),1.));
      float slot=0.;
      for(int i=0;i<3+int(Z0);i++){ float an=.9+float(i)*2.094; vec2 c=vec2(cos(an),sin(an))*(rI+RO)*.5-p; float dc=length(c);
        float rs=1.55;
        if(dc<rs+.25){ float e=smoothstep(rs-.45,rs+.2,dc); N=normalize(vec3(-c/max(dc,.01)*e*.8,1.));
          vec2 ax=vec2(cos(an*2.3+.7),sin(an*2.3+.7)); float sd=abs(dot(c,vec2(-ax.y,ax.x))); slot=max(slot,smoothstep(.28,.2,sd)*step(dc,rs)); } }
      vec3 Rf=reflect(rd,N);
      float aniso=pow(abs(er.y),7.);
      float alb=CELL<.5?.78:(CELL<1.5?.08:.9);
      vec2 sp2=lamp2(h,Rf,vec2(60.,16.),vec2(LB)); float sp=sp2.x;
      float dif=max(dot(N,l),0.)*(CELL<.5?.3:(CELL<1.5?.06:.22));
      float rings=fbm(vec2(rr*.17,.3))*fbm(vec2(rr*.9,.7)); float tarn=fbm(p/13.+5.);
      L=dif*.8+alb*(sp*(.14+.8*aniso)*(.55+1.3*rings*2.)+.03+.2*aniso);
      L*=.62+.75*tarn;
      float edge=max(smoothstep(.1,0.,u),smoothstep(.87,1.,u));
      L+=edge*(CELL<1.5&&CELL>.5?.75*smoothstep(.45,.75,fbm(p/6.+3.)):alb)*sp2.y*(.35+1.1*tarn*tarn);
      // graduations: fine ticks cut in the outer part of the face, every fifth one longer
      float ta=a*36./3.14159; float tk=abs(fract(ta+.5)-.5)*2.; float w=.05+.03*step(.5,fract(floor(ta)/5.));
      float tu=step(fract(floor(ta+.5)/5.),.01), tx=step(fract(floor(ta+.5)/10.),.01); float reach=mix(.62,.46,tu)-.1*tx;
      float tick=smoothstep(w+.05,w,tk)*smoothstep(reach-.01,reach+.01,u)*smoothstep(.87,.85,u);
      L*=1.-.72*tick;
      L*=1.-.92*slot;
      L*=.92+.16*fbm(p/5.);
      L+=smoothstep(.994,1.,textureLod(tN,p/23.,0.).r)*.2;
      Lr=(alb*(.22+.5*aniso)+max(N.z,0.)*.04)*(.62+.75*tarn)*(1.-.72*tick)*(1.-.92*slot);
    } else if(id==3){
      float zz=(h.z-ZF)/(ZC-ZF); L=(.05+.12*zz)*(CELL<1.5&&CELL>.5?.3:1.);
      Lr=.6*L;
    } else {
      // the flat: first-surface reflection of the lamp, its ground edge seen through the glass, dust and sleeks
      // but the flat's own mirror sees the panel at its true size (centre U[8].zw, half sizes U[9].xy in the flat, turned by
      // U[8].xy), so its edge crosses the glass, and a fainter second edge from the lower face lies nearer the camera by the
      // plate's thickness; outside both, the room's dim floor
      vec3 di=refract(rd,vec3(0.,0.,1.),1./1.52);
      mat2 rm=mat2(U[8].x,-U[8].y,U[8].y,U[8].x); vec2 hy=U[9].xy-3.;
      vec2 by=abs(rm*(p-U[8].zw))-hy, b2=abs(rm*(p+di.xy/-di.z*2.*TF-U[8].zw))-hy;
      vec2 sm=smoothstep(.45,-.45,vec2(length(max(by,0.))+min(max(by.x,by.y),0.),length(max(b2,0.))+min(max(b2.x,b2.y),0.))-3.);
      float fres=.24; float lp=.138+(pl.y-.018)*(sm.x+.7*sm.y)/1.7;
      vec2 pB=p+di.xy/-di.z*TF; float rB=length(pB);
      float cres=smoothstep(RF-.2,RF+.25,rB)*smoothstep(RF+.1,RF-.1,rr-.0)*1.;
      float gr=textureLod(tN,p/15.,0.).r;
      float tZ=(RF-rr)/max(rB-rr,.01);
      float glow=(.09+.4*pow(max(p.y/rr*.5+.5,0.),2.))*(.7+.6*gr)*mix(1.,.45,clamp(tZ,0.,1.));
      float felt=(.018+.03*fbm(p/4.))*(.6+.8*gr);
      L=fres*lp*(1.-.15*cres)*(.82+.36*fbm(p/26.+2.))+(1.-cres)*felt+cres*glow;
      // bevel of the flat
      float bev=smoothstep(RF-.75,RF-.45,rr);
      if(bev>0.){ vec3 N=normalize(vec3(p/rr*.7,.7)); L=mix(L,.03+.25*lamp(h,reflect(rd,N),18.),bev); }
      L=mix(L,.01,smoothstep(RF-.05,RF+.15,rr));
      // the lit dust and the odd hairline sleek on the upper face
      // a dozen specks, one at most in each 1.6 mm cell, sharp points of the lamp inside its image and nearly lost outside
      vec2 dc=floor(p/1.6); vec4 dw=textureLod(tN,(dc+.5)/256.,0.); vec2 dq=p-(dc+.2+.6*vec2(dw.g,fract(dw.g*17.31)))*1.6;
      L+=step(.95,dw.r)*exp(-dot(dq,dq)/.011)*(.03+1.1*max(lp-.14,0.))*(.4+.6*fract(dw.r*53.7));
      for(int i=0;i<4+int(Z0);i++){ float an=float(i)*1.7+.4; vec2 dr=vec2(cos(an),sin(an)); vec2 c=p-vec2(sin(float(i)*3.1)*18.,cos(float(i)*2.3)*18.); float along=dot(c,dr); float across=abs(dot(c,vec2(-dr.y,dr.x))+.002*along*along);
        L+=.05*smoothstep(.035,.0,across)*smoothstep(18.,6.,abs(along))*(.3+ptc); }
      for(int i=0;i<NG;i++){ vec4 g=Gr[i]; vec2 pa=p-g.xy,ba=g.zw-g.xy; float hh=clamp(dot(pa,ba)/max(dot(ba,ba),1e-4),0.,1.); float d=length(pa-ba*hh);
        L+=.5*smoothstep(.2,.03,d*(.8+textureLod(tN,p/9.,0.).r*.8)); }
    }
    float dep=dot(h-TGT,FW);
    float coc=COCK*abs(dep)*1.024;
    float dith=(textureLod(tN,gl_FragCoord.xy/256.,0.).r-.5)/255.;
    o=vec4(sqrt(clamp(L/2.,0.,1.))+dith,sqrt(clamp(ptc/2.,0.,1.))+dith,id<4?.5+.5*sqrt(clamp(Lr/2.,0.,1.))+dith:0.,clamp(coc/32.,0.,1.));
  }`,Ro=`#version 300 es
  precision highp float;
  uniform float Z0; uniform sampler2D tS; out vec4 o;
  void main(){
    vec2 px=1./vec2(${Ft}.); vec2 uv=gl_FragCoord.xy*px;
    vec4 c0=textureLod(tS,uv,0.); float coc0=c0.a*32.;
    float dL=c0.r*c0.r, dP=c0.g*c0.g, m=c0.b, w=1.;
    for(int i=0;i<44+int(Z0);i++){
      float fi=float(i)+.5; float rad=sqrt(fi/44.)*20.; float an=fi*2.39996;
      vec4 s=textureLod(tS,uv+vec2(cos(an),sin(an))*rad*px,0.); float coc=s.a*32.;
      float reach=min(coc,coc0+4.+coc*.0);
      reach=max(reach,min(coc,coc0*1.2));
      float wg=smoothstep(rad-1.2,rad+1.2,reach)*exp(-rad*rad/(max(reach*reach,1.)*1.1));
      dL+=min(s.r*s.r,.9)*wg; dP+=s.g*s.g*wg; m+=s.b*wg; w+=wg;
    }
    o=vec4(sqrt(dL/w),sqrt(dP/w),m/w,1.);
  }`,Eo=`#version 300 es
  precision highp float;
  uniform float Z0; uniform vec4 U[6]; uniform sampler2D tN; out vec4 o;
  #define S U[0].x
  #define RL U[0].y
  #define TG U[0].z
  #define TH U[0].w
  #define LC U[1].xyz
  float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<4+int(Z0);i++){ s+=a*textureLod(tN,p,0.).b; p=p*2.03+.37; a*=.5; } return s; }
  float lamp(vec3 rd,float soft){ vec3 n=normalize(LC); float dn=dot(rd,n); float r=.018;
    if(dn>.01){ float t=length(LC)/dn; vec3 h=rd*t-LC; float u=h.x, v=dot(h,normalize(cross(n,vec3(1.,0.,0.)))); vec2 bx=abs(vec2(u,v))-vec2(U[1].w,U[2].x)+7.; float sd=length(max(bx,0.))+min(max(bx.x,bx.y),0.)-7.; r+=smoothstep(soft,-soft,sd); }
    return r; }
  // one point of the sprite: (light, film mask, top-face sheen, cover)
  vec4 spr(vec2 q){
    float r=length(q);
    vec3 d=vec3(0.,sin(TH),-cos(TH)); float tanA=tan(TH);
    float sn=sin(TH)/1.52; float tanI=sn/sqrt(1.-sn*sn);
    float sh=TG*tanI;
    float add=0.,film=0.,top=0.,a=0.;
    float gn=textureLod(tN,q/17.,0.).r, gc=textureLod(tN,q/6.,0.).g;
    vec2 ang=q/max(r,.001);
    if(r<RL){
      a=1.;
      vec2 pF=q+vec2(0.,sh); float rF=length(pF);
      film=smoothstep(RL-.1,RL-.45,rF);
      // far wall seen through the glass: fine-ground, glowing from the lamp behind it
      float b=dot(q,vec2(0.,sh)), c=dot(vec2(0.,sh),vec2(0.,sh)), disc=b*b-c*(r*r-RL*RL);
      float tau=(-b+sqrt(max(disc,0.)))/max(c,1e-4); tau=clamp(tau,0.,1.);
      float lit=(.5+.5*ang.y); lit=lit*lit;
      float gw=(.05+.55*lit*mix(1.,.45,tau))*(.82+.36*gn);
      add+=(1.-film)*gw;
      // the top face: a thin coating, so faint reflection, with wipe marks
      float wipe=fbm(vec2(dot(q,vec2(.8,.6))/60.+.2*fbm(q/40.),dot(q,vec2(-.6,.8))/26.));
      float smear=fbm(q/34.+3.); top=.026+.055*wipe*wipe+.15*pow(smear,4.);
      add+=smoothstep(.992,1.,textureLod(tN,q/29.,0.).g)*.9*(.3+.7*gn);
      for(int i=0;i<5+int(Z0);i++){ float an=float(i)*2.2+.7; vec2 dr=vec2(cos(an),sin(an)); vec2 c=q-vec2(sin(float(i)*4.3)*11.,cos(float(i)*2.9)*11.); float al=dot(c,dr); float ac=abs(dot(c,vec2(-dr.y,dr.x))+.006*al*al);
        add+=(i==0?.32:.06)*smoothstep(i==0?.06:.04,.0,ac)*smoothstep(9.,2.,abs(al)); }
      // bevel: a polished chamfer, picks up the lamp only where it faces it
      float bev=smoothstep(RL-.75,RL-.42,r);
      if(bev>0.){ vec3 N=normalize(vec3(ang*.72,.7)); vec3 R=reflect(d,N); float lp=lamp(R,24.);
        float bv=.012+.5*lp+.05*max(ang.y,0.); add=mix(add,bv,bev); film*=1.-bev; top*=1.-bev; }
    } else {
      // outside the top rim: going down the ray, does it hit the near wall?
      vec2 dd=vec2(0.,tanA);
      float b=dot(q,dd),c=dot(dd,dd),disc=b*b-c*(r*r-RL*RL);
      float u=(-b-sqrt(max(disc,0.)))/max(c,1e-4);
      if(disc>0.&&u>0.&&u<TG){
        float zz=u/TG; vec2 pw=q+dd*u; vec2 nw=pw/RL;
        a=1.;
        // the fine-ground edge: pale matt grey, a little lighter near the top where light through the glass reaches it,
        // with the narrow ground bevel at each rim catching the lamp as a thin bright line
        float ax=abs(nw.x), ay=1.-ax*ax;
        // frosted glass glows where the lamp behind shows through its thickness: a soft upright streak, darker to the sides
        float xs=nw.x-LC.x*.03;
        add=(.13+.07*gn+.06*(gc-.5))*(.5+.75*exp(-xs*xs/.08))*(1.05-.3*zz);
        add+=.5*smoothstep(.075,.015,zz)*ay+.22*smoothstep(.86,.92,zz)*smoothstep(.985,.94,zz)*ay+.22*pow(ax,14.);
        add+=.14*smoothstep(.993,1.,textureLod(tN,q/13.+.5,0.).r);
        add=add*smoothstep(1.,.975,zz)+.012;
      } else {
        // the wall's reflection in the flat below: blocks the lamp's image, which is what seats the lens on the glass
        vec2 pf=q+dd*TG;
        float b2=dot(pf,dd),c2=dot(dd,dd),d2=b2*b2-c2*(dot(pf,pf)-RL*RL);
        float u2=(-b2-sqrt(max(d2,0.)))/max(c2,1e-4);
        if(d2>0.&&u2>0.&&u2<TG){ a=.86*smoothstep(TG,TG-1.2,u2); add=.012*(1.-u2/TG)*(.7+.6*gn); }
      }
    }
    return vec4(add,film,top,a); }
  void main(){
    // texels on the lens's outline (the top disc swept down its wall, a capsule) or on its reflection's sides take four
    // points, so the outline is an edge and not stairs; every other texel takes one
    vec2 q=(gl_FragCoord.xy/${Ot}.*2.-1.)*S; float px=2.*S/${Ot}.;
    float wy=TG*tan(TH), sdc=length(q-vec2(0.,-clamp(-q.y,0.,wy)))-RL;
    int n=(abs(sdc)<2.*px||(q.y<0.&&abs(abs(q.x)-RL)<2.*px))?4:1;
    vec4 acc=vec4(0.);
    for(int i=0;i<n;i++){ vec2 j=n>1?vec2(float(i&1),float(i>>1))*.5-.25:vec2(0.);
      vec4 e=spr(q+j*px); acc+=vec4(e.xyz*e.w,e.w); }
    vec3 m=acc.xyz/max(acc.w,1e-4); float a=acc.w/float(n);
    float dith=(textureLod(tN,gl_FragCoord.xy/256.,0.).r-.5)/255.;
    o=vec4(sqrt(clamp(m.x/1.5,0.,1.))+dith,m.y,sqrt(clamp(m.z*4.,0.,1.)),a);
  }`,Ie=`
  uniform vec4 V;
  vec3 tone(float L,vec2 ndc,float gr){
    L*=1.-.07*dot(ndc,ndc);
    L+=L*(gr-.5)*.012+(gr-.5)*.0016;
    float c=1.-exp(-max(L,0.)*2.05);
    vec3 col;
    if(V.x<.5){
    col=vec3(pow(c,.74),pow(c,1.04)*.70,pow(c,2.1)*.2);
    col+=vec3(.0,.13,.2)*c*c*c*c;
    } else if(V.x<1.5){ col=vec3(pow(c,1.1)*.62,pow(c,.85)*.8,pow(c,1.4)*.38); col+=vec3(.2,.1,.2)*c*c*c*c; }
    else { col=vec3(pow(c,.9),pow(c,.94)*.95,pow(c,1.02)*.86); }
#ifdef HG3
    col=vec3(pow(c,1.)*.84,pow(c,.96)*.92,pow(c,.92)*.97);
#endif
    return col+vec3(.009,.0055,.002); }
#ifdef ROOM
  // the work light: the bake's third channel is .5 and up on the bench and cell (their room light, square-root coded) and 0
  // on the flat. There the lamp is dimmed against the room's light; returns (light, the room's share of it)
  vec2 roomL(float L,float b){ float w=clamp(b*2.,0.,1.), r=max(b-.5,0.)*2.; r=r*r*2.;
    L=L*mix(1.,.24,w)+r; return vec2(L,clamp(r/max(L,1e-4),0.,1.)); }
  // the work light's own ramp: a cool near-neutral grey
  vec3 toneR(float L,vec2 ndc,float gr){
    L*=1.-.07*dot(ndc,ndc);
    L+=L*(gr-.5)*.012+(gr-.5)*.0016;
    float c=1.-exp(-max(L,0.)*2.05);
    return vec3(pow(c,1.03)*.86,pow(c,1.)*.9,pow(c,.96)*.95)+vec3(.006,.007,.009); }
#endif
  vec3 toneW(vec3 L,vec2 ndc,float gr){
    L*=1.-.07*dot(ndc,ndc);
    L+=L*(gr-.5)*.012+(gr-.5)*.0016;
    vec3 c=1.-exp(-max(L,0.)*2.05);
#ifdef HG3
    // the bare tube's light is a cold blue-white
    return vec3(pow(c.r,1.)*.84,pow(c.g,.96)*.92,pow(c.b,.92)*.97)+vec3(.006,.006,.008); }
#else
    return vec3(pow(c.r,.9),pow(c.g,.94)*.95,pow(c.b,1.02)*.86)+vec3(.009,.0055,.002); }
#endif
  `,He=`#version 300 es
  precision highp float;
  uniform vec4 U[12]; uniform sampler2D tB,tN; out vec4 o;
  ${Ie}
  void main(){
    vec2 uv=gl_FragCoord.xy*U[3].x; vec2 ndc=uv*2.-1.;
    vec4 b=texture(tB,uv);
    float L=b.r*b.r*2.;
    float g=texture(tN,gl_FragCoord.xy/256.+U[8].xy).r;
#ifdef ROOM
    vec2 R2=roomL(L,b.b);
    o=vec4(mix(tone(R2.x,ndc,g),toneR(R2.x,ndc,g),R2.y),1.);
#else
    o=vec4(tone(L,ndc,g),1.);
#endif
  }`,Xe=`#version 300 es
  uniform highp vec4 U[${13+2*vt}];
  void main(){
    vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1));
    float S=U[11].x; vec2 q=vec2(mix(-U[11].y-.7,U[11].y+.7,c.x),mix(-S,U[11].y+.7,c.y));
    vec3 w=vec3(U[4].xy+q,U[2].w)-U[0].xyz; float cz=dot(w,U[1].xyz);
    gl_Position=vec4(w.x/cz*U[1].w/U[0].w,dot(w,U[2].xyz)/cz*U[1].w/U[0].w,0.,1.);
  }`,Ze=`#version 300 es
  precision highp float;
  uniform highp vec4 U[${13+2*vt}]; uniform sampler2D tB,tS,tN; out vec4 o;
  ${Ie}
  void main(){
    vec2 uv=gl_FragCoord.xy*U[3].x, ndc=uv*2.-1.;
    vec3 rd=U[1].xyz*U[1].w+vec3(ndc.x*U[0].w,0.,0.)+U[2].xyz*ndc.y*U[0].w;
    float tt=(U[2].w-U[0].z)/rd.z; vec2 pT=U[0].xy+rd.xy*tt;
    vec3 d=normalize(rd); vec2 di=d.xy/1.52; float dz=sqrt(1.-dot(di,di));
    vec2 p=pT+di*U[3].z/dz;
    vec2 L0=U[4].xy, A=U[4].zw;
    // defocus across the frame, in pixels, from depth along the view
    float dep=dot(p-U[6].zw,U[1].xy);
    float coc=U[3].w*abs(dep);
    vec4 s=texture(tS,(pT-L0)/(2.*U[11].x)+.5,log2(1.+coc*.55));
    vec4 b=texture(tB,uv);
    float bgL=b.r*b.r*2., pt=b.g*b.g*2.;
#ifdef ROOM
    vec2 R2=roomL(bgL,b.b); bgL=R2.x;
#endif
    // the air film, in micrometres. Gap in um = r(mm)^2 / (2 R(m)).
    vec2 v=p-A; float r2=dot(v,v), r=sqrt(r2), a=U[5].y, RR=U[5].z;
#ifdef TOPFLAT
    // a flat or a cylinder on top: its tilted plane (gap U[5].x at its centre, tilt U[9].xy) and its one weak curve across
    // U[9].zw, the cylinder's own or the flat's bow
    vec2 qf=p-L0; float qe=dot(qf,U[9].zw);
    float gap=U[5].x+dot(U[9].xy,qf)+qe*qe*U[5].w;
#else
    float gap=r2*U[5].w+max(U[5].x,0.);
    if(a>.001&&r>a){ float ar=a/r; gap+=((2.*a*a-r2)*asin(ar)+r*a*sqrt(1.-ar*ar))/(3.14159265*RR)-a*a/RR; }
    else if(a>.001){ gap=0.; }
    gap-=U[6].x*r2*(2.67+log(961./(r2+.5)));
#endif
    vec2 q=p-L0; float qr2=dot(q,q)/400.;
    vec2 nm=texture(tN,p/71.).ba, nf=texture(tN,q/23.).ba;
    float fig=U[7].x*(q.x*q.x-q.y*q.y)/400.+U[7].y*2.*q.x*q.y/400.+U[7].z*qr2*qr2*qr2*qr2+U[7].w*sin(sqrt(qr2)*U[11].z+nm.x*1.5)*sqrt(qr2);
#ifdef TOPFLAT
    // a flat's polish is finer than a lens's: its bands stay ruled
    fig+=((nm.y-.5)*.032+(nf.x-.5)*.01)*(1.-exp(-r2/30.));
#else
    fig+=((nm.y-.5)*.09+(nf.x-.5)*.022)*(1.-exp(-r2/30.));
#endif
    gap=max(gap+fig-U[12].z-dot(vec2(U[12].w,U[10].w),v),0.);
    float grit=texture(tN,p/9.).g;
    // grains: each lifts the film around itself and shows as a small dark speck. The dent is wider than true glass would give
    // at these loads, so a grain's bull's-eye can be seen at this scale
    float speck=0.,glint=0.,tent=0.;
    int ng=int(U[12].y);
    for(int i=0;i<ng;i++){
      vec4 g0=U[13+2*i], g1=U[14+2*i];
      vec2 pa=p-g0.xy, ba=g0.zw-g0.xy; float hh=clamp(dot(pa,ba)/max(dot(ba,ba),1e-4),0.,1.); vec2 dv=pa-ba*hh; float d2=dot(dv,dv);
      tent+=g1.x/(1.+d2/g1.y);
      float wg=d2*(.55+grit*1.1)/(g1.z*g1.z);
      speck=max(speck,exp(-wg*wg));
      glint=max(glint,g1.w*exp(-dot(dv-vec2(-.05,.07),dv-vec2(-.05,.07))/(g1.z*g1.z*.12)));
    }
    gap+=tent;
    // reflected intensity: Airy sum over the film; phase includes the view's obliquity and the film's index
    float cosT=-d.z;
    float del=U[8].w*gap*cosT;
    float w=length(vec2(dFdx(del),dFdy(del)));
    float wt=w*sqrt(1.+coc*coc*.45);
    float vis=exp(-wt*wt/9.)*exp(-gap*gap*U[8].z);
    float sn=.5*(1.-vis*cos(del));
    float F=U[6].y;
    float I=F*sn/(1.+F*sn);
    I/=max(F/(1.+F),.001);
    float lit=pt;
    float film=lit*(U[11].w+U[6].x*0.+I*U[12].x)*(1.-.92*speck)+glint*.8*lit;
    float top=s.b*s.b/4.; vec4 b2=texture(tB,uv-vec2(0.,.117)); float pt2=b2.g*b2.g*2.;
    float Ll=s.r*s.r*1.5+s.g*film+top*pt2;
    float Lf=mix(bgL,Ll,s.a);
    float gr=texture(tN,gl_FragCoord.xy/256.+U[8].xy).r;
#ifdef ROOM
    // the work light: the glass's ground wall and bevel are grey in it, and its even veil lifts the film's dark bands
    float veil=.2*lit*U[12].x*s.g, wallR=(1.-s.g)*.8*s.r*s.r*1.5;
    Lf+=veil*s.a;
    o=vec4(mix(tone(Lf,ndc,gr),toneR(Lf,ndc,gr),clamp(mix(R2.y*bgL,veil+wallR,s.a)/max(Lf,1e-4),0.,1.)),1.);
#else
    o=vec4(tone(Lf,ndc,gr),1.);
#endif
#ifdef HG3
    {
      // the bare mercury tube, its filter off: three lines at once (578, 546 and 436 nm), each with its own rings, slipping
      // out of step and back, so crisp black-and-white orders alternate with green-and-purple ones; pale line colours
      vec3 dk=del*vec3(.546/.578,1.,.546/.436);
      vec3 wk=w*vec3(.945,1.,1.252)*sqrt(1.+coc*coc*.45);
      vec3 env=exp(-wk*wk/9.)*exp(-gap*gap*U[8].z);
      vec3 snk=.5*(1.-env*cos(dk));
      vec3 Ic=mat3(.246,.197,.079,.194,.538,.226,.5,.265,.735)*(F*snk/(1.+F*snk)/max(F/(1.+F),.001));
      vec3 filmc=lit*(U[11].w+Ic*U[12].x)*(1.-.92*speck)+glint*.8*lit;
      vec3 Lc=mix(vec3(bgL),vec3(s.r*s.r*1.5+top*pt2)+s.g*filmc,s.a);
      o=vec4(toneW(Lc,ndc,gr),1.);
    }
#else
    if(V.x>1.5){
      // white light: three broad bands, each one fringe whose visibility dies with order as its band dephases, so the
      // colours pale order by order and the film shows plain white by about the tenth
      vec3 dk=del*vec3(.589/.605,.589/.545,.589/.462);
      vec3 wk=w*vec3(.97,1.08,1.27)*sqrt(1.+coc*coc*.45);
      vec3 env=exp(-wk*wk/9.-dk*dk*vec3(.0012,.0014,.0016));
      vec3 snk=.5*(1.-env*cos(dk));
      vec3 Ic=F*snk/(1.+F*snk)/max(F/(1.+F),.001);
      vec3 filmc=lit*(U[11].w+Ic*U[12].x)*(1.-.92*speck)+glint*.8*lit;
      vec3 Lc=mix(vec3(bgL),vec3(s.r*s.r*1.5+top*pt2)+s.g*filmc,s.a);
      o=vec4(toneW(Lc,ndc,gr),1.);
    }
#endif
  }`;function We(t,s,x){const r=t.createShader(s);return t.shaderSource(r,x),t.compileShader(r),r}function Et(t,s,x){const r=t.createProgram(),i=We(t,t.VERTEX_SHADER,s),u=We(t,t.FRAGMENT_SHADER,x);return t.attachShader(r,i),t.attachShader(r,u),t.linkProgram(r),r._s=[i,u,s,x],r}function Ke(t,s){t.getProgramParameter(s,t.LINK_STATUS)||console.error("212:",t.getProgramInfoLog(s),t.getShaderInfoLog(s._s[0]),t.getShaderInfoLog(s._s[1]));const x={},r=t.getProgramParameter(s,t.ACTIVE_UNIFORMS);for(let i=0;i<r;i++){const u=t.getActiveUniform(s,i).name.replace("[0]","");x[u]=t.getUniformLocation(s,u)}return s.u=x,s}function Qt(t,s,x,r){const i=t.createTexture();return t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,s,s,0,t.RGBA,t.UNSIGNED_BYTE,x||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,r.mip?t.LINEAR_MIPMAP_LINEAR:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,r.rep?t.REPEAT:t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,r.rep?t.REPEAT:t.CLAMP_TO_EDGE),i}function Mo(t){const s={},x={scene:Et(t,Rt,Ge),blur:Et(t,Rt,Ro),sprite:Et(t,Rt,Eo),bg:Et(t,Rt,He),lens:Et(t,Xe,Ze)};t.flush(),s.P=x,s.vao=t.createVertexArray(),s.fb=t.createFramebuffer();const r=256,i=new Uint8Array(r*r*4),u=new Float32Array(r*r),w=new Float32Array(r*r);let _=49734321;const S=()=>{_=_+1831565813|0;let d=Math.imul(_^_>>>15,1|_);return d=d+Math.imul(d^d>>>7,61|d)^d,((d^d>>>14)>>>0)/4294967296};for(let d=0;d<r*r;d++)i[d*4]=S()*256,i[d*4+1]=S()*256,u[d]=S()-.5,w[d]=S()-.5;const M=(d,P,Mt)=>{const J=new Float32Array(r*r);for(let z=0;z<Mt;z++){for(let N=0;N<r;N++){let ot=0;for(let R=-P;R<=P;R++)ot+=d[N*r+(R&255)];for(let R=0;R<r;R++)J[N*r+R]=ot,ot+=d[N*r+(R+P+1&255)]-d[N*r+(R-P&255)]}for(let N=0;N<r;N++){let ot=0;for(let R=-P;R<=P;R++)ot+=J[(R&255)*r+N];for(let R=0;R<r;R++)d[R*r+N]=ot,ot+=J[(R+P+1&255)*r+N]-J[(R-P&255)*r+N]}}let et=0;for(let z=0;z<r*r;z++)et=Math.max(et,Math.abs(d[z]));for(let z=0;z<r*r;z++)d[z]/=et};M(u,2,3),M(w,4,3);for(let d=0;d<r*r;d++)i[d*4+2]=127.5+127.5*u[d],i[d*4+3]=127.5+127.5*w[d];s.noise=Qt(t,r,i,{rep:!0,mip:!0}),t.generateMipmap(t.TEXTURE_2D);for(const d in x)Ke(t,x[d]);return s.V=new Map,s}const zo={TOPFLAT:["lens"],HG3:["bg","lens"],ROOM:["bg","lens"]},ve={scene:[Rt,Ge],bg:[Rt,He],lens:[Xe,Ze]};function ko(t,s,x){const r=Object.assign({},s.P),i=[];for(const u in ve){const w=x.filter(M=>zo[M].includes(u));if(!w.length)continue;const _=u+":"+w.join();let S=s.V.get(_);S||(S=Et(t,ve[u][0],ve[u][1].replace("#version 300 es",`#version 300 es
`+w.map(M=>"#define "+M).join(`
`))),s.V.set(_,S),i.push(S)),r[u]=S}if(i.length){t.flush();for(const u of i)Ke(t,u)}return r}function Ao(t,s,x){const r=x.P,i=Qt(t,Ft,null,{}),u=Qt(t,Ft,null,{mip:!0}),w=Qt(t,Ot,null,{mip:!0});return t.bindVertexArray(s.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.bindFramebuffer(t.FRAMEBUFFER,s.fb),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,s.noise),t.activeTexture(t.TEXTURE0),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i,0),t.viewport(0,0,Ft,Ft),t.useProgram(r.scene),t.uniform4fv(r.scene.u.U,x.sceneU),t.uniform4fv(r.scene.u.Gr,x.grainU),t.uniform1i(r.scene.u.tN,1),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),t.useProgram(r.blur),t.bindTexture(t.TEXTURE_2D,i),t.uniform1i(r.blur.u.tS,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,w,0),t.viewport(0,0,Ot,Ot),t.useProgram(r.sprite),t.uniform4fv(r.sprite.u.U,x.spriteU),t.uniform1i(r.sprite.u.tN,1),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,null,0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindTexture(t.TEXTURE_2D,u),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,w),t.generateMipmap(t.TEXTURE_2D),t.deleteTexture(i),{bg:u,spr:w}}De.add({num:212,name:"Light Rings",fam:"Worlds",recipe:"A test glass on a flat under a lamp, where the rings are real light interference in the air gap. Some mints have a lens and its rings, some a flat on a thin wedge with straight bands. Hold to press and the rings run to your finger and swell (on a flat the bands open out or turn), or drag to slide the glass and the rings sink as it lifts and pour back as it lands.",interactive:"Hold to press where you touch: the rings run to your finger and swell; on a flat, press the high side and the bands open out, press beside the prop and they turn. Drag to slide the glass: it lifts on its air film and the fringes sink, then pour out as it lands.",music:!0,gl:!0,fps:30,seed:0,make(t){const s=t.gl;let x=Be.get(s);x||(x=Mo(s),Be.set(s,x));let r=-2128633551;for(let e=2;e<t.hash.length;e++)r^=t.hash.charCodeAt(e),r=Math.imul(r,16777619);const i=()=>{r=r+1831565813|0;let e=Math.imul(r^r>>>15,1|r);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},u=e=>{let a=0;for(const n of e)a+=n[1];let c=i()*a;for(const n of e)if(c-=n[1],c<=0)return n[0];return e[0][0]};let w=u([["30 m",5],["14 m",4],["60 m",1.2],["6 m",1]]),_=u([["Clean",2.5],["One Grain",3],["Two Grains",3],["Scatter",2],["Lint Fibre",1],["Grit",.7]]),S=u([["Plate",5],["Thick Flat",3.5],["Thin Slide",1]]),M=u([["True",5],["Oval",2.5],["Turned Edge",1.5],["Hand Zones",.8]]),d=u([["Air",8],["Water",1],["Half Silvered",.8]]),P=u([["Fresh",5],["Tired",2],["Bare U-Tube",1.5]]),Mt=u([["Satin Aluminium",5],["Black Anodised",2.5],["Slate",2]]),J=u([["Brass",6],["Black",2.5],["Nickel",1]]),et=u([["Three Quarter",5],["Steep",2.5],["Low",2]]);d==="Half Silvered"&&(w==="14 m"||w==="6 m")&&(w="30 m"),t.home&&(w="30 m",_="Two Grains",S="Plate",M="True",d="Air",P="Fresh",Mt="Satin Aluminium",J="Brass",et="Three Quarter");let z=-1640741556;for(let e=2;e<t.hash.length;e++)z^=t.hash.charCodeAt(e),z=Math.imul(z,16777619);const N=()=>{z=z+1831565813|0;let e=Math.imul(z^z>>>15,1|z);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},ot=N(),R=N(),Co=N(),Ve=N();let O=0,zt=!1;t.home||(O=ot<.08?2:ot<.24?1:0,zt=R<.3,O===1&&(P="Mercury Green"),O===2&&(P="White Light",J==="Brass"&&(J="Nickel"),(w==="14 m"||w==="6 m")&&(w="60 m"),d==="Half Silvered"&&(d="Air")));let it=-2048330083;for(let e=2;e<t.hash.length;e++)it^=t.hash.charCodeAt(e),it=Math.imul(it,16777619);const Yt=()=>{it=it+1831565813|0;let e=Math.imul(it^it>>>15,1|it);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},$e=t.home?.45:(Yt()<.5?-1:1)*(.3+.3*Yt()),qo=14+4*Yt(),No=12+4*Yt();let ct=668456920;for(let e=2;e<t.hash.length;e++)ct^=t.hash.charCodeAt(e),ct=Math.imul(ct,16777619);const _o=()=>{ct=ct+1831565813|0;let e=Math.imul(ct^ct>>>15,1|ct);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},y=[];for(let e=0;e<16;e++)y.push(_o());const je=d==="Water"?1.333:1;let at="Lens",m=19.5,yt=7,Qe=!1,Jt="Dark";if(!t.home){if(at=y[0]<.66?"Lens":y[0]<.86?"Flat On Flat":"Cylinder",d==="Half Silvered"&&y[14]<.5&&(at="Flat On Flat"),O===2&&at==="Flat On Flat"&&(at="Lens"),O===1&&(at="Lens"),O===0&&P==="Fresh"&&y[2]<.18&&(O=3,P="Unfiltered Mercury"),y[1]<.5&&(O===0||O===1)&&(Jt="Work Light On"),Fo&&globalThis.__f212){const e=globalThis.__f212;e.room&&(Jt=e.room),e.figure&&(M=e.figure)}at==="Lens"?(m=y[3]<.25?12:y[3]<.75||w==="14 m"||w==="6 m"?19.5:27,Qe=y[4]<.4):at==="Flat On Flat"&&(m=27+2*y[3],yt=9),m===12?yt=5:m===27&&(yt=8)}const v=at==="Flat On Flat"?1:at==="Cylinder"?2:0,kt=!t.home&&v!==1&&(w==="6 m"||w==="14 m"&&zt),Ye=!t.home&&!zt&&!kt&&y[7]<.5,Je=v!==1&&M==="Turned Edge"&&(w==="14 m"||w==="6 m"),So=Je||kt&&M==="Hand Zones"?"True":M;kt?et+=", On Contact":zt&&(et+=", Close"),t.trait("Test Piece",v?at:m===12?"Small Lens":m===27?"Wide Lens":"Lens"),t.trait("Lens Curve",v===1?"None":w),t.trait("Dust",_),t.trait("Flat",S),t.trait("Figure",So),t.trait("Film",d),t.trait("Lamp",P),t.trait("Bench And Cell",Mt+", "+J+" Cell"),t.trait("View",et),t.trait("Room",Jt);const b=v===1?600+2400*y[11]:parseFloat(w),Po=S==="Thick Flat"?14:S==="Thin Slide"?3:6,be=S==="Thick Flat"?16650:S==="Thin Slide"?164:1312,te=31,Oo=35.5,st=12,Do=14,tt=460,gt=kt?No:zt?24:Ye?30:38.5,to=Qe?(te-m-.6)*(.55+.45*y[6]):0,Dt=to*Math.cos(y[5]*6.283),Bt=to*Math.sin(y[5]*6.283),ee=(et.startsWith("Steep")?qo:et.startsWith("Low")?55:41)*Math.PI/180,oe=1.5+i()*2-1,ye=2.5,ae=Math.sin(ee),se=Math.cos(ee),W=[0,ae,-se],lt=[0,se,ae],ge=[oe,ye,st];let K=zt?[oe+Dt+(Co<.5?-1:1)*(7+4*Ve),ye+Bt+4+4*Ve,st]:Ye?[oe+.6*Dt,ye+.6*Bt,st]:ge,G=[K[0]-W[0]*tt,K[1]-W[1]*tt,K[2]-W[2]*tt];const eo=-6+i()*6,I=[ge[0]+eo,ae*300+ge[1],se*300+st],Le=st+yt,oo=gt<38?.2*38.5/gt:.2,ao=m+2*yt*Math.tan(ee)+1.5,so=(e,a,c)=>{const n=2*e-1,f=1-2*a,h=W[0]*tt+n*gt,g=W[1]*tt+lt[1]*f*gt,F=W[2]*tt+lt[2]*f*gt,T=(c-G[2])/F;return[G[0]+h*T,G[1]+g*T]},V=[],rt=(e,a,c,n,f)=>V.push({ax:e,ay:a,bx:n===void 0?e:n,by:f===void 0?a:f,d:c,k:1.1+i()*.7,fy:7+i()*14,w:.13+i()*.15+c*.03,s2:.3+.22*c+i()*.2,e:0,f:0,cr:0,gl:i()<.5?.6:.2}),At=(e,a)=>{const c=i()*6.283,n=e+(a-e)*i();return[Math.cos(c)*n,Math.sin(c)*n]};if(t.home)rt(-7.4,5.2,1.6),rt(6.3,9.7,1.1),rt(-12,-13,.5);else if(_==="One Grain"){const e=At(3,10);rt(e[0],e[1],.9+i()*1.4)}else if(_==="Two Grains"){let e=At(4,11);rt(e[0],e[1],.8+i()),e=At(5,15),rt(e[0],e[1],.6+i())}else if(_==="Scatter")for(let e=0;e<6;e++){const a=At(2,20);rt(a[0],a[1],.25+i()*.9)}else if(_==="Grit")for(let e=0;e<12;e++){const a=At(1,24);rt(a[0],a[1],.2+i()*i()*2.6)}else if(_==="Lint Fibre"){let[e,a]=At(3,12),c=i()*6.283;for(let n=0;n<6;n++){const f=2.2+i()*1.6;c+=(i()-.5)*1.1;const h=e+Math.cos(c)*f,g=a+Math.sin(c)*f;rt(e,a,.7+i()*.4,h,g);const F=V[V.length-1];F.w=.05,F.s2=.35,e=h,a=g}}const ft=Math.cos(y[12]*3.1416),dt=Math.sin(y[12]*3.1416);if(v===2&&_==="One Grain"){const e=V[0],a=(y[13]<.5?-1:1)*m*(.62+.2*y[10]);e.ax=e.bx=Dt+ft*a,e.ay=e.by=Bt+dt*a,e.d=.8+.8*y[9],e.fy=1e9}let we=0;if(v===1){V.length>vt-1&&(V.length=vt-1);const e=y[9]*6.283,a=m-2-2*y[10],c=12+28*y[8],n=(O===1||O===3?.546:jt)/(2*je);we=c*n/(2*m)*(m+a)/.91,V.push({ax:Math.cos(e)*a,ay:Math.sin(e)*a,bx:Math.cos(e)*a,by:Math.sin(e)*a,d:we,k:30/Math.pow(.8*we,1.5),fy:1e9,w:.3,s2:.35,e:0,f:0,cr:0,gl:.6,prop:1})}const Gt=V.length,ro=M==="Oval"?(.12+i()*.1)*(19.5*19.5/(2*b))*2.2:0,re=i()*6.283,H=[ro*Math.cos(re),ro*Math.sin(re),M==="Turned Edge"?1.1+i()*1.1:0,M==="Hand Zones"?.22+i()*.12:0];let ne=7+i()*5;if(v===1){const e=.4+.9*y[13],a=m*m/400;M==="Oval"&&(H[0]=e*Math.cos(re)/a,H[1]=e*Math.sin(re)/a),M==="Turned Edge"&&(H[2]=(.5+.6*y[13])/(a*a*a*a)),M==="Hand Zones"&&(H[3]=(.25+.15*y[13])/Math.sqrt(a),ne*=20/m)}else if(m!==19.5||b<30||v===2){if(v===2&&M==="Oval"){const c=-12/b;H[0]=c*(dt*dt-ft*ft),H[1]=-c*2*ft*dt}const e=Math.max(1,m*m/(2*b)/(19.5*19.5/60)),a=19.5/m;H[2]*=Je?0:Math.pow(a,8),H[3]*=kt?0:a*e,ne*=a}const Ct=(e,a)=>{const c=(e*e+a*a)/400;return H[0]*(e*e-a*a)/400+H[1]*2*e*a/400+H[2]*c*c*c*c+H[3]*Math.sin(Math.sqrt(c)*ne)*Math.sqrt(c)},Te=je,Bo=d==="Half Silvered"?14:.4,Go=d==="Water"?.3:d==="Half Silvered"?.7:.8,Io=d==="Half Silvered"?.03:.014,Ho=O===2?0:P==="Tired"?1/(9*9):1/(40*40),ie=Math.min(b,22),Xo=34e-5*ie*ie*.6,Zo=9,ce=48*Math.sqrt(b),no=.17,Wo=16*Math.PI*be*.55/(2*b*6.3),Ue=v===1?30:Math.min(45,Wo),o={z:.05,tx:0,ty:0,Lx:Dt,Ly:Bt,Px:0,Py:0,F:2,Ux:0,Uy:0,h:0,a:0,Ax:0,Ay:0,Ftot:.2};let le=0;const $=v===2?-dt:v===1?-Math.sin(y[9]*6.283):1,j=v===2?ft:v===1?Math.cos(y[9]*6.283):0,Fe=1/(2*b),Ko=48*Math.sqrt(30),Re=(e,a)=>v?(e*$+a*j)*(e*$+a*j)*Fe:(e*e+a*a)*Fe,k=new Float64Array(9),Ee=(e,a,c,n,f,h,g)=>{if(e>=0)return 0;const F=Math.sqrt(-e),T=n*-e*F,A=n*1.5*F;return k[0]+=T,k[1]+=T*a,k[2]+=T*c,k[3]+=A,k[4]+=A*a,k[5]+=A*c,k[6]+=A*a*a+T*f,k[7]+=A*c*c+T*h,k[8]+=A*a*c+T*g,T},io=e=>{const a=o.Lx,c=o.Ly;let n,f,h,g,F,T,A,Lt,mt,pt,xt,nt,ut;const _t=o.Px-a,C=o.Py-c;if(v===0){n=-b*o.tx,f=-b*o.ty,h=o.z-.5*b*(o.tx*o.tx+o.ty*o.ty);const q=Math.max(-h,0),p=Math.sqrt(q),U=ce*1.5*p;g=ce*q*p,F=g-no-o.F,T=g*n-o.F*_t,A=g*f-o.F*C,Lt=U,mt=U*n,pt=U*f,xt=U*n*n+b*g,nt=U*f*f+b*g,ut=U*n*f}else{if(k.fill(0),v===1){const q=Math.hypot(o.tx,o.ty),p=q>1e-7?o.tx/q:1,U=q>1e-7?o.ty/q:0,L=m/Math.max(q,.02);n=-m*p,f=-m*U,h=o.z-m*q+Re(n,f),g=Ee(h,n,f,Ko,L*(1-p*p),L*(1-U*U),-L*p*U)}else{const q=o.tx*$+o.ty*j,p=o.tx*ft+o.ty*dt,U=m-1;let L=-b*q;L>U?L=U:L<-U&&(L=-U);const Y=o.z+q*L+L*L*Fe,B=.8*Math.sqrt(m*m-L*L);g=Ee(Y-p*B,L*$-B*ft,L*j-B*dt,ce,b*$*$,b*j*j,b*$*j)+Ee(Y+p*B,L*$+B*ft,L*j+B*dt,ce,b*$*$,b*j*j,b*$*j),n=L*$,f=L*j,h=Y-Math.abs(p)*B}F=k[0]-no-o.F,T=k[1]-o.F*_t,A=k[2]-o.F*C,Lt=k[3],mt=k[4],pt=k[5],xt=k[6],nt=k[7],ut=k[8]}const Q=Math.max(h,.07),X=Math.sqrt(o.Ux*o.Ux+o.Uy*o.Uy);let Z=0;if(X>1){Z=Math.min(.09*(X/1e3)*ie*Math.sqrt(ie/Q),4);const q=Math.min(6,.5*Math.sqrt(2*b*Q)),p=n+o.Ux/X*q,U=f+o.Uy/X*q;F+=Z,T+=Z*p,A+=Z*U;const L=.5*Z/Q;Lt+=L,mt+=L*p,pt+=L*U,xt+=L*p*p,nt+=L*U*U,ut+=L*p*U}let E=0;for(let q=0;q<Gt;q++){const p=V[q],U=(p.ax+p.bx)*.5,L=(p.ay+p.by)*.5,Y=U-a,B=L-c,na=Y*Y+B*B;if(p.e=0,p.f=0,na>m*m)continue;const ia=o.z+o.tx*Y+o.ty*B+Re(Y,B),ue=p.d-ia;if(ue<=0)continue;const To=Math.sqrt(ue),Ut=p.k*ue*To,Pt=p.k*1.5*To;if(p.e=ue,p.f=Ut,E+=Ut,F+=Ut,T+=Ut*Y,A+=Ut*B,Lt+=Pt,mt+=Pt*Y,pt+=Pt*B,xt+=Pt*Y*Y,nt+=Pt*B*B,ut+=Pt*Y*B,Ut>p.fy&&p.d>.15){const Uo=p.d-e*1.4*(Ut/p.fy-1);Math.floor(p.d*4)!==Math.floor(Uo*4)&&(le=Math.max(le,1)),p.d=Uo}}const D=Xo/Q/e,xe=Zo/e,$t=D+Lt,wt=mt,Tt=pt,Ce=xe+xt,St=ut,qe=xe+nt,wo=Ce*qe-St*St,Ne=Tt*St-wt*qe,_e=wt*St-Tt*Ce,Se=$t*wo+wt*Ne+Tt*_e,aa=(wo*F+Ne*T+_e*A)/Se,sa=(Ne*F+($t*qe-Tt*Tt)*T+(wt*Tt-$t*St)*A)/Se,ra=(_e*F+(wt*Tt-$t*St)*T+($t*Ce-wt*wt)*A)/Se;o.z+=bt(aa,-1.5,1.5),o.tx+=bt(sa,-.2,.2),o.ty+=bt(ra,-.2,.2);const Pe=v===1?1:(m-1)/b,Oe=Math.hypot(o.tx,o.ty);Oe>Pe&&(o.tx*=Pe/Oe,o.ty*=Pe/Oe),o.Ftot=g+E,o.h=h,o.a=v?0:Math.sqrt(b*Math.max(-h,0)),o.Ax=a+n,o.Ay=c+f};o.Px=Dt,o.Py=Bt;for(let e=0;e<400;e++)io(1/40);o.z+=v===1?.3:1.3*Math.min(b,30)/30;for(let e=0;e<Gt;e++)V[e].e=0;kt&&(K=[o.Ax,o.Ay,st],G=[K[0]-W[0]*tt,K[1]-W[1]*tt,K[2]-W[2]*tt]);const fe=e=>{const a=[e[0],e[1],2*st-e[2]],c=(st-G[2])/(a[2]-G[2]);return[G[0]+c*(a[0]-G[0]),G[1]+c*(a[1]-G[1])]},qt=[I[0]-K[0],I[1]-K[1],I[2]-K[2]],Vo=Math.hypot(qt[0],qt[1],qt[2]);for(let e=0;e<3;e++)qt[e]/=Vo;const ht=[0,qt[2],-qt[1]],co=Math.hypot(ht[1],ht[2]);ht[1]/=co,ht[2]/=co;const Me=fe(I),$o=27.5*1.32,de=30*1.32,jo=fe([I[0]+$o,I[1],I[2]]),Qo=fe([I[0],I[1]+ht[1]*de,I[2]+ht[2]*de]),Yo=fe([I[0],I[1]-ht[1]*de,I[2]-ht[2]*de]),lo=new Float32Array(40),fo=new Float32Array(4*vt),ho=new Float32Array(24);lo.set([G[0],G[1],G[2],gt,W[0],W[1],W[2],tt,lt[0],lt[1],lt[2],st,te,Oo,Do,Po,I[0],I[1],I[2],P==="Bare U-Tube"?1:.34,Mt==="Black Anodised"?1:Mt==="Slate"?2:0,J==="Black"?1:J==="Nickel"?2:0,oo,Gt,K[0],K[1],K[2],27.5,30,29+i()*6,41,5.2,Math.cos($e),Math.sin($e),Me[0],Me[1],Math.abs(jo[0]-Me[0]),Math.abs(Qo[1]-Yo[1])/2]);for(let e=0;e<Gt;e++)fo.set([V[e].ax,V[e].ay,V[e].bx,V[e].by],e*4);ho.set([ao,m,yt,ee,eo,ae*300,se*300,27.5,30]);const he=[];v&&he.push("TOPFLAT"),O===3&&he.push("HG3"),Jt!=="Dark"&&he.push("ROOM");const mo={sceneU:lo,grainU:fo,spriteU:ho,P:ko(s,x,he)},po=Ao(s,x,mo),Jo=13+2*vt,l=new Float32Array(Jo*4);l.set([G[0],G[1],G[2],gt,W[0],W[1],W[2],tt,lt[0],lt[1],lt[2],Le,1/t.size,st,yt,oo*t.size/1e3]);const ta=4*Math.PI*Te/(O===1||O===3?.546:jt);let ca=0,ze=0,me=!1,xo=0,uo=0,It=0,Ht=0,ea=0,Xt=0,la=0,Zt=0,Wt=0,vo=!1,pe=null,ke=0,fa=0,bo=0,Ae=i()*50,yo=!1;const oa=[0,2,4,7,9],Kt=e=>Math.sin(e*.23+Ae)*.6+Math.sin(e*.61+Ae*2.1)*.3+Math.sin(e*1.07+Ae*.7)*.1,go=e=>{const a=o,c=1/(2*b)*(1+.007*Kt(e*.6+3));l[16]=a.Lx,l[17]=a.Ly,l[18]=a.Ax,l[19]=a.Ay,l[20]=v?a.z:a.h,l[21]=a.a,l[22]=b,l[23]=c,l[24]=v?0:Math.min(a.Ftot,Ue*1.4)/(16*Math.PI*be),l[25]=Bo,l[26]=K[0],l[27]=K[1],v&&(l[36]=a.tx,l[37]=a.ty,l[38]=$,l[39]=j),l[28]=H[0],l[29]=H[1],l[30]=H[2],l[31]=H[3],l[34]=Ho,l[35]=ta,l[44]=ao,l[45]=m,l[46]=ne,l[47]=Io,l[48]=Go;{const f=a.Ax-a.Lx,h=a.Ay-a.Ly;l[50]=v===1?Math.min(Ct(f,h),0):Ct(f,h),l[51]=v===1?0:(Ct(f+.25,h)-Ct(f-.25,h))*2,l[43]=v===1?0:(Ct(f,h+.25)-Ct(f,h-.25))*2}let n=0;for(let f=0;f<Gt;f++){const h=V[f],g=52+n*8;l[g]=h.ax,l[g+1]=h.ay,l[g+2]=h.bx,l[g+3]=h.by;const F=(h.ax+h.bx)*.5-a.Lx,T=(h.ay+h.by)*.5-a.Ly,A=Math.max(0,1-Math.max(h.d-(a.z+a.tx*F+a.ty*T+(v?Re(F,T):(F*F+T*T)/(2*b))),-2)/-2);l[g+4]=h.prop?.25*bt(A,0,1):h.e+.55*h.d*bt(A,0,1),l[g+5]=h.s2,l[g+6]=h.w,l[g+7]=h.gl,n++}l[49]=n},Lo=e=>{s.bindFramebuffer(s.FRAMEBUFFER,null),s.viewport(0,0,t.size,t.size),s.disable(s.DEPTH_TEST),s.disable(s.SCISSOR_TEST),s.disable(s.CULL_FACE),s.disable(s.BLEND),s.colorMask(!0,!0,!0,!0),s.bindVertexArray(x.vao);const a=0,c=0;l[32]=a,l[33]=c;const n=mo.P,f=O===3?2:O;s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,po.bg),s.activeTexture(s.TEXTURE1),s.bindTexture(s.TEXTURE_2D,x.noise),s.activeTexture(s.TEXTURE2),s.bindTexture(s.TEXTURE_2D,po.spr),s.useProgram(n.bg),s.uniform1i(n.bg.u.tB,0),s.uniform1i(n.bg.u.tN,1),s.uniform4fv(n.bg.u.U,l.subarray(0,48)),s.uniform4f(n.bg.u.V,f,16,0,0),s.drawArrays(s.TRIANGLE_STRIP,0,4),s.useProgram(n.lens),s.uniform1i(n.lens.u.tB,0),s.uniform1i(n.lens.u.tN,1),s.uniform1i(n.lens.u.tS,2),s.uniform4fv(n.lens.u.U,l),s.uniform4f(n.lens.u.V,f,16,0,0),s.drawArrays(s.TRIANGLE_STRIP,0,4)};go(0),Lo(0);const Nt=1/120;let Vt=0;return(e,a)=>{a=bt(a,0,.12);const c=t.input,n=c.taps?c.taps():[],f=!!(c.down&&c.inside);let h=0;if(f){const C=so(c.x,c.y,Le);if(!vo){xo=C[0],uo=C[1],It=C[0]-o.Lx,Ht=C[1]-o.Ly,Zt=o.Lx,Wt=o.Ly,ea=0,ze=0,me=!1;const E=Math.hypot(It,Ht),D=m*.86;o.gOx=E>D?It*D/E:It,o.gOy=E>D?Ht*D/E:Ht}if(ze+=a,Math.hypot(C[0]-xo,C[1]-uo)>1.6&&(me=!0),me){Zt=C[0]-It,Wt=C[1]-Ht;const E=te-m-1,D=Math.hypot(Zt,Wt);D>E&&(Zt*=E/D,Wt*=E/D)}o.Px=o.Lx+o.gOx,o.Py=o.Ly+o.gOy;const X=Math.hypot(o.Ux,o.Uy)/25,Z=1-Math.exp(-ze/1.15);h=(.8+Ue*Z*Z)*Math.exp(-X)}if(n.length){const C=n[n.length-1],Q=so(C.x,C.y,Le);if(!f){const X=Q[0]-o.Lx,Z=Q[1]-o.Ly,E=Math.hypot(X,Z),D=m*.86;o.gOx=E>D?X*D/E:X,o.gOy=E>D?Z*D/E:Z,Xt=9,t.sound.hit("click",.25)}}Xt>.01&&!f&&(o.Px=o.Lx+o.gOx,o.Py=o.Ly+o.gOy),Xt*=Math.exp(-a/.09),vo=f;const g=f||Xt>.4,F=2+.5*Kt(e)*Kt(e*1.3+2),T=1.7*Kt(e*.7+5),A=1.7*Kt(e*.8+9);g||(o.Px+=(o.Lx+T-o.Px)*(1-Math.exp(-a/.5)),o.Py+=(o.Ly+A-o.Py)*(1-Math.exp(-a/.5)));const Lt=h+Xt+F;o.F+=(Lt-o.F)*(1-Math.exp(-a/.07)),Vt+=a;let mt=0;for(;Vt>=Nt&&mt<15;){Vt-=Nt,mt++;const C=1+o.F/7,Q=26/C;if(f&&me){const D=(Zt-o.Lx)*Q,xe=(Wt-o.Ly)*Q;o.Ux+=(D-o.Ux)*.25,o.Uy+=(xe-o.Uy)*.25}else o.Ux*=.86,o.Uy*=.86;const X=Math.hypot(o.Ux,o.Uy);X>160&&(o.Ux*=160/X,o.Uy*=160/X),o.Lx+=o.Ux*Nt,o.Ly+=o.Uy*Nt;const Z=Math.hypot(o.Lx,o.Ly),E=te-m-.6;Z>E&&(o.Lx*=E/Z,o.Ly*=E/Z),g&&(o.Px=o.Lx+o.gOx,o.Py=o.Ly+o.gOy),io(Nt)}Vt>Nt&&(Vt=0);const pt=11,xt=v===1?2*Te*Math.hypot(o.tx,o.ty)*2*m/jt:2*Te*(Math.max(o.h,0)-o.a*o.a/b+o.Ftot*0+pt*pt/(2*b)*(1-2*b*Math.min(o.Ftot,Ue*1.4)/(16*Math.PI*be)*5.1))/jt,nt=Math.floor(xt);if(pe!==null&&nt!==pe&&e-bo>.035){const C=(nt%15+15)%15,Q=62+oa[C%5]+12*(C/5|0),X=Math.abs(xt-pe);t.sound.note(Q,{dur:.22,vel:.1+Math.min(.16,X*.04),wave:"sine",pan:bt((o.Ax-oe)/40,-.7,.7)}),bo=e}pe=nt;const ut=o.a>.2;ut&&!yo&&e>.5&&t.sound.hit("blip",.22,{freq:1500}),yo=ut,le&&(le=0,t.sound.hit("click",.55),t.sound.hit("noise",.12,{cutoff:4500,dur:.05}));const _t=Math.hypot(o.Ux,o.Uy);ke-=a,_t>8&&ke<=0&&(t.sound.hit("noise",Math.min(.22,_t/400),{cutoff:900+_t*18,dur:.14}),ke=.11),go(e),Lo(e)}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
