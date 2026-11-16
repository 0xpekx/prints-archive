// Methane Sea: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/522.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(Be){Be&&(()=>{const Za=(v,a)=>{a.tG&&(v.deleteTexture(a.tG),v.deleteFramebuffer(a.fG)),a.tE&&(v.deleteTexture(a.tE),v.deleteFramebuffer(a.fE)),a.tM&&(v.deleteTexture(a.tM),v.deleteFramebuffer(a.fM)),a.tG=a.fG=a.tE=a.fE=a.tM=a.fM=null},Qa=v=>{const a=v.K,R=v.gl;if(a.users.delete(v),!(a.dead||R.isContextLost())&&(Za(R,v.own()),!a.users.size)){a.dead=!0,R.__c522===a&&(R.__c522=null);for(const F in a.P)R.deleteProgram(a.P[F].p);for(const F of a.sh)R.deleteShader(F);R.deleteTexture(a.tN),R.deleteTexture(a.tP),R.deleteTexture(a.tT),R.deleteVertexArray(a.vao)}},He=typeof FinalizationRegistry=="function"?new FinalizationRegistry(Qa):null,Ya=v=>({tex:(F,A,Y,l,tt,U,st,At)=>{const Z=v.createTexture();return v.bindTexture(v.TEXTURE_2D,Z),v.texImage2D(v.TEXTURE_2D,0,Y,F,A,0,l,tt,At||null),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_MIN_FILTER,U),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_MAG_FILTER,U===v.NEAREST?v.NEAREST:v.LINEAR),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_WRAP_S,st),v.texParameteri(v.TEXTURE_2D,v.TEXTURE_WRAP_T,st===v.REPEAT&&F===A?v.REPEAT:v.CLAMP_TO_EDGE),Z},fbo:F=>{const A=v.createFramebuffer();return v.bindFramebuffer(v.FRAMEBUFFER,A),v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,F,0),A}});Be.add({num:522,name:"Methane Sea",fam:"Vistas",recipe:"The shore of a methane sea on Titan, with orange haze for a sky and slow heavy swells rolling onto a beach of round ice cobbles. The weather, the beach and the sea change every mint. Tap to throw one of the cobbles, which tumbles up slowly and splashes down in a tall slow crown or skids to a stop on the stones, drag across the sea for a gust and big slow waves, or hold to bring a rain shaft drifting in over you.",interactive:"Tap to throw one of the beach's ice cobbles toward where you point: it tumbles up slowly through the thick air and comes down into a tall slow crown and jet whose drops patter back for seconds, or hops and skids to rest among the stones; drag across the sea to push a gust that builds tall slow waves; hold to call up a methane rain shaft far out on the sea that drifts slowly in over you",music:!0,gl:!0,fps:30,seed:0,make(v){const a=v.gl,R=v.size,F=!!v.home,A=1.352;let Y=1378618853;for(let t=2;t<66;t+=8)Y=Math.imul(Y^parseInt(v.hash.slice(t,t+8),16),2246822507)^Y>>>13;const l=()=>{Y=Y+1831565813|0;let t=Math.imul(Y^Y>>>15,1|Y);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},tt=t=>{let o=0;for(const s in t)o+=t[s];let n=l()*o;for(const s in t)if(n-=t[s],n<0)return s;return Object.keys(t)[0]},U=Math.PI*2,st=Math.PI/180,At=()=>l()<.5?-1:1;let Z=1511946786;for(let t=2;t<66;t+=8)Z=Math.imul(Z^parseInt(v.hash.slice(t,t+8),16),668265263)^Z>>>15;const vt=()=>{Z=Z+1831565813|0;let t=Math.imul(Z^Z>>>15,1|Z);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Ja=t=>{let o=0;for(const s in t)o+=t[s];let n=vt()*o;for(const s in t)if(n-=t[s],n<0)return s;return Object.keys(t)[0]},$a=F?"Methane drizzle":tt({"Calm haze":36,"Methane drizzle":50,Squall:14}),We=v.trait("Weather",$a),O=We==="Squall",Ft=We==="Calm haze",nt=v.trait("Light",F?"Titan day":tt({"Titan day":72,"Dim twilight":28}))==="Dim twilight",Oe=v.trait("Shore",F?"Ice-cobble beach":tt({"Ice-cobble beach":56,"Dark sand shore":34,"Ethane rime":10})),rt=Oe==="Dark sand shore",Ve=Oe==="Ethane rime",we=v.trait("Sea",F||O?"Slow swell":tt({"Calm glass":40,"Slow swell":60}))==="Calm glass",Ze=v.trait("Haze",F?"Thick orange":tt({"Thick orange":66,"Low brown murk":26,"Thin patch, Saturn":8})),Qe=Ze==="Thin patch, Saturn",ye=Ze==="Low brown murk",Ye=v.trait("Coast",F?"Far headland":tt({"Far headland":48,"Two islands":26,"Open sea":26})),Wt=v.trait("Dunes",F?"Linear dunes":tt({"Linear dunes":62,"Tall dune wall":24,"Low hummocks":14})),to=v.trait("View",F?"Out to sea":Ja({"Out to sea":60,"Along the shore":40})),eo=F?1:.6+.85*vt(),be=F?1:.5+.85*vt(),et=F?.2:(l()-.5)*.9,ao=-.17,Dt=Math.tan(31*st),at=rt?.08:.1,Ot=rt?8+l()*2:6+l()*1.6,Vt=26+l()*22,Zt=80+l()*70,Qt=F?-.12:(l()-.5)*.45,Yt=.4+l()*.8,Jt=l()*U,$t=.15+l()*.3,te=l()*U,ee=rt?15+l()*6:30+l()*10,Je=Wt==="Tall dune wall"?17+l()*6:Wt==="Low hummocks"?2.2+l():7+l()*4,$e=Wt==="Tall dune wall"?150+l()*40:Wt==="Low hummocks"?40+l()*15:85+l()*35,ae=(l()-.5)*1.2,oo=rt?.3:Ve?.85:1,_t=[],ge=(t,o,n,s,c)=>{const i=l()*Math.PI;_t.push([Math.sin(t)*o,Math.cos(t)*o,n,s,Math.cos(i),Math.sin(i),c])};if(Ye==="Far headland")ge(et+(F?.42:(.25+l()*.3)*At()),(2600+l()*900)*be,170+l()*110,900+l()*400,1.8+l()*.8);else if(Ye==="Two islands"){const t=At();ge(et+t*(.15+l()*.2),(2200+l()*600)*be,80+l()*60,380+l()*200,1.4+l()),ge(et-t*(.3+l()*.3),(3400+l()*900)*be,110+l()*80,600+l()*300,1.5+l())}const so=(ye?1/1400:Qe?1/5e3:1/3400)*(O?1.35:1)*eo,ze=nt?-(3+l()*3)*st:(F?13:12+l()*18)*st,Me=et+(F?.36:(.2+l()*.8)*At()),Te=[Math.sin(Me)*Math.cos(ze),Math.sin(ze),Math.cos(Me)*Math.cos(ze)],no=nt?.24:1,ot=O?.72:1,Ct=nt?[.07,.028,.009]:ye?[.33,.15,.05]:[.38,.155,.042],Lt=nt?[.17,.068,.02]:ye?[.42,.21,.08]:[.55,.245,.072],ke=[.9,.55,.22].map(t=>t*no),Ee=[0,1,2].map(t=>(Ct[t]*.55+Lt[t]*.45)*ot*(nt?1.7:1)),ro=Ft?.3:O?.78:.58,co=Ft?.28:O?.75:.6,io=Ft?2600:O?1300:1800,Se=(13.2+l()*3.3)*st,ta=et+(Me>et?-1:1)*(.12+l()*.25),qe=[Math.sin(ta)*Math.cos(Se),Math.sin(Se),Math.cos(ta)*Math.cos(Se)],Re=(nt?1.55:.92)*(O?1.2:1),Pt=Ft?0:O?2.2:1,oe=[],ho=[.065,.045,.03,.014],lo=[.52,.66,.8,1.3],fo=we?.2:O?1.6:1;for(let t=0;t<4;t++){const o=lo[t]*(.9+l()*.2),n=o*o/A;oe.push([o,ho[t]*fo*(.8+l()*.4),n*Math.sin((l()-.5)*(t===2?1.6:.8)),l()*U])}const vo=we?.25:O?1.1:.6,Ae=oe.reduce((t,o)=>t+o[1],0)*1.2*1.15,se=new Float32Array(15*4),ut=_t[0]||[0,0,0,1,1,0,1],pt=_t[1]||[0,0,0,1,1,0,1];se.set([Te[0],Te[1],Te[2],nt?0:.6*ot,at,Ot,Vt,Zt,Qt,Yt,Jt,$t,te,ee,Je,$e,Math.cos(ae),Math.sin(ae),oo,Ve?1:0,ut[0],ut[1],ut[2],ut[3],ut[4],ut[5],ut[6],so,Ct[0]*ot,Ct[1]*ot,Ct[2]*ot,ro,Lt[0]*ot,Lt[1]*ot,Lt[2]*ot,co,ke[0],ke[1],ke[2],nt?1:0,qe[0],qe[1],qe[2],Qe?1:0,Ee[0],Ee[1],Ee[2],0,pt[0],pt[1],pt[2],pt[3],pt[4],pt[5],pt[6],io,Ft?0:O?1.4:1,0,0,0]);const mt=`#version 300 es
precision highp float; precision highp int; precision highp sampler2D;
`,ne=`
uniform vec4 uS[15];
uniform sampler2D uN;
uniform sampler2D uP;
#define G 1.352
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return textureLod(uN,(i+f+.5)/256.,0.).r; }
vec3 shoreUV(vec2 q){
  float x=q.x, r=x/uS[1].w, sq=sqrt(1.+r*r);
  float zs=uS[1].y+uS[1].z*(sq-1.)+uS[2].x*x+uS[2].y*sin(x*.031+uS[2].z)+uS[2].w*sin(x*.083+uS[3].x)+.55*sin(x*.45+2.*sin(x*.07));
  float d=uS[1].z*r/(uS[1].w*sq)+uS[2].x+uS[2].y*.031*cos(x*.031+uS[2].z)+uS[2].w*.083*cos(x*.083+uS[3].x)+.55*cos(x*.45+2.*sin(x*.07))*(.45+.14*cos(x*.07));
  return vec3((q.y-zs)/sqrt(1.+d*d),x,d);
}
vec3 skyBase(vec3 d){
  float e=max(d.y,0.);
  vec3 c=mix(uS[8].rgb,uS[7].rgb,pow(e,.55));
  float mu=dot(d,uS[0].xyz);
  float g1=.72, g2=.94;
  float hg1=(1.-g1*g1)/pow(1.+g1*g1-2.*g1*mu,1.5), hg2=(1.-g2*g2)/pow(1.+g2*g2-2.*g2*mu,1.5);
  c+=uS[9].rgb*(.028*hg1+.0011*hg2)*(1.+.8*uS[9].w)*(.6+.4*smoothstep(-.1,.2,d.y+.15));
  return c;
}
float fogT(float t,vec3 ro,vec3 rd){
  float H=45., k=rd.y*t/H;
  float g=abs(k)<1e-3?t:H*(1.-exp(-k))/rd.y;
  return exp(-uS[6].w*(t+2.2*exp(-max(ro.y,0.)/H)*g));
}
vec3 fogCol(vec3 d){ return skyBase(normalize(vec3(d.x,.03,d.z))); }
// the big cobbles are read from the 3 m tile twice, at two rotations and scales, each buried where a patch field gives the
// ground to the other: the tile's period no longer lines up into rows across the beach
const mat2 R1=mat2(.8,.6,-.6,.8), R3=mat2(-.5,.866,-.866,-.5);
float tsel(vec2 q){ return smoothstep(.42,.58,vn(q*.45+vec2(13.,5.))*.7+vn(q*1.3+3.)*.3); }
`,uo=mt+ne+`
uniform vec4 uC[3];
out vec4 o;
vec3 sky(vec3 d){
  vec3 c=skyBase(d);
  if(uS[10].w>0.){
    vec3 sd=uS[10].xyz; float ca=dot(d,sd);
    float patchv=smoothstep(.93,.995,ca);
    c*=1.-.1*patchv;
    if(ca>.985){
      vec3 ex=normalize(cross(vec3(0.,1.,0.),sd)), ey=cross(sd,ex);
      vec2 pp=vec2(dot(d,ex),dot(d,ey))/.05;
      vec2 pr=vec2(dot(pp,vec2(.94,.34)),dot(pp,vec2(-.34,.94)));
      vec2 po=vec2(pr.x,pr.y*1.11);
      float r=length(po);
      float disc=1.-smoothstep(.9,1.06,r);
      vec3 nl=normalize(ex*pp.x+ey*pp.y-sd*sqrt(max(1.-r*r,0.)));
      float lit=clamp(dot(nl,uS[0].xyz)*.8+.35,0.,1.);
      float band=.9+.1*sin(pr.y*13.+1.)+.05*sin(pr.y*31.);
      float rw=max(.03,1.6*6.2831853/uC[2].x/.05), ring=(1.-smoothstep(.0,rw,abs(pr.y)))*min(1.,.04/rw)*smoothstep(1.2,1.3,abs(pr.x))*(1.-smoothstep(2.15,2.3,abs(pr.x)));
      float shadow=1.-.5*(1.-smoothstep(.0,.05,abs(pr.y+.06)))*disc;
      vec3 sc=vec3(.95,.82,.6)*(disc*lit*band*shadow+ring*.7*(1.-disc*step(0.,pr.y)));
      c+=sc*.11*patchv-c*.05*(disc+ring);
    }
  }
  if(d.y>.004){
    float hb=uS[13].w; vec2 q=d.xz*(hb/d.y);
    float dist=length(q);
    vec2 w=vec2(q.x*.00016,q.y*.0004)+vec2(.3*vn(q*.00011),0.);
    float n=.5*vn(w)+.25*vn(w*2.3+5.)+.14*vn(w*5.1+9.)+.08*vn(w*11.3+3.)+.04*vn(w*23.+1.);
    float cov=uS[7].w;
    float a=smoothstep(1.-cov-.12,1.-cov+.3,n)*exp(-dist/(hb*7.));
    float edge=smoothstep(.0,.25,a)*(1.-smoothstep(.35,.8,a));
    float mu=max(dot(d,uS[0].xyz),0.);
    vec3 cc=c*mix(1.,.6,uS[8].w*smoothstep(.15,1.,a))+uS[9].rgb*.14*edge*mu*mu;
    c=mix(c,cc,clamp(a*1.3,0.,1.));
  }
  // rain shafts hanging from far clouds, darker against the haze
  if(uS[8].w>.3&&d.y>-.02&&d.y<.2){
    vec2 dh=normalize(d.xz);
    vec2 dq=dh+vec2(dh.y,-dh.x)*d.y*.4; float sh=smoothstep(.35,.9,vn(dq*16.)*.7+vn(dq*41.)*.3)*smoothstep(.4,.75,vn(dh*5.+3.))*(1.-smoothstep(.0,.2,d.y))*smoothstep(-.02,.015,d.y);
    c*=1.-.13*sh*uS[8].w;
  }
  return c;
}
void main(){
  vec2 sc=gl_FragCoord.xy/uC[2].xy;
  float az=(sc.x-.5)*6.2831853, el=-.25+1.8208*sc.y*sc.y;
  o=vec4(sky(vec3(sin(az)*cos(el),sin(el),cos(az)*cos(el))),1.);
  o=vec4(sqrt(clamp(o.rgb*.5,0.,1.)),1.);
}`,ea=`
float prof(float u){
  if(u>0.) return max(-uS[1].x*u-.003*u*u,-30.);
  float b=-u; return uS[1].x*min(b,5.)+.28*smoothstep(4.,9.,b)+.012*max(b-5.,0.);
}
`,po=`
uniform vec4 uC[3];
${ea}
float dunes(vec2 q,float b){
#ifdef XD
  return 0.;
#endif
  float ramp=smoothstep(uS[3].y,uS[3].y+55.,b);
  if(ramp<=0.) return 0.;
  vec2 r=vec2(dot(q,uS[4].xy),dot(q,vec2(-uS[4].y,uS[4].x)));
  float cr=r.y/uS[3].w+.45*vn(vec2(r.x*.0045+3.1,1.7))+.18*vn(vec2(r.x*.017+1.3,5.2));
  float f=abs(fract(cr)-.5)*2.;
  float pr=mix(1.-f,1.-f*f*(3.-2.*f),.55);
  float hm=.5+.5*vn(vec2(r.x*.006+11.,2.9));
  return max(pr-.28,0.)/.72*uS[3].z*hm*ramp*(1.+max(b-uS[3].y,0.)/160.);
}
float blob(vec2 q,vec4 a,vec4 bv){
#ifdef XB
  return -40.;
#endif
  if(a.z<=0.) return -40.;
  vec2 d=q-a.xy; d=vec2(dot(d,bv.xy),dot(d,vec2(-bv.y,bv.x)))/vec2(a.w*bv.z,a.w);
  float r2=dot(d,d);
  if(r2>2.2) return -40.;
  float n=.6*vn(q*.004)+.4*vn(q*.013+5.);
  return a.z*pow(max(1.-r2*(.7+.6*n),0.),.5)*(.7+.6*vn(q*.0065+2.))-22.;
}
// how close a march stretch q0..q1 passes to a headland (its normalized r^2), so steps over its steep sides can be checked
float bnear(vec2 q0,vec2 q1,vec4 a,vec4 bv){
  if(a.z<=0.) return 1e9;
  vec2 s=vec2(a.w*bv.z,a.w), d0=q0-a.xy, dq=q1-q0;
  vec2 D0=vec2(dot(d0,bv.xy),dot(d0,vec2(-bv.y,bv.x)))/s, dD=vec2(dot(dq,bv.xy),dot(dq,vec2(-bv.y,bv.x)))/s;
  vec2 c=D0+dD*clamp(-dot(D0,dD)/max(dot(dD,dD),1e-9),0.,1.);
  return dot(c,c);
}
float Hlow(vec2 q,out float b){
  vec3 s=shoreUV(q); b=-s.x;
  float h=prof(s.x);
  h+=(vn(q*.09)-.5)*.35*smoothstep(7.,16.,b)+(vn(q*.021+7.)-.5)*1.4*smoothstep(8.,40.,b);
  h+=dunes(q,b);
  for(int j=0;j<2+int(uC[2].w);j++) h=max(h,blob(q,j==0?uS[5]:uS[12],j==0?uS[6]:uS[13]));   // uC[2].w is 0: one inlined blob
  return h;
}
`,mo=mt+"void main(){ vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2)); gl_Position=vec4(p*2.-1.,0.,1.); }",aa=`
const mat2 R2=mat2(.28,-.96,.96,.28);
// how much of the beach the stones hold (x), and the storm ridge at the top of the wash where the big ones lie touching (y):
// the wash sorts them into strand lines along the shore, the wet sand by the liquid nearly bare
vec2 pebW(vec2 q,float b){
  float w=smoothstep(-4.5,2.,b)*(1.-.85*smoothstep(8.,24.,b)), wob=.5*vn(q*.11+7.)-.25;
  float sl=max(exp(-pow((b-1.7-wob)/.45,2.)),exp(-pow((b-3.1-1.4*wob)/.55,2.)));
  float bd=smoothstep(.6,.2,abs(b-4.75-2.*wob-.4*sin(q.x*.045+1.3)))*smoothstep(.5,.9,uS[4].z);
  w*=smoothstep(.36,.8,vn(q*.23+3.)*.55+vn(q*.9)*.3+vn(q*.06+9.)*.35+(uS[4].z-.6)*.8+.32*sl-.12);
  return vec2(max(w,bd),bd);
}
vec2 nrm(vec2 e){ return e*2.-1.; }
`,xo=mt+ne+po+aa+`
// height above Hlow, slope x, slope z, tone (0 sand)
// the march needs only the stones' height: three reads of the tile (the sand's ripples are a few mm, left to the normal)
float detH(vec2 q,float b,float lod){
#ifdef XT
  return 0.;
#endif
  vec2 pw=pebW(q,b); float w=pw.x, ts=tsel(q), ms=ts*(1.-pw.y), m3=(1.-ts)*(1.-pw.y);
  float e1=textureLod(uP,R1*q*.33333,lod).r*.1-.1*ms, e3=textureLod(uP,R3*q*.31+vec2(.21,.67),lod).r*.1-.1*m3;
  float b1=mix(.1,-.006,w), b2=mix(.0135,.006,smoothstep(.2,.8,w+.4*vn(q*.7)-.2));
  return max(max(max(e1,0.)-b1,max(e3,0.)-b1),max(textureLod(uP,R2*q*.83333+.37,lod+1.32).r*.04-b2,0.));
}
uniform vec2 uO;   // the tile's corner (the march runs in tiles through one shared scratch)
out vec4 o;
void main(){
  float mode=uC[0].w;
  vec2 sc=(gl_FragCoord.xy+uO)/uC[2].xy;
  vec3 rd;
  if(mode<.5){
    float cp=cos(uC[0].y);
    vec3 fw=vec3(sin(uC[0].x)*cp,sin(uC[0].y),cos(uC[0].x)*cp), rt=vec3(cos(uC[0].x),0.,-sin(uC[0].x)), up=cross(fw,rt);
    rd=normalize(fw+((sc.x*2.-1.)*rt+(sc.y*2.-1.)*up)*uC[0].z);
  } else {
    float az=(sc.x-.5)*6.2831853, el=-.25+1.8208*sc.y*sc.y;
    rd=vec3(sin(az)*cos(el),sin(el),cos(az)*cos(el));
  }
  vec3 ro=uC[1].xyz;
  float pa=uC[2].z;
  float t=.05, tp=t, b=0., ta=0., tb=0., lod=0.;
  vec4 det=vec4(0.);
  bool hit=false, deep=false;
  int st=0, bc=0;                     // 0 coarse march, 1 its bisection, 2 fine march through the cobbles, 3 its bisection
  // -1: a long coarse step that passed a headland is re-walked in short steps first: the step bound assumes gentle
  // slopes, and the headlands' near-vertical sides let a big step jump clean over their tops (bands of sky through them)
  int N=int(uC[1].w), nI=0;
  float tv=0., tq=0., hv=0.;
  bool rv=false;
  float envH=mode<.5?.11:0.;
  // 4: after the hit, the same loop takes the five height samples for the normal (one inlined Hlow, not two)
  vec3 ph=vec3(0.); float e=0., hl=0., hx=0., hz=0., b0=0.; int kn=0;
  for(int i=0;i<6*N+6;i++){
    if(st<4&&(i>=6*N||(st>=0&&!rv&&nI>=N))){ if(!hit||deep) break; st=4; kn=0; ph=ro+rd*t; e=max(.03,.003*t); }
    else if(st>=0&&st<4&&!rv) nI++;
    float tm=(st==1||st==3)?.5*(ta+tb):t;
    vec3 p=ro+rd*tm;
    vec2 off=kn==1?vec2(e,0.):kn==2?vec2(-e,0.):kn==3?vec2(0.,e):kn==4?vec2(0.,-e):vec2(0.);
    float h=Hlow(st==4?ph.xz+off:p.xz,b);
    float d=p.y-h-((st==2||st==3)?detH(p.xz,b,lod):tm<60.?envH:0.);
    if(st==4){
      if(kn==0){ hl=h; b0=b; } else if(kn<3) hx+=(kn==1?h:-h)/(2.*e); else hz+=(kn==3?h:-h)/(2.*e);
      kn++; if(kn==5) break;
    } else if(st==0){
      float vl=max(5.,.01*t), y0=ro.y+rd.y*tp, ym=min(y0,p.y);
      if(d<0.){ hit=true; ta=tp; tb=t; st=1; bc=0; }
      else if(!rv&&t-tp>vl&&((ym<uS[5].z*1.3-22.&&bnear(ro.xz+rd.xz*tp,p.xz,uS[5],uS[6])<2.2)||(ym<uS[12].z*1.3-22.&&bnear(ro.xz+rd.xz*tp,p.xz,uS[12],uS[13])<2.2))){
        hv=(t-tp)/ceil((t-tp)/vl); tv=t; tq=tp; t=tp+hv; st=-1;
      }
      else if(p.y<-1.2&&rd.y<0.){ hit=true; deep=true; break; }
      else if((rd.y>0.&&p.y>700.)||t>2.5e4) break;
      else { rv=false; tp=t; t+=clamp(d/(.4+max(-rd.y,0.)),.003*t+.004,400.); }
    } else if(st==-1){
      if(d<0.){ hit=true; ta=tq; tb=t; st=1; bc=0; }
      else { tq=t; t+=hv; if(t>tv-.5*hv){ t=tv; st=0; rv=true; } }
    } else if(st==1){
      if(d<0.) tb=tm; else ta=tm;
      bc++;
      if(bc==6){ t=tb; if(t<60.&&mode<.5){ st=2; lod=max(log2(max(t*pa,1e-5)/(3./640.)),0.); t=max(ta-.02,.05); tp=t; } else { st=4; kn=0; ph=ro+rd*t; e=max(.03,.003*t); } }
    } else if(st==2){
      if(d<0.){ ta=tp; tb=t; st=3; bc=0; } else { tp=t; t+=max(d*.75,.0012+.0007*t); }
    } else {
      if(d<0.) tb=tm; else ta=tm;
      bc++;
      if(bc==5){ t=tb; st=4; kn=0; ph=ro+rd*t; e=max(.03,.003*t); }
    }
  }
  // t (3e4: no hit), the terrain's slope and height at the hit (hl -1e4: under the sea); RGBA8: log t in two bytes, slopes
  // squashed into the other two (both 0: under the sea)
  if(!hit) t=3e4;
  if(uS[11].w>.5){
    float l=hit?min(floor(clamp(log2(1.+t)/15.,0.,1.)*65534.+.5),65534.):65535.;
    o=vec4(floor(l/256.)/255.,mod(l,256.)/255.,deep?vec2(0.):.5+.5*vec2(hx,hz)/(1.+abs(vec2(hx,hz))));
  } else o=vec4(t,hx,hz,deep?-1e4:hl);
}`,wo=mt+ne+`
uniform vec4 uC[3];
uniform sampler2D uA;
uniform vec2 uO;
`+ea+aa+`
vec4 detail(vec2 q,float b,float lod,float w,float ms,float m3){
  vec4 t1=textureLod(uP,R1*q*.33333,lod), t2=textureLod(uP,R2*q*.83333+.37,lod+1.32), t3=textureLod(uP,R3*q*.31+vec2(.21,.67),lod);
  float b1=mix(.1,-.006,w), b2=mix(.0135,.006,smoothstep(.2,.8,w+.4*vn(q*.7)-.2));
  // burying a read sinks its stones into the sand, never the sand itself: the floor stays, cut tops flatten into it
  float e1=t1.r*.1-.1*ms, e3=t3.r*.1-.1*m3, k1=1.-ms*(1.-smoothstep(0.,.004,e1)), k3=1.-m3*(1.-smoothstep(0.,.004,e3));
  float h1=max(e1,0.)-b1, h2=t2.r*.04-b2, h3=max(e3,0.)-b1;
  vec2 rd=vec2(uS[4].y,-uS[4].x);
  // wind ripples: asymmetric (gentle stoss, steep lee), bending, forking and fading in patches
  float ph=dot(q,rd)*42.+4.*vn(q*1.3)+1.6*vn(q*4.1);
  float ra=.0058*clamp(1.-lod*.3,0.,1.)*(1.-.75*w)*smoothstep(.2,.6,vn(q*.35+5.)+.25*vn(q*2.2))*smoothstep(-.5,1.5,b);
  float s1=sin(ph), c1=cos(ph);
  vec2 sr=ra*42.*(c1+1.4*s1*c1)*rd; vec4 r=vec4(ra*(s1-.35*(c1*c1-s1*s1)),-sr/sqrt(1.+dot(sr,sr)),0.);
  if(h2>r.x) r=vec4(h2,nrm(t2.gb)*R2,t2.a);
  if(h1>r.x) r=vec4(h1,nrm(t1.gb)*R1*k1,t1.a*k1);
  if(h3>r.x) r=vec4(h3,nrm(t3.gb)*R3*k3,t3.a*k3);
  return r;
}
out vec4 o;
void main(){
  float mode=uC[0].w;
  vec2 sc=gl_FragCoord.xy/uC[2].xy;
  vec3 rd;
  if(mode<.5){
    float cp=cos(uC[0].y);
    vec3 fw=vec3(sin(uC[0].x)*cp,sin(uC[0].y),cos(uC[0].x)*cp), rt=vec3(cos(uC[0].x),0.,-sin(uC[0].x)), up=cross(fw,rt);
    rd=normalize(fw+((sc.x*2.-1.)*rt+(sc.y*2.-1.)*up)*uC[0].z);
  } else {
    float az=(sc.x-.5)*6.2831853, el=-.25+1.8208*sc.y*sc.y;
    rd=vec3(sin(az)*cos(el),sin(el),cos(az)*cos(el));
  }
  vec3 ro=uC[1].xyz;
  float pa=uC[2].z;
  vec4 A=texelFetch(uA,ivec2(gl_FragCoord.xy-uO),0);
  float t=A.x, hx=A.y, hz=A.z, hl=A.w;
  if(uS[11].w>.5){
    float l=floor(A.x*255.+.5)*256.+floor(A.y*255.+.5);
    vec2 g=(A.zw*2.-1.)/max(1.-abs(A.zw*2.-1.),.004);
    t=l>65534.5?3e4:exp2(l/65534.*15.)-1.; hx=g.x; hz=g.y; hl=A.z+A.w<.002?-1e4:0.;
  }
  bool hit=t<2.9e4, deep=hl<-9e3;
  if(!hit){
    if(mode>.5) discard;
    o=vec4(0.,0.,0.,3e4);
    if(uS[11].w>.5) o=vec4(0.,0.,0.,1.);
    return;
  }
  vec3 p=ro+rd*t;
  float b=-shoreUV(p.xz).x, lod=max(log2(max(t*pa,1e-5)/(3./640.)),0.);
  if(uS[11].w>.5) hl=deep?-1e4:prof(-b);
  vec4 det=vec4(0.);
  vec3 col=vec3(.004,.0025,.0012);
  float sg=1.;
  if(!deep){
    // normal: large-scale terrain (sampled at the end of the march) + cobble / ripple normals
    vec2 pw=vec2(0.); float ms=0., m3=0.;
    if(mode<.5&&t<60.){ pw=pebW(p.xz,b); float ts=tsel(p.xz); ms=ts*(1.-pw.y); m3=(1.-ts)*(1.-pw.y); det=detail(p.xz,b,lod,pw.x,ms,m3); }
    float fade=clamp(1.-lod*.2,0.,1.), gf=clamp(1.-lod*.45,0.,1.);
    vec2 pq=p.xz+p.y*vec2(.83,-.61);   // skewed by height, so stone texture doesn't streak down the steep sides
    vec2 dn=det.yz*fade+(vec2(vn(pq*45.+1.),vn(pq*45.+7.))-.5)*.12*gf*smoothstep(.15,.3,det.w); float dny=sqrt(max(1.-dot(dn,dn),.0004)); vec3 n=normalize(vec3(dn.x-hx*dny,dny,dn.y-hz*dny));
    // albedo: dark organic sand, dune sand, offshore rock; cobbles of ice stained brown
    float tone=det.w, peb=smoothstep(.15,.3,tone);
    float n1=vn(p.xz*.8), n2=vn(p.xz*.05+4.), n3=vn(pq*7.3);
    vec3 sand=vec3(.07,.05,.036)*(.7+.6*n1)*(.8+.4*n2);
    float dz=smoothstep(uS[3].y,uS[3].y+30.,b);
    sand=mix(sand,vec3(.062,.046,.036)*(.8+.4*n1)*(1.+.35*smoothstep(.3,.9,n.y)*smoothstep(.0,.6,hl-prof(-b)-2.)),dz);
    if(b<0.&&hl>-.5) sand=vec3(.05,.04,.033)*(.7+.6*n2);
    float stn=vn(pq*13.+tone*40.);
    sand*=1.+gf*(.5*vn(p.xz*190.)-.25+.3*vn(p.xz*53.)-.15+clamp(det.x*60.,-.3,.3)*(1.-peb));
    sand*=1.-.42*uS[14].x*gf*smoothstep(.74,.86,vn(p.xz*31.+50.)*.8+vn(p.xz*83.)*.2);
    vec3 ice=vec3(.5,.48,.45)*mix(vec3(1.),vec3(.9,.64,.42),smoothstep(.15,.8,stn))*(.8+.35*n3);
    ice*=1.-gf*(.28*smoothstep(.55,.9,vn(pq*34.+tone*9.))+.18*smoothstep(.5,.8,vn(pq*21.+3.)));
    // dark tholin-coated stones (low tone) through brown-stained ice to clean grey-white ice
    vec3 thol=vec3(.1,.064,.042)*(.8+.4*n3)*(.85+.3*stn);
    vec3 alb=mix(sand,mix(thol,ice,smoothstep(.3,.9,tone)),peb);
    // ethane rime on the upper faces, landward of the wash
    float rm=uS[4].w*smoothstep(.45,.85,n.y)*smoothstep(2.5,7.,b)*smoothstep(.35,.6,vn(p.xz*.6)+.25*n3);
    alb=mix(alb,vec3(.62,.58,.52)*(.9+.2*n3),rm*.85);
    // occlusion from the blurred tile, and a soft sun shadow of the cobbles
    float ao=1., sh=1.;
    if(t<60.){
      float b1=mix(.1,-.006,pw.x);
      ao=clamp(1.+(det.x-max(max(textureLod(uP,R1*p.xz*.33333,lod+3.).r*.1-.1*ms,textureLod(uP,R3*p.xz*.31+vec2(.21,.67),lod+3.).r*.1-.1*m3)-b1,0.))*19.,.22,1.);
      // the seam where each stone sits in the sand: a narrow blur of the same height, darkest between stones that touch
      float sm=max(max(textureLod(uP,R1*p.xz*.33333,lod+1.3).r*.1-.1*ms,textureLod(uP,R3*p.xz*.31+vec2(.21,.67),lod+1.3).r*.1-.1*m3)-b1,0.);
      ao=clamp(ao*mix(1.,clamp(1.+(det.x-sm)*55.,.25,1.),.85*gf),.18,1.);
    }
    // the haze lights the ground almost evenly: a broad sky term, a weak soft sun
    vec3 Ls=uS[11].rgb*(.5+.5*n.y)*ao*1.1 + uS[9].rgb*uS[0].w*.6*max(dot(n,uS[0].xyz)*.6+.4,0.)*mix(1.,sh,.7)*mix(1.,ao,.6);
    col=alb*Ls;
    // icy sheen on the cobbles: the bright haze in a broad glossy lobe
    vec3 rr=reflect(rd,n);
    float mu=max(dot(rr,uS[0].xyz),0.);
    col+=(mix(uS[8].rgb,uS[7].rgb,clamp(rr.y,0.,1.))+uS[9].rgb*.3*mu*mu)*.045*peb*ao*ao*(1.+2.*rm);
    sg=(peb>.5&&t<60.&&mode<.5)?-1.:1.;
  }
  // the env map under the horizon over the sea: only its mips are ever read (blurred reflections near the horizon), so it
  // holds the mirrored sky, not the dark sea floor that would bleed a dark band into the far sea
  if(deep&&mode>.5) col=skyBase(normalize(vec3(rd.x,-rd.y,rd.z)));
  if(mode>.5){ float T=fogT(t,ro,rd); col=col*T+fogCol(rd)*(1.-T); }
  o=vec4(col,sg*t);
  if(uS[11].w>.5||mode>.5) o=vec4(sqrt(clamp(col*.5,0.,1.)),.5+.5*sg*clamp(log2(1.+t)/15.,0.,1.));
}`,yo=mt+ne+`
uniform vec4 uF[8];
uniform sampler2D uG;
uniform sampler2D uE;
uniform sampler2D uT;
out vec4 o;
float at2(float y,float x){ float ax=abs(x),ay=abs(y); float a=atan(min(ax,ay)/max(max(ax,ay),1e-9)); if(ay>ax)a=1.5707963-a; if(x<0.)a=3.1415927-a; return y<0.?-a:a; }
vec3 envL(vec3 d,float lod){
#ifdef XE
  return vec3(0.);
#endif
  float el=asin(clamp(d.y,-1.,1.));
  vec3 c=textureLod(uE,vec2(at2(d.x,d.z)/6.2831853+.5,sqrt(clamp((el+.25)/1.8208,0.,1.))),max(lod+uF[2].y,0.)).rgb;
  return c*c*2.;
}
vec4 gfetch(vec2 uv){
  vec4 g=textureLod(uG,uv,0.);
  if(uS[11].w>.5){ float s=g.a<.5?-1.:1.; g=vec4(g.rgb*g.rgb*2.,s*(exp2(abs(g.a-.5)*30.)-1.)); }
  return g;
}
float curtain(vec3 p,float T){
#ifdef XC
  return 0.;
#endif
  vec4 C=texelFetch(uT,ivec2(1,3),0);
  if(C.w<=.001) return 0.;
  vec2 d=p.xz-C.xy; vec2 ax=vec2(cos(C.z),sin(C.z));
  float al=dot(d,ax), ac=dot(d,vec2(-ax.y,ax.x));
  float k=exp(-ac*ac/1600.)*(1.-smoothstep(70.,170.,abs(al)))*(1.-smoothstep(900.,1300.,p.y));
  return C.w*k*(.35+1.3*vn(vec2(al*.5+ac*.05,p.y*.03+T*1.6))*vn(vec2(al*.07,p.y*.004+T*.3)));
}
vec2 rainRings(vec2 q,float T,float rate,float fp){
#ifdef XR
  return vec2(0.);
#endif
  // drizzle: each drop leaves a soft ring that grows, widens and fades, a weaker inner ring trailing it;
  // sizes and ages vary per drop, and rims never get thinner than the pixel footprint (they blur out, not alias)
  vec2 g=vec2(0.);
  vec2 c0=floor(q/.5-.5);
  for(int j=0;j<4;j++){
    vec2 cc=c0+vec2(float(j&1),float(j>>1));
    vec4 h=textureLod(uN,(cc+.5)/256.,0.);
    float per=1.1+h.w*1.4, tau=mod(T+h.x*per,per), pi=floor((T+h.x*per)/per);
    vec4 h2=textureLod(uN,(cc+vec2(37.,17.)*pi+.5)/256.,0.);
    float on=step(h2.g,rate);
    float sz=.35+1.1*h2.r*h2.r;
    vec2 ctr=(cc+.2+.6*h.yz)*.5;
    vec2 dv=q-ctr; float r=length(dv)+1e-4;
    float R=sz*(.02+.16*tau), w0=sz*(.012+.05*tau), wd=max(w0,fp*1.6), A=.0055*sz*exp(-2.*tau)*smoothstep(0.,.06,tau)*w0/wd;
    float x=(r-R)/wd, x2=(r-R*.55)/(wd*.8);
    g+=on*dv/r*A*(-2.*x*exp(-x*x)/wd-.8*x2*exp(-x2*x2)/wd);
  }
  return g;
}
float lobe(float v,float k){
  float vv=v/1.15+1.3*vn(vec2(v*.23,k*1.7))+k*.37, sx=fract(vv)*2.-1.;
  return .5*(.4+.9*vn(vec2(floor(vv)*.71+.5,k*1.3)))*(mix(sqrt(max(1.-sx*sx,0.)),.5+.5*cos(3.1415927*sx),.6)-.6)+.45*(vn(vec2(v*.31+k*5.3,k*.7))-.5);
}
void main(){
  vec2 sc=gl_FragCoord.xy/uF[1].w;
  float T=uF[0].w;
  float cp=cos(uF[0].y);
  vec3 fw=vec3(sin(uF[0].x)*cp,sin(uF[0].y),cos(uF[0].x)*cp), rt=vec3(cos(uF[0].x),0.,-sin(uF[0].x)), up=cross(fw,rt);
  vec3 rd=normalize(fw+((sc.x*2.-1.)*rt+(sc.y*2.-1.)*up)*uF[0].z);
  vec3 ro=uF[1].xyz;
  vec4 g=gfetch(sc);
  float tg=abs(g.a); bool peb=g.a<0.;
  bool isSky=tg>2e4;
  vec3 col=isSky?vec3(0.):g.rgb;
  vec3 eD=rd; float eW=isSky?1.:0., eL=0.;
  float tt=isSky?1e9:tg;
  vec3 pg=ro+rd*tg;
  bool seaZ=rd.y<-1e-4;
  float t=seaZ?ro.y/(-rd.y):1e9;
  vec3 w=vec3(0.), s=vec3(0.);
  // the sea surface: 3 fixed-point steps; its height and slope along (u, v) from five trains in the table, the fifth built by
  // gusts. Steps and trains run in one loop (uF[5].w is always 0: it stays rolled, one inlined train, not fifteen)
  if(seaZ){
    float u=0., v=0.; vec3 r=vec3(0.); vec4 ge=texelFetch(uT,ivec2(0,3),0);
    for(int k=0;k<15+int(uF[5].w);k++){
      int i=k-k/5*5;
      if(i==0){
        vec3 q=ro+rd*t;
        s=shoreUV(q.xz); u=s.x; v=s.y; r=vec3(0.);
        float wa=v*.45+2.*sin(v*.07), wd=s.z-.55*cos(wa)*(.45+.14*cos(v*.07));
        u=mix(u,(u*sqrt(1.+s.z*s.z)+.55*sin(wa))/sqrt(1.+wd*wd),smoothstep(3.,25.,u));
      }
      vec4 W=texelFetch(uT,ivec2(i,2),0);
      if(W.y>0.){
        float wf=W.x, kd=wf*wf/G, us=1./(uS[1].x*kd), uu=max(u,0.);
        float ph, dph;
        if(uu<us){ ph=2.*wf*sqrt(uu/(G*uS[1].x)); dph=wf/sqrt(G*uS[1].x*max(uu,.9)); } else { ph=2./uS[1].x+kd*(uu-us); dph=kd; }
        if(u<0.) dph=0.;
        float a=W.y*clamp(sqrt(sqrt(us/(uu+1.))),1.,1.2)*(u<2.?.8+.2*sin(v*.21+W.w):1.);
        if(i==4) a*=smoothstep(0.,12.,ge.x*(T-ge.y)-(ge.z-u))*(1.-smoothstep(ge.w,ge.w+40.,u));
        float qq=.1+.15*(1.-smoothstep(0.,us,uu));
        float P=ph+W.z*v+wf*T+W.w;
        float s1=sin(P), c1=cos(P), s2=2.*s1*c1, c2=c1*c1-s1*s1;
        float de=-a*(s1+2.*qq*s2);
        r+=vec3(a*(c1+qq*c2),de*dph,de*W.z);
      }
      if(i==4){
        float tp=smoothstep(0.,2.5,u+.8*(vn(vec2(v*.37,3.))-.5));
        w=mix(vec3(-.06+min(u,0.)*.2,0.,0.),r,tp);
        if(t<60.) t=mix(t,(ro.y-w.x*smoothstep(.025,.14,-rd.y))/(-rd.y),.7);   // grazing rays: no parallax, so steep swell can't alias
      }
    }
  }
  // the swash on the beach: a thin sheet behind a lobed edge with a bright meniscus, wet marks of earlier
  // reaches drying lighter, rain-darkened sand
  vec3 sg=shoreUV(pg.xz); float bg=-sg.x, vg=sg.y, shTh=0.;
  if(!isSky&&tg<80.&&bg>-6.&&bg<max(max(uF[4].x,uF[5].x),max(uF[6].x,uF[7].x))+1.){
    float lk=clamp((uF[4].x-uF[4].z)*.5,.45,1.);
    // the edge frays between stones and in small fingers, so it is never one clean scalloped curve
    // the three wet marks and the live edge share one lobe() (one call site)
    float wet=uF[4].w, lb=0.;
    for(int j=0;j<4+int(uF[5].w);j++){
      vec4 M=j==0?uF[5]:j==1?uF[6]:j==2?uF[7]:vec4(0.,0.,uF[4].y,0.);
      float l=lobe(vg,M.z);
      if(j<3) wet=max(wet,smoothstep(M.x+l+.12,M.x+l-.9,bg)*exp(-M.y*.04)*.85); else lb=l;
    }
    float xe=uF[4].x+(lb+.2*vn(vec2(vg*2.9,uF[4].y*3.1))+.1*vn(pg.xz*6.3)-.15)*lk, d=xe-bg;
    float sOn=0.;
    wet=max(wet,max(smoothstep(1.,-1.,bg),.42*smoothstep(3.5,-.5,bg)*(.65+.35*vn(pg.xz*1.7))));   // damp sand drying up the beach
    wet=max(wet,.8*smoothstep(-.2,.45,d+.12*(vn(pg.xz*5.3)-.5)));   // the sand darkens over half a metre behind the edge, no step
    vec3 n=vec3(0.,1.,0.);
    if(peb){ float ms=tsel(pg.xz); vec4 ta=textureLod(uP,R1*pg.xz*.33333,0.), tb=textureLod(uP,R3*pg.xz*.31+vec2(.21,.67),0.);
      vec2 e=ta.r*.1-.1*ms>tb.r*.1-.1*(1.-ms)?(ta.gb*2.-1.)*R1:(tb.gb*2.-1.)*R3; n=vec3(e.x,sqrt(max(1.-dot(e,e),.0004)),e.y); }
    else n=normalize(vec3((textureLod(uN,pg.xz*1.7,0.).gb-.5)*.25,1.).xzy);
    float fp=tg*2.*uF[0].z/uF[1].w/max(-rd.y,.03);
    if(d>0.){
      shTh=.002+.01*smoothstep(0.,2.5,d)+.04*smoothstep(0.,4.,-bg);
      float on=peb?smoothstep(.012,.03,shTh):1.;
      // the film thins and breaks up toward its edge; backwash runs off in faint downslope streaks
      float cv=smoothstep(0.,.12+.18*vn(pg.xz*2.3),d-.05*vn(pg.xz*11.));
      cv*=.8+.2*sin(vg*5.3+5.*vn(vec2(vg*.6,bg*.3+T*.03)));
      on*=cv; sOn=on;
      if(on>0.){
        // the sheet: nearly flat, slow shallow ripples, rounded down to the edge
        vec2 rp=(textureLod(uN,pg.xz*.6+T*vec2(.004,.011),0.).gb-.5)*.05+(textureLod(uN,pg.xz*2.3-T*vec2(.013,.006),0.).gb-.5)*.025;
        vec3 sn=normalize(vec3(rp.x,1.,rp.y)+vec3(0.,0.,0.));
        float cs=clamp(dot(-rd,sn),0.,1.), F=.02+.98*pow(1.-cs,5.);
        col*=mix(vec3(1.),exp(-vec3(1.6,2.7,4.4)*shTh*6.)*(1.-F),on);
        eD=reflect(rd,sn); eD.y=max(eD.y,.01); eW=F*on;
        // the meniscus: a thin bright lip at the leading edge
        // the meniscus: a faint lip that breaks up along the edge, and a sparse lace of foam just behind it
        float wd=max(.03,fp*1.2), zq=(d-.03)/wd, ln=exp(-zq*zq)*min(1.,.035/wd);   // pow of a negative base is undefined in GLSL
        ln*=smoothstep(.35,.8,.6*vn(vec2(vg*3.7+T*.04,uF[4].y*2.))+.5*vn(pg.xz*13.));
        float lace=exp(-d/.35)*smoothstep(.6,.85,vn(vec2(d*9.,vg*3.)+uF[4].y*7.)+.25*vn(pg.xz*21.)-.12);
        col+=mix(uS[8].rgb,uS[7].rgb,.35)*(ln*.4+lace*.06*smoothstep(.0,.05,d))*on;
      }
    }
    if(wet>0.&&sOn<1.){
      // wet sand and stone are rough mirrors: they take the haze's broad gradient, not a sharp image of the sky;
      // weighted against the film so its edge fades into the damp band instead of switching on
      float wk=(1.-sOn)*(.82+.18*vn(pg.xz*3.3));
      // just landward of the live edge the sand still holds a glassy film from the last reach: it drains in streaks
      float fm=(d<0.?exp(d/.22)*(.75+.25*sin(vg*4.1+4.*vn(vec2(vg*.5,bg*.4)))):1.)*(peb?.5:1.);   // the film's gloss runs right to the edge
      col*=1.-(.38+.2*uF[4].w)*wet*wk*(peb?.5:1.);
      vec3 nf=normalize(mix(n,vec3(0.,1.,0.),fm*.8));
      float cs=clamp(dot(-rd,nf),0.,1.), F=.02+.98*pow(1.-cs,5.);
      vec3 rf=reflect(rd,nf);
      col+=mix(uS[8].rgb,uS[7].rgb,clamp(rf.y*1.5,0.,1.))*F*wk*(wet*(peb?.12:.1)*(1.+1.5*uF[4].w)+fm*.5);
    }
  }
  // the sea
  if(seaZ){
    if(t<tg){
      vec3 c0=col, d0=eD; float w0=eW;   // the swash as drawn: the sea's own edge fades into it, not cut across it
      vec3 p=ro+rd*t;
      vec3 gu=vec3(-s.z,0.,1.)/sqrt(1.+s.z*s.z);
      float fd=1./(1.+t*.004);
      vec2 gr=(w.y*gu.xz+vec2(w.z,0.))*fd*(.18+.22*exp(-t/25.));   // swells: long and low, a slow sway in the mirror, never ridges
      // wind ripples, the gust's cat's paw, rain rings, splash rings
      vec4 gp=texelFetch(uT,ivec2(2,3),0);
      float gst=gp.w*exp(-dot(p.xz-gp.xy,p.xz-gp.xy)/(gp.z*gp.z));
      // Titan's sea is glassy: capillary ripples only in drifting cat's-paw patches that break the mirror
      float cpw=smoothstep(.52,.8,.65*vn(p.xz*.021+T*vec2(.007,.003))+.35*vn(p.xz*.083-T*vec2(.004,.009)));
      float ch=uF[3].x*(.06+.94*cpw)+gst*2.5;
      float rf=exp(-t/28.);
      float lr=log2(t*uF[0].z*2./uF[1].w*.05*256./sqrt(max(-rd.y,.01))), lf=max(lr,0.);
      gr+=(textureLod(uN,p.xz*.19+T*vec2(.011,.004),max(lr+1.93,0.)).gb-.5)*.035*ch*rf+(textureLod(uN,p.xz*.73-T*vec2(.006,.017),max(lr+3.87,0.)).gb-.5)*.06*ch*rf*rf;
      gr+=((textureLod(uN,p.xz*.45+T*vec2(.05,.03),max(lf+3.17,0.)).gb-.5)*.4+(textureLod(uN,p.xz*1.3-T*vec2(.04,.07),max(lf+4.7,0.)).gb-.5)*.3)*gst;
      gr+=(textureLod(uN,p.xz*.05+T*vec2(.002,.001),lf).gb-.5)*.006*ch*exp(-t/500.);
      // a faint capillary ruffle everywhere, so the open sea reads as liquid between the cat's paws; mips average it out far off
      gr+=((textureLod(uN,p.xz*.33+T*vec2(.012,-.008),max(lr+2.72,0.)).gb-.5)*.05+(textureLod(uN,R1*p.xz*.9+T*vec2(.021,-.013),max(lr+4.17,0.)).gb-.5)*.035+(textureLod(uN,R3*p.xz*2.3-T*vec2(.017,.026),max(lr+5.52,0.)).gb-.5)*.02)*exp(-t/90.);
      vec4 Cb=texelFetch(uT,ivec2(1,3),0);
      if(t<35.||(Cb.w>.05&&t<70.)){
        vec2 cd=p.xz-Cb.xy;
        float ac=dot(cd,vec2(-sin(Cb.z),cos(Cb.z)));
        float rate=uF[2].w+Cb.w*exp(-ac*ac/1600.)*1.4;
        if(rate>.001) gr+=rainRings(p.xz,T,rate*.3,t*uF[0].z*2./uF[1].w/sqrt(max(-rd.y,.02)))*max(exp(-t/16.)*(1.-smoothstep(18.,40.,t)),Cb.w*(1.-t/70.));
      }
      int nS=int(uF[3].z);
#ifdef XP
      nS=0;
#endif
      for(int i=0;i<nS;i++){
        vec4 S=texelFetch(uT,ivec2(i,0),0), K=texelFetch(uT,ivec2(i,4),0);
        float tau=T-S.w;
        if(K.x==1.&&tau>=0.){
        vec2 dv=p.xz-S.xz; float r=length(dv)+1e-3;
        vec2 k=vec2(5.2,11.), om=sqrt(G*k), cg=.5*om/k, x=(r-cg*tau-.08)/(.18+.35*cg*tau);
        vec2 am=K.y*.035*exp(-x*x)*exp(-tau*.09)/sqrt(r+.4)*vec2(1.,.6)*k*sin(k*r-om*tau);
        gr-=dv/r*(am.x+am.y);
        }
      }
      vec3 n=normalize(vec3(-gr.x,1.,-gr.y));
      float yb=ro.y+rd.y*tg, dep=max(w.x-yb,shTh);
      float cs=clamp(dot(-rd,n),0.,1.), F=(.02+.98*pow(1.-cs,4.))*smoothstep(0.,.025,dep);
      vec3 r=reflect(rd,n); r.y=max(r.y,.004); r=normalize(r);
      float dz=max(tg-t,0.);
      vec4 g2=gfetch(sc+n.xz*.03*min(dz,.5));
      vec3 bot=abs(g2.a)>t?g2.rgb:g.rgb;
      vec3 tr=bot*mix(1.,.5,smoothstep(0.,.03,dep))*exp(-vec3(1.9,3.,4.6)*(dz+dep));   // clear, faintly brown liquid over a darker bed
      col=tr*(1.-F)+uS[11].rgb*vec3(.012,.008,.004)*(1.-exp(-dz*1.5));
      F*=1.-.45*min(gst,1.);
      F*=.82+.36*vn(p.xz*.035+T*vec2(.003,-.002))*(.6+.4*vn(p.xz*.11-T*vec2(.004,.002)));   // the sheen drifts: brighter and duller streaks across the mid sea
      float fe=smoothstep(0.,.06,w.x-yb-.02*vn(p.xz*4.7));
      col=mix(c0,col,fe); eW=mix(w0,F,fe); eD=w0>0.?normalize(mix(d0,r,fe)):r;
      tt=t; eL=fe*clamp(log2(1.+t/10.)*1.25,0.,4.6);
    }
  }
  if(eW>0.) col+=envL(eD,eL)*eW;
  // haze
  vec3 fc=fogCol(rd);
  if(!isSky||tt<1e8){ float Tr=fogT(tt,ro,rd); col=col*Tr+fc*(1.-Tr); }
  // a shower curtain: rain shafts in the air between here and what is behind
  vec4 C=texelFetch(uT,ivec2(1,3),0);
  if(C.w>.001){
    // the shaft is a slab about 40 m thick: sample only the stretch of the ray inside it, so it shows at any distance
    vec2 nx=vec2(-sin(C.z),cos(C.z));
    float a0=dot(ro.xz-C.xy,nx), k=dot(rd.xz,nx), tm=min(tt,4000.), tau=0., t0=0., t1=tm;
    if(abs(k)>1e-5){ float ta=(-60.-a0)/k, tb=(60.-a0)/k; t0=max(min(ta,tb),0.); t1=min(max(ta,tb),tm); } else if(abs(a0)>60.) t1=-1.;
    if(t1>t0) for(int i=0;i<4+int(uF[5].w);i++){ float ts=mix(t0,t1,(float(i)+.5)/4.); tau+=curtain(ro+rd*ts,T)*(t1-t0)/4.; }
    col=mix(col,fc*vec3(.52,.55,.6),1.-exp(-tau*.014));
  }
  col*=uF[2].x;
  col=clamp((col*(2.51*col+.03))/(col*(2.43*col+.59)+.14),0.,1.);
  col=pow(col,vec3(1./2.2));
  float l=dot(col,vec3(.3,.55,.15)); col=mix(vec3(l),col,.9);
  col+=(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;   // a fixed dither against banding in the haze
  o=vec4(col,1.);
}`,bo=mt+`
#define G 1.352
uniform vec4 uD[7];
uniform sampler2D uT;
out vec3 vS, vR; out float vW, vA, vK, vT;
flat out int vI; flat out vec4 vC, vE;
uint ih(uint x){ x^=x>>16; x*=0x7feb352du; x^=x>>15; x*=0x846ca68bu; x^=x>>16; return x; }
float h1(uint x){ return float(ih(x)&0xffffffu)/16777216.; }
void main(){
  float T=uD[0].w, W=uD[1].w;
  float cp=cos(uD[0].y);
  vec3 fw=vec3(sin(uD[0].x)*cp,sin(uD[0].y),cos(uD[0].x)*cp), rt=vec3(cos(uD[0].x),0.,-sin(uD[0].x)), up=cross(fw,rt);
  vec3 cam=uD[1].xyz;
  int nR=int(uD[2].x);
  vec3 pa, pb; float rad=0., kind=0., al=0.;
  bool ok=true;
  vI=0; vC=vec4(0.); vE=vec4(0.);
  if(gl_InstanceID<nR){
    uint id=uint(gl_InstanceID);
    rad=mix(.0016,.0045+.005*uD[5].w,pow(h1(id*4u),1.6));
    float v=clamp(1.6*sqrt(rad/.0045),.7,1.7);   // Titan: ~1.6 m/s, snowflake speed
    float Rb=6., Hb=5.;
    float X=h1(id*4u+1u)*2.*Rb+uD[2].z*T, Z=h1(id*4u+2u)*2.*Rb+uD[2].w*T;
    pa=vec3(cam.x+mod(X-cam.x+Rb,2.*Rb)-Rb, uD[3].w+Hb-.5-mod(h1(id*4u+3u)*Hb+v*T,Hb), cam.z+mod(Z-cam.z+Rb,2.*Rb)-Rb);
    pb=pa-vec3(uD[2].z,-v,uD[2].w)*.008;
    al=.5; kind=0.;
    if(pa.y<-.02) ok=false;
  } else {
    int k=gl_InstanceID-nR;
    if(k<240){
      // one splash: S (x,y,z,t0); K (kind 1 sea / 2 land / 3 wash, size, seed, travel heading); X (jet speed, crown height, sand)
      int si=k/40, j=k-si*40;
      vec4 S=texelFetch(uT,ivec2(si,0),0), K=texelFetch(uT,ivec2(si,4),0), X=texelFetch(uT,ivec2(si,10),0);
      float tau=T-S.w, sz=K.y, Hc=X.y, tp=.7+.2*sz;
      vec2 tv=vec2(sin(K.w),cos(K.w));
      uint hs=uint(K.z)*977u+uint(j)*131u;
      float ha=h1(hs), hb=h1(hs+7u), hc=h1(hs+13u), hd=h1(hs+29u), he=h1(hs+41u);
      if(K.x<.5||tau<0.) ok=false;
      if(K.x>1.5&&j<2){
        // where it first hit dark sand: a dent and a short skid, longer along its travel; it stays while the splash does
        if(j==1||X.z<.5) ok=false;
        pa=S.xyz; pb=pa; rad=.12*sqrt(sz); kind=8.; al=1.; vC=vec4(pa,rad*.75); vE=vec4(tv,1.,0.);
      } else if(tau>7.) ok=false;
      else if(K.x==1.&&j<2){
        // the Worthington jet when the cavity closes, after the crown: short, thick and round-topped (low surface
        // tension and weak gravity: a slow fat column, not a pole), and the one bead that pinches off its top
        float v0=.42*X.x, td=tp*1.1, rj=.05+.05*sz;
        if(j==0){ float tj=tau-td, hh=v0*tj-.5*G*tj*tj; if(tj<0.||hh<0.) ok=false; pa=S.xyz; pb=pa+vec3(0.,max(hh,0.),0.); rad=rj*(1.-.25*clamp(tj/1.6,0.,1.)); kind=10.; }
        else { float t1=.58, tj=tau-td-t1, y0=v0*t1-.5*G*t1*t1, vy=v0-G*t1+.12, yy=y0+rj+vy*tj-.5*G*tj*tj; if(tj<0.||yy<0.) ok=false; pa=S.xyz+vec3(.01,yy,0.); pb=pa+vec3(0.,(vy-G*tj)*.03,0.); rad=.75*rj; kind=1.; }
        al=.9;
      } else if(K.x==1.&&j==2){
        // the crown: one continuous thin sheet rising all round as a flaring cup, highest toward where the stone was
        // going, slowing as it climbs in the weak gravity and thick air, its rim beading into fingers and drops, then
        // thinning, tearing and sinking slowly back (cut in the FS). Room above the rim for the beads
        float e=tau/tp, hh=Hc*(e<1.?1.-(1.-e)*(1.-e):1.-.8*smoothstep(1.,2.6,e)), rb=.04+.2*sqrt(sz)*(1.-exp(-tau/.3)), ht=hh*1.3+.03;
        pa=S.xyz; pb=pa+vec3(0.,ht,0.); rad=rb+(.18+.3*smoothstep(0.,1.6,e))*ht+.03;
        vC=vec4(S.xyz,rb); vE=vec4(hh,e,K.w,K.z);
        al=1.; kind=9.;
        if(hh<.005||e>2.6) ok=false;
      } else {
        // drops torn from the crown's rim (sea), a low sheet thrown forward (wash), or sand grains (land); in the thick air
        // each rises, slows and comes down at its own slow terminal speed; on the sea each leaves its own small ring
        float an, tl, vh, vy, rr, y0=0.; vec3 L0=S.xyz;
        if(K.x==1.){
          an=6.2831853*ha; vec2 dr=vec2(sin(an),cos(an));
          float hj=Hc*(.62+.38*dot(dr,tv));
          // small and many, each torn off the rim where it stands at that moment (the crown's own height and flare)
          float el=.45+.9*hb; tl=tp*el; rr=(.0018+.0065*hc*hc*hc)*sqrt(sz);
          vh=(.2+.5*hd)*sqrt(Hc); vy=(.3+1.1*he)*sqrt(hj);
          y0=.97*hj*(el<1.?1.-(1.-el)*(1.-el):1.-.8*smoothstep(1.,2.6,el));
          L0+=vec3(dr.x,0.,dr.y)*(.04+.2*sqrt(sz)*(1.-exp(-tl/.3))+(.18+.3*smoothstep(0.,1.6,el))*y0)+vec3(0.,y0,0.);
        } else if(K.x>2.5){
          an=K.w+(ha-.5)*2.2; tl=.03*hb; rr=(.0015+.006*hc*hc)*sqrt(sz); vh=(.5+1.3*hd)*sz; vy=(.25+.55*he)*sz;
        } else {
          an=K.w+(ha-.5)*3.4; tl=.02*hb; rr=(.001+.0026*hc)*sz; vh=(.15+.6*hd)*sz; vy=(.3+1.*he)*sz;
        }
        vec2 dr=vec2(sin(an),cos(an));
        float vt=K.x==2.?.3+.35*hc:clamp(1.6*sqrt(rr/.0045),.7,2.6), ta=vt/G, tj=tau-tl, E=exp(-tj/ta);
        vec2 wv=uD[2].zw*(K.x==2.?1.:.3);
        vec2 hx=dr*vh*ta*(1.-E)+wv*(tj-ta*(1.-E));
        float yy=y0+ta*(vy+G*ta)*(1.-E)-G*ta*tj, vyy=(vy+G*ta)*E-G*ta;
        if(tj<0.) ok=false;
        if(yy>=0.){
          pa=vec3(L0.x+hx.x,S.y+yy,L0.z+hx.y); vec2 hv=dr*vh*E+wv*(1.-E); pb=pa-vec3(hv.x,vyy,hv.y)*.045;
          rad=rr; al=.85; kind=K.x==2.?2.:1.;
        } else if(K.x==1.){
          // landed: find when (Newton from now, on a curve that only bends down), and spread its ring from there
          float tw=tj;
          for(int i=0;i<3+int(uD[6].w);i++){ float Ei=exp(-tw/ta); tw-=(y0+ta*(vy+G*ta)*(1.-Ei)-G*ta*tw)/min((vy+G*ta)*Ei-G*ta,-.05); }
          float age=tj-tw, El=exp(-tw/ta);
          if(age>2.4) ok=false;
          vec2 hl=dr*vh*ta*(1.-El)+wv*(tw-ta*(1.-El));
          pa=vec3(L0.x+hl.x,S.y,L0.z+hl.y); pb=pa;
          float R=.012+.13*age;
          vC=vec4(pa,R); vE=vec4(clamp(rr/.005,.25,1.6)*exp(-age*1.3),0.,0.,0.);
          rad=R*1.2+.03; al=1.; kind=7.;
        } else ok=false;
      }
    } else {
      // the stone (240-247), and its image in the sea while it flies over it or its contact shade where it lies (248-255)
      int pi=(k-240)&7;
      vec4 P=texelFetch(uT,ivec2(pi,1),0), M=texelFetch(uT,ivec2(pi,8),0), Q=texelFetch(uT,ivec2(pi,7),0);
      vI=pi;
      if(P.w<=0.) ok=false;
      if(k<248){ pa=P.xyz-M.xyz; pb=P.xyz; rad=P.w; kind=P.y<-.005?4.:3.; }
      else if(Q.w>1.5){ float gy=texelFetch(uT,ivec2(pi,9),0).x; pa=vec3(P.x,gy,P.z); pb=pa; rad=P.w*1.6; kind=6.; vC=vec4(pa,P.w*1.15); }
      else { if(Q.w<.5) ok=false; pb=P.xyz*vec3(1.,-1.,1.); pa=pb-M.xyz*vec3(1.,-1.,1.); rad=P.w; kind=5.; }
      al=1.;
    }
  }
  vec3 ra=pa-cam, rb=pb-cam;
  float za=dot(ra,fw), zb=dot(rb,fw);
  if(!ok||za<.25||zb<.25){ gl_Position=vec4(2.,2.,2.,1.); return; }
  vec2 sa=(vec2(dot(ra,rt),dot(ra,up))/(za*uD[0].z)*.5+.5)*W, sb=(vec2(dot(rb,rt),dot(rb,up))/(zb*uD[0].z)*.5+.5)*W;
  float rpx=rad*W/(2.*za*uD[0].z);
  float w=max(rpx,.8);
  vec2 ax=sb-sa; float L=length(ax); vec2 dir=L>1e-3?ax/L:vec2(0.,1.); vec2 nr=vec2(-dir.y,dir.x);
  int vid=gl_VertexID; vec2 cn=vec2(float(vid==1||vid==4||vid==5),float(vid==2||vid==3||vid==5));
  float m=w*(kind>9.5?1.9:kind>2.5?1.15:1.3)+1.;
  vec2 pv=sa+dir*(cn.y*(L+2.*m)-m)+nr*(cn.x*2.-1.)*m;
  vS=vec3(dot(pv-sa,dir),dot(pv-sa,nr),L);
  vec2 nd=pv/W*2.-1.; vR=fw+(nd.x*rt+nd.y*up)*uD[0].z;
  vW=w; vK=kind; vT=length(ra);
  vA=kind==0.?clamp(rpx/w,.04,1.)*uD[4].z*(1.+1.5*uD[5].w)*exp(-vT*.15):al*clamp(rpx*rpx/(w*w),.02,1.);
  if(kind==4.) vA=exp(-(-pa.y)*6.)*.9*(1.-smoothstep(3.,8.,vT))*smoothstep(.25,.55,-ra.y/vT);   // the sunk stone: only near and from above
  gl_Position=vec4(pv/W*2.-1.,0.,1.);
}`,go=mt+`
uniform vec4 uD[7];
uniform vec4 uS[15];
uniform sampler2D uG;
uniform sampler2D uT;
in vec3 vS, vR; in float vW, vA, vK, vT;
flat in int vI; flat in vec4 vC, vE;
out vec4 o;
vec3 qr(vec4 q,vec3 v){ return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v); }
// the stone takes the scene's own light, haze and tone curve (the cobbles' terms in the shade program, the composite's air)
vec3 fogC(vec3 d){
  d=normalize(vec3(d.x,.03,d.z));
  vec3 c=mix(uS[8].rgb,uS[7].rgb,pow(d.y,.55));
  float mu=dot(d,uS[0].xyz), g1=.72, g2=.94;
  float hg1=(1.-g1*g1)/pow(1.+g1*g1-2.*g1*mu,1.5), hg2=(1.-g2*g2)/pow(1.+g2*g2-2.*g2*mu,1.5);
  return c+uS[9].rgb*(.028*hg1+.0011*hg2)*(1.+.8*uS[9].w)*(.6+.4*smoothstep(-.1,.2,d.y+.15));
}
float fogT(float t,vec3 ro,vec3 rd){
  float H=45., k=rd.y*t/H;
  float g=abs(k)<1e-3?t:H*(1.-exp(-k))/rd.y;
  return exp(-uS[6].w*(t+2.2*exp(-max(ro.y,0.)/H)*g));
}
// one sample of the stone: its ray cut through three unequal axes (a third with a flat facet), lit as the beach's cobbles
// a cobble's lumps: low, broad swellings on the ellipsoid, so no two outlines are the same and none is a clean egg
vec4 lump(vec3 p,float s){   // (its gradient, its height): one call site, in the march
  vec3 a=p*vec3(2.3,2.9,2.1)+s*vec3(1.,1.7,.6), sa=sin(a), ca=cos(a);
  vec3 v1=vec3(4.1,3.3,-2.7), v2=vec3(-7.3,9.1,6.2); float b1=dot(p,v1)+s*2., b2=dot(p,v2)+s*3.;
  return vec4(.05*vec3(2.3*ca.x*sa.y*sa.z,2.9*sa.x*ca.y*sa.z,2.1*sa.x*sa.y*ca.z)+.03*cos(b1)*v1+.012*cos(b2)*v2,.05*sa.x*sa.y*sa.z+.03*sin(b1)+.012*sin(b2));
}
// where round a ring, in turns (-.5 to .5), without the two-argument atan
float pang(vec2 n){
  float ax=abs(n.x), ay=abs(n.y), a=min(ax,ay)/max(max(ax,ay),1e-6), q=a*a, r=((-.0464965*q+.1593142)*q-.3276228)*q*a+a;
  if(ay>ax) r=1.5707963-r; if(n.x<0.) r=3.1415927-r; if(n.y<0.) r=-r;
  return r*.1591549;
}
vec4 stone(vec3 ro,vec3 rd,vec3 C,float px,out float th){
  vec4 q=texelFetch(uT,ivec2(vI,5),0), A=texelFetch(uT,ivec2(vI,6),0), Q=texelFetch(uT,ivec2(vI,7),0), Z=texelFetch(uT,ivec2(vI,9),0);
  vec4 qi=vec4(-q.xyz,q.w);
  vec3 ol=qr(qi,ro-C)/A.xyz, d=qr(qi,rd)/A.xyz;
  float a=dot(d,d), b=dot(ol,d), c=dot(ol,ol)-1., h=b*b-a*c, la=sqrt(a);
  float e=px/(A.x+A.y+A.z)*2.1+.002;
  th=1e9;
  if(h<0.) return vec4(0.);
  float t=(-b-sqrt(h))/a, t1=(-b+sqrt(h))/a, fm=1., tm=t; vec3 gm=vec3(0.,1.,0.);
  // into the bounding ellipsoid, then a few steps onto the lumpy surface inside it; the nearest miss gives the soft edge
  for(int i=0;i<6+int(uD[6].w);i++){
    vec3 pp=ol+d*t; vec4 L=lump(pp,Z.y); float f=length(pp)-.92-L.w;
    if(f<fm){ fm=f; tm=t; gm=normalize(pp)-L.xyz; }
    t+=f/la;
  }
  float cov=1.-smoothstep(.2*e,1.2*e,fm);
  vec3 p=ol+d*tm;
  vec3 nl=gm/A.xyz;
  if(p.y>A.w){   // a fragment's flat cut face
    float tp=(A.w-ol.y)/min(d.y,-1e-6);
    if(d.y>=0.||tp>t1) cov=0.;
    tm=tp; p=ol+d*tp; nl=vec3(0.,1.,0.);
  }
  if(cov<=0.) return vec4(0.);
  th=tm;
  vec3 n=normalize(qr(q,normalize(nl)+.06*sin(p.yzx*9.3+Z.y)+.035*sin(p.zxy*23.+Z.y*2.)+.02*sin(p.xzy*51.+Z.y)));
  // pale cream to tan water ice, or a tholin-dark one; mottled, darker wet
  float mo=.5+.5*sin(p.x*5.1+Z.y)*sin(p.y*4.3-Z.y)*sin(p.z*6.7+Z.z*6.);
  vec3 ice=vec3(.5,.48,.45)*mix(vec3(1.),vec3(.9,.64,.42),clamp(Q.y+.3*mo-.15,0.,1.))*(.68+.3*Z.z);
  vec3 alb=mix(vec3(.1,.064,.042)*(.85+.3*mo),ice,Q.x)*(1.-.18*mo)*(1.-.45*Q.z);
  vec3 L=mix(uS[8].rgb,uS[7].rgb,max(n.y,0.))*smoothstep(-.95,.7,n.y)*1.05+uS[9].rgb*uS[0].w*.6*max(dot(n,uS[0].xyz)*.6+.4,0.)+uS[11].rgb*vec3(.3,.2,.13)*(.5-.5*n.y);
  vec3 col=alb*L;
  vec3 rr=reflect(rd,n); float mu=max(dot(rr,uS[0].xyz),0.);
  col+=(mix(uS[8].rgb,uS[7].rgb,clamp(rr.y,0.,1.))+uS[9].rgb*.3*mu*mu)*(.045+.25*Q.z*Q.z);
  // ice's own gloss: toward its outline it mirrors the bright haze (or the dark beach, facing down), broad and dull
  float fr=pow(1.-clamp(dot(-rd,n),0.,1.),4.);
  col+=mix(uS[11].rgb*vec3(.09,.07,.05),mix(uS[8].rgb,uS[7].rgb,pow(clamp(rr.y,0.,1.),.55)),smoothstep(-.25,.15,rr.y))*fr*(.2+.4*Q.z);
  return vec4(col,cov);
}
void main(){
  vec4 g=texelFetch(uG,ivec2(gl_FragCoord.xy),0);
  float tg=uD[4].w>.5?exp2(abs(g.a-.5)*30.)-1.:abs(g.a);
  if(vK>2.5&&vK<5.5){
    vec3 cam=uD[1].xyz, rd=normalize(vR), ro=cam, r0=rd; float pf=1., tw=0.;
    if(vK>4.5){
      // its dark image in the glossy sea, where the sea is in view (Fresnel as the composite's)
      if(rd.y>-.002) discard;
      tw=-cam.y/rd.y; if(tw>tg+.02) discard;
      ro=cam+rd*tw; rd.y=-rd.y; pf=(.02+.98*pow(1.-rd.y,4.))*.9;
    }
    vec4 P=texelFetch(uT,ivec2(vI,1),0), M=texelFetch(uT,ivec2(vI,8),0);
    int n=int(M.w);
    float px=2.*vT*uD[0].z/uD[1].w, cv=0., th=1e9, t;
    vec3 acc=vec3(0.);
    // fast near the hand: a few samples along this frame's path, so it never pops in as a disc
    float jt=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);   // dithered, so the samples never show as layers
    for(int i=0;i<n;i++){
      vec4 r=stone(ro,rd,P.xyz-M.xyz*(n>1?(float(i)+jt)/float(n):0.),px,t);
      acc+=r.rgb*r.w; cv+=r.w; if(r.w>.01) th=min(th,t);
    }
    if(cv<=.001) discard;
    acc/=cv; cv/=float(n);
    if(vK<4.5&&th>tg+.02) discard;
    if(vK>3.5&&vK<4.5){ acc*=vec3(.75,.5,.3); cv*=vA; }
    float Tr=fogT(th+tw,cam,r0);
    vec3 c=(acc*Tr+fogC(r0)*(1.-Tr))*uD[6].x;
    c=pow(clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.),vec3(1./2.2));
    c=mix(vec3(dot(c,vec3(.3,.55,.15))),c,.9);
    float a=cv*pf;
    o=vec4(c*a,a); return;
  }
  if(vK>5.5&&vK<8.5){
    vec3 cam=uD[1].xyz, rd=normalize(vR);
    float t=(vC.y-cam.y)/rd.y; if(t<=0.) discard;
    vec2 q=cam.xz+rd.xz*t-vC.xz;
    if(vK<6.5){   // the contact shade under a lying stone
      if(t>tg+.25) discard;
      float r=length(q)/vC.w; o=vec4(0.,0.,0.,.62*exp(-r*r*2.6)); return;
    }
    if(vK<7.5){   // a drop's ring on the glossy sea: the slope tips the mirror, darker inside, brighter outside
      if(t>tg+.02) discard;
      float x=(length(q)-vC.w)/(.006+.05*vC.w), v=x*exp(-x*x)*vE.x;
      o=v>0.?vec4(uD[3].rgb*v*.8,0.):vec4(0.,0.,0.,-v*.7); return;
    }
    // the dent and skid on dark sand where it first hit
    if(t>tg+.15) discard;
    vec2 u=vec2(dot(q,vE.xy)*.55,dot(q,vec2(-vE.y,vE.x)))/vC.w;
    o=vec4(0.,0.,0.,.42*smoothstep(1.,.35,length(u+vec2(-.35,0.)))*vE.z); return;
  }
  if(vK>8.5&&vK<9.5){
    // the crown: the ray cut through a flaring cup of liquid, back wall first, then the front over it. One continuous
    // sheet, thick and fuller at its foot, thin and clear up the wall, gathered into a rolled rim that breaks into
    // fingers with a bead on each; late in its life beads tear off and ride up, the sheet thins from the top and sinks.
    // Lit by the haze all round: the inside of the far wall faces the sky (brighter), the outside of the near wall the sea
    vec3 cam=uD[1].xyz, rd=normalize(vR), ol=cam-vC.xyz; float e=vE.y, k=.18+.3*smoothstep(0.,1.6,e), rb=vC.w, H=vE.x;
    float A=dot(rd.xz,rd.xz)-k*k*rd.y*rd.y, B=2.*(dot(ol.xz,rd.xz)-k*rd.y*(rb+k*ol.y)), C=dot(ol.xz,ol.xz)-(rb+k*ol.y)*(rb+k*ol.y), h=B*B-4.*A*C;
    if(h<0.||abs(A)<1e-6) discard;
    h=sqrt(h);
    vec2 tv=vec2(sin(vE.z),cos(vE.z)); float sd=fract(vE.w*.618034)*6.2831853, N=floor(26.+14.*fract(vE.w*.381966));
    float pm=2.*uD[0].z/uD[1].w, brk=smoothstep(.9,2.2,e);
    float acc=0.; vec3 cc=vec3(0.);
    for(int i=0;i<2+int(uD[6].w);i++){
      float t=(-B+(i==0?h:-h))/(2.*A);
      vec3 p=ol+rd*t;
      if(t>0.&&t<tg+.02&&p.y>0.){
      float rr=length(p.xz), px=pm*t; vec2 n2=p.xz/max(rr,1e-4);
      float an=pang(n2), fi=an*N, ci=floor(fi+.5), f=fi-ci; ci=mod(ci,N);
      float hf=fract(sin(ci*12.9898+sd)*43758.547), hg=fract(hf*7.13+.31), hk=fract(hf*13.71+.17);
      f-=(hk-.5)*.5;   // fingers unevenly spaced, a few cells without one
      float Hr=H*(.62+.38*dot(n2,tv))*(.92+.05*sin(an*12.566371+sd)+.03*sin(an*31.415927+sd*1.7));
      float cw=6.2831853*rr/N, sx=f*cw, y=p.y;
      float top=Hr*(1.-.05*smoothstep(0.,.5,abs(f))*(1.+brk));       // scalloped low between the fingers
      float fl=Hr*(.005+.13*hf*hf*hf)*smoothstep(.15,.8,e)*(1.+.6*brk)*step(.2,hk), fw=cw*(.04+.04*hg)+.0015, br=fw*(1.2+1.1*hk)+.002;
      float sh=smoothstep(top+px*.6,top-px*.6,y), fy=clamp((y-top)/max(fl,1e-4),0.,1.), fwy=fw*(1.+1.4*(1.-fy)*(1.-fy));
      float fg=smoothstep(fwy+px*.6,fwy-px*.6,abs(sx))*smoothstep(top+fl+px*.6,top+fl-px*.6,y)*(1.-sh);
      float yb=top+fl+br*.5, yd=yb+br*(2.+5.*hg)*smoothstep(.5,1.5,e);
      float bd=smoothstep(br+px*.6,br-px*.6,length(vec2(sx,y-yb)))*step(.12,hk);
      float b2=smoothstep(.7*br+px*.6,.7*br-px*.6,length(vec2(sx,y-yd)))*step(.55,hg)*smoothstep(.6,1.,e);
      float bb=max(bd,b2)*(1.-smoothstep(1.1,1.9,e)), u=clamp(y/top,0.,1.);
      vec3 nn=normalize(vec3(n2.x,-k,n2.y)); nn*=-sign(dot(nn,rd));
      float gl=pow(1.-abs(dot(rd,nn)),3.), sk=smoothstep(-.4,.6,reflect(rd,nn).y);
      float rw=max(.03*H,px), rim=smoothstep(top-rw,top-.3*rw,y)*sh;
      float a=sh*min(mix(.48,.2,pow(u,.6))*(1.-.6*brk*smoothstep(.2,.9,u))*(1.+1.8*gl)+.35*rim,.8);
      a=max(a,max(fg*.6,bb*.75));
      vec3 col=uD[3].rgb*((.55+.3*sk+.15*u+.3*gl+.08*dot(n2,normalize(uS[0].xz+1e-4)))*(1.-max(fg,bb))+max(fg,bb)*(1.05-.25*smoothstep(.4,1.,length(vec2(sx,y-yb))/br))+.2*rim);
      cc=col*a+cc*(1.-a); acc=a+acc*(1.-a);
      }
    }
    float fd=1.-smoothstep(1.5,2.6,e);
    o=vec4(cc,acc)*fd; return;
  }
  if(vT>tg+.02) discard;
  float s=clamp(vS.x,0.,vS.z), d=length(vec2(vS.x-s,vS.y));
  if(vK>9.5){
    // the jet: a fat round-topped column on a flared foot; clear liquid lit all round, its edges bending the haze away
    float ww=vW*(1.+.8*exp(-max(vS.x,0.)/(vW*1.3))+.1*smoothstep(vS.z-3.*vW,vS.z,vS.x)), q=d/ww;
    float a=vA*(1.-smoothstep(ww-.7,ww+.5,d))*(.6+.25*(1.-q*q));
    o=vec4(uD[3].rgb*(.9-.4*smoothstep(.35,1.,q)+.1*(1.-q)+.1*clamp(vS.x/max(vS.z,1.),0.,1.))*a,a); return;
  }
  if(vK<.5){
    float m=1.-smoothstep(vW*.3,vW,d); float a=vA*m;
    o=vec4(uD[3].rgb*a,a*.5); return;
  }
  // liquid: the column and the crown's sheet fat at the foot and thinning upward, the drops fat at the head; clear, so
  // bright through the middle and darker at the rims where the haze behind is bent away. Sand grains are dark.
  float ww=vK<1.5?vW*(1.25-(vK>1.1?.3:.65)*clamp(s/max(vS.z,1e-3),0.,1.)):vW;
  float m=1.-smoothstep(ww-.8,ww+.4,d); float a=vA*m*(vK<1.5?.85:1.);
  vec3 c=vK<1.5?uD[3].rgb*(vK>1.1?.8:1.05)*(1.05-.5*smoothstep(.35,1.,d/ww)):vec3(.075,.05,.033);
  o=vec4(c*a,a);
}`,C=a.__c522||(a.__c522=(()=>{a.getExtension("KHR_parallel_shader_compile");const t=!!a.getExtension("EXT_color_buffer_float")||!!a.getExtension("EXT_color_buffer_half_float"),o=(w,k)=>{const S=a.createShader(k);return a.shaderSource(S,w),a.compileShader(S),S},n=o(mo,a.VERTEX_SHADER),s=o(bo,a.VERTEX_SHADER),c=[n,s],i={gm:[n,xo],gs:[n,wo],sky:[n,uo],comp:[n,yo],drop:[s,go]},e={};for(const w in i){const k=a.createProgram(),S=o(i[w][1],a.FRAGMENT_SHADER);a.attachShader(k,i[w][0]),a.attachShader(k,S),a.linkProgram(k),a.flush(),e[w]={p:k,f:S,v:i[w][0]}}a.flush();const h=new Uint8Array(256*256*4);let f=2654435769;for(let w=0;w<h.length;w++)f=Math.imul(f^f>>>15,739982445),f=Math.imul(f^f>>>12,695872825),f^=f>>>15,h[w]=f&255;const r=640,x=((w,k)=>{const S=new Float32Array(r*r),I=new Uint8Array(r*r);let P=19088743;const z=()=>(P=Math.imul(P^P>>>15,739982445),P=Math.imul(P^P>>>12,695872825),P^=P>>>15,(P>>>0)/4294967296),Mt=[];for(let u=0;u<9e3;u++)Mt.push(Math.min(.085,.0036*Math.pow(1-z()*.999,-1/1.7)));Mt.sort((u,T)=>T-u);const Q=[0,1,2,3,4,5].map(()=>z()*U),xt=U/w,Io=(u,T)=>.5+.22*Math.sin(xt*(2*u+T)+Q[0])+.17*Math.sin(xt*(-u+3*T)+Q[1])+.13*Math.sin(xt*(4*u-2*T)+Q[2])+.1*Math.sin(xt*(5*u+4*T)+Q[3])+.07*Math.sin(xt*(-7*u+5*T)+Q[4])+.09*Math.sin(xt*(9*u+2*T)+Q[5])+.06*Math.sin(xt*(-3*u+11*T)+Q[0]*1.7),J=30,Ma=Array.from({length:J*J},()=>[]);let Ta=0;for(const u of Mt){if(Ta>w*w*.42)break;let T=!1;for(let q=0;q<8&&!T;q++){const W=z()*w,_=z()*w;if(Io(W,_)+(u<.008?.2:u<.02?.1:-.02-.8*(u-.02))+.1*(z()-.5)<.42+.22*z())continue;const Ea=Math.floor(W/w*J),Sa=Math.floor(_/w*J);let ve=!0;for(let lt=-2;lt<=2&&ve;lt++)for(let kt=-2;kt<=2&&ve;kt++)for(const Kt of Ma[(Sa+lt+J)%J*J+(Ea+kt+J)%J]){let $=Math.abs(Kt[0]-W),ft=Math.abs(Kt[1]-_);if($=Math.min($,w-$),ft=Math.min(ft,w-ft),$*$+ft*ft<Math.pow(.82*(Kt[2]+u),2)){ve=!1;break}}if(!ve)continue;T=!0,Ma[Sa*J+Ea].push([W,_,u]),Ta+=Math.PI*u*u;const Ie=u*(.88+.24*z()),Ue=u*(.62+.36*z()),ue=u*(.5+.4*z()),pe=ue*(.04+.78*Math.pow(z(),1.15)),qa=z()*Math.PI,Ra=Math.cos(qa),Aa=Math.sin(qa),Fa=z()*U,Da=z()*U,_a=.12*z(),Ca=.07*z(),Uo=_a*Math.cos(Fa),jo=_a*Math.sin(Fa),Xo=Ca*Math.cos(Da),Ko=Ca*Math.sin(Da),Xt=z()<.34,La=Xt?.07+.08*z():0,Pa=z()*U,Bo=La*Math.cos(Pa),Ho=La*Math.sin(Pa),Na=z()*U,Wo=Math.cos(Na)/u,Oo=Math.sin(Na)/u,Vo=.25+.3*z(),Zo=.6+.25*z(),Ga=Xt?.05:.12*z(),Ia=z(),Qo=Ia<.36?.3+.14*z():Ia<.76?.5+.25*z():.8+.2*z(),Yo=u>.02&&z()<.3,Ua=z()*Math.PI,Jo=Math.sin(Ua),$o=Math.cos(Ua),ts=(z()-.5)*.6*Ue,me=Math.ceil(Ie*1.55/k),ja=Math.round(W/k),Xa=Math.round(_/k);for(let lt=-me;lt<=me;lt++){const kt=(Xa+lt)*k-_,Kt=((Xa+lt)%r+r)%r*r;for(let $=-me;$<=me;$++){const ft=(ja+$)*k-W,bt=ft*Ra+kt*Aa,gt=-ft*Aa+kt*Ra,Ka=bt/Ie,Ba=gt/Ue;if(Ka*Ka+Ba*Ba>2.6)continue;const Ha=Math.sqrt(bt*bt+gt*gt)+1e-9,Bt=bt/Ha,Ht=gt/Ha,Et=Bt*Bt-Ht*Ht,St=2*Bt*Ht,es=Bt*Et-Ht*St,as=Ht*Et+Bt*St;let je=1+Uo*Et-jo*St+Xo*es-Ko*as;if(Xt){const xe=Et*Et-St*St,ss=2*Et*St;je+=Bo*xe-Ho*ss}const Wa=bt/Ie,Oa=gt/Ue,qt=(Wa*Wa+Oa*Oa)/(je*je);if(qt>=1.9)continue;const Rt=Kt+((ja+$)%r+r)%r;let dt=qt<1?ue*Math.pow(1-qt,Xt?.4:.62)*(1-Ga*qt)/(1-Ga*.5)-pe:-1,Va=Qo;if(Xt&&dt>-pe&&(dt=Math.min(dt,ue*(Zo+Vo*(bt*Wo+gt*Oo))-pe)),Yo&&dt>0){const xe=Math.abs(bt*Jo-gt*$o-ts);xe<.003&&(dt-=.004*(1-xe/.003),Va*=.55)}const Xe=qt<1?.0018*Math.log1p(Math.exp(dt/.0018)):-1,os=Math.sqrt(qt),Ke=Math.min(pe*.8,ue*.18)*Math.pow(Math.max(0,Math.min(1,1-(os-.9)/.48)),2);Xe>Ke&&Xe>S[Rt]?(S[Rt]=Xe,I[Rt]=dt>5e-4?Math.round(Math.max(Va*(.35+.65*Math.min(1,dt/.007)),.17)*255):0):Ke>S[Rt]&&(S[Rt]=Ke,I[Rt]=0)}}}}const ht=new Float32Array(r*r),Tt=new Float32Array(r*r),wt=new Int32Array(r),yt=new Int32Array(r);for(let u=0;u<r;u++)wt[u]=(u+r-1)%r,yt[u]=(u+1)%r;for(let u=0;u<r;u++){const T=u*r;for(let q=0;q<r;q++)ht[T+q]=.25*S[T+wt[q]]+.5*S[T+q]+.25*S[T+yt[q]]}for(let u=0;u<r;u++){const T=u*r,q=wt[u]*r,W=yt[u]*r;for(let _=0;_<r;_++)Tt[T+_]=.25*ht[q+_]+.5*ht[T+_]+.25*ht[W+_]}for(let u=0;u<r;u++){const T=u*r;for(let q=0;q<r;q++)ht[T+q]=.25*I[T+wt[q]]+.5*I[T+q]+.25*I[T+yt[q]]}const ka=new Uint8Array(r*r);for(let u=0;u<r;u++){const T=u*r,q=wt[u]*r,W=yt[u]*r;for(let _=0;_<r;_++)ka[T+_]=Math.round(.25*ht[q+_]+.5*ht[T+_]+.25*ht[W+_])}const jt=new Uint8Array(r*r*4);for(let u=0;u<r;u++)for(let T=0;T<r;T++){const q=u*r+T,W=(Tt[u*r+yt[T]]-Tt[u*r+wt[T]])/(2*k),_=(Tt[yt[u]*r+T]-Tt[wt[u]*r+T])/(2*k);jt[q*4]=Math.min(255,Math.round(Tt[q]/.1*255));const Ge=1/Math.sqrt(1+W*W+_*_);jt[q*4+1]=Math.round((-W*Ge*.5+.5)*255),jt[q*4+2]=Math.round((-_*Ge*.5+.5)*255),jt[q*4+3]=ka[q]}return jt})(3,3/640);for(const w in e){if(!a.getProgramParameter(e[w].p,a.LINK_STATUS))throw new Error("522 "+w+": "+a.getShaderInfoLog(e[w].f)+a.getShaderInfoLog(e[w].v)+a.getProgramInfoLog(e[w].p));const k=e[w].p,S={};c.push(e[w].f),e[w]=S,S.p=k;const I=a.getProgramParameter(k,a.ACTIVE_UNIFORMS);for(let P=0;P<I;P++){const z=a.getActiveUniform(k,P).name.replace("[0]","");S[z]=a.getUniformLocation(k,z)}a.useProgram(k),["uN","uP","uG","uE","uT","uFt","uA"].forEach((P,z)=>{S[P]&&a.uniform1i(S[P],z)})}const{tex:g,fbo:y}=Ya(a),L=!!a.getExtension("EXT_color_buffer_float");a.pixelStorei(a.UNPACK_ALIGNMENT,1);const D=g(256,256,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT,h);a.generateMipmap(a.TEXTURE_2D);const G=g(r,r,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT,x);a.generateMipmap(a.TEXTURE_2D),a.pixelStorei(a.UNPACK_ALIGNMENT,4);const K=g(8,11,a.RGBA32F,a.RGBA,a.FLOAT,a.NEAREST,a.CLAMP_TO_EDGE);return a.bindFramebuffer(a.FRAMEBUFFER,null),{P:e,sh:c,tex:g,fbo:y,fl:t,f32:L,nb:h,tN:D,tP:G,tT:K,vao:a.createVertexArray(),users:new Set}})()),j=C.P,re=C.nb,zt=(t,o,n)=>{const s=Math.min(1,Math.max(0,(n-t)/(o-t)));return s*s*(3-2*s)},zo=t=>t-Math.floor(t),ct=(t,o)=>{const n=Math.floor(t),s=Math.floor(o);let c=t-n,i=o-s;c=c*c*(3-2*c),i=i*i*(3-2*i);const e=n&255,h=n+1&255,f=s&255,r=s+1&255,x=re[(f*256+e)*4],g=re[(f*256+h)*4],y=re[(r*256+e)*4],L=re[(r*256+h)*4];return((x+(g-x)*c)*(1-i)+(y+(L-y)*c)*i)/255},Nt=(t,o)=>{const n=t/Zt,s=Math.sqrt(1+n*n),c=Ot+Vt*(s-1)+Qt*t+Yt*Math.sin(t*.031+Jt)+$t*Math.sin(t*.083+te)+.55*Math.sin(t*.45+2*Math.sin(t*.07)),i=Vt*n/(Zt*s)+Qt+Yt*.031*Math.cos(t*.031+Jt)+$t*.083*Math.cos(t*.083+te)+.55*Math.cos(t*.45+2*Math.sin(t*.07))*(.45+.14*Math.cos(t*.07));return[(o-c)/Math.sqrt(1+i*i),t,i]},Mo=t=>{if(t>0)return Math.max(-at*t-.003*t*t,-30);const o=-t;return at*Math.min(o,5)+.28*zt(4,9,o)+.012*Math.max(o-5,0)},To=(t,o,n)=>{const s=zt(ee,ee+55,n);if(s<=0)return 0;const c=Math.cos(ae),i=Math.sin(ae),e=t*c+o*i,f=(-t*i+o*c)/$e+.45*ct(e*.0045+3.1,1.7)+.18*ct(e*.017+1.3,5.2),r=Math.abs(zo(f)-.5)*2,x=(1-r)*.45+(1-r*r*(3-2*r))*.55;return Math.max(x-.28,0)/.72*Je*(.5+.5*ct(e*.006+11,2.9))*s*(1+Math.max(n-ee,0)/160)},oa=(t,o,n)=>{if(!n||n[2]<=0)return-40;let s=t-n[0],c=o-n[1];const i=(s*n[4]+c*n[5])/(n[3]*n[6]),e=(-s*n[5]+c*n[4])/n[3],h=i*i+e*e;if(h>2.2)return-40;const f=.6*ct(t*.004,o*.004)+.4*ct(t*.013+5,o*.013+5);return n[2]*Math.pow(Math.max(1-h*(.7+.6*f),0),.5)*(.7+.6*ct(t*.0065+2,o*.0065+2))-22},V=(t,o)=>{const n=Nt(t,o),s=-n[0];let c=Mo(n[0]);return c+=(ct(t*.09,o*.09)-.5)*.35*zt(7,16,s)+(ct(t*.021+7,o*.021+7)-.5)*1.4*zt(8,40,s),c+=To(t,o,s),Math.max(c,oa(t,o,_t[0]),oa(t,o,_t[1]))},sa=C.fl?0:1;se[47]=sa;const Fe=R>450,p={view:null,tM:null,fM:null,mw:0,mh:0};p.tG=C.fl?C.tex(R,R,a.RGBA16F,a.RGBA,a.HALF_FLOAT,a.LINEAR,a.CLAMP_TO_EDGE):C.tex(R,R,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST,a.CLAMP_TO_EDGE),p.fG=C.fbo(p.tG),p.ew=Fe?2048:1024,p.eh=p.ew/4,p.tE=C.tex(p.ew,p.eh,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.LINEAR_MIPMAP_LINEAR,a.REPEAT),p.fE=C.fbo(p.tE);const ko=(t,o)=>{if(t>p.mw||o>p.mh){p.tM&&(a.deleteTexture(p.tM),a.deleteFramebuffer(p.fM));const n=Math.max(t,p.mw),s=Math.max(o,p.mh);p.tM=C.fl?C.tex(n,s,C.f32?a.RGBA32F:a.RGBA16F,a.RGBA,C.f32?a.FLOAT:a.HALF_FLOAT,a.NEAREST,a.CLAMP_TO_EDGE):C.tex(n,s,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,a.NEAREST,a.CLAMP_TO_EDGE),p.fM=C.fbo(p.tM),p.mw=n,p.mh=s}return{t:p.tM,f:p.fM}},N={yaw:0,pitch:ao,x:0,z:0,eye:1.65},na=t=>{const o=t/Zt;return Ot+Vt*(Math.sqrt(1+o*o)-1)+Qt*t+Yt*Math.sin(t*.031+Jt)+$t*Math.sin(t*.083+te)+.55*Math.sin(t*.45+2*Math.sin(t*.07))},Eo=t=>Math.atan2(-(na(t+.5)-na(t-.5)),1)-et;if(to==="Along the shore"){const t=vt()<.5?-1:1;N.x=(vt()-.5)*8,N.yaw=Eo(N.x)+t*(1.22+vt()*.3),N.pitch=-.12-vt()*.04}const ce=V(N.x,N.z),So={yaw:0,pitch:0,x:0,y:0,z:0},d={yaw:et+N.yaw,pitch:N.pitch,x:N.x,z:N.z,eye:ce+N.eye},ra=()=>{const t=v.view||So;d.yaw=et+N.yaw+(t.yaw||0),d.pitch=Math.max(-1.25,Math.min(1.25,N.pitch+(t.pitch||0)));const o=t.x||0,n=t.z||0,s=Math.hypot(o,n),c=s>12?12/s:1;d.x=N.x+o*c,d.z=Math.min(N.z+n*c,Math.max(Ot-2,N.z)),d.eye=V(d.x,d.z)+Math.max(.5,Math.min(3,N.eye+(t.y||0)))},Gt=new Float32Array(12),ie=t=>{a.uniform4fv(t.uS,se),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,C.tN),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,C.tP)},qo=1024,Ro=512,De=()=>{a.bindVertexArray(C.vao),a.disable(a.BLEND),a.disable(a.DEPTH_TEST),a.disable(a.SCISSOR_TEST),a.disable(a.CULL_FACE),a.colorMask(!0,!0,!0,!0)},ca=(t,o,n)=>{const s=Math.min(o,qo),c=Math.min(n,Ro),i=ko(s,c);for(let e=0;e<n;e+=c)for(let h=0;h<o;h+=s){const f=Math.min(s,o-h),r=Math.min(c,n-e);a.bindFramebuffer(a.FRAMEBUFFER,i.f),a.viewport(0,0,f,r),a.useProgram(j.gm.p),ie(j.gm),a.uniform4fv(j.gm.uC,Gt),a.uniform2f(j.gm.uO,h,e),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,t),a.viewport(h,e,f,r),a.useProgram(j.gs.p),ie(j.gs),a.uniform4fv(j.gs.uC,Gt),a.uniform2f(j.gs.uO,h,e),a.activeTexture(a.TEXTURE6),a.bindTexture(a.TEXTURE_2D,i.t),a.drawArrays(a.TRIANGLES,0,3),a.bindTexture(a.TEXTURE_2D,null)}a.bindFramebuffer(a.FRAMEBUFFER,null)},Ao=()=>{De(),a.bindFramebuffer(a.FRAMEBUFFER,p.fE),a.viewport(0,0,p.ew,p.eh),Gt.set([0,0,1,1,N.x,d.eye,N.z,170,p.ew,p.eh,.003,0]),a.useProgram(j.sky.p),ie(j.sky),a.uniform4fv(j.sky.uC,Gt),a.drawArrays(a.TRIANGLES,0,3),a.bindFramebuffer(a.FRAMEBUFFER,null),ca(p.fE,p.ew,p.eh),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,p.tE),a.generateMipmap(a.TEXTURE_2D)},ia=()=>{De(),Gt.set([d.yaw,d.pitch,Dt,0,d.x,d.eye,d.z,280,R,R,2*Dt/R,0]),ca(p.fG,R,R),p.view=[d.yaw,d.pitch,d.x,d.z,d.eye].join()};ra();{const t=d.eye;d.eye=ce+N.eye,Ao(),d.eye=t}p.view!==[d.yaw,d.pitch,d.x,d.z,d.eye].join()&&ia(),p.tM&&(a.deleteTexture(p.tM),a.deleteFramebuffer(p.fM),p.tM=p.fM=null,p.mw=p.mh=0);const ha=(t,o)=>{const n=t*2-1,s=1-o*2,c=Math.cos(d.pitch),i=[Math.sin(d.yaw)*c,Math.sin(d.pitch),Math.cos(d.yaw)*c],e=[Math.cos(d.yaw),0,-Math.sin(d.yaw)],h=[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],f=[0,1,2].map(x=>i[x]+(n*e[x]+s*h[x])*Dt),r=Math.hypot(f[0],f[1],f[2]);return f.map(x=>x/r)},_e=(t,o,n)=>{const s=ha(t,o);let c=.3,i=.3;for(;c<n;){const h=d.x+s[0]*c,f=d.eye+s[1]*c,r=d.z+s[2]*c,x=V(h,r);if(f<Math.max(x,0)){let g=i,y=c;for(let K=0;K<8;K++){const w=(g+y)/2;d.eye+s[1]*w<Math.max(V(d.x+s[0]*w,d.z+s[2]*w),0)?y=w:g=w}const L=d.x+s[0]*y,D=d.z+s[2]*y,G=V(L,D);return{x:L,z:D,y:Math.max(G,0),water:G<0,dist:y}}i=c,c+=Math.max(.08,c*.03)}const e=Math.hypot(s[0],s[2])||1;return{x:d.x+s[0]/e*n,z:d.z+s[2]/e*n,y:0,water:!0,dist:n}};let X=0;const he=[],it=[],It=[],m={w:.9,A:0,kv:0,ph:l()*U,cg:1,tg:-100,ug:0,far:0},B={x:0,z:0,r:8,s:0},b={x:0,z:0,ang:0,s:0,vx:0,vz:0,hold:!1};let Ut=[.12,.05];const H=new Float32Array(8*11*4),Ce=10,Fo=(t,o)=>[t[3]*o[0]+t[0]*o[3]+t[1]*o[2]-t[2]*o[1],t[3]*o[1]-t[0]*o[2]+t[1]*o[3]+t[2]*o[0],t[3]*o[2]+t[0]*o[1]-t[1]*o[0]+t[2]*o[3],t[3]*o[3]-t[0]*o[0]-t[1]*o[1]-t[2]*o[2]],le=t=>{const o=Math.hypot(t[0],t[1],t[2],t[3])||1;return t.map(n=>n/o)},la=(t,o)=>{const[n,s,c,i]=t,e=s*o[2]-c*o[1]+i*o[0],h=c*o[0]-n*o[2]+i*o[1],f=n*o[1]-s*o[0]+i*o[2];return[o[0]+2*(s*f-c*h),o[1]+2*(c*e-n*f),o[2]+2*(n*h-s*e)]},fa=(t,o,n,s)=>{let c=0,i=0,e=t*Math.cos(o),h=t*Math.sin(o),f=0,r=0;for(let x=0;x<900;x++){const g=Math.hypot(e,h);if(e-=n*g*e/60,h-=(A+n*g*h)/60,f=c,r=i,c+=e/60,i+=h/60,h<0&&i<s)return f+(c-f)*(r-s)/Math.max(r-i,1e-6)}return c},da=(t,o)=>{const n=ha(t,o),s=_e(t,o,90),c=Math.cos(d.yaw),i=Math.sin(d.yaw),e=[d.x+c*.45+i*.9,d.eye-.75,d.z-i*.45+c*.9],h=.06+.035*l(),f=.001/h,r=[h*(1.12+.25*l()),h*(.6+.15*l()),h*(.88+.17*l())],x=l()<1/3?.3+.35*l():2,g=l()<.15;let y=s.x-e[0],L=s.z-e[2];const D=Math.hypot(y,L)||1;y/=D,L/=D;let G,K=Ce;if(n[1]>.01){G=Math.min(1.25,Math.max(.6,Math.asin(n[1])+.35));const I=Math.hypot(n[0],n[2])||1;y=n[0]/I,L=n[2]/I}else{G=(D<6?45:39+4*(l()-.5))*st;const I=s.y+(s.water?0:r[1])-e[1];if(fa(Ce,G,f,I)>D){let P=.8,z=Ce;for(let Mt=0;Mt<12;Mt++){const Q=(P+z)/2;fa(Q,G,f,I)<D?P=Q:z=Q}K=(P+z)/2}}const w=[l()-.5,l()-.5,l()-.5],k=Math.hypot(w[0],w[1],w[2])||1,S=(1+l())*U;It.push({p:e,pp:e.slice(),v:[y*K*Math.cos(G),K*Math.sin(G),L*K*Math.cos(G)],r:h,kd:f,ax:r,cut:x,tone:g?.15+.3*l():.6+.4*l(),stain:l(),mot:l(),seed:l()*6.28,wet:0,q:le([l()-.5,l()-.5,l()-.5,l()-.5]),w:w.map(I=>I/k*S),qt:null,state:0,hops:0,gy:0,n:1,M:[0,0,0],mode:0,wash:!1}),It.length>8&&It.shift()},va=(t,o,n,s,c,i,e,h,f)=>{const r={x:t,y:o,z:n,t0:X,kind:s,amp:c,seed:Math.floor(l()*65536),hd:i,jv:e,ch:h,sand:f};return it.push(r),it.length>6&&it.shift(),r},Do=t=>(t>>>=0,t=(t^t>>>16)>>>0,t=Math.imul(t,2146121005)>>>0,t=(t^t>>>15)>>>0,t=Math.imul(t,2221713035)>>>0,(t^t>>>16)>>>0),fe=t=>(Do(t)&16777215)/16777216,_o=(t,o,n)=>{const s=.7+.2*t.amp,c=[];for(let i=3;i<40;i++){const e=Math.imul(t.seed,977)+i*131>>>0,h=fe(e),f=fe(e+7),r=fe(e+13),x=fe(e+41),g=t.ch*(.62+.38*Math.cos(U*h-t.hd)),y=.45+.9*f,L=s*y,D=(.0018+.0065*r*r*r)*Math.sqrt(t.amp),G=Math.min(1,Math.max(0,(y-1)/1.6)),K=(.3+1.1*x)*Math.sqrt(g),w=.97*g*(y<1?1-(1-y)*(1-y):1-.8*G*G*(3-2*G)),k=Math.min(2.6,Math.max(.7,1.6*Math.sqrt(D/.0045)))/A;let S=(K+Math.sqrt(K*K+2*A*w))/A;for(let I=0;I<6;I++){const P=Math.exp(-S/k);S-=(w+k*(K+A*k)*(1-P)-A*k*S)/Math.min((K+A*k)*P-A*k,-.05)}c.push([L+S,D])}c.sort((i,e)=>e[1]-i[1]).slice(0,12).forEach(([i,e])=>v.sound.hit("click",Math.min(.14,.03+e*22)*o,{at:n+i}))},Co=t=>{const o=Math.hypot(t.v[0],t.v[1],t.v[2]),n=Math.sqrt(Math.pow(t.r/.08,1.5)*o/6),s=va(t.p[0],0,t.p[2],1,Math.min(1.5,Math.max(.5,.6+.4*n)),Math.atan2(t.v[0],t.v[2]),1.3+.7*n,Math.min(1.5,Math.max(.4,.25+.7*n)),0);t.p[1]=0,t.state=1,t.v=[t.v[0]*.1,-.4,t.v[2]*.1],t.wet=1,t.w=t.w.map(h=>h*.3);const c=Math.hypot(t.p[0]-d.x,t.p[2]-d.z),i=Math.max(.15,1-c/60),e=c/195;v.sound.hit("noise",.32*i,{cutoff:170,dur:.32,at:e}),v.sound.hit("noise",.06*i,{cutoff:2400,dur:.45,at:e+.03}),_o(s,i,e)},ua=t=>{const o=t.cut<1.5?!0:la(t.q,[0,1,0])[1]<0,n=la(t.q,[1,0,0]),s=Math.atan2(-n[2],n[0]);return Fo([0,Math.sin(s/2),0,Math.cos(s/2)],o?[1,0,0,0]:[0,0,0,1])},Lo=(t,o)=>{const s=(V(t.p[0]+.05,t.p[2])-V(t.p[0]-.05,t.p[2]))/.1,c=(V(t.p[0],t.p[2]+.05)-V(t.p[0],t.p[2]-.05))/(2*.05),i=Math.hypot(s,1,c),e=[-s/i,1/i,-c/i],h=t.v[0]*e[0]+t.v[1]*e[1]+t.v[2]*e[2],f=t.v.map((D,G)=>D-h*e[G]),r=Math.hypot(t.v[0],t.v[1],t.v[2]),x=o<.02+Ae*.3,g=Math.hypot(t.p[0]-d.x,t.p[2]-d.z),y=Math.max(.15,1-g/60),L=g/195;if(t.hops===0){const D=Math.min(1.3,Math.max(.4,r/7*t.r/.08));va(t.p[0],o,t.p[2],x?3:2,D,Math.atan2(f[0],f[2]),0,0,rt&&!x?1:0),x&&(t.wet=1)}if(v.sound.hit("noise",Math.min(.35,.05*r)*y,{cutoff:x?500:260,dur:.1,at:L}),!rt&&!x&&v.sound.hit("click",Math.min(.2,.03*r)*y,{at:L+.04+l()*.08}),!x&&-h>.8&&t.hops<3){const D=(rt?.13:.22)*(.8+.4*l());t.v=f.map((k,S)=>k*.6-h*D*e[S]);const G=e[1]*f[2]-e[2]*f[1],K=e[2]*f[0]-e[0]*f[2],w=e[0]*f[1]-e[1]*f[0];t.w=[G,K,w].map(k=>k/t.r*.5+(l()-.5)*6),t.hops++,t.state=5,t.p[1]=Math.max(t.p[1],o+t.ax[1]*.85)}else t.v=[f[0]*(x?.2:.5),0,f[2]*(x?.2:.5)],t.state=4,t.wash=x,t.qt=ua(t)};let E=null;const Po=t=>{const o=v.input,n=o.taps();if(o.down){E||(E={x0:o.x,y0:o.y,lx:o.x,ly:o.y,t:0,path:0,gust:!1,hold:!1,lh:null});const s=o.x-E.lx,c=o.y-E.ly;if(E.lx=o.x,E.ly=o.y,E.t+=t,E.path+=Math.hypot(s,c),E.path>.012&&!E.hold){const i=_e(o.x,o.y,120);if(!E.gust){E.gust=!0;const e=Nt(i.x,i.z);m.A<.04&&(m.tg=X,m.ug=Math.max(8,e[0]),m.far=m.ug,m.w=.95,m.ph=l()*U),B.x=i.x,B.z=i.z,v.sound.hit("noise",.18,{cutoff:380,dur:2.2})}if(E.lh){const e=(i.x-E.lh.x)/Math.max(t,.001),h=(i.z-E.lh.z)/Math.max(t,.001),f=Math.min(Math.hypot(e,h),30);m.A=Math.min(.42,m.A+t*(.05+f*.006)),m.w=Math.max(.5,m.w-t*.03);const r=m.w*m.w/A;m.kv=r*Math.max(-.4,Math.min(.4,e/(f+.001)*.4)),m.far=Math.max(m.far,Nt(i.x,i.z)[0]),Ut=[e/(f+.001)*.6,h/(f+.001)*.6],B.s=Math.min(1,B.s+t*2.5)}B.x+=(i.x-B.x)*Math.min(1,t*6),B.z+=(i.z-B.z)*Math.min(1,t*6),B.r=Math.max(7,Math.min(40,i.dist*.5)),E.lh=i,l()<t*1.5&&v.sound.hit("noise",.1,{cutoff:300,dur:1.6})}else if(E.t>.3&&!E.gust){if(!E.hold){if(E.hold=!0,b.s<.15){const i=_e(E.x0,E.y0,160),e=260+l()*120,h=Math.atan2(i.x-d.x,i.z-d.z);b.x=d.x+Math.sin(h)*e,b.z=d.z+Math.cos(h)*e;const f=h+Math.PI+(l()-.5)*.3;b.vx=Math.sin(f)*5.5,b.vz=Math.cos(f)*5.5,b.ang=Math.atan2(b.vx,-b.vz)}v.sound.hit("noise",.08,{cutoff:900,dur:3})}b.hold=!0}}else E?(E.path<=.012&&E.t<.3&&da(E.x0,E.y0),E=null):n.length&&da(n[0].x,n[0].y),b.hold=!1},Le=new Float32Array(8*4),pa=new Float32Array(7*4);let ma=0,Pe=!1,xa=0,wa=6+l()*8;const No=t=>{const o=t*Re,n=o*(2.51*o+.03)/(o*(2.43*o+.59)+.14);return Math.pow(Math.min(1,Math.max(0,n)),1/2.2)},Ne=[0,1,2].map(t=>No((Lt[t]*.55+Ct[t]*.45)*ot*1.15)),ya=()=>{H.fill(0),it.forEach((s,c)=>{H.set([s.x,s.y,s.z,s.t0],c*4),H.set([s.kind,s.amp,s.seed,s.hd],(32+c)*4),H.set([s.jv,s.ch,s.sand,0],(80+c)*4)}),It.forEach((s,c)=>{s.state!==3&&(H.set([s.p[0],s.p[1],s.p[2],Math.max(s.ax[0],s.ax[2])*1.05],(8+c)*4),H.set(s.q,(40+c)*4),H.set([s.ax[0],s.ax[1],s.ax[2],s.cut],(48+c)*4),H.set([s.tone,s.stain,s.wet,s.mode],(56+c)*4),H.set([s.M[0],s.M[1],s.M[2],s.n],(64+c)*4),H.set([s.gy,s.seed,s.mot,0],(72+c)*4))}),oe.forEach((s,c)=>H.set(s,(16+c)*4)),H.set([m.w,m.A,m.kv,m.ph],20*4),H.set([.5*Math.sqrt(A/(m.w*m.w/A)),m.tg,m.ug,m.far],24*4),H.set([b.x,b.z,b.ang,b.s],25*4),H.set([B.x,B.z,B.r,B.s],26*4),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,C.tT),a.texSubImage2D(a.TEXTURE_2D,0,0,0,8,11,a.RGBA,a.FLOAT,H),De(),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,R,R),a.useProgram(j.comp.p),ie(j.comp),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,p.tG),a.activeTexture(a.TEXTURE3),a.bindTexture(a.TEXTURE_2D,p.tE),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,C.tT);const t=(Ae+m.A*1.2*1.15)*.65;Le.set([d.yaw,d.pitch,Dt,X,d.x,d.eye,d.z,R,Re,Fe?0:-1,0,Pt*.5,vo,t,Math.min(it.length,6),X*37.17%113,M.x,M.k,M.xp,M.rw]);for(let s=0;s<3;s++)Le.set([M.m[s][0],Math.max(0,X-M.m[s][1]),M.m[s][2],0],20+s*4);a.uniform4fv(j.comp.uF,Le),a.drawArrays(a.TRIANGLES,0,3);const o=Math.min(3,Pt+b.s*3.5*Math.exp(-Math.pow(de()/60,2))),n=Math.round(o*130*(Fe?1:.6));a.useProgram(j.drop.p),a.activeTexture(a.TEXTURE2),a.bindTexture(a.TEXTURE_2D,p.tG),a.activeTexture(a.TEXTURE4),a.bindTexture(a.TEXTURE_2D,C.tT),pa.set([d.yaw,d.pitch,Dt,X,d.x,d.eye,d.z,R,n,ce,Ut[0],Ut[1],Ne[0],Ne[1],Ne[2],ce,4.5,0,.75,sa,0,0,0,Math.min(1,b.s*Math.exp(-Math.pow(de()/50,2))),Re,0,0,0]),a.uniform4fv(j.drop.uD,pa),a.uniform4fv(j.drop.uS,se),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.drawArraysInstanced(a.TRIANGLES,0,6,n+256),a.disable(a.BLEND)},de=()=>{if(b.s<=.001)return 1e4;const t=[Math.cos(b.ang),Math.sin(b.ang)],o=d.x-b.x,n=d.z-b.z;return Math.abs(-t[1]*o+t[0]*n)},M={x:0,v:0,xp:0,k:0,up:!1,t:-40,rw:Pt*.12,m:[[-99,-99,0],[-99,-99,0],[-99,-99,0]]},Go=(t,o)=>{let n=ga(.5,o,t);if(m.A>.001){const s=m.w*m.w/A,c=zt(0,12,.5*Math.sqrt(A/s)*(t-m.tg)-(m.ug-.5));n+=m.A*c*Math.cos(2*m.w*Math.sqrt(.5/(A*at))+m.kv*o+m.w*t+m.ph)}return n},ba=t=>{const o=.03333333333333333,n=Nt(d.x,d.z)[1];for(;M.t+o<=t;){M.t+=o;const s=Go(M.t,n)/at*.9,c=(s-M.xp)/o;M.xp=s,s>=M.x?(!M.up&&c>0&&(M.k++,M.up=!0),M.x=s,M.v=Math.max(c*1.3,0)):(M.v-=(A*at+.15*M.v*Math.abs(M.v))*o,M.x+=M.v*o,M.up&&M.v<=0&&(M.m.unshift([M.x,M.t,M.k]),M.m.length=3,M.up=!1),M.x<s&&(M.x=s,M.v=Math.max(c,0)))}},ga=(t,o,n)=>{let s=0;for(const c of oe){const i=c[0],e=i*i/A,h=1/(at*e),f=Math.max(t,0),r=f<h?2*i*Math.sqrt(f/(A*at)):2/at+e*(f-h),x=c[1]*Math.min(1.2,Math.max(1,Math.pow(h/(f+1),.25))),g=.1+.15*(1-zt(0,h,f)),y=r+c[2]*o+i*n+c[3];s+=x*(Math.cos(y)+g*Math.cos(2*y))}return s};ba(0),ya();const za=(t,o)=>{o=Math.min(Math.max(o||0,0),.1),X+=o,ra(),ba(X);{const e=Math.min(1,b.s*1.3*Math.exp(-Math.pow(de()/45,2))+Pt*.12);M.rw+=(e-M.rw)*Math.min(1,o*(e>M.rw?.35:.025))}p.view!==[d.yaw,d.pitch,d.x,d.z,d.eye].join()&&ia(),Po(o);for(const e of It)if(e.state!==3){if(e.pp[0]=e.p[0],e.pp[1]=e.p[1],e.pp[2]=e.p[2],e.state===0||e.state===5){const h=Math.max(1,Math.ceil(o*120)),f=o/h;for(let r=0;r<h&&(e.state===0||e.state===5);r++){const x=Math.hypot(e.v[0],e.v[1],e.v[2]);e.v[0]-=e.kd*x*e.v[0]*f,e.v[1]-=(A+e.kd*x*e.v[1])*f,e.v[2]-=e.kd*x*e.v[2]*f;for(let y=0;y<3;y++)e.p[y]+=e.v[y]*f;const g=V(e.p[0],e.p[2]);g<0?e.p[1]<=0&&e.v[1]<0&&Co(e):e.p[1]<=g+e.ax[1]*.85&&e.v[1]<0&&Lo(e,g)}}else if(e.state===4){const h=Math.hypot(e.v[0],e.v[2]),f=h>1e-4?Math.max(0,h-(e.wash?3:1.3)*o)/h:0;e.v[0]*=f,e.v[2]*=f,e.p[0]+=e.v[0]*o,e.p[2]+=e.v[2]*o;const r=V(e.p[0],e.p[2]);if(r<0)e.state=1,e.v=[e.v[0],-.2,e.v[2]],e.wet=1;else{e.gy=r;const x=r+(e.cut<1.5?e.cut:1)*e.ax[1]*(rt?.78:.92);e.p[1]+=(x-e.p[1])*Math.min(1,o*6);let g=e.qt;g[0]*e.q[0]+g[1]*e.q[1]+g[2]*e.q[2]+g[3]*e.q[3]<0&&(g=g.map(y=>-y)),e.q=le(e.q.map((y,L)=>y+(g[L]-y)*Math.min(1,o*4))),h<.02&&Math.abs(x-e.p[1])<.003&&(e.state=2,e.q=g)}}else if(e.state===1){const h=V(e.p[0],e.p[2])+e.ax[1];e.v[1]+=(-.69-e.v[1]*1.6)*o,e.p[1]+=e.v[1]*o,e.p[0]+=e.v[0]*o,e.p[2]+=e.v[2]*o,e.v[0]*=.97,e.v[2]*=.97,e.w=e.w.map(f=>f*Math.exp(-o*1.5)),e.p[1]<=h&&(e.p[1]=h,e.state=h<-.6?3:2,e.w=[0,0,0],e.qt=ua(e))}if(e.state===2&&e.qt){let h=e.qt;h[0]*e.q[0]+h[1]*e.q[1]+h[2]*e.q[2]+h[3]*e.q[3]<0&&(h=h.map(f=>-f)),e.q=le(e.q.map((f,r)=>f+(h[r]-f)*Math.min(1,o*2)))}if(e.state===0||e.state===5||e.state===1){const[h,f,r]=e.w,[x,g,y,L]=e.q,D=o*.5;e.q=le([x+D*(h*L+f*y-r*g),g+D*(-h*y+f*L+r*x),y+D*(h*g-f*x+r*L),L-D*(h*x+f*g+r*y)])}e.M=[0,1,2].map(h=>(e.p[h]-e.pp[h])*.25),e.n=Math.min(8,Math.max(1,Math.ceil(Math.hypot(e.M[0],e.M[1],e.M[2])/(e.ax[1]*.3)))),e.mode=(e.state===0||e.state===5)&&e.p[1]>0&&V(e.p[0],e.p[2])<0?1:(e.state===2||e.state===4)&&e.p[1]>-.005?2:0,e.state!==1&&e.p[1]>-.005&&(e.wet=Math.max(0,e.wet-o/150))}for(let e=it.length-1;e>=0;e--)X-it[e].t0>40&&it.splice(e,1);if(E&&E.gust||(m.A*=Math.exp(-o/30),B.s*=Math.exp(-o*.22)),B.x+=Ut[0]*o*3,B.z+=Ut[1]*o*3,O&&X>wa&&(wa=X+14+l()*10,m.A<.04&&(m.tg=X,m.ug=30+l()*30,m.far=m.ug+20,m.w=.7,m.ph=l()*U),m.A=Math.min(.3,m.A+.12)),b.x+=b.vx*o,b.z+=b.vz*o,b.s=b.hold?Math.min(1,b.s+o*.5):b.s*Math.exp(-o/45),O&&b.s<.05&&!b.hold&&X>3&&l()<o*.04){const e=d.yaw+(l()-.5)*2;b.x=d.x+Math.sin(e)*260,b.z=d.z+Math.cos(e)*260;const h=e+2.2;b.vx=Math.sin(h)*8,b.vz=Math.cos(h)*8,b.ang=Math.atan2(b.vx,-b.vz),b.s=.7}const n=Nt(d.x,d.z)[1],s=ga(.3,n,X),c=s>ma;if(c&&!Pe&&s<0&&v.sound.hit("noise",Math.min(.25,.05+Ae*.6),{cutoff:520,dur:1.6}),!c&&Pe&&!we)for(let e=0;e<6;e++)v.sound.hit("click",.04+l()*.05,{at:.4+e*.22+l()*.15});Pe=c,ma=s;const i=Pt+b.s*3*Math.exp(-Math.pow(de()/60,2));i>.01&&X>xa&&(xa=X+(.12+l()*.4)/i,v.sound.hit("click",.03+l()*.04));for(let e=he.length-1;e>=0;e--)X>=he[e].at&&(he[e].f(),he.splice(e,1));ya()};{const t={K:C,gl:a,own:()=>p};C.users.add(t),He&&He.register(za,t)}return za}})})()})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
