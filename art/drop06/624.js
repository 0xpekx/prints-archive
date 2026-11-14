// Glacier Ice: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/624.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Ne){Ne&&Ne.add({num:624,name:"Glacier Ice",fam:"Vistas",recipe:"Wind-polished old ice deep in Antarctica, scalloped into shallow cups and cracked with white veins, with thin snow streamers and black peaks far off. The hour, the wind, the ice colour, the cracks, the snow, the sky (rarely a flat white overcast) and where you stand (from crouched by a crack to looking straight down into the ice) change every mint. No controls, just look.",music:!1,gl:!0,fps:30,seed:0,make(b){const e=b.gl,j=b.size,f=!!b.home,Ue=j>400;let U=1649089765;for(let t=2;t<66;t+=8)U=Math.imul(U^parseInt(b.hash.slice(t,t+8),16),2246822507)^U>>>13;const a=()=>{U=U+1831565813|0;let t=Math.imul(U^U>>>15,1|U);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},L=t=>{let o=0;for(const u in t)o+=t[u];let c=a()*o;for(const u in t)if(c-=t[u],c<0)return u;return Object.keys(t)[0]},ie=Math.PI*2,i=Math.PI/180,et=0,V=b.trait("Hour",f?"Midnight sun":L({"Midnight sun":44,"High pale sun":24,"Amber low sun":24,"Sun on the rim":8})),X=b.trait("Wind",f?"Thin streamers":L({"Thin streamers":46,Still:18,"Running drift":28,"Ground blizzard":8})),tt=b.trait("Ice",f?"Cobalt":L({Cobalt:42,"Grey-cyan":26,Ultramarine:22,"Old turquoise":10})),le=b.trait("Scallops",f?"Cupped":L({Cupped:40,"Deep scallops":26,"Polished smooth":22,"Fish scale":12})),ue=b.trait("Cracks",f?"Long veins":L({"Long veins":44,Web:26,Few:20,"Great rift":10})),Se=b.trait("Snow",f?"Dusted":L({Dusted:42,Bare:20,"Wind crust":28,"Crust fields":10})),Re=f?"Crystal veil":L({"Crystal veil":44,Clear:30,"High wisps":18,"Sun dogs":8}),Z=b.trait("Peaks",f?"Far range":L({"Far range":40,"Near range":22,"Thin dark line":22,"One lone nunatak":16}));let I=2065491492;for(let t=2;t<66;t+=8)I=Math.imul(I^parseInt(b.hash.slice(t,t+8),16),3266489909)^I>>>15;const q=()=>{I=I+1831565813|0;let t=Math.imul(I^I>>>15,1|I);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296};let B=f?"Into the sun":(t=>{let o=0;for(const u in t)o+=t[u];let c=q()*o;for(const u in t)if(c-=t[u],c<0)return u;return Object.keys(t)[0]})({"Into the sun":44,"Across the light":14,"Sun at your back":10,Crouched:11,"Long lens":9,"From a rise":7,"Straight down":5});const E=!f&&q()<.07;let G=1013075485;for(let t=2;t<66;t+=8)G=Math.imul(G^parseInt(b.hash.slice(t,t+8),16),668265263)^G>>>14;const ot=()=>{G=G+1831565813|0;let t=Math.imul(G^G>>>15,1|G);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},n=[];for(let t=0;t<24;t++)n.push(ot());!f&&B==="Into the sun"&&Re!=="Sun dogs"&&(B=n[0]<.18?"At a nunatak's foot":n[0]<.32?"Along a crack":B),B==="Long lens"&&X==="Ground blizzard"&&(B="From a rise"),B==="Long lens"&&(E||Z==="Thin dark line"&&V==="High pale sun")&&(B="Across the light");const p=b.trait("View",Re==="Sun dogs"&&!E?"Into the sun":B),J=b.trait("Sky",E?"Flat overcast":Re),m=[q(),q(),q(),q(),q()],s={...{"Midnight sun":{el:7.5,zen:[.016,.064,.27],hS:[.84,.7,.55],hA:[.34,.47,.76],sun:[3,2.45,1.75],amb:[.3,.4,.66],rock:[.012,.014,.022],ex:1},"High pale sun":{el:14,zen:[.026,.082,.32],hS:[.84,.84,.78],hA:[.46,.62,.88],sun:[3.1,2.95,2.6],amb:[.4,.52,.78],rock:[.014,.017,.026],ex:.92},"Amber low sun":{el:3.4,zen:[.012,.04,.2],hS:[.9,.6,.36],hA:[.26,.32,.58],sun:[2.5,1.5,.72],amb:[.22,.27,.5],rock:[.009,.009,.016],ex:1.25},"Sun on the rim":{el:1,zen:[.009,.022,.115],hS:[.82,.38,.18],hA:[.18,.22,.42],sun:[1.9,.75,.26],amb:[.15,.18,.38],rock:[.006,.006,.012],ex:1.6}}[V]};if(E){const t=s.ex;s.zen=[.36,.42,.52],s.hS=[.8,.82,.86],s.hA=[.74,.77,.84],s.sun=[.012,.012,.012],s.amb=[.62,.68,.82],s.rock=[.05,.055,.07],s.ex=Math.min(t,1.05),s.el=20}const R={Cobalt:{d:[.048,.158,.33],p:[.29,.51,.66]},"Grey-cyan":{d:[.075,.18,.3],p:[.4,.56,.68]},Ultramarine:{d:[.05,.135,.3],p:[.25,.44,.62]},"Old turquoise":{d:[.012,.15,.25],p:[.18,.5,.56]}}[tt];(V==="Amber low sun"||V==="Sun on the rim")&&(R.d=[R.d[0]*.86,R.d[1]*.98,R.d[2]*1.12],R.p=[R.p[0]*.93,R.p[1],R.p[2]*1.06]);const at={Cupped:1,"Deep scallops":1.7,"Polished smooth":.34,"Fish scale":1.15}[le],st={Cupped:3,"Deep scallops":4.2,"Polished smooth":2.6,"Fish scale":3.4}[le],nt={Cupped:.62,"Deep scallops":1.1,"Polished smooth":.22,"Fish scale":.8}[le],rt={Cupped:.78,"Deep scallops":.85,"Polished smooth":.7,"Fish scale":1.25}[le],ze={"Thin streamers":.5,Still:.12,"Running drift":.85,"Ground blizzard":1.45}[X],ct={Dusted:.55,Bare:.14,"Wind crust":.8,"Crust fields":1.15}[Se],it={Dusted:.34,Bare:0,"Wind crust":.78,"Crust fields":1.2}[Se],lt={"Long veins":.85,Web:.4,Few:.22,"Great rift":.5}[ue],ut={"Long veins":.55,Web:1.15,Few:.2,"Great rift":.35}[ue],ht=ue==="Great rift"?1:0,ft=le==="Fish scale"?1:0,mt={"Crystal veil":1,Clear:.18,"High wisps":1.6,"Sun dogs":1.1,"Flat overcast":0}[J],dt=J==="Sun dogs"?1:J==="Crystal veil"?.16:0,z=(f?13:(a()-.5)*42)*i,he=s.el*i,C=[Math.sin(z)*Math.cos(he),Math.sin(he),Math.cos(z)*Math.cos(he)],Le=f?1.22:a()*ie,xe=Math.cos(Le),Q=Math.sin(Le),Xe=f?.4:a()*ie,xt=Math.cos(Xe),pt=Math.sin(Xe),$=[a()*200,a()*200,a()*200,a()*200],vt={yaw:0,pitch:0,x:0,y:0,z:0};let h=f?0:(a()-.5)*8*i,F=(f?-6.5:-6.5+(a()-.5)*3.5)*i,y=Math.tan(31*i),M=2;const Ce=m[4]<.5?-1:1,pe=n[7]<.5?-1:1;if(!f&&(y=Math.tan((27+m[2]*9)*i),p==="Into the sun"?F=J==="Sun dogs"?s.el*i-Math.atan(y*.3):Math.max(-(3.6+m[0]*9)*i,s.el*i-Math.atan(y*.8)):p==="Across the light"?(h=z+Ce*(58+m[1]*26)*i,F=-(5+m[0]*6)*i):p==="Sun at your back"?(h=z+Math.PI+(m[1]-.5)*50*i,F=-(4+m[0]*6)*i):p==="Crouched"?(M=.32+m[3]*.12,F=-(2.2+m[0]*3.5)*i,h=z+(m[1]<.7?(m[1]-.35)*30:Ce*70)*i):p==="From a rise"?(M=10+m[3]*5,F=-(11+m[0]*8)*i,h=z+(m[1]-.5)*60*i):p==="Straight down"?(M=1.7,F=-(82+m[0]*6)*i,h=m[1]*ie,y=Math.tan(30*i)):p==="At a nunatak's foot"?(M=1.7,F=(1.5+n[1]*3)*i,h=z+pe*(50+n[2]*30)*i,y=Math.tan((30+n[3]*5)*i)):p==="Along a crack"&&(M=.42+n[3]*.2,F=-(3.4+n[4]*3)*i,h=z+pe*(16+n[5]*26)*i),(p==="Into the sun"&&J!=="Sun dogs"||p==="Crouched"&&m[1]<.7)&&(h+=n[6]<.62?pe*(11+n[8]*10)*i:0),p==="Crouched"&&m[1]>=.7&&(h=z-Ce*.75*Math.atan(y)),p==="Crouched")){const t=.55*Math.atan(y),o=Math.atan2(Math.sin(h-z),Math.cos(h-z));h=z+Math.max(-t,Math.min(t,o))}const l=e.__c624||(e.__c624={});if(!l.nt){let t=2654435769;const o=()=>(t=Math.imul(t^t>>>15,739982445),t=Math.imul(t^t>>>12,695872825),t^=t>>>15,t&255),c=new Uint8Array(256*256*4);for(let g=0;g<c.length;g++)c[g]=o();const u=e.createTexture();e.bindTexture(e.TEXTURE_2D,u),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,c),e.generateMipmap(e.TEXTURE_2D),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),l.nt=u,l.empty=e.createVertexArray(),l.fbo=e.createFramebuffer()}if(!l.P){const t=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
`,o=t+"void main(){ vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.); gl_Position=vec4(p,1.,1.); }",c=`uniform sampler2D uN;
vec4 n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.); }
float fbm(vec2 p){ return .5*n2(p).x+.25*n2(p*2.03+7.).y+.125*n2(p*4.1+19.).z+.0625*n2(p*8.3+3.).w; }
vec3 dec(vec3 c){ return c*c*2.; }
vec3 enc(vec3 c){ return sqrt(max(c,0.)/2.); }
`,u=`vec3 horiz(float az,vec3 hA,vec3 hS){ float w=smoothstep(-.35,1.,az); w*=w; vec3 h=mix(hA,hS,w*.85); return h+(hS-hA*.6)*.3*pow(max(az,0.),6.); }
`,g=t+c+u+`uniform vec3 uFX,uFY,uFZ; uniform vec2 uRes; uniform vec4 uS[8]; out vec4 o;
void main(){
  vec2 q=gl_FragCoord.xy/uRes*2.-1.;
  vec3 d=normalize(uFZ+q.x*uFX+q.y*uFY);
  float y=d.y; float lh=max(length(d.xz),1e-4); vec2 hd=d.xz/lh;
  float el=asin(clamp(y,-1.,1.)); float e=max(el,0.);
  vec3 S=uS[0].xyz; vec2 hS=normalize(S.xz);
  float az=dot(hd,hS);
  vec3 hz=horiz(az,uS[1].rgb,uS[2].rgb);
  vec3 c=mix(hz,uS[3].rgb,1.-exp(-e*9.));
  c=mix(c,uS[3].rgb*vec3(.8,.92,1.05)+uS[1].rgb*.05,smoothstep(.12,1.1,e)*.55);
  // away from a low sun: the earth's shadow, slate blue, under a pink band
  float bel=uS[2].w*pow(max(-az,0.),1.5);
  c=mix(c,c*vec3(.7,.75,.92),bel*smoothstep(.05,.0,e)*.7);
  c+=vec3(.15,.065,.075)*bel*exp(-pow((e-.085)/.045,2.));
  // the air's own low glow toward the sun
  float aS=max(dot(d,S),-1.);
  float ang=acos(clamp(aS,-1.,1.));
  c+=uS[4].rgb*(.028*exp(-ang*3.2)+.085*exp(-ang*12.));
  // a very thin veil of ice crystals: soft, warped, never combed
  float cov=0.;
  if(y>.015){
    vec2 cp=d.xz/(y+.24);
    vec2 wp=vec2(fbm(cp*.7+uS[5].xy),fbm(cp*.7+uS[5].yx+9.))-.47;
    float f=fbm(vec2(cp.x*.9+cp.y*.35,cp.y*1.7-cp.x*.6)+wp*3.+11.);
    float f2=fbm(cp*2.6+wp*5.+3.);
    cov=smoothstep(.5,.84,f*.72+f2*.28+.02)*smoothstep(.015,.2,y)*uS[5].z;
    cov*=.55+.45*smoothstep(.2,.8,fbm(cp*.35+21.));
    vec3 vc=mix(uS[1].rgb*.9+vec3(.03,.04,.06),uS[2].rgb*.62+uS[1].rgb*.42+uS[4].rgb*.04,smoothstep(.2,1.,aS));
    c=mix(c,vc,clamp(cov,0.,1.)*.3);
    // the 22-degree halo lives in the crystals
    float h22=exp(-pow((ang-.384)/.022,2.))+.35*exp(-pow((ang-.43)/.05,2.));
    c+=uS[4].rgb*.042*h22*(uS[5].w*(.5+1.2*min(cov,1.))+.03);
  }
  // the sun disc, kept small and flattened by the air when it is very low
  float elS=asin(S.y);
  float dxs=(hd.x*hS.y-hd.y*hS.x)*cos(el), dys=(el-elS)/(1.-.22*smoothstep(.035,.0,elS));
  float angD=length(vec2(dxs,dys));
  float sd=smoothstep(.0072,.0048,angD)*step(.9,aS);
  c+=uS[4].rgb*(sd*8.+.42*exp(-ang*70.)+.05*exp(-ang*22.));
  // a faint pillar through the sun, in the crystals
  { vec3 sR=normalize(vec3(S.z,0.,-S.x)); float hx=dot(d,sR), vy=el-elS;
    c+=uS[4].rgb*uS[0].w*.028*exp(-abs(hx)/.006)*exp(-abs(vy)/(vy>0.?.06:.035))*smoothstep(.0,.004,ang)*smoothstep(.6,.95,aS); }
  // sun dogs, either side of the sun, red edge inward
  if(uS[5].w>.5){ float azD=(hd.x*hS.y-hd.y*hS.x); float dg=max(abs(azD)-.38,0.); float sdog=exp(-dg*dg/.0012)*exp(-(el-S.y)*(el-S.y)/.0009)*step(.5,dot(hd,hS)); c+=uS[4].rgb*mix(vec3(1.,.62,.45),vec3(.85,.9,1.),smoothstep(0.,.05,dg))*.55*sdog; }
  if(y<0.) c=mix(c,hz*.72,smoothstep(0.,-.06,y));
  c+=uS[4].rgb*.012*exp(-ang*2.);
  o=vec4(enc(c)+(n2(gl_FragCoord.xy*.73).x-.5)/255.,0.);
}`,_=t+c+u+`uniform vec3 uFX,uFY,uFZ; uniform vec2 uRes; uniform vec4 uS[8],uP; uniform float uPx; uniform sampler2D uCl; uniform int uMode; out vec4 o;
float rdg(float x){ return 1.-abs(2.*n2(vec2(x,3.7)).x-1.); }
void main(){
  vec2 q=gl_FragCoord.xy/uRes*2.-1.;
  vec3 d=normalize(uFZ+q.x*uFX+q.y*uFY);
  float el=asin(clamp(d.y,-1.,1.));
  vec3 C=vec3(0.); float A=0., plume=0.;
  if(el<uP.w&&el>-.07){
    vec2 hd=d.xz/max(length(d.xz),1e-4);
    vec3 S=uS[0].xyz; vec2 hS=normalize(S.xz);
    float az=dot(hd,hS);
    vec3 hz=horiz(az,uS[1].rgb,uS[2].rgb);
    vec3 sunC=uS[4].rgb, sA=uS[6].rgb;
    float x0=atan(hd.x/max(abs(hd.y),1e-5)); if(hd.y<0.) x0=(hd.x>=0.?3.14159265:-3.14159265)-x0;
    // the plateau: the ice sheet rising white behind and between the peaks in long low swells
    { float pt=uP.y*(.12+1.1*n2(vec2(x0*1.7+uP.x,.3)).x*n2(vec2(x0*.6+uP.x,.9)).y*1.6+.35*n2(vec2(x0*7.+uP.x,.8)).y)+uP.z*exp(-(1.-az)/.00035);
      float m=smoothstep(pt+uPx,pt-uPx,el)*smoothstep(-.004,.0,el);
      float lt=smoothstep(.35,-.6,az);
      vec3 pc=mix(hz*.9,hz*1.02+sunC*.035+sA*.06,lt)+sunC*.03*exp(-max(pt-el,0.)/(uPx*3.+.0004))*smoothstep(-.3,.6,az);
      C=enc(pc)*m; A=m; }
    int cn=int(uS[1].a);
    for(int i=0;i<cn;i++){
      vec4 a=texelFetch(uCl,ivec2(i,0),0), b=texelFetch(uCl,ivec2(i,1),0), e=texelFetch(uCl,ivec2(i,2),0);
      float dAz=x0-a.x; dAz-=6.2831853*floor(dAz/6.2831853+.5);
      float x=dAz/a.y; float wind=a.w>0.?1.:-1.; float xw=x*wind;
      if(xw>-1.2&&xw<3.6){
        float haze=abs(a.w);
        float env=pow(max(1.-x*x,0.),.62);
        float f1=rdg(dAz*b.y*.33+b.x), f3=rdg(dAz*b.y*6.+b.x*2.3);
        float sm=n2(vec2(dAz*b.y*.21+b.x,1.3)).y, md=n2(vec2(dAz*b.y*1.3+b.x,2.9)).x;
        float ridge=pow(f1,1.5)*.55+sm*.32+md*.1+f3*.04;
        // a near nunatak is a massif: a broad wall with a few summits, not a row of spires
        if(e.x>0.){ ridge=sm*.55+f1*.27+md*.15+f3*.022; env=pow(max(1.-x*x,0.),.4); }
        float top=a.z*pow(env,1.05)*(.1+1.05*ridge);
        // the foot: on the far horizon, or down on the ice in front of us for a near nunatak
        float foot=e.x>0.?-atan(e.x/(1.+2.5*x*x)):-.07;
        float m=smoothstep(top+uPx*.6,top-uPx*.6,el)*smoothstep(foot-uPx,foot+uPx,el)*step(abs(x),1.);
//<R
        // the rock in units of the peak's own height: a relief of broken faces (two ridged scales on tilted bedding, with
        // benches), lit as a surface (its slope by finite differences, one call site), so faces turn to and from the sun
        float X=dAz/a.z, Y=el/a.z, dq=max(top-el,0.)/a.z;
        float tl=.4*sin(b.x*3.), ep=max(.03,uPx*1.5/a.z);
        vec3 hr=vec3(0.);
        for(int j=0;j<3;j++){
          vec2 P=vec2(X,Y)+(j==1?vec2(ep,0.):j==2?vec2(0.,ep):vec2(0.));
          float s=P.y+P.x*tl;
          vec2 Q=vec2(P.x*3.4+s*.5,s*1.3)+b.x;
          vec4 nA=n2(Q), nB=n2(vec2(P.x*8.5-s*1.2,s*6.)+b.x+5.);
          float bf=fract(s*4.5+nA.z*.9), bench=smoothstep(0.,.3,bf)*smoothstep(.75,.35,bf);
          hr[j]=pow(1.-abs(2.*nA.x-1.),1.25)*.55+pow(1.-abs(2.*nB.y-1.),1.6)*.36+bench*.1+nB.w*.1;
        }
        vec3 N=normalize(vec3(-(hr.y-hr.x)/ep*.22,-(hr.z-hr.x)/ep*.22,1.));
        // the sun in the rock's own frame (x right, y up, z toward us): behind the peak it lights only faces turned sideways
        float cE=sqrt(max(1.-S.y*S.y,0.)), sS=b.w*sqrt(max(1.-az*az,0.));
        vec3 Ll=normalize(vec3(sS*cE,S.y+.04,-az*cE));
        float dif=max(dot(N,Ll),0.);
        float back=smoothstep(.25,.9,az);
        float rimL=back*exp(-dq*a.z/(uPx*3.+a.z*.03));
        float sn0=n2(vec2(X*5.,Y*5.)+b.x*1.7).y;
        vec4 rt=n2(vec2(X*15.,Y*15.)+b.x); float rtex=rt.x;
        vec3 alb=uS[7].rgb*(.72+.56*rtex);
        vec3 rock=alb*(uS[3].rgb*(1.+.8*max(N.y,0.))+sA*.1+sunC*.6*dif);
        // snow: lodged on every bench and shelf, packed in the gullies between faces, a couloir or two, the apron and the lee
        float h01=clamp((el-max(foot,0.))/max(top-max(foot,0.),1e-4),0.,1.);
        float nr=step(0.,-e.x)*.5;   // far peaks: snow soft-edged and in broad bits, never flecks
        float ledge=smoothstep(.2-nr*.2,.4+nr*.3,N.y+(sn0-.5)*.45)*smoothstep(.03,.12,dq)*smoothstep(.3-nr*.5,.62,mix(rt.y,sn0,nr*1.6)*.7+sn0*.3);
        float gul=smoothstep(.42,.2,hr.x)*smoothstep(.06,.25,dq)*smoothstep(.38,.6,sn0*.6+rt.y*.4)*.7;
        float cg=n2(vec2(X*3.2+b.x*2.,7.5)).x+(sn0-.5)*.14;
        float coul=smoothstep(.86-dq*.16,.9-dq*.16,cg)*smoothstep(.06,.22,dq)*step(.35,fract(b.x*.37));
        float apron=smoothstep(.12,.0,h01)*smoothstep(.74,.9,cg+.12)*.8;
        float lee=smoothstep(.1,.0,h01)*smoothstep(.2,.8,xw)*smoothstep(.35,.6,sn0)*.6;
        float snw=clamp(max(max(ledge*.9,coul),max(max(apron,lee),gul)),0.,1.)*(e.x>0.?1.:.62-.32*back);
        vec3 Ns=normalize(N+vec3(0.,.9,0.));
        vec3 snC=sA*mix(.56,.76,Ns.y)+sunC*.42*max(dot(Ns,Ll),0.);
        vec3 col=mix(rock,snC,snw);
        col+=sunC*.6*rimL*(.35+.65*snw);
        col=mix(col,mix(hz,uS[1].rgb,.3),haze*.75);
        col=mix(hz*.96,col,e.x>0.?1.:smoothstep(0.,.16,h01));
//R>
        C=C*(1.-m)+enc(col)*m; A=A*(1.-m)+m;
        // the banner of spindrift off the crest, lit from behind into gold-white
        float u=max((xw+.15)*a.y,0.);
        float ec=a.z*.8+u*.1, th=a.z*.07+u*.12;
        float pl=exp(-pow((el-ec)/th,2.))*smoothstep(-.7,-.05,xw)*exp(-u/(a.z*1.3));
        pl*=(.45+.55*n2(vec2(u/a.z*1.4+b.x,(el-ec)/th*.45+b.x)).x)*b.z*(1.-m)*(1.-haze*.6);
        pl=clamp(pl*.95,0.,.9);
        vec3 plC=mix(hz*1.06+sA*.04,sunC*.5+hz*.55,smoothstep(-.1,.9,az));
        C=C*(1.-pl)+enc(plC)*pl; A=A*(1.-pl)+pl;
        plume=max(plume,pl);
      }
    }
  }
  o=uMode==0?vec4(C,A):vec4(0.,0.,0.,plume);
}`,Ae=t+c+`uniform vec4 uC[4],uA[18]; uniform sampler2D uGnd,uWp; out vec4 o;
void main(){
  vec2 q=gl_FragCoord.xy/uC[3].w*2.-1.;
  vec3 d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  if(d.y>-.00035) discard;
  vec3 ro=uC[0].xyz;
  float dth=uC[0].w*2./uC[3].w;
  float tt=min(ro.y/-d.y,8000.); vec2 p=ro.xz+d.xz*tt;
  vec2 rd=normalize(d.xz); float r=max(length(p-ro.xz),.02);
  float fC=tt*dth, fL=min(fC/max(-d.y,.002),max(fC,r*r/max(ro.y,.3)*dth));
  vec4 S0=uA[6];
  vec4 gB=texture(uGnd,p/460.+S0.yx*.01);
  float patc=gB.r;
//<C
  vec3 dr=refract(d,vec3(0.,1.,0.),1./1.31); vec2 sl=dr.xz/max(-dr.y,.1);
  vec4 CA=uA[10], CB=uA[11];
  // the cracks' gentle curves: a smooth warp of the plane from a tile baked once (full-size texels, so no steps when magnified)
  vec4 wp=textureLod(uWp,p/256.+S0.yx*.013,0.);
  vec2 cp=p+(wp.xy-.5)*8.+(wp.zw-.5)*.12;
  vec2 ea=CA.xy, eb=vec2(-CA.y,CA.x);
  vec2 lc=vec2(dot(cp,ea),dot(cp,eb)+uA[17].x);
  float yk=lc.y/CA.z, kk=floor(yk);
  float kl=kk-step(yk,kk+.2+.6*texelFetch(uN,ivec2(int(kk)&255,37),0).x);
  vec4 h0=texelFetch(uN,ivec2(int(kl)&255,37),0), h1=texelFetch(uN,ivec2(int(kl+1.)&255,37),0);
  float y0=(kl+.2+.6*h0.x)*CA.z, y1=(kl+1.2+.6*h1.x)*CA.z;
  float ga0=step(texelFetch(uN,ivec2((int(floor(lc.x/70.+h0.y*7.))+int(kl)*13)&255,41),0).x,CA.w);
  float ga1=step(texelFetch(uN,ivec2((int(floor(lc.x/70.+h1.y*7.))+int(kl+1.)*13)&255,41),0).x,CA.w);
  float wA0=.4+.95*n2(vec2(lc.x*.045,kl*7.3)).x, wA1=.4+.95*n2(vec2(lc.x*.045,kl*7.3+7.3)).x;
  float ym=(y0+y1)*.5, fb=lc.x/CB.x+h0.z*9., mB=floor(fb);
  // one long open crack: beside us along the view, or under us looking straight down
  vec4 SC=uA[12]; vec2 sdv=vec2(sin(SC.z),cos(SC.z)), snv=vec2(sdv.y,-sdv.x), spq=p-SC.xy; float sal=dot(spq,sdv);
  float sS=dot(spq,snv)+(wp.x-.5)*.6*smoothstep(0.,30.,sal)+(1.-step(-1.,sal)*SC.w)*1e3;
  vec2 sN=n2(vec2(sal*.08,9.)).xy;
  float crF=1.-smoothstep(14.,95.,r), scF=1.-smoothstep(60.,420.,r);
  float ln=0.,hb=0.,cu=0.,cz=0.;
  // the candidates: the two old lines bounding this strip, two younger cross cracks (so none is clipped where its cell
  // ends) and the long crack; one loop, so the crack body compiles once
  for(int k=0;k<int(uA[16].w);k++){
    float sd,W,heal=0.,Dc,fd=crF; vec2 nr=eb;
    if(k<2){ vec4 h=k==0?h0:h1; sd=k==0?(lc.y-y0)+(1.-ga0)*1e3:(lc.y-y1)-(1.-ga1)*1e3;
      W=CB.w*(.005+.009*h.w)*(k==0?wA0:wA1); heal=step(h.z,CB.z); Dc=.45*(.5+.5*h.y); }
    else if(k<4){ float mk=mB+(k==2?0.:(fract(fb)>.5?1.:-1.));
      vec4 hm=texelFetch(uN,ivec2((int(mk)*7+int(kl)*31)&255,43),0);
      float aB=(mk-h0.z*9.+.5+.5*(hm.x-.5))*CB.x, phi=(hm.y-.5)*1.3, cph=cos(phi), sph=sin(phi);
      sd=(lc.x-aB)*cph-(lc.y-ym)*sph+(1.-step(hm.z,CB.y)*ga0*ga1)*1e3; nr=ea*cph-eb*sph;
      W=CB.w*(.003+.006*hm.w); Dc=.25*(.5+.5*hm.w); }
    else { sd=sS; nr=snv; W=.004*(.6+.8*sN.x); Dc=.18+.7*sN.y; fd=scF; }
    float fp=mix(fC,fL,abs(dot(nr,rd)));
    float ww=max(W,fp*1.1);
    ln=max(ln,(1.-smoothstep(ww*.15,ww*1.25,abs(sd)))*pow(W/ww,.7)*(1.-heal)*fd);
    float Wh=W*4.+.014, wh=max(Wh,fp*.9);
    hb=max(hb,(1.-smoothstep(wh*.15,wh*1.4,abs(sd)))*min(Wh/wh,1.)*heal);
    float sp=dot(nr,sl); sp=abs(sp)>1e-3?sp:1e-3; float z=-sd/sp;
    float kc=step(0.,z)*smoothstep(Dc,Dc*.4,z)*smoothstep(0.,.012,z)*(1.-heal);
    if(kc>cu){ cu=kc; cz=z; }
  }
  hb*=1.-smoothstep(25.,170.,r);
//C>
  float fth=n2(vec2(dot(cp,ea)*2.6+dot(cp,eb)*2.6,cz*9.)).y;
  float curt=cu*(1.-smoothstep(6.,40.,r))*(.12+.88*fth*fth)*smoothstep(.6,2.5,r);
  // one great fracture zone, when the mint has it
  float halo=0.;
  if(uA[7].y>.5){
    vec2 pr=p-vec2(uA[7].z,5.5); float ca=cos(uA[7].x),sa=sin(uA[7].x);
    float along=pr.x*ca+pr.y*sa; float nrd=-pr.x*sa+pr.y*ca+(n2(vec2(along*.07,3.)).x-.5)*7.+(n2(vec2(along*.43,9.)).y-.5)*1.1;
    float W=.05+.22*n2(vec2(along*.19,1.)).z;
    float ww=max(W,mix(fC,fL,abs(sa*rd.x-ca*rd.y))*.75);
    float lr=(1.-smoothstep(ww*.5,ww,abs(nrd)))*min(1.,W/ww);
    float spl=(n2(vec2(along*1.3,nrd*9.)).x)*smoothstep(1.4,.05,abs(nrd));
    ln=max(ln,clamp(lr+spl*.32,0.,1.)*(1.-smoothstep(150.,600.,r)));
    halo=exp(-abs(nrd)/.6)*(1.-smoothstep(40.,220.,r))*.8;
  }
//<B
  // ---- the ice body: broad patches from pale grey-cyan to deep cobalt; tilted bubble bands; darker in the bottom of each cup ----
  float m1=gB.a, m2=texture(uGnd,p/37.+S0.yx*.02).a;
  float tone=smoothstep(.36,.8,m1*.86+m2*.5-.14);
  vec3 body=mix(uA[0].rgb*mix(.62,1.15,m2),uA[1].rgb*mix(.85,1.08,m2),tone*.72)*.9;
  float v=dot(p,uA[5].wz*vec2(1.,-1.))+13.*(gB.r-.5)+1.7*(n2(p*.33+S0.xy).x-.5);
  float bF=1.-smoothstep(.15,1.,fL);
  float b1=n2(vec2(v*.55,7.)).x, b2=n2(vec2(v*2.3,11.)).y, bG=smoothstep(.42,.66,n2(p*vec2(.06,.21)+13.).x);
  float fol=clamp((smoothstep(.62,.84,b1)*.45+smoothstep(.66,.8,b2)*.4*bF)*bG,0.,1.);
  body=mix(body,mix(uA[1].rgb,vec3(.86,.9,.96),.5),fol*.42);
  // a layer of old volcanic dust: a thin grey-brown stripe through the ice that runs on to the horizon
  vec4 DS=uA[13];
  vec2 dsv=vec2(sin(DS.z),cos(DS.z)); vec2 dq=p-DS.xy;
  float dsd=dot(dq,vec2(dsv.y,-dsv.x))+(n2(vec2(dot(dq,dsv)*.03,5.)).x-.5)*3.;
  float dw=.16+.22*n2(vec2(dot(dq,dsv)*.11,8.)).y, dfp=max(dw,mix(fC,fL,.5)*.7);
  float dust=exp(-dsd*dsd/(dfp*dfp))*(dw/dfp)*DS.w;
  body=mix(body,vec3(.27,.23,.19),clamp(dust,0.,1.)*.6);
  // the cracks' curtains hang in the body, milky and soft-edged
  body=mix(body,mix(uA[1].rgb,vec3(.82,.88,.95),.6),clamp(curt,0.,1.)*.5);
//B>
  body=mix(body,vec3(.74,.82,.9),clamp(hb,0.,1.)*.5);
  body=mix(body,vec3(.8,.86,.93),halo*.3);
  o=vec4(enc(body),clamp(ln,0.,1.));
}`,zt=t+c+`uniform vec4 uC[4],uA[18],uJ; uniform samplerCube uSky; uniform sampler2D uCup,uGnd,uMt; out vec4 o;
void main(){
  vec2 q=(gl_FragCoord.xy+uJ.xy-.5)/uC[3].w*2.-1.;
  vec3 d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  if(d.y>-.00035) discard;
  vec3 ro=uC[0].xyz;
  float dth=uC[0].w*2./uC[3].w;
  float tt=min(ro.y/-d.y,8000.); vec2 p=ro.xz+d.xz*tt;
  vec2 rd=normalize(d.xz); float r=max(length(p-ro.xz),.02);
  float fC=tt*dth, fL=min(fC/max(-d.y,.002),max(fC,r*r/max(ro.y,.3)*dth));
  vec4 S0=uA[6], Wn=uA[5], K=uA[8], NN=uA[9];
  // a near nunatak: the ice stops at the rock's foot (the peak pass drew the rock there) and curves up into the wind's scoop
  float moat=0.;
  if(NN.w>.5){ float ax=atan(rd.x/max(abs(rd.y),1e-5)); if(rd.y<0.) ax=(rd.x>=0.?3.14159265:-3.14159265)-ax;
    float dz=ax-NN.x; dz-=6.2831853*floor(dz/6.2831853+.5); float x=dz/NN.y;
    if(abs(x)<1.){ float Df=NN.z*(1.+2.5*x*x); if(tt>Df) discard; moat=smoothstep(Df-26.,Df,tt); } }
  vec2 wv=vec2(p.x*Wn.x+p.y*Wn.y,-p.x*Wn.y+p.y*Wn.x);
  // the ground tile (baked once): r broad patches, g drift tails, b crust ripples, a mottle
  vec2 uP=vec2(wv.x/90.,wv.y/28.)+S0.xy*.013;
  vec4 gP=texture(uGnd,uP), gPs=texture(uGnd,uP+uA[14].zw), gPu=texture(uGnd,uP-vec2(.006,0.));
  vec4 gB=texture(uGnd,p/460.+S0.yx*.01);
  float patc=gB.r;
  float cupAmt=K.y*mix(.12,1.,smoothstep(.34,.6,patc+uA[7].w));
  // the scallops: one baked tile of spoon-shaped cups (rounded crests, a steep lip upwind), read at two scales and turns
  vec2 u1=vec2(wv.x*K.z,wv.y)/K.x;
  vec4 t1=texture(uCup,u1+S0.xy*.37);
  vec2 g1=t1.xy-.5; float v1=max(t1.w*.25-dot(g1,g1),0.);
  if(K.w>.5) g1.x*=g1.x>0.?1.7:.55;
  g1.x*=K.z;
  vec2 u2=vec2(wv.x*.8-wv.y*.6,wv.x*.6+wv.y*.8)/(K.x*2.37);
  vec4 t2=texture(uCup,u2+S0.yx*.23);
  vec2 g2=t2.xy-.5; float v2=max(t2.w*.25-dot(g2,g2),0.);
  g2=vec2(g2.x*.8+g2.y*.6,-g2.x*.6+g2.y*.8);
  float a2=.45*(1.-smoothstep(.3,.7,patc))+.2;
  vec2 gc=(g1+g2*a2)*cupAmt;
  vec2 g=vec2(Wn.x*gc.x-Wn.y*gc.y,Wn.y*gc.x+Wn.x*gc.y);
  float sig2=.00045+(v1+v2*a2*a2)*cupAmt*cupAmt;
  float fM=mix(fC,fL,.3);
  float cupN=1.-smoothstep(.3,2.,fM*30.);
  float rim=smoothstep(.72,.92,t1.z)*(1.-smoothstep(.2,1.,fM*30.));
  // swells metres long under the cups: the glints come in broad bands, bright and dull
  g+=(vec2(n2(p*.16+S0.xy).x,n2(p*.16+S0.yx+9.).y)-.5)*.055;
  g+=rd*moat*.2;
  vec3 n=normalize(vec3(-g.x,1.,-g.y));
  vec4 mt=texelFetch(uMt,ivec2(gl_FragCoord.xy),0);
  vec3 body=dec(mt.rgb); float ln=mt.a;
  float cdp=cupN*smoothstep(.3,.6,patc)*min(cupAmt/.62,1.);
  body*=mix(vec3(1.),vec3(.9,.95,1.)+vec3(.14,.08,.03)*clamp(t1.z*1.6-.2,0.,1.),cdp);
  float cosT=clamp(-dot(d,n),.0,1.);
  float sig=sqrt(sig2);
  vec3 L=uA[4].xyz;
  // ---- light ----
  float ndl=dot(n,L);
  float lit=max(ndl+.3,0.)/1.3;
  float shw=smoothstep(-.4,.24,ndl);   // the lee wall of a cup is in its own soft shade
  vec3 sunC=uA[2].rgb;
  vec3 sunPart=body*sunC*vec3(.62,.86,1.25)*.58*lit*shw;
  vec3 c=body*mix(uA[3].rgb,vec3(dot(uA[3].rgb,vec3(.2126,.7152,.0722))),.55)*.66+sunPart;
  c+=sunC*.025*rim*smoothstep(L.y+.04,L.y+.16,ndl);
  // the sky in the surface: the filtered-out cups lift the mirror direction, so far ice shows mid-sky blue, not a white band
  vec3 Rv=reflect(d,n); float liftY=sig*2.3; Rv.y=max(abs(Rv.y),.012)+liftY*(1.-smoothstep(.35,.7,Rv.y)); Rv=normalize(Rv);
  vec3 sky=dec(mix(textureLod(uSky,Rv,1.).rgb,textureLod(uSky,Rv,4.).rgb,clamp(sig*9.+fL*.2-.05,0.,1.)));
  float cEff=max(cosT+sig*.45,0.);
  float F=.03+.97*pow(max(1.-cEff,0.),5.);
  F*=mix(1.,.82,clamp(fL*.4,0.,1.));
  c=mix(c,sky*.82,clamp(F,0.,1.));
  // the sun's glare: a slope distribution on the half vector; near ice has small spread, so cups glint; far ice spreads into a long road
  vec3 hv=normalize(L-d); vec2 sld=hv.xz/max(hv.y,.05)+g;
  float rough2=.0016+sig2*1.2+.0009*(1.-smoothstep(.2,.8,patc));
  sld+=(n2(p*7.3+S0.xy).xy-.5)*.07*(1.-smoothstep(2.,14.,r));
  float D=exp(-dot(sld,sld)/(2.*rough2))/(rough2*42.);
  vec3 glr=sunC*min(D,14.)*.075*(.6+.4*F)*shw;
  c+=glr; sunPart+=glr;
  // the veins: a hairline catching the light, old healed bands, the halo of the great rift
  vec3 vein=(uA[3].rgb*1.05+sunC*.11*max(L.y+.25,0.))*vec3(.98,1.,1.04);
  c=mix(c,vein,clamp(ln,0.,1.)*.9);
//<S
  // ---- snow: drift tails as a soft far texture, crust with a carved face that throws its shadow from the sun ----
  vec3 sAmb=uA[15].rgb;
  vec2 wf=wv/4.+S0.yx*.07;
  vec4 gF=texture(uGnd,wf), gFs=texture(uGnd,wf+uA[14].xy);
  float far=smoothstep(.03,.25,fL);
  float tT=.95-.4*clamp(uA[0].w/1.5,0.,1.);
  // drift tails only as a soft far texture: up close they read as white scratches (finisher)
  float tail=gF.g*.3*(1.-tT)*far*smoothstep(.3,.6,gP.a+.1);
  float tLit=smoothstep(.12,-.12,gFs.g-gF.g);
  float cth=mix(.88,.6,clamp(uA[1].w/1.2,0.,1.));
  float crust=smoothstep(cth,cth+.07,gP.r+.06*(gF.a-.5))*step(.01,uA[1].w);
  float crustS=smoothstep(cth,cth+.07,gPs.r)*step(.01,uA[1].w);
  float face=crust*(1.-smoothstep(cth,cth+.07,gPu.r));
  float sh=crustS*(1.-crust);
  c-=sunPart*sh*.5;
  float ripF=1.-smoothstep(.4,2.,fL*3.);
  float ripS=mix(1.,.72+.56*gF.b,ripF*.8);
  vec3 snLit=sAmb*.9+sunC*(.1+.45*max(L.y*1.3+.05,0.));
  vec3 snSh=sAmb*.72;
  vec3 crC=mix(snSh,snLit,mix(ripS*.85,uA[16].x,face));
  c=mix(c,crC,crust*(.9-.4*smoothstep(.72,1.,1.-t1.z)));
  c=mix(c,mix(snSh,snLit,tLit)*.8+c*.2,tail*(1.-crust));
  // dust laid in ribbons along the wind
  vec4 gD=texture(uGnd,vec2(wv.x/110.,wv.y/3.2+(gP.r-.5)*2.6)+S0.xy*.05);
  float streak=smoothstep(.7,.88,gD.r)*smoothstep(.45,.75,gP.a)*mix(1.,.6,smoothstep(40.,260.,r));
  c=mix(c,snLit*.9+body*.1,clamp(streak*uA[0].w*.6,0.,.6)*(1.-crust));
//S>
  // far off, the blue field gives way to snow
  float edge=smoothstep(.75,1.3,r/(uA[16].y+uA[16].z*patc));
  c=mix(c,snLit*.86+sAmb*.06,edge*.85);
  // far haze: the air and the blowing snow; the ice keeps brightening with distance, reaching the sky's horizon value only at the skyline
  vec3 hzc=dec(textureLod(uSky,normalize(vec3(rd.x,.02,rd.y)),2.).rgb);
  float hz=1.-exp(-pow(r/170.,1.15));
  c=mix(c,hzc,hz);
  o=vec4(enc(c)+(n2(gl_FragCoord.xy*.81).x-.5)/255.,smoothstep(0.,.0035,-d.y)*uJ.z);
}`,Ct=t+c+`uniform vec4 uC[4],uF,uW2,uAmb,uLow,uLw,uSn; uniform sampler2D uB; out vec4 o;
vec3 aces(vec3 c){ return clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.); }
void main(){
  vec4 b=texelFetch(uB,ivec2(gl_FragCoord.xy*uSn.w),0);
  vec3 c=dec(b.rgb);
  vec2 q=gl_FragCoord.xy/uC[3].w*2.-1.;
  vec3 ro=uC[0].xyz, d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  float tt=uF.x;
  if(d.y<-.0005){
    float t=-ro.y/d.y; vec3 p=ro+d*t; float r=length(p.xz-ro.xz);
    vec2 w=vec2(p.x*uW2.x+p.z*uW2.y,-p.x*uW2.y+p.z*uW2.x);
    float reach=1.-smoothstep(22.,uF.y,r);
    float snake=(n2(vec2(w.x*.11-tt*.03,w.y*.26)).x-.5)*3.4+(n2(vec2(w.x*.02-tt*.006,w.y*.05)+40.).y-.5)*24.+(n2(vec2(w.x*.7-tt*.06,w.y*.8)+9.).x-.5)*1.15;
    float lat=w.y+snake;
    float lane=smoothstep(.48,.76,n2(vec2(w.x*.05-tt*.12,lat*.62)).x);
    float gate=smoothstep(.36,.76,n2(vec2(w.x*.42-tt*.7,lat*1.3)+5.).y);
    float nr=1.-smoothstep(5.,30.,r);
    float ph=(n2(vec2(w.x*.2-tt*.45,lat*3.1)).x-.62)/(.06+.2*nr), rib=exp(-ph*ph);
    float ph2=(n2(vec2(w.x*.46-tt*.95,lat*7.)+23.).x-.65)/.05, rib2=exp(-ph2*ph2)*(1.-nr);
    float frag=smoothstep(.3,.7,n2(vec2(w.x*2.4-tt*1.9,lat*2.3)+7.).z);
    float thin=(.65*rib+.35*rib2)*frag*(1.-.7*nr);
    thin=mix(thin,thin*.5+.04,smoothstep(14.,60.,r));
    vec2 hq=d.xz/max(length(d.xz),1e-4); float az=dot(hq,uSn.xy);
    vec3 lc=mix(uLw.rgb,uLow.yzw,smoothstep(-.4,1.,az));
    c+=lc*uW2.w*reach*lane*gate*thin*smoothstep(2.,8.,r)*(.3+uLow.x*16.);
    // the drift layer, knee deep: the ray's path through it grows toward the horizon, so near ice shows through it
    float path=min(t,uLw.w/max(-d.y,1e-4));
    float od=uLow.x*path*(.2+1.1*n2(vec2(w.x*.075-tt*.6,w.y*.2)).x*(.4+.6*gate)+2.2*thin*lane);
    c=mix(c,lc,1.-exp(-od));
  } else if(b.a>.01){
    // the plumes: the baked mask, stirred by a noise blowing along the crest
    float az=atan(d.x/max(abs(d.z),1e-4));
    float s=n2(vec2(az*24.-tt*.3,d.y*90.)).x*.7+n2(vec2(az*60.-tt*.6,d.y*200.+3.)).y*.3;
    float dk=b.a*(s-.42)*1.6;
    c+=uAmb.rgb*clamp(dk,-.4,.8);
  }
  c*=uF.z;
  // tone: per channel for the darks, luminance-led for the highlights so the low sun keeps its gold
  float Lm=dot(c,vec3(.2126,.7152,.0722));
  vec3 cl=c*(aces(vec3(Lm)).x/max(Lm,1e-5));
  c=mix(aces(c),min(cl,vec3(1.)),.6*smoothstep(.35,1.4,Lm));
  c=pow(c,vec3(1./2.2));
  c+=(texture(uN,gl_FragCoord.xy/256.+uAmb.w).x-.5)/255.*1.6;
  o=vec4(c,1.);
}`,_t=t+`uniform ivec4 uI; out vec4 o;
uint hh(uvec2 c){ uint h=c.x*1597334677u^c.y*3812015801u; h=(h^(h>>16))*2246822519u; h^=h>>13; return h*668265261u^(h>>15); }
void main(){
  const float NC=16.;
  vec2 x=gl_FragCoord.xy/1024.*NC;
  x+=.22*vec2(sin(6.2832*(x.y*2./NC)+1.3*sin(6.2832*x.x/NC)),sin(6.2832*(x.x*3./NC)+.7))+.1*vec2(sin(6.2832*(x.y*7.+x.x*2.)/NC+2.),sin(6.2832*(x.x*6.-x.y*3.)/NC+.4));
  ivec2 gi=ivec2(floor(x)); float W=0.; vec2 G=vec2(0.);
  for(int j=-uI.z;j<=uI.z;j++)for(int i=-uI.z;i<=uI.z;i++){
    ivec2 ci=gi+ivec2(i,j); ivec2 cw=(ci+64)%16; uint h=hh(uvec2(cw));
    vec4 r=vec4(h&255u,(h>>8)&255u,(h>>16)&255u,h>>24)/255.;
    vec2 dv=x-(vec2(ci)+.5+(r.xy-.5)*.92);
    float s=mix(.6,1.8,r.z*r.z);
    float ax=dv.x<0.?1.35:.85;
    vec2 e=vec2(dv.x*ax,dv.y*1.15);
    float z=dot(e,e)/s+r.w*r.w*.35;
    float w=exp(-5.5*z);
    W+=w; G+=w*2.*vec2(e.x*ax,e.y*1.15)/s;
  }
  W=max(W,1e-30);
  float hgt=-log(W)/5.5;
  vec2 gb=G/W*.085;
  o=vec4(clamp(gb+.5,0.,1.),clamp(hgt*1.3+.2,0.,1.),clamp(dot(gb,gb)*4.,0.,1.));
}`,kt=t+`uniform sampler2D uN; out vec4 o;
float vn(vec2 x,int P,int s){ vec2 i=floor(x), f=fract(x); f=f*f*(3.-2.*f); ivec2 c=ivec2(i);
  vec4 a=texelFetch(uN,((c+P*64)%P+s)&255,0), b=texelFetch(uN,((c+ivec2(1,0)+P*64)%P+s)&255,0), d=texelFetch(uN,((c+ivec2(0,1)+P*64)%P+s)&255,0), e=texelFetch(uN,((c+1+P*64)%P+s)&255,0);
  return mix(mix(a.x,b.x,f.x),mix(d.x,e.x,f.x),f.y); }
void main(){ vec2 u=gl_FragCoord.xy/512.;
  o=vec4(vn(u*4.,4,0)*.7+vn(u*8.,8,40)*.3,vn(u*4.,4,90)*.7+vn(u*8.,8,140)*.3,vn(u*64.,64,7),vn(u*64.,64,77)); }`,Ft=t+`uniform ivec4 uI; uniform sampler2D uN; out vec4 o;
uint hh(uvec2 c){ uint h=c.x*1597334677u^c.y*3812015801u; h=(h^(h>>16))*2246822519u; h^=h>>13; return h*668265261u^(h>>15); }
float hv(ivec2 c,int P,uint s){ ivec2 w=(c+P*64)%P+ivec2(int(s)*37,int(s)*91); vec4 t=texelFetch(uN,w&255,0); return int(s)%2==0?t.x:t.y; }
float vn(vec2 x,int P,uint s){ vec2 i=floor(x), f=fract(x); f=f*f*(3.-2.*f); ivec2 c=ivec2(i);
  return mix(mix(hv(c,P,s),hv(c+ivec2(1,0),P,s),f.x),mix(hv(c+ivec2(0,1),P,s),hv(c+1,P,s),f.x),f.y); }
float fb(vec2 u,int P,uint s){ return (.5*vn(u*float(P),P,s)+.25*vn(u*float(P*2),P*2,s+1u)+.125*vn(u*float(P*4),P*4,s+2u)+.0625*vn(u*float(P*8),P*8,s+3u))/.9375; }
void main(){
  vec2 u=gl_FragCoord.xy/1024.;
  vec2 wu=u+.06*(vec2(vn(u*4.,4,11u),vn(u*4.,4,12u))-.5);
  float P=clamp((fb(wu,4,1u)-.5)*1.7+.5,0.,1.);
  vec2 x=u*12.; ivec2 gi=ivec2(floor(x)); float tl=0.;
  for(int j=-uI.y;j<=uI.y;j++)for(int i=-uI.x;i<=0;i++){
    ivec2 ci=gi+ivec2(i,j); uint h=hh(uvec2((ci+120)%12)+uvec2(91u,17u));
    vec4 r=vec4(h&255u,(h>>8)&255u,(h>>16)&255u,h>>24)/255.;
    vec2 dv=x-(vec2(ci)+r.xy);
    float Lt=.6+1.2*r.z, Wt=.04+.08*r.w, uu=dv.x/Lt;
    float hw=Wt*pow(max(1.-uu,0.),.8)*smoothstep(0.,.07,uu);
    float vv=dv.y/max(hw,1e-3);
    float hg=max(1.-vv*vv,0.)*pow(max(1.-uu,0.),.6)*(.45+.55*r.z)*step(0.,uu)*step(uu,1.)*step(.45,fract(r.w*7.3+r.x*3.1));
    tl=max(tl,hg);
  }
  float rp=.5+.5*sin(6.2832*(u.x*24.+2.*vn(u*vec2(4.,8.),4,21u)+.8*vn(u*vec2(12.,24.),12,22u)));
  rp=mix(.5,rp,.35+.65*vn(u*8.,8,23u));
  float M=clamp((fb(u+.3,8,31u)-.5)*1.6+.5,0.,1.);
  o=vec4(P,tl,rp,M);
}`,Je=(N,re)=>{const Y=e.createShader(N);return e.shaderSource(Y,re),e.compileShader(Y),Y},ne={},Qe=[],W=(N,re,Y)=>{const ce=Je(e.VERTEX_SHADER,re),de=Je(e.FRAGMENT_SHADER,Y),K=e.createProgram();e.attachShader(K,ce),e.attachShader(K,de),e.linkProgram(K),Qe.push([K,ce,de,N]),ne[N]=K};W("ice",o,zt),W("mat",o,Ae),W("peak",o,_),W("sky",o,g),W("frame",o,Ct),W("cup",o,_t),W("gnd",o,Ft),W("warp",o,kt),e.flush(),l.P=ne,l.shaders=Qe,l.checked=!1;const $e={};for(const N in ne){const re={},Y=e.getProgramParameter(ne[N],e.ACTIVE_UNIFORMS)||0;for(let ce=0;ce<Y;ce++){const de=e.getActiveUniform(ne[N],ce),K=de.name.replace("[0]","");re[K]=e.getUniformLocation(ne[N],de.name)}$e[N]=re}l.U=$e}const ee=l.P,r=l.U,ve=l.fbo,w=(t,o,c)=>{e.activeTexture(e.TEXTURE0+t),e.bindTexture(o,c)},ge=()=>{e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.depthMask(!0),e.colorMask(!0,!0,!0,!0),e.bindVertexArray(l.empty),e.bindBuffer(e.ARRAY_BUFFER,null),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null)},te=[],d=(t,o,c,u,g,_)=>{te.push([t*i,o*i,c*i,(E?_?.2:Math.min(.9,u*.78+.5):Math.max(.03,u*.78))*(a()<.85?Math.sign(Q)||1:-(Math.sign(Q)||1)),a()*120,22+a()*40,g,_||0])},x=E?0:X==="Still"?.3:X==="Ground blizzard"?1.1:X==="Running drift"?1:.8;if(Z==="Far range"){if(f)d(-20,9,2.1,.16,x),d(-41,11,1.2,.42,x*.7),d(-3,6,1.5,.3,x),d(28,8,2.5,.1,x),d(48,6,1,.42,x*.7);else{const t=3+Math.floor(a()*3);for(let o=0;o<t;o++)d((a()-.5)*130,5+a()*9,1.1+a()*1.7,.38+a()*.3,x)}d(120+a()*50,11,2.8,.4,x),d(150+a()*40,18,3.6,.3,x),d(205+a()*40,12,2.4,.46,x),d(250+a()*30,9,1.7,.55,x)}else if(Z==="Near range"){const t=4+Math.floor(a()*3);for(let o=0;o<t;o++)d((a()-.5)*140,6+a()*13,3+a()*3.4,.22+a()*.28,x*1.2);d(130+a()*30,16,5.2,.25,x),d(180+a()*30,24,6.5,.16,x*1.2),d(240+a()*30,14,4.2,.3,x)}else if(Z==="Thin dark line")d((a()-.5)*50,26+a()*18,.55+a()*.3,.6,x*.8),d(65+a()*40,20,.5,.68,x*.6),d(180+(a()-.5)*30,44,.9,.55,x*.8),d(-70-a()*40,18,.45,.7,x*.6);else{const t=(a()<.5?-1:1)*(10+a()*26);d(t,7+a()*5,4.2+a()*2.2,.3,x*1.4),d(t+(a()-.5)*8,12+a()*8,1+a()*.6,.62,x*.4),d(160+a()*40,22,2.2,.5,x)}const Ie=150+n[15]*110;if(p==="At a nunatak's foot"&&d((h+pe*(24+n[16]*10)*i)/i,26+n[16]*12,16+n[16]*8,.02,x*1.3+.25,Ie),p==="Long lens"){let t=null;for(const o of te){const c=Math.atan2(Math.sin(o[0]),Math.cos(o[0]));Math.abs(c)<1.4&&(!t||o[2]*(1-Math.abs(o[3]))>t[2]*(1-Math.abs(t[3])))&&(t=o)}Z==="Thin dark line"&&!E&&s.el<9?h=z+(m[1]-.5)*6*i:t&&(h=t[0]+(m[1]-.5)*t[1]*.8),y=Math.tan((7.5+m[2]*3.5)*i),F=Math.atan(y*(.3+m[0]*.25))}te.sort((t,o)=>Math.abs(o[3])-Math.abs(t[3]));const Be=e.createTexture();e.bindTexture(e.TEXTURE_2D,Be);const P=new Float32Array(3*16*4);let _e=.02;te.forEach((t,o)=>{t[7]&&(t[6]=Math.min(t[6],.55)),P[o*4]=t[0],P[o*4+1]=t[1],P[o*4+2]=t[2],P[o*4+3]=t[3],P[(o+16)*4]=t[4],P[(o+16)*4+1]=t[5],P[(o+16)*4+2]=t[6],P[(o+16)*4+3]=Math.sin(z-t[0])>=0?1:-1,P[(o+32)*4]=t[7]?M/t[7]:0,_e=Math.max(_e,t[2]*2.4)}),e.texImage2D(e.TEXTURE_2D,0,e.RGBA32F,16,3,0,e.RGBA,e.FLOAT,P),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST);const T=s.ex,gt=s.amb[0]*.2126+s.amb[1]*.7152+s.amb[2]*.0722,ye=s.amb.map(t=>t*.38+gt*.62*1.04),Ge=new Float32Array([C[0],C[1],C[2],{"Crystal veil":.8,Clear:.25,"High wisps":.5,"Sun dogs":1.1,"Flat overcast":0}[J],s.hA[0],s.hA[1],s.hA[2],te.length,s.hS[0],s.hS[1],s.hS[2],E?0:{"Midnight sun":.45,"High pale sun":.1,"Amber low sun":.85,"Sun on the rim":1.1}[V],s.zen[0],s.zen[1],s.zen[2],s.rock[0]*T+s.rock[1]*T,s.sun[0],s.sun[1],s.sun[2],0,$[0],$[1],mt,dt,ye[0],ye[1],ye[2],M,E?.1:.068,E?.095:.06,E?.095:.054,0]),yt={"Far range":.005,"Near range":.007,"Thin dark line":.0035,"One lone nunatak":.006}[Z]*(.7+.6*n[14]),wt=[n[14]*100,yt,V==="Sun on the rim"&&!E?he*.7:0,_e+.02],oe=Ue?192:96,we=e.createTexture();e.bindTexture(e.TEXTURE_CUBE_MAP,we);for(let t=0;t<6;t++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,e.RGBA8,oe,oe,0,e.RGBA,e.UNSIGNED_BYTE,null);e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const bt=[[0,0,-1,0,-1,0,1,0,0],[0,0,1,0,-1,0,-1,0,0],[1,0,0,0,0,1,0,1,0],[1,0,0,0,0,-1,0,-1,0],[1,0,0,0,-1,0,0,0,1],[-1,0,0,0,-1,0,0,0,-1]],We=(t,o,c,u,g,_)=>{e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),e.useProgram(ee.sky),w(0,e.TEXTURE_2D,l.nt),e.uniform1i(r.sky.uN,0),e.uniform2f(r.sky.uRes,t,t),e.uniform4fv(r.sky.uS,Ge),e.uniform3fv(r.sky.uFX,c),e.uniform3fv(r.sky.uFY,u),e.uniform3fv(r.sky.uFZ,g),e.drawArrays(e.TRIANGLES,0,3),e.useProgram(ee.peak),e.uniform1i(r.peak.uN,0),w(1,e.TEXTURE_2D,Be),e.uniform1i(r.peak.uCl,1),e.uniform2f(r.peak.uRes,t,t),e.uniform4fv(r.peak.uS,Ge),e.uniform4fv(r.peak.uP,wt),e.uniform1f(r.peak.uPx,o),e.uniform3fv(r.peak.uFX,c),e.uniform3fv(r.peak.uFY,u),e.uniform3fv(r.peak.uFZ,g),e.uniform1i(r.peak.uMode,0),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.drawArrays(e.TRIANGLES,0,3),_&&(e.colorMask(!1,!1,!1,!0),e.blendEquationSeparate(e.FUNC_ADD,e.MAX),e.uniform1i(r.peak.uMode,1),e.drawArrays(e.TRIANGLES,0,3),e.blendEquation(e.FUNC_ADD),e.colorMask(!0,!0,!0,!0)),e.disable(e.BLEND)};ge(),e.bindFramebuffer(e.FRAMEBUFFER,ve),e.viewport(0,0,oe,oe),w(1,e.TEXTURE_2D,null);for(let t=0;t<6;t++){const o=bt[t];e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+t,we,0),We(oe,2/oe,o.slice(0,3),o.slice(3,6),o.slice(6,9),!1),e.flush()}if(e.bindTexture(e.TEXTURE_CUBE_MAP,we),e.generateMipmap(e.TEXTURE_CUBE_MAP),!l.checked){l.checked=!0;for(const t of l.shaders)!e.getProgramParameter(t[0],e.LINK_STATUS)&&et&&console.error("624 link "+t[3]+": "+e.getProgramInfoLog(t[0])+" "+e.getShaderInfoLog(t[1])+" "+e.getShaderInfoLog(t[2]))}if(!l.cup){const t=e.getExtension("EXT_texture_filter_anisotropic");l.maxTex=e.getParameter(e.MAX_TEXTURE_SIZE)||4096;const o=(c,u,g=1024)=>{const _=e.createTexture();return e.bindTexture(e.TEXTURE_2D,_),e.texStorage2D(e.TEXTURE_2D,Math.log2(g)+1,e.RGBA8,g,g),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),t&&e.texParameterf(e.TEXTURE_2D,t.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT)||1)),ge(),e.bindFramebuffer(e.FRAMEBUFFER,ve),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,_,0),e.viewport(0,0,g,g),e.useProgram(ee[c]),w(0,e.TEXTURE_2D,l.nt),r[c].uN&&e.uniform1i(r[c].uN,0),r[c].uI&&e.uniform4i(r[c].uI,u[0],u[1],u[2],0),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,_),e.generateMipmap(e.TEXTURE_2D),_};l.cup=o("cup",[1,2,2]),l.gnd=o("gnd",[3,1,0]),l.wp=o("warp",[0,0,0],512)}const A=Math.min(j,l.maxTex),ke=e.createTexture();e.bindTexture(e.TEXTURE_2D,ke),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,A,A,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);const v=new Float32Array(16),be=new Float32Array(16),S=[1,0,0],D=[0,1,0],k=[0,0,1],Et=()=>{const t=b.view||vt,o=h+t.yaw,c=F+t.pitch,u=Math.cos(c),g=Math.sin(c),_=Math.cos(o),Ae=Math.sin(o);return k[0]=Ae*u,k[1]=g,k[2]=_*u,S[0]=_,S[1]=0,S[2]=-Ae,D[0]=k[1]*S[2]-k[2]*S[1],D[1]=k[2]*S[0]-k[0]*S[2],D[2]=k[0]*S[1]-k[1]*S[0],v[0]=t.x,v[1]=M+t.y,v[2]=t.z,v[3]=y,v[4]=S[0],v[5]=S[1],v[6]=S[2],v[7]=0,v[8]=D[0],v[9]=D[1],v[10]=D[2],v[11]=0,v[12]=k[0],v[13]=k[1],v[14]=k[2],v[15]=j,be.set(v),be[15]=A,t.yaw+","+t.pitch+","+t.x+","+t.y+","+t.z},qe=f?.96:n[9]*Math.PI,ae={"Long veins":[f?14:13+n[10]*9,.78,18+n[11]*14,.32,.35,1],Web:[7+n[10]*4,.92,6+n[11]*5,.85,.15,.8],Few:[34+n[10]*20,.55,40,.06,.6,.9],"Great rift":[24+n[10]*8,.5,30,.15,.5,.85]}[ue],Ee=p==="Straight down"?[Math.sin(h)*M/Math.tan(-F),Math.cos(h)*M/Math.tan(-F)]:[0,0];let O=[0,0,0,0];if(p==="Along a crack"){const t=h+(n[20]-.5)*5*i,o=(n[21]<.5?-1:1)*(.22+n[17]*.25);O=[Math.cos(t)*o-Math.sin(t),-Math.sin(t)*o-Math.cos(t),t,1]}else if(p==="Straight down"){const t=n[20]*ie,o=(n[17]-.5)*.5;O=[Ee[0]+Math.cos(t)*o,Ee[1]-Math.sin(t)*o,t,1]}else if(p==="Across the light"&&ue!=="Great rift"){const t=n[21]<.5?-1:1,o=h+t*(14+n[20]*16)*i,c=1.2+n[17]*1.5,u=-t*(1+n[17]);O=[Math.sin(h)*c+Math.cos(h)*u,Math.cos(h)*c-Math.sin(h)*u,o,1]}let H=[0,0,0,0];if(f)H=[0,16,-28*i,.8];else if(p==="Straight down")H=[Ee[0]+(n[19]-.5)*1.2,Ee[1]+(n[18]-.5)*1.2,n[13]*ie,.75];else if(n[12]<.5){const t=9+n[19]*16,o=n[18]<.5?-1:1;H=[Math.sin(h)*t,Math.cos(h)*t,h+o*(15+n[13]*35)*i,.5+n[13]*.5]}const Te=C[0]*xe+C[2]*Q,Fe=-C[0]*Q+C[2]*xe,fe=Math.hypot(Te,Fe)||1,Oe=Math.tan(Math.max(he,.4*i)),He=E?0:Math.min(.07/Oe,3.5),Ye=E?0:Math.min(.12/Oe,7),se=[s.amb[0]*T,s.amb[1]*T,s.amb[2]*T],Me=ye.map(t=>t*T),me=new Float32Array([R.d[0]*T,R.d[1]*T,R.d[2]*T,ct*{"Thin streamers":1,Still:.3,"Running drift":1.5,"Ground blizzard":1.7}[X],R.p[0]*T,R.p[1]*T,R.p[2]*T,it,s.sun[0]*T,s.sun[1]*T,s.sun[2]*T,at,se[0],se[1],se[2],lt,C[0],C[1],C[2],ut,xe,Q,xt,pt,$[0],$[1],$[2],Math.floor($[3])%251,(a()-.5)*1.2+Math.PI*.15,ht,(a()-.5)*5,p==="Straight down"?.3:0,st,nt,rt,ft,0,0,Ie,0,Math.cos(qe),Math.sin(qe),ae[0],ae[1],ae[2],ae[3],ae[4],ae[5],O[0],O[1],O[2],O[3],H[0],H[1],H[2],H[3],Te/fe*He/5.5,Fe/fe*He/5.5,Te/fe*Ye/90,Fe/fe*Ye/28,Me[0],Me[1],Me[2],{Dusted:.8,Bare:.12,"Wind crust":.5,"Crust fields":.4}[Se],E?.5:Math.max(.15,Math.min(1,.5-.55*Te/fe)),700,600,5,f?-7:n[22]*50,0,0,0]);for(const t of te)t[7]&&(me[36]=t[0],me[37]=t[1],me[39]=1);const Tt=Ue?3:2,Ke=[[.377,.285],[.132,.855],[.886,.425]];if(l.mat=l.mat||{},!l.mat[A]){const t=e.createTexture();e.bindTexture(e.TEXTURE_2D,t),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,A,A,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),l.mat[A]=t}const je=l.mat[A];let Ve="";const At=()=>{ge();for(let t=0;t<6;t++)w(t,e.TEXTURE_2D,null);e.bindFramebuffer(e.FRAMEBUFFER,ve),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,je,0),e.viewport(0,0,A,A),e.clearColor(.3,.38,.5,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(ee.mat),w(0,e.TEXTURE_2D,l.nt),e.uniform1i(r.mat.uN,0),w(3,e.TEXTURE_2D,l.gnd),e.uniform1i(r.mat.uGnd,3),w(4,e.TEXTURE_2D,l.wp),e.uniform1i(r.mat.uWp,4),e.uniform4fv(r.mat.uC,be),e.uniform4fv(r.mat.uA,me),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,ve),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,ke,0),e.viewport(0,0,A,A),We(A,1.5*y*2/A,[S[0]*y,S[1]*y,S[2]*y],[D[0]*y,D[1]*y,D[2]*y],k,!0),e.enable(e.BLEND),e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE),e.colorMask(!0,!0,!0,!1),e.useProgram(ee.ice),w(0,e.TEXTURE_2D,l.nt),e.uniform1i(r.ice.uN,0),w(1,e.TEXTURE_2D,null),w(1,e.TEXTURE_CUBE_MAP,we),e.uniform1i(r.ice.uSky,1),w(2,e.TEXTURE_2D,l.cup),e.uniform1i(r.ice.uCup,2),w(3,e.TEXTURE_2D,l.gnd),e.uniform1i(r.ice.uGnd,3),w(5,e.TEXTURE_2D,je),e.uniform1i(r.ice.uMt,5),e.uniform4fv(r.ice.uC,be),e.uniform4fv(r.ice.uA,me);for(let t=0;t<Tt;t++)e.uniform4f(r.ice.uJ,Ke[t][0],Ke[t][1],1/(t+1),0),e.drawArrays(e.TRIANGLES,0,3);e.disable(e.BLEND),e.colorMask(!0,!0,!0,!0),w(5,e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.flush()},St={"Thin streamers":.012,Still:0,"Running drift":.04,"Ground blizzard":.1}[X],Rt={"Thin streamers":.15,Still:.1,"Running drift":.32,"Ground blizzard":.65}[X],Pe=[0,1,2].map(t=>s.hS[t]*.62+s.sun[t]*.07),De=[0,1,2].map(t=>s.hA[t]*.55+s.amb[t]*.22),Ze=Math.hypot(C[0],C[2])||1;return(t,o)=>{const c=Et();c!==Ve&&(Ve=c,At()),ge(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,j,j),e.useProgram(ee.frame),w(0,e.TEXTURE_2D,l.nt),e.uniform1i(r.frame.uN,0),w(1,e.TEXTURE_2D,ke),e.uniform1i(r.frame.uB,1),e.uniform4fv(r.frame.uC,v),e.uniform4f(r.frame.uF,t*(.8+ze*2.2),60+ze*150,1,0),e.uniform4f(r.frame.uW2,xe,Q,2.2,.4+ze*.85),e.uniform4f(r.frame.uAmb,se[0]*.85+s.sun[0]*.06,se[1]*.85+s.sun[1]*.06,se[2]*.85+s.sun[2]*.06,t*7.13%1),e.uniform4f(r.frame.uLow,St,Pe[0],Pe[1],Pe[2]),e.uniform4f(r.frame.uLw,De[0],De[1],De[2],Rt),e.uniform4f(r.frame.uSn,C[0]/Ze,C[2]/Ze,0,A/j),e.drawArrays(e.TRIANGLES,0,3)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
