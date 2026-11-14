// Drift Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/596.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Pt){Pt&&Pt.add({num:596,name:"Drift Ice",fam:"Vistas",recipe:"A shore of dark rock and crusted snow looking out over sea ice that goes all the way to the horizon, from round pancakes to broken plates piled into ridges. Where you stand, the light and weather, how tight the ice is and the sea smoke change every mint. There's nothing to press, just watch the ice ride the swell.",music:!0,gl:!0,fps:30,seed:0,make(_){const e=_.gl,T=_.size,k=!!_.home;let O=1500123598;for(let t=2;t<66;t+=8)O=Math.imul(O^parseInt(_.hash.slice(t,t+8),16),2246822507)^O>>>13;const u=()=>{O=O+1831565813|0;let t=Math.imul(O^O>>>15,1|O);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let Ee=O^826366246;const ie=()=>{Ee=Ee+1831565813|0;let t=Math.imul(Ee^Ee>>>15,1|Ee);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let be=O^2014422772;const g=()=>{be=be+1831565813|0;let t=Math.imul(be^be>>>15,1|be);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},rt=t=>{let o=0;for(const n in t)o+=t[n];let a=g()*o;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]},j=t=>{let o=0;for(const n in t)o+=t[n];let a=u()*o;for(const n in t)if(a-=t[n],a<0)return n;return Object.keys(t)[0]},M=Math.PI*2,C=Math.PI/180,nt=k?"Apricot dawn":j({"Apricot dawn":42,"Rose dawn":27,"Pale gold":14,"Sun pillar":6,"Copper dawn":11}),we=k?"Banded":j({Banded:45,"Tight to the horizon":30,"Wide leads":25}),Te=k?"Mixed pans":j({"Mixed pans":46,Pancakes:28,"Great plates":18,"One great pan":8}),Ae=0,Re=["dawn","shore","",""],ue=Ae?Re[0]:k?"dawn":rt({dawn:70,blue:10,snow:9,morning:11}),w=Ae?Re[1]:k?"shore":rt({shore:26,foot:22,head:17,along:19,back:16}),Q=Ae?Re[2]:k?"":rt({"":78,gone:6,nilas:9,raft:7}),De=_.trait("Light",ue==="blue"?"Blue hour before the sun":ue==="snow"?"Snow shower":ue==="morning"?"Clear mid-morning":w==="back"&&nt==="Sun pillar"?"Apricot dawn":nt),ga=_.trait("Pack",Q==="gone"?"Gone out overnight":Q==="nilas"?"Grey ice in the leads":we),Ft=_.trait("Floes",Q==="raft"?"Rafted and ridged":Te),yo=k?"Long and slow":j({"Long and slow":58,"High and long":30,"Almost still":12}),kt=_.trait("Swell",Ae&&Re[3]?Re[3]:yo),Be=_.trait("Snow",k?"Dusted":j({Dusted:50,"Fresh fall":30,"Scoured and glazed":20})),_t=_.trait("Far shore",k?"Kunashiri line":j({"Kunashiri line":68,"Lost in haze":26,"Clear snow peaks":6})),Ce=_.trait("Cloud",k?"Band below the sun":j({"Band below the sun":55,"Clear horizon":25,"High mackerel":20})),Eo=_.trait("Vapour",k?"Thin":j({Thin:70,"Smoking leads":30})),za=_.trait("Standpoint",{shore:"On the shore rocks",foot:"Down on the ice foot",head:"High on the headland",along:"Along the coast",back:"Back to the sun"}[w]),bo=nt==="Copper dawn"||g()<.42?-1:1,wo=6+36*g()*(.4+.6*g()),To=(155+50*g())*C,G=ue==="snow",fe=ue==="blue",Ie=ue==="morning",Ao=(19+7*u()-(k?3:0))*C,St=(k?3.2:2.6+2.2*u())*C,Mt=k?Ao:w==="back"?To:bo*wo*C,st=fe?-2.6*C:Ie?(13+6*g())*C:w==="back"?St+7*C:St,Xe=[Math.sin(Mt)*Math.cos(st),Math.sin(st),Math.cos(Mt)*Math.cos(st)],Ro=De==="Rose dawn",go=De==="Pale gold",Ut=De==="Sun pillar",zo=De==="Copper dawn",re=(t,o,a,n,r,c)=>fe?r:G?n:Ie?c:Ro?t:go?o:zo?a:null,ct=re([3.4,1.55,1.25],[3.4,2.5,1.5],[3.6,1.62,.82],[.2,.2,.21],[.3,.13,.12],[2.2,2.05,1.85])||[3.8,1.95,1.05],lt=re([.2,.2,.255],[.24,.26,.31],[.19,.185,.24],[.47,.49,.53],[.22,.25,.31],[.16,.21,.29])||[.2,.21,.265],it=re([.44,.29,.28],[.4,.33,.27],[.38,.29,.27],[.53,.53,.56],[.33,.31,.35],[.26,.28,.32])||[.45,.3,.25],Po=5.3+(k?0:u()*1.2),Z=w==="foot"||w==="back"?-3+6*g():w==="along"?6:0,Nt=w==="along"||w==="back"?.08:1,Fo=w==="foot"?1.7:w==="back"?3.2:w==="head"?30+9*g():Po,Lt=w==="along"?-27-7*g():w==="back"?-38-14*g():w==="foot"?(g()-.5)*20:w==="head"?-30-18*g():-2,ko=w==="foot"?-5:w==="back"?-6:w==="head"?-13-4*g():w==="along"?-6:-7.5,_o=G?11:Ie?.6:fe?.8:1,Dt=Math.tan((w==="foot"?35:31.5)*C),So=w==="foot"?.12:w==="back"?.6:1,Mo=(kt==="Almost still"?.12:kt==="High and long"?.62:.4)*(w==="foot"?.65:1),Uo=-.2+.5*u(),ut=(t,o,a,n)=>{const r=M/o,c=Uo+n,h=r*Math.sin(c),s=r*Math.cos(c);return[h,s,a*Mo,Math.sqrt(9.81*r)]},qe=[ut(0,92+26*u(),1,0),ut(1,58+14*u(),.55,.32+.25*u()),ut(2,33+9*u(),.22,-.45-.3*u())],ft=[M*u(),M*u(),M*u()],ht=Te==="Pancakes"?.7:Te==="Great plates"?1.5:Te==="One great pan"?1.15:1,No=Be==="Fresh fall"?1:Be==="Scoured and glazed"?.28:.68,Bt=Q==="gone"?-.95:we==="Tight to the horizon"?.24:we==="Wide leads"?-.2:.06,Ct=we==="Banded"?.34:we==="Wide leads"?.26:.12,Lo=Be==="Fresh fall"?.22:Be==="Scoured and glazed"?-.2:0,It=k?[0,0]:[ie()*180-90,ie()*180-90],Oe=u()*90,Xt=5.4+3*u(),qt=u()*10,he=[u()*6.28,u()*6.28,u()*6.28],Y=t=>12.5-.5*t-.0042*t*t*(t<0?Nt:1)+.95*Math.sin(t*.19+he[0])+.55*Math.sin(t*.57+he[1])+.3*Math.sin(t*1.31+he[2]),ge=w==="foot"?Y(Z)+1.1:w==="back"?Y(Z)-1.5:w==="along"?Y(Z)-5:0,i=e.__c596||(e.__c596={});if(!i.nd){let t=2654435769;const o=()=>(t=Math.imul(t^t>>>15,739982445),t=Math.imul(t^t>>>12,695872825),t^=t>>>15,t&255),a=new Uint8Array(256*256*4);for(let r=0;r<a.length;r++)a[r]=o();i.nd=a;const n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,a),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),i.nt=n}const Ot=i.nd,ze=(t,o,a)=>{const n=Math.floor(t),r=Math.floor(o);let c=t-n,h=o-r;c=c*c*(3-2*c),h=h*h*(3-2*h);const s=(E,y)=>Ot[((y&255)<<8|E&255)*4+a]/255,f=s(n,r)+(s(n+1,r)-s(n,r))*c,p=s(n,r+1)+(s(n+1,r+1)-s(n,r+1))*c;return f+(p-f)*h},Do=(t,o)=>.5*ze(t,o,0)+.25*ze(t*2.03+7,o*2.03+7,1)+.125*ze(t*4.1+19,o*4.1+19,2)+.0625*ze(t*8.3+3,o*8.3+3,3),He=(t,o)=>{const a=Math.atan2(t,o),n=Math.max(4,Math.hypot(t,o)),r=Math.log(n),c=a*9,h=Do(c*.55+Oe,r*3.4+Oe*.7),s=ze(c*.22+3+Oe,r*1.4+11,2);return Math.max(0,Math.min(1,.62+Bt+1.7*(h-.47)+Ct*Math.sin(r*Xt+3.2*s+qt)))},N=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
`,me=N+"void main(){ vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.); gl_Position=vec4(p,1.,1.); }",Pe=`uniform sampler2D uN;
vec4 n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.); }
float fbm(vec2 p){ return .5*n2(p).x+.25*n2(p*2.03+7.).y+.125*n2(p*4.1+19.).z+.0625*n2(p*8.3+3.).w; }
`,ne=`uniform vec4 uP[13];
float swell(vec2 p, out vec2 g){
  float kd=mix(uP[2].w,1.,smoothstep(6.,130.,length(p-uP[0].xz)));     // the swell dies in the ice near the shore (cycle 2: the ice-foot view heaved too hard)
  float a0=dot(uP[5].xy,p)-uP[8].x, a1=dot(uP[6].xy,p)-uP[8].y, a2=dot(uP[7].xy,p)-uP[8].z;
  float s0=sin(a0),c0=cos(a0),s1=sin(a1),c1=cos(a1),s2=sin(a2),c2=cos(a2);
  g=(uP[5].xy*uP[5].z*c0+uP[6].xy*uP[6].z*c1+uP[7].xy*uP[7].z*c2)*kd;
  return (uP[5].z*s0+uP[6].z*s1+uP[7].z*s2)*kd;
}
vec3 camRay(vec2 q){ return normalize(uP[3].xyz+(q.x*uP[1].xyz+q.y*uP[2].xyz)*uP[0].w); }
`,Bo=N+Pe+`uniform vec3 uFX,uFY,uFZ; uniform vec2 uRes; uniform vec4 uS[6]; out vec4 o;
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
}`,Co=N+Pe+`uniform vec2 uRes; uniform vec4 uS[3]; uniform int uK; out vec4 o;
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
}`,Io=N+Pe+ne+`uniform samplerCube uSky; uniform vec4 uL,uLo,uL2; uniform int uK; out vec4 o;
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
}`,Xo=N+ne+`layout(location=0) in vec2 aQ; layout(location=1) in vec4 aA; layout(location=2) in vec4 aB;
out float vT;
void main(){
  vec3 A=aA.xyz, B=aB.xyz; vec3 mid=A+(B-A)*aQ.y; float w=mix(aA.w,aB.w,aQ.y); w=max(w,dot(mid-uP[0].xyz,uP[3].xyz)*.0007);
  vec3 toEye=normalize(uP[0].xyz-mid), dir=normalize(B-A); vec3 side=normalize(cross(dir,toEye));
  vec3 v=mid+side*aQ.x*w-uP[0].xyz;
  float cz=dot(v,uP[3].xyz), cx=dot(v,uP[1].xyz), cy=dot(v,uP[2].xyz);
  gl_Position=vec4(cx/uP[0].w,cy/uP[0].w,cz*uP[12].x+uP[12].y,cz); vT=cz;
}`,qo=N+"in float vT; out vec4 o; void main(){ o=vec4(vec3(.018,.016,.028),vT); }",Oo=N+"uniform sampler2D uB; uniform vec4 uA; out vec4 o; void main(){ vec4 c=texelFetch(uB,ivec2(gl_FragCoord.xy),0); if(c.a<=0.) discard; o=vec4(c.rgb,1.); gl_FragDepth=clamp(.5*(uA.x+uA.y/(c.a*uA.z))+.5,0.,1.); }",Ho=N+ne+`layout(location=0) in vec2 aM; layout(location=1) in vec4 aI; layout(location=2) in vec2 aRow;
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
}`,Vo=N+ne+`uniform sampler2D uT,uN; uniform samplerCube uSky; uniform float uFast; uniform vec4 uM;
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
}`,Go=N+Pe+ne+`uniform samplerCube uSky; uniform sampler2D uF,uT; uniform vec4 uA[3]; out vec4 o;
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
}`,Yo=N+ne+`layout(location=0) in vec2 aQ; layout(location=1) in vec4 aI;
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
}`,Ko=N+ne+`uniform sampler2D uN; in vec2 vUv; in float vZ; in vec3 vW; in float vA; out vec4 o;
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
}`,Wo=N+Pe+`uniform sampler2D uC; uniform vec4 uU; out vec4 o;
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
}`,K=(t,o)=>{const a=e.createProgram();for(const[n,r]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,o]]){const c=e.createShader(n);e.shaderSource(c,r),e.compileShader(c),e.attachShader(a,c),a["s"+n]=c}return e.linkProgram(a),a._v=t,a._f=o,a};i.prog||(i.prog={},i.prog.sky=K(me,Bo),i.prog.far=K(me,Co),i.prog.land=K(me,Io),i.prog.tree=K(Xo,qo),i.prog.rock=K(me,Oo),i.prog.pan=K(Ho,Vo),i.prog.wat=K(me,Go),i.prog.vap=K(Yo,Ko),i.prog.out=K(me,Wo),e.flush());const Ve=300,Fe=26,L=Math.ceil((2*Ve+80)/Fe),ke=4e3,_e=new Int32Array(L*L).fill(-1),Ge=new Int32Array(ke),se=new Float32Array(ke),ce=new Float32Array(ke),de=new Float32Array(ke);let z=0;const J=t=>Math.max(0,Math.min(L-1,Math.floor((t+Ve+40)/Fe))),jo=t=>1+t/85;let Ye=18;const Ht=(t,o,a)=>{const n=J(t),r=J(o),c=z++;se[c]=t,ce[c]=o,de[c]=a;const h=r*L+n;return Ge[c]=_e[h],_e[h]=c,c},Qo=(t,o,a)=>{const n=Math.hypot(t,o);if(n>Ve||z>=ke)return!1;const r=a*jo(n)*(.72+.56*u())*(a>2?Math.min(1,.42+n/95):1);if(o<Y(t)+r*1.15+.3)return!1;const c=u(),h=J(t),s=J(o),f=Math.ceil((r+Ye)/Fe);for(let p=Math.max(0,s-f);p<=Math.min(L-1,s+f);p++)for(let E=Math.max(0,h-f);E<=Math.min(L-1,h+f);E++)for(let y=_e[p*L+E];y>=0;y=Ge[y]){const A=se[y]-t,m=ce[y]-o,l=(r+de[y])*.96;if(A*A+m*m<l*l)return!1}return c>He(t,o)?!1:(Ht(t,o,r),!0)};let Se=-1;if(Te==="One great pan"){const t=(ie()<.5?-1:1)*(.1+.2*ie()),o=46+22*ie(),a=19+9*ie(),n=Math.sin(t)*o,r=Math.cos(t)*o;r>Y(n)+a*1.15+.3&&(Se=Ht(n,r,a),Ye=a*1.3)}const Ke=(t,o,a)=>{for(let n=0;n<o;n++){let r,c=u()*M;if(u()<a){const h=u();r=8+h*h*95}else r=Ve*Math.sqrt(u());Qo(Math.sin(c)*r,Math.cos(c)*r,t)}};Ft!=="Pancakes"&&Ke(4.4*ht,900,.08),Ke(2.5*ht,3200,.2),Ke(1.2*Math.sqrt(ht),7e3,.5),Ke(.62,15e3,.78);const pe=new Float32Array(z),We=new Uint32Array(z);for(let t=0;t<z;t++)pe[t]=Math.hypot(se[t]-Z,ce[t]-ge),We[t]=t;Se>=0&&(pe[Se]=Math.min(pe[Se],20)),We.sort((t,o)=>pe[t]-pe[o]),z=Math.min(z,i.mt||(i.mt=e.getParameter(e.MAX_TEXTURE_SIZE)));const b=64,mt=new Float64Array(b),dt=new Float64Array(b);for(let t=0;t<b;t++)mt[t]=Math.cos(t/b*M),dt[t]=Math.sin(t/b*M);const I=(t,o)=>{let a=Math.imul(t^1499525390,2246822507)^Math.imul(o+1663821227,3266489909);return a^=a>>>15,a=Math.imul(a,739982445),a^=a>>>12,a=Math.imul(a,695872825),a^=a>>>15,(a>>>0)/4294967296},$=Ft,pt=new Float32Array(z),Vt=($==="Pancakes"?1.7:Q==="gone"?.4:$==="Mixed pans"?1.1:.85)*(w==="head"?.6:1);for(let t=0;t<z;t++){const o=I(t,7),a=de[t],n=Math.hypot(se[t]-Z,ce[t]-ge);pt[t]=$==="Pancakes"?a>2.2&&o<.3?.5:0:$==="Mixed pans"?n<34?o<.55?.5:0:a>1.6?o<.6?1:o<.85?.5:0:o<.3?1:o<.6?.5:0:a<1.1?o<.4?0:o<.7?.5:1:o<.85?1:.5}const Gt=$==="Rafted and ridged"?.42:$==="Pancakes"?0:.2,Zo=$==="Rafted and ridged"?.4:$==="Pancakes"?0:.16,Me=new Uint8Array(b*z*4),S=new Float64Array(b),Ue=new Float64Array(b),ve=new Float64Array(b),je=new Float64Array(b),ee=new Float64Array(b),te=new Float32Array(z*6);for(let t=0;t<z;t++){const o=We[t],a=se[o],n=ce[o],r=de[o],c=r*1.28,h=1.25-He(a,n),s=pt[o];S.fill(c),Ue.fill(0),je.fill(0),ee.fill(0);const f=J(a),p=J(n),E=Math.ceil((r*1.3+Ye)/Fe);for(let m=Math.max(0,p-E);m<=Math.min(L-1,p+E);m++)for(let l=Math.max(0,f-E);l<=Math.min(L-1,f+E);l++)for(let v=_e[m*L+l];v>=0;v=Ge[v]){if(v===o)continue;const F=se[v]-a,U=ce[v]-n,oe=F*F+U*U,P=de[v];if(oe>(c+P*1.28)*(c+P*1.28))continue;const V=Math.sqrt(oe),ae=F/V,tt=U/V;let le=(oe+r*r-P*P)/(2*V)-(.04+.035*r)*h,po=0,vo=0,xo=0;if(s>.9&&pt[v]>.9&&le<V*.62){const B=I(Math.min(o,v),Math.max(o,v)+99);if(B<Gt){const ot=.3+.35*I(v,o+5)+.05*Math.min(r,P);I(Math.max(o,v),Math.min(o,v))<.5==o<v?(le+=ot+(.04+.035*r)*h,po=1):vo=1}else B<Gt+Zo&&(xo=.45+.55*I(o+v,3))}for(let B=0;B<b;B++){const ot=mt[B]*ae+dt[B]*tt;if(ot<.05)continue;const zt=le/ot;if(zt<S[B]){S[B]=zt;const at=Math.min(1,1.15-(zt-le)/(r*.5));Ue[B]=Math.max(Ue[B],at),je[B]=xo*Math.max(0,at),ee[B]=po?at:vo?-at:0}}}const y=u()*M,A=.05+.05*u();if(s<.9){for(let m=0;m<3;m++){for(let l=0;l<b;l++)ve[l]=.25*S[(l+b-1)%b]+.5*S[l]+.25*S[(l+1)%b];S.set(ve)}for(let m=0;m<b;m++)S[m]*=1+A*Math.sin(m/b*M*3+y)+A*.6*Math.sin(m/b*M*5+y*2.7)}if(s>.2){const m=s>.9?3+Math.floor(I(o,11)*3):1+Math.floor(I(o,11)*1.8);for(let l=0;l<m;l++){const v=(l+I(o,20+l)*.8)/m*M+y,F=r*(s>.9?.78+.4*I(o,40+l):.7+.25*I(o,40+l)),U=Math.cos(v),oe=Math.sin(v);for(let P=0;P<b;P++){const V=mt[P]*U+dt[P]*oe;if(V<.05)continue;const ae=F/V;ae<S[P]&&(S[P]=ae,Ue[P]*=.3,ee[P]=0,je[P]=0)}}if(s>.9){for(let l=0;l<b;l++)ve[l]=.1*S[(l+b-1)%b]+.8*S[l]+.1*S[(l+1)%b];S.set(ve)}}for(let m=0;m<2;m++){for(let l=0;l<b;l++)ve[l]=.25*ee[(l+b-1)%b]+.5*ee[l]+.25*ee[(l+1)%b];ee.set(ve)}for(let m=0;m<b;m++){const l=Math.max(r*.45,S[m])/c,v=(t*b+m)*4,F=s>.9?je[m]:(.35+.65*I(o*64+(m>>2),9))*(s>.2?.7:1);Me[v]=Math.min(255,l*255),Me[v+1]=Math.min(255,Ue[m]*255),Me[v+2]=Math.min(255,F*255),Me[v+3]=127.5+127*ee[m]}te[t*6]=a,te[t*6+1]=n,te[t*6+2]=r,te[t*6+3]=u(),te[t*6+4]=t,te[t*6+5]=s}const Ne=Eo!=="Thin",Qe=Ne?110:46,Jo=Qe+(Ne?260:0),X=new Float32Array(Jo*4);let D=0;const $o=(t,o)=>{const a=J(t),n=J(o),r=Math.ceil((Ye*1.06+2)/Fe);for(let c=Math.max(0,n-r);c<=Math.min(L-1,n+r);c++)for(let h=Math.max(0,a-r);h<=Math.min(L-1,a+r);h++)for(let s=_e[c*L+h];s>=0;s=Ge[s]){const f=se[s]-t,p=ce[s]-o,E=de[s]*1.06+.5+.5*Vt;if(f*f+p*p<E*E)return!0}return!1},Yt=(t,o,a,n)=>{if(a>=n||$o(t,o))return!1;for(let r=0;r<D;r++){const c=X[r*4]-t,h=X[r*4+1]-o;if(c*c+h*h<25)return!1}return!0};for(let t=0,o=0;t<Qe&&o<Qe*40;o++){const a=18+240*u()*u(),n=u()*M,r=Math.sin(n)*a,c=Math.cos(n)*a;if(c<Y(r)+6||He(r,c)>.7)continue;const h=u(),s=(.8+1.1*u())*(1+a/400);t++,Yt(r,c,o,Qe*6)&&(X[D*4]=r,X[D*4+1]=c,X[D*4+2]=h,X[D*4+3]=s,D++)}for(let t=0;Ne&&t<260*6;t++){const o=t<780?30+170*g()*g():10+50*g(),a=(g()-.5)*2.4+Lt*C,n=Z+Math.sin(a)*o,r=ge+Math.cos(a)*o,c=g(),h=(.6+.8*g())*(1+o/400);r<Y(n)+3||He(n,r)>.62||!Yt(n,r,0,1)||(X[D*4]=n,X[D*4+1]=r,X[D*4+2]=c,X[D*4+3]=h,D++)}const ea=(t,o)=>{const a=Y(t)-o,n=(r,c,h)=>{const s=Math.max(0,Math.min(1,(h-r)/(c-r)));return s*s*(3-2*s)};return-1.6+2.7*n(-5,1.2,a)+1.7*n(1,11,a)+1.4*n(8,26,a)+4.5*n(18,70,a)},vt=[],Kt=(t,o,a,n,r,c,h,s,f)=>{const p=Math.max(2,Math.round(h/(f>=2?.9:.42))),E=.02+.018*u();let y=t,A=o,m=a,l=s;for(let v=0;v<p;v++){const F=(v+1)/p,U=y+n*h/p,oe=A+r*h/p,P=m+c*h/p,V=s*(1-F*.72);vt.push(y,A,m,l,U,oe,P,V),y=U,A=oe,m=P,l=V,n+=E*(.5+u()),c+=(u()-.5)*.07,r+=f<2?-.045:-.004;const ae=Math.hypot(n,r,c);if(n/=ae,r/=ae,c/=ae,f>0&&F>.18&&vt.length<52e3&&u()<(f>=3?.68:.88)){const tt=u()*M,le=.7+.6*u();Kt(y,A,m,n*.55+Math.cos(tt)*le,r*.6+.18+.4*u(),c*.55+Math.sin(tt)*le,h*(.34+.3*u())*(1-F*.35),l*.55,f-1)}}};for(let t=0,o=0;t<11&&o<60;o++){const a=-105+210*u(),n=-(33+40*u())-a*a*.0018;if(!(n>Y(a)-9)){t++;for(let r=0,c=1+Math.floor(u()*3.2);r<c;r++){const h=a+(u()-.5)*5,s=n+(u()-.5)*5,f=ea(h,s)-.2;Kt(h,f,s,.05+.06*u(),1,-.03*u(),8+6*u(),.13+.09*u(),3+(u()<.55?1:0))}}}const Wt=new Float32Array(vt);if(!i.u){for(const s in i.prog){const f=i.prog[s];Ae&&!e.getProgramParameter(f,e.LINK_STATUS)&&console.error("596 "+s+": "+e.getProgramInfoLog(f)+" "+e.getShaderInfoLog(f["s"+e.FRAGMENT_SHADER])+" "+e.getShaderInfoLog(f["s"+e.VERTEX_SHADER]))}const t=(s,...f)=>{const p={};for(const E of f)p[E]=e.getUniformLocation(s,E);return p};i.u={sky:t(i.prog.sky,"uN","uFX","uFY","uFZ","uRes","uS"),far:t(i.prog.far,"uN","uRes","uS"),land:t(i.prog.land,"uN","uP","uSky","uL","uLo","uL2"),tree:t(i.prog.tree,"uP"),rock:t(i.prog.rock,"uB","uA"),pan:t(i.prog.pan,"uP","uOut","uN","uT","uSky","uFast","uM"),wat:t(i.prog.wat,"uP","uN","uSky","uF","uT","uA"),vap:t(i.prog.vap,"uP","uN"),out:t(i.prog.out,"uC","uN","uU")},i.empty=e.createVertexArray();const o=256,a=new Float32Array(o*o),n=(s,f,p)=>{const E=s&255,y=f&255;return i.nd[(y<<8|E)*4+p]/255},r=(s,f,p,E)=>{const y=Math.floor(s),A=Math.floor(f);let m=s-y,l=f-A;m=m*m*(3-2*m),l=l*l*(3-2*l);const v=(F,U)=>n((F%p+p)%p+E*37,(U%p+p)%p+E*53,E);return v(y,A)*(1-m)*(1-l)+v(y+1,A)*m*(1-l)+v(y,A+1)*(1-m)*l+v(y+1,A+1)*m*l};for(let s=0;s<o;s++)for(let f=0;f<o;f++){const p=f/o,E=s/o;let y=0,A=.5,m=4,l=0;for(let v=0;v<6;v++)y+=A*r(p*m,E*m,m,l),A*=.58,m*=2,l=(l+1)%4;a[s*o+f]=y}const c=new Uint8Array(o*o*4);for(let s=0;s<o;s++)for(let f=0;f<o;f++){const p=a[s*o+f],E=a[s*o+(f+1)%o],y=a[(s+1)%o*o+f],A=(p-E)*2.2,m=(p-y)*2.2,l=(s*o+f)*4;c[l]=127.5+Math.max(-1,Math.min(1,A))*127,c[l+1]=127.5+Math.max(-1,Math.min(1,m))*127,c[l+2]=Math.min(255,p*255),c[l+3]=Math.pow(Ot[((s&255)<<8|f&255)*4+1]/255,2.2)*255}i.tt=e.createTexture(),e.bindTexture(e.TEXTURE_2D,i.tt),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,o,o,0,e.RGBA,e.UNSIGNED_BYTE,c),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT);const h=(s,f)=>{const p=[],E=[];for(let l=0;l<=s;l++)for(const v of f)p.push(v,l/s);const y=f.length;for(let l=0;l<s;l++)for(let v=0;v<y-1;v++){const F=l*y+v,U=(l+1)*y+v;E.push(F,U,F+1,F+1,U,U+1)}const A=e.createBuffer(),m=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array(p),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,m),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(E),e.STATIC_DRAW),{vb:A,ib:m,n:E.length}};i.mesh=[h(96,[0,.4,.66,.8,.88,.925,.955,.975,.99,1,1.03,1.06]),h(40,[0,.6,.84,.93,.98,1,1.06]),h(14,[0,.7,.96,1,1.06]),h(96,[1.062,1.25,1.5])],i.quad=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,i.quad),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),i.seg=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,i.seg),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,0,1,0,-1,1,1,1]),e.STATIC_DRAW)}const H=i.prog,x=i.u,xt=!!e.getExtension("EXT_color_buffer_float"),W=xt||!!e.getExtension("EXT_color_buffer_half_float"),ta=W?e.RGBA16F:e.RGBA8,oa=W?e.HALF_FLOAT:e.UNSIGNED_BYTE,jt=xt?e.R11F_G11F_B10F:W?e.RGBA16F:e.RGBA8,aa=xt?e.RGB:e.RGBA,ra=W?e.HALF_FLOAT:e.UNSIGNED_BYTE,Ze=(t,o,a,n,r,c,h)=>{const s=e.createTexture();return e.bindTexture(e.TEXTURE_2D,s),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,n,r,c||null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,h===e.NEAREST?e.NEAREST:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),s};e.pixelStorei(e.UNPACK_ALIGNMENT,1);const Qt=Ze(b,z,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,Me,e.LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.pixelStorei(e.UNPACK_ALIGNMENT,4);const na=t=>{const o=Math.max(pe[We[t]],1),a=te[t*6+2]/o;return a>.05||t===0&&Se>=0?0:a>.007||o<60?1:2},Zt=new Float32Array(z*6),q=[0,0,0],Jt=new Uint8Array(z);for(let t=0;t<z;t++)q[Jt[t]=na(t)]++;const sa=[0,q[0],q[0]+q[1]];for(let t=0;t<z;t++)Zt.set(te.subarray(t*6,t*6+6),6*sa[Jt[t]]++);const $t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,$t),e.bufferData(e.ARRAY_BUFFER,Zt,e.STATIC_DRAW);const eo=[[0,0,q[0]],[1,q[0],q[1]],[2,q[0]+q[1],q[2]],[3,0,q[0]]],ca=eo.map(([t,o])=>{const a=e.createVertexArray();e.bindVertexArray(a);const n=i.mesh[t];return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.ib),e.bindBuffer(e.ARRAY_BUFFER,n.vb),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,$t),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,24,o*24),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,2,e.FLOAT,!1,24,o*24+16),e.vertexAttribDivisor(2,1),e.bindVertexArray(null),a}),to=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,to),e.bufferData(e.ARRAY_BUFFER,X,e.STATIC_DRAW);const oo=e.createVertexArray();e.bindVertexArray(oo),e.bindBuffer(e.ARRAY_BUFFER,i.quad),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,to),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,16,0),e.vertexAttribDivisor(1,1),e.bindVertexArray(null);const ao=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,ao),e.bufferData(e.ARRAY_BUFFER,Wt,e.STATIC_DRAW);const ro=e.createVertexArray();e.bindVertexArray(ro),e.bindBuffer(e.ARRAY_BUFFER,i.seg),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,8,0),e.bindBuffer(e.ARRAY_BUFFER,ao),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(1,1),e.enableVertexAttribArray(2),e.vertexAttribPointer(2,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(2,1),e.bindVertexArray(null);const Je=e.createFramebuffer(),R=(t,o,a)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(o,a)},yt=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0)},xe=T>400?512:256,ye=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,ye),e.texStorage2D(e.TEXTURE_CUBE_MAP,1,jt,xe,xe),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const no=new Float32Array(24),la=re([.085,.1,.2],[.11,.17,.29],[.08,.09,.19],[.33,.34,.37],[.045,.065,.14],[.06,.16,.4])||[.075,.12,.25],ia=re([.6,.4,.45],[.6,.5,.46],[.58,.37,.38],[.55,.55,.57],[.3,.31,.37],[.42,.5,.6])||[.56,.39,.45],ua=re([1.5,.62,.5],[1.4,.96,.5],[1.6,.66,.36],[.62,.61,.62],[1.05,.5,.38],[.95,.9,.82])||[1.7,.82,.4],fa=re([.82,.5,.58],[.75,.58,.55],[.8,.45,.5],[.52,.52,.55],[.4,.36,.43],[.55,.62,.74])||[.86,.52,.56],ha=G?0:Ce==="Clear horizon"?.3:Ce==="High mackerel"?.85:.45,ma=Ce==="Clear horizon"?0:Ce==="High mackerel"?.012:.034+.012*u(),da=G?0:ma,pa=G?0:_t==="Lost in haze"?fe?.7:0:_t==="Clear snow peaks"?2.4:fe?1.5:1;no.set([...Xe,0,...la,pa,...ia,Ut?1:0,...ua,0,...fa,0,u()*80,u()*80,ha,da]);const va=[[0,0,-1,0,-1,0,1,0,0],[0,0,1,0,-1,0,-1,0,0],[1,0,0,0,0,1,0,1,0],[1,0,0,0,0,-1,0,-1,0],[1,0,0,0,-1,0,0,0,1],[-1,0,0,0,-1,0,0,0,-1]];yt(),e.bindVertexArray(i.empty),e.useProgram(H.sky),e.bindFramebuffer(e.FRAMEBUFFER,Je),e.viewport(0,0,xe,xe),R(0,e.TEXTURE_2D,i.nt),e.uniform1i(x.sky.uN,0),e.uniform2f(x.sky.uRes,xe,xe),e.uniform4fv(x.sky.uS,no);for(let t=0;t<6;t++){const o=va[t];e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+t,ye,0),e.uniform3f(x.sky.uFX,o[0],o[1],o[2]),e.uniform3f(x.sky.uFY,o[3],o[4],o[5]),e.uniform3f(x.sky.uFZ,o[6],o[7],o[8]),e.drawArrays(e.TRIANGLES,0,3),e.flush()}const Le=T>400?2048:1024,Et=T>400?512:256,bt=Ze(Le,Et,e.RGBA8,e.RGBA,e.UNSIGNED_BYTE,null,e.LINEAR_MIPMAP_LINEAR);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT);const so=170,xa=12e3,wt=Math.log(so),Tt=Math.log(xa);e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,bt,0),e.viewport(0,0,Le,Et),e.useProgram(H.far),e.bindVertexArray(i.empty),R(0,e.TEXTURE_2D,i.nt),e.uniform1i(x.far.uN,0),e.uniform2f(x.far.uRes,Le,Et),e.uniform4fv(x.far.uS,new Float32Array([Oe,Bt,Ct,Xt,qt,wt,Tt,Q==="gone"?1:0,Le/16,(Tt-wt)/(M/(Le/16)),0,0])),e.drawArrays(e.TRIANGLES,0,3),e.bindTexture(e.TEXTURE_2D,bt),e.generateMipmap(e.TEXTURE_2D),e.flush();const Pa=T>400,co=Ze(T,T,jt,aa,ra,null,e.LINEAR),At=e.createRenderbuffer();e.bindRenderbuffer(e.RENDERBUFFER,At),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,T,T);const lo=Ze(T,T,ta,e.RGBA,oa,null,e.NEAREST);let Rt=null,gt=null;W||(Rt=e.createFramebuffer(),gt=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,gt),e.renderbufferStorage(e.RENDERBUFFER,e.DEPTH_COMPONENT24,T,T));const ya={yaw:0,pitch:0,x:0,y:0,z:0},Ea=Lt*C,ba=ko*C,d=new Float32Array(52);let io="";const $e=.5,et=1e3,uo=(et+$e)/(et-$e),fo=-2*et*$e/(et-$e),wa=()=>{const t=_.view||ya,o=Ea+t.yaw,a=ba+t.pitch,n=Math.cos(a),r=Math.sin(a),c=Math.cos(o),h=Math.sin(o),s=[h*n,r,c*n],f=[c,0,-h],p=[s[1]*f[2]-s[2]*f[1],s[2]*f[0]-s[0]*f[2],s[0]*f[1]-s[1]*f[0]];return d[0]=Z+t.x,d[1]=Fo+t.y,d[2]=ge+t.z,d[3]=Dt,d[4]=f[0],d[5]=f[1],d[6]=f[2],d[8]=p[0],d[9]=p[1],d[10]=p[2],d[12]=s[0],d[13]=s[1],d[14]=s[2],d[15]=T,t.yaw+","+t.pitch+","+t.x+","+t.y+","+t.z};d[11]=So,d[35]=G?0:1,d[16]=Xe[0],d[17]=Xe[1],d[18]=Xe[2],d[19]=1;for(let t=0;t<3;t++)for(let o=0;o<4;o++)d[20+t*4+o]=qe[t][o];d[36]=ct[0],d[37]=ct[1],d[38]=ct[2],d[39]=T,d[40]=lt[0],d[41]=lt[1],d[42]=lt[2],d[43]=_o,d[44]=it[0],d[45]=it[1],d[46]=it[2],d[48]=uo,d[49]=fo,d[50]=Ne?1.1:1,d[51]=Ne?1.3:1;const Ta=()=>{yt(),e.bindFramebuffer(e.FRAMEBUFFER,W?Je:Rt),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,lo,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,W?At:gt),e.viewport(0,0,T,T),e.clearColor(0,0,0,0),e.clearDepth(1),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.useProgram(H.land),e.bindVertexArray(i.empty),R(0,e.TEXTURE_2D,i.nt),e.uniform1i(x.land.uN,0),R(1,e.TEXTURE_CUBE_MAP,ye),e.uniform1i(x.land.uSky,1),e.uniform4fv(x.land.uP,d),e.uniform4f(x.land.uL,Nt,he[0],he[1],he[2]),e.uniform4f(x.land.uL2,Z,ge,w==="along"?2400:520,w==="along"?70:0),e.uniform4f(x.land.uLo,It[0],It[1],Lo,0),e.drawArrays(e.TRIANGLES,0,3),e.flush(),e.depthFunc(e.LESS),e.useProgram(H.tree),e.bindVertexArray(ro),e.uniform4fv(x.tree.uP,d),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,Wt.length/8),e.disable(e.DEPTH_TEST),e.flush()},Aa=new Float32Array([so,wt,Tt,T*.5/Dt,Q==="nilas"?1:0,Ut&&!G?1:0,0,Q==="gone"?1:0,0,0,0,0]),Ra=fe?.95:G?.85:Ie?.78:.72,ho=_.sound;let mo=2+u()*4;return(t,o)=>{const a=wa();a!==io&&(io=a,Ta()),d[7]=t,d[32]=qe[0][3]*t+ft[0],d[33]=qe[1][3]*t+ft[1],d[34]=qe[2][3]*t+ft[2],yt(),e.bindFramebuffer(e.FRAMEBUFFER,Je),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,co,0),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,At),e.viewport(0,0,T,T),e.clearDepth(1),e.clear(e.DEPTH_BUFFER_BIT),W||(e.bindFramebuffer(e.READ_FRAMEBUFFER,Rt),e.blitFramebuffer(0,0,T,T,0,0,T,T,e.DEPTH_BUFFER_BIT,e.NEAREST),e.bindFramebuffer(e.FRAMEBUFFER,Je),e.depthMask(!1)),e.enable(e.DEPTH_TEST),e.depthFunc(e.ALWAYS),e.useProgram(H.rock),e.bindVertexArray(i.empty),R(0,e.TEXTURE_2D,lo),e.uniform1i(x.rock.uB,0),e.uniform4f(x.rock.uA,uo,fo,1,0),e.drawArrays(e.TRIANGLES,0,3),W||e.depthMask(!0),e.depthFunc(e.LESS),e.useProgram(H.pan),R(0,e.TEXTURE_2D,Qt),e.uniform1i(x.pan.uOut,0),R(1,e.TEXTURE_2D,i.nt),e.uniform1i(x.pan.uN,1),R(2,e.TEXTURE_2D,i.tt),e.uniform1i(x.pan.uT,2),R(3,e.TEXTURE_CUBE_MAP,ye),e.uniform1i(x.pan.uSky,3),d[39]=z,e.uniform4fv(x.pan.uP,d),d[39]=T,e.uniform4f(x.pan.uM,No,Vt,0,0);const n=r=>{const[c,,h]=eo[r];h<=0||(e.uniform1f(x.pan.uFast,r===2?1:0),e.bindVertexArray(ca[r]),e.drawElementsInstanced(e.TRIANGLES,i.mesh[c].n,e.UNSIGNED_SHORT,0,h))};for(let r=0;r<3;r++)n(r);e.depthFunc(e.LEQUAL),e.depthMask(!1),e.useProgram(H.wat),e.bindVertexArray(i.empty),R(0,e.TEXTURE_2D,i.nt),e.uniform1i(x.wat.uN,0),R(1,e.TEXTURE_CUBE_MAP,ye),e.uniform1i(x.wat.uSky,1),R(2,e.TEXTURE_2D,bt),e.uniform1i(x.wat.uF,2),R(3,e.TEXTURE_2D,i.tt),e.uniform1i(x.wat.uT,3),e.uniform4fv(x.wat.uP,d),e.uniform4fv(x.wat.uA,Aa),e.drawArrays(e.TRIANGLES,0,3),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.useProgram(H.pan),R(0,e.TEXTURE_2D,Qt),R(1,e.TEXTURE_2D,i.nt),R(2,e.TEXTURE_2D,i.tt),R(3,e.TEXTURE_CUBE_MAP,ye),n(3),e.disable(e.BLEND),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),e.depthFunc(e.LEQUAL),e.useProgram(H.vap),e.bindVertexArray(oo),R(0,e.TEXTURE_2D,i.nt),e.uniform1i(x.vap.uN,0),e.uniform4fv(x.vap.uP,d),D&&e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,D),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.depthMask(!0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,T,T),e.useProgram(H.out),e.bindVertexArray(i.empty),R(0,e.TEXTURE_2D,co),e.uniform1i(x.out.uC,0),R(1,e.TEXTURE_2D,i.nt),e.uniform1i(x.out.uN,1),e.uniform4f(x.out.uU,T,t,G?.85:0,Ra),e.drawArrays(e.TRIANGLES,0,3),ho.on&&t>mo&&(mo=t+4+u()*9,ho.note(30+Math.floor(u()*8),{dur:1.6+u()*2,vel:.12+u()*.1,wave:"sine",cutoff:300}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
