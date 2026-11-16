// Honey Spoon: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/213.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Dt){Dt&&function(){"use strict";const _t=new WeakMap,$=1/1e3,Ve=1.5,Le=150,T=48,ee=.16,Ut=1100,et=768,st=512,Nt=6,kt=980,It=8.2,qt=2.8,_e=(e,t,n)=>e<t?t:e>n?n:e,tt=`#version 300 es
  out vec2 vUV; void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); vUV=p*.5+.5; gl_Position=vec4(p,0.,1.); }`,Ye="layout(std140) uniform U { mat4 uVP; vec4 uCam; vec4 uRt; vec4 uUp; vec4 uFw; vec4 uLamp; vec4 uSig; vec4 uSpoon; vec4 uLc; vec4 uTone; };",fo=`#version 300 es
  precision highp float; precision highp sampler2D;
  layout(location=0) in vec4 a0; layout(location=1) in vec4 a1; layout(location=2) in vec4 a2; layout(location=3) in vec4 a3; layout(location=4) in float aB;
  ${Ye}
  uniform int uMode; uniform sampler2D uH;
  out vec2 vU; out vec2 vS; out float vR; out float vW; out float vSeed; flat out int vM; flat out float vBub;
  void main(){
    int id=gl_VertexID; float s=float(id/2)/${Nt}.; float side=float(id&1)*2.-1.;
    vM=uMode; vBub=aB>1e8?0.:uTone.y;
    if(a1.w<=0.||a2.w<=0.){ gl_Position=vec4(2.,2.,2.,1.); vU=vec2(0.); vS=vec2(0.); vR=0.; vW=0.; vSeed=0.; return; }
    vec3 p0=a0.w>0.?a0.xyz:2.*a1.xyz-a2.xyz, p1=a1.xyz, p2=a2.xyz, p3=a3.w>0.?a3.xyz:2.*a2.xyz-a1.xyz;
    float s2=s*s,s3=s2*s;
    vec3 P=.5*((2.*p1)+(p2-p0)*s+(2.*p0-5.*p1+4.*p2-p3)*s2+(3.*p1-p0-3.*p2+p3)*s3);
    vec3 D=.5*((p2-p0)+2.*(2.*p0-5.*p1+4.*p2-p3)*s+3.*(3.*p1-p0-3.*p2+p3)*s2);
    float r=mix(a1.w,a2.w,s);
    float age=max(uCam.w-aB,0.), tau=uSig.w, k=exp(-age/tau), k1=exp(-age/(tau*.2));
    float fade=aB>1e8?1.:smoothstep(0.,.25,k);
    float r0=r, hb=0.; if(aB<1e8){ r*=1.+.5*(1.-k1); vec4 hh=textureLod(uH,vec2(P.x,P.z)/(${(T*ee).toFixed(3)})+.5,0.); hb=hh.r*.9; P.y=min(P.y,hh.r+r0*(.2+.55*k1)+.002); }
    vec4 c; float hw; vec2 d;
    if(uMode==2){
      P.y-=hb; vec3 L=normalize(P-uLamp.xyz); float t=P.y/max(-L.y,.05); vec3 g=P+L*t;
      float pen=.015+.035*P.y;
      vec3 L2=normalize(P+D*.01-uLamp.xyz); vec3 Q=P+D*.01; vec3 g2=Q+L2*(Q.y/max(-L2.y,.05));
      vec2 m=vec2((g.x+4.5)/11.,(g.z+6.)/13.5)*2.-1., m2=vec2((g2.x+4.5)/11.,(g2.z+6.)/13.5)*2.-1.;
      vec2 sc=vec2(2./11.,2./13.5);
      d=m2-m; float dl=length(d); d=dl>1e-7?d/dl:vec2(0.,1.); vec2 nn=vec2(-d.y,d.x);
      float w=(r+pen);
      vec2 off=nn*side*w*sc;
      c=vec4(m+off,0.,1.); vU=vec2(side,0.); vS=nn; vR=r*r/(w)*fade; vW=clamp(1.-P.y/.9,0.,1.);
      vSeed=aB; gl_Position=c; return;
    }
    float mf=1.; if(uMode==1) { mf=exp(-P.y*P.y*.45); P.y=-P.y; D.y=-D.y; }
    c=uVP*vec4(P,1.);
    vec4 c2=uVP*vec4(P+D*.01,1.);
    vec2 a=c.xy/c.w, b=c2.xy/c2.w; d=b-a; float dl=length(d); d=dl>1e-7?d/dl:vec2(0.,1.);
    vec2 nn=vec2(-d.y,d.x);
    float px=2./uFw.w, scale=(uRt.w<.08?1./uRt.w:(2./${It.toFixed(2)})*(dot(uCam.xyz-vec3(.85,2.,0.),uFw.xyz)*-1.))/c.w;
    hw=r*scale; float hwmin=max(hw,.8*px), marg=1.2*px;
    vec2 o=nn*side*(hwmin+marg);
    gl_Position=vec4(a+o,c.z/c.w,1.);
    vU=vec2(side*(hwmin+marg)/hwmin, marg/hwmin);
    float ag=aB>1e8?1.:k1; vS=nn; vR=mf*r0*hw/hwmin*fade*(.12+.88*ag); vSeed=aB+s;
    if(uMode==3&&ag<.35) gl_Position=vec4(2.,2.,2.,1.);
    float zz=dot(P-vec3(0.,0.,0.),-uFw.xyz);
    vW=exp(clamp(zz-.0,-1.,1.)*1.6)*fade*(.08+.92*ag);
  }`,lo=`#version 300 es
  precision highp float;
  in vec2 vU; in vec2 vS; in float vR; in float vW; in float vSeed; flat in int vM; flat in float vBub;
  out vec4 o;
  void main(){
    float u=vU.x, au=abs(u); if(au>=1.+vU.y) discard;
    float cov=clamp((1.+vU.y-au)/max(vU.y,.001),0.,1.);
    float uc=min(au,1.); float pr=sqrt(max(1.-uc*uc,0.));
    float T=2.*vR*pr;
    if(vM==0){ float w=vW*cov; vec2 n=vS*sign(u)*uc;
      if(vBub>0.){ float a=vSeed*11.; float ci=floor(a); vec2 pb=vec2((fract(a)-.5)*3.2,u-(fract(ci*.617)-.5)*1.3); float rb=.1+.34*fract(ci*.271); float on=step(1.-vBub,fract(ci*.733)); float d=length(pb)/rb; if(on>0.&&d<1.){ float z=sqrt(1.-d*d); n=mix(n,vec2(-vS.y,vS.x)*pb.x/rb+vS*pb.y/rb,.92); w*=1.8; T*=.7; } }
      o=vec4(n*w,T*cov,w); }
    else if(vM==1){ o=vec4(T*cov,0.,0.,0.); }
    else { float fc=exp(-u*u*9.)*vW; o=vec4(0.,T*cov,fc*vR*26.,0.); }
  }`,vo=`#version 300 es
  precision highp float; precision highp sampler2D;
  in vec2 vUV; out vec4 o; uniform sampler2D uG;
  void main(){
    vec2 f=vUV*${T}.-.5; vec2 i=floor(f); f-=i; ivec2 b=ivec2(i);
    vec4 wx=vec4((1.-f.x)*(1.-f.x)*(1.-f.x),3.*f.x*f.x*f.x-6.*f.x*f.x+4.,-3.*f.x*f.x*f.x+3.*f.x*f.x+3.*f.x+1.,f.x*f.x*f.x)/6.;
    vec4 wz=vec4((1.-f.y)*(1.-f.y)*(1.-f.y),3.*f.y*f.y*f.y-6.*f.y*f.y+4.,-3.*f.y*f.y*f.y+3.*f.y*f.y+3.*f.y+1.,f.y*f.y*f.y)/6.;
    vec4 dx=vec4(-(1.-f.x)*(1.-f.x),3.*f.x*f.x-4.*f.x,-3.*f.x*f.x+2.*f.x+1.,f.x*f.x)*.5;
    vec4 dz=vec4(-(1.-f.y)*(1.-f.y),3.*f.y*f.y-4.*f.y,-3.*f.y*f.y+2.*f.y+1.,f.y*f.y)*.5;
    vec4 ax=vec4(1.-f.x,3.*f.x-2.,-3.*f.x+1.,f.x), az=vec4(1.-f.y,3.*f.y-2.,-3.*f.y+1.,f.y);
    float h=0.,gx=0.,gz=0.,lp=0.;
    for(int j=0;j<4;j++) for(int k=0;k<4;k++){
      float v=texelFetch(uG,clamp(b+ivec2(k-1,j-1),ivec2(0),ivec2(${T-1})),0).r;
      h+=v*wx[k]*wz[j]; gx+=v*dx[k]*wz[j]; gz+=v*wx[k]*dz[j]; lp+=v*(ax[k]*wz[j]+wx[k]*az[j]);
    }
    float gs=1./${ee.toFixed(3)};
    o=vec4(h,gx*gs,gz*gs,lp*gs*gs);
  }`,ho=`#version 300 es
  precision highp float; precision highp sampler2D;
  ${Ye}
  uniform sampler2D uH; out vec2 vXZ;
  void main(){
    int q=gl_VertexID/6, v=gl_VertexID%6; int M=${T*2-1};
    int cx=q%M, cz=q/M;
    int ox=(v==1||v==4||v==5)?1:0, oz=(v==2||v==3||v==5)?1:0;
    vec2 uv=(vec2(float(cx+ox),float(cz+oz))+.5)/float(M+1);
    float h=textureLod(uH,uv,0.).r;
    vec2 xz=(uv-.5)*${(T*ee).toFixed(3)};
    vXZ=xz;
    gl_Position=uVP*vec4(xz.x,h,xz.y,1.);
  }`,uo=`#version 300 es
  precision highp float; precision highp sampler2D;
  ${Ye}
  uniform sampler2D uH; in vec2 vXZ; out vec4 o;
  void main(){
    vec4 h=textureLod(uH,vXZ/${(T*ee).toFixed(3)}+.5,0.);
    float c=smoothstep(.012,.03,h.r); if(c<=0.) discard;
    vec3 N=normalize(vec3(-h.g,1.,-h.b));
    vec2 n=vec2(dot(N,uRt.xyz),dot(N,uUp.xyz));
    float nl=length(n); if(nl>.6) n*=.6/nl;
    float T=min(h.r*2.6,1.1)+.012;
    float w=.24*c;
    o=vec4(n*w,T*c,w);
  }`,po=`#version 300 es
  precision highp float; precision highp sampler2D;
  ${Ye}
  in vec2 vUV; out vec4 o;
  uniform sampler2D uP,uS,uG,uA,uH;
  float sheen(vec3 P,vec3 E){ vec3 V=normalize(E-P), L=normalize(uLamp.xyz-P); vec3 H=normalize(V+L); float a=max(H.y,0.); return uLamp.w*(.9*pow(a,900.)+.22*pow(a,120.)+.05*pow(a,18.)); }
  void main(){
    vec4 g=texture(uG,vUV);
    float T=g.b,w=g.a,cov=0.; vec3 n=vec3(0.,0.,1.);
    if(w>1e-4){ vec2 nn=g.rg/w; float l=length(nn); if(l>.985) nn*=.985/l; n=vec3(nn,sqrt(1.-dot(nn,nn))); cov=clamp(w*3.,0.,1.); }
    float tk=clamp(T/.05,0.,1.);
    vec2 ruv=vUV-n.xy*uLc.w*tk;
    vec3 b=texture(uP,ruv).rgb; b*=b;
    vec2 s=(ruv-uSpoon.xy)/.78+vec2(.2,.08);
    vec2 gp=ruv*2.-1.;
    vec3 rd=normalize(uFw.xyz+uRt.xyz*gp.x*uRt.w+uUp.xyz*gp.y*uUp.w);
    if(rd.y<0.){
      float t=-uCam.y/rd.y; vec3 P=uCam.xyz+rd*t;
      vec2 am=vec2((P.x+4.5)/11.,(P.z+6.)/13.5);
      if(am.x>0.&&am.y>0.&&am.x<1.&&am.y<1.){
        float sn=sheen(P,uCam.xyz)*uTone.z;
        vec4 ax=texture(uA,am);
        vec3 Ld=normalize(P-uLamp.xyz);
        vec2 mu=gl_FragCoord.xy/uFw.w;
        vec2 hs=P.xz/${(T*ee).toFixed(3)}+.5;
        vec4 h0=texture(uH,hs);
        vec4 h1=texture(uH,hs-Ld.xz/-Ld.y*h0.r*.5/${(T*ee).toFixed(3)});
        float lens=clamp(1.-h1.a*.018,.6,1.25);
#ifdef LTABLE
        vec3 L=exp(-uSig.rgb*h0.r*.8); sn*=.25;
#elif defined(HDISH)
        // honey poured into honey: the pile is the same stuff as the ground, only the rope's shadow shows on it
        vec3 L=exp(-uSig.rgb*ax.g*1.3);
#else
        vec3 L=exp(-uSig.rgb*(ax.g*1.3+h1.r*2.2))*lens+vec3(1.,.6,.2)*min(ax.b,.3)*1.7+vec3(1.,.56,.16)*(1.-exp(-h1.r*5.))*.34;
#endif
        vec3 M=exp(-uSig.rgb*(texture(uA,mu).r+texture(uA,mu+vec2(0.,.02*(1.1-uSpoon.w))).r)*.6*uSpoon.w);
        vec3 snc=min(uLc.rgb*sn*.5,b); 
        b=(b-snc)*L+snc*M;
      }
    }
#ifdef FTOP
    // seen from above the spoon is nearest: it is drawn last, unbent, over the honey on the table
    s=(vUV-uSpoon.xy)/.78+vec2(.2,.08);
#endif
    vec4 sp=(s.x>0.&&s.y>0.&&s.x<1.&&s.y<1.)?textureLod(uS,s,uSpoon.z+clamp(length(s-vec2(.2,.08))*2.6-.75,0.,2.2)):vec4(0.);
#ifndef FTOP
    b=b*(1.-sp.a)+sp.rgb*sp.rgb;
#endif
    float Te=T+.2*(1.-exp(-T*12.)); vec3 tr=exp(-uSig.rgb*Te);
    float Fr=.04+.96*pow(1.-n.z,3.5);
    vec3 col=b;
    if(cov>0.){
      vec3 Lc=uLamp.xyz-vec3(0.,1.5,0.); Lc=normalize(Lc); vec2 Lx=vec2(dot(Lc,uRt.xyz),dot(Lc,uUp.xyz));
#ifdef FTOP
      // a strand melted to nothing keeps no rim: the dark edge and the glint go with the honey left
      Fr*=smoothstep(0.,.004,T);
      vec3 hc=mix(col,col*tr*(1.-Fr)*mix(.72,1.,max(smoothstep(.05,.6,n.z),1.-smoothstep(0.,.004,T))),cov);
#else
      vec3 hc=mix(col,col*tr*(1.-Fr)*mix(.72,1.,smoothstep(.05,.6,n.z)),cov);
#endif
      vec3 Vn=-uFw.xyz;
      vec3 Nw=uRt.xyz*n.x+uUp.xyz*n.y+Vn*n.z;
      vec3 R=reflect(uFw.xyz,Nw);
      vec3 env=mix(vec3(.012,.010,.008),vec3(.34,.30,.24)*uTone.w,smoothstep(.1,-.5,R.y))+uLc.rgb*(3.*exp(-(1.-max(dot(R,Lc),0.))*40.)+16.*exp(-(1.-max(dot(R,Lc),0.))*300.));
      hc+=Fr*env*cov;
      float sL=dot(n.xy,normalize(Lx));
      float through=exp(-(sL+.3)*(sL+.3)/.018)*smoothstep(.0,.03,T);
      hc+=uLc.rgb*vec3(1.,.74,.34)*tr*through*.3*cov;
#ifndef HDISH
      hc+=uLc.rgb*exp(-uSig.rgb*Te*.42)*(1.-exp(-T*6.))*.12*cov;
#endif
#ifdef LTABLE
      hc=max(hc,vec3(1.,.95,.86)*exp(-uSig.rgb*.3)*(1.-exp(-T*4.))*(.1+.25*n.z*n.z)*cov);
#elif !defined(HDISH)
      hc=max(hc,uLc.rgb*exp(-uSig.rgb*.22)*(1.-exp(-T*4.))*(.05+.13*n.z*n.z)*cov);
#endif
      col=hc;
    }
#ifdef FTOP
    // except at the lip, where the thread leaves the spoon in front of the sprite's own tongue of honey
    float sa=sp.a*(1.-cov*(1.-smoothstep(.009,.02,length(vUV-uSpoon.xy))));
    col=col*(1.-sa)+sp.rgb*sp.rgb*(sa/max(sp.a,1e-3));
#endif
    col*=uTone.x;
    col=min(col*(1.+col*.12)/(1.+col*.75),vec3(1.)); col=mix(col,col*col*(3.-2.*col),.28);
    o=vec4(sqrt(col),1.);
  }`,At=`
  uniform int uZ;
  float hs(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
  float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hs(i),hs(i+vec2(1,0)),f.x),mix(hs(i+vec2(0,1)),hs(i+vec2(1,1)),f.x),f.y); }
  float fbm(vec2 p){ float a=.5,s=0.; for(int i=0;i<5+uZ;i++){ s+=a*vn(p); p=mat2(1.6,1.2,-1.2,1.6)*p+7.1; a*=.5; } return s; }
  `,mo=`#version 300 es
  precision highp float;
  ${Ye}
  in vec2 vUV; out vec4 o;
  uniform vec4 uBake; uniform vec4 uDish;
  ${At}
  const vec4 FBP[12]=vec4[](vec4(.35,.35,0.,0.),vec4(2.1,2.1,3.,3.),vec4(14.,14.,0.,0.),vec4(1.6,1.6,20.,20.),vec4(.25,.25,13.,13.),
    vec4(.9,.9,9.,9.),vec4(.5,7.,0.,0.),vec4(.6,1.8,0.,0.),vec4(7.,7.,0.,0.),vec4(3.,.5,2.,2.),vec4(38.,.9,0.,0.),vec4(1.2,1.2,6.,6.));
  float crazing(vec2 p){ vec2 i=floor(p),f=fract(p); float d1=9.,d2=9.; for(int y=-1;y<=1+uZ;y++) for(int x=-1;x<=1+uZ;x++){ vec2 c=vec2(float(x),float(y)); vec2 r=c+vec2(hs(i+c),hs(i+c+3.7))-f; float d=dot(r,r); if(d<d1){d2=d1;d1=d;} else if(d<d2) d2=d; } return sqrt(d2)-sqrt(d1); }
  vec3 room(vec3 rd){
    float up=rd.y; vec3 Ld=normalize(uLamp.xyz-vec3(0.,2.,0.));
    float l=max(dot(rd,Ld),0.);
    return vec3(.006,.0055,.005)+uLc.rgb*(.03*pow(l,6.)+.10*pow(l,60.));
  }
  void main(){
    vec2 gp=vUV*2.-1.;
    vec3 rd=normalize(uFw.xyz+uRt.xyz*gp.x*uRt.w+uUp.xyz*gp.y*uUp.w);
    float S=uBake.x;
    float t=rd.y<0.?-uCam.y/rd.y:1e5; vec3 P=uCam.xyz+rd*t;
    vec3 c; float coc=0.;
    float zEdge=uDish.w;
    vec3 Lp=uLamp.xyz;
    if(rd.y<0.&&P.z>zEdge){
      vec3 V=-rd; vec3 L=normalize(Lp-P);
      float d=length(P-Lp); float atten=900./(d*d); vec2 pc=P.xz-vec2(-.4,-1.2); float pool=.07+.93*exp(-dot(pc,pc)/24.);
      vec2 q=P.xz;
      vec3 N=vec3(0.,1.,0.);
      vec3 alb; float gl,rg;
      vec2 dc=q-uDish.xy; float rr=length(dc), R=uDish.z;
      bool inDish=rr<R;
      // every fbm of this pixel in one loop (one inlined fbm): 5 shared lookups, then this surface's own
      int fb0=S<.5?(inDish?5:6):S<1.5?7:10, fbn=S<.5?6:S<1.5?8:S<2.5?5:7;
      float FB[8];
      for(int k=0;k<fbn+uZ;k++){ int e=k<5?k:fb0+k-5; vec4 tp=FBP[e]; FB[k]=fbm(q*tp.xy+tp.zw+((e==6||e==7)?FB[0]:0.)); }
      float big=FB[0], mid=FB[1], fine=FB[2];
      float dust=smoothstep(.72,.8,vn(q*52.))*smoothstep(.35,.75,mid);
      if(S<.5){
        // old enamel dish on a dark table
        if(inDish){
          float cr=crazing(q*3.6+big*1.5), cr2=crazing(q*9.+5.);
          float line=(1.-smoothstep(.0,.05,cr))*.9*smoothstep(.36,.52,big+mid*.3)+(1.-smoothstep(.0,.05,cr2))*.3*smoothstep(.42,.56,mid);
          alb=mix(vec3(.74,.72,.64),vec3(.86,.84,.78),big);
          alb*=1.-.16*smoothstep(.4,.8,FB[5]);
          alb*=mix(vec3(1.),vec3(.42,.30,.18),line);
          float rim=smoothstep(R-.85,R-.7,rr);
          alb=mix(alb,vec3(.035,.05,.085)*(1.+vn(q*30.)*.5),rim);
          float ch=vn(vec2(atan(dc.y,dc.x)*9.,rr*1.2)+11.); float chip=smoothstep(.74,.8,ch+.4*fine)*smoothstep(R-1.2,R-.05,rr);
          alb=mix(alb,vec3(.05,.035,.03)+vec3(.13,.05,.015)*vn(q*40.),chip);
          float curve=smoothstep(R-1.1,R-.1,rr);
          N=normalize(vec3(dc.x/rr*curve*-.38,1.,dc.y/rr*curve*-.38));
          N=normalize(N+vec3(mid-.5,0.,fine-.5)*.012+vec3(vn(q*3.)-.5,0.,vn(q*3.+4.)-.5)*.02);
          gl=1.-chip*.9; rg=1.;
        } else {
          float gr=FB[5];
          alb=mix(vec3(.018,.011,.007),vec3(.05,.03,.017),gr); gl=.18; rg=.3;
        }
      } else if(S<1.5){
        float cl=FB[5], cl2=FB[6];
        alb=vec3(.045,.05,.055)*(1.+1.1*cl+.5*cl2);
        alb+=vec3(.05,.045,.04)*smoothstep(.62,.7,FB[7]);
        N=normalize(vec3((cl2-.5)*.05,1.,(fine-.5)*.05+(cl-.5)*.09));
        gl=.45+cl2*.3; rg=.5;
      } else if(S<2.5){
        alb=vec3(.04,.042,.045); N=normalize(vec3((big-.5)*.012,1.,(mid-.5)*.012)); gl=1.9; rg=.8;
        alb+=vec3(.2)*dust*.3;
      }
#ifdef HDISH
      else if(S>3.5){
        // the enamel dish full of honey, 1 to 8 mm deep: pale gold at the shallow rim, amber to brown toward the middle
        if(inDish){
          float sh=smoothstep(R-3.4,R-.8,rr), dep=mix(.85,.1,sh)*(.86+.28*big);
          vec3 en=mix(vec3(.74,.72,.64),vec3(.86,.84,.78),big);
          alb=max(en*exp(-uSig.rgb*dep*1.6),exp(-uSig.rgb*.35)*.1);
          float rim=smoothstep(R-.85,R-.7,rr);
          alb=mix(alb,vec3(.035,.05,.085)*(1.+vn(q*30.)*.5),rim);
          // the meniscus climbing the rim, slow wrinkles left by the sunk coils
          float men=smoothstep(R-1.15,R-.8,rr)*(1.-rim);
          N=normalize(vec3(dc.x/rr*men*-.3,1.,dc.y/rr*men*-.3)+vec3(mid-.5,0.,FB[1]-FB[0])*.01);
          gl=1.5*(1.-rim)+.4*rim; rg=1.;
        } else { alb=mix(vec3(.018,.011,.007),vec3(.05,.03,.017),FB[5]); gl=.18; rg=.3; }
      }
#endif
#ifdef LTABLE
      else if(S>3.5){ alb=vec3(.02,.018,.016); gl=.3; rg=.5; }
#endif
      else {
        float br=FB[5]; float sp=smoothstep(.45,.7,FB[6]);
        alb=mix(vec3(.26,.27,.27),vec3(.42,.43,.42),br)*(.75+.5*big)*(1.-.22*sp);
        N=normalize(vec3((br-.5)*.06,1.,(mid-.5)*.05));
        gl=.55; rg=.25;
      }
      alb*=1.-.14*smoothstep(.55,.62,FB[3])*(1.-smoothstep(0.,1.,abs(fine-.5)*6.));
      float ndl=max(dot(N,L),0.);
      vec3 H=normalize(V+L); float nh=max(dot(N,H),0.);
      float sp=gl*(.9*pow(nh,mix(40.,900.,rg))+.22*pow(nh,mix(14.,120.,rg))+.05*pow(nh,18.));
      vec3 amb=vec3(.016,.014,.012);
      float grazing=.35+1.1*ndl;
      c=alb*(uLc.rgb*grazing*ndl*atten*(S<.5?4.1:3.3)*pool+amb);
      c=mix(c,c*.75,dust*.4)+dust*.012;
      float fres=.04+.96*pow(1.-max(dot(N,V),0.),5.);
      c+=uLc.rgb*sp*atten*.62;
      vec3 Rf=reflect(rd,N);
      c+=room(Rf)*fres*gl*2.;
      c*=1.-.25*smoothstep(0.,.7,FB[4])*.6;
      coc=abs(P.z)/14.+abs(P.x-.5)/60.;
      if(!inDish&&(S<.5||S>3.5)){ float edge=smoothstep(R+.5,R,rr); c*=1.-.55*edge; }
#ifdef LTABLE
      // opal glass lit from below: an even warm white, brighter toward the middle, a dark frame past its edge
      float box=smoothstep(9.6,9.3,abs(q.x-.3));
      c=mix(c,vec3(1.,.95,.86)*(.8+.2*exp(-dot(q,q)/30.))*(.985+.03*fine),box);
#endif
    } else {
      vec2 sc=gp;
      float gg=exp(-dot(sc-vec2(-.5,.8)*vec2(uBake.y>0.?1.:1.,1.),sc-vec2(-.5,.8))*1.25);
      float pl=fbm(sc*vec2(3.5,5.)+2.);
      float wall=.0035+.026*gg*(.7+.6*pl);
      c=uLc.rgb*wall*vec3(1.,.86,.7);
      coc=1.;
    }
    o=vec4(sqrt(max(c,vec3(0.))),clamp(coc,0.,1.));
  }`,xo=`#version 300 es
  precision highp float;
  in vec2 vUV; out vec4 o; uniform sampler2D uT; uniform float uPx; uniform float uAmt; uniform float uN; uniform int uZ;
  void main(){
    vec4 c0=texture(uT,vUV); float r=c0.a*uAmt;
    vec3 s=c0.rgb*c0.rgb*.5; float wt=.5;
    float ang=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)*6.283;
    for(int i=1;i<33+uZ;i++){
      float f=float(i)/33.; float rd=sqrt(f); float a=float(i)*2.39996+ang;
      vec2 d=vec2(cos(a),sin(a))*rd*r;
      vec4 t=textureLod(uT,vUV+d,0.);
      float m=(t.a>=c0.a-.08)?1.:smoothstep(0.,1.,t.a*uAmt/max(length(d),1e-4));
      float ww=m*(1.05-f*.7);
      s+=min(t.rgb*t.rgb,vec3(1.4))*ww; wt+=ww;
    }
    s/=wt;
    float gr=fract(sin(dot(gl_FragCoord.xy,vec2(7.13,157.1))+uN)*24634.63)-.5;
    float gr2=fract(sin(dot(floor(gl_FragCoord.xy/2.),vec2(3.3,91.7))+uN)*9134.3)-.5;
    s*=1.+(gr*.035+gr2*.03);
    o=vec4(sqrt(s)+gr*.0035,1.);
  }`,yo=`#version 300 es
  precision highp float;
  ${Ye}
  in vec2 vUV; out vec4 o;
  uniform vec4 uKind; uniform vec3 uNoz;
  ${At}
  const vec3 Az=normalize(vec3(.66,.62,-.42));
  const vec3 Ny=normalize(vec3(-.30,.46,.84));
  float smin(float a,float b,float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
  float sdE(vec3 p,vec3 r){ float k0=length(p/r),k1=length(p/(r*r)); return k0*(k0-1.)/max(k1,1e-5); }
  vec2 map(vec3 w){
    vec3 Ax=normalize(cross(Ny,Az)), Ay=normalize(cross(Az,Ax));
    vec3 lip=vec3(0.,.62,0.);
    vec3 pw=w-uNoz-lip;
    vec3 q=vec3(dot(pw,Ax),dot(pw,Ay),dot(pw,Az));
    float wid=1.+.17*(q.z-2.1)/2.;
    vec3 b=q-vec3(0.,.36,2.1); b.x/=wid;
    float o1=sdE(b,vec3(1.42,.74,2.1)), inn=sdE(b,vec3(1.34,.67,2.02));
    float bowl=max(max(o1,q.y-.36),-inn)-.012;
    // handle
    vec3 h=q-vec3(0.,.46,4.2); float st=clamp(h.z/9.,0.,1.);
    float hw=mix(.20,.46,st*st*.9+st*.1), ht=mix(.07,.05,st);
    vec2 dd=abs(vec2(h.x,h.y-st*.7*.0))-vec2(hw,ht);
    float hd=length(max(dd,0.))+min(max(dd.x,dd.y),0.);
    hd=max(hd-.02,max(-h.z-.5,h.z-14.));
    float metal=smin(bowl,hd,.34);
    // honey in the bowl and over the lip
    vec3 hb=q-vec3(0.,.32,1.75); hb.x/=wid;
    float pool=max(sdE(hb,vec3(1.28,.64,1.72)),q.y-.40-.05*exp(-dot(q.xz-vec2(0.,1.4),q.xz-vec2(0.,1.4))*.4));
    vec3 pa=w-uNoz; float tt=clamp(pa.y/.95,0.,1.);
    float tongue=length(pa-vec3(tt*.05,tt*.95,tt*.32))-mix(.064,.36,tt*tt*.85+tt*.15);
    vec3 tl=vec3(.05,.95,.32), te=tl+Az*.95-Ay*.3; vec3 pb=pa-tl, ba=te-tl; float tb=clamp(dot(pb,ba)/dot(ba,ba),0.,1.);
    float ridge=length((pb-ba*tb)*vec3(1.,1.3,1.))-mix(.3,.42,tb);
    float honey=smin(pool,smin(tongue,ridge,.16),.26);
    return honey<metal?vec2(honey,1.):vec2(metal,0.);
  }
  vec3 env(vec3 R){
    vec3 Ld=normalize(uLamp.xyz);
    float l=max(dot(R,Ld),0.);
    vec3 c=vec3(.016,.014,.012)+vec3(.05,.045,.04)*smoothstep(-.1,.8,R.y)*.5;
    c+=uLc.rgb*(9.*pow(l,900.)+.9*pow(l,40.)+.1*pow(l,6.));
    float g=smoothstep(.02,-.22,R.y);
    c=mix(c,(.22+uTone.w)*vec3(.62,.57,.48)*(.35+.65*smoothstep(-.9,-.05,R.y)),g);
    float wx=smoothstep(-.78,-.72,R.x)*smoothstep(-.12,-.18,R.x)*smoothstep(.02,.05,abs(R.x+.45)), wy=smoothstep(.28,.33,R.y)*smoothstep(.82,.76,R.y)*smoothstep(.012,.03,abs(R.y-.55));
    c+=mix(vec3(1.1,1.15,1.25),uLc.rgb,.5)*wx*wy*2.2;
    return c;
  }
  void main(){
    vec2 scr=uSpoon.xy+(vUV-vec2(.2,.08))*.78;
    vec2 gp=scr*2.-1.;
    vec3 rd=normalize(uFw.xyz+uRt.xyz*gp.x*uRt.w+uUp.xyz*gp.y*uUp.w);
    float t=30.; vec3 ro=uCam.xyz; float hit=-1.,m=0.; float md=9.,mt=0.,mm=0.;
    float aa=1.; float fp=${(8.2*.78/768*1.2).toFixed(4)};
    // the march (up to 72 steps) and the 4 normal taps share one map() call site
    int ph=-1; bool miss=false; vec3 p=vec3(0.); float d0=0.; vec3 g=vec3(0.);
    for(int i=0;i<76+uZ;i++){
      vec2 d=map(ph<0?ro+rd*t:p+vec3(ph==1?.004:0.,ph==2?.004:0.,ph==3?.004:0.));
      if(ph<0){
        if(d.x<md){md=d.x;mt=t;mm=d.y;}
        bool done=false;
        if(d.x<.002){hit=t;m=d.y;done=true;} else { t+=d.x*.92; done=t>60.||i>=71; }
        if(done){ if(hit<0.){ if(md>fp){ miss=true; break; } aa=1.-md/fp; hit=mt; m=mm; } p=ro+rd*hit; ph=0; }
      } else { if(ph==0)d0=d.x; else if(ph==1)g.x=d.x; else if(ph==2)g.y=d.x; else g.z=d.x; ph++; if(ph>3)break; }
    }
    if(miss){ o=vec4(0.); return; }
    vec3 n=normalize(g-d0); vec3 V=-rd, R=reflect(rd,n);
    float F=.04+.96*pow(1.-max(dot(n,V),0.),5.);
    vec3 c;
    vec3 Ld=normalize(uLamp.xyz-p);
    if(m<.5){
      vec3 Az2=Az; vec3 q=p-uNoz;
      float along=dot(q,Az2);
      // the metal's fbm lookups in one loop (one inlined fbm): silver haze and scratches, or the wood's grain
      bool silv=uKind.x<1.5; float dq=dot(q,vec3(.6,.1,.8)); float SF[3];
      for(int k=0;k<(silv?2:3)+uZ;k++) SF[k]=fbm(k==0?(silv?q.xy*2.+q.z*2.:q.xy*2.):k==1?(silv?q.xy*50.:vec2(along*1.4,dq*16.)+SF[0]*2.):vec2(along*7.,dq*50.));
      if(silv){
        vec2 sq=vec2(dot(q,vec3(.2,.9,.4)),along);
        float scr1=vn(vec2(sq.x*60.,sq.y*2.)), haze=SF[0];
        float rpt=(SF[1]-.5)*.005+(scr1-.5)*.007;
        vec3 n2=normalize(n+vec3(rpt,-rpt*.7,rpt*.5));
        vec3 R2=reflect(rd,n2);
        float tarn=uKind.x>.5?smoothstep(.34,.72,haze+.18*sin(along*.9)):0.08*smoothstep(.45,.8,haze);
        vec3 tint=mix(vec3(.93,.92,.88),vec3(.40,.31,.22),tarn);
        c=env(R2)*tint*mix(.95,.55,tarn)+env(reflect(rd,normalize(n+vec3(rpt*6.))))*tint*.22*haze;
        c+=vec3(.03,.028,.026)*smoothstep(.3,.8,haze)*.8;
      } else {
        float gr=SF[1], f2=SF[2];
        vec3 alb=mix(vec3(.13,.07,.03),vec3(.42,.27,.13),gr)*(.75+.5*f2);
        float nl=max(dot(n,Ld),0.);
        c=alb*(uLc.rgb*(.5*nl+.08)+env(n)*.8)+env(R)*F*.7;
      }
    } else {
      vec3 pw=p-uNoz-vec3(0.,.62,0.); vec3 Ax=normalize(cross(Ny,Az)), Ay=normalize(cross(Az,Ax));
      vec3 q=vec3(dot(pw,Ax),dot(pw,Ay),dot(pw,Az)); float wid=1.+.17*(q.z-2.1)/2.; vec3 b=q-vec3(0.,.36,2.1); b.x/=wid;
      float dep=clamp(-sdE(b,vec3(1.34,.67,2.02)),0.,.7);
      float tongueZ=smoothstep(.75,-.2,q.z);
      float th=mix(.34+dep*2.4,.8,tongueZ);
      vec3 sg=uSig.rgb*vec3(.4,.56,.6);
      vec3 bk=exp(-sg*th);
      vec3 n3=normalize(n+vec3(vn(q.xz*3.)-.5,0.,vn(q.xz*3.+5.)-.5)*.03);
      vec3 Rf=reflect(rd,n3);
      vec3 under=(uTone.w*vec3(.5,.42,.3)*.34+.34*uLc.rgb)*(.45+.55*smoothstep(1.9,.2,length(q.xz-vec2(.0,.9))))*mix(1.,mix(.5,1.25,smoothstep(.0,1.1,p.y-uNoz.y)),tongueZ);
      under*=1.+.5*smoothstep(.22,.02,dep)*(1.-tongueZ);
      float F2=.03+.97*pow(1.-max(dot(n3,V),0.),4.5);
      c=bk*under*(1.-F2);
      c+=uLc.rgb*vec3(1.,.55,.12)*(1.-bk.g)*.05;
      c+=env(Rf)*F2*mix(1.4,.55,tongueZ);
      c+=uLc.rgb*1.5*pow(max(dot(Rf,normalize(uLamp.xyz-p)),0.),160.)+uLc.rgb*.1*pow(max(dot(Rf,normalize(uLamp.xyz-p)),0.),12.);
      vec2 cc=q.xz*7.; vec2 ci=floor(cc); vec2 cf=fract(cc)-.5+(vec2(hs(ci),hs(ci+3.3))-.5)*.5; float rb=.05+.12*hs(ci+9.); float on=step(1.-uKind.y,hs(ci+1.7))*smoothstep(.5,.08,dep)*(1.-tongueZ); float dl=length(cf)/rb; c=mix(c,c*.6,on*smoothstep(.55,1.,dl)*step(dl,1.))+on*uLc.rgb*.7*smoothstep(.3,.0,length(cf/rb-vec2(-.3,.35)));
    }
    o=vec4(sqrt(c*aa),aa);
  }`;function go(e){const t=e.replace(/^0x/,"");return n=>parseInt(t.substr(n*2%62,2),16)/255}function bo(e,t,n){let o=_t.get(e);o||(o={},_t.set(e,o));const f="P"+t+"|"+n;if(o[f])return o[f];const F=(E,y)=>{const v=e.createShader(E);return e.shaderSource(v,y),e.compileShader(v),v},c=(E,y)=>{const v=e.createProgram(),b=F(e.VERTEX_SHADER,E),X=F(e.FRAGMENT_SHADER,y);return e.attachShader(v,b),e.attachShader(v,X),e.linkProgram(v),e.flush(),v._s=[b,X],v},s=(E,y,v,b)=>o[E+b]||(o[E+b]=c(y,b?v.replace("#version 300 es",`#version 300 es
#define `+b):v)),i={rope:s("rope",fo,lo,""),h:s("h",tt,vo,""),mound:s("mound",ho,uo,""),comp:s("comp",tt,po,n),plate:s("plate",tt,mo,t),blur:s("blur",tt,xo,""),spoon:s("spoon",tt,yo,"")};return o[f]=i,i}function wo(e,t){if(!t.ready){t.ready=!0;for(const n of["rope","h","mound","comp","plate","blur","spoon"]){const o=t[n];if(o.u)continue;e.getProgramParameter(o,e.LINK_STATUS)||console.error(n,e.getProgramInfoLog(o),e.getShaderInfoLog(o._s[0]),e.getShaderInfoLog(o._s[1]));const f={},F=e.getProgramParameter(o,e.ACTIVE_UNIFORMS);for(let s=0;s<F;s++){const i=e.getActiveUniform(o,s);f[i.name]=e.getUniformLocation(o,i.name)}o.u=f;const c=e.getUniformBlockIndex(o,"U");c!==e.INVALID_INDEX&&c!==4294967295&&e.uniformBlockBinding(o,c,0)}}}const ft=.2,zo=.1,Ro=.3,Fo=1.5,Eo=2,Lo=8e3,Vt=2,To=.002,Mo=4;function Ct(e,t,n){const o=t/ee+T/2-.5,f=n/ee+T/2-.5,F=Math.floor(o),c=Math.floor(f);if(F<0||c<0||F>=T-1||c>=T-1)return 0;const s=o-F,i=f-c,E=F+c*T;return(e[E]*(1-s)+e[E+1]*s)*(1-i)+(e[E+T]*(1-s)+e[E+T+1]*s)*i}function ot(e,t,n,o){const f=t/ee+T/2-.5,F=n/ee+T/2-.5,c=Math.floor(f),s=Math.floor(F);if(!(c>=1&&s>=1&&c<T-2&&s<T-2))return;const i=f-c,E=F-s,y=c+s*T,v=o/(ee*ee);e[y]+=v*(1-i)*(1-E),e[y+1]+=v*i*(1-E),e[y+T]+=v*(1-i)*E,e[y+T+1]+=v*i*E}function ut(e,t,n){const o=e.hf,f=e.hg,F=e.flowK*kt/(3*e.nu)/(ee*ee)*t;f.set(o);let c=0;for(let s=1;s<T-1;s++){const i=s*T;for(let E=1;E<T-1;E++){const y=E+i,v=o[y],b=o[y+1],X=o[y+T];if(v===0&&b===0&&X===0)continue;v>c&&(c=v);const C=(b+v)*.5,S=(X+v)*.5,ve=Math.min(.2,F*(C*C*C+.004))*(b-v),te=Math.min(.2,F*(S*S*S+.004))*(X-v);f[y]+=ve+te,f[y+1]-=ve,f[y+T]-=te}}for(let s=0;s<o.length;s++){const i=f[s]*n;o[s]=i<1e-4?0:i}e.hTop=c}function dt(e,t,n,o){const f=e.x,F=e.v,c=e.V,s=e.st,i=e.l,E=e.rr;let y=e.n;const v=e.s;y>=Le-2&&(f.copyWithin(0,v*3,y*3),F.copyWithin(0,v*3,y*3),c.copyWithin(0,v,y),s.copyWithin(0,v,y),i.copyWithin(0,v,y),E.copyWithin(0,v,y),y-=v,e.s=0);const b=y*3;f[b]=t,f[b+1]=n,f[b+2]=o,F[b]=e.nv[0],F[b+1]=e.nv[1]-e.Q/(Math.PI*e.a0*e.a0),F[b+2]=e.nv[2],c[y]=Math.PI*e.a0*e.a0*ft,s[y]=0,e.n=y+1}function pt(e){e.A&&Ht(e.A)}function mt(e){e.s=0,e.n=0,pt(e),dt(e,e.noz[0],e.noz[1]-ft,e.noz[2]),dt(e,e.noz[0],e.noz[1],e.noz[2])}function Po(e){const t=e.x,n=e.V;for(let o=e.s;o<e.n-1;o++)ot(e.hf,t[o*3],t[o*3+2],n[o]);e.s=0,e.n=0,pt(e)}const Bo=[0,.3,.68,.94],Do=[.15,.095,.072,.072];function _o(e,t){const n=e.x,o=e.v,f=e.st,F=e.rr,c=e.V,s=e.l,i=e.noz[1]-t,E=Bo,y=Do;for(let v=0;v<4;v++){const b=v*3;n[b]=e.noz[0],n[b+1]=t+i*E[v],n[b+2]=e.noz[2],o[b]=o[b+1]=o[b+2]=0,f[v]=1,F[v]=y[v],c[v]=0,s[v]=i*.3}e.s=0,e.n=4}function Uo(e,t){const n=()=>new Float64Array(Le),o={x:new Float64Array(Le*3),v:new Float64Array(Le*3),V:n(),im:n(),st:new Uint8Array(Le),l:n(),t:new Float64Array(Le*3),ca:n(),cd:n(),Tn:n(),rr:n(),pa:n(),pb:n(),pc:n(),L1:n(),L2:n(),Dg:n(),yy:n(),fv:new Float64Array(Le*3),hf:new Float32Array(T*T),hg:new Float32Array(T*T),s:0,n:0,nu:e.nu,Q:e.Q,a0:e.a0,noz:new Float64Array([0,e.H,0]),nv:new Float64Array(3),time:-0,hTop:-0,flat:e.flat,flowK:e.flowK,RMAX:2.2*e.a0,direct:!1,dg:e.dg||.6,resets:0,A:t};return mt(o),o}function Ot(e,t){const n=e.x,o=e.v,f=e.V,F=e.im,c=e.st,s=e.l,i=e.t,E=e.ca,y=e.cd,v=e.Tn,b=e.rr,X=e.pa,C=e.pb,S=e.pc,ve=e.L1,te=e.L2,Ue=e.Dg,w=e.yy,q=e.fv,me=e.hf,xe=e.RMAX;e.time+=t;{const a=Ct(me,e.noz[0],e.noz[2]);e.noz[1]<a+.3&&(e.noz[1]=a+.3);const r=e.noz[1]-a;if(!e.direct&&r<e.dg?(Po(e),e.direct=!0):e.direct&&r>e.dg+.25&&(e.direct=!1,mt(e)),e.direct){const p=e.Q*t/6.169;for(let l=-2;l<=2;l++)for(let d=-2;d<=2;d++){const x=Math.exp(-(l*l+d*d)*.5);ot(me,e.noz[0]+l*.26,e.noz[2]+d*.26,p*x)}_o(e,a);return}}let z=e.s,D=e.n;const Y=e.noz,ie=e.nv,je=e.Q/(Math.PI*e.a0*e.a0);let se=(D-1)*3;if(n[se]+=ie[0]*t,n[se+1]+=(ie[1]-je)*t,n[se+2]+=ie[2]*t,o[se]=ie[0],o[se+1]=ie[1]-je,o[se+2]=ie[2],Y[1]-n[se+1]>=ft){const a=Y[1]-n[se+1]-ft;dt(e,Y[0],Y[1]-a,Y[2]),z=e.s,D=e.n,se=(D-1)*3}const Fe=e.nu,Q=D-1;for(let a=z;a<Q;a++){const r=a>z?f[a-1]:f[a];F[a]=c[a]?0:2/(r+f[a]);const p=a*3;let l=n[p+3]-n[p],d=n[p+4]-n[p+1],x=n[p+5]-n[p+2],m=Math.sqrt(l*l+d*d+x*x);m<1e-4&&(m=1e-4,d=m,l=x=0),s[a]=m,i[p]=l/m,i[p+1]=d/m,i[p+2]=x/m,b[a]=Math.min(Math.sqrt(f[a]/(Math.PI*m)),xe,Math.max(2*m,.11)),c[a]||(o[p+1]-=kt*t)}F[Q]=0;for(let a=z;a<D;a++){const r=F[a];X[a]=r>0?1/r:1e12,C[a]=0,S[a]=0;const p=a*3;q[p]=q[p+1]=q[p+2]=0}const Ne=3*Fe*Math.PI*.25*t;for(let a=z+1;a<Q;a++){const r=(a-1)*3,p=a*3,l=p+3,d=s[a-1],x=s[a],m=1/d,R=1/x,U=i[r],G=i[r+1],O=i[r+2],k=i[p],oe=i[p+1],ae=i[p+2],fe=(o[p]-o[r])*m,ke=(o[p+1]-o[r+1])*m,ye=(o[p+2]-o[r+2])*m,Me=(o[l]-o[p])*R,ge=(o[l+1]-o[p+1])*R,he=(o[l+2]-o[p+2])*R,ne=oe*he-ae*ge-(G*ye-O*ke),Pe=ae*Me-k*he-(O*fe-U*ye),Oe=k*ge-oe*Me-(U*ke-G*fe),Te=(b[a-1]+b[a])*.5,re=Te*Te,j=Ne*re*re*2/(d+x),be=-j*ne,Ie=-j*Pe,ue=-j*Oe,He=(Ie*ae-ue*oe)*R,Se=(ue*k-be*ae)*R,J=(be*oe-Ie*k)*R,qe=-(Ie*O-ue*G)*m,Ge=-(ue*U-be*O)*m,Ke=-(be*G-Ie*U)*m;q[l]+=He,q[l+1]+=Se,q[l+2]+=J,q[p]+=qe-He,q[p+1]+=Ge-Se,q[p+2]+=Ke-J,q[r]-=qe,q[r+1]-=Ge,q[r+2]-=Ke;const I=m+R,N=Eo*2*(1-(U*k+G*oe+O*ae)),K=j*N*m*m,Ze=j*N*R*R;X[a-1]+=j*m*m+K,X[a]+=j*I*I+K+Ze,X[a+1]+=j*R*R+Ze,C[a-1]-=j*m*I+K,C[a]-=j*R*I+Ze,S[a-1]+=j*m*R}{let a=1,r=1,p=0,l=0,d=0;for(let x=z;x<D;x++){const m=X[x]-p*p*a-d*d*r,U=(C[x]-l*p*a)/m,G=S[x]/m;Ue[x]=m,ve[x]=U,te[x]=G,r=a,a=m,d=l,l=G,p=U}}for(let a=0;a<3;a++){let r=0,p=0,l=0,d=0;for(let R=z;R<D;R++){const U=q[R*3+a]-l*r-d*p;w[R]=U,p=r,r=U,d=R>z?te[R-1]:0,l=ve[R]}let x=0,m=0;for(let R=Q;R>=z;R--){const U=w[R]/Ue[R]-ve[R]*x-te[R]*m;m=x,x=U,R<Q&&!c[R]&&(o[R*3+a]+=U)}}{let a=0,r=0;for(let l=z;l<Q;l++){const d=l*3,x=F[l],m=F[l+1],R=1/s[l],U=3*Fe*f[l]*R*R,G=i[d]*(o[d+3]-o[d])+i[d+1]*(o[d+4]-o[d+1])+i[d+2]*(o[d+5]-o[d+2]),O=1/U+t*(x+m),k=l>z?-t*x*(i[d]*i[d-3]+i[d+1]*i[d-2]+i[d+2]*i[d-1]):0,oe=l<D-2?-t*m*(i[d]*i[d+3]+i[d+1]*i[d+4]+i[d+2]*i[d+5]):0,ae=1/(O-k*a);a=oe*ae,r=(G-k*r)*ae,E[l]=a,y[l]=r}v[D-2]=y[D-2];for(let l=D-3;l>=z;l--)v[l]=y[l]-E[l]*v[l+1];const p=Lo*t;for(let l=z;l<Q;l++){const d=F[l]*t;if(d===0)continue;const x=l*3,m=v[l];if(l>z){const R=v[l-1],U=i[x]+i[x-3],G=i[x+1]+i[x-2],O=i[x+2]+i[x-1],k=1/Math.sqrt(U*U+G*G+O*O+1e-9),oe=U*k,ae=G*k,fe=O*k,ke=d*(m*i[x]-R*i[x-3]),ye=d*(m*i[x+1]-R*i[x-2]),Me=d*(m*i[x+2]-R*i[x-1]),ge=ke*oe+ye*ae+Me*fe;let he=ke-ge*oe,ne=ye-ge*ae,Pe=Me-ge*fe;const Oe=he*he+ne*ne+Pe*Pe;if(Oe>p*p){const Te=p/Math.sqrt(Oe);he*=Te,ne*=Te,Pe*=Te}o[x]+=ge*oe+he,o[x+1]+=ge*ae+ne,o[x+2]+=ge*fe+Pe}else o[x]+=d*m*i[x],o[x+1]+=d*m*i[x+1],o[x+2]+=d*m*i[x+2]}}if(e.flat)for(let a=z;a<Q;a++)o[a*3+2]*=.86;const Ce=e.hTop+.5;for(let a=z;a<Q;a++){if(c[a])continue;const r=a*3;if(n[r]+=o[r]*t,n[r+1]+=o[r+1]*t,n[r+2]+=o[r+2]*t,n[r+1]>Y[1]&&(n[r+1]=Y[1],o[r+1]>0&&(o[r+1]=0)),n[r+1]<Ce){const p=Math.min(b[a]||.05,.08),l=Math.min(Ct(me,n[r],n[r+2])+p,Y[1]-.05),d=(l+Vt*p-n[r+1])/(Vt*p);if(d>0){const x=o[r]*o[r]+o[r+1]*o[r+1]+o[r+2]*o[r+2],m=d>1?1:d,R=1/(1+t*m*m/To);o[r]*=R,o[r+1]*=R,o[r+2]*=R,n[r+1]<l&&(n[r+1]=l,o[r+1]<0&&(o[r+1]=0)),(a===z||c[a-1])&&(x<Mo||n[r+1]<=l)&&(o[r]=o[r+1]=o[r+2]=0,c[a]=1)}}}if(D<Le-2){for(let a=D-3;a>=z;a--)if(s[a]>(n[a*3+1]<Fo+e.hTop?zo:Ro)){n.copyWithin((a+2)*3,(a+1)*3,D*3),o.copyWithin((a+2)*3,(a+1)*3,D*3),f.copyWithin(a+2,a+1,D),c.copyWithin(a+2,a+1,D),s.copyWithin(a+2,a+1,D),b.copyWithin(a+2,a+1,D);const r=a*3,p=r+3,l=r+6;n[p]=(n[r]+n[l])*.5,n[p+1]=(n[r+1]+n[l+1])*.5,n[p+2]=(n[r+2]+n[l+2])*.5,o[p]=(o[r]+o[l])*.5,o[p+1]=(o[r+1]+o[l+1])*.5,o[p+2]=(o[r+2]+o[l+2])*.5,f[a]*=.5,f[a+1]=f[a],c[a+1]=0,s[a+1]=s[a]*=.5,D++,e.n=D;break}}for(let a=z+1;a<D-3;a++)if(!c[a+1]&&s[a]+s[a+1]<.06){const r=a+1;f[a]+=f[r],n.copyWithin(r*3,(r+1)*3,D*3),o.copyWithin(r*3,(r+1)*3,D*3),f.copyWithin(r,r+1,D),c.copyWithin(r,r+1,D),s.copyWithin(r,r+1,D),b.copyWithin(r,r+1,D),s[a]+=s[r],D--,e.n=D;break}for(;D-z>8&&c[z]&&c[z+1];)Gt(e.A,e,z),z++;D-z>Le-12&&(c[z]?Gt(e.A,e,z):(ot(me,n[z*3],n[z*3+2],f[z]),pt(e)),z++),e.s=z;{const a=Y[1]+.3;for(let r=z;r<D;r++){const p=r*3,l=n[p],d=n[p+1],x=n[p+2],m=l-Y[0],R=x-Y[2],U=Math.min(Y[1]-(d>0?d:0)+1,2.5);let G=!(l===l&&d===d&&x===x)||d>a||m*m+R*R>U*U;if(!G&&r<D-1){const O=n[p+3]-l,k=n[p+4]-d,oe=n[p+5]-x;G=O*O+k*k+oe*oe>1}if(G){e.resets++;for(let O=z;O<D-1;O++){const k=O*3;n[k]===n[k]&&n[k+2]===n[k+2]&&ot(me,n[k],n[k+2],f[O])}mt(e);break}}}}function pe(e,t,n,o,f,F){const c=e.laid,s=e.w,i=s*5;c[i]=t,c[i+1]=n,c[i+2]=o,c[i+3]=f,c[i+4]=F;const E=e.cap;if(s<3){const v=(E+s)*5;c[v]=t,c[v+1]=n,c[v+2]=o,c[v+3]=f,c[v+4]=F}e.w=(s+1)%E;const y=(e.w+1)%E;c[y*5+3]=0,y<3&&(c[(E+y)*5+3]=0),e.dirtyA++}function Ht(e){e.layN=0,e.lpOn&&(e.fig&&St(e),pe(e,0,0,0,0,e.now),e.lpOn=!1)}function xt(e,t,n,o,f,F){const c=e.laid,s=t*5;c[s]=n,c[s+1]=o,c[s+2]=f,c[s+3]=F,c[s+4]=e.now,t<3&&c.copyWithin((e.cap+t)*5,s,s+5)}function St(e){if(e.fn<2)return;const t=e.fx-e.gx,n=e.fz-e.gz,o=Math.hypot(t,n)||1,f=e.fr,F=(e.w+e.cap-1)%e.cap;xt(e,F,e.fx-t/o*.7*f,e.fy,e.fz-n/o*.7*f,f);for(const[c,s]of[[0,1],[.55,.84],[.9,.45]])pe(e,e.fx+t/o*c*f,e.fy,e.fz+n/o*c*f,s*f,e.now)}function yt(e,t,n,o,f){if(e.lpOn&&(t-e.fx)*(t-e.fx)+(o-e.fz)*(o-e.fz)>.16&&Ht(e),!e.lpOn){pe(e,t,n,o,f,e.now),e.fx=t,e.fy=n,e.fz=o,e.fr=f,e.fn=1,e.lpOn=!0;return}const F=e.fx-e.gx,c=e.fz-e.gz,s=t-e.fx,i=o-e.fz,E=Math.hypot(F,c),y=Math.hypot(s,i),v=(e.w+e.cap-1)%e.cap,b=e.fr;if(y<2*b)return;let X=e.fn===1;if(!X&&E>1e-5){const C=F/E,S=c/E,ve=s/y,te=i/y,Ue=C*ve+S*te;if(Ue<.766){if(y<3*b)return;const w=Math.acos(Math.max(Ue,-1)),q=C*te-S*ve>0?1:-1,me=Math.tan(w*.5),xe=Math.min(3*b,.8*Math.min(E,y)/me);if(xe<1.6*b)St(e),pe(e,0,0,0,0,e.now),pe(e,e.fx,e.fy,e.fz,b,e.now),X=!0;else{const z=e.fx-C*xe*me,D=e.fz-S*xe*me,Y=z+(q>0?-S:S)*xe,ie=D+(q>0?C:-C)*xe,je=Math.atan2(q>0?-C:C,q>0?S:-S),se=Math.max(2,Math.ceil(w/.6)+1);for(let Fe=0;Fe<se;Fe++){const Q=je+q*w*Fe/(se-1),Ne=Y+xe*Math.cos(Q),Ce=ie+xe*Math.sin(Q);Fe===0?xt(e,v,Ne,e.fy,Ce,b):pe(e,Ne,e.fy,Ce,b,e.now)}}}}if(X){const C=-s/y,S=-i/y,ve=(e.w+e.cap-1)%e.cap;xt(e,ve,e.fx+C*.9*b,e.fy,e.fz+S*.9*b,.45*b),pe(e,e.fx+C*.55*b,e.fy,e.fz+S*.55*b,.84*b,e.now),pe(e,e.fx,e.fy,e.fz,b,e.now),pe(e,e.fx-C*.7*b,e.fy,e.fz-S*.7*b,b,e.now),e.fn=1}pe(e,t,n,o,f,e.now),e.gx=e.fx,e.gz=e.fz,e.fx=t,e.fy=n,e.fz=o,e.fr=f,e.fn++}function Gt(e,t,n){const o=n*3,f=t.x[o],F=t.x[o+1],c=t.x[o+2],s=t.rr[n]||.05;if(ot(t.hf,f,c,t.V[n]),e.layN++,e.layN&1){e.lx=f,e.ly=F,e.lz=c,e.lr=s;return}if(e.fig)(f-e.lx)*(f-e.lx)+(c-e.lz)*(c-e.lz)>9*s*s?(yt(e,e.lx,e.ly,e.lz,Math.max(e.lr*.84,.012)),yt(e,f,F,c,Math.max(s*.84,.012))):yt(e,(e.lx+f)*.5,(e.ly+F)*.5,(e.lz+c)*.5,Math.max((e.lr+s)*.42,.012));else{const i=(e.lx+f)*.5,E=(e.lz+c)*.5;e.lpOn&&(i-e.lpx)*(i-e.lpx)+(E-e.lpz)*(E-e.lpz)>.16&&pe(e,0,0,0,0,e.now),pe(e,i,(e.ly+F)*.5,E,Math.max((e.lr+s)*.42,.012),e.now),e.lpx=i,e.lpz=E,e.lpOn=!0}if(e.have){const i=f-e.ppx,E=c-e.ppz,y=Math.atan2(E,i);if(e.lastAng!==null){let v=y-e.lastAng;if(v>Math.PI&&(v-=2*Math.PI),v<-Math.PI&&(v+=2*Math.PI),e.turnA+=v,e.sound&&Math.abs(e.turnA)>6.283){const b=Math.max(.1,e.now-e.lastRev);e.lastRev=e.now,e.coilHz=1/b;const X=_e(47+11*Math.log2(e.coilHz+.3),40,72)|0;e.snd.note(X,{dur:.5,vel:.09+.05*e.rnd(),wave:"sine",cutoff:900}),e.turnA=0}}e.lastAng=y}e.ppx=f,e.ppz=c,e.have=1}function Wt(e){return .025*(.24+.76*Math.exp(-e.time/.6))}function No(e,t,n,o,f,F){t.now=-3200*$*Ve,ut(e,.5,1);for(let s=0;s<3200;s++){const i=Wt(e),E=e.time*12*n+o;let y=0,v=0;f&&(f.step(e.time,$),y=f.x,v=f.z,e.nv[0]=f.vx,e.nv[2]=f.vz),e.noz[0]=y+i*Math.cos(E)+.012*(Math.sin(e.time*3.1+1)+.6*Math.sin(e.time*7.7)),e.noz[2]=v+i*Math.sin(E)+.012*(Math.sin(e.time*2.3)+.6*Math.sin(e.time*5.9+2)),Ot(e,$),t.now+=$*Ve,(s&15)===15&&ut(e,16*$,1-16*$*Ve/F)}}Dt.add({num:213,name:"Honey Spoon",fam:"Worlds",recipe:"Honey falling off a spoon as a real thick thread that thins as it drops and coils by itself on the pile, with the height setting how. The honey, how warm it is and what it lands on change every mint. Some mints draw with it, in loops, a drizzle or coils. Drag up and down to raise or lower the spoon, or sideways to lay the rope across the dish.",interactive:"Drag up and down to raise or lower the spoon, sideways to lay the rope across the dish",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,n=e.size,o=go(e.hash);let f=0;const F=()=>{const u=o(f),h=o(f+7);return f++,(u*251+h)%1},c=u=>{let h=0;for(const B of u)h+=B[1];let g=F()*h;for(const B of u)if(g-=B[1],g<=0)return B[0];return u[0][0]},s=c([["Wildflower",5],["Acacia",3],["Chestnut",2],["Honeydew",1]]),i=c([["Room warm",5],["Warmed",3],["Cold",2]]),E=c([["Fine",4],["Steady",5],["Flat from the edge",1]]),y=c([["Old silver",5],["Tarnished silver",3],["Olive wood",2]]),v=c([["Enamel dish",5],["Black slate",3],["Dark glass",2],["Old zinc",2]]),b=c([["Tungsten",5],["North window",3],["Low sun",1]]),X=c([["Left",3],["Right",2]]),C=c([["Low",2],["Middle",5],["High",3]]),S=c([["Steady hand",6],["Drifting hand",1]]),ve=c([["Clear",4],["Fine bubbles",3],["Frothy",1]]),te=u=>{let h=2166136261^u;for(let B=2;B<e.hash.length;B++)h=Math.imul(h^e.hash.charCodeAt(B),16777619);h=h+1831565813|0;let g=Math.imul(h^h>>>15,1|h);return g=g+Math.imul(g^g>>>7,61|g)^g,((g^g>>>14)>>>0)/4294967296},Ue=te(2175507),w=e.home?{honey:"Wildflower",warmth:"Room warm",stream:"Fine",spoonK:"Old silver",surf:"Enamel dish",lampK:"Tungsten",side:"Left",start:"Middle",hand:"Steady hand",air:"Clear"}:{honey:s,warmth:i,stream:E,spoonK:y,surf:v,lampK:b,side:X,start:C,hand:S,air:ve},q=te(2175137),me=te(2175138),xe=e.home||w.stream==="Flat from the edge"&&w.start==="Low";!xe&&q<.36&&(w.hand=q<.13?"Drawing a line":q<.25?"Drizzling":"Circling"),!xe&&me<.21&&(w.surf=me<.12?"A dish of honey":"Light table");const z=w.hand==="Drawing a line"||w.hand==="Drizzling"||w.hand==="Circling",D=w.surf==="Light table";z&&w.stream==="Flat from the edge"&&(w.stream="Steady");const Y=!e.home&&!z&&Ue<.3,ie=!e.home&&!z&&!Y&&Ue<.5;e.trait("Honey",w.honey),e.trait("Warmth",w.warmth),e.trait("Stream",w.stream),e.trait("Spoon",w.spoonK),e.trait("Surface",w.surf),e.trait("Lamp",D?"Light table":w.lampK+", "+w.side.toLowerCase()),e.trait("Fall",w.start+(Y||z?", from above":ie?", close on the pile":"")),e.trait("Hand",w.hand),e.trait("Air",w.air);const je={"Room warm":400,Warmed:190,Cold:640}[w.warmth]*(w.honey==="Acacia"?.85:w.honey==="Honeydew"?1.25:1),se={Fine:.09,Steady:.15,"Flat from the edge":.2}[w.stream],Fe={Wildflower:[.36,1.55,7.5],Acacia:[.11,.5,2.6],Chestnut:[1.25,4.8,14],Honeydew:[2.6,8,19]}[w.honey],Q={Low:1.6,Middle:2.8,High:4.4}[w.start],Ne={Tungsten:[1,.83,.62],"North window":[.8,.9,1.04],"Low sun":[1.1,.68,.36]}[w.lampK],Ce=w.side==="Left"?-1:1,a=w.lampK==="Low sun"&&!D?[Ce*16,4.2,-30]:[1+Ce*5.5,12.5,-36],r={"Enamel dish":0,"Black slate":1,"Dark glass":2,"Old zinc":3,"A dish of honey":4,"Light table":5}[w.surf],p=[.55,.5,1.1,.4,1.2,.3][r],l=[.9,.08,.05,.45,.1,.9][r],d=parseInt(e.hash.slice(4,12),16)|0,x=(u,h)=>{let g=Math.imul(u^d,2654435761)^Math.imul(h,2246822507);return g^=g>>>15,g=Math.imul(g,739982445),g^=g>>>12,g=Math.imul(g,695872825),g^=g>>>15,(g>>>0)/4294967296*2-1},m=(u,h)=>{const g=Math.floor(u),B=u-g,W=B*B*B*(B*(B*6-15)+10);return x(g,h)*(1-W)+x(g+1,h)*W},R=te(2175139),U=te(2175140),G=te(2175141),O={Cold:11,"Room warm":8,Warmed:5.5}[w.warmth]*{Low:.85,Middle:1,High:1.15}[w.start],k=(-26+44*(G-.5))*Math.PI/180,oe=(55+10*U)*Math.PI/180,ae=(1.3+.5*R)*(w.start==="Low"?1:1.4),fe=z?(()=>{const u=w.hand,h=4+2*R,g=ae,B=U<.5?1:-1,W=u==="Drawing a line"?(.25+.35*U)*O:(1+U)*O,H=.3+.3*G,Z=-k+(R-.5)*.5,L={x:-0,z:-0,vx:-0,vz:-0,ph:-0,ps:-0,w:0},ze=A=>.6366*Math.asin(.985*Math.sin(6.2832*A));return L.step=(A,Ee)=>{let le,_;if(u==="Circling"){L.ph+=Ee*6.2832/(1.4+1.2*U)*(1+.25*m(A*.3,5))*B;const V=g*(1+.16*m(A*.2,6));le=.3*m(A*.08,7)+V*Math.cos(L.ph),_=.3*m(A*.08,8)+V*Math.sin(L.ph)}else{const V=W*(1+.35*m(A*.5,5));L.ph+=Ee*V/(2*h);const Re=u==="Drizzling"?Z+.55*m(A*.06,9):Z+.12*m(A*.05,9),De=Math.cos(Re),Ae=Math.sin(Re),de=h*.5*ze(L.ph);u==="Drizzling"&&(L.ps+=Ee*V/h*H*(1+.4*m(A*.7,6)));const Je=u==="Drizzling"?2.1*ze(L.ps/8.4+.25)+.2*m(A*.9,7):.32*m(A*.25,6)+.12*m(A*.9,7);le=De*de-Ae*Je,_=Ae*de+De*Je}L.w&&(L.vx=(le-L.x)/Ee,L.vz=(_-L.z)/Ee),L.x=le,L.z=_,L.w=1},L})():null,ke=w.hand==="Drawing a line"?4+2*R+1.4:w.hand==="Circling"?2*ae+2:6.2,ye=z?[0,.3*Q+.12*ke/.66,0]:ie?[.55,.95,0]:[.85,2,0],Me=z?oe:(Y?50:ie?30:22)*Math.PI/180,ge=z?k:(Y?-26:ie?-34:7)*Math.PI/180,he=44,ne=[ye[0]+he*Math.cos(Me)*Math.sin(ge),ye[1]+he*Math.sin(Me),ye[2]+he*Math.cos(Me)*Math.cos(ge)],Pe=u=>{const h=Math.hypot(u[0],u[1],u[2]);return[u[0]/h,u[1]/h,u[2]/h]},Oe=(u,h)=>[u[1]*h[2]-u[2]*h[1],u[2]*h[0]-u[0]*h[2],u[0]*h[1]-u[1]*h[0]],Te=(u,h)=>u[0]*h[0]+u[1]*h[1]+u[2]*h[2],re=Pe([ye[0]-ne[0],ye[1]-ne[1],ye[2]-ne[2]]),j=Pe(Oe(re,[0,1,0])),be=Oe(j,re),Ie=z?ke/.66/2/he:It/2*(ie?.5:1)/he,ue=1/Ie,He=1,Se=200,J=new Float32Array(16);{const u=-Te(j,ne),h=-Te(be,ne),g=-Te(re,ne),B=(Se+He)/(He-Se),W=2*Se*He/(He-Se),H=[ue*j[0],ue*be[0],-B*re[0],re[0],ue*j[1],ue*be[1],-B*re[1],re[1],ue*j[2],ue*be[2],-B*re[2],re[2],ue*u,ue*h,-B*g+W,g];J.set(H)}const qe=(u,h,g)=>{const B=J[3]*u+J[7]*h+J[11]*g+J[15];return[(J[0]*u+J[4]*h+J[8]*g+J[12])/B*.5+.5,(J[1]*u+J[5]*h+J[9]*g+J[13])/B*.5+.5]},Ge=r===4?"HDISH":r===5?"LTABLE":"",Ke=z||Y,I=bo(t,Ge,Ke?Ge?Ge+`
#define FTOP`:"FTOP":Ge),N=5,K=z?4*Ut:Ut,Ze=r===4?5:z?12:20,ce=new Float32Array((K+6)*N),we={laid:ce,w:0,dirtyA:0,now:-0,layN:0,lx:-0,ly:-0,lz:-0,lr:-0,turnA:-0,lastAng:null,ppx:-0,ppz:-0,have:0,coilHz:-0,lastRev:-0,lpx:-0,lpz:-0,lpOn:!1,sound:!1,snd:e.sound,rnd:F,cap:K,fig:z,fn:0,fx:-0,fy:-0,fz:-0,fr:-0,gx:-0,gz:-0},gt=w.stream==="Flat from the edge",M=Uo({nu:je,Q:se,a0:.06,H:Q,flowK:r===4?.3:gt&&w.start==="Low"?.45:.12,flat:gt&&w.start!=="Low"&&w.warmth!=="Warmed",dg:gt&&w.start==="Low"?Q+.5:.6},we),Xt=()=>Wt(M),Yt=e.hash.charCodeAt(6)&1?1:-1,jt=parseInt(e.hash.slice(14,18),16)%628/100;{const u=z?.08:.3,h=.62,g=0,B=0;for(let W=0;W<T;W++)for(let H=0;H<T;H++){const Z=(H+.5-T/2)*ee-g,L=(W+.5-T/2)*ee-B;M.hf[H+W*T]=u/(2*Math.PI*h*h)*Math.exp(-(Z*Z+L*L)/(2*h*h))}}No(M,we,Yt,jt,fe,Ze),we.now=0;const ko=t.getExtension("EXT_color_buffer_float"),Io=t.getExtension("EXT_color_buffer_half_float"),Kt=!!(ko||Io),We=(u,h,g,B,W,H,Z,L)=>{const ze=t.createTexture();return t.bindTexture(t.TEXTURE_2D,ze),t.texImage2D(t.TEXTURE_2D,0,g,u,h,0,B,W,Z||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,H),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,H===t.NEAREST?t.NEAREST:t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,L||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,L||t.CLAMP_TO_EDGE),ze},$e=u=>{const h=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,h),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,u,0),h},bt=Kt?t.RGBA16F:t.RGBA8,wt=Kt?t.HALF_FLOAT:t.UNSIGNED_BYTE,Zt=We(n,n,bt,t.RGBA,wt,t.NEAREST),lt=Math.min(n,1024),$t=We(lt,lt,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),qo=$e(Zt),Qt=t.createRenderbuffer();t.bindRenderbuffer(t.RENDERBUFFER,Qt),t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT24,n,n),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,Qt);const Ao=$e($t),Jt=We(st,st,bt,t.RGBA,wt,t.LINEAR),Vo=$e(Jt),vt=T*2,zt=We(vt,vt,bt,t.RGBA,wt,t.LINEAR),Co=$e(zt),Oo=We(T,T,t.R32F,t.RED,t.FLOAT,t.NEAREST),eo=We(n,n,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR),Ho=$e(eo),Rt=We(et,et,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR),So=$e(Rt),ht=t.createVertexArray(),P=new Float32Array(16+4*9),Ft=t.createBuffer();t.bindBuffer(t.UNIFORM_BUFFER,Ft),t.bufferData(t.UNIFORM_BUFFER,P.byteLength,t.DYNAMIC_DRAW),P.set(J,0),P[16]=ne[0],P[17]=ne[1],P[18]=ne[2],P[20]=j[0],P[21]=j[1],P[22]=j[2],P[23]=Ie,P[24]=be[0],P[25]=be[1],P[26]=be[2],P[27]=Ie,P[28]=re[0],P[29]=re[1],P[30]=re[2],P[31]=n,P[32]=a[0],P[33]=a[1],P[34]=a[2],P[35]=p,P[36]=Fe[0],P[37]=Fe[1],P[38]=Fe[2],P[39]={"Room warm":7,Warmed:4,Cold:12}[w.warmth]*(r===4?.25:1);const to=qe(0,qt,0);P[40]=to[0],P[41]=to[1],P[42]=Math.max(0,Math.log2(et/(.78*n))),P[43]=[.5,.55,1.1,.45,.5,.3][r],P[44]=Ne[0],P[45]=Ne[1],P[46]=Ne[2],P[47]=.065,P[48]=1.15,P[49]={Clear:0,"Fine bubbles":.1,Frothy:.3}[w.air],P[50]=1,P[51]=l;const oo=()=>{t.bindBuffer(t.UNIFORM_BUFFER,Ft),t.bufferSubData(t.UNIFORM_BUFFER,0,P),t.bindBufferBase(t.UNIFORM_BUFFER,0,Ft)},no=()=>{t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),t.depthMask(!1)},Be=(u,h)=>{t.activeTexture(t.TEXTURE0+u),t.bindTexture(t.TEXTURE_2D,h)},Xe=new Float32Array((Le+12)*N),nt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,nt),t.bufferData(t.ARRAY_BUFFER,ce.byteLength,t.DYNAMIC_DRAW);const Et=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Et),t.bufferData(t.ARRAY_BUFFER,Xe.byteLength,t.DYNAMIC_DRAW);const ao=u=>{const h=t.createVertexArray();t.bindVertexArray(h),t.bindBuffer(t.ARRAY_BUFFER,u);for(let g=0;g<4;g++)t.enableVertexAttribArray(g),t.vertexAttribPointer(g,4,t.FLOAT,!1,N*4,g*N*4),t.vertexAttribDivisor(g,1);return t.enableVertexAttribArray(4),t.vertexAttribPointer(4,1,t.FLOAT,!1,N*4,N*4+16),t.vertexAttribDivisor(4,1),t.bindVertexArray(null),h},Lt=ao(nt),Tt=ao(Et);wo(t,I),no(),oo(),t.bindVertexArray(ht);{const u=parseInt(e.hash.slice(10,14),16)%977/13;t.useProgram(I.plate),t.bindFramebuffer(t.FRAMEBUFFER,Ao),t.viewport(0,0,lt,lt),t.uniform4f(I.plate.u.uBake,r,u,0,0);const h=r===4?5.6:8.6;t.uniform4f(I.plate.u.uDish,-1.3+(F()-.5)*.7,1.3,h,r===0||r===4?-16:r===5?-9:-60),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.useProgram(I.blur),t.bindFramebuffer(t.FRAMEBUFFER,Ho),t.viewport(0,0,n,n),Be(0,$t),t.uniform1i(I.blur.u.uT,0),t.uniform1f(I.blur.u.uPx,1/n),t.uniform1f(I.blur.u.uAmt,.024),t.uniform1f(I.blur.u.uN,u),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.useProgram(I.spoon),t.bindFramebuffer(t.FRAMEBUFFER,So),t.viewport(0,0,et,et),t.uniform4f(I.spoon.u.uKind,{"Old silver":0,"Tarnished silver":1,"Olive wood":2}[w.spoonK],{Clear:0,"Fine bubbles":.3,Frothy:.7}[w.air],0,0),t.uniform3f(I.spoon.u.uNoz,0,qt,0),t.drawArrays(t.TRIANGLE_STRIP,0,4),Be(0,Rt),t.generateMipmap(t.TEXTURE_2D)}t.bindBuffer(t.ARRAY_BUFFER,nt),t.bufferSubData(t.ARRAY_BUFFER,0,ce),we.sound=!0,we.dirtyA=0;let ro=0,co=Q,at=0,rt=Q,Mt=0,Pt=0,ct=0,io=we.w,Yo=Go(e.hash);function Go(u){return parseInt(u.slice(4,8),16)/65535*6.283}const Bt=(u,h)=>h*.78+.014*Math.exp(-u/.6),Qe=I.rope.u,Wo=I.mound.u,it=I.comp.u,so=()=>{const u=M.s,h=M.n;let g=0;const B=(_,V,Re,De,Ae)=>{const de=g*N;Xe[de]=_,Xe[de+1]=V,Xe[de+2]=Re,Xe[de+3]=De,Xe[de+4]=Ae,g++},W=we.w,H=(W+K-1)%K,Z=(W+K-2)%K;B(ce[Z*N],ce[Z*N+1],ce[Z*N+2],ce[Z*N+3],1e9),B(ce[H*N],ce[H*N+1],ce[H*N+2],ce[H*N+3],1e9);const L=M.noz;if(Ke&&ce[H*N+3]===0&&h-u>2){const _=u*3,V=M.x[_]-M.x[_+3],Re=M.x[_+1]-M.x[_+4],De=M.x[_+2]-M.x[_+5],Ae=Math.hypot(V,Re,De)||1,de=Bt(Math.max(L[1]-M.x[_+1],0),_e(M.rr[u],.009,.16));for(const[Je,Xo]of[[.97,.25],[.8,.6],[.45,.89]])B(M.x[_]+V/Ae*Je*de,M.x[_+1]+Re/Ae*Je*de,M.x[_+2]+De/Ae*Je*de,Xo*de,1e9)}for(let _=u;_<h;_++){const V=_*3,Re=_<h-1?M.rr[_]:M.rr[_-1],De=Math.max(L[1]-M.x[V+1],0);B(M.x[V],M.x[V+1],M.x[V+2],Bt(De,_e(Re,.009,.16)),1e9)}if(B(L[0],L[1],L[2],Bt(0,M.rr[h-2]||.07),1e9),B(L[0],L[1]+.14,L[2]-.05,.05,1e9),B(L[0],L[1]+.5,L[2]-.15,.05,1e9),Ke&&B(L[0],L[1]+.9,L[2]-.27,.05,1e9),t.bindBuffer(t.ARRAY_BUFFER,Et),t.bufferSubData(t.ARRAY_BUFFER,0,Xe,0,g*N),we.dirtyA>0){const _=we.dirtyA+2,V=(io+K-1)%K;V+_>=K?(t.bindBuffer(t.ARRAY_BUFFER,nt),t.bufferSubData(t.ARRAY_BUFFER,0,ce)):(t.bindBuffer(t.ARRAY_BUFFER,nt),t.bufferSubData(t.ARRAY_BUFFER,V*N*4,ce,V*N,(_+1)*N),V<3&&t.bufferSubData(t.ARRAY_BUFFER,K*N*4,ce,K*N,3*N)),we.dirtyA=0,io=W}P[19]=we.now;const ze=qe(L[0],L[1],L[2]);P[40]=ze[0],P[41]=ze[1],no(),oo(),Pt%2===0&&(Be(0,Oo),t.texSubImage2D(t.TEXTURE_2D,0,0,0,T,T,t.RED,t.FLOAT,M.hf),t.useProgram(I.h),t.bindFramebuffer(t.FRAMEBUFFER,Co),t.viewport(0,0,vt,vt),t.bindVertexArray(ht),t.uniform1i(I.h.u.uG,0),t.drawArrays(t.TRIANGLE_STRIP,0,4)),Be(1,zt),t.bindFramebuffer(t.FRAMEBUFFER,qo),t.viewport(0,0,n,n),t.clearColor(0,0,0,0),t.depthMask(!0),t.clearDepth(1),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.blendEquation(t.FUNC_ADD),t.useProgram(I.mound),t.uniform1i(Wo.uH,1),t.bindVertexArray(ht);const A=6*(T*2-1)*(T*2-1);t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.colorMask(!1,!1,!1,!1),t.disable(t.BLEND),t.drawArrays(t.TRIANGLES,0,A),t.colorMask(!0,!0,!0,!0),t.enable(t.BLEND),t.depthMask(!1),t.depthFunc(t.LEQUAL),t.drawArrays(t.TRIANGLES,0,A),t.disable(t.DEPTH_TEST),t.depthMask(!0),t.clear(t.DEPTH_BUFFER_BIT),t.useProgram(I.rope),t.uniform1i(Qe.uH,1),t.uniform1i(Qe.uMode,0);const Ee=g-3,le=(Nt+1)*2;t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.colorMask(!1,!1,!1,!1),t.disable(t.BLEND),t.enable(t.POLYGON_OFFSET_FILL),t.polygonOffset(0,300),t.uniform1i(Qe.uMode,3),t.bindVertexArray(Lt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,K),t.disable(t.POLYGON_OFFSET_FILL),t.colorMask(!0,!0,!0,!0),t.enable(t.BLEND),t.depthMask(!1),t.depthFunc(t.LEQUAL),t.uniform1i(Qe.uMode,0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,K),t.disable(t.DEPTH_TEST),t.bindVertexArray(Tt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,Ee),t.bindFramebuffer(t.FRAMEBUFFER,Vo),t.viewport(0,0,st,st),t.clear(t.COLOR_BUFFER_BIT),t.uniform1i(Qe.uMode,1),t.bindVertexArray(Lt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,K),t.bindVertexArray(Tt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,Ee),t.uniform1i(Qe.uMode,2),t.bindVertexArray(Lt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,K),t.bindVertexArray(Tt),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,le,Ee),t.disable(t.BLEND),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,n,n),t.useProgram(I.comp),t.bindVertexArray(ht),Be(0,eo),Be(1,Rt),Be(2,Zt),Be(3,Jt),Be(4,zt),t.uniform1i(it.uP,0),t.uniform1i(it.uS,1),t.uniform1i(it.uG,2),t.uniform1i(it.uA,3),t.uniform1i(it.uH,4),t.drawArrays(t.TRIANGLE_STRIP,0,4),t.bindVertexArray(null)};return so(),(u,h)=>{const g=Math.min(h,.1),B=e.input;if(B.down){const H=1-B.y,Z=qe(0,0,0),L=qe(0,1,0),ze=L[1]-Z[1];co=_e((H-Z[1])/ze,.7,6.9);const A=qe(1,0,0)[0]-Z[0];ro=_e((B.x-Z[0])/A,-2.6,2.6)}const W=Math.min(Math.round((g/Ve+Mt)/$),22);Mt=_e(g/Ve+Mt-W*$,0,2*$);for(let H=0;H<W;H++){const Z=w.hand==="Drifting hand"?1.6*(.75*m(M.time*.16,1)+.25*m(M.time*.43,2)):0,L=w.hand==="Drifting hand"?.45*m(M.time*.12,3):0,ze=ro+Z,A=28*$,Ee=at,le=rt;at+=_e((ze-at)*12*$,-A,A),rt+=_e((co-rt)*12*$,-A,A),M.nv[0]=(at-Ee)/$,M.nv[1]=(rt-le)/$;let _=0,V=L;fe&&(fe.step(M.time,$),_=fe.x,V=fe.z,M.nv[0]+=fe.vx,M.nv[2]=fe.vz);const Re=M.time*12*Yt+jt;M.noz[0]=at+_+Xt()*Math.cos(Re)+.012*(Math.sin(M.time*3.1+1)+.6*Math.sin(M.time*7.7)),M.noz[1]=rt,M.noz[2]=V+Xt()*Math.sin(Re)+.012*(Math.sin(M.time*2.3)+.6*Math.sin(M.time*5.9+2)),Ot(M,$),we.now+=$*Ve}ct+=W*$,Pt%2===0&&ct>0&&(ut(M,ct,1-ct*Ve/Ze),ct=0),Pt++,so()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
