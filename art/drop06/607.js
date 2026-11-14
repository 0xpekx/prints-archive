// Frozen Bubbles: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/607.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Vt){Vt&&Vt.add({num:607,name:"Frozen Bubbles",fam:"Vistas",recipe:"Standing on wind-swept lake ice on a clear January evening, looking down through it at towers of frozen methane bubbles and white cracks running deep, with thin snow snaking past. The hour, the bubbles, the snow cover, the cracks, the ice colour, the far mountains and the wind change every mint. No controls, just look.",music:!0,gl:!0,fps:30,seed:0,make(S){const t=S.gl,C=S.size,b=!!S.home,Wt=C>400;let V=1618719182;for(let e=2;e<66;e+=8)V=Math.imul(V^parseInt(S.hash.slice(e,e+8),16),2246822507)^V>>>13;const o=()=>{V=V+1831565813|0;let e=Math.imul(V^V>>>15,1|V);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296},Y=e=>{let a=0;for(const n in e)a+=e[n];let r=o()*a;for(const n in e)if(r-=e[n],r<0)return n;return Object.keys(e)[0]},F=Math.PI*2,ct=Math.PI/180,it=S.trait("Hour",b?"Pink alpenglow":Y({"Pink alpenglow":44,"Last pink":26,"Blue hour":20,"Gold on the peaks":10})),bt=S.trait("Bubbles",b?"Stacked columns":Y({"Stacked columns":46,"Sparse strings":20,"Dense towers":26,"Great pancakes":8})),Q=S.trait("Snow",b?"Dusted":Y({Dusted:40,"Bare and polished":28,"Wind bands":24,"Windows in snow":8})),Gt=S.trait("Cracks",b?"Long sheets":Y({"Long sheets":48,Web:30,"One great fracture":22})),jt=S.trait("Ice",b?"Black":Y({Black:52,"Deep teal":30,"Bottle green":10,Milky:8})),ge=S.trait("Range",b?"Front Ranges":Y({"Front Ranges":50,"One great face":22,"Far low hills":18,"Ragged teeth":10})),et=S.trait("Spindrift",b?"Thin":Y({Thin:55,Running:34,"Ground blizzard":11})),x={"Pink alpenglow":{key:[1.65,.44,.3,.9],bel:[.82,.4,.38,.5],bw:.07,term:.34,dep:2.2,zen:[.052,.095,.25],hor:[.34,.31,.46],shd:[.19,.22,.38],belt:[.7,.4,.45],sun:[.95,.55,.28],glow:[1,.46,.48],amb:[.42,.4,.54],ex:1},"Last pink":{key:[.8,.33,.33,.6],bel:[.5,.25,.34,.3],bw:.07,term:.66,dep:4.4,zen:[.03,.058,.18],hor:[.22,.2,.36],shd:[.13,.15,.3],belt:[.46,.24,.36],sun:[.64,.3,.24],glow:[.8,.3,.46],amb:[.27,.26,.42],ex:1.25},"Blue hour":{key:null,bel:null,term:1.5,dep:7,zen:[.016,.034,.12],hor:[.11,.13,.29],shd:[.07,.1,.22],belt:[.15,.14,.29],sun:[.22,.17,.28],glow:[.26,.17,.34],amb:[.15,.18,.33],ex:1.55},"Gold on the peaks":{key:[2.1,.72,.22,.85],bel:[.95,.76,.58,.3],bw:.08,term:.12,dep:.6,zen:[.1,.18,.4],hor:[.62,.55,.55],shd:[.34,.36,.5],belt:[.95,.62,.48],sun:[1.3,.82,.36],glow:[1.25,.7,.34],amb:[.6,.56,.62],ex:.82}}[it],Z={Black:[.006,.014,.024,.8],"Deep teal":[.008,.04,.056,1],"Bottle green":[.008,.046,.032,1],Milky:[.022,.05,.075,2.6]}[jt],At={"Front Ranges":[12,.022,.15],"One great face":[4.5,.03,.29],"Far low hills":[9,.012,.05],"Ragged teeth":[16,.026,.17]}[ge],Ht=(192+28*o()-0)*ct,Ve=-x.dep*ct,Yt=[Math.sin(Ht),Math.cos(Ht)],Et=b?1.05:o()*F,Qt=Math.cos(Et),Zt=Math.sin(Et),Jt=et==="Thin"?.32:et==="Running"?.6:1,be=Q==="Bare and polished"?0:Q==="Wind bands"?.75:Q==="Windows in snow"?1.45:.32,xt=[o()*90,o()*90,o()*90,o()*90],Ae=.78,Ee={yaw:0,pitch:0,x:0,y:0,z:0},Te=b?0:(o()-.5)*26*ct,Re=-11*ct,W=Math.tan(34*ct),f=t.__c607||(t.__c607={});if(!f.nt){let e=2654435769;const a=()=>(e=Math.imul(e^e>>>15,739982445),e=Math.imul(e^e>>>12,695872825),e^=e>>>15,e&255),r=new Uint8Array(256*256*4);for(let s=0;s<r.length;s++)r[s]=a();f.nd=r;const n=t.createTexture();t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,256,256,0,t.RGBA,t.UNSIGNED_BYTE,r),t.generateMipmap(t.TEXTURE_2D),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.REPEAT),f.nt=n,f.empty=t.createVertexArray(),f.fbo=t.createFramebuffer()}const ze=f.nd,$t=(e,a,r)=>{const n=Math.floor(e),s=Math.floor(a);let l=e-n,i=a-s;l=l*l*(3-2*l),i=i*i*(3-2*i);const c=(p,g)=>ze[((g&255)<<8|p&255)*4+r]/255,m=c(n,s)+(c(n+1,s)-c(n,s))*l,h=c(n,s+1)+(c(n+1,s+1)-c(n,s+1))*l;return m+(h-m)*i};if(!f.P){const e=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D; precision highp samplerCube;
`,a=e+"void main(){ vec2 p=vec2(gl_VertexID==1?3.:-1.,gl_VertexID==2?3.:-1.); gl_Position=vec4(p,1.,1.); }",r=`uniform sampler2D uN;
vec4 n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.); }
float fbm(vec2 p){ return .5*n2(p).x+.25*n2(p*2.03+7.).y+.125*n2(p*4.1+19.).z+.0625*n2(p*8.3+3.).w; }
float f2o(vec2 p){ return .56*n2(p).x+.32*n2(p*2.03+7.).y; }
vec3 dec(vec3 c){ return c*c*2.; }
vec3 enc(vec3 c){ return sqrt(max(c,0.)/2.); }
`,n=`uniform vec3 uFX,uFY,uFZ; uniform vec2 uRes; uniform vec4 uS[11]; uniform float uPx; uniform sampler2D uP,uQ; out vec4 o;
`,s=`  vec2 q=gl_FragCoord.xy/uRes*2.-1.;
  vec3 d=normalize(uFZ+q.x*uFX+q.y*uFY);
  float y=d.y; float lh=max(length(d.xz),1e-4); vec2 hd=d.xz/lh;
  float el=asin(clamp(y,-1.,1.));
  float az=dot(hd,uS[0].xy);          // +1 toward the sun
  float e=max(el,0.);
`,l=e+r+n+`void main(){
`+s+`  // the base gradient, warmer low toward the sun
  vec3 Hz=mix(uS[1].xyz,uS[4].xyz*.86+uS[1].xyz*.2,smoothstep(-.15,1.,az));
  vec3 c=mix(Hz,uS[8].xyz,1.-exp(-e*5.4));
  float a=-az;
  float antiA=clamp(a*.95+.22,0.,1.);
  // the Earth's shadow, a slate band low in the east, and the pink Belt of Venus above it
  c=mix(c,uS[2].xyz,antiA*.88*exp(-(e/.085)*(e/.085)));
  float belt=exp(-((e-.2)/.12)*((e-.2)/.12));
  c=mix(c,uS[3].xyz,antiA*.46*belt);
  // the hour's own band in it: rose at alpenglow, a pale warmth while the sun is still on the peaks
  c=mix(c,uS[10].xyz,antiA*uS[10].w*exp(-((e-.19)/uS[6].w)*((e-.19)/uS[6].w)));
  // sunward: a warm glow low down
  float s=max(az,0.);
  c+=uS[4].xyz*(.55*pow(s,3.)*exp(-e/.12)+.2*pow(s,8.)*exp(-e/.05));
  float glow=antiA*belt*.8;
  // thin high cloud catching the last light: rare wisps on a warped field, never a combed sheet
  if(y>.012){
    vec2 cp=d.xz/(y+.26)*1.25;
    vec2 wp=vec2(f2o(cp*.55+uS[7].xy*.1),f2o(cp*.55+uS[7].yx*.1+vec2(8.,3.)))-.44;
    float gate=smoothstep(.46,.72,f2o(cp*.4+wp*.8+vec2(uS[7].x,4.))+.06);
    float st=fbm(vec2(cp.x*.9+cp.y*.4,cp.y*2.6-cp.x*1.1)+wp*3.6+11.);
    float cov=smoothstep(.42,.72,st)*gate*smoothstep(.015,.16,y)*(.45+.55*n2(cp*3.7).y);
    vec3 lit=mix(uS[3].xyz*.82+uS[1].xyz*.15,uS[4].xyz*.95,smoothstep(-.35,.8,az));
    float rimL=clamp(.42+.58*(1.-smoothstep(0.,.65,y)),0.,1.);
    c=mix(c,lit*rimL,cov*.42);
    glow=max(glow,cov*.62*rimL);
  }
  // first stars
  if(uS[5].x>0.&&y>.03){
    vec2 sc=d.xz/(y+.45)*240.; vec4 h=n2(floor(sc)); vec2 f=fract(sc)-.5-(h.yz-.5)*.7;
    float st=smoothstep(.0018,.0,dot(f,f))*step(.945,h.x)*(h.w*.9+.1);
    c+=vec3(.8,.84,1.)*st*uS[5].x*smoothstep(.03,.4,y);
  }
  o=vec4(enc(c),glow);
}`,i=e+r+n+`float at2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-6)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
float ridged(vec2 p){ float s=0.,a=.56,w=1.; for(int i=0;i<4;i++){ float n=1.-abs(2.*n2(p).x-1.); n*=n; s+=n*a*w; w=clamp(n*1.9,0.,1.); a*=.46; p=p*2.07+vec2(5.3,1.7); } return s; }
// a periodic row of skewed tents: thrust-sheet peaks with a long dip slope and a short steep face
float tents(float x,float K,int id,float pw){ float i=floor(x),m=0.;
  for(int j=-1;j<=1;j++){ float c=i+float(j); vec4 h=texelFetch(uN,ivec2(int(mod(c,K))&255,id&255),0);
    float xp=c+.15+.7*h.x; float wL=mix(.7,1.25,h.z), wR=mix(1.1,1.85,h.w); float dd=x-xp; float v=mix(.5,1.,h.y)*(1.-(dd<0.?-dd/wL:dd/wR)); m=max(m,v); }
  return pow(max(m,0.),pw); }
vec2 faceUV(vec2 hd,float el){ return hd*8.7*(1.+el*.85)+vec2(3.1,1.7); }
vec4 mountains(vec3 d, vec2 hd, float el, vec3 bg, float a, vec4 gl0){
  // a: 1 opposite the sun (faces lit), -1 toward it (silhouettes). Far rank first, nearest last.
  vec3 c=bg; float g=gl0.a;
  if(el<-.03||el>.7) return vec4(c,g);
  vec3 snowLit=uS[9].xyz; vec3 snowDk=uS[2].xyz*.62+vec3(.018,.022,.04);
  float lit=smoothstep(-.35,.5,a);
  vec2 perp=vec2(hd.y,-hd.x); float sideSun=dot(perp,uS[0].xy);
  float x0=gl0.x;
  for(int k=0;k<int(uS[5].y);k++){
    float fk=float(k), fr=2.-fk;          // fr: 2 is the farthest
    int id=int(uS[7].x)+k*37;
    float x=fract(x0+uS[7].y*.011*(fk+1.));
    float K1=floor(uS[6].x*(2.4+fr*1.3)), K2=K1*3.+1., K3=K1*11.+5., K4=K1*37.+13.;
    float pkS=0.;
    for(int j=0;j<int(uS[5].z);j++){ float Kj=j==0?K1:j==1?K2:j==2?K3:K4; float tj=tents(x*Kj,Kj,id+(j==0?0:j==1?3:j==2?7:11),1.);
      pkS+=(j==0?.74:j==1?.2:j==2?.08:.035)*pow(max(tj,0.),j==0?1.6875:j==1?1.1:1.); }
    float mass=smoothstep(.2,.7,f2o(hd*1.55+vec2(uS[7].y,fk*17.))+.04);
    float env=.3+.7*mass*(1.+.2*fr);
    float base=uS[6].y*(1.+.35*fr);
    float pk=uS[6].z*mix(.7,1.2,fr*.5)*env*pkS;
    float rn=(n2(hd*23.+fk*7.3).x-.5)*.5+(n2(hd*61.+fk*3.1).y-.5)*.32+(n2(hd*120.+fk*5.7).z-.5)*.1;
    float top=base+pk*(1.+.44*rn);
    float m=smoothstep(top+uPx,top-uPx*1.3,el);
    if(m>0.){
      float h01=clamp((el-base*.25)/max(top-base*.25,.003),0.,1.);
      // the face: ridged heights in azimuth and elevation, stretched down the fall line
      vec2 uv=faceUV(hd,el)+fk*23.;
      float F1=ridged(uv), F2=ridged(faceUV(hd+perp*.0045,el)+fk*23.);
      float slope=clamp((F2-F1)/.0045*.02,-.8,.8);
      float f2=n2(uv*5.3).y;
      // layered dip: thin limestone beds tilted across the whole range, seam-free round the circle
      float strat=el*150.+dot(hd,uS[0].zw)*uS[7].z+f2*.5+.18*F1;
      float n1=n2(vec2(strat,fk*11.)).x;
      float bed=smoothstep(.6,.76,n1)*(.5+.5*n2(vec2(strat*.31+9.,fk*3.)).y);   // sparse dark beds, thicker here and there
      float gully=1.-smoothstep(.08,.38,F1+.12*(n2(uv*11.).y-.5));              // the low lines between facets hold the snow
      float hi=smoothstep(.1,.55,h01);
      float rockB=smoothstep(.22,.6,F1*.9+.25*f2-gully*.45);
      float rock=clamp(rockB+(1.-mass)*.3,0.,1.)*hi*(1.-.3*smoothstep(.6,.8,n2(vec2(strat*.5+3.,fk*5.)).w))*(1.-.45*step(1.5,fk));
      // the terminator: only what stands above the Earth's shadow catches the last light
      float hA=(el-uS[6].y)/(uS[6].z*.8);
      float tl=smoothstep(uS[7].w-.08,uS[7].w+.26,mix(h01,hA,.92)+(F1-.5)*.2);
      float Ls=sign(sideSun+.001)*mix(.72,1.15,abs(sideSun));
      float face=clamp(.5+slope*Ls*.62+.26*(F1-.5),0.,1.);
      float litA=lit*tl*mix(.3,1.,smoothstep(.32,.84,face))*(1.-.16*fr);
      vec3 snow=mix(snowDk*(.92+.3*F1),snowLit*1.02*vec3(1.04,.94,.96),litA);
      vec3 rockLit=snowLit*vec3(.27,.27,.35)+vec3(.024,.026,.034), rockDk=snowDk*vec3(.56,.6,.72);
      float f3=n2(uv*17.+f2*3.).x;
      vec3 rk=mix(rockDk*(.7+.6*f2),rockLit*(.8+.4*f2),litA*.7)*(1.-.26*bed)*(.82+.36*f3);
      vec3 col=mix(snow,rk,rock);
      // sunward: silhouettes against the afterglow, faint structure still legible
      col=mix(col,snowDk*(.34+.2*fr)+uS[4].xyz*.1*(1.-h01)*h01,.82*smoothstep(.15,-.55,a));
      // forest on the toe of the nearest slopes
      if(k==2){ float fl=base*.5+.011*f2o(hd*9.+3.)+.0035*n2(hd*260.).x; float fm=smoothstep(fl+.006,fl-.004,el)*smoothstep(.34,.6,f2o(hd*4.+vec2(7.,fk))+.04); col=mix(col,mix(snowDk*vec3(.22,.28,.34),bg,.3),fm*.9); }
      float hz=clamp(.05+.26*fr+.42*pow(1.-h01,2.6),0.,.94)*(1.-uS[9].w*litA);
      col=mix(col,bg,hz);
      c=mix(c,col,m);
      g=mix(g,litA*(1.-hz)*(1.-.5*rock),m);
    }
  }
  return vec4(c,g);
}
void main(){
`+s+`  vec4 S=texelFetch(uP,ivec2(gl_FragCoord.xy),0); vec3 c=dec(S.rgb); float glow=S.a;
  float th=fract(at2(hd.x,hd.y)/6.2831853+.5);
  vec4 M=mountains(d,hd,el,c,-az,vec4(th,0.,0.,glow));
  o=vec4(enc(M.rgb),M.a);
}`,c=e+r+n+`float at2(float y,float x){ float ax=abs(x), ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-6)); if(ay>ax) a=1.5707963-a; if(x<0.) a=3.1415927-a; return y<0.?-a:a; }
// a periodic row of skewed tents: thrust-sheet peaks with a long dip slope and a short steep face
float tents(float x,float K,int id,float pw){ float i=floor(x),m=0.;
  for(int j=-1;j<=1;j++){ float c=i+float(j); vec4 h=texelFetch(uN,ivec2(int(mod(c,K))&255,id&255),0);
    float xp=c+.15+.7*h.x; float wL=mix(.7,1.25,h.z), wR=mix(1.1,1.85,h.w); float dd=x-xp; float v=mix(.5,1.,h.y)*(1.-(dd<0.?-dd/wL:dd/wR)); m=max(m,v); }
  return pow(max(m,0.),pw); }
void main(){
`+s+`  vec4 S=texelFetch(uP,ivec2(gl_FragCoord.xy),0); vec3 c=dec(S.rgb); float glow=S.a; vec3 c0=dec(texelFetch(uQ,ivec2(gl_FragCoord.xy),0).rgb);
  float th=fract(at2(hd.x,hd.y)/6.2831853+.5);
  // the far shore: an uneven forest edge, a point of land, gaps where snowfield runs on to the foot of the range
  {
    float ext=smoothstep(.45,.68,f2o(hd*2.7+vec2(uS[7].x*.1,7.))+.05);
    float sd=th-.5-uS[1].w; sd-=floor(sd+.5);
    float pt=smoothstep(.1,.008,sd)*smoothstep(-.05,-.004,sd);        // taller toward its root on the right, ending in a point
    float tw=tents(th*1600.,1600.,5,1.2)*.0034+tents(th*5801.,5801.,9,1.)*.0018;
    float h=(.0012+.0066*ext+.0072*smoothstep(.4,1.,f2o(hd*8.5+3.)+.05)*ext)*(.75+.5*n2(hd*80.).x);
    h=h+pt*(.0165+.009*smoothstep(.05,-.03,sd))+tw*(.35+.65*ext+pt*1.8);
    float top=h;
    float m=smoothstep(top+uPx,top-uPx,el);
    vec3 tree=mix(uS[2].xyz*.2+vec3(.004,.007,.014),uS[4].xyz*.08+uS[2].xyz*.12,smoothstep(0.,1.,az));
    float hz=clamp(mix(.55,.1,max(ext,pt))+.32*(1.-pt)*smoothstep(.45,.7,n2(hd*5.+13.).x),0.,.85);
    hz=clamp(hz+.22*(1.-el/max(top,.0006)),0.,.9);
    c=mix(c,mix(tree,c0,hz),m); glow*=1.-m*(1.-hz*.5);
    c=mix(c,uS[1].xyz*.82+uS[3].xyz*.12,.5*smoothstep(.0016,.0003,el)*step(0.,el));
  }
  if(y<0.) c=mix(c,uS[1].xyz*.6,smoothstep(0.,-.15,y));
  o=vec4(enc(c)+(n2(gl_FragCoord.xy*.73).x-.5)/255.,glow);
}`,m=e+r+`uniform vec4 uC[4],uA,uB,uD,uPh; out vec4 o;
void main(){
  vec2 q=gl_FragCoord.xy/uC[3].w*2.-1.;
  vec3 ro=uC[0].xyz, d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  if(d.y>=-.0007){ discard; }
  float t=-ro.y/d.y; vec3 p=ro+d*t;
  float r=length(p.xz-ro.xz);
  vec3 dt=refract(d,vec3(0.,1.,0.),1./1.31); vec2 sl=dt.xz/(-dt.y);
  vec3 c=uA.rgb*(.75+.5*n2(p.xz*.05).x);
  // milky veils: frozen in, lit by skylight, one shallow and one deep, displaced by the refracted ray for parallax
  vec2 q1=p.xz+sl*.34, q2=p.xz+sl*.72, q3=p.xz+sl*.95;
  float v1=smoothstep(.58,.86,.6*n2(q1*.5).x+.4*n2(q1*1.7+7.).y);
  float v2=smoothstep(.55,.9,.6*n2(q2*.28+3.).z+.4*n2(q2*1.2+9.).w);
  vec3 veil=mix(uB.rgb,uD.rgb,.4);
  c+=veil*(.018*uA.w*v1+.03*uA.w*v2)*exp(-t*.02);
  c+=uB.rgb*.003*uA.w*n2(q2*.7).x;
  // the bubble clusters' depth haze: the same cluster field as the discs, as a soft glow deep under them, with speckle
  float cl=.7*n2(q2*.13+uPh.xy).x+.3*n2(q2*.47+uPh.yx).y;
  float cl2=.7*n2(q3*.13+uPh.xy).x+.3*n2(q3*.47+uPh.yx).y;
  float hz=smoothstep(.42,.74,cl)*.55+smoothstep(.38,.72,cl2)*.45;
  c+=mix(uD.rgb,uB.rgb,.45)*hz*(.02+.012*n2(q2*.9).x)*uA.w*uPh.w*exp(-r*.012);
  // beyond the bubble geometry: a soft white speckle at its density
  float far=smoothstep(30.,70.,r);
  if(far>0.){
    float clF=.7*n2(p.xz*.13+uPh.xy).x+.3*n2(p.xz*.47+uPh.yx).y;
    vec2 q4=p.xz+sl*.3;
    float spk=smoothstep(.55,.9,texture(uN,(q4*2.3)/256.).x);
    c+=uB.rgb*(spk*.12+.14)*far*smoothstep(.36,.75,clF)*(1.-smoothstep(150.,520.,r));
  }
  o=vec4(enc(c)+(n2(gl_FragCoord.xy*.81).x-.5)/255.,0.);
}`,h=`uniform vec4 uC[4];
const float IOR=1.31;
vec3 refrP(vec3 Q){
  vec3 E=uC[0].xyz; float h=E.y, d=max(-Q.y,0.); vec2 D=Q.xz-E.xz; float L=length(D);
  if(L<1e-4||d<1e-5) return vec3(Q.x,0.,Q.z);
  float r=L*h/(h+d/IOR);
  for(int i=0;i<5;i++){ float rr=L-r; float a=sqrt(h*h+r*r), b=sqrt(d*d+rr*rr);
    float f=r/a-IOR*rr/b; float fp=h*h/(a*a*a)+IOR*d*d/(b*b*b); r=clamp(r-f/fp,0.,L); }
  vec2 s=E.xz+D/L*r; return vec3(s.x,0.,s.y);
}
vec4 proj(vec3 w){ vec3 v=w-uC[0].xyz; float cz=dot(v,uC[3].xyz); return vec4(dot(v,uC[1].xyz)/uC[0].w,dot(v,uC[2].xyz)/uC[0].w,.5*cz,cz); }
`,p=e+h+`layout(location=0) in vec2 aQ; layout(location=1) in vec4 aD; layout(location=2) in vec4 aE;
out vec2 vU; out vec4 vV; out float vS;
void main(){
  const float PAD=1.3;
  vec3 C=aD.xyz; float rw=aD.w;
  float dist=length(C-uC[0].xyz); float px=dist*uC[0].w*2./uC[3].w;
  float rEff=max(rw,px*.85);
  float ca=cos(aE.x),sa=sin(aE.x); vec2 sq=aQ*vec2(1.,aE.z);
  vec3 W=vec3(C.x+(ca*sq.x-sa*sq.y)*rEff*PAD,C.y,C.z+(sa*sq.x+ca*sq.y)*rEff*PAD);
  gl_Position=proj(refrP(W));
  vU=aQ*PAD;
  float depth=-C.y;
  float rpx=rEff/px;
  vV=vec4(aE.y, depth, rw/rEff*rw/rEff, clamp(1.1/rpx,0.,1.));
  vS=aE.w;
}`,g=e+r+`in vec2 vU; in vec4 vV; in float vS; uniform vec4 uL,uL2,uK; out vec4 o;
void main(){
  float s=vV.x, depth=vV.y, sharp=vS;
  vec2 p=vU; float r0=length(p);
  float fw=fwidth(r0);
  // a flat plate of gas under clear ice: a near-round outline with one or two shallow bays, and a crisp edge at any depth
  vec4 w1=n2(p*1.15+s*83.);
  float r=r0*(1.+(w1.x-.5)*(.1+.24*sharp)+(w1.y-.5)*.06);
  float e=clamp(fw*.8,.012,.28)+.035*smoothstep(.3,1.,depth)+uK.y;
  float a=1.-smoothstep(1.-e,1.+e*.35,r);
  if(a<=.003) discard;
  // frost on its upper face: fine crystal mottle and a faint growth ring or two; the edge, where the ice curls round it, is brighter
  vec4 m1=n2(p*5.+s*53.), m2=n2(p*17.+s*11.);
  float mott=.55*m1.z+.45*m2.w;
  float ring=smoothstep(.55,.9,n2(vec2(r*4.2+s*29.,s*7.)).x)*smoothstep(.2,.5,r);
  float rim=smoothstep(1.-e-.2,1.-e-.02,r);
  float fade=1.-exp(-depth*uL2.w);
  // the top plates are opaque frosted white; the ones under them are thin ghosts, bluer and dimmer, their rims holding longest
  float body=mix(.98,.31,fade)*(.86+.3*(mott-.5))*(1.-.12*ring);
  float cov=mix(body,mix(1.,.54,fade),rim)*vV.z*uK.x;
  vec3 col=mix(uL.rgb*(.88+.26*mott+.14*rim)*(1.+uK.z*exp(-depth*uK.w)),uL2.rgb*(1.+.38*rim),fade);
  o=vec4(enc(col)*a*cov,a*cov);
}`,M=e+h+`layout(location=0) in vec4 aA; layout(location=1) in vec4 aB; layout(location=2) in vec4 aS;
out vec3 vC; out float vF;
void main(){
  float u=float(gl_VertexID&1), v=float(gl_VertexID>>1)/4.;
  vec3 A=vec3(aA.x,0.,aA.y), B=vec3(aB.x,0.,aB.y);
  float dist0=length(mix(A,B,u)-uC[0].xyz); float pxD=dist0*uC[0].w*2./uC[3].w;
  float dep=max(mix(aA.z,aB.z,u),pxD*7.)*v; float dip=mix(aA.w,aB.w,u)*v;
  vec2 m=(B.xz-A.xz); vec2 nrm=normalize(vec2(-m.y,m.x));
  vec3 Q=mix(A,B,u); Q.xz+=nrm*dip*dep; Q.y=-dep-aS.w;
  gl_Position=proj(refrP(Q));
  vC=vec3(mix(aS.x,aS.y,u), v, aS.z);
  vF=mix(1.,.3,smoothstep(11.,55.,length(Q-uC[0].xyz)));
}`,A=e+r+`in vec3 vC; in float vF; uniform vec4 uL,uK; out vec4 o;
void main(){
  float s=vC.x, v=vC.y, sd=vC.z;
  // the lower edge of the sheet is torn and feathers out
  float low=.18+.68*n2(vec2(s*.9+sd*80.,sd*9.)).x+.2*n2(vec2(s*5.+sd*20.,sd*4.)).y;
  float a=(1.-smoothstep(low-.4,low,v))*(1.-smoothstep(.82,1.,v));
  // hackle: fine slanted striations running down and away from the top edge
  float hk1=n2(vec2(s*56.+v*9.+sd*31.,v*2.5)).x, hk2=n2(vec2(s*187.-v*14.+sd*7.,v*5.)).y;
  float hk=pow(hk1,2.1)*.62+pow(hk2,1.9)*.38;
  float patchy=mix(.32,1.,n2(vec2(s*2.4+sd*50.,sd*3.)).z)*(.45+.55*smoothstep(.2,.7,n2(vec2(s*.5+sd*61.,sd*17.)).x));
  // the bright lip along the top edge
  float fv=fwidth(v); float lip=(1.-smoothstep(max(.012,fv*.8),max(.03,fv*2.6),v))*(.5+.5*smoothstep(.25,.65,n2(vec2(s*.8,sd*2.)).x))*smoothstep(.0,.35,patchy+.22);
  // plumes: broad feathers that fan down the plane from the top edge, under the fine hackle
  float pl=n2(vec2(s*7.+v*3.4+sd*13.,v*1.3+sd*5.)).z; pl=1.-abs(2.*pl-1.);
  float sheet=(.3+.62*hk+.36*pl*pl)*mix(.5,1.,patchy)*(1.-.8*smoothstep(.0,.95,v));
  float cov=max(sheet,lip*.86)*vF;
  a*=cov*uK.x;
  vec3 col=mix(uL.rgb*vec3(.5,.6,.72)*(1.-.4*v),uL.rgb*1.3,lip);
  o=vec4(enc(col)*a,a);
}`,X=e+r+`uniform vec4 uC[4],uA2,uB2,uSh; uniform sampler2D uT; uniform samplerCube uSky; out vec4 o;
uniform vec4 uW;
vec2 fineLines(vec2 p0,vec2 pw,float fw,float dA){ vec2 o2=vec2(0.);
  for(int L=0;L<int(uW.w);L++){
    vec2 p=L<2?pw:p0; float cell=L==0?.74:L==1?.36:L==2?.12:.05; int id=L==0?47:L==1?61:L==2?13:29; float w=L==0?.0024:L==1?.0015:L==2?.0012:.0008;
    float dirK=L==0?.25:L==1?0.:L==2?.72:.2; float dirA=L==0?dA+1.2:dA;
    float k=L==0?.3:L==1?.2:L==2?.16:.12;
    vec2 g=floor(p/cell); float m=0.;
    for(int j=-1;j<=1;j++) for(int i=-1;i<=1;i++){ ivec2 ci=ivec2(g)+ivec2(i,j); vec4 h=texelFetch(uN,ivec2(ci.x&255,(ci.y+id)&255),0);
      if(h.x<.5) continue;
      vec2 c0=(vec2(ci)+h.yz)*cell; float ang=mix(h.w*6.2831853,dirA+(h.w-.5)*.7,dirK); vec2 dir=vec2(cos(ang),sin(ang));
      float hl=(.12+.34*h.y)*cell; vec2 q=p-c0; float t=clamp(dot(q,dir),-hl,hl); float d=length(q-dir*t);
      float ww=max(w,fw); m=max(m,(1.-smoothstep(ww*.4,ww*1.3,d))*(w/ww)*h.z*(.3+.7*smoothstep(hl,0.,abs(t)))); }
    if(L<2) o2.x+=m*k; else o2.y+=m*k;
  }
  return o2; }
float snowH(vec2 sp){ return n2(sp*.5+.31).x*.5+n2(sp*1.45+7.73).y*.3+n2(sp*4.3+3.1).z*.14+n2(sp*13.+1.7).w*.06; }
void main(){
  ivec2 fc=ivec2(gl_FragCoord.xy);
  vec2 q=gl_FragCoord.xy/uC[3].w*2.-1.;
  vec3 ro=uC[0].xyz, d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  if(d.y>=-.0007){ o=texelFetch(uT,fc,0); return; }
  float t=-ro.y/d.y; vec3 p=ro+d*t; float r=length(p.xz-ro.xz);
  vec2 hd=normalize(p.xz-ro.xz);
  float fw=length(fwidth(p.xz));
  // wind-polish: long shallow ribs along the wind, fine pitting across
  vec2 w=vec2(p.x*uW.x+p.z*uW.y,-p.x*uW.y+p.z*uW.x);
  float rough=clamp(.26+.5*smoothstep(.36,.72,n2(p.xz*.018+.3).y)+.22*smoothstep(.4,.78,n2(p.xz*.09+.1).x),0.,1.);
  vec2 g=(n2(p.xz*14.).xy-.5)*.0026*smoothstep(26.,5.,r)+(n2(p.xz*.31+.5).xy-.5)*.0045;
  vec3 n=normalize(vec3(g.x,1.,g.y));
  float cosT=max(-dot(d,n),.0015);
  float F=.018+.982*pow(1.-cosT,5.);
  F*=mix(1.,.72,rough);
  vec3 Rv=reflect(d,n); Rv.y=abs(Rv.y)+.004;
  float lod=mix(1.,4.4,rough*(1.-.7*smoothstep(7.,26.,r)));
  vec3 rc=vec3(0.); float gsum=0.;
  float dith=n2(gl_FragCoord.xy*.61).x;
  for(int i=0;i<3;i++){ float fi=(float(i)-1.+dith-.5)*(.55+rough*.9); vec3 rr=normalize(Rv+vec3(0.,fi*.05,0.)); vec4 sc=textureLod(uSky,rr,lod+fi*fi*.25); rc+=dec(sc.rgb); gsum+=sc.a; }
  rc/=3.; float glow=gsum/3.;
  // what's under the ice, through the wobbling surface
  vec2 uv=(gl_FragCoord.xy+g*uC[3].w*.8)/uC[3].w;
  uv=clamp(uv,vec2(.0005),vec2(.9995));
  vec3 T=dec(textureLod(uT,uv,0.).rgb);
  vec3 c=mix(T*(1.-F),rc,F);
  // ---- the surface itself, sitting above the bubbles ----
  // the dull sheen: a broad milky sky reflection that veils the ice unevenly, stronger across polished patches
  vec3 dul=dec(textureLod(uSky,normalize(Rv*vec3(1.,.55,1.)+vec3(0.,.25,0.)),5.5).rgb);
  float pol=.72*n2(p.xz*.2+11.).x+.28*n2(p.xz*.85+5.3).y;
  float sheen=smoothstep(.32,.8,pol);
  float veilA=(.07+.36*sheen)*(.14+.86*pow(1.-cosT,1.7))*uSh.x;
  c=mix(c,dul,clamp(veilA,0.,.62));
  // fine white fracture veils near the surface: thin curved threads, each with a soft milky halo, in broken runs
  float wm=f2o(p.xz*.55+uSh.yz);
  vec2 pw=p.xz+vec2(wm*1.6,f2o(p.xz*.55+uSh.zy+6.)*1.6);
  vec2 fl2=fineLines(p.xz,pw,fw,uW.z); float arcs=fl2.x;
  float nearK=1.-smoothstep(1.,16.,r);
  float vl=clamp(arcs,0.,.6)*nearK*smoothstep(.46,.7,n2(p.xz*.27+uSh.yz).z);
  // frost patches: rimed, grainy, in soft-edged islands
  float fN=f2o(p.xz*.42+uSh.zy+3.)+.05;
  float fK=smoothstep(.72,.88,fN);
  // its grain finer than a pixel or two at your feet: a coarse grain thresholded read as a cloth of dark holes
  float fg=texture(uN,(p.xz*190.)/256.).x*.75+texture(uN,(p.xz*23.)/256.).w*.25;
  float frost=fK*smoothstep(.3,.8,fg)*(.26+.34*n2(p.xz*1.3).y)*uSh.w;
  // tiny surface scratches, mostly along the wind
  float scr=fl2.y;
  scr*=1.-smoothstep(4.,14.,r);
  c+=uA2.rgb*(vl*.9+scr*.55);
  c=mix(c,uA2.rgb*vec3(.95,.97,1.),frost*.18);
  c+=uA2.rgb*.005*rough;
  // snow film: thin wind-laid patches, denser in the lee of cracks is left to the bands
  float snow=0.;
  if(uB2.x>0.){
    vec2 sp=w*vec2(mix(.4,.12,uB2.y),mix(1.15,2.1,uB2.y))+uSh.yz*3.;
    float th=uB2.z;
    float h0=snowH(sp), h1=snowH(sp+vec2(.2,.05));
    float grain=texture(uN,(p.xz*90.)/256.).x;
    float m=smoothstep(th,th+.018+.25*fw,h0+(grain-.5)*.012);
    float thick=clamp((h0-th)*10.,0.,1.);
    // a skirt of loose dust round each patch and trailing down the wind
    float skirt=smoothstep(th-.075,th,h0)*(.1+.2*smoothstep(.35,.8,n2(sp*vec2(3.,9.)+5.).x))*mix(.6,1.,grain);
    snow=max(m*.97,skirt);
    // far out the patches go under a pixel: settle to their mean cover
    snow=mix(snow,clamp((.74-th)*2.1,0.,.8),smoothstep(.3,2.4,fw));
    float rel=clamp((h1-h0)*16.,-1.,1.)*(1.-.5*thick);
    vec3 sn=uA2.rgb*(.98+.07*grain)*(1.+.2*rel)*mix(vec3(.86,.9,1.),vec3(1.),.5+.5*rel)*mix(.9,1.,thick);
    sn*=.92+.12*n2(sp*vec2(2.6,23.)+9.).y;
    c=mix(c,sn,snow); glow*=1.-.4*snow;
  }
  { float fl=smoothstep(.93,.985,texture(uN,(p.xz*260.)/256.).x)*smoothstep(13.,1.2,r)*(1.-snow);
    float sh2=.7+.3*n2(p.xz*.6).x; c*=mix(1.,sh2,.5); c+=uA2.rgb*fl*.32; }
  // far: value of the ice settles toward the reflected horizon, keep it dull
  c=mix(c,rc*.55+uA2.rgb*.09,smoothstep(60.,1200.,r)*.5);
  // snow-covered ice in front of the shore, with a ragged, uneven near edge
  { float R0=45.+520.*smoothstep(.34,.8,f2o(hd*3.+vec2(1.7,9.))+.05)+130.*n2(hd*33.).x;
    float se=smoothstep(R0*.62,R0*1.4,r+R0*.55*(n2(hd*71.).y-.5));
    se*=mix(.42,1.,smoothstep(.3,.65,n2(hd*12.+4.).x));
    float sn=mix(.86,1.,n2(hd*180.).x);
    c=mix(c,(rc*.62+uA2.rgb*.42)*sn,se*.8); glow*=1.-.5*se; }
  float gout=glow*min(1.,F*2.2+snow*.45);
  o=vec4(enc(c)+(n2(gl_FragCoord.xy*.57+3.1).x-.5)/255.,clamp(gout,0.,1.));
}`,U=e+r+`uniform vec4 uC[4],uF,uW2,uAmb; uniform sampler2D uB; out vec4 o;
vec3 aces(vec3 c){ return clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.); }
void main(){
  ivec2 fc=ivec2(gl_FragCoord.xy);
  vec4 b=texelFetch(uB,fc,0);
  vec3 c=dec(b.rgb);
  float g=b.a;
  // the alpenglow slowly leaves: pink pixels lose their red first, the whole frame sinks a little
  c*=mix(vec3(1.),vec3(.44,.6,.96),g*uF.x);
  c*=mix(1.,.8,uF.x);
  vec2 q=gl_FragCoord.xy/uC[3].w*2.-1.;
  vec3 ro=uC[0].xyz, d=normalize(uC[3].xyz+(q.x*uC[1].xyz+q.y*uC[2].xyz)*uC[0].w);
  if(d.y<-.002){
    float t=-ro.y/d.y;
    vec3 p=ro+d*t;
    float r=length(p.xz-ro.xz);
    float reach=1.-smoothstep(16.,uF.w,r);
    if(reach>0.){
      vec2 wv=vec2(p.x*uW2.x+p.z*uW2.y,-p.x*uW2.y+p.z*uW2.x);
      float tt=uF.y;
      float snake=(n2(vec2(wv.x*1.3-tt*.35,wv.y*.6)).x-.5)*.36+(n2(vec2(wv.x*.31-tt*.1,wv.y*.2)+11.).x-.5)*1.5+(n2(vec2(wv.x*.017-tt*.008,wv.y*.06)+40.).x-.5)*14.;
      float lat=wv.y+snake;
      float kW=(2.4-uW2.z)*1.25;
      float lane=smoothstep(.52-.22*kW,.8-.12*kW,n2(vec2(wv.x*.05-tt*.13,lat*.75)).x);
      float gate=smoothstep(.34,.72,n2(vec2(wv.x*.55-tt*.9,lat*1.4)+5.).y);
      float ph=n2(vec2(wv.x*.22-tt*.5,lat*5.5)).x;
      float rib=1.-abs(2.*ph-1.);
      float ph2=n2(vec2(wv.x*.4-tt*.8,lat*13.)+23.).x;
      float rib2=1.-abs(2.*ph2-1.);
      float thin=.42*pow(rib,uW2.z*2.)+.26*pow(rib2,uW2.z*2.4)+.12*rib*rib;
      thin=mix(thin,.1,smoothstep(9.,30.,r));
      float dens=uW2.w*reach*lane*gate*thin*smoothstep(1.,6.5,r);
      c+=uAmb.rgb*dens;
    }
  }
  c*=uF.z;
  c=aces(c);
  vec2 uv=gl_FragCoord.xy/uC[3].w;
  float vig=smoothstep(1.32,.55,length(uv-.5)*1.45);
  c*=mix(.95,1.,vig);
  c=pow(c,vec3(1./2.2));
  c+=(texture(uN,gl_FragCoord.xy/256.+uAmb.w).x-.5)/255.*1.6;
  o=vec4(c,1.);
}`,q=(v,L,tt)=>{const N=t.createShader(v);return t.shaderSource(N,L),t.compileShader(N),N},_={},P=[],E=(v,L,tt,N)=>{const T=q(t.VERTEX_SHADER,L,v),K=q(t.FRAGMENT_SHADER,tt,v),dt=t.createProgram();t.attachShader(dt,T),t.attachShader(dt,K),t.linkProgram(dt),P.push([dt,T,K,v]),_[v]=dt};E("sky",a,l),E("mt",a,i),E("sh",a,c),E("deep",a,m),E("disc",p,g),E("crk",M,A),E("comp",a,X),E("frame",a,U),t.flush(),f.P=_,f.shaders=P,f.checked=!1;const B={};for(const v in _){const L={},tt=t.getProgramParameter(_[v],t.ACTIVE_UNIFORMS)||0;for(let N=0;N<tt;N++){const T=t.getActiveUniform(_[v],N),K=T.name.replace("[0]","");L[K]=t.getUniformLocation(_[v],T.name)}B[v]=L}f.U=B}const J=f.P,u=f.U,lt=Wt?1:.42,Tt=bt==="Dense towers",$=bt==="Great pancakes",G=bt==="Sparse strings",mt=Tt?2.1:G||$?.4:1,ot=Math.floor(3e5*lt),I=new Float32Array(ot*8);let R=0;const at=[o()*200,o()*200],te=(e,a)=>{const r=$t(e*.13+at[0],a*.13+at[1],0),n=$t(e*.47+at[1],a*.47+at[0],1);return r*.7+n*.3},Rt=(e,a,r,n,s,l,i)=>{if(R>=ot||a<.012||a>1.05)return;const c=R*8;I[c]=e,I[c+1]=-a,I[c+2]=r,I[c+3]=n,I[c+4]=s*6.28,I[c+5]=s,I[c+6]=l,I[c+7]=i,R++},ee=(e,a,r)=>{const n=Math.max(0,Math.min(1,(r-e)/(a-e)));return n*n*(3-2*n)},zt=(e,a,r,n,s,l)=>{const i=.003+o()*.01,c=o()*F,m=Math.cos(c)*i,h=Math.sin(c)*i;let p=e,g=a,M=s,A=r;const X=.86+.24*o();n=Math.min(n,2+Math.floor(r*110));for(let U=0;U<n;U++){Rt(p,M,g,A*(.85+.3*o()),o(),.8+.2*o(),l*(.8+.2*o()));const q=Math.max(.012,A*(.3+.95*o()*o()))*(1+M*.7);if(M-=q,M<.02)break;p+=m+(o()-.5)*A*.3,g+=h+(o()-.5)*A*.3,A=Math.min(.22,Math.max(.008,A*X*(.92+.16*o()))),o()<.06&&(A*=.7)}},oe=(e,a,r,n)=>{const s=o()*F,l=.0015+o()*.003,i=Math.cos(s)*l,c=Math.sin(s)*l;let m=r,h=e,p=a;for(let g=0;g<n&&(Rt(h,m,p,.0018+o()*o()*.007,o(),.85+.15*o(),.1+o()*.3),m-=.004+o()*o()*.05,!(m<.02));g++)h+=i+(o()-.5)*.002,p+=c+(o()-.5)*.002},ae=()=>{const e=o(),a=o();return e<.07?.09+o()*.09:.016+.085*a*a},ke=()=>o()<.3?.5+o()*.5:o()*.3,Se=()=>{const e=o();return Tt?8+Math.floor(o()*16):$?2+Math.floor(o()*3):G?2+Math.floor(o()*4):e<.3?1+Math.floor(o()*2):e<.75?3+Math.floor(o()*3):6+Math.floor(o()*6)},kt=$?2.6:G?.7:1,St=(e,a,r,n)=>{for(let s=0;s<n;s++){const l=o()*F,i=Math.sqrt(o())*r,c=e+Math.cos(l)*i*1.1,m=a+Math.sin(l)*i;zt(c,m,(.026+.085*o()*o())*kt,$?2+Math.floor(o()*4):2+Math.floor(o()*6)+(Tt?8:0),.08+o()*.5,o()*.6)}};{const e=b?.55:.3+o()*.7,a=b?2.05:1.9+o()*.7,r=b?-1.05:-(.6+o()*1.2),n=b?3.3:2.8+o()*.9;if(G){St(e,a,.95,9);for(let s=0;s<50;s++){const l=o()*F,i=Math.sqrt(o())*1.1;oe(e+Math.cos(l)*i,a+Math.sin(l)*i,.2+o()*.7,18+Math.floor(o()*26))}}else St(e,a,.95,$?12:34),St(r,n,.8,$?9:24)}const re=Math.floor(7600*lt*mt),Fe=re*.78;for(let e=0;e<re&&R<ot-64;e++){const a=e<Fe?Math.sqrt(o())*5.5:5.5+o()*13,r=o()*F,n=Math.sin(r)*a,s=Math.cos(r)*a,l=te(n,s)+(b&&a<5.5?.035:0);if(o()>ee(.33,.6,l)*.9+.04)continue;const i=(o()<.6?.06+o()*.34:.3+o()*.6)*(G?.72:1);zt(n,s,ae()*kt,Se(),i,ke())}const Me=Math.floor((G?26e3:7e3*Math.min(mt,1.4))*lt);for(let e=0;e<Me&&R<ot-64;e++){const a=Math.sqrt(o())*7.5,r=o()*F;Rt(Math.sin(r)*a,.02+Math.pow(o(),.7),Math.cos(r)*a,.0022+.006*o()*o(),o(),.8+.2*o(),o()*.7)}const _e=Math.floor((G?1300:320)*lt*(G?1:Math.min(mt,1.5)));for(let e=0;e<_e&&R<ot-64;e++){const a=Math.sqrt(o())*7.5,r=o()*F;oe(Math.sin(r)*a,Math.cos(r)*a,.12+o()*.9,8+Math.floor(o()*26))}const Ce=Math.floor(4200*lt*mt);for(let e=0;e<Ce&&R<ot-16;e++){const a=16*Math.exp(o()*Math.log(5)),r=o()*F,n=Math.sin(r)*a,s=Math.cos(r)*a;o()>ee(.4,.62,te(n,s))||zt(n,s,ae()*kt*(1+a*.02),$?2:3+Math.floor(o()*5),.08+o()*.7,o()*.4)}const ft=4096,pt=new Uint32Array(ft+1),ne=new Uint32Array(R),se=e=>ft-1-Math.min(ft-1,-I[e*8+1]/1.1*ft|0);for(let e=0;e<R;e++)pt[se(e)+1]++;for(let e=0;e<ft;e++)pt[e+1]+=pt[e];for(let e=0;e<R;e++)ne[pt[se(e)]++]=e;const Ft=new Float32Array(R*8);let j=R,Pe=-.16;for(let e=0;e<R;e++){const a=ne[e]*8;for(let r=0;r<8;r++)Ft[e*8+r]=I[a+r];j===R&&Ft[e*8+1]>Pe&&(j=e)}const d=new Float32Array(9e3*12);let rt=0,ce=0;const Mt=new Map,ie=(e,a)=>(Math.floor(e/2)+4096)*8192+Math.floor(a/2)+4096,Le=e=>{const a=e*12,r=1+Math.floor(Math.hypot(d[a+4]-d[a],d[a+5]-d[a+1])/1.5);for(let n=0;n<=r;n++){const s=n/r,l=ie(d[a]+(d[a+4]-d[a])*s,d[a+1]+(d[a+5]-d[a+1])*s);let i=Mt.get(l);i||Mt.set(l,i=[]),i.push(e)}},le=new Uint32Array(9e3);let _t=0;const De=(e,a,r,n)=>{let s=2;_t++;const l=1+Math.floor(Math.hypot(r-e,n-a)/1.5);for(let i=0;i<=l;i++){const c=i/l,m=Mt.get(ie(e+(r-e)*c,a+(n-a)*c));if(m)for(let h=0;h<m.length;h++){const p=m[h];if(le[p]===_t)continue;le[p]=_t;const g=p*12,M=d[g],A=d[g+1],X=d[g+4]-M,U=d[g+5]-A,q=r-e,_=n-a,P=q*U-_*X;if(Math.abs(P)<1e-9)continue;const E=M-e,B=A-a,v=(E*U-B*X)/P,L=(E*_-B*q)/P;v>.001&&v<1&&L>=0&&L<=1&&v<s&&(s=v)}}return s<2?s:-1},ht=(e,a,r,n,s,l,i,c,m)=>{let h=e,p=a,g=r,M=0,A=i*(.75+.4*o()),X=(o()-.5)*.6,U=0,q=22+o()*70;for(let _=0;_<n;_++){if(rt>=8900)return;const P=Math.hypot(h,p),E=(.1+.048*P)*s;U=U*.92+(o()-.5)*.16,g+=(U*.07+(o()-.5)*.018)*Math.min(1,E/.2)*Math.min(1,16/(P+1)),--q<=0&&(g+=(o()<.5?-1:1)*(P<9?.07+o()*.26:.03+o()*.09),q=30+o()*90);let B=h+Math.sin(g)*E,v=p+Math.cos(g)*E,L=!1;if(m&&_>1){const K=De(h,p,B,v);K>=0&&(B=h+(B-h)*K,v=p+(v-p)*K,L=!0)}const tt=Math.max(.03,A+(o()-.5)*.1*Math.min(1,E*3.5)+(i-A)*.05),N=X+(o()-.5)*.26,T=rt*12;if(d[T]=h,d[T+1]=p,d[T+2]=A,d[T+3]=X,d[T+4]=B,d[T+5]=v,d[T+6]=tt,d[T+7]=N,d[T+8]=M,d[T+9]=M+E,d[T+10]=o(),d[T+11]=l,Le(rt),rt++,M+=E,h=B,p=v,A=tt,X=Math.max(-.7,Math.min(.7,N)),L||P>(c===0?70:24))return;if(c<2&&P<9&&o()<(c===0?.018:.012)){const K=o()<.5?-1:1;ht(h,p,g+K*(.5+o()*.85),16+Math.floor(o()*60),s*.85,l+o()*.04,A*(.45+.4*o()),c+1,!0)}}},vt=Gt==="One great fracture",wt=b?0:o()*F,Ct=(e,a)=>[Math.sin(e+wt)*a,Math.cos(e+wt)*a];[[Ct(-.17,2.45),1.02,0,vt?.95:.52,1.3],[Ct(.3,4.7),-.72,.03,vt?.6:.62,1.2],[Ct(-.2,10.8),1.5,.08,.7,1.15]].forEach((e,a)=>{vt&&a===2||(ht(e[0][0],e[0][1],e[1]+wt,460,1,e[2],e[3],0,a>0),ht(e[0][0],e[0][1],e[1]+wt+Math.PI,460,1,e[2],e[3],0,a>0),ce++)});const Ue=Gt==="Web"?13:vt?2:3;for(let e=0;e<Ue;e++){const a=o()*F,r=4+o()*o()*16,n=o()*F,s=Math.sin(a)*r,l=Math.cos(a)*r;ce++;const i=o()*o()*.14,c=.16+o()*.5,m=1.1;ht(s,l,n,500,m,i,c,0,!0),ht(s,l,n+Math.PI,500,m,i,c,0,!0)}const fe=f.fbo,Pt=(e,a,r,n,s,l,i)=>{const c=t.createTexture();return t.bindTexture(t.TEXTURE_2D,c),t.texImage2D(t.TEXTURE_2D,0,r,e,a,0,n,s,l),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,i),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),c},D=(e,a,r)=>{t.activeTexture(t.TEXTURE0+e),t.bindTexture(a,r)},Lt=()=>{t.disable(t.BLEND),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.disable(t.SCISSOR_TEST),t.depthMask(!0),t.colorMask(!0,!0,!0,!0),t.bindVertexArray(f.empty)},ut=(e,a)=>{const r=(a[0]+a[1]+a[2])/3;return[(r+(a[0]-r)*e)*x.ex,(r+(a[1]-r)*e)*x.ex,(r+(a[2]-r)*e)*x.ex]},Dt=ut(.84,x.hor),Ut=ut(.88,x.shd),nt=ut(.8,x.belt),Bt=ut(.86,x.sun),Nt=ut(.88,x.zen),Be=b?.082:(o()-.5)*.34,he=b?Math.PI/2:o()*F,Ne=o()<.5?-1:1,Ie=new Float32Array([Yt[0],Yt[1],Math.sin(he),Math.cos(he),Dt[0],Dt[1],Dt[2],Be,Ut[0],Ut[1],Ut[2],0,nt[0],nt[1],nt[2],0,Bt[0],Bt[1],Bt[2],0,it==="Blue hour"?.55:it==="Last pink"?.28:it==="Pink alpenglow"?.1:0,3,4,0,At[0],At[1],At[2],x.bw||.12,Math.floor(xt[0])%200,xt[1],Ne*(58+o()*44),x.term,Nt[0],Nt[1],Nt[2],0,...x.key||[nt[0],nt[1],nt[2],0],...x.bel?[x.bel[0]*x.ex,x.bel[1]*x.ex,x.bel[2]*x.ex,x.bel[3]]:[0,0,0,0]]),st=Wt?256:128,yt=t.createTexture();t.bindTexture(t.TEXTURE_CUBE_MAP,yt);for(let e=0;e<6;e++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,t.RGBA8,st,st,0,t.RGBA,t.UNSIGNED_BYTE,null);t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_LINEAR),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_CUBE_MAP,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const Xe=[[0,0,-1,0,-1,0,1,0,0],[0,0,1,0,-1,0,-1,0,0],[1,0,0,0,0,1,0,1,0],[1,0,0,0,0,-1,0,-1,0],[1,0,0,0,-1,0,0,0,1],[-1,0,0,0,-1,0,0,0,-1]],ue=(e,a,r,n,s,l)=>{(!f.sT||f.sN<e)&&(f.sT&&f.sT.forEach(c=>t.deleteTexture(c)),f.sT=[0,1].map(()=>Pt(e,e,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST)),f.sN=e);const i=f.sT;for(let c=0;c<3;c++){const m=c===0?"sky":c===1?"mt":"sh",h=u[m];c<2?t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,i[c],0):l(),t.useProgram(J[m]),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(h.uN,0),c>0&&(D(1,t.TEXTURE_2D,i[c-1]),t.uniform1i(h.uP,1),D(2,t.TEXTURE_2D,i[0]),t.uniform1i(h.uQ,2)),t.uniform2f(h.uRes,e,e),t.uniform4fv(h.uS,Ie),t.uniform1f(h.uPx,a),t.uniform3fv(h.uFX,r),t.uniform3fv(h.uFY,n),t.uniform3fv(h.uFZ,s),t.drawArrays(t.TRIANGLES,0,3)}};Lt(),t.bindFramebuffer(t.FRAMEBUFFER,fe),t.viewport(0,0,st,st);for(let e=0;e<6;e++){const a=Xe[e];ue(st,2/st,a.slice(0,3),a.slice(3,6),a.slice(6,9),()=>t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+e,yt,0)),t.flush()}if(t.bindTexture(t.TEXTURE_CUBE_MAP,yt),t.generateMipmap(t.TEXTURE_CUBE_MAP),!f.checked){f.checked=!0;for(const e of f.shaders)t.getProgramParameter(e[0],t.LINK_STATUS)||console.error("607 link "+e[3]+": "+t.getProgramInfoLog(e[0])+" "+t.getShaderInfoLog(e[1])+" "+t.getShaderInfoLog(e[2]))}const It=Pt(C,C,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.LINEAR),de=Pt(C,C,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,null,t.NEAREST),Ge=!!It,xe=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,xe),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);const Xt=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,Xt),t.bufferData(t.ARRAY_BUFFER,Ft,t.STATIC_DRAW);const qt=t.createVertexArray();t.bindVertexArray(qt),t.bindBuffer(t.ARRAY_BUFFER,xe),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,Xt),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,0),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,16),t.vertexAttribDivisor(2,1);const me=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,me),t.bufferData(t.ARRAY_BUFFER,d.subarray(0,rt*12),t.STATIC_DRAW);const pe=t.createVertexArray();t.bindVertexArray(pe),t.bindBuffer(t.ARRAY_BUFFER,me),t.enableVertexAttribArray(0),t.vertexAttribPointer(0,4,t.FLOAT,!1,48,0),t.vertexAttribDivisor(0,1),t.enableVertexAttribArray(1),t.vertexAttribPointer(1,4,t.FLOAT,!1,48,16),t.vertexAttribDivisor(1,1),t.enableVertexAttribArray(2),t.vertexAttribPointer(2,4,t.FLOAT,!1,48,32),t.vertexAttribDivisor(2,1),t.bindVertexArray(null);const w=new Float32Array(16),z=[1,0,0],O=[0,1,0],k=[0,0,1],qe=()=>{const e=S.view||Ee,a=Te+e.yaw,r=Re+e.pitch,n=Math.cos(r),s=Math.sin(r),l=Math.cos(a),i=Math.sin(a);return k[0]=i*n,k[1]=s,k[2]=l*n,z[0]=l,z[1]=0,z[2]=-i,O[0]=k[1]*z[2]-k[2]*z[1],O[1]=k[2]*z[0]-k[0]*z[2],O[2]=k[0]*z[1]-k[1]*z[0],w[0]=e.x,w[1]=Ae+e.y,w[2]=e.z,w[3]=W,w[4]=z[0],w[5]=z[1],w[6]=z[2],w[7]=0,w[8]=O[0],w[9]=O[1],w[10]=O[2],w[11]=0,w[12]=k[0],w[13]=k[1],w[14]=k[2],w[15]=C,e.yaw+","+e.pitch+","+e.x+","+e.y+","+e.z},y=[x.amb[0]*x.ex,x.amb[1]*x.ex,x.amb[2]*x.ex],H=jt==="Milky",Kt=[y[0]*.66,y[1]*.66,y[2]*.68,0],Ot=[y[0]*1.95,y[1]*1.95,y[2]*1.85,0],gt=[y[0]*.12+Z[0]*2.2+(H?.012:0),y[1]*.28+Z[1]*2.6+(H?.022:0),y[2]*.3+Z[2]*2.6+(H?.028:0),H?1.15:1.45],Ke=H?2.4:1;let ve="";const Oe=()=>{Lt(),t.bindFramebuffer(t.FRAMEBUFFER,fe),t.viewport(0,0,C,C),ue(C,1.6*W*2/C,[z[0]*W,z[1]*W,z[2]*W],[O[0]*W,O[1]*W,O[2]*W],[k[0],k[1],k[2]],()=>t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,It,0)),t.useProgram(J.deep),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(u.deep.uN,0),t.uniform4fv(u.deep.uC,w),t.uniform4f(u.deep.uA,Z[0],Z[1],Z[2],Z[3]),t.uniform4f(u.deep.uPh,at[0],at[1],0,Ke),t.uniform4f(u.deep.uB,y[0],y[1],y[2],0),t.uniform4f(u.deep.uD,y[0]*.7,y[1]*.85,y[2],0),t.drawArrays(t.TRIANGLES,0,3),t.enable(t.BLEND),t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA),t.useProgram(J.disc),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(u.disc.uN,0),t.uniform4fv(u.disc.uC,w),t.uniform4f(u.disc.uL,Kt[0],Kt[1],Kt[2],0),t.uniform4f(u.disc.uL2,gt[0],gt[1],gt[2],gt[3]),t.uniform4f(u.disc.uK,H?.78:.92,H?.22:0,2.1,10),t.bindVertexArray(qt),j>0&&t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,j),t.useProgram(J.crk),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(u.crk.uN,0),t.uniform4fv(u.crk.uC,w),t.uniform4f(u.crk.uL,Ot[0],Ot[1],Ot[2],0),t.uniform4f(u.crk.uK,1,0,0,0),t.bindVertexArray(pe),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,10,rt),j<R&&(t.useProgram(J.disc),t.bindVertexArray(qt),t.bindBuffer(t.ARRAY_BUFFER,Xt),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,j*32),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,j*32+16),t.drawArraysInstanced(t.TRIANGLE_STRIP,0,4,R-j),t.vertexAttribPointer(1,4,t.FLOAT,!1,32,0),t.vertexAttribPointer(2,4,t.FLOAT,!1,32,16)),t.disable(t.BLEND),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,de,0),t.useProgram(J.comp),t.bindVertexArray(f.empty),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(u.comp.uN,0),D(1,t.TEXTURE_2D,It),t.uniform1i(u.comp.uT,1),D(2,t.TEXTURE_CUBE_MAP,yt),t.uniform1i(u.comp.uSky,2),t.uniform4fv(u.comp.uC,w),t.uniform4f(u.comp.uA2,y[0],y[1],y[2],0),t.uniform4f(u.comp.uB2,be,Q==="Wind bands"?1:0,Q==="Wind bands"?.6:Q==="Windows in snow"?.46:.63,0),t.uniform4f(u.comp.uW,Qt,Zt,Et,2),t.uniform4f(u.comp.uSh,(H?1.5:1)*(it==="Gold on the peaks"?.62:1),xt[2],xt[3],Q==="Bare and polished"?.35:1),t.drawArrays(t.TRIANGLES,0,3),t.bindFramebuffer(t.FRAMEBUFFER,null),t.flush()},we=S.sound;let ye=4+o()*7;return(e,a)=>{const r=qe();r!==ve&&(ve=r,Oe()),Lt(),t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,C,C),t.useProgram(J.frame),D(0,t.TEXTURE_2D,f.nt),t.uniform1i(u.frame.uN,0),D(1,t.TEXTURE_2D,de),t.uniform1i(u.frame.uB,1),t.uniform4fv(u.frame.uC,w);const n=Math.min(1,e/240);t.uniform4f(u.frame.uF,n*.9,e*(.9+Jt*1.6),1,40+26*Jt),t.uniform4f(u.frame.uW2,Qt,Zt,et==="Ground blizzard"?1.6:et==="Running"?2:2.4,et==="Ground blizzard"?.58:et==="Running"?.64:.46),t.uniform4f(u.frame.uAmb,y[0],y[1],y[2],e*7.13%1),t.drawArrays(t.TRIANGLES,0,3),we.on&&e>ye&&(ye=e+5+o()*11,we.note(26+Math.floor(o()*7),{dur:1.8+o()*2.4,vel:.1+o()*.08,wave:"sine",cutoff:260}))}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
