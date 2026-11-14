// Wall in Snow: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/617.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Vt){Vt&&Vt.add({num:617,name:"Wall in Snow",fam:"Vistas",recipe:"The walkway of the Great Wall after a snowy night, mostly at first light in thin fog, with battlements and square towers running along the ridges until they fade out. Where you stand, the sky, the snow and the wind change every mint. No controls, just look.",music:!1,gl:!0,fps:30,seed:0,make(R){const t=R.gl,F=R.size,_t=0,vt=_t&&(_t?{}:null)[R.home&&_t>1?"home":R.hash.slice(2,10)]||R.hash,q=!!R.home&&vt===R.hash;let B=6388241;for(let e=2;e<66;e+=8)B=Math.imul(B^parseInt(vt.slice(e,e+8),16),2246822507)^B>>>13;const tt=()=>{B=B+1831565813|0;let e=Math.imul(B^B>>>15,1|B);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<8;e++)tt();const et=e=>{let a=0;for(const o in e)a+=e[o];let n=tt()*a;for(const o in e)if(n-=e[o],n<0)return o;return Object.keys(e)[0]},_=Math.PI/180,J=(e,a,n)=>e<a?a:e>n?n:e;let O=102215974;for(let e=2;e<66;e+=8)O=Math.imul(O^parseInt(vt.slice(e,e+8),16),668265263)^O>>>15;const $t=()=>{O=O+1831565813|0;let e=Math.imul(O^O>>>15,1|O);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)$t();const Jt=e=>{let a=0;for(const o in e)a+=e[o];let n=$t()*a;for(const o in e)if(n-=e[o],n<0)return o;return Object.keys(e)[0]};let Mt=q?"Along the walkway":Jt({"Along the walkway":52,"Back up the climb":48}),ct=q?"Freezing fog":Jt({"Freezing fog":62,"A sea of fog below":13,"Snow falling":9,"Moon setting":7,"Full morning sun":9}),H=102220777;for(let e=2;e<66;e+=8)H=Math.imul(H^parseInt(vt.slice(e,e+8),16),374761393)^H>>>14;const Ut=()=>{H=H+1831565813|0;let e=Math.imul(H^H>>>15,1|H);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};for(let e=0;e<4;e++)Ut();{const e=Ut(),a=Ut();q||(Mt=e<.17?"Through a tower window":e<.31?"At the foot of a stair":e<.44?"On a tower roof":Mt,a<.045&&(ct="Hoar frost"))}const Dt=q?"First pink":et({"First pink":42,"Before the sun":22,"Rose and gold":24,"Cold white sun":12}),se={"Snow falling":"Grey, snowing","Moon setting":"Blue hour, moonset","Full morning sun":"Full morning sun","Hoar frost":"Hard blue morning"}[ct]||(ct==="A sea of fog below"&&Dt==="Before the sun"?"Rose and gold":Dt);R.trait("Hour",se);const Kt=q?"Thin and freezing":et({"Thin and freezing":38,"Valleys full":30,Clearing:20,"Closing in":12});R.trait("Fog",{"Snow falling":"Snow closing in","Full morning sun":"Burnt off","A sea of fog below":"A sea below","Hoar frost":"Lifted"}[ct]||Kt);const ie=R.trait("Snow",q?"A night of it":et({"A night of it":44,"A dusting":28,"Deep drifts":28})),le=R.trait("Wind",q?"Light, off the ridge":et({"Light, off the ridge":46,Still:24,Scouring:30})),ce=R.trait("Wall",q?"Worn":et({Worn:44,Restored:26,"Falling down":30})),fe=R.trait("Line",q?"The long ridge":et({"The long ridge":40,Switchbacks:32,"Over a high saddle":28})),ue=R.trait("Standpoint",Mt),I=R.trait("Sky",ct);let w={"First pink":{le:9.5,de:8,az:9,sun:[1,.52,.42],g:2.6,amb:[.56,.65,.88],ag:.84,h:[.98,.7,.64],z:[.3,.4,.63],disc:.95},"Before the sun":{le:3,de:-1.5,az:12,sun:[1,.5,.5],g:.55,amb:[.56,.65,.88],ag:1.08,h:[.7,.67,.76],z:[.36,.45,.64],disc:0},"Rose and gold":{le:11,de:7.5,az:17,sun:[1,.66,.42],g:2.7,amb:[.58,.64,.8],ag:.78,h:[.94,.76,.6],z:[.42,.5,.66],disc:1},"Cold white sun":{le:15,de:12,az:24,sun:[1,.91,.82],g:1.85,amb:[.7,.77,.9],ag:.86,h:[.83,.84,.86],z:[.47,.58,.76],disc:.8}}[Dt],D={"Thin and freezing":[52e-5,900,.0062,-58,50,1],"Valleys full":[6e-4,900,.0125,-14,40,1],Clearing:[42e-5,900,.0034,-85,80,.7],"Closing in":[.00185,900,.008,-20,65,1.15]}[Kt];I==="Snow falling"?(w={le:30,de:30,az:24,sun:[1,.96,.93],g:.1,amb:[.63,.67,.75],ag:1.3,h:[.74,.75,.78],z:[.62,.64,.69],disc:0},D=[.0095,900,.004,-60,60,1]):I==="Moon setting"?w={le:-2,de:-4,az:190,sun:[1,.55,.6],g:.3,amb:[.48,.58,.92],ag:.95,h:[.5,.56,.74],z:[.16,.22,.42],disc:0}:I==="Full morning sun"?(w={le:26,de:26,az:38,sun:[1,.95,.87],g:3.1,amb:[.52,.66,.96],ag:.72,h:[.8,.85,.93],z:[.28,.45,.8],disc:.6},D=[2e-4,900,.0012,-95,80,.55]):I==="Hoar frost"?(w={le:10,de:9,az:30,sun:[1,.86,.72],g:3,amb:[.46,.6,.98],ag:.74,h:[.74,.83,.96],z:[.16,.32,.72],disc:.7},D=[22e-5,900,.0016,-95,80,.6]):I==="A sea of fog below"&&(w={le:8,de:6,az:24,sun:[1,.62,.44],g:3,amb:[.56,.64,.86],ag:.8,h:[.97,.76,.64],z:[.34,.46,.7],disc:1},D=[16e-5,900,.05,-48,7,1]);const ft={"A dusting":[.065,.5],"A night of it":[.2,1],"Deep drifts":[.4,1.35]}[ie],K={Still:[.15,.25],"Light, off the ridge":[.55,1],Scouring:[1,1.9]}[le],wt={Restored:.04,Worn:.42,"Falling down":.9}[ce],X={"The long ridge":[[-5600,-850,300,1],[-4500,-700,260,0],[-3400,-900,130,0],[-2400,-520,250,1],[-1500,-620,70,0],[-900,-230,150,1],[-500,-300,20,0],[-230,-70,44,1],[-140,-38,16,0],[-62,-6,6.5,1],[-25,-1.5,1,0],[0,0,0,0],[22,-.8,-1,0],[75,-16,-15,0],[135,-34,-25,0],[200,-40,-24,0],[262,-36,-13,1],[340,-3,-5,0],[430,54,4,0],[540,108,27,1],[660,96,28,0],[820,-14,66,0],[1040,-165,96,1],[1260,-155,108,0],[1480,-25,172,0],[1750,185,238,1],[2100,255,232,0],[2500,-40,320,0],[2900,-300,392,1],[3400,-60,370,0],[3900,300,470,1],[4600,-20,430,0],[5600,-190,620,1],[6800,160,560,0]],Switchbacks:[[-5600,-300,260,1],[-4e3,-1050,150,0],[-2600,-200,280,1],[-1500,-700,40,0],[-900,-120,150,1],[-500,-380,25,0],[-240,-120,48,1],[-130,-20,12,0],[-58,10,6,1],[-24,1.5,1,0],[0,0,0,0],[24,3,-1,0],[80,26,-12,0],[140,62,-22,0],[220,90,-10,1],[320,10,-20,0],[420,-78,8,0],[520,-122,36,1],[650,-20,22,0],[790,120,64,0],[930,180,108,1],[1100,40,96,0],[1320,-205,142,0],[1540,-300,204,1],[1820,-60,196,0],[2200,280,256,0],[2600,330,350,1],[3e3,-40,336,0],[3500,-460,424,1],[4200,-80,420,0],[5100,380,590,1],[6800,0,540,0]],"Over a high saddle":[[-5600,-500,340,1],[-4e3,-950,220,0],[-2600,-380,320,1],[-1500,-700,120,0],[-900,-260,220,1],[-500,-340,70,0],[-240,-90,62,1],[-130,-34,22,0],[-58,-5,7,1],[-22,-1,1,0],[0,0,0,0],[22,.5,-1.5,0],[85,-8,-24,0],[160,-26,-46,0],[250,-10,-58,0],[340,36,-38,0],[430,62,-8,1],[560,28,40,0],[700,-40,98,0],[860,-60,170,1],[1040,40,176,0],[1250,160,236,0],[1500,110,332,1],[1800,-110,326,0],[2150,-200,400,0],[2550,50,500,1],[3100,240,470,0],[3700,-60,590,1],[4600,-260,520,0],[5600,120,700,1],[6800,0,640,0]]}[fe].map((e,a)=>{const n=Math.abs(e[0])<360,o=1+Math.abs(e[0])/2e3;return[e[0],e[1]+(n?0:(tt()-.5)*34*o),e[2]+(n?0:(tt()-.5)*22*o),e[3]]}),Lt=X.length,Qt=(e,a)=>{const n=X[Math.max(e-1,0)],o=X[Math.min(e+1,Lt-1)];return(o[a]-n[a])/Math.max(o[0]-n[0],1)};let Q=0;const he=e=>{if(e<X[0][0])return 0;for(;Q>0&&X[Q][0]>e;)Q--;for(;Q<Lt-2&&X[Q+1][0]<=e;)Q++;return Q},E=(e,a,n)=>{const o=Math.min(he(e),Lt-2),r=X[o],l=X[o+1],i=l[0]-r[0],s=J((e-r[0])/i,0,1),c=Qt(o,a)*i,g=Qt(o+1,a)*i,v=s*s,S=v*s;return n?((6*v-6*s)*r[a]+(3*v-4*s+1)*c+(6*s-6*v)*l[a]+(3*v-2*s)*g)/i:(2*S-3*v+1)*r[a]+(S-2*v+s)*c+(3*v-2*S)*l[a]+(S-v)*g},T=4096,ut=30,Z=Math.sqrt(1+7e3/ut)-1,qt=e=>{const a=(e/(T-1)*2-1)*Z;return Math.sign(a)*ut*((1+Math.abs(a))*(1+Math.abs(a))-1)},It=e=>e-Math.floor(e),ot=X.filter(e=>e[3]).map(e=>{const a=E(e[0],1,!0),n=It(Math.sin(e[0]*12.9898+.7)*43758.5453),o=It(Math.sin(e[0]*7.233+2.1)*24634.6345),r=It(Math.sin(e[0]*3.917+5.3)*15731.743),l=5+1.3*n,i=Math.max((8.8+3.2*o)*(1-wt*.4*n),7.6),s=wt>.8&&r<.55&&Math.abs(e[0])>120?1:0;return[e[0],e[1],Math.atan(a),e[2],l,i,s]}),k=new Float32Array(T*3*4);{const e=(T-1)/2;let a=0,n=0,o=E(0,1);for(let r=Math.ceil(e);r<T;r++){const l=qt(r),i=E(l,1);a+=Math.hypot(l-n,i-o),n=l,o=i,k[r*4+3]=a}a=0,n=0,o=E(0,1);for(let r=Math.ceil(e)-1;r>=0;r--){const l=qt(r),i=E(l,1);a-=Math.hypot(l-n,i-o),n=l,o=i,k[r*4+3]=a}for(let r=0;r<T;r++){const l=qt(r);k[r*4]=E(l,1),k[r*4+1]=E(l,2),k[r*4+2]=E(l,1,!0);let i=ot[0],s=1e12;for(const v of ot){const S=Math.abs(v[0]-l);S<s&&(s=S,i=v)}const c=(T+r)*4;k[c]=i[0],k[c+1]=i[1],k[c+2]=i[2],k[c+3]=i[3];const g=(T*2+r)*4;k[g]=E(l,2,!0),k[g+1]=i[4],k[g+2]=i[5],k[g+3]=i[6]}}const p={"Along the walkway":{z:13,u:.45,yaw:0,pitch:-9.5,aim:1},"Back up the climb":{z:2,u:-.3,yaw:189,pitch:3.5},"Through a tower window":{tw:-1,pitch:-5},"At the foot of a stair":{tw:-2},"On a tower roof":{tw:1}}[ue];if(p.tw){const e=p.tw===-1?ot.find(r=>r[0]<-30&&r[0]>-130):p.tw===-2?ot.filter(r=>r[0]<-150).pop():ot.find(r=>r[0]>100),a=Math.sin(e[2]),n=Math.cos(e[2]),o=(r,l)=>[e[1]+r*n+l*a,e[0]-r*a+l*n];if(p.tw===-1){const[r,l]=o(0,e[4]),i=e[3]+Math.max(e[5]*.62,5.2)-.05;let s=E(55,1)-r,c=E(55,2)+.6-i,g=55-l;const v=Math.hypot(s,g);p.P=[r-s/v*3.5,i+.25,l-g/v*3.5],p.yaw=Math.atan2(s,g)/_,p.pitch=Math.atan2(c,v)/_+6}else if(p.tw===1){const r=e[0]-80,l=E(r,1)-e[1],i=r-e[0],s=Math.hypot(l,i),c=e[3]+e[5]+1.9;p.P=[e[1]+l/s*(e[4]+.25),c,e[0]+i/s*(e[4]+.25)],p.yaw=Math.atan2(l,i)/_-6,p.pitch=Math.atan2(E(r,2)-c,s)/_+7}else{const r=e[0]+34,l=E(r,1)-.4,i=E(r,2)+ft[0]*1.1+1.58;p.P=[l,i,r];const s=e[1]-l,c=e[0]-r,g=e[3]+2.4-i;p.yaw=Math.atan2(s,c)/_,p.pitch=Math.atan2(g,Math.hypot(s,c))/_+9}}if(p.aim){const e=ot.find(a=>a[0]>60);p.yaw=Math.atan2(e[1]-E(p.z,1),e[0]-p.z)/_+4}const Zt=p.yaw*_,me=p.pitch*_,at=Math.tan(27*_),gt=((I==="Moon setting"?p.yaw+191.5:w.az)-1.5)*_,Xt=w.le*_,Gt=w.de*_,rt=[Math.sin(gt)*Math.cos(Xt),Math.sin(Xt),Math.cos(gt)*Math.cos(Xt)],Ct=[Math.sin(gt)*Math.cos(Gt),Math.sin(Gt),Math.cos(gt)*Math.cos(Gt)],ht=`#version 300 es
precision highp float; precision highp int;
out vec2 vUv;
void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); vUv=p; gl_Position=vec4(p*2.-1.,0.,1.); }`,bt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,Bt=bt+`
uniform sampler2D uN,uPt;
uniform vec4 uCam,uFw,uRt,uUp,uJ,uSun,uTr;
in vec2 vUv; layout(location=0) out vec4 o;
const float PER=2.87;
float gJ=0.; float gDet=1.; float gFo=0.,gFoS=0.,gFar=1.,gTd=0.; vec4 P0,P1,P2; float gM,gS,gT,gTw; vec4 gQ;
float hash(float x){ return fract(sin(x*127.13)*43758.5453); }
void path(float z){
  float w=sqrt(1.+abs(z)/${ut}.)-1.;
  float f=clamp((sign(z)*w+${Z.toFixed(6)})/${(2*Z/(T-1)).toFixed(9)},0.,${T-2}.);
  int i=int(f); float k=f-float(i);
  P0=mix(texelFetch(uPt,ivec2(i,0),0),texelFetch(uPt,ivec2(i+1,0),0),k);
  P1=texelFetch(uPt,ivec2(i,1),0);
  P2=texelFetch(uPt,ivec2(i,2),0);
  P2.x=mix(P2.x,texelFetch(uPt,ivec2(i+1,2),0).x,k);
}
float smin(float a,float b,float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
float box2(vec2 p,vec2 b){ vec2 d=abs(p)-b; return length(max(d,0.))+min(max(d.x,d.y),0.); }
float box3(vec3 p,vec3 b){ vec3 d=abs(p)-b; return length(max(d,0.))+min(max(d.x,max(d.y,d.z)),0.); }
// ridge system
float ridge(float d,float base,float w){ float x=d/w; return -380.+(base+380.)*exp(-x*x); }
float terr(vec2 xz,float u,float a){
  float b=max(a-4.2,0.);
  float h=P0.y-5.4-.9*b*exp(-b/24.)-320.*(1.-exp(-b/250.));
  float x=xz.x,z=xz.y;
  float r1=ridge(x-430.-120.*sin(z*.0011+.8),30.+90.*sin(z*.0016+.4)+60.*sin(z*.0037),420.);
  float r2=ridge(x+560.-140.*sin(z*.0013+2.2),60.+70.*sin(z*.0019+1.1),470.);
  float r3=ridge(x-1450.-260.*sin(z*.0007+.2),250.+130.*sin(z*.0011+3.3),640.);
  float r4=ridge(x+1650.-240.*sin(z*.0006+1.4),300.+140.*sin(z*.0009+.4),700.);
  float r5=ridge(x-3100.-480.*sin(z*.0004+2.),520.+200.*sin(z*.0007+1.2),920.);
  float r6=ridge(x+3500.-520.*sin(z*.00035+.5),560.+210.*sin(z*.0006+2.8),960.);
  h=max(h,max(max(r1,r2),max(max(r3,r4),max(r5,r6))));
  float f=smoothstep(10.,120.,b);
  h+=(textureLod(uN,xz*vec2(.00137,.0007),0.).r-.5)*150.*f;
  // ribs and gullies: ridged noise at a few hundred metres, then a broken rock step
  float rn=1.-abs(textureLod(uN,xz*vec2(.0029,.0021)+.61,0.).g*2.-1.);
  h+=(rn*rn-.45)*40.*f;
  h+=(textureLod(uN,xz*vec2(.0071,.0044),0.).g-.5)*16.*f;
  float ts=11.,th=h/ts; float stp=(floor(th)+smoothstep(.25,.75,fract(th)))*ts;
  h=mix(h,stp,.32*f*smoothstep(.45,.7,textureLod(uN,xz*.0013+.2,0.).a));
  h+=(textureLod(uN,xz*.031+.3,0.).b-.5)*3.2*smoothstep(4.,40.,b);
  return h;
}
float towerD(vec3 p,float ruin){
  float tz=P1.x,tx=P1.y,ta=P1.z,ty=P1.w;
  vec2 d=p.xz-vec2(tx,tz);
  float sa=sin(ta),ca=cos(ta);
  vec2 q=vec2(d.x*ca-d.y*sa,d.x*sa+d.y*ca);
  float y=p.y-ty;
  float hw=P2.y,ht=P2.z;
  float d0=box3(vec3(q.x,y-ht*.5+6.,q.y),vec3(hw,ht*.5+6.,hw))-.06;
  // a plinth course and a string course between the storeys
  d0=min(d0,box3(vec3(q.x,y-ht*.42,q.y),vec3(hw+.12,.14,hw+.12))-.02);
  {
    // hollow, with a door through the wall line and a row of arched windows on every side of the upper storey
    float inn=box3(vec3(q.x,y-ht*.5+3.,q.y),vec3(hw-.95,ht*.5+2.6,hw-.95));
    float dr=box2(vec2(q.x,y-1.25),vec2(.95,1.35));
    dr=min(dr,length(vec2(q.x,y-2.6))-.95);
    float cut=max(dr,abs(q.y)-hw-1.);
    vec2 ab=abs(q); bool sx=ab.x>ab.y;
    vec2 wq=vec2(sx?q.y:q.x,y-max(ht*.62,5.2)); float cell=2.65;
    wq.x=mod(wq.x+cell*.5,cell)-cell*.5;
    float w2=box2(wq-vec2(0.,-.35),vec2(.55,.8));
    w2=min(w2,length(wq-vec2(0.,.45))-.55);
    w2=max(w2,abs(max(ab.x,ab.y)-hw)-1.2);
    w2=max(w2,abs(sx?q.y:q.x)-hw+1.3);
    d0=max(d0,-min(min(cut,w2),inn));
    // battlements round the roof
    float cren=mod(q.x+q.y+11.,1.9)-.95;
    float rim=box3(vec3(q.x,y-ht-.6,q.y),vec3(hw+.05,.6,hw+.05));
    rim=max(rim,-box3(vec3(q.x,y-ht-.6,q.y),vec3(hw-.45,1.,hw-.45)));
    rim=max(rim,-max(abs(cren)-.34,ht+.62-y));
    d0=min(d0,rim);
    // one wall fallen: the shell broken down on one side in a slope of rubble
    if(P2.w>.5) d0=max(d0,-(hw*.3-q.y-(y-ht*.3)*.6+sin(q.x*1.7)*.4));
  }
  return d0;
}
float snowTop(float u,float s){
  float n1=textureLod(uN,vec2(s*.027,u*.09),0.).r;
  float D=uTr.x,wl=uTr.y;
  float base=D*(.8+.4*n1);
  // banked against the windward (outer) parapet in a curved drift with a sharp crest, scooped where it meets the wall
  float bk=smoothstep(.2,2.05,u+(n1-.5)*.5); bk*=bk;
  base+=D*(.25+1.45*wl)*bk*(1.-.42*smoothstep(1.98,2.36,u))*(.75+.5*n1);
  // and scoured from a strip down the lee (inner) parapet to the paving
  float n3=textureLod(uN,vec2(s*.031,.77),0.).b;
  float sc=smoothstep(-.95,-1.85,u+(n3-.5)*.9)*smoothstep(.12,.5,wl);
  base*=1.-sc*.8;
  if(gDet>.01){
    // a drift form at a few metres, then low wind ridges all lying one way
    float d1=textureLod(uN,vec2(s*.11+u*.03,u*.14)+.11,0.).r;
    float aw=s*.8-u*.6,cw=s*.6+u*.8;
    float d2=textureLod(uN,vec2(aw*.9,cw*.32)+.71,0.).g;
    base+=gDet*((d1-.5)*.45*D+(d2-.5)*(.05+.06*wl)*sqrt(D/.2))*(1.-sc);
  }
  return max(base,-.02);
}
float wall(vec3 p,float u,float v,float s,float a){
  float lod=clamp(gTd/150.,1.,2.2), PL=PER*lod;
  float k=floor(s/PL),f=s/PL-k;
  float ruin=uTr.w,wl=uTr.y;
  // the broken parts of the wall lie along it in long stretches
  float rz=textureLod(uN,vec2(s*.011,.1),0.).r;
  float bro=smoothstep(.62-ruin*.3,.3-ruin*.25,rz)*ruin;
  float hO=1.0-bro*.72,hI=.98-bro*.55-.09*textureLod(uN,vec2(s*.09,.7),0.).g;
  float uo=u-2.62, ui=u+2.58;
  float body=max(a-2.95-max(-v,0.)*.06,v-gFo);
  float near=gDet>.01?1.:0.;
  float capn=.5,capn2=.5;
  if(gDet>.01){ capn=textureLod(uN,vec2(s*.21,.3),0.).g; capn2=textureLod(uN,vec2(s*.12,.2),0.).b; }
  float capT=uTr.x*(.45+.8*capn);
  float dm=9e9,cmN=9e9;
  float dO,dI;
  {
    // two cells, this merlon and its nearest neighbour, so grazing rays along the wall cannot step past one
    for(int j=0;j<2;j++){
      float kj=k+(j==0?0.:(f<.5?-1.:1.));
      float r=hash(kj),r2=hash(kj+.37);
      float ms=(s/PL-kj-.5)*PL;
      float w=PL*(.36-.04*r);
      float hmj=(1.78-bro*(1.-.2*r))*(1.-.14*r);
      hmj=hO+(hmj-hO)*lod;
      float m=box3(vec3(ms,v-hmj*.5,uo),vec3(w,hmj*.5,.3))-.012;
      // a sloped brick coping a finger proud of the face, and a square loophole near the foot
      m=min(m,box3(vec3(ms,v-hmj+.04+uo*.1,uo),vec3(w+.03,.045,.33))-.008);
      m=max(m,-box3(vec3(ms+(r2-.5)*.5,v-hO-.34,uo),vec3(.085,.11,.5)));
      dm=min(dm,m);
      // the night's snow on it, shaped by the wind: thin on the windward edge, thick and overhanging to lee,
      // sagging at the corners, never a flat underside
      float lee=clamp(.5-uo*1.5-ms/w*.22,0.,1.);
      lee=mix(.55,lee,wl);
      float r3=hash(kj+.71);
      float am=r3<.33?.22+.3*r3:.75+.6*r3;
      float mx=clamp(abs(ms+.06*wl)/w,0.,1.);
      float sag=1.-.75*mx*mx*(.6+.4*mx);
      float xa=(uo+.06*wl)/(.33+.07*wl);
      float H=capT*am*(.22+1.15*lee)*sag*(.7+.6*r2)*sqrt(max(1.-xa*xa,0.))*(1.+.12*sin(ms*5.3+r*9.)); H=H/(1.+1.5*H)+.012;
      float fp=box2(vec2(ms-.05*wl,uo+.06*wl),vec2(w+.03,.3+.07*wl))-.03;
      float cp=max((v-hmj-.03-H)*.72,fp);
      cp=max(cp,hmj-.035-(.12+.05*sin(ms*6.1+r2*7.))*lee*am*smoothstep(-.28,-.4,uo)-v);
      cmN=min(cmN,cp);
    }
    // the parapet under the merlons, its sill sloping out; snow lies on the sills in the gaps
    float dg=max(box2(vec2(uo,v-(hO-2.)*.5),vec2(.3,(hO+2.)*.5+.07)),(v-hO+uo*.22)*.98);
    dO=min(dm,dg);
    float sill=max((v-hO+uo*.22-capT*.42*(.55+.6*clamp(-uo*2.+.5,0.,1.)))*.72,box2(vec2(uo+.03,0.),vec2(.32,9.))-.02);
    cmN=min(cmN,max(sill,hO-.09-v));
    if(gDet>.01){
      float en=(textureLod(uN,vec2(s*.37+u*.2,v*.41),0.).r-.5);
      dO+=en*.035*gDet;
      // ragged ruin: bites out of the tops
      if(bro>.01){ float nb=textureLod(uN,vec2(s*.31,v*.53),0.).a; dO=max(dO,(v-hO*.5-(nb*1.6-.3)*(1.78-.5*hO))*.7); }
    }
    // the low inner parapet, with a drain hole at its foot every few metres
    dI=box2(vec2(ui,v-(hI-2.)*.5),vec2(.17,(hI+2.)*.5))-.012;
    dI=max(dI,-box3(vec3(mod(s+1.3,5.7)-2.85,v-gFo-.14,ui),vec3(.1,.08,.4)));
  }
  float dB=min(body,min(dO,dI));
  gM=dB;
  // snow
  float dS;
  if(gDet>.01){
    float top=snowTop(u,s);
    dS=(v-gFoS-top)*.8;
    dS=max(dS,a-2.47);
    // a soft unbroken roll along the inner parapet, leaning to lee
    float rw=.2+.05*wl, rx=ui+.04*wl;
    float ci=max((v-hI-capT*(.5+.25*capn)*sqrt(max(1.-rx*rx/(rw*rw),0.))-.01)*.75,abs(rx)-rw);
    ci=max(ci,hI-.03-v);
    dS=min(dS,min(cmN,ci));
    // snow plastered on the outer faces where the wind drove it
    float pl=textureLod(uN,vec2(s*.09,v*.24)+.2,0.).b;
    dS=min(dS,box2(vec2(uo-.34,v-hO*.5),vec2(.03,hO*.46))+.008-(pl-.55)*.03*uTr.y);
  } else {
    dS=(v-gFo-uTr.x*(.85))*.85;
    dS=max(dS,a-2.47);
    dS=min(dS,cmN);
  }
  gS=dS;
  return smin(dB,dS,.05);
}
float map(vec3 p){
  path(p.z);
  float c=1./sqrt(1.+P0.z*P0.z);
  float u=(p.x-P0.x)*c,v=p.y-P0.y,a=abs(u);
  // the walk climbs in steps: treads level, a riser wherever the crest has gained a tread's worth
  float g=P2.x*c, gs=g*smoothstep(.07,.15,abs(g)), fs=fract(P0.w/.82);
  gFo=-gs*.82*(fs-.5); gFoS=-gs*.82*(fs-smoothstep(.8,1.,fs)-.5);
  gQ=vec4(u,v,P0.w,gFoS);
  float dT=(p.y-terr(p.xz,u,a))*.36;
  gT=dT; gM=9e9; gS=9e9; gTw=9e9;
  float dW=max(a-9.,v-34.);
  if(a<22.&&v<70.){
    dW=wall(p,u,v,P0.w,a);
    float dTw=towerD(p,uTr.w);
    gTw=dTw;
    dW=smin(dW,dTw,.05);
  }
  return min(dT,dW);
}
void main(){
  vec3 rd=normalize(uFw.xyz+uRt.xyz*((vUv.x*2.-1.)*uUp.w+uJ.x*uCam.w)+uUp.xyz*((vUv.y*2.-1.)*uUp.w+uJ.y*uCam.w));
  vec3 ro=uCam.xyz;
  gJ=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))+uJ.z));
  // one loop, one map call site: march, then hit data, normal, occlusion, sun ray in turn
  int ph=0,ci=0;
  float t=.06,tt=0.,sh2=1.,occ=0.,wo=1.,ro2=.06,aoS=1.,eN=0.,ndotS=0.;
  vec3 hp=vec3(0.),N0=vec3(0.); vec4 q=vec4(0.);
  float mt=9e9,ms=9e9,mm=9e9,mw=9e9; vec4 P1h=vec4(0.),P0h=vec4(0.),P2h=vec4(0.);
  bool hit=false;
  for(int it=0;it<236;it++){
    vec3 p0;
    if(ph==0){ p0=ro+rd*t; if((p0.y>1400.&&rd.y>0.)||t>26000.) break; gDet=clamp((95.-t)/18.,0.,1.); gFar=t<1100.?1.:0.; gTd=t; }
    else if(ph==1) p0=hp;
    else if(ph==2){ vec3 k=vec3(ci==0||ci==3?1.:-1.,ci<2?-1.:1.,ci==1||ci==3?1.:-1.); p0=hp+k*eN; }
    else if(ph==3){ p0=hp+N0*ro2; gDet=t<95.?1.:0.; }
    else { gDet=tt<34.&&t<95.?1.:0.; p0=hp+N0*(.045+.002*t)+uSun.xyz*tt; }
    float d=map(p0);
    if(ph==0){
      if(d<.0005*t+.0015){ hit=true; hp=ro+rd*t; gDet=clamp((95.-t)/18.,0.,1.); ph=1; }
      else t+=d*.9+.0009*t;
    } else if(ph==1){
      mt=gT; ms=gS; mm=gM; mw=gTw; q=gQ; P1h=P1; P0h=P0; P2h=P2; eN=max(.0016,t*.0009); N0=vec3(0.); ci=0; ph=2;
    } else if(ph==2){
      vec3 k=vec3(ci==0||ci==3?1.:-1.,ci<2?-1.:1.,ci==1||ci==3?1.:-1.); N0+=k*d; ci++;
      if(ci==4){ N0=normalize(N0+vec3(1e-7,3e-7,-2e-7)); ci=0; ph=3; ro2=.06*(t<60.?1.:clamp(t/90.,1.,14.)); occ=0.; wo=1.; }
    } else if(ph==3){
      occ+=(ro2-min(d,ro2))*wo/ro2; wo*=.62; ro2*=3.15; ci++;
      if(ci==4){ aoS=clamp(1.-occ*.48,.03,1.); ndotS=dot(N0,uSun.xyz); tt=(.05+.014*t)*(1.+.7*gJ); sh2=1.; if(ndotS>-.18) ph=4; else { sh2=0.; break; } }
    } else {
      float dd2=d+.0035*t;
      sh2=min(sh2,dd2*(tt<6.?3.2:7.)/tt+.05*smoothstep(0.,1.2,tt));
      if(sh2<.02) break;
      tt+=clamp(dd2*.85,.025+.035*tt,180.);
      if(tt>=3200.) break;
    }
  }
  if(!hit){ o=vec4(-1.,0.,0.,0.); return; }
  // hand the hit to the shading program: distance, normal (octahedral), surface kind, occlusion and sun visibility
  float mat=mt<min(mm,min(ms,mw))+eN*.5?0.:(mw<min(mm,ms)+.02?1.:(smoothstep(-.012,.024,mm-ms)>.5?2.:3.));
  vec3 na=N0/(abs(N0.x)+abs(N0.y)+abs(N0.z)+1e-9); vec2 e=na.xz;
  if(na.y<0.) e=(1.-abs(e.yx))*vec2(e.x>=0.?1.:-1.,e.y>=0.?1.:-1.);
  o=vec4(t,e,mat*65536.+floor(clamp(aoS,0.,1.)*255.+.5)*256.+floor(clamp(sh2,0.,1.)*255.+.5));
}`,Ot=bt+`
uniform sampler2D uN,uPt,uG,uN8,uB;
uniform vec4 uCam,uFw,uRt,uUp,uJ,uSun,uTr,uX;
in vec2 vUv; layout(location=0) out vec4 o;
vec4 P0,P1,P2;
float hash(float x){ return fract(sin(x*127.13)*43758.5453); }
void path(float z){
  float w=sqrt(1.+abs(z)/${ut}.)-1.;
  float f=clamp((sign(z)*w+${Z.toFixed(6)})/${(2*Z/(T-1)).toFixed(9)},0.,${T-2}.);
  int i=int(f); float k=f-float(i);
  P0=mix(texelFetch(uPt,ivec2(i,0),0),texelFetch(uPt,ivec2(i+1,0),0),k);
  P1=texelFetch(uPt,ivec2(i,1),0);
  P2=texelFetch(uPt,ivec2(i,2),0);
  P2.x=mix(P2.x,texelFetch(uPt,ivec2(i+1,2),0).x,k);
}
// the mipmapped maps are read at a level from the pixel's footprint on the surface (no derivatives inside the
// material branches: the Windows compiler would flatten them)
vec4 t8(vec2 x,float k,float o,float fp){ return textureLod(uN8,x*k+o,log2(max(fp*256.*k,1.))); }
float brickV(vec2 uv,float t,out float jnt){
  // the baked brick map (mipmapped: courses fade to an even tone before their joints go under a pixel)
  vec2 q=uv+(textureLod(uN,uv*.19,0.).rg-.5)*.05;
  vec4 b=textureLod(uB,q*vec2(1./2.88,1./1.792),log2(max(t*uCam.w*286.,1.)));
  jnt=b.g;
  float v=mix(.035,.17,b.r);
  v*=.7+.6*textureLod(uN,uv*.53+.4,0.).g;
  return mix(v,.13,b.g*.8);
}
void main(){
  vec4 G=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  float t=G.x;
  if(t<0.){ o=vec4(0.,0.,0.,1.); return; }
  vec3 rd=normalize(uFw.xyz+uRt.xyz*((vUv.x*2.-1.)*uUp.w+uJ.x*uCam.w)+uUp.xyz*((vUv.y*2.-1.)*uUp.w+uJ.y*uCam.w));
  vec3 p=uCam.xyz+rd*t;
  vec3 n=vec3(G.y,1.-abs(G.y)-abs(G.z),G.z); float nf=max(-n.y,0.);
  n.x+=n.x>=0.?-nf:nf; n.z+=n.z>=0.?-nf:nf; n=normalize(n);
  vec3 N0=n;
  float mat=floor(G.w/65536.), rem=G.w-mat*65536., aoS=floor(rem/256.)/255., sh2=(rem-floor(rem/256.)*256.)/255.;
  // the walk's own coordinates at the hit, as the march had them
  path(p.z);
  float cw=1./sqrt(1.+P0.z*P0.z);
  float g=P2.x*cw, gs=g*smoothstep(.07,.15,abs(g)), fs=fract(P0.w/.82);
  vec4 q=vec4((p.x-P0.x)*cw,p.y-P0.y,P0.w,-gs*.82*(fs-smoothstep(.8,1.,fs)-.5));
  vec3 Ta=vec3(P0.z*cw,0.,cw), Ua=vec3(cw,0.,-P0.z*cw);
  // the wind comes over the outer parapet from behind: windward faces look toward +u and back down the wall
  vec3 Wn=normalize(Ua*.62-Ta*.78);
  float tEff=t/max(abs(dot(rd,N0)),.1);
  float albedo=.5,snow=0.;
  float sparkle=0.;
  // brick coordinates for the surface hit (one brick call for all of them)
  float y=p.y-P1.w;
  vec2 dq=p.xz-vec2(P1.y,P1.x); float tsa=sin(P1.z),tca=cos(P1.z);
  vec2 tq=vec2(dq.x*tca-dq.y*tsa,dq.x*tsa+dq.y*tca), tn=vec2(n.x*tca-n.z*tsa,n.x*tsa+n.z*tca);
  vec2 fuv=mat==1.?(abs(tn.x)>abs(tn.y)?vec2(tq.y,y):vec2(tq.x,y)):(mat==2.?vec2(q.z,q.x):
    // end faces run across the wall, not along it
    (abs(n.y)>.6?vec2(q.z,q.x):(abs(dot(n,Ta))>abs(dot(n,Ua))?vec2(q.x,q.y):vec2(q.z,q.y))));
  float j=0.,bv=.15;
  if(mat>.5) bv=brickV(fuv,tEff,j);
  if(mat<.5){
    // the ridge: a snow blanket worn through by scrub, rock and the dark of brush on the steeps
    float stp=clamp(1.2-n.y*1.3,0.,1.);
    vec2 sxz=p.xz, sxy=vec2(dot(p.xz,normalize(n.zx*vec2(1.,-1.)+1e-4)),p.y);
    float fp=tEff*uCam.w;
    float fl=t8(p.xz,.0187,0.,fp).a;
    float fl2=t8(p.xz,.0037,.5,fp).r;
    float sl=clamp((n.y-.42)/.34,0.,1.);
    float fl3=mix(t8(sxz,.061,0.,fp).b,t8(sxy,.061,0.,fp).b,stp);
    float rn=1.-abs(textureLod(uN,p.xz*vec2(.0029,.0021)+.61,0.).g*2.-1.);
    float sv=smoothstep(.47,.71,fl*.52+fl2*.34+fl3*.3+sl*.32-.13+(rn-.5)*.25);
    snow=mix(sl*sl*.34,1.,sv);
    // scrub and small trees through the snow: grey-brown fuzz thick in the gullies, none on the rock ribs, rimed pale
    float br=mix(t8(sxz,.13,0.,fp).g,t8(sxy,.13,0.,fp).g,stp);
    float scrub=smoothstep(.32,.72,br+(.55-rn)*.9)*smoothstep(2600.,250.,t)*(.6+.4*stp);
    albedo=mix(.07,.84,snow);
    // bare scrub (apricot, oak, thorn) reads as dark stipple through the snow; hoar frost furs every twig white
    albedo=mix(albedo,mix(.13,.7,uX.x),scrub*.72);
    // at a distance the scrub's own shadows darken the flanks; the crests stay white, so each ridge stands out of the fog
    albedo*=mix(1.,mix(.48,.8,uX.x),smoothstep(220.,800.,t)*smoothstep(.97,.62,n.y));
  } else if(mat<1.5){
    // tower: grey brick in courses, dark windows, snow on its ledges, rime on the windward side
    float inside=smoothstep(P2.y-.7,P2.y-.9,max(abs(tq.x),abs(tq.y)));
    float dust=smoothstep(.55,.92,n.y);
    float stain=.7+.45*textureLod(uN,vec2((tq.x+tq.y)*.11,y*.09),0.).r;
    albedo=bv*stain;
    snow=max(dust,j*.12);
    float rime=smoothstep(.1,.6,dot(n,Wn))*smoothstep(.5,.8,textureLod(uN,fuv*vec2(.9,1.6)+.4,0.).r+.15*j)*max(min(uTr.y*1.3,1.),uX.x)*(1.-inside);
    snow=max(snow,rime*.7);
    albedo=mix(albedo,.8,snow);
    // inside the shell (window and door reveals, the hollow) it is dark
    albedo*=1.-.9*inside*(1.-dust);
  } else if(mat<2.5){
    // walkway and cap snow
    snow=1.;
    float sc=textureLod(uN,vec2(q.z,q.x)*1.9,0.).r;
    albedo=.86+.08*sc;
    // where the crust is only a skin the dark brick shows through it
    float thin=smoothstep(.008,.04,q.y-q.w);
    albedo=mix(bv*.9+.08,albedo,thin); snow*=.5+.5*thin;
    // wind ripples: crests across the wind (which runs mostly down the walk), a hand apart, gentle to windward and
    // steep to lee, faded out by the pixel's footprint before they could alias
    float aw=q.z*.8-q.x*.6, cw=q.z*.6+q.x*.8;
    float ph=aw/.15+(textureLod(uN,vec2(aw*.05,cw*.21),0.).r-.5)*10.+(textureLod(uN,vec2(aw*.21,cw*.6)+.4,0.).g-.5)*3.;
    float th=6.2832*ph;
    float rs=cos(th+.65*sin(th))*(1.+.65*cos(th));
    float fp=tEff*uCam.w;
    float rip=.32*smoothstep(.06,.022,fp)*smoothstep(2.3,2.05,abs(q.x))*smoothstep(1.25,.95,q.y)*(.35+.65*uTr.z/1.9)*(1.-smoothstep(.0,.06,q.w-q.y+.05));
    vec2 gg=textureLod(uN,p.xz*1.15+.3,0.).rg-.5;
    float up=smoothstep(.55,.9,n.y);
    n=normalize(n+(vec3(gg.x,0.,gg.y)*.05*smoothstep(18.,3.,t)+(Ta*.8-Ua*.6)*rs*rip)*up);
    // glitter: rare points that catch the sun
    if(t<70.){ vec2 g=p.xz*160.; vec2 ig=floor(g); float hg=fract(sin(dot(ig,vec2(41.3,289.1)))*43758.5); float dg=length(fract(g)-.5); sparkle=step(.986,hg)*smoothstep(.45,.0,dg)*1.; }
  } else {
    // masonry the wind has cleaned
    float wet=.84+.28*textureLod(uN,fuv*vec2(.8,1.3),0.).g;
    albedo=bv*wet;
    // frost and spindrift lodged in the joints and in the shelter of the courses
    float fr=smoothstep(.62,.9,textureLod(uN,fuv*.62+.3,0.).b+.08*j)*.55;
    float wnd=textureLod(uN,fuv*vec2(.09,.19)+.6,0.).r;
    fr=max(fr,smoothstep(.62,.84,wnd)*.7*uTr.y);
    float top=smoothstep(.3,.9,n.y);
    snow=max(max(j*.12,fr*smoothstep(0.,.5,abs(n.x)+top)),top*.72*(1.-uTr.y*.22));
    // rime: feathers of ice grown into the wind on every windward face and edge
    float rime=smoothstep(.1,.6,dot(n,Wn))*smoothstep(.55,.8,textureLod(uN,fuv*vec2(3.1,5.3)+.4,0.).r+.2*j)*max(min(uTr.y*1.3,1.),uX.x)*smoothstep(.55,1.5,q.y);
    snow=max(snow,rime*.7);
    albedo=mix(albedo,.74,snow*.62);
    n=normalize(n+((textureLod(uN,fuv*.73+.2,0.).rgb-.5)*.16+(textureLod(uN,fuv*4.3,0.).gba-.5)*.09)*smoothstep(26.,3.,t));
  }
  vec3 N=n;
  float a0=aoS;
  float sh=dot(N,uSun.xyz);
  float ndl=clamp(sh*.72+.28,0.,1.);
  // snow takes the low sun broadly (rose on every sun-facing curve); brick keeps the harder fall-off
  ndl*=mix(ndl,1.,snow*.75);
  float vis=smoothstep(0.,.92,sh2);
  // snow is translucent and holds a little light past the terminator
  float sss=snow*(.06+.2*smoothstep(-.1,.3,sh));
  float fwd=pow(max(dot(reflect(rd,N),uSun.xyz),0.),7.)*snow*smoothstep(.55,.92,N.y);
  float sun=(ndl*vis+sss*(vis*.6+.05)+fwd*vis*1.9)*(1.+sparkle*2.6*vis);
  float sky=(.5+.5*N.y)*.8*a0+.08*a0;
  sky=max(sky,.05);
  // the dark inside of the doors and windows
  float mDark=1.;
  o=vec4(clamp(vec3(sun*albedo,sky*albedo*mDark,snow),0.,40.),log(t+1.)/log(30001.));
}`,Ht=bt+`
uniform vec4 uD,uFg,uAirH,uAirZ,uSunC,uSunG;
uniform sampler2D uN;
vec3 sky(vec3 d){
  float e=d.y;
  vec3 c=mix(uAirH.rgb,uAirZ.rgb,pow(clamp(e,0.,1.),.62));
  if(e<0.) c=mix(uAirH.rgb,uAirH.rgb*vec3(.9,.9,.93),clamp(-e*5.,0.,1.));
  float cs=max(dot(d,uD.xyz),0.);
  float hz=exp(-max(e,0.)/.09);
  c+=uSunC.rgb*(.09*hz*uSunG.y*(.3+.7*cs*cs)+uSunG.x*(.03*pow(cs,10.)+.12*pow(cs,400.)));
  // a thin high veil, broad and soft
  if(e>.02){ vec2 q=d.xz/(e+.22)*.28; float v=texture(uN,q+vec2(uSunG.w*.02,.1)).r*.75+texture(uN,q*2.3).g*.25; c+=(smoothstep(.40,.84,v)*.13)*(uAirH.rgb*.7+uSunC.rgb*.3*uSunG.x)*smoothstep(.02,.2,e); }
  // the anti-sun side lies colder and bluer
  c=mix(c,c*vec3(.86,.93,1.05),smoothstep(.1,-.9,cs*2.-1.)*.6*uSunG.w);
  return c;
}
float od(vec3 ro,vec3 rd,float L){
  float y0=ro.y,dy=rd.y;
  float k0=uFg.x,H0=uFg.y;
  // thin haze, nearly uniform
  float a=k0*L*exp(-max(mix(y0,y0+dy*L,.5),0.)/H0);
  // valley fog: an exponential layer below uFg.w
  float yT=uAirH.a; float s=uAirZ.a; float kv=uFg.z;
  float e0=(y0-yT)/s,e1=(y0+dy*L-yT)/s;
  float b;
  if(abs(dy)<.0015) b=kv*exp(-max(e0,-3.))*L;
  else b=kv*s/dy*(exp(-max(e0,-3.))-exp(-max(e1,-3.)));
  return a+max(b,0.);
}
`+`
uniform sampler2D uA,uPt;
uniform vec4 uTm,uFw,uRt,uUp,uCam,uAmb,uPk,uWd,uMo;
float hash2(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5453); }
// spindrift: a thin veil streaming off the lee of the battlements, carried by gusts
float drift(vec3 ro,vec3 rd,float L,float t,float jit){
  float acc=0.;
  int NS=int(uWd.z);
  for(int i=0;i<NS;i++){
    float ti=1.4*pow(1.5,float(i)+jit), dt=ti*.405;
    if(ti>L) break;
    vec3 p=ro+rd*ti;
    float w=sqrt(1.+abs(p.z)/${ut}.)-1.;
    float f=clamp((sign(p.z)*w+${Z.toFixed(6)})/${(2*Z/(T-1)).toFixed(9)},0.,${T-2}.);
    int k=int(f); vec4 Q=mix(texelFetch(uPt,ivec2(k,0),0),texelFetch(uPt,ivec2(k+1,0),0),f-float(k));
    float c=1./sqrt(1.+Q.z*Q.z);
    float u=(p.x-Q.x)*c, v=p.y-Q.y, s=Q.w;
    if(abs(u)>3.4||v<-.5||v>3.4) continue;
    float D=uWd.y;
    // gusts flare and die at uneven times, at each place along the wall in turn
    float g=texture(uN,vec2(t*.0131+s*.0047,.37)).r*.62+texture(uN,vec2(t*.0219-s*.0029,.81)).g*.38;
    g=smoothstep(.42,.78,g);
    float xl=2.8-u;
    float vb=1.95+D*.6-.16*xl-.05*xl*xl;
    float ban=exp(-pow((v-vb)/(.16+.11*xl),2.))*smoothstep(-.15,.35,xl)*exp(-xl/1.7);
    float aw=s*.8-u*.6-t*(1.6+2.4*uWd.x), cw=s*.6+u*.8;
    float st=texture(uN,vec2(aw*.11,cw*.55+v*.4)+.13).b*.7+texture(uN,vec2(aw*.37,cw*1.9)+.57).a*.3;
    st=smoothstep(.45,.8,st);
    acc+=ban*st*(.15+.85*g)*dt;
  }
  return acc;
}
// falling snow: flakes on a few depth sheets, each sheet a field of cells that drifts down and with the wind
float flakes(vec3 rd,float L,float t){
  float a=0.;
  int NF=int(uMo.z);
  for(int i=0;i<NF;i++){
    float zl=1.6*pow(1.9,float(i));
    if(zl>L) break;
    vec2 pp=vec2(dot(rd,uRt.xyz),dot(rd,uUp.xyz))/max(dot(rd,uFw.xyz),.2)*zl;
    float cs=.16+.05*float(i);
    pp+=vec2(-t*.35*(1.+.2*float(i))+sin(t*.31+float(i))*.25,t*(.9+.12*float(i)));
    vec2 ce=floor(pp/cs), fc=pp/cs-ce;
    float h=hash2(ce+float(i)*17.3);
    vec2 off=vec2(hash2(ce+3.1),hash2(ce+7.7))*.5+.25;
    // a near flake is smeared by its fall into a short slanting dash, a far one is a fine point
    float r=(.0016+.0026*fract(h*13.7))*(1.+.25*float(i))/cs;
    float ln=(.07/(1.+1.3*float(i)))/cs;
    vec2 dv=normalize(vec2(-.36,-1.)), e=fc-off;
    float al=clamp(dot(e,dv),-ln,ln);
    float dd=length(e-dv*al);
    a+=step(.42,h)*smoothstep(r*1.6,r*.4,dd)*(.35+.45*fract(h*7.3))*(1./(1.+ln*14.))*exp(-zl*.016);
  }
  return clamp(a,0.,1.);
}
in vec2 vUv; layout(location=0) out vec4 o;
void main(){
  vec4 s=texture(uA,vUv);
  bool isSky=s.a>.993;
  float dist=exp(s.a*log(30001.))-1.;
  vec3 rd=normalize(uFw.xyz+uRt.xyz*(vUv.x*2.-1.)*uUp.w+uUp.xyz*(vUv.y*2.-1.)*uUp.w);
  vec3 ro=uCam.xyz;
  float t=uTm.x;
  vec3 col=vec3(0.);
  float L=isSky?9000.:dist;
  vec3 p=ro+rd*L;
  if(!isSky){
    // the pink comes down the ridges from the top
    float nf=(texture(uN,p.xz*.0019+.13).r-.5)*90.;
    float rev=smoothstep(uPk.x-46.,uPk.x+46.,p.y+nf);
    float glow=uPk.y*(.72+.28*rev);
    vec3 sc=uSunC.rgb*uPk.z*glow;
    vec3 lit=s.r*sc+s.g*uAmb.rgb;
    vec3 tint=mix(vec3(1.09,.97,.85),vec3(.965,.985,1.03),smoothstep(.05,.95,s.b));
    col=lit*tint;
  }
  float b=od(ro,rd,min(L,9000.));
  float bank=0.;
  if(L>4.){
    vec3 p1=ro+rd*min(L,260.)*.5;
    vec3 p2=ro+rd*min(L,1200.)*.7;
    vec2 w=vec2(t*.0049,-t*.0031);
    float n1=texture(uN,p1.xz*.0041+w+vec2(p1.y*.0009,0.)).r;
    float n2=texture(uN,p2.xz*.00125-w*1.2+.31).g;
    float n3=texture(uN,p1.xz*.019+w*2.3).b;
    bank=(n1-.5)*.6+(n2-.5)*1.2+(n3-.5)*.34;
  }
  float T=exp(-b*(1.+uFg.y*.0*bank+.32*bank*uTm.y)*uTm.z);
  vec3 airC=sky(rd)*(1.+bank*.05);
  if(isSky) col=airC; else col=col*T+airC*(1.-T);
  // sun disc behind the haze
  float a=acos(min(dot(rd,uD.xyz),1.));
  float sd=.0058;
  float dsk=smoothstep(sd*1.1,sd*.88,a)*uSunG.z;
  float occl=isSky?1.:0.;
  col=mix(col,uSunC.rgb*1.5+col*.2,dsk*occl*.75);
  col+=uSunC.rgb*.22*(pow(max(cos(a),0.),60.)*.25+pow(max(cos(a),0.),900.)*1.3)*uSunG.x*(isSky?1.:.6*(1.-T));
  // a setting moon, low in the blue
  if(uMo.w>0.){
    vec3 md=normalize(vec3(sin(uMo.x)*.993,.115,cos(uMo.x)*.993)), mr=normalize(cross(md,vec3(0.,1.,0.))), mu=cross(mr,md);
    vec2 mp=vec2(dot(rd,mr),dot(rd,mu))/.0105; float mq=length(mp);
    float mar=texture(uN,mp*.22+.3).r;
    vec3 mc=vec3(1.,.83,.62)*(1.08-.22*smoothstep(.45,.7,mar))*(1.-.18*mq*mq);
    col=mix(col,mc*1.05,smoothstep(1.,.86,mq)*occl); col+=vec3(.9,.7,.55)*.035*exp(-mq*.35); }
  float gnj=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
  // spindrift
  if(uWd.z>0.&&rd.y<.3){
    float k=1.-exp(-drift(ro,rd,L,t,gnj)*uWd.x*1.3);
    vec3 spc=(uAmb.rgb*.95+uSunC.rgb*uPk.z*.3*(.4+.6*uPk.y));
    col=mix(col,spc,k*.8);
  }
  if(uMo.z>0.){ float fk=flakes(rd,L,t); col=mix(col,uAmb.rgb*1.05+.05,fk*.85); }
  col=max(col,vec3(0.));
  // the print: tone curve, lifted a little, soft shoulder
  col*=uTm.w;
  col=col*(1.+col*.1)/(1.+col*.46);
  col=pow(col,vec3(.4545));
  col=mix(col,col*col*(3.-2.*col),.3);
  float gn=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))+t*.37));
  col+=(gn-.5)*(1./255.)*1.5;
  o=vec4(col,1.);
}`,de=bt+"uniform sampler2D uA; in vec2 vUv; layout(location=0) out vec4 o; void main(){ o=vec4(texture(uA,vUv).rgb,1.); }",yt=(e,a,n)=>{const o=t.createShader(e);return t.shaderSource(o,a),t.compileShader(o),o._tag=n,o},m=t.__c617||(t.__c617=(()=>{const e={},a=(f,d,z)=>{const A=t.createProgram();t.attachShader(A,yt(t.VERTEX_SHADER,d,f+" vs")),t.attachShader(A,yt(t.FRAGMENT_SHADER,z,f+" fs")),t.linkProgram(A),t.flush(),e[f]=A};{const f=t.getExtension("KHR_parallel_shader_compile");f&&f.maxShaderCompilerThreadsKHR&&f.maxShaderCompilerThreadsKHR(4294967295)}const n=(t.getParameter(t.MAX_TEXTURE_SIZE)|0)<T,o=f=>{const d=f.match(/uniform sampler2D [^;]*uPt[^;]*;\n/);if(!d)throw new Error("617 PT6");return f=f.split("texelFetch(uPt,ivec2(").join("fPt(ivec2("),f.replace(d[0],d[0]+`vec4 fPt(ivec2 p,int l){ return p.x<${T/2}?texelFetch(uPt,p,l):texelFetch(uPt,ivec2(p.x-${T/2},p.y+3),l); }
`)};a("scene",ht,n?o(Bt):Bt),a("shade",ht,n?o(Ot):Ot),a("comp",ht,n?o(Ht):Ht),a("blit",ht,de);const r=256,l=new Uint16Array(r*r*4),i=new Uint8Array(r*r*4),s=f=>{if(f<=0)return 0;let d=Math.floor(Math.log2(f));const z=f/Math.pow(2,d)-1;return d+15<<10|z*1024&1023};let c=24956;const g=()=>{c=c+1831565813|0;let f=Math.imul(c^c>>>15,1|c);return f=f+Math.imul(f^f>>>7,61|f)^f,((f^f>>>14)>>>0)/4294967296};for(let f=0;f<4;f++){const d=new Float32Array(r*r);let z=1,A=0;const nt=f===3?5:2,st=f===3?7:6;for(let y=nt;y<=st;y++){const x=1<<y,j=new Float32Array(x*x);for(let P=0;P<x*x;P++)j[P]=g();const At=r/x;for(let P=0;P<r;P++)for(let G=0;G<r;G++){const it=G/At,xt=P/At,W=it|0,C=xt|0;let V=it-W,$=xt-C;V=V*V*(3-2*V),$=$*$*(3-2*$);const lt=j[C%x*x+W%x],pt=j[C%x*x+(W+1)%x],Nt=j[(C+1)%x*x+W%x],Ft=j[(C+1)%x*x+(W+1)%x];d[P*r+G]+=z*(lt+(pt-lt)*V+(Nt-lt)*$+(lt-pt-Nt+Ft)*V*$)}A+=z,z*=.56}let N=1e9,b=-1e9;for(let y=0;y<r*r;y++)d[y]<N&&(N=d[y]),d[y]>b&&(b=d[y]);for(let y=0;y<r*r;y++){const x=(d[y]-N)/(b-N);l[y*4+f]=s(x),i[y*4+f]=Math.round(x*255)}}const v=t.createTexture();t.bindTexture(t.TEXTURE_2D,v),t.texImage2D(t.TEXTURE_2D,0,t.RGBA16F,r,r,0,t.RGBA,t.HALF_FLOAT,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT);const S=t.getExtension("EXT_texture_filter_anisotropic"),dt=(f,d)=>{const z=t.createTexture();return t.bindTexture(t.TEXTURE_2D,z),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,d,d,0,t.RGBA,t.UNSIGNED_BYTE,f),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),S&&t.texParameterf(t.TEXTURE_2D,S.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,t.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT))),z},kt=dt(i,r),M=512,L=new Uint8Array(M*M*4);{let f=399317;const d=()=>{f=f+1831565813|0;let b=Math.imul(f^f>>>15,1|f);return b=b+Math.imul(b^b>>>7,61|b)^b,((b^b>>>14)>>>0)/4294967296},z=[],A=[],nt=[],st=[],N=[];for(let b=0;b<128;b++)z.push(d()),A.push(d()<.09?.6+.4*d():0),nt.push(d()-.5),st.push(d()-.5),N.push(.0045+.005*d());for(let b=0;b<M;b++)for(let y=0;y<M;y++){const x=b>>5,j=y+(x&1)*32+(x*23&15)&M-1,At=j>>6,P=x*8+At,G=(j&63)/64,it=(b&31)/32,xt=Math.min(G,1-G)*.36,W=Math.min(it,1-it)*.112,C=.012+.02*A[P],V=Math.max(C-xt,0),$=Math.max(C-W,0),lt=Math.min(xt,W,C-Math.hypot(V,$)),pt=N[P]*(1+1.6*A[P]),Nt=J((pt*1.35-lt)/(pt*.7),0,1);let Ft=.18+.62*z[P]*z[P]+.12*(nt[P]*(G-.5)+st[P]*(it-.5))*2;Ft*=1-.45*A[P]*J(1-Math.abs(G-.5)*1.6,0,1);const St=(b*M+y)*4;L[St]=Math.round(J(Ft,0,1)*255),L[St+1]=Math.round(Nt*255),L[St+2]=Math.round(A[P]*255),L[St+3]=255}}const Wt=dt(L,M);return{nTex:v,n8Tex:kt,bTex:Wt,PR:e,qVao:t.createVertexArray(),checked:!1,ul:new Map,pt6:n,pt6f:o}})()),u=(e,a)=>{let n=m.ul.get(e);n||(n=new Map,m.ul.set(e,n));let o=n.get(a);return o===void 0&&(o=t.getUniformLocation(e,a),n.set(a,o)),o},mt=!!t.getExtension("EXT_color_buffer_float"),Tt=!!t.getExtension("EXT_color_buffer_half_float"),xe=mt||Tt?t.RGBA16F:t.RGBA8,pe=mt||Tt?t.HALF_FLOAT:t.UNSIGNED_BYTE;if(!mt&&!m.nf){const e=(s,c,g)=>{if(s.split(c).length!==2)throw new Error("617 NF");return s.replace(c,()=>g)},a=(s,c)=>e(s,"void main(){","void main0(){")+`
void main(){ main0(); `+c+" }",n=s=>m.pt6?m.pt6f(s):s;let o=e(Bt,"layout(location=0) out vec4 o;","layout(location=0) out uvec4 o;");o=e(o,"o=vec4(-1.,0.,0.,0.);","o=floatBitsToUint(vec4(-1.,0.,0.,0.));"),o=e(o,"+floor(clamp(sh2,0.,1.)*255.+.5));","+floor(clamp(sh2,0.,1.)*255.+.5)));"),o=e(o,"  o=vec4(t,e,","  o=floatBitsToUint(vec4(t,e,");let r=e(Ot,"uniform sampler2D uN,uPt,uG,uN8,uB;",`uniform sampler2D uN,uPt,uN8,uB;
uniform highp usampler2D uG;`);r=e(r,"vec4 G=texelFetch(uG,ivec2(gl_FragCoord.xy),0);","vec4 G=uintBitsToFloat(texelFetch(uG,ivec2(gl_FragCoord.xy),0));");let l=Ht;Tt||(r=a(r,"o.rgb=sqrt(o.rgb/(o.rgb+1.));"),l=e(l,"vec4 s=texture(uA,vUv);","vec4 s=texture(uA,vUv); s.rgb*=s.rgb; s.rgb/=max(1.-s.rgb,1e-4);"));const i=s=>{const c=t.createProgram();return t.attachShader(c,yt(t.VERTEX_SHADER,ht,"617 nf vs")),t.attachShader(c,yt(t.FRAGMENT_SHADER,n(s),"617 nf fs")),t.linkProgram(c),c};m.nf={scene:i(o),shade:i(r),comp:Tt?m.PR.comp:i(l),blit:m.PR.blit};for(const s in m.nf)t.getProgramParameter(m.nf[s],t.LINK_STATUS)||console.error("617 link nf "+s+": "+t.getProgramInfoLog(m.nf[s])+" "+t.getAttachedShaders(m.nf[s]).map(c=>t.getShaderInfoLog(c)).join(" "))}const Et=mt?m.PR:m.nf,zt=(e,a,n,o,r,l)=>{const i=t.createTexture();t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,n,e,a,0,l||t.RGBA,o,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const s=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,s),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i,0),{t:i,f:s,w:e,h:a}},Yt=mt?zt(F,F,t.RGBA32F,t.FLOAT,t.NEAREST):zt(F,F,t.RGBA32UI,t.UNSIGNED_INT,t.NEAREST,t.RGBA_INTEGER),te=zt(F,F,xe,pe,t.LINEAR),ee=zt(F,F,t.RGBA8,t.UNSIGNED_BYTE,t.LINEAR),U=(e,a,n)=>{t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,n),t.uniform1i(e,a)},oe=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.colorMask(!0,!0,!0,!0),t.depthMask(!1)},Pt=t.createTexture();if(t.bindTexture(t.TEXTURE_2D,Pt),m.pt6){const e=T/2,a=new Float32Array(e*6*4);for(let n=0;n<3;n++)a.set(k.subarray(n*T*4,(n*T+e)*4),n*e*4),a.set(k.subarray((n*T+e)*4,(n+1)*T*4),(n+3)*e*4);t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,e,6,0,t.RGBA,t.FLOAT,a)}else t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,T,3,0,t.RGBA,t.FLOAT,k);t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const ve={yaw:0,pitch:0,x:0,y:0,z:0};let h={pos:[0,0,0],fw:[0,0,1],rt:[1,0,0],up:[0,1,0]},ae="",Rt=!0;const we=new Float32Array(16),ge=(e,a)=>[e[1]*a[2]-e[2]*a[1],e[2]*a[0]-e[0]*a[2],e[0]*a[1]-e[1]*a[0]],re=()=>{const e=R.view||ve,a=[e.yaw||0,e.pitch||0,e.x||0,e.y||0,e.z||0].join(",");if(a===ae)return;ae=a,Rt=!0;const n=Zt+(e.yaw||0),o=J(me+(e.pitch||0),-1.3,1.3),r=Math.cos(o),l=Math.sin(o),i=Math.cos(n),s=Math.sin(n),c=[s*r,l,i*r],g=[i,0,-s],v=ge(c,g),S=-(e.x||0)*s+(e.z||0)*i,dt=(e.x||0)*i+(e.z||0)*s;if(p.P)h={fw:c,rt:g,up:v,pos:[p.P[0]+dt*.3,p.P[1]+(e.y||0)*.3,p.P[2]+S*.3]};else{const N=p.z+S,y=E(N,1)+J(p.u+dt,-1.75,1.75);h={fw:c,rt:g,up:v,pos:[y,E(N,2)+ft[0]*1.1+1.58+(p.h||0)+(e.y||0),N]}}const kt=1/at,M=.05,L=3e3,Wt=-(L+M)/(L-M),f=-2*L*M/(L-M),d=h.pos[0],z=h.pos[1],A=h.pos[2],nt=[g[0],v[0],-c[0],0,g[1],v[1],-c[1],0,g[2],v[2],-c[2],0,-(g[0]*d+g[1]*z+g[2]*A),-(v[0]*d+v[1]*z+v[2]*A),c[0]*d+c[1]*z+c[2]*A,1],st=[kt,0,0,0,0,kt,0,0,0,0,Wt,-1,0,0,f,0];for(let N=0;N<4;N++)for(let b=0;b<4;b++){let y=0;for(let x=0;x<4;x++)y+=st[N+x*4]*nt[x+b*4];we[N+b*4]=y}},be=e=>{t.uniform4f(u(e,"uD"),Ct[0],Ct[1],Ct[2],0),t.uniform4f(u(e,"uFg"),D[0],D[1],D[2],0),t.uniform4f(u(e,"uAirH"),w.h[0],w.h[1],w.h[2],D[3]),t.uniform4f(u(e,"uAirZ"),w.z[0],w.z[1],w.z[2],D[4]),t.uniform4f(u(e,"uSunC"),w.sun[0],w.sun[1],w.sun[2],0),t.uniform4f(u(e,"uSunG"),w.g*.55,w.g*.6,w.disc,1)},ye=8;let Y=0;const Te=e=>{const a=(e+.5)*.7548776662,n=(e+.5)*.569840291;return[a%1-.5,n%1-.5]},jt=()=>{oe();const e=Te(Y),a=2/F;t.bindFramebuffer(t.FRAMEBUFFER,Yt.f),t.viewport(0,0,F,F);const n=Et.scene;t.useProgram(n),t.uniform4f(u(n,"uCam"),h.pos[0],h.pos[1],h.pos[2],a*at),t.uniform4f(u(n,"uFw"),h.fw[0],h.fw[1],h.fw[2],0),t.uniform4f(u(n,"uRt"),h.rt[0],h.rt[1],h.rt[2],0),t.uniform4f(u(n,"uUp"),h.up[0],h.up[1],h.up[2],at),t.uniform4f(u(n,"uJ"),e[0],e[1],Y*.381,0),t.uniform4f(u(n,"uSun"),rt[0],rt[1],rt[2],0),t.uniform4f(u(n,"uTr"),ft[0],K[0],K[1],wt),U(u(n,"uN"),0,m.nTex),U(u(n,"uPt"),1,Pt),t.bindVertexArray(m.qVao),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,te.f);const o=Et.shade;t.useProgram(o),t.uniform4f(u(o,"uCam"),h.pos[0],h.pos[1],h.pos[2],a*at),t.uniform4f(u(o,"uFw"),h.fw[0],h.fw[1],h.fw[2],0),t.uniform4f(u(o,"uRt"),h.rt[0],h.rt[1],h.rt[2],0),t.uniform4f(u(o,"uUp"),h.up[0],h.up[1],h.up[2],at),t.uniform4f(u(o,"uJ"),e[0],e[1],Y*.381,0),t.uniform4f(u(o,"uSun"),rt[0],rt[1],rt[2],0),t.uniform4f(u(o,"uTr"),ft[0],K[0],K[1],wt),U(u(o,"uN"),0,m.nTex),U(u(o,"uPt"),1,Pt),U(u(o,"uG"),2,Yt.t),U(u(o,"uN8"),3,m.n8Tex),U(u(o,"uB"),4,m.bTex),t.uniform4f(u(o,"uX"),I==="Hoar frost"?1:0,0,0,0),t.enable(t.BLEND),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.CONSTANT_ALPHA,t.ONE_MINUS_CONSTANT_ALPHA),t.blendColor(0,0,0,1/(Y+1)),t.bindVertexArray(m.qVao),t.drawArrays(t.TRIANGLES,0,3),t.disable(t.BLEND),t.flush(),Y++};if(!m.checked){m.checked=!0;for(const e in m.PR)t.getProgramParameter(m.PR[e],t.LINK_STATUS)||console.error("617 link "+e+": "+t.getProgramInfoLog(m.PR[e])+" "+t.getAttachedShaders(m.PR[e]).map(a=>t.getShaderInfoLog(a)).join(" "))}re(),jt(),Rt=!1,t.bindFramebuffer(t.FRAMEBUFFER,null);const Ee=tt()*30,ne=tt()*.5,ke=[-Math.cos(ne),Math.sin(ne)];return(e,a)=>{re(),Rt?(Rt=!1,Y=0,jt()):Y<ye&&jt();const n=e+Ee;oe(),t.bindFramebuffer(t.FRAMEBUFFER,ee.f),t.viewport(0,0,F,F);const o=Et.comp;t.useProgram(o),be(o);const r=.78+Math.sin(n*.083+1.1)*.12,l=J(e/140,0,1),i=-14-260*l,s=.7+.34*l;t.uniform4f(u(o,"uPk"),i,s,w.g,0),t.uniform4f(u(o,"uAmb"),w.amb[0]*w.ag,w.amb[1]*w.ag,w.amb[2]*w.ag,0),t.uniform4f(u(o,"uTm"),n,r,D[5],1),t.uniform4f(u(o,"uFw"),h.fw[0],h.fw[1],h.fw[2],0),t.uniform4f(u(o,"uRt"),h.rt[0],h.rt[1],h.rt[2],0),t.uniform4f(u(o,"uUp"),h.up[0],h.up[1],h.up[2],at),t.uniform4f(u(o,"uCam"),h.pos[0],h.pos[1],h.pos[2],0),U(u(o,"uA"),0,te.t),U(u(o,"uN"),1,m.nTex),U(u(o,"uPt"),2,Pt),t.uniform4f(u(o,"uWd"),K[1]>.3?.3*K[1]:0,ft[0],K[1]>.3?9:0,0),t.uniform4f(u(o,"uMo"),Zt-.24,0,I==="Snow falling"?5:0,I==="Moon setting"?1:0),t.bindVertexArray(m.qVao),t.drawArrays(t.TRIANGLES,0,3),t.flush(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,F,F);const c=Et.blit;t.useProgram(c),U(u(c,"uA"),0,ee.t),t.bindVertexArray(m.qVao),t.drawArrays(t.TRIANGLES,0,3),t.bindVertexArray(null)}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
