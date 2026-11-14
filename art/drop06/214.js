// Falling Spring: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/214.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ht){Ht&&function(){"use strict";const gt=new WeakMap,Ne=1024,ye=768,ut=36,ht=(e,t,p)=>e<t?t:e>p?p:e,Kt=552,g=0,Ro=!1,_e=`#version 300 es
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); gl_Position=vec4(p,0.,1.); }`,et="layout(std140) uniform S { vec4 P[122]; mat4 VP; vec4 cam; vec4 L0; vec4 L1; vec4 wire; vec4 mat; vec4 misc; vec4 contact; vec4 shade; vec4 film; vec4 tint; vec4 thin; vec4 cool; };",Gt=`vec3 stock(vec3 c,vec4 t){ float l=dot(c,vec3(.3,.59,.11)); c=mix(vec3(l),c,t.a)*t.rgb; float mono=1.-step(.01,t.a), fade=max(.97-t.g,0.)*1.3; c=mix(c,c*c*(3.-2.*c),.32+.4*mono); return c*(.965-fade*.6)+.02-.013*mono+fade*vec3(1.,.84,.86); }
  vec3 tone(vec3 c){ return pow(1.-exp(-c*1.25),vec3(1./2.2)); }`,Mo=`#version 300 es
  precision highp float; uniform sampler2D tN; out vec4 o;
  void main(){ vec2 uv=gl_FragCoord.xy/512.; vec4 s=vec4(0.); float a=.5, w=0., n=6.;
    for(int i=0;i<6;i++){ vec2 g=uv*n, c=floor(g), f=g-c; f=f*f*(3.-2.*f);
      ivec2 c0=ivec2(mod(c,n)), c1=ivec2(mod(c+1.,n)), off=ivec2(i*37,i*91);
      vec4 v=mix(mix(texelFetch(tN,(c0+off)&255,0),texelFetch(tN,(ivec2(c1.x,c0.y)+off)&255,0),f.x),
                 mix(texelFetch(tN,(ivec2(c0.x,c1.y)+off)&255,0),texelFetch(tN,(c1+off)&255,0),f.x),f.y);
      s+=v*a; w+=a; a*=.55; n*=2.; }
    s/=w; o=clamp((s-.5)*2.1+.5,0.,1.); }`,Fo=`#version 300 es
  precision highp float; uniform vec4 uWall; uniform vec4 uBench; uniform vec4 uLd; uniform vec4 uPool; uniform float uSide; uniform int uN; out vec4 o;
  vec3 env(vec3 d){
    vec3 c=vec3(.02,.021,.023)*(1.+.9*max(d.y,0.));
    c=mix(c,uWall.rgb*uWall.a*(uPool.w*.22+uPool.w*exp(-(1.-dot(d,uPool.xyz))*2.6)),smoothstep(-.12,.42,-d.z));
    c=mix(c,uBench.rgb*uBench.a,smoothstep(-.02,.12,-d.y));
    float k=dot(d,normalize(vec3(uSide*.85,.12,.52)));
    c+=vec3(.3,.3,.285)*smoothstep(.8,.94,k);
    c+=vec3(1.,.95,.86)*pow(max(dot(d,uLd.xyz),0.),18.)*1.1;
    return c; }
  void main(){ vec2 uv=gl_FragCoord.xy/vec2(128.,64.); float ph=(uv.x-.5)*6.2832, el0=(uv.y-.5)*3.1416; vec3 s=vec3(0.); float w=0.;
    for(int j=0;j<uN;j++){ int i=j-5; float g=float(i)/5., e=el0+g*.16, h=exp(-2.*g*g); s+=env(vec3(cos(ph)*cos(e),sin(e),sin(ph)*cos(e)))*h; w+=h; }
    o=vec4(sqrt(clamp(s/w/6.,0.,1.)),1.); }`,Yt=e=>`#version 300 es
  ${e}
  precision highp float;
  uniform vec4 U[6]; uniform vec4 uWall; uniform vec4 uBench; uniform vec4 uTint; uniform vec4 uA; uniform vec4 uM[3]; uniform vec4 uK[2]; uniform int uR3;
  uniform sampler2D tF; uniform sampler2D tN; out vec4 o;
  #define RO U[0].xyz
  #define TANH U[0].w
  #define RT U[1].xyz
  #define UPV U[2].xyz
  #define FWD U[3].xyz
  #define LA U[4]
  #define ZW U[5].x
  ${Gt}
  float T(vec2 p,int c){ return textureLod(tF,p,0.)[c]; }
  // the lamp's light arriving at p (before the surface's own cosine): a reflector's pool with a core, a rim and a faint ring
  vec3 lampAt(vec3 p,out vec3 L){ L=LA.xyz-p; float r2=dot(L,L); L/=sqrt(r2);
    vec3 aim=normalize(vec3(U[5].w,U[1].w,ZW)-LA.xyz);
    float s2=2.*(1.-dot(-L,aim))/(U[5].z*U[5].z);
    float beam=.72*exp(-1.25*s2)+.26*(1.-smoothstep(.5,1.2,s2))+.02*exp(-.3*s2);
    return uK[0].rgb*LA.w/r2*beam; }
  float TL(vec2 p,int c,float l){ return textureLod(tF,p,l)[c]; }
  // straight marks made by a thing, not by noise: a fold in the paper, a settlement crack in the plaster
  float marks(vec2 p,float wob){ float m=0.; vec2 w=p+vec2(TL(p*1.9+uA.xy,1,1.)-.5,TL(p.yx*1.7+uA.yx,2,1.)-.5)*wob;
    w+=vec2(TL(p*11.,3,0.)-.5,TL(p.yx*12.,0,0.)-.5)*wob*.16;
    for(int i=0;i<uR3;i++){ vec2 a=uM[i].xy, ba=uM[i].zw-a, pa=w-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); vec2 d=pa-ba*h;
      float fade=smoothstep(0.,.12,h)*(1.-smoothstep(.82,1.,h));
      m=max(m,exp(-dot(d,d)/uA.w)*fade*(.55+.45*TL(vec2(h*3.+float(i)*.31,.4),2,1.))); }
    return m; }
  // the height of the wall in metres; the lamp rakes across it, so its light comes from this
  float wallH(vec2 p){ float h=0.;
#if W_T==0
    // seamless paper: the long soft waves it hangs in, handling, tooth, a fold or two
    h+=.034*TL(vec2(p.x*.31,p.y*.055)+uA.xy,0,4.);
    h+=.0022*TL(p*.74+uA.yx,1,1.);
    h+=.00011*T(p*5.3,2);
    h-=.00085*marks(p,.012);
#elif W_T==1
    // old matt emulsion on plaster: roller stipple, brushed undercoat, the wall's own unevenness, a crack
    h+=.0005*T(p*3.4+uA.xy,2);
    h+=.0007*TL(vec2(p.x*2.1,p.y*.31)+uA.yx,3,1.);
    h+=.0046*TL(p*.62+uA.xy,0,1.);
    h-=.00055*marks(p,.05);
#elif W_T==2
    // unbleached muslin hung in loose folds, and its weave
    float fl=TL(vec2(p.x*.42+p.y*.03,p.y*.05)+uA.xy,0,3.);
    h+=.085*fl+.012*TL(vec2(p.x*1.5,p.y*.14)+uA.yx,1,3.);
    h+=.00016*sin(p.x*2992.)*sin(p.y*2992.);
#else
    // a slate-painted board, brushed
    h+=.00026*TL(vec2(p.x*.9,p.y*3.1)+uA.xy,2,1.)+.0007*TL(p*.8,0,1.);
#endif
    return h; }
  void main(){
    vec2 ndc=vec2(-1.)+gl_FragCoord.xy*2./${Ne}.;
    vec3 rd=normalize(FWD+RT*ndc.x*TANH+UPV*ndc.y*TANH);
    float tw=(ZW-RO.z)/rd.z; if(tw<=0.)tw=1e3; float tb=-RO.y/rd.y; if(tb<=0.)tb=1e3;
    vec3 p=RO+rd*min(tw,tb), n, alb; vec3 V=-rd; float amb=.17;
    vec3 sheen=vec3(0.);
    // one call of the lamp: on the wall, the point itself; on the bench, the wall point it mirrors
    vec3 rr=reflect(rd,vec3(0.,1.,0.)), pw=p+rr*max((ZW-p.z)/min(rr.z,-.001),0.), Lw; vec3 ew=lampAt(pw,Lw);
    if(tw<tb){
      // ---- the wall
      vec2 q=p.xy; float hc[3]; const float e=.0013;
      // a loop bounded by a uniform stays rolled, so the height is compiled once, not three times (Windows first make)
      for(int i=0;i<uR3;i++) hc[i]=wallH(q+vec2(i==1?e:0.,i==2?e:0.));
      n=normalize(vec3(-(hc[1]-hc[0])/e,-(hc[2]-hc[0])/e,1.));
      alb=uWall.rgb;
      float dot1=textureLod(tN,q*5.03+uA.xy,0.).a, dot2=textureLod(tN,q*3.1+uA.yx,0.).b;
#if W_T==0
      float fine=T(q*6.1,2), mot=TL(q*.63+uA.yx,1,1.), fleck=textureLod(tN,q*vec2(2.9,1.3)+uA.yx,0.).g;
      alb*=.97+.06*fine; alb*=.985+.03*mot;
      alb*=1.-uA.z*smoothstep(.965,.995,fleck);                      // fibres in the sheet
      alb*=1.-.35*smoothstep(.98,.998,dot1);                       // dust
      alb*=1.+.05*marks(q,.012);                                  // a fold rubs pale
      alb*=1.-.05*smoothstep(.5,.8,TL(vec2(q.x*2.4,q.y*.8),0,1.))*(1.-smoothstep(.0,.2,q.y)); // scuffed low down
#elif W_T==1
      float fine=T(q*4.3,2), mot=TL(q*.8+uA.yx,1,2.), sb=TL(q*.37+uA.yx*1.3,1,3.);
      alb*=.985+.03*fine; alb*=.975+.05*mot;
      alb=mix(alb,alb*1.02,smoothstep(.56,.7,sb)*.55);    // filler reads through
      alb*=1.-.26*marks(q,.05);
      alb*=1.-.14*smoothstep(.975,.998,dot2);                                // pits
      alb*=1.-.06*smoothstep(.55,.82,TL(vec2(q.x*1.2,q.y*5.),3,1.))*(1.-smoothstep(.02,.3,q.y));
#elif W_T==2
      float slub=T(vec2(q.x*.8,q.y*14.),2), slv=T(vec2(q.x*14.,q.y*.8),3);
      alb*=.93+.14*(slub*.5+slv*.5); alb*=.975+.05*T(q*7.,1);
#else
      // wiped clean, not quite: a thin even film of chalk with the board rubber's long swipes in it
      float sw=TL(vec2(q.x*.3+q.y*.09,q.y*2.3)+uA.xy,1,2.), dust=T(q*vec2(1.3,6.)+uA.yx,2);
      alb+=vec3(.017,.019,.018)*(.5+.6*sw+.25*dust);
#endif
      amb*=.8+.2*smoothstep(0.,.012,p.y); alb*=.5+.5*smoothstep(.0004,.0055+.002*sin(q.x*17.+uA.x*6.),p.y);
    } else {
      // ---- the bench, seen almost edge-on. Only soft variation: a pixel of it covers centimetres
      vec2 u=p.xz; n=vec3(0.,1.,0.); float back=mix(1.5,.06,smoothstep(0.,.7,p.z-ZW));
      float lo=TL(vec2(u.x*.8,u.y*.11),0,3.), mi=TL(u*vec2(1.1,.5)+.3,2,2.), fx=T(vec2(u.x*3.4,u.y*.8),2);
      float nc=max(dot(n,V),.001), fr=pow(1.-nc,5.);
      // the wall as the bench mirrors it: the point it reflects, lit by the lamp; slate's cleavage and dust break it
      vec3 wr=uWall.rgb*(uK[1].rgb+ew*max(Lw.z,0.))*1.3;
#if B_T==0
      // honed black slate
      alb=vec3(.018,.025,.038)*(.8+.3*lo); sheen=wr*.34*back*fr*(.8+.4*mi)*(.88+.24*fx);
#elif B_T==1
      // black paint on an old bench, rubbed in places
      alb=vec3(.016,.016,.017)*(.8+.3*lo); alb+=vec3(.012,.011,.01)*smoothstep(.45,.85,mi);
      sheen=wr*.2*back*fr*(.8+.4*lo)*(.55+.9*T(vec2(u.x*.6,u.y*9.),1));
#elif B_T==2
      // black rubber mat
      alb=vec3(.019,.018,.017)*(.75+.5*fx); sheen=vec3(0.);
#else
      // a dark steel plate
      alb=vec3(.03,.032,.036)*(.8+.3*lo); sheen=wr*.42*back*fr*(.85+.3*mi);
#endif
    }
    if(tw>=tb) alb+=vec3(.08,.078,.072)*smoothstep(.965,.995,textureLod(tN,vec2(p.x*2.1,p.z*.21)+uA.xy,0.).r);
    vec3 L=LA.xyz-p; float r2=dot(L,L); L/=sqrt(r2);
    vec3 dif=tw<tb?ew*max(dot(n,L),0.):uK[0].rgb*LA.w/r2*max(dot(n,L),0.)*.25;
    vec3 ambC=uK[1].rgb*(amb/.17);
    if(tw<tb) dif*=1.+.12*exp(-p.y/.03);   // the bench throws a little of the lamp back onto the wall's foot
    vec3 lit=alb*(ambC+dif)+sheen, sh=alb*(ambC+dif*.2)+sheen*.6;  // the room sends some of the pool back into the shadow
    vec3 tc=tone(lit), ts=tone(sh);
    float ratio=clamp(dot(ts,vec3(.33))/max(dot(tc,vec3(.33)),.001),0.,1.);
    o=vec4(stock(tc,uTint),ratio);
  }`,_o=`#version 300 es
  precision highp float; uniform vec4 U[6]; uniform sampler2D tA; uniform int uN; out vec4 o;
  void main(){ vec2 uv=gl_FragCoord.xy/${Ne}., nd=uv*2.-1.;
    vec3 rd=normalize(U[3].xyz+U[1].xyz*nd.x*U[0].w+U[2].xyz*nd.y*U[0].w);
    float tw=(U[5].x-U[0].z)/rd.z; if(tw<=0.)tw=1e3; float tb=-U[0].y/rd.y; if(tb<=0.)tb=1e3; float t=min(tw,tb);
    float dp=t*dot(rd,U[3].xyz), fd=-U[0].z*U[3].z, coc=min(abs(1.-fd/dp)*U[5].y,7.)/${Ne}.;
    vec4 s=vec4(0.); float w=0.;
    for(int i=0;i<uN;i++){ float a=float(i)*2.39996, r=sqrt((float(i)+.5)/24.), h=1.-.55*r*r; s+=textureLod(tA,uv+vec2(cos(a),sin(a))*r*coc,0.)*h; w+=h; }
    o=s/w; }`,Uo=`#version 300 es
  precision highp float; precision highp int; ${et}
  layout(location=0) in vec3 aA; layout(location=1) in vec4 aB;
  uniform int uFirst; uniform int uMode;
  out vec3 vW; out vec3 vR; out vec3 vBn; out vec3 vT; out vec4 vF; out vec4 vS;
  void main(){
    int i=gl_InstanceID+uFirst, N=int(misc.x); float u=aA.x, fi=float(i);
    vec4 p0=P[max(i-1,0)],p1=P[i],p2=P[i+1],p3=P[min(i+2,N)];
    vec3 c=mix(p1.xyz,p2.xyz,u), tm=mix(p2.xyz-p0.xyz,p3.xyz-p1.xyz,u)*.5;
    float dth=wire.w*6.28319+p2.w-p1.w, th=wire.w*6.28319*(fi+u)+mix(p1.w,p2.w,u)+mat.w;
    vec3 rad=vec3(cos(th),0.,sin(th));
    vec3 T=normalize(tm+vec3(-rad.z,0.,rad.x)*wire.x*dth);
    vec3 Rn=normalize(rad-T*dot(rad,T)), B=cross(Rn,T); B*=(B.y<0.?-1.:1.);
    // no turn of a real coil is quite round, flat or level
    float h1=fract(sin(fi*12.9898)*43758.5453), h2=fract(sin(fi*78.233)*24634.63);
    float gu=i>0?mix(p0.y-p1.y,p1.y-p2.y,u):1., gd=i<N-1?mix(p1.y-p2.y,p2.y-p3.y,u):1.;
    // shut turns lie on each other: a stack is a clean ribbed cylinder, the waviness only shows where the turns stand open
    float op=smoothstep(0.,wire.z*2.5,min(gu,gd)-wire.z);
    float rr=wire.x*(1.+((h1-.5)*.009+.0035*sin(th*2.+h2*6.28))*(.25+.75*op));
    vec3 w=c+rad*rr+Rn*aA.y+B*aA.z*thin.x; w.y+=(h2-.5)*.0012*cos(th-h1*6.28)*op;
    vS=vec4(u,fi,max(gu-wire.z,0.),max(gd-wire.z,0.));
    vF=aB; vT=T; vR=Rn; vBn=B; vW=w;
    if(uMode==2){ w.y=-w.y; vR.y=-vR.y; vBn.y=-vBn.y; vT.y=-vT.y; }
    gl_Position=VP*vec4(w,1.);
  }`,Bo=`#version 300 es
  precision highp float; ${et}
  layout(location=0) in vec2 aA;
  uniform vec4 uL; uniform float uTx; out float vE;
  void main(){
    int i=gl_InstanceID; float u=aA.x, sg=aA.y;
    vec4 p1=P[i],p2=P[i+1];
    vec3 c=mix(p1.xyz,p2.xyz,u);
    float th=wire.w*6.28319*(float(i)+u)+mix(p1.w,p2.w,u)+mat.w; vec3 rad=vec3(cos(th),0.,sin(th));
    vec3 m=c+rad*wire.x; vec3 dd=m-uL.xyz; float el=abs(dd.y)/length(dd);
    float hw=wire.z*.5+wire.y*.5*el+uTx*1.25; // the wire's true width: a thin wire 4 m from a small lamp throws a light shadow
    vec3 w=m+rad*sg*(wire.y*.5+uTx*1.5); w.y+=sg*hw;
    vE=sg*hw/uTx;
    vec3 d=w-uL.xyz; float sw=(misc.y-w.z)/d.z, sb=d.y<0.?-w.y/d.y:1e3; float s=min(sw<0.?1e3:sw,sb);
    gl_Position=VP*vec4(w+d*s,1.);
    vEdge=hw/uTx;
  }`.replace("out float vE;","out float vE; out float vEdge;"),Lo=`#version 300 es
  precision highp float; in float vE; in float vEdge; out vec4 o; void main(){ float c=clamp(vEdge-abs(vE)-1.,0.,1.); o=vec4(c); }`,ko=`#version 300 es
  precision highp float; uniform sampler2D tM; uniform float uR; out vec4 o;
  void main(){ vec2 uv=gl_FragCoord.xy/${ye}.; float s=0., w=0.;
    for(int i=0;i<11;i++){ float a=float(i)*2.39996, r=sqrt((float(i)+.5)/11.)*uR, h=1.-.5*float(i)/11.;
      s+=texture(tM,uv+vec2(cos(a),sin(a))*r).r*h; w+=h; }
    o=vec4(s/w); }`,So=`#version 300 es
  precision highp float; ${et}
  uniform sampler2D tB; uniform sampler2D tM; uniform sampler2D tN; out vec4 o;
  void main(){
    vec2 uv=gl_FragCoord.xy/misc.w;
    vec4 b=texture(tB,uv); vec4 s=texture(tM,uv);
    float d=length((uv*2.-1.-contact.xy)/contact.zw); float ao=shade.x*(1.-smoothstep(.55,1.35,d));
    float sh=clamp(s.r,0.,1.);
    vec3 c=b.rgb*mix(vec3(1.),b.a*mix(vec3(1.),cool.rgb,1.-b.a),sh)*(1.-ao*(1.-sh*.5));
    o=vec4(c,1.);
  }`,Po=`#version 300 es
  precision highp float; precision highp int; ${et}
  uniform sampler2D tE; uniform sampler2D tF; uniform int uMode;
  in vec3 vW; in vec3 vR; in vec3 vBn; in vec3 vT; in vec4 vF; in vec4 vS; out vec4 o;
  ${Gt}
  void main(){
    vec2 q=vF.zw, qs=sign(q), e=q*q; e=e*e*qs;
    float fq=fwidth(q.y), sub=smoothstep(.45,1.6,fq);
    vec2 nl=vF.xy+vec2(abs(vF.y)*e.x,abs(vF.x)*e.y)*.85*(1.-sub);
    vec3 Rn=normalize(vR), Bn=normalize(vBn), T=normalize(vT);
    vec3 N=normalize(Rn*nl.x+Bn*nl.y);
    float coil=vS.y, sl=(coil+vS.x)*wire.x*6.2832;
    vec3 pos=vW; if(uMode==2) pos.y=-pos.y;
    float hgt=abs(vW.y);
    vec3 V=normalize(cam.xyz-pos);
    // drawn-wire streaks along it, roller chatter across it
    float across=abs(vF.x)>abs(vF.y)?q.y:q.x;
    vec4 ns=texture(tF,vec2(sl*.5,across*.021+coil*.37));
    vec4 ns2=textureLod(tF,vec2(sl*1.6,coil*.017+across*.04),1.);
    float tn=fract(sin(coil*12.9898)*43758.5453), tm=fract(sin(coil*39.3461)*11003.17);
    vec3 Bt=normalize(cross(N,T));
    float opn=smoothstep(.15,.6,min(1.-exp(-vS.z/wire.y*2.4),1.-exp(-vS.w/wire.y*2.4)));
    N=normalize(N+Bt*((ns.b-.5)*.16)+T*((ns2.a-.5)*.13+(tn-.5)*.022)*(.3+.7*opn));
    // neighbours: how shut this turn is above and below
    float W=wire.y, gu=1.-exp(-vS.z/W*2.4), gd=1.-exp(-vS.w/W*2.4);
    float up=max(nl.y,0.), dn=max(-nl.y,0.), ou=max(nl.x,0.), inn=max(-nl.x,0.);
    float gm=min(gu,gd);
    float occ=up*(.04+.96*gu)+dn*(.04+.8*gd)+ou*(.9+.1*gm)+inn*(.07+.2*gm);  // the far arc is seen from inside the coil: dim
    occ/=max(up+dn+ou+inn,.001);
    float crev=(abs(vF.x)>abs(vF.y))?mix(mix(1.-smoothstep(.62,1.02,abs(q.y)),.72,sub),1.,gm):1.;
    occ*=crev;
    // the far arc is the coil's inside, half in the near arcs' shade: dimmer, and the lamp's streak barely on it
    float farA=1.-smoothstep(-.3,.1,dot(Rn,V)); occ*=1.-.5*farA*opn;
    vec3 R=reflect(-V,N);
    float ph=atan(R.z,R.x)/6.28318+.5, el=asin(clamp(R.y,-1.,1.))/3.14159+.5;
    vec3 rf=textureLod(tE,vec2(ph,el),0.).rgb; rf=rf*rf*6.;
    float cv=max(dot(N,V),0.);
    vec3 F0=mat.rgb*(.86+.28*ns.r);
    // tarnish freckles
    float rust=smoothstep(.62-shade.w*.2,.7-shade.w*.2,texture(tF,vec2(sl*.9,coil*.041+across*.012)).g)*shade.w;
    vec3 fr=F0+(1.-F0)*pow(1.-cv,5.);
    vec3 col=rf*fr*occ*(1.-rust);
    { vec3 L=L0.xyz-pos; float r2=dot(L,L); L/=sqrt(r2);
      vec3 H=normalize(L+V); float nh=max(dot(N,H),.01), nd=max(dot(N,L),0.), td=dot(T,H), bd=dot(Bt,H);
      // the lamp's line on the steel: long along the wire's roll marks, and broken where they break
      float wd=exp(-((td*td)/.03+(bd*bd)/.09)/(nh*nh))/(12.56*.08*.3*sqrt(max(nd*cv,.02)));
      float brk=mix(.92,(.55+.45*smoothstep(.25,.6,ns2.g))*(.85+.3*tm),.15+.5*opn);
      vec3 E=vec3(1.,.97,.92)*L0.w/r2*nd;
      col+=E*(wd*F0*1.1*brk*(.5+ns.g)*occ*(1.-rust)+(F0*.045+vec3(.19,.095,.05)*rust)*occ); }
    col+=vec3(.01)*occ;
    vec3 c=stock(tone(col),tint);
    float a=min(1.,thin.y*1.35);
    if(uMode==2){ float cn=textureLod(tF,vec2(pos.x*2.3+hgt*3.,hgt*11.+pos.z*.7),1.).r; a=exp(-hgt/(.022+.03*cn))*shade.y*(.3+.7*pow(1.-cv,3.))*smoothstep(.25,.6,cn+.25-hgt*4.); }
    o=vec4(c,a);
  }`,No=`#version 300 es
  precision highp float; ${et}
  uniform sampler2D tS; uniform sampler2D tN; out vec4 o;
  void main(){
    vec2 fc=gl_FragCoord.xy, uv=fc/misc.w+film.xy*.5; float pv=thin.x2/misc.w;
    vec3 c=texture(tS,uv).rgb;
    vec4 rn=texture(tN,(fc+misc.z*vec2(17.,29.))/256.);
    vec3 hg=vec3(0.); float ra=rn.b*6.2832;
    for(int i=0;i<6;i++){ float a=ra+float(i)*1.0472, r=(1.1+float(i)*.42)*pv; vec3 t=texture(tS,uv+vec2(cos(a),sin(a))*r).rgb; hg+=max(t-.86,0.); }
    c+=hg*vec3(.36,.27,.21);
    float l=dot(c,vec3(.3,.59,.11));
    vec2 f=fc*thin.z+misc.z*vec2(61.37,97.11);
    vec4 a=texture(tN,f/256.), b=texture(tN,(f*.57+vec2(31.3,7.9))/256.);
    vec3 g=vec3(a.r+b.g-1.)+(a.gba-.5)*thin.w;
    o=vec4(c*film.z+g*film.w*(.25+3.2*l*(1.-l)*(1.-l)),1.);
  }`.replace("thin.x2","cam.w"),zo=`#version 300 es
  uniform vec4 uAB; uniform vec4 uW; out float vC;
  void main(){ float s=float(gl_VertexID&1), c=float((gl_VertexID>>1)&1)*2.-1.; vec2 a=uAB.xy,b=uAB.zw,d=normalize(b-a),n=vec2(-d.y,d.x); vC=c; gl_Position=vec4(mix(a,b,s)+n*c*uW.x,mix(uW.z,uW.w,s),1.); }`,Do=`#version 300 es
  precision highp float; uniform vec4 uP; uniform vec3 uC0; uniform vec3 uCM; uniform vec3 uC1; uniform sampler2D tB; in float vC; out vec4 o;
  void main(){ float k=clamp((1.-abs(vC))*uP.x,0.,1.); vec3 c=vC<0.?mix(uCM,uC0,-vC):mix(uCM,uC1,vC);
    float lw=dot(texture(tB,gl_FragCoord.xy/uP.w).rgb,vec3(.3,.59,.11)), lc=max(dot(c,vec3(.3,.59,.11)),.001);
    c=min(c*(uP.z>0.?min(1.,max(lw-.18,0.)/lc):max(1.,(lw+.18)/lc)),1.);
    o=uP.y>0.?vec4(k*uP.y):vec4(c,k); }`;function Io(e,t,p){const B=new Map,i=(c,r)=>{let u=B.get(r);return u||(u=e.createShader(c),e.shaderSource(u,r),e.compileShader(u),B.set(r,u)),u},A=(c,r)=>{const u=e.createProgram();return u._s=[i(e.VERTEX_SHADER,c),i(e.FRAGMENT_SHADER,r)],e.attachShader(u,u._s[0]),e.attachShader(u,u._s[1]),e.linkProgram(u),u},D=(c,r)=>{e.getProgramParameter(r,e.LINK_STATUS)||console.error("214 "+c+": "+e.getProgramInfoLog(r)+" "+r._s.map(ne=>e.getShaderInfoLog(ne)).join(" "));const u=e.getUniformBlockIndex(r,"S");u!==e.INVALID_INDEX&&e.uniformBlockBinding(r,u,0);const k=e.getProgramParameter(r,e.ACTIVE_UNIFORMS),L={};for(let ne=0;ne<k;ne++){const we=e.getActiveUniform(r,ne);we&&(L[we.name.replace("[0]","")]=e.getUniformLocation(r,we.name))}return L},v={fbm:A(_e,Mo),env:A(_e,Fo),dof:A(_e,_o),coil:A(Uo,Po),shadow:A(Bo,Lo),blur:A(_e,ko),bg:A(_e,So),line:A(zo,Do),post:A(_e,No)},f={P:v,U:{},bakes:new Map,walls:new Map,wpend:new Map};f.wpend.set(t+"_"+p,A(_e,Yt(`#define W_T ${t}
#define B_T ${p}`))),f.wallProg=(c,r)=>{const u=c+"_"+r;let k=f.walls.get(u);if(!k){const L=f.wpend.get(u)||A(_e,Yt(`#define W_T ${c}
#define B_T ${r}`));k={p:L,u:D("wall",L)},f.walls.set(u,k)}return k};for(const c in v)f.U[c]=D(c,v[c]);f.vaoE=e.createVertexArray(),f.ubo=e.createBuffer(),e.bindBuffer(e.UNIFORM_BUFFER,f.ubo),e.bufferData(e.UNIFORM_BUFFER,Kt*4,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);const U=new Uint8Array(256*256*4);let h=558537757;for(let c=0;c<U.length;c+=4)h=Math.imul(h^h>>>15,739982445)+2654435769|0,U[c]=h&255,U[c+1]=h>>>8&255,U[c+2]=h>>>16&255,U[c+3]=h>>>24&255;f.tN=Ue(e,256,U,{rep:!0}),f.tF=Ue(e,512,null,{rep:!0});const b=e.createFramebuffer();f.fb=b,e.bindFramebuffer(e.FRAMEBUFFER,b),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f.tF,0),e.viewport(0,0,512,512),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),e.useProgram(v.fbm),e.bindVertexArray(f.vaoE),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,f.tN),e.uniform1i(f.U.fbm.tN,0),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindTexture(e.TEXTURE_2D,f.tF),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,null),f.tM=Ue(e,ye,null,{}),f.tS=Ue(e,ye,null,{}),f.fbM=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,f.fbM),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f.tM,0),f.fbS=e.createFramebuffer(),e.bindFramebuffer(e.FRAMEBUFFER,f.fbS),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f.tS,0),e.bindFramebuffer(e.FRAMEBUFFER,null);{const c=ut+1,r=new Float32Array(c*4);for(let L=0;L<c;L++)r[L*4]=r[L*4+2]=L/ut,r[L*4+1]=1,r[L*4+3]=-1;const u=e.createVertexArray();e.bindVertexArray(u);const k=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,k),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindVertexArray(null),f.shadowStrip={vao:u,count:c*2}}return f}function Ue(e,t,p,B){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i);const A=B.h||t;e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,A,0,e.RGBA,e.UNSIGNED_BYTE,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,B.mip||B.rep&&t>256?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const D=B.rep?e.REPEAT:e.CLAMP_TO_EDGE;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,B.wrapS?e.REPEAT:D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,D),i}function Co(e,t,p,B,i){const A=[];if(t===0){const c=p/2,r=B/2;A.push([[c,-r,1,0,1,-1],[c,r,1,0,1,1]],[[c,r,0,1,1,1],[-c,r,0,1,-1,1]],[[-c,r,-1,0,-1,1],[-c,-r,-1,0,-1,-1]],[[-c,-r,0,-1,-1,-1],[c,-r,0,-1,1,-1]])}else{const r=B/2;for(let u=0;u<6;u++){const k=u/6*6.28319,L=(u+1)/6*6.28319;A.push([[Math.cos(k)*r,Math.sin(k)*r,Math.cos(k),Math.sin(k),0,0],[Math.cos(L)*r,Math.sin(L)*r,Math.cos(L),Math.sin(L),0,0]])}}const D=[],v=[];let f=0;for(const c of A){for(let r=0;r<=i;r++){const u=r/i;for(const k of c)D.push(u,k[0],k[1],k[2],k[3],k[4],k[5])}for(let r=0;r<i;r++){const u=f+r*2;v.push(u,u+1,u+2,u+1,u+3,u+2)}f+=(i+1)*2}const U=e.createVertexArray();e.bindVertexArray(U);const h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,new Float32Array(D),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,3,e.FLOAT,!1,28,0),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,28,12);const b=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,b),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(v),e.STATIC_DRAW),e.bindVertexArray(null),{vao:U,count:v.length,vb:h,ib:b}}function Vo(e){const t=e.n,p=1/500,B=e.m,i=e.s0,A=9.81,D=e.T0,v=new Float64Array(t+1),f=new Float64Array(t+1),U=new Float64Array(t+1),h=new Float64Array(t+1),b=new Float64Array(t+1),c=new Float64Array(t+1),r=new Float64Array(t+1),u=new Float64Array(t+1),k=new Float64Array(t+1),L=new Float64Array(t+1),ne=new Float64Array(t+1),we=new Float64Array(t+1),Be=new Float64Array(t+1),ce=new Int32Array(t+2),ue=new Float64Array(t+2),de=new Float64Array(t+2),fe=new Float32Array(t+1);for(let I=0;I<=t;I++)Be[I]=B,fe[I]=e.rnd();Be[t]+=e.mb;const pe=I=>{let q=0;for(let le=I+1;le<=t;le++)q+=Be[le];return q*A};let mt=0;for(let I=0;I<t;I++)mt+=Math.max(0,pe(I)-D);const Ie=mt/Math.max(.05,e.L-t*i),re=.55*B*90,Ce=900,R=6,M={n:t,H:p,y:v,x:f,z:U,vy:h,vx:b,vz:c,py:L,px:ne,pz:we,k:Ie,s0:i,held:!0,topX:0,topY:0,topZ:0,topVx:0,topVy:0,topVz:0,floor:e.floor,topBlock:1,impact:0,clack:0,grabI:-1,grabX:0,grabY:0,gust:0,gustZ:0,damp:.16,acc:0,asleep:!1,e:e.e,floorN:0};M.rest=()=>{let I=e.top;v[0]=I;for(let q=0;q<t;q++){const le=Math.max(0,pe(q)-D)/Ie;I-=i+le,v[q+1]=I}f.fill(0),U.fill(0),h.fill(0),b.fill(0),c.fill(0),L.set(v),ne.set(f),we.set(U)};function Ee(){const I=p,q=M.held;r.fill(0),u.fill(0),k.fill(0);let le=v[0],Ve=f[0],Oe=U[0],tt=h[0];for(let o=0;o<t;o++){const s=v[o+1],K=f[o+1],S=U[o+1],C=h[o+1],J=le-s,H=J-i;let ie=D;H>0&&(ie+=Ie*H+re*(tt-C),ie<0&&(ie=0)),r[o]-=ie,r[o+1]+=ie;let Ae=ie/(J>.006?J:.006);Ae>Ce&&(Ae=Ce),Ae+=R,H<7e-4&&(Ae=Ce);const P=Ae*(K-Ve),Re=Ae*(S-Oe);u[o]+=P,u[o+1]-=P,k[o]+=Re,k[o+1]-=Re,le=s,Ve=K,Oe=S,tt=C}if(M.grabI>=0){const o=M.grabI,s=M.grabX-f[o],K=M.grabY-v[o],S=30*B*t;let C=s*180*B*t*.25,J=K*180*B*t*.25;const H=Math.hypot(C,J);H>S&&(C*=S/H,J*=S/H),u[o]+=C,r[o]+=J}const dt=1-M.damp*I,pt=1-(q?M.damp*1.4:.06)*I;for(let o=0;o<=t;o++){const s=I/Be[o];h[o]=(h[o]+r[o]*s-A*I)*dt,b[o]=(b[o]+(u[o]+(q?M.gust*B*(.25+o/t):0))*s)*pt,c[o]=(c[o]+(k[o]+(q?M.gustZ*B*(.25+o/t):0))*s)*pt}q&&(h[0]=M.topVy,b[0]=M.topVx,c[0]=M.topVz);let N=0;const at=2e-5,We=i+at,Le=q?1e7:Be[0];for(let o=0;o<=t;o++){let s=o===0?Le:Be[o],K=s*h[o],S=o;for(;N>0&&v[S-1]-v[S]<=We&&de[N-1]*s<K*ue[N-1];)N--,s+=ue[N],K+=de[N],S=ce[N];ce[N]=S,ue[N]=s,de[N]=K,N++}let $=t+1;if(v[t]<=M.floor+at){const o=de[N-1]/ue[N-1];if(o<-.45){const s=ce[N-1],K=t-s+1;M.impact=Math.max(M.impact,-o);for(let S=s;S<=t;S++){const C=(t-S)/Math.max(1,K-1),J=-o*M.e*(.22+.78*C)*(.72+.56*fe[S]);h[S]=J,ce[N-1]=s,b[S]+=(fe[S*7%(t+1)]-.5)*-o*.035*C,c[S]+=(fe[S*11%(t+1)]-.5)*-o*.035*C}h[t]=0,N=-1}else for(;N>0;){const s=N-1;if(de[s]/ue[s]>0||!(s===N-1&&$===t+1?!0:v[ce[s+1]-1]-v[ce[s+1]]<=We))break;$=ce[s],N--}}if(N>=0){M.topBlock=N>0?N>1?ce[1]:Math.min(t+1,$):0;for(let o=0;o<N;o++){const s=ce[o],K=(o+1<N?ce[o+1]:$)-1,S=de[o]/ue[o];if(K>s){let C=0,J=0;for(let H=s;H<=K;H++)h[H]=S,C+=b[H],J+=c[H];C/=K-s+1,J/=K-s+1;for(let H=s;H<=K;H++)b[H]+=(C-b[H])*.5,c[H]+=(J-c[H])*.5}else h[s]=S}for(let o=$;o<=t;o++)h[o]=0,b[o]=b[o]*.9+(f[t]-f[o])*.8,c[o]=c[o]*.9+(U[t]-U[o])*.8;M.floorN=t+1-$}q&&(h[0]=M.topVy,b[0]=M.topVx,c[0]=M.topVz);for(let o=0;o<=t;o++)v[o]+=h[o]*I,f[o]+=b[o]*I,U[o]+=c[o]*I;v[t]<M.floor&&(v[t]=M.floor);for(let o=t-1;o>=0;o--){const s=v[o+1]+i;v[o]<s&&(v[o]=s)}q&&(v[0]=M.topY,f[0]=M.topX,U[0]=M.topZ);const ke=e.side,he=e.zMin;for(let o=1;o<=t;o++){const s=v[o]<.03?e.xFoot:e.xRod;f[o]*ke>s?(f[o]=s*ke,b[o]*ke>0&&(b[o]=0)):v[o]<.2&&f[o]*ke<-e.xFar&&(f[o]=-e.xFar*ke,b[o]*ke<0&&(b[o]=0)),U[o]<he&&(U[o]=he,c[o]<0&&(c[o]=0))}}return M.step=Ee,M.keep=()=>{L.set(v),ne.set(f),we.set(U)},M}function Zt(e,t,p){const{P:B,U:i}=t;t.tick=t.tick||0;const A=(c,r)=>{e.deleteTexture(r.bg),e.deleteTexture(r.env),r.dead=!0,t.bakes.delete(c)};for(const[c,r]of t.bakes){if(t.bakes.size<2)break;t.tick-r.last<300||A(c,r)}for(;t.bakes.size>=10;){let c=null,r=null;for(const[u,k]of t.bakes)(!r||k.last<r.last)&&(c=u,r=k);A(c,r)}e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),e.bindVertexArray(t.vaoE),e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.activeTexture(e.TEXTURE3);const D=Ue(e,128,null,{h:64,wrapS:!0}),v=Ue(e,Ne,null,{mip:!0}),f=Ue(e,Ne,null,{});e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,D,0),e.viewport(0,0,128,64),e.useProgram(B.env),e.uniform4fv(i.env.uWall,p.envWall),e.uniform4fv(i.env.uBench,p.envBench),e.uniform4fv(i.env.uLd,p.ld),e.uniform4fv(i.env.uPool,p.pool),e.uniform1f(i.env.uSide,p.side),e.uniform1i(i.env.uN,11),e.drawArrays(e.TRIANGLE_STRIP,0,4);const U=t.wallProg(p.wtype,p.btype),h=U.u;e.useProgram(U.p),e.uniform4fv(h.U,p.bakeU),e.uniform4fv(h.uWall,p.envWall),h.uBench&&e.uniform4fv(h.uBench,p.envBench),e.uniform4fv(h.uTint,p.tint),h.uA&&e.uniform4fv(h.uA,p.wallA),h.uM&&e.uniform4fv(h.uM,p.uM),e.uniform4fv(h.uK,p.uK),e.uniform1i(h.uR3,3),e.uniform1i(h.tF,0),h.tN&&e.uniform1i(h.tN,1),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t.tF),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,t.tN),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,f,0),e.viewport(0,0,Ne,Ne),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v,0),e.useProgram(B.dof),e.uniform4fv(i.dof.U,p.bakeU),e.uniform1i(i.dof.uN,24),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,f),e.uniform1i(i.dof.tA,2),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0),e.deleteTexture(f),e.bindFramebuffer(e.FRAMEBUFFER,null),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,v),e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,null),e.activeTexture(e.TEXTURE0);const b={bg:v,env:D,last:t.tick};return t.bakes.set(p.key,b),b}Ht.add({num:214,name:"Falling Spring",fam:"Worlds",recipe:"High speed film of a long coil spring hanging on a cord in the pool of one small lamp. Let go and the turns pack solid and rush down while the bottom stays dead still until they get there. The wire, the length and the moment change every mint, and some open already falling. Tap to let go, drag to lift it back up, or pull the hanging coil to send waves along it.",interactive:"Tap to let go of the spring, drag to lift it off the bench and back up; pull the hanging coil to send waves along it.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,p=e.size;let B=-2128619261;for(let a=2;a<e.hash.length;a++)B^=e.hash.charCodeAt(a),B=Math.imul(B,16777619);const i=()=>{B=B+1831565813|0;let a=Math.imul(B^B>>>15,1|B);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},A=a=>{let n=0;for(const T of a)n+=T[1];let l=i()*n;for(const T of a)if(l-=T[1],l<=0)return T[0];return a[0][0]};let D=A([["Flat Ribbon",6],["Round Wire",3],["Wide Ribbon",1]]),v=A([["Bright Steel",6],["Oiled Black",2.2],["Tarnished",1.6],["Blued",.7]]),f=A([[84,5],[64,3],[110,1.5]]),U=A([["Even",5],["Tight",3],["Slack",1.5],["Brass Weight",1]]),h=A([["Grey Paper",2.6],["White Paper",1.6],["Putty Paint",2.4],["Sage Paint",2],["Kraft Paper",1.8],["Muslin",1.1],["Oxblood Paper",1.3],["Blackboard",1.2]]),b=A([["Slate",4],["Black Paint",3],["Rubber Mat",2],["Steel Plate",.8]]),c=A([["1/24",5],["1/16",3],["1/40",2.5],["1/90",.6]]),r=A([["Side",6],["Wide",2.5],["Close",1.5]]),u=A([["Colour",6],["Monochrome",1.4],["Faded Print",1.2]]);const k=i()<.5?1:-1;e.home&&(D="Flat Ribbon",v="Bright Steel",f=84,U="Even",h="Putty Paint",b="Slate",c="1/24",r="Side",u="Colour"),U==="Brass Weight"&&(f=64,U="Even"),g&&!e.home&&(g.wire&&(D=g.wire),g.finish&&(v=g.finish),g.coils&&(f=g.coils),g.back&&(h=g.back),g.bench&&(b=g.bench),g.stock&&(u=g.stock));let L=-1604499418;for(let a=2;a<e.hash.length;a++)L^=e.hash.charCodeAt(a),L=Math.imul(L,16777619);const ne=()=>{L=L+1831565813|0;let a=Math.imul(L^L>>>15,1|L);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296},we=ne(),Be=ne(),ce=ne(),ue=ne(),de=g&&g.drop!=null&&!e.home?g.drop:e.home?Ro:we<.4,fe=g&&g.cam!=null&&!e.home?g.cam:e.home?0:ce<.22?1:ce<.42?2:0;let pe=-1604371852;for(let a=2;a<e.hash.length;a++)pe^=e.hash.charCodeAt(a),pe=Math.imul(pe,16777619);const Ie=(()=>{pe=pe+1831565813|0;let a=Math.imul(pe^pe>>>15,1|pe);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296})();!e.home&&Ie>=.05&&Ie<.17&&(r="Raking"),g&&g.lamp&&!e.home&&(r=g.lamp),e.trait("Wire",D),e.trait("Finish",v),e.trait("Coils",f),e.trait("Hang",U+(de?", mid-drop":"")),e.trait("Backdrop",h),e.trait("Bench",b),e.trait("Film",c+(fe===1?", from below":fe===2?", close on the foot":"")),e.trait("Lamp",r),e.trait("Stock",u);const re=e.home?1:k,Ce=c==="1/16"?16:c==="1/40"?40:c==="1/90"?90:24,R=f,M=D!=="Round Wire",Ee=D==="Wide Ribbon"?.078:D==="Round Wire"?.056:.066,I=D==="Wide Ribbon"?.0075:D==="Round Wire"?.0027:.0046,q=D==="Wide Ribbon"?.0024:D==="Round Wire"?.0027:.0019,le=q*.995,Ve=i()<.5?1:-1,Oe=(R===110?.8:R===64?.45:.62)+i()*.03,tt=.006,dt=0,N=(U==="Tight"?.5:U==="Slack"?0:.33)*R*tt*9.81,at=0,We=.03+(R===64?.62-Oe:0),Le=q/2+at,$=Le+We-q/2+Oe,ke=b==="Slate"?.5:b==="Steel Plate"?.66:b==="Black Paint"?.36:.14,he=-.25-i()*.05,o=Vo({n:R,m:tt,mb:dt,s0:le,T0:N,L:Oe,top:$,floor:Le,e:ke,rnd:i,side:re,xFoot:.3,xRod:.3,zMin:he+Ee+.004,xFar:.3}),s={sub:(a,n)=>[a[0]-n[0],a[1]-n[1],a[2]-n[2]],cross:(a,n)=>[a[1]*n[2]-a[2]*n[1],a[2]*n[0]-a[0]*n[2],a[0]*n[1]-a[1]*n[0]],norm:a=>{const n=Math.hypot(a[0],a[1],a[2]);return[a[0]/n,a[1]/n,a[2]/n]},dot:(a,n)=>a[0]*n[0]+a[1]*n[1]+a[2]*n[2]},K=-.085,S=$-.0035+(de&&fe===0?.028:0),C=(S-K)/2,J=(S+K)/2,H=3.1+i()*.5,ie=re*C*(.27+i()*.08);let Ae=0,P=[ie+re*.02*i(),.19+i()*.06,H],Re=[ie,J,0];if(fe===1){P=[ie+re*(.22+.1*ue),.055,.95+.2*ue];const a=Math.hypot(P[0]-ie,P[2]),n=Math.atan2(S+.07-P[1],a),l=Math.atan2(-P[1],a-.3);Re=[ie,P[1]+Math.tan((n+l)/2+.004)*a,0],Ae=Math.tan((n-l)/2)*.985}else fe===2&&(P=[P[0]+re*(.25+.2*ue),.12+We-.03,1.7],Re=[ie-re*C*.12,K+We-.03+C*(.5+.12*ue),0]);const te=s.norm(s.sub(Re,P)),$t=(i()-.5)*.006;let G=s.norm(s.cross(te,[0,1,0])),Y=s.cross(G,te);const Xe=Math.cos($t),qe=Math.sin($t),Oo=[G[0]*Xe+Y[0]*qe,G[1]*Xe+Y[1]*qe,G[2]*Xe+Y[2]*qe],Wo=[Y[0]*Xe-G[0]*qe,Y[1]*Xe-G[1]*qe,Y[2]*Xe-G[2]*qe];G=Oo,Y=Wo;let se=C/Math.hypot(H,J-P[1]);const He=a=>{const n=s.sub(a,P),l=s.dot(n,te);return[s.dot(n,G)/(l*se),s.dot(n,Y)/(l*se),l]};fe===1?se=Ae:fe===2&&(se=C*(.5+.08*ue)/Math.hypot(...s.sub(Re,P)));const vt=fe?se*Math.hypot(...s.sub(Re,P)):C,bt=r==="Wide"?[-1.42,.62,2.18]:r==="Close"?[-.5,.44,.7]:r==="Raking"?[-1.3,.62,.3]:[-.72,.5,1.03],j=[re*bt[0],bt[1],bt[2]],Xo=r==="Wide"?.3:r==="Close"?.2:r==="Raking"?.24:.2,xt=re*C*(r==="Raking"?-.7:.3),Tt=J+C*(r==="Raking"?.15:.05),jt=(j[0]-xt)**2+(j[1]-Tt)**2+(j[2]-he)**2,qo=(j[2]-he)/Math.sqrt(jt),ge={"Grey Paper":[.34,.34,.335],"White Paper":[.62,.61,.575],"Kraft Paper":[.44,.31,.185],"Oxblood Paper":[.3,.055,.05],"Putty Paint":[.5,.465,.395],"Sage Paint":[.38,.46,.38],Muslin:[.64,.56,.43],Blackboard:[.03,.04,.036]}[h],Ho=.3*ge[0]+.59*ge[1]+.11*ge[2],go=ht(Math.sqrt(.47/Ho),.76,1.3),Jt=(r==="Wide"?1.05:r==="Close"?1.45:1.3)*go,yt=Jt*jt/qo/1.02,Ko=[1,.93,.8],Qt=[.046,.055,.075],Go=Math.hypot(...j),Yo=r==="Wide"?.018:r==="Close"?.03:.024,wt=s.norm(j),eo=re>0?-.33:Math.PI+.33,to=.32*Ve;let oo=0;{o.rest();for(let a=0;a<R;a++)oo+=(o.y[a]-o.y[a+1]-le)*to}const Ke=h.endsWith("Paper")?0:h.endsWith("Paint")?1:h==="Muslin"?2:3,ao=b==="Slate"?0:b==="Black Paint"?1:b==="Rubber Mat"?2:3;let m=gt.get(t);m||(m=Io(t,Ke,ao),gt.set(t,m));const Et=b==="Steel Plate"?[.12,.125,.13]:[.05,.052,.055],Zo=h==="Kraft Paper"?.3:h==="Grey Paper"?.1:.05,$o=Ke===0?26e-7:7e-7,jo=[i(),i(),Zo,$o],At=new Float32Array(12);{const a=Ke<2?e.home?2:1+Math.floor(i()*3):0;for(let n=0;n<3;n++)if(n<a){const l=ie+(i()-.5)*C*2.4,T=K+C*2*(.2+i()*.8),y=(Ke===0?-.5+i():i()*6.28)+(Ke===0?1.57*(i()<.5?0:1):0),O=.1+i()*.28;At.set([l,T,l+Math.cos(y)*O,T+Math.sin(y)*O],n*4)}else At.set([9,9,9.1,9],n*4)}const Rt=u==="Monochrome"?[.975,.985,1,0]:u==="Faded Print"?[1,.92,.87,.6]:[1,.99,.965,.94],no=new Float32Array([P[0],P[1],P[2],se,G[0],G[1],G[2],J+C*.15,Y[0],Y[1],Y[2],0,te[0],te[1],te[2],0,j[0],j[1],j[2],yt,he,15,Xo,xt]);no[7]=Tt;const Mt=s.norm([xt,Tt-.3,he]),ro={key:e.hash,side:re,wtype:Ke,btype:ao,envWall:[ge[0],ge[1],ge[2],1.02],envBench:[Et[0],Et[1],Et[2],1],ld:[wt[0],wt[1],wt[2],0],tint:Rt,wallA:jo,uM:At,bakeU:no,uK:new Float32Array([...Ko,0,...Qt,0]),pool:[Mt[0],Mt[1],Mt[2],Jt*.9]};let Ge=m.bakes.get(e.hash)||Zt(t,m,ro);const Ft=(M?"f":"r")+I+"_"+q;m.meshes=m.meshes||new Map,m.meshes.has(Ft)||m.meshes.set(Ft,{hi:Co(t,M?0:1,I,q,ut)});const nt=m.meshes.get(Ft),x=new Float32Array(Kt),_t=v==="Oiled Black"?[.17,.17,.18]:v==="Tarnished"?[.5,.48,.44]:v==="Blued"?[.13,.2,.4]:[.78,.79,.78],io=b==="Slate"?.2:b==="Steel Plate"?.42:b==="Black Paint"?.24:0,Ye=.5,rt=9,so=(rt+Ye)/(Ye-rt),co=2*rt*Ye/(Ye-rt),fo=1/se,Jo=[G[0],Y[0],-te[0],0,G[1],Y[1],-te[1],0,G[2],Y[2],-te[2],0,-s.dot(G,P),-s.dot(Y,P),s.dot(te,P),1],Qo=[fo,0,0,0,0,fo,0,0,0,0,so,-1,0,0,co,0];for(let a=0;a<4;a++)for(let n=0;n<4;n++){let l=0;for(let T=0;T<4;T++)l+=Qo[T*4+a]*Jo[n*4+T];x[488+n*4+a]=l}x.set([P[0],P[1],P[2],.72*Math.min(1,p/700)],504),x.set([j[0],j[1],j[2],yt],508),x.set([Ee,I,q,Ve],516),x.set([_t[0],_t[1],_t[2],0],520),x.set([R,he,0,p],524),x.set([0,0,1,1],528),x.set([0,io,0,v==="Tarnished"?1:0],532);const ea=u==="Monochrome"?.05:.04;x.set([0,0,1,ea],536),x.set(Rt,540);const ta=2*vt/p,Ut=Math.max(1,.85*ta/q),Bt=Ut>1.02;x.set([Ut,1/Ut,Math.min(1,620/p),u==="Monochrome"?0:.45],544),x.set(u==="Monochrome"?[1,1,1,0]:[.93,1,1.13,0],548);const oa=Math.max(.0016,Yo*(0-he)/Go/(2*vt*(1-he/Math.hypot(...s.sub(Re,P))))),aa=(a,n)=>{const l=2*a-1,T=1-2*n,y=[te[0]+G[0]*l*se+Y[0]*T*se,te[1]+G[1]*l*se+Y[1]*T*se,te[2]+G[2]*l*se+Y[2]*T*se],O=(0-P[2])/y[2];return[P[0]+y[0]*O,P[1]+y[1]*O]},be=0,xe=1,Se=2,Ze=3,Lt=4;let kt=!1,E=be,Me=1,Te=!1,$e=0,ze=0,St=0,lo=!1,je=6.5+i()*7,De=0,ot=!1,it=0,Pt=0,Nt=0,st=!1,ct=1,uo=0,Je=0,Qe=0,Fe=i()*40;const ho=i()*6.28,zt=i()*6.28,Dt=i()*6.28;o.rest();const na=.016+i()*.008,ra=.012+i()*.008;for(let a=1;a<=R;a++){const n=a/R;o.y[a]-=na*Math.sin(n*1.5708),o.x[a]=re*ra*Math.sin(n*1.5708)+.003*Math.sin(n*4.2),o.z[a]=.004*Math.sin(n*1.5708)}o.keep();const V={pAt:-1,pI:0,pX:0,pY:0,hold:2.6,short:!1,shortDone:!1};function mo(){const a=i();je=3+34*a*a+i()*3;const n=i();V.pAt=-1,n<.3?(V.pI=Math.floor(R*(.3+.3*i())),V.pAt=Math.max(.5,je-1.4-2.4*i())):n<.5&&(V.pI=Math.floor(R*(.75+.2*i())),V.pAt=Math.max(.5,je-.35-.5*i())),V.pX=(i()<.5?-1:1)*(.04+.05*i()),V.hold=1.5+i()*6,V.short=i()<.22,V.shortDone=!1}mo(),je=de?e.home?2.9:1.8+Be*1.9:Math.min(je,6.5+i()*7),de&&(V.pAt=-1);const It=()=>{E=xe,o.held=!1,o.damp=.02,Me=1/Ce,Te=!1,$e=0,ze=0,o.topVx=o.topVy=o.topVz=0,o.grabI=-1,o.impact=0,ct=1,o.asleep=!1,e.sound.hit("click",.9),e.sound.note(90,{dur:.5,vel:.35,wave:"triangle",pan:re*.3})},ia=()=>{kt=!!e.input.down,E=be,o.held=!0,o.damp=.16,o.topVx=o.topVy=o.topVz=0,o.x[0]=o.z[0]=0,o.y[0]=$,De=0,mo(),e.sound.hit("click",.8),e.sound.note(78,{dur:.35,vel:.28,wave:"triangle"})},Ct=()=>{E=Ze,o.held=!0,o.damp=.35,o.asleep=!1,o.topVx=o.topVy=o.topVz=0,Me=1},sa=.035,ca=.0013,po=h==="Blackboard"||h==="Oxblood Paper",fa=po?[.3,.285,.25]:[.042,.036,.03],d={att:!0,f:1,K:[0,0,0],A:[0,0,0],B:[0,0,0],from:null,sw:null},vo=a=>{const n=x[0]+(x[4]-x[0])*a,l=x[1]+(x[5]-x[1])*a,T=x[2]+(x[6]-x[2])*a,y=Ve*6.28319*a+x[3]+(x[7]-x[3])*a+x[523];return[n+Math.cos(y)*Ee,l+q*.5,T+Math.sin(y)*Ee]},ft=(a,n,l)=>[a[0]+(n[0]-a[0])*l,a[1]+(n[1]-a[1])*l,a[2]+(n[2]-a[2])*l];function bo(a,n){const l=vo(.012),T=vo(.5),y=[(l[0]+T[0])/2,Math.max(l[1],T[1])+sa,(l[2]+T[2])/2];if(E!==xe)if(d.att||(d.att=!0,d.f=0,d.from=[d.K,d.A,d.B],d.sw=null),d.f<1){d.f=Math.min(1,d.f+a/.33);const O=d.f*d.f*(3-2*d.f);d.K=ft(d.from[0],y,O),d.A=ft(d.from[1],l,O),d.B=ft(d.from[2],T,O)}else d.K=y,d.A=l,d.B=T;else{d.att&&(d.att=!1,d.sw=[d.A,d.B].map(w=>{const F=s.sub(w,d.K),ee=Math.hypot(F[0],F[1],F[2]),Z=Math.hypot(F[0],F[2])||1;return{l:ee,px:F[0]/Z,pz:F[2]/Z,ph:Math.atan2(Z,-F[1]),w:0}}));for(const w of d.sw){const F=9.81/w.l;let ee=Math.ceil(n/.004);const Z=n/Math.max(ee,1);for(;ee-- >0;)w.w+=(-F*Math.sin(w.ph)-2.4*Math.sqrt(F)*.2*w.w)*Z,w.ph+=w.w*Z}const O=w=>[d.K[0]+w.px*Math.sin(w.ph)*w.l,d.K[1]-Math.cos(w.ph)*w.l,d.K[2]+w.pz*Math.sin(w.ph)*w.l];d.A=O(d.sw[0]),d.B=O(d.sw[1])}}const la=a=>Math.pow(1-Math.exp(-a*1.25),1/2.2),ua=a=>{const n=Rt,l=.3*a[0]+.59*a[1]+.11*a[2],T=n[3]<.01?1:0,y=Math.max(.97-n[1],0)*1.3,O=[1,.84,.86];return a.map((w,F)=>(w=(l+(w-l)*n[3])*n[F],w+=(w*w*(3-2*w)-w)*(.32+.4*T),w*(.965-y*.6)+.02-.013*T+y*O[F]))},Pe=m.U.line;function Vt(a,n,l){let T=a,y=n,O=ca;if(l){const z=_=>{const X=s.sub(_,j),Q=(he-_[2])/X[2],me=X[1]<0?-_[1]/X[1]:1e3,ae=Math.min(Q<0?1e3:Q,me);return[_[0]+X[0]*ae,_[1]+X[1]*ae,_[2]+X[2]*ae]};T=z(a),y=z(n),O*=Math.hypot(...s.sub(T,j))/Math.max(Math.hypot(...s.sub(a,j)),.01)}const w=He(T),F=He(y);if(w[2]<Ye||F[2]<Ye)return;const ee=l?ye:p,Z=.5*O/((w[2]+F[2])*.5*se)*ee/2,ve=Math.max(Z,l?.75:p>=600?1.1:.55),oe=ve+.5,W=z=>-so+co/z;if(t.uniform4f(Pe.uAB,w[0],w[1],F[0],F[1]),t.uniform4f(Pe.uW,oe*2/ee,0,W(w[2])-2e-5,W(F[2])-2e-5),l)t.uniform4f(Pe.uP,oe,Math.min(1,Z/ve),0,p);else{const z=[F[0]-w[0],F[1]-w[1]],_=Math.hypot(z[0],z[1])||1,X=[-z[1]/_,z[0]/_],Q=s.norm([G[0]*X[0]+Y[0]*X[1],G[1]*X[0]+Y[1]*X[1],G[2]*X[0]+Y[2]*X[1]]),me=ft(a,n,.5),ae=s.sub(j,me),lt=s.dot(ae,ae),ma=s.norm(ae),Xt=qt=>{const ba=s.norm([qt*.8*Q[0]-.6*te[0],qt*.8*Q[1]-.6*te[1],qt*.8*Q[2]-.6*te[2]]),xa=Math.max(s.dot(ba,ma),0)+.06,Ta=[1,.97,.92];return ua(fa.map((ya,Ao)=>la(ya*(Qt[Ao]*1.6+Ta[Ao]*yt/lt*xa))))},da=Xt(-1),pa=Xt(1),va=Xt(0);t.uniform3fv(Pe.uC0,da),t.uniform3fv(Pe.uC1,pa),t.uniform3fv(Pe.uCM,va),t.uniform4f(Pe.uP,oe,0,po?-1:1,p)}t.drawArrays(t.TRIANGLE_STRIP,0,4)}function Ot(a){t.useProgram(m.P.line),t.bindVertexArray(m.vaoE),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,Ge.bg),t.uniform1i(Pe.tB,3),t.activeTexture(t.TEXTURE0),Vt(d.K,[d.K[0],d.K[1]+1.6,d.K[2]],a),Vt(d.K,d.A,a),Vt(d.K,d.B,a)}const Wt=t.TRIANGLE_STRIP;m.posts=m.posts||new Map,m.posts.has(p)||(t.activeTexture(t.TEXTURE0),m.posts.set(p,Ue(t,p,null,{})),t.bindTexture(t.TEXTURE_2D,null));const ha=m.posts.get(p);function xo(a){const n=o.y,l=o.x,T=o.z,y=o.py,O=o.px,w=o.pz,F=1-a;let ee=0,Z=0;const ve=eo-oo;for(let oe=R;oe>=0;oe--){const W=y[oe]*F+n[oe]*a;oe<R&&(ee+=(Z-W)*-1-le),Z=W;const z=oe*4;x[z]=O[oe]*F+l[oe]*a,x[z+1]=W,x[z+2]=w[oe]*F+T[oe]*a,x[z+3]=ee*to}x[523]=ve}function To(){Ge.dead&&(Ge=m.bakes.get(e.hash)||Zt(t,m,ro)),Ge.last=m.tick=(m.tick||0)+1,t.bindBufferBase(t.UNIFORM_BUFFER,0,m.ubo),t.bindBuffer(t.UNIFORM_BUFFER,m.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,x),t.bindBuffer(t.UNIFORM_BUFFER,null),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.colorMask(!0,!0,!0,!0);const a=m.P.shadow,n=m.U.shadow;t.bindFramebuffer(t.FRAMEBUFFER,m.fbM),t.viewport(0,0,ye,ye),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(a),t.bindVertexArray(m.shadowStrip.vao),t.uniform1f(n.uTx,2*vt*1.1/ye),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.uniform4f(n.uL,j[0],j[1],j[2],0),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,m.shadowStrip.count,R),Ot(1),t.disable(t.BLEND),t.bindVertexArray(m.vaoE),t.bindFramebuffer(t.FRAMEBUFFER,m.fbS),t.viewport(0,0,ye,ye),t.useProgram(m.P.blur),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,m.tM),t.uniform1i(m.U.blur.tM,0),t.uniform1f(m.U.blur.uR,oa),t.drawArrays(Wt,0,4),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,p,p),t.depthMask(!0),t.clearDepth(1),t.clear(t.DEPTH_BUFFER_BIT),t.depthMask(!1),t.useProgram(m.P.bg);const l=m.U.bg;t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Ge.bg),t.uniform1i(l.tB,0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,m.tS),t.uniform1i(l.tM,1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,m.tN),t.uniform1i(l.tN,2),t.drawArrays(Wt,0,4),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,Ge.env),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,m.tF);const T=m.P.coil,y=m.U.coil;if(t.useProgram(T),t.uniform1i(y.tE,0),t.uniform1i(y.tF,1),t.uniform1i(y.uFirst,0),t.bindVertexArray(nt.hi.vao),io>0){const O=Math.max(0,R-60);t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),t.uniform1i(y.uMode,2),t.uniform1i(y.uFirst,O),t.drawElementsInstanced(t.TRIANGLES,nt.hi.count,t.UNSIGNED_SHORT,0,R-O),t.uniform1i(y.uFirst,0),t.disable(t.BLEND)}Bt&&(t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),Ot(0),t.disable(t.BLEND)),t.useProgram(T),t.uniform1i(y.uMode,0),Bt?(t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE)):(t.enable(t.DEPTH_TEST),t.depthFunc(t.LESS),t.depthMask(!0)),t.bindVertexArray(nt.hi.vao),t.drawElementsInstanced(t.TRIANGLES,nt.hi.count,t.UNSIGNED_SHORT,0,R),t.disable(t.BLEND),Bt||(t.depthMask(!1),t.enable(t.BLEND),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE),Ot(0),t.disable(t.BLEND)),t.disable(t.DEPTH_TEST),t.depthMask(!1),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,ha),t.copyTexSubImage2D(t.TEXTURE_2D,0,0,0,0,0,p,p),t.useProgram(m.P.post),t.uniform1i(m.U.post.tS,0),t.uniform1i(m.U.post.tN,2),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,m.tN),t.bindVertexArray(m.vaoE),t.drawArrays(Wt,0,4),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,null),t.bindVertexArray(null)}function yo(){const a=He([o.x[R],0,o.z[R]]),n=He([o.x[R]+Ee,0,o.z[R]]),l=He([o.x[R],0,o.z[R]+Ee]);x[528]=a[0],x[529]=a[1],x[530]=Math.hypot(n[0]-a[0],n[1]-a[1])*1.12,x[531]=Math.max(Math.abs(l[1]-a[1]),.006)*1.12,x[532]=.55*Math.exp(-(o.y[R]-Le)/.012)}function wo(){x[536]=45e-5*Math.sin(Fe*1.13+ho)+(i()-.5)*35e-5,x[537]=6e-4*Math.sin(Fe*.79+zt)+(i()-.5)*5e-4,x[538]=1+.004*Math.sin(Fe*2.3+Dt)+(i()-.5)*.003}xo(1),bo(0,0),yo(),wo(),x[526]=0,To();let Eo=0;return(a,n)=>{n=Math.min(n,.12),Eo++;const l=e.input,T=l.taps(),y=!!l.down,O=T.length>0;O||y?(lo=!0,St=0):St+=n,y&&!ot&&(it=0,Pt=l.x,Nt=l.y,st=!1),y&&(it+=n,Math.hypot(l.x-Pt,l.y-Nt)>.025&&(st=!0));const w=!y&&ot&&it<.38&&!st||O&&!y&&!ot;if(y||(kt=!1),!kt)if(w)E===be?It():E===Se?(E=xe,o.held=!1,o.damp=.02,Ct()):E===xe&&(Te||o.floorN>0)&&Ct(),o.grabI=-1;else if(y&&(st||it>.38)){const[W,z]=aa(l.x,l.y);if(E===be&&o.grabI<0){let _=1,X=1e9;for(let Q=1;Q<=R;Q++){const me=He([o.x[Q],o.y[Q],o.z[Q]]),ae=Math.hypot((me[0]+1)/2-Pt,(1-me[1])/2-Nt);ae<X&&(X=ae,_=Q)}o.grabI=_}if(E===be){const _=o.grabI,X=W-o.x[0],Q=o.y[0]-o.y[_],me=Math.min(.17,.1+Q*.12);o.grabX=ht(X,-me,me),o.grabY=ht(z,o.y[_]-.12,o.y[_]+.12)}if((E===xe||E===Ze)&&(E=Se,o.held=!0,o.damp=.35,o.asleep=!1,Me=1,o.topVx=o.topVy=o.topVz=0,Je=o.x[0],Qe=o.y[0]),E===Se){const _=W-Math.cos(eo)*Ee,X=Math.min($+.25,Math.max(z,Le+R*le)),Q=_-Je,me=X-Qe,ae=Math.hypot(Q,me),lt=Math.min(ae,1.5*n);ae>1e-6&&(Je+=Q/ae*lt,Qe+=me/ae*lt),Math.hypot(Je,Qe-$)<.055&&(E=Lt)}}else!y&&ot&&(E===Se&&(E=xe,o.held=!1,o.damp=.02,Me=1/Ce,Te=!1,$e=0,ze=0,o.impact=0,o.topVx=o.topVy=o.topVz=0,ct=1,e.sound.hit("click",.4)),o.grabI=-1);ot=y,!lo||St>22?(E===be&&(De+=n,V.pAt>=0&&De>V.pAt&&De<V.pAt+.45?(o.grabI<0&&(o.grabI=V.pI,V.pY=o.y[V.pI]),o.grabX=o.x[0]+V.pX,o.grabY=V.pY):V.pAt>=0&&De>=V.pAt+.45&&o.grabI>=0&&(o.grabI=-1,V.pAt=-1),De>je&&It()),E===xe&&ze>V.hold&&Ct(),E===Ze&&V.short&&!V.shortDone&&o.y[0]>Le+($-Le)*.45&&(V.shortDone=!0,V.hold=1+i()*2.5,It())):E===be&&(De=0),E===xe?Te&&($e+=n,$e>.45&&(Me+=(1-Me)*Math.min(1,n*2.2))):Me+=(1-Me)*Math.min(1,n*6);const F=n*Me;Fe+=n,o.gust=.05*Math.sin(Fe*.63+ho)*Math.sin(Fe*.23+zt)+.018*Math.sin(Fe*1.37+Dt),o.gustZ=.035*Math.sin(Fe*.47+zt)*Math.sin(Fe*.19+Dt);let ee=o.x[0],Z=o.y[0],ve=o.z[0];if((E===Ze||E===Se)&&(!d.att||d.f<1))E===Se&&(Je=o.x[0],Qe=o.y[0]);else if(E===Ze){const W=Math.min(.62,.1+($-o.y[0])*2.2);Z+=W*F,ee*=1-Math.min(1,F*3),ve*=1-Math.min(1,F*3),$-Z<.002&&(Z=$,E=Lt)}else if(E===Se)ee=Je,Z=Qe,ve=0;else if(E===Lt){const W=Math.min(1,F*14);ee+=-ee*W,Z+=($-Z)*W,ve+=-ve*W,Math.abs($-Z)+Math.abs(ee)+Math.abs(ve)<.0015&&ia()}if(o.asleep)E===xe&&(ze+=n);else{o.acc+=F;let W=Math.floor(o.acc/o.H);if(W>100?(W=100,o.acc=0):o.acc-=W*o.H,W>0&&o.held&&E!==be){const z=(ee-o.x[0])/(W*o.H),_=(Z-o.y[0])/(W*o.H),X=(ve-o.z[0])/(W*o.H);o.topVx=z,o.topVy=_,o.topVz=X}for(let z=0;z<W;z++)z===W-1&&o.keep(),o.held&&E!==be?(o.topX=o.x[0]+o.topVx*o.H,o.topY=o.y[0]+o.topVy*o.H,o.topZ=o.z[0]+o.topVz*o.H):E===be&&(o.topX=0,o.topY=$,o.topZ=0,o.topVx=o.topVy=o.topVz=0),o.step();if(E===xe){if(!Te&&o.topBlock>ct){const _=o.topBlock;e.sound.note(66+18*_/R,{dur:.05,vel:.16+.1*_/R,wave:"triangle",cutoff:2600}),ct=_}if(o.impact>0&&!Te){Te=!0,$e=0;const _=Math.min(1,o.impact/3);e.sound.hit("kick",.9*_),e.sound.hit("noise",.6*_,{cutoff:b==="Rubber Mat"?500:2400,dur:.3}),b==="Steel Plate"&&e.sound.note(84,{dur:1.2,vel:.3*_,wave:"sine"}),b==="Slate"&&e.sound.hit("snare",.35*_)}o.floorN>R*.94&&!Te&&(Te=!0,$e=0);let z=0;for(let _=0;_<=R;_+=3){const X=Math.abs(o.vy[_]);X>z&&(z=X)}ze=Te&&z<.012?ze+n:0,ze>.7&&(o.asleep=!0)}else(E===Ze||E===Se)&&o.floorN<uo&&o.floorN>0&&e.sound.note(64+14*(1-o.floorN/R),{dur:.04,vel:.1,wave:"triangle",cutoff:2200});uo=o.floorN}xo(o.acc/o.H),bo(n,F),yo(),wo(),x[526]=Eo%97,To()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
