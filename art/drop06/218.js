// Floating Puck: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/218.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(No){No&&function(){"use strict";const Po=new WeakMap,ze=(e,a,l)=>e<a?a:e>l?l:e,ye=160,be=64,de=480,me=192,rt=-14,So=-3.4,Mt=32,Co=12.6,ba=12,ct=56,Wt=44,Xt=12,Yt=600,_o=Wt+Xt+Yt,oe=981,Ie=e=>{const a=String(e);return a.includes(".")||a.includes("e")?a:a+"."},K=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); gl_Position=vec4(p,0.,1.); }`,Ea=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; out vec4 o; uniform int Z0;
  vec2 h2(vec2 p,float s){ p=vec2(dot(p,vec2(127.1,311.7))+s,dot(p,vec2(269.5,183.3))-s); return -1.+2.*fract(sin(p)*43758.5453); }
  float gn(vec2 p,float per,float s){ vec2 i=floor(p),f=p-i,u=f*f*f*(f*(f*6.-15.)+10.);
    float a=dot(h2(mod(i,per),s),f),b=dot(h2(mod(i+vec2(1,0),per),s),f-vec2(1,0)),c=dot(h2(mod(i+vec2(0,1),per),s),f-vec2(0,1)),d=dot(h2(mod(i+vec2(1,1),per),s),f-vec2(1,1));
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
  float fbm(vec2 uv,float per,float s){ float a=.5,r=0.; for(int i=0;i<5+Z0;i++){ r+=a*gn(uv*per,per,s+float(i)*3.1); per*=2.; a*=.5; } return r; }
  void main(){ vec2 uv=gl_FragCoord.xy/256.;
    vec3 q=vec3(0.);            // one fbm call site, rolled on a never-set uniform: a third of the compile
    for(int j=0;j<3+Z0;j++){ float pe=j==0?4.:j==1?6.:16., se=j==0?1.3:j==1?7.7:3.9, k=j==2?1.2:.95; float v=.5+k*fbm(uv,pe,se); if(j==0) q.x=v; else if(j==1) q.y=v; else q.z=v; }
    float r=q.x, g=q.y, b=q.z;
    float w=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
    o=vec4(r,g,b,w); }`,Fa=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; uniform sampler2D tN; uniform vec4 P; out vec4 o;
  float hgt(vec2 p){
    float a=textureLod(tN,p*.5+.13,0.).r, b=textureLod(tN,p*.71+.41,0.).b, c=textureLod(tN,p*1.9+.77,0.).b;
    float pit=smoothstep(.66,.74,textureLod(tN,p*1.9+.3,0.).b);
    float ca=cos(P.y),sa=sin(P.y); vec2 pr=vec2(ca*p.x-sa*p.y,sa*p.x+ca*p.y);
    pr+=(vec2(textureLod(tN,p*.13,0.).r,textureLod(tN,p*.13+.5,0.).g)-.5)*.1;
    float q=abs(abs(pr.x)-abs(pr.y));                                 // the seed's four growth sectors meet on the diagonals
    float cross=P.x*.2*exp(-q*q*1400.)*(.3+1.1*b);
    float s=max(abs(pr.x),abs(pr.y));
    float seed=P.x*smoothstep(.1,.08,s)*.16;
    return .3*a+.07*b+.04*c-.5*pit+cross+seed; }
  void main(){ vec2 uv=gl_FragCoord.xy/512.; vec2 p=(uv-.5)*2.2; float e=.0052;
    float h=hgt(p), hx=hgt(p+vec2(e,0.)), hy=hgt(p+vec2(0.,e));
    vec2 g=clamp(vec2(hx-h,hy-h)/e*.03,-1.,1.);
    float r=length(p);
    float ca=cos(P.y),sa=sin(P.y); vec2 pr=vec2(ca*p.x-sa*p.y,sa*p.x+ca*p.y); float sect=(pr.x*pr.y>0.?.84:1.16)*(.92+.2*textureLod(tN,p*.31,0.).r);
    if(P.x<.5) sect=.85+.3*textureLod(tN,p*2.,0.).g;
    float fr=clamp(.98-.66*smoothstep(.5,1.0,r)-.8*(textureLod(tN,p*.42+.2,0.).g-.38)-.55*(textureLod(tN,p*1.7+.6,0.).b-.38),0.,1.);
    o=vec4(g*.5+.5,clamp(sect*.5,0.,1.),fr); }`,Uo=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float;
  uniform vec4 U[16]; uniform sampler2D tN; out vec4 o;
  #define CAM U[0].xyz
  #define TW U[0].w
  #define FW U[1].xyz
  #define FOC U[1].w
  #define RGH U[2].xyz
  #define SZ U[2].w
  #define UPV U[3].xyz
  #define ACOC U[3].w
  #define LD U[4].xyz
  #define LK U[4].w
  #define KEYC U[5].xyz
  #define GLARE U[5].w
  #define FILLC U[6].xyz
  #define POOL U[6].w
  #define WALLC U[7].xyz
  #define BENCH U[7].w
  #define WID U[8].x
  #define HGT U[8].y
  #define XE U[8].z
  #define BL U[8].w
  #define GAP U[9].x
  #define MH U[9].y
  #define STYLE U[9].z
  #define XMISS U[9].w
  #define PUX U[10].x
  #define POOLD U[11].xyz
  #define KH .42
  #define PILOT U[13].xyz
  #define SPOTR U[14].y
  #define SPOTK U[14].z
  #define PILK U[14].w
  #define LAMPH U[14].x
  #define LP U[15].xyz
  #define LAMPK U[15].w
  vec3 gEP=vec3(0.);
  float spot(vec3 p){ return mix(1.,smoothstep(SPOTR,SPOTR*.45,length(vec2(p.x-U[10].x,p.z*1.15))),SPOTK); }
  float h1(float x){ return fract(sin(x*127.1+1.7)*43758.5453); }
  float sdB(vec3 p,vec3 b,float r){ vec3 q=abs(p)-b+r; return length(max(q,vec3(0.)))+min(max(q.x,max(q.y,q.z)),0.)-r; }
  float gPx=0.;
  vec2 mapM(vec3 p){
    float rowp=WID*2./3.;
    float rz=clamp(floor(p.z/rowp+.5),-1.,1.);
    float sx=p.x+rz*BL*.37, id=floor(sx/BL);
    vec3 q=vec3(sx-(id+.5)*BL,p.y+MH*.5+.014*h1(id+rz*17.),p.z-rz*rowp);
    float rb=clamp(length(p-CAM)*gPx,.04,.1);
    float dm=sdB(q,vec3(BL*.5-GAP*.5,MH*.5,rowp*.5-.014),rb);
    float mat=1.;
    if(STYLE>.5&&STYLE<1.5&&abs(rz)<.5){
      dm=sdB(vec3(p.x,p.y+MH*.5+.05,p.z),vec3(400.,MH*.5-.05,rowp*.5-.05),.03); mat=2.; }
    if(XMISS<900.) dm=max(dm,-sdB(p-vec3(XMISS,0.,0.),vec3(BL*.78,MH+.02,WID+1.),.02));
    float dk=sdB(p-vec3(0.,-MH-KH*.5,0.),vec3(400.,KH*.5,WID+.16),.015);
    float y0=-MH-KH, hr=(HGT+y0)*.5;
    float dr=sdB(p-vec3(0.,y0-hr,0.),vec3(400.,hr,WID-.06),.015);
    vec3 qb=vec3(mod(p.x+1.,5.6)-2.8,p.y+MH+KH*.5,p.z-(WID+.16));
    vec2 hx=abs(qb.xy); float hexd=max(hx.x*.866+hx.y*.5,hx.y)-.145;
    float db=max(hexd,abs(qb.z)-.07);
    vec2 r=vec2(dm,mat);
    if(dk<r.x) r=vec2(dk,2.);
    if(dr<r.x) r=vec2(dr,3.);
    if(db<r.x) r=vec2(db,4.);
    float de=p.x-XE;
    r.x=max(r.x,de);
    float ds=sdB(p-vec3(XE+.3,y0*.5-HGT*.45,0.),vec3(.3,HGT*.5+.22,WID+.34),.06);
    if(ds<r.x) r=vec2(ds,5.);
    return r; }
  #ifdef LITE
  float map(vec3 p){ float y0=-MH-KH, hr=(HGT+y0)*.5;      // the rail as two boxes, enough for its shadow on the bench
    float d=max(sdB(p-vec3(0.,-HGT*.5,0.),vec3(400.,HGT*.5,WID+.16),.02),p.x-XE);
    return min(d,sdB(p-vec3(XE+.3,y0*.5-HGT*.45,0.),vec3(.3,HGT*.5+.22,WID+.34),.06)); }
  #else
  float map(vec3 p){ return mapM(p).x; }
  #endif
  float shadowK(vec3 p,vec3 l,float k){ float res=1.,t=.03; for(int i=0;i<22;i++){ float h=map(p+l*t); res=min(res,k*h/t); t+=clamp(h,.03,.7); if(res<.004||t>16.) break; } return clamp(res,0.,1.); }
  vec3 env(vec3 d,float rough){
    float w=mix(16.,4.,rough);
    float g=exp(-(1.-max(dot(d,POOLD),-1.))*w);
    vec3 c=WALLC*(.0016+POOL*g);
    float z=max(-d.z,.05); vec2 s=d.xy/z;
    float nw=textureLod(tN,s*.14+.3,0.).r;
    c*=.72+.56*nw;
    float blur=.02+rough*.5;
    // shelf and its bright lip, conduit: a real wall, far out of focus
    float shelf=smoothstep(.46-blur,.47,s.y)*smoothstep(.56+blur,.55,s.y);
    c*=1.-.82*shelf;
    c+=WALLC*.2*POOL*g*smoothstep(.45-blur,.455,s.y)*smoothstep(.47+blur,.46,s.y);
    float cd=smoothstep(.04+blur,.03,abs(s.x+.42)); c*=1.-.6*cd;
    c+=WALLC*.05*POOL*smoothstep(.012+blur,.0,abs(s.x+.405));
    float cd2=smoothstep(.02+blur,.015,abs(s.x-1.24)); c*=1.-.5*cd2;
    // a big scrim high on the wall, above the frame: what makes plated metal read as metal
    { float bl2=.03+rough*.55; float pu=smoothstep(.13-bl2,.13+bl2,s.y)*smoothstep(2.4+bl2,2.4-bl2,s.y)*smoothstep(-.7-bl2,-.7+bl2,s.x)*smoothstep(1.7+bl2,1.7-bl2,s.x)*step(0.,-d.z);
      float mull=1.-(1.-rough)*.75*smoothstep(.022+bl2*.4,.008,abs(fract(s.x*1.15+.37)-.5))-(1.-rough)*.7*smoothstep(.02+bl2*.4,.006,abs(s.y-.41));
      c+=KEYC*U[12].z*pu*mull*(.72+.5*smoothstep(.13,.72,s.y))*exp(-max(s.y-.72,0.)*.7); }
    // the lamp's box, seen only in reflections
    vec3 lx=normalize(cross(LD,vec3(0.,1.,0.))), ly=cross(lx,LD); float dn=max(dot(d,LD),.0001);
    vec2 q=vec2(dot(d,lx),dot(d,ly))/dn;
    float bl=.06+rough*.9;
    float box=smoothstep(.46+bl,.46-bl,abs(q.x))*smoothstep(.34+bl,.34-bl,abs(q.y))*step(0.,dot(d,LD));
    c+=KEYC*box*GLARE*(.9/(1.+rough*rough*7.));
    // a small lamp head at its own place: from any point it is a soft disc, and the room's air glows toward it
    { vec3 lv=LP-gEP; float ld=length(lv); float ca=dot(d,lv/ld); float ar=1.6/ld+rough*.35;
      c+=KEYC*LAMPK*smoothstep(1.-ar*ar*.5,1.-ar*ar*.12,ca)*(1./(1.+rough*rough*30.));
      c+=KEYC*LAMPH*exp((ca-1.)*40.)*(.6+.4*rough); }
    c+=vec3(1.,.42,.12)*PILK*smoothstep(.99985,.99996,dot(d,PILOT));
    // the room behind the camera: a tall window with bars, dim
    if(d.z>.03){ vec2 wn=d.xy/d.z; float w0=smoothstep(.7+bl,.7-bl,abs(wn.x+.3))*smoothstep(.0-bl,.0+bl,wn.y)*smoothstep(1.2+bl,1.2-bl,wn.y);
      float bars=1.-.8*smoothstep(.03+bl,.015,abs(wn.x+.28))*(1.-rough)-.8*smoothstep(.03+bl,.015,abs(wn.y-.55))*(1.-rough);
      c+=FILLC*(.1+1.3*w0*bars); }
    c+=FILLC*.07*max(d.y,0.);
    return c; }
  float ggx(float nh,float a){ float a2=a*a, d=nh*nh*(a2-1.)+1.; return a2/(3.1416*d*d); }
  vec3 cookLight(vec3 n,vec3 v,vec3 l,vec3 f0,float rough){ vec3 h=normalize(l+v); float nh=max(dot(n,h),0.), nl=max(dot(n,l),0.), vh=max(dot(v,h),0.);
    float a=max(rough*rough,.02); vec3 f=f0+(1.-f0)*pow(1.-vh,5.); return f*ggx(nh,a)*nl/(4.*max(vh*vh,.08)*(a*.5+.5)); }
  float fbmN(vec2 p){ return .55*textureLod(tN,p,0.).r+.3*textureLod(tN,p*2.7+.31,0.).g+.15*textureLod(tN,p*7.3+.17,0.).b; }
  float atn2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-30)); a=ay>ax?1.5707964-a:a; a=x<0.?3.1415927-a:a; return y<0.?-a:a; }
  // a dewar and a stand, behind the rail
  vec4 backProps(vec3 ro,vec3 rd){
    vec4 r=vec4(1e6,0.,0.,0.);
    { vec3 ce=vec3(U[10].y,0.,U[10].z); float rr=U[10].w; vec2 oc=ro.xz-ce.xz; float a=dot(rd.xz,rd.xz),b=dot(oc,rd.xz),c=dot(oc,oc)-rr*rr,dd=b*b-a*c;
      if(dd>0.){ float t=(-b-sqrt(dd))/a; float y=ro.y+rd.y*t; if(t>0.&&y>-HGT-14.&&y<U[11].w) r=vec4(t,6.,0.,0.); else if(t>0.&&y>=U[11].w&&rd.y<0.){ float tt=(U[11].w-ro.y)/rd.y; vec2 pp=ro.xz+rd.xz*tt-ce.xz; if(dot(pp,pp)<rr*rr) r=vec4(tt,6.,1.,0.); } } }
    { vec3 ce=vec3(U[12].x,0.,U[12].y); float rr=.32; vec2 oc=ro.xz-ce.xz; float a=dot(rd.xz,rd.xz),b=dot(oc,rd.xz),c=dot(oc,oc)-rr*rr,dd=b*b-a*c;
      if(dd>0.){ float t=(-b-sqrt(dd))/a; float y=ro.y+rd.y*t; if(t>0.&&t<r.x&&y>-HGT-14.) r=vec4(t,7.,0.,0.); } }
    return r; }`,Bo=Uo+`
  void main(){
    vec2 ndc=gl_FragCoord.xy/SZ*2.-1.;
    vec3 rd0=FW+RGH*ndc.x*TW+UPV*ndc.y*TW;
    vec3 rd=normalize(rd0); vec3 ro=CAM; float dscale=length(rd0); gPx=2.2*TW/SZ;
    float tb=(-HGT-ro.y)/rd.y; bool hitB=rd.y<0.&&tb>0.&&ro.z+rd.z*tb>((BENCH>.5&&BENCH<2.5)?-12.:-30.);
    float t=rd.y<0.?max((.5-ro.y)/rd.y,0.):1e6, tEnd=hitB?tb:90.; bool hit=false;
    for(int i=0;i<84;i++){ float d=map(ro+rd*t); if(d<.0012*max(t*.08,1.)){ hit=true; break; } t+=d*.96; if(t>tEnd) break; }
    if(!hit) discard;
    vec3 p=ro+rd*t, n=vec3(0.,1.,0.), v=-rd;
    float depth=t/dscale;
    vec3 f0=vec3(.04), alb=vec3(.02); float rough=.5, ao=1., shK=1., specK=1., envK=1.;
    vec3 col=vec3(0.);
      // normal, occlusion and material from one call site of the distance field (each call site compiles again on Windows)
      vec3 nn=vec3(0.); float mat=1., aos=0., aow=1.;
      for(int i=0;i<9+int(U[13].w);i++){
        vec3 e=vec3(float((i+3)>>1&1),float(i>>1&1),float(i&1))*2.-1.;
        float hh=.035*float((i-3)*(i-3));
        vec3 nq=normalize(nn+vec3(0.,1e-7,0.));
        vec3 sp=i<4?p+e*.0035:(i<8?p+nq*hh:p);
        vec2 mm=mapM(sp);
        if(i<4) nn+=e*mm.x; else if(i<8){ aos+=aow*max(hh-mm.x,0.)/hh; aow*=.62; } else mat=mm.y;
      }
      n=normalize(nn);
      float rowp=WID*2./3.;
      float rz=clamp(floor(p.z/rowp+.5),-1.,1.), sx=p.x+rz*BL*.37, id=floor(sx/BL);
      ao=clamp(1.-.62*aos,0.,1.);
      if(mat<1.5){
        float h=h1(id*3.1+rz*11.);
        vec2 q=abs(n.y)>.5?p.xz:vec2(p.x,p.y*1.3+p.z);
        float large=fbmN(q*.11+h);
        float mottled=fbmN(q*.37+h*3.);
        float streak=textureLod(tN,vec2(q.x*.021+h,q.y*.33),0.).b;
        float scr=smoothstep(.72,.8,textureLod(tN,vec2(q.x*.012+h*2.,q.y*.5+h),0.).b)*.6;
        rough=.07+.04*h+.06*smoothstep(.42,.72,mottled)+.03*streak;
        vec3 metal=STYLE>2.5?vec3(1.0,.74,.34):STYLE>1.5?vec3(.05):vec3(.74,.71,.65);
        if(STYLE>1.5&&STYLE<2.5){ f0=vec3(.05); rough=.16+.2*mottled; alb=vec3(.016); } else { f0=metal*(.84+.2*h); alb=vec3(0.); }
        n=normalize(n+vec3(textureLod(tN,q*.21+.2,0.).g-.5,0.,textureLod(tN,q*.21+.6,0.).r-.5)*.03*smoothstep(.5,.95,n.y)+vec3(0.,0.,(streak-.5)*.012+scr*.03)*n.y);
        float rel=.5*BL-abs(sx-(id+.5)*BL), rez=rowp*.5-abs(p.z-rz*rowp);
        float edge=min(rel,rez);
        float chip=smoothstep(.13,.04,edge)*smoothstep(.8,.86,textureLod(tN,q*.13+h,0.).b);   // a few chipped corners, not a stitch along every edge
        f0*=1.-.72*chip; rough=mix(rough,.6,chip); alb+=.03*chip;
        f0*=.97+.08*(mottled-.5);
        // fine wear: long hairline scratches along the rail, a few across it, tiny pits in the plating
        float lines=smoothstep(.62,.7,textureLod(tN,vec2(q.x*.007+h*1.7,q.y*.71+h),0.).b);
        float cross2=smoothstep(.72,.78,textureLod(tN,vec2(q.x*.5+q.y*.11+h,q.y*.012-q.x*.02),0.).b);
        float pits=smoothstep(.78,.86,textureLod(tN,q*.43+h,0.).b);
        f0*=1.+.34*lines+.22*cross2-.5*pits; rough+=.05*lines+.1*pits;
        f0*=1.-.1*smoothstep(.5,.72,large);        // old fingerprints and tarnish
        // rime: grows from the block seams and the cold zone under the puck, a fine powder
        float cold=exp(-abs(p.x-PUX)/6.5)*(.12+.88*smoothstep(-.2,.3,n.y));
        float seamf=smoothstep(.13,.0,edge);
        float rm=smoothstep(.56,.8,.5*textureLod(tN,q*.09+.1,0.).r+.3*textureLod(tN,q*.43+.7,0.).b+.1*seamf)*cold;
        rm*=.35+.65*textureLod(tN,q*.57,0.).b*1.3; rm*=.08+.92*smoothstep(.2,.7,n.y);
        rm=clamp(rm,0.,1.)*.85;
        alb=mix(alb,vec3(.62,.66,.72),rm); f0*=1.-.9*rm; rough=mix(rough,.8,rm);
      } else if(mat<2.5){
        float brushed=textureLod(tN,vec2(p.x*.02,p.y*.4+p.z*.4),0.).b;
        f0=vec3(.16,.165,.17)*(.84+.3*brushed); rough=.46+.16*brushed; alb=vec3(.01);
        n=normalize(n+vec3(0.,(brushed-.5)*.03,0.));
      } else if(mat<3.5){
        float br=textureLod(tN,vec2(p.x*.05,p.y*.3),0.).g;
        alb=vec3(.016,.017,.019)*(.8+.4*br); f0=vec3(.04); rough=.62+.1*br;
      } else if(mat<4.5){
        f0=vec3(.5); rough=.3; alb=vec3(0.);
        vec2 hb=vec2(mod(p.x+1.,5.6)-2.8,p.y+MH+KH*.5); float sock=smoothstep(.065,.05,max(abs(hb.x)*.866+abs(hb.y)*.5,abs(hb.y)));
        f0*=1.-.92*sock; ao*=1.-.6*sock;
      } else {
        float br=textureLod(tN,vec2(p.y*.3,p.z*.08),0.).b;
        f0=vec3(.92,.66,.34)*(.8+.3*br); rough=.26+.12*br; alb=vec3(0.);
      }
    {
      float sh=shadowK(p+n*.006,LD,LK);
      vec3 R=reflect(rd,n); gEP=p;
      vec3 envc=env(R,rough);
      float nv=max(dot(n,v),0.);
      vec3 Fr=f0+(max(vec3(1.-rough),f0)-f0)*pow(1.-nv,5.);
      float spt=spot(p);
      vec3 spec=cookLight(n,v,LD,f0,rough)*KEYC*sh*specK*spt;
      vec3 amb=FILLC*(.5+.5*max(n.y,0.))+WALLC*POOL*.5+KEYC*U[12].z*.25*max(n.y,0.);
      vec3 diff=alb*(KEYC*max(dot(n,LD),0.)*sh*shK*spt+amb);
      col=diff*ao+envc*Fr*envK*(.25+.75*ao)+spec*ao;
    }
    float coc=ACOC*(depth-FOC)/max(depth,.1)*(1.+1.5*smoothstep(32.,52.,depth)); coc*=coc<0.?.66:1.;
    o=vec4(col,clamp(coc,-30.,44.));
  }`,Io=Uo.replace(`es
`,`es
#define LITE
`)+`
  void main(){
    vec2 ndc=gl_FragCoord.xy/SZ*2.-1.;
    vec3 rd0=FW+RGH*ndc.x*TW+UPV*ndc.y*TW;
    vec3 rd=normalize(rd0); vec3 ro=CAM; float dscale=length(rd0); gPx=2.2*TW/SZ;
    float tb=(-HGT-ro.y)/rd.y; bool hitB=rd.y<0.&&tb>0.&&ro.z+rd.z*tb>((BENCH>.5&&BENCH<2.5)?-12.:-30.);
    vec4 bp=backProps(ro,rd);
    bool back=bp.y>.5&&(!hitB||bp.x<tb);
    float tHit=back?bp.x:(hitB?tb:70.);
    bool room=!back&&!hitB;
    vec3 p=ro+rd*tHit, n=vec3(0.,1.,0.), v=-rd;
    float depth=room?70.:tHit/dscale;
    vec3 f0=vec3(.04), alb=vec3(.02); float rough=.5, ao=1., shK=1., specK=1., envK=1.;
    vec3 col=vec3(0.);
    if(back){
      if(bp.y<6.5){
        vec3 ce=vec3(U[10].y,p.y,U[10].z); n=bp.z>.5?vec3(0.,1.,0.):normalize(p-ce);
        float rs=textureLod(tN,vec2(p.y*.05,atn2(n.x,n.z)*.5),0.).b;
        rough=.2+.08*rs; f0=vec3(.82,.84,.86)*(.9+.3*rs); alb=vec3(0.);
        if(bp.z>.5){ float rr=length(p.xz-ce.xz)/U[10].w; float lip=smoothstep(.72,.8,rr); f0*=lip*.22; alb=vec3(.01)*(1.-lip); }
      } else { n=normalize(p-vec3(U[12].x,p.y,U[12].y)); rough=.25; f0=vec3(.6); alb=vec3(0.); }
      ao=1.; shK=.5; envK=bp.z>.5?.35:3.;
    } else if(hitB){
      vec2 q=p.xz;
      float big=fbmN(q*.045+.2), mid=fbmN(q*.21+.5);
      float scr=smoothstep(.75,.82,textureLod(tN,vec2(q.x*.05+q.y*.02,q.y*.3-q.x*.09),0.).b)*.8;
      float dust=smoothstep(.75,1.,textureLod(tN,q*.8,0.).a)*.3;
      if(BENCH<.5){ alb=vec3(.012,.013,.015)*(.8+.5*big); rough=.14+.14*smoothstep(.4,.72,mid)+.25*scr; f0=vec3(.045); }
      else if(BENCH<1.5){ alb=vec3(0.); f0=vec3(.26,.27,.28)*(.86+.2*big); float bs=textureLod(tN,vec2(q.x*.015,q.y*.25),0.).b; rough=.38+.14*bs; n=normalize(n+vec3(0.,0.,(bs-.5)*.03)); }
      else if(BENCH<2.5){ vec2 cellp=q*4.5+(vec2(textureLod(tN,q*.31,0.).b,textureLod(tN,q*.31+.5,0.).b)-.45)*3.4; vec2 cid=floor(cellp); float rb=textureLod(tN,cid/64.,0.).a; vec2 fq=fract(cellp)-.5; float dom=1.-smoothstep(.1,.5,length(fq));
        alb=vec3(.72,.73,.72)*(.72+.28*dom)*(.9+.15*rb); rough=.8; f0=vec3(.02); n=normalize(n+vec3(fq.x,0.,fq.y)*.34*(1.-dom)); }
      else { alb=vec3(.026,.028,.031)*(.6+.9*big)*(.8+.4*mid); rough=.34+.24*mid; f0=vec3(.05); n=normalize(n+vec3(textureLod(tN,q*.17,0.).g-.5,0.,textureLod(tN,q*.17+.4,0.).r-.5)*.1); }
      alb+=dust*.02;
      // water beaded out of the room's air along the rail
      float wet=smoothstep(.55,.8,textureLod(tN,q*.1+.4,0.).g)*exp(-max(abs(p.z)-WID,0.)*.2);
      float beads=smoothstep(.962,.985,textureLod(tN,q*.31,0.).a*.5+.5*textureLod(tN,q*.47+.33,0.).a)*wet;
      n=normalize(n+vec3(textureLod(tN,q*.9,0.).a-.5,0.,textureLod(tN,q*.9+.5,0.).a-.5)*.5*beads);
      { float dz=max(abs(p.z)-WID+.05,0.); ao=1.-.5*exp(-dz*2.6); }
      specK=.3; shK=.7; envK=.8;
    }
    vec3 R=room?rd:reflect(rd,n); gEP=room?ro:p;
    vec3 envc=env(R,room?0.:rough);
    if(room) col=envc;
    else {
      float sh=shadowK(p+n*.006,LD,LK);
      // a bench mirrors the rail's near face
      if(hitB&&!back&&R.z<0.){ float tr=(WID+.1-p.z)/R.z; if(tr>0.){ float yr=p.y+R.y*tr; if(yr<0.&&p.x+R.x*tr<XE) envc=FILLC*(.1+.5*clamp((yr+HGT)/HGT,0.,1.)); } }
      float nv=max(dot(n,v),0.);
      vec3 Fr=f0+(max(vec3(1.-rough),f0)-f0)*pow(1.-nv,5.);
      float spt=spot(p);
      vec3 spec=cookLight(n,v,LD,f0,rough)*KEYC*sh*specK*spt;
      vec3 amb=FILLC*(.5+.5*max(n.y,0.))+WALLC*POOL*.5+KEYC*U[12].z*.25*max(n.y,0.);
      vec3 diff=alb*(KEYC*max(dot(n,LD),0.)*sh*shK*spt+amb);
      col=diff*ao+envc*Fr*envK*(.25+.75*ao)+spec*ao;
    }
    float coc=ACOC*(depth-FOC)/max(depth,.1)*(1.+1.5*smoothstep(32.,52.,depth)); coc*=coc<0.?.66:1.;
    o=vec4(col,clamp(coc,-30.,44.));
  }`,ko=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; uniform sampler2D tS; uniform sampler2D tN; uniform vec4 D; uniform vec4 G; uniform vec4 G2; out vec4 o;
  vec3 tm(vec3 c){ c=c*D.y; c=c*(1.+c*.1)/(c+.62); c=c*c/(c+.018); return pow(clamp(c,0.,1.),vec3(.4545)); }
  void main(){ vec2 px=1./vec2(D.x); vec2 uv=gl_FragCoord.xy*px; float k=D.x/1000.;
    float c0=texture(tS,uv).a;
    float near=max(-c0,0.);
    for(int i=0;i<8;i++){ float a=float(i)*.785; near=max(near,-textureLod(tS,uv+vec2(cos(a),sin(a))*20.*k*px,0.).a); }
    float rad=max(max(abs(c0),near*.8),.75);   // never under a pixel: the sharp rail edge is filtered, not stepped
    vec3 s=vec3(0.); float w=0.;
    float jit=textureLod(tN,gl_FragCoord.xy/256.,0.).a*1.4;
    for(int i=0;i<56;i++){
      float fi=float(i)+.5, r=sqrt(fi/56.), a=fi*2.39996+jit;
      vec2 off=vec2(cos(a),sin(a))*r*rad*k;
      vec4 t=textureLod(tS,uv+off*px,0.);
      float dist=r*rad, cs=abs(t.a);
      float wt=smoothstep(dist-1.2,dist+1.2,cs+.8);
      if(t.a>c0+6.&&c0>-1.) wt*=clamp(1.-(t.a-c0-6.)/20.,.0,1.)*.4;  // sharp foreground does not bleed from the far blur
      wt*=1.-.55*r*r;
      vec3 cc=t.rgb/(1.+max(t.r,max(t.g,t.b)));
      s+=cc*wt; w+=wt; }
    vec3 c=s/max(w,.001); c=c/max(1.-max(c.r,max(c.g,c.b)),.02);
    float vg=dot(uv-.5,uv-.5); c*=1.-.1*vg*G.w;
    c=tm(c);
    float l=dot(c,vec3(.3,.59,.11)); c=mix(vec3(l),c,G2.w);
    c*=G.xyz; c+=G2.xyz*(1.-l)*.05;
    float gr=texture(tN,gl_FragCoord.xy/vec2(256.)*(1./max(k,.5))*.9+.37).a-.5;
    c+=gr*(.011+.016*(1.-l));
    o=vec4(c,1.); }`,Ae=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float;
  layout(std140) uniform UF { vec4 F[23]; };
  #define CAM F[0].xyz
  #define TW F[0].w
  #define FW F[1].xyz
  #define FOC F[1].w
  #define RGH F[2].xyz
  #define SZ F[2].w
  #define UPV F[3].xyz
  #define ACOC F[3].w
  #define CEN F[4].xyz
  #define RAD F[4].w
  #define EX F[5].xyz
  #define HH F[5].w
  #define EY F[6].xyz
  #define HOLE F[6].w
  #define EZ F[7].xyz
  #define FILM F[7].w
  #define LD F[8].xyz
  #define PEN F[8].w
  #define VP F[9].xy
  #define OM F[9].z
  #define DTS F[9].w
  #define TIME F[10].x
  #define FROST F[10].y
  #define EXPO F[10].z
  #define TN01 F[10].w
  #define WID F[11].x
  #define HGT F[11].y
  #define XE F[11].z
  #define ZN F[11].w
  #define KEYC F[12].xyz
  #define FOGD F[12].w
  #define FILLC F[13].xyz
  #define SHTOP F[13].w
  #define WALLC F[14].xyz
  #define POOL F[14].w
  #define POOLD F[15].xyz
  #define GLARE F[15].w
  #define FOGL F[16].xyz
  #define BOUNCE F[16].w
  #define FOGS F[17].xyz
  #define SHBENCH F[17].w
  #define GRADE F[18].xyz
  #define SAT F[18].w
  #define RTIME F[19].x
  #define BUOY F[19].y
  #define WIND F[19].z
  #define ZF F[19].w
  #define PANEL F[20].x
  #define SPOTR F[20].y
  #define SPOTK F[20].z
  #define RIMK F[20].w
  #define LDIR F[21].xyz
  #define FWD F[21].w
  #define POOLX F[22].x
  float spotW(vec2 w){ return mix(1.,smoothstep(SPOTR,SPOTR*.45,abs(w.x-POOLX)),SPOTK); }
  // fog lit from where the lamp is: grey where thick and in its own shade, glowing at its thin edges when the lamp is behind it
  vec3 fogC(float lit,float a,vec3 rd,vec2 w){ float sp=spotW(w); float ph=exp((dot(normalize(rd),LDIR)-1.)*6.);
    return mix(FOGS,FOGL,lit*sp)+FOGL*(FWD*ph*sp*(1.25-a)*(.35+.65*lit)); }
  const vec2 D0=vec2(${Ie(rt)},${Ie(So)}), DS=vec2(${Ie(Mt)},${Ie(Co)});
  vec2 domUv(vec2 p){ return (p-D0)/DS; }
  vec3 tmG(vec3 c){ c=c*EXPO; c=c*(1.+c*.1)/(c+.62); c=c*c/(c+.018); c=pow(clamp(c,0.,1.),vec3(.4545)); float l=dot(c,vec3(.3,.59,.11)); return mix(vec3(l),c,SAT)*GRADE; }
  // how much of the puck (a capped cylinder) lies across the ray from P along d: 0 clear, 1 blocked
  float puckBlock(vec3 P,vec3 d,float pen){
    vec3 w=P-CEN;
    vec3 ro=vec3(dot(w,EX),dot(w,EY),dot(w,EZ)), rd=vec3(dot(d,EX),dot(d,EY),dot(d,EZ));
    float a=max(dot(rd.xz,rd.xz),1e-4);
    float ts=-dot(ro.xz,rd.xz)/a;
    float ry=abs(rd.y)<1e-3?1e-3:rd.y;
    float t1=(-HH-ro.y)/ry, t2=(HH-ro.y)/ry;
    float tn=min(t1,t2), tf=max(t1,t2);
    float tb=clamp(ts,tn,tf);
    vec2 q=ro.xz+rd.xz*tb;
    float r=length(q);
    float s=smoothstep(RAD+pen,RAD-pen,r)*step(0.,tf);
    if(HOLE>0.) s*=smoothstep(HOLE-pen,HOLE+pen,length(ro.xz+rd.xz*clamp(ts,tn,tf)));
    return s; }`,Oo=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  layout(std140) uniform UF { vec4 F[23]; };
  out vec3 vR;
  void main(){ vec2 p=vec2(float((gl_VertexID&1)*2-1),float((gl_VertexID&2)-1)); gl_Position=vec4(p,0.,1.);
    vR=F[1].xyz+F[2].xyz*p.x*F[0].w+F[3].xyz*p.y*F[0].w; }`,Ho=Ae+`
  uniform sampler2D tV,tD,tN; out vec4 o;
  const vec2 G=vec2(${ye}.,${be}.);
  float puckMask(vec2 w){ vec2 q=w-CEN.xy; float ex=length(EX.xy), ey=length(EY.xy);
    vec2 a=EX.xy/max(ex,.001), b=vec2(-a.y,a.x);
    vec2 loc=vec2(dot(q,a),dot(q,b));
    float hw=RAD*ex+HH*ey*.0+.02, hh=HH*max(ey,.4)+RAD*length(EZ.xy)*.3;
    return smoothstep(.34,-.3,max(abs(loc.x)-hw,abs(loc.y)-hh)); }
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS; vec2 e=1./G;
    vec2 v0=texture(tV,uv).xy;
    vec2 b=uv-DTS*v0/DS;
    vec2 v=texture(tV,b).xy;
    float cu=texture(tV,uv).z;
    float cl=abs(texture(tV,uv-vec2(e.x,0.)).z), cr=abs(texture(tV,uv+vec2(e.x,0.)).z), cb=abs(texture(tV,uv-vec2(0.,e.y)).z), ct=abs(texture(tV,uv+vec2(0.,e.y)).z);
    vec2 gr=vec2(cr-cl,ct-cb); float gl=length(gr)+1e-3;
    v+=DTS*2.2*vec2(gr.y,-gr.x)/gl*cu*${Ie(.05)};
    float d=texture(tD,uv).r;
    v.y-=BUOY*min(d,1.6)*DTS;
    vec2 nu=uv*vec2(2.1,.9)+vec2(RTIME*.021,-RTIME*.017);
    vec4 nn=texture(tN,nu);
    v+=DTS*WIND*vec2(nn.r-.5,(nn.g-.5)*.5);
    // the rail takes the falling sheet's momentum and spreads it; the near edge lets some spill past
    float top=smoothstep(.34,.0,abs(w.y-.05))*step(w.x,XE);
    v.y*=1.-top*min(DTS*22.,.82);
    float fl=smoothstep(.45,.0,w.y+HGT);
    v.y=mix(v.y,max(v.y,0.)*.3,fl);
    v*=exp(-DTS*(1.0+.9*fl));
    float m=puckMask(w);
    vec2 rel=w-CEN.xy;
    vec2 vs=VP+OM*vec2(-rel.y,rel.x); vs*=min(1.,28./max(length(vs),1e-3));
    v=mix(v,vs,m*(.15+.85*clamp(length(VP)/3.,0.,1.)));   // the fog slips round a still disc in the third dimension
    // open sky and sides: everything fades to rest at the box edge
    vec2 ed=min(uv,1.-uv); float eb=smoothstep(.0,.03,min(ed.x,ed.y));
    v*=mix(.9,1.,eb);
    o=vec4(clamp(v,vec2(-180.),vec2(180.)),0.,1.); }`,qo=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; uniform sampler2D tV; out vec4 o;
  void main(){ ivec2 p=ivec2(gl_FragCoord.xy), m=ivec2(${ye-1},${be-1});
    float l=texelFetch(tV,ivec2(max(p.x-1,0),p.y),0).x, r=texelFetch(tV,ivec2(min(p.x+1,m.x),p.y),0).x,
      b=texelFetch(tV,ivec2(p.x,max(p.y-1,0)),0).y, t=texelFetch(tV,ivec2(p.x,min(p.y+1,m.y)),0).y;
    o=vec4(.5*(r-l+t-b),0.,0.,1.); }`,Go=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; uniform sampler2D tP,tDv; out vec4 o;
  void main(){ ivec2 p=ivec2(gl_FragCoord.xy), m=ivec2(${ye-1},${be-1});
    float l=texelFetch(tP,ivec2(max(p.x-1,0),p.y),0).x, r=texelFetch(tP,ivec2(min(p.x+1,m.x),p.y),0).x,
      b=texelFetch(tP,ivec2(p.x,max(p.y-1,0)),0).x, t=texelFetch(tP,ivec2(p.x,min(p.y+1,m.y)),0).x;
    float dv=texelFetch(tDv,p,0).x;
    o=vec4((l+r+b+t-dv)*.25,0.,0.,1.); }`,Ko=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; uniform sampler2D tP,tV; out vec4 o;
  void main(){ ivec2 p=ivec2(gl_FragCoord.xy), m=ivec2(${ye-1},${be-1});
    ivec2 L=ivec2(max(p.x-1,0),p.y),R=ivec2(min(p.x+1,m.x),p.y),B=ivec2(p.x,max(p.y-1,0)),T=ivec2(p.x,min(p.y+1,m.y));
    vec2 v=texelFetch(tV,p,0).xy-.26*vec2(texelFetch(tP,R,0).x-texelFetch(tP,L,0).x,texelFetch(tP,T,0).x-texelFetch(tP,B,0).x);
    float cu=(texelFetch(tV,R,0).y-texelFetch(tV,L,0).y)-(texelFetch(tV,T,0).x-texelFetch(tV,B,0).x);
    o=vec4(v,cu,1.); }`,Vo=Ae+`
  uniform sampler2D tV,tD; out vec4 o;
  const vec2 G=vec2(${de}.,${me}.);
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS;
    vec2 v=texture(tV,uv).xy;
    v.y=v.y>0.?v.y*.22:v.y;        // cold fog is heavy: the return flow of the air does not carry it up
    vec2 back=uv-DTS*v/DS;
    vec2 e=vec2(1.5/${de}.,1.5/${me}.);
    float phi=texture(tD,back).r;
    float d=mix(phi,.25*(texture(tD,back+vec2(e.x,0.)).r+texture(tD,back-vec2(e.x,0.)).r+texture(tD,back+vec2(0.,e.y)).r+texture(tD,back-vec2(0.,e.y)).r),min(DTS*2.5,.3));
    // mixing with dry air: thin wisps vanish first
    d*=exp(-DTS*(.5+.36/(d*4.+.22)+1.3*smoothstep(.2,3.8,w.y-CEN.y)+2.*smoothstep(RAD*.7,RAD*3.,abs(w.x-CEN.x))*smoothstep(.1,1.8,w.y)+.5*smoothstep(RAD*1.5,RAD*5.,abs(w.x-CEN.x))));
    vec2 ed=min(uv,1.-uv); d*=smoothstep(0.,.02,min(ed.x,ed.y));
    o=vec4(d,0.,0.,1.); }`,Wo=Ae+`
  uniform sampler2D tD,tV,tN; out vec4 o;
  const vec2 G=vec2(${de}.,${me}.);
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS;
    vec2 e=vec2(1.5/${de}.,1.5/${me}.);
    float d=.4*texture(tD,uv).r+.15*(texture(tD,uv+vec2(e.x,0.)).r+texture(tD,uv-vec2(e.x,0.)).r+texture(tD,uv+vec2(0.,e.y)).r+texture(tD,uv-vec2(0.,e.y)).r);
    vec2 l=normalize(LD.xy)/DS*.5;
    float tau=0.;
    for(int i=1;i<=6;i++){ tau+=textureLod(tD,uv+l*float(i),0.).r; }
    float light=exp(-tau*.28*FOGD);
    float sp=puckBlock(vec3(w,0.),LD,.55+.1*length(w-CEN.xy));
    light*=1.-.34*sp;
    // fine vapour threads, carried by the flow on two staggered phases so they stretch along it and never slide over it
    vec2 vv=texture(tV,uv).xy; vv*=min(1.,14./max(length(vv),.01));
    float cyc=RTIME/.9, ph1=fract(cyc), ph2=fract(cyc+.5);
    vec2 q1=(w-vv*ph1*.38)*vec2(.066,.1)+floor(cyc)*.37, q2=(w-vv*ph2*.38)*vec2(.066,.1)+floor(cyc+.5)*.61+.5;
    float n1=texture(tN,q1).b, n2=texture(tN,q2).b;
    float wg=abs(ph1-.5)*2.;
    float det=mix(n1,n2,wg);
    float nlow=texture(tN,w*vec2(.05,.03)+RTIME*vec2(.004,.02)).r;
    float th=smoothstep(.26,.76,det*.75+nlow*.35);
    float dc=d/(1.+d*.7);
    float ftop=.45+max(CEN.y+HH*.6-.45,0.)*exp(-pow((w.x-CEN.x)/(RAD*1.4),2.)); float a=(1.-exp(-dc*FOGD*(.42+.95*th)))*mix(1.,.08,smoothstep(ftop,ftop+1.1,w.y));   // cold fog has a top: nothing stands up out of it
    o=vec4(a,light,min(d,1.),1.); }`,Ta=Ae+`
  uniform sampler2D tN; out vec4 o;
  const vec2 G=vec2(${de}.,${me}.);
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS; vec2 q=w-CEN.xy;
    float n=texture(tN,vec2(w.x*.05+q.y*.01,w.y*.03+RTIME*.04)).r, n2=texture(tN,vec2(w.x*.14,w.y*.08+RTIME*.09)).b;
    float pl=exp(-q.x*q.x/(RAD*RAD*1.5))*smoothstep(.5,-.5,q.y)*exp(max(-q.y,0.)*-.25)*TN01;
    float a=clamp(pl*smoothstep(.32,.72,n*.6+n2*.5),0.,1.);
    o=vec4(a*.7,.8,a,1.); }`,Xo=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  layout(location=0) in vec4 a0; layout(location=1) in vec4 a1;
  out vec2 vQ; out vec4 vA; out vec2 vW;
  const vec2 D0=vec2(${Ie(rt)},${Ie(So)}), DS=vec2(${Ie(Mt)},${Ie(Co)});
  void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.; vQ=c;
    vW=a0.xy+c*a0.z; vec2 p=(vW-D0)/DS*2.-1.; gl_Position=vec4(p,0.,1.); vA=vec4(a0.w,a1.xy,a1.z); }`,ga=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; in vec2 vQ; in vec4 vA; in vec2 vW; uniform sampler2D tN; out vec4 o;
  void main(){ float g=exp(-dot(vQ,vQ)*3.2)*(1.-smoothstep(.8,1.,length(vQ)));
    float n=texture(tN,vW*.31+vA.w).b; o=vec4(vA.x*g*(.25+1.5*n*n),0.,0.,0.); }`,Da=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  precision highp float; in vec2 vQ; in vec4 vA; out vec4 o;
  void main(){ float g=exp(-dot(vQ,vQ)*3.2)*(1.-smoothstep(.8,1.,length(vQ))); o=vec4(vA.yz*g,0.,0.); }`,La=Ae+`
  in vec3 vR; uniform sampler2D tB,tL,tN; out vec4 o;
  void main(){
    vec3 c=texture(tB,gl_FragCoord.xy/SZ).rgb;
    vec3 rd=vR;
    float tT=-CAM.y/min(rd.y,-1e-4), tBn=(-HGT-CAM.y)/min(rd.y,-1e-4), tFc=(WID+.16-CAM.z)/rd.z;
    vec3 pT=CAM+rd*tT, pB=CAM+rd*tBn; float yF=CAM.y+rd.y*tFc, xF=CAM.x+rd.x*tFc;
    bool face=rd.y<0.&&yF<-.0&&yF>-HGT&&xF<XE;
    if(rd.y<0.){
      vec3 rn=normalize(rd); vec3 rr=vec3(rn.x,-rn.y,rn.z);
      // on the rail top
      float dT=dot(pT-CAM,FW), bwT=abs(46.*(dT-FOC)/dT)*dT*2.*TW/1000.;
      float topM=smoothstep(-bwT-.02,bwT+.02,WID-abs(pT.z))*step(pT.x,XE+.02);
      float fT=1.; vec4 gT=vec4(0.);
      if(topM>.003){
        float dP=length(pT-CEN);
        fT*=mix(1.,SHTOP,puckBlock(pT+vec3(0.,.001,0.),LD,PEN*(.012+.05*dP)+bwT*.75));
        fT*=1.-.64*puckBlock(pT,rr,.05+.06*dP+bwT*.75);
        float gap=max(CEN.y,.0); vec2 dxz=pT.xz-CEN.xz; float near=exp(-gap*.75)*exp(-max(length(dxz)-RAD*.85,0.)*1.7);
        fT*=1.-.5*near;
        float sl=(0.-pT.z)/LD.z; vec3 qs=pT+LD*sl;
        fT*=1.-.3*textureLod(tL,domUv(qs.xy),0.).r*step(0.,sl);
        gT=textureLod(tL,domUv(vec2(pT.x,.3)),0.);
        // the layer lying on the rail: thickest along the middle, rolling slowly, thinning to wisps at the edges
        float roll=textureLod(tN,pT.xz*vec2(.05,.11)+RTIME*vec2(.004,-.011),0.).r*.6+textureLod(tN,pT.xz*vec2(.13,.21)-RTIME*vec2(.007,.004),0.).g*.4;
        gT.r=(1.-exp(-gT.b*2.6))*smoothstep(.12,.75,roll+.16)*(.55+.45*smoothstep(WID,WID*.3,abs(pT.z)));
      }
      // on the rail's near face or the bench
      vec3 P2=face?CAM+rd*tFc:pB; float d2=dot(P2-CAM,FW), bw2=abs(46.*(d2-FOC)/d2)*d2*2.*TW/1000.;
      float dP2=length(P2-CEN);
      float f2=mix(1.,face?.72:SHBENCH,puckBlock(P2+vec3(0.,.001,0.),LD,PEN*(.012+.05*dP2)+bw2*.75));
      vec4 g2=vec4(0.);
      if(face){
        // what lies on the rail spills over its near edge and falls down the face in thinning veils
        vec4 lt=textureLod(tL,domUv(vec2(P2.x,.25)),0.), ls=textureLod(tL,domUv(P2.xy),0.);
        float fall=-P2.y;
        float veil=textureLod(tN,vec2(P2.x*.075+fall*.006,fall*.016+RTIME*.021),0.).r*.65+textureLod(tN,vec2(P2.x*.19,fall*.04+RTIME*.047),0.).b*.35;
        float cur=(1.-exp(-lt.b*2.))*exp(-fall*.5)*smoothstep(.42,.82,veil+.12*exp(-fall*2.));
        g2=vec4(max(cur,(1.-exp(-ls.b*2.))*.22),lt.g*.85,0.,0.); }
      else { f2*=1.-.5*puckBlock(P2,rr,.04+.05*dP2+bw2*.75);
        g2=textureLod(tL,domUv(vec2(P2.x,-HGT+.3)),0.);
        // and pools at its foot, creeping out over the bench and fading at its edge
        float dzb=max(abs(P2.z)-WID-.16,0.);
        float lt=textureLod(tL,domUv(vec2(P2.x,.25)),0.).b;
        float pool=(1.-exp(-g2.b*2.2))*exp(-max(dzb-.4,0.)*.5)+.75*(1.-exp(-lt*2.))*exp(-dzb*.38)*step(P2.x,XE+1.);
        g2.r=min(pool,1.)*smoothstep(.12,.72,textureLod(tN,P2.xz*vec2(.035,.06)+RTIME*vec2(.004,.006),0.).r*.7+textureLod(tN,P2.xz*vec2(.11,.15)-RTIME*vec2(.006,.002),0.).g*.3+.14); g2.g=max(g2.g,.55); }
      c*=mix(f2,fT,topM);
      vec4 g=mix(g2,gT,topM);
      c=mix(c,fogC(g.g,g.r*.62,rd,mix(P2.xy,pT.xy,topM)),g.r*.62);
    }
    // far sheet, behind the puck
    float tf=(ZF-CAM.z)/rd.z; vec3 Q=CAM+rd*tf;
    vec2 uq=domUv(Q.xy)+vec2(.006,.004);
    vec4 lf=texture(tL,uq);
    float va=lf.r*smoothstep(-.1,.25,Q.y)*.55*(1.-.55*smoothstep(.5,2.6,Q.y-CEN.y+HH));
    c=mix(c,fogC(lf.g,va,rd,Q.xy),va);
    o=vec4(c,1.); }`,wa=Ae+`
  in vec3 vR; uniform sampler2D tL,tN; out vec4 o;
  void main(){ vec3 rd=vR; float t=(ZN-CAM.z)/rd.z; vec3 Q=CAM+rd*t; vec2 uv=domUv(Q.xy);
    vec2 wp=texture(tN,Q.xy*vec2(.07,.05)+vec2(.3,RTIME*.018)).rg-.5;
    uv+=wp*vec2(.011,.026);
    vec4 l=texture(tL,uv);
    float low=smoothstep(-.5,.45,Q.y);
    float light=l.g*mix(.3,1.,low);
    float a=l.r*mix(.06,.85,low)*(1.-.6*smoothstep(.3,2.4,Q.y-CEN.y));
    // and the puck's own smoke, in its plane: it clings round the rim and the underside and falls from them
    float tq=(CEN.z-CAM.z)/rd.z; vec3 Qp=CAM+rd*tq; vec2 dq=(Qp.xy-CEN.xy)/vec2(RAD*1.3+.4,RAD*.75+.5);
    vec4 lp=texture(tL,domUv(Qp.xy)+wp*vec2(.006,.012));
    float tm=dot(CEN-CAM,EY)/(abs(dot(rd,EY))<1e-4?1e-4:dot(rd,EY));        // a cheap silhouette: where the ray crosses the puck's mid-plane
    float ins=smoothstep(RAD+.1,RAD-.1,length(CAM+rd*tm-CEN));
    float ap=lp.r*exp(-dot(dq,dq))*smoothstep(CEN.y+HH+.5,CEN.y-HH*.5,Qp.y)*.85*(1.-.85*ins);
    float A=1.-(1.-a)*(1.-ap);
    vec3 c=fogC((light*a+lp.g*ap*(1.-a))/max(A,1e-3),A,rd,Q.xy);
    o=vec4(c*A,A); }`,za=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  layout(std140) uniform UF { vec4 F[23]; };
  out vec3 vR;
  void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
    vec3 o=F[4].xyz-F[0].xyz; float z=dot(o,F[1].xyz); vec2 n=vec2(dot(o,F[2].xyz),dot(o,F[3].xyz))/(z*F[0].w);
    float r=(sqrt(F[4].w*F[4].w+F[5].w*F[5].w)*1.1+.22)/(z*F[0].w);
    vec2 p=n+c*r; gl_Position=vec4(p,0.,1.);
    vR=F[1].xyz+F[2].xyz*p.x*F[0].w+F[3].xyz*p.y*F[0].w; }`,Aa=Ae+`
  in vec3 vR; uniform sampler2D tP,tN; out vec4 o;
  float ggx(float nh,float a){ float a2=a*a, d=nh*nh*(a2-1.)+1.; return a2/(3.1416*d*d); }
  vec3 envP(vec3 d,float rough){
    float w=mix(16.,4.,rough); float g=exp(-(1.-dot(d,POOLD))*w);
    vec3 c=WALLC*(.0016+POOL*g);
    vec3 lx=normalize(cross(LD,vec3(0.,1.,0.))), ly=cross(lx,LD); float dn=max(dot(d,LD),.0001);
    vec2 q=vec2(dot(d,lx),dot(d,ly))/dn; float bl=.06+rough*.9;
    c+=KEYC*smoothstep(.46+bl,.46-bl,abs(q.x))*smoothstep(.34+bl,.34-bl,abs(q.y))*step(0.,dot(d,LD))*GLARE*(.9/(1.+rough*rough*7.));
    c+=FILLC*(.08+.26*smoothstep(-.1,.5,d.z)*smoothstep(-.2,.3,d.y));
    c+=KEYC*FWD*.04*exp((dot(d,LDIR)-1.)*3.);
    { float z=max(-d.z,.05); vec2 s=d.xy/z; float bl2=.03+rough*.55;
      float pu=smoothstep(.13-bl2,.13+bl2,s.y)*smoothstep(2.4+bl2,2.4-bl2,s.y)*smoothstep(-.7-bl2,-.7+bl2,s.x)*smoothstep(1.7+bl2,1.7-bl2,s.x)*step(0.,-d.z);
      float mull=1.-(1.-rough)*.75*smoothstep(.022+bl2*.4,.008,abs(fract(s.x*1.15+.37)-.5))-(1.-rough)*.7*smoothstep(.02+bl2*.4,.006,abs(s.y-.41));
      c+=KEYC*PANEL*pu*mull*(.72+.5*smoothstep(.13,.72,s.y))*exp(-max(s.y-.72,0.)*.7); }
    return c; }
  void main(){
    vec3 rd=vR; vec3 oc=CAM-CEN;
    vec3 ro=vec3(dot(oc,EX),dot(oc,EY),dot(oc,EZ)), dl=vec3(dot(rd,EX),dot(rd,EY),dot(rd,EZ));
    float a=dot(dl.xz,dl.xz), b=dot(ro.xz,dl.xz), cc=dot(ro.xz,ro.xz)-RAD*RAD, ds=b*b-a*cc;
    float dly=abs(dl.y)<1e-4?1e-4:dl.y;
    float t1=(HH-ro.y)/dly, t2=(-HH-ro.y)/dly, tc=min(t1,t2), tfc=max(t1,t2);
    vec2 pc=ro.xz+dl.xz*tc, pf=ro.xz+dl.xz*tfc;
    float rc=length(pc), rf=length(pf);
    float tm=-b/max(a,1e-5);
    vec2 pm=ro.xz+dl.xz*tm; float ym=ro.y+dl.y*tm;
    float fs=(abs(ym)<HH)?RAD-length(pm):-1.;
    float f=max(max(RAD-rc,RAD-rf),fs);
    float ts=(-b-sqrt(max(ds,0.)))/max(a,1e-5);
    float ys=ro.y+dl.y*ts;
    float depth=max(ts,1.);
    float pxw=depth*2.*TW/SZ;
    float coc=abs(ACOC*(depth-FOC)/depth)*(SZ/1000.);
    float edge=pxw*max(.8,coc*.62);
    float cov=smoothstep(-edge,edge,f);
    if(cov<=.002) discard;
    bool cap=rc<RAD;
    if(!cap&&abs(ys)>HH&&rc<RAD+edge*2.) cap=true;
    vec3 pl; vec3 nl; vec2 st; float faceUp=0.;
    if(cap){ pl=vec3(pc.x,ro.y+dl.y*tc,pc.y); float sg=sign(pl.y); nl=vec3(0.,sg,0.); st=pc/(2.2*RAD)+.5; faceUp=sg; }
    else { ys=clamp(ys,-HH,HH); vec2 pp=ro.xz+dl.xz*ts; pl=vec3(pp.x,ys,pp.y); nl=vec3(pp.x/RAD,0.,pp.y/RAD); st=vec2((pp.x+pp.y*1.3)*.27,ys*.3)+.5; }
    float through=0.;
    if(HOLE>0.&&cap&&rc<HOLE){
      float cc2=dot(ro.xz,ro.xz)-HOLE*HOLE, dsi=b*b-a*cc2;
      float ti=(-b+sqrt(max(dsi,0.)))/max(a,1e-5); float yi=ro.y+dl.y*ti;
      if(abs(yi)<HH){ vec2 pp=ro.xz+dl.xz*ti; pl=vec3(pp.x,yi,pp.y); nl=vec3(-pp.x/HOLE,0.,-pp.y/HOLE); st=vec2((pp.x+pp.y)*.27,yi*.3)+.5; cap=false; faceUp=0.; }
      else through=1.;
    }
    float lod=log2(max(coc*.6,1.))+max(log2(pxw*512./(2.2*RAD)),0.);
    vec4 tx=textureLod(tP,st,lod);
    vec2 g=(tx.xy-.5)*2.;
    float rr=length(pl.xz);
    if(cap){ nl=normalize(nl+vec3(g.x,0.,g.y)*.42);
      float chip=texture(tN,pl.xz*.11+.3).b; float e=smoothstep(RAD-.05-.1*chip,RAD-.005,rr); nl=normalize(mix(nl,vec3(pl.x/rr,nl.y*.45,pl.z/rr),e*.8)); }
    else { float lathe=texture(tN,vec2(pl.y*1.4+.13,.3+(pl.x+pl.z)*.002)).b-.5; nl=normalize(nl+vec3(g.x*.75,g.y*.75+lathe*.4,-g.x*.3));
      float e=smoothstep(HH-.11,HH-.005,abs(pl.y)); nl=normalize(nl+vec3(0.,sign(pl.y)*e*1.2,0.)); }
    vec3 n=EX*nl.x+EY*nl.y+EZ*nl.z;
    vec3 Pw=CEN+EX*pl.x+EY*pl.y+EZ*pl.z;
    vec3 v=-normalize(rd);
    // frost: thickest at the rim and under the lip, thinning toward the centre of the face
    float fine=texture(tN,st*3.1+.11).b*.6+texture(tN,st*8.3+.37).b*.4;
    float large=texture(tN,st*.37+.7).g;
    float cover=FROST*1.34*(cap?.1+.9*smoothstep(.72-max(FROST-.6,0.)*2.4,1.,rr/RAD):.22+.78*smoothstep(.2,-1.,pl.y/HH));
    if(cap&&faceUp>0.) cover*=1.-.7*clamp(FILM,0.,1.);
    float fr=smoothstep(.42,.95,cover+(fine-.5)*.55+(large-.5)*.9)*(.72+.28*fine);
    fr=clamp(fr,0.,1.);
    float speck=texture(tN,st*3.7+.31).b;
    float rough=mix(cap?.42+.2*speck+(tx.b-.5)*.9:.6,.82,fr);
    vec3 alb=mix(vec3(.008,.0085,.0095)*(.5+.8*tx.b*2.*smoothstep(.2,.7,speck)),vec3(.47,.5,.55),fr);
    vec3 f0=vec3(mix(cap?.04:.03,.02,fr))*(cap?.35+1.3*tx.b:1.);
    float nv=max(dot(n,v),0.), nl2=max(dot(n,LD),0.);
    // the nitrogen sitting and boiling on the top face: thin, clear, only its surface shows
    vec3 filmC=vec3(0.);
    if(cap&&faceUp>0.&&FILM>0.01){
      vec2 sc=st*2.1;
      float pool=textureLod(tN,sc*.31+.13,0.).g;
      float film=smoothstep(-.1,.5,FILM*1.25-smoothstep(.2,1.,rr/RAD)*.75-.12-(pool-.42)*1.2);
      film*=smoothstep(.15,.45,EY.y);        // it only stays on a roughly level face
      float h0=textureLod(tN,sc*.47+vec2(RTIME*.11,-RTIME*.09),0.).b, h1=textureLod(tN,sc*.61+vec2(-RTIME*.14,RTIME*.12),0.).b;
      float bub=textureLod(tN,sc*.83+vec2(RTIME*.05,RTIME*.3),0.).b;
      float dome=smoothstep(.7,.82,bub);     // vapour domes pushing up through the film
      vec3 nf=normalize(vec3((h0-.5)*.05+(bub-.5)*(.05+.3*dome),1.,(h1-.5)*.05+(textureLod(tN,sc*.83+.5+vec2(RTIME*.05,RTIME*.3),0.).b-.5)*(.05+.3*dome)));
      vec3 nw=EX*nf.x+EY*nf.y+EZ*nf.z;
      vec3 Rf=reflect(-v,nw);
      float Ff=min(.012+.8*pow(1.-max(dot(nw,v),0.),5.),.1);
      filmC=film*(envP(Rf,.04)*Ff*1.05+KEYC*pow(max(dot(nw,normalize(LD+v)),0.),700.)*1.5);
    }
    vec3 h=normalize(LD+v); float nh=max(dot(n,h),0.), vh=max(dot(v,h),0.);
    float aa=max(rough*rough,.012);
    vec3 Fv=f0+(1.-f0)*pow(1.-vh,5.);
    vec3 sp=Fv*ggx(nh,aa)*nl2/(4.*max(vh*vh,.08)*(aa*.5+.5))*(cap?.36:1.);
    vec3 FE=f0+(max(vec3(1.-rough),f0)-f0)*pow(1.-nv,5.);
    vec3 R=reflect(-v,n);
    vec3 col=envP(R,rough)*FE;
    // light up from the plated rail: bright when close and when the rail is lit
    float gap=max(Pw.y,.05);
    float bnc=BOUNCE*max(-n.y*.8+.2,0.)*exp(-gap*.12);
    col+=alb*(KEYC*nl2+FILLC*(.6+.4*n.y)+vec3(bnc))+sp*KEYC;
    col+=f0*bnc*.8*(1.-fr);
    // crystal grains: tiny facets that catch the lamp at their own angle
    vec2 gp=st*16.+.3;
    vec4 nn=texture(tN,gp);
    vec3 gn=normalize(n+vec3(nn.r-.5,nn.g-.5,nn.b-.5)*.9);
    float gk=smoothstep(.988,.9995,nn.a);
    float gl=pow(max(dot(gn,h),0.),60.)*gk*nl2;
    col+=KEYC*gl*(1.4+fr*3.);
    col+=filmC;
    col+=KEYC*RIMK*pow(1.-nv,4.)*smoothstep(-.05,.4,dot(n,LD))*(1.-.5*fr);
    // the fog pressed against the faces softens it a little
    vec3 finalc=tmG(col);
    o=vec4(finalc*cov*(1.-through),cov*(1.-through)); }`,Ra=`#version 300 es
precision highp int;
precision highp sampler2D; precision highp sampler2DArray; precision highp sampler3D;
  layout(std140) uniform UF { vec4 F[23]; };
  layout(location=0) in vec4 a0; layout(location=1) in vec4 a1;
  out vec2 vQ; out vec3 vW; flat out vec4 vK; flat out float vT;
  vec3 pr(vec3 p){ vec3 o=p-F[0].xyz; float z=dot(o,F[1].xyz); return vec3(vec2(dot(o,F[2].xyz),dot(o,F[3].xyz))/(z*F[0].w),z); }
  void main(){ vec2 c=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;
    float px=F[2].w*.5;
    vec3 A=pr(a0.xyz); vW=a0.xyz;
    float ra=a0.w/(A.z*F[0].w)*px;
    vec3 B=pr(a1.w<0.?a0.xyz+a1.xyz*.01:a1.xyz);
    vec2 d=(B.xy-A.xy)*px; float L=length(d);
    vec2 dir=L>1e-3?d/L:vec2(0.,1.), nrm=vec2(-dir.y,dir.x);
    vec2 P;
    if(a1.w<0.){ float v=-a1.w-2.;
      float hl=ra+min(L*.4,ra*2.);
      P=A.xy*px+dir*c.y*hl+nrm*c.x*ra; vQ=vec2(c.x,c.y); vK=vec4(ra,hl,fract(v),floor(v)/500.); vT=2.; }
    else { float r=max(ra,1.)*1.8; P=A.xy*px+c*r; vQ=c*r; vK=vec4(ra,0.,0.,0.); vT=1.; }
    gl_Position=vec4(P/px,0.,1.); }`,Ma=Ae+`
  in vec2 vQ; in vec3 vW; flat in vec4 vK; flat in float vT; uniform sampler2D tN; out vec4 o;
  void main(){ vec3 rd=vW-CAM; float a; vec3 col;
    if(vT>1.5){
      // the cloud the stream wears: wisps of it, lit like the fog on the rail
      float g=exp(-dot(vQ,vQ)*2.4)*(1.-smoothstep(.8,1.,length(vQ)));
      float n=texture(tN,vQ*vec2(.09,.16)+vK.w*vec2(7.13,3.71)).b;
      a=clamp(vK.z*g*(.4+1.*n),0.,1.);
      col=fogC(.72,a,rd,vW.xy)*.9;
    } else {
      // a bead: a soft glint with no dark rim, fading out under a pixel
      float r=vK.x, d=length(vQ)/max(r,1e-3); a=exp(-d*d*2.2)*.32*min(r*r,1.);
      col=fogC(.95,.2,rd,vW.xy)*.85;
    }
    if(a<.002) discard;
    o=vec4(col*a,a); }`,$t=`vec4 nhH(uvec4 u){return vec4(unpackHalf2x16(u.x|(u.y<<16)),unpackHalf2x16(u.z|(u.w<<16)));}
uvec4 nhE(vec4 v){uint a=packHalf2x16(v.xy),b=packHalf2x16(v.zw);return uvec4(a&65535u,a>>16,b&65535u,b>>16);}
`,nt=(e,a,l,G,te)=>{const B=(N,V,re)=>{if(N.indexOf(V)<0)throw new Error("218 NH "+e+" "+V);return N.split(V).join(re)};let O="uniform highp usampler2D "+G.join(",")+`;
`+$t;for(const N of G){O+=`vec4 nhF${N}(ivec2 p,int l){return nhH(texelFetch(${N},p,l));}
vec4 nhL${N}(vec2 uv){ivec2 s=textureSize(${N},0),m=s-1;vec2 p=uv*vec2(s)-.5,f=fract(p);ivec2 i=ivec2(floor(p));return mix(mix(nhF${N}(clamp(i,ivec2(0),m),0),nhF${N}(clamp(i+ivec2(1,0),ivec2(0),m),0),f.x),mix(nhF${N}(clamp(i+ivec2(0,1),ivec2(0),m),0),nhF${N}(clamp(i+ivec2(1),ivec2(0),m),0),f.x),f.y);}
`;for(const[V,re]of[["texture(","nhL"],["textureLod(","nhLL"],["texelFetch(","nhF"]])a.indexOf(V+N+",")>=0&&(a=B(a,V+N+",",re+N+"("));a.indexOf("nhLL"+N+"(")>=0&&(O+=`vec4 nhLL${N}(vec2 uv,float l){return nhL${N}(uv);}
`)}return a=B(a,l[0],l[1]+`
`+O),te&&(a=B(B(a,"out vec4 o;","out uvec4 nhO; vec4 o;"),"void main(){",`void main0();
void main(){main0();nhO=nhE(o);}
void main0(){`)),a},Yo=e=>{const a="o=vec4(col,clamp(coc,-30.,44.));";if(e.indexOf(a)<0)throw new Error("218 NHC");return e.split(a).join("o=vec4(max(col,vec3(0.))/(1.+max(col,vec3(0.))),(clamp(coc,-30.,44.)+30.)/74.);")},Na=e=>{const a=(l,G,te)=>{if(l.indexOf(G)<0)throw new Error("218 NHD "+G);return l.split(G).join(te)};return a(a(a(e,"texture(tS,","nhT("),"textureLod(tS,","nhTL("),"uniform sampler2D tS;",`uniform sampler2D tS;
  vec4 nhS(vec4 t){return vec4(t.rgb/max(1.-t.rgb,vec3(.002)),t.a*74.-30.);}
  vec4 nhT(vec2 uv){return nhS(texture(tS,uv));}
  vec4 nhTL(vec2 uv,float l){return nhS(textureLod(tS,uv,l));}
`)},Pa=Ae+`
  uniform highp usampler2D tD; uniform sampler2D tN; uniform vec4 uSp[${2*ct}]; uniform int uNS; out uvec4 nhO;
  ${$t}const vec2 G=vec2(${de}.,${me}.);
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS; vec2 nx=dFdx(w*.31),ny=dFdy(w*.31);
    float d=nhH(texelFetch(tD,ivec2(gl_FragCoord.xy),0)).x;
    for(int i=0;i<uNS;i++){ vec4 a0=uSp[i*2],a1=uSp[i*2+1]; vec2 q=(w-a0.xy)/a0.z; if(max(abs(q.x),abs(q.y))>1.)continue;
      float g=exp(-dot(q,q)*3.2)*(1.-smoothstep(.8,1.,length(q))); float n=textureGrad(tN,w*.31+a1.z,nx,ny).b; d+=a0.w*g*(.25+1.5*n*n); }
    nhO=nhE(vec4(d,0.,0.,0.)); }`,Sa=Ae+`
  uniform highp usampler2D tV; uniform vec4 uSp[${2*ct}]; uniform int uNS; out uvec4 nhO;
  ${$t}const vec2 G=vec2(${ye}.,${be}.);
  void main(){ vec2 uv=gl_FragCoord.xy/G; vec2 w=D0+uv*DS;
    vec4 v=nhH(texelFetch(tV,ivec2(gl_FragCoord.xy),0));
    for(int i=0;i<uNS;i++){ vec4 a0=uSp[i*2],a1=uSp[i*2+1]; vec2 q=(w-a0.xy)/a0.z; if(max(abs(q.x),abs(q.y))>1.)continue;
      float g=exp(-dot(q,q)*3.2)*(1.-smoothstep(.8,1.,length(q))); v.xy+=a1.xy*g; }
    nhO=nhE(v); }`;function Ca(e){const a=e.getExtension("EXT_color_buffer_float"),l=e.getExtension("EXT_color_buffer_half_float");e.getExtension("OES_texture_float_linear");const G={noise:[K,Ea],pucktex:[K,Fa],back:[K,Io],rail:[K,Bo],dof:[K,ko],vel:[K,Ho],div:[K,qo],jac:[K,Go],grad:[K,Ko],dye:[K,Vo],lit:[K,Wo],litfb:[K,Ta],spd:[Xo,ga],spv:[Xo,Da],main:[Oo,La],near:[Oo,wa],puck:[za,Aa],seg:[Ra,Ma]},te=!(a||l);te&&Object.assign(G,{vel:[K,nt("vel",Ho,["uniform sampler2D tV,tD,tN; out vec4 o;","uniform sampler2D tN; out vec4 o;"],["tV","tD"],1)],div:[K,nt("div",qo,["uniform sampler2D tV; out vec4 o;","out vec4 o;"],["tV"],1)],jac:[K,nt("jac",Go,["uniform sampler2D tP,tDv; out vec4 o;","out vec4 o;"],["tP","tDv"],1)],grad:[K,nt("grad",Ko,["uniform sampler2D tP,tV; out vec4 o;","out vec4 o;"],["tP","tV"],1)],dye:[K,nt("dye",Vo,["uniform sampler2D tV,tD; out vec4 o;","out vec4 o;"],["tV","tD"],1)],lit:[K,nt("lit",Wo,["uniform sampler2D tD,tV,tN; out vec4 o;","uniform sampler2D tN; out vec4 o;"],["tD","tV"],0)],gspd:[K,Pa],gspv:[K,Sa],back:[K,Yo(Io)],rail:[K,Yo(Bo)],dof:[K,Na(ko)]});const B={},O=[],N=(w,M)=>{const W=e.createShader(w);return e.shaderSource(W,M),e.compileShader(W),O.push(W),W},V=new Map,re=w=>{const[M,W]=G[w],ce=e.createProgram();V.has(M)||V.set(M,N(e.VERTEX_SHADER,M)),e.attachShader(ce,V.get(M)),e.attachShader(ce,N(e.FRAGMENT_SHADER,W)),e.linkProgram(ce),B[w]=ce},j={seg:1,litfb:1};for(const w in G)w!=="litfb"&&re(w);e.flush();const qe=w=>{if(!e.getProgramParameter(B[w],e.LINK_STATUS)){console.error("218 link",w,e.getProgramInfoLog(B[w]));for(const M of O)e.getShaderParameter(M,e.COMPILE_STATUS)||console.error(e.getShaderInfoLog(M))}},Ee={},he=w=>{qe(w);const M=B[w],W=e.getProgramParameter(M,e.ACTIVE_UNIFORMS),ce={};for(let xe=0;xe<W;xe++){const Ne=e.getActiveUniform(M,xe).name.replace("[0]","");ce[Ne]=e.getUniformLocation(M,Ne)}Ee[w]=ce;const Qe=e.getUniformBlockIndex(M,"UF");Qe!==e.INVALID_INDEX&&Qe!==4294967295&&e.uniformBlockBinding(M,Qe,0),e.useProgram(M);const je={tN:0,tV:1,tD:2,tP:3,tDv:4,tS:1,tB:1,tL:2};for(const xe in ce)xe in je&&e.uniform1i(ce[xe],je[xe]);w==="puck"&&e.uniform1i(ce.tP,1),w==="grad"&&(e.uniform1i(ce.tV,1),e.uniform1i(ce.tP,2))};for(const w in B)j[w]||he(w);const P=(w,M,W,ce,Qe,je,xe)=>{const Ne=e.createTexture();return e.bindTexture(e.TEXTURE_2D,Ne),e.texImage2D(e.TEXTURE_2D,0,W,w,M,0,ce,Qe,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,je),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,je===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,xe),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,xe),Ne},ve=w=>{const M=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,M),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,w,0),M},Re=e.createVertexArray(),E={P:B,L:Ee,tex:P,fb:ve,vao0:Re,bakes:new Map,floatOK:!!(a||l),nh:te,use:w=>(j[w]&&(B[w]||re(w),delete j[w],he(w)),B[w])};if(E.floatOK){const w=P(4,4,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE),M=ve(w);E.floatOK=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;const W=P(4,4,e.R16F,e.RED,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE),ce=ve(W);e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE&&(E.floatOK=!1),e.deleteFramebuffer(M),e.deleteTexture(w),e.deleteFramebuffer(ce),e.deleteTexture(W)}E.floatOK||re("litfb"),E.tN=P(256,256,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT);const C=ve(E.tN);e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(Re),e.viewport(0,0,256,256),e.useProgram(B.noise),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(C),e.bindTexture(e.TEXTURE_2D,E.tN),e.generateMipmap(e.TEXTURE_2D);const $e=e.getExtension("EXT_texture_filter_anisotropic");$e&&e.texParameterf(e.TEXTURE_2D,$e.TEXTURE_MAX_ANISOTROPY_EXT,4),E.ubo=e.createBuffer(),e.bindBuffer(e.UNIFORM_BUFFER,E.ubo),e.bufferData(e.UNIFORM_BUFFER,23*16,e.DYNAMIC_DRAW);const Me=w=>{const M=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,M),e.bufferData(e.ARRAY_BUFFER,w*32,e.DYNAMIC_DRAW);const W=e.createVertexArray();return e.bindVertexArray(W),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null),{b:M,v:W}};return E.iSplat=Me(ct),E.iSeg=Me(_o),E}function _a(e,a,l,G){const te=l.key+"|"+G;if(a.bakes.size>=6){const E=a.bakes.keys().next().value,C=a.bakes.get(E);e.deleteTexture(C.bg),e.deleteTexture(C.pt),a.bakes.delete(E)}const{P:B,L:O,tex:N,fb:V}=a;e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(a.vao0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.tN);const re=N(512,512,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR_MIPMAP_LINEAR,e.REPEAT);{const E=V(re);e.viewport(0,0,512,512),e.useProgram(B.pucktex),e.uniform4f(O.pucktex.P,l.seeded,l.seedA,0,0),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(E),e.bindTexture(e.TEXTURE_2D,re),e.generateMipmap(e.TEXTURE_2D)}const j=G,Ee=a.floatOK?N(j,j,e.RGBA16F,e.RGBA,e.HALF_FLOAT,e.LINEAR,e.CLAMP_TO_EDGE):N(j,j,a.nh?e.SRGB8_ALPHA8:e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),he=V(Ee);e.viewport(0,0,j,j),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.tN),l.fillScene(j),e.useProgram(B.back),e.uniform4fv(O.back.U,l.sceneU),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.useProgram(B.rail),e.uniform4fv(O.rail.U,l.sceneU),e.drawArrays(e.TRIANGLE_STRIP,0,4);const P=N(j,j,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,e.LINEAR,e.CLAMP_TO_EDGE),ve=V(P);e.viewport(0,0,j,j),e.useProgram(B.dof),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Ee),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,a.tN),e.uniform4f(O.dof.D,j,l.expo,0,0),e.uniform4f(O.dof.G,l.grade[0],l.grade[1],l.grade[2],l.vign),e.uniform4f(O.dof.G2,l.lift[0],l.lift[1],l.lift[2],l.sat),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(he),e.deleteFramebuffer(ve),e.deleteTexture(Ee);const Re={bg:P,pt:re};return a.bakes.set(te,Re),Re}No.add({num:218,name:"Floating Puck",fam:"Worlds",recipe:"A black superconductor puck locked in nitrogen fog above a magnet rail, staying at whatever height and tilt it was left, until the cold runs out and it sinks. The puck, the rail and its pose change every mint. Tap to pour nitrogen, drag the puck to move it (grab the rim to tilt it), or flick it to send it gliding along the rail.",interactive:"Tap to pour nitrogen, drag the puck to move or tilt it (grab its rim to tilt), flick it to send it gliding along the rail",music:!0,gl:!0,fps:30,seed:0,make(e){const a=e.gl;let l=Po.get(a);l||(l=Ca(a),Po.set(a,l));let G=-2128623185;for(let o=2;o<e.hash.length;o++)G^=e.hash.charCodeAt(o),G=Math.imul(G,16777619);const te=()=>{G=G+1831565813|0;let o=Math.imul(G^G>>>15,1|G);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},B=o=>{let c=0;for(const s of o)c+=s[1];let r=te()*c;for(const s of o)if(r-=s[1],r<=0)return s[0];return o[0][0]};let O=B([["Seeded Disc",5],["Sintered Pellet",3],["Wide Wafer",2.5],["Holed Ring",.9]]),N=B([["Nickel Blocks",5],["Steel Keepers",3],["Black Epoxy",2],["Gold Plate",.8]]),V=B([["Flush",5],["Gapped",3.5],["Missing Block",1]]),re=B([["Slanted",5],["Nearly Level",3],["Steep",2.5],["On Edge",.8]]),j=B([["Hovering",5],["Close",2.5],["High",2]]),qe=B([["Back Lamp",5],["Tungsten",3],["North Window",2.5],["Hard Flash",1]]),Ee=B([["Black Resin",4.5],["Steel Tray",3],["Slate",2.5],["Foam Box",1]]),he=B([["Steady",5],["Thin",2.5],["Drenched",1]]),P=B([["Three Quarter",5],["Low",2.5],["High",2.5]]),ve=1779085984;for(let o=2;o<e.hash.length;o++)ve^=e.hash.charCodeAt(o),ve=Math.imul(ve,16777619);const Re=()=>{ve=ve+1831565813|0;let o=Math.imul(ve^ve>>>15,1|ve);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};{const o=Re();o<.15?P="Side On":o<.27?P="Close Up":o<.35?P="Wide":o<.5?P="Down the Rail":o<.62&&(P="From Above")}e.home&&(O="Seeded Disc",N="Nickel Blocks",V="Flush",re="Slanted",j="Hovering",qe="Back Lamp",Ee="Black Resin",he="Steady",P="Three Quarter"),e.trait("Puck",O),e.trait("Rail",N),e.trait("Seams",V),e.trait("Pinned",re),e.trait("Height",j),e.trait("Light",qe),e.trait("Bench",Ee),e.trait("Fog",he),e.trait("View",P);const E=O==="Sintered Pellet"?1.75:O==="Wide Wafer"?2.75:O==="Holed Ring"?2.5:2.25,C=O==="Sintered Pellet"?.62:O==="Wide Wafer"?.2:.34,$e=O==="Holed Ring"?.85:0,Me=2.9,w=3.4,M=12,W=2.5+te()*.3-.15,ce=V==="Gapped"?.11:.022,Qe=1.1,je=N==="Steel Keepers"?1:N==="Black Epoxy"?2:N==="Gold Plate"?3:0,xe=V==="Missing Block"?5.2+te()*1.2:999;let Ne=re==="Nearly Level"?.05+te()*.05:re==="Steep"?.62+te()*.12:re==="On Edge"?1.34:.3+te()*.08,Nt=re==="On Edge"?.08:.1+te()*.08;e.home&&(Ne=.34,Nt=.14);const Ua=j==="Close"?.55:j==="High"?2.05:1.15,Qt=Math.cos(Ne)*Math.cos(Nt),dt=Ua+C*Qt+E*Math.sqrt(1-Qt*Qt),Ba=e.home?1:-1+te()*3,Fe=Math.round(Ba/W)*W,jt=(P==="Low"?9.5:P==="High"?25:P==="Side On"?11:P==="Close Up"?13:P==="Wide"?21:P==="Down the Rail"?12:P==="From Above"?40:15.5)*Math.PI/180;let mt=(e.home?40:34+te()*12)*Math.PI/180;P==="Side On"&&(mt=(7+Re()*6)*Math.PI/180),P==="Down the Rail"&&(mt=(60+Re()*6)*Math.PI/180),P==="From Above"&&(mt=(22+Re()*10)*Math.PI/180);const Te=P==="High"?28:P==="Down the Rail"?40:26.5,X=P==="Close Up"?.17:P==="Wide"?.4:P==="Down the Rail"?.19:.262,Zt=e.home?.17:-.1+te()*.32,Jt=P==="High"?.14:.2;let A=[Math.sin(mt)*Math.cos(jt),-Math.sin(jt),-Math.cos(mt)*Math.cos(jt)];const Ge=o=>{const c=Math.hypot(o[0],o[1],o[2]);return[o[0]/c,o[1]/c,o[2]/c]},$o=(o,c)=>[o[1]*c[2]-o[2]*c[1],o[2]*c[0]-o[0]*c[2],o[0]*c[1]-o[1]*c[0]],se=(o,c)=>o[0]*c[0]+o[1]*c[1]+o[2]*c[2],Y=Ge($o(A,[0,1,0])),$=$o(Y,A),eo=[Fe,dt,0],to=[Y[0]*Zt*Te*X+$[0]*Jt*Te*X,Y[1]*Zt*Te*X+$[1]*Jt*Te*X,Y[2]*Zt*Te*X+$[2]*Jt*Te*X],L=[eo[0]-A[0]*Te-to[0],eo[1]-A[1]*Te-to[1],eo[2]-A[2]*Te-to[2]];let oo=Fe-1,ao=Fe+1;{const o=c=>{const r=[c-L[0],dt-L[1],-L[2]],s=se(r,A);if(s<1)return!1;const n=se(r,Y)/(s*X),x=E/(s*X);return Math.abs(n)<.3&&Math.abs(n)+x*1.3<.8};for(let c=Fe;c<M-E*1.2&&o(c+.1);c+=.1)ao=Math.max(ao,c);for(let c=Fe;c>-12&&o(c-.1);c-=.1)oo=Math.min(oo,c)}let le,Pe,Se,Ce,it,st,ut,yt,lt=.16,Ze,Je,bt=[1,1,1],Pt=[0,0,0],ro=1,St=1,Qo=1,co=.11,no=.3,io=.42,so=10,lo=0,jo=.12,fo=.15,Zo=0,Jo=0,po=0,Ct=[0,-400,0];const ea=Ge([A[0],0,A[2]]);let Ke=1013818959;for(let o=2;o<e.hash.length;o++)Ke^=e.hash.charCodeAt(o),Ke=Math.imul(Ke,16777619);const _t=()=>{Ke=Ke+1831565813|0;let o=Math.imul(Ke^Ke>>>15,1|Ke);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},ta=e.home?-.62:(_t()<.5?-1:1)*(.45+_t()*.4),vo=e.home?.55:.5+_t()*.4,Ia=e.home||_t()<.7?1:0,ho=Ge([A[0]+ta*X*Y[0]+vo*X*$[0],A[1]+vo*X*$[1],A[2]+ta*X*Y[2]+vo*X*$[2]]),ft=Ge([A[0]+.34*Y[0]+.05,A[1]+.34,A[2]+.34*Y[2]]);qe==="Back Lamp"?(le=Ge([ea[0]+.45*Y[0],.3,ea[2]+.45*Y[2]]),Ct=[Fe+le[0]*40,dt+le[1]*40,le[2]*40],Pe=[2.5,2.6,2.75],Se=[.04,.05,.068],Ce=[.5,.64,.85],it=.02,st=.08,lt=.09,ut=34,yt=1,Ze=[.95,.97,1],Je=[.36,.39,.44],St=1.05,Pt=[0,.02,.05],jo=.55,fo=1.7,Zo=.025,Jo=2.2,po=.4):qe==="Tungsten"?(le=Ge([-.55,.6,-.58]),Pe=[3.2,2.15,1.2],Se=[.045,.058,.09],Ce=[.42,.52,.72],it=.02,st=.25,lt=.06,ut=30,yt=1.2,Ze=[1,.87,.68],Je=[.34,.39,.46],Pt=[0,.02,.05],lo=1,so=10,fo=.3):qe==="North Window"?(le=Ge([-.62,.66,.42]),Pe=[1.5,1.68,1.95],Se=[.12,.14,.17],Ce=[.66,.76,.86],it=.08,st=.4,lt=.24,ut=7,yt=3.2,Ze=[.9,.94,.99],Je=[.56,.61,.67],St=1,co=.2,no=.46,io=.55,po=.35):(le=Ge([-A[0]+.12*Y[0]+$[0]*.22,-A[1]+$[1]*.22,-A[2]+.12*Y[2]+$[2]*.22]),Pe=[3.1,3,2.85],Se=[.03,.03,.032],Ce=[.62,.63,.62],it=.005,st=.25,lt=.03,ut=70,yt=.55,Ze=[.97,.97,.95],Je=[.5,.5,.48],ro=.72,bt=[1,.99,.95],Pt=[.2,.16,.1],Qo=1.7,co=.14,no=.16,io=.22);const oa=new Float32Array(16*4),aa={seedA:e.home?.5:te()*1.5,key:e.hash,seeded:O==="Seeded Disc"||O==="Holed Ring"||O==="Wide Wafer"?1:0,sceneU:oa,expo:St,grade:bt,vign:Qo,lift:Pt,sat:ro,fillScene(o){oa.set([L[0],L[1],L[2],X,A[0],A[1],A[2],Te,Y[0],Y[1],Y[2],o,$[0],$[1],$[2],46,le[0],le[1],le[2],ut,Pe[0],Pe[1],Pe[2],st,Se[0],Se[1],Se[2],it,Ce[0],Ce[1],Ce[2],Ee==="Black Resin"?0:Ee==="Steel Tray"?1:Ee==="Foam Box"?2:3,Me,w,M,W,ce,Qe,je,xe,Fe,Fe+26,-15,3.5,ft[0],ft[1],ft[2],4.6,Fe+10,-24,lt,0,ho[0],ho[1],ho[2],0,Zo,so,lo,po*Ia,Ct[0],Ct[1],Ct[2],Jo])}},ra=()=>l.bakes.get(aa.key+"|"+e.size)||_a(a,l,aa,e.size);ra();const Ut=l.floatOK||l.nh,d={};if(l.nh){const o=()=>l.tex(ye,be,a.RGBA16UI,a.RGBA_INTEGER,a.UNSIGNED_SHORT,a.NEAREST,a.CLAMP_TO_EDGE),c=()=>l.tex(ye,be,a.R16UI,a.RED_INTEGER,a.UNSIGNED_SHORT,a.NEAREST,a.CLAMP_TO_EDGE),r=()=>l.tex(de,me,a.R16UI,a.RED_INTEGER,a.UNSIGNED_SHORT,a.NEAREST,a.CLAMP_TO_EDGE);d.v=[o(),o()],d.p=[c(),c()],d.d=[r(),r()],d.dv=c(),d.fv=d.v.map(l.fb),d.fp=d.p.map(l.fb),d.fd=d.d.map(l.fb),d.fdv=l.fb(d.dv);for(const s of[...d.fv,...d.fp,...d.fd,d.fdv])a.bindFramebuffer(a.FRAMEBUFFER,s),a.clearBufferuiv(a.COLOR,0,new Uint32Array(4))}else if(Ut){const o=()=>l.tex(ye,be,a.RGBA16F,a.RGBA,a.HALF_FLOAT,a.LINEAR,a.CLAMP_TO_EDGE),c=()=>l.tex(ye,be,a.R16F,a.RED,a.HALF_FLOAT,a.NEAREST,a.CLAMP_TO_EDGE),r=()=>l.tex(de,me,a.R16F,a.RED,a.HALF_FLOAT,a.LINEAR,a.CLAMP_TO_EDGE);d.v=[o(),o()],d.p=[c(),c()],d.d=[r(),r()],d.dv=c(),d.fv=d.v.map(l.fb),d.fp=d.p.map(l.fb),d.fd=d.d.map(l.fb),d.fdv=l.fb(d.dv);for(const s of[...d.fv,...d.fp,...d.fd,d.fdv])a.bindFramebuffer(a.FRAMEBUFFER,s),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT)}d.l=l.tex(de,me,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR,a.CLAMP_TO_EDGE),d.fl=l.fb(d.l),a.bindFramebuffer(a.FRAMEBUFFER,null);let fe=0,Et=0,ge=0;const t={x:Fe,y:dt,z:0,vx:0,vy:0,vz:0,p:Ne,q:Nt,wp:0,wq:0,y0:dt+.06,z0:0,p0:Ne,q0:Nt,T:77,N:he==="Drenched"?1.5:.85,frost:.58},Ft=.25*E*E+C*C/3,_e=92.5,ka=he==="Thin"?.55:he==="Drenched"?1.75:1,Oa=o=>{const c=1-o/_e;return c<=0?0:Math.pow(c/(1-77/_e),1.5)},h={on:!1,lx:0,ly:0,lz:0,px:0,py:0,pz:0,tx:0,ty:0,tz:0,moved:0,down:0};let Z=[1,0,0],F=[0,1,0],J=[0,0,1];const ca=()=>{const o=Math.cos(t.p),c=Math.sin(t.p),r=Math.cos(t.q),s=Math.sin(t.q);Z=[o,c,0],F=[-c*r,o*r,s],J=[c*s,-o*s,r]};ca();const na=(o,c)=>{const r=2*o-1,s=1-2*c;return[A[0]+Y[0]*r*X+$[0]*s*X,A[1]+Y[1]*r*X+$[1]*s*X,A[2]+Y[2]*r*X+$[2]*s*X]};let et=0;const ia=o=>Math.floor(o/W);let sa=ia(t.x),pt=0,xo=0;const Za={n:0};function Ha(o){const c=Oa(t.T),r=ze(F[1],-1,1),s=Math.max(t.y-C*Math.abs(r)-E*Math.sqrt(Math.max(1-r*r,0)),0),n=Math.max(t.y-C,0),x=Math.exp(-n/1.45),i=Math.sqrt(c);let f=0,y=-oe,p=0,D=0,b=0;const z=13.5*oe*c*x,H=7600*i*Math.sqrt(x)+.001;let q=t.y0-t.y,k=H*q;k>z?(t.y0=t.y+z/H,k=z):k<-z&&(t.y0=t.y-z/H,k=-z),y+=k-7*i*t.vy;const m=z>1?ze(oe/z,0,1.5):1.5;t.y0-=o*.9*m*m*m,y+=4.2*oe*i*Math.exp(-s/.22);const R=9*oe*c*x,I=6200*i+.001;let _=I*(t.z0-t.z);_>R?(t.z0=t.z+R/I,_=R):_<-R&&(t.z0=t.z-R/I,_=-R),p+=_-6*i*t.vz-60*c*t.z,Math.abs(t.z)>1.9&&(p+=-6e3*(t.z-Math.sign(t.z)*1.9)-40*t.vz);const U=8.5*oe*c*x,ee=7e3*Ft*i*Math.sqrt(x)+.001;let pe=ee*(t.p0-t.p);pe>U?(t.p0=t.p+U/ee,pe=U):pe<-U&&(t.p0=t.p-U/ee,pe=-U);let Be=ee*(t.q0-t.q);Be>U?(t.q0=t.q+U/ee,Be=U):Be<-U&&(t.q0=t.q-U/ee,Be=-U),D+=pe-6*i*Ft*t.wp,b+=Be-6*i*Ft*t.wq;const vt=2.4*oe*i*x;D-=vt*Math.sin(t.p)*.5,b-=vt*Math.sin(t.q)*.5;const He=U>1?ze(oe*.5/U,0,1.2):1.2,Lo=o*.28*He*He*He;t.p0-=t.p0*Lo,t.q0-=t.q0*Lo,f-=(V==="Gapped"?.075:V==="Missing Block"?.03:.012)*oe*c*x*Math.sin(2*Math.PI*t.x/W),f-=.32*t.vx+(.05+.22*(1-i))*Math.sign(t.vx)*Math.min(Math.abs(t.vx)*8,1)*1.2*(c>0?1:0);const ot=Math.min(M-E*1.2,ao),at=Math.max(-12,oo);if(t.x>ot&&c>0&&(f-=Math.min(260*(t.x-ot),700)*i+9*t.vx*i),t.x<at&&c>0&&(f-=Math.max(260*(t.x-at),-700)*i+9*t.vx*i),xe<900&&c>0){const ie=t.x-xe,ae=W*.9+E*.5;f+=2.2*oe*i*(ie/ae)*Math.exp(-ie*ie/(ae*ae)),y-=.25*oe*i*Math.exp(-ie*ie/(ae*ae))}if(h.on&&h.live){const ie=Z[0]*h.lx+F[0]*h.ly+J[0]*h.lz,ae=Z[1]*h.lx+F[1]*h.ly+J[1]*h.lz,ht=Z[2]*h.lx+F[2]*h.ly+J[2]*h.lz,wo=t.x+ie,zo=t.y+ae,Ye=t.z+ht,qt=t.wq,xt=t.wp,Gt=t.vx-xt*ae,Qa=t.vy+xt*ie-qt*ht,ja=t.vz+qt*ae,Ao=14e3,Ro=190;let Kt=Ao*(h.tx-wo)-Ro*Gt,Rt=Ao*(h.ty-zo)-Ro*Qa,Vt=Ao*(h.tz-Ye)-Ro*ja;const ua=Math.hypot(Kt,Rt,Vt),ya=42*oe;if(ua>ya){const Mo=ya/ua;Kt*=Mo,Rt*=Mo,Vt*=Mo}f+=Kt,y+=Rt,p+=Vt,D+=ie*Rt-ae*Kt,b+=ae*Vt-ht*Rt}const we=Math.sqrt(Math.max(1-r*r,0)),zt=t.y-C*Math.abs(r)-E*we;if(zt<0){const ie=we>.01?F[0]*r/we:0,ae=we>.01?F[2]*r/we:0,ht=E*we/(we+.02),wo=ie*ht-F[0]*C,zo=ae*ht-F[2]*C,Ye=Math.max(-zt*15e3-70*Math.min(t.vy,0)-20*Math.max(t.vy,0),0);y+=Ye,D+=wo*Ye,b+=-zo*Ye;const qt=.34*Ye,xt=Math.hypot(t.vx,t.vz);if(xt>.001){const Gt=Math.min(qt,xt*2/o*.5)/xt;f-=t.vx*Gt,p-=t.vz*Gt}D-=26*t.wp*Math.min(Ye/oe,2),b-=26*t.wq*Math.min(Ye/oe,2),t.vy<-3&&xo<=0&&(et=Math.max(et,-t.vy),xo=.06)}xo-=o,t.vx+=f*o,t.vy+=y*o,t.vz+=p*o,t.wp+=D/Ft*o,t.wq+=b/Ft*o,t.wp*=1-.4*o,t.wq*=1-.4*o,t.x+=t.vx*o,t.y+=t.vy*o,t.z+=t.vz*o,t.p+=t.wp*o,t.q+=t.wq*o,Math.abs(t.p)>1.42&&(t.p=Math.sign(t.p)*1.42,t.wp*=-.3),Math.abs(t.q)>1.3&&(t.q=Math.sign(t.q)*1.3,t.wq*=-.3),t.x>M-E&&(t.x=M-E,t.vx=-Math.abs(t.vx)*.35,et=Math.max(et,8)),t.x<-13&&(t.x=-13,t.vx=Math.abs(t.vx)*.35),ca();const At=ia(t.x);if(At!==sa){sa=At;const ie=Math.abs(t.vx);if(ie>.4){const ae=Math.min(ie,30)*c;t.wp+=ae*.025*(V==="Gapped"?2.6:1),t.vy+=ae*.05*(V==="Gapped"?2.2:1),pt=Math.max(pt,Math.min(ie/30,1))}}}const T=new Float32Array(Wt*8);let ke=0;const v={on:0,x:0,z:0,onPuck:!1,t:0,y1:0,nextG:0,land:0,burst:0,flow:0,hit:!1,ix:0,iy:0,iz:0,ox:0,oz:0};let Ve=1359808460;for(let o=2;o<e.hash.length;o++)Ve^=e.hash.charCodeAt(o),Ve=Math.imul(Ve,16777619);const mo=()=>{Ve=Ve+1831565813|0;let o=Math.imul(Ve^Ve>>>15,1|Ve);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296};v.ox=(e.home||mo()<.5?-1:1)*(1+mo()),v.oz=(mo()-.5)*1.2;const qa=(o,c)=>{const r=o-L[0],s=c-L[2],n=1.15,x=r*$[0]-L[1]*$[1]+s*$[2],i=r*A[0]-L[1]*A[1]+s*A[2],f=$[1]-n*X*A[1];let y=f>.001?(n*X*i-x)/f:40;return A[1]<-.05&&(y=Math.min(y,(i-5)/-A[1])),Math.min(Math.max(y+1.5,v.y1+4),40)},S=new Float32Array(Xt*7);let tt=0;const u=new Float32Array(Yt*11);let Oe=0;const uo=(o,c,r,s,n,x,i,f,y)=>{let p;if(Oe<Yt)p=Oe++*11;else{let D=0,b=-1;for(let z=0;z<Oe;z++){const H=u[z*11+7]/u[z*11+8];H>b&&(b=H,D=z)}p=D*11}u[p]=o,u[p+1]=c,u[p+2]=r,u[p+3]=s,u[p+4]=n,u[p+5]=x,u[p+6]=i,u[p+7]=0,u[p+8]=f,u[p+9]=g(),u[p+10]=y},Ga=(o,c,r,s,n,x,i,f)=>{if(ke>=Wt){let p=0,D=1e9;for(let z=0;z<ke;z++)T[z*8+6]<D&&(D=T[z*8+6],p=z);const b=p*8;T[b]=o,T[b+1]=c,T[b+2]=r,T[b+3]=s,T[b+4]=n,T[b+5]=x,T[b+6]=i,T[b+7]=f;return}const y=ke++*8;T[y]=o,T[y+1]=c,T[y+2]=r,T[y+3]=s,T[y+4]=n,T[y+5]=x,T[y+6]=i,T[y+7]=f};let Tt=12345^G>>>3;const g=()=>{Tt=Tt+1831565813|0;let o=Math.imul(Tt^Tt>>>15,1|Tt);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},We=o=>{const c=Math.floor(o),r=o-c,s=r*r*(3-2*r),n=x=>{const i=Math.sin(x*127.1+3.3)*43758.5453;return i-Math.floor(i)};return n(c)*(1-s)+n(c+1)*s},gt=(o,c,r,s)=>{v.on<=0&&(v.nextG=0,v.hit=!1),v.on=Math.max(v.on,s),v.x=o,v.z=c,v.onPuck=r,v.t=0},Bt=(o,c,r)=>{const s=o-t.x,n=c-t.y,x=r-t.z,i=s*Z[0]+n*Z[1]+x*Z[2],f=s*J[0]+n*J[1]+x*J[2];return i*i+f*f<E*E&&($e<=0||i*i+f*f>$e*$e)?s*F[0]+n*F[1]+x*F[2]:1e9},Ka=(o,c,r,s,n)=>{v.hit||(v.hit=!0,v.burst=.3),v.land=Math.min(v.land+s*6,3),v.ix=o,v.iy=c,v.iz=r,n&&(v.flow=.14);for(let y=0,p=s*42+g()-.5;y<p;y++){const D=g()*6.283,b=7+40*g()*g();Ga(o+Math.cos(D)*.08,c+.1,r+Math.sin(D)*.08,Math.cos(D)*b,8+24*g(),Math.sin(D)*b,.022+.055*g()*g(),.5+2.4*g())}const x=n?Z:[1,0,0],i=n?J:[0,0,1],f=v.burst>0?9:3;for(let y=0;y<f;y++){const p=g()*6.283,D=14+16*g(),b=Math.cos(p)*D,z=Math.sin(p)*D;uo(o+Math.cos(p)*.3,c+.2,r+Math.sin(p)*.3,x[0]*b+i[0]*z,x[1]*b+i[1]*z,x[2]*b+i[2]*z,.4+.2*g(),.6+.5*g(),.12+.05*g())}},la=o=>{if(v.on>0){for(v.on-=o,v.t+=o,v.onPuck?(v.x+=(t.x+(We(v.t*2.1+5)-.5)*E*.5-v.x)*(1-Math.exp(-o*8)),v.z+=(t.z-v.z)*(1-Math.exp(-o*8)),v.y1=t.y+(v.x-t.x)*(F[1]>.2?-F[0]/F[1]:0)+(v.z-t.z)*(F[1]>.2?-F[2]/F[1]:0)+C*(F[1]>.2?1/F[1]:1)):v.y1=It(v.x,v.z)+.02,v.nextG-=o;v.nextG<=0&&v.on>0;){const s=.03+.05*g();if(tt<Xt){const n=v.x+v.ox,x=v.z+v.oz,i=qa(n,x),f=15+15*g(),y=(-f+Math.sqrt(f*f+2*oe*Math.max(i-v.y1,.5)))/oe,p=tt++*7;S[p]=n,S[p+1]=i,S[p+2]=x,S[p+3]=(v.x-n)/y+(g()-.5)*5,S[p+4]=-f,S[p+5]=(v.z-x)/y+(g()-.5)*5,S[p+6]=s}v.nextG+=s}v.on<=0&&(v.on=0)}for(let s=0;s<tt;){const n=s*7,x=Bt(S[n],S[n+1],S[n+2]),i=S[n],f=S[n+1],y=S[n+2];S[n+4]-=oe*o,S[n]+=S[n+3]*o,S[n+1]+=S[n+4]*o,S[n+2]+=S[n+5]*o;const p=S[n],D=S[n+1],b=S[n+2],z=Bt(p,D,b),H=z<C+.02&&x>=C+.02,q=It(p,b);if(H||D<q){Ka(p,H?D+(C-z)/Math.max(F[1],.3):q,b,S[n+6],H),tt--,s!==tt&&S.copyWithin(n,tt*7,tt*7+7);continue}for(let k=0,m=Math.hypot(p-i,D-f,b-y)/.3+g()-.5;k<m;k++){const R=.3+.3*g(),I=g();uo(i+(p-i)*I+(g()-.5)*.3,f+(D-f)*I,y+(b-y)*I+(g()-.5)*.3,S[n+3]*R+(g()-.5)*5,S[n+4]*R,S[n+5]*R+(g()-.5)*5,.36+.2*g(),.45+.3*g(),.055+.03*g())}for(let k=0;k<2;k++){const m=g();uo(i+(p-i)*m,f+(D-f)*m,y+(b-y)*m,S[n+3]*.85,S[n+4]*.85,S[n+5]*.85,.18+.06*g(),.14+.08*g(),.12)}s++}const c=Math.exp(-o*4.5),r=Math.max(t.y+E+C+.3,.3);for(let s=0;s<Oe;){const n=s*11;if(u[n+7]+=o,u[n+7]>=u[n+8]){Oe--,s!==Oe&&u.copyWithin(n,Oe*11,Oe*11+11);continue}const x=u[n],i=u[n+1],f=u[n+2];u[n+4]-=35*o,u[n+3]*=c,u[n+4]*=c,u[n+5]*=c,u[n]+=u[n+3]*o,u[n+1]+=u[n+4]*o,u[n+2]+=u[n+5]*o,u[n+6]+=o*.6;const y=u[n],p=u[n+1],D=u[n+2];if(p>r&&i>r){s++;continue}const b=Bt(x,i,f),z=Bt(y,p,D);let H=0,q=0,k=!1;if(z<C+.12&&(b>=C+.12||z>-C-.5))k=!0,H=C+.12-z,q=u[n+3]*F[0]+u[n+4]*F[1]+u[n+5]*F[2];else{const m=It(y,D)+.12;p<m&&(H=m-p,q=u[n+4])}if(H>0){const m=k?F:[0,1,0];if(u[n]+=m[0]*H,u[n+1]+=m[1]*H,u[n+2]+=m[2]*H,q<0){u[n+3]-=m[0]*q,u[n+4]-=m[1]*q,u[n+5]-=m[2]*q;let R=y-v.ix,I=D-v.iz;const _=Math.hypot(R,I)||1;R/=_,I/=_,u[n+3]+=R*-q*.5,u[n+5]+=I*-q*.5}}s++}v.land*=Math.exp(-o/.15),v.burst-=o,v.flow-=o};function It(o,c){return Math.abs(c)<Me&&o<M?0:-w}function fa(o){for(let c=0;c<ke;){const r=c*8;let s=T[r],n=T[r+1],x=T[r+2],i=T[r+3],f=T[r+4],y=T[r+5],p=T[r+6],D=T[r+7];f-=oe*o*.95,s+=i*o,n+=f*o,x+=y*o;const b=s-t.x,z=n-t.y,H=x-t.z,q=b*Z[0]+z*Z[1]+H*Z[2],k=b*F[0]+z*F[1]+H*F[2],m=b*J[0]+z*J[1]+H*J[2];if(q*q+m*m<E*E&&k<C+p&&k>C-.5){const I=i*F[0]+f*F[1]+y*F[2];if(I<0){const U=-1.28*I;i+=U*F[0],f+=U*F[1],y+=U*F[2]}const _=C+p-k;s+=F[0]*_,n+=F[1]*_,x+=F[2]*_,D-=o*1.4,t.N=Math.min(t.N+o*.05*p,1.6)}const R=It(s,x);if(n<R+p&&(n=R+p,f<0&&(f=-f*(Math.abs(f)>25?.3:0)),i*=1-o*.45,y*=1-o*.45,D-=o*.4),D-=o,p-=o*.012,D<=0||p<.012||n<-w-1||s<rt||s>rt+Mt){ke--;const I=ke*8;if(c!==ke)for(let _=0;_<8;_++)T[r+_]=T[I+_];continue}T[r]=s,T[r+1]=n,T[r+2]=x,T[r+3]=i,T[r+4]=f,T[r+5]=y,T[r+6]=p,T[r+7]=D,c++}}const Va=new Float32Array(92),kt=(o,c)=>{const r=Va,s=ze(t.N,0,1.2),n=Me+.55,x=-Me*.75;r[0]=L[0],r[1]=L[1],r[2]=L[2],r[3]=X,r[4]=A[0],r[5]=A[1],r[6]=A[2],r[7]=Te,r[8]=Y[0],r[9]=Y[1],r[10]=Y[2],r[11]=e.size,r[12]=$[0],r[13]=$[1],r[14]=$[2],r[15]=46,r[16]=t.x,r[17]=t.y,r[18]=t.z,r[19]=E,r[20]=Z[0],r[21]=Z[1],r[22]=Z[2],r[23]=C,r[24]=F[0],r[25]=F[1],r[26]=F[2],r[27]=$e,r[28]=J[0],r[29]=J[1],r[30]=J[2],r[31]=s,r[32]=le[0],r[33]=le[1],r[34]=le[2],r[35]=yt,r[36]=t.vx,r[37]=t.vy,r[38]=t.wp,r[39]=c,r[40]=o,r[41]=t.frost,r[42]=St,r[43]=ze((_e-t.T)/15,0,1),r[44]=Me,r[45]=w,r[46]=M,r[47]=n,r[48]=Pe[0],r[49]=Pe[1],r[50]=Pe[2],r[51]=2.9*(he==="Thin"?.8:1),r[52]=Se[0],r[53]=Se[1],r[54]=Se[2],r[55]=no,r[56]=Ce[0],r[57]=Ce[1],r[58]=Ce[2],r[59]=it,r[60]=ft[0],r[61]=ft[1],r[62]=ft[2],r[63]=st,r[64]=Ze[0],r[65]=Ze[1],r[66]=Ze[2],r[67]=co,r[68]=Je[0],r[69]=Je[1],r[70]=Je[2],r[71]=io,r[72]=bt[0],r[73]=bt[1],r[74]=bt[2],r[75]=ro,r[76]=o,r[77]=16,r[78]=18,r[79]=x,r[80]=lt,r[81]=so,r[82]=lo,r[83]=jo,r[84]=le[0],r[85]=le[1],r[86]=le[2],r[87]=fo,r[88]=Fe,a.bindBuffer(a.UNIFORM_BUFFER,l.ubo),a.bufferSubData(a.UNIFORM_BUFFER,0,r),a.bindBufferBase(a.UNIFORM_BUFFER,0,l.ubo)},De=new Float32Array(ct*8);let ue=0;const yo=(o,c,r,s,n,x)=>{if(ue>=ct)return;const i=ue++*8;De[i]=o,De[i+1]=c,De[i+2]=r,De[i+3]=s,De[i+4]=n,De[i+5]=x,De[i+6]=g(),De[i+7]=0};let pa=.5;const va=(o,c)=>{ue=0;const r=ze((_e+1-t.T)/16,0,1),s=(t.N>0?.55+.6*Math.min(t.N,1.1):.55*r*r)*ka*(t.T>_e+.5?0:1),n=c/(1/30);if(s>.01){const x=Z[0],i=Z[1],f=F[0],y=F[1],p=J[0],D=J[1];for(let b=0;b<11;b++){const z=b*1.618,H=We(o*(.9+.23*b)+z*7),q=H*H*1.8,k=b<4?(b&1?1:-1)*(1.03+.1*g()):(g()*2-1)*.92,m=b<4?(g()*2-1)*.6-.4:b<7?1.4:-1.9,R=(g()*2-1)*.7,I=t.x+x*E*k+p*E*R*.4+f*C*m,_=t.y+i*E*k+D*E*R*.4+y*C*m,U=b<4?Math.sign(k):0;yo(I,_-.1,.5+.75*g(),s*q*(b>=4&&b<7?.35:3.4)*pa*n,(U*.9+(g()-.5)*.8)*n,-1.3*n)}}if(v.land>.02){const x=v.ix,i=v.iy,f=v.burst>0,y=Math.min(v.land,1);for(let p=0,D=f?12:6;p<D;p++){const b=g()*6.283,z=Math.cos(b);yo(x+z*.6*g(),i+.1+g()*.2,.3+.5*g(),(f?1.6:.95)*y*n,z*(f?30+30*g():30)*n,(g()*7-3)*n)}}for(let x=0;x<ke&&ue<ct;x+=2){const i=x*8;T[i+1]<8&&yo(T[i],T[i+1]+.03,.14+T[i+6]*1.4,.13*n,T[i+3]*.1*n,-2*n)}},Le=()=>a.drawArrays(a.TRIANGLE_STRIP,0,4),Q=(o,c)=>{a.activeTexture(a.TEXTURE0+o),a.bindTexture(a.TEXTURE_2D,c)},ha=()=>{const{P:o}=l;a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),Q(0,l.tN),ue&&l.nh?(a.bindVertexArray(l.vao0),a.viewport(0,0,de,me),a.useProgram(o.gspd),a.uniform4fv(l.L.gspd.uSp,De,0,ue*8),a.uniform1i(l.L.gspd.uNS,ue),Q(2,d.d[ge]),a.bindFramebuffer(a.FRAMEBUFFER,d.fd[1-ge]),Le(),ge=1-ge,a.viewport(0,0,ye,be),a.useProgram(o.gspv),a.uniform4fv(l.L.gspv.uSp,De,0,ue*8),a.uniform1i(l.L.gspv.uNS,ue),Q(1,d.v[fe]),a.bindFramebuffer(a.FRAMEBUFFER,d.fv[1-fe]),Le(),fe=1-fe):ue&&(a.bindBuffer(a.ARRAY_BUFFER,l.iSplat.b),a.bufferSubData(a.ARRAY_BUFFER,0,De.subarray(0,ue*8)),a.bindVertexArray(l.iSplat.v),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE),a.bindFramebuffer(a.FRAMEBUFFER,d.fd[ge]),a.viewport(0,0,de,me),a.useProgram(o.spd),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,ue),a.bindFramebuffer(a.FRAMEBUFFER,d.fv[fe]),a.viewport(0,0,ye,be),a.useProgram(o.spv),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,ue),a.disable(a.BLEND)),a.bindVertexArray(l.vao0),a.viewport(0,0,ye,be),a.useProgram(o.vel),Q(1,d.v[fe]),Q(2,d.d[ge]),a.bindFramebuffer(a.FRAMEBUFFER,d.fv[1-fe]),Le(),fe=1-fe,a.useProgram(o.div),Q(1,d.v[fe]),a.bindFramebuffer(a.FRAMEBUFFER,d.fdv),Le(),a.useProgram(o.jac),Q(4,d.dv);for(let c=0;c<ba;c++)Q(3,d.p[Et]),a.bindFramebuffer(a.FRAMEBUFFER,d.fp[1-Et]),Le(),Et=1-Et;a.useProgram(o.grad),Q(1,d.v[fe]),Q(2,d.p[Et]),a.bindFramebuffer(a.FRAMEBUFFER,d.fv[1-fe]),Le(),fe=1-fe,a.viewport(0,0,de,me),a.useProgram(o.dye),Q(1,d.v[fe]),Q(2,d.d[ge]),a.bindFramebuffer(a.FRAMEBUFFER,d.fd[1-ge]),Le(),ge=1-ge},xa=()=>{const{P:o}=l;a.disable(a.BLEND),a.bindVertexArray(l.vao0),a.viewport(0,0,de,me),a.bindFramebuffer(a.FRAMEBUFFER,d.fl),Ut?(a.useProgram(o.lit),Q(0,l.tN),Q(1,d.v[fe]),Q(2,d.d[ge])):(a.useProgram(l.use("litfb")),Q(0,l.tN)),Le()},ne=new Float32Array(_o*8),da=(o,c)=>{const{P:r}=l,s=ra();a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,e.size,e.size),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0),a.disable(a.BLEND),a.bindVertexArray(l.vao0),Q(0,l.tN),Q(1,s.bg),Q(2,d.l),a.useProgram(r.main),Le(),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),Q(1,s.pt),a.useProgram(r.puck),Le();let n=0;for(let x=0;x<Oe;x++){const i=x*11,f=n++*8,y=u[i+7]/u[i+8],p=u[i+10]*Math.min(u[i+7]/.06,1)*Math.pow(1-y,1.5);ne[f]=u[i],ne[f+1]=u[i+1],ne[f+2]=u[i+2],ne[f+3]=u[i+6],ne[f+4]=u[i+3],ne[f+5]=u[i+4],ne[f+6]=u[i+5],ne[f+7]=-(2+Math.floor(u[i+9]*500)+Math.min(p,.999))}for(let x=0;x<ke;x++){const i=x*8,f=n++*8,y=T[i+6]*Math.min(T[i+7]*3,1);ne[f]=T[i],ne[f+1]=T[i+1],ne[f+2]=T[i+2],ne[f+3]=y,ne[f+4]=T[i],ne[f+5]=T[i+1],ne[f+6]=T[i+2],ne[f+7]=y}n&&!c&&(a.bindBuffer(a.ARRAY_BUFFER,l.iSeg.b),a.bufferSubData(a.ARRAY_BUFFER,0,ne.subarray(0,n*8)),a.bindVertexArray(l.iSeg.v),Q(1,s.bg),a.useProgram(l.use("seg")),a.drawArraysInstanced(a.TRIANGLE_STRIP,0,4,n),a.bindVertexArray(l.vao0)),a.useProgram(r.near),Q(2,d.l),Le(),a.disable(a.BLEND),a.bindVertexArray(null)};let Dt=(G^1540483477)>>>0;const Ue=()=>{Dt=Dt+1831565813|0;let o=Math.imul(Dt^Dt>>>15,1|Dt);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},Xe={rest:3.2,len:1.7,early:!1,warm:.3+Ue()*.3},Wa=()=>{Xe.rest=1.2+Ue()*Ue()*14,Xe.len=.45+Ue()*2.3,Xe.early=Ue()<.35,Xe.warm=.22+Ue()*.48};let bo=0;Ue();const Xa=(Ue()-.5)*E*.5,Ya=.6+Ue()*.6;a.disable(a.BLEND);const $a=[t.vx,t.vy,t.vz,t.wp,t.wq];t.N=Math.min(t.N+1.05,1.7);for(let c=0;c<26;c++){const r=c*.08;if(c===14&&gt(t.x+Xa,t.z,!0,Ya+12*.08),c>=14)for(let s=0;s<4;s++)la(.08/4),fa(.08/4);Ut&&(va(r,.08),kt(r,.08),ha())}[t.vx,t.vy,t.vz,t.wp,t.wq]=$a,v.flow=0,pa=1,kt(0,1/30),xa(),da(0,!0);let Ot=0,Lt=0,Eo=!1,ma=0,Fo=0,To=0,go=0,Ht=0,Do=0,Ja=-1;return(o,c)=>{c=Math.min(c,.12);const r=e.input,s=!!(r.down&&r.inside),n=r.taps?r.taps():[];if(s){const m=na(r.x,r.y);if(!Eo){const R=[t.x-L[0],t.y-L[1],t.z-L[2]],I=se(R,F)/se(m,F);let _=[L[0]+m[0]*I,L[1]+m[1]*I,L[2]+m[2]*I],U=[_[0]-t.x,_[1]-t.y,_[2]-t.z],ee=se(U,Z),pe=se(U,J),Be=Math.hypot(ee,pe);const vt=se(R,A)/se(m,A),He=[L[0]+m[0]*vt-t.x,L[1]+m[1]*vt-t.y,L[2]+m[2]*vt-t.z];if(Math.hypot(He[0],He[1],He[2])<E*1.45){if(Be>E||!(I>0)){const zt=se(He,Z),At=se(He,J),ie=Math.hypot(zt,At)||1,ae=Math.min(E/ie,1);ee=zt*ae,pe=At*ae}h.on=!0,h.live=!1,h.t0=o,h.lx=ee,h.ly=0,h.lz=pe,h.moved=0;const wt=t.x+Z[0]*ee+J[0]*pe,ot=t.y+Z[1]*ee+J[1]*pe,at=t.z+Z[2]*ee+J[2]*pe;h.px=wt,h.py=ot,h.pz=at,h.tx=wt,h.ty=ot,h.tz=at,h.ox=0,h.oy=0,h.oz=0;const we=se([wt-L[0],ot-L[1],at-L[2]],A)/se(m,A);h.ox=wt-(L[0]+m[0]*we),h.oy=ot-(L[1]+m[1]*we),h.oz=at-(L[2]+m[2]*we)}}if(h.on){const R=se([h.px-L[0],h.py-L[1],h.pz-L[2]],A)/se(m,A),I=Math.hypot(h.lx,h.lz)>E*.55?.5:1,_=h.px+(L[0]+m[0]*R+h.ox-h.px)*I,U=h.py+(L[1]+m[1]*R+h.oy-h.py)*I,ee=h.pz+(L[2]+m[2]*R+h.oz-h.pz)*I;h.moved+=Math.hypot(_-h.tx,U-h.ty,ee-h.tz),h.moved>.22&&(h.live=!0),h.tx=_,h.ty=U,h.tz=ee}}else Eo&&(h.on&&!h.live&&o-h.t0<.45&&(gt(t.x+(g()-.5)*E*.5,t.z,!0,1.25),Ht=0),h.on=!1);Eo=s;for(const m of n){if(h.on&&h.t0===o)continue;const R=na(m.x,m.y),I=[t.x-L[0],t.y-L[1],t.z-L[2]],_=se(I,A)/se(R,A),U=[L[0]+R[0]*_-t.x,L[1]+R[1]*_-t.y,L[2]+R[2]*_-t.z];if(Math.hypot(U[0],U[1],U[2])<E*1.9)gt(t.x+(g()-.5)*E*.5,t.z,!0,1.25);else{const ee=(0-L[1])/R[1];let pe=L[0]+R[0]*ee,Be=L[2]+R[2]*ee;(!(ee>0)||pe>M-.4)&&(pe=M-1),ee>0||(Be=0),gt(ze(pe,rt+1,rt+Mt-1),ze(Be,-Me+.3,Me+2),!1,1)}Ht=0}Ht+=c;const x=t.T>_e&&t.y-C*Math.abs(F[1])-E*Math.sqrt(Math.max(1-F[1]*F[1],0))<.06;Fo=x?Fo+c:0;const i=Xe.early&&t.N<=0&&t.T>_e-1.4&&!x;(Fo>Xe.rest||i)&&v.on<=0&&!h.on&&o-ma>6&&Ht>4&&(ma=o,gt(t.x+(Ue()-.5)*E*.6,t.z,!0,Xe.len),Wa());const f=1/(he==="Drenched"?26:he==="Thin"?11:17);if(t.N>0?(t.N=Math.max(t.N-f*c,0),t.T+=(77-t.T)*(1-Math.exp(-c/.55))):t.T=Math.min(t.T+c*Xe.warm*(he==="Thin"?1.25:1),104),bo=t.N>0||v.on>0?0:bo+c,la(c),v.flow>0){t.N=Math.min(t.N+c*1.05,1.7),t.T+=(77-t.T)*(1-Math.exp(-c/.95)),t.vy-=c*90,t.wp+=c*(v.ix-t.x)*22,t.vx+=(g()-.5)*c*7;const m=t.y-C*Math.abs(F[1])-E*Math.sqrt(Math.max(1-F[1]*F[1],0));if(t.T>84&&m<1.5){const R=(t.T>90?1.45:.9)*oe*(.75+.5*We(o*13));t.vy+=R*c,t.wp+=(We(o*5+3)-.5)*c*22,t.wq+=(We(o*4+8)-.5)*c*18}}const y=t.T<84?.62+.3*Math.min(bo/30,1):t.T<_e?.62-(t.T-84)/8.5*.2:.42-Math.min((t.T-_e)/10,1)*.42;if(t.frost+=(y-t.frost)*(1-Math.exp(-c/(y>t.frost?1.1:6))),t.N>0){const m=Math.min(t.N,1);t.vy+=(We(o*37)-.5)*c*26*m,t.wp+=(We(o*29+4)-.5)*c*7*m,t.wq+=(We(o*31+9)-.5)*c*7*m}Lt+=c;let p=0;const D=1/240,b=t.x,z=t.y,H=t.wp;for(;Lt>=D&&p<32;)Lt-=D,p++,Ha(D);if(Lt>D&&(Lt=0),fa(c),Ot+=c,Ot>=1/31){const m=Math.min(Ot,.1);Ot=0,kt(o,m),Ut&&(va(o,m),ha()),xa()}else kt(o,1/30);da(o);const q=ze(t.x/12,-.7,.7);if(et>0){const m=ze(et/70,.08,1);e.sound.hit("click",.3+m*.5,{pan:q}),e.sound.note(79+7*(1-m),{dur:.12+m*.15,vel:.1+m*.3,wave:"triangle",cutoff:2600,pan:q}),et=0}pt>0&&(e.sound.hit("blip",.08+pt*.3,{freq:620+pt*800,pan:q}),pt=0),Do-=c,v.on>0&&Do<=0&&(Do=.13,e.sound.hit("noise",.3,{cutoff:5200,dur:.22,pan:q})),go-=c,t.N>.02&&go<=0&&(go=.05+g()*.28/(.25+Math.min(t.N,1)),e.sound.hit("hat",.04+.1*Math.min(t.N,1)*g(),{pan:q})),To-=c;const k=Math.hypot(t.vx,t.vy);k>9&&To<=0&&t.T<_e&&(To=.17,e.sound.note(52+Math.min(k,50)*.24,{dur:.22,vel:Math.min(k/90,.2),wave:"sine",pan:q}))}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
