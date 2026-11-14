// Instant Film: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/320.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(ee){ee&&ee.add({num:320,name:"Instant Film",fam:"Worlds",recipe:"A photo on long-expired instant film developing on a table, half lost to the old chemicals, with bare brown patches, roller streaks, bubbles and frosty patterns creeping in from a corner. The scene (a seaside dusk, a beach at noon, a wheat field, snow, harbour lights) and how it failed change every mint. Drag to throw it aside and take another, tap to shake it (it does nothing), or hold to warm it in your hand so the colours come up.",interactive:"Drag to throw the print aside and take another shot, tap to shake it as it develops (it does nothing), hold to warm it in your hand so the colours come up and the blues settle",music:!0,gl:!0,fps:30,seed:0,make(G){const t=G.gl,St=G.size,$=!!G.home;let xt=839848357;for(let c=2;c<66;c+=8)xt=Math.imul(xt^parseInt(G.hash.slice(c,c+8),16),2246822507)^xt>>>13;const zt=c=>{let h=c|0;return()=>{h=h+1831565813|0;let p=Math.imul(h^h>>>15,1|h);return p=p+Math.imul(p^p>>>7,61|p)^p,((p^p>>>14)>>>0)/4294967296}},kt=zt(xt),mt=c=>{let h=0;for(const g in c)h+=c[g];let p=kt()*h;for(const g in c)if(p-=c[g],p<0)return g;return Object.keys(c)[0]},Ut=$?"Seaside dusk":mt({"Seaside dusk":36,"Snowy field":22,"Harbour lights":27,"Window still life":15}),Ot=zt(xt^2118916563),jt=Ot(),Ht=Ot(),Ee=G.trait("Scene",$?Ut:Ut!=="Seaside dusk"?jt<.41?jt<.22?"Noon beach":"Wheat before rain":Ut:jt<.38?Ht<.35?"Noon beach":Ht<.7?"Wheat before rain":Ht<.85?"Snowy field":"Harbour lights":Ut),Mt=G.trait("Failure",$?"Fingers and streaks":mt({"Fingers and streaks":34,"Frost ferns":22,"Colour shift only":16,Bubbles:20,"Almost blank":5})),Te=G.trait("Film",$?"Colour":mt({Colour:68,"Black and white":22,"Peel-apart":10})),ze=G.trait("Age",$?"Very expired":mt({"Mildly expired":45,"Very expired":55})),Me=G.trait("Cast",$?"Magenta clouds":mt({"Cyan cast":25,"Magenta clouds":30,"Orange flare":25,"Faded warm":20})),Ae=$?"Walnut":mt({Walnut:45,"Grey linoleum":30,Slate:25}),De=G.trait("Table",!$&&Ot()>.84?"Garden table":Ae),oe=$?"Window":mt({Window:70,"Desk lamp":30}),rt=zt(xt^1528650300),se=G.trait("Light",!$&&oe==="Window"&&rt()<.34?"Venetian blinds":oe),O={"Seaside dusk":0,"Snowy field":1,"Harbour lights":2,"Window still life":3,"Noon beach":4,"Wheat before rain":5}[Ee],Kt={Colour:0,"Black and white":1,"Peel-apart":2}[Te],dt=ze==="Very expired"?1:0,ke={"Cyan cast":0,"Magenta clouds":1,"Orange flare":2,"Faded warm":3}[Me],ce={Walnut:0,"Grey linoleum":1,Slate:2,"Garden table":3}[De],It=ce===3?"wdG":"wd",pt=se==="Desk lamp"?1:se==="Venetian blinds"?2:0,_t=(.35+.8*rt())*(rt()<.5?1:-1)+(rt()<.5?0:Math.PI),Fe=rt(),Le=8+3*rt(),Be=pt===1||pt===2&&Math.cos(_t)<0?-1:1,qe=pt===2&&Math.sin(_t)<0?-1:1,yt=Kt===2,ae=yt?83:88,ne=yt?108:107,le=yt?5:4.5,re=yt?5.5:6,Nt=yt?73:79,Pt=yt?95:79,Wt=($?.86:.8+.22*rt())/107,fe="sc"+O,Yt="co"+(Mt==="Frost ferns"?"F":""),et=.04,a=128,S=128,j=768,z=32,f=t.__c320||(t.__c320=(()=>{const c=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,h=c+"const vec2 P[3]=vec2[3](vec2(-1,-1),vec2(3,-1),vec2(-1,3));out vec2 vU;void main(){vec2 p=P[gl_VertexID];vU=p*.5+.5;gl_Position=vec4(p,0,1);}",p=`uniform sampler2D uN;uniform int uO;
float vn(vec2 p){return texture(uN,p*(1./256.)).r;}
vec4 fb4(vec2 p){vec4 s=vec4(0);float a=.5;for(int i=0;i<uO;i++){s+=a*texture(uN,p*(1./256.));p=p*2.03+vec2(17.3,9.1);a*=.5;}return s;}
`,g=`#elif SCN==4
 {
  // noon beach: the sand burns out to cream; the sea in three washed bands, deep at the line, turquoise, jade over the bar
  float t=clamp((hv-y)/hv,0.,1.);
  vec3 sky=mix(vec3(1.05,1.18,1.3),vec3(.34,.52,.84),smoothstep(0.,.95,t));
  sky=mix(sky,vec3(1.15,1.2,1.25),.4*smoothstep(.5,.8,nz.x+.3*nz.y)*smoothstep(.05,.4,t));
  float s=clamp((y-hv)/(1.-hv),0.,1.);float z=1./(s+.045);float gx=(x-.5)*z;
  vec4 w1=fb4(vec2(gx*1.3,z*1.7)+uB.z);vec4 w2=fb4(vec2(gx*7.,z*11.)+uB.z*1.7);
  float sS=.40+.5*(uC.y-.25);float sh=sS+.05*(w1.y-.47)+.012*(vn(vec2(x*23.,7.))-.5);
  float u=s/sh+.22*(w1.x-.47)+.06*(w2.x-.47);
  vec3 sea=mix(vec3(.06,.13,.16),vec3(.26,.5,.52),smoothstep(.1,.5,u));sea=mix(sea,vec3(.66,.92,.80),smoothstep(.6,.86,u));
  sea*=.85+.3*w2.y;sea+=vec3(.5,.55,.55)*smoothstep(.62,.75,w2.z)*smoothstep(.2,.6,u)*.35;
  float bar=exp(-pow((u-.62-.04*(w2.w-.47))/.035,2.))*smoothstep(.45,.6,fb4(vec2(gx*5.,z*24.)).y);sea=mix(sea,vec3(1.6,1.65,1.65),bar*.7);
  float ds=(s-sh)/(.025+.02*w1.z);
  float lace=smoothstep(.43,.56,fb4(vec2(gx*16.,s*170.)+uB.z).x+.35*exp(-ds*ds*3.))*smoothstep(-2.2,-.4,ds)*smoothstep(.6,0.,ds);
  vec3 sand=vec3(1.9,1.72,1.3)*(.9+.16*w2.x)*(1.-.1*s);
  float rp=sin(z*17.+9.*w1.z+5.*vn(vec2(gx*1.4,z*2.))+2.*w2.y);sand*=1.-.15*smoothstep(.6,1.,rp)*smoothstep(.1,.5,s)*(.5+.5*w2.w);
  float wet=smoothstep(0.,.02,s-sh)*(1.-smoothstep(.04,.11+.05*w1.w,s-sh));
  vec3 wsd=mix(sand*.3,vec3(.8,.92,1.05)*(.8+.25*w2.z),.3*smoothstep(.02,.09,s-sh));
  vec3 grd=mix(sand,wsd,wet);grd=mix(grd,vec3(.3,.42,.44),smoothstep(-.012,0.,s-sh)*smoothstep(.02,0.,s-sh)*.5);
  E=y<hv?sky:(s<sh?sea:grd);E=mix(E,vec3(2.4,2.45,2.4),clamp(lace,0.,1.)*step(hv,y));
  // the dark accent: a near headland on the side away from the sun, its foot standing in the sea
   float side=uB.x;if(side!=0.){float xx=side>0.?x:1.-x;float L=.3+1.6*uB.y;float k=pow(clamp(1.-xx/L,0.,1.),.75);float hh=(.05+.8*uB.y)*k*(.8+.4*nz.y)+.003*(vn(vec2(x*90.,1.))-.5)+.004*(vn(vec2(x*31.,4.))-.5);
   float ft=hv+(.01+.12*uB.y)*k*(.85+.3*vn(vec2(x*40.,2.)));float hd=smoothstep(hv-hh-.002,hv-hh+.002,y)*smoothstep(ft+.002,ft-.002,y)*step(.001,k);
   vec3 rock=mix(vec3(.05,.065,.05),vec3(.10,.11,.08),smoothstep(.4,.7,vn(vec2(x*60.,y*25.))))*(.8+.4*nz.z);rock=mix(rock,sky,.12*(1.-k));
   E=mix(E,rock,hd);}
  vec2 vq0=uv-.5;E*=1.-.9*dot(vq0,vq0);
 }
#elif SCN==5
 {
  // wheat before rain: the field in the last sun, one gold mass, against a slate sky darkest just above it
  float t=clamp((hv-y)/hv,0.,1.);vec4 cn=fb4(vec2(x*2.2,y*3.4)+uB.z);
  vec3 sky=mix(vec3(.10,.12,.16),vec3(.36,.40,.48),smoothstep(.0,.9,t));sky*=.7+.6*cn.x;sky=mix(sky,vec3(.07,.08,.11),smoothstep(.5,.72,cn.y)*.6*(1.-t*.5));
  float rx=x-uA.w-(hv-y)*.4*uB.x+.05*(cn.z-.47);float vw=.07+.05*cn.w;
  float veil=exp(-rx*rx/(vw*vw))*smoothstep(.95,.35,t)*(.78+.22*smoothstep(.3,.7,vn(vec2((x+(hv-y)*.4*uB.x)*30.,y*2.5))));
  sky=mix(sky,vec3(.40,.43,.48),veil*.8);
  float s=clamp((y-hv)/(1.-hv),0.,1.);float z=1./(s+.05);float vx=.5+.3*(uD.y-.15);float gx=(x-vx)*z;
  vec4 wf=fb4(vec2(gx*.7+z*.45,z*1.15-gx*.3)+uB.z);float lay=smoothstep(.34,.64,wf.x+.3*(wf.y-.47));
  vec3 gold=mix(vec3(.62,.36,.07),vec3(1.5,1.02,.30),lay);gold*=.88+.24*fb4(vec2(gx*4.,z*6.)).z;
  float rf=fwidth(gx*60.);float row=sin(gx*377.+5.*vn(vec2(z*2.,gx*.5))+2.*vn(vec2(x*30.,y*90.)))*(1.-smoothstep(.25,.8,rf));
  gold*=1.+.035*row;float ear=vn(vec2(x*420.,y*150.))*(1.-smoothstep(.2,.6,fwidth(y*150.)));gold*=1.+.16*(ear-.5);
  gold=mix(gold,gold*vec3(.62,.66,.78),smoothstep(.12,0.,s)*.7);
  float hh=.007+.009*vn(vec2(x*13.,3.))+.005*vn(vec2(x*47.,5.));float hg=smoothstep(hv-hh-.0025,hv-hh+.0025,y)*step(y,hv+.003);
  E=y<hv?sky:gold;E=mix(E,vec3(.055,.06,.045)*(.8+.4*nz.y),hg);
  vec2 tc=vec2(.12+.76*fract(uB.z*.37),hv-.006);float th=.05+2.*(uD.w-.017);vec2 tp=(vec2(x,y)-tc-vec2(0.,-th*.62))/vec2(th*.42,th*.5);
  float cr=length(tp)-(.82+.36*(vn(vec2(x,y)*160.+uB.z)-.5)+.2*(vn(vec2(x,y)*55.)-.5));float tk=step(abs(x-tc.x),th*.05)*step(tc.y-th*.45,y)*step(y,tc.y);
  E=mix(E,vec3(.045,.05,.04)*(.8+.3*nz.x),clamp(smoothstep(.06,-.06,cr)+tk,0.,1.));
  vec2 vq0=uv-.5;E*=1.-.8*dot(vq0,vq0);
 }
`,H=e=>(c+"#define SCN "+e+`
`+p+`in vec2 vU;out vec4 o;uniform vec4 uA,uB,uC,uD;
#if SCN==1
vec3 pier(float xx,float y,float hv,float L,float a){float k=1.-clamp(xx/L,0.,1.);float on=step(xx,L);
 float yd=hv+.004+a*k;float th=.004+.14*a*k;float pz=1./(k+.1);float pf=fract(pz*1.9+.3);float pw=.09+.06*k;
 float dk=step(yd,y)*step(y,yd+th)*on;float post=step(pf,pw)*step(yd-.35*a*k-.006,y)*step(y,yd+th+.6*a*k+.01)*on;
 float rail=step(abs(y-(yd-.3*a*k-.005)),.001+.012*a*k)*on;return vec3(dk,post,rail);}
#endif
float bh(float x){return fract(sin(x*127.1+uB.z)*43758.5);}
vec3 lights(vec2 q,float hv){
 float xx=q.x*24.+.6*vn(vec2(q.x*20.,9.));float cx=floor(xx);float w=bh(cx);float hb=.02+.07*w*w+.06*step(.85,bh(cx+.5))+.004*vn(vec2(q.x*300.,2.));
 float inB=smoothstep(hv-hb-.002,hv-hb+.002,q.y)*step(q.y,hv);
 vec2 g=vec2(q.x*190.,q.y*230.);vec2 f=fract(g)-.5;float lit=step(.94,fract(sin(dot(floor(g),vec2(12.9,78.2))+uB.z)*43758.5));
 float win=lit*step(abs(f.x),.24)*step(abs(f.y),.3)*(.4+.6*bh(floor(g.x)+floor(g.y)*7.));
 return vec3(inB,win*inB,hb);}
void main(){
 vec2 uv=vec2(vU.x,1.-vU.y);vec2 q=uv-.5;q.x*=uB.w;float ct=cos(uA.z),st=sin(uA.z);q=vec2(ct*q.x-st*q.y,st*q.x+ct*q.y);q+=.5;
 float hv=uA.y,x=q.x,y=q.y;vec3 E=vec3(0);
 vec4 nz=fb4(vec2(x*5.,y*21.)+uB.z*3.1);
#if SCN==0
 {
  // contre-jour dusk: the sun on the horizon is the key, burnt to paper white with a yellow halo going orange then rose;
  // everything against it is a brown-black silhouette; dusk violet in the upper sky and the near water
  float t=clamp((hv-y)/hv,0.,1.);float r=uD.w;vec2 dv=vec2(x-uA.w,y-hv+uD.z);float ds=length(dv);
  vec3 sky=mix(vec3(1.35,.56,.16),vec3(.66,.30,.34),smoothstep(0.,.34,t));sky=mix(sky,vec3(.16,.12,.27),smoothstep(.22,.95,t));
  sky+=vec3(2.6,1.85,.55)*exp(-pow(ds/(r*3.4),2.))+vec3(1.15,.52,.15)*exp(-pow(ds/(r*9.),2.))+vec3(.45,.18,.08)*exp(-ds*ds*7.);
  float cl=smoothstep(.5,.7,nz.x+.22*nz.y)*smoothstep(.02,.14,t)*smoothstep(.9,.35,t)*uC.z;
  float nr=exp(-ds*ds*16.);
  vec3 cc=mix(vec3(.15,.07,.08),vec3(.10,.07,.15),smoothstep(.1,.6,t))+vec3(2.4,1.25,.4)*nr*(.2+2.4*cl*(1.-cl));sky=mix(sky,cc,cl*.9);
  float s=clamp((y-hv)/(1.-hv),0.,1.);float z=1./(s+.035);
  float wv=fb4(vec2(x*7.*z*.25,z*2.2)+uB.z).x;float hz=exp(-s*16.);
  vec3 sea=mix(vec3(.13,.06,.07),vec3(.012,.009,.02),smoothstep(0.,.6,s));sea=mix(sea,vec3(.9,.38,.13),hz*.4);sea*=.65+.7*wv;
  float gx=x-uA.w;float cw=r*1.2+.17*s;float cm=exp(-gx*gx/(cw*cw));
  sea+=vec3(1.3,.55,.16)*cm*hz*1.3+vec3(.35,.13,.05)*cm*(.4+wv)*(1.-s);
  vec2 sp=vec2(gx*(z+1.5)*34.,log(z)*48.+wv*.8)+uB.z;sp.x+=fract(sin(floor(sp.y)*7.13)*4375.85);vec2 ci=floor(sp),cf=fract(sp)-.5;
  float h1=fract(sin(dot(ci,vec2(12.9898,78.233)))*43758.5),h2=fract(h1*93.71),h3=fract(h1*317.3);vec2 fq=vec2((cf.x-(h2-.5)*.45)/(.12+.22*h2),(cf.y-(h3-.5)*.5)/.13);
  float g2=vn(sp*vec2(.21,.3)+17.);float dsh=exp(-dot(fq,fq))*step(mix(.5,.66,s)-.25*(g2-.5),h1)*(.45+.55*h3);
  float spk=mix(dsh,.3,smoothstep(.14,.03,s))*smoothstep(.12,.7,cm);
  float bar=exp(-pow(gx/(r*1.5),2.))*exp(-s*22.);
  sea+=vec3(5.,3.6,1.6)*(spk*(.35+.65*cm)+bar);
  E=y<hv?sky:sea;
  float sv=uC.x;if(sv>0.){float fo=smoothstep(sv-.004,sv+.004,y+.012*(nz.z-.5));E=mix(E,vec3(.022,.016,.022)*(1.+.6*wv),fo);E+=vec3(1.2,.7,.35)*exp(-pow((y-sv)/.004,2.))*(.3+.7*nz.w)*cm;}
  float side=uB.x;if(side!=0.){float xx=side>0.?x:1.-x;float L=uC.y;float hh=uB.y*pow(clamp(1.-xx/L,0.,1.),.7)*(.8+.4*nz.y)+.004*(vn(vec2(x*90.,1.))-.5);
   float hd=smoothstep(hv-hh-.0015,hv-hh+.0015,y)*step(y,hv+.002)*step(0.,hh);E=mix(E,mix(vec3(.026,.017,.024),sky*.3,.35*smoothstep(.55,1.,xx/L)),hd);
   float rf=step(hv,y)*step(y,hv+hh*.6)*step(0.,hh);E=mix(E,E*.2+vec3(.008,.005,.008),rf*.85);
   vec2 lh=vec2(x-(side>0.?L*.55:1.-L*.55),y-(hv-.004));E+=vec3(1.6,.8,.3)*exp(-dot(lh,lh)*3e5)*.5;}
  // the pier: planks on paired piles of uneven height and lean, cross braces, a rail and one lamp post, its piles
  // reflected and broken below
  float pr=uD.x;if(abs(pr)>.001){float L=abs(pr),a=uD.y,xx=pr>0.?x:1.-x;float k=1.-clamp(xx/L,0.,1.);
   if(xx<L){float yd=hv+.004+a*k,thk=.004+.085*a*k,pz=1./(k+.1),bp=pz*4.5+.3,n=floor(bp),f=fract(bp),hn=bh(n*1.7),hn2=bh(n*2.9+5.);
    float dfx=4.5/(L*(k+.1)*(k+.1));float yb=yd+thk+(.8+.5*hn)*a*k+.003;float pw=.07+.06*k;
    float f1=f+(hn2-.5)*.25*(y-yd)*dfx,f2=fract(f+.2)+(hn-.5)*.3*(y-yd)*dfx;
    float pile=step(f1,pw)*step(yd,y)*step(y,yb)+step(f2,pw*.55)*step(yd,y)*step(y,yb-.25*(yb-yd)*hn2);
    float u=(y-yd-thk)/max(yb-yd-thk,1e-4);float bw=.03+.03*k;
    float brace=step(.35,hn)*step(0.,u)*step(u,.85)*(step(abs(f-pw-u*(1.-pw)*.9),bw)+step(abs(f-pw-(1.-u)*(1.-pw)*.9),bw));
    float deck=step(yd,y)*step(y,yd+thk);float ry=yd-.30*a*k;
    float rail=step(abs(y-ry),.001+.006*a*k)+step(f,pw*.5)*step(ry,y)*step(y,yd);
    float nl=floor(4.5/(.6+.1)+.3);float lamp=step(abs(n-nl),.5)*(step(abs(f-.5),pw*.35)*step(yd-1.6*a*k,y)*step(y,yd)+step(abs(f-.5),pw*1.6)*step(abs(y-(yd-1.6*a*k)),.002+.006*a*k));
    float sil=clamp(deck+pile+brace+rail+lamp,0.,1.);
    float fw=f+(wv-.5)*.18;float rfl=step(fw,pw)*step(yb,y)*step(y,yb+(yb-yd)*.9)*smoothstep(.35,.55,wv);
    E=mix(E,vec3(.026,.017,.022)+E*.03,sil);E=mix(E,E*.3,rfl*.8);}}
  float core=smoothstep(r*1.2,r*.7,ds);E=mix(E,vec3(9.,8.2,6.5),core);E+=vec3(2.2,1.5,.45)*exp(-pow(ds/(r*2.),2.))*.9;
  vec2 vq0=uv-.5;E*=1.-1.1*dot(vq0,vq0);
 }
#elif SCN==1
 {
  float pr=uD.x;vec3 pp=pier(pr>0.?x:1.-x,y,hv,max(abs(pr),.01),uD.y)*step(.001,abs(pr));
  float t=clamp((hv-y)/hv,0.,1.);vec3 sky=mix(vec3(1.25,1.25,1.3),vec3(.75,.8,.95),t);
  float th=.018+.04*nz.x+.035*pow(vn(vec2(x*70.,3.)),3.)+.02*pow(vn(vec2(x*190.,7.)),4.);
  float tr=step(hv-th,y)*step(y,hv+.002);
  float s=clamp((y-hv)/(1.-hv),0.,1.);vec3 sn=vec3(1.55,1.6,1.72)*(.82+.18*fb4(vec2(x*4./(s+.1),y*9.)).y)*(1.-.12*s);
  float dr=fb4(vec2(x*3./(s+.15),10./(s+.15))+uB.z).x;sn*=mix(vec3(.5,.58,.78),vec3(1.),smoothstep(.3,.6,dr));float vx=uA.w;float rut=(x-vx)/(s+.02);float rd=exp(-pow((abs(rut+.05*(nz.y-.5))-.18)/.05,2.))*smoothstep(0.,.1,s)*(.4+.6*nz.z);sn*=1.-.12*rd;
  E=y<hv?sky:sn;E=mix(E,vec3(.13,.12,.14)*1.2+sky*.1,tr);
  E=mix(E,vec3(.10,.09,.10),clamp(pp.y+pp.z*.7,0.,1.));
 }
#elif SCN==2
 {
  float t=clamp(abs(hv-y)/hv,0.,1.);vec3 sky=mix(vec3(.95,.46,.26),vec3(.10,.17,.42),smoothstep(0.,.55,t))*(.8+.4*nz.x);
  float s=clamp((y-hv)/(1.-hv),0.,1.);float wob=(vn(vec2(x*30.,y*260.))-.5)*.012*(.3+s);bool up=y<hv;
  vec2 qq=up?q:vec2(x+wob,hv-(y-hv)*.7);vec2 sk=up?vec2(.0012,.0005):vec2(.0006,.0045);
  vec3 L=vec3(0);for(int k=0;k<uO+1;k++){L+=lights(qq+sk*(float(k)-2.),hv);}L/=float(uO+1);
  vec3 b=mix(sky,vec3(.03,.03,.05),L.x)+vec3(1.9,1.25,.55)*L.y*5.;
  vec3 w=mix(sky*.55,vec3(.02,.025,.05),L.x*.8)*(.75+.5*fb4(vec2(x*5./(s+.08),9./(s+.08))).x)+vec3(1.8,1.1,.45)*L.y*3.2*(1.-s*.6);
  float sl=exp(-pow((y-hv-.006)/.003,2.));float ph=fract(x*16.+.3*vn(vec2(x*16.,5.)));float lamp=exp(-pow((ph-.5)/.05,2.))*sl;
  E=up?b:w;E+=vec3(2.,1.3,.6)*lamp;
  vec2 gp=vec2(ph-.5,(y-hv-.006)*3.);E+=vec3(1.,.6,.25)*exp(-dot(gp,gp)*60.)*.35+vec3(1.4,.85,.35)*exp(-pow((ph-.5)/.07,2.))*step(hv,y)*exp(-s*5.)*.5;
 }
NEWSCN#else
 {
  vec3 wall=vec3(.30,.23,.17)*(.8+.3*nz.x)*(1.-.4*smoothstep(.3,.9,x));
  float wx0=.16,wx1=.80,wy0=.06,wy1=.70;
  float inW=step(wx0,x)*step(x,wx1)*step(wy0,y)*step(y,wy1);
  vec3 out1=mix(vec3(2.4,2.5,2.7),vec3(1.5,1.6,1.9),smoothstep(.45,.75,y));out1=mix(out1,vec3(.9,1.0,1.15),step(.5,y)*.4);
  float mul=step(abs(x-.49),.012)+step(abs(y-.36),.011);float fr=1.-step(wx0+.025,x)*step(x,wx1-.025)*step(wy0+.025,y)*step(y,wy1-.02);
  vec3 W=mix(out1,vec3(.35,.32,.30),clamp(mul+fr,0.,1.));
  E=mix(wall,W,inW);
  float sill=step(wy1,y)*step(y,wy1+.07);E=mix(E,vec3(.95,.85,.72)*(1.2-6.*(y-wy1)),sill);
  float by=y,bx=abs(x-.63);float rad=by>.53?.05:by>.47?mix(.014,.05,smoothstep(.47,.53,by)):.014;float bot=step(bx,rad)*step(.39,by)*step(by,wy1);
  E=mix(E,vec3(.25,.55,.35)*(by<wy1?out1*.35:vec3(.4))+vec3(1.2)*exp(-pow((x-.615)/.006,2.))*step(.5,by)*.6,bot*inW+bot*(1.-inW)*.8);
  float cu=smoothstep(.27,.23,x+.02*sin(y*9.));float fold=.6+.4*sin(x*95.+nz.y*4.);E=mix(E,vec3(1.5,1.3,1.05)*fold*(.6+.5*(1.-y)),cu*.92);
 }
#endif
 vec2 vq=uv-.5;E*=1.-1.5*dot(vq,vq)*uC.w;
 o=vec4(pow(clamp(E/4.,0.,1.),vec3(1./2.2)),1);}`).replace("NEWSCN",e<4?"":g),Y=`  if(ty>2.5){vec2 g=vec2(q.x*.97+q.y*.05,q.y)*1.1;float b=g.y*4.6+.45*vn(vec2(g.x*.55,g.y*3.))+.2*vn(vec2(g.x*1.7+3.,g.y*9.));
   float id=floor(b),f=fract(b);float hb=fract(sin(id*91.7+uA.y)*437.5);float e=min(f,1.-f);
   float gw=.022+.016*vn(vec2(g.x*3.,id*5.));float gap=smoothstep(gw,gw*.45,e);
   float gr=vn(vec2(g.x*5.+hb*9.,f*70.+id*13.))*.6+vn(vec2(g.x*17.,f*190.+id*7.))*.4;
   vec3 wd=mix(vec3(.24,.235,.22),vec3(.40,.39,.36),gr)*(.88+.24*hb);wd*=1.-.3*smoothstep(.55,.85,vn(vec2(g.x*3.+id,f*40.)))*smoothstep(.3,.7,gr);
   vec4 w=fb4(vec2(g.x*9.+hb*20.,f*5.+id*3.));vec4 w2=fb4(vec2(g.x*38.,f*22.+id*5.));
   float pn=w.x+.35*w.y+.22*(w2.x-.5)-.42*smoothstep(.2,.02,e)+.12*(hb-.5);
   float pt=smoothstep(.40,.425,pn);float lip=smoothstep(.40,.43,pn)*smoothstep(.47,.43,pn);
   float br=vn(vec2(g.x*2.5+hb*7.,f*55.+id*11.));
   vec3 pc=mix(vec3(.37,.42,.36),vec3(.46,.49,.43),w.z)*(.9+.12*br)*(1.-.12*(gr-.5));pc*=1.-.12*smoothstep(.55,.85,w2.y)-.15*smoothstep(.12,.02,e);
   col=mix(wd,pc,pt);col*=1.+.08*lip;
   float jx=.18+.5*fract(uA.y*.37);vec2 jq=vec2((fract(g.x*1.3-jx)-.5)/1.3*4.6,(f-.5+.06*(hb-.5)))*22.;float jd=length(jq);
   float sc=smoothstep(1.,.6,jd+.35*vn(jq*3.));float rs=exp(-jq.x*jq.x*.012-jq.y*jq.y*.25)*smoothstep(.3,.7,vn(vec2(g.x*30.,f*9.)));
   col=mix(col,vec3(.16,.075,.03)*(.8+.4*vn(jq*7.)),sc*.8);col=mix(col,col*vec3(.78,.6,.45),rs*.5*(1.-sc));
   col=mix(col,vec3(.012,.01,.009),gap);}
`,J=c+p+`in vec2 vU;out vec4 o;uniform vec4 uA,uB;
float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;return length(pa-ba*clamp(dot(pa,ba)/dot(ba,ba),0.,1.));}
void main(){vec2 p=vec2(vU.x,1.-vU.y);float ty=uA.x;vec3 col;
 vec2 q=vec2(p.x*.99+p.y*.14,p.y*.99-p.x*.14)+uA.y;
 if(ty<.5){vec4 w=fb4(q*vec2(.8,2.4));float v=q.y+.10*w.x+.03*w.y;
  float r=fract(v*9.+w.z*1.5);float band=smoothstep(0.,.7,r)*smoothstep(1.,.88,r);
  float fib=vn(vec2(q.x*9.,v*420.))*.5+vn(vec2(q.x*26.,v*700.))*.5;
  float pore=smoothstep(.66,.9,vn(vec2(q.x*70.,v*800.)))*(.35+.65*band);
  col=mix(vec3(.055,.027,.013),vec3(.25,.13,.057),.32*band+.46*fib*fib*1.6+.22*w.w);
  col*=1.-.42*smoothstep(.84,.98,r)*(.4+.6*vn(vec2(q.x*6.,v*60.)));col*=1.-.16*smoothstep(.7,.95,fract(v*31.+w.z*5.));
  col*=(1.-.45*pore)*(.78+.44*vn(vec2(q.x*1.3,v*7.)));col=mix(col,col*vec3(1.2,.9,.62),.4*smoothstep(.45,.75,w.y));}
 else if(ty<1.5){vec4 w=fb4(p*5.+uA.y);vec4 w2=fb4(p*23.+uA.y);col=vec3(.19,.195,.20)*(.86+.2*w.x);
  col=mix(col,vec3(.27,.26,.24),smoothstep(.5,.62,w2.x)*.55);col=mix(col,vec3(.11,.115,.125),smoothstep(.56,.66,w2.z)*.6);
  col*=1.+.10*(vn(p*520.)-.5);}
 else{vec4 w=fb4(q*vec2(2.2,6.));vec4 w2=fb4(q*vec2(9.,31.));float cv=w.x+.35*w2.y;
  col=vec3(.07,.078,.09)*(.7+.7*cv);col+=vec3(.035,.03,.025)*smoothstep(.5,.66,w.z);
  float ch=smoothstep(.02,0.,abs(fract(cv*5.)-.5)-.44);col*=1.-.3*ch;col*=1.+.16*(vn(p*640.)-.5);}
 vec2 rc=p-uB.xy;float rr=length(rc);float rn=vn(rc*9.+7.)+.5*vn(rc*31.);
 float ring=exp(-pow((rr-uB.z)/.006,2.))*smoothstep(.45,1.,rn)+.35*exp(-pow((rr-uB.z*.96)/.014,2.))*smoothstep(.3,.9,rn);
 col=mix(col,ty<.5?col*1.5+vec3(.02,.016,.01):col*.62,clamp(ring,0.,1.)*.55);
 float sc=0.;for(int i=0;i<uO+2;i++){float f=float(i)*7.31+uB.w;vec2 a=vec2(fract(sin(f)*43.7),fract(sin(f*1.7)*91.3));float an=fract(sin(f*2.3)*17.1)*6.283;
  vec2 b=a+vec2(cos(an),sin(an))*(.08+.3*fract(sin(f*3.1)*29.7));float d=seg(p+.004*vec2(vn(p*14.+f),vn(p*14.+f+9.)),a,b);
  sc+=exp(-d*d/.0000012)*(.3+.7*vn(p*60.+f));}
 col+=vec3(.10,.09,.08)*min(sc,1.)*(ty<.5?.6:1.);
 float sp=smoothstep(.86,.93,vn(p*420.+uB.w));col+=vec3(.05)*sp*sp;
 o=vec4(pow(clamp(col,0.,1.),vec3(1./2.2)),1);}`,b=c+p+`in vec2 vU;out vec4 o;uniform sampler2D uG,uF,uB;uniform ivec4 uI;uniform vec4 uA,uC;
void main(){vec2 c=vec2(vU.x,1.-vU.y);vec4 g=texture(uG,c);
 float bp=1.3/128.;vec2 cw=c+(vec2(vn(c*40.),vn(c*40.+40.))-.5)*(3./128.)+(vec2(vn(c*110.+9.),vn(c*110.+77.))-.5)*(1./128.);
 float gw=(texture(uG,cw).g*2.+texture(uG,cw+vec2(bp,0)).g+texture(uG,cw-vec2(bp,0)).g+texture(uG,cw+vec2(0,bp)).g+texture(uG,cw-vec2(0,bp)).g)/6.;
 float wet=smoothstep(.33,.67,gw+(vn(c*97.)-.5)*.07+(vn(c*31.)-.5)*.14+(vn(c*11.)-.5)*.16);
 float h=g.r*2.;float def=0.;float px=uA.w;
 for(int i=0;i<uI.x;i++){vec4 b=texelFetch(uB,ivec2(i,0),0);vec4 b2=texelFetch(uB,ivec2(i,1),0);
  vec2 dd=c-b.xy;dd.y/=b2.x;float r=length(dd)/b.z*(1.+(vn(c*190.+b2.y*50.)-.5)*.45)+(vn(c*600.+b2.y*50.)-.5)*.1;
  if(b.w<.5){wet*=smoothstep(.62,1.08,r);def+=b2.z*.2*exp(-pow((r-1.15)/.16,2.));h+=.35*exp(-pow((r-1.3)/.35,2.));}
  else if(b.w<1.5){def+=b2.z*.45*(1.-smoothstep(.3,1.1,r));float tx=dd.x/b.z;float tyy=-dd.y/b.z;def+=b2.z*.10*exp(-tx*tx*1.5)*exp(-tyy*.3)*smoothstep(0.,1.5,tyy);}
  else{wet*=mix(1.,smoothstep(.85,1.05,r),.8);}}
 for(int i=0;i<uI.y;i++){vec4 s=texelFetch(uB,ivec2(i,2),0);float x=c.x-s.x-(vn(vec2(c.y*26.,float(i)*13.))-.5)*.010-(vn(vec2(c.y*90.,float(i)*7.))-.5)*.002;
  float ln=exp(-x*x/(s.w*s.w))*smoothstep(s.y,s.y-.04,c.y)*(.7+.3*vn(vec2(c.y*300.,float(i))));def+=s.z*ln;}
 float ph=fract((1.-c.y)/uA.x+uA.y)+(vn(vec2(c.x*9.,3.))-.5)*.004;float rx=(c.x-.15-.7*fract(uA.y*7.31))/.022;def+=uA.z*(exp(-pow((ph-.5)/.006,2.))-.7*exp(-pow((ph-.515)/.012,2.)))*exp(-rx*rx)*(.6+.4*vn(vec2(c.x*30.,ph*9.)));
 float hl=(texture(uN,vec2((c.x+.002*(vn(vec2(c.y*5.,uA.y*40.))-.5))*1.53+uA.y,.31)).r-.5)*2.;float hl2=hl*hl;hl*=hl2*hl2*hl2;def+=.22*hl*(.75+.25*vn(vec2(c.x*200.,c.y*3.)));
 float ex=min(c.x,1.-c.x);float sp=smoothstep(.045,.03,ex)*smoothstep(.55,.75,vn(vec2(c.y*70.,ex*30.))+.3*(c.y-.4))*uC.x;h+=sp*.9;wet=max(wet,sp*step(.02,ex));
 float f=texture(uF,c).r;float fg=(texture(uF,c+vec2(px,0)).r+texture(uF,c-vec2(px,0)).r+texture(uF,c+vec2(0,px)).r+texture(uF,c-vec2(0,px)).r)*.25;
 float fro=clamp(f*.75+fg*.55,0.,1.);
 o=vec4(wet,clamp(h*.5,0.,1.),fro,clamp(.5+def,0.,1.));}`,R={F:[[`  D*=1.-fro*vec3(.45,.40,.30);
`,`  float fz=smoothstep(.12,.7,fro);D*=1.-fz*vec3(.8,.78,.7);
`],[`  img+=fro*vec3(.02,.03,.04)*wet;
`,`  img=mix(img,mix(un*1.2,vec3(.62,.58,.52),.4)*(1.+.2*smoothstep(.8,1.,fro)+.08*mo2.y),fz*.92);
`]]},I=e=>{let o=K;for(const l of e)for(const[i,n]of R[l]){if(!o.includes(i))throw new Error("320 patch "+l);o=o.replace(i,n)}return o},K=c+p+`out vec4 o;uniform sampler2D uS,uC,uW,uH;uniform vec4 uT,uK,uI,uD,uE,uF,uG,uL,uM,uP;
float sdB(vec2 p,vec2 b,float r){vec2 d=abs(p)-b+r;return length(max(d,0.))+min(max(d.x,d.y),0.)-r;}
void main(){vec2 fc=gl_FragCoord.xy;vec2 p=vec2(fc.x,uD.y-fc.y)/uD.y;float px=1./(uD.y*uK.x);
 vec2 d=p-uT.xy;vec2 q=vec2(d.x*uT.z+d.y*uT.w,-d.x*uT.w+d.y*uT.z)/uK.x;vec2 hs=.5*uK.yz;float lift=uK.w;
 float Lw;vec3 lc;vec2 sd;
 if(uL.x<.5){Lw=mix(1.0,.6,smoothstep(-.2,1.45,dot(p,vec2(.62,.78))));lc=vec3(.98,.98,1.0);sd=vec2(.8,1.1);}
 else if(uL.x<1.5){vec2 lq=p-uL.yz;Lw=.05+.8*exp(-dot(lq,lq)*4.5);
lc=vec3(1.06,.80,.52);sd=normalize(p-uL.yz+.001)*1.3;}
 else{vec2 nd=uL.yz;float a=dot(p-.5,nd),b=dot(p-.5,vec2(-nd.y,nd.x));float sa=a*uF.x+uL.w+.35*vn(vec2(b*1.7,7.))+.12*vn(vec2(b*6.,3.));float f=fract(sa);
float sl=smoothstep(.04,.24,f)*smoothstep(.86,.62,f)*(.8+.35*vn(vec2(floor(sa)*3.1,11.)));float wm=smoothstep(-.34,-.2,b+.06*vn(vec2(a*4.,5.)))*smoothstep(.95,.8,b)*smoothstep(-.6,-.45,a)*smoothstep(.62,.48,a);
Lw=.27+.07*smoothstep(1.,-.6,a)+.92*sl*wm;lc=vec3(1.06,.95,.82);sd=nd*1.25;}
 vec3 tb=pow(texture(uW,fc/uD.y).rgb,vec3(2.2));
 vec2 sdl=vec2(sd.x*uT.z+sd.y*uT.w,-sd.x*uT.w+sd.y*uT.z);
 float cl=smoothstep(1.1,1.95,dot(q/hs,uP.xy))*uP.z;float lf=lift+cl;
 float sdP=sdB(q,hs,1.2);float sdS=sdB(q-sdl*(.7+lf*9.),hs,1.2);
 float sh=smoothstep(-1.-lf*5.,1.8+lf*10.,sdS);float ao=smoothstep(-1.,8.,sdP);float sh2=smoothstep(-3.,12.,sdS);
 vec3 col=tb*Lw*lc*mix(.34,1.,sh)*mix(.80,1.,ao)*mix(.84,1.,sh2);
 col+=lc*.018*Lw*Lw*(.6+.4*vn(fc*.05))*uF.y;
 if(sdP<2.*px){
  vec2 m=q+hs;vec4 nz=fb4(m*.22+uM.x);
  vec2 ic=uI.xy+uI.zw*.5;float sdI=sdB(m-ic,uI.zw*.5,.25);vec2 iuv=(m-uI.xy)/uI.zw;
  bool pl=uD.z>1.5;
  vec3 fr=pl?vec3(.81,.805,.78):vec3(.815,.79,.725);fr*=mix(vec3(1.),vec3(.96,.92,.80),uD.w*(.25+.55*smoothstep(-9.,0.,sdP))*(.5+nz.x));fr*=.985+.03*(vn(m*4.3)-.5)+.022*(vn(m*1.1+9.)-.5)+.02*(nz.y-.5);
  float smg=smoothstep(.55,.72,nz.w)*.7;fr*=1.-.05*smg;
  float ridge=pl?0.:(m.y-(uK.z-12.))/5.;float lump=.45+1.1*vn(vec2(m.x*.11+uM.x,m.y*.05));
  float rs=pl?0.:-ridge*exp(-ridge*ridge)*.20*lump-.03*exp(-pow((m.y-uK.z+2.2)/.7,2.));fr*=1.+rs;
  vec2 ed=vec2(abs(q.x)-hs.x,abs(q.y)-hs.y);vec2 nrm=ed.x>ed.y?vec2(sign(q.x),0.):vec2(0.,sign(q.y));
  float rim=smoothstep(-.4,-.05,sdP);float lit=-dot(nrm,normalize(sdl));fr*=1.+rim*(.06*lit-.05);
  vec2 di=abs(m-ic)-uI.zw*.5;vec2 ni=di.x>di.y?vec2(sign(m.x-ic.x),0.):vec2(0.,sign(m.y-ic.y));
  float eb=exp(-pow((sdI-.22)/.2,2.));fr*=1.+eb*.16*dot(ni,normalize(sdl))-.03*exp(-pow((sdI-.05)/.12,2.));
  fr*=1.+.07*cl;
  float fshadow=smoothstep(-.5,.4,-sdI-(pl?0.:.18)*max(0.,dot(normalize(m-ic+.001),-normalize(sdl))));
  vec2 cuv=(iuv+MARGV)/(1.+2.*MARGV);if(pl)cuv.y=1.-cuv.y;
  vec2 ct=vec2(cuv.x,1.-cuv.y);vec4 ch=texture(uC,ct);float w45=textureLod(uC,ct,4.5).r;float wb=textureLod(uC,ct,3.).r*.5+w45*.5;
  float wet=ch.r,h=ch.g*2.,fro=ch.b,dfx=ch.a-.5;
  vec3 E=pow(texture(uS,vec2(iuv.x,1.-iuv.y)).rgb,vec3(2.2))*4.;
  vec2 hh=texture(uH,clamp(iuv,0.,1.)).rg;float tau=uD.x+hh.r;float ag=uD.w;
  vec3 lE=log2(E*uE.w+.003);
  vec3 S=smoothstep(vec3(-4.6),vec3(1.1-ag*.3),lE);S=mix(S,smoothstep(vec3(-7.),vec3(2.2),lE),.3*ag);
  vec3 T=1.-S;
  vec3 P=1.-exp(-tau*vec3(.17,.26,.38)*(1.-.3*ag));
  float hw=max(max(h,wet*.36),(1.-wet)*wb*.55);
  vec3 Dl=uG.xyz*clamp(hw/vec3(.80,.52,.30),0.,1.7);
  float Q=1.-exp(-tau/30.);
  vec3 D=Dl*T*P*(.80+.20*Q);
  vec4 mo=fb4(cuv*vec2(3.2,3.6)+uM.y)-.5;vec4 mo2=fb4(cuv*11.+uM.z)-.5;
  D*=1.+uF.z*(mo.xyz*2.4+mo2.xyz*1.1);
  float cty=uE.x;
  if(cty<.5){D.x=D.x*1.15+.13*T.x;D.y*=.82;D.z*=.9;}
  else if(cty<1.5){float mc=smoothstep(.0,.25,mo.w+.04);D.y+=mc*.2;D.x*=1.-.2*mc;}
  else if(cty<2.5){vec2 fq=(cuv-uE.yz)*vec2(1.,1.3);float fl=exp(-dot(fq,fq)*uE.y*0.+(-dot(fq,fq))*7.);D*=1.-fl*vec3(.92,.62,.18);D+=fl*vec3(0.,.0,.12);}
  else{D.x*=.6;D.y*=.85;D.z=D.z*.9+.10;}
  float cyc=smoothstep(.08,.3,-mo.w+.15*mo2.w)*uF.z*2.2;D.x+=cyc*.22;D.z*=1.-.25*cyc;D.y*=1.-.12*cyc;
  D*=1.-fro*vec3(.45,.40,.30);
  float bnd=wet*(1.-smoothstep(.4,1.,w45));D*=1.-clamp(.75*bnd*(.5+(mo2.x+.5)),0.,.9)*vec3(1.,.85,.5);
  float frg=wet*clamp((1.-wb)*1.6,0.,1.);
  D+=dfx*vec3(1.15,1.1,.95);
  D+=frg*vec3(-.1,.12,.45);D.x*=1.-.5*frg;
  D+=uG.w*vec3(.9,1.,1.2)*(1.-.6*S)+max(h-1.25,0.)*vec3(.5,.45,.35)*P;

  D.z-=(1.-Q)*.16*uF.w;D.x+=(1.-Q)*.05*uF.w;
  vec3 gr=vec3(vn(m*3.1+3.),vn(m*3.3+71.),vn(m*2.9+137.))-.5;vec3 gr2=vec3(vn(m*7.5),vn(m*7.9+30.),vn(m*7.1+60.))-.5;
  D*=1.+gr*.22+gr2*.14;D=max(D,0.);D+=S*vec3(0.,.025,.12)*(.5+.5*ag);
  vec3 img;
  if(uD.z>.5&&uD.z<1.5){float Dn=dot(D,vec3(.4,.38,.22))*1.05;img=vec3(.86,.83,.78)*exp2(-Dn*3.32*vec3(1.,1.12,1.05));img=mix(img,img*vec3(1.08,.95,1.1),smoothstep(.1,.7,Dn)*.6);}
  else{vec3 Do=vec3(D.x+.12*D.y+.03*D.z,.22*D.x+D.y+.10*D.z,.05*D.x+.26*D.y+D.z);img=vec3(.89,.87,.82)*exp2(-Do*3.32);}
  vec3 un=mix(vec3(.36,.25,.14),vec3(.50,.39,.25),smoothstep(.3,.75,mo2.w+.5+.3*mo.y));un*=.97+.05*gr.x;
  if(uD.z>.5&&uD.z<1.5)un=mix(un,vec3(.42,.39,.35),.6);
  un=mix(un,vec3(.42,.25,.10),clamp((wb-wet)*2.2,0.,1.)*.7);
    img=mix(un,img,clamp(max(wet+(1.-wet)*smoothstep(.05,.8,wb)*.5,uP.w*.75*smoothstep(.1,.9,cuv.y)*(.6+.8*mo.x)),0.,1.));
  float fl=(wet-.5+.25*mo2.z+.12*(gr2.x))/.13;img*=1.-.5*exp(-fl*fl)-.18*exp(-pow((wb-.28+.15*mo.w)/.035,2.))*(1.-wet);
  float O=exp(-tau/(2.2+4.5*(mo.x+.5)))*wet;img=mix(img,vec3(.31,.37,.40)*(.9+.5*mo.x+.25*mo2.y)+vec3(.0,.02,.0)*mo.z,clamp(O*1.1,0.,1.));
  img+=fro*vec3(.02,.03,.04)*wet;
  img*=mix(.72,1.,fshadow);
  float goo=0.;vec3 gc=vec3(0);
  if(pl){float ein=sdI;
float gw=.4+2.2*nz.x+3.5*smoothstep(.35,.9,iuv.y)*smoothstep(.4,.7,nz.y);float gin=.3+1.4*nz.z;
   goo=smoothstep(-gin-.25,-gin,ein)*(1.-smoothstep(gw-.35,gw,ein));gc=mix(vec3(.30,.19,.09),vec3(.05,.035,.03),smoothstep(.1,.6,nz.y+.3*vn(m*4.)));}
  float im=1.-smoothstep(-px,px,sdI);
  vec3 pc=mix(mix(fr,img,im),gc,goo);
  pc*=Lw*lc;
  float gloss=pl?mix(.25,1.,im):mix(.55,1.,im);
  vec2 sq=(p-vec2(uM.w,.2))*vec2(1.,1.3);float sp=uL.x>1.5?exp(-dot(sq,sq)*5.)*(.6+.8*smoothstep(.3,.7,nz.x+.2*nz.z))*.10:0.;
  // the print's clear face: the window as a slanted lozenge with its glazing bars, or the lamp as one hot oval; it slides when the print tips
  vec2 rq=p-vec2(uM.w+.12,.36)-vec2(uT.w*2.4,-.3*uK.w)-(uT.xy-.5)*.4;
  if(uL.x<.5){vec2 ru=vec2(rq.x*.88+rq.y*.48,-rq.x*.48+rq.y*.88);ru.x+=.45*ru.y;
   sp=smoothstep(.15,.08,abs(ru.x))*smoothstep(.11,.05,abs(ru.y))*(1.-.3*smoothstep(.012,.004,abs(ru.x+.02)))*(.5+.5*smoothstep(.12,-.12,ru.x+ru.y))*(.85+.3*nz.y)*.085;}
  else if(uL.x<1.5){vec2 ro=(p-mix(uL.yz,uT.xy,.6)-vec2(uT.w*2.,-.3*uK.w))*vec2(1.,2.2);sp=exp(-dot(ro,ro)*500.)*.3+exp(-dot(ro,ro)*90.)*.05;}
  pc+=lc*sp*Lw*gloss*gloss*(1.-.7*smg)+lc*smg*.018*Lw*gloss;
  float aa=1.-smoothstep(-px,px,sdP);col=mix(col,pc,aa);}
 col=col*1.18/(1.+.18*col);
 o=vec4(pow(clamp(col,0.,1.),vec3(1./2.2)),1);}`.replace(/MARGV/g,et.toFixed(3)),P={},st=[],it={c:e=>H(+e.slice(2)),d:e=>{if(e==="wd")return J;if(!J.includes(`
 if(ty<.5){`))throw new Error("320 patch G");return J.replace(`
 if(ty<.5){`,`
`+Y+" else if(ty<.5){")},h:()=>b,o:e=>I(e.slice(2))},bt=(e,o,l)=>{const i=t.createProgram(),n=t.createShader(t.VERTEX_SHADER),r=t.createShader(t.FRAGMENT_SHADER);t.shaderSource(n,o),t.shaderSource(r,l),t.compileShader(n),t.compileShader(r),t.attachShader(i,n),t.attachShader(i,r),t.linkProgram(i),st.push([e,i,n,r])};for(const e of[fe,It,"ch",Yt])bt(e,h,it[e[1]](e));t.flush();const vt={},at=e=>{const o=P[e],l=vt[e]={};for(const i of["uN","uO","uA","uB","uC","uG","uF","uI","uS","uW","uH","uT","uK","uD","uE","uL","uM","uP"])l[i]=t.getUniformLocation(o,i);t.useProgram(o),t.uniform1i(l.uN,0),e==="ch"?(t.uniform1i(l.uG,1),t.uniform1i(l.uF,2),t.uniform1i(l.uB,3),t.uniform1i(l.uO,3)):e[1]==="o"?(t.uniform1i(l.uS,1),t.uniform1i(l.uC,2),t.uniform1i(l.uW,3),t.uniform1i(l.uH,4),t.uniform1i(l.uO,3)):t.uniform1i(l.uO,4)},Zt=()=>{for(const[e,o,l,i]of st){if(!t.getProgramParameter(o,t.LINK_STATUS))throw new Error("320 "+e+": "+(t.getShaderInfoLog(i)||t.getShaderInfoLog(l)||t.getProgramInfoLog(o)));P[e]=o}for(const e in P)at(e)};t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);const Lt=(e,o,l,i,n,r,E,M,C)=>{const x=t.createTexture();return t.bindTexture(t.TEXTURE_2D,x),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,l,e,o,0,i,n,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,C||E),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,E),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,M),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,M),x},gt=e=>{const o=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,o),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,e,0),o};let nt=320;const lt=new Uint8Array(256*256*4);for(let e=0;e<lt.length;e++)nt=Math.imul(nt^nt>>>15,739982445)+1831565813|0,lt[e]=nt>>>24&255;const ut=Lt(256,256,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,lt,t.LINEAR,t.REPEAT),Ne=t.createVertexArray(),Pe=(()=>{const e=new Float32Array(1),o=new Uint32Array(e.buffer);return l=>{e[0]=l;const i=o[0],n=i>>>16&32768,r=(i>>>23&255)-112;return r<=0?n:r>30?n|31743:n|r<<10|(i&8388607)>>>13}})(),Ge=e=>{if(!P[e]){bt(e,h,it[e[1]](e));const[,o,l,i]=st.pop();if(!t.getProgramParameter(o,t.LINK_STATUS))throw new Error("320 "+e+": "+(t.getShaderInfoLog(i)||t.getShaderInfoLog(l)||t.getProgramInfoLog(o)));P[e]=o,at(e)}return e},At=(e,o,l)=>{let i=Math.imul(e*374761393+o*668265263+l*2147483647|0,1274126177);return i^=i>>>13,i=Math.imul(i,1274126177),((i^i>>>16)>>>0)/4294967296},Bt=(e,o,l)=>{const i=Math.floor(e),n=Math.floor(o),r=e-i,E=o-n,M=r*r*(3-2*r),C=E*E*(3-2*E),x=At(i,n,l),v=At(i+1,n,l),m=At(i,n+1,l),k=At(i+1,n+1,l);return x+(v-x)*M+(m-x)*C+(x-v-m+k)*M*C},$t=(e,o,l)=>Bt(e,o,l)*.55+Bt(e*2.1,o*2.1,l+7)*.3+Bt(e*4.3,o*4.3,l+13)*.15,Ce=(e,o,l,i,n,r,E,M)=>{const C=[M+3,M+3+7,M+3+13],x=[10,19,39],v=[0,0,0];for(let m=S-1;m>=0;m--){const k=E-m,D=m/S*9;for(let u=0;u<3;u++){const A=u===0?D:u===1?D*2.1:D*4.3,_=Math.floor(A),F=A-_;v[u]=F*F*(3-2*F);for(let w=0;w<=x[u];w++)r[u*82+w]=At(w,_,C[u]),r[u*82+41+w]=At(w,_+1,C[u])}for(let u=0;u<a;u++){let A=0;for(let w=0;w<3;w++){const tt=n[w*a+u],V=i[w*a+u],Q=v[w],W=w*82+tt,q=r[W],T=r[W+1],L=r[W+41],y=r[W+42],Z=q+(T-q)*V+(L-q)*Q+(q-T-L+y)*V*Q;A=w===0?Z*.55:w===1?A+Z*.3:A+Z*.15}let _=l[u]+.12*(A-.5);k>=-2&&(_*=1+l[a+u]*Math.exp(-Math.max(0,k)/l[2*a+u]));const F=Math.min(o[u],_);e[m*a+u]=F,o[u]-=F}for(let u=0;u<3;u++)for(let A=0;A<a-1;A++){const _=Math.min(o[A],o[A+1])/6,F=_>=1?1:Math.min(1,_)**1.5,w=.24*(o[A]-o[A+1])*F;o[A]-=w,o[A+1]+=w}}},me=(e,o,l,i,n)=>{for(let r=0;r<n;r++)for(let E=1;E<=l;E++){const M=E*a,C=E+1>=i;for(let x=0;x<a;x++){const v=M+x;if(!e[v])continue;const m=o[v],k=x>0?o[v-1]:m,D=x<a-1?o[v+1]:m;o[v]=m+1.85*((k+D+o[v-a]+(C?1:o[v+a]))*.25-m)}}},Re=(e,o,l,i,n,r,E,M,C,x,v)=>{const m=a*S;let k=0,D=0;const u=f.ex||(f.ex=new Float64Array(S)),A=f.fL||(f.fL=new Int32Array(m)),_=f.fW||(f.fW=new Float64Array(m)),F=f.mL||(f.mL=new Int32Array(4*m));for(let w=0;w<S;w++)u[w]=Math.exp(-w/v);for(;k<M&&D++<400;){let w=0,tt=0,V=0;const Q=r;for(let q=1;q<=Q;q++)for(let T=0;T<a;T++){const L=q*a+T;if(o[L]&&(T>0&&!o[L-1]||T<a-1&&!o[L+1]||!o[L-a]||!o[L+a])){const y=Math.pow(Math.max(0,l[L]),x)/(.35+i[L])*u[Math.max(0,q-n[T])];A[tt]=L,_[tt++]=y,w+=y}}if(w<=0)break;let W=0;for(let q=0,T=1,L=0;T<=r;){let y,Z;if(q<tt)y=A[q],Z=_[q++],T=y/a|0,L=y-T*a;else{if(T<=Q&&(T=Q+1,L=-1),++L>=a&&(L=0,T++),T>r)break;if(y=T*a+L,!o[y]||!(L>0&&!o[y-1]||L<a-1&&!o[y+1]||!o[y-a]||!o[y+a]))continue;Z=Math.pow(Math.max(0,l[y]),x)/(.35+i[y])*u[Math.max(0,T-n[L])]}e()<C*Z/w&&(o[y]=2,F[V++]=y,W++,T+10>r&&(r=Math.min(E-1,T+10)),L>0&&o[y-1]===1&&e()<.7&&(o[y-1]=2,F[V++]=y-1,W++),L<a-1&&o[y+1]===1&&e()<.7&&(o[y+1]=2,F[V++]=y+1,W++),o[y+a]===1&&T+1<E&&e()<.4&&(o[y+a]=2,F[V++]=y+a,W++))}for(let q=0;q<V;q++){const T=F[q];o[T]=0,l[T]=0}k+=W,W&&me(o,l,r,E,5)}},Xe=(e,o)=>{for(let l=2;l<S-1;l++)for(let i=1;i<a-1;i++){const n=l*a+i,r=e[n-a-1]+e[n-a]+e[n-a+1]+e[n-1]+e[n+1]+e[n+a-1]+e[n+a]+e[n+a+1];o[n]=r>=7?1:r<=1?0:e[n]}},Oe=(e,o,l,i,n)=>{let r=0;for(let x=0;x<a;x++){let v=0;for(let m=0;m<S;m++)e[m*a+x]||v++;o[x]=v,r+=v}r/=a;let E=0;const M=f.us||(f.us=new Float32Array(a));for(let x=0;x<a;x++){const v=x/(a-1),m=Math.abs(v-n[0])/Math.max(n[0],1-n[0]);M[x]=n[2]+Math.pow(1-Math.min(1,m),n[1])*(1+n[3]*(v-.5))+n[4]*($t(v*5,2.5,n[5])-.5),M[x]=Math.max(.02,M[x]),E+=M[x]}E/=a;const C=n[6]?.75:0;for(let x=0;x<a;x++)o[x]=r*(.82*M[x]/E*(1-C)+.82*C+.18*o[x]/Math.max(r,.001));for(let x=0;x<S;x++)for(let v=0;v<a;v++){const m=(o[v>0?v-1:v]+2*o[v]+o[v<a-1?v+1:v])*.25;l[x*a+v]=Math.max(0,Math.min(1,x+.5-m))}for(let x=0;x<2;x++){for(let v=0;v<S;v++)for(let m=0;m<a;m++){const k=v*a+m;i[k]=(l[m>0?k-1:k]+l[k]+l[m<a-1?k+1:k])/3}for(let v=0;v<S;v++)for(let m=0;m<a;m++){const k=v*a+m;l[k]=(i[v>0?k-a:k]+i[k]+i[v<S-1?k+a:k])/3}}},je=(e,o,l)=>{const i=a*S;for(let n=0;n<i;n++){const r=Math.max(e[n],.15);l[n*4]=Math.min(255,r*127.5)|0,l[n*4+1]=Math.min(255,o[n]*255)|0,l[n*4+2]=0,l[n*4+3]=255}},He=(e,o,l,i)=>{const n=a*S;for(let r=0;r<n;r++)o[r]=e[r]>.3?1:0;for(let r=0;r<a;r++)o[r]=0,o[a+r]=0;for(let r=0;r<S;r++)for(let E=0;E<a;E++){const M=r*a+E;l[M]=o[M]?Math.min(1,r/i):0}},Ke=(e,o,l)=>{o.fill(0);const i=j/320,n=et/(1+2*et)*j+2,r=j-n,E=e()<.4?2:1,M=e()*4|0,C=(.05+.04*e())*(r-n)*(r-n)*1.5/i;let x=0;const v=(D,u,A)=>{const _=(u|0)*j+(D|0);o[_]<A&&(x+=!o[_],o[_]=A)},m=(D,u)=>D<1||u<1||D>=j-1||u>=j-1||l&&Math.abs(D-l[0])<l[2]&&u>l[1]-l[3],k=(D,u,A,_,F,w)=>{const tt=(e()-.5)*(F?.01:.004)/i,V=F?.012:.03,Q=F?.95+.15*e():.9+.25*e(),W=(F?2.6+.8*e():4+2*e())*i,q=e()<.5;let T=W*(.8+.6*e()),L=e()<.5?1:-1;for(let y=0;y<_&&(A+=tt+(e()-.5)*V,!(!F&&y>6*i&&Math.min(D-n,r-D,u-n,r-u)<3*i));y++){const Z=Math.cos(A),Et=Math.sin(A);if(D+=Z,u+=Et,m(D,u))break;const ct=y/_;if(v(D,u,w),!F&&ct<.5&&v(D-Et*.9,u+Z*.9,w),F<2&&y>=T){const de=Math.min(1,ct/.3)*Math.pow(1-ct,.9);for(let Dt=0;Dt<(q?2:1);Dt++){const qt=(F?.4:.2)*_*de*(.8+.4*e());qt>2*i&&k(D,u,A+L*(Q+.08*(e()-.5)),qt,F+1,w-45-15*e()),L=-L}T=y+W*(.85+.3*e())}}};for(let D=0;D<4&&!(D>=E&&x>=C);D++){const u=M+(D&1)*2+(D>>1)&3,A=e()<.45,_=.15+.7*e();let F=u&1?r:n,w=u&2?r:n;A&&(e()<.5?w=n+_*(r-n):F=n+_*(r-n));const tt=Math.atan2(j/2-w,j/2-F),V=(A?2:1)*(.8+.4*e()),Q=3+(e()*4|0),W=(150+110*e())*i;for(let q=0;q<Q;q++){const T=Q>1?q/(Q-1)-.5:0,L=tt+T*V+(e()-.5)*.45,y=e()*40*i,Z=e()*6.283,Et=Math.min(r-1,Math.max(n+1,F+Math.cos(Z)*y)),ct=Math.min(r-1,Math.max(n+1,w+Math.sin(Z)*y));k(Et,ct,L,W*(.5+.6*e())*(1-.3*Math.abs(T)),0,255)}}};return{P,U:vt,fin:Zt,need:Ge,tex:Lt,fbo:gt,tN:ut,vao:Ne,f2h:Pe,chem:(e,o,l,i,n)=>{const r=f.H,E=f.W,M=f.V,C=f.phi,x=a*S,v=e()*1e6|0,m=o==="Almost blank";let k=o==="Fingers and streaks"?1+.06*e():1.13+.1*e()-.03*l;(o==="Frost ferns"||o==="Bubbles")&&(k-=.05*e()),m&&(k=.36+.12*e());const D=.5+(e()-.5)*(m?.7:.5),u=m?.09+.08*e():.25+.3*e(),A=(e()-.5)*.3;let _=0;for(let d=0;d<a;d++){const B=d/(a-1);M[d]=m?.04+1.2*Math.exp(-(((B-D)/u)**2))*(.3+1.4*$t(B*6,.5,v))+.5*Math.exp(-(((B-D-.15)/u)**2)):.8+.35*Math.exp(-(((B-D)/u)**2))+A*(B-.5)+.5*($t(B*7,.5,v)-.5),M[d]=Math.max(.05,M[d]),_+=M[d]}for(let d=0;d<a;d++)M[d]*=k*S*a/_;const F=Math.round(S*(1-et))-1,w=.1+.1*e(),tt=f.gB||(f.gB=new Float64Array(a*3)),V=f.gX||(f.gX=new Float64Array(a*3)),Q=f.gI||(f.gI=new Int32Array(a*3)),W=f.gH||(f.gH=new Float64Array(6*41));for(let d=0;d<a;d++){const B=d/(a-1);tt[d]=1+w*(1-(2*B-1)**2),tt[a+d]=.7+.5*Bt(B*14,3,v+5),tt[2*a+d]=3+5*Bt(B*6,1,v+9);const Tt=B*9;for(let ht=0;ht<3;ht++){const be=ht===0?Tt:ht===1?Tt*2.1:Tt*4.3,ge=Math.floor(be),te=be-ge;Q[ht*a+d]=ge,V[ht*a+d]=te*te*(3-2*te)}}Ce(r,M,tt,V,Q,W,F,v);const q=Math.floor(S*.74);He(r,E,C,q);const T=Math.floor(x*(m?.025:o==="Fingers and streaks"?.035+.02*e():o==="Colour shift only"?.006:.01+.01*e())),L=Math.max(4,Math.ceil(T/70)),y=1.6,Z=7+8*e(),Et=f.V;for(let d=0;d<a;d++){let B=0;for(;B<S-1&&!E[B*a+d];)B++;Et[d]=B}let ct=0;for(let d=0;d<q;d++)for(let B=0;B<a;B++)E[d*a+B]||(ct=d);ct=Math.min(q-1,ct+12),(d=>{me(E,C,ct,q,d)})(30),Re(e,E,C,r,Et,ct,q,T,L,y,Z);const Dt=f.W2;Dt.set(E),Xe(E,Dt);const qt=f.cov||(f.cov=new Float32Array(a*S));Oe(Dt,M,qt,C,i);const We=f.G8;je(r,qt,We);const ot=f.B;ot.fill(0);const ye=Math.min(64,o==="Bubbles"?18+(e()*22|0):2+(e()*6|0));for(let d=0;d<ye;d++){const B=d*4,Tt=(64+d)*4,ht=e();ot[B]=et+e()*(1-2*et),ot[B+1]=et+Math.pow(e(),.8)*(1-2*et),ot[B+2]=.002+.016*Math.pow(e(),2.6)*(o==="Bubbles"?1.3:1),ot[B+3]=ht<.6?0:ht<.85?1:2,ot[Tt]=1+.6*e(),ot[Tt+1]=e(),ot[Tt+2]=.6+.6*e()}const we=o==="Fingers and streaks"?3+(e()*4|0):o==="Almost blank"?0:e()*3|0;for(let d=0;d<we;d++){const B=(128+d)*4;ot[B]=et+e()*(1-2*et),ot[B+1]=.35+.65*e(),ot[B+2]=(e()<.5?1:-.8)*(.04+.08*e()),ot[B+3]=7e-4+.0014*e()}const Ye=[.27+.07*e(),e(),o==="Fingers and streaks"?.09+.05*e():.04+.05*e()],Je=e(),Ve=e();return o==="Frost ferns"?Ke(zt(Math.imul(Je*4294967296|0,2654435769)^(Ve*4294967296|0)),f.F8,n):f.F8.fill(0),{nb:ye,ns:we,roll:Ye}},pools:{},H:new Float32Array(a*S),W:new Uint8Array(a*S),W2:new Uint8Array(a*S),V:new Float32Array(a),phi:new Float32Array(a*S),G8:new Uint8Array(a*S*4),F8:new Uint8Array(j*j),B:new Float32Array(64*3*4),H16:new Uint16Array(z*z*2)}})()),ft=f.U,Ft=St>400,ie=Ft?"b":"s",wt=f.pools[ie]||(f.pools[ie]={list:[],next:0});let N;if(wt.list.length<(Ft?2:9)){const c=Ft?768:256,h=Ft?768:384,p=Ft?1024:256,g=f.tex(c,c,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE),H=f.tex(h,h,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE,t.LINEAR_MIPMAP_LINEAR);t.generateMipmap(t.TEXTURE_2D);const Y=f.tex(p,p,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE),J=f.tex(a,S,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE),b=f.tex(j,j,t.R8,t.RED,t.UNSIGNED_BYTE,null,t.LINEAR,t.CLAMP_TO_EDGE),R=f.tex(64,3,t.RGBA32F,t.RGBA,t.FLOAT,null,t.NEAREST,t.CLAMP_TO_EDGE),I=f.tex(z,z,t.RG16F,t.RG,t.HALF_FLOAT,null,t.LINEAR,t.CLAMP_TO_EDGE);N={tS:g,tC:H,tW:Y,tG:J,tF:b,tB:R,tH:I,fS:f.fbo(g),fC:f.fbo(H),fW:f.fbo(Y),sres:c,cres:h,wres:p},wt.list.push(N)}else N=wt.list[wt.next],wt.next=(wt.next+1)%wt.list.length;const Gt=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(f.vao)},Ct=(c,h,p,g,H,Y,J)=>{t.bindTexture(t.TEXTURE_2D,c),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,J),t.texSubImage2D(t.TEXTURE_2D,0,0,0,h,p,g,H,Y)},ve=kt()*40,Jt=kt(),Vt=[Jt<.5?.16*Jt:.92+.16*(Jt-.5),.1+.8*rt(),.2+.08*rt()];let Rt=0,U=null;const he=()=>{const c=zt(xt^Math.imul(Rt+1,2654435769)),h=Rt===0,p=O===0&&c()<.75?c()<.5?1:-1:0,g=O===0?.56+.1*c():O===1?.48+.1*c():O===2?.58+.08*c():O===4?.34+.08*c():O===5?.44+.08*c():.5,H=(c()-.5)*.05,Y=.3+.4*c(),J=.03+.06*c(),b=.25+.25*c(),R=O===0&&c()<.55?.86+.08*c():0,I=(O===2?1.15:O===1?.8:O===4?1.1:1.15)*(.85+.3*c()),K=c()*50,P=.6+.6*c(),st=c(),it=p?-p:c()<.5?1:-1,bt=.34+.26*c(),vt=[O===0?st<.5?it*bt:0:O===1&&st<.75?it*(bt+.2):0,O===1?.24+.1*c():.12+.07*c(),-.012+.07*c(),.017+.012*c()],at=zt(xt^1008773089^Math.imul(Rt+1,2246822507)),Zt=[.5+.36*(at()-.5),.8+1.8*at(),.04+.35*at()*at(),(at()-.5)*1.2,.25+.4*at(),at()*1e5|0,Mt==="Almost blank"?1:0],Lt=ut=>(ut+et)/(1+2*et)*j,gt=f.chem(c,Mt,dt,Zt,O===0?[Lt(.5+(Y-.5)*Pt/Nt),Lt(g),.13*j,.12*j]:null);f.fin&&(f.fin(),f.fin=null),Gt(),t.bindFramebuffer(t.FRAMEBUFFER,N.fW),t.viewport(0,0,N.wres,N.wres),t.useProgram(f.P[f.need(It)]),t.uniform4f(ft[It].uA,ce,ve,0,0),t.uniform4f(ft[It].uB,Vt[0],Vt[1],Vt[2],ve*3.7),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.tN),t.drawArrays(t.TRIANGLES,0,3),Gt(),t.bindFramebuffer(t.FRAMEBUFFER,N.fS),t.viewport(0,0,N.sres,N.sres);const nt=f.need(fe);t.useProgram(f.P[nt]),t.uniform4f(ft[nt].uA,O,g,H,Y),t.uniform4f(ft[nt].uB,O===4?Y<.5?1:-1:O===5?H<0?-1:1:p,J,K,Nt/Pt),t.uniform4f(ft[nt].uC,R,b,P,1),t.uniform4f(ft[nt].uD,vt[0],vt[1],vt[2],vt[3]),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.tN),t.drawArrays(t.TRIANGLES,0,3),Ct(N.tG,a,S,t.RGBA,t.UNSIGNED_BYTE,f.G8,4),Ct(N.tF,j,j,t.RED,t.UNSIGNED_BYTE,f.F8,1),Ct(N.tB,64,3,t.RGBA,t.FLOAT,f.B,4),Gt(),t.bindFramebuffer(t.FRAMEBUFFER,N.fC),t.viewport(0,0,N.cres,N.cres),t.useProgram(f.P.ch),t.uniform4i(ft.ch.uI,gt.nb,gt.ns,0,0),t.uniform4f(ft.ch.uA,gt.roll[0],gt.roll[1],gt.roll[2],.7/j),t.uniform4f(ft.ch.uC,.6+.6*c()*(yt?0:1),0,0,0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,N.tG),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,N.tF),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.tB),t.drawArrays(t.TRIANGLES,0,3),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,N.tC),t.generateMipmap(t.TEXTURE_2D);const lt=dt?.72+.12*c():.95+.15*c();U={rot:h&&$?-.06:(c()-.5)*(h?.4:.22),cx:.5+(c()-.5)*($?.04:.1),cy:.5+(c()-.5)*($?.03:.08),pre:h?9:0,cor:[c()<.7?1:-1,c()<.7?1:-1,.22+.3*c()],dmax:Kt===1?[1.85*lt,1.85*lt,1.85*lt]:[1.8*lt*(dt?.92:1),1.8*lt,1.75*lt],fog:dt?.06+.05*c():.025,mot:(dt?.32:.16)*(Mt==="Colour shift only"?1.5:1),flare:[.15+.7*c(),c()<.5?.12+.15*c():.75+.15*c()],expo:I,cold:Mt==="Frost ferns"?1:.4+.3*dt,mo:[c()*90,c()*90,c()*90],spx:.25+.2*c()},Rt++;for(let ut=0;ut<z*z;ut++)X[ut]=0,Qt[ut]=0;Xt=!0},X=new Float32Array(z*z),Qt=new Float32Array(z*z),xe=new Float32Array(z*z);let Xt=!0;he();const s={land:0,ox:0,oy:0,rot:0,lift:0,down:!1,downT:0,dx:0,dy:0,drag:!1,hold:!1,phase:0,vx:0,vy:0,inT:0,shakeT:-9,shakeA:0,lastIn:0,flapN:0,auto:46},Se=()=>{const c=f.H16;for(let h=0;h<z*z;h++)c[h*2]=f.f2h(Qt[h]),c[h*2+1]=f.f2h(X[h]);Ct(N.tH,z,z,t.RG,t.HALF_FLOAT,c,4)},Ue=(c,h)=>{const p=Math.cos(U.rot+s.rot),g=Math.sin(U.rot+s.rot),H=c-(U.cx+s.ox),Y=h-(U.cy+s.oy),J=(H*p+Y*g)/Wt+ae/2,b=(-H*g+Y*p)/Wt+ne/2;return[(J-le)/Nt,(b-re)/Pt]},pe=c=>{Xt&&(Se(),Xt=!1);const h=(Math.max(0,c-s.land)+U.pre)*(1-.25*U.cold),p=U.rot+s.rot;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,St,St),Gt(),t.useProgram(f.P[f.need(Yt)]);const g=f.U[Yt];t.uniform4f(g.uT,U.cx+s.ox,U.cy+s.oy,Math.cos(p),Math.sin(p)),t.uniform4f(g.uK,Wt,ae,ne,s.lift),t.uniform4f(g.uI,le,re,Nt,Pt),t.uniform4f(g.uD,h,St,Kt,dt),t.uniform4f(g.uE,ke,U.flare[0],U.flare[1],U.expo),t.uniform4f(g.uF,pt===2?Le:0,pt===1?.4:pt===2?.7:1,U.mot,U.cold),t.uniform4f(g.uG,U.dmax[0],U.dmax[1],U.dmax[2],U.fog),pt===2?t.uniform4f(g.uL,2,Math.cos(_t),Math.sin(_t),Fe):t.uniform4f(g.uL,pt,.78,.18,0),t.uniform4f(g.uM,U.mo[0],U.mo[1],U.mo[2],U.spx),t.uniform4f(g.uP,U.cor[0]*Be,U.cor[1]*qe,U.cor[2],Mt==="Almost blank"?1:0),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,f.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,N.tS),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,N.tC),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,N.tW),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D,N.tH),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)};pe(0);const Ie=c=>{G.sound.hit("click",.8,{at:c}),G.sound.hit("noise",.35,{dur:.06,cutoff:3500,at:c+.01}),G.sound.hit("noise",.28,{dur:.55,cutoff:900,at:c+.08}),G.sound.note(40,{dur:.5,vel:.08,wave:"sawtooth",cutoff:500,at:c+.08})},ue=(c,h,p)=>{s.phase=1;const g=Math.hypot(h,p)||1;s.vx=h/g*2.6,s.vy=p/g*2.6,s.lift=1,G.sound.hit("noise",.25,{dur:.25,cutoff:2200})};let _e=0;return(c,h)=>{h=Math.min(.1,Math.max(0,h||0)),_e=c;const p=G.input,g=p.taps?p.taps():[];if((p.down||g.length)&&(s.lastIn=c),s.phase===0){if(p.down&&!s.down&&(s.down=!0,s.downT=c,s.dx=p.x,s.dy=p.y,s.drag=!1,s.hold=!1),s.down){const b=p.x-s.dx,R=p.y-s.dy;!s.drag&&Math.hypot(b,R)>.03&&(s.drag=!0,s.hold=!1),s.drag?(s.ox+=(b-s.ox)*Math.min(1,h*18),s.oy+=(R-s.oy)*Math.min(1,h*18),s.lift+=(1-s.lift)*Math.min(1,h*10)):!s.hold&&c-s.downT>.25&&(s.hold=!0,G.sound.note(57,{dur:1.6,vel:.06,wave:"sine"}),G.sound.note(64,{dur:1.6,vel:.04,wave:"sine",at:.05})),p.down||(s.down=!1,s.drag&&ue(c,s.ox+(p.x-s.dx)*.5,s.oy+(p.y-s.dy)*.5),s.hold=!1,s.drag=!1)}for(const b of g)!s.drag&&s.phase===0&&!(s.down&&s.hold)&&(s.shakeT=c,s.shakeA=Math.min(1.4,s.shakeA*.5+1),s.flapN=0);if(!s.drag&&!s.down&&(s.ox*=Math.max(0,1-h*8),s.oy*=Math.max(0,1-h*8),s.lift*=Math.max(0,1-h*6)),c-s.lastIn>s.auto&&c-s.land>s.auto){s.auto=40+24*kt();const b=kt()*6.283;ue(c,Math.cos(b),Math.sin(b)*.4-.2)}}const H=c-s.shakeT;if(H<1.3){const b=s.shakeA*Math.exp(-H*3.2),R=Math.sin(H*26),I=Math.sin(H*26+1.2);s.rot=.1*b*R,s.phase===0&&!s.drag&&(s.ox=.034*b*I,s.oy=.02*b*R,s.lift=Math.max(s.lift,.9*Math.min(1,b)));const K=Math.floor(H*26/3.14159);K>s.flapN&&b>.12&&(s.flapN=K,G.sound.hit("noise",.22*b,{dur:.07,cutoff:700+500*b}))}else s.rot*=.9;if(s.phase===1)s.ox+=s.vx*h,s.oy+=s.vy*h,s.vx*=1+h,s.vy*=1+h,(Math.abs(s.ox)>1.1||Math.abs(s.oy)>1.1)&&(he(),s.phase=2,s.inT=c,Ie(0),s.ox=0,s.oy=1.05,s.lift=1);else if(s.phase===2){const b=Math.min(1,(c-s.inT)/.7),R=1-Math.pow(1-b,3);s.oy=1.05*(1-R),s.lift=1-R,b>=1&&(s.phase=0,s.land=c,s.oy=0,s.lift=0,G.sound.hit("noise",.18,{dur:.12,cutoff:500}))}s.phase!==0&&(s.land=c);let Y=!1;if(s.hold&&s.phase===0){const[b,R]=Ue(p.x,p.y);for(let I=0;I<z;I++)for(let K=0;K<z;K++){const P=(K+.5)/z-b,st=(I+.5)/z-R,it=Math.exp(-(P*P+st*st)/.045);X[I*z+K]+=(1-X[I*z+K])*it*h*2.2}Y=!0}let J=0;for(let b=0;b<z*z;b++)X[b]>J&&(J=X[b]);if(J>.001||Y){let b=h;for(;b>1e-4;){const R=Math.min(b,.03333333333333333);b-=R;for(let I=0;I<z;I++)for(let K=0;K<z;K++){const P=I*z+K,st=K>0?X[P-1]:X[P],it=K<z-1?X[P+1]:X[P],bt=I>0?X[P-z]:X[P],vt=I<z-1?X[P+z]:X[P];xe[P]=X[P]+R*(2.2*(st+it+bt+vt-4*X[P])-.33*X[P])}for(let I=0;I<z*z;I++)X[I]=Math.max(0,xe[I]),Qt[I]+=R*X[I]*16}Xt=!0}pe(c)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
