// Night Platform: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/186.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ko){Ko&&function(){"use strict";const yt=`#version 300 es
// s752372192
precision highp float;precision highp int;
const vec3 C=vec3(.42,.30,0.);const vec2 VP=vec2(.22,.12);const float F=6.2,OS=1.09,END=29.,XF=-3.7,XB=3.7,PIT=-.95,XT=-.14,PI=3.14159,MX=-1.65,MW=1.75,MY=1.95,MR=1.1;
float bend(float z){float b=clamp(z-36.,0.,70.);return .0032*b*b+max(z-106.,0.)*.448;}
float sdMouth(vec2 q){vec2 p=vec2(abs(q.x-MX),q.y-MY);if(p.y<0.)return p.x-MW;vec2 r=vec2(MW,MR);float k0=length(p/r),k1=length(p/(r*r));return k0*(k0-1.)/max(k1,1e-4);}
`,Z=`#version 300 es
// s752372192
out vec2 vUv;void main(){vec2 p=vec2(float((gl_VertexID&1)*2),float(gl_VertexID&2));vUv=p;gl_Position=vec4(p*2.-1.,0.,1.);}`,oe=`uniform vec4 uV;
float hitBox(vec3 o,vec3 d,out float id){float t=1e6;id=-1.;
 if(d.x<0.){float s=(XF-o.x)/d.x;if(s<t){t=s;id=3.;}}else if(d.x>0.){float s=(XB-o.x)/d.x;if(s<t){t=s;id=4.;}}
 if(d.z>0.){float s=(END-o.z)/d.z;if(s<t){t=s;id=6.;}}else if(d.z<0.){float s=(-70.-o.z)/d.z;if(s<t){t=s;id=6.;}}
 if(uV.z>.5){float ys=uV.x,a=XB,b=uV.y-uV.x;
  if(o.y+d.y*t>ys){vec2 dd=vec2(d.x/a,d.y/b),oo=vec2(o.x/a,(o.y-ys)/b);float A=dot(dd,dd),B=2.*dot(oo,dd),K=dot(oo,oo)-1.;float h=B*B-4.*A*K;
   float s=(-B+sqrt(max(h,0.)))/(2.*A);if(s<t||(id!=6.&&o.y+d.y*t>ys)){t=s;id=5.;}}
 }else if(d.y>0.){float s=(uV.y-o.y)/d.y;if(s<t){t=s;id=5.;}}
 if(d.y<0.){float s=-o.y/d.y;if(s>.001&&s<t&&o.x+d.x*s>=0.){t=s;id=0.;}else{s=(PIT-o.y)/d.y;if(s<t&&o.x+d.x*s<0.){t=s;id=2.;}}}
 return t;}
`,va=yt+oe+`in vec2 vUv;out vec4 o;uniform int uSteps;
void main(){vec2 n=(vUv*2.-1.)*OS;vec3 d=vec3((n-VP)/F,1.);float id;float t=hitBox(C,d,id);vec3 p=C+d*t;vec2 st=vec2(0.);
 if(id==6.&&sdMouth(p.xy)<0.){float dz=1.5,z0=END,z1=END+float(uSteps)*dz;bool found=false;
  for(int i=1;i<uSteps;i++){float z=END+float(i)*dz;vec3 q=C+d*z;vec2 c=vec2(q.x-bend(z),q.y);if(!found&&(sdMouth(c)>0.||c.y<PIT)){z1=z;z0=z-dz;found=true;}}
  for(int i=0;i<uSteps-40;i++){float z=.5*(z0+z1);vec3 q=C+d*z;vec2 c=vec2(q.x-bend(z),q.y);if(sdMouth(c)>0.||c.y<PIT)z1=z;else z0=z;}
  t=z1;p=C+d*t;id=p.y<=PIT+.02?2.:7.;}
 if(d.y<0.&&id==2.){float zr=(-.78-C.y)/d.y;if(zr<t){float x=C.x+d.x*zr-bend(zr);
  float m=min(abs(x+1.1),abs(x+2.6));if(m<.034){st.x=10.;t=zr;}
  else{float rr=x>-1.85?-1.1:-2.6;float fl=(rr+.036-C.x)/d.x;float yf=C.y+d.y*fl;if(fl>0.&&fl<t&&yf<-.78&&yf>PIT){st.x=30.;t=fl;}}}}
 if(d.y>0.){float s=(2.7-C.y)/d.y;if(s<t){float x=C.x+d.x*s;float a=(s-.7)/3.,k=floor(a),fr=a-k;
  float rows=abs(x-1.35)<abs(x+1.85)?0.:1.;float xr=rows<.5?1.35:-1.85;float cr=abs(x-xr);
  if(k>=0.&&k<10.&&fr<.55){if(cr<.075){t=s;id=8.+rows;st=vec2((x-xr)/.075,k+fr/.55);}else if(cr<.135){t=s;id=5.;st.x=99.;}}
  else if(k>=-1.&&k<10.&&cr<.03){t=s;id=5.;st.x=99.;}}}
 o=vec4(t,id,st);}`,Ge=yt+`in vec2 vUv;out vec4 o;uniform sampler2D N,G;uniform int uN,uOut;uniform vec4 uM,uE,uEc,uW1,uW2;
float LF,FX,FZ;
vec4 nn(vec2 p,float k){vec2 q=p*exp2(k)+uM.w;vec4 a=textureLod(N,q,LF+k);vec4 b=textureLod(N,vec2(q.x*.8+q.y*.6,q.y*.8-q.x*.6)*.73+.37,LF+k-.45);return .5+(a+b-1.)*.78;}
float line(float d,float w,float f){return (1.-smoothstep(w,w+f+.001,d))*min(1.,(2.*w+.001)/(f+.001)+.03);}
float sat(float x){return clamp(x,0.,1.);}
`,Ke=(o,t,M,D,P)=>`
void main(){vec2 n=(vUv*2.-1.)*OS;vec3 d=vec3((n-VP)/F,1.);vec4 g=texelFetch(G,ivec2(gl_FragCoord.xy),0);float id=g.y;
 ${o}
 vec3 a0=vec3(0.);float g0=0.,h0=0.,hx=0.,hz=0.;
 for(int i=0;i<uN;i++){vec2 q=P2;if(i==1)q.x+=E;if(i==2)q.y+=E;vec3 a;float gl;float h=${P}(q,a,gl);if(i==0){a0=a;g0=gl;h0=h;}else if(i==1){hx=h;}else{hz=h;}}
 if(uOut==0){o=vec4(sqrt(max(a0,0.)),g0);}else{vec3 Nn=normalize(${t}-(${M})*(hx-h0)/E-(${D})*(hz-h0)/E);o=vec4(Nn,1./max(g.x,.1));}}`,xa=o=>Ge+`#define S ${o}
float floorMat(vec2 p,out vec3 a,out float gl){
 float lo=nn(p,-2.).r,lo2=nn(p+3.7,-1.).g,mid=nn(p,1.).b,hi=nn(p,3.).a,fine=nn(p+1.3,5.).r;
 float grime=uM.z,wet=uM.y,h=0.;
#if S==0
 float T=.305;vec2 q=p/T;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
 float gx=line(.5*T-abs(f.x)*T,.0045,FX),gz=line(.5*T-abs(f.y)*T,.0045,FZ),gr=max(gx,gz);
 float fleck=smoothstep(.56,.62,fine)*.5+smoothstep(.6,.66,nn(p+.7,6.).g)*.5;vec3 tile=mix(vec3(.062,.058,.054),vec3(.125,.115,.10),r.r);tile*=.72+.56*mid;tile*=1.-.3*smoothstep(.55,.8,r.g);tile=mix(tile,vec3(.27,.255,.22),fleck*.5);
 a=mix(tile,vec3(.018,.015,.012),gr);
 h=-gr*.0028+(r.b-.5)*.0016*f.x*2.+(r.a-.5)*.0016*f.y*2.+(hi-.5)*.00035;
#elif S==1
 float T=2.4;vec2 q=p/T;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
 float gx=line(.5*T-abs(f.x)*T,.007,FX),gz=line(.5*T-abs(f.y)*T,.007,FZ),gr=max(gx,gz);
 float ag=smoothstep(.52,.66,fine);
 vec3 tile=mix(vec3(.08,.08,.078),vec3(.15,.15,.145),.4*r.r+.6*mid);tile=mix(tile,vec3(.3,.29,.27),ag*.5);
 a=mix(tile,vec3(.012),gr);
 h=-gr*.004+(hi-.5)*.0009+ag*.0003;
#else
 float T=.62;vec2 q=p/T;float row=floor(q.y);q.x+=fract(row*.37)*1.3;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
 float gx=line((.5-abs(f.x))*T,.008,FX),gz=line((.5-abs(f.y))*T,.008,FZ),gr=max(gx,gz);
 vec3 tile=mix(vec3(.06,.056,.05),vec3(.15,.135,.115),r.r);tile*=.72+.56*mid;
 a=mix(tile,vec3(.012),gr);
 float hump=(1.-pow(abs(f.x)*2.,4.))*(1.-pow(abs(f.y)*2.,4.));
 h=-gr*.005+hump*.003+(r.b-.5)*.003*f.x+(r.a-.5)*.003*f.y+(hi-.5)*.0011+(mid-.5)*.0025;
#endif
 // walked-on polish and dirt
 float walk=smoothstep(.2,.7,p.x)*(1.-smoothstep(1.4,2.8,p.x));
 float dirt=smoothstep(.34,.72,lo*.6+mid*.4);
 a*=mix(1.,.5,dirt*grime);a*=1.+.25*walk*(1.-grime);
 vec2 sc=p*vec2(1.,.16)+lo2*.12;float scr=smoothstep(.70,.76,nn(sc,4.).r);a*=1.+.14*scr;h-=scr*.00006;float pit=smoothstep(.70,.76,nn(p+4.4,6.).b);a*=1.-.55*pit;h-=pit*.00045;
 // gum: dark flattened spots on a jittered grid
 vec2 gq=p/.46;vec2 gi=floor(gq);vec4 gr2=texelFetch(N,ivec2(mod(gi+17.,256.)),0);
 vec2 gc=(gi+.2+.6*gr2.xy)*.46;float gd=length((p-gc)*vec2(1.,1.));float grr=.011+.021*gr2.z*gr2.z;
 float gum=gr2.w>.42?(1.-smoothstep(grr-.002,grr+FX+.002,gd)):0.;
 a=mix(a,mix(vec3(.022,.021,.024),vec3(.07,.065,.06),hi),gum*(.8+.2*mid));h+=gum*.0009;
 // yellow line: thick old paint, chipped, scuffed where people stand
 float ek=uE.x,x0=mix(.295,.23,ek),x1=mix(.455,.53,ek);float lw=smoothstep(x0,x0+.005+FX,p.x)*(1.-smoothstep(x1,x1+.005+FX,p.x));
 float wear=smoothstep(.3,.62,mid*.55+hi*.3+lo2*.25+.12*walk);wear*=smoothstep(.14,.36,lo+fine*.25);
 float paint=lw*(1.-wear*mix(.92,.3,ek));
 vec3 pc=uEc.rgb*mix(1.,.7,mid);pc*=mix(1.,.55,dirt*grime);
 a=mix(a,pc,paint);h+=paint*.0011;
 vec2 df=fract(vec2(p.x-x0,p.y)/.052)-.5;float nr=1.-smoothstep(.012,.04,FZ),d1=1.-smoothstep(.16,.38,length(df)),dome=d1*nr*lw*ek;a*=mix(1.,mix(.74,.55+.75*d1,nr),lw*ek);
 float tj=(1.-smoothstep(.003,.006+FZ,abs(fract(p.y/.4)-.5)*.4))*lw*ek;a=mix(a,vec3(.02),tj);h-=tj*.002;
 // the coping: pale cast edge, chips, a rusty lip
 float cp=1.-smoothstep(.135,.14+FX,p.x);
 vec3 cc=mix(vec3(.13,.125,.11),vec3(.24,.23,.2),mid);cc*=.7+.5*fine;
 float chip=smoothstep(.56,.68,hi*.6+lo2*.4)*(1.-smoothstep(.0,.05,p.x)*.6);
 cc=mix(cc,vec3(.06,.05,.045),chip);
 float rust=smoothstep(.55,.8,lo2)*smoothstep(.09,.0,p.x);cc=mix(cc,vec3(.24,.10,.035),rust);
 a=mix(a,cc,cp);h+=cp*(.002-chip*.004+(fine-.5)*.0012)-smoothstep(.03,.0,p.x)*.012;
 float cg=line(abs(p.x-.14),.004,FX);a=mix(a,vec3(.012),cg);h-=cg*.002;
 float bj=line(abs(fract(p.y/1.2)-.5)*1.2,.0035,FZ)*cp;a=mix(a,vec3(.012),bj);h-=bj*.002;
 // wet patches: dark, flat, mirror-glossy; they run along the low side by the edge
 float wm=lo*.62+lo2*.38+.13*smoothstep(1.8,.15,p.x);
 float w=smoothstep(.74-wet*.34,.80-wet*.32,wm);
 w*=1.-.8*dome;a*=mix(1.,mix(.5,.78,paint),w);h*=1.-.86*w;h+=dome*.0045;
 gl=mix(.22+.18*(1.-gr)+.14*walk,.97,w);gl*=1.-gum*.5;
 gl=mix(gl,.55*(1.-wear),paint*(1.-w));
#ifdef OPEN
 {// the swept margin: a smooth meander (three periods, 1.2 to 7 m) with a lip a few cm high, crumbs and scuffs before it
  float sw=.66+.11*sin(p.y*.9+1.3)+.06*sin(p.y*2.17+.4)+.035*sin(p.y*5.2+2.)+.022*(mid-.5)+.006*(fine-.5);float dr=nn(p*vec2(.7,.22),-1.).g;
  float sn=smoothstep(sw-.012-FX,sw+.012+FX,p.x);float cr=smoothstep(.76,.8,hi)*smoothstep(sw-.14,sw-.02,p.x)*(1.-sn);sn=max(sn,cr*.85);
  float dx=p.x-sw-.035;float lip=exp(-dx*dx/.0012);
  vec3 sc=vec3(.64,.67,.72)*(.92+.08*mid)*(.92+.14*dr);a=mix(a,sc,sn);gl=mix(gl,.05+.04*fine,sn);
  float br=.03*sin(p.y*2.3+p.x*1.6+lo*2.)+.022*sin(p.y*4.1-p.x*2.7+lo2*2.5);   // broad relief, 4-8 cm over 1-3 m, smooth
  h=mix(h,.02+br+(dr-.5)*.01+(mid-.5)*.002+(fine-.5)*.0004+.035*lip*smoothstep(sw-.01,sw+.01,p.x)+cr*.006,sn);}
#endif
 return h;}`+Ke("if(id>.5)discard;float t=-C.y/d.y;vec3 P=C+d*t;vec2 P2=P.xz;FX=t/F*2.*OS/uM.x;FZ=FX*t/C.y;float FP=sqrt(FX*FZ);LF=log2(FP*256.);float E=max(.0014,FX*1.2);","vec3(0.,1.,0.)","vec3(1.,0.,0.)","vec3(0.,0.,1.)","floorMat"),ua=o=>Ge+`#define S ${o}
float pitMat(vec2 p,out vec3 a,out float gl){
 float lo=nn(p,-2.).r,mid=nn(p,1.).b,hi=nn(p,3.).a,lo2=nn(p+5.1,-1.).g;float h=0.;
 float sl=abs(fract(p.y/.68)-.5)*.68;float slv=(1.-smoothstep(.12,.13+FZ,sl))*smoothstep(-3.05,-2.95,p.x)*(1.-smoothstep(-.8,-.7,p.x));
 vec3 bed=mix(vec3(.022,.021,.02),vec3(.07,.065,.06),mid);bed*=.6+.8*hi;
 vec3 sc=mix(vec3(.035,.028,.022),vec3(.10,.08,.06),hi);
 a=mix(bed,sc,slv);h=slv*.03+(hi-.5)*.006;
 for(int i=0;i<2;i++){float r=i==0?-1.1:-2.6;float dd=abs(p.x-r);float rs=1.-smoothstep(.04,.13,dd);a*=1.-.65*rs;
  float pl=(1.-smoothstep(.075,.08+FX,dd));a=mix(a,mix(vec3(.05,.03,.02),vec3(.13,.06,.025),lo2),pl);}
 float w=smoothstep(.68-.38*uM.y,.8-.38*uM.y,lo*.6+lo2*.4)*(1.-slv*.8);w=max(w,uE.y);a=mix(a,vec3(.012,.014,.013),uE.y*.8);
 a*=mix(1.,.45,w);h*=1.-.9*w;gl=mix(.12,.94,w);
#ifdef OPEN
 {float sb=smoothstep(.05,.5,abs(p.x+1.85)-1.3);float rr=min(abs(p.x+1.1),abs(p.x+2.6));
  float dft=.5+.5*sin(p.y*.19+p.x*.55+lo*2.6+lo2*1.4);dft=dft*dft*(3.-2.*dft);
  vec3 sc=vec3(.62,.65,.7)*(.88+.12*mid)*mix(1.,.86+.16*dft,sb);
  float sv=(1.-smoothstep(.0,.3,sl))*(1.-smoothstep(.15,.5,rr))*smoothstep(.35,.65,mid*.7+lo2*.3)*(1.-sb);
  a=sc*(1.-.1*sv)*(1.-.55*(1.-smoothstep(.03,.1,rr))*(1.-sb));gl=.06;h=((lo-.5)*.04+(dft-.5)*.25)*sb+sv*.01+(mid-.5)*.004-(1.-smoothstep(.03,.1,rr))*.01;}
#endif
 return h;}
float railMat(vec2 p,out vec3 a,out float gl){float mid=nn(p*vec2(1.,.12),2.).b,hi=nn(p,4.).a;
 float dd=min(abs(p.x+1.1),abs(p.x+2.6));float crown=1.-smoothstep(.006,.03,dd);a=mix(vec3(.05,.035,.028),mix(vec3(.3,.29,.28),vec3(.52,.5,.47),mid),crown);gl=mix(.5,.96-.14*hi,crown);return (hi-.5)*.0004;}
float mixMat(vec2 p,out vec3 a,out float gl){float h;if(RAIL>5.){h=railMat(p,a,gl);if(RAIL>25.){a=vec3(.035,.022,.016)*(.6+.8*nn(p,3.).a);gl=.5;}}else h=pitMat(p,a,gl);return h;}`+Ke("if(abs(id-2.)>.5)discard;float rt=g.x;vec3 P=C+d*rt;vec2 P2=vec2(P.x-bend(rt),rt);RAIL=g.z;float t=rt;FX=t/F*2.*OS/uM.x;FZ=FX*t/1.4;float FP=sqrt(FX*FZ);LF=log2(FP*256.);float E=max(.003,FX*1.2);","(RAIL>25.?vec3(1.,0.,0.):vec3(0.,1.,0.))","vec3(1.,0.,0.)","vec3(0.,0.,1.)","mixMat"),ba=o=>Ge+oe+`#define S ${o}
// the mouth's perimeter coordinate from the crown (an ellipse's arc length, closed form to a few per cent), then down the upright
float arcM(vec2 p){float f=atan((p.x/MW)/max(p.y/MR,1e-4));return .5*(MW+MR)*f+.25*(MW-MR)*sin(2.*f)-sign(p.x)*min(p.y,0.);}
#ifdef FWALL
float wallMat(vec2 p,out vec3 a,out float gl){ // p=(along,up)
 float grime=uM.z;float lo=nn(p,-2.).r,lo2=nn(p+7.1,-1.).g,mid=nn(p,1.).b,hi=nn(p,3.).a,fine=nn(p+2.2,5.).r;float h=0.;
#if S==0
 float Tw=.152,Th=.076;vec2 q=p/vec2(Tw,Th);float row=floor(q.y);q.x+=fract(row*.5)*2.;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
 float gx=line((.5-abs(f.x))*Tw,.0028,FX),gz=line((.5-abs(f.y))*Th,.0028,FZ),gr=max(gx,gz);
 vec3 tile=uW1.rgb*mix(.84,1.16,r.r);
 float band=smoothstep(1.52,1.525,p.y)*(1.-smoothstep(1.68,1.685,p.y));tile=mix(tile,uW2.rgb*mix(1.,.68,r.g),band);
 float low=1.-smoothstep(.0,.46,p.y);tile=mix(tile,uW2.rgb*.9,low);
 tile*=1.-.5*smoothstep(.72,.9,r.a)*mid;
 float crz=smoothstep(.62,.68,fine*.5+hi*.5);tile*=1.-.16*crz;
 a=mix(tile,vec3(.06,.052,.042),gr);
 h=-gr*.0018+(r.b-.5)*.0018*f.x*2.+(r.a-.5)*.0018*f.y*2.;
 gl=mix(.82,.18,gr);
 float lost=step(.985,r.r*.6+r.g*.4+.0);a=mix(a,vec3(.05,.045,.04)*(.5+hi),lost);h-=lost*.006;gl*=1.-lost;
#elif S==1
 float pl=.17;float row=floor(p.y/pl);vec4 r=texelFetch(N,ivec2(mod(vec2(row,3.),256.)),0);float lx=line((.5-abs(fract(p.y/pl)-.5))*pl,.002,FZ);
 float grain=nn(p*vec2(.18,3.)+row*.37,3.).a;
 vec3 tile=mix(vec3(.17,.17,.165),vec3(.30,.30,.28),.5*r.r+.3*mid+.2*grain);float band=smoothstep(1.34,1.345,p.y)*(1.-smoothstep(1.66,1.665,p.y));tile=mix(tile,uW2.rgb*(1.3+.9*grain),band*.9);
 a=mix(tile,vec3(.03),lx*.8);
 vec2 tc=abs(fract(p/vec2(1.2,.68))-.5)*vec2(1.2,.68);float tie=1.-smoothstep(.012,.016+FX,length(tc));a=mix(a,vec3(.015),tie);
 h=-lx*.006+(grain-.5)*.004-tie*.012+(r.g-.5)*.012*step(.5,fract(p.y/pl));gl=.1+.05*hi;
#else
 float Tw=.225,Th=.075;vec2 q=p/vec2(Tw,Th);float row=floor(q.y);q.x+=fract(row*.5)*2.;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
 float gx=line((.5-abs(f.x))*Tw,.005,FX),gz=line((.5-abs(f.y))*Th,.005,FZ),gr=max(gx,gz);
 vec3 tile=mix(vec3(.17,.07,.04),vec3(.34,.15,.08),r.r);tile=mix(tile,vec3(.08,.06,.05),smoothstep(.6,.9,r.g));tile*=.65+.7*mid;float band=smoothstep(1.35,1.355,p.y)*(1.-smoothstep(1.65,1.655,p.y));tile=mix(tile,uW2.rgb*(1.1+.8*r.r),band);
 a=mix(tile,vec3(.09,.085,.075),gr);h=-gr*.005+(r.b-.5)*.004*f.x*2.+(hi-.5)*.0016;gl=.14;
 float rib=abs(fract(p.x/4.)-.5)*4.;float rb=1.-smoothstep(.09,.095+FX,rib);a=mix(a,vec3(.03,.024,.02)*(.7+hi),rb);h+=rb*.03;gl=mix(gl,.3,rb);
 float riv=1.-smoothstep(.012,.015+FX,length(vec2(rib,abs(fract(p.y/.22)-.5)*.22)-vec2(.055,0.)));a=mix(a,vec3(.09,.055,.03),riv*rb);h+=riv*.012;
#endif
 // long stains, damp and soot: more of it low down and toward the tunnel
 float streak=nn(p*vec2(1.7,.075),1.).g;float st=smoothstep(.56,.8,streak*.5+lo*.5)*smoothstep(.35,.6,lo2);
 float soot=smoothstep(.32,.8,lo*.45+lo2*.25+(1.-smoothstep(.2,2.8,p.y))*.4);
 a*=mix(1.,.34,st*grime);a*=mix(1.,.30,soot*grime);
 a=mix(a,vec3(.16,.08,.03)*.8,smoothstep(.72,.9,streak)*smoothstep(.45,.8,lo2)*grime*.8);
 gl*=mix(1.,.5,soot*grime);
 // cable runs: two rows of dark cables on brackets, with catenary sag
 float cl=0.;for(int i=0;i<3;i++){float cy=2.1+.058*float(i)+.018*pow(abs(fract(p.x/1.4+float(i)*.17)-.5)*2.,2.)*(-1.);float dd=abs(p.y-cy);float c0=1.-smoothstep(.016,.019+FZ,dd);cl=max(cl,c0);if(c0>.01){h+=c0*sqrt(max(1.-dd*dd/(.018*.018),0.))*.016;}}
 a=mix(a,vec3(.018,.017,.016),cl);gl=mix(gl,.38,cl);
 if(WID==6.||WID==3.){vec2 pc=WID==6.?p-vec2(.92,1.2):p-vec2(24.6,1.2);vec2 ph=WID==6.?vec2(.36,.56):vec2(1.25,.56);vec2 de=abs(pc)-ph;float fr=max(de.x,de.y);float frm=(1.-smoothstep(.0,.012+FX,fr))*smoothstep(-.035,-.03,fr);float pa=1.-smoothstep(-.032,-.03,fr);
  vec2 uq=pc/ph;vec4 r1=texelFetch(N,ivec2(mod(vec2(31.,57.)+floor(uM.w*36.)+WID*9.,256.)),0);vec3 k1=r1.rgb,k2=texelFetch(N,ivec2(mod(vec2(83.,19.)+floor(uM.w*36.)+WID*5.,256.)),0).rgb;k1*=k1*1.6;k2*=k2*1.6;float sh1=smoothstep(.03,-.03,length(uq-(r1.ba-.5)*.9)-.5),sh2=smoothstep(.03,-.03,abs(uq.y+uq.x*(r1.r-.5)*1.4-.3+r1.g*.5)-.17);vec3 paper=mix(vec3(.6,.56,.48),k1*.32+.1,.8);paper=mix(paper,k2*.36+.08,sh1);paper=mix(paper,r1.b>.5?vec3(.62,.59,.52):vec3(.04),sh2);paper*=.6+.5*mid;float tn=lo2*.72+mid*.28,torn=smoothstep(.57,.59,tn),bare=smoothstep(.66,.68,tn);vec3 old=mix(vec3(.5,.47,.4),k2.gbr*.3+.08,step(.5,fract(uq.x*1.3+r1.a)))*(.7+.3*mid);paper=mix(paper,old,torn);paper=mix(paper,vec3(.17,.16,.14)*(.6+.8*fine),bare);paper+=vec3(.3)*(smoothstep(.555,.57,tn)-torn);a=mix(a,paper,pa);gl=mix(gl,.08,pa);a=mix(a,vec3(.012),frm);gl=mix(gl,.3,frm);h+=frm*.008;}
 if(WID==6.&&p.x>1.5&&p.x<3.1&&p.y<2.25){a=vec3(.0);gl=0.;}
 if(WID==6.){float jd=max(max(1.46-p.x,p.x-3.14),p.y-2.29);float jm=(1.-smoothstep(.0,.008+FX,jd))*smoothstep(-.05,-.044,jd);a=mix(a,vec3(.02),jm);h+=jm*.012;}
 float br=line((.5-abs(fract(p.x/1.4)-.5))*1.4,.012,FX)*smoothstep(2.05,2.07,p.y)*(1.-smoothstep(2.26,2.28,p.y));a=mix(a,vec3(.05,.03,.02),br);h+=br*.02;
 return h;}
#endif
#ifdef PORT
// the end-wall features, drawn over the wall program's pixels: the portal round the mouth by station (a bolted iron ring,
// a chamfered concrete collar, brick voussoirs with a keystone) and the folding lattice gate the tubes light
#define PW (S==0?.134:S==1?.304:.43)
float portalMat(vec2 p,out vec3 a,out float gl){float lo2=nn(p+7.1,-1.).g,mid=nn(p,1.).b,hi=nn(p,3.).a;float h=0.;
 a=S==0?uW1.rgb*.8:S==1?vec3(.2,.2,.19):vec3(.24,.1,.055);gl=.2;
 if(p.x>1.5&&p.x<3.1&&p.y<2.25){vec2 gq=vec2(p.x-1.5,p.y)/.3;float lat=max(line((.5-abs(fract(gq.x+gq.y)-.5))*.212,.007,FX),line((.5-abs(fract(gq.x-gq.y)-.5))*.212,.007,FX));float ch=line((.5-abs(fract(gq.x)-.5))*.3,.013,FX);float rl=max(line(abs(p.y-1.05),.028,FX),line(abs(p.y-2.19),.04,FX));
  float mm=max(max(lat,ch),rl)*(1.-uE.w);a=vec3(.2,.19,.17)*(.7+.6*mid)*mm;a=mix(a,vec3(.16,.07,.03)*mm,smoothstep(.6,.8,lo2)*.5);gl=.3*mm;h+=mm*.012+ch*.012+rl*.01;}
 else{float md=sdMouth(p);vec2 mq=vec2(p.x-MX,p.y-MY);float al=arcM(mq)*1.06;
#if S==0
  float w=.13,rv=1.-smoothstep(w,w+FX+.004,md);float bo=(1.-smoothstep(.011,.019+FX,length(vec2((fract(al/.26)-.5)*.26,md-.066))))*rv;
  vec3 rc=vec3(.075,.06,.048)*(.7+.6*mid);rc=mix(rc,vec3(.17,.075,.03),smoothstep(.55,.8,lo2)*.6);
  a=mix(a,rc,rv);a=mix(a,rc*2.,bo);gl=mix(gl,.3,rv);h+=rv*.012*(smoothstep(.0,.025,md)-smoothstep(w-.025,w,md))+bo*.006;
#elif S==1
  float w=.3,rv=1.-smoothstep(w,w+FX+.004,md);
  a=mix(a,vec3(.21,.205,.19)*(.75+.5*mid)*(.88+.24*hi),rv);a*=1.-.45*line(abs(md-w),.006,FX);h+=rv*(.035*smoothstep(.0,.08,md)+(hi-.5)*.002);gl=mix(gl,.08,rv);
#else
  float w=.38,rv=1.-smoothstep(w,w+FX+.004,md);float vb=max(line((.5-abs(fract(al/.17+step(.19,md)*.5)-.5))*.17,.007,FX),line(abs(md-.19),.007,FX));
  vec3 bc=vec3(.2,.075,.04)*(.7+.6*mid)*(.85+.3*hi);float ks=(1.-smoothstep(.0,FX+.004,abs(mq.x)-.13-.07*md/w))*step(0.,mq.y)*(1.-smoothstep(w+.04,w+.05,md));
  a=mix(a,mix(bc,vec3(.09,.08,.07),vb),rv);a=mix(a,vec3(.3,.28,.24)*(.8+.4*mid),ks);h+=rv*(.012-vb*.006)+ks*.018;gl=mix(gl,.12,rv);
#endif
 }
 return h;}
#endif
#ifdef TUN
float tunMat(vec2 p,out vec3 a,out float gl){float lo=nn(p,-2.).r,mid=nn(p,1.).b,hi=nn(p,3.).a;float h=(hi-.5)*.003;
 {
  // the running tunnel: bolted rings, a joint every .62 m closing up toward the bend; soot on the crown, brake dust low,
  // a few lime runs; fine grain fades where one pixel spans many cm along the bore (it read as static)
  float sx=abs(p.x),z=p.y,kf=1.-smoothstep(.02,.09,FZ),SG=.62;float ri=floor(z/SG),rf=z-ri*SG,jd=min(rf,SG-rf);vec4 rr=texelFetch(N,ivec2(mod(vec2(ri,11.),256.)),0);
  float jt=line(jd,.028,FZ),fl=line(abs(rf-.075),.04,FZ);
  float sa=sx/.98+rr.x;float sj=line((.5-abs(fract(sa)-.5))*.98,.005,FX)*(1.-jt);
  float bk=(1.-smoothstep(.006,.014,FX))*fl*(1.-smoothstep(.006,.011,abs(fract(sx/.19+rr.y)-.5)*.19));
  vec3 b0=mix(vec3(.096,.078,.062),vec3(.205,.164,.124),mid)*(.86+.28*mix(.5,hi,kf));
  b0*=mix(1.,.58,(1.-smoothstep(.5,2.2,sx))*(.5+.5*lo));
  b0=mix(b0,vec3(.15,.074,.034)*(.7+.6*mid),smoothstep(3.1,4.5,sx)*.75);
  float l0=rr.w*2.2+.4;float lr=line(abs(rf-.04-.1*rr.z),.018,FZ)*smoothstep(.72,.9,rr.y)*smoothstep(l0,l0+.15,sx)*(1.-smoothstep(l0+.3,l0+1.5,sx));b0=mix(b0,vec3(.3,.29,.25),lr*.55);
  a=b0*(1.-.85*jt)*(1.+.45*fl)*(1.-.45*sj)*(1.-.6*bk);h=fl*.003-jt*.006-sj*.003-bk*.004+(mid-.5)*.004+kf*(hi-.5)*.0016;
  float wetw=smoothstep(.55,.72,lo*.7+mid*.3);a*=mix(1.,.75,wetw);gl=mix(.08,.3,wetw);
  // a shelf of five cables at shoulder height on brackets, sagging between them, dusty on top
  float bp=fract(z/2.48),sag=.05*bp*(1.-bp);float cu=(sx-2.62-sag)/.055,ci=clamp(floor(cu+.5),0.,4.);float cd=abs(cu-ci)*.055;float c0=(1.-smoothstep(.016,.019+FX,cd))*step(-.6,cu)*step(cu,4.6);
  a=mix(a,mix(vec3(.018,.016,.015),vec3(.1,.09,.075),smoothstep(.05,-.35,cu-ci)),c0);h+=c0*sqrt(max(1.-cd*cd/(.018*.018),0.))*.016;gl=mix(gl,.35,c0);
  float bt=line(min(bp,1.-bp)*2.48,.022,FZ)*step(2.57,sx)*step(sx,2.9);a=mix(a,vec3(.06,.05,.04),bt);h+=bt*.02;
  // the lamp fittings on the outer wall: a painted box under the bulb with its conduit down to the shelf
  if(p.x<0.){float k=clamp(floor((z-29.4)/8.2),0.,4.),dz=z-33.5-8.2*k;float on=mod(floor(uE.z/exp2(k)),2.);
   float hb=max(abs(sx-2.5)-.11,abs(dz)-.12);float hm=(1.-smoothstep(0.,FX+.004,hb))*on,rim=hm*smoothstep(-.035,-.01,hb);float cn=line(abs(dz),.014,FZ)*step(2.6,sx)*step(sx,2.66)*on;
   a=mix(a,mix(vec3(.035,.032,.03),vec3(.2,.18,.15),rim),hm);a=mix(a,vec3(.04),cn);h+=hm*.03+cn*.01;gl=mix(gl,.25,hm);}}
 return h;}
#endif
#ifdef FROOF
float roofMat(vec2 p,out vec3 a,out float gl){float lo=nn(p,-2.).r,mid=nn(p,1.).b,hi=nn(p,3.).a;float h=(hi-.5)*.003;
 {
#if S==1
  float T=2.4;float bm=abs(fract(p.y/T)-.5)*T;float rb=1.-smoothstep(.18,.2+FZ,bm);a=mix(vec3(.10,.10,.095),vec3(.19,.19,.18),mid)*(.6+.8*hi);a*=mix(1.,.6,rb);h+=rb*.2;gl=.08;
#elif S==2
  float T=4.;float bm=abs(fract(p.y/T)-.5)*T;float rb=1.-smoothstep(.09,.1+FZ,bm);a=mix(vec3(.11,.05,.03),vec3(.2,.1,.06),mid)*(.6+.7*hi);a=mix(a,vec3(.025),rb);h+=rb*.05;gl=.1;
#else
  float Tw=.152;vec2 q=p/vec2(.076,Tw);float row=floor(q.y);q.x+=fract(row*.5)*2.;vec2 id=floor(q),f=q-id-.5;vec4 r=texelFetch(N,ivec2(mod(id,256.)),0);
  float gr=max(line((.5-abs(f.x))*.076,.0028,FX),line((.5-abs(f.y))*Tw,.0028,FZ));a=uW1.rgb*mix(.7,.985,r.r)*(.62+.5*mid);a=mix(a,vec3(.05),gr);h=-gr*.002+(r.b-.5)*.002*f.y;gl=mix(.6,.1,gr);
#endif
  a*=mix(1.,.42,smoothstep(.35,.72,lo)*uM.z);}
 return h;}
#endif
float blockMat(vec2 p,out vec3 a,out float gl){float h;if(ISROOF>.5)h=roofMat(p,a,gl);else h=wallMat(p,a,gl);return h;}`+Ke(`if(id<2.5)discard;if(id>7.5){o=uOut==0?vec4(0.):vec4(0.,-1.,0.,1./g.x);return;}float bid;float t=hitBox(C,d,bid);vec3 P=C+d*t;vec2 P2;vec3 NB,T1,T2;ISROOF=0.;ISTUN=0.;WID=id;
 if(g.z>90.){o=uOut==0?vec4(.14,.14,.15,.2):vec4(0.,-1.,0.,1./g.x);return;}
 if(id==7.){t=g.x;P=C+d*t;vec2 rq=vec2(P.x-bend(t)-MX,P.y-MY);vec2 gn=vec2(rq.x,max(rq.y,0.))/vec2(MW*MW,MR*MR);P2=vec2(arcM(rq),t);NB=normalize(vec3(-gn,.0));T1=normalize(vec3(gn.y,-gn.x,0.));T2=vec3(0.,0.,1.);ISROOF=1.;ISTUN=1.;}
 else if(id==3.){P2=P.zy;NB=vec3(1.,0.,0.);T1=vec3(0.,0.,1.);T2=vec3(0.,1.,0.);}
 else if(id==4.){P2=P.zy+vec2(11.,0.);NB=vec3(-1.,0.,0.);T1=vec3(0.,0.,1.);T2=vec3(0.,1.,0.);}
 else if(id==6.){P2=vec2(P.x,P.y);NB=vec3(0.,0.,-1.);T1=vec3(1.,0.,0.);T2=vec3(0.,1.,0.);}
 else{P2=P.xz;ISROOF=1.;NB=vec3(0.,-1.,0.);if(uV.z>.5){float b=uV.y-uV.x;vec2 gg=vec2(P.x/(XB*XB),(P.y-uV.x)/(b*b));NB=normalize(vec3(-gg.x,-gg.y,0.));}T1=vec3(1.,0.,0.);T2=vec3(0.,0.,1.);}
 float zf=max(t,.1);FX=zf/F*2.*OS/uM.x;FZ=id==3.||id==4.?FX*zf/max(abs(P.x-C.x),.3):id==7.?FX*zf/max(abs(dot(P-C,NB)),.3):FX;float FP=id==7.?max(FX,FZ):sqrt(FX*FZ);LF=log2(FP*256.);float E=max(.0016,FX*1.2);`,"NB","T1","T2","blockMat"),ga=o=>ua(o).replace("float pitMat",`float RAIL;
float pitMat`),re=o=>ba(o).replace(`#ifdef FWALL
float wallMat`,`float ISROOF,ISTUN,WID;
#ifdef FWALL
float wallMat`),ne="if(ISROOF>.5)h=roofMat(p,a,gl);else h=wallMat(p,a,gl);",ke=" float zf=max(t,.1);",je=o=>re(o).replace("#define S "+o,"#define S "+o+`
#define FWALL`).replace(ne,"h=wallMat(p,a,gl);").replace(ke," if(ISROOF>.5)discard;"+ke),ya=o=>re(o).replace("#define S "+o,"#define S "+o+`
#define FROOF`).replace(ne,"h=roofMat(p,a,gl);").replace(ke," if(ISROOF<.5||ISTUN>.5)discard;"+ke),jo=()=>re(0).replace("#define S 0",`#define S 0
#define TUN`).replace(ne,"h=tunMat(p,a,gl);").replace("LF=log2(FP*256.);","LF=log2(FP*256.);if(ISTUN<.5)discard;"),Zo=o=>re(o).replace("#define S "+o,"#define S "+o+`
#define PORT`).replace(ne,"h=portalMat(p,a,gl);").replace("LF=log2(FP*256.);","LF=log2(FP*256.);if(!(id==6.&&(sdMouth(P.xy)<PW+FX||(P.x>1.51&&P.x<3.09&&P.y<2.24))))discard;"),Yo=o=>re(o).replace("#define S "+o,"#define S "+o+`
#define FROOF
#define TUN
#define PORT`).replace(ne,"if(ISTUN>.5)h=tunMat(p,a,gl);else if(ISROOF>.5)h=roofMat(p,a,gl);else h=portalMat(p,a,gl);").replace("LF=log2(FP*256.);","LF=log2(FP*256.);if(ISROOF<.5&&!(id==6.&&(sdMouth(P.xy)<PW+FX||(P.x>1.51&&P.x<3.09&&P.y<2.24))))discard;"),wa=yt+`in vec2 vUv;out vec4 o;uniform sampler2D G,A,Nm;uniform float uT[20];uniform vec4 uAmb,uTub,uDawn,uTun,uBox;uniform int uNk;
void main(){vec2 n=(vUv*2.-1.)*OS;vec3 d=vec3((n-VP)/F,1.);vec4 g=texelFetch(G,ivec2(gl_FragCoord.xy),0);float id=g.y;vec3 P=C+d*g.x;
 vec4 ab=texelFetch(A,ivec2(gl_FragCoord.xy),0);vec3 al=ab.rgb*ab.rgb;vec3 Nn=texelFetch(Nm,ivec2(gl_FragCoord.xy),0).xyz;
 float ao=.65+.35*Nn.y;if(P.y<-.02)ao*=.5;ao*=exp(-max(P.z-END,0.)*.45);
 vec3 c=al*uAmb.rgb*ao;float fl=0.;
 if(id==8.||id==9.){float row=id-8.;float k=floor(g.w),fr=fract(g.w);float b=uT[int(row*10.+k)];float end=smoothstep(0.,.08,fr)*smoothstep(1.,.92,fr);float cr=smoothstep(1.,.55,abs(g.z));
  float e=(.12+.88*end)*(.95+.1*fract(k*.37))*(20.*exp(-g.z*g.z*7.)+1.4*cr);if(b<0.)fl=-b*e;else if(b>0.)c=uTub.rgb*b*e;else c=uTub.rgb*(.03+.012*cr)*(.4+.6*end);}
 if(g.z>90.){float row=abs(P.x-1.35)<abs(P.x+1.85)?0.:1.;float xr=row<.5?1.35:-1.85;float a=(P.z-.7)/3.,k=floor(a),fr=a-k;float b=k>=0.&&k<10.&&fr<.55?uT[int(row*10.+k)]:0.;float tq=clamp((abs(P.x-xr)-.075)/.06,0.,1.);
  c=fr<.55?uTub.rgb*(abs(b)*(1.1*(1.-tq)+.12)+.022):uTub.rgb*.018;}
 if(id==6.&&P.x>1.5&&P.x<3.1&&P.y<2.25){float gate=uDawn.w>.5?1.:(.45+.55*smoothstep(.0,.015,abs(fract(P.x/.14)-.5)-.09));float gy=smoothstep(0.,2.2,P.y);float tread=.55+.45*smoothstep(.0,.03,abs(fract(P.y/.17)-.5)-.1);float edge=smoothstep(1.5,1.72,P.x)*smoothstep(3.1,2.88,P.x)*smoothstep(2.25,1.9,P.y);
  float nos=1.-smoothstep(.0,.012,abs(fract(P.y/.17)-.62)*.17);float hr=(1.-smoothstep(.006,.02,min(abs(P.x-1.64-(P.y-.95)*.24),abs(P.x-2.96+(P.y-.95)*.24))))*step(.95,P.y)*(1.-uDawn.w);
  vec3 pc=uDawn.rgb*((.1+.9*gy*gy)*tread*(1.+1.3*nos*(1.-uDawn.w))*gate*edge+1.6*hr*gy);c=mix(pc,c,smoothstep(.002,.02,dot(al,vec3(.333)))*(1.-uDawn.w));}
 if(P.z>END){float k=clamp(floor((P.z-29.4)/8.2),0.,4.);float dz=P.z-33.5-8.2*k;vec3 on=uTun.rgb*mod(floor(uTun.w/exp2(k)),2.);
  if(id==2.&&g.z>5.&&g.z<25.)c+=on*.4*exp(-dz*dz*.12)+uTun.rgb*.03*smoothstep(95.,34.,P.z);}
 if(P.z>END-.5){for(int i=0;i<uNk;i++){float zk=33.5+8.2*float(i);vec2 s=VP+(vec2(bend(zk)-3.3,1.7)-C.xy)/zk*F;float r=length(n-s)*zk/F;
  c+=uTun.rgb*mod(floor(uTun.w/exp2(float(i))),2.)*(step(zk-1.5,P.z)*7.*(1.-smoothstep(.016,.028,r))+.7*exp(-r*r/.012)+.05*exp(-r*4.));}}
 if(id==6.){vec2 q=vec2(P.x-2.3,P.y-2.47);if(abs(q.x)<.46&&abs(q.y)<.105){float ar=max(step(abs(q.y),.018)*step(abs(q.x+.02),.2),step(abs(q.y),(q.x+.3)*.75)*step(q.x,-.2));c=mix(vec3(.004),uBox.rgb*(2.+5.*ar),step(abs(q.x),.44)*step(abs(q.y),.088));}}
 o=vec4(c,fl);}`,za=yt+`in vec2 vUv;out vec4 o;uniform sampler2D G,A,Nm;uniform vec4 uL,uC;uniform int uNs;
void main(){vec2 n=(vUv*2.-1.)*OS;vec3 d=vec3((n-VP)/F,1.);vec4 g=texelFetch(G,ivec2(gl_FragCoord.xy),0);if(g.y>7.5){o=vec4(0.);return;}
 vec3 P=C+d*g.x;vec4 ab=texelFetch(A,ivec2(gl_FragCoord.xy),0);vec3 al=ab.rgb*ab.rgb;vec3 Nn=texelFetch(Nm,ivec2(gl_FragCoord.xy),0).xyz;float E=0.;
 for(int i=0;i<uNs;i++){vec3 Lp=uL.xyz+vec3(0.,0.,(float(i)-1.)*.55);vec3 L=Lp-P;float d2=dot(L,L);float nl=max(dot(Nn,L)/sqrt(d2),0.);float sh=1.;
  if(P.y<-.01){float s=-P.y/(Lp.y-P.y);float xc=P.x+(Lp.x-P.x)*s;sh=smoothstep(.12,-.12,xc);}
  E+=nl*sh/(d2+.2);}
 E*=uL.w/3.;if(uC.w>.5)E*=smoothstep(END-2.,END+1.5,P.z);else if(P.z>END)E*=exp(-(P.z-END)*.75);
 o=vec4(al*E*uC.rgb,dot(al,vec3(.333))*E);}`,Ta=yt+oe+`in vec2 vUv;out vec4 o;uniform sampler2D G,A,Nm;uniform float uT[20];uniform vec4 uTub,uWall,uDawn,uBox;
void main(){vec2 n=(vUv*2.-1.)*OS;vec3 d=vec3((n-VP)/F,1.);vec4 g=texture(G,vUv);float idd=g.y;if(idd>6.5){o=vec4(0.);return;}
 vec3 P=C+d*g.x;vec4 ab=texture(A,vUv);vec3 Nn=normalize(texture(Nm,vUv).xyz);float gl=ab.a;vec3 V=normalize(C-P);
 vec3 R=reflect(-V,Nn);if(R.z>0.&&R.y<.003)R.y=.003;
 float Fr=.04+.96*pow(1.-clamp(dot(Nn,V),0.,1.),5.);
 float rough=(1.-gl)*.35+.008;float id;vec3 o2=P+Nn*.003;float t=hitBox(o2,R,id);vec3 p=o2+R*t;
 vec3 c=uWall.rgb*(.14+.86*smoothstep(.0,2.8,p.y));if(id==0.||id==2.)c=uWall.rgb*.06;if(id==5.)c=uWall.rgb*.55;
 if(id==6.&&R.z>0.){float m=sdMouth(p.xy);c*=smoothstep(-.03-rough*t,.03+rough*t,m);
  float pt=smoothstep(.03,-.03,max(max(1.5-p.x,p.x-3.1),p.y-2.25));c=mix(c,uDawn.rgb*(.55+.6*smoothstep(0.,2.2,p.y))*(uDawn.w>.5?1.:.7),pt);vec2 lq=abs(p.xy-vec2(2.3,2.47))-vec2(.44,.088);float bx=.012+rough*t*.07,by=.012+rough*t*.6;c=mix(c,uBox.rgb*1.3,smoothstep(bx,-bx,lq.x)*smoothstep(by,-by,lq.y)*step(0.,t));}
 float fl=0.;
 if(R.y>0.){float s=(2.7-o2.y)/R.y;if(s<t&&s>0.){float x=o2.x+R.x*s,z=o2.z+R.z*s;float a=(z-.7)/3.,k=floor(a),fr=a-k;float sd=rough*s+.002;float aw=sd*.5/3.;
   float along=smoothstep(-aw,aw,fr)*(1.-smoothstep(.55-aw,.55+aw,fr));
   for(int i=0;i<2;i++){float xr=i==0?1.35:-1.85;float wid=.075+sd;float m=(.075/wid)*(1.-smoothstep(.55*wid,wid,abs(x-xr)))*along;
    float b=k<0.?.9:(k<10.?uT[i*10+int(k)]:0.);if(b<0.)fl+=-b*m*14.;else c+=uTub.rgb*b*m*14.;}}}
 float w=Fr*gl*gl;o=vec4(c*w,fl*w);}`,Pa=yt+`in vec2 vUv;out vec4 o;uniform sampler2D T;uniform vec4 uD;uniform int uTaps;
void main(){vec2 st=uD.xy;if(uD.z>.5){vec2 n=(vUv*2.-1.)*OS;vec2 r=VP-n;st=r*uD.w*(smoothstep(.0,1.3,length(r)))*.5+vec2(0.,uD.w*.03);}
 vec4 s=vec4(0.);float w=0.;for(int i=0;i<uTaps;i++){float x=(float(i)+.5)/float(uTaps)*2.-1.;float k=exp(-2.5*x*x);s+=texture(T,vUv+st*x)*k;w+=k;}o=s/w;}`,Fa=yt+`in vec2 vUv;out vec4 o;uniform sampler2D T,G;uniform vec4 uD;uniform int uTaps;
float coc(float z){return uD.x*abs(1./max(z,.5)-1./uD.y);}
void main(){float zc=texture(G,vUv).x;float cc=min(coc(zc),uD.w);vec4 s=texture(T,vUv);float w=1.;float R=cc*uD.z;
 for(int i=1;i<uTaps;i++){float fi=float(i);float r=sqrt(fi/float(uTaps));float th=fi*2.39996;vec2 off=vec2(cos(th),sin(th))*r*R;vec2 uv=vUv+off;float zt=texture(G,uv).x;float ct=min(coc(zt),uD.w);float k=zt<zc?1.:smoothstep(0.,1.,ct/max(r*cc,.001));s+=texture(T,uv)*k;w+=k;}o=s/w;}`,Ma=yt+`in vec2 vUv;out vec4 o;uniform sampler2D T;uniform vec4 uD;
void main(){vec4 c=texture(T,vUv);if(uD.z>.5){c.rgb=max(c.rgb-uD.y,vec3(0.));c.a=max(c.a-uD.y,0.);}o=c*uD.x;}`,Ze="vec3 tone(vec3 x){x*=U[1].y;x=x*(2.51*x+.03)/(x*(2.43*x+.59)+.14);return pow(clamp(x,0.,1.),vec3(.4545));}",Ye=`float box(float u,float w,float b){return clamp((u+w*.5)/b+.5,0.,1.)-clamp((u-w*.5)/b+.5,0.,1.);}
float pm(float s,float P){return mod(s+.5*P,P)-.5*P;}
vec3 tp(float s,float b,float dr){float c=mod(s,19.)-.8;float wn=box(pm(c,5.8),3.3,b),dd=box(pm(c-2.9,5.8),1.5*dr,b);float gap=box(pm(s,19.),1.5,b);float cab=smoothstep(2.4,3.2,s);return vec3(wn*(1.-gap)*cab,dd*(1.-gap)*cab,gap);}
`,ka=yt+`in vec2 vUv;out vec4 o;uniform sampler2D B,A,Nm,Nz;uniform vec4 U[12];uniform int uNL;
${Ze}${Ye}
void main(){vec2 n=vUv*2.-1.;vec2 lean=U[0].xy;vec2 t0=(n/OS)*.5+.5;float iz=textureLod(Nm,t0,0.).a;vec2 nb=n+lean*F*iz;vec2 uv=(nb/OS)*.5+.5;
 vec4 b=textureLod(B,uv,0.),ab=textureLod(A,uv,0.),nz=textureLod(Nm,uv,0.);iz=nz.a;vec3 al=ab.rgb*ab.rgb;float gl=ab.a;vec3 Nn=nz.xyz/max(length(nz.xyz),.001);
 float avg=dot(al,vec3(.333));vec3 tint=avg>.004?min(al/avg,vec3(1.8)):vec3(1.);
 vec3 col=b.rgb*U[0].w+b.a*U[1].x*U[10].rgb*tint;
 vec3 P=C+vec3((nb-VP)/F,1.)/iz;vec3 Cc=C+vec3(lean,0.);vec3 V=normalize(Cc-P);float nv=clamp(dot(Nn,V),0.,1.);float Fr=.04+.96*pow(1.-nv,5.);
 vec3 lc=U[6].rgb;
 if(U[2].w+U[4].w>.001){for(int i=0;i<uNL;i++){vec4 lq=i==0?U[2]:i==1?U[3]:U[4];vec3 lp=lq.xyz;if(i==2)lp.z=62.;float pw=lq.w;vec3 to=lp-P;float d2=dot(to,to);vec3 L=to/sqrt(d2);float nl=max(dot(Nn,L),0.);
   float ap=1.;if(P.z<END&&lp.z>END){float s=(END-P.z)/(lp.z-P.z);vec2 q=P.xy+to.xy*s;ap=smoothstep(.34,-.34,sdMouth(q));}
   float cone=i<2?smoothstep(U[5].w,U[5].w+.28,dot(-L,U[5].xyz)):1.;
   vec3 H=normalize(L+V);float sp=pow(max(dot(Nn,H),0.),8.+900.*gl*gl);float spk=(1.+900.*gl*gl)*.008*Fr*gl*(Nn.y>.3?1.:0.);
   float difk=i<2?.07:0.;col+=(al*nl*difk/PI+lc*spk*sp)*lc*cone*ap*pw/(d2+1.);}}
 if(U[4].w>.01){float gl0=U[4].w;if(P.z>END+.4){float wz=exp(-pow(abs(P.z-U[4].z)/8.5,2.));col+=al*lc*gl0*.02*wz*max(Nn.x*.34+Nn.z*.4+.04,0.)*3.*mix(.1,1.,smoothstep(38.,54.,U[4].z));}
  vec3 rm=Cc+vec3((n-VP)/F,1.)*END;float md=sdMouth(rm.xy);float through=P.z>END-.2?1.:0.;col+=lc*gl0*(.00022*through*smoothstep(.1,-.5,md)*smoothstep(-1.,1.,rm.x-U[4].x*0.+1.2)+.00006*exp(-max(md,0.)*1.1)*(1.-through));}
 // the train's windows and open doors as a light source
 float zh=U[7].x,zt=U[7].y;
 if(U[1].z>.001){float dx=P.x-XT;if(dx>.02&&P.y>-.1){vec3 tl=normalize(vec3(-dx,1.3-P.y,0.));float nl=max(dot(Nn,tl),0.);float ext=smoothstep(zh-1.-dx,zh+1.+dx,P.z)*(1.-smoothstep(zt-1.-dx,zt+1.+dx,P.z));
    vec3 cv=tp(P.z-zh,max(U[7].z,.15+dx*.85+max(P.y,0.)*1.1),U[1].w);float cover=cv.x*.62+cv.y*1.1;
    col+=al*nl*ext*cover*U[1].z*U[9].rgb*1./(1.+dx*dx*.45);}
  vec3 R=reflect(-V,Nn);if(R.x<-.01){float t=(XT-P.x)/R.x;float Y=P.y+R.y*t,Z=P.z+R.z*t;if(Z>zh&&Z<zt&&Y>.0&&Y<2.){float e=.09+t*(1.-gl)*.35;vec3 cv=tp(Z-zh,U[7].z+e*2.,U[1].w);float by=smoothstep(.78-e,.78+e,Y)*(1.-smoothstep(1.75-e,1.75+e,Y));float dy=smoothstep(-e,e,Y)*(1.-smoothstep(1.95-e,1.95+e,Y));
     col+=U[9].rgb*U[1].z*(cv.x*by+cv.y*dy)*Fr*gl*gl*.9*(Nn.y>.3?1.:.2);}}}
 if(U[9].w>.01&&P.x>-.05&&P.y>-.1){float ex=exp(-P.x*1.9)*smoothstep(26.,5.,P.z);vec3 sk=vec3(1.,.42,.08)*U[9].w*ex;col+=(al*.85+gl*gl*Fr*.5)*sk;}
 // the signal lamp and its smear in the wet floor
 vec3 sg=vec3(.22,1.5+U[8].w,28.92);vec2 s0=VP+(vec2(.22,1.5)-Cc.xy)/sg.z*F;vec3 sl=sg-vec3(0.,0.,.25)-P;float sl2=dot(sl,sl);col+=al*U[8].rgb*max(dot(Nn,sl),0.)/(sqrt(sl2)*(sl2+.05))*.1;vec2 hq=abs(n-s0)-vec2(.019,.048);float hd=max(hq.x,hq.y);vec2 bq=abs(n-s0+vec2(.026,.0))-vec2(.01,.0035);float pl=max(1.-smoothstep(-.0015,.0015,hd),1.-smoothstep(-.001,.001,max(bq.x,bq.y)));vec2 s1=VP+(vec2(.22,1.5-U[8].w)-Cc.xy)/sg.z*F;
 col=mix(col,vec3(.004)+col*.03+U[10].rgb*.05*smoothstep(.004,-.002,abs(n.y-s0.y-.048)),pl);col=mix(col,vec3(.012,.013,.014),(1.-smoothstep(.0055,.0075,length(n-s1)))*pl);vec2 ss=VP+(sg.xy-Cc.xy)/sg.z*F;float sd=length(n-ss);col+=U[8].rgb*(7.*(1.-smoothstep(.0025,.0078,sd))+.22/(1.+sd*sd*9000.)*(1.-.6*pl));
 if(Nn.y>.5&&P.y>-.1){vec3 R=reflect(-V,Nn);float t=(sg.z-P.z)/R.z;if(t>0.){vec2 h=P.xy+R.xy*t-sg.xy;float dd=dot(h,h);col+=U[8].rgb*Fr*gl*gl*2.6*exp(-dd*(26./(.08+(1.-gl)*(1.-gl)*7.)));}}
 // headlamp haze: the closed-form single scatter along the ray
 if(U[6].w>.001){vec3 rd=normalize(P-Cc);vec3 l=(U[2].xyz+U[3].xyz)*.5-Cc;float tb=dot(l,rd),h2=max(dot(l,l)-tb*tb,.02),h=sqrt(h2),len=length(P-Cc);float s=atan((len-tb)/h)+atan(tb/h);col+=lc*s/h*U[6].w;}
 // grain + vignette + tone
 vec2 vg=n*.92;col*=1.-.12*dot(vg,vg);
 col=tone(col);float gr=textureLod(Nz,vUv*vec2(3.91,3.91)+U[0].z,0.).r-.5;col+=gr*.01*(1.15-col);
 o=vec4(col,1.);}`,Ea=yt+`in vec2 vUv;out vec4 o;uniform sampler2D Nm,Nz;uniform vec4 U[12],uK,uK2,uK3;
${Ze}${Ye}
const float CR=2.05,RS=.42;
float ln(float d,float w,float f){return (1.-smoothstep(w,w+f+.001,d))*min(1.,(2.*w+.001)/(f+.001)+.03);}
vec3 interior(vec3 h,vec3 d,float zh,float dw,out float lum){
 float tx=(-3.14-XT)/d.x;float ty=d.y>0.?(2.16-h.y)/d.y:(0.-h.y)/d.y;float t=min(tx,ty);vec3 q=h+d*t;float zr=q.z-zh;vec3 c;float sx=min(abs(q.x+1.15),abs(q.x+2.13));
 if(t==tx){float ed=.008+.0016*t;float seat=smoothstep(.42-ed,.42+ed,q.y)*(1.-smoothstep(.86-ed,.86+ed,q.y));float wn=smoothstep(.9-ed,.9+ed,q.y)*(1.-smoothstep(1.75-ed,1.75+ed,q.y));float pil=1.-smoothstep(.1-ed,.13+ed,abs(pm(zr,2.3)));float panel=smoothstep(1.78-ed,1.78+ed,q.y);
  c=vec3(.3,.29,.25)*(.55+.45*smoothstep(.0,2.1,q.y));
  vec3 mo=uK2.rgb*(.7+.3*fract(zr*3.7)*fract(zr*1.3));mo*=1.-.7*(1.-smoothstep(.0,.02+ed*.6,abs(pm(zr,.52))-.008));mo*=.72+.5*smoothstep(.42,.86,q.y);c=mix(c,mo,seat);
  c=mix(c,vec3(.035,.03,.03),(1.-smoothstep(.42-ed,.42+ed,q.y))*smoothstep(.08-ed,.08+ed,q.y));
  vec3 gls=vec3(.015,.018,.024)+vec3(.8,.76,.65)*(1.-smoothstep(.02,.08,abs(q.y-1.5)-.012))*.9;c=mix(c,gls,wn*(1.-pil));
  float fr2=max(abs(pm(zr-1.15,2.3))-.9,abs(q.y-1.95)-.11);c=mix(c,vec3(.74,.72,.66),panel*(1.-smoothstep(-.008,.008,fr2)));c*=1.-.5*panel*smoothstep(-.02,.0,fr2)*(1.-smoothstep(.0,.02,fr2));}
 else if(q.y>1.){float st=1.-smoothstep(.07,.1+.002*t,sx);float jt=1.-smoothstep(.006,.016+.0022*t,abs(pm(zr,.95)));c=vec3(.33,.315,.28)*(.35+.65*smoothstep(.55,.0,sx))*(1.-.12*jt);c=mix(c,vec3(2.6,2.5,2.2),st);c+=vec3(.35,.33,.29)*exp(-sx*sx*60.);}
 else{c=vec3(.15,.145,.15);float rs=exp(-sx*sx*26.);c+=vec3(.34,.33,.28)*rs;}
 for(int i=0;i<2;i++){float rx=i==0?-.92:-2.62;float tr=(rx-XT)/d.x;float ry=h.y+d.y*tr;float wr=.011+.0009*tr;if(tr<t&&tr>0.){float rl=1.-smoothstep(wr*.7,wr*1.3,abs(ry-1.96));c=mix(c,vec3(.95,.92,.82),rl*dw);}}
 for(int i=0;i<2;i++){float tp2=((i==0?-.82:-2.72)-XT)/d.x;float zp=h.z+d.z*tp2,py=h.y+d.y*tp2;if(tp2<t&&py>0.&&py<2.16){float pd=abs(pm(zp-zh+float(i)*1.45,2.9));float pw=.024+.0016*tp2;float pole=1.-smoothstep(pw*.7,pw*1.25,pd);vec3 pc2=mix(vec3(.5,.38,.09),vec3(1.2,.98,.36),smoothstep(-.3,.3,sin(py*2.)));c=mix(c,pc2,pole*dw);}}
 lum=dw;return c*(.74+.26*smoothstep(1.,8.,t))+vec3(.07,.068,.06);}
void main(){vec2 n=vUv*2.-1.;vec2 lean=U[0].xy;vec3 Cc=C+vec3(lean,0.);vec2 t0=(n/OS)*.5+.5;float iz=textureLod(Nm,t0,0.).a;vec2 nb=n+lean*F*iz;float izs=textureLod(Nm,(nb/OS)*.5+.5,0.).a;float zs=1./izs;
 vec3 d=vec3((n-VP)/F,1.);float zh=U[7].x,zt=U[7].y,blur=U[7].z,px=2./U[7].w;float dr=U[1].w;
 vec3 col=vec3(0.);float al=0.;bool tall=uK.w>.5;
 // the side, a plane along the platform edge up to the cant rail; over it the roof's shoulder, a quarter round that the eye down here sees edge-on
 if(d.x<0.){float xr=XT-Cc.x;float z=xr/d.x;float y=Cc.y+d.y*z;float zc=max(zh,.05);
  float shc=0.,th=0.;bool rf=tall||z-zh<18.;
  if(rf&&y>CR){vec2 o2=Cc.xy-vec2(XT-RS,CR);float A=dot(d.xy,d.xy),B=dot(o2,d.xy),K=dot(o2,o2)-RS*RS;float zq=(-B-sqrt(max(B*B-A*K,0.)))/A;vec2 hp=o2+d.xy*zq;
   float dl=abs(o2.x*d.y-o2.y*d.x)/sqrt(A),ew=zq/F*px*.7;shc=(1.-smoothstep(RS-ew,RS+ew,dl))*step(0.,hp.y);if(shc>0.){z=zq;y=CR+hp.y;th=atan(hp.y/max(hp.x,.001));}}
  float cocN=.012*abs(1./max(z,.3)-1./9.);float dzp=z*z/abs(xr)/F;float foot=dzp*(px+cocN*1.2);float ey=z/F*(px+cocN);
  float s=z-zh;float b=max(blur,foot);float top=rf?CR:.86+.62*step(abs(pm(s,3.3)),.07+foot);
  float inz=smoothstep(zc-foot,zc+foot,z)*(1.-smoothstep(zt-foot,zt+foot,z));float bot=tall?-.42:-.85;float iny=max(smoothstep(bot-ey,bot+ey,y)*(1.-smoothstep(top-ey,top+ey,y)),shc);
  // hidden by the platform beside it (exact, so its foot is a clean line, not the baked depth's stair steps) and near the mouth by the end wall
  float s0=-Cc.x/d.x,y0=Cc.y+d.y*s0,ep=s0/F*px+.001;float vis=smoothstep(-ep,ep,y0)*mix(1.,smoothstep(zs+.1+foot*.5,zs-.1-foot*.5,z),smoothstep(25.,28.,z));
  float a=inz*iny*vis;
  if(a>.002){vec3 h=vec3(XT,y,z);vec3 body=uK.rgb;
   float lv=min(U[11].x*12.,1.2)*U[0].w;vec3 tl=mix(vec3(1.),U[10].rgb,.75);float grad=(.26+.4*smoothstep(-.1,2.7,y))*smoothstep(-.45,.06,y)*lv;
   vec3 c=body*tl*grad;float tm=0.;
   // tubes slide along the shell in reflection, fixed in the world while the train moves through them
   if(d.y>0.){float tr=(2.7-y)/d.y;float xr2=XT-d.x*tr;float zr2=z+tr;float a2=(zr2-.7)/3.;tm=exp(-pow(abs(xr2-1.35)/.45,2.))*smoothstep(.0,.2,fract(a2))*(1.-smoothstep(.4,.7,fract(a2)));c+=mix(body,vec3(1.),.4)*U[10].rgb*tm*(tall?.18:1.1)*uK2.w*lv;}
   float seam=1.-smoothstep(.006,.012+b*.5,abs(pm(s,1.45)));c*=1.-.3*seam*(1.-smoothstep(.1,.6,b));
   if(tall){
    // a car: the lower panel to the waist, holding the lit wet platform in reflection (bright under each tube, fixed in the world),
    // the window band, the letterboard to the cant rail, the gutter; dirt in runs below the windows and up from the sill
    vec4 nz=texture(Nz,vec2(s*.23,y*.02)+.37);float nz2=texture(Nz,vec2(s*.9,y*.4)+.11).b;
    float lp=smoothstep(.06-ey,.06+ey,y)*(1.-smoothstep(.76-ey,.76+ey,y));
    if(d.y<0.){float a3=(z+y/(-d.y)-.7)/3.;float pf=smoothstep(.0,.3,fract(a3))*(1.-smoothstep(.45,.85,fract(a3)));c+=mix(body,vec3(1.),.35)*U[10].rgb*lv*lp*(.05+.16*pf)*uK2.w*smoothstep(.3,.04,y);}
    c*=1.-.12*smoothstep(1.78-ey,1.78+ey,y);
    float hs=max(max(ln(abs(y-.76),.006,ey),ln(abs(y-1.78),.006,ey)),ln(abs(y-2.005),.007,ey));c*=1.-.55*hs;
    c=mix(c,body*tl*lv*.62+.004,ln(abs(y-2.03),.012,ey));
    float rv=(1.-smoothstep(.012,.02,ey))*(1.-smoothstep(.006,.011,length(vec2(abs(fract(s/.09)-.5)*.09,min(abs(y-.775),abs(y-1.8))))));c=mix(c,c*1.7+.004,rv);
    float dirt=smoothstep(.42,.8,nz.x+.25*nz2)*(smoothstep(.78,.25,y)*.55+smoothstep(.45,.0,y)*.45);c*=(1.-.62*dirt)*(.84+.32*nz.y);
    float dw=1.-smoothstep(.05,1.2,b);
    vec3 cv=tp(s,b,dr);vec3 cc=tp(s,b,1.);
    float lumd;vec3 inner=interior(h,d,zh,dw,lumd);
    vec3 avg=mix(vec3(.24,.24,.25),vec3(1.05,1.0,.9),smoothstep(.95,1.75,y))*U[9].rgb;avg+=vec3(.5)*exp(-pow(abs(y-1.55)/.06,2.))*U[9].rgb;
    vec3 ins=mix(avg,inner*U[9].rgb,dw);
    float wy=smoothstep(.78-ey,.78+ey,y)*(1.-smoothstep(1.75-ey,1.75+ey,y));float dy=smoothstep(.0-ey,.0+ey,y)*(1.-smoothstep(1.95-ey,1.95+ey,y));
    vec3 lvc=uK3.rgb*tl*grad*(1.-.4*dirt);float stp=smoothstep(.56-ey,.56+ey,y)*(1.-smoothstep(.7-ey,.7+ey,y));c=mix(c,lvc,stp*uK3.w*(1.-cc.z));
    // two panes a bay with rounded corners in black rubber; the platform's tubes lie on the glass; at speed the strip of light stands in
    float cab=smoothstep(2.4,3.2,s)*(1.-cc.z);float uw=pm(mod(s,19.)-.8,5.8);vec2 wq=vec2(abs(abs(uw)-.84),abs(y-1.265))-vec2(.66,.385);float wsd=length(max(wq,0.))+min(max(wq.x,wq.y),0.)-.1;float bw=max(ey,b*.5)+.002;
    float pane=(1.-smoothstep(-bw,bw,wsd))*cab,gk=(1.-smoothstep(-bw,bw,wsd-.04))*cab-pane;float fast=smoothstep(.05,.45,b);pane=mix(pane,cv.x*wy,fast);gk*=1.-fast;
    c=mix(c,vec3(.01),gk*(1.-cv.y*dy));c=mix(c,ins*.78+U[10].rgb*tm*.5*lv,pane*U[1].z);
    // the doors: two leaves that slide into pockets behind the skin, each with its window; black rubber on the leading edges;
    // the pocket lines; a step plate; a handrail beside the doorway and the door lamp over its corner, lit while the doors stand open
    float uu=pm(mod(s,19.)-.8-2.9,5.8),au=abs(uu),ow=.75*dr;float leaf=(cc.y-cv.y)*dy;
    c=mix(c,lvc*(.78+.3*smoothstep(.1,.16,y))*(1.-.25*smoothstep(.35,.0,y)),leaf);
    vec2 lq=vec2(abs(au-.375-ow)-.13,abs(y-1.36)-.33);float lsd=length(max(lq,0.))+min(max(lq.x,lq.y),0.)-.06;float lwin=(1.-smoothstep(-bw,bw,lsd))*leaf*step(au,.75);
    c=mix(c,vec3(.012),(1.-smoothstep(-bw,bw,lsd-.025))*leaf*step(au,.75)-lwin);c=mix(c,ins*.7+U[10].rgb*tm*.4*lv,lwin*U[1].z);
    c=mix(c,vec3(.01),ln(abs(au-ow),.011,bw)*leaf);
    c=mix(c,ins,cv.y*dy*U[1].z);
    float dm=(1.-cc.z)*smoothstep(2.4,3.2,s)*dy;c*=1.-.7*ln(abs(au-.775),.007,bw)*dm;
    float hy=smoothstep(.88-ey,.9+ey,y)*(1.-smoothstep(1.6-ey,1.62+ey,y))*(1.-cc.z)*smoothstep(2.4,3.2,s);float hr=ln(abs(au-.93),.012,bw)*hy;c*=1.-.45*ln(abs(au-.962),.01,bw)*hy;
    c=mix(c,body*tl*lv*(.55+.6*smoothstep(-.4,1.,sin((au-.93)*130.)))+U[10].rgb*lv*.05,hr);
    float on=smoothstep(.05,.3,dr);vec2 iq=vec2(au-.86,y-1.875);float lm=(1.-smoothstep(-bw,bw,max(abs(iq.x)-.024,abs(iq.y)-.013)))*(1.-cc.z)*smoothstep(2.4,3.2,s);
    c=mix(c,mix(vec3(.03,.012,.004),vec3(2.6,1.05,.16),on),lm);c+=vec3(1.,.42,.07)*on*.035*exp(-dot(iq,iq)*900.)*(1.-cc.z);
    // the floor line: the sill turns under with a bright lip; under the car's floor only the underframe in the platform's bounce
    float spill=box(uu,1.5*dr,1.4)*(1.-cv.y*dy)*smoothstep(-.3,.2,y)*U[1].z;c+=U[9].rgb*spill*.07;
    c=mix(c,body*tl*lv*.55+.01,ln(abs(y-.045),.011,ey));c=mix(c,vec3(.36,.35,.33)*tl*lv*.9,ln(abs(y-.03),.022,ey)*cc.y);
    float und=1.-smoothstep(.015-ey,.025+ey,y);float eq=box(pm(s-9.5,19.),9.,b)*box(pm(s-5.,3.3),2.4,b)*smoothstep(-.035-ey,-.05-ey,y);
    c=mix(c,(body*tl*lv*(.022+.03*eq*(.7+.3*nz.y))+.0025)*(.75+.25*smoothstep(-.14,-.01,y)),und);
    // between the cars a dark concertina 0.4 m wide; the car ends turn away in plan, a shadow down each
    float ag=abs(pm(s,19.));c*=mix(.42,1.,smoothstep(.2,.62,ag));float gw=box(pm(s,19.),.42,b);
    c=mix(c,vec3(.006,.0055,.005)*lv*(1.+1.4*ln(abs(fract(ag/.05)-.5)*.05,.006,bw))*smoothstep(-.2,.4,y),gw);
   }else{float wg=box(pm(s-18.,13.5),.8,b);float deck=1.-smoothstep(.8,.86,y);c=body*(.05+.2*smoothstep(-.3,.9,y))*(.72+.28*sin(y*23.+sin(s*1.3)*2.))*(.75+.25*sin(s*5.1+sin(s*1.7)*2.));c+=vec3(1.,.42,.1)*U[9].w*.05*smoothstep(1.2,-.4,y);c*=1.-wg*.9;
    float stake=box(pm(s,3.3),.09,b);c=mix(c,body*.1,stake*(1.-deck));if(s<18.){float wy=smoothstep(1.45,1.49,y)*(1.-smoothstep(1.9,1.94,y))*box(pm(s,18.)-3.,1.1,b);c=mix(c,vec3(.8,.75,.55),wy);}
    a*=s<18.?1.:(1.-wg*smoothstep(.0,.2,y));}
   // the roof's shoulder over the cant rail: dull, grimy, a little of the tubes' light on its upper curve
   float shm=smoothstep(CR-ey,CR+ey,y);if(shm>.001){float rn=texture(Nz,vec2(s*.11,th*.7)+.53).g;
    vec3 rc=body*tl*lv*(.045+.04*rn)*(1.-.4*smoothstep(.05,.3,th))+body*U[10].rgb*lv*.04*smoothstep(.06,.28,th);rc=mix(rc,vec3(.012,.01,.008)*lv,.45*smoothstep(.3,.7,rn));
    c=mix(c,rc,shm);}
   col=c;al=a;}}
 // the front: a dark mass with a faint lit screen, seen head on
 if(zh>.5){vec3 q=Cc+d*zh;float cx=bend(zh)+MX+.01;vec2 f=vec2(q.x-cx,q.y-.98);float ex=zh/F*px+.012;vec2 ee=vec2(abs(f.x)-1.5+RS,f.y-CR-RS+.98+RS);float sdf=length(max(ee,0.))+min(max(ee.x,ee.y),0.)-RS;float a=(1.-smoothstep(-ex,ex,sdf))*smoothstep(-1.74-ex,-1.74+ex,f.y)*smoothstep(zs+.1,zs-.1,zh);
  if(a>.002){float lf=smoothstep(33.,25.,zh)*min(U[11].x*12.,1.2);vec3 tl2=mix(vec3(1.),U[10].rgb,.75);vec3 c=uK.rgb*tl2*(.008+lf*(.05+.2*smoothstep(-.8,1.8,f.y)));float pn=smoothstep(-.12,-.16,f.y)*smoothstep(-1.02,-.98,f.y);c=mix(c,uK3.rgb*tl2*(.012+lf*.22),pn);c*=(.25+.75*smoothstep(-1.12,-1.04,f.y))*(.6+.4*smoothstep(1.75,.6,abs(f.x)))*(.75+.25*smoothstep(1.85,.9,f.y));c*=1.-.55*(1.-smoothstep(.006,.014+ex,abs(f.x)))*step(-1.,f.y)*step(f.y,0.);// a wide windscreen with the dim cab behind it (the desk and its instrument glow, the cab door's window onto the lit car), a wiper;
   // a lit destination blind; the coupler; the headlamp lenses (their glare is the flare pass)
   vec2 wq2=vec2(abs(f.x),abs(f.y-.48))-vec2(1.2,.3);float wsd=length(max(wq2,0.))+min(max(wq2.x,wq2.y),0.)-.12;float ws=1.-smoothstep(-ex,ex,wsd);
   vec3 cab=vec3(.004,.0045,.005)+U[9].rgb*.01*smoothstep(.1,.9,f.y);cab=mix(cab,vec3(.002),1.-smoothstep(.2-ex,.24+ex,f.y));cab+=vec3(.5,.3,.06)*.07*(1.-smoothstep(.0,.025+ex,abs(f.y-.22)))*step(abs(f.x),1.1);
   vec2 dq=abs(f-vec2(-.15,.55))-vec2(.2,.3);cab=mix(cab,U[9].rgb*.03*(.6+.4*smoothstep(.25,.85,f.y)),(1.-smoothstep(-ex,ex,max(dq.x,dq.y)))*U[1].z);
   cab=mix(cab,vec3(0.),(1.-smoothstep(.008,.016+ex,abs((f.x-.55)*.5-(f.y-.08)*.86)))*step(.06,f.y)*step(f.y,.62)*step(f.x,1.05));
   c*=.8+.32*texture(Nz,f*vec2(.31,.07)+.6).r;c=mix(c,cab+U[10].rgb*lf*(.02+.05*smoothstep(.55,.85,f.y)*smoothstep(.2,1.,abs(f.x))),ws);c=mix(c,uK.rgb*tl2*.03,(1.-smoothstep(.02,.03+ex,abs(f.x)))*ws);
   vec2 bq=abs(f-vec2(0.,1.04))-vec2(.6,.085);float txt=step(.5,fract(f.x*4.3+.2))*step(.3,fract(f.x*11.))*(1.-smoothstep(.03,.05,abs(f.y-1.04)))*step(abs(f.x),.48);c=mix(c,vec3(1.,.82,.45)*(1.1-txt*.95),1.-smoothstep(-ex,ex,max(bq.x,bq.y)));
   vec2 kq=abs(f-vec2(0.,-1.4))-vec2(.22,.11);c=mix(c,vec3(.02)+uK.rgb*tl2*lf*.12*smoothstep(-1.5,-1.29,f.y),1.-smoothstep(-ex,ex,max(kq.x,kq.y)));
   vec2 hq=vec2(abs(f.x)-1.02,f.y+.66);float hl=length(hq),hb2=length(max(abs(hq)-vec2(.12,.07),0.))-.05;c=mix(c,vec3(.012),1.-smoothstep(-ex,ex,hb2));c=mix(c,vec3(.05,.05,.048)*(.4+.6*smoothstep(.1,.02,hl)),1.-smoothstep(.085,.095+ex,hl));c+=U[6].rgb*min(U[2].w*.03,4.)*pow(1.-smoothstep(.0,.08+ex,hl),1.5);
col=mix(col,c,a);al=max(al,a);}}
 if(al<.002)discard;
 col*=1.-.12*dot(n*.92,n*.92);
 o=vec4(tone(col)*al,al);}`,qa=yt+`layout(location=0) in vec4 aP;layout(location=1) in vec4 aV;layout(location=2) in float aK;
uniform vec4 U[12];out vec2 vQ;out vec3 vC;out float vKind;out float vA;
${Ye}
void main(){vec2 co=vec2(float(gl_VertexID&1),float((gl_VertexID>>1)&1))*2.-1.;vec3 p=aP.xyz;vec3 Cc=C+vec3(U[0].xy,0.);float zz=max(p.z,.5);vec2 sc=VP+(p.xy-Cc.xy)/zz*F;float kind=floor(aK+.001);float rot=aV.w;
 float ppm=F/zz;float r=aP.w*ppm;float cc=.012*abs(1./zz-1./9.);float R=max(sqrt(r*r+cc*cc),2.2/U[7].w*2.);float cover=min(r*r/(R*R),1.);
 vec2 sc2=VP+(p.xy+aV.xy*.05-Cc.xy)/max(zz+aV.z*.05,.5)*F;vec2 ax=sc2-sc;float al=min(length(ax),.09);vec2 dirv=length(ax)>1e-4?ax/length(ax):vec2(1.,0.);vec2 per=vec2(-dirv.y,dirv.x);vec2 off;
 if(kind==1.||kind==5.){float cs=cos(rot),sn=sin(rot);vec2 q=vec2(co.x*1.+0.,co.y*.62);float tilt=kind==5.?.25:abs(cos(rot*1.7))*.8+.2;q.y*=tilt;off=vec2(q.x*cs-q.y*sn,q.x*sn+q.y*cs)*R;float flat2=p.y<.02||kind==5.?clamp(C.y/zz*1.6,.06,.5):1.;off.y*=flat2;}
 else if(kind==3.){off=co*vec2(1.,C.y/zz*1.1)*r;}
 else{off=dirv*co.x*(R+al*.5)+per*co.y*R;sc+=dirv*al*.5;}
 vQ=co;vKind=kind;if(kind>5.5){vC=vec3(0.);vA=0.;gl_Position=vec4(3.,3.,0.,1.);return;}
 // light: ambient, flicker, headlamps (with forward scatter), window strobe
 float E=U[11].x*(U[0].w+U[1].x*.6);vec3 lc=U[6].rgb;vec3 C3=U[10].rgb;
 vec3 lp=(U[2].xyz+U[3].xyz)*.5;vec3 to=lp-p;float d2=dot(to,to);float ap=1.;if(p.z<END&&lp.z>END){float s=(END-p.z)/(lp.z-p.z);ap=smoothstep(.14,-.14,sdMouth(p.xy+to.xy*s));}
 float cone=smoothstep(U[5].w,U[5].w+.28,dot(-to/sqrt(d2),U[5].xyz));vec3 col=C3*E+lc*(U[2].w+U[3].w)*cone*ap/(d2+1.)*.18;
 if(U[1].z>.001&&p.x>XT){float dx=p.x-XT;vec3 cv=tp(p.z-U[7].x,max(U[7].z,.3+dx*.6),U[1].w);float ext=step(U[7].x,p.z)*step(p.z,U[7].y);col+=U[9].rgb*(cv.x*.6+cv.y)*ext*U[1].z*.7/(1.+dx*dx*.4);}
 vA=aP.w<.0?0.:1.;
 if(kind==0.){vC=col*(.6+.6*fract(aK*7.3))*1.2;vA=cover*.85*smoothstep(24.,9.,zz);}
 else if(kind==1.){vC=col*vec3(.42,.40,.34);vA=1.;if(fract(aK)>.5){vC=col*vec3(.30,.14,.035);}}
 else if(kind==2.){vC=col*1.5+vec3(.2);vA=.6;}
 else if(kind==3.){vC=col*.9+vec3(.02);vA=fract(aK)*.8;}
 else if(kind==4.){vC=vec3(2.6,.72,.1);vA=fract(aK);}
 else{vC=vec3(0.);vA=.45;}
 gl_Position=vec4(sc+off,0.,1.);}`,Ra=yt+`in vec2 vQ;in vec3 vC;in float vKind;in float vA;out vec4 o;uniform vec4 U[12];${Ze}
void main(){float r=length(vQ);float a,fold=1.;float kd=floor(vKind+.5);if(kd==1.){float e=max(abs(vQ.x+.15*vQ.y),abs(vQ.y));a=1.-smoothstep(.76,.96,e);fold=.72+.5*step(0.,vQ.x+vQ.y*.6);}else if(kd==3.){a=smoothstep(.14,.0,abs(r-.82))*.5;}else if(kd==5.){a=(1.-smoothstep(.2,1.,r));}else{a=exp(-r*r*2.6)*(1.-smoothstep(.8,1.,r));}
 a*=vA;if(a<.002)discard;o=kd==5.?vec4(0.,0.,0.,a):vec4(tone(vC*fold)*a,a*(kd==0.||kd==4.||kd==3.?.0:1.));}`,Ua=yt+`in vec2 vUv;out vec4 o;uniform vec4 U[12];
void main(){vec2 n=vUv*2.-1.;vec3 Cc=C+vec3(U[0].xy,0.);vec3 c=vec3(0.);
 for(int i=0;i<2;i++){vec3 lp=U[2+i].xyz;float lz=max(lp.z,.6);vec2 s=VP+(lp.xy-Cc.xy)/lz*F;vec2 v=n-s;float r2=dot(v,v);float rad=.13*F/lz+.006;float rr=rad*rad;
  float core=1./(1.+r2/(rr*.16));core*=core;c+=vec3(1.,.96,.86)*(core*3.+.3/(1.+r2/(rr*2.2))+.02/(1.+r2*5.));}
 o=vec4(c*U[11].y*U[6].rgb,0.);}`,Na=yt+"in vec2 vUv;out vec4 o;void main(){vec2 n=vUv*2.-1.;float y=n.y;float tube=smoothstep(.02,.0,abs(n.x-VP.x-(y-VP.y)*.25))*step(VP.y+.2,y);float fl=smoothstep(VP.y,-1.,y);vec3 c=vec3(.06,.05,.04)+vec3(.5,.46,.36)*tube+vec3(.14,.11,.08)*fl*(1.-smoothstep(.0,.02,abs(n.x-VP.x+(VP.y-y)*.5)-.0));float mouth=step(length((n-vec2(-.23,.3))*vec2(1.,1.1)),.3);o=vec4(mix(c,vec3(.005),mouth),1.);}",He=`uniform vec4 uV;
float hitBox(vec3 o,vec3 d,out float id){float t=2000.;id=10.;
#ifdef RM
 if(d.z>0.){float s=(END-o.z)/d.z;vec3 q=o+d*s;if(q.y<max(1.05,q.x>1.5?3.42-.38*(ceil((q.x-1.5)/.27)-1.):3.85)+.045+.018*sin(q.x*23.)*sin(q.x*7.3)&&q.x>-4.6){t=s;id=6.;}}
 if(d.x>0.){float s=(XB-o.x)/d.x;vec3 q=o+d*s;if(s<t&&q.y<1.05){t=s;id=4.;}}
 if(d.x<0.){float s=(-4.4-o.x)/d.x;vec3 q=o+d*s;if(s<t&&q.y<-.12&&q.y>PIT-.4){t=s;id=3.;}}
#endif
 if(d.y<0.){float s=-o.y/d.y;vec3 q=o+d*s;if(s>.001&&s<t&&q.x>=0.&&q.z<END){t=s;id=0.;}
  else{s=(PIT-o.y)/d.y;q=o+d*s;
#ifdef RM
   if(s<t&&q.x<0.&&q.x>-4.4){t=s;id=2.;}
#else
   if(s<t&&(q.x<0.||q.z>END)){t=s;id=2.;}
#endif
 }}
#ifdef RW
 if(id==2.&&t>TD){t=2000.;id=10.;}
#endif
 return t;}
`,Ho=`uniform vec4 uSky0,uSky1,uSkyM,uFog,uWl;uniform vec4 uLq[3];uniform sampler2D Wd;const vec4 WA=vec4(-.216,.146,-.024,.157);
float hh(float x){return fract(sin(x*91.7+.3)*43758.55);}
float vn(float x){float i=floor(x),f=x-i;f=f*f*(3.-2.*f);return mix(hh(i),hh(i+1.),f);}
float fb(float x){return vn(x)*.5+vn(x*2.13+3.1)*.26+vn(x*4.37+7.7)*.14+vn(x*9.1+1.3)*.08;}
vec3 skyC(vec3 d){float e=d.y/length(d);return mix(uSky0.rgb,uSky1.rgb,smoothstep(-.01,.16,e));}
// the wood (n14): one lookup in the strip painted at make. The wood's dark is a blue-black, paled toward the sky by distance
// in steps; snow on the boughs about half the open snow's value; the lamps warm whatever stands near them
vec3 wood(vec3 c,float a,float e){vec4 w=texture(Wd,vec2((a-WA.x)/(WA.y-WA.x),(WA.w-e)/(WA.w-WA.z)));float k=w.r;if(k<.003)return c;
 float sn=w.g/k,dp=w.b/k;vec3 tc=mix(vec3(.0011,.0016,.0027),uSky0.rgb,.03+.2*dp+.28*dp*dp);
 tc=mix(tc,uSky0.rgb*1.3*sn,min(sn*2.,1.));float D=mix(96.,215.,dp);vec3 P=vec3(C.x+a*D,C.y+e*D,D),wl=vec3(0.);
 for(int i=0;i<3;i++){float lw=uLq[i].w;if(lw>0.){vec3 v=LPH[i]-P;wl+=lw*vec3(1.)/(dot(v,v)*.0004+1.);}}
 tc+=uWl.rgb*wl*(.0004+.006*sn);return mix(c,mix(tc,uSky0.rgb,.25*dp*sn),k);}
vec3 backdrop(vec3 d){float a=d.x/d.z,e=d.y/d.z;vec3 c=skyC(d);
 if(uSky0.w>.5){vec2 g=vec2(a,e)/.00075;vec2 gi=floor(g);float h=hh(gi.x*1.37+gi.y*311.7);vec2 gf=g-gi-.5-(vec2(hh(gi.x+gi.y*7.1),hh(gi.y-gi.x*3.3))-.5)*.6;
  float st=step(.986,h)*pow(hh(h*91.),3.)*exp(-dot(gf,gf)*5.);c+=vec3(.95,.95,1.)*st*.5*smoothstep(.0,.05,e);
  vec2 mq=vec2(a,e)-uSkyM.xy;float mr=length(mq);if(uSkyM.w>.5){float md=smoothstep(.0046,.0042,mr);float mar=.78+.22*vn(mq.x*900.+mq.y*1300.)*vn(mq.y*700.+3.);c=mix(c,vec3(1.,.97,.9)*1.3*mar,md);c+=vec3(.55,.6,.75)*.012/(1.+mr*mr*4e4)+vec3(.3,.34,.45)*.03*exp(-mr*60.);}}
#ifdef RW
 c=wood(c,a,e);
#endif
#ifdef RM
 vec3 q=C+d*(END/d.z);
 if(q.x>-4.6){float er=.1+.035*fb(a*9.+2.)+.008*vn(a*70.);if(e<er){float rk=smoothstep(.5,.78,vn(a*120.+e*30.)*.55+vn(a*31.+e*9.)*.45);c=mix(uSky0.rgb*1.25,vec3(.006,.006,.007),rk*.8)*(.8+.2*smoothstep(er-.05,er,e));}
  c=wood(c,a,e);}
 else{float em=.016+.05*fb(a*5.+5.);if(e<em&&e>-.004){c=mix(vec3(.004,.005,.008),uSky0.rgb,.35+.3*smoothstep(em-.01,em,e));}
  if(e<-.004){c=vec3(.0025,.003,.004);vec2 g=vec2(a/.0012,e/.0009);vec2 gi=floor(g);float h=hh(gi.x*7.7+gi.y*131.1);float cl=smoothstep(.45,.8,vn(a*55.+3.))*smoothstep(-.02,-.006,e);
   vec2 gf=g-gi-.5;float lt=step(1.-.09*cl,h)*exp(-dot(gf,gf)*6.);c+=mix(vec3(1.,.6,.25),vec3(.8,.9,1.),step(.8,hh(h*13.)))*lt*(.35+.6*hh(h*7.));}
  c+=uSky0.rgb*1.4*exp(-pow((e+.004)/.004,2.));}
#endif
 return c;}
`,Da=o=>`#define OPEN
#define ${o===2?"RW":"RM"}
const float TD=125.,LPX=${o===2?"2.3":"3.25"};const vec3 LPH[3]=vec3[3](${o===2?"vec3(1.95,3.3,8.5),vec3(1.95,3.3,23.5),vec3(0.,0.,-100.)":"vec3(2.9,3.3,5.5),vec3(2.9,3.3,15.5),vec3(2.9,3.3,25.5)"});
`,Ot=(o,t)=>{for(const[M,D]of t){if(!o.includes(M))throw new Error("186open_"+M.slice(0,40).replace(/[^a-z0-9]/gi,"_"));o=o.split(M).join(D)}return o},$e=(o,t,M,D)=>{const P=o.indexOf(t),l=o.indexOf(M,P);if(P<0||l<0)throw new Error("186 cut: "+t.slice(0,40));return o.slice(0,P)+D+o.slice(l)},Aa=` #ifdef RM
 { // dressed stone in courses, blocks of uneven length, chamfered joints, a cornice with snow lying on it
  float Th=.38;float row=floor(p.y/Th);vec4 rr=texelFetch(N,ivec2(mod(vec2(row,7.),256.)),0);float bl=.72+.5*rr.x;float qx=p.x/bl+rr.y*3.;vec2 bi=vec2(floor(qx),row);vec4 r=texelFetch(N,ivec2(mod(bi+vec2(40.,9.),256.)),0);
  vec2 f=vec2(fract(qx)-.5,fract(p.y/Th)-.5);float jd=min((.5-abs(f.x))*bl,(.5-abs(f.y))*Th);float gr=line(jd,.007,FX);
  vec3 st=mix(vec3(.15,.14,.125),vec3(.27,.255,.225),r.r*.6+mid*.4)*(.84+.28*hi);st=mix(st,vec3(.11,.105,.1),smoothstep(.65,.9,r.g)*.6);
  a=mix(st,vec3(.035,.033,.03),gr);h=-gr*.008+smoothstep(.0,.05,jd)*.004+(r.b-.5)*.004*f.x+(hi-.5)*.002;gl=.1;
  float cor=smoothstep(3.49,3.52,p.y)*(1.-smoothstep(3.67,3.7,p.y));a=mix(a,vec3(.21,.2,.18)*(.8+.4*mid),cor);h+=cor*.02;
  float tp=max(1.05,p.x>1.5?3.42-.38*(ceil((p.x-1.5)/.27)-1.):3.85);float stp=WID==6.&&p.x>1.5?1.:0.;
   float cs=stp*smoothstep(tp-.2,tp-.18,p.y)*(1.-smoothstep(tp-.02,tp,p.y));a=mix(a,vec3(.21,.2,.18)*(.8+.4*mid),cs);h+=cs*.02;
   float sn=smoothstep(3.7,3.74,p.y)+(WID==3.?smoothstep(-.24,-.2,p.y):0.)+stp*smoothstep(tp-.01,tp+.01,p.y);sn=min(sn,1.);a=mix(a,vec3(.64,.67,.72)*(.9+.1*mid),sn);gl=mix(gl,.05,sn);h+=sn*(mid-.5)*.01;
 }
#endif
`.replace(/^ #ifdef/,"#ifdef"),Sa=` return h;}
#endif
#ifdef PORT`,La={geo:1,mf:1,mp:1,mw:1,mt:1,mq:1,mx:1,amb:1,ref:1,scene:1,spr:1};function Qe(o,t,M){const D=Da(M),P=M===2;return t=t.replace(`precision highp int;
`,`precision highp int;
`+D),o==="geo"?t=Ot(t,[[oe,He],[" if(d.y>0.){float s=(2.7-C.y)/d.y;",` for(int k=0;k<3;k++){float s=LPH[k].z;vec3 q=C+d*s;if(s>0.&&s<t&&abs(q.x-LPX)<.045&&q.y>0.&&q.y<3.45){t=s;id=11.;}}
 {float s=28.95;vec3 q=C+d*s;if(s<t&&abs(q.x-.22)<.035&&q.y>-.1&&q.y<1.45){t=s;id=11.;}}
${P?" for(int k=0;k<4;k++){float s=34.+31.*float(k)+4.*float(k*k);vec3 q=C+d*s;float px=bend(s)-5.2;if(s<t&&q.y>PIT&&((abs(q.x-px)<.085+.035*(1.-(q.y-PIT)/7.3)&&q.y<PIT+7.3)||(abs(q.y-PIT-6.9)<.06&&abs(q.x-px)<.75))){t=s;id=11.;}}":""}
 if(false){float s=(2.7-C.y)/d.y;`]]):o==="amb"?t=Ot(t,[[`uniform int uNk;
`,`uniform int uNk;
`+Ho],[" if(id==6.&&P.x>1.5&&P.x<3.1&&P.y<2.25){"," if(false){"],[" if(id==6.){vec2 q=vec2(P.x-2.3,P.y-2.47);"," if(false){vec2 q=vec2(P.x-2.3,P.y-2.47);"],[" o=vec4(c,fl);}",` float sw=smoothstep(.12,.3,min(al.r,min(al.g,al.b)));c+=al*uSky0.rgb*1.8*max(Nn.y+.7*Nn.z,0.)*sw;
 // snow under a lamp: light scattered inside it makes the pool's centre pale cream, the hue turning through peach to the sky's blue
 if(sw>0.)for(int k=0;k<3;k++){float lw=uLq[k].w;if(lw>0.){vec3 v=LPH[k]-P;float dv=dot(v,v);c+=al*uTub.rgb*lw*sw*6.*max(dot(Nn,v)*inversesqrt(dv),0.)/(dv+.2);}}   // the open sky's fill: snow under a clear sky is the lightest ground there is
 if(id==10.)c=backdrop(d);else if(id==11.){
  // which post: a lamp post, the signal's, or a line pole (round timber, tapering, its cross-arm near the top)
  float px=LPX,hw=.045,top=3.45;if(abs(P.z-28.95)<.1){px=.22;hw=.035;top=1.45;}else if(P.z>30.){px=bend(P.z)-5.2;hw=.085+.035*(1.-(P.y-PIT)/7.3);top=PIT+7.3;}
  float u=clamp((P.x-px)/hw,-1.,1.);bool arm=abs(u)>.999||(P.z>30.&&abs(P.y-PIT-6.9)<.06);vec3 nr=arm?vec3(0.,.25,-.97):vec3(u,0.,-sqrt(1.-u*u));
  vec3 cc=vec3(.05,.045,.04)*(.8+.3*vn(P.y*7.+P.z));vec3 lt=uSky0.rgb*(.35+.4*max(-nr.z,0.))*mix(.7,1.2,.5-.5*u);
  for(int k=0;k<3;k++){float lw=uLq[k].w;if(lw>0.){vec3 v=LPH[k]-P;float dv=dot(v,v);lt+=uTub.rgb*lw*7.5*max(dot(nr,v)*inversesqrt(dv),0.)/(dv+.2);}}
  c=cc*cc*lt*9.;
  float sn=smoothstep(top-.07,top-.04,P.y)+(arm?smoothstep(PIT+6.92,PIT+6.94,P.y):0.)+smoothstep(.45,.75,u)*smoothstep(.45,.6,vn(P.y*2.3+P.z*1.7))*.8;
  c=mix(c,(uSky0.rgb*1.1+lt*.25)*.45,min(sn,1.));}
 else if(${P?"true":"P.z<END"}){c=mix(c,uSky0.rgb,(1.-exp(-g.x*uFog.x))*uFog.y);}
 for(int k=0;k<3;k++){float lw=uLq[k].w;if(lw!=0.){vec3 Lh=LPH[k];vec2 s=VP+(Lh.xy-C.xy)/Lh.z*F;vec2 m=(n-s)*Lh.z/F;float r=length(m);float cw=max(abs(m.x)-mix(.12,.045,clamp(m.y/.11,0.,1.)),abs(m.y-.045)-.055);float yb=.1+.07*smoothstep(.0,.33,m.x);
  float hd=min(cw,max(abs(m.y-yb)-.014,max(-m.x,m.x-(LPX-Lh.x))));float hm=1.-smoothstep(-.004,.004,hd);
  c=mix(c,mix(uSky0.rgb*.12,uSky0.rgb*.5,smoothstep(.08,.1,m.y)*step(cw,0.)),hm);float e=7.*(1.-smoothstep(.03,.055,r))+.45*exp(-r*r/.025)+.035*exp(-r*2.2);e*=1.-hm*smoothstep(-.01,.02,m.y);if(lw<0.)fl+=-lw*e;else c+=uTub.rgb*lw*e;}}
 o=vec4(c,fl);}`]].concat(P?[["ao*=exp(-max(P.z-END,0.)*.45);",""]]:[])):o==="ref"?(t=Ot(t,[[oe,He+Ho],["if(id==5.)c=uWall.rgb*.55;","if(id==5.)c=uWall.rgb*.55;if(id==10.)c=skyC(R)*1.2;"]]),t=$e(t,"float pt=smoothstep(.03,-.03,max(max(1.5-p.x",`}
 float fl=0.;`,""),t=$e(t," if(R.y>0.){float s=(2.7-o2.y)/R.y;"," float w=Fr*gl*gl;",` for(int k=0;k<3;k++){float lw=uLq[k].w;if(lw!=0.){vec3 v=LPH[k]-o2;float tb=dot(v,R);if(tb>0.){vec3 hv=v-R*tb;float sd=rough*tb*.5+.04;float m=exp(-dot(hv,hv)/(sd*sd))*.05/(sd*sd);if(lw<0.)fl+=-lw*m;else c+=uTub.rgb*lw*m;}}}
`)):o==="scene"?t=Ot(t,[["float ap=1.;if(P.z<END&&lp.z>END)","float ap=1.;if(P.z<-1e9)"],["vec3 H=normalize(L+V);float sp=pow(max(dot(Nn,H),0.),","vec3 H=normalize(L+V);float sp=pow(max(dot(normalize(Nn*vec3(.3,1.,.3)),H),0.),"],["if(Nn.y>.5&&P.y>-.1){vec3 R=reflect(-V,Nn);float t=(sg.z-P.z)/R.z;","if(Nn.y>.5&&P.y>-.1){vec3 R=reflect(-V,normalize(Nn*vec3(.1,1.,.1)));float t=(sg.z-P.z)/R.z;"],["col+=U[8].rgb*Fr*gl*gl*2.6*exp(-dd*(26./(.08+(1.-gl)*(1.-gl)*7.)));","col+=U[8].rgb*Fr*gl*gl*1.5*exp(-dd*(8./(.08+(1.-gl)*(1.-gl)*7.)));"],[" if(U[4].w>.01){float gl0=U[4].w;"," if(U[4].w>1e9){float gl0=U[4].w;"]]):o==="spr"?t=Ot(t,[["uniform vec4 U[12];out vec2 vQ;","uniform vec4 U[12],uLq[3];out vec2 vQ;"],["if(kind>5.5){","if(kind>5.5&&kind<6.5){"],["vec3 col=C3*E+","vec3 col=C3*E*.3;for(int k=0;k<3;k++){float lw=uLq[k].w;if(lw!=0.){vec3 tl=LPH[k]-p;float dl=dot(tl,tl);col+=C3*abs(lw)*(lw<0.?U[1].x:1.)*1.3/(dl+.5)*smoothstep(-.1,.7,tl.y/sqrt(dl));}}col+="],["else{vC=vec3(0.);vA=.45;}","else if(kind==7.){vC=col*(.7+.5*fract(aK*7.3));vA=cover*smoothstep(32.,18.,zz);}else{vC=vec3(0.);vA=.45;}"]].concat(P?[["if(p.z<END&&lp.z>END)","if(p.z<-1e9)"]]:[])):o==="sprf"?t=Ot(t,[["kd==0.||kd==4.||kd==3.","kd==0.||kd==4.||kd==3.||kd==7."]]):(o==="mw"||o==="mq"||o==="mx"||o==="mt"||o==="mr")&&(t=t.split(oe).join(He),t.includes(" // long stains, damp and soot")&&(t=Ot(t,[[" // long stains, damp and soot",Aa+" // long stains, damp and soot"]]),t=$e(t," // cable runs",Sa,"")),t.includes("vec3 bc=vec3(.2,.075,.04)")&&(t=Ot(t,[["vec3 bc=vec3(.2,.075,.04)","vec3 bc=vec3(.2,.19,.17)"],["S==1?vec3(.2,.2,.19):vec3(.24,.1,.055)","S==1?vec3(.2,.2,.19):vec3(.22,.21,.19)"]])),t=t.split("(sdMouth(P.xy)<PW+FX||(P.x>1.51&&P.x<3.09&&P.y<2.24))").join("sdMouth(P.xy)<PW+FX")),t}const wt=[-.216,.146,-.024,.157];function Ca(o,t,M){const D=t>>1,P=t/(wt[1]-wt[0]),l=typeof OffscreenCanvas<"u"?new OffscreenCanvas(t,D):Object.assign(document.createElement("canvas"),{width:t,height:D}),i=l.getContext("2d");i.fillStyle="#000",i.fillRect(0,0,t,D);const Y=g=>(g-wt[0])*P,A=g=>(wt[3]-g)*P,N=P/5657,H=t>=2048,f=(g,c)=>g+(c-g)*o(),xt=Array.from({length:256},()=>o()),x=(g,c)=>{const y=Math.floor(g),E=g-y,S=E*E*(3-2*E),L=xt[y+c&255],q=xt[y+1+c&255];return L+(q-L)*S},z=(g,c)=>x(g,c)*.55+x(g*2.3,c+71)*.28+x(g*5.3,c+143)*.17,W=(g,c)=>{i.fillStyle="rgb(255,"+Math.round(g*255)+","+Math.round(c*255)+")"},nt=g=>{i.moveTo(g[0][0],g[0][1]);for(let c=1;c<g.length;c++)i.lineTo(g[c][0],g[c][1]);i.closePath()},$=(g,c,y,E,S,L)=>{const q=y*f(.14,.19),it=y*f(-.02,.02)*(o()<.12?2.5:1),ut=Math.max(y*.012,.7*N),tt=g+it,j=c-y,Pt=(B,It)=>{let G=f(.03,.06),Ee=!0;for(;G<.97;){const mt=j+G*y,X=tt-it*G,Rt=q*Math.pow(G,.8)*(Ee?.45:f(.7,1.15))+ut,Dt=Rt*f(.22,.42)*(.8+.5*G),Ut=Rt*f(.04,.12),Wt=Math.max(Rt*f(.32,.5),1.4*N),Vt=ht=>[X+B*Rt*ht,mt+Dt*Math.pow(Math.max(ht-.1,0)/.9,1.3)];It.push(Vt(.1),Vt(.5),Vt(.85)),It.push([X+B*Rt*f(1,1.05),mt+Dt-Ut]);const Gt=2+Math.floor(o()*3);for(let ht=0;ht<Gt;ht++){const Ht=.95-(ht+.5)/Gt*.7,at=Vt(Ht),$t=Wt*f(.15,.55),pt=Rt*f(.05,.1),U=at[0]+B*f(-.3,.3)*pt,n=at[1]+Wt*.45+$t,qe=at[1]+Wt*f(.45,.7);(H||!(ht&1))&&It.push([at[0]+B*pt,at[1]+Wt*.45],[U,n],[at[0]-B*pt,qe])}if(It.push([X+B*Rt*.15,mt+Dt*.05+Wt*1.1]),S&&G>.08&&G<L&&o()<E){const ht=f(.3,.55),Ht=f(.8,.98),at=Wt*f(.25,.5),$t=[];for(let pt=0;pt<=3;pt++){const U=Vt(ht+(Ht-ht)*pt/3);$t.push([U[0],U[1]-at*(pt===0||pt===3?.1:f(.4,1))*(.5+.5*pt/3)])}for(let pt=3;pt>=0;pt-=3){const U=Vt(ht+(Ht-ht)*pt/3);$t.push([U[0],U[1]+at*.3])}S.push($t)}Ee=!1,G+=f(.028,.055)*(G<.25?.75:1)}It.push([tt-it+B*ut,c+3*N])},kt=[],V=[[tt,j-y*.03]];Pt(1,V),Pt(-1,kt),i.moveTo(g-ut,c+3*N);for(let B=kt.length-1;B>=0;B--)i.lineTo(kt[B][0],kt[B][1]);for(const B of V)i.lineTo(B[0],B[1]);i.closePath()},zt=(g,c,y)=>{const E=y*.022,S=E*.55,L=g+y*f(-.03,.03),q=y*f(.03,.07)*(o()<.5?1:-1);i.moveTo(g-E,c),i.lineTo(L-S,c-y+q),i.lineTo(L-S*.1,c-y-y*.02),i.lineTo(L+S,c-y-q),i.lineTo(g+E,c),i.closePath();for(let it=0,ut=4+Math.floor(o()*4);it<ut;it++){const tt=f(.15,.85),j=c-y*tt,Pt=g+(L-g)*tt,kt=o()<.5?1:-1,V=y*f(.04,.12)*(1.2-tt*.6),B=S*.45;i.moveTo(Pt,j-B),i.lineTo(Pt+kt*V,j+V*f(.3,.7)),i.lineTo(Pt+kt*V*.9,j+V*f(.3,.7)+B*1.5),i.lineTo(Pt,j+B*2.5),i.closePath()}},ft=(g,c,y,E,S,L,q)=>{const it=-1.25/g,ut=c/g*P;W(0,y),i.beginPath(),i.moveTo(Y(E)-4,A(it)+6*N);for(let j=Y(E)-4;j<=Y(S)+4;j+=3*N)i.lineTo(j,A(it)-ut*(.36+.16*z(j/P*140,q)+.05*x(j/P*900,q+9)));i.lineTo(Y(S)+4,A(it)+6*N),i.closePath(),i.fill();const tt=[];i.beginPath();for(let j=E-f(0,.008);j<S+.01;){const Pt=o()<.1?f(1.25,1.4):f(.68,1.12),kt=ut*Pt;$(Y(j),A(it)+f(0,2)*N,kt,L,tt,.5),j+=kt/P*f(.12,.27)}i.fill(),W(.42,y),i.beginPath();for(const j of tt)nt(j);i.fill()};if(M===2){ft(215,f(14,18),1,wt[0],wt[1],.35,11),ft(125,f(13,16),.5,wt[0],wt[1],.5,37);const g=3+Math.floor(o()*4),c=[];i.beginPath();for(let y=0;y<g;y++){const E=f(88,112),S=wt[0]+(wt[1]-wt[0])*(y+f(.15,.85))/g;$(Y(S),A(-1.25/E),f(10.5,15)/E*P,.6,c,1)}W(0,.08),i.fill(),W(.46,.08),i.beginPath();for(const y of c)nt(y);i.fill(),W(0,.12),i.beginPath(),zt(Y(f(wt[0]+.03,wt[1]-.03)),A(-1.25/108),f(7,11)/108*P),i.fill()}else for(const[g,c,y,E,S]of[[170,.075,.9,46,14],[100,.035,.45,34,13]]){const L=[];i.beginPath();for(let q=0;q<E;q++){const it=f(-.173,wt[1]+.01);if(z(it*40,90+g)<.38&&o()<.7)continue;const tt=c+f(-.01,.03)*(g>150?1.2:.8);tt>.093||$(Y(it),A(tt),f(.65,1.15)*S/g*P,.5,L,.8)}W(0,y),i.fill(),W(.5,y),i.beginPath();for(const q of L)nt(q);i.fill()}if(M===2){const g=c=>A(-.0104+.0034*z(c/P*160,201)+.0016*z(c/P*700,233)+6e-4*x(c/P*3e3,7));i.beginPath(),i.moveTo(-4,D);for(let c=-4;c<=t+4;c+=2*N)i.lineTo(c,g(c));i.lineTo(t+4,D),i.closePath(),W(.9,.25),i.fill(),i.beginPath();for(let c=0;c<t;c+=f(10,40)*N){if(z(c/P*300,260)<.5)continue;const y=g(c),E=f(6,18)*N;i.moveTo(c-E,y+6*N),i.quadraticCurveTo(c,y+f(0,1.5)*N,c+E,y+6*N),i.closePath()}W(.7,.25),i.fill(),i.strokeStyle="rgb(255,20,60)",i.lineCap="round",i.beginPath();for(let c=0;c<t;c+=f(6,30)*N){if(z(c/P*200,300)<.45)continue;const y=g(c)+2*N,E=2+Math.floor(o()*4);for(let S=0;S<E;S++){const L=f(4,16)*N,q=f(-.5,.5);i.moveTo(c+S*f(1,3)*N,y),i.quadraticCurveTo(c+S*2*N+q*L*.3,y-L*.6,c+S*2*N+q*L,y-L)}}i.lineWidth=1.1*N,i.stroke()}return l}const Je=new WeakMap;function _a(o){if(Je.has(o))return Je.get(o);const t=256,M=new Uint8Array(t*t*4),D=new Float32Array(t*t),P=new Float32Array(16384);let l=186186;const i=()=>{l=l+1831565813|0;let A=Math.imul(l^l>>>15,1|l);return A=A+Math.imul(A^A>>>7,61|A)^A,((A^A>>>14)>>>0)/4294967296};for(let A=0;A<2;A++){D.fill(0);let N=1,H=0;for(let f=A===1?8:4;f<=128;f*=2){const xt=t/f;for(let z=0;z<f*f;z++)P[z]=i();const x=f;for(let z=0;z<t;z++){const W=z/xt,nt=W|0,$=W-nt,zt=$*$*(3-2*$),ft=nt*x,g=(nt+1)%f*x;for(let c=0;c<t;c++){const y=c/xt,E=y|0,S=y-E,L=S*S*(3-2*S),q=E,it=(E+1)%f,ut=P[ft+q],tt=P[ft+it],j=P[g+q],Pt=P[g+it];D[z*t+c]+=N*(ut+(tt-ut)*L+(j-ut)*zt+(ut-tt-j+Pt)*L*zt)}}H+=N,N*=.58}for(let f=0;f<t;f++)for(let xt=0;xt<t;xt++){const x=Math.min(255,Math.max(0,((D[f*t+xt]/H-.5)*2.2+.5)*255)),z=(f*t+xt)*4,W=((f+97&255)*t+(xt+41&255))*4;A===0?(M[z]=x,M[W+1]=x):(M[W+2]=x,M[z+3]=x)}}const Y=o.createTexture();return o.bindTexture(o.TEXTURE_2D,Y),o.texImage2D(o.TEXTURE_2D,0,o.RGBA8,t,t,0,o.RGBA,o.UNSIGNED_BYTE,M),o.generateMipmap(o.TEXTURE_2D),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),Je.set(o,Y),Y}const $o=new WeakMap;function Xa(o,t,M){let D=$o.get(o);if(!D){const x=o.getExtension("WEBGL_debug_renderer_info");D={all:{},d3d:/Direct3D|D3D1/i.test(String(o.getParameter(x?x.UNMASKED_RENDERER_WEBGL:o.RENDERER)))},$o.set(o,D)}const P=D.d3d,l=(x,z,W)=>{const nt=x.replace(/[0-9]+$/,"");if(M&&La[nt]&&(nt!=="scene"||M===2)&&(nt==="spr"?(z=Qe("spr",z,M),W=Qe("sprf",W,M)):W=Qe(nt,W,M),x+="r"+M),D.all[x])return null;const $=o.createProgram(),zt=o.createShader(o.VERTEX_SHADER),ft=o.createShader(o.FRAGMENT_SHADER);return o.shaderSource(zt,z),o.shaderSource(ft,W),o.compileShader(zt),o.compileShader(ft),o.attachShader($,zt),o.attachShader($,ft),D.all[x]=$,$._s=[zt,ft,x],$};[l("geo",Z,va),l("mf"+t,Z,xa(t)),l("mp"+t,Z,ga(t)),...M===2?[]:M?P?[l("mw"+t,Z,je(t)),l("mt",Z,jo()),l("mq"+t,Z,Zo(t))]:[l("mw"+t,Z,je(t)),l("mx"+t,Z,Yo(t))]:[l("mw"+t,Z,je(t)),...P?[l("mr"+t,Z,ya(t)),l("mt",Z,jo()),l("mq"+t,Z,Zo(t))]:[l("mx"+t,Z,Yo(t))]],l("amb",Z,wa),l("tube",Z,za),l("ref",Z,Ta),l("blur",Z,Pa),l("dof",Z,Fa),l("blit",Z,Ma),l("scene",Z,ka),l("spr",qa,Ra)].filter(Boolean).forEach(x=>o.linkProgram(x)),o.flush();const Y=()=>{const x=[l("train",Z,Ea),l("flare",Z,Ua)].filter(Boolean);x.forEach(z=>o.linkProgram(z)),x.length&&o.flush()},A=x=>{if(x._s){if(!o.getProgramParameter(x,o.LINK_STATUS)){const[z,W,nt]=x._s;throw new Error("186 "+nt+": "+(o.getProgramInfoLog(x)||"")+(o.getShaderInfoLog(z)||"").slice(0,400)+" | "+(o.getShaderInfoLog(W)||"").slice(0,800))}o.deleteShader(x._s[0]),o.deleteShader(x._s[1]),delete x._s}},N={train:1,flare:1};return{get:x=>{if(N[x])return x;const z=D.all[M&&D.all[x+"r"+M]?x+"r"+M:x];return A(z),z._u||(z._u={}),z},u:(x,z)=>z in x._u?x._u[z]:x._u[z]=o.getUniformLocation(x,z),S:t,ready:x=>{Y();const z=D.all[x];return A(z),z._u||(z._u={}),z},prep:Y,D3D:P}}Ko.add({num:186,name:"Night Platform",fam:"Worlds",recipe:"An empty station platform late at night, shot low along the edge, sometimes underground and sometimes out in snowy woods. The air moves first, the rails sing, then a train roars in, opens onto an empty carriage and leaves, though some run straight through. The region and the station change every mint. Tap to call the train, drag to lean along the edge, or hold to slow time.",interactive:"Tap to call the train. Drag to lean along the platform edge. Hold to slow time and watch the wind and the windows.",music:!0,gl:!0,fps:30,seed:0,make(o){const t=o.gl,M=o.size;let D=0;for(let e=2;e<o.hash.length;e++)D=Math.imul(D,31)+o.hash.charCodeAt(e)>>>0;let P=D||1;const l=()=>{P=P+1831565813|0;let e=Math.imul(P^P>>>15,1|P);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},i=e=>{let s=l(),r=0;for(const b of e)if(r+=b[1],s<r)return b[0];return e[e.length-1][0]};for(let e=0;e<6;e++)l();let Y=i([["Glazed cream tile",.5],["Brutalist concrete",.36],["Old iron and brick vault",.14]]),A=i([["Sodium",.46],["Cold fluorescent",.42],["One failing tube",.12]]),N=i([["Silver",.52],["Dark red",.36],["Empty night freight",.12]]),H=i([["Dry",.3],["Wet drips",.56],["Leaves blown in",.14]]),f=i([["Last train",.68],["First train",.32]]),xt=i([["Scrubbed",.25],["Worn",.55],["Filthy",.2]]),x=i([["Green",.6],["Amber",.3],["Blue",.1]]),z=(D^2654435769)>>>0||1;const W=()=>{z=z+1831565813|0;let e=Math.imul(z^z>>>15,1|z);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},nt=e=>{let s=W(),r=0;for(const b of e)if(r+=b[1],s<r)return b[0];return e[e.length-1][0]};for(let e=0;e<4;e++)W();let $=nt([["Cream and green",.4],["White and blue",.25],["Sea green",.2],["Oxblood",.15]]),zt=nt([["Tactile strip",.45],["Yellow line",.35],["White line",.2]]),ft=nt([["Red doors",.35],["Blue doors",.3],["Yellow doors",.2],["Cream doors",.15]]);const g=W();let c=0;for(let e=0;e<5;e++)W()<.85&&(c|=1<<e);g<.07&&(H="Flooded track"),o.home&&(Y="Glazed cream tile",A="Sodium",N="Silver",H="Wet drips",f="Last train",xt="Worn",x="Green",$="Cream and green",zt="Tactile strip",ft="Red doors",c=27),N[0]==="E"&&(ft="None");let y=(D^2246822507)>>>0||1;const E=()=>{y=y+1831565813|0;let e=Math.imul(y^y>>>15,1|y);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)E();let S=(()=>{const e=E();let s=0;for(const r of[["Underground",.34],["City viaduct",.18],["North woods",.14],["Open plain",.12],["Mountain portal",.1],["Coast",.12]])if(s+=r[1],e<s)return r[0];return"Coast"})();(o.home||S[0]!=="N"&&S[0]!=="M")&&(S="Underground");const L=S[0]==="N"?2:S[0]==="M"?4:0,q=L>0;L===2?(Y="Timber halt",c=0):L===4&&(Y="Stone portal");const it=q?{D:"Clear night",W:"Snowfall",L:"Driven snow",F:"Ground fog"}[H[0]]:H;o.trait("Region",S),o.trait("Station",Y),o.trait("Tiles",$),o.trait("Edge",zt),o.trait("Light",A),o.trait("Train",N),o.trait("Doors",ft),o.trait("Weather",it),o.trait("Hour",f);const ut=H[0]==="F"?1:0,tt=$[0]==="C"?[.43,.375,.2675,0]:$[0]==="W"?[.5,.5,.47,0]:$[0]==="S"?[.2,.36,.3,0]:[.3,.07,.05,0],j=$[0]==="C"?[.05,.13,.1,0]:$[0]==="W"?[.04,.08,.22,0]:$[0]==="S"?[.42,.4,.32,0]:[.4,.36,.26,0],Pt=zt[0]==="W"?[.5,.5,.46,0]:[.66,.5,.1,0],kt=ft[0]==="R"?[.55,.05,.04,1]:ft[0]==="B"?[.05,.13,.42,1]:ft[0]==="Y"?[.7,.5,.05,1]:ft[0]==="C"?[.62,.56,.4,1]:[.2,.1,.05,0],V=L===2?1:L===4?2:Y[0]==="G"?0:Y[0]==="B"?1:2,B=N[0]==="E",It=H[0]==="W"||H[0]==="F"?1:H[0]==="D"?.28:.5,G=f[0]==="F",Ee=xt[0]==="S"?.28:xt[0]==="W"?.65:1,mt=A[0]==="O",X=A[0]==="S"?[1,.55,.19]:[.8,.93,1],Rt=L===4?[.24,.23,.2]:V===0?[tt[0]*1.44,tt[1]*1.44,tt[2]*1.44]:V===1?[.25,.25,.24]:[.27,.14,.08],Dt=A[0]==="S"?[1,.76,.47]:[1,.8,.52],Ut=V===0?[.12,.9,.5]:V===1?[.6,.82,1]:[1,.62,.2],Wt=e=>{const s=Math.min(Math.max(e-36,0),70);return .0032*s*s},Vt=x[0]==="G"?[.1,1,.45]:x[0]==="A"?[1,.6,.06]:[.15,.45,1],Gt=new Float32Array(20),ht=[],Ht=3+Math.floor(l()*3);for(let e=0;e<2;e++)for(let s=0;s<10;s++){const r=l();let b=.78+.3*l();!G&&r<(e?.35:.14)&&(b=0),mt&&(b=e===1&&s===8?.32:0),e===0&&s===Ht&&(b=-1.05),Gt[e*10+s]=b}for(let e=-3;e<10;e++){const s=e<0?mt?0:.85:Gt[e];s!==0&&ht.push([1.35,2.62,1.525+3*e,s])}for(let e=0;e<10;e+=1){const s=Gt[10+e];s>0&&(e%2===0||mt)&&ht.push([-1.85,2.62,1.525+3*e,s*1.8])}const at=[1.35,2.62,1.525+3*Ht,1.05*(mt?2.8:1)],$t=L===2?[[1.95,3.3,8.5],[1.95,3.3,23.5]]:[[2.9,3.3,5.5],[2.9,3.3,15.5],[2.9,3.3,25.5]],pt=new Float32Array(12);q&&(ht.length=0,at[3]=0,$t.forEach((e,s)=>{const r=mt?s===1?-1:0:1;pt[s*4+3]=r,r>0?ht.push([e[0],e[1],e[2]+.55,7.5/2.5*3]):r<0&&(at[0]=e[0],at[1]=e[1],at[2]=e[2]+.55,at[3]=7)}));const U=Xa(t,V,L),n=U.u,qe=_a(t),Ba=l()*7;let fe=null;if(q){let e=(D^668265263)>>>0||1;const r=Ca(()=>{e=e+1831565813|0;let b=Math.imul(e^e>>>15,1|e);return b=b+Math.imul(b^b>>>7,61|b)^b,((b^b>>>14)>>>0)/4294967296},M>=512?2048:1024,L);fe=t.createTexture(),t.bindTexture(t.TEXTURE_2D,fe),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}const Qo=!!t.getExtension("EXT_color_buffer_float")||!!t.getExtension("EXT_color_buffer_half_float"),to=t.createVertexArray(),Ft=(e,s,r,b=!0)=>{const k=t.createTexture();t.bindTexture(t.TEXTURE_2D,k),r?t.texStorage2D(t.TEXTURE_2D,1,t.RGBA16F,e,s):t.texStorage2D(t.TEXTURE_2D,1,t.RGBA8,e,s);const m=b?t.LINEAR:t.NEAREST;t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,m),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const a=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,k,0),{t:k,fb:a,w:e,h:s}},At=e=>{t.deleteTexture(e.t),t.deleteFramebuffer(e.fb)},Q=M>=512?1024:512;t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(to);let me=null,eo=null,Re=null,Ue=!Qo;if(Qo){const e=Ft(4,4,!0);t.checkFramebufferStatus(t.FRAMEBUFFER)!==t.FRAMEBUFFER_COMPLETE&&(Ue=!0),At(e)}const ae=(e,s)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,s)},st=()=>t.drawArrays(t.TRIANGLE_STRIP,0,4),Et=(e,s)=>{t.useProgram(e),t.bindFramebuffer(t.FRAMEBUFFER,s?s.fb:null),s&&t.viewport(0,0,s.w,s.h)},lt=(e,s,r,b)=>{t.uniform1i(n(e,s),r),ae(r,b)},Qt=H[0]==="D",Ne=H[0]==="F",Oa=q&&(H[0]==="W"||H[0]==="L"),De=H[0]==="L";let he=G?[.07,.09,.15]:Qt?[.018,.022,.042]:Ne?[.05,.05,.053]:[.045,.045,.052];const oo=G?[.012,.02,.046]:Qt?[.003,.0045,.011]:Ne?[.032,.032,.035]:[.022,.022,.027];!G&&!Qt&&(he=he.map((e,s)=>e*(.8+.3*X[s])));const ao=Qt&&E()<.6?[-.02+E()*.13,.085+E()*.05,1]:[0,0,0],Ia=Ne?.09:Qt?.004:G?.006:.02,Wa=G?[.04,.047,.066]:Qt?[.007,.0085,.014]:Ne?[.03,.031,.036]:[.03,.034,.046],Jo=e=>{t.uniform4f(n(e,"uSky0"),he[0],he[1],he[2],Qt?1:0),t.uniform4f(n(e,"uSky1"),oo[0],oo[1],oo[2],0),t.uniform4f(n(e,"uSkyM"),ao[0],ao[1],0,ao[2]),t.uniform4f(n(e,"uFog"),Ia,1,0,0),t.uniform4fv(n(e,"uLq"),pt),t.uniform4f(n(e,"uWl"),X[0],X[1],X[2],0)},so=V===0?[2.05,3.42,1,0]:V===1?[3.05,3.05,0,0]:[1.45,3.95,1,0],se=G?[.2,.33,.62,1]:[X[0]*.09,X[1]*.09,X[2]*.09,0],lo=q?Wa:G?[.05,.058,.068,0]:mt?[.012,.014,.015,0]:[X[0]*.045,X[1]*.045,X[2]*.045,0];if(!Ue){const e=Ft(Q,Q,!0,!1),s=Ft(Q,Q,!1),r=Ft(Q,Q,!0),b=Ft(Q,Q,!0),k=U.get("geo");Et(k,e),t.uniform1i(n(k,"uSteps"),46),t.uniform4fv(n(k,"uV"),so),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),st();const m=[U.get("mf"+V),U.get("mp"+V),...L===2?[]:L?U.D3D?[U.get("mw"+V),U.get("mt"),U.get("mq"+V)]:[U.get("mw"+V),U.get("mx"+V)]:[U.get("mw"+V),...U.D3D?[U.get("mr"+V),U.get("mt"),U.get("mq"+V)]:[U.get("mx"+V)]]];for(const et of[0,1])for(const ot of m)Et(ot,et?r:s),t.uniform1i(n(ot,"uN"),et?3:1),t.uniform1i(n(ot,"uOut"),et),t.uniform4f(n(ot,"uM"),Q,It,Ee,Ba),t.uniform4f(n(ot,"uE"),zt[0]==="T"?1:0,q?0:ut,c,G?1:0),t.uniform4fv(n(ot,"uEc"),Pt),t.uniform4fv(n(ot,"uW1"),tt),t.uniform4fv(n(ot,"uW2"),j),n(ot,"uV")&&t.uniform4fv(n(ot,"uV"),so),lt(ot,"N",0,qe),lt(ot,"G",1,e.t),st();t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.bindFramebuffer(t.FRAMEBUFFER,b.fb),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);const a=U.get("amb");Et(a,b),lt(a,"G",0,e.t),lt(a,"A",1,s.t),lt(a,"Nm",2,r.t),t.uniform1fv(n(a,"uT"),Gt),t.uniform4f(n(a,"uAmb"),lo[0],lo[1],lo[2],0),t.uniform4f(n(a,"uTub"),X[0],X[1],X[2],0),t.uniform4fv(n(a,"uDawn"),se),t.uniform4f(n(a,"uTun"),Dt[0],Dt[1],Dt[2],c),t.uniform1i(n(a,"uNk"),5),t.uniform4f(n(a,"uBox"),Ut[0],Ut[1],Ut[2],0),q&&(Jo(a),lt(a,"Wd",3,fe)),st();const F=U.get("tube");Et(F,b),t.uniform1i(n(F,"uNs"),q?1:3),lt(F,"G",0,e.t),lt(F,"A",1,s.t),lt(F,"Nm",2,r.t);const bt=2.5;for(const et of ht)t.colorMask(!0,!0,!0,!1),t.uniform4f(n(F,"uL"),et[0],et[1],et[2],bt*et[3]),t.uniform4f(n(F,"uC"),X[0],X[1],X[2],0),st();t.colorMask(!1,!1,!1,!0),at[3]>0&&(t.uniform4f(n(F,"uL"),at[0],at[1],at[2],bt*at[3]),t.uniform4f(n(F,"uC"),1,1,1,0),st()),t.colorMask(!0,!0,!0,!1),q||t.uniform4f(n(F,"uL"),2.3,1.1,28.5,G?3:.4),t.uniform4f(n(F,"uC"),se[0]/Math.max(se[2],.01)*(G?1:X[2]),se[1]/Math.max(se[2],.01)*(G?1:X[2]),G?1:X[2],0),q||st();for(let et=0;et<5;et++)if(c>>et&1){const ot=33.5+8.2*et;t.uniform4f(n(F,"uL"),Wt(ot)-2.8,1.7,ot,6),t.uniform4f(n(F,"uC"),Dt[0],Dt[1],Dt[2],1),st()}q||(t.uniform4f(n(F,"uL"),2.3,2.47,28.5,.4),t.uniform4f(n(F,"uC"),Ut[0],Ut[1],Ut[2],0),st()),t.colorMask(!0,!0,!0,!0),t.disable(t.BLEND);const I=Q>>1,vt=Ft(I,I,!0),Tt=Ft(I,I,!0),K=U.get("ref");Et(K,vt),lt(K,"G",0,e.t),lt(K,"A",1,s.t),lt(K,"Nm",2,r.t),t.uniform4fv(n(K,"uV"),so),t.uniform1fv(n(K,"uT"),Gt),t.uniform4f(n(K,"uTub"),X[0],X[1],X[2],0),t.uniform4f(n(K,"uWall"),Rt[0]*X[0]*(mt?.1:.34),Rt[1]*X[1]*(mt?.1:.34),Rt[2]*X[2]*(mt?.1:.34),0),t.uniform4fv(n(K,"uDawn"),se),t.uniform4f(n(K,"uBox"),Ut[0],Ut[1],Ut[2],0),q&&Jo(K),st();const rt=U.get("blur");Et(rt,Tt),lt(rt,"T",0,vt.t),t.uniform4f(n(rt,"uD"),0,0,1,.04),t.uniform1i(n(rt,"uTaps"),15),st(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE);const O=U.get("blit");Et(O,b),lt(O,"T",0,Tt.t),t.uniform4f(n(O,"uD"),1,0,0,0),st(),t.disable(t.BLEND),At(vt),At(Tt),me=Ft(Q,Q,!0),eo=Ft(Q,Q,!1),Re=Ft(Q,Q,!0);const gt=U.get("dof"),ee=Ft(Q,Q,!0),Zt=(et,ot,h,R)=>{Et(gt,ot),lt(gt,"T",0,et.t),lt(gt,"G",1,e.t),t.uniform4f(n(gt,"uD"),7/1024,9,h,5/1024),t.uniform1i(n(gt,"uTaps"),R),st()};Zt(b,ee,1,14),Zt(ee,me,.36,8),Zt(s,eo,1,10),Zt(r,Re,1,10);const Xt=Ft(Q>>2,Q>>2,!0),Yt=Ft(Q>>2,Q>>2,!0);Et(O,Xt),lt(O,"T",0,me.t),t.uniform4f(n(O,"uD"),1,2.2,1,0),st(),Et(rt,Yt),lt(rt,"T",0,Xt.t),t.uniform4f(n(rt,"uD"),.032,0,0,0),t.uniform1i(n(rt,"uTaps"),15),st(),Et(rt,Xt),lt(rt,"T",0,Yt.t),t.uniform4f(n(rt,"uD"),0,.032,0,0),st(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),Et(O,me),lt(O,"T",0,Xt.t),t.uniform4f(n(O,"uD"),.38,0,0,0),st(),t.disable(t.BLEND),At(Xt),At(Yt),At(ee),At(e),At(s),At(r),At(b)}fe&&t.deleteTexture(fe);const pe=84,de=H[0]==="L"?18:7,ve=40,le=Oa?De?420:320:0,dt=new Float32Array(le*4),ta=(e,s)=>{const r=e*4;dt[r]=-4.2+E()*8.6-(De?2.5:0),dt[r+1]=s?4.6:E()*4.6,dt[r+2]=2+E()*E()*30,dt[r+3]=.0045+E()*.004};for(let e=0;e<le;e++)ta(e,!1);const ea=pe+de*2+ve+le,d=new Float32Array(ea*9),C=new Float32Array(pe*7),oa=(e,s)=>{const r=e*7;C[r]=-.1+l()*l()*3.6,C[r+1]=.02+l()*l()*2.4,C[r+2]=s?16+l()*12:1.6+l()*l()*26,C[r+3]=0,C[r+4]=0,C[r+5]=0,C[r+6]=.0026+l()*l()*.007};for(let e=0;e<pe;e++)oa(e,!1);const u=new Float32Array(de*9);for(let e=0;e<de;e++){const s=e*9;u[s]=.08+l()*l()*2.6,u[s+1]=.004,u[s+2]=2.1+l()*l()*12,u[s+6]=l()*6.28,u[s+7]=.16+l()*.7,u[s+8]=H[0]==="L"?.75:.25}const _=new Float32Array(ve*9);let io=0;const co=(e,s,r,b,k,m,a,F,bt)=>{const I=io*9;io=(io+1)%ve,_[I]=e,_[I+1]=s,_[I+2]=r,_[I+3]=b,_[I+4]=k,_[I+5]=m,_[I+6]=a,_[I+7]=F,_[I+8]=bt},aa=t.createBuffer(),sa=t.createVertexArray();t.bindVertexArray(sa),t.bindBuffer(t.ARRAY_BUFFER,aa),t.bufferData(t.ARRAY_BUFFER,d,t.DYNAMIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,36,0),t.vertexAttribDivisor(0,1),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,36,16),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,1,t.FLOAT,!1,36,32),t.vertexAttribDivisor(2,1),t.bindVertexArray(null),t.bindBuffer(t.ARRAY_BUFFER,null);const St=B?18+13.5*11:95,Ae=-56.25,Jt=B?11.5:15,Va=1.1,ro=()=>{const e=l();return e<.16?7+l()*9:e<.74?26+l()*55:95+l()*170};let w=1,p=165,J=Jt,ct=0,Ct=0,Kt=ro(),_t=!1,Mt=0,ie=!1,no=0,qt=.5,xe=0,fo=0,mo=0,ue=1,Se=0,be=!0,i0=.5,c0=0,ge=1,ye=0,ho=0,po=1+l()*3,vo=0,xo=0,Le=0,r0=0,uo=0,n0=0,bo=0;if(!o.home){const e=l();B?p=e<.5?95:150:e<.2?p=95:e<.38?p=50:e<.6?(w=2,p=Ae,J=0,ct=3.6,Ct=1,qt=.05):e<.8?p=160:(w=0,qt=0,Kt=14+l()*60)}p<175&&(bo=1);const la=e=>{const s=Math.min(Math.max(e-36,0),70);return .0032*s*s+Math.max(e-106,0)*.448},Ga=e=>{const s=Math.min(Math.max(e-36,0),70);return 2*.0032*s};function ia(e){Mt+=e;let s=0;if(w===0)Kt-=e,(Kt<=0||_t)&&(_t&&Kt>2.5?Kt=2.5:Kt<=0&&(w=1,p=320,J=Jt,ie=!_t&&!B&&l()<.22,_t=!1));else if(w===1)B||ie?J=ie?Jt*.85:Jt:(J=Math.min(Jt,Math.sqrt(Math.max(0,2*Va*(p-Ae)))),p-Ae<.03&&(w=2,ct=0,J=0,p=Ae)),p-=J*e,p<175&&(bo=Math.min(1,bo+e*4)),s=p>-8?Math.pow(Math.min(1,Math.max(0,(340-p)/305)),1.7)*1.05:.55*J/Jt,(B||ie)&&p+St<-160&&(w=0,Kt=_t?3:ro(),_t=!1,ie=!1);else if(w===2){if(ct+=e,ct>1&&ct<2.4&&(Ct=Math.min(1,(ct-1)/1.25),Ct=Ct*Ct*(3-2*Ct)),ct>=8.6+1.2&&ct<11.6){const m=Math.min(1,(ct-9.8)/1.5);Ct=1-m*m*(3-2*m)}ct>13&&(w=3,J=0,Ct=0),s=0}else w===3&&(J=Math.min(17,J+.95*e),p-=J*e,s=Math.min(.5,J*.05)*(p+St>-20?1:Math.max(0,1+(p+St+20)/30)),p+St<-180&&(w=0,Kt=_t?3:ro(),_t=!1));const r=s>qt?1.2:3.2;if(qt+=(s-qt)*(1-Math.exp(-e/r)),xe+=(Math.sin(Mt*2.3)*.5+Math.sin(Mt*5.1+1)*.3+Math.sin(Mt*.9)*.4-xe)*Math.min(1,e*3),mo+=(-fo*7-mo*.7+qt*(1+xe*.8)*5)*e,fo+=mo*e,Se-=e,Se<=0){be=!be;const m=l();be?Se=mt?.12+m*m*3.5:.2+m*m*m*16:Se=mt?.03+m*m*.7:.03+m*m*.28,o.sound.on&&o.sound.hit("click",.06,{pan:.1})}ue+=((be?1:.03)-ue)*Math.min(1,e*(be?26:60)),no*=Math.exp(-e/1.4);const k=qt*(1+xe*.5)+no*.5;for(let m=0;m<pe;m++){const a=m*7,F=C[a],bt=C[a+1],I=C[a+2],vt=1/(1+Math.max(F,0)*.35),Tt=-k*8.5*vt,K=k*1.5*Math.sin(I*1.3+Mt*2.1+m),rt=k*(1.3*Math.sin(F*4+Mt*1.7+m*2)+.4)+Math.sin(Mt*.3+m)*.012,O=Math.min(1,e*1.6);C[a+3]+=(K-C[a+3])*O,C[a+4]+=(rt-C[a+4])*O,C[a+5]+=(Tt-C[a+5])*O,C[a]+=C[a+3]*e,C[a+1]=Math.max(.006,bt+C[a+4]*e),C[a+2]+=C[a+5]*e,(C[a+2]<1.1||C[a+1]>3||C[a]>3.4||C[a]<-.12)&&oa(m,qt>.1)}if(le){const m=(De?2.2:.35)*(1+xe*.6);for(let a=0;a<le;a++){const F=a*4;dt[F]+=(m+Math.sin(Mt*1.3+a)*.25)*e,dt[F+1]-=(.7+dt[F+3]*60)*e,dt[F+2]-=k*5*e/(1+dt[F+2]*.06),(dt[F+1]<0||dt[F]>4.8||dt[F+2]<1.6)&&ta(a,!0)}}for(let m=0;m<de;m++){const a=m*9,F=u[a+7],bt=1/(1+Math.max(u[a],0)*.22),I=k*bt-F,vt=u[a+1]>.012;if(I>0||vt){const Tt=-Math.max(I,0)*9.5-(vt?k*2.5:0),K=Math.sin(Mt*1.9+m*2.1)*k*1.6,rt=Math.max(I,0)*(1.6+1.6*Math.sin(Mt*3+m)),O=Math.min(1,e*3);u[a+3]+=(K-u[a+3])*O,u[a+5]+=(Tt-u[a+5])*O,u[a+4]+=(rt-u[a+4])*O-2.6*e,u[a]+=u[a+3]*e,u[a+1]+=u[a+4]*e,u[a+2]+=u[a+5]*e,u[a+6]+=(Math.abs(u[a+5])*1.4+Math.abs(u[a+4])*2.5)*e,u[a+1]<.004&&(u[a+1]=.004,u[a+4]=Math.abs(u[a+4])*.2,u[a+3]*=.7,u[a+5]*=.8),(u[a+2]<1.15||u[a]<.02)&&(u[a+2]=9+l()*14,u[a]=.12+l()*2.5,u[a+1]=.004,u[a+3]=u[a+4]=u[a+5]=0)}else u[a+3]*=.9,u[a+5]*=.9}if(H[0]!=="D"&&!q&&(po-=e,po<=0)){po=(It>.9?1.2:3)+l()*5;const m=.2+l()*2,a=2.8+l()*l()*9;co(m,2.2,a,0,-7,0,.3,2,.006),co(m,.002,a,0,0,0,1.6,3,-.3),o.sound.on&&o.sound.note(0,{freq:1300+l()*900,dur:.06,vel:.12,wave:"sine",pan:.25})}if(B&&(w===1||w===3)&&p<28&&p>-St){for(uo+=e*42;uo>1;){uo--;const m=2.4+l()*l()*15;m>p&&m<p+St&&co(-.12,-.05+l()*.1,m,.7+l()*2.6,.3+l()*1.9,-J*.5-l()*2,.16+l()*.26,4,.004+l()*.005)}ho=.4+l()*l()*2.4}for(let m=0;m<ve;m++){const a=m*9;_[a+6]>0&&(_[a+6]-=e,_[a+7]===4&&(_[a+4]-=9.8*e),_[a+7]===3?_[a+8]+=e*.09:(_[a]+=_[a+3]*e,_[a+1]+=_[a+4]*e,_[a+2]+=_[a+5]*e))}}if(o.home||w!==2){const e=qt;qt=.46;for(let s=0;s<36;s++){const r=w,b=p;w=-1,ia(1/15),w=r,p=b,qt=e}}const Nt=16e3,go=new Float32Array(Nt);let ca=.12,te=0,Ce=0,yo=0,wo=0,zo=0,ce=0,To=12345,Po=0,we=0,_e=0,Fo=0,Mo=0,ko=0,Eo=0,qo=0,Ro=0,Uo=0,No=0,Do=0,Ao=0,So=0,Lo=0,ze=-1;const Ka=A[0]==="S"?100:120;function ja(e,s){if(!o.sound.on)return;const r=e*Nt+ca*Nt;ca=0;const b=Math.min(go.length,Math.round(r));if(b<=0)return;const k=w===1?Math.min(1,Math.max(0,(260-p)/230)):w===3?Math.max(0,1-Math.max(0,-(p+St))/120):w===2?.05:0,m=Math.min(1,J/12),a=(.5+.5*ue)*(mt?.9:1),F=Math.min(1,qt*1.1),bt=k*k*(.4+.6*m),I=(w===1?Math.min(1,Math.max(0,(240-p)/170))*Math.max(.15,Math.min(1,(p+8)/30+.2)):0)*.8,vt=m*k,Tt=(w===1?Math.min(1,Math.max(0,(70-p)/50)):w===3?Math.max(0,1+(p+St)/60)*.8:0)*m,K=!B&&w===1&&J<8.5?Math.min(1,(8.5-J)/2)*Math.min(1,J/.9):B&&p<30&&p+St>-30?.28:0,rt=w===2&&(ct>1&&ct<2.4||ct>9.8&&ct<11.4)?.8:0,O=Math.sqrt(s),gt=1/b,ee=6.2832*Ka*O/Nt,Zt=(60+J*54)*O,Xt=(2650+310*Math.sin(Mt*1.3)+(8.5-Math.min(J,8.5))*62)*O,Yt=2140*O,et=3330*O,ot=4720*O,h=J/1.1*O;for(let R=0;R<b;R++){qo+=(a-qo)*gt*.3,Ro+=(F-Ro)*gt*.2,Uo+=(bt-Uo)*gt*.1,No+=(I-No)*gt*.1,Do+=(vt-Do)*gt*.15,Ao+=(K-Ao)*gt*.3,So+=(rt-So)*gt*.3,Lo+=(Tt-Lo)*gt*.15,To=Math.imul(To,1664525)+1013904223|0;const T=To/2147483648;Po+=(T-Po)*.012,we+=(T-we)*.05,_e+=(T-_e)*.28,te+=ee;const Bt=Math.sin(te)+.45*Math.sin(te*3)+.22*Math.sin(te*5)+.1*Math.sin(te*7),Pe=_e-we*1.1;Ce+=6.2832*Zt/Nt;const Vo=(Ce%6.2832/3.1416-1)*.4+Math.sin(Ce*2.01)*.35;yo+=6.2832*Yt/Nt,wo+=6.2832*et/Nt,zo+=6.2832*ot/Nt;const Fe=(Math.sin(yo)+.7*Math.sin(wo)*(.6+.4*Math.sin(Mt*3.1))+.35*Math.sin(zo))*(.7+.3*we*8);ce+=6.2832*Xt/Nt;const Me=Math.sin(ce)+.4*Math.sin(ce*2.003)+.25*Math.sin(ce*3.01+2*Math.sin(ce*.011));Eo+=h/Nt,Eo>1&&(Eo-=1,ko=1),ko*=.9975;const Ve=Po*9+Math.sin(te*.36)*.25;Fo+=(T-Fo)*.2,Mo+=(Fo-Mo)*.2;const Go=Bt*qo*.022+Pe*Ro*.55+Ve*Uo*.5+(Mo*1.5+we*1.2)*Lo*(.45+.55*ko)+Vo*Do*.05+Fe*No*.022+Me*Ao*.045+(T-_e)*So*.13;go[R]=Math.max(-1,Math.min(1,Go))}te%=6283.2,Ce%=6283.2,yo%=6283.2,wo%=6283.2,zo%=6283.2,ce%=6283.2,o.sound.pcm(go.subarray(0,b),Nt,{vel:1})}let ra=-1,Co=0,_o=0,Te=0,na=!1,fa=0,ma=0,Xo=0,Xe=0,Be=0,Bo=!1,Oo=!1;const jt=U.get("scene"),Za=U.get("train"),Oe=U.get("spr"),Ya=U.get("flare"),v=new Float32Array(48),Ha=N[0]==="S"?[.62,.64,.66,1]:N[0]==="D"?[.3,.025,.02,1]:[.42,.25,.14,0],$a=N[0]==="S"?[.1,.17,.34,.8]:N[0]==="D"?[.4,.22,.05,.35]:[.1,.1,.1,.1],Io=A[0]==="S"?[1,.94,.78]:[.96,.98,1],Wo=A[0]==="S"?[.86,.95,1.1]:[1,.95,.84];t.useProgram(jt),t.uniform1i(n(jt,"B"),0),t.uniform1i(n(jt,"A"),1),t.uniform1i(n(jt,"Nm"),2),t.uniform1i(n(jt,"Nz"),3),t.uniform1i(n(jt,"uNL"),3);const Ie=e=>n(e,"U");q&&(t.useProgram(Oe),t.uniform4fv(n(Oe,"uLq"),pt));const Qa=Ie(jt),Ja=Ie(Oe),ha=to,t0=G?1.08:mt?1.25:.98,e0=mt?.02:G?.12:.08;function pa(){if(t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,M,M),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),Ue)return;t.bindVertexArray(ha);const e=p+St;let s=la(p)-1.64,r=p,b=.32,k=0,m=0,a=Wo[0],F=Wo[1],bt=Wo[2],I=.62;const vt=1.02,Tt=Math.max(0,Math.min(1,(215-p)/150));let K,rt=-.018,O;const gt=w===1||w===3||w===2;if(w===1&&p>-1){const R=Ga(p),T=1/Math.hypot(R,1);K=-R*T,O=-T,k=620*Math.min(1,Math.max(0,(260-p)/180));const Bt=(29-Lt[2])/(p-Lt[2]),Pe=Lt[0]+(s-Lt[0])*Math.min(Bt,1),Vo=Lt[1]+(b-Lt[1])*Math.min(Bt,1),Fe=Math.abs(Pe+1.65),Me=Vo-1.95;let Ve=Fe-1.75;if(Me>0){const da=Math.hypot(Fe/1.75,Me/1.1),l0=Math.hypot(Fe/3.0625,Me/1.21);Ve=da*(da-1)/Math.max(l0,1e-4)}const Go=(44-Lt[2])/(p-Lt[2]),a0=Lt[0]+(s-Lt[0])*Math.min(Go,1),s0=la(44)+.1-a0;m=Math.min(1,Math.max(0,Math.min(-Ve,s0)*2.2+.35))*Math.min(1,Math.max(0,(p+.6)*.9))}else(w===3||w===1||w===2)&&p<=0?(r=e,s=-1.64,b=.72,a=1,F=.05,bt=.03,K=0,O=1,I=-.1,k=(w===3?26:6)*(e<29?1:Math.max(0,1-(e-29)/25)),m=0):(K=0,O=-1);const ee=(w===1&&p>3?260*Tt*(.25+.75*Math.min(1,(215-p)/150)):0)*Math.max(0,Math.min(1,(p-2)/18));v[0]=vo,v[1]=xo,Le=Le+1&15,v[2]=Le*7%16*.0625+Le*3%5*.037,v[3]=1+Math.sin(Mt*45)*.004+(ue-1)*.05,v[4]=ue,v[5]=t0;const Zt=p<60&&!B&&(w===1||w===2||w===3)?1:0;v[6]=Zt,v[7]=Ct,v[8]=s-vt,v[9]=b,v[10]=r,v[11]=k*.5,v[12]=s+vt,v[13]=b,v[14]=r,v[15]=k*.5,v[16]=-1.25,v[17]=.75,v[18]=Math.max(38,Math.min(76,34+(p-44)*.62)),v[19]=ee,v[20]=K,v[21]=rt,v[22]=O,v[23]=I,v[24]=a,v[25]=F,v[26]=bt,v[27]=.009*(k/620)*m*m+.0012*Tt*(w===1&&p>0?1:0);const Xt=ge;v[28]=p,v[29]=e,v[30]=Math.max(.002,J*Xt*.085),v[31]=M;const Yt=w===2||w===3||w===1&&p<20,et=Yt?[1,.03,.02]:Vt;v[32]=et[0],v[33]=et[1],v[34]=et[2],v[35]=Yt?.11:-.11,v[36]=Io[0],v[37]=Io[1],v[38]=Io[2],v[39]=ho,ho*=.72,v[40]=X[0],v[41]=X[1],v[42]=X[2],v[43]=fo;const ot=w===3||w===1&&p<=0?Math.min(1,Math.max(0,(35-e)/12))*Math.min(1,Math.max(0,(e+190)/40)):0;if(v[44]=e0,v[45]=m*(k/620),v[46]=Math.min(1,m*(k/620)*Math.min(1,1.5/Math.max(p,.6))*(p>-.4?1:0)),v[47]=ot,t.useProgram(jt),t.uniform4fv(Qa,v),ae(0,me.t),ae(1,eo.t),ae(2,Re.t),ae(3,qe),st(),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),e>.1&&p<66&&w!==0){const R=U.ready(Za);t.useProgram(R),t.uniform1i(n(R,"Nm"),2),t.uniform1i(n(R,"Nz"),3),t.uniform4fv(Ie(R),v),t.uniform4fv(n(R,"uK"),Ha),t.uniform4fv(n(R,"uK2"),$a),t.uniform4fv(n(R,"uK3"),kt),ae(2,Re.t),st()}let h=0;for(let R=0;R<pe;R++){const T=R*7;d[h++]=C[T],d[h++]=C[T+1],d[h++]=C[T+2],d[h++]=C[T+6],d[h++]=C[T+3],d[h++]=C[T+4],d[h++]=C[T+5],d[h++]=0,d[h++]=q?6:R*.137%.999}for(let R=0;R<de;R++){const T=R*9;d[h++]=u[T],d[h++]=.002,d[h++]=u[T+2],d[h++]=.018,d[h++]=0,d[h++]=0,d[h++]=0,d[h++]=u[T+6],d[h++]=q?6:5.5,d[h++]=u[T],d[h++]=u[T+1],d[h++]=u[T+2],d[h++]=.015+R%3*.003,d[h++]=u[T+3],d[h++]=u[T+4],d[h++]=u[T+5],d[h++]=u[T+6],d[h++]=q?6:1+u[T+8]}for(let R=0;R<le;R++){const T=R*4;d[h++]=dt[T],d[h++]=dt[T+1],d[h++]=dt[T+2],d[h++]=dt[T+3],d[h++]=De?2.2:.35,d[h++]=-(.7+dt[T+3]*60),d[h++]=0,d[h++]=0,d[h++]=7+R*.137%.99}for(let R=0;R<ve;R++){const T=R*9;if(_[T+6]>0){const Bt=_[T+7],Pe=Bt===3?_[T+8]+.3:_[T+8];d[h++]=_[T],d[h++]=_[T+1],d[h++]=_[T+2],d[h++]=Bt===3?(_[T+8]+.32)*.3:Pe,d[h++]=_[T+3],d[h++]=_[T+4],d[h++]=_[T+5],d[h++]=0,d[h++]=Bt+Math.min(.99,Bt===3?_[T+6]/1.6:.99)}else d[h++]=0,d[h++]=0,d[h++]=5,d[h++]=0,d[h++]=0,d[h++]=0,d[h++]=0,d[h++]=0,d[h++]=6}if(t.bindBuffer(t.ARRAY_BUFFER,aa),t.bufferData(t.ARRAY_BUFFER,d,t.DYNAMIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,null),t.useProgram(Oe),t.uniform4fv(Ja,v),t.bindVertexArray(sa),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,ea),t.bindVertexArray(ha),v[45]>.004||v[46]>.004){t.blendFunc(t.ONE,t.ONE);const R=U.ready(Ya);t.useProgram(R),t.uniform4fv(Ie(R),v),st()}t.disable(t.BLEND),t.bindVertexArray(null)}const Lt=[.42,.3,0];if(Ue){const e=(()=>{const s=t.createProgram(),r=t.createShader(t.VERTEX_SHADER),b=t.createShader(t.FRAGMENT_SHADER);return t.shaderSource(r,Z),t.shaderSource(b,Na),t.compileShader(r),t.compileShader(b),t.attachShader(s,r),t.attachShader(s,b),t.linkProgram(s),s})();return(s,r)=>{t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,M,M),t.disable(t.BLEND),t.bindVertexArray(to),t.useProgram(e),st(),t.bindVertexArray(null)}}pa();let We=0,o0=0;return(e,s)=>{const r=o.input,b=r.taps(),k=Math.min(s,.12);Xo+=k,r.down?(na||(ra=Xo,Co=r.x,_o=r.y,Te=0,fa=Xe,ma=Be),Te=Math.max(Te,Math.hypot(r.x-Co,r.y-_o)),Te>.03&&(Bo=!0,Xe=Math.max(-.038,Math.min(.038,fa-(r.x-Co)*.09)),Be=Math.max(-.012,Math.min(.018,ma+(r.y-_o)*.04))),Oo=!0):(Bo=!1,Xe*=1-Math.min(1,k*.22),Be*=1-Math.min(1,k*.22));const m=r.down?Xo-ra:0,a=r.down&&!Bo&&m>.22;b.length&&Te<.03&&(Oo=!0,no=1,w===0?(w=1,p=235,J=Jt,ie=!1):w===2&&ct<9.6&&ct>2.4?ct=9.6:_t=!0),na=r.down,Oo&&(ye=0);let F=1;ye>0&&(ye-=k,F=ye>0?.03:1),a&&(F=.25),ge+=(F-ge)*Math.min(1,k*(ye>0?40:3.2)),vo+=(Xe-vo)*Math.min(1,k*7),xo+=(Be-xo)*Math.min(1,k*7),We+=k*ge;let bt=0;const I=1/30;for(;We>=I&&bt++<4;)We-=I,ia(I);if(bt>=4&&(We=0),o.sound.on){if(w===2){const vt=ct>.75&&ze<.5,Tt=ct>9.3&&ze<1.5&&ze>.5;if(vt||Tt){ze=vt?1:2;const K=vt?[81,77]:[77,74];o.sound.note(K[0],{dur:.55,vel:.36,wave:"sine",pan:-.25}),o.sound.note(K[1],{dur:.9,vel:.34,wave:"sine",pan:-.25,at:.46})}}else w===0&&(ze=-1);ja(k,ge)}pa(),++o0===2&&U.prep()}}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
