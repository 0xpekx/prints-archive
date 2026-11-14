// Night Clouds: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/256.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(wt){wt&&wt.add({num:256,name:"Night Clouds",fam:"Worlds",recipe:"A long exposure at a summer midnight looking north over still water, with silver-blue clouds so high they still catch the sun, drifting in waves and swirls. The clouds, the foreground and the twilight change every mint, and rare ones get an aurora or a big wave marching through. Drag to pan along the horizon, tap to step the time-lapse forward, or hold to play it fast and watch the waves march.",interactive:"Drag to pan along the horizon; tap to step the time-lapse a few minutes; hold to play it fast so the wave trains march and shear",music:!0,gl:!0,fps:30,seed:0,make(x){const t=x.gl,H=x.size,w=!!x.home;let k=627711037;for(let e=2;e<66;e+=8)k=Math.imul(k^parseInt(x.hash.slice(e,e+8),16),2246822507)^k>>>13;const a=()=>{k=k+1831565813|0;let e=Math.imul(k^k>>>15,1|k);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},A=e=>{let s=0;for(const r in e)s+=e[r];let c=a()*s;for(const r in e)if(c-=e[r],c<0)return r;return Object.keys(e)[0]},V=Math.PI*2,K=Math.PI/180,Q=x.trait("Display",w?"Herringbone":A({Herringbone:34,"Long bands":30,Whirls:24,"Faint veil":12})),gt=x.trait("Foreground",w?"Lake":A({Lake:44,"Bog pools":26,"Sea coast":20,"Town shore":10})),it=x.trait("Sun below",w?"North-west":A({"North-west":38,North:24,"North-east":38})),W=x.trait("Twilight",w?"Midnight":A({"Bright night":30,Midnight:45,"Deep twilight":25})),bt=x.trait("Low cloud",w?"One bank":A({Clear:40,"One bank":38,Scattered:22})),jt=x.trait("Lens",w?"35 mm":A({"24 mm":28,"35 mm":47,"85 mm":25})),Y=x.trait("Visitor",w?"None":A({None:84,Aurora:9,"Mesospheric bore":7}));let _=627177379;for(let e=2;e<66;e+=8)_=Math.imul(_^parseInt(x.hash.slice(e,e+8),16),2654435761)^_>>>15;const P=()=>{_=_+1831565813|0;let e=Math.imul(_^_>>>15,1|_);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Gt=x.trait("Framing",w?"Level horizon":(()=>{const e=P()*100;return e<46?"Level horizon":e<74?"Low horizon":"High horizon"})()),g={"24 mm":.72,"35 mm":.5,"85 mm":.22}[jt],yt=a(),Ct=it==="North"?a():0,rt=w?-(16+8*yt)*K:it==="North"?(Ct-.5)*.25*Math.atan(g):(it==="North-west"?-1:1)*Math.atan(g*(.3+.12*yt)),J=({"Bright night":7.6,Midnight:10.2,"Deep twilight":12.4}[W]+(a()-.5)*(w?0:1.2))*K,X={"Bright night":1.35,Midnight:1,"Deep twilight":.62}[W],Ot={"Bright night":1.3,Midnight:1,"Deep twilight":.75}[W],f=new Float32Array(16*5*4);let j=0,zt=0,l=(a()<.5?-1:1)*(.45+.6*a());Q==="Long bands"&&(l=Math.sign(l)*(1.2+.45*(Math.abs(l)-.45)));const L=Math.sin(rt)*420,U=Math.cos(rt)*420,d=(e,s,c,r,p,m,y,n,v=p?1.05:.55)=>{const R=V/e,T=j++;f.set([R*Math.cos(s),R*Math.sin(s),c*R,a()*V],T*4),f.set([p?r*.9:r,p,L+y,U+n],(16+T)*4),f.set([p?40+30*f[T*4+3]/V:m,-.012+.024*a(),-.008+.016*a(),v],(32+T)*4),f.set(T<2?[1.2,1.7,1]:p||e<10?[.35,.9,0]:[.7,2.4,0],(64+T)*4+1)},Et=(e,s,c,r,p)=>{const m=zt++;f.set([e,s,c,r],(48+m)*4),f[(64+m)*4]=p},o=()=>a()-.5;let lt=.42,Mt=.3,Z=0,$=14,Rt=.36,Tt=.28;if(Q==="Herringbone")d(36+8*a(),l,.035,1,0,650,0,0),d(22+6*a(),l+.32+.2*o(),.025,.55,0,380,120*o(),120*o()),d(7+2*a(),l+Math.PI/2+.25*o(),.01,.55,1,170,300*o(),240*o()),d(4.8+a(),l+Math.PI/2-.35+.2*o(),.008,.5,1,150,300*o(),240*o()),d(3.4+.8*a(),l+Math.PI/2+.5+.3*o(),.006,.45,1,130,300*o(),240*o()),d(58+10*a(),l-.5+.2*o(),.045,.4,0,700,0,0),Et(L+150*o(),U+150*o(),30+20*a(),1.2*o(),4e-4*o());else if(Q==="Long bands")d(44+10*a(),l,.04,1.1,0,700,0,0),d(30+6*a(),l+.12+.08*o(),.03,.8,0,500,150*o(),150*o()),d(62+12*a(),l-.22,.05,.5,0,600,0,0),d(8+2*a(),l+Math.PI/2+.3*o(),.01,.2,1,240,100*o(),100*o()),d(3.6+a(),l+.8*o(),.006,.16,0,200,100*o(),100*o()),lt=.38,Z=.2,$=9;else if(Q==="Whirls"){d(34+8*a(),l,.035,1,0,650,0,0),d(21+5*a(),l+.4+.2*o(),.025,.6,0,420,100*o(),100*o()),d(7+2*a(),l+Math.PI/2+.3*o(),.01,.4,1,300,80*o(),80*o()),d(3.8+a(),l+1.2*o(),.006,.2,0,200,120*o(),120*o());const e=4+(a()*2|0);for(let s=0;s<e;s++){const c=L+380*o(),r=U+320*o(),p=35+45*a(),m=(a()<.5?-1:1)*(.9+1.2*a()),y=5e-4*o();s<e-3&&Et(L+.45*(c-L),U+.3*(r-U),60+p,m*.62,y*.6)}$=10,Z=.15}else d(40+10*a(),l,.035,.45,0,700,0,0),d(26+6*a(),l+.3*o(),.025,.25,0,400,150*o(),150*o()),d(7+2*a(),l+Math.PI/2+.3*o(),.01,.2,1,300,80*o(),80*o()),lt=.5,Mt=.16,Z=.08,Rt=.18,Tt=.6,$=5;const G=[-.028+.02*o(),.008*o()],Nt=[];for(let e=0;e<j;e++)if(f[(16+e)*4+1]){const s=(16+e)*4+2,c=.74+.05*(f[s+1]-U)/120,r=(f[s]-L)*c*.8*Math.min(1,2*g)/420;f.set([L*c-U*r,U*c+L*r],s),f.set(G,(32+e)*4+1),Nt.push(s)}const kt=Y==="Mesospheric bore",_t=l+.4*o(),ht=[Math.cos(_t),Math.sin(_t)],Vt={"Bright night":330,Midnight:400,"Deep twilight":520}[W]*ht[1]-10-30*a(),pt={Lake:0,"Bog pools":1,"Sea coast":2,"Town shore":3}[gt],tt=a()<.5?-1:1,Lt=tt*(5+11*a()),b=[[.26,.9,1.35,1,Lt,4+4*a(),.3,0,0,0,.8,5],[1.25,.42,1.5,.1,400,.01,.32,1,-tt*(12+8*a()),4.6+1.2*a(),.1,6],[.3,.85,.9,1.6,-tt*(6+10*a()),1,0,2,0,0,tt,5],[.85,.75,1.4,.4,Lt,3+3*a(),.25,3,0,0,.7,5]][pt],ft=[[0,.011,5],[1,.008,4],[2,.012,14],[0,.012,5]][pt],C=Y==="Aurora"?2:gt==="Lake"&&Y==="None"?0:1,E=t.__c256||(t.__c256=(()=>{const e=`#version 300 es
precision highp float;precision highp int;precision highp sampler2D;
`,s=e+"out vec2 vUv;void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));vUv=p;gl_Position=vec4(p*2.-1.,0.,1.);}",c=`in vec2 vUv;out vec4 o;
uniform sampler2D uN;uniform sampler2D uW;
layout(std140) uniform P{vec4 u[20];};
const float RE=6371.;
float gB=0.,gR=0.;
vec4 N(vec2 x){return texture(uN,x*.03125,gB);}
vec4 NL(vec2 x){return textureLod(uN,x*.03125,0.);}
float shellD(float s,float h){float c=2.*RE*h+h*h;return c/(RE*s+sqrt(RE*RE*s*s+c));}
uint hu(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;x^=x>>16;return x;}
vec4 h4(uint a){a=hu(a);return vec4(a&255u,(a>>8)&255u,(a>>16)&255u,a>>24)/255.;}
vec3 sky(vec3 d,float el){
  vec2 hz=d.xz/max(length(d.xz),1e-5);
  float ca=dot(hz,normalize(u[1].xz));
  float pk=exp((ca-1.)*u[17].w),pc=exp((ca-1.)*u[17].w*2.5);
  float e=max(el,0.)+.002,t=e/(u[2].y*(.06+.1*pk));
  vec3 c=mix(vec3(1.,.22,.035),vec3(1.,.5,.13),smoothstep(0.,.5,t));
  // orange, gold, a pale green, turquoise, blue: the hue turns through green, never through grey
  c=mix(c,vec3(.9,.7,.3),smoothstep(.3,.75,t));
  c=mix(c,vec3(.56,.74,.44),smoothstep(.6,1.,t));
  c=mix(c,vec3(.22,.62,.6),smoothstep(.9,1.35,t));
  c=mix(c,vec3(.12,.3,.66),smoothstep(1.4,2.8,t));
  c=mix(vec3(.5,.42,.62)*dot(c,vec3(.4,.4,.2)),c,.62+.38*pk);
  vec3 col=c*u[2].x*(.12+.5*pk+.6*pc)*exp(-t*1.05);
  col+=vec3(.014,.032,.11)*u[2].w*(1.+.7*exp(-e/.22))*(.8+.25*pk)*(1.-.8*pk*exp(-e/.09));
  return col*(1.-.5*exp(-max(el,0.)/.007));
}
float sil(float az,float el,float pa,out vec3 lt,out float far){
  lt=vec3(0.);
  float md=MDS;
  float n1=NL(vec2(az*.045,3.1)).x,n2=NL(vec2(az*.19,5.7)).y,n3=NL(vec2(az*1.9,8.3)).z;
  float gp=1.-exp(-pow((az-u[11].x+3.*(n3-.5))/u[11].y,2.));
  float base=u[10].w*(max(.55+4.*(n1-.5)+2.4*(n2-.5)+.6*(n3-.5),.08)*gp+.22*(NL(vec2(az*7.,2.)).y-.5)*smoothstep(.1,.5,gp));
  if(md>1.5&&md<2.5)base=u[10].w*smoothstep(0.,9.,(az-u[11].x)*u[12].z+4.*(n2-.5))*(.35+1.1*n1+.6*n2+.3*n3+.25*NL(vec2(az*5.,6.)).w);
  float rg=u[11].z*(.35+.9*NL(vec2(az*.03,9.2)).z+.25*n3);
  far=clamp((rg-el)/pa+.5,0.,1.);
  float cov=clamp((base-el)/pa+.5,0.,1.);
  float cw=u[10].x,ci=floor(az/cw);
  int ni=int(u[12].w);
  for(int j=0;j<ni;j++){
    float id=ci+float(j)-2.;
    vec4 h=h4(uint(int(id)+70000)*7u+uint(u[7].w));
    float x0=(id+.2+.6*h.y)*cw,H=u[10].z*(.3+1.05*h.z*h.z),ex=step(h.x,u[10].y)*step(.12,gp);H*=.45+.55*gp;
    float spr=step(h.w,u[12].z);
    if(md>1.5&&md<2.5)ex*=step(u[10].w*.3,base);
    float Wd=min(H,cw*4.);
    if(j==5){x0=u[12].x;H=u[12].y;Wd=H;ex=1.;spr=0.;h=vec4(.5,.3,.7,.9);id=37.;}
    float dx=az-x0,y=el-base*.8,yn=y/H;
    float c1;
    if(md>2.5&&j<5&&h.w>.35){
      float bw=cw*(.3+.16*h.y),Hb=u[10].z*(.2+.2*h.z);
      float top=Hb+max(bw-abs(dx),0.)*(.4+.6*h.x);
      top=max(top,step(.93,h.w)*Hb*4.*max(1.-abs(dx)/(bw*.22),0.));
      c1=clamp((top-y)/pa+.5,0.,1.)*clamp((bw-abs(dx))/pa+.5,0.,1.);
      vec2 lp=vec2((dx-(h.y-.5)*bw*1.2)*(1.+3.*gR),(y-Hb*(.2+.45*h.z))*(1.-.85*gR))/max(pa,.0035);
      float on=step(.74,fract(h.z*13.7))*(.25+1.5*fract(h.x*7.3));
      lt+=on*mix(vec3(1.,.5,.16),vec3(1.,.8,.55),step(.7,h.y))*(exp(-dot(lp,lp)*.7)*2.4+.1*exp(-length(lp)*.25));
    }else{
      float tier=NL(vec2(yn*13.+id*1.7,id*.37)).x;
      float hw=Wd*.15*pow(max(1.-yn,0.),.95)*(.4+1.15*tier);
      float cs=clamp((hw-abs(dx))/pa+.5,0.,1.)*step(-.3,yn)*step(yn,1.);
      // bog and headland pines: a thin crooked stem, sparse flat tufts, some dead
      float bg=float(md>.5&&md<1.5);
      float dt=dx-bg*H*(.6*h.y-.3)*yn*(1.2-yn);
      float tr=clamp((H*(.02-.006*bg)+.5*pa-abs(dt))/pa,0.,1.)*min(1.,H*.04/pa+.25)*step(-.3,yn)*step(yn,.85+.1*bg)*mix(1.,smoothstep(10.,30.,H/pa),bg);
      float cn=NL(vec2(dx,y)/(H*.075)+id*5.3).x;
      vec2 fs=vec2(1.+.25*bg,1.-.25*bg);
      vec2 q1=vec2(dt-(h.y-.5)*.16*H,y-.86*H)/(H*vec2(.24+.1*h.x,.13)*fs),q2=vec2(dt+(h.z-.4)*.36*H,y-.66*H)/(H*vec2(.22,.11)*fs),q3=vec2(dt-(h.x-.6)*.4*H,y-(.45+.08*h.y)*H)/(H*vec2(.19,.1)*fs);
      float cn2=NL(vec2(dx,y)/(H*.028)+id*2.9).z;
      float cr=max(max(1.-length(q1),1.-length(q2)),1.-length(q3))+(.8+.5*bg)*(cn-.5)+.5*(cn2-.5)-.1-bg*(.03+2.*step(h.x,.1));
      if(md<.5||md>2.5){vec2 qb=vec2(dx-(h.y-.5)*.1*Wd,y-.42*H)/vec2(Wd*(.24+.1*h.x),H*.56);float cb=NL(vec2(dx,y)/(H*.2)+id*3.1).y;cr=1.-length(qb)+1.1*(cn-.5)+.7*(cb-.5)-.08;}
      float cp=clamp(cr*H*.12/pa+.5,0.,1.);
      c1=mix(md<.5||md>2.5?cp:max(tr,cp),cs,spr);
    }
    cov=max(cov,c1*ex);
  }
  return cov;
}
vec3 scene(vec3 d,float az,float pa){
  float el=asin(clamp(d.y,-1.,1.)),e=max(el,.0012),se=sin(e);
  vec3 S=u[1].xyz;float tau=u[3].x;
  vec3 sk=sky(d,el),col=sk;
  vec2 hz=d.xz/max(length(d.xz),1e-5);
  // the ice sheet at 83 km
  float dist=shellD(se,83.);
  vec2 p=hz*dist*cos(e);
  vec3 Q=vec3(p.x,RE+dist*se,p.y);
  vec2 wind=u[5].xy,q=p;
  vec4 wn=N(q/170.+u[7].xy+tau*wind/340.);
  q+=(wn.xy-.5)*2.*u[5].w;
  int nV=int(u[4].y);
  for(int j=0;j<nV;j++){
    vec4 v=texelFetch(uW,ivec2(j,3),0);float sp=texelFetch(uW,ivec2(j,4),0).x;
    vec2 cc=v.xy+wind*tau,r=q-cc;
    float a=(v.w+sp*tau)*exp(-dot(r,r)/(v.z*v.z));
    float ca=cos(a),sa=sin(a);
    q=cc+vec2(ca*r.x-sa*r.y,sa*r.x+ca*r.y);
  }
  vec2 J1=dFdx(q)*(1.+gR*1.5),J2=dFdy(q)*(1.+gR*(5.+gB));
  vec4 wj=N(q/34.+u[7].zx+tau*wind/68.);
  vec2 mq=q-wind*tau;
  vec4 m1=N(mq/130.+u[7].wz),m2=N(mq/42.+u[7].xz);
  float Sw=0.,ph0=0.,bw1=0.,bw2=0.,bp=0.;
  int nW=int(u[4].x);
  for(int i=0;i<nW;i++){
    vec4 a=texelFetch(uW,ivec2(i,0),0),b=texelFetch(uW,ivec2(i,1),0),g=texelFetch(uW,ivec2(i,2),0);
    float ph=dot(a.xy,q)-a.z*tau+a.w+g.w*(mix(wj.x,wj.y,fract(float(i)*.618))-.5)*5.;
    float pw=abs(dot(a.xy,J1))+abs(dot(a.xy,J2));
    vec2 dv=(q-b.zw-g.yz*tau)/g.x;
    // bands: sharpened crests (sharpening, gain, on from the table); every other wave a plain cosine, its fade
    // from the table's x, y. Billows: a patch cut by its own channel of the wind-borne 42 km noise; where two
    // patches meet only the stronger draws, fading to nothing at the seam, so two sets never weave a net
    vec3 k=texelFetch(uW,ivec2(i,4),0).yzw;
    float cp=cos(ph),e=b.x*exp(-dot(dv,dv))*(1.-smoothstep(mix(k.x,.7,k.z),mix(k.y,2.4,k.z),pw));
    float c3=float(i)-3.*floor(float(i)/3.+.1);
    float w=e*b.y*smoothstep(.42,.6,dot(m2.xyz,step(abs(vec3(0.,1.,2.)-c3),vec3(.5))));
    bp=mix(bp,cp,step(bw1,w));bw2=max(bw2,min(w,bw1));bw1=max(bw1,w);
    Sw+=e*(1.-b.y)*mix(cp,exp((cp-1.)*k.x)*k.y-.75,k.z);
    if(i==0)ph0=ph;
  }
  Sw+=(bw1-bw2)*bp*(.8+.2*cos(ph0));
  vec2 bd=u[6].xy,fq=vec2(dot(q,bd),dot(q,vec2(-bd.y,bd.x)));
  float f1=N(fq*vec2(1./42.,1./4.5)+u[7].zw).x,f2=N(fq*vec2(1./16.,1./1.8)+u[7].yx).y;
  float fib=mix(1.,pow(max(.15+1.7*f1*(.4+1.2*f2),0.),1.6),u[5].z);
  float mm=m1.z*.62+m2.w*.38;
  float mask=smoothstep(u[6].z,u[6].z+u[6].w,mm);
  float ice=(.15+.85*mask)*(.3+.7*pow(clamp(u[4].z+.5*Sw,0.,1.7),1.5))*fib;

#if FULL
  if(u[9].x>.5){
    float sb=dot(q,u[8].xy)-u[8].z-u[8].w*tau;
    float bh=smoothstep(1.2,-1.2,sb),sn=min(sb,0.);
    ice=ice*mix(.08,.6,bh)+bh*u[9].w*fib*(.5+.5*mask)*(exp(sn/u[9].z)*pow(.5+.5*cos(sn*6.2832/u[9].y),3.)*1.5+exp(sn/3.)*.7);
  }
#endif

  float bq=dot(Q,S),pr=sqrt(max(dot(Q,Q)-bq*bq,0.));
  float lit=bq>0.?1.:smoothstep(RE+12.,RE+30.,pr);
  vec3 tint=mix(vec3(1.,.6,.42),vec3(1.),smoothstep(RE+14.,RE+42.,pr));
  float mu=dot(d,Q)/length(Q),sl=1./max(mu,.16);
  float cs=dot(d,S),hg=.64/pow(1.36-1.2*cs,1.5);
  float am=1./(se+.50572*pow(degrees(e)+6.07995,-1.6364));
  vec3 T=exp(-am*vec3(.055,.08,.14));
  col+=ice*lit*sl*(.35+.25*hg)*exp(-am*vec3(.05,.068,.1))*tint*vec3(.48,.84,1.55)*u[4].w;
  // stars
  vec2 gs=vec2(az*cos(el),el)*u[17].y,gi=floor(gs);
  vec4 hs=h4(uint(int(gi.x)+40000)*65599u+uint(int(gi.y)+9000)*31u);
  vec2 dp=(gs-gi-.15-.7*hs.yz)/(u[17].y*pa);
  float sb2=step(hs.x,u[17].x)*pow(hs.w,10.)*u[17].z*(1.-gR);
  col+=sb2*exp(-dot(dp,dp)*1.3)*mix(vec3(1.,.82,.62),vec3(.8,.9,1.),fract(hs.w*9.1))*T;
  vec2 cq=vec2((az-u[19].x)*cos(el),el-u[19].y)/pa;
  col+=u[19].z*(1.-gR)*exp(-dot(cq,cq)*.55)*vec3(1.,.88,.66)*T*(.8+.2*sin(u[3].y*7.3+u[19].w));
  // aurora (rare, its own build): an arc behind the ice, which is seen bright against it; a smooth green band with
  // a sharp lower hem and a soft top. The rays are soft pillars where the arc's top reaches higher, in bundles where
  // the arc is brightest, fading upward through dull rose to nothing; none is ever brighter than the hem under it.
  // They fan outward a little with height (toward the magnetic zenith behind the camera).
#if AUR
  {
    float D=u[15].y*(1.+.1*sin(az*1.7+u[15].w)+.06*(N(vec2(az*2.2,tau*.0003)).x-.5));
    float alt=D*tan(e)+D*D/(2.*RE),ah=alt-(102.+4.*N(vec2(az*5.,tau*.0004+2.)).z),ap=max(ah,0.);
    float pt=smoothstep(.25,.6,N(vec2(az*3.,tau*.0002+5.)).w);
    vec4 rr=N(vec2((az-(az-u[15].w*.05)*ap*.0011)*24.+tau*.001,1.3));
    float ry=smoothstep(.45,.75,rr.x)*pt;
    float A=smoothstep(-1.5,2.5,ah)*exp(-ap/(16.+ry*(25.+90.*rr.y*rr.y)))*(.75+.45*pt);
    col+=mix(vec3(.14,1.,.4),vec3(.4,.08,.13),smoothstep(25.,90.,ah)*.6)*A*u[15].z*T*1.56*exp(-ice*lit*2.);
  }
#endif

  // low cloud: a far bank of stratocumulus 50-150 km off, seen edge-on as long thin lenses lying level at two or
  // three heights (a body wherever a slow channel rises over its row's threshold, as thick as it is over, so each
  // tapers to points at both ends; a slow scallop on top, a base lost in the thick air, the farther rows paler)
  if(u[13].x>.5){
    float ed=el*57.2958,pd=pa*57.2958*(1.+3.*gR),hg=u[14].w;
    if(ed<u[13].y+2.6*hg+u[13].z*.25){
      float ad=(az*57.2958+tau*.0004)*u[13].w;
      vec4 ln=N(vec2(ad,2.3+u[7].y)),ls=N(vec2(ad*2.6,5.1+u[7].x));
      vec3 o=max(ln.xyz-u[14].xyz,0.),t=o*o/(o+.04)*u[13].z;t=t/(1.+t/(u[13].z*.09))*vec3(1.,.5,.4);
      vec3 mid=u[13].y+vec3(0.,1.,2.1)*hg+(ln.w-.5)*1.4*hg,bs=mid-.3*t,tp=mid+t*(.7+.8*(ls.xyz-.5));
      vec3 cv=clamp((tp-ed)/(4.*pd)+.5,0.,1.)*smoothstep(bs-3.*pd,bs+5.*pd,vec3(ed))*smoothstep(.0,.012,el);
      vec3 cf=clamp((ed-bs)/max(tp-bs,1e-3),0.,1.),cr=exp(-max(tp-ed,0.)/(.12*(tp-bs)+.2*pd));
      float on=smoothstep(.3,1.,dot(hz,normalize(u[1].xz)));
      vec3 k0=vec3(.012,.06,.11)+.03*cf+.1*cr*(.3+.7*on),k1=.6+.4*cf,lo=vec3(.0016,.0009,.0013)*u[2].x;
      col=mix(col,sk*k0.z+lo*k1.z,cv.z*.6);
      col=mix(col,sk*k0.y+lo*k1.y,cv.y*.8);
      col=mix(col,sk*k0.x+lo*k1.x,cv.x*.95);
    }
  }
  // silhouettes
  float es=el*(1.-.2*gR);
  if(es<.11){
    vec3 lt;float far;
    float cv=sil(az*57.2958,es*57.2958,pa*57.2958*(1.+3.*gR),lt,far);
    vec3 sc=sk*.012+vec3(.0012,.0013,.0018)*u[2].x;
    col=mix(col,col*.3+sc*3.,far*.8);
    col=mix(col,sc,cv)+lt*.6;
  }
  return col;
}
void main(){
  float tf=u[0].x,yaw=u[0].y,pa=u[0].z;
  vec2 nd=vUv*2.-1.;
  vec3 cd=normalize(vec3(nd.x*tf,(nd.y+1./3.)*tf,1.));
  float az,ps=u[18].y;
  if(ps!=0.){float pc=u[18].x;cd=vec3(cd.x,cd.y*pc+cd.z*ps,cd.z*pc-cd.y*ps);az=yaw+atan(cd.x/cd.z);}else az=yaw+atan(nd.x*tf);
  float cy=cos(yaw),sy=sin(yaw);
  vec3 d=vec3(cd.x*cy+cd.z*sy,cd.y,-cd.x*sy+cd.z*cy);
  float t=u[3].y,md=MDW;
  float dn=max(-d.y,1e-4);
  vec2 wp=d.xz*(u[16].w/dn);
  float sc=u[16].z;
  vec2 an=md>1.5?vec2(.35,1.):vec2(1.);
  vec4 r1=N(wp*an/sc+vec2(t*.05,t*.03)),r2=N(wp*an/(sc*.37)*vec2(1.,1.7)-vec2(t*.08,-t*.05));
  vec2 slp=((r1.xy-.5)*.65+(r2.zw-.5)*.45)*u[16].y*(md>1.5&&md<2.5?1.:.3+1.8*smoothstep(.45,.72,N(wp/70.+5.).z));
  vec3 nrm=normalize(vec3(-slp.x,1.,-slp.y));
  vec3 r=reflect(d,nrm);r.y=abs(r.y)+1e-4;r=normalize(r);
  float azr=az+(r.x*cos(az)-r.z*sin(az))/max(length(r.xz),1e-4);
  float pool=1.;
  if(md>.5&&md<1.5){float pm=N(wp*vec2(.07,.2)+11.).x*.65+N(wp*vec2(.25,.6)+3.).y*.35;pool=mix(smoothstep(.535,.565,pm),.3,smoothstep(25.,160.,wp.y));}
  bool bl=d.y<0.;
  // long exposure: the mirror is soft (fine ripples of the display lost), the sea softer still; bands of
  // cat's-paw lie across the lake as matt stripes that give back only the average sky
  float sea=float(md>1.5&&md<2.5);
  float rf=smoothstep(.55,.68,N(wp*vec2(.0022,.012)+vec2(7.3,u[18].z)).x)*(1.-sea)*smoothstep(.04,.12,-d.y/tf);
  if(bl){gR=1.;gB=1.6+4.6*rf+2.6*sea;r=normalize(vec3(r.x,r.y+rf*min(.3,-d.y*3.),r.z));}
  vec3 col=scene(bl?r:d,bl?azr:az,pa);
  gB=0.;gR=0.;
  if(bl){
    float ci=max(dot(-d,nrm),0.),F=.02+.98*pow(1.-ci,5.);
    float sw=sea*sin(wp.y*1.3+wp.x*.11+9.*r1.z)*exp(-length(wp)/40.);
    vec3 wc=F*col*vec3(.9,.97,1.04)*mix(.55-.15*rf,.5+.12*sw,sea)+(1.-F)*vec3(.001,.0015,.002)*u[2].x;
    if(md>.5&&md<1.5){float tx=N(wp/.9).z+.8*N(wp/.25).w+.5*N(wp/3.).x;vec3 gc=vec3(.024,.021,.014)*u[2].x*(.15+tx*tx*.8)*(.5+.5*smoothstep(.0,.06,-d.y))+col*.03;wc=mix(gc,wc,pool);}
    col=wc;
  }
  col*=u[3].z;
  float vg=1./(1.+.3*dot(nd,nd));col*=vg*vg;
  col=1.-exp(-col);
  col=pow(col,vec3(.4545));
  uvec2 ip=uvec2(gl_FragCoord.xy);uint hh=hu(ip.x*1973u+hu(ip.y*9277u+uint(u[3].y*30.)));
  float gn=float(hh&65535u)/65535.-.5+float(hh>>16)/65535.-.5;
  col+=gn*u[3].w*(.3+sqrt(col.g));
  o=vec4(clamp(col,0.,1.),1.);
}`,r=(u,i)=>{const z=t.createShader(i);return t.shaderSource(z,u),t.compileShader(z),z},p=u=>{const i=t.createProgram(),z=r(s,t.VERTEX_SHADER),ct=r(e+(u?`#define FULL 1
#define MDS u[11].w
#define MDW u[16].x
`:`#define FULL 0
#define MDS 0.
#define MDW 0.
`)+"#define AUR "+(u>1?1:0)+`
`+c,t.FRAGMENT_SHADER);return t.attachShader(i,z),t.attachShader(i,ct),t.linkProgram(i),t.flush(),{p:i,a:z,b:ct,ok:!1}},m=u=>{const i=u.p;if(u.ok)return i;if(!t.getProgramParameter(i,t.LINK_STATUS))throw new Error("256: "+(t.getShaderInfoLog(u.b)||t.getShaderInfoLog(u.a)||t.getProgramInfoLog(i)));return t.useProgram(i),t.uniform1i(t.getUniformLocation(i,"uN"),0),t.uniform1i(t.getUniformLocation(i,"uW"),1),t.uniformBlockBinding(i,t.getUniformBlockIndex(i,"P"),0),u.ok=!0,i},y={};y[C]=p(C),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_ALIGNMENT,1);const n=256,v=new Float32Array(n*n),R=new Float32Array(n*n),T=new Uint8Array(n*n*4),q=(u,i,z,ct)=>{for(let mt=0;mt<n;mt++){const nt=mt*ct;let vt=0;for(let N=-2;N<=2;N++)vt+=u[nt+(N+n&255)*z];for(let N=0;N<n;N++)i[nt+N*z]=vt*.2,vt+=u[nt+(N+3&255)*z]-u[nt+(N-2+n&255)*z]}};let st=2449585;for(let u=0;u<4;u++){for(let i=0;i<n*n;i++)st=Math.imul(st^st>>>15,739982445)+1831565813|0,v[i]=(st>>>8&65535)/65535-.5;q(v,R,1,n),q(R,v,1,n),q(v,R,1,n),q(R,v,n,1),q(v,R,n,1),q(R,v,n,1);for(let i=0;i<n*n;i++)T[i*4+u]=Math.max(0,Math.min(255,127.5+v[i]*1230))}const Ht=t.createTexture();t.bindTexture(t.TEXTURE_2D,Ht),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,n,n,0,t.RGBA,t.UNSIGNED_BYTE,T),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const Wt=t.createTexture();t.bindTexture(t.TEXTURE_2D,Wt),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,16,5,0,t.RGBA,t.FLOAT,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null);const Xt=t.createBuffer();return t.bindBuffer(t.UNIFORM_BUFFER,Xt),t.bufferData(t.UNIFORM_BUFFER,20*16,t.DYNAMIC_DRAW),t.bindBuffer(t.UNIFORM_BUFFER,null),{P:y,start:p,fin:m,tN:Ht,tW:Wt,ubo:Xt,nz:T,vao:t.createVertexArray()}})()),Kt=E.fin(E.P[C]||(E.P[C]=E.start(C))),S=new Float32Array(80),h=(e,s,c,r,p)=>S.set([s,c,r,p],e*4),Qt=2*g/H;let I=0,D=w?900:300+3e3*a();for(const e of Nt)f[e]-=G[0]*D,f[e+1]-=G[1]*D;const Ut=[-Math.sin(l),Math.cos(l)];h(4,j,zt,lt,Mt),h(5,G[0],G[1],Z,$),h(6,Ut[0],Ut[1],Rt,Tt),h(7,a()*9,a()*9,a()*9,a()*997|0),h(8,ht[0],ht[1],Vt,.06+.02*a()),kt&&(S[34]-=S[35]*D),h(9,kt?1:0,18+10*a(),60+30*a(),1.3),h(10,b[0],b[1],b[2],b[3]),h(11,b[4],b[5],b[6],b[7]),h(12,b[8],b[9],b[10],b[11]);const F=bt==="Clear"?[0,0,0,1,2,2,2,1]:bt==="One bank"?[1,1.65+.4*a(),11,.075+.02*a(),.5,.58,2,.45+.2*a()]:[1,1.4,8,.11+.03*a(),.53,.55,.55,.5],dt=Math.min(1,g/.5),Yt=g>.5?.5/g:Math.sqrt(.5/g);h(13,F[0],F[1]*dt,F[2]*dt,F[3]*Yt),h(14,F[4],F[5],F[6],F[7]*dt),h(15,Y==="Aurora"?1:0,450+150*a(),(.5+.3*a())*(X>1?3:1),a()*9),h(16,ft[0],ft[1],ft[2],pt===2?4:1.8),h(17,{"Bright night":.006,Midnight:.012,"Deep twilight":.022}[W],115,1.4*X,w?2.8:Math.max(2.8,1.5/(g*g)));const Ft={"Level horizon":0,"Low horizon":.3+.08*P(),"High horizon":-(.36+.1*P())}[Gt];if(Ft){const e=Math.atan(Ft*g);h(18,Math.cos(e),Math.sin(e),0,0)}let et=3.1;if(!w){const e=s=>E.nz[((Math.round(s*8)&255)*256+58)*4]/255;et+=S[29]*3.3;for(let s=0;s<40&&[0,.15,.3,.45].some(c=>e(et+c)>.5);s++)et+=.41}S[74]=et,h(19,-.22+.44*P(),.25+.07*P(),4*X,P()*9);const Jt=e=>[Math.sin(e)*Math.cos(J),-Math.sin(J),Math.cos(e)*Math.cos(J)],At=e=>{const s=rt+D*.004166666666666667*K,c=Jt(s);h(0,g,I,Qt,H),h(1,c[0],c[1],c[2],J),h(2,X,Ot,s,X),h(3,D,e,.9,.022*Math.sqrt(H/1e3)),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,H,H),t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.SCISSOR_TEST),t.disable(t.CULL_FACE),t.useProgram(Kt),t.bindBuffer(t.UNIFORM_BUFFER,E.ubo),t.bufferSubData(t.UNIFORM_BUFFER,0,S),t.bindBufferBase(t.UNIFORM_BUFFER,0,E.ubo),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,E.tN),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,E.tW),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.texSubImage2D(t.TEXTURE_2D,0,0,0,16,5,t.RGBA,t.FLOAT,f),t.bindVertexArray(E.vao),t.drawArrays(t.TRIANGLES,0,3)},at=e=>{const s=9*K,c=Math.sin(s),r=83,p=2*6371*r+r*r,m=p/(6371*c+Math.sqrt(6371*6371*c*c+p)),y=Math.sin(I)*m*Math.cos(s),n=Math.cos(I)*m*Math.cos(s);return(f[e*4]*y+f[e*4+1]*n-f[e*4+2]*D+f[e*4+3])/V},O=x.sound;let B=!1,M="",ut=0,Dt=0,Pt=0,St=0,ot=20,xt=0,It=Math.floor(at(0)),Bt=Math.floor(at(Math.min(2,j-1)));const qt=[57,60,62,64,67,69,72];return At(0),(e,s)=>{s=Math.min(s||0,.1);const c=x.input,r=c.taps(),p=()=>{xt+=150+120*a(),O.hit("click",.5),O.hit("noise",.12,{dur:.25,cutoff:700,at:.04})};!c.down&&!B&&r.length&&p(),c.down&&!B&&(B=!0,ut=c.x,Dt=c.y,Pt=I,St=e,M="tap"),c.down?(M!=="drag"&&M!=="hold"&&Math.hypot(c.x-ut,c.y-Dt)>.012&&(M="drag"),M==="tap"&&e-St>.35&&(M="hold",O.note(45,{dur:3,vel:.18,wave:"sine",attack:.6})),M==="drag"&&(I=Math.max(-.8,Math.min(.8,Pt-(c.x-ut)*2*Math.atan(g))))):B&&(B=!1,M==="tap"&&p(),M="");const m=B&&M==="hold"?900:20;ot+=(m-ot)*Math.min(1,s*(m>ot?1.6:3));const y=xt*Math.min(1,s*5);xt-=y,D+=s*ot+y,At(e);const n=Math.floor(at(0)),v=Math.floor(at(Math.min(2,j-1)));n!==It&&(It=n,O.note(qt[(n%3+3)%3]-12,{dur:2.2,vel:.2,wave:"sine",attack:.15})),v!==Bt&&(Bt=v,O.note(qt[(v%7+7)%7]+12,{dur:.9,vel:.07,wave:"sine",pan:Math.sin(I)}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
