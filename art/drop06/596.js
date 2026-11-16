// Drift Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/596.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ut){Ut&&Ut.add({num:596,name:"Drift Ice",fam:"Vistas",recipe:"A shore of dark rock and crusted snow looking out over sea ice that goes all the way to the horizon, from round pancakes to broken plates piled into ridges. Where you stand, the light and weather, how tight the ice is and the sea smoke change every mint. There's nothing to press, just watch the ice ride the swell.",music:!0,gl:!0,fps:30,seed:0,make(X){const e=X.gl,F=X.size,I=!!X.home;let W=1500123598;for(let t=2;t<66;t+=8)W=Math.imul(W^parseInt(X.hash.slice(t,t+8),16),2246822507)^W>>>13;const s=()=>{W=W+1831565813|0;let t=Math.imul(W^W>>>15,1|W);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Ee=W^826366246;const ze=()=>{Ee=Ee+1831565813|0;let t=Math.imul(Ee^Ee>>>15,1|Ee);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let be=W^2014422772;const N=()=>{be=be+1831565813|0;let t=Math.imul(be^be>>>15,1|be);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},ut=t=>{let n=0;for(const f in t)n+=t[f];let i=N()*n;for(const f in t)if(i-=t[f],i<0)return f;return Object.keys(t)[0]},fe=t=>{let n=0;for(const f in t)n+=t[f];let i=s()*n;for(const f in t)if(i-=t[f],i<0)return f;return Object.keys(t)[0]},V=Math.PI*2,J=Math.PI/180,ft=I?"Apricot dawn":fe({"Apricot dawn":42,"Rose dawn":27,"Pale gold":14,"Sun pillar":6,"Copper dawn":11}),Ne=I?"Banded":fe({Banded:45,"Tight to the horizon":30,"Wide leads":25}),De=I?"Mixed pans":fe({"Mixed pans":46,Pancakes:28,"Great plates":18,"One great pan":8}),Be=0,Ce=["dawn","shore","",""],Pe=Be?Ce[0]:I?"dawn":ut({dawn:70,blue:10,snow:9,morning:11}),z=Be?Ce[1]:I?"shore":ut({shore:26,foot:22,head:17,along:19,back:16}),he=Be?Ce[2]:I?"":ut({"":78,gone:6,nilas:9,raft:7}),Ge=X.trait("Light",Pe==="blue"?"Blue hour before the sun":Pe==="snow"?"Snow shower":Pe==="morning"?"Clear mid-morning":z==="back"&&ft==="Sun pillar"?"Apricot dawn":ft),Ia=X.trait("Pack",he==="gone"?"Gone out overnight":he==="nilas"?"Grey ice in the leads":Ne),Lt=X.trait("Floes",he==="raft"?"Rafted and ridged":De),Po=I?"Long and slow":fe({"Long and slow":58,"High and long":30,"Almost still":12}),Nt=X.trait("Swell",Be&&Ce[3]?Ce[3]:Po),Ye=X.trait("Snow",I?"Dusted":fe({Dusted:50,"Fresh fall":30,"Scoured and glazed":20})),Dt=X.trait("Far shore",I?"Kunashiri line":fe({"Kunashiri line":68,"Lost in haze":26,"Clear snow peaks":6})),Ke=X.trait("Cloud",I?"Band below the sun":fe({"Band below the sun":55,"Clear horizon":25,"High mackerel":20})),Fo=X.trait("Vapour",I?"Thin":fe({Thin:70,"Smoking leads":30})),Xa=X.trait("Standpoint",{shore:"On the shore rocks",foot:"Down on the ice foot",head:"High on the headland",along:"Along the coast",back:"Back to the sun"}[z]),ko=ft==="Copper dawn"||N()<.42?-1:1,_o=6+36*N()*(.4+.6*N()),So=(155+50*N())*J,ce=Pe==="snow",Fe=Pe==="blue",We=Pe==="morning",Mo=(19+7*s()-(I?3:0))*J,Bt=(I?3.2:2.6+2.2*s())*J,Ct=I?Mo:z==="back"?So:ko*_o*J,ht=Fe?-2.6*J:We?(13+6*N())*J:z==="back"?Bt+7*J:Bt,je=[Math.sin(Ct)*Math.cos(ht),Math.sin(ht),Math.cos(Ct)*Math.cos(ht)],Uo=Ge==="Rose dawn",Lo=Ge==="Pale gold",It=Ge==="Sun pillar",No=Ge==="Copper dawn",we=(t,n,i,f,m,b)=>Fe?m:ce?f:We?b:Uo?t:Lo?n:No?i:null,mt=we([3.4,1.55,1.25],[3.4,2.5,1.5],[3.6,1.62,.82],[.2,.2,.21],[.3,.13,.12],[2.2,2.05,1.85])||[3.8,1.95,1.05],dt=we([.2,.2,.255],[.24,.26,.31],[.19,.185,.24],[.47,.49,.53],[.22,.25,.31],[.16,.21,.29])||[.2,.21,.265],pt=we([.44,.29,.28],[.4,.33,.27],[.38,.29,.27],[.53,.53,.56],[.33,.31,.35],[.26,.28,.32])||[.45,.3,.25],Do=5.3+(I?0:s()*1.2),me=z==="foot"||z==="back"?-3+6*N():z==="along"?6:0,Xt=z==="along"||z==="back"?.08:1,Bo=z==="foot"?1.7:z==="back"?3.2:z==="head"?30+9*N():Do,qt=z==="along"?-27-7*N():z==="back"?-38-14*N():z==="foot"?(N()-.5)*20:z==="head"?-30-18*N():-2,Co=z==="foot"?-5:z==="back"?-6:z==="head"?-13-4*N():z==="along"?-6:-7.5,Io=ce?11:We?.6:Fe?.8:1,Ot=Math.tan((z==="foot"?35:31.5)*J),Xo=z==="foot"?.12:z==="back"?.6:1,qo=(Nt==="Almost still"?.12:Nt==="High and long"?.62:.4)*(z==="foot"?.65:1),Oo=-.2+.5*s(),vt=(t,n,i,f)=>{const m=V/n,b=Oo+f,w=m*Math.sin(b),c=m*Math.cos(b);return[w,c,i*qo,Math.sqrt(9.81*m)]},Qe=[vt(0,92+26*s(),1,0),vt(1,58+14*s(),.55,.32+.25*s()),vt(2,33+9*s(),.22,-.45-.3*s())],xt=[V*s(),V*s(),V*s()],yt=De==="Pancakes"?.7:De==="Great plates"?1.5:De==="One great pan"?1.15:1,Ho=Ye==="Fresh fall"?1:Ye==="Scoured and glazed"?.28:.68,Ht=he==="gone"?-.95:Ne==="Tight to the horizon"?.24:Ne==="Wide leads"?-.2:.06,Vt=Ne==="Banded"?.34:Ne==="Wide leads"?.26:.12,Vo=Ye==="Fresh fall"?.22:Ye==="Scoured and glazed"?-.2:0,Gt=I?[0,0]:[ze()*180-90,ze()*180-90],Ze=s()*90,Yt=5.4+3*s(),Kt=s()*10,ke=[s()*6.28,s()*6.28,s()*6.28],le=t=>12.5-.5*t-.0042*t*t*(t<0?Xt:1)+.95*Math.sin(t*.19+ke[0])+.55*Math.sin(t*.57+ke[1])+.3*Math.sin(t*1.31+ke[2]),Ie=z==="foot"?le(me)+1.1:z==="back"?le(me)-1.5:z==="along"?le(me)-5:0,r=e.__c596||(e.__c596={}),Xe=(t,n,i)=>{const f=Math.floor(t),m=Math.floor(n);let b=t-f,w=n-m;b=b*b*(3-2*b),w=w*w*(3-2*w);const c=(k,U)=>Wt[((U&255)<<8|k&255)*4+i]/255,d=c(f,m)+(c(f+1,m)-c(f,m))*b,v=c(f,m+1)+(c(f+1,m+1)-c(f,m+1))*b;return d+(v-d)*w},Go=(t,n)=>.5*Xe(t,n,0)+.25*Xe(t*2.03+7,n*2.03+7,1)+.125*Xe(t*4.1+19,n*4.1+19,2)+.0625*Xe(t*8.3+3,n*8.3+3,3),Je=(t,n)=>{const i=Math.atan2(t,n),f=Math.max(4,Math.hypot(t,n)),m=Math.log(f),b=i*9,w=Go(b*.55+Ze,m*3.4+Ze*.7),c=Xe(b*.22+3+Ze,m*1.4+11,2);return Math.max(0,Math.min(1,.62+Ht+1.7*(w-.47)+Vt*Math.sin(m*Yt+3.2*c+Kt)))},G=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
`,_e=G+"void main(){ vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.); gl_Position=vec4(p,1.,1.); }",qe=`uniform sampler2D uN;
vec4 n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.); }
float fbm(vec2 p){ return .5*n2(p).x+.25*n2(p*2.03+7.).y+.125*n2(p*4.1+19.).z+.0625*n2(p*8.3+3.).w; }
`,Te=`uniform vec4 uP[13];
float swell(vec2 p, out vec2 g){
  float kd=mix(uP[2].w,1.,smoothstep(6.,130.,length(p-uP[0].xz)));     // the swell dies in the ice near the shore (cycle 2: the ice-foot view heaved too hard)
  float a0=dot(uP[5].xy,p)-uP[8].x, a1=dot(uP[6].xy,p)-uP[8].y, a2=dot(uP[7].xy,p)-uP[8].z;
  float s0=sin(a0),c0=cos(a0),s1=sin(a1),c1=cos(a1),s2=sin(a2),c2=cos(a2);
  g=(uP[5].xy*uP[5].z*c0+uP[6].xy*uP[6].z*c1+uP[7].xy*uP[7].z*c2)*kd;
  return (uP[5].z*s0+uP[6].z*s1+uP[7].z*s2)*kd;
}
vec3 camRay(vec2 q){ return normalize(uP[3].xyz+(q.x*uP[1].xyz+q.y*uP[2].xyz)*uP[0].w); }
`,Yo=G+qe+`uniform vec3 uFX,uFY,uFZ; uniform vec2 uRes; uniform vec4 uS[6]; out vec4 o;
float at1(float y,float x){ float a=atan(y/(abs(x)+1e-6)); return x<0.?(y>=0.?3.14159265-a:-3.14159265-a):a; }
vec3 sky(vec3 d){
  vec3 s=uS[0].xyz; float y=d.y, mu=dot(d,s);
  vec2 hs=normalize(s.xz); float lh=max(length(d.xz),1e-4); float az=dot(d.xz/lh,hs);
  float el=asin(clamp(y,-1.,1.));
  float e=max(el,0.);
  vec3 ZEN=uS[1].xyz, HOR=mix(uS[2].xyz,uS[3].xyz,smoothstep(-.55,1.,az));
  vec3 c=mix(HOR,ZEN,1.-exp(-max(el,-.02)*8.5));
  c=mix(c,uS[3].xyz*1.15,.62*exp(-e*e*850.)*smoothstep(-.3,1.,az));
  // the earth's shadow and the pink belt opposite the sun
  float anti=smoothstep(.15,-1.,az);
  c=mix(c,vec3(.29,.3,.36),anti*.55*exp(-e*e*190.)*smoothstep(.0,.03,e));
  c=mix(c,uS[4].xyz,anti*.6*exp(-((e-.135)/.09)*((e-.135)/.09)));
  // the rare sun pillar: ice crystals standing the sun up in a column
  if(uS[2].w>0.){ float dx=acos(clamp(az,-1.,1.)); c+=uS[3].xyz*.4*uS[2].w*exp(-(dx/.025)*(dx/.025))*smoothstep(.0,.05,y)*exp(-max(y-.04,0.)*8.)*(1.-.6*smoothstep(0.,.03,abs(el-asin(clamp(s.y,-1.,1.))))); }
  // glow round the sun
  float sg=max(mu,0.);
  float dA=acos(clamp(az,-1.,1.)), dE=el-asin(clamp(s.y,-1.,1.));
  c+=uS[3].xyz*(.13*pow(sg,9.)+.16*pow(sg,70.)+.36*exp(-dA*dA*60.-dE*dE*500.)*smoothstep(.2,.06,s.y));
  return c;
}
float ridges(vec2 p,float seed){ return fbm(p+seed)+.4*fbm(p*2.7+seed+9.); }
void main(){
  vec2 q=gl_FragCoord.xy/uRes*2.-1.;
  vec3 d=normalize(uFZ+q.x*uFX+q.y*uFY);
  float y=d.y, lh=max(length(d.xz),1e-4); vec2 hd=d.xz/lh;
  float az=at1(d.x,d.z);
  float el=asin(clamp(y,-1.,1.));
  vec3 c=sky(d);
  // high cirrus on a plane far overhead
  if(y>.02){
    vec2 cq=d.xz/(y+.09);
    float w=fbm(cq*vec2(.9,2.6)+vec2(uS[5].x,0.));
    float streak=smoothstep(.54,.86,fbm(cq*vec2(.38,1.7)+vec2(w*1.6+uS[5].y,w*.4)))*uS[5].z;
    float fine=smoothstep(.42,.74,fbm(cq*vec2(1.5,6.2)+w*2.3));
    float cl=clamp(streak*(.25+.6*fine),0.,1.)*smoothstep(.02,.16,y)*.62;
    vec2 hs=normalize(uS[0].xz);
    float toward=dot(hd,hs)*.5+.5;
    vec3 lit=mix(uS[4].xyz*1.35,uS[3].xyz*1.5,toward*toward);
    c=mix(c,lit*(.75+.4*fine),cl*.85);
  }
  // the low band of cloud the sun has just cleared
  {
    float e0=uS[5].w;
    if(e0>0.){
      float nu=az*7.;
      float rag=fbm(vec2(nu,el*40.+3.))-.45, rag2=fbm(vec2(nu*3.1,el*90.+8.))-.45;
      float top=e0+rag*.05+rag2*.02, bot=.012+rag*.012;
      float mask=smoothstep(top+.008,top-.008,el)*smoothstep(bot-.008,bot+.008,el);
      if(mask>0.){
        vec3 bandC=mix(vec3(.16,.14,.24),vec3(.30,.22,.32),smoothstep(-.6,1.,dot(hd,normalize(uS[0].xz))));
        float gl=pow(max(dot(hd,normalize(uS[0].xz)),0.),6.);
        float edge=smoothstep(top-.03,top+.002,el);
        bandC+=uS[3].xyz*.9*gl*edge*(.5+.6*rag2);
        c=mix(c,bandC,mask*.94);
      }
    }
  }
  // the far land: Kunashiri a thin blue line far out to sea, the Shiretoko range behind, inland
  {
    vec2 hs=hd;
    float seaAz=abs(az+.45);
    if(uS[1].w>0.&&seaAz<.9){
      float top=.0055*uS[1].w*(.4+1.4*fbm(vec2(az*16.,3.)))*smoothstep(.9,.35,seaAz);
      float m=smoothstep(top,top-.0018,el)*smoothstep(-.002,.002,el);
      c=mix(c,mix(c,vec3(.32,.34,.55),.8),m);
    }
    float back=clamp(-hd.y*1.2+.1*hd.x,0.,1.);
    if(back>0.&&el>-.02){
      float r0=fbm(vec2(az*3.5+11.,2.)), r1=fbm(vec2(az*11.+4.,9.));
      float top=.012+back*(.05+.075*r0+.03*r1);
      float m=smoothstep(top+.0015,top-.0015,el);
      if(m>0.){
        float lit=.5+.6*fbm(vec2(az*38.,el*180.));
        vec3 rock=mix(vec3(.16,.16,.27),vec3(.42,.28,.34),lit);
        float snow=smoothstep(top-.035,top-.012,el+.01*r1);
        vec3 mt=mix(rock,uS[4].xyz*1.15,snow);
        mt=mix(mt,c,.5+.3*(1.-back));
        c=mix(c,mt,m);
      }
    }
  }
  // below the horizon the cube only ever shows as reflection colour
  if(y<0.){ c=mix(c,uS[2].xyz*.7,smoothstep(0.,-.1,y)); }
  o=vec4(c*(1.+(texelFetch(uN,ivec2(gl_FragCoord.xy)&255,0).x-.5)*.06),1.);
}`,Ko=G+qe+`uniform vec2 uRes; uniform vec4 uS[3]; uniform int uK; out vec4 o;
float cov(float az,float v){
  float u=az*9.;
  float f=fbm(vec2(u*.55+uS[0].x,v*3.4+uS[0].x*.7));
  float w=n2(vec2(u*.22+3.+uS[0].x,v*1.4+11.)).z;
  return max(clamp(.62+uS[0].y+1.7*(f-.47)+uS[0].z*sin(v*uS[0].w+3.2*w+uS[1].x),0.,1.)*(1.-.9*uS[1].w),uS[1].w*smoothstep(7.5,8.7,v+.3*f));
}
void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  float az=(uv.x-.5)*6.2831853, v=mix(uS[1].y,uS[1].z,uv.y);
  vec2 q=vec2(uv.x*uS[2].x*.45,uv.y*uS[2].y);
  vec2 ip=floor(q), fp=fract(q);
  float F1=9.,F2=9.; vec2 pick=vec2(0.);
  for(int j=-1-uK;j<=1+uK;j++) for(int i=-1-uK;i<=1+uK;i++){
    vec2 g=vec2(float(i),float(j));
    vec4 h=texelFetch(uN,ivec2(mod(ip+g,256.)),0);
    vec2 r=g+h.xy*.86+.07-fp;
    float scale=mix(.75,1.3,h.z);
    float d=dot(r,r)/(scale*scale);
    if(d<F1){F2=F1;F1=d;pick=h.zw;} else if(d<F2) F2=d;
  }
  float edge=sqrt(F2)-sqrt(F1);
  float c0=cov(az,v);
  float present=step(pick.x*.82,c0+.08);
  float lw=fbm(vec2(az*2.2+uS[0].x,v*.8)), ld=abs(fract(v*1.3+lw*1.1+uS[0].x*.1)-.5);
  present*=smoothstep(.006,.022,.5-ld+.012*sin(az*40.+v*7.));
  float ice=smoothstep(.015,.075,edge)*present;
  o=vec4(ice,pick.y,1.-smoothstep(.015,.14,edge),c0);
}`,Wo=G+qe+Te+`uniform samplerCube uSky; uniform vec4 uL,uLo,uL2; uniform int uK; out vec4 o;
float shore(float x){ return 12.5-.5*x-.0042*x*x*(x<0.?uL.x:1.)+.95*sin(x*.19+uL.y)+.55*sin(x*.57+uL.z)+.3*sin(x*1.31+uL.w); }
float rockAt(vec2 p){
  vec2 pp=(p+uLo.xy)/2.3; vec2 ip=floor(pp), fp=fract(pp); float best=-9.;
  for(int j=-1-uK;j<=1+uK;j++) for(int i=-1-uK;i<=1+uK;i++){
    vec2 g=vec2(float(i),float(j)); vec4 h=texelFetch(uN,ivec2(mod(ip+g,256.)),0);
    vec2 r=g+h.xy*.82+.09-fp;
    vec2 n=(vec2(h.z,h.w)-.5)*1.1;
    float top=.5+h.z*.5+dot(r,n)*.8;
    float rd=length(r*vec2(.8+h.w*.5,1.1-.3*h.x));
    float cone=(.62+.3*h.z-rd)*2.8;
    best=max(best,min(top,cone)*.55);
  }
  return best*1.25;
}
vec2 land(vec2 p, float lod){
  float d=shore(p.x)-p.y;
  float b=-1.6+2.7*smoothstep(-5.,1.2,d)+1.7*smoothstep(1.,11.,d)+1.4*smoothstep(8.,26.,d)+4.5*smoothstep(18.,70.,d);
  b+=(fbm(p*.018)-.45)*9.*smoothstep(14.,70.,d);
  float rock=-30.;
  if(d>-7.&&d<34.){
    float amt=smoothstep(-7.,-1.,d)*(1.-smoothstep(16.,34.,d));
    float r=rockAt(p);
    if(lod>0.){ r+=(n2(p*3.1).x-.5)*.16+(n2(p*7.3+5.).y-.5)*.05; }     // cycle 2: no 5 cm grain on the rock (it read as fur along every snow edge)
    rock=b-.2+amt*r-.4*(1.-amt);
    rock-=(1.-smoothstep(1.4,4.2,length(p-uL2.xy)))*1.1;    // you stand on crust, not on a boulder
  }
  float hs=b+.13+uLo.z+.16*(fbm(p*.6)-.45)*2.+(lod>0.?.035*(n2(p*3.9+13.).x-.5)+.012*(n2(p*11.+3.).y-.5):0.);
  hs=mix(hs,max(hs,rock-.05+.1*n2(p*.9).x),smoothstep(0.,.35,rock-hs)*.72);
  float h=max(rock,hs);
  return vec2(h, rock-hs);
}
float land0(vec2 p){ return land(p,1.).x; }
void main(){
  vec2 q=gl_FragCoord.xy/vec2(uP[9].w)*2.-1.;
  vec3 ro=uP[0].xyz, rd=camRay(q);
  // one rolled loop, one inlined land(): the march, then four heights for the normals, then the sun's shadow
  // (cycle 2: land() inlined at four sites was 340 ms of Windows compile; one site is about a third of that)
  float t=.3, hit=-1., pz=0., hc=0., e=.02, e2=.16, h1=0., h2=0., h3=0., h4=0., lod=1., sh=1., st=.08, dh=0.;
  vec3 L=uP[4].xyz, p=ro, n=vec3(0.,1.,0.);
  float tmax=rd.y<-.01?min(-(ro.y+.3)/rd.y,uL2.z):uL2.z;     // cycle 2: stop at the sea; the snowy seabed under it had been drawn in place of the water between the pans

  int ph=rd.y<.32?0:3, k=0, mi=0, mN=110+int(uL2.w);
  for(int i=0;i<140+int(uL2.w)+uK;i++){
    if(ph==0&&(t>=tmax||mi>=mN)) ph=3;
    if(ph==3) break;
    vec2 xz=p.xz; float ld=0.;
    if(ph==0){ p=ro+rd*t; xz=p.xz; ld=t<55.?1.:0.; mi++; }
    else if(ph==1){ xz+=k==0?vec2(e,0.):k==1?vec2(0.,e):k==2?vec2(e2,0.):vec2(0.,e2); ld=k<2?lod:0.; }
    else { vec3 q2=p+L*st+n*.02; xz=q2.xz; dh=q2.y; }
    vec2 l=land(xz,ld);
    if(ph==0){ float d0=p.y-l.x;
      if(d0<max(.003,.0012*t)){ hit=t; pz=l.y; hc=l.x; e=.02+.0018*t; lod=t<55.?1.:0.; ph=1; k=0; }
      else t+=max(.012+.0016*t,min(d0*.55*(1.+t*.012)*(1.+step(.6,d0)),d0*(rd.y<-.66?.6:.95)/max(-rd.y,.05)));    // the cap: a steep ray must not step past the ground
    } else if(ph==1){ if(k==0) h1=l.x; else if(k==1) h2=l.x; else if(k==2) h3=l.x; else h4=l.x; k++; if(k>=4){ n=normalize(vec3(hc-h1,e,hc-h2)); ph=2; k=0; } }
    else { sh=min(sh,clamp((dh-l.x)/(st*.04+.012),0.,1.)); st+=max(.08,st*.14); k++; if(sh<.02||st>=60.||k>=24) ph=3; }
  }
  if(hit<0.){ o=vec4(0.,0.,0.,0.); gl_FragDepth=1.; return; }
  float rockH=pz;
  float seaD=p.y;
  float rockF=smoothstep(-.012,.012,rockH);
  float ndl=max(dot(n,L),0.);
  vec3 albedo;
  float tex=n2(p.xz*17.).x*.5+n2(p.xz*53.).y*.3+n2(p.xz*5.3+2.).z*.4;
  // wind crust and sastrugi close to the camera: a fine bump on the snow only
  if(hit<26.){ float k=smoothstep(26.,6.,hit); vec2 dp=vec2(n2(p.xz*vec2(5.,13.)+3.).x-.5,n2(p.xz*vec2(5.,13.)+71.).y-.5)*.3+vec2(n2(p.xz*31.).z-.5,n2(p.xz*31.+9.).w-.5)*.08; n=normalize(n+vec3(dp.x,0.,dp.y)*k*step(rockH,.0)+vec3(n2(p.xz*9.).x-.5,0.,n2(p.xz*9.+5.).y-.5)*.1*k*step(0.,rockH)); }
  vec3 nC=normalize(vec3(hc-h3,e2,hc-h4));
  float slope=1.-nC.y;
  float caps=smoothstep(.3,.09,slope+.07*(n2(p.xz*2.9).y-.5))*smoothstep(.34,.52,n2(p.xz*.7+4.).x);
  vec3 ao=mix(vec3(.66,.68,.74),vec3(1.),clamp(.45+rockH*1.2,0.,1.)); float glz=0.;
  {
    float ves=smoothstep(.3,.1,n2(p.xz*34.+3.).w)*.5;
    // dark andesite: grey-brown where the light rakes it, black only in the joints; glazed with frozen spray toward the sea
    vec3 rk=mix(vec3(.034,.035,.039),vec3(.08,.081,.087),tex)*(1.-ves)+vec3(.018,.018,.021)*ves;
    rk+=vec3(.03,.035,.05)*smoothstep(.62,.8,n2(p.xz*2.9+7.).y)*.3;
    float jn=abs(n2(p.xz*vec2(1.3,3.7)+p.y*1.7).x-.5); rk*=.3+.7*smoothstep(0.,.045,jn);
    glz=smoothstep(2.4,.3,p.y)*smoothstep(-.4,.1,p.y);
    rk=mix(rk,vec3(.11,.135,.135)*(.8+.4*tex),glz*.7);
    rk*=.5+.5*smoothstep(0.,.07,rockH);     // the shade under a snow cap's lip, where rock steps out of the snow

    vec3 sn=vec3(.76,.77,.8)*(.86+.28*tex);
    albedo=mix(sn,rk,rockF*(1.-smoothstep(.7,.8,caps)));
  }
  // ice foot where rock meets the sea: glazed rime in a band above the water
  float foot=smoothstep(.75,.0,seaD)*smoothstep(-.3,.05,seaD);
  albedo=mix(albedo,vec3(.72,.82,.92)*(.75+.35*tex),foot*.85);
  vec3 sunC=uP[9].rgb, top=uP[10].rgb, sunS=uP[11].rgb;
  vec2 sH=normalize(L.xz);
  float wrap=clamp(dot(n.xz,sH)*.5+.5,0.,1.);
  vec3 amb=mix(top*(.4+.6*n.y),sunS,wrap*wrap*.75);
  float snowy=1.-rockF*(1.-smoothstep(.7,.8,caps));
  vec3 c=albedo*(sunC*mix(vec3(.75,.75,.8),vec3(1.),snowy)*ndl*sh*1.05+amb*(mix(.85,1.1,snowy))*ao);
  // sheen: crust and wet rock catching the low sun
  vec3 hv=normalize(L-rd); float sp=pow(max(dot(n,hv),0.),mix(mix(60.,25.,glz),180.,snowy));
  c+=mix(vec3(.5,.55,.8),sunC,snowy)*sp*sh*mix(.012+foot*.3+glz*.12,.05,snowy);
  // haze with distance
  float hz=1.-exp(-hit*uP[10].w/1400.);
  c=mix(c,texture(uSky,normalize(rd*vec3(1.,.15,1.)+vec3(0.,.02,0.))).rgb*.9,hz);
  float cz=hit*dot(rd,uP[3].xyz);
  o=vec4(c, cz);
  gl_FragDepth=clamp(.5*(uP[12].x+uP[12].y/cz)+.5,0.,1.);
}`,jo=G+Te+`layout(location=0) in vec2 aQ; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
out float vT;
void main(){
  vec3 A=aA.xyz, B=aB.xyz; vec3 mid=A+(B-A)*aQ.y; float w=mix(aA.w,aB.w,aQ.y); w=max(w,dot(mid-uP[0].xyz,uP[3].xyz)*.0007);
  vec3 toEye=normalize(uP[0].xyz-mid), dir=normalize(B-A); vec3 side=normalize(cross(dir,toEye));
  vec3 v=mid+side*aQ.x*w-uP[0].xyz;
  float cz=dot(v,uP[3].xyz), cx=dot(v,uP[1].xyz), cy=dot(v,uP[2].xyz);
  gl_Position=vec4(cx/uP[0].w,cy/uP[0].w,cz*uP[12].x+uP[12].y,cz); vT=cz;
}`,Qo=G+"in float vT; out vec4 o; void main(){ o=vec4(vec3(.018,.016,.028),vT); }",Zo=G+"uniform sampler2D uB; uniform vec4 uA; out vec4 o; void main(){ vec4 c=texelFetch(uB,ivec2(gl_FragCoord.xy),0); if(c.a<=0.) discard; o=vec4(c.rgb,1.); gl_FragDepth=clamp(.5*(uA.x+uA.y/(c.a*uA.z))+.5,0.,1.); }",Jo=G+Te+`layout(location=0) in vec2 aM; layout(location=1) in vec4 aI; layout(location=2) in vec2 aRow;
uniform sampler2D uOut, uN; uniform vec4 uM; uniform float uFast;
out vec3 vP; out vec2 vQ; out vec4 vI; out vec4 vJ; out vec4 vK;
float pr(float rho,float fb,float rim,float pl,float R){
  if(rho>=1.) return mix(.02,-.07,clamp((rho-1.)/.06,0.,1.));
  float b=smoothstep(.84,.945,rho)*(1.-smoothstep(.945,1.,rho));
  float pan=mix(fb+rim*b,.02,smoothstep(.955,1.,rho));
  float e=clamp((1.-rho)*R/.22,0.,1.);
  return pl>.9?.02+(fb-.02)*(1.-(1.-e)*(1.-e)):pan;
}
void main(){
  vec2 C=aI.xy; float S=aI.w, r=aI.z, T=uP[1].w;
  vec2 g0; float hC=swell(C,g0);
  // swell's horizontal orbital motion at the pan: it differs between neighbours, which is what makes them jostle
  vec2 orb=vec2(0.);
  { float a0=dot(uP[5].xy,C)-uP[8].x, a1=dot(uP[6].xy,C)-uP[8].y, a2=dot(uP[7].xy,C)-uP[8].z;
    orb=normalize(uP[5].xy)*uP[5].z*cos(a0)+normalize(uP[6].xy)*uP[6].z*cos(a1)+normalize(uP[7].xy)*uP[7].z*cos(a2); }
  // each pan also wanders a little on its own (slow Lissajous), so neighbours grind against each other
  vec2 wander=vec2(sin(T*.11+S*51.)+.5*sin(T*.043+S*17.),sin(T*.09+S*29.)+.5*sin(T*.052+S*77.))*(.12+.05*r);
  float kdC=mix(uP[2].w,1.,smoothstep(6.,130.,length(C-uP[0].xz)));
  vec2 cen=C+(orb+wander)*kdC;
  hC+=.02*sin(T*(.7+S*.6)+S*93.);
  float yaw=.014*sin(T*.13+S*40.)+.012*sin(T*.31+S*9.)+.05*dot(orb,uP[5].xy/length(uP[5].xy))/max(r,.5);
  float ca=cos(yaw), sa=sin(yaw);
  vec4 o=textureLod(uOut,vec2(aM.y,(aRow.x+.5)/uP[9].w),0.);
  float th=aM.y*6.2831853, pl=aRow.y, plate=step(.9,pl);
  float Rl=r*1.28*o.x, contact=o.y;
  vec4 nk=textureLod(uN,vec2(aM.y,S*37.),2.), nj=textureLod(uN,vec2(aM.y,S*37.+.25),3.);
  float Rr=Rl+((nj.x-.5)*min(.5,r*.13)+(nk.x-.5)*min(.2,r*.075))*(1.-.75*plate)+(textureLod(uN,vec2(aM.y,S*37.+.5),0.).y-.5)*min(.08,r*.04)*(1.+plate);
  float rho=aM.x;
  float fb=(.035+.006*min(r,6.)*(.6+S)+.025*nk.y)*(1.+.6*plate);     // cycle 2: almost no freeboard, a thin edge, not a cake's wall
  float nr=textureLod(uN,vec2(aM.y,S*37.+.7),4.5).z;
  float rim=(.022+.007*min(r,6.)+.13*contact*min(1.,r*.45))*(.08+1.9*nj.z*nk.z+.25*nk.z)*(.6+.8*S*fract(S*97.))*smoothstep(.16,.62,nr+.35*contact)*(1.-plate)*(.3+.9*o.b)*(.12+.88*smoothstep(.4,.68,nj.z*.55+nk.z*.45+.25*contact));     // heaped on the knocked sides, low or gone elsewhere

  // brash: past the skirt a ring of floating lumps at the waterline, widest where the pan presses its neighbours
  float bw=(.35+.3*min(r,6.))*(.35+.9*contact)*uM.y;
  float rad=rho<1.061?Rr*rho:Rr*1.06+bw*(rho-1.062)/.438;
  vec2 lq=vec2(cos(th),sin(th))*rad;
  vec2 wq=vec2(ca*lq.x-sa*lq.y,sa*lq.x+ca*lq.y);
  float y=rho>1.061?.012+.03*fract(S*71.):pr(rho,fb,rim,pl,Rr);
  // a plate's seam: a ridge of tumbled blocks, or the lip of a plate riding up over its neighbour
  float dE=max(1.-rho,0.)*Rr, ridge=0.;
  if(plate>.5&&rho<1.&&uFast<.5){
    float nb=max(6.,floor(Rr*6.2831853/.85));
    float bq=textureLod(uN,vec2((floor(aM.y*nb)+.5)/256.,(floor(dE*1.7)+.5)/256.+fract(S*37.)),0.).x;
    ridge=o.b*(.22+.12*min(r,5.))*smoothstep(0.,.35,dE)*(1.-smoothstep(.9,2.4,dE))*(.2+.8*bq*bq);
    y+=ridge+max(o.a*2.-1.,0.)*.2*smoothstep(.35,.97,rho);
  }
  vK=vec4(pl,(smoothstep(.03,.12,ridge)+step(.53,o.a)*smoothstep(.5,.9,rho))*(1.-uFast),o.a*2.-1.,dE);
  // pans never sit quite flat: a small tilt of its own, and the swell's
  vec2 tilt=g0+(vec2(fract(S*13.),fract(S*29.))-.5)*.018;
  vec3 P=vec3(cen.x+wq.x,hC+y+dot(wq,tilt),cen.y+wq.y);
  vP=P; vQ=lq; vI=vec4(rho,Rr,fb,rim); vJ=vec4(tilt,S,contact);
  vec3 v=P-uP[0].xyz;
  float cz=dot(v,uP[3].xyz), cx=dot(v,uP[1].xyz), cy=dot(v,uP[2].xyz);
  gl_Position=vec4(cx/uP[0].w,cy/uP[0].w,cz*uP[12].x+uP[12].y,cz);
}`,$o=G+Te+`uniform sampler2D uT,uN; uniform samplerCube uSky; uniform float uFast; uniform vec4 uM;
in vec3 vP; in vec2 vQ; in vec4 vI; in vec4 vJ; in vec4 vK; out vec4 o;
float pr(float rho,float fb,float rim,float pl,float R){
  if(rho>=1.) return mix(.02,-.07,clamp((rho-1.)/.06,0.,1.));
  float b=smoothstep(.84,.945,rho)*(1.-smoothstep(.945,1.,rho));
  float pan=mix(fb+rim*b,.02,smoothstep(.955,1.,rho));
  float e=clamp((1.-rho)*R/.22,0.,1.);
  return pl>.9?.02+(fb-.02)*(1.-(1.-e)*(1.-e)):pan;
}
void main(){
  vec3 ro=uP[0].xyz, rd=normalize(vP-ro);
  float rho=vI.x, R=max(vI.y,.05), fb=vI.z, rim=vI.w, S=vJ.z;
  float dist=length(vP-ro);
  // brash: lumps and slush afloat round the pan, thinning outward; the gaps show the water drawn behind
  if(rho>1.061){
    float u=(rho-1.062)/.438;
    float n=.62*textureLod(uN,vP.xz*2.3/256.,0.).x+.38*textureLod(uN,vP.xz*6.1/256.+.5,0.).y;
    float keep=n-(.36+.58*u-.22*vJ.w)/(uM.y>1.3?1.3:1.);
    // drawn after the water, blended (no discard: the pans' own pass keeps its early depth test); between the lumps a thin
    // grey porridge of crushed ice that thins outward and dulls the water
    float lump=smoothstep(0.,.1,keep), sl=(1.-u)*(1.-u)*.55*smoothstep(-.3,0.,keep);
    vec3 alb=mix(vec3(.2,.23,.25),vec3(.8,.81,.84)*(.85+.3*n),lump);
    vec3 c=alb*(uP[9].rgb*max(uP[4].y,0.)*(.6+.8*lump)+mix(uP[10].rgb,uP[11].rgb,.3)*(.75+.35*lump));
    float hz=1.-exp(-dist*uP[10].w/2600.);
    c=mix(c,textureLod(uSky,normalize(vec3(rd.x,.02,rd.z)),0.).rgb*.9,hz);
    float al=max(lump,sl); o=vec4(c*al,al); return;
  }
  // below the waterline, the skirt fades into the water (submerged ice paling the water at the pan's edge)
  if(rho>1.){
    float w=smoothstep(1.,1.06,rho);
    vec3 refl=textureLod(uSky,vec3(rd.x,abs(rd.y)+.03,rd.z),0.).rgb;
    float fres=.03+.97*pow(max(1.-max(-rd.y,0.),0.),5.);
    vec3 wat=mix(vec3(.008,.018,.022),refl*.6,fres);
    vec3 sub=wat+(1.-fres)*vec3(.016,.034,.036)*(1.-w);
    o=vec4(sub,1.); return;
  }
  vec3 L=uP[4].xyz; vec3 sunC=uP[9].rgb, top=uP[10].rgb, sunS=uP[11].rgb;
  vec2 sH=normalize(L.xz); float tanEl=L.y/length(L.xz);
  vec2 bump=vec2(0.); float speck=.5, tH=.5, patchV=.5, mott=.5;
  vec2 tuv=vQ/3.+vec2(S*57.,S*91.);
  float rimness=smoothstep(.8,.92,rho);
  vec4 T=vec4(.5);
  float near=uFast<.5?1.:0.;
  if(near>.5){
    T=mix(texture(uT,tuv),texture(uT,mat2(.6,-.8,.8,.6)*vQ/7.3+S*3.),.45); bump=(T.xy-.5)*(.9+1.3*rimness)*(1.+.8*vJ.w)*(1.-smoothstep(.95,.995,rho));
    vec4 T2=texture(uT,vQ/9.+vec2(S*23.,S*44.)); bump+=(T2.xy-.5)*1.1; patchV=T2.z*.55+texture(uT,mat2(.8,.6,-.6,.8)*vQ/23.+S*5.).z*.45;
    vec4 T3=texture(uT,vQ/1.1+vec2(S*7.,S*13.)); bump+=(T3.xy-.5)*.55*(1.-rimness*.4); mott=T3.z;
    speck=T.w; tH=T.z;
  } else { speck=fract(S*97.); tH=.5+.4*sin(S*30.); }
  float rhoS=clamp(rho+(T.z-.5)*.045+(mott-.5)*.03,0.,.9999);
  float e=.0075;
  float pl=vK.x, hh=pr(rhoS,fb,rim,pl,R), d=(pr(min(rhoS+e,.9999),fb,rim,pl,R)-pr(max(rhoS-e,0.),fb,rim,pl,R))/(2.*e*R);
  vec2 qd=vQ/max(length(vQ),1e-3);
  vec2 grad=qd*d;
  vec3 nL=normalize(vec3(-grad.x-bump.x,1.,-grad.y-bump.y));
  vec3 N=normalize(vec3(nL.x-vJ.x,nL.y,nL.z-vJ.y));
  // tumbled blocks and a rafted lip are slabs: their faces come from the surface itself
  vec3 cr=cross(dFdx(vP),dFdy(vP)); if(vK.y>.01&&dot(cr,cr)>1e-14){ vec3 Nf=normalize(cr); if(Nf.y<0.) Nf=-Nf; N=normalize(mix(N,normalize(Nf+vec3(bump.x,0.,bump.y)*.3),clamp(vK.y,0.,1.))); }
  // the rim's shadow on the dish: walk a few steps toward the sun and compare the profile
  float vis=1.;
  if(near>.5){
    float blk=0.;
    float s=.25;
    for(int i=0;i<4;i++){
      vec2 qs=vQ+sH*s;
      float r2=length(qs)/R;
      float h2=r2>=1.?-.5:pr(r2,fb,rim,pl,R);
      blk=max(blk,h2-hh-s*tanEl);
      s*=2.1;
    }
    vis=1.-smoothstep(0.,.08,blk);
  }
  // tops: wet grey-white snow in the dish, patchy with scoured blue ice; the rubbed rim is rough and the crest brightest
  float big=T.z*.6+.4*tH;
  float rimF=clamp(rim/.07,0.,1.);
  float snow=uM.x*(.42+.75*big)+.22*S-.08-.38*(1.-patchV*1.15)+.16*(mott-.5)+(fract(S*53.)-.55)*.5;
  float snowMask=smoothstep(.16,.46,snow+.25*rimness*(T.z-.5));
  vec3 ice=mix(vec3(.26,.38,.46),vec3(.46,.57,.63),T.z);
  vec3 dish=mix(vec3(.5,.51,.55),vec3(.86,.87,.89),big*.55+patchV*.45)*(.74+.45*mott+.16*T.w);
  vec3 crest=vec3(.9,.91,.95)*(.92+.14*speck);
  vec3 albedo=mix(ice,mix(dish,crest,smoothstep(.87,.945,rho)*rimF),snowMask);
  // crushed lumps along the rim where it has ground against a neighbour
  float lump=smoothstep(.6,.9,T.w+.35*(vJ.w-.2))*rimness*(1.-smoothstep(.95,.99,rho))*rimF;
  albedo=mix(albedo,vec3(.9,.91,.94),lump*.45);
  // broken faces: the side of a plate or a block shows the ice's own blue-green
  albedo=mix(albedo,vec3(.55,.72,.78)*(.8+.4*T.z),smoothstep(.55,.15,N.y)*.6*step(.9,pl));
  // a water-stained line where the wall meets the sea
  float wl=smoothstep(.962,1.,rho);
  albedo=mix(albedo,vec3(.2,.23,.24)*(.8+.5*T.z),wl*.75);     // the dark wet band at the waterline
  float ndl=max(dot(N,L),0.);
  float vy=clamp(rho<.96?1.:.8,0.,1.);
  vec3 amb=mix(top*(.48+.52*N.y),sunS,pow(clamp(dot(N.xz,sH)*.5+.5,0.,1.),2.)*.55);
  // underside rim AO: dark in the crease at the foot of the rim
  float ao=1.-.14*smoothstep(.45,.9,rho)*(1.-smoothstep(.9,.96,rho));
  // a neighbour's rafted lip lies over this edge: its shadow, blue
  float under=max(-vK.z,0.)*(1.-smoothstep(.2,1.1,vK.w));
  vec3 c=albedo*(sunC*ndl*vis*1.1*(1.-under)+amb*ao*(1.-.45*under));
  // wet crust catching the sun
  vec3 hv=normalize(L-rd); float nh=max(dot(N,hv),0.);
  c+=sunC*pow(nh,40.)*vis*(.1+.25*speck)*snowMask;
  c+=sunC*pow(nh,300.)*vis*.8*(1.-snowMask);
  // haze
  float hz=1.-exp(-dist*uP[10].w/2600.);
  vec3 hzC=textureLod(uSky,normalize(vec3(rd.x,.02,rd.z)),0.).rgb*.9;
  c=mix(c,hzC,hz);
  o=vec4(c,1.);
}`,ea=G+qe+Te+`uniform samplerCube uSky; uniform sampler2D uF,uT; uniform vec4 uA[3]; out vec4 o;
float at2(float y,float x){ float a=atan(y/(abs(x)+1e-6)); return x<0.?(y>=0.?3.14159265-a:-3.14159265-a):a; }
void main(){
  vec2 q=gl_FragCoord.xy/vec2(uP[3].w)*2.-1.;
  vec3 ro=uP[0].xyz, rd=camRay(q);
  vec3 L=uP[4].xyz;
  if(rd.y>=0.){
    vec3 c=texture(uSky,rd).rgb;
    vec3 Xs=normalize(vec3(L.z,0.,-L.x)), Ys=cross(L,Xs);
    float dx=dot(rd,Xs), dy=dot(rd,Ys), pa=2.4*uP[0].w/uP[3].w;
    float a=length(vec2(dx,dy*1.2)), fw=step(0.,dot(rd,L)), lowS=smoothstep(.2,.06,L.y);
    c+=uP[9].rgb*uP[8].w*fw*(smoothstep(.0047+pa,.0047-pa,a)*30.+exp(-dx*dx*2200.-dy*dy*mix(2200.,16000.,lowS))*1.8+exp(-dx*dx*90.-dy*dy*mix(90.,1100.,lowS))*.25*lowS);
    c+=uP[9].rgb*uA[1].y*.6*exp(-dx*dx*9000.)*smoothstep(-.004,.012,dy)*exp(-max(dy,0.)*24.)*fw;
    o=vec4(c,1.); return;
  }
  float sw0=0.; vec2 gs; float t=-ro.y/rd.y;
  vec3 p=ro+rd*t; sw0=swell(p.xz,gs); t=(sw0-ro.y)/rd.y; p=ro+rd*t;
  float r=length(p.xz-ro.xz);
  // ripples: normal from a tiled gradient, fading with range so far water is a mirror of the sky
  float fade=clamp(1.-r/140.,0.,1.); fade*=fade;
  vec2 wo=vec2(uP[1].w*.04,uP[1].w*.027);
  vec4 t0=texture(uT,p.xz*.09+wo), t1=texture(uT,p.xz*.31-wo*1.7);
  vec2 rp=(t0.xy+t1.xy-1.)*(.12+.22*fade)*(1.-.7*uA[1].w);
  vec3 N=normalize(vec3(-gs.x-rp.x,1.,-gs.y-rp.y));
  vec3 R=reflect(rd,N); R.y=abs(R.y)+.001;
  float cosT=max(dot(-rd,N),0.);
  float F=.02+.98*pow(max(1.-cosT,0.),5.);
  vec3 sk=textureLod(uSky,R,0.).rgb*(1.-.6*uA[1].w);
     // gone out: open water is dark steel, the sky's colour only a sheen on it
  vec3 deep=vec3(.006,.016,.02)+vec3(.012,.026,.028)*exp(-r/40.);
  vec3 c=mix(deep,sk*(.45+.55*smoothstep(30.,200.,r)),F);

  // sun track on the water
  float ml=pow(max(dot(R,L),0.),500.); c+=uP[9].rgb*ml*2.4*fade;
  // grey new ice skinning the leads: matte, a dull sheen of the sky, no ripples
  if(uA[1].x>0.){ float nn=t0.z*.6+t1.z*.4; vec3 grey=vec3(.05,.055,.065)+mix(uP[10].rgb,uP[11].rgb,.45)*(.12+.1*nn); c=mix(c,grey+sk*F*.14,.85); }
  // slush and brash among the near pans
  if(r<190.){ float sl=smoothstep(.56,.8,t1.z+.5*t0.w-.2+.35*(1.-r/190.)-.12*sin(r*.1)); vec3 slC=mix(uP[11].rgb*.3,vec3(.2,.22,.23),.5+.4*t0.z); c=mix(c,slC,sl*.8*smoothstep(10.,40.,r)*.5*(1.-uA[1].w)); }
  // the far ice in log-polar coordinates: anisotropic in distance (several taps), mips across
  float rsafe=max(r,1.);
  float az=at2(p.x,p.z);
  float lr=log(max(rsafe,uA[0].x*.6));
  vec2 uv=vec2(az/6.2831853+.5,(lr-uA[0].y)/(uA[0].z-uA[0].y));
  float fp=rsafe*rsafe/max(ro.y,.1)*uP[0].w/uA[0].w;
  float dv=fp/rsafe/(uA[0].z-uA[0].y)*.5;
  vec4 m=vec4(0.);
  for(int i=-1;i<=1;i++){ m+=textureLod(uF,uv+vec2(0.,float(i)*dv),clamp(log2(max(1.,rsafe/uA[0].x))*.9,0.,4.5)); }
  m/=3.;
  float fadeIn=smoothstep(uA[0].x*.8,uA[0].x*1.3,rsafe);
  float cov=clamp(m.r*1.25,0.,1.)*fadeIn;
  if(cov>.0){
    vec3 hv=normalize(L-rd);
    vec3 fN=normalize(vec3(-gs.x*3.,1.,-gs.y*3.));
    float ndl=max(dot(fN,L),0.);
    float hAmb=.62+.3*(m.g-.5);

    vec3 alb=vec3(.9,.91,.95);
    vec3 ice=alb*(uP[9].rgb*ndl*1.05+mix(uP[10].rgb,uP[11].rgb,.42)*hAmb);
    ice=mix(ice,ice*vec3(.72,.76,.9),m.b*.7);
    c=mix(c,ice,cov);
  }
  // distance haze to the horizon
  float hz=1.-exp(-r*uP[10].w/3400.);
  vec3 hzC=textureLod(uSky,normalize(vec3(rd.x,.012,rd.z)),0.).rgb*.92;
  c=mix(c,hzC,hz);
  o=vec4(c,1.);
}`,ta=G+Te+`layout(location=0) in vec2 aQ; layout(location=1) in vec4 aI;
out vec2 vUv; out float vZ; out vec3 vW; out float vA;
void main(){
  float T=uP[1].w; float life=fract(aI.z*7.+T*(.018+.015*fract(aI.z*19.)));
  vec2 g; float h=swell(aI.xy,g);
  // n13: a leaning wisp, foot on the water, all leaning one way with the air; it lifts a little and thins as it goes
  float s=aI.w*.75, hh=s*(.75+.8*life), hw=s*(.5+.4*life);
  vec3 wd=vec3(-.62,0.,.16);
  vec3 c=vec3(aI.x,h+.05,aI.y)+(vec3(0.,1.,0.)+wd*.5)*life*s*.9*uP[12].w;
  vec3 toE=normalize(uP[0].xyz-c);
  vec3 side=normalize(cross(vec3(0.,1.,0.),toE));
  float k=aQ.y*.5+.5;
  vec3 v=c+side*aQ.x*hw+vec3(0.,1.,0.)*k*2.*hh+wd*k*k*hh*1.7-uP[0].xyz;
  float cz=dot(v,uP[3].xyz), cx=dot(v,uP[1].xyz), cy=dot(v,uP[2].xyz);
  gl_Position=vec4(cx/uP[0].w,cy/uP[0].w,cz*uP[12].x+uP[12].y,cz);
  float de=length(c-uP[0].xyz);
  vUv=aQ*.5+.5; vZ=aI.z; vW=c; vA=smoothstep(0.,.25,life)*(1.-smoothstep(.5,1.,life))/(1.+de/60.)*exp(-de*uP[10].w/2600.);
}`,oa=G+Te+`uniform sampler2D uN; in vec2 vUv; in float vZ; in vec3 vW; in float vA; out vec4 o;
void main(){
  float T=uP[1].w, y=vUv.y;
  // two or three fibres run up the wisp, twisting a little, with gaps between; they drift up through it
  vec2 q=vec2((vUv.x-.5)*2.6+.45*sin(y*4.5+vZ*23.+T*.3),y*1.5)+vec2(vZ*91.,vZ*57.-T*.2);
  vec2 i1=floor(q), f1=fract(q); f1=f1*f1*(3.-2.*f1);
  vec2 q2=q*vec2(2.3,1.9)+3.7, i2=floor(q2), f2=fract(q2); f2=f2*f2*(3.-2.*f2);
  float n=.6*textureLod(uN,(i1+f1+.5)/256.,0.).x+.4*textureLod(uN,(i2+f2+.5)/256.,0.).y;
  float wE=.22+.3*y;
  float m=(1.-smoothstep(wE*.2,wE,abs(vUv.x-.5)))*smoothstep(0.,.14,y)*(1.-smoothstep(.4,.95,y+(n-.5)*.6));
  float a=min(smoothstep(.42,.7,n)*m*vA*1.7*uP[12].z,.3);
  vec3 L=uP[4].xyz, rd=normalize(vW-uP[0].xyz);
  a*=smoothstep(.7,.3,-rd.y);
  // away from the sun a cool grey under the snow; toward it a warm glow on the thin edges only
  float fs=pow(max(dot(rd,L),0.),12.)*(1.-.6*smoothstep(.45,.8,n));
  vec3 ref=(uP[11].rgb+uP[9].rgb*max(L.y,.05)*.9)*.85;
  vec3 c=min(mix(uP[10].rgb,uP[11].rgb,.5)*.85+uP[9].rgb*.3*fs,ref);
  o=vec4(c*a,a);
}`,aa=G+qe+`uniform sampler2D uC; uniform vec4 uU; out vec4 o;
vec3 tone(vec3 c){ c=max(c*uU.w,0.); c=c*(2.51*c+.03)/(c*(2.43*c+.59)+.14); return pow(clamp(c,0.,1.),vec3(.4545)); }
float lm(vec3 c){ return dot(c,vec3(.3,.59,.11)); }
void main(){
  ivec2 p=ivec2(gl_FragCoord.xy); int m=int(uU.x)-1;
  vec3 c0=texelFetch(uC,p,0).rgb;
  vec3 a=tone(c0), n=tone(texelFetch(uC,clamp(p+ivec2(0,1),ivec2(0),ivec2(m)),0).rgb), s=tone(texelFetch(uC,clamp(p-ivec2(0,1),ivec2(0),ivec2(m)),0).rgb);
  vec3 e=tone(texelFetch(uC,clamp(p+ivec2(1,0),ivec2(0),ivec2(m)),0).rgb), w=tone(texelFetch(uC,clamp(p-ivec2(1,0),ivec2(0),ivec2(m)),0).rgb);
  float lc=lm(a), ln=lm(n), ls=lm(s), le=lm(e), lw=lm(w);
  float mx=max(lc,max(max(ln,ls),max(le,lw))), mn=min(lc,min(min(ln,ls),min(le,lw)));
  vec3 c=a;
  if(mx-mn>.06){
    float h=abs(ln+ls-2.*lc), v=abs(le+lw-2.*lc);
    vec3 b=h>v?(n+s)*.5:(e+w)*.5;
    c=mix(a,b,clamp((mx-mn)*2.2,0.,.62));
  }
  vec2 uv=gl_FragCoord.xy/uU.x;
  c*=1.-.07*smoothstep(.45,1.1,length(uv-.5)*1.25);
  float g=texture(uN,uv*vec2(uU.x)/256.+vec2(.31,.57)).x-.5;
  c+=g*.008;
  if(uU.z>0.){
    float fl=0.;
    for(int k=0;k<3;k++){
      float fk=float(k), cs=(26.-7.*fk)*uU.x/1000., sp=(1.-.28*fk)*uU.x/1000.;
      vec2 q=gl_FragCoord.xy+vec2(uU.y*(9.+5.*fk)*sp+sin(uU.y*.31+fk*2.)*14.*sp, uU.y*(70.-14.*fk)*sp)+fk*vec2(83.,41.);
      vec2 g0=floor(q/cs); vec4 h=texelFetch(uN,ivec2(mod(g0+vec2(fk*61.,fk*17.),256.)),0);
      float rr=(2.6-.7*fk)*uU.x/1000.*(.6+.6*h.w);
      vec2 dq=mat2(.94,-.34,.34,.94)*(q-(g0+.15+.7*h.xy)*cs);     // a flake is a soft slanted streak, not a dot
      float d=length(dq*vec2(1.,.3+.25*h.w));
      fl=max(fl,smoothstep(rr,0.,d)*step(h.z,.55)*(.8-.2*fk));

    }
    c=mix(c,vec3(.86,.87,.9),fl*uU.z);
  }
  o=vec4(c,1.);
}`,ie=(t,n)=>{const i=e.createProgram();for(const[f,m]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,n]]){const b=e.createShader(f);e.shaderSource(b,m),e.compileShader(b),e.attachShader(i,b),i["s"+f]=b}return e.linkProgram(i),i._v=t,i._f=n,i};if(r.prog||(r.prog={},r.prog.sky=ie(_e,Yo),r.prog.far=ie(_e,Ko),r.prog.land=ie(_e,Wo),r.prog.tree=ie(jo,Qo),r.prog.rock=ie(_e,Zo),r.prog.pan=ie(Jo,$o),r.prog.wat=ie(_e,ea),r.prog.vap=ie(ta,oa),r.prog.out=ie(_e,aa),e.flush()),!r.nd){let t=2654435769;const n=()=>(t=Math.imul(t^t>>>15,739982445),t=Math.imul(t^t>>>12,695872825),t^=t>>>15,t&255),i=new Uint8Array(256*256*4);for(let m=0;m<i.length;m++)i[m]=n();r.nd=i;const f=e.createTexture();e.bindTexture(e.TEXTURE_2D,f),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,i),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),r.nt=f}const Wt=r.nd,R=64,Ae=r.pc||(r.pc=[]),jt=X.hash+(I?":h":"");let j=Ae.find(t=>t.k===jt)||null;j?(Ae.splice(Ae.indexOf(j),1),Ae.push(j),W=j.s0,Ee=j.sV,be=j.s2):(j=(()=>{const i=Math.ceil(26.153846153846153),f=4e3,m=new Int32Array(i*i).fill(-1),b=new Int32Array(f),w=new Float32Array(f),c=new Float32Array(f),d=new Float32Array(f);let v=0;const k=o=>Math.max(0,Math.min(i-1,Math.floor((o+300+40)/26))),U=o=>1+o/85;let D=18;const S=(o,a,u)=>{const p=k(o),l=k(a),x=v++;w[x]=o,c[x]=a,d[x]=u;const A=l*i+p;return b[x]=m[A],m[A]=x,x},P=(o,a,u)=>{const p=Math.hypot(o,a);if(p>300||v>=f)return!1;const l=u*U(p)*(.72+.56*s())*(u>2?Math.min(1,.42+p/95):1);if(a<le(o)+l*1.15+.3)return!1;const x=s(),A=k(o),g=k(a),B=Math.ceil((l+D)/26);for(let O=Math.max(0,g-B);O<=Math.min(i-1,g+B);O++)for(let Y=Math.max(0,A-B);Y<=Math.min(i-1,A+B);Y++)for(let H=m[O*i+Y];H>=0;H=b[H]){const ne=w[H]-o,T=c[H]-a,y=(l+d[H])*.96;if(ne*ne+T*T<y*y)return!1}return x>Je(o,a)?!1:(S(o,a,l),!0)};let L=-1;if(De==="One great pan"){const o=(ze()<.5?-1:1)*(.1+.2*ze()),a=46+22*ze(),u=19+9*ze(),p=Math.sin(o)*a,l=Math.cos(o)*a;l>le(p)+u*1.15+.3&&(L=S(p,l,u),D=u*1.3)}const re=(o,a,u)=>{for(let p=0;p<a;p++){let l,x=s()*V;if(s()<u){const A=s();l=8+A*A*95}else l=300*Math.sqrt(s());P(Math.sin(x)*l,Math.cos(x)*l,o)}};Lt!=="Pancakes"&&re(4.4*yt,900,.08),re(2.5*yt,3200,.2),re(1.2*Math.sqrt(yt),7e3,.5),re(.62,15e3,.78);const Q=new Float32Array(v),at=new Uint32Array(v);for(let o=0;o<v;o++)Q[o]=Math.hypot(w[o]-me,c[o]-Ie),at[o]=o;L>=0&&(Q[L]=Math.min(Q[L],20)),at.sort((o,a)=>Q[o]-Q[a]),v=Math.min(v,r.mt||(r.mt=e.getParameter(e.MAX_TEXTURE_SIZE)));const Ft=new Float64Array(R),kt=new Float64Array(R);for(let o=0;o<R;o++)Ft[o]=Math.cos(o/R*V),kt[o]=Math.sin(o/R*V);const ee=(o,a)=>{let u=Math.imul(o^1499525390,2246822507)^Math.imul(a+1663821227,3266489909);return u^=u>>>15,u=Math.imul(u,739982445),u^=u>>>12,u=Math.imul(u,695872825),u^=u>>>15,(u>>>0)/4294967296},de=Lt,_t=new Float32Array(v),bo=(de==="Pancakes"?1.7:he==="gone"?.4:de==="Mixed pans"?1.1:.85)*(z==="head"?.6:1);for(let o=0;o<v;o++){const a=ee(o,7),u=d[o],p=Math.hypot(w[o]-me,c[o]-Ie);_t[o]=de==="Pancakes"?u>2.2&&a<.3?.5:0:de==="Mixed pans"?p<34?a<.55?.5:0:u>1.6?a<.6?1:a<.85?.5:0:a<.3?1:a<.6?.5:0:u<1.1?a<.4?0:a<.7?.5:1:a<.85?1:.5}const wo=de==="Rafted and ridged"?.42:de==="Pancakes"?0:.2,La=de==="Rafted and ridged"?.4:de==="Pancakes"?0:.16,He=new Uint8Array(R*v*4),q=new Float64Array(R),Ve=new Float64Array(R),Le=new Float64Array(R),rt=new Float64Array(R),pe=new Float64Array(R),Re=new Float32Array(v*6);for(let o=0;o<v;o++){const a=at[o],u=w[a],p=c[a],l=d[a],x=l*1.28,A=1.25-Je(u,p),g=_t[a];q.fill(x),Ve.fill(0),rt.fill(0),pe.fill(0);const B=k(u),O=k(p),Y=Math.ceil((l*1.3+D)/26);for(let T=Math.max(0,O-Y);T<=Math.min(i-1,O+Y);T++)for(let y=Math.max(0,B-Y);y<=Math.min(i-1,B+Y);y++)for(let _=m[T*i+y];_>=0;_=b[_]){if(_===a)continue;const oe=w[_]-u,ve=c[_]-p,xe=oe*oe+ve*ve,C=d[_];if(xe>(x+C*1.28)*(x+C*1.28))continue;const se=Math.sqrt(xe),ye=oe/se,ct=ve/se;let ge=(xe+l*l-C*C)/(2*se)-(.04+.035*l)*A,Ro=0,go=0,zo=0;if(g>.9&&_t[_]>.9&&ge<se*.62){const K=ee(Math.min(a,_),Math.max(a,_)+99);if(K<wo){const lt=.3+.35*ee(_,a+5)+.05*Math.min(l,C);ee(Math.max(a,_),Math.min(a,_))<.5==a<_?(ge+=lt+(.04+.035*l)*A,Ro=1):go=1}else K<wo+La&&(zo=.45+.55*ee(a+_,3))}for(let K=0;K<R;K++){const lt=Ft[K]*ye+kt[K]*ct;if(lt<.05)continue;const Mt=ge/lt;if(Mt<q[K]){q[K]=Mt;const it=Math.min(1,1.15-(Mt-ge)/(l*.5));Ve[K]=Math.max(Ve[K],it),rt[K]=zo*Math.max(0,it),pe[K]=Ro?it:go?-it:0}}}const H=s()*V,ne=.05+.05*s();if(g<.9){for(let T=0;T<3;T++){for(let y=0;y<R;y++)Le[y]=.25*q[(y+R-1)%R]+.5*q[y]+.25*q[(y+1)%R];q.set(Le)}for(let T=0;T<R;T++)q[T]*=1+ne*Math.sin(T/R*V*3+H)+ne*.6*Math.sin(T/R*V*5+H*2.7)}if(g>.2){const T=g>.9?3+Math.floor(ee(a,11)*3):1+Math.floor(ee(a,11)*1.8);for(let y=0;y<T;y++){const _=(y+ee(a,20+y)*.8)/T*V+H,oe=l*(g>.9?.78+.4*ee(a,40+y):.7+.25*ee(a,40+y)),ve=Math.cos(_),xe=Math.sin(_);for(let C=0;C<R;C++){const se=Ft[C]*ve+kt[C]*xe;if(se<.05)continue;const ye=oe/se;ye<q[C]&&(q[C]=ye,Ve[C]*=.3,pe[C]=0,rt[C]=0)}}if(g>.9){for(let y=0;y<R;y++)Le[y]=.1*q[(y+R-1)%R]+.8*q[y]+.1*q[(y+1)%R];q.set(Le)}}for(let T=0;T<2;T++){for(let y=0;y<R;y++)Le[y]=.25*pe[(y+R-1)%R]+.5*pe[y]+.25*pe[(y+1)%R];pe.set(Le)}for(let T=0;T<R;T++){const y=Math.max(l*.45,q[T])/x,_=(o*R+T)*4,oe=g>.9?rt[T]:(.35+.65*ee(a*64+(T>>2),9))*(g>.2?.7:1);He[_]=Math.min(255,y*255),He[_+1]=Math.min(255,Ve[T]*255),He[_+2]=Math.min(255,oe*255),He[_+3]=127.5+127*pe[T]}Re[o*6]=u,Re[o*6+1]=p,Re[o*6+2]=l,Re[o*6+3]=s(),Re[o*6+4]=o,Re[o*6+5]=g}const nt=Fo!=="Thin",st=nt?110:46,Na=st+(nt?260:0),te=new Float32Array(Na*4);let Z=0;const Da=(o,a)=>{const u=k(o),p=k(a),l=Math.ceil((D*1.06+2)/26);for(let x=Math.max(0,p-l);x<=Math.min(i-1,p+l);x++)for(let A=Math.max(0,u-l);A<=Math.min(i-1,u+l);A++)for(let g=m[x*i+A];g>=0;g=b[g]){const B=w[g]-o,O=c[g]-a,Y=d[g]*1.06+.5+.5*bo;if(B*B+O*O<Y*Y)return!0}return!1},To=(o,a,u,p)=>{if(u>=p||Da(o,a))return!1;for(let l=0;l<Z;l++){const x=te[l*4]-o,A=te[l*4+1]-a;if(x*x+A*A<25)return!1}return!0};for(let o=0,a=0;o<st&&a<st*40;a++){const u=18+240*s()*s(),p=s()*V,l=Math.sin(p)*u,x=Math.cos(p)*u;if(x<le(l)+6||Je(l,x)>.7)continue;const A=s(),g=(.8+1.1*s())*(1+u/400);o++,To(l,x,a,st*6)&&(te[Z*4]=l,te[Z*4+1]=x,te[Z*4+2]=A,te[Z*4+3]=g,Z++)}for(let o=0;nt&&o<260*6;o++){const a=o<780?30+170*N()*N():10+50*N(),u=(N()-.5)*2.4+qt*J,p=me+Math.sin(u)*a,l=Ie+Math.cos(u)*a,x=N(),A=(.6+.8*N())*(1+a/400);l<le(p)+3||Je(p,l)>.62||!To(p,l,0,1)||(te[Z*4]=p,te[Z*4+1]=l,te[Z*4+2]=x,te[Z*4+3]=A,Z++)}const Ba=(o,a)=>{const u=le(o)-a,p=(l,x,A)=>{const g=Math.max(0,Math.min(1,(A-l)/(x-l)));return g*g*(3-2*g)};return-1.6+2.7*p(-5,1.2,u)+1.7*p(1,11,u)+1.4*p(8,26,u)+4.5*p(18,70,u)},St=[],Ao=(o,a,u,p,l,x,A,g,B)=>{const O=Math.max(2,Math.round(A/(B>=2?.9:.42))),Y=.02+.018*s();let H=o,ne=a,T=u,y=g;for(let _=0;_<O;_++){const oe=(_+1)/O,ve=H+p*A/O,xe=ne+l*A/O,C=T+x*A/O,se=g*(1-oe*.72);St.push(H,ne,T,y,ve,xe,C,se),H=ve,ne=xe,T=C,y=se,p+=Y*(.5+s()),x+=(s()-.5)*.07,l+=B<2?-.045:-.004;const ye=Math.hypot(p,l,x);if(p/=ye,l/=ye,x/=ye,B>0&&oe>.18&&St.length<52e3&&s()<(B>=3?.68:.88)){const ct=s()*V,ge=.7+.6*s();Ao(H,ne,T,p*.55+Math.cos(ct)*ge,l*.6+.18+.4*s(),x*.55+Math.sin(ct)*ge,A*(.34+.3*s())*(1-oe*.35),y*.55,B-1)}}};for(let o=0,a=0;o<11&&a<60;a++){const u=-105+210*s(),p=-(33+40*s())-u*u*.0018;if(!(p>le(u)-9)){o++;for(let l=0,x=1+Math.floor(s()*3.2);l<x;l++){const A=u+(s()-.5)*5,g=p+(s()-.5)*5,B=Ba(A,g)-.2;Ao(A,B,g,.05+.06*s(),1,-.03*s(),8+6*s(),.13+.09*s(),3+(s()<.55?1:0))}}}const Ca=new Float32Array(St);return{k:jt,np:v,gi:L,dist:Q,ord:at,oTex:He,INST:Re,brashK:bo,smoke:nt,vdat:te,vn:Z,segData:Ca}})(),j.s0=W,j.sV=Ee,j.s2=be,Ae.push(j),Ae.length>2&&Ae.shift());const{np:Se,gi:ra,dist:na,ord:sa,oTex:ca,INST:Qt,brashK:la,smoke:Zt,vdat:ia,vn:Jt,segData:$t}=j;if(!r.u){r.empty=e.createVertexArray();const t=256,n=new Float32Array(t*t),i=(c,d,v)=>{const k=c&255,U=d&255;return r.nd[(U<<8|k)*4+v]/255},f=(c,d,v,k)=>{const U=Math.floor(c),D=Math.floor(d);let S=c-U,P=d-D;S=S*S*(3-2*S),P=P*P*(3-2*P);const L=(re,Q)=>i((re%v+v)%v+k*37,(Q%v+v)%v+k*53,k);return L(U,D)*(1-S)*(1-P)+L(U+1,D)*S*(1-P)+L(U,D+1)*(1-S)*P+L(U+1,D+1)*S*P};for(let c=0;c<t;c++)for(let d=0;d<t;d++){const v=d/t,k=c/t;let U=0,D=.5,S=4,P=0;for(let L=0;L<6;L++)U+=D*f(v*S,k*S,S,P),D*=.58,S*=2,P=(P+1)%4;n[c*t+d]=U}const m=new Uint8Array(t*t*4);for(let c=0;c<t;c++)for(let d=0;d<t;d++){const v=n[c*t+d],k=n[c*t+(d+1)%t],U=n[(c+1)%t*t+d],D=(v-k)*2.2,S=(v-U)*2.2,P=(c*t+d)*4;m[P]=127.5+Math.max(-1,Math.min(1,D))*127,m[P+1]=127.5+Math.max(-1,Math.min(1,S))*127,m[P+2]=Math.min(255,v*255),m[P+3]=Math.pow(Wt[((c&255)<<8|d&255)*4+1]/255,2.2)*255}r.tt=e.createTexture(),e.bindTexture(e.TEXTURE_2D,r.tt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,t,0,e.RGBA,e.UNSIGNED_BYTE,m),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const b=(c,d)=>{const v=[],k=[];for(let P=0;P<=c;P++)for(const L of d)v.push(L,P/c);const U=d.length;for(let P=0;P<c;P++)for(let L=0;L<U-1;L++){const re=P*U+L,Q=(P+1)*U+L;k.push(re,Q,re+1,re+1,Q,Q+1)}const D=e.createBuffer(),S=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,D),e.bufferData(e.ARRAY_BUFFER,new Float32Array(v),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,S),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(k),e.STATIC_DRAW),{vb:D,ib:S,n:k.length}};r.mesh=[b(96,[0,.4,.66,.8,.88,.925,.955,.975,.99,1,1.03,1.06]),b(40,[0,.6,.84,.93,.98,1,1.06]),b(14,[0,.7,.96,1,1.06]),b(96,[1.062,1.25,1.5])],r.quad=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.quad),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),r.seg=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,r.seg),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,0,1,0,-1,1,1,1]),e.STATIC_DRAW);for(const c in r.prog){const d=r.prog[c];Be&&!e.getProgramParameter(d,e.LINK_STATUS)&&console.error("596 "+c+": "+e.getProgramInfoLog(d)+" "+e.getShaderInfoLog(d["s"+e.FRAGMENT_SHADER])+" "+e.getShaderInfoLog(d["s"+e.VERTEX_SHADER]))}const w=(c,...d)=>{const v={};for(const k of d)v[k]=e.getUniformLocation(c,k);return v};r.u={sky:w(r.prog.sky,"uN","uFX","uFY","uFZ","uRes","uS"),far:w(r.prog.far,"uN","uRes","uS"),land:w(r.prog.land,"uN","uP","uSky","uL","uLo","uL2"),tree:w(r.prog.tree,"uP"),rock:w(r.prog.rock,"uB","uA"),pan:w(r.prog.pan,"uP","uOut","uN","uT","uSky","uFast","uM"),wat:w(r.prog.wat,"uP","uN","uSky","uF","uT","uA"),vap:w(r.prog.vap,"uP","uN"),out:w(r.prog.out,"uC","uN","uU")}}const ae=r.prog,E=r.u,Et=!!e.getExtension("EXT_color_buffer_float"),ue=Et||!!e.getExtension("EXT_color_buffer_half_float"),ua=ue?e.RGBA16F:e.RGBA8,fa=ue?e.HALF_FLOAT:e.UNSIGNED_BYTE,eo=Et?e.R11F_G11F_B10F:ue?e.RGBA16F:e.RGBA8,ha=Et?e.RGB:e.RGBA,ma=ue?e.HALF_FLOAT:e.UNSIGNED_BYTE,$e=(t,n,i,f,m,b,w)=>{const c=e.createTexture();return e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,i,t,n,0,f,m,b||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,w),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,w===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),c};e.pixelStorei(e.UNPACK_ALIGNMENT,1);const to=$e(R,Se,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,ca,e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const da=t=>{const n=Math.max(na[sa[t]],1),i=Qt[t*6+2]/n;return i>.05||t===0&&ra>=0?0:i>.007||n<60?1:2},oo=new Float32Array(Se*6),$=[0,0,0],ao=new Uint8Array(Se);for(let t=0;t<Se;t++)$[ao[t]=da(t)]++;const pa=[0,$[0],$[0]+$[1]];for(let t=0;t<Se;t++)oo.set(Qt.subarray(t*6,t*6+6),6*pa[ao[t]]++);const ro=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ro),e.bufferData(e.ARRAY_BUFFER,oo,e.STATIC_DRAW);const no=[[0,0,$[0]],[1,$[0],$[1]],[2,$[0]+$[1],$[2]],[3,0,$[0]]],va=no.map(([t,n])=>{const i=e.createVertexArray();e.bindVertexArray(i);const f=r.mesh[t];return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,f.ib),e.bindBuffer(e.ARRAY_BUFFER,f.vb),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,ro),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,24,n*24),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,24,n*24+16),e.vertexAttribDivisor(2,1),e.bindVertexArray(null),i}),so=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,so),e.bufferData(e.ARRAY_BUFFER,ia,e.STATIC_DRAW);const co=e.createVertexArray();e.bindVertexArray(co),e.bindBuffer(e.ARRAY_BUFFER,r.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,so),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,16,0),e.vertexAttribDivisor(1,1),e.bindVertexArray(null);const lo=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,lo),e.bufferData(e.ARRAY_BUFFER,$t,e.STATIC_DRAW);const io=e.createVertexArray();e.bindVertexArray(io),e.bindBuffer(e.ARRAY_BUFFER,r.seg),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,lo),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(2,1),e.bindVertexArray(null);const et=e.createFramebuffer(),M=(t,n,i)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(n,i)},bt=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0)},Me=F>400?512:256,Ue=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,Ue),e.texStorage2D(e.TEXTURE_CUBE_MAP,1,eo,Me,Me),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const uo=new Float32Array(24),xa=we([.085,.1,.2],[.11,.17,.29],[.08,.09,.19],[.33,.34,.37],[.045,.065,.14],[.06,.16,.4])||[.075,.12,.25],ya=we([.6,.4,.45],[.6,.5,.46],[.58,.37,.38],[.55,.55,.57],[.3,.31,.37],[.42,.5,.6])||[.56,.39,.45],Ea=we([1.5,.62,.5],[1.4,.96,.5],[1.6,.66,.36],[.62,.61,.62],[1.05,.5,.38],[.95,.9,.82])||[1.7,.82,.4],ba=we([.82,.5,.58],[.75,.58,.55],[.8,.45,.5],[.52,.52,.55],[.4,.36,.43],[.55,.62,.74])||[.86,.52,.56],wa=ce?0:Ke==="Clear horizon"?.3:Ke==="High mackerel"?.85:.45,Ta=Ke==="Clear horizon"?0:Ke==="High mackerel"?.012:.034+.012*s(),Aa=ce?0:Ta,Ra=ce?0:Dt==="Lost in haze"?Fe?.7:0:Dt==="Clear snow peaks"?2.4:Fe?1.5:1;uo.set([...je,0,...xa,Ra,...ya,It?1:0,...Ea,0,...ba,0,s()*80,s()*80,wa,Aa]);const ga=[[0,0,-1,0,-1,0,1,0,0],[0,0,1,0,-1,0,-1,0,0],[1,0,0,0,0,1,0,1,0],[1,0,0,0,0,-1,0,-1,0],[1,0,0,0,-1,0,0,0,1],[-1,0,0,0,-1,0,0,0,-1]];bt(),e.bindVertexArray(r.empty),e.useProgram(ae.sky),e.bindFramebuffer(e.FRAMEBUFFER,et),e.viewport(0,0,Me,Me),M(0,e.TEXTURE_2D,r.nt),e.uniform1i(E.sky.uN,0),e.uniform2f(E.sky.uRes,Me,Me),e.uniform4fv(E.sky.uS,uo);for(let t=0;t<6;t++){const n=ga[t];e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+t,Ue,0),e.uniform3f(E.sky.uFX,n[0],n[1],n[2]),e.uniform3f(E.sky.uFY,n[3],n[4],n[5]),e.uniform3f(E.sky.uFZ,n[6],n[7],n[8]),e.drawArrays(e.TRIANGLES,0,3),e.flush()}const Oe=F>400?2048:1024,wt=F>400?512:256,Tt=$e(Oe,wt,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR_MIPMAP_LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const fo=170,za=12e3,At=Math.log(fo),Rt=Math.log(za);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Tt,0),e.viewport(0,0,Oe,wt),e.useProgram(ae.far),e.bindVertexArray(r.empty),M(0,e.TEXTURE_2D,r.nt),e.uniform1i(E.far.uN,0),e.uniform2f(E.far.uRes,Oe,wt),e.uniform4fv(E.far.uS,new Float32Array([Ze,Ht,Vt,Yt,Kt,At,Rt,he==="gone"?1:0,Oe/16,(Rt-At)/(V/(Oe/16)),0,0])),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,Tt),e.generateMipmap(e.TEXTURE_2D),e.flush();const qa=F>400,ho=$e(F,F,eo,ha,ma,null,e.LINEAR),gt=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,gt),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,F,F);const mo=$e(F,F,ua,e.RGBA,fa,null,e.NEAREST);let zt=null,Pt=null;ue||(zt=e.createFramebuffer(),Pt=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,Pt),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,F,F));const Pa={yaw:0,pitch:0,x:0,y:0,z:0},Fa=qt*J,ka=Co*J,h=new Float32Array(52);let po="";const tt=.5,ot=1e3,vo=(ot+tt)/(ot-tt),xo=-2*ot*tt/(ot-tt),_a=()=>{const t=X.view||Pa,n=Fa+t.yaw,i=ka+t.pitch,f=Math.cos(i),m=Math.sin(i),b=Math.cos(n),w=Math.sin(n),c=[w*f,m,b*f],d=[b,0,-w],v=[c[1]*d[2]-c[2]*d[1],c[2]*d[0]-c[0]*d[2],c[0]*d[1]-c[1]*d[0]];return h[0]=me+t.x,h[1]=Bo+t.y,h[2]=Ie+t.z,h[3]=Ot,h[4]=d[0],h[5]=d[1],h[6]=d[2],h[8]=v[0],h[9]=v[1],h[10]=v[2],h[12]=c[0],h[13]=c[1],h[14]=c[2],h[15]=F,t.yaw+","+t.pitch+","+t.x+","+t.y+","+t.z};h[11]=Xo,h[35]=ce?0:1,h[16]=je[0],h[17]=je[1],h[18]=je[2],h[19]=1;for(let t=0;t<3;t++)for(let n=0;n<4;n++)h[20+t*4+n]=Qe[t][n];h[36]=mt[0],h[37]=mt[1],h[38]=mt[2],h[39]=F,h[40]=dt[0],h[41]=dt[1],h[42]=dt[2],h[43]=Io,h[44]=pt[0],h[45]=pt[1],h[46]=pt[2],h[48]=vo,h[49]=xo,h[50]=Zt?1.1:1,h[51]=Zt?1.3:1;const Sa=()=>{bt(),e.bindFramebuffer(e.FRAMEBUFFER,ue?et:zt),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,mo,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,ue?gt:Pt),e.viewport(0,0,F,F),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.useProgram(ae.land),e.bindVertexArray(r.empty),M(0,e.TEXTURE_2D,r.nt),e.uniform1i(E.land.uN,0),M(1,e.TEXTURE_CUBE_MAP,Ue),e.uniform1i(E.land.uSky,1),e.uniform4fv(E.land.uP,h),e.uniform4f(E.land.uL,Xt,ke[0],ke[1],ke[2]),e.uniform4f(E.land.uL2,me,Ie,z==="along"?2400:520,z==="along"?70:0),e.uniform4f(E.land.uLo,Gt[0],Gt[1],Vo,0),e.drawArrays(e.TRIANGLES,0,3),e.flush(),e.depthFunc(e.LESS),e.useProgram(ae.tree),e.bindVertexArray(io),e.uniform4fv(E.tree.uP,h),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,$t.length/8),e.disable(e.DEPTH_TEST),e.flush()},Ma=new Float32Array([fo,At,Rt,F*.5/Ot,he==="nilas"?1:0,It&&!ce?1:0,0,he==="gone"?1:0,0,0,0,0]),Ua=Fe?.95:ce?.85:We?.78:.72,yo=X.sound;let Eo=2+s()*4;return(t,n)=>{const i=_a();i!==po&&(po=i,Sa()),h[7]=t,h[32]=Qe[0][3]*t+xt[0],h[33]=Qe[1][3]*t+xt[1],h[34]=Qe[2][3]*t+xt[2],bt(),e.bindFramebuffer(e.FRAMEBUFFER,et),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ho,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,gt),e.viewport(0,0,F,F),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),ue||(e.bindFramebuffer(e.READ_FRAMEBUFFER,zt),e.blitFramebuffer(0,0,F,F,0,0,F,F,e.DEPTH_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,et),e.depthMask(!1)),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.useProgram(ae.rock),e.bindVertexArray(r.empty),M(0,e.TEXTURE_2D,mo),e.uniform1i(E.rock.uB,0),e.uniform4f(E.rock.uA,vo,xo,1,0),e.drawArrays(e.TRIANGLES,0,3),ue||e.depthMask(!0),e.depthFunc(e.LESS),e.useProgram(ae.pan),M(0,e.TEXTURE_2D,to),e.uniform1i(E.pan.uOut,0),M(1,e.TEXTURE_2D,r.nt),e.uniform1i(E.pan.uN,1),M(2,e.TEXTURE_2D,r.tt),e.uniform1i(E.pan.uT,2),M(3,e.TEXTURE_CUBE_MAP,Ue),e.uniform1i(E.pan.uSky,3),h[39]=Se,e.uniform4fv(E.pan.uP,h),h[39]=F,e.uniform4f(E.pan.uM,Ho,la,0,0);const f=m=>{const[b,,w]=no[m];w<=0||(e.uniform1f(E.pan.uFast,m===2?1:0),e.bindVertexArray(va[m]),e.drawElementsInstanced(e.TRIANGLES,r.mesh[b].n,e.UNSIGNED_SHORT,0,w))};for(let m=0;m<3;m++)f(m);e.depthFunc(e.LEQUAL),e.depthMask(!1),e.useProgram(ae.wat),e.bindVertexArray(r.empty),M(0,e.TEXTURE_2D,r.nt),e.uniform1i(E.wat.uN,0),M(1,e.TEXTURE_CUBE_MAP,Ue),e.uniform1i(E.wat.uSky,1),M(2,e.TEXTURE_2D,Tt),e.uniform1i(E.wat.uF,2),M(3,e.TEXTURE_2D,r.tt),e.uniform1i(E.wat.uT,3),e.uniform4fv(E.wat.uP,h),e.uniform4fv(E.wat.uA,Ma),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(ae.pan),M(0,e.TEXTURE_2D,to),M(1,e.TEXTURE_2D,r.nt),M(2,e.TEXTURE_2D,r.tt),M(3,e.TEXTURE_CUBE_MAP,Ue),f(3),e.disable(e.BLEND),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthFunc(e.LEQUAL),e.useProgram(ae.vap),e.bindVertexArray(co),M(0,e.TEXTURE_2D,r.nt),e.uniform1i(E.vap.uN,0),e.uniform4fv(E.vap.uP,h),Jt&&e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Jt),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,F,F),e.useProgram(ae.out),e.bindVertexArray(r.empty),M(0,e.TEXTURE_2D,ho),e.uniform1i(E.out.uC,0),M(1,e.TEXTURE_2D,r.nt),e.uniform1i(E.out.uN,1),e.uniform4f(E.out.uU,F,t,ce?.85:0,Ua),e.drawArrays(e.TRIANGLES,0,3),yo.on&&t>Eo&&(Eo=t+4+s()*9,yo.note(30+Math.floor(s()*8),{dur:1.6+s()*2,vel:.12+s()*.1,wave:"sine",cutoff:300}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
