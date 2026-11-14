// Marbles: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/147.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(He){He&&function(){"use strict";const to="",We=new WeakMap,lt=Math.PI*2,ee=(e,t,z)=>e<t?t:e>z?z:e,eo=(e,t,z)=>{const o=ee((z-e)/(t-e),0,1);return o*o*(3-2*o)},_e=16,zt=.6,oo=320,ao=1024,ro=1024,Ye=1024,Qe=256,so=512,Le=512,oe=4;function qe(e,t){const z=e.replace(/^0x/,"").padEnd(64,"0");let o=parseInt(z.slice(0,8),16)^t,c=parseInt(z.slice(8,16),16)^Math.imul(t,7919),i=parseInt(z.slice(16,24),16)^parseInt(z.slice(48,56),16),X=parseInt(z.slice(24,32),16)^parseInt(z.slice(32,40),16)^parseInt(z.slice(56,64),16);const n=()=>{o>>>=0,c>>>=0,i>>>=0,X>>>=0;let rt=o+c|0;return o=c^c>>>9,c=i+(i<<3)|0,i=i<<21|i>>>11,X=X+1|0,rt=rt+X|0,i=i+rt|0,(rt>>>0)/4294967296};for(let rt=0;rt<20;rt++)n();return n}const he=(e,t)=>{let z=0;for(const c of t)z+=c[1];let o=e()*z;for(const c of t)if(o-=c[1],o<0)return c[0];return t[t.length-1][0]},kt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
layout(std140) uniform S { vec4 uE; vec4 uFw; vec4 uRt; vec4 uUp; vec4 uFoc; vec4 uSun; vec4 uSunC; vec4 uAmb; vec4 uBnc; vec4 uSkyH; vec4 uSkyT; vec4 uG0; vec4 uG1; vec4 uG2; vec4 uTone; vec4 uReg; vec4 uLamp; vec4 uA[16]; vec4 uCb[16]; vec4 uMat[16]; };
layout(std140) uniform D { vec4 uB[16]; vec4 uQ[16]; vec4 uV[16]; ivec4 uOrd[24]; vec4 uT; };
vec3 ray(vec2 n){ return normalize(uFw.xyz*uE.w+uRt.xyz*(n.x-uFw.w)+uUp.xyz*(n.y-uRt.w)); }
vec3 dec(vec3 c){ return c*c*4.; }
vec3 enc(vec3 c){ return sqrt(max(c,vec3(0.))/4.); }
vec3 tone(vec3 c){ c*=uTone.x; c=(c*(2.51*c+.03))/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
float atn2(float y,float x){float ax=abs(x),ay=abs(y),a=atan(min(ax,ay)/max(max(ax,ay),1e-30));a=ay>ax?1.5707963-a:a;a=x<0.?3.1415927-a:a;return y<0.?-a:a;}
`,ie=`#version 300 es
layout(location=0) in vec2 aP; out vec2 vN; void main(){ vN=aP; gl_Position=vec4(aP,0.,1.); }`,no=`#version 300 es
precision highp float;
uniform sampler2D uNz; uniform int uN5,uN9; in vec2 vN; out vec4 o;
vec2 h2(vec2 p){ return textureLod(uNz,(p+.5)/256.,0.).xy; }
// value noise with a whole number of cells across the tile, so it wraps
float vn(vec2 uv,float M,vec2 off){ vec2 q=uv*M,i=floor(q),f=fract(q); f=f*f*(3.-2.*f);
 float a=textureLod(uNz,(mod(i,M)+off+.5)/256.,0.).r,b=textureLod(uNz,(mod(i+vec2(1.,0.),M)+off+.5)/256.,0.).r,c=textureLod(uNz,(mod(i+vec2(0.,1.),M)+off+.5)/256.,0.).r,d=textureLod(uNz,(mod(i+vec2(1.,1.),M)+off+.5)/256.,0.).r;
 return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
void main(){
 vec2 uv=vN*.5+.5; float f=0.,a=.5,sc=8.;
 for(int i=0;i<uN5;i++){ f+=a*vn(uv,sc,vec2(float(i)*37.,float(i)*11.)); a*=.5; sc*=2.; }
 float g=1.,sp=0.,crumb=0.; vec2 q=uv*64.; vec2 ip=floor(q);
 for(int n=0;n<uN9;n++){ vec2 c=ip+vec2(n%3-1,n/3-1); vec2 m=mod(c,64.)*4.; vec2 r=h2(m); float d=length(q-c-r); float ht=textureLod(uNz,(m+vec2(21.5,40.5))/256.,0.).a; crumb+=(.25+ht)*exp(-d*d*(2.5+6.*ht)); if(d<g){ g=d; sp=textureLod(uNz,(m+vec2(9.5,3.5))/256.,0.).b; } }
 crumb=clamp(crumb*.8,0.,1.);
 float fine=textureLod(uNz,uv,0.).g;
 float clod=smoothstep(.40,.62,f);
 o=vec4(clamp(crumb*.42+f*.34+fine*.24,0.,1.),sp,fine,clod);
}`,co=`#version 300 es
layout(location=0) in vec2 aP; layout(location=1) in vec4 aI; layout(location=2) in vec4 aJ;
uniform float uHalf; out vec2 vQ; flat out vec4 vI; flat out vec4 vJ;
void main(){ vQ=aP; vI=aI; vJ=aJ; float c=cos(aJ.x),s=sin(aJ.x); vec2 r=vec2(aP.x*aI.z,aP.y*aI.z*aJ.y); vec2 p=aI.xy+vec2(c*r.x-s*r.y,s*r.x+c*r.y); gl_Position=vec4(p/uHalf,0.,1.); }`,io=`#version 300 es
precision highp float; uniform sampler2D uNz; in vec2 vQ; flat in vec4 vI; flat in vec4 vJ; out vec4 o;
float atn2(float y,float x){float ax=abs(x),ay=abs(y),a=atan(min(ax,ay)/max(max(ax,ay),1e-30));a=ay>ax?1.5707963-a:a;a=x<0.?3.1415927-a:a;return y<0.?-a:a;}
void main(){
 float mode=vJ.z, sd=vI.w;
 vec2 q=vQ; vec4 res=vec4(0.);
 if(mode<.5){
  float a=atn2(q.y,q.x), wob=textureLod(uNz,vec2(a*.159+sd,sd*.37),0.).r*.42+textureLod(uNz,q*.13+sd,0.).g*.16;
  float r=length(q)/(.62+wob);
  float dome=sqrt(max(1.-r*r,0.));
  float facet=textureLod(uNz,q*.21+sd*3.,0.).b;
  res=vec4(dome*vJ.w*(.8+.3*facet),step(.0052,vI.z)*smoothstep(1.,.92,r)*(.35+.65*fract(sd*7.)),0.,0.);
 } else {
  // a dry curled leaf: one midrib, side veins, torn edge, curled up along its length
  float y=q.y*.5+.5, wd=.42*pow(max(sin(3.14159*pow(y,.8)),0.),.75);
  float e=abs(q.x)/max(wd,.001)+textureLod(uNz,q*.09+sd,0.).r*.35-.18;
  float m=smoothstep(1.,.93,e);
  float curl=.45+.55*pow(abs(q.x)/max(wd,.001),2.);
  float vein=max(smoothstep(.04,.0,abs(q.x)),smoothstep(.09,.0,abs(fract(y*7.-abs(q.x)*5.)-.5))*.7);
  res=vec4(m*min(curl,1.)*vJ.w,0.,m*(.35+.55*vein),0.);
 }
 if(res.r<=0.&&res.b<=0.) discard;
 o=res;
}`,uo=`#version 300 es
precision highp float; uniform sampler2D uNz; uniform vec4 uC; uniform vec4 uC2; in vec2 vN; out vec4 o;
void main(){
 vec2 p=vN*.6; vec2 w=p+vec2(textureLod(uNz,p*.8+uC2.x,0.).r,textureLod(uNz,p*.8+uC2.y,0.).g)*.14-.07;
 w+=vec2(textureLod(uNz,p*5.,0.).b,textureLod(uNz,p*5.+.3,0.).a)*.016-.008;
 vec2 ab=uC.zw-uC.xy, pa=w-uC.xy; float t=clamp(dot(pa,ab)/dot(ab,ab),0.,1.);
 float d=length(pa-ab*t);
 float wdt=mix(.0028,.0006,abs(t-.45)*1.8);
 float br=smoothstep(.0,.6,textureLod(uNz,p*3.+.7,0.).r);
 float c=smoothstep(wdt,wdt*.2,d)*(.6+.4*br);
 o=vec4(0.,0.,0.,c);
}`,lo=kt+`
uniform sampler2D uNz,uNs; in vec2 vN; out vec4 o;
void main(){
 float az=vN.x*3.14159, el=vN.y*1.5708; vec3 d=vec3(cos(el)*sin(az),sin(el),cos(el)*cos(az));
 vec3 L=uSun.xyz; float s=max(dot(d,L),0.);
 float up=clamp(d.y,0.,1.);
 vec3 c=mix(uSkyH.rgb,uSkyT.rgb,pow(up,.55));
 // a low sun's side of the sky (uSunC.w: how much): a broad pale glow low on the sun's side, deeper and cooler away
 float hz=uSunC.w, ca=dot(normalize(d.xz+1e-5),normalize(L.xz+1e-5)), sd=exp((ca-1.)*9.);
 float sg=sd*exp(-up*2.2);
 vec3 hS=mix(uSkyH.rgb*vec3(.44,.54,.98),uSkyH.rgb*vec3(1.9,2.05,2.45),sg);
 c=mix(c,mix(hS,uSkyT.rgb*1.6,smoothstep(.1,.9,up)),hz);
 c+=uSunC.rgb*(pow(s,4.)*.02+pow(s,24.)*.05+pow(s,300.)*.35)*uTone.y;
 float n1=textureLod(uNs,vec2(vN.x*1.25+.3,.17),0.).r*.55+textureLod(uNs,vec2(vN.x*3.1,.41),0.).g*.3+textureLod(uNs,vec2(vN.x*8.,.73),0.).b*.15;
 float tree=.022+n1*n1*.17;
 float hedge=.026+.008*textureLod(uNs,vec2(vN.x*6.,.29),0.).b;
 float rx=fract(vN.x*.5-uSkyT.w*.159+.5)-.5, roof=step(abs(rx),.075)*(.034+min(.075-abs(rx),.03)*.55);
 float hor=max(max(tree*smoothstep(.3,.55,n1),hedge),roof);
 float rim=pow(max(dot(normalize(vec3(d.x,0.,d.z)),normalize(vec3(L.x,0.,L.z))),0.),4.);
 vec3 far=mix(uSkyH.rgb*vec3(.12,.11,.10),uSkyH.rgb*vec3(.42,.34,.26),rim)*(.65+.35*textureLod(uNz,vec2(vN.x*17.,el*6.),0.).g);
 c*=.9+.2*textureLod(uNz,vec2(vN.x*.09,el*.05+.3),0.).r*textureLod(uNz,vec2(vN.x*.21+.4,el*.11),0.).g*2.;
 far+=uAmb.rgb*.05;
 // half a field away the trees are a hazy shape close to the sky behind them, palest where the glow is, the glow
 // eating their tops and showing through the gaps in the crowns
 float th=clamp((hor-d.y)/max(hor,.01),0.,1.);
 float hzT=hz*clamp(.42+.2*sd+.18*sd*(1.-smoothstep(0.,.45,th))+.25*sd*smoothstep(.55,.8,textureLod(uNz,vec2(vN.x*9.,el*7.),0.).b),0.,.8);
 far=mix(far,c,hzT);
 c=mix(c,far,smoothstep(hor+.008,hor-.008,d.y));
 c=mix(c,uBnc.rgb*.8,smoothstep(.0,-.05,d.y));
 o=vec4(enc(c),1.);
}`,fo=kt+`
uniform sampler2D uMac, uFe, uDet, uNz, uEnv; uniform float uTopV; uniform int uSteps; in vec2 vN; out vec4 o;
float H(vec2 p,float lod){
 vec2 m=p/(2.*uReg.x)+.5;
 float a=textureLod(uMac,m,0.).r;
 vec4 f=textureLod(uFe,m,0.);
 float d1=textureLod(uDet,p*uReg.w,lod).r;
 float d2=textureLod(uDet,p*uReg.w*.211+.37,lod).a;
 float d3=textureLod(uDet,p*uReg.w*3.7,lod+.5).r;
 return a+f.r*.012-f.a*.0035+(d1-.5)*uG0.w+(d2-.5)*uG1.w+(d3-.5)*uG2.w*step(lod,3.);
}
vec3 envAt(vec3 d){ vec2 e=vec2(atn2(d.x,d.z)/6.28318+.5,asin(clamp(d.y,-1.,1.))/3.14159+.5); return dec(textureLod(uEnv,e,0.).rgb); }
void main(){
 vec3 ro,rd;
 if(uTopV>.5){ ro=vec3(vN.x*uReg.x,.05,vN.y*uReg.x); rd=vec3(0.,-1.,0.); }
 else { ro=uE.xyz; rd=ray(vN); }
 float ty=(.02-ro.y)/rd.y;
 float t=(rd.y<0.&&ty>0.)?ty:0.;
 float tA=t,tB=-1.,lod=0.; bool hit=false;
 float px=(uTopV>.5)?.002:2./(uE.w*uUp.w);
 if(rd.y<-1e-4){
  float tMax=min(6.,(-.03-ro.y)/rd.y);
  for(int i=0;i<uSteps;i++){
   vec3 p=ro+rd*t; lod=log2(max(t*px*uReg.w*512.,1.));
   float d=p.y-H(p.xz,lod);
   if(tB>0.){ if(d<0.) tB=t; else tA=t; t=.5*(tA+tB); }
   else if(d<0.){ hit=true; tB=t; t=.5*(tA+tB); }
   else { tA=t; t+=max(d/abs(rd.y)*.6,max(.00035,t*.012)); if(t>tMax){ break; } }
  }
  if(tB>0.) t=.5*(tA+tB);
  hit=true; t=min(t,tMax);
 }
 vec3 c; float dd;
 if(hit){
  vec3 p=ro+rd*t; lod=log2(max(t*px*uReg.w*512.,1.));
  // gradient and sun-shadow samples, all through one H call
  float e=max(.00024,t*px*.9), h0=p.y, hx=0.,hz=0.,sh=1.;
  vec3 L=uSun.xyz; vec2 lx=normalize(L.xz); float tanE=L.y/length(L.xz);
  int nS=12*int(uTone.x>-1.);
  for(int k=0;k<nS;k++){
   vec2 q; float s=0.;
   if(k==0) q=p.xz; else if(k==1) q=p.xz+vec2(e,0.); else if(k==2) q=p.xz+vec2(0.,e);
   else { s=.0005*pow(1.55,float(k-3)); q=p.xz+lx*s; }
   float h=H(q,lod+(k>2?1.:0.));
   if(k==0) h0=h; else if(k==1) hx=h; else if(k==2) hz=h;
   else { float over=h-(h0+s*tanE+.00012); sh=min(sh,1.-smoothstep(0.,.0015+s*.02,over)); }
  }
  vec3 n=normalize(vec3(h0-hx,e,h0-hz));
  vec2 m=p.xz/(2.*uReg.x)+.5;
  vec4 f=textureLod(uFe,m,0.);
  vec4 dt=textureLod(uDet,p.xz*uReg.w,lod);
  vec4 dg=textureLod(uDet,p.xz*uReg.w*.13,0.);
  vec2 lo=textureLod(uNz,p.xz*.9,0.).rg;
  // albedo: dirt with mineral specks and sun-bleached patches; dark where the crumbs throw pockets
  vec3 al=mix(uG0.rgb,uG1.rgb,smoothstep(.25,.8,lo.x*.55+dg.a*.45));
  al=mix(al,uG2.rgb,smoothstep(.72,.98,dt.g)*.32);
  al*=.8+.4*dt.r;
  al=mix(al,uG1.rgb*.6,smoothstep(.72,.98,1.-dt.g)*.16);
  if(uBnc.w>1.5){ // old concrete: aggregate stones showing through the worn skin
   float ag=smoothstep(.62,.68,dg.b*.5+dt.g*.5);
   al=mix(al,mix(vec3(.30,.27,.24),vec3(.55,.50,.42),dt.b),ag*.55);
   al*=.85+.3*lo.y;
  }
  vec3 peb=mix(vec3(.42,.37,.32),vec3(.64,.57,.48),fract(f.g*5.3))*(.55+.75*dt.b);
  al=mix(al,peb,smoothstep(.02,.2,f.g));
  vec3 leaf=mix(vec3(.16,.105,.06),vec3(.31,.22,.13),dt.b)*(.55+f.b*.8);  // dry and grey-brown, not a marble's orange
  al=mix(al,leaf,smoothstep(.1,.32,f.b));
  al*=1.-.75*smoothstep(.1,.7,f.a);
  // dust scatters light round its grains: a wrapped falloff, so faces turned from the sun are not black
  float ndl=clamp((dot(n,L)+.25)/1.25,0.,1.);
  // lamp light falls off with distance from the lamp's foot
  float lf=1.;
  if(uLamp.w>.5){ vec3 dl=uLamp.xyz-p; L=normalize(dl); ndl=clamp((dot(n,L)+.25)/1.25,0.,1.); float r2=dot(dl,dl);
   // the lamp's pool: inverse square from the lamp, normalised to the ring's middle, then the cut-off
   // of its shade, so beyond a few metres the ground falls to the dusk
   lf=.22*(L.y/r2)/(uLamp.y/pow(dot(uLamp.xyz,uLamp.xyz),1.5))*smoothstep(.75,.15,length(p.xz-uLamp.xz)); }
  // Oren-Nayar-ish flattening for dust, plus backscatter toward the viewer
  float back=pow(max(dot(rd,-L),0.),4.)*.2;
  c=al*(uSunC.rgb*(ndl*1.25+back*.6)*sh*lf+uAmb.rgb*(.55+.45*n.y)*(.75+.25*dt.r));
  c+=uSunC.rgb*al*.24*lf*(1.-sh*ndl)*(.6+.4*n.y);
  float haze=smoothstep(.55,4.,t);
  if(uTopV<.5) c=mix(c,envAt(normalize(vec3(rd.x,.012,rd.z))),haze);
  dd=dot(rd,uFw.xyz)*t;
 } else {
  c=envAt(rd); dd=50.;
 }
 float coc=uFoc.y*abs(dd-uFoc.x)/max(dd,1e-3);
 o=vec4(enc(c)+(textureLod(uNz,gl_FragCoord.xy/256.,0.).g-.5)/220.,clamp(coc/uFoc.w,0.,1.));
}`,vo=kt+`
uniform sampler2D uSrc, uNz; uniform vec4 uGat; in vec2 vN; out vec4 o;
void main(){
 vec2 uv=vN*.5+.5; vec4 c0=textureLod(uSrc,uv,0.);
 float coc0=c0.a*uFoc.w; vec3 s=dec(c0.rgb); float w=1.;
 float rot=textureLod(uNz,gl_FragCoord.xy/256.,0.).r*6.283;
 int n=int(uGat.x);
 for(int i=0;i<n;i++){
  float a=float(i)*2.39996+rot, r=sqrt((float(i)+.5)/uGat.x);
  vec2 q=vec2(cos(a),sin(a))*r*uGat.y*uGat.w;
  vec4 t=textureLod(uSrc,uv+q,0.);
  float dist=r*uGat.y*uGat.z; float cq=t.a*uFoc.w;
  float wt=smoothstep(dist-1.,dist+1.,min(cq,coc0)+max(cq-coc0,0.)*.9);
  s+=dec(t.rgb)*wt; w+=wt;
 }
 o=vec4(enc(s/w),c0.a);
}`,ho=kt+`
uniform sampler2D uBg, uTr, uTs, uNz; uniform float uBgLod; in vec2 vN; out vec4 o;
void main(){
 vec2 uv=vN*.5+.5;
 vec4 b=texture(uBg,uv);
 vec3 c=dec(b.rgb);
 vec3 rd=ray(vN);
 if(rd.y<-.004){
  float t=-uE.y/rd.y; vec2 p=uE.xz+rd.xz*t, w=p/(2.*uReg.x)+.5;
  float coc=b.a*uFoc.w, cw=coc*t/(uE.w*uUp.w*.5), m=smoothstep(.002,.006,cw);
  float tex=1./1024.;
  vec2 lo=normalize(uSun.xz)*2.5*tex;
  vec4 a,a2;
  if(coc<1.2){ a=texture(uTr,w); a2=texture(uTr,w+lo); }
  else {
   // marks are squeezed by the low view: blur them along the ground as the lens would on screen
   vec2 fw=normalize(rd.xz)*coc*t/(uE.w*uUp.w*.5)/max(-rd.y,.004)*.5/(2.*uReg.x);
   vec4 s=vec4(0.),s2=vec4(0.);
   int n5=5*int(uTone.x>-1.); for(int i=0;i<n5;i++){ vec2 q=w+fw*(float(i)-2.)*.8; if(m<.5){ s+=textureLod(uTr,q,0.); s2+=textureLod(uTr,q+lo,0.); } else { s+=textureLod(uTs,q,0.); s2+=textureLod(uTs,q+lo*3.,0.); } }
   a=s*.2; a2=s2*.2;
  }
  float h1=a.g-a.r*.8-a.b*1.2, h2=a2.g-a2.r*.8-a2.b*1.2;
  float slope=clamp((h2-h1)*2.6,-.72,1.1);
  float fd=smoothstep(3.,1.,t)*step(abs(w.x-.5),.5)*step(abs(w.y-.5),.5);
  c*=1.+fd*(slope-.22*a.r);
  c=mix(c,c*uFoc.z+(uBnc.w>1.5?.6*(uSunC.rgb+uAmb.rgb)*.5:vec3(0.)),fd*a.b*uTone.z);
  c+=fd*a.g*.07*uG2.rgb*(uSunC.rgb*.5+uAmb.rgb);
  // the live ring: a stick-cut furrow with thrown-up lips, analytic so it stays crisp, softened by the lens when far
  float rp=length(p), an=atn2(p.y,p.x);
  float angN=fract((an-uSkyH.w)/6.28318);
  float sinG=max(uE.y/length(vec3(p.x-uE.x,uE.y,p.y-uE.z)),.03), bl=cw*(1.+.8/sinG);
  if(angN<uReg.z&&abs(rp-uReg.y)<.012+bl*3.2){
   float gr=textureLod(uNz,p*2.7,0.).r, gr2=textureLod(uNz,p*11.,0.).g, R=uReg.y*(1.+.012*sin(an*3.+uSkyT.w)+.006*sin(an*7.+uSkyH.w))+.0006*sin(an*37.+uSkyT.w);
   float dr=rp-R+(gr-.5)*.0009, wd=.0013+.0009*gr2;
   float we=sqrt(wd*wd+bl*bl), amp=wd/we;
   vec2 rad=p/rp; float e2=.0005+we*.25; float sl=dot(rad,normalize(uSun.xz));
   float d1=dr/we, d2=(dr+e2*sign(sl))/we;
   float h1=-exp(-d1*d1)+.55*exp(-(abs(d1)-1.75)*(abs(d1)-1.75)*2.5), h2=-exp(-d2*d2)+.55*exp(-(abs(d2)-1.75)*(abs(d2)-1.75)*2.5);
   float brk=smoothstep(.15,.5,gr2*.5+gr*.5);
   float mk=amp*brk*fd;
   if(uBnc.w>1.5){ float ch=exp(-d1*d1*.9)*(.45+.75*gr2); c=mix(c,vec3(1.)*(uSunC.rgb*max(uSun.y,.3)+uAmb.rgb),clamp(ch*mk*.7,0.,1.)); }
   else { c*=1.+clamp((h2-h1)*1.5*abs(sl)/max(e2/we,.3),-.65,1.)*mk; c*=1.-.48*exp(-d1*d1)*mk; }
  }
 }
 float v=dot(vN,vN)*.5;
 c*=1.-uTone.w*v*v*.38;
 vec3 g=tone(c);
 float gr=textureLod(uNz,gl_FragCoord.xy/256.+uT.yz,0.).a-.5;
 o=vec4(g+gr*.022,1.);
}`,xo=`#version 300 es
precision highp float; uniform sampler2D uSrc; in vec2 vN; out vec4 o;
void main(){ vec2 uv=vN*.5+.5; vec2 e=vec2(1./1024.); o=.25*(texture(uSrc,uv+e)+texture(uSrc,uv-e)+texture(uSrc,uv+e*vec2(1.,-1.))+texture(uSrc,uv+e*vec2(-1.,1.))); }`,mo=`#version 300 es
precision highp float; uniform vec4 uF; out vec4 o; void main(){ o=uF; }`,po=`#version 300 es
layout(location=0) in vec2 aP; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
uniform float uHalf; out vec2 vW; out vec2 vG; flat out vec4 vA; flat out vec4 vB; flat out float vLen;
void main(){
 vec2 d=aA.zw-aA.xy; float l=length(d); vec2 x=l>1e-6?d/l:vec2(1.,0.), y=vec2(-x.y,x.x); float w=aB.x*1.75+.0008;
 vec2 c=.5*(aA.xy+aA.zw); vec2 q=c+x*aP.x*(.5*l+w)+y*aP.y*w;
 vW=vec2(dot(q-c,x),dot(q-c,y)); vG=q; vA=aA; vB=aB; vLen=.5*l;
 gl_Position=vec4(q/uHalf,0.,1.);
}`,wo=`#version 300 es
precision highp float; uniform sampler2D uNz; in vec2 vW; in vec2 vG; flat in vec4 vA; flat in vec4 vB; flat in float vLen; out vec4 o;
void main(){
 vec2 q=vW; q.x=max(abs(q.x)-vLen,0.);
 float d=length(q), w=vB.x, gr=textureLod(uNz,vG*2.7,0.).r;
 float nd=d/w+(gr-.5)*(vB.w>1.5?.16:.05);
 float core=smoothstep(1.,.2,nd), ridge=smoothstep(.8,1.1,nd)*smoothstep(1.7,1.2,nd);
 float teeth=.9+.2*textureLod(uNz,vG*.9,0.).g;
 if(vB.w>1.5) o=vec4(0.,ridge*vB.y*.6,core*vB.y*(.55+.6*gr),0.);       // a stick scratch
 else o=vec4(core*vB.y*teeth,ridge*vB.y*vB.z,0.,0.);                     // a rolling or skidding track
}`,Ge=`
vec4 camClip(vec3 w){ vec3 r=w-uE.xyz; float x=dot(r,uRt.xyz),y=dot(r,uUp.xyz),z=dot(r,uFw.xyz); return vec4(uE.w*x+uFw.w*z,uE.w*y+uRt.w*z,0.,z); }
`,bo=kt+`
uniform int uBase; uniform float uCell; out vec2 vN; flat out int vI; flat out float vRn; flat out vec2 vC;
void main(){
 int k=uBase+gl_InstanceID; int i=uOrd[k/4][k&3];
 vec4 C=uB[i]; vec3 r=C.xyz-uE.xyz; float z=dot(r,uFw.xyz),x=dot(r,uRt.xyz),y=dot(r,uUp.xyz);
 vec2 c=vec2(uE.w*x/max(z,1e-4)+uFw.w,uE.w*y/max(z,1e-4)+uRt.w);
 float rn=uE.w*C.w/sqrt(max(z*z-C.w*C.w,1e-7))*1.3;
 vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*2-1);
 vN=c+q*rn; vI=i; vRn=rn; vC=c;
 if(z<C.w*1.15) gl_Position=vec4(2.,2.,0.,1.);
 else if(uCell>.5){ float id=uV[i].z; vec2 cell=vec2(mod(id,${oe}.),floor(id/${oe}.)); gl_Position=vec4((cell+.5+q*.5)/${oe}.*2.-1.,0.,1.); }
 else gl_Position=vec4(vN,0.,1.);
}`,Ke=kt+`
uniform sampler2D uTop,uEnv,uNz,uNs; in vec2 vN; flat in int vI; out vec4 o;
vec3 qrot(vec4 q,vec3 v){ return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v); }
vec3 envAt(vec3 d){ vec2 e=vec2(atn2(d.x,d.z)/6.28318+.5,asin(clamp(d.y,-1.,1.))/3.14159+.5); return dec(textureLod(uEnv,e,0.).rgb); }
// the glass reads a smooth noise (eight texels to a cell, smoothstepped) so sheet edges have no creases from filtering
float n3(vec3 p){ return textureLod(uNs,(p.xz*.031+p.y*vec2(.0173,.0417))*8.,0.).r; }
vec3 nv(vec3 p){ return textureLod(uNs,(p.xz*.031+p.y*vec2(.0173,.0417))*8.,0.).rgb-.5; }
float n3b(vec3 p){ return textureLod(uNs,(p.zy*.027+p.x*vec2(.0391,.0117))*8.,0.).g; }
float seed,shellG,sea; vec3 cA,cB; float twist;
`,yo=`
vec3 sunL;
// the world along a ray leaving the glass: ground or sky, and the sun itself (other marbles are found once, before this).
// sp is how fast the ray turns per pixel: the ground map is read at that footprint, so the lens can't turn it to grain.
vec3 sec(vec3 ro,vec3 rd,float sp){
 vec3 col;
 if(rd.y<-.002){
  float t=-ro.y/rd.y; vec2 p=ro.xz+rd.xz*t, w=p/(2.*uReg.x)+.5;
  float lod=log2(max(sp*t/max(-rd.y,.05)*(uUp.w>=600.?512.:256.)/(2.*uReg.x),1e-4));
  vec3 g=dec(textureLod(uTop,w,clamp(lod,0.,6.)).rgb);
  col=mix(g,envAt(vec3(rd.x,.02,rd.z)),smoothstep(.45,1.2,t));
 } else col=envAt(rd);
 float s=max(dot(rd,sunL),0.);
 return col+uSunC.rgb*(pow(s,9000.)*70.+pow(s,1200.)*3.5+pow(s,200.)*.1);
}
void main(){
 vec4 Cn=uB[vI]; vec3 C=Cn.xyz; float R=Cn.w; vec4 q=uQ[vI]; vec4 V=uV[vI]; vec4 M=uMat[vI];
 seed=fract(M.x); shellG=M.w; sea=step(1.,uA[vI].a)*step(M.w,.1); cA=uA[vI].rgb; cB=uCb[vI].rgb; twist=uCb[vI].a;
 sunL=uLamp.w>.5?normalize(uLamp.xyz-C):uSun.xyz;
 vec3 rd=ray(vN), oc=uE.xyz-C; float b=dot(oc,rd), d2=dot(oc,oc)-b*b, h=R*R-d2;
 float dd=sqrt(max(d2,0.)), cov=clamp((R-dd)/max(fwidth(dd),1e-6)+.5,0.,1.);
 if(cov<=0.) discard;
 float t=-b-sqrt(max(h,0.)); vec3 p1=uE.xyz+rd*t, N=normalize(p1-C);
 vec4 qi=vec4(-q.xyz,q.w);
 vec3 nl=qrot(qi,N);
 int steps=int(V.y), nb=int(uT.w);
 if(steps<12) nb=0;
 // hand-made skin: slow waves in the surface, the sheared pontil at each pole of the cane, frost, conchoidal chips
 vec3 wob=nv(nl*1.7+seed), wj=nv(nl*7.+seed*3.);
 float pol=abs(dot(nl,vec3(.0976,.9759,.1952)));
 float pontil=smoothstep(.982,.993,pol+wob.x*.008);
 float frost=M.y, chipA=M.z;
 float frostM=frost*smoothstep(.2,.65,wj.y+.5+frost*.35);
 float rough=max(pontil*.55,frostM*.8);
 // frost is a matte finer than a pixel: it veils and blurs what is seen through it rather than bending it in a pattern
 vec3 bump=wob*.035+wj*.06*pontil;
 float chipLit=0.;
 int nCh=3*int(chipA>0.);
 for(int j=0;j<nCh;j++){
  float fj=float(j);
  vec3 dj=normalize(vec3(sin(seed*91.+fj*2.1),cos(seed*37.+fj*4.7)*.8+(fj-1.)*.5,sin(seed*53.+fj*1.3)));
  float cj=dot(nl,dj), rad=.9975-.003*chipA*(.4+.6*fract(seed*7.+fj*.37));
  // a flake: a shallow scoop bitten out of the rim of a circle, so it reads as a crescent with one hard bright edge
  vec3 dk=normalize(dj+cross(dj,vec3(.3,.8,.5))*.035);
  float inA=smoothstep(rad,rad+.0004,cj+wob.y*.0006), inB=smoothstep(rad-.0012,rad-.0004,dot(nl,dk));
  float mj=inA*(1.-inB);
  if(mj>0.){ vec3 tg=nl-dj*cj; bump-=tg*mj*7.; chipLit=max(chipLit,mj*(.25+.75*smoothstep(rad+.0009,rad,cj))); rough=max(rough,mj*.2); }
 }
 vec3 Ns=normalize(N+qrot(q,bump));
 // refraction in and out of the sphere: this is what hangs the world upside down
 vec3 T1=refract(rd,Ns,1./1.52);
 float ch=2.*dot(C-p1,T1); vec3 p2=p1+T1*ch; vec3 Nx=normalize(C-p2);
 vec3 T2=refract(T1,Nx,1.52);
 if(dot(T2,T2)<.01) T2=reflect(T1,Nx);
 float F=.043+.957*pow(clamp(1.+dot(rd,Ns),0.,1.),5.);
 vec3 Rf=reflect(rd,Ns);
 // how fast each outgoing ray turns across a pixel; frost and the pontil scatter it wider (a blur, not grain)
 float spT=length(fwidth(T2))+rough*.12, spR=length(fwidth(Rf))+rough*.12;
 // what the refracted ray meets first among the other marbles: this is the cluster hanging upside down inside
 float best=1e9; int who=-1;
 for(int j=0;j<nb;j++){
  if(j!=vI){ vec3 oc2=p2-uB[j].xyz; float b2=dot(oc2,T2), c2=dot(oc2,oc2)-uB[j].w*uB[j].w, h2=b2*b2-c2;
   if(h2>0.&&b2<0.){ float tq=-b2-sqrt(h2); if(tq>0.&&tq<best){ best=tq; who=j; } } }
 }
 // the two outgoing rays, through one call
 vec3 rc=vec3(0.),tc=vec3(0.);
 int nRay=2*int(uTone.x>-1.);
 for(int k=0;k<nRay;k++){ vec3 s=sec(k==0?p1+Ns*1e-4:p2,k==0?Rf:T2,k==0?spR:spT); if(k==0) rc=s; else tc=s; }
 if(who>=0){
  vec3 nn=normalize(p2+T2*best-uB[who].xyz);
  float fr=.06+.7*pow(1.+dot(nn,T2),3.);
  vec3 body=uA[who].rgb*(uAmb.rgb*.8+uSunC.rgb*.45*(.45+.55*max(dot(nn,-sunL),0.)));
  tc=mix(body,tc,fr);
 }
 // the march through the glass, in the marble's own frame, so its spin is the swirl turning
 vec3 a=qrot(qi,(p1-C)/R), e=qrot(qi,(p2-C)/R), Ll=qrot(qi,-sunL);
 float tr=1.; vec3 acc=vec3(0.), pv=a, fp=fld(a), fq=fp;
 int nI=3*int(uTone.x>-1.);
 for(int i=1;i<=steps;i++){
  vec3 p=mix(a,e,float(i)/float(steps)), f=fld(p);
  vec3 cr=f*fp;
  if(min(cr.x,min(cr.y,cr.z))<0.){
   // where each sheet crosses, from a parabola through this step and the one before (a straight line between steps left
   // sheet edges terraced), then every sheet crossed in this step, nearest first (taking only one cut steps into the rest)
   vec3 gq=i>1?fq:2.*fp-f, A=.5*(f+gq)-fp, B=.5*(f-gq), u=fp/(fp-f+vec3(1e-7));
   vec3 gu=fp+u*(B+u*A), du=B+2.*u*A;
   u=clamp(u-gu/mix(vec3(1e-5),du,greaterThan(abs(du),vec3(1e-5))),0.,1.);
   u=mix(vec3(2.),u,lessThan(cr,vec3(0.)));
   for(int c=0;c<nI;c++){
    float um=min(u.x,min(u.y,u.z));
    if(um>1.5) break;
    int k=u.x==um?0:(u.y==um?1:2);
    u=mix(u,vec3(2.),equal(ivec3(k),ivec3(0,1,2)));
    vec3 ph=mix(pv,p,um);
    vec4 sh=shade(ph,k);
    if(sh.a>0.){
     // low sun focuses through the glass onto its far side, so pigment there glows
     float rr=length(ph), lens=pow(max(dot(ph,Ll)/max(rr,.05)*.5+.5,0.),3.)*(.35+.65*rr);
     vec3 lit=sh.rgb*(uAmb.rgb*.5+uSunC.rgb*(.05+.26*lens));
     acc+=tr*sh.a*lit; tr*=1.-sh.a;
    }
   }
  }
  fq=fp; pv=p; fp=f;
 }
 vec3 abs0=exp(-(1.-uA[vI].rgb)*uA[vI].a*length(e-a)*.5);
 vec3 col=acc+tr*abs0*tc;
 // frost and chips scatter light in the skin: a veil tinted by the glass, which still lets its colour through
 vec3 scat=(uAmb.rgb*.6+uSunC.rgb*(.12+.24*max(dot(N,sunL)*.5+.5,0.)))*mix(vec3(1.),cA,.45+.4*sea);
 col=mix(col,scat,clamp(frostM*.2+pontil*.4,0.,.6));
 col+=uSunC.rgb*chipLit*.5*(.3+.7*max(dot(Ns,sunL),0.));
 col=mix(col,rc,F*(1.-rough*.6));
 // the sun itself on the skin: a hard spark with a small glow round it, broken by the surface
 vec3 Hv=normalize(sunL-rd); float nh=max(dot(Ns,Hv),0.);
 col+=uSunC.rgb*(pow(nh,7000.)*34.+pow(nh,900.)*1.6+pow(nh,160.)*.07)*(1.-rough*.7);
 o=vec4(tone(col)*cov,cov)*V.w;
}`,To=`
vec3 fld(vec3 p){
 float f=twist*p.y+seed*6., a=f, b=f+1.0472, c=f+2.0944;
 return vec3(p.x*sin(a)-p.z*cos(a),p.x*sin(b)-p.z*cos(b),p.x*sin(c)-p.z*cos(c));
}
vec4 shade(vec3 p,int k){
 float r=length(p.xz), y=p.y, rmax=.46*(1.-y*y*.82)+(n3(p*.8+seed)-.5)*.1;
 float m=smoothstep(rmax,rmax*.93,r)*smoothstep(.93,.78,abs(y));
 vec3 c=k==0?cA:(k==1?cB:mix(cA,cB,.5)*1.1);
 float st=n3(vec3(r*1.1+seed,y*.6,float(k)));
 c=c*(.7+.6*st); c=mix(c,vec3(.95,.92,.82),smoothstep(.13,.02,r)*.5);
 return vec4(c,.9*m);
}`,Eo=`
vec3 fld(vec3 p){
 float r=length(p.xz), w=n3(p*.55+seed)-.5, f=twist*p.y+seed*6.;
 return vec3(r-(.46+w*.11),r-(.25+w*.07),p.x*sin(f)-p.z*cos(f));
}
vec4 shade(vec3 p,int k){
 float r=length(p.xz), y=p.y, w=n3(p*.55+seed)-.5, ang=atn2(p.z,p.x)+twist*y+w*.8+seed*9.;
 float cap=smoothstep(.93,.74,abs(y)); vec3 c; float a;
 if(k==0){
  float s1=sin(ang*3.), s2=sin(ang*3.+2.2);
  float rb=smoothstep(.40,.52,s1), rc=smoothstep(.62,.72,s2);
  // striae: a few slow wandering changes in the depth of colour, not lines ruled along the vane
  float st=n3b(vec3(ang*1.2,r*.6+w*.9,y*.5+seed));
  c=mix(cA,cB,rc/max(rb+rc,.001))*(.84+.3*st);
  a=.93*max(rb,rc)*cap*(.8+.34*st);
 } else if(k==1){
  float th=pow(max(sin(ang*12.-y*4.),0.),7.);
  c=mix(vec3(.95,.92,.84),cB,sea*.85); a=(.9-.4*sea)*th*cap;
 } else {
  c=mix(cA,mix(vec3(.95,.92,.84),cB,sea*.85),smoothstep(.1,.2,r)); a=.85*smoothstep(.22,.18,r)*cap;
 }
 return vec4(c,clamp(a,0.,1.));
}`,zo=`
vec3 fld(vec3 p){ float rr=length(p); return shellG>.1?vec3(rr-.86,rr-.6,rr-.34):vec3(rr-.92,rr-.74,rr-.55); }
vec4 shade(vec3 p,int k){
 float rr=length(p), y=p.y, K=float(k); vec3 c; float a,cl,fA; vec2 gg;
 if(shellG>.1){
  float ang=atn2(p.z,p.x)+twist*.5*y+rr*2.6+seed*4.;
  float arm=.5+.5*sin(ang*2.+n3(p*.6+seed)*4.);
  cl=smoothstep(.35,.8,arm*.6+n3b(p*.8+seed)*.6);
  c=mix(cA,cB,arm)*(1.+1.6*cl); a=.34*cl+.05; fA=.84-cl*.1;
  gg=vec2(ang*(22.-K*5.),y*(26.-K*6.))+seed*29.;
 } else {
  float ang=atn2(p.z,p.x)+twist*.5*y+seed*5.;
  float st=n3(vec3(ang*1.3,y*.5,seed)), st2=n3b(vec3(ang*3.1,y*.9,seed*2.));
  float band=smoothstep(.33,.5,st*.65+st2*.35);
  c=mix(cA,cB,smoothstep(.36,.62,st2))*(.6+.8*st); a=k==0?.78*band:(k==1?.28*band:0.); fA=.93;
  gg=vec2(ang*(15.+K*6.),y*(19.+K*4.))+seed*17.;
 }
 vec2 g=floor(gg);
 float h=textureLod(uNz,(g+.5)/256.,0.).a;
 if(h>fA&&length(fract(gg)-.5)<.16+.2*fract(h*37.)){ c=vec3(1.5,1.28,.9); a=.95; }
 return vec4(c,a);
}`,go=Ke+`
vec3 sunL;
void main(){
 vec4 Cn=uB[vI]; vec3 C=Cn.xyz; float R=Cn.w; vec4 q=uQ[vI], V=uV[vI], M=uMat[vI];
 sunL=uLamp.w>.5?normalize(uLamp.xyz-C):uSun.xyz;
 vec3 rd=ray(vN), oc=uE.xyz-C; float b=dot(oc,rd), d2=dot(oc,oc)-b*b, h=R*R-d2;
 float dd=sqrt(max(d2,0.)), cov=clamp((R-dd)/max(fwidth(dd),1e-6)+.5,0.,1.);
 if(cov<=0.) discard;
 float t=-b-sqrt(max(h,0.)); vec3 p1=uE.xyz+rd*t, N=normalize(p1-C);
 vec3 nl=qrot(vec4(-q.xyz,q.w),N), col;
 float ndl=max(dot(N,sunL),0.);
 if(M.w<1.5){
  vec3 wj=vec3(n3(nl*19.+seed),n3b(nl*19.),n3(nl.yzx*19.))-.5;
  vec3 Ns=normalize(N+qrot(q,wj)*(.012+M.z*.09*smoothstep(.55,.8,n3(nl*7.))));
  vec3 Rf=reflect(rd,Ns); vec3 g;
  if(Rf.y<-.002){ float tt=-p1.y/Rf.y; vec2 w=(p1.xz+Rf.xz*tt)/(2.*uReg.x)+.5; g=mix(dec(texture(uTop,w).rgb),envAt(vec3(Rf.x,.02,Rf.z)),smoothstep(.45,1.2,tt)); } else g=envAt(Rf);
  float s=max(dot(Rf,sunL),0.);
  float fr=.62+.38*pow(clamp(1.+dot(rd,N),0.,1.),5.);
  col=g*fr*vec3(.92,.91,.88)+uSunC.rgb*(pow(s,24000.)*120.+pow(s,1200.)*6.+pow(s,60.)*.3);
  col*=.9+.25*n3b(nl*3.);
 } else {
  float gr=n3(nl*11.+V.x)*.6+n3b(nl*29.)*.4;
  vec3 wj=vec3(n3(nl*6.),n3b(nl*6.),n3(nl.yzx*6.))-.5;
  vec3 Ns=normalize(N+qrot(q,wj)*.25);
  float nl2=max(dot(Ns,sunL),0.);
  col=uA[vI].rgb*(.7+.6*gr)*(uSunC.rgb*nl2+uAmb.rgb*(.6+.4*Ns.y));
  col=mix(col,uCb[vI].rgb*(uSunC.rgb*.5*nl2+uAmb.rgb),smoothstep(.72,.9,gr)*.7);
 }
 o=vec4(tone(col)*cov,cov)*V.w;
}`,Ro=kt+`
uniform int uBase; out vec2 vN; flat out int vI; flat out float vRn; flat out vec2 vC; flat out float vCc; flat out vec4 vH; flat out vec2 vHI;
void main(){
 int k=uBase+gl_InstanceID; int i=uOrd[k/4][k&3];
 vec4 C=uB[i]; vec3 r=C.xyz-uE.xyz; float z=dot(r,uFw.xyz),x=dot(r,uRt.xyz),y=dot(r,uUp.xyz);
 vec2 c=vec2(uE.w*x/max(z,1e-4)+uFw.w,uE.w*y/max(z,1e-4)+uRt.w);
 float rn=uE.w*C.w/sqrt(max(z*z-C.w*C.w,1e-7))*1.3;
 float cc=uV[i].x*2./uUp.w;
 vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*2-1);
 vN=c+q*(rn+cc); vI=i; vRn=rn; vC=c; vCc=cc;
 // the two points of light a glass ball holds, defocused by the gather into discs the size of its blur: the sun seen
 // through the ball (a ball lens: the image sits opposite the sun, out from the middle as the sun moves off its axis)
 // and the sun's glint off its face
 vec3 L=uLamp.w>.5?normalize(uLamp.xyz-C.xyz):uSun.xyz, m=normalize(r), V=-m;
 vec3 o3=L-m*dot(L,m); float th=acos(clamp(dot(L,m),-1.,1.)), lo=length(o3);
 vec2 od=lo>1e-5?vec2(dot(o3,uRt.xyz),dot(o3,uUp.xyz))/lo:vec2(0.);
 float hb=0.,hd=1.; for(int j=0;j<10;j++){ float hm=.5*(hb+hd); if(2.*(asin(hm)-asin(hm/1.52))<th) hb=hm; else hd=hm; }
 float rS=rn/1.3, tr=th<1.6?(1.-smoothstep(.75,.97,hb)):0.;
 vec3 nh=normalize(L+V); vec2 gp=vec2(dot(nh,uRt.xyz),dot(nh,uUp.xyz));
 float fr=.04+.96*pow(1.-max(dot(nh,V),0.),5.);
 float glass=uMat[i].w>.5?0.:1., soft=smoothstep(4.,12.,uV[i].x*1000./uUp.w);
 vH=vec4(c-od*hb*rS,c+gp*rS); vHI=vec2(tr*glass,fr*(.4+.6*glass))*soft;
 gl_Position=z<C.w*1.15?vec4(2.,2.,0.,1.):vec4(vN,0.,1.);
}`,Ao=kt+`
uniform sampler2D uAt,uNz; uniform int uTaps; in vec2 vN; flat in int vI; flat in float vRn; flat in vec2 vC; flat in float vCc; flat in vec4 vH; flat in vec2 vHI; out vec4 o;
void main(){
 float id=uV[vI].z; vec2 cell=vec2(mod(id,${oe}.),floor(id/${oe}.));
 float rot=textureLod(uNz,gl_FragCoord.xy/256.,0.).r*6.283; vec4 s=vec4(0.);
 float lb=log2(max(vCc/vRn*(uUp.w>=600.?${Le/oe/2}.:${256/oe/2}.)*2.2/sqrt(float(uTaps)),1.));
 for(int i=0;i<uTaps;i++){
  float a=float(i)*2.39996+rot, r=sqrt((float(i)+.5)/float(uTaps));
  vec2 n=vN+vec2(cos(a),sin(a))*r*vCc, u=(n-vC)/vRn;
  if(max(abs(u.x),abs(u.y))<1.) s+=textureLod(uAt,(cell+.5+u*.5)/${oe}.,lb);
 }
 o=s/float(uTaps);
 // the bokeh of its two points: soft-edged discs, a little brighter at the rim, dimmer the wider they spread
 float e=4./uUp.w, rr=max(vCc,e*2.);
 vec2 dk=vec2(length(vN-vH.xy),length(vN-vH.zw))/rr;
 vec2 bk=vHI*smoothstep(1.+e/rr,1.-e/rr,dk)*(.8+.2*smoothstep(.4,1.,dk))*clamp(6./(rr*uUp.w*.5),.2,.6);
 vec3 lc=uSunC.rgb/max(uSunC.r,max(uSunC.g,uSunC.b));
 o.rgb+=(mix(vec3(1.),uA[vI].rgb*.6+.4,.35)*bk.x+bk.y)*mix(lc,vec3(1.),.55)*o.a;
}`,Mo=kt+Ge+`
uniform int uBase; out vec3 vP; flat out int vI; flat out vec3 vL; flat out float vW0;
void main(){
 int k=uBase+gl_InstanceID; int i=uOrd[k/4][k&3];
 vec4 C=uB[i]; vec3 L=uLamp.w>.5?normalize(uLamp.xyz-C.xyz):uSun.xyz; vL=L; vI=i;
 float y0=C.y-C.w; vec2 a=-normalize(L.xz), b=vec2(-a.y,a.x);
 float len=min(.7,2.2*C.w/max(L.y/length(L.xz),.02));
 vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*2-1);
 float d0=dot(C.xyz-uE.xyz,uFw.xyz), sg=max(uE.y/max(length(C.xyz-uE.xyz),.01),.04), bw=uFoc.y*abs(d0-uFoc.x)/max(d0,.01)*d0/(uE.w*uUp.w*.5)*(1.+1.8/sg);
 vW0=C.w*3.+min(bw,.12);
 float xx=mix(-2.2*C.w-min(bw,.12),len+2.2*C.w+min(bw,.12),q.x*.5+.5), yy=q.y*vW0;
 vec2 P=C.xz+a*xx+b*yy; vP=vec3(P.x,y0,P.y);
 gl_Position=camClip(vP);
}`,No=kt+`
uniform float uMode; in vec3 vP; flat in int vI; flat in vec3 vL; flat in float vW0; out vec4 o;
void main(){
 vec4 C=uB[vI]; vec3 o2=C.xyz-vP; float tc=dot(o2,vL); float dist=length(o2-vL*tc);
 float d=dot(vP-uE.xyz,uFw.xyz);
 float blurW=uFoc.y*abs(d-uFoc.x)/max(d,.01)*d/(uE.w*uUp.w*.5);
 vec3 tov=vP-uE.xyz; float sinG=max(uE.y/length(tov),.04);
 vec2 sa=normalize(vL.xz); float kk=abs(sa.x*normalize(tov.xz).y-sa.y*normalize(tov.xz).x);
 float w=max(tc,0.)*.012+blurW*(1.+1.8*kk/sinG)+.00025;
 vec2 sa2=normalize(vL.xz); float lat=abs(dot(vP.xz-C.xz,vec2(sa2.y,-sa2.x)));
 float s=smoothstep(C.w+w,C.w-w,dist)*step(0.,tc)*smoothstep(.0,.03+C.w,tc+C.w)*smoothstep(vW0,vW0*.6,lat);
 // a marble the lens blurs throws a shadow blurred as much as it is: the ellipse it casts on the ground as a soft blob,
 // the lens's circle carried from the screen onto the ground (wide in depth at this low view), its darkness spread thin
 float cpx=uFoc.y*abs(d-uFoc.x)/max(d,.01), pxm=d/(uE.w*uUp.w*.5), wb=cpx*pxm;
 if(wb>.1*C.w){
  vec2 ax=-sa2, bx=vec2(-ax.y,ax.x), rp=vP.xz-C.xz; float sE=vL.y, tE=vL.y/length(vL.xz);
  vec2 x=vec2(dot(rp,ax)-C.w/tE,dot(rp,bx));
  float j11=dot(ax,uRt.xz), j12=dot(bx,uRt.xz), j21=dot(ax,uFw.xz)*sinG, j22=dot(bx,uFw.xz)*sinG;
  float m11=j11*j11+j21*j21, m12=j11*j12+j21*j22, m22=j12*j12+j22*j22, md=max(m11*m22-m12*m12,1e-9);
  float kb=wb*wb*.3/md, sa_=C.w/sE*.6, sb_=C.w*.6;
  float t11=sa_*sa_+kb*m22, t12=-kb*m12, t22=sb_*sb_+kb*m11, td=t11*t22-t12*t12;
  float q=(x.x*x.x*t22-2.*x.x*x.y*t12+x.y*x.y*t11)/td;
  float sg2=min(sa_*sb_/sqrt(td),1.)*exp(-.5*q);
  // (a tight rack's shadows overlap and multiply; the union of them is lighter than that product)
  s=mix(s,sg2*.75,smoothstep(.1*C.w,.35*C.w,wb));
 }
 float ring=length(vP.xz-C.xz);
 vec2 rdr=(vP.xz-C.xz)/max(ring,1e-6); float ga=cpx*pxm*length(vec2(dot(rdr,uRt.xz),dot(rdr,uFw.xz)/sinG));
 float ao=smoothstep(C.w*1.25+ga,C.w*.12,ring)*.75*C.w/(C.w+ga);
 vec3 cl=uA[vI].rgb, f;
 if(uMode<.5){
  float glass=uMat[vI].w>.5?0.:1.;
  // glass lets most of the sun through, tinted, so its shadow is coloured and open; opaque marbles block it
  vec3 pass=mix(vec3(.26),.2+.3*mix(vec3(dot(cl,vec3(.33))),cl,.5),glass);
  // shade on dust is lit by the sky, not the sun: cooler than the dust beside it (uSun.w: how much)
  pass*=mix(vec3(1.),vec3(.84,1.,1.65),uSun.w);
  f=mix(vec3(1.),pass,s*mix(1.,.55,smoothstep(3.,14.,uV[vI].x*1000./uUp.w)));
  f*=1.-ao*uV[vI].w;
  f=mix(vec3(1.),f,uV[vI].w);
  o=vec4(pow(f,vec3(.55)),1.);
 } else {
  float glass=uMat[vI].w>.5?0.:1.;
  vec2 a=-normalize(vL.xz); float along=dot(vP.xz-C.xz,a), side=abs(dot(vP.xz-C.xz,vec2(-a.y,a.x)));
  float bg=min(blurW*(1.+1.8/sinG)*.5,.04), sa=C.w*C.w*.32;
  float g=exp(-pow(along-C.w*2.6,2.)/(C.w*C.w*3.6+bg*bg))*exp(-side*side/(sa+bg*bg))*sqrt(sa/(sa+bg*bg));
  o=vec4(uSunC.rgb*uTone.x*(.5+.5*cl)*g*.05*glass*uV[vI].w,1.);
 }
}`,_o=kt+Ge+`
uniform int uBase; out float vI2; out vec2 vUv; flat out int vI;
const int G=40;
void main(){
 int k=uBase+gl_InstanceID; int i=uOrd[k/4][k&3];
 vec4 C=uB[i]; vec3 L=uLamp.w>.5?normalize(uLamp.xyz-C.xyz):uSun.xyz; vI=i;
 int c=gl_VertexID/6, q=gl_VertexID%6;
 int gx=c%G, gy=c/G;
 int ox=(q==1||q==2||q==4)?1:0, oy=(q==2||q==4||q==5)?1:0;
 vec2 uv0=(vec2(gx+ox,gy+oy)/float(G))*2.-1.;
 uv0=uv0*sqrt(max(1.-.5*uv0.yx*uv0.yx,0.))*.995;
 vec3 s1=normalize(cross(L,vec3(.31,.9,.21))), s2=cross(L,s1);
 float y0=C.y-C.w; vec3 pts[3]; float h=.012;
 int nP=3*int(uTone.x>-1.);
 for(int m=0;m<nP;m++){
  vec2 uv=uv0+(m==1?vec2(h,0.):(m==2?vec2(0.,h):vec2(0.)));
  uv*=min(1.,.998/max(length(uv),1e-4));
  float zz=sqrt(max(1.-dot(uv,uv),0.));
  vec3 p1=C.xyz+C.w*(uv.x*s1+uv.y*s2+zz*L), n1=normalize(p1-C.xyz);
  vec3 T1=refract(-L,n1,1./1.52);
  vec3 p2=p1+T1*2.*dot(C.xyz-p1,T1), n2=normalize(C.xyz-p2);
  vec3 T2=refract(T1,n2,1.52);
  float tt=T2.y<-.001?(y0-p2.y)/T2.y:.8;
  pts[m]=p2+T2*min(tt,.8);
 }
 float nA=length(cross(pts[1]-pts[0],pts[2]-pts[0])), oA=C.w*C.w*h*h;
 vI2=min(oA/max(nA,1e-11),30.);
 vUv=uv0;
 gl_Position=camClip(pts[0]);
}`,Lo=kt+`
uniform sampler2D uBg,uNz; in float vI2; in vec2 vUv; flat in int vI; out vec4 o;
void main(){
 float r2=dot(vUv,vUv);
 float fres=1.-.75*pow(r2,6.);
 vec3 ca=uA[vI].rgb, cb=uCb[vI].rgb;
 // the sheets in the glass colour and break the light that passes
 float ang=atn2(vUv.y,vUv.x)*3.+uMat[vI].x*20., rr=length(vUv);
 float st=.5+.5*sin(ang+rr*6.);
 float strk=textureLod(uNz,vec2(ang*.04,rr*.06),0.).r;
 vec3 tint=mix(vec3(1.),mix(ca,cb,st),smoothstep(.05,.8,rr)*.42)*(.85+.3*strk);
 vec2 uv=gl_FragCoord.xy/uUp.w;
 vec3 g=dec(texture(uBg,uv).rgb), alb=mix(uG0.rgb,uG2.rgb,.55);
 alb*=.75+.25*clamp(dot(g,vec3(.33))/max(dot(alb*uSunC.rgb*.4,vec3(.33)),.01),0.,1.6);
 float foc=vI2*smoothstep(.6,2.5,vI2);
 vec3 c=alb*uSunC.rgb*.55*foc*fres*tint*uTone.x*uV[vI].w;
 c=1.-exp(-c*.9);
 o=vec4(c*step(uMat[vI].w,.5),1.);
}`,ko=kt+Ge+`
layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
out vec2 vQ; flat out vec4 vB; flat out vec3 vC;
void main(){
 vec2 q=vec2((gl_VertexID&1)*2-1,(gl_VertexID>>1)*2-1);
 vQ=q; vB=aB;
 vec3 P=aA.xyz+(uRt.xyz*q.x+uUp.xyz*q.y)*aA.w;
 vec3 L=uLamp.w>.5?normalize(uLamp.xyz-aA.xyz):uSun.xyz;
 vec3 v=normalize(aA.xyz-uE.xyz);
 float fw=pow(max(dot(v,L)*.5+.5,0.),5.);
 vC=uG2.rgb*(uAmb.rgb*.7+uSunC.rgb*(.25+1.5*fw));
 gl_Position=camClip(P);
}`,Fo=kt+`
uniform sampler2D uNz; in vec2 vQ; flat in vec4 vB; flat in vec3 vC; out vec4 o;
void main(){
 float d=dot(vQ,vQ);
 if(d>1.) discard;
 float n=textureLod(uNz,vQ*.12+vB.y,0.).r*.6+textureLod(uNz,vQ*.31+vB.y*3.,0.).g*.4;
 float a=(1.-d)*(1.-d)*(1.-d)*smoothstep(.15,.8,n+.3*(1.-d))*vB.x;
 o=vec4(tone(vC)*a,a*.8);
}`;function Co(e,t){const o=new Float32Array(4096);for(let F=0;F<o.length;F++)o[F]=e();const c=(F,Z)=>{const E=Math.floor(F),b=Math.floor(Z);let y=F-E,_=Z-b;y=y*y*(3-2*y),_=_*_*(3-2*_);const L=E&63,B=E+1&63,f=(b&63)*64,R=(b+1&63)*64,A=o[f+L],P=o[f+B],W=o[R+L],J=o[R+B];return A+(P-A)*y+(W-A)*_+(A-P-W+J)*y*_},i=oo,X=new Float32Array(i*i),n=2*zt/(i-1),rt=t===2?.25:t===1?.7:1;for(let F=0,Z=0;F<i;F++){const E=-zt+F*n;for(let b=0;b<i;b++,Z++){const y=-zt+b*n;X[Z]=rt*(.0042*(c(y*4.5+7,E*4.5+3)-.5)+.0016*(c(y*16,E*16+11)-.5)+5e-4*(c(y*47+5,E*47)-.5))}}const ht=(F,Z,E,b,y)=>{const _=Math.max(0,Math.floor((Z-b+zt)/n)),L=Math.min(i-1,Math.ceil((Z+b+zt)/n)),B=Math.max(0,Math.floor((E-b+zt)/n)),f=Math.min(i-1,Math.ceil((E+b+zt)/n));for(let R=B;R<=f;R++)for(let A=_;A<=L;A++){const P=-zt+A*n-Z,W=-zt+R*n-E,J=(P*P+W*W)/(b*b);J<1&&(F[R*i+A]+=y*(1-J)*(1-J))}};return{N:i,cell:n,mac:X,phys:new Float32Array(X),splat:ht,vn:c}}function Io(e,t){const o=Float64Array,c={n:t,x:new o(t),y:new o(t),z:new o(t),vx:new o(t),vy:new o(t),vz:new o(t),wx:new o(t),wy:new o(t),wz:new o(t),qx:new o(t),qy:new o(t),qz:new o(t),qw:new o(t),R:new o(t),m:new o(t),e:new o(t),awake:new Uint8Array(t),hide:new Uint8Array(t),still:new o(t),sl:new o(t),lx:new o(t),lz:new o(t),air:new Uint8Array(t),mur:.05,mus:.34,on:null,onLand:null,onTrack:null,fade:new o(t)},i=e.N,X=e.cell,n=e.phys;let rt=0,ht=0,F=0;const Z=(E,b)=>{const y=ee((E+zt)/X,0,i-1.001),_=ee((b+zt)/X,0,i-1.001),L=y|0,B=_|0,f=y-L,R=_-B,A=B*i+L,P=n[A],W=n[A+1],J=n[A+i],ft=n[A+i+1];rt=P+(W-P)*f+(J-P)*R+(P-W-J+ft)*f*R,ht=(W-P+(P-W-J+ft)*R)/X,F=(J-P+(P-W-J+ft)*f)/X};return c.heightAt=(E,b)=>(Z(E,b),rt),c.place=(E,b,y,_,L,B)=>{c.x[E]=b,c.z[E]=y,c.R[E]=_,c.m[E]=L,c.e[E]=B,Z(b,y),c.y[E]=rt+_,c.vx[E]=c.vy[E]=c.vz[E]=c.wx[E]=c.wy[E]=c.wz[E]=0,c.lx[E]=b,c.lz[E]=y,c.awake[E]=1,c.still[E]=0,c.fade[E]=1,c.hide[E]=0},c.step=function(E){const{x:b,y,z:_,vx:L,vy:B,vz:f,wx:R,wy:A,wz:P,R:W,m:J,awake:ft,hide:dt}=c;for(let a=0;a<t;a++){if(!ft[a]||dt[a])continue;Z(b[a],_[a]);const l=W[a],xt=ht,Ft=F,Ct=Math.sqrt(1+xt*xt+Ft*Ft),it=-xt/Ct,mt=1/Ct,ut=-Ft/Ct,st=y[a]-l-rt;if(st>25e-5)B[a]-=9.81*E,c.air[a]=1;else{let yt=L[a]*it+B[a]*mt+f[a]*ut;if(yt<0){const ot=-yt,wt=ot>.06?.28:0;L[a]-=it*yt*(1+wt),B[a]-=mt*yt*(1+wt),f[a]-=ut*yt*(1+wt),c.air[a]&&ot>.12&&c.onLand&&c.onLand(a,ot)}c.air[a]=0,st<0&&(y[a]-=st*.9);const $=-l*it,Rt=-l*mt,S=-l*ut;let Nt=L[a]+A[a]*S-P[a]*Rt,Dt=B[a]+P[a]*$-R[a]*S,Tt=f[a]+R[a]*Rt-A[a]*$;const Bt=Nt*it+Dt*mt+Tt*ut;Nt-=it*Bt,Dt-=mt*Bt,Tt-=ut*Bt;const V=Math.sqrt(Nt*Nt+Dt*Dt+Tt*Tt),j=9.81*mt;if(V>.012){let ot=c.mus*j*E;const wt=V/3.5;ot>wt&&(ot=wt);const K=Nt/V,bt=Dt/V,Et=Tt/V,At=-K*ot,_t=-bt*ot,Jt=-Et*ot;L[a]+=At+j*it*E,B[a]+=_t+(j*mt-9.81)*E,f[a]+=Jt+j*ut*E;const at=2.5/(l*l);R[a]+=at*(Rt*Jt-S*_t),A[a]+=at*(S*At-$*Jt),P[a]+=at*($*_t-Rt*At),c.sl[a]=1}else{L[a]+=5/7*j*it*E,B[a]+=(5/7*j*mt-5/7*9.81)*E,f[a]+=5/7*j*ut*E;const ot=Math.sqrt(L[a]*L[a]+B[a]*B[a]+f[a]*f[a]),K=c.mur*(1+3*Math.abs(xt+Ft))*9.81*E;if(ot<=K)L[a]=B[a]=f[a]=0;else{const At=1-K/ot;L[a]*=At,B[a]*=At,f[a]*=At}const bt=(R[a]*it+A[a]*mt+P[a]*ut)*Math.exp(-E*7),Et=1/l;R[a]=(mt*f[a]-ut*B[a])*Et+it*bt,A[a]=(ut*L[a]-it*f[a])*Et+mt*bt,P[a]=(it*B[a]-mt*L[a])*Et+ut*bt,c.sl[a]=0}}b[a]+=L[a]*E,y[a]+=B[a]*E,_[a]+=f[a]*E,Math.abs(b[a])>zt-.02&&(b[a]=Math.sign(b[a])*(zt-.02),L[a]*=-.2),Math.abs(_[a])>zt-.02&&(_[a]=Math.sign(_[a])*(zt-.02),f[a]*=-.2);const tt=c.qx[a],O=c.qy[a],gt=c.qz[a],Mt=c.qw[a],et=.5*E;let Q=tt+et*(R[a]*Mt+A[a]*gt-P[a]*O),St=O+et*(A[a]*Mt+P[a]*tt-R[a]*gt),It=gt+et*(P[a]*Mt+R[a]*O-A[a]*tt),pt=Mt-et*(R[a]*tt+A[a]*O+P[a]*gt);const nt=1/Math.sqrt(Q*Q+St*St+It*It+pt*pt);c.qx[a]=Q*nt,c.qy[a]=St*nt,c.qz[a]=It*nt,c.qw[a]=pt*nt;const h=b[a]-c.lx[a],Ot=_[a]-c.lz[a];h*h+Ot*Ot>18e-7&&(st<6e-4&&c.onTrack&&c.onTrack(a,c.lx[a],c.lz[a],b[a],_[a],c.sl[a]),c.lx[a]=b[a],c.lz[a]=_[a]);const Kt=L[a]*L[a]+B[a]*B[a]+f[a]*f[a],Ut=R[a]*R[a]+A[a]*A[a]+P[a]*P[a];Kt<25e-6&&Ut<.25&&st<6e-4?(c.still[a]+=E,c.still[a]>.12&&(ft[a]=0,L[a]=B[a]=f[a]=R[a]=A[a]=P[a]=0)):c.still[a]=0}for(let a=0;a<t;a++)if(!dt[a])for(let l=a+1;l<t;l++){if(dt[l]||!ft[a]&&!ft[l])continue;const xt=b[l]-b[a],Ft=y[l]-y[a],Ct=_[l]-_[a],it=W[a]+W[l],mt=xt*xt+Ft*Ft+Ct*Ct;if(mt>=it*it)continue;const ut=Math.sqrt(mt)||1e-6,st=xt/ut,tt=Ft/ut,O=Ct/ut,gt=W[a],Mt=W[l],et=1/J[a],Q=1/J[l],St=L[a]+(A[a]*O-P[a]*tt)*gt,It=B[a]+(P[a]*st-R[a]*O)*gt,pt=f[a]+(R[a]*tt-A[a]*st)*gt,nt=L[l]-(A[l]*O-P[l]*tt)*Mt,h=B[l]-(P[l]*st-R[l]*O)*Mt,Ot=f[l]-(R[l]*tt-A[l]*st)*Mt,Qt=St-nt,Kt=It-h,Ut=pt-Ot,yt=Qt*st+Kt*tt+Ut*O,$=it-ut,Rt=et+Q,S=$*et/Rt,Nt=$*Q/Rt;if(b[a]-=st*S,y[a]-=tt*S,_[a]-=O*S,b[l]+=st*Nt,y[l]+=tt*Nt,_[l]+=O*Nt,yt<=0)continue;const Dt=yt<.04?.2:Math.min(c.e[a],c.e[l]),Tt=(1+Dt)*yt/Rt;L[a]-=Tt*st*et,B[a]-=Tt*tt*et,f[a]-=Tt*O*et,L[l]+=Tt*st*Q,B[l]+=Tt*tt*Q,f[l]+=Tt*O*Q;const Bt=Qt-yt*st,V=Kt-yt*tt,j=Ut-yt*O,ot=Math.sqrt(Bt*Bt+V*V+j*j);if(ot>1e-5){const wt=Math.min(.12*Tt,ot/(3.5*Rt)),K=Bt/ot*wt,bt=V/ot*wt,Et=j/ot*wt;L[a]-=K*et,B[a]-=bt*et,f[a]-=Et*et,L[l]+=K*Q,B[l]+=bt*Q,f[l]+=Et*Q;const At=2.5/gt*et,_t=2.5/Mt*Q;R[a]-=At*(tt*Et-O*bt),A[a]-=At*(O*K-st*Et),P[a]-=At*(st*bt-tt*K),R[l]-=_t*(tt*Et-O*bt),A[l]-=_t*(O*K-st*Et),P[l]-=_t*(st*bt-tt*K)}ft[a]=ft[l]=1,c.still[a]=c.still[l]=0,c.on&&c.on(a,l,yt,b[a]+st*gt,y[a]+tt*gt,_[a]+O*gt)}},c.advance=function(E,b){let y=E,_=b;for(;y>1e-7&&_-- >0;){let L=0,B=!1;for(let R=0;R<t;R++)if(c.awake[R]&&!c.hide[R]){B=!0;const A=c.vx[R]*c.vx[R]+c.vz[R]*c.vz[R]+c.vy[R]*c.vy[R];A>L&&(L=A)}if(!B)return!1;const f=Math.min(y,1/240,.0035/Math.max(Math.sqrt(L),.01));c.step(f),y-=f}for(let L=0;L<t;L++)if(c.awake[L]&&!c.hide[L])return!0;return!1},c}function Uo(e){const t={tmp:{}},z=(b,y)=>{const _=e.createShader(b);return e.shaderSource(_,y+to),e.compileShader(_),_},o={m0:To,m1:Eo,m2:zo},c={det:[ie,no],feat:[co,io],crack:[ie,uo],env:[ie,lo],ground:[ie,fo],dof:[ie,vo],comp:[ie,ho],copy:[ie,xo],fade:[ie,mo],stamp:[po,wo],gather:[Ro,Ao],shad:[Mo,No],cau:[_o,Lo],dust:[ko,Fo]},i=[],X={},n=(b,y,_)=>{const L=e.createProgram();X[y]||(X[y]=z(e.VERTEX_SHADER,y));const B=z(e.FRAGMENT_SHADER,_);return e.attachShader(L,X[y]),e.attachShader(L,B),[b,L,B,X[y]]};for(const b in c)i.push(n(b,c[b][0],c[b][1]));for(const b of i)e.linkProgram(b[1]);e.flush(),t.P={};const rt={uNs:10,uNz:0,uMac:1,uFe:2,uDet:3,uEnv:4,uSrc:5,uBg:5,uTr:6,uTs:7,uTop:8,uAt:9},ht=([b,y,_,L])=>{e.getProgramParameter(y,e.LINK_STATUS)||console.error("147 "+b+": "+e.getProgramInfoLog(y)+" "+e.getShaderInfoLog(_)+" "+e.getShaderInfoLog(L));const B={},f=e.getProgramParameter(y,e.ACTIVE_UNIFORMS);e.useProgram(y);for(let P=0;P<f;P++){const W=e.getActiveUniform(y,P);if(W.name.indexOf(".")>=0)continue;const J=e.getUniformLocation(y,W.name);if(!J)continue;const ft=W.name.replace("[0]","");B[ft]=J,rt[ft]!==void 0&&e.uniform1i(J,rt[ft])}const R=e.getUniformBlockIndex(y,"S"),A=e.getUniformBlockIndex(y,"D");R!==e.INVALID_INDEX&&e.uniformBlockBinding(y,R,0),A!==e.INVALID_INDEX&&e.uniformBlockBinding(y,A,1),t.P[b]={p:y,u:B}};t.pendBase=i;let F=[];t.needM=b=>{for(const y of b){const _="m"+(y===3?2:y);t.P[_]||F.some(L=>L[0]===_)||F.push(n(_,bo,y===4?go:Ke+o[_]+yo))}for(const y of F)e.linkProgram(y[1]);e.flush()},t.finishM=()=>{if(t.pendBase){for(const b of t.pendBase)ht(b);t.pendBase=null}for(const b of F)ht(b);F=[],t.P.m2&&(t.P.m3=t.P.m2)},t.tri=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.tri),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),t.vaoTri=e.createVertexArray(),e.bindVertexArray(t.vaoTri),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),t.quad=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.quad),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),t.inst=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,t.inst),e.bufferData(e.ARRAY_BUFFER,8192,e.DYNAMIC_DRAW),t.vaoInst=e.createVertexArray(),e.bindVertexArray(t.vaoInst),e.bindBuffer(e.ARRAY_BUFFER,t.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,t.inst),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(2,1),t.vaoNone=e.createVertexArray(),e.bindVertexArray(null);const Z=new Uint8Array(256*256*4);let E=-1640531527;for(let b=0;b<Z.length;b++)E=Math.imul(E^E>>>15,739982445),E=E+1831565813|0,E^=E>>>12,Z[b]=E&255;t.nz=e.createTexture(),e.bindTexture(e.TEXTURE_2D,t.nz),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,Z),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);{const b=new Uint8Array(262144),y=_=>_*_*(3-2*_);for(let _=0;_<256;_++){const L=_>>3,B=y((_&7)/8),f=(L&31)*32,R=(L+1&31)*32;for(let A=0;A<256;A++){const P=A>>3,W=y((A&7)/8),J=P&31,ft=P+1&31;for(let dt=0;dt<4;dt++){const a=Z[(f+J)*4+dt],l=Z[(f+ft)*4+dt],xt=Z[(R+J)*4+dt],Ft=Z[(R+ft)*4+dt];b[(_*256+A)*4+dt]=Math.round(a+(l-a)*W+(xt-a)*B+(a-l-xt+Ft)*W*B)}}}t.ns=e.createTexture(),e.bindTexture(e.TEXTURE_2D,t.ns),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)}return t.fb=e.createFramebuffer(),t.det=Yt(e,512,512,!0,!0),t.bakeDet=()=>{t.bakeDet=null,ht(t.pendBase.shift()),e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t.det,0),e.viewport(0,0,512,512),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.colorMask(!0,!0,!0,!0),e.useProgram(t.P.det.p),e.uniform1i(t.P.det.u.uN5,5),e.uniform1i(t.P.det.u.uN9,9),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t.nz),e.bindVertexArray(t.vaoTri),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,t.det),e.generateMipmap(e.TEXTURE_2D),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null)},t.useFB=(b,y,_)=>{e.bindFramebuffer(e.FRAMEBUFFER,t.fb),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,b,0),e.viewport(0,0,y,_)},t}function Yt(e,t,z,o,c){const i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),o?e.texStorage2D(e.TEXTURE_2D,Math.floor(Math.log2(Math.max(t,z)))+1,e.RGBA8,t,z):e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,z,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,o?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const X=c?e.REPEAT:e.CLAMP_TO_EDGE;return e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,X),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,X),i}const pe=[[[.82,.1,.06],[.96,.68,.08]],[[.05,.22,.75],[.92,.9,.82]],[[.07,.52,.2],[.95,.42,.05]],[[.42,.07,.62],[.04,.62,.62]],[[.8,.06,.1],[.05,.2,.7]],[[.95,.55,.05],[.05,.26,.62]],[[.95,.75,.15],[.75,.08,.25]]],Je=[[[.22,.66,.42],[.7,.9,.78]],[[.16,.56,.66],[.66,.88,.9]],[[.8,.5,.14],[.95,.8,.5]],[[.14,.28,.72],[.55,.7,.92]],[[.4,.68,.22],[.8,.92,.6]]],$e=[[[.04,.05,.22],[.28,.06,.4]],[[.02,.14,.24],[.05,.34,.4]],[[.16,.03,.16],[.42,.1,.18]],[[.04,.04,.12],[.1,.18,.46]]],Bo={"golden hour":{el:23,sun:[3.9,2.45,1.12],amb:[.27,.26,.33],skyH:[.86,.45,.15],skyT:[.1,.13,.22],bnc:[.62,.42,.24],exp:.94,glow:.7,vig:.5,hz:1,cool:1},noon:{el:46,sun:[2.3,2.2,2],amb:[.48,.58,.76],skyH:[1,1.05,1.1],skyT:[.32,.52,.95],bnc:[.62,.55,.44],exp:.58,glow:.3,vig:.6},"street lamp at dusk":{el:24,sun:[3.9,2.55,1.25],amb:[.05,.07,.15],skyH:[.14,.085,.13],skyT:[.014,.024,.065],bnc:[.2,.14,.1],exp:.8,glow:.9,vig:.6,lamp:!0}},qo={"dusty dirt":{gt:0,g0:[.47,.33,.21],g1:[.27,.18,.115],g2:[.82,.68,.5],d:[6e-4,.0012,22e-5],scr:.55,scm:.85},"packed red clay":{gt:1,g0:[.55,.25,.14],g1:[.33,.13,.075],g2:[.8,.5,.35],d:[4e-4,8e-4,14e-5],scr:.55,scm:.9},"old concrete":{gt:2,g0:[.31,.3,.27],g1:[.2,.195,.18],g2:[.46,.44,.4],d:[28e-5,4e-4,14e-5],scr:1,scm:1}};He.add({num:147,name:"Marbles",fam:"Worlds",gl:!0,music:!0,fps:30,seed:0,recipe:"Old handmade glass marbles in a ring in the dirt, seen from marble height, with real spin and tracks that stay in the ground. The shooter and the set change every mint. Drag back from the shooter and let go to flick it (start high for topspin, low for backspin), tap to scratch a mark and move the camera, or hold to slow time and watch the swirls turn.",interactive:"Drag back from the shooter and let go to flick it: longer is faster, starting high gives topspin, starting low gives backspin. Tap to scratch a mark and move the camera. Hold to slow time and watch the swirls turn.",make(e){const t=e.gl,z=e.size;let o=We.get(t);o||(o=Uo(t),We.set(t,o));const c=o.P,i=qe(e.hash,147),X=z>=600,n=X?ao:512,rt=X?ro:512,ht=s=>qe(e.hash,9e3+s*131);let F=he(ht(1),[["cat's-eye",34],["swirl",30],["onionskin",22],["steel bumboozer",7],["clay",7]]),Z=he(ht(2),[["bright swirls",50],["sea glass",36],["galaxy with mica",14]]),E=he(ht(3),[["dusty dirt",54],["packed red clay",34],["chalk ring on old concrete",12]]),b=he(ht(4),[["golden hour",62],["noon",25],["street lamp at dusk",13]]),y=he(ht(5),[["new",42],["chipped",38],["frosted",20]]),_=he(ht(6),[["tight diamond",40],["cross",30],["loose scatter",30]]);e.home&&(F="swirl",Z="bright swirls",E="dusty dirt",b="golden hour",y="chipped",_="tight diamond"),e.trait("shooter",F),e.trait("set",Z),e.trait("ground",E),e.trait("light",b),e.trait("wear",y),e.trait("rack",_);const L=qe(e.hash,9e3+7*131);let B=he(L,[["behind the shooter",55],["across the rack",35],["down in the dirt",10]]);e.home&&(B="behind the shooter"),e.trait("view",B);const f=qo[E==="chalk ring on old concrete"?"old concrete":E],R=Bo[b],A=f.gt,P=i()*lt,W=R.el*Math.PI/180,J=[Math.sin(P)*Math.cos(W),Math.sin(W),Math.cos(P)*Math.cos(W)],ft=R.lamp?[J[0]/Math.cos(W)*.3,.42,J[2]/Math.cos(W)*.3]:[0,0,0],dt=.235+i()*.02,a=Co(i,A),l=a.N,xt=[],Ft=A===2?8:26,Ct=A===2?22:70,it=dt*.6,mt=-J[0],ut=-J[2],st=Math.hypot(mt,ut),tt=mt/st,O=ut/st,gt=e.home?-.6:(i()<.5?-1:1)*(.35+i()*.4),Mt=Math.cos(gt),et=Math.sin(gt),Q=[(tt*Mt-O*et)*(dt+.013),(tt*et+O*Mt)*(dt+.013)];for(let s=0;s<Ft+Ct;s++){const m=s<Ft,p=i()*lt,k=Math.sqrt(i())*zt,T=Math.cos(p)*k,C=Math.sin(p)*k,D=m?.003+i()*i()*.012:.0012+i()*.0022,G=Math.hypot(T,C)>it&&Math.hypot(T-Q[0],C-Q[1])>.035;xt.push({x:T,z:C,rad:D,ok:G,seed:i(),rot:i()*lt,asp:.65+i()*.4,h:m?(.3+i()*.5)*D/.012:(.2+i()*.3)*D/.006})}const St=A===2?4:16;for(let s=0;s<St;s++){const m=i()*lt,p=Math.sqrt(i())*.5,k=Math.cos(m)*p,T=Math.sin(m)*p,C=.014+i()*.022,D=-(.0014+i()*.003);a.splat(a.mac,k,T,C,D*(A===2?.4:1)),a.splat(a.phys,k,T,C,D*(A===2?.4:1))}for(const s of xt)s.ok&&s.rad>.003&&a.splat(a.phys,s.x,s.z,s.rad*.9,s.h*.012);const It=t.createTexture();t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,It),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R16F,l,l,0,t.RED,t.FLOAT,a.mac),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const pt=9+Math.floor(i()*7),nt=Math.min(pt+1,_e),h=Io(a,nt),Ot=new Int32Array(nt),Qt=new Float32Array(4*_e),Kt=new Float32Array(4*_e),Ut=new Float32Array(4*_e),yt=new Uint8Array(nt),$=(s,m)=>{const p=i()*lt,k=Math.acos(2*i()-1),T=i()*Math.PI,C=Math.sin(T);h.qx[s]=Math.sin(k)*Math.cos(p)*C,h.qy[s]=Math.cos(k)*C,h.qz[s]=Math.sin(k)*Math.sin(p)*C,h.qw[s]=Math.cos(T)},Rt=()=>y==="new"?[0,0]:y==="chipped"?[i()*.12,i()<.75?.5+i()*.5:0]:[.55+i()*.45,i()<.4?.4+i()*.4:0],S=(s,m,p,k,T,C,D,G,M)=>{Ot[s]=m;for(let r=0;r<3;r++)Qt[s*4+r]=p[r],Kt[s*4+r]=k[r];Qt[s*4+3]=T,Kt[s*4+3]=C,Ut[s*4]=(m===3?2:m===4?0:m)+i()*.999,Ut[s*4+1]=D,Ut[s*4+2]=G,Ut[s*4+3]=M,yt[s]=M<.5?1:0};{const s=pe[Math.floor(i()*pe.length)],m=Rt();if(F==="steel bumboozer")S(0,4,[.72,.72,.7],[.5,.5,.5],0,0,0,m[1],1);else if(F==="clay")S(0,4,[.6,.32,.18],[.28,.15,.09],0,0,0,0,2);else if(F==="cat's-eye"){const p=pe[Math.floor(i()*pe.length)];S(0,0,p[0],p[1],.25,1.2+i()*1.4,m[0],m[1],0)}else if(F==="onionskin")S(0,2,s[0],s[1],.35,1.4,m[0],m[1],0);else{const p=e.home?[[.86,.1,.04],[.06,.26,.72]]:s;S(0,1,p[0],p[1],.15,e.home?4.4:3.1+i()*1.8,m[0],e.home?.9:m[1],0)}}for(let s=1;s<nt;s++){const m=Rt();if(Z==="bright swirls"){const p=pe[Math.floor(i()*pe.length)],k=i()<.3&&!e.home;S(s,k?0:1,p[0],p[1],.18,k?1+i():2.4+i()*2.6,m[0],m[1],0)}else if(Z==="sea glass"){const p=Je[Math.floor(i()*Je.length)];S(s,i()<.5?2:1,p[0],p[1],1.3,1.6+i()*2,Math.max(m[0],.16+i()*.2),m[1],0)}else{const p=$e[Math.floor(i()*$e.length)];S(s,3,p[0],p[1],1.5,1+i()*1.5,m[0],m[1],.25)}}o.needM(new Set(Ot)),o.bakeDet&&o.bakeDet();const Nt=F==="steel bumboozer"?.0125:F==="clay"?.0098:.0108,Dt=F==="steel bumboozer"?7.8:F==="clay"?1.8:2.5,Tt=(s,m)=>m*s*s*s*4189,Bt=F==="steel bumboozer"?.85:F==="clay"?.45:.94,V=(s,m)=>{const p=nt-1,k=.0086,T=k*2.02,C=[];if(s==="tight diamond"){const D=Math.ceil(Math.sqrt(p));for(let G=0,M=0;G<D&&M<p;G++)for(let r=0;r<D&&M<p;r++,M++)C.push([(G-r)*T*.72,(G+r-D+1)*T*.72])}else if(s==="cross"){C.push([0,0]);for(let D=1;D<p;D++){const G=(D-1)%4,M=Math.ceil(D/4)*T*1.15,r=G*Math.PI/2+.35;C.push([Math.cos(r)*M,Math.sin(r)*M])}}else for(let D=0;D<p;D++){const G=D*2.39996+i(),M=T*1.5*Math.sqrt(D+.4);C.push([Math.cos(G)*M,Math.sin(G)*M])}for(let D=0;D<p;D++){const G=D+1,M=k*(.94+i()*.12);h.place(G,C[D][0]+(i()-.5)*6e-4,C[D][1]+(i()-.5)*6e-4,M,Tt(M,2.5),.94),m&&(h.y[G]+=m*(.5+i()),h.air[G]=1),$(G)}};if($(0),e.home){h.qx[0]=.22,h.qy[0]=.15,h.qz[0]=.82,h.qw[0]=.5;const s=Math.hypot(.22,.15,.82,.5);h.qx[0]/=s,h.qy[0]/=s,h.qz[0]/=s,h.qw[0]/=s}h.place(0,Q[0],Q[1],Nt,Tt(Nt,Dt),Bt),V(_,0),h.mur=A===2?.04:A===1?.09:.14,h.mus=A===2?.2:.34,h.advance(1.6,500);for(let s=0;s<nt;s++)h.awake[s]=0,h.vx[s]=h.vy[s]=h.vz[s]=h.wx[s]=h.wy[s]=h.wz[s]=0;const j=qe(e.hash,9e3+8*131),ot=!e.home&&j()<.45;e.trait("moment",ot?"just after the break":"before the shot");const wt=[];if(ot){let s=1,m=1e9;for(let M=1;M<nt;M++){const r=Math.hypot(h.x[M]-h.x[0],h.z[M]-h.z[0]);r<m&&(m=r,s=M)}const p=Math.atan2(h.z[s]-h.z[0],h.x[s]-h.x[0])+(j()-.5)*.08,k=1.7+j()*1.1,T=Math.sqrt(k*k+2*h.mur*9.81*1.5*m),C=Math.cos(p),D=Math.sin(p),G=(j()-.5)*1.4*1.75/h.R[0];h.vx[0]=C*T,h.vz[0]=D*T,h.vy[0]=0,h.wx[0]=D*T*G,h.wy[0]=0,h.wz[0]=-C*T*G,h.awake[0]=1,h.still[0]=0,h.onTrack=(M,r,v,x,w,u)=>wt.push(0,M,r,v,x,w,u),h.on=(M,r,v,x,w,u)=>{v>.25&&wt.push(1,M,x,u,v,0,0)},h.onLand=M=>wt.push(2,M,h.x[M],h.z[M],0,0,0),h.advance(9,5e3),h.on=h.onLand=h.onTrack=null;for(let M=0;M<nt;M++)h.awake[M]=0,h.vx[M]=h.vy[M]=h.vz[M]=h.wx[M]=h.wy[M]=h.wz[M]=0}const K=new Float32Array(65*4),bt=new ArrayBuffer(1168),Et=new Float32Array(bt),At=new Int32Array(bt),_t=t.createBuffer(),Jt=t.createBuffer(),at=(s,m,p)=>{K[s*4]=m[0],K[s*4+1]=m[1],K[s*4+2]=m[2],K[s*4+3]=p};K.set(Qt,17*4),K.set(Kt,33*4),K.set(Ut,49*4),at(4,[0,0,0],0),at(5,J,R.cool||0),at(6,R.sun,R.hz||0),at(7,R.amb,0),at(8,R.bnc,A),at(9,R.skyH,0),at(10,R.skyT,0),at(11,f.g0,f.d[0]),at(12,f.g1,f.d[1]),at(13,f.g2,f.d[2]),at(14,[R.exp,R.glow,f.scm],R.vig),at(15,[zt,dt,1],14),K[9*4+3]=i()*lt,K[10*4+3]=i()*lt,at(16,ft,R.lamp?1:0);const $t={e:[0,0,0],v:[0,0,1],sx:0,sy:0,f:1},ke=2.78,Vt=24*z/1e3,we=64*z/1e3,ue=()=>{const s=$t.v,m=[s[2],0,-s[0]],p=Math.hypot(m[0],m[2]);m[0]/=p,m[2]/=p,at(0,$t.e,ke),at(1,s,$t.sx),at(2,[-m[0],0,-m[2]],$t.sy),at(3,[0,1,0],z),K[4*4]=$t.f,K[4*4+1]=Vt,K[4*4+2]=f.scr,K[4*4+3]=we,t.bindBuffer(t.UNIFORM_BUFFER,_t),t.bufferData(t.UNIFORM_BUFFER,K,t.DYNAMIC_DRAW)},ae=()=>{t.bindBufferBase(t.UNIFORM_BUFFER,0,_t),t.bindBufferBase(t.UNIFORM_BUFFER,1,Jt)};t.bindBuffer(t.UNIFORM_BUFFER,Jt),t.bufferData(t.UNIFORM_BUFFER,Et,t.DYNAMIC_DRAW);const re=(s,m,p,k,T,C)=>be(h.x[s],h.y[s],h.z[s],m,p,k,T,C),be=(s,m,p,k,T,C,D,G)=>{const M=Math.hypot(s,p);let r=-tt*.35,v=-O*.35;M>.02?(r-=s/M,v-=p/M):(r-=tt,v-=O);const x=Math.cos(k),w=Math.sin(k),u=r*x-v*w,g=r*w+v*x,q=Math.hypot(u,g),I=[u/q,0,g/q],U=(G-D)/ke*T,Y=-I[2]*-tt+I[0]*-O;return{e:[s-I[0]*T,m+U,p-I[2]*T],v:I,sx:Y<0?-Math.abs(C):Math.abs(C),sy:G,f:T}},ye=(s,m,p,k,T,C,D,G)=>{const M=Math.hypot(p,k)||1,r=[p/M,0,k/M],v=h.heightAt(s,m)+.0086,x=(G-D)/ke*T,w=-r[2]*-tt+r[0]*-O;return{e:[s-r[0]*T,v+x,m-r[2]*T],v:r,sx:w<0?-Math.abs(C):Math.abs(C),sy:G,f:T}},xe=e.home?0:(i()-.5)*.4,Te=1+Math.floor(L()*(nt-1)),Ee=(L()-.5)*.7,Se=L()<.5?-1:1,Oe=(s,m)=>{const p=m.e[0],k=m.e[2],T=h.x[s]-p,C=h.z[s]-k,D=T*T+C*C;for(let G=0;G<nt;G++){if(G===s||h.hide[G])continue;const M=h.x[G]-p,r=h.z[G]-k,v=(M*T+r*C)/D;if(v>0&&v<1&&Math.hypot(M-v*T,r-v*C)<h.R[G]+h.R[s]*.9)return!1}return!0},le=s=>{let m=null;for(let p=0;p<nt-1;p++){const k=1+(Te-1+p)%(nt-1);if(h.hide[k])continue;const T=re(k,Se*(.45+Math.abs(Ee))+s*.3,.05,.26,-.3,.3);if(m||(m=T),Oe(k,T))return T}return m||re(0,s,.085,.24,-.18,.4)},Pt=s=>B==="across the rack"?le(s):B==="down in the dirt"?re(0,s+Ee,.09,.3,.16,.75):re(0,s,.085,.24,-.18,.4);if(Object.assign($t,Pt(xe)),e.home){const s=$t.v,m=-s[2],p=s[0];let k=-m*.62-s[0]*.48,T=.62,C=-p*.62-s[2]*.48;const D=Math.hypot(k,T,C);k/=D,T/=D,C/=D;const G=1+T,M=Math.hypot(C,0,-k,G);h.qx[0]=C/M,h.qy[0]=0,h.qz[0]=-k/M,h.qw[0]=G/M}ue(),ae(),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.disable(t.BLEND),t.colorMask(!0,!0,!0,!0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.nz),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,o.det),o.finishM();const qt=()=>{t.bindVertexArray(o.vaoTri),t.drawArrays(t.TRIANGLES,0,3)},ze=Yt(t,Ye,Qe,!1,!0);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.activeTexture(t.TEXTURE10),t.bindTexture(t.TEXTURE_2D,o.ns),o.useFB(ze,Ye,Qe),t.useProgram(c.env.p),qt();const se=Yt(t,rt,rt,!1,!1);o.useFB(se,rt,rt),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.BLEND),t.blendEquation(t.MAX),t.blendFunc(t.ONE,t.ONE);const jt=new Float32Array(8*180);let me=0;const ge=(s,m,p,k,T,C,D,G)=>{const M=me++*8;jt[M]=s,jt[M+1]=m,jt[M+2]=p,jt[M+3]=k,jt[M+4]=T,jt[M+5]=C,jt[M+6]=D,jt[M+7]=G};for(const s of xt)s.ok&&ge(s.x,s.z,s.rad/.62,s.seed,s.rot,s.asp,0,Math.min(s.h,1));const Re=-Q[0]/(dt+.013),Ae=-Q[1]/(dt+.013),Xt=(s,m,p,k,T,C,D,G)=>ge(Q[0]+Re*s-Ae*m,Q[1]+Ae*s+Re*m,p,G,k,T,C,D);A!==2&&Xt(.055+i()*.03,(i()<.5?-1:1)*(.035+i()*.02),.0125+i()*.004,i()*lt,1.6,1,.11,i());for(let s=0;s<10;s++){const m=.012+i()*.09,p=(i()<.5?-1:1)*(.016+i()*.05),k=s<3?.0028+i()*.002:9e-4+i()*.0012;Xt(m,p,k/.62,i()*lt,.7+i()*.3,0,Math.min(1,k/.0075*(.4+i()*.25)),i())}const Zt=A===2?2:3;for(let s=0;s<Zt;s++){const m=i()*lt,p=.09+i()*.4,k=.013+i()*.012;Math.hypot(Math.cos(m)*p-Q[0],Math.sin(m)*p-Q[1])<.08||ge(Math.cos(m)*p,Math.sin(m)*p,k,i(),i()*lt,1.5+i()*.5,1,.1+i()*.06)}t.bindBuffer(t.ARRAY_BUFFER,o.inst),t.bufferData(t.ARRAY_BUFFER,jt.subarray(0,me*8),t.DYNAMIC_DRAW),t.useProgram(c.feat.p),t.uniform1f(c.feat.u.uHalf,zt),t.bindVertexArray(o.vaoInst),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,me),t.useProgram(c.crack.p);{const s=i()*lt,m=Math.cos(s)*.22,p=Math.sin(s)*.22,k=i()*lt,T=.22+i()*.25;t.uniform4f(c.crack.u.uC,m-Math.cos(k)*T,p-Math.sin(k)*T,m+Math.cos(k)*T,p+Math.sin(k)*T),t.uniform4f(c.crack.u.uC2,i(),i(),0,0)}qt(),t.blendEquation(t.FUNC_ADD),t.disable(t.BLEND);const fe=X?so:256,ne=Yt(t,fe,fe,!0,!1),ve=()=>{t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o.nz),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,It),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,se),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,o.det),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,ze)};ve(),t.useProgram(c.ground.p),o.useFB(ne,fe,fe),t.uniform1f(c.ground.u.uTopV,1),t.uniform1i(c.ground.u.uSteps,8),qt(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.activeTexture(t.TEXTURE8),t.bindTexture(t.TEXTURE_2D,ne),t.generateMipmap(t.TEXTURE_2D),t.uniform1f(c.ground.u.uTopV,0);const Gt=Yt(t,z,z,!1,!1);let ce=o.tmp[z];ce||(ce=o.tmp[z]=[Yt(t,z,z,!1,!1),Yt(t,z,z,!1,!1)]);const De=s=>{t.disable(t.BLEND),ve(),t.useProgram(c.ground.p),t.uniform1i(c.ground.u.uSteps,s?28:56),o.useFB(ce[0],z,z),qt(),t.useProgram(c.dof.p),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D,ce[0]),o.useFB(ce[1],z,z),t.uniform4f(c.dof.u.uGat,s?14:40,Vt*1.25,1,1/z),qt(),t.bindTexture(t.TEXTURE_2D,ce[1]),o.useFB(Gt,z,z),t.uniform4f(c.dof.u.uGat,10,Math.max(2,Vt*.22),1,1/z),qt()};De(!1);const Me=Yt(t,n,n,!1,!1),Pe=Yt(t,256,256,!1,!1);o.useFB(Me,n,n),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),o.useFB(Pe,256,256),t.clear(t.COLOR_BUFFER_BIT);const Ve=Yt(t,X?Le:256,X?Le:256,!0,!1);return So({setRing:(s,m)=>{K[15*4+1]=s,K[15*4+2]=m,t.bindBuffer(t.UNIFORM_BUFFER,_t),t.bufferData(t.UNIFORM_BUFFER,K,t.DYNAMIC_DRAW)},X:o,P:c,gl:t,size:z,big:X,TK:n,n:nt,Sim:h,typeOf:Ot,glassM:yt,DF:Et,DI:At,DB:bt,ubD:Jt,ubS:_t,bindUbos:ae,uploadCam:ue,frameOn:re,viewCam:Pt,lookAlong:ye,cam:$t,bakeScreen:De,tri:qt,bgT:Gt,trT:Me,tsT:Pe,atT:Ve,topT:ne,envT:ze,macT:It,feT:se,r:i,hp:Q,Rr:dt,rackAt:V,rackN:_,preMarks:wt,gt:A,Gd:f,Li:R,F:ke,cocK:Vt,c:e,shooter:F,sdx:tt,sdz:O,L0:J,W:a})}});function So(e){const{X:t,P:z,gl:o,size:c,TK:i,n:X,Sim:n,typeOf:rt,glassM:ht,DF:F,DI:Z,ubD:E,bindUbos:b,uploadCam:y,frameOn:_,viewCam:L,lookAlong:B,cam:f,bakeScreen:R,tri:A,bgT:P,trT:W,tsT:J,atT:ft,topT:dt,envT:a,r:l,gt:xt,Gd:Ft,Li:Ct,F:it,cocK:mt,c:ut,shooter:st,L0:tt}=e;let O=e.Rr,gt=e.rackN;const Mt=320,et=new Float32Array(8*Mt);let Q=0,St=!1,It=0;const pt=(r,v,x,w,u,g,q,I)=>{if(Q>=Mt)return;const U=Q++*8;et[U]=r,et[U+1]=v,et[U+2]=x,et[U+3]=w,et[U+4]=u,et[U+5]=g,et[U+6]=q,et[U+7]=I},nt=()=>{Q&&(t.useFB(W,i,i),o.enable(o.BLEND),o.blendEquation(o.MAX),o.blendFunc(o.ONE,o.ONE),o.useProgram(z.stamp.p),o.uniform1f(z.stamp.u.uHalf,.6),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t.nz),o.bindBuffer(o.ARRAY_BUFFER,t.inst),o.bufferData(o.ARRAY_BUFFER,et.subarray(0,Q*8),o.DYNAMIC_DRAW),o.bindVertexArray(t.vaoInst),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Q),o.blendEquation(o.FUNC_ADD),o.disable(o.BLEND),Q=0,St=!0),St&&It%3===0&&(t.useFB(J,256,256),o.useProgram(z.copy.p),o.activeTexture(o.TEXTURE5),o.bindTexture(o.TEXTURE_2D,W),A(),St=!1)},h=(r,v,x)=>{t.useFB(W,i,i),o.enable(o.BLEND),o.blendFunc(o.ZERO,o.SRC_COLOR),o.useProgram(z.fade.p),o.uniform4f(z.fade.u.uF,r,v,x,1),A(),o.disable(o.BLEND),St=!0},Ot=xt===2,Qt=Ot?.0028:.0011,Kt=Ot?.95:1;let Ut=[];const yt=r=>{Ut=[];const v=220,x=l()*lt,w=l()*lt,u=l()*lt;let g=0,q=0;for(let I=0;I<=v;I++){const U=x+I/v*lt,Y=r*(1+.012*Math.sin(U*3+w)+.006*Math.sin(U*7+u))+6e-4*Math.sin(U*37+w),vt=Math.cos(U)*Y,ct=Math.sin(U)*Y;I&&Ut.push([g,q,vt,ct,Qt*(1+.2*Math.sin(U*11+u)),Kt*(.85+.15*Math.sin(U*5+w))]),g=vt,q=ct}};if(yt(O),xt!==2||l()<.5)for(let r=0;r<7;r++){let v=(l()-.5)*.8,x=(l()-.5)*.8,w=l()*lt;const u=(l()-.5)*6,g=18+Math.floor(l()*26),q=.16+l()*.16;for(let I=0;I<g;I++){const U=v+Math.cos(w)*.008,Y=x+Math.sin(w)*.008;pt(v,x,U,Y,.0024,q*.7,.25,1),v=U,x=Y,w+=u*.008}nt()}for(let r=0;r<6;r++){const v=l()*lt,x=l()*.5,w=Math.cos(v)*x,u=Math.sin(v)*x,g=l()*lt,q=.006+l()*.02;pt(w,u,w+Math.cos(g)*q,u+Math.sin(g)*q,8e-4,.55,.5,2)}const $=e.preMarks;for(let r=0;r<$.length;r+=7){Q>=Mt-2&&nt();const v=$[r],x=$[r+1],w=n.R[x];v===0?$[r+6]?pt($[r+2],$[r+3],$[r+4],$[r+5],w*.38,.5,.5,0):pt($[r+2],$[r+3],$[r+4],$[r+5],w*.3,.3,.24,1):v===1?pt($[r+2]-.001,$[r+3],$[r+2]+.001,$[r+3],.0024+$[r+4]*.001,.25,.55,1):pt($[r+2]-5e-4,$[r+3],$[r+2]+5e-4,$[r+3],.003,.5,.7,1)}nt(),t.useFB(J,256,256),o.useProgram(z.copy.p),o.activeTexture(o.TEXTURE5),o.bindTexture(o.TEXTURE_2D,W),A(),St=!1;const Rt=56,S=new Float32Array(Rt*10);let Nt=0;const Dt=12,Tt=[];for(let r=0;r<Dt;r++)Tt.push([f.e[0]+f.v[0]*(.04+l()*.25)+(l()-.5)*.16,.004+l()*.05,f.e[2]+f.v[2]*(.04+l()*.25)+(l()-.5)*.16,l()*lt,l(),5e-4+l()*9e-4]);const Bt=(r,v,x,w,u)=>{for(let g=0;g<w;g++){Nt>=Rt&&(Nt=0);const q=Nt++*10,I=l()*lt,U=(.03+l()*.16)*u;S[q]=r+Math.cos(I)*.002,S[q+1]=v+l()*.002,S[q+2]=x+Math.sin(I)*.002,S[q+3]=Math.cos(I)*U,S[q+4]=(.03+l()*.12)*u,S[q+5]=Math.sin(I)*U,S[q+6]=1,S[q+7]=.0026+l()*.0034*u,S[q+8]=l(),S[q+9]=.55+l()*.5}},V=new Float32Array(8*(Rt+Dt+10)),j=ut.sound;let ot=77,wt=0,K=0,bt=2+l()*3,Et=0,At=0,_t=0;const Jt=new Float32Array(512),at=r=>{const v=r-f.e[0],x=0,w=-f.v[2];return ee(v*w*3+x,-.8,.8)},$t=(r,v,x,w)=>{if(wt++>5)return;const u=ee(x/2.4,.03,1),g=!ht[r]||!ht[v],q=n.e[r]<.5||n.e[v]<.5,I=at(w),U=(n.R[r]+n.R[v])*.5,Y=3400*(.0086/U)*(1+.16*Math.log2(1+u*3))*(.97+l()*.06);q?(j.note(0,{freq:780+u*300,dur:.03,vel:u*.9,wave:"triangle",pan:I,cutoff:1500}),j.hit("click",u*.4,{pan:I})):g?(j.note(0,{freq:Y*.72,dur:.11+u*.12,vel:u*.65,wave:"sine",pan:I}),j.note(0,{freq:Y*1.93,dur:.08,vel:u*.3,wave:"sine",pan:I}),j.hit("click",u*.5,{pan:I})):(j.note(0,{freq:Y,dur:.035+u*.05,vel:.25+u*.75,wave:"sine",pan:I}),j.note(0,{freq:Y*2.31,dur:.022+u*.025,vel:u*.45,wave:"sine",pan:I}),j.note(0,{freq:Y*3.87,dur:.014,vel:u*.25,wave:"triangle",pan:I}),j.hit("click",u*.6,{pan:I})),u>.25&&j.hit("noise",u*.22,{cutoff:700,dur:.14,pan:I})};n.on=(r,v,x,w,u,g)=>{$t(r,v,x,w),x>.5&&Bt(w,Math.min(u,.006),g,Math.min(8,1+Math.floor(x*2.2)),Math.min(1.4,x*.5)),x>.25&&pt(w-.001,g,w+.001,g,.0024+x*.001,.25,.55,1)},n.onLand=(r,v)=>{Bt(n.x[r],.002,n.z[r],3,Math.min(1.2,v*1.5)),pt(n.x[r]-5e-4,n.z[r],n.x[r]+5e-4,n.z[r],.003,.5,.7,1),wt++<6&&(j.hit("noise",Math.min(1,v)*.3,{cutoff:500,dur:.08,pan:at(n.x[r])}),j.note(0,{freq:240+80*v,dur:.05,vel:Math.min(1,v)*.4,wave:"sine",pan:at(n.x[r])}))},n.onTrack=(r,v,x,w,u,g)=>{const q=n.R[r];g?pt(v,x,w,u,q*.38,.5,.5,0):pt(v,x,w,u,q*.3,.3,.24,1)};const ke=[0,1];let Vt="play",we=0,ue=ut.home?5.2:4.6+l()*2.4,ae=0,re=0,be=1,ye=!1,xe=!1,Te=!1;const Ee=(r,v,x,w,u=!0)=>{const g=n.R[0];n.vx[0]=r*x,n.vz[0]=v*x,n.vy[0]=0;const q=w*1.75/g;if(n.wx[0]=v*x*q,n.wy[0]=0,n.wz[0]=-r*x*q,n.awake[0]=1,n.still[0]=0,we=0,ye=!0,xe=!1,Te=!0,Bt(n.x[0],.003,n.z[0],4,.6),u&&x>.25){let I=-1,U=1e9;for(let vt=1;vt<X;vt++){if(n.hide[vt])continue;const ct=n.x[vt]-n.x[0],Lt=n.z[vt]-n.z[0],Ht=ct*r+Lt*v;Ht>0&&Math.abs(ct*v-Lt*r)<.03&&Ht<U&&(U=Ht,I=vt)}const Y=l()<.5?-.33:.33;if(I>0){const vt=(n.x[0]+n.x[I])*.5,ct=(n.z[0]+n.z[I])*.5;se(B(vt+r*.02,ct+v*.02,r-v*Y,r*Y+v,Math.max(.12,U*.5+.07),.1,-.25,.3),.9)}else if(x*x/(2*n.mur*9.81*1.5)<.22){const vt=x*x/(2*n.mur*9.81*1.5),ct=n.x[0]+r*vt*.6,Lt=n.z[0]+v*vt*.6;se(B(ct,Lt,r-v*Y,r*Y+v,Math.max(.12,vt*.5+.08),.1,-.25,.3),.9)}}j.hit("click",.28+x*.05,{pan:at(n.x[0])}),j.hit("noise",.1+x*.03,{cutoff:900,dur:.1})},Se=r=>Math.hypot(n.x[r],n.z[r])<O-n.R[r]*.5,Oe=()=>{let r=-1,v=1e9;for(let g=1;g<X;g++)if(!n.hide[g]&&Se(g)){const q=Math.hypot(n.x[g]-n.x[0],n.z[g]-n.z[0]);q<v&&(v=q,r=g)}if(r<0)return;const x=(l()-.5)*.07,w=Math.atan2(n.z[r]-n.z[0],n.x[r]-n.x[0])+x,u=1.1+l()*1.5;Ee(Math.cos(w),Math.sin(w),Math.sqrt(u*u+2*n.mur*9.81*1.5*v),(l()-.5)*1.7)};let le=null,Pt=null,qt=0,ze=1;const se=(r,v)=>{le={e:f.e.slice(),v:f.v.slice(),sx:f.sx,sy:f.sy,f:f.f},Pt=r,qt=0,ze=v},jt=r=>{if(!Pt)return;qt=Math.min(1,qt+r/ze);const v=eo(0,1,qt),x=(u,g)=>u+(g-u)*v;for(let u=0;u<3;u++)f.e[u]=x(le.e[u],Pt.e[u]),f.v[u]=x(le.v[u],Pt.v[u]);const w=Math.hypot(f.v[0],f.v[2]);f.v[0]/=w,f.v[2]/=w,f.v[1]=0,f.sx=x(le.sx,Pt.sx),f.sy=x(le.sy,Pt.sy),f.f=x(le.f,Pt.f),y(),R(qt<1),qt>=1&&(Pt=null)};let me=!1,ge=0,Re=0,Ae=0,Xt=!1,Zt=!1,fe=!1,ne=0,ve=0,Gt=0,ce=0;const De=()=>{const r=n.x[0]-f.e[0],v=n.y[0]-f.e[1],x=n.z[0]-f.e[2],w=r*f.v[0]+x*f.v[2],u=-r*f.v[2]+x*f.v[0];return[it*u/w+f.sx,it*v/w+f.sy,it*n.R[0]/w]},Me=()=>{for(let r=0;r<X;r++)if(n.awake[r]&&!n.hide[r])return!1;return!0},Pe=r=>{const v=ut.input;if(v.taps(),v.down&&!me&&(ge=v.x,Re=v.y,Ae=0,Xt=!1,Zt=!1,fe=!1),v.down){Ae+=r;const x=v.x-ge,w=v.y-Re,u=Math.hypot(x,w);if(!Xt&&!Zt&&u>.03&&Me()&&Vt==="play"&&(Xt=!0),!Xt&&!Zt&&Ae>.32&&(Zt=!0),Xt){const g=-f.v[2],q=f.v[0],I=-g*x+f.v[0]*w,U=-q*x+f.v[2]*w,Y=Math.hypot(I,U)||1;ne=I/Y,ve=U/Y,Gt=ee(u/.55,0,1);const vt=De();ce=ee((1-Re*2-vt[1])/vt[2],-1,1)}Zt&&!fe&&Me()&&Vt==="play"&&(fe=!0,n.wy[0]=14,n.wx[0]=2.5,n.awake[0]=1,n.still[0]=0)}else me&&(Xt?(Ee(ne,ve,.3+3.5*Math.pow(Gt,1.35),ce),Gt=0):Zt||Ve(v.x,v.y),Xt=!1,Zt=!1);me=v.down,be+=((Zt?.07:1)-be)*(1-Math.exp(-r*9))},Ve=(r,v)=>{const x=r*2-1,w=1-v*2,u=-f.v[2],g=f.v[0],q=f.v[0]*it+u*(x-f.sx),I=w-f.sy,U=f.v[2]*it+g*(x-f.sx);if(I<-.02){const ct=-f.e[1]/I,Lt=f.e[0]+q*ct,Ht=f.e[2]+U*ct;if(Math.abs(Lt)<.58&&Math.abs(Ht)<.58){for(let Fe=0;Fe<2;Fe++){const Ce=l()*lt,Ie=.006+l()*.012;pt(Lt,Ht,Lt+Math.cos(Ce)*Ie,Ht+Math.sin(Ce)*Ie,.0011,.9,.6,2)}Bt(Lt,.002,Ht,2,.25),j.hit("hat",.08,{pan:x*.5}),j.hit("noise",.07,{cutoff:2200,dur:.08})}}let Y=0,vt=-1;for(let ct=0;ct<X;ct++)if(!n.hide[ct]&&n.awake[ct]){const Lt=n.vx[ct]*n.vx[ct]+n.vz[ct]*n.vz[ct];Lt>vt&&(vt=Lt,Y=ct)}vt<0&&l()<.6&&(Y=1+Math.floor(l()*(X-1)),n.hide[Y]&&(Y=0)),se(_(Y,(l()-.5)*1.5,.068+l()*.05,.12+l()*.16,-.2-l()*.16,.3+l()*.12),.8)},te=new Int32Array(96),s=new Float64Array(X),m=new Int32Array(X),p=new Float64Array(X),k=new Uint8Array(X),T=[];for(let r=0;r<20;r++)T.push([0,0,0]);const C=[],D=r=>{const v=Xt?-ne*Gt*.012:0,x=Xt?-ve*Gt*.012:0;let w=0,u=0;const g=c*.5,q=2.2*c/1e3+.6;C.length=0;for(let d=0;d<_e;d++){if(d>=X){F[d*4+3]=0;continue}const N=n.x[d]+(d?0:v),H=n.y[d],Wt=n.z[d]+(d?0:x),Ue=n.R[d];F[d*4]=N,F[d*4+1]=H,F[d*4+2]=Wt,F[d*4+3]=n.hide[d]?0:Ue,F[(16+d)*4]=n.qx[d],F[(16+d)*4+1]=n.qy[d],F[(16+d)*4+2]=n.qz[d],F[(16+d)*4+3]=n.qw[d];const Be=(N-f.e[0])*f.v[0]+(Wt-f.e[2])*f.v[2];if(s[d]=Be,n.hide[d])continue;const Xe=mt*Math.abs(Be-f.f)/Math.max(Be,.01);p[d]=Xe;const je=it*Ue/Math.max(Be,.01)*g;k[d]=Xe>q&&Xe>1.5*je*1.3/((c>=600?Le:256)/oe/2)?1:0,F[(32+d)*4]=Xe,F[(32+d)*4+1]=je>90*c/1e3?32:je>30*c/1e3?16:10,F[(32+d)*4+2]=0,F[(32+d)*4+3]=n.fade[d],Be>Ue*1.15&&C.push(d)}C.sort((d,N)=>s[N]-s[d]);const I=C.length;let U=0,Y=0;const vt=U;for(let d=0;d<5;d++){T[d][0]=U;for(let N=0;N<I;N++){const H=C[N];rt[H]===d&&k[H]&&(F[(32+H)*4+2]=Y++,F[(32+H)*4+1]=8,te[U++]=H)}T[d][1]=U-T[d][0]}const ct=U;for(let d=0;d<I;d++)te[U++]=C[d];const Lt=U-ct,Ht=U;for(let d=0;d<I;d++){const N=C[d];ht[N]&&p[N]<7*c/1e3+.8&&(te[U++]=N)}const Fe=U-Ht,Ce=U;for(let d=0;d<I;d++){const N=C[d];ht[N]&&p[N]>=7*c/1e3+.8&&(te[U++]=N)}const Ie=U-Ce,Do=U;let de=5;for(let d=0;d<I;d++){const N=C[d],H=k[N]?9:rt[N];de>5&&T[de-1][2]===H?T[de-1][1]++:(T[de][0]=U,T[de][1]=1,T[de][2]=H,de++),te[U++]=N}for(let d=0;d<24;d++){const N=d*4;Z[192+N]=te[N],Z[193+N]=te[N+1],Z[194+N]=te[N+2],Z[195+N]=te[N+3]}F[288]=r,F[289]=It*.137%1,F[290]=It*.391%1,F[291]=X,b(),o.bindBuffer(o.UNIFORM_BUFFER,E),o.bufferData(o.UNIFORM_BUFFER,F,o.DYNAMIC_DRAW),o.disable(o.DEPTH_TEST),o.disable(o.CULL_FACE),o.disable(o.SCISSOR_TEST),o.colorMask(!0,!0,!0,!0),o.disable(o.BLEND),o.blendEquation(o.FUNC_ADD),nt();const Ze=c>=600?Le:256;if(o.activeTexture(o.TEXTURE8),o.bindTexture(o.TEXTURE_2D,dt),o.activeTexture(o.TEXTURE4),o.bindTexture(o.TEXTURE_2D,a),o.activeTexture(o.TEXTURE10),o.bindTexture(o.TEXTURE_2D,t.ns),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t.nz),o.bindVertexArray(t.vaoNone),Y){t.useFB(ft,Ze,Ze),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);for(let d=0;d<5;d++)if(T[d][1]){const N=z["m"+d];o.useProgram(N.p),o.uniform1i(N.u.uBase,T[d][0]),o.uniform1f(N.u.uCell,1),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,T[d][1])}o.bindFramebuffer(o.FRAMEBUFFER,null),o.activeTexture(o.TEXTURE9),o.bindTexture(o.TEXTURE_2D,ft),o.generateMipmap(o.TEXTURE_2D)}o.bindFramebuffer(o.FRAMEBUFFER,null),o.viewport(0,0,c,c),o.useProgram(z.comp.p),o.activeTexture(o.TEXTURE5),o.bindTexture(o.TEXTURE_2D,P),o.activeTexture(o.TEXTURE6),o.bindTexture(o.TEXTURE_2D,W),o.activeTexture(o.TEXTURE7),o.bindTexture(o.TEXTURE_2D,J),A(),o.bindVertexArray(t.vaoNone),o.enable(o.BLEND),Lt&&(o.blendFunc(o.DST_COLOR,o.ZERO),o.useProgram(z.shad.p),o.uniform1f(z.shad.u.uMode,0),o.uniform1i(z.shad.u.uBase,ct),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Lt),Ie&&(o.blendFunc(o.ONE,o.ONE),o.uniform1f(z.shad.u.uMode,1),o.uniform1i(z.shad.u.uBase,Ce),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Ie))),Fe&&(o.blendFunc(o.ONE,o.ONE),o.useProgram(z.cau.p),o.uniform1i(z.cau.u.uBase,Ht),o.drawArraysInstanced(o.TRIANGLES,0,40*40*6,Fe)),o.blendFunc(o.ONE,o.ONE_MINUS_SRC_ALPHA),o.activeTexture(o.TEXTURE9),o.bindTexture(o.TEXTURE_2D,ft);for(let d=5;d<de;d++){const N=T[d];if(N[2]===9)o.useProgram(z.gather.p),o.uniform1i(z.gather.u.uTaps,18),o.uniform1i(z.gather.u.uBase,N[0]);else{const H=z["m"+N[2]];o.useProgram(H.p),o.uniform1i(H.u.uBase,N[0]),o.uniform1f(H.u.uCell,0)}o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,N[1])}let Ne=0;for(let d=0;d<Rt;d++){const N=d*10;if(S[N+6]<=0)continue;const H=Ne++*8,Wt=S[N+6];V[H]=S[N],V[H+1]=S[N+1],V[H+2]=S[N+2],V[H+3]=S[N+7]*(1+(1-Wt)*2.6),V[H+4]=Wt*Wt*.6*S[N+9],V[H+5]=S[N+8],V[H+6]=0,V[H+7]=0}for(let d=0;d<Dt;d++){const N=Tt[d],H=Ne++*8,Wt=r*.22+N[3],Ue=.5+.5*Math.sin(Wt*3);V[H]=N[0]+Math.sin(Wt)*.012,V[H+1]=N[1]+Math.sin(Wt*1.3)*.005,V[H+2]=N[2]+Math.cos(Wt*.7)*.012,V[H+3]=N[5]*1.6,V[H+4]=.07+.1*Ue,V[H+5]=N[4],V[H+6]=0,V[H+7]=0}if(Xt&&Gt>.02)for(let d=0;d<10;d++){const N=Ne++*8,H=.02+d*(.006+Gt*.016);V[N]=n.x[0]+ne*H,V[N+1]=n.heightAt(n.x[0]+ne*H,n.z[0]+ve*H)+.001,V[N+2]=n.z[0]+ve*H,V[N+3]=.0011+Gt*7e-4,V[N+4]=(.55+Gt*.4)*(1-d/11),V[N+5]=d*.13,V[N+6]=0,V[N+7]=0}Ne&&(o.bindBuffer(o.ARRAY_BUFFER,t.inst),o.bufferData(o.ARRAY_BUFFER,V.subarray(0,Ne*8),o.DYNAMIC_DRAW),o.useProgram(z.dust.p),o.bindVertexArray(t.vaoInst),o.drawArraysInstanced(o.TRIANGLE_STRIP,0,4,Ne)),o.disable(o.BLEND),o.bindVertexArray(null)},G=r=>{if(!j.on)return;let v=0;for(let g=0;g<X;g++)n.awake[g]&&!n.hide[g]&&!n.air[g]&&(v+=Math.min(1,Math.hypot(n.vx[g],n.vz[g])*.7));K+=(v-K)*.35;const x=Math.min(512,Math.round(r*8e3)),w=xt===2?1.6:xt===1?.8:1;let u=.002+(Ct.lamp?.003:.0015);for(let g=0;g<x;g++){ot=Math.imul(ot^ot>>>13,1540483477)+12345|0;const q=(ot>>>8&65535)/32768-1;Et+=(q-Et)*(.05+.12*w),At+=(q-At)*.012,_t+=.004,Jt[g]=Et*K*.42*(1+.6*Math.sin(_t*70*w))+At*(u*22)*(.7+.3*Math.sin(_t*.6))}if(j.pcm(Jt.subarray(0,x),8e3,{vel:.55}),bt-=r,bt<0&&!Pt){const g=Ct.el>30?5400:4100+l()*400,q=Ct.el>30?.03:.05,I=(l()-.5)*1.2,U=Ct.el>30?6:3;for(let Y=0;Y<U;Y++)j.note(0,{freq:g,dur:.035,vel:q,wave:"sine",at:Y*.09,pan:I,attack:.006});bt=1.4+l()*3.6}},M=(r,v)=>{const x=Math.min(v,.12);if(It++,wt=0,Pe(x),Vt==="play")if(ye=!Me(),ye){if(we+=x,we>13)for(let w=0;w<X;w++)n.awake[w]=0}else if(Te){Te=!1;let w=0;for(let u=1;u<X;u++)!n.hide[u]&&Se(u)&&w++;if(w){const u=Math.hypot(n.x[0],n.z[0]);if(u>O+.12&&!xe){xe=!0;const g=n.x[0]/u*(O+.04),q=n.z[0]/u*(O+.04),I=Math.hypot(g-n.x[0],q-n.z[0]);Ee((g-n.x[0])/I,(q-n.z[0])/I,Math.sqrt(2*n.mur*9.81*1.9*I)+.12,.6,!1),xe=!0}else se(L((l()-.5)*.7),1.1),ue=4.5+l()*3.5,xe=!1}else{Vt="rack",ae=0,re=0,h(.8,.8,.55);for(const u of Ut)pt(u[0],u[1],u[2],u[3],Qt*1.3,.55,.5,2);O=.225+l()*.03,yt(O),e.setRing(O,0),gt=["tight diamond","cross","loose scatter"][Math.floor(l()*3)],ue=4,se(L((l()-.5)*.7),1.2)}}else!Pt&&!ut.input.down&&(ue-=x,ue<=0&&(Oe(),ue=5+l()*3));else{ae+=x;const w=ee(1-ae/.7,0,1);for(let u=1;u<X;u++)n.fade[u]=w,w<=0&&(n.hide[u]=1);if(ae>.7){const u=ee((ae-.7)/1.6,0,1),g=Math.floor(u*44);for(e.setRing(O,u);re<g;)re++,j.hit("noise",.04,{cutoff:2600,dur:.07})}ae>2.5&&(e.rackAt(gt,.05),Vt="play",Te=!0,we=0)}(ye||Vt!=="play")&&n.advance(x*be,140);for(let w=0;w<Rt;w++){const u=w*10;if(S[u+6]<=0)continue;const g=x*be;S[u+6]-=g*(.55+S[u+8]*.4);const q=Math.exp(-g*5);S[u+3]*=q,S[u+5]*=q,S[u+4]=S[u+4]*q+(.004-.006*S[u+8])*g,S[u]+=S[u+3]*g,S[u+1]+=S[u+4]*g,S[u+2]+=S[u+5]*g}jt(x),G(x),D(r)};return D(0),M}}()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
