// Pancake Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/273.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Za){Za&&function(){"use strict";const Ka=new WeakMap,J=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,ne=9.81,et=Math.PI*2,Do=3.7,je=.1317,ga=.875,Be=-.0065,Sa=18.5,Bo=9,Lo=150,Io=.215,Co=1.1,za=186,Je=760,ka=8,Oo=2.5,se=512,Vo=4,Xo=2,ve=2.9,Qa=1024,qo=9,$a=[2,3,4,5,7,9,13,17],Ut=`layout(std140) uniform F{mat4 VP;vec4 CAM;vec4 SUN;vec4 SUNC;vec4 SKYH;vec4 SKYZ;vec4 GLOW;vec4 MISC;vec4 MISC2;vec4 WARP;vec4 CNT;
vec4 WW[5];vec4 PA[6];vec4 PB[6];vec4 PC[6];vec4 RA[4];vec4 RB[4];vec4 HZ;vec4 FP;vec4 LD[2];};
`,ja=`void wave(vec2 p,out float h,out vec2 g,out vec2 d){
 h=0.;g=vec2(0.);d=vec2(0.);
 float zf=max(p.y,1.);
 for(int i=0;i<5;i++){vec4 w=WW[i];float kl=length(w.xy);float a=w.z*clamp(2.-kl*zf*zf*CNT.z,0.,1.);float th=dot(w.xy,p)+w.w;float c=cos(th),s=sin(th);h+=a*c;g-=w.xy*a*s;d-=w.xy/kl*a*s;}
 int np=int(CNT.x);
 for(int i=0;i<np;i++){vec4 A=PA[i],B=PB[i];vec2 C=PC[i].xy;vec2 q=p-B.xy;float al=dot(q,C),cr=dot(q,vec2(-C.y,C.x));float e=A.z*exp(-al*al*B.z-cr*cr*B.w)*clamp(2.-length(A.xy)*zf*zf*.00039,0.,1.);float th=dot(A.xy,q)+A.w;float c=cos(th),s=sin(th);h+=e*c;g-=A.xy*e*s;d-=C*e*s;}
 int nr=int(CNT.y);
 for(int i=0;i<nr;i++){vec4 A=RA[i],B=RB[i];vec2 q=p-A.xy;float r=length(q)+.001;vec2 rh=q/r;float x=r-B.x;float e=A.z*exp(-x*x*B.y)/sqrt(1.+r*.6);float th=A.w*r-B.z;float c=cos(th),s=sin(th);h+=e*c;g-=rh*A.w*e*s;d-=rh*e*s;}
}
`,Na=`vec2 warp(vec2 p){float z=max(p.y,1.);return vec2(.5+.5*p.x/(z*WARP.x),(1./z-WARP.z)*WARP.y);}
vec2 dec(vec2 v){v=v*2.-1.;return sign(v)*v*v*8.;}
vec3 sky(vec3 v){float el=max(v.y,0.);vec2 sh=normalize(SUN.xz);float sa=dot(normalize(v.xz+vec2(1e-4)),sh)*.5+.5;vec3 c=mix(SKYH.rgb,SKYZ.rgb,1.-exp(-el*5.5));c=mix(c,HZ.rgb,exp(-el*HZ.a));return c+GLOW.rgb*pow(sa,GLOW.a)*exp(-el*9.);}
// the far pack, where single pans are only a few pixels tall: the mean of ice and water, shaded by the swell itself.
// The swell slope is taken per pixel here, since the water grid is too coarse for it out past a hundred metres.
// swell bands: a face of the swell turned to the eye shows the pans' tops (a pale bar), the back of a crest only rims
// and gaps (a dark one). g is the slope of the swell, a the direction away from the eye.
float swBand(vec2 g,vec2 a,float d){return clamp(1.+dot(g,normalize(a))*FP.w*smoothstep(12.,55.,d),.5,1.5);}
vec3 farPack(vec3 P,vec3 V,float d,float cm){vec2 g=vec2(0.);for(int i=0;i<int(FP.z);i++){vec4 w=WW[i];float kl=length(w.xy);g-=w.xy*w.z*clamp(1.8-kl*d*.0125,0.,1.)*sin(dot(w.xy,P.xz)+w.w);}
 vec3 N=normalize(vec3(-g.x*2.5,1.,-g.y*2.5));vec3 L=SUN.xyz;float dif=max(dot(N,L)+.06,0.)/1.06;
 float tv=swBand(g,-V.xz,d);
 vec3 amb=mix(SKYH.rgb*.5,SKYZ.rgb,.8)*.6;
 vec3 ice=vec3(.50,.54,.60)*(SUNC.rgb*SUNC.a*dif*.9+amb)*tv;
 float F=.02+.98*pow(1.-max(dot(N,V),.01),5.);vec3 R=reflect(-V,N);R.y=abs(R.y);
 vec3 wat=mix(vec3(.012,.026,.03),sky(R),F*.4*cm*cm);
 float cv=(1.-(1.-FP.x)*clamp(V.y*20./tv,0.,1.))*cm;
 return mix(wat,ice,cv);}

float mapShadow(vec3 P,float h0){vec2 sh=normalize(SUN.xz);float o=0.;float d=.22;for(int i=0;i<5;i++){float m=textureLod(uM,warp(P.xz+sh*d),0.).g*MISC2.w;o=max(o,clamp((m-h0-d*SUN.w-.012)/(.035+.05*d),0.,1.));d*=1.72;}return 1.-o;}
vec4 fin(vec3 c,float z){vec3 t=1.-exp(-c*vec3(1.08,1.06,1.04));float co=clamp((MISC2.y-1./z)*SKYZ.a,-1.,1.);return vec4(sqrt(t),co*.5+.5);}
`,pe=J+"out vec2 V;void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));V=p;gl_Position=vec4(p*2.-1.,0.,1.);}",Wo=J+Ut+ja+`layout(location=0) in vec4 aP;layout(location=1) in vec4 i0;layout(location=2) in vec4 i1;layout(location=3) in vec4 i2;
uniform sampler2D uA;uniform sampler2D uRad;
out vec3 vW;out vec2 vL;out float vZ;flat out vec4 fA;flat out vec4 fB;flat out float fW;
void main(){
 float tile=i2.z;fW=max(-i2.w,0.);
 float Rt=.6+.8*textureLod(uRad,vec2(aP.w,(tile+.5)/8.),0.).r;
 vec2 l=aP.xy*aP.z*Rt;
 vec2 org=vec2(mod(tile,4.),floor(tile/4.));
 float h=textureLod(uA,(org+l/${ve.toFixed(1)}+.5)/vec2(4.,2.),2.2).r;
 float sk=smoothstep(1.,1.06,aP.z);
 float yl=i2.x*h*(1.-sk)-(i2.w>.1&&i2.w<.5?.02:.35)*sk;
 float ty=i0.y,tx=i1.z,tz=i1.w;
 if(i2.w>.5){float hh;vec2 gg,dd;wave(i0.xz,hh,gg,dd);ty=hh+.045;tx=gg.x*.7;tz=gg.y*.7;}
 vec2 o=i0.w*vec2(i1.x*l.x-i1.y*l.y,i1.y*l.x+i1.x*l.y);
 vec3 P=vec3(i0.x+o.x,ty+tx*o.x+tz*o.y+yl,i0.z+o.y);
 vW=P;vL=l;
 fA=vec4(i1.xy,tx,tz);fB=vec4(i0.w,i2.x,i2.y,tile);
 vec4 c=VP*vec4(P,1.);vZ=c.w;gl_Position=c;
}`,Ho=J+Ut+`uniform sampler2D uA;uniform sampler2D uN;uniform sampler2D uM;
`+Na+`in vec3 vW;in vec2 vL;in float vZ;flat in vec4 fA;flat in vec4 fB;flat in float fW;layout(location=0) out vec4 O;
void main(){
 float R=fB.x,T=fB.y,fr=max(fB.z,0.),tile=fB.w,old=step(fB.z,-.5);
 vec2 org=vec2(mod(tile,4.),floor(tile/4.));
 vec2 uv=(org+vL/${ve.toFixed(1)}+.5)/vec2(4.,2.);
 vec4 a=texture(uA,uv);
 float h=a.r,wet=a.g;
 vec2 sl=dec(a.ba);
 float k=T/R;
 vec2 wl=vL*R+vec2(tile*.37,tile*.71);
 vec4 n1=texture(uN,wl*.62),n2=texture(uN,wl*.15),n3=texture(uN,wl*.021),n4=texture(uN,wl*.052);
 float snow=MISC2.x;
 wet=clamp((wet*1.1+(n3.r-.5)*.9+(n4.r-.5)*.25-.08)*(1.-.8*fr)*(1.-snow),0.,1.);
 // prodded under: the sea washes in over the low side of the rim and drains off, the hollows last
 float fl=fract(fW),soak=floor(fW)/15.;
 float sub=1.-smoothstep(fl*.8-.1,fl*.8+.02,h+(n2.g-.5)*.06);wet=max(wet,sub);
 // each pan its own (cycle 2): from its size and thickness, how lately a wave stood on its top and how young it is
 // (thin, grey, dark with the sea under it); the largest stay dry and white
 float big=step(R,1.2),pw=fract(R*53.17+T*271.3+tile*.37),age=fract(R*137.31+T*911.7);
 wet=max(wet,max(smoothstep(.58,.9,pw)*big,soak)*smoothstep(.62,.28,h)*(.62+.38*n3.r)*(1.-snow));
 float thin=smoothstep(.7,.95,age)*big*(1.-old);
 float cr=smoothstep(.3,.7,h);vec2 mic=(n1.rg-.5)*mix(.22,.55,cr)*(1.-.7*wet)+(n2.gb-.5)*mix(.13,.34,cr)*(1.-.6*wet);
 vec2 ls=(sl*k+mic)*(1.-.8*smoothstep(28.,120.,vZ));
 float c=fA.x,s=fA.y;
 vec3 n=normalize(vec3(-(c*ls.x-s*ls.y)-fA.z,1.,-(s*ls.x+c*ls.y)-fA.w));
 vec3 V=normalize(CAM.xyz-vW);
 vec3 L=SUN.xyz;
 // rim shadows inside the pan, marched through its own height
 vec2 Lh=normalize(L.xz);
 vec2 ld=vec2(c*Lh.x+s*Lh.y,-s*Lh.x+c*Lh.y)/${ve.toFixed(1)}/vec2(4.,2.);
 float rise=SUN.w*R/T,occ=0.,t=.02;
 int nm=vZ<70.?7:0;
 for(int i=0;i<nm;i++){float q=textureLod(uA,uv+ld*t,1.+float(i)*.4).r;occ=max(occ,clamp((q-h-t*rise)*6.,0.,1.));t*=1.72;}
 float shad=(1.-occ)*(vZ<70.?mapShadow(vW,h*T):1.);
 float dif=max(dot(n,L),0.)*shad;
 // material: pale frazil crust, bright dry rim crumbs, wet grey centre, sodden at the waterline
 float rim=smoothstep(.42,.8,h);
 float mott=(n1.a-.5)*.22+(n2.r-.5)*.34+(n4.b-.5)*.5+(n3.g-.5)*1.1;
 vec3 alb=mix(vec3(.42,.48,.56),vec3(.90,.905,.91),rim)*(1.+mott*.52);
 alb=mix(alb,vec3(.33,.40,.48)*(1.+mott*.3),thin*.72*(1.-rim*.55));
 alb=mix(alb,vec3(.30,.385,.47),wet*.92);
 float low=1.-smoothstep(.02,.24,h);
 alb=mix(alb,vec3(.30,.40,.47),low*.85);
 alb*=.42+.58*smoothstep(.0,.085,h);
 alb=mix(alb,vec3(.11,.16,.19),sub*.75);
 alb=mix(alb,mix(vec3(.60,.46,.28),vec3(.52,.50,.30),n3.b),MISC.z*smoothstep(.5,.72,n3.a+.2*(1.-rim))*(.45+.45*low));
 alb=mix(alb,vec3(.94,.95,.97),max(fr*.75*(.6+.5*n2.a),snow*.92));
 if(tile>6.5)alb=mix(alb,vec3(.68,.82,.92)*(.8+.5*n2.r),.25);
 alb=mix(alb,mix(vec3(.15,.36,.56),vec3(.62,.78,.87),smoothstep(.2,.72,h+(n4.r-.5)*.6))*(.85+.4*n2.r),old);
 // concavity from the blurred height
 float bl=textureLod(uA,uv,4.).r;
 float ao=clamp(1.-(bl-h)*1.5,.55,1.1);
 float up=n.y*.5+.5;
 vec3 amb=mix(mix(SKYH.rgb,SKYZ.rgb,.55)*.55,SKYZ.rgb,up*up)*.72*ao;
 vec3 col=alb*(SUNC.rgb*SUNC.a*dif+amb);
 // light carried through the crust into thin edges and crumbs
 float sss=(1.-smoothstep(.03,.2,h))*.2+.05*rim;
 col+=alb*SUNC.rgb*SUNC.a*sss*(.25+.75*shad)*(.45+.55*max(dot(-V,L),0.))*vec3(1.,.78,.58)*.7;
 // wet glaze mirrors the low sky; dry crust barely does
 float ndv=max(dot(n,V),.02);
 float F=.02+.98*pow(1.-ndv,5.);
 vec3 gn=normalize(mix(n,normalize(vec3(-fA.z,1.,-fA.w)),.35+wet*.6));
 float ndv2=max(dot(gn,V),.02),F2=.02+.98*pow(1.-ndv2,5.);
 vec3 refl=sky(reflect(-V,gn));
 col=mix(col,refl*.98,F2*mix(.07,.9,wet));
 vec3 Hv=normalize(L+V);
 float ndh=max(dot(n,Hv),0.),ndh2=max(dot(gn,Hv),0.);
 col+=SUNC.rgb*SUNC.a*shad*(pow(ndh,70.)*.16*(1.-wet)+pow(ndh2,520.)*wet*1.5);
 // crystal glint on sunlit crust, kept dim so it never stipples
 float gli=smoothstep(.76,.97,n1.b*.62+n2.a*.38)*pow(ndh,10.)*shad;
 col+=SUNC.rgb*gli*(.22+1.2*snow);
 float d=length(vW-CAM.xyz);
 col*=swBand(fA.zw,vW.xz-CAM.xz,vZ);
 col=mix(col,farPack(vW,V,vZ,1.),smoothstep(130.,420.,vZ));
 col=mix(col,sky(vec3(-V.x,0.,-V.z)),1.-exp(-d*SKYH.a*(1.+MISC.w*1.4)));
 O=fin(col*.86,vZ);
}`,Yo=J+Ut+ja+`layout(location=0) in vec2 aR;out vec3 vW;out vec3 vN;out vec2 vRest;out float vZ;
void main(){float h;vec2 g,d;wave(aR,h,g,d);vec3 P=vec3(aR.x+d.x,h,aR.y+d.y);vW=P;vN=vec3(-g.x,1.,-g.y);vRest=aR;vec4 c=VP*vec4(P,1.);vZ=c.w;gl_Position=c;}`,Go=J+Ut+`uniform sampler2D uG;uniform sampler2D uM;uniform sampler2D uN;
`+Na+`in vec3 vW;in vec3 vN;in vec2 vRest;in float vZ;layout(location=0) out vec4 O;
void main(){
 float d=length(vW-CAM.xyz);
 vec3 V=(CAM.xyz-vW)/d;
 vec2 p1=mat2(.906,.423,-.423,.906)*vRest,p2=mat2(.57,-.82,.82,.57)*vRest;
 vec4 g1=texture(uG,p1/${qo.toFixed(1)}),g2=texture(uG,p2/29.3+.37),g3=texture(uG,p1/3.7+.13);
 vec4 m=textureLod(uM,warp(vW.xz),0.);
 float prox=m.r,chill=m.b;
 float farK=smoothstep(120.,190.,d);
 vec4 gf=texture(uG,vec2(vRest.x/(38.+d*.17),vRest.y/(d*.11+12.))+.2);
 float brk=g2.g*.55+g1.r*.45;
 // a lead narrows into the distance and bends with the pack (the same centre line and taper as leadF in make), its
 // edges ragged with the grease; it never ends on a level line
 float lead=0.;for(int l=0;l<int(MISC2.z);l++){vec4 Q=LD[l];float zr=vRest.y-15.,u=clamp((vRest.y-Q.w)/(Q.w*1.2),0.,1.),lf=1.-u*u*(3.-2.*u);
  float e=abs(vRest.x-Q.x-Q.y*zr-Q.z*1.6*sin(zr*.019+Q.x))-(Q.z*(.8+.45*brk)+.4)*lf-(g3.g-.5)*.3;
  lead=max(lead,(1.-smoothstep(-.5,.35,e))*smoothstep(0.,.2,lf));}
 float collar=smoothstep(.34,.92,prox*(.55+brk*.75));
 float dens=g1.g*.62+g2.g*.34+g3.g*.34-.55+MISC.x*.55;
 dens=dens+collar*.45+chill*(.65+.5*g1.r);
 dens=clamp(dens,0.,1.);
 dens=smoothstep(.1,.86,dens);
 dens=mix(dens,smoothstep(.34,.6,gf.g*.8+g2.g*.4)*.95,farK);
 float nil=MISC.y;
 dens*=(1.-nil*.78)*(1.-lead*.9);
 float wetLine=smoothstep(.72,.96,prox);
 vec2 sl=dec(g1.ba)*.34+dec(g3.ba)*.34+dec(g2.ba)*.10;
 float rough=mix(mix(.016,.006,nil),.08,lead)*(1.-.75*smoothstep(25.,110.,d));
 vec3 N0=normalize(vN);
 vec3 N=normalize(N0+vec3(sl.x,0.,sl.y)*rough*(1.-.55*chill));
 float ndv=max(dot(N,V),.012);
 float F=.02+.98*pow(1.-ndv,5.);
 vec3 R=reflect(-V,N);R.y=abs(R.y)+.002;
 vec3 rc=sky(R);
 // rims and walls standing beyond this spot, mirrored at grazing angle
 vec2 vh=normalize(-V.xz);float te=max(V.y,.02)/max(length(V.xz),.1);
 float hit=0.,e=.07;
 for(int i=0;i<4;i++){float q=textureLod(uM,warp(vW.xz+vh*e),0.).g*MISC2.w;hit=max(hit,clamp((q-e*te)*7.,0.,1.));e*=2.1;}
 vec3 wallc=mix(SKYZ.rgb,SKYH.rgb,.3)*.3;
 rc=mix(rc,wallc,hit*.85);
 float shad=mapShadow(vW,.005);
 vec3 L=SUN.xyz;
 float dif=max(dot(N,L)+.12,0.)/1.12*shad;
 float up=N.y;
 vec3 amb=mix(SKYH.rgb*.6,SKYZ.rgb,.85)*.26;
 // slush: scatters like wet snow; open grease: dark cold water seen through a thin film
 vec3 slush=mix(vec3(.022,.036,.072),vec3(.22,.265,.35),clamp(g1.r*.35+chill*.7+collar*.55+MISC.x*.25-.12,0.,1.));
 vec3 deep=mix(vec3(.006,.016,.03),vec3(.014,.03,.052),g2.r);
 float under=smoothstep(.015,.07,m.g);
 vec3 body=mix(mix(deep,slush,dens),vec3(.15,.19,.27)*(.8+.4*g3.r),under);
 vec3 col=body*(SUNC.rgb*SUNC.a*dif*.36+amb);
 float Fk=mix(mix(.2,.95,max(lead,nil)),.14,dens)*F*(1.-.82*lead*smoothstep(6.,55.,d));
 rc=mix(rc,wallc*.7,lead*smoothstep(8.,60.,d)*.75);
 col=mix(col,rc,clamp(Fk+.018,0.,1.)*(1.-FP.y));
 col*=1.-wetLine*.34*(1.-nil*.5)*(1.-under);
 vec3 Hv=normalize(L+V);
 float ndh=max(dot(N,Hv),0.);
 col+=SUNC.rgb*SUNC.a*shad*(pow(ndh,mix(mix(300.,900.,nil),110.,lead))*mix(mix(.25,1.5,nil),.6,lead)*(1.-dens*.85));
 col*=swBand(-N0.xz/max(N0.y,.5),vW.xz-CAM.xz,d);
 col=mix(col,farPack(vW,V,d,1.-lead),smoothstep(130.,420.,d));
 col=mix(col,sky(vec3(-V.x,0.,-V.z)),1.-exp(-d*SKYH.a*(1.+MISC.w*(1.4+1.6*sin(vRest.x*.05+CAM.w*.05)*g2.g))));
 O=fin(col*.86,vZ);
}`,Zo=J+Ut+`uniform sampler2D uN;uniform sampler2D uM;
`+Na+`in vec2 V;layout(location=0) out vec4 O;
uniform vec4 uB;uniform vec4 uC;uniform vec4 uD;
void main(){
 vec2 sc=V*2.-1.;
 vec3 d=normalize(uB.xyz+sc.x*${je}*vec3(cos(${Be}),sin(${Be}),0.)+sc.y*${je}*vec3(-sin(${Be})*cos(uB.w),cos(${Be})*cos(uB.w),sin(uB.w)));
 vec3 c=sky(d);
 float el=max(d.y,0.);
 float az=atan(d.x,d.z);
 float s1=textureLod(uN,vec2(az*.42+.1,el*6.+.3)*.25,1.).r;
 float s2=textureLod(uN,vec2(az*1.3+.4,el*28.+.1)*.25,0.).g;
 float cl=smoothstep(.42,.7,s1*.7+s2*.3)*smoothstep(.0,.008,el);
 c=mix(c,c*vec3(.90,.84,.87),cl*.8);
 // a banded sky over a sharp line (uC.x): a warm strip on the ice, dull rose over it, a pale cold blue-green above, and
 // low stratus in long level bars lit from beneath (uC.y), darker and smoky over a far lead (water sky: uC.zw)
 if(uC.x>0.){
  float e=el*57.3,sa=dot(normalize(d.xz+vec2(1e-4)),normalize(SUN.xz))*.5+.5;
  vec3 lineC=mix(SKYH.rgb,vec3(1.,.84,.56),.5)*(.92+.16*sa),rose=SKYH.rgb*vec3(.82,.68,.70),cold=mix(SKYZ.rgb,vec3(.58,.76,.80),.6)*.9;
  vec3 b=mix(lineC,rose,smoothstep(.03,.28,e));b=mix(b,cold,smoothstep(.32,1.,e));
  b+=GLOW.rgb*pow(sa,GLOW.a)*exp(-e*2.5)*.7;
  float ws=uC.w*exp(-pow((d.x/max(d.z,.1)-uC.z)/.07,2.));
  vec3 lit=mix(SUNC.rgb*vec3(1.,.78,.6),SKYH.rgb*vec3(1.,.7,.62),step(SUNC.a,.01))*(.75+.5*sa);
  float y1=(e-uD.x)/uD.y,y2=(e-uD.z)/uD.w;
  float k1=textureLod(uN,vec2(az*.08+uD.x,.31),0.).b,k2=textureLod(uN,vec2(az*.11+uD.z,.67),0.).b;
  float m1=exp(-y1*y1*1.6/(.3+k1))*smoothstep(.38,.62,k1*.8+s1*.4),m2=exp(-y2*y2*1.6/(.3+k2))*smoothstep(.42,.66,k2*.8+s2*.35);
  vec3 bar=mix(rose*vec3(.80,.76,.86),lit,smoothstep(.1,-.9,y1)*.85);vec3 bar2=mix(rose*vec3(.78,.75,.86),lit,smoothstep(.1,-.9,y2)*.7);
  b=mix(b,bar*(1.-.45*ws),m1*uC.y);b=mix(b,bar2*(1.-.45*ws),m2*uC.y*.85);
  b*=1.-ws*.18*smoothstep(.0,.5,e);
  c=mix(c,b,uC.x);
 }
 // the sun on the line (n12, uC.x<0): the darkest-skied sun there is. The sky is bright only in a fan a few degrees round
 // the disc and falls to a dull grey-rose; thin dark stratus bars (uD) cross or underline the disc
 float bm=0.;
 if(uC.x<0.){
  float e=el*57.3,se=SUN.y*57.3;
  float ax=sqrt(max(2.-2.*dot(normalize(d.xz+vec2(1e-4)),normalize(SUN.xz)),0.))*57.3,a=length(vec2(ax,(e-se)*1.4));
  float fan=.6*exp(-a/1.)+.4*exp(-a*a/6.);
  vec3 dull=mix(vec3(dot(c,vec3(.3,.6,.1))),c,.5)*vec3(.45,.40,.405);
  c=mix(dull,c*(1.+.4*exp(-a/.7)),fan);
  float k1=textureLod(uN,vec2(az*.22+uD.x,.31),1.).b,k2=textureLod(uN,vec2(az*.3+uD.z,.67),1.).b;
  float y1=(e-se-uD.x-(k2-.5)*.05)/(uD.y*(.55+k1)),y2=(e-se-uD.z+(k1-.5)*.06)/(uD.w*(.5+k2));
  float m1=exp(-y1*y1*1.6)*max(smoothstep(.36,.6,k1*.8+s1*.4),exp(-ax*ax*.35)),m2=exp(-y2*y2*1.6)*max(smoothstep(.44,.66,k2*.8+s2*.35),exp(-ax*ax*1.2)*.85);
  bm=max(m1,m2*.9);
  vec3 bar=mix(dull*.62,mix(c,SUNC.rgb*.9,.4),smoothstep(-.2,-1.2,y1)*.3*fan);
  c=mix(c,bar,bm*uC.y);
 }
 // a low polar sun: flattened by refraction, banded, deeper red at its foot, near white at its core
 vec3 dd=d-SUN.xyz;float sd=sqrt(max(dot(dd,dd)+dd.y*dd.y*1.1,0.));
 float disc=smoothstep(.0050,.0041,sd)*(.8+.2*smoothstep(-.4,.7,sin(dd.y*2900.+1.3)))*(1.-bm*.88);
 vec3 dc=mix(vec3(.95,.22,.05),vec3(1.,.58,.24),smoothstep(-.005,.004,dd.y))*.85;
 if(uC.x<0.)dc=mix(vec3(1.,.24,.06)*1.7,vec3(1.,.56,.24)*2.3,smoothstep(-.0026,.0012,dd.y))+vec3(1.,.8,.6)*3.6*smoothstep(.0034,.0008,sd)*smoothstep(-.0028,-.0002,dd.y);
 c+=(dc*disc+SUNC.rgb*exp(-sd*sd*7000.)*.3*(1.-bm*.6))*step(.01,SUNC.a)*smoothstep(-.001,.001,d.y);
 O=fin(c,1000.);
}`,Ko=J+Ut+`layout(location=0) in vec4 aP;layout(location=1) in vec4 i0;layout(location=2) in vec4 i1;layout(location=3) in vec4 i2;
uniform sampler2D uRad;out vec2 vUv;out float vS;flat out vec3 fI;
void main(){
 float tile=max(i2.z,0.);
 float Rt=i2.w>1.5?1.:.6+.8*textureLod(uRad,vec2(aP.w,(tile+.5)/8.),0.).r;
 vec2 l=aP.xy*aP.z*Rt;
 vec2 org=vec2(mod(tile,4.),floor(tile/4.));
 vUv=(org+l/${ve.toFixed(1)}+.5)/vec2(4.,2.);
 vS=aP.z;
 fI=vec3(i2.x+i0.y*0.,i2.w,i2.y);
 vec2 o=i0.w*vec2(i1.x*l.x-i1.y*l.y,i1.y*l.x+i1.x*l.y);
 vec2 p=i0.xz+o;float z=max(p.y,.5);
 vec2 q=vec2(.5+.5*p.x/(z*WARP.x),(1./z-WARP.z)*WARP.y);
 gl_Position=vec4(q*2.-1.,0.,1.);
}`,go=J+Ut+`uniform sampler2D uA;in vec2 vUv;in float vS;flat in vec3 fI;layout(location=0) out vec4 O;
void main(){
 if(fI.y>1.5){float k=1.-smoothstep(.15,1.6,vS);O=vec4(0.,0.,k*k*(3.-2.*k)*fI.z,0.);}
 else{float h=textureLod(uA,vUv,2.).r;float on=1.-step(1.,vS);float pr=1.-smoothstep(.97,1.55,vS);O=vec4(pr,on*h*fI.x/MISC2.w,0.,0.);}
}`,Qo=J+Ut+`layout(location=0) in vec4 a;out float vA;out float vZ;void main(){vec4 c=VP*vec4(a.xyz,1.);vZ=c.w;gl_Position=c;float lf=clamp(a.w,0.,1.);vA=lf;gl_PointSize=clamp(CNT.w*.022/c.w*(.7+lf*.6)*${Sa.toFixed(1)},1.2,12.);}`,$o=J+Ut+"in float vA;in float vZ;layout(location=0) out vec4 O;void main(){vec2 q=gl_PointCoord*2.-1.;float r=dot(q,q);float k=(1.-smoothstep(.25,1.,r))*min(vA*3.,1.)*.75;vec3 c=mix(SKYH.rgb,vec3(1.),.45)*(.95+.2*q.y);O=vec4(sqrt(1.-exp(-c*1.05)),k);}",jo=(()=>{let t="";for(let e=0;e<16;e++){const i=Math.sqrt((e+.5)/16),s=e*2.39996;t+=(e?",":"")+"vec2("+(i*Math.cos(s)).toFixed(4)+","+(i*Math.sin(s)).toFixed(4)+")"}return t})(),Ja=J+`uniform sampler2D uS;uniform sampler2D uN;uniform vec4 uP;uniform vec4 uQ;uniform vec4 uR;in vec2 V;out vec4 O;
const vec2 TP[16]=vec2[16](${jo});
// smooth value noise from exact texels: hardware bilinear weights are too coarse at this magnification
float sn(vec2 p){vec2 i=floor(p),f=p-i;f=f*f*(3.-2.*f);ivec2 j=ivec2(i)&255;float a=texelFetch(uN,j,0).r,b=texelFetch(uN,(j+ivec2(1,0))&255,0).r,c=texelFetch(uN,(j+ivec2(0,1))&255,0).r,d=texelFetch(uN,(j+ivec2(1,1))&255,0).r;return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
void main(){
 vec4 c0=texture(uS,V);
 float co=abs(c0.a*2.-1.);
 float rad=max(co*uP.x,uP.y);
 vec3 s=c0.rgb*c0.rgb*1.1;float w=1.1;
 for(int i=0;i<16;i++){vec2 o=TP[i]*rad;vec4 t=textureLod(uS,V+o*uP.z,0.);float ct=abs(t.a*2.-1.)*uP.x;float dist=length(o);float k=clamp(ct/max(dist,.001)*1.5+.15,0.,1.);k=max(k,step(t.a,c0.a)*0.+clamp(1.-dist/max(uP.y,.01),0.,1.));float wt=k*exp(-dot(TP[i],TP[i])*1.5);s+=t.rgb*t.rgb*wt;w+=wt;}
 vec3 c=s/w;
 // sea smoke (only compiled for its mints): frost smoke leaves the open water in low wisps that lean with one wind
 // and tear; far off they sum to a glowing ground layer under a clear sky
#ifdef SMOKE
 {float z=1./max(${(1/Sa).toFixed(5)}-(c0.a*2.-1.)/12.5,.0025);
  float src=1.-smoothstep(.006,.05,dot(c,vec3(.3,.6,.1)));
  vec2 q=vec2(V.x*5.+V.y*2.2-uQ.y*.06,V.y*44.-uQ.y*.05);
  float n=0.,am=.62;q.x+=(sn(q*vec2(.7,.5)+vec2(41.,7.))-.5)*1.6;
  for(int i=0;i<2;i++){n+=sn(q)*am;q=q*vec2(2.3,1.7)+vec2(17.,3.);am=.38;}
  float far=smoothstep(30.,170.,z);
  float a=uQ.x*mix(src*.85,.7,far)*smoothstep(.34,.72,n)*smoothstep(.947,.932,V.y);
  c=mix(c,uR.rgb,a);}
#endif
 vec2 q=V-.5;
 c*=1.-dot(q,q)*.1;
 c=sqrt(c);
 c=mix(c,c*c*(3.-2.*c),.42);
 vec4 n=textureLod(uN,V*uP.w+vec2(0.,fract(uP.z*0.)),0.);
 float luma=dot(c,vec3(.3,.6,.1));
 c+=(n.r+n.g-1.)*.014*(1.-.5*luma);
 c+=(n.b-.5)/255.;
 O=vec4(c,1.);
}`,Jo=J+`uniform sampler2D uN;uniform int uZ;
float vn(vec2 p){return textureLod(uN,p/256.,0.).r;}
float fbm(vec2 p){float a=.5,s=0.;mat2 M=mat2(1.62,1.18,-1.18,1.62);for(int i=0;i<5+uZ;i++){s+=a*textureLod(uN,p/256.,0.).r;p=M*p+vec2(13.1,7.7);a*=.5;}return s/.97;}
float wor(vec2 p){vec2 i=floor(p),f=p-i;float d=9.;for(int y=-1;y<2+uZ;y++)for(int x=-1;x<2+uZ;x++){vec2 g=vec2(float(x),float(y));vec2 o=g+textureLod(uN,(i+g+.5)/256.,0.).gb-f;d=min(d,dot(o,o));}return sqrt(d);}
`+`in vec2 V;layout(location=0) out vec4 O;
uniform vec4 uA0,uA1,uF0,uF1,uS,uK;
const float PI2=6.28318;
void main(){
 vec2 p=(V-.5)*${ve.toFixed(1)};
 float r=length(p),th=atan(p.y,p.x);
 vec4 K0=vec4(2.,3.,4.,5.),K1=vec4(7.,9.,13.,17.);
 float Rt=1.;
 for(int i=0;i<4;i++){Rt+=uA0[i]*cos(K0[i]*th+uF0[i])+uA1[i]*cos(K1[i]*th+uF1[i]);}
 vec2 cs=vec2(cos(th),sin(th));
 vec2 sd=uS.xy;
 float s=r/Rt;
 float wob=(fbm(p*7.+sd)-.5)*.05;
 float sq=s+wob;
 float chunk=uK.x;
 float h,wet;
 if(chunk<.5){
  float a1=fbm(cs*1.8+sd*1.3),a2=fbm(cs*4.+sd*.7),a3=fbm(cs*.9+sd*2.1);
  // the rim is slush squeezed up where pans knock: low, broad, lumpy like snow pushed by a boot, meandering in and out
  float mea=fbm(p*3.2+sd.yx*1.7)-.5;
  float rc=.875+(a1-.5)*.05+mea*.07;
  float rw=.05+.10*a3*a3+.045*a2*a1;
  float amp=mix(.05,.72,smoothstep(.40,.62,a1*.55+a2*.3+a3*.15));
  amp*=uS.z;
  float lump=1.-clamp(wor(p*7.+sd.yx+mea*1.5)*1.2,0.,1.);
  float ridge=exp(-pow((sq-rc-(lump-.5)*.035)/rw,2.))*amp;
  float lump2=1.-clamp(wor(p*17.+sd+mea)*1.25,0.,1.);float lump3=1.-clamp(wor(p*36.+sd.yx)*1.3,0.,1.);
  float fine=fbm(p*38.+sd);
  float band=smoothstep(.72,.88,sq);
  float crumbs=smoothstep(.52,.86,lump2)*smoothstep(.5,.9,sq)*smoothstep(.42,.62,fbm(p*5.+sd.yx))*(1.-band*.3);
  float crumbs2=smoothstep(.66,.92,lump3)*smoothstep(.45,.85,sq)*smoothstep(.5,.66,fbm(p*4.+sd));
  // concentric smear from spinning against the slush
  float ring=fbm(vec2(sq*26.,th*.0)+cs*2.6+sd);
  float ring2=fbm(vec2(sq*64.,0.)+cs*6.+sd.yx);
  float top=.24+(fbm(p*2.7+sd*.5)-.5)*.14+(fbm(p*9.+sd)-.5)*.05+(fine-.5)*.02+(ring-.5)*.05*smoothstep(.25,.7,s)+(ring2-.5)*.022;
  // ghost rim of a smaller former self, and a seam where two pans froze together
  top+=uS.w*exp(-pow((sq-uK.y-(a3-.5)*.1)/(.03+.05*a1),2.))*smoothstep(.42,.7,a2)*.055;
  float seam=uK.z*exp(-pow((dot(p,cs*0.+vec2(.8,.6))+.12+(fbm(p*3.+sd)-.5)*.5)/.055,2.))*(1.-smoothstep(.72,.9,s));
  top+=seam*.2*(.5+lump);
  h=top+ridge*(.42+.40*lump+.13*lump2+.04*lump3+(fine-.5)*.1)+band*(lump2*.035+lump3*.02)+crumbs*.09+crumbs2*.035;
  float edge=1.-smoothstep(.95,1.0,sq);
  h*=edge;h=max(h,.0);
  float pud=smoothstep(.30,.56,fbm(p*1.7+sd.yx*2.)*.8+fbm(p*6.+sd)*.25+(.30-h)*1.6);
  wet=clamp(pud*(1.-band*.55)+(1.-smoothstep(.0,.2,h))*.85,0.,1.);
  wet*=.55+.6*fbm(p*14.+sd);
 }else{
  vec2 q=p*2.1+sd,qi=floor(q),qf=q-qi;float bd=9.,fh=.6;
  for(int y=-1;y<2+uZ;y++)for(int x=-1;x<2+uZ;x++){vec2 g=vec2(float(x),float(y));vec4 t=textureLod(uN,(qi+g+.5)/256.,0.);vec2 o=g+t.gb-qf;float dd=dot(o,o);if(dd<bd){bd=dd;fh=.74+(t.a-.5)*.3+dot(o,t.rg-.5)*.46;}}
  float wall=clamp((1.-sq)*5.5,0.,1.);
  h=min(fh,wall*1.02)+(fbm(p*22.+sd)-.5)*.05+(fbm(p*7.+sd)-.5)*.07;
  h*=1.-smoothstep(.97,1.,sq);
  wet=(1.-smoothstep(.0,.2,h))*.8;
 }
 h=clamp(h,0.,.998);
 float v=h*255.;
 O=vec4(floor(v)/255.,fract(v),wet,1.);
}`,tr=J+`uniform sampler2D uN;uniform int uZ;in vec2 V;layout(location=0) out vec4 O;
float hs(vec2 i,float per,int ch){vec2 m=mod(i,per);vec4 t=texelFetch(uN,ivec2(m)&255,0);return ch==0?t.r:t.g;}
float tn(vec2 q,float per){vec2 i=floor(q),f=q-i;f=f*f*(3.-2.*f);return mix(mix(hs(i,per,0),hs(i+vec2(1.,0.),per,0),f.x),mix(hs(i+vec2(0.,1.),per,0),hs(i+vec2(1.,1.),per,0),f.x),f.y);}
float tb(vec2 p,float per){float a=.5,s=0.;for(int i=0;i<5+uZ;i++){s+=a*tn(p*per,per);per*=2.;a*=.5;}return s/.97;}
float tb2(vec2 p,vec2 per){float a=.5,s=0.;for(int i=0;i<4+uZ;i++){vec2 q=p*per;vec2 ii=floor(q),f=q-ii;f=f*f*(3.-2.*f);float v00=texelFetch(uN,ivec2(mod(ii,per))&255,0).b,v10=texelFetch(uN,ivec2(mod(ii+vec2(1.,0.),per))&255,0).b,v01=texelFetch(uN,ivec2(mod(ii+vec2(0.,1.),per))&255,0).b,v11=texelFetch(uN,ivec2(mod(ii+vec2(1.,1.),per))&255,0).b;s+=a*mix(mix(v00,v10,f.x),mix(v01,v11,f.x),f.y);per*=2.;a*=.5;}return s/.94;}
float wo(vec2 p,float per){vec2 q=p*per,i=floor(q),f=q-i;float d=9.;for(int y=-1;y<2+uZ;y++)for(int x=-1;x<2+uZ;x++){vec2 g=vec2(float(x),float(y));vec4 t=texelFetch(uN,ivec2(mod(i+g,per))&255,0);vec2 o=g+t.gb-f;d=min(d,dot(o,o));}return sqrt(d);}
void main(){
 vec2 p=V;
 vec2 wp=p+vec2(tb(p,5.),tb(p+.31,5.))*.035;
 float big=tb(wp,3.),mid=tb(wp,11.),fine=tb(wp,48.);
 float st=tb2(wp,vec2(5.,42.));float st2=tb2(wp+.17,vec2(12.,120.));
 float clot=smoothstep(.40,.72,big*.5+st*.55)*(.55+.6*mid);
 // nascent pans: rounded clots a hand or a plate wide, thick where the streaks gather
 float w1=wo(wp,34.),w2=wo(wp+.21,78.);
 float pres=smoothstep(.34,.62,st*.6+big*.5);
 float b1=(1.-smoothstep(.16,.48,w1))*pres;
 float b2=(1.-smoothstep(.14,.46,w2))*smoothstep(.3,.6,mid*.5+st2*.5);
 float rim1=smoothstep(.2,.36,w1)*(1.-smoothstep(.36,.5,w1))*pres;
 float h=.25*big+.18*mid+.05*fine+.08*st2+b1*.13+rim1*.04+b2*.06;
 float dens=clamp(clot*.62+b1*.55+b2*.34+(st2-.5)*.6+(fine-.5)*.3+.12,0.,1.);
 float m=clamp(h,0.,.998)*255.;
 O=vec4(floor(m)/255.,fract(m),dens,1.);
}`,er=J+`uniform sampler2D uT;uniform vec4 uD;in vec2 V;layout(location=0) out vec4 O;
float hh(vec2 u){vec4 t=texture(uT,u);return (t.r*255.+t.g)/255.;}
void main(){
 vec2 e=uD.xy;
 float hx=hh(V+vec2(e.x,0.))-hh(V-vec2(e.x,0.)),hy=hh(V+vec2(0.,e.y))-hh(V-vec2(0.,e.y));
 hx+=.5*(hh(V+vec2(e.x,e.y))-hh(V+vec2(-e.x,e.y))+hh(V+vec2(e.x,-e.y))-hh(V+vec2(-e.x,-e.y)));
 hy+=.5*(hh(V+vec2(e.x,e.y))-hh(V+vec2(e.x,-e.y))+hh(V+vec2(-e.x,e.y))-hh(V+vec2(-e.x,-e.y)));
 vec2 sl=vec2(hx,hy)*.25/uD.z;
 vec2 v=sign(sl)*sqrt(min(abs(sl)/8.,1.));
 O=vec4(hh(V),texture(uT,V).b,v*.5+.5);
}`;function Ft(t,e,i){const s=t.createProgram();for(const[v,A]of[[t.VERTEX_SHADER,e],[t.FRAGMENT_SHADER,i]]){const y=t.createShader(v);t.shaderSource(y,A),t.compileShader(y),t.attachShader(s,y),s._l=s._l||[],s._l.push(y)}return t.bindAttribLocation(s,0,"aP"),t.linkProgram(s),s}function to(t,e,i){if(!t.getProgramParameter(e,t.LINK_STATUS))throw new Error("273 "+i+": "+t.getProgramInfoLog(e)+e._l.map(y=>t.getShaderInfoLog(y)).join(" "));e._l.forEach(y=>t.deleteShader(y));const s={},v=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let y=0;y<v;y++){const D=t.getActiveUniform(e,y);s[D.name]=t.getUniformLocation(e,D.name)}const A=t.getUniformBlockIndex(e,"F");return A!==t.INVALID_INDEX&&A!==4294967295&&t.uniformBlockBinding(e,A,0),e.u=s,e}function Wt(t,e,i,s){const v=t.createTexture();return t.bindTexture(t.TEXTURE_2D,v),s.mips?t.texStorage2D(t.TEXTURE_2D,s.mips,t.RGBA8,e,i):t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,e,i,0,t.RGBA,t.UNSIGNED_BYTE,s.data||null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,s.mips?t.LINEAR_MIPMAP_LINEAR:s.filter||t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,s.filter||t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,s.wrap||t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,s.wrap||t.CLAMP_TO_EDGE),v}function ta(t,e,i){const s=i.length,v=new Float32Array((e+1)*s*4),A=[];let y=0;for(let q=0;q<s;q++)for(let Y=0;Y<=e;Y++){const C=Y/e,G=C*et;v[y++]=Math.cos(G),v[y++]=Math.sin(G),v[y++]=i[q],v[y++]=C}for(let q=0;q<s-1;q++)for(let Y=0;Y<e;Y++){const C=q*(e+1)+Y,G=C+1,V=C+e+1,Q=V+1;A.push(C,V,G,G,V,Q)}const D=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,D),t.bufferData(t.ARRAY_BUFFER,v,t.STATIC_DRAW);const w=t.createBuffer();return t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,w),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(A),t.STATIC_DRAW),{vb:D,ib:w,n:A.length}}function Le(t,e,i){const s=t.createVertexArray();t.bindVertexArray(s),t.bindBuffer(t.ARRAY_BUFFER,e.vb),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,16,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.ib),t.bindBuffer(t.ARRAY_BUFFER,i);for(let v=0;v<3;v++)t.enableVertexAttribArray(1+v),t.vertexAttribPointer(1+v,4,t.FLOAT,!1,48,v*16),t.vertexAttribDivisor(1+v,1);return t.bindVertexArray(null),s}const eo=(()=>{let t=1511506897;const e=()=>{t=t+1831565813|0;let v=Math.imul(t^t>>>15,1|t);return v=v+Math.imul(v^v>>>7,61|v)^v,((v^v>>>14)>>>0)/4294967296},i=[],s=[[1,.9,.62,0,0,1],[1.2,.3,.7,0,0,1.1],[.85,1,.55,0,0,.9],[1.3,.6,.66,.9,0,1.25],[.55,.7,.6,0,0,.7],[.42,1,.72,.5,0,.65],[1.05,.4,.6,1,0,1.35],[1,0,0,0,1,2.4]];for(let v=0;v<8;v++){const A=s[v],y=[],D=[];for(let w=0;w<8;w++)y.push((e()*.75+.25)*A[5]*.135/Math.pow($a[w],.92)*(w===0?.6:1)),D.push(e()*et);i.push({rim:A[0],ghost:A[1],ringAt:A[2],seam:A[3],chunk:A[4],a:y,f:D,sx:e()*200+10,sy:e()*200+10})}return i})(),Ua=eo.map(t=>{const e=new Float32Array(128);for(let i=0;i<128;i++){const s=i/128*et;let v=1;for(let A=0;A<8;A++)v+=t.a[A]*Math.cos($a[A]*s+t.f[A]);e[i]=v}return e});function Pa(t,e,i,s,v){const A=e.p;v&&(t.bindVertexArray(e.empty),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,i));const y=t.getExtension("EXT_texture_filter_anisotropic"),D=Wt(t,s,s,{filter:t.NEAREST,wrap:t.REPEAT});t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,D,0),t.viewport(0,0,s,s),t.useProgram(A.bg),t.bindTexture(t.TEXTURE_2D,e.noise),t.uniform1i(A.bg.u.uN,0),t.drawArrays(t.TRIANGLES,0,3);const w=Wt(t,s,s,{mips:Math.log2(s)+1,wrap:t.REPEAT});return t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,w,0),t.useProgram(A.de),t.bindTexture(t.TEXTURE_2D,D),t.uniform1i(A.de.u.uT,0),t.uniform4f(A.de.u.uD,1/s,1/s,2.2/s,0),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,w),t.generateMipmap(t.TEXTURE_2D),y&&t.texParameterf(t.TEXTURE_2D,y.TEXTURE_MAX_ANISOTROPY_EXT,16),t.deleteTexture(D),w}function ar(t,e){if(e.tileT)return e.tileT;const i=t.createFramebuffer(),s=Pa(t,e,i,512,!0),v=Wt(t,512,384,{});return t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,v,0),t.bindFramebuffer(t.FRAMEBUFFER,null),e.tileT={grease:s,map:v,mapFb:i,mw:512,mh:384}}function or(t,e){return e.grease||(e.grease=Pa(t,e,e.mapFb,Qa,!0),e.map=Wt(t,1024,768,{}),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e.map,0),t.bindFramebuffer(t.FRAMEBUFFER,null)),e.bigT||(e.bigT={grease:e.grease,map:e.map,mapFb:e.mapFb,mw:1024,mh:768})}function rr(t,e){const i={fb:{}},s=i.p={pan:Ft(t,Wo,Ho),sea:Ft(t,Yo,Go),sky:Ft(t,pe.replace("p*2.-1.,0.,1.","p*2.-1.,.99999,1."),Zo),map:Ft(t,Ko,go),dot:Ft(t,Qo,$o),out:Ft(t,pe,Ja),bp:Ft(t,pe,Jo),bg:Ft(t,pe,tr),de:Ft(t,pe,er)};for(const P in s)to(t,s[P],P);let v=461845907;const A=new Uint8Array(256*256*4);for(let P=0;P<A.length;P++)v=Math.imul(v^v>>>13,1540483477)+1013904242|0,A[P]=(v^v>>>15)&255;i.noise=t.createTexture(),t.bindTexture(t.TEXTURE_2D,i.noise),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,A),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const y=new Uint8Array(128*8*4);for(let P=0;P<8;P++)for(let E=0;E<128;E++){const _t=Math.max(0,Math.min(255,Math.round((Ua[P][E]-.6)/.8*255)));y[(P*128+E)*4]=_t}i.rad=t.createTexture(),t.bindTexture(t.TEXTURE_2D,i.rad),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,128,8,0,t.RGBA,t.UNSIGNED_BYTE,y),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const D=t.createVertexArray();i.empty=D;const w=t.createFramebuffer();t.bindVertexArray(D),t.disable(t.DEPTH_TEST),t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!0);const q=t.getExtension("EXT_texture_filter_anisotropic"),Y=se*Vo,C=se*Xo,G=Math.floor(Math.log2(Y))+1,V=Wt(t,Y,C,{filter:t.NEAREST});t.bindFramebuffer(t.FRAMEBUFFER,w),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,V,0),t.useProgram(s.bp),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,i.noise),t.uniform1i(s.bp.u.uN,0);for(let P=0;P<8;P++){const E=eo[P],_t=P%4*se,be=(P>>2)*se;t.viewport(_t,be,se,se),t.uniform4f(s.bp.u.uA0,E.a[0],E.a[1],E.a[2],E.a[3]),t.uniform4f(s.bp.u.uA1,E.a[4],E.a[5],E.a[6],E.a[7]),t.uniform4f(s.bp.u.uF0,E.f[0],E.f[1],E.f[2],E.f[3]),t.uniform4f(s.bp.u.uF1,E.f[4],E.f[5],E.f[6],E.f[7]),t.uniform4f(s.bp.u.uS,E.sx,E.sy,E.rim,E.ghost),t.uniform4f(s.bp.u.uK,E.chunk,E.ringAt,E.seam,0),t.drawArrays(t.TRIANGLES,0,3)}i.atlas=Wt(t,Y,C,{mips:G}),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i.atlas,0),t.viewport(0,0,Y,C),t.useProgram(s.de),t.bindTexture(t.TEXTURE_2D,V),t.uniform1i(s.de.u.uT,0),t.uniform4f(s.de.u.uD,1/Y,1/C,ve/se,0),t.drawArrays(t.TRIANGLES,0,3),t.bindTexture(t.TEXTURE_2D,i.atlas),t.generateMipmap(t.TEXTURE_2D),q&&t.texParameterf(t.TEXTURE_2D,q.TEXTURE_MAX_ANISOTROPY_EXT,8),e||(i.grease=Pa(t,i,w,Qa)),t.deleteTexture(V),i.mapFb=w,e||(i.map=Wt(t,1024,768,{}),t.bindFramebuffer(t.FRAMEBUFFER,w),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i.map,0)),t.bindFramebuffer(t.FRAMEBUFFER,null);const Q=[0,.22,.4,.55,.66,.73,.78,.82,.85,.875,.9,.925,.945,.965,.985,1,1.03,1.07],lt=[0,.45,.75,.9,1,1.03,1.07,1.2,1.4,1.6];i.hi=ta(t,96,Q),i.lo=ta(t,26,lt),i.mid=ta(t,40,[0,.5,.75,.86,.92,.96,1,1.03,1.07]),i.near=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,i.near),t.bufferData(t.ARRAY_BUFFER,(za+ka)*48,t.DYNAMIC_DRAW),i.far=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,i.far),t.bufferData(t.ARRAY_BUFFER,Je*48,t.DYNAMIC_DRAW),i.vHiNear=Le(t,i.hi,i.near),i.vLoNear=Le(t,i.lo,i.near),i.vLoFar=Le(t,i.lo,i.far),i.vMidFar=Le(t,i.mid,i.far),i.fl=ta(t,14,[0,.7,.93,1,1.06]),i.vFlFar=Le(t,i.fl,i.far);const vt=120,st=190,it=new Uint32Array(vt*st*6);let ct=0;for(let P=0;P<st;P++)for(let E=0;E<vt;E++){const _t=P*(vt+1)+E,be=_t+1,Pt=_t+vt+1,rt=Pt+1;it[ct++]=_t,it[ct++]=be,it[ct++]=Pt,it[ct++]=be,it[ct++]=rt,it[ct++]=Pt}return i.seaIB=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,i.seaIB),t.bufferData(t.ELEMENT_ARRAY_BUFFER,it,t.STATIC_DRAW),i.seaN=it.length,i.sea={},ao(t,i,Da.low),i.dots=t.createBuffer(),t.bindBuffer(t.ARRAY_BUFFER,i.dots),t.bufferData(t.ARRAY_BUFFER,64*16,t.DYNAMIC_DRAW),i.vDots=t.createVertexArray(),t.bindVertexArray(i.vDots),t.bindBuffer(t.ARRAY_BUFFER,i.dots),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,16,0),t.bindVertexArray(null),i.ubo=t.createBuffer(),t.bindBuffer(t.UNIFORM_BUFFER,i.ubo),t.bufferData(t.UNIFORM_BUFFER,196*4,t.DYNAMIC_DRAW),i}const ea=(t,e,i,s,v,A,y,D=-1.25)=>{const w={key:t,h:e,th:i,pitch:s,roll:v,top:A,gp:y,bot:D},q=Math.sin(s),Y=Math.cos(s),C=(Q,lt)=>{const vt=-q+lt*i*Y,st=e/-Math.min(vt,-9e-4);return[Q*i*st,(Y+lt*i*q)*st]},G=C(1,-1),V=C(1,Math.min(A,1));if(w.zBot=G[1],w.zTop=V[1],t==="low")w.zn=11.2,w.zf=38,w.wa=.165,w.wb=1.6,w.mapN=Bo,w.mapF=Lo,w.mapKX=Io,w.fore=3.4,w.gz0=6,w.zmax=560;else{const Q=(V[0]-G[0])/(V[1]-G[1]);w.wa=Q,w.wb=G[0]-Q*G[1]+1.4,w.zn=Math.max(.8,G[1]-1.6),w.zf=V[1]+2.5,w.mapN=Math.max(.7,G[1]*.45),w.mapF=V[1]*1.6+8;const lt=C(1.25,-1.25);w.mapKX=Math.max(.9,lt[0]/Math.max(lt[1],w.mapN)*1.08),w.fore=1/q,w.gz0=-1,w.zmax=V[1]+6}return w},Da={low:ea("low",Do,je,Math.atan(ga*je),Be,ga-.002,1.25),rail0:ea("rail0",9,.42,36*Math.PI/180,0,1.25,1.1),rail1:ea("rail1",8,.42,44*Math.PI/180,0,1.25,1.1),rail2:ea("rail2",7,.42,52*Math.PI/180,0,1.25,1.1)};function ao(t,e,i){if(e.sea[i.key])return e.sea[i.key];const s=[0,-Math.sin(i.pitch),Math.cos(i.pitch)],v=[0,Math.cos(i.pitch),Math.sin(i.pitch)],A=120,y=190,D=new Float32Array((A+1)*(y+1)*2);let w=0;for(let C=0;C<=y;C++){const G=C/y,V=i.bot+(i.top-i.bot)*(1-Math.pow(1-G,i.gp));for(let Q=0;Q<=A;Q++){const lt=(Q/A*2-1)*1.22,vt=s[1]+V*i.th*v[1],st=s[2]+V*i.th*v[2],it=-i.h/Math.min(vt,-9e-4);D[w++]=lt*i.th*it,D[w++]=Math.min(st*it,3800)}}const q=t.createVertexArray();t.bindVertexArray(q);const Y=t.createBuffer();return t.bindBuffer(t.ARRAY_BUFFER,Y),t.bufferData(t.ARRAY_BUFFER,D,t.STATIC_DRAW),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,8,0),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.seaIB),t.bindVertexArray(null),e.sea[i.key]=q}function nr(t,e,i){let s=e.fb[i];if(s)return s;const v=Wt(t,i,i,{}),A=t.createTexture();t.bindTexture(t.TEXTURE_2D,A),t.texStorage2D(t.TEXTURE_2D,1,t.DEPTH_COMPONENT24,i,i);const y=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,y),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,v,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,A,0),t.bindFramebuffer(t.FRAMEBUFFER,null),e.fb[i]={t:v,d:A,fb:y}}Za.add({num:273,name:"Pancake Ice",fam:"Worlds",recipe:"A polar sea freezing in a long swell, where rimmed discs of young ice bump around on real waves in a slushy soup. The size of the pans, how packed they are and the swell change every mint. Drag to send a swell through (faster for longer waves), hold to chill so the pans grow and climb onto each other, or tap a pan so it dips and takes the sea over its rim.",interactive:"Drag to send a swell through the pack, faster for longer waves; hold to chill so pans grow and raft; tap to prod a pan so it dips, takes the sea over its rim and rocks its neighbours.",music:!0,gl:!0,fps:30,seed:0,make(t){const e=t.gl,i=t.size;let s=Ka.get(e);s||(s=rr(e,!!t.tile),Ka.set(e,s));const v=nr(e,s,i),A=t.tile?ar(e,s):or(e,s);let y=0;for(let o=2;o<t.hash.length;o++)y=Math.imul(y^parseInt(t.hash[o],16),16777619)+(o*2654435761>>>0)|0;const D=()=>{y=y+1831565813|0;let o=Math.imul(y^y>>>15,1|y);return o=o+Math.imul(o^o>>>7,61|o)^o,((o^o>>>14)>>>0)/4294967296},w=(o,c,l)=>{let u=D(),m=c[c.length-1];for(const r of c){if(u<r[1]){m=r;break}u-=r[1]}return t.home&&l&&(m=c.find(r=>r[0]===l)),t.trait(o,m[0]),m},q=w("Pans",[["Mixed",.52,.84,.25],["Small",.22,.62,.2],["Broad",.18,1.04,.22],["One giant",.08,.66,.22]],"Mixed"),Y=w("Pack",[["Close",.52,.63],["Loose",.3,.5],["Jammed",.18,.74]],"Close"),C=w("Swell",[["Long",.5],["Crossed",.26],["In sets",.15],["Heavy",.09]],"Long"),G=w("Grease",[["Frazil streaks",.52,.55,0],["Thick slush",.28,1,0],["Dark nilas",.2,.25,1]],"Frazil streaks"),V=w("Light",[["Pink low sun",.5],["Apricot",.22],["Sun on the line",.18],["Afterglow",.1]],"Pink low sun"),Q=w("Rims",[["Crusted",.5,[0,1,2,3,6],.135],["Soft",.24,[4,5,0,2],.1],["Heavy",.18,[1,3,6,1],.19],["Snow dusted",.08,[0,2,3,6],.14]],"Crusted"),lt=w("Ice",[["Clean",.84,0],["Algae stained",.12,.85],["Blue old ice",.04,0]],"Clean"),vt=w("Air",[["Clear",.66,1],["Haze",.24,1.8],["Sea smoke",.1,1.4]],"Clear"),st=vt[0]==="Sea smoke"?1:0,it=Q[0]==="Snow dusted"?1:0;st&&!s.p.outS&&(s.p.outS=to(e,Ft(e,pe,J+`#define SMOKE
`+Ja.slice(J.length)),"outS"));const ct=st?s.p.outS:s.p.out;let P=729683222;for(let o=2;o<t.hash.length;o++)P=Math.imul(P^parseInt(t.hash[o],16),1540483477)^P>>>13;const E=()=>(P=Math.imul(P^P>>>16,2146121005),P=Math.imul(P^P>>>15,2221713035),P^=P>>>16,(P>>>0)/4294967296),_t=E(),be=E();let Pt=t.home?"None":be<.2?"Open water":_t<.58?"None":_t<.9?"Open lead":"Two leads";t.trait("Lead",Pt);const rt=[];let we=1013904244;for(let o=2;o<t.hash.length;o++)we=Math.imul(we^parseInt(t.hash[o],16),2246822507)+668265263|0;const Ae=()=>{we=we+2135587861|0;let o=Math.imul(we^we>>>16,73244475);return o=Math.imul(o^o>>>15,739982445),((o^o>>>15)>>>0)/4294967296},oo=[Ae(),Ae(),Ae(),Ae(),Ae(),Ae()],St=!t.home&&oo[0]<.28&&!st,g=St?Da["rail"+Math.min(2,oo[1]*3|0)]:Da.low;t.trait("View",St?"From the rail":"Low over the ice");const sr=ao(e,s,g),Te=!1;Te&&(t.trait("Air","Snowing"),t.trait("Light","Overcast"));const Ie=Math.PI/180;let ie,Ee,Dt,ce,Ht,Yt,Gt,ye,Bt,Re;V[0]==="Pink low sun"?(ie=-44,Ee=10,Dt=[1,.64,.34],ce=3.8,Ht=[.98,.72,.62],Yt=[.21,.36,.71],Gt=[.4,.17,.07],ye=9,Bt=[.56,.6,.7],Re=160):V[0]==="Apricot"?(ie=52,Ee=13,Dt=[1,.74,.4],ce=3.9,Ht=[.98,.82,.62],Yt=[.15,.31,.72],Gt=[.3,.17,.05],ye=7,Bt=[.58,.63,.73],Re=220):V[0]==="Sun on the line"?(ie=-3.5,Ee=.72,Dt=[1,.42,.2],ce=3,Ht=[.98,.55,.36],Yt=[.3,.34,.56],Gt=[1,.45,.19],ye=1500,Bt=[.76,.57,.51],Re=120):(ie=110,Ee=-2,Dt=[.9,.6,.7],ce=.001,Ht=[1.05,.64,.68],Yt=[.34,.45,.8],Gt=[.12,.04,.08],ye=3,Bt=[.44,.48,.64],Re=200),Te&&(ie=-40,Ee=30,Dt=[.16,.16,.17],ce=.05,Ht=[1.02,1.04,1.08],Yt=[1,1.03,1.08],Gt=[0,0,0],ye=3,Bt=[1.02,1.04,1.08],Re=60);const aa=Math.max(Ee,.3)*Ie,Ba=[Math.sin(ie*Ie)*Math.cos(aa),Math.sin(aa),Math.cos(ie*Ie)*Math.cos(aa)],ir=Math.tan(aa),La=g.pitch,ro=Math.sin(La),no=Math.cos(La),ut=g.roll,Zt=g.th,Lt=[0,-ro,no],Me=[0,no,ro],Fe=[1,0,0],Ce=[Fe[0]*Math.cos(ut)+Me[0]*Math.sin(ut),Fe[1]*Math.cos(ut)+Me[1]*Math.sin(ut),Fe[2]*Math.cos(ut)+Me[2]*Math.sin(ut)],Oe=[Me[0]*Math.cos(ut)-Fe[0]*Math.sin(ut),Me[1]*Math.cos(ut)-Fe[1]*Math.sin(ut),Me[2]*Math.cos(ut)-Fe[2]*Math.sin(ut)],_e=[0,g.h,0],oa=5,ra=4200,na=1/Zt,Ia=(o,c)=>o[0]*c[0]+o[1]*c[1]+o[2]*c[2],It=new Float32Array(16);{const o=-Ia(Ce,_e),c=-Ia(Oe,_e),l=-Ia(Lt,_e),u=(ra+oa)/(ra-oa),m=-2*ra*oa/(ra-oa);for(let r=0;r<3;r++)It[r*4]=na*Ce[r],It[r*4+1]=na*Oe[r],It[r*4+2]=u*Lt[r],It[r*4+3]=Lt[r];It[12]=na*o,It[13]=na*c,It[14]=u*l+m,It[15]=l}const sa=(o,c)=>{const l=2*o-1,u=1-2*c;let m=Lt[0]+l*Zt*Ce[0]+u*Zt*Oe[0],r=Lt[1]+l*Zt*Ce[1]+u*Zt*Oe[1],n=Lt[2]+l*Zt*Ce[2]+u*Zt*Oe[2];r=Math.min(r,-.05);const a=-g.h/r;return[m*a,n*a]},Ct=[],Z=(o,c,l)=>{const u=et/o,m=c*Ie;Ct.push({kx:u*Math.sin(m),kz:u*Math.cos(m),a:l,w:Math.sqrt(ne*u),ph:D()*et})},K=188+D()*40;C[0]==="Long"?(Z(30+D()*6,K,.3),Z(18.5+D()*3,K+16,.085),Z(11+D()*2,K-24,.04),Z(6.8,K+41,.014),Z(4.3,K-58,.006)):C[0]==="Crossed"?(Z(24+D()*3,K,.15),Z(19+D()*3,K+62+D()*18,.13),Z(10,K-30,.032),Z(6.4,K+25,.014),Z(4.1,K-70,.006)):C[0]==="In sets"?(Z(25,K,.15),Z(22.2,K+2.5,.145),Z(12,K-18,.03),Z(6.5,K+44,.014),Z(4.2,K-44,.006)):(Z(40+D()*8,K,.5),Z(24,K+13,.14),Z(13,K-21,.055),Z(7.5,K+30,.02),Z(4.6,K-50,.008));const M=za,S=new Float32Array(M),_=new Float32Array(M),pt=new Float32Array(M),bt=new Float32Array(M),nt=new Float32Array(M),Ot=new Float32Array(M),Ve=new Float32Array(M),Vt=new Float32Array(M),Kt=new Float32Array(M),gt=new Float32Array(M),Qt=new Float32Array(M),$t=new Float32Array(M),z=new Float32Array(M),Xe=new Float32Array(M),Xt=new Float32Array(M),Se=new Float32Array(M),wt=new Float32Array(M),qe=new Uint8Array(M),at=new Uint8Array(M),We=new Uint8Array(M),Ca=new Int16Array(M).fill(-1),so=new Float32Array(M),io=new Float32Array(M),co=new Float32Array(M),ze=new Float32Array(M),ke=new Float32Array(M),fo=new Float32Array(M),jt=new Float32Array(M),Jt=new Float32Array(M),ia=new Float32Array(M),ca=new Float32Array(M),fa=new Float32Array(M),lo=new Float32Array(M),uo=new Float32Array(M),mo=new Float32Array(M),ho=new Float32Array(M),Ne=new Float32Array(M),T=D,te=q[2],xo=q[3],He=Y[2],fe=St&&Q[2].some(o=>o!==3&&o!==6)?Q[2].filter(o=>o!==3&&o!==6):Q[2],la=Q[3],ua=q[0]==="One giant",At=g.zn;let mt=g.zf;{const o=l=>2*(g.wa*.5*(l*l-At*At)+g.wb*(l-At)),c=Math.PI*te*te*1.12;for(;mt>(St?At+6:22)&&o(mt)*He/c>128;)mt-=.5}const Ue=o=>g.wa*o+g.wb;let I=0;const Oa=o=>{wt[o]=z[o]*z[o]*(.5+Xt[o])*(1+We[o]*.35)},Va=(o,c,l,u,m)=>{if(I>=M)return-1;const r=I++;return S[r]=o,_[r]=c,z[r]=l,Xe[r]=Math.min(1.9,Math.max(l*1.75,.55)),qe[r]=u,Xt[r]=m,nt[r]=T()*et,Ot[r]=(T()-.5)*.05,Oa(r),r},cr=o=>la*(.85+.3*T())*Math.pow(o/.84,.55);{const o=ua?1.95:Math.min(1.32,te*1.5);let c=ua?18.5:17.5+T()*.9,l=(T()<.5?-1:1)*(ua?.55:.62+T()*.3)*(t.home?-1:1);if(St){const u=sa(.5+l*.14,.7);l=u[0],c=u[1]}Va(l*(t.home,1),c,o,fe[0],(ua?1.2:1.05)*la*Math.pow(o/.84,.55))}if(Pt!=="None"){const o=S[0]>0?1:-1;rt.push([-o*(1.5+E()*1.4),o*(.05+E()*.09),.55+E()*.5,50]),Pt==="Open water"&&(rt.length=0,rt.push([-o*(3.4+E()*1.2)*(St?.6:1),o*(.16+E()*.1),(2.3+E()*.8)*(St?.55:1),150])),Pt==="Two leads"&&rt.push([o*(3.2+E()*1.5),-o*(.07+E()*.07),.35+E()*.3,40])}const le=rt.length,vo=(o,c)=>{const l=Math.min(1,Math.max(0,(c-o[3])/(o[3]*1.2)));return 1-l*l*(3-2*l)},Xa=(o,c)=>o[0]+o[1]*(c-15)+o[2]*1.6*Math.sin((c-15)*.019+o[0]),po=(o,c,l)=>{for(let u=0;u<le;u++){const m=rt[u];if(Math.abs(o-Xa(m,c))<(m[2]+l*.3)*vo(m,c))return!0}return!1},Ye=te*2.02*Math.sqrt(.8/He)*.92;for(let o=At-.5;o<mt&&I<134;o+=Ye*.86){const c=Ue(o);for(let l=-c+T()*Ye*.5;l<c&&!(I>=152);l+=Ye*(.92+T()*.2)){const u=Math.max(.24,te*Math.exp((T()+T()-1)*xo*2.2));if(Math.hypot(l-S[0],o-_[0])<z[0]+u*.8||le&&po(l,o,u))continue;const m=fe[T()*fe.length|0];Va(l+(T()-.5)*Ye*.3,o+(T()-.5)*Ye*.3,u,m,cr(u))}}const yr=I;for(let o=0;o<22;o++){const c=1.03+(.74-He)*.55;for(let l=0;l<I;l++)for(let u=l+1;u<I;u++){const m=S[u]-S[l],r=_[u]-_[l],n=(z[l]+z[u])*1.03*c;if(m>n||m<-n||r>n||r<-n)continue;const a=m*m+r*r;if(a>=n*n)continue;const f=Math.sqrt(a)+1e-4,d=(n-f)*.5/f,p=l===0?0:1,x=1;S[l]-=m*d*p,_[l]-=r*d*p,S[u]+=m*d*(2-p),_[u]+=r*d*(2-p)}}{let o=0;for(let c=0;c<I;c++)o=Math.max(o,_[c]+z[c]*.3);mt=Math.min(mt,o)}let Tt=-1;if(lt[0]==="Blue old ice"){let o=1e9;const c=(S[0]>0?-1:1)*1.1,l=20.5;for(let u=1;u<I;u++){const m=Math.hypot(S[u]-c,_[u]-l);m<o&&(o=m,Tt=u)}qe[Tt]=7,z[Tt]=Math.max(z[Tt],.86),Xt[Tt]=.78,z[Tt]*=.92,Oa(Tt),wt[Tt]*=2.5,Xe[Tt]=z[Tt]}const ot=new Float32Array(Je*12);let ee=0,ae=0;{let o=mt+1.1;for(;o<g.zmax&&ee<Je;){const c=1+Math.max(0,o-55)*.03*Math.min(1.5,.84/te),l=te*2.1*c*Math.sqrt(.8/He),u=Ue(o)+.2;for(let m=-u+T()*l;m<u&&ee<Je;m+=l*(.9+T()*.3)){const r=te*c*Math.exp((T()+T()-1)*xo*2.2),n=T()*et,a=ee*12;ot[a]=m+(T()-.5)*l*.4,ot[a+1]=0,ot[a+2]=o+(T()-.5)*l*.55,ot[a+3]=r,ot[a+4]=Math.cos(n),ot[a+5]=Math.sin(n),ot[a+6]=0,ot[a+7]=0,ot[a+8]=la*Math.pow(r/.84,.55),ot[a+9]=0,ot[a+10]=fe[T()*fe.length|0],ot[a+11]=1,!(le&&po(ot[a],ot[a+2],r))&&ee++}o<64&&(ae=ee),o+=l*.8}}const fr=()=>{e.bindBuffer(e.ARRAY_BUFFER,s.far),e.bufferSubData(e.ARRAY_BUFFER,0,ot,0,ee*12)},ft=[],Et=[],ht=[],Ge=64,dt=new Float32Array(Ge*4),ue=new Float32Array(Ge*3);let lr=0,ma=0;const ha=(o,c,l,u,m)=>{for(let r=0;r<u;r++){const n=lr++%Ge,a=T()*et,f=m*(.3+T());dt[n*4]=o+Math.cos(a)*.12,dt[n*4+1]=c,dt[n*4+2]=l+Math.sin(a)*.12,dt[n*4+3]=.55+T()*.55,ue[n*3]=Math.cos(a)*f*.6,ue[n*3+1]=m*(.8+T()*1.2),ue[n*3+2]=Math.sin(a)*f*.6}ma=1},bo=(o,c,l,u,m,r,n)=>{ft.length>=6&&ft.shift();const a=et/m,f=Math.sqrt(ne*a),d=Math.hypot(l,u)||1,p=l/d,x=u/d;ft.push({x:o,z:c,ux:p,uz:x,k:a,w:f,A:r,A0:r,tau:0,sa:1/(m*m*1.5),sc:1/(n*n),al:.0022+9e-4*a*a*m*.35+.012*a*a})},wo=(o,c,l,u)=>{Et.length>=4&&Et.shift();const m=et/u,r=Math.sqrt(ne*m);Et.push({x:o,z:c,A:l,k:m,w:r,tau:0,sg:1/(u*u*.9)})};let da=0,qa=2+T()*3;const ur=(o,c,l,u,m)=>{if(da<=0)return;const r=Math.min(1,l*1.6*(.4+14/m));if(r<.04)return;da-=.07;const n=Math.min(z[o],z[c]),a=Math.max(-.8,Math.min(.8,u/Ue(m))),f=(2100+1500*T())*(.7+.3/Math.max(.3,n));t.sound.note(0,{freq:f,dur:.05+.12*r,vel:r*.55,wave:"sine",pan:a,attack:.002}),t.sound.note(0,{freq:f*(2.41+T()*.5),dur:.03+.05*r,vel:r*.22,wave:"sine",pan:a,attack:.001}),t.sound.hit("noise",r*.4,{cutoff:1300+900*T(),dur:.06+.06*r,pan:a})},Ao=3.3,mr=-14,hr=g.gz0,me=9,xa=13,Ze=new Int16Array(me*xa),va=new Int16Array(M),dr=(o,c,l,u)=>{at[o]=2,Ca[o]=c,ze[o]=0,We[c]++;const m=Math.cos(nt[c]),r=Math.sin(nt[c]),n=S[o]-S[c],a=_[o]-_[c];so[o]=m*n+r*a,io[o]=-r*n+m*a,co[o]=nt[o]-nt[c],ke[o]=Math.hypot(n,a)||1;const f=Math.max(.3*z[c],Math.min(ke[o],z[c]+z[o]*.33));fo[o]=f/ke[o],wt[c]+=wt[o]*.8,Vt[c]-=.35,Qt[c]+=(S[o]-S[c])/ke[o]*.1,$t[c]+=(_[o]-_[c])/ke[o]*.1,z[c]=Math.min(Xe[c],z[c]+z[o]*.05),Se[o]=Math.max(Se[o],.2);const d=.5,p=Math.max(-.8,Math.min(.8,S[c]/Ue(_[c])));t.sound.hit("noise",d*.8,{cutoff:340,dur:.55,pan:p}),t.sound.note(0,{freq:150+T()*80,dur:.35,vel:.34,wave:"triangle",pan:p,cutoff:500,attack:.03}),ha(S[o],Wa(c)+.05,_[o],4,.5)},Wa=o=>ia[o]+Ve[o],xr=o=>{const c=1-Math.exp(-3*o),l=1-Math.exp(-.75*o);for(let r=0;r<I;r++){if(at[r])continue;const n=c/(1+3*We[r]*0);let a=0,f=0;const d=S[r],p=_[r],x=Ue(p);a-=d/x*.05,f-=(p-(At+mt)*.5)/(mt-At)*.1,d>x?a-=(d-x)*3:d<-x&&(a-=(d+x)*3),p>mt?f-=(p-mt)*3:p<At&&(f-=(p-At)*3);for(let R=0;R<le;R++){const k=rt[R],N=d-Xa(k,p),U=(k[2]+z[r]*.3)*vo(k,p)-Math.abs(N);U>0&&(a+=(N<0?-U:U)*2)}pt[r]+=a*o+(lo[r]-pt[r])*n,bt[r]+=f*o+(uo[r]-bt[r])*n,pt[r]-=ca[r]*ne*.012*o,bt[r]-=fa[r]*ne*.012*o,Ot[r]-=Ot[r]*l}Ze.fill(-1);for(let r=0;r<I;r++){if(at[r])continue;const n=Math.max(0,Math.min(me-1,(S[r]-mr)/Ao|0)),a=Math.max(0,Math.min(xa-1,(_[r]-hr)/Ao|0)),f=a*me+n;va[r]=Ze[f],Ze[f]=r}for(let r=0;r<xa;r++)for(let n=0;n<me;n++)for(let a=Ze[r*me+n];a>=0;a=va[a]){for(let f=0;f<5;f++){const d=f===0?n:f===1?n+1:f===2?n-1:f===3?n:n+1,p=f===0||f===1?r:r+1;if(!(d<0||d>=me||p>=xa)){for(let x=f===0?va[a]:Ze[p*me+d];x>=0;x=va[x]){const R=S[x]-S[a],k=_[x]-_[a],N=z[a],U=z[x],F=(N+U)*1.17;if(R>F||R<-F||k>F||k<-F)continue;const b=R*R+k*k;if(b>F*F)continue;const W=Math.sqrt(b)+1e-5,O=R/W,B=k/W,j=Math.atan2(k,R),X=N*Ua[qe[a]][((j-nt[a])/et*128%128+128|0)%128],H=U*Ua[qe[x]][((j+Math.PI-nt[x])/et*128%128+128|0)%128],xt=X+H-W;if(xt<=0)continue;const tt=1/wt[a],$=1/wt[x],kt=tt+$,Rt=pt[a]-pt[x],re=bt[a]-bt[x],Mt=Rt*O+re*B,Fa=Math.min(xt*.35,.04)/kt;if(S[a]-=O*Fa*tt,_[a]-=B*Fa*tt,S[x]+=O*Fa*$,_[x]+=B*Fa*$,Mt>0){const qt=1.32*Mt/kt;pt[a]-=qt*O*tt,bt[a]-=qt*B*tt,pt[x]+=qt*O*$,bt[x]+=qt*B*$;const de=-B,xe=O,Uo=.5*wt[a]*N*N,Po=.5*wt[x]*U*U;let Nt=-(Rt*de+re*xe+Ot[a]*X+Ot[x]*H)/(kt+X*X/Uo+H*H/Po);const _a=qt*.42;Nt=Nt>_a?_a:Nt<-_a?-_a:Nt,pt[a]+=Nt*de*tt,bt[a]+=Nt*xe*tt,pt[x]-=Nt*de*$,bt[x]-=Nt*xe*$,Ot[a]+=Nt*X/Uo,Ot[x]+=Nt*H/Po;const De=qt*.34;Qt[a]+=O*De*tt*.9/N,$t[a]+=B*De*tt*.9/N,Qt[x]-=O*De*$*.9/U,$t[x]-=B*De*$*.9/U,Vt[a]-=De*tt*.22,Vt[x]-=De*$*.22,Mt>.36&&ur(a,x,Mt,S[a]+O*X,_[a]+B*X),Mt>.6&&_[a]<32&&ha(S[a]+O*X,Wa(a)+.08,_[a]+B*X,Mt>.6?3:1,.35+Mt*.5)}const No=Math.max(Ne[a],Ne[x]);if(xt>(No>.12?.05:.14)*Math.min(N,U)&&No>.12||Mt>1.05&&Math.min(N,U)<Math.max(N,U)*.72){const qt=N<U,de=qt?a:x,xe=qt?x:a;if(We[de]===0&&We[xe]<3&&z[de]<z[xe]*.92){dr(de,xe);break}}}if(at[a])break}}if(at[a])break}const u=Math.exp(-3.4*o),m=Math.exp(-2.6*o);for(let r=0;r<I;r++)at[r]!==1&&at[r]!==2&&(S[r]+=pt[r]*o,_[r]+=bt[r]*o,nt[r]+=Ot[r]*o,Vt[r]+=-Ve[r]*62*o,Ve[r]+=Vt[r]*o,Vt[r]*=u,Qt[r]+=-Kt[r]*44*o,$t[r]+=-gt[r]*44*o,Kt[r]+=Qt[r]*o,gt[r]+=$t[r]*o,Qt[r]*=m,$t[r]*=m,Kt[r]>.35?Kt[r]=.35:Kt[r]<-.35&&(Kt[r]=-.35),gt[r]>.35?gt[r]=.35:gt[r]<-.35&&(gt[r]=-.35))},To=o=>{const c=Ct.length,l=ft.length,u=Et.length;for(let m=0;m<I;m++){if(at[m]===2)continue;const r=S[m]-mo[m],n=_[m]-ho[m],a=1;let f=0,d=0,p=0,x=0,R=0,k=0,N=0;const U=n>25?3:c;for(let F=0;F<U;F++){const b=Ct[F],W=b.kx*r+b.kz*n+b.P,O=Math.cos(W),B=Math.sin(W),j=b.a,X=b.kl,H=j/(1+z[m]*z[m]*X*X*.5);f+=j*O,d-=b.kx*H*B,p-=b.kz*H*B;const xt=b.w*j*O;x+=b.kx/X*xt,R+=b.kz/X*xt,k-=b.kx/X*j*B,N-=b.kz/X*j*B}for(let F=0;F<l;F++){const b=ft[F],W=r-b.cx,O=n-b.cz,B=W*b.ux+O*b.uz,j=-W*b.uz+O*b.ux,X=B*B*b.sa+j*j*b.sc;if(X>9)continue;const H=b.Anow*Math.exp(-X),xt=b.ux*b.k,tt=b.uz*b.k,$=xt*W+tt*O+b.P,kt=Math.cos($),Rt=Math.sin($),re=H/(1+z[m]*z[m]*b.k*b.k*.5);f+=H*kt,d-=xt*re*Rt,p-=tt*re*Rt;const Mt=b.w*H*kt;x+=b.ux*Mt,R+=b.uz*Mt,k-=b.ux*H*Rt,N-=b.uz*H*Rt}for(let F=0;F<u;F++){const b=Et[F],W=r-b.x,O=n-b.z,B=Math.hypot(W,O)+.001,j=B-b.front,X=j*j*b.sg;if(X>9)continue;const H=b.Anow*Math.exp(-X)/Math.sqrt(1+B*.6),xt=b.k*B-b.P,tt=Math.cos(xt),$=Math.sin(xt),kt=W/B,Rt=O/B;f+=H*tt,d-=kt*b.k*H*$,p-=Rt*b.k*H*$;const re=b.w*H*tt;x+=kt*re,R+=Rt*re,k-=kt*H*$,N-=Rt*H*$}ia[m]=f,ca[m]=d*a,fa[m]=p*a,lo[m]=x,uo[m]=R,mo[m]=k,ho[m]=N}};let pa=!1,ba=0,Eo=0,yo=0,Ke=0,wa=0,Aa=0,ge=0,Qe=0,yt=null,Ta=0,Ea=0,ya=0;const Ro=(o,c)=>{const l=sa(o,c);let u=-1,m=1e9;for(let n=0;n<I;n++){if(at[n])continue;const a=Math.hypot(S[n]-l[0],_[n]-l[1]);a<z[n]*1.05&&a<m&&(m=a,u=n)}const r=Math.max(-.8,Math.min(.8,l[0]/Ue(Math.max(l[1],1))));if(u>=0){const n=z[u],a=l[0]-S[u],f=l[1]-_[u],d=Math.min(1.3,Math.sqrt(.7/wt[u]));Vt[u]-=1.1*d,Qt[u]-=a/n*.6*d,$t[u]-=f/n*.6*d,Ot[u]+=(T()-.5)*.3,Jt[u]=1,jt[u]=1;for(let p=0;p<I;p++){if(p===u||at[p])continue;const x=S[p]-S[u],R=_[p]-_[u],k=Math.hypot(x,R)+1e-4,N=(n+z[p])*1.55;if(k<N){const U=(1-k/N)*.55/Math.sqrt(wt[p]+.2);pt[p]+=x/k*U,bt[p]+=R/k*U,Vt[p]-=U*.25,Qt[p]+=x/k*U*.6,$t[p]+=R/k*U*.6}}wo(S[u],_[u],.04,2.8),ha(l[0],Wa(u)+.03,l[1],3,.35),t.sound.hit("kick",.26,{pan:r}),t.sound.note(0,{freq:95+T()*30,dur:.3,vel:.3,wave:"triangle",pan:r,cutoff:400,attack:.01}),t.sound.hit("noise",.45,{cutoff:650,dur:.7,pan:r})}else wo(l[0],Math.max(At,l[1]),.07,3.8),ha(l[0],.02,l[1],5,.55),t.sound.hit("noise",.6,{cutoff:480,dur:.8,pan:r}),t.sound.note(0,{freq:70,dur:.35,vel:.3,wave:"sine",pan:r,attack:.02})},vr=(o,c)=>{let l=null;for(const u of ht)Math.hypot(u.x-o,u.z-c)<1.6&&(l=u);return l||(ht.length>=ka&&ht.shift(),l={x:o,z:c,r:.8,s:0},ht.push(l)),l},L=new Float32Array((za+ka)*12),h=new Float32Array(196);h.set(It,0),h[16]=_e[0],h[17]=_e[1],h[18]=_e[2],h[20]=Ba[0],h[21]=Ba[1],h[22]=Ba[2],h[23]=ir,h[24]=Dt[0],h[25]=Dt[1],h[26]=Dt[2],h[27]=ce,h[28]=Ht[0],h[29]=Ht[1],h[30]=Ht[2],h[31]=Te?.0075:.001*vt[2],h[32]=Yt[0],h[33]=Yt[1],h[34]=Yt[2],h[35]=12.5,h[36]=Gt[0],h[37]=Gt[1],h[38]=Gt[2],h[39]=ye,h[40]=G[2],h[41]=G[3],h[42]=lt[2],h[43]=st,h[44]=Te?1:it,h[45]=1/Sa,h[46]=le,h[47]=Co,h[180]=Bt[0],h[181]=Bt[1],h[182]=Bt[2],h[183]=Re,h[184]=He,h[185]=Te?.93:0,h[186]=3,h[187]=12,h[54]=39e-5;for(let o=0;o<le;o++)h[188+o*4]=rt[o][0],h[189+o*4]=rt[o][1],h[190+o*4]=rt[o][2],h[191+o*4]=rt[o][3];const Mo=1/g.mapF,pr=1/g.mapN;h[48]=g.mapKX,h[49]=1/(pr-Mo),h[50]=Mo,h[51]=0,h[55]=i;const Ra=[Lt[0],Lt[1],Lt[2],La];let Pe=1759714724;for(let o=2;o<t.hash.length;o++)Pe=Math.imul(Pe^parseInt(t.hash[o],16),739982445)+695872825|0;const oe=()=>{Pe=Pe+2654435769|0;let o=Math.imul(Pe^Pe>>>16,569420461);return o=Math.imul(o^o>>>15,1935289751),((o^o>>>15)>>>0)/4294967296};let Fo=0,_o=0;if(le){const o=rt[0],c=o[3]*1.8;Fo=Xa(o,c)/c,_o=Pt==="Open water"?1:.6}const So=V[0]==="Sun on the line",$e=[Te?0:So?-1:1,.55+oe()*.45,Fo,_o],zt=t.home?[.42,.07,.72,.05]:[.3+oe()*.2,.05+oe()*.04,.62+oe()*.2,.04+oe()*.03];So&&($e[1]=.9,zt[0]=-.04-(zt[0]-.3)*.6,zt[1]=.07,zt[2]=.2+(zt[2]-.62)*.9,zt[3]=.05);const br=o=>1-Math.exp(-o*1.06),Ha=[0,1,2].map(o=>br(Bt[o]*.9+Dt[o]*ce*.07)),wr=St?0:Oo/1e3*i;let Ya=3+oe()*6,he=T()*200,Ga=3+T()*6,Ar=0;for(const o of Ct)o.kl=Math.hypot(o.kx,o.kz),o.tr=1;const Tr=()=>{e.bindBufferBase(e.UNIFORM_BUFFER,0,s.ubo),e.bindBuffer(e.UNIFORM_BUFFER,s.ubo),e.bufferSubData(e.UNIFORM_BUFFER,0,h),e.disable(e.SCISSOR_TEST),e.disable(e.CULL_FACE),e.disable(e.STENCIL_TEST),e.disable(e.DITHER),e.colorMask(!0,!0,!0,!0),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,A.mapFb),e.viewport(0,0,A.mw,A.mh),e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendEquation(e.MAX),e.blendFunc(e.ONE,e.ONE),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.SCISSOR_TEST),e.scissor(2,2,A.mw-4,A.mh-4),e.useProgram(s.p.map),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.atlas),e.uniform1i(s.p.map.u.uA,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s.rad),e.uniform1i(s.p.map.u.uRad,1),e.bindVertexArray(s.vLoNear),e.drawElementsInstanced(e.TRIANGLES,s.lo.n,e.UNSIGNED_SHORT,0,zo),e.bindVertexArray(s.vLoFar),e.drawElementsInstanced(e.TRIANGLES,s.lo.n,e.UNSIGNED_SHORT,0,ae),e.blendEquation(e.FUNC_ADD),e.disable(e.BLEND),e.disable(e.SCISSOR_TEST),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,v.fb),e.viewport(0,0,i,i),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clearColor(0,0,0,1),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.useProgram(s.p.pan),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.atlas),e.uniform1i(s.p.pan.u.uA,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s.rad),e.uniform1i(s.p.pan.u.uRad,1),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,s.noise),e.uniform1i(s.p.pan.u.uN,2),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,A.map),e.uniform1i(s.p.pan.u.uM,3),e.bindVertexArray(s.vHiNear),e.drawElementsInstanced(e.TRIANGLES,s.hi.n,e.UNSIGNED_SHORT,0,ko),e.bindVertexArray(s.vMidFar),e.drawElementsInstanced(e.TRIANGLES,s.mid.n,e.UNSIGNED_SHORT,0,ae),ee>ae&&(e.bindVertexArray(s.vFlFar),e.bindBuffer(e.ARRAY_BUFFER,s.far),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,ae*48),e.vertexAttribPointer(2,4,e.FLOAT,!1,48,ae*48+16),e.vertexAttribPointer(3,4,e.FLOAT,!1,48,ae*48+32),e.drawElementsInstanced(e.TRIANGLES,s.fl.n,e.UNSIGNED_SHORT,0,ee-ae),e.vertexAttribPointer(1,4,e.FLOAT,!1,48,0),e.vertexAttribPointer(2,4,e.FLOAT,!1,48,16),e.vertexAttribPointer(3,4,e.FLOAT,!1,48,32)),e.useProgram(s.p.sea),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,A.grease),e.uniform1i(s.p.sea.u.uG,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,A.map),e.uniform1i(s.p.sea.u.uM,1),s.p.sea.u.uN&&(e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,s.noise),e.uniform1i(s.p.sea.u.uN,2)),e.bindVertexArray(sr),e.drawElements(e.TRIANGLES,s.seaN,e.UNSIGNED_INT,0),St||(e.useProgram(s.p.sky),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,s.noise),e.uniform1i(s.p.sky.u.uN,0),e.uniform4f(s.p.sky.u.uB,Ra[0],Ra[1],Ra[2],Ra[3]),e.uniform4f(s.p.sky.u.uC,$e[0],$e[1],$e[2],$e[3]),e.uniform4f(s.p.sky.u.uD,zt[0],zt[1],zt[2],zt[3]),e.bindVertexArray(s.empty),e.drawArrays(e.TRIANGLES,0,3)),ma&&(e.useProgram(s.p.dot),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.depthMask(!1),e.bindBuffer(e.ARRAY_BUFFER,s.dots),e.bufferSubData(e.ARRAY_BUFFER,0,dt),e.bindVertexArray(s.vDots),e.drawArrays(e.POINTS,0,Ge),e.disable(e.BLEND),e.depthMask(!0)),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,i,i),e.disable(e.DEPTH_TEST),e.useProgram(ct),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,v.t),e.uniform1i(ct.u.uS,0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,s.noise),e.uniform1i(ct.u.uN,1),e.uniform4f(ct.u.uP,wr,Math.max(.62,i/1e3*.62),1/i,i/256*.73),e.uniform4f(ct.u.uQ,st*.7,he%2e3,0,0),e.uniform4f(ct.u.uR,Ha[0],Ha[1],Ha[2],0),e.bindVertexArray(s.empty),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)};let zo=0,ko=0;const Ma=(o,c)=>{Ar++,c=Math.min(c||0,.25),he+=c,da=Math.min(.28,da+c*.6);const l=t.input,u=l.taps();if(l.down&&l.inside!==!1){pa||(pa=!0,ba=0,Eo=wa=l.x,yo=Aa=l.y,Ke=0,ge=0,Qe=0,yt=null,Ta=0,Ea=ya=0),ba+=c;const n=l.x-wa,a=l.y-Aa;wa=l.x,Aa=l.y;const f=Math.hypot(n,a);if(Ke=Math.max(Ke,Math.hypot(l.x-Eo,l.y-yo)),Ke>.025){if(Ea=Ea*.6+n,ya=ya*.6+a,ge+=f,Qe+=c,ge>.05&&Qe>.16){const d=ge/Qe,p=Math.min(7,1.6+d*3.6),x=Math.max(11,Math.min(32,et*p*p/ne)),R=sa(l.x,l.y),k=(St?Math.hypot(R[0],R[1],g.h):Math.hypot(R[0],R[1]))*Zt*2,N=Ea*k,U=-ya*k*g.fore;let F=0;for(const W of ft)F+=W.Anow||W.A0;const b=Math.min((.09+.09*d)*Math.sqrt(x/14),.105*x/et,Math.max(.03,.34-F));bo(R[0],R[1],N,U,x,b,Math.max(x*.9,8)),t.sound.hit("noise",Math.min(.6,b*1.5),{cutoff:240+x*8,dur:.8,pan:Math.max(-.8,Math.min(.8,l.x*2-1))}),ge=0,Qe=0}}else if(ba>.3){const d=sa(l.x,l.y);if(yt||(yt=vr(d[0],d[1]),t.sound.note(0,{freq:3100,dur:.6,vel:.06,wave:"sine",attack:.2})),yt.s=Math.min(1,yt.s+c*.7),yt.r=Math.min(4.2,yt.r+c*1.05),Ta+=c,Ta>.42&&I<M){Ta=0;for(let p=0;p<6;p++){const x=T()*et,R=Math.sqrt(T())*yt.r*.8,k=yt.x+Math.cos(x)*R,N=yt.z+Math.sin(x)*R*1.2;let U=N>At&&N<mt;for(let F=0;F<I&&U;F++)at[F]!==2&&Math.hypot(S[F]-k,_[F]-N)<z[F]*1.1+.14&&(U=!1);if(U){const F=Va(k,N,.15+T()*.06,fe[T()*fe.length|0],.07);F>=0&&(Se[F]=.55,Xe[F]=.6+T()*.25,t.sound.note(0,{freq:3600+T()*1500,dur:.1,vel:.08,wave:"sine",attack:.01}));break}}}}}else pa?(pa=!1,ba<.3&&Ke<=.025&&Ro(wa,Aa)):u.length&&Ro(u[u.length-1].x,u[u.length-1].y);let m=!1;for(let n=ht.length-1;n>=0;n--){const a=ht[n];(a!==yt||!l.down)&&(a.s*=Math.exp(-c/24)),a.s<.01?ht.splice(n,1):m=!0}if(m)for(let n=0;n<I;n++){let a=0;for(let f=0;f<ht.length;f++){const d=ht[f],x=1-Math.hypot(S[n]-d.x,_[n]-d.z)/(d.r*1.5);x>0&&(a=Math.max(a,x*d.s))}if(Ne[n]=a,a>0&&at[n]===0){const f=z[n];z[n]=Math.min(Xe[n],f+a*c*(f<.4?.17:.075)),Se[n]=Math.min(1,Se[n]+a*c*.3),Xt[n]=Math.min(la*1.5,Xt[n]+a*c*.012),z[n]!==f&&Oa(n)}}else(Ne[0]||Ne[1])&&Ne.fill(0);if(Ga-=c,Ga<0){Ga=7+T()*11;const n=(195+T()*40-20)*Ie,a=10+T()*12;bo(Math.sin(n)*-16,22-Math.cos(n)*16,Math.sin(n),Math.cos(n),a,.1+T()*.07,16)}for(let n=0;n<Ct.length;n++){const a=Ct[n];a.P=a.ph-a.w*he}for(let n=ft.length-1;n>=0;n--){const a=ft[n];a.tau+=c;const f=a.w/(2*a.k),d=f*a.tau;a.cx=a.x+a.ux*d,a.cz=a.z+a.uz*d,a.Anow=a.A0*Math.exp(-a.al*d)*Math.min(1,a.tau*2.4+.08),a.P=-a.w*a.tau*.5,(a.Anow<.006||a.cz<-8||a.cz>180||Math.abs(a.cx)>80)&&ft.splice(n,1)}for(let n=Et.length-1;n>=0;n--){const a=Et[n];a.tau+=c;const f=a.w/(2*a.k);a.front=f*a.tau,a.P=a.w*a.tau,a.Anow=a.A*Math.exp(-a.tau*.28)*Math.min(1,a.tau*6+.1),a.Anow<.004&&Et.splice(n,1)}if(c>0){To(he);const n=Math.max(1,Math.min(3,Math.ceil(c/(1/30)-.001))),a=Math.min(c/n,1/28);for(let f=0;f<n;f++)xr(a);for(let f=0;f<I;f++)Jt[f]>0&&(Jt[f]=Jt[f]<.01?0:Jt[f]*Math.exp(-c/1.1)),jt[f]>0&&(jt[f]=jt[f]<.04?0:jt[f]*Math.exp(-c/16));if(Ya-=c,Ya<0){Ya=4+oe()*9;const f=oe()*I|0;!at[f]&&_[f]<30&&f!==0&&(Jt[f]=Math.max(Jt[f],.6),jt[f]=Math.max(jt[f],.75),Vt[f]-=.25/Math.sqrt(wt[f]+.2))}for(let f=0;f<I;f++)if(at[f]===2){const d=Ca[f];ze[f]<1&&(ze[f]=Math.min(1,ze[f]+c/.75));const p=ze[f],x=p*p*(3-2*p),R=1+(fo[f]-1)*x,k=Math.cos(nt[d]),N=Math.sin(nt[d]),U=so[f]*R,F=io[f]*R,b=k*U-N*F,W=N*U+k*F;S[f]=S[d]+b,_[f]=_[d]+W,nt[f]=nt[d]+co[f]}}else To(he);if(ma&&c>0){let n=0;for(let a=0;a<Ge;a++)dt[a*4+3]>0&&(n=1,ue[a*3+1]-=ne*c,dt[a*4]+=ue[a*3]*c,dt[a*4+1]+=ue[a*3+1]*c,dt[a*4+2]+=ue[a*3+2]*c,dt[a*4+3]-=c*1.3,dt[a*4+1]<-.3&&(dt[a*4+3]=0));ma=n}let r=0;for(let n=0;n<I;n++){let a,f,d,p=Xt[n];if(at[n]===2){const R=Ca[n],k=ze[n],N=k*k*(3-2*k),U=S[n]-S[R],F=_[n]-_[R],b=ca[R]+Kt[R],W=fa[R]+gt[R],O=Math.hypot(U,F)||1,B=Math.sin(k*Math.PI)*.22*(ke[n]>0?1:0),j=N*Xt[R]*.62/(2*z[n]);a=ia[R]+Ve[R]+b*U+W*F+N*Xt[R]*.34+(1-N)*.03,f=b-U/O*(B+j)+.018*(n%3-1),d=W-F/O*(B+j)+.018*(n%5-2),p=Xt[n]*.9}else a=ia[n]+Ve[n],f=ca[n]+Kt[n],d=fa[n]+gt[n];const x=qe[n];L[r]=S[n],L[r+1]=a,L[r+2]=_[n],L[r+3]=z[n],L[r+4]=Math.cos(nt[n]),L[r+5]=Math.sin(nt[n]),L[r+6]=f,L[r+7]=d,L[r+8]=p,L[r+9]=n===Tt?-1:Se[n],L[r+10]=x,L[r+11]=-(Math.min(Jt[n],.99)+Math.round(jt[n]*15)),r+=12}ko=I;for(let n=0;n<ht.length;n++){const a=ht[n];L[r]=a.x,L[r+1]=0,L[r+2]=a.z,L[r+3]=a.r*1.1,L[r+4]=1,L[r+5]=0,L[r+6]=0,L[r+7]=0,L[r+8]=0,L[r+9]=a.s,L[r+10]=0,L[r+11]=2,r+=12}zo=I+ht.length,e.bindBuffer(e.ARRAY_BUFFER,s.near),e.bufferSubData(e.ARRAY_BUFFER,0,L,0,r),s.farOwner!==Ma&&(fr(),s.farOwner=Ma),h[19]=he%4096,h[52]=ft.length,h[53]=Et.length;for(let n=0;n<5;n++){const a=Ct[n],f=56+n*4;h[f]=a.kx,h[f+1]=a.kz,h[f+2]=a.a,h[f+3]=a.P}for(let n=0;n<ft.length;n++){const a=ft[n],f=76+n*4,d=100+n*4,p=124+n*4;h[f]=a.ux*a.k,h[f+1]=a.uz*a.k,h[f+2]=a.Anow,h[f+3]=a.P,h[d]=a.cx,h[d+1]=a.cz,h[d+2]=a.sa,h[d+3]=a.sc,h[p]=a.ux,h[p+1]=a.uz}for(let n=0;n<Et.length;n++){const a=Et[n],f=148+n*4,d=164+n*4;h[f]=a.x,h[f+1]=a.z,h[f+2]=a.Anow,h[f+3]=a.k,h[d]=a.front,h[d+1]=a.sg,h[d+2]=a.P}if(Tr(),qa-=c,qa<0){qa=2.2+T()*2.6;let n=0;for(let a=0;a<5;a++)n+=Ct[a].a;for(const a of ft)n+=a.Anow;t.sound.hit("noise",Math.min(.32,.1+n*.28),{cutoff:210+T()*180,dur:1.5+T()})}};for(const o of Ct)o.P=o.ph-o.w*he;return Ma(0,0),Ma}})}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
