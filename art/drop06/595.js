// Golden Larches: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/595.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(je){je&&function(){"use strict";const vt={yaw:0,pitch:0,x:0,y:0,z:0},dt=0,Ye=[[.56,.5,.42],[1.02,.83,.57],[.195,.27,.285],[.07,.1,.175]],ht=[[.82,.8,.6],[1.05,.84,.58],[.2,.38,.44],[.055,.14,.29]],De={az:-2.28,el:.086,sc:[2.15,1.24,.42],sky:Ye,glow:1,rose:1,cir:1,stars:0,exp:.98,sk:1,hzc:[.46,.62,.92],moon:1,drift:1,warm:1},xt={"Last sun on the tops":De,"Sun still on the upper forest":Object.assign({},De,{el:.158}),"Morning side light":{az:1.2,el:.15,sc:[2.25,1.9,1.2],sky:[[.47,.53,.6],[1,.92,.74],[.165,.29,.37],[.05,.11,.23]],glow:.55,rose:0,cir:1,stars:0,exp:.95,sk:1,hzc:[.55,.66,.88],drift:-1,warm:.8,rib:2,ribP:[.004,.008,.6,6],ribC:[.96,.95,.9,.72]},"First sun, mist on the lake":{az:1.55,el:.032,elo:-.05,sc:[2.5,1.3,.72],sky:[[.4,.44,.57],[1,.72,.6],[.15,.21,.33],[.045,.07,.17]],glow:.7,rose:.6,cir:1,stars:0,exp:1.05,sk:.78,hzc:[.42,.52,.76],drift:-1,warm:.5,rib:1,ribP:[.01,.02,.95,4],ribC:[1.02,1,.98,.7]},"Grey first-snow day":{az:-2.28,el:.3,sc:[0,0,0],sky:[[.5,.51,.53],[.52,.52,.52],[.44,.455,.48],[.34,.36,.4]],glow:0,rose:0,cir:0,stars:0,exp:1.18,sk:1.25,kh:.5,hzc:[.5,.53,.58],cb:1480,snow:1,grey:1,drift:0,warm:.45,rib:2},"Clear after snowfall":{az:-1.35,el:.33,sc:[2,1.92,1.78],sky:[[.42,.55,.72],[.7,.76,.82],[.09,.2,.4],[.02,.055,.19]],glow:.3,rose:0,cir:0,stars:0,exp:.9,sk:1,hzc:[.5,.64,.95],snow:1,drift:0,warm:.7},"Flat noon blue":{az:-2.75,el:.85,sc:[1.95,1.88,1.72],sky:[[.48,.6,.74],[.6,.7,.8],[.11,.26,.5],[.025,.08,.28]],glow:.1,rose:0,cir:1,stars:0,exp:.85,sk:1,hzc:[.52,.66,.95],drift:0,warm:.7,rib:2,shadows:1},Afterglow:{az:-2.28,el:.005,sc:[1.1,.42,.42],sky:[[.2,.19,.3],[.95,.55,.42],[.08,.09,.19],[.02,.025,.07]],glow:.6,rose:3.5,cir:0,stars:1,exp:1.5,sk:.6,hzc:[.3,.32,.52],moon:1,drift:0,warm:.35},"Storm light":{az:-2,el:.13,sc:[2.8,1.7,.65],sky:[[.2,.2,.25],[.9,.72,.5],[.11,.11,.155],[.07,.07,.1]],glow:.8,rose:0,cir:0,stars:0,exp:1,sk:.8,hzc:[.3,.33,.43],drift:0,warm:1,patch:1}},Ze={keep:44,"Morning side light":12,"First sun, mist on the lake":8,"Grey first-snow day":10,"Clear after snowfall":8,"Flat noon blue":8,Afterglow:6,"Storm light":4},Je={"On the stones":56,"Along the shore":26,"From the bank":18};let pt=0;const wt=(e,t)=>{const R=typeof location<"u"?new URLSearchParams(location.search).get("f595"):null;if(!R)return!1;const m={};for(const p of R.split(",")){const[N,re]=p.split(":");m[N]=re}if(m.off)return"off";if(t&&!m.home)return!1;const l=t?0:pt++,v=p=>Object.keys(p),S=(p,N)=>N==="*"?v(p)[l%v(p).length]:/^\d+$/.test(N)?v(p)[+N]:N;m.lt&&(e.lt=S(Ze,m.lt)),m.sp&&(e.sp=S(Je,m.sp));for(const p of["air","sn","side","cs"])m[p]!=null&&(e[p]=+m[p]);return!0},oe=Math.PI,U=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,bt=U+"out vec2 vQ; void main(){ vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2)); vQ = p; gl_Position = vec4(p * 2. - 1., 0., 1.); }",ce=`
uniform sampler2D uN;
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.).r; }
float vg(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.).g; }
float fbm(vec2 p, int o){ float s=0., a=.5; for(int i=0;i<o;i++){ s+=a*vn(p); p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(17.3,9.1); a*=.5; } return s; }
float rdg(vec2 p, int o){ float s=0., a=.5; for(int i=0;i<o;i++){ float v=1.-abs(2.*vn(p)-1.); s+=a*v*v; p=mat2(1.7,1.1,-1.1,1.7)*p+vec2(7.3,21.1); a*=.52; } return s; }
float at2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-9)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
float sm(float a,float b,float x){ float t=clamp((x-a)/(b-a),0.,1.); return t*t*(3.-2.*t); }
`,$e=`
uniform float uSeed;
float zSh(float x){ float X=x+uSeed*37.; return 6.5+1.5*sin(X*.21+.4)+.7*sin(X*.57+2.6)+2.6*(1.-sm(-9.,1.,X))+x*x*2.5e-5; }
float nearH(vec2 p){
  float s=zSh(p.x)-p.y;
  float h = s>0. ? s*(.14+.10*sm(0.,22.,s)) : s*.15;
  h=max(h,-9.);
  h+=(vn(p*.6)-.5)*.32+(vn(p*1.7+3.)-.5)*.13;
  return h;
}
`,yt=`
uniform vec4 uSk; // sun dir, sky brightness
uniform vec4 uK[4]; // the light's sky: low away from the sun (w: glow), low toward it (w: rose), middle, zenith
vec3 sky(vec3 d){
  vec3 s=uSk.xyz; float e=max(d.y,0.);
  vec2 hd=normalize(d.xz+vec2(1e-5,0.)), sd=normalize(s.xz);
  float ca=clamp(dot(hd,sd),-1.,1.), w=ca*.5+.5;
  vec3 zen=uK[3].rgb, mid=uK[2].rgb;
  vec3 hor=mix(uK[0].rgb, uK[1].rgb, pow(w,2.4));
  vec3 c=mix(hor,mid,sm(0.,.66,pow(e,.62)));
  c=mix(c,zen,sm(.25,1.,e));
  c+=vec3(-.02,.05,-.005)*exp(-pow((e-.16)/.09,2.));
  float aw=pow(1.-w,2.);
  c+=vec3(.24,.08,.1)*aw*exp(-pow((e-.085)/.06,2.))*uK[1].w;
  c+=uK[1].rgb*vec3(.71,.45,.21)*exp(-e/.08)*pow(w,5.)*uK[0].w;
  return c*uSk.w;
}
`,Et=U+ce+$e+`
uniform vec2 uOff; uniform vec4 uV; in vec2 vQ; out vec4 o; // uV: mirror the far wall, spur gain, side valley centre x (0 = none)
float zsf(float x){ return 860.+300.*sin(x*.0007+.9)+1500.*sm(400.,6500.,x)-1100.*(1.-sm(-5000.,-1000.,x)); }
float T(vec2 w0){
  vec2 w=w0; if(uV.x>.5) w.x=-w.x; if(uV.y>1.) w.x+=640.; // ranks: slide the spurs off the view axis
  vec2 p=w+uOff;
  float zs=zsf(w.x), d=w.y-zs;
  float up=1.-exp(-max(d,0.)/1500.);
  float crest=(.82+.36*vn(vec2(p.x*.00052,3.)))*(1.-.72*sm(200.,2800.,w.x));
  float rf=rdg(p*.00072,5)*(1.-.55*sm(200.,2800.,w.x)), gu=rdg(p*vec2(.0052,.0011)+7.,3);
  float hf=1620.*pow(up,1.1)*crest + 520.*up*rf - 80.*up*(1.-up)*2.*gu;
  float rk=step(1.,uV.y-.01); // ranks of spurs: real ridges climbing from the lake to rock above the trees, the wall behind
  if(rk>.5){ float u2=sm(600.,6500.,d); hf=1.3*(1620.*pow(u2,1.25)*crest+520.*u2*rf)-160.*u2*(1.-u2)*gu; } // the wall stands back
  hf+=(fbm(p*.009,5)-.5)*40.*sm(0.,300.,d);
  if(d<0.) hf=d*.06-4.;
  float sp=0.;
  for(int i=0;i<5;i++){
    float k=float(i), xi=-1500.+k*1320.+k*k*80., z0=zsf(xi)-520.;
    float s=w.y-z0, ax=xi-s*1.5, wxs=mix(w.x,1280.-w.x,rk); // ranks: the spurs run back to the right, so each turns a shaded face to the eye under a sun from the left
    float n=.62+.75*(vn(p*.0011+k*3.)*.65+vn(p*.0034+k*3.)*.35);
    float a=(470.-k*26.)*exp(-abs(w.x-ax)/(460.+k*90.))*n*sm(z0,z0+850.,w.y)*(1.-sm(z0+2600.,z0+5200.,w.y));
    if(rk>.5){
      // a crest that climbs from a low toe in the water to summits and notches, flanks cut by gullies down the fall line, a fanned foot
      float dx=(wxs-ax)*.555, W=260.+k*55.+.11*max(s,0.)+260.*(1.-sm(-300.,700.,s));
      float cr=(1500.-k*40.)*(.1+.9*sm(-100.,3800.,s-260.))*(.72+.56*rdg(vec2(s*.0012+k*5.1,k*2.3),2));
      float f=exp(-(sqrt(dx*dx+.16*W*W)-.4*W)/W), gl2=rdg(vec2(s*.0062+k*1.7,dx*.0016),2);
      a=cr*f*(1.-.55*f*(1.-f)*4.*gl2)*sm(z0,z0+600.,w.y)*(1.-sm(z0+2400.,z0+5000.,w.y));
    }
    sp=max(sp,a);
  }
  hf=max(hf,sp*(.86+.3*rf)*mix(uV.y,1.,rk));
  if(uV.z!=0.){ float zz=w.y-zsf(uV.z), g=exp(-pow((w.x-uV.z-zz*.55)/430.,2.))*sm(-400.,500.,zz); hf=mix(hf,min(hf,30.+max(zz,0.)*.075+(rf-.3)*90.*up),g); } // a side valley running back into the range
  hf+=(760.*sm(8200.,13500.,w.y)+1250.*sm(3600.,7800.,w.y)*sm(900.,3800.,w.x))*(.55+.9*rdg(p*.00017+3.,4));
  // the valley's head: the lake ends and a range closes the view 6 to 10 km down the lake (on both shores' sides of you)
  float vh=sm(5000.,8000.,w.x+500.*(vn(vec2(w.y*.0007,5.))-.5)), head=40.+1900.*sm(5000.,9000.,w.x)*(.4+1.1*rf);
  float nb=clamp(nearH(w0),-9.,42.);
  vec2 p0=w0+uOff;
  float hb=880.*sm(0.,4200.,-w0.y)*(.8+.3*vn(vec2(p0.x*.0006,11.)))+(rdg(p0*.0011,5)-.27)*560.*sm(0.,3000.,-w0.y);
  if(w0.y<0.) nb+=hb+max(0.,-w0.y-120.)*.05;
  float r=mix(nb,hf,sm(100.,700.,w0.y));
  return mix(r,max(r,head),vh);
}
void main(){ vec2 w=vec2(-10000.,-5000.)+vQ*20000.;
#ifdef PACK
  float t=clamp((T(w)+200.)/3600.,0.,1.); o=vec4(floor(t*255.)/255.,fract(t*255.),0.,1.);
#else
  o=vec4(T(w),0.,0.,1.);
#endif
}
`,Ne=`
const float PI=3.14159265, EM=.62;
uniform vec4 uWp; uniform vec2 uEl; // warp: view centre azimuth, front half-angle, its half-width in u, texel angle; elevation knee, its v
vec3 azDir(float az,float el){ return vec3(sin(az)*cos(el),sin(el),cos(az)*cos(el)); }
// the front of the panorama gets most of its texels (16 to 40 per degree), the back the rest
float u2az(float u){ float A=uWp.y, F=uWp.z, B=.5-F; return uWp.x+(u<B ? -PI+u*((PI-A)/B) : u<.5+F ? -A+(u-B)*(A/F) : A+(u-.5-F)*((PI-A)/B)); }
float azU(float a){ a-=uWp.x; a-=6.2831853*floor(a/6.2831853+.5); float A=uWp.y, F=uWp.z, B=.5-F; return a<-A ? (a+PI)*(B/(PI-A)) : a<A ? B+(a+A)*(F/A) : .5+F+(a-A)*(B/(PI-A)); }
float v2el(float v){ return v<uEl.y ? v/uEl.y*uEl.x : uEl.x+(v-uEl.y)/(1.-uEl.y)*(EM-uEl.x); }
float el2v(float e){ return e<uEl.x ? e/uEl.x*uEl.y : uEl.y+(e-uEl.x)/max(EM-uEl.x,1e-4)*(1.-uEl.y); }
`,Tt=U+ce+yt+Ne+`
uniform sampler2D uH, uFn;
uniform vec4 uA, uB, uC, uSC, uHP, uL, uSe; // uHP: haze colour; uL: haze in-scatter, sun transmission power, cloud base, snow line's waver; uSe: the season by height
uniform vec3 uE;
uniform vec4 uRb[2]; // a level bank of mist or low cloud: elevation, half-depth, amount, scale along the wall; its lit colour, its underside
uniform float uMode, uNR;
in vec2 vQ; out vec4 o;
#define E uE
#ifdef PACK
float dec(ivec2 i){ vec4 c=texelFetch(uH,clamp(i,ivec2(0),ivec2(1023)),0); return (c.r+c.g/255.)*3600.-200.; }
float mapH(vec2 p){ vec2 q=(p+vec2(10000.,5000.))/20000.*1024.-.5; ivec2 i=ivec2(floor(q)); vec2 f=q-floor(q); return mix(mix(dec(i),dec(i+ivec2(1,0)),f.x),mix(dec(i+ivec2(0,1)),dec(i+ivec2(1,1)),f.x),f.y); }
#else
float mapH(vec2 p){ return textureLod(uH,(p+vec2(10000.,5000.))/20000.,0.).r; }
#endif
float hh(vec2 p){ return mapH(p); }
float treeLn(vec2 xz){ return uA.y+95.*(vn(xz*.0034)-.5); }
void main(){
  float az=u2az(vQ.x), el=v2el(vQ.y);
  vec3 rd=azDir(az,el);
  float t=9., tp=t; bool hit=false;
  for(int i=0;i<170;i++){
    vec3 p=E+rd*t;
    if(p.y>2900.||t>21000.||abs(p.x)>9990.||p.z<-4990.||p.z>14990.) break;
    float dh=p.y-hh(p.xz);
    if(dh<0.){ hit=true; break; }
    tp=t; t+=max(dh*.42,max(.018*t,.9));
  }
  vec3 hz=mix(sky(vec3(rd.x,.03,rd.z)),uHP.rgb,.62);
  vec3 col=hz; float cov=0.; vec3 sunRatio=vec3(0.); float thr=0.;
  if(hit){
    float a=tp,b=t;
    for(int i=0;i<8;i++){ float m=.5*(a+b); vec3 p=E+rd*m; if(p.y<hh(p.xz)) b=m; else a=m; }
    t=b; vec3 P=E+rd*t;
    float e=max(.0009*t,1.)*22.;
    float h0=hh(P.xz);
    float exm=hh(P.xz-vec2(e,0.)), exp_=hh(P.xz+vec2(e,0.)), ezm=hh(P.xz-vec2(0.,e)), ezp=hh(P.xz+vec2(0.,e));
    vec3 n=normalize(vec3(exm-exp_,2.*e,ezm-ezp));
    vec3 n0=n; float n0y=n.y;
    // the broad form around the point: its normal (for the crowns' layout) and its curvature (gullies hollow, ribs proud)
    float eq=max(e*5.,140.), hxm=hh(P.xz-vec2(eq,0.)), hxp=hh(P.xz+vec2(eq,0.)), hzm=hh(P.xz-vec2(0.,eq)), hzp=hh(P.xz+vec2(0.,eq));
    vec2 nq=vec2(hxm-hxp,hzm-hzp); float wq=nq.y*nq.y/max(dot(nq,nq),1e-3), cq=(mix(ezm+ezp,exm+exp_,wq)*.5-h0)/e; // hollow across the fall line, at the normal's own scale: gullies, not whole valleys
    float nd=vn(P.xz*.1)-.5;
    // the fine relief: two lookups of the baked tile (its mips fade it with distance); the forest canopy softens it
    vec4 fA=texture(uFn,P.xz/640.), fB=texture(uFn,mat2(.8,.6,-.6,.8)*P.xz/1664.+.37);
    vec2 G0=-n0.xz/max(n0.y,.08), gf=(fA.gb-.5)*3.4+mat2(.8,-.6,.6,.8)*(fB.gb-.5)*4.2;
    float fh=fA.r*.4+fB.r*.6;
    n=normalize(vec3(-(G0.x+gf.x),1.,-(G0.y+gf.y)));
    vec3 nF=normalize(vec3(-(G0.x+.3*gf.x),1.,-(G0.y+.3*gf.y)));
    float y=h0, slope=1.-nF.y, slR=1.-n.y; // the tree line by the canopy's slope; snow and grass by the ground's own
    float tl=treeLn(P.xz)-slope*260.;
    float crag=sm(.7,.82,(.5+.5*sin(y*.052+2.4*sin(dot(P.xz,vec2(.0058,.0036)))+7.*fB.r))*.55+fA.r*.55)*sm(.42,.62,fB.r+.3*fA.r)*sm(.26,.4,slope+.25*sm(0.,-.05,cq))*sm(80.,260.,y)*sm(300.,900.,t)*mix(.4,1.,uC.w); // full on the ranks' spurs; lighter on the walls, whose gold is their picture
    float tr=sm(tl+28.,tl-28.,y)*(1.-sm(.5,.72,slope))*(1.-crag);
    float fbA=fbm(P.xz*.033,4);
    float dry=vn(P.xz*.0063)*.42+.34*fbA+.24*vn(P.xz*.21);
    // larch paler and higher; spruce in the gullies and the low shade
    float lar=sm(.44,.56,dry+y/2300.+uA.z*.6-.16);
    float ind=vn(P.xz*.021)*.6+vn(P.xz*.053)*.4;
    // the season is a pattern by height: soft green low, gold, rust, then bare crowns at the top (.6 is full gold)
    vec3 larG=mix(mix(vec3(.7,.37,.04),vec3(.94,.57,.06),ind*ind)*1.08,vec3(.74,.36,.04),.05);
    float ssn=uSe.x+uSe.y*clamp(y/uA.y,0.,1.3)-uSe.w*(1.-sm(.0,.2,y/uA.y))+uSe.z*(ind-.5+.6*nd);
    vec3 larch=ssn<.6 ? mix(mix(vec3(.2,.25,.06),vec3(.46,.42,.07),sm(.0,.3,ssn)),larG,sm(.3,.6,ssn)) : mix(mix(larG,vec3(.6,.21,.03),sm(.6,.82,ssn)),vec3(.15,.12,.09),sm(.84,1.,ssn));
    float bareC=sm(.86,1.02,ssn);
    vec3 spr=vec3(.022,.037,.022)*(1.+ind*.8); // Arolla pine: near-black green
    // rock, scree, tawny alp above the trees
    float rs=vn(P.xz*vec2(.012,.006)+vec2(y*.005,0.))*.5+vn(P.xz*vec2(.04,.018))*.3+vn(P.xz*.13)*.2;
    float gl=sm(.32,.0,abs(vn(P.xz*vec2(.03,.006))*.6+vn(P.xz*vec2(.07,.014))*.4-.5));
    vec3 rock=mix(vec3(.16,.14,.13),vec3(.36,.32,.28),rs)*(.6+.8*vn(P.xz*.05))*mix(.72,1.08,gl)*(.7+.6*fh);
    float scr=sm(.46,.7,fbA);
    rock=mix(rock,vec3(.34,.32,.3),scr*.6);
    float alpM=(1.-sm(tl+25.,tl+120.,y))*sm(.42,.1,slR);
    vec3 alp=mix(vec3(.3,.23,.1),vec3(.2,.16,.07),rs);
    vec3 bare=mix(rock,alp,alpM);
    // low ground near the eye
    float nearG=1.-sm(120.,220.,t);
    bare=mix(bare,mix(vec3(.05,.05,.035),vec3(.13,.12,.09),vn(P.xz*.5)),nearG);
    // the stand: meadows and avalanche tracks open it; crowns laid out in (across the view, height) metres
    // the world axis nearer the slope's contour; across the view it counts at its foreshortened width
    vec2 lax=abs(nq.y)>abs(nq.x)*(.85+.3*vn(P.xz*.004)) ? vec2(1.,0.) : vec2(0.,1.), rg2=normalize(vec2(rd.z,-rd.x));
    float lat=dot(P.xz,lax), fz=max(abs(dot(lax,rg2)),.45);
    float fac=sm(.3,.62,dot(normalize(n0.xz+vec2(1e-5,0.)),-normalize(rd.xz))); // crowns and tracks only where the slope faces you
    float mdw=sm(.66,.78,vn(P.xz*.0042)*.6+vn(P.xz*.011+5.)*.4);
    // avalanche tracks: straight down the fall line from the tree line, wider below, one in a few 170 m columns
    float tc=floor(P.x/170.); vec4 tq=texelFetch(uN,ivec2(int(tc)*5+77,31)&255,0);
    float tw=4.+6.*tq.y+.008*max(tl-y,0.), tx=(tc+.25+.5*tq.x)*170.+14.*(vn(vec2(y*.006,tc))-.5);
    float trk=.7*step(.7,tq.z)*sm(500.,900.,t)*sm(tw,tw*.55,abs(P.x-tx))*sm(.8,.93,dot(normalize(n0.xz+vec2(1e-5,0.)),-normalize(rd.xz)))*sm(tl-700.*tq.w-60.,tl-700.*tq.w+40.,y)*sm(tl+30.,tl-40.,y);
    float open=max(mdw*.85,trk);
    float mpt=t*uWp.w;
    float tanA=sqrt(max(1.-n0y*n0y,0.))/max(n0y,.05), tanE=rd.y/max(length(rd.xz),1e-4);
    float kS=clamp(tanA/max(tanA-tanE,.4*tanA),1.,1.3);
    float dA=sm(1.3,2.6,8./(mpt*uC.y))*sm(.02,.2,tr)*fac*sm(.03,.1,1.-n0y);
    float cK=0., xn=0., cv=0., cw=0., cr=0., cH=0.;
    if(dA>0.){
      const float CX=8.2, CY=4.6;
      int iy0=int(floor(y/CY)), NR=int(uNR);
      for(int q=0;q<2*NR;q++){
        if(cK>0.) break;
        int k=NR-1-q/2, iy=iy0-k;
        float qx=lat/CX+fract(float(iy)*.6180339+float(iy&255)*.0137*float(iy&7)); // each row's columns shifted at random: no files
        int ix=int(floor(qx)); if((q&1)==1) ix+=fract(qx)<.5?-1:1;
        vec4 r=texelFetch(uN,ivec2(ix*7+iy*29,iy*13-ix*3)&255,0);
        float wb=(float(iy)+r.y)*CY, tlb=tl+(r.w-.5)*80.;
        bool isS=fract(r.w*7.31+r.x*3.1)>lar;
        float H=(10.+7.*r.w)*(.45+.55*sm(tlb,tlb-300.,wb))*(isS?1.2:1.);
        float v=(y-wb)/(H*kS);
        float dB=(1.-open)*sm(tlb+5.,tlb-50.,wb)*.96;
        if(r.z<dB && v>=0. && v<1.){
          float hw=isS ? H*.24*pow(1.-v,1.) : H*.34*pow(1.-v,.8)*min(1.,.35+v*3.);
          float dx=(qx-float(ix)-.5-(r.x-.5)*.55)*CX*fz;
          if(abs(dx)<hw+.5*mpt){ cK=isS?2.:1.; xn=clamp(dx/max(hw,.01),-1.,1.); cv=v; cw=clamp((hw-abs(dx))/mpt+.5,0.,1.)*(isS?1.:1.-.6*bareC); cr=fract(r.w*13.7+r.z*5.3); cH=v*H; }
        }
      }
    }
    vec3 sdir=normalize(uB.xyz);
    n=normalize(mix(n,nF,tr)); float cosT=max(dot(n,sdir)+.05,0.);
    // the mean stand: what crowns under a texel average to
    vec3 crownA=mix(spr,larch,lar), floorA=mix(mix(spr*1.6,larch*vec3(.68,.53,.32),lar),alp*.85,open);
    vec3 albM=mix(crownA,floorA,.12+.75*open);
    // crowns and the needle floor between them
    vec3 albD=floorA, nL=n; float cosD=cosT*.6, aD=.62;
    if(cK>0.){
      vec3 rgt=normalize(vec3(rd.z,0.,-rd.x));
      float xs=xn*sign(dot(lax,rg2)+1e-4);
      vec3 ncr=normalize(rgt*xs*.85*sm(4.,9.,8./(mpt*uC.y))-normalize(vec3(rd.x,0.,rd.z))*sqrt(1.-xs*xs)*.8+vec3(0.,.55,0.));
      vec3 cA=cK>1.5 ? spr*(.8+.5*cr) : larch*(.74+.5*cr)*mix(vec3(1.),vec3(1.08,.9,.74),step(.7,fract(cr*7.)));
      float wL=cK>1.5 ? .12 : .45; // larch needles let the light through
      float cD=clamp((dot(ncr,sdir)+wL)/(1.+wL),0.,1.)*(.3+.7*sm(.0,.45,cv))*1.4*mix(sm(.45,.95,cv),1.,sm(.08,.3,cosT)); // a slope turned from the sun: the crowns shade each other, only their tips catch it // the lower crown stands in the shade of the one in front
      albD=mix(albD,cA,cw); nL=normalize(mix(n,ncr,cw*.7)); cosD=mix(cosD,cD,cw); aD=mix(aD,(.5+.7*cv)*(.75+.5*(1.-abs(xs))),cw);
    }
    vec3 alb=mix(albM,albD,dA);
    nL=normalize(mix(n,nL,dA));
    float cosS=mix(cosT,cosD,dA), aF=mix(1.,aD,dA);
    alb=mix(bare,alb,tr);
    alb=mix(alb,bare,nearG*.8);
    float shS=sm(3.5,1.2,y+2.4*(fh-.5))*(1.-nearG); alb=mix(alb,vec3(.4,.38,.34)*(.8+.4*fh),shS); tr*=1.-shS;
    // snow: only where it could lie (on the needle floor, hardly on the crowns)
    float sL=uA.x+260.*uL.w*(vn(P.xz*.0023)*.6+vn(P.xz*.006)*.4-.5);
    float snow=sm(sL-40.,sL+120.,y)*(1.-sm(.26,.52,slR-.34*(vn(P.xz*.012)*.6+vn(P.xz*.03)*.4-.5)));
    snow*=sm(.28,.5,fbA+(y-sL)*.0024)*(1.-.7*tr*mix(.78,step(.5,cK)*cw,dA));
    alb=mix(alb,vec3(.66,.69,.75),snow);
    // lighting: open sky above, the warm glow of the opposite slope
    vec3 skyC=sky(normalize(vec3(nL.x,.6,nL.z)))*.95*uSC.w;
    vec3 shade=alb*(skyC*(.5+.5*nL.y)*aF+vec3(.26,.17,.07)*tr)*(1.+.14*tr);
    vec3 sunAdd=alb*uSC.rgb*cosS*(1.-tr*.25)*(1.+.36*tr);
    float Tr=exp(-t/uA.w*(.55+.45*exp(-P.y/1500.)))*mix(1.,.45,sm(5000.,11000.,t));
    vec3 sh=shade*Tr+hz*(1.-Tr)*uL.x;
    sunRatio=clamp(sunAdd*pow(Tr,mix(uL.y,1.,sm(3000.,7000.,t)))/(sh+1e-3),0.,14.);
    float cb=0.; if(uL.z>0.){ cb=sm(uL.z-70.,uL.z+220.,P.y+90.*(vn(P.xz*.0031)-.5)); sh=mix(sh,hz*1.08,cb*.5); sunRatio*=1.-cb; } // a level cloud base takes the tops: they go into the sky's grey
    col=sh; cov=1.-.94*cb;
    if(uMode>.5){
      // the sun's horizon along its azimuth: the elevation angle (tan) it must clear to light this texel
      vec2 sd=normalize(uB.xz);
      float q=P.y+3.+cH*cw*dA, tm=.0, st=max(.002*t,30.), md=-.1;
      for(int i=0;i<52;i++){ tm+=st; vec2 g=P.xz+sd*tm; if(abs(g.x)>9990.||g.y<-4990.||g.y>14990.) break; float m=mapH(g); md=max(md,(m-q)/tm); st*=1.13; }
      thr=clamp(atan(md)/.22,0.,1.);
    }
  }
  // the bank (baked: it mirrors in the lake through the same texels): a flat soft base, a heaped top broken into
  // masses along the wall, white where the light reaches its top, blue-grey under
  if(uRb[0].z>0.){
    float k=uRb[0].w, lump=vn(vec2(az*k,1.3))*.62+vn(vec2(az*k*2.7,4.1))*.38;
    float h=uRb[0].y*3.6*(.3+.7*sm(.3,.75,lump)), u=(el-uRb[0].x+uRb[0].y*(.8+.4*lump))/h;
    float fr=vn(vec2(az*k*14.,el*260.));
    float a=clamp(sm(0.,.4,u)*sm(1.,.4,u+.5*(fr-.5))*(.3+.7*sm(.32,.68,lump))*uRb[0].z,0.,.92);
    col=mix(col*cov,uRb[1].rgb*mix(uRb[1].w,1.,sm(.0,.9,u)),a)/max(mix(cov,1.,a),1e-3); sunRatio*=1.-a; cov=mix(cov,1.,a);
  }
  if(uMode<.5) o=vec4(sqrt(clamp(col/3.,0.,1.))*cov,cov);
  else o=vec4(sqrt(clamp(sunRatio/14.,0.,1.)),thr);
}
`,zt=U+ce+Ne+`
uniform sampler2D uD;
uniform float uMode, uNS;
uniform vec4 uSk;
in vec2 vQ; out vec4 o;
#define E vec3(0.,2.05,0.)
void main(){
  float az=u2az(vQ.x), el=v2el(vQ.y);
  vec3 rd=azDir(az,el);
  vec3 col=vec3(0.), sunRatio; float cov=0., thr=0.;
  // spruces standing behind you (2d silhouettes against the sky, in front of terrain): tiers on a jagged axis
  float nc=uNS;
  float near=1e9;
  for(int i=0;i<int(nc);i++){
    vec4 s=texelFetch(uD,ivec2(i,0),0);
    float da=az-s.x; da-=6.2831853*floor(da/6.2831853+.5);
    if(abs(da)*s.y<s.z*.4+.05){
      float v2=sin(el)/cos(el)*s.y+2.05-s.w;
      float H=s.z;
      if(v2>-1.&&v2<H){
        float f=clamp(v2/H,0.,1.);
        float wob=vn(vec2(float(i)*3.1,v2*.8))-.5;
        float tier=fract(v2*.74+wob*1.5+vn(vec2(float(i)*7.3,v2*.31))*1.7);
        float w=(.5*H*.125+.22)*pow(1.-f,.82)*(.62+.78*tier*tier)*(1.+.62*(vn(vec2(da*s.y*7.,v2*4.5))-.5));
        float x=da*s.y;
        if(abs(x)<w && s.y<near){
          near=s.y;
          float lit=vn(vec2(x*2.3,v2*2.1));
          vec3 sc=vec3(.0035,.006,.0055)+vec3(.003,.006,.005)*lit*lit;
          col=sc*uSk.w+vec3(.018,.026,.04)*.05*sm(30.,100.,s.y); cov=1.; sunRatio=vec3(0.); thr=1.;
        }
      }
    }
  }
  // the hut: a low shingled box with a pitched roof, 3d so it foreshortens; it stands in shade
  vec2 hc=vec2(-2.6,-27.5);
  float hutAz=at2(hc.x,hc.y);
  float dHut=az-hutAz; dHut-=6.2831853*floor(dHut/6.2831853+.5);
  if(abs(dHut)<.5){
    vec3 ce=vec3(hc.x,8.1,hc.y);
    vec2 ax=normalize(vec2(1.,.28));
    vec3 ro=E-ce; vec3 rrd=rd;
    ro.xz=vec2(dot(ro.xz,ax),dot(ro.xz,vec2(-ax.y,ax.x)));
    rrd.xz=vec2(dot(rd.xz,ax),dot(rd.xz,vec2(-ax.y,ax.x)));
    float th=0.; bool got=false; vec3 hp;
    for(int i=0;i<40;i++){
      vec3 q=ro+rrd*th;
      vec3 b=abs(q-vec3(0.,1.15,0.))-vec3(3.1,1.15,2.2);
      float box=length(max(b,0.))+min(max(b.x,max(b.y,b.z)),0.)-.03;
      float roofY=2.45+1.75*(1.-abs(q.x)/3.5);
      float rf=max(q.y-roofY,max(abs(q.x)-3.55,max(abs(q.z)-2.55,1.9-q.y)))*.6;
      float d=min(box,rf);
      if(d<.012){ got=true; hp=q; break; }
      th+=d; if(th>70.) break;
    }
    if(got){
      float eps=.02;
      vec3 g;
      vec3 q=hp;
      vec3 b=abs(q-vec3(0.,1.15,0.))-vec3(3.1,1.15,2.2);
      float roofY=2.45+1.75*(1.-abs(q.x)/3.5);
      bool roof = q.y>2.3 && max(abs(q.x)-3.5,abs(q.z)-2.5) < .08 && q.y>roofY-.25;
      vec3 c;
      if(roof){
        float ro2=q.y*7.+vn(q.xz*3.)*.4;
        float sh=fract(ro2), course=floor(ro2);
        float cols=fract(q.z*2.3+course*.37+vn(vec2(course*1.7,3.))*.6);
        float dk=sm(.0,.14,sh)*sm(.02,.14,cols)*sm(1.,.86,cols);
        float wear=vn(q.xz*1.4)*.6+.4*vn(q.xz*7.);
        c=mix(vec3(.04,.04,.038),vec3(.15,.145,.13),dk*wear);
        c+=vec3(.05,.07,.03)*sm(.55,.8,vn(q.xz*2.))*.4;
      } else {
        float side=abs(b.x)<abs(b.z)?q.z:q.x;
        float gr=abs(fract(q.y*3.)-.5)*2.; float grain=vn(vec2(side*1.5,q.y*9.));
        c=mix(vec3(.05,.045,.04),vec3(.085,.075,.065),sm(.08,.5,gr)*grain);
        if(q.y<.55) c=mix(vec3(.08,.08,.075),vec3(.03),sm(.1,.7,vn(q.xz*5.+q.y*7.)));
        if(abs(q.z-2.2)<.03 && abs(q.x+.6)<.5 && q.y>.9&&q.y<1.8) c=vec3(.012,.012,.016);
      }
      col=c*vec3(.82,.9,1.05)*uSk.w*.34; cov=1.; sunRatio=vec3(0.); thr=1.;
    }
  }
  if(cov<.5) discard;
  o=uMode<.5 ? vec4(sqrt(clamp(col/3.,0.,1.)),1.) : vec4(0.,0.,0.,1.);
}
`,Rt=U+`
uniform sampler2D uN; in vec2 vQ; out vec4 o;
void main(){ vec2 uv=(floor(vQ*640.)+.5)/640.; float s=0., a=.5, M=10.;
  for(int i=0;i<5;i++){ vec2 p=uv*M, I=floor(p), f=fract(p); f=f*f*(3.-2.*f); ivec2 c=ivec2(mod(I,M))+ivec2(i*41,i*73), e=ivec2(mod(I+1.,M))+ivec2(i*41,i*73);
    float v=mix(mix(texelFetch(uN,c&255,0).r,texelFetch(uN,ivec2(e.x,c.y)&255,0).r,f.x),mix(texelFetch(uN,ivec2(c.x,e.y)&255,0).r,texelFetch(uN,e&255,0).r,f.x),f.y);
    v=i<2 ? 1.-abs(2.*v-1.) : v; s+=a*(i<2 ? v*v : v); M*=2.; a*=.5; }
  o=vec4(s,0.,0.,1.); }
`,At=U+ce+`
in vec2 vQ; out vec4 o;
vec4 stones(vec2 uv){
  float best=0., idA=0., idB=0., cat=0.;
  for(int L=0;L<3;L++){
    float N=L==0?5.:L==1?11.:25.;
    vec2 gp=uv*N, g0=floor(gp);
    int R2=L==0?2:1;
    for(int j=-R2;j<=R2;j++) for(int i=-R2;i<=R2;i++){
      vec2 g=g0+vec2(float(i),float(j));
      vec2 w=mod(g,N);
      vec4 r=texelFetch(uN,ivec2(w*7.+float(L)*31.+13.)&255,0);
      float R=(L==0?(.42+.5*r.a):(L==1?(.42+.42*r.a):(.5+.35*r.a)))/N;
      vec2 c=(g+.5+(r.xy-.5)*.75)/N;
      vec2 d0=uv-c;
      float a=r.z*6.2831, ca=cos(a), sa=sin(a);
      vec2 q=vec2(ca*d0.x+sa*d0.y,-sa*d0.x+ca*d0.y)/R;
      float id=fract(r.x*7.31+r.y*3.7+float(L)*.37);
      float stretch=1.+.5*fract(id*5.3);
      q.y*=stretch;
      // an irregular outline and flat faces cut by planes: broken stone, not a pebble dome
      vec2 nn=vec2(atan(q.y/max(abs(q.x),.001))*1.3+id*40., length(q)*2.);
      float rim=length(q)*(1.+.26*(vn(nn*vec2(1.6,1.))-.5));
      if(rim<1.08){
        float dome=max(0.,1.-rim*rim);
        dome=pow(dome,.72);
        float n1=fract(id*3.1)*6.28, n2=fract(id*7.7)*6.28;
        float p1=.74+.3*dot(q,vec2(cos(n1),sin(n1)));
        float p2=.66+.35*dot(q,vec2(cos(n2),sin(n2)));
        float h=min(dome,min(p1,p2)*1.06);
        h=max(h,0.);
        h=h*(.8+.5*fract(id*11.))*R*N*(L==0?1.:L==1?.72:.44);
        h=h*(1.+.05*(vn(q*14.+id*33.)-.5))*(.97+.06*vn(q*3.+id));
        if(h+float(2-L)*.0>best){ best=h; idA=fract(id*17.3); idB=fract(id*5.1); cat=float(L)/2.; }
      }
    }
  }
  return vec4(best,idA,idB,cat);
}
void main(){ vec4 s=stones(vQ); o=vec4(s.r/1.3,s.g,s.b,s.a); }
`,gt=U+`
uniform sampler2D uA; in vec2 vQ; out vec4 o;
float H(ivec2 p){ return texelFetch(uA,ivec2(mod(vec2(p),vec2(float(TS)))),0).r; }
void main(){
  ivec2 p=ivec2(vQ*float(TS));
  float h=H(p);
  float gx=H(p+ivec2(1,0))-H(p-ivec2(1,0)), gy=H(p+ivec2(0,1))-H(p-ivec2(0,1));
  gx*=float(TS)*.5; gy*=float(TS)*.5;
  // cavity: how far the neighbourhood rises above the point
  float acc=0.; const int K=8;
  for(int i=0;i<K;i++){ float a=float(i)*2.399, r=5.+float(i)*1.6; ivec2 d=ivec2(vec2(cos(a),sin(a))*r); acc+=max(H(p+d)-h,0.); }
  acc/=float(K);
  float cav=exp(-acc*11.);
  o=vec4(h,gx/120.+.5,gy/120.+.5,cav);
}
`.replace(/TS/g,"TSZ"),Pt=U+ce+`
uniform sampler2D uA; in vec2 vQ; out vec4 o;
void main(){
  vec4 s=texture(uA,vQ);
  float N=.5*textureLod(uN,vQ,0.).r+.3*textureLod(uN,vQ+s.g*.4,1.).g+.2*textureLod(uN,vQ,2.).b, N2=.6*textureLod(uN,vQ,3.).r+.4*textureLod(uN,vQ+s.b*.3,2.).g;
  float alb=.28+.42*s.g+.28*(N-.5);
  float tint=s.b;
  // quartz veins and speckle, and lichen in small colonies on the larger stones
  float vein=sm(.52,.5,abs(textureLod(uN,vQ*vec2(3.,1.)+s.g,1.).b-.5)*3.);
  alb+=vein*.08*sm(.0,1.,s.b);
  float lich=sm(.66,.74,.5*textureLod(uN,vQ,1.).r+.5*textureLod(uN,vQ+s.b,0.).g)*sm(.1,.34,s.r)*sm(.0,.6,1.-s.a);
  o=vec4(clamp(alb,0.,1.),tint,lich,clamp(.5+N2*.5,0.,1.));
}
`,kt=U+`uniform sampler2D uA; uniform int uK; in vec2 vQ; out vec4 o;
void main(){ ivec2 p=ivec2(gl_FragCoord.xy)*uK; vec4 s=vec4(0.); for(int j=0;j<8;j++){ if(j>=uK) break; for(int i=0;i<8;i++){ if(i>=uK) break; s+=texelFetch(uA,p+ivec2(i,j),0); } } o=s/float(uK*uK); }`,St=U+ce+$e+Ne+`
uniform vec4 uSk;
uniform sampler2D uP0, uP1, uT1, uT2, uW;
uniform vec4 U[16];
uniform vec4 uP1a, uP2a, uP3a, uP4a;
in vec2 vQ; out vec4 o;
#define uEye U[0].xyz
#define uTm U[0].w
#define uR U[1].xyz
#define uTH U[1].w
#define uUp U[2].xyz
#define uPix U[2].w
#define uF U[3].xyz
#define uSE U[3].w
#define uWD U[4].xy
#define uCat U[4].z
#define uSize U[4].w
#define uHz U[5]
#define uStone U[6]
#define uNeed U[7].x
#define uMoon U[7].y
#define uGold U[7].z
#define uSkyD U[7].w
float gDir=1.; // 0 while the lake's image is looked up (no stars in it: the ripples smear them into sticks)
// the sky you see (the bake keeps its own for the slopes' light): pale and warm low, soft green-blue, deeper overhead
vec3 skyV(vec3 d){
  float e=max(d.y,0.);
  vec2 hd=normalize(d.xz+vec2(1e-5,0.)), sd=normalize(uSk.xz);
  float w=clamp(dot(hd,sd),-1.,1.)*.5+.5;
  vec3 low=mix(U[9].rgb,U[10].rgb,pow(w,1.5));
  vec3 c=mix(low,U[11].rgb,sm(.04,.5,e));
  c=mix(c,U[12].rgb,sm(.34,.85,e));
  c+=vec3(.1,.04,.055)*pow(1.-w,2.)*exp(-pow((e-.09)/.07,2.))*U[10].w;
  c+=U[10].rgb*vec3(.686,.434,.21)*exp(-e/.08)*pow(w,5.)*U[9].w;
  // high cirrus, a couple of faint combed streaks
  if(e>.12){
    vec2 p=d.xz/(e+.22), q=vec2(p.x*.8+p.y*.5,p.y*.8-p.x*.5);
    float a=vn(q*vec2(1.1,26.)+vec2(uTm*.004,0.)+vn(q*2.1)*1.1), b=vn(q*vec2(2.7,60.)+vec2(3.,uTm*.005));
    float ci=clamp((a*.65+b*.35-.5)*3.,0.,1.)*sm(.56,.78,vn(q*.9+vec2(11.,4.)))*sm(.12,.3,e)*(1.-sm(.6,.95,e));
    c=mix(c,c*.86+vec3(.34,.29,.24),ci*.2*U[12].w);
  }
  vec3 stars=vec3(0.);
  if(U[11].w*gDir>0.&&e>.03){ vec2 q=d.xz/(e+.4)*520.; vec2 g=floor(q); vec4 r=texelFetch(uN,ivec2(g)&255,0); stars=vec3(.85,.9,1.)*step(.988,r.r)*sm(.3,.06,length(q-g-.2-r.gb*.6))*(.3+.7*r.a)*sm(.03,.12,e)*U[11].w; }
  return c*uSk.w+stars;
}
vec3 env(vec3 d, float lod){
  d.y=abs(d.y);
  float az=at2(d.x,d.z), el=asin(min(d.y,1.));
  vec2 uv=vec2(azU(az),el2v(el));
  vec3 c=skyV(d);
  if(uMoon>0.){ vec3 mo=d-normalize(vec3(.38,.34,.92)); float md=length(mo); if(md<.03){ vec2 q=mo.xy/.0195; float m=textureLod(uN,q*.075+vec2(.31,.57),1.).r*.62+textureLod(uN,q*.17+vec2(.71,.13),.5).g*.38; float limb=sqrt(max(1.-min(dot(q,q),1.),0.)); vec3 lit=mix(vec3(.46,.47,.5),vec3(.8,.81,.84),sm(.34,.62,m))*(.72+.28*limb); c=mix(c,c*.72+lit*uSk.w,sm(.0208,.0186,md)); c+=vec3(.03,.032,.04)*uSk.w*sm(.03,.018,md)*.5; } }
  float litK=0.;
  if(uv.y<.995){
    vec4 a=textureLod(uP0,uv,lod), b=textureLod(uP1,uv,lod);
    float lit=sm(-.05,.02,uSE-b.a*.22);
    if(U[15].z>0.) lit*=1.-U[15].z*(1.-sm(U[15].x,U[15].y,vn(vec2(az*3.2+U[15].w,el*9.-U[15].w*.2))*.72+vn(vec2(az*8.-U[15].w*.7,el*22.)+5.)*.28)); // cloud shadows crossing the wall
    vec3 f=a.rgb/max(a.a,.004); f=f*f*3.;
    vec3 rt=b.rgb*b.rgb*14.;
    f*=1.+rt*lit;
    float fy=dot(f,vec3(.2126,.7152,.0722))*U[8].x; if(fy>.62) f*=(.62+.38*(1.-exp((.62-fy)/.38)))/fy;
    litK=lit*sm(.3,1.5,dot(rt,vec3(.33)))*a.a;
    f=mix(c,f,a.a);
    c=f;
  }
  // the blue that drifts low in the valley
  float fa=sm(.04,.0,el)*(.2+.8*vn(vec2(az*10.+uTm*.012,el*70.)))*uHz.w*.1;
  float fb=sm(.13,.0,el)*sm(.2,.8,vn(vec2(az*3.3-uTm*.007,el*20.)+9.))*uHz.w*.3;
  c=mix(c,uHz.rgb*(.6+.4*c),clamp(fa+fb,0.,.9)*(1.-.55*litK));
  return c;
}
// the wet stones' loose sheen: the panorama and a plain sky, without the moon, the drifting haze or the cloud shadows
vec3 envL(vec3 d, float lod){
  d.y=abs(d.y);
  vec2 uv=vec2(azU(at2(d.x,d.z)),el2v(asin(min(d.y,1.))));
  vec3 c=mix(mix(mix(U[9].rgb,U[10].rgb,.5),U[11].rgb,sm(.04,.5,d.y)),U[12].rgb,sm(.34,.85,d.y))*uSk.w;
  if(uv.y<.995){
    vec4 a=textureLod(uP0,uv,lod), b=textureLod(uP1,uv,lod);
    vec3 f=a.rgb/max(a.a,.004); f=f*f*3.;
    f*=1.+b.rgb*b.rgb*14.*sm(-.05,.02,uSE-b.a*.22);
    c=mix(c,f,a.a);
  }
  return c;
}
float nearF(vec3 rd){ float b=sm(-.2,.8,-rd.z); return mix(66.,15.,b); }
vec2 rot1(vec2 p){ return mat2(.8,.6,-.6,.8)*p; }
vec2 rotI(vec2 g){ return mat2(.8,-.6,.6,.8)*g; }
float gMacro(vec2 p){ return nearH(p)-.1; }
#define PA 1.35
#define AA .17
#define PB 4.1
#define AB .5
#define OB .13
float layerA(vec2 p,float l){ return textureLod(uT1,p/PA,l).r*AA; }
float layerB(vec2 p,float l){ return textureLod(uT1,rot1(p)/PB+.37,l+.6).r*AB-OB; }
float surf(vec2 p,float l){ return max(layerA(p,l),layerB(p,l)); }
float gMarch(vec3 ro, vec3 rd, float tEnd, int N, out vec3 P){
  float t0=max(.3,tEnd*.012), r=pow(tEnd/t0,1./float(N-1)), t=t0, tp=t0, a=0., b=-1., l=0.;
  int mode=0, k=0;
  for(int i=0;i<N+6;i++){
    float tc=mode==0?t:.5*(a+b);
    vec3 p=ro+rd*tc;
    if(mode==0) l=clamp(log2(tc*uPix/.0021),0.,3.);
    float d=p.y-(gMacro(p.xz)+surf(p.xz,l));
    if(mode==0){
      if(d<0.){ a=tp; b=t; mode=1; }
      else { if(i>=N-1) break; tp=t; t*=r; }
    } else {
      if(d<0.) b=tc; else a=tc;
      k++; if(k>=6) break;
    }
  }
  P=ro+rd*max(b,0.);
  return mode==1?b:-1.;
}
float needle(vec2 p, float cell, float foot, float seed){
  vec2 q=p/cell+seed, g=floor(q), f=q-g;
  vec4 r=texelFetch(uN,ivec2(g)&255,0);
  if(r.a>.17) return 0.;
  float a=r.z*3.1416, ca=cos(a), sa=sin(a);
  vec2 d=f-(r.xy*.6+.2); d=vec2(ca*d.x+sa*d.y,-sa*d.x+ca*d.y)*cell;
  float L=.012+.018*r.x;
  float w=.0007+foot*.45;
  return step(abs(d.x),L)*sm(w,w*.2,abs(d.y+d.x*d.x*2.))*min(1.,.0014/(w*1.5+.0002)*(.8/(1.+foot*40.))+.2);
}
vec3 stoneCol(float a, float tint, float lich, float n){
  vec3 g=mix(vec3(.19,.205,.235),vec3(.245,.24,.225),tint);
  vec3 c=g*(.34+a*1.05)*mix(.9,1.2,n);
  c=mix(c,vec3(.55,.42,.16),lich*sm(.48,.56,n)*.3);
  return c*uStone.rgb;
}
vec3 shadeG(vec3 P, vec3 rd, float t, float under){
  float foot=t*uPix/max(-rd.y,.12);
  float l=clamp(log2(foot/.0021)+under*1.6,0.,3.);
  vec2 uvA=P.xz/PA, uvB=rot1(P.xz)/PB+.37;
  vec4 a=textureLod(uT1,uvA,l), ac=textureLod(uT2,uvA,l), b=textureLod(uT1,uvB,l+.6), bc=textureLod(uT2,uvB,l+.6);
  float hA=a.r*AA, hB=b.r*AB-OB, ug=step(hA,hB);
  vec2 gA=(a.gb-.5)*120.*AA/PA, gB=rotI((b.gb-.5)*120.)*AB/PB;
  gA=clamp(gA,-1.4,1.4); gB=clamp(gB,-1.4,1.4);
  vec2 g=mix(gA,gB,ug);
  vec4 cc=mix(ac,bc,ug); float cav=mix(a.a,b.a,ug), hgt=mix(hA,hB,ug);
  float y=gMacro(P.xz)+max(hA,hB);
  // pebbles and mineral grain, under the stones and on them
  vec2 pa=P.xz/.47+.61;
  vec4 p=textureLod(uT1,pa,l+.5), pc=textureLod(uT2,pa,l+.5);
  float pebK=sm(.0,.22,hgt-.012)*-.7+1.;
  g+=clamp((p.gb-.5)*120.*.028/.83,-.8,.8)*pebK;
  float fe=.006;
  float nA=vn(P.xz*105.), nB=vn(P.xz*105.+vec2(fe*105.,0.)), nC=vn(P.xz*105.+vec2(0.,fe*105.));
  g+=vec2(nB-nA,nC-nA)/fe*.0012*(.4+cc.a);
  float gF=clamp(.75-foot*22.,0.,1.);
  g*=gF;
  vec3 n=normalize(vec3(-g.x,1.,-g.y));
  float h=y;
  // wetness: waterline, with a damp tide mark above it and dark patches in the gaps
  float tide=.17+.14*vn(P.xz*.5+7.);
  float wet=1.-sm(.0,tide,h);
  wet=max(wet,.28*(1.-sm(tide,tide+.18,h)));
  wet=clamp(wet+(cav<.55?.3:.0)*(1.-sm(.0,.4,h)),0.,1.);
  float ii=fract(cc.g*31.);
  vec3 alb=stoneCol(cc.r,cc.g,cc.b,pc.r*.5+ii*.5);
  alb*=mix(1.,.8+.45*pc.r,.5*pebK);
  alb*=.82+.36*vn(P.xz*263.)*sm(.03,.0,foot);
  float pebMix=(1.-sm(.012,.1,hgt))*.5;
  alb=mix(alb,stoneCol(pc.r,pc.g,pc.b*.5,ii)*vec3(.8,.78,.72)*.82,pebMix);
  alb*=mix(1.,.34,wet*.9*(1.-under*.55));
  float nd=max(dot(n,vec3(0.,1.,0.)),0.);
  float ao=mix(cav,cav*cav,.5); if(under>.5) ao=mix(ao,1.,.62);
  vec3 skyU=vec3(.15,.26,.36)*uSk.w;
  vec3 hzU=vec3(.4,.45,.43)*uSk.w;
  vec3 lakeWarm=(1.-under)*uGold*vec3(1.05,.66,.24)*.09*max(n.z*.5+n.y*.5+.4,0.)*sm(9.,-3.,P.z-6.);
  vec3 irr=mix(hzU,skyU,.5+.5*n.y)*ao*.75+lakeWarm*(.5+.5*ao)+vec3(.012,.014,.02)*ao;
  float gi=dot(irr,vec3(.33)); irr=mix(irr,vec3(gi),.78)*1.6;
  if(under>.5) irr*=2.2;
  vec3 col=alb*irr;
  if(under<.5){
    // wet stones take the sky and the gold slope as a loose sheen
    vec3 R=reflect(rd,n);
    float rough=mix(.16,.42,1.-wet);
    float F0=mix(.035,.05,wet), ca=max(dot(n,-rd),0.);
    float F=F0+(1.-F0)*pow(1.-ca,5.);
    vec3 rc=envL(R,clamp(rough*6.,0.,6.));
    rc/=1.+max(0.,dot(rc,vec3(.33))-.4)*2.5;
    col+=rc*F*(.2+wet*.75)*mix(.4,1.,ao*ao); // wet stones darken; their sheen stays a sheen, never a pale veil
    // gold needles fallen on the stones
    float nl=needle(P.xz,.11,foot,3.1)*sm(.32,.0,h-.05);
    col=mix(col,vec3(.62,.3,.05)*irr*2.4,clamp(nl,0.,.8));
  }
  float air=1.-exp(-t/1400.);
  return mix(col,vec3(.6,.72,.92)*.8*uSk.w,air);
}
vec3 waves(vec2 p, float t, float foot, float tD, out float rip){
  vec2 a=textureLod(uW,p*.012+uWD*.004*t+vec2(.3,.1),2.).rg-.5;
  vec2 b=textureLod(uW,rot1(p)*.031-uWD*.009*t+.5,3.).rg-.5;
  // light airs: long horizontal bands in view space (azimuth, and elevation below the horizon), thinning toward the far shore
  vec2 bq=vec2(p.x/(tD+2.)*1.7-uWD.x*t*.012,46.*pow(2.05/(tD+1.5),.8)+uWD.y*t*.05);
  float pat=vn(bq+vec2(3.,7.))*.55+vn(bq*vec2(2.7,2.2)+vec2(11.,9.))*.3+vn(bq*vec2(7.,5.1)+vec2(5.,2.))*.15;
  float cat=sm(.5-uCat*.6,.66-uCat*.6,pat)*(.6+.4*vn(bq*vec2(5.,6.)+vec2(1.,8.)));
  float pf=0.;
  pf+=uP1a.z*exp(-dot(p-uP1a.xy,p-uP1a.xy)/(uP1a.w*uP1a.w));
  pf+=uP2a.z*exp(-dot(p-uP2a.xy,p-uP2a.xy)/(uP2a.w*uP2a.w));
  pf+=uP3a.z*exp(-dot(p-uP3a.xy,p-uP3a.xy)/(uP3a.w*uP3a.w));
  pf+=uP4a.z*exp(-dot(p-uP4a.xy,p-uP4a.xy)/(uP4a.w*uP4a.w));
  rip=clamp(cat+pf,0.,1.5);
  vec2 g=(a*.008+b*.006)*sm(190.,12.,tD);
  float near=sm(60.,6.,foot*120.);
  if(rip>.01){
    vec2 c=textureLod(uW,p*.13+uWD*t*.05+vec2(.13,.71),1.).rg-.5, d=textureLod(uW,rot1(p)*.37-uWD*t*.11+.3,0.).rg-.5;
    g+=(c*.014+d*.012*near)*rip*sm(800.,70.,tD);
    // inside a ruffled band the image only shivers a little in its columns; big shifts here tear sky through the slopes
    vec2 az2=vec2(p.x/(tD+2.),log(tD+2.));
    vec2 st=textureLod(uW,vec2(az2.x*5.3,az2.y*.2)+uWD*t*.002+.21,1.).rg-.5;
    vec2 st2=textureLod(uW,vec2(az2.x*16.,az2.y*.34)-uWD*t*.0035+.63,0.).rg-.5;
    g.y+=(st.r*.55+st2.g*.45)*.018*min(rip,1.)*sm(1100.,140.,tD)*sm(3.,14.,tD);
  }
  return vec3(g,rip);
}
// water state: everything but the shaded bed, so shadeG has one call site
vec3 gN, gRefl, gBelow, gTr, gRD; float gF, gRip, gBedT, gRL; vec3 gBedP;
void waterA(vec3 Pw, vec3 rd, float tw){
  float foot=tw*uPix/max(-rd.y,.035);
  float rip; vec3 wv=waves(Pw.xz,uTm,foot,tw,rip); gRip=rip;
  vec3 n=normalize(vec3(-wv.x,1.,-wv.y)); gN=n;
  vec3 R=reflect(rd,n); R.y=abs(R.y);
  float lodR=clamp(min(rip,1.)*1.7+log2(1.+foot*18.)*.6,0.,5.);
  gRD=R; gRL=lodR;
  float ca=max(dot(n,-rd),0.);
  float F=.02+.98*pow(1.-ca,5.);
  F=clamp(F*mix(.55,.9,sm(2.,10.,tw)),0.,1.); F=mix(F,1.,.1+.62*sm(1.5,24.,tw)); F*=1.-.16*min(rip,1.);
  gF=F;
  gBelow=vec3(.0065,.024,.03)*uSk.w;
  gBedT=-1.;
  vec3 Tr=refract(rd,n,.75); gTr=Tr;
  if(tw<30.&&Tr.y<-.02){ float b0=gMacro(Pw.xz+Tr.xz*.7); gBedT=max(.02,(b0-Pw.y+.05)/Tr.y); gBedP=Pw+Tr*gBedT; }
}
vec3 waterB(vec3 Pw, vec3 rd, float tw, vec3 bed){
  vec3 below=gBelow;
  // stones just beside the water: a dark contact band at the edge, broken by the stones themselves
  float sd=Pw.z-zSh(Pw.x);
  if(sd<.5) gRefl=mix(gRefl*.45,gRefl,sm(.03,.12+.35*vn(Pw.xz*9.),sd));
  if(gBedT>0.){
    float tb=gBedT; vec3 pb=gBedP;
    bed=mix(bed,vec3(dot(bed,vec3(.33))),.6);
    float dep=max(-pb.y,0.)*1.+tb*.28;
    vec3 ab=exp(-vec3(.5,.16,.11)*dep)*vec3(.84,.96,1.02);
    below=bed*ab+vec3(.012,.032,.036)*(1.-exp(-dep*.55))*uSk.w;
    float sw=sm(19.,5.,tw);
    below=mix(gBelow,below,sw*(1.-.75*sm(.0,3.4,-pb.y)));
  }
  vec3 col=below*(1.-gF)+gRefl*gF;
  // gold needles floating, thicker along the waterline
  if(tw<16.){
    float foot=tw*uPix/max(-rd.y,.035);
    float shore=sm(5.5,.0,Pw.z-zSh(Pw.x));
    vec2 pw=Pw.xz+uWD*uTm*.04;
    float nd=needle(pw,.13,foot,7.7)*min(1.,uNeed*(.04+1.9*shore*shore));
    if(nd>0.){ vec3 nlc=vec3(.74,.4,.07)*.62*uSk.w+vec3(.02)*gF; col=mix(col,nlc,clamp(nd,0.,.85)*sm(16.,8.,tw)); }
  }
  return col;
}
vec3 tone(vec3 c){
  c*=U[8].x;
  c=c*(c*2.51+.03)/(c*(c*2.43+.59)+.14);
  return pow(clamp(c,0.,1.),vec3(.4545));
}
void main(){
  vec2 s=vQ*2.-1.;
  vec3 rd=normalize(uF+(s.x*uR+s.y*uUp)*uTH);
  vec3 ro=uEye, col;
  float tw=rd.y<-1e-4 ? -ro.y/rd.y : 1e9;
  float Rmax=nearF(rd);
  float tg=-1.; vec3 hit;
  if(rd.y<.6){
    float tE=min(tw,Rmax);
    tg=gMarch(ro,rd,tE,rd.y<.0?21:11,hit);
  }
  bool wat=tg<=0.&&tw<1e8;
  vec3 Pw=ro+rd*tw;
  if(wat) waterA(Pw,rd,tw);
  vec3 eC=vec3(0.);
  if(tg<=0.){
    gDir=wat?0.:1.;
    eC=env(wat?gRD:rd,wat?gRL:0.);
    if(wat){
      // snow and pale sky never mirror at full strength, and a ruffled band shows paler sky instead of the slopes
      eC/=1.+max(0.,dot(eC,vec3(.33))-.35)*3.;
      eC=mix(eC,skyV(normalize(vec3(gRD.x,.34,gRD.z)))*.8,.5*sm(.25,.95,min(gRip,1.))*sm(7.,24.,tw));
    }
    gRefl=eC;
  }
  if(tg>0.||(wat&&gBedT>0.)){
    vec3 Q=tg>0.?hit:gBedP; vec3 V=tg>0.?rd:gTr; float tt=tg>0.?tg:gBedT+tw; float und=tg>0.?0.:1.;
    col=shadeG(Q,V,tt,und);
  } else col=vec3(0.);
  if(wat){ col=waterB(Pw,rd,tw,col); float ld=zSh(Pw.x)-Pw.z; if(ld>0.){ vec3 gc=vec3(.05,.05,.047)*(.7+.6*vn(Pw.xz*.7))*uSk.w; col=mix(col,gc,sm(0.,1.5,ld)); } }
  else if(tg<=0.) col=eC;
  // a little corner fall-off and the grain of a high ISO
  float vg2=dot(s,s);
  col*=1.-.045*vg2;

  col=tone(col);
  col+=(texelFetch(uN,ivec2(gl_FragCoord.xy)&255,0).r-.5)*.012;
  o=vec4(col,1.);
}
`;function Ft(e){const t=!!e.getExtension("EXT_color_buffer_float"),R=t||!!e.getExtension("EXT_color_buffer_half_float"),m=!!e.getExtension("OES_texture_float_linear"),l=640,v=(n,s)=>{const c=e.createShader(s);return e.shaderSource(c,n),e.compileShader(c),c},S=v(bt,e.VERTEX_SHADER),N=gt.replace(/TSZ/g,"int("+l+")").replace("uniform sampler2D uA;","const int TS_="+l+"; uniform sampler2D uA;").replace(/int\(640\)/g,"TS_"),re=!R,we=n=>re?n.replace(U,U+`#define PACK
`):n,ie={terr:we(Et),pano:we(Tt),fine:Rt,a:At,b:N,c:Pt,mip:kt,main:St},d={};for(const n in ie){const s=e.createProgram(),c=v(ie[n],e.FRAGMENT_SHADER);e.attachShader(s,S),e.attachShader(s,c),e.linkProgram(s),d[n]={p:s,f:c}}e.flush();const G=new Uint8Array(256*256*4);let B=2654435769;for(let n=0;n<G.length;n++)B=Math.imul(B^B>>>15,739982445),B=Math.imul(B^B>>>12,695872825),B^=B>>>15,G[n]=B&255;for(let n=3;n<G.length;n+=4)G[n]=G[n-3]^G[n-1]>>>1^n*37&63;const A=(n,s,c,z,g,O,J,_,L,$,Ee)=>{const Pe=e.createTexture();return e.bindTexture(e.TEXTURE_2D,Pe),Ee?e.texStorage2D(e.TEXTURE_2D,Ee,c,n,s):e.texImage2D(e.TEXTURE_2D,0,c,n,s,0,z,g,$||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,O),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,J),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,_),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,L),Pe},q=A(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.LINEAR,e.REPEAT,e.REPEAT,G);e.generateMipmap(e.TEXTURE_2D);const T=128,V=new Uint8Array(T*T*4);let x=464384013;const le=()=>(x=Math.imul(x^x>>>15,739982445),x=Math.imul(x^x>>>12,695872825),x^=x>>>15,(x>>>0)/4294967296),fe=[];for(let n=0;n<18;n++){const s=le()*oe*2,c=1+Math.floor(le()*7),z=1/(c*.7+1);fe.push([Math.cos(s)*c,Math.sin(s)*c,z,le()*oe*2])}for(let n=0;n<T;n++)for(let s=0;s<T;s++){let c=0,z=0;const g=s/T*oe*2,O=n/T*oe*2;for(const _ of fe){const L=Math.cos(_[0]*g+_[1]*O+_[3])*_[2];c+=_[0]*L,z+=_[1]*L}const J=(s+n*T)*4;V[J]=Math.max(0,Math.min(255,127.5+c*9)),V[J+1]=Math.max(0,Math.min(255,127.5+z*9)),V[J+2]=128,V[J+3]=255}const Q=A(T,T,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.LINEAR,e.REPEAT,e.REPEAT,V);e.generateMipmap(e.TEXTURE_2D);const I=(n,s)=>{const c=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,c),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,s||0),c};for(const n in d){if(!e.getProgramParameter(d[n].p,e.LINK_STATUS))throw new Error("595 "+n+": "+e.getShaderInfoLog(d[n].f)+e.getProgramInfoLog(d[n].p));const s=d[n].p,c={p:s},z=e.getProgramParameter(s,e.ACTIVE_UNIFORMS);for(let g=0;g<z;g++){const O=e.getActiveUniform(s,g).name.replace("[0]","");c[O]=e.getUniformLocation(s,O)}d[n]=c}const r=e.createVertexArray(),X=(n,s,c,z,g)=>{e.bindFramebuffer(e.FRAMEBUFFER,s),e.viewport(0,0,c,z),e.useProgram(n.p),e.bindVertexArray(r),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,q),n.uN&&e.uniform1i(n.uN,0),g&&g(),e.drawArrays(e.TRIANGLES,0,3)},H=R?[e.RGBA16F,e.RGBA,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],ne=4,F=A(l,l,H[0],H[1],H[2],e.NEAREST,e.NEAREST,e.REPEAT,e.REPEAT),be=I(F);X(d.a,be,l,l);const M=A(l,l,H[0],H[1],H[2],e.NEAREST,e.NEAREST,e.REPEAT,e.REPEAT),se=A(l,l,H[0],H[1],H[2],e.LINEAR_MIPMAP_LINEAR,e.LINEAR,e.REPEAT,e.REPEAT,null,ne),ye=A(l,l,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.LINEAR,e.REPEAT,e.REPEAT,null,ne),j=I(M),Be=I(ye);e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,F),X(d.b,j,l,l,()=>{e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,F),e.uniform1i(d.b.uA,1)}),X(d.c,Be,l,l,()=>{e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,F),e.uniform1i(d.c.uA,1)});for(let n=0;n<ne;n++){const s=I(se,n),c=l>>n;X(d.mip,s,c,c,()=>{e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,M),e.uniform1i(d.mip.uA,1),e.uniform1i(d.mip.uK,1<<n)}),e.deleteFramebuffer(s)}e.deleteTexture(M),e.bindTexture(e.TEXTURE_2D,ye),e.generateMipmap(e.TEXTURE_2D);const W=A(l,l,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.LINEAR,e.REPEAT,e.REPEAT),Y=I(W);if(R){const n=I(F);X(d.fine,n,l,l),X(d.b,Y,l,l,()=>{e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,F),e.uniform1i(d.b.uA,1)}),e.deleteFramebuffer(n)}else e.clearColor(.5,.5,.5,1),e.clear(e.COLOR_BUFFER_BIT),e.clearColor(0,0,0,0);e.deleteFramebuffer(Y),e.bindTexture(e.TEXTURE_2D,W),e.generateMipmap(e.TEXTURE_2D);const f=t&&m?[e.R32F,e.RED,e.FLOAT]:R?[e.R16F,e.RED,e.HALF_FLOAT]:[e.RGBA8,e.RGBA,e.UNSIGNED_BYTE],C=re?e.NEAREST:e.LINEAR;e.deleteFramebuffer(be),e.deleteFramebuffer(j),e.deleteFramebuffer(Be),e.deleteTexture(F),e.bindFramebuffer(e.FRAMEBUFFER,null);let w=null,K;const ge=n=>{if(!w){const s=e.createProgram(),c=v(zt,e.FRAGMENT_SHADER);return e.attachShader(s,S),e.attachShader(s,c),e.linkProgram(s),e.flush(),w={pr:s,f:c,U:null,n:0},null}if(!w.U){if(++w.n<2||n&&(K===void 0?K=e.getExtension("KHR_parallel_shader_compile"):K)&&!e.getProgramParameter(w.pr,K.COMPLETION_STATUS_KHR))return null;if(!e.getProgramParameter(w.pr,e.LINK_STATUS))throw new Error("595 back: "+e.getShaderInfoLog(w.f)+e.getProgramInfoLog(w.pr));const s={p:w.pr},c=e.getProgramParameter(w.pr,e.ACTIVE_UNIFORMS);for(let z=0;z<c;z++){const g=e.getActiveUniform(w.pr,z).name.replace("[0]","");s[g]=e.getUniformLocation(w.pr,g)}w.U=s}return w.U},Z=e.getParameter(e.MAX_TEXTURE_SIZE);return{P:d,vao:r,tN:q,tW:Q,tT1:se,tT2:ye,terrFmt:f,tF:C,tFn:W,tex:A,fbo:I,draw:X,hf:R,getBack:ge,MT:Z}}je.add({num:595,name:"Golden Larches",fam:"Vistas",recipe:"The rocky edge of a high mountain lake in the Engadine in autumn, with larch slopes gone gold above their blue shadows. The hour and weather, where you stand, how far the larches have turned and the snow line change every mint. Drag to send a breath of air across the water, or hold and the hour moves on, with the light climbing off the mountain or cloud shadows going by.",interactive:"Drag to send a breath of air across the water; hold and the hour moves on: the last light climbs off the mountain, a morning sun climbs, the dusk deepens, cloud shadows travel.",music:!0,gl:!0,fps:30,seed:0,make(e){const t=e.gl,R=e.size,m=!!e.home;let l=1499075527;for(let a=2;a<66;a+=8)l=Math.imul(l^parseInt(e.hash.slice(a,a+8),16),2246822507)^l>>>13;const v=()=>{l=l+1831565813|0;let a=Math.imul(l^l>>>15,1|l);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};for(let a=0;a<6;a++)v();const S=a=>{let o=0;for(const u in a)o+=a[u];let i=v()*o;for(const u in a)if(i-=a[u],i<0)return u;return Object.keys(a)[0]},p=e.trait("Larch",m?"Full gold":S({"Full gold":58,"Just turning":26,"Past peak, bronze":16})),N=m?"First dusting":S({"First dusting":60,"None yet":26,"Heavy on the tops":14}),re=m?"Last sun on the tops":S({"Last sun on the tops":60,"Sun still on the upper forest":40}),we=m?"Blue valley haze":S({"Blue valley haze":62,Clear:24,"Smoke from down the valley":14}),ie=e.trait("Spruce",m?"Mixed":S({Mixed:56,"Mostly larch":26,"Dark spruce belts":18})),d=e.trait("Stones",m?"Grey gneiss":S({"Grey gneiss":56,"Pale granite":28,"Rusty schist":16})),G=m?"Light airs":S({"Light airs":58,"Breeze across the lake":30,"Needles thick on the surface":12}),B=m?"Empty":S({Empty:88,"Moon rising":12}),A=m?0:Math.floor(v()*90)+1;let q=1499213329;for(let a=2;a<66;a+=8)q=Math.imul(q^parseInt(e.hash.slice(a,a+8),16),668265263)^q>>>15;const T=()=>{q=q+1831565813|0;let a=Math.imul(q^q>>>15,1|q);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};for(let a=0;a<3;a++)T();const V=a=>{let o=0;for(const u in a)o+=a[u];let i=T()*o;for(const u in a)if(i-=a[u],i<0)return u;return Object.keys(a)[0]},x={lt:V(Ze),sp:V(Je),air:T(),sn:T(),side:T(),cs:T()},le=dt?wt(x,m):!1,fe=le==="off"||m&&!le;let Q=fe?"keep":x.lt,I=fe?"On the stones":x.sp;Q==="First sun, mist on the lake"&&p==="Past peak, bronze"&&ie==="Dark spruce belts"&&(Q="keep");const r=xt[Q==="keep"?re:Q],X=B==="Moon rising"&&r.moon,H=e.trait("Light",(Q==="keep"?re:Q)+(X?", the moon rising":"")),ne=r.rib===2&&x.air<.3,F=e.trait("Haze",ne?"Low cloud along the wall":r.grey&&we==="Smoke from down the valley"?"Clear":we),be=e.trait("Water",G);let M=2081809313;for(let a=2;a<66;a+=8)M=Math.imul(M^parseInt(e.hash.slice(a,a+8),16),2654435761)^M>>>11;const se=()=>{M=M+1831565813|0;let a=Math.imul(M^M>>>15,1|M);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};for(let a=0;a<4;a++)se();const ye=a=>{let o=0;for(const u in a)o+=a[u];let i=se()*o;for(const u in a)if(i-=a[u],i<0)return u;return Object.keys(a)[0]},j=e.trait("Snow",x.sn<.08&&!fe?"Snow into the forest":r.snow&&N==="None yet"?"Heavy on the tops":N),Be=e.trait("Standpoint",I),W=e.trait("Far shore",m?"Long forest wall":ye({"Long forest wall":48,"Wall on the right":22,"Side valley opening":21,"Ranks of spurs":9})),Y=[W==="Wall on the right"?1:0,W==="Ranks of spurs"?1.5:1,W==="Side valley opening"?(se()<.55?1:-1)*(250+se()*260):0,1],f=t.__c595||(t.__c595=Ft(t)),C=f.P,w=r.az,K=r.el,ge=(a,o)=>{const i=Math.cos(a);return[Math.sin(o)*i,Math.sin(a),Math.cos(o)*i]},Z=ge(K,w),n=j==="Snow into the forest"?600:r.snow?820:(j==="None yet"?2600:j==="Heavy on the tops"?1120:1380)+(W==="Ranks of spurs"?520:0),s=j==="Heavy on the tops"||j==="Snow into the forest"||r.snow?.22:1,c=p==="Just turning"?[.6,0,.1,.26]:p==="Past peak, bronze"?[.6,.44,.1,0]:[.6,0,0,0],z=880,g=ie==="Mostly larch"?.35:ie==="Dark spruce belts"?-.19:0,O=r.warm*(p==="Past peak, bronze"?.8:1),J=F==="Clear"?8500:F==="Smoke from down the valley"?7400:5900,_=R>512,L=_?f.MT<3584?f.MT:3584:e.tile?896:1792,$=_?576:e.tile?144:288,Ee=(a,o,i)=>{const u=Math.max(0,Math.min(1,(i-a)/(o-a)));return u*u*(3-2*u)},Pe=a=>{const o=a+A*37;return 6.5+1.5*Math.sin(o*.21+.4)+.7*Math.sin(o*.57+2.6)+2.6*(1-Ee(-9,1,o))+a*a*25e-6},P={eye:[0,2.05,0],pitch:.074,yaw:0,fov:34,wp:.75,elw:[.62,1]};if(I==="Along the shore"){const a=(Y[0]?-1:1)*(x.side<.5?.84:.98);Object.assign(P,{pitch:.062,yaw:a})}else if(I==="From the bank"){const o=Pe(0)- -16,i=o*(.14+.1*Ee(0,22,o));Object.assign(P,{eye:[0,i+1.95,-16],pitch:-.035})}const b=[P.yaw,P.wp,.2,0],ee=P.elw;L<3584&&_&&(b[2]=Math.min(.35,.2*3584/L)),b[3]=Math.max(b[1]/(b[2]*L),ee[0]/ee[1]/$);const ke=f.tex(L,$,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),qe=f.fbo(ke),Se=f.tex(L,$,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,t.LINEAR_MIPMAP_LINEAR,t.LINEAR,t.REPEAT,t.CLAMP_TO_EDGE),Ie=f.fbo(Se),Te=34,ze=new Float32Array(Te*4);let Re=(m?117:Math.floor(v()*1e9))+1;const Fe=()=>{Re=Re+1831565813|0;let a=Math.imul(Re^Re>>>15,1|Re);return a=a+Math.imul(a^a>>>7,61|a)^a,((a^a>>>14)>>>0)/4294967296};for(let a=0;a<Te;a++){const o=a%2?1:-1,i=oe-o*(.14+Fe()*1.25)*(a/Te*.8+.35),u=40+Fe()*90,te=14+Fe()*12;ze[a*4]=i,ze[a*4+1]=u,ze[a*4+2]=te,ze[a*4+3]=1.5+Fe()*3}const Ce=t.createTexture();t.bindTexture(t.TEXTURE_2D,Ce),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,Te,1,0,t.RGBA,t.FLOAT,ze),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const et=[A*913.7,A*417.3],Xe=f.tex(1024,1024,f.terrFmt[0],f.terrFmt[1],f.terrFmt[2],f.tF,f.tF,t.CLAMP_TO_EDGE,t.CLAMP_TO_EDGE),tt=f.fbo(Xe);f.draw(C.terr,tt,1024,1024,()=>{t.uniform2f(C.terr.uOff,et[0],et[1]),t.uniform1f(C.terr.uSeed,A),t.uniform4f(C.terr.uV,Y[0],Y[1],Y[2],Y[3])});const Le=new Float32Array(16);for(let a=0;a<4;a++)for(let o=0;o<3;o++)Le[a*4+o]=r.grey?r.sky[a][o]*1.3:r.sky[a][o]*ht[a][o]/Ye[a][o];Le[3]=r.glow,Le[7]=r.rose;const Lt=ne?[.11,.022,.85,3]:r.ribP||[0,1,0,0],Ut=ne?[1.02,1.01,1,.62]:r.ribC||[0,0,0,0],Mt=r.kh||.66,_t=r.tp||.45,at=a=>()=>{const o=C.pano;t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,Xe),t.uniform1i(o.uH,1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,f.tFn),t.uniform1i(o.uFn,2),t.uniform4f(o.uA,n,z,g,J),t.uniform4f(o.uB,Z[0],Z[1],Z[2],a),t.uniform4f(o.uC,O,2*Math.tan(P.fov*oe/180)/R/b[3],A,W==="Ranks of spurs"?1:0),t.uniform4f(o.uSC,r.sc[0],r.sc[1],r.sc[2],r.sk),t.uniform4fv(o.uK,Le),t.uniform4f(o.uHP,r.hzc[0],r.hzc[1],r.hzc[2],0),t.uniform4f(o.uL,Mt,_t,r.cb||0,s),t.uniform4f(o.uSe,c[0],c[1],c[2],c[3]),t.uniform3f(o.uE,P.eye[0],P.eye[1],P.eye[2]),t.uniform4fv(o.uRb,new Float32Array([...Lt,...Ut])),t.uniform4f(o.uWp,b[0],b[1],b[2],b[3]),t.uniform2f(o.uEl,ee[0],ee[1]),t.uniform1f(o.uMode,a),t.uniform1f(o.uNR,10),t.uniform4f(o.uSk,Z[0],Z[1],Z[2],1)};f.draw(C.pano,qe,L,$,at(0)),f.draw(C.pano,Ie,L,$,at(1)),t.bindTexture(t.TEXTURE_2D,ke),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,Se),t.generateMipmap(t.TEXTURE_2D),t.bindFramebuffer(t.FRAMEBUFFER,null),t.deleteFramebuffer(tt),t.deleteTexture(Xe);let ot=!1,Dt=0;const Nt=()=>{const a=f.getBack(!!e.tile);if(a){ot=!0;for(let o=1;o<6;o++)t.activeTexture(t.TEXTURE0+o),t.bindTexture(t.TEXTURE_2D,null);for(let o=0;o<2;o++)f.draw(a,o?Ie:qe,L,$,()=>{t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,Ce),t.uniform1i(a.uD,2),t.uniform4f(a.uWp,b[0],b[1],b[2],b[3]),t.uniform2f(a.uEl,ee[0],ee[1]),t.uniform1f(a.uMode,o),t.uniform1f(a.uNS,Te),t.uniform4f(a.uSk,0,0,0,1)});t.bindTexture(t.TEXTURE_2D,ke),t.generateMipmap(t.TEXTURE_2D),t.bindTexture(t.TEXTURE_2D,Se),t.generateMipmap(t.TEXTURE_2D),t.deleteFramebuffer(qe),t.deleteFramebuffer(Ie),t.deleteTexture(Ce)}},Ue=Math.tan(P.fov*oe/180),He=d==="Pale granite"?[1.32,1.28,1.2]:d==="Rusty schist"?[1.16,.94,.78]:[1,1,1],rt=be==="Breeze across the lake"?.14:.07,Bt=be==="Needles thick on the surface"?1:.55,Me=F==="Smoke from down the valley"?[.78,.68,.6]:r.grey?[.66,.68,.72]:[.56,.72,.94].map((a,o)=>a*r.hzc[o]/De.hzc[o]),nt=F==="Clear"?.1:F==="Smoke from down the valley"?.55:.4,_e=new Float32Array(64),Ge=r.shadows&&x.cs<.5?[.36,.5,.6]:r.patch?[.6,.72,.88]:[0,0,0];let st=x.cs*40;const ct=.8,it=.6,h=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];let ue=0,me=0,Ht=0;const qt=X?1:0;let We=!1,lt=0,ft=0,Gt=0,Ae=0,Ke=6+v()*8,Oe=5+v()*9;const It=(a,o,i)=>{const u=(a*2-1)*Ue,te=(1-o*2)*Ue,ve=i.F[0]+u*i.R[0]+te*i.U[0],de=i.F[1]+u*i.R[1]+te*i.U[1],he=i.F[2]+u*i.R[2]+te*i.U[2],xe=de<-.02?-i.e[1]/de:900/Math.max(.001,Math.hypot(ve,he));return[i.e[0]+ve*xe,i.e[2]+he*xe]},y={e:[0,0,0],F:[0,0,1],R:[1,0,0],U:[0,1,0]},ut=(a,o)=>{!ot&&++Dt>24&&Nt();const i=e.view||vt,u=P.pitch+i.pitch,te=P.yaw+i.yaw,ve=Math.cos(te),de=Math.sin(te),he=Math.cos(u),xe=Math.sin(u);y.F=[de*he,xe,ve*he],y.R=[ve,0,-de],y.U=[-de*xe,he,-ve*xe],y.e=[P.eye[0]+i.x,P.eye[1]+i.y,P.eye[2]+i.z];const Ct=e.input.down?1:0;Ae=Math.max(0,Math.min(1,Ae+o*(Ct?2.4:-1.6))),Ae>0&&(me+=o*Ae*.03),me+=o*62e-6,st+=o*(.012+Ae*.05);const mt=r.drift>0?K-me:r.drift<0?Math.min(.24,K+me*.5):K,Ve=r.drift>0?Math.max(.06,1-Math.max(0,me-.13)*4.2):r.drift<0?1:Math.max(r.stars?.25:.6,1-me*.9),Qe=ge(Math.max(mt,-.03),w);if(e.input.down&&e.input.inside){const E=It(e.input.x,e.input.y,y);if(We){const ae=Math.hypot(E[0]-lt,E[1]-ft)/Math.max(o,.01);if(ae>2){const D=h[ue];D[0]=E[0],D[1]=E[1],D[2]=Math.min(1.2,.25+ae*.03),D[3]=8+60*Math.max(.1,Math.min(.9,1-e.input.y*.9))*.5+Math.hypot(E[0],E[1])*.22,ue=(ue+1)%4,v()<.4&&e.sound.note(84+v()*10,{dur:.5,vel:.05+v()*.05,wave:"sine"})}}lt=E[0],ft=E[1],We=!0}else We=!1;for(const E of h)E[2]*=Math.exp(-o*.55),E[0]+=ct*o*3.2,E[1]+=it*o*3.2;Oe-=o;let Xt=0;if(Oe<0){Xt=1,Oe=12+v()*24;const E=v()*6.28,ae=40+v()*300,D=h[ue];D[0]=Math.sin(E)*ae*.6,D[1]=60+Math.cos(E)*ae*.5+ae*.3,D[2]=.3+.7*v()*rt*2,D[3]=30+v()*70,ue=(ue+1)%4}Ke-=o,Ke<0&&(Ke=7+v()*16,e.sound.hit("tick",.05+v()*.05)),_e.set([y.e[0],y.e[1],y.e[2],a,y.R[0],y.R[1],y.R[2],Ue,y.U[0],y.U[1],y.U[2],2*Ue/R,y.F[0],y.F[1],y.F[2],mt+(r.elo||0),ct,it,rt+.02*Math.sin(a*.13),R,Me[0],Me[1],Me[2],nt,He[0],He[1],He[2],0,Bt,qt,O,Ve,r.exp,0,0,0,r.sky[0][0],r.sky[0][1],r.sky[0][2],r.glow,r.sky[1][0],r.sky[1][1],r.sky[1][2],r.rose,r.sky[2][0],r.sky[2][1],r.sky[2][2],r.stars*Math.min(1,1.6-Ve),r.sky[3][0],r.sky[3][1],r.sky[3][2],r.cir,0,0,0,0,0,0,0,0,Ge[0],Ge[1],Ge[2],st]),_e[22]=Me[2],_e[23]=nt,t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,R,R),t.useProgram(C.main.p),t.bindVertexArray(f.vao),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE);const k=C.main,pe=(E,ae,D)=>{t.activeTexture(t.TEXTURE0+D),t.bindTexture(t.TEXTURE_2D,ae),t.uniform1i(E,D)};pe(k.uN,f.tN,0),pe(k.uP0,ke,1),pe(k.uP1,Se,2),pe(k.uT1,f.tT1,3),pe(k.uT2,f.tT2,4),pe(k.uW,f.tW,5),t.uniform4fv(k.U,_e),t.uniform4f(k.uSk,Qe[0],Qe[1],Qe[2],Ve),t.uniform1f(k.uSeed,A),t.uniform4f(k.uWp,b[0],b[1],b[2],b[3]),t.uniform2f(k.uEl,ee[0],ee[1]),t.uniform4f(k.uP1a,h[0][0],h[0][1],h[0][2],h[0][3]),t.uniform4f(k.uP2a,h[1][0],h[1][1],h[1][2],h[1][3]),t.uniform4f(k.uP3a,h[2][0],h[2][1],h[2][2],h[2][3]),t.uniform4f(k.uP4a,h[3][0],h[3][1],h[3][2],h[3][3]),t.drawArrays(t.TRIANGLES,0,3)};return ut(0,0),ut}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
