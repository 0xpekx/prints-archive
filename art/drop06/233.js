// Striker Board: from /home/fleet/code/worlds-overnight-prints/lab/drop/pieces/233.js (import-lab-drop.mjs), wrapped to get the runtime as Proto, minified
(function(To){To&&To.add({num:233,name:"Striker Board",fam:"Worlds",recipe:"A worn carrom board under a single hanging bulb, where the flat wooden coins and the heavy striker really slide, spin, crash and drop into the pockets. A patient opponent takes turns with you. The wood, the coins and the state of the game change every mint. Press where you want to hit, drag back and let go to flick the striker, or tap the board to slide it along your line.",interactive:"Press where you want to strike, drag back and let go to flick the striker through that spot; tap the board to slide it along your line.",music:!0,gl:!0,fps:30,seed:0,make(g){const e=g.gl,K=g.size;let de=2166136261;for(let t=2;t<g.hash.length;t++)de=Math.imul(de^g.hash.charCodeAt(t),16777619)>>>0;const T=()=>{de=de+1831565813|0;let t=Math.imul(de^de>>>15,1|de);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},pe=(t,a,o)=>{let i=T(),r=0;if(g.home&&o)return g.trait(t,o),o;for(const c of a)r+=c[1];i*=r;for(const c of a)if(i-=c[1],i<=0)return g.trait(t,c[0]),c[0];const n=a[a.length-1][0];return g.trait(t,n),n},Q=()=>(T()+T()+T()+T()-2)*.87,Eo=pe("Board",[["Birch",48],["Teak",24],["Satinwood",20],["Rosewood inlay",8]],"Birch"),Ro=pe("Coins",[["Boxwood and ebony",48],["Bone and rosewood",26],["Lacquered",20],["Odd set",6]],"Boxwood and ebony"),qt=pe("Striker",[["Ivory white",50],["Turned wood",28],["Grey stone",15],["Old bakelite",7]],"Ivory white"),Nt=pe("Powder",[["Light dusting",48],["Heavy",30],["Fresh drift",16],["Damp",6]],"Light dusting"),Ke=pe("Lamp",[["Bare bulb",46],["Enamel shade",28],["Tin cone",20],["Low and swinging",6]],"Bare bulb"),dt=pe("View",[["Striker's eye",48],["Leaning in",30],["Across the corner",22]],"Striker's eye"),qe=pe("Game",[["Fresh rack",46],["Mid game",36],["Endgame",18]],"Fresh rack"),Qo=pe("Wear",[["Played",50],["Well loved",34],["Ancient",16]],"Well loved");let Te=2654435769;for(let t=2;t<g.hash.length;t++)Te=Math.imul(Te^g.hash.charCodeAt(t),2246822507)>>>0;const q=()=>{Te=Te+1831565813|0;let t=Math.imul(Te^Te>>>15,1|Te);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Yo=(()=>{const t=q(),a=g.home||t<.44?"Limewash":t<.68?"Green distemper":t<.88?"Ochre":"Indigo wash";return g.trait("Wall",a),a})(),ae=g.home||q()<.5?1:-1;let Ee=625341585;for(let t=2;t<g.hash.length;t++)Ee=Math.imul(Ee^g.hash.charCodeAt(t),668265263)>>>0;const Bt=()=>{Ee=Ee+1831565813|0;let t=Math.imul(Ee^Ee>>>15,1|Ee);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296},Wo=g.home?0:(Bt()-.5)*9,jo=g.home?0:(Bt()-.5)*2.4,Zo=g.home||Bt()<.5,C=37,Mo=2.25,Re=34.75,Z=25.26,F=23.2,ut=981,ht=1.59,$o=.8,It={"Ivory white":[2.06,.72,15],"Turned wood":[2.1,.78,11],"Grey stone":[2,.7,22],"Old bakelite":[2.06,.74,16]}[qt],Lo={"Light dusting":.15,Heavy:.125,"Fresh drift":.105,Damp:.21}[Nt],Jo={"Light dusting":1.15,Heavy:1.8,"Fresh drift":1.5,Damp:1.3}[Nt],Ct={Played:.45,"Well loved":.72,Ancient:1}[Qo],zo=.86,mt=.62,ea=.1,vt=.16,x=20,s=19,xt=18,d=new Float64Array(x),h=new Float64Array(x),D=new Float64Array(x),_=new Float64Array(x),N=new Float64Array(x),Qe=new Float64Array(x),$=new Float64Array(x),pt=new Float64Array(x),Ye=new Float64Array(x),We=new Float64Array(x),y=new Int8Array(x),J=new Int8Array(x),B=new Float64Array(x),ce=new Float64Array(x),Xt=new Float64Array(x),bt=new Float64Array(x);for(let t=0;t<x;t++)J[t]=t<9?0:t<18?1:t===xt?2:3,B[t]=t===s?It[0]:ht,Xt[t]=t===s?It[1]:$o*(.96+.08*T()),ce[t]=t===s?It[2]:5.5,bt[t]=T(),Qe[t]=T()*6.283;Ro==="Odd set"&&(J[2+(T()*6|0)]=4,J[10+(T()*6|0)]=5);const je=[];{for(let t=0;t<5;t++){const a=t*1.2566+.3;je.push(Math.cos(a)*.45,Math.sin(a)*.45)}for(let t=0;t<9;t++){const a=t*.6981;je.push(Math.cos(a)*.85,Math.sin(a)*.85)}}const gt=je.length/2,Vt=t=>{const a=(r,n,c)=>{d[r]=n+Q()*.015,h[r]=c+Q()*.015,D[r]=_[r]=N[r]=0,$[r]=0,y[r]=0};a(xt,0,0);let o=0,i=9;for(let r=0;r<6;r++){const n=t+r*Math.PI/3,c=2*ht+.01;r%2===0?a(o++,Math.cos(n)*c,Math.sin(n)*c):a(i++,Math.cos(n)*c,Math.sin(n)*c)}for(let r=0;r<6;r++){const n=t+r*Math.PI/3,c=4*ht+.02;r%2===1?a(o++,Math.cos(n)*c,Math.sin(n)*c):a(i++,Math.cos(n)*c,Math.sin(n)*c)}for(let r=0;r<6;r++){const n=t+r*Math.PI/3+Math.PI/6,c=2*Math.sqrt(3)*ht+.02;r%2===0?a(o++,Math.cos(n)*c,Math.sin(n)*c):a(i++,Math.cos(n)*c,Math.sin(n)*c)}};let Me=0,Le=0,ze=0,yt=0;const Ae=[],Ze=(t,a,o,i,r,n)=>{const c=B[t],f=1/ce[t],u=2/(ce[t]*c*c),m=-i,l=o;let p=-(D[t]+N[t]*c*m),b=-(_[t]+N[t]*c*l),v=0,R=0,w=0;a>=0&&(w=B[a],v=1/ce[a],R=2/(ce[a]*w*w),p+=D[a]-N[a]*w*m,b+=_[a]-N[a]*w*l);const L=p*o+b*i;if(L>=0)return 0;const A=-(1+r)*L/(f+v),V=p*m+b*l,W=f+v+c*c*u+w*w*R;let S=-V/W;const j=n*A;S>j?S=j:S<-j&&(S=-j);const fe=A*o+S*m,xe=A*i+S*l;return D[t]-=fe*f,_[t]-=xe*f,N[t]-=S*c*u,a>=0&&(D[a]+=fe*v,_[a]+=xe*v,N[a]-=S*w*R),A},Ao=-2.6,Ht=t=>{if(y[t]=2,t===s){$[t]=-100;return}let a=0;for(let r=0;r<19;r++)r!==t&&y[r]===2&&Math.abs(d[r]-Ye[t])<2&&Math.abs(h[r]-We[t])<2&&a++;const o=bt[t]*6.283,i=.45*Math.min(1,a*.5);d[t]=Ye[t]+Math.cos(o)*i,h[t]=We[t]+Math.sin(o)*i,$[t]=Ao+a*Xt[t]*.9},Po=t=>{const a=Lo*ut;for(let o=0;o<x;o++){if(y[o]===1){pt[o]+=ut*t,$[o]-=pt[o]*t;const l=Math.min(1,14*t);d[o]+=(Ye[o]-d[o])*l,h[o]+=(We[o]-h[o])*l,Qe[o]+=N[o]*t,$[o]<Ao+.05&&Ht(o);continue}if(y[o]!==0)continue;const i=D[o],r=_[o],n=N[o],c=B[o];if(i*i+r*r+n*n*c*c<.04){D[o]=_[o]=N[o]=0;continue}let f=0,u=0,m=0;for(let l=0;l<gt;l++){const p=je[2*l]*c,b=je[2*l+1]*c,v=i-n*b,R=r+n*p,w=1/Math.sqrt(v*v+R*R+.25),L=-v*w,A=-R*w;f+=L,u+=A,m+=p*A-b*L}D[o]+=f/gt*a*t,_[o]+=u/gt*a*t,N[o]+=m/gt*a*2/(c*c)*t,d[o]+=D[o]*t,h[o]+=_[o]*t,Qe[o]+=N[o]*t}for(let o=0;o<x;o++){if(y[o]!==0)continue;for(let f=o+1;f<x;f++){if(y[f]!==0||D[o]===0&&_[o]===0&&D[f]===0&&_[f]===0)continue;const u=d[f]-d[o],m=h[f]-h[o],l=B[o]+B[f],p=u*u+m*m;if(p>=l*l||p<1e-9)continue;const b=Math.sqrt(p),v=u/b,R=m/b,w=l-b,L=ce[f]/(ce[o]+ce[f]);d[o]-=v*w*L,h[o]-=R*w*L,d[f]+=v*w*(1-L),h[f]+=R*w*(1-L);const A=Ze(o,f,v,R,zo,ea);A>Me&&(Me=A)}const i=B[o];let r=0;d[o]-i<-C&&(d[o]=-C+i,r=Math.max(r,Ze(o,-1,-1,0,mt,vt))),d[o]+i>C&&(d[o]=C-i,r=Math.max(r,Ze(o,-1,1,0,mt,vt))),h[o]-i<-C&&(h[o]=-C+i,r=Math.max(r,Ze(o,-1,0,-1,mt,vt))),h[o]+i>C&&(h[o]=C-i,r=Math.max(r,Ze(o,-1,0,1,mt,vt))),r>Le&&(Le=r);const n=Math.abs(d[o])-Re,c=Math.abs(h[o])-Re;if(n*n+c*c<Mo*Mo*.96){y[o]=1,pt[o]=0,Ye[o]=Math.sign(d[o])*Re,We[o]=Math.sign(h[o])*Re,Ae.push(o);const f=Math.hypot(D[o],_[o]);f+20>ze&&(ze=f+20,yt=d[o])}}},ko=()=>{for(let t=0;t<x;t++)if(y[t]===1||y[t]===0&&(D[t]*D[t]+_[t]*_[t]>.04||Math.abs(N[t])>.05))return!0;return!1},ue=t=>t===0?1:-1,Fo=(t,a,o,i,r,n,c)=>{const f=o-t,u=i-a,m=f*f+u*u||1e-6;for(let l=0;l<x;l++){if(l===n||l===c||l===s||y[l]!==0)continue;let p=((d[l]-t)*f+(h[l]-a)*u)/m;p=p<0?0:p>1?1:p;const b=t+f*p-d[l],v=a+u*p-h[l];if(b*b+v*v<(r+B[l])*(r+B[l]))return!1}return!0},be=(t,a)=>{const o=Z*ue(a);for(let i=0;i<x;i++)if(!(i===s||y[i]!==0)&&Math.hypot(d[i]-t,h[i]-o)<B[s]+B[i]+.05)return!1;return!0},wt=(t,a)=>{const o=Z*ue(t),i=B[s],r=ce[s],n=Lo*ut;let c=null;const f=t===0?[0,9]:[9,18],u=[];for(let m=0;m<11;m++)u.push(be(-F+2*F*m/10,t));for(let m=0;m<2&&!c;m++)for(let l=0;l<19;l++){if(y[l]!==0)continue;const p=l>=f[0]&&l<f[1]||J[l]===4&&t===0||J[l]===5&&t===1;if(!(m===0&&a&&!p&&l!==xt))for(let b=0;b<4;b++){const v=(b&1?1:-1)*Re,R=(b&2?1:-1)*Re,w=v-d[l],L=R-h[l],A=Math.hypot(w,L),V=w/A,W=L/A,S=d[l]-V*(i+B[l]),j=h[l]-W*(i+B[l]);if(!(Math.abs(S)>C-i||Math.abs(j)>C-i))for(let fe=0;fe<11;fe++){const xe=-F+2*F*fe/10;if(!u[fe])continue;const G=S-xe,H=j-o,De=Math.hypot(G,H),ft=G/De,_e=H/De;if(_e*ue(t)>-.12)continue;const Oe=ft*V+_e*W;if(Oe<.3||!Fo(xe,o,S,j,i*.98,l,-1)||!Fo(d[l],h[l],v,R,B[l]*.98,l,-1))continue;const Ge=(1-Oe)*2.2+De/90+A/70+(p?0:.8);if(!c||Ge<c.sc){const Ut=Math.sqrt(2*n*A+1225)*1.12,Ue=Ut/((1+zo)*r/(r+ce[l])*Oe);c={sc:Ge,sx:xe,ang:Math.atan2(_e,ft),v:Math.min(560,Math.sqrt(Ue*Ue+2*n*De))}}}}}if(!c){let m=0,l=0,p=0;for(let v=0;v<19;v++)y[v]===0&&(m+=d[v],l+=h[v],p++);p?(m/=p,l/=p):l=-o;let b=Math.max(-F,Math.min(F,m+Q()*6));for(let v=0;v<8&&!be(b,t);v++)b=Math.max(-F,Math.min(F,b+(v%2?4:-4)*(v+1)));c={sc:9,sx:b,ang:Math.atan2(l-o,m-b),v:330+60*T()}}return c},Tt=t=>{const a=Z*ue(t),o=(T()-.5)*10;return{sx:o,ang:Math.atan2(-a+Q()*.3,-o),v:470+50*T()}},re=new Float32Array(4096*8);let se=0;const So=(t,a,o,i,r,n,c)=>{if(se>=4096)return;const f=se*8;re[f]=t,re[f+1]=a,re[f+2]=o,re[f+3]=i,re[f+4]=r,re[f+5]=n,re[f+6]=c,re[f+7]=0,se++},Ot=new Float64Array(x),Gt=new Float64Array(x),he=()=>{for(let t=0;t<x;t++)Ot[t]=d[t],Gt[t]=h[t]},Kt=t=>{for(let a=0;a<x;a++){if(y[a]>=2)continue;const o=d[a]-Ot[a],i=h[a]-Gt[a];o*o+i*i>1e-4&&So(Ot[a],Gt[a],d[a],h[a],B[a],bt[a],y[a]===0?t:t*.5)}he()},Do=`#version 300 es
precision highp float;
precision highp int;
`,P=e.__c233||(e.__c233={}),_o=(t,a)=>{const o=e.createShader(t);return e.shaderSource(o,a),e.compileShader(o),o},ge="out vec2 vUV; void main(){ vec2 p=vec2(float((gl_VertexID&1)*4-1),float((gl_VertexID&2)*2-1)); vUV=p*.5+.5; gl_Position=vec4(p,0,1); }",ta=`layout(std140) uniform C { vec4 uCam; vec4 uCR; vec4 uCU; vec4 uCF; vec4 uL; vec4 uLc; vec4 uP; vec4 uSh; vec4 uFr; vec4 uML; vec4 uMD; vec4 uQ; vec4 uSk; vec4 uRm; vec4 uX; vec4 uG; vec4 uD[20]; vec4 uE[20]; };
`,oa=`in vec2 vUV; out vec4 o;
float h(vec2 p,float per,float s){ uvec2 q=uvec2(mod(p,per)); uint n=q.x*1973u+q.y*9277u+uint(s)*26699u; n=(n<<13u)^n; n=n*(n*n*15731u+789221u)+1376312589u; return float(n&0x7fffffffu)/2147483647.; }
float vn(vec2 uv,float per,float s){ vec2 i=floor(uv),f=uv-i; f=f*f*(3.-2.*f);
  return mix(mix(h(i,per,s),h(i+vec2(1,0),per,s),f.x),mix(h(i+vec2(0,1),per,s),h(i+vec2(1,1),per,s),f.x),f.y); }
void main(){ vec4 r=vec4(0); for(int c=0;c<4;c++){ float per=c<2?8.:32.,amp=.5,n=0.,s=float(c)*7.+1.; int oc=c<2?5:3;
  for(int i=0;i<oc;i++){ n+=amp*vn(vUV*per,per,s+float(i)*3.); per*=2.; amp*=.5; } r[c]=clamp(.5+(n-.48)*1.6,0.,1.); } o=r; }`,aa=`in vec2 vUV; out vec4 o;
uniform sampler2D uN; uniform sampler2D uDt; uniform vec4 uK; uniform vec4 uS; uniform vec4 uArc[8]; uniform vec4 uTx; // uTx.y is always 0: it bounds the loops so they stay rolled (faster compile)
const float A=37.,PCC=34.75,RP=2.25;
float nz(vec2 p,int ch){ vec4 t=texture(uN,p); return ch==0?t.r:ch==1?t.g:ch==2?t.b:t.a; }
float hsh(vec2 p){ p=fract(p*vec2(.1031,.1030)); p+=dot(p,p.yx+33.33); return fract((p.x+p.y)*p.x); }
float sdSeg(vec2 p,vec2 a,vec2 b){ vec2 pa=p-a,ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h); }
// ink ornament: x = line coverage, y = red fill
vec2 marks(vec2 p){
  float th=uK.x>2.5?.16:.1, dmin=1e3, red=0., blk=0.;
  for(int s=0;s<4+int(uTx.y);s++){
    vec2 q=s==0?p:s==1?vec2(-p.y,p.x):s==2?-p:vec2(p.y,-p.x);
    float v=A-q.y, u=q.x;
    float du=max(abs(u)-23.5,0.);
    // base lines: a heavy outer rule and a fine inner one, closed by a red-filled circle at each end
    dmin=min(dmin,length(vec2(du,v-10.15))-.28); dmin=min(dmin,length(vec2(du,v-13.33))-th);
    float dc=length(vec2(abs(u)-23.5,v-11.74));
    dmin=min(dmin,abs(dc-1.59)-.1); red=max(red,1.-smoothstep(1.26,1.34,dc));
    // diagonal from this corner toward the centre: a rule with a ring, a leaf and two sweeping arcs
    vec2 dg=vec2(.70710678); vec2 pc=vec2(PCC);
    float a0=RP+3.2, a1=a0+24.;
    vec2 e0=pc-dg*a0, e1=pc-dg*a1;
    dmin=min(dmin,sdSeg(q,e0,e1)-th*1.2);
    dmin=min(dmin,abs(length(q-e0)-.42)-th);
    vec2 lq=q-(e1-dg*1.3); float al=dot(lq,-dg), pr=dot(lq,vec2(-dg.y,dg.x));
    float lf=abs(pr)-.55*sqrt(max(0.,1.-al*al/1.69)); if(abs(al)<1.3){ dmin=min(dmin,abs(lf)-th); blk=max(blk,step(lf,0.)); }
    vec2 aq=q-(e1+dg*5.5); float ar=length(aq); if(dot(aq,dg)<-ar*.25) dmin=min(dmin,abs(ar-3.2)-th);
    // small ticks beside the baseline ends
    dmin=min(dmin,sdSeg(q,vec2(25.6,A-11.74),vec2(27.6,A-11.74))-th);
  }
  float r=length(p), ph0=atan(p.y/max(abs(p.x),1e-4)), ph=p.x<0.?(p.y<0.?-3.14159:3.14159)-ph0:ph0;
  dmin=min(dmin,abs(r-8.5)-.13); dmin=min(dmin,abs(r-7.95)-th); dmin=min(dmin,abs(r-1.59)-.1);
  red=max(red,(1.-smoothstep(1.24,1.32,r)));
  // an eight-pointed star between the rings: four long red points, four shorter black ones
  float k=floor((ph-.3927)/.7854+.5), dph=ph-.3927-k*.7854, odd=mod(k,2.);
  float len=odd>.5?4.4:5.6, hw=(odd>.5?.3:.36)*(1.-clamp((r-2.)/len,0.,1.))*2.2/max(r,2.);
  float ds=(abs(dph)-hw)*r;
  if(r>2.&&r<2.+len){ dmin=min(dmin,abs(ds)-th); if(ds<0.){ if(odd>.5) blk=max(blk,.8); else red=max(red,1.); } }
  // dots between the points
  float k2=floor(ph/.7854+.5), dph2=ph-k2*.7854; dmin=min(dmin,length(vec2(r-6.7,dph2*r))-.2);
  float ink=max(1.-smoothstep(-.035,.035,dmin),blk);
  return vec2(ink,red*(uK.x>2.5?0.:1.));
}
vec2 wearMask(vec2 p){
  float w=0.;
  for(int s=0;s<4+int(uTx.y);s++){ vec2 q=s==0?p:s==1?vec2(-p.y,p.x):s==2?-p:vec2(p.y,-p.x); float v=A-q.y;
    w=max(w,exp(-pow((v-7.5)/3.5,2.))*smoothstep(24.,12.,abs(q.x))*(s==0?1.:s==2?.9:.55)); }
  float n=nz(p*.011+uS.xy,0), n2=nz(p*.05+uS.zw,2);
  float ov=exp(-dot(p,p*vec2(1.,1.25))/420.)*(.75+.5*n);
  return clamp(vec2(w*(.6+.8*n)*(.7+.6*n2),ov)*uK.y,0.,1.);
}
float scratches(vec2 p){
  float s=0.;
  for(int L=0;L<3+int(uTx.y);L++){ float cs=5.+float(L)*2.; vec2 cp=p/cs+float(L)*7.31; vec2 ci=floor(cp);
    for(int j=0;j<9+int(uTx.y);j++){ vec2 cc=ci+vec2(float(j%3-1),float(j/3-1)); float r1=hsh(cc+uS.xy*31.),r2=hsh(cc*1.7+3.1),r3=hsh(cc*2.3+9.7);
      if(r3>.75+.2*(1.-uK.y)) continue;
      vec2 c0=(cc+vec2(r1,r2))*cs-float(L)*7.31*cs; float an=r1*9.+r2*3.; vec2 dir=vec2(cos(an),sin(an)); float ln=.6+r3*3.5;
      float d=sdSeg(p,c0-dir*ln*.5,c0+dir*ln*.5);
      s=max(s,(1.-smoothstep(.0,.03,d))*(.2+.5*r2)); }
  }
  return s*smoothstep(.9,1.,uK.y); // only an ancient board keeps a few hairlines
}
vec2 height(vec2 p){
  // sanded dead flat and lacquered: only a faint wide undulation, no ridged grain, scratches as hairlines
  float g=nz(vec2(p.x*.006,p.y*.03)+uS.yx,2);
  float op=nz(p*.37+uS.zw,3);
  float sc=scratches(p);
  return vec2(g*.012+op*.0015-sc*.004,sc);
}
void main(){
  vec2 p=(vUV-.5)*2.*A;
  if(uK.z<.5){
    // wood
    vec2 wq=p; wq.y+=5.*(nz(p*vec2(.006,.02)+uS.xy,0)-.5);
    float fig=nz(vec2(wq.x*.0035,wq.y*.03)+uS.zw,1), fine=nz(vec2(wq.x*.008,wq.y*.22)+uS.xy,2), pore=nz(p*vec2(.03,.6),3);
    // rotary-cut ply: honey birch, red-brown teak, greenish-gold satinwood with a ribbon figure
    vec3 base,base2; float gc;
    if(uK.x<.5||uK.x>2.5){ base=vec3(.80,.56,.27); base2=vec3(.86,.66,.36); gc=.16; }
    else if(uK.x<1.5){ base=vec3(.42,.19,.085); base2=vec3(.52,.25,.11); gc=.3; }
    else { base=vec3(.66,.58,.25); base2=vec3(.78,.66,.30); gc=.18; }
    float ring=nz(vec2(wq.x*.0015,wq.y*.06+fig*.4)+uS.yx,1);
    vec3 col=mix(base,base2,smoothstep(.3,.75,fig))*(1.-gc*.3+gc*.6*fig)*(.95+.07*fine)*(.98+.04*pore)*(.94+.1*smoothstep(.35,.65,ring));
    if(uK.x>1.5&&uK.x<2.5) col*=.82+.32*smoothstep(.35,.65,sin(wq.y*.9+fig*5.)*.5+.5);
    // rosewood inlay: a dark purple-brown border round the pale field
    if(uK.x>2.5){ float vb=A-max(abs(p.x),abs(p.y)); float bd=smoothstep(5.6,5.4,vb)*step(.6,vb); col=mix(col,vec3(.16,.055,.05)*(.8+.4*fine),bd); col=mix(col,vec3(.75,.6,.35),smoothstep(.12,0.,abs(vb-5.75))); }
    // amber varnish ageing toward the edges
    float v=A-max(abs(p.x),abs(p.y));
    col*=mix(vec3(.82,.72,.6),vec3(1),smoothstep(0.,9.,v));
    col*=.72+.28*smoothstep(0.,1.8,v);
    vec2 wv=wearMask(p); float wm=wv.x;
    col*=1.-.16*wm;                                      // hand patches: darkened and polished
    col=mix(col,col*vec3(1.06,1.05,1.02)+vec3(.04,.035,.03),wv.y*.5); // the slide-worn middle: paler and matt
    // ink
    vec2 mk=marks(p+vec2(nz(p*.4,2)-.5,nz(p*.4+.5,3)-.5)*.05);
    float inkFade=1.-wm*.34*(.5+nz(p*.3,3));
    vec3 inkC=uK.x>2.5?vec3(.16,.06,.03)*(.8+.4*nz(vec2(p.x+p.y,p.x-p.y)*.3,2)):vec3(.045,.035,.03);
    col=mix(col,vec3(.42,.06,.04)*(.85+.3*nz(p*.5,2)),mk.y*inkFade*.9);
    col=mix(col,inkC,mk.x*mix(inkFade,1.,step(2.5,uK.x)));
    // grime ring round pockets
    vec2 pq=abs(p)-vec2(PCC); float dp=length(pq);
    col*=1.-.55*exp(-pow(max(dp-RP,0.)/.9,1.5))*step(RP,dp);
    float sc=texture(uDt,vUV).a;
    col=mix(col,col*.9+vec3(.05,.045,.04),sc*.5);
    float gloss=.95+.05*wm-.5*wv.y-.2*sc-.08*nz(p*.08,3);
    if(uK.x>2.5) gloss=max(gloss,mk.x*.75);
    o=vec4(col,clamp(gloss,0.,1.));
  } else {
    float e=uTx.x; vec3 hh; float sc=0.;
    for(int k=0;k<3+int(uTx.y);k++){ vec2 off=k==0?vec2(0):k==1?vec2(e,0):vec2(0,e); vec2 r=height(p+off); hh[k]=r.x; if(k==0) sc=r.y; }
    vec2 gr=vec2(hh.y-hh.x,hh.z-hh.x)/e;
    // powder: thin general dusting, drifts on the cushions, palm sweeps with finger striations
    float v=A-max(abs(p.x),abs(p.y));
    float n0=nz(p*.03+uS.yx,0), n1=nz(p*.011+uS.xy,1);
    float P=.3+.3*n0+.45*smoothstep(.55,.85,n1);
    P+=1.4*exp(-v/1.2)+.45*exp(-v/4.);
    { vec2 pq=abs(p)-vec2(PCC); float dp=length(pq); P+=.8*exp(-max(dp-RP,0.)/2.)*step(RP,dp); }
    for(int k=0;k<8+int(uTx.y);k++){ vec4 ac=uArc[k]; vec2 d2=p-ac.xy; float rr=length(d2), d=rr-ac.z;
      float band=1.-smoothstep(3.2,4.4,abs(d));
      float str=.5+.5*sin(d*7.3+nz(d2*.05,2)*6.+float(k));
      P=mix(P,P*(.5+.6*str),band*ac.w);
      P+=.32*ac.w*exp(-pow((abs(d)-4.1)/.6,2.)); }
    if(uK.w>2.5){ float cl=nz(p*.45+uS.xy,2); P*=.35+1.6*smoothstep(.45,.75,cl); }
    o=vec4(clamp(.5+gr*1.5,0.,1.),clamp(P*.5,0.,1.),sc);
  }
}`,ra=`layout(location=0) in vec4 aS; layout(location=1) in vec4 aT;
out vec2 vP; flat out vec4 vS; flat out vec4 vT;
void main(){ vec2 a=aS.xy,b=aS.zw; float r=aT.x+.55; vec2 d=b-a; float l=length(d); vec2 u=l>1e-4?d/l:vec2(1,0), n=vec2(-u.y,u.x);
  int id=gl_VertexID; vec2 c=id==0?vec2(-1,-1):id==1?vec2(1,-1):id==2?vec2(-1,1):vec2(1,1);
  vec2 p=(c.x<0.?a-u*r:b+u*r)+n*c.y*r; vP=p; vS=aS; vT=aT; gl_Position=vec4(p/37.,0,1); }`,na=`in vec2 vP; flat in vec4 vS; flat in vec4 vT; out vec4 o;
float ov(float t,float L,float d,float R){ float h2=R*R-d*d; if(h2<=0.) return 0.; float h=sqrt(h2); return max(0.,min(t+h,L)-max(t-h,0.)); }
void main(){ vec2 a=vS.xy,b=vS.zw,d=b-a; float L=length(d); vec2 u=L>1e-4?d/L:vec2(1,0); vec2 q=vP-a; float t=dot(q,u), dn=dot(q,vec2(-u.y,u.x));
  float R=vT.x, k=vT.z;
  float l0=ov(t,L,dn,R*.97), l1=ov(t,L,dn,R+.5);
  float st=fract(sin(floor(dn*9.+vT.y*40.)*12.9898+vT.y*78.2)*43758.5)*.9+.4;
  float wipe=exp(-k*1.6*st*l0/(2.*R));
  float pile=k*.11*(l1-l0)/(2.*R);
  o=vec4(vec3(pile),wipe); }`,Qt=ta+`in vec2 vUV; out vec4 o;
uniform sampler2D uBoard, uDet, uPow, uN;
const float A=37.,B=44.,HF=2.,YB=-3.,RP=2.25,PCC=34.75;
#define ND int(uCU.w)
float hsh(vec2 p){ p=fract(p*vec2(.1031,.1030)); p+=dot(p,p.yx+33.33); return fract((p.x+p.y)*p.x); }
// board, frame and pockets. m: 1 surface, 2 frame top, 3 cushion face, 4 frame side, 5 pocket wall, 6 net
float boardHit(vec3 ro,vec3 rd,out vec3 n,out int m){
  float tr=1e5; n=vec3(0,1,0); m=0;
  vec3 inv=1./rd, t0=(vec3(-B,YB,-B)-ro)*inv, t1=(vec3(B,HF,B)-ro)*inv, tn=min(t0,t1), tf=max(t0,t1);
  float te=max(max(tn.x,tn.y),tn.z), tx=min(min(tf.x,tf.y),tf.z);
  if(te<tx&&te>0.){
    vec3 p=ro+rd*te;
    if(te==tn.y){
      if(max(abs(p.x),abs(p.z))<A){
        float tp=-ro.y/rd.y;
        float twx=(sign(rd.x)*A-ro.x)*inv.x, twz=(sign(rd.z)*A-ro.z)*inv.z, tw=min(twx,twz);
        if(tw<tp){ tr=tw; m=3; n=twx<twz?vec3(-sign(rd.x),0.,0.):vec3(0.,0.,-sign(rd.z)); }
        else {
          vec2 q=ro.xz+rd.xz*tp, pc=sign(q)*PCC;
          if(length(q-pc)<RP){
            vec2 oc=ro.xz-pc; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), cc=dot(oc,oc)-RP*RP, h=max(b*b-a*cc,0.);
            float t2=(-b+sqrt(h))/a, y2=ro.y+rd.y*t2;
            if(y2>YB+.4){ tr=t2; m=5; vec2 w=ro.xz+rd.xz*t2; n=vec3((pc-w)/RP,0).xzy; }
            else { tr=(YB+.4-ro.y)/rd.y; m=6; n=vec3(0,1,0); }
          } else { tr=tp; m=1; }
        }
      } else { tr=te; m=2; }
    } else { tr=te; m=4; n=te==tn.x?vec3(-sign(rd.x),0.,0.):vec3(0.,0.,-sign(rd.z)); }
  }
  return tr;
}
float discHit(vec3 ro,vec3 rd,float tmax,out int id,out vec3 n){
  float tb=tmax; id=-1; n=vec3(0,1,0);
  for(int i=0;i<ND;i++){
    vec4 D=uD[i], E=uE[i];
    if(D.y<-20.) continue;
    float yt=D.y+E.y;
    float t=(yt-ro.y)/rd.y; vec2 q=ro.xz+rd.xz*t-D.xz;
    if(t>0.&&t<tb&&dot(q,q)<E.x*E.x){ tb=t; id=i; n=vec3(0,1,0); }
    vec2 oc=ro.xz-D.xz; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), cc=dot(oc,oc)-E.x*E.x, h=b*b-a*cc;
    if(h>0.){ float ts=(-b-sqrt(h))/a, y=ro.y+rd.y*ts; if(ts>0.&&ts<tb&&y>D.y&&y<yt){ tb=ts; id=i; n=vec3((oc+rd.xz*ts)/E.x,0).xzy; } }
  }
  return tb;
}
float discSide(vec3 ro,vec3 rd,float tmax,out int id,out vec3 n){
  float tb=tmax; id=-1; n=vec3(0,1,0);
  for(int i=0;i<ND;i++){
    vec4 D=uD[i], E=uE[i];
    vec2 oc=ro.xz-D.xz; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), h=b*b-a*(dot(oc,oc)-E.x*E.x);
    if(h>0.&&D.y>-20.){ float ts=(-b-sqrt(h))/a, y=ro.y+rd.y*ts; if(ts>0.&&ts<tb&&y>D.y&&y<D.y+E.y){ tb=ts; id=i; n=vec3((oc+rd.xz*ts)/E.x,0).xzy; } }
  }
  return tb;
}
// shadow from discs toward the bulb (soft by the bulb's size) and contact occlusion
vec2 discShade(vec3 P,int skip){
  vec3 dl=uL.xyz-P; float vis=1.,ao=1.;
  for(int i=0;i<ND;i++){
    vec4 D=uD[i], E=uE[i];
    if(i==skip||D.y<-20.) continue;
    float y0=D.y,y1=D.y+E.y;
    float s0=max((y0-P.y)/dl.y,0.), s1=(y1-P.y)/dl.y;
    if(s1>0.){
      vec2 a0=P.xz+dl.xz*s0-D.xz, dd=dl.xz*(s1-s0);
      float k=clamp(-dot(a0,dd)/max(dot(dd,dd),1e-6),0.,1.);
      float sd=length(a0+dd*k)-E.x, s=s0+(s1-s0)*k, w=max(s*uL.w,.015);
      vis*=smoothstep(-w,w,sd);
    }
    float d=max(length(P.xz-D.xz)-E.x,0.), hh=max(y1-P.y,0.);
    ao*=1.-.55*(1.-d/sqrt(d*d+hh*hh+1e-4))*step(P.y,y1-.05);
  }
  return vec2(vis,ao);
}
float ggx(vec3 n,vec3 v,vec3 l,float r,float dl){
  vec3 h=normalize(v+l); float a=r*r, a2=clamp(a+uL.w/(2.*dl),0.,1.); float nh=max(dot(n,h),0.), nl=max(dot(n,l),0.), nv=max(dot(n,v),.05);
  float d=a2*a2/(3.14159*pow(nh*nh*(a2*a2-1.)+1.,2.)); float k=(a2+1.)*(a2+1.)/8.;
  return d*(a*a/(a2*a2))*nl/((nv*(1.-k)+k)*(nl*(1.-k)+k))*.25;
}
float cut(vec3 l){ return uSh.x>.5&&uSh.x<1.5?1.:smoothstep(uSh.w-.05,uSh.w+.06,l.y); }
vec3 discAlb(int i,vec3 P,out float gloss,out vec3 nrm,bool top,vec3 nIn){
  vec4 D=uD[i],E=uE[i]; float kind=E.z, seed=E.w;
  vec2 q=P.xz-D.xz; float ca=cos(D.w), sa=sin(D.w); vec2 ql=vec2(ca*q.x+sa*q.y,-sa*q.x+ca*q.y);
  float rho=length(q)/E.x;
  vec4 cc=kind<.5?uML:kind<1.5?uMD:kind<2.5?uQ:kind<3.5?uSk:kind<4.5?vec4(.56,.36,.2,.5):vec4(.02,.02,.022,.95);
  vec3 alb=cc.rgb; gloss=cc.a; nrm=nIn;
  vec2 gq=ql+seed*vec2(37.,91.);
  float grain=texture(uN,vec2(gq.x*.03,gq.y*.14)).g, fig=texture(uN,gq*.05).r;
  vec2 qn=ql/max(length(ql),1e-3);
  float chip=smoothstep(.78,.84,texture(uN,qn*.035+vec2(seed,seed*3.)).r)*smoothstep(.85,.97,rho+(top?0.:.2));
  chip=max(chip,step(4.5,kind)*0.);
  if(top){
    // turned grooves on the face
    float g=0., dg=0.;
    for(int j=0;j<2;j++){ float rj=j==0?.6:.79, wj=.022; float x=(rho-rj)/wj; float e=exp(-x*x); g+=e; dg+=-2.*x*e/wj; }
    if(kind>2.5&&kind<3.5){ g*=.4; dg*=.4; }
    vec2 rdir=rho>1e-3?q/(rho*E.x):vec2(0);
    float bev=smoothstep(.84,1.,rho);
    nrm=normalize(vec3(rdir.x*(-dg*.004+bev*bev*1.6),1.,rdir.y*(-dg*.004+bev*bev*1.6)));
    alb*=1.-g*.3;
    if(kind<3.5||uRm.w>.5) alb*=.8+.4*mix(grain,fig,.3);
    alb*=.93+.14*fract(seed*7.31);
  } else {
    float yy=(P.y-D.y)/E.y;
    alb*=.92-.14*exp(-pow((yy-.5)/.2,2.));
    gloss*=.6;
    vec3 tn=vec3(-q.y,0,q.x)/E.x;
    nrm=normalize(nIn+vec3(0,1,0)*smoothstep(.75,1.,yy)*.9+vec3(0,-1,0)*smoothstep(.2,0.,yy)*.5);
  }
  float worn=texture(uN,gq*.15).a;
  if(kind<1.5||kind>3.5) alb=mix(alb,alb+vec3(.12,.07,.03)*(kind==1.?2.5:.3),smoothstep(.55,.8,worn)*.35);
  alb=mix(alb,vec3(.66,.5,.32),chip*.85); gloss*=1.-chip*.8;
  if(kind>2.5&&kind<3.5&&uRm.w>.5) alb*=.75+.5*step(.6,hsh(floor(ql*9.)));
  return alb;
}
void main(){
  vec2 ndc=vUV*2.-1.;
  vec3 ro=uCam.xyz, rd=normalize(uCF.xyz+uCR.xyz*ndc.x*uCam.w+uCU.xyz*ndc.y*uCam.w);
  rd+=vec3(1e-6);
  vec3 N; int m; float T=boardHit(ro,rd,N,m);
#ifdef EARLY02
  if(m>=2) discard; // frame, pocket or net, or a disc or the lamp in front of them: never room or board
#endif
#ifdef EARLY145
  // room or board behind: only the lamp can be this part's, and only inside a vertical cylinder round its axis
  if(m<2){ vec2 oc=ro.xz-uL.xz; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), R=max(uSh.y,1.35)+.05; if(b*b-a*(dot(oc,oc)-R*R)<0.) discard; }
#endif
  int id; vec3 Nd; float td=discHit(ro,rd,T,id,Nd);
#ifdef EARLY3
  if(id<0) discard;
#endif
  if(id>=0){ T=td; m=10; N=Nd; }
  // lamp: bulb, shade (sphere cap) and cord
  vec3 Lp=uL.xyz;
  if(uSh.x<.5||uSh.x>1.5){
    vec3 cs=Lp-vec3(0,uSh.z,0); float Rs=uSh.y; vec3 oc=ro-cs; float b=dot(oc,rd), cc=dot(oc,oc)-Rs*Rs, h=b*b-cc;
    float rimY=Lp.y-uX.y;
    if(h>0.){ float sq=sqrt(h), t1=-b-sq, t2=-b+sq; vec3 p1=ro+rd*t1, p2=ro+rd*t2;
      if(t1>0.&&t1<T&&p1.y>rimY){ T=t1; m=21; N=normalize(p1-cs); }
      else if(t2>0.&&t2<T&&p2.y>rimY){ T=t2; m=22; N=-normalize(p2-cs); } }
  } else {
    // bare bulb: brass socket
    vec2 oc=ro.xz-Lp.xz; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), cc=dot(oc,oc)-1.35*1.35, h=b*b-a*cc;
    if(h>0.){ float t=(-b-sqrt(h))/a; float y=ro.y+rd.y*t; if(t>0.&&t<T&&y>Lp.y+3.1&&y<Lp.y+7.4){ T=t; m=23; N=vec3((oc+rd.xz*t)/1.35,0).xzy; } }
  }
  { vec2 oc=ro.xz-Lp.xz; float a=dot(rd.xz,rd.xz), b=dot(oc,rd.xz), cc=dot(oc,oc)-.28*.28, h=b*b-a*cc;
    if(h>0.){ float t=(-b-sqrt(h))/a; float y=ro.y+rd.y*t; if(t>0.&&t<T&&y>Lp.y+4.){ T=t; m=24; N=vec3((oc+rd.xz*t)/.28,0).xzy; } } }
  if(uSh.x>.5&&uSh.x<1.5){ float tt=(Lp.y+7.4-ro.y)/rd.y; vec2 w=ro.xz+rd.xz*tt-Lp.xz; if(tt>0.&&tt<T&&dot(w,w)<1.35*1.35){ T=tt; m=23; N=vec3(0,1,0); } }
  float Tg=T;
  int K=m==0?0:m>=21?1:m==1?2:m==10?3:m<=4?4:5;
#ifdef PART
  if(!(PART)) discard;
#endif

  vec3 col=vec3(0);
  vec3 P=ro+rd*T, V=-rd;
  vec3 Ld=Lp-P; float dl=length(Ld); vec3 l=Ld/dl;
  vec3 irr=uLc.rgb/(dl*dl)*cut(l);
  vec3 amb=vec3(.0105,.0078,.0082)*uX.z;
  if(m==0){
#if H0
    // the room: floor and a two-tone plastered wall
    float tf=(-76.-ro.y)/rd.y, tw=(-66.-ro.z)/rd.z, tx=((rd.x>0.?74.:-74.)-ro.x)/rd.x;
    float t=1e4; int rm=0;
    if(tf>0.){ t=tf; rm=1; }
    if(tw>0.&&tw<t){ t=tw; rm=2; }
    if(tx>0.&&tx<t){ t=tx; rm=3; }
    T=min(t,4000.); Tg=T;
    P=ro+rd*T; Ld=Lp-P; dl=length(Ld); l=Ld/dl; irr=uLc.rgb/(dl*dl)*cut(l);
    vec3 alb; vec3 n;
    if(rm==1){ n=vec3(0,1,0); alb=vec3(.16,.12,.09)*(.8+.4*texture(uN,P.xz*vec2(.002,.0005)).r);
      // board's shadow on the floor
      float s=(0.-P.y)/Ld.y; vec2 bq=P.xz+Ld.xz*s; irr*=1.-.85*step(max(abs(bq.x),abs(bq.y)),46.); }
    else { n=rm==2?vec3(0,0,1):vec3(rd.x>0.?-1.:1.,0.,0.); vec2 wq=rm==2?P.xy:vec2(P.z+17.,P.y);
      float mott=texture(uN,wq*.003+.3).r, fine=texture(uN,wq*.02).g, dado=smoothstep(4.3,3.9,P.y+(mott-.5)*.3);
      // limewash over plaster: brush mottling, a darker oil-painted dado with a ruled line, damp low down, patches where it has flaked
      alb=mix(uRm.rgb,uRm.rgb*vec3(.34,.37,.36)+vec3(.012),dado)*(.62+.6*mott)*(.85+.25*fine)*(.9+.15*texture(uN,wq*.08).b);
      alb=mix(alb,alb*vec3(.8,.76,.72),smoothstep(.71,.76,texture(uN,wq*.006+.61).a)*.6);
      alb*=1.-.55*exp(-pow((P.y-4.4)/.5,2.))-.4*smoothstep(-70.,-76.,P.y);
      alb*=1.-.5*exp(-pow((74.-abs(P.x))/2.5,2.))*float(rm==2)-.5*exp(-pow((P.z+66.)/2.5,2.))*float(rm==3);
      }
    col=alb*(irr*max(dot(n,l),0.)+amb*2.+vec3(.95,.72,.45)*uLc.rgb*(uSh.x>.5&&uSh.x<1.5?.012:.03)/(Lp.y*Lp.y)*exp(-max(P.y,0.)/45.)*float(rm>1));
#endif
  } else if(m==21||m==22||m==23||m==24){
#if H1
    vec3 alb=m==22?vec3(.86,.85,.80):m==23?(P.y<Lp.y+4.5?vec3(.62,.44,.17)*(.55+.45*smoothstep(.2,.5,abs(fract((P.y-Lp.y)*2.6)-.5)*2.)):vec3(.045,.032,.024)):m==24?vec3(.2,.13,.07)*(.5+.5*step(.5,fract(P.y*.9+N.x*.8+N.z*.5))):uSh.x>1.5?vec3(.42,.43,.42):vec3(.09,.21,.15);
    float lam=m==22?max(dot(N,l),0.):0.;
    col=alb*(uLc.rgb/(dl*dl)*lam*.3+amb*3.);
    if(m==21&&P.y<Lp.y-uX.y+.35) col=vec3(.75,.74,.7)*uLc.rgb/(dl*dl)*.12;
    // a little room and board bounce on the outside
    col+=alb*vec3(.9,.72,.52)*.55*max(-N.y+.5,0.)*uLc.r/(Lp.y*Lp.y)*float(m!=22);
    if(m==21){ float fr=pow(1.-max(dot(N,V),0.),3.); col+=vec3(.9,.75,.55)*.22*fr*max(-N.y+.7,0.)*uLc.r/(Lp.y*Lp.y)+alb*.04*uLc.r/(Lp.y*Lp.y)*max(N.y,0.); }
    if(m==23){ col+=alb*(uLc.rgb/uX.w)*.5*smoothstep(Lp.y+6.5,Lp.y+3.1,P.y)*(.4+.6*pow(max(dot(N,V),0.),2.)); }
    if(m==24) col+=alb*(uLc.rgb/uX.w)*.05*exp(-(P.y-Lp.y-7.)*.12);
    vec3 h=normalize(V+vec3(0,-1,0)); col+=vec3(.04)*pow(max(dot(N,h),0.),20.)*uLc.rgb/2000.*float(m==21);
#endif
  } else {
#if H2||H3||H4||H5
    vec2 sh=discShade(P,m==10?id:-1);
    float vis=sh.x, ao=sh.y;
    if(m==1){
#if H2
      vec2 uv=P.xz/(2.*A)+.5;
      vec4 bd=texture(uBoard,uv), dt=texture(uDet,uv); float pw=texture(uPow,uv).r*2.;
      float gr=texture(uN,P.xz*.31).a, gr2=texture(uN,P.xz*.083+.4).b;
      float powd=dt.b*2.*pw*uP.w*(.35+1.3*gr*gr2*1.6), cov=1.-exp(-powd*1.5);
      vec3 n=normalize(vec3(-(dt.r-.5)*.9,1.,-(dt.g-.5)*.9));
      vec3 alb=mix(bd.rgb,vec3(.95,.91,.84),cov*.9);
      // grains and small clumps of powder, seen only where they resolve
      { vec2 gc2=floor(P.xz*16.); float g1=hsh(gc2+3.7), sp=step(1.-cov*.22,g1)*smoothstep(95.,45.,T);
        alb=mix(alb,vec3(.97,.96,.94),sp*.8); }
      float gloss=bd.a*(1.-cov*.95);
      float rough=mix(.42,.07,gloss);
      // the cushions shade the board edge a little
      float v=A-max(abs(P.x),abs(P.z)); ao*=1.-.42*(1.-v/sqrt(v*v+HF*HF));
      float nl=max(dot(n,l),0.);
      col=alb*irr*nl*vis+alb*amb*ao;
      float F=.04+.96*pow(1.-max(dot(n,V),0.),5.);
      col+=irr*vis*ggx(n,V,l,rough,dl)*F*(1.-cov*.6)*4.;
      // powder glints and forward scatter
      vec2 gc=floor(P.xz*22.); float gh=hsh(gc+floor(uP.z*0.)), gh2=hsh(gc*1.37+5.);
      col+=irr*vis*cov*step(.993-cov*.004,gh)*pow(max(dot(normalize(vec3(gh2-.5,1.4,hsh(gc+9.)-.5)),normalize(V+l)),0.),40.)*.9;
      col+=alb*irr*vis*cov*1.1*pow(max(dot(rd,-l),0.),2.);
      // reflection of discs in the varnish
      vec3 rr=reflect(rd,n); int rid; vec3 rn; float tr=discSide(P+n*.002,rr,80.,rid,rn);
      vec3 refl=amb*.6;
      // the lamp seen in the varnish, blurred by its roughness
      { bool bare=uSh.x>.5&&uSh.x<1.5; float lr=bare?uL.w*1.2:sqrt(uSh.y*uSh.y-(uX.y-uSh.z)*(uX.y-uSh.z)), ly=bare?Lp.y:Lp.y-uX.y;
        if(rr.y>0.){ float tl=(ly-P.y)/rr.y; float d=length(P.xz+rr.xz*tl-Lp.xz); float bl=lr*.12+tl*rough*.7;
          float inside=1.-smoothstep(lr-bl,lr+bl,d); float core=exp(-d*d/(uL.w*uL.w*.7+tl*tl*rough*rough*.6)), bloom=exp(-d*d/(uL.w*uL.w*4.+tl*tl*rough*rough*9.));
          refl+=(uLc.rgb/uX.w)*(inside*(bare?0.:1.6)+core*4.+bloom*.5); } }
      if(rid>=0){ vec3 Q=P+rr*tr; float g2; vec3 n2; float kd=uE[rid].z; vec3 a2=(kd<.5?uML:kd<1.5?uMD:kd<2.5?uQ:kd<3.5?uSk:kd<4.5?vec4(.56,.36,.2,.5):vec4(.02,.02,.022,.95)).rgb; n2=rn; vec3 L2=Lp-Q; float d2=length(L2);
        vec3 c2=a2*uLc.rgb/(d2*d2)*max(dot(n2,L2/d2),0.)*cut(L2/d2)+a2*.3*uLc.rgb/(d2*d2)*max(-rn.y+.4,0.);
        refl=mix(refl,c2,exp(-(Q.y)*rough*7.)); }
      col+=refl*F*gloss*ao;
#endif
    } else if(m==10){
#if H3
      float gloss; vec3 n; vec3 alb=discAlb(id,P,gloss,n,N.y>.5,N);
      float rough=mix(.5,.12,gloss);
      float yy=(P.y-uD[id].y)/uE[id].y;
      if(N.y<.5) ao*=.55+.45*smoothstep(0.,.5,yy);
      if(P.y<-.5){ vis*=.15; ao*=.5; } // lying in the net, under the board
      float nl=max(dot(n,l),0.);
      // bounce from the lit board onto the sides
      vec3 bounce=vec3(.62,.48,.32)*irr*.22*max(-n.y+.25,0.)*uP.w*.0+vec3(.62,.48,.32)*irr*.2*(1.-max(n.y,0.));
      col=alb*(irr*nl*vis+bounce*ao+amb*ao);
      float F=.04+.96*pow(1.-max(dot(n,V),0.),5.);
      col+=irr*vis*ggx(n,V,l,rough,dl)*mix(.04,1.,F)*gloss*5.;
      // stone striker: faint sparkle
      if(uE[id].z>2.5&&uE[id].z<3.5&&uRm.w>.5) col+=irr*vis*step(.97,hsh(floor(P.xz*30.)))*.2;
      // powder clinging on the bottom edge
#endif
    } else if(m>=2&&m<=4){
#if H4
      // the frame: darker hardwood, grain along each rail, mitred corners, worn edges
      bool alongX=abs(P.z)>abs(P.x);
      vec2 g=alongX?P.xz:P.zx;
      float grain=texture(uN,vec2(g.x*.01,g.y*.3)+(alongX?0.:.5)).b, fig=texture(uN,vec2(g.x*.003,g.y*.05)).r;
      vec3 alb=uFr.rgb*(.42+.75*fig*fig)*(.75+.5*grain);
      vec3 n=N;
      float rough=.25;
      if(m==2){ float ve=max(abs(P.x),abs(P.z))-A; n=normalize(vec3(0,1,0)+vec3(-sign(P.x)*step(abs(P.z),abs(P.x)),0.,-sign(P.z)*step(abs(P.x),abs(P.z)))*smoothstep(.5,0.,ve)*.8);
        float miter=abs(abs(P.x)-abs(P.z)); alb*=1.-.5*exp(-miter*miter*30.);
        float wr=texture(uN,P.xz*.02).a; alb=mix(alb,alb*1.5+vec3(.05,.03,.02),smoothstep(.6,.85,wr)*uFr.w*.6+smoothstep(.6,0.,ve)*.25); rough=mix(.2,.5,smoothstep(.55,.8,wr)*uFr.w);
        alb*=1.-.5*smoothstep(1.,0.,B-max(abs(P.x),abs(P.z)));
      }
      if(m==3){ alb*=.8; ao*=.5+.5*smoothstep(0.,1.2,P.y); }
      if(m==4){ alb*=.7; float ply=fract(P.y*1.7); alb*=P.y<-.3?(.7+.3*step(.5,ply)):1.; }
      float nl=max(dot(n,l),0.);
      col=alb*(irr*nl*vis+amb*ao*2.5+vec3(.95,.72,.45)*uLc.rgb*(.02+uG.y)/(Lp.y*Lp.y));
      float F=.04+.96*pow(1.-max(dot(n,V),0.),5.);
      col+=irr*vis*ggx(n,V,l,rough,dl)*F*3.;
      col+=vec3(.05,.04,.03)*F*.0;
#endif
    } else if(m==5){
#if H5
      // ply layers inside the pocket
      float ply=step(.5,fract(P.y*2.4+.2));
      vec3 alb=mix(vec3(.30,.22,.14),vec3(.42,.32,.2),ply)*(.6+.4*smoothstep(YB,0.,P.y));
      col=alb*(irr*max(dot(N,l),0.)*.7+amb)*smoothstep(YB-.5,0.,P.y);
#endif
    } else {
#if H5
      // net cords below the hole
      vec2 nq=P.xz*1.6; vec2 f=abs(fract(nq+vec2(nq.y*.3,0.))-.5); float cord=smoothstep(.12,.0,min(f.x,f.y));
      col=vec3(.5,.45,.36)*cord*(irr*.25+amb)*.6;
#endif
    }
#endif
  }
  // haze in the lamp light: single scattering from a point source, below the shade's rim
  { float tc=dot(Lp-ro,rd); float hh=max(length(Lp-ro-rd*tc),.5); float te=T;
    if(uSh.x<.5||uSh.x>1.5){ if(rd.y>0.) te=min(te,(Lp.y-uX.y-ro.y)/rd.y); }
    te=min(te,600.);
    float I=(atan((te-tc)/hh)-atan(-tc/hh))/hh;
    col+=uLc.rgb*I*uX.x*(.6+.4*pow(max(dot(rd,normalize(Lp-ro)),0.),4.)); }
  // the bulb: clear glass (a body and a neck, seen as a thin bright rim and a faint veil), a coiled filament on its
  // two leads, and the glow it throws into the lens
  { vec3 oc=ro-Lp; float tb=-dot(oc,rd); vec3 q=oc+rd*tb; float d0=length(q)/uL.w;
    vec3 oc1=oc-vec3(0,2.25,0); float tb1=-dot(oc1,rd); float d1=length(oc1+rd*tb1)/(uL.w*.6);
    float inG=step(min(d0,d1),1.)*step(0.,tb)*step(tb-uL.w,T);
    if(inG>0.){
      Tg=min(Tg,tb);
      float rim=max(pow(d0,9.)*step(d0,1.)*step(1.,d1),pow(d1,9.)*step(d1,1.)*step(1.,d0));
      vec3 hot=uLc.rgb/uX.w;
      col=col*.9+hot*(.05+.5*rim*(1.1+.4*q.y/uL.w));
      // filament: a shallow arc between two leads
      vec3 fa=normalize(vec3(uCR.x,0.,uCR.z)); float u=dot(q,fa), v=dot(q,uCU.xyz)+.25-.3*(1.-u*u/.9);
      float du=max(abs(u)-.95,0.), df=sqrt(du*du+v*v);
      col+=hot*(26.*exp(-df*df/.012)+2.2/(1.+df*df/.05));
      float dl2=length(vec2(abs(u)-.95,max(max(v-2.4,-v),0.))); col+=hot*.5*exp(-dl2*dl2/.004);
    }
    vec3 bd=normalize(Lp-ro); float an=acos(clamp(dot(rd,bd),-1.,1.))*length(Lp-ro)/uL.w;
    float seen=step(tb-uL.w,T)*cut(bd);
    col+=uLc.rgb/uX.w*uG.x*seen*(.9/(1.+pow(an/.34,2.))+.05/(1.+an*an*.6))*step(0.,tb); }
  // exposure, tone
  col*=uLc.w;
  col=vec3(1)-exp(-col*.95);
  col=mix(col,col*col*(3.-2.*col),.35);
  float lum=dot(col,vec3(.3,.55,.15)); col=mix(col,vec3(lum),.06*smoothstep(.6,1.,lum));
  col=pow(col,vec3(1./2.2));
  float coc=uP.y*(Tg-uP.x)/Tg;
  o=vec4(col,clamp(.5+.5*coc/24.,0.,1.));
}`,ia=`in vec2 vUV; out vec4 o; uniform sampler2D uS; uniform vec4 uQ;
void main(){ float m=0.; for(int j=0;j<25;j++){ vec2 off=vec2(float(j%5)-2.,float(j/5)-2.)*uQ.y; float c=(textureLod(uS,vUV+off,0.).a-.5)*2.*24.; m=max(m,-c); } o=vec4(m/24.,0,0,1); }`,ca=`in vec2 vUV; out vec4 o; uniform sampler2D uS; uniform sampler2D uT; uniform vec4 uQ;
float hsh(vec2 p){ p=fract(p*vec2(.1031,.1030)); p+=dot(p,p.yx+33.33); return fract((p.x+p.y)*p.x); }
void main(){
  vec4 c0=textureLod(uS,vUV,0.); float cc=(c0.a-.5)*2.*24.*uQ.w;
  float rN=texture(uT,vUV).r*24.*uQ.w;
  float Rr=max(abs(cc),rN);
  vec3 col=c0.rgb;
  if(Rr>.6){
    float w0=1./max(cc*cc,1.); vec3 acc=c0.rgb*w0; float ws=w0; float jr=hsh(gl_FragCoord.xy)*6.2832;
    for(int i=0;i<40;i++){ float fi=float(i)+.5; float rr=sqrt(fi/40.)*Rr; float a=fi*2.39996+jr;
      vec2 off=vec2(cos(a),sin(a))*rr;
      vec4 s=textureLod(uS,vUV+off*uQ.x,0.); float sc=(s.a-.5)*2.*24.*uQ.w;
      float cov=clamp(abs(sc)-rr+1.,0.,1.);
      float bg=sc>cc?clamp(abs(cc)-rr+1.,0.,1.):1.;
      float w=cov*bg/max(sc*sc,1.);
      acc+=s.rgb*w; ws+=w; }
    col=acc/ws;
  } else {
    vec3 W=vec3(.3,.55,.15); float lc=dot(col,W);
    float ln=dot(textureLod(uS,vUV+vec2(0,uQ.x),0.).rgb,W), ls=dot(textureLod(uS,vUV-vec2(0,uQ.x),0.).rgb,W), le=dot(textureLod(uS,vUV+vec2(uQ.x,0),0.).rgb,W), lw=dot(textureLod(uS,vUV-vec2(uQ.x,0),0.).rgb,W);
    vec2 gd=vec2(le-lw,ln-ls); float ge=length(gd);
    if(ge>.04){ vec2 tg=vec2(-gd.y,gd.x)/ge*uQ.x*.8; vec3 a=textureLod(uS,vUV+tg,0.).rgb+textureLod(uS,vUV-tg,0.).rgb; col=mix(col,a*.5,clamp(ge*3.,0.,.65)); }
  }
  col+=(hsh(gl_FragCoord.xy+uQ.z)-.5)*.014;
  o=vec4(col,1);
}`,Yt=(t,a)=>[0,1,2,3,4,5].map(o=>"#define H"+o+(t.includes(o)?` 1
`:` 0
`)).join("")+(a?"#define PART "+a+`
`:"");let Wt=null;if(!P.progs){const t=(a,o)=>{const i=e.createProgram(),r=_o(e.VERTEX_SHADER,Do+a),n=_o(e.FRAGMENT_SHADER,Do+o);return e.attachShader(i,r),e.attachShader(i,n),e.linkProgram(i),{p:i,a:r,b:n}};Wt={noise:t(ge,oa),bake:t(ge,aa),stamp:t(ra,na),scene:t(ge,`#define EARLY02
`+Yt([0,2],"K==0||K==2")+Qt),scene2:t(ge,`#define EARLY3
`+Yt([3],"K==3")+Qt),scene3:t(ge,`#define EARLY145
`+Yt([1,4,5],"K==1||K==4||K==5")+Qt),tile:t(ge,ia),post:t(ge,ca),fill:t(ge,"uniform vec4 uC; out vec4 o; void main(){ o=uC; }")}}const sa=(t,a)=>{d[s]=a.sx,h[s]=Z*ue(t),$[s]=0,y[s]=0,D[s]=Math.cos(a.ang)*a.v,_[s]=Math.sin(a.ang)*a.v,N[s]=Q()*3},Et=(t,a,o)=>{sa(t,a),he();let i=0;for(;i<600*7&&(Po(1/600),i++,!(i%20===0&&(Kt(o),!ko()))););Kt(o)};let Pe=0,I=0;const Rt=g.hash+(g.home?"h":""),ke=P.hist||(P.hist=new Map),ye=ke.get(Rt),Uo=[d,h,D,_,N,Qe,$,pt,Ye,We,y];if(ye)ke.delete(Rt),ke.set(Rt,ye),Uo.forEach((t,a)=>t.set(ye.a[a])),re.set(ye.segs),se=ye.nSeg,Pe=ye.oldSeg,de=ye.hs,yt=ye.evPocketX,Ae.length=0,Me=Le=ze=0;else{const t=T()*1.047;if(Vt(t),Et(0,Tt(0),1),Et(1,wt(1,!0),1),Pe=se,Vt(t),qe!=="Fresh rack"){Et(0,Tt(0),1);const a=qe==="Mid game"?4+(T()*3|0):11+(T()*4|0);for(let o=0;o<a;o++){Ae.length=0,Et(I,wt(I,!0),1);let i=!1;for(const n of Ae)n!==s&&(J[n]===1||J[n]===5)==(I===1)&&(i=!0);i||(I=1-I);let r=0;for(let n=0;n<18;n++)y[n]===0&&r++;if(r<4)break}for(let o=0;o<x;o++)y[o]===1&&Ht(o);I=0}Ae.length=0,Me=Le=ze=0;{let a=g.home?-2:(T()-.5)*2*F*.7;for(let o=0;o<10&&!be(a,0);o++)a=Math.max(-F,Math.min(F,a+(o%2?3.5:-3.5)*(o+1)));d[s]=a,h[s]=Z,D[s]=_[s]=N[s]=0,y[s]=0,$[s]=0}ke.set(Rt,{a:Uo.map(a=>a.slice()),segs:re.slice(0,se*8),nSeg:se,oldSeg:Pe,hs:de,evPocketX:yt}),ke.size>8&&ke.delete(ke.keys().next().value)}he();const Ne=(t,a,o)=>[t,a,o],jt=(t,a)=>[t[0]-a[0],t[1]-a[1],t[2]-a[2]],qo=t=>{const a=Math.hypot(t[0],t[1],t[2]);return[t[0]/a,t[1]/a,t[2]/a]},No=(t,a)=>[t[1]*a[2]-t[2]*a[1],t[2]*a[0]-t[0]*a[2],t[0]*a[1]-t[1]*a[0]],Zt=(t,a)=>t[0]*a[0]+t[1]*a[1]+t[2]*a[2],Be=()=>Q();let k,$e,Mt,me,Lt=9;const $t=dt==="Across the corner",Ie=[0,0],Ce=[0,0],Jt=Be(),eo=Be(),to=Be(),U={"Enamel shade":0,"Bare bulb":1,"Tin cone":2,"Low and swinging":1}[Ke];if(dt==="Striker's eye")k=Ne(-10+Jt*.5,14+eo*.3,48+to*.5),$e=Ne(6,-3,-16),Mt=38,Lt=4.5,me=U===0?[-5,15,-18]:U===2?[-5,13,-27]:Ke==="Low and swinging"?[-3,11.2,-24]:[-4,12.6,-31];else if(dt==="Leaning in")k=Ne(6+Jt,35+eo,60+to),$e=Ne(0,0,-9),Mt=42,Lt=4.5,me=U===0?[-16,19,-22]:U===2?[-12,15,-34]:Ke==="Low and swinging"?[-10,11.6,-28]:[-12,13.5,-33];else{const t=36*Math.SQRT1_2+Re;let a=ae;if(qe!=="Fresh rack"){const V=(G,H)=>Math.exp(-((d[G]-d[H])**2+(h[G]-h[H])**2)/128);let W=-1,S=18;for(const G of[ae,-ae])for(let H=0;H<19;H++)if(y[H]===0){const De=d[H]-G*t,ft=h[H]-t,_e=Math.hypot(De,ft),Oe=Math.acos(Math.min(1,(-G*De-ft)*Math.SQRT1_2/_e));let Ge=Math.exp(-Oe*Oe/.12)*4900/Math.max(_e*_e,3600),Ut=0;for(let Ue=0;Ue<19;Ue++)y[Ue]===0&&(Ut+=V(H,Ue));Ge*=Ut,Ge>W&&(W=Ge,S=H,a=G)}let j=0,fe=0,xe=0;for(let G=0;G<19;G++)if(y[G]===0){const H=V(S,G);fe+=d[G]*H,xe+=h[G]*H,j+=H}j>0&&(Ie[0]=fe/j,Ie[1]=xe/j)}const o=Ie[0],i=Ie[1],r=a*t,n=o-r,c=i-t,f=Math.hypot(n,c),u=-a*Math.SQRT1_2,m=-Math.SQRT1_2,l=Math.max(-.1,Math.min(.1,.6*Math.atan2(u*c-m*n,u*n+m*c))),p=u*Math.cos(l)-m*Math.sin(l),b=u*Math.sin(l)+m*Math.cos(l);k=Ne((r+Jt*.4)*ae,18+eo*.3,t+to*.4),$e=Ne((r+p*t*1.2021)*ae,0,t+b*t*1.2021),Mt=32,Lt=2.8,Ce[0]=r+p*t*Math.SQRT2,Ce[1]=t+b*t*Math.SQRT2;const v=U===0?[4,18,6]:U===2?[-2,15,8]:Ke==="Low and swinging"?[0,11.6,10]:[-4,14.5,6],R=-p,w=-b,L=(v[0]+v[2])*Math.SQRT1_2,A=(v[0]-v[2])*Math.SQRT1_2;me=[(Ce[0]+L*R+A*a*w)*ae,v[1],Ce[1]+L*w-A*a*R]}me[0]+=Wo,me[1]+=jo,k[0]*=ae,$e[0]*=ae,me[0]*=ae;const ee=qo(jt($e,k)),ne=qo(No(ee,[0,1,0])),le=No(ne,ee),ie=Math.tan(Mt*Math.PI/360);let oo=Math.hypot(...jt([0,0,0],k));if(qe!=="Fresh rack"){let t=0,a=0,o=0;for(let i=0;i<19;i++)y[i]===0&&(t+=d[i],a+=h[i],o++);o&&(oo=Math.hypot(t/o*.6-k[0],k[1],a/o*.6-k[2]))}$t&&(oo=Math.hypot(Ie[0]-k[0],k[1],Ie[1]-k[2]));const ao=me[1],Je=[me[0]+Be()*.8,ao+Be()*.3,me[2]+Be()*.8],ro=U===1?[1,.76,.52]:U===0?[1,.82,.62]:[1,.79,.56],no=Math.hypot(Je[0]-Ce[0],ao,Je[2]-Ce[1]),et=(U===1?.4:U===0?.62:.42)*no*no*no/ao,io={Limewash:[.56,.5,.4],"Green distemper":[.19,.26,.16],Ochre:[.58,.34,.085],"Indigo wash":[.09,.15,.36]}[Yo],co=t=>{const a=jt(t,k),o=Zt(a,ee);return o<.1?null:[.5+.5*Zt(a,ne)/(o*ie),.5-.5*Zt(a,le)/(o*ie)]},Bo=(t,a)=>{const o=t*2-1,i=1-a*2,r=[ee[0]+ne[0]*o*ie+le[0]*i*ie,ee[1]+ne[1]*o*ie+le[1]*i*ie,ee[2]+ne[2]*o*ie+le[2]*i*ie];if(r[1]>-.001)return null;const n=-k[1]/r[1];return[k[0]+r[0]*n,k[2]+r[2]*n]},so={"Boxwood and ebony":[[.82,.62,.28,.74],[.045,.032,.026,.78],[.58,.025,.03,.8]],"Bone and rosewood":[[.84,.79,.66,.62],[.27,.075,.055,.62],[.56,.03,.035,.7]],Lacquered:[[.7,.21,.07,.93],[.022,.02,.02,.94],[.6,.015,.045,.94]],"Odd set":[[.72,.54,.32,.5],[.08,.06,.05,.55],[.48,.06,.045,.55]]}[Ro],la={"Ivory white":[.86,.83,.74,.85],"Turned wood":[.5,.3,.15,.55],"Grey stone":[.4,.4,.38,.7],"Old bakelite":[.3,.095,.045,.88]}[qt],lo={Birch:[.22,.1,.045],Teak:[.16,.07,.035],Satinwood:[.26,.12,.05],"Rosewood inlay":[.13,.05,.035]}[Eo];if(!P.progs){const t={};for(const o in Wt){const i=Wt[o];e.getProgramParameter(i.p,e.LINK_STATUS)||console.error("233 "+o,e.getProgramInfoLog(i.p),e.getShaderInfoLog(i.a),e.getShaderInfoLog(i.b)),e.deleteShader(i.a),e.deleteShader(i.b);const r={},n=e.getProgramParameter(i.p,e.ACTIVE_UNIFORMS);for(let f=0;f<n;f++){const u=e.getActiveUniform(i.p,f),m=u.name.replace(/\[0\]$/,"");r[m]=e.getUniformLocation(i.p,u.name)}const c=e.getUniformBlockIndex(i.p,"C");c!==e.INVALID_INDEX&&e.uniformBlockBinding(i.p,c,3),t[o]={p:i.p,u:r}}P.progs=t;for(const o of["scene","scene2","scene3"]){e.useProgram(t[o].p);for(const[i,r]of[[0,"uBoard"],[1,"uDet"],[2,"uPow"],[3,"uN"]])e.uniform1i(t[o].u[r],i)}e.useProgram(t.tile.p),e.uniform1i(t.tile.u.uS,0),e.uniform4f(t.tile.u.uQ,0,1/100,0,0),e.useProgram(t.post.p),e.uniform1i(t.post.u.uS,0),e.uniform1i(t.post.u.uT,1),P.vao=e.createVertexArray(),P.svao=e.createVertexArray(),P.sbuf=e.createBuffer(),e.bindVertexArray(P.svao),e.bindBuffer(e.ARRAY_BUFFER,P.sbuf),e.bufferData(e.ARRAY_BUFFER,4096*32,e.DYNAMIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,4,e.FLOAT,!1,32,0),e.vertexAttribDivisor(0,1),e.enableVertexAttribArray(1),e.vertexAttribPointer(1,4,e.FLOAT,!1,32,16),e.vertexAttribDivisor(1,1),e.bindVertexArray(null),P.noise=e.createTexture(),e.bindTexture(e.TEXTURE_2D,P.noise),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,256,256,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR_MIPMAP_LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR);const a=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,P.noise,0),e.viewport(0,0,256,256),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(t.noise.p),e.bindVertexArray(P.vao),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(a),e.bindTexture(e.TEXTURE_2D,P.noise),e.generateMipmap(e.TEXTURE_2D)}const X=P.progs,tt=(t,a,o,i)=>{const r=e.createTexture();return e.bindTexture(e.TEXTURE_2D,r),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,a,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,i?e.LINEAR_MIPMAP_LINEAR:o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),r},ot=t=>{const a=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),a},Fe=K>600?1024:512,we=512,zt=100,At=tt(Fe,Fe,e.LINEAR,!0),Pt=tt(Fe,Fe,e.LINEAR,!0),Io=tt(we,we,e.LINEAR,!1),fo=tt(K,K,e.LINEAR,!1),Co=tt(zt,zt,e.LINEAR,!1),fa=ot(At),da=ot(Pt),uo=ot(Io),ua=ot(fo),ha=ot(Co);e.bindFramebuffer(e.FRAMEBUFFER,null);const ho=e.createBuffer(),te=new Float32Array(56*4);e.bindBuffer(e.UNIFORM_BUFFER,ho),e.bufferData(e.UNIFORM_BUFFER,te.byteLength,e.DYNAMIC_DRAW),e.bindBuffer(e.UNIFORM_BUFFER,null);{const t={Birch:0,Teak:1,Satinwood:2,"Rosewood inlay":3}[Eo],a={"Light dusting":0,Heavy:1,"Fresh drift":2,Damp:3}[Nt],o=new Float32Array(32);for(let r=0;r<8;r++){const n=T()*6.283,c=6+T()*24;o[r*4]=Math.cos(n)*c*.8,o[r*4+1]=Math.sin(n)*c*.8,o[r*4+2]=9+T()*16,o[r*4+3]=(.4+.6*T())*(r<5?1:.5)}const i=[T(),T(),T(),T()];e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.useProgram(X.bake.p),e.bindVertexArray(P.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,P.noise),e.uniform1i(X.bake.u.uN,0),e.uniform4f(X.bake.u.uS,...i),e.uniform4fv(X.bake.u.uArc,o),e.uniform4f(X.bake.u.uTx,2*C/Fe,0,0,0),e.viewport(0,0,Fe,Fe),e.bindFramebuffer(e.FRAMEBUFFER,da),e.uniform4f(X.bake.u.uK,t,Ct,1,a),e.uniform1i(X.bake.u.uDt,1),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,At),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,fa),e.uniform4f(X.bake.u.uK,t,Ct,0,a),e.bindTexture(e.TEXTURE_2D,Pt),e.drawArrays(e.TRIANGLES,0,3),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,At),e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,Pt),e.generateMipmap(e.TEXTURE_2D),e.bindFramebuffer(e.FRAMEBUFFER,uo),e.viewport(0,0,we,we),e.clearColor(.5,.5,.5,1),e.clear(e.COLOR_BUFFER_BIT),e.bindFramebuffer(e.FRAMEBUFFER,null)}const mo=(t,a)=>{a<=t||(e.bindFramebuffer(e.FRAMEBUFFER,uo),e.viewport(0,0,we,we),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.SRC_ALPHA),e.useProgram(X.stamp.p),e.bindVertexArray(P.svao),e.bindBuffer(e.ARRAY_BUFFER,P.sbuf),e.bufferSubData(e.ARRAY_BUFFER,0,re,t*8,(a-t)*8),e.drawArraysInstanced(e.TRIANGLE_STRIP,0,4,a-t),e.disable(e.BLEND),e.bindVertexArray(null),e.bindFramebuffer(e.FRAMEBUFFER,null))},Xo=t=>{e.bindFramebuffer(e.FRAMEBUFFER,uo),e.viewport(0,0,we,we),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendColor(0,0,0,t),e.blendFunc(e.ONE_MINUS_CONSTANT_ALPHA,e.CONSTANT_ALPHA),e.useProgram(X.fill.p),e.uniform4f(X.fill.u.uC,.5,.5,.5,1),e.bindVertexArray(P.vao),e.drawArrays(e.TRIANGLES,0,3),e.disable(e.BLEND),e.bindFramebuffer(e.FRAMEBUFFER,null)},ma=()=>{Pe?(mo(0,Pe),Xo(.72),mo(Pe,se),Pe=0):mo(0,se),se=0},va=70,Xe=Math.sqrt(ut/va);let at=0,rt=0,nt=0,it=0,kt=Ke==="Low and swinging"?1:.22;{const t=T()*6.283;at=Math.cos(t)*1.2*kt,rt=Math.sin(t)*1.2*kt,nt=-rt*Xe*.6,it=at*Xe*.6}let vo=0,M="aim",z=0,xo=0,Ft=0,St=!1,ct=0,Ve=null,Dt=!1,He=!1,po=0,bo=0,go=0,yo=0,st=!1,oe=null,_t=g.home?2.3:1.2+T()*1.2;$t&&(_t+=3.4);let ve=0,Y=null,lt=null,Se=0;const xa=()=>{let t=0,a=0;for(let o=0;o<18;o++)y[o]===0&&(J[o]===1||J[o]===5?a++:t++);return[t,a]},pa=(t,a)=>{t=Math.max(-F,Math.min(F,t));for(let o=0;o<10&&!be(t,a);o++)t=Math.max(-F,Math.min(F,t+(o%2?3.5:-3.5)*(o+1)));return t},Vo=(t,a)=>{const o=Z*ue(t);let i=d[s],r=h[s],n=0;y[s]!==0&&(i=a+(q()-.5)*8,r=ue(t)*(C+14),n=5);const c=Math.hypot(a-i,o-r);if(c<.05&&n===0){M=O?"aim2":"aim",z=0;return}Y={x0:i,z0:r,y0:n,x1:a,z1:o,h:Math.min(1.4,.5+c*.012),T:Math.min(.33,.2+c*.0025+q()*.05),s:t},y[s]=3,D[s]=_[s]=N[s]=0,M="place",z=0},ba=(t,a,o)=>{const i=a+o*(B[s]+.5);for(const r of[-.75,.7]){const n=t+r+Q()*.15;So(n,i,n+Q()*.2,i+o*(.7+.3*T()),.32,T(),1.4)}},Ho=t=>{lt={x0:d[s],x1:t,T:.2+Math.abs(t-d[s])*.022},M="slide",z=0},Oo=t=>{D[s]=Math.cos(t.ang)*t.v,_[s]=Math.sin(t.ang)*t.v,N[s]=(t.spin||0)+Q()*2,M="move",z=0,Ae.length=0,St=!0,he(),g.sound.hit("click",Math.min(1,.25+t.v/700),{pan:d[s]/C*.6}),g.sound.hit("hat",.15)},ga=()=>{Vt(T()*1.047),d[s]=0,h[s]=Z,y[s]=0,$[s]=0,D[s]=_[s]=N[s]=0,I=0,M="aim",z=0,_t=2+2.2*q(),St=!1,wo=1,O=null,he()};let wo=0,O=null;if(qe==="Fresh rack"&&Zo){const t=Tt(1);t.v*=.62,I=1,d[s]=t.sx,h[s]=-Z,he(),O=t,ve=_t,Se=0,M="aim2",z=0}const Go=()=>{let t=0;const a=(r,n,c,f)=>{te[t++]=r,te[t++]=n,te[t++]=c,te[t++]=f},o=[Je[0]+at,Je[1],Je[2]+rt],i=(1-ct)*(1-ct);a(k[0],k[1],k[2],ie),a(ne[0],ne[1],ne[2],1),a(le[0],le[1],le[2],x),a(ee[0],ee[1],ee[2],0),a(o[0],o[1],o[2],2.6),a(ro[0]*et,ro[1]*et,ro[2]*et,i),a(oo,Lt,xo,Jo),a(U===1?1:U===2?2:0,U===2?10.5:7.6,U===2?7.7:2.7,U===2?.3:.42),a(lo[0],lo[1],lo[2],Ct),a(...so[0]),a(...so[1]),a(...so[2]),a(...la),a(io[0],io[1],io[2],qt==="Grey stone"?1:0),a(9e-5*1500/et,U===2?2.5:3.5,U===1?1:U===2?1.6:2.6,et),a(U===1?1:U===2?.6:.25,$t?.07:0,0,0);for(let r=0;r<x;r++)a(d[r],y[r]===2&&r===s?-100:$[r],h[r],Qe[r]);for(let r=0;r<x;r++)a(B[r],Xt[r],J[r],bt[r])},ya=()=>{if(He){const t=d[s],a=h[s];d[s]+=go,h[s]+=yo,Go(),d[s]=t,h[s]=a}else Go()},E=new Int32Array(4*x),Ko=()=>{ma(),wo>0&&(Xo(.25),wo=0),ya(),e.bindBuffer(e.UNIFORM_BUFFER,ho),e.bufferSubData(e.UNIFORM_BUFFER,0,te),e.bindBufferBase(e.UNIFORM_BUFFER,3,ho),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),e.disable(e.CULL_FACE),e.disable(e.SCISSOR_TEST),e.bindFramebuffer(e.FRAMEBUFFER,ua),e.viewport(0,0,K,K),e.useProgram(X.scene.p),e.bindVertexArray(P.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,At),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Pt),e.activeTexture(e.TEXTURE2),e.bindTexture(e.TEXTURE_2D,Io),e.activeTexture(e.TEXTURE3),e.bindTexture(e.TEXTURE_2D,P.noise),e.drawArrays(e.TRIANGLES,0,3);{let t=!1,a=0;for(let o=0;o<x&&!t;o++){const i=64+o*4,r=64+4*x+o*4,n=te[i+1];if(n<-20)continue;let c=1e9,f=1e9,u=-1e9,m=-1e9;for(let R=0;R<8;R++){const w=te[i]+(R&1?1:-1)*te[r]-k[0],L=n+(R&2?te[r+1]:0)-k[1],A=te[i+2]+(R&4?1:-1)*te[r]-k[2],V=w*ee[0]+L*ee[1]+A*ee[2];if(V<.1){t=!0;break}const W=.5+.5*(w*ne[0]+L*ne[1]+A*ne[2])/(V*ie),S=.5-.5*(w*le[0]+L*le[1]+A*le[2])/(V*ie);c=Math.min(c,W),u=Math.max(u,W),f=Math.min(f,S),m=Math.max(m,S)}if(t)break;const l=Math.max(0,Math.floor(c*K)-2),p=Math.max(0,Math.floor((1-m)*K)-2),b=Math.min(K,Math.ceil(u*K)+2),v=Math.min(K,Math.ceil((1-f)*K)+2);if(b>l&&v>p){const R=a*4;E[R]=l,E[R+1]=p,E[R+2]=b,E[R+3]=v,a++}}if(e.useProgram(X.scene2.p),t)e.drawArrays(e.TRIANGLES,0,3);else if(a){for(let o=!0;o;){o=!1;for(let i=0;i<a&&!o;i++)for(let r=i+1;r<a;r++){const n=i*4,c=r*4,f=Math.min(E[n],E[c]),u=Math.min(E[n+1],E[c+1]),m=Math.max(E[n+2],E[c+2]),l=Math.max(E[n+3],E[c+3]);if((m-f)*(l-u)<=(E[n+2]-E[n])*(E[n+3]-E[n+1])+(E[c+2]-E[c])*(E[c+3]-E[c+1])){E[n]=f,E[n+1]=u,E[n+2]=m,E[n+3]=l,a--,E.copyWithin(c,a*4,a*4+4),o=!0;break}}}e.enable(e.SCISSOR_TEST);for(let o=0;o<a;o++)e.scissor(E[o*4],E[o*4+1],E[o*4+2]-E[o*4],E[o*4+3]-E[o*4+1]),e.drawArrays(e.TRIANGLES,0,3);e.disable(e.SCISSOR_TEST)}}e.useProgram(X.scene3.p),e.drawArrays(e.TRIANGLES,0,3),e.bindFramebuffer(e.FRAMEBUFFER,ha),e.viewport(0,0,zt,zt),e.useProgram(X.tile.p),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,fo),e.drawArrays(e.TRIANGLES,0,3),e.flush(),e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,K,K),e.useProgram(X.post.p),e.bindVertexArray(P.vao),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,fo),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,Co),e.uniform4f(X.post.u.uQ,1/K,0,(xo*30|0)%61,K/1e3),e.drawArrays(e.TRIANGLES,0,3),e.bindVertexArray(null)};Ko();const wa=()=>{if(Me>40){const t=Math.min(1,Me/2600);g.sound.hit("click",.3+.7*t),g.sound.note(93+(T()*4|0),{dur:.05,vel:.25*t,wave:"triangle",cutoff:3500})}if(Le>40){const t=Math.min(1,Le/2600);g.sound.hit("kick",.25*t+.05),g.sound.hit("click",.25*t)}ze>0&&(g.sound.hit("noise",.3+Math.min(.5,ze/600),{cutoff:700,dur:.3,pan:yt/C*.7}),g.sound.hit("kick",.12)),Me=Le=ze=0};return(t,a)=>{a=Math.min(Math.max(a||0,0),.15),xo+=a,z+=a;const o=g.input;let i=!1;if(o.down){He||(He=!0,po=o.x,bo=o.y,st=!1,oe=Bo(po,bo),oe&&(Math.abs(oe[0])>C||oe[1]>Z-1.5||oe[1]<-C)&&(oe=null));const r=o.x-po,n=o.y-bo;if(Math.hypot(r,n)>.02&&(st=!0),Dt=!0,Ft=0,I===0&&st&&(M==="aim"||M==="slide"||M==="aim2")){M!=="aim"&&(M="aim",O=null,z=0);const c=oe||[d[s],h[s]],f=co([c[0],0,c[1]]),u=co([c[0]+1,0,c[1]]),m=co([c[0],0,c[1]+1]);if(f&&u&&m){const l=u[0]-f[0],p=m[0]-f[0],b=u[1]-f[1],v=m[1]-f[1],R=l*v-p*b;let w=(v*r-p*n)/R,L=(-b*r+l*n)/R;const A=Math.hypot(w,L)||1;w/=A,L/=A;const V=Math.min(1,Math.hypot(r,n)/.3);let W=Math.atan2(-L,-w);if(oe&&L>.2){const S=Math.max(-F,Math.min(F,oe[0]+w*(Z-oe[1])/L));be(S,0)&&(d[s]=S),W=Math.atan2(oe[1]-Z,oe[0]-d[s])}go=w*V*1.6,yo=L*V*1.6,Ve={ang:W,v:30+540*V*V,pw:V}}}}else He&&(He=!1,go=yo=0,M==="aim"&&I===0&&st&&Ve&&Ve.pw>.06&&(i=!0,Oo(Ve),Ve=null),Ve=null);for(const r of o.taps())if(!st&&(Dt=!0,Ft=0,M==="aim"&&I===0)){const n=Bo(r.x,r.y);if(n){const c=Math.max(-F,Math.min(F,n[0]));be(c,0)&&(d[s]=c)}}if(o.down||(Ft+=a),M==="aim"){const r=St?Dt&&o.inside?9:ve:_t;z>r&&!He&&Ft>(Dt?6:0)&&(O=!St&&qe==="Fresh rack"?Tt(0):wt(0,!0),ve=.35+q(),Se=0,Math.abs(O.sx-d[s])>.05?Ho(O.sx):(M="aim2",z=0))}else if(M==="think"){if(z>ve)if(I===1){const r=wt(1,!0);O=r,Se=0;let n=r.sx;if(q()<.42){const c=Math.max(-F,Math.min(F,r.sx+(q()<.5?-1:1)*(1+2.5*q())));be(c,1)&&(n=c,Se=.25+.6*q())}ve=.5+1.7*q(),Vo(1,n)}else{O=null,ve=1.2+2.2*q();const r=y[s]===0?d[s]:(q()-.5)*20;Vo(0,pa(dt==="Striker's eye"?Math.max(-10,Math.min(4,r*ae))*ae:r,0))}}else if(M==="place"){const r=Math.min(1,z/Y.T),n=r*r*(3-2*r);d[s]=Y.x0+(Y.x1-Y.x0)*n,h[s]=Y.z0+(Y.z1-Y.z0)*n,$[s]=Y.y0*(1-n)+4*Y.h*n*(1-n),r>=1&&(y[s]=0,$[s]=0,ba(d[s],Y.z1,ue(Y.s)),Y=null,he(),g.sound.hit("click",.16,{pan:d[s]/C*.5}),g.sound.hit("noise",.05,{cutoff:2500,dur:.08}),M=O?"aim2":"aim",z=0)}else if(M==="slide"){const r=Math.min(1,z/lt.T),n=r*r*(3-2*r);d[s]=lt.x0+(lt.x1-lt.x0)*n,r>=1&&(he(),M=O?"aim2":"aim",z=0)}else if(M==="aim2"){if(Se&&z>Se)Se=0,ve=.3+1.1*q(),Math.abs(O.sx-d[s])>.05&&be(O.sx,I)&&Ho(O.sx);else if(z>ve){const r=O;if(O=null,Math.abs(r.sx-d[s])>.05){const n=Z*ue(I);r.ang=Math.atan2(h[s]+Math.sin(r.ang)*30-n,r.sx+Math.cos(r.ang)*30-d[s])}r.ang+=Q()*.009,r.v*=1+Q()*.04,Oo(r)}}else if(M==="dim"){const r=Math.max(0,Math.min(1,(z-1.4)/1.3));ct=r*r*(3-2*r),z>3.1&&(ga(),M="undim",z=0)}else if(M==="undim"){const r=Math.max(0,1-z/1.5);ct=r*r*(3-2*r),z>1.5&&(ct=0,M="aim",z=0)}if(M==="move"){const r=Math.max(1,Math.min(90,Math.round(a*600)));for(let n=0;n<r;n++)Po(1/600);if(Kt(1),wa(),z>.3&&!ko()){for(let u=0;u<x;u++)y[u]===1&&Ht(u);let n=!1;for(const u of Ae)u!==s&&u!==xt&&(J[u]===1||J[u]===5)==(I===1)&&(n=!0);n||(I=1-I);const[c,f]=xa();c===0||f===0||c+f<4?(M="dim",z=0):(M="think",z=0,ve=I===1?.5+2.6*q()*q()+(q()<.14?1.5+1.6*q():0):.3+.4*q())}}else he();{const r=Math.max(1,Math.round(a*120)),n=a/r;for(let c=0;c<r;c++)vo+=n,vo>.35&&(vo=0,nt+=Q()*1.4*kt,it+=Q()*1.4*kt),nt+=(-Xe*Xe*at-.25*nt)*n,it+=(-Xe*Xe*rt-.25*it)*n,at+=nt*n,rt+=it*n}Ko()}}})})(window.PrintsRtReal&&window.PrintsRtReal.drop06||window.__protoMain&&window.Proto);
